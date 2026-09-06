# REESTRUCTURACIÓN MASIVA · D1 = LUNES 7-SEP-2026 (v5.6)

> **Corrimientos:** 31-ago, 1-sep, 2-sep, 3-sep y 4-sep no se estudiaron → TODO corrió a D1 = lun 7-sep
> (regla determinista: cada día sin estudiar = +1 hábil). USMLE = **97 días** (fases D1-82 / 83-92 / 93-97)
> · ENCAPS = **102 días** (Supabase re-sembrado, backup `study_schedule_bk_0906`) ·
> MIR/Research/Derma/Business/LIVIANO/SYNAPSE/AURUM re-fechados. Los HITOS UWSA/NBME se quedaron
> en sus VIERNES originales (no se movieron).
> El 31-ago se amplió el cuaderno NotebookLM "STEP 1 · Palmerton Engine" de 25 a ~140 fuentes
> (catálogo completo del canal) y la guía PALMERTON_POR_MATERIA pasó a v2. El 2-sep se corrió una
> verificación total (frontend build, backend Supabase, deploy, temas citados, Calendar) — ver §7.
> El 3-sep tampoco se estudió: corrimiento a D1 = vie 4-sep (v5.5) — mismo pipeline, hitos de
> viernes intactos, 1 día de contenido USMLE fusionado. El 4-sep TAMPOCO se estudió: nuevo
> corrimiento determinista a D1 = lun 7-sep (v5.6) — mismo pipeline, hitos de viernes intactos.

> Ejecutada el 27-ago-2026. **Supersede** a PLAN_DEFINITIVO_28JUL_2026-2 y al sprint ENCAPS 2026-II
> (examen 2026-II rendido el 9-ago; Joseph no lo dio — el análisis del examen real está en
> `DATA/ENCAPS/ANALISIS_EXAMEN_2026-2_REAL.md`).

## La inversión de prioridades

| | Antes (sprint 2026-II) | Ahora (v5 · desde 31-ago) |
|---|---|---|
| **Bloque principal (mañana 07:15-12:00 + eval 18:00)** | 🇵🇪 ENCAPS (5h30/día) | 🇺🇸 **USMLE Step 1** (5h30/día) |
| **1h de la tarde (16:15-17:15)** | 🇺🇸 USMLE (1h) | 🇵🇪 **ENCAPS mantenimiento** (1h banqueo) |
| **17:15-18:00** | [PAUSADO] Dermatología (zombie) | ⚖️ **LIVIANO Academia** (nuevo) |
| **MIR 15:15-16:15** | igual | igual (intacto) |
| **RESEARCH↔DERMA 13:30-14:15** | igual | igual (interdiario; contenido Derma renovado) |
| **Fines de semana** | sábado simulacros | **SÁBADO Y DOMINGO LIBRES** (regla nueva) |

**Exámenes objetivo:** USMLE Step 1 → semana **25-29 ene 2027** (target mié 27) ·
ENCAPS 2027-I → **fines de marzo 2027** (feb-mar: ENCAPS vuelve a principal) · MIR sigue su curso.

## 1 · USMLE Step 1 — plan v5.6 MAESTRO (97 días)

- **Fuente de verdad:** `src/lib/usmleStep1Daily.ts` (v5.6). Docs: `DATA/USMLE/README.md`,
  `PALMERTON_POR_MATERIA.md` (v2, catálogo completo), `CALENDARIO_5_MESES.md`, `RECURSOS_META_2026.md`.
- **Fases:** A contenido D1-D82 (7-sep→30-dic, ~40Q uWorld/día = 1ª vuelta completa del banco 3659Q) ·
  B banco intensivo D83-D92 (4→15-ene) · C sprint D93-D97 (18→22-ene).
- **Hitos (viernes):** UWSA1 11-sep (baseline) · NBME 25/26/27/28/29 cada ~3 sem · NBME 30 30-dic ·
  UWSA2 8-ene · NBME 31 15-ene (**GO/NO-GO**) · NBME 32-33 + Free 120 semana final.
- **Criterio GO (Step 1 es pass/fail y un fail queda PARA SIEMPRE en ECFMG):**
  2 NBME consecutivos ≥68% + UWSA2 low-risk → confirmar fecha. Si no → correr a feb-mar (el
  eligibility period lo permite sin costo).
- **Método (Palmerton, validado por NotebookLM "STEP 1 · Palmerton Engine", 25 videos):**
  Anki en la MAÑANA con mente fresca · First Aid = mapa de objetivos (no biblia) · 80% mastery
  (80% en 10Q consecutivas del subtema antes de avanzar) · tarjetas de MECANISMO y cronología
  fisiopatológica · ~50% de fallos son de interpretación, no de conocimiento · stress sets
  (10Q/12min) recién en Fases B-C.
- **Regla de corrimiento:** un día perdido corre todo +1 día hábil
  (`node DATA/_scripts/remap_inicio.js <fecha>` — L-V + feriados, 97 días USMLE, re-fecha también
  MIR/Research/Derma/Business/LIVIANO y re-slotea los casos LIVIANO a viernes; aparte:
  `gen_encaps_mantenimiento_2027.js <fecha>` → execute_sql, `gen_synapse_plan.js <fecha>`,
  `gen_aurum_plan.js <fecha>`). Los hitos USMLE están anclados a fechas: si se corre, migrar los
  overlays del Calendar o aceptar que caigan en otro día de la semana.

## 2 · ENCAPS — mantenimiento 2027-I (1h/día)

- **Supabase re-sembrado:** 102 días L-V (7-sep→29-ene) en `study_schedule`, modo `MANTENIMIENTO`
  (backups: `study_schedule_bk_0827` → `bk_0831` → `bk_0902` → `bk_0903` → `bk_0906`). Generador:
  `DATA/_scripts/gen_encaps_mantenimiento_2027.js <fecha>`.
- **Rotación de 4 semanas** ponderada por el **PRONÓSTICO WALK-FORWARD v3**
  (`DATA/ENCAPS/PRONOSTICO_WALKFORWARD_2027-1_v3.md`, construido con los 7 exámenes reales
  2024-II→2026-II): vector **II 30 · I 27 · V 21 · III 13 · IV 9** · 8 críticos
  **I-3 · V-2 · II-3 · III-5 · I-4 · II-5 · II-4 · IV-1/2** (+ ALTA con flag de rebote: II-1, II-11, II-8).
  I-3 y V-2 caen 2× por ciclo (11 sesiones c/u).
- **Estructura del día (16:15-17:15):** eval anclada 5Q del tema de ayer (15') → banco del día
  20-25Q ciegas (40') → registro TRACKING_ERRORES + ≤3 APEX (5'). **Viernes: mini-simulacro 25Q
  mixto 72s/Q** (19 en total).
- **Lección del 2026-II** (el pronóstico v2 tuvo su mejor fold, MAE 3.2pp, PERO Investigación saltó
  4→12): el área IV ya nunca va a piso — por eso IV-1/2 es crítico condicional en la rotación.
- App: `src/lib/encapsPlan.ts` v6.4 (D1=7-sep, 102 días, skip fines de semana + feriados, rama compacta
  `MANTENIMIENTO` en `itemsForDay`; los viernes `tipo='mini_sim'` usan la plantilla de simulacro).

## 3 · Google Calendar — cambios aplicados

**Creadas (series L-V, hasta 29-ene):** 🇺🇸 Repaso Multi-Temporal 07:15 · 🇺🇸 PRE-TEST 08:15 ·
🇺🇸 DEEP PRIME 09:00-11:00 · 🇺🇸 30Q Consolidación 11:00 · 🇵🇪 ENCAPS 1h Banqueo 16:15 ·
⚖️ LIVIANO Academia 17:15 (sin fecha fin) · 🇺🇸 Evaluación Modo Examen 18:00.
**+ 12 overlays naranjas** de hitos (UWSA1/2, NBME 25-33, Free 120) en sus fechas exactas.

**Eliminadas:** las 5 series ENCAPS de mañana/noche, las 2 series USMLE de 16:15-17:15 y los
2 zombies `[PAUSADO 96D]` vencidos (DERMATOLOGIA 17:15, PROGRAMACIÓN MAMA 13:00).
**Intactos:** MIR, SYNAPSE, AURUM, RESEARCH↔DERMA, LECTURA, toda la rutina (GYM/BAILE/DORMIR/…)
y los fines de semana (libres — SYNAPSE PC sáb/dom se mantienen porque son personales).

**Franja 04:15-05:45 (decisión 27-ago):** el zombie `[PAUSADO 96D] CURSO DE IA` fue reemplazado por
**🧠 CURSO DE IA — REACTIVADO** (L-V desde 31-ago; la serie vieja además pisaba EKER 04:00-04:15):
lección técnica SYNAPSE 45' + práctica en teclado 45' · **viernes = Claude Code / IA agéntica aplicada**
a los sistemas propios. Doc: `DATA/SYNAPSE/CURSO_IA_04H_31AGO.md`. Academias CURVA y DENSA → FEBRERO
post-Step 1 (NÍTIDA se fusiona con Derma). Protocolo operativo de la hora ENCAPS:
`DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md`.

## 4 · Derma · LIVIANO · Research

- **Derma** (`DATA/DERMATOLOGIA/PLAN_ELITE_2026-27.md` + `src/lib/dermaDailyPlan.ts` renovado):
  70 átomos interdiarios (7-sep→22-mar-2027, salta feriados) sobre AccessDermatology real — 200 casos visuales ciegos +
  1.301 review questions (Pictorial 4e 381 · CORE 104 · Barnhill's 403 · 3e 363 · QOTW 50) +
  Fitzpatrick/Baumann; los últimos ~20-25 átomos = ESTÉTICA (toxina, fillers, láser, peelings).
  Dato clave: la cosmética está formalmente dentro del CORE surgical del board americano.
- **LIVIANO Academia** (`DATA/BUSINESS/LIVIANO_ACADEMIA.md` + `src/lib/livianoStudyPlan.ts` +
  panel 📚 Academia en Business→LIVIANO): 6 módulos (fisiología del peso → GLP-1/tirzepatida →
  nutrición → ejercicio → conducta → farmacología/bariátrica), 45'/día (25' estudio + 20' explicarlo
  en palabras simples), viernes = caso simulado. Cifras ancla: semaglutida −15% · tirzepatida −21% ·
  SELECT −20% CV · 67% del peso se recupera al suspender (argumento del tratamiento crónico).
- **Research** (`DATA/RESEARCH/RUTA_PUBLICACION_2027.md`): escalera carta→case report→revisión
  sistemática; case report #1 → Dermatology Online Journal (MEDLINE, APC ≤$300); Cureus deslistada
  de WoS (máx 1-2 ítems); dato NRMP: IMGs no-match en derma tenían mediana 12 publicaciones —
  el volumen sin Steps no compensa → proteger Step 1 hasta enero es la jugada correcta.
  Plan diario re-fechado (D1 mar 8-sep → 6-ene-2027 por paridad interdiaria con Derma, que toma el lun 7-sep).

## 5 · Qué se re-fechó en la app (remap 4-sep, L-V)

USMLE 97d (7-sep→22-ene) · MIR 78d (7-sep→23-dic, contenido intacto) · Research 42
slots (8-sep→6-ene) · Derma 70 slots (7-sep→22-mar-2027) · Business 116 filas = 84 trabajo + 32 DESCANSO
sáb/dom (7-sep→31-dic, sin feriados) · LIVIANO 90d L-V (7-sep→13-ene, salta 25-dic/31-dic/1-ene) ·
SYNAPSE 81d regenerado (`gen_synapse_plan.js 2026-09-04`: 7-sep→26-nov, dom libres, sáb A/B/C+PC) ·
AURUM 130d L-V regenerado (`gen_aurum_plan.js 2026-09-04`: 7-sep→10-mar-2027, sin feriados).
`remap_inicio.js` ahora salta sáb+dom+feriados (25-dic, 31-dic, 1-ene) en USMLE/MIR/LIVIANO
(Business solo inserta DESCANSO en finde; SYNAPSE y AURUM se regeneran con sus generadores).

## 7 · Verificación total (2-sep-2026, 8 agentes en paralelo + comprobación visual)

| Área | Resultado | Evidencia |
|---|---|---|
| **Frontend build** | ✅ | `tsc` 0 errores · `expo export --platform web` 0 warnings (1313 módulos, bundle 4.4 MB) · dist/ ignorado en git |
| **Deploy Vercel** | ✅ | joseph-md-app.vercel.app sirve el bundle v5.4 (`2026-09-03` ×13, `MANTENIMIENTO`, `v5.4`) ≤2 min tras el push · vitals-pulso 200 |
| **USMLE (99 días)** | ✅ | 0 fines de semana/feriados, 12 hitos en sus fechas exactas, diaInicio = DIAS, Obsidian ≤99; README/CALENDARIO/PALMERTON regenerados desde el TS |
| **MIR / Derma / Research** | ✅ (2 fixes) | Derma d44 y Research d41 caían en 1-ene/25-dic → re-sloteados; `slots()` del remap ahora salta feriados; MIR 78 L-V (3-sep→21-dic) |
| **Business / LIVIANO / SYNAPSE / AURUM** | ✅ (fixes) | SYNAPSE 82d y AURUM 130d regenerados a 3-sep (AURUM ahora también salta feriados); LIVIANO: 16/16 casos re-sloteados a VIERNES reales |
| **Backend Supabase** | ✅ + ⚠ P0 | 104 filas ENCAPS (3-sep→29-ene, 20 mini-sims en viernes, 0 huecos), labels IV-1/IV-6/V-7 corregidos, `dias_a_examen` 208 · **P0 pre-existente: `datos_tesis` (datos de menores) con RLS OFF + anon key en repo; 46 tablas sin RLS (40 son backups `study_schedule_*`)** |
| **Temas citados** | ✅ (2 fixes) | B&B/uWorld/Palmerton/AccessDerma/MIR verificados reales; corregida cifra NWCR en LIVIANO; uw d75 alineado a categoría uWorld exacta |
| **Google Calendar** | ✅ | 11 bloques de estudio presentes en cada L-V del 3 al 11-sep, sin solapes entre bloques de estudio, finde libre, sin series viejas; descripciones de los 12 hitos actualizadas a D# v5.4 |

Pendientes menores (no bloqueantes): martes ALISTARSE 18:30 pisa 15' la eval USMLE (rutina pre-existente); las series USMLE del Calendar siguen hasta el 29-ene (semana de examen) aunque el plan termina el 22; 9 checks stale de julio en `study_checks` (claves distintas, sin colisión).

3-sep: corrimiento a D1=4-sep (v5.5) — mismo pipeline, hitos intactos, 1 día de contenido USMLE fusionado.

## 6 · NotebookLM

- **"STEP 1 · Palmerton Engine (método + sistemas)"** — **295 fuentes (tope del plan)**: ~146 videos del canal
  (método + High-Yield por sistema, catálogo completo vía playlists) + **149 artículos de yousmle.com** (crawl del
  sitemap 615 posts → 151 relevantes Step 1/método; 2 duplicados omitidos). Es el motor de consulta del método y
  de las tarjetas de mecanismo. https://notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86
- **"DERMA · Élite Engine (Palmerton derma · fuentes verificadas)"** — 75 fuentes OA verificadas (DermNet
  describing-lesions + Dermoscopy CME, Dermoscopedia, Cotofana, DeLorenzi, Goodman, MD Codes, láser, acné, ISSVA,
  StatPearls…), enlazado en la pestaña Fuentes del Hub Derma (`DERMA_NOTEBOOKLM` en dermaData.ts).
  https://notebooklm.google.com/notebook/0e9fac5c-01f3-406e-96f2-6230bd66a29c

## 8 · "Cero puntos ciegos" — investigación Palmerton v3 + Fase C por sección (4→6-sep-2026)

**Método.** (1) Crawl completo de yousmle.com e ingesta al cuaderno (295 fuentes). (2) Seis análisis de vacíos por
sección con criterio de preparador de élite (MIR, ENCAPS, Derma, Research, LIVIANO/AURUM/Business, SYNAPSE/VITALS/rutina)
→ **65 vacíos** con impacto/esfuerzo/ficheros (`DATA/USMLE/_palmerton_v3_extractos/gaps_*.json`). (3) **Fase C**: 12
agentes en paralelo con ficheros disjuntos implementaron los de impacto alto/medio sin tocar franjas, metas ni fechas
(commit `22ac163`). (4) Segunda capa de vacíos post-implementación (`gaps_v3b_*.json`) para la siguiente iteración.
(5) Extracción exhaustiva del método (6 temas + 6 grupos de materias) y síntesis en `DATA/USMLE/PALMERTON_METODO_COMPLETO.md`
y `PALMERTON_POR_MATERIA.md` v3; plan USMLE ceñido a los 5 niveles UWorld (§8.8).

### 8.1 MIR (15:15-16:15)
- **Plan v3 regenerado** (`STUDY_HUB/_scrape/gen_mir_daily.js --check`): selección **top-N por Peso MIR** + núcleos
  rabi_94 forzados (cobertura 744 → **957 puntos-peso**, 20 pesos corruptos → 0), **D1-D4 = Epidemiología + Bioética**
  (mejor ratio Q/día; transferencia directa del I-3 de ENCAPS), bloques permutados para que cada asignatura **preceda ~1
  semana a su sistema Step 1** (campo `usmleSystem`), D77 mini-MIR 40Q/51 min + D78 baseline por asignatura.
- Franjas rebalanceadas dentro del bloque (7 → 17-19 Q/día; lectura dirigida a los gaps del pre-test; 77 s/Q real);
  eval anclada multi-temporal **D-1/D-3/D-7**; test de cierre 10Q por asignatura (≥70% consolidada, <55% a anclas).
- **Medición**: `mirEvalLog.ts` (localStorage, neto A−F/3, tipo de error knowledge/transfer/proceso + `delta_es`
  🇪🇸), MIR_READINESS derivado del log; puente `mirUsmleBridge.ts` (chip "Step 1 esta semana" / "MIR en paralelo").
- **Mantenimiento ene-mar 2027** (`mirMantenimiento.ts`, 63 días, 25Q/día ponderadas por peso y por el log; modo
  reducido 4-22 ene) → el bloque 15:15 ya no queda vacío entre el 24-dic y el 31-mar.
- Pendiente Joseph: pool de preguntas oficiales (`mirPreguntasOficiales.ts` vacío; MVP = cuadernillos 2022-2026 de
  examenesmir.com clasificados por capId) · preset FSRS `APEX::MIR` retention 0,85 · confirmar acceso AMIR.

### 8.2 ENCAPS (16:15-17:15) — ver también DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md
- App/datos a **v3**: `encapsRentabilidad.ts` y `encapsCobertura.ts` (8 críticos + 3 ALTA rebote, IV nunca <6%;
  II-EMG e I-OCC creados); **Supabase re-sembrado** (102 filas, backup `study_schedule_bk_0906b`) con **sub-eje por
  sesión** (V-2 planeamiento/clima+calidad/residuos, I-3 8 sub-ejes…) y **`temas_secundarios` = cola larga** (17
  códigos → ≈30 pp del vector que antes no tenían slot); mini-sim de viernes con receta fija y nota persistida en
  `study_sim_scores` (Cockpit grafica vs 18/25).
- **Tracking unificado** multi-examen (`_registro_resoluciones.json` _meta v3, taxonomía Palmerton + CCSN + delta_es)
  + cierre de sesión en 1 línea + `gen_encaps_semana.js` (% ciego semanal vs vector, temas calientes, override del CICLO).
- **Sellado del 2026-II** (texto + ítems extraídos = LISTA NEGRA; pre-test vie 5-feb-2027 en `PRETEST_2026-II.md`),
  banco propio (`BANCO_PROPIO/`: exámenes reales 2024-2A→2026-1 por código, mini-sims HTML con temporizador 72s/Q
  para 11 y 18-sep, `gen_encaps_minisim.js`), **cifras críticas** (CSV Anki `ENCAPS_Cifras_2027-I` para el bloque
  05:00), `gen_encaps_intensivo_2027.js` (SQL de la fase intensiva feb-mar, se aplica al confirmar la fecha).
- Pendiente Joseph: re-scan logueado QX/Theomed el 7-sep (¿acceso vivo? ¿Investigación/Gestión publicados?) ·
  verificar RM de emergencia (II-EMG) y base legal SST (I-OCC) · convocatoria SERUMS 2027-I (fecha real).

### 8.3 Derma (13:30, interdiario)
- `dermaDailyPlan.ts` v2.1: **200 casos en permutación fija** (2/día, `casoIds`), micro-track de **dermatoscopia**
  (18 módulos DermNet CME + 1 imagen ciega/sesión), **swap de contenido d19-20 ↔ d57-58** (oclusión vascular/HDPH y
  ceguera ANTES de la extracción de SR-1), `puenteResearch`, campos `nitida` (protocolo/guion/seguimiento) en el
  módulo B, capa ATLAS completada.
- `dermaCerebro.ts` (**35 fichas de 7 pasos** X + CRIT, con checklist HDPH), `dermaLedger.ts` (ledger por caso y
  fallos por módulo CORE), decks `APEX::DERMA::<A..X>` + plantilla de sesión, registro `TRACKING/_registro_derma.json`,
  componentes (dictado morfológico 8 ejes con gate del módulo A, cerebro clínico modo recitar, simulador oclusión
  vascular 90 s, registro por caso, widget de debilidades, checkpoints), cuaderno NotebookLM Derma, rama Obsidian
  `10_DERMATOLOGIA` + `obsidianDermaMap.ts`, `RUTA_FELLOWSHIP_ESTETICO.md` (ASDS/ACGME/Mayo verificados),
  `NITIDA_PROTOCOLOS.md`.
- Pendiente Joseph: crear los 10 sub-decks en Anki · TOC de Fitzpatrick/Barnhill/Weinberg con sesión UF (método en
  `_scrape/README_TOC_PENDIENTE.md`) · dermatoscopio de bolsillo antes de d45 · cifras "A VERIFICAR" de las fichas.

### 8.4 Research (13:30, interdiario)
- **Plan re-cortado** (`gen_research_plan.js <fecha>`, fuente única → `researchDailyPlan.ts` + `daily-plan.md` +
  `obsidianResearchMap.ts`): pistas **R0 infra académica** (checklist 10 cuentas) · **M contactos** (Dr. Ciro,
  AuthorAID, Finlay) · **C carta al editor** (C-1 candidatos verificados → submit oct-nov) · **T tesis L0** (research
  letter: ética/CEI → STROBE → cascada JAAD Intl → IJD → Actas → Anais) · **CR case report** (consentimiento, fotos,
  CARE 13) · 0 átomos del 4 al 29-ene · **SR-1 pasa al ciclo 2** (`researchDailyPlan2027.ts`, 5-feb→10-ago-2027, con
  revisor humano #2 y equipo PROSPERO).
- `RESEARCH_ENTREGABLES` + **Mesa editorial** en el Hub (estado por entregable), timeline/horario viejos eliminados;
  docs: `MENTORES.md` (3 mensajes listos), `CARTA_1/candidatos.md` (5 artículos 2026 con DOI verificado por
  Crossref), `CASE_REPORT_1/` (consentimiento ES/EN, protocolo de fotos, CARE), `TESIS_L0/`, presupuesto en RUTA §3;
  Edge Functions `research-discovery`/`research-fulltext` descargadas al repo (`supabase/functions/`), DDL faltante,
  `research_agent_tasks` a idle, `exportResearchCorpus()` CSV/RIS para Rayyan, plantillas letter/CARE/STROBE + `docx_assembler --template`.
- Pendiente Joseph: ENVIAR los 3 mensajes (2ª-3ª semana sep) · documentar CEI/consentimientos de la tesis (1ª
  semana oct) · caso + consentimiento + senior author antes del 31-oct · crear ORCID/Scholar/CTI Vitae · decidir si
  la tesis se somete el 17-nov (plan) o en feb (RUTA §3.1).

### 8.5 LIVIANO · AURUM · Business · CURVA/DENSA · VITALS
- **LIVIANO**: currículo como dato (`liviano_curriculum.json`) + generador `gen_liviano_plan.js` (absorbe el reslot de
  viernes), **16 casos únicos** con datos clínicos, red flags y rúbrica 0-2×4 (`livianoCasos.ts`), **módulo 7 "Acceso en
  Perú"** (DIGEMID, condición de venta, 2 cotizaciones + magistral, cadena de frío) como tarea verificable →
  `LIVIANO_ACCESO_PERU`, revisión trimestral, pre-test ciego lunes + drills de cifras, **216 tarjetas de mecanismo**
  (CSV), score real en vez de ✓, `LivianoKpiLog` semanal con semáforo, `LIVIANO_PROTOCOLO_CLINICO_v1.md` (capstone).
- **AURUM**: variante LIVIANO en F3-F6 (1 de cada 5 drills, PITCH v4-v6, mismo paciente que el caso integral),
  `AURUM_RUBRICA_PITCH` (6 ítems) en los 7 viernes de cierre, scoreboard semanal editable con semáforo.
- **Business**: plan Pulso re-scope a formato **L** (lectura 20-25'/día + 1 output viernes; sin bloque de 2h
  inexistente; sin contradicciones con la Academia) desde `plan_pulso_v3_L.json`.
- **CURVA / DENSA**: esqueletos curriculares con fuentes verificadas (menopausia/andrología; S3 alopecia + AAD) para
  convertir en plan de 90 días en enero. **VITALS**: `LIVIANO_VITALS_BRIDGE.md` (estándar Academia → regla VITALS; 3 tareas).
- Pendiente Joseph: decidir eje de CURVA (estética corporal vs hormonal) · leer las guías descargadas y rellenar
  cifras "A VERIFICAR" · las 3 tareas VITALS requieren un chat de VITALS (código en producción, no tocado).

### 8.6 SYNAPSE · vibecoding · sistema transversal
- **Vibecoding 04:15 como dato**: `VIBECODING_12_PROYECTOS.md` + `vibecodingPlan.ts` (S1 parser APEX → S2 telemetría
  Anki → S3 scores USMLE → S4 revisión semanal → S5 hook remap → **S6 RLS datos_tesis** → S7 VITALS → S8 motor de
  preguntas → S9 overlays → S10 bot LIVIANO → S11 contenido → S12 capstone), con entregable verificable y ✓ en la app;
  F1 de SYNAPSE (12:30) sustituye CS50P por el stack real (Claude Code/Academy · Supabase · n8n), PC sáb = SHIP, dom = Feynman.
- **Revisión semanal** (`DATA/REVISION_SEMANAL.md`, 10 métricas; `gen_revision_semanal.js` pre-rellena desde
  Supabase/localStorage/AnkiConnect/VITALS y appendea a `DATA/USMLE/REVISIONES/_semanas.json`; tarjeta "Semana N/20"),
  **telemetría Anki** (`anki_telemetria.js`, KPI due/backlog/retención en el cockpit; Anki de finde = due × 20 s),
  **`PROTOCOLO_MODO_MINIMO.md`** (VERDE/ÁMBAR/ROJO con disparadores medibles y orden de degradación; selector en Home).
- **Rutina/Calendar**: `CALENDAR_SEGMENTOS_V5_6.md` re-extraído del Calendar vivo (autoridad de CUÁNDO y CÓMO);
  descripciones de desayuno/almuerzo/deep prime/MIR/ENCAPS→LIVIANO/GYM con comida-hidratación; **protocolo test-day
  de Palmerton en los 12 overlays de hito** (Ziploc 1/2/3, sit-in breaks, almuerzo dentro del sim, VITALS como ensayo);
  `RUTINA_EXTREMA_MILITARIZADA.md` a v5.6 (Step 1 primario hasta enero); memoria de Claude con "ESTADO VIGENTE".
- **Parser APEX** (D:/agente_estudio): P0-2 (lookahead sin `$`) y P0-3 (caso_clinico/fisio_expandida) arreglados con
  test multilínea verde; n8n sigue con el código del 7-may hasta redeploy.
- Pendiente Joseph: crear el evento sáb 07:15 "REVISIÓN SEMANAL" · auditar F0 en 5' el 7-sep · verificar FSRS/10
  nuevas en Anki D1-D2 · redeploy n8n (APEX-MOTOR-FLOW-V2) · `datos_tesis` RLS OFF sigue abierto (proyecto S6, 12-16 oct).

### 8.7 Pipeline de corrimiento (si un día no se estudia)
`node DATA/_scripts/remap_inicio.js <fecha>` → después, en este orden: `gen_research_plan.js <fecha>` (la pausa de enero
no la conoce el remap) · `gen_liviano_plan.js <fecha>` · `gen_business_plan.py <fecha>` · `gen_synapse_plan.js <fecha>`
· `gen_vibecoding_plan.js <fecha>` · `gen_aurum_plan.js <fecha>` · `STUDY_HUB/_scrape/gen_mir_daily.js <fecha> --check`
· `gen_encaps_mantenimiento_2027.js <fecha>` → execute_sql · USMLE con `gen_usmle_v5.js` (scratchpad; recorta 1 día
de contenido para mantener los hitos en viernes) · docs + D# de los overlays del Calendar.
