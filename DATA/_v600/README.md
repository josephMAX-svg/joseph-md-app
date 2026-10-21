# v6.00 · Reestructuración anual definitiva (6-oct-2026) · + ADDENDUM v6.01 (10-oct-2026) · + ADDENDUM v6.02 (17-oct-2026) · + v6.03 (20-oct) · + v6.04 (21-oct-2026)

> ## ✅ ESTADO VIGENTE = ADDENDUM v6.04 de `V6_ESPEC.md` (mié 21-oct-2026) sobre el ADDENDUM v6.03 (mar 20-oct-2026)
> - **v6.03** (lun 19 y mar 20-oct sin estudio): F1 = **mié 21-oct → mié 30-dic** (50 sesiones; D50 = NBME 28; 8 filas al tramo 2, T3-T10) · ENCAPS F1 `dia` 1-50 +
>   intensiva 51-100 + 10 pendientes F1 · secundarios +2 hábiles · Calendar `cal/CAL_V6.md` §14 — sus fechas de plan siguen siendo la base de F1.
> - **v6.04a** (mié 21-oct sin estudio): semana corrida por alias en la consulta (jue 22 = plan del mié 21 · vie 23 = plan del jue 22 · el vie 23 repartido en
>   sáb 24 / dom 25; desde el lun 26 nada cambia) · Calendar `cal/CAL_V6.md` §15.
> - **v6.04b** (orden de Joseph «si iba a ser septiembre, que sea octubre»): **examen Step 1 lun 25-oct-2027** (⏸ lun 27-sep) · GO/NO-GO lun 6-sep · F4 → sáb
>   23-oct · tramo 2 182 filas, colchón 48 (≈ 126 h) · MIR 203 sesiones (handoff mar 26-oct) · DJ-1 v6.04 = 25-oct para cualquier ENCAPS · Calendar 2027:
>   pendiente. Detalle: `DATA/REESTRUCTURACION_31AGO_2026.md` §27-§28. Lo de abajo (ADDENDA v6.02 / v6.01 y receta v6.00) es historial donde lo contradiga.

> ## ⏸ ADDENDUM v6.02 (sáb 17-oct-2026) — corrimiento al LUN 19-OCT-2026 con HITOS F1 ANCLADOS; mandaba sobre el ADDENDUM v6.01 y sobre la receta v6.00 · **historial: lo corrigen v6.03 y v6.04 (arriba); la regla de hitos F1 anclados sigue**
> Del lun 12 al vie 16-oct no se estudió (5 hábiles; 35 desde el 31-ago) → D1 = **lun 19-oct-2026**. Misma regla que v6.01 (la F1 no se alarga) + **regla nueva:
> un hito de F1 nunca sale de F1** (`gen_tramo2.colocarF1(n)`): los hitos conservan su D# si caben y, si no, ocupan los últimos slots de F1; lo que no cabe son
> siempre las ÚLTIMAS filas de temario no-hito, que pasan al tramo 2 como filas desplazadas (con su `dOrig`).
> - **F1 = 52 hábiles, lun 19-oct → mié 30-dic**: d 1-51 = v5.20 D1-D51 · **d 52 = NBME 28, mié 30-dic** (última sesión de F1; sin day-after: auditoría en la
>   revisión S11 del sáb 2-ene; si se pierde el 30-dic → sáb 2-ene 07:00-12:30 y la S11 a las 13:30). Hitos: UWSA1 lun 19-oct · NBME 25 vie 30-oct · 26 vie
>   20-nov · 27 vie 11-dic · 28 mié 30-dic · gates D18 mié 11-nov / D38 mié 9-dic. C1/C2 siguen consumidos.
> - **6 desplazadas al tramo 2 = T3-T8, jue 18-mar → lun 29-mar-2027** (v5.20 D52, D53, D54, D56, D57 Heme/Onco + D79 bioestadística; sub «… era v5.20 D#»;
>   `escenario.desplazadasF1`; `escenario.pendientesF1` ya solo lleva recuperaciones del disparador (f), con `--pendientes-f1 d` = slot d de F1). Tramo 2: mismas
>   158 filas, fechas e hitos; **colchón 28 filas ≈ 73,5 h** (⏸ v6.01: 38 ≈ 100 h); uWorld FRESCO 3.260.
> - **ENCAPS:** F1 `dia` 1-52 (43 banqueo + 9 mini-sims; checkpoint = **mini-sim 45, vie 18-dic**) · intensiva **`dia` 53-102** (mismas fechas; pre-test vie 8-ene =
>   dia 57) · **8 pendientes F1** repuestos en el carril B (17-feb, 18-feb, lun 22-feb mini-sim 25Q, 23-feb, 24-feb, 25-feb, 1-mar, mar 2-mar mini-sim 25Q) · huella
>   v2 102 · `60e16744…`.
> - **MIR extensión 123** (⏸ v6.01: 128) · secundarios +5 hábiles (tabla en `DATA/REESTRUCTURACION_31AGO_2026.md` §26 y `DATA/PENDIENTES_JOSEPH.md`, bloque v6.02).
> - **Examen Step 1, ENCAPS, reinicio, SERUMS, GO/NO-GO e hitos 2027: SIN cambio.** ⚠ La tabla de escenarios DJ-1 (`espec/a_tabla.js`) reproduce la v6.00; con la
>   F1 de 52 cambian las reservas de 21-mar, 11-abr y 25-abr (ADDENDUM v6.02 de `V6_ESPEC.md`; decisión pendiente en PENDIENTES v6.02 (vi)).
> - Referencia de verificación del tramo 2 v6.02: `DATA/_scripts/usmle/ref_v6/tramo2_14mar_27sep_v602.json` (`gen_tramo2_ref.js --f1-filas 52`, el valor por
>   defecto); las de v6.00 (58) y v6.01 (57) se conservan y la matriz de compatibilidad de `verificar_v6.js` las sigue comprobando.
> - Calendar v6.02: `cal/CAL_V6.md` §11 (resumen e ids en `DATA/ENCAPS/CALENDAR_SEGMENTOS_V5_6.md` §23.8). Detalle de la espec: ADDENDUM v6.02 al principio de `V6_ESPEC.md` (las cifras v6.01 quedan
>   marcadas «⏸ v6.01»).

> ## ⏸ ADDENDUM v6.01 (sáb 10-oct-2026) — corrimiento al LUN 12-OCT-2026; mandaba sobre las cifras de F1/ENCAPS/secundarios de la receta v6.00 · **historial: lo corrige el ADDENDUM v6.02 de arriba**
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
