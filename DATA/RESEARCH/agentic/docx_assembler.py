#!/usr/bin/env python3
"""
docx_assembler.py — Ensambla el MANUSCRITO en .docx (Word). El paso que "escribe en Word".
En producción usa python-docx; aquí va una implementación SOLO-STDLIB (zipfile + XML) para que
genere un .docx VÁLIDO sin instalar nada — un .docx es un ZIP de OOXML. Word/Google Docs lo abren.

Entrada (lo que devuelven los subagentes + el CitationAgent ya verificado):
  build_docx(meta, sections, table_rows, refs, out_path)
    meta = {title, journal, line, sr}
    sections = [{heading, paragraphs:[str]}]   (con citas ya como [n], no [CIT:id])
    table_rows = [{study, design, n, intervention, comparator, outcome, effect}]
    refs = [str Vancouver verificadas]          (SOLO verificadas — gate CitationAgent)

Respeta la lección TOC de Word (MD §2.5): documento nuevo, sin campo TOC que se pise.
"""
import sys, os, zipfile, xml.sax.saxutils as sx


def _p(text, style=None, bold=False):
    pr = f'<w:pPr><w:pStyle w:val="{style}"/></w:pPr>' if style else ""
    rpr = "<w:rPr><w:b/></w:rPr>" if bold else ""
    return f'<w:p>{pr}<w:r>{rpr}<w:t xml:space="preserve">{sx.escape(text)}</w:t></w:r></w:p>'


def _heading(text, lvl=1):
    return _p(text, style=f"Heading{lvl}")


def _table(rows, cols):
    def cell(t, header=False):
        rpr = "<w:rPr><w:b/></w:rPr>" if header else ""
        return (f'<w:tc><w:tcPr><w:tcW w:w="1300" w:type="dxa"/></w:tcPr>'
                f'<w:p><w:r>{rpr}<w:t xml:space="preserve">{sx.escape(str(t))}</w:t></w:r></w:p></w:tc>')
    head = "<w:tr>" + "".join(cell(c, True) for c in cols) + "</w:tr>"
    body = ""
    for r in rows:
        body += "<w:tr>" + "".join(cell(r.get(k, "not reported")) for k in
                                   ["study", "design", "n", "intervention", "comparator", "outcome", "effect"]) + "</w:tr>"
    borders = ('<w:tblBorders><w:top w:val="single" w:sz="4"/><w:left w:val="single" w:sz="4"/>'
               '<w:bottom w:val="single" w:sz="4"/><w:right w:val="single" w:sz="4"/>'
               '<w:insideH w:val="single" w:sz="4"/><w:insideV w:val="single" w:sz="4"/></w:tblBorders>')
    return f'<w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto"/>{borders}</w:tblPr>{head}{body}</w:tbl>'


def build_docx(meta, sections, table_rows, refs, out_path):
    body = [_p(meta["title"], style="Title")]
    body.append(_p(f'Target: {meta.get("journal","JEADV")} · {meta.get("line","")} {meta.get("sr","")} · '
                   f'PRISMA 2020 + GRADE · citas Vancouver verificadas', bold=False))
    for sec in sections:
        body.append(_heading(sec["heading"], 1))
        for para in sec.get("paragraphs", []):
            body.append(_p(para))
        if sec["heading"].lower().startswith("results") and table_rows:
            body.append(_heading("Characteristics of included studies", 2))
            body.append(_table(table_rows, ["Study", "Design", "n", "Intervention", "Comparator", "Outcome", "Effect"]))
    body.append(_heading("References", 1))
    for i, r in enumerate(refs, 1):
        body.append(_p(f"{i}. {r}"))

    document = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        f'<w:body>{"".join(body)}'
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


def _demo():
    meta = {"title": "Vascular complications of facial fillers and time-to-treatment with hyaluronidase: a systematic review",
            "journal": "Dermatologic Surgery", "line": "L4", "sr": "SR-1"}
    sections = [
        {"heading": "Introduction", "paragraphs": [
            "Soft-tissue filler use is rising worldwide, and vascular occlusion is its most feared complication [1]. "
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
            "Limitations: predominance of case reports; publication bias likely."]},
    ]
    table_rows = [{"study": "DeLorenzi 2014", "design": "Review/expert", "n": "—",
                   "intervention": "hyaluronidase", "comparator": "—", "outcome": "recovery", "effect": "narrative"}]
    refs = ["DeLorenzi C. Complications of Injectable Fillers, Part 2: Vascular Complications. Aesthet Surg J. 2014;34(4):584-600."]
    out = sys.argv[1] if len(sys.argv) > 1 else "SR-1_revision_v1.docx"
    build_docx(meta, sections, table_rows, refs, out)
    print(f"✅ .docx generado: {out} ({os.path.getsize(out)} bytes) · ábrelo en Word/Google Docs.")


if __name__ == "__main__":
    _demo()
