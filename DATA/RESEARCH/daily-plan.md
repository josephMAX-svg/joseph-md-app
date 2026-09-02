# Plan DÍA-A-DÍA de Research — motor de revisiones sistemáticas (mismo molde que USMLE/MIR)

> ⚠ **Fechas de este doc DESACTUALIZADAS — re-fechado a D1=3-sep-2026 (v5.4); fuente de verdad = el `.ts`**
> (`src/lib/researchDailyPlan.ts`: 42 átomos = 40 + 2 colchón, Research D1 = vie 4-sep-2026 [el jue 3-sep
> es Derma por paridad], interdiario con Derma, sáb+dom libres, salta 25-dic/31-dic/1-ene). Las columnas
> `fecha` de §5 y el `DAILY_META` de §8 (jun→sep-2026) son históricas; el contenido de los átomos sigue vigente.

> **Qué es esto.** La *cola ordenada de átomos-research* (1 átomo por día-Research), con el **mismo
> motor** que `src/lib/usmleStep1Daily.ts` + `src/components/study/UsmleTodayPlan.tsx`: bloque **HOY**,
> **Horario** (franjas), ventana **7 días**, **Temario** por fases, y **progreso REAL marcable** (arranca
> 0%, se persiste; nunca se infiere de la fecha). Cada átomo enlaza a un **recurso real verificado** y deja
> un **entregable concreto** que hace avanzar una revisión sistemática viva (SR-1).
>
> **Regla de oro:** solo data verificada. Toda URL de abajo está en la leyenda §7 y corroborada. Lo no
> confirmable se marca `(verificar)`. El tema **vive en la app**, no en el Calendar — **no se modifica el
> Google Calendar**.
>
> **🛰️ Metodología del motor (actualizada jun-2026 · ver [`discovery-engine.md`](discovery-engine.md)):**
> la búsqueda **no se limita a PubMed** ni se hace a mano — corre el **motor de 5 fuentes con OpenAlex
> como troncal** (OpenAlex⭐ + PubMed + Europe PMC + LILACS + Semantic Scholar ≈97%). **OpenAlex exige API
> key gratis desde 13-feb-2026.** El texto completo se resuelve con la **cascada Unpaywall→Europe PMC→PMC
> →preprints→ALICIA→autor**. Las **citas las genera y verifica la IA** (Crossref/PubMed + CSL-JSON) — **no
> Zotero manual**: solo persiste lo que resuelve a un DOI/PMID real.

---

## 1. Ritmo e integración con el Calendar (no se toca)

- **Ritmo INTERDIARIO con Dermatología.** Lógica ya implementada en `src/lib/researchData.ts`
  (`diaEstudioTipo`): días hábiles desde **mié 10-jun-2026 = D0 Research**; par → Research, impar → Derma;
  fines de semana = descanso. ⇒ Research cae **un día hábil sí, uno no** (≈ 2–3 días Research/semana).
- **Bloque del Calendar:** la franja de *boards* **13:30–14:15** alterna Research↔Derma por día hábil
  (idéntico criterio que el plan Derma). En un **día-Research** ese bloque ejecuta **1 átomo-research**.
- **No se crea ni edita ningún evento de Google Calendar.** El plan vive en la app; el Calendar solo aporta
  la franja horaria ya existente.
- **Avanzas un átomo por día-Research, no por día natural.** A ~2.5 días Research/semana, los **40 átomos**
  de abajo corren de **mié 10-jun-2026 → lun 28-sep-2026** (fechas calculadas, columna `fecha`).

---

## 2. El bloque HOY de un día-Research (franjas — réplica de `FRANJAS` de USMLE)

45 min (13:30–14:15). Mezcla **evaluación anclada** (consolidar) + **deep work** (producir/aprender):

| Franja | Fase | Tipo |
|---|---|---|
| 13:30–13:35 | **Eval anclada** del átomo PREVIO: 2 preguntas de auto-test del método + ¿avanzó el entregable de ayer? (sí/no + por qué) | `eval` |
| 13:35–13:40 | **Pre-test / free-recall** 60 s del objetivo de HOY (¿qué sé ya de este paso?) | `pretest` |
| 13:40–14:05 | **Deep work (25 min):** ver el recurso real del átomo (vídeo/curso/guía) **mientras** ejecutas el entregable hands-on sobre la SR viva | `work` |
| 14:05–14:10 | **Free recall** a papel + log (gap método / razonamiento / herramienta) | `recall` |
| 14:10–14:15 | **Crear ≤3 APEX-método** (formato Palmerton) + guardar el artefacto del día (PROSPERO / Rayyan / Zotero / .docx) | `apex` |

> **Diferencia clave con USMLE:** el USMLE es 100% *aprender contenido*; Research es **aprender el método
> haciéndolo**. Cada átomo deja un **artefacto real** (una query guardada, un protocolo, un cribado, una
> tabla, una figura, una sección). Por eso la columna `entregable` no es opcional: es lo que "cuenta".

---

## 3. Progreso REAL marcable (idéntico a `studyProgress.ts`)

- Reutiliza `agruparProgreso` / `loadDone` / `saveDone` de `src/lib/studyProgress.ts`.
- **Añadir `'research'` a `PlanKey`** (`export type PlanKey = 'usmle' | 'mir' | 'research';`) para persistir en
  `localStorage` bajo la misma clave `jmd-study-progress-v1`.
- **Arranca en 0%.** El avance NO se infiere de la fecha: se marca átomo por átomo. `hoyD` solo resalta el
  día de hoy (no cuenta como hecho).
- **Agrupación del temario:** `claveDe = (x) => x.fase` ⇒ los anillos/% por fase (R0…R8) salen solos, igual
  que los "sistemas" del USMLE.
- **Ventana 7 días:** `ventana7d(fromD)` filtra los próximos 7 átomos desde el día de hoy (mismo helper).

---

## 4. Temario por fases (la SR como hilo conductor)

El plan **enseña el método 2020 (PRISMA/PROSPERO/GRADE/Cochrane)** *ejecutando* una revisión sistemática
real de principio a fin: **SR-1**. Al terminar, Joseph tiene (a) el método dominado y (b) **1 SR enviada**.

- **SR-1 (artefacto vivo, Línea 4 · Mayo score 38/40):** *"Vascular complications of facial fillers and
  time-to-treatment with hyaluronidase — systematic review (± meta-analysis)."* Es la de mayor impacto
  ("paciente-seguridad" = ángulo más "Mayo"), **$0, sin comité de ética**, gap latino real. Paper semilla
  verificado: **DeLorenzi C, 2014, *Aesthet Surg J* 34(4):584–600 · PMID 24692598 · DOI 10.1177/1090820X14525035**.
  Ficha completa → [`lines/L4-complicaciones.md`](lines/L4-complicaciones.md).
- **SR-2 (arranca al final, Línea 5):** *"Fractional RF microneedling / CO₂ in Fitzpatrick IV–VI — efficacy
  & safety, subgroup by phototype."* Ojo: ya existe un MA 2026 de FCL-vs-MNRF en cicatrices de acné
  (Argobi, *JCD*, DOI 10.1111/jocd.70765) **predominante en fototipos I–III** → el gap real es el **subgrupo
  IV–VI (skin of color)**. Ficha → [`lines/L5-energia-fototipos.md`](lines/L5-energia-fototipos.md).

| Fase | Átomos | Objetivo de la fase | Pilar SR |
|---|---|---|---|
| **R0 · Cimientos & método** | R1–R5 | Infra (OpenAlex key/NCBI), PICO, diseños, leer un paper, ver una SR de punta a punta | — |
| **R1 · Pregunta & protocolo** | R6–R9 | PICO de SR-1, criterios de elegibilidad, protocolo PRISMA-P | Reporte |
| **R2 · Registro PROSPERO** | R10–R11 | Registrar SR-1 (CRD) antes de cerrar extracción | Registro |
| **R3 · Búsqueda N bases** | R12–R16 | MeSH/booleanos, correr en 5 bases, PRISMA-S, dedup | Reporte |
| **R4 · Screening** | R17–R21 | Rayyan, T/A → texto completo, 2 revisores, Kappa, conteos PRISMA | Conducción |
| **R5 · Extracción** | R22–R25 | Formulario piloteado, doble extracción, Elicit | Conducción |
| **R6 · Sesgo & GRADE** | R26–R28 | ROBINS-I/RoB 2, GRADE (SoF), AMSTAR-2 | Evaluación |
| **R7 · Meta-análisis en R** | R29–R33 | metafor/meta, tamaño de efecto, forest, heterogeneidad, funnel/Egger, subgrupos | Conducción |
| **R8 · Manuscrito & envío** | R34–R40 | PRISMA 2020 (27 ítems), figuras, journal + waiver APC, cover letter, SUBMIT + arrancar SR-2 | Reporte |

---

## 5. La cola de átomos (1 átomo = 1 día-Research)

> `code` · `fecha` (día-Research real) · `prioridad` (vueltas) · **objetivo** · **entregable** (artefacto) ·
> `rec` = recurso verificado (clave → §7) · `tool`. Prioridad sigue `VUELTAS`/`INTERVALOS` de `researchData.ts`
> (CRÍTICA 6 · ALTA 5 · MEDIA 4 · BAJA 3).

### R0 · Cimientos & método

| code | fecha | prio | objetivo | entregable | rec | tool |
|---|---|---|---|---|---|---|
| R1 | 2026-06-10 | CRÍTICA | Montar la infra: cuenta NCBI + **key OpenAlex** (gratis) + alerta PubMed; **citas por IA** (no Zotero) | Cuenta NCBI + API key OpenAlex + 1 alerta + 3 case reports modelo | `OPENALEX`,`PM` | OpenAlex, PubMed |
| R2 | 2026-06-12 | CRÍTICA | Formular preguntas en **PICO** y distinguir tipos de pregunta (terapia/dx/pronóstico) | 3 PICO escritos (1 será el de SR-1) | `CIL1`,`GREEN` | — |
| R3 | 2026-06-16 | CRÍTICA | **Diseños de estudio** y niveles de evidencia (qué separa case report de original) | Mapa 1-página: diseño → nivel → sesgos típicos | `STEP`,`ZED` | — |
| R4 | 2026-06-18 | ALTA | **Cómo leer un paper** críticamente (método Greenhalgh) | 1 abstract del nicho leído con plantilla PICO + "¿qué tipo de estudio es?" | `GREEN` | — |
| R5 | 2026-06-22 | CRÍTICA | **Ver una SR de punta a punta** (visión global antes de ejecutar) | Esquema de las 8 fases con la herramienta de cada una | `STEPSR`,`CIL1` | — |

### R1 · Pregunta & protocolo

| code | fecha | prio | objetivo | entregable | rec | tool |
|---|---|---|---|---|---|---|
| R6 | 2026-06-24 | CRÍTICA | Fijar el **PICO de SR-1** (complicaciones vasculares de fillers) + 1 desenlace primario | PICO de SR-1 escrito y validado contra la ficha L4 | `L4`,`CIL1` | — |
| R7 | 2026-06-26 | CRÍTICA | **Criterios de elegibilidad** (inclusión/exclusión) y diseños admitidos | Tabla de criterios PICOS de SR-1 | `COCHB` | — |
| R8 | 2026-06-30 | ALTA | **Protocolo PRISMA-P** (estructura, qué congela) | Borrador de protocolo SR-1 (secciones PRISMA-P) | `PRISMA`,`COCHB` | — |
| R9 | 2026-07-02 | ALTA | Revisar duplicidad: ¿hay SR ya publicada/registrada del mismo PICO? | Búsqueda en PROSPERO + PubMed "systematic review" → decisión seguir/afinar | `PROS`,`PM` | PROSPERO |

### R2 · Registro PROSPERO

| code | fecha | prio | objetivo | entregable | rec | tool |
|---|---|---|---|---|---|---|
| R10 | 2026-07-06 | CRÍTICA | Rellenar el formulario PROSPERO (campos obligatorios) | Registro PROSPERO de SR-1 **enviado** | `PROS` | PROSPERO |
| R11 | 2026-07-08 | MEDIA | Plan B si no encaja (scoping/review of reviews → OSF) + esperar CRD | Nota: CRD recibido o registro en OSF; protocolo "congelado" | `PROS`,`OSF` | OSF |

### R3 · Búsqueda en N bases

| code | fecha | prio | objetivo | entregable | rec | tool |
|---|---|---|---|---|---|---|
| R12 | 2026-07-10 | CRÍTICA | **OpenAlex (troncal, booleana) + MeSH** en MEDLINE/PubMed | Query booleana de SR-1 en OpenAlex + sintaxis PubMed (líneas numeradas) | `OPENALEX`,`NLM1`,`PM` | OpenAlex, PubMed |
| R13 | 2026-07-14 | ALTA | Trasladar a **Europe PMC + CENTRAL + Semantic Scholar** (5 fuentes) | Sintaxis + nº de resultados por fuente | `EPMC`,`CENT`,`SEMSCH` | Europe PMC, Cochrane, S2 |
| R14 | 2026-07-16 | ALTA | **LILACS/BVS** (DeCS · ventaja LATAM) + registros de ensayos (ClinicalTrials/ICTRP) | Búsqueda LILACS + ClinicalTrials.gov + ICTRP, resultados anotados | `LILACS`,`CT`,`ICTRP` | LILACS, CT.gov |
| R15 | 2026-07-20 | ALTA | **PRISMA-S** (16 ítems): documentar cada componente para reproducibilidad | Tabla PRISMA-S de SR-1 (fecha, fuente, sintaxis, nº) | `PRISMAS` | — |
| R16 | 2026-07-22 | MEDIA | **Texto completo** (cascada Unpaywall→…) + **dedup por DOI** → cribado | PDFs OA resueltos + biblioteca dedup lista para Rayyan | `UNPAY`,`RAY` | Unpaywall, Rayyan |

### R4 · Screening (cribado)

| code | fecha | prio | objetivo | entregable | rec | tool |
|---|---|---|---|---|---|---|
| R17 | 2026-07-24 | CRÍTICA | **Montar Rayyan** y subir el corpus; configurar etiquetas y ciego | Proyecto Rayyan de SR-1 con todos los registros importados | `RAY`,`RAYHC` | Rayyan |
| R18 | 2026-07-28 | CRÍTICA | **Cribado título/abstract** (nivel 1), 2 revisores (o 2 pases) | Nivel 1 completado; conflictos marcados | `RAY` | Rayyan |
| R19 | 2026-07-30 | ALTA | **Texto completo** (nivel 2) con razones de exclusión | Excluidos con motivo (alimenta el flujo PRISMA) | `RAY` | Rayyan |
| R20 | 2026-08-03 | ALTA | **Kappa interobservador** (acuerdo de inclusión) en Python/R | κ calculado + IC; conflictos a checkpoint humano | `STEPSR` | Python/R |
| R21 | 2026-08-05 | ALTA | **Diagrama de flujo PRISMA 2020** (4 fases, vías separadas) con conteos | PRISMA flow de SR-1 (plantilla/Shiny) con números reales | `PRISMAF` | eshackathon Shiny |

### R5 · Extracción de datos

| code | fecha | prio | objetivo | entregable | rec | tool |
|---|---|---|---|---|---|---|
| R22 | 2026-08-07 | ALTA | **Formulario de extracción** piloteado (qué variables) | Plantilla de extracción de SR-1 (diseño, n, intervención, outcomes, dominios sesgo) | `COCHB` | Hoja/Sheets |
| R23 | 2026-08-11 | ALTA | Piloto de extracción en 2–3 estudios + ajustar el formulario | Formulario v2 + 3 filas piloto | `COCHB` | — |
| R24 | 2026-08-13 | MEDIA | **Extracción asistida** (Elicit) como segundo par de ojos | Filas extraídas de los incluidos (doble chequeo) | `ELI` | Elicit |
| R25 | 2026-08-17 | MEDIA | Cerrar la **tabla de características de estudios** (1 fila por estudio) | Tabla completa de SR-1 (lista para Results) | `COCHB` | — |

### R6 · Riesgo de sesgo & certeza

| code | fecha | prio | objetivo | entregable | rec | tool |
|---|---|---|---|---|---|---|
| R26 | 2026-08-19 | ALTA | **Riesgo de sesgo:** RoB 2 (ECA) / **ROBINS-I** (no-aleatorizados, lo más probable aquí) | Evaluación RoB por estudio incluido | `ROB2`,`ROBINS` | riskofbias.info |
| R27 | 2026-08-21 | ALTA | **GRADE** (4 niveles, 5 dominios) + **Summary of Findings** | SoF table de SR-1 por desenlace | `GRADE` | GRADEpro |
| R28 | 2026-08-25 | MEDIA | **AMSTAR-2** para apreciar SR vecinas y posicionar la nuestra | Nota AMSTAR-2 sobre 2–3 SR previas del tema | `AMSTAR` | — |

### R7 · Meta-análisis en R (si hay homogeneidad)

| code | fecha | prio | objetivo | entregable | rec | tool |
|---|---|---|---|---|---|---|
| R29 | 2026-08-27 | ALTA | Montar **R + metafor/meta** y cargar los datos extraídos | Script R que lee la tabla y calcula 1 effect size | `DMAR`,`METAFOR` | R |
| R30 | 2026-08-31 | ALTA | **Tamaño de efecto** correcto (proporción/tiempo-a-tratamiento) + modelo fijo vs aleatorio | Pooled estimate con IC95% | `DMAR` | R |
| R31 | 2026-09-02 | ALTA | **Forest plot** + **heterogeneidad** (I², τ²) | Forest plot TIFF 300 dpi + I²/τ² reportados | `DMAR`,`METAFOR` | R |
| R32 | 2026-09-04 | MEDIA | **Sesgo de publicación**: funnel plot + test de Egger | Funnel + Egger de SR-1 | `DMAR` | R |
| R33 | 2026-09-08 | MEDIA | **Subgrupos/sensibilidad** (p. ej. tiempo-a-hialuronidasa, zona, nivel de entrenamiento) | Análisis de subgrupos + sensibilidad | `DMAR` | R |

### R8 · Manuscrito & envío

| code | fecha | prio | objetivo | entregable | rec | tool |
|---|---|---|---|---|---|---|
| R34 | 2026-09-10 | ALTA | **Methods + Results** con PRISMA 2020 (registro, búsqueda, flujo, síntesis) | Methods+Results de SR-1 redactados | `PRISMA`,`PRISMAC` | — |
| R35 | 2026-09-14 | ALTA | **Introduction** (gap + objetivo) y **Discussion** (límites + certeza) | Intro+Discussion de SR-1 redactados | `EQ`,`PRISMAC` | — |
| R36 | 2026-09-16 | ALTA | **Checklist PRISMA 2020 de 27 ítems** + supplementary (PRISMA-S, SoF, CRD) | Checklist 27 ítems marcada + supplements adjuntos | `PRISMAC` | — |
| R37 | 2026-09-18 | MEDIA | **Elegir journal + APC**: tier, Diamond OA vs 50% LMIC; verificar Research4Life | Journal target decidido (de `journals.md`) + plan de coste | `JNL` | — |
| R38 | 2026-09-22 | MEDIA | **Cover letter** + formateo al journal (Editorial Manager/ScholarOne) | Cover letter + manuscrito formateado | `EQ` | — |
| R39 | 2026-09-24 | CRÍTICA | **Checkpoint humano final** (HITL): verificar citas reales (DOI/PMID), paráfrasis, cadena estadística | Word `.docx` revisado y aprobado por Joseph | `AGENT` | — |
| R40 | 2026-09-28 | CRÍTICA | **SUBMIT SR-1** + abrir **SR-2** (Línea 5, fototipos IV–VI): registrar nuevo PICO | SR-1 enviada ✅ + PICO de SR-2 borrador | `L5`,`PROS` | Editorial Manager |

> **Después de R40** el ciclo se reinicia con SR-2 (Línea 5) reutilizando el mismo molde R1→R8; cada SR
> nueva es ~1 ciclo. Es el *compounding* de PIPs: 2–4 SR como objetivo estratégico (no requisito) hacia el
> portfolio Mayo (ver `benchmarks.md`).

---

## 6. Vueltas (repetición espaciada del **método**, no del contenido)

Las APEX-método (p. ej. "criterios para ROBINS-I", "cómo se calcula κ", "diferencia PRISMA-S vs PRISMA-2020")
siguen los mismos intervalos que `INTERVALOS` de `researchData.ts`:

- **CRÍTICA** `[1,3,7,28,63]` · **ALTA** `[1,7,28,63]` · **MEDIA** `[3,28,63]` · **BAJA** `[7,63]`.

Asigna CRÍTICA/ALTA a los pasos que más se reusarán en cada SR futura (PICO, búsqueda, screening, GRADE,
meta-análisis). Los pasos administrativos (PROSPERO, cover letter) van MEDIA/BAJA.

---

## 7. Leyenda de recursos (todas las URLs verificadas)

| clave | recurso | URL |
|---|---|---|
| `OPENALEX` | **OpenAlex** — API troncal del motor (key gratis obligatoria desde 13-feb-2026) | https://developers.openalex.org/api-reference/authentication |
| `PM` | PubMed (búsqueda + alertas + E-utilities) | https://pubmed.ncbi.nlm.nih.gov/ |
| `SEMSCH` | Semantic Scholar — Academic Graph API (5ª fuente, bulk + TLDR) | https://api.semanticscholar.org/api-docs/graph |
| `UNPAY` | Unpaywall — texto completo OA legal por DOI (cascada) | https://unpaywall.org/products/api |
| `CROSSREF` | Crossref — verificar DOI + CSL-JSON de citas (gate IA) | https://www.crossref.org/documentation/retrieve-metadata/content-negotiation/ |
| `NLM1` | NLM · PubMed in EBP (MeSH/booleanos) | https://www.nlm.nih.gov/oet/ed/pubmed/pubmed_in_ebp/index.html |
| `NLM2` | NLM · PubMed Online Training | https://learn.nlm.nih.gov/documentation/training-packets/T0042010P/ |
| `ZOT` | ~~Zotero~~ → **reemplazado por citas verificadas por IA** (Crossref/CSL-JSON, ver `CROSSREF`) | https://www.zotero.org/ |
| `GREEN` | "How to Read a Paper" — Greenhalgh (BMJ) | https://www.bmj.com/about-bmj/resources-readers/publications/how-read-paper |
| `STEP` | StatQuest (bioestadística, YouTube) | https://www.youtube.com/@statquest |
| `ZED` | zedstatistics (estadística aplicada, YouTube) | https://www.youtube.com/@zedstatistics |
| `STEPSR` | "A step-by-step guide for conducting a SR and meta-analysis" (Ahn & Kang, *Trop Med Health* 2019) | https://pmc.ncbi.nlm.nih.gov/articles/PMC6670166/ |
| `CIL1` | Cochrane Interactive Learning · Módulo 1 (gratis) | https://www.cochrane.org/learn/courses-and-resources/interactive-learning/module-1-introduction-conducting-systematic-reviews |
| `COCHB` | Cochrane Handbook v6.5 (conducción) | https://training.cochrane.org/handbook |
| `PRISMA` | PRISMA statement (web oficial) | https://www.prisma-statement.org/ |
| `PRISMAS` | PRISMA-S (búsqueda, 16 ítems) | https://www.prisma-statement.org/prisma-search |
| `PRISMAF` | PRISMA 2020 flow diagram (plantilla + generador Shiny) | https://www.prisma-statement.org/prisma-2020-flow-diagram |
| `PRISMAC` | PRISMA 2020 checklist 27 ítems (paper canónico, gratis) | https://pmc.ncbi.nlm.nih.gov/articles/PMC8008539/ |
| `PROS` | PROSPERO (registro, gratis) | https://www.crd.york.ac.uk/PROSPERO/help/register |
| `OSF` | OSF Registries (scoping/sin restricción de tipo) | https://osf.io/registries |
| `EPMC` | Europe PMC (Embase parcial vía Europe PMC) | https://europepmc.org/ |
| `CENT` | Cochrane CENTRAL (Cochrane Library) | https://www.cochranelibrary.com/central |
| `LILACS` | LILACS / BVS (literatura LATAM) | https://lilacs.bvsalud.org/ |
| `CT` | ClinicalTrials.gov | https://clinicaltrials.gov/ |
| `ICTRP` | WHO ICTRP (registro de ensayos) | https://www.who.int/clinical-trials-registry-platform |
| `RAY` | Rayyan (cribado, free ≤3 reviews) | https://www.rayyan.com/ |
| `RAYHC` | Rayyan · cómo crear una SR (help center) | https://help.rayyan.ai/hc/en-us/articles/22088155760017-How-to-Create-a-Systematic-Review-in-Rayyan |
| `RAYYT` | Rayyan · canal oficial (vídeo hands-on) | https://www.youtube.com/@Rayyanapp |
| `ELI` | Elicit (extracción asistida, free ≤20/mes) | https://elicit.com/ |
| `ROB2` | RoB 2 (sesgo en ECA) | https://www.riskofbias.info/welcome/rob-2-0-tool |
| `ROBINS` | ROBINS-I (sesgo en no-aleatorizados) | https://www.riskofbias.info/welcome/home |
| `GRADE` | GRADEpro (certeza de evidencia, gratis online) | https://www.gradepro.org/ |
| `AMSTAR` | AMSTAR-2 (apreciar SR existentes) | https://amstar.ca/ |
| `DMAR` | "Doing Meta-Analysis in R" (Harrer, Cuijpers et al., libro online gratis) | https://bookdown.org/MathiasHarrer/Doing_Meta_Analysis_in_R/ |
| `METAFOR` | metafor package (Viechtbauer) | https://www.metafor-project.org/ |
| `COCHYT` | Cochrane Training (canal oficial YouTube) | https://www.youtube.com/channel/UCoWzvKR8RPHG07PPeqBiibA |
| `EQ` | EQUATOR Network (guidelines de reporte) | https://www.equator-network.org/ |
| `JNL` | Tabla de revistas + waiver APC | [`journals.md`](journals.md) |
| `L4` | Ficha de SR-1 (Línea 4 · complicaciones) | [`lines/L4-complicaciones.md`](lines/L4-complicaciones.md) |
| `L5` | Ficha de SR-2 (Línea 5 · energía/fototipos) | [`lines/L5-energia-fototipos.md`](lines/L5-energia-fototipos.md) |
| `AGENT` | Sistema agéntico (QA de citas + ensamblado .docx) | [`agentic-system.md`](agentic-system.md) |

---

## 8. Cómo lo consume el motor de la app (nota para el chat que diseña la página)

Mapeo 1:1 con `usmleStep1Daily.ts` para que sea **drop-in**:

```ts
// researchDailyPlan.ts (a crear por el chat de la web)
export const DAILY_META = { inicio: '2026-06-10', fin: '2026-09-28', totalDias: 40,
  bloque: '13:30–14:15 (boards, alterna con Derma) · 1 átomo-research por día-Research' };
export const FRANJAS = [/* §2 de este doc */];
export interface DiaResearch {
  d: number; fecha: string; fase: 'R0'|'R1'|'R2'|'R3'|'R4'|'R5'|'R6'|'R7'|'R8';
  code: string; prioridad: Prioridad; objetivo: string; entregable: string;
  recs: { label: string; url: string }[]; tool: string; apex?: { id: string; t: string } | null;
}
export const DIAS: DiaResearch[] = [/* §5 de este doc, 1:1 */];
// helpers idénticos: diaDe, diaPrevio, ventana7d, y agruparProgreso(claveDe = x=>x.fase)
```

- **Progreso:** añadir `'research'` a `PlanKey` en `studyProgress.ts` (1 línea) → reusa `loadDone/saveDone`.
- **HOY:** si `diaEstudioTipo(hoy)==='research'`, resaltar el átomo cuyo `fecha===hoyISO`; si es 'derma',
  mostrar "hoy toca Derma →" (ya implementado en `ResearchHub`).
- **No tocar** USMLE/MIR/Derma ni el Calendar. La alternancia ya existe en `researchData.ts`.

---

## 9. Notas de verificación

- **Verificado:** todas las URLs de §7 (corroboradas por búsqueda independiente; las "About" de YouTube no
  renderizan vía fetch pero la identidad de los canales está confirmada); fechas de los días-Research
  calculadas con la lógica `diaEstudioTipo` ya existente; paper semilla SR-1 (DeLorenzi 2014, PMID 24692598,
  DOI 10.1177/1090820X14525035); existencia del MA 2026 que acota el gap de SR-2 (Argobi, *JCD*, DOI
  10.1111/jocd.70765).
- **(verificar):** tiempo de procesamiento de PROSPERO (no hay cifra oficial); que Europe PMC cubra el 100%
  de Embase (cobertura parcial); disponibilidad de cuenta institucional para CENTRAL/RevMan. Estos no
  bloquean el plan; se resuelven en su átomo.
- **No se modificó el Google Calendar.** El plan vive en la app sobre la franja 13:30–14:15 ya existente.
