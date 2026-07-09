// merge_qx_live.js — Une los 93 videos QX vigentes + 30 huérfanos recuperados (clasificados por el
// workflow) en un único mapa por código, con URLs canónicas (capId estable por curso, videoId vivo).
// Fuentes: scratchpad/qx_kept_by_code.json (93) + scratchpad/orphan_codes.json (30 [{vid,code,cur,title}]).
// Salida: scratchpad/qx_live_by_code.json (123 videos, 0 dup).
const fs = require('fs');
const SB = process.env.SB || 'C:/Users/JOSEPH~1/AppData/Local/Temp/claude/D--joseph-md-app/2b1d4275-ceb5-4f8d-9ab0-d4dbbd76c52a';
const CAP = {
  SP:  'aE9hL1hsSzZmMFZaN1lkKzBneFNTUT09',
  CI:  'SGkvT3dXUm9tUXdoaVd6bzJESE9WR0ExVisxT2N1amhkQUhLQnZkbU04ND0=',
  ET:  'NFU1UW01dnJ4djVaS2IrVDEvTGoyOGpBMXYvNWlYUnl0MGVHYW13dDNCST0=',
  INV: 'SkxpQUdlZHFSMExoRWJHUlRIRjMvZz09',
  GE:  'MUdodjYwYlI0bTUvNmpFSVY5UDFoSklLZzU1RlF3eGJBUW1XdjRWZTZGUi83RXdXcDIwZzZ1dzBvSGp4TC9tTA==',
};
const url = (cur, vid) => `https://qxmedic-aulavirtual.com/mis-clases/videoclases/${CAP[cur]}/${vid}`;

const byCode = JSON.parse(fs.readFileSync(SB + '/scratchpad/qx_kept_by_code.json', 'utf8'));
const orphans = JSON.parse(fs.readFileSync(SB + '/scratchpad/orphan_codes.json', 'utf8'));

const seen = new Set();
for (const c of Object.keys(byCode)) for (const v of byCode[c]) seen.add(v.url);
let added = 0;
for (const o of orphans) {
  const u = url(o.cur, o.vid);
  if (seen.has(u)) continue; seen.add(u);
  (byCode[o.code] = byCode[o.code] || []).push({ titulo: o.title, url: u, vid: o.vid });
  added++;
}
// PRIORIZAR MAPAS CONCEPTUALES: dentro de cada código, los "mapa conceptual" van PRIMERO (ahorran
// tiempo vs el video largo del mismo tema; Joseph los ve primero y solo baja al video si necesita más).
const esMapa = t => /mapa concep/i.test(t || '');
for (const c of Object.keys(byCode)) {
  byCode[c] = byCode[c].map((v, i) => ({ v, i }))
    .sort((a, b) => (esMapa(b.v.titulo) - esMapa(a.v.titulo)) || (a.i - b.i))  // mapas primero, resto en orden estable
    .map(x => x.v);
}
fs.writeFileSync(SB + '/scratchpad/qx_live_by_code.json', JSON.stringify(byCode, null, 1));
const total = Object.values(byCode).reduce((n, a) => n + a.length, 0);
console.log('qx_live_by_code.json:', Object.keys(byCode).length, 'códigos ·', total, 'videos · huérfanos añadidos:', added);
for (const c of Object.keys(byCode).sort()) console.log('  ' + c.padEnd(11) + byCode[c].length);
