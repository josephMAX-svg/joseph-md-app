/**
 * gen_encaps_intensivo_2027.js — siembra la FASE INTENSIVA ENCAPS 2027-I (feb → D-1 del examen) en Supabase.
 *
 * Contexto (régimen v5.6, PRONOSTICO_WALKFORWARD_2027-1_v3.md §6 Fase B + FASE_INTENSIVA_2027-I.md):
 *   · Sep-2026 → 29-ene-2027: MANTENIMIENTO 1h/día (gen_encaps_mantenimiento_2027.js, 102 días, dia 1-102).
 *   · Feb-2027 → D-1: INTENSIVA — ENCAPS vuelve a bloque principal (el USMLE Step 1 se rinde el 25-29 ene).
 *     Se siembra con modo='INTENSIVO' y dia = 103… (continúa la cuenta L-V desde la base del mantenimiento,
 *     así el cálculo de "día de hoy" de la app no cambia; la app necesita STUDY_TOTAL_DAYS = 102 + N y una
 *     rama modo==='INTENSIVO' en itemsForDay — pendiente en src/lib/encapsPlan.ts).
 *
 * Esqueleto:
 *   · Semana 1: lun = re-scan de señales (QX Tendencias, DGE, RM/NTS sep-2026→, convocatoria) + mar-jue loop de
 *     calentamiento (I-3, V-2, II-3, sin material nuevo) + VIERNES 5-feb = PRE-TEST 2026-II (PRETEST_2026-II.md).
 *   · Semanas 2-5 (16 slots lun-jue): barrido de los 8 críticos v3 al 100 % (2 pasadas por sub-ejes) + drill diario
 *     de cifras. Con --pretest <json> el orden y el nº de slots por código se re-calculan por ÍNDICE DE BRECHA.
 *   · Semanas 6-7: rebotes II-1 / II-11 / II-8 + watch-list (cola larga v3) + repaso multi-temporal del registro.
 *   · Cola: días de repaso puro (sin material nuevo) → D-2 = dress rehearsal 100Q → D-1 = medio día.
 *   · VIERNES (después del pre-test) = simulacro completo 100Q / 72 s/Q con corrección por código (lista SIMS).
 *   · Lun-jue = loop de 8 segmentos (extra.loop): Anki cifras → repaso D-1/D-3/D-7 → pre-test 10Q ciegas →
 *     deep prime del crítico del día → 30Q consolidación → cierre/registro → anclaje → eval modo examen.
 *     ⚠ Las horas del loop son las heredadas del loop USMLE v5.6 (05:00 · 07:15 · 08:15 · 09:00 · 11:00 · 18:00);
 *       se confirman en la reestructuración de febrero. Este script NO toca franjas ni el Google Calendar.
 *
 * Uso:
 *   node DATA/_scripts/gen_encaps_intensivo_2027.js [D1=2027-02-01] [EXAMEN=2027-03-26]
 *        [--base 2026-09-07] [--bk study_schedule_bk_intensivo] [--pretest ruta.json] [--sims ruta.json] [--apply-note]
 *   · D1      = primer día de la intensiva (lunes). Default 2027-02-01.
 *   · EXAMEN  = fecha ASUMIDA del examen (default 2027-03-26). ⚠ La real sale de la convocatoria SERUMS 2027-I
 *               (SENALES_2027-I.md). 25/26-mar-2027 son Jueves/Viernes Santo → se saltan como feriados.
 *   · --base  = D1 del mantenimiento (para continuar la numeración `dia`). Default 2026-09-07.
 *   · --pretest = JSON de la ronda PRETEST_2026-II (export del runner) → re-ordena las semanas 2-5 por brecha.
 *   · --sims  = JSON [{fecha?, label, fuente, url?}] para sustituir la lista de simulacros de viernes.
 * Emite DATA/_scripts/_encaps_intensivo_2027.sql (backup → delete SOLO modo='INTENSIVO' → insert).
 * ⛔ NO APLICAR el SQL hasta que la convocatoria confirme la fecha del examen (execute_sql por MCP ese día).
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const ciclo = require('./_encaps_ciclo_v3');
const { CRITICOS_V3, REBOTE_V3, COLA_LARGA, SUB_EJES, VECTOR_V3, WD, SKIP } = ciclo;

// ── argumentos ──
const argv = process.argv.slice(2);
const fechasArg = argv.filter((a) => /^20\d\d-\d\d-\d\d$/.test(a));
const D1 = fechasArg[0] || '2027-02-01';
const EXAMEN = fechasArg[1] || '2027-03-26';
const opt = (k, def) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] ? argv[i + 1] : def; };
const BASE = opt('--base', '2026-09-07');
const BK = opt('--bk', 'study_schedule_bk_intensivo');
const PRETEST = opt('--pretest', null);
const SIMS_ARG = opt('--sims', null);
if (!/^[a-z_][a-z0-9_]*$/.test(BK)) throw new Error('--bk inválido: ' + BK);
if (D1 >= EXAMEN) throw new Error(`D1 (${D1}) debe ser anterior al examen (${EXAMEN})`);

// ── calendario: L-V, feriados fijos del régimen + Semana Santa del año del examen ──
function pascua(y) { // Meeus/Jones/Butcher
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25),
    g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4,
    l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), mo = Math.floor((h + l - 7 * m + 114) / 31),
    da = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(y, mo - 1, da));
}
const iso = (d) => d.toISOString().slice(0, 10);
const fromISO = (s) => new Date(s + 'T12:00:00Z');
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const SKIP_INT = new Set(SKIP);
{ const p = pascua(fromISO(EXAMEN).getUTCFullYear()); SKIP_INT.add(addDays(iso(p), -3)); SKIP_INT.add(addDays(iso(p), -2)); } // Jueves y Viernes Santo
function* fechas(desde, hasta) {
  const d = fromISO(desde), end = fromISO(hasta);
  while (d <= end) {
    const dow = d.getUTCDay(), f = iso(d);
    if (dow >= 1 && dow <= 5 && !SKIP_INT.has(f)) yield { fecha: f, dow };
    d.setUTCDate(d.getUTCDate() + 1);
  }
}
const HASTA = addDays(EXAMEN, -1);
const plan = [...fechas(D1, HASTA)];
if (!plan.length) throw new Error('sin días hábiles entre D1 y D-1');
const offset = [...fechas(BASE, addDays(D1, -1))].length; // días L-V ya numerados por el mantenimiento
if (fromISO(D1).getUTCDay() !== 1) console.warn('⚠ D1 no es lunes: la semana 1 quedará incompleta');
{ // ENCAPS se rinde en DOMINGO (2026-II fue dom 9-ago). Semana Santa 2027 verificada (Meeus): Jue 25-mar · Vie 26-mar · Pascua dom 28-mar.
  const pas = iso(pascua(fromISO(EXAMEN).getUTCFullYear())), dowEx = fromISO(EXAMEN).getUTCDay();
  if (SKIP_INT.has(EXAMEN) || EXAMEN === pas) console.warn(`⛔ EXAMEN ${EXAMEN} cae en Semana Santa 2027 (Jue ${addDays(pas, -3)} · Vie ${addDays(pas, -2)} · Pascua ${pas}): fecha IMPOSIBLE/ASUMIDA → esperar la convocatoria SERUMS 2027-I (SENALES_2027-I.md) y regenerar con la real`);
  else if (dowEx !== 0) console.warn(`⚠ EXAMEN ${EXAMEN} no es domingo (${WD[dowEx]}): los ENCAPS se rinden en domingo; fecha ASUMIDA, confirmar en la convocatoria`);
  else console.log(`ℹ EXAMEN ${EXAMEN} (domingo) — escenario ${EXAMEN <= '2027-03-14' ? 'CORTO' : EXAMEN <= '2027-03-28' ? 'MEDIO' : 'LARGO'} de FASE_INTENSIVA_2027-I.md; sigue siendo fecha ASUMIDA hasta la convocatoria`);
}

// ── labels desde encapsCobertura.ts (NO se inventan) ──
const cobSrc = fs.readFileSync(path.join(ROOT, 'src/lib/encapsCobertura.ts'), 'utf8');
function temaInfo(code) {
  let i = cobSrc.indexOf(`"${code}": {`);
  if (i < 0) i = cobSrc.indexOf(`"${code}+`);
  if (i < 0) { const m = cobSrc.match(new RegExp(`"[IV]+-\\d+\\+${code.replace(/[-+]/g, '\\$&')}": \\{`)); if (m) i = m.index; }
  if (i < 0) return { label: code, tier: 'MEDIA', found: false };
  const seg = cobSrc.slice(i, i + 4000);
  const tier = (seg.match(/"tier":\s*"([^"]+)"/) || [])[1] || 'MEDIA';
  const tem = (seg.match(/"temario":\s*\[\s*"([^"]+)"/) || [])[1] || code;
  let label = tem.split('(')[0].trim();
  if (label.length > 70) label = label.slice(0, 67) + '…';
  return { label, tier: tier.replace('Í', 'I'), found: true };
}
// código v3 (p.ej. 'IV-1+IV-2') → código de siembra (columna codigo) + paraguas
const SIEMBRA = { 'IV-1+IV-2': ['IV-1', ['IV-2']], 'IV-6+IV-7': ['IV-6', ['IV-7']], 'V-MED': ['V-7', ['V-10']], 'V-7+V-10': ['V-7', ['V-10']],
  'I-5+I-6': ['I-5', ['I-6']], 'I-11+I-12': ['I-11', ['I-12']], 'III-1/III-2': ['III-1', ['III-2']], 'V-RRHH': ['V-3', null] };
const siembraDe = (c) => SIEMBRA[c] || [c, null];
const areaDe = (code) => ((code || '').match(/^[IVX]+/) || [''])[0];

// ── loop diario de 8 segmentos (lun-jue) ──
const LOOP = [
  { h: '05:00', seg: 'Anki ENCAPS::Cifras (≤5 min) + tarjetas de mecanismo', min: 30 },
  { h: '07:15', seg: 'Repaso multi-temporal D-1 / D-3 / D-7 (preguntas de los códigos de esos días)', min: 60 },
  { h: '08:15', seg: 'PRE-TEST 10Q CIEGAS del crítico del día (sin clave hasta responder)', min: 45 },
  { h: '09:00', seg: 'DEEP PRIME del crítico del día (sub-eje) + drill de cifras 10 min', min: 120 },
  { h: '11:00', seg: 'CONSOLIDACIÓN 30Q (60 % hoy · 40 % previos, ≥40 % recall directo)', min: 60 },
  { h: '12:00', seg: 'Cierre: registro en _registro_resoluciones.json + fallos OLVIDO → tarjeta esa tarde', min: 15 },
  { h: '17:15', seg: 'Anclaje vespertino: mapa en blanco del tema + Anki', min: 45 },
  { h: '18:00', seg: 'EVALUACIÓN MODO EXAMEN 20Q · 72 s/Q · solución al final (5Q ancladas = 3 cifras + 2 viñetas)', min: 45 },
];
const NOTA_HORAS = 'horas heredadas del loop USMLE v5.6; se confirman en la reestructuración de febrero (este script no toca franjas ni Calendar)';

// ── simulacros de viernes (después del pre-test). Inventario real: FASE_INTENSIVA_2027-I.md §4 ──
let SIMS = [
  { label: 'SIM 100Q · examen real 2025-II (clave oficial extraída de los resaltados, BANCO_PROPIO/_examenes_reales_2024-2A_2026-1.json)', fuente: 'exams_txt/2025-2.txt · runner gen_encaps_minisim.js --sim100 2025-2', clave: 'oficial' },
  { label: 'SIM 100Q · examen real 2025-I (forma A; clave oficial)', fuente: 'exams_txt/2025-1A.txt · runner --sim100 2025-1A', clave: 'oficial' },
  { label: 'SIM 100Q · examen real 2024-II (forma A; clave oficial)', fuente: 'exams_txt/2024-2A.txt · runner --sim100 2024-2A', clave: 'oficial' },
  { label: 'SIM 100Q · examen real 2026-I en QX BanqueApp (ENCAPS oficial 2026-I) — si el acceso QX sigue vivo; si no, Theomed curso 37 "Examen 2025-II"', fuente: 'QX /evaluaciones/banqueapp · Theomed quiz 7940', clave: 'plataforma (A VERIFICAR acceso 2027)' },
  { label: 'SIM 100Q · propio #1 (vector v3, 50/50 viñeta-directa, espejos 2026-II ya liberado + BANCO_PROPIO)', fuente: 'gen_encaps_minisim.js --sim100 propio', clave: 'verificada por ítem' },
  { label: 'SIM 100Q · Theomed curso 37 "Examen TIPO A/B" o QX Simulacro Virtual 2027-I (A VERIFICAR acceso); si no, propio #2', fuente: 'Theomed quiz 7934/7935 · QX Simulacros Virtuales', clave: 'plataforma' },
  { label: 'SIM 100Q · propio #2 (mix vector v3 + rebotes + señales DGE/RM del verano)', fuente: 'gen_encaps_minisim.js --sim100 propio', clave: 'verificada por ítem' },
];
if (SIMS_ARG) SIMS = JSON.parse(fs.readFileSync(path.resolve(SIMS_ARG), 'utf8'));

// ── orden de críticos para las semanas 2-5 ──
// default = rentabilidad v3 (§3): I-3 · V-2 · IV-1+2 · I-4 · II-3 · III-5 · II-5 · II-4 → 2 pasadas = 16 slots.
let ordenCriticos = ['I-3', 'V-2', 'IV-1+IV-2', 'I-4', 'II-3', 'III-5', 'II-5', 'II-4'];
let slotsPorCodigo = Object.fromEntries(ordenCriticos.map((c) => [c, 2]));
let notaBrecha = 'orden por rentabilidad v3 (sin pre-test aún)';
if (PRETEST) {
  const pj = JSON.parse(fs.readFileSync(path.resolve(PRETEST), 'utf8'));
  const norm = (c) => (c === 'IV-1+2' ? 'IV-1+IV-2' : c === 'IV-6+7' ? 'IV-6+IV-7' : c);
  const acc = {};
  for (const p of pj.preguntas || []) {
    const c = norm(p.codigo); acc[c] = acc[c] || { n: 0, seguras: 0 };
    acc[c].n++; if (p.ok && Number(p.confianza) === 3) acc[c].seguras++;
  }
  const brecha = Object.entries(acc).map(([c, v]) => ({ c, n: v.n, brecha: v.n * (1 - v.seguras / v.n), pct: v.seguras / v.n }))
    .sort((a, b) => b.brecha - a.brecha);
  // 16 slots: cada crítico ≥1 (salvo 100 % seguro → 0); el resto por brecha (críticos y no críticos), máx 3 por código
  slotsPorCodigo = {};
  let libres = 16;
  for (const c of CRITICOS_V3) { const b = brecha.find((x) => x.c === c); if (!b || b.pct < 1) { slotsPorCodigo[c] = 1; libres--; } else slotsPorCodigo[c] = 0; }
  for (const b of brecha) { while (libres > 0 && b.brecha > 0 && (slotsPorCodigo[b.c] || 0) < 3) { slotsPorCodigo[b.c] = (slotsPorCodigo[b.c] || 0) + 1; libres--; if (b.brecha < 1.5) break; } if (libres <= 0) break; }
  ordenCriticos = Object.keys(slotsPorCodigo).filter((c) => slotsPorCodigo[c] > 0)
    .sort((a, b) => ((brecha.find((x) => x.c === b) || {}).brecha || 0) - ((brecha.find((x) => x.c === a) || {}).brecha || 0));
  notaBrecha = `re-ordenado por índice de brecha del PRETEST_2026-II (${pj.puntaje || '?'}): ` + brecha.slice(0, 8).map((b) => `${b.c} ${b.brecha.toFixed(1)}`).join(' · ');
}
// cola de slots lun-jue de las semanas 2-5: intercala pasada 1 y pasada 2 (todos los códigos una vez, luego la 2ª)
const colaCriticos = [];
{ const restante = { ...slotsPorCodigo }; let alguno = true;
  while (alguno && colaCriticos.length < 16) { alguno = false; for (const c of ordenCriticos) { if (restante[c] > 0) { colaCriticos.push(c); restante[c]--; alguno = true; if (colaCriticos.length >= 16) break; } } } }
while (colaCriticos.length < 16) colaCriticos.push(ordenCriticos[colaCriticos.length % ordenCriticos.length]);

// ── siembra ──
const esc = (s) => String(s).replace(/'/g, "''");
const J = (o) => `'${esc(JSON.stringify(o))}'::jsonb`;
const rows = [];
const subCount = {};
const porFecha = {};
const N = plan.length;
const iD1 = N - 1, iD2 = N - 2;                // últimos dos días hábiles
const semana = (i) => Math.floor(i / 5);       // semana relativa a D1 (asume D1 lunes)
const lunJue = plan.map((p, i) => (p.dow !== 5 ? i : -1)).filter((i) => i >= 0);
// slots lun-jue por bloque: semana 1 = índices con semana()==0; semanas 2-5 = 16 siguientes; luego rebotes/cola; cola final
const slotsSem1 = lunJue.filter((i) => semana(i) === 0 && i < iD2);
const slotsBarrido = lunJue.filter((i) => semana(i) >= 1 && i < iD2).slice(0, 16);
const restoLJ = lunJue.filter((i) => semana(i) >= 1 && i < iD2 && !slotsBarrido.includes(i));
const nRepasoFinal = Math.min(2, restoLJ.length);
const slotsRepasoFinal = restoLJ.slice(restoLJ.length - nRepasoFinal);
const slotsRebotes = restoLJ.slice(0, restoLJ.length - nRepasoFinal);
const historial = []; // {i, codigo} para D-1/D-3/D-7
const repasoDe = (i) => {
  const out = {};
  for (const [k, back] of [['D-1', 1], ['D-3', 3], ['D-7', 7]]) { const h = historial.filter((x) => x.i <= i - back); if (h.length) out[k] = h[h.length - 1].codigo; }
  return out;
};
let simIdx = 0, colaIdx = 0, calent = ['I-3', 'V-2', 'II-3'], calIdx = 0;
plan.forEach(({ fecha, dow }, i) => {
  const dia = offset + i + 1;
  const base = { examen: 'ENCAPS', dia, fecha, weekday: WD[dow] };
  let tipo, codigo = null, subtema, prio = 'CRITICA', secs = null, extra = { fase: 'INTENSIVA', semana: semana(i) + 1, dias_a_examen: Math.round((fromISO(EXAMEN) - fromISO(fecha)) / 864e5) };
  if (i === iD1) {
    tipo = 'medio_dia'; subtema = 'D-1 · MEDIO DÍA: 30 min de cifras + hoja de errores del dress rehearsal · sin material nuevo · dormir 7 h';
    extra.regla = 'doctrina del sprint 2026-II: D-1 medio día, cero preguntas nuevas';
  } else if (i === iD2) {
    tipo = 'dress_rehearsal'; subtema = 'D-2 · DRESS REHEARSAL: simulacro 100Q / 72 s/Q a la hora del examen, ropa, comida y traslado simulados · corrección por código';
    extra.sim = { n: 100, seg_por_q: 72, fuente: 'gen_encaps_minisim.js --sim100 propio (mix vector v3, 50/50, rebotes + señales)' };
  } else if (dow === 5 && semana(i) === 0) {
    tipo = 'pretest'; subtema = 'PRE-TEST 2026-II · 100Q / 72 s/Q · examen real 2026-II (clave oficial 100/100) · corrección por código vs vector v3 · umbral ≥70';
    extra.sim = { n: 100, seg_por_q: 72, fuente: '_examen_2026-2_items.json · runner gen_encaps_minisim.js --pretest', doc: 'PRETEST_2026-II.md', registro: 'ronda PRETEST_2026-II' };
  } else if (dow === 5) {
    tipo = 'sim100';
    const s = SIMS[simIdx] || { label: `SIM 100Q · propio #${simIdx - 3} (gen_encaps_minisim.js --sim100 propio)`, fuente: 'BANCO_PROPIO', clave: 'verificada por ítem' };
    simIdx++;
    subtema = `SIMULACRO ${simIdx} · ${s.label}`;
    extra.sim = { n: 100, seg_por_q: 72, ...s, correccion: 'por código v3 + formato (viñeta/cifra) · registro en _registro_resoluciones.json' };
  } else if (slotsSem1.includes(i)) {
    if (dow === 1) {
      tipo = 'senales'; subtema = 'RE-SCAN DE SEÑALES: QX Tendencias 2027-I · boletín DGE/sala situacional · RM/NTS MINSA publicadas desde sep-2026 · convocatoria SERUMS 2027-I → actualizar SENALES_2027-I.md y pesos del v3';
      extra.doc = 'SENALES_2027-I.md'; prio = 'ALTA';
    } else {
      tipo = 'loop'; codigo = calent[calIdx % calent.length]; calIdx++;
      const info = temaInfo(codigo); subtema = `CALENTAMIENTO (sin material nuevo) · ${info.label}`;
      extra.loop = LOOP; extra.nota_horas = NOTA_HORAS; extra.repaso = repasoDe(i); historial.push({ i, codigo });
    }
  } else if (slotsBarrido.includes(i)) {
    tipo = 'loop';
    const cv3 = colaCriticos[slotsBarrido.indexOf(i)];
    const [cs, paraguas] = siembraDe(cv3); codigo = cs;
    const n = (subCount[cs] = (subCount[cs] || 0) + 1);
    const se = SUB_EJES[cs]; let eje = null;
    if (se) eje = se.ejes[(n - 1) % se.ejes.length];
    subtema = `BARRIDO CRÍTICO ${cv3} · pasada ${Math.ceil(n / (se ? Math.min(se.ejes.length, 2) : 1)) > 1 ? 2 : 1}${eje ? ' · ' + eje.label : ' · ' + temaInfo(cs).label}`;
    if (subtema.length > 240) subtema = subtema.slice(0, 237) + '…';
    secs = [];
    for (const p of paraguas || []) secs.push({ codigo: p, subtema: temaInfo(p).label, prioridad: 'CRITICA', rol: 'paraguas' });
    extra.loop = LOOP; extra.nota_horas = NOTA_HORAS; extra.critico_v3 = cv3; extra.instancia = n; extra.sub_eje = eje ? eje.key : null;
    extra.drill_cifras = 'CIFRAS_CRITICAS_2027-I.md · 10 min dentro del deep prime'; extra.repaso = repasoDe(i); extra.brecha = notaBrecha;
    historial.push({ i, codigo: cv3 });
  } else if (slotsRebotes.includes(i)) {
    tipo = 'loop';
    const k = slotsRebotes.indexOf(i);
    if (k < REBOTE_V3.length) {
      codigo = REBOTE_V3[k]; prio = 'ALTA';
      const se = SUB_EJES[codigo]; const eje = se ? se.ejes[0] : null;
      subtema = `REBOTE ${codigo} (anti-persistente, lección L4) · ${eje ? eje.label : temaInfo(codigo).label}`;
      const cl = COLA_LARGA[colaIdx % COLA_LARGA.length]; colaIdx++;
      const [cs2] = siembraDe(cl.codigo);
      secs = [{ codigo: cs2, subtema: cl.label, prioridad: 'MEDIA', rol: 'cola_larga', q: '5-6' }];
      extra.secundario = cl.codigo;
    } else {
      const cl = [COLA_LARGA[colaIdx % COLA_LARGA.length], COLA_LARGA[(colaIdx + 1) % COLA_LARGA.length], COLA_LARGA[(colaIdx + 2) % COLA_LARGA.length]]; colaIdx += 3;
      const [cs1] = siembraDe(cl[0].codigo); codigo = cs1; prio = 'MEDIA';
      subtema = `WATCH-LIST cola larga · ${cl[0].codigo}: ${cl[0].label}`;
      if (subtema.length > 240) subtema = subtema.slice(0, 237) + '…';
      secs = cl.slice(1).map((c) => ({ codigo: siembraDe(c.codigo)[0], subtema: c.label, prioridad: 'MEDIA', rol: 'cola_larga', q: '8-10' }));
      extra.cola_larga = cl.map((c) => c.codigo);
    }
    extra.loop = LOOP; extra.nota_horas = NOTA_HORAS; extra.repaso = repasoDe(i);
    extra.repaso_registro = 'repaso multi-temporal de TODO _registro_resoluciones.json (fallos CCSN/CONCEPTO/OLVIDO) en el segmento 07:15';
    historial.push({ i, codigo });
  } else if (slotsRepasoFinal.includes(i)) {
    tipo = 'repaso_final'; prio = 'ALTA';
    subtema = 'REPASO FINAL · sin material nuevo: errores del registro + cifras + mapas en blanco de los 8 críticos';
    extra.repaso = repasoDe(i);
  } else {
    tipo = 'loop'; codigo = 'I-3'; subtema = 'LOOP (relleno)'; extra.loop = LOOP;
  }
  porFecha[fecha] = tipo;
  rows.push(`('ENCAPS',${dia},'${fecha}','${WD[dow]}','${tipo}',${codigo ? `'${codigo}'` : 'NULL'},'${esc(subtema)}','${prio}','INTENSIVO','[]'::jsonb,'[]'::jsonb,'[]'::jsonb,${secs ? J(secs) : 'NULL'},${J(extra)})`);
});

const sql = `-- ENCAPS FASE INTENSIVA 2027-I · generado por gen_encaps_intensivo_2027.js (${new Date().toISOString().slice(0, 10)})
-- ${rows.length} días L-V · ${plan[0].fecha} → ${plan[N - 1].fecha} · dia ${offset + 1}-${offset + N} (continúa la cuenta del mantenimiento desde ${BASE})
-- EXAMEN ASUMIDO ${EXAMEN} (${WD[fromISO(EXAMEN).getUTCDay()]}) · feriados saltados: ${[...SKIP_INT].filter((f) => f >= D1 && f <= HASTA).join(', ') || 'ninguno'}
-- semanas 2-5: ${notaBrecha}
-- ⛔ NO APLICAR hasta que la convocatoria SERUMS 2027-I confirme la fecha del examen (regenerar con la fecha real y aplicar por MCP execute_sql).
-- Borra SOLO las filas modo='INTENSIVO' (el mantenimiento 1-102 queda intacto). backup ${BK}.
BEGIN;
DROP TABLE IF EXISTS ${BK};
CREATE TABLE ${BK} AS SELECT * FROM study_schedule WHERE examen = 'ENCAPS';
DELETE FROM study_schedule WHERE examen = 'ENCAPS' AND modo = 'INTENSIVO';
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, codigo, subtema, prioridad, modo, videos, theomed, material_comp, temas_secundarios, extra) VALUES
${rows.join(',\n')};
COMMIT;
`;
const out = path.join(__dirname, '_encaps_intensivo_2027.sql');
fs.writeFileSync(out, sql, 'utf8');

// ── verificación ──
const tipos = {};
for (const t of Object.values(porFecha)) tipos[t] = (tipos[t] || 0) + 1;
const finde = plan.filter((p) => p.dow === 0 || p.dow === 6).length;
const feriadosDentro = plan.filter((p) => SKIP_INT.has(p.fecha)).length;
console.log('OK →', out, '·', rows.length, 'días ·', plan[0].fecha, '→', plan[N - 1].fecha, '· dia', offset + 1, '-', offset + N, '· examen asumido', EXAMEN);
console.log('tipos:', JSON.stringify(tipos), '· fines de semana dentro:', finde, '· feriados dentro:', feriadosDentro, '· viernes:', plan.filter((p) => p.dow === 5).length);
console.log('barrido semanas 2-5 (16 slots):', colaCriticos.join(' · '));
console.log('offset mantenimiento:', offset, '(esperado 102 si BASE=2026-09-07 y D1=2027-02-01)');
if (finde || feriadosDentro) throw new Error('el plan contiene fines de semana o feriados');
