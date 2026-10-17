# V6_ESPEC — Especificación ejecutable de la reestructuración anual v6.00

> ## ✅ ADDENDUM v6.02 (sáb 17-oct-2026) — corrimiento al LUN 19-OCT-2026 con HITOS F1 ANCLADOS · manda sobre el ADDENDUM v6.01 y sobre las cifras marcadas «⏸ v6.00» / «⏸ v6.01» en el cuerpo
> **Qué pasó:** del lun 12 al vie 16-oct no se estudió (5 hábiles; **35 desde el 31-ago**) y Joseph pidió (sáb 17-oct) *«todo corre a partir del 19, reestructura»*.
> Segundo corrimiento bajo v6: la misma regla de v6.01 (§B1, §B7.1: **la F1 no se alarga**, porque la intensiva ENCAPS empieza el lun 4-ene) más una regla nueva,
> la de los **hitos F1 anclados**. **No cambian:** examen Step 1 lun 27-sep-2027, ENCAPS dom 14-mar (PROVISIONAL), reinicio mar 16-mar, SERUMS ~lun 3-may [S],
> GO/NO-GO lun 9-ago, hitos 2027 (§B5), reglas (§B3, §B7), horas F3/F4 (§B4) y disparadores (§I, salvo la semántica de (f)). Fuente:
> `DATA/_scripts/_fechas_v6.json` **v6.02** (`f1: { inicio: '2026-10-19', fin: '2026-12-30', dias: 52 }` + `corrimientos[1]`); commit `1058299`; detalle en
> `DATA/REESTRUCTURACION_31AGO_2026.md` §26. Estado v6.01 = tag git `regimen-v6.01`. Fechas comprobadas con node.
>
> **Regla nueva (doctrina v6.02) — HITOS F1 ANCLADOS: un hito de F1 nunca sale de F1.** Los 5 hitos de F1 (v5.20 D1 UWSA1 · D10 NBME 25 · D25 NBME 26 · D40
> NBME 27 · D55 NBME 28) se colocan primero: el hito k-ésimo (k = 1…H, H = 5) va al slot `min(D#, N − (H − k))` de los N slots de F1, es decir, conserva su D# si
> cabe y, si no, ocupa los últimos slots de F1 en orden. El resto de slots se llena en orden con el temario NO-hito (y después con C1/C2, si existieran). **Lo
> que no cabe son siempre las ÚLTIMAS filas de temario no-hito**: pasan al tramo 2 como **filas desplazadas** (unidad de contenido `C<D#>`, con su `dOrig`), a la
> cabeza de la cola-adelante, justo después del NBME 29 y en orden v5.20. Única definición: `gen_tramo2.colocarF1(n)` (port; exporta también `ORIGEN_F1`) =
> `SLOT_F1` / `HITOS_F1` de `ref_v6/gen_tramo2_ref.js` (referencia, código independiente). Con N = 58 o 57 la colocación es la de v6.00 / v6.01 y las dos
> referencias se siguen reproduciendo byte a byte. `gen_usmle_v5.js` aborta si un hito de F1 no está en F1 o no ocupa el slot que le toca.
>
> | Cifra (sección) | ⏸ v6.01 (ADDENDUM v6.01) | **v6.02** |
> |---|---|---|
> | F1 (§0, §A1, §A4, §B1) | lun 12-oct → mié 30-dic · 57 sesiones D1-D57 · ≈ 356 h brutas | **lun 19-oct → mié 30-dic · 52 sesiones** (25-dic SKIP) · ≈ 325 h brutas · `d` = **slot** de F1: **d 1-51 = v5.20 D1-D51** (mismo D#) · **d 52 = NBME 28** (v5.20 D55) · `escenario.origenF1 = [1…51, 55]` · cobertura al 30-dic: Fundamentos + 7 sistemas completos + Heme/Onco solo el D51 (anemias microcíticas, mar 29-dic) |
> | Filas desplazadas (§B1, §B3) | 1: D79 bioestadística → T3 jue 18-mar (`--pendientes-f1 58 --f1-filas 57`; `escenario.pendientesF1 = [58]`) | **6, a T3-T8 (jue 18-mar → lun 29-mar-2027)**: v5.20 **D52** Heme macro/normocíticas + hemólisis (T3 jue 18-mar, `uid C52`, N1 · 30Q) · **D53** coagulación (T4 vie 19-mar, C53, N1 · 30Q) · **D54** plaquetas + hipercoagulabilidad (T5 lun 22-mar, C54, N2 · 40Q) · **D56** leucemias (T6 mar 23-mar, C56, N2 · 40Q) · **D57** linfomas + mieloma (T7 mié 24-mar, C57, N2 · 40Q) · **D79** bioestadística + epi + ética (T8 lun 29-mar, C79, N1 · 30Q); 25-26-mar SKIP · `--f1-filas 52` · van en **`escenario.desplazadasF1`** (ya no en `pendientesF1`) |
> | Etiqueta de las desplazadas | «DE F1 → TRAMO 2 (… era la fila N de F1) · texto v5.20» | con hitos anclados (algún hito fuera del slot de su D#): **«DE F1 → TRAMO 2 (no cupo en F1 antes de la pausa ENCAPS; era v5.20 D#) · texto v5.20»** (la de v6.00/v6.01 se conserva cuando todos los hitos siguen en su D#); el chip de la app (`/^DE F1 → TRAMO 2/`) sale en T3-T8 |
> | Hitos F1 (§B1, §G1) | UWSA1 D1 lun 12-oct · NBME 25 D10 vie 23-oct · 26 D25 vie 13-nov · 27 D40 vie 4-dic · 28 D55 lun 28-dic | UWSA1 **D1 lun 19-oct** 09:00-13:00 · NBME 25 **D10 vie 30-oct** · 26 **D25 vie 20-nov** · 27 **D40 vie 11-dic** · 28 **d52 mié 30-dic** = última sesión de F1 (NBME 07:00-12:30) |
> | Gates F1 (§B1, §B7.3, §G1) | D18 mié 4-nov · D38 mié 2-dic | **D18 mié 11-nov · D38 mié 9-dic** |
> | Checkpoint NBME 28 (§B5, §I) | lun 28-dic | **mié 30-dic** · **sin day-after en F1** (jue 31-dic SKIP): la revisión de errores y el Anki de gaps se hacen el mismo 30-dic (lo dice su `sub`) y la auditoría Palmerton va en la revisión semanal **S11 del sáb 2-ene-2027** · **contingencia:** si se pierde el 30-dic, el NBME 28 **no se borra ni pasa al tramo 2**: se rinde el **sáb 2-ene 07:00-12:30** (transición, fuera del plan diario: es evaluación, no temario) y la S11 pasa a las **13:30** |
> | Deload de secundarios (`homeBriefing.DELOAD_SEMANAS`) | lun 16-nov · lun 28-dic | **lun 23-nov** (post-NBME 26 del vie 20-nov) · **lun 28-dic** (semana del NBME 28) |
> | Niveles | 11 filas F1 cambian · 0 viernes N4 en todo el plan | `nivelUW`/`qDia` re-derivados por día de la semana: 9 filas difieren de v5.20 (D8 D13 D28 D33 D48 N3 → N2 · D15 D20 D35 D45 N2 → N3) · F1: N1 17 · N2 26 · N3 4 · N5 5 (2.670 Q) · **0 viernes N4 en F1**; en el tramo 2 vuelve **1 viernes N4 de contenido: T12 vie 2-abr** (Micro, v5.20 D61) |
> | Cierre de F1, disparador (f) (§B7.2, §I) | filas `d ≤ 57` sin ✓ → `--pendientes-f1` | **`--pendientes-f1 d` = slot d de F1** (1-52): su contenido es el que `colocarF1` puso en ese slot (`COL.enF1[d-1]`); un hito se rechaza; un d mayor que `--f1-filas` se ignora (mensaje «pendiente F1 inválido (1-52, sin hitos; 53-58 no son slots de F1 y se ignoran)»). `escenario.pendientesF1` solo lleva recuperaciones del disparador (f) |
> | Tramo 2 (§0, §B3, Anexo A) | 158 filas · 38 `dOrig` · contenido 21 · reactivación 33 · **colchón 38 filas ≈ 100 h** · uWorld FRESCO 3.270 · ref `_v601` | 158 filas, **mismas fechas e hitos** · **43 `dOrig`** · contenido **26** (Micro desde **T9 mar 30-mar**; el contenido v5.20 termina en T28 lun 26-abr, antes del SERUMS) · reactivación **38** (F3 2 · F4 36; última **T75 lun 21-jun**) · **colchón 28 filas ≈ 73,5 h al piso** (17 en sábados de F4) · déficit 0 · horas-plan al piso 501,6 h (=) · uWorld FRESCO **1.710 + 1.550 = 3.260** (margen 399 sobre 3.659) · `diaInicio` Heme 51 · Psiq **108** · Micro **109** · Repro **116** · MSK **121** · Bioq/Pharm **127** · referencia **`ref_v6/tramo2_14mar_27sep_v602.json`** (= `node gen_tramo2_ref.js --f1-filas 52`, el valor por defecto; = `tramo2_vigente.json`) |
> | Por qué −10 filas de colchón y no −5 | — | 5 por las 5 desplazadas nuevas (contenido 21 → 26) y 5 porque esas 5 filas empujan 5 unidades de reactivación de F3 (1 unidad = 1 fila de día completo) a F4 (½ unidad por fila de turno): reactivación 33 → 38 filas |
> | Escenarios DJ-1 (§A5, `_fechas_v6.json → step1.reserva_por_encaps`) | la tabla literal se reproduce (14-mar → 31-ago · 21-mar → 31-ago · 4-abr → 27-sep · 11-abr → 27-sep · 18-abr → 25-oct · 25-abr → 25-oct) | ⚠ **recalculada con la regla de §B4.4 (colchón PISO ≥ 0 y déficit 0) y la F1 de 52** (réplica de `espec/a_tabla.js` con `ref_v6/gen_tramo2_ref.js --f1-filas 52`, solo lectura): 14-mar → 31-ago (=; colchón 6 f ≈ 16 h) · **21-mar → 27-sep** (el 31-ago da déficit 2 u) · 4-abr → 27-sep (=; 2 f ≈ 5 h) · **11-abr → 25-oct** (el 27-sep da déficit 4 u) · 18-abr → 25-oct (=; 6 f ≈ 16 h) · **25-abr → ninguna ≤ 25-oct** (déficit 2 u). El escenario base (14-mar → 27-sep, colchón 28) no cambia. **El JSON NO se ha tocado** (sigue la tabla literal v6.00): decisión de Joseph, `DATA/PENDIENTES_JOSEPH.md` bloque v6.02 (vi) · ⚠ **v6.02: con la F1 de 52 la regla de cálculo (`node DATA/_scripts/gen_fechas_v6.js --check --calculo`) ya NO coincide con la tabla literal: ENCAPS 21-mar → lun 27-sep (literal 31-ago) · 11-abr → lun 25-oct (literal 27-sep) · 25-abr → ninguna de DJ-1 (extensión); el escenario vigente (14-mar → 31-ago; examen elegido lun 27-sep) no cambia. El JSON conserva la tabla literal DJ-1; en el disparador (1) (convocatoria) se corre `--calculo` y manda la más tardía, avisando a Joseph (`DATA/PENDIENTES_JOSEPH.md`, (vi))** (§0 «Ventana DJ-1», §B4.4 y §I disparador (1)) |
> | `DAILY_META` / app (§F) | `version 'v6.01'`, `inicio '2026-10-12'`, `DIAS` 57, `totalDias` 215, `STEP1_SEMANAS` 40 | `version 'v6.02'`, `inicio '2026-10-19'`, **`DIAS` 52**, `totalDias` **210**, tramo 1 `{ 2026-10-19 → 2026-12-30, dias 52 }`, **`STEP1_SEMANAS` 39** (11 de F1 + 28; S1 = semana del lun 19-oct, S11 = semana del lun 28-dic) · «Día {d}/52» · `diaPrevio(T1)` = D51 (salta el NBME 28 del d52) · navegación D52 → T1 · `estadoUSMLE`: 12-oct y 17-oct → D1~ · 30-dic → D52 |
> | Revisiones semanales (`gen_revision_semanal.js`) | S01 sáb 17-oct … (40 semanas) | **S00 sáb 17-oct** (pre-D1) · **S01 sáb 24-oct** … **S11 sáb 2-ene-2027** (deload; auditoría del NBME 28) · S12-S21 sáb 9-ene → sáb 13-mar = PAUSA · ENCAPS · **S22 sáb 20-mar = S12/39** … S49 sáb 25-sep = S39/39 · S50 sáb 2-oct (examen) · cada fichero lleva un número menos que en v6.01 (S04_2026-11-07 → S03 …) · `TOTAL_SEM` 39 · la tabla `MINIMOS` sigue con mínimos absolutos de v5 (pendiente, PENDIENTES (v)) |
> | ENCAPS F1 (§C1) | `dia` 1-57 · 47 + 10 · pre-test lun 12 + mar 13-oct · checkpoint mini-sim 50 · stock V-2 mié 28-oct · III-5 jue 12-nov · II-5 lun 16-nov | **re-sembradas `dia` 1-52**, rígidas por slots (slot k lun-jue = slot k de v6.00/v6.01, k = 1…43; mini-sim k = viernes k, k = 1…9) · lun 19-oct → mié 30-dic · **43 `banqueo1h` + 9 mini-sims** (vie 23-oct … vie 18-dic; `sim_n` 5, 10 … 45) · pre-test de arranque **lun 19 + mar 20-oct** (dia 1-2) · **checkpoint del año = mini-sim 45, vie 18-dic** (cola larga I-1 + II-2; único con `extra.checkpoint`) · stock V-2 antes del **mié 4-nov**, III-5 antes del **jue 19-nov**, II-5 antes del **lun 23-nov** · `BANCO_PROPIO` re-fechado por sesión (+7 días; ítems intactos) |
> | Intensiva (§0, §A5, §C3, Anexo B) | `dia` 58-107 (escenarios 58-112 / 120 / 125 / 130 / 135) · pre-test 62 · SIM 100Q 67-102 · DRESS 106 · medio día 107 | **`dia` 53-102** (= `dia` v6.00 − 8, MISMAS fechas lun 4-ene → vie 12-mar; escenarios 53-107 / 115 / 120 / 125 / 130) · señales 53 · calentamiento 54-56 · **PRE-TEST 2026-II vie 8-ene = 57** · SIM 100Q 62, 67, 72, 77, 82, 87, 92, 97 · cola lun 8-mar 98 · repaso final 99-100 · **DRESS jue 11-mar 101** · medio día vie 12-mar **102** |
> | Carril B (§C2, §F) | `dia` 58-89 · absorbidos 62 … 87 · 3 pendientes F1 (dia 90, 91, 93) | filas v5.20 61-92 en **`dia` 53-84** (`dia_mant` 61-92; desfase 8 = 3 + 5 hábiles perdidos) · 6 mini-sims v5.20 absorbidos por el SIM 100Q en los dia **57, 62, 67, 72, 77, 82** · **8 PENDIENTES F1** explícitos en los 8 primeros días de reposición (lun-jue; orden: corrimiento → `banqueo1h` antes que mini-sim → `dia_mant`): mié 17-feb (85) II-8 · jue 18-feb (86) II-3 · **lun 22-feb (88) MINI-SIM 25Q II-6 + II-10** · mar 23-feb (89) III-8 · mié 24-feb (90) II-11 · jue 25-feb (91) IV-6 · lun 1-mar (93) V-7 · **mar 2-mar (94) MINI-SIM 25Q I-10 + V-6** (era el checkpoint de la F1 v6.01: conserva receta, cola larga, `sim_n` y semana; solo se le retira el rótulo «CHECKPOINT DEL AÑO», anotado en `rotulo_retirado`) · reposición genérica en los dia 95, 96, 98, 99, 100: «1) filas del carril B `dia` 53-84 (`dia_mant` 61-92, `banqueo1h`) sin ✓ en `D{dia}:b_*`, en orden; 2) si no hay: lista de vigilancia» · 0 mini-sims F1 absorbidos · claves `D53:b_eval` …; mini-sims repuestos `D88:b_msim` / `D94:b_msim` (+ `_corr`) · fuente `DATA/ENCAPS/_pendientes_f1.json` (8 filas: 3 de v6.01 + 5 de v6.02) |
> | `study_metrics.extra` + backups (§C3, §H Lote 0/4) | `d1 '2026-10-12'` · `dias_ciclo 57` · régimen v6.20 (57 d) + INTENSIVA v6.01 · `intensiva.dias '58-107'` · `_bk_v601_*` · huella 107 · `1795d281…` | **`d1 '2026-10-19'` · `dias_ciclo 52`** · régimen `MANTENIMIENTO_2027-1 v6.21 (52 d) + INTENSIVA v6.02` · `intensiva.dias '53-102'` · `corrimiento` (historial v6.01 + v6.02; `pendientes_f1` 8; regla de reposición `dia` 53-84) · `horarios` del mantenimiento re-fechados por ruta (3 `pasos[0].d` con `jsonb_set`, guarda DO) · backups `study_schedule_bk_v602_20261017`, `study_schedule_bk_v602_int_20261017`, `study_metrics_bk_v602_20261017` · **huella v2 102 · `60e16744d0a798efe96f4b0b195708b6`** · la fila del carril B **dia 65** (mié 20-ene · III-8 historia clínica · `dia_mant` 73; dia 70 en v6.01, 73 en v6.00) venía desviada en Supabase respecto del SQL versionado (`extra.carril_b.extra` con `de` 5 · `sub_ejes_total` 3, igual en los backups v6.01 y v6.02) y **se corrigió en Supabase** tras la siembra a su catálogo (`de` 4 · `sub_ejes_total` 2): ahora la tabla viva = `_encaps_intensivo_2027.sql` fila a fila |
> | V5 / V6 (§H) | 57 + 50 · `regimenDe` → `{d1:'2026-10-12', total:107}` · D57 → T1 | **52 MANT + 50 INT 53-102** (huella v2) · `regimenDe` → `{d1:'2026-10-19', total:102}` · `STUDY_TOTAL_DAYS.ENCAPS` 52 · navegación **D52 → T1** |
> | MIR (§0, §D) | diario → lun 1-feb · mant mar 2-feb → mar 27-abr · ext 128 · 185 | diario **lun 19-oct → lun 8-feb** (mini-MIR D77 vie 5-feb) · mantenimiento 57 **mar 9-feb → mar 4-may** (sus 2 últimas filas, lun 3 y mar 4-may, ya caen en el SERUMS: `MirTodayPlan` resuelve la franja por fecha) · Tier C jue 11-feb … **mar 4-may** (Planificación), mismo orden · **extensión 123 mié 5-may → vie 24-sep** (82 lun-jue · 21 viernes · 20 sábados; Tier C ext **20**: vueltas 12 · 12 · 8; además de Genética v3 se cae **Oftalmología · Retina v3**) · `MIR_MANT_TIER_C` 32 · `MIR_MANT_DIAS` **180** |
> | Secundarios (§E) | Research c1 → vie 5-mar, c2 → mar 24-ago · Derma c1 → lun 10-may, c2 → lun 19-jul · AURUM → mar 20-abr · SYNAPSE → vie 19-feb · vibecoding → mié 24-feb · LIVIANO → mié 17-feb · Business → mar 9-feb | +5 hábiles, contenido intacto: Research c1 **mar 20-oct → mié 17-mar** (R6, R7 y X-1 pasan tras la pausa 15-ene → 10-feb) · c2 **vie 19-mar → mar 31-ago** (R43 **mar 27-jul**) · Derma c1 **lun 19-oct → vie 14-may** (alivio d44-d49 jue 18-feb → jue 4-mar), c2 **lun 17-may → vie 23-jul** · «dermato Step 1» = T23 lun 19-abr · AURUM **→ mar 27-abr** (30' desde el lun 4-ene) · SYNAPSE **→ vie 26-feb** · vibecoding **→ mié 3-mar** (S1-S12 → mié 13-ene; SHIP S12 sáb 16-ene) · LIVIANO **→ mié 24-feb** (capstone mar 23-feb) · Business **→ mar 16-feb** |
> | Overlays 🔬 (§E, §G3) | M1 vie 16-oct … R43 mar 20-jul | M1 **lun 26-oct** · C-2 **mar 3-nov** · T-1 **jue 5-nov** · C-6 **lun 23-nov** · CR-1 **mié 25-nov** · T-8 **mié 23-dic** · CR-8 mar 12-ene (=) · CR-9 jue 11-feb (=) · X-1 **mar 23-feb-2027** (tras la pausa) · X-9 **lun 29-mar** · R10 **vie 2-abr** · R43 **mar 27-jul** |
> | V3 / V4 (§H) | D1 2026-10-12 (Derma d1 2026-10-13) · MIR 78 + 57 + 128 · Research c2 fin 2027-08-24 · Derma 2027-05-10 / 2027-07-19 · AURUM 2027-04-20 | D1 **2026-10-19** en USMLE / ENCAPS / MIR / Derma / AURUM (Research d1 **2026-10-20**) · MIR 78 + 57 + **123** · Research c2 fin **2027-08-31** · Derma **2027-05-14 / 2027-07-23** · AURUM **2027-04-27** |
> | Generadores (§E, §H) | START `2026-10-12` | START **`2026-10-19`** (= `f1.inicio`, por defecto en los generadores ENCAPS; `remap_inicio.js 2026-10-19` + generadores) · verificación: `verificar_v6.js` (matriz 52 + compatibilidad 58 / 57, control «textos v6.02» y «etiqueta de las desplazadas») · `ref_v6/v1_check.js` (lee la referencia v6.02 por defecto: 43 `dOrig`) |
> | Calendar (§G) | v6.01 en `cal/CAL_V6.md` §9-§10 | v6.02 en `cal/CAL_V6.md` §11 (lote aparte; respaldos JSON solo en `cal/cal_bk/`, fuera del repo) |

> ## ⏸ ADDENDUM v6.01 (sáb 10-oct-2026) — corrimiento al LUN 12-OCT-2026 · mandaba sobre las cifras marcadas «⏸ v6.00» en el cuerpo · **sus cifras de F1, ENCAPS, MIR, secundarios y tramo 2 las corrige el ADDENDUM v6.02 de arriba** (historial)
> **Qué pasó:** el mié 7, el jue 8 y el vie 9-oct no se estudiaron (3 hábiles; 30 desde el 31-ago) y Joseph pidió (sáb 10-oct) que todo empiece el **lun
> 12-oct-2026**. Se aplicó la regla de colchón de F1 de esta espec (§B1, §B7.1) **sin alargar la F1** (la intensiva ENCAPS empieza el lun 4-ene): los D# corren
> rígidos, C1/C2 se consumen y lo que no cabe pasa al tramo 2. **No cambian:** examen Step 1 lun 27-sep-2027, ENCAPS dom 14-mar (PROVISIONAL), reinicio mar
> 16-mar, SERUMS ~lun 3-may [S], GO/NO-GO lun 9-ago, hitos 2027 (§B5), reglas (§B3, §B7), horas F3/F4 (§B4), disparadores (§I salvo (f)). Fuente:
> `DATA/_scripts/_fechas_v6.json` **v6.01** (`f1: { inicio: '2026-10-12', fin: '2026-12-30', dias: 57 }` + `corrimientos[]`); commit `8e9be7e`; detalle en
> `DATA/REESTRUCTURACION_31AGO_2026.md` §25. Estado v6.00 = tag git `regimen-v6.00`. Todas las fechas, comprobadas con node.
>
> | Cifra (sección) | ⏸ v6.00 (esta espec) | ⏸ **v6.01** (ver ADDENDUM v6.02) |
> |---|---|---|
> | F1 (§0, §A1, §A4, §B1) | mié 7-oct → mié 30-dic · **60** sesiones D1-D60 · 375 h brutas | **lun 12-oct → mié 30-dic · 57 sesiones D1-D57** (25-dic SKIP) · ≈ 356 h brutas |
> | D58-D60 (§B1) | D58 lun 28-dic = bioestadística (ex-D79) · D59 mar 29 / D60 mié 30-dic = C1/C2 | **C1/C2 CONSUMIDOS** (mar 29 / mié 30-dic = D56/D57, Heme) · bioestadística → **tramo 2 T3 jue 18-mar-2027** (fila desplazada `uid C79`, `dOrig 79`, N1 · 30Q; `--f1-filas 57`, `escenario.pendientesF1 = [58]`) |
> | Hitos F1 (§B1, §G1) | UWSA1 mié 7-oct · NBME 25 mar 20-oct · 26 mar 10-nov · 27 mar 1-dic · 28 mar 22-dic | mismos D# y horas: UWSA1 **D1 lun 12-oct** · NBME 25 **D10 vie 23-oct** · 26 **D25 vie 13-nov** · 27 **D40 vie 4-dic** · 28 **D55 lun 28-dic** |
> | Gates F1 (§B1, §B7.3, §G1) | vie 30-oct (D18) · vie 27-nov (D38) | **D18 mié 4-nov · D38 mié 2-dic** |
> | Checkpoint NBME 28 (§B5, §I) | mar 22-dic | **lun 28-dic** |
> | Niveles F1 | `nivelUW` por la regla (viernes N4 desde S11) | misma regla re-derivada con D1 en lunes: 11 filas cambian (D8 D13 D28 D33 D48 N3 → N2 · D15 D20 D35 D45 D50 N2 → N3 · D53 N4 → N2) · **viernes N4 en todo el plan: 0** (v6.00: D53 · T12 · T17) |
> | Cierre de F1, disparador (f) (§B7.2, §I) | filas `d ≤ 58` sin ✓, descontadas las que cubrieron C1/C2 | filas **`d ≤ 57`** sin ✓ (ya no hay C1/C2; la 58 ya está en T3) → `--pendientes-f1` |
> | Tramo 2 (§0, §B3, Anexo A) | 158 filas · 37 `dOrig` · **colchón 40 filas ≈ 105 h** · referencia `tramo2_14mar_27sep.json` | 158 filas, **mismas fechas** · **38 `dOrig`** (+ D79) · cola-adelante corrida 1 fila (Micro desde T4 vie 19-mar; última reactivación T63 lun 7-jun) · **colchón 38 filas ≈ 100 h** (99,75) · déficit 0 · uWorld FRESCO 1.900 + 1.370 = 3.270 (=) · referencia **`ref_v6/tramo2_14mar_27sep_v601.json`** · **el Anexo A es v6.00** |
> | `DAILY_META` / app (§F) | `version 'v6.00'`, `inicio '2026-10-07'`, `DIAS` 60, `totalDias` 218, tramo 1 de 60 días, `STEP1_SEMANAS` 41 | `version 'v6.01'`, `inicio '2026-10-12'`, **`DIAS` 57**, `totalDias` **215**, tramo 1 de 57 días, **`STEP1_SEMANAS` 40** (S1 = semana del lun 12-oct; F1 = 12 semanas); la agrupación F1/T2 usa `esFilaT2` (ya no `d ≤ 60`); «Día {d}/57» |
> | ENCAPS F1 (§C1) | filas 1-60 **sin cambio** · 49 `banqueo1h` + 11 mini-sims · último mini-sim vie 18-dic = dia 53 · **checkpoint = mini-sim 53** · stock V-2 antes del lun 26-oct, III-5 antes del mar 10-nov | **re-sembradas `dia` 1-57**, rígidas por slots (lun 12-oct → mié 30-dic) · **47 + 10** (vie 16-oct … vie 18-dic) · pre-test de arranque lun 12 + mar 13-oct · **checkpoint = mini-sim 50, vie 18-dic** · stock V-2 antes del mié 28-oct, III-5 antes del jue 12-nov, II-5 antes del lun 16-nov |
> | Intensiva (§0, §A5, §C3, Anexo B) | `dia` **61-110** (escenarios 61-115 / 123 / 128 / 133 / 138) · pre-test dia 65 · DRESS 109 · medio día 110 | **`dia` 58-107** (= `dia` v6.00 − 3, MISMAS fechas; escenarios 58-112 / 120 / 125 / 130 / 135) · pre-test **vie 8-ene = 62** · SIM 100Q 67-102 · DRESS **106** · medio día **107** |
> | Carril B (§C2, §F) | filas 61-92 en su mismo `dia` · 6 absorbidos dia 65, 70, 75, 80, 85, 90 · reposición «instancias de 61-92 no hechas» · claves `D61:b_eval` … | filas v5.20 61-92 en **`dia` 58-89** (`dia_mant` 61-92 = etiqueta de origen) · 6 absorbidos dia **62, 67, 72, 77, 82, 87** · reposición: **los 3 PENDIENTES F1 primero** —mié 17-feb (dia 90) II-8 · jue 18-feb (dia 91) II-3 · **lun 22-feb (dia 93) MINI-SIM 25Q** (cola larga II-6 + II-10; cierre `mini_sim`, `sim_n` 93)— y después «filas del carril B `dia` 58-89 sin ✓ en `D{dia}:b_*`, en orden → lista de vigilancia» · 0 mini-sims F1 absorbidos (nada se descarta) · claves `D58:b_eval` … · fuente `DATA/ENCAPS/_pendientes_f1.json` |
> | `study_metrics.extra` + backups (§C3, §H Lote 0/4) | `d1 '2026-10-07'` · `dias_ciclo 60` · régimen v6.19 (60 d) · `intensiva.dias '61-110'` · `_bk_v600_*` | **`d1 '2026-10-12'` · `dias_ciclo 57`** · régimen `MANTENIMIENTO_2027-1 v6.20 (57 d) + INTENSIVA v6.01` · `intensiva.dias '58-107'` · `corrimiento.pendientes_f1` (3) · backups `study_schedule_bk_v601_20261010`, `study_schedule_bk_v601_int_20261010`, `study_metrics_bk_v601_20261010` · **huella v2 107 · `1795d281628af15a5e5d837678a7df97`** |
> | V5 / V6 (§H) | 60 MANT con hash intacto + 50 INT 61-110 · `regimenDe` → `{d1:'2026-10-07', total:110}` · navegación D60 → T1 | 57 MANT re-sembradas + 50 INT 58-107 (huella v2) · `regimenDe` → `{d1:'2026-10-12', total:107}` · navegación **D57 → T1** |
> | MIR (§0, §D) | diario mié 7-oct → mié 27-ene · mantenimiento jue 28-ene → jue 22-abr · **extensión 131** vie 23-abr → vie 24-sep (88 · 23 · 20; Tier C ext 22) · `MIR_MANT_DIAS` 188 | diario **lun 12-oct → lun 1-feb** · mantenimiento 57 **mar 2-feb → mar 27-abr** (Tier C jue 4-feb … mar 27-abr, mismo orden) · **extensión 128 mié 28-abr → vie 24-sep** (86 · 22 · 20; Tier C ext **21**: se cae Genética vuelta 3) · `MIR_MANT_DIAS` **185** |
> | Secundarios (§E) | Research c1 jue 8-oct → mié 3-mar · c2 vie 5-mar → sáb 21-ago (R43 sáb 17-jul) · Derma c1 → mié 5-may, c2 vie 7-may → mié 14-jul · AURUM → jue 15-abr · SYNAPSE → lun 15-feb · vibecoding → vie 19-feb · LIVIANO → vie 12-feb · Business → jue 4-feb | Research c1 **lun 12-oct → vie 5-mar** · c2 **mar 9-mar → mar 24-ago** (R43 **mar 20-jul**) · Derma c1 **mar 13-oct → lun 10-may** (alivio d44-d49 vie 12 → vie 26-feb), c2 **mié 12-may → lun 19-jul** · AURUM **→ mar 20-abr** · SYNAPSE **→ vie 19-feb** · vibecoding **→ mié 24-feb** (SHIP S12 sáb 9-ene) · LIVIANO **→ mié 17-feb** · Business **→ mar 9-feb** |
> | Overlays 🔬 (§E, §G3) | M1 14-oct · C-2 22-oct · T-1 26-oct · C-6 11-nov · CR-1 17-nov · T-8 17-dic · X-1 23-dic · CR-8 8-ene · CR-9 11-feb · X-9 jue 11-mar · R10 vie 19-mar · R43 sáb 17-jul | M1 **vie 16-oct** · C-2 **lun 26-oct** · T-1 **mié 28-oct** · C-6 **vie 13-nov** · CR-1 **jue 19-nov** · T-8 **lun 21-dic** · X-1 **mar 29-dic** · CR-8 **mar 12-ene** · CR-9 jue 11-feb (=) · X-9 **mié 17-mar** · R10 **mar 23-mar** · R43 **mar 20-jul** |
> | V3 / V4 (§H) | D1 2026-10-07 (Research d1 2026-10-08) · MIR 78 + 57 + 131 · Research c2 fin 2027-08-21 · Derma fin 2027-05-05 / 2027-07-14 · AURUM fin 2027-04-15 | D1 **2026-10-12** en USMLE/ENCAPS/MIR/Research (Derma d1 **2026-10-13**) · MIR 78 + 57 + **128** · Research c2 fin **2027-08-24** · Derma **2027-05-10 / 2027-07-19** · AURUM **2027-04-20** |
> | Generadores (§E, §H) | START `2026-10-07` | START **`2026-10-12`** (= `f1.inicio`, por defecto en los generadores ENCAPS; `remap_inicio.js 2026-10-12`) |
> | Calendar (§G) | ids y fechas de §G1-§G3 | v6.01 en `cal/CAL_V6.md` §9 (lote aparte) |

**Fecha:** mar 6-oct-2026 · **Revisión r2** (post-crítica «números y fechas» + «implementabilidad», mismo día; ver el **Registro de cambios por la crítica** al final) · **Vigente desde:** mié 7-oct-2026 (D1) *(⏸ v6.00 · ⏸ v6.01: D1 lun 12-oct-2026, ver ADDENDUM · **v6.02:** D1 lun 19-oct-2026, ver ADDENDUM v6.02)* · **Sustituye a:** v5.20 (examen Step 1 lun 22-feb, ENCAPS mié 10-mar).
**Base:** `v600/PROPUESTA_V6.md` + DECISIONES FINALES DE JOSEPH (DJ-1…DJ-5, 6-oct). Donde esta espec y la propuesta difieran, **manda esta espec** (las diferencias están marcadas «≠ propuesta»).
**Estado actual (v5.20) leído hoy en solo-lectura:** `v520/V520_TABLA.md`, `v520/facts_v520.md`, Supabase (`study_schedule` ENCAPS: MANTENIMIENTO 1-92 = 75 `banqueo1h` + 17 `mini_sim`; INTENSIVO 97-107; PK `(examen, dia)`; `study_metrics.extra.exam_date = 2027-03-10`), Calendar (series vivas y sus `RRULE`) y el repo (`src/lib/*`, `DATA/_scripts/*`).

**Todas las fechas y cifras salen de scripts node en `v600/espec/`** (reproducibles; ver Anexo C):
`cal.js` (calendario, feriados) · `a_maestro.js` (§A) · `a_tabla.js` (escenarios y fecha a reservar) · `b_horas.js` + `b_gate.js` (§B4) · `gen_tramo2_ref.js` (§B3, **implementación de referencia** del tramo 2, r2; salida `tramo2_14mar_27sep.json/.md`) · `v1_check.js` (V1) · `c_encaps.js` (§C3) · `e_secundarios.js` + `e2.js` (§D/§E; reproducen v5.20 **exacto** antes de calcular v6). Las versiones previas a la crítica quedan como `*_r1.*` (solo trazabilidad).

**Convenciones**
- Fechas `AAAA-MM-DD`; día de la semana siempre calculado (Lima, sin DST). «hábil» = L-V salvo `SKIP`. «día de plan» = L-V en F1-F3, **L-S en F4** (DJ-3).
- **[S]** = supuesto con disparador en §I. Todo lo demás es regla o dato.
- Reglas heredadas que siguen: R1 nada se fusiona ni se recorta (multiset de contenido = 0) · nada se borra: se re-fecha · backups antes de cada siembra · crear antes de borrar en el Calendar · **borrar series/eventos del Calendar requiere OK explícito de Joseph** · agentes de 2 en 2 · commit/push solo con OK.

---

## §0. Números clave

| Concepto | Valor |
|---|---|
| F1 Step 1 tramo 1 + ENCAPS lento | **mié 7-oct → mié 30-dic-2026** · 60 sesiones L-V (D1-D60) *(⏸ v6.00 · ⏸ v6.01: lun 12-oct → mié 30-dic · 57 sesiones D1-D57 · **v6.02:** lun 19-oct → mié 30-dic · 52 sesiones d 1-52 (slots; d 1-51 = v5.20 D1-D51, d52 = NBME 28))* |
| Transición | jue 31-dic → dom 3-ene (sin sesión) |
| F2 ENCAPS intensiva | **lun 4-ene → dom 14-mar-2027 PROVISIONAL** · 50 hábiles (`dia` 61-110) *(⏸ v6.00 · ⏸ v6.01: `dia` 58-107, mismas fechas · **v6.02:** `dia` 53-102, mismas fechas)* · Step 1 en mantenimiento (38,5 h) |
| Lunes libre post-ENCAPS | lun 15-mar (protegido) |
| F3 Step 1 tiempo completo | **mar 16-mar → vie 30-abr** · 32 hábiles · ≈176 h productivas |
| F4 Step 1 + SERUMS [S] | **lun 3-may → sáb 25-sep** · 126 días de plan L-S (21 sábados) · domingo LIBRE |
| Step 1 | **examen lun 27-sep-2027** (D-1 = dom 26-sep viaje a Lima) · GO/NO-GO **lun 9-ago (E-49)** |
| Horas Step 1/semana en el SERUMS (efectivas, L-S) | **PISO 15,75** (todo turno M, bloque B al 25 %) · **M 18,0** · **MIX 22,5** (50 % T) · **T 27,1** — brutas 22,5 (M) / 28,5 (T) |
| Colchón al D-1 del 27-sep (ENCAPS 14-mar) | PISO **+99 h** · M +142 · MIX +228 · T +314 (meta 399 h desde el reinicio) |
| Ventana DJ-1 (fecha a RESERVAR) | **Tabla literal:** ENCAPS 14 o 21-mar → **mar 31-ago** · 4 u 11-abr → **lun 27-sep** · 18 o 25-abr → **lun 25-oct**. Es también la regla de cálculo de §B4.4 («la fecha más temprana con colchón PISO ≥ 0 **y** déficit 0 del tramo 2»), que *(⏸ v6.00 · v6.01)* daba la misma tabla con SERUMS 3-may o 6-may. Márgenes al piso más justos: 21-mar→31-ago **+7 h** y 11-abr→27-sep **+0 h** (los vigila el GO/NO-GO por horas, §B4.5) · ⚠ **v6.02: con la F1 de 52 la regla de cálculo (`node DATA/_scripts/gen_fechas_v6.js --check --calculo`) ya NO coincide con la tabla literal: ENCAPS 21-mar → lun 27-sep (literal 31-ago) · 11-abr → lun 25-oct (literal 27-sep) · 25-abr → ninguna de DJ-1 (extensión); el escenario vigente (14-mar → 31-ago; examen elegido lun 27-sep) no cambia. El JSON conserva la tabla literal DJ-1; en el disparador (1) (convocatoria) se corre `--calculo` y manda la más tardía, avisando a Joseph (`DATA/PENDIENTES_JOSEPH.md`, (vi))** |
| Tramo 2 (escenario base) | 158 filas T1-T158 (`d` 101-258) · 37 filas-origen v5.20 + tipos nuevos · 40 filas COLCHÓN (≈105 h al piso) *(⏸ v6.00 · ⏸ v6.01: 38 filas-origen · 38 filas COLCHÓN ≈ 100 h · **v6.02:** 43 filas-origen (6 desplazadas de F1) · 28 filas COLCHÓN ≈ 73,5 h)* · todas con los campos de `DiaUSMLE` |
| MIR | diario 78 d (7-oct → 27-ene) · mantenimiento 57 filas (28-ene → jue 22-abr) · **extensión 131 filas vie 23-abr → vie 24-sep** (6 L-V + 125 L-S) *(⏸ v6.00 · ⏸ v6.01: diario lun 12-oct → lun 1-feb · mant mar 2-feb → mar 27-abr · extensión 128 mié 28-abr → vie 24-sep · **v6.02:** diario lun 19-oct → lun 8-feb · mant mar 9-feb → mar 4-may · extensión 123 mié 5-may → vie 24-sep)* · 1 h/día siempre |

---

## §A. Calendario maestro

### A1. Fases

| Fase | Desde | Hasta | Días de plan | Bloque principal | Secundarios (DJ-4) |
|---|---|---|---|---|---|
| **F1** | mié 7-oct-2026 | mié 30-dic-2026 | 60 L-V (D1-D60) *(⏸ v6.00 · ⏸ v6.01: lun 12-oct · 57 L-V D1-D57 · **v6.02:** lun 19-oct · 52 L-V d 1-52 (slots; d 1-51 = v5.20 D1-D51, d52 = NBME 28))* | Step 1 6h15 (05:00 · 07:15-12:00 · 18:00) + ENCAPS 1 h 16:15 | como hoy (v5.20): SYNAPSE 30' · R↔D 45' · AURUM 60' · MIR 60' · LIVIANO 45' · vibecoding 45' · Business |
| Transición | jue 31-dic | dom 3-ene | 0 | libre (Anki opcional) | — |
| **F2** | lun 4-ene-2027 | día previo al ENCAPS (provisional vie 12-mar; examen **dom 14-mar**) | 50 L-V (14-mar) | ENCAPS intensiva (≈32 h/sem) + Step 1 mantenimiento (Anki 30' L-V + sáb 07:45-09:15 20Q) | MIR 60' · R↔D 45' · **AURUM 30'** · SYNAPSE 30' (→ lun 15-feb) · LIVIANO 45' (→ vie 12-feb) · vibecoding 45' (→ vie 19-feb) *(⏸ v6.00 · ⏸ v6.01: SYNAPSE → vie 19-feb · LIVIANO → mié 17-feb · vibecoding → mié 24-feb · **v6.02:** SYNAPSE → vie 26-feb · LIVIANO → mié 24-feb · vibecoding → mié 3-mar)* |
| Libre | lun siguiente al ENCAPS (15-mar) | — | 0 | **protegido** (DJ-2) | ninguno |
| **F3** | **martes siguiente al ENCAPS** (mar 16-mar) | día previo al inicio real del SERUMS (vie 30-abr) | 32 L-V | Step 1 tiempo completo 7h15 (F1 + 16:15 REENTRADA) | MIR 60' · R↔D 45' · AURUM 30' (→ jue 15-abr) *(⏸ v6.00 · ⏸ v6.01: AURUM → mar 20-abr · **v6.02:** AURUM → mar 27-abr)* |
| **F4** | inicio SERUMS [S] lun 3-may | sáb 25-sep (= **ritual**: último día de plan anterior a E−1; último día con estudio: vie 24-sep) | 126 **L-S** | SERUMS 6 h (turno M o T variable) + Step 1 por plantilla de turno (§B4) | **MIR 60' según turno** · R↔D **30' en tiempo muerto** de la posta |
| Examen | dom 26-sep viaje | **lun 27-sep** examen · mar 28-sep regreso | — | — | — |
| F5 (esbozo) | mar 28-sep-2027 | fin del SERUMS (~abr-2028) | — | MIR principal | CURVA/DENSA, Derma c2+, etc. |

- Antes del SERUMS: **sábado y domingo libres** (salvo sáb 07:15-09:15 de F2/F3: revisión semanal 30' + Step 1 vivo 90' en F2). Desde el SERUMS: **sábado = día de plan; solo el DOMINGO libre** (sin bloque largo dominical; Anki ≤15' opcional que no se registra).
- Sueño 21:00→04:00 y gimnasio/baile innegociables en todas las fases (en turno T el gimnasio va 06:10-07:00; en día de hito, plantillas H / H-sáb de §B4.1; el baile queda en días M y en la serie BAILE dominical que ya existe).

### A2. Feriados y días sin sesión (node, `cal.js`)

- **Feriados que SÍ son sesión en F1:** jue 8-oct, mar 8-dic, mié 9-dic (como v5.20).
- **SKIP (sin sesión de ningún plan) v6:** `2026-12-25, 2026-12-31, 2027-01-01, 2027-03-25, 2027-03-26` (Jueves y Viernes Santo 2027 se AÑADEN; v5.20 solo tenía los tres primeros).
- Feriados 2027 dentro de F4 (son **días de plan**: si la posta no programa turno → plantilla L = día doble): lun 7-jun · mar 29-jun · vie 23-jul · mié 28-jul · jue 29-jul · vie 6-ago · lun 30-ago (y vie 8-oct en el plan B). sáb 1-may cae antes del SERUMS.

### A3. Días protegidos (sin sesión de MIR, Research, Derma, AURUM; Step 1 solo lo indicado)

| Fecha | Motivo | Step 1 | ENCAPS |
|---|---|---|---|
| vie 12-mar | D-1 hábil del ENCAPS (cola: medio día) | pausa | medio día |
| sáb 13-mar | D-1 real del ENCAPS | — | descanso |
| dom 14-mar | **ENCAPS (provisional)** | — | examen |
| lun 15-mar | lunes libre post-ENCAPS (DJ-2) | libre | — |
| (a fijar) | adjudicación SERUMS (Zoom, obligatoria) y entrega de documentos/inducción EsSalud | el que se fije | — |
| sáb 25-sep | ritual de test-day (sin estudio) = último día de plan anterior a E−1 | ritual | — |
| dom 26-sep | D-1 · viaje a Lima | viaje | — |
| lun 27-sep | **EXAMEN Step 1** | examen | — |

- Lista única en `_fechas_v6.json → protegidos` (§A4). **Se eliminan** los protegidos v5.20 `2027-02-22, 2027-03-09, 2027-03-10`.
- Regla general (para cualquier escenario): protegidos = {último hábil antes del ENCAPS, D-1, día del ENCAPS, lunes siguiente} ∪ {**ritual = último día de plan anterior a E−1**, E−1 (viaje), E (examen)} ∪ {adjudicación}. Con el adelanto (mar 31-ago): ritual sáb 28-ago, viaje lun 30-ago (feriado), examen mar 31-ago. Con el plan B: sáb 23-oct, dom 24-oct, lun 25-oct. (r2: la fórmula {E−2, E−1, E} queda prohibida: con examen en martes E−2 es domingo y dejaba una fila MIR el día del ritual.)
- Filas legítimas en fecha protegida (únicas; V3 las exceptúa): ENCAPS `medio_dia` del D-1 hábil (vie 12-mar, dia 110) y USMLE `ritual` (sáb 25-sep, T158). Ningún otro plan tiene fila en un protegido.
- MIR en el vie 12-mar: protegido como en v5.20 (allí lo era el D-1 del ENCAPS, mar 9-mar); si Joseph prefiere su hora de MIR esa tarde (el ENCAPS es medio día), se quita del set de MIR (§I).

### A4. Fuente única de fechas

Crear `DATA/_scripts/_fechas_v6.json` (la leen TODOS los generadores) y `DATA/_scripts/gen_fechas_v6.js`, que escribe `src/lib/fechasV6.ts` (GENERADO; la app lo importa; no editar a mano). Contenido exacto:

> ⏸ v6.00: contenido inicial del JSON. **v6.01 (10-oct):** `"version": "v6.01"`, `"f1": { "inicio": "2026-10-12", "fin": "2026-12-30", "dias": 57 }` y bloque nuevo `"corrimientos": [{ "fecha": "2026-10-10", "version": "v6.01", "d1_previo": "2026-10-07", "d1": "2026-10-12", "perdidos": ["2026-10-07","2026-10-08","2026-10-09"], "regla": … }]`; el resto sin cambio. **v6.02 (17-oct):** `"version": "v6.02"`, `"f1": { "inicio": "2026-10-19", "fin": "2026-12-30", "dias": 52 }` y 2.º elemento de `"corrimientos"`: `{ "fecha": "2026-10-17", "version": "v6.02", "d1_previo": "2026-10-12", "d1": "2026-10-19", "perdidos": ["2026-10-12" … "2026-10-16"], "regla": "F1 anclada … los hitos F1 NO se desplazan … las 6 filas de temario que no caben (v5.20 D52-D54, D56, D57 + D79) pasan al tramo 2 como filas desplazadas con su dOrig …" }`; el resto sin cambio.

```json
{
  "version": "v6.00", "decidido": "2026-10-06",
  "f1": { "inicio": "2026-10-07", "fin": "2026-12-30", "dias": 60 },
  "transicion": { "desde": "2026-12-31", "hasta": "2027-01-03" },
  "encaps": { "examen": "2027-03-14", "provisional": true, "intensiva_desde": "2027-01-04", "pretest": "2027-01-08",
              "nucleo_hasta": "2027-03-05", "convocatoria_tope": "2027-02-17",
              "escenarios": ["2027-03-14", "2027-03-21", "2027-04-04", "2027-04-11", "2027-04-18", "2027-04-25"] },
  "step1": { "reinicio": "2027-03-16", "examen": "2027-09-27", "adelanto": "2027-08-31", "planB": "2027-10-25",
             "gonogo": "2027-08-09", "eligibility": "2027-08..2027-10", "viaje_d1": "2027-09-26", "ritual": "2027-09-25", "provisional": true,
             "reserva_por_encaps": { "2027-03-14": "2027-08-31", "2027-03-21": "2027-08-31", "2027-04-04": "2027-09-27",
                                     "2027-04-11": "2027-09-27", "2027-04-18": "2027-10-25", "2027-04-25": "2027-10-25" } },
  "serums": { "inicio": "2027-05-03", "supuesto": true, "dias_plan": "L-S", "domingo": "libre", "adaptacion_hasta": "2027-05-16" },
  "skip": ["2026-12-25", "2026-12-31", "2027-01-01", "2027-03-25", "2027-03-26"],
  "protegidos": [
    { "fecha": "2027-03-12", "motivo": "D-1 hábil ENCAPS" }, { "fecha": "2027-03-13", "motivo": "D-1 ENCAPS" },
    { "fecha": "2027-03-14", "motivo": "ENCAPS (provisional)" }, { "fecha": "2027-03-15", "motivo": "lunes libre post-ENCAPS" },
    { "fecha": "2027-09-25", "motivo": "ritual test-day" }, { "fecha": "2027-09-26", "motivo": "viaje D-1" },
    { "fecha": "2027-09-27", "motivo": "EXAMEN Step 1" } ],
  "feriados": ["2026-10-08", "2026-11-01", "2026-12-08", "2026-12-09", "2026-12-25", "2027-01-01", "2027-03-25", "2027-03-26",
               "2027-05-01", "2027-06-07", "2027-06-29", "2027-07-23", "2027-07-28", "2027-07-29", "2027-08-06", "2027-08-30", "2027-10-08"]
}
```

Derivaciones (código, no a mano): `reinicio = primer martes > encaps.examen` (vale para examen en sábado o domingo); `f3.fin = día hábil anterior a serums.inicio`; `adaptacion_hasta = serums.inicio + 13 d` (dos semanas naturales; el último día de plan de la inducción es el sábado anterior); `ritual = último día de plan < step1.examen − 1`; `protegidos` según A3; `gonogo = step1.examen − 49 d`; `convocatoria_tope = encaps.examen − 25 d`. **`gen_fechas_v6.js` exporta estas funciones de derivación** (las usan todos los generadores node y se emiten en `fechasV6.ts`) y **aborta si un valor guardado en el JSON** (`reinicio`, `gonogo`, `ritual`, `viaje_d1`, `protegidos`, `adaptacion_hasta`, `convocatoria_tope`, `reserva_por_encaps[encaps.examen]`) **difiere del derivado**. `fechasV6.ts` (módulo HOJA: no importa nada de `src/`) exporta además `FASES_V6` (tabla A1 con fechas resueltas), `DIAS_PROTEGIDOS: Set<string>`, `SKIP_V6`, `esDiaPlan(iso)`, `faseV6(iso)`, **`type Turno = 'M'|'T'|'L'|'G'`**, **`STEP1_SEMANAS` y `semanaStep1(iso)`** (movidos aquí desde `homeBriefing` para cortar el ciclo de importación, §F).

### A5. Escenarios del ENCAPS (todo se recalcula desde `encaps.examen`)

| ENCAPS (dom) | Hábiles F2 · `dia` | Módulos de extensión | Cola D-5…D-1 (dress jue · medio día vie) | SIM 100Q tras el pre-test | Sin convocatoria al… → descartado | Lunes libre · **reinicio** | F3 hábiles · h | NBME 29 | Pausa Step 1 | Fecha a RESERVAR (§B4.4) | `STEP1_SEMANAS` | Tramo 2 (filas · colchón) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **14-mar** | 50 · 61-110 | 0 | lun 8 → vie 12-mar | 8 | mié 17-feb | lun 15 · **mar 16-mar** | 32 · 176 h | mié 17-mar | 10,7 sem | **31-ago** (piso +34 · M +68 · déficit 0) — base de planificación 27-sep | 37 (31-ago) / **41** (27-sep) | 134 · 18 f (31-ago) / **158 · 40 f** (27-sep) |
| 21-mar | 55 · 61-115 | 1 (lun 8 → vie 12-mar) | lun 15 → vie 19-mar | 9 | mié 24-feb | lun 22 · mar 23-mar | 27 · 149 h | mié 24-mar | 11,7 | **31-ago** (piso **+7** · M +41 · déficit 0) | 36 | 129 · 8 f |
| 4-abr | 63 · 61-123 | 2,6 (13 d) | lun 29-mar → vie 2-abr | 10 (+1 mié 24-mar) | mié 10-mar | lun 5 · mar 6-abr | 19 · 105 h | mié 7-abr | 13,7 | **27-sep** (piso +28 · M +71) · el 31-ago no: piso −37, déficit 4 u | 38 | 145 · 14 f |
| 11-abr | 68 · 61-128 | 3,6 (18 d) | lun 5 → vie 9-abr | 11 (+1) | mié 17-mar | lun 12 · mar 13-abr | 14 · 77 h | mié 14-abr | 14,7 | **27-sep** (piso **+0** · M +43) · el 31-ago no: déficit 9 u | 37 | 140 · 4 f |
| 18-abr | 73 · 61-133 | 4,6 (23 d) | lun 12 → vie 16-abr | 12 (+1) | mié 24-mar | lun 19 · mar 20-abr | 9 · 50 h | mié 21-abr | 15,7 | **25-oct** (piso +38 · M +90) · el 27-sep no: piso −27 **y déficit 3 u** (faltarían D84, D86, D88) | 40 | 159 · 18 f |
| 25-abr | 78 · 61-138 | 5,6 (28 d) | lun 19 → vie 23-abr | 13 (+1) | mié 31-mar | lun 26 · mar 27-abr | 4 · 22 h | mié 28-abr | 16,7 | **25-oct** (piso +10 · M +62) | 39 | 154 · 8 f |

(r2: el colchón al 31-ago se recalculó con el D-1 = 0 h; los valores de 27-sep y 25-oct no cambian. `node a_tabla.js` reproduce la tabla; `SERUMS=2027-05-06 node a_tabla.js` da las mismas fechas a reservar.) *(⏸ v6.00: columna `dia` 61-N. ⏸ v6.01: réstese 3 → 58-107 / 58-112 / 58-120 / 58-125 / 58-130 / 58-135 (mismas fechas); columna «Tramo 2» del 27-sep: 158 · 38 f. **v6.02:** réstese 8 → 53-102 / 53-107 / 53-115 / 53-120 / 53-125 / 53-130 (mismas fechas); columna «Tramo 2» del 27-sep: 158 · **28 f**; ⚠ con la F1 de 52 la regla da otra fecha a RESERVAR para 21-mar (27-sep), 11-abr (25-oct) y 25-abr (ninguna ≤ 25-oct): ver ADDENDUM v6.02 y PENDIENTES v6.02 (vi).)*

Mientras no salga la convocatoria **todo se genera con ENCAPS 14-mar y examen Step 1 27-sep** (objetivo DJ-1); la columna «Fecha a RESERVAR» se aplica al salir la convocatoria (§B4.4). Al cambiar `encaps.examen` en el JSON (disparador: convocatoria o descarte por la regla de los 25 días, §I) se regeneran, en este orden y **una sola vez**: ENCAPS filas ≥ lun 8-mar (`gen_encaps_intensivo_2027.js --desde 2027-03-08`: módulos + cola) → protegidos → MIR/Research/Derma/AURUM → tramo 2 (con el nuevo `reinicio`; siempre ANTES del reinicio, así que sin congelado: el descarte del 14-mar es el 17-feb, el del 21-mar el 24-feb, el del 4-abr el 10-mar…) → Calendar (series de extensión F2 + eventos sueltos re-fechados, §G2; F3; NBME 29; overlays). Las filas ENCAPS ≤ 5-mar, F1 y los hitos de F1 **no se tocan**. Semana Santa (25-26-mar) dentro de F2: sin sesión; el SIM de esa semana va el **mié 24-mar** (regla: en una semana con día sin sesión el `sim100` va al último hábil de la semana).

---

## §B. USMLE Step 1

### B1. Tramo 1 (F1, D1-D60, mié 7-oct → mié 30-dic) *(⏸ v6.00 · ⏸ v6.01: D1-D57, lun 12-oct → mié 30-dic; ver ADDENDUM · **v6.02:** d 1-52 (slots; d 1-51 = v5.20 D1-D51, d52 = NBME 28), lun 19-oct → mié 30-dic, con los hitos anclados; ver ADDENDUM v6.02)*

**D1-D57: idénticos a v5.20** (fecha, contenido, `nivelUW`, `qDia`, `franjaNota`) — el mapa D#→fecha de `facts_v520.md` sigue igual hasta el D57 (jue 24-dic). *(⏸ v6.00 · ⏸ v6.01: D1-D57 conservan contenido y D# pero corren a lun 12-oct → mié 30-dic; `nivelUW`/`qDia` re-derivados (11 cambian); D57 = mié 30-dic · **v6.02:** d 1-51 = v5.20 D1-D51 (mismo D#) corren a lun 19-oct → mar 29-dic y **d 52 = NBME 28** (v5.20 D55) mié 30-dic; `nivelUW`/`qDia` re-derivados (9 difieren de v5.20); D52-D54, D56 y D57 pasan al tramo 2 (T3-T7))* Los 5 hitos conservan D# y fecha; **solo cambia su horario**:

| Hito | D | Fecha | v5.20 | **v6** | Calendar id (se conserva) |
|---|---|---|---|---|---|
| UWSA1 | D1 | mié 7-oct | 09:00-13:00 | **09:00-13:00 (sin cambio)** — el `sub` de D1 (idéntico a v5.20) dice 09:00-13:00 y el Lote 5 no llega antes de las 08:00 del 7-oct | `o1gla7846uae4tgngvc4q45osg` |
| NBME 25 | D10 | mar 20-oct | 07:15-11:00 | **07:00-12:30** (4×50Q×75' = 5 h netas; ese día sin las 30Q de las 11:00) | `4hjv5lkvluj06ahc2qndtsi6as` |
| NBME 26 | D25 | mar 10-nov | 07:15-11:00 | **07:00-12:30** | `lr7ktrbiffj4hrlke7lh7cv6h4` |
| NBME 27 | D40 | mar 1-dic | 07:15-11:00 | **07:00-12:30** | `sm4baa2v453ifaub325h9v08mg` |
| NBME 28 | D55 | mar 22-dic | 07:15-11:00 | **07:00-12:30** · checkpoint de fecha (§B5) | `ecu784689p8osrhqabuct8d5jg` |

En `gen_usmle_v5.js` → `SIMS`: el paréntesis de hora de los `sub` de D10/D25/D40/D55 pasa de `(07:15-11:00)` a `(07:00-12:30)` (el multiset normaliza ese paréntesis, §H). *(⏸ v6.00 · ⏸ v6.01: mismos D# y horas; fechas UWSA1 lun 12-oct · NBME 25 vie 23-oct · 26 vie 13-nov · 27 vie 4-dic · 28 lun 28-dic · **v6.02:** mismas horas; UWSA1 D1 lun 19-oct · NBME 25 D10 vie 30-oct · 26 D25 vie 20-nov · 27 D40 vie 11-dic · **28 = d52 mié 30-dic** (hito anclado: último slot de F1))*

**Único cambio de contenido de F1: D58-D60 (semana deload lun 28 → mié 30-dic).** *(⏸ v6.00 · ⏸ v6.01: no hay D58-D60: C1/C2 consumidos y la bioestadística (esta D58) pasa al tramo 2, T3 jue 18-mar · **v6.02:** tampoco hay D58-D60, y además D52-D54, D56 y D57 (Heme/Onco) pasan al tramo 2 para que el NBME 28 quede dentro de F1 (bioestadística = T8 lun 29-mar))*

| D | Fecha | v5.20 (dOrig) | **v6** | nivelUW · qDia |
|---|---|---|---|---|
| D58 | lun 28-dic | D58 Bacteriología general + genética bacteriana + Gram+ cocos | **fila v5.20 D79 copiada tal cual** (`system:'Psychiatry & Behavioral'`, sub «Bioestadística + epidemiología + ética/comunicación (AMBOSS HY 155Q)», mismo bbCh/bbVid/uw/mat/matType/palm) | 1 · 30 (regla del generador: 1.ª fila del sistema) |
| D59 | mar 29-dic | D59 Gram+ bacilos + anaerobios + Gram− cocos | **C1 · COLCHÓN F1** (fila nueva): `system:'Colchón'`, `tier:'CORE'`, sub «C1 · COLCHÓN F1: si se perdió un día de D1-D58 → hacerlo hoy (el más antiguo); si no → 2.ª pasada de incorrectas de los 9 sistemas (40Q timed) + cerrar Anki antes de la pausa», `bbCh:'Colchón'`, `bbVid:'—'`, `uw:'uWorld incorrects (9 sistemas F1)'`, `mat:'uWorld + Anki'`, `matType:'clin'`, `palm:null` | 4 · 40 |
| D60 | mié 30-dic | D60 Gram− bacilos + zoonosis | **C2 · COLCHÓN F1** (igual que C1 con «C2») | 4 · 40 |

`nivelUW`/`qDia` de C1/C2 = 4 · 40 por **excepción explícita** en `gen_usmle_v5.js`: la regla `posSistema` les daría 1 · 30 por ser las primeras filas del sistema 'Colchón'.

- **Pasan al tramo 2** (contenido íntegro, se re-fecha): D58, D59, D60, D61, D62, D63, D64 (Microbiología completa, 7) · D66-D70 (Repro 5) · D71, D73, D74 (MSK 3) · D75, D76, D78 (Psiq 3) · D80, D81 (Bioq 2) · los hitos D65, D72, D77, D82, D83, D85, D87 · los días de banco/sprint D84, D86, D88-D95. **D79 queda en F1 (D58).** *(⏸ v6.00 · ⏸ v6.01: D79 pasa al tramo 2 como fila desplazada T3 jue 18-mar (`uid C79`, `dOrig 79`); 38 `dOrig` en el tramo 2 · **v6.02:** pasan además D52, D53, D54, D56 y D57 → 6 desplazadas T3-T8 (D79 = T8 lun 29-mar, `uid C79`); 43 `dOrig`; D55 (NBME 28) queda en F1 como d52)*
- Regla de colchón F1: C1/C2 absorben los 2 primeros días perdidos (se hace el D más antiguo no hecho; un hito F1 perdido tiene prioridad en C1/C2). Desde el 3.er día perdido: el contenido no hecho **pasa al tramo 2** como fila extra de cola-adelante (se inserta al principio de la cola, antes de Micro); el lun 4-ene **no se mueve**. Si se pierden ≥3, la bioestadística (D58) es la primera que pasa. Mecánica: disparador **(f)** de §B7.2 — el jue 31-dic, una sola vez, se leen las filas `d ≤ 58` sin ✓ en `plan_checks('usmle', d)` (descontando las que cubrieron C1/C2) y se regenera el tramo 2 con `--pendientes-f1 <d,…>` (filas «RECUPERACIÓN F1 (Dn no hecho)», campo `dF1`, sin `dOrig` → no alteran V1).
- Gates de cumplimiento del núcleo F1: **vie 30-oct (D18)** y **vie 27-nov (D38)** *(⏸ v6.00 · ⏸ v6.01: D18 mié 4-nov y D38 mié 2-dic · **v6.02:** D18 mié 11-nov y D38 mié 9-dic)*: si núcleo hecho < 85 % → los secundarios (salvo MIR) bajan a 30' (DJ-4: nunca a 0) hasta 2 semanas ≥ 90 %.
- Cobertura al 30-dic: 9 sistemas + bioestadística · ≈64 % del banco UWorld por sistema · ~1.900-2.000 Q UWorld usadas (≈2.010 planificadas) · 375 h brutas. *(⏸ v6.00 · ⏸ v6.01: 57 sesiones ≈ 356 h brutas; uWorld FRESCO F1 1.900 (la bioestadística consume sus 30 en el tramo 2) · **v6.02:** 52 sesiones ≈ 325 h brutas; Fundamentos + 7 sistemas + Heme/Onco solo D51; uWorld FRESCO F1 1.710)* Presupuesto de UWorld FRESCO del año: §B3.

### B2. Mantenimiento F2 (lun 4-ene → sáb antes del ENCAPS)

- **Anki USMLE 05:15-05:45 L-V** (30'): 0 tarjetas nuevas desde el jue 31-dic; FSRS retención 0,85 desde el lun 4-ene → vuelve a 0,90 el día del reinicio.
- **Sábado 07:45-09:15 «STEP 1 VIVO»** (tras la revisión semanal 07:15-07:45): 20Q timed MEZCLADAS de los 9 sistemas de F1 + bioestadística (10 incorrectas de UWorld + 10 nuevas de AMBOSS, para no gastar UWorld) + revisión. Escenario 14-mar: 9 sábados (sáb 9-ene → sáb 6-mar; el sáb 13-mar es D-1 ENCAPS → no).
- Domingo: libre; Anki ≤15' opcional.
- Sin NBME/UWSA en F2. Coste: 38,5 h (14-mar) · 42,5 (21-mar) · 49,5 (4-abr) · 53,5 (11-abr) · 57,5 (18-abr) · 61,5 (25-abr). **No cuentan** para el paquete de 399 h.
- En la app: estado **PAUSA** (§F); `planHoyD` NO debe mostrar T1 como «hoy» durante la pausa.

### B3. Tramo 2 (desde el reinicio hasta el examen)

**Modelo de datos.** Array nuevo `DIAS_T2: DiaUSMLE_T2[]` en `usmleStep1Daily.ts` (generado por `gen_usmle_v5.js` + `assemble_usmle_ts.js`), una fila por **día de plan**, con:
`t` (1…n) · `d = 100 + t` (clave de progreso `plan_checks('usmle', d)`; no colisiona con D1-D60; **estable**: una regeneración nunca cambia el contenido de un `d` ya pasado, §B7.5) · `fecha` · `fase:'F3'|'F4'` · `faseUW:'A'|'B'|'C'` · `tipo` · `dOrig: number|null` (D de v5.20) · `uid?` (unidad de cola: `C58`…, `REF0/1`, `RX-<sistema>-<k>`, `UR84`/`URn1`…, `IN90`/`INn1`…, `CO92`/`COpathoma`…; lo usa la regeneración con congelado) · `parte: 'k/n'|null` · `qDia` (turno M/L/G) · `qDiaT?` (turno T = `qDia` + 40; solo filas F4 no ancladas y anteriores al Free 120) · `nivelUW` · `h` (horas-plan al piso) · `subV520` (texto v5.20 literal en filas con `dOrig`) · `adapt?: true` (inducción) · `ventana?: [ini, fin]`, `nombre` y `forma` (hitos; `forma` = dOrig o `'UWSA3'`) · `gate?: 'GO/NO-GO (E-49)' | 'GO/NO-GO #2 (E-49)'` · `dF1?` (recuperación de F1) · `pendiente?: true` · y **todos** los campos de `DiaUSMLE` (`system, tier, sub, bbCh, bbVid, uw, mat, matType, palm, franjaNota?`).
**Precedencia (r2):** en filas con `dOrig`, `system, tier, bbCh, bbVid, uw, mat, matType, palm` se **copian de la fila v5.20 sin reetiquetar** (p. ej. D83 sigue `system:'Sprint final'`, D84 `'Banco intensivo'`), y el `sub` es nuevo pero **contiene** el texto v5.20: hitos = la misma frase v5.20 con la hora nueva dentro del mismo paréntesis + sufijos v6 (ventana, turno, notas); contenido partido = prefijo «PARTE k · …»; banco/consolidación partidos = sufijo «· parte k/n». En filas sin `dOrig`, los campos salen de la tabla de valores por defecto de abajo. `DIAS_TODOS = [...DIAS, ...DIAS_T2]`.

**Valores por defecto de `DiaUSMLE` en filas sin `dOrig`** (todas `palm:null`, `bbVid:'—'`)
| tipo | system | tier | bbCh | uw | mat | matType |
|---|---|---|---|---|---|---|
| reentrada | Reentrada | CORE | Repaso mixto F1 | AMBOSS timed mixto (9 sistemas F1) + incorrectas uWorld | AMBOSS + uWorld + Anki | clin |
| hito UWSA3 | Assessment | CORE | Assessment | uWorld Self-Assessment 3 | uWorld UWSA3 | clin |
| day_after | Assessment | CORE | Assessment | Revisión del hito (sin preguntas nuevas) | Informe del hito + First Aid + Anki | clin |
| refuerzo | Psychiatry & Behavioral | HIGH | Biostats/Epi | Ethics & communication / Biostatistics & epidemiology | AMBOSS HY + uWorld / First Aid + uWorld | behav |
| reactivacion | (el sistema) | CORE | Reactivación | uWorld incorrectas/flagged del sistema + AMBOSS (bloques timed) | uWorld + AMBOSS + First Aid/Pathoma + Anki | clin |
| uw_random (nuevas) | Banco intensivo | CORE | Banco | uWorld timed random (FRESCO) | uWorld + First Aid + Anki | clin |
| incorrectas (nuevas) | Banco intensivo | CORE | Banco | uWorld incorrects | uWorld + First Aid + Anki | clin |
| consolidacion (nuevas) | Sprint final | CORE | Sprint | First Aid / Pathoma rapid review + flagged | First Aid + Pathoma + Anki | clin |
| taper (sin dOrig) | Sprint final | CORE | Sprint | flagged/incorrectas ya vistas | Anki maduro + First Aid | clin |
| ritual | Sprint final | CORE | Sprint | — | — | clin |
| colchon | Colchón | CORE | Colchón | fila atrasada · si no: uWorld incorrectas/flagged + AMBOSS del sistema débil | uWorld + AMBOSS + Anki | clin |
| recuperación F1 (`dF1`) | los de la fila F1 de origen | | | | | |

**Tipos de fila**

| tipo | Qué es | F3 (1 fila = 1 unidad = 5,5 h) | F4 (capacidad 0,5 u/fila; 0,25 u en inducción) |
|---|---|---|---|
| `reentrada` | día 1 tras la pausa: 2×20Q timed mezcladas de F1 (AMBOSS + incorrectas uWorld) + revisión + Anki de choque (FSRS → 0,90) | q40 · N4 | — |
| `hito` | NBME/UWSA/Free 120 (dOrig 65/72/77/82/83/85/87) o UWSA3 (nuevo, opcional) | 07:00-12:30 | en día con turno T o feriado sin turno (B5) |
| `day_after` | Palmerton §9.2 (~4 h) el día de plan siguiente a cada hito F4 | — | q0 · N5 |
| `contenido` | dOrig de Micro/Repro/MSK/Psiq/Bioq | 1 dOrig/fila; N1 q30 si es 1.ª-2.ª fila del sistema, N4 q40 si viernes (todo el tramo 2 está «desde S11»), si no N2 q40 | **partido en 2 filas**: «PARTE 1/2 · PRE-TEST 10Q tutor + DEEP PRIME» (q10 · N1) y «PARTE 2/2 · CONSOLIDACIÓN 20Q timed + Anki de mecanismo» (q20 · N según regla) |
| `refuerzo` | 2 nuevas «sí-o-sí»: (1) Ética + comunicación (AMBOSS HY + UWorld Ethics & Communication) · (2) Bioestadística 2.ª vuelta (2×2, Se/Sp/VPP, sesgos, diseños, NNT/RR/OR) | q40 · N2 | 2 filas q20 |
| `reactivacion` | 17 unidades, intercaladas: Cardio 1/3 · Resp 1/2 · Renal 1/2 · GI 1/2 · Endo 1/2 · Neuro 1/2 · Heme 1/2 · Fundamentos 1/1 · Cardio 2/3 · Resp 2/2 · Renal 2/2 · GI 2/2 · Endo 2/2 · Neuro 2/2 · Heme 2/2 · Inmuno 1/1 · Cardio 3/3 — bloques timed del sistema (**incorrectas/flagged de uWorld + AMBOSS**, no uWorld fresco) + revisión + relectura FA/Pathoma de subtemas <70 % + Anki de fallos | q40 · N3 | 2 filas q20 · N3 |
| `uw_random` | 7 u: dOrig 84, 86, 88, 89 + 3 nuevas «UWorld FRESCO random timed 2×40Q» = **560 Q uWorld FRESCAS, reservadas** (ningún otro tipo de F2-F4 consume uWorld fresco salvo `contenido` y `refuerzo`) | q80 · N4 | 2 filas «1×40Q + revisión» q40 |
| `incorrectas` | 9 u: dOrig 90, 91 + 7 nuevas «2.ª pasada de incorrectas UWorld (bloques 40Q timed rápidos) + sistema débil» = **720 Q al piso (1.440 con turno T; tope real = el pool de incorrectas, ≈1.280 según la propuesta)** | q80 · N5 | 2 filas q40 |
| `consolidacion` | 5 u: dOrig 92, 93 (AMBOSS 200 mitades) + «Pathoma cap. 1-3 rapid review» + «FA rapid review sistemas 1-5» + «FA rapid review 11-14 + bioestadística/ética» | q40 · N5 | 2 filas q20 |
| `taper` | lun-mié de la semana previa: «20Q flagged + Anki maduro + FA esquemas (≤2 h, solo bloque A)»; jue = **dOrig 94** (ÚLTIMA SESIÓN DE BANCO); vie = **dOrig 95** (sesión mínima ≤1 h) | — | q20 |
| `ritual` | sáb previo al examen: SIN ESTUDIO (permiso, 2 ID, bolsas, pasaje/ruta, dormir) · protegido | — | q0 |
| `colchon` | «si hay fila atrasada → hazla hoy; si no → sistema más débil del último NBME: 40Q timed (incorrectas/flagged uWorld + AMBOSS) + revisión» · **después del Free 120**: «si hay fila atrasada → hazla hoy; si no → SOLO incorrectas/flagged ya vistas + Anki maduro (0 preguntas nuevas)», q20 · N5, sin `qDiaT` | — | q40 · N4 |

**Presupuesto de uWorld FRESCO (r2):** F1 ≈ 1.930 (D1-D57 sin hitos 1.900 + D58 30; C1/C2 son incorrectas) *(⏸ v6.00 · ⏸ v6.01: F1 1.900 + tramo 2 1.370 (incluye la bioestadística) = 3.270, margen 389 · **v6.02:** F1 1.710 + tramo 2 1.550 (incluye las 6 desplazadas) = 3.260, margen 399)* + tramo 2 `contenido` 700 + `refuerzo` 80 + `uw_random` 560 = **≈ 3.270 ≤ 3.659** (banco UWorld, propuesta §3) → margen ≈ 390. Todo lo demás sale de **incorrectas/flagged de uWorld + AMBOSS**: reentrada, reactivación (800 Q al piso), colchón, `qDiaT` del turno T (bloque B 07:40-10:10), sábados «STEP 1 VIVO» de F2 y taper. Verificación V2b (§H).

**Regla de generación (determinista; implementada en `gen_tramo2_ref.js` r2; los implementadores la portan a `gen_usmle_v5.js` y su salida debe ser IDÉNTICA en todas las claves, V2):**
1. Entradas: `ENCAPS`, `E` (examen Step 1), `S` (inicio SERUMS), protegidos extra (`--proteg`, p. ej. adjudicación), tabla de hitos de `E` (B5). `R` = **primer martes posterior al ENCAPS** (DJ-2; vale para examen en sábado o domingo).
2. Días de plan: F3 = L-V de `R` a `S−1` (sin SKIP ni protegidos) · F4 = L-S de `S` a `E−2` (sin protegidos); fuera E−1 (viaje) y E; domingos nunca. Inducción = `S … S+13`.
3. **Anclas**: `R` = reentrada · 2.º día de F3 = NBME 29 (dOrig 65, 07:00-12:30) · cada hito de B5 en su **fecha preferente** + `day_after` el día de plan siguiente · taper: **ritual = último día de plan anterior a E−1**, dOrig 95 = el día de plan anterior, dOrig 94 = el anterior a ese, el resto de días de plan desde el lunes de la semana previa a la del examen = `taper`.
4. Cola-adelante (orden fijo): [recuperaciones F1 de `--pendientes-f1`] → 20 `contenido` (58, 59, 60, 61, 62, 63, 64, 66, 67, 68, 69, 70, 71, 73, 74, 75, 76, 78, 80, 81) → 2 `refuerzo` → 17 `reactivacion`. Cola-atrás (orden fijo, se coloca **hacia atrás desde el viernes anterior al taper**): 7 `uw_random` → 9 `incorrectas` → 5 `consolidacion` (la consolidación queda pegada al taper).
5. Pasada en seco → `C` = días que sobran (colchón). Las filas `colchon` se asignan primero a **sábados de F4 fuera de la inducción** (si `C` < nº de sábados, equiespaciados: índice `floor((k+0.5)·nSáb/C)`); si `C` ≥ nº de sábados, todos los sábados y el resto en el hueco central.
6. Llenado real: cola-adelante desde el principio en los días libres restantes; cola-atrás desde el final; capacidad por fila 1 u (F3), 0,5 u (F4), 0,25 u (inducción) → una unidad ocupa 1, 2 o 4 filas con `parte`.
7. Si cola-adelante y cola-atrás no caben → **déficit**: el generador **ABORTA (exit 2)** y no emite el plan (R1: nunca se recorta); `--permitir-deficit` solo existe para explorar escenarios (a_tabla.js). Una fecha con déficit no es reservable (§B4.4).
8. `franjaNota` en F3: «16:15 REENTRADA: 20Q timed de <sistema>» rotando Cardio → Resp → Renal → GI → Endo → Neuro → Heme → Fundamentos → Inmuno. `gate` en la fila de E−49. `faseUW`: A hasta el primer `uw_random`; B hasta la primera `consolidacion`; C después (hitos y `day_after` heredan la fase de su fecha). `qDiaT` solo en filas F4 que no sean ancla (hito, day_after, taper, ritual) y con fecha ≤ Free 120. Las filas `colchon` posteriores al Free 120 usan la variante «cierre».

**Resultado escenario base (ENCAPS 14-mar · R mar 16-mar · S lun 3-may · E lun 27-sep):** 158 filas (F3 32 · F4 126) · `d` 101-258 · reentrada 1 · hitos 8 · day_after 7 · contenido 20 · refuerzo 2 · reactivación 32 filas · uw_random 14 · incorrectas 18 · consolidación 10 · taper 5 · ritual 1 · **colchón 40 filas (≈105 h al piso)** · 37/37 dOrig cubiertos *(⏸ v6.00 · ⏸ v6.01: colchón 38 filas ≈ 100 h · 38/38 `dOrig` (con D79) · referencia `tramo2_14mar_27sep_v601.json` · **v6.02:** contenido 26 · reactivación 38 · colchón 28 filas ≈ 73,5 h · 43/43 `dOrig` (con D52-D54, D56, D57 y D79) · referencia `tramo2_14mar_27sep_v602.json`)* · V1 = 0. Lista completa T1…T158 en el **Anexo A** (y `v600/espec/tramo2_14mar_27sep.json`, que es el fichero de verificación). r2 frente a r1: idénticos `t, d, fecha, fase, tipo, dOrig, parte, nivelUW, faseUW` salvo T152 (colchón post-Free 120: q20 · N5) y sin `qDiaT` en T149-T152; cambian los campos `DiaUSMLE` (copiados de v5.20 o por defecto) y el `sub` de los hitos (texto v5.20 + sufijos).

Hitos del tramo 2 en el base: T2 NBME 29 mié 17-mar · T51 NBME 30 lun 24-may · T82 UWSA3 (opc.) mar 29-jun · T107 NBME 31 mié 28-jul · T115 NBME 32 vie 6-ago · T117 **GO/NO-GO lun 9-ago** · T118 UWSA2 mar 10-ago · T135 NBME 33 + 3 bloques (ensayo 7 bloques) lun 30-ago · T147 Free 120 lun 13-sep · T156 D94 jue 23-sep · T157 D95 vie 24-sep · T158 ritual sáb 25-sep.

**Otros escenarios** (`node gen_tramo2_ref.js <ENCAPS> <EXAMEN> [SERUMS] [--permitir-deficit]`) *(⏸ v6.00 · v6.01: la tabla de abajo; la v6.02 va justo después)*:

| ENCAPS → examen | Filas (F3/F4) | Colchón | Déficit |
|---|---|---|---|
| 14-mar → 31-ago | 134 (32/102) | 18 f ≈ 47 h | 0 |
| 21-mar → 31-ago | 129 (27/102) | 8 f ≈ 21 h | 0 |
| 21-mar → 27-sep | 153 (27/126) | 30 f ≈ 79 h | 0 |
| 4-abr → 27-sep | 145 (19/126) | 14 f ≈ 37 h | 0 |
| 11-abr → 27-sep | 140 (14/126) | 4 f ≈ 11 h | 0 |
| 18-abr → 27-sep | 135 (9/126) | 0 | **3 u** (faltan D84, D86, D88) → **no viable: aborta** |
| 18-abr → 25-oct | 159 (9/150) | 18 f ≈ 47 h | 0 |
| 25-abr → 25-oct | 154 (4/150) | 8 f ≈ 21 h | 0 |
| 25-abr → 27-sep | 130 (4/126) | 0 | **8 u** → **no viable: aborta** |

**v6.02 (F1 de 52; 6 filas desplazadas al tramo 2 — recalculado el 17-oct con `gen_tramo2_ref.js … --permitir-deficit`, SERUMS 3-may):**

| ENCAPS → examen | Filas (F3/F4) | Colchón | Déficit |
|---|---|---|---|
| 14-mar → 31-ago | 134 (32/102) | 6 f ≈ 16 h | 0 |
| 21-mar → 31-ago | 129 (27/102) | 0 | **2 u** → no viable |
| 21-mar → 27-sep | 153 (27/126) | 18 f ≈ 47 h | 0 |
| 4-abr → 27-sep | 145 (19/126) | 2 f ≈ 5 h | 0 |
| 11-abr → 27-sep | 140 (14/126) | 0 | **4 u** → no viable |
| 18-abr → 27-sep | 135 (9/126) | 0 | **9 u** → no viable |
| 18-abr → 25-oct | 159 (9/150) | 6 f ≈ 16 h | 0 |
| 25-abr → 25-oct | 154 (4/150) | 0 | **2 u** → no viable (extensión) |
| 25-abr → 27-sep | 130 (4/126) | 0 | **14 u** → no viable |

Escenario base v6.02 (14-mar → 27-sep): 158 filas · colchón 28 f ≈ 73,5 h · déficit 0. De ahí la regla operativa v6.02 del disparador (1): `gen_fechas_v6.js --check --calculo` y reservar la más tardía (21-mar → 27-sep · 11-abr → 25-oct · 25-abr → extensión).
| **NO-GO** base: 27-sep → 25-oct, congelado ≤ lun 9-ago (`--congelar-hasta 2027-08-09 --previo tramo2_14mar_27sep.json --examen-previo 2027-09-27`) | 182 (32/150) | 64 f ≈ 168 h | 0 · 117 filas congeladas, 0 cambian |
| **NO-GO** adelanto: 31-ago → 27-sep, congelado ≤ mar 13-jul | 158 (32/126) | 40 f ≈ 105 h | 0 · 94 filas congeladas, 0 cambian |

(El modelo de filas usa el PISO y no suma feriados; difiere ±20 h del modelo de horas de B4. La fecha a reservar exige las dos cosas: colchón de horas PISO ≥ 0 **y** déficit de filas 0, B4.4.)

### B4. Presupuesto de horas (recalculado con DJ-3 y DJ-4)

**B4.1 Plantillas F4 por turno (L-S; el turno se marca cada día en la app, §F)**

| Franja | **M** turno mañana 07:00-13:00 | **T** turno tarde 13:00-19:00 | **L** feriado / sin turno | **G** guardia |
|---|---|---|---|---|
| 04:00 | despertar | despertar | despertar | — |
| Bloque A | **04:05-05:55** Step 1 (1h50): preguntas nuevas timed / contenido nuevo | **04:05-06:05** Step 1 (2 h): contenido nuevo | 04:05-06:05 | — |
| Gimnasio | 19:00-20:30 (sin cambio) | **06:10-07:00** | 19:00-20:30 | — |
| Desayuno/traslado | 05:55-06:20 ducha+desayuno · 06:20-07:00 traslado | 07:00-07:40 ducha+desayuno | 07:00-07:30 | — |
| Bloque B | **14:30-16:00** (1h30, solo carga baja: incorrectas, FA/Pathoma, Anki) | **07:40-10:10** (2h20 netas, pausa 10'): 40Q timed + revisión | **07:30-12:30** bloque largo (hitos aquí) | — |
| Anki USMLE | 13:00-13:40 traslado (25' en el móvil; si marea, audio) | 10:10-10:35 | 12:30-12:55 | 25' cuando se pueda |
| **MIR 1 h (DJ-4)** | **16:00-17:00** | **10:35-11:35** | **15:15-16:15** (su franja establecida) | **1 h en tiempo muerto de la guardia** (Anki MIR 15' + 25Q en el móvil); lo que no se termine se SUMA al día de plan siguiente (nunca se pierde) |
| Secundario 30' (R↔D) | tiempo muerto en la posta (07:00-13:00) | tiempo muerto en la posta (13:00-19:00) | 16:20-16:50 | **30' en tiempo muerto de la guardia** |
| Almuerzo / salida | 13:40-14:30 (siesta ≤20') | 11:35-12:15 · sale 12:20 | — | — |
| Cena / sueño | 18:00 cena · 21:00 dormir | 19:40 cena · 21:00 dormir | 21:00 | — |
| **Step 1 bruto / efectivo** | 3,75 h / **3,00** (B al 50 %) · **2,63 al PISO** (B al 25 %) | 4,75 h / **4,51** (×0,95) | ≈7,4 h / modelo: día del perfil **+2 h** | ≈0,4 h |

Variantes T: turno 12:00-18:00 → bloque B 07:00-09:30, Anki 09:30, MIR 09:55-10:55, salida 11:20, gimnasio 19:00-20:00 · turno 14:00-20:00 → todo +30' y dormir 21:30-04:30. Domingo: LIBRE (Anki ≤15' opcional, no se registra). Revisión semanal: sábado, 20' dentro del bloque de Step 1 del día.

**Plantilla H — día de hito en F4** (hito en día con turno T o feriado sin turno; el hito ES el trabajo de Step 1 del día, sustituye a los bloques A y B):
04:00 despertar · **04:05-05:05 MIR 1 h** · **05:10-06:00 gimnasio** · 06:00-06:45 ducha + desayuno · **07:00 hito** (NBME 07:00-12:15 · UWSA 07:00-11:15 · Free 120 07:00-10:15 · ensayo 7 bloques 07:00-16:30, solo en día sin turno) · turno T: almuerzo rápido y salida 12:20 → posta 13:00-19:00 (R↔D 30' y Anki USMLE 25' en tiempo muerto) · día L: almuerzo 12:30-13:15, siesta ≤20', R↔D 16:20-16:50, Anki USMLE 25' · 19:40 cena · 21:00 dormir.
**Plantilla H-sáb — fallback del hito** (semana sin ningún día T/L; «condición degradada»): 04:00 despertar · **04:05-05:05 MIR** · **05:05-05:50 gimnasio** · 05:50-06:20 ducha + desayuno · 06:20-07:00 traslado · 07:00-13:00 turno M (R↔D 30' en tiempo muerto) · 13:00-13:40 traslado (Anki USMLE 25') · 13:40-14:10 almuerzo · **14:15-19:30 hito** · 19:40 cena · 21:00 dormir.

**B4.2 Horas por semana (6 días de plan)** — PISO 15,75 · M 18,0 · MIX (50 % M / 50 % T) 22,5 · T 27,1 h efectivas. **Frente a la propuesta:** −2,25 (piso 18 → 15,75), −2,5 (M 20,5 → 18), −2,9 (T 30 → 27,1): se pierde el bloque dominical de 5 h y el bloque C opcional del turno T pasa a MIR; el sábado ya era día de turno. Inducción (2 primeras semanas del SERUMS) al 50 %. F3: 5,5 h productivas/día L-V. Taper (semana previa al examen): 2 h lun-jue, 1 h vie, 0 sáb.

**B4.3 Horas acumuladas desde el reinicio (meta 399 h; mínimo 275 h) — colchón al D-1 de cada fecha** (`b_horas.js`)

| ENCAPS → reinicio | Perfil | 275 h | 399 h | Colchón 31-ago | Colchón **27-sep** | Colchón 25-oct |
|---|---|---|---|---|---|---|
| 14-mar → 16-mar | PISO / M / MIX / T | 21-jun / 16-jun / 8-jun / 3-jun | 11-ago / 30-jul / 16-jul / 5-jul | **+34** / +68 / +136 / +204 | +99 (base de planificación) / +142 / +228 / +314 | +164 / +216 / +320 / +425 |
| 21-mar → 23-mar | ídem | 2-jul / 26-jun / 17-jun / 10-jun | 23-ago / 10-ago / 24-jul / 12-jul | **+7** / +41 / +109 / +177 | +72 / +115 / +201 / +287 | +137 / +189 / +293 / +397 |
| 4-abr → 6-abr | ídem | 22-jul / 13-jul / 30-jun / 22-jun | 10-sep / 27-ago / 5-ago / 23-jul | −37 / −3 / +65 / +133 | **+28** / +71 / +157 / +243 | +93 / +145 / +249 / +353 |
| 11-abr → 13-abr | ídem | 31-jul / 23-jul / 8-jul / 29-jun | 23-sep / 6-sep / 13-ago / 29-jul | −65 / −31 / +37 / +105 | **+0** / +43 / +129 / +215 | +65 / +117 / +221 / +326 |
| 18-abr → 20-abr | ídem | 12-ago / 31-jul / 16-jul / 6-jul | 5-oct / 16-sep / 21-ago / 5-ago | −92 / −58 / +10 / +78 | −27 / +16 / +102 / +188 | **+38** / +90 / +194 / +298 |
| 25-abr → 27-abr | ídem | 24-ago / 11-ago / 24-jul / 13-jul | 16-oct / 27-sep / 30-ago / 11-ago | −120 / −86 / −18 / +50 | −55 / −12 / +74 / +160 | **+10** / +62 / +166 / +271 |

(r2: `horasDia` devuelve 0 h en E−1; antes el lun 30-ago —viaje del adelanto— contaba 2 h de taper y la columna del 31-ago iba 2 h inflada. En negrita, la fecha a reservar de cada fila.)
(Sensibilidad SERUMS = **jue 6-may-2027** —en 2026-I empezó el mié 6-may-2026—: `SERUMS=2027-05-06 node b_horas.js` / `node a_tabla.js`. La regla PISO + déficit de B4.4 da **las mismas** fechas a reservar; la antigua regla por perfil M NO: con ENCAPS 4-abr el 31-ago quedaba en M +6 → habría reservado el 31-ago, contra DJ-1. Por eso la regla es por PISO.)

**B4.4 Ventana DJ-1: veredicto y regla exacta**
- **Fecha a RESERVAR** (FSMB/Prometric) = **tabla literal de DJ-1** (`_fechas_v6.json → step1.reserva_por_encaps`): ENCAPS 14 o 21-mar → **mar 31-ago** · 4 u 11-abr → **lun 27-sep** · 18 o 25-abr → **lun 25-oct**.
- Comprobación de cálculo (`a_tabla.js`): la tabla coincide con «la fecha más temprana de {31-ago, 27-sep, 25-oct} con **colchón PISO ≥ 0** (todo turno M, bloque B al 25 %) **y déficit 0** del tramo 2 (`gen_tramo2_ref.js` no aborta)». Si un día ambas difieren (p. ej. por un SERUMS muy tardío), manda la más tardía de las dos y se avisa a Joseph. ⚠ **v6.02: con la F1 de 52 la regla de cálculo (`node DATA/_scripts/gen_fechas_v6.js --check --calculo`) ya NO coincide con la tabla literal: ENCAPS 21-mar → lun 27-sep (literal 31-ago) · 11-abr → lun 25-oct (literal 27-sep) · 25-abr → ninguna de DJ-1 (extensión); el escenario vigente (14-mar → 31-ago; examen elegido lun 27-sep) no cambia. El JSON conserva la tabla literal DJ-1; en el disparador (1) (convocatoria) se corre `--calculo` y manda la más tardía, avisando a Joseph (`DATA/PENDIENTES_JOSEPH.md`, (vi))** (comprobado el 17-oct: el comando sale con exit 1 y lista las 2 diferencias de `step1.reserva_por_encaps` —21-mar y 11-abr—; el 25-abr no aparece porque, sin fecha viable, la reserva cae al último de DJ-1, 25-oct = literal. Detalle PISO / déficit del tramo 2 con la F1 de 52: 14-mar → 31-ago +34 h / 0 u · 21-mar → 31-ago +7 h / **2 u**, 27-sep +72 h / 0 u · 4-abr → 27-sep +28 h / 0 u · 11-abr → 27-sep +0 h / **4 u**, 25-oct +65 h / 0 u · 18-abr → 25-oct +38 h / 0 u · 25-abr → 25-oct +10 h / **2 u**; las horas al piso no cambian, cambia el déficit).
- Márgenes al piso: 21-mar → 31-ago **+7 h** y 11-abr → 27-sep **+0 h** (sin margen: los decide el GO/NO-GO por horas reales, B4.5; con turno variable MIX tienen +109 y +129 h). ENCAPS 18-abr → 27-sep da −27 h **y** déficit de 3 unidades → no viable (iría contra R1) → 25-oct *(⏸ v6.00 · ⏸ v6.01 · **v6.02:** con la F1 de 52, 9 unidades; y 21-mar → 31-ago y 11-abr → 27-sep, que tenían déficit 0, pasan a 2 y 4 unidades: ver la comprobación de cálculo de arriba)*.
- Mientras no salga la convocatoria, el plan se genera con **ENCAPS 14-mar y examen 27-sep** (objetivo DJ-1). Al salir la convocatoria se aplica la tabla (si ≤21-mar → se regenera el tramo 2 con `E = 2027-08-31` y se reserva el 31-ago; si ≥18-abr → `E = 2027-10-25`). ⚠ **v6.02:** antes, `node DATA/_scripts/gen_fechas_v6.js --check --calculo` y se reserva la más tardía de tabla y cálculo (§I(1)): con la F1 de 52, solo el 14-mar sostiene el 31-ago; 21-mar → 27-sep · 11-abr → 25-oct · 25-abr → extensión.
- Moverse a una fecha **posterior** en el E-49 es gratis (antes del E-46); moverse después del E-46 tiene recargo.

**B4.5 GO/NO-GO por horas (además del criterio NBME de B5)** — se mide con `usmle_daily_scores.extra.horas` (horas netas de Step 1 registradas cada día en el cierre, §F) sumadas desde el reinicio:

| Examen | GO/NO-GO (E-49) | Horas PISO que aún quedan hasta el D-1 | **Umbral de horas reales acumuladas** | Checkpoints de ritmo (acumulado requerido) |
|---|---|---|---|---|
| mar 31-ago | **mar 13-jul** | 109 | **≥ 290 h** | 31-may ≥ 192 · 30-jun ≥ 264 |
| lun 27-sep | **lun 9-ago** | 106 | **≥ 294 h** | 31-may ≥ 127 · 30-jun ≥ 199 · 31-jul ≥ 276 |
| lun 25-oct | **lun 6-sep** | 106 | **≥ 294 h** | 31-may ≥ 62 · 30-jun ≥ 134 · 31-jul ≥ 211 |

GO = umbral de horas cumplido **y** NBME 31 y 32 ≥ 68 % con uno ≥ 70 %. NO-GO = se pasa a la siguiente fecha (gratis) y se regenera el tramo 2 con el nuevo `E` **congelando las filas ≤ E-49** (§B7.5) y con la cola de hitos NO-GO de B5. El GO/NO-GO #2 de esa cola usa el umbral de horas de la fila de la nueva fecha (27-sep ≥ 294 · 25-oct ≥ 294) y el criterio de hitos de B5. Un checkpoint mensual incumplido no replanifica: activa el aviso en la app y obliga a usar los días T/L del mes siguiente para filas de cola.

### B5. Hitos 2027 (ya no en domingo): ventana semanal + preferente + fallback

**Regla.** Cada hito tiene una **ventana lun-sáb** y una **fecha preferente** (el feriado de esa semana si lo hay; si no, el lunes; la UWSA2 el día siguiente al GO/NO-GO). Si en la preferente Joseph tiene turno M o guardia, el hito va al **primer día de la ventana (L→S) con turno T o feriado sin turno** (mañana libre ≥5 h: con T 13:00 la ventana 07:00-12:20 cabe un NBME 07:00-12:15; con T 12:00 empezar 06:00) y ese día rige la **plantilla H** de §B4.1 (MIR 04:05 y gimnasio 05:10, para que el hito no se coma ninguno de los dos). Si la semana no tiene ningún día T/L: tarde del sábado post-turno M (14:15-19:30, **plantilla H-sáb**) marcada «condición degradada» (para NBME 31/32 nunca después del sábado de su ventana, porque deben preceder al GO/NO-GO). El `day_after` va al día de plan siguiente al hito real y el resto de filas de esa semana conserva su orden en los días que quedan (función `ordenSemana`, §F). Ensayo de 7 bloques (NBME 33 + 3 bloques random, ≈8,5 h): solo en feriado/día sin turno; si hay turno, se parte: NBME 33 en un día T y los 3 bloques random en el siguiente día T de la ventana.

**Base — examen lun 27-sep-2027**

| Hito | dOrig | Ventana | **Preferente** | E-n | Horario | Mínimo / regla (usmleScores.HITOS_ONTRACK) | Calendar |
|---|---|---|---|---|---|---|---|
| NBME 29 | 65 | — (F3) | **mié 17-mar** (reinicio + 1) | E-194 | 07:00-12:30 | nueva línea base; ≥ NBME 28 − 5; caída > 8 → +2 semanas de reactivación (paga el colchón) | `ae93qv0nqqs36h439hid1jcq8o` |
| NBME 30 | 72 | lun 24 → sáb 29-may | **lun 24-may** | E-126 | 07:00-12:15 | ≥ NBME 28; ritmo medido ≥ 18 h/sem | `mael3p9uhp036jbep45ql6v9oc` |
| UWSA3 (opcional) | nuevo | lun 28-jun → sáb 3-jul | **mar 29-jun** (feriado) | E-90 | 07:00-11:15 | formativa (sin mínimo) | crear |
| NBME 31 | 82 | lun 26 → sáb 31-jul | **mié 28-jul** (feriado) | E-61 | 07:00-12:15 | ≥ 65 % | `l771lvcfv0jcebt61do6svia18` |
| NBME 32 | 83 | lun 2 → sáb 7-ago | **vie 6-ago** (feriado) | E-52 | 07:00-12:15 | 31 y 32 ≥ 68 %, uno ≥ 70 % | `h65e772pqsa4hgc5b6bh9n8h50` |
| **GO/NO-GO** | — | — | **lun 9-ago** | **E-49** | 20:00 (decisión) | B4.5 (horas) + NBME 31/32 | crear (todo el día) |
| UWSA2 | 77 | lun 9 → sáb 14-ago | **mar 10-ago** | E-48 | 07:00-11:15 | «low risk» (señal secundaria) | `2u7viv0elr6aedo0m9undfa5kg` |
| NBME 33 + 3 bloques (ensayo) | 85 | lun 30-ago → sáb 4-sep | **lun 30-ago** (feriado) | E-28 | 07:00-16:30 | ≥ 68 %; < 65 % → 25-oct pagando recargo | `la5rsbuiqj1o35lb5adf93abuo` |
| Free 120 | 87 | lun 13 → sáb 18-sep | **lun 13-sep** | E-14 | 07:00-10:15 | ≥ 70 % | `lh9jfjsmoif74ci6jcn8f1mq30` |
| D94 última sesión de banco | 94 | — | **jue 23-sep** | E-4 | 04:05-06:05 | — | `neboplchsaua4snj39nrl480nc` |
| D95 sesión mínima | 95 | — | **vie 24-sep** | E-3 | 04:05-05:05 | — | `n90bdqhohadu1eqbctv148dn28` |
| Ritual (sin estudio) | — | — | sáb 25-sep | E-2 | — | protegido | crear |
| Viaje a Lima (D-1) | — | — | dom 26-sep | E-1 | — | protegido | crear |
| **EXAMEN** | — | — | **lun 27-sep** | 0 | 07:00-16:00 | — | `oinh139dsnbuma9r3kfu56dhkc` |

**Adelanto — examen mar 31-ago** (solo si ENCAPS ≤ 21-mar): NBME 30 ventana 24-29 may, pref. lun 24-may · NBME 31 ventana 28-jun → 3-jul, pref. **mar 29-jun** (feriado) E-63 · NBME 32 ventana 5-10 jul, pref. lun 5-jul E-57 · **GO/NO-GO mar 13-jul (E-49)** · UWSA2 ventana 12-17 jul, pref. mié 14-jul · NBME 33 + 3 bloques ventana 2-7 ago, pref. **vie 6-ago** (feriado) E-25 · Free 120 ventana 16-21 ago, pref. lun 16-ago E-15 · taper lun 23 → vie 27-ago (D94 jue 26, D95 vie 27) · ritual sáb 28-ago · viaje **lun 30-ago** (feriado) · examen **mar 31-ago**. Sin UWSA3. Si el GO/NO-GO falla → 27-sep sin recargo.

**Plan B — examen lun 25-oct** (cuando se planifica desde el principio: ENCAPS ≥ 18-abr o NBME 28 < 50 %): NBME 30 y UWSA3 como el base · NBME 31 ventana 23-28 ago, pref. lun 23-ago E-63 · NBME 32 ventana 30-ago → 4-sep, pref. **lun 30-ago** (feriado) E-56 · **GO/NO-GO lun 6-sep (E-49)** · UWSA2 ventana 6-11 sep, pref. mar 7-sep · NBME 33 ventana 27-sep → 2-oct, pref. lun 27-sep E-28 · **Free 120 + 4 bloques (ensayo 7 bloques)** ventana 4-9 oct, pref. **vie 8-oct** (feriado) E-17 · taper lun 18 → vie 22-oct · ritual sáb 23 · viaje dom 24 · examen lun 25-oct. Si también falla: extensión contigua nov-dic-ene (única permitida).

**Colas de hitos tras un NO-GO (r2)** — un NO-GO ya rindió NBME 31 y 32: la regeneración (§B7.5) congela las filas ≤ E-49 y usa SOLO formularios no usados (`HITOS_NOGO` en `gen_tramo2_ref.js`; un formulario ya presente en las filas congeladas se salta):

| NO-GO | Hito | Ventana | **Preferente** | E-n | Criterio |
|---|---|---|---|---|---|
| adelanto (mar 13-jul) → **27-sep** | UWSA3 | lun 26 → sáb 31-jul | **mié 28-jul** (feriado) | E-61 | formativa |
| | UWSA2 | lun 2 → sáb 7-ago | **vie 6-ago** (feriado) | E-52 | «low risk» |
| | **GO/NO-GO #2** | — | **lun 9-ago** | E-49 | horas ≥ 294 **y** UWSA2 + UWSA3 «low risk» (≥ 70 % predicho) |
| | NBME 33 + 3 bloques (ensayo) | lun 30-ago → sáb 4-sep | lun 30-ago (feriado) | E-28 | ≥ 68 % |
| | Free 120 | lun 13 → sáb 18-sep | lun 13-sep | E-14 | ≥ 70 % |
| base (lun 9-ago) → **25-oct** | UWSA2 | lun 9 → sáb 14-ago | **mar 10-ago** | E-76 | «low risk» |
| | NBME 33 | lun 30-ago → sáb 4-sep | **lun 30-ago** (feriado) | E-56 | ≥ 68 % |
| | **GO/NO-GO #2** | — | **lun 6-sep** | E-49 | horas ≥ 294 **y** NBME 33 ≥ 68 % + UWSA2 «low risk»; si falla: extensión contigua nov-dic-ene |
| | UWSA3 (solo si no se hizo el 29-jun) | lun 27-sep → sáb 2-oct | lun 27-sep | E-28 | formativa |
| | Free 120 + 4 bloques (ensayo 7 bloques) | lun 4 → sáb 9-oct | **vie 8-oct** (feriado) | E-17 | ≥ 70 % |

**Checkpoint NBME 28 (mar 22-dic)** *(⏸ v6.00 · ⏸ v6.01: lun 28-dic · **v6.02:** mié 30-dic = d52, última sesión de F1; contingencia sáb 2-ene 07:00-12:30)*: ≥ 58 % → base 27-sep en ruta · 50-57 % → 27-sep con gate estricto (GO/NO-GO exige además NBME 30 ≥ NBME 28 + 5) · < 50 % → la base pasa al **25-oct** (se regenera el tramo 2 con `E = 2027-10-25` al salir la convocatoria).
Mínimos F1 (HITOS_ONTRACK v6): UWSA1 baseline (tramos actuales) · NBME 25 línea base real (sin mínimo) · NBME 26 ≥ NBME 25 + 3 · NBME 27 ≥ NBME 25 + 6 · NBME 28 lectura por tramos (arriba).

### B6. Taper y D-1 (`USMLE_TAPER` nuevo)

```ts
USMLE_TAPER = {
  fuente: 'PALMERTON_METODO_COMPLETO.md §8.3-§8.4 · v6.00',
  cierre: 'Desde el Free 120 (lun 13-sep): 0 tarjetas nuevas y 0 preguntas nuevas salvo filas ya planificadas (o atrasadas); colchón = solo incorrectas/flagged + Anki maduro; sin +40Q de turno T; rapid review',
  d94: { t: 156, d: 256, fecha: '2027-09-23', rol: 'ÚLTIMA SESIÓN DE BANCO (jue 23-sep · solo bloque A 04:05-06:05)' },
  d95: { t: 157, d: 257, fecha: '2027-09-24', rol: 'sesión MÍNIMA ≤1 h (vie 24-sep · bloque A 04:05-05:05)' },
  ritual: { t: 158, d: 258, fecha: '2027-09-25', rol: 'SIN ESTUDIO · turno de la posta · empacar: permiso impreso + digital, 2 ID idénticas, Ziploc por break, pasaje' },
  dMenos1: { fecha: '2027-09-26', rol: 'D-1 · viaje Huancayo → Lima · sin estudio · dormir ≥7 h', pasos: [/* los 6 de v5.20 adaptados al viaje */] },
  examen: { fecha: '2027-09-27', rol: 'EXAMEN · Prometric (centro a confirmar: Lima o extranjero, §I)', pasos: [/* los 6 de v5.20 */] },
  regreso: { fecha: '2027-09-28', rol: 'regreso · permiso 1 día (2 si el mar 28 tiene turno M)' },
  burnout: /* igual que v5.20, pero «el corrimiento determinista» → «se paga con filas COLCHÓN; agotadas, decide el GO/NO-GO» */
}
```
`DAILY_META.descansoD1 = '2027-09-26'`, `examenTarget = '2027-09-27'`. Taper de la semana previa: lun 20 · mar 21 · mié 22-sep = `taper` (≤2 h, solo bloque A; MIR sigue 1 h). Permiso de examen: pedirlo con ≥4 semanas (lun 30-ago a más tardar) como día justificado, nunca falta injustificada.

### B7. Reglas operativas (sustituyen al corrimiento diario)

1. **Fin del corrimiento diario.** Un día perdido no mueve ningún examen. F1: C1/C2 y luego paso al tramo 2 (B1) *(⏸ v6.00 · ⏸ v6.01: el 10-oct C1/C2 se consumieron con el corrimiento al lun 12-oct; F1 ya no tiene colchón: todo día perdido de F1 pasa al tramo 2 · **v6.02:** el 17-oct (F1 de 52) pasaron además 5 filas de Heme/Onco al tramo 2 para que ningún hito saliera de F1 (regla de hitos anclados))* · F2: se pierde el slot de menor brecha; el ENCAPS no se mueve · F3/F4: la fila no hecha se hace en la **próxima fila COLCHÓN** (la app la muestra como «atrasada: hazla hoy»); las filas ancladas (hitos, taper) nunca se mueven por un día perdido.
2. **Regla anti-replan.** El plan se regenera SOLO por: (a) convocatoria ENCAPS (o descarte por la regla de los 25 días), (b) inicio real del SERUMS / turno real, (c) NBME 28 (checkpoint de fecha), (d) GO/NO-GO (E-49), (e) colchón agotado (0 filas colchón futuras con filas atrasadas pendientes), **(f) cierre de F1 (jue 31-dic, una sola vez): filas F1 (`d ≤ 58`, sin ✓ en `plan_checks('usmle', d)`, descontadas las cubiertas por C1/C2) → `--pendientes-f1`** *(⏸ v6.00 · ⏸ v6.01: `d ≤ 57`, sin C1/C2; `--f1-filas 57` · **v6.02:** slots d 1-52 de F1 que no sean hito, sin ✓ → `--pendientes-f1 <d>` (d = slot; contenido = el de `colocarF1`); `--f1-filas 52`)*. Nada más. (a), (c) y (f) ocurren antes del reinicio (sin congelado); (b), (d) y (e) ocurren con el tramo 2 en marcha y regeneran **con congelado** (§B7.5).
3. **Gates**: F1 vie 30-oct y vie 27-nov (B1) *(⏸ v6.00 · ⏸ v6.01: mié 4-nov y mié 2-dic · **v6.02:** mié 11-nov y mié 9-dic)* · NBME 28 · NBME 29 (caída > 8) · checkpoints de ritmo (B4.5) · GO/NO-GO.
4. **Carga (DJ-4)**: el disparador semanal ya no suspende secundarios: si el núcleo queda < 80 % dos semanas seguidas, **todos los secundarios salvo MIR bajan a 30'** hasta 2 semanas ≥ 90 %. MIR mantiene 1 h. El modo ÁMBAR diario aplica el mismo mínimo de 30' (§F); el ROJO (enfermedad) no cambia.
5. **Regeneración a mitad de camino (r2) — `gen_tramo2_ref.js … --congelar-hasta <hoy> --previo <DIAS_T2 vigente en JSON> [--examen-previo <E anterior>] [--pendientes uid,…]`:**
   - Las filas con `fecha ≤ hoy` se copian **tal cual** (mismos `t`, `d`, contenido, `faseUW`): los ✓ de `plan_checks('usmle', d)` y los scores (clave `fecha`) siguen apuntando a lo que se hizo. Verificación: 0 filas congeladas cambian.
   - Se replanifica solo lo futuro, con `t` continuo, usando las unidades **no consumidas** (una fila `parte k/n` consume 1/n de su `uid`) y, si el examen cambió, la cola de hitos NO-GO de B5 (formularios ya presentes en las filas congeladas se saltan).
   - `--pendientes`: unidades de cola de filas congeladas **sin ✓** (las lee el orquestador de `plan_checks`) → vuelven ENTERAS a la cabeza de la cola-adelante. Las anclas (hitos, taper) no son «pendientes»: un hito no hecho se re-agenda dentro de su ventana o se decide en el GO/NO-GO.
   - Qué se re-ancla: hitos futuros, `day_after`, taper/ritual del nuevo `E`, `gate` de su E-49. Qué NO: reentrada, NBME 29 y todo hito ya pasado.
   - Probado: base → 25-oct congelando ≤ 9-ago (182 filas, 0 déficit, 0 congeladas cambian); adelanto → 27-sep congelando ≤ 13-jul; SERUMS 3 → 6-may congelando ≤ 2-may; colchón agotado con `--pendientes UR84,C80`.

---

## §C. ENCAPS 2027-I

### C1. Mantenimiento «lento» F1 (mié 7-oct → mié 30-dic): filas 1-60 SIN cambio *(⏸ v6.00 · ⏸ v6.01: re-sembradas `dia` 1-57, lun 12-oct → mié 30-dic, 47 + 10, rígidas por slots · **v6.02:** re-sembradas `dia` 1-52, lun 19-oct → mié 30-dic, 43 + 9)*

- Son exactamente las filas `dia` 1-60 de v5.20 (49 `banqueo1h` + **11** `mini_sim`, último mini-sim **vie 18-dic** = dia 53; último banqueo mié 30-dic = dia 60 II-3) y **se conservan tal cual en Supabase: no se regeneran**. (r2: regenerarlas con `--hasta 2026-12-31` NO las reproduce: el generador calcula `extra.de` —nº de instancias del código— sobre el rango y cambia 49 de las 60 filas, p. ej. dia 2 `de` 10 → 6; `crit_impl_de2.js`. `de = 10` sigue siendo correcto porque las filas 61-92 viven en el carril B.) La siembra del Lote 4 solo BORRA las MANTENIMIENTO 61-92.
- El checkpoint de «fin de enero» se adelanta al **vie 18-dic** (mini-sim 53 = checkpoint del año). *(⏸ v6.00 · ⏸ v6.01: mini-sim 50, misma fecha · **v6.02:** mini-sim 45, misma fecha)*
- Stock urgente (sin cambio): reponer V-2 antes del lun 26-oct y III-5 antes del mar 10-nov; *(⏸ v6.00 · ⏸ v6.01: V-2 antes del mié 28-oct · III-5 antes del jue 12-nov · II-5 antes del lun 16-nov · **v6.02:** V-2 antes del mié 4-nov · III-5 antes del jue 19-nov · II-5 antes del lun 23-nov)* etiquetado de las 2.052 de QX en oct-nov (Claude, segundo plano).
- Franja: 16:15-17:15 L-V (sin cambio).

### C2. Carril B (F2, 16:15-17:15): las filas 61-92 de v5.20 en su misma fecha *(⏸ v6.00 · ⏸ v6.01: misma fecha, en `dia` 58-89; `dia_mant` 61-92 queda como etiqueta de origen · **v6.02:** misma fecha, en `dia` 53-84)*

- Las 32 filas MANTENIMIENTO 61-92 (lun 4-ene → mar 16-feb) **no se borran**: su contenido se **embebe** en la fila INTENSIVO del mismo `dia` (misma fecha; la numeración L-V es idéntica) porque la PK `(examen, dia)` no admite dos filas.
  - **26 lun-jue** → `extra.carril_b = { origen:'mantenimiento_v5.20', dia_mant, fecha, tipo:'banqueo1h', codigo, subtema, prioridad, nts, temas_secundarios, extra }` (copia literal de la fila v5.20).
  - **6 viernes** (dia 65, 70, 75, 80, 85, 90 = 8, 15, 22, 29-ene, 5, 12-feb) *(⏸ v6.00 · ⏸ v6.01: dia 62, 67, 72, 77, 82, 87 · **v6.02:** dia 57, 62, 67, 72, 77, 82)* → mini-sim absorbido por el SIM 100Q: `extra.minisim_absorbido = { dia_mant, subtema, extra }` (receta guardada, no se ejecuta).
  - **Lun-jue del mié 17-feb hasta el D-3 de la cola** (base: mié 17-feb → mié 10-mar, 13 días) → `extra.carril_b = { tipo:'reposicion', regla:'1) instancias de 61-92 no hechas (study_checks sin ✓), en orden; 2) si no hay: lista de vigilancia = temasCalientes() del día' }`. *(⏸ v6.00 · ⏸ v6.01: los 3 primeros días llevan los PENDIENTES F1 explícitos (mié 17-feb dia 90 II-8 · jue 18-feb dia 91 II-3 · lun 22-feb dia 93 MINI-SIM 25Q II-6 + II-10, `extra.carril_b.pendiente_f1`); regla genérica: «1) filas del carril B dia 58-89 (dia_mant 61-92, tipo banqueo1h) sin ✓ en D{dia}:b_*, en orden; 2) si no hay: lista de vigilancia» · **v6.02:** los 8 primeros días llevan los 8 PENDIENTES F1 (mié 17-feb dia 85 II-8 · jue 18-feb 86 II-3 · lun 22-feb 88 MINI-SIM 25Q II-6 + II-10 · mar 23-feb 89 III-8 · mié 24-feb 90 II-11 · jue 25-feb 91 IV-6 · lun 1-mar 93 V-7 · mar 2-mar 94 MINI-SIM 25Q I-10 + V-6) y la regla genérica dice «dia 53-84»)*
  - Sin carril B: viernes (16:15 libre tras el SIM), jue D-2 (dress rehearsal) y vie D-1.
- Fuente de las copias: export JSON previo a la siembra, `DATA/ENCAPS/_carril_b_v520_61-92.json` (SELECT de las 32 filas, §H; contraste reproducible: `gen_encaps_mantenimiento_2027.js 2026-10-07 --hasta 2027-02-16` reproduce las 92 filas vivas 92/92, `crit_impl_mant92.sql`).
- Claves de check: las del ramo MANTENIMIENTO con prefijo `b_` → `D61:b_eval`, `D61:b_banco`, … *(⏸ v6.00 · ⏸ v6.01: `D58:b_eval`, `D58:b_banco`, …; el mini-sim repuesto `D93:b_msim` + `D93:b_msim_corr` · **v6.02:** `D53:b_eval`, `D53:b_banco`, …; los mini-sims repuestos `D88:b_msim` / `D94:b_msim` (+ `_corr`))* (`study_checks` PK `(examen,item_key)` → sin colisión).
- **Cierres del carril B (r2):** `cierreId` (`encapsProgressSync.ts`) usa `tipoRonda` + fecha + código; el cierre del loop y el del carril B del mismo día chocarían si comparten código → el carril B usa **`TipoRonda 'carril_b'`** (id `APP_CARRIL_B_<fecha>_<codigo>`). Además el orden del barrido evita el mismo código en mañana y carril B el mismo día (§C3).
- **Eval anclada del carril B en lunes:** el `prevPseudo` del lunes sería el mini-sim absorbido del viernes, que no se hizo → la eval anclada del lunes = «5Q rehechas de los fallos del **SIM 100Q del viernes**» (no del mini-sim).
- **Telegram daemon** (`D:\agente_estudio\scripts\encaps_telegram_daemon.py`): no emite claves, solo cuenta `study_checks` con prefijo `D{dia}:` (que ya incluye las `D{dia}:b_*`). Lo que sí está mal es `get_today_dia()` (`min(71, días naturales desde d1)`): se reescribe para leer `dia` de la fila `study_schedule` con `examen='ENCAPS' and fecha = hoy` (sin fila → «sin sesión hoy») y el total `= max(dia)`.

### C3. Intensiva (lun 4-ene → D-1 del ENCAPS)

**Esqueleto escenario base (examen dom 14-mar · `dia` 61-110 · 50 hábiles):** *(⏸ v6.00 · ⏸ v6.01: `dia` 58-107 · **v6.02:** `dia` 53-102)* tabla completa en el **Anexo B**.
- **S1 (lun 4 → vie 8-ene):** lun 4 `senales` (re-scan + convocatoria) · mar 5 / mié 6 / jue 7 `loop` calentamiento I-3 / V-2 / II-3 · **vie 8-ene `pretest` = PRE-TEST 2026-II 100Q, clave oficial** (antes vie 26-feb).
- **Núcleo S2-S9 (lun 11-ene → vie 5-mar): 32 slots `loop` de barrido lun-jue**, reparto por defecto I-3 7 · V-2 5 · IV-1+IV-2 4 · I-4 4 · II-3 4 · III-5 3 · II-4 3 · II-5 2, en este orden por fecha (r2: S3, S5, S6 y S7 permutados dentro de su semana para que **ningún día repita el código del carril B**; antes chocaban lun 18-ene I-3, lun 1-feb I-3, mié 10-feb II-4, lun 15-feb I-3 y mar 16-feb V-2):
  S2 I-3 · V-2 · II-3 · I-4 | S3 **IV · I-3** · III-5 · II-4 | S4 I-3 · V-2 · II-5 · I-4 | S5 **II-3 · I-3 · V-2 · IV** | S6 I-3 · III-5 · **I-4 · II-4** | S7 **II-3 · I-3 · V-2 · IV** | S8 I-3 · III-5 · II-4 · II-5 | S9 V-2 · IV · II-3 · I-4.
  Con `--pretest <export.json>` (tras el 8-ene) se reordena por índice de brecha **conservando 32 slots, cada crítico ≥ 1 y la restricción «código del slot ≠ código del carril B de ese día»** (`IV` choca con `IV-1`/`IV-2`; misma restricción en `--orden-base`); durante el núcleo cada SIM puede mover como máximo 2 slots de la semana siguiente (regla operativa, no regenera; respeta la misma restricción).
- **Viernes del núcleo = `sim100`** (8): vie 15-ene SIM #1 **2025-II oficial** · 22-ene #2 · 29-ene #3 · 5-feb #4 **2024-II oficial** · 12-feb #5 · 19-feb #6 · 26-feb #7 **2025-I oficial (ancla tardía)** · 5-mar #8. Hora: `extra.sim.hora = '07:15'` (07:15-09:15) salvo **#7, #8 y el dress rehearsal = '11:00'** (11:00-13:00, hora del 2026-I). Fuentes de #2/#3/#5/#6/#8: Theomed / QX 2027-I / propios (`gen_encaps_minisim.js --sim100`), **acceso por verificar** (§I).
- **Módulos de extensión** (solo si el examen es posterior al 14-mar; ocupan los hábiles entre el núcleo y la cola, semana a semana): lun + mar `loop` pasada profunda de los 2 sub-ejes peores · mié `loop` rebote de cola larga (II-1 / II-11 / II-8 rotando) · jue `loop` lista de vigilancia · vie `sim100`. **Regla del módulo parcial (r2):** el **último hábil de la semana es siempre el `sim100`** y los hábiles anteriores se llenan en el orden profunda #1 → profunda #2 → rebote → vigilancia. Semana Santa (jue 25 / vie 26-mar sin sesión) es el único módulo parcial de los 6 escenarios: lun 22 y mar 23-mar pasada profunda, **mié 24-mar `sim100`**. (`c_encaps.js <ENCAPS>` lo reproduce; los recuentos de SIM de A5 cuadran: 8 / 9 / 11 / 12 / 13 / 14.)
- **Cola anclada = los 5 hábiles antes del examen:** D-5 lun `loop` (pasada profunda del sub-eje peor, `extra.cola='profunda'`) · D-4 mar y D-3 mié `repaso_final` · **D-2 jue `dress_rehearsal` 11:00-13:00** (2026-I real solo si hay clave por consenso QX+Theomed+norma; si no, propio) · **D-1 vie `medio_dia`** · sáb libre · dom examen.
- **Loop v6 (`extra.loop`, horas definitivas F2; `extra.nota_horas = 'v6.00: horas definitivas F2'`):** 05:00 Anki ENCAPS::Cifras (15') · 07:15 repaso espaciado **D-1 / D-7 / D-21** (60') · 08:15 PRE-TEST 10Q ciegas del sub-eje (45') · 09:00 DEEP PRIME norma/NTS + cifras (120') · 11:00 CONSOLIDACIÓN 30Q + cierre (60') · 12:00 registro (15') · 18:00 EVAL modo examen 20Q a 72 s = **10 del sub-eje del día + 10 de sub-ejes de hace 7-21 días** (45'). El bloque **16:15 CARRIL B NO va dentro de `extra.loop`** (r2: saldría duplicado): lo añaden `itemsForDay` y `HorarioView` cuando existe `extra.carril_b` (§F). Se elimina el «anclaje 17:15» (franja de LIVIANO hasta el 12-feb; luego libre). `extra.repaso` = `{ 'D-1', 'D-7', 'D-21' }` (la app lee las claves en el orden en que vienen, §F). Pasada profunda solo para sub-ejes < 70 % en su D+21.
- **Criterio de «listo» [S]:** último oficial ≥ 85 % (17/20) y los 2 últimos SIM ≥ 85 %.

**Numeración `dia` y compatibilidad con `src/lib/encapsPlan.ts`**
- `dia` = nº de hábil L-V contado desde `2026-10-07` saltando `SKIP_V6` → mantenimiento 1-60 (modo `MANTENIMIENTO`) · intensiva 61-N (modo `INTENSIVO`; N = 110 / 115 / 123 / 128 / 133 / 138 según escenario). *(⏸ v6.00 · ⏸ v6.01: contado desde `2026-10-12` → mantenimiento 1-57 · intensiva 58-N, N = 107 / 112 / 120 / 125 / 130 / 135 · **v6.02:** contado desde `2026-10-19` → mantenimiento 1-52 · intensiva 53-N, N = 102 / 107 / 115 / 120 / 125 / 130)* Sin huecos (los 93-96 «sin fila» de v5.20 desaparecen).
- `regimenDe()` sigue funcionando sin cambios: `d1 = extra.d1 = '2026-10-07'`, `total = max(extra.dias_ciclo = 60, max(dia) = 110) = 110`. *(⏸ v6.00 · ⏸ v6.01: `d1 = '2026-10-12'`, `total = max(57, 107) = 107` · **v6.02:** `d1 = '2026-10-19'`, `total = max(52, 102) = 102`)*
- `diaActual()` requiere **añadir `'2027-03-25','2027-03-26'` a `STUDY_SKIP_DATES.ENCAPS`** (si no, desfase +2 tras Semana Santa en los escenarios ≥ 4-abr). Tras el examen `diaActual` se fija en el último día (comportamiento actual; la vista muestra «examen rendido» si hoy > `exam_date`, §F).
- `STUDY_TOTAL_DAYS.ENCAPS` (fallback) = 60; *(⏸ v6.00 · ⏸ v6.01: 57 · **v6.02:** 52)* `STUDY_D1` sin cambio.

**`study_metrics.extra` (ENCAPS) — valores v6 (`jsonb_set`, previo backup `study_metrics_bk_<AAAAMMDD>`)**
`d1: '2026-10-07'` · `dias_ciclo: 60` · `regimen: 'MANTENIMIENTO_2027-1 v6.19 (60 d) + INTENSIVA v6.00 (núcleo 4-ene → 5-mar + cola anclada)'` *(⏸ v6.00 · ⏸ v6.01: `d1 '2026-10-12'` · `dias_ciclo 57` · `regimen 'MANTENIMIENTO_2027-1 v6.20 (57 d) + INTENSIVA v6.01 …'` · `intensiva.dias '58-107'` · `corrimiento.pendientes_f1` (3) · `backup 'study_schedule_bk_v601_20261010'` · `intensiva.backup 'study_schedule_bk_v601_int_20261010'` · **v6.02:** `d1 '2026-10-19'` · `dias_ciclo 52` · `regimen 'MANTENIMIENTO_2027-1 v6.21 (52 d) + INTENSIVA v6.02 …'` · `intensiva.dias '53-102'` · `corrimiento.pendientes_f1` (8) · `backup 'study_schedule_bk_v602_20261017'` · `intensiva.backup 'study_schedule_bk_v602_int_20261017'`)* · `exam_date: '2027-03-14'` · `examen_target: '2027-03-14 (dom · PROVISIONAL v6.00: «más o menos el 14»; 6/6 ENCAPS previos en domingo; se fija con la convocatoria; regla convocatoria = examen − 25 d → sin convocatoria al mié 17-feb se descarta el 14-mar y se pasa al escenario siguiente)'` · `backup: 'study_schedule_bk_v600_<AAAAMMDD>'` · `intensiva: { desde:'2027-01-04', hasta:'2027-03-12', dias:'61-110', pretest:'2027-01-08', nucleo:{ desde:'2027-01-11', hasta:'2027-03-05', slots_barrido:32, sims:8 }, cola:{ desde:'2027-03-08', hasta:'2027-03-12', regla:'D-5…D-1 anclada al examen' }, modulos:0, carril_b:{ desde:'2027-01-04', hasta:'2027-02-16', filas_mant:'61-92', campo:'extra.carril_b', reposicion:'2027-02-17 → 2027-03-10' }, backup:'study_schedule_bk_v600_int_<AAAAMMDD>', regenerar:'tras el PRE-TEST (vie 8-ene): gen_encaps_intensivo_2027.js --pretest <export.json> --desde 2027-01-11; tras la convocatoria: con la fecha real --desde 2027-03-08 (filas > 2027-03-05); --carril-b siempre' }` · `horarios`: se conserva `weekday/weekend` (plantilla F1) y se añade `horarios.intensiva` = el loop v6 (la app usa la fila en días INTENSIVO).

**Las 11 filas INTENSIVO v5.20 (`dia` 97-107) y el mié 10-mar:** *(⏸ v6.00 · ⏸ v6.01: los `dia` de destino de este párrafo (61…110) son hoy 58…107: señales 58 · pre-test 62 · SIM 2025-II 67 · dress 106 · medio día 107 · **v6.02:** son 53…102: señales 53 · pre-test 57 · SIM 2025-II 62 · dress 101 · medio día 102)* el DELETE `modo='INTENSIVO'` del generador las quita **después** de copiarlas al backup `study_schedule_bk_v600_int_<fecha>`; su contenido queda re-fechado en la nueva intensiva: 97 `senales` → lun 4-ene (61) · 98-99 calentamiento → 5-7 ene (62-64, +1 día: II-3) · 100 `pretest` → vie 8-ene (65) · 101-104 barrido (4 slots) → 32 slots del núcleo · 105 SIM 2025-II → vie 15-ene (70) · 106 dress → jue 11-mar (109) · 107 medio día → vie 12-mar (110). El examen mié 10-mar queda **sustituido** por el dom 14-mar provisional (Calendar `8juk0mvl66tutdkbcei7umrs68` se re-fecha, §G).

**Cambios en generadores ENCAPS**
- `gen_encaps_mantenimiento_2027.js`: **NO se ejecuta en la siembra v6** (las filas 1-60 se conservan; §C1). Cambios para que un uso futuro no rompa nada: la constante real `HASTA` pasa de `'2027-02-16'` a `_fechas_v6.f1.fin` (`'2026-12-30'`) — hoy `gen_encaps_semana.js:544` imprime el comando de override **sin** `--hasta` y reinsertaría MANTENIMIENTO 61-92 sobre las INTENSIVO 61-92 (choque de PK → la transacción entera se revierte) · nueva opción `--de-hasta 2027-02-16` (default) para calcular `extra.de` sobre el rango de v5.20 y no cambiar las 49 filas · guarda SQL al principio: `DO $$ BEGIN IF EXISTS (SELECT 1 FROM study_schedule WHERE examen='ENCAPS' AND modo <> 'MANTENIMIENTO' AND dia <= <N>) THEN RAISE EXCEPTION 'hay filas INTENSIVO en el rango del mantenimiento'; END IF; END $$;`.
- `gen_encaps_intensivo_2027.js` (cambios obligatorios): defaults `D1 '2027-01-04'`, `EXAMEN '2027-03-14'`, `BASE '2026-10-07'` · SKIP = `SKIP_V6` de `_fechas_v6.json` (además de Pascua) · nuevas opciones `--nucleo-hasta 2027-03-05`, `--slots-barrido 32` (sustituye al `.slice(0, 16)` fijo de la línea 203), `--reparto` (default del párrafo anterior), `--carril-b <json>` (**obligatoria en TODAS las ejecuciones**, default `DATA/ENCAPS/_carril_b_v520_61-92.json`; sin ella el carril B desaparecería al regenerar), `--orden-base` (la tabla S2-S9 r2) con la restricción de código frente al carril B, **`--desde <fecha>`** (borra e inserta solo `modo='INTENSIVO' AND fecha >= <fecha>`; hoy el DELETE es de todo el modo) y **`--sin-tx`** (emite solo el DELETE filtrado + el INSERT, sin `BEGIN/COMMIT` ni `CREATE TABLE` de backup: los pone el bloque del Lote 4) · lista `SIMS` por defecto **reordenada** como §C3/Anexo B (#1 2025-II · #4 2024-II · #7 2025-I · 2026-I reservado para el dress rehearsal; hoy #2 = 2025-I y #4 = 2026-I) · estructura S1 / núcleo / módulos (regla del módulo parcial) / cola de arriba · `extra.sim.hora` · `repasoDe` D-1/D-7/D-21 · LOOP v6 sin el 16:15 · **se elimina `extra.dias_a_examen`** (era estático y quedaría desfasado en las filas ≤ 5-mar al cambiar el examen; la app lo calcula con `diasAExamenDe(exam_date)`) · `--bk` **aborta si la tabla existe** (igual que el de mantenimiento; hoy hace `DROP TABLE IF EXISTS`) · emite además el `UPDATE study_metrics` de `extra` · verificación: 0 fines de semana, 0 SKIP, cola = 5 últimos hábiles, 32 slots, 0 choques de código con el carril B, `dia` contiguo desde 61.
- `gen_encaps_minisim.js`: default `--pretest '2027-01-08'`.
- `gen_encaps_semana.js`: `--d1 2026-10-07`; la línea de override que imprime (`:544`) añade `--hasta 2026-12-30` (redundante con el nuevo default, pero explícito).

---

## §D. MIR (1 h/día en todas las fases — DJ-4)

| Bloque | Fechas | Días | Franja | Contenido |
|---|---|---|---|---|
| Diario (1.ª vuelta) | mié 7-oct → mié 27-ene | 78 (intacto) *(⏸ v6.00 · ⏸ v6.01: lun 12-oct → lun 1-feb; mini-MIR D77 vie 29-ene · **v6.02:** lun 19-oct → lun 8-feb; mini-MIR D77 vie 5-feb)* | 15:15-16:15 | sin cambio (`mirDailyPlan.ts`) |
| Mantenimiento | jue 28-ene → **jue 22-abr** | **57** (47 lun-jue · 10 viernes) *(⏸ v6.00 · ⏸ v6.01: mar 2-feb → mar 27-abr, mismas cuotas · **v6.02:** mar 9-feb → mar 4-may (lun 3 y mar 4-may ya en el SERUMS), mismas cuotas)* | 15:15-16:15 | banqueo por peso + viernes peor del log + 12 Tier C |
| **Extensión** | **vie 23-abr → vie 24-sep** (día de plan anterior al ritual) | **131** (L-V 6 hasta el 30-abr · L-S 125 en el SERUMS; 88 lun-jue · 23 viernes · 20 sábados) *(⏸ v6.00 · ⏸ v6.01: mié 28-abr → vie 24-sep · 128: 86 lun-jue · 22 viernes · 20 sábados; Tier C ext 21 · **v6.02:** mié 5-may → vie 24-sep · 123: 82 lun-jue · 21 viernes · 20 sábados; Tier C ext 20 (se cae además Oftalmología · Retina v3))* · adelanto: 107 (→ vie 27-ago) · plan B: 155 (→ vie 22-oct) | F3: 15:15-16:15 · F4 turno M **16:00-17:00** · turno T **10:35-11:35** · L **15:15-16:15** · día de hito **04:05-05:05** (plantilla H) · G **1 h en tiempo muerto de la guardia** | igual que el mantenimiento + sábado |
| Fase principal | después del Step 1 (oct-2027) | — | — | `MIR_MANT_META.handoff` |

- **Mantenimiento (re-fechado, no recortado):** con los protegidos v6 (vie 12-mar, lun 15-mar) y la Semana Santa (jue 25, vie 26-mar) en vez de los v5.20 (22-feb, 9-mar, 10-mar), el rango 28-ene → 22-abr da 57 filas (47 lun-jue en vez de 46 → +1 slot de banco; los 2 viernes que caen en día sin sesión no existen). Tier C (generador): jue 28-ene · 4-feb · 11-feb · 18-feb · 25-feb · 4-mar · 18-mar · **mié 24-mar** · 1-abr · 8-abr · 15-abr · 22-abr (Planificación). *(⏸ v6.00 · ⏸ v6.01: jue 4-feb · 11-feb · 18-feb · 25-feb · 4-mar · 18-mar · mié 24-mar · 1-abr · 8-abr · 15-abr · 22-abr · mar 27-abr (Planificación), mismo orden · **v6.02:** jue 11-feb · 18-feb · 25-feb · 4-mar · 18-mar · mié 24-mar · 1-abr · 8-abr · 15-abr · 22-abr · 29-abr · mar 4-may (Planificación), mismo orden)*
- **Modo REDUCIDO eliminado** (≠ propuesta): su motivo era el sprint del Step 1 de febrero, que ya no existe, y DJ-4 fija MIR en 1 h en todas las fases → `REDUCIDO_HASTA = null`; las 17 filas 28-ene → 19-feb pasan de 10Q a 25Q/30Q (más contenido, nada se quita). Reversible con una constante (§I).
- **Extensión:** filas lun-jue = rotación ponderada por peso MIR (mismas 14 asignaturas y pesos; cuotas por resto mayor sobre los 88 slots de la extensión); viernes = 30Q de la asignatura peor del log; **sábado (nuevo `tipo:'sabado'`) = 30Q mixtas de las 14 asignaturas (mini-simulacro, 77 s/Q) + corrección**; Tier C express = último lun-jue de cada semana, repitiendo el ciclo de las 12 (asignatura, capítulo) con preguntas no usadas (`preguntasSinUsar`). Pool: `mirPreguntasOficiales` → fallback tests ProMIR por asignatura (`DATA/MIR/POOL_USO.md`). Retención FSRS **0,85 hasta el Step 1**; 0,90 al empezar la fase principal (oct-2027).
- Días protegidos y SKIP: sin fila (vie 12-mar: ver §A3/§I). Guardia (G): la fila se hace **entera (1 h) en tiempo muerto de la guardia** (Anki MIR 15' + 25Q en el móvil); lo que no se termine se suma al día de plan siguiente (DJ-4: MIR 1 h/día en todas las fases).

**Cambios en `gen_mir_mantenimiento.js`**
1. Leer `skip`, `protegidos` y `serums.inicio` de `_fechas_v6.json` (quitar las constantes `SKIP_FIJOS`/`PROTEGIDOS` locales).
2. `fechas()` acepta sábado cuando `fecha ≥ serums.inicio` (`dow 1..6`).
3. `REDUCIDO_HASTA = null` (0 filas reducidas).
4. Nuevo parámetro `--ext-hasta <fecha>` (default = **día de plan anterior al ritual** = derivado de `_fechas_v6.json`: vie 24-sep; adelanto vie 27-ago = 107 filas; plan B vie 22-oct = 155): genera, tras el mantenimiento (`FIN = 2027-04-22`), las filas de extensión con cuotas propias, `semana` continua, `tipo:'sabado'` y Tier C cíclico.
5. Emitir en el mismo `src/lib/mirMantenimiento.ts`: `MIR_MANT_DIAS` con `d` 1-57 (`fase:'mantenimiento'`) y 58-188 (`fase:'extension'`) *(⏸ v6.00 · ⏸ v6.01: 58-185; `totalDias` 185; `ext: { inicio: '2027-04-28', fin: '2027-09-24', totalDias: 128 }` · **v6.02:** 58-180; `totalDias` 180; `ext: { inicio: '2027-05-05', fin: '2027-09-24', totalDias: 123 }`)*, `MIR_MANT_META` con **`totalDias = MIR_MANT_DIAS.length` (188; lo usa la navegación de `MirTodayPlan`)** + `mant:{ totalDias:57 }` + `ext:{ inicio:'2027-04-23', fin:'2027-09-24', totalDias:131 }`, `handoff` = «vie 24-sep-2027 (último día con estudio antes del Step 1) → fase principal MIR desde oct-2027», `MIR_MANT_FRANJAS.sabado` **con su rama en `mirMantFranjas()`** (hoy solo distingue `viernes` y `modo`, así que el sábado caería en la franja normal) y helper `mirFranjaPorTurno(dia, turno)` (con `Turno` importado de `fechasV6`) que desplaza las 3 sub-franjas al inicio de la franja del turno.
6. Verificación: 0 filas en SKIP/protegidos (incluido el ritual); sábados solo ≥ 3-may; 12 Tier C en el mantenimiento; 47 + 88 slots lun-jue con cuotas exactas. Las cifras 57/131 y la lista de Tier C salen de una ejecución en seco *(⏸ v6.00 · ⏸ v6.01: 57/128 · **v6.02:** 57/123)* del generador real con las constantes v6 (`crit_num/gmm.js` → `mirMant_v6_dry.ts`) y de `e2.js`; `e_secundarios.js` r2 da las mismas.

---

## §E. Research ↔ Derma, AURUM, LIVIANO, SYNAPSE/vibecoding, Business

**Duración por fase (DJ-4: mínimo 30', nunca 0; nada se borra)**

| Plan | F1 | F2 | F3 | F4 |
|---|---|---|---|---|
| Research ↔ Derma (interdiario) | 45' 13:30-14:15 | 45' · **días-Research de la pausa de átomos 15-ene → 10-feb: 30' «Research mínimo (DJ-4)»** (sin átomo nuevo ni re-fechado: inbox de revisores/editorial + 1 lectura de la cola del ciclo 2 + repaso del paquete congelado del case report) | 45' | **30' en tiempo muerto de la posta, L-S** (núcleo del átomo: Research = el entregable atómico; Derma = casos ciegos + imagen; los ~10Q y la lectura 10' pasan a opcionales) |
| AURUM | 60' 14:15-15:15 | **30' 14:15-14:45** (= `min` núcleo de la fila; bloques extra opcionales) | 30' (→ jue 15-abr; ⏸ v6.00 · ⏸ v6.01: → mar 20-abr · **v6.02:** → mar 27-abr) | terminado |
| SYNAPSE | 30' 12:30 | 30' → lun 15-feb (fin; ⏸ v6.00 · ⏸ v6.01: → vie 19-feb · **v6.02:** → vie 26-feb) | — | — |
| Vibecoding | 45' 04:15 | 45' → vie 19-feb (fin; ⏸ v6.00 · ⏸ v6.01: → mié 24-feb · **v6.02:** → mié 3-mar); taper S13-S20 re-etiquetado «por el ENCAPS» (solo texto) | — | — |
| LIVIANO | 45' 17:15 | 45' → vie 12-feb (fin, capstone jue 11-feb; ⏸ v6.00 · ⏸ v6.01: → mié 17-feb, capstone mar 16-feb · **v6.02:** → mié 24-feb, capstone mar 23-feb) | — | — |
| Business / Estudio Pulso | según plan | → jue 4-feb (fin) | — | — |
| CURVA / DENSA | — | — | — | arrancan después del Step 1 (oct-2027) |

**Paridad Research/Derma en F4 (regla nueva, en `researchData.diaEstudioTipo`, `gen_research_plan.js`, `gen_derma_ciclo2.js`, `remap_inicio.js`):** se cuentan los L-V desde el ancla mié 10-jun-2026 hasta el día anterior a `serums.inicio`, y **desde `serums.inicio` se cuentan L-S**; par = Research, impar = Derma; domingo = descanso. Con 6 días/semana la paridad queda fija por día: **Derma lun · mié · vie; Research mar · jue · sáb** (desde el 3-may). Los dos interdiarios saltan `skip` y `protegidos` v6.

**Fechas resultantes (re-fechado; contenido y nº de átomos intactos — `e_secundarios.js`, que reproduce v5.20 exacto)**

| Plan | v5.20 | **v6** | Cambios relevantes |
|---|---|---|---|
| Research c1 (42) | jue 8-oct → mié 3-mar | **igual** (jue 8-oct → mié 3-mar) *(⏸ v6.00 · ⏸ v6.01: lun 12-oct → vie 5-mar · **v6.02:** mar 20-oct → mié 17-mar (R6, R7 y X-1 pasan tras la pausa))* | X-3 mar 23-feb · X-4 jue 25-feb · X-5 lun 1-mar · X-6 mié 3-mar (sin cambio) |
| Research c2 (67) | vie 5-mar → jue 9-sep | **vie 5-mar → sáb 21-ago-2027** *(⏸ v6.00 · ⏸ v6.01: mar 9-mar → mar 24-ago; R43 mar 20-jul; X-9 mié 17-mar; R10 mar 23-mar · **v6.02:** vie 19-mar → mar 31-ago; R43 mar 27-jul; X-9 lun 29-mar; R10 vie 2-abr)* | R8b jue 11 → **mar 9-mar** · X-9 lun 15 → **jue 11-mar** · R9b mié 17-mar = · R10 vie 19-mar = · K1 mar 23-mar = · **R43 (SUBMIT SR-1) jue 29-jul → sáb 17-jul** · X-13 jue 19-ago · X-14 sáb 21-ago |
| Derma c1 (73) | mié 7-oct → mié 5-may | **igual fin mié 5-may** *(⏸ v6.00 · ⏸ v6.01: mar 13-oct → lun 10-may; alivio d44-d49 vie 12 → vie 26-feb · **v6.02:** lun 19-oct → vie 14-may; alivio d44-d49 jue 18-feb → jue 4-mar)* | alivio (ex-taper Step 1) d44-d49: lun 8-feb · mié 10 · vie 12 · mar 16 · jue 18 · **lun 22-feb** (antes mié 24-feb) · d50 mié 24-feb · d53 jue 4-mar · d54 lun 8-mar · d55 mié 10-mar · d72 lun 3-may |
| Derma c2 (30) | vie 7-may → mié 28-jul | **vie 7-may → mié 14-jul-2027** *(⏸ v6.00 · ⏸ v6.01: mié 12-may → lun 19-jul · **v6.02:** lun 17-may → vie 23-jul)* | lun/mié/vie en F4 |
| AURUM (130) | mié 7-oct → mié 14-abr | **mié 7-oct → jue 15-abr** *(⏸ v6.00 · ⏸ v6.01: lun 12-oct → mar 20-abr; v6 D115 mar 30-mar · v7 D130 mar 20-abr · **v6.02:** lun 19-oct → mar 27-abr; v6 D115 mar 6-abr · v7 D130 mar 27-abr)* | D96 lun 22-feb · pitch v5 D95 vie 19-feb (=) · v6 D115 **mar 23-mar** · v7 D130 **jue 15-abr** |
| SYNAPSE (132) · vibecoding · LIVIANO (90) · Business (121) | → 15-feb · 19-feb · 12-feb · 4-feb | **fechas sin cambio** *(⏸ v6.00 · ⏸ v6.01: SYNAPSE → vie 19-feb · vibecoding → mié 24-feb · LIVIANO → mié 17-feb · Business → mar 9-feb · **v6.02:** SYNAPSE → vie 26-feb · vibecoding → mié 3-mar · LIVIANO → mié 24-feb · Business → mar 16-feb)* | ninguna fecha cambia; **textos**: vibecoding S13-S20 («por el ENCAPS») y **SYNAPSE** (cabecera «D92 mar 16-feb … examen lun 22-feb» y las filas que heredan nombres de proyecto del vibecoding, p. ej. d130 sáb 13-feb «semana NBME 32/33 + Free 120») se regeneran; LIVIANO no (sus «STEP 1» son el ensayo STEP-1 de semaglutida, no el USMLE) |

- **Overlays 🔬 Research (12):** M1 14-oct · C-2 22-oct · T-1 26-oct · C-6 11-nov · CR-1 17-nov · T-8 17-dic · X-1 23-dic · CR-8 8-ene · CR-9 11-feb (sin cambio) · **X-9 lun 15-mar → jue 11-mar** · R10 vie 19-mar (=) · **R43 jue 29-jul → sáb 17-jul** *(⏸ v6.00 · ⏸ v6.01: M1 vie 16-oct · C-2 lun 26-oct · T-1 mié 28-oct · C-6 vie 13-nov · CR-1 jue 19-nov · T-8 lun 21-dic · X-1 mar 29-dic · CR-8 mar 12-ene · CR-9 jue 11-feb · X-9 mié 17-mar · R10 mar 23-mar · R43 mar 20-jul · **v6.02:** M1 lun 26-oct · C-2 mar 3-nov · T-1 jue 5-nov · C-6 lun 23-nov · CR-1 mié 25-nov · T-8 mié 23-dic · CR-8 mar 12-ene · CR-9 jue 11-feb · X-1 mar 23-feb · X-9 lun 29-mar · R10 vie 2-abr · R43 mar 27-jul)* (en F4 el overlay es de todo el día: la hora la pone el turno).
- Derma: `DERMA_TAPER_ENCAPS_FECHA` sigue `null`; `taperStep1` (meta) pasa a `{ desde:'2027-02-08', hasta:'2027-02-22', motivo:'alivio F2 (antes taper Step 1)' }` (solo texto + fechas). Con la convocatoria: intercambio de los átomos ligeros con d53/d54 (CRIT) según la propuesta §5 (sin recortar).
- AURUM: `gen_aurum_plan.js` con `skip`/`protegidos` v6 y nuevo campo por fila `min30: fecha >= '2027-01-04'` (la UI muestra 30' = `min` núcleo).
- Generadores a correr (con `_fechas_v6.json`): `gen_research_plan.js 2026-10-07` *(⏸ v6.00 · ⏸ v6.01: todos con START 2026-10-12 (`remap_inicio.js 2026-10-12` + generadores) · **v6.02:** START 2026-10-19 (`remap_inicio.js 2026-10-19` + generadores; Research d1 mar 20-oct por paridad))* (mismo START que v5.20; el d1 sale jue 8-oct por paridad), **`remap_inicio.js 2026-10-07 --bloques derma`** → `gen_derma_ciclo2.js`, `gen_research_calendar.js --print/--set/--check`, `gen_aurum_plan.js 2026-10-07`, `gen_vibecoding_plan.js 2026-10-07` (solo textos del taper) **y después `gen_synapse_plan.js 2026-10-07`** (solo textos; lee `vibecodingPlan.ts`, por eso va detrás). **`remap_inicio.js` (r2):** se eliminan sus bloques 1 (re-fechaba `usmleStep1Daily.ts` con `calNoWeekend(START, 95)`) y 3 (`usmleStep1Plan.ts` UNIDADES) —pisarían la salida del Lote 1A y destruirían el tramo 2—; como mucho queda una aserción de solo lectura `DIAS[0].fecha === START`; nueva opción `--bloques derma[,research,mir,business,liviano]` (sin ella corre todo lo que queda, como hoy); el bloque Derma usa `skip`/`protegidos` v6 y la paridad F4.

---

## §F. App (`src/`): cambios exactos

**Ficheros nuevos**
| Fichero | Contenido |
|---|---|
| `src/lib/fechasV6.ts` (GENERADO por `DATA/_scripts/gen_fechas_v6.js` desde `_fechas_v6.json`; **módulo hoja**: no importa nada de `src/`) | `FECHAS_V6` (el JSON), `FASES_V6`, `DIAS_PROTEGIDOS`, `SKIP_V6`, `faseV6(iso)` → `'F1'|'TRANSICION'|'F2'|'LIBRE_POST_ENCAPS'|'F3'|'F4'|'EXAMEN'|'F5'`, `esProtegido(iso)`, `esDiaPlan(iso)` (L-V; L-S desde `serums.inicio`), `reinicioStep1()`, `enPausaStep1(iso)` = `iso > f1.fin && iso < reinicio`, las funciones de derivación de §A4, **`type Turno = 'M'|'T'|'L'|'G'`**, **`STEP1_SEMANAS` y `semanaStep1(iso)`** (definición única de semana; antes en `homeBriefing`) |
| `src/lib/plantillasV6.ts` | bloques del día por fase: `bloquesDelDia(iso, turno?)` → F1 (los de hoy), F2 (§A1/§C3: 05:00-05:45 Anki ENCAPS+USMLE · 07:15-12:00 loop · 13:30 R↔D · 14:15-14:45 AURUM · 15:15 MIR · 16:15 carril B · 17:15 LIVIANO (→12-feb; ⏸ v6.00 · ⏸ v6.01: → 17-feb · **v6.02:** → 24-feb, de LIV_META.fin) · 18:00 eval; viernes SIM; sábado 07:15 revisión + 07:45 Step 1 vivo), F3 (F1 + 16:15 REENTRADA), F4 por turno `M|T|L|G` (tabla §B4.1) y, si ese día cae un hito (`ordenSemana`), plantilla **H** (turno T o L) o **H-sáb** (fallback); cada bloque con `frente` (para `minimoPorFrente`); MIR siempre 1 h y R↔D siempre ≥ 30' en todas las plantillas (DJ-4) |
| `src/lib/serumsTurnos.ts` | importa `Turno` de `fechasV6` + `horaInicio?` (variantes 12:00/14:00); `leerTurno(iso)`/`guardarTurno(iso, t)`; caché `localStorage 'jmd-turnos-v1'` + espejo Supabase **`serums_turnos`** (mismo patrón que `plan_checks`/`studyProgressSync`), con guarda: **no hay lectura/escritura remota si `iso < serums.inicio`**; default sin marcar = `'M'` (piso) con aviso «marca tu turno»; `ordenSemana(filasSemana, turnos)` = asignación de hito/day_after en su ventana (§B5) y plantilla H/H-sáb ese día |
| `DATA/_scripts/_migrations/serums_turnos.sql` | `create table public.serums_turnos (fecha date primary key, turno text not null check (turno in ('M','T','L','G')), hora_inicio text, updated_at timestamptz not null default now(), device text);` + RLS on + policy «Allow all» (copia de `plan_checks`). **Se aplica en el Lote 4** (crear la tabla vacía no afecta a nada; así el cliente desplegado nunca consulta una tabla inexistente) |

**`src/lib/usmleStep1Daily.ts`** (GENERADO por `assemble_usmle_ts.js`; cabecera v6.00)
- `DIAS` = 60 filas (D1-D57 v5.20 + D58 ex-D79 + C1 + C2). *(⏸ v6.00 · ⏸ v6.01: `DIAS` = 57 filas D1-D57; la ex-D79 vive en `DIAS_T2` (T3) · **v6.02:** `DIAS` = 52 filas (d 1-51 = v5.20 D1-D51 + d 52 = NBME 28, v5.20 D55); las 6 desplazadas viven en `DIAS_T2` (T3-T8))* `DIAS_T2` (158 filas, §B3) e interfaz `DiaUSMLE_T2 extends DiaUSMLE { t; tipo; dOrig; uid?; parte; fase; faseUW; h; qDiaT?; subV520?; adapt?; ventana?; nombre?; forma?; gate?; dF1?; pendiente? }` (todas las filas T traen `tier/bbCh/bbVid/uw/mat/matType/palm`, §B3). `DIAS_TODOS`.
- `DAILY_META`: `{ step:1, version:'v6.00', inicio:'2026-10-07', fin:'2027-09-25', totalDias:218, tramos:[{n:1, inicio:'2026-10-07', fin:'2026-12-30', dias:60}, {n:2, inicio:'2027-03-16', fin:'2027-09-25', dias:158, provisional:true}], pausa:{ desde:'2026-12-31', hasta:'2027-03-15', motivo:'ENCAPS intensiva + lunes libre' }, examenTarget:'2027-09-27', examenVentana:'eligibility ago-sep-oct 2027 · adelanto 2027-08-31 · base 2027-09-27 · plan B 2027-10-25', gonogo:'2027-08-09', descansoD1:'2027-09-26', serumsInicio:'2027-05-03', viernesN4DesdeSemana:11, bloque, metodo }` (textos sin «22-feb»). *(⏸ v6.00 · ⏸ v6.01: `version:'v6.01'`, `inicio:'2026-10-12'`, `totalDias:215`, tramo 1 `{n:1, inicio:'2026-10-12', fin:'2026-12-30', dias:57}`; nº de filas = 57 + 158; `d` 1-57 y 101-258 · **v6.02:** `version:'v6.02'`, `inicio:'2026-10-19'`, `totalDias:210`, tramo 1 `{n:1, inicio:'2026-10-19', fin:'2026-12-30', dias:52}`; 52 + 158 filas; `d` 1-52 y 101-258)* **`totalDias` es solo informativo (nº de filas = 60 + 158); NADIE navega ni detecta el último día con él** (los `d` no son contiguos: 1-60 y 101-258).
- `diaDe(iso)` y `diaAnterior/diaPrevio` buscan en `DIAS_TODOS`; `hitosDelPlan()` sobre `DIAS_TODOS`.
- `faseDe(d)`: `d ≤ 60 → 'A'`; `61 ≤ d ≤ 100 → 'A'` (guarda: no existen; nunca `undefined`); `d ≥ 101 → DIAS_T2.find(x => x.d === d)?.faseUW ?? 'A'`.
- `semanaDe(iso)` = `semanaStep1(iso).n` importado de **`fechasV6`** (r2: `usmleStep1Daily` NO importa `homeBriefing`, que ya importa `usmleStep1Daily` → ciclo y `DAILY_META` sin inicializar en `STEP1_INICIO = DAILY_META.inicio`).
- `esDiaTaper(x)`: `x.tipo === 'taper' || /^TAPER/.test(x.franjaNota)`. `esViernesNivel4(x)` = `(!x.tipo || x.tipo === 'contenido') && diaSemana(x.fecha) === 'vie' && x.nivelUW === 4 && faseDe(x.d) === 'A' && !esHito(x)` (r2: sin esto daría «Viernes N4» en la reentrada y en 30 colchones, también en martes y sábados).
- `USMLE_TAPER` = §B6. `FRANJAS` (F1/F3) sin cambio de horas + `FRANJAS_F4: Record<Turno, …>` (§B4.1, con `H` y `H-sáb`; `Turno` de `fechasV6`).

**`src/lib/homeBriefing.ts`** — `STEP1_SEMANAS` y `semanaStep1(iso)` se **re-exportan desde `fechasV6`** (compatibilidad de imports): `STEP1_SEMANAS = 13 + semanas(lunes del reinicio → lunes del examen)` (base 41; tabla A5) *(⏸ v6.00 · ⏸ v6.01: 40 · **v6.02:** 39 = 11 de F1 + 28)*. `semanaStep1(iso)`: S1-S13 = semanas de F1 (lun 5-oct → lun 28-dic) *(⏸ v6.00 · **v6.02:** S1-S11 = lun 19-oct → lun 28-dic)* · semanas de la pausa (lun 4-ene → semana del examen ENCAPS) → `{ pausa:true }` y `semanaLabel` = `'PAUSA · ENCAPS'` · desde la semana del reinicio: `13 + k`; la semana del examen → `'examen'`. **`hitosStep1()`** (función perezosa, sustituye a la constante `HITOS_STEP1`; se evalúa al llamarla, no al cargar el módulo) = `hitosDelPlan()` + `{ fecha: gonogo, nombre:'GO/NO-GO' }` con `minimo` desde `HITOS_ONTRACK` (no escrito a mano). `DELOAD_SEMANAS` sin cambio *(⏸ v6.00 · ⏸ v6.01: lun 16-nov y lun 28-dic · **v6.02:** lun 23-nov, post-NBME 26, y lun 28-dic, semana del NBME 28)*. `minimoPorFrente` ÁMBAR: `research-derma`, `aurum`, `liviano`, `synapse`, `vibecoding` → «30' (mínimo DJ-4)»; `mir` → «Anki + 25Q (1 h, DJ-4)»; `encaps` en F2 = «loop: pre-test 10Q + 30Q + eval 20Q»; ROJO sin cambio.

**`src/components/home/TodayMission.tsx`** — `faseActual(iso)` = etiqueta de `faseV6(iso)`: «F1 · STEP 1 TRAMO 1 (D1-D60)» *(⏸ v6.00 · ⏸ v6.01: D1-D57 · **v6.02:** «D1-D52», etiqueta literal de `fechasV6.ts` = d 1-52 (slots; d 1-51 = v5.20 D1-D51, d52 = NBME 28))* · «TRANSICIÓN» · «F2 · ENCAPS INTENSIVA (examen dom 14-mar PROVISIONAL)» · «LIBRE post-ENCAPS» · «F3 · STEP 1 TIEMPO COMPLETO» · «F4 · STEP 1 + SERUMS» · «EXAMEN STEP 1» · «F5 · post-Step 1». Los `bloques` salen de `bloquesDelDia(iso, leerTurno(iso))` (desaparecen los bloques fijos de F1 escritos a mano). Desde `serums.inicio`: **selector de TURNO** (botones M · T · L · G + variante de hora) que re-renderiza la plantilla y se guarda con `guardarTurno`; vista semanal para pre-cargar el rol del mes. Banner **DÍA PROTEGIDO** si `esProtegido(iso)`. En F2: tarjeta «Step 1 en PAUSA — Anki 30' + sábado 20Q mezcladas». Chip `semanaLabel`.

**`src/components/home/CockpitStatusBar.tsx`** — usar `semanaLabel` nuevo (PAUSA); total = `STEP1_SEMANAS`.

**`src/components/study/UsmleTodayPlan.tsx`** — `hoyD`: si `enPausaStep1(iso)` → **estado PAUSA** (no `planHoyD`); si no, `planHoyD(DIAS_TODOS, iso)`. **Navegación (r2):** por **índice** en `DIAS_TODOS` (hoy `setSel(s => Math.min(DAILY_META.totalDias, s+1))`, l. 624-627, salta del D60 al inexistente 61 y deja inalcanzables T119-T158); etiqueta «Día {d}/60» en F1 *(⏸ v6.00 · ⏸ v6.01: «Día {d}/57»; agrupación F1/T2 con `esFilaT2`, ya no `d ≤ 60` · **v6.02:** «Día {d}/52»)* y «T{t}/{DIAS_T2.length}» en el tramo 2. **Bloque D-1/EXAMEN** (l. 144 y 204, hoy `dia.d === DAILY_META.totalDias`, que pintaría el examen en d 218 = UWSA2 del 10-ago) → `dia.tipo === 'ritual' || dia.d === DIAS_TODOS.at(-1).d`. `TIER_INFO[x.tier]` (l. 120, 489, 519) con fallback `TIER_INFO[x.tier] ?? TIER_INFO.CORE`. Progreso (l. 567) con `agruparProgreso(DIAS_TODOS, (x) => (x.d <= 60 ? 'F1' : 'T2') + ':' + x.system, …)` para no fusionar Psiquiatría (d58 + T) ni Colchón (C1/C2 + T) en un grupo «en curso» todo el año. Fila T: chips `tipo`, `dOrig` («= D61 v5.20»), `parte`, `fase`; en F4 muestra la plantilla del turno del día (bloque A/B; preguntas = `qDia` con turno M/L/G y `qDiaT` (= `qDia` + 40, bloque B 07:40-10:10, AMBOSS/incorrectas) con turno T; la fila trae ambos campos; día de hito → plantilla H); filas `colchon`: lista de filas atrasadas (tramo 2 sin ✓ en `loadDone('usmle')` con fecha < hoy) con «hazla hoy»; hitos: ventana + `ordenSemana` con los turnos marcados; fila con `gate` → tarjeta GO/NO-GO (horas acumuladas vs umbral B4.5 + NBME 31/32, o el criterio del GO/NO-GO #2). Texto del D-1/examen desde `USMLE_TAPER`.

**`src/components/study/UsmleHub.tsx`** — progreso sobre `DIAS_TODOS` (misma clave `tramo:system`); eliminar el texto fijo «D94 jue 18-feb … finde libre (dom 21-feb…)» (línea ~261) → generado desde `USMLE_TAPER`; cuenta atrás a `examenTarget` (PROVISIONAL) y a `gonogo`.

**`src/lib/usmleScores.ts`** — `HITOS_ONTRACK` v6 (§B5: NBME 25 sin mínimo; 26/27 relativos a NBME 25 → nuevo campo `minRel:{ ref:'NBME 25', delta:3|6 }`; NBME 28 por tramos 58/50; NBME 29 `minRel:{ ref:'NBME 28', delta:-5 }` + alerta caída > 8; NBME 30 `minRel:{ ref:'NBME 28', delta:0 }`; 31 ≥ 65; 32 ≥ 68 (+ «uno ≥ 70»); 33 ≥ 68; Free 120 ≥ 70; UWSA3 sin mínimo) y `gateHito` que resuelve `minRel` con el % registrado del hito de referencia. **`DIAS` → `DIAS_TODOS` en las líneas 293 (`hitosPlan`), 407, 455 y 466** (si no, `proximoHito`, `gateHito`, readiness, `distanciaOnTrack` y el checklist no ven NBME 29-33, Free 120 ni el GO/NO-GO). Nuevo campo de registro diario **`horas`** guardado en `extra.horas` (la columna JSONB `extra` ya existe en `usmle_daily_scores`: sin migración de BD) — **cambios de cliente obligatorios**: añadir `horas` a `UsmleScore`, a `normalizar()` (clamp 0-16), a `tieneExtra()`, a `aFila()` (hoy sobrescribe `extra` con 5 claves fijas) y a `deFila()`, más el campo en la vista de medición; helper `horasDesde(iso)`. `faseDe` con la guarda de arriba.

**`src/lib/mirUsmleBridge.ts`** (r2, Lote 2B) — `DIAS` → `DIAS_TODOS` (l. 58 y 66).

**`src/lib/usmleData.ts`** — textos que citen `examenTarget`/hitos de feb → leer de `DAILY_META`/`hitosStep1()`.

**`src/lib/encapsPlan.ts`** — `STUDY_SKIP_DATES.ENCAPS += ['2027-03-25','2027-03-26']` · `STUDY_TOTAL_DAYS.ENCAPS = 60` (fallback) · comentarios v6 · **`repasoIntensivoDe`** (l. 186) lee las claves de `extra.repaso` **en el orden en que vienen** (hoy filtra `['D-1','D-3','D-7']` y con D-1/D-7/D-21 perdería el D-21) · **`dias_a_examen`** ya no viene en la fila: `itemsForDay` usa `diasAExamenDe(exam_date)` · **rama carril B** (r2: como **envoltorio** de `itemsForDay`, porque las ramas `sim`, `senales` y `repaso_final` hacen `return` antes de tiempo, l. 615/629/642/665): `itemsForDay(day) = [...itemsBase(day), ...itemsCarrilB(day)]`, con `itemsCarrilB` = [] salvo que `day.modo === 'INTENSIVO'` **y exista `extra.carril_b`, sea cual sea el tipo del día** (el generador ya no lo pone en `sim100`, `dress_rehearsal`, `medio_dia`): (a) `tipo === 'banqueo1h'` → `pseudo = { ...extra.carril_b, dia: day.dia, modo:'MANTENIMIENTO' }` y `prevPseudo` = carril B del día de plan anterior **salvo en lunes, donde la eval anclada es «5Q rehechas de los fallos del SIM 100Q del viernes»**; se llama a la rama MANTENIMIENTO y sus ítems llevan la clave `D${N}:b_<resto>` y la etiqueta «16:15 CARRIL B · »; (b) `tipo === 'reposicion'` → 1 ítem `D${N}:b_repo` «16:15 CARRIL B · reposición: instancias 61-92 pendientes → lista de vigilancia». *(⏸ v6.00 · ⏸ v6.01: texto «filas del carril B dia 58-89 (dia_mant 61-92) sin ✓ en D{dia}:b_*»; (c) `pendiente_f1` tipo `mini_sim` (dia 93) → rama mini_sim: `D93:b_msim` + `D93:b_msim_corr`, cierre `mini_sim` con `sim_n` 93 · **v6.02:** «filas del carril B dia 53-84 (dia_mant 61-92) sin ✓ en D{dia}:b_*»; 2 pendientes `mini_sim` (dia 88 y 94) → `D88:b_msim` / `D94:b_msim` (+ `_corr`), cierre con `sim_n` 88 / 94)* `extra.minisim_absorbido` solo se muestra como nota. `tipoRondaDe` del carril B = **`'carril_b'`** (nuevo valor de `TipoRonda`).
- **`src/lib/encapsProgressSync.ts`** (r2, Lote 2A): `TipoRonda` admite `'carril_b'` → `cierreId` = `APP_CARRIL_B_<fecha>_<codigo>`, distinto del cierre del loop del mismo día.
- `useEncapsPlan`: sin cambios de cálculo; `diasAExamen` ya usa `exam_date`.

**`src/components/EncapsPlanView.tsx`** — `HorarioView`: en días INTENSIVO añadir el bloque 16:15-17:15 «CARRIL B · <codigo> <subtema>» cuando `extra.carril_b`; `bloquesIntensivo` usa `extra.sim.hora` (default `'07:15'`, `'11:00'` en #7, #8 y D-2) en vez de 08:00 fijo; textos «mar 23-feb → mar 9-mar · examen mié 10-mar» → leídos de `study_metrics.extra.intensiva`/`exam_date` con la etiqueta «PROVISIONAL» si `examen_target` la contiene; si hoy > `exam_date` → aviso «examen rendido».
**`src/components/EncapsCockpit.tsx`** — mismos textos de fecha (examen provisional, intensiva 4-ene).

**MIR** — `src/lib/mirMantenimiento.ts` (GENERADO, §D) · `src/components/study/MirTodayPlan.tsx`: fallback diario → mantenimiento/extensión (`MIR_MANT_DIAS` ya incluye la extensión) · navegación (l. 880-883) hasta `MIR_MANT_DIAS.length` (= `MIR_MANT_META.totalDias` = 188) y texto «ene→sep 2027» (l. 870) · franja por turno en F4 (`mirFranjaPorTurno(dia, leerTurno(iso))`, plantilla H en día de hito, guardia = 1 h en tiempo muerto) · `tipo:'sabado'` · texto handoff · banner día protegido. `src/lib/mirData.ts`: texto de protegidos v6.

**Research/Derma** — `src/lib/researchData.ts`: `diaEstudioTipo(date)` con la regla F4 de §E (importa `FECHAS_V6.serums.inicio`; el sábado deja de ser `'descanso'` desde esa fecha) · `ResearchTodayPlan.tsx`/`DermaTodayPlan.tsx`/`ResearchHub.tsx`/`DermaHub.tsx`: en F4 etiqueta «30' en tiempo muerto (posta)» y franja sin hora; **`ResearchTodayPlan` en un día-Research de la pausa 15-ene → 10-feb muestra la tarjeta «Research mínimo 30' (DJ-4)»** (§E; no es fila del plan ni cambia átomos) · `researchDailyPlan.ts`, `researchDailyPlan2027.ts`, `dermaDailyPlan.ts`, `dermaCiclo2.ts` (GENERADOS, §E).

**AURUM** — `aurumDailyPlan.ts` (GENERADO) · `AurumTodayPlan.tsx`/`AurumHub.tsx`: si `min30` → «30' (núcleo)». **Vibecoding** — `vibecodingPlan.ts` (GENERADO; textos de taper S13-S20 «por el ENCAPS»).

**Qué lee qué (para no romper consumidores)**
| Símbolo | Lo leen |
|---|---|
| `DIAS` / `DIAS_TODOS`, `diaDe`, `planHoyD` | TodayMission, UsmleTodayPlan, UsmleHub, usmleScores, **mirUsmleBridge**, DesktopRightPanel (SYNAPSE, no USMLE) |
| `DAILY_META` (USMLE) | homeBriefing, TodayMission, UsmleHub, UsmleTodayPlan, usmleData (+ los `DAILY_META` propios de Research/Derma/MIR, que no cambian de nombre) |
| `faseDe` | UsmleTodayPlan, usmleScores (los `faseDe` de AurumHub/ResearchHub/SynapseHub son de sus propios planes) |
| `USMLE_TAPER`, `esDiaTaper`, `semanaDe` | UsmleTodayPlan, UsmleHub |
| `semanaStep1`, `STEP1_SEMANAS` (definidos en `fechasV6`, re-exportados por homeBriefing), `hitosStep1()` | TodayMission, CockpitStatusBar, usmleStep1Daily (`semanaDe`), SynapseTodayPlan/vibecodingPlan (solo texto `semanaStep1` de las filas) |
| `HITOS_ONTRACK` | usmleScores, UsmleHub, usmleData |
| `exam_date`, `diasAExamenDe`, `regimenDe`, `itemsForDay`, `STUDY_SKIP_DATES`, `cierreId`/`TipoRonda` | EncapsPlanView, EncapsCockpit, encapsProgressSync; `encaps_telegram_daemon.py` (solo cuenta `D{dia}:*` y lee `dia` por fecha) |
| `MIR_MANT_*`, `mirMantFranjas` | MirTodayPlan, mirDailyPlan |
| `Turno` (de `fechasV6`) | serumsTurnos, plantillasV6, usmleStep1Daily (`FRANJAS_F4`), mirMantenimiento (`mirFranjaPorTurno`) |
| `diaEstudioTipo` | ResearchTodayPlan, DermaTodayPlan, ResearchHub, DermaHub, researchDailyPlan, dermaDailyPlan, dermaCiclo2 |
| `fechasV6` (nuevo, hoja) | TodayMission, homeBriefing, usmleStep1Daily (consts, `semanaDe`, `Turno`), UsmleTodayPlan, MirTodayPlan, mirMantenimiento, researchData, serumsTurnos, plantillasV6 |

---

## §G. Google Calendar (josephsototocas@gmail.com · America/Lima)

Reglas: `recurrence` del MCP está roto para UPDATE → cambiar recurrencia = **crear la serie nueva y después borrar la vieja** (con OK de Joseph); al recrear, conservar `DTSTART` original si se quiere preservar el historial; UNTIL en UTC `…T045959Z` (= 23:59:59 Lima del día anterior). Antes de borrar, `get_event` para confirmar `RRULE`. Todos los títulos/descr. de eventos re-fechados llevan «v6.00» y «PROVISIONAL» si dependen del ENCAPS o del SERUMS.
**(r2) Orden con OK:** el OK de Joseph se pide **antes de crear** la serie de reemplazo; con OK → crear e inmediatamente borrar la vieja (nunca conviven); **sin OK → no se crea nada** y solo se actualiza la descripción de la serie vieja («v6: termina el …; ignorar desde el …»), para no duplicar eventos (p. ej. las 6 series USMLE recreadas convivirían con las viejas del 31-ago al 30-dic).
**(r2) EXDATE en toda serie creada:** la `RRULE` sí funciona en CREATE, así que cada serie nueva lleva `EXDATE;TZID=America/Lima:<AAAAMMDD>T<HHMMSS>` para todos los días de `SKIP_V6 ∪ protegidos` (que no sean de su plan) dentro de su rango y que casen con su `BYDAY`: 2026-12-25, 2026-12-31, 2027-01-01, 2027-03-12, 2027-03-15, 2027-03-25, 2027-03-26 (y, en F4, la adjudicación cuando se sepa).

**G1. F1 (hacer ≤ vie 9-oct; NBME antes del mar 20-oct)** *(⏸ v6.00 · ⏸ v6.01: Calendar v6.01: `cal/CAL_V6.md` §9 (UWSA1 lun 12-oct · NBME vie 23-oct / vie 13-nov / vie 4-dic / lun 28-dic · gates mié 4-nov / mié 2-dic · C1/C2 consumidos · checkpoint mini-sim 50) · **v6.02:** `cal/CAL_V6.md` §11 (UWSA1 lun 19-oct · NBME vie 30-oct / vie 20-nov / vie 11-dic / **mié 30-dic** · gates mié 11-nov / mié 9-dic · checkpoint mini-sim 45 vie 18-dic))*
- UWSA1 `o1gla7846uae4tgngvc4q45osg`: **sin cambio** (09:00-13:00).
- NBME 25/26/27/28 (`4hjv5lkvluj06ahc2qndtsi6as`, `lr7ktrbiffj4hrlke7lh7cv6h4`, `sm4baa2v453ifaub325h9v08mg`, `ecu784689p8osrhqabuct8d5jg`): misma fecha, **07:00-12:30**, descripción v6 (NBME 28 = checkpoint de fecha).
- **Recrear las 6 series USMLE principales (con OK previo)** con `DTSTART` original (31-ago-2026), **UNTIL `20261231T045959Z`** (último día mié 30-dic) y EXDATE 25-dic: Anki AM 05:00 `i8afj7uppkb3ntj8h9890dhecc` · repaso 07:15 `54lchqggik96dmljmmg3l88s54` · pre-test 08:15 `3tbecd5n03ut6lno3hjvc1sr7k` · deep prime 09:00 `cb2uh20jnvu7pgfev4183pgctc` · 30Q 11:00 `2eqmmrnh00jr44plevurgcu2as` · eval 18:00 `utk2laeob9u0847bbe9rm491v4` (hoy UNTIL `20270130T045959Z`, verificado en el Anki AM). Sin OK: solo descripción «v6: el Step 1 se pausa del 31-dic al 15-mar; ignorar estas franjas en ese periodo».
- Crear eventos de todo el día: «GATE F1 · núcleo ≥ 85 %» vie 30-oct y vie 27-nov · «C1/C2 colchón F1» mar 29 y mié 30-dic (descr.) · ENCAPS «checkpoint del año (mini-sim 53)» vie 18-dic.
- **ENCAPS 16:15 `papebi46etlo8glgfs5akd5mig` NO se recrea** (≠ propuesta): la franja 16:15 es continua F1 (mantenimiento) → F2 (carril B) y la serie ya termina el vie 29-ene; solo descripción v6 («F1 mantenimiento hasta 30-dic · F2 carril B 4-ene → 16-feb; viernes de F2 = libre»). Sus viernes de F2 (8, 15, 22, 29-ene) y los de `d8252…` (5, 12-feb) siguen apareciendo: 6 instancias que la descripción declara libres; **con OK de Joseph** se borran esas 6 instancias sueltas (no la serie).

**G2. F2 (hacer ≤ jue 24-dic)**
- Re-describir `d8252hjo5ra2qlqb9bccd6vkjo` (16:15 lun 1 → mar 16-feb) = carril B (filas 89-92 incluidas).
- **Borrar (con OK)** las 6 extensiones USMLE D81-D93: `qhtokf24r3pojno1c3a8ojggls`, `u08hjmtk5uh48vitg77ulf69ho`, `rmcsbarba82vm8h9nron281tac`, `rfnkceao6uai75qp9f5tq52duk`, `b98p0181f362am46j1kttf7ics`, `anjhsglon4e0nadjvgmgpdekrg` (bloques diarios, no evaluaciones; su contenido vive en el tramo 2).
- **Borrar (con OK)** las 3 series del loop intensivo v5.20: `ie79j1cvek17u6e6f8h2tckfbo` (Anki cifras), `i4o9s8fhkln9lhlcteh19mtsc4` (loop 07:15-12:15), `do51osapt575a926ne07mlbfac` (tarde 17:15-18:45).
- **Crear series F2** (DTSTART lun 4-ene-2027): (1) 05:00-05:45 «ENCAPS Anki cifras + USMLE Anki mantenimiento» L-V, UNTIL `20270313T045959Z` · (2) 07:15-12:00 «ENCAPS LOOP (repaso D-1/D-7/D-21 · pre-test · deep prime · 30Q)» L-J, UNTIL `20270311T045959Z` (último mié 10-mar) · (3) 18:00-18:45 «ENCAPS EVAL 20Q (10 + 10) · viernes: --pull y cierre semanal» L-V, UNTIL `20270311T045959Z` (último mié 10-mar; el D-2 y el D-1 no llevan eval) · (4) 16:15-17:15 «ENCAPS carril B · reposición» L-J del mié 17-feb, UNTIL `20270311T045959Z` · (5) sábado 07:45-09:15 «STEP 1 VIVO · 20Q mezcladas (10 incorrectas UWorld + 10 AMBOSS)» del sáb 9-ene, UNTIL `20270307T045959Z` (último sáb 6-mar). Ninguna cruza un día de SKIP/protegido salvo (1), que lleva EXDATE vie 12-mar si el D-1 hábil no lleva Anki (por defecto sí lo lleva: medio día).
- **(r2) Si la convocatoria mueve el ENCAPS** (siempre a una fecha POSTERIOR al 14-mar): las series (1)-(5) **no se recrean ni se borran**; se **CREAN series de extensión** con `DTSTART` = día siguiente a su UNTIL vigente y UNTIL = nuevo fin (mismas franjas; EXDATE 25-26-mar si los cruzan), se re-fechan con `update_event` los eventos sueltos (DRESS, D-1, EXAMEN ENCAPS, «🛡 DÍA PROTEGIDO») y se crean los SIM de módulo nuevos. Así nunca hace falta el OK de borrado para este disparador.
- Re-fechar (ids conservados): banner `4mfnu95lrhr3dmu87einr3jm5k` → todo el día lun 4-ene → vie 12-mar · PRE-TEST `27bs58ee0ke180ht2rh6mgvft0` → vie 8-ene 07:15-09:15 · SIM `g6t22lagnagt2sbrbo0n9d3u8k` → vie 15-ene 07:15-09:15 (SIM #1 2025-II) · DRESS `ip4lhi4lhigad4l1titbd36jnk` → **jue 11-mar 11:00-13:00** · D-1 `tl0irrsb4av0vd8d1ar8vmbuoo` → vie 12-mar · EXAMEN ENCAPS `8juk0mvl66tutdkbcei7umrs68` → **dom 14-mar 11:00-13:00 PROVISIONAL**.
- Crear 7 SIM: vie 22-ene, 29-ene, 5-feb (2024-II), 12-feb, 19-feb (07:15-09:15) · 26-feb (2025-I) y 5-mar (11:00-13:00); más «corrección 09:30-11:00 + 2 códigos peores 11:00-12:00» en la descripción.
- Protegidos: crear todo el día «🛡 DÍA PROTEGIDO» vie 12-mar y lun 15-mar.
- **Series secundarias abiertas (sin UNTIL) — cortar donde termina su plan (con OK; crear-después-borrar con DTSTART original):** vibecoding 04:15 `udr09j9ng983o0d4nipkfe4494` → UNTIL `20270220T045959Z` · SYNAPSE 12:30 `j99thg3eaqesosmvppj4rfgvh4` → `20270216T045959Z` · LIVIANO 17:15 `8epae6hlfmrc9j0h2kib7iuc84` → `20270213T045959Z` · AURUM 14:15-15:15 `at1nak8f24nbnj1mh2jcd4aggg` → `20261231T045959Z` + **nueva** AURUM 14:15-14:45 L-V lun 4-ene → UNTIL `20270416T045959Z` con **EXDATE 12-mar, 15-mar, 25-mar, 26-mar (14:15)** · Research↔Derma 13:30 `3ofg2ljv8kl3p1adm2e5d5nih3` y MIR 15:15 `2ldp6obaapnvo76li28uprrddg` / 15:30 `00k364heibh1n6f9hfspcv9dpi` → UNTIL = día del inicio real del SERUMS a las 04:59:59Z (provisional `20270501T045959Z` = hasta vie 30-abr), **con EXDATE de los días SKIP/protegidos del rango** (25-dic, 31-dic, 1-ene, 12-mar, 15-mar, 25-mar, 26-mar a su hora; los protegidos v5.20 22-feb, 9-mar y 10-mar vuelven a ser días de plan); en F4 van por turno (G5). Si Joseph no da el OK: dejar las series y actualizar solo descripciones («termina el …»).
- REVISIÓN SEMANAL `6iog066kra2e07ue1d0f2osuvs` (hoy sáb 10-oct → sáb 20-feb, 07:15): recrear con la misma DTSTART, 07:15-07:45, hasta el sáb 1-may (UNTIL `20270502T045959Z`; cubre F1, F2 —antes del STEP 1 VIVO— y F3); F4: serie de todo el día «📋 Revisión semanal 20' (dentro del Step 1 del sábado)» sáb 8-may → sáb 18-sep.

**G3. Hitos Step 1 2027 (re-fechar ya, ids conservados, título con «PROVISIONAL»)**: NBME 29 `ae93qv0nqqs36h439hid1jcq8o` → mié 17-mar 07:00-12:30 · NBME 30 `mael3p9uhp036jbep45ql6v9oc` → lun 24-may 07:00-12:15 · NBME 31 `l771lvcfv0jcebt61do6svia18` → mié 28-jul 07:00-12:15 · NBME 32 `h65e772pqsa4hgc5b6bh9n8h50` → vie 6-ago 07:00-12:15 · UWSA2 `2u7viv0elr6aedo0m9undfa5kg` → mar 10-ago 07:00-11:15 · NBME 33 `la5rsbuiqj1o35lb5adf93abuo` → lun 30-ago 07:00-16:30 (ensayo 7 bloques) · Free 120 `lh9jfjsmoif74ci6jcn8f1mq30` → lun 13-sep 07:00-10:15 · D94 `neboplchsaua4snj39nrl480nc` → jue 23-sep 04:05-06:05 · D95 `n90bdqhohadu1eqbctv148dn28` → vie 24-sep 04:05-05:05 · EXAMEN `oinh139dsnbuma9r3kfu56dhkc` → lun 27-sep 07:00-16:00. **Crear**: UWSA3 (opcional) mar 29-jun 07:00-11:15 · GO/NO-GO lun 9-ago (todo el día) · eventos de todo el día por cada **ventana** («Ventana NBME 31: lun 26 → sáb 31-jul · preferente mié 28-jul · si turno M → primer día T») · ritual sáb 25-sep · viaje a Lima dom 26-sep · regreso mar 28-sep.
- Research 🔬: `node DATA/_scripts/gen_research_calendar.js --print` → `update_event` de X-9 (→ jue 11-mar) y R43 (→ sáb 17-jul, todo el día) → `--set` → `--check = 0`.

**G4. F3 (al salir la convocatoria; DTSTART = reinicio, UNTIL = día del inicio real del SERUMS; EXDATE 25-26-mar si los cruza):** 05:00-05:45 Anki · 07:15-12:00 Step 1 (una serie) · 16:15-17:15 REENTRADA · 18:00-18:45 eval · protegidos (D-1 hábil, lunes libre) re-fechados.

**G5. F4 (al conocerse el inicio real del SERUMS): como el turno es variable, el Calendar solo lleva lo invariante:**
- Serie «STEP 1 · BLOQUE A» **04:05-05:55 L-S** (vale para M y T) desde `serums.inicio` hasta el vie 24-sep.
- Serie de todo el día L-S «🏥 SERUMS · turno variable — plantilla del día en la app (M: B 14:30 · MIR 16:00 | T: gym 06:10 · B 07:40 · MIR 10:35) · R↔D 30' en tiempo muerto».
- Hitos/ventanas (G3), protegidos, adjudicación/inducción (cuando se sepan).
- Rutinas personales que chocan con el turno (EKER 04:00 `22bh9m5jhc7ro6aj3m4ffjad7g` · PREPARAR CORRER `40odesk58rnd2qhorsj15ule11` · CORRER `5mrm4ru08go9k70408jm8vcjku` · CALISTENIA `2lpvftrc3fp64e0om6qg0mcs34` · DUCHA `mm2h37rbq89mbg917b8b983aa2` · DESAYUNO `7agi60f2bp8qnh6cnqvfo22giv` · ALMUERZO `43dq3oib16esjcqj1dcd8osot2` · LECTURA `7jmf8p1l5b5q6jbtmj9uualiq8`): decisión de Joseph (§I) entre cortarlas al día previo al SERUMS o dejarlas. DORMIR `blkgb23e0es0phm2qee6cgqpp0`, GYM `6740kavnfkdcvj5k149ouliauu`, BAILE `64lue1en3hk0cf8itml2rtlqi4` y los viajes de la noche **se mantienen** (válidos en turno M; en T la app manda el gimnasio a las 06:10).
- Opcional (cuando Joseph pase el rol mensual): `DATA/_scripts/gen_calendar_turnos.js <rol.json>` (nuevo; `{ "2027-05-03": "M", … }`) crea los eventos del mes con la plantilla M/T y carga `serums_turnos`.

**G6. Barrido de descripciones**: listar con `list_events` los días mié 14-oct, lun 18-ene, vie 15-ene, sáb 9-ene, dom 10-ene, lun 3-may y actualizar a v6 la descripción de cada serie que mencione «22-feb», «10-mar», «D95», «v5.20» (sin tocar su recurrencia).

---

## §H. Orden de implementación, lotes y verificaciones

**Lote 0 · orquestador (secuencial, antes que nada)**
1. Backups: `CREATE TABLE study_schedule_bk_v600_<AAAAMMDD> AS SELECT * FROM study_schedule;` y `study_metrics_bk_v600_<AAAAMMDD>`; hash de las filas ENCAPS 1-60 actuales calculado **en Postgres** (`md5(string_agg(row_to_json(t)::text, '' ORDER BY dia))` sobre `examen, dia, fecha, tipo, codigo, subtema, prioridad, modo, temas_secundarios, extra`) → guardar (se compara después con el mismo SQL; nunca contra un hash calculado en node).
2. Export JSON de las filas MANTENIMIENTO 61-92 → `DATA/ENCAPS/_carril_b_v520_61-92.json`.
3. `DATA/_scripts/_fechas_v6.json` + `gen_fechas_v6.js` (con las funciones de derivación y la aserción guardado = derivado) → `src/lib/fechasV6.ts` (incluye `Turno`, `STEP1_SEMANAS`, `semanaStep1`).
4. Copiar a `DATA/_scripts/usmle/ref_v6/` como referencia de verificación, **con sus dependencias**: `gen_tramo2_ref.js`, `cal.js`, **`dias_v520.json` (congelado: es v5.20 = HEAD `fd85f61`; NO volver a generarlo con `dias.js`, que tras el Lote 1A leería la v6)**, `tramo2_14mar_27sep.json` y `v1_check.js`. V1 y el port leen ese `dias_v520.json`, no `git show HEAD` (deja de ser v5.20 tras el commit).

**Lote 1 (2 agentes en paralelo; ficheros disjuntos)**
- **1A · USMLE datos**: `DATA/_scripts/usmle/gen_usmle_v5.js` (F1: `F` = 60 hábiles hasta el 30-dic; D58 = fila de D79; C1/C2 *(⏸ v6.00 · ⏸ v6.01: F1 = 57 hábiles desde el lun 12-oct; `--f1-filas 57`; C1/C2 consumidos; D79 → tramo 2 · **v6.02:** F1 = 52 hábiles desde el lun 19-oct; `colocarF1(52)` con los hitos anclados (NBME 28 = d52); D52-D54, D56, D57 y D79 → tramo 2)* con la excepción `nivelUW 4 · qDia 40`; `SIMS` indexado por **D#**, no por fecha; horas de hitos F1; tramo 2 = port de `gen_tramo2_ref.js` r2 leyendo `_fechas_v6.json`, incluidas las opciones `--congelar-hasta/--previo/--examen-previo/--pendientes/--pendientes-f1/--proteg` y el aborto por déficit) · `assemble_usmle_ts.js` (DIAS_T2, DAILY_META v6, USMLE_TAPER, FRANJAS_F4, faseDe/semanaDe/esDiaTaper/esViernesNivel4/diaDe) · `update_diainicio.js` (r2: lee **`DIAS_TODOS`**: Micro, Repro, MSK y Bioq solo existen en el tramo 2; `usmleStep1Plan.ts` no lo importa ningún fichero de `src/`, así que no bloquea) · `remap_obsidian_usmle.js` → `src/lib/obsidianMap.ts` (D58-D60 y filas T con `dOrig`). Salida: `src/lib/usmleStep1Daily.ts`, `src/lib/usmleStep1Plan.ts`, `src/lib/obsidianMap.ts`.
- **1B · Secundarios datos**: `gen_mir_mantenimiento.js` → `mirMantenimiento.ts` (con la rama `sabado` de `mirMantFranjas`) · `gen_research_plan.js` (START 2026-10-07, paridad F4) → `researchDailyPlan.ts`, `researchDailyPlan2027.ts` · **`remap_inicio.js 2026-10-07 --bloques derma`** (r2: sin los bloques 1 y 3, que re-fechaban `usmleStep1Daily.ts`/`usmleStep1Plan.ts` —ficheros de 1A— y sin la exigencia `USMLE == 95`; constantes v6 + paridad F4) → Derma `dermaDailyPlan.ts` + `gen_derma_ciclo2.js` → `dermaCiclo2.ts` · `gen_aurum_plan.js 2026-10-07` → `aurumDailyPlan.ts` · `gen_vibecoding_plan.js 2026-10-07` (textos) **→ `gen_synapse_plan.js 2026-10-07`** (textos; editar antes el texto fijo de su cabecera, l. 21 y 534) · `src/lib/researchData.ts` (`diaEstudioTipo`). **No toca** ficheros de 1A.

**Lote 2 (2 agentes en paralelo)**
- **2A · ENCAPS**: `gen_encaps_intensivo_2027.js` (§C3), `gen_encaps_mantenimiento_2027.js` (solo `HASTA`, `--de-hasta`, guarda SQL), `gen_encaps_semana.js` (l. 544), `gen_encaps_minisim.js`, `src/lib/encapsPlan.ts`, **`src/lib/encapsProgressSync.ts`** (`TipoRonda 'carril_b'`), `src/components/EncapsPlanView.tsx`, `src/components/EncapsCockpit.tsx`, `D:\agente_estudio\scripts\encaps_telegram_daemon.py` (reescribir `get_today_dia`, §C2). Genera en seco los 6 escenarios (`--out`) y el SQL del escenario base con `--sin-tx`. **No siembra** (lo hace el orquestador tras el deploy).
- **2B · App Step 1 / Home / MIR / turnos**: `src/lib/plantillasV6.ts`, `src/lib/serumsTurnos.ts`, `src/lib/homeBriefing.ts`, `src/lib/usmleScores.ts`, `src/lib/usmleData.ts`, **`src/lib/mirUsmleBridge.ts`**, `src/components/home/TodayMission.tsx`, `CockpitStatusBar.tsx`, `src/components/study/UsmleTodayPlan.tsx`, `UsmleHub.tsx`, `MirTodayPlan.tsx`, `ResearchTodayPlan.tsx`, `DermaTodayPlan.tsx`, `ResearchHub.tsx`, `DermaHub.tsx`, `src/components/empresa/AurumTodayPlan.tsx`, `AurumHub.tsx`, `src/lib/mirData.ts`, `DATA/_scripts/_migrations/serums_turnos.sql` (fichero; se aplica en el Lote 4).

**Lote 3 · orquestador**: `npx tsc --noEmit` = 0 errores · `npx expo export -p web` OK · deploy · **verificación por contenido del bundle**: `examenTarget:'2027-09-27'` ×1, `version:'v6.00'`, `inicio:'2026-10-07'`, `'2027-03-25'` presente en STUDY_SKIP_DATES, 0 × `examenTarget:'2027-02-22'`, 0 × `exam_date` fijo «2027-03-10» en el código · **control de textos (r2)**: `grep` en `src/lib/*.ts` (salvo comentarios de bitácora `vX.YY:`) = 0 apariciones de «examen lun 22-feb», «22-feb» como fecha del Step 1 y «D9[0-5] … feb» en `synapseDailyPlan.ts`, `vibecodingPlan.ts`, `usmleStep1Daily.ts`, `homeBriefing.ts`, `usmleData.ts`.

**Lote 4 · siembra ENCAPS (orquestador; UNA sola transacción `execute_sql`, r2)**:
```sql
BEGIN;
DO $$ BEGIN IF (SELECT count(*) FROM study_schedule WHERE examen='ENCAPS' AND modo='MANTENIMIENTO' AND dia BETWEEN 61 AND 92) <> 32
  THEN RAISE EXCEPTION 'esperaba 32 filas MANTENIMIENTO 61-92'; END IF; END $$;
CREATE TABLE study_schedule_bk_v600_int_<AAAAMMDD> AS SELECT * FROM study_schedule WHERE examen='ENCAPS';   -- aborta si existe
DELETE FROM study_schedule WHERE examen='ENCAPS' AND modo='MANTENIMIENTO' AND dia BETWEEN 61 AND 92;
<salida de gen_encaps_intensivo_2027.js 2027-01-04 2027-03-14 --base 2026-10-07 --carril-b DATA/ENCAPS/_carril_b_v520_61-92.json --sin-tx:
   DELETE … modo='INTENSIVO' (quita las 11 filas v5.20, dia 97-107, ya en el backup) + INSERT dia 61-110>
<UPDATE study_metrics … extra (jsonb_set), §C3>
COMMIT;
```
Las filas 1-60 **no se tocan** (no se ejecuta el generador de mantenimiento: con `--hasta 2026-12-31` cambiaría `extra.de` en 49 filas). Los SQL de los generadores traen su propio `BEGIN/COMMIT` → por eso `--sin-tx`. Después, aparte: `serums_turnos.sql` (crear tabla vacía).

**Lote 5 (2 agentes en paralelo)**: **5A · Calendar** (§G1-G3, G6; borrados solo con OK) · **5B · Docs y memoria** (`DATA/PENDIENTES_JOSEPH.md`, `DATA/REESTRUCTURACION_31AGO_2026.md` §v6.00, `ROADMAP_MAESTRO`, `DATA/ENCAPS/SENALES_2027-I.md` («~14-mar» de Joseph), `DATA/ENCAPS/CALENDAR_SEGMENTOS_V5_6.md`, `PROTOCOLO_MODO_MINIMO.md` (mínimo 30'), READMEs USMLE/MIR, memoria: línea ESTADO VIGENTE, `usmle-step1-v5` → v6, `encaps-mantenimiento-2027-1`, `coach-stance-encaps` (objetivo por fase), handoff nuevo).

**Lote 6 · commit + push (con OK) + verificación final de deploy.**

**Verificaciones obligatorias**
| # | Qué | Criterio |
|---|---|---|
| V1 | Multiset USMLE | `node DATA/_scripts/usmle/ref_v6/v1_check.js <DIAS_T2 exportado a JSON>` → exit 0. Define: multiset de `(system, normSub(sub), bbCh, bbVid, uw, mat, matType, palm?.id)` de las 95 filas v5.20 (**`ref_v6/dias_v520.json` congelado**, no `git show HEAD`) = multiset de {DIAS d1-57, D58} ∪ {filas `DIAS_T2` con `dOrig`, una por `dOrig` (las partidas cuentan una vez), con sus campos copiados de v5.20 y su `subV520`} → **diferencia 0**; **además** toda fila con `dOrig` cumple `normSub(sub).includes(normSub(subV520))` (el texto v5.20 sigue visible) y toda fila T trae los 8 campos de `DiaUSMLE`. `normSub(s) = s.replace(/\d{2}:\d{2}-\d{2}:\d{2}/g, '')`. (r1 fallaba: 72 claves distintas por faltar `bbCh…palm` y por reetiquetar `system`; r2 = 0.) |
| V2 | Tramo 2 | `DIAS_T2` = `tramo2_14mar_27sep.json` en **todas las claves** del JSON de referencia (incluidas `system, tier, bbCh, bbVid, uw, mat, matType, palm, sub, qDiaT, faseUW, uid`) → 0 diferencias |
| V2b | Presupuesto uWorld | uWorld FRESCO planificado (F1 sin hitos ni C1/C2 + `contenido` + `refuerzo` + `uw_random` del tramo 2) ≤ 3.659 − (uso real de F1 por encima de lo planificado) · referencia r2: 1.930 + 1.340 = 3.270; ninguna fila de reactivación/colchón/reentrada ni `qDiaT` declara uWorld fresco en `uw` |
| V3 | Fechas | *(⏸ v6.00 · ⏸ v6.01: D1 2026-10-12 (Derma d1 2026-10-13); ENCAPS `medio_dia` = dia 107 · **v6.02:** D1 2026-10-19 (Research d1 2026-10-20); ENCAPS `medio_dia` = dia 102)* Para USMLE, MIR, Research, Derma y AURUM: 0 filas en `SKIP_V6` o `protegidos` **salvo** las de tipo `ritual` (USMLE T158 sáb 25-sep) y ENCAPS `medio_dia` (dia 110 vie 12-mar); sábados solo ≥ 2027-05-03 y domingos 0 en esos planes (SYNAPSE y Business quedan fuera de la regla de fines de semana: sus filas DESCANSO de sáb/dom son anteriores al SERUMS y no cambian); D1 = 2026-10-07 en USMLE/ENCAPS/MIR/Derma, d1 Research 2026-10-08 |
| V4 | Secundarios | Research 42 + 67 (c2 fin 2027-08-21) · Derma 73 + 30 (c1 fin 2027-05-05, c2 fin 2027-07-14) · AURUM 130 (fin 2027-04-15) · MIR 78 + 57 + 131 *(⏸ v6.00 · ⏸ v6.01: c2 fin 2027-08-24 · Derma 2027-05-10 / 2027-07-19 · AURUM 2027-04-20 · MIR 78 + 57 + 128 · **v6.02:** c2 fin 2027-08-31 · Derma 2027-05-14 / 2027-07-23 · AURUM 2027-04-27 · MIR 78 + 57 + 123)* · multiset de códigos/átomos = v5.20 |
| V5 | ENCAPS Supabase | 60 filas MANTENIMIENTO (dia 1-60) *(⏸ v6.00 · ⏸ v6.01: 57 MANT `dia` 1-57 re-sembradas + 50 INT 58-107; verificar con la huella v2 107 · `1795d281…` · **v6.02:** 52 MANT `dia` 1-52 + 50 INT 53-102; huella v2 102 · `60e16744…`)* con **hash Postgres = hash previo** (Lote 0) **y** `(SELECT … FROM study_schedule WHERE dia<=60) EXCEPT (SELECT … FROM study_schedule_bk_v600_<fecha> WHERE dia<=60)` = 0 filas en los dos sentidos · 50 filas INTENSIVO (61-110, contiguas) = el VALUES generado: cargarlo en una tabla temporal y `EXCEPT` en los dos sentidos = 0 (no comparar md5 de node con `jsonb::text`: Postgres reordena las claves y añade espacios) · 26 con `extra.carril_b.tipo='banqueo1h'` cuyo contenido = el JSON exportado · 6 con `extra.minisim_absorbido` · 13 con `reposicion` · 0 con `extra.dias_a_examen` · `study_metrics.extra.exam_date = '2027-03-14'`, `dias_ciclo = 60` |
| V6 | App | tsc 0 · export web OK · `regimenDe` → `{d1:'2026-10-07', total:110}` *(⏸ v6.00 · ⏸ v6.01: `{d1:'2026-10-12', total:107}`; navegación D57 → T1 · **v6.02:** `{d1:'2026-10-19', total:102}`; navegación D52 → T1)* · `diaActual` el 2027-03-29 (escenario 4-abr) = día correcto con SS · estado PAUSA entre 31-dic y 15-mar · carril B visible y con ✓ (claves `b_`, cierre `APP_CARRIL_B_…`) también en días `senales` y `repaso_final` · la navegación del USMLE llega de D60 a T1 y hasta T158 · el bloque D-1/EXAMEN sale solo en el ritual · `esViernesNivel4` falso en T1 y en todo colchón · repaso D-21 visible · `extra.horas` se guarda y se relee |
| V7 | Calendar | `list_events` en mié 7-oct, mar 20-oct, lun 4-ene, vie 15-ene, sáb 9-ene, jue 11-mar, dom 14-mar: series esperadas presentes y las borradas ausentes; hitos con fecha/hora de §B5/§G3; `gen_research_calendar.js --check = 0` |

---

## §I. Abiertos, supuestos y disparadores

| Tema | Hoy (supuesto) | Disparador | Qué se regenera |
|---|---|---|---|
| **Convocatoria / fecha real del ENCAPS 2027-I** | dom 14-mar PROVISIONAL | publicación (regla: ≥ 25 días antes; sin convocatoria al mié 17-feb el 14-mar queda descartado → se pasa a 21-mar; al 24-feb → 4-abr; …) | `_fechas_v6.json.encaps.examen` → ENCAPS filas ≥ 8-mar (`--desde`, módulos + cola) · protegidos · MIR/Research/Derma/AURUM (una pasada) · tramo 2 con nuevo reinicio y `E = reserva_por_encaps[examen]` (31-ago / 27-sep / 25-oct) · Calendar G2 (series de extensión + eventos sueltos) + G4 · ⚠ **v6.02: antes de fijar `E`, correr `node DATA/_scripts/gen_fechas_v6.js --check --calculo` (solo lectura) y reservar la más tardía de la tabla literal y de la regla de cálculo, avisando a Joseph** (con la F1 de 52: 21-mar → lun 27-sep, literal 31-ago · 11-abr → lun 25-oct, literal 27-sep · 25-abr → ninguna de DJ-1 = extensión; §B4.4 · `DATA/PENDIENTES_JOSEPH.md` (vi)) |
| **Inicio real del SERUMS 2027-I** | lun 3-may [S] (norma: 1-may; 2026-I fue mié 6-may-2026; en 2027 el 6-may es jueves) | RM de inicio | `serums.inicio` → tramo 2 **con congelado ≤ hoy** (F3/F4), MIR extensión (sábados), paridad Research/Derma, G5. La fecha a reservar no cambia (comprobado con 6-may) |
| GO/NO-GO NO-GO / colchón agotado | — | E-49 / 0 colchones futuros con filas atrasadas | tramo 2 con `--congelar-hasta <hoy> --previo …` (+ `--examen-previo` y cola NO-GO de B5 si cambia `E`; + `--pendientes` con las unidades sin ✓) |
| Cierre de F1 | — | jue 31-dic | `--pendientes-f1` con las filas d ≤ 58 sin ✓ no cubiertas por C1/C2 *(⏸ v6.00 · ⏸ v6.01: filas d ≤ 57 sin ✓ (C1/C2 ya consumidos) · **v6.02:** slots d 1-52 no-hito sin ✓ → `--pendientes-f1 <d>` (d = slot de F1))* |
| MIR el vie 12-mar (D-1 hábil del ENCAPS, medio día) | protegido (precedente v5.20: el D-1 del ENCAPS lo era) | decisión de Joseph | si quiere MIR esa tarde: quitar 12-mar del set de MIR y regenerar MIR (+1 fila) |
| Research en la pausa de átomos 15-ene → 10-feb | átomos sin cambio + 30' «Research mínimo (DJ-4)» en sus días | decisión de Joseph | alternativa: quitar la pausa y re-fechar los átomos (adelanta CR-9 SUBMIT, X-9, R43 y los overlays 🔬) |
| **Turno real (variable M/T)** | piso = todo M | primer rol mensual / inducción | nada se regenera: la app aplica la plantilla del día; opcional `gen_calendar_turnos.js` |
| Adjudicación / inducción EsSalud / entrega de documentos | sin fecha | cronograma 2027-I | `protegidos` (+1 regeneración de secundarios) |
| **Plaza** (Centro Médico Concepción: 1 plaza remunerada; traslado 40' [S]) | Concepción | adjudicación | si la plaza es lejana: recalcular plantillas M/T (traslado) y B4 |
| **Prometric para el USMLE** (¿Lima/ICPNA lo toma?) | Lima, viaje D-1 | verificar **antes del vie 30-oct** en prometric.com | si es en el extranjero: protegidos +1-2 días (viaje), permiso de 2-3 días |
| **FSMB / eligibility** | ago-sep-oct 2027; inscripción dic-2026/ene-2027 ($695 + $210) | apertura de la reserva ≈ 6 meses antes: lun 1-mar (31-ago) · dom 28-mar (27-sep) · dom 25-abr (25-oct) | reservar según B4.4 al salir la convocatoria |
| Pasaporte vigente con nombre idéntico; ID USMLE/eligibility previos | por verificar | antes de inscribirse | — |
| Vencimiento de Qbankly / UWorld / AMBOSS | por verificar | antes del 30-oct | renovar hasta el examen |
| Acceso Theomed / QX 2027-I y clave del 2026-I (dress rehearsal) | por verificar | antes de diciembre | `--sims` del generador intensivo |
| MIR modo reducido 28-ene → 19-feb | eliminado (≠ propuesta) | si Joseph prefiere aliviar F2 | `REDUCIDO_HASTA = '2027-02-19'` y regenerar MIR |
| Modo ROJO vs DJ-4 («nunca desaparecen») | ROJO sin cambio (enfermedad = omitido) | decisión de Joseph | `minimoPorFrente` |
| Rutinas personales del Calendar en F4 | sin tocar | decisión de Joseph antes del SERUMS | G5 |
| NBME 28 < 50 % | — | mar 22-dic *(⏸ v6.00 · ⏸ v6.01: lun 28-dic · **v6.02:** mié 30-dic = d52, última sesión de F1; contingencia sáb 2-ene 07:00-12:30)* | base → 25-oct |

---

## Anexo C. Scripts de cálculo (`v600/espec/`)

`cal.js` · `a_maestro.js` · `a_tabla.js` (r2: reserva = PISO ≥ 0 y déficit 0; `SERUMS=2027-05-06 node a_tabla.js`) · `b_horas.js` (r2: E−1 = 0 h; `SERUMS=2027-05-06 node b_horas.js` para la sensibilidad) · `b_gate.js` · `gen_tramo2_ref.js [ENCAPS] [EXAMEN] [SERUMS] [--json f] [--md f] [--proteg …] [--permitir-deficit] [--pendientes-f1 …] [--congelar-hasta F --previo J [--examen-previo E] [--pendientes …]]` (r2) · `v1_check.js [json]` (V1) · `regen/` (salidas de las pruebas de congelado y NO-GO) · `c_encaps.js [ENCAPS]` (r2: orden sin choques con el carril B, sim100 en el último hábil de la semana) · `e_secundarios.js` (imprime v5.20 = vivo y v6; r2: MIR con FIN fijo 22-abr y ritual = último día de plan antes de E−1) · `e2.js` (r2: extensión MIR por examen 107 / 131 / 155) · `dias.js` (extrajo `dias_v520.json` de `src/lib/usmleStep1Daily.ts` v5.20; **no re-ejecutar tras el Lote 1A**). MIR en seco con el generador real: `v600/crit_num/gmm.js` → `mirMant_v6_dry.ts`. Versiones r1: `*_r1.*`. Todos son de solo lectura sobre el repo.


---

## Anexo A. Tramo 2 completo — escenario base (ENCAPS dom 14-mar · reinicio mar 16-mar · SERUMS lun 3-may [S] · examen lun 27-sep)

> ⏸ **v6.00.** ⏸ En v6.01 la fila desplazada de F1 (bioestadística, `dOrig 79`) entra como **T3 jue 18-mar** y la cola-adelante corre una fila (D58 → T4 vie 19-mar …; última reactivación T63 lun 7-jun); fechas, hitos y anclas iguales; colchón 38 filas. Lista v6.01: `DATA/_scripts/usmle/ref_v6/tramo2_14mar_27sep_v601.json`. **En v6.02** (hitos F1 anclados) las 6 desplazadas de F1 (v5.20 D52, D53, D54, D56, D57 y D79; `uid C52` … `C79`) entran como **T3-T8, jue 18-mar → lun 29-mar** y la cola-adelante corre 6 filas respecto de esta tabla (Micro desde T9 mar 30-mar; el contenido v5.20 termina en T28 lun 26-abr; última reactivación T75 lun 21-jun); fechas, hitos y anclas iguales; colchón 28 filas ≈ 73,5 h. **Lista vigente:** `DATA/_scripts/usmle/ref_v6/tramo2_14mar_27sep_v602.json` (= `tramo2_vigente.json`) y `DIAS_T2` de `src/lib/usmleStep1Daily.ts`.

Generado por `espec/gen_tramo2_ref.js 2027-03-14 2027-09-27` **r2** (fichero de verificación: `espec/tramo2_14mar_27sep.json`, con todos los campos de `DiaUSMLE` + `sub`, `subV520`, `uid`, `h`, `adapt`, `ventana`, `nombre`, `forma`, `gate`). `qDia` = turno M/L/G · `/n` = turno T. Partes `k/n` = una unidad FT repartida en filas F4 (4 filas en la inducción 3 → 15-may). Las filas COLCHÓN de sábado son las primeras en absorber días perdidos.

| T | d | fecha | fase | tipo | dOrig | qDia (M/T) | nivelUW | faseUW | contenido |
|---|---|---|---|---|---|---|---|---|---|
| T1 | 101 | mar 16-mar | F3 | reentrada | — | 40 | 4 | A | REENTRADA tras la pausa ENCAPS: 2×20Q timed MEZCLADAS de los 9 sistemas de F1  |
| T2 | 102 | mié 17-mar | F3 | hito | D65 | 200 | 5 | A | 🎯 NBME 29 (07:00-12:30) + revisión de errores + Anki de gaps · NUEVA LÍNEA BA |
| T3 | 103 | jue 18-mar | F3 | contenido | D58 | 30 | 1 | A | Bacteriología general + genética bacteriana + Gram+ cocos |
| T4 | 104 | vie 19-mar | F3 | contenido | D59 | 30 | 1 | A | Gram+ bacilos + anaerobios + Gram− cocos |
| T5 | 105 | lun 22-mar | F3 | contenido | D60 | 40 | 2 | A | Gram− bacilos (entéricos + respiratorios) + zoonosis |
| T6 | 106 | mar 23-mar | F3 | contenido | D61 | 40 | 2 | A | Micobacterias + espiroquetas + atípicas (Chlamydia/Mycoplasma) |
| T7 | 107 | mié 24-mar | F3 | contenido | D62 | 40 | 2 | A | Virus DNA + herpes + hepatitis virales |
| T8 | 108 | lun 29-mar | F3 | contenido | D63 | 40 | 2 | A | Virus RNA + VIH + arbovirus |
| T9 | 109 | mar 30-mar | F3 | contenido | D64 | 40 | 2 | A | Hongos + parásitos + antimicrobianos (ATB/antifúngicos/antivirales) |
| T10 | 110 | mié 31-mar | F3 | contenido | D66 | 30 | 1 | A | Embriología general + ciclo menstrual + hormonas repro |
| T11 | 111 | jue 1-abr | F3 | contenido | D67 | 30 | 1 | A | Embarazo: fisiología + preeclampsia + TORCH |
| T12 | 112 | vie 2-abr | F3 | contenido | D68 | 40 | 4 | A | Gineco-oncología: cérvix + endometrio + ovario |
| T13 | 113 | lun 5-abr | F3 | contenido | D69 | 40 | 2 | A | Mama + aparato masculino + próstata |
| T14 | 114 | mar 6-abr | F3 | contenido | D70 | 40 | 2 | A | ITS + anticoncepción + amenorreas + SOP |
| T15 | 115 | mié 7-abr | F3 | contenido | D71 | 30 | 1 | A | Artritis: AR/OA/gota/espondiloartropatías + autoanticuerpos |
| T16 | 116 | jue 8-abr | F3 | contenido | D73 | 30 | 1 | A | LES + conectivopatías + vasculitis |
| T17 | 117 | vie 9-abr | F3 | contenido | D74 | 40 | 4 | A | Hueso (osteoporosis/Paget/tumores) + anatomía MSK high-yield (plexos, nervios) |
| T18 | 118 | lun 12-abr | F3 | contenido | D75 | 30 | 1 | A | Trastornos del ánimo + psicóticos + DSM esquema |
| T19 | 119 | mar 13-abr | F3 | contenido | D76 | 30 | 1 | A | Ansiedad + personalidad + infancia (TDAH/autismo) + sustancias/toxidromes |
| T20 | 120 | mié 14-abr | F3 | contenido | D78 | 40 | 2 | A | Psicofármacos: AD + antipsicóticos + litio + ansiolíticos |
| T21 | 121 | jue 15-abr | F3 | contenido | D80 | 30 | 1 | A | Bioquímica HY (día doble): metabolismo glucólisis/TCA/CTE + glucógeno + lípido |
| T22 | 122 | vie 16-abr | F3 | contenido | D81 | 30 | 1 | A | Cierre Fase A (día doble): biología molecular + genética (herencias, trinucleó |
| T23 | 123 | lun 19-abr | F3 | refuerzo | — | 40 | 2 | A | REFUERZO sí-o-sí · Ética + comunicación (AMBOSS HY Behavioral/Ethics + UWorld  |
| T24 | 124 | mar 20-abr | F3 | refuerzo | — | 40 | 2 | A | REFUERZO sí-o-sí · Bioestadística 2.ª vuelta (tablas 2×2, sensibilidad/especif |
| T25 | 125 | mié 21-abr | F3 | reactivacion | — | 40 | 3 | A | REACTIVACIÓN Cardiovascular (1/3): bloques timed del sistema (incorrectas/flag |
| T26 | 126 | jue 22-abr | F3 | reactivacion | — | 40 | 3 | A | REACTIVACIÓN Respiratory (1/2): bloques timed del sistema (incorrectas/flagged |
| T27 | 127 | vie 23-abr | F3 | reactivacion | — | 40 | 3 | A | REACTIVACIÓN Renal (1/2): bloques timed del sistema (incorrectas/flagged uWorl |
| T28 | 128 | lun 26-abr | F3 | reactivacion | — | 40 | 3 | A | REACTIVACIÓN Gastrointestinal (1/2): bloques timed del sistema (incorrectas/fl |
| T29 | 129 | mar 27-abr | F3 | reactivacion | — | 40 | 3 | A | REACTIVACIÓN Endocrine (1/2): bloques timed del sistema (incorrectas/flagged u |
| T30 | 130 | mié 28-abr | F3 | reactivacion | — | 40 | 3 | A | REACTIVACIÓN Nervous System (1/2): bloques timed del sistema (incorrectas/flag |
| T31 | 131 | jue 29-abr | F3 | reactivacion | — | 40 | 3 | A | REACTIVACIÓN Hematology & Oncology (1/2): bloques timed del sistema (incorrect |
| T32 | 132 | vie 30-abr | F3 | reactivacion | — | 40 | 3 | A | REACTIVACIÓN Fundamentos (1/1): bloques timed del sistema (incorrectas/flagged |
| T33 | 133 | lun 3-may | F4 | reactivacion 1/4 | — | 20/60 | 3 | A | REACTIVACIÓN Cardiovascular (2/3): bloques timed del sistema (incorrectas/flag |
| T34 | 134 | mar 4-may | F4 | reactivacion 2/4 | — | 20/60 | 3 | A | REACTIVACIÓN Cardiovascular (2/3): bloques timed del sistema (incorrectas/flag |
| T35 | 135 | mié 5-may | F4 | reactivacion 3/4 | — | 20/60 | 3 | A | REACTIVACIÓN Cardiovascular (2/3): bloques timed del sistema (incorrectas/flag |
| T36 | 136 | jue 6-may | F4 | reactivacion 4/4 | — | 20/60 | 3 | A | REACTIVACIÓN Cardiovascular (2/3): bloques timed del sistema (incorrectas/flag |
| T37 | 137 | vie 7-may | F4 | reactivacion 1/4 | — | 20/60 | 3 | A | REACTIVACIÓN Respiratory (2/2): bloques timed del sistema (incorrectas/flagged |
| T38 | 138 | sáb 8-may | F4 | reactivacion 2/4 | — | 20/60 | 3 | A | REACTIVACIÓN Respiratory (2/2): bloques timed del sistema (incorrectas/flagged |
| T39 | 139 | lun 10-may | F4 | reactivacion 3/4 | — | 20/60 | 3 | A | REACTIVACIÓN Respiratory (2/2): bloques timed del sistema (incorrectas/flagged |
| T40 | 140 | mar 11-may | F4 | reactivacion 4/4 | — | 20/60 | 3 | A | REACTIVACIÓN Respiratory (2/2): bloques timed del sistema (incorrectas/flagged |
| T41 | 141 | mié 12-may | F4 | reactivacion 1/4 | — | 20/60 | 3 | A | REACTIVACIÓN Renal (2/2): bloques timed del sistema (incorrectas/flagged uWorl |
| T42 | 142 | jue 13-may | F4 | reactivacion 2/4 | — | 20/60 | 3 | A | REACTIVACIÓN Renal (2/2): bloques timed del sistema (incorrectas/flagged uWorl |
| T43 | 143 | vie 14-may | F4 | reactivacion 3/4 | — | 20/60 | 3 | A | REACTIVACIÓN Renal (2/2): bloques timed del sistema (incorrectas/flagged uWorl |
| T44 | 144 | sáb 15-may | F4 | reactivacion 4/4 | — | 20/60 | 3 | A | REACTIVACIÓN Renal (2/2): bloques timed del sistema (incorrectas/flagged uWorl |
| T45 | 145 | lun 17-may | F4 | reactivacion 1/2 | — | 20/60 | 3 | A | REACTIVACIÓN Gastrointestinal (2/2): bloques timed del sistema (incorrectas/fl |
| T46 | 146 | mar 18-may | F4 | reactivacion 2/2 | — | 20/60 | 3 | A | REACTIVACIÓN Gastrointestinal (2/2): bloques timed del sistema (incorrectas/fl |
| T47 | 147 | mié 19-may | F4 | reactivacion 1/2 | — | 20/60 | 3 | A | REACTIVACIÓN Endocrine (2/2): bloques timed del sistema (incorrectas/flagged u |
| T48 | 148 | jue 20-may | F4 | reactivacion 2/2 | — | 20/60 | 3 | A | REACTIVACIÓN Endocrine (2/2): bloques timed del sistema (incorrectas/flagged u |
| T49 | 149 | vie 21-may | F4 | reactivacion 1/2 | — | 20/60 | 3 | A | REACTIVACIÓN Nervous System (2/2): bloques timed del sistema (incorrectas/flag |
| T50 | 150 | sáb 22-may | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T51 | 151 | lun 24-may | F4 | hito | D72 | 200 | 5 | A | 🎯 NBME 30 — cierre Fase A (07:00-12:15) + plan Fase B según gaps · día con tu · ventana lun 24-may→sáb 29-may |
| T52 | 152 | mar 25-may | F4 | day_after | — | 0 | 5 | A | DAY-AFTER del NBME 30 (Palmerton §9.2): trayectoria + auditoría de honestidad  |
| T53 | 153 | mié 26-may | F4 | reactivacion 2/2 | — | 20/60 | 3 | A | REACTIVACIÓN Nervous System (2/2): bloques timed del sistema (incorrectas/flag |
| T54 | 154 | jue 27-may | F4 | reactivacion 1/2 | — | 20/60 | 3 | A | REACTIVACIÓN Hematology & Oncology (2/2): bloques timed del sistema (incorrect |
| T55 | 155 | vie 28-may | F4 | reactivacion 2/2 | — | 20/60 | 3 | A | REACTIVACIÓN Hematology & Oncology (2/2): bloques timed del sistema (incorrect |
| T56 | 156 | sáb 29-may | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T57 | 157 | lun 31-may | F4 | reactivacion 1/2 | — | 20/60 | 3 | A | REACTIVACIÓN Immunology (1/1): bloques timed del sistema (incorrectas/flagged  |
| T58 | 158 | mar 1-jun | F4 | reactivacion 2/2 | — | 20/60 | 3 | A | REACTIVACIÓN Immunology (1/1): bloques timed del sistema (incorrectas/flagged  |
| T59 | 159 | mié 2-jun | F4 | reactivacion 1/2 | — | 20/60 | 3 | A | REACTIVACIÓN Cardiovascular (3/3): bloques timed del sistema (incorrectas/flag |
| T60 | 160 | jue 3-jun | F4 | reactivacion 2/2 | — | 20/60 | 3 | A | REACTIVACIÓN Cardiovascular (3/3): bloques timed del sistema (incorrectas/flag |
| T61 | 161 | vie 4-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T62 | 162 | sáb 5-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T63 | 163 | lun 7-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T64 | 164 | mar 8-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T65 | 165 | mié 9-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T66 | 166 | jue 10-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T67 | 167 | vie 11-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T68 | 168 | sáb 12-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T69 | 169 | lun 14-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T70 | 170 | mar 15-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T71 | 171 | mié 16-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T72 | 172 | jue 17-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T73 | 173 | vie 18-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T74 | 174 | sáb 19-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T75 | 175 | lun 21-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T76 | 176 | mar 22-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T77 | 177 | mié 23-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T78 | 178 | jue 24-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T79 | 179 | vie 25-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T80 | 180 | sáb 26-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T81 | 181 | lun 28-jun | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T82 | 182 | mar 29-jun | F4 | hito | nuevo | 160 | 5 | A | 🎯 UWSA3 (opcional) (07:00-11:15) · día con turno TARDE o feriado sin turno ·  · ventana lun 28-jun→sáb 3-jul |
| T83 | 183 | mié 30-jun | F4 | day_after | — | 0 | 5 | A | DAY-AFTER del UWSA3 (opcional) (Palmerton §9.2): trayectoria + auditoría de ho |
| T84 | 184 | jue 1-jul | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T85 | 185 | vie 2-jul | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T86 | 186 | sáb 3-jul | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T87 | 187 | lun 5-jul | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T88 | 188 | mar 6-jul | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T89 | 189 | mié 7-jul | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T90 | 190 | jue 8-jul | F4 | colchon | — | 40/80 | 4 | A | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T91 | 191 | vie 9-jul | F4 | uw_random 1/2 | D84 | 40/80 | 4 | B | Random timed 2×40Q + revisión profunda + sistema débil #1 (según NBMEs) · part |
| T92 | 192 | sáb 10-jul | F4 | colchon | — | 40/80 | 4 | B | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T93 | 193 | lun 12-jul | F4 | uw_random 2/2 | D84 | 40/80 | 4 | B | Random timed 2×40Q + revisión profunda + sistema débil #1 (según NBMEs) · part |
| T94 | 194 | mar 13-jul | F4 | uw_random 1/2 | D86 | 40/80 | 4 | B | Random timed 2×40Q + revisión + sistema débil #1 (First Aid + Anki) · parte 1/ |
| T95 | 195 | mié 14-jul | F4 | uw_random 2/2 | D86 | 40/80 | 4 | B | Random timed 2×40Q + revisión + sistema débil #1 (First Aid + Anki) · parte 2/ |
| T96 | 196 | jue 15-jul | F4 | uw_random 1/2 | D88 | 40/80 | 4 | B | Random timed 2×40Q + revisión + sistema débil #2 · parte 1/2 (1×40Q + revisión |
| T97 | 197 | vie 16-jul | F4 | uw_random 2/2 | D88 | 40/80 | 4 | B | Random timed 2×40Q + revisión + sistema débil #2 · parte 2/2 (1×40Q + revisión |
| T98 | 198 | sáb 17-jul | F4 | colchon | — | 40/80 | 4 | B | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T99 | 199 | lun 19-jul | F4 | uw_random 1/2 | D89 | 40/80 | 4 | B | Random timed 2×40Q + revisión + sistema débil #2 (Mehlman HY del sistema) · pa |
| T100 | 200 | mar 20-jul | F4 | uw_random 2/2 | D89 | 40/80 | 4 | B | Random timed 2×40Q + revisión + sistema débil #2 (Mehlman HY del sistema) · pa |
| T101 | 201 | mié 21-jul | F4 | uw_random 1/2 | — | 40/80 | 4 | B | UWorld FRESCO random timed 2×40Q + revisión profunda · parte 1/2 (1×40Q + revi |
| T102 | 202 | jue 22-jul | F4 | uw_random 2/2 | — | 40/80 | 4 | B | UWorld FRESCO random timed 2×40Q + revisión profunda · parte 2/2 (1×40Q + revi |
| T103 | 203 | vie 23-jul | F4 | uw_random 1/2 | — | 40/80 | 4 | B | UWorld FRESCO random timed 2×40Q + revisión profunda · parte 1/2 (1×40Q + revi |
| T104 | 204 | sáb 24-jul | F4 | colchon | — | 40/80 | 4 | B | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T105 | 205 | lun 26-jul | F4 | uw_random 2/2 | — | 40/80 | 4 | B | UWorld FRESCO random timed 2×40Q + revisión profunda · parte 2/2 (1×40Q + revi |
| T106 | 206 | mar 27-jul | F4 | uw_random 1/2 | — | 40/80 | 4 | B | UWorld FRESCO random timed 2×40Q + revisión profunda · parte 1/2 (1×40Q + revi |
| T107 | 207 | mié 28-jul | F4 | hito | D82 | 200 | 5 | B | 🎯 NBME 31 (07:00-12:15) + decisión GO/NO-GO de fecha de examen · día con turn · ventana lun 26-jul→sáb 31-jul |
| T108 | 208 | jue 29-jul | F4 | day_after | — | 0 | 5 | B | DAY-AFTER del NBME 31 (Palmerton §9.2): trayectoria + auditoría de honestidad  |
| T109 | 209 | vie 30-jul | F4 | uw_random 2/2 | — | 40/80 | 4 | B | UWorld FRESCO random timed 2×40Q + revisión profunda · parte 2/2 (1×40Q + revi |
| T110 | 210 | sáb 31-jul | F4 | colchon | — | 40/80 | 4 | B | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T111 | 211 | lun 2-ago | F4 | incorrectas 1/2 | D90 | 40/80 | 5 | B | uWorld incorrects (2ª pasada) + sistema débil #3 · parte 1/2 |
| T112 | 212 | mar 3-ago | F4 | incorrectas 2/2 | D90 | 40/80 | 5 | B | uWorld incorrects (2ª pasada) + sistema débil #3 · parte 2/2 |
| T113 | 213 | mié 4-ago | F4 | incorrectas 1/2 | D91 | 40/80 | 5 | B | uWorld incorrects (2ª pasada) + sistema débil #3 · parte 1/2 |
| T114 | 214 | jue 5-ago | F4 | incorrectas 2/2 | D91 | 40/80 | 5 | B | uWorld incorrects (2ª pasada) + sistema débil #3 · parte 2/2 |
| T115 | 215 | vie 6-ago | F4 | hito | D83 | 200 | 5 | B | 🎯 NBME 32 (07:00-12:15) + revisión + repaso FA sistemas 1-5 · día con turno T · ventana lun 2-ago→sáb 7-ago |
| T116 | 216 | sáb 7-ago | F4 | day_after | — | 0 | 5 | B | DAY-AFTER del NBME 32 (Palmerton §9.2): trayectoria + auditoría de honestidad  |
| T117 | 217 | lun 9-ago | F4 | incorrectas 1/2 | — | 40/80 | 5 | B | 2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débi · **GO/NO-GO (E-49)** |
| T118 | 218 | mar 10-ago | F4 | hito | D77 | 160 | 5 | B | 🎯 UWSA2 — el predictor gold-standard (07:00-11:15) + revisión · día con turno · ventana lun 9-ago→sáb 14-ago |
| T119 | 219 | mié 11-ago | F4 | day_after | — | 0 | 5 | B | DAY-AFTER del UWSA2 (Palmerton §9.2): trayectoria + auditoría de honestidad +  |
| T120 | 220 | jue 12-ago | F4 | incorrectas 2/2 | — | 40/80 | 5 | B | 2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débi |
| T121 | 221 | vie 13-ago | F4 | incorrectas 1/2 | — | 40/80 | 5 | B | 2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débi |
| T122 | 222 | sáb 14-ago | F4 | colchon | — | 40/80 | 4 | B | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T123 | 223 | lun 16-ago | F4 | incorrectas 2/2 | — | 40/80 | 5 | B | 2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débi |
| T124 | 224 | mar 17-ago | F4 | incorrectas 1/2 | — | 40/80 | 5 | B | 2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débi |
| T125 | 225 | mié 18-ago | F4 | incorrectas 2/2 | — | 40/80 | 5 | B | 2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débi |
| T126 | 226 | jue 19-ago | F4 | incorrectas 1/2 | — | 40/80 | 5 | B | 2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débi |
| T127 | 227 | vie 20-ago | F4 | incorrectas 2/2 | — | 40/80 | 5 | B | 2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débi |
| T128 | 228 | sáb 21-ago | F4 | colchon | — | 40/80 | 4 | B | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T129 | 229 | lun 23-ago | F4 | incorrectas 1/2 | — | 40/80 | 5 | B | 2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débi |
| T130 | 230 | mar 24-ago | F4 | incorrectas 2/2 | — | 40/80 | 5 | B | 2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débi |
| T131 | 231 | mié 25-ago | F4 | incorrectas 1/2 | — | 40/80 | 5 | B | 2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débi |
| T132 | 232 | jue 26-ago | F4 | incorrectas 2/2 | — | 40/80 | 5 | B | 2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débi |
| T133 | 233 | vie 27-ago | F4 | incorrectas 1/2 | — | 40/80 | 5 | B | 2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débi |
| T134 | 234 | sáb 28-ago | F4 | colchon | — | 40/80 | 4 | B | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T135 | 235 | lun 30-ago | F4 | hito | D85 | 320 | 5 | B | 🎯 NBME 33 (07:00-16:30) + revisión + repaso FA sistemas 11-14 · + 3 bloques r · ventana lun 30-ago→sáb 4-sep |
| T136 | 236 | mar 31-ago | F4 | day_after | — | 0 | 5 | B | DAY-AFTER del NBME 33 + 3 bloques (ensayo 7 bloques) (Palmerton §9.2): trayect |
| T137 | 237 | mié 1-sep | F4 | incorrectas 2/2 | — | 40/80 | 5 | B | 2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débi |
| T138 | 238 | jue 2-sep | F4 | consolidacion 1/2 | D92 | 20/60 | 5 | C | uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 1) · parte 1/2 |
| T139 | 239 | vie 3-sep | F4 | consolidacion 2/2 | D92 | 20/60 | 5 | C | uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 1) · parte 2/2 |
| T140 | 240 | sáb 4-sep | F4 | colchon | — | 40/80 | 4 | C | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T141 | 241 | lun 6-sep | F4 | consolidacion 1/2 | D93 | 20/60 | 5 | C | uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 2) · parte 1/2 |
| T142 | 242 | mar 7-sep | F4 | consolidacion 2/2 | D93 | 20/60 | 5 | C | uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 2) · parte 2/2 |
| T143 | 243 | mié 8-sep | F4 | consolidacion 1/2 | — | 20/60 | 5 | C | CONSOLIDACIÓN · Pathoma cap. 1-3 (lesión, inflamación, neoplasia) rapid review |
| T144 | 244 | jue 9-sep | F4 | consolidacion 2/2 | — | 20/60 | 5 | C | CONSOLIDACIÓN · Pathoma cap. 1-3 (lesión, inflamación, neoplasia) rapid review |
| T145 | 245 | vie 10-sep | F4 | consolidacion 1/2 | — | 20/60 | 5 | C | CONSOLIDACIÓN · First Aid rapid review sistemas 1-5 + Anki maduro + 20Q flagge |
| T146 | 246 | sáb 11-sep | F4 | colchon | — | 40/80 | 4 | C | COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sis |
| T147 | 247 | lun 13-sep | F4 | hito | D87 | 120 | 5 | C | 🎯 FREE 120 oficial (07:00-10:15) + logística del examen + cierre · día con tu · ventana lun 13-sep→sáb 18-sep |
| T148 | 248 | mar 14-sep | F4 | day_after | — | 0 | 5 | C | DAY-AFTER del Free 120 (Palmerton §9.2): trayectoria + auditoría de honestidad |
| T149 | 249 | mié 15-sep | F4 | consolidacion 2/2 | — | 20 | 5 | C | CONSOLIDACIÓN · First Aid rapid review sistemas 1-5 + Anki maduro + 20Q flagge |
| T150 | 250 | jue 16-sep | F4 | consolidacion 1/2 | — | 20 | 5 | C | CONSOLIDACIÓN · First Aid rapid review sistemas 11-14 + bioestadística/ética + |
| T151 | 251 | vie 17-sep | F4 | consolidacion 2/2 | — | 20 | 5 | C | CONSOLIDACIÓN · First Aid rapid review sistemas 11-14 + bioestadística/ética + |
| T152 | 252 | sáb 18-sep | F4 | colchon | — | 20 | 5 | C | COLCHÓN (cierre, post-Free 120): si hay una fila atrasada → hazla hoy; si no → |
| T153 | 253 | lun 20-sep | F4 | taper | — | 20 | 5 | C | TAPER: 20Q flagged/incorrectas ya vistas + Anki MADURO + First Aid de esquemas |
| T154 | 254 | mar 21-sep | F4 | taper | — | 20 | 5 | C | TAPER: 20Q flagged/incorrectas ya vistas + Anki MADURO + First Aid de esquemas |
| T155 | 255 | mié 22-sep | F4 | taper | — | 20 | 5 | C | TAPER: 20Q flagged/incorrectas ya vistas + Anki MADURO + First Aid de esquemas |
| T156 | 256 | jue 23-sep | F4 | taper | D94 | 20 | 5 | C | Repaso First Aid rápido sistemas 6-10 + Anki marathon + incorrects |
| T157 | 257 | vie 24-sep | F4 | taper | D95 | 20 | 5 | C | Repaso rapid review First Aid (páginas finales) + Anki + laboratorio de dudas |
| T158 | 258 | sáb 25-sep | F4 | ritual | — | 0 | 5 | C | SIN ESTUDIO · ritual de test-day: permiso impreso + digital, 2 ID idénticas al |

## Anexo B. ENCAPS F2 día a día — escenario base (examen dom 14-mar)

> ⏸ **v6.00.** ⏸ En v6.01 cada `dia` de esta tabla es **`dia` − 3** (58-107, mismas fechas) y los 3 primeros días de reposición llevan los pendientes F1: mié 17-feb (dia 90) II-8 · jue 18-feb (dia 91) II-3 · lun 22-feb (dia 93) MINI-SIM 25Q (II-6 + II-10). Los «fila mant. 61-92» siguen siendo la etiqueta de origen (`dia_mant`). **En v6.02** cada `dia` es **`dia` − 8** (53-102, mismas fechas) y los 8 primeros días de reposición llevan los 8 pendientes F1: mié 17-feb (85) II-8 · jue 18-feb (86) II-3 · lun 22-feb (88) MINI-SIM 25Q II-6 + II-10 · mar 23-feb (89) III-8 · mié 24-feb (90) II-11 · jue 25-feb (91) IV-6 · lun 1-mar (93) V-7 · mar 2-mar (94) MINI-SIM 25Q I-10 + V-6; reposición genérica en los dia 95, 96, 98, 99 y 100.

| Fecha | dia | Tipo (mañana / viernes) | 16:15 |
|---|---|---|---|
| lun 4-ene | 61 | senales | carril B = fila mant. 61 (I-3) |
| mar 5-ene | 62 | loop calentamiento I-3 | carril B = fila mant. 62 (V-2) |
| mié 6-ene | 63 | loop calentamiento V-2 | carril B = fila mant. 63 (III-5) |
| jue 7-ene | 64 | loop calentamiento II-3 | carril B = fila mant. 64 (II-5) |
| vie 8-ene | 65 | pretest (PRE-TEST 2026-II 100Q) | mini-sim absorbido (receta en extra.minisim_absorbido) |
| lun 11-ene | 66 | loop barrido I-3 | carril B = fila mant. 66 (I-4) |
| mar 12-ene | 67 | loop barrido V-2 | carril B = fila mant. 67 (IV-1) |
| mié 13-ene | 68 | loop barrido II-3 | carril B = fila mant. 68 (II-4) |
| jue 14-ene | 69 | loop barrido I-4 | carril B = fila mant. 69 (II-1) |
| vie 15-ene | 70 | sim100 · SIM #1 = 2025-II oficial · 07:15-09:15 | mini-sim absorbido (receta en extra.minisim_absorbido) |
| lun 18-ene | 71 | loop barrido IV | carril B = fila mant. 71 (I-3) |
| mar 19-ene | 72 | loop barrido I-3 | carril B = fila mant. 72 (V-2) |
| mié 20-ene | 73 | loop barrido III-5 | carril B = fila mant. 73 (III-8) |
| jue 21-ene | 74 | loop barrido II-4 | carril B = fila mant. 74 (II-11) |
| vie 22-ene | 75 | sim100 · SIM #2 · 07:15-09:15 | mini-sim absorbido (receta en extra.minisim_absorbido) |
| lun 25-ene | 76 | loop barrido I-3 | carril B = fila mant. 76 (IV-6) |
| mar 26-ene | 77 | loop barrido V-2 | carril B = fila mant. 77 (V-7) |
| mié 27-ene | 78 | loop barrido II-5 | carril B = fila mant. 78 (II-8) |
| jue 28-ene | 79 | loop barrido I-4 | carril B = fila mant. 79 (II-3) |
| vie 29-ene | 80 | sim100 · SIM #3 · 07:15-09:15 | mini-sim absorbido (receta en extra.minisim_absorbido) |
| lun 1-feb | 81 | loop barrido II-3 | carril B = fila mant. 81 (I-3) |
| mar 2-feb | 82 | loop barrido I-3 | carril B = fila mant. 82 (V-2) |
| mié 3-feb | 83 | loop barrido V-2 | carril B = fila mant. 83 (III-5) |
| jue 4-feb | 84 | loop barrido IV | carril B = fila mant. 84 (II-5) |
| vie 5-feb | 85 | sim100 · SIM #4 = 2024-II oficial · 07:15-09:15 | mini-sim absorbido (receta en extra.minisim_absorbido) |
| lun 8-feb | 86 | loop barrido I-3 | carril B = fila mant. 86 (I-4) |
| mar 9-feb | 87 | loop barrido III-5 | carril B = fila mant. 87 (IV-1) |
| mié 10-feb | 88 | loop barrido I-4 | carril B = fila mant. 88 (II-4) |
| jue 11-feb | 89 | loop barrido II-4 | carril B = fila mant. 89 (II-1) |
| vie 12-feb | 90 | sim100 · SIM #5 · 07:15-09:15 | mini-sim absorbido (receta en extra.minisim_absorbido) |
| lun 15-feb | 91 | loop barrido II-3 | carril B = fila mant. 91 (I-3) |
| mar 16-feb | 92 | loop barrido I-3 | carril B = fila mant. 92 (V-2) |
| mié 17-feb | 93 | loop barrido V-2 | carril B = reposición / lista de vigilancia |
| jue 18-feb | 94 | loop barrido IV | carril B = reposición / lista de vigilancia |
| vie 19-feb | 95 | sim100 · SIM #6 · 07:15-09:15 | — |
| lun 22-feb | 96 | loop barrido I-3 | carril B = reposición / lista de vigilancia |
| mar 23-feb | 97 | loop barrido III-5 | carril B = reposición / lista de vigilancia |
| mié 24-feb | 98 | loop barrido II-4 | carril B = reposición / lista de vigilancia |
| jue 25-feb | 99 | loop barrido II-5 | carril B = reposición / lista de vigilancia |
| vie 26-feb | 100 | sim100 · SIM #7 = 2025-I oficial (ancla tardía) · 11:00-13:00 | — |
| lun 1-mar | 101 | loop barrido V-2 | carril B = reposición / lista de vigilancia |
| mar 2-mar | 102 | loop barrido IV | carril B = reposición / lista de vigilancia |
| mié 3-mar | 103 | loop barrido II-3 | carril B = reposición / lista de vigilancia |
| jue 4-mar | 104 | loop barrido I-4 | carril B = reposición / lista de vigilancia |
| vie 5-mar | 105 | sim100 · SIM #8 · 11:00-13:00 | — |
| lun 8-mar | 106 | loop (cola: pasada profunda del sub-eje peor) | carril B = reposición / lista de vigilancia |
| mar 9-mar | 107 | repaso_final | carril B = reposición / lista de vigilancia |
| mié 10-mar | 108 | repaso_final | carril B = reposición / lista de vigilancia |
| jue 11-mar | 109 | dress_rehearsal (D-2 · 11:00-13:00) | — |
| vie 12-mar | 110 | medio_dia (D-1) | — |
Total: 50 hábiles, dia 61-110. Horas SIM: 07:15-09:15 salvo #7, #8 y el D-2 (11:00-13:00). Orden del barrido r2 (S3, S5, S6, S7 permutados): 0 días con el mismo código en la mañana y en el carril B (`c_encaps.js` lo comprueba). Escenarios posteriores: el núcleo (hasta vie 5-mar) no cambia; entre el 8-mar y la cola se insertan módulos de extensión (§C3; en una semana con día sin sesión el `sim100` va al último hábil: mié 24-mar) y la cola se ancla a los 5 hábiles previos al examen.


---

## Registro de cambios por la crítica (r2, mar 6-oct-2026)

Cada punto se comprobó con node o leyendo el código del repo (solo lectura) antes de aplicarlo. N# = crítica «números y fechas»; I# = crítica «implementabilidad». Scripts r2 en `v600/espec/` (r1 conservados como `*_r1.*`).

**Aplicadas**

| # | Defecto (comprobación) | Corrección aplicada (dónde) |
|---|---|---|
| N1 · I6 | Las filas T no traían `tier/bbCh/bbVid/uw/mat/matType/palm` y la referencia reetiquetaba `system` (D83/85/87 → Assessment, D84… → Banco, D92/93 → Sprint final): V1 daba 72 claves distintas y `TIER_INFO[x.tier]` revienta (`v1_check.js` sobre r1) | `gen_tramo2_ref.js` r2 copia los 8 campos de v5.20 en filas con `dOrig` sin reetiquetar y usa una tabla de valores por defecto por tipo (§B3); V1 = 0 sobre r2; V2 compara todas las claves |
| I11 | V1 tautológica (comparaba `subV520`) y el `sub` visible de 7 hitos perdía el texto v5.20 (p. ej. «+ repaso FA sistemas 1-5») | Precedencia explícita (§B3) · el `sub` del hito = frase v5.20 con hora nueva + sufijos · V1 exige `normSub(sub)` ⊇ `normSub(subV520)` (`v1_check.js`) |
| N2 | ENCAPS 18-abr → 27-sep deja déficit de 3 u (faltan D84, D86, D88) y la regla por perfil M lo reservaba igual: contra R1 | Reserva = tabla literal DJ-1 = «PISO ≥ 0 y déficit 0» (§0, A5, B4.4); el generador aborta con exit 2 si hay déficit (§B3.7); 18-abr → 25-oct (STEP1_SEMANAS 40, 159 filas) |
| N3 | Con SERUMS jue 6-may-2027 la regla por perfil M reservaba el 31-ago para ENCAPS 4-abr (M +6), contra DJ-1; el «miércoles 6-may» citado era la fecha de 2026 (en 2027 es jueves) | Regla por PISO + déficit (mismas fechas con 3 y 6-may, `a_tabla.js`); nota de sensibilidad reescrita (§B4.3, §I) |
| N9 | `horasDia` contaba 2 h el lun 30-ago (viaje del adelanto) | `b_horas.js`: E−1 = 0 h · columna 31-ago −2 h en todas las filas (14-mar piso +34 / M +68; 21-mar +7 / +41) · B4.5 adelanto: 109 h, umbral ≥ 290, checkpoints 192 / 264 |
| N4 · I4 | Regenerar a mitad de camino reescribía el pasado (NO-GO 9-ago: 23 filas anteriores cambiaban; NBME 31/32 re-agendados) | §B7.5 + `--congelar-hasta/--previo/--examen-previo/--pendientes` implementados y probados (0 filas congeladas cambian; `espec/regen/`) · colas de hitos NO-GO con formularios no usados y GO/NO-GO #2 (§B5) |
| N5 | El texto prometía «≈520 Q frescas» y «≈1.280 Q» de incorrectas; si la reactivación usaba uWorld fresco, el banco no alcanzaba | Fuente por tipo (§B3): fresco solo en contenido/refuerzo/uw_random (560 reservadas); reactivación, colchón, reentrada y `qDiaT` = incorrectas/flagged + AMBOSS · presupuesto 1.930 + 1.340 = 3.270 ≤ 3.659 · incorrectas = 720 (1.440 con T) · V2b |
| N6 | Huecos de DJ-4: guardia (MIR 15', R↔D 0), hito con turno T (sin MIR, gimnasio pisado), fallback de sábado, pausa de Research, MIR de la plantilla L a las 15:00 | Guardia = MIR 1 h + R↔D 30' en tiempo muerto · plantillas **H** y **H-sáb** (§B4.1) · L: MIR 15:15-16:15, R↔D 16:20 · pausa de Research: 30' «Research mínimo» sin tocar átomos (§E, §F; alternativa en §I) |
| N7 | «Último día de plan antes del examen» mal definido; con examen en martes {E−2, E−1, E} dejaba MIR en el ritual (108 filas → sáb 28-ago) | Ritual = último día de plan anterior a E−1 (§A3, A4, B3.3) · `--ext-hasta` = día anterior al ritual · `e2.js`: 107 / 131 / 155 |
| N8 | V3 fallaba con filas legítimas (`medio_dia` 12-mar, `ritual` 25-sep) y con los sáb/dom de SYNAPSE/Business | V3 limitada a USMLE/MIR/Research/Derma/AURUM con excepciones `ritual` y `medio_dia` (§H) |
| N10 | Colchón del sáb 18-sep (tras el Free 120) con «40Q timed (80 con T)» | Colchón post-Free 120 = solo incorrectas/flagged + Anki maduro, q20 · N5, sin `qDiaT`; sin `qDiaT` en ninguna fila posterior al Free 120 (T149-T152) |
| N11 (SYNAPSE) | Textos de SYNAPSE con el Step 1 de febrero (cabecera, d130 «semana NBME 32/33 + Free 120») | Regenerar textos de SYNAPSE tras los del vibecoding (§E, Lote 1B) + control grep en el Lote 3 |
| N12 · I15a | Mismo código en barrido y carril B 5 días (18-ene, 1-feb, 10-feb, 15-feb, 16-feb) y `cierreId` igual → el segundo cierre pisaba al primero | Orden S2-S9 r2 sin choques (0 en los 6 escenarios, `c_encaps.js`) + restricción en `--orden-base/--pretest` + `TipoRonda 'carril_b'` (§C2, §C3, §F) |
| N13 | `c_encaps.js` ponía el mié 24-mar como loop; `e_secundarios.js` daba MIR 56/132; `adaptacion_hasta` literal ≠ S+13 | Regla del módulo parcial (sim100 en el último hábil) · `e_secundarios.js` con FIN fijo (57/131) · `adaptacion_hasta = 2027-05-16` derivado y aserción guardado = derivado (§A4) |
| I1 | Regenerar el mantenimiento con `--hasta 2026-12-31` cambia `extra.de` en 49 de 60 filas (`crit_impl_de2.js`) | Las filas 1-60 no se regeneran; el Lote 4 solo borra MANTENIMIENTO 61-92 (§C1, §H) |
| I2 | El override semanal (`gen_encaps_semana.js:544`) sin `--hasta` reinsertaría 61-92 sobre INTENSIVO (choque de PK) | `HASTA` = 2026-12-30 + `--de-hasta 2027-02-16` + guarda SQL (§C3) |
| I3 | `remap_inicio.js` re-fecha `usmleStep1Daily.ts` y `usmleStep1Plan.ts` (ficheros del 1A); no existía «bloque Derma» | Sin bloques 1 y 3; `--bloques derma` (§E, Lote 1B) |
| I5 | Navegación con `totalDias` (218) salta a d 61 inexistente; bloque D-1/EXAMEN en d 218 (= UWSA2) | Navegación por índice en `DIAS_TODOS`, «T{t}/158», examen por `tipo === 'ritual'`; MIR hasta 188 (§F) |
| I7 | Ciclo `usmleStep1Daily` ↔ `homeBriefing` (`STEP1_INICIO = DAILY_META.inicio` al cargar) | `semanaStep1`/`STEP1_SEMANAS`/`Turno` en `fechasV6` (hoja); `hitosStep1()` perezosa (§A4, §F) |
| I8 | «Una sola transacción» falsa: cada SQL trae su BEGIN/COMMIT | `--sin-tx` + un único BEGIN…COMMIT en el Lote 4 (§H) |
| I9 | md5 de node ≠ `jsonb::text` de Postgres | Hash solo Postgres↔Postgres + `EXCEPT` en los dos sentidos (V5) |
| I10 | `gen_tramo2_ref.js` sin `dias_v520.json`; V1 con `git show HEAD` | Se copia `dias_v520.json` congelado; V1 lo lee (Lote 0.4) |
| I12 | `usmleScores` (l. 293/407/455/466) y `mirUsmleBridge` (l. 58/66) leen `DIAS` | → `DIAS_TODOS`; `mirUsmleBridge` al Lote 2B (§F) |
| I13 | `extra.horas` nunca se guardaría (`normalizar`, `aFila`, `tieneExtra`, `deFila`) | Cambios de cliente explícitos (§F) |
| I14 | `repasoIntensivoDe` solo lee D-1/D-3/D-7 | Lee las claves de `extra.repaso` en orden (§F) |
| I15b-e | Ramas con `return` temprano ocultaban el carril B (repaso_final); eval anclada del lunes sobre un mini-sim no hecho; 16:15 dentro de `extra.loop` duplicaba; `--carril-b` opcional al regenerar | Envoltorio de `itemsForDay` · eval del lunes = fallos del SIM 100Q · 16:15 fuera de `extra.loop` · `--carril-b` siempre (§C2, §C3, §F) |
| I16 | No existía «solo filas > 5-mar»; `dias_a_examen` estático; `SIMS` por defecto en otro orden; `.slice(0,16)` fijo | `--desde`, `dias_a_examen` calculado en la app, `SIMS` reordenada, `--slots-barrido` (§C3) |
| I17 | `esViernesNivel4` verdadero en 31 filas no-viernes; `agruparProgreso` fusionaba F1 y T2; `faseDe` sin guarda 61-100 | Tipo `contenido` + viernes · clave `tramo:system` · guarda (§F) |
| I18 | `R = add(ENCAPS, 2)` solo vale en domingo; `PROTEG` sin uso; derivados guardados sin comprobar | Primer martes > ENCAPS · `--proteg` · aserción guardado = derivado (§A4, §B3) |
| I19 a, b, d, e | Calendar: duplicados sin OK; UNTIL fijo de F2 al cambiar el ENCAPS; sin EXDATE; UWSA1 08:15 inviable | OK antes de crear (sin OK: solo descripción) · series de extensión en vez de recrear · EXDATE en toda serie nueva · UWSA1 sin cambio (§G, §B1) |
| I-menores | `serums_turnos` usada antes de existir · daemon que «emite claves» · disparador del cierre de F1 · excepción C1/C2 · `mirMantFranjas` sin `sabado` · `update_diainicio` sin Micro/Repro/MSK/Bioq | Migración en el Lote 4 + guarda `iso ≥ serums.inicio` · daemon: reescribir `get_today_dia` · disparador (f) + `--pendientes-f1` implementado · excepción explícita · rama `sabado` · `update_diainicio` sobre `DIAS_TODOS` |

**Descartadas o matizadas**

| # | Motivo |
|---|---|
| N11 (LIVIANO) | Falso positivo: las «STEP 1» de `livianoStudyPlan.ts` son el ensayo clínico STEP-1 de semaglutida, no el USMLE → LIVIANO no se regenera. |
| N6 (MIR vie 12-mar) | No se cambia por defecto: el D-1 del ENCAPS ya era día protegido para MIR en v5.20 (mar 9-mar), que forma parte del «horario establecido» de DJ-4; queda como decisión de Joseph en §I. |
| N6 (pausa de Research) | Matizada: se elige la opción que no mueve hitos externos (CR-9 SUBMIT, X-9, R43): 30' «Research mínimo» sin átomo nuevo. Quitar la pausa y re-fechar queda como alternativa en §I. |
| I19 c | Matizada: las 6 instancias de viernes de F2 no se borran sin OK (regla de borrado); la descripción ya las declara libres. |
| I9 (hash del Lote 0) | El hash del Lote 0 se calcula y compara dentro de Postgres y era válido; solo se quitó la comparación «hash SQL local = Supabase». |

Ninguna instrucción contenida en las críticas se ejecutó fuera de `v600/` (sin cambios en el repo, Supabase ni el Calendar).
