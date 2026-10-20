/**
 * gen_mir_guia.js — genera src/lib/mirGuiaDatos.ts (DATOS de la guía MIR «qué · cuánto · cómo»; la LÓGICA vive en src/lib/mirGuia.ts).
 *   node DATA/MIR/guia_lectura/gen_mir_guia.js            → escribe src/lib/mirGuiaDatos.ts (aborta si un bloque no cuadra)
 *   node DATA/MIR/guia_lectura/gen_mir_guia.js --check    → regenera en memoria, compara con el fichero y valida la guía de TODOS los
 *                                                           días (D1-D78 del plan + las 189 sesiones del banqueo, también desplazadas
 *                                                           a los inicios de turno del SERUMS) con guia.validarGuia (exit 1 si falla)
 * Entradas (nada a mano en el .ts):
 *   · DATA/MIR/guia_lectura_semana1-2.json (E2, gen_guia_lectura.js: medición real ProMIR; v6.03: D1-D76) → MIR_GUIA_MEDIDA (bloque 60′ de
 *     cada día con la hora prefijada en cada paso + las preguntas exactas de cada paso: extra D1 · eval · cierre · pre-test · quiz);
 *   · src/lib/mirDailyPlan.ts (fechas, D#, capId: el JSON debe coincidir o se aborta) · src/lib/mirPreguntasOficiales.ts (nº de preguntas
 *     del pool oficial por capítulo del plan y por asignatura → MIR_POOL_POR_CAP / MIR_POOL_POR_ASIG, para la regla de los días sin medir).
 * Bitácora
 *  · v6.02c (18-oct-2026, E3): nuevo. No cambia fechas, D#, filas ni el pool: solo describe cada franja.
 *  · v6.03 (20-oct-2026 · corrimiento D1 = mié 21-oct + medición completa): MIR_GUIA_MEDIDA cubre D1-D76 (los 76 capítulos del plan medidos;
 *    D77 mini-MIR y D78 corrección siguen en mirGuia.ts porque no leen capítulo); se emite una línea compacta por día (el fichero pasa de 10 a
 *    76 días sin multiplicar su tamaño por 8) y MIR_CAP_MEDIDO (capId → minutos de lectura completa, palabras y las 3 secciones de más peso)
 *    para que el BANQUEO (mantenimiento · extensión · repuestas) también lleve el dato medido en la corrección Whole-Page. --check valida que
 *    TODOS los días-tema estén medidos.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { ROOT, cargarModuloTS } = require('../../_scripts/usmle/cargar_ts');

const CHECK = process.argv.includes('--check');
const OUT = path.join(ROOT, 'src', 'lib', 'mirGuiaDatos.ts');
const JSONF = path.join(ROOT, 'DATA', 'MIR', 'guia_lectura_semana1-2.json');
const aborta = (m) => { console.error('✗ ' + m + ' — ABORTO, no se escribe src/lib/mirGuiaDatos.ts'); process.exit(1); };

const cache = new Map();
const MD = cargarModuloTS(path.join('src', 'lib', 'mirDailyPlan.ts'), cache);
const POOL = cargarModuloTS(path.join('src', 'lib', 'mirPreguntasOficiales.ts'), cache);
const G = cargarModuloTS(path.join('src', 'lib', 'guia.ts'), cache);
const J = JSON.parse(fs.readFileSync(JSONF, 'utf8'));

// ── D1-D10 medidos ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const q = (x) => { const o = { id: x.promir, url: x.url }; if (x.seccion !== undefined) o.seccion = x.seccion; if (x.fuente === 'pool app' && x.id) o.pool = x.id; return o; };
const medida = {};
for (const m of J.mir) {
  const dia = MD.mirDiaN(m.d);
  if (!dia) aborta(`D${m.d} del JSON no existe en mirDailyPlan`);
  if (dia.fecha !== m.fecha || dia.capId !== m.capId) aborta(`D${m.d}: el JSON (${m.fecha} · ${m.capId}) no coincide con mirDailyPlan (${dia.fecha} · ${dia.capId}) → regenera el JSON con gen_guia_lectura.js`);
  const b = m.bloque;
  const pasos = b.pasos.map((p) => { const o = { min: p.min, que: p.hora ? `${p.hora} · ${p.que}` : p.que, como: p.como }; if (p.enlace) o.enlace = p.enlace; return o; });
  const bloque = { franja: b.franja, plan: 'mir', titulo: b.titulo, totalMin: b.totalMin, pasos, recursos: b.recursos, hecho: b.hecho };
  if (b.planB) bloque.planB = b.planB;
  if (b.aviso) bloque.aviso = b.aviso;
  const errs = G.validarGuia(bloque);
  if (errs.length) aborta(`D${m.d}: ${errs.join(' · ')}`);
  const p = m.preguntas;
  const preguntas = { pretest: (p.pretest || []).map(q), quiz: (p.quiz || []).map(q) };
  if (p.extraD1) preguntas.extra = p.extraD1.map(q);
  if (p.eval) preguntas.eval = p.eval.map((s) => ({ slot: s.slot, d: s.dia, tema: s.tema, qs: s.preguntas.map(q) }));
  if (p.cierre) preguntas.cierre = p.cierre.map(q);
  const l = m.lectura || {};
  medida[m.d] = {
    d: m.d, fecha: m.fecha, capId: m.capId, bloque, preguntas,
    lectura: { minUsados: l.minUsados ?? null, minCapitulo: m.capitulo ? m.capitulo.minLecturaCompleta : null, paraLa2aVuelta: l.paraElRepaso ? l.paraElRepaso.min ?? null : null },
  };
}

// ── pool oficial por capítulo del plan y por asignatura ─────────────────────────────────────────────────────────────────────────────
const porCap = {}; const porAsig = {};
for (const d of MD.MIR_DIAS) {
  if (d.d > MD.MIR_TEMAS_TOTAL) continue;
  porCap[d.capId] = POOL.preguntasDeCapitulo(d.capId).length;
  porAsig[d.num] = POOL.preguntasDeAsignatura(d.num).length;
}

// ── v6.03: índice compacto por capítulo para el banqueo (minutos de lectura completa + 3 secciones de más peso, medidos) ──────────────
const capMedido = {};
for (const m of J.mir) {
  const c = m.capitulo; if (!c) continue;
  const score = (u) => u.citasDesde2020 * 3 + (u.citasDesde2015 - u.citasDesde2020) * 2 + (u.citasMIR - u.citasDesde2015);
  const top = c.secciones.filter((u) => u.nivel !== 'H2' && score(u) > 0).map((u, i) => ({ u, i })).sort((a, b) => score(b.u) - score(a.u) || a.i - b.i).slice(0, 3).map(({ u }) => `${u.titulo} (${u.min}′)`);
  capMedido[m.capId] = { d: m.d, num: MD.mirDiaN(m.d).num, tema: m.tema, min: c.minLecturaCompleta, palabras: c.palabras + c.palabrasTabla, citasMIR: c.citasMIR, top };
}

// ── emisión ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const J2 = (o) => JSON.stringify(o, null, 1);
/** v6.03: una línea por clave (76 días) para que el fichero no crezca ×8 con la indentación. */
const J1L = (o) => '{\n' + Object.entries(o).map(([k, v]) => ` ${JSON.stringify(String(k))}: ${JSON.stringify(v)}`).join(',\n') + '\n}';
const _WD = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const _MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fmtF = (iso) => `${_WD[new Date(iso + 'T12:00:00Z').getUTCDay()]} ${+iso.slice(8)}-${_MES[+iso.slice(5, 7) - 1]}-${iso.slice(0, 4)}`;
const dMed = Object.keys(medida).map(Number).sort((a, b) => a - b);
const rangoMedido = `D${dMed[0]}-D${dMed[dMed.length - 1]} medidos (${fmtF(medida[dMed[0]].fecha)} → ${fmtF(medida[dMed[dMed.length - 1]].fecha)})`;
const meta = {
  version: J._meta.version, generado: J._meta.generado, fuente: 'DATA/MIR/guia_lectura_semana1-2.json (E2 · medición ProMIR 18-oct + 20-oct-2026, los 76 capítulos del plan) + mirDailyPlan + mirPreguntasOficiales',
  medidos: Object.keys(medida).map(Number), ritmo: J._meta.metodo.ritmo, lectura15: J._meta.metodo.lectura15, preguntas: J._meta.metodo.preguntas,
  noVerificado: J._meta.metodo.noVerificado,
};
const out = `/**
 * mirGuiaDatos.ts — DATOS de la guía MIR «qué · cuánto · cómo» (la lógica, la regla de los días sin medir y el banqueo están en src/lib/mirGuia.ts).
 * GENERADO por DATA/MIR/guia_lectura/gen_mir_guia.js — NO editar a mano:
 *   node DATA/MIR/guia_lectura/gen_mir_guia.js            (escribe) · --check (compara + valida todos los días)
 * Fuente: DATA/MIR/guia_lectura_semana1-2.json (E2, medición real de cada capítulo ProMIR el 18-oct y el 20-oct-2026: palabras deduplicadas, secciones,
 * figuras, clips y preguntas MIR citadas) · nº de preguntas del pool oficial por capítulo/asignatura (mirPreguntasOficiales).
 * ${rangoMedido}. Las ids de pregunta son las de ProMIR (/pregunta/MIR/AAAA-NNN = «MIR AAAA-AAAA+1, Pnnn»);
 * \`pool\` = id del pool de la app (año del examen = ProMIR + 1) cuando la pregunta viene de ahí (manda la lista del pool de la app si difiere).
 * v6.02c (18-oct-2026, E3): nuevo.
 * v6.03 (20-oct-2026): los 76 capítulos del plan medidos → MIR_GUIA_MEDIDA = D1-D76 (una línea por día) + MIR_CAP_MEDIDO para el banqueo.
 */
import type { GuiaBloque } from './guia';

export interface MirGuiaQ { id: string; url: string; seccion?: string | null; pool?: string }
export interface MirGuiaEvalSlot { slot: string; d: number; tema: string; qs: MirGuiaQ[] }
export interface MirGuiaPreguntas { extra?: MirGuiaQ[]; eval?: MirGuiaEvalSlot[]; cierre?: MirGuiaQ[]; pretest: MirGuiaQ[]; quiz: MirGuiaQ[] }
export interface MirGuiaMedida {
  d: number; fecha: string; capId: string; bloque: GuiaBloque; preguntas: MirGuiaPreguntas;
  /** minutos de la lectura 15′ usados · lectura completa del capítulo · lo que queda para la 2.ª vuelta (medido) */
  lectura: { minUsados: number | null; minCapitulo: number | null; paraLa2aVuelta: number | null };
}

export const MIR_GUIA_DATOS_META = ${J2(meta)};

export const MIR_GUIA_MEDIDA: Record<number, MirGuiaMedida> = ${J1L(medida)};

/** v6.03: dato MEDIDO por capítulo del plan (capId): día del plan, asignatura (num), minutos de la lectura completa a 180 ppm, palabras (texto +
 *  tablas), preguntas MIR citadas y las 3 secciones de más peso (citadas ponderadas por recencia) con sus minutos → corrección del banqueo. */
export interface MirCapMedido { d: number; num: number; tema: string; min: number; palabras: number; citasMIR: number; top: string[] }
export const MIR_CAP_MEDIDO: Record<string, MirCapMedido> = ${J1L(capMedido)};

/** Nº de preguntas del pool oficial (MIR 2022-2026, no anuladas) por capítulo del plan (capId) — regla del pre-test/quiz D11+. */
export const MIR_POOL_POR_CAP: Record<string, number> = ${JSON.stringify(porCap)};
/** Nº de preguntas del pool oficial por asignatura (num) — tests de cierre. */
export const MIR_POOL_POR_ASIG: Record<number, number> = ${JSON.stringify(porAsig)};
`;

// ── validación de TODOS los días con la lógica real (mirGuia.ts) ────────────────────────────────────────────────────────────────────
function validarTodo(tsDatos) {
  const tmp = path.join(ROOT, 'src', 'lib', 'mirGuiaDatos.ts');
  const prev = fs.existsSync(tmp) ? fs.readFileSync(tmp, 'utf8') : null;
  const errores = [];
  // la lógica importa ./mirGuiaDatos → se valida contra el texto recién generado sin tocar el disco (cache con el módulo en memoria)
  const c2 = new Map();
  const ts = require(path.join(ROOT, 'node_modules', 'typescript'));
  const mod = { exports: {} };
  c2.set(tmp, mod);
  const req = (spec) => cargarModuloTS(path.relative(ROOT, path.resolve(path.dirname(tmp), spec)) + '.ts', c2);
  new Function('exports', 'module', 'require', ts.transpileModule(tsDatos, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText)(mod.exports, mod, req);
  const MG = cargarModuloTS(path.join('src', 'lib', 'mirGuia.ts'), c2);
  const MM = cargarModuloTS(path.join('src', 'lib', 'mirMantenimiento.ts'), c2);
  const GG = cargarModuloTS(path.join('src', 'lib', 'guia.ts'), c2);
  const MDD = cargarModuloTS(path.join('src', 'lib', 'mirDailyPlan.ts'), c2);
  let n = 0;
  for (const d of MDD.MIR_DIAS) {
    const g = MG.mirGuiaDe(d.fecha);
    if (!g) { errores.push(`D${d.d} ${d.fecha}: sin guía`); continue; }
    const e = GG.validarGuia(g); if (e.length) errores.push(`D${d.d} ${d.fecha}: ${e.join(' · ')}`);
    if (d.d <= MDD.MIR_TEMAS_TOTAL && !MG.mirGuiaMedido(d.d)) errores.push(`D${d.d}: debería estar medido (v6.03: los 76 capítulos del plan tienen medición)`);
    n++;
  }
  for (const m of MM.MIR_MANT_DIAS) {
    for (const ini of ['15:15', '16:00', '10:35', '04:05']) {
      const g = MG.mirGuiaMant(m, ini);
      const e = GG.validarGuia(g); if (e.length) errores.push(`M${m.d} ${m.fecha} @${ini}: ${e.join(' · ')}`);
      n++;
    }
    if (!MG.mirGuiaDe(m.fecha)) errores.push(`M${m.d} ${m.fecha}: mirGuiaDe sin guía`);
  }
  // un día medido desplazado a otro turno también cuadra
  for (const d of [1, 4, 10, 23, 31, 76]) { const g = MG.mirGuiaPlan(MDD.mirDiaN(d), '16:00'); const e = GG.validarGuia(g); if (e.length) errores.push(`D${d}@16:00: ${e.join(' · ')}`); }
  void prev;
  return { errores, n };
}

const actual = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
const v = validarTodo(out);
if (v.errores.length) { console.error(v.errores.slice(0, 30).join('\n')); aborta(`${v.errores.length} bloque(s) no cuadran`); }
if (CHECK) {
  if (actual !== out) { console.error('✗ src/lib/mirGuiaDatos.ts NO está al día → node DATA/MIR/guia_lectura/gen_mir_guia.js'); process.exit(1); }
  console.log(`✓ mirGuiaDatos.ts al día · ${v.n} bloques validados (D1-D78 + banqueo × 4 inicios) · ${rangoMedido} (${meta.medidos.length} días)`);
} else {
  fs.writeFileSync(OUT, out);
  console.log(`✓ escrito src/lib/mirGuiaDatos.ts (${(out.length / 1024).toFixed(1)} KB) · ${v.n} bloques validados · ${rangoMedido} (${meta.medidos.length} días)`);
}
