/**
 * gen_encaps_intensivo_2027.js — siembra la FASE INTENSIVA ENCAPS 2027-I (feb → D-1 del examen) en Supabase.
 *
 * Contexto (régimen v5.6, PRONOSTICO_WALKFORWARD_2027-1_v3.md §6 Fase B + FASE_INTENSIVA_2027-I.md):
 *   · mié 7-oct-2026 → mar 16-feb-2027: MANTENIMIENTO 1h/día (gen_encaps_mantenimiento_2027.js, 92 días, dia 1-92 · v5.20 · v6.18,
 *     backup study_schedule_bk_1006; el fin se AMPLIÓ (v5.14 29-ene → v5.15 2-feb → v5.16 5-feb → v5.17 10-feb → v5.18 12-feb →
 *     v5.19 15-feb → v5.20 16-feb) para no perder sesiones). Días 93-96 (mié 17 → lun 22-feb) = cierre Step 1 + examen, SIN fila.
 *   · mar 23-feb → mar 9-mar-2027 (D-1): INTENSIVA — ENCAPS vuelve a bloque principal (v5.20: el USMLE Step 1 se rinde el
 *     LUN 22-FEB-2027 y la intensiva arranca el día siguiente, MAR 23-FEB = día 97 → EXAMEN ENCAPS MIÉ 10-MAR-2027, FIJADO por Joseph;
 *     11 hábiles, días 97-107, SEMBRADOS en Supabase el 6-oct con backup study_schedule_bk_intensivo_1006 · v5.19: examen Step 1
 *     vie 19-feb, arranque lun 22-feb · v5.18: examen jue 18-feb, arranque vie 19-feb o lun 22-feb; v5.17: examen mar 16-feb,
 *     arranque mié 17-feb o lun 22-feb).
 *     Se siembra con modo='INTENSIVO' y dia = 97… (continúa la cuenta L-V desde la base del mantenimiento —los hábiles 93-96 sin fila
 *     también cuentan—, así el cálculo de "día de hoy" de la app no cambia). v5.14 (19-sep): la app YA renderiza modo='INTENSIVO'
 *     (encapsPlan.ts: regimenDe() lee study_metrics.extra.d1/dias_ciclo y el total crece con max(dia) de study_schedule;
 *     itemsForDay/simDays entienden extra.loop · sim · repaso · drill_cifras y los tipos pretest/sim100/dress_rehearsal).
 *     ⚠ Al sembrar la intensiva hay que re-sembrar también study_metrics.extra.horarios (weekday/weekend).
 *
 * Esqueleto:
 *   · Semana 1: primer slot = re-scan de señales (QX Tendencias, DGE, RM/NTS sep-2026→, convocatoria) + resto lun-jue = loop de
 *     calentamiento (I-3, V-2, II-3, sin material nuevo) + el primer VIERNES de la intensiva = PRE-TEST 2026-II (PRETEST_2026-II.md).
 *     v5.20: semana 1 = mar 23-feb (D1, re-scan: día ligero tras el examen Step 1) · mié 24 / jue 25 calentamiento I-3 / V-2 ·
 *     vie 26-feb PRE-TEST 2026-II 100Q — D1 default mar 23-feb y el runner gen_encaps_minisim.js --pretest con default 2027-02-26:
 *     los dos defaults quedan ALINEADOS (v5.19: vie 26-feb con D1 lun 22-feb, también alineados · v5.18: vie 19-feb o vie 26-feb según
 *     el arranque, con los defaults desalineados; v5.17: vie 19-feb si arrancaba el mié 17-feb).
 *   · Semanas 2-5 (16 slots lun-jue en el DISEÑO): barrido de los 8 críticos v3 al 100 % (2 pasadas por sub-ejes) + drill diario
 *     de cifras. Con --pretest <json> el orden y el nº de slots por código se re-calculan por ÍNDICE DE BRECHA.
 *   · Semanas 6-7: rebotes II-1 / II-11 / II-8 + watch-list (cola larga v3) + repaso multi-temporal del registro.
 *   · Cola: días de repaso puro (sin material nuevo) → D-2 = dress rehearsal 100Q → D-1 = medio día.
 *   ⚠ v5.20 (examen FIJADO mié 10-mar, 11 hábiles): solo caben 4 slots de barrido (lun 1 → jue 4-mar; default I-3 · V-2 · IV-1+IV-2 · I-4)
 *     + vie 5-mar SIM 100Q (2025-II, clave oficial) + lun 8-mar D-2 dress rehearsal + mar 9-mar D-1 medio día; sin rebotes ni watch-list.
 *     Los 8 críticos se cubren sobre todo en el mantenimiento (5-10 sesiones cada uno); tras el vie 26-feb, regenerar con --pretest.
 *   · VIERNES (después del pre-test) = simulacro completo 100Q / 72 s/Q con corrección por código (lista SIMS).
 *   · Lun-jue = loop de 8 segmentos (extra.loop): Anki cifras → repaso D-1/D-3/D-7 → pre-test 10Q ciegas →
 *     deep prime del crítico del día → 30Q consolidación → cierre/registro → anclaje → eval modo examen.
 *     ⚠ Las horas del loop son las heredadas del loop USMLE v5.6 (05:00 · 07:15 · 08:15 · 09:00 · 11:00 · 18:00);
 *       se confirman en la reestructuración de febrero. Este script NO toca franjas ni el Google Calendar.
 *
 * Uso:
 *   node DATA/_scripts/gen_encaps_intensivo_2027.js [D1=2027-02-23] [EXAMEN=2027-03-10]
 *        [--base 2026-10-07] [--bk study_schedule_bk_intensivo] [--pretest ruta.json] [--sims ruta.json] [--apply-note]
 *   · D1      = primer día de la intensiva (no tiene que ser lunes). Default 2027-02-23 (v5.20: mar 23-feb = día 97 de la cuenta ENCAPS, día siguiente al examen Step 1 del lun 22-feb · v5.19: lun 22-feb = día 97, primer hábil tras el examen Step 1 del vie 19-feb · v5.18: lun 22-feb = día 98, alternativa vie 19-feb = día 97 por argv; v5.17: lun 22-feb = día 100 / mié 17-feb = día 97).
 *   · EXAMEN  = fecha del examen ENCAPS. Default 2027-03-10 = MIÉ 10-MAR-2027, FIJADO por Joseph el 6-oct-2026 (v5.20; hasta v5.19:
 *               26-mar ASUMIDO, que era Viernes Santo). ⚠ Los ENCAPS se rindieron siempre en DOMINGO (2026-II dom 9-ago) → confirmar día/hora
 *               en la convocatoria SERUMS 2027-I (SENALES_2027-I.md); si la mueve, regenerar con la real. 25/26-mar-2027 (Jueves/Viernes Santo)
 *               se saltan como feriados si caen dentro.
 *   · --base  = D1 del mantenimiento (para continuar la numeración `dia`). Default 2026-10-07 (v5.20; v5.19: 2026-10-06; v5.18: 2026-10-05; v5.17: 2026-10-01; v5.16: 2026-09-28).
 *   · --pretest = JSON de la ronda PRETEST_2026-II (export del runner) → re-ordena las semanas 2-5 por brecha.
 *   · --sims  = JSON [{fecha?, label, fuente, url?}] para sustituir la lista de simulacros de viernes.
 * Emite DATA/_scripts/_encaps_intensivo_2027.sql (backup → delete SOLO modo='INTENSIVO' → insert).
 * v5.20 (6-oct-2026, DEFINITIVA): Joseph FIJA el examen ENCAPS 2027-I = MIÉ 10-MAR-2027 y la intensiva arranca el día siguiente al examen
 *   Step 1 (lun 22-feb) → D1 = mar 23-feb · 11 hábiles (días 97-107): mar 23 señales · mié 24 / jue 25 calentamiento · vie 26 PRE-TEST 2026-II ·
 *   lun 1 → jue 4-mar barrido (4 slots) · vie 5-mar SIM 100Q #1 · lun 8-mar D-2 dress rehearsal · mar 9-mar D-1 medio día. El SQL SE APLICA
 *   (ya no se espera a la convocatoria); tras el pre-test del vie 26-feb se REGENERA con --pretest <json> (re-ordena el barrido por brecha)
 *   y, si la convocatoria moviera la fecha, se regenera con la real (solo borra modo='INTENSIVO').
 * (hasta v5.19: ⛔ NO APLICAR el SQL hasta que la convocatoria confirme la fecha del examen.)
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const ciclo = require('./_encaps_ciclo_v3');
const { CRITICOS_V3, REBOTE_V3, COLA_LARGA, SUB_EJES, VECTOR_V3, WD, SKIP } = ciclo;

// ── argumentos ──
const argv = process.argv.slice(2);
const fechasArg = argv.filter((a) => /^20\d\d-\d\d-\d\d$/.test(a));
const D1 = fechasArg[0] || '2027-02-23'; // v5.20 (6-oct, DEFINITIVA): mar 23-feb-2027 = día siguiente al examen Step 1 del lun 22-feb (Joseph: «la fase intensiva del serum inicia cuando ya damos el examen de Estados Unidos») · v5.19: lun 22-feb-2027 (el examen Step 1 pasa al vie 19-feb, así que el lun 22 es el primer hábil tras el examen; ya no hay alternativa del vie 19) · v5.18: lun 22-feb o vie 19-feb por argv — decisión de Joseph. v5.17: lun 22-feb / mié 17-feb. v5.16: 2027-02-15 · v5.15: 2027-02-01
const EXAMEN = fechasArg[1] || '2027-03-10'; // v5.20 (6-oct): MIÉ 10-MAR-2027, fecha fijada por Joseph («el examen del serum será para la fecha del 10 de marzo»). Antes: 26-mar ASUMIDO (Viernes Santo).
const opt = (k, def) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] ? argv[i + 1] : def; };
const BASE = opt('--base', '2026-10-07');   // v5.20 (6-oct): D1 del mantenimiento = mié 7-oct (92 días hasta el mar 16-feb; días 93-96 = mié 17 → lun 22-feb = cierre + examen Step 1 → la intensiva arranca en el día 97) · v5.19 (5-oct): D1 del mantenimiento = mar 6-oct (92 días hasta el lun 15-feb) · v5.18 (3-oct): lun 5-oct (92 días hasta el vie 12-feb; v5.17: jue 1-oct → mié 10-feb; v5.16: lun 28-sep → vie 5-feb) → la intensiva continúa la numeración desde el día 93 (los hábiles sin fila entre el mar 16 y el vie 19-feb = días 93-96 cuentan; v5.18: lun 15 → jue 18-feb). v5.19: el Step 1 cae el vie 19-feb (jue 18-feb = D-1) → la intensiva arranca el lun 22-feb = día 97 (default). ⚠ v5.18: el Step 1 caía el jue 18-feb (mié 17-feb = D-1) → la intensiva debería arrancar el vie 19-feb (día siguiente al examen) o el lun 22-feb (decisión de Joseph; pasar la fecha por argv)
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
if (fromISO(D1).getUTCDay() !== 1) console.warn('ℹ D1 no es lunes: la semana 1 queda incompleta (v5.20: D1 = mar 23-feb, día siguiente al examen Step 1 → semana 1 = mar-vie: señales + calentamiento + pre-test del viernes)');
{ // ENCAPS se rindió siempre en DOMINGO (2026-II fue dom 9-ago). Semana Santa 2027 verificada (Meeus): Jue 25-mar · Vie 26-mar · Pascua dom 28-mar.
  // v5.20: el escenario VIGENTE es el FIJADO por Joseph = mié 10-mar-2027 (cae en el rango CORTO de FASE_INTENSIVA_2027-I.md); como no es
  // domingo, con el default sale siempre el aviso ⚠ de abajo → confirmar día/hora en la convocatoria. CORTO/MEDIO/LARGO solo aplican si la
  // convocatoria moviera la fecha (hasta v5.19 eran escenarios ASUMIDOS: 14-mar / 21-mar / 11-abr, con 26-mar como default).
  const pas = iso(pascua(fromISO(EXAMEN).getUTCFullYear())), dowEx = fromISO(EXAMEN).getUTCDay();
  if (SKIP_INT.has(EXAMEN) || EXAMEN === pas) console.warn(`⛔ EXAMEN ${EXAMEN} cae en Semana Santa 2027 (Jue ${addDays(pas, -3)} · Vie ${addDays(pas, -2)} · Pascua ${pas}): fecha IMPOSIBLE → esperar la convocatoria SERUMS 2027-I (SENALES_2027-I.md) y regenerar con la real (v5.20: la vigente es el mié 10-mar-2027 FIJADO por Joseph)`);
  else if (dowEx !== 0) console.warn(`⚠ EXAMEN ${EXAMEN} no es domingo (${WD[dowEx]}): los ENCAPS se rindieron siempre en domingo → confirmar día/hora en la convocatoria SERUMS 2027-I (v5.20: default 2027-03-10 = mié, FIJADO por Joseph; escenario vigente)`);
  else console.log(`ℹ EXAMEN ${EXAMEN} (domingo) — escenario ${EXAMEN <= '2027-03-14' ? 'CORTO' : EXAMEN <= '2027-03-28' ? 'MEDIO' : 'LARGO'} de FASE_INTENSIVA_2027-I.md; distinto del FIJADO v5.20 (mié 10-mar-2027): usarlo solo si la convocatoria lo confirma`);
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
// v5.20: semana de CALENDARIO contada desde el lunes de la semana del D1 (antes floor(i / 5), que asumía D1 = lunes: con D1 en martes
// el lun 1-mar caía en la «semana 1» y el barrido arrancaba un día tarde).
const LUNES_D1 = addDays(D1, -((fromISO(D1).getUTCDay() + 6) % 7));
const semana = (i) => Math.floor((fromISO(plan[i].fecha) - fromISO(LUNES_D1)) / (7 * 864e5));
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
    if (i === slotsSem1[0]) { // v5.20: el PRIMER slot de la semana 1 (= lunes si el D1 es lunes; con D1 mar 23-feb, el propio D1: día ligero tras el examen Step 1)
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
-- EXAMEN ${EXAMEN} (${WD[fromISO(EXAMEN).getUTCDay()]}; v5.20: default 2027-03-10 FIJADO por Joseph) · feriados saltados: ${[...SKIP_INT].filter((f) => f >= D1 && f <= HASTA).join(', ') || 'ninguno'}
-- semanas 2-5: ${notaBrecha}
-- v5.20: examen FIJADO por Joseph (6-oct-2026) = ${EXAMEN} → se aplica por MCP execute_sql. Re-generar tras el PRE-TEST 2026-II (--pretest) o si la convocatoria SERUMS 2027-I mueve la fecha.
-- Borra SOLO las filas modo='INTENSIVO' (el mantenimiento 1-92 queda intacto · v5.20; los días 93-96 no tienen fila). backup ${BK}.
BEGIN;
DROP TABLE IF EXISTS ${BK};
CREATE TABLE ${BK} AS SELECT * FROM study_schedule WHERE examen = 'ENCAPS';
DELETE FROM study_schedule WHERE examen = 'ENCAPS' AND modo = 'INTENSIVO';
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, codigo, subtema, prioridad, modo, videos, theomed, material_comp, temas_secundarios, extra) VALUES
${rows.join(',\n')};
COMMIT;
`;
const out = opt('--out', path.join(__dirname, '_encaps_intensivo_2027.sql')); // v5.14: --out <ruta> para pruebas en seco sin pisar el SQL versionado
fs.writeFileSync(out, sql, 'utf8');

// ── verificación ──
const tipos = {};
for (const t of Object.values(porFecha)) tipos[t] = (tipos[t] || 0) + 1;
const finde = plan.filter((p) => p.dow === 0 || p.dow === 6).length;
const feriadosDentro = plan.filter((p) => SKIP_INT.has(p.fecha)).length;
console.log('OK →', out, '·', rows.length, 'días ·', plan[0].fecha, '→', plan[N - 1].fecha, '· dia', offset + 1, '-', offset + N, '· examen', EXAMEN);
console.log('tipos:', JSON.stringify(tipos), '· fines de semana dentro:', finde, '· feriados dentro:', feriadosDentro, '· viernes:', plan.filter((p) => p.dow === 5).length);
console.log('barrido semanas 2-5 (cola de 16 slots del diseño; se usan solo los que caben · v5.20: 4, lun 1 → jue 4-mar):', colaCriticos.join(' · '));
console.log('offset mantenimiento:', offset, '(v5.20: 92 días de mantenimiento hasta el mar 16-feb con BASE=2026-10-07 + días 93-96 = mié 17 → lun 22-feb sin fila (cierre + examen Step 1); la intensiva = día 97 mar 23-feb · v5.19: 92 días hasta el lun 15-feb con BASE=2026-10-06 + días 93-96 = mar 16 → vie 19-feb sin fila; el día de la intensiva = offset + 1 → día 97 lun 22-feb)');
if (finde || feriadosDentro) throw new Error('el plan contiene fines de semana o feriados');
