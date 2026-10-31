/**
 * verificar_v6.js — verificaciones del Lote 1A (V6_ESPEC §H) sobre el usmleStep1Daily.ts GENERADO (cargado con cargar_ts.js, es decir,
 * las funciones y arrays REALES del .ts) y sobre los generadores.
 *   node verificar_v6.js [--out dias_t2.json] [--sin-matriz]
 *     --out         dónde exportar DIAS_T2 a JSON para V1 (por defecto, el directorio temporal del sistema)
 *     --sin-matriz  no compara el port con la referencia en los escenarios de §B3 (más rápido)
 *     --regen <dir> además compara el port con las salidas guardadas por la espec (v600/espec/regen/*.json)
 * Comprueba:
 *   V1   node ref_v6/v1_check.js <DIAS_T2 exportado> → exit 0 (multiset de contenido v5.20 = 0 · sub ⊇ subV520 · 8 campos DiaUSMLE)
 *   V2   DIAS_T2 = salida de ref_v6/gen_tramo2_ref.js con el MISMO escenario (incl. --f1-filas) y, en el escenario base, = la
 *        referencia guardada (v6.01: tramo2_14mar_27sep_v601.json · v6.00: tramo2_14mar_27sep.json) en TODAS las claves (las dos direcciones)
 *   V2+  matriz port (gen_tramo2.js) vs referencia en los escenarios de §B3 + las pruebas de congelado/NO-GO/pendientes de espec/regen
 *        (misma salida y mismo código de salida: déficit = exit 2 en los dos)
 *   V2b  uWorld FRESCO planificado ≤ 3.659 y ninguna fila de reactivación/colchón/reentrada declara uWorld fresco
 *   V3   fechas USMLE fuera de SKIP_V6 y de protegidos (salvo el ritual) · sábados solo ≥ serums.inicio · 0 domingos · D1 = f1.inicio ·
 *        conjunto de fechas = esDiaPlan(iso, 'usmle') de fechasV6.ts
 *   F1   v6.01: cada fila de F1 = el contenido v5.20 de su posición en el orden D1-D57 · D79 · C1 · C2 (sub igual salvo la hora de
 *        D10/D25/D40/D55) con fecha = hábil de F1 de su posición y nivelUW/qDia/franjaNota = la regla de gen_usmle_v5.js re-derivada aquí;
 *        lo que no cabe: C1/C2 consumidos y el temario (D79) en el tramo 2 con dOrig (T3, N1 · 30Q) · hitos F1 en su D# con su hora
 *   API  faseDe / esViernesNivel4 / esDiaTaper / esDiaRitual / semanaDe / diaDe / diaAnterior / diaPrevio / ventana7d / hitosDelPlan /
 *        DAILY_META / USMLE_TAPER / FRANJAS / FRANJAS_F4 · obsidianMap y diaInicio apuntan a d existentes · 0 textos de la v5.20
 * v6.00 (6-oct-2026): nuevo. Sale con exit 1 si algo falla.
 * v6.01 (10-oct-2026): corrimiento D1 mié 7-oct → lun 12-oct (F1 = 57 hábiles: D1-D57; C1/C2 consumidos; v5.20 D79 desplazada al tramo 2).
 *   V2 pasa --f1-filas (escenario.f1Filas) a la referencia y el escenario base se compara con tramo2_14mar_27sep_v601.json · V2+ corre la
 *   matriz con --f1-filas del JSON y, aparte, la COMPATIBILIDAD v6.00 (--f1-filas 58 = tramo2_14mar_27sep.json, y las salidas guardadas
 *   de la espec con --regen) · F1 = contenido v5.20 con las fechas NUEVAS y la regla de niveles · ESPERADO de DAILY_META v6.01 ·
 *   API con los rangos reales (D1-D57) · textos: 0 restos de la v6.00 de F1 («mié 7-oct», «D1-D60», «D59-D60»…) fuera de bitácora.
 * v6.02 (17-oct-2026): corrimiento D1 lun 12-oct → lun 19-oct (F1 = 52 hábiles) con HITOS ANCLADOS (gen_tramo2.colocarF1): F1 = v5.20
 *   D1-D51 + D55 (NBME 28 en el slot 52, mié 30-dic) y van al tramo 2 D52, D53, D54, D56, D57, D79 (T3-T8). V2 base =
 *   tramo2_14mar_27sep_v602.json (la referencia base se elige por --f1-filas: 58 → v6.00 · 57 → v6.01 · 52 → v6.02) · V2+ = matriz con
 *   --f1-filas 52 + COMPATIBILIDAD v6.00 (58) y v6.01 (57, base = tramo2_14mar_27sep_v601.json) · F1: el contenido de cada d = el de su
 *   origen en la colocación (escenario.origenF1 = colocarF1), hitos de F1 TODOS en F1 (en su D# o en los últimos slots), desplazadas con
 *   su nivel por la regla (posición entre las desplazadas del sistema; viernes N4) · estadoUSMLE con fechas derivadas de F1 · ESPERADO v6.02
 *   · textos: 0 restos de la F1 v6.00 NI de la v6.01 («lun 12-oct», D1-D57, Día n/57, hitos/gates/deload v6.01) fuera de bitácora.
 * v6.02 (17-oct): control nuevo «F1 · etiqueta de las desplazadas»: con hitos anclados el sub empieza por «DE F1 → TRAMO 2 (…; era v5.20
 *   D#) · » (antes «era la fila 52…58 de F1», ambiguo); sin hitos re-ubicados, la etiqueta vieja (las referencias v6.00/v6.01 de la matriz
 *   de compatibilidad siguen saliendo byte a byte con ella).
 * v6.03 (20-oct-2026): corrimiento D1 lun 19-oct → mié 21-oct (F1 = 50 hábiles, misma regla de hitos anclados): F1 = v5.20 D1-D49 + D55
 *   (NBME 28 en el slot 50, mié 30-dic) y van al tramo 2 D50-D54, D56, D57, D79 (T3-T10). V2 base = tramo2_14mar_27sep_v603.json
 *   (--f1-filas 50) · V2+ = matriz con --f1-filas 50 (el caso «último d de F1 + uno fuera» se deriva de --f1-filas) + COMPATIBILIDAD
 *   v6.00 (58), v6.01 (57) y v6.02 (52, base = tramo2_14mar_27sep_v602.json, byte a byte desde gen_tramo2_ref.js --f1-filas 52; la
 *   colocación esperada de cada versión se declara aparte porque la v6.02 ya tenía un hito fuera de su D#) · hitos F1 v6.03 · estadoUSMLE
 *   con el lun 19 y el mar 20 (perdidos) → D1 mié 21 no exacta · ESPERADO v6.03 · textos: 0 restos de la F1 v6.02 («lun 19-oct», D1-D52,
 *   Día n/52, NBME 28 = D52, hitos en viernes vie 30-oct / vie 20-nov / vie 11-dic, gates mié 11-nov / mié 9-dic, deload lun 23-nov,
 *   colchón «28 filas ≈ 73,5 h») en los ficheros USMLE de src/lib (los de otros ámbitos —homeBriefing, componentes— solo AVISAN, ⚠).
 * v6.04 (21-oct-2026): EXAMEN Step 1 lun 27-sep → lun 25-oct-2027 (decisión de Joseph; F1 sin cambio). La referencia del escenario base se
 *   elige por (--f1-filas, examen): 50|2027-10-25 → tramo2_14mar_25oct_v604.json (= gen_tramo2_ref.js 2027-03-14 2027-10-25 --f1-filas 50) ·
 *   la matriz usa el examen base vigente (EX) en los escenarios que congelan sobre la base y conserva 14-mar → 27-sep como escenario más ·
 *   el NO-GO 27-sep → 25-oct congela sobre la base 27-sep de las mismas filas de F1 (v6.03) · COMPATIBILIDAD v6.03 (--f1-filas 50, examen
 *   27-sep, base = tramo2_14mar_27sep_v603.json) · ESPERADO / USMLE_TAPER / estadoUSMLE v6.04 · textos v6.04: 0 restos del examen v6.03
 *   (examen 27-sep, GO/NO-GO 9-ago, ritual sáb 25-sep, viaje dom 26-sep, T158, colchón 24 filas ≈ 63 h, ventana 31-ago → 27-sep).
 * v6.05b (24-oct-2026, verificación adversarial): + «F4 · inducción» (filas partidas a 1,3125 h en la inducción / 2,625 h en el resto de F4,
 *   unidad = 5,25 h, contenido en 4 = 2 de pre-test + deep prime + 2 de consolidación) · + «guía USMLE» sobre src/lib/usmleGuia.ts: la cola
 *   de vídeo al cierre de F1 tiene que verse entera en pasos de fechas del tramo 2 (FALLA si la cola no está vacía y ninguna fila la
 *   referencia), colaAlCierreTramo2 = [], cada desplazada de F1 con su guía en su fecha T (7 franjas de F3, Σ pasos = franja), 0 fechas huérfanas.
 * v6.05 (24-oct-2026): corrimiento D1 mié 21-oct → lun 26-oct (la semana del 19 sin estudio; examen lun 25-oct-2027 sin cambio). F1 = 47 hábiles
 *   con la misma regla de hitos anclados: F1 = v5.20 D1-D46 + D55 (NBME 28 en el slot 47, mié 30-dic) y van al tramo 2 D47-D54, D56, D57, D79
 *   (T3-T13). V2 base = tramo2_14mar_25oct_v605.json (47|2027-10-25 = gen_tramo2_ref.js 2027-03-14 2027-10-25 --f1-filas 47) · V2+ = matriz con
 *   --f1-filas 47 (el previo del NO-GO 27-sep → 25-oct, si no hay referencia 27-sep guardada con esas filas de F1, se genera con la referencia
 *   en el temporal) + COMPATIBILIDAD v6.04 (--f1-filas 50, examen 25-oct, base = tramo2_14mar_25oct_v604.json byte a byte; sus escenarios usan
 *   el examen de su versión y su NO-GO congela sobre la base v6.03) · hitos F1 v6.05 · estadoUSMLE con el 21-25 oct (sin sesión) → D1 lun 26
 *   no exacta · ESPERADO v6.05 · textos v6.05: 0 restos de la F1 v6.03/v6.04 (D1 mié 21-oct, UWSA1/D2 jue 22-oct, D1-D50, Día n/50, NBME 28 =
 *   D50, NBME 25-27 en martes mar 3-nov / mar 24-nov / mar 15-dic, gates vie 13-nov / vie 11-dic, colchón «48 filas ≈ 126 h», T3-T10, «S n/43»)
 *   en los ficheros USMLE de src/lib (los de otros ámbitos solo AVISAN, ⚠).
 * v6.06 (31-oct-2026): corrimiento D1 lun 26-oct → lun 2-nov (la semana del 26-oct sin estudio; examen lun 25-oct-2027 sin cambio). F1 = 42
 *   hábiles con la regla de hitos anclados + REGLA NUEVA del DAY-AFTER COMPLETO (gen_tramo2.slotsHitosF1): el NBME 27 (v5.20 D40) se adelanta
 *   una semana de plan, slot 40 → 35 (vie 18-dic), porque su Day-After (4 filas) chocaba con el NBME 28 del slot 42. F1 = v5.20 D1-D34 ·
 *   NBME 27 · D35-D39 · D41 · NBME 28 y van al tramo 2 D42-D54, D56, D57, D79 (16, T3-T18). V2 base = tramo2_14mar_25oct_v606.json
 *   (42|2027-10-25 = gen_tramo2_ref.js 2027-03-14 2027-10-25 --f1-filas 42) · V2+ = matriz con --f1-filas 42 + COMPATIBILIDAD v6.05 (47, examen
 *   25-oct, base = tramo2_14mar_25oct_v605.json byte a byte; su NO-GO congela sobre la base 27-sep con 47 filas, generada con la referencia) ·
 *   control NUEVO «F1 · Day-After completo» (re-deriva la regla: base min(D#, N − (H − 1 − k)), adelantos de 5 filas, ningún Day-After pisa
 *   el hito siguiente, y el hito no se adelanta más de lo necesario) · hitos F1 v6.06 · estadoUSMLE con el 26-oct → 1-nov (sin sesión) → D1
 *   lun 2-nov no exacta · ESPERADO v6.06 · textos v6.06: 0 restos de la F1 v6.05 (D1 lun 26-oct, D1-D47, Día n/47, NBME 28 = D47, NBME 25
 *   vie 6-nov, NBME 26 vie 27-nov, NBME 27 = D40, gates mié 18-nov / mié 16-dic, colchón «42 filas ≈ 110 h», T3-T13, d 103-113, «S n/42»)
 *   en los ficheros USMLE de src/lib (los de otros ámbitos solo AVISAN, ⚠). Ojo: la v6.06 vuelve a usar fechas de hitos de versiones
 *   anteriores (vie 13-nov = NBME 25 · vie 4-dic = NBME 26, como NBME 26/27 de la v6.01): hoy solo aparecen en bitácora o calculadas en
 *   tiempo de ejecución; si un texto USMLE las escribe a mano fuera de bitácora, «textos v6.02» lo marcará (escribirlas con hitoTxt/fF1).
 * v6.06 (fix, 31-oct-2026): control NUEVO «F3 · 16:15 REENTRADA» (la 16:15 no rota a un sistema aún no estudiado: F1 + cada desplazado tras
 *   su última fila T; orden de la familia SISTEMAS_ROT_16; T1 con el nº real de sistemas de F1) — re-derivado de las filas. Las
 *   COMPATIBILIDADES v6.03 / v6.04 / v6.05 (sin Heme/Onco en F1, rotación fija de 9) corren con --rotacion-9 (rot9: escenarios, refArgs y
 *   previo del NO-GO) y siguen saliendo byte a byte; v6.00-v6.02 sin él. V2 base = tramo2_14mar_25oct_v606.json regenerada (T1 + T8-T32).
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const V6 = require('../gen_fechas_v6');
const { ROOT, cargarUsmleDaily, cargarFechasV6TS, cargarModuloTS } = require('./cargar_ts');
const { ORIGEN_F1_TEMARIO, F1_FILAS_V600, colocarF1, DAY_AFTER_FILAS, SEMANA_PLAN, SISTEMAS_ROT_16, RX_ROT_16 } = require('./gen_tramo2');

const argv = process.argv.slice(2);
const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
const REF = path.join(__dirname, 'ref_v6');
const fallos = [];
const ok = (cond, que, detalle = '') => { console.log(`${cond ? '✓' : '✗'} ${que}${detalle ? ' · ' + detalle : ''}`); if (!cond) fallos.push(que); return cond; };
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const normSub = (s) => s.replace(/\d{2}:\d{2}-\d{2}:\d{2}/g, '');

const F = V6.cargarFechasV6();
const U = cargarUsmleDaily();
const FV = cargarFechasV6TS();
const { DIAS, DIAS_T2, DIAS_TODOS } = U;
const J = JSON.parse(fs.readFileSync(path.join(__dirname, 'usmle_dias_v6.json'), 'utf8'));
const V520 = JSON.parse(fs.readFileSync(path.join(REF, 'dias_v520.json'), 'utf8'));
const byD = Object.fromEntries(V520.map((x) => [x.d, x]));
const ESC = J.escenario;
const F1F = ESC.f1Filas != null ? ESC.f1Filas : F1_FILAS_V600; // v6.01: filas de temario de F1 (57 · v6.02: 52 · v6.03/v6.04: 50 · v6.05: 47 · v6.06: 42) → --f1-filas de la referencia
const DESPL = ESC.desplazadasF1 || [];
// referencia guardada del escenario base por (nº de filas de temario de F1 | examen) (v6.00 58 · v6.01 57 · v6.02 52 · v6.03 50 con examen
// 27-sep · v6.04: 50 con examen 25-oct · v6.05: 47 con examen 25-oct · v6.06: 42 con examen 25-oct)
const REFS_BASE = { '58|2027-09-27': 'tramo2_14mar_27sep.json', '57|2027-09-27': 'tramo2_14mar_27sep_v601.json', '52|2027-09-27': 'tramo2_14mar_27sep_v602.json',
  '50|2027-09-27': 'tramo2_14mar_27sep_v603.json', '50|2027-10-25': 'tramo2_14mar_25oct_v604.json', '47|2027-10-25': 'tramo2_14mar_25oct_v605.json',
  '42|2027-10-25': 'tramo2_14mar_25oct_v606.json' };
const REF_BASE = REFS_BASE[`${F1F}|${ESC.examen}`] || null;
const EX = ESC.examen; // v6.04: examen del escenario base vigente (25-oct; v6.00-v6.03: 27-sep)
const REF_BASE_27SEP = REFS_BASE[`${F1F}|2027-09-27`] || null; // base 27-sep con las mismas filas de F1 (previo del NO-GO 27-sep → 25-oct)
const COLOC = colocarF1(DIAS.length, byD); // v6.02: colocación de F1 (hitos anclados) = la que usó gen_usmle_v5.js
console.log(`USMLE ${U.DAILY_META.version} · DIAS ${DIAS.length} · DIAS_T2 ${DIAS_T2.length} · escenario ENCAPS ${ESC.encaps} · examen ${ESC.examen} · SERUMS ${ESC.serums}${ESC.congelarHasta ? ' · congelado ≤ ' + ESC.congelarHasta : ''}`);
ok(eq(DIAS, J.DIAS) && eq(DIAS_T2, J.DIAS_T2), 'el .ts contiene exactamente la salida de gen_usmle_v5.js (usmle_dias_v6.json)');

// ── V1 ──
{
  const out = path.resolve(opt('--out') || path.join(os.tmpdir(), 'usmle_dias_t2_v6.json'));
  fs.writeFileSync(out, JSON.stringify(DIAS_T2, null, 1));
  const r = spawnSync(process.execPath, [path.join(REF, 'v1_check.js'), out], { cwd: REF, encoding: 'utf8' });
  ok(r.status === 0, 'V1 · node ref_v6/v1_check.js <DIAS_T2 exportado> → exit ' + r.status, (r.stdout || '').trim().split('\n').pop() + ' · ' + out);
}

// ── V2 ──
function difFilas(a, b) {
  const d = [];
  if (a.length !== b.length) d.push(`nº de filas ${a.length} ≠ ${b.length}`);
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    const ka = Object.keys(a[i]).sort(), kb = Object.keys(b[i]).sort();
    if (!eq(ka, kb)) d.push(`T${i + 1} claves ${ka.filter((k) => !kb.includes(k)).join(',')} | ${kb.filter((k) => !ka.includes(k)).join(',')}`);
    for (const k of new Set([...ka, ...kb])) if (!eq(a[i][k], b[i][k])) d.push(`T${i + 1}.${k}`);
  }
  return d;
}
function argsEscenario(e) {
  const a = [e.encaps, e.examen, e.serums];
  if (e.congelarHasta) a.push('--congelar-hasta', e.congelarHasta, '--previo', path.resolve(__dirname, e.previo), ...(e.examenPrevio ? ['--examen-previo', e.examenPrevio] : []));
  if (e.pendientes && e.pendientes.length) a.push('--pendientes', e.pendientes.join(','));
  if (e.pendientesF1 && e.pendientesF1.length) a.push('--pendientes-f1', e.pendientesF1.join(','));
  a.push('--f1-filas', String(e.f1Filas != null ? e.f1Filas : F1_FILAS_V600));
  const proteg = [...V6.ctxDe(F).adjudicacion.map((p) => p.fecha), ...(e.protegExtra || [])];
  if (proteg.length) a.push('--proteg', proteg.join(','));
  return a;
}
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'v6_t2_'));
function correr(script, args, tag) {
  const json = path.join(TMP, tag + '.json');
  const r = spawnSync(process.execPath, [script, ...args, '--json', json], { cwd: path.dirname(script), encoding: 'utf8' });
  return { status: r.status, out: fs.existsSync(json) ? JSON.parse(fs.readFileSync(json, 'utf8')) : null, stderr: r.stderr };
}
{
  if (ESC.congelarHasta && ESC.previo && !fs.existsSync(path.resolve(__dirname, ESC.previo))) console.log('⚠ V2: el --previo de la última corrida ya no existe; se compara solo con la regeneración actual');
  const ref = correr(path.join(REF, 'gen_tramo2_ref.js'), argsEscenario(ESC), 'v2_ref');
  const d = ref.out ? difFilas(DIAS_T2, ref.out) : ['la referencia no generó salida: ' + ref.stderr];
  ok(ref.status === 0 && d.length === 0, 'V2 · DIAS_T2 = ref_v6/gen_tramo2_ref.js con el mismo escenario, en todas las claves', d.length ? d.slice(0, 8).join(' · ') : `${DIAS_T2.length} filas · 0 diferencias`);
  // escenario base = sin congelado, sin recuperaciones F1 (v6.02: pendientesF1 = solo recuperaciones; un d > f1Filas se ignora), sin protegidos extra, fechas base
  const base = !ESC.congelarHasta && ESC.pendientesF1.every((d) => d > F1F) && !ESC.protegExtra.length && ESC.encaps === '2027-03-14' && ESC.examen === F.step1.examen && ESC.serums === '2027-05-03';
  if (base && !REF_BASE) ok(false, `V2 · no hay referencia guardada para --f1-filas ${F1F} y examen ${ESC.examen} (REFS_BASE)`);
  else if (base) {
    const d2 = difFilas(DIAS_T2, JSON.parse(fs.readFileSync(path.join(REF, REF_BASE), 'utf8')));
    ok(d2.length === 0, `V2 · DIAS_T2 = ref_v6/${REF_BASE} (escenario base, --f1-filas ${F1F}, examen ${ESC.examen}) en todas las claves`, d2.length ? d2.slice(0, 8).join(' · ') : '0 diferencias');
  } else console.log('⚠ V2: escenario no base (congelado / recuperaciones F1 / protegidos extra): solo se compara con la regeneración de la referencia');
}

// ── V2+ · matriz port vs referencia (§B3 «Otros escenarios» + pruebas de regen) ──
if (!argv.includes('--sin-matriz')) {
  const base = path.join(REF, REF_BASE || 'tramo2_14mar_25oct_v606.json');
  const fEX = V6.f(EX).slice(4); // «25-oct» (v6.00-v6.03: «27-sep»)
  const F1A = ['--f1-filas', String(F1F)]; // v6.01: todos los escenarios con las filas de F1 vigentes (port y referencia)
  // v6.04: previo del NO-GO 27-sep → 25-oct = la base 27-sep con las MISMAS filas de F1 (v6.04: la referencia guardada v6.03) · v6.05: no hay
  //   referencia 27-sep guardada con 47 filas de F1 → se genera con la referencia (gen_tramo2_ref.js 2027-03-14 2027-09-27 --f1-filas 47)
  const base27 = REF_BASE_27SEP ? path.join(REF, REF_BASE_27SEP) : (correr(path.join(REF, 'gen_tramo2_ref.js'), ['2027-03-14', '2027-09-27', ...F1A], 'base27'), path.join(TMP, 'base27.json'));
  if (!fs.existsSync(base27)) ok(false, 'V2+ · no se pudo generar la base 27-sep (previo del NO-GO) con --f1-filas ' + F1F);
  const MATRIZ = [
    [`14-mar → ${fEX} (base)`, ['2027-03-14', EX]],
    ...(EX !== '2027-09-27' ? [['14-mar → 27-sep', ['2027-03-14', '2027-09-27']]] : []), // v6.04: la base de v6.00-v6.03, como escenario más
    ['14-mar → 31-ago', ['2027-03-14', '2027-08-31']],
    ['21-mar → 31-ago', ['2027-03-21', '2027-08-31']],
    ['21-mar → 27-sep', ['2027-03-21', '2027-09-27']],
    ['4-abr → 27-sep', ['2027-04-04', '2027-09-27']],
    ['11-abr → 27-sep', ['2027-04-11', '2027-09-27']],
    ['18-abr → 27-sep (déficit 3 u)', ['2027-04-18', '2027-09-27']],
    ['18-abr → 27-sep --permitir-deficit', ['2027-04-18', '2027-09-27', '--permitir-deficit']],
    ['18-abr → 25-oct', ['2027-04-18', '2027-10-25']],
    ['25-abr → 25-oct', ['2027-04-25', '2027-10-25']],
    ['25-abr → 27-sep (déficit 8 u)', ['2027-04-25', '2027-09-27']],
    [`SERUMS jue 6-may (14-mar → ${fEX})`, ['2027-03-14', EX, '2027-05-06']],
    ['--proteg 2027-05-10 (adjudicación)', ['2027-03-14', EX, '--proteg', '2027-05-10']],
    ['--pendientes-f1 17,58', ['2027-03-14', EX, '--pendientes-f1', '17,58']],
    ['--pendientes-f1 17,23 (recuperaciones + la desplazada)', ['2027-03-14', EX, '--pendientes-f1', '17,23']],
    // v6.03: derivado de --f1-filas (v6.02: 51,53 · v6.03: 49,51): el último d de temario de F1 (el d F1F es el NBME 28) + un d fuera de F1
    [`--pendientes-f1 ${F1F - 1},${F1F + 1} (último d de temario de F1 + un d fuera de F1, que se ignora)`, ['2027-03-14', EX, '--pendientes-f1', `${F1F - 1},${F1F + 1}`]],
    ['NO-GO base 27-sep → 25-oct (≤ 9-ago)', ['2027-03-14', '2027-10-25', '--congelar-hasta', '2027-08-09', '--previo', base27, '--examen-previo', '2027-09-27']],
    ['SERUMS 3 → 6-may con congelado ≤ 2-may', ['2027-03-14', EX, '2027-05-06', '--congelar-hasta', '2027-05-02', '--previo', base]],
    ['colchón agotado --pendientes UR84,C80 (≤ 11-ago)', ['2027-03-14', EX, '--congelar-hasta', '2027-08-11', '--previo', base, '--pendientes', 'UR84,C80']],
    // v6.06 (fix): congelado a MITAD de F3, en la fila de la desplazada central, con esa desplazada SIN ✓ → el puntero de la 16:15 sigue tras
    //   la última fila congelada y su sistema entra tras la fila repuesta (v6.06: ≤ jue 1-abr, --pendientes C50 → Nervous System entra en T15)
    ...((() => { const dm = DESPL[Math.floor(DESPL.length / 2)]; const x = dm != null && DIAS_T2.find((y) => y.dOrig === dm && y.fase === 'F3');
      return x ? [[`congelado ≤ ${V6.f(x.fecha).slice(4)} (mitad de F3) --pendientes C${dm}`, ['2027-03-14', EX, '--congelar-hasta', x.fecha, '--previo', base, '--pendientes', 'C' + dm]]] : []; })()),
  ];
  const REGEN = { // salidas guardadas en v600/espec/regen (se comparan con --regen <dir>) para los casos que la espec probó
    '14-mar → 31-ago': 't2_0831.json', '--pendientes-f1 17,58': 't2_f1.json', 'NO-GO base 27-sep → 25-oct (≤ 9-ago)': 't2_nogo_0927_1025.json',
    'SERUMS 3 → 6-may con congelado ≤ 2-may': 't2_serums0506.json', 'colchón agotado --pendientes UR84,C80 (≤ 11-ago)': 't2_pendientes.json',
  };
  let n = 0, mal = [];
  for (const [nombre, args0] of MATRIZ) {
    const tag = 'm' + (n++);
    const args = [...args0, ...F1A];
    const p = correr(path.join(__dirname, 'gen_tramo2.js'), args, tag + '_port'), r = correr(path.join(REF, 'gen_tramo2_ref.js'), args, tag + '_ref');
    const d = p.out && r.out ? difFilas(p.out, r.out) : ['sin salida'];
    if (p.status !== r.status || d.length) mal.push(`${nombre}: exit ${p.status}/${r.status} · ${d.slice(0, 3).join(' · ')}`);
    else console.log(`  · ${nombre}: ${p.out.length} filas · exit ${p.status} · port = referencia`);
  }
  // NO-GO del adelanto (31-ago → 27-sep, congelado ≤ 13-jul) sobre la salida del adelanto
  {
    const prev = correr(path.join(REF, 'gen_tramo2_ref.js'), ['2027-03-14', '2027-08-31', ...F1A], 'adelanto');
    const prevFile = path.join(TMP, 'adelanto.json');
    const args = ['2027-03-14', '2027-09-27', '--congelar-hasta', '2027-07-13', '--previo', prevFile, '--examen-previo', '2027-08-31', ...F1A];
    const p = correr(path.join(__dirname, 'gen_tramo2.js'), args, 'nogo_ad_port'), r = correr(path.join(REF, 'gen_tramo2_ref.js'), args, 'nogo_ad_ref');
    const d = p.out && r.out && prev.out ? difFilas(p.out, r.out) : ['sin salida'];
    if (p.status !== r.status || d.length) mal.push(`NO-GO adelanto: exit ${p.status}/${r.status} · ${d.slice(0, 3).join(' · ')}`);
    else console.log(`  · NO-GO adelanto 31-ago → 27-sep (≤ 13-jul): ${p.out.length} filas · port = referencia`);
    REGEN['NO-GO adelanto'] = 't2_0831_nogo.json';
    MATRIZ.push(['NO-GO adelanto', null]);
  }
  ok(mal.length === 0, `V2+ · port gen_tramo2.js = referencia en ${MATRIZ.length} escenarios con --f1-filas ${F1F} (salida y exit)`, mal.join(' | '));
  // v6.01 · COMPATIBILIDAD v6.00 (--f1-filas 58): port = referencia = tramo2_14mar_27sep.json en el base, y los casos que la espec
  //   guardó (v600/espec/regen, con --regen <dir>) se corren con la semántica v6.00 (D79 en F1) y la base v6.00 como --previo.
  // v6.02 · + COMPATIBILIDAD v6.01 (--f1-filas 57, --pendientes-f1 58 como en su referencia): base = tramo2_14mar_27sep_v601.json (byte a
  //   byte también desde la referencia) y la colocación de F1 con 60/58/57 slots = la de cada versión (hitos en su D#). Se salta la versión
  //   vigente (ya la cubre la matriz de arriba).
  // v6.03 · + COMPATIBILIDAD v6.02 (--f1-filas 52): base = tramo2_14mar_27sep_v602.json (byte a byte desde gen_tramo2_ref.js --f1-filas 52)
  //   y colocación esperada DECLARADA (enF1: d 1-51 = v5.20 D1-D51 · d 52 = v5.20 D55), porque en la v6.02 ya había un hito fuera de su D#.
  // v6.04 · + COMPATIBILIDAD v6.03 (--f1-filas 50 con examen 27-sep): base = tramo2_14mar_27sep_v603.json (byte a byte desde gen_tramo2_ref.js
  //   --f1-filas 50, examen por defecto 27-sep) y colocación declarada (enF1: d 1-49 = v5.20 D1-D49 · d 50 = v5.20 D55). Se salta la versión
  //   vigente por (f1, examen), no solo por f1 (la v6.04 tiene las mismas 50 filas de F1 que la v6.03).
  // v6.05 · + COMPATIBILIDAD v6.04 (--f1-filas 50 con examen 25-oct): base = tramo2_14mar_25oct_v604.json (byte a byte desde gen_tramo2_ref.js
  //   2027-03-14 2027-10-25 --f1-filas 50). Los escenarios de cada versión usan SU examen (CV.examen; v6.00-v6.03 = 27-sep, igual que antes)
  //   y el NO-GO 27-sep → 25-oct congela sobre la base 27-sep de esas filas de F1 (CV.previoNogo; v6.00-v6.03 = su propia base).
  const COMPAT_VERS = [
    { v: 'v6.00', f1: F1_FILAS_V600, examen: '2027-09-27', baseFile: 'tramo2_14mar_27sep.json', refArgs: ['--f1-filas', '58'] },
    { v: 'v6.01', f1: 57, examen: '2027-09-27', baseFile: 'tramo2_14mar_27sep_v601.json', refArgs: ['--pendientes-f1', '58', '--f1-filas', '57'] },
    { v: 'v6.02', f1: 52, examen: '2027-09-27', baseFile: 'tramo2_14mar_27sep_v602.json', refArgs: ['--f1-filas', '52'], enF1: [...Array.from({ length: 51 }, (_, i) => i + 1), 55] },
    // v6.06 (fix): v6.03-v6.05 no tenían Hematology & Oncology en F1 → su 16:15 rotaba por 9 sistemas fijos; con la rotación real cambian →
    //   se reproducen con --rotacion-9 (rot9: también en sus escenarios y en el previo del NO-GO). v6.00-v6.02 (9 sistemas en F1) salen iguales sin él.
    { v: 'v6.03', f1: 50, examen: '2027-09-27', baseFile: 'tramo2_14mar_27sep_v603.json', rot9: true, refArgs: ['--f1-filas', '50', '--rotacion-9'], enF1: [...Array.from({ length: 49 }, (_, i) => i + 1), 55] },
    { v: 'v6.04', f1: 50, examen: '2027-10-25', baseFile: 'tramo2_14mar_25oct_v604.json', rot9: true, refArgs: ['2027-03-14', '2027-10-25', '--f1-filas', '50', '--rotacion-9'], enF1: [...Array.from({ length: 49 }, (_, i) => i + 1), 55], previoNogo: 'tramo2_14mar_27sep_v603.json' },
    // v6.06 · + COMPATIBILIDAD v6.05 (--f1-filas 47 con examen 25-oct): base = tramo2_14mar_25oct_v605.json; su previo del NO-GO (base 27-sep con 47
    //   filas de F1) no está guardado → se genera con la referencia (previoNogoRef), como hacía la v6.05 en su propia matriz
    { v: 'v6.05', f1: 47, examen: '2027-10-25', baseFile: 'tramo2_14mar_25oct_v605.json', rot9: true, refArgs: ['2027-03-14', '2027-10-25', '--f1-filas', '47', '--rotacion-9'], enF1: [...Array.from({ length: 46 }, (_, i) => i + 1), 55], previoNogoRef: ['2027-03-14', '2027-09-27', '--f1-filas', '47', '--rotacion-9'] },
  ].filter((c) => !(c.f1 === F1F && c.examen === ESC.examen));
  for (const CV of COMPAT_VERS) {
    const VX = ['--f1-filas', String(CV.f1), ...(CV.rot9 ? ['--rotacion-9'] : [])], baseX = path.join(REF, CV.baseFile), tag = CV.v.replace('.', '');
    const EXc = CV.examen; // v6.05: examen y previo del NO-GO de esa versión · v6.06: o generado con la referencia (previoNogoRef)
    const nogoX = CV.previoNogo ? path.join(REF, CV.previoNogo) : CV.previoNogoRef ? (correr(path.join(REF, 'gen_tramo2_ref.js'), CV.previoNogoRef, tag + '_nogoprev'), path.join(TMP, tag + '_nogoprev.json')) : baseX;
    const COMPAT = [
      [`base ${CV.v}`, ['2027-03-14', EXc]],
      ['14-mar → 31-ago', ['2027-03-14', '2027-08-31']],
      ['--pendientes-f1 17,58', ['2027-03-14', EXc, '--pendientes-f1', '17,58']],
      ['NO-GO base 27-sep → 25-oct (≤ 9-ago)', ['2027-03-14', '2027-10-25', '--congelar-hasta', '2027-08-09', '--previo', nogoX, '--examen-previo', '2027-09-27']],
      ['SERUMS 3 → 6-may con congelado ≤ 2-may', ['2027-03-14', EXc, '2027-05-06', '--congelar-hasta', '2027-05-02', '--previo', baseX]],
      ['colchón agotado --pendientes UR84,C80 (≤ 11-ago)', ['2027-03-14', EXc, '--congelar-hasta', '2027-08-11', '--previo', baseX, '--pendientes', 'UR84,C80']],
    ];
    const malC = [];
    COMPAT.forEach(([nombre, args0], i) => {
      const args = [...args0, ...VX];
      const p = correr(path.join(__dirname, 'gen_tramo2.js'), args, tag + 'c' + i + '_port'), r = correr(path.join(REF, 'gen_tramo2_ref.js'), args, tag + 'c' + i + '_ref');
      const d = p.out && r.out ? difFilas(p.out, r.out) : ['sin salida'];
      if (p.status !== r.status || d.length) malC.push(`${nombre}: exit ${p.status}/${r.status} · ${d.slice(0, 3).join(' · ')}`);
    });
    const p0 = path.join(TMP, tag + 'c0_port.json');
    const dBase = fs.existsSync(p0) ? difFilas(JSON.parse(fs.readFileSync(p0, 'utf8')), JSON.parse(fs.readFileSync(baseX, 'utf8'))) : ['sin salida'];
    // la referencia con los parámetros con los que se guardó su fichero base → byte a byte
    const rb = path.join(TMP, tag + '_refbase.json');
    spawnSync(process.execPath, [path.join(REF, 'gen_tramo2_ref.js'), ...CV.refArgs, '--json', rb], { cwd: REF, encoding: 'utf8' });
    const bytes = fs.existsSync(rb) && fs.readFileSync(rb, 'utf8') === fs.readFileSync(baseX, 'utf8');
    // colocación de F1 de esa versión: hitos en su D#, desplazadas = las de su referencia
    const colX = colocarF1(CV.v === 'v6.00' ? 60 : CV.f1, byD);
    const desplRef = JSON.parse(fs.readFileSync(baseX, 'utf8')).filter((x) => x.dOrig != null && ORIGEN_F1_TEMARIO.includes(x.dOrig)).map((x) => x.dOrig);
    const okCol = (CV.enF1 ? eq(colX.enF1, CV.enF1) : colX.enF1.every((o, i) => (typeof o === 'number' && o !== 79 ? o === i + 1 : true))) && eq(colX.desplazadas, desplRef);
    ok(malC.length === 0 && dBase.length === 0 && bytes && okCol, `V2+ · compatibilidad ${CV.v} (--f1-filas ${CV.f1}): port = referencia en ${COMPAT.length} escenarios · base = ${CV.baseFile} (y byte a byte desde gen_tramo2_ref.js ${CV.refArgs.join(' ')}) · colocarF1 = F1 ${CV.v}`,
      [...malC, ...dBase.slice(0, 3), bytes ? '' : 'referencia ≠ fichero base (bytes)', okCol ? '' : `colocación ≠ ${CV.v}: desplazadas ${colX.desplazadas} vs ${desplRef}`].filter(Boolean).join(' | ') || `0 diferencias · desplazadas [${desplRef.map((d) => 'D' + d).join(', ') || '—'}]`);
    if (CV.v !== 'v6.00') continue;
    // contraste con las salidas guardadas por la espec (v600/espec/regen), si se pasa --regen <dir>
    const dirRegen = opt('--regen');
    if (dirRegen && fs.existsSync(dirRegen)) {
      let iguales = 0, total = 0; const md = [];
      COMPAT.forEach(([nombre], i) => {
        if (!REGEN[nombre]) return;
        const file = path.join(dirRegen, REGEN[nombre]); if (!fs.existsSync(file)) return;
        const mine = path.join(TMP, tag + 'c' + i + '_port.json');
        total++; if (fs.existsSync(mine) && eq(JSON.parse(fs.readFileSync(mine, 'utf8')), JSON.parse(fs.readFileSync(file, 'utf8')))) iguales++; else md.push(nombre);
      });
      ok(total > 0 && iguales === total, `V2+ · port (v6.00) = salidas guardadas de la espec (--regen) ${iguales}/${total}`, md.join(', '));
    }
  }
}

// ── V2b · presupuesto uWorld FRESCO ──
{
  const esHito = (x) => /🎯/.test(x.sub);
  const f1 = DIAS.filter((x) => !esHito(x) && x.bbCh !== 'Colchón').reduce((a, x) => a + x.qDia, 0);
  const t2 = DIAS_T2.filter((x) => ['contenido', 'refuerzo', 'uw_random'].includes(x.tipo)).reduce((a, x) => a + x.qDia, 0);
  const declaran = DIAS_T2.filter((x) => ['reactivacion', 'colchon', 'reentrada'].includes(x.tipo) && /FRESCO|timed random/i.test(x.uw));
  ok(f1 + t2 <= 3659 && declaran.length === 0, 'V2b · uWorld FRESCO planificado ≤ 3.659', `F1 ${f1} + tramo 2 ${t2} = ${f1 + t2} (margen ${3659 - f1 - t2}) · filas de reactivación/colchón/reentrada con uWorld fresco: ${declaran.length}`);
}

// ── V3 · fechas ──
{
  const SKIP = new Set(F.skip), PROT = new Set(F.protegidos.map((p) => p.fecha));
  const malas = [];
  for (const x of DIAS_TODOS) {
    const w = new Date(x.fecha + 'T12:00:00Z').getUTCDay();
    if (SKIP.has(x.fecha)) malas.push(`${x.fecha} SKIP`);
    if (PROT.has(x.fecha) && !(x.tipo === 'ritual')) malas.push(`${x.fecha} protegido`);
    if (w === 0) malas.push(`${x.fecha} domingo`);
    if (w === 6 && x.fecha < F.serums.inicio) malas.push(`${x.fecha} sábado antes del SERUMS`);
  }
  const fechas = DIAS_TODOS.map((x) => x.fecha);
  const crec = fechas.every((s, i) => i === 0 || s > fechas[i - 1]);
  const dUnicos = new Set(DIAS_TODOS.map((x) => x.d)).size === DIAS_TODOS.length;
  const contiguoT = DIAS_T2.every((x, i) => x.t === i + 1 && x.d === 101 + i) && DIAS.every((x, i) => x.d === i + 1);
  const esperadas = V6.rango(F.f1.inicio, F.step1.examen).filter((s) => FV.esDiaPlan(s, 'usmle'));
  const set = new Set(fechas);
  const faltan = esperadas.filter((s) => !set.has(s)), sobran = fechas.filter((s) => !esperadas.includes(s));
  const rit = DIAS_TODOS[DIAS_TODOS.length - 1];
  ok(malas.length === 0 && crec && dUnicos && contiguoT && faltan.length === 0 && sobran.length === 0 && DIAS[0].fecha === F.f1.inicio && rit.tipo === 'ritual' && rit.fecha === F.step1.ritual,
    'V3 · fechas USMLE', `${malas.length} en SKIP/protegidos/domingo/sábado pre-SERUMS${malas.length ? ' (' + malas.slice(0, 5).join(', ') + ')' : ''} · D1 ${DIAS[0].fecha} · ritual ${rit.fecha} (única fila en protegido) · ${fechas.length} fechas = esDiaPlan(iso,'usmle') (faltan ${faltan.length} · sobran ${sobran.length}) · sábados ${DIAS_TODOS.filter((x) => new Date(x.fecha + 'T12:00:00Z').getUTCDay() === 6).length} (todos ≥ ${F.serums.inicio})`);
}

// ── F1 = v5.20 (v6.01: contenido por posición en el orden de F1 · v6.02: por su origen en la colocación con hitos anclados ·
//    fechas = hábiles de F1 · niveles por la regla) ──
{
  const CAMPOS_CONT = ['system', 'tier', 'sub', 'bbCh', 'bbVid', 'uw', 'mat', 'matType', 'palm'];
  const HORA = new Set([10, 25, 40, 55]);
  const ORIGEN_F1 = COLOC.enF1; // v6.02: D# v5.20 (o 'C1'/'C2') de cada d de F1 (v6.00/v6.01: el orden D1-D57 · D79 · C1 · C2)
  ok(eq(ESC.origenF1 || null, ORIGEN_F1), 'F1 · escenario.origenF1 (gen_usmle_v5.js) = colocarF1(nº de hábiles de F1)', (ESC.origenF1 || []).map((o, i) => (o === i + 1 ? null : `D${i + 1} ← ${typeof o === 'number' ? 'v5.20 D' + o : o}`)).filter(Boolean).join(' · ') || 'd = D# en todo F1');
  const habF1 = V6.habLV(F.f1.inicio, F.f1.fin, new Set(F.skip));
  const dif = [];
  if (DIAS.length !== habF1.length || DIAS.length !== F.f1.dias) dif.push(`nº de filas ${DIAS.length} · hábiles F1 ${habF1.length} · f1.dias ${F.f1.dias}`);
  // regla de niveles de gen_usmle_v5.js, re-derivada aquí (posición en el sistema · viernes · semana desde el D1 · excepción C1/C2)
  const sem1 = new Date(DIAS[0].fecha + 'T12:00:00Z');
  const semanaDeF1 = (fe) => Math.floor((new Date(fe + 'T12:00:00Z') - sem1) / (7 * 864e5)) + 1;
  const posSis = {};
  const esperadoNivel = (x) => {
    if (/🎯/.test(x.sub)) return [5, /UWSA/.test(x.sub) ? 160 : /FREE 120/i.test(x.sub) ? 120 : 200, undefined];
    if (x.bbCh === 'Colchón') return [4, 40, undefined];
    const pos = (posSis[x.system] = (posSis[x.system] || 0) + 1), vie = new Date(x.fecha + 'T12:00:00Z').getUTCDay() === 5;
    if (pos <= 2) return [1, 30, undefined];
    if (vie && U.DAILY_META.viernesN4DesdeSemana > 0 && semanaDeF1(x.fecha) >= U.DAILY_META.viernesN4DesdeSemana) return [4, 40, 'franja'];
    return vie ? [3, 40, undefined] : [2, 40, undefined];
  };
  const cambian = [];
  DIAS.forEach((x, i) => {
    const o = ORIGEN_F1[i];
    if (x.d !== i + 1 || x.fecha !== habF1[i]) dif.push(`D${x.d}.d/fecha ${x.fecha} ≠ ${habF1[i]}`);
    const [nv, q, fr] = esperadoNivel(x);
    if (x.nivelUW !== nv || x.qDia !== q || (fr ? !/^VIERNES NIVEL 4/.test(x.franjaNota || '') : x.franjaNota !== undefined)) dif.push(`D${x.d}.nivel N${x.nivelUW}·${x.qDia} ≠ regla N${nv}·${q}`);
    if (typeof o === 'string') { if (x.bbCh !== 'Colchón' || !x.sub.startsWith(o + ' · COLCHÓN F1')) dif.push(`D${x.d} ≠ ${o}`); return; }
    const v = byD[o];
    for (const k of CAMPOS_CONT) {
      const a = k === 'sub' && HORA.has(o) ? normSub(x[k]) : x[k], b = k === 'sub' && HORA.has(o) ? normSub(v[k]) : v[k];
      if (!eq(a, b)) dif.push(`D${x.d}.${k} ≠ v5.20 D${o}`);
    }
    const kx = Object.keys(x).filter((k) => k !== 'franjaNota').sort().join(), kv = Object.keys(v).filter((k) => k !== 'franjaNota').sort().join();
    if (kx !== kv) dif.push(`D${x.d}.claves`);
    if (x.nivelUW !== v.nivelUW || x.qDia !== v.qDia) cambian.push(`D${x.d}`);
  });
  const horas = [...HORA].filter((o) => ORIGEN_F1.includes(o)).map((o) => { const x = DIAS[ORIGEN_F1.indexOf(o)]; return x.sub.includes('(07:00-12:30)') && byD[o].sub.replace('(07:15-11:00)', '(07:00-12:30)') === x.sub; });
  const uwsa1 = /UWSA1/.test(DIAS[0].sub) && DIAS[0].sub.includes('09:00-13:00');
  const noId = ORIGEN_F1.map((o, i) => (typeof o === 'number' && o !== i + 1 ? `D${i + 1} = v5.20 D${o}` : null)).filter(Boolean);
  ok(dif.length === 0 && horas.length === 4 && horas.every(Boolean) && uwsa1,
    `F1 · D1-D${DIAS.length} = contenido v5.20 de su origen con fechas = hábiles de F1 (${habF1[0]} → ${habF1[habF1.length - 1]}) y niveles por la regla`,
    dif.length ? dif.slice(0, 8).join(', ') : `${DIAS.length}/${DIAS.length}${noId.length ? ' (' + noId.join(' · ') + ')' : ''} · sub igual salvo (07:15-11:00) → (07:00-12:30) en los NBME 25-28 · UWSA1 D1 09:00-13:00 · nivelUW/qDia ≠ v5.20 por el día de la semana en ${cambian.length} filas (${cambian.join(' ')})`);
  // hitos F1: TODOS en F1 (v6.02: un hito de F1 nunca sale de F1) · en su D# si cabe (UWSA1 D1 · NBME 25 D10 · 26 D25 · 27 D40) y el que no
  //   cabe en los últimos slots (v6.02: NBME 28 = v5.20 D55 → D52 mié 30-dic) · fechas del corrimiento vigente
  const hitosF1 = DIAS.filter((x) => /🎯/.test(x.sub)).map((x) => `D${x.d} ${x.fecha}`);
  // v6.06: NBME 27 adelantado al slot 35 (vie 18-dic) por la regla del Day-After completo (su slot base 40 = lun 28-dic chocaba con el NBME 28)
  const HITOS_F1_ESP = F.version === 'v6.06' ? ['D1 2026-11-02', 'D10 2026-11-13', 'D25 2026-12-04', 'D35 2026-12-18', 'D42 2026-12-30']
    : F.version === 'v6.05' ? ['D1 2026-10-26', 'D10 2026-11-06', 'D25 2026-11-27', 'D40 2026-12-18', 'D47 2026-12-30']
    : F.version === 'v6.03' || F.version === 'v6.04' ? ['D1 2026-10-21', 'D10 2026-11-03', 'D25 2026-11-24', 'D40 2026-12-15', 'D50 2026-12-30']
    : F.version === 'v6.02' ? ['D1 2026-10-19', 'D10 2026-10-30', 'D25 2026-11-20', 'D40 2026-12-11', 'D52 2026-12-30']
    : F.version === 'v6.01' ? ['D1 2026-10-12', 'D10 2026-10-23', 'D25 2026-11-13', 'D40 2026-12-04', 'D55 2026-12-28'] : hitosF1;
  const nombresF1 = DIAS.filter((x) => /🎯/.test(x.sub)).map((x) => (/UWSA1|NBME \d+/.exec(x.sub) || ['?'])[0]);
  ok(eq(hitosF1, HITOS_F1_ESP) && eq(nombresF1, ['UWSA1', 'NBME 25', 'NBME 26', 'NBME 27', 'NBME 28']) && eq(COLOC.hitos.filter((o) => ORIGEN_F1.includes(o)), COLOC.hitos),
    'F1 · los 5 hitos de F1 en F1 (en su D# o en los últimos slots): UWSA1 · NBME 25 · 26 · 27 · 28', hitosF1.map((h, i) => nombresF1[i] + ' ' + h).join(' · '));
  // v6.06 · DAY-AFTER COMPLETO (regla nueva de la colocación, re-derivada aquí sin usar slotsHitosF1): cada hito de F1 salvo el último está
  //   en su slot base min(D#, N − (H − 1 − k)) o adelantado un múltiplo de SEMANA_PLAN filas; sus DAY_AFTER_FILAS filas siguientes no tocan
  //   el hito siguiente; y si está adelantado, una semana de plan más tarde su Day-After SÍ pisaría el hito siguiente (adelanto mínimo).
  {
    const hs = DIAS.filter((x) => /🎯/.test(x.sub)), H = hs.length, N = DIAS.length;
    const malDA = [], adelantos = [];
    hs.forEach((x, k) => {
      const o = COLOC.enF1[x.d - 1], base = Math.min(o, N - (H - 1 - k));
      if (k === H - 1) { if (x.d !== base) malDA.push(`último hito D${x.d} ≠ base ${base}`); return; }
      const sig = hs[k + 1].d;
      if (x.d > base || (base - x.d) % SEMANA_PLAN) malDA.push(`D${x.d} (v5.20 D${o}) no es base ${base} − 5·j`);
      if (x.d + DAY_AFTER_FILAS >= sig) malDA.push(`Day-After de D${x.d} (D${x.d + 1}-D${x.d + DAY_AFTER_FILAS}) pisa el hito D${sig}`);
      if (x.d < base && x.d + SEMANA_PLAN + DAY_AFTER_FILAS < sig) malDA.push(`D${x.d} adelantado de más (D${x.d + SEMANA_PLAN} ya cabía)`);
      if (x.d < base) adelantos.push(`${(/NBME \d+|UWSA1/.exec(x.sub) || ['?'])[0]} v5.20 D${o}: slot ${base} (${DIAS[base - 1].fecha}) → D${x.d} ${x.fecha} · Day-After D${x.d + 1}-D${x.d + DAY_AFTER_FILAS} (${DIAS[x.d].fecha} → ${DIAS[x.d + DAY_AFTER_FILAS - 1].fecha}) antes del D${sig}`);
    });
    ok(malDA.length === 0, `F1 · Day-After completo: ningún Day-After de hito (${DAY_AFTER_FILAS} filas) pisa el hito siguiente; adelantos por semanas de plan (${SEMANA_PLAN} filas), los mínimos`,
      malDA.length ? malDA.join(' · ') : adelantos.join(' · ') || 'ningún hito adelantado (todos en su slot base)');
  }
  // gates F1 (B1): D18 y D38 → fechas (informativo; los usan homeBriefing/usmleScores por D#)
  const gates = [18, 38].filter((d) => d <= DIAS.length).map((d) => `D${d} ${DIAS[d - 1].fecha}`);
  console.log(`  · gates F1 de cumplimiento del núcleo: ${gates.join(' · ')}`);
  // lo que no cabe en F1: colchón consumido · temario desplazado al tramo 2 (con dOrig, una vez, antes del contenido de CONT)
  const enF1 = ORIGEN_F1, desplEsp = COLOC.desplazadas, consEsp = COLOC.consumido;
  const filasDespl = desplEsp.map((d) => DIAS_T2.filter((x) => x.dOrig === d));
  const primerCont = DIAS_T2.find((x) => x.tipo === 'contenido');
  const okDespl = eq(DESPL, desplEsp) && eq(ESC.colchonF1Consumido || [], consEsp) && eq(ESC.f1Filas, enF1.filter((o) => typeof o === 'number').length)
    && filasDespl.every((fs1, k) => fs1.length >= 1 && fs1.every((x) => x.tipo === 'contenido' && x.uid === 'C' + desplEsp[k] && x.subV520 === byD[desplEsp[k]].sub && x.sub.includes(byD[desplEsp[k]].sub) && x.dF1 === undefined
      && ['system', 'tier', 'bbCh', 'bbVid', 'uw', 'mat', 'matType', 'palm'].every((c) => eq(x[c], byD[desplEsp[k]][c]))))
    && (!desplEsp.length || primerCont.dOrig === desplEsp[0])
    // v6.02: en orden v5.20, contiguas en la cola (sin filas de contenido entre ellas) y nivel por la regla: posición entre las desplazadas
    //   del mismo sistema ≤ 2 → N1 · 30Q; si no, viernes → N4 · 40Q; si no → N2 · 40Q (sin partes: caen en F3)
    && eq(DIAS_T2.filter((x) => x.tipo === 'contenido').slice(0, desplEsp.length).map((x) => x.dOrig), desplEsp)
    && filasDespl.every((fs1, k) => { const x = fs1[0]; if (x.parte) return true; const pos = desplEsp.filter((d) => byD[d].system === byD[desplEsp[k]].system).indexOf(desplEsp[k]) + 1;
      const vie = new Date(x.fecha + 'T12:00:00Z').getUTCDay() === 5; return pos <= 2 ? x.nivelUW === 1 && x.qDia === 30 : vie ? x.nivelUW === 4 && x.qDia === 40 : x.nivelUW === 2 && x.qDia === 40; });
  const d79F1 = DIAS.find((x) => x.sub === byD[79].sub);
  ok(okDespl, `F1 · lo que no cabe: colchón consumido [${consEsp.join(', ') || '—'}] · temario desplazado al tramo 2 [${desplEsp.map((d) => 'D' + d).join(', ') || '—'}] (las últimas no-hito, en orden, a la cabeza de la cola, con su dOrig y su nivel por la regla)`,
    desplEsp.length ? filasDespl.map((fs1, k) => `D${desplEsp[k]} → T${fs1[0].t} ${fs1[0].fecha} (d ${fs1[0].d}, ${fs1[0].uid}, N${fs1[0].nivelUW}·${fs1[0].qDia}Q)`).join(' · ') : d79F1 ? `v5.20 D79 en F1 = D${d79F1.d} ${d79F1.fecha}` : '');
  // v6.02 (17-oct): etiqueta de origen de las desplazadas. Con hitos ANCLADOS (algún hito de F1 fuera de su D#) = «era v5.20 D#»;
  //   si no (v6.00/v6.01) = «era la fila <posición> de F1» (la de sus referencias congeladas)
  const anclados = COLOC.hitos.some((h) => ORIGEN_F1[ORIGEN_F1_TEMARIO.indexOf(h)] !== h);
  const etq = (d) => `DE F1 → TRAMO 2 (no cupo en F1 antes de la pausa ENCAPS; ${anclados ? 'era v5.20 D' + d : 'era la fila ' + (ORIGEN_F1_TEMARIO.indexOf(d) + 1) + ' de F1'}) · `;
  const malEtq = filasDespl.flatMap((fs1, k) => fs1.filter((x) => !x.sub.startsWith(etq(desplEsp[k]))).map((x) => `T${x.t}`));
  ok(malEtq.length === 0, `F1 · etiqueta de las desplazadas = ${anclados ? '«era v5.20 D#» (hitos anclados)' : '«era la fila N de F1» (hitos en su D#)'}`, malEtq.length ? 'mal en ' + malEtq.join(', ') : desplEsp.map((d) => 'D' + d).join(', ') || '—');
  // C1/C2 (solo si caben): campos de §B1
  const C = (n) => ({ system: 'Colchón', tier: 'CORE', sub: `C${n} · COLCHÓN F1: si se perdió un día de D1-D${enF1.filter((o) => typeof o === 'number').length} → hacerlo hoy (el más antiguo); si no → 2.ª pasada de incorrectas de los 9 sistemas (40Q timed) + cerrar Anki antes de la pausa`, bbCh: 'Colchón', bbVid: '—', uw: 'uWorld incorrects (9 sistemas F1)', mat: 'uWorld + Anki', matType: 'clin', palm: null, nivelUW: 4, qDia: 40 });
  const colF1 = DIAS.filter((x) => x.bbCh === 'Colchón');
  const okC = colF1.every((x) => { const { d, fecha, ...resto } = x; const n = Number(x.sub[1]); return eq(resto, C(n)); }) && colF1.length === enF1.filter((o) => typeof o === 'string').length;
  ok(okC, `F1 · colchón F1: ${colF1.length ? colF1.map((x) => 'D' + x.d).join('/') + ' = C1/C2 con los campos de §B1' : 'ninguno (C1/C2 consumidos por el corrimiento)'}`);
}

// ── v6.06 (fix) · F3 · 16:15 REENTRADA: la rotación no llega a un sistema aún no estudiado ──
//   Re-derivado de las filas (sin sistemasRotacionF1 ni el puntero de gen_tramo2; de allí solo la familia SISTEMAS_ROT_16 y el regex del texto):
//   un sistema está ESTUDIADO en la fila T si F1 tiene una fila de temario suya (no hito, no colchón, no pendiente de escenario.pendientesF1)
//   o si su ÚLTIMA fila T de contenido de F1 (desplazada = dOrig de escenario.desplazadasF1, o recuperación con dF1) es anterior. Además:
//   cada fila F3 que no es hito ni reentrada lleva rotación · solo sistemas de la familia · orden = el siguiente ESTUDIADO de la familia tras
//   el de la fila anterior · T1 (sub y uw) dice el nº real de sistemas de F1. Antes de la corrección: T8 mar 29-mar Nervous System y T9 mar
//   30-mar «20Q timed de Hematology & Oncology» (última fila de neuro T11, de hematología T17) y T1 «de los 9 sistemas de F1» → ✗.
{
  const pendF1 = new Set(ESC.pendientesF1 || []);
  const sisF1 = new Set(DIAS.filter((x) => !/🎯/.test(x.sub) && x.bbCh !== 'Colchón' && !pendF1.has(x.d)).map((x) => x.system));
  const ultT = {}; // sistema → t de su última fila T de contenido de F1 (DIAS_T2 va en orden de t)
  for (const x of DIAS_T2) if (x.tipo === 'contenido' && (x.dF1 != null || DESPL.includes(x.dOrig))) ultT[x.system] = x.t;
  const estudiadoEn = (sis, t) => sisF1.has(sis) || (ultT[sis] != null && t > ultT[sis]);
  const rot = DIAS_T2.filter((x) => x.fase === 'F3' && RX_ROT_16.test(x.franjaNota || '')).map((x) => ({ t: x.t, fecha: x.fecha, sis: RX_ROT_16.exec(x.franjaNota)[1] }));
  const sinRot = DIAS_T2.filter((x) => x.fase === 'F3' && !['hito', 'reentrada'].includes(x.tipo) && !RX_ROT_16.test(x.franjaNota || ''));
  const prematuras = rot.filter((r) => !estudiadoEn(r.sis, r.t));
  const ajenos = rot.filter((r) => !SISTEMAS_ROT_16.includes(r.sis));
  const malOrden = [];
  rot.forEach((r, i) => {
    if (!i) return;
    const prev = SISTEMAS_ROT_16.indexOf(rot[i - 1].sis);
    for (let k = 1; k <= SISTEMAS_ROT_16.length; k++) { const c = SISTEMAS_ROT_16[(prev + k) % SISTEMAS_ROT_16.length]; if (estudiadoEn(c, r.t)) { if (c !== r.sis) malOrden.push(`T${r.t} ${r.sis} (tocaba ${c})`); break; } }
  });
  const enF1 = SISTEMAS_ROT_16.filter((x) => sisF1.has(x));
  const t1 = DIAS_T2[0];
  const okT1 = t1.tipo === 'reentrada' && t1.sub.includes(`de los ${enF1.length} sistemas de F1`) && t1.uw.includes(`(${enF1.length} sistemas F1)`);
  const entradas = SISTEMAS_ROT_16.filter((x) => !sisF1.has(x)).map((x) => { const p = rot.find((r) => r.sis === x); return `${x}: última fila T${ultT[x] ?? '—'} → entra ${p ? `T${p.t} ${p.fecha}` : '(no entra en F3)'}`; });
  ok(prematuras.length === 0 && ajenos.length === 0 && malOrden.length === 0 && sinRot.length === 0 && okT1,
    `F3 · 16:15 REENTRADA: la 16:15 no rota a un sistema aún no estudiado (F1 + cada desplazado tras su última fila T), orden de siempre, T1 = ${enF1.length} sistemas de F1`,
    [...prematuras.map((r) => `T${r.t} ${r.fecha} rota a ${r.sis} sin estudiarlo (última fila T${ultT[r.sis] ?? '—'})`), ...ajenos.map((r) => `T${r.t} ${r.sis} fuera de la familia`), ...malOrden,
      ...sinRot.map((x) => `T${x.t} sin 16:15 REENTRADA`), okT1 ? '' : `T1 «${t1.sub.slice(0, 80)}…» · uw «${t1.uw}» ≠ ${enF1.length} sistemas de F1`].filter(Boolean).slice(0, 8).join(' · ')
      || `${rot.length} filas F3 · ${enF1.length} sistemas de F1 (${enF1.join(', ')}) · ${entradas.join(' · ') || 'ningún sistema desplazado entero'}`);
}

// ── API del .ts ──
{
  const T = (t) => DIAS_T2[t - 1];
  // faseDe
  const fdMal = DIAS_TODOS.filter((x) => U.faseDe(x.d) !== (x.d <= 100 ? 'A' : x.faseUW));
  const guarda = [DIAS.length + 1, 75, 100].every((d) => U.faseDe(d) === 'A');
  ok(fdMal.length === 0 && guarda, `API · faseDe(d): F1 = A · tramo 2 = faseUW · ${DIAS.length + 1}-100 = A (guarda)`, `A ${DIAS_TODOS.filter((x) => U.faseDe(x.d) === 'A').length} · B ${DIAS_TODOS.filter((x) => U.faseDe(x.d) === 'B').length} · C ${DIAS_TODOS.filter((x) => U.faseDe(x.d) === 'C').length}`);
  // esViernesNivel4
  const vn4 = DIAS_TODOS.filter(U.esViernesNivel4);
  const vn4NoVie = vn4.filter((x) => new Date(x.fecha + 'T12:00:00Z').getUTCDay() !== 5);
  const colchonVN4 = DIAS_TODOS.filter((x) => (x.tipo === 'colchon' || x.bbCh === 'Colchón') && U.esViernesNivel4(x));
  ok(vn4NoVie.length === 0 && colchonVN4.length === 0 && !U.esViernesNivel4(T(1)), 'API · esViernesNivel4: solo viernes de contenido N4; falso en T1 y en todo colchón', vn4.map((x) => (x.t ? 'T' + x.t : 'D' + x.d) + ' ' + x.fecha).join(' · '));
  // taper / ritual
  const tap = DIAS_TODOS.filter(U.esDiaTaper);
  ok(eq(tap.map((x) => x.t), DIAS_T2.filter((x) => x.tipo === 'taper').map((x) => x.t)) && tap.length === 5, 'API · esDiaTaper: las 5 filas taper', tap.map((x) => 'T' + x.t + ' ' + x.fecha).join(' · '));
  const rit = DIAS_TODOS.filter(U.esDiaRitual);
  ok(rit.length === 1 && rit[0].tipo === 'ritual', 'API · esDiaRitual: solo la última fila (ritual)', rit.map((x) => 'T' + x.t + ' ' + x.fecha).join());
  // semanaDe
  const smMal = DIAS_TODOS.filter((x) => U.semanaDe(x.fecha) !== FV.semanaStep1(x.fecha).n);
  ok(smMal.length === 0, 'API · semanaDe(iso) = semanaStep1(iso).n (fechasV6)', `D1 S${U.semanaDe(DIAS[0].fecha)} · D${DIAS.length} S${U.semanaDe(DIAS[DIAS.length - 1].fecha)} · pausa ${U.semanaDe('2027-02-10')} · T1 S${U.semanaDe(T(1).fecha)} · ritual S${U.semanaDe(DIAS_T2[DIAS_T2.length - 1].fecha)}`);
  // navegación
  const diaDeOk = DIAS_TODOS.every((x) => U.diaDe(x.fecha) === x) && U.diaDe('2027-01-15') === undefined;
  const ant = U.diaAnterior(T(1)), prev3 = U.diaPrevio(T(3)), prevT1 = U.diaPrevio(T(1)), prevD2 = U.diaPrevio(DIAS[1]);
  const nF1 = DIAS.length, v7 = U.ventana7d(nF1 - 2).map((x) => x.d);
  // v6.02: diaPrevio(T1) = la última fila de F1 que NO es hito (D52 = NBME 28 → D51); v6.01: D57
  const ultContF1 = [...DIAS].reverse().find((x) => !/🎯/.test(x.sub));
  ok(diaDeOk && ant && ant.d === nF1 && prev3 && prev3.d === 101 && prevT1 && prevT1.d === ultContF1.d && prevD2 === undefined && eq(v7, [nF1 - 2, nF1 - 1, nF1, 101, 102, 103, 104]),
    'API · diaDe / diaAnterior / diaPrevio / ventana7d por índice en DIAS_TODOS', `diaAnterior(T1)=D${ant && ant.d} · diaPrevio(T1)=D${prevT1 && prevT1.d} (salta el NBME 28 si es la última fila de F1) · diaPrevio(T3)=d${prev3 && prev3.d} (salta el NBME 29) · ventana7d(${nF1 - 2})=${v7.join(',')}`);
  ok(U.etiquetaDiaUSMLE(DIAS[0]) === 'Día 1/' + nF1 && U.etiquetaDiaUSMLE(T(1)) === 'T1/' + DIAS_T2.length, 'API · etiquetaDiaUSMLE', `${U.etiquetaDiaUSMLE(DIAS[0])} · ${U.etiquetaDiaUSMLE(T(158) || T(1))}`);
  // estado PAUSA (§B2 · §F): T1 nunca es «hoy» durante la pausa
  const est = (iso) => { const e = U.estadoUSMLE(iso); return e.estado + (e.dia ? ':' + (e.dia.t ? 'T' + e.dia.t : 'D' + e.dia.d) + (e.exacto ? '' : '~') : ''); };
  // v6.01: hoy sáb 10-oct → la siguiente fila es el D1 lun 12-oct (no exacta) · vie 25-dic (SKIP) → D55 lun 28-dic · mié 30-dic = D57
  // v6.02: derivado de F1 — hoy sáb 17-oct y el lun 12-oct (perdido) → D1 lun 19-oct (no exacta) · vie 25-dic (SKIP) → D50 lun 28-dic ·
  //   mié 30-dic = D52 (NBME 28)
  // v6.03: el lun 19 y el mar 20-oct (perdidos, sin sesión) → D1 mié 21-oct (no exacta) · mié 30-dic = D50 (NBME 28)
  // v6.05: del mié 21 al dom 25-oct (sin sesión; la corrida v6.04a por alias queda sin efecto) → D1 lun 26-oct (no exacta) · mié 30-dic = D47
  // v6.06: del lun 26-oct al dom 1-nov (sin sesión) → D1 lun 2-nov (no exacta) · mié 30-dic = D42 (NBME 28)
  const sigF1 = (iso) => DIAS.find((x) => x.fecha > iso);
  const planF1 = (iso) => { const x = DIAS.find((y) => y.fecha >= iso); return 'PLAN:D' + x.d + (x.fecha === iso ? '' : '~'); }; // fila exacta o la siguiente
  const casos = { '2026-10-06': 'PLAN:D1~', '2026-10-10': 'PLAN:D1~', '2026-10-12': DIAS[0].fecha === '2026-10-12' ? 'PLAN:D1' : 'PLAN:D1~', '2026-10-17': 'PLAN:D1~',
    '2026-10-19': DIAS[0].fecha === '2026-10-19' ? 'PLAN:D1' : 'PLAN:D1~', '2026-10-20': DIAS[0].fecha === '2026-10-20' ? 'PLAN:D1' : DIAS[0].fecha < '2026-10-20' ? 'PLAN:D2' : 'PLAN:D1~', [DIAS[0].fecha]: 'PLAN:D1',
    ...Object.fromEntries(['2026-10-21', '2026-10-22', '2026-10-23', '2026-10-24', '2026-10-25', '2026-10-26', '2026-10-27', '2026-10-28', '2026-10-29', '2026-10-30', '2026-10-31', '2026-11-01', '2026-11-03'].map((iso) => [iso, planF1(iso)])),
    '2026-12-25': `PLAN:D${sigF1('2026-12-25').d}~`, [F.f1.fin]: `PLAN:D${DIAS.length}`, '2026-12-31': 'PAUSA', '2027-02-10': 'PAUSA', '2027-03-15': 'PAUSA', '2027-03-16': 'PLAN:T1', '2027-05-09': 'PLAN:T39~',
    // v6.04: ritual / viaje / examen del JSON (v6.00-v6.03: sáb 25-sep = T158 · dom 26 · lun 27-sep) · el antiguo examen ya es un día de plan
    [F.step1.ritual]: `PLAN:T${DIAS_T2.length}`, [F.step1.viaje_d1]: 'FIN', [F.step1.examen]: 'FIN', ...(F.step1.examen !== '2027-09-27' ? { '2027-09-27': 'PLAN:T159' } : {}) };
  const estMal = Object.entries(casos).filter(([iso, e]) => est(iso) !== e);
  const pausaSinFila = V6.rango('2026-12-31', '2027-03-15').every((iso) => U.estadoUSMLE(iso).estado === 'PAUSA' && U.diaDe(iso) === undefined);
  ok(estMal.length === 0 && pausaSinFila && U.enPausaStep1('2027-01-04') === true, 'API · estadoUSMLE: PAUSA 31-dic → 15-mar sin fila «hoy» · PLAN (exacta o la siguiente) · FIN tras el ritual', estMal.length ? estMal.map(([i, e]) => `${i}: ${est(i)} ≠ ${e}`).join(' · ') : Object.entries(casos).map(([i]) => `${i.slice(5)} ${est(i)}`).join(' · '));
  const hitos = U.hitosDelPlan();
  ok(hitos.length === 13, 'API · hitosDelPlan() sobre los 2 tramos', hitos.map((x) => (x.t ? 'T' + x.t : 'D' + x.d)).join(' '));
  // DAILY_META (literal de §F para el escenario base)
  const M = U.DAILY_META;
  // v6.01 (10-oct-2026): D1 lun 12-oct · tramo 1 de 57 días · totalDias 57 + 158 = 215 (v6.00: 2026-10-07 · 60 · 218)
  // v6.02 (17-oct-2026): D1 lun 19-oct · tramo 1 de 52 días · totalDias 52 + 158 = 210
  // v6.03 (20-oct-2026): D1 mié 21-oct · tramo 1 de 50 días · totalDias 50 + 158 = 208
  // v6.04 (21-oct-2026): examen lun 25-oct · tramo 2 de 182 días (mar 16-mar → sáb 23-oct) · totalDias 50 + 182 = 232 · GO/NO-GO lun 6-sep
  // v6.05 (24-oct-2026): D1 lun 26-oct · tramo 1 de 47 días · totalDias 47 + 182 = 229 (examen, GO/NO-GO y tramo 2 = v6.04)
  // v6.06 (31-oct-2026): D1 lun 2-nov · tramo 1 de 42 días · totalDias 42 + 182 = 224 (examen, GO/NO-GO y fechas del tramo 2 = v6.04)
  const ESPERADO = { step: 1, version: 'v6.06', inicio: '2026-11-02', fin: '2027-10-23', totalDias: 224, tramos: [{ n: 1, inicio: '2026-11-02', fin: '2026-12-30', dias: 42 }, { n: 2, inicio: '2027-03-16', fin: '2027-10-23', dias: 182, provisional: true }], pausa: { desde: '2026-12-31', hasta: '2027-03-15', motivo: 'ENCAPS intensiva + lunes libre' }, examenTarget: '2027-10-25', examenVentana: 'eligibility ago-sep-oct 2027 · examen 2027-10-25 en todos los escenarios ENCAPS (DJ-1 v6.04: sin adelanto; plan B = base → un NO-GO pasa a la extensión de la elegibilidad)', gonogo: '2027-09-06', descansoD1: '2027-10-24', serumsInicio: '2027-05-03', viernesN4DesdeSemana: 11 };
  const mMal = Object.keys(ESPERADO).filter((k) => !eq(M[k], ESPERADO[k]));
  ok(mMal.length === 0 && typeof M.bloque === 'string' && typeof M.metodo === 'string', 'API · DAILY_META = literal de §F (escenario base, v6.06)', mMal.length ? 'distinto: ' + mMal.join(', ') : `version ${M.version} · inicio ${M.inicio} · tramo 1 ${M.tramos[0].dias} días · examenTarget ${M.examenTarget} · totalDias ${M.totalDias} (informativo)`);
  // USMLE_TAPER (§B6)
  const TP = U.USMLE_TAPER;
  // v6.04: examen lun 25-oct → D94 T180 jue 21-oct · D95 T181 vie 22-oct · ritual T182 sáb 23-oct · viaje dom 24 · regreso mar 26-oct · Free 120 vie 8-oct
  const okTP = eq([TP.d94.t, TP.d94.d, TP.d94.fecha], [180, 280, '2027-10-21']) && eq([TP.d95.t, TP.d95.d, TP.d95.fecha], [181, 281, '2027-10-22']) && eq([TP.ritual.t, TP.ritual.d, TP.ritual.fecha], [182, 282, '2027-10-23'])
    && TP.dMenos1.fecha === '2027-10-24' && TP.examen.fecha === '2027-10-25' && TP.regreso.fecha === '2027-10-26' && TP.dMenos1.pasos.length === 6 && TP.examen.pasos.length === 6
    && TP.fuente === 'PALMERTON_METODO_COMPLETO.md §8.3-§8.4 · ' + F.version && /Free 120 \(vie 8-oct\)/.test(TP.cierre) && /COLCHÓN/.test(TP.burnout) && typeof TP.d94.resumen === 'string';
  ok(okTP, 'API · USMLE_TAPER (§B6)', `D94 T${TP.d94.t} ${TP.d94.fecha} · D95 T${TP.d95.t} ${TP.d95.fecha} · ritual T${TP.ritual.t} · D-1 ${TP.dMenos1.fecha} · examen ${TP.examen.fecha} · regreso ${TP.regreso.fecha}`);
  // FRANJAS (horas sin cambio) + FRANJAS_F4
  ok(eq(U.FRANJAS.map((x) => x.hora), ['05:00–05:45', '07:15–08:15', '08:15–09:00', '09:00–11:00', '11:00–12:00', '18:00–18:45']) && U.FRANJA_F3_REENTRADA.hora === '16:15–17:15', 'API · FRANJAS F1/F3 con las horas de siempre + FRANJA_F3_REENTRADA 16:15-17:15');
  const PL = ['M', 'T', 'L', 'G', 'H', 'H-sáb'];
  const f4Mal = PL.filter((p) => !U.FRANJAS_F4[p] || !U.FRANJAS_F4[p].some((x) => x.frente === 'mir' && /1 h/.test(x.fase)) || !U.FRANJAS_F4[p].some((x) => x.frente === 'research-derma' && /30'/.test(x.fase)));
  ok(eq(Object.keys(U.FRANJAS_F4), PL) && f4Mal.length === 0, 'API · FRANJAS_F4 M/T/L/G/H/H-sáb: MIR 1 h y R↔D 30\' en todas (DJ-4)', f4Mal.length ? 'faltan en ' + f4Mal.join(',') : PL.map((p) => `${p} ${U.FRANJAS_F4[p].length}`).join(' · '));
}

// ── v6.05b (24-oct, verificación adversarial) · F4: inducción del SERUMS (¼ de unidad por fila) ──
//   Toda fila PARTIDA declara la fracción de unidad que cabe: 1,3125 h en la inducción (adapt) y 2,625 h en el resto de F4; cada unidad
//   partida suma 5,25 h y Σ 1/n = 1 (antes refuerzo/uw_random/incorrectas/consolidación ponían 2,625 h también en la inducción: REF0/REF1 =
//   26,25 h en 2 semanas «al 50 %»). Un contenido partido en 4 = partes 1-2 «PRE-TEST + DEEP PRIME» y 3-4 «CONSOLIDACIÓN» con rótulo
//   «PARTE k/4» (antes 1/4 deep prime y 3 × «PARTE 2 · CONSOLIDACIÓN»: el material nuevo se quedaba en 79′ de 157,5′).
{
  const mal = [];
  const porUid = {};
  for (const x of DIAS_T2.filter((y) => y.parte)) {
    const [k, n] = x.parte.split('/').map(Number);
    const hEsp = x.adapt ? 1.3125 : 2.625;
    if (x.h !== hEsp) mal.push(`T${x.t} ${x.tipo} ${x.parte}${x.adapt ? ' (inducción)' : ''}: h ${x.h} ≠ ${hEsp}`);
    if (x.adapt && n !== 4) mal.push(`T${x.t}: parte ${x.parte} en la inducción (esperado k/4)`);
    if (x.tipo === 'contenido' && !x.dF1 && n === 4) {
      const ok4 = k <= 2 ? x.sub.includes(`PARTE ${k}/4 · `) && /DEEP PRIME/.test(x.sub) && x.qDia === (k === 1 ? 10 : 0) : x.sub.includes(`PARTE ${k}/4 · CONSOLIDACIÓN`) && x.qDia === 20;
      if (!ok4) mal.push(`T${x.t} ${x.uid} ${x.parte}: reparto del contenido en 4 ≠ 1-2 pre-test + deep prime · 3-4 consolidación`);
    }
    if (x.uid) (porUid[x.uid] = porUid[x.uid] || []).push(x);
  }
  for (const [uid, xs] of Object.entries(porUid)) {
    const frac = xs.reduce((a, x) => a + 1 / Number(x.parte.split('/')[1]), 0), h = xs.reduce((a, x) => a + x.h, 0);
    if (Math.abs(frac - 1) > 1e-9 || Math.abs(h - 5.25) > 1e-9) mal.push(`${uid}: Σ partes ${frac.toFixed(3)} u · Σ h ${h} (esperado 1 u · 5,25 h)`);
  }
  const ind = DIAS_T2.filter((x) => x.adapt);
  ok(mal.length === 0, 'F4 · inducción del SERUMS: filas partidas a 1,3125 h (inducción) / 2,625 h (resto de F4), cada unidad = 5,25 h, contenido en 4 = 2 de pre-test + deep prime + 2 de consolidación',
    mal.length ? mal.slice(0, 8).join(' · ') : `${ind.length} filas de inducción (${ind[0] ? ind[0].fecha : '—'} → ${ind.length ? ind[ind.length - 1].fecha : '—'}) = ${ind.reduce((a, x) => a + x.h, 0)} h · ${Object.keys(porUid).length} unidades partidas`);
}

// ── v6.05 (24-oct, verificación adversarial) · guía USMLE (src/lib/usmleGuia.ts, generada por gen_usmle_guia.js) ──
//   (a) la cola de vídeo al cierre de F1 (META.colaAlCierreF1) NO se queda sin día: cada tramo tiene que verse, entero, en pasos de la guía
//       de fechas del TRAMO 2 (filas de DIAS_T2) — FALLA si la cola no está vacía y ninguna fila la referencia (v6.05 antes del fix: 82′ de
//       B&B + 61′ de Palmerton citados solo en un aviso «→ TRAMO 2») · y la cola al cierre de la guía (colaAlCierreTramo2) es [];
//   (b) cada fila desplazada de F1 al tramo 2 tiene su guía en su fecha T con las 7 franjas USMLE de F3 y Σ pasos = franja (antes: las
//       guías de los v6.04 D47-D49 desaparecieron con el corrimiento); (c) ninguna fecha de la guía queda huérfana (sin fila del plan ni fin
//       de semana de F1) y todo bloque del tramo 2 cae en una franja USMLE de F3.
{
  const G = cargarModuloTS(path.join('src', 'lib', 'usmleGuia.ts'));
  const M = G.GUIA_USMLE_META;
  const seg = (t) => t.split(':').map(Number).reduce((a, x) => a * 60 + x, 0);
  const minF = (fr) => { const m = /^(\d\d):(\d\d)–(\d\d):(\d\d)$/.exec(fr); return m ? (+m[3] * 60 + +m[4]) - (+m[1] * 60 + +m[2]) : NaN; };
  const fechasT = new Set(DIAS_T2.map((x) => x.fecha));
  const tramosT = [];
  for (const f of G.GUIA_USMLE_FECHAS.filter((x) => fechasT.has(x))) for (const g of G.guiaUsmleDe(f)) for (const p of g.pasos) {
    let tipo = 'bb', m = /^B&B Step 1 › (.+?) (?:\((\d+:\d\d)\)$|de (\d+:\d\d) a (\d+:\d\d) \(dura)/.exec(p.que);
    if (!m) { tipo = 'palm'; m = /^Palmerton · «(.+?)» (?:\(([\d:]+)\)$|de ([\d:]+) a ([\d:]+) \(dura)/.exec(p.que); }
    if (!m) continue;
    const de = (/PENDIENTE del ([DT]\d+)|visión del sistema \(([DT]\d+)\)/.exec(p.como) || []).slice(1).find(Boolean) || null;
    tramosT.push({ tipo, titulo: m[1], ini: m[2] ? 0 : seg(m[3]), fin: m[2] ? seg(m[2]) : seg(m[4]), de, donde: `${f} ${g.franja}` });
  }
  const cola = (M.colaAlCierreF1 || []).map((s0) => {
    const b = /^B&B Step 1 › (.+) (\d+:\d\d)→(\d+:\d\d) \(([DT]\d+)\)$/.exec(s0), pl = /^Palmerton «(.+)» ([\d:]+)→([\d:]+) \(([DT]\d+)\)$/.exec(s0), m = b || pl;
    return m ? { s0, tipo: b ? 'bb' : 'palm', titulo: m[1], ini: seg(m[2]), fin: seg(m[3]), de: m[4] } : { s0, malFormado: true };
  });
  const sinDia = [], dondes = [];
  for (const it of cola) {
    if (it.malFormado) { sinDia.push(`${it.s0} (formato)`); continue; }
    const xs = tramosT.filter((t) => t.tipo === it.tipo && t.titulo === it.titulo && t.de === it.de && t.fin > it.ini && t.ini < it.fin).sort((a, b) => a.ini - b.ini);
    let cur = it.ini; for (const t of xs) if (t.ini <= cur && t.fin > cur) cur = t.fin;
    if (cur < it.fin) sinDia.push(`${it.s0} (cubierto hasta ${cur}s de ${it.fin}s)`); else dondes.push(`${it.titulo.split(' › ').pop()} → ${[...new Set(xs.map((t) => t.donde))].join(' + ')}`);
  }
  ok(sinDia.length === 0 && Array.isArray(M.colaAlCierreTramo2) && M.colaAlCierreTramo2.length === 0,
    'guía USMLE · la cola de vídeo al cierre de F1 se ve ENTERA en fechas del tramo 2 (pasos de la guía) y la cola al cierre de la guía está vacía',
    sinDia.length ? 'SIN DÍA: ' + sinDia.join(' · ') : !Array.isArray(M.colaAlCierreTramo2) ? 'falta META.colaAlCierreTramo2' : M.colaAlCierreTramo2.length ? 'queda: ' + M.colaAlCierreTramo2.join(' · ') : cola.length ? dondes.join(' · ') : 'cola vacía');
  // (b) desplazadas con guía en su fecha T (plantilla F3)
  const FR_F3 = ['05:00–05:45', '07:15–08:15', '08:15–09:00', '09:00–11:00', '11:00–12:00', U.FRANJA_F3_REENTRADA.hora, '18:00–18:45'];
  const despl = DIAS_T2.filter((x) => x.tipo === 'contenido' && /^DE F1 → TRAMO 2/.test(x.sub));
  const malG = [];
  for (const x of despl) {
    const gs = G.guiaUsmleDe(x.fecha);
    const faltan = FR_F3.filter((fr) => !gs.some((g) => g.franja === fr));
    if (faltan.length) malG.push(`T${x.t} ${x.fecha}: faltan ${faltan.join(', ')}`);
    for (const g of gs) if (g.pasos.reduce((a, q) => a + q.min, 0) !== g.totalMin || g.totalMin !== minF(g.franja)) malG.push(`T${x.t} ${g.franja}: Σ pasos ≠ franja`);
    const dp = gs.find((g) => g.franja === '09:00–11:00');
    if (dp && !dp.titulo.includes(x.subV520.slice(0, 30))) malG.push(`T${x.t}: el deep prime no es el subtema v5.20 D${x.dOrig}`);
  }
  // (c) fechas huérfanas y franjas del tramo 2 fuera de F3
  const F1F = new Set(DIAS.map((x) => x.fecha));
  const finde = (iso) => iso >= DIAS[0].fecha && iso <= DIAS[DIAS.length - 1].fecha && [0, 6].includes(new Date(iso + 'T12:00:00Z').getUTCDay());
  const filaT = Object.fromEntries(DIAS_T2.map((x) => [x.fecha, x]));
  const huerf = G.GUIA_USMLE_FECHAS.filter((f) => !F1F.has(f) && !finde(f) && !(filaT[f] && filaT[f].fase === 'F3'));
  const fuera = [];
  for (const f of G.GUIA_USMLE_FECHAS.filter((x) => filaT[x])) for (const g of G.guiaUsmleDe(f)) {
    const h = /\((\d\d:\d\d)-(\d\d:\d\d)\)/.exec(filaT[f].tipo === 'hito' ? filaT[f].sub : '');
    const val = [...FR_F3, '07:15–07:45', ...(h ? [`${h[1]}–${h[2]}`] : [])];
    if (!val.includes(g.franja)) fuera.push(`${f} ${g.franja}`);
  }
  ok(malG.length === 0 && despl.length === DESPL.length && huerf.length === 0 && fuera.length === 0,
    `guía USMLE · las ${despl.length} filas desplazadas de F1 tienen guía en su fecha T (7 franjas USMLE de F3, Σ pasos = franja) · 0 fechas huérfanas · franjas del tramo 2 dentro de F3`,
    [...malG, ...huerf.map((f) => `huérfana ${f}`), ...fuera.map((f) => `fuera de F3 ${f}`)].slice(0, 8).join(' · ') || `${G.GUIA_USMLE_FECHAS.length} fechas (${G.GUIA_USMLE_FECHAS.filter((f) => filaT[f]).length} del tramo 2: ${(M.guiaTramo2 || []).map((t) => t.split(' ')[0]).join(', ')}${(M.colaTramo2 || []).length ? ` + cola ${M.colaTramo2.map((t) => t.split(' ')[0]).join(', ')}` : ''})`);
}

// ── obsidianMap / diaInicio / textos ──
{
  const obs = fs.readFileSync(path.join(ROOT, 'src', 'lib', 'obsidianMap.ts'), 'utf8');
  const map = JSON.parse(obs.match(/export const USMLE_OBS_DAY: Record<number, string> = (\{.*?\});/s)[1]);
  const ds = new Set(DIAS_TODOS.map((x) => x.d));
  const huerfanas = Object.keys(map).filter((k) => !ds.has(Number(k)));
  const old = JSON.parse(fs.readFileSync(path.join(__dirname, 'obs_day_v520.json'), 'utf8')).USMLE_OBS_DAY;
  const faltan = DIAS_T2.filter((x) => x.dOrig && old[x.dOrig] && map[x.d] !== old[x.dOrig]).map((x) => 'T' + x.t);
  // v6.01: cada fila de F1 hereda la nota de su origen (posición en el orden de F1); la bioestadística desplazada, por su dOrig 79
  // v6.02: el origen es el de la colocación (D52 = v5.20 D55, hito: sin nota); las desplazadas heredan por su dOrig (filas T)
  const origen = (x) => (typeof COLOC.enF1[x.d - 1] === 'number' ? COLOC.enF1[x.d - 1] : null);
  const f1 = DIAS.filter((x) => (origen(x) ? old[origen(x)] : undefined) !== map[x.d]).map((x) => 'D' + x.d);
  const t79 = DIAS_T2.find((x) => x.dOrig === 79), f79 = DIAS.find((x) => origen(x) === 79);
  const ok79 = (t79 ? map[t79.d] === old[79] : true) && (f79 ? map[f79.d] === old[79] : true) && (t79 || f79);
  ok(huerfanas.length === 0 && faltan.length === 0 && f1.length === 0 && ok79, `obsidianMap · USMLE_OBS_DAY: claves = d existentes · D1-D${DIAS.length} = nota de su origen v5.20 · bioestadística (v5.20 D79) = ${t79 ? 'T' + t79.t + ' d ' + t79.d : f79 ? 'D' + f79.d : '—'} · filas T con dOrig = nota de su D`, `${Object.keys(map).length} claves`);
  const plan = fs.readFileSync(path.join(ROOT, 'src', 'lib', 'usmleStep1Plan.ts'), 'utf8');
  const di = [...plan.matchAll(/sistema: '([^']+)'[^\n]*?diaInicio: (\d+)/g)].map((m) => [m[1], Number(m[2])]);
  const diMal = di.filter(([, d]) => !ds.has(d));
  ok(di.length === 14 && diMal.length === 0, 'usmleStep1Plan · los 14 diaInicio apuntan a un d de DIAS_TODOS', di.map(([s, d]) => `${s.split(' ')[0]} ${d}`).join(' · '));
  const restos = [];
  for (const rel of ['src/lib/usmleStep1Daily.ts', 'src/lib/usmleStep1Plan.ts']) {
    const t = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n').filter((l) => !/v5\.\d\d:/.test(l)).join('\n');
    for (const re of [/examen lun 22-feb/, /22-feb/, /D9[0-5][^\n]{0,60}\bfeb\b/]) if (re.test(t)) restos.push(`${rel} ${re}`);
  }
  ok(restos.length === 0, 'textos · 0 apariciones de «examen lun 22-feb», «22-feb» ni «D9x … feb» fuera de bitácora v5.xx:', restos.join(' · '));
  // v6.01: 0 restos de la F1 v6.00 (D1 mié 7-oct, 60 filas, D58-D60, C1/C2 vivos) en los ficheros de USMLE/Home fuera de las líneas de
  //   bitácora («v5.xx:», «v6.00 (…»/«v6.00:», «v6.01», «corrimiento») y de los datos LEGADOS sin uso (UNIDADES de usmleStep1Plan).
  const FICHEROS_TXT = ['src/lib/usmleStep1Daily.ts', 'src/lib/usmleStep1Plan.ts', 'src/lib/obsidianMap.ts', 'src/lib/homeBriefing.ts', 'src/lib/usmleScores.ts', 'src/lib/usmleData.ts', 'src/lib/mirUsmleBridge.ts',
    'src/components/study/UsmleTodayPlan.tsx', 'src/components/study/UsmleHub.tsx', ...fs.readdirSync(path.join(ROOT, 'src', 'components', 'home')).filter((x) => /\.tsx?$/.test(x)).map((x) => 'src/components/home/' + x)];
  const RX_V600 = [/mié 7-oct/, /'2026-10-07'/, /D1-D60\b/, /D59-D60/, /\bD60\b/, /Día \d+\/60\b/, /1-60 ·/, /C1\/C2 COLCHÓN F1 \(D59/,
    // v6.02: «mar 20-oct» / «mar 10-nov» / «mar 1-dic» / «mar 22-dic» son hoy días normales de F1 (D2 = mar 20-oct): solo cuentan junto a un NBME
    /NBME 2[5-8][^\n]{0,20}(mar 20-oct|mar 10-nov|mar 1-dic|mar 22-dic)|(mar 20-oct|mar 10-nov|mar 1-dic|mar 22-dic)\)?[^\n]{0,6}NBME/];
  const restos6 = [];
  for (const rel of FICHEROS_TXT) {
    const lineas = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n');
    // bitácora = líneas de comentario con marcador de versión (v5.xx, v6.0x, «corrimiento», LEGADO) y sus líneas de continuación hasta
    // una línea de comentario vacía o el fin/inicio del bloque; en las líneas de código se mira el código y el comentario final aparte
    const MARCA = /v5\.\d\d|v6\.0\d|corrimiento|bitácora|LEGADO/;
    let enBitacora = false;
    lineas.forEach((l0, i) => {
      let l = l0.replace(/\r$/, ''); // v6.02: el worktree es CRLF (core.autocrlf): sin esto el comentario final con marca no se separaba
      const comentario = /^\s*(\/\/|\*|\/\*\*|\{\/\*)/.test(l);
      if (!comentario) { enBitacora = false; const m = l.match(/^(.*?)(\s\/\/\s.*)$/); if (m && MARCA.test(m[2])) l = m[1]; }
      else if (MARCA.test(l)) enBitacora = true;
      else if (/^\s*(\*|\/\/)\s*$/.test(l) || /^\s*\*\/|^\s*\/\*\*/.test(l)) enBitacora = false;
      if ((comentario && enBitacora) || /^\s*\{ dia: \d/.test(l)) return;
      for (const re of RX_V600) if (re.test(l)) { restos6.push(`${rel}:${i + 1} ${re}`); break; }
    });
  }
  ok(restos6.length === 0, 'textos v6.01 · 0 restos de la F1 v6.00 («mié 7-oct», D1-D60, D59-D60, D60, Día n/60, hitos en martes) fuera de bitácora', restos6.slice(0, 10).join(' · '));
  // v6.02: 0 restos de la F1 v6.01 (D1 lun 12-oct, D1-D57, Día n/57, hitos vie 23-oct / vie 13-nov / vie 4-dic, NBME 28 lun 28-dic, gates mié
  //   4-nov / mié 2-dic, deload lun 16-nov, «S n/40», 38 filas de colchón ≈100 h) con la MISMA regla de bitácora
  const RX_V601 = [/lun 12-oct/, /'2026-10-12'/, /D1-D57\b/, /\bD57\b/, /Día \d+\/57\b/, /NBME 25[^\n]{0,20}vie 23-oct|NBME 26[^\n]{0,20}vie 13-nov|NBME 27[^\n]{0,20}vie 4-dic|vie (23-oct|13-nov|4-dic)\)?[^\n]{0,6}NBME/, /NBME 28[^\n]{0,20}lun 28-dic|lun 28-dic\)?[^\n]{0,6}NBME 28/, /mié 4-nov|mié 2-dic/, /'2026-11-16'|lun 16-nov/, /\/40\b(?!%)/, /\b38 filas (COLCHÓN|de colchón)|colchón[^\n]{0,12}\b38 filas|≈ ?100 h\b/];
  const restos7 = [];
  for (const rel of FICHEROS_TXT) {
    const lineas = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n');
    const MARCA = /v5\.\d\d|v6\.0\d|corrimiento|bitácora|LEGADO/;
    let enBitacora = false;
    lineas.forEach((l0, i) => {
      let l = l0.replace(/\r$/, ''); // v6.02: el worktree es CRLF (core.autocrlf): sin esto el comentario final con marca no se separaba
      const comentario = /^\s*(\/\/|\*|\/\*\*|\{\/\*)/.test(l);
      if (!comentario) { enBitacora = false; const m = l.match(/^(.*?)(\s\/\/\s.*)$/); if (m && MARCA.test(m[2])) l = m[1]; }
      else if (MARCA.test(l)) enBitacora = true;
      else if (/^\s*(\*|\/\/)\s*$/.test(l) || /^\s*\*\/|^\s*\/\*\*/.test(l)) enBitacora = false;
      if ((comentario && enBitacora) || /^\s*\{ dia: \d/.test(l) || /^export const DIAS(_T2)?: /.test(l)) return;
      for (const re of RX_V601) if (re.test(l)) { restos7.push(`${rel}:${i + 1} ${re}`); break; }
    });
  }
  ok(restos7.length === 0, 'textos v6.02 · 0 restos de la F1 v6.01 («lun 12-oct», D1-D57, D57, Día n/57, hitos/gates/deload v6.01, «/40», colchón «38 filas ≈100 h») fuera de bitácora', restos7.slice(0, 10).join(' · '));
  // v6.03: 0 restos de la F1 v6.02 (D1 lun 19-oct, D1-D52, Día n/52, NBME 28 = D52, NBME 25-27 en viernes vie 30-oct / vie 20-nov /
  //   vie 11-dic, gates D18 mié 11-nov / D38 mié 9-dic, deload lun 23-nov, colchón «28 filas ≈ 73,5 h», D2 «mar 20-oct») con la MISMA
  //   regla de bitácora. FALLA en los ficheros USMLE de src/lib (ámbito de este verificador: los generados + los de texto USMLE) y solo
  //   AVISA (⚠, sin fallar) en homeBriefing y los componentes, que mantiene otro frente.
  if (F.version !== 'v6.02') {
    const RX_V602 = [/lun 19-oct/, /'2026-10-19'/, /D1-D52\b/, /Día \d+\/52\b/, /F1 1-52\b/, /NBME 28[^\n]{0,24}\bD52\b|\bD52\b[^\n]{0,12}NBME 28|D52 = NBME/,
      /NBME 25[^\n]{0,20}vie 30-oct|NBME 26[^\n]{0,20}vie 20-nov|NBME 27[^\n]{0,20}vie 11-dic|vie (30-oct|20-nov|11-dic)\)?[^\n]{0,6}NBME/,
      // deload v6.02 = lun 23-nov SOLO en contexto de deload (en la v6.03 el lun 23-nov es un día normal de F1: D24)
      /D18 mié 11-nov|D38 mié 9-dic|gates?[^\n]{0,40}(mié 11-nov|mié 9-dic)/i, /'2026-11-23'|deload[^\n]{0,40}lun 23-nov|lun 23-nov[^\n]{0,30}(post-NBME|deload)/i,
      /\b28 filas (COLCHÓN|de colchón)|colchón[^\n]{0,12}\b28 filas|≈ ?73,5 h\b/, /D2 mar 20-oct|mar 20-oct \(D2\)/];
    const PROPIOS = new Set(['src/lib/usmleStep1Daily.ts', 'src/lib/usmleStep1Plan.ts', 'src/lib/obsidianMap.ts', 'src/lib/usmleScores.ts', 'src/lib/usmleData.ts', 'src/lib/mirUsmleBridge.ts', 'src/lib/usmleGuia.ts']);
    const restos8 = [], avisos8 = [];
    for (const rel of [...FICHEROS_TXT, 'src/lib/usmleGuia.ts']) {
      const lineas = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n');
      const MARCA = /v5\.\d\d|v6\.0\d|corrimiento|bitácora|LEGADO/;
      let enBitacora = false;
      lineas.forEach((l0, i) => {
        let l = l0.replace(/\r$/, '');
        const comentario = /^\s*(\/\/|\*|\/\*\*|\{\/\*)/.test(l);
        if (!comentario) { enBitacora = false; const m = l.match(/^(.*?)(\s\/\/\s.*)$/); if (m && MARCA.test(m[2])) l = m[1]; }
        else if (MARCA.test(l)) enBitacora = true;
        else if (/^\s*(\*|\/\/)\s*$/.test(l) || /^\s*\*\/|^\s*\/\*\*/.test(l)) enBitacora = false;
        if ((comentario && enBitacora) || /^\s*\{ dia: \d/.test(l) || /^export const DIAS(_T2)?: /.test(l)) return;
        for (const re of RX_V602) if (re.test(l)) { (PROPIOS.has(rel) ? restos8 : avisos8).push(`${rel}:${i + 1} ${re}`); break; }
      });
    }
    ok(restos8.length === 0, 'textos v6.03 · 0 restos de la F1 v6.02 («lun 19-oct», D1-D52, Día n/52, NBME 28 = D52, NBME en viernes, gates mié 11-nov / mié 9-dic, deload lun 23-nov, colchón «28 filas ≈ 73,5 h») fuera de bitácora en los ficheros USMLE de src/lib', restos8.slice(0, 10).join(' · '));
    if (avisos8.length) console.log(`⚠ textos v6.03 · restos de la F1 v6.02 en ficheros de OTRO frente (no falla; avisar al orquestador): ${avisos8.join(' · ')}`);
  }
  // v6.04: 0 restos del EXAMEN v6.03 (lun 27-sep como examen, GO/NO-GO lun 9-ago, ritual sáb 25-sep, viaje dom 26-sep, T158/«/158», d 101-258,
  //   colchón «24 filas ≈ 63 h», ventana «31-ago → 27-sep», «S n/39») fuera de bitácora; el lun 27-sep sigue siendo un día de plan (NBME 33) →
  //   solo cuenta junto a «examen». Misma regla: FALLA en los ficheros USMLE de src/lib y AVISA (⚠) en homeBriefing y los componentes.
  if (F.step1.examen !== '2027-09-27') {
    // «examen» pegado a la fecha (el permiso de examen «lun 27-sep a más tardar» = E-28 de la v6.04 es legítimo) + textos del NBME 28 / GO/NO-GO
    const RX_V603 = [/\bexamen( Step 1| USMLE)?( target| objetivo)?:? (el )?(lun )?27-sep|\b27-sep(-2027)?\)?[^\n]{0,4}\bexamen\b|EN RUTA 27-sep|27-sep con GATE|h al 27-sep/i,/GO\/NO-GO[^\n]{0,30}\b9-ago|\b9-ago[^\n]{0,15}GO\/NO-GO/, /ritual[^\n]{0,25}sáb 25-sep|sáb 25-sep[^\n]{0,25}ritual/,
      /viaje[^\n]{0,25}dom 26-sep|dom 26-sep[^\n]{0,25}viaje/, /\bT1-T158\b|\bT158\b|\/158\b|d 101-258|101-258\b/, /\b24 filas (COLCHÓN|de colchón)|colchón[^\n]{0,12}\b24 filas|≈ ?63 h\b/,
      /31-ago → 27-sep|adelanto 2027-08-31|base 2027-09-27/, /\bS\d+\/39\b|n\/39\b/];
    const PROPIOS9 = new Set(['src/lib/usmleStep1Daily.ts', 'src/lib/usmleStep1Plan.ts', 'src/lib/obsidianMap.ts', 'src/lib/usmleScores.ts', 'src/lib/usmleData.ts', 'src/lib/mirUsmleBridge.ts', 'src/lib/usmleGuia.ts']);
    const restos9 = [], avisos9 = [];
    for (const rel of [...FICHEROS_TXT, 'src/lib/usmleGuia.ts']) {
      const lineas = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n');
      const MARCA = /v5\.\d\d|v6\.0\d|corrimiento|bitácora|LEGADO/;
      let enBitacora = false;
      lineas.forEach((l0, i) => {
        let l = l0.replace(/\r$/, '');
        const comentario = /^\s*(\/\/|\*|\/\*\*|\{\/\*)/.test(l);
        if (!comentario) { enBitacora = false; const m = l.match(/^(.*?)(\s\/\/\s.*)$/); if (m && MARCA.test(m[2])) l = m[1]; }
        else if (MARCA.test(l)) enBitacora = true;
        else if (/^\s*(\*|\/\/)\s*$/.test(l) || /^\s*\*\/|^\s*\/\*\*/.test(l)) enBitacora = false;
        if ((comentario && enBitacora) || /^\s*\{ dia: \d/.test(l) || /^export const DIAS(_T2)?: /.test(l)) return;
        for (const re of RX_V603) if (re.test(l)) { (PROPIOS9.has(rel) ? restos9 : avisos9).push(`${rel}:${i + 1} ${re}`); break; }
      });
    }
    ok(restos9.length === 0, 'textos v6.04 · 0 restos del examen v6.03 (examen lun 27-sep, GO/NO-GO lun 9-ago, ritual sáb 25-sep, viaje dom 26-sep, T158, colchón «24 filas ≈ 63 h», ventana 31-ago → 27-sep, «/39») fuera de bitácora en los ficheros USMLE de src/lib', restos9.slice(0, 12).join(' · '));
    if (avisos9.length) console.log(`⚠ textos v6.04 · restos del examen v6.03 en ficheros de OTRO frente (no falla; avisar al orquestador): ${avisos9.join(' · ')}`);
  }
  // v6.05: 0 restos de la F1 v6.03/v6.04 (D1 mié 21-oct, UWSA1 alias / D2 jue 22-oct, D1-D50, Día n/50, F1 1-50, NBME 28 = D50, NBME 25-27 en
  //   martes mar 3-nov / mar 24-nov / mar 15-dic, gates D18 vie 13-nov / D38 vie 11-dic, colchón «48 filas ≈ 126 h», desplazadas T3-T10 /
  //   d 103-110, «S n/43») fuera de bitácora. Misma regla: FALLA en los ficheros USMLE de src/lib y AVISA (⚠) en homeBriefing y los componentes.
  if (F.f1.inicio !== '2026-10-21') {
    const RX_V604 = [/mié 21-oct/, /'2026-10-21'/, /D2 jue 22-oct|jue 22-oct \(D2\)|UWSA1[^\n]{0,30}jue 22-oct|jue 22-oct[^\n]{0,30}UWSA1/, /D1-D50\b/, /Día \d+\/50\b/, /F1 1-50\b/,
      /NBME 28[^\n]{0,24}\bD50\b|\bD50\b[^\n]{0,12}NBME 28|D50 = NBME/, /NBME 25[^\n]{0,20}mar 3-nov|NBME 26[^\n]{0,20}mar 24-nov|NBME 27[^\n]{0,20}mar 15-dic|mar (3-nov|24-nov|15-dic)\)?[^\n]{0,6}NBME/,
      /D18 vie 13-nov|D38 vie 11-dic|gates?[^\n]{0,40}(vie 13-nov|vie 11-dic)/i, /\b48 filas (COLCHÓN|de colchón)|colchón[^\n]{0,12}\b48 filas|≈ ?126 h\b/, /\bT3-T10\b|\bd 103-110\b/, /\bS\d+\/43\b|n\/43\b/];
    const PROPIOS10 = new Set(['src/lib/usmleStep1Daily.ts', 'src/lib/usmleStep1Plan.ts', 'src/lib/obsidianMap.ts', 'src/lib/usmleScores.ts', 'src/lib/usmleData.ts', 'src/lib/mirUsmleBridge.ts', 'src/lib/usmleGuia.ts']);
    const restos10 = [], avisos10 = [];
    for (const rel of [...FICHEROS_TXT, 'src/lib/usmleGuia.ts']) {
      const lineas = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n');
      const MARCA = /v5\.\d\d|v6\.0\d|corrimiento|bitácora|LEGADO/;
      let enBitacora = false;
      lineas.forEach((l0, i) => {
        let l = l0.replace(/\r$/, '');
        const comentario = /^\s*(\/\/|\*|\/\*\*|\{\/\*)/.test(l);
        if (!comentario) { enBitacora = false; const m = l.match(/^(.*?)(\s\/\/\s.*)$/); if (m && MARCA.test(m[2])) l = m[1]; }
        else if (MARCA.test(l)) enBitacora = true;
        else if (/^\s*(\*|\/\/)\s*$/.test(l) || /^\s*\*\/|^\s*\/\*\*/.test(l)) enBitacora = false;
        if ((comentario && enBitacora) || /^\s*\{ dia: \d/.test(l) || /^export const DIAS(_T2)?: /.test(l)) return;
        for (const re of RX_V604) if (re.test(l)) { (PROPIOS10.has(rel) ? restos10 : avisos10).push(`${rel}:${i + 1} ${re}`); break; }
      });
    }
    ok(restos10.length === 0, 'textos v6.05 · 0 restos de la F1 v6.03/v6.04 (D1 mié 21-oct, jue 22-oct = D2/UWSA1, D1-D50, Día n/50, NBME 28 = D50, NBME en martes, gates vie 13-nov / vie 11-dic, colchón «48 filas ≈ 126 h», T3-T10, «/43») fuera de bitácora en los ficheros USMLE de src/lib', restos10.slice(0, 12).join(' · '));
    if (avisos10.length) console.log(`⚠ textos v6.05 · restos de la F1 v6.03/v6.04 en ficheros de OTRO frente (no falla; avisar al orquestador): ${avisos10.join(' · ')}`);
  }
  // v6.06: 0 restos de la F1 v6.05 (D1 lun 26-oct, D1-D47, Día n/47, F1 1-47, NBME 28 = D47, NBME 25 vie 6-nov, NBME 26 vie 27-nov, NBME 27 =
  //   D40 (hoy D35), gates D18 mié 18-nov / D38 mié 16-dic, colchón «42 filas ≈ 110 h», desplazadas T3-T13 / d 103-113, «S n/42») fuera de
  //   bitácora. El vie 18-dic sigue siendo el NBME 27 (misma fecha) y no cuenta. Misma regla: FALLA en los ficheros USMLE de src/lib y AVISA
  //   (⚠) en homeBriefing y los componentes, que mantiene otro frente.
  if (F.f1.inicio !== '2026-10-26') {
    const RX_V605 = [/lun 26-oct(?!-2027)/, /'2026-10-26'/, /D1-D47\b/, /Día \d+\/47\b/, /F1 1-47\b/, /NBME 28[^\n]{0,24}\bD47\b|\bD47\b[^\n]{0,12}NBME 28|D47 = NBME/,
      /NBME 25[^\n]{0,20}vie 6-nov|NBME 26[^\n]{0,20}vie 27-nov|vie (6-nov|27-nov)\)?[^\n]{0,6}NBME/, /NBME 27[^\n]{0,12}\bD40\b|\bD40\b[^\n]{0,12}NBME 27/,
      /D18 mié 18-nov|D38 mié 16-dic|gates?[^\n]{0,40}(mié 18-nov|mié 16-dic)/i, /\b42 filas (COLCHÓN|de colchón)|colchón[^\n]{0,12}\b42 filas|≈ ?110 h\b/, /\bT3-T13\b|\bd 103-113\b/, /\bS\d+\/42\b/];
    const PROPIOS11 = new Set(['src/lib/usmleStep1Daily.ts', 'src/lib/usmleStep1Plan.ts', 'src/lib/obsidianMap.ts', 'src/lib/usmleScores.ts', 'src/lib/usmleData.ts', 'src/lib/mirUsmleBridge.ts', 'src/lib/usmleGuia.ts']);
    const restos11 = [], avisos11 = [];
    for (const rel of [...FICHEROS_TXT, 'src/lib/usmleGuia.ts']) {
      const lineas = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n');
      const MARCA = /v5\.\d\d|v6\.0\d|corrimiento|bitácora|LEGADO/;
      let enBitacora = false;
      lineas.forEach((l0, i) => {
        let l = l0.replace(/\r$/, '');
        const comentario = /^\s*(\/\/|\*|\/\*\*|\{\/\*)/.test(l);
        if (!comentario) { enBitacora = false; const m = l.match(/^(.*?)(\s\/\/\s.*)$/); if (m && MARCA.test(m[2])) l = m[1]; }
        else if (MARCA.test(l)) enBitacora = true;
        else if (/^\s*(\*|\/\/)\s*$/.test(l) || /^\s*\*\/|^\s*\/\*\*/.test(l)) enBitacora = false;
        if ((comentario && enBitacora) || /^\s*\{ dia: \d/.test(l) || /^export const DIAS(_T2)?: /.test(l)) return;
        for (const re of RX_V605) if (re.test(l)) { (PROPIOS11.has(rel) ? restos11 : avisos11).push(`${rel}:${i + 1} ${re}`); break; }
      });
    }
    ok(restos11.length === 0, 'textos v6.06 · 0 restos de la F1 v6.05 (D1 lun 26-oct, D1-D47, Día n/47, NBME 28 = D47, NBME 25 vie 6-nov / 26 vie 27-nov, NBME 27 = D40, gates mié 18-nov / mié 16-dic, colchón «42 filas ≈ 110 h», T3-T13, «S n/42») fuera de bitácora en los ficheros USMLE de src/lib', restos11.slice(0, 12).join(' · '));
    if (avisos11.length) console.log(`⚠ textos v6.06 · restos de la F1 v6.05 en ficheros de OTRO frente (no falla; avisar al orquestador): ${avisos11.join(' · ')}`);
  }
}

fs.rmSync(TMP, { recursive: true, force: true });
console.log(fallos.length ? `\n✗ ${fallos.length} verificación(es) FALLAN: ${fallos.join(' | ')}` : '\n✓ todas las verificaciones del Lote 1A pasan');
process.exit(fallos.length ? 1 : 0);
