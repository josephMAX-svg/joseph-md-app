# 🧠 FRANJA 04:15–05:45 (v5.2 · serie desde lun 31-ago-2026 · D1 efectivo lun 7-sep-2026, v5.6) — IA VIBECODING + ANKI AM

> v5.2 (27-ago, decisión Joseph): la franja se PARTE en dos. NO es un curso de programación desde
> cero — es **VIBECODING**: construir cosas reales con Claude Code como herramienta. Y la segunda
> mitad se la lleva el Step 1 (Anki de madrugada, la recomendación #1 de Palmerton).
> La serie vieja `[PAUSADO 96D] CURSO DE IA` (04:00-05:45, pisaba EKER) fue eliminada.

## 04:15–05:00 · 🧠 IA — VIBECODING con Claude Code (L-V)

- **Filosofía**: builder, no estudiante. Cada semana termina **1 proyecto real** que sirva a los
  sistemas propios. Cero teoría de sintaxis; la teoría estructurada vive en la misión SYNAPSE de
  las 12:30 (30' · desde v5.7 su F1 = el stack que el vibecoding necesita: Claude Code docs, Academy,
  Supabase, n8n) · **sábado PC 15:00-17:00 = SHIP** del proyecto de la semana · domingo = Feynman 10' opcional.
- **Currículo (v5.7, 5-sep)**: `DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md` — 12 proyectos S1-S12 (lun 7-sep →
  vie 27-nov) sembrados del backlog REAL (S1 parser APEX · S2 telemetría Anki · S3 scores USMLE · S4 revisión
  semanal · S5 remap verificado · S6 RLS datos_tesis · S7 puente VITALS · S8 motor ENCAPS (deload) · S9 overlays
  hitos · S10 bot WhatsApp→OCR · S11 contenido marcas · S12 capstone). Fuente única `vibecoding_proyectos.json`
  → `node DATA/_scripts/gen_vibecoding_plan.js <fecha>` → `src/lib/vibecodingPlan.ts` (5 pasos L-V por proyecto).
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
- **Fase A (sep-nov)**: 45' pasada principal FSRS. El bloque de 07:15 queda para el repaso anclado
  D-1/D-3/D-7 + free recall + Anki restante.
- **Fases B-C (dic-ene)**: 05:00-05:12 🔥 **STRESS SET** (10Q uWorld random en 12 min — confiar en
  el instinto, técnica anti-rumiación de Palmerton) + 05:12-05:45 Anki.
- **Con esto el Step 1 pasa de 5h30 → 6h15/día ≈ 640h totales** — colchón real para base cero.
- Al terminar el Step 1 (fin de enero), esta media franja vuelve a IA o a ENCAPS intensivo (se
  decide en la reestructuración de febrero).

## Decisión sobre las academias de Business (27-ago)

- **LIVIANO** — única academia activa hasta enero (17:15–18:00, plan de 90 días en la app).
- **CURVA** (estética/figura) y **DENSA** (capilar) — arrancan en **FEBRERO 2027** post-Step 1,
  con franja y currículo propios tipo LIVIANO_ACADEMIA.
- **NÍTIDA** — fusionada con el plan Derma élite (mismo conocimiento; duplicar = re-estudiar).
- AURUM conserva 14:15–15:15 L-V.
