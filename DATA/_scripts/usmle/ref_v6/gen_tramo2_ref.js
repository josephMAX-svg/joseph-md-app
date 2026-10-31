// gen_tramo2_ref.js — IMPLEMENTACIÓN DE REFERENCIA de la regla de generación del TRAMO 2 del Step 1 (v6.00 · r2 post-crítica).
// Uso: node gen_tramo2_ref.js [ENCAPS=2027-03-14] [EXAMEN=2027-09-27] [SERUMS=2027-05-03] [--json f] [--md f]
//        [--proteg a,b,…]            protegidos extra (adjudicación, inducción…): no son días de plan
//        [--permitir-deficit]        solo para explorar escenarios: sin él, un déficit ABORTA (exit 2) — R1: nunca se recorta
//        [--pendientes-f1 d1,d2,…]   disparador (f) cierre de F1 (jue 31-dic): d de F1 (slot 1-N, no hitos) sin ✓ (tras C1/C2 si existen) →
//                                    cabeza de la cola-adelante; contenido = el de la colocación de F1 (abajo). Un d > N se ignora.
//        [--rotacion-9]              v6.06 (fix): 16:15 REENTRADA con la rotación FIJA de los 9 sistemas (la de v6.00-v6.05): solo para
//                                    reproducir las referencias v6.03 / v6.04 / v6.05 (v6.00-v6.02 salen iguales sin él).
//        [--f1-filas N=42]           v6.01: filas (slots) de TEMARIO de F1 antes de la pausa (v6.00: 58 · v6.01: 57 · v6.02: 52 · v6.03/v6.04: 50 · v6.05: 47 · v6.06: 42). v6.02: regla
//                                    de COLOCACIÓN con hitos anclados — el hito k-ésimo de F1 (de H = 5: D1, D10, D25, D40, D55) va al slot
//                                    min(D#, N − (H − k)) (conserva su D# o, si no cabe, ocupa los últimos slots de F1); el resto de slots =
//                                    temario NO-hito en orden; lo que no cabe = las ÚLTIMAS no-hito → DESPLAZADAS: unidad de contenido 'C<D>'
//                                    con dOrig a la cabeza de la cola-adelante, en orden v5.20 (forma parte de la cola: el congelado la
//                                    consume) · sub «DE F1 → TRAMO 2 … era v5.20 D<D#>» (con hitos anclados; si todos los hitos siguen
//                                    en su D# — 58/57 — «… era la fila <posición> de F1», la de v6.00/v6.01) + texto v5.20 · nivel por posición entre las
//                                    desplazadas del mismo sistema (1.ª-2.ª → N1 · 30Q); CONT conserva su posición.
//                                    `--f1-filas 58` = salida v6.00 (tramo2_14mar_27sep.json) · `--pendientes-f1 58 --f1-filas 57` = v6.01
//                                    (tramo2_14mar_27sep_v601.json) · `--f1-filas 52` = v6.02 (tramo2_14mar_27sep_v602.json).
//                                    · `--f1-filas 50` = v6.03 (tramo2_14mar_27sep_v603.json).
//                                    · `2027-03-14 2027-10-25 --f1-filas 50` = v6.04 (tramo2_14mar_25oct_v604.json): examen lun 25-oct.
//                                    · `2027-03-14 2027-10-25 --f1-filas 47` = v6.05 (tramo2_14mar_25oct_v605.json): D1 lun 26-oct.
//                                    · `2027-03-14 2027-10-25 --f1-filas 42` = v6.06 (tramo2_14mar_25oct_v606.json): D1 lun 2-nov.
//                                    v6.06 (fix): v6.03 / v6.04 / v6.05 = sus mismos argumentos + `--rotacion-9`.
// v6.06 (fix, 31-oct-2026): 16:15 REENTRADA con la ROTACIÓN REAL (ALTA_ROT, abajo). La rotación fija de 9 sistemas «de F1» llevaba a T9
//   (mar 30-mar) «20Q timed de Hematology & Oncology» antes de estudiar hematología (T12-T17) y a T8 Nervous System antes de cerrar neuro (T11):
//   la F1 v6.06 solo tiene 7 sistemas. Ahora cada sistema de la rotación tiene una FECHA DE ALTA: '' si F1 lo estudia (algún slot de temario
//   no hito y no pendiente) o la fecha de su última fila T de contenido de F1 (desplazada o recuperación; también congeladas) → entra en la
//   fila siguiente; el orden es el de siempre y se saltan los que aún no tienen alta. T1 = «de los <n> sistemas de F1» (sub y uw). Con los 9
//   en F1 (v6.00-v6.02) nada cambia; v6.03-v6.05 = sus argumentos + --rotacion-9. tramo2_14mar_25oct_v606.json regenerado.
// v6.06 (31-oct-2026): corrimiento D1 lun 26-oct → lun 2-nov (la semana del 26-oct no se estudió; Joseph: «corre nada más, con una semana;
//   lo que era la semana anterior, esta semana; para no perder materias, tan solamente corre»). F1 = 42 hábiles y REGLA NUEVA del DAY-AFTER
//   COMPLETO en la colocación (SLOT_F1, abajo): con la regla v6.02 el NBME 27 quedaba en el slot 40 (lun 28-dic) y su Day-After (4 filas)
//   chocaba con el NBME 28 del slot 42 → se adelanta una semana de plan (5 filas) al slot 35 (vie 18-dic). F1 = v5.20 D1-D34 · NBME 27 ·
//   D35-D39 · D41 · NBME 28 (slot 42, mié 30-dic) y van al tramo 2 D42-D54, D56, D57, D79 = 16 desplazadas (5 más que en la v6.05). Por
//   defecto --f1-filas 42 (EXAMEN por defecto sigue siendo 2027-09-27: las referencias v6.00-v6.05 se reproducen con sus mismos argumentos,
//   la regla nueva no mueve nada con N ≥ 45; la v6.06 = `2027-03-14 2027-10-25 --f1-filas 42`).
// v6.05 (24-oct-2026): corrimiento D1 mié 21-oct → lun 26-oct (la semana del 19 no se estudió; Joseph: «todo inicia el lunes 26; corre los
//   horarios, alarga los plazos, no quites temas»). F1 = 47 hábiles con la MISMA regla de hitos anclados (hito k → slot min(D#, 47 − (5 − k))):
//   F1 = v5.20 D1-D46 + D55 (NBME 28 en el slot 47, mié 30-dic) y van al tramo 2 D47-D54, D56, D57, D79 = 11 desplazadas (3 más que en la
//   v6.03/v6.04: D47, D48, D49 Neuro), T3-T13. Por defecto --f1-filas 47 (EXAMEN por defecto sigue siendo 2027-09-27: las referencias
//   v6.00-v6.04 se reproducen con sus mismos argumentos; la v6.05 = `2027-03-14 2027-10-25 --f1-filas 47`).
// v6.05b (24-oct-2026, verificación adversarial): INDUCCIÓN del SERUMS (¼ de unidad por fila) — (a) refuerzo / uw_random / incorrectas /
//   consolidación partidos declaran 1,3125 h por parte en la inducción (antes 2,625: REF0/REF1 = 26,25 h en las 2 semanas «al 50 %»; ahora
//   15,75 h) y uw_random / incorrectas 1×20Q por parte (antes 1×40Q en 79′); (b) un contenido partido en 4 = partes 1-2 «PRE-TEST + DEEP PRIME»
//   (1.ª y 2.ª mitad) y 3-4 «CONSOLIDACIÓN», rótulo «PARTE k/4» (antes 1/4 pre-test + deep prime y 2/4-4/4 «PARTE 2 · CONSOLIDACIÓN»: el
//   material nuevo quedaba en 79′ de 157,5′). En 2 partes, sin cambio. Las referencias v6.00-v6.04 salen byte a byte (en su inducción solo hay
//   reactivación); tramo2_14mar_25oct_v605.json regenerado (T33-T44: C81 rótulos/qDia, REF0/REF1 h; colchón 42 ≈ 110 h y fechas sin cambio).
// v6.04 (21-oct-2026): EXAMEN Step 1 lun 27-sep → lun 25-oct-2027 (decisión de Joseph: «si iba a ser septiembre, que sea octubre»). Sin
//   cambio de lógica ni de valores por defecto (EXAMEN por defecto sigue siendo 2027-09-27: las referencias v6.00-v6.03 se reproducen con sus
//   mismos argumentos); la del escenario vigente se genera con `2027-03-14 2027-10-25 --f1-filas 50` (HITOS['2027-10-25'] = plan B de §B5):
//   182 filas, colchón 48 ≈ 126 h → tramo2_14mar_25oct_v604.json.
// v6.03 (20-oct-2026): corrimiento D1 lun 19-oct → mié 21-oct (lun 19 y mar 20 sin estudio; Joseph: «todo comienza mañana miércoles 21,
//   corre dos días; no comprimas temas ni exámenes, alarga las fechas límite»). F1 = 50 hábiles con la MISMA regla de hitos anclados:
//   F1 = v5.20 D1-D49 + D55 (NBME 28 en el slot 50, mié 30-dic) y van al tramo 2 D50 (Neuro: EM + meningitis + UNM + tumores SNC),
//   D51-D54, D56, D57 (Heme/Onco) y D79 (bioestadística) = 8 desplazadas, T3-T10. Por defecto --f1-filas 50. Con 58 / 57 / 52 se
//   reproducen byte a byte las referencias v6.00 / v6.01 / v6.02 (sin cambio de lógica: solo el valor por defecto).
// v6.02 (17-oct-2026): corrimiento D1 lun 12-oct → lun 19-oct (F1 = 52 hábiles). Un hito F1 no se desplaza: F1 = v5.20 D1-D51 + D55
//   (NBME 28 en el slot 52, mié 30-dic) y van al tramo 2 D52, D53, D54, D56, D57 (Heme/Onco) y D79 (bioestadística). Por defecto
//   --f1-filas 52. Con 58 / 57 la colocación es la de siempre (hitos en su D#) → las referencias v6.00 / v6.01 se reproducen igual.
// v6.02 (17-oct): etiqueta de las DESPLAZADAS sin ambigüedad. Si algún hito de F1 NO está en el slot de su D# (régimen de hitos anclados,
//   v6.02) el sub dice «… era v5.20 D52» … «era v5.20 D79» (antes «era la fila 52…58 de F1», ambiguo: el slot 52 es el NBME 28); si todos
//   siguen en su D# se conserva «era la fila N de F1» → tramo2_14mar_27sep.json / _v601.json siguen saliendo byte a byte (y
//   tramo2_14mar_27sep_v602.json se regenera con la etiqueta nueva). Mensaje «pendiente F1 inválido» con el rango 1-<--f1-filas>.
// v6.01 (10-oct-2026): corrimiento D1 mié 7-oct → lun 12-oct (F1 = 57 hábiles, C1/C2 consumidos, D79 al tramo 2). Referencia del
//   escenario base v6.01: tramo2_14mar_27sep_v601.json (= node gen_tramo2_ref.js --pendientes-f1 58 --f1-filas 57); la de v6.00
//   (tramo2_14mar_27sep.json) se conserva y se reproduce con --f1-filas 58.
//        [--congelar-hasta AAAA-MM-DD --previo previo.json [--examen-previo AAAA-MM-DD] [--pendientes uid1,uid2]]
//            regeneración a mitad de camino (§B7.5): las filas ≤ fecha se copian TAL CUAL (mismos t/d/contenido) y solo se
//            replanifica lo futuro con las unidades no consumidas; si cambia el examen se usa la tabla HITOS_NOGO.
// Los implementadores portan ESTA lógica a DATA/_scripts/usmle/gen_usmle_v5.js (array DIAS_T2) y su salida debe ser
// IDÉNTICA (todas las claves) a la de este script.
const fs = require('fs');
const path = require('path');
const { add, wd, f, fy, diff, FER, SKIP_V6, habLV, habLS, lunesDe } = require('./cal');
const V520 = require('./dias_v520.json'); // congelado: v5.20 (HEAD fd85f61) — NO regenerar tras el Lote 1A
const byD = Object.fromEntries(V520.map((x) => [x.d, x]));
const argv = process.argv.slice(2);
const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
const has = (k) => argv.includes(k);
const posicionales = argv.filter((a, i) => /^20\d\d-\d\d-\d\d$/.test(a) && !/^--/.test(argv[i - 1] || ''));
const ENCAPS = posicionales[0] || '2027-03-14';
const E = posicionales[1] || '2027-09-27';
const S = posicionales[2] || '2027-05-03';
const CONG = opt('--congelar-hasta');
const PREVIO = opt('--previo');
const E_PREV = opt('--examen-previo') || E;
const PENDIENTES = (opt('--pendientes') || '').split(',').filter(Boolean);
const PEND_F1 = (opt('--pendientes-f1') || '').split(',').filter(Boolean).map(Number);
// v6.01: orden del temario de F1 (posición → D# v5.20) y filas que caben en F1
const ORIGEN_F1_TEMARIO = [...Array.from({ length: 57 }, (_, i) => i + 1), 79];
const F1FILAS = opt('--f1-filas') != null ? Number(opt('--f1-filas')) : 42; // v6.06 (v6.05: 47 · v6.03/v6.04: 50 · v6.02: 52)
if (!(Number.isInteger(F1FILAS) && F1FILAS >= 1 && F1FILAS <= 58)) throw new Error('--f1-filas inválido (1-58): ' + opt('--f1-filas'));
// v6.02: colocación con hitos anclados (slot de cada D# del temario en F1; 0 = desplazada)
const esHitoV520 = (d) => /^🎯/.test(byD[d].sub);
const HITOS_F1 = ORIGEN_F1_TEMARIO.filter(esHitoV520);
if (F1FILAS < HITOS_F1.length) throw new Error(`--f1-filas ${F1FILAS} < ${HITOS_F1.length} hitos de F1 (un hito F1 no se desplaza)`);
const SLOT_F1 = []; // SLOT_F1[s-1] = D# v5.20 del slot s de F1
// v6.06: + DAY-AFTER COMPLETO — el Day-After de un hito NBME ocupa las 4 filas siguientes (18:00 del hito + 07:15/18:00 de la siguiente +
//   18:00 de las 3 siguientes); si alcanzaría al hito siguiente, el hito se adelanta semanas de plan enteras (5 filas) hasta que quepa. Se
//   recorre de la cola a la cabeza (el último hito, NBME 28, no tiene Day-After en F1). Con N ≥ 45 no mueve nada; N = 42: NBME 27 40 → 35.
const POS_HITO = HITOS_F1.map((d, k) => Math.min(ORIGEN_F1_TEMARIO.indexOf(d) + 1, F1FILAS - (HITOS_F1.length - 1 - k)));
for (let k = POS_HITO.length - 2; k >= 0; k--) {
  const tope = POS_HITO[k + 1] - 4 - 1; // último slot con el Day-After entero antes del hito k+1
  if (POS_HITO[k] > tope) POS_HITO[k] -= 5 * Math.ceil((POS_HITO[k] - tope) / 5);
  if (POS_HITO[k] < 1 || (k > 0 && POS_HITO[k] <= POS_HITO[k - 1])) throw new Error(`--f1-filas ${F1FILAS}: el hito D${HITOS_F1[k]} no cabe en F1 con su Day-After completo`);
}
HITOS_F1.forEach((d, k) => { SLOT_F1[POS_HITO[k] - 1] = d; });
const NO_HITO = ORIGEN_F1_TEMARIO.filter((d) => !esHitoV520(d));
const CABEN = F1FILAS - HITOS_F1.length;
{ let j = 0; for (let s = 0; s < F1FILAS; s++) if (SLOT_F1[s] === undefined) SLOT_F1[s] = NO_HITO[j++]; }
const DESPL = NO_HITO.slice(CABEN); // las ÚLTIMAS filas de temario no-hito (v6.06: 42-54, 56, 57, 79 · v6.05: 47-54, 56, 57, 79 · v6.03: 50-54, 56, 57, 79 · v6.02: 52, 53, 54, 56, 57, 79 · v6.01: 79 · v6.00: —)
// v6.02 (17-oct): ¿hitos anclados fuera de su D#? (v6.02 sí: NBME 28 en el slot 52) → etiqueta «era v5.20 D#»; si no, la de v6.00/v6.01
const ANCLADO = HITOS_F1.some((d) => SLOT_F1[ORIGEN_F1_TEMARIO.indexOf(d)] !== d);
const ETQ_DESPL = (o) => (ANCLADO ? 'era v5.20 D' + o.dOrig : 'era la fila ' + o.desdeF1 + ' de F1');
const MAX_F1 = ORIGEN_F1_TEMARIO.length; // 58
const ERR_PEND_F1 = (d) => `pendiente F1 inválido (1-${F1FILAS}, sin hitos${F1FILAS < MAX_F1 ? `; ${F1FILAS + 1 < MAX_F1 ? `${F1FILAS + 1}-${MAX_F1} no son slots` : `${MAX_F1} no es slot`} de F1 y se ignora${F1FILAS + 1 < MAX_F1 ? 'n' : ''}` : ''}): ${d}`;
const primerMartesTras = (s) => { let x = add(s, 1); while (wd(x) !== 2) x = add(x, 1); return x; };
const R = primerMartesTras(ENCAPS);         // DJ-2: martes siguiente al ENCAPS (el lunes libre); vale para examen en sáb o dom
// ── hitos 2027 por examen (ventana L-S + preferente) · [nombre, forma(dOrig|'UWSA3'), vIni, vFin, preferente] ──
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
const claveNogo = `${E_PREV}>${E}`;
const TABLA = CONG && E_PREV !== E ? HITOS_NOGO[claveNogo] : HITOS[E];
if (!TABLA) throw new Error('sin tabla de hitos para ' + (CONG && E_PREV !== E ? claveNogo : E));
const GONOGO = add(E, -49);
// ── congelado (regeneración a mitad de camino) ──
let frozen = [];
if (CONG) {
  if (!PREVIO) throw new Error('--congelar-hasta exige --previo <json>');
  const prev = JSON.parse(fs.readFileSync(path.resolve(PREVIO), 'utf8'));
  frozen = prev.filter((x) => x.fecha <= CONG);
  frozen.forEach((x, i) => { if (x.t !== i + 1 || x.d !== 101 + i) throw new Error('previo no contiguo en ' + x.fecha); });
}
const formasUsadas = new Set(frozen.filter((x) => x.tipo === 'hito').map((x) => String(x.forma)));
// ── días de plan ──
const PROTEG = new Set([add(E, -1), E, ...(opt('--proteg') || '').split(',').filter(Boolean)]);
const F3 = habLV(R, add(S, -1)).filter((s) => !PROTEG.has(s));
const lunTaper = lunesDe(add(E, -7));   // lunes de la semana anterior a la del examen
const F4 = habLS(S, add(E, -2)).filter((s) => !PROTEG.has(s));
const PLAN_TODO = [...F3, ...F4].filter((s) => s < add(E, -1) && wd(s) !== 0); // D-1 (viaje) y examen fuera
const PLAN = PLAN_TODO.filter((s) => !CONG || s > CONG);
const ADAPT_FIN = add(S, 13);
const esF4 = (s) => s >= S;
const futuro = (s) => !CONG || s > CONG;
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
const mk = (o) => ({ ...o, rest: 1 });
const FWD_ALL = [], BWD_ALL = [];
for (const d of DESPL) if (/^🎯/.test(byD[d].sub)) throw new Error('fila desplazada de F1 que es un hito: D' + d);
DESPL.forEach((d) => FWD_ALL.push(mk({ tipo: 'contenido', dOrig: d, uid: 'C' + d, desdeF1: ORIGEN_F1_TEMARIO.indexOf(d) + 1 })));
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
// (f) cierre de F1: recuperaciones de F1 (d = slot de F1; contenido = SLOT_F1[d-1]) delante de todo; no llevan dOrig (no entran en V1), sí dF1
for (const d of [...PEND_F1].reverse()) {
  if (!(Number.isInteger(d) && d >= 1 && d <= MAX_F1)) throw new Error(ERR_PEND_F1(d));
  if (d > F1FILAS) continue; // v6.01: no es un slot de F1 (la 58 = D79 desplazada ya está en la cola con su dOrig)
  if (esHitoV520(SLOT_F1[d - 1])) throw new Error(ERR_PEND_F1(d));
  fwd.unshift(mk({ tipo: 'contenido', dF1: d, uid: 'F1-' + d }));
}
// ── 1) filas ancladas ──
const filas = new Map(); // fecha → fila
const ancla = (s, o) => { if (!futuro(s)) return; if (filas.has(s)) throw new Error('choque de anclas ' + s + ' ' + JSON.stringify(o)); filas.set(s, o); };
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
const FREE120 = (() => { const h = [...filas.entries()].find(([, o]) => o.tipo === 'hito' && /Free 120/.test(o.nombre)); return h ? h[0] : (frozen.find((x) => x.tipo === 'hito' && /Free 120/.test(x.nombre || x.sub)) || {}).fecha; })();
// ── 2) huecos ──
const libresTodos = PLAN.filter((s) => !filas.has(s));
const cap = (s) => (esF4(s) ? (s <= ADAPT_FIN ? 0.25 : 0.5) : 1); // fracción de UNIDAD que cabe en la fila
function llenar(libres, aplicar) {
  const F = fwd.map((u) => ({ u, rest: u.rest })), B = bwd.map((u) => ({ u, rest: u.rest }));
  let i = 0, uIdx = 0;
  for (; i < libres.length && uIdx < F.length; i++) {
    const s = libres[i], c = cap(s), it = F[uIdx], frac = 1 - it.rest, partes = Math.round(1 / c), parte = Math.round(frac / c) + 1;
    if (aplicar) filas.set(s, { ...it.u, parte: partes > 1 ? `${parte}/${partes}` : null });
    it.rest -= c; if (it.rest <= 0.001) uIdx++;
  }
  const restantes = libres.slice(i);
  let j = restantes.length - 1, bIdx = B.length - 1;
  for (; j >= 0 && bIdx >= 0; j--) {
    const s = restantes[j], c = cap(s), it = B[bIdx], hechoAtras = it.u.rest - it.rest, partes = Math.round(1 / c), parte = partes - Math.round(hechoAtras / c);
    if (aplicar) filas.set(s, { ...it.u, parte: partes > 1 ? `${parte}/${partes}` : null });
    it.rest -= c; if (it.rest <= 0.001) bIdx--;
  }
  if (aplicar) for (let k = 0; k <= j; k++) filas.set(restantes[k], { tipo: 'colchon' });
  return { C: j + 1, deficitFwd: F.length - uIdx, deficitBwd: bIdx + 1 };
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
// v6.05 (24-oct, verificación adversarial): horas de una fila PARTIDA = la fracción de unidad que cabe: ¼ en la inducción (1,3125 h) · ½ en el
//   resto de F4 (2,625 h) — también refuerzo / uw_random / incorrectas / consolidación (antes 2,625 h en la inducción); uw_random e incorrectas
//   en la inducción 1×20Q (antes 1×40Q en 79′). Las referencias v6.00-v6.04 no cambian (en su inducción solo hay reactivación).
const hParte = (s) => (s <= ADAPT_FIN ? 1.3125 : 2.625);
const out = frozen.map((x) => ({ ...x }));
let n = out.length; let rot = frozen.filter((x) => x.fase === 'F3' && /16:15 REENTRADA/.test(x.franjaNota || '')).length;
// v6.06 (fix) · ROTACIÓN REAL de la 16:15: fecha de ALTA de cada sistema ('' = F1 lo estudia · 'AAAA-MM-DD' = su última fila T de
//   contenido de F1 → entra el día siguiente · ausente = sin alta) y puntero sobre sistemaRot que salta los que aún no tienen alta
const ROT_FIJA = has('--rotacion-9');
const ALTA_ROT = {};
if (ROT_FIJA) sistemaRot.forEach((x) => { ALTA_ROT[x] = ''; });
else {
  const pend = new Set(PEND_F1.filter((d) => d <= F1FILAS));
  SLOT_F1.forEach((dv, i) => { if (!esHitoV520(dv) && !pend.has(i + 1) && sistemaRot.includes(byD[dv].system)) ALTA_ROT[byD[dv].system] = ''; });
  const altaTras = (sis, fecha) => { if (!sistemaRot.includes(sis) || ALTA_ROT[sis] === '') return; if (!(sis in ALTA_ROT) || fecha > ALTA_ROT[sis]) ALTA_ROT[sis] = fecha; };
  for (const x of frozen) if (x.tipo === 'contenido' && ('dF1' in x || DESPL.includes(x.dOrig))) altaTras(x.system, x.fecha);
  for (const s of PLAN) { const o = filas.get(s); if (o.tipo === 'contenido' && (o.dF1 || o.desdeF1)) altaTras(byD[o.dF1 ? SLOT_F1[o.dF1 - 1] : o.dOrig].system, s); }
}
const N_SIS_F1 = sistemaRot.filter((x) => ALTA_ROT[x] === '').length;
let ptr = 0;
if (!ROT_FIJA) {
  const ult = frozen.filter((x) => x.fase === 'F3' && /16:15 REENTRADA: 20Q timed de .+? \+ revisión/.test(x.franjaNota || '')).pop();
  if (ult) ptr = (sistemaRot.indexOf(/16:15 REENTRADA: 20Q timed de (.+?) \+ revisión/.exec(ult.franjaNota)[1]) + 1) % sistemaRot.length;
}
function rotacion16(s) {
  if (ROT_FIJA) return sistemaRot[rot++ % 9];
  let saltos = 0;
  while (!(sistemaRot[ptr] in ALTA_ROT) || !(ALTA_ROT[sistemaRot[ptr]] === '' || s > ALTA_ROT[sistemaRot[ptr]])) {
    ptr = (ptr + 1) % sistemaRot.length;
    if (++saltos > sistemaRot.length) throw new Error(`16:15 REENTRADA del ${s}: ningún sistema de la rotación estudiado todavía (F1 sin temario)`);
  }
  const elegido = sistemaRot[ptr]; ptr = (ptr + 1) % sistemaRot.length;
  return elegido;
}
for (const s of PLAN) {
  const o = filas.get(s); n++;
  const fila = { t: n, d: 100 + n, fecha: s, fase: esF4(s) ? 'F4' : 'F3', tipo: o.tipo, dOrig: typeof o.dOrig === 'number' ? o.dOrig : null, parte: o.parte || null };
  if (o.uid) fila.uid = o.uid;
  const v = o.dOrig && typeof o.dOrig === 'number' ? byD[o.dOrig] : null;
  const F4row = esF4(s);
  const postFree = FREE120 && s > FREE120;
  switch (o.tipo) {
    case 'reentrada': Object.assign(fila, DEF.reentrada, { uw: DEF.reentrada.uw.replace('(9 sistemas F1)', `(${N_SIS_F1} sistemas F1)`), sub: `REENTRADA tras la pausa ENCAPS: 2×20Q timed MEZCLADAS de los ${N_SIS_F1} sistemas de F1 (AMBOSS + incorrectas uWorld) + revisión completa + Anki de choque (FSRS vuelve a 0,90 hoy)`, qDia: 40, nivelUW: 4, h: 5.5 }); break;
    case 'hito': {
      const q = /UWSA/.test(o.nombre) ? 160 : /Free 120 \+ 4/.test(o.nombre) ? 280 : /Free 120/.test(o.nombre) ? 120 : /\+ 3 bloques/.test(o.nombre) ? 320 : 200;
      const hora = !F4row ? '07:00-12:30' : q >= 280 ? '07:00-16:30' : q === 200 ? '07:00-12:15' : q === 160 ? '07:00-11:15' : '07:00-10:15';
      const extra = (/\+ 3 bloques/.test(o.nombre) ? ' · + 3 bloques random = ENSAYO 7 bloques' : /\+ 4 bloques/.test(o.nombre) ? ' · + 4 bloques random = ENSAYO 7 bloques' : '')
        + (F4row ? (q >= 280 ? ' · SOLO en feriado/día sin turno (si hay turno: el NBME en un día T y los bloques random en el siguiente día T de la ventana)' : ' · día con turno TARDE o feriado sin turno') + ` · ventana ${f(o.ventana[0])}→${f(o.ventana[1])}` : '')
        + (o.dOrig === 65 ? ' · NUEVA LÍNEA BASE tras la pausa (≥ NBME 28 − 5; caída >8 → +2 semanas de reactivación pagadas con colchón)' : '')
        + (NOTA_V6[o.dOrig] ? ' · ' + NOTA_V6[o.dOrig] : '');
      if (v) { CAMPOS_V520.forEach((k) => { fila[k] = v[k]; }); fila.sub = v.sub.replace(/\(([^()]*?)\d{2}:\d{2}-\d{2}:\d{2}\)/, (m, pre) => `(${pre}${hora})`) + extra; fila.subV520 = v.sub; }
      else Object.assign(fila, DEF.hitoUWSA3, { sub: `🎯 ${o.nombre} (${hora})` + extra });
      Object.assign(fila, { forma: o.forma, nombre: o.nombre, qDia: q, nivelUW: 5, h: q >= 280 ? 8.5 : q === 200 ? 5.25 : q === 160 ? 4.25 : 3.2, ventana: o.ventana });
      break;
    }
    case 'day_after': Object.assign(fila, DEF.day_after, { sub: `DAY-AFTER del ${o.de} (Palmerton §9.2): trayectoria + auditoría de honestidad + triaje de errores + drill de cronología (10 PC cards) + lectura por sistema — en bloque A + B`, qDia: 0, nivelUW: 5, h: F4row ? 2.625 : 5.5 }); break;
    case 'contenido': {
      if (o.dF1) { const w1 = byD[SLOT_F1[o.dF1 - 1]]; CAMPOS_V520.forEach((k) => { fila[k] = w1[k]; }); Object.assign(fila, { dF1: o.dF1, sub: `RECUPERACIÓN F1 (D${o.dF1} no hecho) · ` + (o.parte ? `parte ${o.parte} · ` : '') + w1.sub, qDia: o.parte ? 20 : 40, nivelUW: 2, h: o.parte ? (s <= ADAPT_FIN ? 1.3125 : 2.625) : 5.5 }); break; }
      const pos = (o.desdeF1 ? DESPL : CONT).filter((x) => byD[x].system === v.system).indexOf(o.dOrig) + 1;
      const viernes = wd(s) === 5;
      let nivel = pos <= 2 ? 1 : viernes ? 4 : 2; let q = pos <= 2 ? 30 : 40;
      const preF1 = o.desdeF1 ? `DE F1 → TRAMO 2 (no cupo en F1 antes de la pausa ENCAPS; ${ETQ_DESPL(o)}) · ` : '';
      if (o.parte) { // F4: contenido partido
        const [k4, n4] = o.parte.split('/').map(Number);
        if (n4 === 4) { // v6.05 · inducción (¼ de unidad por fila): partes 1-2 = la mitad «PARTE 1» (pre-test + deep prime), 3-4 = la «PARTE 2» (consolidación)
          fila.sub = preF1 + (k4 === 1 ? 'PARTE 1/4 · PRE-TEST 10Q tutor + DEEP PRIME 1.ª mitad (vídeo + First Aid) · ' : k4 === 2 ? 'PARTE 2/4 · DEEP PRIME 2.ª mitad (vídeo + First Aid) + Anki de mecanismo · ' : `PARTE ${k4}/4 · CONSOLIDACIÓN 20Q timed del subtema + Anki de mecanismo · `) + v.sub;
          q = k4 === 1 ? 10 : k4 === 2 ? 0 : 20; nivel = k4 <= 2 ? 1 : nivel;
        } else {
          const p1 = o.parte.startsWith('1');
          fila.sub = preF1 + (p1 ? 'PARTE 1 · PRE-TEST 10Q tutor + DEEP PRIME (vídeo + First Aid) · ' : 'PARTE 2 · CONSOLIDACIÓN 20Q timed del subtema + Anki de mecanismo · ') + v.sub;
          q = p1 ? 10 : 20; nivel = p1 ? 1 : nivel;
        }
      } else fila.sub = preF1 + v.sub;
      CAMPOS_V520.forEach((k) => { fila[k] = v[k]; });
      Object.assign(fila, { qDia: q, nivelUW: nivel, h: o.parte ? (s <= ADAPT_FIN ? 1.3125 : 2.625) : 5.5 });
      if (nivel === 4 && !o.parte) fila.franjaNota = 'VIERNES NIVEL 4: 11:00 = 20-30Q timed MIXTOS de los sistemas ya dominados + 10Q tutor del subtema';
      break;
    }
    case 'refuerzo': Object.assign(fila, DEF.refuerzo, { system: o.system, uw: o.uw, mat: o.mat, sub: o.sub + (o.parte ? ` · parte ${o.parte}` : ''), qDia: o.parte ? 20 : 40, nivelUW: 2, h: o.parte ? hParte(s) : 5.5 }); break;
    case 'reactivacion': Object.assign(fila, DEF.reactivacion, { system: o.sistema, sub: `REACTIVACIÓN ${o.sistema} (${o.k}/${o.n}): bloques timed del sistema (incorrectas/flagged uWorld + AMBOSS) + revisión + relectura FA/Pathoma de los subtemas <70 % + Anki de fallos` + (o.parte ? ` · parte ${o.parte}` : ''), qDia: o.parte ? 20 : 40, nivelUW: 3, h: o.parte ? (s <= ADAPT_FIN ? 1.3125 : 2.625) : 5.5 }); break;
    case 'uw_random': Object.assign(fila, DEF.uw_random, { sub: (v ? v.sub : 'UWorld FRESCO random timed 2×40Q + revisión profunda') + (o.parte ? ` · parte ${o.parte} (1×${s <= ADAPT_FIN ? 20 : 40}Q + revisión)` : ''), qDia: o.parte ? (s <= ADAPT_FIN ? 20 : 40) : 80, nivelUW: 4, h: o.parte ? hParte(s) : 5.5 }); if (v) CAMPOS_V520.forEach((k) => { fila[k] = v[k]; }); break;
    case 'incorrectas': Object.assign(fila, DEF.incorrectas, { sub: (v ? v.sub : '2.ª PASADA de incorrectas UWorld (bloques de 40Q timed rápidos) + sistema débil del último NBME') + (o.parte ? ` · parte ${o.parte}` : ''), qDia: o.parte ? (s <= ADAPT_FIN ? 20 : 40) : 80, nivelUW: 5, h: o.parte ? hParte(s) : 5.5 }); if (v) CAMPOS_V520.forEach((k) => { fila[k] = v[k]; }); break;
    case 'consolidacion': {
      const txt = v ? v.sub : o.nuevo === 'pathoma' ? 'CONSOLIDACIÓN · Pathoma cap. 1-3 (lesión, inflamación, neoplasia) rapid review + Anki maduro' : o.nuevo === 'fa15' ? 'CONSOLIDACIÓN · First Aid rapid review sistemas 1-5 + Anki maduro + 20Q flagged' : 'CONSOLIDACIÓN · First Aid rapid review sistemas 11-14 + bioestadística/ética + 20Q flagged';
      Object.assign(fila, DEF.consolidacion, { sub: txt + (o.parte ? ` · parte ${o.parte}` : ''), qDia: o.parte ? 20 : 40, nivelUW: 5, h: o.parte ? hParte(s) : 5.5 }); if (v) CAMPOS_V520.forEach((k) => { fila[k] = v[k]; }); break;
    }
    case 'taper': Object.assign(fila, DEF.taper, { sub: v ? v.sub : 'TAPER: 20Q flagged/incorrectas ya vistas + Anki MADURO + First Aid de esquemas (≤2 h, solo bloque A)', qDia: 20, nivelUW: 5, h: o.dOrig === 95 ? 1 : 2, franjaNota: o.dOrig === 94 ? 'TAPER · ÚLTIMA SESIÓN DE BANCO' : o.dOrig === 95 ? 'TAPER · sesión MÍNIMA (≤1 h) · nada nuevo · empacar mañana' : 'TAPER · cero preguntas nuevas, cero tarjetas nuevas' }); if (v) CAMPOS_V520.forEach((k) => { fila[k] = v[k]; }); break;
    case 'ritual': Object.assign(fila, DEF.ritual, { sub: 'SIN ESTUDIO · ritual de test-day: permiso impreso + digital, 2 ID idénticas al permiso, bolsas Ziploc por break, ruta y pasaje a Lima, dormir ≥7 h (DÍA PROTEGIDO para todos los planes)', qDia: 0, nivelUW: 5, h: 0 }); break;
    case 'colchon': Object.assign(fila, DEF.colchon, postFree
      ? { sub: 'COLCHÓN (cierre, post-Free 120): si hay una fila atrasada → hazla hoy; si no → SOLO incorrectas/flagged ya vistas + Anki maduro (0 preguntas nuevas)', qDia: 20, nivelUW: 5, h: F4row ? 2.625 : 5.5 }
      : { sub: 'COLCHÓN: si hay una fila atrasada → hazla hoy (regla anti-replan); si no → sistema más débil del último NBME: 40Q timed (incorrectas/flagged uWorld + AMBOSS) + revisión + Anki de fallos', qDia: 40, nivelUW: 4, h: F4row ? (s <= ADAPT_FIN ? 1.3125 : 2.625) : 5.5 }); break;
  }
  if (!F4row && o.tipo !== 'hito' && o.tipo !== 'reentrada') { fila.franjaNota = (fila.franjaNota ? fila.franjaNota + ' · ' : '') + `16:15 REENTRADA: 20Q timed de ${rotacion16(s)} + revisión`; }
  if (v) fila.subV520 = v.sub; // texto v5.20 exacto (verificación V1 del multiset)
  if (o.pendiente) fila.pendiente = true;
  // turno T: bloque B 07:40-10:10 = +40Q (AMBOSS / incorrectas, no uWorld fresco) · nunca en anclas ni tras el Free 120 (cierre)
  if (F4row && !['hito', 'day_after', 'taper', 'ritual'].includes(o.tipo) && !postFree) fila.qDiaT = fila.qDia + 40;
  if (s === GONOGO) fila.gate = CONG && E_PREV !== E ? 'GO/NO-GO #2 (E-49)' : 'GO/NO-GO (E-49)';
  if (F4row && s <= ADAPT_FIN) fila.adapt = true;
  out.push(fila);
}
// faseUW: A hasta el primer uw_random · B hasta la primera consolidacion/taper · C después (filas congeladas conservan la suya)
{ const iB = out.findIndex((x) => x.tipo === 'uw_random'); const iC = out.findIndex((x) => x.tipo === 'consolidacion' || x.tipo === 'taper');
  out.forEach((x, k) => { if (k < frozen.length) return; x.faseUW = (iB < 0 || k < iB) ? 'A' : (iC < 0 || k < iC) ? 'B' : 'C'; }); }
// ── resumen ──
const cnt = {}; out.forEach((x) => cnt[x.tipo] = (cnt[x.tipo] || 0) + 1);
const horas = out.reduce((a, x) => a + (x.h || 0), 0);
console.log(`TRAMO 2 · ENCAPS ${fy(ENCAPS)} → reinicio ${fy(R)} · SERUMS ${fy(S)} · examen ${fy(E)} · GO/NO-GO ${f(GONOGO)}${CONG ? ` · CONGELADO ≤ ${f(CONG)} (${frozen.length} filas)${E_PREV !== E ? ' · cola NO-GO ' + claveNogo : ''}` : ''}`);
console.log(`filas ${out.length} (F3 ${out.filter((x) => x.fase === 'F3').length} · F4 ${out.filter((x) => x.fase === 'F4').length}) · d ${out[0].d}-${out.at(-1).d} · tipos ${JSON.stringify(cnt)}`);
console.log(`déficit cola-adelante ${deficitFwd} u · déficit cola-atrás ${deficitBwd} u · horas-plan (piso) ${horas.toFixed(0)} · colchón ${cnt.colchon || 0} filas ≈ ${out.filter((x) => x.tipo === 'colchon').reduce((a, x) => a + x.h, 0).toFixed(0)} h`);
// multiset dOrig
const esperados = [...DESPL, ...CONT, 65, 72, 77, 82, 83, 85, 87, 84, 86, 88, 89, 90, 91, 92, 93, 94, 95];
const dSet = new Set(out.filter((x) => x.dOrig && typeof x.dOrig === 'number').map((x) => x.dOrig));
const faltan = esperados.filter((d) => !dSet.has(d));
console.log('dOrig cubiertos', dSet.size, '/ esperados', esperados.length, faltan.length ? 'FALTAN ' + faltan.join(',') : DESPL.length ? `✓ (incl. ${DESPL.map((d) => 'D' + d).join(', ')} desplazada(s) de F1: caben ${F1FILAS} filas de temario en F1)` : '✓ (+ D79 en F1 D58)');
// preguntas planificadas por fuente (§B3 · presupuesto uWorld)
const qT = (pred) => out.filter(pred).reduce((a, x) => a + (x.qDia || 0), 0);
console.log(`preguntas (piso): contenido ${qT((x) => x.tipo === 'contenido')} · refuerzo ${qT((x) => x.tipo === 'refuerzo')} · reactivación ${qT((x) => x.tipo === 'reactivacion')} · uw_random ${qT((x) => x.tipo === 'uw_random')} · incorrectas ${qT((x) => x.tipo === 'incorrectas')} · colchón ${qT((x) => x.tipo === 'colchon')} → uWorld FRESCO = contenido + refuerzo + uw_random = ${qT((x) => ['contenido', 'refuerzo', 'uw_random'].includes(x.tipo))}`);
if (opt('--json')) fs.writeFileSync(opt('--json'), JSON.stringify(out, null, 1));
if (opt('--md')) {
  const L = out.map((x) => `| T${x.t} | ${x.d} | ${f(x.fecha)} | ${x.fase} | ${x.tipo}${x.parte ? ' ' + x.parte : ''} | ${x.dOrig ? 'D' + x.dOrig : x.tipo === 'hito' ? 'nuevo' : '—'} | ${x.qDia}${x.qDiaT ? '/' + x.qDiaT : ''} | ${x.nivelUW} | ${x.faseUW} | ${(x.sub || '').replace(/\|/g, '/').slice(0, 78)}${x.gate ? ' · **' + x.gate + '**' : ''}${x.ventana ? ` · ventana ${f(x.ventana[0])}→${f(x.ventana[1])}` : ''} |`);
  fs.writeFileSync(opt('--md'), '| T | d | fecha | fase | tipo | dOrig | qDia (M/T) | nivelUW | faseUW | contenido |\n|---|---|---|---|---|---|---|---|---|---|\n' + L.join('\n') + '\n');
}
if ((deficitFwd || deficitBwd) && !has('--permitir-deficit')) { console.error(`DÉFICIT ${deficitFwd + deficitBwd} u: fecha NO viable (R1: no se recorta) → siguiente fecha de la ventana`); process.exit(2); }
module.exports = { out };
