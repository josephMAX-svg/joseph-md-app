/**
 * gen_fechas_v6.js — FUENTE ÚNICA DE FECHAS v6.00 (V6_ESPEC §A4/§F) → escribe src/lib/fechasV6.ts (GENERADO).
 *
 *   Uso:  node DATA/_scripts/gen_fechas_v6.js            valida _fechas_v6.json (guardado = derivado) y escribe src/lib/fechasV6.ts
 *         node DATA/_scripts/gen_fechas_v6.js --check    solo valida y comprueba que src/lib/fechasV6.ts está al día (no escribe; exit 1 si no)
 *         node DATA/_scripts/gen_fechas_v6.js --calculo  además comprueba la reserva por la REGLA DE CÁLCULO de §B4.4 (colchón PISO ≥ 0
 *                                                         y déficit 0 del tramo 2, con usmle/ref_v6/gen_tramo2_ref.js); si difiere de la
 *                                                         tabla literal DJ-1 manda la MÁS TARDÍA de las dos (y se avisa a Joseph)
 *
 *   Como librería (TODOS los generadores node leen las fechas de aquí; nunca constantes locales):
 *         const V6 = require('./gen_fechas_v6');          // desde DATA/_scripts/usmle/: require('../gen_fechas_v6')
 *         const F = V6.cargarFechasV6();                  // lee el JSON y LANZA Error si un valor guardado ≠ derivado
 *         V6.reinicioDe(F.encaps.examen) · V6.ritualDe(E, S, skip) · V6.protegidosDe({…}) · V6.esDiaPlan(iso, 'mir')
 *         V6.faseV6(iso) · V6.semanaStep1(iso) · V6.reservaDJ1(encaps) · V6.fasesV6(F) · V6.derivar(F)
 *
 * v6.00 (6-oct-2026): reestructuración anual decidida por Joseph (DJ-1…DJ-5): Step 1 objetivo lun 27-sep-2027 (ventana 31-ago /
 *   27-sep / 25-oct por escenario del ENCAPS), reinicio el MARTES siguiente al ENCAPS (lunes libre), SERUMS L-S con domingo libre,
 *   ENCAPS dom 14-mar PROVISIONAL. Fin del corrimiento diario (§B7): las fechas solo cambian por los disparadores de §I, editando
 *   _fechas_v6.json y regenerando. Derivaciones (código, no a mano, §A4):
 *     reinicio = primer martes > encaps.examen (vale para examen en sábado o domingo) · lunes libre = primer lunes > encaps.examen
 *     f3.fin = día hábil anterior a serums.inicio · adaptacion_hasta = serums.inicio + 13 d · gonogo = step1.examen − 49 d
 *     convocatoria_tope = encaps.examen − 25 d · viaje_d1 = step1.examen − 1 · ritual = último día de plan < step1.examen − 1
 *     protegidos (A3) = {último hábil antes del ENCAPS, D-1, ENCAPS, lunes siguiente} ∪ {ritual, E−1, E} ∪ {adjudicación}
 *     reserva_por_encaps = tabla literal DJ-1 (ENCAPS ≤ 21-mar → 31-ago · ≤ 11-abr → 27-sep · después → 25-oct)
 *   «hábil» = L-V salvo SKIP · «día de plan» = L-V; L-S desde serums.inicio (DJ-3); nunca domingo ni SKIP.
 *   La {adjudicación} no se deriva: es dato de entrada → las filas de `protegidos` cuyo motivo diga adjudicación/inducción/
 *   documentos se conservan tal cual (y no cuentan como días de plan para el ritual).
 *   Antes de escribir el .ts, el generador lo transpila en memoria (typescript del repo) y comprueba que sus funciones dan lo
 *   mismo que las de este fichero en todos los días 2026-09-01 → 2028-01-31 y en los 6 escenarios × 3 exámenes × 2 SERUMS.
 * v6.04 (mié 21-oct-2026): EXAMEN STEP 1 → LUN 25-OCT-2027 por decisión de Joseph («llevo 37 días hábiles perdidos; ¿por qué no alargas la
 *   fecha del examen? si iba a ser septiembre, que sea octubre; simplemente alarga las fechas, en lo que nos falta»). Nada antes del reinicio
 *   (mar 16-mar-2027) cambia: se derivan otra vez gonogo (E-49 = lun 6-sep), viaje (dom 24-oct), ritual (sáb 23-oct) y los protegidos del
 *   examen; la tabla DJ-1 pasa a «DJ-1 v6.04: examen 25-oct en todos los escenarios ENCAPS» (adelanto = base = plan B; la de v6.00-v6.03
 *   queda en DJ1_V600, solo histórico y fechas de prueba). Bitácora nueva `step1.cambios` (fecha, versión, examen previo → nuevo, motivo).
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const JSON_FILE = path.join(__dirname, '_fechas_v6.json');
const OUT = path.join(ROOT, 'src/lib/fechasV6.ts');
const REF_TRAMO2 = path.join(__dirname, 'usmle', 'ref_v6', 'gen_tramo2_ref.js'); // solo para --calculo (regla de cálculo §B4.4)

// ── calendario (UTC-noon, sin zonas horarias; mismo criterio que usmle/ref_v6/cal.js) ──
const D = (s) => new Date(s + 'T12:00:00Z');
const isoDe = (d) => d.toISOString().slice(0, 10);
const add = (s, n) => { const d = D(s); if (isNaN(d.getTime())) return s; d.setUTCDate(d.getUTCDate() + n); return isoDe(d); };
const wd = (s) => D(s).getUTCDay();
const diff = (a, b) => Math.round((D(b) - D(a)) / 864e5);
const lunesDe = (s) => { const w = wd(s); return add(s, w === 0 ? -6 : 1 - w); };
const rango = (a, b) => { const o = []; for (let s = a; s <= b; s = add(s, 1)) o.push(s); return o; };
const DN = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MN = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const f = (s) => (s ? DN[wd(s)] + ' ' + (+s.slice(8)) + '-' + MN[+s.slice(5, 7) - 1] : '—');
const fy = (s) => (s ? f(s) + '-' + s.slice(0, 4) : '—');
const esISO = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(D(s).getTime()) && isoDe(D(s)) === s;
const comoSet = (x) => (x instanceof Set ? x : new Set(x || []));
const MAX_PASOS = 400; // guarda anti-bucle (fecha inválida)

// ── días hábiles / días de plan ──
const esHabil = (s, skip) => { const w = wd(s); return w >= 1 && w <= 5 && !comoSet(skip).has(s); };
const habLV = (a, b, skip) => rango(a, b).filter((s) => esHabil(s, skip));
/** Día de plan «de calendario» (sin protegidos): L-V; L-S desde el inicio del SERUMS (DJ-3); nunca domingo ni SKIP. */
const esDiaPlanBase = (s, serumsInicio, skip) => { const w = wd(s); if (!(w >= 0) || w === 0 || comoSet(skip).has(s)) return false; return w <= 5 || s >= serumsInicio; };
const primerDowTras = (s, dow) => { let x = add(s, 1); for (let i = 0; i < MAX_PASOS; i++, x = add(x, 1)) if (wd(x) === dow) return x; throw new Error('fecha inválida: ' + s); };

// ── DERIVACIONES §A4 (exportadas; mismas firmas que en src/lib/fechasV6.ts) ──
/** Reinicio del Step 1 = primer MARTES posterior al ENCAPS (DJ-2: el lunes siguiente es libre). */
const reinicioDe = (encaps) => primerDowTras(encaps, 2);
/** Lunes libre post-ENCAPS = primer lunes posterior al ENCAPS (protegido). */
const lunesLibreDe = (encaps) => primerDowTras(encaps, 1);
/** Último día hábil (L-V sin SKIP) estrictamente anterior a `s`. */
const ultimoHabilAntes = (s, skip) => { let x = add(s, -1); for (let i = 0; i < MAX_PASOS; i++, x = add(x, -1)) if (esHabil(x, skip)) return x; throw new Error('fecha inválida: ' + s); };
/** Fin de F3 = día hábil anterior al inicio del SERUMS. */
const f3FinDe = (serumsInicio, skip) => ultimoHabilAntes(serumsInicio, skip);
/** Fin de la inducción = serums.inicio + 13 d (dos semanas naturales). */
const adaptacionHastaDe = (serumsInicio) => add(serumsInicio, 13);
/** GO/NO-GO = examen − 49 d (E-49). */
const gonogoDe = (examen) => add(examen, -49);
/** Sin convocatoria a esta fecha el ENCAPS queda descartado (regla de los 25 días, §I). */
const convocatoriaTopeDe = (encaps) => add(encaps, -25);
/** D-1 = viaje a Lima. */
const viajeD1De = (examen) => add(examen, -1);
/** Ritual de test-day = último día de plan anterior a E−1 (r2 · N7: nunca {E−2}). `extra` = protegidos de entrada (adjudicación). */
const ritualDe = (examen, serumsInicio, skip, extra) => {
  const ex = comoSet(extra);
  let x = add(examen, -2);
  for (let i = 0; i < MAX_PASOS; i++, x = add(x, -1)) if (esDiaPlanBase(x, serumsInicio, skip) && !ex.has(x)) return x;
  throw new Error('fecha inválida: ' + examen);
};
/** ¿La fila de `protegidos` es la {adjudicación} de A3 (dato de entrada, no derivable)? */
const RX_ADJUDICACION = /adjudicaci|inducci|documentos/i;
const ordenFecha = (a, b) => (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0);
/** Días protegidos (A3): {último hábil antes del ENCAPS, D-1, ENCAPS, lunes siguiente} ∪ {ritual, E−1, E} ∪ {adjudicación}. Ordenados por fecha, sin duplicados. */
function protegidosDe({ encaps, encapsProvisional, examen, serumsInicio, skip, adjudicacion = [] }) {
  const adj = adjudicacion.map((p) => p.fecha);
  const lista = [
    { fecha: ultimoHabilAntes(encaps, skip), motivo: 'D-1 hábil ENCAPS' },
    { fecha: add(encaps, -1), motivo: 'D-1 ENCAPS' },
    { fecha: encaps, motivo: encapsProvisional ? 'ENCAPS (provisional)' : 'ENCAPS' },
    { fecha: lunesLibreDe(encaps), motivo: 'lunes libre post-ENCAPS' },
    { fecha: ritualDe(examen, serumsInicio, skip, adj), motivo: 'ritual test-day' },
    { fecha: viajeD1De(examen), motivo: 'viaje D-1' },
    { fecha: examen, motivo: 'EXAMEN Step 1' },
    ...adjudicacion.map((p) => ({ fecha: p.fecha, motivo: p.motivo })),
  ];
  const vistos = new Set();
  return lista.filter((p) => !vistos.has(p.fecha) && vistos.add(p.fecha)).sort(ordenFecha);
}
/**
 * DJ-1 — tabla literal de la fecha a RESERVAR por fecha del ENCAPS (§B4.4).
 * v6.04 (mié 21-oct-2026) · DJ-1 v6.04: examen lun 25-oct-2027 por decisión de Joseph («si iba a ser septiembre, que sea octubre; simplemente
 * alarga las fechas»), la MISMA fecha en todos los escenarios del ENCAPS: sin adelanto (una fecha anterior volvería a comprimir lo que se
 * alarga) y el plan B coincide con la base (25-oct es el último mes de la elegibilidad ago-sep-oct: un NO-GO ya no tiene fecha posterior
 * gratuita → extensión de la elegibilidad, §B5). Las semanas extra van al COLCHÓN del tramo 2.
 */
const DJ1 = [
  { encapsHasta: null, examen: '2027-10-25' }, // v6.04: cualquier ENCAPS → lun 25-oct (base = adelanto = plan B)
];
/** DJ-1 de Joseph del 6-oct-2026 (v6.00-v6.03), SUSTITUIDA por DJ-1 v6.04 · solo histórico y fechas de prueba de compararTS. */
const DJ1_V600 = [
  { encapsHasta: '2027-03-21', examen: '2027-08-31' }, // ENCAPS 14 o 21-mar → mar 31-ago (adelanto)
  { encapsHasta: '2027-04-11', examen: '2027-09-27' }, // 4 u 11-abr → lun 27-sep (base)
  { encapsHasta: null, examen: '2027-10-25' },         // 18 o 25-abr (o después) → lun 25-oct (plan B)
];
const reservaDJ1 = (encaps) => DJ1.find((x) => x.encapsHasta === null || encaps <= x.encapsHasta).examen;
/** Exámenes de prueba de la comprobación TS = node (los de la DJ-1 vigente ∪ los de la v6.00, ordenados y sin repetir). */
const EXAMENES_PRUEBA = [...new Set([...DJ1, ...DJ1_V600].map((x) => x.examen))].sort();
/** Texto de una tabla DJ-1 («≤ 21-mar → mar 31-ago · … · después → lun 25-oct» o «todos los escenarios ENCAPS → lun 25-oct-2027»). */
const dj1Texto = (tabla) => (tabla.length === 1 ? `todos los escenarios ENCAPS → ${fy(tabla[0].examen)}`
  : tabla.map((x) => `${x.encapsHasta ? '≤ ' + f(x.encapsHasta).slice(4) : 'después'} → ${f(x.examen)}`).join(' · '));
/** Nº de semanas del Step 1: semanas de F1 (semanasF1De = lunes del f1.inicio → lunes del f1.fin, DERIVADO: v6.01 = 12 · v6.00 = 13)
 *  + semanas(lunes del reinicio → lunes del examen) (§F; tabla A5: base 41 en v6.00 · 40 en v6.01). */
const semanasF1De = (f1Inicio, f1Fin) => 1 + diff(lunesDe(f1Inicio), lunesDe(f1Fin)) / 7;
const step1SemanasDe = (reinicio, examen, f1Inicio, f1Fin) => semanasF1De(f1Inicio, f1Fin) + diff(lunesDe(reinicio), lunesDe(examen)) / 7;

// ── regla de CÁLCULO de la reserva (§B4.4; port de v600/espec/b_horas.js r2 + déficit de gen_tramo2_ref.js) — solo con --calculo ──
const H_PISO = 110 / 60 + 25 / 60 + (90 / 60) * 0.25; // F4 todo turno M: A 04:05-05:55 + Anki 25' + bloque B al 25 % = 2,625 h
const H_F3 = 5.5, META_H = 399;
function horasDiaPiso(s, R, E, ctx) {
  if (s < R || s >= E) return 0;
  if (s === add(E, -1)) return 0;                          // D-1 = viaje (r2 · N9)
  const w = wd(s);
  if (ctx.skip.has(s)) return 0;
  if (s >= lunesDe(add(E, -7))) return w >= 1 && w <= 4 ? 2 : w === 5 ? 1 : 0; // taper: semana previa al examen
  if (s < ctx.serumsInicio) return w >= 1 && w <= 5 ? H_F3 : 0;               // F3 tiempo completo L-V
  if (w === 0) return 0;                                    // domingo LIBRE (DJ-3)
  let h = H_PISO;
  if (ctx.feriados.has(s)) h += 2;                          // feriado sin turno: +2 h (conservador)
  if (s <= adaptacionHastaDe(ctx.serumsInicio)) h *= 0.5;   // inducción
  return h;
}
const colchonPiso = (R, E, ctx) => rango(R, add(E, -1)).reduce((c, s) => c + horasDiaPiso(s, R, E, ctx), 0) - META_H;
function deficitTramo2(encaps, E, ctx) {
  const { execFileSync } = require('child_process');
  const args = [REF_TRAMO2, encaps, E, ctx.serumsInicio, '--permitir-deficit'];
  if (ctx.adjudicacion.length) args.push('--proteg', ctx.adjudicacion.map((p) => p.fecha).join(','));
  const o = execFileSync(process.execPath, args, { cwd: path.dirname(REF_TRAMO2) }).toString();
  const m = o.match(/déficit cola-adelante (\d+) u · déficit cola-atrás (\d+) u/);
  if (!m) throw new Error('salida inesperada de gen_tramo2_ref.js:\n' + o.slice(0, 400));
  return +m[1] + +m[2];
}
/** Fecha más temprana de DJ-1 con colchón PISO ≥ 0 (redondeado, como a_tabla.js) y déficit 0 del tramo 2; null = ninguna (extensión). */
function reservaCalculo(encaps, ctx) {
  const R = reinicioDe(encaps), detalle = [];
  for (const { examen: E } of DJ1) {
    const piso = Math.round(colchonPiso(R, E, ctx)), def = deficitTramo2(encaps, E, ctx);
    detalle.push({ E, piso, def });
    if (piso >= 0 && def === 0) return { reserva: E, detalle };
  }
  return { reserva: null, detalle };
}

// ── carga, derivación y validación del JSON ──
const CLAVES = {
  '': ['version', 'decidido', 'f1', 'transicion', 'encaps', 'step1', 'serums', 'skip', 'protegidos', 'feriados', 'corrimientos', 'corrida_s1'], // v6.01: + corrimientos (bitácora) · v6.02d: + corrida_s1 (semana 1 corrida)
  f1: ['inicio', 'fin', 'dias'],
  transicion: ['desde', 'hasta'],
  encaps: ['examen', 'provisional', 'intensiva_desde', 'pretest', 'nucleo_hasta', 'convocatoria_tope', 'escenarios'],
  step1: ['reinicio', 'examen', 'adelanto', 'planB', 'gonogo', 'eligibility', 'viaje_d1', 'ritual', 'provisional', 'reserva_por_encaps', 'cambios'], // v6.04: + cambios (bitácora del examen)
  serums: ['inicio', 'supuesto', 'dias_plan', 'domingo', 'adaptacion_hasta'],
};
const FECHAS_SUELTAS = ['decidido', 'f1.inicio', 'f1.fin', 'transicion.desde', 'transicion.hasta', 'encaps.examen', 'encaps.intensiva_desde', 'encaps.pretest',
  'encaps.nucleo_hasta', 'encaps.convocatoria_tope', 'step1.reinicio', 'step1.examen', 'step1.adelanto', 'step1.planB', 'step1.gonogo', 'step1.viaje_d1',
  'step1.ritual', 'serums.inicio', 'serums.adaptacion_hasta'];
const get = (o, p) => p.split('.').reduce((x, k) => (x == null ? x : x[k]), o);
/** Forma del JSON: las claves de CLAVES (ni una más: el interfaz FechasV6 del .ts es exacto) y fechas AAAA-MM-DD válidas. */
function comprobarForma(F) {
  const err = [];
  for (const [p, ks] of Object.entries(CLAVES)) {
    const o = p ? F[p] : F;
    if (!o || typeof o !== 'object') { err.push(`falta el objeto «${p}»`); continue; }
    for (const k of ks) if (!(k in o)) err.push(`falta «${p ? p + '.' : ''}${k}»`);
    for (const k of Object.keys(o)) if (!ks.includes(k)) err.push(`clave no prevista «${p ? p + '.' : ''}${k}» (añádela a CLAVES y al interfaz FechasV6 de gen_fechas_v6.js)`);
  }
  if (err.length) return err;
  for (const p of FECHAS_SUELTAS) if (!esISO(get(F, p))) err.push(`«${p}» no es una fecha AAAA-MM-DD válida: ${JSON.stringify(get(F, p))}`);
  for (const p of ['skip', 'feriados', 'encaps.escenarios']) { const a = get(F, p); if (!Array.isArray(a) || !a.every(esISO)) err.push(`«${p}» debe ser una lista de fechas AAAA-MM-DD`); }
  if (!Array.isArray(F.protegidos) || !F.protegidos.every((p) => p && esISO(p.fecha) && typeof p.motivo === 'string' && Object.keys(p).length === 2)) err.push('«protegidos» debe ser una lista de { fecha, motivo }');
  for (const [k, v] of Object.entries(F.step1.reserva_por_encaps || {})) if (!esISO(k) || !esISO(v)) err.push(`«step1.reserva_por_encaps» ${k} → ${v}: fechas inválidas`);
  if (typeof F.f1.dias !== 'number') err.push('«f1.dias» debe ser un número');
  // v6.01 (10-oct-2026): bitácora de corrimientos del D1 (solo informativa; no deriva nada).
  if (!Array.isArray(F.corrimientos) || !F.corrimientos.every((c) => c && esISO(c.fecha) && esISO(c.d1_previo) && esISO(c.d1) && Array.isArray(c.perdidos) && c.perdidos.every(esISO))) err.push('«corrimientos» debe ser una lista de { fecha, version, d1_previo, d1, perdidos[], regla }');
  for (const p of ['encaps.provisional', 'step1.provisional', 'serums.supuesto']) if (typeof get(F, p) !== 'boolean') err.push(`«${p}» debe ser true/false`);
  // v6.04 (21-oct-2026): bitácora de cambios de la fecha del examen Step 1 (informativa; el último = step1.examen vigente).
  const cam = F.step1.cambios;
  if (!Array.isArray(cam) || !cam.every((c) => c && Object.keys(c).length === 5 && esISO(c.fecha) && typeof c.version === 'string' && esISO(c.examen_previo) && esISO(c.examen) && typeof c.motivo === 'string')) err.push('«step1.cambios» debe ser una lista de { fecha, version, examen_previo, examen, motivo }');
  else if (cam.length && cam[cam.length - 1].examen !== F.step1.examen) err.push(`«step1.cambios»: el último cambio (${cam[cam.length - 1].examen}) ≠ step1.examen (${F.step1.examen})`);
  err.push(...comprobarCorridaS1(F.corrida_s1));
  return err;
}
/**
 * v6.02d (lun 19-oct-2026): forma de `corrida_s1` (semana 1 corrida por orden de Joseph). Alias EN LA CONSULTA: ningún plan cambia de fecha;
 * la app traduce el día real a la fecha de plan. `sin_sesion` = día perdido · `alias` real → plan (siempre hacia atrás) · `reparto` = un día
 * real que recibe bloques de la plantilla de otras fechas de plan con un desfase en minutos (id de bloque de plantillasV6 → desfase).
 */
function comprobarCorridaS1(c) {
  const err = [];
  if (!c || typeof c !== 'object') return ['falta «corrida_s1»'];
  const ks = ['decidido', 'version', 'motivo', 'sin_sesion', 'alias', 'reparto'];
  for (const k of ks) if (!(k in c)) err.push(`falta «corrida_s1.${k}»`);
  for (const k of Object.keys(c)) if (!ks.includes(k)) err.push(`clave no prevista «corrida_s1.${k}»`);
  if (err.length) return err;
  if (!esISO(c.decidido) || typeof c.version !== 'string' || typeof c.motivo !== 'string') err.push('«corrida_s1»: decidido (fecha), version y motivo (texto)');
  if (!Array.isArray(c.sin_sesion) || !c.sin_sesion.every(esISO)) err.push('«corrida_s1.sin_sesion» debe ser una lista de fechas');
  const reales = new Set();
  const nuevo = (s, que) => { if (reales.has(s)) err.push(`«corrida_s1»: ${s} aparece dos veces (${que})`); reales.add(s); };
  (c.sin_sesion || []).forEach((s) => nuevo(s, 'sin_sesion'));
  for (const [r, de] of Object.entries(c.alias || {})) {
    nuevo(r, 'alias');
    if (!esISO(r) || !esISO(de) || !(de < r)) err.push(`«corrida_s1.alias» ${r} → ${de}: fechas inválidas o no hacia atrás`);
  }
  for (const [r, x] of Object.entries(c.reparto || {})) {
    nuevo(r, 'reparto');
    if (!esISO(r) || !x || !esISO(x.de) || !(x.de < r) || !Array.isArray(x.partes) || !x.partes.length) { err.push(`«corrida_s1.reparto» ${r}: { de, partes[] } inválido`); continue; }
    for (const pt of x.partes) {
      if (!pt || !esISO(pt.de) || pt.de > r || !pt.bloques || typeof pt.bloques !== 'object') { err.push(`«corrida_s1.reparto» ${r}: parte inválida ${JSON.stringify(pt)}`); continue; }
      for (const [id, m] of Object.entries(pt.bloques)) if (!/^[a-z][a-z0-9-]*$/.test(id) || !Number.isInteger(m) || m % 5 !== 0 || Math.abs(m) > 12 * 60) err.push(`«corrida_s1.reparto» ${r} ${pt.de}: bloque «${id}» con desfase ${m} (minutos enteros, múltiplo de 5, |·| ≤ 12 h)`);
    }
    if (!x.partes.some((pt) => pt.de === x.de)) err.push(`«corrida_s1.reparto» ${r}: ninguna parte es del día repartido ${x.de}`);
  }
  return err;
}
/** Semana corrida (gemelo node de corridaS1De del .ts): null fuera de ella. */
function corridaS1De(s, F = fechasPorDefecto()) {
  const c = F.corrida_s1;
  if (!c) return null;
  if (c.sin_sesion.includes(s)) return { tipo: 'sin_sesion' };
  if (c.alias[s]) return { tipo: 'alias', de: c.alias[s] };
  const r = c.reparto[s];
  return r ? { tipo: 'reparto', de: r.de, partes: r.partes } : null;
}
/** Ids de bloque de plantillasV6 de cada frente (para elegir la parte del reparto que le toca a una vista). Mismo literal que el .ts. */
const BLOQUES_POR_FRENTE = {
  usmle: ['anki', 'usmle', 'eval', 'anki-sab', 'anki-dom'], mir: ['mir'], encaps: ['encaps'], 'research-derma': ['rd'], aurum: ['aurum'],
  liviano: ['liv'], synapse: ['syn', 'pc', 'feynman'], vibecoding: ['vibe', 'pc', 'feynman'], business: ['biz'], revision: ['revision'],
};
/** Fecha de PLAN de un día real (gemelo node de fechaPlanDe del .ts). Con `frente`, en un día de reparto = la parte con un bloque de ese frente. */
const fechaPlanDe = (s, F = fechasPorDefecto(), frente) => {
  const c = corridaS1De(s, F);
  if (!c || c.tipo === 'sin_sesion') return s;
  if (c.tipo === 'alias' || !frente) return c.de;
  const ids = BLOQUES_POR_FRENTE[frente] || [];
  const parte = c.partes.find((p) => Object.keys(p.bloques).some((id) => ids.includes(id)));
  return parte ? parte.de : c.de;
};
/** Inversa para MOSTRAR (gemelo node de fechaRealDe del .ts): día real en que se hace la fila con fecha de plan `plan`. */
const fechaRealDe = (plan, F = fechasPorDefecto(), frente) => {
  const c = F.corrida_s1;
  if (!c) return plan;
  for (const [r, de] of Object.entries(c.alias)) if (de === plan) return r;
  const ids = frente ? (BLOQUES_POR_FRENTE[frente] || []) : null;
  for (const [r, x] of Object.entries(c.reparto)) for (const p of x.partes) if (p.de === plan && (!ids || Object.keys(p.bloques).some((id) => ids.includes(id)))) return r;
  return plan;
};
/** Contexto de derivación a partir del JSON. */
function ctxDe(F) {
  return {
    encaps: F.encaps.examen, encapsProvisional: F.encaps.provisional, examen: F.step1.examen, serumsInicio: F.serums.inicio,
    skip: new Set(F.skip), feriados: new Set(F.feriados), adjudicacion: F.protegidos.filter((p) => RX_ADJUDICACION.test(p.motivo)),
  };
}
/** Todos los valores derivados (los guardados en el JSON y los que solo usa el .ts). `opts.calculo` = aplicar también la regla de cálculo. */
function derivar(F, opts = {}) {
  const c = ctxDe(F);
  const adj = c.adjudicacion.map((p) => p.fecha);
  const reinicio = reinicioDe(c.encaps);
  const ritual = ritualDe(c.examen, c.serumsInicio, c.skip, adj);
  const protegidos = protegidosDe(c);
  const prot = new Set(protegidos.map((p) => p.fecha));
  const d1HabilEncaps = ultimoHabilAntes(c.encaps, c.skip);
  const f3Fin = f3FinDe(c.serumsInicio, c.skip);
  const diasF1 = habLV(F.f1.inicio, F.f1.fin, c.skip);
  const diasF2 = habLV(F.encaps.intensiva_desde, d1HabilEncaps, c.skip);          // incluye el medio día (D-1 hábil, protegido)
  const diasF3 = habLV(reinicio, f3Fin, c.skip).filter((s) => !prot.has(s));
  const diasF4 = rango(c.serumsInicio, ritual).filter((s) => esDiaPlanBase(s, c.serumsInicio, c.skip) && (!prot.has(s) || s === ritual)); // el ritual es fila USMLE (T final)
  let ultimoDiaEstudio = add(ritual, -1);
  while (!esDiaPlanBase(ultimoDiaEstudio, c.serumsInicio, c.skip) || prot.has(ultimoDiaEstudio)) ultimoDiaEstudio = add(ultimoDiaEstudio, -1);
  // reserva por escenario: DJ-1 literal (y, con --calculo, la más tardía de DJ-1 y la regla de cálculo)
  const escenarios = [...new Set([...F.encaps.escenarios, c.encaps])];
  const reserva = {}, calculo = {};
  for (const e of escenarios) {
    reserva[e] = reservaDJ1(e);
    if (opts.calculo) {
      calculo[e] = reservaCalculo(e, c);
      if (calculo[e].reserva === null || calculo[e].reserva > reserva[e]) reserva[e] = calculo[e].reserva || DJ1[DJ1.length - 1].examen;
    }
  }
  return {
    reinicio, lunesLibre: lunesLibreDe(c.encaps), d1HabilEncaps, f3Fin, adaptacionHasta: adaptacionHastaDe(c.serumsInicio),
    ritual, ultimoDiaEstudio, viajeD1: viajeD1De(c.examen), gonogo: gonogoDe(c.examen), convocatoriaTope: convocatoriaTopeDe(c.encaps),
    protegidos, reserva, calculo, reservaActual: reserva[c.encaps],
    semanasF1: semanasF1De(F.f1.inicio, F.f1.fin), step1Semanas: step1SemanasDe(reinicio, c.examen, F.f1.inicio, F.f1.fin),
    diasF1: diasF1.length, diasF2: diasF2.length, diasF3: diasF3.length, diasF4: diasF4.length,
    ultimoDiaF1: diasF1[diasF1.length - 1], ultimoDiaF3: diasF3[diasF3.length - 1],
  };
}
/** Compara cada valor GUARDADO con su derivado. Devuelve la lista de diferencias (vacía = todo cuadra). */
function validar(F, opts = {}) {
  const forma = comprobarForma(F);
  if (forma.length) return forma.map((m) => ({ campo: 'forma', guardado: m, derivado: '—' }));
  const d = derivar(F, opts);
  const dif = [];
  const chk = (campo, guardado, derivado) => { if (JSON.stringify(guardado) !== JSON.stringify(derivado)) dif.push({ campo, guardado, derivado }); };
  // los de §A4
  chk('step1.reinicio', F.step1.reinicio, d.reinicio);
  chk('step1.gonogo', F.step1.gonogo, d.gonogo);
  chk('step1.ritual', F.step1.ritual, d.ritual);
  chk('step1.viaje_d1', F.step1.viaje_d1, d.viajeD1);
  chk('protegidos', [...F.protegidos].sort(ordenFecha), d.protegidos);
  chk('serums.adaptacion_hasta', F.serums.adaptacion_hasta, d.adaptacionHasta);
  chk('encaps.convocatoria_tope', F.encaps.convocatoria_tope, d.convocatoriaTope);
  for (const e of Object.keys(d.reserva)) chk(`step1.reserva_por_encaps[${e}]`, F.step1.reserva_por_encaps[e], d.reserva[e]);
  // v6.00: además, los otros valores guardados que también son derivables (invariantes de la tabla A1 / DJ-1)
  chk('f1.dias', F.f1.dias, d.diasF1);
  chk('f1.fin (último hábil de F1)', F.f1.fin, d.ultimoDiaF1);
  chk('transicion.desde', F.transicion.desde, add(F.f1.fin, 1));
  chk('transicion.hasta', F.transicion.hasta, add(F.encaps.intensiva_desde, -1));
  chk('step1.adelanto (DJ-1)', F.step1.adelanto, DJ1[0].examen);
  chk('step1.planB (DJ-1)', F.step1.planB, DJ1[DJ1.length - 1].examen);
  // orden de las fases (A1): F1 < transición < F2 ≤ ENCAPS < reinicio < SERUMS ≤ ritual < viaje < examen
  const orden = [['f1.inicio', F.f1.inicio], ['f1.fin', F.f1.fin], ['encaps.intensiva_desde', F.encaps.intensiva_desde], ['encaps.examen', F.encaps.examen],
    ['step1.reinicio', d.reinicio], ['serums.inicio', F.serums.inicio], ['step1.ritual', d.ritual], ['step1.viaje_d1', d.viajeD1], ['step1.examen', F.step1.examen]];
  for (let i = 1; i < orden.length; i++) if (!(orden[i - 1][1] < orden[i][1])) dif.push({ campo: `orden ${orden[i - 1][0]} < ${orden[i][0]}`, guardado: `${orden[i - 1][1]} / ${orden[i][1]}`, derivado: 'creciente' });
  return dif;
}
let _F = null;
/** Lee _fechas_v6.json y lo VALIDA (guardado = derivado). Lanza Error con las diferencias (los generadores abortan). */
function cargarFechasV6(file = JSON_FILE, opts = {}) {
  const F = JSON.parse(fs.readFileSync(file, 'utf8').replace(/^﻿/, ''));
  const dif = validar(F, opts);
  if (dif.length) throw new Error(`_fechas_v6.json: ${dif.length} valor(es) guardado(s) ≠ derivado(s) (V6_ESPEC §A4):\n` + dif.map((x) => `  · ${x.campo}: guardado ${JSON.stringify(x.guardado)} · derivado ${JSON.stringify(x.derivado)}`).join('\n'));
  return F;
}
const fechasPorDefecto = () => _F || (_F = cargarFechasV6());

// ── fases (tabla A1 resuelta) y predicados por fecha (mismas reglas que src/lib/fechasV6.ts) ──
function fasesV6(F = fechasPorDefecto(), d = derivar(F)) {
  const enc = F.encaps.examen, provEnc = F.encaps.provisional, provSer = F.serums.supuesto, provS1 = F.step1.provisional;
  return [
    { id: 'F1', nombre: 'Step 1 tramo 1 (6h15: 05:00 · 07:15-12:00 · 18:00) + ENCAPS lento 1 h (16:15)', etiqueta: `F1 · STEP 1 TRAMO 1 (D1-D${d.diasF1})`,
      desde: F.f1.inicio, hasta: F.f1.fin, ultimoDiaPlan: d.ultimoDiaF1, diasPlan: d.diasF1, diasSemana: 'L-V', provisional: false },
    { id: 'TRANSICION', nombre: 'Transición sin sesión (Anki opcional)', etiqueta: 'TRANSICIÓN',
      desde: add(F.f1.fin, 1), hasta: add(F.encaps.intensiva_desde, -1), ultimoDiaPlan: null, diasPlan: 0, diasSemana: null, provisional: false },
    { id: 'F2', nombre: "ENCAPS intensiva (≈32 h/sem) + Step 1 en mantenimiento (Anki 30' L-V + sáb 07:45 20Q)", etiqueta: `F2 · ENCAPS INTENSIVA (examen ${f(enc)}${provEnc ? ' PROVISIONAL' : ''})`,
      desde: F.encaps.intensiva_desde, hasta: enc, ultimoDiaPlan: d.d1HabilEncaps, diasPlan: d.diasF2, diasSemana: 'L-V', provisional: provEnc },
    { id: 'LIBRE_POST_ENCAPS', nombre: 'Lunes libre post-ENCAPS (protegido, DJ-2)', etiqueta: 'LIBRE post-ENCAPS',
      desde: add(enc, 1), hasta: add(d.reinicio, -1), ultimoDiaPlan: null, diasPlan: 0, diasSemana: null, provisional: provEnc },
    { id: 'F3', nombre: 'Step 1 tiempo completo 7h15 (F1 + 16:15 REENTRADA)', etiqueta: 'F3 · STEP 1 TIEMPO COMPLETO',
      desde: d.reinicio, hasta: add(F.serums.inicio, -1), ultimoDiaPlan: d.ultimoDiaF3, diasPlan: d.diasF3, diasSemana: 'L-V', provisional: provEnc || provSer },
    { id: 'F4', nombre: 'SERUMS 6 h (turno M/T variable) + Step 1 por plantilla de turno · L-S, domingo libre', etiqueta: 'F4 · STEP 1 + SERUMS',
      desde: F.serums.inicio, hasta: add(d.viajeD1, -1), ultimoDiaPlan: d.ritual, diasPlan: d.diasF4, diasSemana: 'L-S', provisional: provSer || provS1 },
    { id: 'EXAMEN', nombre: 'D-1 viaje a Lima + EXAMEN Step 1', etiqueta: 'EXAMEN STEP 1',
      desde: d.viajeD1, hasta: F.step1.examen, ultimoDiaPlan: null, diasPlan: 0, diasSemana: null, provisional: provS1 },
    { id: 'F5', nombre: 'Post-Step 1 (esbozo): MIR principal hasta el fin del SERUMS (~abr-2028)', etiqueta: 'F5 · post-Step 1',
      desde: add(F.step1.examen, 1), hasta: null, ultimoDiaPlan: null, diasPlan: 0, diasSemana: null, provisional: provS1 },
  ];
}
function comprobarFases(fases) {
  const err = [];
  for (let i = 1; i < fases.length; i++) if (fases[i].desde !== add(fases[i - 1].hasta, 1)) err.push(`fases no contiguas: ${fases[i - 1].id} hasta ${fases[i - 1].hasta} · ${fases[i].id} desde ${fases[i].desde}`);
  for (const x of fases) if (x.hasta !== null && x.hasta < x.desde) err.push(`fase ${x.id} vacía: ${x.desde} → ${x.hasta}`);
  return err;
}
const _cacheFases = new WeakMap();
const fasesDe = (F) => { if (!_cacheFases.has(F)) _cacheFases.set(F, fasesV6(F)); return _cacheFases.get(F); };
/** Fase v6 de una fecha. Antes del D1 (s < f1.inicio: v6.01 ≤ dom 11-oct-2026 · v6.00 ≤ mar 6-oct) devuelve 'F1' (la app ya muestra F1 la víspera). */
function faseV6(s, F = fechasPorDefecto()) {
  const fases = fasesDe(F);
  if (s < fases[0].desde) return 'F1';
  for (const x of fases) if (s >= x.desde && (x.hasta === null || s <= x.hasta)) return x.id;
  return 'F5';
}
const esProtegido = (s, F = fechasPorDefecto()) => F.protegidos.some((p) => p.fecha === s);
const enPausaStep1 = (s, F = fechasPorDefecto()) => s > F.f1.fin && s < F.step1.reinicio;
/**
 * ¿Es `s` día de plan? Sin `plan`: L-V (L-S desde serums.inicio), desde el D1, sin SKIP ni protegidos.
 * Con `plan`: 'usmle' añade el ritual (fila T final) y quita la PAUSA (31-dic → lunes libre) y lo posterior al ritual;
 * 'encaps' añade el D-1 hábil (medio día) y quita lo posterior al ENCAPS. (Excepciones de V3, §H.) Resto de planes = genérico.
 */
function esDiaPlan(s, plan, F = fechasPorDefecto()) {
  if (s < F.f1.inicio) return false;
  if (!esDiaPlanBase(s, F.serums.inicio, new Set(F.skip))) return false;
  if (esProtegido(s, F)) {
    if (plan === 'usmle') return s === F.step1.ritual;
    if (plan === 'encaps') return s === ultimoHabilAntes(F.encaps.examen, new Set(F.skip));
    return false;
  }
  if (plan === 'usmle') return !enPausaStep1(s, F) && s <= F.step1.ritual;
  if (plan === 'encaps') return s < F.encaps.examen;
  return true;
}
/**
 * Semana del Step 1 (§F): S1-S<sF1> = semanas de F1 (sF1 = semanasF1De, DERIVADO: v6.01 S1-S12 = lun 12-oct → lun 28-dic ·
 * v6.00: S1-S13 = lun 5-oct → lun 28-dic) · semanas de la pausa (lun 4-ene → semana del ENCAPS) → pausa:true (n se queda en sF1:
 * 12 en v6.01, 13 en v6.00) · desde la semana del reinicio sF1 + k (k = 1…) · semana del examen → examen:true
 * (n = total + 1). Días anteriores al D1 → n = 0 (pre-D1). `extras` = hitos/deloads del plan (homeBriefing) para `hito`/`deload`.
 */
function semanaStep1(s, extras = {}, F = fechasPorDefecto()) {
  const total = step1SemanasDe(F.step1.reinicio, F.step1.examen, F.f1.inicio, F.f1.fin);
  const sF1 = semanasF1De(F.f1.inicio, F.f1.fin);
  const lunes = lunesDe(s), lunRein = lunesDe(F.step1.reinicio);
  let n, pausa = false;
  if (s < F.f1.inicio) n = 0;
  else if (lunes <= lunesDe(F.f1.fin)) n = 1 + diff(lunesDe(F.f1.inicio), lunes) / 7;
  else if (lunes < lunRein) { n = sF1; pausa = true; }
  else n = sF1 + 1 + diff(lunRein, lunes) / 7;
  const examen = lunes === lunesDe(F.step1.examen);
  const domingo = add(lunes, 6);
  const dl = (extras.deloads || []).find((x) => x.lunes === lunes);
  const hito = (extras.hitos || []).filter((h) => h.fecha >= lunes && h.fecha <= domingo).map((h) => h.nombre).join(' + ') || undefined;
  return { n, total, lunes, viernes: add(lunes, 4), sabado: add(lunes, 5), pausa, examen, deload: !!dl, deloadMotivo: dl ? dl.motivo : undefined, hito, fueraDeRango: !pausa && (n < 1 || n > total) };
}

// ═══ emisión de src/lib/fechasV6.ts ═══
const L = (x) => JSON.stringify(x);
function emitirTS(F, d) {
  const fases = fasesV6(F, d);
  const adjTxt = ctxDe(F).adjudicacion.length ? '' : ' · la adjudicación SERUMS se añadirá al conocerse (motivo «adjudicación …»)';
  const cab = [
    '/**',
    ' * fechasV6.ts — FUENTE ÚNICA DE FECHAS v6.00 · GENERADO por DATA/_scripts/gen_fechas_v6.js desde DATA/_scripts/_fechas_v6.json',
    ' * — NO editar a mano (V6_ESPEC §A4/§F). Para mover una fecha: editar el JSON (disparadores de §I) y volver a correr',
    ' * `node DATA/_scripts/gen_fechas_v6.js` (aborta si un valor guardado ≠ derivado) y después los generadores de cada plan.',
    ' *',
    // v6.01 (10-oct-2026): antes `${F.version} (decidido …): reestructuración anual` → con el JSON en v6.01 salía «v6.01 (decidido mar 6-oct)»,
    // una bitácora v6.00 con la etiqueta v6.01. Ahora: v6.00 literal + una línea por corrimiento de `corrimientos` (sus propios literales).
    ` * v6.00 (decidido ${fy(F.decidido)}): reestructuración anual (DJ-1…DJ-5) — sustituye a v5.20 (Step 1 lun 22-feb · ENCAPS mié 10-mar).`,
    // v6.04: + una línea por cambio de la fecha del examen Step 1 (step1.cambios; el motivo completo está en el JSON) · v6.05: todo por fecha
    ...[
      ...(F.corrimientos || []).map((c) => [c.fecha, ` * ${c.version} (${fy(c.fecha)}): corrimiento rígido del D1 ${fy(c.d1_previo)} → ${fy(c.d1)} (perdidos: ${c.perdidos.map(f).join(' · ')}).`]),
      ...(F.step1.cambios || []).map((c) => [c.fecha, ` * ${c.version} (${fy(c.fecha)}): examen Step 1 ${fy(c.examen_previo)} → ${fy(c.examen)} (decisión de Joseph; step1.cambios).`]),
    ].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)).map((x) => x[1]),
    ` * ${F.corrida_s1.version} (${fy(F.corrida_s1.decidido)}): semana 1 corrida SOLO en la consulta (corridaS1De / fechaPlanDe) — ` +
      [`sin sesión ${F.corrida_s1.sin_sesion.map(f).join(' · ')}`,
        ...Object.entries(F.corrida_s1.alias).map(([r, de]) => `${f(r)} = plan del ${f(de)}`),
        ...Object.entries(F.corrida_s1.reparto).map(([r, x]) => `${f(r)} = parte del ${f(x.de)}`)].join(' · ') +
      (Object.keys(F.corrida_s1.alias).length || Object.keys(F.corrida_s1.reparto).length
        ? '; ningún plan cambia de fecha.' : ' (solo días sin sesión: los planes ya están re-fechados por el corrimiento).'),
    ` * Versión vigente del JSON: ${F.version}.`,
    ' * Módulo HOJA: no importa nada de src/ (r2 · I7: corta el ciclo usmleStep1Daily ↔ homeBriefing; STEP1_SEMANAS, semanaStep1 y',
    ' * Turno viven aquí y homeBriefing los re-exporta).',
    ' *',
    ' * Fases (tabla A1 resuelta):',
    ...fases.map((x) => ` *   ${x.id.padEnd(17)} ${fy(x.desde)} → ${x.hasta ? fy(x.hasta) : 'abierta'}${x.diasPlan ? ` · ${x.diasPlan} días de plan ${x.diasSemana} (último ${f(x.ultimoDiaPlan)})` : ''}${x.provisional ? ' · PROVISIONAL' : ''}`),
    ` * ENCAPS ${fy(F.encaps.examen)}${F.encaps.provisional ? ' PROVISIONAL' : ''} (sin convocatoria al ${f(d.convocatoriaTope)} → descartado) · reinicio Step 1 ${fy(d.reinicio)}`,
    ` * SERUMS ${fy(F.serums.inicio)}${F.serums.supuesto ? ' [supuesto]' : ''} (inducción → ${f(d.adaptacionHasta)}) · GO/NO-GO ${fy(d.gonogo)} (E-49) · ritual ${f(d.ritual)} · viaje ${f(d.viajeD1)}`,
    ` * EXAMEN Step 1 ${fy(F.step1.examen)}${F.step1.provisional ? ' PROVISIONAL' : ''} · fecha a RESERVAR con ENCAPS ${f(F.encaps.examen)} = ${fy(d.reservaActual)} (DJ-1) · STEP1_SEMANAS = ${d.step1Semanas}`,
    ` * Protegidos: ${d.protegidos.map((p) => `${f(p.fecha)} (${p.motivo})`).join(' · ')}${adjTxt}.`,
    ` * SKIP (sin sesión de ningún plan): ${F.skip.map(f).join(' · ')}.`,
    ' */',
  ].join('\n');
  return `${cab}

// ── el JSON (tal cual) ──
export interface ProtegidoV6 { fecha: string; motivo: string }
export interface FechasV6 {
  version: string; decidido: string;
  f1: { inicio: string; fin: string; dias: number };
  transicion: { desde: string; hasta: string };
  encaps: { examen: string; provisional: boolean; intensiva_desde: string; pretest: string; nucleo_hasta: string; convocatoria_tope: string; escenarios: string[] };
  step1: {
    reinicio: string; examen: string; adelanto: string; planB: string; gonogo: string; eligibility: string;
    viaje_d1: string; ritual: string; provisional: boolean; reserva_por_encaps: Record<string, string>;
    /** v6.04: bitácora de cambios de la fecha del examen (el último = examen vigente) */
    cambios: { fecha: string; version: string; examen_previo: string; examen: string; motivo: string }[];
  };
  serums: { inicio: string; supuesto: boolean; dias_plan: string; domingo: string; adaptacion_hasta: string };
  skip: string[];
  protegidos: ProtegidoV6[];
  feriados: string[];
  /** v6.01: bitácora de corrimientos del D1 (informativa) */
  corrimientos: { fecha: string; version: string; d1_previo: string; d1: string; perdidos: string[]; regla: string }[];
  /** v6.02d: semana 1 corrida (alias en la consulta; ver corridaS1De / fechaPlanDe) */
  corrida_s1: {
    decidido: string; version: string; motivo: string;
    sin_sesion: string[];
    alias: Record<string, string>;
    reparto: Record<string, { de: string; partes: { de: string; bloques: Record<string, number> }[] }>;
  };
}
export const FECHAS_V6: FechasV6 = ${JSON.stringify(F, null, 2)};

/** Valores derivados por gen_fechas_v6.js (los mismos que dan las funciones de abajo con FECHAS_V6). */
export const DERIVADOS_V6 = {
  /** último hábil antes del ENCAPS (medio día ENCAPS · protegido para los demás planes) */
  d1HabilEncaps: ${L(d.d1HabilEncaps)},
  /** lunes libre post-ENCAPS (protegido, DJ-2) */
  lunesLibre: ${L(d.lunesLibre)},
  /** reinicio del Step 1 = primer martes > ENCAPS */
  reinicio: ${L(d.reinicio)},
  /** fin de F3 = día hábil anterior al SERUMS */
  f3Fin: ${L(d.f3Fin)},
  /** fin de la inducción SERUMS (inicio + 13 d) */
  adaptacionHasta: ${L(d.adaptacionHasta)},
  /** último día con estudio (D95: sesión mínima) = día de plan anterior al ritual */
  ultimoDiaEstudio: ${L(d.ultimoDiaEstudio)},
  /** ritual de test-day = último día de plan < E−1 */
  ritual: ${L(d.ritual)},
  viajeD1: ${L(d.viajeD1)},
  gonogo: ${L(d.gonogo)},
  convocatoriaTope: ${L(d.convocatoriaTope)},
  /** fecha a RESERVAR (FSMB/Prometric) con el ENCAPS vigente — DJ-1 */
  reserva: ${L(d.reservaActual)},
  semanasF1: ${d.semanasF1},
  step1Semanas: ${d.step1Semanas},
  diasF1: ${d.diasF1}, diasF2: ${d.diasF2}, diasF3: ${d.diasF3}, diasF4: ${d.diasF4},
} as const;

// ── fases (tabla A1 resuelta) ──
export type FaseV6 = 'F1' | 'TRANSICION' | 'F2' | 'LIBRE_POST_ENCAPS' | 'F3' | 'F4' | 'EXAMEN' | 'F5';
export interface FaseV6Info {
  id: FaseV6;
  /** qué se hace (tabla A1) */
  nombre: string;
  /** etiqueta corta para el Home (TodayMission.faseActual, §F) */
  etiqueta: string;
  /** rango de CALENDARIO (inclusive; contiguo con la fase siguiente) · hasta null = abierta */
  desde: string; hasta: string | null;
  /** último día de plan de la fase (F2: medio día del D-1 hábil · F4: ritual) */
  ultimoDiaPlan: string | null;
  diasPlan: number;
  diasSemana: 'L-V' | 'L-S' | null;
  /** depende del ENCAPS / SERUMS / examen provisionales */
  provisional: boolean;
}
export const FASES_V6: FaseV6Info[] = [
${fases.map((x) => '  ' + JSON.stringify(x)).join(',\n')},
];

// ── conjuntos de días ──
/** Días SIN SESIÓN de ningún plan (25-dic, 31-dic, 1-ene, Jueves y Viernes Santo 2027). */
export const SKIP_V6: Set<string> = new Set(FECHAS_V6.skip);
/** Feriados nacionales (gob.pe). En F1 son sesión; en F4, si la posta no programa turno → plantilla L (día doble). */
export const FERIADOS_V6: Set<string> = new Set(FECHAS_V6.feriados);
/** Días protegidos (A3): sin MIR, Research, Derma ni AURUM; solo el ritual (USMLE) y el medio día (ENCAPS) tienen fila. */
export const DIAS_PROTEGIDOS: Set<string> = new Set(FECHAS_V6.protegidos.map((p) => p.fecha));

/** Turno de la posta SERUMS (§B4.1): M mañana 07-13 · T tarde 13-19 · L feriado/sin turno · G guardia. */
export type Turno = 'M' | 'T' | 'L' | 'G';
export const TURNOS: Turno[] = ['M', 'T', 'L', 'G'];
/** Planes con excepciones en esDiaPlan (V3); el resto usa la regla genérica. */
export type PlanV6 = 'usmle' | 'encaps' | 'mir' | 'research' | 'derma' | 'aurum';

// ── calendario (UTC-noon, sin zonas horarias; mismo criterio que los generadores node) ──
const MAX_PASOS = 400; // guarda anti-bucle (fecha inválida)
const _D = (s: string): Date => new Date(s + 'T12:00:00Z');
const _add = (s: string, n: number): string => { const d = _D(s); if (isNaN(d.getTime())) return s; d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const _wd = (s: string): number => _D(s).getUTCDay();
const _diff = (a: string, b: string): number => Math.round((_D(b).getTime() - _D(a).getTime()) / 864e5);
const _lunesDe = (s: string): string => { const w = _wd(s); return _add(s, w === 0 ? -6 : 1 - w); };
const _esHabil = (s: string, skip: Set<string>): boolean => { const w = _wd(s); return w >= 1 && w <= 5 && !skip.has(s); };
const _primerDowTras = (s: string, dow: number): string => {
  let x = _add(s, 1);
  for (let i = 0; i < MAX_PASOS; i++, x = _add(x, 1)) if (_wd(x) === dow) return x;
  throw new Error('fecha inválida: ' + s);
};
const ADJUDICACION_V6: ProtegidoV6[] = FECHAS_V6.protegidos.filter((p) => /adjudicaci|inducci|documentos/i.test(p.motivo));

/** Día de plan «de calendario» (sin protegidos): L-V; L-S desde el inicio del SERUMS (DJ-3); nunca domingo ni SKIP. */
export function esDiaPlanBase(iso: string, serumsInicio: string = FECHAS_V6.serums.inicio, skip: Set<string> = SKIP_V6): boolean {
  const w = _wd(iso);
  if (!(w >= 0) || w === 0 || skip.has(iso)) return false;
  return w <= 5 || iso >= serumsInicio;
}

// ── derivaciones §A4 (mismas reglas y firmas que DATA/_scripts/gen_fechas_v6.js) ──
/** Reinicio del Step 1 = primer MARTES posterior al ENCAPS (DJ-2; vale para examen en sábado o domingo). */
export function reinicioDe(encaps: string = FECHAS_V6.encaps.examen): string { return _primerDowTras(encaps, 2); }
/** Lunes libre post-ENCAPS = primer lunes posterior al ENCAPS. */
export function lunesLibreDe(encaps: string = FECHAS_V6.encaps.examen): string { return _primerDowTras(encaps, 1); }
/** Último día hábil (L-V sin SKIP) estrictamente anterior a \`iso\`. */
export function ultimoHabilAntes(iso: string, skip: Set<string> = SKIP_V6): string {
  let x = _add(iso, -1);
  for (let i = 0; i < MAX_PASOS; i++, x = _add(x, -1)) if (_esHabil(x, skip)) return x;
  throw new Error('fecha inválida: ' + iso);
}
/** Fin de F3 = día hábil anterior al inicio del SERUMS. */
export function f3FinDe(serumsInicio: string = FECHAS_V6.serums.inicio, skip: Set<string> = SKIP_V6): string { return ultimoHabilAntes(serumsInicio, skip); }
/** Fin de la inducción = serums.inicio + 13 d (dos semanas naturales). */
export function adaptacionHastaDe(serumsInicio: string = FECHAS_V6.serums.inicio): string { return _add(serumsInicio, 13); }
/** GO/NO-GO = examen − 49 d (E-49). */
export function gonogoDe(examen: string = FECHAS_V6.step1.examen): string { return _add(examen, -49); }
/** Sin convocatoria a esta fecha, ese ENCAPS queda descartado (regla de los 25 días). */
export function convocatoriaTopeDe(encaps: string = FECHAS_V6.encaps.examen): string { return _add(encaps, -25); }
/** D-1 = viaje a Lima. */
export function viajeD1De(examen: string = FECHAS_V6.step1.examen): string { return _add(examen, -1); }
/** Ritual de test-day = último día de plan anterior a E−1 (nunca la fórmula {E−2}). \`extra\` = protegidos de entrada (adjudicación). */
export function ritualDe(examen: string = FECHAS_V6.step1.examen, serumsInicio: string = FECHAS_V6.serums.inicio, skip: Set<string> = SKIP_V6,
  extra: string[] = ADJUDICACION_V6.map((p) => p.fecha)): string {
  let x = _add(examen, -2);
  for (let i = 0; i < MAX_PASOS; i++, x = _add(x, -1)) if (esDiaPlanBase(x, serumsInicio, skip) && !extra.includes(x)) return x;
  throw new Error('fecha inválida: ' + examen);
}
/** Días protegidos (A3) para un escenario: {último hábil antes del ENCAPS, D-1, ENCAPS, lunes siguiente} ∪ {ritual, E−1, E} ∪ {adjudicación}. */
export function protegidosDe(p: { encaps?: string; encapsProvisional?: boolean; examen?: string; serumsInicio?: string; skip?: Set<string>; adjudicacion?: ProtegidoV6[] } = {}): ProtegidoV6[] {
  const encaps = p.encaps ?? FECHAS_V6.encaps.examen, examen = p.examen ?? FECHAS_V6.step1.examen;
  const serumsInicio = p.serumsInicio ?? FECHAS_V6.serums.inicio, skip = p.skip ?? SKIP_V6, adjudicacion = p.adjudicacion ?? ADJUDICACION_V6;
  const provisional = p.encapsProvisional ?? FECHAS_V6.encaps.provisional;
  const lista: ProtegidoV6[] = [
    { fecha: ultimoHabilAntes(encaps, skip), motivo: 'D-1 hábil ENCAPS' },
    { fecha: _add(encaps, -1), motivo: 'D-1 ENCAPS' },
    { fecha: encaps, motivo: provisional ? 'ENCAPS (provisional)' : 'ENCAPS' },
    { fecha: lunesLibreDe(encaps), motivo: 'lunes libre post-ENCAPS' },
    { fecha: ritualDe(examen, serumsInicio, skip, adjudicacion.map((a) => a.fecha)), motivo: 'ritual test-day' },
    { fecha: viajeD1De(examen), motivo: 'viaje D-1' },
    { fecha: examen, motivo: 'EXAMEN Step 1' },
    ...adjudicacion.map((a) => ({ fecha: a.fecha, motivo: a.motivo })),
  ];
  const vistos = new Set<string>();
  return lista.filter((x) => !vistos.has(x.fecha) && !!vistos.add(x.fecha)).sort((a, b) => (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0));
}
/** DJ-1 (Joseph): fecha a RESERVAR por fecha del ENCAPS — ${dj1Texto(DJ1)}${DJ1.length === 1 ? ` (DJ-1 v6.04: examen ${f(DJ1[0].examen)} por decisión de Joseph; v6.00-v6.03: ${dj1Texto(DJ1_V600)})` : ''}. */
export const DJ1_V6: { encapsHasta: string | null; examen: string }[] = ${L(DJ1)};
export function reservaDJ1(encaps: string = FECHAS_V6.encaps.examen): string {
  for (const x of DJ1_V6) if (x.encapsHasta === null || encaps <= x.encapsHasta) return x.examen;
  return FECHAS_V6.step1.planB; // inalcanzable: la última fila de DJ-1 no tiene tope
}
/** Fecha a RESERVAR guardada en el JSON (validada = DJ-1, o la regla de cálculo si fue más tardía) o, si el escenario no está, DJ-1. */
export function reservaStep1(encaps: string = FECHAS_V6.encaps.examen): string { return FECHAS_V6.step1.reserva_por_encaps[encaps] ?? reservaDJ1(encaps); }
/** STEP1_SEMANAS de un escenario = SEMANAS_F1 (${d.semanasF1}, derivado de f1.inicio → f1.fin; v6.00: 13) + semanas(lunes del reinicio → lunes del examen). */
export function step1SemanasDe(reinicio: string = FECHAS_V6.step1.reinicio, examen: string = FECHAS_V6.step1.examen): number {
  return SEMANAS_F1 + _diff(_lunesDe(reinicio), _lunesDe(examen)) / 7;
}
/** Reinicio vigente del Step 1 (martes tras el lunes libre post-ENCAPS). */
export function reinicioStep1(): string { return FECHAS_V6.step1.reinicio; }

// ── predicados por fecha ──
export function esProtegido(iso: string): boolean { return DIAS_PROTEGIDOS.has(iso); }
export function motivoProtegido(iso: string): string | null { return FECHAS_V6.protegidos.find((p) => p.fecha === iso)?.motivo ?? null; }
export function esFeriado(iso: string): boolean { return FERIADOS_V6.has(iso); }
/** Step 1 en PAUSA (transición + F2 ENCAPS + lunes libre): estado PAUSA en la app, sin fila «hoy» (§B2, §F). */
export function enPausaStep1(iso: string): boolean { return iso > FECHAS_V6.f1.fin && iso < FECHAS_V6.step1.reinicio; }
/**
 * ¿Es \`iso\` día de plan? Sin \`plan\`: L-V (L-S desde serums.inicio), desde el D1, sin SKIP ni protegidos.
 * Con \`plan\`: 'usmle' añade el ritual (fila T final) y quita la PAUSA y lo posterior al ritual; 'encaps' añade el D-1 hábil
 * (medio día) y quita lo posterior al ENCAPS (excepciones de V3, §H). Los demás planes usan la regla genérica.
 */
export function esDiaPlan(iso: string, plan?: PlanV6): boolean {
  if (iso < FECHAS_V6.f1.inicio) return false;
  if (!esDiaPlanBase(iso)) return false;
  if (DIAS_PROTEGIDOS.has(iso)) {
    if (plan === 'usmle') return iso === FECHAS_V6.step1.ritual;
    if (plan === 'encaps') return iso === DERIVADOS_V6.d1HabilEncaps;
    return false;
  }
  if (plan === 'usmle') return !enPausaStep1(iso) && iso <= FECHAS_V6.step1.ritual;
  if (plan === 'encaps') return iso < FECHAS_V6.encaps.examen;
  return true;
}
/** Fase v6 de una fecha. Antes del D1 (≤ ${fy(add(F.f1.inicio, -1))}) devuelve 'F1' (la app ya muestra F1 la víspera). */
export function faseV6(iso: string): FaseV6 {
  if (iso < FECHAS_V6.f1.inicio) return 'F1';
  for (const x of FASES_V6) if (iso >= x.desde && (x.hasta === null || iso <= x.hasta)) return x.id;
  return 'F5';
}
export function faseV6Info(iso: string): FaseV6Info { const id = faseV6(iso); return FASES_V6.find((x) => x.id === id) ?? (FASES_V6[0] as FaseV6Info); }

// ── semana del Step 1 (definición única; antes en homeBriefing — §F, r2 · I7) ──
/** Semanas de F1 (S1 = semana del ${f(lunesDe(F.f1.inicio))} → S${d.semanasF1} = semana del ${f(lunesDe(F.f1.fin))}). */
export const SEMANAS_F1 = ${d.semanasF1};
/** ${d.step1Semanas} = ${d.semanasF1} (F1) + semanas(lunes del reinicio ${f(lunesDe(d.reinicio))} → lunes del examen ${f(lunesDe(F.step1.examen))}); la semana del examen queda fuera (etiqueta 'examen'). */
export const STEP1_SEMANAS = ${d.step1Semanas};
export interface SemanaStep1 {
  /** 0 = antes del D1 · 1-${d.semanasF1} = F1 · ${d.semanasF1} durante la PAUSA (no avanza) · ${d.semanasF1 + 1}-STEP1_SEMANAS = tramo 2 · STEP1_SEMANAS + 1 = semana del examen */
  n: number;
  /** STEP1_SEMANAS */
  total: number;
  lunes: string; viernes: string; sabado: string;
  /** semanas de la pausa (${f(add(lunesDe(F.f1.fin), 7))} → semana del ENCAPS): semanaLabel = 'PAUSA · ENCAPS' */
  pausa: boolean;
  /** semana del examen Step 1: semanaLabel = 'examen' */
  examen: boolean;
  deload: boolean; deloadMotivo?: string | undefined;
  /** hito(s) del plan en esa semana (si se pasan en \`extras.hitos\`) */
  hito?: string | undefined;
  /** n < 1 o n > total, salvo en la pausa (el chip PAUSA se muestra) */
  fueraDeRango: boolean;
}
/** Datos del plan que la hoja no puede importar (hitosStep1(), DELOAD_SEMANAS de homeBriefing): se pasan aquí. */
export interface SemanaStep1Extras {
  hitos?: { fecha: string; nombre: string }[];
  deloads?: { lunes: string; motivo: string }[];
}
/**
 * Semana del Step 1 (lunes→domingo; determinista, sin reloj): S1-S${d.semanasF1} = F1 · pausa (${f(add(lunesDe(F.f1.fin), 7))} → semana del ENCAPS) →
 * { pausa: true } · desde la semana del reinicio ${d.semanasF1} + k · semana del examen → { examen: true }.
 */
export function semanaStep1(iso: string, extras: SemanaStep1Extras = {}): SemanaStep1 {
  const lunes = _lunesDe(iso), lunRein = _lunesDe(FECHAS_V6.step1.reinicio);
  let n: number, pausa = false;
  if (iso < FECHAS_V6.f1.inicio) n = 0;                                   // pre-D1 (días de la semana 1 anteriores al D1)
  else if (lunes <= _lunesDe(FECHAS_V6.f1.fin)) n = 1 + _diff(_lunesDe(FECHAS_V6.f1.inicio), lunes) / 7;
  else if (lunes < lunRein) { n = SEMANAS_F1; pausa = true; }              // PAUSA · ENCAPS
  else n = SEMANAS_F1 + 1 + _diff(lunRein, lunes) / 7;                    // tramo 2
  const examen = lunes === _lunesDe(FECHAS_V6.step1.examen);
  const domingo = _add(lunes, 6);
  const dl = (extras.deloads ?? []).find((x) => x.lunes === lunes);
  const hito = (extras.hitos ?? []).filter((h) => h.fecha >= lunes && h.fecha <= domingo).map((h) => h.nombre).join(' + ') || undefined;
  return {
    n, total: STEP1_SEMANAS, lunes, viernes: _add(lunes, 4), sabado: _add(lunes, 5), pausa, examen,
    deload: !!dl, deloadMotivo: dl ? dl.motivo : undefined, hito, fueraDeRango: !pausa && (n < 1 || n > STEP1_SEMANAS),
  };
}

// ── ${F.corrida_s1.version}: semana 1 corrida (orden de Joseph del ${fy(F.corrida_s1.decidido)}) ──
/** Parte de un día de reparto: bloques de la plantilla de la fecha de plan «de» (id de bloque de plantillasV6 → desfase en minutos). */
export interface ParteCorridaS1 { de: string; bloques: Record<string, number> }
export type CorridaS1 =
  | { tipo: 'sin_sesion' }
  | { tipo: 'alias'; de: string }
  | { tipo: 'reparto'; de: string; partes: ParteCorridaS1[] };
/**
 * Semana corrida: ${[`${F.corrida_s1.sin_sesion.map(f).join(' · ')} sin sesión`,
    ...Object.entries(F.corrida_s1.alias).map(([r, de]) => `${f(r)} = plan del ${f(de)}`),
    ...Object.entries(F.corrida_s1.reparto).map(([r, x]) => `${f(r)} = ${x.partes.map((p) => `${Object.keys(p.bloques).join('+')} del ${f(p.de)}`).join(' / ')}`)].join(' · ')}.
 * null fuera de esos días${Object.keys(F.corrida_s1.alias).length || Object.keys(F.corrida_s1.reparto).length
    ? ': el resto del calendario es idéntico (los planes, Supabase, runners y guías conservan su fecha de plan).'
    : ' (sin alias ni reparto: los planes, Supabase, runners y guías ya están re-fechados por el corrimiento).'}
 */
export function corridaS1De(iso: string): CorridaS1 | null {
  const c = FECHAS_V6.corrida_s1;
  if (c.sin_sesion.includes(iso)) return { tipo: 'sin_sesion' };
  const a = c.alias[iso];
  if (a) return { tipo: 'alias', de: a };
  const r = c.reparto[iso];
  return r ? { tipo: 'reparto', de: r.de, partes: r.partes } : null;
}
/** Ids de bloque de plantillasV6 de cada frente (en un día de reparto, la vista de un frente sigue a la parte que tiene su bloque). */
export const BLOQUES_POR_FRENTE: Record<string, string[]> = {
  usmle: ['anki', 'usmle', 'eval', 'anki-sab', 'anki-dom'], mir: ['mir'], encaps: ['encaps'], 'research-derma': ['rd'], aurum: ['aurum'],
  liviano: ['liv'], synapse: ['syn', 'pc', 'feynman'], vibecoding: ['vibe', 'pc', 'feynman'], business: ['biz'], revision: ['revision'],
};
/**
 * Fecha de PLAN que toca un día real (vistas por frente): alias → el plan del día anterior · reparto (sáb/dom) → con \`frente\`, la fecha
 * de plan de la parte que lleva un bloque de ese frente ese día (p. ej. dom 25 USMLE → el Anki del propio domingo; sáb 24 USMLE → vie 23);
 * si ese día no tiene bloque del frente, el día repartido (su sesión es el otro día del fin de semana) · resto → la propia.
 */
export function fechaPlanDe(iso: string, frente?: string): string {
  const c = corridaS1De(iso);
  if (!c || c.tipo === 'sin_sesion') return iso;
  if (c.tipo === 'alias' || !frente) return c.de;
  const ids = BLOQUES_POR_FRENTE[frente] ?? [];
  const parte = c.partes.find((p) => Object.keys(p.bloques).some((id) => ids.includes(id)));
  return parte ? parte.de : c.de;
}
/**
 * Inversa de fechaPlanDe para MOSTRAR fechas (mar 20-oct-2026, a pedido de Joseph: «dice que empieza el 19 y estamos empezando el 20»):
 * día REAL en que se hace la fila cuya fecha de plan es \`plan\` (19 → mar 20 … 22 → vie 23; 23 → sáb 24 o dom 25 según el \`frente\`;
 * sábado nativo 24 → sáb 24 o dom 25 según el frente). Fuera de la semana corrida = la propia. Solo para etiquetas: las filas, el
 * progreso y Supabase siguen con la fecha de plan.
 */
export function fechaRealDe(plan: string, frente?: string): string {
  const c = FECHAS_V6.corrida_s1;
  for (const [r, de] of Object.entries(c.alias)) if (de === plan) return r;
  const ids = frente ? (BLOQUES_POR_FRENTE[frente] ?? []) : null;
  for (const [r, x] of Object.entries(c.reparto)) for (const p of x.partes) if (p.de === plan && (!ids || Object.keys(p.bloques).some((id) => ids.includes(id)))) return r;
  return plan;
}
`;
}

// ═══ comprobación: el .ts transpilado da lo mismo que este fichero ═══
function cargarTS(src) {
  let ts;
  try { ts = require(path.join(ROOT, 'node_modules', 'typescript')); } catch { return null; }
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const m = { exports: {} };
  new Function('exports', 'module', 'require', js)(m.exports, m, () => { throw new Error('fechasV6.ts no debe importar nada'); });
  return m.exports;
}
function compararTS(T, F, d) {
  const err = [];
  const eq = (que, a, b) => { if (JSON.stringify(a) !== JSON.stringify(b)) err.push(`${que}: ts ${JSON.stringify(a)} · node ${JSON.stringify(b)}`); };
  eq('FECHAS_V6', T.FECHAS_V6, F);
  eq('FASES_V6', T.FASES_V6, fasesV6(F, d));
  eq('STEP1_SEMANAS', T.STEP1_SEMANAS, d.step1Semanas);
  eq('SEMANAS_F1', T.SEMANAS_F1, d.semanasF1);
  eq('DIAS_PROTEGIDOS', [...T.DIAS_PROTEGIDOS], F.protegidos.map((p) => p.fecha));
  eq('BLOQUES_POR_FRENTE', T.BLOQUES_POR_FRENTE, BLOQUES_POR_FRENTE);
  eq('reinicioStep1()', T.reinicioStep1(), d.reinicio);
  eq('protegidosDe()', T.protegidosDe(), d.protegidos);
  eq('ritualDe()', T.ritualDe(), d.ritual);
  eq('reservaStep1()', T.reservaStep1(), d.reservaActual);
  for (const [k, v] of Object.entries({ d1HabilEncaps: d.d1HabilEncaps, lunesLibre: d.lunesLibre, reinicio: d.reinicio, f3Fin: d.f3Fin, adaptacionHasta: d.adaptacionHasta,
    ultimoDiaEstudio: d.ultimoDiaEstudio, ritual: d.ritual, viajeD1: d.viajeD1, gonogo: d.gonogo, convocatoriaTope: d.convocatoriaTope, reserva: d.reservaActual,
    semanasF1: d.semanasF1, step1Semanas: d.step1Semanas, diasF1: d.diasF1, diasF2: d.diasF2, diasF3: d.diasF3, diasF4: d.diasF4 })) eq('DERIVADOS_V6.' + k, T.DERIVADOS_V6[k], v);
  // predicados, día a día
  const extras = { hitos: [{ fecha: '2026-12-22', nombre: 'NBME 28' }, { fecha: '2027-08-09', nombre: 'GO/NO-GO' }], deloads: [{ lunes: '2026-11-16', motivo: 'x' }] };
  for (const s of rango('2026-09-01', '2028-01-31')) {
    eq('faseV6 ' + s, T.faseV6(s), faseV6(s, F));
    eq('esProtegido ' + s, T.esProtegido(s), esProtegido(s, F));
    eq('enPausaStep1 ' + s, T.enPausaStep1(s), enPausaStep1(s, F));
    for (const p of [undefined, 'usmle', 'encaps', 'mir', 'research', 'derma', 'aurum']) eq(`esDiaPlan ${s} ${p}`, T.esDiaPlan(s, p), esDiaPlan(s, p, F));
    eq('semanaStep1 ' + s, T.semanaStep1(s, extras), semanaStep1(s, extras, F));
    eq('corridaS1De ' + s, T.corridaS1De(s), corridaS1De(s, F));
    eq('fechaPlanDe ' + s, T.fechaPlanDe(s), fechaPlanDe(s, F));
    for (const fr of [...Object.keys(BLOQUES_POR_FRENTE), 'otro']) eq(`fechaPlanDe ${s} ${fr}`, T.fechaPlanDe(s, fr), fechaPlanDe(s, F, fr));
    eq('fechaRealDe ' + s, T.fechaRealDe(s), fechaRealDe(s, F));
    for (const fr of [...Object.keys(BLOQUES_POR_FRENTE), 'otro']) eq(`fechaRealDe ${s} ${fr}`, T.fechaRealDe(s, fr), fechaRealDe(s, F, fr));
    if (err.length > 20) break;
  }
  // derivaciones en los escenarios (A5) × los exámenes de prueba (DJ-1 vigente ∪ DJ-1 v6.00: 31-ago · 27-sep · 25-oct) × SERUMS 3-may / 6-may
  // (sensibilidad §B4.3) + un ENCAPS en sábado
  const skip = new Set(F.skip);
  for (const enc of [...F.encaps.escenarios, '2027-03-13', '2027-03-28']) {
    for (const S of ['2027-05-03', '2027-05-06']) {
      for (const E of EXAMENES_PRUEBA) {
        const R = reinicioDe(enc), c = { encaps: enc, encapsProvisional: true, examen: E, serumsInicio: S, skip, adjudicacion: [] };
        eq(`reinicioDe ${enc}`, T.reinicioDe(enc), R);
        eq(`lunesLibreDe ${enc}`, T.lunesLibreDe(enc), lunesLibreDe(enc));
        eq(`ultimoHabilAntes ${enc}`, T.ultimoHabilAntes(enc, skip), ultimoHabilAntes(enc, skip));
        eq(`convocatoriaTopeDe ${enc}`, T.convocatoriaTopeDe(enc), convocatoriaTopeDe(enc));
        eq(`reservaDJ1 ${enc}`, T.reservaDJ1(enc), reservaDJ1(enc));
        eq(`f3FinDe ${S}`, T.f3FinDe(S, skip), f3FinDe(S, skip));
        eq(`adaptacionHastaDe ${S}`, T.adaptacionHastaDe(S), adaptacionHastaDe(S));
        eq(`gonogoDe ${E}`, T.gonogoDe(E), gonogoDe(E));
        eq(`viajeD1De ${E}`, T.viajeD1De(E), viajeD1De(E));
        eq(`ritualDe ${E} ${S}`, T.ritualDe(E, S, skip, []), ritualDe(E, S, skip, []));
        eq(`protegidosDe ${enc} ${E} ${S}`, T.protegidosDe(c), protegidosDe(c));
        eq(`step1SemanasDe ${R} ${E}`, T.step1SemanasDe(R, E), step1SemanasDe(R, E, F.f1.inicio, F.f1.fin));
      }
    }
  }
  return err;
}

// ═══ main ═══
function main() {
  const argv = process.argv.slice(2);
  const soloCheck = argv.includes('--check'), calculo = argv.includes('--calculo');
  const F = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8').replace(/^﻿/, ''));
  const dif = validar(F, { calculo });
  if (dif.length) {
    console.error(`✗ _fechas_v6.json: ${dif.length} valor(es) guardado(s) ≠ derivado(s) — ABORTO (V6_ESPEC §A4), no se escribe nada:`);
    for (const x of dif) console.error(`  · ${x.campo}: guardado ${JSON.stringify(x.guardado)} · derivado ${JSON.stringify(x.derivado)}`);
    process.exit(1);
  }
  const d = derivar(F, { calculo });
  const errFases = comprobarFases(fasesV6(F, d));
  if (errFases.length) { console.error('✗ ' + errFases.join('\n✗ ')); process.exit(1); }
  console.log(`✓ _fechas_v6.json ${F.version}: guardado = derivado (reinicio ${fy(d.reinicio)} · gonogo ${fy(d.gonogo)} · ritual ${f(d.ritual)} · viaje ${f(d.viajeD1)} · ` +
    `inducción → ${f(d.adaptacionHasta)} · convocatoria tope ${f(d.convocatoriaTope)} · ${d.protegidos.length} protegidos · reserva ${f(F.encaps.examen)} → ${fy(d.reservaActual)})`);
  console.log(`  reserva por escenario (DJ-1): ${Object.entries(d.reserva).map(([e, r]) => `${f(e)} → ${f(r)}`).join(' · ')}`);
  if (calculo) {
    for (const [e, c] of Object.entries(d.calculo)) {
      const dj = reservaDJ1(e);
      console.log(`  cálculo ${f(e)} (reinicio ${f(reinicioDe(e))}): ${c.detalle.map((x) => `${f(x.E)} piso ${x.piso >= 0 ? '+' : ''}${x.piso} h · déficit ${x.def} u`).join(' | ')} → ${c.reserva ? f(c.reserva) : 'NINGUNA (extensión)'}` +
        (c.reserva === dj ? ' = DJ-1 ✓' : ` ≠ DJ-1 ${f(dj)} → manda la más tardía · AVISAR A JOSEPH`));
    }
  }
  console.log('  fases: ' + fasesV6(F, d).map((x) => `${x.id} ${f(x.desde)}→${x.hasta ? f(x.hasta) : '…'}${x.diasPlan ? ' (' + x.diasPlan + ')' : ''}`).join(' · '));
  console.log(`  STEP1_SEMANAS ${d.step1Semanas} (F1 ${d.semanasF1}) · último día con estudio ${f(d.ultimoDiaEstudio)} · F3 fin ${f(d.f3Fin)}`);
  const ts = emitirTS(F, d);
  const T = cargarTS(ts);
  if (!T) console.warn('⚠ typescript no disponible en node_modules: no se pudo comprobar el .ts contra node');
  else {
    const err = compararTS(T, F, d);
    if (err.length) { console.error(`✗ fechasV6.ts ≠ gen_fechas_v6.js (${err.length}+ diferencias) — ABORTO, no se escribe:\n  ` + err.slice(0, 20).join('\n  ')); process.exit(1); }
    console.log(`✓ fechasV6.ts (transpilado en memoria) = gen_fechas_v6.js: 0 diferencias (2026-09-01 → 2028-01-31 · ${F.encaps.escenarios.length + 2} ENCAPS × 2 SERUMS × ${EXAMENES_PRUEBA.length} exámenes)`);
  }
  if (soloCheck) {
    const actual = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null;
    if (actual !== ts) { console.error(`✗ ${path.relative(ROOT, OUT)} no está al día (correr sin --check)`); process.exit(1); }
    console.log(`✓ ${path.relative(ROOT, OUT)} al día`);
    return;
  }
  fs.writeFileSync(OUT, ts, 'utf8');
  console.log(`→ ${path.relative(ROOT, OUT)} (${ts.length} chars)`);
}

module.exports = {
  // rutas
  JSON_FILE, OUT,
  // calendario
  add, wd, diff, lunesDe, rango, f, fy, esISO, esHabil, habLV, esDiaPlanBase,
  // derivaciones §A4
  reinicioDe, lunesLibreDe, ultimoHabilAntes, f3FinDe, adaptacionHastaDe, gonogoDe, convocatoriaTopeDe, viajeD1De, ritualDe, protegidosDe,
  DJ1, DJ1_V600, EXAMENES_PRUEBA, dj1Texto, reservaDJ1, reservaCalculo, colchonPiso, semanasF1De, step1SemanasDe, RX_ADJUDICACION,
  // JSON
  cargarFechasV6, validar, derivar, ctxDe, comprobarForma,
  // fases y predicados (F opcional = el JSON validado)
  fasesV6, faseV6, esProtegido, enPausaStep1, esDiaPlan, semanaStep1,
  // v6.02d: semana 1 corrida (alias en la consulta)
  comprobarCorridaS1, corridaS1De, fechaPlanDe, fechaRealDe, BLOQUES_POR_FRENTE,
};

if (require.main === module) main();
