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
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const V6 = require('../gen_fechas_v6');
const { ROOT, cargarUsmleDaily, cargarFechasV6TS } = require('./cargar_ts');
const { ORIGEN_F1_TEMARIO, F1_FILAS_V600 } = require('./gen_tramo2');

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
const F1F = ESC.f1Filas != null ? ESC.f1Filas : F1_FILAS_V600; // v6.01: filas de temario de F1 (57) → --f1-filas de la referencia
const DESPL = ESC.desplazadasF1 || [];
const posDespl = DESPL.map((d) => ORIGEN_F1_TEMARIO.indexOf(d) + 1);
const REF_BASE = F1F === F1_FILAS_V600 ? 'tramo2_14mar_27sep.json' : 'tramo2_14mar_27sep_v601.json';
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
  // escenario base = sin congelado, sin recuperaciones F1 (solo las posiciones desplazadas), sin protegidos extra, fechas base
  const base = !ESC.congelarHasta && ESC.pendientesF1.every((d) => posDespl.includes(d)) && !ESC.protegExtra.length && ESC.encaps === '2027-03-14' && ESC.examen === '2027-09-27' && ESC.serums === '2027-05-03';
  if (base) {
    const d2 = difFilas(DIAS_T2, JSON.parse(fs.readFileSync(path.join(REF, REF_BASE), 'utf8')));
    ok(d2.length === 0, `V2 · DIAS_T2 = ref_v6/${REF_BASE} (escenario base, --f1-filas ${F1F}) en todas las claves`, d2.length ? d2.slice(0, 8).join(' · ') : '0 diferencias');
  } else console.log('⚠ V2: escenario no base (congelado / recuperaciones F1 / protegidos extra): solo se compara con la regeneración de la referencia');
}

// ── V2+ · matriz port vs referencia (§B3 «Otros escenarios» + pruebas de regen) ──
if (!argv.includes('--sin-matriz')) {
  const base = path.join(REF, REF_BASE);
  const F1A = ['--f1-filas', String(F1F)]; // v6.01: todos los escenarios con las filas de F1 vigentes (port y referencia)
  const MATRIZ = [
    ['14-mar → 27-sep (base)', ['2027-03-14', '2027-09-27']],
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
    ['SERUMS jue 6-may (14-mar → 27-sep)', ['2027-03-14', '2027-09-27', '2027-05-06']],
    ['--proteg 2027-05-10 (adjudicación)', ['2027-03-14', '2027-09-27', '--proteg', '2027-05-10']],
    ['--pendientes-f1 17,58', ['2027-03-14', '2027-09-27', '--pendientes-f1', '17,58']],
    ['--pendientes-f1 17,23 (recuperaciones + la desplazada)', ['2027-03-14', '2027-09-27', '--pendientes-f1', '17,23']],
    ['NO-GO base 27-sep → 25-oct (≤ 9-ago)', ['2027-03-14', '2027-10-25', '--congelar-hasta', '2027-08-09', '--previo', base, '--examen-previo', '2027-09-27']],
    ['SERUMS 3 → 6-may con congelado ≤ 2-may', ['2027-03-14', '2027-09-27', '2027-05-06', '--congelar-hasta', '2027-05-02', '--previo', base]],
    ['colchón agotado --pendientes UR84,C80 (≤ 11-ago)', ['2027-03-14', '2027-09-27', '--congelar-hasta', '2027-08-11', '--previo', base, '--pendientes', 'UR84,C80']],
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
  {
    const V600 = ['--f1-filas', String(F1_FILAS_V600)], base600 = path.join(REF, 'tramo2_14mar_27sep.json');
    const COMPAT = [
      ['base v6.00', ['2027-03-14', '2027-09-27']],
      ['14-mar → 31-ago', ['2027-03-14', '2027-08-31']],
      ['--pendientes-f1 17,58', ['2027-03-14', '2027-09-27', '--pendientes-f1', '17,58']],
      ['NO-GO base 27-sep → 25-oct (≤ 9-ago)', ['2027-03-14', '2027-10-25', '--congelar-hasta', '2027-08-09', '--previo', base600, '--examen-previo', '2027-09-27']],
      ['SERUMS 3 → 6-may con congelado ≤ 2-may', ['2027-03-14', '2027-09-27', '2027-05-06', '--congelar-hasta', '2027-05-02', '--previo', base600]],
      ['colchón agotado --pendientes UR84,C80 (≤ 11-ago)', ['2027-03-14', '2027-09-27', '--congelar-hasta', '2027-08-11', '--previo', base600, '--pendientes', 'UR84,C80']],
    ];
    const malC = [];
    COMPAT.forEach(([nombre, args0], i) => {
      const args = [...args0, ...V600];
      const p = correr(path.join(__dirname, 'gen_tramo2.js'), args, 'c' + i + '_port'), r = correr(path.join(REF, 'gen_tramo2_ref.js'), args, 'c' + i + '_ref');
      const d = p.out && r.out ? difFilas(p.out, r.out) : ['sin salida'];
      if (p.status !== r.status || d.length) malC.push(`${nombre}: exit ${p.status}/${r.status} · ${d.slice(0, 3).join(' · ')}`);
    });
    const dBase = fs.existsSync(path.join(TMP, 'c0_port.json')) ? difFilas(JSON.parse(fs.readFileSync(path.join(TMP, 'c0_port.json'), 'utf8')), JSON.parse(fs.readFileSync(base600, 'utf8'))) : ['sin salida'];
    ok(malC.length === 0 && dBase.length === 0, `V2+ · compatibilidad v6.00 (--f1-filas 58): port = referencia en ${COMPAT.length} escenarios · base = tramo2_14mar_27sep.json`, [...malC, ...dBase.slice(0, 3)].join(' | ') || '0 diferencias');
    // contraste con las salidas guardadas por la espec (v600/espec/regen), si se pasa --regen <dir>
    const dirRegen = opt('--regen');
    if (dirRegen && fs.existsSync(dirRegen)) {
      let iguales = 0, total = 0; const md = [];
      COMPAT.forEach(([nombre], i) => {
        if (!REGEN[nombre]) return;
        const file = path.join(dirRegen, REGEN[nombre]); if (!fs.existsSync(file)) return;
        const mine = path.join(TMP, 'c' + i + '_port.json');
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

// ── F1 = v5.20 (v6.01: contenido por posición en el orden de F1 · fechas = hábiles de F1 · niveles por la regla) ──
{
  const CAMPOS_CONT = ['system', 'tier', 'sub', 'bbCh', 'bbVid', 'uw', 'mat', 'matType', 'palm'];
  const HORA = new Set([10, 25, 40, 55]);
  const ORIGEN_F1 = [...ORIGEN_F1_TEMARIO, 'C1', 'C2'];
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
  const horas = [...HORA].filter((d) => d <= DIAS.length).map((d) => DIAS[d - 1].sub.includes('(07:00-12:30)') && byD[d].sub.replace('(07:15-11:00)', '(07:00-12:30)') === DIAS[d - 1].sub);
  const uwsa1 = /UWSA1/.test(DIAS[0].sub) && DIAS[0].sub.includes('09:00-13:00');
  ok(dif.length === 0 && horas.length === 4 && horas.every(Boolean) && uwsa1,
    `F1 · D1-D${DIAS.length} = contenido v5.20 de su posición con fechas = hábiles de F1 (${habF1[0]} → ${habF1[habF1.length - 1]}) y niveles por la regla`,
    dif.length ? dif.slice(0, 8).join(', ') : `${DIAS.length}/${DIAS.length} · sub igual salvo (07:15-11:00) → (07:00-12:30) en D10/D25/D40/D55 · UWSA1 D1 09:00-13:00 · nivelUW/qDia ≠ v5.20 por el día de la semana en ${cambian.length} filas (${cambian.join(' ')})`);
  // hitos F1: D# fijo (UWSA1 D1 · NBME 25 D10 · 26 D25 · 27 D40 · 28 D55) en las fechas del corrimiento
  const hitosF1 = DIAS.filter((x) => /🎯/.test(x.sub)).map((x) => `D${x.d} ${x.fecha}`);
  const HITOS_F1_ESP = F.version === 'v6.01' ? ['D1 2026-10-12', 'D10 2026-10-23', 'D25 2026-11-13', 'D40 2026-12-04', 'D55 2026-12-28'] : hitosF1;
  ok(eq(hitosF1, HITOS_F1_ESP), 'F1 · hitos en su D# (UWSA1 D1 · NBME 25 D10 · 26 D25 · 27 D40 · 28 D55)', hitosF1.join(' · '));
  // lo que no cabe en F1: colchón consumido · temario desplazado al tramo 2 (con dOrig, una vez, antes del contenido de CONT)
  const enF1 = ORIGEN_F1.slice(0, DIAS.length), sobran = ORIGEN_F1.slice(DIAS.length);
  const desplEsp = sobran.filter((o) => typeof o === 'number'), consEsp = sobran.filter((o) => typeof o === 'string');
  const filasDespl = desplEsp.map((d) => DIAS_T2.filter((x) => x.dOrig === d));
  const primerCont = DIAS_T2.find((x) => x.tipo === 'contenido');
  const okDespl = eq(DESPL, desplEsp) && eq(ESC.colchonF1Consumido || [], consEsp) && eq(ESC.f1Filas, enF1.filter((o) => typeof o === 'number').length)
    && filasDespl.every((fs1, k) => fs1.length >= 1 && fs1.every((x) => x.tipo === 'contenido' && x.uid === 'C' + desplEsp[k] && x.subV520 === byD[desplEsp[k]].sub && x.sub.includes(byD[desplEsp[k]].sub) && x.dF1 === undefined
      && ['system', 'tier', 'bbCh', 'bbVid', 'uw', 'mat', 'matType', 'palm'].every((c) => eq(x[c], byD[desplEsp[k]][c]))))
    && (!desplEsp.length || primerCont.dOrig === desplEsp[0])
    && (!desplEsp.includes(79) || (filasDespl[desplEsp.indexOf(79)][0].nivelUW === 1 && filasDespl[desplEsp.indexOf(79)][0].qDia === 30));
  const d79 = DIAS_T2.find((x) => x.dOrig === 79), d79F1 = DIAS.find((x) => x.sub === byD[79].sub);
  ok(okDespl, `F1 · lo que no cabe: colchón consumido [${consEsp.join(', ') || '—'}] · temario desplazado al tramo 2 [${desplEsp.map((d) => 'D' + d).join(', ') || '—'}]`,
    d79 ? `v5.20 D79 → T${d79.t} ${d79.fecha} (d ${d79.d}, uid ${d79.uid}, N${d79.nivelUW}·${d79.qDia}Q, 1.ª fila de contenido del tramo 2)` : d79F1 ? `v5.20 D79 en F1 = D${d79F1.d} ${d79F1.fecha}` : '');
  // C1/C2 (solo si caben): campos de §B1
  const C = (n) => ({ system: 'Colchón', tier: 'CORE', sub: `C${n} · COLCHÓN F1: si se perdió un día de D1-D${enF1.filter((o) => typeof o === 'number').length} → hacerlo hoy (el más antiguo); si no → 2.ª pasada de incorrectas de los 9 sistemas (40Q timed) + cerrar Anki antes de la pausa`, bbCh: 'Colchón', bbVid: '—', uw: 'uWorld incorrects (9 sistemas F1)', mat: 'uWorld + Anki', matType: 'clin', palm: null, nivelUW: 4, qDia: 40 });
  const colF1 = DIAS.filter((x) => x.bbCh === 'Colchón');
  const okC = colF1.every((x) => { const { d, fecha, ...resto } = x; const n = Number(x.sub[1]); return eq(resto, C(n)); }) && colF1.length === enF1.filter((o) => typeof o === 'string').length;
  ok(okC, `F1 · colchón F1: ${colF1.length ? colF1.map((x) => 'D' + x.d).join('/') + ' = C1/C2 con los campos de §B1' : 'ninguno (C1/C2 consumidos por el corrimiento)'}`);
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
  ok(diaDeOk && ant && ant.d === nF1 && prev3 && prev3.d === 101 && prevT1 && prevT1.d === nF1 && prevD2 === undefined && eq(v7, [nF1 - 2, nF1 - 1, nF1, 101, 102, 103, 104]),
    'API · diaDe / diaAnterior / diaPrevio / ventana7d por índice en DIAS_TODOS', `diaAnterior(T1)=D${ant && ant.d} · diaPrevio(T3)=d${prev3 && prev3.d} (salta el NBME 29) · ventana7d(${nF1 - 2})=${v7.join(',')}`);
  ok(U.etiquetaDiaUSMLE(DIAS[0]) === 'Día 1/' + nF1 && U.etiquetaDiaUSMLE(T(1)) === 'T1/' + DIAS_T2.length, 'API · etiquetaDiaUSMLE', `${U.etiquetaDiaUSMLE(DIAS[0])} · ${U.etiquetaDiaUSMLE(T(158) || T(1))}`);
  // estado PAUSA (§B2 · §F): T1 nunca es «hoy» durante la pausa
  const est = (iso) => { const e = U.estadoUSMLE(iso); return e.estado + (e.dia ? ':' + (e.dia.t ? 'T' + e.dia.t : 'D' + e.dia.d) + (e.exacto ? '' : '~') : ''); };
  // v6.01: hoy sáb 10-oct → la siguiente fila es el D1 lun 12-oct (no exacta) · vie 25-dic (SKIP) → D55 lun 28-dic · mié 30-dic = D57
  const casos = { '2026-10-06': 'PLAN:D1~', '2026-10-10': 'PLAN:D1~', '2026-10-12': 'PLAN:D1', '2026-12-25': 'PLAN:D55~', '2026-12-30': 'PLAN:D57', '2026-12-31': 'PAUSA', '2027-02-10': 'PAUSA', '2027-03-15': 'PAUSA', '2027-03-16': 'PLAN:T1', '2027-05-09': 'PLAN:T39~', '2027-09-25': 'PLAN:T158', '2027-09-26': 'FIN', '2027-09-27': 'FIN' };
  const estMal = Object.entries(casos).filter(([iso, e]) => est(iso) !== e);
  const pausaSinFila = V6.rango('2026-12-31', '2027-03-15').every((iso) => U.estadoUSMLE(iso).estado === 'PAUSA' && U.diaDe(iso) === undefined);
  ok(estMal.length === 0 && pausaSinFila && U.enPausaStep1('2027-01-04') === true, 'API · estadoUSMLE: PAUSA 31-dic → 15-mar sin fila «hoy» · PLAN (exacta o la siguiente) · FIN tras el ritual', estMal.length ? estMal.map(([i, e]) => `${i}: ${est(i)} ≠ ${e}`).join(' · ') : Object.entries(casos).map(([i]) => `${i.slice(5)} ${est(i)}`).join(' · '));
  const hitos = U.hitosDelPlan();
  ok(hitos.length === 13, 'API · hitosDelPlan() sobre los 2 tramos', hitos.map((x) => (x.t ? 'T' + x.t : 'D' + x.d)).join(' '));
  // DAILY_META (literal de §F para el escenario base)
  const M = U.DAILY_META;
  // v6.01 (10-oct-2026): D1 lun 12-oct · tramo 1 de 57 días · totalDias 57 + 158 = 215 (v6.00: 2026-10-07 · 60 · 218)
  const ESPERADO = { step: 1, version: 'v6.01', inicio: '2026-10-12', fin: '2027-09-25', totalDias: 215, tramos: [{ n: 1, inicio: '2026-10-12', fin: '2026-12-30', dias: 57 }, { n: 2, inicio: '2027-03-16', fin: '2027-09-25', dias: 158, provisional: true }], pausa: { desde: '2026-12-31', hasta: '2027-03-15', motivo: 'ENCAPS intensiva + lunes libre' }, examenTarget: '2027-09-27', examenVentana: 'eligibility ago-sep-oct 2027 · adelanto 2027-08-31 · base 2027-09-27 · plan B 2027-10-25', gonogo: '2027-08-09', descansoD1: '2027-09-26', serumsInicio: '2027-05-03', viernesN4DesdeSemana: 11 };
  const mMal = Object.keys(ESPERADO).filter((k) => !eq(M[k], ESPERADO[k]));
  ok(mMal.length === 0 && typeof M.bloque === 'string' && typeof M.metodo === 'string', 'API · DAILY_META = literal de §F (escenario base, v6.01)', mMal.length ? 'distinto: ' + mMal.join(', ') : `version ${M.version} · inicio ${M.inicio} · tramo 1 ${M.tramos[0].dias} días · examenTarget ${M.examenTarget} · totalDias ${M.totalDias} (informativo)`);
  // USMLE_TAPER (§B6)
  const TP = U.USMLE_TAPER;
  const okTP = eq([TP.d94.t, TP.d94.d, TP.d94.fecha], [156, 256, '2027-09-23']) && eq([TP.d95.t, TP.d95.d, TP.d95.fecha], [157, 257, '2027-09-24']) && eq([TP.ritual.t, TP.ritual.d, TP.ritual.fecha], [158, 258, '2027-09-25'])
    && TP.dMenos1.fecha === '2027-09-26' && TP.examen.fecha === '2027-09-27' && TP.regreso.fecha === '2027-09-28' && TP.dMenos1.pasos.length === 6 && TP.examen.pasos.length === 6
    && TP.fuente === 'PALMERTON_METODO_COMPLETO.md §8.3-§8.4 · ' + F.version && /Free 120 \(lun 13-sep\)/.test(TP.cierre) && /COLCHÓN/.test(TP.burnout) && typeof TP.d94.resumen === 'string';
  ok(okTP, 'API · USMLE_TAPER (§B6)', `D94 T${TP.d94.t} ${TP.d94.fecha} · D95 T${TP.d95.t} ${TP.d95.fecha} · ritual T${TP.ritual.t} · D-1 ${TP.dMenos1.fecha} · examen ${TP.examen.fecha} · regreso ${TP.regreso.fecha}`);
  // FRANJAS (horas sin cambio) + FRANJAS_F4
  ok(eq(U.FRANJAS.map((x) => x.hora), ['05:00–05:45', '07:15–08:15', '08:15–09:00', '09:00–11:00', '11:00–12:00', '18:00–18:45']) && U.FRANJA_F3_REENTRADA.hora === '16:15–17:15', 'API · FRANJAS F1/F3 con las horas de siempre + FRANJA_F3_REENTRADA 16:15-17:15');
  const PL = ['M', 'T', 'L', 'G', 'H', 'H-sáb'];
  const f4Mal = PL.filter((p) => !U.FRANJAS_F4[p] || !U.FRANJAS_F4[p].some((x) => x.frente === 'mir' && /1 h/.test(x.fase)) || !U.FRANJAS_F4[p].some((x) => x.frente === 'research-derma' && /30'/.test(x.fase)));
  ok(eq(Object.keys(U.FRANJAS_F4), PL) && f4Mal.length === 0, 'API · FRANJAS_F4 M/T/L/G/H/H-sáb: MIR 1 h y R↔D 30\' en todas (DJ-4)', f4Mal.length ? 'faltan en ' + f4Mal.join(',') : PL.map((p) => `${p} ${U.FRANJAS_F4[p].length}`).join(' · '));
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
  const origen = (x) => (x.bbCh === 'Colchón' ? null : ORIGEN_F1_TEMARIO[x.d - 1]);
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
  const RX_V600 = [/mié 7-oct/, /'2026-10-07'/, /D1-D60\b/, /D59-D60/, /\bD60\b/, /Día \d+\/60\b/, /1-60 ·/, /C1\/C2 COLCHÓN F1 \(D59/, /mar 20-oct|mar 10-nov|mar 1-dic|mar 22-dic/];
  const restos6 = [];
  for (const rel of FICHEROS_TXT) {
    const lineas = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n');
    // bitácora = líneas de comentario con marcador de versión (v5.xx, v6.0x, «corrimiento», LEGADO) y sus líneas de continuación hasta
    // una línea de comentario vacía o el fin/inicio del bloque; en las líneas de código se mira el código y el comentario final aparte
    const MARCA = /v5\.\d\d|v6\.0\d|corrimiento|bitácora|LEGADO/;
    let enBitacora = false;
    lineas.forEach((l0, i) => {
      let l = l0;
      const comentario = /^\s*(\/\/|\*|\/\*\*|\{\/\*)/.test(l);
      if (!comentario) { enBitacora = false; const m = l.match(/^(.*?)(\s\/\/\s.*)$/); if (m && MARCA.test(m[2])) l = m[1]; }
      else if (MARCA.test(l)) enBitacora = true;
      else if (/^\s*(\*|\/\/)\s*$/.test(l) || /^\s*\*\/|^\s*\/\*\*/.test(l)) enBitacora = false;
      if ((comentario && enBitacora) || /^\s*\{ dia: \d/.test(l)) return;
      for (const re of RX_V600) if (re.test(l)) { restos6.push(`${rel}:${i + 1} ${re}`); break; }
    });
  }
  ok(restos6.length === 0, 'textos v6.01 · 0 restos de la F1 v6.00 («mié 7-oct», D1-D60, D59-D60, D60, Día n/60, hitos en martes) fuera de bitácora', restos6.slice(0, 10).join(' · '));
}

fs.rmSync(TMP, { recursive: true, force: true });
console.log(fallos.length ? `\n✗ ${fallos.length} verificación(es) FALLAN: ${fallos.join(' | ')}` : '\n✓ todas las verificaciones del Lote 1A pasan');
process.exit(fallos.length ? 1 : 0);
