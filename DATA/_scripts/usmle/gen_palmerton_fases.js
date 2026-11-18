/**
 * gen_palmerton_fases.js — genera src/lib/usmlePalmertonFases.ts: la FASE Palmerton y el MÉTODO DEL SISTEMA de CADA fila del Step 1 (F1 D2-D13 +
 * tramo 2 T1-T218), con los AJUSTES de modo donde la fila contradice la fase (p. ej. cronometrar antes del gate del 80 %).
 *   node DATA/_scripts/usmle/gen_palmerton_fases.js           → escribe src/lib/usmlePalmertonFases.ts
 *   node DATA/_scripts/usmle/gen_palmerton_fases.js --check   → regenera en memoria y compara (exit 1 si difiere o si una regla falla)
 * Entradas (nada a mano en el .ts):
 *   · DATA/USMLE/_palmerton_estructura_v610.json — fases, método por sistema, método del día de F1 y reglas del tramo 2 (síntesis propia del
 *     18-nov-2026: NotebookLM «STEP 1 · Palmerton Engine» preguntas i-iv + PALMERTON_POR_MATERIA/METODO_COMPLETO/NIVEL0_ARRANQUE + USMLE
 *     Content Outline + uWorld en Qbankly; detalle y fuentes en DATA/USMLE/PALMERTON_ESTRUCTURA_BASE_CERO.md);
 *   · las filas REALES de src/lib/usmleStep1Daily.ts (cargar_ts.js). Este script NO cambia fechas, D#, T#, hitos, qDia ni nivelUW de las filas:
 *     es una capa de anotación. Los AJUSTES son de MODO (Tutor ↔ timed, nivel efectivo) con las mismas preguntas y los mismos minutos
 *     (Tutor = 90 s + 0,85′/Q = timed 90 s/Q + revisión 0,85′/Q).
 * v6.10 · estructura base cero (18-nov-2026, orden de Joseph: «establece metodologías, estructuras, el método Palmerton por fases y por curso»): nuevo.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { ROOT, cargarUsmleDaily } = require('./cargar_ts');

const CHECK = process.argv.includes('--check');
const OUT = path.join(ROOT, 'src', 'lib', 'usmlePalmertonFases.ts');
const SRC = path.join(ROOT, 'DATA', 'USMLE', '_palmerton_estructura_v610.json');
const J = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const U = cargarUsmleDaily();
const ERR = [];
const aborta = (m) => { console.error('✗ gen_palmerton_fases: ' + m); process.exit(1); };

const FASES = Object.fromEntries(J.fases.map((f) => [f.id, f]));
const SIS = J.sistemas;
const esHitoF1 = (r) => !r.t && (/🎯/.test(r.sub) || r.system === 'Assessment');

/** sistema del método de una fila (null = fila mixta sin sistema propio) */
function sistemaDe(r) {
  if (/bioestad|biostat|ética|ethic|comunicaci/i.test(r.sub) && /Psychiatry|Behavioral/.test(r.system)) return 'Biostat & Ethics';
  if (SIS[r.system]) return r.system;
  return null;
}

/** n-ésima fila de plan tras un hito NBME/UWSA (1-4) o 0 — la misma cuenta que trasHito() de gen_usmle_guia.js (filas seguidas de F1 + tramo 2) */
const IDX = new Map(U.DIAS_TODOS.map((r, i) => [r.d, i]));
function trasHitoN(r) { for (let n = 1, i = IDX.get(r.d) - 1; i >= 0 && n <= 4; i--, n++) if (/🎯/.test(U.DIAS_TODOS[i].sub)) return U.DIAS_TODOS[i].d === 1 ? 0 : n; return 0; }

/** la anotación de una fila */
function anotar(r) {
  const out = { d: r.d, fecha: r.fecha, t: r.t || null, fase: '', nivelPlan: r.nivelUW, metodo: sistemaDe(r), ajustes: [] };
  if (!r.t) {
    if (esHitoF1(r)) { out.fase = 'MED'; out.metodo = null; out.nota = 'hito-F1'; return out; }
    const f = J.f1[String(r.d)];
    if (!f) { ERR.push(`F1 D${r.d}: sin entrada en _palmerton_estructura_v610.json › f1`); return out; }
    if (f.sis !== r.system) ERR.push(`F1 D${r.d}: f1.sis = ${f.sis} ≠ system de la fila ${r.system}`);
    out.fase = f.fase; out.metodo = f.sis;
    out.dia = { ancla: f.ancla, leer: f.leer, pregunta: f.pregunta, tarjetas: f.tarjetas };
    if (r.matType === 'pharm') out.metodo2 = 'Pharmacology';
    if (f.fase === 'N0' && r.nivelUW !== 1) ERR.push(`F1 D${r.d}: nivel 0 con nivelUW ${r.nivelUW} (≠ 1)`);
    out.nota = f.fase === 'N0' ? 'f1-N0' : 'f1-N1';
    return out;
  }
  const tipo = r.tipo; let key = tipo;
  if (tipo === 'contenido') key = r.nivelUW === 1 && /\btimed\b/i.test(r.sub) ? 'contenido-N1-timed' : `contenido-N${r.nivelUW}`;
  const regla = J.reglasT2[key];
  if (!regla) { ERR.push(`T${r.t}: sin regla para «${key}»`); return out; }
  out.fase = regla.fase || 'MED';
  if (regla.nota) out.nota = key;
  if (regla.ajuste) out.ajustes.push(key);
  // F3 (mar 16-mar → vie 30-abr): 16:15 REENTRADA (nivel 3) y 18:00 EVALUACIÓN ACUMULATIVA mixta → condicionadas a la fase
  if (r.fase === 'F3' && r.franjaNota && /REENTRADA/.test(r.franjaNota)) out.ajustes.push('reentrada1615');
  // v6.10 (fix revisión 18-nov): eval18F3 solo donde las 18:00 SON una evaluación: la EVALUACIÓN ACUMULATIVA (o, sin guía por franja, la de la plantilla F3:
  //   T1) y el 6/6 del Day-After (4.º día tras un hito: drill + eval 10Q comprimida); NO en los días 1-3 tras un hito, cuyas 18:00 son solo el drill de
  //   cronología del Day-After (antes la capa lo ponía en 29 filas y la guía solo tenía evaluación en 19)
  const n = trasHitoN(r);
  if (r.fase === 'F3' && !['hito', 'day_after'].includes(tipo) && !(n >= 1 && n <= 3)) out.ajustes.push('eval18F3');
  if (['Banco intensivo', 'Colchón', 'Assessment', 'Reentrada', 'Sprint final'].includes(r.system)) out.metodo = null;
  if (out.metodo && !SIS[out.metodo]) ERR.push(`T${r.t}: método «${out.metodo}» sin entrada en sistemas`);
  return out;
}

const FILAS = U.DIAS_TODOS.map(anotar);
if (FILAS.length !== U.DIAS_TODOS.length) aborta('nº de filas distinto');
if (ERR.length) aborta(ERR.join(' · '));
// controles de coherencia (la capa no inventa filas ni toca el plan)
const dUnicos = new Set(FILAS.map((x) => x.d));
if (dUnicos.size !== FILAS.length) aborta('d repetido');
for (const x of FILAS) if (!FASES[x.fase]) aborta(`d ${x.d}: fase «${x.fase}» desconocida`);
const conAjuste = FILAS.filter((x) => x.ajustes.length);
const resumen = {};
for (const x of FILAS) { const k = x.t ? 'T2' : 'F1'; resumen[k] = resumen[k] || {}; resumen[k][x.fase] = (resumen[k][x.fase] || 0) + 1; }
const tiposAjuste = {};
for (const x of FILAS) for (const a of x.ajustes) tiposAjuste[a] = (tiposAjuste[a] || []).concat(x.t ? `T${x.t}` : `D${x.d}`);
/** textos de notas y ajustes por clave */
const NOTAS = { 'hito-F1': J.reglasT2.hito.nota + ' NBME 25 = la 1.ª línea base (ARRANQUE §8.1).', 'f1-N0': 'Cierre de cada mañana: 5 Q NUEVAS de otro banco (validación) + revalidación el siguiente día de Step = las 10 consecutivas del gate. Si no llega: mismo subtema, página completa y tarjetas como cronologías (nunca un recurso nuevo).', 'f1-N1': 'Bloques de 5 en Tutor; la cifra del día es un techo (si la revisión de un bloque pasa de 30′, para ahí). Nivel 2 (timed) solo en subtemas ya al 80 %; la validación de 5 Q nuevas cierra cada mañana.' };
const AJUSTES = {};
for (const [k, v] of Object.entries(J.reglasT2)) { if (v.nota) NOTAS[k] = v.nota; if (v.ajuste) AJUSTES[k] = v.ajuste; }
for (const x of FILAS) { if (x.nota && !NOTAS[x.nota]) aborta(`d ${x.d}: nota «${x.nota}» sin texto`); for (const a of x.ajustes) if (!AJUSTES[a]) aborta(`d ${x.d}: ajuste «${a}» sin texto`); }

// ── salida ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const js = (v) => JSON.stringify(v);
const L = [];
L.push('/**');
L.push(' * usmlePalmertonFases.ts — FASE Palmerton y MÉTODO DEL SISTEMA de cada fila del Step 1 (F1 D2-D13 + tramo 2), con los AJUSTES de modo');
L.push(' * donde la fila contradice la fase. GENERADO por DATA/_scripts/usmle/gen_palmerton_fases.js desde DATA/USMLE/_palmerton_estructura_v610.json');
L.push(' * (síntesis en DATA/USMLE/PALMERTON_ESTRUCTURA_BASE_CERO.md). NO editar a mano: node DATA/_scripts/usmle/gen_palmerton_fases.js [--check].');
L.push(' * Capa de anotación: no cambia fechas, hitos, qDia ni nivelUW de usmleStep1Daily.ts; los ajustes son de MODO (Tutor ↔ timed) con las mismas');
L.push(' * preguntas y los mismos minutos. Fases: 1 SUBTEMA (niveles 0-2) → 2 SISTEMA (3) → 3 MULTISISTEMA (4) → 4 RANDOM (5) · MEDICIÓN = NBME/UWSA/Free 120.');
L.push(' */');
L.push('export interface FasePalmerton { id: string; fase: number; nivel: number; nombre: string; corto: string; preguntas: string; modo: string; volumen: string; pasa: string; siFalla: string; entrada?: string; fuente: string }');
L.push(`export const FASES_PALMERTON: FasePalmerton[] = ${js(J.fases)};`);
L.push('export interface MetodoSistema { nombre: string; prioridad: string; uw: string; oficial: string; ancla: string; orden: string; recursos: string; trampas: string; top: string; tarjetas: string; vacios: string; fuente: string }');
L.push(`export const METODO_SISTEMA: Record<string, MetodoSistema> = ${js(J.sistemas)};`);
L.push('/** Los 6 pasos comunes a todo subtema (Palmerton): pre-test → análisis → First Aid → tarjetas → validación → registro. */');
L.push(`export const PASOS_COMUNES: string[] = ${js(J.pasosComunes)};`);
L.push('/** USMLE Step 1 Content Outline (usmle.org, leído el 18-nov-2026) con los System de uWorld que caen en cada categoría. */');
L.push(`export const OUTLINE_USMLE = ${js(J.oficial)};`);
L.push('export interface MetodoDia { ancla: string; leer: string; pregunta: string; tarjetas: string }');
L.push('/** Notas (consistentes con la fila) y AJUSTES de modo (la fila contradecía la fase) por clave: FaseFila.nota / FaseFila.ajustes. */');
L.push(`export const NOTAS_PALMERTON: Record<string, string> = ${js(NOTAS)};`);
L.push(`export const AJUSTES_PALMERTON: Record<string, string> = ${js(AJUSTES)};`);
L.push('export interface FaseFila { d: number; fecha: string; t: number | null; fase: string; nivelPlan: number; metodo: string | null; metodo2?: string; nota?: string; ajustes: string[]; dia?: MetodoDia }');
L.push(`export const FASE_FILA: Record<number, FaseFila> = ${js(Object.fromEntries(FILAS.map((x) => [x.d, x])))};`);
L.push('export const PALMERTON_FASES_META = ' + js({ fuente: 'DATA/USMLE/_palmerton_estructura_v610.json', doc: 'DATA/USMLE/PALMERTON_ESTRUCTURA_BASE_CERO.md', filas: FILAS.length, porFase: resumen, filasConAjuste: conAjuste.length, ajustes: Object.fromEntries(Object.entries(tiposAjuste).map(([k, v]) => [k, v.join(' ')])) }) + ';');
L.push('/** Fase Palmerton + método de una fila (por su d). */');
L.push('export function fasePalmertonDe(d: number): FaseFila | undefined { return FASE_FILA[d]; }');
L.push('export function faseInfo(id: string): FasePalmerton | undefined { return FASES_PALMERTON.find((f) => f.id === id); }');
L.push('/** Textos de los ajustes de una fila (vacío = la fila ya cumple su fase). */');
L.push('export function ajustesDe(d: number): string[] { const x = FASE_FILA[d]; return x ? x.ajustes.map((k) => AJUSTES_PALMERTON[k]).filter(Boolean) : []; }');
L.push('export function notaDe(d: number): string | undefined { const x = FASE_FILA[d]; return x && x.nota ? NOTAS_PALMERTON[x.nota] : undefined; }');
L.push('export function metodoSistemaDe(key: string | null | undefined): MetodoSistema | undefined { return key ? METODO_SISTEMA[key] : undefined; }');
const TXT = L.join('\n') + '\n';

if (CHECK) {
  const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (cur !== TXT) { console.error('✗ usmlePalmertonFases.ts desactualizado: node DATA/_scripts/usmle/gen_palmerton_fases.js'); process.exit(1); }
  console.log(`✓ usmlePalmertonFases.ts al día · ${FILAS.length} filas · ${conAjuste.length} con ajuste de modo`);
} else {
  fs.writeFileSync(OUT, TXT);
  console.log(`✓ escrito ${path.relative(ROOT, OUT)} · ${FILAS.length} filas · por fase ${js(resumen)} · ${conAjuste.length} con ajuste`);
  for (const [k, v] of Object.entries(tiposAjuste)) console.log(`  ajuste ${k}: ${v.length} filas (${v.join(', ')})`);
}
