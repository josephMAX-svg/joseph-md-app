/**
 * gen_mir_mantenimiento.js — genera src/lib/mirMantenimiento.ts (MIR modo BANQUEO PURO ene-mar 2027).
 *
 *   Uso:  node DATA/_scripts/gen_mir_mantenimiento.js [YYYY-MM-DD inicio] [YYYY-MM-DD fin]
 *         (default 2027-01-04 → 2027-03-31; L-V; salta sáb/dom y SKIP_FIJOS: 25-dic/31-dic/1-ene)
 *
 * Contexto (v5.6): el plan MIR de 78 días termina el 23-dic-2026; del 4-ene al 31-mar-2027 el
 * bloque 15:15-16:15 sigue en el Calendar pero MIR_DIAS no tiene contenido (ROADMAP mantiene
 * "MIR 1h" en fase 1 y 2). Este fichero llena ese hueco SIN contenido nuevo: solo retrieval.
 *
 *  · 15:15-15:30 Anki APEX::MIR (FSRS · Good/Again) + 15:30-16:02 25Q reales MIR mixtas
 *    cronometradas (77 s/Q = 32 min; 15Q asignatura foco + 10Q interleaving) + 16:02-16:15
 *    corrección −1/3 + Whole-Page de los fallos + log (13 min).
 *  · Rotación lun-jue PONDERADA POR PESO MIR de cada asignatura (Peso global real del capítulo
 *    de introducción de ProMIR, mirDetalleData.pesoGlobal; smooth weighted round-robin +
 *    reparto por resto mayor = cuotas exactas). Viernes = 30Q de la asignatura PEOR DEL LOG
 *    (mirEvalLog.mirPeorAsignatura(); fallback = la de mayor peso vista esa semana).
 *  · modo 'reducido' 4-22 ene (Fase B/C del Step 1): solo Anki + 10Q (flag modoReducido).
 *  · Handoff 31-mar: export JSON del log + tabla de neto por asignatura + stats FSRS → entrada
 *    de la fase principal (abr-2027).
 *
 * Fuentes: pesos = mirDetalleData.ts (pesoGlobal por asignatura, texto real de ProMIR);
 * asignaturas = las 14 del plan (gen_mir_daily.js BLOQUES). No se inventan preguntas: el pool
 * es ProMIR (test por asignatura) o cuadernillos oficiales (examenesmir.com) → ver
 * mirPreguntasOficiales.ts (pendiente de scrape).
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const OUT = path.join(ROOT, 'src/lib/mirMantenimiento.ts');
const INICIO = process.argv[2] || '2027-01-04';
const FIN = process.argv[3] || '2027-03-31';
for (const s of [INICIO, FIN]) if (!/^20\d\d-\d\d-\d\d$/.test(s)) throw new Error('fecha inválida: ' + s);
/** hasta esta fecha (incl.) el bloque va en modo reducido (Fase B/C Step 1 · examen 25-29 ene) */
const REDUCIDO_HASTA = '2027-01-22';

// ── calendario (idéntico a remap_inicio.js) ──
const SKIP_FIJOS = new Set(['2026-12-25', '2026-12-31', '2027-01-01']);
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const iso = (d) => d.toISOString().slice(0, 10);
const fromISO = (s) => new Date(s + 'T12:00:00Z');
function* fechas(desde, hasta) {
  const d = fromISO(desde), end = fromISO(hasta);
  while (d <= end) { const dow = d.getUTCDay(), f = iso(d); if (dow >= 1 && dow <= 5 && !SKIP_FIJOS.has(f)) yield { fecha: f, dow }; d.setUTCDate(d.getUTCDate() + 1); }
}

// ── Peso MIR global por asignatura (mirDetalleData.ts · pesoGlobal, capítulo intro real de ProMIR) ──
// Se toma el valor central del texto: "8-10%"→9 · "~10% histórico; ~9% últimos 5"→9 · "4-5%"→4,5.
const ASIGS = [
  { num: 3, asignatura: 'Cardiología', peso: 9, fuente: '8-10% (~10% últimos 5 años)' },
  { num: 11, asignatura: 'Gastroenterología', peso: 9, fuente: '~10% histórico; ~9% últimos 5 años' },
  { num: 20, asignatura: 'Neurología', peso: 8, fuente: '~8% últimos 5 años (~15/año)' },
  { num: 7, asignatura: 'Enfermedades Infecciosas', peso: 8, fuente: '~8% (10-15 preguntas/año)' },
  { num: 6, asignatura: 'Endocrinología y Nutrición', peso: 7, fuente: '7% del MIR' },
  { num: 19, asignatura: 'Neumología', peso: 6, fuente: '~6% (10-13 preguntas/año)' },
  { num: 28, asignatura: 'Reumatología', peso: 6, fuente: '6% (~12-15 preguntas/año)' },
  { num: 8, asignatura: 'Epidemiología', peso: 5, fuente: '~5% del examen (reducido a la mitad en las últimas convocatorias)' },
  { num: 18, asignatura: 'Nefrología', peso: 5, fuente: '~5% del MIR' },
  { num: 15, asignatura: 'Hematología', peso: 5, fuente: 'Media (~5%)' },
  { num: 26, asignatura: 'Psiquiatría', peso: 4.5, fuente: '4-5%' },
  { num: 24, asignatura: 'Pediatría', peso: 4, fuente: '~4% (~8 preguntas/año)' },
  { num: 14, asignatura: 'Ginecología y Obstetricia', peso: 3, fuente: '~3% (10-14 preguntas/año)' },
  { num: 17, asignatura: 'Medicina Legal y Bioética', peso: 1.2, fuente: '~1,2% (11 preguntas en 5 años)' },
];
const byNum = Object.fromEntries(ASIGS.map((a) => [a.num, a]));

// ── verificación: los pesos deben poder rastrearse al texto de mirDetalleData.ts ──
const detSrc = fs.readFileSync(path.join(ROOT, 'src/lib/mirDetalleData.ts'), 'utf8');
for (const a of ASIGS) {
  const i = detSrc.indexOf('\n  ' + a.num + ': {'); if (i < 0) throw new Error('mirDetalleData sin num ' + a.num);
  const pg = (detSrc.slice(i, detSrc.indexOf('\n  },', i)).match(/pesoGlobal: '((?:[^'\\]|\\.)*)'/) || [])[1] || '';
  const nums = [...pg.matchAll(/(\d+(?:[.,]\d+)?)\s*%/g)].map((m) => +m[1].replace(',', '.'));
  const rangos = [...pg.matchAll(/(\d+)-(\d+)%/g)].map((m) => [+m[1], +m[2]]);
  const ok = nums.some((n) => Math.abs(n - a.peso) <= 1.5) || rangos.some(([x, y]) => a.peso >= x && a.peso <= y);
  if (!ok) throw new Error(`peso ${a.peso} de ${a.asignatura} no se rastrea en pesoGlobal: "${pg}"`);
}

// ── días ──
const DIAS_CAL = [...fechas(INICIO, FIN)];
const lunJue = DIAS_CAL.filter((x) => x.dow !== 5);
const nSlots = lunJue.length;

// cuotas exactas por resto mayor
const totalPeso = ASIGS.reduce((a, x) => a + x.peso, 0);
const cuotas = ASIGS.map((a) => ({ num: a.num, q: (a.peso / totalPeso) * nSlots }));
let asignados = cuotas.map((c) => ({ num: c.num, n: Math.floor(c.q), resto: c.q - Math.floor(c.q) }));
let faltan = nSlots - asignados.reduce((s, x) => s + x.n, 0);
asignados.slice().sort((x, y) => y.resto - x.resto).slice(0, faltan).forEach((x) => { asignados.find((y) => y.num === x.num).n += 1; });
const cuotaDe = Object.fromEntries(asignados.map((x) => [x.num, x.n]));

// smooth weighted round-robin con pesos = cuotas → secuencia bien repartida y cuotas exactas
const cur = Object.fromEntries(ASIGS.map((a) => [a.num, 0]));
const usados = Object.fromEntries(ASIGS.map((a) => [a.num, 0]));
const secuencia = [];
for (let k = 0; k < nSlots; k++) {
  let best = null;
  for (const a of ASIGS) {
    if (usados[a.num] >= cuotaDe[a.num]) continue;
    cur[a.num] += cuotaDe[a.num];
    if (!best || cur[a.num] > cur[best]) best = a.num;
  }
  cur[best] -= nSlots;
  usados[best] += 1;
  secuencia.push(best);
}
for (const a of ASIGS) if (usados[a.num] !== cuotaDe[a.num]) throw new Error('cuota no cumplida ' + a.asignatura);

// filas
const ROWS = []; let d = 0, semana = 0, si = 0; const focosSemana = [];
const previos = [];
for (const x of DIAS_CAL) {
  if (x.dow === 1 || d === 0) { semana += 1; focosSemana.length = 0; }
  d += 1;
  const modo = x.fecha <= REDUCIDO_HASTA ? 'reducido' : 'normal';
  if (x.dow === 5) {
    const fallback = focosSemana.slice().sort((a, b) => byNum[b].peso - byNum[a].peso)[0] || secuencia[si % secuencia.length];
    const nQ = modo === 'reducido' ? 10 : 30;
    ROWS.push({
      d, fecha: x.fecha, wd: WD[x.dow], semana, modo, tipo: 'viernes',
      num: fallback, asignatura: byNum[fallback].asignatura, num2: null, asignatura2: null,
      nQ, minQ: Math.round(nQ * 77 / 60 * 10) / 10, minCorr: modo === 'reducido' ? 7 : 11,
      tema: modo === 'reducido'
        ? `VIERNES reducido · Anki + 10Q de la asignatura PEOR del log (fallback: ${byNum[fallback].asignatura}) · corrección corta`
        : `VIERNES · 30Q reales de la asignatura PEOR del log (fallback: ${byNum[fallback].asignatura}) · 38,5 min cronometrados · neto semanal al log`,
    });
    continue;
  }
  const num = secuencia[si++];
  focosSemana.push(num);
  const num2 = previos.length ? previos[previos.length - 1] : null;
  const nQ = modo === 'reducido' ? 10 : 25;
  ROWS.push({
    d, fecha: x.fecha, wd: WD[x.dow], semana, modo, tipo: 'banco',
    num, asignatura: byNum[num].asignatura, num2, asignatura2: num2 ? byNum[num2].asignatura : null,
    nQ, minQ: Math.round(nQ * 77 / 60 * 10) / 10, minCorr: modo === 'reducido' ? 7 : 13,
    tema: modo === 'reducido'
      ? `REDUCIDO (Fase B/C Step 1) · Anki APEX::MIR + 10Q mixtas (${byNum[num].asignatura}${num2 ? ' + ' + byNum[num2].asignatura : ''}) · 13 min`
      : `BANCO · 25Q reales MIR: 15Q ${byNum[num].asignatura} + 10Q interleaving (${num2 ? byNum[num2].asignatura + ' y anteriores' : 'mixtas'}) · 32 min + 13 min corrección`,
  });
  previos.push(num);
}

// ── emitir ──
const KEYS = ['d', 'fecha', 'wd', 'semana', 'modo', 'tipo', 'num', 'asignatura', 'num2', 'asignatura2', 'nQ', 'minQ', 'minCorr', 'tema'];
const rowTS = (r) => '{' + KEYS.map((k) => k + ':' + JSON.stringify(r[k])).join(',') + '}';
const nRed = ROWS.filter((r) => r.modo === 'reducido').length;
const out = `/**
 * mirMantenimiento.ts — MIR modo BANQUEO PURO (ene→mar 2027) · GENERADO por
 * DATA/_scripts/gen_mir_mantenimiento.js ${INICIO} ${FIN} — NO editar a mano.
 *
 * ${ROWS.length} días L-V (${ROWS[0].fecha} → ${ROWS[ROWS.length - 1].fecha}; salta sáb/dom y 1-ene) · bloque Calendar 15:15-16:15 (no cambia).
 * Sin contenido nuevo: retrieval sobre las 14 asignaturas de la 1ª vuelta (mirDailyPlan D1-D76).
 *  · normal:   15:15-15:30 Anki APEX::MIR · 15:30-16:02 25Q reales MIR (15Q foco + 10Q interleaving · 77 s/Q) · 16:02-16:15 corrección −1/3 + Whole-Page + log
 *  · viernes:  15:15-15:25 Anki · 15:25-16:04 30Q de la asignatura PEOR del log (mirEvalLog) · 16:04-16:15 corrección + neto semanal
 *  · reducido (hasta ${REDUCIDO_HASTA}, Fase B/C Step 1): 15:15-15:35 Anki · 15:35-15:48 10Q · 15:48-15:55 log · resto al Step 1
 * Rotación lun-jue ponderada por Peso MIR global (ProMIR intro, mirDetalleData.pesoGlobal) → cuotas: ${ASIGS.map((a) => a.asignatura.split(' ')[0] + ' ' + cuotaDe[a.num]).join(' · ')}.
 * Handoff 31-mar: mirMantHandoff() → export del log + tabla de neto por asignatura = entrada de la fase principal (abr-2027).
 */
export interface DiaMIRMant {
  d: number; fecha: string; wd: string; semana: number;
  /** 'reducido' = solo Anki + 10Q (4-22 ene, Fase B/C del Step 1) · 'normal' = Anki + 25Q/30Q */
  modo: 'normal' | 'reducido';
  /** 'banco' lun-jue (rotación ponderada) · 'viernes' (asignatura peor del log) */
  tipo: 'banco' | 'viernes';
  /** asignatura foco del día (viernes: fallback si el log está vacío) */
  num: number; asignatura: string;
  /** asignatura secundaria para el interleaving (la del slot anterior) */
  num2: number | null; asignatura2: string | null;
  /** nº de preguntas, minutos cronometrados (77 s/Q) y minutos de corrección */
  nQ: number; minQ: number; minCorr: number;
  tema: string;
}
export const MIR_MANT_META = {
  inicio: '${ROWS[0].fecha}', fin: '${ROWS[ROWS.length - 1].fecha}', totalDias: ${ROWS.length},
  modoReducidoHasta: '${REDUCIDO_HASTA}', diasReducidos: ${nRed}, segPorQ: 77,
  bloque: '15:15–16:15 · Anki APEX::MIR + 25Q reales MIR mixtas (77 s/Q) + corrección · viernes 30Q de la asignatura peor del log',
  handoff: '31-mar-2027: export JSON del log (mirEvalLog) + tabla de neto por asignatura + stats FSRS del deck APEX::MIR → entrada de la fase principal MIR (abr-2027)',
};
/** Peso MIR global por asignatura (texto real del capítulo intro de ProMIR · mirDetalleData.pesoGlobal) y cuota de slots lun-jue. */
export const MIR_MANT_PESOS: Array<{ num: number; asignatura: string; peso: number; fuente: string; slots: number }> = [${ASIGS.map((a) => JSON.stringify({ num: a.num, asignatura: a.asignatura, peso: a.peso, fuente: a.fuente, slots: cuotaDe[a.num] })).join(',')}];
export const MIR_MANT_DIAS: DiaMIRMant[] = [${ROWS.map(rowTS).join(',')}];

export const MIR_MANT_FRANJAS: Record<DiaMIRMant['modo'] | 'viernes', Array<{ hora: string; fase: string; tipo: string }>> = {
  normal: [
    { hora: '15:15–15:30', fase: 'Anki APEX::MIR (FSRS · Good/Again · retention 0,85 hasta 31-mar)', tipo: 'anki' },
    { hora: '15:30–16:02', fase: '25Q reales MIR cronometradas (15Q asignatura foco + 10Q interleaving · 77 s/Q · opción en blanco)', tipo: 'quiz' },
    { hora: '16:02–16:15', fase: 'Corrección −1/3 (neto = A − F/3) · Whole-Page Rule de cada fallo · log (knowledge/transfer/proceso · 🇪🇸 delta)', tipo: 'log' },
  ],
  viernes: [
    { hora: '15:15–15:25', fase: 'Anki APEX::MIR (pasada corta)', tipo: 'anki' },
    { hora: '15:25–16:04', fase: '30Q reales de la asignatura PEOR del log (38,5 min · 77 s/Q · opción en blanco)', tipo: 'quiz' },
    { hora: '16:04–16:15', fase: 'Corrección + neto semanal por asignatura al log (mirEvalLog kind mantenimiento)', tipo: 'log' },
  ],
  reducido: [
    { hora: '15:15–15:35', fase: 'Anki APEX::MIR (solo mantener la deuda a cero · Fase B/C Step 1)', tipo: 'anki' },
    { hora: '15:35–15:48', fase: '10Q reales MIR mixtas (13 min · 77 s/Q)', tipo: 'quiz' },
    { hora: '15:48–15:55', fase: 'Corrección rápida + log', tipo: 'log' },
    { hora: '15:55–16:15', fase: 'Devuelto al Step 1 (banco intensivo / sprint final)', tipo: 'libre' },
  ],
};

export function mirMantDiaDe(fechaISO: string): DiaMIRMant | undefined { return MIR_MANT_DIAS.find((x) => x.fecha === fechaISO); }
export function mirMantFranjas(dia: DiaMIRMant) { return dia.tipo === 'viernes' && dia.modo === 'normal' ? MIR_MANT_FRANJAS.viernes : MIR_MANT_FRANJAS[dia.modo]; }
/** Foco real del día: los viernes manda la asignatura peor del log (si hay); el resto sigue la rotación. */
export function mirMantFoco(dia: DiaMIRMant, peorAsignaturaLog?: string | null): { asignatura: string; num: number | null; nQ: number; origen: 'log' | 'rotacion' } {
  if (dia.tipo === 'viernes' && peorAsignaturaLog) {
    const p = MIR_MANT_PESOS.find((x) => x.asignatura === peorAsignaturaLog);
    return { asignatura: peorAsignaturaLog, num: p ? p.num : null, nQ: dia.nQ, origen: 'log' };
  }
  return { asignatura: dia.asignatura, num: dia.num, nQ: dia.nQ, origen: 'rotacion' };
}
export function mirMant7d(fromD: number): DiaMIRMant[] { return MIR_MANT_DIAS.filter((x) => x.d >= fromD && x.d < fromD + 7); }
export function mirMantHandoff(): string { return MIR_MANT_META.handoff; }
`;
fs.writeFileSync(OUT, out, 'utf8');

// ── verificación ──
const errs = [];
if (ROWS[0].fecha !== [...fechas(INICIO, FIN)][0].fecha) errs.push('inicio');
for (const r of ROWS) { const w = fromISO(r.fecha).getUTCDay(); if (w === 0 || w === 6) errs.push('finde ' + r.fecha); if (SKIP_FIJOS.has(r.fecha)) errs.push('feriado ' + r.fecha); if (r.tipo === 'viernes' && w !== 5) errs.push('viernes mal ' + r.fecha); if (r.tipo === 'banco' && w === 5) errs.push('banco en viernes ' + r.fecha); }
const seen = new Set(); for (const r of ROWS) { if (seen.has(r.fecha)) errs.push('dup ' + r.fecha); seen.add(r.fecha); }
if (errs.length) { console.error('ERRORES:', errs); process.exit(1); }
console.log(`Wrote src/lib/mirMantenimiento.ts · ${ROWS.length} días (${ROWS[0].fecha} → ${ROWS[ROWS.length - 1].fecha}) · lun-jue ${nSlots} · viernes ${ROWS.length - nSlots} · reducidos ${nRed} (hasta ${REDUCIDO_HASTA})`);
console.log('Cuotas lun-jue: ' + ASIGS.map((a) => `${a.asignatura} ${cuotaDe[a.num]}`).join(' · '));
