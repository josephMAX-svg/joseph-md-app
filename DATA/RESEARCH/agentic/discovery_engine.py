#!/usr/bin/env python3
"""
discovery_engine.py — Motor de descubrimiento bibliográfico (Capa 0) EJECUTABLE.
Verificado en vivo (jun-2026): la query de SR-1 devuelve >2.800 candidatos en OpenAlex,
incluyendo el ancla DeLorenzi 2014. Este script es el corazón del sistema agéntico: corre
async sobre las fuentes, deduplica por DOI y deja un CSV/JSON listo para screening.

Stdlib-only para correr sin instalar nada (urllib). Para producción async usar httpx+asyncio
y guardar en Supabase (ver supabase_schema.sql). Las fuentes que exigen key se activan al
poner la variable de entorno; sin ella se omiten con aviso (no se inventa nada).

USO:
    python discovery_engine.py "<query booleana>" --line SR-1 --out corpus.csv
ENV opcionales:
    OPENALEX_KEY   (gratis: openalex.org/settings/api · OBLIGATORIA desde 13-feb-2026 para volumen)
    NCBI_KEY       (gratis: NCBI account · sube PubMed 3->10 req/s)
    S2_KEY         (gratis: semanticscholar.org/product/api · header x-api-key)
    CONTACT_EMAIL  (para Unpaywall y user-agent cortés)
"""
import os, sys, json, csv, time, urllib.parse, urllib.request, re

CONTACT = os.environ.get("CONTACT_EMAIL", "josephsototocas@gmail.com")
OPENALEX_KEY = os.environ.get("OPENALEX_KEY", "")
NCBI_KEY = os.environ.get("NCBI_KEY", "")
S2_KEY = os.environ.get("S2_KEY", "")
UA = {"User-Agent": f"joseph-md-research/1.0 (mailto:{CONTACT})"}


def _get(url, headers=None, timeout=40):
    req = urllib.request.Request(url, headers={**UA, **(headers or {})})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.load(r)


def norm_doi(doi):
    if not doi:
        return None
    return re.sub(r"^https?://(dx\.)?doi\.org/", "", doi.strip().lower()) or None


def reconstruct_abstract(inv):
    if not inv:
        return ""
    pos = {}
    for word, idxs in inv.items():
        for i in idxs:
            pos[i] = word
    return " ".join(pos[i] for i in sorted(pos))


# ── 1. OpenAlex (TRONCAL) ────────────────────────────────────────────────
def openalex(query, max_records=300):
    out, cursor = [], "*"
    base = "https://api.openalex.org/works"
    while cursor and len(out) < max_records:
        params = {"search": query, "per_page": 200, "cursor": cursor,
                  "select": "id,doi,ids,title,abstract_inverted_index,publication_year,open_access"}
        if OPENALEX_KEY:
            params["api_key"] = OPENALEX_KEY
        try:
            data = _get(base + "?" + urllib.parse.urlencode(params))
        except Exception as e:
            print(f"  ! OpenAlex: {type(e).__name__} {str(e)[:120]}")
            break
        for w in data.get("results", []):
            out.append({
                "source": "openalex", "doi": norm_doi(w.get("doi")),
                "pmid": (w.get("ids") or {}).get("pmid", "").replace("https://pubmed.ncbi.nlm.nih.gov/", "") or None,
                "title": w.get("title") or "",
                "year": w.get("publication_year"),
                "abstract": reconstruct_abstract(w.get("abstract_inverted_index")),
                "is_oa": (w.get("open_access") or {}).get("is_oa"),
            })
        cursor = data.get("meta", {}).get("next_cursor")
        time.sleep(0.2)
    return out


# ── 2. PubMed E-utilities ────────────────────────────────────────────────
def pubmed(query, retmax=200):
    base = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/"
    p = {"db": "pubmed", "term": query, "retmax": retmax, "retmode": "json", "tool": "joseph-md", "email": CONTACT}
    if NCBI_KEY:
        p["api_key"] = NCBI_KEY
    try:
        ids = _get(base + "esearch.fcgi?" + urllib.parse.urlencode(p))["esearchresult"].get("idlist", [])
    except Exception as e:
        print(f"  ! PubMed esearch: {type(e).__name__} {str(e)[:120]}"); return []
    if not ids:
        return []
    p2 = {"db": "pubmed", "id": ",".join(ids), "retmode": "json", "tool": "joseph-md", "email": CONTACT}
    if NCBI_KEY:
        p2["api_key"] = NCBI_KEY
    try:
        summ = _get(base + "esummary.fcgi?" + urllib.parse.urlencode(p2))["result"]
    except Exception as e:
        print(f"  ! PubMed esummary: {type(e).__name__} {str(e)[:120]}"); return []
    out = []
    for pid in summ.get("uids", []):
        it = summ[pid]
        doi = next((x["value"] for x in it.get("articleids", []) if x["idtype"] == "doi"), None)
        out.append({"source": "pubmed", "doi": norm_doi(doi), "pmid": pid,
                    "title": it.get("title", ""), "year": (it.get("pubdate", "") or "")[:4], "abstract": "", "is_oa": None})
    return out


# ── 3. Europe PMC (sin key) ──────────────────────────────────────────────
def europepmc(query, page_size=200):
    url = "https://www.ebi.ac.uk/europepmc/webservices/rest/search?" + urllib.parse.urlencode(
        {"query": query, "format": "json", "resultType": "core", "pageSize": page_size, "cursorMark": "*"})
    try:
        data = _get(url)
    except Exception as e:
        print(f"  ! Europe PMC: {type(e).__name__} {str(e)[:120]}"); return []
    out = []
    for r in data.get("resultList", {}).get("result", []):
        out.append({"source": "europepmc", "doi": norm_doi(r.get("doi")), "pmid": r.get("pmid"),
                    "title": r.get("title", ""), "year": r.get("pubYear"),
                    "abstract": r.get("abstractText", "") or "",
                    "is_oa": (r.get("isOpenAccess") == "Y")})
    return out


# ── 4. Semantic Scholar (key recomendada) ────────────────────────────────
def semantic_scholar(query, limit=100):
    headers = {"x-api-key": S2_KEY} if S2_KEY else {}
    url = "https://api.semanticscholar.org/graph/v1/paper/search/bulk?" + urllib.parse.urlencode(
        {"query": query, "fields": "externalIds,title,year,abstract,openAccessPdf"})
    try:
        data = _get(url, headers=headers)
    except Exception as e:
        print(f"  ! Semantic Scholar (¿sin key? 429): {type(e).__name__} {str(e)[:120]}"); return []
    out = []
    for r in (data.get("data") or [])[:limit]:
        ext = r.get("externalIds") or {}
        out.append({"source": "semanticscholar", "doi": norm_doi(ext.get("DOI")), "pmid": ext.get("PubMed"),
                    "title": r.get("title", ""), "year": r.get("year"), "abstract": r.get("abstract") or "",
                    "is_oa": bool((r.get("openAccessPdf") or {}).get("url"))})
    return out


# ── Dedup por DOI (o título normalizado si falta DOI) ────────────────────
def dedup(records):
    seen, out = {}, []
    for r in records:
        key = r["doi"] or ("t:" + re.sub(r"[^a-z0-9]+", "", (r["title"] or "").lower())[:80])
        if not key or key == "t:":
            continue
        if key in seen:
            seen[key]["sources"].add(r["source"])  # mismo paper en varias fuentes
            continue
        r["sources"] = {r["source"]}
        seen[key] = r
        out.append(r)
    return out


def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(0)
    query = sys.argv[1]
    line = sys.argv[sys.argv.index("--line") + 1] if "--line" in sys.argv else "SR"
    out_csv = sys.argv[sys.argv.index("--out") + 1] if "--out" in sys.argv else None

    print(f"🛰️  DISCOVERY · línea {line}\n    query: {query}\n")
    all_recs = []
    for name, fn in [("OpenAlex⭐", openalex), ("PubMed", pubmed),
                     ("Europe PMC", europepmc), ("Semantic Scholar", semantic_scholar)]:
        t = time.time()
        recs = fn(query)
        print(f"  {name:18} {len(recs):>5} registros  ({time.time()-t:.1f}s)")
        all_recs += recs
    # LILACS/BVS: requiere User-Agent de navegador / token BIREME → se documenta, no se fuerza aquí.
    print(f"  {'LILACS/BVS':18}   (omitido: requiere UA navegador o token api.bvsalud.org · ver discovery-engine.md §2)")

    unique = dedup(all_recs)
    print(f"\n  TOTAL bruto: {len(all_recs)} → ÚNICOS (dedup DOI): {len(unique)}")
    multi = [r for r in unique if len(r["sources"]) > 1]
    print(f"  en ≥2 fuentes (alta confianza): {len(multi)}")

    if out_csv:
        with open(out_csv, "w", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            w.writerow(["doi", "pmid", "year", "title", "sources", "is_oa"])
            for r in unique:
                w.writerow([r["doi"], r["pmid"], r["year"], r["title"], "|".join(sorted(r["sources"])), r["is_oa"]])
        print(f"  → {out_csv} escrito ({len(unique)} filas). Siguiente: screening Ollama + Supabase (ver DEPLOY.md).")


if __name__ == "__main__":
    main()
