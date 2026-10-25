// v5.5+: deriva diaInicio automáticamente del plan real (usmleStep1Plan.ts · SISTEMAS[].diaInicio = d de la 1.ª fila del sistema).
// v6.00 (6-oct-2026): lee DIAS_TODOS (los 2 tramos) del usmleStep1Daily.ts GENERADO, cargado con cargar_ts.js (transpilado en memoria),
//   en vez de parsear `DIAS` con una regex: Micro, Repro, MSK y Bioq solo existen en el tramo 2 (d 101-258). El valor es el `d` de la fila
//   (F1: 1-60 · tramo 2: 101-258), la misma clave que usan plan_checks('usmle', d) y usmleObsUrl(d). Alias nuevo: 'Pharmacology
//   (transversal)' → 'Biochemistry' (la farmacología general transversal va en la fila de Bioquímica dOrig 81; en la v5.x el alias
//   apuntaba a un sistema inexistente y el 80 = 1.ª fila de Bioquímica estaba fijado a mano). Aborta si algún sistema no resuelve.
// v6.01 (10-oct-2026): sin cambio de lógica. F1 = D1-D57 (lun 12-oct → mié 30-dic) y la bioestadística (v5.20 D79) vive en el tramo 2,
//   así que 'Psychiatry & Behavioral' empieza en su fila T (d 103) en vez del D58 de la v6.00; el resto sale igual por d.
// v6.02 (17-oct-2026): sin cambio de lógica. F1 = D1-D52 (lun 19-oct → mié 30-dic; D52 = NBME 28) y las desplazadas D52-D54, D56, D57
//   (Heme/Onco) + D79 van a T3-T8: Heme/Onco sigue empezando en D51 (su 1.ª fila, en F1); Psiquiatría pasa a la bioestadística T8
//   (d 108) y Micro/Repro/MSK/Bioq corren 5 filas en el tramo 2 (lo imprime la corrida).
// v6.03 (20-oct-2026): sin cambio de lógica. F1 = D1-D50 (mié 21-oct → mié 30-dic; D50 = NBME 28) y 8 desplazadas (v5.20 D50 Neuro,
//   D51-D54, D56, D57 Heme/Onco, D79) → T3-T10: Neuro sigue empezando en D43; Heme/Onco pasa a empezar en el tramo 2 (T4, d 104);
//   Psiquiatría = bioestadística T10 (d 110) y Micro/Repro/MSK/Bioq corren 2 filas más (lo imprime la corrida).
// v6.05 (24-oct-2026): sin cambio de lógica. F1 = D1-D47 (lun 26-oct → mié 30-dic; D47 = NBME 28) y 11 desplazadas (v5.20 D47-D50 Neuro,
//   D51-D54, D56, D57 Heme/Onco, D79) → T3-T13: Neuro sigue empezando en D43; Heme/Onco empieza en T7 (d 107); Psiquiatría = bioestadística
//   T13 (d 113) y Micro/Repro/MSK/Bioq corren 3 filas más (114 · 121 · 126 · 132; lo imprime la corrida).
'use strict';
const fs = require('fs');
const path = require('path');
const { ROOT, cargarUsmleDaily } = require('./cargar_ts');
const { DIAS_TODOS } = cargarUsmleDaily();
const first = {}; for (const x of DIAS_TODOS) if (!(x.system in first)) first[x.system] = x.d;
const alias = { 'Respiratory / Pulmonary': 'Respiratory', 'Renal & Electrolytes': 'Renal', 'Infectious Disease / Micro': 'Microbiology / ID', 'Pharmacology (transversal)': 'Biochemistry' };
const P = path.join(ROOT, 'src', 'lib', 'usmleStep1Plan.ts');
let t = fs.readFileSync(P, 'utf8'); let changed = 0, same = 0; const miss = [];
t = t.replace(/(sistema: '([^']+)'[^\n]*?diaInicio: )(\d+)/g, (m, pre, name, old) => {
  const key = alias[name] || name; const d = first[key];
  if (d == null) { miss.push(name); return m; }
  if (Number(old) === d) same++; else changed++;
  return pre + d;
});
if (miss.length) { console.error('✗ SIN SISTEMA EN DIAS_TODOS: ' + miss.join(', ') + ' — no se escribe usmleStep1Plan.ts'); process.exit(1); }
fs.writeFileSync(P, t, 'utf8');
console.log('diaInicio · cambiados', changed, '· iguales', same, '· sin match 0 ·', JSON.stringify(first));
