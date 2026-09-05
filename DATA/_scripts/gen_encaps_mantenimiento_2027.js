/**
 * gen_encaps_mantenimiento_2027.js — siembra el ciclo ENCAPS MANTENIMIENTO 2027-I en Supabase.
 *
 * Régimen v5.6 (D1 = lun 2026-09-07): ENCAPS = 1h/día (16:15-17:15 L-V) hasta el 29-ene-2027
 * (102 días L-V, skip 25-dic/31-dic/1-ene; sábado y domingo LIBRES). El bloque principal de la
 * mañana es USMLE Step 1. Feb-mar 2027: fase intensiva (se re-siembra entonces).
 * EXAMEN ENCAPS 2027-I: fines de marzo 2027 (fecha real = convocatoria SERUMS 2027-I, A VERIFICAR).
 *
 *   · lun-jue = banco del día (20-25Q) con rotación de 4 semanas ponderada por el PRONÓSTICO v3
 *     (vector II 30 · I 27 · V 21 · III 13 · IV 9 · 8 críticos I-3 V-2 II-3 III-5 I-4 II-5 II-4 IV-1/2
 *     + ALTA con flag de rebote II-1 II-11 II-8). I-3 y V-2 caen 2× por ciclo (top-2).
 *       - SUB-EJE por instancia (columna subtema + extra.sub_eje): V-2 4 planeamiento / 4 clima+calidad /
 *         3 residuos · I-3 rota los 8 sub-ejes del núcleo v3 · IV-1/2 4 sub-ejes · II-3 4 sub-ejes …
 *       - SECUNDARIO (temas_secundarios, 4-5Q de las 20-25Q): rota los 17 códigos de cola larga.
 *   · vie = mini-simulacro 25Q mixto cronometrado (72 s/Q) con la receta fija en extra
 *     ({II:8,I:7,V:5,III:3,IV:2, viñeta 50%, ≥10Q críticos, ≥5Q fallos previos}) + 2 códigos de
 *     cola larga en temas_secundarios (19 viernes → cada código cae ~2×). sim_n = dia (study_sim_scores).
 *
 * Subtemas y tiers se leen de src/lib/encapsCobertura.ts (NO se inventan); ciclo/sub-ejes/cola larga
 * viven en _encaps_ciclo_v3.js (compartido con gen_encaps_semana.js).
 *
 * Uso:
 *   node DATA/_scripts/gen_encaps_mantenimiento_2027.js [D1=2026-09-07] [--bk study_schedule_bk_0906b]
 *        [--override <json|ruta.json>] [--hasta 2027-01-29]
 *   --override: {"semanas":{"<lunes ISO>":{"principal":["I-3","V-2","II-5","IV-1"],"secundarios":["II-2","I-10","V-6","II-6"],"motivo":"…"}}}
 *               (lo emite gen_encaps_semana.js; sustituye SOLO esa semana, la rotación sigue igual).
 * Emite DATA/_scripts/_encaps_mantenimiento_2027.sql (backup → delete → insert). Aplicar por MCP execute_sql.
 * Pipeline de corrimiento (cada día sin estudiar = +1): node … <nueva fecha> → execute_sql.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const { CICLO, SUB_EJES, COLA_LARGA, RECETA_MINISIM, WD, fechas, lunesDe } = require('./_encaps_ciclo_v3');

// ── argumentos ──
const argv = process.argv.slice(2);
const D1 = argv.find((a) => /^20\d\d-\d\d-\d\d$/.test(a)) || '2026-09-07';
const opt = (k, def) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] ? argv[i + 1] : def; };
const HASTA = opt('--hasta', '2027-01-29');
const BK = opt('--bk', 'study_schedule_bk_0906b');
let OVERRIDE = { semanas: {} };
const ovArg = opt('--override', null);
if (ovArg) {
  const raw = ovArg.trim().startsWith('{') ? ovArg : fs.readFileSync(path.resolve(ovArg), 'utf8');
  OVERRIDE = JSON.parse(raw);
  if (!OVERRIDE.semanas) OVERRIDE = { semanas: OVERRIDE };
}
if (!/^[a-z_][a-z0-9_]*$/.test(BK)) throw new Error('--bk inválido: ' + BK);

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

const esc = (s) => String(s).replace(/'/g, "''");
const J = (o) => `'${esc(JSON.stringify(o))}'::jsonb`;
// rol: 'cola_larga' (4-5Q lun-jue · 5-6Q vie) | 'paraguas' (código hermano incluido en el banco: IV-2, IV-7, V-10). Prioridad MEDIA en ambos casos.
const secObj = (codigo, rol, q, label) => ({ codigo, subtema: label || temaInfo(codigo).label, prioridad: 'MEDIA', rol, q });

// ── siembra ──
const rows = [];
const subCount = {};       // instancias por código (para rotar sub-ejes)
const totalPorCodigo = {}; // total de instancias (para extra.de) — se calcula en una pasada previa
let dia = 0, slot = 0, sec = 0, secVie = 0, f0 = '', f1 = '', overridesAplicados = [];
const plan = [...fechas(D1, HASTA)];
// pasada previa: cuántas veces cae cada código (con overrides)
{
  let s = 0;
  for (const { fecha, dow } of plan) {
    if (dow === 5) continue;
    const ov = (OVERRIDE.semanas || {})[lunesDe(fecha)];
    let code = CICLO[s % CICLO.length][0]; s++;
    if (ov && Array.isArray(ov.principal) && ov.principal[dow - 1]) code = ov.principal[dow - 1];
    totalPorCodigo[code] = (totalPorCodigo[code] || 0) + 1;
  }
}
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
    const subtema = `Mini-simulacro semanal 25Q mixto (vector v3) · cola larga: ${cl.map((c) => c.codigo).join(' + ')}`;
    rows.push(`('ENCAPS',${dia},'${fecha}','Vie','mini_sim',NULL,'${esc(subtema)}','CRITICA','MANTENIMIENTO','[]'::jsonb,'[]'::jsonb,'[]'::jsonb,${J(secs)},${J(extra)})`);
    continue;
  }
  // ── lun-jue: banco del día ──
  let [code, prio, paraguas] = CICLO[slot % CICLO.length];
  slot++;
  if (ov && Array.isArray(ov.principal) && ov.principal[dow - 1]) {
    const c2 = ov.principal[dow - 1];
    if (c2 !== code) { overridesAplicados.push(`${fecha}: ${code}→${c2}`); }
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
    if (c3) clc = c3;
  }
  const secs = [];
  for (const p of paraguas || []) secs.push(secObj(p, 'paraguas', 'incluido'));
  secs.push(secObj(clc.codigo, 'cola_larga', '4-5Q', clc.label));
  extra.secundario = clc.codigo;
  if (ov && ov.motivo) extra.override = ov.motivo;
  rows.push(`('ENCAPS',${dia},'${fecha}','${WD[dow]}','banqueo1h','${code}','${esc(subtema)}','${prio}','MANTENIMIENTO','[]'::jsonb,'[]'::jsonb,'[]'::jsonb,${J(secs)},${J(extra)})`);
}

const sql = `-- ENCAPS MANTENIMIENTO 2027-I · generado por gen_encaps_mantenimiento_2027.js (${new Date().toISOString().slice(0, 10)})
-- ${rows.length} días L-V · ${f0} → ${f1} · rotación v3 4 semanas con sub-ejes + cola larga · vie = mini-sim 25Q (receta fija) · backup ${BK}
${overridesAplicados.length ? `-- overrides: ${overridesAplicados.join(' · ')}\n` : ''}BEGIN;
DROP TABLE IF EXISTS ${BK};
CREATE TABLE ${BK} AS SELECT * FROM study_schedule;
DELETE FROM study_schedule WHERE examen = 'ENCAPS';
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, codigo, subtema, prioridad, modo, videos, theomed, material_comp, temas_secundarios, extra) VALUES
${rows.join(',\n')};
COMMIT;
`;
const out = path.join(__dirname, '_encaps_mantenimiento_2027.sql');
fs.writeFileSync(out, sql, 'utf8');
console.log('OK →', out, '·', rows.length, 'días ·', f0, '→', f1, '·', sql.length, 'chars · backup', BK);
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
