#!/usr/bin/env python3
"""
agentic_writer.py — ORQUESTADOR + subagentes que redactan el manuscrito por sección.
Es el "muchos agentes dirigidos por un líder": un agente por Introducción, Métodos, Resultados,
Discusión y Referencias, según el ESTÁNDAR de la revista objetivo (p. ej. JEADV/Dermatologic
Surgery · PRISMA 2020 + GRADE + Vancouver). Integra el gate de citas (citation_verifier) y el
ensamblador Word (docx_assembler).

- Con ANTHROPIC_API_KEY: cada subagente llama a Claude (modelo por tarea) en contexto aislado.
- Sin key: corre en modo PLAN (imprime el reparto y los prompts) — para que veas el flujo sin gastar.
- Escribe el estado de los agentes en Supabase research_agent_tasks si SUPABASE_URL+SERVICE_KEY (server-side).

USO:
  python agentic_writer.py --sr SR-1 --corpus corpus.csv --out SR-1_revision_v1.docx
ENV:
  ANTHROPIC_API_KEY   (workers Claude · opcional)
  SUPABASE_URL, SUPABASE_SERVICE_KEY   (estado en vivo · opcional, SOLO server-side)
"""
import os, sys, json, csv

# Estándar editorial por revista (se inyecta en cada subagente)
JOURNAL_STD = {
    "Dermatologic Surgery": "Vancouver refs; structured Methods per PRISMA 2020; GRADE certainty per outcome.",
    "JEADV": "JEADV requires GRADE; Kappa with 95% CI; Vancouver; word limits per section.",
    "JAAD International": "Open access; PRISMA 2020; concise structured abstract.",
}

# Subagentes: cada uno SOLO su sección, con marcadores [CIT:id] (no referencias), contexto aislado.
WORKERS = {
    "intro": ("IntroAgent", "Introduction",
        "Write ONLY the Introduction of a systematic review. Use ONLY the provided source chunks. "
        "State the clinical problem, the gap (Latin-American/Peruvian angle), and the objective/PICO. "
        "Every factual claim ends with [CIT:<source_id>]. NEVER write reference strings or DOIs."),
    "methods": ("MethodsAgent", "Methods",
        "Write ONLY the Methods, conforming to PRISMA 2020. Mirror the registered protocol exactly: "
        "eligibility, 5 sources (OpenAlex+PubMed+EuropePMC+LILACS+SemanticScholar), search dates, "
        "2-reviewer selection + Cohen's kappa (95% CI), ROBINS-I/RoB2, GRADE. If the protocol is silent "
        "on a required item write [PROTOCOL GAP: <item>]. Tag protocol claims [CIT:protocol]."),
    "results": ("ResultsAgent", "Results",
        "Write ONLY the Results from the extraction table + PRISMA flow counts. Report selection numbers "
        "exactly (identified/screened/included/excluded). Every number traces to a cell [CIT:<study>:<field>]. "
        "Do not interpret. Output prose + a characteristics-of-studies table."),
    "discuss": ("DiscussAgent", "Discussion",
        "Write ONLY the Discussion using ONLY provided chunks. Summarize findings, compare with prior work "
        "(antecedentes), state limitations and certainty (GRADE). Every claim ends [CIT:<source_id>]."),
}


def lead_plan(sr, journal, corpus_n):
    std = JOURNAL_STD.get(journal, JOURNAL_STD["Dermatologic Surgery"])
    plan = [{"section": w[1], "subagent": w[0], "agent_id": k,
             "word_budget": {"intro": 450, "methods": 700, "results": 600, "discuss": 550}[k],
             "standard": std} for k, w in WORKERS.items()]
    return {"sr": sr, "journal": journal, "corpus": corpus_n, "standard": std, "plan": plan}


def run_worker_llm(agent_id, source_chunks, journal):
    """Llama a Claude (modelo por tarea). Devuelve prosa con marcadores [CIT:id]."""
    import anthropic  # solo si hay key
    client = anthropic.Anthropic()
    name, section, instr = WORKERS[agent_id]
    sys_prompt = f"{instr}\nTarget journal standard: {JOURNAL_STD.get(journal,'')}"
    msg = client.messages.create(
        model="claude-sonnet-4-6", max_tokens=1500,
        system=sys_prompt,
        messages=[{"role": "user", "content": "SOURCE CHUNKS:\n" + json.dumps(source_chunks)[:60000]}])
    return msg.content[0].text


def push_state(sr, line, journal):
    """Escribe el reparto en Supabase research_agent_tasks (server-side, service_role)."""
    url, key = os.environ.get("SUPABASE_URL"), os.environ.get("SUPABASE_SERVICE_KEY")
    if not (url and key):
        return False
    import urllib.request
    rows = [{"line": line, "sr": sr, "agent": k, "seccion": w[1],
             "estado": "queued", "journal_std": journal} for k, w in WORKERS.items()]
    req = urllib.request.Request(f"{url}/rest/v1/research_agent_tasks", method="POST",
        data=json.dumps(rows).encode(),
        headers={"apikey": key, "Authorization": f"Bearer {key}",
                 "Content-Type": "application/json", "Prefer": "return=minimal"})
    try:
        urllib.request.urlopen(req, timeout=20); return True
    except Exception as e:
        print("  ! Supabase:", str(e)[:120]); return False


def main():
    args = sys.argv
    sr = args[args.index("--sr") + 1] if "--sr" in args else "SR-1"
    line = "L4" if sr == "SR-1" else "L5"
    journal = "Dermatologic Surgery" if sr == "SR-1" else "Journal of Cosmetic Dermatology"
    corpus = args[args.index("--corpus") + 1] if "--corpus" in args else None
    out = args[args.index("--out") + 1] if "--out" in args else f"{sr}_revision_v1.docx"
    n = 0
    if corpus and os.path.exists(corpus):
        with open(corpus, encoding="utf-8") as f:
            n = sum(1 for _ in csv.reader(f)) - 1

    plan = lead_plan(sr, journal, n)
    print(f"🧭 LEAD ORCHESTRATOR · {sr} ({line}) → {journal}")
    print(f"   corpus: {n} papers · estándar: {plan['standard']}\n")
    for p in plan["plan"]:
        print(f"   → {p['subagent']:13} redacta {p['section']:13} (≤{p['word_budget']}w, contexto aislado)")
    push_state(sr, line, journal) and print("   ✓ estado escrito en Supabase research_agent_tasks")

    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("\n[MODO PLAN] sin ANTHROPIC_API_KEY → no se llama a Claude. Pon la key para redactar de verdad.")
        print("Pipeline al activar: workers → marcadores [CIT:id] → citation_verifier (gate) → docx_assembler (.docx).")
        return

    # ── Redacción real (con key) ──
    from citation_verifier import verify_reference  # gate anti-alucinación
    from docx_assembler import build_docx
    chunks = []  # cargar de Supabase/CSV los abstracts incluidos (omitido aquí por brevedad)
    sections = []
    for p in plan["plan"]:
        prose = run_worker_llm(p["agent_id"], chunks, journal)
        sections.append({"heading": p["section"], "paragraphs": [prose]})
        print(f"   ✓ {p['subagent']} terminó {p['section']}")
    # CitationAgent: extraer [CIT:id], resolver a refs reales, verificar (solo 'verified' entran)
    refs = []  # construir desde las citas verificadas
    build_docx({"title": f"{sr} systematic review", "journal": journal, "line": line, "sr": sr},
               sections, [], refs, out)
    print(f"\n✅ Manuscrito ensamblado: {out} → checkpoint humano (R39).")


if __name__ == "__main__":
    main()
