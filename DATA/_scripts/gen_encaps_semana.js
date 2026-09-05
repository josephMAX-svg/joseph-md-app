/**
 * gen_encaps_semana.js — cierre de sesión (1 línea) + cierre SEMANAL ENCAPS (viernes 17:00).
 *
 * La métrica que manda es el % CIEGO REAL = correctas SEGURAS / total (README_SISTEMA_TRACKING.md).
 * Este script es el único punto de entrada de datos del régimen MANTENIMIENTO 2027-I:
 *
 *  1) CIERRE DE SESIÓN (1 línea, 17:10-17:15 lun-jue · 16:45-17:15 vie):
 *     node DATA/_scripts/gen_encaps_semana.js --cerrar "ENCAPS|banco_dia|2026-09-07|II-3|n=22|seg=15|dud=3|CONCEPTO:1,OLVIDO:2,CCSN:1|t=68|sub=esquema_intervalos"
 *        formato: EXAMEN|tipoRonda|fecha|codigo|n=NN|seg=NN|dud=NN|<fallos SUBTIPO:k,…>|t=SS[|sub=…][|tema=…][|delta=±x][|nota=NN]
 *        EXAMEN = ENCAPS | USMLE | MIR | DERMA · tipoRonda = banco_dia | eval_anclada | mini_sim | pretest | simulacro | repaso | warmup
 *        subtipos: knowledge CONCEPTO OLVIDO CRONOLOGIA · transfer CCSN CONTEXTO · proceso CAMBIO TIEMPO LECTURA
 *     → apenda la ronda v3 a DATA/ENCAPS/TRACKING_ERRORES/_registro_resoluciones.json (append-only)
 *     → recalcula resumen_por_subtema
 *     → con --sql, además emite DATA/_scripts/_encaps_progress_upsert.sql (INSERT en study_progress; aplicar por MCP execute_sql)
 *
 *  2) CIERRE SEMANAL (viernes):
 *     node DATA/_scripts/gen_encaps_semana.js [--semana 2026-09-07] [--sql] [--d1 2026-09-07]
 *     → % ciego semanal por área/código vs vector v3, tabla de brecha, temas calientes (últimas 2 semanas),
 *       alerta de mini-sims (<15/25 dos viernes) y PROPUESTA DE OVERRIDE del CICLO para la semana siguiente:
 *       DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/override_<lunes siguiente>.json
 *       → aplicar con: node DATA/_scripts/gen_encaps_mantenimiento_2027.js <D1> --override <ese json>  → execute_sql
 *     → informe legible en DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/semana_<lunes>.md (y por stdout)
 *
 * Sin dependencias externas. No toca Supabase directamente (regla: la app y el MCP escriben Supabase, no los scripts).
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const { VECTOR_V3, CRITICOS_V3, REBOTE_V3, CICLO, COLA_LARGA, RECETA_MINISIM, fechas, lunesDe, areaDe } = require('./_encaps_ciclo_v3');

const REG = path.join(ROOT, 'DATA', 'ENCAPS', 'TRACKING_ERRORES', '_registro_resoluciones.json');
const SEMANAS_DIR = path.join(ROOT, 'DATA', 'ENCAPS', 'TRACKING_ERRORES', 'SEMANAS');
const SQL_OUT = path.join(__dirname, '_encaps_progress_upsert.sql');

const META_PCT = 85, CRUCERO_PCT = 75;
const SUBTIPOS = {
  knowledge: ['CONCEPTO', 'OLVIDO', 'CRONOLOGIA'],
  transfer: ['CCSN', 'CONTEXTO'],
  proceso: ['CAMBIO', 'TIEMPO', 'LECTURA'],
};
const TIPO_DE = {}; for (const [t, arr] of Object.entries(SUBTIPOS)) for (const s of arr) TIPO_DE[s] = t;
const EXAMENES = ['ENCAPS', 'USMLE', 'MIR', 'DERMA'];
const TIPOS_RONDA = ['banco_dia', 'eval_anclada', 'mini_sim', 'pretest', 'simulacro', 'repaso', 'warmup'];

// ── argumentos ──
const argv = process.argv.slice(2);
const opt = (k, def) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] != null ? argv[i + 1] : def; };
const has = (k) => argv.includes(k);
const D1 = opt('--d1', '2026-09-07');
const hoyISO = () => new Date(Date.now() - 5 * 3600 * 1000).toISOString().slice(0, 10); // Lima
const addDays = (iso, n) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

// ── registro ──
function loadReg() { return JSON.parse(fs.readFileSync(REG, 'utf8')); }
function saveReg(j) { fs.writeFileSync(REG, JSON.stringify(j, null, 1) + '\n', 'utf8'); }
const pct = (a, b) => (b ? Math.round((a / b) * 1000) / 10 : 0);
const emptyFallos = () => ({ knowledge: { CONCEPTO: 0, OLVIDO: 0, CRONOLOGIA: 0 }, transfer: { CCSN: 0, CONTEXTO: 0 }, proceso: { CAMBIO: 0, TIEMPO: 0, LECTURA: 0 } });
const sumFallos = (f) => Object.values(f || {}).reduce((n, g) => n + Object.values(g || {}).reduce((m, v) => m + (Number(v) || 0), 0), 0);

// Normaliza CUALQUIER ronda (v1 jul-2026 warmup, v2 jul-2026 set, v3) al esquema v3 mínimo.
function normaliza(r) {
  if (r.examen && r.n != null && r.correctas_seguras != null) {
    return { ...r, fallos_por_tipo: r.fallos_por_tipo || emptyFallos(), pct_ciego: r.pct_ciego ?? pct(r.correctas_seguras, r.n) };
  }
  const preguntas = Array.isArray(r.preguntas) ? r.preguntas : [];
  const n = r.total || r.n || preguntas.length || 0;
  let seg = 0, dud = 0; const fallos = emptyFallos();
  for (const q of preguntas) {
    if (q.ok) {
      const segura = q.confianza === 'segura' || q.eval === 'conocimiento';
      const suerte = q.acierto_por_suerte === true || q.eval === 'suerte' || q.confianza === 'adivinada' || q.confianza === 'dudosa';
      if (segura && !suerte) seg++; else dud++;
    } else {
      const e = String(q.error || '').toUpperCase().replace('Í', 'I');
      const t = TIPO_DE[e];
      if (t) fallos[t][e]++; else fallos.knowledge.CONCEPTO++;
    }
  }
  if (!preguntas.length && r.correctas != null) { seg = (r.correctas || 0) - (r.adivinadas || 0); dud = r.adivinadas || 0; }
  const codigo = r.codigo || r.subtema || '?';
  return {
    examen: r.examen || 'ENCAPS', tipoRonda: r.tipoRonda || r.bloque || 'warmup', fecha: r.fecha, codigo,
    tema: r.tema || r.set || r.id || '', n, correctas_seguras: seg, correctas_dudosas: dud,
    fallos_por_tipo: fallos, tiempo_medio_seg: r.tiempo_medio_seg ?? null, pct_ciego: pct(seg, n), _legacy: true,
  };
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
  return ronda;
}
function recalculaResumen(j) {
  const acc = {};
  for (const raw of j.rondas) {
    const r = normaliza(raw); if (r.examen !== 'ENCAPS') continue;
    const a = (acc[r.codigo] ||= { resueltas: 0, seguras: 0, dudosas: 0, fallos: 0, ultima: '', rondas: 0 });
    a.resueltas += r.n; a.seguras += r.correctas_seguras; a.dudosas += r.correctas_dudosas; a.fallos += r.n - r.correctas_seguras - r.correctas_dudosas;
    a.rondas++; if (r.fecha > a.ultima) a.ultima = r.fecha;
  }
  const out = {};
  for (const [c, a] of Object.entries(acc)) {
    const p = pct(a.seguras, a.resueltas);
    const crit = CRITICOS_V3.includes(c) || (c === 'IV-1' || c === 'IV-2');
    out[c] = { ...a, pct_ciego: p, estado: p >= META_PCT ? 'DOMINADO' : p >= CRUCERO_PCT ? 'crucero' : crit ? 'CRITICO-debil' : 'debil', nota: (j.resumen_por_subtema || {})[c]?.nota || '' };
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
  if (has('--sql')) { fs.writeFileSync(SQL_OUT, sqlProgress([ronda]), 'utf8'); console.log('SQL →', SQL_OUT, '(aplicar por MCP execute_sql, proyecto qacynpqdrorpuegsmtcy)'); }
  process.exit(0);
}

// ── 2) cierre semanal ──
const semana = opt('--semana', lunesDe(hoyISO()));
if (!/^20\d\d-\d\d-\d\d$/.test(semana)) throw new Error('--semana inválida');
const lunes = lunesDe(semana), domingo = addDays(lunes, 6), lunesSig = addDays(lunes, 7), lunesPrev = addDays(lunes, -7);
const j = loadReg();
const todas = j.rondas.map(normaliza).filter((r) => r.examen === 'ENCAPS' && r.fecha);
const enRango = (r, a, b) => r.fecha >= a && r.fecha <= b;
const sem = todas.filter((r) => enRango(r, lunes, domingo));
const dosSem = todas.filter((r) => enRango(r, lunesPrev, domingo));

function agrega(rondas) {
  const porCodigo = {}, porArea = {};
  for (const r of rondas) {
    const c = (porCodigo[r.codigo] ||= { n: 0, seg: 0, dud: 0, fallos: emptyFallos(), rondas: 0, evalFallos: 0, tipos: new Set() });
    c.n += r.n; c.seg += r.correctas_seguras; c.dud += r.correctas_dudosas; c.rondas++; c.tipos.add(r.tipoRonda);
    for (const [t, g] of Object.entries(r.fallos_por_tipo || {})) for (const [s, v] of Object.entries(g || {})) if (c.fallos[t] && c.fallos[t][s] != null) c.fallos[t][s] += Number(v) || 0;
    if (r.tipoRonda === 'eval_anclada') c.evalFallos += r.n - r.correctas_seguras - r.correctas_dudosas;
    // por área: solo códigos con área v3 (los mini-sims/pretest mixtos van con codigo=MIX y no se atribuyen a un área)
    const ar = areaDe(r.codigo);
    if (!VECTOR_V3[ar]) continue;
    const a = (porArea[ar] ||= { n: 0, seg: 0, dud: 0 });
    a.n += r.n; a.seg += r.correctas_seguras; a.dud += r.correctas_dudosas;
  }
  for (const c of Object.values(porCodigo)) { c.pct = pct(c.seg, c.n); c.fallosTot = sumFallos(c.fallos); c.tipos = [...c.tipos]; }
  for (const a of Object.values(porArea)) a.pct = pct(a.seg, a.n);
  return { porCodigo, porArea };
}
const S = agrega(sem), S2 = agrega(dosSem);
const totalSem = sem.reduce((n, r) => n + r.n, 0), segSem = sem.reduce((n, r) => n + r.correctas_seguras, 0);
const pctSem = pct(segSem, totalSem);

// mini-sims (nota /25) — últimos 2 viernes del registro
const minis = todas.filter((r) => r.tipoRonda === 'mini_sim').sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
const notasMini = minis.map((r) => r.nota ?? r.correctas_seguras + r.correctas_dudosas);
const alertaMini = notasMini.length >= 2 && notasMini.slice(-2).every((x) => x < RECETA_MINISIM.alerta_25);

// temas calientes (últimas 2 semanas): % ciego < 75 con n ≥ 5 · eval anclada con ≥2 fallos · ≥3 fallos knowledge
// (los códigos sin área v3 — MIX de mini-sim/pretest — no son "tema": se excluyen; su señal es la nota /25)
const calientes = Object.entries(S2.porCodigo).filter(([codigo]) => !!VECTOR_V3[areaDe(codigo)]).map(([codigo, c]) => {
  const area = areaDe(codigo);
  const peso = VECTOR_V3[area].pct;
  const esCrit = CRITICOS_V3.includes(codigo) || codigo === 'IV-1' || codigo === 'IV-2';
  const kn = Object.values(c.fallos.knowledge).reduce((a, b) => a + b, 0);
  const motivos = [];
  if (c.n >= 5 && c.pct < CRUCERO_PCT) motivos.push(`% ciego ${c.pct}% < ${CRUCERO_PCT}%`);
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
  const candidatos = calientes.filter((c) => !yaEnSemana.has(c.codigo) && (CICLO.some((x) => x[0] === c.codigo) || c.codigo === 'IV-2'));
  // slots sustituibles: nunca I-3 / V-2 (top-2); primero MEDIA/ALTA, luego CRÍTICA cuyo % ciego reciente ≥ 85
  const orden = slotsBase.map((x, i) => ({ i, ...x, rec: S2.porCodigo[x.code] })).filter((x) => x.code !== 'I-3' && x.code !== 'V-2')
    .sort((a, b) => (a.prio === 'CRITICA') - (b.prio === 'CRITICA') || ((b.rec?.pct ?? 0) - (a.rec?.pct ?? 0)));
  let k = 0;
  for (const slot of orden) {
    if (cambios.length >= 2 || k >= candidatos.length) break;
    if (slot.prio === 'CRITICA' && !(slot.rec && slot.rec.n >= 5 && slot.rec.pct >= META_PCT)) continue; // un crítico solo se cede si ya está dominado
    const cand = candidatos[k++];
    principal[slot.i] = cand.codigo === 'IV-2' ? 'IV-1' : cand.codigo;
    cambios.push(`${slot.fecha} ${slot.code} → ${principal[slot.i]} (${cand.motivos.join('; ')})`);
  }
}
// secundarios: códigos de cola larga con fallos en las 2 semanas van primero
const colaFallos = COLA_LARGA.map((c) => c.codigo).filter((c) => S2.porCodigo[c] && S2.porCodigo[c].pct < META_PCT);
const secundarios = colaFallos.length ? [0, 1, 2, 3].map((i) => colaFallos[i % colaFallos.length]) : null;
const override = { generado: hoyISO(), semana: lunesSig, base: slotsBase.map((x) => x.code), principal, ...(secundarios ? { secundarios } : {}), motivo: cambios.length ? `gen_encaps_semana ${lunes}: ${cambios.join(' · ')}` : `gen_encaps_semana ${lunes}: sin cambios (rotación base)`, calientes: calientes.slice(0, 8).map((c) => c.codigo), pct_ciego_semana: pctSem, alerta_minisim: alertaMini };

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
L.push('## Por código (esta semana)');
L.push('| Código | rondas | Q | seguras | dudosas | fallos | % ciego | knowledge / transfer / proceso |');
L.push('|---|---|---|---|---|---|---|---|');
for (const [c, x] of Object.entries(S.porCodigo).sort((a, b) => a[1].pct - b[1].pct)) {
  const f = x.fallos;
  const fk = Object.values(f.knowledge).reduce((p, q) => p + q, 0), ft = Object.values(f.transfer).reduce((p, q) => p + q, 0), fp = Object.values(f.proceso).reduce((p, q) => p + q, 0);
  L.push(`| ${c}${CRITICOS_V3.includes(c) ? ' ★' : REBOTE_V3.includes(c) ? ' ↩' : ''} | ${x.rondas} | ${x.n} | ${x.seg} | ${x.dud} | ${x.n - x.seg - x.dud} | ${x.pct}% | ${fk} / ${ft} / ${fp} |`);
}
L.push('');
L.push(`## Mini-sims (/25) · umbral ${RECETA_MINISIM.umbral_25} · alerta <${RECETA_MINISIM.alerta_25} ×2`);
L.push(minis.length ? minis.map((r) => `- ${r.fecha}: **${r.nota ?? r.correctas_seguras + r.correctas_dudosas}/25** (seguras ${r.correctas_seguras}, % ciego ${r.pct_ciego}%)`).join('\n') : '- sin mini-sims registrados (cierra el viernes con tipoRonda=mini_sim y nota=NN)');
if (alertaMini) L.push('\n**⚠ ALERTA: dos viernes seguidos <15/25 → re-ponderar la semana siguiente (override abajo).**');
L.push('');
L.push('## Temas calientes (últimas 2 semanas, ordenados por peso v3 × brecha)');
L.push(calientes.length ? calientes.map((c) => `- **${c.codigo}**${c.esCrit ? ' ★' : ''} (área ${c.area} ${c.peso}%) · % ciego ${c.pct}% en ${c.n}Q · ${c.motivos.join(' · ')} · score ${c.score}`).join('\n') : '- ninguno (o sin datos suficientes: n ≥ 5 por código)');
L.push('');
L.push(`## Override propuesto para la semana del ${lunesSig}`);
L.push(`- Rotación base (CICLO v3): ${slotsBase.map((x) => `${x.fecha.slice(5)} ${x.code}`).join(' · ') || '(fuera del ciclo sembrado)'}`);
L.push(`- Propuesta principal: **${principal.join(' · ')}**${cambios.length ? '' : ' (sin cambios)'}`);
if (cambios.length) L.push(cambios.map((c) => `  - ${c}`).join('\n'));
if (secundarios) L.push(`- Secundarios (cola larga con fallos): ${secundarios.join(' · ')}`);
L.push(`- Regla: máximo 2 sustituciones/semana · I-3 y V-2 nunca se ceden · un crítico solo se cede si ya está ≥85% con n ≥ 5.`);
L.push('');
L.push('## Cómo aplicar');
L.push('```');
L.push(`node DATA/_scripts/gen_encaps_mantenimiento_2027.js ${D1} --override DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/override_${lunesSig}.json`);
L.push('# → revisar DATA/_scripts/_encaps_mantenimiento_2027.sql y aplicarlo por MCP execute_sql (proyecto qacynpqdrorpuegsmtcy)');
L.push('```');
const informe = L.join('\n') + '\n';
fs.mkdirSync(SEMANAS_DIR, { recursive: true });
fs.writeFileSync(path.join(SEMANAS_DIR, `semana_${lunes}.md`), informe, 'utf8');
fs.writeFileSync(path.join(SEMANAS_DIR, `override_${lunesSig}.json`), JSON.stringify(override, null, 1) + '\n', 'utf8');
console.log(informe);
console.log('→', path.join(SEMANAS_DIR, `semana_${lunes}.md`));
console.log('→', path.join(SEMANAS_DIR, `override_${lunesSig}.json`));
if (has('--sql')) { fs.writeFileSync(SQL_OUT, sqlProgress(sem.filter((r) => !r._legacy)), 'utf8'); console.log('SQL →', SQL_OUT, '(rondas v3 de la semana; aplicar por MCP execute_sql)'); }
