/**
 * remap_inicio_11jun.js — Reestructuración 10-jun-2026 (pedida por Joseph):
 * TODOS los planes empiezan el 11-jun-2026; los domingos 14-jun y 21-jun quedan
 * SIN actividad (Día del Padre/familia); ningún tema se pierde (solo se corren);
 * +2 días colchón al final de cada plan (donde el final es movible).
 *
 * Toca SOLO los valores `fecha` (reemplazo posicional, contenido intacto byte a byte)
 * + META + 2 entradas colchón por plan:
 *  - usmleStep1Daily.ts  : 70 días → cal(11-jun, skip 14/21) · fin 21-ago · colchón 22/23-ago
 *  - mirDailyPlan.ts     : 76 días → ídem · fin 27-ago · colchón 28/29-ago
 *  - usmleStep1Plan.ts   : 5 fechas UNIDADES → 11,12,13,15,16-jun
 *  - businessStudyPlan.ts: +14 días exactos (jue→jue: ritmo semanal INTACTO; los DESCANSO
 *                          caen solos en 14/21-jun → se marcan Día libre TOTAL) · colchón 15/16-sep
 *  - researchDailyPlan.ts: cada día → siguiente slot-research (alternancia hábiles par=R
 *                          desde ancla 10-jun) · D1: 10-jun→12-jun · colchón = 2 slots extra
 *  - dermaDailyPlan.ts   : fechas YA correctas (empieza 11-jun, findes libres) · solo colchón
 * ENCAPS vive en Supabase (script aparte). Uso: node DATA/_scripts/remap_inicio_11jun.js
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const SKIP = new Set(['2026-06-14', '2026-06-21']);
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const iso = (d) => d.toISOString().slice(0, 10);
const fromISO = (s) => new Date(s + 'T12:00:00Z');
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const wdOf = (s) => WD[fromISO(s).getUTCDay()];

/** n fechas consecutivas desde startISO saltando SKIP. */
function cal(startISO, n) {
  const out = [];
  let cur = startISO;
  while (out.length < n) {
    if (!SKIP.has(cur)) out.push(cur);
    cur = addDays(cur, 1);
  }
  return out;
}

/** Alternancia Research↔Derma (copia exacta de researchData.diaEstudioTipo, ancla 10-jun). */
function tipoDia(s) {
  const d = fromISO(s);
  const dow = d.getUTCDay();
  if (dow === 0 || dow === 6) return 'descanso';
  let count = 0;
  let cur = fromISO('2026-06-10');
  while (cur < d) {
    const wd = cur.getUTCDay();
    if (wd !== 0 && wd !== 6) count++;
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return count % 2 === 0 ? 'research' : 'derma';
}
function slots(tipo, fromISOdate, n) {
  const out = [];
  let cur = fromISOdate;
  while (out.length < n) {
    if (!SKIP.has(cur) && tipoDia(cur) === tipo) out.push(cur);
    cur = addDays(cur, 1);
  }
  return out;
}

/** Reemplazo POSICIONAL de fechas dentro del segmento de un array (contenido intacto). */
function replaceFechas(file, arrayMarker, newDates) {
  const p = path.join(ROOT, file);
  let s = fs.readFileSync(p, 'utf8');
  const i = s.indexOf(arrayMarker);
  if (i < 0) throw new Error(file + ': marcador no encontrado ' + arrayMarker);
  const j = s.indexOf('];', i);
  let k = 0;
  const seg = s.slice(i, j).replace(/(fecha:\s*["'])(2026-\d\d-\d\d)(["'])/g, (_, a, _old, c) => {
    if (k >= newDates.length) throw new Error(file + ': más fechas que newDates');
    return a + newDates[k++] + c;
  });
  if (k !== newDates.length) throw new Error(file + `: esperaba ${newDates.length} fechas, reemplazó ${k}`);
  s = s.slice(0, i) + seg + s.slice(j);
  fs.writeFileSync(p, s, 'utf8');
  return newDates;
}
function patch(file, from, to, optional = false) {
  const p = path.join(ROOT, file);
  let s = fs.readFileSync(p, 'utf8');
  if (!s.includes(from)) {
    if (optional) return false;
    throw new Error(file + ': no encontrado →\n' + from.slice(0, 120));
  }
  s = s.replace(from, to);
  fs.writeFileSync(p, s, 'utf8');
  return true;
}
function appendBeforeArrayEnd(file, arrayMarker, text) {
  const p = path.join(ROOT, file);
  let s = fs.readFileSync(p, 'utf8');
  const i = s.indexOf(arrayMarker);
  const j = s.indexOf('];', i);
  s = s.slice(0, j) + text + s.slice(j);
  fs.writeFileSync(p, s, 'utf8');
}
function countFechas(file, arrayMarker) {
  const s = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const i = s.indexOf(arrayMarker);
  const j = s.indexOf('];', i);
  return [...s.slice(i, j).matchAll(/fecha:\s*["'](2026-\d\d-\d\d)["']/g)].map((m) => m[1]);
}

// ════════ 1) USMLE daily (70 días → 11-jun, skip, colchón 71/72) ════════
{
  const f = 'src/lib/usmleStep1Daily.ts';
  const old = countFechas(f, 'export const DIAS');
  if (old.length !== 70) throw new Error('USMLE: esperaba 70, hay ' + old.length);
  const nd = cal('2026-06-11', 70);
  replaceFechas(f, 'export const DIAS', nd);
  appendBeforeArrayEnd(f, 'export const DIAS',
    `,{d:71,fecha:"${cal('2026-06-11', 72)[70]}",system:"Repaso integral",tier:"MED",sub:"COLCHÓN 1 · uWorld: incorrects + marked de los sistemas CORE (sin tema nuevo)",bbCh:"Repaso",bbVid:"—",uw:"Review: incorrects + marked",mat:"uWorld + Anki",matType:"clin",palm:null},` +
    `{d:72,fecha:"${cal('2026-06-11', 72)[71]}",system:"Repaso integral",tier:"MED",sub:"COLCHÓN 2 · Anki USMLE completo + tabla de conceptos que aún fallan",bbCh:"Repaso",bbVid:"—",uw:"Review: marked",mat:"Anki + First Aid",matType:"clin",palm:null}`);
  patch(f, "step: 1, inicio: '2026-06-10', fin: '2026-08-18', totalDias: 70,",
    "step: 1, inicio: '2026-06-11', fin: '" + cal('2026-06-11', 72)[71] + "', totalDias: 72, // v2: D1=11-jun · 14/21-jun libres · 70 temas + 2 colchón");
  patch(f, ' * Del 2026-06-10 (Día 1) al 2026-08-18 (Día 70).', ' * Del 2026-06-11 (Día 1) al ' + cal('2026-06-11', 72)[71] + ' (70 temas + 2 colchón). Dom 14/21-jun: LIBRES.');
  console.log('USMLE daily ✓  d1=' + nd[0] + ' d70=' + nd[69] + ' colchón=' + cal('2026-06-11', 72).slice(70).join(','));
}

// ════════ 2) MIR daily (76 días → 11-jun, skip, colchón 77/78) ════════
{
  const f = 'src/lib/mirDailyPlan.ts';
  const old = countFechas(f, 'export const MIR_DIAS');
  if (old.length !== 76) throw new Error('MIR: esperaba 76, hay ' + old.length);
  const nd = cal('2026-06-11', 78);
  replaceFechas(f, 'export const MIR_DIAS', nd.slice(0, 76));
  appendBeforeArrayEnd(f, 'export const MIR_DIAS',
    `,{d:77,fecha:"${nd[76]}",asignatura:"Repaso integral",num:0,rent:"roja",tema:"COLCHÓN 1 · Repaso libre: errores + temas de mayor peso (arranca por Cardiología básica)",capId:"570779c9f4d68bf008dbc7e9",peso:null,vuelta:1,resumenVid:""},` +
    `{d:78,fecha:"${nd[77]}",asignatura:"Repaso integral",num:0,rent:"roja",tema:"COLCHÓN 2 · Anki MIR completo + segunda pasada de marcados",capId:"570779c9f4d68bf008dbc7e9",peso:null,vuelta:1,resumenVid:""}`);
  patch(f, "inicio: '2026-06-10', fin: '2026-08-24', totalDias: 76,",
    "inicio: '2026-06-11', fin: '" + nd[77] + "', totalDias: 78, // v2: D1=11-jun · 14/21-jun libres · 76 temas + 2 colchón");
  patch(f, ' * Del 2026-06-10 (Día 1) al 2026-08-24 (Día 76).', ' * Del 2026-06-11 (Día 1) al ' + nd[77] + ' (76 temas + 2 colchón). Dom 14/21-jun: LIBRES.');
  console.log('MIR daily ✓  d1=' + nd[0] + ' d76=' + nd[75] + ' colchón=' + nd.slice(76).join(','));
}

// ════════ 3) USMLE plan (UNIDADES muestra sem 1 + meta) ════════
{
  const f = 'src/lib/usmleStep1Plan.ts';
  const old = countFechas(f, 'export const UNIDADES');
  if (old.length !== 5) throw new Error('UNIDADES: esperaba 5, hay ' + old.length);
  replaceFechas(f, 'export const UNIDADES', cal('2026-06-11', 5));
  patch(f, "inicio: '2026-06-10',", "inicio: '2026-06-11', // v2: 14/21-jun libres");
  patch(f, "nota: 'Prioridad Step 1. Hoy es el Día 1 (Cardiovascular).", "nota: 'Prioridad Step 1. Día 1 = 11-jun (Cardiovascular).", true);
  console.log('USMLE UNIDADES ✓ ' + cal('2026-06-11', 5).join(','));
}

// ════════ 4) Business (+14 días exactos; descansos caen en 14/21; colchón 97/98) ════════
{
  const f = 'src/lib/businessStudyPlan.ts';
  const old = countFechas(f, 'export const BIZ_DIAS');
  if (old.length !== 96) throw new Error('BIZ: esperaba 96, hay ' + old.length);
  const nd = old.map((s) => addDays(s, 14)); // jue 28-may → jue 11-jun: wd INTACTO
  replaceFechas(f, 'export const BIZ_DIAS', nd);
  // Los dos domingos bloqueados quedan como Día libre TOTAL (eran DESCANSO: nada se pierde)
  patch(f,
    '{d:4,fecha:"2026-06-14",wd:"Dom",materia:"DESCANSO",lectura:"Descanso total. Cerebro en consolidación. Implementar régimen biológico arrancando.",accion:"",min:0,libroN:null,yt:null}',
    '{d:4,fecha:"2026-06-14",wd:"Dom",materia:"DESCANSO",lectura:"DÍA LIBRE TOTAL (Día del Padre 🎉). Ninguna actividad — bloqueado por Joseph.",accion:"",min:0,libroN:null,yt:null}');
  patch(f,
    '{d:11,fecha:"2026-06-21",wd:"Dom",materia:"DESCANSO",lectura:"Descanso. Re-leer notas semana.",accion:"",min:120,libroN:null,yt:null}',
    '{d:11,fecha:"2026-06-21",wd:"Dom",materia:"DESCANSO",lectura:"DÍA LIBRE TOTAL (domingo familiar). Ninguna actividad — las notas se re-leen el lunes en 10 min.",accion:"",min:0,libroN:null,yt:null}');
  const c1 = addDays(nd[95], 1), c2 = addDays(nd[95], 2);
  appendBeforeArrayEnd(f, 'export const BIZ_DIAS',
    `,{d:97,fecha:"${c1}",wd:"${wdOf(c1)}",materia:"META",lectura:"COLCHÓN 1 · Repaso integral: Anki de los 3 meses + cerrar cualquier output a medias",accion:"Todo entregable cerrado",min:120,libroN:null,yt:null},` +
    `{d:98,fecha:"${c2}",wd:"${wdOf(c2)}",materia:"META",lectura:"COLCHÓN 2 · Síntesis final v2 + plan del siguiente ciclo de lectura",accion:"Documento de cierre",min:120,libroN:null,yt:null}`);
  patch(f, "inicio: '2026-05-28', fin: '2026-08-31', totalDias: 96,",
    "inicio: '2026-06-11', fin: '" + c2 + "', totalDias: 98, // v2: corrido +14d (jue→jue, ritmo semanal intacto) · 14/21-jun libres · +2 colchón");
  patch(f, ' * businessStudyPlan.ts — Plan DÍA A DÍA "Estudio Pulso" (96 días · 28-may → 31-ago-2026).',
    ' * businessStudyPlan.ts — Plan DÍA A DÍA "Estudio Pulso" (98 días · 11-jun → ' + c2 + '-2026, v2 corrido +14d).');
  console.log('Business ✓  d1=' + nd[0] + ' (wd intacto) d96=' + nd[95] + ' colchón=' + c1 + ',' + c2);
}

// ════════ 5) Research (cada día → siguiente slot research; colchón 41/42) ════════
{
  const f = 'src/lib/researchDailyPlan.ts';
  const old = countFechas(f, 'export const DIAS');
  if (old.length !== 40) throw new Error('RESEARCH: esperaba 40, hay ' + old.length);
  const nd = slots('research', '2026-06-11', 42);
  replaceFechas(f, 'export const DIAS', nd.slice(0, 40));
  appendBeforeArrayEnd(f, 'export const DIAS',
    `\n  { d: 41, fecha: '${nd[40]}', fase: 'R8', code: 'RC1', prioridad: 'BAJA', objetivo: 'COLCHÓN 1 · Cerrar flecos: terminar cualquier átomo a medias + re-correr el checklist PRISMA de SR-1', entregable: 'SR-1 sin pendientes abiertos', tool: 'Rayyan · Zotero', recs: ['PM'], apex: null },` +
    `\n  { d: 42, fecha: '${nd[41]}', fase: 'R8', code: 'RC2', prioridad: 'BAJA', objetivo: 'COLCHÓN 2 · Retro del método: qué automatizar para SR-2 (notas para el sistema agéntico)', entregable: 'Lista de mejoras + arranque de plan SR-2', tool: 'Obsidian', recs: ['PM'], apex: null },`);
  patch(f, "inicio: '2026-06-10', fin: '2026-09-28', totalDias: 40,",
    "inicio: '" + nd[0] + "', fin: '" + nd[41] + "', totalDias: 42, // v2: D1=vie 12-jun (el 10-jun no se estudió; Derma conserva 11-jun) · +2 colchón");
  patch(f, ' * 40 átomos (mié 10-jun-2026 → lun 28-sep-2026), 1 átomo por DÍA-RESEARCH.',
    ' * 40 átomos + 2 colchón (vie 12-jun-2026 → ' + nd[41] + '), 1 átomo por DÍA-RESEARCH.');
  console.log('Research ✓  d1=' + nd[0] + ' d40=' + nd[39] + ' colchón=' + nd.slice(40).join(','));
}

// ════════ 6) Derma (fechas YA correctas; solo colchón 69/70 en slots derma) ════════
{
  const f = 'src/lib/dermaDailyPlan.ts';
  const old = countFechas(f, 'DERMA_DIAS: DiaDerma[] = [');
  if (old.length !== 68) throw new Error('DERMA: esperaba 68, hay ' + old.length);
  if (old[0] !== '2026-06-11') throw new Error('DERMA: d1 debería ser 11-jun');
  if (old.some((x) => SKIP.has(x))) throw new Error('DERMA: tiene días en 14/21-jun');
  const next = slots('derma', addDays(old[67], 1), 2);
  appendBeforeArrayEnd(f, 'DERMA_DIAS: DiaDerma[] = [',
    `\n  { d: 69, fecha: '${next[0]}', bloque: B.Z, bKey: 'Z', tier: 'MED', sub: 'COLCHÓN 1 · Repaso libre: incorrects de QBanks + flashcards de los bloques más flojos', referente: null,\n    access: { t: 'Tus notas + Guidebook (repaso)', url: book(2960) }, qbankly: { t: 'QBanks (repaso de incorrects)', url: QB_QBANKS, via: 'edge' }, promir: null, extra: null },` +
    `\n  { d: 70, fecha: '${next[1]}', bloque: B.Z, bKey: 'Z', tier: 'MED', sub: 'COLCHÓN 2 · Dermki/Anki segunda pasada + tabla de conceptos que aún fallan', referente: null,\n    access: { t: 'Tus notas + Guidebook (repaso)', url: book(2960) }, qbankly: { t: 'QBanks (marcadas)', url: QB_QBANKS, via: 'edge' }, promir: null, extra: null },`);
  patch(f, "inicio: '2026-06-11', fin: '2026-12-16', totalDias: 68,",
    "inicio: '2026-06-11', fin: '" + next[1] + "', totalDias: 70, // v2: 68 átomos + 2 colchón (14/21-jun ya eran descanso)");
  console.log('Derma ✓  (sin cambios de fechas) colchón=' + next.join(','));
}

console.log('\nTODO OK — remapeo completo.');
