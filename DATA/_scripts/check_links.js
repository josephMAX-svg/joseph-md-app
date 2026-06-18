// check_links.js — extrae TODAS las URLs de src/ y las verifica por HTTP (liveness).
// Clasifica: OK (2xx/3xx) · DEAD (404/410/DNS/malformed) · BLOCKED (403/429 = bot-block, prob. válido) · TIMEOUT.
// Uso: node DATA/_scripts/check_links.js [archivos...]  (sin args = todo src/) → DATA/_audit/links_report.json
const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const ROOT = path.join(__dirname, '..', '..');
const OUT = path.join(ROOT, 'DATA/_audit'); fs.mkdirSync(OUT, { recursive: true });

const argFiles = process.argv.slice(2);
const files = argFiles.length ? argFiles : cp.execSync('git -C "' + ROOT + '" ls-files src', { encoding: 'utf8' })
  .split('\n').filter(f => /\.(ts|tsx)$/.test(f));
const urlRe = /https?:\/\/[^\s"'`)\]}<>]+/g;
const map = new Map();
for (const f of files) {
  const txt = fs.readFileSync(path.join(ROOT, f), 'utf8');
  for (const m of txt.matchAll(urlRe)) {
    let u = m[0].replace(/[.,;:]+$/, '');
    if (!map.has(u)) map.set(u, new Set());
    map.get(u).add(f);
  }
}
const urls = [...map.keys()];
console.log('URLs únicas:', urls.length, 'en', files.length, 'archivos');

async function check(u) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 9000);
  const opts = { signal: ctrl.signal, redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (link-check)' } };
  try {
    let r = await fetch(u, { ...opts, method: 'HEAD' });
    if ([403, 405, 501, 999].includes(r.status)) r = await fetch(u, { ...opts, method: 'GET' });
    clearTimeout(t);
    return { u, status: r.status };
  } catch (e) {
    clearTimeout(t);
    return { u, status: 0, err: String((e.cause && e.cause.code) || e.name || e.message).slice(0, 40) };
  }
}
(async () => {
  const results = []; const CONC = 14;
  for (let i = 0; i < urls.length; i += CONC) {
    results.push(...await Promise.all(urls.slice(i, i + CONC).map(check)));
    process.stdout.write(`\r  checked ${Math.min(i + CONC, urls.length)}/${urls.length}`);
  }
  console.log('');
  const cls = (r) => {
    if (r.status >= 200 && r.status < 400) return 'OK';
    if (r.status === 404 || r.status === 410) return 'DEAD';
    if (r.status === 0) return /abort/i.test(r.err || '') ? 'TIMEOUT' : 'DEAD';
    if (r.status === 403 || r.status === 429 || r.status === 999) return 'BLOCKED';
    return 'OTHER_' + r.status;
  };
  const out = results.map(r => ({ ...r, cls: cls(r), files: [...map.get(r.u)] }));
  const by = {};
  for (const r of out) (by[r.cls] = by[r.cls] || []).push(r);
  fs.writeFileSync(path.join(OUT, 'links_report.json'), JSON.stringify(out, null, 1), 'utf8');
  console.log('\n=== RESUMEN ===');
  for (const k of Object.keys(by).sort()) console.log(k.padEnd(10), by[k].length);
  console.log('\n=== DEAD / TIMEOUT (revisar) ===');
  const susp = out.filter(x => x.cls === 'DEAD' || x.cls === 'TIMEOUT' || x.cls.startsWith('OTHER'));
  if (!susp.length) console.log('  (ninguno)');
  for (const r of susp) console.log(`[${r.cls}] ${r.status || r.err}  ${r.u}\n        ↳ ${r.files.join(', ')}`);
})();
