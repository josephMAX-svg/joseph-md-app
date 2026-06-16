// gen_encaps_sims_v6.sql.js — expande la capacidad de SIMULACROS de ENCAPS a ~35
// (sobreestimado, pedido por Joseph 13-jun tras verificar QxMedic+Theomed por Chrome DevTools).
//   · Conteo real: QX 9 Simulacros Virtuales + 3 ENCAPS oficiales (2025-I/II,2026-I) + ~27 banqueos;
//     Theomed 3 simulacros fechados (biweekly→~8) + 4 EXAMEN TIPO A/B + EXAMEN 2025-II.
//   · Tope 20-ago (decisión del dueño). Examen ENCAPS 2026-II = jue 20-ago (día tope).
//   · 45 temas (L-V) y el inicio 15-jun NO se tocan (ya están en Supabase).
//   · Sólo se RE-CONTENIDAN las filas de simulacros: 9 sábados (2-3 c/u) + días-examen
//     17/18/19-ago (exam-only, 3-4 c/u) → 35 slots; 20-ago = EXAMEN.
//   · Cada slot queda como item chequeable vía extra.sims (itemsForDay los renderiza).
const fs = require('fs');
const path = require('path');

// ── 35 simulacros sobreestimados, con su fuente (pool) ──
const sims = [];
for (let i = 1; i <= 9; i++) sims.push({ fuente: `QX Simulacro Virtual N°${String(i).padStart(2, '0')}`, pool: 'QX-SV' });
['2025-I', '2025-II', '2026-I'].forEach((y) => sims.push({ fuente: `ENCAPS oficial ${y} · banco QX`, pool: 'OFICIAL' }));
['15-may', '29-may', '12-jun', '26-jun', '10-jul', '24-jul', '07-ago', '21-ago'].forEach((d) => sims.push({ fuente: `Theomed Simulacro ${d}`, pool: 'TM' }));
['A-1', 'B-1', 'A-2', 'B-2'].forEach((t) => sims.push({ fuente: `Theomed EXAMEN TIPO ${t}`, pool: 'TM-TIPO' }));
['2023-I', '2023-II', '2024-I', '2024-II'].forEach((y) => sims.push({ fuente: `ENCAPS oficial ${y} · autogestión`, pool: 'OFICIAL-HIST' }));
for (let i = 1; i <= 7; i++) sims.push({ fuente: `Simulacro propio / banco extra #${i}`, pool: 'PROPIO' });
sims.forEach((s, i) => (s.n = i + 1));
if (sims.length !== 35) throw new Error('esperaba 35 sims, hay ' + sims.length);

// ── días-examen y cuántos simulacros caen en cada uno (suma = 35) ──
const dias = [
  { dia: 6, fecha: '2026-06-20', wd: 'Sábado', n: 2, label: 'Sábado de exámenes' },
  { dia: 12, fecha: '2026-06-27', wd: 'Sábado', n: 2, label: 'Sábado de exámenes' },
  { dia: 18, fecha: '2026-07-04', wd: 'Sábado', n: 3, label: 'Sábado de exámenes' },
  { dia: 24, fecha: '2026-07-11', wd: 'Sábado', n: 3, label: 'Sábado de exámenes' },
  { dia: 30, fecha: '2026-07-18', wd: 'Sábado', n: 3, label: 'Sábado de exámenes' },
  { dia: 36, fecha: '2026-07-25', wd: 'Sábado', n: 3, label: 'Sábado de exámenes' },
  { dia: 42, fecha: '2026-08-01', wd: 'Sábado', n: 3, label: 'Sábado de exámenes' },
  { dia: 48, fecha: '2026-08-08', wd: 'Sábado', n: 3, label: 'Sábado de exámenes' },
  { dia: 54, fecha: '2026-08-15', wd: 'Sábado', n: 3, label: 'Sábado de exámenes (MEGA pre-final)' },
  { dia: 55, fecha: '2026-08-17', wd: 'Lunes', n: 4, label: 'DÍA-EXAMEN (exam-only · recta final)' },
  { dia: 56, fecha: '2026-08-18', wd: 'Martes', n: 3, label: 'DÍA-EXAMEN (exam-only · recta final)' },
  { dia: 57, fecha: '2026-08-19', wd: 'Miércoles', n: 3, label: 'DÍA-EXAMEN (exam-only · recta final)' },
];
const totalN = dias.reduce((a, d) => a + d.n, 0);
if (totalN !== 35) throw new Error('la distribución suma ' + totalN + ', no 35');

const q = (s) => "'" + String(s).replace(/'/g, "''") + "'";
const L = [];
L.push('-- ENCAPS v6: capacidad ~35 simulacros (backup study_schedule_backup_v4_20260613)');
L.push('BEGIN;');
let idx = 0;
for (const d of dias) {
  const slice = sims.slice(idx, idx + d.n);
  idx += d.n;
  const rango = `${slice[0].n}-${slice[slice.length - 1].n}`;
  const sub = `${d.label} · Simulacros ${rango} (${d.n}): ` + slice.map((s) => s.fuente).join(' · ');
  const extra = JSON.stringify({
    examDay: d.dia >= 55,
    sims: slice.map((s) => ({ n: s.n, label: `Simulacro #${s.n}`, fuente: s.fuente, pool: s.pool, duracion: '~2h 50min · 100Q' })),
  });
  const primary = JSON.stringify({ clave: slice[0].fuente, label: `Simulacros ${rango} (${d.n})`, duracion: '2h 50min', sims: slice.map((s) => s.n).join(',') });
  L.push(`UPDATE study_schedule SET tipo='simulacro', subtema=${q(sub)}, prioridad=NULL, simulacro=${q(primary)}::jsonb, extra=${q(extra)}::jsonb, updated_at=now() WHERE examen='ENCAPS' AND dia=${d.dia};`);
}
// 20-ago = EXAMEN (día tope)
L.push(`UPDATE study_schedule SET tipo='examen', subtema='EXAMEN ENCAPS 2026-II · día tope del plan (20-ago)', prioridad=NULL, simulacro=NULL, extra=NULL, updated_at=now() WHERE examen='ENCAPS' AND dia=58;`);
L.push('COMMIT;');

fs.writeFileSync(path.join(__dirname, '_encaps_sims_v6.sql'), L.join('\n'), 'utf8');
console.log(`OK · ${sims.length} simulacros en ${dias.length} días-examen + EXAMEN d58(20-ago)`);
console.log('distribución:', dias.map((d) => `${d.fecha}:${d.n}`).join(' '));
console.log('pools:', Object.entries(sims.reduce((m, s) => ((m[s.pool] = (m[s.pool] || 0) + 1), m), {})).map(([k, v]) => `${k}=${v}`).join(' '));
