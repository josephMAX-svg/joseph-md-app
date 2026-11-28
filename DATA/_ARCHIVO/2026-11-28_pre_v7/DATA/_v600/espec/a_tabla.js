// a_tabla.js (r2) — escenarios A5: reserva = fecha MÁS TEMPRANA de {31-ago, 27-sep, 25-oct} con colchón PISO ≥ 0 (b_horas) Y déficit 0 (gen_tramo2_ref)
const { add, wd, f, diff, habLV, lunesDe } = require('./cal');
const { execSync } = require('child_process');
const log = console.log; console.log = () => {}; const { horasDia } = require('./b_horas'); console.log = log;
const { rango } = require('./cal');
const TGT = ['2027-08-31', '2027-09-27', '2027-10-25'];
const colchon = (R, E, p) => { let c = 0; for (const s of rango(R, add(E, -1))) c += horasDia(s, R, E, p); return c - 399; };
const primerMartesTras = (s) => { let x = add(s, 1); while (wd(x) !== 2) x = add(x, 1); return x; };
for (const ex of ['2027-03-14', '2027-03-21', '2027-04-04', '2027-04-11', '2027-04-18', '2027-04-25']) {
  const R = primerMartesTras(ex);
  const filas = TGT.map((E) => {
    const o = execSync(`node gen_tramo2_ref.js ${ex} ${E} ${process.env.SERUMS || "2027-05-03"} --permitir-deficit`).toString().split('\n');
    const m = o[1].match(/filas (\d+) \(F3 (\d+) · F4 (\d+)\)/), c = o[2].match(/déficit cola-adelante (\d+) u · déficit cola-atrás (\d+) u.*colchón (\d+) filas ≈ (\d+) h/);
    return { E, filas: +m[1], def: +c[1] + +c[2], cf: +c[3], ch: +c[4], piso: Math.round(colchon(R, E, 'PISO')), M: Math.round(colchon(R, E, 'M')) };
  });
  const res = filas.find((x) => x.piso >= 0 && x.def === 0);
  const sem = 13 + diff(lunesDe(R), lunesDe(res.E)) / 7;
  console.log(`${f(ex)} · reinicio ${f(R)} · RESERVA ${f(res.E)} (piso ${res.piso >= 0 ? '+' : ''}${res.piso} · M +${res.M}) · STEP1_SEMANAS ${sem} · tramo 2 ${res.filas} filas · colchón ${res.cf} f ≈ ${res.ch} h | ` +
    filas.map((x) => `${f(x.E)}: piso ${x.piso} / M ${x.M} / déficit ${x.def} u`).join(' · '));
}
