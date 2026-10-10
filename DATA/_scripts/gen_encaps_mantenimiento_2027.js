/**
 * gen_encaps_mantenimiento_2027.js — siembra el ciclo ENCAPS MANTENIMIENTO 2027-I en Supabase.
 *
 * Régimen v5.20 (D1 = mié 2026-10-07; v5.19: mar 6-oct → lun 15-feb · v5.18: lun 5-oct → vie 12-feb · v5.17: jue 1-oct → mié 10-feb · v5.16: lun 28-sep · v5.15: mié 23-sep · v5.14: lun 21-sep): ENCAPS = 1h/día (16:15-17:15 L-V) hasta el mar 16-feb-2027
 * (92 días L-V = 75 banqueo1h + 17 mini_sim, skip 25-dic/31-dic/1-ene; sábado y domingo LIBRES; régimen MANTENIMIENTO_2027-1 v6.18, backup study_schedule_bk_1006 + study_metrics_bk_1006; v5.19: v6.17 / bk_1005; v5.18: v6.16 / bk_1003; v5.17: v6.15 / bk_0930). El bloque principal de la
 * mañana es USMLE Step 1. Días 93-96 (mié 17 → lun 22-feb) = cierre + examen Step 1, sin fila. mar 23-feb → mar 9-mar-2027: fase intensiva
 * (modo INTENSIVO, días 97-107, YA sembrada el 6-oct por gen_encaps_intensivo_2027.js; este script no la toca).
 * EXAMEN ENCAPS 2027-I: MIÉ 10-MAR-2027 (v5.20, fijado por Joseph el 6-oct-2026; antes «fines de marzo», asumido 28-mar = Domingo de Pascua).
 *   La FASE INTENSIVA arranca el mar 23-feb (día siguiente al examen Step 1 del lun 22-feb) → gen_encaps_intensivo_2027.js.
 *
 *   · lun-jue = banco del día (20-25Q) con rotación de 4 semanas ponderada por el PRONÓSTICO v3
 *     (vector II 30 · I 27 · V 21 · III 13 · IV 9 · 8 críticos I-3 V-2 II-3 III-5 I-4 II-5 II-4 IV-1/2
 *     + ALTA con flag de rebote II-1 II-11 II-8). I-3 y V-2 caen 2× por ciclo (top-2).
 *       - SUB-EJE por instancia (columna subtema + extra.sub_eje): V-2 4 planeamiento / 3 clima+calidad /
 *         3 residuos · I-3 rota los 8 sub-ejes del núcleo v3 · IV-1/2 4 sub-ejes · II-3 4 sub-ejes …
 *       - SECUNDARIO (temas_secundarios, 4-5Q de las 20-25Q): rota los 17 códigos de cola larga.
 *   · vie = mini-simulacro 25Q mixto cronometrado (72 s/Q) con la receta fija en extra
 *     ({II:8,I:7,V:5,III:3,IV:2, viñeta 50%, ≥10Q críticos, ≥5Q fallos previos}) + 2 códigos de
 *     cola larga en temas_secundarios (17 viernes, vie 9-oct → vie 12-feb en v5.20, los mismos que en v5.19 y v5.18 → cada código cae ~2×; v5.17: vie 2-oct → vie 5-feb). sim_n = dia (study_sim_scores).
 *
 * Subtemas y tiers se leen de src/lib/encapsCobertura.ts (NO se inventan); ciclo/sub-ejes/cola larga
 * viven en _encaps_ciclo_v3.js (compartido con gen_encaps_semana.js).
 *
 * Uso:
 *   node DATA/_scripts/gen_encaps_mantenimiento_2027.js [D1=_fechas_v6.json f1.inicio (v6.01: 2026-10-12)] [--bk study_schedule_bk_YYYYMMDD]
 *        [--override <json|ruta.json>] [--sin-acumulado] [--bk-reemplazar] [--hasta 2026-12-30] [--de-hasta 2027-02-18] [--out <ruta.sql>]
 *        [--pendientes-de <ruta.sql | git:<rev>:<ruta>>] [--no-persistir]
 *        (defaults v6.01: D1 = f1.inicio, --de-hasta 2027-02-18; v6.00: --hasta = _fechas_v6.json f1.fin, --de-hasta 2027-02-16; v5.20: --hasta 2027-02-16 y sin --de-hasta)
 *
 *   --override: {"semanas":{"<lunes ISO>":{"principal":["I-3","V-2","II-5","IV-1"],"secundarios":["II-2","I-10","V-6","II-6"],"motivo":"…"}}}
 *               (lo emite gen_encaps_semana.js como SEMANAS/override_<lunes>.json; sustituye SOLO esa semana).
 *   OVERRIDES ACUMULADOS (regla desde el 12-sep-2026): el generador lee SIEMPRE por defecto
 *               DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/overrides_acumulado.json (merge de todas las semanas ya
 *               aplicadas, lo mantiene gen_encaps_semana.js). Un --override se AÑADE encima (solo esa semana) y se
 *               persiste en el acumulado, así la semana N nunca borra los overrides de las semanas 1..N-1 ni
 *               devuelve las filas pasadas a la rotación base. --sin-acumulado lo ignora (solo para depurar).
 *   --bk:       nombre del backup. Por defecto study_schedule_bk_<YYYYMMDD> (fecha Lima de hoy). El SQL ABORTA si
 *               ese backup ya existe (así nunca se pisa el backup de una corrida anterior del mismo día): pásale
 *               --bk study_schedule_bk_<YYYYMMDD>b, o --bk-reemplazar para emitir DROP TABLE IF EXISTS (explícito).
 *   El DELETE va filtrado por modo = 'MANTENIMIENTO': las filas INTENSIVO (v5.20: mar 23-feb → mar 9-mar-2027, días 97-107, gen_encaps_intensivo_2027.js)
 *   no se tocan aunque convivan en study_schedule.
 * Emite DATA/_scripts/_encaps_mantenimiento_2027.sql (guarda de backup → backup → delete filtrado → insert) y al final
 * imprime la VERIFICACIÓN esperada (select modo,tipo,count(*)) para pegarla tras execute_sql. Aplicar por MCP execute_sql.
 * Pipeline de corrimiento (cada día sin estudiar = +1): node … <nueva fecha> → execute_sql.
 *
 * v6.00 (6-oct-2026, V6_ESPEC §C1/§C3): el mantenimiento queda en F1 = dia 1-60 (mié 7-oct → mié 30-dic-2026, 49 banqueo1h + 11 mini_sim)
 *   y esas 60 filas vivas NO se regeneran en la siembra v6 (se conservan tal cual en Supabase). Las 32 filas 61-92 de v5.20 pasan al
 *   CARRIL B de la intensiva (extra.carril_b de las filas INTENSIVO, gen_encaps_intensivo_2027.js). Cambios para que un uso futuro
 *   (p.ej. el override semanal que imprime gen_encaps_semana.js) no rompa nada:
 *   · HASTA por defecto = _fechas_v6.json f1.fin (2026-12-30) → sin --hasta ya no re-inserta MANTENIMIENTO 61-92 sobre las INTENSIVO 61-92.
 *   · --de-hasta 2027-02-16 (default): extra.de (nº de instancias del código) se cuenta sobre el rango de v5.20 (D1 → 16-feb), así las
 *     filas 1-60 regeneradas son IDÉNTICAS a las vivas (con --hasta 2026-12-30 a secas cambiarían 49 de 60: p.ej. dia 2 de 10 → 6). En esa
 *     pasada previa los overrides de semanas posteriores a HASTA NO cuentan (las filas 61-92 viven congeladas en el carril B).
 *   · guarda SQL al principio: aborta si hay filas no MANTENIMIENTO (INTENSIVO) con dia ≤ última fila emitida.
 *   · días de plan sin SKIP_V6 (_fechas_v6.json: incluye Jueves y Viernes Santo 2027).
 *   · el SQL versionado _encaps_mantenimiento_2027.sql sigue siendo la siembra v5.20 (92 filas): gen_encaps_minisim.js lee de él el banco
 *     y la eval de las fechas 61-92 (= carril B). No se regenera en v6 (regenerarlo con HASTA 30-dic quitaría esas filas al runner).
 *     [v6.01: ya NO vale — ver abajo: el SQL versionado pasa a ser la siembra F1 v6.01 y el runner lee el carril B del SQL de la intensiva]
 *
 * v6.01 (10-oct-2026, corrimiento RÍGIDO de Joseph «todo empieza el lunes 12»): no se estudió mié 7, jue 8 ni vie 9-oct → D1 = LUN 12-OCT-2026
 *   (= _fechas_v6.json f1.inicio, clave `corrimientos`). La F1 NO se alarga (el lun 4-ene empieza la intensiva) → F1 = dia 1-57 (lun 12-oct →
 *   mié 30-dic) = 47 banqueo1h + 10 mini_sim (vie 16-oct … vie 18-dic; el último = CHECKPOINT DEL AÑO, V6_ESPEC §I: extra.checkpoint + sufijo
 *   en subtema). La rotación corre RÍGIDA por slots (slot k de lun-jue → slot k; mini-sim k → viernes k): nada se fusiona ni se recorta.
 *   · D1 por defecto = F6.f1.inicio (antes la constante '2026-10-07'); las fechas posicionales ya no confunden el valor de una opción
 *     (antes «--hasta 2026-12-30» sin D1 delante se leía como D1).
 *   · --de-hasta por defecto 2027-02-18 (= el rango v5.20 de 75 slots lun-jue, mié 7-oct → mar 16-feb, corrido +3 hábiles): extra.de queda
 *     IDÉNTICO al de v6.00 y coherente con el carril B (filas 61-92 de v5.20, cuyo `de` se contó sobre esos mismos 75 slots). Con el D1 y
 *     el --de-hasta por defecto el generador ABORTA si la pasada previa no cuenta exactamente 75 slots.
 *   · OVERFLOW (lo que la F1 vieja tenía y la nueva no cabe): --pendientes-de <SQL de la F1 anterior> (v6.01: git show regimen-v6.00:
 *     DATA/_scripts/_encaps_mantenimiento_2027.sql, filas con fecha ≤ HASTA = las 60 vivas en Supabase, md5 de filas verificado) → multiset
 *     (codigo, sub_eje, instancia) de las banqueo1h viejas MENOS las nuevas = PENDIENTES F1 (v6.01: 2 = dia 59 II-8 paquetes_tamizaje #3 y
 *     dia 60 II-3 cadena_frio #4) → DATA/ENCAPS/_pendientes_f1.json (copia literal de la fila vieja) → gen_encaps_intensivo_2027.js los pone
 *     EXPLÍCITOS en los primeros días de REPOSICIÓN del carril B (mié 17-feb = dia 90, jue 18-feb = dia 91), antes de la regla genérica.
 *     El mini-sim que no cabe (v6.01: el 11.º, cola larga II-6 + II-10, vie 18-dic de v6.00 = fila mant. 53) TAMPOCO se descarta (regla de
 *     Joseph, 10-oct: prohibido absorber/descartar): es un PENDIENTE F1 de tipo 'mini_sim' (copia literal de la fila vieja: subtema, prioridad,
 *     temas_secundarios y extra con la receta 25Q · 72 s/Q · cola larga II-6 + II-10) → gen_encaps_intensivo_2027.js lo REPONE en el primer
 *     día de reposición libre tras las banqueo1h (lun 22-feb-2027 = dia 93; el vie 19-feb es SIM 100Q). Orden en el JSON: banqueo1h por
 *     dia_mant y después los mini-sims. Cada fila lleva `destino` y, cuando la intensiva ya la colocó, `reposicion` {dia, fecha, carril}
 *     (lo escribe gen_encaps_intensivo_2027.js; este generador los conserva al reescribir el JSON).
 *     Aborta si alguna instancia NUEVA no existía en la F1 vieja (el corrimiento no puede inventar contenido).
 *   · el SQL versionado _encaps_mantenimiento_2027.sql vuelve a ser la siembra REAL del mantenimiento (57 filas v6.01; guarda «INTENSIVO
 *     con dia ≤ 57» intacta). gen_encaps_minisim.js lee las fechas del carril B (61-92 de v5.20 y las reposiciones F1) del SQL de la
 *     intensiva (_encaps_intensivo_2027.sql, extra.carril_b), así que ya no depende de las 92 filas v5.20 de este fichero.
 *   Siembra v6.01: node DATA/_scripts/gen_encaps_mantenimiento_2027.js --bk study_schedule_bk_v601_mant_20261010
 *     --pendientes-de git:regimen-v6.00:DATA/_scripts/_encaps_mantenimiento_2027.sql   (acepta también la ruta de un .sql)
 *   (el orquestador aplica el SQL combinado DELETE ENCAPS + 57 + 50 sin BEGIN/COMMIT; backup completo previo study_schedule_bk_v601_20261010).
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const { CICLO, SUB_EJES, COLA_LARGA, RECETA_MINISIM, WD, fechas, lunesDe } = require('./_encaps_ciclo_v3');
const F6 = require('./gen_fechas_v6').cargarFechasV6(); // v6.00: fuente única de fechas (aborta si guardado ≠ derivado)
const SKIP_V6 = new Set(F6.skip);
const ACUMULADO = path.join(ROOT, 'DATA', 'ENCAPS', 'TRACKING_ERRORES', 'SEMANAS', 'overrides_acumulado.json');

// ── argumentos ──
const argv = process.argv.slice(2);
// v6.01: la fecha posicional es la que NO es valor de una opción (antes «--hasta 2026-12-30» sin D1 delante se leía como D1)
const OPCIONES_CON_VALOR = new Set(['--bk', '--override', '--hasta', '--de-hasta', '--out', '--pendientes-de']);
const fechasArg = argv.filter((a, i) => /^20\d\d-\d\d-\d\d$/.test(a) && !OPCIONES_CON_VALOR.has(argv[i - 1]));
const D1 = fechasArg[0] || F6.f1.inicio; // v6.01: lun 12-oct (= _fechas_v6.json f1.inicio) · v6.00/v5.20: mié 7-oct (v5.19: mar 6-oct · v5.18: lun 5-oct · v5.17: jue 1-oct)
const opt = (k, def) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] ? argv[i + 1] : def; };
const has = (k) => argv.includes(k);
const HASTA = opt('--hasta', F6.f1.fin); // v6.00 (6-oct): f1.fin = mié 30-dic-2026 (dia 60; las filas 61-92 de v5.20 viven en el carril B de la intensiva) · v5.20 (6-oct, DEFINITIVA): mar 16-feb (+1 hábil; 92 días intactos; = D92 del Step 1) · v5.19 (5-oct): lun 15-feb (+1 hábil; 92 días intactos) · v5.18 (3-oct): vie 12-feb (+2 hábiles; 92 días intactos) · v5.17 (30-sep): mié 10-feb · el fin se ALARGA 3 hábiles más (v5.16: 5-feb · v5.15: 2-feb · v5.14: 29-ene) para conservar los 92 días del mantenimiento — "no perder sesiones" (Joseph); sigue antes del examen Step 1 (v5.20: lun 22-feb-2027; v5.19: vie 19-feb; v5.18: jue 18-feb; v5.17: mar 16-feb; v5.16: jue 11-feb)
const hoyLima = () => new Date(Date.now() - 5 * 3600 * 1000).toISOString().slice(0, 10);
const BK = opt('--bk', `study_schedule_bk_${hoyLima().replace(/-/g, '')}`);
const BK_REEMPLAZAR = has('--bk-reemplazar');
// v6.01: 2027-02-18 = los mismos 75 slots lun-jue de v5.20 (mié 7-oct → mar 16-feb) corridos +3 hábiles → extra.de idéntico a v6.00 y al
//   del carril B · v6.00: '2027-02-16' (rango de v5.20 para extra.de; las filas 1-60 no cambiaban; §C1)
const DE_HASTA_DEF = '2027-02-18';
const SLOTS_V520 = 75; // banqueo1h del rango v5.20 = 49 F1 v6.00 + 26 carril B (47 F1 v6.01 + 2 pendientes F1 + 26 carril B)
const DE_HASTA = opt('--de-hasta', DE_HASTA_DEF);
const PENDIENTES_DE = opt('--pendientes-de', null); // v6.01: SQL de la F1 ANTERIOR (formato de este generador) → overflow a _pendientes_f1.json
const PENDIENTES_JSON = path.join(ROOT, 'DATA', 'ENCAPS', '_pendientes_f1.json');
const CORR = (F6.corrimientos || []).at(-1) || null; // v6.01: último corrimiento registrado en _fechas_v6.json
const OUT = opt('--out', path.join(__dirname, '_encaps_mantenimiento_2027.sql'));
if (!/^[a-z_][a-z0-9_]*$/.test(BK)) throw new Error('--bk inválido: ' + BK);
if (!/^20\d\d-\d\d-\d\d$/.test(HASTA) || !/^20\d\d-\d\d-\d\d$/.test(DE_HASTA)) throw new Error('--hasta / --de-hasta inválido');

// ── overrides: acumulado (por defecto) + el de la línea de comandos (se añade, no sustituye) ──
let OVERRIDE = { semanas: {} };
let acumuladoLeido = 0;
if (!has('--sin-acumulado') && fs.existsSync(ACUMULADO)) {
  try {
    const ac = JSON.parse(fs.readFileSync(ACUMULADO, 'utf8'));
    OVERRIDE.semanas = { ...(ac.semanas || {}) };
    acumuladoLeido = Object.keys(OVERRIDE.semanas).length;
  } catch (e) { throw new Error('overrides_acumulado.json ilegible: ' + e.message); }
}
const ovArg = opt('--override', null);
let ovNuevo = null;
if (ovArg) {
  const raw = ovArg.trim().startsWith('{') ? ovArg : fs.readFileSync(path.resolve(ovArg), 'utf8');
  let o = JSON.parse(raw);
  // formatos aceptados: {"semanas":{lunes:{…}}} · {lunes:{…}} · el propio override_<lunes>.json de gen_encaps_semana ({semana, principal, …})
  if (o.semana && Array.isArray(o.principal)) o = { semanas: { [o.semana]: o } };
  if (!o.semanas) o = { semanas: o };
  ovNuevo = o.semanas;
  for (const [lunes, ov] of Object.entries(ovNuevo)) {
    if (!/^20\d\d-\d\d-\d\d$/.test(lunes) || lunesDe(lunes) !== lunes) throw new Error(`--override: la clave ${lunes} no es un lunes ISO`);
    if (!ov || (!Array.isArray(ov.principal) && !Array.isArray(ov.secundarios))) throw new Error(`--override ${lunes}: falta principal[] o secundarios[]`);
    OVERRIDE.semanas[lunes] = ov; // añade o reemplaza SOLO esa semana
  }
}

// ── labels/tier desde encapsCobertura.ts ──
const cobSrc = fs.readFileSync(path.join(ROOT, 'src/lib/encapsCobertura.ts'), 'utf8');
function temaInfo(code) {
  // clave exacta ("IV-1": {) o clave combinada ("IV-1+IV-2": { / "V-7+V-10": {) — encapsCobertura
  // agrupa IV-1/IV-2, IV-6/IV-7, V-7/V-10, I-5/I-6, I-11/I-12 bajo códigos-paraguas.
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
// Si un código no existe en la cobertura, el subtema caería al literal del código → abortar.
for (const c of COLA_LARGA) if (!temaInfo(c.codigo).found) throw new Error(`cola larga: ${c.codigo} no existe en encapsCobertura.ts (regenerar con gen_encaps_cobertura.js)`);
for (const [c] of CICLO) if (!temaInfo(c).found) throw new Error(`ciclo: ${c} no existe en encapsCobertura.ts`);
for (const [lunes, ov] of Object.entries(OVERRIDE.semanas)) {
  for (const c of ov.principal || []) if (c && !temaInfo(c).found) throw new Error(`override ${lunes}: ${c} no existe en encapsCobertura.ts`);
  for (const c of ov.secundarios || []) if (c && !COLA_LARGA.some((x) => x.codigo === c)) console.warn(`⚠ override ${lunes}: secundario ${c} no está en COLA_LARGA (se ignora ese slot)`);
}

const esc = (s) => String(s).replace(/'/g, "''");
const J = (o) => `'${esc(JSON.stringify(o))}'::jsonb`;
// rol: 'cola_larga' (4-5Q lun-jue · 5-6Q vie) | 'paraguas' (código hermano incluido en el banco: IV-2, IV-7, V-10). Prioridad MEDIA en ambos casos.
const secObj = (codigo, rol, q, label) => ({ codigo, subtema: label || temaInfo(codigo).label, prioridad: 'MEDIA', rol, q });

// ── siembra ──
const rows = [];
const subCount = {};       // instancias por código (para rotar sub-ejes)
const totalPorCodigo = {}; // total de instancias (para extra.de) — se calcula en una pasada previa
let dia = 0, slot = 0, sec = 0, secVie = 0, f0 = '', f1 = '', overridesAplicados = [];
const semanasConOverride = new Set();
const plan = [...fechas(D1, HASTA)].filter((p) => !SKIP_V6.has(p.fecha)); // v6.00: + SKIP_V6
// v6.01: el ÚLTIMO mini-sim de la F1 (vie 18-dic) es el CHECKPOINT DEL AÑO (V6_ESPEC §I: el de fin de enero se adelanta a él)
const VIERNES_CHECKPOINT = HASTA === F6.f1.fin ? (plan.filter((p) => p.dow === 5).at(-1) || {}).fecha : null;
const filasObj = []; // v6.01: copia estructurada de cada fila (para el multiset de pendientes F1)
// pasada previa: cuántas veces cae cada código (con overrides)
// v6.00: cubre D1 → max(HASTA, --de-hasta) (rango v5.20) y solo aplica overrides de semanas que empiezan ≤ HASTA
let slotsDe = 0;
{
  let s = 0;
  const finDe = HASTA > DE_HASTA ? HASTA : DE_HASTA;
  for (const { fecha, dow } of [...fechas(D1, finDe)].filter((p) => !SKIP_V6.has(p.fecha))) {
    if (dow === 5) continue;
    const ov = lunesDe(fecha) <= HASTA ? (OVERRIDE.semanas || {})[lunesDe(fecha)] : null;
    let code = CICLO[s % CICLO.length][0]; s++;
    if (ov && Array.isArray(ov.principal) && ov.principal[dow - 1]) code = ov.principal[dow - 1];
    totalPorCodigo[code] = (totalPorCodigo[code] || 0) + 1;
  }
  slotsDe = s;
}
// v6.01: con el D1 y el --de-hasta por defecto, extra.de se cuenta sobre los 75 slots de v5.20 (si no, el `de` dejaría de cuadrar con el carril B)
if (D1 === F6.f1.inicio && !has('--de-hasta') && slotsDe !== SLOTS_V520) throw new Error(`--de-hasta ${DE_HASTA}: la pasada previa cuenta ${slotsDe} slots lun-jue desde ${D1} y extra.de debe contarse sobre ${SLOTS_V520} (rango v5.20): ajusta DE_HASTA_DEF`);
for (const { fecha, dow } of plan) {
  dia++; if (!f0) f0 = fecha; f1 = fecha;
  const lunes = lunesDe(fecha);
  const ov = (OVERRIDE.semanas || {})[lunes];
  if (dow === 5) {
    // ── viernes: mini-sim 25Q · 2 códigos de cola larga · receta fija ──
    const cl = [COLA_LARGA[secVie % COLA_LARGA.length], COLA_LARGA[(secVie + 1) % COLA_LARGA.length]];
    secVie += 2;
    const secs = cl.map((c) => secObj(c.codigo, 'cola_larga', RECETA_MINISIM.cola_larga_q, c.label));
    const extra = { tipo: 'mini_sim', sim_n: dia, semana: lunes, ...RECETA_MINISIM, cola_larga: cl.map((c) => c.codigo) };
    let subtema = `Mini-simulacro semanal 25Q mixto (vector v3) · cola larga: ${cl.map((c) => c.codigo).join(' + ')}`;
    if (fecha === VIERNES_CHECKPOINT) { // v6.01: rótulo aditivo (no cambia receta ni cola larga)
      extra.checkpoint = 'CHECKPOINT DEL AÑO: último mini-sim de la F1 (V6_ESPEC §I: el checkpoint de fin de enero se adelanta aquí)';
      subtema += ' · CHECKPOINT DEL AÑO';
    }
    rows.push(`('ENCAPS',${dia},'${fecha}','Vie','mini_sim',NULL,'${esc(subtema)}','CRITICA','MANTENIMIENTO','[]'::jsonb,'[]'::jsonb,'[]'::jsonb,${J(secs)},${J(extra)})`);
    filasObj.push({ dia, fecha, weekday: 'Vie', tipo: 'mini_sim', codigo: null, subtema, prioridad: 'CRITICA', temas_secundarios: secs, extra });
    continue;
  }
  // ── lun-jue: banco del día ──
  let [code, prio, paraguas] = CICLO[slot % CICLO.length];
  const codeBase = code;
  slot++;
  let cambiado = false;
  if (ov && Array.isArray(ov.principal) && ov.principal[dow - 1]) {
    const c2 = ov.principal[dow - 1];
    if (c2 !== code) { overridesAplicados.push(`${fecha}: ${code}→${c2}`); cambiado = true; }
    const base = CICLO.find((x) => x[0] === c2);
    code = c2; prio = base ? base[1] : (temaInfo(c2).tier === 'CRITICA' ? 'CRITICA' : 'ALTA'); paraguas = base ? base[2] : null;
  }
  const info = temaInfo(code);
  const se = SUB_EJES[code];
  const n = (subCount[code] = (subCount[code] || 0) + 1);
  let subtema = info.label;
  const extra = { instancia: n, de: totalPorCodigo[code] || n };
  if (se) {
    const eje = se.ejes[(n - 1) % se.ejes.length];
    subtema = `${se.tema} · ${eje.label}`;
    extra.sub_eje = eje.key; extra.sub_eje_label = eje.label; extra.sub_eje_n = ((n - 1) % se.ejes.length) + 1; extra.sub_ejes_total = se.ejes.length;
  }
  // secundario de cola larga (4-5Q): rotación propia; override semanal opcional
  let clc = COLA_LARGA[sec % COLA_LARGA.length]; sec++;
  if (ov && Array.isArray(ov.secundarios) && ov.secundarios[dow - 1]) {
    const c3 = COLA_LARGA.find((x) => x.codigo === ov.secundarios[dow - 1]);
    if (c3 && c3.codigo !== clc.codigo) { overridesAplicados.push(`${fecha}: secundario ${clc.codigo}→${c3.codigo}`); cambiado = true; }
    if (c3) clc = c3;
  }
  const secs = [];
  for (const p of paraguas || []) secs.push(secObj(p, 'paraguas', 'incluido'));
  secs.push(secObj(clc.codigo, 'cola_larga', '4-5Q', clc.label));
  extra.secundario = clc.codigo;
  // extra.override solo cuando la fila cambió de verdad respecto a la rotación base (un override "sin cambios" no altera filas)
  if (cambiado) { extra.override = (ov && ov.motivo) || `override semana ${lunes}`; extra.override_base = codeBase; semanasConOverride.add(lunes); }
  rows.push(`('ENCAPS',${dia},'${fecha}','${WD[dow]}','banqueo1h','${code}','${esc(subtema)}','${prio}','MANTENIMIENTO','[]'::jsonb,'[]'::jsonb,'[]'::jsonb,${J(secs)},${J(extra)})`);
  filasObj.push({ dia, fecha, weekday: WD[dow], tipo: 'banqueo1h', codigo: code, subtema, prioridad: prio, temas_secundarios: secs, extra });
}

// ── v6.01: PENDIENTES F1 = multiset (codigo, sub_eje, instancia) de las banqueo1h de la F1 ANTERIOR (--pendientes-de, fecha ≤ HASTA)
//    MENOS las nuevas + los mini-sims viejos (por cola larga) que no caben. NADA se descarta ni se absorbe (regla de Joseph, 10-oct): todos
//    van a _pendientes_f1.json → filas (copia literal; tipo 'banqueo1h' o 'mini_sim') y gen_encaps_intensivo_2027.js los repone ──
// --pendientes-de acepta una ruta o «git:<rev>:<ruta del repo>» (v6.01: git:regimen-v6.00:DATA/_scripts/_encaps_mantenimiento_2027.sql)
const leerTextoFuente = (ruta) => (ruta.startsWith('git:')
  ? require('child_process').execFileSync('git', ['show', ruta.slice(4)], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  : fs.readFileSync(path.resolve(ruta), 'utf8'));
const fuenteLabel = (ruta) => (ruta.startsWith('git:') ? `git show ${ruta.slice(4)}` : path.relative(ROOT, path.resolve(ruta)).replace(/\\/g, '/'));
const leerFilasSQL = (ruta) => {
  const out = [];
  for (const line of leerTextoFuente(ruta).split('\n')) {
    if (!line.startsWith(`('ENCAPS',`)) continue;
    const m = line.match(/^\('ENCAPS',(\d+),'([\d-]+)','([^']+)','([^']+)',(NULL|'[^']*'),'((?:[^']|'')*)','([^']*)','([^']*)'/);
    if (!m) throw new Error(`--pendientes-de: fila ilegible: ${line.slice(0, 80)}`);
    const jsons = [...line.matchAll(/'((?:[^']|'')*)'::jsonb/g)].map((x) => JSON.parse(x[1].replace(/''/g, "'")));
    out.push({ dia: +m[1], fecha: m[2], weekday: m[3], tipo: m[4], codigo: m[5] === 'NULL' ? null : m[5].replace(/'/g, ''), subtema: m[6].replace(/''/g, "'"),
      prioridad: m[7], modo: m[8], temas_secundarios: jsons[jsons.length - 2] || [], extra: jsons[jsons.length - 1] || {} });
  }
  return out;
};
const claveInst = (r) => `${r.codigo}|${r.extra.sub_eje || '-'}|${r.extra.instancia}`;
const claveSim = (r) => (r.extra.cola_larga || []).join('+');
let pendientes = null;
if (PENDIENTES_DE) {
  const viejas = leerFilasSQL(PENDIENTES_DE).filter((r) => r.modo === 'MANTENIMIENTO' && r.fecha <= HASTA);
  const resta = (a, b, k) => { const cnt = {}; for (const r of b) cnt[k(r)] = (cnt[k(r)] || 0) + 1; const falt = []; for (const r of a) { if (cnt[k(r)]) cnt[k(r)]--; else falt.push(r); } return falt; };
  const vB = viejas.filter((r) => r.tipo === 'banqueo1h'), nB = filasObj.filter((r) => r.tipo === 'banqueo1h');
  const vS = viejas.filter((r) => r.tipo === 'mini_sim'), nS = filasObj.filter((r) => r.tipo === 'mini_sim');
  const inventadas = resta(nB, vB, claveInst);
  if (inventadas.length) throw new Error(`--pendientes-de: ${inventadas.length} instancia(s) NUEVAS que no existían en la F1 anterior (${inventadas.map(claveInst).join(', ')}): un corrimiento no inventa contenido`);
  const simsNuevos = resta(nS, vS, claveSim);
  if (simsNuevos.length) throw new Error(`--pendientes-de: mini-sims nuevos sin equivalente en la F1 anterior (${simsNuevos.map(claveSim).join(', ')})`);
  // las comunes deben tener el MISMO contenido (corrimiento rígido: solo cambian dia/fecha/weekday y, en el mini-sim, sim_n/semana/checkpoint)
  const porClave = {}; for (const r of vB) (porClave[claveInst(r)] = porClave[claveInst(r)] || []).push(r);
  const distintas = nB.filter((r) => { const v = (porClave[claveInst(r)] || []).shift(); return !v || v.subtema !== r.subtema || v.prioridad !== r.prioridad || JSON.stringify(v.temas_secundarios) !== JSON.stringify(r.temas_secundarios) || JSON.stringify(v.extra) !== JSON.stringify(r.extra); });
  if (distintas.length) throw new Error(`--pendientes-de: ${distintas.length} fila(s) banqueo1h con contenido distinto al de la F1 anterior (${distintas.slice(0, 5).map((r) => `dia ${r.dia} ${claveInst(r)}`).join(', ')}): revisa --de-hasta / overrides`);
  const versionPrev = (F6.corrimientos || []).length >= 2 ? F6.corrimientos.at(-2).version : 'v6.00';
  const corr = CORR ? CORR.version : 'manual';
  let pj = { _meta: {}, filas: [] };
  if (fs.existsSync(PENDIENTES_JSON)) { try { pj = JSON.parse(fs.readFileSync(PENDIENTES_JSON, 'utf8')); } catch (e) { throw new Error('_pendientes_f1.json ilegible: ' + e.message); } }
  // v6.01: `destino` / `reposicion` los fija gen_encaps_intensivo_2027.js al colocar la fila en el carril B; al reescribir se conservan
  // (misma fila = mismo corrimiento + tipo + dia_mant) para que el JSON no pierda dónde quedó repuesta entre una corrida y otra
  const DESTINO_PEND = 'PENDIENTE de reposición explícita en el carril B 16:15 de la intensiva (fecha y dia: gen_encaps_intensivo_2027.js → reposicion)';
  const previa = (r) => (pj.filas || []).find((x) => x.corrimiento === corr && x.tipo === r.tipo && x.dia_mant === r.dia && x.reposicion);
  // copia LITERAL de la fila vieja (tipo 'banqueo1h' o 'mini_sim': subtema, prioridad, temas_secundarios y extra tal cual; el mini-sim lleva su
  // receta íntegra en extra: 25Q · 72 s/Q · cola larga) + destino / reposicion
  const filaPendiente = (r) => {
    const p = previa(r);
    return { origen: `mantenimiento_${versionPrev}`, corrimiento: corr, dia_mant: r.dia, fecha_original: r.fecha, tipo: r.tipo, codigo: r.codigo,
      subtema: r.subtema, prioridad: r.prioridad, temas_secundarios: r.temas_secundarios, extra: r.extra,
      destino: p ? p.destino : DESTINO_PEND, ...(p ? { reposicion: p.reposicion } : {}) };
  };
  const filasP = resta(vB, nB, claveInst).map(filaPendiente);
  // v6.01 (regla de Joseph: nada se descarta): los mini-sims que no caben ya NO se absorben → pendientes F1 tipo 'mini_sim'
  const simsP = resta(vS, nS, claveSim).map(filaPendiente);
  for (const s of simsP) if (!Array.isArray(s.extra.cola_larga) || !s.extra.cola_larga.length || !s.extra.receta || !s.extra.seg_por_q) throw new Error(`--pendientes-de: el mini-sim de la fila ${s.dia_mant} no trae su receta íntegra en extra (receta / seg_por_q / cola_larga)`);
  pendientes = { viejas: viejas.length, vB: vB.length, vS: vS.length, filas: filasP, sims: simsP, corr, versionPrev };
  // persistir (merge: las filas de OTROS corrimientos se conservan; las de este se reescriben). Orden: banqueo1h por dia_mant → mini-sims
  const absOtros = (pj.minisims_absorbidos || []).filter((r) => r.corrimiento !== corr);
  if (absOtros.length) throw new Error(`_pendientes_f1.json: ${absOtros.length} mini-sim(s) «absorbidos» de otros corrimientos: prohibido (regla 10-oct: un mini-sim F1 se REPONE) → pásalos a filas con tipo 'mini_sim'`);
  const corrs = ((pj._meta && pj._meta.corrimientos) || []).filter((c) => c.version !== corr);
  corrs.push({ version: corr, fecha: CORR ? CORR.fecha : hoyLima(), d1_previo: CORR ? CORR.d1_previo : null, d1: D1, f1_hasta: HASTA,
    fuente: `${fuenteLabel(PENDIENTES_DE)} (filas MANTENIMIENTO con fecha ≤ ${HASTA})`, filas_previas: viejas.length, banqueo_previas: vB.length, minisims_previos: vS.length,
    filas_nuevas: filasObj.length, banqueo_nuevas: nB.length, minisims_nuevos: nS.length, pendientes: filasP.length + simsP.length,
    pendientes_banqueo: filasP.length, pendientes_minisim: simsP.length, minisims_absorbidos: 0 });
  pj = {
    _meta: { descripcion: 'PENDIENTES F1 del ENCAPS MANTENIMIENTO: filas (banqueo1h y mini_sim) que un corrimiento RÍGIDO dejó fuera de la F1 (la F1 no se alarga: el lun 4-ene empieza la intensiva). Copia literal de la fila vieja (el mini-sim con su receta íntegra en extra). NADA se descarta ni se absorbe (regla de Joseph, 10-oct-2026). gen_encaps_intensivo_2027.js (--pendientes-f1, default este fichero) las REPONE EXPLÍCITAS en los primeros días de REPOSICIÓN del carril B 16:15 (extra.carril_b = {tipo:\'reposicion\', regla, pendiente_f1: <esta fila, idéntica>}), antes de la regla genérica: primero las banqueo1h por dia_mant y después los mini-sims; al colocarlas escribe aquí `destino` y `reposicion` {dia, fecha, carril}. Lo escribe gen_encaps_mantenimiento_2027.js --pendientes-de <SQL de la F1 anterior>.',
      actualizado: hoyLima(), corrimientos: corrs },
    filas: [...(pj.filas || []).filter((r) => r.corrimiento !== corr), ...filasP, ...simsP],
  };
  if (!has('--no-persistir')) { fs.writeFileSync(PENDIENTES_JSON, JSON.stringify(pj, null, 1) + '\n', 'utf8'); console.log('pendientes F1 →', PENDIENTES_JSON); }
}

const nBanco = rows.filter((r) => r.includes(`'banqueo1h'`)).length, nSim = rows.length - nBanco;
// v6.00: guarda al principio de la transacción: nunca re-insertar MANTENIMIENTO sobre filas INTENSIVO (choque de PK (examen, dia))
const guardaIntensivo = `DO $$ BEGIN IF EXISTS (SELECT 1 FROM study_schedule WHERE examen='ENCAPS' AND modo <> 'MANTENIMIENTO' AND dia <= ${dia}) THEN RAISE EXCEPTION 'hay filas INTENSIVO en el rango del mantenimiento'; END IF; END $$;`;
const guardaBk = BK_REEMPLAZAR
  ? `DROP TABLE IF EXISTS ${BK};`
  : `DO $$ BEGIN IF to_regclass('public.${BK}') IS NOT NULL THEN RAISE EXCEPTION 'el backup ${BK} YA EXISTE: no se pisa. Regenera con --bk ${BK}b (o --bk-reemplazar si de verdad quieres sobrescribirlo)'; END IF; END $$;`;
const verificacion = `select modo, tipo, count(*) from study_schedule where examen = 'ENCAPS' group by 1, 2 order by 1, 2;`;
const esperado = `MANTENIMIENTO | banqueo1h | ${nBanco} · MANTENIMIENTO | mini_sim | ${nSim} (= ${rows.length} filas ${f0} → ${f1}); las filas INTENSIVO, si existen, deben seguir con su conteo anterior`;
const sql = `-- ENCAPS MANTENIMIENTO 2027-I · generado por gen_encaps_mantenimiento_2027.js (${hoyLima()})
-- ${rows.length} días L-V · ${f0} → ${f1} · rotación v3 4 semanas con sub-ejes + cola larga · vie = mini-sim 25Q (receta fija) · backup ${BK}
-- seguridad: (1) aborta si el backup ya existe${BK_REEMPLAZAR ? ' [DESACTIVADA con --bk-reemplazar]' : ''} · (2) DELETE filtrado por modo = 'MANTENIMIENTO' (no toca filas INTENSIVO) · (3) v6.00: aborta si hay filas INTENSIVO con dia ≤ ${dia}
-- v6.00: extra.de contado sobre ${D1} → ${HASTA > DE_HASTA ? HASTA : DE_HASTA} (--de-hasta, rango v5.20 = ${slotsDe} slots lun-jue; overrides solo de semanas ≤ ${HASTA})${CORR && CORR.d1 === D1 ? `
-- ${CORR.version} (${CORR.fecha}): corrimiento RÍGIDO D1 ${CORR.d1_previo} → ${CORR.d1} (perdidos ${CORR.perdidos.join(', ')}) · la F1 no se alarga (fin ${HASTA}) · rotación por slots intacta${VIERNES_CHECKPOINT ? ` · CHECKPOINT DEL AÑO = mini-sim del ${VIERNES_CHECKPOINT}` : ''}` : ''}${pendientes ? `
-- pendientes F1 (${pendientes.corr}, --pendientes-de): F1 ${pendientes.versionPrev} ${pendientes.vB} banqueo1h + ${pendientes.vS} mini_sim → nueva ${filasObj.filter((r) => r.tipo === 'banqueo1h').length} + ${filasObj.filter((r) => r.tipo === 'mini_sim').length} · ${pendientes.filas.length + pendientes.sims.length} pendiente(s) F1 al carril B (reposición explícita; nada se descarta): ${pendientes.filas.map((r) => `dia ${r.dia_mant} ${claveInst(r)}`).join(' · ') || 'ninguna banqueo1h'} · ${pendientes.sims.map((r) => `mini-sim dia ${r.dia_mant} ${claveSim(r)}`).join(' · ') || 'ningún mini-sim'} (DATA/ENCAPS/_pendientes_f1.json)` : ''}
-- overrides: acumulado ${acumuladoLeido} semana(s) leídas de SEMANAS/overrides_acumulado.json${ovNuevo ? ` + --override ${Object.keys(ovNuevo).join(', ')}` : ''}${overridesAplicados.length ? ` · filas cambiadas: ${overridesAplicados.join(' · ')}` : ' · sin filas cambiadas respecto a la rotación base'}
BEGIN;
${guardaIntensivo}
${guardaBk}
CREATE TABLE ${BK} AS SELECT * FROM study_schedule;
DELETE FROM study_schedule WHERE examen = 'ENCAPS' AND modo = 'MANTENIMIENTO';
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, codigo, subtema, prioridad, modo, videos, theomed, material_comp, temas_secundarios, extra) VALUES
${rows.join(',\n')};
COMMIT;
-- VERIFICACIÓN (pegar tras execute_sql):
-- ${verificacion}
-- esperado: ${esperado}
-- select count(*) from ${BK} where examen = 'ENCAPS';   -- = filas ENCAPS que había antes de la siembra
`;
fs.writeFileSync(OUT, sql, 'utf8');
console.log('OK →', OUT, '·', rows.length, 'días ·', f0, '→', f1, '·', sql.length, 'chars · backup', BK, BK_REEMPLAZAR ? '(DROP IF EXISTS: se sobrescribe)' : '(el SQL aborta si ya existe)');
console.log('overrides: acumulado', acumuladoLeido, 'semana(s)', ovNuevo ? `+ --override ${Object.keys(ovNuevo).join(', ')}` : '', '· semanas con filas cambiadas:', [...semanasConOverride].join(', ') || 'ninguna');
// persistir el --override en el acumulado (regla: una semana se añade, nunca sustituye a las anteriores)
if (ovNuevo && !has('--sin-acumulado') && !has('--no-persistir')) {
  let ac = { _meta: {}, semanas: {} };
  if (fs.existsSync(ACUMULADO)) { try { ac = JSON.parse(fs.readFileSync(ACUMULADO, 'utf8')); } catch (e) { /* se reescribe */ } }
  ac._meta = { ...(ac._meta || {}), descripcion: 'Merge de TODOS los overrides semanales aplicados al ciclo ENCAPS MANTENIMIENTO 2027-I (clave = lunes ISO). gen_encaps_mantenimiento_2027.js lo lee por defecto: regenerar el SQL sin este fichero devolvería las semanas pasadas a la rotación base. Lo escriben gen_encaps_semana.js (cierre semanal) y gen_encaps_mantenimiento_2027.js (--override).', actualizado: hoyLima() };
  ac.semanas = { ...(ac.semanas || {}), ...ovNuevo };
  fs.mkdirSync(path.dirname(ACUMULADO), { recursive: true });
  fs.writeFileSync(ACUMULADO, JSON.stringify(ac, null, 1) + '\n', 'utf8');
  console.log('acumulado →', ACUMULADO, '·', Object.keys(ac.semanas).length, 'semana(s)');
}
// distribución
const dist = {}, subDist = {}, secDist = {};
let sims = 0;
for (const r of rows) {
  const m = r.match(/'banqueo1h','([^']+)'/);
  if (m) dist[m[1]] = (dist[m[1]] || 0) + 1; else sims++;
  const se = r.match(/"sub_eje":"([^"]+)"/); if (m && se) { const k = `${m[1]}:${se[1]}`; subDist[k] = (subDist[k] || 0) + 1; }
  for (const s of r.matchAll(/"codigo":"([^"]+)","subtema":"[^"]*","prioridad":"[^"]*","rol":"cola_larga"/g)) secDist[s[1]] = (secDist[s[1]] || 0) + 1;
}
console.log('mini-sims (vie):', sims, '· temas:', JSON.stringify(dist));
console.log('sub-ejes:', JSON.stringify(subDist));
console.log('cola larga (lun-jue + vie):', JSON.stringify(secDist));
if (overridesAplicados.length) console.log('overrides aplicados:', overridesAplicados.join(' · '));
console.log('\nVERIFICACIÓN tras execute_sql (proyecto qacynpqdrorpuegsmtcy):');
console.log('  ' + verificacion);
console.log('  esperado → ' + esperado);
console.log(`  select count(*) from ${BK} where examen = 'ENCAPS';   -- filas ENCAPS previas a la siembra (backup)`);
