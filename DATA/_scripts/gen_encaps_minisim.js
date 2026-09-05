/**
 * gen_encaps_minisim.js — arma el MINI-SIMULACRO ENCAPS de viernes (25Q · 72 s/Q · vector v3) y emite un
 * runner HTML autocontenido (temporizador, hoja de respuestas con confianza, autocorrección por código/área/
 * formato, export JSON en el esquema de ronda v3 + línea de cierre para gen_encaps_semana.js --cerrar).
 *
 * Fuentes de ítems: DATA/ENCAPS/BANCO_PROPIO/*.json (cualquier fichero con `items[]` y los campos del banco
 * propio: id, codigo, area, formato, critico, fallo_previo, reservado_para, enunciado, opciones, clave,
 * verificado_contra, molde). Los moldes/espejos son SOLO de 2024-2A→2026-1: el generador RECHAZA todo ítem
 * cuyo verificado_contra/molde/fuente mencione 2026-2 / 2026-II mientras no exista la ronda PRETEST_2026-II
 * en TRACKING_ERRORES/_registro_resoluciones.json (PROTOCOLO_GENERACION_PREGUNTAS.md §3-bis-LN).
 *
 * Receta fija (_encaps_ciclo_v3.js RECETA_MINISIM): 8 II · 7 I · 5 V · 3 III · 2 IV = 25 · 50/50 viñeta-directa
 * (tolerancia ±2) · ≥10Q de los 8 críticos v3 · ≥5Q de fallos previos del registro (re-testeados con OTRO
 * enfoque) · 5-6Q de los 2 códigos de cola larga del viernes (se leen de la fila mini_sim de
 * _encaps_mantenimiento_2027.sql; si no está, rota COLA_LARGA por índice de viernes).
 * Los ítems ya usados en minisim_*.json anteriores no se repiten.
 *
 * Uso:
 *   node DATA/_scripts/gen_encaps_minisim.js 2026-09-11                → BANCO_PROPIO/minisim_2026-09-11.json + .html
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
const { RECETA_MINISIM, COLA_LARGA, CRITICOS_V3, REBOTE_V3, VECTOR_V3, areaDe } = require('./_encaps_ciclo_v3');

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
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const dowDe = (iso) => new Date(iso + 'T12:00:00Z').getUTCDay();

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
  return { fallos, debiles, pretestHecho };
}
const enListaNegra = (it) => /2026-2\b|2026-II/i.test([it.verificado_contra, it.molde, it.fuente].join(' '));

// ── pool del banco propio ──
function cargarPool(pretestHecho) {
  const pool = []; const rechazados = [];
  for (const f of fs.readdirSync(BANCO)) {
    if (!f.endsWith('.json') || f.startsWith('_') || /^minisim_|^pretest_|^sim100_/.test(f)) continue;
    let j; try { j = readJSON(path.join(BANCO, f)); } catch (e) { console.warn('⚠ JSON ilegible', f); continue; }
    for (const it of j.items || []) {
      if (!it.id || !it.codigo || !it.enunciado || !it.opciones || !it.clave) { rechazados.push([f, it.id || '?', 'campos incompletos']); continue; }
      if (!pretestHecho && enListaNegra(it)) { rechazados.push([f, it.id, 'LISTA NEGRA 2026-II']); continue; }
      pool.push({ ...it, area: it.area || areaDe(it.codigo), _file: f });
    }
  }
  return { pool, rechazados };
}
function usadosPrevios(fecha) {
  const usados = new Set();
  for (const f of fs.readdirSync(BANCO)) {
    const m = f.match(/^minisim_(\d{4}-\d\d-\d\d)\.json$/);
    if (!m || m[1] >= fecha) continue;
    try { for (const it of readJSON(path.join(BANCO, f)).items || []) usados.add(it.id); } catch (e) { /* ignorar */ }
  }
  return usados;
}
function colaLargaDe(fecha) {
  try {
    const sql = fs.readFileSync(SQL_MANT, 'utf8');
    const line = sql.split('\n').find((l) => l.includes(`'${fecha}','Vie','mini_sim'`));
    if (line) { const m = line.match(/"cola_larga":\[([^\]]*)\]/); if (m) return { codigos: m[1].split(',').map((s) => s.replace(/"/g, '').trim()).filter(Boolean), origen: '_encaps_mantenimiento_2027.sql' }; }
  } catch (e) { /* sin SQL */ }
  // fallback: rota COLA_LARGA por índice de viernes desde el D1 del régimen
  const d1 = new Date('2026-09-07T12:00:00Z'), d = new Date(fecha + 'T12:00:00Z');
  const k = Math.max(0, Math.floor((d - d1) / (7 * 864e5)));
  return { codigos: [COLA_LARGA[(2 * k) % COLA_LARGA.length].codigo, COLA_LARGA[(2 * k + 1) % COLA_LARGA.length].codigo], origen: 'rotación COLA_LARGA (fallback)' };
}

// ── selección con la receta fija ──
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
  for (const c of cola.codigos) { let k = 0; for (const it of ordena(cand.filter((x) => x.codigo === c))) { if (k >= 3 || nCL >= (maxCL || 6) || !cabe(it)) break; toma(it, 'cola_larga'); k++; nCL++; } }
  if (nCL < (minCL || 5)) avisos.push(`cola larga: solo ${nCL}Q disponibles de ${cola.codigos.join('+')} (receta ${R.cola_larga_q})`);
  // (b) fallos previos ≥ fallos_previos_min
  let nFP = set.filter(esFalloPrevio).length;
  for (const it of ordena(cand.filter((x) => esFalloPrevio(x) && !usedIds.has(x.id)))) { if (nFP >= R.fallos_previos_min) break; if (cabe(it)) { toma(it, 'fallo_previo'); nFP++; } }
  if (nFP < R.fallos_previos_min) avisos.push(`fallos previos: ${nFP}/${R.fallos_previos_min} (el registro solo tiene fallos en ${[...fallosReg].slice(0, 6).join(', ')}…)`);
  // (c) críticos ≥ criticos_min
  let nCR = set.filter(esCritico).length;
  for (const it of ordena(cand.filter((x) => esCritico(x) && !usedIds.has(x.id)))) { if (nCR >= R.criticos_min) break; if (cabe(it)) { toma(it, 'critico'); nCR++; } }
  // (d) relleno por área: rebotes → críticos → resto (siempre prefiriendo los reservados para esta fecha)
  const rank = (it) => prio(it) * 10 + (REBOTE_V3.includes(it.codigo) ? 0 : esCritico(it) ? 1 : 2);
  for (const it of cand.filter((x) => !usedIds.has(x.id)).sort((a, b) => rank(a) - rank(b) || (a.id < b.id ? -1 : 1))) if (cabe(it)) toma(it, 'relleno');
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
    cola_larga: final.filter((x) => cola.codigos.includes(x.codigo)).length,
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
.hidden{display:none!important}.wrap{overflow-x:auto}.note{font-size:12px;color:var(--mut)}
</style></head><body>
<header><h1>${doc.titulo}</h1><span class="pill">${doc.n} preguntas · ${doc.seg_por_q} s/Q · ${Math.round(doc.n * doc.seg_por_q / 60)} min</span><span class="pill">vector v3 · modo examen: solución al final</span>
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
function render(){const box=$('#qs');box.innerHTML='';DOC.items.forEach((it)=>{const d=document.createElement('div');d.className='q';d.dataset.n=it.n;
 d.innerHTML='<h3>Pregunta '+it.n+' de '+DOC.n+(DOC.mostrar_codigo?' · '+(it.codigo||'')+' · '+(it.formato||''):'')+'</h3><p>'+esc(it.enunciado)+'</p><div class="opts">'+
 Object.entries(it.opciones).map(([k,v])=>'<label><input type="radio" name="a'+it.n+'" value="'+k+'"'+(state.ans[it.n]===k?' checked':'')+'> <b>'+k+')</b> '+esc(v)+'</label>').join('')+'</div>'+
 '<div class="conf">Confianza: '+[1,2,3].map((c)=>'<label><input type="radio" name="c'+it.n+'" value="'+c+'"'+(state.conf[it.n]==c?' checked':'')+'> '+({1:'adivinada',2:'dudosa',3:'segura'})[c]+'</label>').join('')+'</div>';
 d.addEventListener('mouseenter',()=>state.active=it.n);d.addEventListener('focusin',()=>state.active=it.n);
 d.querySelectorAll('input[name=a'+it.n+']').forEach((r)=>r.addEventListener('change',()=>{state.ans[it.n]=r.value;save();prog();}));
 d.querySelectorAll('input[name=c'+it.n+']').forEach((r)=>r.addEventListener('change',()=>{state.conf[it.n]=+r.value;save();}));
 box.appendChild(d);});}
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
 const areas=grp((it)=>it.area),cods=grp((it)=>it.codigo),fmts=grp((it)=>it.formato_pretest||it.formato);
 const nota=DOC.n===25?'<b>NOTA '+ok+'/25</b> (umbral ≥'+DOC.umbral+' · alerta <'+DOC.alerta+')':'<b>'+ok+'/'+n+'</b>';
 let h='<div class="q"><h2 style="margin:0 0 6px">Resultado</h2><p>'+nota+' · % bruto <b>'+pct(ok,n)+'%</b> · <b>% CIEGO REAL '+pct(seg,n)+'%</b> (seguras '+seg+' · dudosas/adivinadas '+dud+' · fallos '+(n-ok)+') · tiempo usado '+fmt(DOC.n*DOC.seg_por_q-state.left)+'</p>'+
  tabla('Área',areas,['II','I','V','III','IV'])+tabla('Código',Object.fromEntries(Object.entries(cods).sort((a,b)=>b[1].n-a[1].n)))+tabla('Formato',fmts)+'</div>';
 h+='<div class="q"><h2 style="margin:0 0 6px">Revisión ítem a ítem</h2><p class="note">Para cada fallo clasifica el tipo (knowledge: CONCEPTO · OLVIDO · CRONOLOGIA · transfer: CCSN · CONTEXTO · proceso: CAMBIO · TIEMPO · LECTURA), escribe la causa en una línea y la ruta (ANKI · OBSIDIAN · AMBOS). Se incluye en el export.</p>'+
  rows.map((r)=>{const it=r.it;return '<div class="q" style="margin:8px 0"><h3>'+it.n+' · '+(it.codigo||'')+' · '+(it.formato||'')+' · '+(r.ok?'<span class=ok>OK</span>':'<span class=bad>FALLO</span>')+' · tu: '+(r.tu||'—')+' · clave: <b>'+it.clave+'</b> · confianza: '+({1:'adivinada',2:'dudosa',3:'segura'})[r.conf]+' · '+r.seg+' s'+(r.ok&&r.conf<3?' · <span class=bad>acierto NO ciego</span>':'')+(r.seg>DOC.seg_por_q?' · <span class=bad>TIEMPO</span>':'')+'</h3><p>'+esc(it.enunciado)+'</p>'+
  '<div class="exp"><b>'+it.clave+') '+esc(it.respuesta||it.opciones[it.clave])+'</b>'+(it.explicacion?'<br>'+esc(it.explicacion):'')+(it.fuente?'<br><span class=note>Fuente: '+esc(it.fuente)+'</span>':'')+(it.verificado_contra?'<br><span class=note>Verificado contra: '+esc(it.verificado_contra)+'</span>':'')+'</div>'+
  (!r.ok||r.conf<3?'<div class="rev"><select data-n="'+it.n+'" data-k="error"><option value="">tipo de error…</option>'+['CONCEPTO','OLVIDO','CRONOLOGIA','CCSN','CONTEXTO','CAMBIO','TIEMPO','LECTURA'].map((e)=>'<option>'+e+'</option>').join('')+'</select><input type="text" data-n="'+it.n+'" data-k="causa" placeholder="causa en una línea (qué razonamiento te llevó ahí)"><select data-n="'+it.n+'" data-k="ruta"><option value="">ruta…</option><option>ANKI</option><option>OBSIDIAN</option><option>AMBOS</option></select></div>':'')+'</div>';}).join('')+'</div>';
 h+='<div class="q"><h2 style="margin:0 0 6px">Exportar</h2><p><button id="build">Generar JSON de la ronda</button> <button id="copy" class="sec">Copiar</button> <button id="dl" class="sec">Descargar .json</button></p><textarea id="out" readonly></textarea><p class="note" id="linea"></p></div>';
 res.innerHTML=h;
 res.querySelectorAll('[data-k]').forEach((el)=>el.addEventListener('change',()=>{const n=el.dataset.n;(state.rev[n]=state.rev[n]||{})[el.dataset.k]=el.value;save();}));
 const build=()=>{const fall={knowledge:{CONCEPTO:0,OLVIDO:0,CRONOLOGIA:0},transfer:{CCSN:0,CONTEXTO:0},proceso:{CAMBIO:0,TIEMPO:0,LECTURA:0}};const T={CONCEPTO:'knowledge',OLVIDO:'knowledge',CRONOLOGIA:'knowledge',CCSN:'transfer',CONTEXTO:'transfer',CAMBIO:'proceso',TIEMPO:'proceso',LECTURA:'proceso'};
  const preguntas=rows.map((r)=>{const rv=state.rev[r.it.n]||{};let err=r.ok?null:(rv.error||null);if(!r.ok&&!err&&r.seg>DOC.seg_por_q)err='TIEMPO';if(!r.ok){const e=err||'CONCEPTO';fall[T[e]][e]++;}
   return {n:r.it.n,id:r.it.id||null,codigo:r.it.codigo||null,subangulo:r.it.subangulo||r.it.subtema||null,formato:r.it.formato_pretest||r.it.formato||null,fecha:DOC.fecha,bloque:DOC.tipoRonda,tu:r.tu,correcta:r.it.clave,ok:r.ok,confianza:({1:'adivinada',2:'dudosa',3:'segura'})[r.conf],acierto_por_suerte:r.ok&&r.conf<3,seg:r.seg,error:err,causa:rv.causa||null,ruta:rv.ruta||null,fallo_previo:r.it.fallo_previo||null};});
  const tmed=Math.round(rows.reduce((a,r)=>a+r.seg,0)/n);
  const ronda={id:DOC.id,examen:'ENCAPS',tipoRonda:DOC.tipoRonda,fecha:DOC.fecha,codigo:DOC.codigo,tema:DOC.tema,fuente_preguntas:DOC.fuente_preguntas,vector_referencia:'v3 II30·I27·V21·III13·IV9',n:n,correctas_seguras:seg,correctas_dudosas:dud,fallos_por_tipo:fall,tiempo_medio_seg:tmed,tiempo_total_min:Math.round((DOC.n*DOC.seg_por_q-state.left)/60),pct_ciego:pct(seg,n),nota:ok,puntaje:ok+'/'+n,
   por_area:Object.fromEntries(Object.entries(areas).map(([k,v])=>[k,{n:v.n,ok:v.ok,seguras:v.seg}])),por_codigo:Object.fromEntries(Object.entries(cods).map(([k,v])=>[k,{n:v.n,ok:v.ok,seguras:v.seg,brecha:Math.round(v.n*(1-v.seg/v.n)*10)/10}])),por_formato:Object.fromEntries(Object.entries(fmts).map(([k,v])=>[k,{n:v.n,ok:v.ok,seguras:v.seg}])),preguntas};
  const fl=Object.values(fall).flatMap((g)=>Object.entries(g)).filter(([,v])=>v).map(([k,v])=>k+':'+v).join(',')||'CONCEPTO:0';
  const linea='ENCAPS|'+DOC.tipoRonda+'|'+DOC.fecha+'|'+DOC.codigo+'|n='+n+'|seg='+seg+'|dud='+dud+'|'+fl+'|t='+tmed+'|tema='+DOC.tema.replace(/\\|/g,'/')+(DOC.n===25?'|nota='+ok:'');
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
  const usados = usadosPrevios(fecha);
  const cola = colaLargaDe(fecha);
  const { items, conteos, avisos } = armarSet(fecha, pool, usados, cola, fallos, debiles);
  const id = `MINISIM_${fecha}`;
  const doc = {
    id, titulo: `Mini-simulacro ENCAPS · viernes ${fecha}`, tipoRonda: 'mini_sim', fecha, codigo: 'MIX', tema: `mini-sim v3 · cola larga ${cola.codigos.join('+')}`,
    fuente_preguntas: `BANCO_PROPIO (${[...new Set(items.map((x) => x._file))].join(', ')}) · moldes 2024-2A→2026-1 · claves verificadas por ítem`,
    n: items.length, seg_por_q: RECETA_MINISIM.seg_por_q, umbral: RECETA_MINISIM.umbral_25, alerta: RECETA_MINISIM.alerta_25, mostrar_codigo: false,
    instrucciones: `25 preguntas mixtas (8 II · 7 I · 5 V · 3 III · 2 IV), 72 s por pregunta = 30 min. Cola larga de hoy: ${cola.codigos.join(' + ')}. Sin material, sin pausa; la corrección aparece solo al terminar.`,
    _meta: { generado: new Date().toISOString().slice(0, 10), receta: RECETA_MINISIM, cola_larga: cola, conteos, avisos, lista_negra_2026_II: pretestHecho ? 'levantada (ronda PRETEST_2026-II encontrada)' : 'VIGENTE: ítems con 2026-2/2026-II excluidos', rechazados: rechazados.slice(0, 20), pool_disponible: pool.length - usados.size },
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
    const { fallos, debiles, pretestHecho } = leerRegistro();
    const { pool } = cargarPool(pretestHecho);
    const r = rng(fecha + 'sim100');
    const cuota = Object.fromEntries(Object.entries(VECTOR_V3).map(([a, v]) => [a, v.pct]));
    items = [];
    for (const it of shuffle(pool, r)) if (cuota[it.area] > 0) { items.push(it); cuota[it.area]--; }
    if (items.length < 100) console.warn(`⚠ banco propio insuficiente para 100Q: ${items.length} (faltan ${JSON.stringify(cuota)})`);
    items = items.map((it, i) => ({ n: i + 1, ...it }));
    fuente = 'BANCO_PROPIO (vector v3 ×4)';
    void fallos; void debiles;
  } else {
    const j = readJSON(path.join(BANCO, '_examenes_reales_2024-2A_2026-1.json'));
    const ex = j.examenes[proceso];
    if (!ex) throw new Error('proceso desconocido: ' + proceso + ' (usar 2024-2A · 2025-1A · 2025-2 · propio)');
    if (!ex.con_clave) throw new Error(`${proceso} no tiene clave oficial en disco: no se puede corregir (usar solo como molde)`);
    items = ex.items.map((it) => ({ n: it.numero, id: `${proceso}-Q${it.numero}`, codigo: 'sin clasificar', area: '—', formato: '—', enunciado: it.enunciado, opciones: it.opciones, clave: it.clave, respuesta: it.respuesta, fuente: `ENCAPS/SERUMS ${proceso} (clave oficial)`, verificado_contra: it.clave_verificacion }));
    fuente = `exams_txt/${proceso}.txt + clave oficial (resaltados del PDF)`;
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
  const linea = `ENCAPS|${ronda.tipoRonda}|${ronda.fecha}|${ronda.codigo || 'MIX'}|n=${ronda.n}|seg=${ronda.correctas_seguras}|dud=${ronda.correctas_dudosas}|${fl}|t=${ronda.tiempo_medio_seg || 0}|tema=${String(ronda.tema || '').replace(/\|/g, '/')}${ronda.tipoRonda === 'mini_sim' ? `|nota=${ronda.nota}` : ''}`;
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
  else if (fechaArg) modoMinisim(fechaArg);
  else { console.log('uso: node gen_encaps_minisim.js <viernes YYYY-MM-DD> [--dry] | --pretest | --sim100 <2024-2A|2025-1A|2025-2|propio> [fecha] | --registrar <export.json> [--append]'); process.exit(1); }
} catch (e) { console.error('✗', e.message); process.exit(1); }
