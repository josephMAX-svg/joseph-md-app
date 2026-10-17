// gen_revision_semanal.js — pre-rellena la REVISIÓN SEMANAL (DATA/REVISION_SEMANAL.md, sábado 07:15-07:35)
// con datos REALES y APPENDEA a DATA/USMLE/REVISIONES/_semanas.json (append-only; idempotente por semana).
//
// Fuentes (todas de solo lectura; lo que no se encuentra queda "sin dato", nunca se inventa):
//   · Supabase (anon key de src/lib/supabase.ts, SELECT vía @supabase/supabase-js; fallback REST):
//       study_schedule (ENCAPS · temas de la semana) · study_sim_scores · study_metrics · study_checks
//       mv_wellness_logs de VITALS (sueño/agua, user 'joseph') SOLO si hay credencial en env
//       (VITALS_SUPABASE_URL + VITALS_SUPABASE_KEY, o SUPABASE_SERVICE_ROLE_KEY en VITALS/web/.env.local);
//       si no hay, la métrica 8 queda "sin acceso".
//   · Supabase `plan_checks` (v5.10 · 12-sep): los ✓ de los 10 planes que la app espeja desde localStorage
//       (src/lib/studyProgressSync.ts) → métricas 6, 7 y 9 YA NO dependen del navegador. El export de localStorage
//       sigue valiendo como complemento (unión) y como fallback si Supabase no responde.
//   · Export de localStorage (claves jmd-*): DATA/USMLE/REVISIONES/_localstorage_export.json (o --ls <ruta>).
//       Se obtiene tocando el instrumento SEMANA del cockpit (web), con el botón PROGRESO → Exportar, o con el snippet de REVISION_SEMANAL.md.
//   · DATA/SYNAPSE/_vibecoding_ship.json (si existe; lo escribe verify_vibecoding.js): { entradas: [{s, id, fecha, hora, criterios_ok, total, shipped, detalle[]}] }
//       → métrica 7 "SHIPPED" viene del verificador (última ejecución del proyecto de la semana), no del auto-reporte.
//   · Diario USMLE en Obsidian (v5.10): frontmatter YAML de <vault>/01_USMLE/05_DIARY/*.md (plantilla 01_USMLE/_template_day_usmle.md):
//       pretest10 · q30_pct · eval_pct · error_dominante · sueno_h · modo · burnout_* · evite_hoy · b0500_anki … b1800_eval.
//       Fallback de la métrica 1 (si no hay jmd-usmle-scores), de la 8 (sueño, si VITALS no responde), de la 9 (modo) y
//       nueva alarma "burnout" en la 10 (≥1 señal de DOCTRINA §6 en la semana). Vault: env JMD_VAULT o D:\JOSEPH\Vault_Medicina MIR_Joseph.
//   · AnkiConnect (localhost:8765) en vivo; si no responde → "Anki cerrado" y se usa DATA/USMLE/_anki_telemetria.json.
//   · DATA/ENCAPS/TRACKING_ERRORES/_registro_resoluciones.json (rondas ENCAPS/USMLE/MIR de la semana).
//   · Planes: src/lib/usmleStep1Daily.ts (días e hitos de los 2 tramos) · synapseDailyPlan.ts · vibecodingPlan.ts · mirDailyPlan.ts · mirMantenimiento.ts ·
//       homeBriefing.ts (DELOAD_SEMANAS). D1, STEP1_SEMANAS y semana del Step 1 (pausa/examen): DATA/_scripts/gen_fechas_v6.js (v6.02).
//   · Supabase `mir_eval_log` (v5.14 · 19-sep, gap MIR 7): el registro MIR que la app espeja (mirEvalSync.ts) → métrica 5
//       = unión por id con el export jmd-mir-eval-log: % de QUIZ (kind quiz), pre-test, neto, temas CALIENTES (regla del gate:
//       quiz < 60 % o acumulado pretest+quiz+anclada < 50 % en los últimos 14 días) y sesiones de MANTENIMIENTO (ene-abr 2027).
//   · Métrica 3 (v5.14): primeraReview / primeraReviewEstado de la telemetría v2 (regla "05:00 Anki"): días verde/ámbar/rojo
//       de la semana y alarma "1ª review tarde o ausente ≥ 2 días hábiles".
//
// Uso:
//   node DATA/_scripts/gen_revision_semanal.js                 # semana de HOY (Lima) → S<NN>_<sábado>.md + _semanas.json
//   node DATA/_scripts/gen_revision_semanal.js 2026-09-12      # cualquier día de la semana que se quiere revisar
//   node DATA/_scripts/gen_revision_semanal.js --dry-run       # imprime el .md, no escribe nada
//   node DATA/_scripts/gen_revision_semanal.js --ls C:\ruta\export.json --out C:\ruta\dir
//   node DATA/_scripts/gen_revision_semanal.js --vault "D:\otro\vault"   # ruta del vault Obsidian (default: JMD_VAULT o D:\JOSEPH\Vault_Medicina MIR_Joseph)
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
const SHIP_JSON = path.join(ROOT, 'DATA/SYNAPSE/_vibecoding_ship.json');
const ANKI_URL = process.env.ANKICONNECT_URL || 'http://127.0.0.1:8765';
const VAULT_DEFAULT = process.env.JMD_VAULT || 'D:\\JOSEPH\\Vault_Medicina MIR_Joseph';

// ─── args ───
const argv = process.argv.slice(2);
const arg = (k, def) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : def; };
const has = (k) => argv.includes(k);
const DRY = has('--dry-run');
const OUT_DIR = arg('--out', REV_DIR);
const LS_PATH = arg('--ls', path.join(REV_DIR, '_localstorage_export.json'));
const VAULT = arg('--vault', VAULT_DEFAULT);
const DIARY_DIR = path.join(VAULT, '01_USMLE', '05_DIARY');
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
// v6.01 (10-oct-2026): cada extremo de la semana con SU año (antes «semana lun 28-dic → vie 1-ene 2026» con el año del lunes).
const fmtY = (s) => `${fmt(s)}-${s.slice(0, 4)}`;
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
// v6.01 (10-oct-2026): D1, STEP1_SEMANAS y la semana del Step 1 (pausa / examen) salen de la FUENTE ÚNICA de fechas (gen_fechas_v6.js →
// _fechas_v6.json = src/lib/fechasV6.ts, misma función semanaStep1 que usa la app vía homeBriefing). Antes: D1 por regex del .ts y TOTAL_SEM = 20
// fijo (v5.20: S20 = 15-19 feb, examen lun 22-feb), que en v6 etiquetaba como 'examen' todo lo posterior a la sem 20 (pausa ENCAPS y tramo 2).
const V6 = require('./gen_fechas_v6');
const F6 = V6.cargarFechasV6();
const D1 = F6.f1.inicio; // v6.02: lun 19-oct-2026 (v6.01: lun 12-oct · v6.00 = v5.20: mié 7-oct)
const D1ts = (usmleTs.match(/inicio:\s*'(\d{4}-\d{2}-\d{2})'/) || [])[1];
if (D1ts && D1ts !== D1) console.error(`⚠ usmleStep1Daily.ts (inicio ${D1ts}) ≠ _fechas_v6.json (f1.inicio ${D1}): regenerar el plan USMLE`);
// v5.17 (30-sep): S1 = semana L-V del D1 aunque el D1 no sea lunes, igual que fechasV6.semanaStep1. v6.01: D1 = lun 12-oct → S1 = lun 12 → vie 16-oct
// (revisión del sáb 17-oct) · S12 = lun 28 → mié 30-dic (último día de F1) · v6.00 = v5.20: D1 = mié 7-oct → S1 = lun 5 → vie 9-oct.
// N = nº del FICHERO S<NN>_<sábado>.md = semanas de CALENDARIO desde la del D1 (continuo: no se congela en la pausa, así cada sábado tiene su
// fichero y el orden alfabético = cronológico; S04_2026-11-07 · S05_2026-11-14 · S13_2027-01-09 = 1.er sábado de la pausa). La ETIQUETA
// (LABEL, campo `semanaStep1`) es la semana del Step 1 de la app: S1-S12 en F1 · 'PAUSA · ENCAPS' (lun 4-ene → semana del ENCAPS) ·
// S13-S40 en el tramo 2 (desde la semana del reinicio, mar 16-mar) · 'examen' (semana del lun 27-sep-2027) · 'post-Step 1'.
// v6.02 (17-oct-2026): sin cambio de lógica — N y la etiqueta salen de f1.inicio = lun 19-oct: S1 = lun 19 → vie 23-oct (revisión del sáb
// 24-oct = S01_2026-10-24.md) · S11 = lun 28 → mié 30-dic (último día de F1, NBME 28) · S12_2027-01-09 = 1.er sábado de la PAUSA · el
// tramo 2 empieza en la etiqueta S12/39 (semana del mar 16-mar = fichero S22_2027-03-20) · STEP1_SEMANAS = 39 (11 de F1 + 28). El sáb
// 17-oct (antes del D1) es 'pre-D1' (fichero S00). Ejemplos v6.01 de arriba: un número más que hoy (S04_2026-11-07 → S03).
const LUNES_D1 = addDays(D1, dow(D1) === 0 ? -6 : 1 - dow(D1));
const N = Math.floor((fromISO(LUNES) - fromISO(LUNES_D1)) / 86400000 / 7) + 1;
const NN = String(Math.max(0, N)).padStart(2, '0');
// DELOAD de los frentes secundarios: los lunes de homeBriefing.DELOAD_SEMANAS (se leen del .ts; respaldo = la pareja v6.02).
// v6.02: NBME 26 = vie 20-nov (D25) → semana deload lun 23-nov · NBME 28 = mié 30-dic (D52, último slot de F1: un hito de F1 no sale de F1)
// → la deload es la semana DEL lun 28-dic.
// v6.01: NBME 26 = vie 13-nov (D25) → semana deload lun 16-nov · NBME 28 = lun 28-dic (D55) → la deload es la semana DEL 28-dic (último
// tramo de F1, antes de la pausa) — mismos lunes que en v6.00 = v5.20 (NBME 26 mar 10-nov / NBME 28 mar 22-dic) · v5.19: NBME 26 lun 9-nov /
// NBME 28 lun 21-dic · v5.18: 9-nov / 21-dic (NBME vie 6-nov / vie 18-dic) · v5.17: mié 4-nov / mié 16-dic · v5.16: 2-nov / 14-dic.
const homeTs = readTs('homeBriefing.ts');
const DELOAD_SEMANAS = (() => {
  const blk = (homeTs.match(/DELOAD_SEMANAS[^=]*=\s*\[([\s\S]*?)\];/) || [])[1] || '';
  const xs = [...blk.matchAll(/lunes:\s*'(\d{4}-\d{2}-\d{2})',\s*motivo:\s*'([^']*)'/g)].map((m) => ({ lunes: m[1], motivo: m[2] }));
  return xs.length ? xs : [{ lunes: '2026-11-23', motivo: 'post-NBME 26 (vie 20-nov)' }, { lunes: '2026-12-28', motivo: 'semana del NBME 28 (mié 30-dic)' }];
})();
const SEM = V6.semanaStep1(SABADO, { deloads: DELOAD_SEMANAS }, F6);
const TOTAL_SEM = SEM.total; // = STEP1_SEMANAS (v6.02: 39 = 11 de F1 + 28 del tramo 2 · v6.01: 40 = 12 + 28) · v5.20: 20 fijo
const LABEL = SEM.pausa ? 'PAUSA · ENCAPS' : SEM.examen ? 'examen' : SEM.n < 1 ? 'pre-D1' : SEM.n > SEM.total ? 'post-Step 1' : `S${SEM.n}/${SEM.total}`; // = homeBriefing.semanaLabel
const DELOAD = SEM.deload;
const deloadSemanaQueEntra = V6.semanaStep1(addDays(SABADO, 7), { deloads: DELOAD_SEMANAS }, F6).deload;
// hitos: días "Assessment" del plan USMLE (🎯) — mínimos on-track de PALMERTON_POR_MATERIA Parte V
const MINIMOS = { 'NBME 25': '≥51%', 'NBME 26': '≥54%', 'NBME 27': '≥57%', 'NBME 28': '≥61%', 'NBME 29': '≥63%', 'NBME 30': '≥65%', 'NBME 31': '≥68% (GO)', 'NBME 32': '≥68%', 'NBME 33': '≥68%', 'UWSA1': 'baseline', 'UWSA2': 'low risk', 'FREE 120': '≥70%' };
// v6.01: filas de los DOS tramos — DIAS {d,fecha,system,…} y DIAS_T2 {t,d,fecha,fase,tipo,…,system,…} (d = 100 + t) → detecta los hitos 2027
// (NBME 29-33, UWSA3 opcional, UWSA2, Free 120); antes solo leía las filas {d:…} de F1.
const HITOS = [...usmleTs.matchAll(/\{(?:t:\d+,)?d:(\d+),fecha:"(\d{4}-\d{2}-\d{2})",[^}]*?system:"(?:Assessment|Banco intensivo|Sprint final)"[^}]*?sub:"🎯 ([^"—(]+)/g)]
  .map((m) => { const nombre = ((m[3].match(/UWSA\d|NBME \d+|FREE 120/i) || [m[3]])[0]).toUpperCase().replace('NBME', 'NBME'); return { d: +m[1], fecha: m[2], nombre: nombre.replace(/^NBME/, 'NBME'), minimo: MINIMOS[nombre] || null }; });
const hitoSemana = HITOS.find((h) => enSemana(h.fecha, LUNES, DOMINGO)) || null;
const proximoHito = HITOS.find((h) => h.fecha > VIERNES) || null;
const USMLE_DIAS = [...usmleTs.matchAll(/\{(?:t:\d+,)?d:(\d+),fecha:"(\d{4}-\d{2}-\d{2})"/g)].map((m) => ({ d: +m[1], fecha: m[2] })); // v6.01: + tramo 2 (d = 100 + t = clave de plan_checks)
const usmleSemana = USMLE_DIAS.filter((x) => enSemana(x.fecha, LUNES, VIERNES));

const synTs = readTs('synapseDailyPlan.ts');
const SYN_DIAS = [...synTs.matchAll(/\{d:(\d+),fecha:"(\d{4}-\d{2}-\d{2})",wd:"([^"]+)"/g)].map((m) => ({ d: +m[1], fecha: m[2], wd: m[3] }));
const synSemana = SYN_DIAS.filter((x) => enSemana(x.fecha, LUNES, SABADO)); // L-Sáb (dom = Feynman opcional, no cuenta)

const vibeTs = readTs('vibecodingPlan.ts');
const VIBE_DIAS = [...vibeTs.matchAll(/\{d:(\d+),fecha:"(\d{4}-\d{2}-\d{2})",wd:"[^"]+",semana:(\d+)/g)].map((m) => ({ d: +m[1], fecha: m[2], semana: +m[3] }));
const VIBE_PROY = [...vibeTs.matchAll(/\{s:(\d+),id:"([^"]+)",nombre:"((?:[^"\\]|\\.)*)"[^}]*?ship:"(\d{4}-\d{2}-\d{2})"/g)].map((m) => ({ s: +m[1], id: m[2], nombre: m[3].replace(/\\"/g, '"'), ship: m[4] }));
const vibeSemana = VIBE_DIAS.filter((x) => enSemana(x.fecha, LUNES, VIERNES));
const vibeP = vibeSemana.length ? VIBE_PROY.find((p) => p.s === vibeSemana[0].semana) : null;
// v6.01: rangos del vibecoding derivados del plan (antes texto fijo v5.20): proyecto S3 (jmd-usmle-scores) y rango total S1-S20
const vibeRango = (pred) => { const xs = VIBE_DIAS.filter(pred); return xs.length ? `${fmt(xs[0].fecha)} → ${fmt(xs[xs.length - 1].fecha)}-${xs[xs.length - 1].fecha.slice(0, 4)}` : null; };
const VIBE_S3 = vibeRango((x) => x.semana === 3);           // v6.01: lun 26-oct → vie 30-oct-2026 (v6.00 = v5.20: mié 21 → mar 27-oct) · v6.02: lo que diga vibecodingPlan.ts (D1 19-oct)
const VIBE_TODO = vibeRango(() => true);                    // v6.01: lun 12-oct → mié 24-feb-2027 (S1-S12 + taper S13-S20) · v6.02: derivado igual (lote de secundarios)

const mirTs = readTs('mirDailyPlan.ts');
const MIR_DIAS = [...mirTs.matchAll(/\{d:(\d+),fecha:"(\d{4}-\d{2}-\d{2})"/g)].map((m) => ({ d: +m[1], fecha: m[2] }));
const mirSemana = MIR_DIAS.filter((x) => enSemana(x.fecha, LUNES, VIERNES));
// v6.01 · MIR tras la 1.ª vuelta (mirMantenimiento.ts, 185 filas): MANTENIMIENTO mar 2-feb → mar 27-abr-2027 (57) + EXTENSIÓN mié 28-abr → vie 24-sep
// (128; L-S desde el SERUMS); sin sesión en SKIP ni en los protegidos v6 (fuente: _fechas_v6.json) · v6.00: jue 28-ene → jue 22-abr + extensión → vie 24-sep ·
// v5.20: jue 28-ene → jue 22-abr-2027, 58 días (protegidos lun 22-feb / mar 9-mar / mié 10-mar) · v5.19: mié 27-ene → jue 15-abr · v5.18: mar 26-ene → mié 14-abr.
// v6.01: las filas v6 traen `fase:"mantenimiento"|"extension"` entre semana y modo → el regex lo admite (antes no casaba ninguna fila: 0 de 185).
// {d, fecha, fase, modo, tipo, asignatura}
const mirMantTs = readTs('mirMantenimiento.ts');
const MIR_MANT = [...mirMantTs.matchAll(/\{d:(\d+),fecha:"(\d{4}-\d{2}-\d{2})",wd:"[^"]*",semana:\d+,(?:fase:"([^"]*)",)?modo:"([^"]*)",tipo:"([^"]*)",num:[^,]*,asignatura:("([^"]*)"|null)/g)]
  .map((m) => ({ d: +m[1], fecha: m[2], fase: m[3] || 'mantenimiento', modo: m[4], tipo: m[5], asignatura: m[7] || null }));
const mirMantSemana = MIR_MANT.filter((x) => enSemana(x.fecha, LUNES, VIERNES));

// ─── localStorage export ───
let LS = null, lsFecha = 'sin export';
try {
  if (fs.existsSync(LS_PATH)) {
    LS = JSON.parse(fs.readFileSync(LS_PATH, 'utf8'));
    lsFecha = (LS._export && LS._export.fecha) ? String(LS._export.fecha).slice(0, 16).replace('T', ' ') : toISO(fs.statSync(LS_PATH).mtime) + ' (mtime)';
  }
} catch (e) { lsFecha = 'export ilegible: ' + e.message.slice(0, 60); }
const ls = (k) => (LS && LS[k] != null ? LS[k] : null);
// progreso: unión de Supabase plan_checks (fuente de verdad entre dispositivos, v5.10) y del export de localStorage
// (el export del botón PROGRESO trae { progreso: {...} }; el del instrumento SEMANA trae { 'jmd-study-progress-v1': {...} }).
const progresoLS = ls('jmd-study-progress-v1') || (LS && LS.progreso && typeof LS.progreso === 'object' ? LS.progreso : {});
let PROGRESO_SB = null;   // { plan_key: Set<dia> } — se rellena tras supabaseSemana(); null = plan_checks no respondió
const hayProgreso = () => !!LS || !!PROGRESO_SB;
const doneSet = (plan) => {
  const s = new Set(Array.isArray(progresoLS[plan]) ? progresoLS[plan] : []);
  if (PROGRESO_SB && PROGRESO_SB[plan]) for (const d of PROGRESO_SB[plan]) s.add(d);
  return s;
};
const modoLog = ls('jmd-modo-log') || (LS && LS.modo_log && typeof LS.modo_log === 'object' ? LS.modo_log : {});

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
  const out = { estado: 'ok', encaps: [], simScores: [], metrics: null, checks: 0, errores: [], planChecks: null, planChecksSemana: 0 };
  let cli;
  try { const { url, key } = credsApp(); cli = mkClient(url, key); } catch (e) { out.estado = 'error: ' + e.message; return out; }
  const safe = async (fn, nombre) => { try { return await fn(); } catch (e) { out.errores.push(`${nombre}: ${e.message.slice(0, 80)}`); return null; } };
  // v5.10 · plan_checks: todos los ✓ (los planes son de ≤130 días × 10 claves → cabe en una página)
  const pc = await safe(() => cli.select('plan_checks', 'plan_key,dia,checked_at'), 'plan_checks');
  if (pc) {
    out.planChecks = {};
    for (const r of pc) { (out.planChecks[r.plan_key] = out.planChecks[r.plan_key] || new Set()).add(Number(r.dia)); if (enSemana(String(r.checked_at || ''), LUNES, DOMINGO)) out.planChecksSemana++; }
  }
  out.encaps = (await safe(() => cli.select('study_schedule', 'examen,dia,fecha,weekday,tipo,codigo,subtema,modo,simulacro', [['eq', 'examen', 'ENCAPS'], ['gte', 'fecha', LUNES], ['lte', 'fecha', DOMINGO]]), 'study_schedule')) || [];
  out.simScores = (await safe(() => cli.select('study_sim_scores', 'examen,sim_n,nota,fecha', [['gte', 'fecha', LUNES], ['lte', 'fecha', DOMINGO]]), 'study_sim_scores')) || [];
  const m = await safe(() => cli.select('study_metrics', 'examen,fecha,qx_pct,prom_sim,cobertura_pct,dias_a_examen', [['eq', 'examen', 'ENCAPS']]), 'study_metrics');
  out.metrics = m && m.length ? m[0] : null;
  const ch = await safe(() => cli.select('study_checks', 'examen,item_key,checked,ts', [['gte', 'ts', LUNES + 'T00:00:00'], ['lte', 'ts', DOMINGO + 'T23:59:59']]), 'study_checks');
  // v5.14 · mir_eval_log: la semana + 14 días previos (ventana de temas calientes). null = sin acceso (se usa solo el export).
  out.mirLog = await safe(() => cli.select('mir_eval_log', 'id,fecha,d,tema,asignatura,num,aciertos,total,blancos,tipo_error,kind,ajuste', [['gte', 'fecha', addDays(LUNES, -14)], ['lte', 'fecha', DOMINGO]]), 'mir_eval_log');
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
  const res = { estado: 'cerrado', live: null, json: [], jsonTodos: [] };
  try {
    const j = JSON.parse(fs.readFileSync(ANKI_JSON, 'utf8'));
    res.jsonTodos = (j.entradas || []).filter((e) => e && e.fecha && enSemana(e.fecha, LUNES, DOMINGO));   // v5.14: también estado ≠ ok (primeraReview)
    res.json = res.jsonTodos.filter((e) => e.estado === 'ok');
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

// ─── diario USMLE en Obsidian (v5.10): frontmatter YAML plano de 01_USMLE/05_DIARY/*.md ───
// Parser mínimo (clave: valor por línea; true/false, números, "" y null); suficiente para la plantilla _template_day_usmle.md.
function parseFrontmatter(txt) {
  const m = txt.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---/); if (!m) return null;
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const mm = line.match(/^([A-Za-z0-9_\-]+):\s*(.*)$/); if (!mm) continue;
    let v = mm[2].trim().replace(/\s+#.*$/, '');
    if (v === '' || v === 'null' || v === '~') v = null;
    else if (/^(true|false)$/i.test(v)) v = /^true$/i.test(v);
    else if (/^-?\d+([.,]\d+)?$/.test(v)) v = Number(v.replace(',', '.'));
    else v = v.replace(/^["']|["']$/g, '');
    out[mm[1]] = v;
  }
  return out;
}
const BURNOUT_KEYS = { burnout_ciego_cae: '% ciego cae 2 días en dominados', burnout_releer: 'releer >2 veces / +20% t/Q', burnout_sueno: 'dormirse <5 min o insomnio', burnout_cinismo: 'cinismo', burnout_gym: 'saltó el gym para estudiar' };
function diarioSemana() {
  const res = { estado: 'sin vault', dias: [] };
  try {
    if (!fs.existsSync(DIARY_DIR)) { res.estado = `sin carpeta ${DIARY_DIR}`; return res; }
    const files = fs.readdirSync(DIARY_DIR).filter((f) => /\.md$/i.test(f) && !f.startsWith('_'));
    for (const f of files) {
      let fm; try { fm = parseFrontmatter(fs.readFileSync(path.join(DIARY_DIR, f), 'utf8')); } catch { continue; }
      if (!fm) continue;
      const fecha = String(fm.date || fm.fecha || (f.match(/(\d{4}-\d{2}-\d{2})/) || [])[1] || '').slice(0, 10);
      if (!enSemana(fecha, LUNES, DOMINGO)) continue;
      const num = (k) => (typeof fm[k] === 'number' ? fm[k] : null);
      const modoRaw = String(fm.modo || '').toUpperCase().replace('Á', 'A');
      const senales = Object.keys(BURNOUT_KEYS).filter((k) => fm[k] === true);
      const bloques = ['b0500_anki', 'b0715_repaso', 'b0815_pretest', 'b0900_deep_prime', 'b1100_consolidacion', 'b1800_eval'];
      res.dias.push({
        fecha, file: f, pretest: num('pretest10'), q30: num('q30_pct'), eval: num('eval_pct'), error: fm.error_dominante || null,
        sueno: num('sueno_h'), modo: ['VERDE', 'AMBAR', 'ROJO'].includes(modoRaw) ? modoRaw : null,
        senales, bloquesOk: bloques.filter((b) => fm[b] === true).length, evite: fm.evite_hoy || null,
      });
    }
    res.dias.sort((a, b) => a.fecha.localeCompare(b.fecha));
    res.estado = `${res.dias.length} nota(s)`;
  } catch (e) { res.estado = 'error: ' + e.message.slice(0, 60); }
  return res;
}

// ─── vibecoding: _vibecoding_ship.json (verify_vibecoding.js) — tolera array o { entradas|ships: [...] } ───
function shipSemana(s) {
  try {
    if (!fs.existsSync(SHIP_JSON)) return { estado: 'sin fichero', ship: null };
    const j = JSON.parse(fs.readFileSync(SHIP_JSON, 'utf8'));
    const arr = Array.isArray(j) ? j : (j.entradas || j.ships || j.proyectos || []);
    const mios = arr.filter((x) => x && Number(x.s) === Number(s)).sort((a, b) => `${a.fecha || ''} ${a.hora || ''}`.localeCompare(`${b.fecha || ''} ${b.hora || ''}`));
    const e = mios[mios.length - 1] || null;   // última ejecución del verificador para ese proyecto
    if (!e) return { estado: `sin entrada para S${s}`, ship: null };
    let ok = e.criterios_ok, total = e.criterios_total ?? e.total;   // verify_vibecoding.js escribe {s,id,fecha,hora,criterios_ok,total,shipped,detalle[]}
    if (typeof e['criterios_ok/total'] === 'string') { const mm = e['criterios_ok/total'].match(/(\d+)\s*\/\s*(\d+)/); if (mm) { ok = +mm[1]; total = +mm[2]; } }
    return { estado: 'ok', ship: { fecha: e.fecha || null, ok: ok ?? null, total: total ?? null, shipped: typeof e.shipped === 'boolean' ? e.shipped : (ok != null && total != null ? ok === total : null) } };
  } catch (e) { return { estado: 'ilegible: ' + e.message.slice(0, 50), ship: null }; }
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
  if (sb.planChecks) PROGRESO_SB = sb.planChecks;          // v5.10 · progreso desde Supabase (unión con el export si lo hay)
  const dia = diarioSemana();                                // v5.10 · diario Obsidian (frontmatter)
  const diasDiario = dia.dias.filter((x) => enSemana(x.fecha, LUNES, VIERNES));

  // 1 · USMLE medias (jmd-usmle-scores; fallback: diario Obsidian)
  const sc0 = usmleScores();
  const sc = sc0 && sc0.length ? sc0 : (diasDiario.some((x) => x.pretest != null || x.q30 != null || x.eval != null) ? diasDiario.map((x) => ({ fecha: x.fecha, pretest: x.pretest, q30: x.q30, eval: x.eval, error: x.error })) : null);
  const m1Fuente = sc0 && sc0.length ? 'jmd-usmle-scores' : sc ? 'diario Obsidian' : null;
  const m1 = sc && sc.length ? { fuente: m1Fuente, dias: sc.length, pretest: media(sc.map((x) => x.pretest)), q30: media(sc.map((x) => x.q30)), eval: media(sc.map((x) => x.eval)), evalMax: Math.max(...sc.map((x) => x.eval ?? -1)), errores: sc.map((x) => x.error).filter(Boolean) } : null;
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
  // v5.14 · 1ª review del día (telemetría v2): verde ≤ 05:10 · ámbar > 05:10 · rojo sin review L-V. Alarma ≥ 2 días hábiles no verdes.
  const pr = anki.jsonTodos.filter((e) => e.primeraReviewEstado && enSemana(e.fecha, LUNES, VIERNES));
  m3.primeraReview = {
    dias: pr.map((e) => `${WD[dow(e.fecha)]} ${e.primeraReview || '—'} ${e.primeraReviewEstado}`),
    verde: pr.filter((e) => e.primeraReviewEstado === 'verde').length,
    ambar: pr.filter((e) => e.primeraReviewEstado === 'ambar').length,
    rojo: pr.filter((e) => e.primeraReviewEstado === 'rojo').length,
    sinDato: pr.length === 0,
  };
  m3.alarmaPrimeraReview = m3.primeraReview.ambar + m3.primeraReview.rojo >= 2;
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
  // 5 · MIR (v5.14): unión por id del export jmd-mir-eval-log y de Supabase mir_eval_log (mirEvalSync.ts)
  const mirNorm = (x) => ({ id: x.id, fecha: x.fecha, tema: x.tema, asignatura: x.asignatura, kind: x.kind, aciertos: Number(x.aciertos) || 0, total: Number(x.total) || 0, blancos: Number(x.blancos) || 0, tipoError: x.tipoError || x.tipo_error || null, ajuste: x.ajuste || null });
  const mirTodo = new Map();
  for (const x of (ls('jmd-mir-eval-log') || [])) if (x && x.fecha && typeof x.total === 'number') mirTodo.set(x.id || `${x.fecha}-${x.kind}-${x.tema}`, mirNorm(x));
  for (const x of (sb.mirLog || [])) if (x && x.fecha) mirTodo.set(x.id || `${x.fecha}-${x.kind}-${x.tema}`, mirNorm(x));
  const mirVentana = [...mirTodo.values()].filter((x) => x.total > 0 && x.kind !== 'derma10Q');
  const mirLog = mirVentana.filter((x) => enSemana(x.fecha, LUNES, VIERNES));
  const mirEval = mirLog.filter((x) => x.kind !== 'pretest');
  const brutoDe = (x) => (x.total ? Number(((x.aciertos || 0) / x.total * 100).toFixed(1)) : null);
  const netoDe = (x) => (x.total ? Number((((x.aciertos || 0) - ((x.total - (x.aciertos || 0) - (x.blancos || 0)) / 3)) / x.total * 100).toFixed(1)) : null);
  // temas CALIENTES (regla del gate, mirEvalLog.ts): quiz < 60 % o acumulado pretest+quiz+anclada < 50 % en los últimos 14 días
  const porTema = new Map();
  for (const x of mirVentana) { if (!x.tema) continue; const t = porTema.get(x.tema) || { tema: x.tema, asignatura: x.asignatura, quiz: [], acum: { a: 0, t: 0 } }; if (x.kind === 'quiz') t.quiz.push(brutoDe(x)); if (['pretest', 'quiz', 'anclada'].includes(x.kind)) { t.acum.a += x.aciertos; t.acum.t += x.total; } porTema.set(x.tema, t); }
  const calientes = [...porTema.values()].map((t) => { const q = t.quiz.length ? t.quiz[t.quiz.length - 1] : null; const ac = t.acum.t ? Number((t.acum.a / t.acum.t * 100).toFixed(0)) : null; return { ...t, q, ac, caliente: (q != null && q < 60) || (ac != null && ac < 50) }; }).filter((t) => t.caliente).sort((a, b) => (a.ac ?? 100) - (b.ac ?? 100)).slice(0, 6);
  const mirMantSem = mirLog.filter((x) => x.kind === 'mantenimiento');
  const m5 = mirLog.length || mirMantSemana.length ? {
    dias: new Set(mirEval.map((x) => x.fecha)).size, entradas: mirLog.length, diasPlan: mirSemana.length,
    netoPct: media(mirEval.map(netoDe)), brutoPct: media(mirEval.map(brutoDe)),
    quizPct: media(mirLog.filter((x) => x.kind === 'quiz').map(brutoDe)), quizN: mirLog.filter((x) => x.kind === 'quiz').length,
    pretestPct: media(mirLog.filter((x) => x.kind === 'pretest').map(brutoDe)),
    cierres: mirLog.filter((x) => x.kind === 'cierre').map((x) => `${x.asignatura || x.tema || '?'} ${pct(netoDe(x))}`),
    errores: mirEval.map((x) => x.tipoError).filter(Boolean), ajustes: mirLog.map((x) => x.ajuste).filter(Boolean),
    calientes: calientes.map((t) => `${t.tema}${t.asignatura ? ` (${t.asignatura})` : ''}: quiz ${pct(t.q)} · acum ${pct(t.ac)}`),
    mantenimiento: mirMantSemana.length ? { plan: mirMantSemana.length, modos: [...new Set(mirMantSemana.map((x) => x.modo))].join('/'), sesiones: mirMantSem.length, pct: media(mirMantSem.map(brutoDe)), asignaturas: [...new Set(mirMantSemana.map((x) => x.asignatura).filter(Boolean))].join(' · ') } : null,
    fuente: `${(ls('jmd-mir-eval-log') || []).length ? 'export' : ''}${(ls('jmd-mir-eval-log') || []).length && sb.mirLog ? ' ∪ ' : ''}${sb.mirLog ? 'mir_eval_log' : ''}` || 'sin fuente',
  } : null;
  // 6 · SYNAPSE (✓ = plan_checks ∪ export localStorage)
  const synDone = doneSet('synapse');
  const m6 = { plan: synSemana.length, hechos: hayProgreso() ? synSemana.filter((x) => synDone.has(x.d)).length : null };
  // 7 · Vibecoding (✓ de la app + SHIPPED del verificador si existe _vibecoding_ship.json)
  const vibeDone = doneSet('vibecoding');
  const m7 = vibeP ? { s: vibeP.s, nombre: vibeP.nombre, ship: vibeP.ship, plan: vibeSemana.length, hechos: hayProgreso() ? vibeSemana.filter((x) => vibeDone.has(x.d)).length : null } : null;
  const shipV = vibeP ? shipSemana(vibeP.s) : { estado: 'n/a', ship: null };
  if (m7) {
    m7.shipped = m7.hechos != null && m7.plan > 0 && m7.hechos === m7.plan;
    if (shipV.ship) { m7.verificador = shipV.ship; m7.shipped = shipV.ship.shipped; }   // el KPI 'shipped' manda el script, no el ✓ manual
  }
  // 8 · VITALS (fallback del sueño: campo sueno_h del diario Obsidian)
  const sueV = vit.logs.filter((x) => x.tipo === 'sueno').map((x) => Number(x.valor)), agua = vit.logs.filter((x) => x.tipo === 'agua').map((x) => Number(x.valor));
  const sueD = dia.dias.map((x) => x.sueno).filter((h) => typeof h === 'number');
  const sue = sueV.length ? sueV : sueD;
  const m8 = { estado: vit.estado, suenoFuente: sueV.length ? 'VITALS' : sueD.length ? 'diario Obsidian' : null, logsDias: new Set(vit.logs.map((x) => x.fecha)).size, suenoMedio: media(sue), noches7: sue.filter((h) => h < 7).length, noches6: sue.filter((h) => h < 6).length, aguaMedia: media(agua) };
  // 9 · días perdidos / niveles (modo: jmd-modo-log ∪ campo modo del diario)
  const usDone = doneSet('usmle');
  const corte = FECHA < VIERNES ? FECHA : VIERNES;
  const usPasados = usmleSemana.filter((x) => x.fecha <= corte);
  const sinCheck = hayProgreso() ? usPasados.filter((x) => !usDone.has(x.d)).map((x) => x.fecha) : null;
  const nivelesMap = {};
  for (const x of dia.dias) if (x.modo) nivelesMap[x.fecha] = x.modo;
  for (const [f, n] of Object.entries(modoLog)) nivelesMap[f] = n;   // la app manda sobre el diario si ambos existen
  const niveles = Object.entries(nivelesMap).filter(([f]) => enSemana(f, LUNES, DOMINGO));
  const m9 = { diasPlan: usmleSemana.length, transcurridos: usPasados.length, sinCheckUsmle: sinCheck, ambar: niveles.filter(([, n]) => n === 'AMBAR').map(([f]) => f), rojo: niveles.filter(([, n]) => n === 'ROJO').map(([f]) => f), corrimiento: null, planChecksSemana: sb.planChecks ? sb.planChecksSemana : null };
  // 10 · checklist G (pre-marcado) + burnout (DOCTRINA §6 → disparadores ÁMBAR del PROTOCOLO_MODO_MINIMO)
  const g = [];
  if (m3.alarmaG) g.push('G8 capar/omitir Anki (backlog > 100 o retención < 85%)');
  if (m3.alarmaPrimeraReview) g.push(`1ª review de Anki tarde/ausente ${m3.primeraReview.ambar + m3.primeraReview.rojo} días hábiles (regla 05:00)`);
  if (m1 && m1.evalMax != null && m1.evalMax >= 0 && m1.evalMax < 80) g.push('G1 validación rápida (ninguna eval ≥ 80% esta semana)');
  if (m8.noches6 > 0) g.push(`G10 noche exhausto (${m8.noches6} noche(s) < 6 h)`);
  const senalesSemana = dia.dias.flatMap((x) => x.senales.map((s) => `${fmt(x.fecha)}: ${BURNOUT_KEYS[s]}`));
  const gymSemana = dia.dias.filter((x) => x.senales.includes('burnout_gym')).map((x) => fmt(x.fecha));
  if (gymSemana.length) g.push(`BURNOUT ROJO conductual — saltó el gym para estudiar (${gymSemana.join(', ')})`);
  else if (senalesSemana.length) g.push(`BURNOUT ÁMBAR — ${senalesSemana.length} señal(es) §6: ${senalesSemana.join(' · ')}`);
  const m10 = { activas: g, senalesBurnout: senalesSemana.length, sinDato: [!m1 && 'G1 (sin scores USMLE ni diario)', m3.estado === 'cerrado' && m3.diasTelemetria === 0 && 'G8 (sin telemetría Anki)', !sue.length && 'G10 (sin VITALS ni sueno_h en el diario)', !dia.dias.length && 'burnout (sin notas en 05_DIARY)'].filter(Boolean) };

  const fuentes = { supabase: sb.estado + (sb.errores.length ? ` (${sb.errores.join('; ')})` : ''), planChecks: sb.planChecks ? `${Object.values(sb.planChecks).reduce((n, s) => n + s.size, 0)} ✓ (${sb.planChecksSemana} esta semana)` : 'sin acceso', localStorage: lsFecha, diario: dia.estado, ship: shipV.estado, anki: anki.estado, registro: reg.estado, vitals: vit.estado.split(' (')[0] };
  const generado = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const on = (b) => (b == null ? 'sin dato' : b ? 'sí' : 'NO');

  // ─── MD ───
  const L = [];
  L.push(`# Revisión semanal ${LABEL} · ${fmt(SABADO)} · semana ${fmtY(LUNES)} → ${fmtY(VIERNES)} · hito: ${m2.hitoSemana || '—'} · DELOAD: ${DELOAD ? 'SÍ (secundarios 50%)' : 'no'}`);
  L.push(`Generado: ${generado} · fuentes: supabase=${fuentes.supabase} · plan_checks=${fuentes.planChecks} · localStorage=${fuentes.localStorage} · diario=${fuentes.diario} · ship=${fuentes.ship} · anki=${fuentes.anki} · registro=${fuentes.registro} · vitals=${fuentes.vitals}`);
  L.push('');
  L.push(`## 1 USMLE medias         ${m1 ? `pre-test ${sd(m1.pretest, '/10')} · 30Q ${pct(m1.q30)} · eval ${pct(m1.eval)} (días con dato: ${m1.dias}/${usmleSemana.length}, fuente ${m1.fuente}) · error dominante: ${m1.errores.join(', ') || '—'}` : `sin dato (jmd-usmle-scores llega con el proyecto S3 del vibecoding, ${VIBE_S3 || 'lun 26-oct → vie 30-oct-2026'} (v6.01; v6.00 = v5.20: mié 21 → mar 27-oct · v5.19: mar 20 → lun 26-oct · v5.18: lun 19 → vie 23-oct); hasta entonces el diario Obsidian 05_DIARY con pretest10/q30_pct/eval_pct rellena esta línea) · rellenar a mano: pre-test __/10 · 30Q __% · eval __%`}   → on-track (eval ≥ 60%): ${m1 && m1.eval != null ? on(m1.eval >= 60) : '__'}`);
  L.push(`## 2 uWorld acumulado     __% (n = ____) [manual: dashboard uWorld] · próximo hito: ${m2.proximo || '—'} · distancia: __ pts`);
  L.push(`## 3 Anki                 ${m3.estado === 'cerrado' && !m3.diasTelemetria ? 'Anki cerrado y sin telemetría en la semana → correr node DATA/_scripts/anki_telemetria.js con Anki abierto' : `due ${sd(m3.due)} (medio ${sd(m3.dueMedio)}) · backlog ${sd(m3.backlog)} · retención 30d ${m3.retencion30 == null ? 'sin dato' : Math.round(m3.retencion30 * 100) + '%'} · again ${pct(m3.againPct)} · minFinde ${sd(m3.minFinde, "'")} · telemetría ${m3.diasTelemetria} días${m3.estado === 'live' ? ' (+ live)' : ''}`} · alarma G: ${m3.alarmaG ? 'SÍ → cero nuevas hasta backlog < 20' : 'no'} · 1ª review (05:00): ${m3.primeraReview.sinDato ? 'sin dato (telemetría v2 no corrida esta semana)' : `${m3.primeraReview.verde} verde · ${m3.primeraReview.ambar} ámbar · ${m3.primeraReview.rojo} rojo [${m3.primeraReview.dias.join(' · ')}]`}${m3.alarmaPrimeraReview ? ' · ⚠ ALARMA: ≥ 2 días hábiles con la 1ª review tarde o ausente → revisar la hora de dormir (DOCTRINA §6)' : ''}`);
  L.push(`## 4 ENCAPS viernes       mini-sim ${m4.miniSim || 'sin dato (registrar la ronda mini_sim en _registro_resoluciones.json)'} · rondas de la semana: ${m4.rondas}${m4.pctMedio != null ? ` (media ${pct(m4.pctMedio)} ciego)` : ''} · checks app: ${sd(m4.checks)} · QX acumulado: ${pct(m4.qxPct)} · temas: ${m4.temas.join(' · ') || 'sin filas en study_schedule'}`);
  L.push(`## 5 MIR eval D-1         ${m5 ? `neto ${pct(m5.netoPct)} (bruto ${pct(m5.brutoPct)}) · QUIZ ${pct(m5.quizPct)} (n=${m5.quizN}) · pre-test ${pct(m5.pretestPct)} · días con eval ${m5.dias}/${m5.diasPlan} · entradas ${m5.entradas} (${m5.fuente}) · errores: ${m5.errores.join(', ') || '—'}${m5.ajustes.length ? ` · ajustes: ${m5.ajustes.join(', ')}` : ''}${m5.cierres.length ? ` · cierres: ${m5.cierres.join(' · ')}` : ''} · temas CALIENTES (14 d): ${m5.calientes.length ? m5.calientes.join(' · ') : 'ninguno'}${m5.mantenimiento ? ` · MANTENIMIENTO: ${m5.mantenimiento.sesiones}/${m5.mantenimiento.plan} sesiones (${m5.mantenimiento.modos}${m5.mantenimiento.pct != null ? ` · ${pct(m5.mantenimiento.pct)}` : ''}) · ${m5.mantenimiento.asignaturas || '—'}` : ''}` : `sin dato (jmd-mir-eval-log vacío o sin export${sb.mirLog ? '; mir_eval_log sin filas' : '; mir_eval_log sin acceso'}) · días MIR en el plan: ${mirSemana.length} · rellenar: media __% · días _/5`}`);
  L.push(`## 6 SYNAPSE misiones     ${m6.hechos == null ? `sin plan_checks ni export de localStorage · plan ${m6.plan} misiones (L-sáb) · rellenar _/${m6.plan}` : `${m6.hechos}/${m6.plan} ✓`}`);
  L.push(`## 7 Vibecoding           ${m7 ? `S${m7.s} ${m7.nombre} · días ✓ ${m7.hechos == null ? '_' : m7.hechos}/${m7.plan} · SHIP ${fmt(m7.ship)} (PC SYNAPSE 15:00) · SHIPPED: ${m7.verificador ? `${on(m7.shipped)} (verify_vibecoding ${m7.verificador.ok ?? '?'}/${m7.verificador.total ?? '?'} criterios${m7.verificador.fecha ? ' · ' + m7.verificador.fecha : ''})` : m7.hechos == null ? '__' : `${on(m7.shipped)} (auto-reporte: ✓ ${m7.hechos}/${m7.plan}; correr node DATA/_scripts/verify_vibecoding.js ${m7.s} para el dato real)`} · evidencia (commit/URL/test): ______` : `fuera del rango del vibecoding (S1-S20: ${VIBE_TODO || '—'}; v6.00 = v5.20: mié 7-oct → vie 19-feb)`}`);
  L.push(`## 8 VITALS               ${sue.length ? `${vit.logs.length ? `logs ${m8.logsDias}/7 días · ` : ''}sueño medio ${sd(m8.suenoMedio, ' h')} (${m8.suenoFuente}, ${sue.length} noche(s)) · noches < 7 h: ${m8.noches7} · < 6 h: ${m8.noches6} · agua media ${sd(m8.aguaMedia, ' ml')}` : `${vit.estado.startsWith('ok') ? 'sin registros de la semana (quick-log de VITALS a las 07:00)' : vit.estado} · sin sueno_h en el diario · rellenar: sueño medio __ h · noches < 7 h _ · agua ____ ml`}`);
  L.push(`## 9 Días perdidos        ${m9.sinCheckUsmle == null ? `sin plan_checks ni export · días USMLE transcurridos ${m9.transcurridos}/${m9.diasPlan}` : `sin ✓ USMLE: ${m9.sinCheckUsmle.length} (${m9.sinCheckUsmle.map(fmt).join(', ') || '—'}) de ${m9.transcurridos} transcurridos`}${m9.planChecksSemana != null ? ` · ✓ marcados esta semana (todos los planes): ${m9.planChecksSemana}` : ''} · ÁMBAR: ${m9.ambar.length} (${m9.ambar.map(fmt).join(', ') || '—'}) · ROJO: ${m9.rojo.length} (${m9.rojo.map(fmt).join(', ') || '—'}) · corrimiento ejecutado: sí / no / no aplica`);
  L.push(`## 10 Checklist G         activas (pre-marcadas): ${m10.activas.length ? m10.activas.join(' · ') : 'ninguna detectada'}${m10.sinDato.length ? ` · sin dato: ${m10.sinDato.join(', ')}` : ''}`);
  L.push('                          [ ] G1 validación rápida  [ ] G2 procrastinación productiva  [ ] G3 personalizar fracaso  [ ] G4 "solo pasar"  [ ] G5 simulacros cómodos');
  L.push('                          [ ] G6 cambiar respuestas  [ ] G7 mazos ajenos  [ ] G8 capar Anki  [ ] G9 releer lo sabido  [ ] G10 noche exhausto');
  L.push(`                          Burnout §6 (diario 05_DIARY, ${dia.dias.length} nota(s)): [ ] % ciego cae 2 días en dominados  [ ] releer >2 veces / +20% t/Q  [ ] dormirse <5 min o insomnio  [ ] cinismo  [ ] saltó el gym (= ROJO)`);
  L.push('');
  L.push('## Decisiones (a mano, 4 líneas máximo)');
  L.push(`- Nivel de la semana que entra: VERDE / ÁMBAR / DELOAD${deloadSemanaQueEntra ? '  ← la semana que entra ES deload (secundarios 50%)' : ''}`);
  L.push('- 1 corrección concreta (qué, cuándo, cómo se mide el sábado que viene):');
  L.push('- 1 cosa que se deja de hacer:');
  L.push(`- Anki sáb/dom: ${m3.minFinde != null ? `${m3.minFinde}' / ${m3.minFinde}'` : "__' / __'"} (= due × 20 s)`);
  L.push('');
  L.push(`_Fuentes y método: DATA/REVISION_SEMANAL.md · script DATA/_scripts/gen_revision_semanal.js ${FECHA}${DRY ? ' --dry-run' : ''}_`);
  const md = L.join('\n') + '\n';

  const entrada = {
    semana: N, label: LABEL, semanaStep1: SEM.n, semanasStep1: SEM.total, pausa: SEM.pausa, examen: SEM.examen, lunes: LUNES, viernes: VIERNES, sabado: SABADO,
    hito: hitoSemana ? hitoSemana.nombre : null, hitoMinimo: hitoSemana ? hitoSemana.minimo : null, deload: DELOAD,
    generado, fuentes,
    metricas: { 1: m1, 2: m2, 3: m3, 4: m4, 5: m5, 6: m6, 7: m7, 8: m8, 9: m9, 10: m10 },
    decisiones: { nivel: null, correccion: null, dejar: null, ankiSab: null, ankiDom: null },
  };

  // v6.01: el dry-run dice qué fichero escribiría (para alinear los nombres citados en DATA/SYNAPSE/vibecoding_proyectos.json)
  if (DRY) { console.log(md); console.log(`(dry-run: nada escrito · escribiría ${path.relative(ROOT, path.join(OUT_DIR, `S${NN}_${SABADO}.md`)).split(path.sep).join('/')} · ${LABEL}${DELOAD ? ' · DELOAD' : ''})`); return; }
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
