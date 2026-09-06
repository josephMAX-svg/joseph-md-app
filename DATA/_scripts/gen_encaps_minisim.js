/**
 * gen_encaps_minisim.js — runner de preguntas ENCAPS (mantenimiento 2027-I e intensiva). Arma sets desde
 * DATA/ENCAPS/BANCO_PROPIO y emite un runner HTML autocontenido (temporizador, hoja de respuestas con confianza,
 * autocorrección por código/área/formato, export JSON en el esquema de ronda v3 + línea de cierre para
 * gen_encaps_semana.js --cerrar).
 *
 * Fuentes de ítems (pool): DATA/ENCAPS/BANCO_PROPIO/*.json que NO empiecen por `_` ni sean salidas del runner
 * (minisim_* · banco_* · eval_* · pretest_* · sim100_*): hoy banco_items_v1.json + set_<codigo>_1.json (8 críticos,
 * 25Q c/u) + set_reales_otros_1.json (178 ítems reales de cola larga/rebotes). Campos del banco propio: id, codigo,
 * area, formato, critico, sub_eje, subangulo, fallo_previo, reservado_para, enunciado, opciones, clave, respuesta,
 * explicacion, fuente, verificado_contra, molde. Los moldes/espejos son SOLO de 2024-2A→2026-1: el generador RECHAZA
 * todo ítem cuyo verificado_contra/molde/fuente mencione 2026-2 / 2026-II mientras no exista la ronda PRETEST_2026-II
 * en TRACKING_ERRORES/_registro_resoluciones.json (PROTOCOLO_GENERACION_PREGUNTAS.md §3-bis-LN).
 *
 * Un ítem se usa UNA sola vez: los ids que ya aparecen en cualquier minisim_*.json / banco_*.json / eval_*.json
 * de BANCO_PROPIO quedan excluidos de los sets nuevos (sin importar la fecha: los sets se pre-generan por adelantado).
 *
 * Receta del mini-sim (_encaps_ciclo_v3.js RECETA_MINISIM): 8 II · 7 I · 5 V · 3 III · 2 IV = 25 · 50/50 viñeta-directa
 * (tolerancia ±2) · ≥10Q de los 8 críticos v3 · ≥5Q de fallos previos del registro (re-testeados con OTRO enfoque)
 * · 5-6Q de los 2 códigos de cola larga del viernes (fila mini_sim de _encaps_mantenimiento_2027.sql; si no está,
 * rota COLA_LARGA por índice de viernes).
 *
 * Uso:
 *   node DATA/_scripts/gen_encaps_minisim.js 2026-09-11                → BANCO_PROPIO/minisim_2026-09-11.json + .html (viernes)
 *   node DATA/_scripts/gen_encaps_minisim.js --banco 2026-09-07        → BANCO_PROPIO/banco_2026-09-07.json + .html: BANCO DEL DÍA
 *        (lun-jue): 16-20Q del código y SUB-EJE de la fila banqueo1h de ese día + 4-5Q del secundario de cola larga;
 *        corrección INMEDIATA pregunta a pregunta (Palmerton); ≥40 % recall directo cuando el stock lo permite.
 *   node DATA/_scripts/gen_encaps_minisim.js --eval 2026-09-08         → BANCO_PROPIO/eval_2026-09-08.json + .html: EVAL ANCLADA
 *        16:15 (5Q del código de AYER = 3 cifras + 2 viñetas, solución al final; lunes = 5Q de fallos previos).
 *   node DATA/_scripts/gen_encaps_minisim.js --semana 2026-09-07       → --banco lun-jue + --eval mar-jue de esa semana (el viernes no
 *        lleva eval: el mini-sim ocupa las 16:15) + mini-sim del viernes si no existe. Con --dry solo informa.
 *   node DATA/_scripts/gen_encaps_minisim.js --inventario              → BANCO_PROPIO/_inventario_banco_por_codigo.json (oferta vs
 *        demanda por código v3: sets, reales etiquetados, banco_items_v1, claves.json, QX/Theomed, resueltas, déficit).
 *   node DATA/_scripts/gen_encaps_minisim.js 2026-09-11 --dry          → solo informe (no escribe)
 *   node DATA/_scripts/gen_encaps_minisim.js --pretest                 → BANCO_PROPIO/pretest_2026-II.html (100Q, examen real
 *                                                                        2026-II, PRETEST_2026-II.md). Generarlo el jue 4-feb-2027.
 *   node DATA/_scripts/gen_encaps_minisim.js --sim100 2025-2 [fecha]   → simulacro 100Q con un examen real con CLAVE OFICIAL
 *                                                                        (2024-2A · 2025-1A · 2025-2; 2026-1 no tiene clave → se rechaza)
 *   node DATA/_scripts/gen_encaps_minisim.js --sim100 propio <fecha>   → 100Q desde el banco propio (vector v3 ×4)
 *   node DATA/_scripts/gen_encaps_minisim.js --registrar <export.json> [--append]
 *        → guarda TRACKING_ERRORES/RONDAS/<id>.json y muestra la línea para `gen_encaps_semana.js --cerrar`;
 *          con --append apenda la ronda (con preguntas[]) a _registro_resoluciones.json (append-only).
 * Sin dependencias externas. No toca Supabase ni el Calendar.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const ENCAPS = path.join(ROOT, 'DATA', 'ENCAPS');
const BANCO = path.join(ENCAPS, 'BANCO_PROPIO');
const REG = path.join(ENCAPS, 'TRACKING_ERRORES', '_registro_resoluciones.json');
const RONDAS = path.join(ENCAPS, 'TRACKING_ERRORES', 'RONDAS');
const SQL_MANT = path.join(__dirname, '_encaps_mantenimiento_2027.sql');
const { RECETA_MINISIM, COLA_LARGA, CRITICOS_V3, REBOTE_V3, VECTOR_V3, CICLO, SUB_EJES, areaDe } = require('./_encaps_ciclo_v3');

// ── argumentos ──
const argv = process.argv.slice(2);
const has = (k) => argv.includes(k);
const opt = (k, def) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] != null ? argv[i + 1] : def; };
const fechaArg = argv.find((a) => /^20\d\d-\d\d-\d\d$/.test(a));
const DRY = has('--dry');
const OUT_DIR = opt('--out', BANCO);

// ── utilidades ──
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
const readJSON = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const CONF_LABEL = { 1: 'adivinada', 2: 'dudosa', 3: 'segura' };
function rng(seed) { let s = 0; for (const ch of String(seed)) s = (s * 31 + ch.charCodeAt(0)) >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function shuffle(arr, r) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const esVineta = (it) => /vi[ñn]eta/i.test(it.formato || '');
const esCifra = (it) => /cifra/i.test(it.formato || '');
const esRecallDirecto = (it) => !esVineta(it); // directa | cifra
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const dowDe = (iso) => new Date(iso + 'T12:00:00Z').getUTCDay();
const addDays = (iso, n) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
// código de siembra (columna codigo de study_schedule) → código del pool (taxonomía v3 del banco)
const POOL_CODE = { 'IV-1': 'IV-1+IV-2', 'IV-2': 'IV-1+IV-2', 'IV-6': 'IV-6+IV-7', 'IV-7': 'IV-6+IV-7', 'V-7': 'V-MED', 'V-10': 'V-MED', 'V-7+V-10': 'V-MED', 'I-5': 'I-5+I-6', 'I-6': 'I-5+I-6', 'I-11': 'I-11+I-12', 'I-12': 'I-11+I-12', 'V-RRHH': 'V-3' };
const poolCode = (c) => POOL_CODE[c] || c;
const SALIDAS_RE = /^(minisim_\d{4}-|banco_\d{4}-|eval_\d{4}-|pretest_|sim100_)/; // salidas del runner (banco_items_v1.json NO es salida)
const USADOS_RE = /^(minisim|banco|eval)_\d{4}-\d\d-\d\d\.json$/;

// ── registro: fallos previos + lista negra ──
function leerRegistro() {
  let reg = { rondas: [], resumen_por_subtema: {} };
  try { reg = readJSON(REG); } catch (e) { console.warn('⚠ sin registro legible:', e.message); }
  const fallos = new Set();
  let pretestHecho = false;
  for (const r of reg.rondas || []) {
    if (/PRETEST_2026-II/i.test(r.id || '') || /PRETEST_2026-II/i.test(r.tema || '') || (r.tipoRonda === 'pretest' && /2026-2|2026-II/i.test(r.fuente_preguntas || r.tema || ''))) pretestHecho = true;
    for (const q of r.preguntas || []) if (q.ok === false) { fallos.add(norm(q.tema || q.subangulo)); if (q.subangulo) fallos.add(norm(q.subangulo)); }
  }
  const debiles = new Set(Object.entries(reg.resumen_por_subtema || {}).filter(([, v]) => /debil/i.test(v.estado || '')).map(([c]) => c));
  return { fallos, debiles, pretestHecho, reg };
}
const enListaNegra = (it) => /2026-2\b|2026-II/i.test([it.verificado_contra, it.molde, it.fuente].join(' '));

// ── pool del banco propio ──
function cargarPool(pretestHecho) {
  const pool = []; const rechazados = []; const ids = new Set();
  for (const f of fs.readdirSync(BANCO)) {
    if (!f.endsWith('.json') || f.startsWith('_') || SALIDAS_RE.test(f)) continue;
    let j; try { j = readJSON(path.join(BANCO, f)); } catch (e) { console.warn('⚠ JSON ilegible', f); continue; }
    for (const it of j.items || []) {
      if (!it.id || !it.codigo || !it.enunciado || !it.opciones || !it.clave) { rechazados.push([f, it.id || '?', 'campos incompletos']); continue; }
      if (ids.has(it.id)) { rechazados.push([f, it.id, 'id duplicado']); continue; }
      if (!pretestHecho && enListaNegra(it)) { rechazados.push([f, it.id, 'LISTA NEGRA 2026-II']); continue; }
      ids.add(it.id);
      pool.push({ ...it, area: it.area || areaDe(it.codigo), _file: f });
    }
  }
  return { pool, rechazados };
}
// ids ya consumidos en CUALQUIER salida del runner (minisim_/banco_/eval_), salvo la que se está (re)generando
function usadosPrevios(base) {
  const usados = new Set();
  for (const f of fs.readdirSync(BANCO)) {
    if (!USADOS_RE.test(f) || f === `${base}.json`) continue;
    try { for (const it of readJSON(path.join(BANCO, f)).items || []) usados.add(it.id); } catch (e) { /* ignorar */ }
  }
  return usados;
}
// fila de study_schedule (SQL de mantenimiento) para una fecha → {tipo, codigo, subtema, secundarios[], extra}
function filaSQL(fecha) {
  let sql; try { sql = fs.readFileSync(SQL_MANT, 'utf8'); } catch (e) { return null; }
  const line = sql.split('\n').find((l) => l.startsWith(`('ENCAPS',`) && l.includes(`'${fecha}'`));
  if (!line) return null;
  const m = line.match(/^\('ENCAPS',(\d+),'([\d-]+)','([^']+)','([^']+)',(NULL|'[^']*'),'((?:[^']|'')*)'/);
  if (!m) return null;
  const jsons = [...line.matchAll(/'((?:[^']|'')*)'::jsonb/g)].map((x) => { try { return JSON.parse(x[1].replace(/''/g, "'")); } catch (e) { return null; } });
  const extra = jsons.length ? jsons[jsons.length - 1] : {};
  const secs = jsons.length >= 2 && Array.isArray(jsons[jsons.length - 2]) ? jsons[jsons.length - 2] : [];
  return { dia: +m[1], fecha: m[2], weekday: m[3], tipo: m[4], codigo: m[5] === 'NULL' ? null : m[5].replace(/'/g, ''), subtema: m[6].replace(/''/g, "'"), secundarios: secs, extra: extra || {} };
}
function colaLargaDe(fecha) {
  const fila = filaSQL(fecha);
  if (fila && fila.extra && Array.isArray(fila.extra.cola_larga) && fila.extra.cola_larga.length) return { codigos: fila.extra.cola_larga, origen: '_encaps_mantenimiento_2027.sql' };
  // fallback: rota COLA_LARGA por índice de viernes desde el D1 del régimen
  const d1 = new Date('2026-09-07T12:00:00Z'), d = new Date(fecha + 'T12:00:00Z');
  const k = Math.max(0, Math.floor((d - d1) / (7 * 864e5)));
  return { codigos: [COLA_LARGA[(2 * k) % COLA_LARGA.length].codigo, COLA_LARGA[(2 * k + 1) % COLA_LARGA.length].codigo], origen: 'rotación COLA_LARGA (fallback)' };
}

// ── selección con la receta fija (mini-sim de viernes) ──
function armarSet(fecha, pool, usados, cola, fallosReg, debiles) {
  const R = RECETA_MINISIM;
  const avisos = [];
  const cuota = { ...R.receta };
  const cand = pool.filter((it) => !usados.has(it.id));
  const prio = (it) => (it.reservado_para === fecha ? 0 : !it.reservado_para ? 1 : 2);
  const esFalloPrevio = (it) => !!it.fallo_previo && (fallosReg.has(norm(it.fallo_previo)) || debiles.has(it.codigo));
  const esCritico = (it) => it.critico === true || CRITICOS_V3.includes(it.codigo);
  const r = rng(fecha);
  const set = []; const usedIds = new Set();
  const cabe = (it) => cuota[it.area] > 0 && !usedIds.has(it.id);
  const toma = (it, motivo) => { set.push({ ...it, _motivo: motivo }); usedIds.add(it.id); cuota[it.area]--; };
  const ordena = (arr) => arr.slice().sort((a, b) => prio(a) - prio(b) || (esCritico(b) - esCritico(a)) || (a.id < b.id ? -1 : 1));
  // (a) cola larga: 5-6Q entre los 2 códigos (máx 3 por código)
  const [minCL, maxCL] = String(R.cola_larga_q).split('-').map(Number);
  let nCL = 0;
  for (const c of cola.codigos) { let k = 0; for (const it of ordena(cand.filter((x) => poolCode(x.codigo) === poolCode(c)))) { if (k >= 3 || nCL >= (maxCL || 6) || !cabe(it)) break; toma(it, 'cola_larga'); k++; nCL++; } }
  if (nCL < (minCL || 5)) avisos.push(`cola larga: solo ${nCL}Q disponibles de ${cola.codigos.join('+')} (receta ${R.cola_larga_q})`);
  // (b) fallos previos ≥ fallos_previos_min
  let nFP = set.filter(esFalloPrevio).length;
  for (const it of ordena(cand.filter((x) => esFalloPrevio(x) && !usedIds.has(x.id)))) { if (nFP >= R.fallos_previos_min) break; if (cabe(it)) { toma(it, 'fallo_previo'); nFP++; } }
  if (nFP < R.fallos_previos_min) avisos.push(`fallos previos: ${nFP}/${R.fallos_previos_min} (el registro solo tiene fallos en ${[...fallosReg].slice(0, 6).join(', ')}…)`);
  // (c) críticos ≥ criticos_min
  let nCR = set.filter(esCritico).length;
  for (const it of ordena(cand.filter((x) => esCritico(x) && !usedIds.has(x.id)))) { if (nCR >= R.criticos_min) break; if (cabe(it)) { toma(it, 'critico'); nCR++; } }
  // (d) relleno por área: rebotes → críticos → resto (siempre prefiriendo los reservados para esta fecha); barajado por semilla
  const rank = (it) => prio(it) * 10 + (REBOTE_V3.includes(it.codigo) ? 0 : esCritico(it) ? 1 : 2);
  for (const it of shuffle(cand.filter((x) => !usedIds.has(x.id)), r).sort((a, b) => rank(a) - rank(b))) if (cabe(it)) toma(it, 'relleno');
  // (e) balance viñeta/directa 50/50 ±2 mediante swaps dentro de la misma área
  const objetivo = Math.round(set.length * R.vineta_pct / 100);
  for (let iter = 0; iter < 10; iter++) {
    const nV = set.filter(esVineta).length; const diff = nV - objetivo;
    if (Math.abs(diff) <= 2) break;
    const quitarVineta = diff > 0;
    const sal = set.slice().reverse().find((x) => esVineta(x) === quitarVineta && x._motivo === 'relleno');
    const ent = sal && cand.find((x) => !usedIds.has(x.id) && x.area === sal.area && esVineta(x) !== quitarVineta && prio(x) < 2);
    if (!sal || !ent) break;
    set.splice(set.indexOf(sal), 1); usedIds.delete(sal.id); set.push({ ...ent, _motivo: 'relleno' }); usedIds.add(ent.id);
  }
  // verificación
  const faltan = Object.entries(cuota).filter(([, v]) => v > 0);
  if (faltan.length) avisos.push('cuotas sin cubrir: ' + faltan.map(([a, v]) => `${a}:${v}`).join(' '));
  const reservadosOtro = set.filter((x) => x.reservado_para && x.reservado_para !== fecha).map((x) => x.id);
  if (reservadosOtro.length) avisos.push(`usa ítems reservados para otra fecha: ${reservadosOtro.join(', ')}`);
  // orden final: barajado con semilla = fecha (el orden real del examen no agrupa por área)
  const final = shuffle(set, r).map((it, i) => ({ n: i + 1, ...it }));
  const conteos = {
    por_area: Object.fromEntries(['II', 'I', 'V', 'III', 'IV'].map((a) => [a, final.filter((x) => x.area === a).length])),
    por_codigo: final.reduce((acc, x) => ((acc[x.codigo] = (acc[x.codigo] || 0) + 1), acc), {}),
    vinetas: final.filter(esVineta).length, directas: final.filter((x) => !esVineta(x)).length,
    criticos: final.filter(esCritico).length, fallos_previos: final.filter(esFalloPrevio).length,
    cola_larga: final.filter((x) => cola.codigos.map(poolCode).includes(poolCode(x.codigo))).length,
    verificados_clave_oficial: final.filter((x) => /CLAVE OFICIAL/i.test(x.verificado_contra || '')).length,
    moldes_no_verificables: final.filter((x) => /no verificable/i.test((x.verificado_contra || '') + (x.molde || ''))).map((x) => x.id),
  };
  return { items: final, conteos, avisos };
}

// ── runner HTML (autocontenido, sin librerías; localStorage con prefijo jmd- y try/catch) ──
function html(doc) {
  const data = JSON.stringify(doc).replace(/<\/script/gi, '<\\/script');
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${doc.titulo}</title>
<style>
:root{color-scheme:light dark;--bg:#f6f4ee;--fg:#1a1d29;--card:#fff;--line:#d9d4c7;--acc:#0b2a4a;--gold:#b8860b;--ok:#1b7f3b;--bad:#b3261e;--mut:#6b6f7b}
@media(prefers-color-scheme:dark){:root{--bg:#0f1420;--fg:#e8e6df;--card:#182033;--line:#2a3450;--acc:#8fb6ff;--gold:#e0b64a;--ok:#5ad27a;--bad:#ff7b72;--mut:#9aa0b3}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.45 system-ui,Segoe UI,Roboto,sans-serif}
header{position:sticky;top:0;background:var(--card);border-bottom:1px solid var(--line);padding:10px 16px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;z-index:5}
h1{font-size:16px;margin:0}.pill{border:1px solid var(--line);border-radius:999px;padding:2px 10px;font-size:12px;color:var(--mut)}
#timer{font-variant-numeric:tabular-nums;font-weight:700;font-size:20px;color:var(--acc)}#timer.low{color:var(--bad)}
main{max-width:960px;margin:0 auto;padding:16px}.q{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:12px 0}
.q h3{margin:0 0 8px;font-size:14px;color:var(--mut)}.q p{margin:0 0 10px}.opts label{display:block;padding:6px 8px;border-radius:8px;cursor:pointer}
.opts label:hover{background:color-mix(in srgb,var(--acc) 8%,transparent)}.conf{display:flex;gap:10px;margin-top:8px;font-size:13px;color:var(--mut);flex-wrap:wrap}
button{background:var(--acc);color:#fff;border:0;border-radius:8px;padding:8px 14px;font-weight:600;cursor:pointer}button.sec{background:transparent;color:var(--acc);border:1px solid var(--acc)}
button:disabled{opacity:.5;cursor:not-allowed}.ok{color:var(--ok);font-weight:700}.bad{color:var(--bad);font-weight:700}
table{border-collapse:collapse;width:100%;margin:8px 0;font-size:13px}th,td{border:1px solid var(--line);padding:4px 6px;text-align:left}th{background:color-mix(in srgb,var(--acc) 10%,transparent)}
textarea{width:100%;min-height:180px;font:12px/1.4 ui-monospace,Consolas,monospace;background:var(--card);color:var(--fg);border:1px solid var(--line);border-radius:8px;padding:8px}
.exp{font-size:13px;border-left:3px solid var(--gold);padding:6px 10px;margin-top:8px;background:color-mix(in srgb,var(--gold) 8%,transparent)}
.rev{margin-top:8px;display:grid;gap:6px;grid-template-columns:1fr 2fr 1fr}select,input[type=text]{width:100%;padding:5px;border:1px solid var(--line);border-radius:6px;background:var(--card);color:var(--fg)}
.hidden{display:none!important}.wrap{overflow-x:auto}.note{font-size:12px;color:var(--mut)}.q.locked .opts label{cursor:default;opacity:.85}.q.locked .opts label.right{outline:2px solid var(--ok)}.q.locked .opts label.wrong{outline:2px solid var(--bad)}
</style></head><body>
<header><h1>${doc.titulo}</h1><span class="pill">${doc.n} preguntas · ${doc.seg_por_q} s/Q · ${Math.round(doc.n * doc.seg_por_q / 60)} min</span><span class="pill">${doc.correccion_inmediata ? 'corrección inmediata (Palmerton)' : 'vector v3 · modo examen: solución al final'}</span>
<span id="timer">--:--</span><span id="prog" class="pill">0/${doc.n}</span><button id="start">Empezar</button><button id="finish" class="sec" disabled>Terminar y corregir</button><button id="reset" class="sec">Reiniciar</button></header>
<main>
<div id="intro" class="q"><p><b>Instrucciones.</b> ${doc.instrucciones}</p><p class="note">Regla Palmerton: marca la <b>confianza</b> en cada ítem. Un acierto con confianza «adivinada» o «dudosa» NO cuenta como conocimiento (% CIEGO = correctas seguras / total). El reloj no se detiene. Al terminar, exporta el JSON y guárdalo en <code>TRACKING_ERRORES/RONDAS/</code>; la línea de cierre va a <code>gen_encaps_semana.js --cerrar</code>.</p></div>
<div id="qs" class="hidden"></div>
<div id="res" class="hidden"></div>
</main>
<script>
const DOC=${data};
const KEY='jmd-encaps-runner-'+DOC.id;
let state={started:false,done:false,ans:{},conf:{},seg:{},startAt:null,left:DOC.n*DOC.seg_por_q,active:null,rev:{}};
function load(){try{const s=localStorage.getItem(KEY);if(s){const o=JSON.parse(s);if(o&&o.ans)state={...state,...o};}}catch(e){}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
const $=(s)=>document.querySelector(s);const fmt=(s)=>{s=Math.max(0,s|0);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');};
function revela(it,d){if(!DOC.correccion_inmediata||!state.ans[it.n]||!state.conf[it.n])return;d.classList.add('locked');d.querySelectorAll('input').forEach((i)=>i.disabled=true);
 d.querySelectorAll('.opts label').forEach((l)=>{const v=l.querySelector('input').value;if(v===it.clave)l.classList.add('right');else if(v===state.ans[it.n])l.classList.add('wrong');});
 if(!d.querySelector('.exp')){const ok=state.ans[it.n]===it.clave;const e=document.createElement('div');e.className='exp';e.innerHTML=(ok?'<span class=ok>CORRECTO</span>':'<span class=bad>FALLO</span>')+' · <b>'+it.clave+') '+esc(it.respuesta||it.opciones[it.clave])+'</b>'+(it.explicacion?'<br>'+esc(it.explicacion):'')+(it.fuente?'<br><span class=note>Fuente: '+esc(it.fuente)+'</span>':'')+(it.verificado_contra?'<br><span class=note>Verificado contra: '+esc(it.verificado_contra)+'</span>':'');d.appendChild(e);}}
function render(){const box=$('#qs');box.innerHTML='';DOC.items.forEach((it)=>{const d=document.createElement('div');d.className='q';d.dataset.n=it.n;
 d.innerHTML='<h3>Pregunta '+it.n+' de '+DOC.n+(DOC.mostrar_codigo?' · '+(it.codigo||'')+(it.subangulo?' · '+esc(it.subangulo):'')+' · '+(it.formato||''):'')+'</h3><p>'+esc(it.enunciado)+'</p><div class="opts">'+
 Object.entries(it.opciones).map(([k,v])=>'<label><input type="radio" name="a'+it.n+'" value="'+k+'"'+(state.ans[it.n]===k?' checked':'')+'> <b>'+k+')</b> '+esc(v)+'</label>').join('')+'</div>'+
 '<div class="conf">Confianza: '+[1,2,3].map((c)=>'<label><input type="radio" name="c'+it.n+'" value="'+c+'"'+(state.conf[it.n]==c?' checked':'')+'> '+({1:'adivinada',2:'dudosa',3:'segura'})[c]+'</label>').join('')+'</div>';
 d.addEventListener('mouseenter',()=>state.active=it.n);d.addEventListener('focusin',()=>state.active=it.n);
 d.querySelectorAll('input[name=a'+it.n+']').forEach((r)=>r.addEventListener('change',()=>{state.ans[it.n]=r.value;save();prog();revela(it,d);}));
 d.querySelectorAll('input[name=c'+it.n+']').forEach((r)=>r.addEventListener('change',()=>{state.conf[it.n]=+r.value;save();revela(it,d);}));
 box.appendChild(d);if(state.ans[it.n]&&state.conf[it.n])revela(it,d);});}
function esc(s){return String(s).replace(/[&<>]/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]);}
function prog(){$('#prog').textContent=Object.keys(state.ans).length+'/'+DOC.n;}
let tick=null;function startTimer(){clearInterval(tick);tick=setInterval(()=>{if(state.done)return clearInterval(tick);state.left--;if(state.active)state.seg[state.active]=(state.seg[state.active]||0)+1;
 $('#timer').textContent=fmt(state.left);if(state.left<=120)$('#timer').classList.add('low');if(state.left%5===0)save();if(state.left<=0){finish(true);}},1000);}
function start(){state.started=true;state.startAt=state.startAt||new Date().toISOString();save();$('#intro').classList.add('hidden');$('#qs').classList.remove('hidden');$('#start').disabled=true;$('#finish').disabled=false;startTimer();}
function finish(auto){if(state.done)return;if(!auto){const sin=DOC.items.filter((it)=>!state.ans[it.n]).length;if(sin&&!confirm(sin+' preguntas sin responder. ¿Terminar igual? (quedan como fallo)'))return;}
 state.done=true;clearInterval(tick);save();$('#qs').classList.add('hidden');$('#finish').disabled=true;corregir();}
function corregir(){const res=$('#res');res.classList.remove('hidden');const rows=DOC.items.map((it)=>{const tu=state.ans[it.n]||null,ok=tu===it.clave,conf=state.conf[it.n]||1;return {it,tu,ok,conf,seg:state.seg[it.n]||0};});
 const n=rows.length,ok=rows.filter((r)=>r.ok).length,seg=rows.filter((r)=>r.ok&&r.conf===3).length,dud=ok-seg,pct=(a,b)=>b?Math.round(a/b*1000)/10:0;
 const grp=(f)=>{const m={};rows.forEach((r)=>{const k=f(r.it)||'—';(m[k]=m[k]||{n:0,ok:0,seg:0});m[k].n++;if(r.ok)m[k].ok++;if(r.ok&&r.conf===3)m[k].seg++;});return m;};
 const tabla=(t,m,orden)=>'<h3>'+t+'</h3><div class="wrap"><table><tr><th>'+t+'</th><th>n</th><th>ok</th><th>seguras</th><th>% bruto</th><th>% ciego</th><th>brecha = n×(1−ciego)</th></tr>'+
  (orden||Object.keys(m)).filter((k)=>m[k]).map((k)=>'<tr><td>'+k+'</td><td>'+m[k].n+'</td><td>'+m[k].ok+'</td><td>'+m[k].seg+'</td><td>'+pct(m[k].ok,m[k].n)+'</td><td>'+pct(m[k].seg,m[k].n)+'</td><td>'+(Math.round(m[k].n*(1-m[k].seg/m[k].n)*10)/10)+'</td></tr>').join('')+'</table></div>';
 const areas=grp((it)=>it.area),cods=grp((it)=>it.codigo),fmts=grp((it)=>it.formato_pretest||it.formato),subs=grp((it)=>it.sub_eje||it.subangulo);
 const nota=DOC.n===25?'<b>NOTA '+ok+'/25</b> (umbral ≥'+DOC.umbral+' · alerta <'+DOC.alerta+')':'<b>'+ok+'/'+n+'</b>'+(DOC.umbral?' (umbral '+DOC.umbral+'%)':'');
 let h='<div class="q"><h2 style="margin:0 0 6px">Resultado</h2><p>'+nota+' · % bruto <b>'+pct(ok,n)+'%</b> · <b>% CIEGO REAL '+pct(seg,n)+'%</b> (seguras '+seg+' · dudosas/adivinadas '+dud+' · fallos '+(n-ok)+') · tiempo usado '+fmt(DOC.n*DOC.seg_por_q-state.left)+'</p>'+
  tabla('Área',areas,['II','I','V','III','IV'])+tabla('Código',Object.fromEntries(Object.entries(cods).sort((a,b)=>b[1].n-a[1].n)))+(Object.keys(subs).length>1?tabla('Sub-eje',subs):'')+tabla('Formato',fmts)+'</div>';
 h+='<div class="q"><h2 style="margin:0 0 6px">Revisión ítem a ítem</h2><p class="note">Para cada fallo clasifica el tipo (knowledge: CONCEPTO · OLVIDO · CRONOLOGIA · transfer: CCSN · CONTEXTO · proceso: CAMBIO · TIEMPO · LECTURA), escribe la causa en una línea y la ruta (ANKI · OBSIDIAN · AMBOS). Se incluye en el export. Todo OLVIDO de cifra → tarjeta en ANKI_COLA/ENCAPS_Cifras_2027-I.csv esa misma tarde.</p>'+
  rows.map((r)=>{const it=r.it;return '<div class="q" style="margin:8px 0"><h3>'+it.n+' · '+(it.codigo||'')+(it.sub_eje?' · '+it.sub_eje:'')+' · '+(it.formato||'')+' · '+(r.ok?'<span class=ok>OK</span>':'<span class=bad>FALLO</span>')+' · tu: '+(r.tu||'—')+' · clave: <b>'+it.clave+'</b> · confianza: '+({1:'adivinada',2:'dudosa',3:'segura'})[r.conf]+' · '+r.seg+' s'+(r.ok&&r.conf<3?' · <span class=bad>acierto NO ciego</span>':'')+(r.seg>DOC.seg_por_q?' · <span class=bad>TIEMPO</span>':'')+'</h3><p>'+esc(it.enunciado)+'</p>'+
  '<div class="exp"><b>'+it.clave+') '+esc(it.respuesta||it.opciones[it.clave])+'</b>'+(it.explicacion?'<br>'+esc(it.explicacion):'')+(it.fuente?'<br><span class=note>Fuente: '+esc(it.fuente)+'</span>':'')+(it.verificado_contra?'<br><span class=note>Verificado contra: '+esc(it.verificado_contra)+'</span>':'')+'</div>'+
  (!r.ok||r.conf<3?'<div class="rev"><select data-n="'+it.n+'" data-k="error"><option value="">tipo de error…</option>'+['CONCEPTO','OLVIDO','CRONOLOGIA','CCSN','CONTEXTO','CAMBIO','TIEMPO','LECTURA'].map((e)=>'<option>'+e+'</option>').join('')+'</select><input type="text" data-n="'+it.n+'" data-k="causa" placeholder="causa en una línea (qué razonamiento te llevó ahí)"><select data-n="'+it.n+'" data-k="ruta"><option value="">ruta…</option><option>ANKI</option><option>OBSIDIAN</option><option>AMBOS</option></select></div>':'')+'</div>';}).join('')+'</div>';
 h+='<div class="q"><h2 style="margin:0 0 6px">Exportar</h2><p><button id="build">Generar JSON de la ronda</button> <button id="copy" class="sec">Copiar</button> <button id="dl" class="sec">Descargar .json</button></p><textarea id="out" readonly></textarea><p class="note" id="linea"></p></div>';
 res.innerHTML=h;
 res.querySelectorAll('[data-k]').forEach((el)=>el.addEventListener('change',()=>{const n=el.dataset.n;(state.rev[n]=state.rev[n]||{})[el.dataset.k]=el.value;save();}));
 const build=()=>{const fall={knowledge:{CONCEPTO:0,OLVIDO:0,CRONOLOGIA:0},transfer:{CCSN:0,CONTEXTO:0},proceso:{CAMBIO:0,TIEMPO:0,LECTURA:0}};const T={CONCEPTO:'knowledge',OLVIDO:'knowledge',CRONOLOGIA:'knowledge',CCSN:'transfer',CONTEXTO:'transfer',CAMBIO:'proceso',TIEMPO:'proceso',LECTURA:'proceso'};
  const preguntas=rows.map((r)=>{const rv=state.rev[r.it.n]||{};let err=r.ok?null:(rv.error||null);if(!r.ok&&!err&&r.seg>DOC.seg_por_q)err='TIEMPO';if(!r.ok){const e=err||'CONCEPTO';fall[T[e]][e]++;}
   return {n:r.it.n,id:r.it.id||null,codigo:r.it.codigo||null,sub_eje:r.it.sub_eje||null,subangulo:r.it.subangulo||r.it.subtema||null,formato:r.it.formato_pretest||r.it.formato||null,fecha:DOC.fecha,bloque:DOC.tipoRonda,tu:r.tu,correcta:r.it.clave,ok:r.ok,confianza:({1:'adivinada',2:'dudosa',3:'segura'})[r.conf],acierto_por_suerte:r.ok&&r.conf<3,seg:r.seg,error:err,causa:rv.causa||null,ruta:rv.ruta||null,fallo_previo:r.it.fallo_previo||null};});
  const tmed=Math.round(rows.reduce((a,r)=>a+r.seg,0)/n);
  const ronda={id:DOC.id,examen:'ENCAPS',tipoRonda:DOC.tipoRonda,fecha:DOC.fecha,codigo:DOC.codigo,tema:DOC.tema,sub_eje:DOC.sub_eje||null,fuente_preguntas:DOC.fuente_preguntas,vector_referencia:'v3 II30·I27·V21·III13·IV9',n:n,correctas_seguras:seg,correctas_dudosas:dud,fallos_por_tipo:fall,tiempo_medio_seg:tmed,tiempo_total_min:Math.round((DOC.n*DOC.seg_por_q-state.left)/60),pct_ciego:pct(seg,n),nota:ok,puntaje:ok+'/'+n,
   por_area:Object.fromEntries(Object.entries(areas).map(([k,v])=>[k,{n:v.n,ok:v.ok,seguras:v.seg}])),por_codigo:Object.fromEntries(Object.entries(cods).map(([k,v])=>[k,{n:v.n,ok:v.ok,seguras:v.seg,brecha:Math.round(v.n*(1-v.seg/v.n)*10)/10}])),por_formato:Object.fromEntries(Object.entries(fmts).map(([k,v])=>[k,{n:v.n,ok:v.ok,seguras:v.seg}])),preguntas};
  const fl=Object.values(fall).flatMap((g)=>Object.entries(g)).filter(([,v])=>v).map(([k,v])=>k+':'+v).join(',')||'CONCEPTO:0';
  const linea='ENCAPS|'+DOC.tipoRonda+'|'+DOC.fecha+'|'+DOC.codigo+'|n='+n+'|seg='+seg+'|dud='+dud+'|'+fl+'|t='+tmed+(DOC.sub_eje?'|sub='+DOC.sub_eje:'')+'|tema='+DOC.tema.replace(/\\|/g,'/')+(DOC.n===25?'|nota='+ok:'');
  $('#out').value=JSON.stringify(ronda,null,1);$('#linea').innerHTML='Línea de cierre (gen_encaps_semana.js --cerrar): <code>'+esc(linea)+'</code>';return ronda;};
 $('#build').addEventListener('click',build);$('#copy').addEventListener('click',()=>{build();$('#out').select();try{navigator.clipboard.writeText($('#out').value);}catch(e){document.execCommand('copy');}});
 $('#dl').addEventListener('click',()=>{const r=build();const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(r,null,1)],{type:'application/json'}));a.download=DOC.id+'.json';a.click();});
 build();}
load();render();prog();$('#timer').textContent=fmt(state.left);
$('#start').addEventListener('click',start);$('#finish').addEventListener('click',()=>finish(false));
$('#reset').addEventListener('click',()=>{if(!confirm('¿Borrar respuestas y reiniciar el reloj?'))return;try{localStorage.removeItem(KEY);}catch(e){}location.reload();});
if(state.started&&!state.done){$('#intro').classList.add('hidden');$('#qs').classList.remove('hidden');$('#start').disabled=true;$('#finish').disabled=false;startTimer();}
if(state.done){$('#intro').classList.add('hidden');corregir();}
</script></body></html>`;
}

// ── modos ──
function modoMinisim(fecha) {
  if (dowDe(fecha) !== 5) console.warn(`⚠ ${fecha} no es viernes (${WD[dowDe(fecha)]})`);
  const { fallos, debiles, pretestHecho } = leerRegistro();
  const { pool, rechazados } = cargarPool(pretestHecho);
  const usados = usadosPrevios(`minisim_${fecha}`);
  const cola = colaLargaDe(fecha);
  const { items, conteos, avisos } = armarSet(fecha, pool, usados, cola, fallos, debiles);
  const id = `MINISIM_${fecha}`;
  const doc = {
    id, titulo: `Mini-simulacro ENCAPS · viernes ${fecha}`, tipoRonda: 'mini_sim', fecha, codigo: 'MIX', tema: `mini-sim v3 · cola larga ${cola.codigos.join('+')}`,
    fuente_preguntas: `BANCO_PROPIO (${[...new Set(items.map((x) => x._file))].join(', ')}) · moldes 2024-2A→2026-1 · claves verificadas por ítem`,
    n: items.length, seg_por_q: RECETA_MINISIM.seg_por_q, umbral: RECETA_MINISIM.umbral_25, alerta: RECETA_MINISIM.alerta_25, mostrar_codigo: false,
    instrucciones: `25 preguntas mixtas (8 II · 7 I · 5 V · 3 III · 2 IV), 72 s por pregunta = 30 min. Cola larga de hoy: ${cola.codigos.join(' + ')}. Sin material, sin pausa; la corrección aparece solo al terminar.`,
    _meta: { generado: new Date().toISOString().slice(0, 10), receta: RECETA_MINISIM, cola_larga: cola, conteos, avisos, lista_negra_2026_II: pretestHecho ? 'levantada (ronda PRETEST_2026-II encontrada)' : 'VIGENTE: ítems con 2026-2/2026-II excluidos', rechazados: rechazados.slice(0, 20), pool_disponible: pool.filter((x) => !usados.has(x.id)).length },
    items: items.map(({ _file, _motivo, ...it }) => ({ ...it, motivo_seleccion: _motivo })),
  };
  console.log(`MINI-SIM ${fecha} · ${items.length}Q · áreas ${JSON.stringify(conteos.por_area)} · viñeta ${conteos.vinetas}/directa ${conteos.directas} · críticos ${conteos.criticos} · fallos previos ${conteos.fallos_previos} · cola larga ${conteos.cola_larga} (${cola.codigos.join('+')}, ${cola.origen}) · clave oficial ${conteos.verificados_clave_oficial}/${items.length}`);
  console.log('por código:', JSON.stringify(conteos.por_codigo));
  if (conteos.moldes_no_verificables.length) console.log('moldes no verificables contra clave oficial:', conteos.moldes_no_verificables.join(', '));
  if (rechazados.length) console.log('rechazados:', rechazados.length, rechazados.slice(0, 5).map((r) => r.join(' ')).join(' · '));
  for (const a of avisos) console.warn('⚠', a);
  if (items.length !== 25) { console.error('✗ el set no tiene 25 preguntas: no se escribe'); process.exit(1); }
  if (!DRY) { escribir(`minisim_${fecha}`, doc); }
}

// BANCO DEL DÍA (lun-jue 16:30-17:10): 16-20Q del código + sub-eje de la fila banqueo1h + 4-5Q del secundario
function modoBanco(fecha) {
  const fila = filaSQL(fecha);
  if (!fila) throw new Error(`no hay fila en _encaps_mantenimiento_2027.sql para ${fecha} (¿fin de semana/feriado o SQL no regenerado?)`);
  if (fila.tipo !== 'banqueo1h') throw new Error(`${fecha} es '${fila.tipo}', no banqueo1h (para viernes usar el mini-sim)`);
  const { pretestHecho } = leerRegistro();
  const { pool, rechazados } = cargarPool(pretestHecho);
  const usados = usadosPrevios(`banco_${fecha}`);
  const r = rng(fecha + 'banco');
  const codigoPool = poolCode(fila.codigo);
  const subEje = fila.extra.sub_eje || null;
  const secundario = (fila.secundarios.find((s) => s.rol === 'cola_larga') || {}).codigo || fila.extra.secundario || null;
  const cand = shuffle(pool.filter((it) => !usados.has(it.id)), r);
  const avisos = [];
  // principal: primero el sub-eje del día, luego otros sub-ejes del mismo código; 20Q máx, 16 mín; ≥40 % recall directo
  const delCodigo = cand.filter((it) => poolCode(it.codigo) === codigoPool);
  const delSub = delCodigo.filter((it) => subEje && it.sub_eje === subEje);
  const otrosSub = delCodigo.filter((it) => !(subEje && it.sub_eje === subEje));
  const principal = [];
  const objetivoP = Math.min(20, delCodigo.length);
  const tomaBalanceado = (lista, cupo) => {
    const dir = lista.filter(esRecallDirecto), vin = lista.filter((x) => !esRecallDirecto(x));
    while (principal.length < cupo && (dir.length || vin.length)) {
      const pctDir = principal.length ? principal.filter(esRecallDirecto).length / principal.length : 0;
      const it = (pctDir < 0.4 && dir.length) ? dir.shift() : (vin.length ? vin.shift() : dir.shift());
      principal.push(it);
    }
  };
  tomaBalanceado(delSub, objetivoP);
  if (principal.length < objetivoP) tomaBalanceado(otrosSub, objetivoP);
  if (principal.length < 16) avisos.push(`principal: solo ${principal.length}Q de ${codigoPool} en el pool (receta 16-20)`);
  if (subEje && delSub.length + principal.filter((x) => x.sub_eje === subEje).length < 8) avisos.push(`sub-eje '${subEje}': solo ${principal.filter((x) => x.sub_eje === subEje).length}Q ciñéndose al sub-eje; el resto es del código`);
  // secundario: 4-5Q
  const sec = secundario ? cand.filter((it) => poolCode(it.codigo) === poolCode(secundario) && !principal.includes(it)).slice(0, 5) : [];
  if (secundario && sec.length < 4) avisos.push(`secundario ${secundario}: solo ${sec.length}Q en el pool (receta 4-5)`);
  const items = [...principal, ...sec].map((it, i) => ({ n: i + 1, ...it, rol: principal.includes(it) ? 'principal' : 'secundario' }));
  if (!items.length) throw new Error('sin ítems');
  const conteos = { principal: principal.length, secundario: sec.length, recall_directo_pct: Math.round(100 * principal.filter(esRecallDirecto).length / Math.max(1, principal.length)), por_sub_eje: principal.reduce((a, x) => ((a[x.sub_eje || '?'] = (a[x.sub_eje || '?'] || 0) + 1), a), {}), reales: items.filter((x) => /CLAVE OFICIAL/i.test(x.verificado_contra || '')).length };
  const doc = {
    id: `BANCO_${fecha}`, titulo: `Banco del día ENCAPS · ${WD[dowDe(fecha)]} ${fecha} · ${fila.codigo}${subEje ? ' · ' + subEje : ''}`, tipoRonda: 'banco_dia', fecha, codigo: fila.codigo, sub_eje: subEje,
    tema: fila.subtema, fuente_preguntas: `BANCO_PROPIO (${[...new Set(items.map((x) => x._file))].join(', ')})`,
    n: items.length, seg_por_q: 90, umbral: 75, alerta: 60, mostrar_codigo: true, correccion_inmediata: true,
    instrucciones: `${principal.length}Q CIEGAS de ${fila.codigo}${subEje ? ' (sub-eje: ' + subEje + ')' : ''} + ${sec.length}Q del secundario de cola larga ${secundario || ''}. Corrección INMEDIATA al marcar respuesta + confianza (Palmerton: intenta primero, luego lee la clave y recalibra). Meta crucero ≥75 % ciego. Al terminar: exporta el JSON → línea de cierre → gen_encaps_semana.js --cerrar.`,
    _meta: { generado: new Date().toISOString().slice(0, 10), fila_sql: { dia: fila.dia, tipo: fila.tipo, codigo: fila.codigo, sub_eje: subEje, secundario, instancia: fila.extra.instancia, de: fila.extra.de }, conteos, avisos, lista_negra_2026_II: pretestHecho ? 'levantada' : 'VIGENTE', rechazados: rechazados.slice(0, 10), pool_disponible_codigo: delCodigo.length - principal.length },
    items: items.map(({ _file, ...it }) => it),
  };
  console.log(`BANCO ${fecha} (${WD[dowDe(fecha)]}) · ${fila.codigo}${subEje ? ' · ' + subEje : ''} · ${principal.length}Q principal (${conteos.recall_directo_pct}% recall directo; sub-ejes ${JSON.stringify(conteos.por_sub_eje)}) + ${sec.length}Q secundario ${secundario || '—'} · reales ${conteos.reales}/${items.length} · quedan ${delCodigo.length - principal.length}Q de ${codigoPool} en el pool`);
  for (const a of avisos) console.warn('⚠', a);
  if (!DRY) escribir(`banco_${fecha}`, doc);
}

// EVAL ANCLADA (mar-vie 16:15): 5Q del código de AYER = 3 cifras + 2 viñetas, solución al final; lunes = 5Q de fallos previos
function modoEval(fecha) {
  const fila = filaSQL(fecha);
  if (!fila) throw new Error(`no hay fila en _encaps_mantenimiento_2027.sql para ${fecha}`);
  let ayer = addDays(fecha, -1), filaAyer = filaSQL(ayer), back = 1;
  while (!filaAyer && back < 6) { back++; ayer = addDays(fecha, -back); filaAyer = filaSQL(ayer); }
  if (!filaAyer) throw new Error('no se encuentra la sesión anterior en el SQL');
  const { fallos, debiles, pretestHecho } = leerRegistro();
  const { pool } = cargarPool(pretestHecho);
  const usados = usadosPrevios(`eval_${fecha}`);
  const r = rng(fecha + 'eval');
  const cand = shuffle(pool.filter((it) => !usados.has(it.id)), r);
  const esFalloPrevio = (it) => !!it.fallo_previo && (fallos.has(norm(it.fallo_previo)) || debiles.has(it.codigo));
  let items = []; let modo;
  if (filaAyer.tipo === 'mini_sim' || !filaAyer.codigo) {
    modo = 'lunes: 5Q de fallos previos del registro (otro enfoque), críticos primero';
    const fp = cand.filter(esFalloPrevio).sort((a, b) => (CRITICOS_V3.includes(b.codigo) - CRITICOS_V3.includes(a.codigo)));
    items = fp.slice(0, 5);
    if (items.length < 5) items = items.concat(cand.filter((x) => CRITICOS_V3.includes(x.codigo) && !items.includes(x)).slice(0, 5 - items.length));
  } else {
    modo = `código de ayer ${filaAyer.codigo}: 3 cifras + 2 viñetas`;
    const delCod = cand.filter((it) => poolCode(it.codigo) === poolCode(filaAyer.codigo));
    const pref = (l) => l.sort((a, b) => ((b.sub_eje === filaAyer.extra.sub_eje) - (a.sub_eje === filaAyer.extra.sub_eje)));
    const cifras = pref(delCod.filter(esCifra)); const directas = pref(delCod.filter((x) => !esVineta(x) && !esCifra(x))); const vin = pref(delCod.filter((x) => esVineta(x) && !esCifra(x)));
    items = cifras.slice(0, 3);
    if (items.length < 3) items = items.concat(directas.slice(0, 3 - items.length));
    items = items.concat(vin.slice(0, 2));
    if (items.length < 5) items = items.concat(delCod.filter((x) => !items.includes(x)).slice(0, 5 - items.length));
  }
  if (items.length < 5) console.warn(`⚠ eval ${fecha}: solo ${items.length}Q disponibles`);
  items = items.map((it, i) => ({ n: i + 1, ...it }));
  const doc = {
    id: `EVAL_${fecha}`, titulo: `Eval anclada ENCAPS · ${WD[dowDe(fecha)]} ${fecha} · ${filaAyer.codigo || 'fallos previos'}`, tipoRonda: 'eval_anclada', fecha, codigo: filaAyer.codigo || 'MIX', sub_eje: filaAyer.extra.sub_eje || null,
    tema: `eval anclada · ${modo}`, fuente_preguntas: `BANCO_PROPIO (${[...new Set(items.map((x) => x._file))].join(', ')})`,
    n: items.length, seg_por_q: 72, umbral: 60, alerta: 60, mostrar_codigo: false,
    instrucciones: `5 preguntas del tema de AYER (${modo}), de memoria, sin material; solución al final. Si fallas ≥2 el código queda CALIENTE para el override del viernes (gen_encaps_semana.js).`,
    _meta: { generado: new Date().toISOString().slice(0, 10), sesion_anterior: { fecha: ayer, tipo: filaAyer.tipo, codigo: filaAyer.codigo, sub_eje: filaAyer.extra.sub_eje || null }, modo, lista_negra_2026_II: pretestHecho ? 'levantada' : 'VIGENTE' },
    items: items.map(({ _file, ...it }) => it),
  };
  console.log(`EVAL ${fecha} · ${modo} · ${items.length}Q (${items.filter(esCifra).length} cifra · ${items.filter((x) => esVineta(x) && !esCifra(x)).length} viñeta · ${items.filter((x) => !esVineta(x) && !esCifra(x)).length} directa)`);
  if (!DRY) escribir(`eval_${fecha}`, doc);
}
function modoSemana(lunes) {
  if (dowDe(lunes) !== 1) throw new Error(`${lunes} no es lunes`);
  for (let i = 0; i < 5; i++) {
    const f = addDays(lunes, i); const fila = filaSQL(f);
    if (!fila) { console.log(`— ${f}: sin sesión (feriado)`); continue; }
    if (fila.tipo === 'banqueo1h') { // viernes (mini_sim) no lleva eval anclada: el mini-sim ocupa las 16:15
      if (i > 0) { try { modoEval(f); } catch (e) { console.warn('⚠ eval', f, e.message); } }
      try { modoBanco(f); } catch (e) { console.warn('⚠ banco', f, e.message); }
    }
    else if (fila.tipo === 'mini_sim') { if (fs.existsSync(path.join(OUT_DIR, `minisim_${f}.json`))) console.log(`— ${f}: minisim ya existe`); else modoMinisim(f); }
  }
}
function modoPretest() {
  const src = readJSON(path.join(ENCAPS, '_examen_2026-2_items.json'));
  const items = src.items.map((it) => ({ n: it.numero, id: `2026-II-Q${it.numero}`, codigo: it.codigo, area: areaDe(it.codigo), formato: it.tipo, formato_pretest: it.formato_pretest, subangulo: it.subtema, enunciado: it.enunciado, opciones: it.opciones, clave: it.clave, respuesta: it.respuesta, fuente: 'ENCAPS/SERUMS 2026-II (clave oficial verificada 100/100)', verificado_contra: 'CLAVE OFICIAL 2026-II (resaltados del PDF, 27-ago-2026)' }));
  const doc = { id: 'PRETEST_2026-II', titulo: 'PRE-TEST DIAGNÓSTICO · examen real ENCAPS 2026-II (100Q)', tipoRonda: 'pretest', fecha: fechaArg || '2027-02-05', codigo: 'MIX', tema: 'pre-test 2026-II · arranque fase intensiva', fuente_preguntas: 'DATA/ENCAPS/_examen_2026-2_items.json (examen real 2026-II · clave oficial 100/100 · LISTA NEGRA levantada al cerrar esta ronda)', n: 100, seg_por_q: 72, umbral: 70, alerta: 60, mostrar_codigo: false, instrucciones: 'Examen real 2026-II en orden original, 100 preguntas, 72 s/Q = 120 min sin pausa. Sin material. Umbral de arranque ≥70/100. Protocolo: DATA/ENCAPS/PRETEST_2026-II.md.', items };
  escribir('pretest_2026-II', doc);
}
function modoSim100(proceso) {
  const fecha = fechaArg || new Date().toISOString().slice(0, 10);
  let items, fuente;
  if (proceso === 'propio') {
    const { pretestHecho } = leerRegistro();
    const { pool } = cargarPool(pretestHecho);
    const usados = usadosPrevios(`sim100_propio_${fecha}`);
    const r = rng(fecha + 'sim100');
    const cuota = Object.fromEntries(Object.entries(VECTOR_V3).map(([a, v]) => [a, v.pct]));
    items = [];
    for (const it of shuffle(pool.filter((x) => !usados.has(x.id)), r)) if (cuota[it.area] > 0) { items.push(it); cuota[it.area]--; }
    if (items.length < 100) console.warn(`⚠ banco propio insuficiente para 100Q: ${items.length} (faltan ${JSON.stringify(cuota)})`);
    items = items.map((it, i) => ({ n: i + 1, ...it }));
    fuente = 'BANCO_PROPIO (vector v3 ×4, ítems no usados en minisim_/banco_/eval_)';
  } else {
    const j = readJSON(path.join(BANCO, '_examenes_reales_2024-2A_2026-1.json'));
    const ex = j.examenes[proceso];
    if (!ex) throw new Error('proceso desconocido: ' + proceso + ' (usar 2024-2A · 2025-1A · 2025-2 · propio)');
    if (!ex.con_clave) throw new Error(`${proceso} no tiene clave oficial en disco: no se puede corregir (usar solo como molde)`);
    let etq = null; try { etq = readJSON(path.join(BANCO, '_etiquetas_examenes_reales_v3.json')).items[proceso] || null; } catch (e) { /* sin etiquetas */ }
    items = ex.items.map((it) => { const e = etq && etq[it.numero]; return { n: it.numero, id: `${proceso}-Q${it.numero}`, codigo: e ? e.codigo : 'sin clasificar', area: e ? areaDe(e.codigo) : '—', formato: e ? e.formato : '—', sub_eje: e ? e.sub_eje : null, enunciado: it.enunciado, opciones: it.opciones, clave: it.clave, respuesta: it.respuesta, fuente: `ENCAPS/SERUMS ${proceso} (clave oficial)`, verificado_contra: it.clave_verificacion }; });
    fuente = `exams_txt/${proceso}.txt + clave oficial (resaltados del PDF)${etq ? ' · códigos v3 de _etiquetas_examenes_reales_v3.json' : ''}`;
  }
  const doc = { id: `SIM100_${proceso}_${fecha}`, titulo: `Simulacro 100Q · ${proceso} · ${fecha}`, tipoRonda: 'simulacro', fecha, codigo: 'MIX', tema: `simulacro 100Q ${proceso}`, fuente_preguntas: fuente, n: items.length, seg_por_q: 72, umbral: 85, alerta: 70, mostrar_codigo: false, instrucciones: `${items.length} preguntas · 72 s/Q · sin pausa · corrección al final.`, items };
  escribir(`sim100_${proceso}_${fecha}`, doc);
}
function modoRegistrar(file, append) {
  const ronda = readJSON(path.resolve(file));
  if (!ronda.id || !ronda.fecha || ronda.n == null) throw new Error('el JSON no parece un export del runner (faltan id/fecha/n)');
  fs.mkdirSync(RONDAS, { recursive: true });
  const dst = path.join(RONDAS, `${ronda.id}.json`);
  fs.writeFileSync(dst, JSON.stringify(ronda, null, 1) + '\n', 'utf8');
  console.log('guardado →', dst);
  const fl = Object.values(ronda.fallos_por_tipo || {}).flatMap((g) => Object.entries(g)).filter(([, v]) => v).map(([k, v]) => `${k}:${v}`).join(',') || 'CONCEPTO:0';
  const linea = `ENCAPS|${ronda.tipoRonda}|${ronda.fecha}|${ronda.codigo || 'MIX'}|n=${ronda.n}|seg=${ronda.correctas_seguras}|dud=${ronda.correctas_dudosas}|${fl}|t=${ronda.tiempo_medio_seg || 0}${ronda.sub_eje ? `|sub=${ronda.sub_eje}` : ''}|tema=${String(ronda.tema || '').replace(/\|/g, '/')}${ronda.tipoRonda === 'mini_sim' ? `|nota=${ronda.nota}` : ''}`;
  if (append) {
    const reg = readJSON(REG);
    if ((reg.rondas || []).some((r) => r.id === ronda.id)) { console.warn('⚠ la ronda ya está en el registro: no se duplica'); }
    else { reg.rondas.push(ronda); reg._meta = reg._meta || {}; reg._meta.actualizado = new Date().toISOString().slice(0, 10); fs.writeFileSync(REG, JSON.stringify(reg, null, 1) + '\n', 'utf8'); console.log('apendado a _registro_resoluciones.json (rondas[] =', reg.rondas.length, ')'); }
    console.log('→ recalcular resumen/semana: node DATA/_scripts/gen_encaps_semana.js');
  } else {
    console.log('→ cerrar con: node DATA/_scripts/gen_encaps_semana.js --cerrar "' + linea + '"');
    console.log('   (o --append aquí para apendar la ronda completa con preguntas[] al registro)');
  }
}

// INVENTARIO por código v3: oferta (sets, reales etiquetados, banco_items_v1, claves.json, plataformas) vs demanda sembrada → déficit
function modoInventario() {
  const { pretestHecho, reg } = leerRegistro();
  const { pool } = cargarPool(pretestHecho);
  const usados = usadosPrevios('__ninguno__');
  // demanda desde el SQL de mantenimiento
  const demanda = {}; const D = (c, k, v = 1) => { const cc = poolCode(c); demanda[cc] = demanda[cc] || { sesiones_principal: 0, slots_secundario: 0, viernes_cola_larga: 0 }; demanda[cc][k] += v; };
  let filas = 0, minisims = 0;
  try {
    for (const l of fs.readFileSync(SQL_MANT, 'utf8').split('\n')) {
      if (!l.startsWith(`('ENCAPS',`)) continue;
      const m = l.match(/^\('ENCAPS',\d+,'([\d-]+)'/); if (!m) continue;
      const f = filaSQL(m[1]); if (!f) continue; filas++;
      if (f.tipo === 'banqueo1h') { D(f.codigo, 'sesiones_principal'); for (const s of f.secundarios) if (s.rol === 'cola_larga') D(s.codigo, 'slots_secundario'); for (const s of f.secundarios) if (s.rol === 'paraguas') D(s.codigo, 'sesiones_principal', 0); }
      if (f.tipo === 'mini_sim') { minisims++; for (const c of f.extra.cola_larga || []) D(c, 'viernes_cola_larga'); }
    }
  } catch (e) { console.warn('⚠ SQL de mantenimiento no legible:', e.message); }
  // oferta: pool por código y fichero
  const codigos = new Set([...Object.keys(demanda), ...pool.map((x) => poolCode(x.codigo)), ...CRITICOS_V3, ...REBOTE_V3, ...COLA_LARGA.map((c) => c.codigo)]);
  let etq = null; try { etq = readJSON(path.join(BANCO, '_etiquetas_examenes_reales_v3.json')); } catch (e) { /* */ }
  const realesPorCod = {}; if (etq) for (const [p, qs] of Object.entries(etq.items)) for (const [n, e] of Object.entries(qs)) { const c = poolCode(e.codigo); realesPorCod[c] = realesPorCod[c] || { total: 0, por_proceso: {} }; realesPorCod[c].total++; realesPorCod[c].por_proceso[p] = (realesPorCod[c].por_proceso[p] || 0) + 1; }
  // claves.json de julio/agosto (sets propios previos)
  const clavesJson = {}; const TR = path.join(ENCAPS, 'TRACKING_ERRORES');
  for (const f of fs.readdirSync(TR)) { if (!/claves\.json$/.test(f)) continue; try { const j = readJSON(path.join(TR, f)); const qs = j.preguntas || []; for (const q of qs) { const c = poolCode(q.cod || q.codigo || (j.area && /^[IV]+-\d/.test(j.area) ? j.area : null) || 'I-3'); clavesJson[c] = clavesJson[c] || {}; clavesJson[c][f] = (clavesJson[c][f] || 0) + 1; } } catch (e) { /* */ } }
  // resueltas: rondas del registro + ítems ya consumidos por el runner
  const resueltas = {}; for (const ro of reg.rondas || []) { if (ro.examen && ro.examen !== 'ENCAPS') continue; const qs = ro.preguntas || []; if (qs.length) for (const q of qs) { const c = poolCode(q.codigo || ro.codigo || 'I-3'); resueltas[c] = (resueltas[c] || 0) + 1; } else if (ro.codigo) resueltas[poolCode(ro.codigo)] = (resueltas[poolCode(ro.codigo)] || 0) + (ro.n || ro.total || 0); }
  const consumidos = {}; for (const it of pool) if (usados.has(it.id)) { const c = poolCode(it.codigo); consumidos[c] = (consumidos[c] || 0) + 1; }
  // plataformas (encapsResumenes.ts: postests Theomed por área + QX banqueo por área, scan 20-jul-2026)
  const AREA_LABEL = { I: 'Salud Pública', II: 'Cuidado Integral', III: 'Ética e Interculturalidad', IV: 'Investigación', V: 'Gestión de Servicios' };
  const QX_AREA = { I: 688, III: 255, II: 1109, IV: null, V: null }; // 'Investigación y Gestión pendientes' (encapsResumenes.ts barrido2007) — A VERIFICAR re-scan 7-sep
  let postests = {}; try { const src = fs.readFileSync(path.join(ROOT, 'src/lib/encapsResumenes.ts'), 'utf8'); const seg = src.slice(src.indexOf('ENCAPS_POSTESTS'), src.indexOf('ENCAPS_THEOMED_RESUMENES')); for (const [, area, body] of seg.matchAll(/'([^']+)':\s*\[([\s\S]*?)\n\s*\],?\n/g)) postests[area] = (body.match(/'\d{4,5}'/g) || []).length; } catch (e) { /* */ }
  const RECETA = { principal_q: 18, secundario_q: 4.5, viernes_q: 2.75 }; // 16-20 · 4-5 · 5-6 repartidas entre 2 códigos
  const inv = {};
  for (const c of [...codigos].sort()) {
    const area = areaDe(c);
    const enPool = pool.filter((x) => poolCode(x.codigo) === c);
    const d = demanda[c] || { sesiones_principal: 0, slots_secundario: 0, viernes_cola_larga: 0 };
    const demandaQ = Math.round(d.sesiones_principal * RECETA.principal_q + d.slots_secundario * RECETA.secundario_q + d.viernes_cola_larga * RECETA.viernes_q);
    const disponibles = enPool.filter((x) => !usados.has(x.id)).length;
    const porFichero = enPool.reduce((a, x) => ((a[x._file] = (a[x._file] || 0) + 1), a), {});
    const subEjes = enPool.reduce((a, x) => ((a[x.sub_eje || 'sin_sub_eje'] = (a[x.sub_eje || 'sin_sub_eje'] || 0) + 1), a), {});
    const deficit = demandaQ - disponibles;
    inv[c] = {
      area, critico: CRITICOS_V3.includes(c), rebote: REBOTE_V3.includes(c), cola_larga: COLA_LARGA.some((x) => x.codigo === c),
      demanda_sembrada: { ...d, q_estimadas_102_dias: demandaQ, receta: '16-20Q principal · 4-5Q secundario · 5-6Q/viernes entre 2 códigos' },
      oferta: {
        banco_propio_pool: { total: enPool.length, disponibles_no_usados: disponibles, ya_consumidos_en_runner: enPool.length - disponibles, por_fichero: porFichero, por_sub_eje: subEjes, con_clave_oficial: enPool.filter((x) => /CLAVE OFICIAL/i.test(x.verificado_contra || '')).length },
        examenes_reales_etiquetados: realesPorCod[c] || { total: 0, por_proceso: {} },
        sets_claves_json_2026: clavesJson[c] || {},
        theomed_postests_area: postests[AREA_LABEL[area]] != null ? `${postests[AREA_LABEL[area]]} quizzes del área ${AREA_LABEL[area]} (por ÁREA, no filtrables por código)` : 'sin dato',
        qx_banqueo_area: QX_AREA[area] != null ? `${QX_AREA[area]}Q del área ${AREA_LABEL[area]} (scan 20-jul-2026, por ÁREA; acceso 2027-I A VERIFICAR)` : 'NO publicado al 20-jul-2026 (A VERIFICAR re-scan)',
      },
      resueltas: { rondas_registro: resueltas[c] || 0, consumidos_en_runner: consumidos[c] || 0 },
      deficit_vs_demanda: deficit, estado: deficit <= 0 ? 'cubierto' : deficit <= 40 ? 'déficit moderado (cubrir con QX/Theomed del área o 1 set nuevo)' : 'DÉFICIT (pre-generar sets nuevos)',
    };
  }
  const totales = { pool_total: pool.length, pool_disponible: pool.filter((x) => !usados.has(x.id)).length, filas_sql: filas, minisims_sembrados: minisims, demanda_total_q: Object.values(inv).reduce((s, x) => s + x.demanda_sembrada.q_estimadas_102_dias, 0), deficit_codigos: Object.entries(inv).filter(([, v]) => v.deficit_vs_demanda > 0).map(([k, v]) => `${k}:${v.deficit_vs_demanda}`) };
  const out = { _meta: { descripcion: 'Inventario de preguntas por CÓDIGO v3: oferta (BANCO_PROPIO: sets + banco_items_v1 + set_reales_otros; exámenes reales etiquetados; claves.json de julio; QX/Theomed por área) vs demanda sembrada en study_schedule (102 días de mantenimiento, _encaps_mantenimiento_2027.sql) y déficit. Regenerar: node DATA/_scripts/gen_encaps_minisim.js --inventario', generado: new Date().toISOString().slice(0, 10), rotacion: 'I-3 11 · V-2 11 · II-3 6 · resto 5 (CICLO de _encaps_ciclo_v3.js)', lista_negra: '2026-II excluido de toda oferta hasta el pre-test', totales }, por_codigo: inv };
  fs.writeFileSync(path.join(BANCO, '_inventario_banco_por_codigo.json'), JSON.stringify(out, null, 1) + '\n', 'utf8');
  console.log('OK → _inventario_banco_por_codigo.json ·', JSON.stringify(totales));
  for (const [k, v] of Object.entries(inv)) console.log(`${k.padEnd(10)} demanda ${String(v.demanda_sembrada.q_estimadas_102_dias).padStart(4)} · pool ${String(v.oferta.banco_propio_pool.disponibles_no_usados).padStart(3)} disp (${v.oferta.banco_propio_pool.total} tot) · reales ${String(v.oferta.examenes_reales_etiquetados.total).padStart(2)} · déficit ${String(v.deficit_vs_demanda).padStart(4)} · ${v.estado}`);
}
function escribir(base, doc) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const j = path.join(OUT_DIR, base + '.json'), h = path.join(OUT_DIR, base + '.html');
  fs.writeFileSync(j, JSON.stringify(doc, null, 1) + '\n', 'utf8');
  fs.writeFileSync(h, html(doc), 'utf8');
  console.log('OK →', j, '·', h);
}

// ── main ──
try {
  if (has('--registrar')) modoRegistrar(opt('--registrar'), has('--append'));
  else if (has('--pretest')) modoPretest();
  else if (has('--sim100')) modoSim100(opt('--sim100'));
  else if (has('--inventario')) modoInventario();
  else if (has('--banco')) modoBanco(opt('--banco'));
  else if (has('--eval')) modoEval(opt('--eval'));
  else if (has('--semana')) modoSemana(opt('--semana'));
  else if (fechaArg) modoMinisim(fechaArg);
  else { console.log('uso: node gen_encaps_minisim.js <viernes YYYY-MM-DD> [--dry] | --banco <fecha> | --eval <fecha> | --semana <lunes> | --inventario | --pretest | --sim100 <2024-2A|2025-1A|2025-2|propio> [fecha] | --registrar <export.json> [--append]'); process.exit(1); }
} catch (e) { console.error('✗', e.message); process.exit(1); }
