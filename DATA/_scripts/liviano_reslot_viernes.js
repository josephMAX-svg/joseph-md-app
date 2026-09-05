/**
 * liviano_reslot_viernes.js — invariante del plan LIVIANO Academia: los CASOS caen en VIERNES reales.
 *
 * v2 (Palmerton v3, sep-2026): este script ya NO reordena filas a mano. Delegación documentada:
 *   1. Lee `inicio` de LIV_META en src/lib/livianoStudyPlan.ts (remap_inicio.js bloque 7 acaba de
 *      re-fechar las 90 filas y actualizar LIV_META.inicio/fin al nuevo START).
 *   2. Ejecuta  node DATA/_scripts/gen_liviano_plan.js <inicio>  → regenera livianoStudyPlan.ts,
 *      livianoCasos.ts y el CSV Anki desde DATA/BUSINESS/liviano_curriculum.json con el MISMO
 *      calendario L-V (feriados fijos fuera): casos en viernes, pre-tests en lunes, drills, casoId.
 *
 * Por qué: el generador es la única fuente de verdad (regla del sistema: todo plan tiene su gen_*.js);
 * reordenar filas sueltas rompería casoId/pretest/drill. remap_inicio.js (bloque 7b) sigue llamando
 * a este fichero sin cambios, así que el pipeline de corrimiento no se toca.
 *
 *   node DATA/_scripts/liviano_reslot_viernes.js            (usa LIV_META.inicio del .ts)
 *   node DATA/_scripts/liviano_reslot_viernes.js 2026-09-07 (fuerza una fecha)
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const P = path.join(__dirname, '..', '..', 'src', 'lib', 'livianoStudyPlan.ts');
const GEN = path.join(__dirname, 'gen_liviano_plan.js');

let start = process.argv[2];
if (!start) {
  const s = fs.readFileSync(P, 'utf8');
  const m = s.match(/inicio:\s*'(20\d\d-\d\d-\d\d)'/);
  if (!m) throw new Error('LIVIANO reslot: no encontré LIV_META.inicio en ' + P);
  start = m[1];
}
if (!/^20\d\d-\d\d-\d\d$/.test(start)) throw new Error('LIVIANO reslot: fecha inválida ' + start);
console.log('LIVIANO reslot → delega en gen_liviano_plan.js ' + start);
execSync('node ' + JSON.stringify(GEN) + ' ' + start, { stdio: 'inherit' });
