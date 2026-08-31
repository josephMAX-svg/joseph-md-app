# REESTRUCTURACIÓN MASIVA · D1 = MARTES 1-SEP-2026 (v5.3)

> **Corrimiento del 31-ago:** el lun 31-ago no se estudió → TODO corrió +1 día hábil (regla
> determinista). USMLE = 101 días (D1 mar 1-sep) · ENCAPS = 106 días (Supabase re-sembrado,
> backup `study_schedule_bk_0831`) · MIR/Research/Derma/Business/LIVIANO re-fechados. Los HITOS
> UWSA/NBME se quedaron en sus VIERNES originales (no se movieron). El mismo día se amplió el
> cuaderno NotebookLM "STEP 1 · Palmerton Engine" de 25 a ~140 fuentes (catálogo completo del canal)
> y la guía PALMERTON_POR_MATERIA pasó a v2.

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

## 1 · USMLE Step 1 — plan v5 MAESTRO (102 días)

- **Fuente de verdad:** `src/lib/usmleStep1Daily.ts` (v5). Docs: `DATA/USMLE/README.md`,
  `PALMERTON_POR_MATERIA.md`, `CALENDARIO_5_MESES.md`, `RECURSOS_META_2026.md`.
- **Fases:** A contenido D1-D87 (31-ago→30-dic, ~40Q uWorld/día = 1ª vuelta completa del banco 3659Q) ·
  B banco intensivo D88-D97 (4→15-ene) · C sprint D98-D102 (18→22-ene).
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
  (`node DATA/_scripts/remap_inicio.js <fecha>` — ya adaptado a L-V y 102 días).

## 2 · ENCAPS — mantenimiento 2027-I (1h/día)

- **Supabase re-sembrado:** 107 días L-V (31-ago→29-ene) en `study_schedule`, modo `MANTENIMIENTO`
  (backup previo: `study_schedule_bk_0827`). Generador: `DATA/_scripts/gen_encaps_mantenimiento_2027.js`.
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
- App: `src/lib/encapsPlan.ts` v6 (D1=31-ago, 107 días, skip fines de semana, rama compacta
  `MANTENIMIENTO` en `itemsForDay`).

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
  70 átomos interdiarios (1-sep→12-mar) sobre AccessDermatology real — 200 casos visuales ciegos +
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
  Plan diario re-fechado (31-ago→23-dic, interdiario con Derma).

## 5 · Qué se re-fechó en la app (remap 31-ago, L-V)

USMLE 102d (31-ago→22-ene) · MIR 78d (31-ago→16-dic, contenido intacto) · Research 42
slots (→23-dic) · Derma 70 slots (1-sep→12-mar) · Business 84 trabajo + descansos de finde (→24-dic).
`remap_inicio.js` ahora salta sáb+dom+feriados (25-dic, 31-dic, 1-ene) en TODOS los planes.

## 6 · NotebookLM

Cuaderno nuevo **"STEP 1 · Palmerton Engine (método + sistemas)"** — 25 videos del canal
(10 de método + 15 High-Yield) procesados y consultables:
https://notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86
