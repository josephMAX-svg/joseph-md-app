// Regenera USMLE_OBS_DAY en src/lib/obsidianMap.ts: d del plan → path del vault (nota del subtopic uWorld), sin inventar rutas.
// v6.00 (6-oct-2026): la base es FIJA (ya no `git show HEAD`, que deja de ser v5.20 tras el commit): obs_day_v520.json (el USMLE_OBS_DAY
//   de la v5.20, extraído de fd85f61) + ref_v6/dias_v520.json (filas v5.20 congeladas). Las filas v6 se leen del usmleStep1Daily.ts
//   GENERADO (cargar_ts.js → DIAS_TODOS):
//   · D1-D57 → mismo path que en la v5.20 (filas idénticas) · D58 → path de la v5.20 D79 (bioestadística) · D59-D60 (C1/C2) sin nota
//   · filas del tramo 2 con dOrig → path de ese D v5.20 (las partidas comparten nota) · recuperaciones F1 (dF1) → path de su D (58 → 79)
//   · resto (reentrada, hitos, day-after, refuerzo, reactivación, banco/sprint nuevos, colchón) sin nota, como los hitos en la v5.x.
//   Además actualiza los dos comentarios del mapa USMLE (cabecera y doc de USMLE_OBS_DAY). Idempotente.
// v5.x: matcheaba (system, uw) contra el plan viejo de git HEAD (fallback: 1.er path del sistema).
'use strict';
const fs = require('fs');
const path = require('path');
const { ROOT, cargarUsmleDaily } = require('./cargar_ts');

const OLD = JSON.parse(fs.readFileSync(path.join(__dirname, 'obs_day_v520.json'), 'utf8')).USMLE_OBS_DAY;
const V520 = JSON.parse(fs.readFileSync(path.join(__dirname, 'ref_v6', 'dias_v520.json'), 'utf8'));
const byD = Object.fromEntries(V520.map((x) => [x.d, x]));
const { DIAS, DIAS_T2 } = cargarUsmleDaily();

const OBS = path.join(ROOT, 'src', 'lib', 'obsidianMap.ts');
let obsTs = fs.readFileSync(OBS, 'utf8');
const mObs = obsTs.match(/export const USMLE_OBS_DAY: Record<number, string> = (\{.*?\});/s);
if (!mObs) { console.error('✗ no encuentro USMLE_OBS_DAY en obsidianMap.ts'); process.exit(1); }

const mismo = (a, b) => ['system', 'sub', 'uw'].every((k) => a[k] === b[k]);
const newMap = {};
let f1 = 0, t2 = 0, sin = 0;
const err = [];
for (const x of DIAS) {
  const dv = x.d <= 57 ? x.d : x.d === 58 ? 79 : null; // D58 = v5.20 D79 · C1/C2 sin origen
  if (dv && byD[dv] && !mismo(x, byD[dv]) && !/🎯/.test(x.sub)) err.push(`D${x.d} ≠ v5.20 D${dv}`);
  if (dv && OLD[dv]) { newMap[x.d] = OLD[dv]; f1++; } else sin++;
}
for (const x of DIAS_T2) {
  const dv = x.dOrig != null ? x.dOrig : x.dF1 != null ? (x.dF1 === 58 ? 79 : x.dF1) : null;
  if (dv && OLD[dv]) { newMap[x.d] = OLD[dv]; t2++; } else sin++;
}
if (err.length) { console.error('✗ filas F1 que ya no son las de la v5.20: ' + err.join(', ')); process.exit(1); }
obsTs = obsTs.replace(mObs[1], JSON.stringify(newMap));
// comentarios del mapa USMLE (v6.00)
const COMENT = [
  [' *  · USMLE:  día del plan (1-70) → nota del subtopic uWorld (árbol 02_UWORLD_SYSTEMS)',
    ' *  · USMLE:  d del plan (v6.00: D1-D60 + tramo 2 d 101-258) → nota del subtopic uWorld (árbol 02_UWORLD_SYSTEMS) · ese mapa lo\n *            regenera DATA/_scripts/usmle/remap_obsidian_usmle.js'],
  ['/** USMLE — día del plan Step 1 → ruta de la nota del subtopic uWorld */',
    '/** USMLE — d del plan Step 1 → ruta de la nota del subtopic uWorld · v6.00: claves = d de DIAS_TODOS (F1 1-60 · tramo 2 101-258;\n *  las filas del tramo 2 con dOrig heredan la nota de ese D de la v5.20) · GENERADO por DATA/_scripts/usmle/remap_obsidian_usmle.js */'],
];
for (const [viejo, nuevo] of COMENT) {
  if (obsTs.includes(viejo)) obsTs = obsTs.replace(viejo, nuevo);
  else if (!obsTs.includes(nuevo)) console.warn('⚠ comentario no encontrado (se deja como está): ' + viejo.slice(0, 60));
}
fs.writeFileSync(OBS, obsTs, 'utf8');
console.log(`USMLE_OBS_DAY regenerado · ${Object.keys(newMap).length} claves · F1 ${f1} · tramo 2 ${t2} · sin nota ${sin} (C1/C2, hitos, reentrada, refuerzo, reactivación, banco nuevo, colchón)`);
