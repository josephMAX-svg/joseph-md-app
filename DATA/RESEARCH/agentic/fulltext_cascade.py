#!/usr/bin/env python3
"""
fulltext_cascade.py — Resolver de TEXTO COMPLETO legal por DOI (cascada del manual §6).
Etapa 1 (Unpaywall, de OurResearch) implementada y probada; etapas 2-6 documentadas como
resolvers encadenables. Stdlib-only.

Orden de la cascada (corta al primer PDF):
  1. Unpaywall  api.unpaywall.org/v2/{DOI}?email=   → best_oa_location.url_for_pdf
  2. Europe PMC fullTextUrlList (resultType=core)
  3. PMC OA subset
  4. Preprints (bioRxiv/medRxiv/arXiv)
  5. ALICIA-CONCYTEC (OAI-PMH) — repositorio peruano
  6. Solicitud al autor (email) — último recurso

USO:  python fulltext_cascade.py 10.1177/1090820X14525035
ENV:  CONTACT_EMAIL (obligatorio para Unpaywall)
"""
import os, sys, json, urllib.parse, urllib.request

CONTACT = os.environ.get("CONTACT_EMAIL", "josephsototocas@gmail.com")
UA = {"User-Agent": f"joseph-md-research/1.0 (mailto:{CONTACT})"}


def _get(url, timeout=30):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.load(r)


def unpaywall(doi):
    """Etapa 1: ¿hay copia OA legal? Devuelve (pdf_url|None, meta)."""
    try:
        d = _get(f"https://api.unpaywall.org/v2/{urllib.parse.quote(doi)}?email={urllib.parse.quote(CONTACT)}")
    except Exception as e:
        return None, {"error": f"{type(e).__name__}: {str(e)[:120]}"}
    if not d.get("is_oa"):
        return None, {"is_oa": False, "oa_status": d.get("oa_status"), "title": d.get("title")}
    loc = d.get("best_oa_location") or {}
    return (loc.get("url_for_pdf") or loc.get("url")), {
        "is_oa": True, "oa_status": d.get("oa_status"),
        "host_type": loc.get("host_type"), "version": loc.get("version"),
        "license": loc.get("license"), "title": d.get("title")}


def europepmc_fulltext(doi):
    """Etapa 2: enlaces de texto completo OA en Europe PMC."""
    try:
        url = ("https://www.ebi.ac.uk/europepmc/webservices/rest/search?" + urllib.parse.urlencode(
            {"query": f"DOI:{doi}", "format": "json", "resultType": "core", "pageSize": 1}))
        res = _get(url).get("resultList", {}).get("result", [])
        if not res:
            return None
        for u in (res[0].get("fullTextUrlList", {}) or {}).get("fullTextUrl", []):
            if u.get("availabilityCode") == "OA" and u.get("documentStyle") in ("pdf", "html"):
                return u.get("url")
    except Exception:
        pass
    return None


def resolve(doi):
    """Cascada: corta al primer PDF. Devuelve dict con la etapa ganadora."""
    pdf, meta = unpaywall(doi)
    if pdf:
        return {"doi": doi, "pdf_url": pdf, "stage": "1-unpaywall", **meta}
    ft = europepmc_fulltext(doi)
    if ft:
        return {"doi": doi, "pdf_url": ft, "stage": "2-europepmc", **meta}
    # etapas 3-6: PMC OA / preprints / ALICIA-CONCYTEC / autor → marcar para gestión manual
    return {"doi": doi, "pdf_url": None, "stage": "manual", **meta,
            "note": "OA no localizado en etapas 1-2; intentar PMC/preprints/ALICIA o pedir al autor"}


if __name__ == "__main__":
    doi = sys.argv[1] if len(sys.argv) > 1 else "10.1177/1090820X14525035"
    print(f"Cascada texto completo · DOI {doi}\n")
    r = resolve(doi)
    print(json.dumps(r, indent=2, ensure_ascii=False))
    print("\n→", "PDF OA:" , r["pdf_url"] if r["pdf_url"] else "no OA (gestión manual)")
