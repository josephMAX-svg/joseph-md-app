// anki_telemetria.js — telemetría diaria del Anki del USMLE vía AnkiConnect (localhost:8765).
//
// Qué mide (deck pattern por defecto "deck:APEX::USMLE*"):
//   due hoy · backlog (vencidas de días anteriores) · nuevas disponibles · maduras · suspendidas ·
//   revisadas hoy (deck y total) · % Again de hoy · retención 30 d (1 − Again/revisiones, FSRS) ·
//   config del deck (nuevas/día · desired retention) · minutos recomendados del Anki de finde (due × seg).
//
// Salida:
//   1) APPEND idempotente por fecha a DATA/USMLE/_anki_telemetria.json ({_meta, entradas[]}).
//   2) Resumen en consola + one-liner para el KPI del Home:
//      localStorage 'jmd-anki-telemetria' (lo lee src/components/home/CockpitStatusBar.tsx vía homeBriefing.leerAnkiKpi).
//   3) Alarma G de Palmerton ("capar u omitir revisiones vencidas → avalancha"): backlog > 100 o retención < 85 %.
//
// Tolerante a Anki cerrado: si AnkiConnect no responde imprime "Anki cerrado" y sale con código 0 SIN escribir
// (con --registrar-cerrado deja una entrada {estado:'anki_cerrado'} para que el hueco quede visible).
//
// Uso:
//   node DATA/_scripts/anki_telemetria.js                       # deck APEX::USMLE*, 20 s/tarjeta
//   node DATA/_scripts/anki_telemetria.js --query "deck:AnKing*" # otro deck/patrón de búsqueda Anki
//   node DATA/_scripts/anki_telemetria.js --seg 18 --json        # seg por tarjeta · imprime la entrada en JSON
//   node DATA/_scripts/anki_telemetria.js --registrar-cerrado    # registra el día aunque Anki esté cerrado
//   node DATA/_scripts/anki_telemetria.js --out C:\ruta\copia.json  # copia del último registro (p. ej. para servirlo)
//
// Automatizar (decisión de Joseph, no se crea aquí): tarea programada de Windows a las 21:05 L-D con Anki abierto,
// o hook SessionEnd de Claude Code. Doctrina: DATA/SYNC_ANKI_OBSIDIAN_APP.md → "Telemetría".
// Requisitos: Anki abierto + add-on AnkiConnect (2055492159). Node ≥ 18 (fetch nativo). Sin dependencias.
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const OUT_JSON = path.join(ROOT, 'DATA/USMLE/_anki_telemetria.json');
const URL = process.env.ANKICONNECT_URL || 'http://127.0.0.1:8765';

// ─── args ───
const argv = process.argv.slice(2);
const arg = (k, def) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : def; };
const has = (k) => argv.includes(k);
const QUERY = arg('--query', 'deck:APEX::USMLE*');
const SEG = Number(arg('--seg', '20')) || 20;           // segundos por tarjeta (regla "Anki finde = due × 20 s")
const OUT_COPY = arg('--out', null);
const PRINT_JSON = has('--json');
const REGISTRAR_CERRADO = has('--registrar-cerrado');

// ─── fecha/hora Lima (determinista respecto al reloj local del PC) ───
const pad = (n) => String(n).padStart(2, '0');
const now = new Date();
const FECHA = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const HORA = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

// ─── AnkiConnect ───
async function anki(action, params = {}, timeoutMs = 20000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(URL, {
      method: 'POST', signal: ctrl.signal,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action, version: 6, params }),
    });
    const j = await r.json();
    if (j.error) throw new Error(`${action}: ${j.error}`);
    return j.result;
  } finally { clearTimeout(t); }
}
const count = async (q) => (await anki('findCards', { query: q })).length;

// ─── persistencia ───
function leerJson() {
  try {
    const j = JSON.parse(fs.readFileSync(OUT_JSON, 'utf8'));
    if (!Array.isArray(j.entradas)) j.entradas = [];
    return j;
  } catch {
    return {
      _meta: {
        descripcion: 'Telemetría diaria del Anki del USMLE (AnkiConnect) — append idempotente por fecha. Generado por DATA/_scripts/anki_telemetria.js. Lo consumen CockpitStatusBar (KPI Anki, vía localStorage jmd-anki-telemetria) y gen_revision_semanal.js (métrica 3).',
        query_default: 'deck:APEX::USMLE*',
        alarma_G: 'backlog > 100 o retencion30 < 0.85 → no añadir nuevas hasta backlog < 20; NUNCA capar revisiones',
        regla_finde: 'minFinde = due × segPorTarjeta ÷ 60 (dato, no reloj)',
      },
      entradas: [],
    };
  }
}
function guardar(entrada) {
  const j = leerJson();
  const i = j.entradas.findIndex((e) => e.fecha === entrada.fecha);
  if (i >= 0) j.entradas[i] = entrada; else j.entradas.push(entrada);
  j.entradas.sort((a, b) => (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0));
  j._meta.actualizado = `${FECHA} ${HORA}`;
  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(j, null, 1), 'utf8');
  if (OUT_COPY) { try { fs.writeFileSync(OUT_COPY, JSON.stringify(entrada), 'utf8'); } catch (e) { console.warn('WARN --out:', e.message); } }
  return j.entradas.length;
}
const oneLiner = (e) => `localStorage.setItem('jmd-anki-telemetria', ${JSON.stringify(JSON.stringify(e))});`;

// ─── retención 30 d (review-level si AnkiConnect lo permite; si no, aproximación card-level) ───
async function retencion30(q) {
  const desde = Date.now() - 30 * 86400000;
  try {
    const cards = await anki('findCards', { query: `${q} rated:30` });
    if (!cards.length) return { valor: null, metodo: 'sin revisiones en 30 d', revisiones: 0, again: 0 };
    let total = 0, again = 0;
    for (let i = 0; i < cards.length; i += 400) {
      const chunk = cards.slice(i, i + 400);
      const rev = await anki('getReviewsOfCards', { cards: chunk }, 60000);
      for (const cid of Object.keys(rev)) {
        for (const r of rev[cid] || []) {
          if (r.id < desde) continue;
          if (r.type !== 1) continue;            // 1 = review (excluye learn/relearn/cram)
          total++; if (r.ease === 1) again++;
        }
      }
    }
    if (!total) return { valor: null, metodo: 'sin revisiones tipo review en 30 d', revisiones: 0, again: 0 };
    return { valor: Number((1 - again / total).toFixed(3)), metodo: 'review-level (getReviewsOfCards, type=review)', revisiones: total, again };
  } catch (e) {
    // fallback: tarjetas con algún Again en 30 d / tarjetas revisadas en 30 d (aprox. card-level)
    try {
      const rev = await count(`${q} rated:30`);
      const ag = await count(`${q} rated:30:1`);
      if (!rev) return { valor: null, metodo: 'sin revisiones en 30 d', revisiones: 0, again: 0 };
      return { valor: Number((1 - ag / rev).toFixed(3)), metodo: `aprox card-level (rated:30 vs rated:30:1) · ${String(e.message).slice(0, 60)}`, revisiones: rev, again: ag };
    } catch (e2) {
      return { valor: null, metodo: 'no disponible: ' + String(e2.message).slice(0, 80), revisiones: 0, again: 0 };
    }
  }
}

// ─── config del deck (nuevas/día · desired retention FSRS) ───
async function configDeck(prefijo) {
  try {
    const names = await anki('deckNames');
    const decks = names.filter((n) => n === prefijo || n.startsWith(prefijo + '::'));
    if (!decks.length) return { decks: [], nuevasPorDia: null, desiredRetention: null, preset: null, nota: `ningún deck empieza por "${prefijo}"` };
    const cfg = await anki('getDeckConfig', { deck: decks[0] });
    const dr = cfg.desiredRetention ?? (cfg.fsrs && cfg.fsrs.desiredRetention) ?? null;
    return {
      decks, preset: cfg.name || null,
      nuevasPorDia: cfg.new && typeof cfg.new.perDay === 'number' ? cfg.new.perDay : null,
      desiredRetention: typeof dr === 'number' ? dr : null,
      fsrsParams: Array.isArray(cfg.fsrsParams5) ? cfg.fsrsParams5.length : Array.isArray(cfg.fsrsWeights) ? cfg.fsrsWeights.length : null,
      nota: dr == null ? 'desiredRetention no expuesto por esta versión de Anki/AnkiConnect → verificar FSRS en la UI (Preferencias → Repaso)' : null,
    };
  } catch (e) {
    return { decks: [], nuevasPorDia: null, desiredRetention: null, preset: null, nota: 'getDeckConfig falló: ' + String(e.message).slice(0, 80) };
  }
}

(async () => {
  let version;
  try { version = await anki('version', {}, 4000); }
  catch {
    console.log(`Anki cerrado (AnkiConnect no responde en ${URL}) · ${FECHA} ${HORA}`);
    if (REGISTRAR_CERRADO) {
      const n = guardar({ fecha: FECHA, hora: HORA, estado: 'anki_cerrado', query: QUERY });
      console.log(`registrado {estado:'anki_cerrado'} en _anki_telemetria.json (${n} entradas)`);
    } else {
      console.log('nada escrito (usa --registrar-cerrado para dejar constancia del hueco). Abre Anki y vuelve a correr.');
    }
    process.exit(0);
  }

  const prefijo = (QUERY.match(/deck:"?([^"*]+)/) || [])[1] || 'APEX::USMLE';
  const [total, maduras, due, backlog, nuevas, suspendidas, revisadasHoy, againHoy, revisadasHoyTotal, ret, cfg] = await Promise.all([
    count(QUERY),
    count(`${QUERY} prop:ivl>=21`),
    count(`${QUERY} is:due`),
    count(`${QUERY} is:due prop:due<0`),
    count(`${QUERY} is:new`),
    count(`${QUERY} is:suspended`),
    count(`${QUERY} rated:1`),
    count(`${QUERY} rated:1:1`),
    anki('getNumCardsReviewedToday'),
    retencion30(QUERY),
    configDeck(prefijo.replace(/::$/, '')),
  ]);

  const againHoyPct = revisadasHoy ? Number(((againHoy / revisadasHoy) * 100).toFixed(1)) : null;
  const minFinde = Math.round((due * SEG) / 60);
  const alarma = backlog > 100 || (ret.valor != null && ret.valor < 0.85);
  const avisos = [];
  if (alarma) avisos.push(`ALARMA G: backlog ${backlog} (>100) o retención ${ret.valor} (<0.85) → NO añadir nuevas hasta backlog < 20; nunca capar revisiones`);
  if (cfg.nuevasPorDia != null && cfg.nuevasPorDia !== 10) avisos.push(`config: nuevas/día = ${cfg.nuevasPorDia} (esperado 10) → corregir en Anki (preset "${cfg.preset}")`);
  if (cfg.desiredRetention != null && Math.abs(cfg.desiredRetention - 0.9) > 0.001) avisos.push(`config: desired retention = ${cfg.desiredRetention} (esperado 0.90) → corregir en Anki`);
  if (cfg.nota) avisos.push('config: ' + cfg.nota);
  if (total === 0) avisos.push(`el patrón "${QUERY}" no devuelve tarjetas: ¿deck aún no creado (lazy) o nombre distinto? (deckNames: ${cfg.decks.join(', ') || 'ninguno con ese prefijo'})`);

  const entrada = {
    fecha: FECHA, hora: HORA, estado: 'ok', ankiConnect: version, query: QUERY, decks: cfg.decks,
    total, maduras, due, backlog, nuevas, suspendidas,
    revisadasHoy, revisadasHoyTotal, againHoy, againHoyPct,
    retencion30: ret.valor, retencionMetodo: ret.metodo, revisiones30: ret.revisiones, again30: ret.again,
    segPorTarjeta: SEG, minFinde, alarma,
    config: { preset: cfg.preset, nuevasPorDia: cfg.nuevasPorDia, desiredRetention: cfg.desiredRetention, fsrsParams: cfg.fsrsParams ?? null },
    avisos,
  };
  const n = guardar(entrada);

  console.log(`ANKI ${FECHA} ${HORA} · ${QUERY} (${cfg.decks.length} decks)`);
  console.log(`  total ${total} · maduras ${maduras} · nuevas disp. ${nuevas} · suspendidas ${suspendidas}`);
  console.log(`  DUE hoy ${due} · BACKLOG (vencidas) ${backlog} · revisadas hoy ${revisadasHoy} (total colección ${revisadasHoyTotal}) · Again hoy ${againHoy}${againHoyPct != null ? ` (${againHoyPct}%)` : ''}`);
  console.log(`  retención 30 d: ${ret.valor != null ? Math.round(ret.valor * 100) + '%' : '—'} (${ret.metodo}; ${ret.revisiones} revisiones, ${ret.again} again)`);
  console.log(`  config deck: preset "${cfg.preset}" · nuevas/día ${cfg.nuevasPorDia ?? '?'} · desired retention ${cfg.desiredRetention ?? '?'}`);
  console.log(`  Anki de finde recomendado = due × ${SEG} s = ${minFinde} min${alarma ? '   ⚠ ALARMA G (avalancha)' : ''}`);
  for (const a of avisos) console.log('  ⚠ ' + a);
  console.log(`  → _anki_telemetria.json (${n} entradas). KPI Home: pega en la consola del navegador:\n  ${oneLiner(entrada)}`);
  if (PRINT_JSON) console.log(JSON.stringify(entrada, null, 1));
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
