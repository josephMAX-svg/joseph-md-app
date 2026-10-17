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
 *
 * v6.00 (6-oct-2026 · V6_ESPEC §E/§G3): en F4 (fecha ≥ serums.inicio de DATA/_scripts/_fechas_v6.json, lun 3-may-2027 [S]) el overlay es
 * de TODO EL DÍA (allDay: true · startTime/endTime a medianoche): Research va 30' en tiempo muerto de la posta y la hora la pone el
 * turno. Textos de DEADLINE sin el Step 1 de febrero (cr-paquete, equipo). Re-fechados por v6: X-9 lun 15-mar → jue 11-mar · R43 jue
 * 29-jul → sáb 17-jul (todo el día).
 * v6.01 (10-oct-2026 · corrimiento D1 = lun 12-oct): Research corre 1 ranura → los 12 overlays cambian de fecha salvo CR-9 (jue 11-feb, cambia
 * su texto: d34): M1 vie 16-oct · C-2 lun 26-oct · T-1 mié 28-oct · C-6 vie 13-nov · CR-1 jue 19-nov · T-8 lun 21-dic · X-1 mar 29-dic · CR-8
 * mar 12-ene · X-9 mié 17-mar · R10 mar 23-mar · R43 mar 20-jul (todo el día, F4). Solo --print/--check en este lote: el Calendar lo toca el
 * orquestador (update_event / delete+create y luego --set hito=eventId).
 * v6.01b (10-oct-2026 · cierre): los DEADLINE de carta-1 (C-6), tesis-etica (T-1) y equipo (X-9) pasan a ser funciones que leen las fechas
 * de RESEARCH_HITOS: X-9 citaba el R10 de v6.00 (vie 19-mar → mar 23-mar) y C-6/T-1 presentaban como vigente un límite interno ya VENCIDO
 * (≤ 15-oct / ≤ 30-sep) que contradecía su propio átomo; ahora lo marcan ⏸ VENCIDO con los días de retraso calculados. Overlays actualizados
 * con update_event (solo descripción) + --set (CAL_V6.md §10).
 * v6.02 (17-oct-2026 · corrimiento D1 = lun 19-oct): Research corre 3 ranuras → M1 lun 26-oct · C-2 mar 3-nov · T-1 jue 5-nov · C-6 lun 23-nov
 * · CR-1 mié 25-nov · T-8 mié 23-dic · CR-8 mar 12-ene (=) · CR-9 jue 11-feb (=) · X-1 mar 23-feb · X-9 lun 29-mar · R10 vie 2-abr · R43 mar 27-jul
 * (CAL_V6.md §11).
 * v6.02b (17-oct-2026 · FX-CAL): cr-caso (CR-1) pasa a función: el disparador C-3 (d10, vie 13-nov), M1 y las fechas de CR-1/CR-2 salen del plan;
 * lo de v6.01 queda como historial ⏸ · equipo (X-9) añade al historial «v6.01: X-9 mié 17-mar / R10 mar 23-mar» · PROSPERO-SR1 (R10) deja de
 * decir «FECHA LÍMITE EXTERNA: ≤ 31-mar-2027», que era falso: PROSPERO no tiene plazo externo (solo exige registrar antes del cribado) y el
 * ≤ 31-mar-2027 es el objetivo propio de RUTA_PUBLICACION_2027.md → línea «OBJETIVO RUTA …» (mapa OBJETIVO_RUTA). Al próximo corrimiento: lo
 * etiquetado «v6.02» en estos textos pasa a historial ⏸.
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
// v6.00: inicio del SERUMS (F4) desde la fuente única de fechas → overlays de todo el día desde esa fecha
const SERUMS_INICIO = require('./gen_fechas_v6').cargarFechasV6().serums.inicio;
const sigDia = (f) => { const d = new Date(f + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + 1); return d.toISOString().slice(0, 10); };

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
// ─── Fechas legibles para los textos de DEADLINE que dependen del plan (v6.01b: ya no se escriben a mano → no se pudren en cada corrimiento) ───
const DOW_ES = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MES_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fmtF = (f) => { const d = new Date(f + 'T12:00:00Z'); return `${DOW_ES[d.getUTCDay()]} ${d.getUTCDate()}-${MES_ES[d.getUTCMonth()]}-${d.getUTCFullYear()}`; };
const diasEntre = (a, b) => Math.round((new Date(b + 'T12:00:00Z') - new Date(a + 'T12:00:00Z')) / 864e5);
const fmtC = (f) => { const d = new Date(f + 'T12:00:00Z'); return `${DOW_ES[d.getUTCDay()]} ${d.getUTCDate()}-${MES_ES[d.getUTCMonth()]}`; }; // v6.02b: sin año
// v6.02b: átomo del plan por (ciclo, código); el código puede llevar sufijo de parte («R18 (1/3)») → se compara el prefijo. Lee DIAS en tiempo de llamada.
const atomoDe = (ciclo, code) => {
  const a = DIAS.find((x) => x.ciclo === ciclo && (x.code === code || String(x.code || '').startsWith(code + ' ')));
  if (!a) throw new Error(`átomo ${code} (ciclo ${ciclo}) no encontrado en el plan`);
  return a;
};

// ─── Fecha límite EXTERNA por hito (tal como consta en RUTA_PUBLICACION_2027.md §9 / §9.1 · v5.10) ───
// Un valor función recibe HITOS (fechas del plan) y devuelve el texto: así la fecha que cita sale del .ts, no de un literal.
// v6.01b (10-oct-2026): carta-1 y tesis-etica dejaban como límite vigente un ≤ interno ya VENCIDO (15-oct / 30-sep) que contradecía su propio
// átomo (C-6 vie 13-nov / T-1 mié 28-oct); equipo citaba el R10 de v6.00 (vie 19-mar) → los tres derivan ahora sus fechas del plan.
const DEADLINE = {
  'carta-diana': 'ventana de letters del journal diana (típ. 4-12 semanas tras la publicación · se fija en C-2)',
  'carta-1': (H) => `la ventana de letters del artículo diana que se fija en C-2 (${fmtF(H['carta-diana'].fecha)}): el SUBMIT de C-6 (${fmtF(H['carta-1'].fecha)}) va ANTES de ese deadline · ⏸ límite interno ≤ 15-oct-2026 (RUTA §9.1) VENCIDO: C-6 cae ${diasEntre('2026-10-15', H['carta-1'].fecha)} días después → hacer C-1…C-5 fuera del átomo o elegir en C-2 una diana con ventana más larga`,
  'tesis-etica': (H) => `oct-2026 (solicitud CEI expedita PRESENTADA a más tardar en T-1, ${fmtF(H['tesis-etica'].fecha)} · sin nº de CEI NO se envía T-8, ${fmtF(H['tesis-L0'].fecha)} · ⏸ límite interno ≤ 30-sep según gap 1 de Palmerton v3b VENCIDO: T-1 cae ${diasEntre('2026-09-30', H['tesis-etica'].fecha)} días después)`,
  // v6.02b: el disparador (C-3), M1 y CR-1/CR-2 salen del plan (antes era un literal con las fechas de v6.01 como vigentes).
  'cr-caso': (H) => {
    const c3 = atomoDe(1, 'C-3'); const cr2 = atomoDe(1, 'CR-2'); const cr1 = H['cr-caso'].fecha;
    return `31-oct-2026 (caso + consentimiento + senior author · si el ${fmtC(c3.fecha)} (C-3 = d${c3.d} en v6.02, ~3 semanas desde M1 ${fmtC(H['mentor'].fecha)}; ⏸ v6.01: jue 5-nov / M1 vie 16-oct · v6.00 = v5.20: mar 3-nov, M1 mié 14-oct; antes vie 30-oct) no hay caso → plan B, colega SPD · ⚠ v6.02: CR-1 cae el ${fmtC(cr1)} y CR-2 el ${fmtC(cr2.fecha)}, ya después del 31-oct (+${diasEntre('2026-10-31', cr1)} / +${diasEntre('2026-10-31', cr2.fecha)} días) · ⏸ v6.01: CR-1 jue 19-nov / CR-2 lun 23-nov, ya después del 31-oct · v6.00 = v5.20: mar 17-nov / jue 19-nov · v5.18-v5.19: vie 13-nov / mar 17-nov)`;
  },
  'tesis-L0': '≤ 15-feb-2027 (JAAD International → IJD → Actas → Anais)',
  'revisor2': 'antes de PROSPERO (sin revisor #2 humano no hay registro · PRISMA 2020 ítem 8)',
  'cr-paquete': 'antes del submit CR-9 (jue 11-feb-2027, primer día-Research tras la pausa): paquete congelado ANTES de la pausa de átomos (vie 15-ene → mié 10-feb-2027 = núcleo de la intensiva ENCAPS; v6.00: el Step 1 está en pausa del 31-dic al 15-mar · v5.20: la pausa era por las Fases B-C del Step 1)',
  'case-report-1': '≤ 28-feb-2027 (Dermatology Online Journal → JAAD CR → Case Reports in Dermatology)',
  'equipo': (H) => `antes del registro R10 (${fmtF(H['PROSPERO-SR1'].fecha)}; X-9 = ${fmtF(H['equipo'].fecha)} → ${diasEntre(H['equipo'].fecha, H['PROSPERO-SR1'].fecha)} días de margen · ⏸ v6.01: X-9 mié 17-mar / R10 mar 23-mar · v6.00: X-9 jue 11-mar / R10 vie 19-mar · v5.20: X-9 lun 15-mar / R10 vie 19-mar)`,
  // v6.02b: 'PROSPERO-SR1' sale de aquí → OBJETIVO_RUTA (no hay fecha límite externa).
  'SR-1': '≤ 31-ago-2027 (Dermatologic Surgery → JAAD → JCD → Anais/Actas)',
};

// ─── v6.02b: OBJETIVO PROPIO de la RUTA (no es un plazo externo) ───
// PROSPERO no tiene fecha límite externa: solo exige registrar ANTES de empezar el cribado. El «≤ 31-mar-2027» es el objetivo de
// RUTA_PUBLICACION_2027.md (tabla de entregables) → la línea se rotula «OBJETIVO RUTA», nunca «FECHA LÍMITE EXTERNA».
const OBJETIVO_RUTA = {
  'PROSPERO-SR1': (H) => {
    const f = H['PROSPERO-SR1'].fecha; const dd = diasEntre('2027-03-31', f); const cribado = atomoDe(2, 'R18');
    const estado = dd > 0 ? `v6.02: el átomo cae ${fmtC(f)} (+${dd} d; decisión (iii) de Joseph en PENDIENTES)` : `R10 = ${fmtC(f)}, dentro del objetivo`;
    return `OBJETIVO RUTA ≤ 31-mar-2027 · ${estado} · no es plazo externo: PROSPERO solo exige registrar ANTES del cribado (R18, ${fmtF(cribado.fecha)})`;
  },
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
  const f4 = h.fecha >= SERUMS_INICIO; // v6.00: F4 (SERUMS) → overlay de todo el día
  const lineas = [
    f4 ? `HITO RESEARCH · ${h.code} · d${h.d} del ciclo ${h.ciclo} · F4 (SERUMS): 30' en tiempo muerto de la posta — la hora la pone el turno del día (día-Research: mar · jue · sáb)`
      : `HITO RESEARCH · ${h.code} · d${h.d} del ciclo ${h.ciclo} · bloque 13:30-14:15 (día-Research; alterna con Derma)`,
    '',
    `OBJETIVO: ${atomo.objetivo || '(ver researchDailyPlan.ts)'}`,
    `ENTREGABLE: ${atomo.entregable || '—'}`,
    `ARTEFACTO: ${atomo.artefacto || '—'}`,
  ];
  if (atomo.chips && atomo.chips.length) lineas.push(`AVISOS: ${atomo.chips.join(' · ')}`);
  if (DEADLINE[hito]) lineas.push(`FECHA LÍMITE EXTERNA: ${typeof DEADLINE[hito] === 'function' ? DEADLINE[hito](HITOS) : DEADLINE[hito]}`);
  if (OBJETIVO_RUTA[hito]) lineas.push(OBJETIVO_RUTA[hito](HITOS)); // v6.02b
  lineas.push('', 'Overlay informativo (FREE, no bloquea): la fecha la fija el plan día-a-día (gen_research_plan.js) y se',
    'regenera con DATA/_scripts/gen_research_calendar.js tras cada corrimiento. Estado del entregable: app → Research → Panel',
    '→ Mesa editorial (Supabase research_entregables). Fuente: DATA/RESEARCH/RUTA_PUBLICACION_2027.md §9.');
  const ev = {
    hito, code: h.code, d: h.d, ciclo: h.ciclo, fecha: h.fecha,
    calendarId: CAL,
    summary: `🔬 RESEARCH · ${h.code} ${label}`,
    ...(f4 ? { allDay: true } : {}),
    startTime: f4 ? `${h.fecha}T00:00:00${OFFSET}` : `${h.fecha}T${HORA[0]}${OFFSET}`,
    endTime: f4 ? `${sigDia(h.fecha)}T00:00:00${OFFSET}` : `${h.fecha}T${HORA[1]}${OFFSET}`,
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
    payload: { code: p.code, d: p.d, ciclo: p.ciclo, fecha: p.fecha, summary: p.summary, ...(p.allDay ? { allDay: true } : {}), startTime: p.startTime, endTime: p.endTime, timeZone: p.timeZone, colorId: p.colorId, availability: p.availability, description: p.description, hash: p.hash },
  };
}
fs.writeFileSync(OUT, JSON.stringify(salida, null, 1) + '\n', 'utf8');
console.log(`✓ ${path.relative(ROOT, OUT)} actualizado (${plan.length} hitos · ${desfasados.length} con acción pendiente)`);
