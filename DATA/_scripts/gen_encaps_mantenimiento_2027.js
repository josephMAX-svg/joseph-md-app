/**
 * gen_encaps_mantenimiento_2027.js — siembra el ciclo ENCAPS MANTENIMIENTO 2027-I.
 *
 * Régimen v6 (27-ago-2026): ENCAPS pasa a 1h/día (16:15-17:15 L-V) hasta fines de enero
 * (el bloque principal de la mañana ahora es USMLE Step 1). Feb-mar 2027: fase intensiva.
 * EXAMEN ENCAPS 2027-I: fines de marzo 2027.
 *
 * Ciclo: 103 días L-V (v5.5: D1 = vie 2026-09-04 → 2027-01-29, skip 25-dic/31-dic/1-ene).
 *   (histórico: v6 27-ago sembró 107 días desde 31-ago; v6.1 106 desde 1-sep; v6.2 104 desde 3-sep; v6.3/v5.5 = 103 desde 4-sep)
 *   · lun-jue = banco del día (20-25Q) con rotación de 4 semanas ponderada por el
 *     PRONÓSTICO WALK-FORWARD v3 (DATA/ENCAPS/PRONOSTICO_WALKFORWARD_2027-1_v3.md):
 *     vector II 30 · I 27 · V 21 · III 13 · IV 9 · 8 críticos (I-3 V-2 II-3 III-5 I-4 II-5 II-4 IV-1/2)
 *     + ALTA con flag de rebote (II-1 II-11 II-8). I-3 y V-2 caen 2× por ciclo (top-2).
 *   · vie = mini-simulacro 25Q mixto cronometrado + corrección.
 *
 * Subtemas y tiers se leen de src/lib/encapsCobertura.ts (NO se inventan).
 * Emite DATA/_scripts/_encaps_mantenimiento_2027.sql (backup → delete → insert).
 * Aplicar por MCP execute_sql. Backup: study_schedule_bk_0903.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');

// ── calendario L-V con feriados ──
const SKIP = new Set(['2026-12-25', '2026-12-31', '2027-01-01']);
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
function* fechas(desde, hasta) {
  const d = new Date(desde + 'T12:00:00Z'), end = new Date(hasta + 'T12:00:00Z');
  while (d <= end) {
    const dow = d.getUTCDay(), iso = d.toISOString().slice(0, 10);
    if (dow >= 1 && dow <= 5 && !SKIP.has(iso)) yield { fecha: iso, dow };
    d.setUTCDate(d.getUTCDate() + 1);
  }
}

// ── labels/tier desde encapsCobertura.ts ──
const cobSrc = fs.readFileSync(path.join(ROOT, 'src/lib/encapsCobertura.ts'), 'utf8');
function temaInfo(code) {
  // clave exacta ("IV-1": {) o clave combinada ("IV-1+IV-2": { / "V-7+V-10": {) — encapsCobertura
  // agrupa IV-1/IV-2, IV-6/IV-7 y V-7/V-10 bajo códigos-paraguas; sin este fallback el subtema
  // quedaba como el literal del código (bug detectado en la siembra del 02-sep).
  let i = cobSrc.indexOf(`"${code}": {`);
  if (i < 0) i = cobSrc.indexOf(`"${code}+`);
  if (i < 0) { const m = cobSrc.match(new RegExp(`"[IV]+-\\d+\\+${code.replace(/[-+]/g, '\\$&')}": \\{`)); if (m) i = m.index; }
  if (i < 0) return { label: code, tier: 'MEDIA' };
  const seg = cobSrc.slice(i, i + 4000);
  const tier = (seg.match(/"tier":\s*"([^"]+)"/) || [])[1] || 'MEDIA';
  const tem = (seg.match(/"temario":\s*\[\s*"([^"]+)"/) || [])[1] || code;
  let label = tem.split('(')[0].trim();
  if (label.length > 70) label = label.slice(0, 67) + '…';
  return { label, tier: tier.replace('Í', 'I') };
}

// ── rotación de 4 semanas (lun-jue), v3 ──
// [codigo, prioridad_v3, temas_secundarios?]
const CICLO = [
  // Semana A
  ['II-3', 'CRITICA', null], ['I-3', 'CRITICA', null], ['V-2', 'CRITICA', null], ['III-5', 'CRITICA', null],
  // Semana B
  ['II-5', 'CRITICA', null], ['I-4', 'CRITICA', null], ['IV-1', 'CRITICA', ['IV-2']], ['II-4', 'CRITICA', null],
  // Semana C
  ['II-1', 'ALTA', null], ['I-3', 'CRITICA', null], ['V-2', 'CRITICA', null], ['III-8', 'MEDIA', null],
  // Semana D
  ['II-11', 'ALTA', null], ['IV-6', 'MEDIA', ['IV-7']], ['V-7', 'ALTA', ['V-10']], ['II-8', 'ALTA', null],
];

const esc = (s) => String(s).replace(/'/g, "''");
const rows = [];
let dia = 0, slot = 0, f0 = '', f1 = '';
for (const { fecha, dow } of fechas(process.argv[2]||'2026-09-04', '2027-01-29')) {
  dia++; if (!f0) f0 = fecha; f1 = fecha;
  if (dow === 5) {
    rows.push(`('ENCAPS',${dia},'${fecha}','Vie','mini_sim',NULL,'Mini-simulacro semanal 25Q mixto (vector v3)','CRITICA','MANTENIMIENTO','[]'::jsonb,'[]'::jsonb,'[]'::jsonb,NULL,'{}'::jsonb)`);
  } else {
    const [code, prio, secs] = CICLO[slot % CICLO.length];
    slot++;
    const info = temaInfo(code);
    const ts = secs
      ? `'${esc(JSON.stringify(secs.map((c) => ({ codigo: c, subtema: temaInfo(c).label, prioridad: 'MEDIA' }))))}'::jsonb`
      : 'NULL';
    rows.push(`('ENCAPS',${dia},'${fecha}','${WD[dow]}','banqueo1h','${code}','${esc(info.label)}','${prio}','MANTENIMIENTO','[]'::jsonb,'[]'::jsonb,'[]'::jsonb,${ts},'{}'::jsonb)`);
  }
}

const sql = `-- ENCAPS MANTENIMIENTO 2027-I · generado por gen_encaps_mantenimiento_2027.js (${new Date().toISOString().slice(0, 10)})
-- ${rows.length} días L-V · ${f0} → ${f1} · rotación v3 4 semanas · vie = mini-sim
BEGIN;
DROP TABLE IF EXISTS study_schedule_bk_0903;
CREATE TABLE study_schedule_bk_0903 AS SELECT * FROM study_schedule;
DELETE FROM study_schedule WHERE examen = 'ENCAPS';
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, codigo, subtema, prioridad, modo, videos, theomed, material_comp, temas_secundarios, extra) VALUES
${rows.join(',\n')};
COMMIT;
`;
const out = path.join(__dirname, '_encaps_mantenimiento_2027.sql');
fs.writeFileSync(out, sql, 'utf8');
console.log('OK →', out, '·', rows.length, 'días ·', sql.length, 'chars');
// distribución
const dist = {};
let sims = 0;
for (const r of rows) { const m = r.match(/'banqueo1h','([^']+)'/); if (m) dist[m[1]] = (dist[m[1]] || 0) + 1; else sims++; }
console.log('mini-sims (vie):', sims, '· temas:', JSON.stringify(dist));
