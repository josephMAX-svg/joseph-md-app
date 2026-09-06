# DATA · USMLE Step 1 — Doc maestro v5.6 (reestructuración 27-ago · corrimiento 4-sep · niveles Palmerton 5-sep-2026)

**Step 1 es el bloque PRINCIPAL** (heredó las franjas ENCAPS de la mañana): 6h15/día L-V.
**D1 = LUN 7-sep-2026 → D97 = VIE 22-ene-2027 (97 días; 31-ago, 1-sep, 2-sep, 3-sep y 4-sep no se
estudiaron) · EXAMEN: semana 25-29 ene 2027 (target MIÉ 27-ene).**
Sábados y domingos LIBRES. Skip extra: 25-dic, 31-dic, 1-ene.
Fuente de verdad (código): [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) **v5.6**
(`DAILY_META.totalDias = 97`, `inicio = 2026-09-07`, `fin = 2027-01-22`).

Plataforma de práctica: **Qbankly** (`qbankly.app`) — **abre SOLO en Microsoft Edge**
(Chrome con CDP la bloquea). Los links de la app ofrecen botón ◆ Edge + Chrome.

## 1. Fases

| Fase | Días | Fechas | Qué se hace | Niveles UWorld (Palmerton) |
|------|------|--------|-------------|----------------------------|
| **A · Contenido por sistemas** | D1-D82 | lun 7-sep → mié 30-dic | 1ª pasada completa del temario + 30-40Q uWorld/día por nivel (= 1ª vuelta del banco entero) + 7 simulacros de hito | **1 → 3** (+ dosis diaria de 4 en la eval 18:00) |
| **B · Banco intensivo** | D83-D92 | lun 4-ene → vie 15-ene | Random timed + incorrects + AMBOSS 200 Concepts · UWSA2 (8-ene) · NBME 31 (15-ene, **GO/NO-GO**) | **4 → 5** |
| **C · Sprint final** | D93-D97 | lun 18-ene → vie 22-ene | NBME 32 · NBME 33 · Free 120 · taper (solo flagged, sin preguntas nuevas) | **5** + NBME |

## 2. Sistema → días → fechas (según `usmleStep1Daily.ts` v5.6, generado desde `DIAS`)

| Sistema | Días | Fechas | Tier | Nº días |
|---------|------|--------|------|---------|
| Fundamentos (Pathoma 1-2 + setup Anki FSRS) | D1-D2 | 7-sep → 8-sep | CORE | 2 |
| Immunology | D3-D4 | 9-sep → 10-sep | CORE | 2 |
| Cardiovascular | D6-D15 | 14-sep → 25-sep | CORE | 10 |
| Respiratory | D16-D19 · D21-D22 | 28-sep → 6-oct | CORE | 6 |
| Renal | D23-D28 | 7-oct → 14-oct | CORE | 6 |
| Gastrointestinal | D29-D34 · D36 | 15-oct → 26-oct | CORE | 7 |
| Endocrine | D37-D41 | 27-oct → 2-nov | CORE | 5 |
| Nervous System | D42-D49 | 3-nov → 12-nov | CORE | 8 |
| Hematology & Oncology | D51-D56 | 16-nov → 23-nov | HIGH | 6 |
| Microbiology / ID | D57-D63 | 24-nov → 2-dic | HIGH | 7 |
| Reproductive | D64 · D66-D69 | 3-dic → 10-dic | HIGH | 5 |
| Musculoskeletal / Rheum | D70-D72 | 11-dic → 15-dic | HIGH | 3 |
| Psychiatry & Behavioral | D73-D74 · D76 | 16-dic → 21-dic | HIGH | 3 |
| Biostats/Epi + ética (AMBOSS HY 155Q; `system` = Psychiatry & Behavioral) | D77 | 22-dic | HIGH | 1 |
| Biochemistry | D78-D80 | 23-dic → 28-dic | MED | 3 |
| Pharmacology general (PK/PD + toxicología) | D81 | 29-dic | HIGH | 1 |
| Assessment (9 hitos, ver §3) | D5 · D20 · D35 · D50 · D65 · D75 · D82 · D87 · D92 | 11-sep → 15-ene | CORE | 9 |
| Banco intensivo (Fase B) | D83-D86 · D88-D91 | 4-ene → 14-ene | CORE | 8 |
| Sprint final (Fase C) | D93-D97 | 18-ene → 22-ene | CORE | 5 |

> Los huecos dentro de un sistema (D5, D20, D35, D50, D65, D75, D82, D87, D92) son los **días de
> Assessment** (hitos, abajo); en Fase C, D93/D95/D97 son NBME 32/33 y Free 120 con
> `system = 'Sprint final'`.
> Cada día trae: `sub`, `bbCh`/`bbVid` (Boards & Beyond), `uw` (subtema uWorld), `mat`/`matType`
> (material primario), `palm` (vídeo Palmerton al abrir sistema) y, desde el 5-sep, `nivelUW` (1-5) y `qDia` (§4b).

## 3. Hitos NBME/UWSA (los viernes NO se mueven)

| # | Hito | Día | Fecha | Rol |
|---|------|-----|-------|-----|
| 1 | **UWSA1** | D5 | vie 11-sep | Baseline (esperar bajo, no asustarse) |
| 2 | **NBME 25** | D20 | vie 2-oct | 1ª calibración real |
| 3 | **NBME 26** | D35 | vie 23-oct | Tendencia |
| 4 | **NBME 27** | D50 | vie 13-nov | Tendencia |
| 5 | **NBME 28** | D65 | vie 4-dic | Tendencia |
| 6 | **NBME 29** | D75 | vie 18-dic | Cierre de contenido |
| 7 | **NBME 30** | D82 | **mié 30-dic** | Cierre Fase A (jue 31-dic y vie 1-ene son skip) |
| 8 | **UWSA2** | D87 | vie 8-ene | Predictor fuerte |
| 9 | **NBME 31** | D92 | vie 15-ene | **GO/NO-GO** |
| 10 | NBME 32 · NBME 33 · **Free 120** | D93 · D95 · D97 | lun 18 · mié 20 · vie 22-ene | Sprint final |

**Criterio GO (Step 1 es pass/fail): 2 NBME consecutivos ≥68% + UWSA2 "low risk" → confirmar
fecha.** (Palmerton: ≥65% ≈ 95% de probabilidad de aprobar; ≥70% ≈ 99% — el 68% doble queda en
el rango; mínimos on-track por hito en
[`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) Parte V.) Si NO se cumple: correr el
examen dentro del mismo eligibility period (feb-mar 2027) sin drama — un fail queda PARA
SIEMPRE en el transcript ECFMG (~1/3 de PDs nunca consideran un aplicante con fail en Step 1).
Detalle de gates y logística ECFMG/Prometric: [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md).

## 4. Franjas horarias (Google Calendar v5.2 · L-V · 6h15/día · `FRANJAS` en el TS · nivel y gate Palmerton v3)

| Hora | Segmento | Nivel UW | Gate |
|------|----------|----------|------|
| 05:00–05:45 | ANKI AM (madrugada fresca · pasada principal FSRS · Good ≈90% / Again solo olvido real · ≤50 nuevas/día) · Fases B-C: + STRESS SET 10Q/12min (primer instinto, sin cambiar respuestas) | B-C: 5 | — |
| 07:15–08:15 | Repaso anclado multi-temporal D-1/D-3/D-7 + free recall (Anki restante) · VALIDACIÓN 24-48 h: 5Q timed del subtema de AYER (1ª mitad del gate de 10Q) | 2 | subtema de ayer ≥80% en las 10Q (5 aquí + 5 en la consolidación) → validado · <80% → 5Q más del subtema antes de pasar a otro |
| 08:15–09:00 | PRE-TEST: 10Q uWorld ciegas del tema NUEVO (tutor · SIN tiempo) + free recall 90s = UWorld primero para DIAGNOSTICAR, First Aid después para tratar | 1 | sin gate: es diagnóstico (40-60% es normal) · cada duda, incluso en aciertos, va a la shopping list |
| 09:00–11:00 | DEEP PRIME: vídeo B&B/Pathoma/Sketchy + First Aid active reading (Whole Page Rule: la página completa, no el dato fallado) + tarjetas Anki de MECANISMO (≤10, patogenia→presentación, en voz alta antes de escribir) | — | — |
| 11:00–12:00 | CONSOLIDACIÓN por nivel del día (DIAS[].nivelUW): nivel 1 = 20Q en bloques 5Q tutor del subtema (días 1-2 del sistema) · nivel 2 = 30Q en bloques 5Q timed de subtemas validados (incluye 5Q del subtema de ayer = 2ª mitad del gate) · nivel 3 (viernes sin hito) = 20Q sistema completo timed + 10Q tutor · revisión = Educational Objective + shopping list + log de errores (knowledge / transfer / proceso) | 1→3 (nivelUW del día) | ≥80% → mañana sube de nivel · <80% → repetir 5Q del subtema fallado, NO avanzar (registrar en 📏 Medición) |
| 18:00–18:45 | EVALUACIÓN ACUMULATIVA modo examen: 10Q mixta timed (90 s/Q · tope 2 min · cover-the-options · juez, no abogado) + corrección + APEX · Fase A = dosis diaria de nivel 4 · día de hito: registrar aquí el % del NBME/UWSA/Free 120 | 4 (Fase A) · 5 (B-C) | ≥80% sostenido = listo para mezclar sistemas · hitos: comparar con el mínimo on-track del viernes (usmleScores.HITOS_ONTRACK) |

Resto del día (sin tocar): IA vibecoding 04:15-05:00 · RESEARCH↔DERMA alterna 13:30-14:15 ·
AURUM 14:15-15:15 · MIR 15:15-16:15 · **ENCAPS 16:15-17:15 (1h/día de banqueo puro hasta fines
de enero; feb-mar 2027 vuelve a principal — examen fines de marzo 2027)** · **LIVIANO Academia
17:15-18:00**. Las HORAS no cambian con los niveles: cambia el formato del bloque de las 11:00.

## 4b. 5 niveles UWorld por fase (Palmerton v3 · 5-sep-2026)

*(Fuente: "UWorld Complete Guide: The Five Levels of Mastery to 260+" + "How to Guarantee a Step 1 Pass" · extractos en
`_palmerton_v3_extractos/`)*. Regla madre (`DAILY_META.metodo` / `USMLE_GATE`): **no se sube de nivel sin ≥80% en 10Q
consecutivas del nivel actual, validadas ≤24-48 h después de estudiar el subtema**. Si <80%: no avanzar de tema; repetir
bloques de 5Q del subtema fallado y auditar recursos → comprensión → aplicación → memoria. Cada día de `DIAS` lleva
`nivelUW` (1-5) y `qDia` (Q objetivo); la tabla vive en `USMLE_NIVELES` (`usmleStep1Daily.ts`).

| Nivel | Nombre | Formato | Q/día | Umbral para SUBIR | Dónde vive en el día | Fase |
|-------|--------|---------|-------|-------------------|----------------------|------|
| **1** | Subtema · tutor sin tiempo | Bloques de 5Q de UN solo subtema · modo tutor · sin reloj (aprender a leer: CCSN + SAQ + cover-the-options) | Palmerton 20-30Q/día → plan: 30Q (10 pre-test + 20 consolidación) | 80% en 10Q consecutivas del subtema, ≤24-48 h tras estudiarlo | 08:15 PRE-TEST del tema nuevo (siempre) · 11:00 los 2 primeros días de cada sistema | A |
| **2** | Subtema · timed | Bloques de 5Q del subtema · cronometrado (90 s/Q · tope 2 min: adivinar, marcar, avanzar) | Volumen creciente → plan: 40Q (10 + 30) | 80% en ≥3 subtemas distintos, ≥1 validado en <48 h | 11:00 CONSOLIDACIÓN desde el 3er día de cada sistema (subtemas ya validados) · 07:15: 5Q timed del subtema de AYER (1ª mitad del gate de 10Q) | A |
| **3** | Sistema completo · timed | Bloques de 10-20Q de TODO el sistema · timed (sin la "ventaja injusta" de saber el subtema) | Palmerton 40-50Q/día → plan: 40Q (10 pre-test + 20Q sistema + 10 tutor) | 80% en 20Q timed consecutivas del sistema | VIERNES sin NBME/UWSA a las 11:00 (20Q del sistema en curso, o del anterior si el sistema lleva <3 días) | A |
| **4** | Sistemas mixtos · timed | Bloques de 20-30Q mezclando ≥3 sistemas dominados + el nuevo (saltar entre especialidades bajo presión) | Palmerton 50-70Q/día → plan Fase B: 2×40Q (80Q) | 80% en bloques mixtos de 20Q timed de ≥3 sistemas | 18:00 EVAL (10Q mixta timed) toda la Fase A como dosis diaria · Fase B D83-D86 (random timed 2×40Q + sistema débil) | A (dosis diaria) → B |
| **5** | Mixto completo 40Q · timed | Bloques de 40Q random · timed 60 min (90 s/Q) = simulación exacta del examen | Palmerton 80-100Q/día (máx. 2 bloques de 40) · hitos: UWSA 160Q · NBME 200Q · Free 120 | 80% sostenido (90% para 260+) · pase seguro = NBME ≥65% (≈95%) / ≥70% (≈99%) | 05:00 STRESS SET 10Q/12min (Fases B-C) · Fase B D88-D92 (incorrects + AMBOSS 200 + NBME 31) · Fase C (NBME 32/33 + Free 120) · hitos de viernes = formato nivel 5 como MEDICIÓN, no como progresión | B → C (+ todos los hitos) |

**Regla determinista del generador** (no toca fechas, sistemas, hitos ni el total de 97 días):
- Fase A: posición del día dentro de su sistema (sin contar Assessment) → **1º-2º día = nivel 1** (30Q = 10 pre-test + 20 consolidación en bloques 5Q tutor) · **viernes sin hito y ≥3º día = nivel 3** (40Q = 10 + 20 sistema completo timed + 10 tutor) · **resto = nivel 2** (40Q = 10 + 30 en bloques 5Q timed).
- Hitos (🎯): formato **nivel 5 como MEDICIÓN** (UWSA 160Q · NBME 200Q · Free 120 = 120Q), no como progresión.
- Fase B: D83-D86 **nivel 4** (2×40Q mixtos timed = 80Q) · D88-D91 **nivel 5** (incorrects + AMBOSS 200 = 80Q).
- Fase C: **nivel 5**; días sin simulacro = solo flagged/incorrects, sin preguntas nuevas (D94 40Q · D96 20Q).
- La eval de las 18:00 (10Q mixta timed) es la **dosis diaria de nivel 4** durante toda la Fase A; los stress sets 10Q/12min (nivel 5) solo en Fases B-C a las 05:00.

Distribución real generada (`gen_usmle_v5.js`, campo `nivelUW`): Fase A D1-D82 → N1×29 · N2×39 · N3×7 · N5×7 · Fase B D83-D92 → N4×4 · N5×6 · Fase C D93-D97 → N5×5 · Q objetivo acumulado del plan (`qDia`) = 5650 (incluye los simulacros). Viernes de Fase A sin hito: D10 N3, D15 N3, D25 N3, D30 N1, D40 N3, D45 N3, D55 N3, D60 N3, D70 N1 (D30 y D70 quedan en nivel 1 porque su sistema lleva <3 días: se hace el bloque de sistema completo del sistema ANTERIOR).

### Medición (Palmerton: "se mide por % ciego, no por horas")

Código: [`src/lib/usmleScores.ts`](../../src/lib/usmleScores.ts) → localStorage `jmd-usmle-scores` (try/catch) + espejo Supabase **`usmle_daily_scores`** (upsert por `fecha`, fallback silencioso; migración `usmle_daily_scores_palmerton_v3`, mismo patrón RLS/policy "Allow all" que `study_sim_scores`; DDL al final de [`supabase-schema.sql`](../../src/lib/supabase-schema.sql)). UI: tarjeta **📏 Medición del día** en Cola de hoy (`UsmleTodayPlan.tsx`), stats **MEDIA 7D** y **Δ hito** en la barra (`ReadinessBar.tsx`, solo con datos) y tabla de niveles + serie de hitos en la pestaña Readiness (`UsmleHub.tsx`).

| Campo | Qué se anota | Fase A | Fases B-C | Día de hito |
|-------|--------------|--------|-----------|-------------|
| `pretest10` | aciertos /10 | pre-test ciego 08:15 | stress set 05:00 | — |
| `consol30pct` | % del bloque | consolidación 11:00 | bloques timed del día | bloque extra (opcional) |
| `evalPct` | % timed | eval 18:00 (10Q mixta) | eval 18:00 | **% del NBME/UWSA/Free 120** |
| `tipoError` | error dominante | knowledge · transfer · proceso | ídem | ídem |
| `nivelUW` / `notas` | nivel del día (automático) + shopping list | | | |

- **Gate del día** (✓ SUBIR / ✗ REPETIR): `consol30pct ≥ 80` en Fase A (bloques timed en B-C). En día de hito: % ≥ mínimo on-track.
- **Media móvil 7 días**: ventana calendario [hoy-6, hoy] (≈5 días hábiles) de la eval timed (proxy diario del % ciego).
- **Distancia al mínimo on-track del próximo hito**: media 7d (o último hito registrado) − mínimo de la tabla de [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) Parte V-A (UWSA1 baseline · NBME 25 ≥51 · 26 ≥54 · 27 ≥57 · 28 ≥61 · 29 ≥63 · 30 ≥65 · UWSA2 low risk · 31 ≥68 GO; 32/33 se leen contra el mismo 68 y Free 120 contra ≥70 = heurística comunitaria, no cifra Palmerton).
- **Readiness** de la barra: se ancla al último hito registrado (antes era un 4% fijo). **Export JSON** desde la tarjeta (portapapeles en web / Share en móvil).
- Regla de lectura: el % de UWorld es **gate de proceso**, no predicción — solo los NBME predicen (≥65% ≈ 95% de pase, ≥70% ≈ 99%).

Divergencias técnica Palmerton ↔ plan v5.6 (resueltas y pendientes de decisión):
[`PALMERTON_DIVERGENCIAS_PLAN.md`](PALMERTON_DIVERGENCIAS_PLAN.md).

## 5. Jerarquía de material por `matType`

| matType | Material primario |
|---------|-------------------|
| path | **Pathoma** (Sattar) + First Aid |
| micro / pharm | **Sketchy** + First Aid |
| physio / biochem / anat | **AMBOSS library + B&B** + First Aid |
| behav / biostats | **First Aid** (+ UWorld Biostats Review) |

Método Palmerton transversal: comprensión fisiológica > memorización · tarjetas Anki de
MECANISMO (FSRS, retención 0.9, solo Good/Again) · pre-test ciego → active reading → free
recall → preguntas → log de errores (knowledge/transfer/proceso).
Guía por materia + método completo: [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md)
**v2 — catálogo completo**. Rol de cada recurso: [`RECURSOS_META_2026.md`](RECURSOS_META_2026.md).

## 6. Inventario Qbankly (REAL, verificado)

- **QBanks Step 1**: uWorld Step 1 2026 **3.659Q** (motor del plan) · AMBOSS **2.745Q** + plan
  81 bloques + **200 Concepts** + HY Biostats 155Q · Mehlman **7.278Q** · PassMedicine **3.846Q** ·
  USMLERx **2.150Q**.
- **Simulacros**: NBME formas **21-33** (~200Q c/u) · **UWSA 1/2/3** · Free 120.
- **Vídeos**: B&B Step 1 (22 secciones) + Sketchy (14 secciones) = **1.797 vídeos**.
- **Flashcards**: 2.180.
- **Biblioteca** (lectura): uWorld / AMBOSS / PassMedicine.
- AMBOSS además con **suscripción propia** (library + add-on Anki).
- Árbol y deep-links: [`src/lib/usmleQbanklyData.ts`](../../src/lib/usmleQbanklyData.ts) · raw en `STUDY_HUB/_scrape/qbankly_*.json`.

## 7. Ficheros canónicos (código)

| Fichero | Rol |
|---------|-----|
| [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) | **v5.6 = FUENTE DE VERDAD**: DIAS (97, con `nivelUW`/`qDia`), FRANJAS (6, con nivel/gate), DAILY_META (+`metodo`), USMLE_NIVELES, USMLE_GATE, helpers (`faseDe`, `nivelInfo`, `esHito`, `hitosDelPlan`) |
| [`src/lib/usmleStep1Plan.ts`](../../src/lib/usmleStep1Plan.ts) | Plan macro (SISTEMAS con `diaInicio` alineado a DIAS, PLAN_META) |
| [`src/lib/usmlePalmertonData.ts`](../../src/lib/usmlePalmertonData.ts) | Vídeos Palmerton (serie High Yield, IDs + duraciones reales) |
| [`src/lib/usmleQbanklyData.ts`](../../src/lib/usmleQbanklyData.ts) | Árbol Qbankly + deep-links (`library?e=<epub>&doc=<docId>`) |
| [`src/lib/usmleData.ts`](../../src/lib/usmleData.ts) | KPIs, sistemas, disciplinas, ROI, recursos, reglas del Qbank (5 niveles) |
| [`src/lib/usmleScores.ts`](../../src/lib/usmleScores.ts) | **Medición diaria** (localStorage `jmd-usmle-scores` + Supabase `usmle_daily_scores`): gate 80%, media 7d, mínimos on-track por hito, export JSON |
| [`src/lib/obsidianMap.ts`](../../src/lib/obsidianMap.ts) | `USMLE_OBS_DAY`: D# → nota madre uWorld en el vault (claves 3-81) |
| UI | `src/components/study/UsmleHub.tsx` (barra: media 7d + Δ hito; Readiness: niveles + serie de hitos) + `UsmleTodayPlan.tsx` (chip nivel · chip MIR en paralelo · 📏 Medición) + `ReadinessBar.tsx` · Home: `TodayMission.tsx` |

## 8. Docs de esta carpeta

- [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) — **v2 catálogo completo (31-ago)**:
  por materia + 5 niveles UWorld + Anki fino + test-taking/test-day + planificación NBME.
- [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md) — semana a semana S1-S20 + día a día D1-D97 + reglas de reprogramación + gates ECFMG.
- [`RECURSOS_META_2026.md`](RECURSOS_META_2026.md) — rol de cada recurso, fase, horas, qué NO usar.
- [`PALMERTON_DIVERGENCIAS_PLAN.md`](PALMERTON_DIVERGENCIAS_PLAN.md) — **técnica Palmerton → qué hace el plan v5.6 →
  divergencia → resolución aplicada / propuesta para decisión de Joseph** (5-sep-2026).
- `_palmerton_v3_extractos/` — extractos crudos v3 del cuaderno (uworld-preguntas, metodo-global, planificacion-nbme-img…).
- Cuaderno NotebookLM **"STEP 1 · Palmerton Engine"** — **~140 fuentes** (catálogo completo del
  canal, ampliado 31-ago-2026):
  [notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86](https://notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86)

> Histórico: el plan de 70 días (D1=10-jun-2026, bloque 16:15-17:15) quedó **SUPERSEDIDO** por
> la v5 el 27-ago-2026; la v5 (D1=31-ago, 102 días) pasó a **v5.3** el 31-ago (D1=mar 1-sep,
> 101 días, franja 04:15 partida → ANKI AM 05:00), a **v5.4** el 2-sep (D1=jue 3-sep, 99 días:
> ni 1-sep ni 2-sep se estudiaron; corrimiento determinista +1 por día perdido, hitos de viernes
> fijos), a **v5.5** el 3-sep (D1=vie 4-sep, 98 días: 3-sep tampoco se estudió y 1 día de
> contenido USMLE se fusionó en el re-fecheo — mismo pipeline, hitos de viernes intactos) y a
> **v5.6** el 4-sep (D1=lun 7-sep, 97 días: 4-sep tampoco se estudió — mismo pipeline, hitos de
> viernes intactos). El examen ya no es feb-2028: es **ene-2027**.
