// gen_encaps_remap_16jun.sql.js — ENCAPS v7 (15-jun): HOY (15-jun) no se estudió →
// el plan arranca MAÑANA 16-jun, pero el EXAMEN sigue FIJO el 20-ago (tope inamovible).
// Se absorbe el día perdido en la recta final: 45 temas (L-V), 9 sábados de simulacros +
// 2 días-examen (18/19-ago) → 35 simulacros, EXAMEN 20-ago. Ningún tema ni simulacro se
// pierde; el contenido de los temas (videos/theomed/material) se preserva (UPDATE por codigo).
// Salida: _encaps_remap_16jun.sql (aplicar vía Supabase).
const fs = require('fs'); const path = require('path');
const WD = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const fromISO = (s) => new Date(s + 'T12:00:00Z'); const iso = (d) => d.toISOString().slice(0, 10);
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const dow = (s) => fromISO(s).getUTCDay(); const wd = (s) => WD[dow(s)];
const q = (s) => "'" + String(s).replace(/'/g, "''") + "'";

// 45 temas en orden (codigo) — clave para preservar contenido
const topics = ['II-3','II-1','II-2','I-4','II-4','II-6','V-1','II-11','I-1','I-2','I-3','II-5','II-7','II-8','II-9','II-10','III-1','III-3','III-9','V-2','V-6','IV-1','I-5+I-6','I-7','I-8','I-9','I-11+I-12','II-12','II-13','III-2','III-5','III-6+III-10','III-8','IV-2','IV-3','IV-4','IV-5','IV-6','IV-7','V-3','V-7','V-10','I-10','III-4','III-7'];
// 35 simulacros sobreestimados (mismas fuentes que v6)
const sims = [];
for (let i = 1; i <= 9; i++) sims.push(`QX Simulacro Virtual N°${String(i).padStart(2,'0')}`);
['2025-I','2025-II','2026-I'].forEach(y => sims.push(`ENCAPS oficial ${y} · banco QX`));
['15-may','29-may','12-jun','26-jun','10-jul','24-jul','07-ago','21-ago'].forEach(d => sims.push(`Theomed Simulacro ${d}`));
['A-1','B-1','A-2','B-2'].forEach(t => sims.push(`Theomed EXAMEN TIPO ${t}`));
['2023-I','2023-II','2024-I','2024-II'].forEach(y => sims.push(`ENCAPS oficial ${y} · autogestión`));
for (let i = 1; i <= 7; i++) sims.push(`Simulacro propio / banco extra #${i}`);
if (topics.length !== 45 || sims.length !== 35) throw new Error('counts off: ' + topics.length + '/' + sims.length);

const START = '2026-06-16', EXAM = '2026-08-20';
const DIAS_EXAMEN = new Set(['2026-08-18', '2026-08-19']); // exam-only (recta final)
// distribución de simulacros por día-examen (en orden de aparición): sáb 2-3, días-examen 5
const satCounts = [2, 2, 3, 3, 3, 3, 3, 3, 3]; // 9 sábados = 25
const dxCounts = [5, 5];                        // 2 días-examen = 10  → total 35

// Caminar el calendario 16-jun → 20-ago, asignar roles
const rows = []; let cur = START, dia = 0, ti = 0, si = 0, satI = 0, dxI = 0;
while (cur <= EXAM) {
  if (dow(cur) === 0) { cur = addDays(cur, 1); continue; } // domingo libre
  dia++;
  if (cur === EXAM) { rows.push({ dia, fecha: cur, wd: wd(cur), role: 'examen' }); }
  else if (DIAS_EXAMEN.has(cur)) { const n = dxCounts[dxI++]; rows.push({ dia, fecha: cur, wd: wd(cur), role: 'dx', sims: sims.slice(si, si + n) }); si += n; }
  else if (dow(cur) === 6) { const n = satCounts[satI++] ?? 2; rows.push({ dia, fecha: cur, wd: wd(cur), role: 'sat', sims: sims.slice(si, si + n) }); si += n; }
  else { rows.push({ dia, fecha: cur, wd: wd(cur), role: 'topic', codigo: topics[ti++] }); }
  cur = addDays(cur, 1);
}
if (ti !== 45) throw new Error('temas colocados=' + ti);
if (si !== 35) throw new Error('sims colocados=' + si);
const TOTAL = dia;

const L = [];
L.push('-- ENCAPS v7 (16-jun, examen FIJO 20-ago) · backup study_schedule_backup_v4_20260613');
L.push('BEGIN;');
L.push("UPDATE study_schedule SET dia = dia + 1000 WHERE examen='ENCAPS';");
// temas: UPDATE por codigo (contenido intacto)
for (const r of rows.filter(x => x.role === 'topic')) {
  L.push(`UPDATE study_schedule SET dia=${r.dia}, fecha=${q(r.fecha)}, weekday=${q(r.wd)}, tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND codigo=${q(r.codigo)};`);
}
L.push("DELETE FROM study_schedule WHERE examen='ENCAPS' AND dia >= 1000;");
const cols = '(examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, extra, updated_at)';
for (const r of rows.filter(x => x.role === 'sat' || x.role === 'dx')) {
  const ini = r.sims[0], n = r.sims.length, rango = `${sims.indexOf(r.sims[0]) + 1}-${sims.indexOf(r.sims[r.sims.length - 1]) + 1}`;
  const label = r.role === 'dx' ? 'DÍA-EXAMEN (exam-only · recta final)' : 'Sábado de exámenes';
  const sub = `${label} · Simulacros ${rango} (${n}): ${r.sims.join(' · ')}`;
  const extra = JSON.stringify({ examDay: r.role === 'dx', sims: r.sims.map((fu, k) => ({ n: sims.indexOf(fu) + 1, label: `Simulacro #${sims.indexOf(fu) + 1}`, fuente: fu, duracion: '~2h 50min · 100Q' })) });
  const prim = JSON.stringify({ clave: ini, label: `Simulacros ${rango} (${n})`, duracion: '2h 50min' });
  L.push(`INSERT INTO study_schedule ${cols} VALUES ('ENCAPS', ${r.dia}, ${q(r.fecha)}, ${q(r.wd)}, 'simulacro', ${q(sub)}, NULL, ${q(prim)}::jsonb, ${q(extra)}::jsonb, now());`);
}
const ex = rows.find(x => x.role === 'examen');
L.push(`INSERT INTO study_schedule ${cols} VALUES ('ENCAPS', ${ex.dia}, ${q(ex.fecha)}, ${q(ex.wd)}, 'examen', 'EXAMEN ENCAPS 2026-II · día tope del plan (20-ago)', NULL, NULL, NULL, now());`);
L.push('COMMIT;');

fs.writeFileSync(path.join(__dirname, '_encaps_remap_16jun.sql'), L.join('\n'), 'utf8');
const topRows = rows.filter(x => x.role === 'topic');
console.log(`OK · total=${TOTAL} · temas=${ti} (d1=${topRows[0].fecha}…dN=${topRows[topRows.length - 1].fecha}) · simulacros=${si} · examen=${ex.fecha} (${ex.wd})`);
console.log('días-examen:', rows.filter(x => x.role === 'dx').map(x => x.fecha).join(', '));
console.log('D1=16-jun · TOTAL para encapsPlan.ts =', TOTAL);
