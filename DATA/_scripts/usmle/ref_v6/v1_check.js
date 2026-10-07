// v1_check.js — verificación V1 (§H) sobre el fichero de referencia: multiset de campos DiaUSMLE de las 95 filas v5.20
// = {D1-57} ∪ {D58 ← D79} ∪ {filas T con dOrig, una por dOrig, usando subV520} + el `sub` visible CONTIENE el texto v5.20.
// Uso: node v1_check.js [tramo2.json]   (lee dias_v520.json CONGELADO, no git HEAD)
const V = require('./dias_v520.json');
const T2 = require(process.argv[2] ? require('path').resolve(process.argv[2]) : './tramo2_14mar_27sep.json');
const normSub = (s) => s.replace(/\d{2}:\d{2}-\d{2}:\d{2}/g, '');
const key = (x, sub) => JSON.stringify([x.system, normSub(sub), x.bbCh, x.bbVid, x.uw, x.mat, x.matType, x.palm ? x.palm.id : null]);
const A = {}, B = {}; const inc = (M, k) => { M[k] = (M[k] || 0) + 1; };
V.forEach((x) => inc(A, key(x, x.sub)));
V.filter((x) => x.d <= 57).forEach((x) => inc(B, key(x, x.sub)));
{ const x = V.find((y) => y.d === 79); inc(B, key(x, x.sub)); }
const seen = new Set(); let noIncluye = 0;
for (const r of T2) {
  if (!r.dOrig) continue;
  if (!normSub(r.sub).includes(normSub(r.subV520))) { noIncluye++; console.log('sub no contiene v5.20:', 'T' + r.t, 'D' + r.dOrig); }
  if (seen.has(r.dOrig)) continue; seen.add(r.dOrig); inc(B, key(r, r.subV520));
}
let dif = 0; for (const k of new Set([...Object.keys(A), ...Object.keys(B)])) if ((A[k] || 0) !== (B[k] || 0)) { dif++; if (dif <= 8) console.log('DIF', A[k] || 0, 'vs', B[k] || 0, k.slice(0, 140)); }
const faltanCampos = T2.filter((r) => ['system', 'tier', 'bbCh', 'bbVid', 'uw', 'mat', 'matType'].some((k) => r[k] == null) || !('palm' in r));
console.log(`V1 · claves con diferencia ${dif} · dOrig únicos ${seen.size}/37 · sub sin texto v5.20 ${noIncluye} · filas T sin campos DiaUSMLE ${faltanCampos.length}`);
process.exit(dif || noIncluye || faltanCampos.length || seen.size !== 37 ? 1 : 0);
