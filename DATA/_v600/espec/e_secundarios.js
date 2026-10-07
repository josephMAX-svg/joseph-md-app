// e_secundarios.js — §D/§E: re-fechado de MIR mant + extensión, AURUM, Research c1/c2, Derma c1/c2 con las reglas v6
const { add, wd, f, fy, rango, FER } = require('./cal');
const S = process.env.SERUMS || '2027-05-03';
const EXAM = process.env.EXAM || '2027-09-27';
const ENC = process.env.ENCAPS || '2027-03-14';
const V520 = { skip: new Set(['2026-12-25', '2026-12-31', '2027-01-01']), prot: new Set(['2027-02-22', '2027-03-09', '2027-03-10']), sabados: false };
const encD1habil = (() => { let s = add(ENC, -1); while (wd(s) === 0 || wd(s) === 6) s = add(s, -1); return s; })();
const V6 = {
  skip: new Set(['2026-12-25', '2026-12-31', '2027-01-01', '2027-03-25', '2027-03-26']),
  prot: new Set([encD1habil, add(ENC, -1), ENC, add(ENC, 1), (() => { let x = add(EXAM, -2); while (wd(x) === 0) x = add(x, -1); return x; })(), add(EXAM, -1), EXAM]), // r2: ritual = último día de plan antes de E−1
  sabados: true,
};
console.log('PROTEGIDOS v6:', [...V6.prot].map(f).join(' · '));
const esPlan = (s, R) => { const w = wd(s); if (w === 0) return false; if (w === 6 && !(R.sabados && s >= S)) return false; return !R.skip.has(s) && !R.prot.has(s); };
// paridad Research/Derma (ancla 10-jun-2026): cuenta L-V antes de S y L-S desde S (v6)
const memo = new Map();
function tipoDia(s, R) {
  const w = wd(s); if (w === 0) return 'descanso'; if (w === 6 && !(R.sabados && s >= S)) return 'descanso';
  const k = (R.sabados ? 'v6' : 'v5') + s; if (memo.has(k)) return memo.get(k);
  let cnt = 0; for (let c = '2026-06-10'; c < s; c = add(c, 1)) { const x = wd(c); if (x >= 1 && x <= 5) cnt++; else if (x === 6 && R.sabados && c >= S) cnt++; }
  const t = cnt % 2 === 0 ? 'research' : 'derma'; memo.set(k, t); return t;
}
function slots(t, start, n, R, pausa) { const o = []; let c = start; while (o.length < n) { if (tipoDia(c, R) === t && !R.skip.has(c) && !R.prot.has(c) && !(pausa && c >= pausa[0] && c <= pausa[1])) o.push(c); c = add(c, 1); } return o; }
const PAUSA = ['2027-01-15', '2027-02-10'];
for (const [lab, R] of [['v5.20', V520], ['v6', V6]]) {
  console.log('\n══', lab);
  const rc1 = slots('research', '2026-10-08', 42, R, PAUSA);
  const rc2 = slots('research', add(rc1.at(-1), 1), 67, R, PAUSA);
  const dc1 = slots('derma', '2026-10-07', 73, R);
  const dc2 = slots('derma', add(dc1.at(-1), 1), 30, R);
  console.log('Research c1', f(rc1[0]), '→', fy(rc1.at(-1)), '· c2', f(rc2[0]), '→', fy(rc2.at(-1)));
  const RH = { 'X-3 d39': rc1[38], 'X-4 d40': rc1[39], 'X-5 d41': rc1[40], 'X-6 d42': rc1[41], 'R6b d43': rc2[0], 'R8b d44': rc2[1], 'X-9 d45': rc2[2], 'R9b d46': rc2[3], 'R10 d47': rc2[4], 'K1 d48': rc2[5] };
  console.log('   ', Object.entries(RH).map(([k, v]) => k + ' ' + f(v)).join(' · '));
  console.log('Derma c1', f(dc1[0]), '→', fy(dc1.at(-1)), '· d44-d49', dc1.slice(43, 49).map(f).join(','), '· d50', f(dc1[49]), '· d53', f(dc1[52]), '· d54', f(dc1[53]), '· d55', f(dc1[54]), '· d72', f(dc1[71]), '· c2', f(dc2[0]), '→', fy(dc2.at(-1)));
  // AURUM 130 L-V
  const au = []; for (let c = '2026-10-07'; au.length < 130; c = add(c, 1)) { const w = wd(c); if (w >= 1 && w <= 5 && !R.skip.has(c) && !R.prot.has(c)) au.push(c); }
  console.log('AURUM', f(au[0]), '→', fy(au.at(-1)), '· pitches v4 D75', f(au[74]), 'v5 D95', f(au[94]), 'v6 D115', f(au[114]), 'v7 D130', f(au[129]), '· D96', f(au[95]));
  // MIR mant: desde 28-ene, conserva 46 lun-jue
  // r2 (crítica): v6 = rango FIJO 28-ene → FIN 22-abr (el generador real gen_mir_mantenimiento.js usa FIN; no «conservar 46 lun-jue»)
  const mm = []; let lj = 0;
  if (lab === 'v6') { for (let c = '2027-01-28'; c <= '2027-04-22'; c = add(c, 1)) { if (!esPlan(c, R)) continue; if (wd(c) === 6) continue; mm.push(c); } }
  else for (let c = '2027-01-28'; lj < 46; c = add(c, 1)) { if (!esPlan(c, R)) continue; const w = wd(c); if (w === 6) continue; mm.push(c); if (w >= 1 && w <= 4) lj++; }
  // incluir viernes inmediatamente posterior si la semana sigue? (v5.20 terminaba en jueves) → fin = último lun-jue
  const vie = mm.filter((s) => wd(s) === 5).length;
  console.log('MIR mant', f(mm[0]), '→', fy(mm.at(-1)), '·', mm.length, 'días (lun-jue', mm.filter((s) => wd(s) <= 4).length, '· viernes', vie + ')');
  // Tier C jueves (último lun-jue de cada semana 1..12)
  const sem = {}; mm.forEach((s) => { const lun = add(s, wd(s) === 0 ? -6 : 1 - wd(s)); (sem[lun] = sem[lun] || []).push(s); });
  const tc = Object.values(sem).map((ds) => ds.filter((x) => wd(x) <= 4).at(-1)).filter(Boolean).slice(0, 12);
  console.log('   Tier C:', lab === 'v6' ? '(v6: ver la salida del generador real en seco — crit_num/gmm.js → mirMant_v6_dry.ts; §D)' : tc.map(f).join(' · '));
  if (lab === 'v6') {
    const ext = []; for (let c = add(mm.at(-1), 1); c < EXAM; c = add(c, 1)) if (esPlan(c, R)) ext.push(c);
    const pre = ext.filter((s) => s < S), post = ext.filter((s) => s >= S);
    console.log('MIR EXTENSIÓN', f(ext[0]), '→', fy(ext.at(-1)), '·', ext.length, 'días (L-V antes del SERUMS', pre.length, '· L-S en SERUMS', post.length, '· sábados', post.filter((s) => wd(s) === 6).length, '· viernes', ext.filter((s) => wd(s) === 5).length, '· lun-jue', ext.filter((s) => wd(s) >= 1 && wd(s) <= 4).length, ')');
    console.log('   semanas de extensión', Math.ceil(ext.length / 6), '· primer sábado', f(post.find((s) => wd(s) === 6)));
    // research/derma en F4: sesiones por semana
    const r4 = rc2.filter((s) => s >= S), d4 = dc1.concat(dc2).filter((s) => s >= S);
    console.log('F4: Research c2 sesiones desde S', r4.length, '(sábados', r4.filter((s) => wd(s) === 6).length, ') · Derma sesiones desde S', d4.length, '(sábados', d4.filter((s) => wd(s) === 6).length, ')');
    console.log('   Research c2 R43? (d108/d109 últimos)', f(rc2[65]), f(rc2[66]));
    module.exports = { rc1, rc2, dc1, dc2, au, mm, ext };
  }
}
