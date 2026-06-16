# Reestructuración 13-jun-2026 — TODOS los planes a inicio 15-jun + domingos libres

> Pedida por Joseph el 13-jun. **Supersede** a `REESTRUCTURACION_11JUN.md`.
> Regla nueva: **TODOS los domingos quedan LIBRES** (sin actividad) en los 7 planes.
> Ningún tema se pierde (sólo se corren fechas / se reordena). Backup ENCAPS:
> tabla Supabase `study_schedule_backup_v4_20260613` (71 filas del plan v9).

## Qué cambió por plan

| Plan | Inicio nuevo | Fin nuevo | Total | Cómo |
|------|-------------|-----------|-------|------|
| USMLE Step 1 (daily) | lun 15-jun | 5-sep | 72 | re-lay L-S desde 15-jun, **todos los domingos saltados** |
| MIR (daily) | lun 15-jun | 12-sep | 78 | ídem |
| USMLE plan (UNIDADES) | lun 15-jun | — | — | 5 fechas muestra + `diaDesdeInicio` ahora salta TODOS los domingos |
| Research | mar 16-jun | 8-oct | 42 | 1er slot-research ≥15-jun (alterna con Derma, ancla 10-jun intacta) |
| Derma | lun 15-jun | 24-dic | 70 | 1er slot-derma ≥15-jun |
| Business (Estudio Pulso) | lun 15-jun | 19-sep | 97 | **RECONSTRUIDO**: 84 días de trabajo en L-S (contenido secuencial intacto) + DESCANSO total cada domingo |
| Synapse | jue 18-jun | 7-sep | 82 | generador +1 semana exacta (preserva las 70 A-units y la estructura semanal) + todos los domingos libres |
| VITALS | (recurrente L-V) | — | — | no requiere cambio de fechas; domingos ya libres |

Synapse arranca el **18-jun** (no 15) porque su contenido está atado al día de la semana
(estructura jue→dom de la semana 1 + bloques B/C/PC por semana): el desplazamiento de +1
semana exacta es el único que preserva el currículo sin desalinear. Es la opción segura;
si se quiere forzar 15-jun hay que reescribir la lógica `semana`/`bloque*` del generador.

## ENCAPS (Perú) — reconstrucción profunda (Supabase `study_schedule`) · v6 (13-jun)

- **D1 = lun 15-jun · EXAMEN jue 20-ago (tope)**. 58 días. Backup `study_schedule_backup_v4_20260613`.
- **TODOS los domingos LIBRES** (9 domingos: 21-jun … 16-ago) — `STUDY_SKIP_DATES` en `encapsPlan.ts`.
- **45 temas (deep_prime)** en L-V, mismo orden y **mismo contenido** (videos/theomed/material
  intactos — sólo se actualizó dia/fecha/weekday vía truco de offset por el PK (examen,dia)).
- **~35 SIMULACROS (sobreestimado)** — tras verificar QxMedic+Theomed por Chrome DevTools
  (inventario real en `DATA/ENCAPS_SIMULACROS_INVENTARIO.md`): QX 9 Sim Virtuales + 3 ENCAPS
  oficiales; Theomed ~8 fechados + 4 EXAMEN TIPO + oficiales; + oficiales históricos + propios.
  Distribuidos en **12 días-examen**: 9 sábados (20-jun→15-ago, 2-3 c/u) + días-examen
  **exam-only 17/18/19-ago** (3-4 c/u). Cada slot = ✓ chequeable (`extra.sims[]`).
- **Exámenes SÓLO sábados** (+ los días-examen finales) — L-V = aprender, domingos libres.
- **Motor de vueltas** (`REPASO_POR_PRIORIDAD`): intervalo máximo bajado de 63→**50** para
  que la última vuelta caiga ANTES del examen (CRÍTICA 6 · ALTA 5 · MEDIA 4 · BAJA 3).
- `itemsForDay` actualizado: renderiza cada simulacro de `extra.sims[]` (keys `D{N}:sim:{i}`).
- Verificado: 58 filas · 45 temas (45 códigos, 0 perdidos) · 35 simulacros en 12 días ·
  examen 20-ago · 0 domingos · dia↔fecha 100% coherente con `diaActual` · tsc limpio.

⚠ **Ancla del examen**: el plan v9 tenía "fijo 10-ago". Joseph eligió **tope 20-ago**. Pero las
plataformas sueltan simulacros (QX N°09) hasta el **23-ago** y banco oficial hasta el **26-ago**
→ la evidencia sugiere que el examen MINSA real es a **fin de agosto**. Si se confirma después
del 20-ago, extender es 1 comando (backup v4). Generadores: `gen_encaps_remap_15jun.sql.js`
(temas) + `gen_encaps_sims_v6.sql.js` (35 simulacros).

## Scripts (re-ejecutables)
- `DATA/_scripts/remap_inicio_15jun.js` — remapea los 6 planes en archivo (USMLE×2, MIR,
  Research, Derma, Business). ONE-SHOT sobre el estado 11-jun; no re-ejecutar dos veces.
- `DATA/_scripts/gen_synapse_plan.js` — regenera Synapse (START=18-jun, todos los domingos libres).
- `DATA/_scripts/gen_encaps_remap_15jun.sql.js` → emite `_encaps_remap_15jun.sql` (aplicado a Supabase).
