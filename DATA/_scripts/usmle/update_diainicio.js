// v5.5+: deriva diaInicio automáticamente del plan real (usmleStep1Plan.ts · SISTEMAS[].diaInicio = d de la 1.ª fila del sistema).
// v6.00 (6-oct-2026): lee DIAS_TODOS (los 2 tramos) del usmleStep1Daily.ts GENERADO, cargado con cargar_ts.js (transpilado en memoria),
//   en vez de parsear `DIAS` con una regex: Micro, Repro, MSK y Bioq solo existen en el tramo 2 (d 101-258). El valor es el `d` de la fila
//   (F1: 1-60 · tramo 2: 101-258), la misma clave que usan plan_checks('usmle', d) y usmleObsUrl(d). Alias nuevo: 'Pharmacology
//   (transversal)' → 'Biochemistry' (la farmacología general transversal va en la fila de Bioquímica dOrig 81; en la v5.x el alias
//   apuntaba a un sistema inexistente y el 80 = 1.ª fila de Bioquímica estaba fijado a mano). Aborta si algún sistema no resuelve.
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
