#!/usr/bin/env node
/**
 * gen_research_calendar.js — OVERLAYS de los hitos de Research en Google Calendar (Palmerton v3b · gap 7 · 12-sep-2026).
 *
 * RUTA_PUBLICACION_2027.md §9 dice que cada fecha de envío/decisión fijada lleva overlay naranja "como los hitos NBME",
 * pero hasta el 12-sep-2026 no existía ninguno. Este script LEE (no edita) src/lib/researchDailyPlan.ts (RESEARCH_HITOS +
 * DIAS) y src/lib/researchDailyPlan2027.ts (átomos del ciclo 2) y EMITE el JSON de los eventos que deben existir:
 * título '🔬 RESEARCH · <code> <entregable>' · 13:30-14:15 America/Lima · colorId 6 (naranja) · availability FREE/transparent
 * · descripción = objetivo + entregable + artefacto + avisos + fecha límite externa (RUTA §9.1) si la hay.
 *
 * Los ids de los eventos ya creados viven en DATA/RESEARCH/_calendar_overlays.json junto con un HASH del contenido con el
 * que se creó/actualizó cada uno. Cuando el pipeline de corrimiento re-feche los átomos (gen_research_plan.js <D1>), o
 * cambie el texto de un átomo-hito, volver a correr esto: los hitos cuyo (fecha, título, descripción) ya no coincide
 * salen `accion: 'recrear'` (update_event del id con el payload nuevo — o delete_event + create_event: son eventos
 * sueltos, sin recurrenceData, así que ambas vías son seguras), los nuevos `accion: 'crear'`, los iguales `accion: 'nada'`.
 *
 * USO:
 *   node DATA/_scripts/gen_research_calendar.js              # plan de acciones + actualiza los payloads en _calendar_overlays.json
 *   node DATA/_scripts/gen_research_calendar.js --print      # solo imprime el JSON de los 12 eventos (no escribe nada)
 *   node DATA/_scripts/gen_research_calendar.js --check      # sale con 1 si algún overlay está desfasado respecto al plan
 *   node DATA/_scripts/gen_research_calendar.js --set <hito>=<eventId> [...]        # registra el id creado/actualizado con el
 *                                                                                     # payload ACTUAL (fecha + hash) · se llama
 *                                                                                     # justo después de create/update_event
 *   node DATA/_scripts/gen_research_calendar.js --set <hito>=<eventId>@<YYYY-MM-DD>  # idem, forzando la fecha con la que se creó
 *                                                                                     # (si el plan cambió entre create y --set)
 *
 * No toca el Calendar por sí mismo (no hay API key en el repo): quien crea/actualiza/borra es el MCP de Google Calendar
 * desde Claude Code, con availability FREE y verificando con get_event. NO edita ningún .ts ni el plan.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..', '..');
const TS1 = path.join(ROOT, 'src', 'lib', 'researchDailyPlan.ts');
const TS2 = path.join(ROOT, 'src', 'lib', 'researchDailyPlan2027.ts');
const OUT = path.join(ROOT, 'DATA', 'RESEARCH', '_calendar_overlays.json');
const CAL = 'josephsototocas@gmail.com';
const TZ = 'America/Lima';
const OFFSET = '-05:00';           // Lima no tiene horario de verano
const HORA = ['13:30:00', '14:15:00'];
const COLOR_ID = '6';              // naranja (mismo que los overlays NBME)

const argv = process.argv.slice(2);
const PRINT = argv.includes('--print');
const CHECK = argv.includes('--check');
const SETS = argv.includes('--set') ? argv.slice(argv.indexOf('--set') + 1).filter((a) => /^[\w-]+=\S+$/.test(a)) : [];

// ─── Etiqueta corta por hito (el `entregable` del átomo es demasiado largo para un título de Calendar) ───
const LABEL = {
  'mentor': 'Senior author local (Dr. Ciro) confirmado',
  'carta-diana': 'Artículo DIANA + deadline de la carta #1',
  'carta-1': 'SUBMIT carta al editor #1',
  'tesis-etica': 'Ética/CEI de la tesis L0 archivada',
  'cr-caso': 'Caso + senior author del case report #1',
  'tesis-L0': 'SUBMIT research letter tesis L0',
  'revisor2': 'Revisor humano #2 de SR-1 nombrado',
  'cr-paquete': 'Paquete del case report #1 CONGELADO',
  'case-report-1': 'SUBMIT case report #1',
  'equipo': 'Equipo de revisión SR-1 confirmado',
  'PROSPERO-SR1': 'REGISTRO PROSPERO de SR-1',
  'SR-1': 'SUBMIT SR-1 (Dermatologic Surgery)',
};
// ─── Fecha límite EXTERNA por hito (tal como consta en RUTA_PUBLICACION_2027.md §9 / §9.1 · v5.10) ───
const DEADLINE = {
  'carta-diana': 'ventana de letters del journal diana (típ. 4-12 semanas tras la publicación · se fija en C-2)',
  'carta-1': '≤ 15-oct-2026 (límite interno de la carta; RUTA §9.1 marca −1 día: enviar ANTES del bloque si se puede)',
  'tesis-etica': 'oct-2026 (solicitud CEI expedita ≤ 30-sep según gap 1 de Palmerton v3b · sin nº de CEI NO se envía T-8)',
  'cr-caso': '31-oct-2026 (caso + consentimiento + senior author · si el jue 22-oct (C-3, 3 semanas desde M1) no hay caso → plan B, colega SPD · ⚠ v5.16: CR-1 cae el jue 5-nov y CR-2 el lun 9-nov, ya después del 31-oct)',
  'tesis-L0': '≤ 15-feb-2027 (JAAD International → IJD → Actas → Anais)',
  'revisor2': 'antes de PROSPERO (sin revisor #2 humano no hay registro · PRISMA 2020 ítem 8)',
  'cr-paquete': 'antes del submit CR-9 (vie 5-feb-2027 = D92 del Step 1, primer día-Research tras la pausa): paquete congelado ANTES de la pausa Research por el Step 1 (jue 7-ene → mié 3-feb-2027; Fases B-C vie 22-ene → mié 10-feb; examen jue 11-feb)',
  'case-report-1': '≤ 28-feb-2027 (Dermatology Online Journal → JAAD CR → Case Reports in Dermatology)',
  'equipo': 'antes del registro R10 (mar 9-mar-2027)',
  'PROSPERO-SR1': '≤ 31-mar-2027',
  'SR-1': '≤ 31-ago-2027 (Dermatologic Surgery → JAAD → JCD → Anais/Actas)',
};

// ─── Parseo de los .ts GENERADOS (mismo enfoque por regex que remap_inicio.js; nunca se ejecuta TS) ───
function leer(p) { return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : ''; }
function parseHitos(src) {
  const m = src.match(/export const RESEARCH_HITOS[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (!m) throw new Error('RESEARCH_HITOS no encontrado en researchDailyPlan.ts');
  const out = {};
  const re = /'([^']+)':\s*\{\s*code:\s*'([^']+)',\s*fecha:\s*'(\d{4}-\d{2}-\d{2})',\s*ciclo:\s*(\d),\s*d:\s*(\d+)\s*\}/g;
  let x;
  while ((x = re.exec(m[1]))) out[x[1]] = { code: x[2], fecha: x[3], ciclo: Number(x[4]), d: Number(x[5]) };
  return out;
}
function parseDias(src) {
  const out = [];
  const re = /^\s*\{\s*d:\s*(\d+),\s*fecha:\s*'(\d{4}-\d{2}-\d{2})',\s*ciclo:\s*(\d),(.*)\},?\s*$/gm;
  let x;
  while ((x = re.exec(src))) {
    const rest = x[4];
    const f = {};
    const rf = /\b(fase|pista|code|prioridad|objetivo|entregable|artefacto|tool):\s*'((?:[^'\\]|\\.)*)'/g;
    let y;
    while ((y = rf.exec(rest))) f[y[1]] = y[2].replace(/\\'/g, "'").replace(/\\\\/g, '\\');
    const chips = rest.match(/chips:\s*\[([^\]]*)\]/);
    f.chips = chips ? Array.from(chips[1].matchAll(/'((?:[^'\\]|\\.)*)'/g)).map((c) => c[1].replace(/\\'/g, "'")) : [];
    out.push({ d: Number(x[1]), fecha: x[2], ciclo: Number(x[3]), ...f });
  }
  return out;
}

const src1 = leer(TS1);
if (!src1) throw new Error('falta ' + TS1);
const HITOS = parseHitos(src1);
const DIAS = [...parseDias(src1), ...parseDias(leer(TS2))];
const porCodigo = (ciclo, code, fecha) => DIAS.find((x) => x.ciclo === ciclo && x.code === code && x.fecha === fecha)
  || DIAS.find((x) => x.code === code && x.fecha === fecha) || DIAS.find((x) => x.code === code);

function payload(hito, h) {
  const atomo = porCodigo(h.ciclo, h.code, h.fecha) || {};
  const label = LABEL[hito] || String(atomo.entregable || hito).slice(0, 60);
  const lineas = [
    `HITO RESEARCH · ${h.code} · d${h.d} del ciclo ${h.ciclo} · bloque 13:30-14:15 (día-Research; alterna con Derma)`,
    '',
    `OBJETIVO: ${atomo.objetivo || '(ver researchDailyPlan.ts)'}`,
    `ENTREGABLE: ${atomo.entregable || '—'}`,
    `ARTEFACTO: ${atomo.artefacto || '—'}`,
  ];
  if (atomo.chips && atomo.chips.length) lineas.push(`AVISOS: ${atomo.chips.join(' · ')}`);
  if (DEADLINE[hito]) lineas.push(`FECHA LÍMITE EXTERNA: ${DEADLINE[hito]}`);
  lineas.push('', 'Overlay informativo (FREE, no bloquea): la fecha la fija el plan día-a-día (gen_research_plan.js) y se',
    'regenera con DATA/_scripts/gen_research_calendar.js tras cada corrimiento. Estado del entregable: app → Research → Panel',
    '→ Mesa editorial (Supabase research_entregables). Fuente: DATA/RESEARCH/RUTA_PUBLICACION_2027.md §9.');
  const ev = {
    hito, code: h.code, d: h.d, ciclo: h.ciclo, fecha: h.fecha,
    calendarId: CAL,
    summary: `🔬 RESEARCH · ${h.code} ${label}`,
    startTime: `${h.fecha}T${HORA[0]}${OFFSET}`,
    endTime: `${h.fecha}T${HORA[1]}${OFFSET}`,
    timeZone: TZ,
    colorId: COLOR_ID,
    availability: 'AVAILABILITY_FREE',   // = transparency 'transparent' (no bloquea el bloque)
    description: lineas.join('\n'),
  };
  ev.hash = hashDe(ev);
  return ev;
}
function hashDe(ev) { return crypto.createHash('sha1').update([ev.summary, ev.startTime, ev.endTime, ev.description].join('\u0001')).digest('hex').slice(0, 12); }

// ─── Estado previo (ids ya creados) ───
let prev = { _meta: {}, overlays: {} };
try { if (fs.existsSync(OUT)) prev = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch { /* fichero corrupto → se regenera */ }
prev.overlays = prev.overlays || {};

const eventos = Object.entries(HITOS).sort((a, b) => a[1].fecha.localeCompare(b[1].fecha)).map(([hito, h]) => payload(hito, h));
const porHito = Object.fromEntries(eventos.map((e) => [e.hito, e]));

if (SETS.length) {
  for (const s of SETS) {
    const [hito, resto] = s.split('=');
    const [id, fechaForzada] = resto.split('@');
    if (!HITOS[hito]) { console.error(`⚠ hito desconocido: ${hito} (hitos: ${Object.keys(HITOS).join(', ')})`); continue; }
    const ev = porHito[hito];
    const fechaCreada = fechaForzada || ev.fecha;
    // Si se fuerza una fecha distinta a la del plan, el hash NO puede ser el actual (el evento vive en otra fecha).
    const hash = fechaForzada && fechaForzada !== ev.fecha ? `fecha:${fechaForzada}` : ev.hash;
    prev.overlays[hito] = { ...(prev.overlays[hito] || {}), eventId: id, fechaCreada, summary: ev.summary, hash, registrado: new Date().toISOString().slice(0, 10) };
  }
}

// ─── Plan de acciones ───
const plan = eventos.map((ev) => {
  const p = prev.overlays[ev.hito] || {};
  const accion = !p.eventId ? 'crear' : (p.fechaCreada !== ev.fecha || p.hash !== ev.hash ? 'recrear' : 'nada');
  return { ...ev, eventId: p.eventId || null, fechaCreada: p.fechaCreada || null, hashCreado: p.hash || null, accion };
});

if (PRINT) { console.log(JSON.stringify(eventos, null, 1)); process.exit(0); }

const desfasados = plan.filter((p) => p.accion !== 'nada');
console.log(`Hitos Research en el plan: ${plan.length} · overlays con id: ${plan.filter((p) => p.eventId).length} · a crear: ${plan.filter((p) => p.accion === 'crear').length} · a recrear (fecha/título/descripción cambió): ${plan.filter((p) => p.accion === 'recrear').length}`);
for (const p of plan) {
  const motivo = p.accion === 'recrear' ? (p.fechaCreada !== p.fecha ? `  (creado para ${p.fechaCreada})` : '  (cambió el texto del átomo)') : '';
  console.log(`  ${p.accion === 'nada' ? '·' : '→'} ${p.accion.padEnd(7)} ${p.fecha} ${p.summary}${p.eventId ? `  [${p.eventId}]` : ''}${motivo}`);
}

if (CHECK) process.exit(desfasados.length ? 1 : 0);

const salida = {
  _meta: {
    origen: 'DATA/_scripts/gen_research_calendar.js (lee src/lib/researchDailyPlan.ts + researchDailyPlan2027.ts)',
    calendario: CAL, timeZone: TZ, bloque: '13:30-14:15', colorId: COLOR_ID, availability: 'FREE/transparent',
    regla: 'tras cada corrimiento: node gen_research_plan.js <D1> → node gen_research_calendar.js → update_event (o delete+create) de los `recrear` con su payload → --set hito=eventId',
    actualizado: new Date().toISOString().slice(0, 10),
    nHitos: plan.length,
  },
  overlays: {},
};
for (const p of plan) {
  salida.overlays[p.hito] = {
    eventId: p.eventId, fechaCreada: p.fechaCreada, hash: p.hashCreado, summary: prev.overlays[p.hito]?.summary || null,
    registrado: prev.overlays[p.hito]?.registrado || null,
    accionPendiente: p.accion === 'nada' ? null : p.accion,
    payload: { code: p.code, d: p.d, ciclo: p.ciclo, fecha: p.fecha, summary: p.summary, startTime: p.startTime, endTime: p.endTime, timeZone: p.timeZone, colorId: p.colorId, availability: p.availability, description: p.description, hash: p.hash },
  };
}
fs.writeFileSync(OUT, JSON.stringify(salida, null, 1) + '\n', 'utf8');
console.log(`✓ ${path.relative(ROOT, OUT)} actualizado (${plan.length} hitos · ${desfasados.length} con acción pendiente)`);
