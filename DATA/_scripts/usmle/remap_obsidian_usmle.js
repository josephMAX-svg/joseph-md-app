// Regenera USMLE_OBS_DAY en obsidianMap.ts: día nuevo → path del vault,
// matcheando (system, uw) contra el plan viejo (git HEAD) para no inventar rutas.
const { execSync } = require('child_process');
const fs = require('fs');

const oldTs = execSync('git show HEAD:src/lib/usmleStep1Daily.ts', { cwd: 'D:/joseph-md-app', encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
const mOld = oldTs.match(/export const DIAS: DiaUSMLE\[\] = (\[.*?\]);/s);
const oldDias = JSON.parse(mOld[1].replace(/([{,])([a-zA-Z]+):/g, '$1"$2":'));

const newTs = fs.readFileSync('D:/joseph-md-app/src/lib/usmleStep1Daily.ts', 'utf8');
const mNew = newTs.match(/export const DIAS: DiaUSMLE\[\] = (\[.*?\]);/s);
const newDias = JSON.parse(mNew[1].replace(/([{,])([a-zA-Z]+):/g, '$1"$2":'));

const obsTs = fs.readFileSync('D:/joseph-md-app/src/lib/obsidianMap.ts', 'utf8');
const mObs = obsTs.match(/export const USMLE_OBS_DAY: Record<number, string> = (\{.*?\});/s);
const oldMap = JSON.parse(mObs[1]);

// lookup (system||uw) → path (del plan viejo), y fallback (system) → primer path del sistema
const byKey = {}, bySys = {};
for (const d of oldDias) {
  const p = oldMap[d.d];
  if (!p) continue;
  const k = d.system + '||' + d.uw;
  if (!byKey[k]) byKey[k] = p;
  if (!bySys[d.system]) bySys[d.system] = p;
}
const newMap = {};
let exact = 0, sys = 0, miss = 0;
for (const d of newDias) {
  const k = d.system + '||' + d.uw;
  if (byKey[k]) { newMap[d.d] = byKey[k]; exact++; }
  else if (bySys[d.system]) { newMap[d.d] = bySys[d.system]; sys++; }
  else miss++;
}
const out = obsTs.replace(mObs[1], JSON.stringify(newMap));
fs.writeFileSync('D:/joseph-md-app/src/lib/obsidianMap.ts', out, 'utf8');
console.log('USMLE_OBS_DAY regenerado · exactos:', exact, '· por sistema:', sys, '· sin ruta:', miss);
