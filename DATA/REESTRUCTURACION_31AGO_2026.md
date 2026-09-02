# REESTRUCTURACIÓN MASIVA · D1 = JUEVES 3-SEP-2026 (v5.4)

> **Corrimientos:** 31-ago, 1-sep y 2-sep no se estudiaron → TODO corrió a D1 = jue 3-sep (regla
> determinista: cada día sin estudiar = +1 hábil). USMLE = **99 días** (fases D1-84 / 85-94 / 95-99)
> · ENCAPS = **104 días** (Supabase re-sembrado, backup `study_schedule_bk_0902`) ·
> MIR/Research/Derma/Business/LIVIANO/SYNAPSE/AURUM re-fechados. Los HITOS UWSA/NBME se quedaron
> en sus VIERNES originales (no se movieron; 2 días de contenido fusionados para absorberlo).
> El 31-ago se amplió el cuaderno NotebookLM "STEP 1 · Palmerton Engine" de 25 a ~140 fuentes
> (catálogo completo del canal) y la guía PALMERTON_POR_MATERIA pasó a v2. El 2-sep se corrió una
> verificación total (frontend build, backend Supabase, deploy, temas citados, Calendar) — ver §7.

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

## 1 · USMLE Step 1 — plan v5.4 MAESTRO (99 días)

- **Fuente de verdad:** `src/lib/usmleStep1Daily.ts` (v5.4). Docs: `DATA/USMLE/README.md`,
  `PALMERTON_POR_MATERIA.md` (v2, catálogo completo), `CALENDARIO_5_MESES.md`, `RECURSOS_META_2026.md`.
- **Fases:** A contenido D1-D84 (3-sep→30-dic, ~40Q uWorld/día = 1ª vuelta completa del banco 3659Q) ·
  B banco intensivo D85-D94 (4→15-ene) · C sprint D95-D99 (18→22-ene).
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
  (`node DATA/_scripts/remap_inicio.js <fecha>` — L-V + feriados, 99 días USMLE, re-fecha también
  MIR/Research/Derma/Business/LIVIANO y re-slotea los casos LIVIANO a viernes; aparte:
  `gen_encaps_mantenimiento_2027.js <fecha>` → execute_sql, `gen_synapse_plan.js <fecha>`,
  `gen_aurum_plan.js <fecha>`). Los hitos USMLE están anclados a fechas: si se corre, migrar los
  overlays del Calendar o aceptar que caigan en otro día de la semana.

## 2 · ENCAPS — mantenimiento 2027-I (1h/día)

- **Supabase re-sembrado:** 104 días L-V (3-sep→29-ene) en `study_schedule`, modo `MANTENIMIENTO`
  (backups: `study_schedule_bk_0827` → `bk_0831` → `bk_0902`). Generador:
  `DATA/_scripts/gen_encaps_mantenimiento_2027.js <fecha>`.
- **Rotación de 4 semanas** ponderada por el **PRONÓSTICO WALK-FORWARD v3**
  (`DATA/ENCAPS/PRONOSTICO_WALKFORWARD_2027-1_v3.md`, construido con los 7 exámenes reales
  2024-II→2026-II): vector **II 30 · I 27 · V 21 · III 13 · IV 9** · 8 críticos
  **I-3 · V-2 · II-3 · III-5 · I-4 · II-5 · II-4 · IV-1/2** (+ ALTA con flag de rebote: II-1, II-11, II-8).
  I-3 y V-2 caen 2× por ciclo (11 sesiones c/u).
- **Estructura del día (16:15-17:15):** eval anclada 5Q del tema de ayer (15') → banco del día
  20-25Q ciegas (40') → registro TRACKING_ERRORES + ≤3 APEX (5'). **Viernes: mini-simulacro 25Q
  mixto 72s/Q** (20 en total).
- **Lección del 2026-II** (el pronóstico v2 tuvo su mejor fold, MAE 3.2pp, PERO Investigación saltó
  4→12): el área IV ya nunca va a piso — por eso IV-1/2 es crítico condicional en la rotación.
- App: `src/lib/encapsPlan.ts` v6.2 (D1=3-sep, 104 días, skip fines de semana + feriados, rama compacta
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
  70 átomos interdiarios (3-sep→18-mar-2027, salta feriados) sobre AccessDermatology real — 200 casos visuales ciegos +
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
  Plan diario re-fechado (D1 vie 4-sep → 4-ene-2027 por paridad interdiaria con Derma, que toma el jue 3-sep).

## 5 · Qué se re-fechó en la app (remap 31-ago, L-V)

USMLE 102d (31-ago→22-ene) · MIR 78d (31-ago→16-dic, contenido intacto) · Research 42
slots (→23-dic) · Derma 70 slots (1-sep→12-mar) · Business 118 filas = 84 trabajo + 34 DESCANSO
sáb/dom (3-sep→29-dic, sin feriados) · LIVIANO 90d L-V (3-sep→11-ene, salta 25-dic/31-dic/1-ene) ·
SYNAPSE 82d regenerado (`gen_synapse_plan.js 2026-09-03`: 3-sep→23-nov, dom libres, sáb A/B/C+PC) ·
AURUM 130d L-V regenerado (`gen_aurum_plan.js 2026-09-03`: 3-sep→3-mar-2027, sin feriados).
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

## 6 · NotebookLM

Cuaderno nuevo **"STEP 1 · Palmerton Engine (método + sistemas)"** — 25 videos del canal
(10 de método + 15 High-Yield) procesados y consultables:
https://notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86
