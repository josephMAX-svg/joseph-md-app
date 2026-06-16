/**
 * remap_inicio_15jun.js — Reestructuración 13-jun-2026 (pedida por Joseph):
 * TODOS los planes arrancan ~15-jun-2026 y TODOS los domingos quedan LIBRES (sin
 * actividad). Ningún tema se pierde (solo se corren las fechas). Los finales se
 * extienden de forma natural (NO se comprimen: para los no-ENCAPS el deadline 20-ago
 * NO aplica — eso es sólo ENCAPS, que vive en Supabase y se reconstruye aparte).
 *
 * Por plan:
 *  - usmleStep1Daily.ts : 72 días → lun 15-jun, saltando TODOS los domingos
 *  - mirDailyPlan.ts     : 78 días → ídem
 *  - usmleStep1Plan.ts   : 5 fechas UNIDADES → 15-jun saltando domingos
 *  - researchDailyPlan.ts: 42 átomos → slots-research desde 15-jun (1er slot = mar 16-jun)
 *  - dermaDailyPlan.ts   : 70 átomos → slots-derma desde 15-jun (1er slot = lun 15-jun)
 *  - businessStudyPlan.ts: RECONSTRUIDO → 84 días de trabajo en lun-sáb desde 15-jun,
 *                          DESCANSO total en cada domingo (contenido secuencial intacto)
 * Synapse: se regenera con su propio generador (gen_synapse_plan.js, +1 semana → 18-jun).
 * ENCAPS: vive en Supabase, reconstrucción aparte (exámenes solo sábados, fin 15-20 ago).
 * Uso: node DATA/_scripts/remap_inicio_15jun.js
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

/** n fechas consecutivas desde startISO saltando TODOS los domingos. */
function calNoSun(startISO, n) {
  const out = [];
  let cur = startISO;
  while (out.length < n) {
    if (!isSun(cur)) out.push(cur);
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
/** n slots del tipo dado (research|derma) desde startISO (días hábiles alternados). */
function slots(tipo, startISO, n) {
  const out = [];
  let cur = startISO;
  while (out.length < n) {
    if (tipoDia(cur) === tipo) out.push(cur);
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
    throw new Error(file + ': no encontrado →\n' + from.slice(0, 160));
  }
  s = s.replace(from, to);
  fs.writeFileSync(p, s, 'utf8');
  return true;
}
function countFechas(file, arrayMarker) {
  const s = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const i = s.indexOf(arrayMarker);
  const j = s.indexOf('];', i);
  return [...s.slice(i, j).matchAll(/fecha:\s*["'](2026-\d\d-\d\d)["']/g)].map((m) => m[1]);
}

// ════════ 1) USMLE daily (72 días → lun 15-jun, sin domingos) ════════
{
  const f = 'src/lib/usmleStep1Daily.ts';
  const old = countFechas(f, 'export const DIAS');
  if (old.length !== 72) throw new Error('USMLE: esperaba 72, hay ' + old.length);
  const nd = calNoSun('2026-06-15', 72);
  replaceFechas(f, 'export const DIAS', nd);
  patch(f, "step: 1, inicio: '2026-06-11', fin: '2026-08-23', totalDias: 72, // v2: D1=11-jun · 14/21-jun libres · 70 temas + 2 colchón",
    `step: 1, inicio: '2026-06-15', fin: '${nd[71]}', totalDias: 72, // v3 (13-jun): D1=lun 15-jun · TODOS los domingos libres · 70 temas + 2 colchón`);
  console.log('USMLE daily ✓  d1=' + nd[0] + ' d72=' + nd[71]);
}

// ════════ 2) MIR daily (78 días → lun 15-jun, sin domingos) ════════
{
  const f = 'src/lib/mirDailyPlan.ts';
  const old = countFechas(f, 'export const MIR_DIAS');
  if (old.length !== 78) throw new Error('MIR: esperaba 78, hay ' + old.length);
  const nd = calNoSun('2026-06-15', 78);
  replaceFechas(f, 'export const MIR_DIAS', nd);
  patch(f, "inicio: '2026-06-11', fin: '2026-08-29', totalDias: 78, // v2: D1=11-jun · 14/21-jun libres · 76 temas + 2 colchón",
    `inicio: '2026-06-15', fin: '${nd[77]}', totalDias: 78, // v3 (13-jun): D1=lun 15-jun · TODOS los domingos libres · 76 temas + 2 colchón`);
  console.log('MIR daily ✓  d1=' + nd[0] + ' d78=' + nd[77]);
}

// ════════ 3) USMLE plan (5 fechas UNIDADES muestra) ════════
{
  const f = 'src/lib/usmleStep1Plan.ts';
  const old = countFechas(f, 'export const UNIDADES');
  if (old.length !== 5) throw new Error('UNIDADES: esperaba 5, hay ' + old.length);
  replaceFechas(f, 'export const UNIDADES', calNoSun('2026-06-15', 5));
  patch(f, "inicio: '2026-06-11', // v2: 14/21-jun libres", "inicio: '2026-06-15', // v3 (13-jun): D1=lun 15-jun · todos los domingos libres");
  console.log('USMLE UNIDADES ✓ ' + calNoSun('2026-06-15', 5).join(','));
}

// ════════ 4) Research (42 átomos → slots-research desde 15-jun) ════════
{
  const f = 'src/lib/researchDailyPlan.ts';
  const old = countFechas(f, 'export const DIAS');
  if (old.length !== 42) throw new Error('RESEARCH: esperaba 42, hay ' + old.length);
  const nd = slots('research', '2026-06-15', 42);
  replaceFechas(f, 'export const DIAS', nd);
  patch(f, "inicio: '2026-06-12', fin: '2026-10-06', totalDias: 42, // v2: D1=vie 12-jun (el 10-jun no se estudió; Derma conserva 11-jun) · +2 colchón",
    `inicio: '${nd[0]}', fin: '${nd[41]}', totalDias: 42, // v3 (13-jun): D1=${wdOf(nd[0])} ${nd[0]} (1er slot-research ≥15-jun) · alterna con Derma · +2 colchón`);
  console.log('Research ✓  d1=' + nd[0] + ' d42=' + nd[41]);
}

// ════════ 5) Derma (70 átomos → slots-derma desde 15-jun) ════════
{
  const f = 'src/lib/dermaDailyPlan.ts';
  const old = countFechas(f, 'DERMA_DIAS: DiaDerma[] = [');
  if (old.length !== 70) throw new Error('DERMA: esperaba 70, hay ' + old.length);
  const nd = slots('derma', '2026-06-15', 70);
  replaceFechas(f, 'DERMA_DIAS: DiaDerma[] = [', nd);
  patch(f, "inicio: '2026-06-11', fin: '2026-12-22', totalDias: 70, // v2: 68 átomos + 2 colchón (14/21-jun ya eran descanso)",
    `inicio: '${nd[0]}', fin: '${nd[69]}', totalDias: 70, // v3 (13-jun): D1=${wdOf(nd[0])} ${nd[0]} (1er slot-derma ≥15-jun) · alterna con Research · 68 átomos + 2 colchón`);
  console.log('Derma ✓  d1=' + nd[0] + ' d70=' + nd[69]);
}

// ════════ 6) Business (RECONSTRUIDO: 84 días de trabajo lun-sáb desde 15-jun, domingos LIBRES) ════════
{
  const f = 'src/lib/businessStudyPlan.ts';
  const p = path.join(ROOT, f);
  let s = fs.readFileSync(p, 'utf8');
  const marker = 'export const BIZ_DIAS: DiaBiz[] = [';
  const i = s.indexOf(marker);
  if (i < 0) throw new Error('BIZ: marcador no encontrado');
  const bodyStart = i + marker.length;
  const j = s.indexOf('];', bodyStart);
  const body = s.slice(bodyStart, j); // "{...},{...},...,{...}"
  // Partir en entradas (objetos planos, sin llaves anidadas → "},{" es separador seguro).
  const parts = body.split('},{');
  const entries = parts.map((pp, idx) => {
    let e = pp;
    if (idx > 0) e = '{' + e;
    if (idx < parts.length - 1) e = e + '}';
    return e.trim();
  });
  if (entries.length !== 98) throw new Error('BIZ: esperaba 98 entradas, hay ' + entries.length);
  // WORK = todo lo que NO es materia DESCANSO (los descansos dominicales se re-generan).
  const work = entries.filter((e) => !/materia:"DESCANSO"/.test(e));
  if (work.length !== 84) throw new Error('BIZ: esperaba 84 días de trabajo, hay ' + work.length);
  // Re-laydown: caminar el calendario desde lun 15-jun; domingo→DESCANSO, resto→siguiente WORK.
  const out = [];
  let cur = '2026-06-15';
  let wi = 0;
  let d = 1;
  while (wi < work.length) {
    if (isSun(cur)) {
      out.push(`{d:${d},fecha:"${cur}",wd:"Dom",materia:"DESCANSO",lectura:"DÍA LIBRE TOTAL (domingo). Sin actividad — descanso real; el sueño/descanso consolida lo estudiado (Walker). Las notas se re-leen el lunes en 10 min.",accion:"",min:0,libroN:null,yt:null}`);
    } else {
      const e = work[wi++].replace(/^\{d:\d+,fecha:"[^"]*",wd:"[^"]*",/, `{d:${d},fecha:"${cur}",wd:"${wdOf(cur)}",`);
      out.push(e);
    }
    d++;
    cur = addDays(cur, 1);
  }
  const total = out.length;
  const fin = out[out.length - 1].match(/fecha:"([^"]*)"/)[1];
  s = s.slice(0, bodyStart) + out.join(',') + s.slice(j);
  s = s.replace(
    "inicio: '2026-06-11', fin: '2026-09-16', totalDias: 98, // v2: corrido +14d (jue→jue, ritmo semanal intacto) · 14/21-jun libres · +2 colchón",
    `inicio: '2026-06-15', fin: '${fin}', totalDias: ${total}, // v3 (13-jun): reconstruido lun 15-jun · TODOS los domingos LIBRES · 84 días de trabajo (contenido intacto) + descansos dominicales`);
  s = s.replace(
    ' * businessStudyPlan.ts — Plan DÍA A DÍA "Estudio Pulso" (98 días · 11-jun → 16-sep-2026, v2 corrido +14d; dom 14/21-jun = días libres totales).',
    ` * businessStudyPlan.ts — Plan DÍA A DÍA "Estudio Pulso" (${total} días · 15-jun → ${fin}-2026, v3 13-jun; reconstruido a lun 15-jun, todos los domingos libres).`);
  fs.writeFileSync(p, s, 'utf8');
  console.log('Business ✓  reconstruido d1=2026-06-15 dN=' + fin + ' total=' + total + ' (84 trabajo + ' + (total - 84) + ' domingos)');
}

console.log('\nTODO OK — remapeo 15-jun completo (6 planes en archivo; Synapse aparte vía su generador).');
