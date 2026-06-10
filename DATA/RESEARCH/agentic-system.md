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
4. After saving the .docx, ADD (never overwrite) an Obsidian summary note named
   `<docx_basename>.md` inside the SR's manuscript folder of the vault
   "Vault_Medicina MIR_Joseph": `04_INVESTIGACIÓN DERMATOLÓGICA/02_SR_EN_CURSO/
   <SR_folder>/05_manuscrito/` (SR-1 → SR-1_complicaciones, SR-2 → SR-2_fototipos).
   Frontmatter: `tipo: resumen_manuscrito · sr · version · fecha · docx_path`; body =
   a callout with verified-citation count, remaining [NO VERIFICABLE] (must be 0), the
   local .docx path, and a `[[_hoja_de_ruta]]` backlink. So the human checkpoint (R39) is
   one click from [[Dashboard_Research]]. (See §8.1.)

OUTPUT: a single function `build_docx(sections, refs, table_rows) -> Document`, the saved
path revision_v{n}.docx, and the Obsidian summary note path.
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

## 7. Caso de uso ejecutable: SR-1 (Línea 4) de extremo a extremo

> Aterriza el sistema sobre la SR real del plan día-a-día: *"Complicaciones vasculares de fillers +
> tiempo-a-tratamiento"* ([`lines/L4-complicaciones.md`](lines/L4-complicaciones.md)). El sistema agéntico
> **no inicia la SR**: arranca cuando el humano ya tiene el corpus incluido + la tabla de extracción
> (átomos R17–R25 del plan). Es decir, el agéntico cubre **R34–R40** (redacción → ensamblado → checkpoint).

**Entrada al orquestador (lo que el humano le pasa):**
```json
{
  "task": "Draft SR-1 manuscript",
  "line": "L4",
  "prospero_crd": "<CRD de R10>",
  "protocol_path": "DATA/RESEARCH/lines/L4-complicaciones.md",
  "extraction_table": "<path a la tabla de R25: 1 fila por estudio incluido>",
  "prisma_counts": { "identified": 0, "screened": 0, "included": 0, "excluded_reasons": {} },
  "target_journal": "Dermatologic Surgery",
  "stat_chain": "ROBINS-I + proportion meta-analysis (metafor) or structured narrative if I2 too high"
}
```

**Plan de delegación que devuelve el orquestador (ejemplo):**
```json
[
  { "section": "Introduction", "subagent_role": "IntroAgent", "source_ids": ["delorenzi2014","..."], "word_budget": 450 },
  { "section": "Methods",      "subagent_role": "MethodsAgent", "source_ids": ["protocol","prisma2020"], "word_budget": 700 },
  { "section": "Results",      "subagent_role": "ResultsAgent", "source_ids": ["extraction_table","prisma_counts"], "word_budget": 600 },
  { "section": "Discussion",   "subagent_role": "DiscussAgent", "source_ids": ["corpus","limitations"], "word_budget": 550 }
]
```
Cada subagente recibe **solo sus `source_ids`** (contexto aislado), escribe con marcadores `[CIT:id]` y
**nunca** referencias. Al volver todas las secciones → `CitationAgent` → gate humano (CP-3) → `AssemblerAgent`.

---

## 8. Ensamblador `.docx` (python-docx) — esqueleto runnable

> Concreta el `AssemblerAgent`. Respeta la **lección TOC de Word (UNCP)** del MD maestro §2.5: las
> inserciones se anclan **después del campo TOC más externo**; para un manuscrito nuevo (sin plantilla de
> tesis) no hay TOC, así que se genera limpio. Si algún día se inserta en la plantilla UNCP, usar anclas
> *body-only*, nunca texto de encabezado.

```python
# requiere: python-docx >= 1.2.0  (PyPI, jun-2025, Python >= 3.9)
from docx import Document

def build_docx(title, sections, refs, table_rows, out_path):
    """sections: [{'heading': str, 'paragraphs': [str con [n] ya resuelto]}]
       refs: [str] en estilo Vancouver, ya VERIFICADO por CitationAgent (0 [NO VERIFICABLE])
       table_rows: [{'study','design','n','intervention','comparator','outcome','effect'}]"""
    doc = Document()
    doc.add_heading(title, level=0)
    for sec in sections:
        doc.add_heading(sec['heading'], level=1)        # Introduction / Methods / Results / Discussion
        for p in sec['paragraphs']:
            doc.add_paragraph(p)
    # Tabla de características de estudios (Results)
    doc.add_heading('Characteristics of included studies', level=2)
    cols = ['Study','Design','n','Intervention','Comparator','Outcome','Effect']
    t = doc.add_table(rows=1, cols=len(cols)); t.style = 'Light Grid Accent 1'
    for i, c in enumerate(cols): t.rows[0].cells[i].text = c
    for r in table_rows:
        cells = t.add_row().cells
        for i, key in enumerate(['study','design','n','intervention','comparator','outcome','effect']):
            cells[i].text = str(r.get(key, 'not reported'))
    # Referencias numeradas (solo verificadas)
    doc.add_heading('References', level=1)
    for i, ref in enumerate(refs, 1):
        doc.add_paragraph(f'{i}. {ref}')
    doc.save(out_path)           # -> revision_v{n}.docx
    return out_path
```
**Precondición dura:** el ensamblado **no corre** si queda una sola cita `[NO VERIFICABLE]`/`[UNSUPPORTED]`
sin resolver por el humano (gate CP-3).

### 8.1 Nota-resumen en Obsidian (navegabilidad del .docx)

Tras guardar `revision_v{n}.docx`, el **AssemblerAgent deja una nota-resumen** del manuscrito en la
carpeta `05_manuscrito/` de la SR correspondiente dentro del vault Obsidian, para que el documento quede
navegable junto al resto del programa (líneas, hojas de ruta, APEX). **Paths exactos** (vault
`Vault_Medicina MIR_Joseph`):

- **SR-1:** `04_INVESTIGACIÓN DERMATOLÓGICA/02_SR_EN_CURSO/SR-1_complicaciones/05_manuscrito/`
- **SR-2:** `04_INVESTIGACIÓN DERMATOLÓGICA/02_SR_EN_CURSO/SR-2_fototipos/05_manuscrito/`

La nota (`<docx_basename>.md`) lleva frontmatter `tipo: resumen_manuscrito · sr · version · fecha · docx_path`
+ un callout con: nº de citas verificadas, `[NO VERIFICABLE]` restantes (debe ser 0 para pasar CP-3),
ruta local del `.docx`, y enlace a la hoja de ruta `[[_hoja_de_ruta]]`. Así el checkpoint humano (R39) y
el seguimiento posterior quedan a un clic desde el [[Dashboard_Research]]. La estructura de carpetas la
crea `DATA/_scripts/build_vault_research.js` (idempotente); el agente solo **añade** la nota (nunca borra).

---

## 9. Capa 0 — descubrimiento 24/7 (alimenta el corpus sin tokens premium)

Corre en segundo plano para que el "USE" del humano sea solo verificar (principio BUILD vs USE del MD §2.7):

```
n8n (cron diario) → APIs públicas:
  • PubMed E-utilities (esearch/efetch)   • OpenAlex API   • Europe PMC API   • LILACS/BVS
→ dedup (DOI/título) → screening barato local (Ollama Phi-4 Mini)
→ Supabase (tabla papers)  → Telegram @TesisAcneBot: "nuevo paper relevante para L4? [sí]/[no]"
```
- **Gratis/local:** OpenAlex, PubMed E-utils, Europe PMC y LILACS **no requieren pago**; el screening
  repetitivo lo hace Phi-4 local (sin coste de API).
- El humano aprueba/descarta con botones de Telegram → los aprobados entran al corpus de la SR activa.
- ⚠️ Esto **descubre y pre-filtra**, no decide inclusión final: la inclusión formal sigue el cribado de 2
  revisores + Kappa (átomos R17–R21). La Capa 0 es un *feeder*, no el screening oficial.

---

## 10. QA de paráfrasis (Turnitin) — además de la verificación de citas

El `CitationAgent` verifica DOI/PMID y solape de chunk. **Añade un segundo control en el mismo paso de QA:**
**originalidad de paráfrasis** (regla del MD §2.4). Antes del checkpoint humano, el agente QA marca cualquier
fragmento que reproduzca texto fuente casi literal y lo reescribe en paráfrasis original (nunca cita directa
salvo entrecomillado explícito y atribuido). Joseph corre el Turnitin institucional como verificación final;
el agente solo minimiza el riesgo de antemano. **Regla:** cero texto copiado; toda síntesis es reformulación.

---

## 11. Integración con el plan día-a-día y el checkpoint humano

- El sistema agéntico **es el motor de R34–R40** del [`daily-plan.md`](daily-plan.md): el humano llega a la
  fase de redacción con corpus + tabla de extracción y el sistema produce el borrador.
- **R39 = checkpoint humano obligatorio (CP-4):** Joseph abre el `.docx`, verifica citas reales, paráfrasis
  y cadena estadística, y aprueba/corrige. **Nada se envía (R40) sin su aprobación.**
- **Coste:** reservar el sistema completo (~15× tokens) para el **documento final** de cada SR, no para
  borradores exploratorios. Para SR-1 vale la pena; para notas/letters, no.

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
