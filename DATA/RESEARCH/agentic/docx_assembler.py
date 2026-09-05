#!/usr/bin/env python3
"""
docx_assembler.py — Ensambla el MANUSCRITO en .docx (Word). El paso que "escribe en Word".
Implementación SOLO-STDLIB (zipfile + XML): genera un .docx VÁLIDO sin instalar nada — un .docx es un
ZIP de OOXML. Word/Google Docs lo abren. Respeta la lección TOC de Word (MD §2.5): documento nuevo, sin
campo TOC que se pise.

PLANTILLAS (--template), añadidas 5-sep-2026 (Palmerton v3 · vacío 10: el pipeline solo sabía montar SR):
  sr      Revisión sistemática PRISMA 2020: Introduction · Methods · Results (+ tabla de estudios) · Discussion · References
  letter  Carta al editor / Notes & Comments: "To the Editor" · (≤ word_limit palabras) · References (≤ ref_limit; la 1ª = artículo diana)
  care    Case report CARE 2013: 13 ítems en orden (Abstract … Informed consent) + Tabla 1 timeline obligatoria
  strobe  Research letter transversal (STROBE): To the Editor · Methods · Results (+ Tabla 1) · Discussion · Declarations
Las plantillas de prompt que producen el JSON de entrada están en prompts_claude_code/{letter_to_editor,
case_report_CARE, research_letter_STROBE}.md.

GATE DE CITAS (obligatorio salvo --no-verify): cada referencia de entrada pasa por citation_verifier.verify_reference;
SOLO las 'verified' (DOI/PMID real en Crossref/PubMed) entran en "References" con su cita Vancouver canónica.
Las 'needs_review' se excluyen (o entran marcadas con --allow-needs-review); las 'rejected' NUNCA entran.
Si una [CIT:id] del texto no tiene referencia verificada, el ensamblador la deja como [CIT:id — NO VERIFICADA] y
avisa: el manuscrito NO está listo para enviar hasta que no queden marcadores.

ENTRADA (--in fichero.json; es lo que devuelven las plantillas de prompt):
  {"meta": {title, journal, authors, word_limit|min_words|max_words, ref_limit, target_doi, keywords...},
   "sections": [{"heading": str, "paragraphs": [str]}],
   "tables":   [{"heading": str, "cols": [str], "keys": [str], "rows": [{key: valor}]}],   (opcional)
   "figures":  [{"id": "Figure 1", "legend": str}],                                          (opcional)
   "refs":     [{"id": str, "doi"?: str, "pmid"?: str, "title"?: str, "year"?: int} | "cita Vancouver ya verificada"]}

USO:
  python docx_assembler.py --template letter --in CARTA_1/carta.json --out CARTA_1/carta_v1.docx
  python docx_assembler.py --template care   --demo --no-verify --out demo_care.docx      # esqueleto con las 13 secciones
  python docx_assembler.py --template strobe --demo --out demo_strobe.docx                # demo con gate en vivo (Crossref)
  python docx_assembler.py SR-1_revision_v1.docx                                          # legado: demo SR (sin gate)
API (agentic_writer.py): build_docx(meta, sections, table_rows, refs, out_path, template="sr", tables=None, figures=None)
ENV: CONTACT_EMAIL / NCBI_KEY (los usa citation_verifier).
"""
import sys, os, re, json, zipfile, argparse, xml.sax.saxutils as sx

TEMPLATES = ("sr", "letter", "care", "strobe")

# Secciones obligatorias por plantilla (en orden). CARE = ítems 3-13 del checklist (1 título y 2 keywords van en meta).
REQUIRED_SECTIONS = {
    "sr": ["Introduction", "Methods", "Results", "Discussion"],
    "letter": ["To the Editor"],
    "care": ["Abstract", "Introduction", "Patient information", "Clinical findings", "Timeline",
             "Diagnostic assessment", "Therapeutic intervention", "Follow-up and outcomes", "Discussion",
             "Patient perspective", "Informed consent"],
    "strobe": ["To the Editor", "Methods", "Results", "Discussion", "Declarations"],
}
CARE_ITEM_OF = {"Abstract": 3, "Introduction": 4, "Patient information": 5, "Clinical findings": 6, "Timeline": 7,
                "Diagnostic assessment": 8, "Therapeutic intervention": 9, "Follow-up and outcomes": 10,
                "Discussion": 11, "Patient perspective": 12, "Informed consent": 13}
# Secciones que NO cuentan para el límite de palabras del cuerpo
NOT_BODY = {"Abstract", "Declarations", "Informed consent", "References"}
DEFAULT_LIMITS = {"sr": (None, None, None), "letter": (None, 500, 5), "care": (600, 1200, 10), "strobe": (600, 1000, 10)}


# ───────────────────────── OOXML helpers ─────────────────────────
def _p(text, style=None, bold=False, italic=False):
    pr = f'<w:pPr><w:pStyle w:val="{style}"/></w:pPr>' if style else ""
    rpr = "<w:rPr>" + ("<w:b/>" if bold else "") + ("<w:i/>" if italic else "") + "</w:rPr>" if (bold or italic) else ""
    return f'<w:p>{pr}<w:r>{rpr}<w:t xml:space="preserve">{sx.escape(text)}</w:t></w:r></w:p>'


def _heading(text, lvl=1):
    return _p(text, style=f"Heading{lvl}")


def _table(rows, cols, keys=None):
    """Tabla genérica. keys = claves de cada fila en el orden de cols (por defecto, las de la tabla de estudios SR)."""
    keys = keys or ["study", "design", "n", "intervention", "comparator", "outcome", "effect"]

    def cell(t, header=False):
        rpr = "<w:rPr><w:b/></w:rPr>" if header else ""
        return (f'<w:tc><w:tcPr><w:tcW w:w="1300" w:type="dxa"/></w:tcPr>'
                f'<w:p><w:r>{rpr}<w:t xml:space="preserve">{sx.escape(str(t))}</w:t></w:r></w:p></w:tc>')
    head = "<w:tr>" + "".join(cell(c, True) for c in cols) + "</w:tr>"
    body = ""
    for r in rows:
        body += "<w:tr>" + "".join(cell(r.get(k, "not reported")) for k in keys) + "</w:tr>"
    borders = ('<w:tblBorders><w:top w:val="single" w:sz="4"/><w:left w:val="single" w:sz="4"/>'
               '<w:bottom w:val="single" w:sz="4"/><w:right w:val="single" w:sz="4"/>'
               '<w:insideH w:val="single" w:sz="4"/><w:insideV w:val="single" w:sz="4"/></w:tblBorders>')
    return f'<w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto"/>{borders}</w:tblPr>{head}{body}</w:tbl>'


def _write_docx(body_xml, out_path):
    document = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        f'<w:body>{body_xml}'
        '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/></w:sectPr></w:body></w:document>')
    ctypes = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
              '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
              '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
              '<Default Extension="xml" ContentType="application/xml"/>'
              '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
              '</Types>')
    rels = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
            '</Relationships>')
    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", ctypes)
        z.writestr("_rels/.rels", rels)
        z.writestr("word/document.xml", document)
    return out_path


# ───────────────────────── gate de citas ─────────────────────────
def gate_refs(refs, verify=True, allow_needs_review=False, log=print):
    """refs → (lista_vancouver_numerada_en_orden, mapa id→n, avisos).
    Cada ref puede ser str (cita ya verificada a mano; solo se acepta con verify=False) o dict {id, doi, pmid, title, year}.
    Con verify=True se llama a citation_verifier.verify_reference y SOLO entran las 'verified'."""
    out, id_of, warnings = [], {}, []
    if verify:
        try:
            from citation_verifier import verify_reference
        except ImportError:
            sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
            from citation_verifier import verify_reference
    for i, ref in enumerate(refs or []):
        rid = ref.get("id") if isinstance(ref, dict) else f"r{i + 1}"
        if isinstance(ref, str):
            if verify:
                warnings.append(f"ref '{rid}' es texto plano sin DOI/PMID → no verificable → EXCLUIDA (usa dict con doi)")
                continue
            out.append(ref); id_of[rid] = len(out); continue
        if not verify:
            txt = ref.get("vancouver") or ref.get("title") or json.dumps(ref)
            out.append(txt); id_of[rid] = len(out); continue
        r = verify_reference({k: ref.get(k) for k in ("title", "authors", "year", "doi", "pmid") if ref.get(k)})
        status = r["status"]
        if status == "verified" or (status == "needs_review" and allow_needs_review):
            van = r.get("vancouver") or ref.get("title") or ref.get("doi") or ""
            if r.get("doi") and r["doi"] not in van:
                van = (van.rstrip(".") + f". doi:{r['doi']}") if van else f"doi:{r['doi']}"
            if status == "needs_review":
                van += "  [NEEDS REVIEW — confirmar a mano]"
            out.append(van); id_of[rid] = len(out)
            log(f"   {'✅' if status == 'verified' else '🟡'} [{rid}] {status} · {r['reason']}")
        else:
            warnings.append(f"ref '{rid}' {status}: {r['reason']} → EXCLUIDA")
            log(f"   ❌ [{rid}] {status} · {r['reason']} → EXCLUIDA")
    return out, id_of, warnings


def _resolve_markers(text, id_of):
    """[CIT:id] → [n] si la referencia está verificada; si no, [CIT:id — NO VERIFICADA] (bloquea el envío)."""
    missing = []

    def rep(m):
        rid = m.group(1).strip()
        if rid in id_of:
            return f"[{id_of[rid]}]"
        missing.append(rid)
        return f"[CIT:{rid} — NO VERIFICADA]"
    return re.sub(r"\[CIT:([^\]]+)\]", rep, text), missing


def _word_count(sections):
    n = 0
    for s in sections:
        if s.get("heading") in NOT_BODY:
            continue
        for para in s.get("paragraphs", []):
            n += len(re.findall(r"\b[\w'’-]+\b", re.sub(r"\[[^\]]*\]", "", para)))
    return n


# ───────────────────────── ensamblado ─────────────────────────
def build_docx(meta, sections, table_rows, refs, out_path, template="sr", tables=None, figures=None,
               verify=False, allow_needs_review=False, strict=True):
    """Compatibilidad: build_docx(meta, sections, table_rows, refs, out) == plantilla 'sr' sin gate (agentic_writer).
    Devuelve out_path. Lanza ValueError si faltan secciones obligatorias (strict) o la tabla timeline de CARE."""
    if template not in TEMPLATES:
        raise ValueError(f"template debe ser uno de {TEMPLATES}")
    sections = list(sections or [])
    tables = list(tables or [])
    figures = list(figures or [])
    problems = []

    # 1) secciones obligatorias
    have = [s.get("heading") for s in sections]
    missing_secs = [h for h in REQUIRED_SECTIONS[template] if h not in have]
    if missing_secs:
        problems.append(f"faltan secciones obligatorias de '{template}': {missing_secs}")
    if template == "care" and not tables:
        problems.append("CARE ítem 7: falta tables[0] (timeline) — obligatoria")
    if template == "letter" and not (meta.get("target_doi") or (refs and isinstance(refs[0], dict) and refs[0].get("doi"))):
        problems.append("letter: falta meta.target_doi (el artículo diana debe ser la 1ª referencia)")

    # 2) gate de citas
    ref_list, id_of, warns = gate_refs(refs, verify=verify, allow_needs_review=allow_needs_review)
    problems.extend(warns)

    # 3) límites
    min_w, max_w, max_r = DEFAULT_LIMITS[template]
    min_w = meta.get("min_words", min_w); max_w = meta.get("max_words", meta.get("word_limit", max_w))
    max_r = meta.get("ref_limit", max_r)
    wc = _word_count(sections)
    if max_w and wc > int(max_w):
        problems.append(f"cuerpo = {wc} palabras > límite {max_w}")
    if min_w and wc < int(min_w):
        problems.append(f"cuerpo = {wc} palabras < mínimo {min_w}")
    if max_r and len(ref_list) > int(max_r):
        problems.append(f"{len(ref_list)} referencias > límite {max_r}")

    # 4) cuerpo
    body = [_p(meta.get("title", "Untitled"), style="Title")]
    if meta.get("authors"):
        body.append(_p(str(meta["authors"])))
    sub = {"sr": f'Target: {meta.get("journal", "JEADV")} · {meta.get("line", "")} {meta.get("sr", "")} · PRISMA 2020 + GRADE · citas Vancouver verificadas',
           "letter": f'{meta.get("journal", "")} · {meta.get("section", "Letter to the Editor")} · re: doi:{meta.get("target_doi", "")}',
           "care": f'{meta.get("journal", "")} · Case report · CARE 2013 checklist (13 items) · Keywords: {", ".join(meta.get("keywords", []))}',
           "strobe": f'{meta.get("journal", "")} · {meta.get("article_type", "Research Letter")} · STROBE (cross-sectional) · Keywords: {", ".join(meta.get("keywords", []))}'}[template]
    body.append(_p(sub, italic=True))
    all_missing = []
    for sec in sections:
        h = sec.get("heading", "")
        if template == "care" and h in CARE_ITEM_OF:
            body.append(_heading(f"{h}  (CARE {CARE_ITEM_OF[h]})", 1))
        elif template in ("letter", "strobe") and h == "To the Editor":
            body.append(_p("To the Editor,", bold=True))
        else:
            body.append(_heading(h, 1))
        for para in sec.get("paragraphs", []):
            txt, miss = _resolve_markers(para, id_of)
            all_missing.extend(miss)
            body.append(_p(txt))
        if template == "sr" and h.lower().startswith("results") and table_rows:
            body.append(_heading("Characteristics of included studies", 2))
            body.append(_table(table_rows, ["Study", "Design", "n", "Intervention", "Comparator", "Outcome", "Effect"]))
        if template == "care" and h == "Timeline" and tables:
            t = tables[0]
            body.append(_p(t.get("heading", "Table 1. Timeline"), bold=True))
            body.append(_table(t.get("rows", []), t.get("cols", []), t.get("keys")))
        if template == "strobe" and h == "Results" and tables:
            t = tables[0]
            body.append(_p(t.get("heading", "Table 1"), bold=True))
            body.append(_table(t.get("rows", []), t.get("cols", []), t.get("keys")))
    # tablas restantes (las no colocadas en línea)
    placed = 1 if (template in ("care", "strobe") and tables) else 0
    for t in tables[placed:]:
        body.append(_p(t.get("heading", "Table"), bold=True))
        body.append(_table(t.get("rows", []), t.get("cols", []), t.get("keys")))
    if figures:
        body.append(_heading("Figure legends", 1))
        for f in figures:
            body.append(_p(f'{f.get("id", "Figure")}. {f.get("legend", "")}'))
    body.append(_heading("References", 1))
    for i, r in enumerate(ref_list, 1):
        body.append(_p(f"{i}. {r}"))
    if all_missing:
        problems.append(f"marcadores sin referencia verificada: {sorted(set(all_missing))}")

    if problems and strict:
        blocking = [p for p in problems if p.startswith("faltan") or p.startswith("CARE ítem 7") or p.startswith("letter:")]
        if blocking:
            raise ValueError("; ".join(blocking))
    _write_docx("".join(body), out_path)
    build_docx.last_report = {"words": wc, "refs": len(ref_list), "problems": problems, "template": template}
    return out_path


build_docx.last_report = {}


# ───────────────────────── demos por plantilla ─────────────────────────
def demo_payload(template):
    if template == "sr":
        return {
            "meta": {"title": "Vascular complications of facial fillers and time-to-treatment with hyaluronidase: a systematic review",
                     "journal": "Dermatologic Surgery", "line": "L4", "sr": "SR-1"},
            "sections": [
                {"heading": "Introduction", "paragraphs": [
                    "Soft-tissue filler use is rising worldwide, and vascular occlusion is its most feared complication [CIT:delorenzi]. "
                    "Time-to-treatment with hyaluronidase is the key prognostic factor, yet no synthesis exists with a "
                    "Latin-American lens [PLACEHOLDER: subagente IntroAgent rellena con corpus recuperado]."]},
                {"heading": "Methods", "paragraphs": [
                    "We followed PRISMA 2020. Protocol registered in PROSPERO (CRD: ____). Sources: OpenAlex, MEDLINE, "
                    "Europe PMC, LILACS, Semantic Scholar; two independent reviewers; Cohen's kappa with 95% CI; "
                    "risk of bias by ROBINS-I; certainty by GRADE."]},
                {"heading": "Results", "paragraphs": [
                    "The search yielded 804 records; 666 after de-duplication; k studies met inclusion "
                    "[PLACEHOLDER: ResultsAgent · forest plot de tiempo-a-tratamiento]."]},
                {"heading": "Discussion", "paragraphs": [
                    "Earlier hyaluronidase administration is associated with better recovery [PLACEHOLDER: DiscussAgent]. "
                    "Limitations: predominance of case reports; publication bias likely."]}],
            "table_rows": [{"study": "DeLorenzi 2014", "design": "Review/expert", "n": "—", "intervention": "hyaluronidase",
                            "comparator": "—", "outcome": "recovery", "effect": "narrative"}],
            "refs": [{"id": "delorenzi", "title": "Complications of Injectable Fillers, Part 2: Vascular Complications",
                      "doi": "10.1177/1090820X14525035", "year": 2014}],
        }
    if template == "letter":
        return {
            "meta": {"title": "Filler complications in Latin America: the gap that hyaluronidase cannot close",
                     "journal": "Journal of Cosmetic Dermatology", "section": "Letter to the Editor",
                     "target_doi": "10.1111/jocd.71104", "authors": "Joseph Max Soto Tocas; Ciro Jesús Rodríguez Aliaga",
                     "word_limit": 500, "ref_limit": 5},
            "sections": [{"heading": "To the Editor", "paragraphs": [
                "We read with interest the comprehensive review of hyaluronic acid and calcium hydroxylapatite filler complications [CIT:target].",
                "[BORRADOR — sustituir por el texto generado con prompts_claude_code/letter_to_editor.md] The high-dose hyaluronidase "
                "protocol remains the cornerstone of vascular rescue [CIT:delorenzi]; however, [NEEDS SOURCE: series latinoamericanas de PMMA/silicona].",
                "We suggest that future guidance explicitly address non-degradable fillers and post-inflammatory hyperpigmentation in phototypes IV-VI."]}],
            "refs": [{"id": "target", "doi": "10.1111/jocd.71104",
                      "title": "Complications of Hyaluronic Acid and Calcium Hydroxylapatite Fillers—A Comprehensive Narrative Review of Clinical Presentation and Current Management Strategies"},
                     {"id": "delorenzi", "doi": "10.1177/1090820X14525035", "title": "Complications of Injectable Fillers, Part 2: Vascular Complications"}],
        }
    if template == "care":
        secs = [(h, [f"[{h} — rellenar con prompts_claude_code/case_report_CARE.md; CARE item {CARE_ITEM_OF[h]}]"])
                for h in REQUIRED_SECTIONS["care"]]
        secs[4] = ("Timeline", ["The clinical course is summarised in Table 1."])
        secs[-1] = ("Informed consent", ["Written informed consent for publication of clinical details and clinical images was obtained "
                                          "from the patient. A copy of the consent form is available for review by the Editor-in-Chief of this journal on request."])
        return {
            "meta": {"title": "[Diagnosis]: a case report", "keywords": ["[diagnosis]", "case report"],
                     "journal": "Dermatology Online Journal", "authors": "[first author]; [senior author]",
                     "min_words": 600, "max_words": 1200, "ref_limit": 10},
            "sections": [{"heading": h, "paragraphs": p} for h, p in secs],
            "tables": [{"heading": "Table 1. Timeline of the clinical course", "cols": ["Day", "Event / finding", "Intervention", "Outcome"],
                        "keys": ["day", "event", "intervention", "outcome"],
                        "rows": [{"day": "Day 0", "event": "[presentation]", "intervention": "[treatment]", "outcome": "[outcome]"},
                                 {"day": "Day 7", "event": "[follow-up]", "intervention": "—", "outcome": "[outcome]"}]}],
            "figures": [{"id": "Figure 1", "legend": "[Day 0, frontal view — describe; no identifying features]"}],
            "refs": [],
        }
    # strobe
    return {
        "meta": {"title": "Acne severity and quality of life in Peruvian adolescent girls: a school-based cross-sectional study",
                 "journal": "JAAD International", "article_type": "Research Letter",
                 "authors": "Joseph Max Soto Tocas; Ciro Jesús Rodríguez Aliaga",
                 "keywords": ["acne vulgaris", "quality of life", "adolescent", "Peru", "CADI", "IGA"],
                 "min_words": 600, "max_words": 1000, "ref_limit": 10},
        "sections": [
            {"heading": "To the Editor", "paragraphs": ["[Párrafo 1 — contexto y gap; generar con prompts_claude_code/research_letter_STROBE.md] [CIT:cadi]"]},
            {"heading": "Methods", "paragraphs": ["Cross-sectional census (n = 865 screened; 316 with IGA ≥ 1). IGA 0-4; weighted kappa 0.81 vs dermatologist. CADI 0-15. Spearman with bootstrap 95% CI. Ethics: [TO VERIFY: CEI no./date or exemption]."]},
            {"heading": "Results", "paragraphs": ["Prevalence of acne 39.8%. rs = 0.637 (95% CI 0.563-0.699; p < .001); 70.6% moderate-to-severe impairment (Table 1, Figure 1)."]},
            {"heading": "Discussion", "paragraphs": ["[Hallazgo clave · comparación con series previas [CIT:cadi] · limitaciones · generalizabilidad · siguiente paso]"]},
            {"heading": "Declarations", "paragraphs": ["Funding: none.", "Conflicts of interest: none declared.",
                                                       "Ethics and consent: [TO VERIFY — frase exacta de TESIS_L0/etica.md §3].",
                                                       "Data availability: de-identified dataset and analysis code available from the corresponding author on reasonable request.",
                                                       "Author contributions (CRediT): JMST — conceptualization, investigation, formal analysis, writing – original draft; CJRA — supervision, validation, writing – review & editing.",
                                                       "This work is based on the first author's medical thesis (Universidad Nacional del Centro del Perú, defended 20 April 2026)."]}],
        "tables": [{"heading": "Table 1. Participants by acne severity (IGA) and quality-of-life impairment (CADI)",
                    "cols": ["IGA grade", "n (%)", "Age, mean (SD)", "CADI, median [IQR]", "CADI moderate-severe, n (%)"],
                    "keys": ["iga", "n", "age", "cadi", "modsev"],
                    "rows": [{"iga": g, "n": "[TO VERIFY]", "age": "[TO VERIFY]", "cadi": "[TO VERIFY]", "modsev": "[TO VERIFY]"}
                             for g in ("1 (almost clear)", "2 (mild)", "3 (moderate)", "4 (severe)")] +
                            [{"iga": "Total", "n": "316 (100)", "age": "[TO VERIFY]", "cadi": "[TO VERIFY]", "modsev": "[TO VERIFY] (70.6)"}]}],
        "figures": [{"id": "Figure 1", "legend": "CADI score by IGA grade (box plot with individual points; Spearman rs = 0.637)."}],
        "refs": [{"id": "cadi", "title": "Practical use of a disability index in the routine management of acne",
                  "doi": "10.1111/j.1365-2230.1992.tb02521.x", "year": 1992}],
    }


def main(argv=None):
    ap = argparse.ArgumentParser(prog="docx_assembler.py",
                                 description="Ensambla un manuscrito .docx (stdlib) con gate de citas por plantilla: sr | letter | care | strobe.")
    ap.add_argument("legacy_out", nargs="?", help="(legado) ruta .docx → demo SR sin gate, como antes")
    ap.add_argument("--template", "-t", choices=TEMPLATES, default="sr", help="plantilla editorial (default: sr)")
    ap.add_argument("--in", dest="inp", help="JSON de entrada (salida de prompts_claude_code/*.md)")
    ap.add_argument("--out", "-o", help="ruta del .docx de salida (default: <template>_v1.docx)")
    ap.add_argument("--demo", action="store_true", help="usa el esqueleto de demostración de la plantilla")
    ap.add_argument("--no-verify", action="store_true", help="salta el gate de citas (SOLO para esqueletos/pruebas offline)")
    ap.add_argument("--allow-needs-review", action="store_true", help="deja entrar refs 'needs_review' (marcadas) además de 'verified'")
    ap.add_argument("--lenient", action="store_true", help="no falla por secciones obligatorias ausentes (solo avisa)")
    a = ap.parse_args(argv)

    if a.legacy_out and not a.inp and not a.demo:
        payload, a.template, a.out, a.no_verify = demo_payload("sr"), "sr", a.legacy_out, True
    elif a.inp:
        with open(a.inp, encoding="utf-8") as f:
            payload = json.load(f)
    elif a.demo:
        payload = demo_payload(a.template)
    else:
        ap.error("indica --in fichero.json o --demo (o una ruta .docx legada)")
    out = a.out or f"{a.template}_v1.docx"
    print(f"📄 plantilla={a.template} · gate de citas={'OFF (--no-verify)' if a.no_verify else 'ON (citation_verifier)'} · salida={out}")
    try:
        build_docx(payload.get("meta", {}), payload.get("sections", []), payload.get("table_rows", []),
                   payload.get("refs", []), out, template=a.template, tables=payload.get("tables"),
                   figures=payload.get("figures"), verify=not a.no_verify,
                   allow_needs_review=a.allow_needs_review, strict=not a.lenient)
    except ValueError as e:
        print(f"❌ NO se generó el .docx: {e}")
        return 2
    rep = build_docx.last_report
    print(f"✅ .docx generado: {out} ({os.path.getsize(out)} bytes) · cuerpo {rep['words']} palabras · {rep['refs']} refs verificadas")
    if rep["problems"]:
        print("⚠ NO LISTO PARA ENVIAR — resolver antes:")
        for p in rep["problems"]:
            print(f"   - {p}")
        return 1
    print("   listo para checkpoint humano (revisión del coautor).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
