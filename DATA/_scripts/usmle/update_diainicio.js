// v5.5+: deriva diaInicio automáticamente del array DIAS real
const fs = require('fs');
const D = fs.readFileSync('D:/joseph-md-app/src/lib/usmleStep1Daily.ts', 'utf8');
const arr = JSON.parse(D.match(/export const DIAS: DiaUSMLE\[\] = (\[.*?\]);/s)[1].replace(/([{,])([a-zA-Z]+):/g, '$1"$2":'));
const first = {}; for (const x of arr) if (!(x.system in first)) first[x.system] = x.d;
const alias = { 'Respiratory / Pulmonary': 'Respiratory', 'Renal & Electrolytes': 'Renal', 'Infectious Disease / Micro': 'Microbiology / ID', 'Pharmacology (transversal)': 'Pharmacology' };
const P = 'D:/joseph-md-app/src/lib/usmleStep1Plan.ts';
let t = fs.readFileSync(P, 'utf8'); let changed = 0, same = 0, miss = 0;
t = t.replace(/(sistema: '([^']+)'[^\n]*?diaInicio: )(\d+)/g, (m, pre, name, old) => {
  const key = alias[name] || name; const d = first[key];
  if (d == null) { miss++; console.log('SIN SISTEMA EN DIAS:', name); return m; }
  if (Number(old) === d) same++; else changed++;
  return pre + d;
});
fs.writeFileSync(P, t, 'utf8');
console.log('diaInicio · cambiados', changed, '· iguales', same, '· sin match', miss, '·', JSON.stringify(first));
