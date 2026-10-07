# v6.00 · Reestructuración anual definitiva (6-oct-2026)

Receta completa del régimen v6.00 (D1 = mié 7-oct-2026 · Step 1 hasta el 30-dic · ENCAPS intensiva 4-ene → 12-mar con examen dom 14-mar PROVISIONAL · reinicio del Step 1 mar 16-mar · SERUMS ~lun 3-may con turno variable · examen Step 1 lun 27-sep-2027).

| Fichero | Qué es |
|---|---|
| `V6_ESPEC.md` | Especificación ejecutable r2 (§0 números · §A calendario/protegidos · §B USMLE · §C ENCAPS · §D MIR · §E secundarios · §F app · §G Google Calendar · §H lotes y verificaciones V1-V7 · **§I disparadores: qué se regenera cuando salga la convocatoria del ENCAPS, el inicio real del SERUMS o un NO-GO**). |
| `PROPUESTA_V6.md` | Propuesta de diseño que Joseph aprobó (decisiones DJ-1…DJ-4). |
| `espec/` | Scripts de cálculo de solo lectura: `node a_tabla.js` reproduce la tabla de escenarios del ENCAPS (§A5) y la fecha del Step 1 a reservar; `SERUMS=2027-05-06 node a_tabla.js` la sensibilidad; `b_horas.js` el presupuesto de horas (§B4); `gen_tramo2_ref.js` el tramo 2 de referencia; `v1_check.js` la verificación V1 (multiset). Ejecutar desde esta carpeta. |

- La especificación se escribió en el scratchpad de la sesión: donde dice `v600/…` o `v600/espec/…`, léase esta carpeta (`DATA/_v600/…`).
- La fuente única de fechas NO está aquí: es `DATA/_scripts/_fechas_v6.json` → `node DATA/_scripts/gen_fechas_v6.js` → `src/lib/fechasV6.ts` (generado).
- La referencia de verificación del tramo 2 que usan los generadores vive en `DATA/_scripts/usmle/ref_v6/` (copia congelada de `dias_v520.json`).
