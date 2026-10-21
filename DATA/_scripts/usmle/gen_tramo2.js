/**
 * gen_tramo2.js — TRAMO 2 del Step 1 (v6.00 · V6_ESPEC §B3 · §B5 · §B7.5): PORT de ref_v6/gen_tramo2_ref.js (r2).
 *
 *   Como librería (lo usa gen_usmle_v5.js → array DIAS_T2 de src/lib/usmleStep1Daily.ts):
 *     const { generarTramo2, opcionesTramo2 } = require('./gen_tramo2');
 *     const r = generarTramo2(opcionesTramo2(process.argv.slice(2)));   // r.out = filas T1…Tn · r.deficitFwd / r.deficitBwd
 *
 *   Como CLI (exploración de escenarios y verificación V2 contra la referencia; NO escribe src/ ni usmle_dias_v5.txt):
 *     node gen_tramo2.js [ENCAPS] [EXAMEN] [SERUMS] [--json f] [--md f]
 *        [--proteg a,b,…]            protegidos extra (adjudicación, inducción…): no son días de plan
 *        [--permitir-deficit]        solo para explorar escenarios: sin él, un déficit ABORTA (exit 2) — R1: nunca se recorta
 *        [--pendientes-f1 d1,d2,…]   disparador (f) cierre de F1 (jue 31-dic, tras el último día de F1 = mié 30-dic): d de F1 (el slot,
 *                                    la clave de plan_checks('usmle', d); 1-f1Filas, sin hitos) sin ✓; su contenido = la COLOCACIÓN de F1
 *                                    (colocarF1). v6.03: d 1-50 (d 1-49 = v5.20 D1-D49 · d 50 = NBME 28, hito: no se recupera) ·
 *                                    v6.02: d 1-52 (d 1-51 = v5.20 D1-D51 · d 52 = NBME 28, hito: no se recupera) ·
 *                                    v6.01: d 1-57 = D1-D57 · v6.00: d ≤ 58 sin ✓ tras C1/C2. Un d > --f1-filas (hasta 58) no es un slot
 *                                    de F1 y se ignora (v6.01: la 58 = D79 ya va en el tramo 2 como desplazada; no se duplica)
 *                                    NBME 28 (v6.03 d 50 · v6.02 d 52, mié 30-dic) — SIN day-after en F1 (jue 31-dic = SKIP, pausa): la revisión de
 *                                    errores + Anki de gaps del propio NBME 28 va el mismo 30-dic (lo dice su sub: «+ revisión de errores +
 *                                    Anki de gaps») y su auditoría (day-after Palmerton) va en la revisión semanal S11 del sáb 2-ene-2027.
 *                                    Si se PIERDE el mié 30-dic, el NBME 28 NO se borra ni pasa al tramo 2 (es un hito: este disparador lo
 *                                    rechaza): se rinde el sáb 2-ene-2027 07:00-12:30 (transición 31-dic → 3-ene, FUERA del plan diario: es
 *                                    evaluación, no temario) y su auditoría va en esa misma revisión semanal S11 del sáb 2-ene, que en
 *                                    ese caso pasa de las 07:15 a las 13:30 (después del examen). Solo documentación: ninguna fila cambia
 *                                    (ni de F1 ni del tramo 2).
 *        [--f1-filas N]              v6.01: filas (slots) de TEMARIO de F1 antes de la pausa (por defecto min(f1.dias, 58) del JSON;
 *                                    v6.00 = 58 · v6.01 = 57 · v6.02 = 52 · v6.03 = 50). Lo que no cabe lo decide colocarF1 (abajo): las ÚLTIMAS
 *                                    filas de temario NO-hito del orden D1-D57 · D79 son DESPLAZADAS: van SIEMPRE a la cabeza de la
 *                                    cola-adelante como contenido con su dOrig, en orden v5.20 (entran en V1)
 *        [--congelar-hasta AAAA-MM-DD --previo previo.json [--examen-previo AAAA-MM-DD] [--pendientes uid1,uid2]]
 *     Sin posicionales, ENCAPS / EXAMEN / SERUMS salen de DATA/_scripts/_fechas_v6.json (encaps.examen · step1.examen · serums.inicio).
 *
 * v6.04 (21-oct-2026): EXAMEN Step 1 lun 27-sep → lun 25-oct-2027 (decisión de Joseph). Sin cambio de lógica: sin posicionales el EXAMEN sale
 *   de _fechas_v6.json (step1.examen = 2027-10-25 → HITOS['2027-10-25'], el plan B de §B5) → 182 filas (T1-T182, d 101-282), GO/NO-GO lun
 *   6-sep, ritual sáb 23-oct; las 24 filas extra van al COLCHÓN (24 → 48 ≈ 126 h). Referencia: tramo2_14mar_25oct_v604.json.
 * v6.03 (20-oct-2026): corrimiento D1 lun 19-oct → mié 21-oct (lun 19 y mar 20 sin estudio; Joseph: «corre dos días, no comprimas temas
 *   ni exámenes, alarga las fechas límite»). F1 = 50 hábiles con la MISMA regla (sin cambio de lógica): colocarF1(50) → slots 1-49 =
 *   v5.20 D1-D49 · slot 50 = v5.20 D55 (NBME 28, mié 30-dic) · DESPLAZADAS 8 = D50 (Neuro: EM + meningitis + UNM + tumores SNC), D51-D54,
 *   D56, D57 (Heme/Onco) y D79 (bioestadística), en ese orden, a la cabeza de la cola: T3 jue 18-mar … T10 mié 31-mar. Las fechas del
 *   tramo 2 no cambian; la cola entera corre 2 filas y el COLCHÓN baja de 28 a 24 filas (≈ 63 h). Referencia: tramo2_14mar_27sep_v603.json.
 * v6.02 (17-oct-2026): corrimiento D1 lun 12-oct → lun 19-oct (no se estudió del lun 12 al vie 16-oct). F1 = 52 hábiles y NUEVA REGLA
 *   (Joseph: «un hito F1 no se desplaza»): los HITOS de F1 NUNCA salen de F1 → colocarF1(n): cada hito conserva su D# como slot
 *   (UWSA1 1 · NBME 25 10 · 26 25 · 27 40) y el que no cabe por su D# pasa a los ÚLTIMOS slots de F1, en orden (NBME 28, v5.20 D55 →
 *   slot 52 = mié 30-dic, última sesión antes de la pausa y checkpoint de fecha); el resto de slots se llena con el temario NO-hito en
 *   orden v5.20 y lo que no cabe = las ÚLTIMAS filas de temario no-hito → DESPLAZADAS (v6.02: D52, D53, D54, D56, D57 Heme/Onco +
 *   D79 bioestadística, en ese orden, a la cabeza de la cola: T3…T8 tras el NBME 29). --pendientes-f1 pasa a ser el d (slot) de F1
 *   con su contenido de la colocación (idéntico a la posición en v6.00/v6.01). Matriz de compatibilidad: con --f1-filas 58 / 57 la
 *   colocación es la de la v6.00 / v6.01 (hitos ya en su D#) y la salida es byte a byte la de sus referencias.
 * v6.02 (17-oct): etiqueta de origen de las DESPLAZADAS. «era la fila N de F1» (N = posición SIN comprimir del orden D1-D57 · D79) era
 *   ambigua con hitos anclados (T3-T7 decían «fila 52…57» y T8 «fila 58», pero el d 52 de F1 es ahora el NBME 28) → en el RÉGIMEN DE
 *   HITOS ANCLADOS (algún hito de F1 fuera de su D#, p. ej. v6.02 con 52 slots) el sub dice el origen v5.20: «DE F1 → TRAMO 2 (no cupo en
 *   F1 antes de la pausa ENCAPS; era v5.20 D52) · …» … «era v5.20 D79». Sin hitos re-ubicados (v6.00 58 · v6.01 57 slots) se CONSERVA la
 *   etiqueta vieja → las referencias congeladas tramo2_14mar_27sep.json (v6.00) y tramo2_14mar_27sep_v601.json (v6.01, «era la fila 58 de
 *   F1») se siguen reproduciendo byte a byte. Mensaje «pendiente F1 inválido» con el rango real (1-f1Filas) en vez de «1-58» fijo.
 *   + documentado (sin cambiar filas) qué pasa si se pierde el NBME 28 del mié 30-dic (ver --pendientes-f1 arriba).
 * v6.01 (10-oct-2026): corrimiento D1 mié 7-oct → lun 12-oct (no se estudió el 7, 8 ni 9-oct). F1 NO se alarga (la intensiva ENCAPS
 *   empieza el lun 4-ene): de las filas de F1 en orden (D1-D57 · D79 · C1 · C2) caben 57; C1/C2 se consumen y la fila v5.20 D79
 *   (bioestadística; D58 en la v6.00) es DESPLAZADA al tramo 2: unidad de contenido 'C79' con dOrig 79 a la cabeza de la
 *   cola-adelante (forma parte de la cola desde el principio: el congelado la consume como a las demás), sub con prefijo «DE F1 →
 *   TRAMO 2 …», nivel por la regla de F1 (1.ª-2.ª fila del sistema ENTRE LAS DESPLAZADAS → N1 · 30Q; las 20 de CONT conservan su
 *   posición). --pendientes-f1 con una posición desplazada (p. ej. 58) no duplica: la fila ya está. Las recuperaciones (posición
 *   ≤ f1Filas) siguen igual: dF1, sin dOrig. Misma regla en ref_v6/gen_tramo2_ref.js (V2 en todas las claves).
 * v6.00 (6-oct-2026): port 1:1 de la referencia r2 (misma salida en TODAS las claves, V2). Lo único que cambia es de dónde salen
 *   las fechas: SKIP, reinicio (primer martes > ENCAPS), GO/NO-GO (E-49), fin de la inducción (S+13), protegidos A3 (con la
 *   adjudicación del JSON) y el ritual vienen de gen_fechas_v6.js / _fechas_v6.json en vez de cal.js. Los protegidos A3 del ENCAPS
 *   (D-1 hábil, D-1, examen, lunes libre) caen antes del reinicio y no cambian nada; el ritual NO es protegido para el USMLE (es su
 *   fila final T158); E−1 y E quedan fuera como en la referencia. Las filas v5.20 (dOrig) se leen del dias_v520.json CONGELADO
 *   (V6_ESPEC §H Lote 0.4: «V1 y el port leen ese dias_v520.json, no git show HEAD»).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const V6 = require('../gen_fechas_v6');
const { add, wd, f, fy, lunesDe, rango } = V6;

const V520_FILE = path.join(__dirname, 'ref_v6', 'dias_v520.json'); // congelado: v5.20 (HEAD fd85f61) — NO regenerar
const cargarV520 = () => JSON.parse(fs.readFileSync(V520_FILE, 'utf8'));
const habLV = (a, b, skip) => V6.habLV(a, b, skip);
const habLS = (a, b, skip) => rango(a, b).filter((s) => wd(s) >= 1 && wd(s) <= 6 && !skip.has(s)); // L-S (F4, DJ-3)

// ── hitos 2027 por examen (ventana L-S + preferente, §B5) · [nombre, forma(dOrig|'UWSA3'), vIni, vFin, preferente] ──
const HITOS = {
  '2027-08-31': [
    ['NBME 30', 72, '2027-05-24', '2027-05-29', '2027-05-24'],
    ['NBME 31', 82, '2027-06-28', '2027-07-03', '2027-06-29'],
    ['NBME 32', 83, '2027-07-05', '2027-07-10', '2027-07-05'],
    ['UWSA2', 77, '2027-07-12', '2027-07-17', '2027-07-14'],
    ['NBME 33 + 3 bloques (ensayo 7 bloques)', 85, '2027-08-02', '2027-08-07', '2027-08-06'],
    ['Free 120', 87, '2027-08-16', '2027-08-21', '2027-08-16'],
  ],
  '2027-09-27': [
    ['NBME 30', 72, '2027-05-24', '2027-05-29', '2027-05-24'],
    ['UWSA3 (opcional)', 'UWSA3', '2027-06-28', '2027-07-03', '2027-06-29'],
    ['NBME 31', 82, '2027-07-26', '2027-07-31', '2027-07-28'],
    ['NBME 32', 83, '2027-08-02', '2027-08-07', '2027-08-06'],
    ['UWSA2', 77, '2027-08-09', '2027-08-14', '2027-08-10'],
    ['NBME 33 + 3 bloques (ensayo 7 bloques)', 85, '2027-08-30', '2027-09-04', '2027-08-30'],
    ['Free 120', 87, '2027-09-13', '2027-09-18', '2027-09-13'],
  ],
  '2027-10-25': [
    ['NBME 30', 72, '2027-05-24', '2027-05-29', '2027-05-24'],
    ['UWSA3 (opcional)', 'UWSA3', '2027-06-28', '2027-07-03', '2027-06-29'],
    ['NBME 31', 82, '2027-08-23', '2027-08-28', '2027-08-23'],
    ['NBME 32', 83, '2027-08-30', '2027-09-04', '2027-08-30'],
    ['UWSA2', 77, '2027-09-06', '2027-09-11', '2027-09-07'],
    ['NBME 33', 85, '2027-09-27', '2027-10-02', '2027-09-27'],
    ['Free 120 + 4 bloques (ensayo 7 bloques)', 87, '2027-10-04', '2027-10-09', '2027-10-08'],
  ],
};
// Colas de hitos tras un NO-GO (§B5): solo formularios NO usados; NBME 31/32 ya rendidos no se repiten.
const HITOS_NOGO = {
  '2027-08-31>2027-09-27': [ // NO-GO del mar 13-jul (adelanto) → base 27-sep
    ['UWSA3 (cola NO-GO)', 'UWSA3', '2027-07-26', '2027-07-31', '2027-07-28'],
    ['UWSA2', 77, '2027-08-02', '2027-08-07', '2027-08-06'],
    ['NBME 33 + 3 bloques (ensayo 7 bloques)', 85, '2027-08-30', '2027-09-04', '2027-08-30'],
    ['Free 120', 87, '2027-09-13', '2027-09-18', '2027-09-13'],
  ],
  '2027-09-27>2027-10-25': [ // NO-GO del lun 9-ago (base) → plan B 25-oct
    ['UWSA2', 77, '2027-08-09', '2027-08-14', '2027-08-10'],
    ['NBME 33', 85, '2027-08-30', '2027-09-04', '2027-08-30'],
    ['UWSA3 (solo si no se hizo el 29-jun)', 'UWSA3', '2027-09-27', '2027-10-02', '2027-09-27'],
    ['Free 120 + 4 bloques (ensayo 7 bloques)', 87, '2027-10-04', '2027-10-09', '2027-10-08'],
  ],
};

// ── colas (uid estable por unidad: lo usa la regeneración con congelado) ──
const CONT = [58, 59, 60, 61, 62, 63, 64, 66, 67, 68, 69, 70, 71, 73, 74, 75, 76, 78, 80, 81];
const REFUERZO = [
  { sub: 'REFUERZO sí-o-sí · Ética + comunicación (AMBOSS HY Behavioral/Ethics + UWorld Ethics & Communication timed)', system: 'Psychiatry & Behavioral', uw: 'Ethics & communication', mat: 'AMBOSS HY + uWorld' },
  { sub: 'REFUERZO sí-o-sí · Bioestadística 2.ª vuelta (tablas 2×2, sensibilidad/especificidad/VPP, sesgos, diseños, NNT/RR/OR)', system: 'Psychiatry & Behavioral', uw: 'Biostatistics & epidemiology', mat: 'First Aid + uWorld' },
];
const REACT = [['Cardiovascular', 1, 3], ['Respiratory', 1, 2], ['Renal', 1, 2], ['Gastrointestinal', 1, 2], ['Endocrine', 1, 2], ['Nervous System', 1, 2], ['Hematology & Oncology', 1, 2], ['Fundamentos', 1, 1],
  ['Cardiovascular', 2, 3], ['Respiratory', 2, 2], ['Renal', 2, 2], ['Gastrointestinal', 2, 2], ['Endocrine', 2, 2], ['Nervous System', 2, 2], ['Hematology & Oncology', 2, 2], ['Immunology', 1, 1], ['Cardiovascular', 3, 3]];
const RANDOM = [84, 86, 88, 89, 'n1', 'n2', 'n3'];
const INCORR = [90, 91, 'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7'];
const CONSOL = [92, 93, 'pathoma', 'fa15', 'fa1114'];
/** v6.01: filas de TEMARIO de F1 en su orden (posición p = 1…58 → D# v5.20): D1-D57 + D79 (bioestadística). C1/C2 (colchón F1) van
 *  detrás y no tienen temario. F1 coloca las primeras f1Filas; las posiciones > f1Filas son DESPLAZADAS al tramo 2. */
const ORIGEN_F1_TEMARIO = [...Array.from({ length: 57 }, (_, i) => i + 1), 79];
const F1_FILAS_V600 = ORIGEN_F1_TEMARIO.length; // 58 (v6.00: todo el temario de F1 cabía; D58 = D79)
/** Filas de F1 en su orden: temario (D1-D57 · D79) + C1/C2 (colchón F1, sin temario). */
const ORIGEN_F1 = [...ORIGEN_F1_TEMARIO, 'C1', 'C2'];
/**
 * v6.02 · COLOCACIÓN de F1 en n slots (regla de Joseph: un hito de F1 nunca sale de F1; las desplazadas = las ÚLTIMAS filas de
 * temario no-hito). Hito k-ésimo (de H) → slot min(su posición en ORIGEN_F1_TEMARIO = su D#, n − (H − k)): conserva su D# si cabe y,
 * si no, ocupa los últimos slots de F1 en orden. Los demás slots se llenan EN ORDEN con el temario no-hito y luego C1/C2; lo que sobra:
 * C1/C2 = colchón consumido · temario = desplazadas (orden v5.20). Con n = 60 / 58 / 57 da exactamente la F1 de la v6.00 / v6.00 sin
 * colchón / v6.01 (hitos ya en su D#); con n = 52 (v6.02): slots 1-51 = v5.20 D1-D51 · slot 52 = v5.20 D55 (NBME 28) ·
 * desplazadas D52, D53, D54, D56, D57, D79; con n = 50 (v6.03): slots 1-49 = v5.20 D1-D49 · slot 50 = v5.20 D55 · desplazadas D50-D54,
 * D56, D57, D79.
 * @param {number} n slots de F1 (gen_usmle_v5: f1.dias · generarTramo2: f1Filas ≤ 58)
 * @param {object} [byD] filas v5.20 por D (por defecto el dias_v520.json congelado) — decide qué es hito (sub «🎯…»)
 * @returns {{ enF1: (number|string)[], desplazadas: number[], consumido: string[], f1Filas: number, hitos: number[] }}
 */
function colocarF1(n, byD = Object.fromEntries(cargarV520().map((x) => [x.d, x]))) {
  const esHito = (o) => typeof o === 'number' && /^🎯/.test(byD[o].sub);
  const hitos = ORIGEN_F1_TEMARIO.filter(esHito);
  if (!(Number.isInteger(n) && n >= hitos.length && n <= ORIGEN_F1.length)) throw new Error(`colocarF1: ${n} slots (válido ${hitos.length}-${ORIGEN_F1.length}: los ${hitos.length} hitos de F1 siempre caben)`);
  const enF1 = new Array(n).fill(null);
  hitos.forEach((d, k) => { enF1[Math.min(ORIGEN_F1_TEMARIO.indexOf(d) + 1, n - (hitos.length - 1 - k)) - 1] = d; });
  const resto = ORIGEN_F1.filter((o) => !esHito(o));
  let i = 0;
  for (let s = 0; s < n; s++) if (enF1[s] === null) enF1[s] = resto[i++];
  const sobran = resto.slice(i);
  return { enF1, desplazadas: sobran.filter((o) => typeof o === 'number'), consumido: sobran.filter((o) => typeof o === 'string'), f1Filas: enF1.filter((o) => typeof o === 'number').length, hitos };
}
/** dOrig de v5.20 que el tramo 2 debe cubrir (20 contenido + 7 hitos + 10 banco/sprint) con F1 completa (v6.00: D79 vive en F1 = D58).
 *  v6.01: + las desplazadas de F1 (generarTramo2 → `esperados`). */
const DORIG_ESPERADOS = [...CONT, 65, 72, 77, 82, 83, 85, 87, 84, 86, 88, 89, 90, 91, 92, 93, 94, 95];
const sistemaRot = ['Cardiovascular', 'Respiratory', 'Renal', 'Gastrointestinal', 'Endocrine', 'Nervous System', 'Hematology & Oncology', 'Fundamentos', 'Immunology'];
// valores por defecto de los campos de DiaUSMLE en filas SIN dOrig (§B3, tabla de defaults)
const DEF = {
  reentrada: { system: 'Reentrada', tier: 'CORE', bbCh: 'Repaso mixto F1', bbVid: '—', uw: 'AMBOSS timed mixto (9 sistemas F1) + incorrectas uWorld', mat: 'AMBOSS + uWorld + Anki', matType: 'clin', palm: null },
  hitoUWSA3: { system: 'Assessment', tier: 'CORE', bbCh: 'Assessment', bbVid: '—', uw: 'uWorld Self-Assessment 3', mat: 'uWorld UWSA3', matType: 'clin', palm: null },
  day_after: { system: 'Assessment', tier: 'CORE', bbCh: 'Assessment', bbVid: '—', uw: 'Revisión del hito (sin preguntas nuevas)', mat: 'Informe del hito + First Aid + Anki', matType: 'clin', palm: null },
  refuerzo: { tier: 'HIGH', bbCh: 'Biostats/Epi', bbVid: '—', matType: 'behav', palm: null },
  reactivacion: { tier: 'CORE', bbCh: 'Reactivación', bbVid: '—', uw: 'uWorld incorrectas/flagged del sistema + AMBOSS (bloques timed)', mat: 'uWorld + AMBOSS + First Aid/Pathoma + Anki', matType: 'clin', palm: null },
  uw_random: { system: 'Banco intensivo', tier: 'CORE', bbCh: 'Banco', bbVid: '—', uw: 'uWorld timed random (FRESCO)', mat: 'uWorld + First Aid + Anki', matType: 'clin', palm: null },
  incorrectas: { system: 'Banco intensivo', tier: 'CORE', bbCh: 'Banco', bbVid: '—', uw: 'uWorld incorrects', mat: 'uWorld + First Aid + Anki', matType: 'clin', palm: null },
  consolidacion: { system: 'Sprint final', tier: 'CORE', bbCh: 'Sprint', bbVid: '—', uw: 'First Aid / Pathoma rapid review + flagged', mat: 'First Aid + Pathoma + Anki', matType: 'clin', palm: null },
  taper: { system: 'Sprint final', tier: 'CORE', bbCh: 'Sprint', bbVid: '—', uw: 'flagged/incorrectas ya vistas', mat: 'Anki maduro + First Aid', matType: 'clin', palm: null },
  ritual: { system: 'Sprint final', tier: 'CORE', bbCh: 'Sprint', bbVid: '—', uw: '—', mat: '—', matType: 'clin', palm: null },
  colchon: { system: 'Colchón', tier: 'CORE', bbCh: 'Colchón', bbVid: '—', uw: 'fila atrasada · si no: uWorld incorrectas/flagged + AMBOSS del sistema débil', mat: 'uWorld + AMBOSS + Anki', matType: 'clin', palm: null },
};
const CAMPOS_V520 = ['system', 'tier', 'bbCh', 'bbVid', 'uw', 'mat', 'matType', 'palm'];
const NOTA_V6 = { 72: 'v6: punto de control de la reactivación (ya no cierra la Fase A)', 82: 'v6: la decisión GO/NO-GO es en E-49, tras el NBME 32' };

/**
 * Genera el tramo 2 (misma regla determinista que la referencia r2, §B3.1-8).
 * @param {object} o encaps, examen, serums (AAAA-MM-DD) · skip: Set · adjudicacion: [{fecha, motivo}] (protegidos de entrada del JSON)
 *   · protegExtra: [fecha] (--proteg) · examenPrevio · congelarHasta · previo: filas (DIAS_T2 vigente) · pendientes: [uid] · pendientesF1: [d]
 *   · f1Filas: filas de temario que caben en F1 (v6.01; por defecto 58 = v6.00) · byD: filas v5.20 por D (por defecto el dias_v520.json congelado)
 * @returns {{ out: object[], deficitFwd: number, deficitBwd: number, R: string, GONOGO: string, ritual: string, frozen: number, claveNogo: string|null, log: string[], faltan: number[], f1Filas: number, desplazadasF1: number[], origenF1: (number|string)[], esperados: number[] }}
 */
function generarTramo2(o) {
  const ENCAPS = o.encaps, E = o.examen, S = o.serums;
  const skip = o.skip instanceof Set ? o.skip : new Set(o.skip || []);
  const byD = o.byD || Object.fromEntries(cargarV520().map((x) => [x.d, x]));
  const CONG = o.congelarHasta || null;
  const E_PREV = o.examenPrevio || E;
  const PENDIENTES = o.pendientes || [];
  const PEND_F1 = o.pendientesF1 || [];
  // v6.01: filas de temario de F1 que NO caben → desplazadas al tramo 2 con su dOrig (D# v5.20)
  // v6.02: las decide colocarF1 (hitos anclados en F1; desplazadas = las últimas no-hito): v6.03 [50-54, 56, 57, 79] · v6.02 [52, 53, 54, 56, 57, 79] · v6.01 [79]
  const F1FILAS = o.f1Filas == null ? F1_FILAS_V600 : Number(o.f1Filas);
  if (!(Number.isInteger(F1FILAS) && F1FILAS >= 1 && F1FILAS <= F1_FILAS_V600)) throw new Error('f1Filas inválido (1-' + F1_FILAS_V600 + '): ' + o.f1Filas);
  const COL = colocarF1(F1FILAS, byD);
  const DESPL = COL.desplazadas;
  for (const dv of DESPL) if (/^🎯/.test(byD[dv].sub)) throw new Error(`fila desplazada de F1 que es un hito (D${dv} v5.20): un hito F1 no se desplaza (decisión de Joseph)`);
  const posF1 = (dv) => ORIGEN_F1_TEMARIO.indexOf(dv) + 1; // fila de F1 sin comprimir = su D# (v6.01: D79 → 58 · v6.02: D52 → 52 …)
  // v6.02 (17-oct): régimen de HITOS ANCLADOS = algún hito de F1 no está en su slot natural (su D#) → la etiqueta de la desplazada es su
  // origen v5.20 («era v5.20 D52»); si todos los hitos siguen en su D# (v6.00/v6.01) se conserva «era la fila N de F1» (referencias congeladas)
  const HITOS_ANCLADOS = COL.hitos.some((h) => COL.enF1[ORIGEN_F1_TEMARIO.indexOf(h)] !== h);
  const origenDespl = (a) => (HITOS_ANCLADOS ? `era v5.20 D${a.dOrig}` : `era la fila ${a.desdeF1} de F1`);
  const pendF1Invalido = (d) => `pendiente F1 inválido (1-${F1FILAS}, sin hitos${F1FILAS < F1_FILAS_V600 ? `; ${F1FILAS + 1 < F1_FILAS_V600 ? `${F1FILAS + 1}-${F1_FILAS_V600} no son slots` : `${F1_FILAS_V600} no es slot`} de F1 y se ignora${F1FILAS + 1 < F1_FILAS_V600 ? 'n' : ''}` : ''}): ${d}`;
  const R = V6.reinicioDe(ENCAPS);         // DJ-2: martes siguiente al ENCAPS (el lunes libre); vale para examen en sáb o dom
  const claveNogo = `${E_PREV}>${E}`;
  const TABLA = CONG && E_PREV !== E ? HITOS_NOGO[claveNogo] : HITOS[E];
  if (!TABLA) throw new Error('sin tabla de hitos para ' + (CONG && E_PREV !== E ? claveNogo : E));
  const GONOGO = V6.gonogoDe(E);
  // ── congelado (regeneración a mitad de camino) ──
  let frozen = [];
  if (CONG) {
    if (!o.previo) throw new Error('--congelar-hasta exige --previo <json>');
    frozen = o.previo.filter((x) => x.fecha <= CONG);
    frozen.forEach((x, i) => { if (x.t !== i + 1 || x.d !== 101 + i) throw new Error('previo no contiguo en ' + x.fecha); });
  }
  const formasUsadas = new Set(frozen.filter((x) => x.tipo === 'hito').map((x) => String(x.forma)));
  // ── días de plan: protegidos A3 del escenario (+ adjudicación del JSON + --proteg) menos el ritual (fila USMLE) ──
  const adj = [...(o.adjudicacion || []), ...(o.protegExtra || []).map((fecha) => ({ fecha, motivo: 'protegido extra (--proteg)' }))];
  const ritualA3 = V6.ritualDe(E, S, skip, adj.map((p) => p.fecha));
  const prot = V6.protegidosDe({ encaps: ENCAPS, encapsProvisional: true, examen: E, serumsInicio: S, skip, adjudicacion: adj });
  const PROTEG = new Set(prot.map((p) => p.fecha).filter((s) => s !== ritualA3));
  const F3 = habLV(R, add(S, -1), skip).filter((s) => !PROTEG.has(s));
  const lunTaper = lunesDe(add(E, -7));   // lunes de la semana anterior a la del examen
  const F4 = habLS(S, add(E, -2), skip).filter((s) => !PROTEG.has(s));
  const PLAN_TODO = [...F3, ...F4].filter((s) => s < add(E, -1) && wd(s) !== 0); // D-1 (viaje) y examen fuera
  const PLAN = PLAN_TODO.filter((s) => !CONG || s > CONG);
  const ADAPT_FIN = V6.adaptacionHastaDe(S);
  const esF4 = (s) => s >= S;
  const futuro = (s) => !CONG || s > CONG;
  // ── colas ──
  const mk = (u) => ({ ...u, rest: 1 });
  const FWD_ALL = [], BWD_ALL = [];
  DESPL.forEach((d) => FWD_ALL.push(mk({ tipo: 'contenido', dOrig: d, uid: 'C' + d, desdeF1: posF1(d) }))); // v6.01: cabeza de la cola
  CONT.forEach((d) => FWD_ALL.push(mk({ tipo: 'contenido', dOrig: d, uid: 'C' + d })));
  REFUERZO.forEach((r, i) => FWD_ALL.push(mk({ tipo: 'refuerzo', ref: i, uid: 'REF' + i, ...r })));
  REACT.forEach(([sys, k, n]) => FWD_ALL.push(mk({ tipo: 'reactivacion', sistema: sys, k, n, uid: `RX-${sys}-${k}` })));
  RANDOM.forEach((x) => BWD_ALL.push(mk({ tipo: 'uw_random', dOrig: typeof x === 'number' ? x : null, nuevo: typeof x === 'string' ? x : null, uid: 'UR' + x })));
  INCORR.forEach((x) => BWD_ALL.push(mk({ tipo: 'incorrectas', dOrig: typeof x === 'number' ? x : null, nuevo: typeof x === 'string' ? x : null, uid: 'IN' + x })));
  CONSOL.forEach((x) => BWD_ALL.push(mk({ tipo: 'consolidacion', dOrig: typeof x === 'number' ? x : null, nuevo: typeof x === 'string' ? x : null, uid: 'CO' + x })));
  let fwd = FWD_ALL.map((u) => ({ ...u })), bwd = BWD_ALL.map((u) => ({ ...u }));
  if (CONG) { // consumo de unidades por las filas congeladas (parte k/n = 1/n de unidad)
    const cons = {};
    for (const x of frozen) if (x.uid) { const n = x.parte ? Number(x.parte.split('/')[1]) : 1; cons[x.uid] = (cons[x.uid] || 0) + 1 / n; }
    const resta = (u) => { u.rest = Math.max(0, 1 - (cons[u.uid] || 0)); return u.rest > 0.001; };
    fwd = fwd.filter(resta); bwd = bwd.filter(resta);
    // pendientes = unidades de filas congeladas SIN ✓ (plan_checks): la unidad ENTERA vuelve al principio de la cola-adelante
    for (const uid of [...PENDIENTES].reverse()) {
      const base = [...FWD_ALL, ...BWD_ALL].find((u) => u.uid === uid);
      if (!base) throw new Error('pendiente desconocido (solo unidades de cola, no anclas): ' + uid);
      fwd = fwd.filter((u) => u.uid !== uid); bwd = bwd.filter((u) => u.uid !== uid);
      fwd.unshift({ ...base, rest: 1, pendiente: true });
    }
  }
  // (f) cierre de F1: recuperaciones de F1 delante de todo; no llevan dOrig (no entran en V1), sí dF1 (= el d/slot de F1).
  // v6.01: un d > f1Filas no es recuperación (nunca estuvo en F1): si era una desplazada ya va en la cola → no se duplica.
  // v6.02: el contenido del slot d sale de la colocación (COL.enF1[d-1]; en v6.00/v6.01 = la posición d del orden de F1).
  for (const d of [...PEND_F1].reverse()) {
    if (!(Number.isInteger(d) && d >= 1 && d <= F1_FILAS_V600)) throw new Error(pendF1Invalido(d));
    if (d > F1FILAS) continue;
    if (/^🎯/.test(byD[COL.enF1[d - 1]].sub)) throw new Error(pendF1Invalido(d));
    fwd.unshift(mk({ tipo: 'contenido', dF1: d, uid: 'F1-' + d }));
  }
  // ── 1) filas ancladas ──
  const filas = new Map(); // fecha → fila
  const ancla = (s, a) => { if (!futuro(s)) return; if (filas.has(s)) throw new Error('choque de anclas ' + s + ' ' + JSON.stringify(a)); filas.set(s, a); };
  const sig = (s) => PLAN.find((x) => x > s);
  ancla(R, { tipo: 'reentrada' });
  ancla(F3[1], { tipo: 'hito', dOrig: 65, forma: 65, nombre: 'NBME 29', ventana: null });
  for (const [nombre, forma, vIni, vFin, pref] of TABLA) {
    if (pref < R) throw new Error('hito antes del reinicio: ' + nombre);
    if (!futuro(pref) || formasUsadas.has(String(forma))) continue;
    ancla(pref, { tipo: 'hito', dOrig: typeof forma === 'number' ? forma : null, forma, nombre, ventana: [vIni, vFin] });
    ancla(sig(pref), { tipo: 'day_after', de: nombre });
  }
  // taper: ritual = último día de plan anterior a E−1 · D95 = el anterior · D94 = el anterior · resto de la semana = taper
  const taper = PLAN_TODO.filter((s) => s >= lunTaper);
  taper.forEach((s, i) => {
    const k = taper.length - 1 - i;
    ancla(s, k === 0 ? { tipo: 'ritual' } : k === 1 ? { tipo: 'taper', dOrig: 95 } : k === 2 ? { tipo: 'taper', dOrig: 94 } : { tipo: 'taper', dOrig: null });
  });
  if (taper.length && taper[taper.length - 1] !== ritualA3) throw new Error(`ritual del tramo 2 ${taper[taper.length - 1]} ≠ ritualDe() ${ritualA3} (gen_fechas_v6)`);
  const FREE120 = (() => { const h = [...filas.entries()].find(([, a]) => a.tipo === 'hito' && /Free 120/.test(a.nombre)); return h ? h[0] : (frozen.find((x) => x.tipo === 'hito' && /Free 120/.test(x.nombre || x.sub)) || {}).fecha; })();
  // ── 2) huecos ──
  const libresTodos = PLAN.filter((s) => !filas.has(s));
  const cap = (s) => (esF4(s) ? (s <= ADAPT_FIN ? 0.25 : 0.5) : 1); // fracción de UNIDAD que cabe en la fila
  function llenar(libres, aplicar) {
    const FQ = fwd.map((u) => ({ u, rest: u.rest })), BQ = bwd.map((u) => ({ u, rest: u.rest }));
    let i = 0, uIdx = 0;
    for (; i < libres.length && uIdx < FQ.length; i++) {
      const s = libres[i], c = cap(s), it = FQ[uIdx], frac = 1 - it.rest, partes = Math.round(1 / c), parte = Math.round(frac / c) + 1;
      if (aplicar) filas.set(s, { ...it.u, parte: partes > 1 ? `${parte}/${partes}` : null });
      it.rest -= c; if (it.rest <= 0.001) uIdx++;
    }
    const restantes = libres.slice(i);
    let j = restantes.length - 1, bIdx = BQ.length - 1;
    for (; j >= 0 && bIdx >= 0; j--) {
      const s = restantes[j], c = cap(s), it = BQ[bIdx], hechoAtras = it.u.rest - it.rest, partes = Math.round(1 / c), parte = partes - Math.round(hechoAtras / c);
      if (aplicar) filas.set(s, { ...it.u, parte: partes > 1 ? `${parte}/${partes}` : null });
      it.rest -= c; if (it.rest <= 0.001) bIdx--;
    }
    if (aplicar) for (let k = 0; k <= j; k++) filas.set(restantes[k], { tipo: 'colchon' });
    return { C: j + 1, deficitFwd: FQ.length - uIdx, deficitBwd: bIdx + 1 };
  }
  // pasada en seco → nº de filas colchón C; se reparten primero en SÁBADOS de F4 (fuera de la inducción), equiespaciados
  const seco = llenar(libresTodos, false);
  const satCand = libresTodos.filter((s) => esF4(s) && s > ADAPT_FIN && wd(s) === 6);
  let K = [];
  if (seco.C >= satCand.length) K = satCand.slice();
  else for (let k = 0; k < seco.C; k++) K.push(satCand[Math.floor((k + 0.5) * satCand.length / seco.C)]);
  const Kset = new Set(K);
  K.forEach((s) => filas.set(s, { tipo: 'colchon', sabado: true }));
  const res = llenar(libresTodos.filter((s) => !Kset.has(s)), true);
  const deficitFwd = res.deficitFwd, deficitBwd = res.deficitBwd;
  // ── 3) render ──
  const out = frozen.map((x) => ({ ...x }));
  let n = out.length; let rot = frozen.filter((x) => x.fase === 'F3' && /16:15 REENTRADA/.test(x.franjaNota || '')).length;
  for (const s of PLAN) {
    const a = filas.get(s); n++;
    const fila = { t: n, d: 100 + n, fecha: s, fase: esF4(s) ? 'F4' : 'F3', tipo: a.tipo, dOrig: typeof a.dOrig === 'number' ? a.dOrig : null, parte: a.parte || null };
    if (a.uid) fila.uid = a.uid;
    const v = a.dOrig && typeof a.dOrig === 'number' ? byD[a.dOrig] : null;
    const F4row = esF4(s);
    const postFree = FREE120 && s > FREE120;
    switch (a.tipo) {
      case 'reentrada': Object.assign(fila, DEF.reentrada, { sub: 'REENTRADA tras la pausa ENCAPS: 2×20Q timed MEZCLADAS de los 9 sistemas de F1 (AMBOSS + incorrectas uWorld) + revisión completa + Anki de choque (FSRS vuelve a 0,90 hoy)', qDia: 40, nivelUW: 4, h: 5.5 }); break;
      case 'hito': {
        const q = /UWSA/.test(a.nombre) ? 160 : /Free 120 \+ 4/.test(a.nombre) ? 280 : /Free 120/.test(a.nombre) ? 120 : /\+ 3 bloques/.test(a.nombre) ? 320 : 200;
        const hora = !F4row ? '07:00-12:30' : q >= 280 ? '07:00-16:30' : q === 200 ? '07:00-12:15' : q === 160 ? '07:00-11:15' : '07:00-10:15';
        const extra = (/\+ 3 bloques/.test(a.nombre) ? ' · + 3 bloques random = ENSAYO 7 bloques' : /\+ 4 bloques/.test(a.nombre) ? ' · + 4 bloques random = ENSAYO 7 bloques' : '')
          + (F4row ? (q >= 280 ? ' · SOLO en feriado/día sin turno (si hay turno: el NBME en un día T y los bloques random en el siguiente día T de la ventana)' : ' · día con turno TARDE o feriado sin turno') + ` · ventana ${f(a.ventana[0])}→${f(a.ventana[1])}` : '')
          + (a.dOrig === 65 ? ' · NUEVA LÍNEA BASE tras la pausa (≥ NBME 28 − 5; caída >8 → +2 semanas de reactivación pagadas con colchón)' : '')
          + (NOTA_V6[a.dOrig] ? ' · ' + NOTA_V6[a.dOrig] : '');
        if (v) { CAMPOS_V520.forEach((k) => { fila[k] = v[k]; }); fila.sub = v.sub.replace(/\(([^()]*?)\d{2}:\d{2}-\d{2}:\d{2}\)/, (m, pre) => `(${pre}${hora})`) + extra; fila.subV520 = v.sub; }
        else Object.assign(fila, DEF.hitoUWSA3, { sub: `🎯 ${a.nombre} (${hora})` + extra });
        Object.assign(fila, { forma: a.forma, nombre: a.nombre, qDia: q, nivelUW: 5, h: q >= 280 ? 8.5 : q === 200 ? 5.25 : q === 160 ? 4.25 : 3.2, ventana: a.ventana });
        break;
      }
      case 'day_after': Object.assign(fila, DEF.day_after, { sub: `DAY-AFTER del ${a.de} (Palmerton §9.2): trayectoria + auditoría de honestidad + triaje de errores + drill de cronología (10 PC cards) + lectura por sistema — en bloque A + B`, qDia: 0, nivelUW: 5, h: F4row ? 2.625 : 5.5 }); break;
      case 'contenido': {
        if (a.dF1) { const w1 = byD[COL.enF1[a.dF1 - 1]]; CAMPOS_V520.forEach((k) => { fila[k] = w1[k]; }); Object.assign(fila, { dF1: a.dF1, sub: `RECUPERACIÓN F1 (D${a.dF1} no hecho) · ` + (a.parte ? `parte ${a.parte} · ` : '') + w1.sub, qDia: a.parte ? 20 : 40, nivelUW: 2, h: a.parte ? (s <= ADAPT_FIN ? 1.3125 : 2.625) : 5.5 }); break; }
        // v6.01: las desplazadas de F1 cuentan su posición entre las desplazadas (regla de F1); las de CONT, entre CONT (sin cambio)
        const pos = (a.desdeF1 ? DESPL : CONT).filter((x) => byD[x].system === v.system).indexOf(a.dOrig) + 1;
        const viernes = wd(s) === 5;
        let nivel = pos <= 2 ? 1 : viernes ? 4 : 2; let q = pos <= 2 ? 30 : 40;
        const preF1 = a.desdeF1 ? `DE F1 → TRAMO 2 (no cupo en F1 antes de la pausa ENCAPS; ${origenDespl(a)}) · ` : '';
        if (a.parte) { // F4: contenido partido
          const p1 = a.parte.startsWith('1');
          fila.sub = preF1 + (p1 ? 'PARTE 1 · PRE-TEST 10Q tutor + DEEP PRIME (vídeo + First Aid) · ' : 'PARTE 2 · CONSOLIDACIÓN 20Q timed del subtema + Anki de mecanismo · ') + v.sub;
          q = p1 ? 10 : 20; nivel = p1 ? 1 : nivel;
        } else fila.sub = preF1 + v.sub;
        CAMPOS_V520.forEach((k) => { fila[k] = v[k]; });
        Object.assign(fila, { qDia: q, nivelUW: nivel, h: a.parte ? (s <= ADAPT_FIN ? 1.3125 : 2.625) : 5.5 });
        if (nivel === 4 && !a.parte) fila.franjaNota = 'VIERNES NIVEL 4: 11:00 = 20-30Q timed MIXTOS de los sistemas ya dominados + 10Q tutor del subtema';
        break;
      }
      case 'refuerzo': Object.assign(fila, DEF.refuerzo, { system: a.system, uw: a.uw, mat: a.mat, sub: a.sub + (a.parte ? ` · parte ${a.parte}` : ''), qDia: a.parte ? 20 : 40, nivelUW: 2, h: a.parte ? 2.625 : 5.5 }); break;
      case 'reactivacion': Object.assign(fila, DEF.reactivacion, { system: a.sistema, sub: `REACTIVACIÓN ${a.sistema} (${a.k}/${a.n}): bloques timed del sistema (incorrectas/flagged uWorld + AMBOSS) + revisión + relectura FA/Pathoma de los subtemas <70 % + Anki de fallos` + (a.parte ? ` · parte ${a.parte}` : ''), qDia: a.parte ? 20 : 40, nivelUW: 3, h: a.parte ? (s <= ADAPT_FIN ? 1.3125 : 2.625) : 5.5 }); break;
      case 'uw_random': Object.assign(fila, DEF.uw_random, { sub: (v ? v.sub : 'UWorld FRESCO random timed 2×40Q + revisión profunda') + (a.parte ? ` · parte ${a.parte} (1×40Q + revisión)` : ''), qDia: a.parte ? 40 : 80, nivelUW: 4, h: a.parte ? 2.625 : 5.5 }); if (v) CAMPOS_V520.forEach((k) => { fila[k] = v[k]; }); break;
      case 'incorrectas': Object.assign(fila, DEF.incorrectas, { sub: (v ? v.sub : '2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débil del último NBME') + (a.parte ? ` · parte ${a.parte}` : ''), qDia: a.parte ? 40 : 80, nivelUW: 5, h: a.parte ? 2.625 : 5.5 }); if (v) CAMPOS_V520.forEach((k) => { fila[k] = v[k]; }); break;
      case 'consolidacion': {
        const txt = v ? v.sub : a.nuevo === 'pathoma' ? 'CONSOLIDACIÓN · Pathoma cap. 1-3 (lesión, inflamación, neoplasia) rapid review + Anki maduro' : a.nuevo === 'fa15' ? 'CONSOLIDACIÓN · First Aid rapid review sistemas 1-5 + Anki maduro + 20Q flagged' : 'CONSOLIDACIÓN · First Aid rapid review sistemas 11-14 + bioestadística/ética + 20Q flagged';
        Object.assign(fila, DEF.consolidacion, { sub: txt + (a.parte ? ` · parte ${a.parte}` : ''), qDia: a.parte ? 20 : 40, nivelUW: 5, h: a.parte ? 2.625 : 5.5 }); if (v) CAMPOS_V520.forEach((k) => { fila[k] = v[k]; }); break;
      }
      case 'taper': Object.assign(fila, DEF.taper, { sub: v ? v.sub : 'TAPER: 20Q flagged/incorrectas ya vistas + Anki MADURO + First Aid de esquemas (≤2 h, solo bloque A)', qDia: 20, nivelUW: 5, h: a.dOrig === 95 ? 1 : 2, franjaNota: a.dOrig === 94 ? 'TAPER · ÚLTIMA SESIÓN DE BANCO' : a.dOrig === 95 ? 'TAPER · sesión MÍNIMA (≤1 h) · nada nuevo · empacar mañana' : 'TAPER · cero preguntas nuevas, cero tarjetas nuevas' }); if (v) CAMPOS_V520.forEach((k) => { fila[k] = v[k]; }); break;
      case 'ritual': Object.assign(fila, DEF.ritual, { sub: 'SIN ESTUDIO · ritual de test-day: permiso impreso + digital, 2 ID idénticas al permiso, bolsas Ziploc por break, ruta y pasaje a Lima, dormir ≥7 h (DÍA PROTEGIDO para todos los planes)', qDia: 0, nivelUW: 5, h: 0 }); break;
      case 'colchon': Object.assign(fila, DEF.colchon, postFree
        ? { sub: 'COLCHÓN (cierre, post-Free 120): si hay una fila atrasada → hazla hoy; si no → SOLO incorrectas/flagged ya vistas + Anki maduro (0 preguntas nuevas)', qDia: 20, nivelUW: 5, h: F4row ? 2.625 : 5.5 }
        : { sub: 'COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sistema más débil del último NBME: 40Q timed (incorrectas/flagged uWorld + AMBOSS) + revisión + Anki de fallos', qDia: 40, nivelUW: 4, h: F4row ? (s <= ADAPT_FIN ? 1.3125 : 2.625) : 5.5 }); break;
      default: throw new Error('tipo de fila desconocido ' + a.tipo + ' en ' + s);
    }
    if (!F4row && a.tipo !== 'hito' && a.tipo !== 'reentrada') { fila.franjaNota = (fila.franjaNota ? fila.franjaNota + ' · ' : '') + `16:15 REENTRADA: 20Q timed de ${sistemaRot[rot++ % 9]} + revisión`; }
    if (v) fila.subV520 = v.sub; // texto v5.20 exacto (verificación V1 del multiset)
    if (a.pendiente) fila.pendiente = true;
    // turno T: bloque B 07:40-10:10 = +40Q (AMBOSS / incorrectas, no uWorld fresco) · nunca en anclas ni tras el Free 120 (cierre)
    if (F4row && !['hito', 'day_after', 'taper', 'ritual'].includes(a.tipo) && !postFree) fila.qDiaT = fila.qDia + 40;
    if (s === GONOGO) fila.gate = CONG && E_PREV !== E ? 'GO/NO-GO #2 (E-49)' : 'GO/NO-GO (E-49)';
    if (F4row && s <= ADAPT_FIN) fila.adapt = true;
    out.push(fila);
  }
  // faseUW: A hasta el primer uw_random · B hasta la primera consolidacion/taper · C después (filas congeladas conservan la suya)
  { const iB = out.findIndex((x) => x.tipo === 'uw_random'); const iC = out.findIndex((x) => x.tipo === 'consolidacion' || x.tipo === 'taper');
    out.forEach((x, k) => { if (k < frozen.length) return; x.faseUW = (iB < 0 || k < iB) ? 'A' : (iC < 0 || k < iC) ? 'B' : 'C'; }); }
  // ── resumen ──
  const cnt = {}; out.forEach((x) => { cnt[x.tipo] = (cnt[x.tipo] || 0) + 1; });
  const horas = out.reduce((acc, x) => acc + (x.h || 0), 0);
  const dSet = new Set(out.filter((x) => x.dOrig && typeof x.dOrig === 'number').map((x) => x.dOrig));
  const esperados = [...DESPL, ...DORIG_ESPERADOS];
  const faltan = esperados.filter((d) => !dSet.has(d));
  const qT = (pred) => out.filter(pred).reduce((acc, x) => acc + (x.qDia || 0), 0);
  const log = [
    `TRAMO 2 · ENCAPS ${fy(ENCAPS)} → reinicio ${fy(R)} · SERUMS ${fy(S)} · examen ${fy(E)} · GO/NO-GO ${f(GONOGO)}${CONG ? ` · CONGELADO ≤ ${f(CONG)} (${frozen.length} filas)${E_PREV !== E ? ' · cola NO-GO ' + claveNogo : ''}` : ''}`,
    `filas ${out.length} (F3 ${out.filter((x) => x.fase === 'F3').length} · F4 ${out.filter((x) => x.fase === 'F4').length}) · d ${out.length ? out[0].d : '—'}-${out.length ? out[out.length - 1].d : '—'} · tipos ${JSON.stringify(cnt)}`,
    `déficit cola-adelante ${deficitFwd} u · déficit cola-atrás ${deficitBwd} u · horas-plan (piso) ${horas.toFixed(0)} · colchón ${cnt.colchon || 0} filas ≈ ${out.filter((x) => x.tipo === 'colchon').reduce((acc, x) => acc + x.h, 0).toFixed(0)} h`,
    'dOrig cubiertos ' + dSet.size + ' / esperados ' + esperados.length + ' ' + (faltan.length ? 'FALTAN ' + faltan.join(',') : DESPL.length ? `✓ (incl. ${DESPL.map((d) => 'D' + d).join(', ')} desplazada${DESPL.length > 1 ? 's' : ''} de F1: caben ${F1FILAS} filas de temario en F1)` : '✓ (+ D79 en F1 D58)'),
    `preguntas (piso): contenido ${qT((x) => x.tipo === 'contenido')} · refuerzo ${qT((x) => x.tipo === 'refuerzo')} · reactivación ${qT((x) => x.tipo === 'reactivacion')} · uw_random ${qT((x) => x.tipo === 'uw_random')} · incorrectas ${qT((x) => x.tipo === 'incorrectas')} · colchón ${qT((x) => x.tipo === 'colchon')} → uWorld FRESCO = contenido + refuerzo + uw_random = ${qT((x) => ['contenido', 'refuerzo', 'uw_random'].includes(x.tipo))}`,
  ];
  return { out, deficitFwd, deficitBwd, R, GONOGO, ritual: ritualA3, frozen: frozen.length, claveNogo: CONG && E_PREV !== E ? claveNogo : null, log, faltan, f1Filas: F1FILAS, desplazadasF1: DESPL, origenF1: COL.enF1, esperados };
}

/** Tabla markdown del tramo 2 (mismo formato que la referencia: Anexo A de la espec). */
function mdTramo2(out) {
  const L = out.map((x) => `| T${x.t} | ${x.d} | ${f(x.fecha)} | ${x.fase} | ${x.tipo}${x.parte ? ' ' + x.parte : ''} | ${x.dOrig ? 'D' + x.dOrig : x.tipo === 'hito' ? 'nuevo' : '—'} | ${x.qDia}${x.qDiaT ? '/' + x.qDiaT : ''} | ${x.nivelUW} | ${x.faseUW} | ${(x.sub || '').replace(/\|/g, '/').slice(0, 78)}${x.gate ? ' · **' + x.gate + '**' : ''}${x.ventana ? ` · ventana ${f(x.ventana[0])}→${f(x.ventana[1])}` : ''} |`);
  return '| T | d | fecha | fase | tipo | dOrig | qDia (M/T) | nivelUW | faseUW | contenido |\n|---|---|---|---|---|---|---|---|---|---|\n' + L.join('\n') + '\n';
}

/**
 * Opciones del tramo 2 desde la línea de comandos (las mismas que la referencia r2). Sin posicionales, ENCAPS / EXAMEN / SERUMS
 * salen del JSON validado (`F` = V6.cargarFechasV6()). `escenarioJSON` = true si las tres coinciden con el JSON.
 * v6.01: f1Filas = --f1-filas o, sin él, min(f1.dias, 58) del JSON (las filas de F1 se colocan en orden D1-D57 · D79 · C1 · C2).
 * v6.02: misma opción (52 con el JSON v6.02 · 50 con el v6.03); la colocación (hitos anclados, desplazadas = últimas no-hito) la hace colocarF1.
 */
function opcionesTramo2(argv, F = V6.cargarFechasV6()) {
  const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
  const lista = (k) => (opt(k) || '').split(',').filter(Boolean);
  const posicionales = argv.filter((a, i) => /^20\d\d-\d\d-\d\d$/.test(a) && !/^--/.test(argv[i - 1] || ''));
  const encaps = posicionales[0] || F.encaps.examen;
  const examen = posicionales[1] || F.step1.examen;
  const serums = posicionales[2] || F.serums.inicio;
  const previoFile = opt('--previo');
  return {
    encaps, examen, serums,
    escenarioJSON: encaps === F.encaps.examen && examen === F.step1.examen && serums === F.serums.inicio,
    skip: new Set(F.skip),
    adjudicacion: V6.ctxDe(F).adjudicacion,
    protegExtra: lista('--proteg'),
    examenPrevio: opt('--examen-previo') || null,
    congelarHasta: opt('--congelar-hasta') || null,
    previoFile: previoFile ? path.resolve(previoFile) : null,
    previo: previoFile ? JSON.parse(fs.readFileSync(path.resolve(previoFile), 'utf8')) : null,
    pendientes: lista('--pendientes'),
    pendientesF1: lista('--pendientes-f1').map(Number),
    f1Filas: opt('--f1-filas') != null ? Number(opt('--f1-filas')) : Math.min(F.f1.dias, F1_FILAS_V600),
    permitirDeficit: argv.includes('--permitir-deficit'),
    json: opt('--json'), md: opt('--md'),
  };
}

module.exports = { generarTramo2, opcionesTramo2, mdTramo2, cargarV520, colocarF1, HITOS, HITOS_NOGO, CONT, DORIG_ESPERADOS, ORIGEN_F1_TEMARIO, ORIGEN_F1, F1_FILAS_V600, DEF, CAMPOS_V520, V520_FILE };

if (require.main === module) {
  const o = opcionesTramo2(process.argv.slice(2));
  const r = generarTramo2(o);
  r.log.forEach((l) => console.log(l));
  if (o.json) fs.writeFileSync(o.json, JSON.stringify(r.out, null, 1));
  if (o.md) fs.writeFileSync(o.md, mdTramo2(r.out));
  if ((r.deficitFwd || r.deficitBwd) && !o.permitirDeficit) { console.error(`DÉFICIT ${r.deficitFwd + r.deficitBwd} u: fecha NO viable (R1: no se recorta) → siguiente fecha de la ventana`); process.exit(2); }
}
