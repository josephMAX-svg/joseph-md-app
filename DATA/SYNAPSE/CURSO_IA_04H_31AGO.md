# 🧠 FRANJA 04:15–05:45 (v5.2 · serie desde lun 31-ago-2026 · D1 efectivo VIE 11-SEP-2026, v5.9) — IA VIBECODING + ANKI AM

> **v5.9 (10-sep-2026):** el 10 de septiembre tampoco se estudió → D1 efectivo = **vie 11-sep-2026**
> (octavo corrimiento, 31-ago→11-sep). Regla de este corrimiento: **no se fusiona ni se recorta nada**; el
> desfase se absorbe alargando el final. La franja, el reparto 45'+45' y las metas NO cambian; solo se
> re-fecharon los planes: **vibecoding 60 días (11-sep → jue 3-dic-2026, 12 SHIP en sábados 19-sep → 5-dic —
> los SHIP NO se movieron, van por el 8.º corrimiento seguido intactos)** y **SYNAPSE 82 días
> (11-sep → mar 1-dic-2026)**. El Anki AM sigue hasta el examen (semana 25-29 ene 2027; el plan Step 1 llega
> a **D95 = mar 26-ene-2027**). Fechas leídas con node de `vibecodingPlan.ts` / `synapseDailyPlan.ts` /
> `usmleStep1Daily.ts`, no estimadas.
>
> v5.2 (27-ago, decisión Joseph): la franja se PARTE en dos. NO es un curso de programación desde
> cero — es **VIBECODING**: construir cosas reales con Claude Code como herramienta. Y la segunda
> mitad se la lleva el Step 1 (Anki de madrugada, la recomendación #1 de Palmerton).
> La serie vieja `[PAUSADO 96D] CURSO DE IA` (04:00-05:45, pisaba EKER) fue eliminada.

## 04:15–05:00 · 🧠 IA — VIBECODING con Claude Code (L-V)

- **Filosofía**: builder, no estudiante. Cada semana termina **1 proyecto real** que sirva a los
  sistemas propios. Cero teoría de sintaxis; la teoría estructurada vive en la misión SYNAPSE de
  las 12:30 (30' · desde v5.7 su F1 = el stack que el vibecoding necesita: Claude Code docs, Academy,
  Supabase, n8n) · **sábado PC 15:00-17:00 = SHIP** del proyecto de la semana · domingo = Feynman 10' opcional.
- **Currículo (v5.9, re-fechado 10-sep)**: `DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md` — 12 proyectos S1-S12
  (**vie 11-sep → jue 3-dic-2026**, 5 pasos L-V cada uno; SHIP en los sábados **19-sep → 5-dic**, los mismos 12 de v5.7/v5.8) sembrados del backlog REAL (S1 parser APEX · S2 telemetría Anki · S3 scores USMLE · S4 revisión
  semanal · S5 remap verificado · S6 RLS datos_tesis · S7 puente VITALS · S8 motor ENCAPS (deload) · S9 overlays
  hitos · S10 bot WhatsApp→OCR · S11 contenido marcas · S12 capstone). Fuente única `vibecoding_proyectos.json`
  → `node DATA/_scripts/gen_vibecoding_plan.js <fecha>` → `src/lib/vibecodingPlan.ts` (5 pasos L-V por proyecto).
  ⚠ **v5.9:** con D1 en viernes la semana de cada proyecto va de **vie a jue**, así que su SHIP cae el
  **sábado siguiente** al fin de sus 5 pasos, a un solo día del último paso (en v5.8, con la semana jue→mié,
  había 2 días de hueco). Los sábados de SYNAPSE llevan el rótulo correcto (`SHIP proyecto Sn` alineado con
  `VIBE_PROYECTOS.ship`, verificado el 10-sep: S1 vie 11-sep→jue 17-sep · SHIP sáb 19-sep … S11 vie 20-nov→jue
  26-nov · SHIP sáb 28-nov), y el **SHIP S12 (sáb 5-dic-2026) sigue cayendo fuera del plan SYNAPSE**, que
  termina el mar 1-dic-2026 (último sábado: 28-nov). Manda `VIBE_PROYECTOS.ship`.
- **En la app**: bloque 04:15 de MISIÓN DE HOY = paso del día + docs ↗; el ✓ diario vive en SYNAPSE → ⚡ run
  (PlanKey `vibecoding`, `studyProgress.ts`); KPI "ship 04:15 N/12" en el hub. Se mide por entregable
  (commit / URL viva / test verde), nunca por tiempo sentado. Ritual de cierre: sáb 07:15 revisión semanal
  (`DATA/REVISION_SEMANAL.md`, métrica 7 = proyecto shipped sí/no).
- **Ciclo diario (45')**: 5' definir el objetivo → 35' construir con Claude Code → 5' commit +
  nota de lo aprendido en `synapse-journal`.
- **Rotación semanal de proyectos** (repite subiendo nivel):
  1. Automatización YoCPMD (skills, hooks, generadores de planes)
  2. Pipeline de preguntas ENCAPS/USMLE (motor de preguntas semiautomático)
  3. Bots CRM Pulso / LIVIANO (WhatsApp → OCR → ficha)
  4. Contenido IA para las marcas (guiones, clips, thumbnails)
- **Stack a dominar por USO**: Claude Code (skills · MCP · subagentes · workflows · Agent SDK),
  Supabase, n8n, APIs. Fuente: docs.claude.com + los repos propios.

## 05:00–05:45 · 🇺🇸 USMLE — ANKI AM (L-V, hasta 29-ene)

- **Por qué**: Palmerton — "Anki a primera hora con mente fresca = el doble de tarjetas en menos
  tiempo". Para noviembre el mazo tendrá 2.000+ tarjetas y los 60' de las 07:15 no alcanzarían.
- **Fase A (sep-ene, D1-D80 = 11-sep-2026 → 5-ene-2027)**: 45' pasada principal FSRS. El bloque de 07:15 queda para el repaso anclado
  D-1/D-3/D-7 + free recall + Anki restante.
- **Fases B-C (ene, B = D81-D88 6→15-ene · C = D89-D95 18→26-ene-2027)**: 05:00-05:12 🔥 **STRESS SET** (10Q uWorld random en 12 min — confiar en
  el instinto, técnica anti-rumiación de Palmerton) + 05:12-05:45 Anki.
- **Con esto el Step 1 pasa de 5h30 → 6h15/día ≈ 640h totales** — colchón real para base cero.
- Al terminar el Step 1 (fin de enero), esta media franja vuelve a IA o a ENCAPS intensivo (se
  decide en la reestructuración de febrero).

## Decisión sobre las academias de Business (27-ago)

- **LIVIANO** — única academia activa hasta enero (17:15–18:00, plan de 90 días en la app: **11-sep-2026 → mar 19-ene-2027**).
- **CURVA** (estética/figura) y **DENSA** (capilar) — arrancan en **FEBRERO 2027** post-Step 1,
  con franja y currículo propios tipo LIVIANO_ACADEMIA.
- **NÍTIDA** — fusionada con el plan Derma élite (mismo conocimiento; duplicar = re-estudiar).
- AURUM conserva 14:15–15:15 L-V.
