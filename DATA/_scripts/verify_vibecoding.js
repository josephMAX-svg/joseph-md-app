// verify_vibecoding.js — verificación MECÁNICA de "shipped" del VIBECODING 04:15 (vacío 3 de gaps_v3b_synapse.json).
//
// "Shipped" deja de ser auto-reporte: el catálogo (DATA/SYNAPSE/vibecoding_proyectos.json) declara, por proyecto,
// 4 criterios de aceptación y su comprobación mecánica (verificacion[i]); este script las ejecuta y APENDA el
// resultado a DATA/SYNAPSE/_vibecoding_ship.json {s, id, fecha, hora, criterios_ok, total, shipped, detalle[]}.
// La app (SynapseTodayPlan / SynapseHub) muestra el último verify (VIBE_SHIP_LOG horneado por gen_vibecoding_plan.js
// + localStorage 'jmd-vibe-ship' vía el one-liner que imprime este script). gen_revision_semanal.js (métrica 7)
// puede leer el mismo JSON.
//
// Tipos de comprobación:
//   git      { repo, grep }                 → git -C <repo> log --all --grep '\[S<n>\]' tiene ≥1 commit
//   test     { cwd, cmd, expect? }          → el comando termina con código 0 (y su salida contiene `expect`)
//   url      { url }                        → HEAD/GET responde 2xx/3xx
//   supabase { tabla, min_filas? }          → REST /rest/v1/<tabla> con la anon key de src/lib/supabase.ts → 200 y count ≥ min
//   fichero  { path, contiene?, min_entradas?, campo?, max_texto?: [texto, n], dir? } → existe (+ condiciones)
//   manual   { como }                       → no verificable por script: cuenta en el total; solo OK con --ok-manual <i,j>
// shipped = criterios_ok === total.
//
// Uso:
//   node DATA/_scripts/verify_vibecoding.js 3                  # verifica el proyecto S3
//   node DATA/_scripts/verify_vibecoding.js 3 --ok-manual 2,3  # acepta los criterios manuales 2 y 3 (Joseph los vio)
//   node DATA/_scripts/verify_vibecoding.js 3 --dry            # no escribe el JSON
//   node DATA/_scripts/verify_vibecoding.js --sensores         # S13-S16: telemetría Anki · revisión semanal · ship log · plan_checks → verde/ámbar/rojo
//   node DATA/_scripts/verify_vibecoding.js --todos            # S1-S12 en seco (retro de S12), sin escribir
// Sin dependencias (Node ≥ 18). Tolerante: cada comprobación falla por separado, nunca tumba el script.
'use strict';
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.join(__dirname, '..', '..');
const CAT_PATH = path.join(ROOT, 'DATA/SYNAPSE/vibecoding_proyectos.json');
const OUT_JSON = path.join(ROOT, 'DATA/SYNAPSE/_vibecoding_ship.json');

const argv = process.argv.slice(2);
const has = (k) => argv.includes(k);
const arg = (k, def) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : def; };
const S = Number(argv.find((a) => /^\d+$/.test(a)) || 0);
const OK_MANUAL = new Set(String(arg('--ok-manual', '')).split(',').map((x) => Number(x.trim())).filter(Boolean));
const DRY = has('--dry');
const SENSORES = has('--sensores');
const TODOS = has('--todos');

const pad = (n) => String(n).padStart(2, '0');
const now = new Date();
const FECHA = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const HORA = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
const resolvePath = (p) => (/^([A-Za-z]:|\/)/.test(p) ? p : path.join(ROOT, p));
const cut = (s, n = 90) => String(s || '').replace(/\s+/g, ' ').trim().slice(0, n);

// ─── comprobaciones ───
function checkGit(v) {
  const repo = resolvePath(v.repo);
  if (!fs.existsSync(path.join(repo, '.git'))) return { ok: false, msg: `repo sin .git: ${repo}` };
  const pat = String(v.grep).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    const out = cp.execSync(`git -C "${repo}" log --all --grep="${pat}" --oneline`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 20000 }).trim();
    const n = out ? out.split('\n').length : 0;
    return { ok: n > 0, msg: n ? `${n} commit(s) ${v.grep}: ${cut(out.split('\n')[0], 70)}` : `ningún commit con ${v.grep} en ${repo}` };
  } catch (e) { return { ok: false, msg: 'git log falló: ' + cut(e.message, 70) }; }
}
function checkTest(v) {
  const cwd = v.cwd ? resolvePath(v.cwd) : ROOT;
  if (!fs.existsSync(cwd)) return { ok: false, msg: `cwd no existe: ${cwd}` };
  try {
    const out = cp.execSync(v.cmd, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 120000, windowsHide: true });
    if (v.expect && !String(out).includes(v.expect)) return { ok: false, msg: `código 0 pero la salida no contiene "${v.expect}": ${cut(out, 60)}` };
    return { ok: true, msg: `código 0${v.expect ? ` · contiene "${v.expect}"` : ''}` };
  } catch (e) {
    const out = (e.stdout || '') + (e.stderr || '');
    return { ok: false, msg: `falló (código ${e.status ?? '?'}): ${cut(out || e.message, 80)}` };
  }
}
async function checkUrl(v) {
  const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    let r = await fetch(v.url, { method: 'HEAD', redirect: 'follow', signal: ctrl.signal, headers: { 'User-Agent': 'Mozilla/5.0 (verify_vibecoding)' } });
    if ([403, 405, 501].includes(r.status)) r = await fetch(v.url, { method: 'GET', redirect: 'follow', signal: ctrl.signal, headers: { 'User-Agent': 'Mozilla/5.0 (verify_vibecoding)' } });
    return { ok: r.status >= 200 && r.status < 400, msg: `HTTP ${r.status}` };
  } catch (e) { return { ok: false, msg: 'sin respuesta: ' + cut(e.message, 60) }; }
  finally { clearTimeout(t); }
}
function credsApp() {
  const t = fs.readFileSync(path.join(ROOT, 'src/lib/supabase.ts'), 'utf8');
  const url = (t.match(/SUPABASE_URL\s*=\s*'([^']+)'/) || [])[1];
  const key = (t.match(/SUPABASE_ANON_KEY\s*=\s*'([^']+)'/) || [])[1];
  if (!url || !key) throw new Error('no se pudo leer URL/anon key de src/lib/supabase.ts');
  return { url: url.replace(/\/$/, ''), key };
}
async function checkSupabase(v) {
  let c; try { c = credsApp(); } catch (e) { return { ok: false, msg: e.message }; }
  const min = Number(v.min_filas) || 1;
  const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const r = await fetch(`${c.url}/rest/v1/${v.tabla}?select=*&limit=${min}`, { signal: ctrl.signal, headers: { apikey: c.key, Authorization: `Bearer ${c.key}`, Prefer: 'count=exact' } });
    if (r.status !== 200) return { ok: false, msg: `REST ${r.status} en ${v.tabla} (¿tabla sin crear o RLS sin policy?)` };
    const cr = r.headers.get('content-range') || '';
    const total = Number((cr.match(/\/(\d+)$/) || [])[1]);
    const rows = Number.isFinite(total) ? total : (await r.json()).length;
    return { ok: rows >= min, msg: `200 · ${rows} filas (mín ${min})` };
  } catch (e) { return { ok: false, msg: 'sin respuesta: ' + cut(e.message, 60) }; }
  finally { clearTimeout(t); }
}
function entradasDe(j) {
  if (Array.isArray(j)) return j;
  if (j && typeof j === 'object') { for (const k of ['entradas', 'rondas', 'items', 'preguntas', 'usados', 'fichas']) if (Array.isArray(j[k])) return j[k]; }
  return null;
}
function checkFichero(v) {
  const p = resolvePath(v.path);
  if (!fs.existsSync(p)) return { ok: false, msg: `no existe ${v.path}` };
  if (v.dir) {
    const st = fs.statSync(p); if (!st.isDirectory()) return { ok: false, msg: `${v.path} no es carpeta` };
    const n = fs.readdirSync(p).length; return { ok: n > 0, msg: n ? `carpeta con ${n} entrada(s)` : 'carpeta vacía' };
  }
  const txt = fs.readFileSync(p, 'utf8');
  const notas = [];
  if (v.contiene && !txt.includes(v.contiene)) return { ok: false, msg: `existe pero no contiene "${v.contiene}"` };
  if (v.contiene) notas.push(`contiene "${v.contiene}"`);
  if (Array.isArray(v.max_texto)) {
    const [needle, max] = v.max_texto; const n = txt.split(needle).length - 1;
    if (n > max) return { ok: false, msg: `"${needle}" aparece ${n} veces (máx ${max})` };
    notas.push(`"${needle}" ×${n} (máx ${max})`);
  }
  if (v.min_entradas) {
    let j; try { j = JSON.parse(txt); } catch { return { ok: false, msg: 'no es JSON válido' }; }
    const arr = entradasDe(j); if (!arr) return { ok: false, msg: 'JSON sin array de entradas' };
    const n = v.campo ? arr.filter((e) => e && e[v.campo] != null).length : arr.length;
    if (n < v.min_entradas) return { ok: false, msg: `${n} entrada(s)${v.campo ? ` con "${v.campo}"` : ''} (mín ${v.min_entradas})` };
    notas.push(`${n} entrada(s)${v.campo ? ` con "${v.campo}"` : ''}`);
  }
  return { ok: true, msg: notas.length ? notas.join(' · ') : 'existe' };
}
function checkManual(v, i) {
  return OK_MANUAL.has(i) ? { ok: true, msg: 'aceptado con --ok-manual (visto por Joseph)' } : { ok: false, msg: `manual — ${v.como || 'comprobar a mano'} (acepta con --ok-manual ${i})` };
}
async function comprobar(v, i) {
  try {
    switch (v.tipo) {
      case 'git': return checkGit(v);
      case 'test': return checkTest(v);
      case 'url': return await checkUrl(v);
      case 'supabase': return await checkSupabase(v);
      case 'fichero': return checkFichero(v);
      case 'manual': return checkManual(v, i);
      default: return { ok: false, msg: 'tipo desconocido ' + v.tipo };
    }
  } catch (e) { return { ok: false, msg: 'error: ' + cut(e.message, 80) }; }
}

// ─── persistencia ───
function leerLog() {
  try { const j = JSON.parse(fs.readFileSync(OUT_JSON, 'utf8')); if (!Array.isArray(j.entradas)) j.entradas = []; return j; }
  catch {
    return {
      _meta: {
        descripcion: "Resultados de node DATA/_scripts/verify_vibecoding.js <s> (append por ejecución). 'shipped' = criterios_ok === total. s=0 = --sensores (S13-S16). Lo hornea gen_vibecoding_plan.js en VIBE_SHIP_LOG y lo lee gen_revision_semanal.js (métrica 7).",
        regla: 'El ✓ manual de la app solo cuenta días; SHIPPED lo decide este JSON. Sábado PC = correr verify antes de marcar.',
      },
      entradas: [],
    };
  }
}
function guardar(entrada) {
  const j = leerLog();
  j.entradas.push(entrada);
  j._meta.actualizado = `${FECHA} ${HORA}`;
  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(j, null, 1), 'utf8');
  return j.entradas;
}
const oneLiner = (entradas) => {
  const slim = entradas.map((e) => ({ s: e.s, id: e.id, fecha: e.fecha, hora: e.hora, criterios_ok: e.criterios_ok, total: e.total, shipped: e.shipped, resumen: e.resumen }));
  return `localStorage.setItem('jmd-vibe-ship', ${JSON.stringify(JSON.stringify(slim))});`;
};

// ─── verificar un proyecto ───
async function verificarProyecto(p, escribir) {
  const detalle = [];
  for (let i = 0; i < p.verificacion.length; i++) {
    const v = p.verificacion[i];
    const r = await comprobar(v, i + 1);
    detalle.push({ n: i + 1, tipo: v.tipo, ok: r.ok, criterio: p.aceptacion[i], msg: r.msg });
  }
  const ok = detalle.filter((x) => x.ok).length;
  const entrada = { s: p.s, id: p.id, fecha: FECHA, hora: HORA, criterios_ok: ok, total: detalle.length, shipped: ok === detalle.length, resumen: detalle.map((x) => `${x.ok ? '✓' : '✗'}${x.n} ${x.tipo}`).join(' '), detalle };
  console.log(`\nS${p.s} · ${p.nombre}`);
  for (const x of detalle) console.log(`  ${x.ok ? '✓' : '✗'} ${x.n} [${x.tipo}] ${cut(x.criterio, 80)}\n      → ${x.msg}`);
  console.log(`  ${entrada.shipped ? 'SHIPPED ✅' : 'NO shipped ❌'} · ${ok}/${detalle.length} criterios · ${FECHA} ${HORA}`);
  if (escribir) {
    const entradas = guardar(entrada);
    console.log(`  → _vibecoding_ship.json (${entradas.length} entradas). KPI app: pega en la consola del navegador:\n  ${oneLiner(entradas)}`);
  }
  return entrada;
}

// ─── --sensores (S13-S16): todo lo que debe seguir verde sin construir nada ───
function ultimoFichero(dir, re) {
  try { return fs.readdirSync(dir).filter((f) => re.test(f)).sort().pop() || null; } catch { return null; }
}
async function sensores(escribir) {
  const det = [];
  const push = (nombre, ok, nivel, msg) => det.push({ nombre, ok, nivel, msg });
  // 1 · telemetría Anki (≤ 2 días, estado ok, sin alarma G, 1ª review no roja)
  try {
    const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/USMLE/_anki_telemetria.json'), 'utf8'));
    const e = (j.entradas || []).slice(-1)[0];
    if (!e) push('anki_telemetria', false, 'rojo', 'sin entradas');
    else {
      const dias = Math.round((new Date(FECHA) - new Date(e.fecha)) / 86400000);
      const viejo = dias > 2, rojo = e.estado !== 'ok' || e.alarma || e.primeraReviewEstado === 'rojo';
      push('anki_telemetria', !viejo && !rojo, viejo || rojo ? (rojo ? 'rojo' : 'ambar') : 'verde', `última ${e.fecha} (${dias} d) · estado ${e.estado}${e.alarma ? ' · ALARMA G' : ''}${e.primeraReview ? ` · 1ª review ${e.primeraReview} (${e.primeraReviewEstado})` : ''}`);
    }
  } catch { push('anki_telemetria', false, 'rojo', 'DATA/USMLE/_anki_telemetria.json ilegible o ausente'); }
  // 2 · revisión semanal del último sábado
  const ult = ultimoFichero(path.join(ROOT, 'DATA/USMLE/REVISIONES'), /^S\d\d_\d{4}-\d\d-\d\d\.md$/);
  if (!ult) push('revision_semanal', false, 'rojo', 'sin ficheros S<NN>_<fecha>.md en DATA/USMLE/REVISIONES');
  else { const f = ult.slice(4, 14); const dias = Math.round((new Date(FECHA) - new Date(f)) / 86400000); push('revision_semanal', dias <= 8, dias <= 8 ? 'verde' : 'ambar', `${ult} (hace ${dias} d)`); }
  // 3 · ship log (verify corrido en los últimos 14 días)
  const log = leerLog().entradas;
  const ultV = log.length ? log[log.length - 1] : null;
  if (!ultV) push('ship_log', false, 'ambar', 'sin entradas en _vibecoding_ship.json');
  else { const dias = Math.round((new Date(FECHA) - new Date(ultV.fecha)) / 86400000); push('ship_log', dias <= 14, dias <= 14 ? 'verde' : 'ambar', `último verify S${ultV.s} ${ultV.fecha} (${ultV.criterios_ok}/${ultV.total})`); }
  // 4 · plan_checks (espejo del progreso, S3)
  const sb = await checkSupabase({ tabla: 'plan_checks', min_filas: 1 });
  push('plan_checks', sb.ok, sb.ok ? 'verde' : 'ambar', sb.msg);
  // 5 · scores USMLE (usmle_daily_scores, fuente de la métrica 1)
  const sc = await checkSupabase({ tabla: 'usmle_daily_scores', min_filas: 1 });
  push('usmle_daily_scores', sc.ok, sc.ok ? 'verde' : 'ambar', sc.msg);

  const rojos = det.filter((x) => x.nivel === 'rojo').length, ambar = det.filter((x) => x.nivel === 'ambar').length;
  const nivel = rojos ? 'ROJO' : ambar ? 'ÁMBAR' : 'VERDE';
  console.log(`\nSENSORES ${FECHA} ${HORA} · ${nivel}`);
  for (const x of det) console.log(`  ${x.nivel === 'verde' ? '🟢' : x.nivel === 'ambar' ? '🟡' : '🔴'} ${x.nombre}: ${x.msg}`);
  const entrada = { s: 0, id: 'sensores', fecha: FECHA, hora: HORA, criterios_ok: det.filter((x) => x.ok).length, total: det.length, shipped: rojos === 0 && ambar === 0, resumen: `${nivel} · ` + det.map((x) => `${x.nivel === 'verde' ? '🟢' : x.nivel === 'ambar' ? '🟡' : '🔴'}${x.nombre}`).join(' '), detalle: det };
  if (escribir) { const entradas = guardar(entrada); console.log(`  → _vibecoding_ship.json (${entradas.length} entradas)\n  ${oneLiner(entradas)}`); }
  return entrada;
}

(async () => {
  const CAT = JSON.parse(fs.readFileSync(CAT_PATH, 'utf8'));
  if (SENSORES) { await sensores(!DRY); return; }
  if (TODOS) { for (const p of CAT.proyectos) await verificarProyecto(p, false); console.log('\n(--todos corre en seco: nada escrito)'); return; }
  if (!S) { console.log('Uso: node DATA/_scripts/verify_vibecoding.js <1-12> [--ok-manual i,j] [--dry] | --sensores | --todos'); process.exit(2); }
  const p = CAT.proyectos.find((x) => x.s === S);
  if (!p) { console.error('No existe el proyecto S' + S + ' (S13-S20 son taper: usa --sensores)'); process.exit(2); }
  const e = await verificarProyecto(p, !DRY);
  process.exit(e.shipped ? 0 : 1);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(2); });
