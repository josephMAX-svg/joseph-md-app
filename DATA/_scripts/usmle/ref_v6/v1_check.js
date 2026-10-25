// v1_check.js — verificación V1 (§H) sobre el fichero de referencia: multiset de campos DiaUSMLE de las 95 filas v5.20
// = {filas de temario de F1} ∪ {filas T con dOrig, una por dOrig, usando subV520} + el `sub` visible CONTIENE el texto v5.20.
// v6.00: F1 = {D1-57} ∪ {D58 ← D79} y el tramo 2 cubre 37 dOrig.
// v6.01 (10-oct-2026): F1 = {D1-57} (57 hábiles, C1/C2 consumidos) y D79 (bioestadística) vive en el tramo 2 (T con dOrig 79) → 38 dOrig.
//   Regla general: el temario de F1 es el orden D1-D57 · D79 MENOS lo que el tramo 2 ya lleva con dOrig (las filas DESPLAZADAS de F1,
//   gen_tramo2_ref.js --f1-filas); el tramo 2 debe cubrir exactamente las 95 − |F1| filas v5.20 restantes.
// v6.02 (17-oct-2026): F1 = {D1-D51, D55} (52 hábiles; un hito de F1 no sale de F1: el NBME 28 = v5.20 D55 ocupa el último slot) y el tramo 2
//   lleva D52, D53, D54, D56, D57, D79 → 43 dOrig. La regla general ya no es «prefijo»: las desplazadas deben ser las ÚLTIMAS filas de temario
//   NO-hito del orden D1-D57 · D79 (en su orden) y ningún hito de F1 puede estar en el tramo 2 (v6.00: ninguna · v6.01: D79 · v6.02: 6).
// v6.03 (20-oct-2026): F1 = {D1-D49, D55} (50 hábiles, mié 21-oct → mié 30-dic) y el tramo 2 lleva D50-D54, D56, D57, D79 → 45 dOrig.
//   Misma regla (sin cambio de lógica).
// v6.04 (21-oct-2026): examen 25-oct (tramo2_14mar_25oct_v604.json): F1 y dOrig como la v6.03 (45).
// v6.05 (24-oct-2026): F1 = {D1-D46, D55} (47 hábiles, lun 26-oct → mié 30-dic) y el tramo 2 lleva D47-D54, D56, D57, D79 → 48 dOrig.
//   Misma regla (sin cambio de lógica); por defecto lee la referencia v6.05.
// Uso: node v1_check.js [tramo2.json]   (lee dias_v520.json CONGELADO, no git HEAD; por defecto la referencia v6.05)
const V = require('./dias_v520.json');
const T2 = require(process.argv[2] ? require('path').resolve(process.argv[2]) : './tramo2_14mar_25oct_v605.json');
const normSub = (s) => s.replace(/\d{2}:\d{2}-\d{2}:\d{2}/g, '');
const key = (x, sub) => JSON.stringify([x.system, normSub(sub), x.bbCh, x.bbVid, x.uw, x.mat, x.matType, x.palm ? x.palm.id : null]);
const A = {}, B = {}; const inc = (M, k) => { M[k] = (M[k] || 0) + 1; };
V.forEach((x) => inc(A, key(x, x.sub)));
const ORIGEN_F1_TEMARIO = [...Array.from({ length: 57 }, (_, i) => i + 1), 79];
const enT2 = new Set(T2.filter((r) => r.dOrig).map((r) => r.dOrig));
const F1 = ORIGEN_F1_TEMARIO.filter((d) => !enT2.has(d)); // v6.00: D1-D57 + D79 · v6.01: D1-D57 · v6.02: D1-D51 + D55 · v6.03: D1-D49 + D55 · v6.05: D1-D46 + D55
F1.forEach((d) => { const x = V.find((y) => y.d === d); inc(B, key(x, x.sub)); });
const esperadoT = V.length - F1.length; // v6.00: 37 · v6.01: 38 · v6.02: 43 · v6.03: 45 · v6.05: 48
// v6.02: las desplazadas = las ÚLTIMAS filas de temario no-hito del orden de F1 (en su orden); los hitos de F1 nunca están en el tramo 2
const esHito = (d) => /^🎯/.test(V.find((y) => y.d === d).sub);
const noHito = ORIGEN_F1_TEMARIO.filter((d) => !esHito(d));
const despl = ORIGEN_F1_TEMARIO.filter((d) => enT2.has(d));
const prefijo = !despl.some(esHito) && JSON.stringify(despl) === JSON.stringify(noHito.slice(noHito.length - despl.length));
if (!prefijo) console.log('las filas de F1 en el tramo 2 no son las últimas de temario no-hito del orden D1-D57 · D79 (o hay un hito de F1 en el tramo 2): ' + despl.join(','));
const tramos = F1.reduce((a, d) => { const u = a[a.length - 1]; if (u && u[1] === d - 1) u[1] = d; else a.push([d, d]); return a; }, []).map(([a, b]) => (a === b ? 'D' + a : `D${a}-D${b}`)).join(' + ');
const seen = new Set(); let noIncluye = 0;
for (const r of T2) {
  if (!r.dOrig) continue;
  if (!normSub(r.sub).includes(normSub(r.subV520))) { noIncluye++; console.log('sub no contiene v5.20:', 'T' + r.t, 'D' + r.dOrig); }
  if (seen.has(r.dOrig)) continue; seen.add(r.dOrig); inc(B, key(r, r.subV520));
}
let dif = 0; for (const k of new Set([...Object.keys(A), ...Object.keys(B)])) if ((A[k] || 0) !== (B[k] || 0)) { dif++; if (dif <= 8) console.log('DIF', A[k] || 0, 'vs', B[k] || 0, k.slice(0, 140)); }
const faltanCampos = T2.filter((r) => ['system', 'tier', 'bbCh', 'bbVid', 'uw', 'mat', 'matType'].some((k) => r[k] == null) || !('palm' in r));
console.log(`V1 · claves con diferencia ${dif} · temario F1 ${F1.length} (${tramos}) · desplazadas en el tramo 2 ${despl.length ? despl.map((d) => 'D' + d).join(', ') : '—'} · dOrig únicos ${seen.size}/${esperadoT} · sub sin texto v5.20 ${noIncluye} · filas T sin campos DiaUSMLE ${faltanCampos.length}`);
process.exit(dif || noIncluye || faltanCampos.length || seen.size !== esperadoT || !prefijo ? 1 : 0);
