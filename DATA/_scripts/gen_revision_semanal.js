// gen_revision_semanal.js — pre-rellena la REVISIÓN SEMANAL (DATA/REVISION_SEMANAL.md, sábado 07:15-07:35)
// con datos REALES y APPENDEA a DATA/USMLE/REVISIONES/_semanas.json (append-only; idempotente por semana).
//
// Fuentes (todas de solo lectura; lo que no se encuentra queda "sin dato", nunca se inventa):
//   · Supabase (anon key de src/lib/supabase.ts, SELECT vía @supabase/supabase-js; fallback REST):
//       study_schedule (ENCAPS · temas de la semana) · study_sim_scores · study_metrics · study_checks
//       mv_wellness_logs de VITALS (sueño/agua, user 'joseph') SOLO si hay credencial en env
//       (VITALS_SUPABASE_URL + VITALS_SUPABASE_KEY, o SUPABASE_SERVICE_ROLE_KEY en VITALS/web/.env.local);
//       si no hay, la métrica 8 queda "sin acceso".
//   · Export de localStorage (claves jmd-*): DATA/USMLE/REVISIONES/_localstorage_export.json (o --ls <ruta>).
//       Se obtiene tocando el instrumento SEMANA del cockpit (web) o con el snippet de REVISION_SEMANAL.md.
//   · AnkiConnect (localhost:8765) en vivo; si no responde → "Anki cerrado" y se usa DATA/USMLE/_anki_telemetria.json.
//   · DATA/ENCAPS/TRACKING_ERRORES/_registro_resoluciones.json (rondas ENCAPS/USMLE/MIR de la semana).
//   · Planes: src/lib/usmleStep1Daily.ts (D1, hitos) · synapseDailyPlan.ts · vibecodingPlan.ts · mirDailyPlan.ts.
//
// Uso:
//   node DATA/_scripts/gen_revision_semanal.js                 # semana de HOY (Lima) → S<NN>_<sábado>.md + _semanas.json
//   node DATA/_scripts/gen_revision_semanal.js 2026-09-12      # cualquier día de la semana que se quiere revisar
//   node DATA/_scripts/gen_revision_semanal.js --dry-run       # imprime el .md, no escribe nada
//   node DATA/_scripts/gen_revision_semanal.js --ls C:\ruta\export.json --out C:\ruta\dir
//
// Node ≥ 18 (fetch nativo). Sin dependencias nuevas (@supabase/supabase-js ya está en node_modules).
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const REV_DIR = path.join(ROOT, 'DATA/USMLE/REVISIONES');
const SEMANAS_JSON = path.join(REV_DIR, '_semanas.json');
const ANKI_JSON = path.join(ROOT, 'DATA/USMLE/_anki_telemetria.json');
const REGISTRO = path.join(ROOT, 'DATA/ENCAPS/TRACKING_ERRORES/_registro_resoluciones.json');
const ANKI_URL = process.env.ANKICONNECT_URL || 'http://127.0.0.1:8765';

// ─── args ───
const argv = process.argv.slice(2);
const arg = (k, def) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : def; };
const has = (k) => argv.includes(k);
const DRY = has('--dry-run');
const OUT_DIR = arg('--out', REV_DIR);
const LS_PATH = arg('--ls', path.join(REV_DIR, '_localstorage_export.json'));
const fechaArg = argv.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));

// ─── fechas (todo en ISO, sin reloj salvo el default de HOY) ───
const pad = (n) => String(n).padStart(2, '0');
const hoyISO = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const fromISO = (s) => new Date(s + 'T12:00:00Z');
const toISO = (d) => d.toISOString().slice(0, 10);
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return toISO(d); };
const dow = (s) => fromISO(s).getUTCDay(); // 0=Dom
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fmt = (s) => `${WD[dow(s)].toLowerCase()} ${Number(s.slice(8, 10))}-${MES[Number(s.slice(5, 7)) - 1]}`;
const enSemana = (f, lunes, domingo) => typeof f === 'string' && f.slice(0, 10) >= lunes && f.slice(0, 10) <= domingo;
const media = (xs) => { const v = xs.filter((x) => typeof x === 'number' && !Number.isNaN(x)); return v.length ? Number((v.reduce((a, b) => a + b, 0) / v.length).toFixed(1)) : null; };
const pct = (x) => (x == null ? '—' : `${x}%`);
const sd = (x, suf = '') => (x == null ? 'sin dato' : `${x}${suf}`);

const FECHA = fechaArg || hoyISO();
const off = dow(FECHA) === 0 ? -6 : 1 - dow(FECHA);
const LUNES = addDays(FECHA, off), VIERNES = addDays(LUNES, 4), SABADO = addDays(LUNES, 5), DOMINGO = addDays(LUNES, 6);

// ─── planes (regex sobre los .ts generados; sin importar TS) ───
const readTs = (f) => { try { return fs.readFileSync(path.join(ROOT, 'src/lib', f), 'utf8'); } catch { return ''; } };
const usmleTs = readTs('usmleStep1Daily.ts');
const D1 = (usmleTs.match(/inicio:\s*'(\d{4}-\d{2}-\d{2})'/) || [])[1] || '2026-09-07';
const N = Math.floor((fromISO(LUNES) - fromISO(D1)) / 86400000 / 7) + 1;
const TOTAL_SEM = 20;
const LABEL = N < 1 ? 'pre-D1' : N > TOTAL_SEM ? 'examen' : `S${N}/${TOTAL_SEM}`;
const NN = String(Math.max(0, N)).padStart(2, '0');
const DELOAD = ['2026-10-26', '2026-12-07'].includes(LUNES);
// hitos: días "Assessment" del plan USMLE (🎯) — mínimos on-track de PALMERTON_POR_MATERIA Parte V
const MINIMOS = { 'NBME 25': '≥51%', 'NBME 26': '≥54%', 'NBME 27': '≥57%', 'NBME 28': '≥61%', 'NBME 29': '≥63%', 'NBME 30': '≥65%', 'NBME 31': '≥68% (GO)', 'NBME 32': '≥68%', 'NBME 33': '≥68%', 'UWSA1': 'baseline', 'UWSA2': 'low risk', 'FREE 120': '≥70%' };
const HITOS = [...usmleTs.matchAll(/\{d:(\d+),fecha:"(\d{4}-\d{2}-\d{2})",system:"(?:Assessment|Banco intensivo|Sprint final)"[^}]*?sub:"🎯 ([^"—(]+)/g)]
  .map((m) => { const nombre = ((m[3].match(/UWSA\d|NBME \d+|FREE 120/i) || [m[3]])[0]).toUpperCase().replace('NBME', 'NBME'); return { d: +m[1], fecha: m[2], nombre: nombre.replace(/^NBME/, 'NBME'), minimo: MINIMOS[nombre] || null }; });
const hitoSemana = HITOS.find((h) => enSemana(h.fecha, LUNES, DOMINGO)) || null;
const proximoHito = HITOS.find((h) => h.fecha > VIERNES) || null;
const USMLE_DIAS = [...usmleTs.matchAll(/\{d:(\d+),fecha:"(\d{4}-\d{2}-\d{2})"/g)].map((m) => ({ d: +m[1], fecha: m[2] }));
const usmleSemana = USMLE_DIAS.filter((x) => enSemana(x.fecha, LUNES, VIERNES));

const synTs = readTs('synapseDailyPlan.ts');
const SYN_DIAS = [...synTs.matchAll(/\{d:(\d+),fecha:"(\d{4}-\d{2}-\d{2})",wd:"([^"]+)"/g)].map((m) => ({ d: +m[1], fecha: m[2], wd: m[3] }));
const synSemana = SYN_DIAS.filter((x) => enSemana(x.fecha, LUNES, SABADO)); // L-Sáb (dom = Feynman opcional, no cuenta)

const vibeTs = readTs('vibecodingPlan.ts');
const VIBE_DIAS = [...vibeTs.matchAll(/\{d:(\d+),fecha:"(\d{4}-\d{2}-\d{2})",wd:"[^"]+",semana:(\d+)/g)].map((m) => ({ d: +m[1], fecha: m[2], semana: +m[3] }));
const VIBE_PROY = [...vibeTs.matchAll(/\{s:(\d+),id:"([^"]+)",nombre:"((?:[^"\\]|\\.)*)"[^}]*?ship:"(\d{4}-\d{2}-\d{2})"/g)].map((m) => ({ s: +m[1], id: m[2], nombre: m[3].replace(/\\"/g, '"'), ship: m[4] }));
const vibeSemana = VIBE_DIAS.filter((x) => enSemana(x.fecha, LUNES, VIERNES));
const vibeP = vibeSemana.length ? VIBE_PROY.find((p) => p.s === vibeSemana[0].semana) : null;

const mirTs = readTs('mirDailyPlan.ts');
const MIR_DIAS = [...mirTs.matchAll(/\{d:(\d+),fecha:"(\d{4}-\d{2}-\d{2})"/g)].map((m) => ({ d: +m[1], fecha: m[2] }));
const mirSemana = MIR_DIAS.filter((x) => enSemana(x.fecha, LUNES, VIERNES));

// ─── localStorage export ───
let LS = null, lsFecha = 'sin export';
try {
  if (fs.existsSync(LS_PATH)) {
    LS = JSON.parse(fs.readFileSync(LS_PATH, 'utf8'));
    lsFecha = (LS._export && LS._export.fecha) ? String(LS._export.fecha).slice(0, 16).replace('T', ' ') : toISO(fs.statSync(LS_PATH).mtime) + ' (mtime)';
  }
} catch (e) { lsFecha = 'export ilegible: ' + e.message.slice(0, 60); }
const ls = (k) => (LS && LS[k] != null ? LS[k] : null);
const progreso = ls('jmd-study-progress-v1') || {};
const doneSet = (plan) => new Set(Array.isArray(progreso[plan]) ? progreso[plan] : []);
const modoLog = ls('jmd-modo-log') || {};

// ─── Supabase (anon, SELECT) ───
function credsApp() {
  const t = fs.readFileSync(path.join(ROOT, 'src/lib/supabase.ts'), 'utf8');
  const url = (t.match(/SUPABASE_URL\s*=\s*'([^']+)'/) || [])[1];
  const key = (t.match(/SUPABASE_ANON_KEY\s*=\s*'([^']+)'/) || [])[1];
  if (!url || !key) throw new Error('no se pudo leer URL/anon key de src/lib/supabase.ts');
  return { url, key };
}
function mkClient(url, key) {
  try {
    const { createClient } = require('@supabase/supabase-js');
    const c = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    return {
      async select(table, cols, filtros = []) {
        let q = c.from(table).select(cols);
        for (const [op, col, val] of filtros) q = q[op](col, val);
        const { data, error } = await q.limit(2000);
        if (error) throw new Error(`${table}: ${error.message}`);
        return data || [];
      },
    };
  } catch {
    // fallback REST (PostgREST) si supabase-js no está disponible
    return {
      async select(table, cols, filtros = []) {
        const params = new URLSearchParams({ select: cols, limit: '2000' });
        for (const [op, col, val] of filtros) params.append(col, `${op}.${val}`);
        const r = await fetch(`${url}/rest/v1/${table}?${params}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
        if (!r.ok) throw new Error(`${table}: HTTP ${r.status}`);
        return r.json();
      },
    };
  }
}
async function supabaseSemana() {
  const out = { estado: 'ok', encaps: [], simScores: [], metrics: null, checks: 0, errores: [] };
  let cli;
  try { const { url, key } = credsApp(); cli = mkClient(url, key); } catch (e) { out.estado = 'error: ' + e.message; return out; }
  const safe = async (fn, nombre) => { try { return await fn(); } catch (e) { out.errores.push(`${nombre}: ${e.message.slice(0, 80)}`); return null; } };
  out.encaps = (await safe(() => cli.select('study_schedule', 'examen,dia,fecha,weekday,tipo,codigo,subtema,modo,simulacro', [['eq', 'examen', 'ENCAPS'], ['gte', 'fecha', LUNES], ['lte', 'fecha', DOMINGO]]), 'study_schedule')) || [];
  out.simScores = (await safe(() => cli.select('study_sim_scores', 'examen,sim_n,nota,fecha', [['gte', 'fecha', LUNES], ['lte', 'fecha', DOMINGO]]), 'study_sim_scores')) || [];
  const m = await safe(() => cli.select('study_metrics', 'examen,fecha,qx_pct,prom_sim,cobertura_pct,dias_a_examen', [['eq', 'examen', 'ENCAPS']]), 'study_metrics');
  out.metrics = m && m.length ? m[0] : null;
  const ch = await safe(() => cli.select('study_checks', 'examen,item_key,checked,ts', [['gte', 'ts', LUNES + 'T00:00:00'], ['lte', 'ts', DOMINGO + 'T23:59:59']]), 'study_checks');
  out.checks = ch ? ch.filter((x) => x.checked).length : null;
  if (out.errores.length && !out.encaps.length && out.checks == null) out.estado = 'error';
  return out;
}

// ─── VITALS (solo con credencial en env) ───
function credsVitals() {
  const envUrl = process.env.VITALS_SUPABASE_URL, envKey = process.env.VITALS_SUPABASE_KEY || process.env.VITALS_SUPABASE_SERVICE_ROLE_KEY;
  if (envUrl && envKey) return { url: envUrl, key: envKey, origen: 'env' };
  const envLocal = path.join(ROOT, 'VITALS/web/.env.local');
  if (fs.existsSync(envLocal)) {
    const kv = {};
    for (const line of fs.readFileSync(envLocal, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/); if (m) kv[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
    const url = kv.NEXT_PUBLIC_SUPABASE_URL, key = kv.SUPABASE_SERVICE_ROLE_KEY || kv.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && key) return { url, key, origen: 'VITALS/web/.env.local' };
  }
  return null;
}
async function vitalsSemana() {
  const cr = credsVitals();
  if (!cr) return { estado: 'sin acceso (sin credencial en env: VITALS_SUPABASE_URL + VITALS_SUPABASE_KEY, o SUPABASE_SERVICE_ROLE_KEY en VITALS/web/.env.local)', logs: [] };
  const user = process.env.VITALS_USER_ID || 'joseph';
  const cli = mkClient(cr.url, cr.key);
  for (const table of ['mv_wellness_logs', 'wellness_logs']) {
    try {
      const rows = await cli.select(table, 'user_id,fecha,tipo,valor,meta', [['eq', 'user_id', user], ['gte', 'fecha', LUNES], ['lte', 'fecha', DOMINGO]]);
      return { estado: `ok (${table}, ${cr.origen}, user ${user})`, logs: rows };
    } catch (e) { if (table === 'wellness_logs') return { estado: 'error: ' + e.message.slice(0, 80), logs: [] }; }
  }
  return { estado: 'sin acceso', logs: [] };
}

// ─── Anki ───
async function ankiSemana() {
  const res = { estado: 'cerrado', live: null, json: [] };
  try {
    const j = JSON.parse(fs.readFileSync(ANKI_JSON, 'utf8'));
    res.json = (j.entradas || []).filter((e) => e.estado === 'ok' && enSemana(e.fecha, LUNES, DOMINGO));
  } catch { /* sin json */ }
  try {
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 3000);
    const call = async (action, params = {}) => { const r = await fetch(ANKI_URL, { method: 'POST', signal: ctrl.signal, body: JSON.stringify({ action, version: 6, params }) }); const j = await r.json(); if (j.error) throw new Error(j.error); return j.result; };
    await call('version');
    const q = 'deck:APEX::USMLE*';
    const [due, backlog, rev] = await Promise.all([call('findCards', { query: `${q} is:due` }), call('findCards', { query: `${q} is:due prop:due<0` }), call('getNumCardsReviewedToday')]);
    clearTimeout(t);
    res.estado = 'live'; res.live = { due: due.length, backlog: backlog.length, revisadasHoy: rev };
  } catch { res.estado = res.json.length ? 'json' : 'cerrado'; }
  return res;
}

// ─── registro de rondas ───
function registroSemana() {
  try {
    const r = JSON.parse(fs.readFileSync(REGISTRO, 'utf8'));
    const rondas = (r.rondas || []).filter((x) => enSemana(x.fecha, LUNES, DOMINGO)).map((x) => {
      const n = x.n ?? x.total ?? null;
      const cs = x.correctas_seguras ?? (x.pct_ciego_real != null && n ? Math.round(x.pct_ciego_real * n / 100) : x.correctas ?? null);
      const p = x.pct_ciego ?? x.pct_ciego_real ?? (cs != null && n ? Number((cs / n * 100).toFixed(1)) : null);
      return { examen: x.examen || 'ENCAPS', tipo: x.tipoRonda || x.bloque || '?', fecha: x.fecha, codigo: x.codigo || x.set || '?', n, correctas: cs, pct: p, fallos: x.fallos_por_tipo || null, falladas: Array.isArray(x.falladas) ? x.falladas.length : null };
    });
    return { estado: `${rondas.length} rondas`, rondas };
  } catch (e) { return { estado: 'registro ilegible: ' + e.message.slice(0, 60), rondas: [] }; }
}

// ─── scores USMLE (jmd-usmle-scores · proyecto S3) — acepta objeto {fecha: {...}} o array [{fecha,...}] ───
function usmleScores() {
  const raw = ls('jmd-usmle-scores'); if (!raw) return null;
  const items = Array.isArray(raw) ? raw : Object.entries(raw).map(([fecha, v]) => ({ fecha, ...(v || {}) }));
  const num = (o, ks) => { for (const k of ks) if (o && typeof o[k] === 'number') return o[k]; return null; };
  return items.filter((x) => enSemana(x.fecha, LUNES, VIERNES)).map((x) => ({
    fecha: x.fecha, pretest: num(x, ['pretest10', 'pretest', 'preTest']), q30: num(x, ['q30Pct', 'q30', 'consolidacion']), eval: num(x, ['evalPct', 'eval']), error: x.error_dominante || x.errorDominante || x.error || null,
  }));
}

(async () => {
  const [sb, vit, anki] = await Promise.all([supabaseSemana(), vitalsSemana(), ankiSemana()]);
  const reg = registroSemana();

  // 1 · USMLE medias
  const sc = usmleScores();
  const m1 = sc && sc.length ? { dias: sc.length, pretest: media(sc.map((x) => x.pretest)), q30: media(sc.map((x) => x.q30)), eval: media(sc.map((x) => x.eval)), evalMax: Math.max(...sc.map((x) => x.eval ?? -1)), errores: sc.map((x) => x.error).filter(Boolean) } : null;
  // 2 · próximo hito
  const m2 = { hitoSemana: hitoSemana ? `${hitoSemana.nombre} ${fmt(hitoSemana.fecha)} (${hitoSemana.minimo || '—'})` : null, proximo: proximoHito ? `${proximoHito.nombre} ${fmt(proximoHito.fecha)} · mínimo on-track ${proximoHito.minimo || '—'}` : null, uworldPct: null };
  // 3 · Anki
  const ja = anki.json;
  const m3 = {
    estado: anki.estado, diasTelemetria: ja.length,
    dueMedio: media(ja.map((e) => e.due)), backlog: anki.live ? anki.live.backlog : ja.length ? ja[ja.length - 1].backlog : null,
    due: anki.live ? anki.live.due : ja.length ? ja[ja.length - 1].due : null,
    retencion30: ja.length ? ja[ja.length - 1].retencion30 : null, againPct: media(ja.map((e) => e.againHoyPct)),
    minFinde: (() => { const d = anki.live ? anki.live.due : ja.length ? ja[ja.length - 1].due : null; return d == null ? null : Math.round(d * 20 / 60); })(),
  };
  m3.alarmaG = (m3.backlog != null && m3.backlog > 100) || (m3.retencion30 != null && m3.retencion30 < 0.85);
  // 4 · ENCAPS
  const rEnc = reg.rondas.filter((r) => r.examen === 'ENCAPS');
  const miniSim = rEnc.find((r) => /mini|sim/i.test(r.tipo) && r.fecha === VIERNES) || rEnc.find((r) => /mini|sim/i.test(r.tipo)) || null;
  const simSb = sb.simScores.find((s) => s.examen === 'ENCAPS') || null;
  const m4 = {
    temas: sb.encaps.map((x) => `${x.weekday || WD[dow(x.fecha)]} ${x.codigo || (x.simulacro ? 'mini-sim 25Q' : x.tipo || '?')}${x.simulacro && x.codigo ? ' (mini-sim)' : ''}`),
    miniSim: miniSim ? `${miniSim.correctas ?? '?'}/${miniSim.n ?? '?'} (${pct(miniSim.pct)} ciego)` : simSb ? `${simSb.nota} (study_sim_scores #${simSb.sim_n})` : null,
    rondas: rEnc.length, pctMedio: media(rEnc.map((r) => r.pct)), checks: sb.checks,
    qxPct: sb.metrics ? sb.metrics.qx_pct : null,
  };
  // 5 · MIR
  const mirLog = (ls('jmd-mir-eval-log') || []).filter((x) => x && enSemana(x.fecha, LUNES, VIERNES) && typeof x.total === 'number');
  const mirEval = mirLog.filter((x) => x.kind !== 'pretest');
  const m5 = mirLog.length ? { dias: new Set(mirEval.map((x) => x.fecha)).size, entradas: mirLog.length, netoPct: media(mirEval.map((x) => x.total ? Number((((x.aciertos || 0) - ((x.total - (x.aciertos || 0) - (x.blancos || 0)) / 3)) / x.total * 100).toFixed(1)) : null)), brutoPct: media(mirEval.map((x) => x.total ? Number(((x.aciertos || 0) / x.total * 100).toFixed(1)) : null)), errores: mirEval.map((x) => x.tipoError).filter(Boolean), diasPlan: mirSemana.length } : null;
  // 6 · SYNAPSE
  const synDone = doneSet('synapse');
  const m6 = { plan: synSemana.length, hechos: LS ? synSemana.filter((x) => synDone.has(x.d)).length : null };
  // 7 · Vibecoding
  const vibeDone = doneSet('vibecoding');
  const m7 = vibeP ? { s: vibeP.s, nombre: vibeP.nombre, ship: vibeP.ship, plan: vibeSemana.length, hechos: LS ? vibeSemana.filter((x) => vibeDone.has(x.d)).length : null } : null;
  if (m7) m7.shipped = m7.hechos != null && m7.plan > 0 && m7.hechos === m7.plan;
  // 8 · VITALS
  const sue = vit.logs.filter((x) => x.tipo === 'sueno').map((x) => Number(x.valor)), agua = vit.logs.filter((x) => x.tipo === 'agua').map((x) => Number(x.valor));
  const m8 = { estado: vit.estado, logsDias: new Set(vit.logs.map((x) => x.fecha)).size, suenoMedio: media(sue), noches7: sue.filter((h) => h < 7).length, noches6: sue.filter((h) => h < 6).length, aguaMedia: media(agua) };
  // 9 · días perdidos / niveles
  const usDone = doneSet('usmle');
  const corte = FECHA < VIERNES ? FECHA : VIERNES;
  const usPasados = usmleSemana.filter((x) => x.fecha <= corte);
  const sinCheck = LS ? usPasados.filter((x) => !usDone.has(x.d)).map((x) => x.fecha) : null;
  const niveles = Object.entries(modoLog).filter(([f]) => enSemana(f, LUNES, DOMINGO));
  const m9 = { diasPlan: usmleSemana.length, transcurridos: usPasados.length, sinCheckUsmle: sinCheck, ambar: niveles.filter(([, n]) => n === 'AMBAR').map(([f]) => f), rojo: niveles.filter(([, n]) => n === 'ROJO').map(([f]) => f), corrimiento: null };
  // 10 · checklist G (pre-marcado)
  const g = [];
  if (m3.alarmaG) g.push('G8 capar/omitir Anki (backlog > 100 o retención < 85%)');
  if (m1 && m1.evalMax != null && m1.evalMax >= 0 && m1.evalMax < 80) g.push('G1 validación rápida (ninguna eval ≥ 80% esta semana)');
  if (m8.noches6 > 0) g.push(`G10 noche exhausto (${m8.noches6} noche(s) < 6 h)`);
  const m10 = { activas: g, sinDato: [!m1 && 'G1 (sin scores USMLE)', m3.estado === 'cerrado' && m3.diasTelemetria === 0 && 'G8 (sin telemetría Anki)', !vit.logs.length && 'G10 (sin VITALS)'].filter(Boolean) };

  const fuentes = { supabase: sb.estado + (sb.errores.length ? ` (${sb.errores.join('; ')})` : ''), localStorage: lsFecha, anki: anki.estado, registro: reg.estado, vitals: vit.estado.split(' (')[0] };
  const generado = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const on = (b) => (b == null ? 'sin dato' : b ? 'sí' : 'NO');

  // ─── MD ───
  const L = [];
  L.push(`# Revisión semanal ${LABEL} · ${fmt(SABADO)} · semana ${fmt(LUNES)} → ${fmt(VIERNES)} ${LUNES.slice(0, 4)} · hito: ${m2.hitoSemana || '—'} · DELOAD: ${DELOAD ? 'SÍ (secundarios 50%)' : 'no'}`);
  L.push(`Generado: ${generado} · fuentes: supabase=${fuentes.supabase} · localStorage=${fuentes.localStorage} · anki=${fuentes.anki} · registro=${fuentes.registro} · vitals=${fuentes.vitals}`);
  L.push('');
  L.push(`## 1 USMLE medias         ${m1 ? `pre-test ${sd(m1.pretest, '/10')} · 30Q ${pct(m1.q30)} · eval ${pct(m1.eval)} (días con dato: ${m1.dias}/${usmleSemana.length}) · error dominante: ${m1.errores.join(', ') || '—'}` : `sin dato (jmd-usmle-scores llega con el proyecto S3, 21-25 sep) · rellenar a mano: pre-test __/10 · 30Q __% · eval __%`}   → on-track (eval ≥ 60%): ${m1 && m1.eval != null ? on(m1.eval >= 60) : '__'}`);
  L.push(`## 2 uWorld acumulado     __% (n = ____) [manual: dashboard uWorld] · próximo hito: ${m2.proximo || '—'} · distancia: __ pts`);
  L.push(`## 3 Anki                 ${m3.estado === 'cerrado' && !m3.diasTelemetria ? 'Anki cerrado y sin telemetría en la semana → correr node DATA/_scripts/anki_telemetria.js con Anki abierto' : `due ${sd(m3.due)} (medio ${sd(m3.dueMedio)}) · backlog ${sd(m3.backlog)} · retención 30d ${m3.retencion30 == null ? 'sin dato' : Math.round(m3.retencion30 * 100) + '%'} · again ${pct(m3.againPct)} · minFinde ${sd(m3.minFinde, "'")} · telemetría ${m3.diasTelemetria} días${m3.estado === 'live' ? ' (+ live)' : ''}`} · alarma G: ${m3.alarmaG ? 'SÍ → cero nuevas hasta backlog < 20' : 'no'}`);
  L.push(`## 4 ENCAPS viernes       mini-sim ${m4.miniSim || 'sin dato (registrar la ronda mini_sim en _registro_resoluciones.json)'} · rondas de la semana: ${m4.rondas}${m4.pctMedio != null ? ` (media ${pct(m4.pctMedio)} ciego)` : ''} · checks app: ${sd(m4.checks)} · QX acumulado: ${pct(m4.qxPct)} · temas: ${m4.temas.join(' · ') || 'sin filas en study_schedule'}`);
  L.push(`## 5 MIR eval D-1         ${m5 ? `neto ${pct(m5.netoPct)} (bruto ${pct(m5.brutoPct)}) · días con eval ${m5.dias}/${m5.diasPlan} · entradas ${m5.entradas} · errores: ${m5.errores.join(', ') || '—'}` : `sin dato (jmd-mir-eval-log vacío o sin export) · días MIR en el plan: ${mirSemana.length} · rellenar: media __% · días _/5`}`);
  L.push(`## 6 SYNAPSE misiones     ${m6.hechos == null ? `sin export de localStorage · plan ${m6.plan} misiones (L-sáb) · rellenar _/${m6.plan}` : `${m6.hechos}/${m6.plan} ✓`}`);
  L.push(`## 7 Vibecoding           ${m7 ? `S${m7.s} ${m7.nombre} · días ✓ ${m7.hechos == null ? '_' : m7.hechos}/${m7.plan} · SHIP ${fmt(m7.ship)} (PC SYNAPSE 15:00) · SHIPPED: ${m7.hechos == null ? '__' : on(m7.shipped)} · evidencia (commit/URL/test): ______` : 'fuera del rango S1-S12 (7-sep → 27-nov)'}`);
  L.push(`## 8 VITALS               ${vit.logs.length ? `logs ${m8.logsDias}/7 días · sueño medio ${sd(m8.suenoMedio, ' h')} · noches < 7 h: ${m8.noches7} · < 6 h: ${m8.noches6} · agua media ${sd(m8.aguaMedia, ' ml')}` : `${vit.estado.startsWith('ok') ? 'sin registros de la semana (quick-log de VITALS a las 07:00)' : vit.estado} · rellenar: sueño medio __ h · noches < 7 h _ · agua ____ ml`}`);
  L.push(`## 9 Días perdidos        ${m9.sinCheckUsmle == null ? `sin export · días USMLE transcurridos ${m9.transcurridos}/${m9.diasPlan}` : `sin ✓ USMLE: ${m9.sinCheckUsmle.length} (${m9.sinCheckUsmle.map(fmt).join(', ') || '—'}) de ${m9.transcurridos} transcurridos`} · ÁMBAR: ${m9.ambar.length} (${m9.ambar.map(fmt).join(', ') || '—'}) · ROJO: ${m9.rojo.length} (${m9.rojo.map(fmt).join(', ') || '—'}) · corrimiento ejecutado: sí / no / no aplica`);
  L.push(`## 10 Checklist G         activas (pre-marcadas): ${m10.activas.length ? m10.activas.join(' · ') : 'ninguna detectada'}${m10.sinDato.length ? ` · sin dato: ${m10.sinDato.join(', ')}` : ''}`);
  L.push('                          [ ] G1 validación rápida  [ ] G2 procrastinación productiva  [ ] G3 personalizar fracaso  [ ] G4 "solo pasar"  [ ] G5 simulacros cómodos');
  L.push('                          [ ] G6 cambiar respuestas  [ ] G7 mazos ajenos  [ ] G8 capar Anki  [ ] G9 releer lo sabido  [ ] G10 noche exhausto');
  L.push('');
  L.push('## Decisiones (a mano, 4 líneas máximo)');
  L.push(`- Nivel de la semana que entra: VERDE / ÁMBAR / DELOAD${['2026-10-26', '2026-12-07'].includes(addDays(LUNES, 7)) ? '  ← la semana que entra ES deload (secundarios 50%)' : ''}`);
  L.push('- 1 corrección concreta (qué, cuándo, cómo se mide el sábado que viene):');
  L.push('- 1 cosa que se deja de hacer:');
  L.push(`- Anki sáb/dom: ${m3.minFinde != null ? `${m3.minFinde}' / ${m3.minFinde}'` : "__' / __'"} (= due × 20 s)`);
  L.push('');
  L.push(`_Fuentes y método: DATA/REVISION_SEMANAL.md · script DATA/_scripts/gen_revision_semanal.js ${FECHA}${DRY ? ' --dry-run' : ''}_`);
  const md = L.join('\n') + '\n';

  const entrada = {
    semana: N, label: LABEL, lunes: LUNES, viernes: VIERNES, sabado: SABADO,
    hito: hitoSemana ? hitoSemana.nombre : null, hitoMinimo: hitoSemana ? hitoSemana.minimo : null, deload: DELOAD,
    generado, fuentes,
    metricas: { 1: m1, 2: m2, 3: m3, 4: m4, 5: m5, 6: m6, 7: m7, 8: m8, 9: m9, 10: m10 },
    decisiones: { nivel: null, correccion: null, dejar: null, ankiSab: null, ankiDom: null },
  };

  if (DRY) { console.log(md); console.log('(dry-run: nada escrito)'); return; }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const mdPath = path.join(OUT_DIR, `S${NN}_${SABADO}.md`);
  fs.writeFileSync(mdPath, md, 'utf8');
  let j; try { j = JSON.parse(fs.readFileSync(SEMANAS_JSON, 'utf8')); } catch { j = { _meta: { descripcion: 'Historial append-only de la revisión semanal (gen_revision_semanal.js)' }, semanas: [] }; }
  if (!Array.isArray(j.semanas)) j.semanas = [];
  const i = j.semanas.findIndex((s) => s.sabado === SABADO);
  if (i >= 0) { entrada.decisiones = { ...entrada.decisiones, ...(j.semanas[i].decisiones || {}) }; j.semanas[i] = entrada; }
  else { j.semanas.push(entrada); j.semanas.sort((a, b) => (a.sabado < b.sabado ? -1 : 1)); }
  j._meta.actualizado = generado;
  fs.writeFileSync(SEMANAS_JSON, JSON.stringify(j, null, 1), 'utf8');
  console.log(md);
  console.log(`OK → ${path.relative(ROOT, mdPath)} · _semanas.json (${j.semanas.length} semanas, ${i >= 0 ? 'actualizada' : 'añadida'} ${LABEL})`);
  if (!LS) console.log('⚠ sin export de localStorage: toca el instrumento SEMANA del cockpit (web) → pega el portapapeles en ' + path.relative(ROOT, LS_PATH));
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
