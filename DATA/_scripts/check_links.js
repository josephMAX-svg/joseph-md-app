// check_links.js — verifica que TODAS las URLs de los data files respondan (HTTP).
// 403/405/429 cuentan como alcanzables (anti-bot, pero el dominio existe).
const fs = require('fs');
const files = process.argv.slice(2).length ? process.argv.slice(2) : [
  'src/lib/businessBooksExtra.ts',
  'src/lib/brandContentExtras.ts',
  'src/lib/businessStudyPlan.ts',
  'src/lib/estudioPulsoData.ts',
];
const urls = new Set();
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  for (const m of t.matchAll(/https?:\/\/[^\s"'`\\)\]]+/g)) urls.add(m[0].replace(/[.,;]+$/, ''));
}
const list = [...urls];
console.log('URLs unicas a verificar:', list.length);
const check = (u) => fetch(u, {
  method: 'GET', redirect: 'follow',
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  signal: AbortSignal.timeout(15000),
}).then(r => ({ u, s: r.status })).catch(e => ({ u, s: 'ERR:' + (e.cause && e.cause.code || e.name) }));
(async () => {
  const results = [];
  for (let i = 0; i < list.length; i += 12) {
    results.push(...await Promise.all(list.slice(i, i + 12).map(check)));
    process.stdout.write('.');
  }
  console.log();
  const ok = (s) => typeof s === 'number' && (s < 400 || s === 403 || s === 405 || s === 429);
  const bad = results.filter(r => !ok(r.s));
  console.log('OK/alcanzables:', results.length - bad.length, '/', results.length);
  if (bad.length) { console.log('PROBLEMAS:'); bad.forEach(b => console.log(' ', b.s, b.u)); }
})();
