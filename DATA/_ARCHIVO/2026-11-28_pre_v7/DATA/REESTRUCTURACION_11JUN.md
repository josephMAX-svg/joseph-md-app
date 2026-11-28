# Reestructuración global — todo arranca el JUEVES 11-jun-2026

> Pedida por Joseph el 10-jun-2026 ("hoy no avanzamos: estuvimos programando la app").
> Regla de oro: **ningún tema/subtema se pierde — solo se corren**. Los domingos
> **14-jun y 21-jun-2026 quedan SIN ACTIVIDAD** en TODOS los planes (Día del Padre /
> actividades familiares). Los demás sábados/domingos siguen normales (28-jun en adelante).
> +2 días colchón al final de cada plan cuyo final es movible.

## Estado por plan (después del remapeo)

| Plan | Archivo/fuente | D1 | Fin | Total | Notas |
|------|----------------|----|----|-------|-------|
| **ENCAPS** 🇵🇪 | Supabase `study_schedule` (examen='ENCAPS') + `encapsPlan.ts` | jue 11-jun | 22-ago | 71 | **EXAMEN FIJO lun 10-ago** (inamovible, d59). Sáb 13/20/27-jun = estudio; sims desde dom 28-jun (SIM#1) — siempre en finde; SIM#15 MEGA sáb 8-ago; el dom 9-ago un solo "Simulacro libre (capacidad ×4)" absorbe los 4 placeholders v3; los 3 sobrantes son ahora COLCHÓN post-cierre 20-22 ago. Backup: tabla `study_schedule_backup_v3_20260610`. `diaActual()` descuenta los 2 días libres (`STUDY_SKIP_DATES`). |
| **MIR** 🇪🇸 | `src/lib/mirDailyPlan.ts` | jue 11-jun | 29-ago | 78 | 76 temas intactos en orden + colchón d77/d78 (28/29-ago). |
| **USMLE** 🇺🇸 | `src/lib/usmleStep1Daily.ts` (+ `usmleStep1Plan.ts` UNIDADES) | jue 11-jun | 23-ago | 72 | 70 temas intactos + colchón d71/d72 (22/23-ago). `diaDesdeInicio()` descuenta los días libres. |
| **Derma** 💎 | `src/lib/dermaDailyPlan.ts` | jue 11-jun | 22-dic | 70 | Fechas YA eran correctas (interdiario hábil, findes descanso → 14/21 nunca tuvieron carga). Solo +2 colchón (18/22-dic). |
| **Research** 🔬 | `src/lib/researchDailyPlan.ts` | **vie 12-jun** | 6-oct | 42 | El 10-jun (D1 v1) no se estudió → cada átomo corre al siguiente slot-research. La alternancia con Derma se mantiene con ancla de paridad 10-jun (hábil par=Research, impar=Derma): Derma jue 11, Research vie 12, Derma lun 15… +2 colchón (2/6-oct). |
| **Business (Estudio Pulso)** 💼 | `src/lib/businessStudyPlan.ts` | jue 11-jun | 16-sep | 98 | Corrido **+14 días exactos** (jue→jue): el ritmo semanal queda INTACTO y los DESCANSO dominicales caen solos en 14-jun y 21-jun (ahora "DÍA LIBRE TOTAL", min 0). 96 días de contenido idénticos + colchón d97/d98 (15/16-sep). |
| **SYNAPSE** 🧠 | `src/lib/synapseDailyPlan.ts` (regenerado con `gen_synapse_plan.js`, START=11-jun) | jue 11-jun | 31-ago | 82 | 14/21-jun son filas BLOQUEADAS sin misión (estilo propio del generador). Misma secuencia de lecciones, corrida +1. |
| **VITALS** 🫀 | motor semanal propio (`VITALS/`) | — | — | — | Plan semanal recurrente (L-V), domingos sin actividad → nada que reestructurar. |

## Lógica corregida (clave para futuros cambios)
- `studyProgress.planHoyD()`: en fecha-hueco (14/21-jun) devuelve el **SIGUIENTE** día del
  plan (antes saltaba al último — bug).
- `encapsPlan.diaActual()` y `usmleStep1Plan.diaDesdeInicio()`: descuentan las fechas de
  `STUDY_SKIP_DATES` / los días libres al contar.
- Ancla de alternancia Research↔Derma (`researchData.diaEstudioTipo`): **queda en 10-jun**
  (solo define paridad; NO es día de estudio).

## Cómo se hizo (reproducible)
- `DATA/_scripts/remap_inicio_11jun.js` — remapeo posicional de fechas (contenido byte a
  byte intacto) + colchones + METAs, con aserciones. Ya ejecutado; NO re-ejecutar (las
  aserciones de conteo fallarían — está diseñado para correr una sola vez sobre v1).
- ENCAPS: layout calculado y verificado (continuidad, unicidad, sims-solo-finde,
  dia↔fecha consistente con diaActual) y aplicado por SQL con backup previo.
- Verificación: tsc limpio · build OK · check_links 113/113 · auditoría adversarial de
  7 agentes (1 por plan) sobre invariantes vs git HEAD y vs backup de Supabase.
