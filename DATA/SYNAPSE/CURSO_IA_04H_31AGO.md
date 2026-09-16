# 🧠 FRANJA 04:15–05:45 (v5.2 · serie desde lun 31-ago-2026 · D1 efectivo JUE 17-SEP-2026, v5.13) — IA VIBECODING + ANKI AM

> **v5.13 (16-sep-2026):** el mié 16 de septiembre tampoco se estudió → D1 efectivo = **jue 17-sep-2026**
> (duodécimo corrimiento, 31-ago→17-sep). Regla de este corrimiento: **no se fusiona ni se recorta nada**; el
> desfase se absorbe alargando el final. La franja, el reparto 45'+45' y las metas NO cambian; solo se
> re-fecharon los planes: **vibecoding S1-S12 = 12 bloques de 5 hábiles (jue 17-sep → mié 9-dic-2026; con D1 en jueves cada
> bloque va jue→mié y el SHIP cae el sábado siguiente: 26-sep → 12-dic — los mismos sábados que en v5.11 y v5.12) + taper
> S13-S20 = bloques SECUENCIALES de `pasos.length` hábiles (jue 10-dic → lun 1-feb-2027; 95 días en total = los del Step 1, d == D#; ningún paso perdido)** y
> **SYNAPSE 132 días · 19 semanas (jue 17-sep-2026 → mar 26-ene-2027; 110 A-units intactas: F0 45 · F1 24 · F2 41; sem 1 = 17-20 sep, corta; F2 sem 13-19)**. ⚠ **El Step 1 termina el lun 1-feb (D95 = D-1 dentro del plan; D94 vie 29-ene = última sesión de banco) → examen target MAR 2-FEB-2027**, fuera de la ventana 25-29 ene; sáb 30 y dom 31-ene libres (solo Anki vencido). El Anki AM sigue hasta el lun 1-feb (sesión mínima) y el finde solo lo vencido. Fechas leídas con node de `vibecodingPlan.ts` / `synapseDailyPlan.ts` /
> `usmleStep1Daily.ts` el 16-sep, no estimadas. ⚠ Con D1 en jueves, la **última A-unit de SYNAPSE (d132) cae el MARTES 26-ene**, dentro de la última semana de banco del plan Step 1 (D91; v5.12: lun 25-ene; v5.11: sáb 23-ene; v5.10: vie 22-ene): **decisión de Joseph** si se mantiene o se adelanta al viernes 22 (`PENDIENTES_JOSEPH.md`).
> *(v5.12, 15-sep: D1 mié 16-sep · vibecoding mié 16-sep → mar 8-dic, SHIP 26-sep → 12-dic · taper 9-dic → 29-ene · SYNAPSE mié 16-sep → lun 25-ene, 132 días, F0 46 · F1 24 · F2 40. v5.11, 14-sep: D1 mar 15-sep · vibecoding mar 15-sep → lun 7-dic, SHIP 26-sep → 12-dic · taper 8-dic → 28-ene · SYNAPSE mar 15-sep → sáb 23-ene, 131 días. v5.10, 12-sep: D1 lun 14-sep · vibecoding lun 14-sep → vie 4-dic, SHIP 19-sep → 5-dic · taper 7-dic → 27-ene · SYNAPSE lun 14-sep → vie 22-ene.)*
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
- **Currículo (v5.10-b, RE-SECUENCIADO el 12-sep con lo ya construido; re-fechado a v5.12 el 15-sep)**: `DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md` — 12 proyectos S1-S12
  (**jue 17-sep → mié 9-dic-2026**, 5 pasos hábiles cada uno en bloques jue→mié; SHIP en los sábados **26-sep → 12-dic**) ordenados por
  **riesgo para el Step 1** y hechos SOLO de trabajo real pendiente (lo ya construido por agentes —parser APEX v2.5.1 +
  test 13/13, `usmleScores.ts`, `anki_telemetria.js` v1, `gen_revision_semanal.js` v1, `plan_checks.sql`,
  `verify_vibecoding.js`, `journal_hoy.js`— se da por hecho y cada proyecto lo COMPLETA o lo pone en producción):
  **S1** APEX end-to-end (redeploy n8n + 1 APEX USMLE íntegro en Anki y vault + ruteo por subtema) · **S2** Anki sync + KPI
  "1ª review del día" · **S3** espejo Supabase del progreso (`plan_checks`) + exportar/importar · **S4** verify + revisión
  semanal cerrada (≥8/10 métricas reales) · **S5** puente VITALS sueño/agua → revisión · **S6** RLS `datos_tesis` + auditoría de
  tablas sin RLS · **S7** motor de preguntas ENCAPS desde el stock del banco propio (proyecto con flag `deload`: en v5.13 corre **jue 29-oct → mié 4-nov**, tres días
  por detrás de la semana DELOAD post-NBME 26 del 26-30 oct — el lun 26, el mar 27 y el mié 28-oct son los días 3.º-5.º de S6) · **S8** pool MIR (cuadernillos 2022-2026: clasificación verificada + UI 10Q) ·
  **S9** migrador de overlays de hitos (USMLE + Research) · **S10** bot WhatsApp→OCR LIVIANO · **S11** pipeline de contenido de
  marcas · **S12** capstone + README. Fuente única `vibecoding_proyectos.json` → `node DATA/_scripts/gen_vibecoding_plan.js
  <fecha>` → `src/lib/vibecodingPlan.ts`. Cada proyecto lleva **4 criterios de aceptación mecánicos** (`verificacion[]`: git ·
  test · url · supabase · fichero · manual) y la convención de commit **`[S<n>] …`**.
- **Taper S13-S20 (mié 9-dic-2026 → vie 29-ene-2027, 35 días; el día d del vibecoding = D# del Step 1, 95 en total; desde v5.11 son bloques SECUENCIALES de `pasos.length` hábiles, ningún paso perdido)**:
  S13 9-15 dic · S14 16-22 dic · S15 23-29 dic (4 pasos, 25-dic libre) · S16 30-dic → 5-ene (3 pasos; 31-dic y 1-ene libres) = **mantenimiento ≤15'/día** con flag deload (sensores verdes: `node DATA/_scripts/verify_vibecoding.js
  --sensores` · 1 mejora pequeña · retro) y el resto del bloque = journal + lectura de docs; S17 6-12 ene · S18 13-19 ene · S19 20-26 ene · S20 27-29 ene (Fases B-C)
  = **deload total**: journal 5' + audio, PC sáb/dom opcional (30' máx, solo VERDE); S20 = cierre del plan (jue 28 · vie 29-ene · lun 1-feb = D93-D95,
  vie 29 = última sesión de banco del Step 1; sáb 30 y dom 31 libres; lun 1-feb = D-1 (journal 5'); mar 2-feb EXAMEN). Ningún proyecto nuevo; la decisión de febrero (IA vs ENCAPS intensivo) sigue intacta.
- **⛔ FRENO 04:55 (regla dura)**: **04:55 commit-or-stash OBLIGATORIO** (`git commit` si compila, `git stash` si no) ·
  **05:00 Anki sin excepción** (recomendación #1 de Palmerton) · **si el día se recorta, pierde el proyecto, NUNCA el Anki**.
  Sensores: la tarjeta 04:15 de MISIÓN DE HOY muestra la cuenta atrás ("commit-or-stash en m:ss" → "COMMIT OR STASH · Anki
  05:00 en m:ss") y `anki_telemetria.js` v2 registra la **hora de la 1ª review de Anki del día** (`primeraReview`: ≤05:10 verde ·
  >05:10 ámbar · sin review L-V rojo) para la revisión semanal.
- **SHIPPED no es auto-reporte**: el sábado PC se corre `node DATA/_scripts/verify_vibecoding.js <n>` (comprueba los 4 criterios
  → `DATA/SYNAPSE/_vibecoding_ship.json`); la app muestra el último verify en la tarjeta del proyecto y el KPI "ship 04:15
  (verify) N/12" del hub. El ✓ manual (PlanKey `vibecoding`) solo cuenta días.
- **En la app**: bloque 04:15 de MISIÓN DE HOY = paso del día + docs ↗ + 📓 journal + cuenta atrás; el ✓ diario vive en SYNAPSE →
  ⚡ run (`studyProgress.ts`). Ritual de cierre: sáb 07:15 revisión semanal (`DATA/REVISION_SEMANAL.md`, métrica 7 = shipped
  según verify) o el domingo dentro del bloque SYNAPSE (Feynman 5' + 20' revisión).
- **Ciclo diario (45')**: 5' definir el objetivo → 35' construir con Claude Code → 5' entrada en el **journal**
  (`D:/synapse-journal/journal/<semana ISO>.md`, la crea `node DATA/_scripts/journal_hoy.js [--abrir]`: objetivo · qué
  construí · commit/URL · qué aprendí · % del código que entiendo · bloqueo · freno 04:55 · 1ª review). Remoto privado:
  `gh repo create synapse-journal --private --source=D:/synapse-journal` (lo crea Joseph).
- **Rotación de proyectos** (repite subiendo nivel): `yocpmd` automatización YoCPMD (sensores, sync, generadores, skills,
  hooks) · `preguntas` pipeline de preguntas ENCAPS/USMLE/MIR · `bots` CRM Pulso / LIVIANO · `contenido` IA para las marcas.
- **Stack a dominar por USO**: Claude Code (skills · MCP · subagentes · workflows · Agent SDK),
  Supabase, n8n, APIs. Fuente: docs.claude.com + los repos propios.
- **SYNAPSE 12:30 sem 13-19 (lun 7-dic → mar 26-ene)**: Anthropic Academy restante + prep CCA-F (F2 del motor, 51 días, 41 A-units; sem 17-19
  deload; la última A-unit cae el mar 26-ene, D91 del Step 1 — A DECIDIR si se adelanta al vie 22-ene). La página oficial del examen CCA-F no aparece enlazada en academy.claude.com ni en anthropic.skilljar.com
  (verificado 12-sep): **A VERIFICAR** antes de fijar fecha (post-Step 1, feb-2027).

## 05:00–05:45 · 🇺🇸 USMLE — ANKI AM (L-V, hasta el lun 1-feb = D95 = D-1, sesión mínima; sáb 30 y dom 31-ene solo vencido; examen mar 2-feb)

- **Por qué**: Palmerton — "Anki a primera hora con mente fresca = el doble de tarjetas en menos
  tiempo". Para noviembre el mazo tendrá 2.000+ tarjetas y los 60' de las 07:15 no alcanzarían.
- **Fase A (sep-ene, D1-D81 = 17-sep-2026 → mar 12-ene-2027)**: 45' pasada principal FSRS. El bloque de 07:15 queda para el repaso anclado
  D-1/D-3/D-7 + free recall + Anki restante.
- **Fases B-C (ene, B = D82-D84 13→15-ene · C = D85-D95 18-ene→1-feb-2027)**: 05:00-05:12 🔥 **STRESS SET** (10Q uWorld random en 12 min — confiar en
  el instinto, técnica anti-rumiación de Palmerton) + 05:12-05:45 Anki.
- **Con esto el Step 1 pasa de 5h30 → 6h15/día ≈ 640h totales** — colchón real para base cero.
- Al terminar el Step 1 (fin de enero), esta media franja vuelve a IA o a ENCAPS intensivo (se
  decide en la reestructuración de febrero).

## Decisión sobre las academias de Business (27-ago)

- **LIVIANO** — única academia activa hasta enero (17:15–18:00, plan de 90 días en la app: **jue 17-sep-2026 → lun 25-ene-2027**, v5.13; ⚠ sus 16 casos siguen en los mismos viernes que en v5.12 y el caso integral (vie 22-ene, D89) cae después del capstone (D88) y antes de la trimestral II (D90) — ver `DATA/BUSINESS/LIVIANO_ACADEMIA.md`).
- **CURVA** (estética/figura) y **DENSA** (capilar) — arrancan en **FEBRERO 2027** post-Step 1,
  con franja y currículo propios tipo LIVIANO_ACADEMIA.
- **NÍTIDA** — fusionada con el plan Derma élite (mismo conocimiento; duplicar = re-estudiar).
- AURUM conserva 14:15–15:15 L-V.
