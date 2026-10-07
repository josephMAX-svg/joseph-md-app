// b_horas.js (r2) — §B4 presupuesto de horas Step 1 v6 (DJ-3: posta L-S con turno M/T variable, sin bloque dominical; DJ-4: MIR 1 h/día)
const { add, wd, f, fy, diff, FER, SKIP_V6, rango } = require('./cal');
const SERUMS = process.env.SERUMS || '2027-05-03';
const ADAPT_HASTA = add(SERUMS, 13); // 2 semanas de inducción al 50 %
// Plantillas por día de plan F4 (horas Step 1)
const M = { A: 110 / 60, anki: 25 / 60, B: 90 / 60 };          // turno mañana 07-13: A 04:05-05:55 · Anki traslado 25' · B 14:30-16:00
const T = { A: 120 / 60, anki: 25 / 60, B: 140 / 60 };         // turno tarde 13-19: A 04:05-06:05 · B 07:40-10:10 (−10' pausa) · Anki 10:10-10:35
const brutoM = M.A + M.anki + M.B, brutoT = T.A + T.anki + T.B;
const efM = (fB) => M.A + M.anki + M.B * fB;     // B post-turno rinde menos (Palmerton :1294)
const efT = brutoT * 0.95;
const PERFIL = {
  PISO: efM(0.25),                 // todo turno M y bloque B al 25 % (o guardias)
  M: efM(0.5),                     // todo turno M, bloque B al 50 %
  MIX: (efM(0.5) + efT) / 2,       // 50 % M / 50 % T (turno variable, lo esperable)
  T: efT,                          // todo turno T
};
console.log('bruto/día M', brutoM.toFixed(2), 'T', brutoT.toFixed(2), '· bruto/sem (6 d) M', (brutoM * 6).toFixed(1), 'T', (brutoT * 6).toFixed(1));
for (const [k, v] of Object.entries(PERFIL)) console.log('perfil', k, 'h/día', v.toFixed(3), '· h/sem (L-S)', (v * 6).toFixed(2));
const FT = 5.5; // F3 tiempo completo, horas productivas/día L-V
const META = 399, MIN = 275;
// taper: E-7..E-2 (lun-jue 2 h, vie 1 h, sáb 0)
function horasDia(s, R, E, p) {
  if (s < R || s >= E) return 0;
  if (s === add(E, -1)) return 0;            // r2 (crítica): D-1 = viaje, 0 h (antes contaba 2 h de taper si el examen era martes)
  const w = wd(s);
  if (SKIP_V6.has(s)) return 0;
  const lunTaper = add(E, -(wd(E) === 1 ? 7 : wd(E) === 2 ? 8 : 7)); // lunes de la semana anterior al examen
  if (s >= lunTaper) { if (w >= 1 && w <= 4) return 2; if (w === 5) return 1; return 0; }
  if (s < SERUMS) return (w >= 1 && w <= 5) ? FT : 0;
  if (w === 0) return 0;                       // domingo LIBRE (DJ-3)
  let h = PERFIL[p];
  if (FER.has(s)) h += 2;                      // feriado sin turno: +2 h (conservador)
  if (s <= ADAPT_HASTA) h *= 0.5;              // inducción
  return h;
}
function corre(R, E, p) { let c = 0, r = {}; for (const s of rango(R, add(E, -1))) { c += horasDia(s, R, E, p); if (!r.min && c >= MIN) r.min = s; if (!r.meta && c >= META) r.meta = s; } r.total = c; return r; }
const ESC = [['14-mar', '2027-03-16'], ['21-mar', '2027-03-23'], ['4-abr', '2027-04-06'], ['11-abr', '2027-04-13'], ['18-abr', '2027-04-20'], ['25-abr', '2027-04-27']];
const TGT = [['31-ago', '2027-08-31'], ['27-sep', '2027-09-27'], ['25-oct', '2027-10-25']];
const tabla = {};
console.log('\nENCAPS→reinicio | perfil | 275h | 399h | colchón vs 399 al D-1 de: 31-ago / 27-sep / 25-oct');
for (const [lab, R] of ESC) {
  tabla[lab] = {};
  for (const p of Object.keys(PERFIL)) {
    const out = [];
    let r0;
    for (const [tl, E] of TGT) { const r = corre(R, E, p); out.push(Math.round(r.total - META)); if (tl === '25-oct') r0 = r; }
    tabla[lab][p] = out;
    console.log(lab.padEnd(7), R, p.padEnd(5), f(r0.min).padEnd(10), f(r0.meta).padEnd(10), out.map((x) => (x >= 0 ? '+' : '') + x).join(' / '));
  }
}
// horas F3 por escenario y horas F4 por semana
for (const [lab, R] of ESC) { let h = 0; for (const s of rango(R, add(SERUMS, -1))) h += horasDia(s, R, '2027-12-31', 'PISO'); console.log('F3', lab, 'h FT', h.toFixed(0)); }
// Regla de ventana: colchón PISO ≥ 0 → fecha viable; colchón MIX ≥ 40 → recomendable
console.log('\nREGLA (fecha más temprana con colchón PISO ≥ 0):');
for (const [lab] of ESC) { const t = tabla[lab].PISO; const i = t.findIndex((x) => x >= 0); const im = tabla[lab].MIX.findIndex((x) => x >= 0); console.log(lab, '→ PISO:', i >= 0 ? TGT[i][0] : 'ninguna (≥25-oct con extensión)', '· MIX:', im >= 0 ? TGT[im][0] : '—'); }
// Sensibilidad: SERUMS 6-may (2026-I real) y 17-may
module.exports = { PERFIL, horasDia, corre };
