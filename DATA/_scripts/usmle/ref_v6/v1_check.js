// v1_check.js — verificación V1 (§H) sobre el fichero de referencia: multiset de campos DiaUSMLE de las 95 filas v5.20
// = {filas de temario de F1} ∪ {filas T con dOrig, una por dOrig, usando subV520} + el `sub` visible CONTIENE el texto v5.20.
// v6.00: F1 = {D1-57} ∪ {D58 ← D79} y el tramo 2 cubre 37 dOrig.
// v6.01 (10-oct-2026): F1 = {D1-57} (57 hábiles, C1/C2 consumidos) y D79 (bioestadística) vive en el tramo 2 (T con dOrig 79) → 38 dOrig.
//   Regla general: el temario de F1 es el orden D1-D57 · D79 MENOS lo que el tramo 2 ya lleva con dOrig (las filas DESPLAZADAS de F1,
//   gen_tramo2_ref.js --f1-filas); el tramo 2 debe cubrir exactamente las 95 − |F1| filas v5.20 restantes.
// Uso: node v1_check.js [tramo2.json]   (lee dias_v520.json CONGELADO, no git HEAD; por defecto la referencia v6.01)
const V = require('./dias_v520.json');
const T2 = require(process.argv[2] ? require('path').resolve(process.argv[2]) : './tramo2_14mar_27sep_v601.json');
const normSub = (s) => s.replace(/\d{2}:\d{2}-\d{2}:\d{2}/g, '');
const key = (x, sub) => JSON.stringify([x.system, normSub(sub), x.bbCh, x.bbVid, x.uw, x.mat, x.matType, x.palm ? x.palm.id : null]);
const A = {}, B = {}; const inc = (M, k) => { M[k] = (M[k] || 0) + 1; };
V.forEach((x) => inc(A, key(x, x.sub)));
const ORIGEN_F1_TEMARIO = [...Array.from({ length: 57 }, (_, i) => i + 1), 79];
const enT2 = new Set(T2.filter((r) => r.dOrig).map((r) => r.dOrig));
const F1 = ORIGEN_F1_TEMARIO.filter((d) => !enT2.has(d)); // v6.00: D1-D57 + D79 · v6.01: D1-D57
F1.forEach((d) => { const x = V.find((y) => y.d === d); inc(B, key(x, x.sub)); });
const esperadoT = V.length - F1.length; // v6.00: 37 · v6.01: 38
const prefijo = F1.every((d, i) => d === ORIGEN_F1_TEMARIO[i]); // las desplazadas son siempre la COLA del orden de F1 (F1 coloca en orden)
if (!prefijo) console.log('el temario de F1 no es un prefijo del orden D1-D57 · D79: el tramo 2 lleva un dOrig de F1 que no es desplazado');
const seen = new Set(); let noIncluye = 0;
for (const r of T2) {
  if (!r.dOrig) continue;
  if (!normSub(r.sub).includes(normSub(r.subV520))) { noIncluye++; console.log('sub no contiene v5.20:', 'T' + r.t, 'D' + r.dOrig); }
  if (seen.has(r.dOrig)) continue; seen.add(r.dOrig); inc(B, key(r, r.subV520));
}
let dif = 0; for (const k of new Set([...Object.keys(A), ...Object.keys(B)])) if ((A[k] || 0) !== (B[k] || 0)) { dif++; if (dif <= 8) console.log('DIF', A[k] || 0, 'vs', B[k] || 0, k.slice(0, 140)); }
const faltanCampos = T2.filter((r) => ['system', 'tier', 'bbCh', 'bbVid', 'uw', 'mat', 'matType'].some((k) => r[k] == null) || !('palm' in r));
console.log(`V1 · claves con diferencia ${dif} · temario F1 ${F1.length} (${F1.includes(79) ? 'D1-D57 + D79' : 'D1-D57'}) · dOrig únicos ${seen.size}/${esperadoT} · sub sin texto v5.20 ${noIncluye} · filas T sin campos DiaUSMLE ${faltanCampos.length}`);
process.exit(dif || noIncluye || faltanCampos.length || seen.size !== esperadoT || !prefijo ? 1 : 0);
