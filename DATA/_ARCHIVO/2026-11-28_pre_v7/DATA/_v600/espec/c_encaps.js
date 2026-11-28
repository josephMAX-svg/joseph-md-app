// c_encaps.js (r2) — §C3 / Anexo B: esqueleto ENCAPS F2 por escenario. Uso: node c_encaps.js [ENCAPS=2027-03-14]
// r2 (crítica): orden S2-S9 sin choque de código con el carril B del mismo día · semana con SKIP: el sim100 va al ÚLTIMO hábil
// de la semana (SS 2027: mié 24-mar) · módulo parcial: último hábil = sim100, los anteriores en orden profunda, profunda, rebote, vigilancia.
const { add, wd, f, habLV, lunesDe } = require('./cal');
const EX = process.argv[2] || '2027-03-14';
const F2 = habLV('2027-01-04', add(EX, -1));
const dia = (s) => habLV('2026-10-07', s).length;
const nucleoFin = '2027-03-05';
const cola = F2.slice(-5);
const S29 = { // orden base (lun..jue) · r2: S3, S5, S6 y S7 permutados dentro de su semana (mismo multiset: I-3 7 · V-2 5 · IV 4 · I-4 4 · II-3 4 · III-5 3 · II-4 3 · II-5 2)
 '2027-01-11':['I-3','V-2','II-3','I-4'], '2027-01-18':['IV','I-3','III-5','II-4'], '2027-01-25':['I-3','V-2','II-5','I-4'], '2027-02-01':['II-3','I-3','V-2','IV'],
 '2027-02-08':['I-3','III-5','I-4','II-4'], '2027-02-15':['II-3','I-3','V-2','IV'], '2027-02-22':['I-3','III-5','II-4','II-5'], '2027-03-01':['V-2','IV','II-3','I-4'] };
const SIMF = ['SIM #1 = 2025-II oficial','SIM #2','SIM #3','SIM #4 = 2024-II oficial','SIM #5','SIM #6','SIM #7 = 2025-I oficial (ancla tardía)','SIM #8'];
const MANT = {61:'I-3',62:'V-2',63:'III-5',64:'II-5',65:'mini_sim',66:'I-4',67:'IV-1',68:'II-4',69:'II-1',70:'mini_sim',71:'I-3',72:'V-2',73:'III-8',74:'II-11',75:'mini_sim',76:'IV-6',77:'V-7',78:'II-8',79:'II-3',80:'mini_sim',81:'I-3',82:'V-2',83:'III-5',84:'II-5',85:'mini_sim',86:'I-4',87:'IV-1',88:'II-4',89:'II-1',90:'mini_sim',91:'I-3',92:'V-2'};
const MOD = ['loop (módulo: pasada profunda sub-eje peor #1)', 'loop (módulo: pasada profunda sub-eje peor #2)', 'loop (módulo: rebote cola larga II-1/II-11/II-8)', 'loop (módulo: lista de vigilancia)'];
let si = 0, nsim = 0; const out = []; const choques = [];
const ultimoHabilSemana = (s) => F2.filter((x) => lunesDe(x) === lunesDe(s) && !cola.includes(x)).at(-1);
for (const s of F2) {
  const d = dia(s), w = wd(s); let t, c = null;
  if (cola.includes(s)) { const k = cola.indexOf(s); t = ['loop (cola: pasada profunda del sub-eje peor)','repaso_final','repaso_final','dress_rehearsal (D-2 · 11:00-13:00)','medio_dia (D-1)'][k]; }
  else if (s <= '2027-01-08') { t = s==='2027-01-04'?'senales':s==='2027-01-08'?'pretest (PRE-TEST 2026-II 100Q)':'loop calentamiento '+(c=['I-3','V-2','II-3'][habLV('2027-01-05',s).length-1]); }
  else if (s <= nucleoFin) { if (w===5) { t='sim100 · '+SIMF[si++]+(si>=7?' · 11:00-13:00':' · 07:15-09:15'); nsim++; } else { c = S29[lunesDe(s)][w-1]; t='loop barrido '+c; } }
  else if (s === ultimoHabilSemana(s)) { t = 'sim100 (módulo)' + (w !== 5 ? ` · en ${['dom','lun','mar','mié','jue'][w]} por día sin sesión` : ''); nsim++; }
  else { const k = F2.filter((x) => lunesDe(x) === lunesDe(s) && x < s).length; t = MOD[Math.min(k, 3)]; }
  const cbCode = d <= 92 && MANT[d] !== 'mini_sim' ? MANT[d] : null;
  if (c && cbCode && (c === cbCode || (c === 'IV' && /^IV-[12]$/.test(cbCode)))) choques.push(f(s) + ' ' + c);
  const cb = d<=92 ? (MANT[d]==='mini_sim' ? 'mini-sim absorbido (receta en extra.minisim_absorbido)' : `carril B = fila mant. ${d} (${MANT[d]})`) : (/^sim100/.test(t)||cola.slice(-2).includes(s) ? '—' : 'carril B = reposición / lista de vigilancia');
  out.push(`| ${f(s)} | ${d} | ${t} | ${cb} |`);
}
console.log(out.join('\n'));
console.log('total',F2.length,'dias',dia(F2[0]),'-',dia(F2.at(-1)),'· sim100 (sin pretest)',nsim,'· choques barrido = carril B:',choques.length ? choques.join(', ') : 0);
