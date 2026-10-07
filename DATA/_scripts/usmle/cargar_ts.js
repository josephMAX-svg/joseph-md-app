/**
 * cargar_ts.js — carga en node los módulos GENERADOS de src/lib (usmleStep1Daily.ts + fechasV6.ts) transpilándolos en memoria con el
 * typescript del repo (mismo método que gen_fechas_v6.js). Así los scripts leen DIAS / DIAS_T2 / DIAS_TODOS y las funciones REALES del
 * .ts (faseDe, semanaDe, esViernesNivel4…) en vez de parsear el array con expresiones regulares.
 *   const { cargarUsmleDaily, cargarFechasV6TS } = require('./cargar_ts');
 *   const U = cargarUsmleDaily();   // U.DIAS_TODOS, U.faseDe(…), …
 * v6.00 (6-oct-2026): nuevo (lo usan update_diainicio.js, remap_obsidian_usmle.js y verificar_v6.js). Solo resuelve imports relativos
 *   entre ficheros de src/lib; cualquier otro import lanza (usmleStep1Daily.ts solo importa ./fechasV6, que es módulo hoja).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..', '..');

function transpilar(src) {
  let ts;
  try { ts = require(path.join(ROOT, 'node_modules', 'typescript')); } catch { throw new Error('typescript no disponible en node_modules (npm install)'); }
  return ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
}
/** Carga un .ts de src/ (ruta relativa a la raíz del repo) con sus imports relativos. */
function cargarModuloTS(rel, cache = new Map()) {
  const file = path.join(ROOT, rel);
  if (cache.has(file)) return cache.get(file).exports;
  const m = { exports: {} };
  cache.set(file, m);
  const req = (spec) => {
    if (!spec.startsWith('./') && !spec.startsWith('../')) throw new Error(`${rel}: import no permitido en carga node «${spec}»`);
    const dest = path.relative(ROOT, path.resolve(path.dirname(file), spec)) + (spec.endsWith('.ts') ? '' : '.ts');
    return cargarModuloTS(dest, cache);
  };
  new Function('exports', 'module', 'require', transpilar(fs.readFileSync(file, 'utf8')))(m.exports, m, req);
  return m.exports;
}
const cargarUsmleDaily = () => cargarModuloTS(path.join('src', 'lib', 'usmleStep1Daily.ts'));
const cargarFechasV6TS = () => cargarModuloTS(path.join('src', 'lib', 'fechasV6.ts'));

module.exports = { ROOT, cargarModuloTS, cargarUsmleDaily, cargarFechasV6TS };
