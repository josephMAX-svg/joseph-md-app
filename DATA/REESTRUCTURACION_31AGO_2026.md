# REESTRUCTURACIÓN MASIVA · D1 = MIÉRCOLES 9-SEP-2026 (v5.7)

> **Corrimientos:** 31-ago, 1-sep, 2-sep, 3-sep, 4-sep, **7-sep y 8-sep** no se estudiaron → TODO corrió a
> **D1 = mié 9-sep-2026** (regla determinista: cada día sin estudiar = +1 hábil). USMLE = **95 días**
> (fases **A D1-D80 · B D81-D90 · C D91-D95**) · ENCAPS = **100 días** (SQL regenerado, backup
> `study_schedule_bk_0908`) · MIR/Research/Derma/Business/LIVIANO/SYNAPSE/AURUM/vibecoding re-fechados.
> Los HITOS UWSA/NBME se quedaron en sus VIERNES originales (no se movieron); las franjas, las metas y la
> fecha de examen (semana 25-29 ene-2027) tampoco. **Detalle del corrimiento v5.7 en §9.**
>
> *Histórico:* el 31-ago se amplió el cuaderno NotebookLM "STEP 1 · Palmerton Engine" de 25 a ~140 fuentes
> (catálogo completo del canal) y la guía PALMERTON_POR_MATERIA pasó a v2. El 2-sep se corrió una
> verificación total (frontend build, backend Supabase, deploy, temas citados, Calendar) — ver §7.
> El 3-sep tampoco se estudió: corrimiento a D1 = vie 4-sep (v5.5) — mismo pipeline, hitos de
> viernes intactos, 1 día de contenido USMLE fusionado. El 4-sep TAMPOCO se estudió: corrimiento
> determinista a D1 = lun 7-sep (v5.6). El **7 y el 8-sep tampoco** → v5.7 (este documento).
> **§7 y §8 son el registro histórico de la v5.6 y se conservan íntegros: sus fechas y D# son los de
> ANTES de este corrimiento.**

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

## 1 · USMLE Step 1 — plan v5.7 MAESTRO (95 días)

- **Fuente de verdad:** `src/lib/usmleStep1Daily.ts` (v5.7, **D1 = mié 9-sep-2026 → D95 = vie 22-ene-2027**).
  Docs: `DATA/USMLE/README.md`, `PALMERTON_POR_MATERIA.md` (v3, catálogo completo), `CALENDARIO_5_MESES.md`,
  `RECURSOS_META_2026.md`.
- **Fases:** A contenido **D1-D80** (9-sep→30-dic, ~40Q uWorld/día = 1ª vuelta completa del banco 3659Q) ·
  B banco intensivo **D81-D90** (4→15-ene) · C sprint **D91-D95** (18→22-ene). Cada día conserva su
  `nivelUW` (1-5) y su `qDia`.
- **Hitos (fechas intactas, D# nuevos):** UWSA1 **11-sep = D3** (baseline) · NBME 25 **2-oct = D18** ·
  NBME 26 **23-oct = D33** · NBME 27 **13-nov = D48** · NBME 28 **4-dic = D63** · NBME 29 **18-dic = D73** ·
  NBME 30 **30-dic = D80** (cierre de Fase A) · UWSA2 **8-ene = D85** · NBME 31 **15-ene = D90**
  (**GO/NO-GO**) · NBME 32 **18-ene = D91** · NBME 33 **20-ene = D93** · Free 120 **22-ene = D95**.
- **Criterio GO (Step 1 es pass/fail y un fail queda PARA SIEMPRE en ECFMG):**
  2 NBME consecutivos ≥68% + UWSA2 low-risk → confirmar fecha. Si no → correr a feb-mar (el
  eligibility period lo permite sin costo).
- **Método (Palmerton, validado por NotebookLM "STEP 1 · Palmerton Engine", 25 videos):**
  Anki en la MAÑANA con mente fresca · First Aid = mapa de objetivos (no biblia) · 80% mastery
  (80% en 10Q consecutivas del subtema antes de avanzar) · tarjetas de MECANISMO y cronología
  fisiopatológica · ~50% de fallos son de interpretación, no de conocimiento · stress sets
  (10Q/12min) recién en Fases B-C.
- **Regla de corrimiento:** un día perdido corre todo +1 día hábil
  (`node DATA/_scripts/remap_inicio.js <fecha>` — L-V + feriados, **95 días USMLE**, re-fecha también
  MIR/Research/Derma/Business/LIVIANO y re-slotea los casos LIVIANO a viernes; aparte:
  `gen_encaps_mantenimiento_2027.js <fecha>` → execute_sql, `gen_synapse_plan.js <fecha>`,
  `gen_aurum_plan.js <fecha>`). Los hitos USMLE están anclados a fechas: si se corre, migrar los
  overlays del Calendar o aceptar que caigan en otro día de la semana.
  **Coste acumulado:** cada corrimiento recorta 1 día de CONTENIDO de la Fase A para no mover los hitos;
  en v5.7 se recortaron **2 días** (ver §9).

## 2 · ENCAPS — mantenimiento 2027-I (1h/día)

- **Supabase (v5.7): 100 días L-V (9-sep-2026 → 29-ene-2027)** en `study_schedule`, modo `MANTENIMIENTO`
  (backups: `study_schedule_bk_0827` → `bk_0831` → `bk_0902` → `bk_0903` → `bk_0906` → `bk_0906b` →
  **`bk_0908`**). Generador: `DATA/_scripts/gen_encaps_mantenimiento_2027.js <fecha>`.
  ⚠ **El SQL ya está generado en `DATA/_scripts/_encaps_mantenimiento_2027.sql` (100 filas, verificado)
  pero NO aplicado todavía**: falta ejecutarlo con `execute_sql` contra el proyecto `qacynpqdrorpuegsmtcy`.
  Hasta entonces Supabase sigue con el calendario de la v5.6 y la app mostrará el día equivocado.
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
- App: `src/lib/encapsPlan.ts` **v6.5** (`STUDY_D1.ENCAPS = '2026-09-09'`, backup `bk_0908` citado en el
  comentario; el nº de días lo define la siembra de Supabase = **100**), skip fines de semana + feriados,
  rama compacta `MANTENIMIENTO` en `itemsForDay`; los viernes `tipo='mini_sim'` usan la plantilla de simulacro.

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
  70 átomos interdiarios (**9-sep-2026 → mié 24-mar-2027**, salta feriados) sobre AccessDermatology real — 200 casos visuales ciegos +
  1.301 review questions (Pictorial 4e 381 · CORE 104 · Barnhill's 403 · 3e 363 · QOTW 50) +
  Fitzpatrick/Baumann; los últimos ~20-25 átomos = ESTÉTICA (toxina, fillers, láser, peelings).
  Dato clave: la cosmética está formalmente dentro del CORE surgical del board americano.
- **LIVIANO Academia** (`DATA/BUSINESS/LIVIANO_ACADEMIA.md` + `src/lib/livianoStudyPlan.ts` +
  panel 📚 Academia en Business→LIVIANO): **90 días, 9-sep-2026 → vie 15-ene-2027**; 6 módulos + M7 Acceso
  en Perú (fisiología del peso → GLP-1/tirzepatida → acceso Perú → nutrición → ejercicio →
  farmacología/bariátrica → conducta → síntesis), 45'/día (25' estudio + 20' explicarlo
  en palabras simples), **16 casos, todos en viernes** (18-sep → 15-ene). Cifras ancla: semaglutida −15% · tirzepatida −21% ·
  SELECT −20% CV · 67% del peso se recupera al suspender (argumento del tratamiento crónico).
- **Research** (`DATA/RESEARCH/RUTA_PUBLICACION_2027.md`): escalera carta→case report→revisión
  sistemática; case report #1 → Dermatology Online Journal (MEDLINE, APC ≤$300); Cureus deslistada
  de WoS (máx 1-2 ítems); dato NRMP: IMGs no-match en derma tenían mediana 12 publicaciones —
  el volumen sin Steps no compensa → proteger Step 1 hasta enero es la jugada correcta.
  Plan diario re-fechado (**ciclo 1: 42 átomos, jue 10-sep-2026 → vie 5-feb-2027** por paridad interdiaria con
  Derma, que toma el mié 9-sep; **ciclo 2: 67 átomos, mar 9-feb → jue 12-ago-2027**; pausa 4→29-ene = 0 átomos).
  Hitos editoriales v5.7: mentor 16-sep · carta diana 24-sep · **SUBMIT carta-1 14-oct** · ética tesis 16-oct ·
  caso del case report 30-oct · **SUBMIT tesis-L0 19-nov** · revisor #2 25-nov · paquete CR congelado 7-dic ·
  **SUBMIT case report 1-feb** · equipo 15-feb · **PROSPERO 19-feb** · **SUBMIT SR-1 1-jul-2027**.

## 5 · Qué se re-fechó en la app (corrimiento v5.7 · 8-sep-2026 · D1 = mié 9-sep)

Fechas leídas de los `.ts` con `node` (no estimadas):

| Plan | Fichero | D1 | Dfin | Nº |
|---|---|---|---|---|
| 🇺🇸 USMLE Step 1 | `usmleStep1Daily.ts` | mié 9-sep-2026 | vie 22-ene-2027 | **95** |
| 🇵🇪 ENCAPS mantenimiento | `encapsPlan.ts` + Supabase | mié 9-sep-2026 | vie 29-ene-2027 | **100** |
| 🇪🇸 MIR 1ª vuelta | `mirDailyPlan.ts` | mié 9-sep-2026 | lun 28-dic-2026 | 78 |
| 🇪🇸 MIR mantenimiento | `mirMantenimiento.ts` | lun 4-ene-2027 | mié 31-mar-2027 | 63 *(sin cambios)* |
| 🔬 Research ciclo 1 | `researchDailyPlan.ts` | jue 10-sep-2026 | vie 5-feb-2027 | 42 |
| 🔬 Research ciclo 2 | `researchDailyPlan2027.ts` | mar 9-feb-2027 | jue 12-ago-2027 | 67 |
| 🩺 Derma élite | `dermaDailyPlan.ts` | mié 9-sep-2026 | mié 24-mar-2027 | 70 |
| ⚖️ LIVIANO Academia | `livianoStudyPlan.ts` | mié 9-sep-2026 | vie 15-ene-2027 | 90 |
| 💼 Business formato L | `businessStudyPlan.ts` | mié 9-sep-2026 | jue 7-ene-2027 | 121 (84 trabajo + 37 DESCANSO) |
| 💰 AURUM | `aurumDailyPlan.ts` | mié 9-sep-2026 | vie 12-mar-2027 | 130 |
| 🧠 SYNAPSE | `synapseDailyPlan.ts` | mié 9-sep-2026 | sáb 28-nov-2026 | 81 |
| 🛠 Vibecoding 04:15 | `vibecodingPlan.ts` | mié 9-sep-2026 | mar 1-dic-2026 | 60 (12 SHIP, sáb 19-sep → 5-dic) |

`remap_inicio.js` salta sáb+dom+feriados (25-dic, 31-dic, 1-ene) en USMLE/MIR/LIVIANO
(Business solo inserta DESCANSO en finde; Research, SYNAPSE, AURUM, LIVIANO y vibecoding se regeneran
con sus propios generadores — ver §8.7 y §9).

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
- Pendiente Joseph: re-scan logueado QX/Theomed el 9-sep (¿acceso vivo? ¿Investigación/Gestión publicados?) ·
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
- Pendiente Joseph: crear el evento sáb 07:15 "REVISIÓN SEMANAL" · auditar F0 en 5' el 9-sep · verificar FSRS/10
  nuevas en Anki D1-D2 · redeploy n8n (APEX-MOTOR-FLOW-V2) · `datos_tesis` RLS OFF sigue abierto (proyecto S6, 12-16 oct).

### 8.7 Pipeline de corrimiento (si un día no se estudia)
`node DATA/_scripts/remap_inicio.js <fecha>` → después, en este orden: `gen_research_plan.js <fecha>` (la pausa de enero
no la conoce el remap) · `gen_liviano_plan.js <fecha>` · `gen_business_plan.py <fecha>` · `gen_synapse_plan.js <fecha>`
· `gen_vibecoding_plan.js <fecha>` · `gen_aurum_plan.js <fecha>` · `STUDY_HUB/_scrape/gen_mir_daily.js <fecha> --check`
· `gen_encaps_mantenimiento_2027.js <fecha>` → execute_sql · USMLE con `gen_usmle_v5.js` (scratchpad; recorta 1 día
de contenido para mantener los hitos en viernes) · docs + D# de los overlays del Calendar.

## 9 · Corrimiento v5.7 (8-sep-2026) — D1 pasa de lun 7-sep a MIÉ 9-SEP-2026

### 9.1 Por qué

**El 7 y el 8 de septiembre no se estudiaron.** Regla determinista del sistema: cada día sin estudiar
= **+1 día hábil** para todos los planes. Dos días perdidos = **+2 hábiles** → el D1 de todo el régimen
pasa de **lun 7-sep-2026** a **mié 9-sep-2026** (v5.7).

Lo que **NO** se movió, por diseño:
- Las **franjas horarias** (04:15 vibecoding · 05:00 Anki AM · 07:15-12:00 Step 1 · 12:30 SYNAPSE ·
  13:30 Research↔Derma · 14:15 AURUM · 15:15 MIR · 16:15 ENCAPS · 17:15 LIVIANO · 18:00 eval).
- Las **metas** de cada frente (Step 1 PASS · ENCAPS ≥17 · MIR Top 50 · publicaciones).
- Las **fechas de examen**: Step 1 semana **25-29 ene-2027** · ENCAPS 2027-I fines de marzo.
- Los **hitos** UWSA/NBME/Free 120: siguen en sus viernes originales; solo cambia su D#.
- El **MIR mantenimiento** (4-ene → 31-mar-2027): tiene fechas fijas, no se corre.

### 9.2 Qué se recortó

Para que los hitos no se muevan, el corrimiento **se paga con contenido de la Fase A del USMLE**:
esta vez **2 días** (uno por cada día perdido). Se hizo **fusionando los 4 días de cierre de la Fase A
en 2 días dobles**, sin perder ningún tema:

| v5.6 (4 días) | → | v5.7 (2 días dobles) |
|---|---|---|
| D78 Metabolismo HY (glucólisis/TCA/CTE · glucógeno · lípidos) | → | **D78 · lun 28-dic** — Bioquímica HY (día doble): metabolismo **+** aminoácidos, ciclo de urea, errores innatos y vitaminas |
| D79 Aminoácidos + ciclo de urea + errores innatos + vitaminas | ↗ | *(fusionado en D78)* |
| D80 Biología molecular + genética (herencias, trinucleótidos) | → | **D79 · mar 29-dic** — Cierre de Fase A (día doble): biología molecular y genética **+** farmacología general (PK/PD, toxicología, antídotos) |
| D81 Farmacología general: PK/PD + toxicología + antídotos | ↗ | *(fusionado en D79)* |

**Ningún tema se perdió**: los 4 bloques de contenido siguen en el plan, comprimidos en 2 sesiones.
El sistema `Pharmacology` deja de existir como día propio y su contenido vive dentro del cierre de
Biochemistry. El resto de la Fase A (sistemas D1-D77) queda **intacta día por día**.

### 9.3 Tabla plan → D1 / Dfin / nº días · ANTES (v5.6) y AHORA (v5.7)

Todas las fechas parseadas de los `.ts` (v5.6 desde el commit `b24f986`; v5.7 desde el árbol de trabajo).

| Plan | D1 v5.6 | Dfin v5.6 | Nº v5.6 | **D1 v5.7** | **Dfin v5.7** | **Nº v5.7** |
|---|---|---|---|---|---|---|
| 🇺🇸 USMLE Step 1 | lun 7-sep-2026 | vie 22-ene-2027 | 97 | **mié 9-sep-2026** | **vie 22-ene-2027** | **95** ⬇2 |
| 🇵🇪 ENCAPS mantenimiento | lun 7-sep-2026 | vie 29-ene-2027 | 102 | **mié 9-sep-2026** | **vie 29-ene-2027** | **100** ⬇2 |
| 🇪🇸 MIR 1ª vuelta | lun 7-sep-2026 | mié 23-dic-2026 | 78 | **mié 9-sep-2026** | **lun 28-dic-2026** | 78 |
| 🇪🇸 MIR mantenimiento | lun 4-ene-2027 | mié 31-mar-2027 | 63 | lun 4-ene-2027 | mié 31-mar-2027 | 63 *(fijo)* |
| 🔬 Research ciclo 1 | mar 8-sep-2026 | mié 3-feb-2027 | 42 | **jue 10-sep-2026** | **vie 5-feb-2027** | 42 |
| 🔬 Research ciclo 2 | vie 5-feb-2027 | mar 10-ago-2027 | 67 | **mar 9-feb-2027** | **jue 12-ago-2027** | 67 |
| 🩺 Derma élite | lun 7-sep-2026 | lun 22-mar-2027 | 70 | **mié 9-sep-2026** | **mié 24-mar-2027** | 70 |
| ⚖️ LIVIANO Academia | lun 7-sep-2026 | mié 13-ene-2027 | 90 | **mié 9-sep-2026** | **vie 15-ene-2027** | 90 |
| 💼 Business formato L | lun 7-sep-2026 | mar 5-ene-2027 | 121 | **mié 9-sep-2026** | **jue 7-ene-2027** | 121 |
| 💰 AURUM | lun 7-sep-2026 | mié 10-mar-2027 | 130 | **mié 9-sep-2026** | **vie 12-mar-2027** | 130 |
| 🧠 SYNAPSE | lun 7-sep-2026 | jue 26-nov-2026 | 81 | **mié 9-sep-2026** | **sáb 28-nov-2026** | 81 |
| 🛠 Vibecoding 04:15 | lun 7-sep-2026 | vie 27-nov-2026 | 60 | **mié 9-sep-2026** | **mar 1-dic-2026** | 60 |

**Hitos USMLE: fecha idéntica, D# nuevo** — UWSA1 11-sep D5→**D3** · NBME 25 2-oct D20→**D18** ·
NBME 26 23-oct D35→**D33** · NBME 27 13-nov D50→**D48** · NBME 28 4-dic D65→**D63** ·
NBME 29 18-dic D75→**D73** · NBME 30 30-dic D82→**D80** · UWSA2 8-ene D87→**D85** ·
NBME 31 15-ene D92→**D90** (GO/NO-GO) · NBME 32 18-ene D93→**D91** · NBME 33 20-ene D95→**D93** ·
Free 120 22-ene D97→**D95**.

### 9.4 Pipeline ejecutado, en orden

1. `node DATA/_scripts/remap_inicio.js 2026-09-09` — re-fecha MIR, Derma, Business, LIVIANO y los
   demás bloques del remap (salta sáb+dom y los feriados 25-dic / 31-dic / 1-ene).
2. `node DATA/_scripts/gen_research_plan.js 2026-09-09` — Research ciclos 1 y 2 (el remap no conoce la
   pausa de enero; este script sobreescribe sus fechas) → `researchDailyPlan.ts`, `researchDailyPlan2027.ts`,
   `obsidianResearchMap.ts` y `DATA/RESEARCH/daily-plan.md`.
3. `node DATA/_scripts/gen_liviano_plan.js 2026-09-09` — 90 días, 16 casos re-sloteados a VIERNES reales,
   pre-tests en lunes, 4 drills (D36 · D57 · D76 · D87) → `livianoStudyPlan.ts` + `livianoCasos.ts` + CSV Anki.
4. `python DATA/_scripts/gen_business_plan.py 2026-09-09` — 121 filas (84 trabajo + 37 DESCANSO), 15 OUTPUT
   en viernes + S16 y la retro en el cierre de enero.
5. `node DATA/_scripts/gen_synapse_plan.js 2026-09-09` — 81 días (12 semanas, 9-sep → 28-nov).
6. `node DATA/_scripts/gen_vibecoding_plan.js 2026-09-09` — 60 días + 12 SHIP en sábados (19-sep → 5-dic)
   → `vibecodingPlan.ts` + `DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md`.
7. `node DATA/_scripts/gen_aurum_plan.js 2026-09-09` — 130 días (9-sep → 12-mar-2027).
8. `node STUDY_HUB/_scrape/gen_mir_daily.js 2026-09-09 --check` — 78 días con verificación de pesos,
   capIds, fechas L-V y D1-D4 = Epi + Bioética.
9. `node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-09-09` → **SQL generado** en
   `DATA/_scripts/_encaps_mantenimiento_2027.sql` (100 filas, 9-sep → 29-ene, backup `study_schedule_bk_0908`).
   **⚠ PENDIENTE: aplicarlo con `execute_sql`** — es el único paso del pipeline que no está ejecutado.
10. USMLE con `gen_usmle_v5.js` (scratchpad): 95 días, fases 80/90/95, fusión de los 4 días de cierre de
    Fase A en 2 (§9.2), hitos en sus viernes.
11. `npx tsc --noEmit -p .` → **0 errores**.
12. Docs regenerados/actualizados a v5.7 (este fichero, README de MIR/Business, PLAN_ELITE Derma,
    RUTA_PUBLICACION, LIVIANO_ACADEMIA, CURSO_IA_04H, VIBECODING_12_PROYECTOS, motor-dia-a-dia,
    ROADMAP_MAESTRO) + D# de los 12 overlays de hito en el Calendar.

### 9.5 Efectos colaterales detectados (y qué hacer)

1. **ENCAPS Supabase sin aplicar** (paso 9). Hasta que se ejecute el SQL, la app lee el calendario de
   la v5.6 y muestra el tema equivocado en la franja 16:15.
2. **SHIP del vibecoding desalineado con SYNAPSE.** Con D1 en miércoles, la semana de cada proyecto va
   mié→mar y su SHIP real (`VIBE_PROYECTOS.ship`) cae el **sábado siguiente** (S1 = sáb 19-sep), mientras
   `synapseDailyPlan.ts` sigue etiquetando "SHIP Sn" el sábado de SU semana n (sáb 12-sep). Va **una semana
   por delante**, y el **SHIP S12 (sáb 5-dic-2026) queda fuera** de los 81 días de SYNAPSE (terminan el
   28-nov). Manda `VIBE_PROYECTOS`. Arreglo propuesto en `DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md` §Pendiente v5.7.
3. **Puente MIR↔Step 1 estrechado en 2 bloques.** El MIR mantiene 78 días y el Step 1 bajó a 95, así que
   los desfases cambiaron: **Cardiología** ahora precede al bloque Cardiovascular en **1 día** (15-sep vs
   16-sep) en vez de 3, y **Psiquiatría** arranca el mismo día que Psychiatry & Behavioral (21-dic). Los
   otros 9 bloques quedan entre +6 y +12 días. No se re-permuta el MIR: el objetivo primario hasta el
   29-ene es el Step 1. Detalle en `DATA/MIR/README.md` §1.
4. **Dos hitos editoriales con 1 día de margen**: `C-6` (SUBMIT carta al editor, mié 14-oct) contra el
   deadline interno del 15-oct, y `CR-1` (caso + senior author del case report, vie 30-oct) contra el
   31-oct. Detalle y plan B en `DATA/RESEARCH/RUTA_PUBLICACION_2027.md` §9.1.
5. **Los D# de LIVIANO cambiaron de número, no solo de fecha** (el generador re-sloteó los casos a los
   viernes reales): drills D37/D58/D77/D88 → **D36/D57/D76/D87**; revisión trimestral D46/D90 →
   **D45/D89**; capstone D89 → **D88**. La fecha es lo estable, no el número de día.
