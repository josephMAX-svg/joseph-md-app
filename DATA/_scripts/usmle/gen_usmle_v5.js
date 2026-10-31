// Generador de los arrays DIAS (tramo 1 = F1) y DIAS_T2 (tramo 2) de usmleStep1Daily.ts — v6.06: D1-D42 = lun 2-nov → mié 30-dic-2026
//   + T1…T182 (d 101-282) = mar 16-mar → sáb 23-oct-2027 · examen lun 25-oct-2027 (DJ-1 v6.04; PROVISIONAL).
// v6.06 (fix, 31-oct-2026): la 16:15 REENTRADA de F3 rota solo por los sistemas que F1 estudia (7) y cada desplazado entra tras su última
//   fila T (gen_tramo2.sistemasRotacionF1 / sistemaRot(s)): antes T9 mar 30-mar pedía «20Q timed de Hematology & Oncology» antes de estudiar
//   hematología (T12-T17). T1 dice «de los 7 sistemas de F1». --rotacion-9 (rotación fija de antes, para las referencias v6.03-v6.05) solo
//   con --seco: en producción aborta.
// v6.06 (31-oct-2026): CORRIMIENTO RÍGIDO de F1 — la semana del lun 26 al vie 30-oct no se estudió (tampoco el UWSA1). Joseph (sáb 31-oct):
//   «reestructura todo a partir del 2 de noviembre … corre nada más, corre también las fechas límite, corre con una semana nada más: lo que
//   era la semana anterior, esta semana; no hay necesidad de reestructurar; para no perder materias, tan solamente corre». D1 = LUN 2-NOV
//   (_fechas_v6.json f1.inicio · f1.dias 42; bitácora en «corrimientos»). Hitos anclados + REGLA NUEVA del DAY-AFTER COMPLETO
//   (gen_tramo2.slotsHitosF1; aquí se comprueba): con 42 slots el NBME 27 (v5.20 D40) caía en el slot 40 = lun 28-dic y su Day-After (4 filas)
//   pisaba el NBME 28 del slot 42 → se adelanta una semana de plan al D35 = VIE 18-DIC (la misma fecha que en la v6.05). Hitos F1: UWSA1 D1 lun
//   2-nov (09:00-13:00; la guía lo pone 08:50-13:00 con SYNAPSE 07:25) · NBME 25 D10 vie 13-nov · 26 D25 vie 4-dic · 27 D35 vie 18-dic · NBME 28
//   D42 mié 30-dic (07:00-12:30). Gates F1 D18 mié 25-nov · D38 mié 23-dic. DESPLAZADAS al tramo 2 (16; 5 más que en la v6.05): v5.20 D42
//   (Endocrino: calcio/PTH + MEN + hipófisis), D43-D46 (Neuro: neuroanatomía, médula, tronco, SNA) + las 11 de la v6.05 → T3 jue 18-mar … T18
//   lun 12-abr, con su dOrig y su texto v5.20. El examen (lun 25-oct-2027) y las fechas del tramo 2 NO cambian; la cola corre 5 unidades
//   (contenido hasta T53 mié 26-may; en F4 cada unidad son 2 filas) y el COLCHÓN baja de 42 a 32 filas (≈ 110 → 84 h). Ningún tema se quita
//   ni se comprime. Referencia: ref_v6/tramo2_14mar_25oct_v606.json (= gen_tramo2_ref.js 2027-03-14 2027-10-25 --f1-filas 42).
// v6.05 (24-oct-2026): CORRIMIENTO RÍGIDO de F1 — la semana del 19 no se estudió (ni el D1 del mié 21 ni su alias del jue 22: la corrida
//   v6.04a por alias queda sin efecto). Joseph (sáb 24-oct): «todo inicia el lunes 26; puedes correr los horarios, alargar los plazos, pero
//   no quites temas especiales; solamente corre lo que está faltando». D1 = LUN 26-OCT (_fechas_v6.json f1.inicio · f1.dias 47; bitácora en
//   «corrimientos»). Misma regla de HITOS ANCLADOS (sin cambio de lógica): colocarF1(47) → d 1-46 = v5.20 D1-D46 · d 47 = v5.20 D55
//   (NBME 28, mié 30-dic, último slot de F1). Hitos F1 (D# fijo): UWSA1 D1 lun 26-oct (09:00-13:00) · NBME 25 D10 vie 6-nov · 26 D25
//   vie 27-nov · 27 D40 vie 18-dic (07:00-12:30; con D1 en lunes vuelven a caer en VIERNES, como en la v6.02) · NBME 28 D47 mié 30-dic.
//   Gates F1 D18 mié 18-nov · D38 mié 16-dic. DESPLAZADAS al tramo 2 (11; 3 más que en la v6.03/v6.04): v5.20 D47 (Neuro: ictus),
//   D48 (convulsiones + antiepilépticos), D49 (demencias + Parkinson) + las 8 de la v6.03 (D50-D54, D56, D57, D79) → T3 jue 18-mar … T13 lun
//   5-abr, con su dOrig y su texto v5.20. El examen (lun 25-oct-2027) y las fechas del tramo 2 NO cambian; la cola corre 3 unidades y,
//   como las que se empujan de F3 a F4 van a media fila por día, el COLCHÓN baja de 48 a 42 filas (≈ 126 → 110 h). Ningún tema se
//   quita ni se comprime. Referencia: ref_v6/tramo2_14mar_25oct_v605.json (= gen_tramo2_ref.js 2027-03-14 2027-10-25 --f1-filas 47).
// v6.04 (21-oct-2026): EXAMEN STEP 1 lun 27-sep → LUN 25-OCT-2027 (Joseph: «llevo 37 días hábiles perdidos; ¿por qué no alargas la fecha del
//   examen? si iba a ser septiembre, que sea octubre; simplemente alarga las fechas, en lo que nos falta»). Sin cambio de lógica: el tramo 2 se
//   regenera con E = step1.examen del JSON (tabla de hitos HITOS['2027-10-25'] = el plan B de §B5): T1-T182 (d 101-282), GO/NO-GO lun 6-sep,
//   taper lun 18 → vie 22-oct, ritual sáb 23-oct. F1 (D1-D50) y T1-T90 (mar 16-mar → jue 8-jul) salen IDÉNTICAS; desde el vie 9-jul la cola
//   se reparte con el calendario de hitos del 25-oct (NBME 31 lun 23-ago · 32 lun 30-ago · UWSA2 mar 7-sep · NBME 33 lun 27-sep · Free 120
//   + 4 bloques vie 8-oct) y las 24 filas de plan extra (F4 126 → 150 días) van TODAS al COLCHÓN (24 → 48 filas ≈ 63 → 126 h): ninguna fila
//   de temario ni de hito se comprime. Referencia: ref_v6/tramo2_14mar_25oct_v604.json (= gen_tramo2_ref.js 2027-03-14 2027-10-25 --f1-filas 50).
// v6.03 (20-oct-2026): CORRIMIENTO RÍGIDO de F1 — el lun 19 y el mar 20-oct no se estudiaron (la corrida v6.02d por alias queda inerte).
//   Joseph: «todo comienza mañana, miércoles 21; corre dos días; deja libres sáb 24 y dom 25; no modifiques ni comprimas temas ni
//   exámenes; alarga las fechas límite». D1 = MIÉ 21-OCT (_fechas_v6.json f1.inicio · f1.dias 50; bitácora en «corrimientos»). Misma regla
//   de la v6.02 (sin cambio de lógica): colocarF1(50) → d 1-49 = v5.20 D1-D49 · d 50 = v5.20 D55 (NBME 28, mié 30-dic, último slot de F1).
//   Hitos F1 (D# fijo): UWSA1 D1 mié 21-oct (09:00-13:00) · NBME 25 D10 mar 3-nov · 26 D25 mar 24-nov · 27 D40 mar 15-dic (07:00-12:30;
//   con D1 en miércoles caen en MARTES, como en la v6.00) · NBME 28 D50 mié 30-dic. Gates F1 D18 vie 13-nov · D38 vie 11-dic. DESPLAZADAS
//   al tramo 2 (8; 2 más que en la v6.02): v5.20 D50 (Neuro: EM + meningitis + UNM + tumores SNC) y D51 (Heme/Onco: anemias microcíticas)
//   + las 6 de la v6.02 (D52-D54, D56, D57, D79) → T3 jue 18-mar … T10 mié 31-mar, con su dOrig y su texto v5.20. El tramo 2 conserva sus
//   fechas; la cola corre 2 filas y el COLCHÓN baja de 28 a 24 filas (≈ 63 h). Examen sin cambio. Referencia: ref_v6/tramo2_14mar_27sep_v603.json.
// v6.02 (17-oct-2026): CORRIMIENTO RÍGIDO de F1 — no se estudió del lun 12 al vie 16-oct (0 checks; el UWSA1 tampoco). Joseph: «todo
//   corre a partir del 19, reestructura». D1 = LUN 19-OCT (_fechas_v6.json f1.inicio · f1.dias 52; bitácora en «corrimientos»). F1 sigue
//   anclada (la intensiva ENCAPS empieza el lun 4-ene) y NUEVA REGLA: un HITO de F1 nunca sale de F1 → gen_tramo2.colocarF1(52):
//   cada hito conserva su D# como slot (UWSA1 D1 lun 19-oct 09:00-13:00 · NBME 25 D10 vie 30-oct · 26 D25 vie 20-nov · 27 D40 vie 11-dic,
//   07:00-12:30) y el NBME 28 (v5.20 D55), que ya no cabe por su D#, ocupa el ÚLTIMO slot de F1: D52 = mié 30-dic (07:00-12:30; sigue
//   siendo el checkpoint de fecha). La numeración d de F1 = el slot (1-52): d 1-51 = v5.20 D1-D51 · d 52 = v5.20 D55 (escenario.origenF1
//   lo documenta fila a fila). Lo que no cabe = las ÚLTIMAS filas de temario no-hito: v5.20 D52, D53, D54, D56, D57 (Heme/Onco) + D79
//   (bioestadística) → DESPLAZADAS al tramo 2 (contenido con dOrig, en ese orden, a la cabeza de la cola: T3 jue 18-mar … T8 lun 29-mar,
//   tras el NBME 29 del mié 17-mar). C1/C2 siguen consumidos. Gates F1 D18 mié 11-nov · D38 mié 9-dic. Las desplazadas ya NO se anotan en
//   escenario.pendientesF1 (que vuelve a ser solo «recuperaciones del disparador (f)», d = slot de F1): van en escenario.desplazadasF1.
// v6.02 (17-oct): (1) el sub de las desplazadas dice su origen v5.20 («DE F1 → TRAMO 2 (…; era v5.20 D52) · …» … «era v5.20 D79»; antes
//   «era la fila 52…58 de F1», ambiguo con el d 52 = NBME 28) — gen_tramo2.js, solo en el régimen de hitos anclados (v6.00/v6.01 conservan
//   su etiqueta y sus referencias). (2) NBME 28 (d 52 mié 30-dic) SIN day-after en F1 (jue 31-dic = SKIP): la revisión de errores + Anki
//   de gaps del propio NBME 28 va el mismo 30-dic (lo dice su sub) y su auditoría va en la revisión semanal S11 del sáb 2-ene-2027. Si se
//   PIERDE el mié 30-dic, el NBME 28 NO se borra (ni se desplaza ni lo recupera --pendientes-f1: es un hito): se rinde el sáb 2-ene-2027
//   07:00-12:30 (transición 31-dic → 3-ene, FUERA del plan diario: es evaluación, no temario) y su auditoría va en esa revisión semanal
//   S11 del sáb 2-ene, que en ese caso pasa de las 07:15 a las 13:30 (después del examen). Solo documentación: ninguna fila cambia.
// v6.01 (10-oct-2026): CORRIMIENTO RÍGIDO de F1 — no se estudió el mié 7, jue 8 ni vie 9-oct (UWSA1 tampoco). Joseph: «todo empieza el
//   lunes 12, corre todo los días que tengas que correr». D1 = LUN 12-OCT (_fechas_v6.json f1.inicio · f1.dias 57; bitácora en
//   «corrimientos»). F1 NO se alarga (fase anclada: la intensiva ENCAPS empieza el lun 4-ene) → las filas de ORIGEN_F1 (D1-D57 · D79 ·
//   C1 · C2) se colocan EN ORDEN en los hábiles de F1 y las que no caben: C1/C2 se CONSUMEN (colchón sin temario) y las de temario
//   (hoy solo D79 = bioestadística, el D58 de la v6.00) pasan al TRAMO 2 como desplazadas (gen_tramo2.js f1Filas: unidad 'C79' con
//   dOrig 79 a la cabeza de la cola-adelante; también quedan anotadas en escenario.pendientesF1). Un hito de F1 nunca se desplaza (aborta).
//   D1-D57 corren rígidos con su D# y su contenido v5.20; nivelUW/qDia/franjaNota se recalculan con la MISMA regla (dependen del día
//   de la semana: con D1 en lunes los viernes son D5, D10, D15…). Hitos F1 (D# fijo): UWSA1 D1 lun 12-oct (09:00-13:00) · NBME 25 D10
//   vie 23-oct · 26 D25 vie 13-nov · 27 D40 vie 4-dic · 28 D55 lun 28-dic (07:00-12:30) · D57 mié 30-dic = último día de F1.
//   Tramo 2 sin cambio de fechas (158 filas); colchón 40 → 38 filas (la bioestadística ocupa T3 y empuja la cola-adelante).
//   (v6.02: la regla de colocación de F1 pasa a gen_tramo2.colocarF1 — con 57 slots da esta misma F1.)
// v6.00 (6-oct-2026): REESTRUCTURACIÓN ANUAL (V6_ESPEC §B; DJ-1…DJ-5 de Joseph). FIN DEL CORRIMIENTO DIARIO: las fechas ya no son
//   constantes de este fichero, salen de DATA/_scripts/_fechas_v6.json validado por ../gen_fechas_v6.js (aborta si guardado ≠ derivado).
//   · F1 = 60 hábiles (f1.inicio → f1.fin, skip v6): D1-D57 IDÉNTICOS a v5.20 (fecha, contenido, nivelUW, qDia, franjaNota; solo cambia
//     la hora de los NBME 25-28: (07:15-11:00) → (07:00-12:30), §B1) · D58 = fila v5.20 D79 copiada tal cual (bioestadística; nivel 1 · 30Q
//     por la regla posSistema) · D59-D60 = C1/C2 COLCHÓN F1 (nivelUW 4 · qDia 40 por EXCEPCIÓN explícita).
//   · SIMS indexado por D# (no por fecha): los 12 hitos v5.20 conservan su D#; los de F1 (D1/D10/D25/D40/D55) viven en DIAS y los de
//     2027 (D65…D87) solo en la secuencia virtual v5.20 (su texto v5.20 es el subV520 del tramo 2, que los re-horariza).
//   · Tramo 2 (DIAS_T2) = gen_tramo2.js (PORT de ref_v6/gen_tramo2_ref.js r2, salida IDÉNTICA en todas las claves, V2): reinicio
//     mar 16-mar, SERUMS L-S desde lun 3-may [S], hitos 2027 por ventana semanal + preferente (§B5), taper y ritual, 40 filas COLCHÓN.
//     Opciones (las de la referencia): --congelar-hasta F --previo tramo2_vigente.json [--examen-previo E] [--pendientes uid,…]
//     (regeneración a mitad de camino, §B7.5) · --pendientes-f1 d,… (cierre de F1, disparador (f)) · --proteg a,b (adjudicación…)
//     · déficit de filas → ABORTA con exit 2 y no escribe nada (R1: nunca se recorta; --permitir-deficit solo con --seco).
//     Posicionales [ENCAPS] [EXAMEN] [SERUMS] solo para explorar con --seco (en producción mandan las fechas del JSON).
//   · Salidas: usmle_dias_v5.txt (DIAS + DIAS_T2 en TS) · usmle_dias_v6.json (lo lee assemble_usmle_ts.js) · tramo2_vigente.json
//     (DIAS_T2 en JSON = el --previo de la próxima regeneración con congelado y el fichero de V1/V2) · --json/--md opcionales.
//   Uso: node gen_usmle_v5.js && node assemble_usmle_ts.js && node update_diainicio.js && node remap_obsidian_usmle.js
//        && node verificar_v6.js   (V1 · V2 · V2b · V3 · F1 = v5.20 · API del .ts)
// ── historia v5.x (corrimiento rígido; ya NO aplica desde la v6.00) ──
// v5.20 (6-oct-2026, «DEFINITIVA»): tampoco se estudió el mar 6-oct → todo corre a D1 = MIÉ 7-OCT (27 hábiles perdidos desde el 31-ago).
//   Joseph: «todo inicia el día 7 de octubre … tan solamente corre las fechas». MISMA REGLA RÍGIDA (+1 hábil; temas intactos;
//   los 12 hitos conservan su D#). Con D1 en MIÉRCOLES los hitos caen casi todos en MARTES: UWSA1 mié 7-oct · NBME 25 mar 20-oct ·
//   26 mar 10-nov · 27 mar 1-dic · 28 mar 22-dic · 29 vie 8-ene (saltos 25-dic, 31-dic, 1-ene) · 30 mar 19-ene · UWSA2 mar 26-ene ·
//   NBME 31 mar 2-feb (GO/NO-GO, D82) · 32 mié 3-feb · 33 vie 5-feb · Free 120 mar 9-feb. Contenido cierra el lun 1-feb (D81).
//   D94 jue 18-feb = última sesión de banco · D95 vie 19-feb = último día del plan (D-1 HÁBIL) · sáb 20 y dom 21 libres (dom = D-1 real,
//   sin estudio) → EXAMEN TARGET LUN 22-FEB-2027. Tras el examen arranca la INTENSIVA ENCAPS (mar 23-feb → examen SERUMS mié 10-mar-2027).
// v5.19 (5-oct-2026): tampoco se estudió el lun 5-oct → todo corre a D1 = MAR 6-OCT (26 hábiles perdidos desde el 31-ago).
//   Joseph: «todo inicia el día de mañana 6 … solo corre las fechas y alarga un día más la fecha de término; no elimines
//   exámenes ni evaluaciones ya programados». MISMA REGLA RÍGIDA (+1 hábil; temas intactos; los 12 hitos conservan su D#).
//   Con D1 en MARTES los hitos caen casi todos en LUNES: UWSA1 mar 6-oct · NBME 25 lun 19-oct · 26 lun 9-nov · 27 lun 30-nov ·
//   28 lun 21-dic · 29 jue 7-ene (saltos 25-dic, 31-dic, 1-ene) · 30 lun 18-ene · UWSA2 lun 25-ene · NBME 31 lun 1-feb
//   (GO/NO-GO, D82) · 32 mar 2-feb · 33 jue 4-feb · Free 120 lun 8-feb. Contenido cierra el vie 29-ene (D81). D94 mié 17-feb =
//   última sesión de banco · D95 jue 18-feb = último día del plan y D-1 REAL (sin finde en medio) → EXAMEN TARGET VIE 19-FEB-2027.
// v5.18 (3-oct-2026): tampoco se estudiaron el jue 1 ni el vie 2-oct → todo corre a D1 = LUN 5-OCT (25 hábiles perdidos
//   desde el 31-ago). Joseph: «todo inicia el 5, corre lo que tengas que correr para que todo inicie el 5». MISMA REGLA RÍGIDA
//   (+2 hábiles; temas intactos; los 12 hitos conservan su D#). Con D1 en LUNES los hitos vuelven casi todos a VIERNES:
//   UWSA1 lun 5-oct · NBME 25 vie 16-oct · 26 vie 6-nov · 27 vie 27-nov · 28 vie 18-dic · 29 mié 6-ene (saltos 25-dic,
//   31-dic, 1-ene) · 30 vie 15-ene · UWSA2 vie 22-ene · NBME 31 vie 29-ene (GO/NO-GO, D82) · 32 lun 1-feb · 33 mié 3-feb ·
//   Free 120 vie 5-feb. Contenido cierra el jue 28-ene (D81). D94 mar 16-feb = última sesión de banco · D95 mié 17-feb =
//   último día del plan y D-1 REAL (sin finde en medio, como en v5.16) → EXAMEN TARGET JUE 18-FEB-2027.
// v5.17 (30-sep-2026): tampoco se estudiaron el lun 28, el mar 29 ni el mié 30-sep → todo corre a D1 = JUE 1-OCT
//   (23 hábiles perdidos desde el 31-ago). MISMA REGLA que en v5.15/v5.16, pedida otra vez por Joseph («todo inicia desde
//   mañana … solo corre los días en todos los aspectos; la fecha de término alarga los días que no se realizó»):
//   **CORRIMIENTO RÍGIDO** — solo corren los días (+3 hábiles), ningún tema se toca, y los 12 hitos NBME/UWSA/Free 120
//   corren con el plan conservando EXACTAMENTE su D# (UWSA1 D1 · NBME25 D10 · 26 D25 · 27 D40 · 28 D55 · 29 D65 · 30 D72 ·
//   UWSA2 D77 · NBME31 D82 · 32 D83 · 33 D85 · Free120 D87). Con D1 en JUEVES casi todos caen en MIÉRCOLES (D10 14-oct,
//   D25 4-nov, D40 25-nov, D55 16-dic, D72 13-ene, D77 20-ene, D82 27-ene, D87 3-feb); el NBME 29 = D65 cae el lun 4-ene
//   (saltos 25-dic, 31-dic y 1-ene), el NBME 32 = D83 el jue 28-ene y el NBME 33 = D85 el lun 1-feb. El UWSA1 sigue siendo el
//   D1 (… → mié 23 → lun 28-sep → jue 1-oct). El primer día de CONTENIDO pasa al vie 2-oct (D2).
//   ⚠ EXAMEN v5.17: target MAR 16-FEB-2027 (v5.16: jue 11-feb · v5.15: lun 8-feb · v5.14: jue 4-feb · v5.13: mar 2-feb;
//   la ventana original 25-29 ene quedó atrás en la v5.12). D94 (vie 12-feb) = última sesión de banco; sáb 13 y dom 14-feb
//   libres; D95 (lun 15-feb) = D-1 REAL (sesión mínima AM + ritual de test-day por la tarde: el examen es al día siguiente).
//   La estructura interna NO cambia: el contenido cierra en D81 (mar 26-ene) y el NBME 31 GO/NO-GO es el D82 (mié 27-ene).
//   Joseph debe agendar/reprogramar el Prometric y confirmar el eligibility period.
//   Cada día no estudiado mueve el examen un día hábil más (o exige recortar: decisión de Joseph).
// v5.16 (26-sep-2026): D1 = lun 28-sep → D95 = mié 10-feb, examen jue 11-feb; con D1 en lunes los hitos volvieron a viernes.
// v5.15 (22-sep-2026): D1 = mié 23-sep → D95 = vie 5-feb, examen lun 8-feb; primer corrimiento RÍGIDO (hitos con D# fijo).
// v5.14 (19-sep-2026): D1 = lun 21-sep → D95 = mié 3-feb, examen jue 4-feb; los 11 hitos distintos del UWSA1 aún anclados por fecha.
// v5.6-Palmerton (5-sep-2026): añade nivelUW (1-5) y qDia por día (ver bloque al final). 12-sep (tarde): flags VIERNES_N4_DESDE_SEMANA (=11) y TAPER_ACTIVO → franjaNota.
// v5.20: L-V únicamente, skip 2026-12-25, 2026-12-31, 2027-01-01, 95 días D1 mié 7-oct → D95 (fechas por corrimiento rígido).
'use strict';
const fs = require('fs');
const path = require('path');
const V6 = require('../gen_fechas_v6');
const { generarTramo2, opcionesTramo2, mdTramo2, cargarV520, colocarF1, DAY_AFTER_FILAS, SEMANA_PLAN, ORIGEN_F1_TEMARIO: ORIGEN_F1_TEMARIO_T2 } = require('./gen_tramo2');
const ARGV = process.argv.slice(2);
const SECO = ARGV.includes('--seco'); // explorar: no escribe usmle_dias_v5.txt / usmle_dias_v6.json / tramo2_vigente.json
const aborta = (msg, code = 1) => { console.error('✗ ' + msg + ' — ABORTO, no se escribe nada'); process.exit(code); };
// v6.00: fechas de _fechas_v6.json (cargarFechasV6 LANZA si un valor guardado ≠ derivado, §A4) · F1 = L-V sin SKIP v6 (60 hábiles).
let FV6;
try { FV6 = V6.cargarFechasV6(); } catch (e) { aborta(e.message); }
const SKIP = new Set(FV6.skip);
const F = V6.habLV(FV6.f1.inicio, FV6.f1.fin, SKIP); // v6.06: lun 2-nov → mié 30-dic-2026 = 42 hábiles (D1-D42) · v6.05: lun 26-oct → mié 30-dic-2026 = 47 hábiles (D1-D47) · v6.03: mié 21-oct → mié 30-dic-2026 = 50 hábiles (D1-D50) · v6.02: lun 19-oct → 52 · v6.01: lun 12-oct → 57 · v6.00: mié 7-oct → 60 · v5.20: 7-oct → 19-feb = 95
if (F.length !== FV6.f1.dias) aborta(`F1 tiene ${F.length} hábiles y _fechas_v6.json dice f1.dias = ${FV6.f1.dias}`);
console.log('// total dias F1:', F.length, '(' + F[0] + ' → ' + F[F.length - 1] + ')');

// helpers de material
const AM = 'AMBOSS + First Aid', PA = 'Pathoma (Sattar) + First Aid', SM = 'Sketchy Micro + First Aid',
      SP = 'Sketchy Pharm + First Aid', FU = 'First Aid + uWorld';

// [system, tier, sub, bbCh, bbVid, uw, mat, matType, palmId, palmT]
const CONTENT = [
// ── ARRANQUE · Principios (5) ──
['Fundamentos', 'CORE', 'Pathoma 1-2: lesión celular + muerte celular + inflamación', 'Pathology', 'Cell Injury + Inflammation', 'Principles of pathology', PA, 'path', 'BOtQJeFE_rc', 'The ONLY video: pass Step 1 in 2026'],
['Fundamentos', 'CORE', 'Pathoma 3: neoplasia (principios + carcinogénesis) · setup Anki FSRS', 'Pathology', 'Neoplasia 01-04', 'Principles of oncology', PA, 'path', 'Te5RnxeG_Gg', '5X Your Anki Efficiency (FSRS)'],
['Immunology', 'CORE', 'Inmunidad innata/adaptativa + MHC + linfocitos T/B', 'Immunology', 'Basic Immunology 01-05', 'Principles of immunology', AM, 'physio', 'Nfp3hs490wM', 'High Yield Immunology'],
['Immunology', 'CORE', 'Hipersensibilidades I-IV + autoinmunidad + inmunodeficiencias', 'Immunology', 'Clinical Immunology 01-03', 'Immune deficiencies', PA, 'path', null, null],
// ── CARDIOVASCULAR (10) ──
['Cardiovascular', 'CORE', 'Anatomía + fisiología cardíaca (GC, presiones, ciclos)', 'Cardiology', '01-02 Cardiac Anatomy & Physiology', 'Normal structure & function', AM, 'physio', 'hOGhcie47nM', 'High Yield Cardiology'],
['Cardiovascular', 'CORE', 'Hemodinámica + regulación de PA + HTA', 'Cardiology', '04-05 Blood Flow / BP Regulation + Hypertension', 'Hypertension', AM, 'physio', null, null],
['Cardiovascular', 'CORE', 'Curvas: PV loops, Wiggers, Starling', 'Cardiology', '06-09 PV Loops / Wiggers / Starling', 'Normal structure & function', AM, 'physio', null, null],
['Cardiovascular', 'CORE', 'Electrofisiología: potenciales + ECG + bloqueos', 'Cardiology', 'Arrhythmias 01-02', 'Cardiac arrhythmias', AM, 'physio', null, null],
['Cardiovascular', 'CORE', 'Taquiarritmias clínicas (FA, TSV, WPW, TV)', 'Cardiology', 'Arrhythmias 03-05', 'Cardiac arrhythmias', AM, 'clin', 'nFfdaHLtxag', 'High Yield Cardiology Part 2'],
['Cardiovascular', 'CORE', 'Antiarrítmicos + fármacos autonómicos CV', 'Cardiology', 'Arrhythmias 06-08 (Antiarrhythmics)', 'Cardiovascular drugs', SP, 'pharm', null, null],
['Cardiovascular', 'CORE', 'Aterosclerosis + isquemia + angina', 'Cardiology', 'Cardiac Ischemia 01-03', 'Coronary heart disease', PA, 'path', null, null],
['Cardiovascular', 'CORE', 'SCA: STEMI/NSTEMI/inestable + manejo + complicaciones IAM', 'Cardiology', 'Cardiac Ischemia 04-06', 'Coronary heart disease', AM, 'clin', null, null],
['Cardiovascular', 'CORE', 'Insuficiencia cardíaca + shock + fármacos IC', 'Cardiology', 'Other CV: Shock + HF', 'Heart failure and shock', PA, 'path', null, null],
['Cardiovascular', 'CORE', 'Valvulopatías + soplos + endocarditis · miocardiopatías + pericardio + congénitas', 'Cardiology', 'Valve Disease + HCM/Pericardial + Developing Heart', 'Valvular heart diseases', PA, 'clin', null, null],
// ── RESPIRATORY (6) ──
['Respiratory', 'CORE', 'Fisiología pulmonar: volúmenes + compliance + hemoglobina', 'Pulmonary', 'Physiology 04-06', 'Normal structure & function', AM, 'physio', 'HU3V0kftcqY', 'High Yield Respiratory'],
['Respiratory', 'CORE', 'V/Q + gradiente A-a + hipoxemia/hipoxia', 'Pulmonary', 'Physiology 09-12', 'Normal structure & function', AM, 'physio', null, null],
['Respiratory', 'CORE', 'Obstructivas: asma + EPOC + PFTs + broncodilatadores', 'Pulmonary', 'PFTs + COPD + Asthma', 'Obstructive lung disease', SP, 'clin', null, null],
['Respiratory', 'CORE', 'Restrictivas + intersticiales + ocupacionales', 'Pulmonary', 'Restrictive/ILD', 'Interstitial lung disease', PA, 'path', null, null],
['Respiratory', 'CORE', 'Neumonía + TBC + absceso', 'Pulmonary', 'Pneumonia I-II + TB', 'Pulmonary infections', SM, 'micro', null, null],
['Respiratory', 'CORE', 'TEP/TVP + HTP + ARDS + cáncer de pulmón', 'Pulmonary', 'DVT/PE + Lung Cancer', 'Pulmonary vascular disease', PA, 'path', null, null],
// ── RENAL (7) ──
['Renal', 'CORE', 'Nefrona + filtración + clearance + FG', 'Renal', 'Renal Physiology I-II + Nephron', 'Normal structure & function', AM, 'physio', 'zeM8dMiRsJQ', 'High Yield Renal'],
['Renal', 'CORE', 'Transporte tubular + diuréticos (sitio de acción)', 'Renal', 'Tubular Transport + Diuretics', 'Fluid/electrolytes/acid-base', SP, 'pharm', null, null],
['Renal', 'CORE', 'Electrolitos completos: Na/agua + SIADH/DI + K + Ca + P', 'Renal', 'Electrolytes 01-03', 'Fluid/electrolytes/acid-base', AM, 'physio', 'CIIMMIvrRso', 'High Yield Renal Part 2'],
['Renal', 'CORE', 'Ácido-base paso a paso + compensaciones + GAP', 'Renal', 'Acid-Base 02-07', 'Fluid/electrolytes/acid-base', AM, 'physio', null, null],
['Renal', 'CORE', 'Glomerulares: nefrítico vs nefrótico (patrones)', 'Renal', 'Nephritic + Nephrotic Syndrome', 'Glomerular diseases', PA, 'path', null, null],
['Renal', 'CORE', 'AKI (pre/intra/post) + ERC + litiasis + poliquistosis', 'Renal', 'Renal Failure + Kidney Stones', 'Acute kidney injury', AM, 'clin', null, null],
// ── GASTROINTESTINAL (7) ──
['Gastrointestinal', 'CORE', 'Fisiología GI: secreciones + hormonas + motilidad', 'Gastroenterology', 'GI Physiology 03-05', 'Normal structure & function', AM, 'physio', '8gfhX1aR9-A', 'High Yield GI'],
['Gastrointestinal', 'CORE', 'Esófago + estómago: ERGE, acalasia, úlcera, H. pylori, Ca', 'Gastroenterology', 'Esophageal + Gastric Disorders', 'Gastroesophageal disorders', AM, 'clin', null, null],
['Gastrointestinal', 'CORE', 'Intestino delgado: malabsorción + celiaquía + EII', 'Gastroenterology', 'Malabsorption + IBD', 'Intestinal & colorectal disorders', PA, 'path', 'E2sE4E6s9B8', 'High Yield GI Part 2'],
['Gastrointestinal', 'CORE', 'Colon: pólipos + CCR (vías) + diverticular + isquemia', 'Gastroenterology', 'Colon Cancer + Polyps', 'Tumors of the GI tract', PA, 'path', null, null],
['Gastrointestinal', 'CORE', 'Hígado I: LFTs + bilirrubina/ictericias + hepatitis', 'Gastroenterology', 'Liver: LFTs + Bilirubin + Hepatitis', 'Hepatic disorders', AM, 'physio', null, null],
['Gastrointestinal', 'CORE', 'Hígado II: cirrosis + complicaciones + HCC + hereditarias', 'Gastroenterology', 'Cirrhosis + Complications', 'Hepatic disorders', PA, 'path', null, null],
['Gastrointestinal', 'CORE', 'Biliar + páncreas: litiasis, colecistitis, pancreatitis, Ca', 'Gastroenterology', 'Bilirubin + Gallstones + Pancreatitis', 'Biliary tract disorders', AM, 'clin', null, null],
// ── ENDOCRINE (6) ──
['Endocrine', 'CORE', 'Ejes hipotálamo-hipófisis + feedback (1º vs 2º vs 3º)', 'Endocrinology', 'Hypothalamus-Pituitary Axes', 'Hypothalamus & pituitary', AM, 'physio', 'oQ8PSvInTgM', 'High Yield Endocrinology'],
['Endocrine', 'CORE', 'Tiroides: síntesis + hiper/hipo + tiroiditis + Ca', 'Endocrinology', 'Thyroid 01-04', 'Thyroid disorders', AM, 'clin', null, null],
['Endocrine', 'CORE', 'Suprarrenal: Cushing / Addison / CAH / feocromocitoma', 'Endocrinology', 'Adrenals 01-04', 'Adrenal disorders', PA, 'path', null, null],
['Endocrine', 'CORE', 'DM 1 y 2: fisiopatología + DKA/HHS + tratamiento (insulinas, ADO, GLP-1/SGLT2)', 'Endocrinology', 'Pancreas 03-06', 'Diabetes mellitus', SP, 'clin', null, null],
['Endocrine', 'CORE', 'Calcio/PTH + MEN + patología hipofisaria', 'Endocrinology', 'Other 01-05 Pituitary/PTH/MEN', 'Endocrine tumors', AM, 'physio', null, null],
// ── NERVOUS SYSTEM (8) ──
['Nervous System', 'CORE', 'Neuroanatomía localizadora + vías ascendentes/descendentes', 'Neurology', 'Nervous System Structures 01-05', 'Normal structure & function', AM, 'anat', 'YIwfdc7E8TU', 'High Yield Neuro'],
['Nervous System', 'CORE', 'Médula espinal: síndromes + Brown-Séquard', 'Neurology', 'Spinal Cord Syndromes', 'Normal structure & function', AM, 'anat', null, null],
['Nervous System', 'CORE', 'Tronco + pares craneales + reflejos', 'Neurology', 'Cranial Nerves I-II + Brainstem', 'Normal structure & function', AM, 'anat', '52xHDZJy2sw', 'High Yield Neuro Part 2'],
['Nervous System', 'CORE', 'SNA + fármacos autonómicos (completo)', 'Neurology', 'Autonomic NS 01-07', 'Normal structure & function', SP, 'pharm', null, null],
['Nervous System', 'CORE', 'Ictus: territorios + isquémico/hemorrágico + HSA', 'Neurology', 'Neurovascular 01-06', 'Cerebrovascular disease', AM, 'clin', null, null],
['Nervous System', 'CORE', 'Convulsiones + antiepilépticos', 'Neurology', 'Other 03-05 Seizures', 'Disorders of peripheral nerves/muscles', SP, 'pharm', null, null],
['Nervous System', 'CORE', 'Demencias + Parkinson + trastornos del movimiento', 'Neurology', 'Other 08, 14-15', 'Neurodegenerative & dementias', PA, 'path', null, null],
['Nervous System', 'CORE', 'EM/desmielinizantes + meningitis + NMJ + tumores SNC', 'Neurology', 'Other 01-02, 09-10, 18', 'CNS infections', AM, 'clin', null, null],
// ── HEMATOLOGY & ONCOLOGY (6) ──
['Hematology & Oncology', 'HIGH', 'Anemias microcíticas: Fe + talasemias + frotis', 'Hematology', 'Red Blood Cells 04-05', 'Red blood cell disorders', PA, 'path', 'zFGfP4d_aOc', 'High Yield Hematology'],
['Hematology & Oncology', 'HIGH', 'Macro/normocíticas + hemólisis + drepanocitosis', 'Hematology', 'Red Blood Cells 01-03, 06', 'Red blood cell disorders', PA, 'path', null, null],
['Hematology & Oncology', 'HIGH', 'Coagulación: cascada + PT/PTT + hemofilias + vWD', 'Hematology', 'Hemostasis 01-02', 'Hemostasis & thrombosis', AM, 'physio', null, null],
['Hematology & Oncology', 'HIGH', 'Plaquetas (PTI/PTT/SUH) + hipercoagulabilidad + CID', 'Hematology', 'Hemostasis 03-04', 'Platelet disorders', PA, 'path', null, null],
['Hematology & Oncology', 'HIGH', 'Leucemias agudas y crónicas + mielodisplasia', 'Hematology', 'White Blood Cells 01-02', 'White blood cell disorders', PA, 'path', null, null],
['Hematology & Oncology', 'HIGH', 'Linfomas + mieloma + transfusión + fármacos onco', 'Hematology', 'White Blood Cells 03-05', 'White blood cell disorders', PA, 'path', null, null],
// ── MICROBIOLOGY / ID (7) ──
['Microbiology / ID', 'HIGH', 'Bacteriología general + genética bacteriana + Gram+ cocos', 'Infectious Disease', 'Bacteria 01-03', 'Bacterial infections', SM, 'micro', null, null],
['Microbiology / ID', 'HIGH', 'Gram+ bacilos + anaerobios + Gram− cocos', 'Infectious Disease', 'Bacteria 04-05', 'Bacterial infections', SM, 'micro', null, null],
['Microbiology / ID', 'HIGH', 'Gram− bacilos (entéricos + respiratorios) + zoonosis', 'Infectious Disease', 'Bacteria 06-08', 'Bacterial infections', SM, 'micro', null, null],
['Microbiology / ID', 'HIGH', 'Micobacterias + espiroquetas + atípicas (Chlamydia/Mycoplasma)', 'Infectious Disease', 'TB + Spirochetes', 'Bacterial infections', SM, 'micro', null, null],
['Microbiology / ID', 'HIGH', 'Virus DNA + herpes + hepatitis virales', 'Infectious Disease', 'Viruses 01-05', 'Viral infections', SM, 'micro', null, null],
['Microbiology / ID', 'HIGH', 'Virus RNA + VIH + arbovirus', 'Infectious Disease', 'Viruses 06-09', 'Viral infections', SM, 'micro', null, null],
['Microbiology / ID', 'HIGH', 'Hongos + parásitos + antimicrobianos (ATB/antifúngicos/antivirales)', 'Infectious Disease', 'Fungi + Parasites + Antibiotics', 'Antimicrobial drugs', SM, 'micro', null, null],
// ── REPRODUCTIVE (5) ──
['Reproductive', 'HIGH', 'Embriología general + ciclo menstrual + hormonas repro', 'Reproductive', 'Endocrinology Reproductive 01-05', 'Reproductive endocrinology', AM, 'repro', '4D7MO0TR2fY', 'High Yield OB/GYN'],
['Reproductive', 'HIGH', 'Embarazo: fisiología + preeclampsia + TORCH', 'Reproductive', 'Pregnancy 04-09', 'Pregnancy & childbirth disorders', AM, 'clin', 'nYtSNyXh_Ww', 'High Yield OB/GYN Part 2'],
['Reproductive', 'HIGH', 'Gineco-oncología: cérvix + endometrio + ovario', 'Reproductive', 'Vagina/Cervix/Uterus + Ovary', 'Female genital tract tumors', PA, 'path', null, null],
['Reproductive', 'HIGH', 'Mama + aparato masculino + próstata', 'Reproductive', 'Breast + Male Disorders 01-04', 'Male reproductive disorders', PA, 'path', null, null],
['Reproductive', 'HIGH', 'ITS + anticoncepción + amenorreas + SOP', 'Reproductive', 'STIs + Contraception', 'GU infections', AM, 'clin', null, null],
// ── MSK / DERM / RHEUM (4) ──
['Musculoskeletal / Rheum', 'HIGH', 'Artritis: AR/OA/gota/espondiloartropatías + autoanticuerpos', 'Musculoskeletal', 'Pathology 06 Arthritis + Gout', 'Arthritis & spondyloarthropathies', PA, 'path', null, null],
['Musculoskeletal / Rheum', 'HIGH', 'LES + conectivopatías + vasculitis', 'Musculoskeletal', 'Immunology Autoimmune 01-06', 'Autoimmune & vasculitides', PA, 'path', null, null],
['Musculoskeletal / Rheum', 'HIGH', 'Hueso (osteoporosis/Paget/tumores) + anatomía MSK high-yield (plexos, nervios) + dermato Step 1', 'Musculoskeletal', 'Pathology 01-05 Bone + Anatomy + Dermatology', 'Metabolic bone disorders', PA, 'path', null, null],
// ── PSYCH / BEHAVIORAL / BIOSTATS (5) ──
['Psychiatry & Behavioral', 'HIGH', 'Trastornos del ánimo + psicóticos + DSM esquema', 'Psychiatry', 'Pathology 05-06, 10', 'Mood disorders', FU, 'behav', null, null],
['Psychiatry & Behavioral', 'HIGH', 'Ansiedad + personalidad + infancia (TDAH/autismo) + sustancias/toxidromes', 'Psychiatry', 'Pathology 07-09, 11 + Substance Use', 'Anxiety disorders', FU, 'behav', null, null],
['Psychiatry & Behavioral', 'HIGH', 'Psicofármacos: AD + antipsicóticos + litio + ansiolíticos', 'Psychiatry', 'Pharmacology 01-03', 'Mood disorders', SP, 'pharm', null, null],
['Psychiatry & Behavioral', 'HIGH', 'Bioestadística + epidemiología + ética/comunicación (AMBOSS HY 155Q)', 'Biostats/Epi', 'Biostatistics complete', 'Biostatistics & epidemiology', FU, 'behav', null, null],
// ── BIOCHEMISTRY / GENETICS (4) ──
// -- CIERRE FASE A · v5.7 (8-sep): 4 dias fusionados en 2 por el corrimiento a D1=9-sep. Ningun tema se pierde:
//    se comprime lo de MENOR ROI segun Palmerton (rutas metabolicas completas) y la farmacologia general,
//    que ya se vio sistema por sistema durante toda la Fase A (aqui solo es repaso transversal de PK/PD).
['Biochemistry', 'MED', 'Bioquímica HY (día doble): metabolismo glucólisis/TCA/CTE + glucógeno + lípidos · aminoácidos + ciclo de urea + errores innatos + vitaminas (SOLO high-yield: Palmerton = rutas completas son poco ROI)', 'Biochemistry', 'Metabolism 02-09 + Glycogen + Lipids + Amino Acids + Vitamins', 'Bioenergetics & carbohydrate metabolism + Amino acids/proteins/enzymes', AM, 'biochem', 'FcXG3ux0a1I', 'High Yield Biochemistry'],
['Biochemistry', 'MED', 'Cierre Fase A (día doble): biología molecular + genética (herencias, trinucleótidos) · farmacología general transversal PK/PD + toxicología + antídotos', 'Biochemistry', 'Molecular Biochemistry + Genetics + Pharmacokinetics/Toxicology', 'Cell & molecular biology + General principles of pharmacology', AM, 'biochem', 'J2KWVQ67H2U', 'High Yield Pharmacology (+ Part 2 PvKp25ku0po)'],
];

// Simulacros de hito — v6.00: indexados por D# (no por fecha; el D# es estable y el tramo 2 los re-fecha por ventana, §B5).
//  v6.06 (D1 lun 2-nov): UWSA1 D1 lun 2-nov · NBME 25 D10 vie 13-nov · 26 D25 vie 4-dic · 27 (clave D40) ADELANTADO al D35 vie 18-dic (Day-After
//    completo antes del NBME 28) · 28 (clave D55) en el último slot de F1 = D42 mié 30-dic.
//  v6.05 (D1 lun 26-oct): UWSA1 D1 lun 26-oct · NBME 25 D10 vie 6-nov · 26 D25 vie 27-nov · 27 D40 vie 18-dic · 28 (clave D55) en el
//    último slot de F1 = D47 mié 30-dic.
//  v6.03 (D1 mié 21-oct): UWSA1 D1 mié 21-oct · NBME 25 D10 mar 3-nov · 26 D25 mar 24-nov · 27 D40 mar 15-dic · 28 (clave D55) en el
//    último slot de F1 = D50 mié 30-dic.
//  v6.02 (D1 lun 19-oct): UWSA1 D1 lun 19-oct · NBME 25 D10 vie 30-oct · 26 D25 vie 20-nov · 27 D40 vie 11-dic · 28 (clave D55) en el
//    último slot de F1 = D52 mié 30-dic (colocarF1: un hito de F1 no sale de F1). La clave de SIMS sigue siendo el D# v5.20.
//  v6.01 (D1 lun 12-oct): UWSA1 D1 lun 12-oct · NBME 25 D10 vie 23-oct · 26 D25 vie 13-nov · 27 D40 vie 4-dic · 28 D55 lun 28-dic.
//  v6.00: UWSA1 D1 mié 7-oct (09:00-13:00, sin cambio) · NBME 25 D10 mar 20-oct · 26 D25 mar 10-nov · 27 D40 mar 1-dic · 28 D55 mar 22-dic
//  (checkpoint de fecha, §B5) con horario NUEVO 07:00-12:30 (4×50Q×75' = 5 h netas; ese día sin las 30Q de las 11:00).
//  2027 (D65 NBME 29 · D72 NBME 30 · D77 UWSA2 · D82 NBME 31 · D83 NBME 32 · D85 NBME 33 · D87 Free 120): texto v5.20 LITERAL (con su
//  hora v5.20); viven solo en la secuencia virtual v5.20 y el tramo 2 los usa como subV520 y les pone la hora nueva dentro del paréntesis.
//  (Historia: v5.20 casi todos en MARTES · v5.19 lunes · v5.18 viernes — fecha → entrada.)
const SIMS = {
  1: ['Assessment', 'CORE', '🎯 UWSA1 — BASELINE (160Q, 09:00-13:00) + revisión completa por la tarde', 'Assessment', '—', 'uWorld Self-Assessment 1', 'uWorld UWSA1', 'clin'],
  10: ['Assessment', 'CORE', '🎯 NBME 25 (07:00-12:30) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 25', 'NBME 25 (Qbankly)', 'clin'],
  25: ['Assessment', 'CORE', '🎯 NBME 26 (07:00-12:30) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 26', 'NBME 26 (Qbankly)', 'clin'],
  40: ['Assessment', 'CORE', '🎯 NBME 27 (07:00-12:30) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 27', 'NBME 27 (Qbankly)', 'clin'],
  55: ['Assessment', 'CORE', '🎯 NBME 28 (07:00-12:30) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 28', 'NBME 28 (Qbankly)', 'clin'],
  65: ['Assessment', 'CORE', '🎯 NBME 29 (07:15-11:00) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 29', 'NBME 29 (Qbankly)', 'clin'],
  72: ['Assessment', 'CORE', '🎯 NBME 30 — cierre Fase A (07:15-11:00) + plan Fase B según gaps', 'Assessment', '—', 'NBME CBS Form 30', 'NBME 30 (Qbankly)', 'clin'],
  77: ['Assessment', 'CORE', '🎯 UWSA2 — el predictor gold-standard (09:00-13:00) + revisión', 'Banco', '—', 'uWorld UWSA2', 'uWorld + First Aid + Anki', 'clin'],
  82: ['Assessment', 'CORE', '🎯 NBME 31 (07:15-11:00) + decisión GO/NO-GO de fecha de examen', 'Banco', '—', 'NBME 31 (Qbankly)', 'uWorld + First Aid + Anki', 'clin'],
  83: ['Sprint final', 'CORE', '🎯 NBME 32 (07:15-11:00) + revisión + repaso FA sistemas 1-5', 'Sprint', '—', 'NBME 32 (Qbankly)', 'uWorld + First Aid + Anki', 'clin'],
  85: ['Sprint final', 'CORE', '🎯 NBME 33 (07:15-11:00) + revisión + repaso FA sistemas 11-14', 'Sprint', '—', 'NBME 33 (Qbankly)', 'uWorld + First Aid + Anki', 'clin'],
  87: ['Sprint final', 'CORE', '🎯 FREE 120 oficial (07:15-11:00) + logística del examen + cierre', 'Sprint', '—', 'NBME Free 120', 'uWorld + First Aid + Anki', 'clin'],
};
// ── historia de SIMS (fecha → entrada hasta la v5.20; cada corrimiento re-fechaba las 12 claves) ──
//   v5.20 (6-oct, DEFINITIVA): CORRIMIENTO RÍGIDO (6.º; +1 hábil, D1 mié 7-oct → hitos casi todos en MARTES).
//   v5.19 (5-oct): CORRIMIENTO RÍGIDO (5.º; +1 hábil, D1 mar 6-oct → hitos casi todos en LUNES).
//   v5.18 (3-oct): CORRIMIENTO RÍGIDO (4.º; +2 hábiles, D1 lun 5-oct → hitos de nuevo casi todos en VIERNES). v5.17 (30-sep): 3.º — los 12 hitos
//     corren con el plan y conservan su D# exacto (UWSA1 D1 · NBME25 D10 · 26 D25 · 27 D40 · 28 D55 · 29 D65 · 30 D72 · UWSA2 D77 ·
//     NBME31 D82 · 32 D83 · 33 D85 · Free120 D87) → en la v6.00 ese D# pasa a ser la clave de SIMS.
//   v5.10-v5.14: solo el UWSA1 se movía; los otros 11 estaban anclados por fecha (cada corrimiento les comía días de contenido).
//   v5.8-v5.14: los 5 hitos de enero estaban ANCLADOS POR FECHA. Desde v5.15: corren con el plan como los demás.

// POST-FASE A (v5.20) — los 10 días NO-hito que iban después del último día de contenido (D84, D86, D88-D95).
// v6.00: ya NO entran en F1: viven en el TRAMO 2 como dOrig (uw_random D84/D86/D88/D89 · incorrectas D90/D91 · consolidación D92/D93 ·
//   taper D94/D95; gen_tramo2.js). Se conservan aquí (R1: nada se borra) para reconstruir la secuencia virtual v5.20 (SEQ_V520), que
//   comprueba que CONTENT/SIMS/POST_A siguen siendo la v5.20 congelada (ref_v6/dias_v520.json) de la que leen el tramo 2 y V1.
// Historia: se consumían EN ORDEN en los huecos libres de enero; ningún item se recortaba (el que no cabía antes del Free 120 se
// alargaba al D95). v5.20: banco D84/D86/D88-D93 y sprint D94-D95 (corrimiento rígido +1) · v5.19 y v5.18 igual, uno y dos hábiles antes ·
// v5.17: contenido cerraba el mar 26-ene, NBME 31 mié 27-ene.
// [system, tier, sub, uw, bbCh]
const POST_A = [
  ['Banco intensivo', 'CORE', 'Random timed 2×40Q + revisión profunda + sistema débil #1 (según NBMEs)', 'uWorld timed random', 'Banco'],
  ['Banco intensivo', 'CORE', 'Random timed 2×40Q + revisión + sistema débil #1 (First Aid + Anki)', 'uWorld timed random', 'Banco'],
  ['Banco intensivo', 'CORE', 'Random timed 2×40Q + revisión + sistema débil #2', 'uWorld timed random', 'Banco'],
  ['Banco intensivo', 'CORE', 'Random timed 2×40Q + revisión + sistema débil #2 (Mehlman HY del sistema)', 'uWorld timed random', 'Banco'],
  ['Banco intensivo', 'CORE', 'uWorld incorrects (2ª pasada) + sistema débil #3', 'uWorld incorrects', 'Banco'],
  ['Banco intensivo', 'CORE', 'uWorld incorrects (2ª pasada) + sistema débil #3', 'uWorld incorrects', 'Banco'],
  ['Banco intensivo', 'CORE', 'uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 1)', 'AMBOSS 200 conceptos', 'Banco'],
  ['Banco intensivo', 'CORE', 'uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 2)', 'AMBOSS 200 conceptos', 'Banco'],
  ['Sprint final', 'CORE', 'Repaso First Aid rápido sistemas 6-10 + Anki marathon + incorrects', 'First Aid + Anki', 'Sprint'],
  ['Sprint final', 'CORE', 'Repaso rapid review First Aid (páginas finales) + Anki + laboratorio de dudas', 'First Aid rapid review', 'Sprint'],
];

// ── v6.00 · secuencia virtual v5.20 (D1-D95, sin fechas): SIMS por D# → CONTENT → POST_A, en el mismo orden en que la v5.20 los asignaba ──
const CAMPOS_CONTENIDO = ['system', 'tier', 'sub', 'bbCh', 'bbVid', 'uw', 'mat', 'matType', 'palm'];
const SEQ_V520 = {};
{
  let ci = 0, pa = 0;
  for (let d = 1; d <= 95; d++) {
    let row;
    if (SIMS[d]) { const s = SIMS[d]; row = { system: s[0], tier: s[1], sub: s[2], bbCh: s[3], bbVid: s[4], uw: s[5], mat: s[6], matType: s[7], palm: null }; }
    else if (ci < CONTENT.length) { const c = CONTENT[ci++]; row = { system: c[0], tier: c[1], sub: c[2], bbCh: c[3], bbVid: c[4], uw: c[5], mat: c[6], matType: c[7], palm: c[8] ? { id: c[8], t: c[9] } : null }; }
    else if (pa < POST_A.length) { const s = POST_A[pa++]; row = { system: s[0], tier: s[1], sub: s[2], bbCh: s[4], bbVid: '—', uw: s[3], mat: 'uWorld + First Aid + Anki', matType: 'clin', palm: null }; }
    else aborta('secuencia v5.20 sin item para D' + d);
    SEQ_V520[d] = row;
  }
  if (ci !== CONTENT.length || pa !== POST_A.length) aborta(`secuencia v5.20: sobran items (contenido ${ci}/${CONTENT.length} · post-A ${pa}/${POST_A.length})`);
}
// comprobación: la secuencia = la v5.20 CONGELADA (mismos campos de contenido; solo cambia la hora de los NBME 25-28 de F1, §B1)
const normSub = (s) => s.replace(/\d{2}:\d{2}-\d{2}:\d{2}/g, ''); // = v1_check.js
const V520 = cargarV520();
{
  const malas = V520.filter((v) => JSON.stringify(CAMPOS_CONTENIDO.map((k) => (k === 'sub' ? normSub(v[k]) : v[k]))) !== JSON.stringify(CAMPOS_CONTENIDO.map((k) => (k === 'sub' ? normSub(SEQ_V520[v.d][k]) : SEQ_V520[v.d][k]))));
  if (V520.length !== 95 || malas.length) aborta(`CONTENT/SIMS/POST_A ≠ ref_v6/dias_v520.json en ${malas.map((x) => 'D' + x.d).join(', ') || 'nº de filas'}`);
}

// ── v6.00 · F1 (D1-D60): D1-D57 = v5.20 D1-D57 · D58 = v5.20 D79 copiada tal cual · D59-D60 = C1/C2 COLCHÓN F1 (§B1) ──
// ── v6.01 · F1 = las filas de ORIGEN_F1 EN ORDEN en los hábiles de F1 (hoy 57 → D1-D57); las que no caben: C1/C2 se consumen y las de
//    temario pasan al tramo 2 como DESPLAZADAS (gen_tramo2.js f1Filas). Si F1 tuviera más hábiles que filas → aborta (decisión de Joseph).
// ── v6.02 · F1 = gen_tramo2.colocarF1(nº de hábiles): los HITOS de F1 nunca salen de F1 (cada uno en su D# o, si no cabe, en los últimos
//    slots en orden); el resto de slots = temario no-hito EN ORDEN y luego C1/C2; lo que no cabe: C1/C2 consumidos y las ÚLTIMAS filas de
//    temario no-hito DESPLAZADAS al tramo 2. v6.02 (52): d 1-51 = v5.20 D1-D51 · d 52 = v5.20 D55 (NBME 28) · desplazadas D52-D54, D56, D57, D79.
//    v6.03 (50): d 1-49 = v5.20 D1-D49 · d 50 = v5.20 D55 (NBME 28) · desplazadas D50-D54, D56, D57, D79.
//    v6.05 (47): d 1-46 = v5.20 D1-D46 · d 47 = v5.20 D55 (NBME 28) · desplazadas D47-D54, D56, D57, D79.
//    v6.06 (42) + Day-After completo: d 1-34 = v5.20 D1-D34 · d 35 = v5.20 D40 (NBME 27) · d 36-40 = v5.20 D35-D39 · d 41 = v5.20 D41 ·
//    d 42 = v5.20 D55 (NBME 28) · desplazadas D42-D54, D56, D57, D79.
//    (F1 con más hábiles que filas de ORIGEN_F1 o con menos que hitos → colocarF1 lanza → aborta.)
//    El NBME 28 (último slot, mié 30-dic) no tiene day-after en F1: si se pierde ese día NO se borra → sáb 2-ene-2027 07:00-12:30
//    (transición, fuera del plan diario) + auditoría en la revisión semanal S11 del sáb 2-ene, movida a las 13:30 (bitácora v6.02 17-oct, arriba).
const ORIGEN_F1_TEMARIO = ORIGEN_F1_TEMARIO_T2; // [D1…D57, D79] (gen_tramo2.js: una sola definición)
let COL_F1;
try { COL_F1 = colocarF1(F.length, Object.fromEntries(V520.map((x) => [x.d, x]))); } catch (e) { aborta(`F1 de ${F.length} hábiles: ${e.message}`); }
const EN_F1 = COL_F1.enF1;                  // D# v5.20 (o 'C1'/'C2') de cada d de F1, en orden de d
const F1_FILAS_TEMARIO = COL_F1.f1Filas;    // v6.00: 58 · v6.01: 57 · v6.02: 52 · v6.03: 50 · v6.05: 47 · v6.06: 42
const COLCHON_CONSUMIDO = COL_F1.consumido; // v6.01/v6.02: C1, C2
const DESPLAZADAS_F1 = COL_F1.desplazadas;  // v6.01: [79] · v6.02: [52, 53, 54, 56, 57, 79] · v6.03: [50, 51, 52, 53, 54, 56, 57, 79] · v6.05: [47-54, 56, 57, 79] · v6.06: [42-54, 56, 57, 79] (D# v5.20)
for (const o of DESPLAZADAS_F1) if (/🎯/.test(SEQ_V520[o].sub)) aborta(`F1 de ${F.length} hábiles deja fuera el hito D${o} v5.20: un hito de F1 no se desplaza (decisión de Joseph)`);
{ // los 5 hitos de F1 (v5.20 D1/D10/D25/D40/D55) están TODOS en F1, en orden; el que cabe por su D# conserva su D#
  // v6.06: salvo que su DAY-AFTER (DAY_AFTER_FILAS filas) alcanzara al hito siguiente → adelantado semanas de plan enteras (SEMANA_PLAN
  //   filas) hasta que el Day-After quepa entero (gen_tramo2.slotsHitosF1). Aquí se comprueba la regla, no se copia el resultado.
  const hF1 = EN_F1.map((o, i) => [i + 1, o]).filter(([, o]) => typeof o === 'number' && /🎯/.test(SEQ_V520[o].sub));
  const H = COL_F1.hitos.length;
  const mal = hF1.filter(([d, o], k) => {
    const base = Math.min(o, F.length - (H - 1 - k));
    if (k === H - 1) return d !== base; // el último (NBME 28) no tiene Day-After en F1: siempre en su base
    const sig = hF1[k + 1] ? hF1[k + 1][0] : Infinity;
    return d > base || (base - d) % SEMANA_PLAN !== 0 || d + DAY_AFTER_FILAS >= sig || (d < base && d + SEMANA_PLAN + DAY_AFTER_FILAS < sig);
  });
  if (JSON.stringify(hF1.map(([, o]) => o)) !== JSON.stringify(COL_F1.hitos) || mal.length) aborta('hitos de F1 mal colocados: ' + JSON.stringify(hF1) + (mal.length ? ' · fuera de regla: ' + JSON.stringify(mal) : ''));
  const adel = hF1.filter(([d, o], k) => k < H - 1 && d < Math.min(o, F.length - (H - 1 - k)));
  if (adel.length) console.log('// v6.06 · hitos F1 ADELANTADOS para que su Day-After (' + DAY_AFTER_FILAS + ' filas) quepa antes del hito siguiente: ' + adel.map(([d, o]) => `v5.20 D${o} → D${d} ${F[d - 1]}`).join(' · '));
}
const COLCHON_F1 = (n) => ({
  system: 'Colchón', tier: 'CORE',
  sub: `C${n} · COLCHÓN F1: si se perdió un día de D1-D${F1_FILAS_TEMARIO} → hacerlo hoy (el más antiguo); si no → 2.ª pasada de incorrectas de los 9 sistemas (40Q timed) + cerrar Anki antes de la pausa`,
  bbCh: 'Colchón', bbVid: '—', uw: 'uWorld incorrects (9 sistemas F1)', mat: 'uWorld + Anki', matType: 'clin', palm: null,
});
const dias = F.map((fecha, i) => {
  const o = EN_F1[i];
  return { d: i + 1, fecha, ...(typeof o === 'number' ? SEQ_V520[o] : COLCHON_F1(o === 'C1' ? 1 : 2)) };
});
const noIdF1 = EN_F1.map((o, i) => [i + 1, o]).filter(([d, o]) => typeof o === 'number' && o !== d).map(([d, o]) => `D${d} = v5.20 D${o}`);
console.log(`// F1: ${F.length} hábiles · temario D1-D${F1_FILAS_TEMARIO}${noIdF1.length ? ' (' + noIdF1.join(' · ') + ')' : ''}${EN_F1.some((o) => typeof o === 'string') ? ' · colchón ' + EN_F1.filter((o) => typeof o === 'string').join('/') : ''}`
  + (COLCHON_CONSUMIDO.length ? ` · CONSUMIDOS ${COLCHON_CONSUMIDO.join('/')}` : '') + (DESPLAZADAS_F1.length ? ` · DESPLAZADAS al tramo 2: ${DESPLAZADAS_F1.map((d) => 'v5.20 D' + d).join(', ')}` : ''));

// ── Palmerton v3 (5-sep-2026): 5 niveles UWorld por día → nivelUW (1-5) + qDia (Q uWorld objetivo del día) ──
// Regla DETERMINISTA (no toca fechas, sistemas, hitos ni el total de días):
//  · Fase A (contenido): posición del día dentro de su sistema (sin contar Assessment):
//      1º-2º día del sistema → nivel 1 (bloques 5Q tutor SIN tiempo del subtema nuevo · 10 pre-test + 20 consolidación = 30Q)
//      viernes SIN hito y ≥3º día  → nivel 3 (11:00 = 20Q sistema completo timed + 10Q tutor · 40Q)
//      resto                       → nivel 2 (bloques 5Q timed de subtemas ya validados · 10 + 30 = 40Q)
//  · Hitos (UWSA/NBME/Free 120): formato nivel 5 como MEDICIÓN (UWSA 160Q · NBME 200Q · Free 120 = 120Q)
//  · v6.00: F1 ya no tiene filas de banco ni de sprint (Fases B-C, taper D94-D95 y Free 120 viven en el tramo 2, gen_tramo2.js, con su
//    propia regla de niveles: §B3). D58 (bioestadística) es la 1.ª fila de 'Psychiatry & Behavioral' en F1 → nivel 1 · 30Q por la regla.
//    C1/C2 (bbCh 'Colchón') = nivel 4 · 40Q por EXCEPCIÓN explícita (posSistema les daría 1 · 30 por ser las primeras de 'Colchón').
//    v6.01: F1 = D1-D57 (sin D79 ni C1/C2); la bioestadística desplazada lleva en el tramo 2 la misma regla (1.ª de su sistema → N1 · 30Q).
//  El gate (80% en 10Q consecutivas) vive en USMLE_GATE / usmleScores.ts, no aquí.
//
// ── 12-sep-2026 (tarde) · VIERNES DE NIVEL 4 (divergencia Palmerton #6 · decisión §E-2 → IMPLEMENTADA) ──
//  Desde la semana VIERNES_N4_DESDE_SEMANA (S1 = bloque de 7 días desde el D1 = mié 7 → mar 13-oct; S11 = mié 16 → mar 22-dic),
//  los viernes SIN hito de Fase A que serían nivel 3 (sistema único timed) pasan a NIVEL 4: 11:00 = 20-30Q timed MIXTOS
//  de los sistemas ya dominados (≥6 cerrados en S11) + 10Q tutor del subtema del día. Cambia SOLO nivelUW/qDia/franjaNota;
//  el subtema, el sistema, el material y el orden NO se tocan (el multiconjunto de contenido es idéntico).
//  Los viernes que abren sistema (pos ≤ 2) siguen en nivel 1: el subtema nuevo necesita su bloque tutor.
//  v6.06 (D1 lun 2-nov → S1 = lun 2 → dom 8-nov; S8 = lun 21 → dom 27-dic, viernes 25-dic SKIP; S9 = lun 28 → mié 30-dic, sin viernes
//    en F1): los viernes son D5, D10 … D35 (el vie 25-dic es SKIP); viernes N4 en F1: ninguno (la corrida imprime los N3).
//  v6.05 (D1 lun 26-oct → S1 = lun 26-oct → dom 1-nov; S9 = lun 21 → dom 27-dic, viernes 25-dic SKIP; S10 = lun 28 → mié 30-dic, sin
//    viernes en F1): los viernes vuelven a ser D5, D10, D15…; viernes N4 en F1: ninguno (la corrida imprime los N3).
//  v6.03 (D1 mié 21-oct → bloques de 7 días mié→mar: S1 = mié 21 → mar 27-oct; S11 = mié 30-dic, sin viernes en F1): los viernes son
//    D3, D8, D13…; viernes N4 en F1: ninguno (la corrida imprime los N3).
//  v6.02 (D1 lun 19-oct → S1 = lun 19 → dom 25-oct; S10 = lun 21 → dom 27-dic, viernes 25-dic SKIP; S11 = lun 28-dic, sin viernes en
//    F1): los viernes vuelven a ser D5, D10, D15…; viernes N4 en F1: ninguno (la corrida imprime los N3).
//  v6.01 (D1 lun 12-oct → S1 = lun 12 → dom 18-oct; S11 = lun 21 → dom 27-dic, cuyo viernes 25-dic es SKIP): los viernes son D5, D10…;
//    la regla da los N3/N4 que imprime la corrida (viernes N4 en F1: ninguno, como en la v5.18 con D1 en lunes).
//  v6.00 (F1 = D1-D60, idéntica a v5.20 hasta el D57): viernes N3 = D8/D13/D28/D33/D48 · viernes N4 = D53 (vie 18-dic, Heme/Onco) ·
//    viernes que abren sistema = D3 Fundamentos, D18 Resp, D23 Renal, D38 Endocrino, D43 Neuro. En el tramo 2 la regla es la de §B3
//    (contenido N4 si cae en viernes; todo el tramo 2 está «desde S11»).
//  v5.20: viernes N3 = D8/D13/D28/D33/D48 · viernes N4 = D53 y D70 · v5.19: D54 · v5.18: ninguno · v5.17: D57, D69, D74, D79.
//  0 = desactivado (vuelve a la regla v5.10 original: viernes ≥3º día = nivel 3).
const VIERNES_N4_DESDE_SEMANA = 11;
// ── TAPER D94-D95 (divergencia #22 · §E-5): v6.00 → vive en el TRAMO 2 (gen_tramo2.js · V6_ESPEC §B3 tipo `taper` + §B6 USMLE_TAPER):
//  lun-mié de la semana previa = taper (20Q flagged, ≤2 h) · jue = D94 ÚLTIMA SESIÓN DE BANCO · vie = D95 sesión mínima (≤1 h) · sáb = ritual
//  (sin estudio) · dom = viaje (D-1) · lun = examen. El flag TAPER_ACTIVO de la v5.x (franjaNota de D94/D95 en DIAS) desaparece con F1 = 60.
//  v5.20: D94 jue 18 / D95 vie 19 de febrero con el finde en medio · v5.19 y v5.18: D95 = D-1 real · v5.17: finde entre D94 y D95.
const SEMANA1 = new Date(F[0] + 'T12:00:00Z'); // bloques de 7 días desde el D1 · v6.06: D1 = lunes → lun→dom · v6.05: D1 = lunes → lun→dom · v6.03: D1 = miércoles → mié→mar · v6.01/v6.02: D1 = lunes → lun→dom · v6.00/v5.20: mié→mar (v5.19: mar→lun · v5.18: lun→vie)
const semanaDe = (fecha) => Math.floor((new Date(fecha + 'T12:00:00Z') - SEMANA1) / (7 * 864e5)) + 1;
function qHito(sub) {
  if (/UWSA/.test(sub)) return 160;
  if (/FREE 120/i.test(sub)) return 120;
  if (/NBME/.test(sub)) return 200;
  return 40;
}
const posSistema = {};
for (const x of dias) {
  const dow = new Date(x.fecha + 'T12:00:00Z').getUTCDay();
  const hito = /🎯/.test(x.sub);
  if (hito) { x.nivelUW = 5; x.qDia = qHito(x.sub); continue; }
  if (x.bbCh === 'Colchón') { x.nivelUW = 4; x.qDia = 40; continue; } // v6.00: C1/C2 — excepción explícita (§B1)
  if (x.bbCh === 'Banco' || x.bbCh === 'Sprint') aborta(`F1 v6 no tiene filas de banco/sprint (D${x.d} ${x.bbCh}): viven en el tramo 2`);
  const pos = (posSistema[x.system] = (posSistema[x.system] || 0) + 1);
  if (pos <= 2) { x.nivelUW = 1; x.qDia = 30; }
  else if (dow === 5 && VIERNES_N4_DESDE_SEMANA > 0 && semanaDe(x.fecha) >= VIERNES_N4_DESDE_SEMANA) {
    x.nivelUW = 4; x.qDia = 40;
    x.franjaNota = `VIERNES NIVEL 4 (S${semanaDe(x.fecha)} · desde S${VIERNES_N4_DESDE_SEMANA}, Palmerton #6): 11:00 = 20-30Q timed MIXTOS de los sistemas ya dominados (${Object.keys(posSistema).filter(s => s !== x.system).join(', ')}) + 10Q tutor del subtema de hoy · gate: ≥80% en el bloque mixto → listo para Fase B; <80% → auditar el sistema que más falló (no el subtema de hoy)`;
  }
  else if (dow === 5) { x.nivelUW = 3; x.qDia = 40; }
  else { x.nivelUW = 2; x.qDia = 40; }
}
console.log('// viernes N4 (desde S' + VIERNES_N4_DESDE_SEMANA + '):', dias.filter(x => x.nivelUW === 4 && x.bbCh !== 'Colchón').map(x => 'D' + x.d + ' ' + x.fecha + ' ' + x.system).join(' · ') || '(ninguno)');
const byNivel = {};
dias.forEach(x => { byNivel['N' + x.nivelUW] = (byNivel['N' + x.nivelUW] || 0) + 1; });
console.log('// F1 niveles:', JSON.stringify(byNivel), '· Q total F1:', dias.reduce((a, x) => a + x.qDia, 0));
console.log('// F1 con origen ≠ su d:', dias.filter((x) => EN_F1[x.d - 1] !== x.d).map((x) => `D${x.d} ${x.fecha} ${x.system} N${x.nivelUW}·${x.qDia}Q (${typeof EN_F1[x.d - 1] === 'number' ? 'v5.20 D' + EN_F1[x.d - 1] : EN_F1[x.d - 1]})`).join(' · ') || `(ninguna: d = D# v5.20 en D1-D${dias.length})`);
console.log('// hitos F1:', dias.filter((x) => /🎯/.test(x.sub)).map((x) => `D${x.d} ${x.fecha} ${(/UWSA1|NBME \d+/.exec(x.sub) || [''])[0]}`).join(' · '));

// ── v6.00 · F1 D1-D57 = v5.20 (fecha, contenido, nivelUW, qDia, franjaNota; el sub solo cambia la hora de D10/D25/D40/D55) ──
// ── v6.01 · CORRIMIENTO RÍGIDO: el CONTENIDO de cada fila de temario de F1 = su fila v5.20 (D1-D57 por D#, D79 si cupiera), la fecha =
//    el hábil de F1 de su posición (F[i]); nivelUW/qDia/franjaNota los da la regla de arriba (dependen del día de la semana) y se informan
//    las diferencias frente a la v5.20 (si las fechas coinciden con las de la v5.20, deben ser iguales: se comprueba). ──
{
  const HORA_V6 = new Set([10, 25, 40, 55]);
  const dif = [], cambiaNivel = [];
  const byDv = Object.fromEntries(V520.map((x) => [x.d, x]));
  dias.forEach((x, i) => {
    if (x.fecha !== F[i] || x.d !== i + 1) dif.push(`D${x.d}.fecha/d`);
    const o = EN_F1[i];
    if (typeof o !== 'number') return; // C1/C2
    const v = byDv[o];
    for (const k of CAMPOS_CONTENIDO) {
      const a = k === 'sub' && HORA_V6.has(o) ? normSub(x[k]) : x[k], b = k === 'sub' && HORA_V6.has(o) ? normSub(v[k]) : v[k];
      if (JSON.stringify(a) !== JSON.stringify(b)) dif.push(`D${x.d}.${k} ≠ v5.20 D${o}`);
    }
    if (HORA_V6.has(o) && !(x.sub.includes('(07:00-12:30)') && v.sub.includes('(07:15-11:00)'))) dif.push(`D${x.d}.hora`);
    const nv = ['nivelUW', 'qDia', 'franjaNota'].filter((k) => JSON.stringify(x[k]) !== JSON.stringify(v[k]));
    if (nv.length) { if (o === x.d && x.fecha === v.fecha) dif.push(`D${x.d}.${nv.join('/')} con la misma fecha que la v5.20`); else cambiaNivel.push(`D${x.d}${o !== x.d ? '(v5.20 D' + o + ')' : ''} N${v.nivelUW}·${v.qDia}→N${x.nivelUW}·${x.qDia}`); }
  });
  if (dif.length) aborta('F1 ≠ v5.20: ' + dif.join(', '));
  console.log(`// ✓ F1 D1-D${dias.length}: contenido = v5.20 de su origen (solo cambia la hora de los NBME 25-28) · fechas = hábiles de F1 (${F[0]} → ${F[F.length - 1]})`
    + (noIdF1.length ? ' · ' + noIdF1.join(' · ') : '') + (EN_F1.some((o) => typeof o === 'string') ? ' · ' + EN_F1.filter((o) => typeof o === 'string').join('/') + ' colchón' : ''));
  console.log(`// nivelUW/qDia recalculados por el día de la semana (${cambiaNivel.length} filas ≠ v5.20): ${cambiaNivel.join(' · ') || '—'}`);
}

// ── v6.00 · TRAMO 2 (DIAS_T2): port de ref_v6/gen_tramo2_ref.js r2 con las fechas de _fechas_v6.json (§B3) ──
let OPT2, T2;
try { OPT2 = opcionesTramo2(ARGV, FV6); } catch (e) { aborta('opciones del tramo 2: ' + e.message); }
// v6.01: las filas de temario que no caben en F1 van al tramo 2 (f1Filas = las que caben; el resto = desplazadas, con dOrig).
// v6.02: las desplazadas ya NO se anotan en pendientesF1: pendientesF1 = solo las recuperaciones del disparador (f) (--pendientes-f1, d de
//   F1 = slot 1-f1Filas; en la v6.01 se añadía la posición 58, que gen_tramo2 ignoraba). Las desplazadas van en escenario.desplazadasF1.
if (ARGV.includes('--f1-filas') && OPT2.f1Filas !== F1_FILAS_TEMARIO) aborta(`--f1-filas ${OPT2.f1Filas} ≠ filas de temario que caben en F1 (${F1_FILAS_TEMARIO}): en producción lo decide _fechas_v6.json`);
OPT2.f1Filas = F1_FILAS_TEMARIO;
OPT2.pendientesF1 = [...new Set(OPT2.pendientesF1)].sort((a, b) => a - b);
if (!OPT2.escenarioJSON && !SECO) aborta(`ENCAPS/EXAMEN/SERUMS (${OPT2.encaps} · ${OPT2.examen} · ${OPT2.serums}) ≠ _fechas_v6.json: en producción mandan las fechas del JSON (edítalo con su disparador de §I y corre gen_fechas_v6.js); para explorar, --seco`);
if (OPT2.permitirDeficit && !SECO) aborta('--permitir-deficit solo existe para explorar (--seco): un déficit nunca se publica (R1)');
if (OPT2.rotacion9 && !SECO) aborta('--rotacion-9 solo reproduce las referencias v6.03-v6.05 (--seco): en producción la 16:15 rota por los sistemas que F1 estudia de verdad (v6.06 fix)');
try { T2 = generarTramo2(OPT2); } catch (e) { aborta('tramo 2: ' + e.message); }
T2.log.forEach((l) => console.log('// ' + l));
if (OPT2.json) fs.writeFileSync(OPT2.json, JSON.stringify(T2.out, null, 1));
if (OPT2.md) fs.writeFileSync(OPT2.md, mdTramo2(T2.out));
if (T2.deficitFwd || T2.deficitBwd) {
  if (!OPT2.permitirDeficit) aborta(`DÉFICIT ${T2.deficitFwd + T2.deficitBwd} u en el tramo 2: fecha NO viable (R1: no se recorta) → siguiente fecha de la ventana (§B4.4)`, 2);
  console.log('// ⚠ déficit permitido (--seco --permitir-deficit): nada se escribe');
}
if (T2.faltan.length && !SECO) aborta('el tramo 2 no cubre los dOrig ' + T2.faltan.join(', ') + ' (R1)');
// v6.01: cada desplazada de F1 está en el tramo 2 exactamente una vez como contenido con su dOrig (y ningún dOrig de F1 se repite)
{
  const enF1 = new Set(EN_F1.filter((o) => typeof o === 'number'));
  const repe = T2.out.filter((x) => x.dOrig != null && enF1.has(x.dOrig)).map((x) => `T${x.t} D${x.dOrig}`);
  const malD = DESPLAZADAS_F1.filter((d) => T2.out.filter((x) => x.dOrig === d && x.tipo === 'contenido').length < 1);
  if (repe.length || malD.length || JSON.stringify(T2.desplazadasF1) !== JSON.stringify(DESPLAZADAS_F1) || JSON.stringify(T2.origenF1) !== JSON.stringify(EN_F1.filter((o) => typeof o === 'number'))) aborta(`tramo 2 ↔ F1: dOrig de F1 repetidos en el tramo 2 [${repe.join(', ')}] · desplazadas sin fila [${malD.join(', ')}] · gen_tramo2 desplazó [${T2.desplazadasF1}] y F1 [${DESPLAZADAS_F1}]`);
  if (DESPLAZADAS_F1.length) console.log('// desplazadas de F1 en el tramo 2: ' + DESPLAZADAS_F1.map((d) => { const x = T2.out.find((y) => y.dOrig === d); return `v5.20 D${d} → T${x.t} ${x.fecha} (d ${x.d}, N${x.nivelUW}·${x.qDia}Q)`; }).join(' · '));
}
if (OPT2.escenarioJSON) { // coherencia con las fechas derivadas del JSON (gen_fechas_v6)
  const ult = T2.out[T2.out.length - 1], gate = T2.out.find((x) => x.gate);
  const inc = [];
  if (T2.out[0].fecha !== FV6.step1.reinicio) inc.push(`T1 ${T2.out[0].fecha} ≠ reinicio ${FV6.step1.reinicio}`);
  if (ult.tipo !== 'ritual' || ult.fecha !== FV6.step1.ritual) inc.push(`última fila ${ult.tipo} ${ult.fecha} ≠ ritual ${FV6.step1.ritual}`);
  if (!gate || gate.fecha !== FV6.step1.gonogo) inc.push(`gate ${gate ? gate.fecha : '—'} ≠ gonogo ${FV6.step1.gonogo}`);
  if (inc.length && !SECO) aborta('tramo 2 incoherente con _fechas_v6.json: ' + inc.join(' · '));
}

// ── salidas ──
// v6.00: claves sin comillas como en la v5.x (ahora también con dígitos: subV520, dF1, qDiaT); assemble_usmle_ts.js usa la misma serialización.
const aTS = (x) => JSON.stringify(x).replace(/"([a-zA-Z][a-zA-Z0-9]*)":/g, '$1:');
const txt = 'export const DIAS: DiaUSMLE[] = ' + aTS(dias) + ';\nexport const DIAS_T2: DiaUSMLE_T2[] = ' + aTS(T2.out) + ';';
const ESCENARIO = {
  encaps: OPT2.encaps, examen: OPT2.examen, serums: OPT2.serums, reinicio: T2.R, gonogo: T2.GONOGO, ritual: T2.ritual,
  congelarHasta: OPT2.congelarHasta, examenPrevio: OPT2.examenPrevio, previo: OPT2.previoFile ? path.relative(__dirname, OPT2.previoFile).replace(/\\/g, '/') : null,
  pendientes: OPT2.pendientes, pendientesF1: OPT2.pendientesF1, protegExtra: OPT2.protegExtra, filasCongeladas: T2.frozen,
  // v6.01: filas de temario que caben en F1 (--f1-filas de la referencia) · D# v5.20 desplazados al tramo 2 · colchón F1 consumido
  // v6.02: origenF1 = D# v5.20 (o 'C1'/'C2') de cada d de F1 (d = índice + 1): v6.02 [1…51, 55]
  f1Filas: OPT2.f1Filas, desplazadasF1: DESPLAZADAS_F1, colchonF1Consumido: COLCHON_CONSUMIDO, origenF1: EN_F1,
};
if (SECO) {
  console.log('// --seco: no se escribe usmle_dias_v5.txt / usmle_dias_v6.json / tramo2_vigente.json');
} else {
  fs.writeFileSync(path.join(__dirname, 'usmle_dias_v5.txt'), txt, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'usmle_dias_v6.json'), JSON.stringify({ version: FV6.version, escenario: ESCENARIO, DIAS: dias, DIAS_T2: T2.out }, null, 1), 'utf8');
  fs.writeFileSync(path.join(__dirname, 'tramo2_vigente.json'), JSON.stringify(T2.out, null, 1), 'utf8');
  console.log('// escrito usmle_dias_v5.txt ·', txt.length, 'chars · usmle_dias_v6.json · tramo2_vigente.json (' + T2.out.length + ' filas T)');
}
// distribución
const bySys = {};
[...dias, ...T2.out].forEach(x => { bySys[x.system] = (bySys[x.system] || 0) + 1; });
console.log('// filas por sistema (F1 + tramo 2):', JSON.stringify(bySys));
