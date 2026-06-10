# Sistema agéntico para redactar revisiones sistemáticas en Word (refinado 2026)

> **Tesis central, validada por la evidencia:** el LLM redactor **nunca** genera las referencias de memoria. Cita **solo** desde un corpus recuperado y verificado mecánicamente, y la **atribución de citas es un paso separado al final**, no parte de la redacción. Esto es exactamente lo que Anthropic implementa en producción con su `CitationAgent`, y lo que la investigación de RAG de 2025–2026 confirma: *"Standard RAG does not prevent hallucination, as models may fabricate citations."*

---

## 1. Por qué orchestrator-worker (y no un solo agente)

El patrón **orquestador + subagentes** que se describe aquí es literalmente la arquitectura de producción de Anthropic para investigación: *"a lead agent coordinates the process while delegating to specialized subagents that operate in parallel"*, donde cada subagente *"operates with its own context window, tools, and exploration trajectory"* y *"doesn't know the other subagents exist"*.

Reglas de asignación documentadas por Anthropic (transferibles a una RS):

| Complejidad de la tarea | Subagentes | Tool calls c/u |
|---|---|---|
| Hallazgo de un solo hecho | 1 | 3–10 |
| Comparación directa | 2–4 | 10–15 |
| Investigación compleja / multi-aspecto | >10 | variable |

**Mapeo a tu revisión sistemática:** `lead = orquestador`; subagentes = `intro`, `métodos`, `resultados`, `discusión`. El paso de citas (`CitationAgent`) corre **después** de salir del loop de redacción.

> **Coste a presupuestar:** los sistemas multi-agente consumen **~15x más tokens** que un chat normal (dato de Anthropic). Reserva este patrón para el **documento final de alto valor**, no para borradores exploratorios.

---

## 2. Arquitectura concreta (diagrama de flujo)

```
                         ┌──────────────────────────────┐
                         │  HUMANO (PI / autor sénior)  │
                         │  Checkpoints 1–4             │
                         └──────────────┬───────────────┘
                                        │ aprueba / corrige
                ┌───────────────────────▼────────────────────────┐
                │              ORQUESTADOR (lead agent)           │
                │  - lee protocolo PROSPERO + tabla de extracción │
                │  - planifica outline (PRISMA 2020)              │
                │  - delega por sección, ensambla, gatea QA       │
                └───┬──────────┬──────────┬──────────┬───────────┘
       contexto     │          │          │          │   aislado por subagente
       ┌────────────▼┐ ┌───────▼─────┐ ┌──▼─────────┐ ┌▼────────────┐
       │ IntroAgent  │ │ MethodsAgent│ │ResultsAgent│ │DiscussAgent │
       │ (RAG: corpus│ │ (RAG: proto-│ │(RAG: tabla │ │(RAG: corpus │
       │  incluido)  │ │  colo+PRISMA│ │ extracción)│ │  + límites) │
       └──────┬──────┘ └──────┬──────┘ └─────┬──────┘ └──────┬──────┘
              │ claims con marcadores [CIT:id] (NO referencias)
              └──────────────┬─────────────────────────┘
                             ▼
              ┌───────────────────────────────┐   ── PASO SEPARADO ──
              │   CitationAgent / QA de citas  │
              │  - extrae cada claim numérico  │
              │  - lo empareja con pasaje fuente│
              │  - valida DOI vs CrossRef/PubMed│
              │  - marca [NO VERIFICABLE]       │
              └───────────────┬───────────────┘
                              ▼
              ┌───────────────────────────────┐
              │   AssemblerAgent (python-docx) │
              │  - .docx: estilos, headings,   │
              │    tablas, refs numeradas      │
              └───────────────┬───────────────┘
                              ▼
                        revision_v{n}.docx
```

---

## 3. Stack de herramientas reales (todo verificado)

### 3.1 Orquestación — elige una de tres

| Opción | Cuándo usarla | Mecanismo de pausa humana |
|---|---|---|
| **Claude Agent SDK** | Control nativo de subagentes con aislamiento de contexto. Parámetro `agents` para definir roles y `tools` restringidas por rol. | Permisos / hooks por herramienta |
| **LangGraph 1.x** (`interrupt()` + checkpointer) | Control fino del estado y pausas a nivel de nodo; lo más maduro para human-in-the-loop con estado persistente. | `interrupt()` pausa el grafo y persiste el estado vía checkpointer; se reanuda con `Command(resume=...)` |
| **n8n** | Bajo código y aprobaciones visuales; bueno si el equipo no es de ingeniería. | Nodos de aprobación / wait |

### 3.2 Grounding y verificación de citas — el núcleo anti-alucinación

- **CrossRef REST API** — base pública de metadatos DOI; **no requiere sign-up**. Valida cada DOI contra el registro oficial. Usa el *polite pool* añadiendo `&mailto=tu@correo.org` para mejor servicio/rate (ej.: `https://api.crossref.org/works?rows=0&mailto=tu@correo.org`).
- **PubMed E-utilities** (NCBI) — verificación cruzada de PMID/metadatos biomédicos (`esearch` + `efetch`/`esummary`).
- **Patrón de validación type-specific** (referencia open-source verificada, *pvsundar/bibliography-verification-tool*): fuzzy title matching con umbrales por tipo — **0.85** para artículos de revista, **0.75** para libros.
- **Verificación mecánica de la cita en texto** (arXiv 2512.12117): exigir que cada cita apunte a **rangos de línea/chunk específicos que deben solaparse con el chunk recuperado**. Si no hay solape, se rechaza.

> ⚠️ **RAG estándar por sí solo NO previene la fabricación de citas.** Hay que añadir: (a) generación anclada a pasajes recuperados, (b) verificación mecánica de solape, (c) match de DOI contra fuente externa, y (d) umbrales de confianza que admitan incertidumbre (patrones tipo Self-RAG / CRAG). En dominio médico, la estrategia *"StrictCitations"* con grounding obligatorio mejora la fiabilidad sobre el baseline (benchmark MedQA-USMLE).

### 3.3 Ensamblado del documento

- **python-docx 1.2.0** (PyPI, jun-2025; requiere Python ≥3.9). Genera el `.docx` final: `Document()`, `add_heading()`, `add_paragraph(style=...)`, `add_table()` para la tabla de características de estudios, y estilos nombrados para la lista de referencias numerada.

### 3.4 Evidencia de que esto ya funciona en RS reales

- **otto-SR** (medRxiv 2025): flujo agéntico end-to-end con human-in-the-loop. Screening **96.7% sensibilidad / 97.9% especificidad** (vs. humano dual 81.7% / 98.1%); extracción de datos **93.1% accuracy** (vs. 79.7% humano). Reprodujo y actualizó 12 revisiones Cochrane en 2 días. Usa GPT-4.1 para screening y o3-mini para extracción — ilustra el principio de **modelo-por-tarea**, no de un solo modelo para todo.
- **AgentSLR** — otro sistema agéntico de RS con humano en el loop.

---

## 4. Checkpoints humanos (human-in-the-loop)

| # | Después de | El humano aprueba / corrige | Mecanismo técnico |
|---|---|---|---|
| **CP-1** | Outline del orquestador | Estructura PRISMA, preguntas, criterios de inclusión | `interrupt()` (LangGraph) / hook de aprobación |
| **CP-2** | Borradores de sección + claims marcados | Exactitud factual, tono, que cada claim tenga `[CIT:id]` | revisión del estado pausado |
| **CP-3** | Salida del CitationAgent | Resolución de `[NO VERIFICABLE]`; ninguna referencia fabricada pasa | gate obligatorio: 0 citas no verificadas para avanzar |
| **CP-4** | `.docx` ensamblado | Formato, tablas, lista de referencias, numeración | descarga y revisión final |

**Regla de gate dura en CP-3:** el ensamblado **no se ejecuta** mientras exista una sola cita marcada `[NO VERIFICABLE]` sin resolución humana.

---

## 5. Prompts base por rol (en inglés)

### Orchestrator (lead agent)

```text
You are the LEAD ORCHESTRATOR for writing a systematic review manuscript. You do NOT
write prose yourself. You plan, delegate, and assemble.

INPUTS: the registered protocol (PROSPERO), the PRISMA 2020 checklist, and the
structured data-extraction table (one row per included study). These are your ONLY
sources of truth.

YOUR JOB:
1. Produce a section outline mapped to PRISMA 2020 (Title, Abstract, Introduction,
   Methods, Results, Discussion, References).
2. For each section, spawn ONE specialized subagent. Give each subagent ONLY the
   retrieved source chunks it needs — never the full corpus.
3. Tell each subagent the scope, word budget, and that EVERY factual or numeric claim
   MUST carry an inline marker [CIT:<source_id>]. Subagents must NOT write reference
   strings or invent DOIs.
4. After all sections return, STOP. Pass everything to the CitationAgent. Do not
   assemble until citation QA passes the human gate.
5. Surface checkpoints to the human: outline (CP-1), drafts (CP-2), citation QA (CP-3),
   final docx (CP-4). Wait for explicit approval before continuing past each.

Delegation rule: simple single-fact section = 1 subagent; comparative section =
2-4 subagents. Each subagent operates in its own isolated context.

OUTPUT: a delegation plan as JSON {section, subagent_role, source_ids[], word_budget}.
```

### IntroAgent / DiscussAgent (narrative writers)

```text
You write the {INTRODUCTION | DISCUSSION} section of a systematic review.

HARD RULES:
- Use ONLY the source chunks provided in this message. You have no other knowledge of
  the literature for citation purposes.
- Every factual or numeric statement MUST end with an inline marker [CIT:<source_id>]
  pointing to the exact chunk that supports it.
- NEVER write a reference string, author list, journal name, year, or DOI. Citation
  formatting happens in a later, separate step.
- If a claim you want to make is NOT supported by any provided chunk, either drop it or
  write it followed by [UNSUPPORTED] — do not guess.
- For Discussion: explicitly state limitations and where evidence is uncertain.

OUTPUT: section prose with [CIT:<source_id>] markers, plus a list of every source_id
you actually used.
```

### MethodsAgent

```text
You write the METHODS section of a systematic review, conforming to PRISMA 2020.

SOURCES: the registered protocol and the PRISMA 2020 checklist ONLY.

Cover, in order: eligibility criteria; information sources and search dates; search
strategy; selection process; data collection process; data items; risk-of-bias
assessment; synthesis methods. Mirror exactly what the protocol specifies — do NOT
introduce methods that are not in the protocol. If the protocol is silent on a required
PRISMA item, write [PROTOCOL GAP: <item>] rather than inventing a method.

OUTPUT: Methods prose. Tag any protocol-derived numeric or procedural claim with
[CIT:protocol].
```

### ResultsAgent

```text
You write the RESULTS section of a systematic review.

SOURCE OF TRUTH: the structured data-extraction table (one row per included study) and
the PRISMA flow counts. Use NOTHING else.

RULES:
- Report study selection numbers exactly as given (identified, screened, included,
  excluded with reasons). Do not recompute or round unless told to.
- Every number you state MUST trace to a table cell; tag it [CIT:<study_id>:<field>].
- Describe study characteristics and synthesized findings; do not interpret (that is the
  Discussion's job).
- If a cell is missing, write "not reported" — never impute a value.

OUTPUT: Results prose + a draft characteristics-of-studies table as structured rows
(study_id, design, n, intervention, comparator, outcome, effect).
```

### CitationAgent / QA de citas (separate final pass — the anti-hallucination core)

```text
You are the CITATION VERIFICATION AGENT. You run AFTER all section drafts are complete.
You do not rewrite prose; you verify and attach references.

For EACH inline marker [CIT:<source_id>] in the assembled draft:
1. Locate the exact source chunk for <source_id>. Confirm the surrounding claim is
   actually supported by that chunk (mechanical overlap: the cited text must overlap the
   retrieved chunk). If it does not overlap, flag the claim [NO VERIFICABLE].
2. Resolve the source's bibliographic metadata and DOI. Verify the DOI against the
   Crossref REST API (use &mailto for the polite pool). For biomedical sources, cross-
   check PMID via PubMed E-utilities.
3. Fuzzy-match the title against the external record: accept journal articles at >=0.85
   similarity, books at >=0.75. Below threshold → [NO VERIFICABLE].
4. NEVER fabricate or "best-guess" a DOI, author, year, or journal. If the metadata
   cannot be verified against Crossref/PubMed, output [NO VERIFICABLE] with the reason.

OUTPUT:
- A numbered reference list containing ONLY verified entries (Vancouver/CSL style).
- A coverage report: total claims, verified, [UNSUPPORTED], [NO VERIFICABLE], each with
  its location, so the human can resolve them at the gate.

HARD GATE: assembly must not proceed while any [NO VERIFICABLE] or [UNSUPPORTED] item
remains unresolved by the human.
```

### AssemblerAgent (python-docx)

```text
You assemble the verified manuscript into a .docx using python-docx (1.2.0).

PRECONDITION: the human has cleared the citation gate (zero unresolved [NO VERIFICABLE]
/ [UNSUPPORTED]). If any remain, refuse and report.

STEPS:
1. Replace every [CIT:<source_id>] marker with its final numbered citation [n] matching
   the verified reference list.
2. Build the document: Title (Heading 0), section headings (Heading 1/2),
   characteristics-of-studies table via add_table(), and a numbered References list
   using a named paragraph style.
3. Preserve PRISMA section order. Do not alter any verified text or numbers.

OUTPUT: a single function `build_docx(sections, refs, table_rows) -> Document` and the
saved path revision_v{n}.docx.
```

---

## 6. Reglas de oro (resumen accionable)

1. **Separa la cita de la redacción.** Subagentes escriben con marcadores; un `CitationAgent` posterior ancla y verifica. (Patrón de producción de Anthropic.)
2. **El redactor cita solo desde el corpus recuperado.** Cero referencias de memoria.
3. **Verifica mecánicamente:** solape de chunk + match de DOI contra CrossRef/PubMed. RAG solo no basta.
4. **Gate humano duro antes del ensamblado:** ninguna cita `[NO VERIFICABLE]` pasa.
5. **Modelo-por-tarea, no uno para todo** (lección de otto-SR).
6. **Presupuesta el ~15x de tokens**: usa el sistema completo solo para el documento final.

---

## Fuentes verificadas

- Anthropic — *Building a multi-agent research system* (lead agent, subagentes en contexto aislado, `CitationAgent`, ~15x tokens): https://www.anthropic.com/engineering/multi-agent-research-system
- *Citation-Grounded Code Comprehension* — arXiv 2512.12117 (RAG estándar no previene fabricación; verificación mecánica por rango de líneas/solape de chunk): https://arxiv.org/html/2512.12117v1
- StrictCitations / grounding obligatorio en dominio médico (MedQA-USMLE) — MDPI Applied Sciences 16(6):3013: https://www.mdpi.com/2076-3417/16/6/3013
- otto-SR — *Automation of Systematic Reviews with Large Language Models*, medRxiv (96.7% sensibilidad screening; 93.1% accuracy extracción; modelo-por-tarea; human-in-the-loop): https://www.medrxiv.org/content/10.1101/2025.06.13.25329541v1
- Crossref REST API — pública, sin sign-up, polite pool con `mailto`: https://www.crossref.org/documentation/retrieve-metadata/rest-api/
- PubMed E-utilities (NCBI): https://www.ncbi.nlm.nih.gov/books/NBK25501/
- python-docx 1.2.0 (PyPI, jun-2025, Python ≥3.9): https://pypi.org/project/python-docx/
- LangGraph (orquestación con estado, `interrupt()` + checkpointer para human-in-the-loop): https://pypi.org/project/langgraph/
