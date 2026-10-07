/**
 * gen_encaps_intensivo_2027.js — FASE INTENSIVA ENCAPS 2027-I (F2: lun 4-ene → D-1 del examen) → SQL para Supabase (study_schedule).
 *
 * v6.00 (6-oct-2026, V6_ESPEC §C2-§C3 + Anexo B): REESTRUCTURACIÓN ANUAL. La intensiva ya no espera al Step 1 (que se pausa del 31-dic
 *   al lunes libre post-ENCAPS): arranca el LUN 4-ENE-2027 (dia 61, la numeración L-V sigue sin huecos desde el D1 del mantenimiento
 *   2026-10-07 saltando SKIP_V6) y llega al D-1 hábil del examen ENCAPS = DOM 14-MAR-2027 PROVISIONAL (50 hábiles, dia 61-110).
 *   Fechas: _fechas_v6.json vía gen_fechas_v6.js (nunca constantes locales). Esqueleto (escenario base, Anexo B):
 *   · S1 (lun 4 → vie 8-ene): lun `senales` (re-scan + convocatoria) · mar/mié/jue `loop` calentamiento I-3 / V-2 / II-3 ·
 *     vie 8-ene `pretest` = PRE-TEST 2026-II 100Q (clave oficial) — default alineado con gen_encaps_minisim.js --pretest.
 *   · NÚCLEO S2-S9 (lun 11-ene → vie 5-mar = encaps.nucleo_hasta): 32 slots `loop` de barrido lun-jue (--slots-barrido) con el reparto
 *     I-3 7 · V-2 5 · IV-1+IV-2 4 · I-4 4 · II-3 4 · III-5 3 · II-4 3 · II-5 2 en el ORDEN BASE r2 (S3/S5/S6/S7 permutados: ningún día
 *     repite el código del carril B) · último hábil de cada semana = `sim100` (8): #1 2025-II oficial · #4 2024-II oficial ·
 *     #7 2025-I oficial (ancla tardía) · #2/#3/#5/#6/#8 Theomed / QX 2027-I / propios (acceso A VERIFICAR) · 2026-I reservado al dress.
 *   · MÓDULOS DE EXTENSIÓN (solo si el examen es posterior al 14-mar), semana a semana entre el núcleo y la cola: lun + mar pasada
 *     profunda #1/#2 · mié rebote cola larga (II-1 / II-11 / II-8 rotando) · jue lista de vigilancia · el ÚLTIMO hábil de la semana es
 *     SIEMPRE el `sim100` (regla del módulo parcial: Semana Santa 25-26-mar → SIM el mié 24-mar).
 *   · COLA ANCLADA = los 5 hábiles antes del examen: D-5 `loop` pasada profunda (extra.cola='profunda') · D-4/D-3 `repaso_final` ·
 *     D-2 `dress_rehearsal` 11:00-13:00 · D-1 `medio_dia` (día protegido con fila legítima, V3).
 *   · LOOP v6 (extra.loop, horas DEFINITIVAS F2; extra.nota_horas): 05:00 Anki cifras 15' · 07:15 repaso D-1/D-7/D-21 60' · 08:15
 *     PRE-TEST 10Q 45' · 09:00 DEEP PRIME 120' · 11:00 CONSOLIDACIÓN 30Q + cierre 60' · 12:00 registro 15' · 18:00 EVAL 20Q (10 + 10) 45'.
 *     El 16:15 CARRIL B NO va en extra.loop (lo añaden itemsForDay/HorarioView si existe extra.carril_b); sin «anclaje 17:15».
 *   · CARRIL B (16:15, --carril-b, OBLIGATORIO en TODAS las ejecuciones; default DATA/ENCAPS/_carril_b_v520_61-92.json): cada fila
 *     MANTENIMIENTO 61-92 de v5.20 se EMBEBE en la fila INTENSIVO de su misma fecha (= mismo dia; PK (examen, dia)):
 *     26 lun-jue → extra.carril_b = { origen:'mantenimiento_v5.20', dia_mant, fecha, tipo:'banqueo1h', codigo, subtema, prioridad, nts,
 *     temas_secundarios, extra } (copia literal) · 6 viernes → extra.minisim_absorbido = { dia_mant, subtema, extra } (receta guardada,
 *     el SIM 100Q la absorbe) · lun-jue desde el día siguiente a la última fila 61-92 hasta el D-3 de la cola → extra.carril_b =
 *     { tipo:'reposicion', regla } · sin carril B: viernes/SIM, D-2 y D-1.
 *   · SIN extra.dias_a_examen (era estático; la app lo calcula con diasAExamenDe(exam_date)). extra.sim.hora = '07:15' salvo #7, #8 y
 *     el dress = '11:00'. extra.repaso = { 'D-1', 'D-7', 'D-21' }.
 *   · SQL: DELETE SOLO modo='INTENSIVO' (con --desde: AND fecha >= <desde>) + INSERT; NO borra el MANTENIMIENTO (las filas 61-92 de v5.20
 *     las borra el orquestador en la siembra, Lote 4) · el UPDATE de study_metrics.extra (§C3) va dentro de la transacción, o en
 *     <out>.metrics.sql con --sin-tx. --bk ABORTA si la tabla de backup ya existe (antes: DROP TABLE IF EXISTS).
 *
 * Uso:
 *   node DATA/_scripts/gen_encaps_intensivo_2027.js [D1=2027-01-04] [EXAMEN=_fechas_v6.encaps.examen (2027-03-14)]
 *        [--base 2026-10-07] [--carril-b DATA/ENCAPS/_carril_b_v520_61-92.json] [--desde AAAA-MM-DD] [--sin-tx] [--out ruta.sql]
 *        [--nucleo-hasta 2027-03-05] [--slots-barrido 32] [--reparto json|ruta] [--orden-base json|ruta] [--pretest export.json]
 *        [--sims ruta.json] [--bk study_schedule_bk_v600_int_AAAAMMDD] [--bk-base study_schedule_bk_v600_20261006]
 *   · Siembra v6 (Lote 4): … 2027-01-04 2027-03-14 --base 2026-10-07 --carril-b DATA/ENCAPS/_carril_b_v520_61-92.json --sin-tx
 *   · Tras el PRE-TEST (vie 8-ene): --pretest <export.json> --desde 2027-01-11 (re-ordena los 32 slots por ÍNDICE DE BRECHA conservando
 *     32 slots, cada crítico ≥ 1 y la restricción «código del slot ≠ código del carril B de ese día»).
 *   · Tras la convocatoria: editar _fechas_v6.json (encaps.examen) y regenerar con --desde <primer hábil > nucleo_hasta> (módulos + cola).
 *   · Un escenario distinto del de _fechas_v6.json (D1 / EXAMEN / --base por argv) exige --out (prueba en seco: nunca pisa el SQL versionado).
 *   · --reparto {"I-3":7,…} (suma = slots) re-ordena por intercalado + restricción · --orden-base {"<lunes>":[c1,c2,c3,c4],…} sustituye la
 *     tabla S2-S9 (aborta si choca con el carril B) · --sims [{label, fuente, clave?, hora?}] sustituye la lista de SIM del núcleo.
 *
 * Histórico (antes de v6.00):
 * v5.20 (6-oct-2026, DEFINITIVA): Joseph FIJA el examen ENCAPS 2027-I = MIÉ 10-MAR-2027 y la intensiva arranca el día siguiente al examen
 *   Step 1 (lun 22-feb) → D1 = mar 23-feb · 11 hábiles (días 97-107): mar 23 señales · mié 24 / jue 25 calentamiento · vie 26 PRE-TEST 2026-II ·
 *   lun 1 → jue 4-mar barrido (4 slots) · vie 5-mar SIM 100Q #1 · lun 8-mar D-2 dress rehearsal · mar 9-mar D-1 medio día (sembrado el 6-oct,
 *   backup study_schedule_bk_intensivo_1006; v6.00 lo sustituye: sus 11 filas quedan en study_schedule_bk_v600_int_<fecha> y su contenido
 *   re-fechado en la nueva intensiva, §C3). v5.19: examen Step 1 vie 19-feb, arranque lun 22-feb · v5.18: examen jue 18-feb, arranque
 *   vie 19-feb o lun 22-feb; v5.17: examen mar 16-feb, arranque mié 17-feb o lun 22-feb. Hasta v5.19 el examen era ASUMIDO (26/28-mar =
 *   Viernes Santo / Pascua) y el SQL no se aplicaba hasta la convocatoria.
 * v5.14 (19-sep): la app renderiza modo='INTENSIVO' (encapsPlan.ts: regimenDe() · itemsForDay · simDays con pretest/sim100/dress_rehearsal).
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const ciclo = require('./_encaps_ciclo_v3');
const { CRITICOS_V3, REBOTE_V3, COLA_LARGA, SUB_EJES, WD } = ciclo;
const V6 = require('./gen_fechas_v6');
const F6 = V6.cargarFechasV6(); // v6.00: fuente única de fechas (aborta si un valor guardado ≠ derivado)

// ── argumentos (v6.00: las fechas posicionales son las que NO son valor de una opción; antes «--desde 2027-03-08» sin posicionales
//    se habría leído como D1) ──
const argv = process.argv.slice(2);
const OPCIONES_CON_VALOR = new Set(['--base', '--bk', '--bk-base', '--pretest', '--sims', '--out', '--desde', '--nucleo-hasta', '--slots-barrido',
  '--reparto', '--carril-b', '--orden-base']);
const ISO_RE = /^20\d\d-\d\d-\d\d$/;
const fechasArg = argv.filter((a, i) => ISO_RE.test(a) && !OPCIONES_CON_VALOR.has(argv[i - 1]));
const opt = (k, def) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] ? argv[i + 1] : def; };
const has = (k) => argv.includes(k);
const hoyLima = () => new Date(Date.now() - 5 * 3600 * 1000).toISOString().slice(0, 10);
const D1 = fechasArg[0] || F6.encaps.intensiva_desde;            // v6.00: lun 4-ene-2027 (dia 61)
const EXAMEN = fechasArg[1] || F6.encaps.examen;                  // v6.00: dom 14-mar-2027 PROVISIONAL (se fija con la convocatoria)
const BASE = opt('--base', F6.f1.inicio);                          // v6.00: D1 del mantenimiento = mié 7-oct-2026 (numeración `dia`)
const NUCLEO_HASTA = opt('--nucleo-hasta', F6.encaps.nucleo_hasta); // v6.00: vie 5-mar-2027 (fin del núcleo S2-S9)
const SLOTS = Number(opt('--slots-barrido', '32'));                // v6.00: sustituye al .slice(0, 16) fijo
const BK = opt('--bk', `study_schedule_bk_v600_int_${hoyLima().replace(/-/g, '')}`);
const BK_BASE = opt('--bk-base', 'study_schedule_bk_v600_20261006'); // backup completo del Lote 0 (study_metrics.extra.backup)
const PRETEST = opt('--pretest', null);
const SIMS_ARG = opt('--sims', null);
const REPARTO_ARG = opt('--reparto', null);
const ORDEN_ARG = opt('--orden-base', null);
const CARRIL_B = path.resolve(ROOT, opt('--carril-b', path.join('DATA', 'ENCAPS', '_carril_b_v520_61-92.json')));
const DESDE = opt('--desde', null);
const SIN_TX = has('--sin-tx');
const OUT_ARG = opt('--out', null);
const OUT = OUT_ARG ? path.resolve(OUT_ARG) : path.join(__dirname, '_encaps_intensivo_2027.sql');
const OUT_METRICS = OUT.replace(/\.sql$/i, '') + '.metrics.sql';
for (const [k, v] of [['D1', D1], ['EXAMEN', EXAMEN], ['--base', BASE], ['--nucleo-hasta', NUCLEO_HASTA]]) if (!ISO_RE.test(v)) throw new Error(`${k} inválido: ${v}`);
if (DESDE && !ISO_RE.test(DESDE)) throw new Error('--desde inválido: ' + DESDE);
if (!/^[a-z_][a-z0-9_]*$/.test(BK) || !/^[a-z_][a-z0-9_]*$/.test(BK_BASE)) throw new Error('--bk / --bk-base inválido');
if (!Number.isInteger(SLOTS) || SLOTS < 1) throw new Error('--slots-barrido inválido: ' + SLOTS);
if (D1 >= EXAMEN) throw new Error(`D1 (${D1}) debe ser anterior al examen (${EXAMEN})`);
if (PRETEST && ORDEN_ARG) throw new Error('--pretest y --orden-base son excluyentes (el pre-test re-calcula el orden)');
// v6.00: un escenario que no es el de _fechas_v6.json solo se genera EN SECO (--out): nunca pisa el SQL versionado.
const ESCENARIO_JSON = D1 === F6.encaps.intensiva_desde && EXAMEN === F6.encaps.examen && BASE === F6.f1.inicio && NUCLEO_HASTA === F6.encaps.nucleo_hasta;
if (!ESCENARIO_JSON && !OUT_ARG) throw new Error(`escenario ≠ _fechas_v6.json (D1 ${D1} · EXAMEN ${EXAMEN} · base ${BASE} · núcleo ${NUCLEO_HASTA}): pásale --out <ruta> (prueba en seco) o edita _fechas_v6.json`);

// ── calendario: L-V sin SKIP_V6 (+ Jueves/Viernes Santo del año del examen) ──
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
const dowDe = (s) => fromISO(s).getUTCDay();
const lunesDe = (s) => addDays(s, dowDe(s) === 0 ? -6 : 1 - dowDe(s));
const SKIP_INT = new Set(F6.skip); // v6.00: SKIP_V6 (25-dic, 31-dic, 1-ene, Jueves y Viernes Santo 2027)
{ const p = pascua(fromISO(EXAMEN).getUTCFullYear()); SKIP_INT.add(addDays(iso(p), -3)); SKIP_INT.add(addDays(iso(p), -2)); }
const habiles = (desde, hasta) => V6.habLV(desde, hasta, SKIP_INT).map((fecha) => ({ fecha, dow: dowDe(fecha) }));
const fCorta = (s) => `${['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'][dowDe(s)]} ${+s.slice(8)}-${['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][+s.slice(5, 7) - 1]}`;
const fDia = (s) => fCorta(s).split(' ')[1]; // «4-ene»

const plan = habiles(D1, addDays(EXAMEN, -1));
if (plan.length < 10) throw new Error('la intensiva necesita ≥ 10 hábiles entre D1 y D-1 (S1 + cola)');
const N = plan.length;
const offset = habiles(BASE, addDays(D1, -1)).length; // días L-V ya numerados por el mantenimiento (v6.00: 60 = D1-D60 de F1)
if (ESCENARIO_JSON && offset !== F6.f1.dias) throw new Error(`offset ${offset} ≠ f1.dias ${F6.f1.dias}: la intensiva debe empezar en el dia ${F6.f1.dias + 1}`);
if (plan[N - 1].fecha !== V6.ultimoHabilAntes(EXAMEN, SKIP_INT)) throw new Error('el último hábil del plan no es el D-1 hábil del examen');
{
  const pas = iso(pascua(fromISO(EXAMEN).getUTCFullYear())), dowEx = dowDe(EXAMEN);
  if (SKIP_INT.has(EXAMEN) || EXAMEN === pas) throw new Error(`EXAMEN ${EXAMEN} cae en Semana Santa (Jue ${addDays(pas, -3)} · Vie ${addDays(pas, -2)} · Pascua ${pas}): fecha imposible`);
  if (dowEx !== 0) console.warn(`⚠ EXAMEN ${EXAMEN} no es domingo (${WD[dowEx]}): los 6/6 ENCAPS previos fueron en domingo → la cola (dress jue · medio día vie) se ancla igual a los 5 hábiles previos`);
  if (!F6.encaps.escenarios.includes(EXAMEN)) console.warn(`⚠ EXAMEN ${EXAMEN} no está entre los escenarios de §A5 (${F6.encaps.escenarios.join(', ')})`);
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
const normV3 = (c) => (c === 'IV' || c === 'IV-1+2' ? 'IV-1+IV-2' : c === 'IV-6+7' ? 'IV-6+IV-7' : c);
// ¿el slot (código v3) choca con el código del carril B de ese día? (mismo código de siembra o su paraguas: IV ↔ IV-1/IV-2, V-MED ↔ V-7…)
const choca = (cv3, cb) => { if (!cv3 || !cb) return false; const [cs, par] = siembraDe(normV3(cv3)); return cs === cb || (par || []).includes(cb); };

// ── LOOP v6 (horas definitivas F2; el 16:15 CARRIL B NO va aquí: lo añade la app si existe extra.carril_b) ──
const LOOP = [
  { h: '05:00', seg: 'Anki ENCAPS::Cifras', min: 15 },
  { h: '07:15', seg: 'Repaso espaciado D-1 / D-7 / D-21 (preguntas de los códigos de esos días)', min: 60 },
  { h: '08:15', seg: 'PRE-TEST 10Q CIEGAS del sub-eje del día (sin clave hasta responder)', min: 45 },
  { h: '09:00', seg: 'DEEP PRIME del sub-eje: norma/NTS + cifras', min: 120 },
  { h: '11:00', seg: 'CONSOLIDACIÓN 30Q (60 % hoy · 40 % previos, ≥40 % recall directo) + cierre', min: 60 },
  { h: '12:00', seg: 'Registro (cierre): _registro_resoluciones.json + fallos OLVIDO → tarjeta esa tarde', min: 15 },
  { h: '18:00', seg: 'EVALUACIÓN MODO EXAMEN 20Q · 72 s/Q = 10 del sub-eje del día + 10 de sub-ejes de hace 7-21 días · solución al final', min: 45 },
];
const NOTA_HORAS = 'v6.00: horas definitivas F2';
const NOTA_PROFUNDA = 'pasada profunda solo para sub-ejes < 70 % en su D+21';

// ── simulacros 100Q del núcleo (v6.00: orden §C3 · #1 2025-II · #4 2024-II · #7 2025-I ancla tardía · 2026-I reservado al dress) ──
let SIMS = [
  { label: 'SIM 100Q · examen real 2025-II (clave oficial extraída de los resaltados, BANCO_PROPIO/_examenes_reales_2024-2A_2026-1.json)', fuente: 'exams_txt/2025-2.txt · runner gen_encaps_minisim.js --sim100 2025-2', clave: 'oficial' },
  { label: 'SIM 100Q · Theomed curso 37 "Examen TIPO A/B" o QX Simulacro Virtual 2027-I (A VERIFICAR acceso); si no, propio', fuente: 'Theomed quiz 7934/7935 · QX Simulacros Virtuales · fallback gen_encaps_minisim.js --sim100 propio', clave: 'plataforma' },
  { label: 'SIM 100Q · propio #1 (vector v3, 50/50 viñeta-directa, espejos 2026-II ya liberado + BANCO_PROPIO)', fuente: 'gen_encaps_minisim.js --sim100 propio', clave: 'verificada por ítem' },
  { label: 'SIM 100Q · examen real 2024-II (forma A; clave oficial)', fuente: 'exams_txt/2024-2A.txt · runner --sim100 2024-2A', clave: 'oficial' },
  { label: 'SIM 100Q · QX Simulacro Virtual 2027-I o Theomed (A VERIFICAR acceso); si no, propio', fuente: 'QX Simulacros Virtuales · Theomed curso 37 · fallback gen_encaps_minisim.js --sim100 propio', clave: 'plataforma' },
  { label: 'SIM 100Q · propio #2 (mix vector v3 + rebotes + señales DGE/RM del verano)', fuente: 'gen_encaps_minisim.js --sim100 propio', clave: 'verificada por ítem' },
  { label: 'SIM 100Q · examen real 2025-I (forma A; clave oficial) · ANCLA TARDÍA', fuente: 'exams_txt/2025-1A.txt · runner --sim100 2025-1A', clave: 'oficial' },
  { label: 'SIM 100Q · propio #3 (mix vector v3 + rebotes + cola larga + señales)', fuente: 'gen_encaps_minisim.js --sim100 propio', clave: 'verificada por ítem' },
];
if (SIMS_ARG) SIMS = JSON.parse(fs.readFileSync(path.resolve(SIMS_ARG), 'utf8'));
const horaSim = (n, s) => (s && s.hora) || (n === 7 || n === 8 ? '11:00' : '07:15'); // §C3: 07:15 salvo #7, #8 (y el dress) = 11:00

// ── carril B: export de las filas MANTENIMIENTO 61-92 de v5.20 (OBLIGATORIO) ──
if (!fs.existsSync(CARRIL_B)) throw new Error(`--carril-b: no existe ${CARRIL_B} (es obligatorio en TODAS las ejecuciones: sin él el carril B desaparecería)`);
const cbJson = JSON.parse(fs.readFileSync(CARRIL_B, 'utf8'));
const cbFilas = Array.isArray(cbJson) ? cbJson : cbJson.filas;
if (!Array.isArray(cbFilas) || !cbFilas.length) throw new Error('--carril-b: sin filas');
const cbPorFecha = {};
for (const r of cbFilas) {
  if (r.examen !== 'ENCAPS' || r.modo !== 'MANTENIMIENTO' || !ISO_RE.test(r.fecha)) throw new Error(`--carril-b: fila inválida dia ${r.dia}`);
  if (cbPorFecha[r.fecha]) throw new Error(`--carril-b: fecha repetida ${r.fecha}`);
  cbPorFecha[r.fecha] = r;
}
const cbUltima = cbFilas.map((r) => r.fecha).sort().at(-1);
const cbCodigoDe = (fecha) => { const r = cbPorFecha[fecha]; return r && r.tipo === 'banqueo1h' ? r.codigo : null; };

// ── estructura por fecha: S1 · núcleo · módulos · cola ──
const COLA = plan.slice(-5).map((p) => p.fecha);                         // D-5 … D-1
if (COLA[0] <= NUCLEO_HASTA) throw new Error(`la cola (${COLA[0]} → ${COLA[4]}) se solapa con el núcleo (→ ${NUCLEO_HASTA}): examen demasiado temprano para el esqueleto v6`);
const LUNES_D1 = lunesDe(D1);
const semana = (fecha) => Math.floor((fromISO(fecha) - fromISO(LUNES_D1)) / (7 * 864e5)); // 0 = S1
const S1 = plan.filter((p) => semana(p.fecha) === 0).map((p) => p.fecha);
const PRETEST_FECHA = S1.find((s) => dowDe(s) === 5) || S1.at(-1);           // vie de S1 (si no es hábil, último hábil de S1)
if (ESCENARIO_JSON && PRETEST_FECHA !== F6.encaps.pretest) throw new Error(`pre-test ${PRETEST_FECHA} ≠ encaps.pretest ${F6.encaps.pretest}`);
const NUCLEO = plan.filter((p) => semana(p.fecha) >= 1 && p.fecha <= NUCLEO_HASTA).map((p) => p.fecha);
const ultimoHabilSemana = (s, dentro) => dentro.filter((x) => lunesDe(x) === lunesDe(s)).at(-1);
const SIM_NUCLEO = NUCLEO.filter((s) => s === ultimoHabilSemana(s, NUCLEO));   // §C3: último hábil de cada semana (= viernes)
const SLOTS_BARRIDO = NUCLEO.filter((s) => !SIM_NUCLEO.includes(s));
if (SLOTS_BARRIDO.length !== SLOTS) throw new Error(`el núcleo (${NUCLEO[0]} → ${NUCLEO_HASTA}) tiene ${SLOTS_BARRIDO.length} slots lun-jue de barrido y se pidieron ${SLOTS} (--slots-barrido)`);
const MODULOS = plan.filter((p) => p.fecha > NUCLEO_HASTA && !COLA.includes(p.fecha)).map((p) => p.fecha);
const MOD_ROLES = ['profunda1', 'profunda2', 'rebote', 'vigilancia'];       // orden de llenado del módulo (parcial: el último hábil = sim100)
const semanasModulo = [...new Set(MODULOS.map(lunesDe))];

// ── reparto y orden del barrido (núcleo) ──
const REPARTO_DEF = { 'I-3': 7, 'V-2': 5, 'IV-1+IV-2': 4, 'I-4': 4, 'II-3': 4, 'III-5': 3, 'II-4': 3, 'II-5': 2 };
// orden base r2 (Anexo B): S3, S5, S6 y S7 permutados dentro de su semana → 0 días con el mismo código en la mañana y en el carril B
const ORDEN_BASE_R2 = {
  '2027-01-11': ['I-3', 'V-2', 'II-3', 'I-4'], '2027-01-18': ['IV', 'I-3', 'III-5', 'II-4'], '2027-01-25': ['I-3', 'V-2', 'II-5', 'I-4'],
  '2027-02-01': ['II-3', 'I-3', 'V-2', 'IV'], '2027-02-08': ['I-3', 'III-5', 'I-4', 'II-4'], '2027-02-15': ['II-3', 'I-3', 'V-2', 'IV'],
  '2027-02-22': ['I-3', 'III-5', 'II-4', 'II-5'], '2027-03-01': ['V-2', 'IV', 'II-3', 'I-4'],
};
const leerJSONArg = (a) => JSON.parse(a.trim().startsWith('{') || a.trim().startsWith('[') ? a : fs.readFileSync(path.resolve(a), 'utf8'));
const multiset = (arr) => arr.reduce((o, c) => ((o[c] = (o[c] || 0) + 1), o), {});
const mismoMultiset = (a, b) => { const ka = Object.keys(a).filter((k) => a[k]), kb = Object.keys(b).filter((k) => b[k]); return ka.length === kb.length && ka.every((k) => a[k] === b[k]); };
// intercala pasadas (todos los códigos una vez, luego la 2.ª…) y asigna cada slot al primer código de la cola que NO choque con el carril B
function ordenarConRestriccion(ordenCodigos, porCodigo) {
  const cola = []; const rest = { ...porCodigo }; let alguno = true;
  while (alguno) { alguno = false; for (const c of ordenCodigos) if (rest[c] > 0) { cola.push(c); rest[c]--; alguno = true; } }
  if (cola.length !== SLOTS) throw new Error(`reparto con ${cola.length} slots ≠ ${SLOTS}`);
  return SLOTS_BARRIDO.map((fecha) => {
    const j = cola.findIndex((c) => !choca(c, cbCodigoDe(fecha)));
    if (j < 0) throw new Error(`sin código posible para el slot ${fecha} sin chocar con el carril B (${cbCodigoDe(fecha)})`);
    return cola.splice(j, 1)[0];
  });
}
let ordenSlots, notaBrecha;
if (ORDEN_ARG) {
  const ob = leerJSONArg(ORDEN_ARG);
  ordenSlots = SLOTS_BARRIDO.map((fecha) => { const sem = ob[lunesDe(fecha)]; const c = sem && sem[dowDe(fecha) - 1]; if (!c) throw new Error(`--orden-base: falta el código del slot ${fecha}`); return normV3(c); });
  notaBrecha = 'orden explícito (--orden-base)';
} else if (PRETEST) {
  const pj = JSON.parse(fs.readFileSync(path.resolve(PRETEST), 'utf8'));
  const acc = {};
  for (const p of pj.preguntas || []) { const c = normV3(p.codigo); acc[c] = acc[c] || { n: 0, seguras: 0 }; acc[c].n++; if (p.ok && Number(p.confianza) === 3) acc[c].seguras++; }
  const brecha = Object.entries(acc).map(([c, v]) => ({ c, n: v.n, brecha: v.n * (1 - v.seguras / v.n), pct: v.seguras / v.n })).sort((a, b) => b.brecha - a.brecha);
  // v6.00: SLOTS slots (32): cada crítico ≥ 1 SIEMPRE (§C3); el resto por brecha (críticos y no críticos), tope 3 por cada 16 slots
  const porCodigo = {}; let libres = SLOTS; const tope = Math.ceil((3 * SLOTS) / 16);
  for (const c of CRITICOS_V3) { porCodigo[c] = 1; libres--; }
  for (const b of brecha) { while (libres > 0 && b.brecha > 0 && (porCodigo[b.c] || 0) < tope) { porCodigo[b.c] = (porCodigo[b.c] || 0) + 1; libres--; if (b.brecha < 1.5) break; } if (libres <= 0) break; }
  const orden = Object.keys(porCodigo).sort((a, b) => ((brecha.find((x) => x.c === b) || {}).brecha || 0) - ((brecha.find((x) => x.c === a) || {}).brecha || 0));
  for (let k = 0; libres > 0; k++) { porCodigo[orden[k % orden.length]]++; libres--; } // sobrantes: por orden de brecha
  ordenSlots = ordenarConRestriccion(orden, porCodigo);
  notaBrecha = `re-ordenado por índice de brecha del PRETEST_2026-II (${pj.puntaje || '?'}): ` + brecha.slice(0, 8).map((b) => `${b.c} ${b.brecha.toFixed(1)}`).join(' · ');
} else if (REPARTO_ARG) {
  const rp = leerJSONArg(REPARTO_ARG); const porCodigo = {};
  for (const [c, n] of Object.entries(rp)) porCodigo[normV3(c)] = Number(n);
  ordenSlots = ordenarConRestriccion(Object.keys(porCodigo), porCodigo);
  notaBrecha = 'reparto explícito (--reparto) intercalado por pasadas';
} else {
  ordenSlots = SLOTS_BARRIDO.map((fecha) => { const sem = ORDEN_BASE_R2[lunesDe(fecha)]; const c = sem && sem[dowDe(fecha) - 1]; if (!c) throw new Error(`orden base r2 sin el slot ${fecha} (cambió el núcleo: usa --reparto u --orden-base)`); return normV3(c); });
  if (!mismoMultiset(multiset(ordenSlots), REPARTO_DEF)) throw new Error('el orden base r2 no reproduce el reparto por defecto');
  notaBrecha = 'orden base r2 (reparto por defecto I-3 7 · V-2 5 · IV 4 · I-4 4 · II-3 4 · III-5 3 · II-4 3 · II-5 2; sin pre-test aún)';
}
const choques = SLOTS_BARRIDO.filter((fecha, k) => choca(ordenSlots[k], cbCodigoDe(fecha)));
if (choques.length) throw new Error(`orden del barrido: ${choques.length} día(s) con el mismo código en la mañana y en el carril B: ${choques.join(', ')}`);

// ── siembra ──
const esc = (s) => String(s).replace(/'/g, "''");
const J = (o) => `'${esc(JSON.stringify(o))}'::jsonb`;
const filas = [];
const subCount = {};
const historial = []; // {i, codigo} → repaso D-1 / D-7 / D-21
const repasoDe = (i) => {
  const out = {};
  for (const [k, back] of [['D-1', 1], ['D-7', 7], ['D-21', 21]]) { const h = historial.filter((x) => x.i <= i - back); if (h.length) out[k] = h[h.length - 1].codigo; }
  return out;
};
let simIdx = 0, colaIdx = 0, calIdx = 0;
const calent = ['I-3', 'V-2', 'II-3'];
const watchList = () => { const cl = [0, 1, 2].map((k) => COLA_LARGA[(colaIdx + k) % COLA_LARGA.length]); colaIdx += 3; return cl; };
const simExtra = (s, n) => ({ n: 100, seg_por_q: 72, ...s, hora: horaSim(n, s), num: n, correccion: 'por código v3 + formato (viñeta/cifra) · registro en _registro_resoluciones.json' });
plan.forEach(({ fecha, dow }, i) => {
  const dia = offset + i + 1;
  let tipo, codigo = null, subtema, prio = 'CRITICA', secs = null;
  const extra = { fase: 'INTENSIVA', semana: semana(fecha) + 1 }; // v6.00: sin dias_a_examen (la app lo calcula con exam_date)
  const kCola = COLA.indexOf(fecha);
  if (kCola === 4) {
    tipo = 'medio_dia'; subtema = 'D-1 · MEDIO DÍA: 30 min de cifras + hoja de errores del dress rehearsal · sin material nuevo · dormir 7 h';
    extra.regla = 'doctrina del sprint 2026-II: D-1 medio día, cero preguntas nuevas';
  } else if (kCola === 3) {
    tipo = 'dress_rehearsal'; subtema = 'D-2 · DRESS REHEARSAL 11:00-13:00: simulacro 100Q / 72 s/Q a la hora del examen, ropa, comida y traslado simulados · corrección por código';
    extra.sim = { n: 100, seg_por_q: 72, hora: '11:00', clave: 'consenso QX + Theomed + norma (si no, verificada por ítem)',
      fuente: '2026-I real (QX BanqueApp / Theomed) SOLO si hay clave por consenso QX+Theomed+norma; si no, gen_encaps_minisim.js --sim100 propio (mix vector v3, 50/50, rebotes + señales)' };
  } else if (kCola === 1 || kCola === 2) {
    tipo = 'repaso_final'; prio = 'ALTA';
    subtema = 'REPASO FINAL · sin material nuevo: errores del registro + cifras + mapas en blanco de los 8 críticos';
    extra.cola = 'repaso_final'; extra.repaso = repasoDe(i);
  } else if (kCola === 0) {
    tipo = 'loop';
    subtema = 'COLA · PASADA PROFUNDA del sub-eje peor (según los SIM 100Q y el registro) · sin material nuevo fuera del sub-eje';
    extra.cola = 'profunda'; extra.loop = LOOP; extra.nota_horas = NOTA_HORAS; extra.repaso = repasoDe(i); extra.regla = NOTA_PROFUNDA;
  } else if (fecha === PRETEST_FECHA) {
    tipo = 'pretest'; subtema = 'PRE-TEST 2026-II · 100Q / 72 s/Q · examen real 2026-II (clave oficial 100/100) · corrección por código vs vector v3 · umbral ≥70';
    extra.sim = { n: 100, seg_por_q: 72, hora: '07:15', fuente: '_examen_2026-2_items.json · runner gen_encaps_minisim.js --pretest', doc: 'PRETEST_2026-II.md', registro: 'ronda PRETEST_2026-II' };
  } else if (S1.includes(fecha)) {
    if (fecha === S1[0]) {
      tipo = 'senales'; subtema = 'RE-SCAN DE SEÑALES: QX Tendencias 2027-I · boletín DGE/sala situacional · RM/NTS MINSA publicadas desde sep-2026 · convocatoria SERUMS 2027-I → actualizar SENALES_2027-I.md y pesos del v3';
      extra.doc = 'SENALES_2027-I.md'; prio = 'ALTA';
    } else {
      tipo = 'loop'; codigo = calent[calIdx % calent.length]; calIdx++;
      subtema = `CALENTAMIENTO (sin material nuevo) · ${temaInfo(codigo).label}`;
      extra.loop = LOOP; extra.nota_horas = NOTA_HORAS; extra.repaso = repasoDe(i); historial.push({ i, codigo });
    }
  } else if (SIM_NUCLEO.includes(fecha) || (MODULOS.includes(fecha) && fecha === ultimoHabilSemana(fecha, MODULOS))) {
    tipo = 'sim100'; simIdx++;
    const enModulo = MODULOS.includes(fecha);
    const s = (!enModulo && SIMS[simIdx - 1]) || { label: `SIM 100Q · módulo de extensión · propio #${simIdx - 5} (gen_encaps_minisim.js --sim100 propio)`, fuente: 'BANCO_PROPIO · gen_encaps_minisim.js --sim100 propio', clave: 'verificada por ítem' };
    subtema = `SIMULACRO ${simIdx} · ${s.label}`;
    extra.sim = simExtra(s, simIdx);
    if (enModulo) { extra.modulo = { semana: semanasModulo.indexOf(lunesDe(fecha)) + 1, rol: 'sim100' }; if (dow !== 5) extra.sim.nota = `en ${WD[dow]} por día sin sesión (regla del módulo parcial)`; }
  } else if (SLOTS_BARRIDO.includes(fecha)) {
    tipo = 'loop';
    const cv3 = ordenSlots[SLOTS_BARRIDO.indexOf(fecha)];
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
  } else if (MODULOS.includes(fecha)) {
    const m = semanasModulo.indexOf(lunesDe(fecha));
    const k = MODULOS.filter((x) => lunesDe(x) === lunesDe(fecha) && x < fecha).length;
    const rol = MOD_ROLES[Math.min(k, 3)];
    tipo = 'loop'; extra.loop = LOOP; extra.nota_horas = NOTA_HORAS; extra.repaso = repasoDe(i); extra.modulo = { semana: m + 1, rol };
    if (rol === 'profunda1' || rol === 'profunda2') {
      subtema = `MÓDULO DE EXTENSIÓN · PASADA PROFUNDA #${rol === 'profunda1' ? 1 : 2} del sub-eje peor (según los SIM 100Q y el registro)`;
      extra.regla = NOTA_PROFUNDA;
    } else if (rol === 'rebote') {
      codigo = REBOTE_V3[m % REBOTE_V3.length]; prio = 'ALTA';
      const se = SUB_EJES[codigo]; const eje = se ? se.ejes[0] : null;
      subtema = `MÓDULO · REBOTE ${codigo} (cola larga, anti-persistente, lección L4) · ${eje ? eje.label : temaInfo(codigo).label}`;
      const cl = COLA_LARGA[colaIdx % COLA_LARGA.length]; colaIdx++;
      secs = [{ codigo: siembraDe(cl.codigo)[0], subtema: cl.label, prioridad: 'MEDIA', rol: 'cola_larga', q: '5-6' }];
      extra.secundario = cl.codigo; historial.push({ i, codigo });
    } else {
      const cl = watchList();
      codigo = siembraDe(cl[0].codigo)[0]; prio = 'MEDIA';
      subtema = `MÓDULO · LISTA DE VIGILANCIA (cola larga) · ${cl[0].codigo}: ${cl[0].label}`;
      if (subtema.length > 240) subtema = subtema.slice(0, 237) + '…';
      secs = cl.slice(1).map((c) => ({ codigo: siembraDe(c.codigo)[0], subtema: c.label, prioridad: 'MEDIA', rol: 'cola_larga', q: '8-10' }));
      extra.cola_larga = cl.map((c) => c.codigo); historial.push({ i, codigo });
    }
    extra.repaso_registro = 'repaso multi-temporal de TODO _registro_resoluciones.json (fallos CCSN/CONCEPTO/OLVIDO) en el segmento 07:15';
  } else {
    throw new Error(`fecha sin rol en el esqueleto: ${fecha}`);
  }
  // ── carril B (16:15): fila MANTENIMIENTO v5.20 de la misma fecha · mini-sim absorbido · reposición ──
  const cb = cbPorFecha[fecha];
  if (cb) {
    if (cb.dia !== dia) throw new Error(`carril B: la fila mant. ${cb.dia} (${fecha}) cae en el dia ${dia} de la intensiva: la numeración no coincide`);
    if (cb.tipo === 'banqueo1h') {
      if (['sim100', 'pretest', 'dress_rehearsal', 'medio_dia'].includes(tipo)) throw new Error(`carril B banqueo1h en un día ${tipo} (${fecha})`);
      extra.carril_b = { origen: 'mantenimiento_v5.20', dia_mant: cb.dia, fecha: cb.fecha, tipo: 'banqueo1h', codigo: cb.codigo, subtema: cb.subtema,
        prioridad: cb.prioridad, nts: cb.nts ?? null, temas_secundarios: cb.temas_secundarios, extra: cb.extra };
    } else if (cb.tipo === 'mini_sim') {
      if (!['sim100', 'pretest'].includes(tipo)) throw new Error(`mini-sim absorbido en un día ${tipo} (${fecha}): debe ser el SIM 100Q del viernes`);
      extra.minisim_absorbido = { dia_mant: cb.dia, subtema: cb.subtema, extra: cb.extra };
    } else throw new Error(`carril B: tipo desconocido ${cb.tipo} (${fecha})`);
  } else if (fecha > cbUltima && fecha <= COLA[2] && dow >= 1 && dow <= 4 && !['sim100', 'pretest', 'dress_rehearsal', 'medio_dia'].includes(tipo)) {
    extra.carril_b = { tipo: 'reposicion', regla: '1) instancias de 61-92 no hechas (study_checks sin ✓), en orden; 2) si no hay: lista de vigilancia = temasCalientes() del día' };
  }
  filas.push({ dia, fecha, dow, tipo, codigo, subtema, prio, secs, extra });
});

// ── verificación (aborta si algo no cuadra; no escribe nada) ──
const fallos = [];
const ok = (cond, msg) => { if (!cond) fallos.push(msg); };
ok(filas.every((r) => r.dow >= 1 && r.dow <= 5), 'hay filas en fin de semana');
ok(filas.every((r) => !SKIP_INT.has(r.fecha)), 'hay filas en SKIP');
ok(filas.every((r, k) => r.dia === offset + 1 + k), '`dia` no es contiguo');
ok(JSON.stringify(filas.slice(-5).map((r) => r.tipo)) === JSON.stringify(['loop', 'repaso_final', 'repaso_final', 'dress_rehearsal', 'medio_dia']), 'la cola no es loop · repaso_final ×2 · dress · medio_dia');
ok(filas.slice(-5).map((r) => r.fecha).join() === COLA.join(), 'la cola no son los 5 últimos hábiles');
ok(filas.filter((r) => r.extra.critico_v3).length === SLOTS, `slots de barrido ≠ ${SLOTS}`);
ok(filas.every((r) => !('dias_a_examen' in r.extra)), 'quedó extra.dias_a_examen');
const nCbB = filas.filter((r) => r.extra.carril_b && r.extra.carril_b.tipo === 'banqueo1h').length;
const nCbM = filas.filter((r) => r.extra.minisim_absorbido).length;
const nRepo = filas.filter((r) => r.extra.carril_b && r.extra.carril_b.tipo === 'reposicion').length;
ok(nCbB === cbFilas.filter((r) => r.tipo === 'banqueo1h').length, `carril B banqueo1h ${nCbB} ≠ JSON`);
ok(nCbM === cbFilas.filter((r) => r.tipo === 'mini_sim').length, `mini-sims absorbidos ${nCbM} ≠ JSON`);
ok(cbFilas.every((r) => filas.some((x) => x.fecha === r.fecha)), 'hay filas del carril B fuera de la intensiva');
ok(filas.every((r) => r.tipo !== 'sim100' || !r.extra.carril_b), 'carril B en un día de SIM');
for (const lun of semanasModulo) { const sem = MODULOS.filter((x) => lunesDe(x) === lun); const r = filas.find((x) => x.fecha === sem.at(-1)); ok(r && r.tipo === 'sim100', `módulo ${lun}: el último hábil no es el sim100`); }
ok(filas.filter((r) => r.tipo === 'pretest').length === 1 && filas.find((r) => r.tipo === 'pretest').fecha === PRETEST_FECHA, 'pre-test');
const choquesFinal = filas.filter((r) => r.extra.critico_v3 && r.extra.carril_b && choca(r.extra.critico_v3, r.extra.carril_b.codigo)).map((r) => r.fecha);
ok(!choquesFinal.length, `choques barrido = carril B: ${choquesFinal.join(', ')}`);
if (fallos.length) { console.error('⛔ verificación:\n  · ' + fallos.join('\n  · ')); process.exit(1); }

// ── SQL ──
const emitidas = DESDE ? filas.filter((r) => r.fecha >= DESDE) : filas;
if (!emitidas.length) throw new Error(`--desde ${DESDE}: no queda ninguna fila (la intensiva termina el ${plan[N - 1].fecha})`);
if (DESDE && !filas.some((r) => r.fecha === DESDE)) console.warn(`⚠ --desde ${DESDE} no es un día de la intensiva: se emiten las filas desde ${emitidas[0].fecha}`);
const values = emitidas.map((r) => `('ENCAPS',${r.dia},'${r.fecha}','${WD[r.dow]}','${r.tipo}',${r.codigo ? `'${r.codigo}'` : 'NULL'},'${esc(r.subtema)}','${r.prio}','INTENSIVO','[]'::jsonb,'[]'::jsonb,'[]'::jsonb,${r.secs ? J(r.secs) : 'NULL'},${J(r.extra)})`);
const delFiltro = `examen = 'ENCAPS' AND modo = 'INTENSIVO'${DESDE ? ` AND fecha >= '${DESDE}'` : ''}`;
const nSimNucleo = filas.filter((r) => r.tipo === 'sim100' && !r.extra.modulo).length;
const repoFechas = filas.filter((r) => r.extra.carril_b && r.extra.carril_b.tipo === 'reposicion').map((r) => r.fecha);
const tope = V6.convocatoriaTopeDe(EXAMEN);
const provisional = ESCENARIO_JSON ? !!F6.encaps.provisional : true;
const examenTarget = EXAMEN === '2027-03-14' && provisional
  ? '2027-03-14 (dom · PROVISIONAL v6.00: «más o menos el 14»; 6/6 ENCAPS previos en domingo; se fija con la convocatoria; regla convocatoria = examen − 25 d → sin convocatoria al mié 17-feb se descarta el 14-mar y se pasa al escenario siguiente)'
  : provisional
    ? `${EXAMEN} (${fCorta(EXAMEN).split(' ')[0]} · PROVISIONAL v6.00: escenario de §A5; se fija con la convocatoria; regla convocatoria = examen − 25 d → sin convocatoria al ${fCorta(tope)} se descarta el ${fDia(EXAMEN)} y se pasa al escenario siguiente)`
    : `${EXAMEN} (${fCorta(EXAMEN).split(' ')[0]} · CONFIRMADO por la convocatoria SERUMS 2027-I · v6.00)`;
const nucleoDesde = NUCLEO[0], trasNucleo = plan.find((p) => p.fecha > NUCLEO_HASTA).fecha;
const metricsExtra = {
  d1: BASE, dias_ciclo: offset,
  regimen: `MANTENIMIENTO_2027-1 v6.19 (${offset} d) + INTENSIVA v6.00 (núcleo ${fDia(D1)} → ${fDia(NUCLEO_HASTA)} + cola anclada)`,
  exam_date: EXAMEN, examen_target: examenTarget, backup: BK_BASE,
  intensiva: {
    desde: plan[0].fecha, hasta: plan[N - 1].fecha, dias: `${offset + 1}-${offset + N}`, pretest: PRETEST_FECHA,
    nucleo: { desde: nucleoDesde, hasta: NUCLEO_HASTA, slots_barrido: SLOTS, sims: nSimNucleo },
    cola: { desde: COLA[0], hasta: COLA[4], regla: 'D-5…D-1 anclada al examen' },
    modulos: Math.round((MODULOS.length / 5) * 10) / 10, modulos_dias: MODULOS.length,
    carril_b: { desde: cbFilas.map((r) => r.fecha).sort()[0], hasta: cbUltima, filas_mant: `${Math.min(...cbFilas.map((r) => r.dia))}-${Math.max(...cbFilas.map((r) => r.dia))}`, campo: 'extra.carril_b',
      reposicion: repoFechas.length ? `${repoFechas[0]} → ${repoFechas.at(-1)}` : null },
    backup: BK,
    regenerar: `tras el PRE-TEST (${fCorta(PRETEST_FECHA)}): gen_encaps_intensivo_2027.js --pretest <export.json> --desde ${nucleoDesde}; tras la convocatoria: con la fecha real --desde ${trasNucleo} (filas > ${NUCLEO_HASTA}); --carril-b siempre`,
  },
};
const sqlMetrics = `UPDATE study_metrics SET extra = jsonb_set(COALESCE(extra, '{}'::jsonb) || ${J(metricsExtra)}, '{horarios}', COALESCE(extra->'horarios', '{}'::jsonb) || ${J({ intensiva: LOOP })}, true) WHERE examen = 'ENCAPS';`;
const cabecera = `-- ENCAPS FASE INTENSIVA 2027-I · v6.00 · generado por gen_encaps_intensivo_2027.js (${hoyLima()})
-- ${filas.length} días L-V · ${plan[0].fecha} → ${plan[N - 1].fecha} · dia ${offset + 1}-${offset + N} (continúa la cuenta del mantenimiento desde ${BASE})${DESDE ? ` · --desde ${DESDE}: se emiten ${emitidas.length} filas (dia ${emitidas[0].dia}-${emitidas.at(-1).dia})` : ''}
-- EXAMEN ${EXAMEN} (${WD[dowDe(EXAMEN)]}${provisional ? ' · PROVISIONAL' : ''}) · núcleo ${nucleoDesde} → ${NUCLEO_HASTA} (${SLOTS} slots + ${nSimNucleo} SIM) · módulos ${MODULOS.length} d · cola ${COLA[0]} → ${COLA[4]} · SKIP dentro: ${[...SKIP_INT].filter((f) => f >= D1 && f <= plan[N - 1].fecha).join(', ') || 'ninguno'}
-- barrido: ${notaBrecha}
-- carril B (16:15) = ${path.relative(ROOT, CARRIL_B).replace(/\\/g, '/')}: ${nCbB} banqueo1h + ${nCbM} mini-sims absorbidos + ${nRepo} reposición · 0 choques de código con el barrido
-- Borra SOLO modo='INTENSIVO'${DESDE ? ` con fecha >= ${DESDE}` : ''}; NO toca el MANTENIMIENTO (las filas MANTENIMIENTO 61-92 de v5.20 las borra el orquestador antes, Lote 4).`;
const sql = SIN_TX
  ? `${cabecera}
-- --sin-tx: sin BEGIN/COMMIT ni backup (los pone el bloque del Lote 4) · el UPDATE de study_metrics.extra va en ${path.basename(OUT_METRICS)}
DELETE FROM study_schedule WHERE ${delFiltro};
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, codigo, subtema, prioridad, modo, videos, theomed, material_comp, temas_secundarios, extra) VALUES
${values.join(',\n')};
`
  : `${cabecera}
BEGIN;
DO $$ BEGIN IF to_regclass('public.${BK}') IS NOT NULL THEN RAISE EXCEPTION 'el backup ${BK} YA EXISTE: no se pisa (pásale --bk ${BK}b)'; END IF; END $$;
CREATE TABLE ${BK} AS SELECT * FROM study_schedule WHERE examen = 'ENCAPS';
DO $$ BEGIN IF EXISTS (SELECT 1 FROM study_schedule WHERE examen = 'ENCAPS' AND modo <> 'INTENSIVO' AND dia BETWEEN ${emitidas[0].dia} AND ${emitidas.at(-1).dia}) THEN RAISE EXCEPTION 'hay filas no INTENSIVO en dia ${emitidas[0].dia}-${emitidas.at(-1).dia} (MANTENIMIENTO 61-92 de v5.20): bórralas antes (Lote 4)'; END IF; END $$;
DELETE FROM study_schedule WHERE ${delFiltro};
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, codigo, subtema, prioridad, modo, videos, theomed, material_comp, temas_secundarios, extra) VALUES
${values.join(',\n')};
${sqlMetrics}
COMMIT;
`;
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, sql, 'utf8');
if (SIN_TX) fs.writeFileSync(OUT_METRICS, `-- study_metrics.extra (ENCAPS) · v6.00 · gen_encaps_intensivo_2027.js (${hoyLima()}) · examen ${EXAMEN} · va DESPUÉS del INSERT de ${path.basename(OUT)} (Lote 4, misma transacción)\n${sqlMetrics}\n`, 'utf8');

// ── informe ──
const tipos = {};
for (const r of filas) tipos[r.tipo] = (tipos[r.tipo] || 0) + 1;
console.log('OK →', OUT, SIN_TX ? `(+ ${OUT_METRICS})` : '', '·', emitidas.length, 'filas emitidas ·', plan[0].fecha, '→', plan[N - 1].fecha, '· dia', offset + 1, '-', offset + N, '· examen', EXAMEN);
console.log('tipos:', JSON.stringify(tipos), '· sim100 núcleo', nSimNucleo, '· sim100 módulo', filas.filter((r) => r.tipo === 'sim100' && r.extra.modulo).length, '· módulos', MODULOS.length, 'd');
console.log('carril B: banqueo1h', nCbB, '· mini-sim absorbido', nCbM, '· reposición', nRepo, repoFechas.length ? `(${repoFechas[0]} → ${repoFechas.at(-1)})` : '', '· choques', choquesFinal.length);
console.log('barrido (' + SLOTS + ' slots):', ordenSlots.map((c) => (c === 'IV-1+IV-2' ? 'IV' : c)).join(' · '));
console.log('SIM:', filas.filter((r) => r.tipo === 'sim100').map((r) => `${r.fecha} #${r.extra.sim.num} ${r.extra.sim.hora}`).join(' · '));
console.log('cola:', filas.slice(-5).map((r) => `${r.fecha} ${r.tipo}`).join(' · '));
