# v6.00 · Reestructuración anual definitiva (6-oct-2026) · + ADDENDUM v6.01 (10-oct-2026)

> ## ✅ ADDENDUM v6.01 (sáb 10-oct-2026) — corrimiento al LUN 12-OCT-2026; manda sobre las cifras de F1/ENCAPS/secundarios de la receta v6.00
> El 7, 8 y 9-oct no se estudiaron → D1 = **lun 12-oct-2026**. Se aplicó la regla de colchón de F1 de la espec (§B1/§B7.1), sin alargar la F1:
> - **F1 = 57 hábiles, D1-D57, lun 12-oct → mié 30-dic** (v6.00: 60, D1-D60). **C1/C2 consumidos**; la fila 58 (bioestadística, ex-D79) **pasa al tramo 2: T3
>   jue 18-mar-2027** (`--f1-filas 57`, `escenario.pendientesF1 = [58]`). Hitos F1: UWSA1 lun 12-oct · NBME 25 vie 23-oct · 26 vie 13-nov · 27 vie 4-dic · 28
>   lun 28-dic · gates D18 mié 4-nov / D38 mié 2-dic. Tramo 2: mismas 158 filas y fechas; **colchón 38 filas (≈ 100 h)**.
> - **ENCAPS:** F1 `dia` 1-57 (47 banqueo + 10 mini-sims; checkpoint = mini-sim 50, vie 18-dic) · intensiva **`dia` 58-107** (mismas fechas; pre-test vie 8-ene =
>   dia 62) · 3 pendientes F1 repuestos en el carril B (17-feb, 18-feb, lun 22-feb mini-sim 25Q).
> - **MIR extensión 128** (v6.00: 131) · secundarios +3 hábiles (tabla en `DATA/REESTRUCTURACION_31AGO_2026.md` §25 y `DATA/PENDIENTES_JOSEPH.md`, bloque v6.01).
> - **Examen Step 1, ENCAPS, reinicio, SERUMS, GO/NO-GO e hitos 2027: SIN cambio.**
> - Referencia de verificación del tramo 2 v6.01: `DATA/_scripts/usmle/ref_v6/tramo2_14mar_27sep_v601.json` (`gen_tramo2_ref.js --pendientes-f1 58 --f1-filas 57`);
>   la v6.00 (`tramo2_14mar_27sep.json`, `--f1-filas 58`) se conserva y la matriz de compatibilidad de `verificar_v6.js` la sigue comprobando.
> - Calendar v6.01: `cal/CAL_V6.md` §9. Detalle de la espec: ADDENDUM v6.01 al principio de `V6_ESPEC.md` (las cifras v6.00 del cuerpo quedan marcadas «⏸ v6.00»).

Receta completa del régimen v6.00 (D1 = mié 7-oct-2026 · Step 1 hasta el 30-dic · ENCAPS intensiva 4-ene → 12-mar con examen dom 14-mar PROVISIONAL · reinicio del Step 1 mar 16-mar · SERUMS ~lun 3-may con turno variable · examen Step 1 lun 27-sep-2027).

| Fichero | Qué es |
|---|---|
| `V6_ESPEC.md` | Especificación ejecutable r2 (§0 números · §A calendario/protegidos · §B USMLE · §C ENCAPS · §D MIR · §E secundarios · §F app · §G Google Calendar · §H lotes y verificaciones V1-V7 · **§I disparadores: qué se regenera cuando salga la convocatoria del ENCAPS, el inicio real del SERUMS o un NO-GO**). |
| `PROPUESTA_V6.md` | Propuesta de diseño que Joseph aprobó (decisiones DJ-1…DJ-4). |
| `espec/` | Scripts de cálculo de solo lectura: `node a_tabla.js` reproduce la tabla de escenarios del ENCAPS (§A5) y la fecha del Step 1 a reservar; `SERUMS=2027-05-06 node a_tabla.js` la sensibilidad; `b_horas.js` el presupuesto de horas (§B4); `gen_tramo2_ref.js` el tramo 2 de referencia; `v1_check.js` la verificación V1 (multiset). Ejecutar desde esta carpeta. |

- La especificación se escribió en el scratchpad de la sesión: donde dice `v600/…` o `v600/espec/…`, léase esta carpeta (`DATA/_v600/…`).
- La fuente única de fechas NO está aquí: es `DATA/_scripts/_fechas_v6.json` → `node DATA/_scripts/gen_fechas_v6.js` → `src/lib/fechasV6.ts` (generado).
- La referencia de verificación del tramo 2 que usan los generadores vive en `DATA/_scripts/usmle/ref_v6/` (copia congelada de `dias_v520.json`).
