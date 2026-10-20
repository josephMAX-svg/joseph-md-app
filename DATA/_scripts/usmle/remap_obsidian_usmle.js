// Regenera USMLE_OBS_DAY en src/lib/obsidianMap.ts: d del plan → path del vault (nota del subtopic uWorld), sin inventar rutas.
// v6.00 (6-oct-2026): la base es FIJA (ya no `git show HEAD`, que deja de ser v5.20 tras el commit): obs_day_v520.json (el USMLE_OBS_DAY
//   de la v5.20, extraído de fd85f61) + ref_v6/dias_v520.json (filas v5.20 congeladas). Las filas v6 se leen del usmleStep1Daily.ts
//   GENERADO (cargar_ts.js → DIAS_TODOS):
//   · D1-D57 → mismo path que en la v5.20 (filas idénticas) · D58 → path de la v5.20 D79 (bioestadística) · D59-D60 (C1/C2) sin nota
//   · filas del tramo 2 con dOrig → path de ese D v5.20 (las partidas comparten nota) · recuperaciones F1 (dF1) → path de su D (58 → 79)
//   · resto (reentrada, hitos, day-after, refuerzo, reactivación, banco/sprint nuevos, colchón) sin nota, como los hitos en la v5.x.
//   Además actualiza los dos comentarios del mapa USMLE (cabecera y doc de USMLE_OBS_DAY). Idempotente.
// v6.01 (10-oct-2026): F1 = D1-D57 (lun 12-oct → mié 30-dic; C1/C2 consumidos) y la bioestadística (v5.20 D79) va DESPLAZADA al tramo 2
//   con dOrig 79 → hereda la nota de D79 por la regla de las filas T con dOrig. El origen de cada fila de F1 sale del orden de F1
//   (gen_tramo2.ORIGEN_F1_TEMARIO: posición p → D# v5.20; las filas 'Colchón' no tienen origen), no de «D58 = 79» escrito a mano; las
//   recuperaciones (dF1) usan el mismo orden. Los dos comentarios del mapa se reescriben con los rangos reales (regex de línea completa:
//   idempotente, sirve sobre el texto v5.x, v6.00 o v6.01).
// v6.02 (17-oct-2026): el origen de cada d de F1 sale de la COLOCACIÓN (gen_tramo2.colocarF1(DIAS.length): hitos anclados en F1) en vez
//   de la posición: d 1-51 = v5.20 D1-D51 · d 52 = v5.20 D55 (NBME 28, sin nota como todo hito). Las recuperaciones (dF1 = slot de F1) usan
//   la misma colocación. Las desplazadas (D52-D54, D56, D57, D79) heredan la nota de su dOrig en el tramo 2 (T3-T8).
// v6.03 (20-oct-2026): sin cambio de lógica. colocarF1(50): d 1-49 = v5.20 D1-D49 · d 50 = v5.20 D55 (NBME 28, sin nota). Las 8
//   desplazadas (D50-D54, D56, D57, D79) heredan la nota de su dOrig en el tramo 2 (T3-T10, d 103-110).
// v5.x: matcheaba (system, uw) contra el plan viejo de git HEAD (fallback: 1.er path del sistema).
'use strict';
const fs = require('fs');
const path = require('path');
const { ROOT, cargarUsmleDaily } = require('./cargar_ts');
const { ORIGEN_F1_TEMARIO, colocarF1 } = require('./gen_tramo2');

const OLD = JSON.parse(fs.readFileSync(path.join(__dirname, 'obs_day_v520.json'), 'utf8')).USMLE_OBS_DAY;
const V520 = JSON.parse(fs.readFileSync(path.join(__dirname, 'ref_v6', 'dias_v520.json'), 'utf8'));
const byD = Object.fromEntries(V520.map((x) => [x.d, x]));
const { version } = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '_fechas_v6.json'), 'utf8'));
const { DIAS, DIAS_T2 } = cargarUsmleDaily();

const OBS = path.join(ROOT, 'src', 'lib', 'obsidianMap.ts');
let obsTs = fs.readFileSync(OBS, 'utf8');
const mObs = obsTs.match(/export const USMLE_OBS_DAY: Record<number, string> = (\{.*?\});/s);
if (!mObs) { console.error('✗ no encuentro USMLE_OBS_DAY en obsidianMap.ts'); process.exit(1); }

/** fila de F1 → D# v5.20 de su contenido (v6.02: colocación de F1 con hitos anclados; las filas 'Colchón' no tienen origen) */
const COL = colocarF1(DIAS.length, byD).enF1;
const origenF1 = (x) => (typeof COL[x.d - 1] === 'number' ? COL[x.d - 1] : null);
const mismo = (a, b) => ['system', 'sub', 'uw'].every((k) => a[k] === b[k]);
const newMap = {};
let f1 = 0, t2 = 0, sin = 0;
const err = [];
for (const x of DIAS) {
  const dv = origenF1(x);
  if (dv && byD[dv] && !mismo(x, byD[dv]) && !/🎯/.test(x.sub)) err.push(`D${x.d} ≠ v5.20 D${dv}`);
  if (dv && OLD[dv]) { newMap[x.d] = OLD[dv]; f1++; } else sin++;
}
for (const x of DIAS_T2) {
  const dv = x.dOrig != null ? x.dOrig : x.dF1 != null ? COL[x.dF1 - 1] : null;
  if (dv && OLD[dv]) { newMap[x.d] = OLD[dv]; t2++; } else sin++;
}
if (err.length) { console.error('✗ filas F1 que ya no son las de la v5.20: ' + err.join(', ')); process.exit(1); }
obsTs = obsTs.replace(mObs[1], JSON.stringify(newMap));
// comentarios del mapa USMLE (rangos reales)
const T2r = DIAS_T2.length ? `${DIAS_T2[0].d}-${DIAS_T2[DIAS_T2.length - 1].d}` : '—';
const desplObs = DIAS_T2.filter((x) => x.dOrig != null && ORIGEN_F1_TEMARIO.includes(x.dOrig)).map((x) => `D${x.dOrig} → d ${x.d}`);
const COMENT = [
  [/ \*  · USMLE:  (?:día del plan \(1-70\)|d del plan \(v)[^\n]*(?:\n \*            regenera DATA\/_scripts\/usmle\/remap_obsidian_usmle\.js)?/,
    ` *  · USMLE:  d del plan (${version}: D1-D${DIAS.length} + tramo 2 d ${T2r}) → nota del subtopic uWorld (árbol 02_UWORLD_SYSTEMS) · ese mapa lo\n *            regenera DATA/_scripts/usmle/remap_obsidian_usmle.js`],
  [/\/\*\* USMLE — (?:día|d) del plan Step 1 → ruta de la nota del subtopic uWorld[^]*?\*\//,
    `/** USMLE — d del plan Step 1 → ruta de la nota del subtopic uWorld · ${version}: claves = d de DIAS_TODOS (F1 1-${DIAS.length} · tramo 2 ${T2r};\n *  las filas del tramo 2 con dOrig heredan la nota de ese D de la v5.20${desplObs.length ? ', también las desplazadas de F1: ' + desplObs.join(', ') : ''}) · GENERADO por DATA/_scripts/usmle/remap_obsidian_usmle.js */`],
];
for (const [re, nuevo] of COMENT) {
  if (re.test(obsTs)) obsTs = obsTs.replace(re, nuevo);
  else console.warn('⚠ comentario no encontrado (se deja como está): ' + String(re).slice(0, 60));
}
fs.writeFileSync(OBS, obsTs, 'utf8');
console.log(`USMLE_OBS_DAY regenerado · ${Object.keys(newMap).length} claves · F1 ${f1} · tramo 2 ${t2} · sin nota ${sin} (colchón, hitos, reentrada, refuerzo, reactivación, banco nuevo)${desplObs.length ? ' · desplazadas de F1: ' + desplObs.join(', ') : ''}`);
