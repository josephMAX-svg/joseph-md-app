/**
 * remap_inicio_16jun.js — Reestructuración 15-jun-2026: HOY (15-jun) no se estudió →
 * todo arranca MAÑANA 16-jun. Solo corre fechas (+1 día efectivo), domingos LIBRES,
 * parámetros intactos, ningún tema/video/material suelto. ENCAPS va aparte (Supabase,
 * mantiene examen fijo 20-ago). Synapse va aparte (su generador; arranca 18-jun, no le
 * afecta el 15-jun porque empieza después). Toca: usmleStep1Daily, mirDailyPlan,
 * usmleStep1Plan, researchDailyPlan, dermaDailyPlan, businessStudyPlan.
 * Uso: node DATA/_scripts/remap_inicio_16jun.js
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const iso = (d) => d.toISOString().slice(0, 10);
const fromISO = (s) => new Date(s + 'T12:00:00Z');
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const wdOf = (s) => WD[fromISO(s).getUTCDay()];
const isSun = (s) => fromISO(s).getUTCDay() === 0;

function calNoSun(startISO, n) { const out = []; let c = startISO; while (out.length < n) { if (!isSun(c)) out.push(c); c = addDays(c, 1); } return out; }
function tipoDia(s) { const d = fromISO(s); const dow = d.getUTCDay(); if (dow === 0 || dow === 6) return 'descanso'; let cnt = 0; let cur = fromISO('2026-06-10'); while (cur < d) { const wd = cur.getUTCDay(); if (wd !== 0 && wd !== 6) cnt++; cur.setUTCDate(cur.getUTCDate() + 1); } return cnt % 2 === 0 ? 'research' : 'derma'; }
function slots(tipo, startISO, n) { const out = []; let c = startISO; while (out.length < n) { if (tipoDia(c) === tipo) out.push(c); c = addDays(c, 1); } return out; }

function replaceFechas(file, marker, newDates) {
  const p = path.join(ROOT, file); let s = fs.readFileSync(p, 'utf8');
  const i = s.indexOf(marker); if (i < 0) throw new Error(file + ': marcador ' + marker); const j = s.indexOf('];', i); let k = 0;
  const seg = s.slice(i, j).replace(/(fecha:\s*["'])(2026-\d\d-\d\d)(["'])/g, (_, a, _o, c) => { if (k >= newDates.length) throw new Error(file + ': sobran fechas'); return a + newDates[k++] + c; });
  if (k !== newDates.length) throw new Error(file + `: esperaba ${newDates.length}, reemplazó ${k}`);
  fs.writeFileSync(p, s.slice(0, i) + seg + s.slice(j), 'utf8'); return newDates;
}
function patch(file, from, to) { const p = path.join(ROOT, file); let s = fs.readFileSync(p, 'utf8'); if (!s.includes(from)) throw new Error(file + ': no encontrado →\n' + from.slice(0, 160)); fs.writeFileSync(p, s.replace(from, to), 'utf8'); }
function countFechas(file, marker) { const s = fs.readFileSync(path.join(ROOT, file), 'utf8'); const i = s.indexOf(marker); const j = s.indexOf('];', i); return [...s.slice(i, j).matchAll(/fecha:\s*["'](2026-\d\d-\d\d)["']/g)].map((m) => m[1]); }

// 1) USMLE daily (72)
{ const f = 'src/lib/usmleStep1Daily.ts'; if (countFechas(f, 'export const DIAS').length !== 72) throw new Error('USMLE!=72');
  const f15 = calNoSun('2026-06-15', 72)[71], n = calNoSun('2026-06-16', 72); replaceFechas(f, 'export const DIAS', n);
  patch(f, `step: 1, inicio: '2026-06-15', fin: '${f15}', totalDias: 72, // v3 (13-jun): D1=lun 15-jun · TODOS los domingos libres · 70 temas + 2 colchón`,
            `step: 1, inicio: '2026-06-16', fin: '${n[71]}', totalDias: 72, // v4 (15-jun): D1=mar 16-jun (no se estudió el 15) · TODOS los domingos libres · 70 temas + 2 colchón`);
  console.log('USMLE ✓ d1=' + n[0] + ' dN=' + n[71]); }
// 2) MIR (78)
{ const f = 'src/lib/mirDailyPlan.ts'; if (countFechas(f, 'export const MIR_DIAS').length !== 78) throw new Error('MIR!=78');
  const f15 = calNoSun('2026-06-15', 78)[77], n = calNoSun('2026-06-16', 78); replaceFechas(f, 'export const MIR_DIAS', n);
  patch(f, `inicio: '2026-06-15', fin: '${f15}', totalDias: 78, // v3 (13-jun): D1=lun 15-jun · TODOS los domingos libres · 76 temas + 2 colchón`,
            `inicio: '2026-06-16', fin: '${n[77]}', totalDias: 78, // v4 (15-jun): D1=mar 16-jun (no se estudió el 15) · TODOS los domingos libres · 76 temas + 2 colchón`);
  console.log('MIR ✓ d1=' + n[0] + ' dN=' + n[77]); }
// 3) USMLE plan UNIDADES (5)
{ const f = 'src/lib/usmleStep1Plan.ts'; if (countFechas(f, 'export const UNIDADES').length !== 5) throw new Error('UNID!=5');
  replaceFechas(f, 'export const UNIDADES', calNoSun('2026-06-16', 5));
  patch(f, `inicio: '2026-06-15', // v3 (13-jun): D1=lun 15-jun · todos los domingos libres`,
            `inicio: '2026-06-16', // v4 (15-jun): D1=mar 16-jun (no se estudió el 15) · todos los domingos libres`);
  console.log('USMLE UNIDADES ✓ ' + calNoSun('2026-06-16', 5).join(',')); }
// 4) Research (42) — slots research desde 16-jun
{ const f = 'src/lib/researchDailyPlan.ts'; if (countFechas(f, 'export const DIAS').length !== 42) throw new Error('RES!=42');
  const o15 = slots('research', '2026-06-16', 42), f15 = o15[41]; // (16-jun ya era research → idéntico)
  const n = slots('research', '2026-06-16', 42); replaceFechas(f, 'export const DIAS', n);
  patch(f, `inicio: '2026-06-16', fin: '2026-10-08', totalDias: 42, // v3 (13-jun): D1=${wdOf('2026-06-16')} 2026-06-16 (1er slot-research ≥15-jun) · alterna con Derma · +2 colchón`,
            `inicio: '${n[0]}', fin: '${n[41]}', totalDias: 42, // v4 (15-jun): D1=${wdOf(n[0])} ${n[0]} (1er slot-research ≥16-jun) · alterna con Derma · +2 colchón`);
  console.log('Research ✓ d1=' + n[0] + ' dN=' + n[41]); }
// 5) Derma (70) — slots derma desde 16-jun (1er slot = 17-jun, porque 16 es research)
{ const f = 'src/lib/dermaDailyPlan.ts'; if (countFechas(f, 'DERMA_DIAS: DiaDerma[] = [').length !== 70) throw new Error('DERMA!=70');
  const n = slots('derma', '2026-06-16', 70); replaceFechas(f, 'DERMA_DIAS: DiaDerma[] = [', n);
  patch(f, `inicio: '2026-06-15', fin: '2026-12-24', totalDias: 70, // v3 (13-jun): D1=${wdOf('2026-06-15')} 2026-06-15 (1er slot-derma ≥15-jun) · alterna con Research · 68 átomos + 2 colchón`,
            `inicio: '${n[0]}', fin: '${n[69]}', totalDias: 70, // v4 (15-jun): D1=${wdOf(n[0])} ${n[0]} (1er slot-derma ≥16-jun) · alterna con Research · 68 átomos + 2 colchón`);
  console.log('Derma ✓ d1=' + n[0] + ' dN=' + n[69]); }
// 6) Business — reconstruido desde 16-jun (84 días de trabajo L-S, domingos DESCANSO)
{ const f = 'src/lib/businessStudyPlan.ts'; const p = path.join(ROOT, f); let s = fs.readFileSync(p, 'utf8');
  const marker = 'export const BIZ_DIAS: DiaBiz[] = ['; const i = s.indexOf(marker); const bs = i + marker.length; const j = s.indexOf('];', bs);
  const parts = s.slice(bs, j).split('},{').map((pp, idx, arr) => { let e = pp; if (idx > 0) e = '{' + e; if (idx < arr.length - 1) e = e + '}'; return e.trim(); });
  const work = parts.filter((e) => !/materia:"DESCANSO"/.test(e)); if (work.length !== 84) throw new Error('BIZ work=' + work.length + ' (esperaba 84)');
  const out = []; let cur = '2026-06-16'; let wi = 0; let d = 1;
  while (wi < work.length) {
    if (isSun(cur)) out.push(`{d:${d},fecha:"${cur}",wd:"Dom",materia:"DESCANSO",lectura:"DÍA LIBRE TOTAL (domingo). Sin actividad — descanso real; el sueño/descanso consolida lo estudiado (Walker). Las notas se re-leen el lunes en 10 min.",accion:"",min:0,libroN:null,yt:null}`);
    else out.push(work[wi++].replace(/^\{d:\d+,fecha:"[^"]*",wd:"[^"]*",/, `{d:${d},fecha:"${cur}",wd:"${wdOf(cur)}",`));
    d++; cur = addDays(cur, 1);
  }
  const total = out.length; const fin = out[out.length - 1].match(/fecha:"([^"]*)"/)[1];
  s = s.slice(0, bs) + out.join(',') + s.slice(j);
  s = s.replace(/inicio: '2026-06-15', fin: '[^']*', totalDias: \d+, \/\/ v3 \(13-jun\):[^\n]*/, `inicio: '2026-06-16', fin: '${fin}', totalDias: ${total}, // v4 (15-jun): reconstruido mar 16-jun (no se estudió el 15) · TODOS los domingos LIBRES · 84 días de trabajo + descansos dominicales`);
  s = s.replace(/ \* businessStudyPlan\.ts — Plan DÍA A DÍA "Estudio Pulso" \([^\n]*\)\./, ` * businessStudyPlan.ts — Plan DÍA A DÍA "Estudio Pulso" (${total} días · 16-jun → ${fin}-2026, v4 15-jun; reconstruido a mar 16-jun, todos los domingos libres).`);
  fs.writeFileSync(p, s, 'utf8');
  console.log('Business ✓ reconstruido d1=2026-06-16 dN=' + fin + ' total=' + total + ' (84 trabajo + ' + (total - 84) + ' domingos)'); }

console.log('\nTODO OK — remap 16-jun (5 planes archivo). ENCAPS y Synapse aparte.');
