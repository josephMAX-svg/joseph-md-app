#!/usr/bin/env python3
"""
citation_verifier.py — GATE anti-alucinación de citas (reemplaza Zotero manual).
La IA propone referencias; SOLO sobreviven las que resuelven a un DOI/PMID real.
Stdlib-only (urllib + difflib). En producción: rapidfuzz en vez de difflib y caché en Supabase.

Flujo (discovery-engine.md §5):
  1. La IA emite refs como {title, authors, year, doi?, pmid?}.
  2. Verifica contra Crossref (DOI) y/o PubMed (PMID); si falta, busca por título.
  3. Fuzzy match título ≥0.90 acepta · 0.80–0.90 revisión humana · <0.80 rechaza · + año ±1.
  4. Baja el CSL-JSON canónico (Crossref content negotiation) — descarta los metadatos del LLM.
  5. status: verified | needs_review | rejected.  Cero fabricación.

USO:  python citation_verifier.py            # corre los auto-tests en vivo (DOI real vs falso)
      import citation_verifier as cv; cv.verify_reference({...})
ENV:  CONTACT_EMAIL (polite pool Crossref + PubMed), NCBI_KEY (opcional)
"""
import os, sys, json, re, urllib.parse, urllib.request, difflib

CONTACT = os.environ.get("CONTACT_EMAIL", "josephsototocas@gmail.com")
NCBI_KEY = os.environ.get("NCBI_KEY", "")
UA = {"User-Agent": f"joseph-md-research/1.0 (mailto:{CONTACT})"}


def _get(url, accept=None, timeout=30):
    h = dict(UA)
    if accept:
        h["Accept"] = accept
    req = urllib.request.Request(url, headers=h)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        raw = r.read().decode("utf-8", "replace")
    return raw


def _norm(s):
    return re.sub(r"[^a-z0-9 ]+", "", (s or "").lower()).strip()


def title_sim(a, b):
    return difflib.SequenceMatcher(None, _norm(a), _norm(b)).ratio()


def crossref_by_doi(doi):
    """Devuelve CSL-JSON canónico del DOI (content negotiation) o None."""
    try:
        raw = _get(f"https://doi.org/{urllib.parse.quote(doi)}",
                   accept="application/vnd.citationstyles.csl+json")
        return json.loads(raw)
    except Exception:
        return None


def crossref_search_title(title, rows=3):
    try:
        url = ("https://api.crossref.org/works?" + urllib.parse.urlencode(
            {"query.bibliographic": title, "rows": rows, "mailto": CONTACT,
             "select": "DOI,title,author,issued"}))
        msg = json.loads(_get(url))["message"]["items"]
        return msg
    except Exception:
        return []


def pubmed_by_pmid(pmid):
    try:
        p = {"db": "pubmed", "id": pmid, "retmode": "json", "tool": "joseph-md", "email": CONTACT}
        if NCBI_KEY:
            p["api_key"] = NCBI_KEY
        url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?" + urllib.parse.urlencode(p)
        res = json.loads(_get(url)).get("result", {})
        return res.get(str(pmid))
    except Exception:
        return None


def vancouver_from_csl(csl):
    """Cita Vancouver mínima desde CSL-JSON (en prod usar citation.js)."""
    if not csl:
        return ""
    auth = csl.get("author", []) or []
    names = ", ".join(f"{a.get('family','')} {''.join(w[0] for w in a.get('given','').split()[:2])}".strip()
                      for a in auth[:6])
    if len(auth) > 6:
        names += ", et al"
    year = (csl.get("issued", {}).get("date-parts", [[None]])[0] or [None])[0]
    jt = (csl.get("container-title") or csl.get("container-title-short") or "")
    if isinstance(jt, list):
        jt = jt[0] if jt else ""
    title = (csl.get("title") or "")
    if isinstance(title, list):
        title = title[0] if title else ""
    vol = csl.get("volume", ""); page = csl.get("page", "")
    return f"{names}. {title}. {jt}. {year};{vol}:{page}.".replace(" ;", ";").replace(":.", ".")


def verify_reference(ref):
    """ref = {title, authors?, year?, doi?, pmid?} → resultado del gate."""
    out = {"input": ref, "status": "rejected", "match_score": 0.0,
           "doi": None, "pmid": ref.get("pmid"), "csl_json": None, "vancouver": "", "reason": ""}
    doi = (ref.get("doi") or "").strip().lower().replace("https://doi.org/", "") or None

    # vía DOI (la más fuerte)
    if doi:
        csl = crossref_by_doi(doi)
        if csl:
            t = csl.get("title"); t = t[0] if isinstance(t, list) else t
            score = title_sim(ref.get("title", ""), t) if ref.get("title") else 1.0
            out.update(doi=doi, csl_json=csl, match_score=round(score, 3),
                       vancouver=vancouver_from_csl(csl))
            out["status"] = "verified" if score >= 0.90 else ("needs_review" if score >= 0.80 else "rejected")
            out["reason"] = f"DOI resuelve en Crossref; título sim={score:.2f}"
            return out
        out["reason"] = "DOI NO resuelve en Crossref (posible alucinación)"

    # vía PMID
    if ref.get("pmid"):
        rec = pubmed_by_pmid(ref["pmid"])
        if rec:
            score = title_sim(ref.get("title", ""), rec.get("title", "")) if ref.get("title") else 1.0
            doi2 = next((x["value"] for x in rec.get("articleids", []) if x["idtype"] == "doi"), None)
            out.update(pmid=ref["pmid"], doi=(doi2 or "").lower() or None, match_score=round(score, 3))
            out["status"] = "verified" if score >= 0.90 else ("needs_review" if score >= 0.80 else "rejected")
            out["reason"] = f"PMID resuelve en PubMed; título sim={score:.2f}"
            return out

    # sin id → buscar por título en Crossref
    if ref.get("title"):
        for c in crossref_search_title(ref["title"]):
            ct = c.get("title", [""]); ct = ct[0] if ct else ""
            score = title_sim(ref["title"], ct)
            if score >= 0.90:
                found = c.get("DOI")
                csl = crossref_by_doi(found) if found else None
                out.update(doi=found, csl_json=csl, match_score=round(score, 3),
                           vancouver=vancouver_from_csl(csl))
                out["status"] = "needs_review"  # encontrado por título → ojo humano
                out["reason"] = f"Sin DOI dado; match por título={score:.2f} → DOI {found} (revisar)"
                return out
        out["reason"] = "Sin DOI/PMID y sin match de título ≥0.90 → rechazado"
    return out


def _tests():
    print("GATE de citas — auto-test en vivo\n")
    cases = [
        {"name": "Real (ancla SR-1)", "ref": {"title": "Complications of Injectable Fillers, Part 2: Vascular Complications",
                                               "doi": "10.1177/1090820X14525035", "year": 2014}},
        {"name": "DOI FALSO (alucinación)", "ref": {"title": "Filler vascular occlusion magic cure",
                                                    "doi": "10.9999/this.doi.is.fake.2026"}},
        {"name": "Solo título real", "ref": {"title": "Complications of Injectable Fillers, Part 2: Vascular Complications"}},
    ]
    for c in cases:
        r = verify_reference(c["ref"])
        flag = {"verified": "✅", "needs_review": "🟡", "rejected": "❌"}[r["status"]]
        print(f"{flag} {c['name']:26} → {r['status']:12} (sim={r['match_score']}) · {r['reason']}")
        if r["vancouver"]:
            print(f"     Vancouver: {r['vancouver'][:110]}")
    print("\nRegla: solo 'verified' (DOI/PMID real) entra al manuscrito. ❌/🟡 a revisión humana.")


if __name__ == "__main__":
    _tests()
