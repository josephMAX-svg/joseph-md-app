/**
 * gen_encaps_semana.js — cierre de sesión (1 línea) + cierre SEMANAL ENCAPS (viernes 17:00) + perfil generado.
 *
 * La métrica que manda es el % CIEGO REAL = correctas SEGURAS / total (README_SISTEMA_TRACKING.md).
 * Este script es el único punto de entrada de datos del régimen MANTENIMIENTO 2027-I:
 *
 *  1) CIERRE DE SESIÓN (1 línea, 17:10-17:15 lun-jue · 16:45-17:15 vie):
 *     node DATA/_scripts/gen_encaps_semana.js --cerrar "ENCAPS|banco_dia|2026-09-14|II-3|n=22|seg=15|dud=3|CONCEPTO:1,OLVIDO:2,CCSN:1|t=68|sub=esquema_intervalos"
 *        formato: EXAMEN|tipoRonda|fecha|codigo|n=NN|seg=NN|dud=NN|<fallos SUBTIPO:k,…>|t=SS[|sub=…][|tema=…][|delta=±x][|nota=NN]
 *        EXAMEN = ENCAPS | USMLE | MIR | DERMA · tipoRonda = banco_dia | eval_anclada | mini_sim | pretest | simulacro | repaso | warmup
 *        subtipos: knowledge CONCEPTO OLVIDO CRONOLOGIA · transfer CCSN CONTEXTO · proceso CAMBIO TIEMPO LECTURA
 *     → apenda la ronda v3 a DATA/ENCAPS/TRACKING_ERRORES/_registro_resoluciones.json (append-only)
 *     → recalcula resumen_por_subtema y regenera PERFIL_CONOCIMIENTO.md
 *     → con --sql, además emite DATA/_scripts/_encaps_progress_upsert.sql (INSERT en study_progress; aplicar por MCP execute_sql)
 *     (las rondas con preguntas[] —export del runner gen_encaps_minisim.js— se apendan con `gen_encaps_minisim.js --registrar <export> --append`)
 *
 *  2) CIERRE SEMANAL (viernes):
 *     node DATA/_scripts/gen_encaps_semana.js [--semana 2026-09-14] [--sql] [--d1 2026-09-21]
 *     → % ciego semanal por área/código vs vector v3, tabla de brecha, temas calientes (últimas 2 semanas),
 *       alerta de mini-sims (<15/25 dos viernes) y PROPUESTA DE OVERRIDE del CICLO para la semana siguiente:
 *       DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/override_<lunes siguiente>.json
 *       + merge en SEMANAS/overrides_acumulado.json (TODAS las semanas: el generador de mantenimiento lo lee por defecto,
 *         así aplicar la semana N nunca borra los overrides de las semanas 1..N-1)
 *       → aplicar con: node DATA/_scripts/gen_encaps_mantenimiento_2027.js <D1> --override <ese json>  → execute_sql
 *     → informe legible en DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/semana_<lunes>.md (y por stdout)
 *
 *  3) PERFIL: node DATA/_scripts/gen_encaps_semana.js --perfil
 *     → regenera DATA/ENCAPS/TRACKING_ERRORES/PERFIL_CONOCIMIENTO.md desde resumen_por_subtema + rondas (GENERADO, no editar a mano).
 *       También se regenera solo tras cada --cerrar y en cada cierre semanal.
 *
 *  RONDAS MIXTAS (codigo = MIX: pretest de arranque, mini-sim, simulacro) con preguntas[] por ítem: se EXPLOTAN por el
 *  código de cada pregunta para el resumen por código, el % por área y los temas calientes (así el pre-test de arranque
 *  de 40Q da n = 5 por crítico y el override de la semana del 21-sep ya se calcula con n ≥ 5 en los 8 críticos).
 *  La nota /25 del mini-sim y el % ciego semanal se calculan sobre la ronda entera (no se cuenta dos veces).
 *
 * Sin dependencias externas. No toca Supabase directamente (regla: la app y el MCP escriben Supabase, no los scripts).
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const { VECTOR_V3, CRITICOS_V3, REBOTE_V3, CICLO, COLA_LARGA, RECETA_MINISIM, fechas, lunesDe, areaDe } = require('./_encaps_ciclo_v3');

const TR = path.join(ROOT, 'DATA', 'ENCAPS', 'TRACKING_ERRORES');
const REG = path.join(TR, '_registro_resoluciones.json');
const SEMANAS_DIR = path.join(TR, 'SEMANAS');
const ACUMULADO = path.join(SEMANAS_DIR, 'overrides_acumulado.json');
const PERFIL = path.join(TR, 'PERFIL_CONOCIMIENTO.md');
const SQL_OUT = path.join(__dirname, '_encaps_progress_upsert.sql');

const META_PCT = 85, CRUCERO_PCT = 75, N_MIN = 5; // N_MIN: mínimo de preguntas por código para que cuente en calientes/override
const SUBTIPOS = {
  knowledge: ['CONCEPTO', 'OLVIDO', 'CRONOLOGIA'],
  transfer: ['CCSN', 'CONTEXTO'],
  proceso: ['CAMBIO', 'TIEMPO', 'LECTURA'],
};
const TIPO_DE = {}; for (const [t, arr] of Object.entries(SUBTIPOS)) for (const s of arr) TIPO_DE[s] = t;
const EXAMENES = ['ENCAPS', 'USMLE', 'MIR', 'DERMA'];
const TIPOS_RONDA = ['banco_dia', 'eval_anclada', 'mini_sim', 'pretest', 'simulacro', 'repaso', 'warmup'];
// código del pool/registro (taxonomía v3 del banco) → código del CICLO sembrado (columna codigo de study_schedule)
const CICLO_CODE = { 'IV-1+IV-2': 'IV-1', 'IV-2': 'IV-1', 'IV-6+IV-7': 'IV-6', 'IV-7': 'IV-6', 'V-MED': 'V-7', 'V-7+V-10': 'V-7', 'V-10': 'V-7' };
const cicloCodeDe = (c) => CICLO_CODE[c] || c;
const esCritico = (c) => CRITICOS_V3.includes(c) || c === 'IV-1' || c === 'IV-2';

// ── argumentos ──
const argv = process.argv.slice(2);
const opt = (k, def) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] != null ? argv[i + 1] : def; };
const has = (k) => argv.includes(k);
const D1 = opt('--d1', '2026-09-21');
const hoyISO = () => new Date(Date.now() - 5 * 3600 * 1000).toISOString().slice(0, 10); // Lima
const addDays = (iso, n) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

// ── registro ──
function loadReg() { return JSON.parse(fs.readFileSync(REG, 'utf8')); }
function saveReg(j) { fs.writeFileSync(REG, JSON.stringify(j, null, 1) + '\n', 'utf8'); }
const pct = (a, b) => (b ? Math.round((a / b) * 1000) / 10 : 0);
const emptyFallos = () => ({ knowledge: { CONCEPTO: 0, OLVIDO: 0, CRONOLOGIA: 0 }, transfer: { CCSN: 0, CONTEXTO: 0 }, proceso: { CAMBIO: 0, TIEMPO: 0, LECTURA: 0 } });
const sumFallos = (f) => Object.values(f || {}).reduce((n, g) => n + Object.values(g || {}).reduce((m, v) => m + (Number(v) || 0), 0), 0);
const addFallos = (acc, f) => { for (const [t, g] of Object.entries(f || {})) for (const [s, v] of Object.entries(g || {})) if (acc[t] && acc[t][s] != null) acc[t][s] += Number(v) || 0; return acc; };
const esSegura = (q) => q.confianza === 'segura' || q.eval === 'conocimiento';
const esSuerte = (q) => q.acierto_por_suerte === true || q.eval === 'suerte' || q.confianza === 'adivinada' || q.confianza === 'dudosa';
const subtipoDe = (q) => { const e = String(q.error || '').toUpperCase().replace('Í', 'I'); return TIPO_DE[e] ? e : 'CONCEPTO'; };

// Normaliza CUALQUIER ronda (v1 jul-2026 warmup, v2 jul-2026 set, v3) al esquema v3 mínimo.
function normaliza(r) {
  if (r.examen && r.n != null && r.correctas_seguras != null) {
    return { ...r, fallos_por_tipo: r.fallos_por_tipo || emptyFallos(), pct_ciego: r.pct_ciego ?? pct(r.correctas_seguras, r.n) };
  }
  const preguntas = Array.isArray(r.preguntas) ? r.preguntas : [];
  const n = r.total || r.n || preguntas.length || 0;
  let seg = 0, dud = 0; const fallos = emptyFallos();
  for (const q of preguntas) {
    if (q.ok) { if (esSegura(q) && !esSuerte(q)) seg++; else dud++; }
    else { const e = subtipoDe(q); fallos[TIPO_DE[e]][e]++; }
  }
  if (!preguntas.length && r.correctas != null) { seg = (r.correctas || 0) - (r.adivinadas || 0); dud = r.adivinadas || 0; }
  const codigo = r.codigo || r.subtema || '?';
  return {
    examen: r.examen || 'ENCAPS', tipoRonda: r.tipoRonda || r.bloque || 'warmup', fecha: r.fecha, codigo,
    tema: r.tema || r.set || r.id || '', n, correctas_seguras: seg, correctas_dudosas: dud,
    fallos_por_tipo: fallos, tiempo_medio_seg: r.tiempo_medio_seg ?? null, pct_ciego: pct(seg, n), _legacy: true, preguntas,
  };
}
// Una ronda MIXTA (codigo MIX / pretest / mini_sim / simulacro) con preguntas[] etiquetadas por código se parte en
// una ronda-fragmento por código (para resumen_por_subtema, % por área y temas calientes). El resto pasa entero.
function explota(raw) {
  const r = normaliza(raw);
  const qs = Array.isArray(raw.preguntas) ? raw.preguntas : [];
  const mixta = r.codigo === 'MIX' || ['pretest', 'mini_sim', 'simulacro'].includes(r.tipoRonda);
  if (!mixta || !qs.length || !qs.every((q) => q.codigo)) return [r];
  const por = {};
  for (const q of qs) {
    const c = q.codigo;
    const f = (por[c] ||= { n: 0, seg: 0, dud: 0, fallos: emptyFallos(), t: 0, tn: 0 });
    f.n++;
    if (q.ok) { if (esSegura(q) && !esSuerte(q)) f.seg++; else f.dud++; }
    else { const e = subtipoDe(q); f.fallos[TIPO_DE[e]][e]++; }
    if (typeof q.seg === 'number') { f.t += q.seg; f.tn++; }
  }
  return Object.entries(por).map(([codigo, f]) => ({
    examen: r.examen, tipoRonda: r.tipoRonda, fecha: r.fecha, codigo, tema: r.tema, n: f.n, correctas_seguras: f.seg, correctas_dudosas: f.dud,
    fallos_por_tipo: f.fallos, tiempo_medio_seg: f.tn ? Math.round(f.t / f.tn) : r.tiempo_medio_seg ?? null, pct_ciego: pct(f.seg, f.n),
    _fragmento_de: raw.id || `${r.tipoRonda}_${r.fecha}`, _legacy: !!r._legacy,
  }));
}

// ── 1) cierre de 1 línea ──
function parseLinea(linea) {
  const tk = linea.split('|').map((s) => s.trim()).filter(Boolean);
  if (tk.length < 4) throw new Error('línea incompleta: EXAMEN|tipoRonda|fecha|codigo|n=..|seg=..|dud=..|fallos|t=..');
  const [examen, tipoRonda, fecha, codigo] = tk;
  if (!EXAMENES.includes(examen)) throw new Error('examen inválido ' + examen + ' (' + EXAMENES.join('|') + ')');
  if (!TIPOS_RONDA.includes(tipoRonda)) throw new Error('tipoRonda inválido ' + tipoRonda + ' (' + TIPOS_RONDA.join('|') + ')');
  if (!/^20\d\d-\d\d-\d\d$/.test(fecha)) throw new Error('fecha inválida ' + fecha);
  const ronda = { examen, tipoRonda, fecha, codigo, tema: '', n: 0, correctas_seguras: 0, correctas_dudosas: 0, fallos_por_tipo: emptyFallos(), delta_es: null, tiempo_medio_seg: null };
  for (const t of tk.slice(4)) {
    const m = t.match(/^([a-z_]+)=(.*)$/i);
    if (m) {
      const k = m[1].toLowerCase(), v = m[2];
      if (k === 'n') ronda.n = +v; else if (k === 'seg') ronda.correctas_seguras = +v; else if (k === 'dud') ronda.correctas_dudosas = +v;
      else if (k === 't') ronda.tiempo_medio_seg = +v; else if (k === 'sub') ronda.sub_eje = v; else if (k === 'tema') ronda.tema = v;
      else if (k === 'delta') ronda.delta_es = +v; else if (k === 'nota') ronda.nota = +v; else ronda[k] = v;
    } else if (t.includes(':')) {
      for (const par of t.split(',')) {
        const [s, c] = par.split(':').map((x) => x.trim());
        const S = s.toUpperCase().replace('Í', 'I');
        const tipo = TIPO_DE[S];
        if (!tipo) throw new Error('subtipo de fallo desconocido: ' + s + ' (válidos: ' + Object.keys(TIPO_DE).join(' ') + ')');
        ronda.fallos_por_tipo[tipo][S] += +c || 0;
      }
    } else throw new Error('token no reconocido: ' + t);
  }
  if (!ronda.n) throw new Error('falta n=');
  const fallos = sumFallos(ronda.fallos_por_tipo);
  const esperado = ronda.n - ronda.correctas_seguras - ronda.correctas_dudosas;
  if (esperado < 0) throw new Error('seg+dud > n');
  if (fallos !== esperado) console.warn(`⚠ fallos clasificados ${fallos} ≠ n−seg−dud = ${esperado} (se guarda igual; corrige la línea si es error)`);
  ronda.pct_ciego = pct(ronda.correctas_seguras, ronda.n);
  if (ronda.tipoRonda === 'mini_sim' && ronda.nota == null) ronda.nota = ronda.correctas_seguras + ronda.correctas_dudosas; // /25 bruto
  if (ronda.tipoRonda === 'pretest' && ronda.codigo === 'MIX') console.warn('⚠ pretest cerrado en 1 línea con codigo=MIX: sin preguntas[] no puede repartirse por código. Mejor: gen_encaps_minisim.js --registrar <export.json> --append');
  return ronda;
}
function recalculaResumen(j) {
  const acc = {};
  for (const raw of j.rondas) {
    for (const r of explota(raw)) {
      if (r.examen !== 'ENCAPS') continue;
      const a = (acc[r.codigo] ||= { resueltas: 0, seguras: 0, dudosas: 0, fallos: 0, fallos_por_tipo: emptyFallos(), ultima: '', rondas: 0, tipos: {} });
      a.resueltas += r.n; a.seguras += r.correctas_seguras; a.dudosas += r.correctas_dudosas; a.fallos += r.n - r.correctas_seguras - r.correctas_dudosas;
      addFallos(a.fallos_por_tipo, r.fallos_por_tipo);
      a.rondas++; a.tipos[r.tipoRonda] = (a.tipos[r.tipoRonda] || 0) + 1; if (r.fecha > a.ultima) a.ultima = r.fecha;
    }
  }
  const out = {};
  for (const [c, a] of Object.entries(acc)) {
    const p = pct(a.seguras, a.resueltas);
    out[c] = { ...a, pct_ciego: p, estado: p >= META_PCT ? 'DOMINADO' : p >= CRUCERO_PCT ? 'crucero' : esCritico(c) ? 'CRITICO-debil' : 'debil', nota: (j.resumen_por_subtema || {})[c]?.nota || '' };
  }
  j.resumen_por_subtema = out;
}
function sqlProgress(rondas) {
  const esc = (s) => String(s).replace(/'/g, "''");
  const lines = rondas.map((r) => {
    const err = JSON.stringify({ tipoRonda: r.tipoRonda, fallos: r.fallos_por_tipo, seguras: r.correctas_seguras, dudosas: r.correctas_dudosas, sub_eje: r.sub_eje || null, nota: r.nota ?? null });
    const t = r.tiempo_medio_seg != null ? `make_interval(secs => ${Number(r.tiempo_medio_seg)})` : 'NULL';
    const fuente = `gen_encaps_semana:${r.tipoRonda}`;
    return `INSERT INTO study_progress (id, fecha, especialidad, examen, porcentaje, fuente, preguntas_resueltas, errores_por_tipo, tiempo_promedio_pregunta, created_at)
SELECT gen_random_uuid(), '${r.fecha}', '${esc(r.codigo)}', '${esc(r.examen)}', ${r.pct_ciego}, '${esc(fuente)}', ${r.n}, '${esc(err)}'::jsonb, ${t}, now()
WHERE NOT EXISTS (SELECT 1 FROM study_progress WHERE examen='${esc(r.examen)}' AND fecha='${r.fecha}' AND especialidad='${esc(r.codigo)}' AND fuente='${esc(fuente)}');`;
  });
  return `-- study_progress · cierres de sesión generados por gen_encaps_semana.js (${new Date().toISOString().slice(0, 10)}) · porcentaje = % CIEGO REAL\n${lines.join('\n')}\n`;
}

// ── 3) PERFIL_CONOCIMIENTO.md generado desde resumen_por_subtema + rondas ──
function generarPerfil(j) {
  const res = j.resumen_por_subtema || {};
  const enc = j.rondas.map(normaliza).filter((r) => r.examen === 'ENCAPS' && r.fecha);
  const frag = j.rondas.flatMap(explota).filter((r) => r.examen === 'ENCAPS' && r.fecha);
  const totN = enc.reduce((a, r) => a + r.n, 0), totSeg = enc.reduce((a, r) => a + r.correctas_seguras, 0);
  const ultima = enc.map((r) => r.fecha).sort().slice(-1)[0] || '—';
  const rol = (c) => (esCritico(c) ? 'CRÍTICO ★' : REBOTE_V3.includes(c) ? 'rebote ↩' : COLA_LARGA.some((x) => x.codigo === c) ? 'cola larga' : CICLO.some((x) => x[0] === cicloCodeDe(c)) ? 'ciclo' : '—');
  const emoji = (e) => (e === 'DOMINADO' ? '🟢' : e === 'crucero' ? '🟡' : '🔴');
  const fmtF = (f) => { const k = Object.values(f.knowledge).reduce((a, b) => a + b, 0), t = Object.values(f.transfer).reduce((a, b) => a + b, 0), p = Object.values(f.proceso).reduce((a, b) => a + b, 0); return `${k} / ${t} / ${p}`; };
  const L = [];
  L.push(`# 👤 PERFIL DE CONOCIMIENTO — Joseph (ENCAPS 2027-I) · GENERADO ${hoyISO()}`);
  L.push('');
  L.push(`> **GENERADO por \`DATA/_scripts/gen_encaps_semana.js --perfil\` desde \`_registro_resoluciones.json\` (resumen_por_subtema + rondas). NO editar a mano:** se reescribe tras cada \`--cerrar\`, cada cierre semanal y cada \`--perfil\`. Base de datos SOBRE JOSEPH (separada de la doctrina de métodos: \`../CONOCIMIENTO/METODO_PALMERTON_Y_MEMORIA.md\`). Métrica que manda: **% CIEGO REAL = correctas SEGURAS / total** (dudosas y adivinadas NO cuentan). Metas: ≥${META_PCT} % (≈17/20) · crucero ≥${CRUCERO_PCT} % · mini-sim ≥${RECETA_MINISIM.umbral_25}/25.`);
  L.push('');
  L.push('## Estado global');
  L.push(`- Rondas ENCAPS registradas: **${enc.length}** (${Object.entries(enc.reduce((a, r) => ((a[r.tipoRonda] = (a[r.tipoRonda] || 0) + 1), a), {})).map(([k, v]) => `${k} ${v}`).join(' · ') || '—'}) · última: ${ultima}.`);
  L.push(`- Preguntas resueltas: **${totN}** · seguras ${totSeg} · **% ciego global ${pct(totSeg, totN)} %**.`);
  L.push(`- Códigos con medición ciega: **${Object.keys(res).length}** de ${CICLO.length} del ciclo + ${COLA_LARGA.length} de cola larga · críticos v3 medidos: ${CRITICOS_V3.filter((c) => res[c] || res[cicloCodeDe(c)]).length}/8 · con n ≥ ${N_MIN} (cuentan para el override): ${Object.entries(res).filter(([, v]) => v.resueltas >= N_MIN).length}.`);
  L.push(`- Regla del override semanal (gen_encaps_semana.js): un código solo entra en «calientes» con **n ≥ ${N_MIN}**. El **pre-test de arranque** (lun 21 y mar 22-sep-2026 = D1 + D2, 5Q × 8 críticos, ítems reales 2024-2A→2025-2) es la línea base ciega por crítico: el **primer override calculado con n ≥ ${N_MIN} en los 8 críticos es el de la semana del 21-sep-2026** (cierre semanal del vie 18-sep).`);
  L.push('');
  L.push('## Mapa de dominio por código (resumen_por_subtema)');
  L.push('| Código | Rol v3 | Rondas | Q | Seguras | Dudosas | Fallos | % ciego | Estado | k / t / p | Última | Nota |');
  L.push('|---|---|---|---|---|---|---|---|---|---|---|---|');
  const orden = Object.entries(res).sort((a, b) => (esCritico(b[0]) - esCritico(a[0])) || (a[1].pct_ciego ?? a[1].pct ?? 0) - (b[1].pct_ciego ?? b[1].pct ?? 0));
  for (const [c, v] of orden) {
    const p = v.pct_ciego ?? v.pct ?? 0;
    const est = v.estado || '';
    L.push(`| ${c} | ${rol(c)} | ${v.rondas ?? '—'} | ${v.resueltas ?? '—'} | ${v.seguras ?? v.aciertos ?? '—'} | ${v.dudosas ?? '—'} | ${v.fallos ?? '—'} | **${p} %** | ${emoji(est)} ${est} | ${v.fallos_por_tipo ? fmtF(v.fallos_por_tipo) : '—'} | ${v.ultima || '—'} | ${v.nota || ''} |`);
  }
  if (!orden.length) L.push('| — | — | — | — | — | — | — | — | sin rondas | — | — | — |');
  L.push('');
  L.push('k / t / p = fallos knowledge / transfer / proceso. Estado: 🟢 DOMINADO ≥85 · 🟡 crucero ≥75 · 🔴 débil (CRITICO-debil si es crítico v3).');
  L.push('');
  // línea base del pre-test de arranque
  const pre = frag.filter((r) => r.tipoRonda === 'pretest' && !/2026-II|2026-2\b/.test(r.tema || ''));
  L.push('## Línea base ciega por crítico (pre-test de arranque, ronda `pretest`)');
  if (pre.length) {
    L.push('| Código | Q | Seguras | Dudosas | Fallos | % ciego | k / t / p | Fecha |');
    L.push('|---|---|---|---|---|---|---|---|');
    for (const r of pre.sort((a, b) => (esCritico(b.codigo) - esCritico(a.codigo)) || a.pct_ciego - b.pct_ciego)) L.push(`| ${r.codigo}${esCritico(r.codigo) ? ' ★' : ''} | ${r.n} | ${r.correctas_seguras} | ${r.correctas_dudosas} | ${r.n - r.correctas_seguras - r.correctas_dudosas} | **${r.pct_ciego} %** | ${fmtF(r.fallos_por_tipo)} | ${r.fecha} |`);
  } else {
    L.push('- Pendiente: resolver `BANCO_PROPIO/pretest_arranque_2026-09-21.html` (lun 21-sep = D1, parte 1: II-3 · I-3 · V-2 · III-5) y `pretest_arranque_2026-09-22.html` (mar 22-sep = D2, parte 2: II-5 · I-4 · IV-1+IV-2 · II-4), exportar el JSON y apendar con `node DATA/_scripts/gen_encaps_minisim.js --registrar <export.json> --append`. Esta tabla se llena sola.');
  }
  L.push('');
  // mapa por sub-ángulo desde preguntas[]
  const subs = {};
  for (const raw of j.rondas) {
    const r = normaliza(raw); if (r.examen !== 'ENCAPS') continue;
    for (const q of r.preguntas || []) {
      const c = q.codigo || r.codigo; const s = q.sub_eje || q.subangulo || q.tema || '—';
      const k = `${c} · ${s}`; const o = (subs[k] ||= { codigo: c, sub: s, n: 0, ok: 0, seg: 0, errores: {}, ultima: '' });
      o.n++; if (q.ok) { o.ok++; if (esSegura(q) && !esSuerte(q)) o.seg++; } else { const e = subtipoDe(q); o.errores[e] = (o.errores[e] || 0) + 1; }
      if (r.fecha > o.ultima) o.ultima = r.fecha;
    }
  }
  L.push('## Mapa por sub-ángulo (solo rondas guardadas ítem a ítem: RONDAS/ y exports del runner)');
  const subsArr = Object.values(subs).sort((a, b) => pct(a.seg, a.n) - pct(b.seg, b.n) || b.n - a.n);
  if (subsArr.length) {
    L.push('| Código | Sub-ángulo | Q | ok | seguras | % ciego | Errores | Última |');
    L.push('|---|---|---|---|---|---|---|---|');
    for (const o of subsArr) { const p = pct(o.seg, o.n); L.push(`| ${o.codigo} | ${o.sub} | ${o.n} | ${o.ok} | ${o.seg} | ${p >= META_PCT ? '🟢' : p >= CRUCERO_PCT ? '🟡' : '🔴'} ${p} % | ${Object.entries(o.errores).map(([k, v]) => `${k} ${v}`).join(', ') || '—'} | ${o.ultima} |`); }
  } else L.push('- sin rondas con detalle por pregunta.');
  L.push('');
  // patrón de error dominante
  const tot = emptyFallos(); for (const r of enc) addFallos(tot, r.fallos_por_tipo);
  const flat = Object.entries(tot).flatMap(([t, g]) => Object.entries(g).map(([s, v]) => ({ t, s, v }))).filter((x) => x.v).sort((a, b) => b.v - a.v);
  const nF = flat.reduce((a, x) => a + x.v, 0);
  L.push('## Patrón de error dominante (todas las rondas ENCAPS)');
  if (nF) {
    L.push(`- **${flat[0].s} (${flat[0].t}) = ${flat[0].v}/${nF} fallos** · distribución: ${flat.map((x) => `${x.s} ${x.v}`).join(' · ')}.`);
    const kn = Object.values(tot.knowledge).reduce((a, b) => a + b, 0), tr = Object.values(tot.transfer).reduce((a, b) => a + b, 0), pr = Object.values(tot.proceso).reduce((a, b) => a + b, 0);
    L.push(`- knowledge ${kn} · transfer ${tr} · proceso ${pr}. Cura por tipo (README_SISTEMA_TRACKING.md): CONCEPTO/CCSN → nota Obsidian + tabla comparativa · OLVIDO/CRONOLOGIA → tarjeta Anki (ANKI_COLA/ENCAPS_Cifras_2027-I.csv) esa misma tarde · proceso → regla de examen, sin tarjeta.`);
  } else L.push('- sin fallos clasificados todavía.');
  L.push('');
  L.push('## Registro por ronda');
  L.push('| Fecha | Tipo | Código | Tema | n | seg | dud | % ciego | nota |');
  L.push('|---|---|---|---|---|---|---|---|---|');
  for (const r of enc.slice().sort((a, b) => (a.fecha < b.fecha ? -1 : 1))) L.push(`| ${r.fecha} | ${r.tipoRonda} | ${r.codigo} | ${String(r.tema || '').slice(0, 60)} | ${r.n} | ${r.correctas_seguras} | ${r.correctas_dudosas} | ${r.pct_ciego} % | ${r.nota != null ? r.nota : ''} |`);
  L.push('');
  L.push('## Histórico (jul-2026, antes del régimen de mantenimiento)');
  L.push('- 02-jul-2026 · I-3 pre-test ciego set A: **4/20 (20 %)**, por debajo del azar → modelos invertidos (activa↔pasiva, letalidad↔mortalidad, EESS/DIRESA, VPP/oportunidad); patrón CCSN 7/16. 28-jul-2026 · I-3 SET2: 16/20 bruto. Ambas rondas están en `rondas[]` (esquema v1/v2, normalizadas por el script) y en `RONDAS/`.');
  L.push('- Desde el 14-sep-2026 el estado por código vive en `resumen_por_subtema` (este fichero) y la serie semanal en `SEMANAS/`.');
  fs.writeFileSync(PERFIL, L.join('\n') + '\n', 'utf8');
  return PERFIL;
}

if (has('--perfil')) {
  const j = loadReg();
  recalculaResumen(j);
  saveReg(j);
  console.log('perfil →', generarPerfil(j));
  process.exit(0);
}

if (has('--cerrar')) {
  const linea = opt('--cerrar', '');
  const ronda = parseLinea(linea);
  const j = loadReg();
  j.rondas.push(ronda);
  if (!j._meta) j._meta = {};
  j._meta.actualizado = hoyISO();
  recalculaResumen(j);
  saveReg(j);
  console.log(`OK ronda #${j.rondas.length} apendada: ${ronda.examen} ${ronda.tipoRonda} ${ronda.fecha} ${ronda.codigo} · n=${ronda.n} seg=${ronda.correctas_seguras} dud=${ronda.correctas_dudosas} · % ciego ${ronda.pct_ciego}%${ronda.nota != null ? ` · nota ${ronda.nota}/25` : ''}`);
  console.log('perfil →', generarPerfil(j));
  if (has('--sql')) { fs.writeFileSync(SQL_OUT, sqlProgress([ronda]), 'utf8'); console.log('SQL →', SQL_OUT, '(aplicar por MCP execute_sql, proyecto qacynpqdrorpuegsmtcy)'); }
  process.exit(0);
}

// ── 2) cierre semanal ──
const semana = opt('--semana', lunesDe(hoyISO()));
if (!/^20\d\d-\d\d-\d\d$/.test(semana)) throw new Error('--semana inválida');
const lunes = lunesDe(semana), domingo = addDays(lunes, 6), lunesSig = addDays(lunes, 7), lunesPrev = addDays(lunes, -7);
const j = loadReg();
recalculaResumen(j);
const todas = j.rondas.map(normaliza).filter((r) => r.examen === 'ENCAPS' && r.fecha);          // rondas enteras (nota /25, % semanal)
const fragmentos = j.rondas.flatMap(explota).filter((r) => r.examen === 'ENCAPS' && r.fecha);   // por código (MIX explotado)
const enRango = (r, a, b) => r.fecha >= a && r.fecha <= b;
const sem = todas.filter((r) => enRango(r, lunes, domingo));
const semF = fragmentos.filter((r) => enRango(r, lunes, domingo));
const dosSemF = fragmentos.filter((r) => enRango(r, lunesPrev, domingo));

function agrega(rondas) {
  const porCodigo = {}, porArea = {};
  for (const r of rondas) {
    const c = (porCodigo[r.codigo] ||= { n: 0, seg: 0, dud: 0, fallos: emptyFallos(), rondas: 0, evalFallos: 0, tipos: new Set() });
    c.n += r.n; c.seg += r.correctas_seguras; c.dud += r.correctas_dudosas; c.rondas++; c.tipos.add(r.tipoRonda);
    addFallos(c.fallos, r.fallos_por_tipo);
    if (r.tipoRonda === 'eval_anclada') c.evalFallos += r.n - r.correctas_seguras - r.correctas_dudosas;
    // por área: solo códigos con área v3 (una ronda MIX sin preguntas[] no puede atribuirse a un área)
    const ar = areaDe(r.codigo);
    if (!VECTOR_V3[ar]) continue;
    const a = (porArea[ar] ||= { n: 0, seg: 0, dud: 0 });
    a.n += r.n; a.seg += r.correctas_seguras; a.dud += r.correctas_dudosas;
  }
  for (const c of Object.values(porCodigo)) { c.pct = pct(c.seg, c.n); c.fallosTot = sumFallos(c.fallos); c.tipos = [...c.tipos]; }
  for (const a of Object.values(porArea)) a.pct = pct(a.seg, a.n);
  return { porCodigo, porArea };
}
const S = agrega(semF), S2 = agrega(dosSemF);
const totalSem = sem.reduce((n, r) => n + r.n, 0), segSem = sem.reduce((n, r) => n + r.correctas_seguras, 0);
const pctSem = pct(segSem, totalSem);

// mini-sims (nota /25) — últimos 2 viernes del registro (ronda entera, nunca los fragmentos)
const minis = todas.filter((r) => r.tipoRonda === 'mini_sim').sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
const notasMini = minis.map((r) => r.nota ?? r.correctas_seguras + r.correctas_dudosas);
const alertaMini = notasMini.length >= 2 && notasMini.slice(-2).every((x) => x < RECETA_MINISIM.alerta_25);

// temas calientes (últimas 2 semanas): % ciego < 75 con n ≥ 5 · eval anclada con ≥2 fallos · ≥3 fallos knowledge
// (los códigos sin área v3 — MIX sin detalle por pregunta — no son "tema": se excluyen; su señal es la nota /25)
const calientes = Object.entries(S2.porCodigo).filter(([codigo]) => !!VECTOR_V3[areaDe(codigo)]).map(([codigo, c]) => {
  const area = areaDe(codigo);
  const peso = VECTOR_V3[area].pct;
  const esCrit = esCritico(codigo);
  const kn = Object.values(c.fallos.knowledge).reduce((a, b) => a + b, 0);
  const motivos = [];
  if (c.n >= N_MIN && c.pct < CRUCERO_PCT) motivos.push(`% ciego ${c.pct}% < ${CRUCERO_PCT}%`);
  if (c.evalFallos >= 2) motivos.push(`eval anclada ${c.evalFallos} fallos`);
  if (kn >= 3) motivos.push(`${kn} fallos knowledge`);
  const score = Math.round(peso * Math.max(0, META_PCT - c.pct) * (esCrit ? 1.5 : 1) * (REBOTE_V3.includes(codigo) ? 1.2 : 1));
  return { codigo, area, peso, pct: c.pct, n: c.n, motivos, score, esCrit };
}).filter((x) => x.motivos.length).sort((a, b) => b.score - a.score);

// override propuesto para la semana siguiente
const slotsBase = [];
{
  let s = 0;
  for (const { fecha, dow } of fechas(D1, addDays(lunesSig, 3))) {
    if (dow === 5) continue;
    if (fecha >= lunesSig) slotsBase.push({ fecha, dow, code: CICLO[s % CICLO.length][0], prio: CICLO[s % CICLO.length][1] });
    s++;
  }
}
const principal = slotsBase.map((x) => x.code);
const cambios = [];
if (slotsBase.length === 4 && calientes.length) {
  const yaEnSemana = new Set(principal);
  // candidatos: calientes que existen en el CICLO (IV-1+IV-2 → IV-1, V-MED → V-7, IV-6+IV-7 → IV-6) y no caen ya esa semana
  const candidatos = calientes.filter((c) => !yaEnSemana.has(cicloCodeDe(c.codigo)) && CICLO.some((x) => x[0] === cicloCodeDe(c.codigo)));
  // slots sustituibles: nunca I-3 / V-2 (top-2); primero MEDIA/ALTA, luego CRÍTICA cuyo % ciego reciente ≥ 85
  const recDe = (code) => S2.porCodigo[code] || S2.porCodigo[Object.keys(CICLO_CODE).find((k) => CICLO_CODE[k] === code && S2.porCodigo[k]) || ''];
  const orden = slotsBase.map((x, i) => ({ i, ...x, rec: recDe(x.code) })).filter((x) => x.code !== 'I-3' && x.code !== 'V-2')
    .sort((a, b) => (a.prio === 'CRITICA') - (b.prio === 'CRITICA') || ((b.rec?.pct ?? 0) - (a.rec?.pct ?? 0)));
  let k = 0;
  for (const slot of orden) {
    if (cambios.length >= 2 || k >= candidatos.length) break;
    if (slot.prio === 'CRITICA' && !(slot.rec && slot.rec.n >= N_MIN && slot.rec.pct >= META_PCT)) continue; // un crítico solo se cede si ya está dominado
    const cand = candidatos[k++];
    principal[slot.i] = cicloCodeDe(cand.codigo);
    cambios.push(`${slot.fecha} ${slot.code} → ${principal[slot.i]} (${cand.motivos.join('; ')})`);
  }
}
// secundarios: códigos de cola larga con fallos en las 2 semanas van primero
const colaFallos = COLA_LARGA.map((c) => c.codigo).filter((c) => S2.porCodigo[c] && S2.porCodigo[c].pct < META_PCT);
const secundarios = colaFallos.length ? [0, 1, 2, 3].map((i) => colaFallos[i % colaFallos.length]) : null;
const override = { generado: hoyISO(), semana: lunesSig, base: slotsBase.map((x) => x.code), principal, ...(secundarios ? { secundarios } : {}), motivo: cambios.length ? `gen_encaps_semana ${lunes}: ${cambios.join(' · ')}` : `gen_encaps_semana ${lunes}: sin cambios (rotación base)`, calientes: calientes.slice(0, 8).map((c) => c.codigo), pct_ciego_semana: pctSem, alerta_minisim: alertaMini, n_min_por_codigo: N_MIN, codigos_con_n_min: Object.entries(S2.porCodigo).filter(([, v]) => v.n >= N_MIN).map(([c]) => c) };

// informe
const L = [];
L.push(`# Cierre semanal ENCAPS · semana del ${lunes} (generado ${hoyISO()})`);
L.push('');
L.push(`**% CIEGO semanal: ${totalSem ? pctSem + '%' : 'sin rondas'}** (${segSem}/${totalSem} seguras · ${sem.length} rondas) · meta ${META_PCT}% · crucero ${CRUCERO_PCT}%`);
L.push('');
L.push('## Por área vs vector v3');
L.push('| Área | v3 % | Q | % ciego | brecha a 85 | zona |');
L.push('|---|---|---|---|---|---|');
for (const a of ['II', 'I', 'V', 'III', 'IV']) {
  const x = S.porArea[a];
  const z = !x ? 'sin datos' : x.pct >= META_PCT ? 'GO' : x.pct >= CRUCERO_PCT ? 'crucero' : 'BRECHA';
  L.push(`| ${a} ${VECTOR_V3[a].label} | ${VECTOR_V3[a].pct} (${VECTOR_V3[a].lo}-${VECTOR_V3[a].hi}) | ${x ? x.n : 0} | ${x ? x.pct + '%' : '–'} | ${x ? Math.round(Math.max(0, META_PCT - x.pct) * 10) / 10 + ' pp' : '–'} | ${z} |`);
}
L.push('');
L.push('## Por código (esta semana; las rondas MIX con preguntas[] van repartidas por el código de cada ítem)');
L.push('| Código | rondas | Q | seguras | dudosas | fallos | % ciego | knowledge / transfer / proceso |');
L.push('|---|---|---|---|---|---|---|---|');
for (const [c, x] of Object.entries(S.porCodigo).sort((a, b) => a[1].pct - b[1].pct)) {
  const f = x.fallos;
  const fk = Object.values(f.knowledge).reduce((p, q) => p + q, 0), ft = Object.values(f.transfer).reduce((p, q) => p + q, 0), fp = Object.values(f.proceso).reduce((p, q) => p + q, 0);
  L.push(`| ${c}${esCritico(c) ? ' ★' : REBOTE_V3.includes(c) ? ' ↩' : ''} | ${x.rondas} | ${x.n} | ${x.seg} | ${x.dud} | ${x.n - x.seg - x.dud} | ${x.pct}% | ${fk} / ${ft} / ${fp} |`);
}
L.push('');
L.push(`## Mini-sims (/25) · umbral ${RECETA_MINISIM.umbral_25} · alerta <${RECETA_MINISIM.alerta_25} ×2`);
L.push(minis.length ? minis.map((r) => `- ${r.fecha}: **${r.nota ?? r.correctas_seguras + r.correctas_dudosas}/25** (seguras ${r.correctas_seguras}, % ciego ${r.pct_ciego}%)`).join('\n') : '- sin mini-sims registrados (cierra el viernes con tipoRonda=mini_sim y nota=NN)');
if (alertaMini) L.push('\n**⚠ ALERTA: dos viernes seguidos <15/25 → re-ponderar la semana siguiente (override abajo).**');
L.push('');
L.push(`## Temas calientes (últimas 2 semanas, ordenados por peso v3 × brecha; n ≥ ${N_MIN} por código)`);
L.push(calientes.length ? calientes.map((c) => `- **${c.codigo}**${c.esCrit ? ' ★' : ''} (área ${c.area} ${c.peso}%) · % ciego ${c.pct}% en ${c.n}Q · ${c.motivos.join(' · ')} · score ${c.score}`).join('\n') : `- ninguno (o sin datos suficientes: n ≥ ${N_MIN} por código)`);
L.push(`- Códigos con n ≥ ${N_MIN} en la ventana: ${override.codigos_con_n_min.join(' · ') || 'ninguno'} · críticos v3 con n ≥ ${N_MIN}: ${CRITICOS_V3.filter((c) => (S2.porCodigo[c] || {}).n >= N_MIN).length}/8`);
L.push('');
L.push(`## Override propuesto para la semana del ${lunesSig}`);
L.push(`- Rotación base (CICLO v3): ${slotsBase.map((x) => `${x.fecha.slice(5)} ${x.code}`).join(' · ') || '(fuera del ciclo sembrado)'}`);
L.push(`- Propuesta principal: **${principal.join(' · ')}**${cambios.length ? '' : ' (sin cambios)'}`);
if (cambios.length) L.push(cambios.map((c) => `  - ${c}`).join('\n'));
if (secundarios) L.push(`- Secundarios (cola larga con fallos): ${secundarios.join(' · ')}`);
L.push(`- Regla: máximo 2 sustituciones/semana · I-3 y V-2 nunca se ceden · un crítico solo se cede si ya está ≥85% con n ≥ ${N_MIN}.`);
L.push('');
L.push('## Cómo aplicar');
L.push('```');
L.push(`node DATA/_scripts/gen_encaps_mantenimiento_2027.js ${D1} --override DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/override_${lunesSig}.json`);
L.push('# → el generador lee SEMANAS/overrides_acumulado.json (todas las semanas anteriores) y AÑADE esta; revisar');
L.push('#   DATA/_scripts/_encaps_mantenimiento_2027.sql y aplicarlo por MCP execute_sql (proyecto qacynpqdrorpuegsmtcy);');
L.push('#   backup por defecto study_schedule_bk_<YYYYMMDD> (aborta si ya existe) · el DELETE solo toca modo=MANTENIMIENTO.');
L.push('```');
const informe = L.join('\n') + '\n';
fs.mkdirSync(SEMANAS_DIR, { recursive: true });
fs.writeFileSync(path.join(SEMANAS_DIR, `semana_${lunes}.md`), informe, 'utf8');
fs.writeFileSync(path.join(SEMANAS_DIR, `override_${lunesSig}.json`), JSON.stringify(override, null, 1) + '\n', 'utf8');
// acumulado: la semana siguiente se AÑADE (o se reemplaza a sí misma si se re-cierra la semana); las anteriores se conservan
{
  let ac = { _meta: {}, semanas: {} };
  if (fs.existsSync(ACUMULADO)) { try { ac = JSON.parse(fs.readFileSync(ACUMULADO, 'utf8')); } catch (e) { console.warn('⚠ overrides_acumulado.json ilegible: se reescribe'); } }
  ac._meta = { ...(ac._meta || {}), descripcion: 'Merge de TODOS los overrides semanales aplicados al ciclo ENCAPS MANTENIMIENTO 2027-I (clave = lunes ISO). gen_encaps_mantenimiento_2027.js lo lee por defecto: regenerar el SQL sin este fichero devolvería las semanas pasadas a la rotación base. Lo escriben gen_encaps_semana.js (cierre semanal) y gen_encaps_mantenimiento_2027.js (--override).', actualizado: hoyISO() };
  ac.semanas = { ...(ac.semanas || {}), [lunesSig]: override };
  fs.writeFileSync(ACUMULADO, JSON.stringify(ac, null, 1) + '\n', 'utf8');
  console.log(informe);
  console.log('→', path.join(SEMANAS_DIR, `semana_${lunes}.md`));
  console.log('→', path.join(SEMANAS_DIR, `override_${lunesSig}.json`));
  console.log('→', ACUMULADO, '·', Object.keys(ac.semanas).length, 'semana(s) acumuladas:', Object.keys(ac.semanas).sort().join(', '));
}
saveReg(j);
console.log('perfil →', generarPerfil(j));
if (has('--sql')) { fs.writeFileSync(SQL_OUT, sqlProgress(sem.filter((r) => !r._legacy)), 'utf8'); console.log('SQL →', SQL_OUT, '(rondas v3 de la semana; aplicar por MCP execute_sql)'); }
