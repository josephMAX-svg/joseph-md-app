// gen_encaps_reshift_2jul_exam20.js — D1=2-jul · EXAMEN FIJO 20-ago (corrección: NO 27-ago).
// Filosofía corregida (Joseph): EXTENDER = días de ESTUDIO (conservar los 17 temas, cero saltos);
// REDUCIR = días de PREGUNTA (repaso) para que todo quepa en 1-jul→20-ago. No importa cuánto material/día.
// - Restaura los 40 días de contenido del backup, re-camina 1-jul→20-ago (examen+dx FIJOS).
// - Weekdays → temas (17, primero) + repaso (rellena lo que quepa); el repaso SOBRANTE se descarta.
// - Sábados (7 en el rango) → 7 bundles de simulacro; el bundle SOBRANTE se FUSIONA en el día-examen
//   (dx, recta final) para no perder ninguna evaluación.
// Sanity: NUNCA descarta un tema (deep_prime). node DATA/_scripts/gen_encaps_reshift_2jul_exam20.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs'); const path = require('path');
const URL = 'https://qacynpqdrorpuegsmtcy.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhY3lucHFkcm9ycHVlZ3NtdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODI3ODIsImV4cCI6MjA4OTk1ODc4Mn0.bQk5OCtaSuKqr31Gve1lZ2XBUQ46IvR50yVBeqDSsZE';
const WD = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const fromISO = s => new Date(s + 'T12:00:00Z'); const iso = d => d.toISOString().slice(0, 10);
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const dow = s => fromISO(s).getUTCDay(); const wd = s => WD[dow(s)];
const START = '2026-07-02', EXAM = '2026-08-20', DX = '2026-08-19';

(async () => {
  const sb = createClient(URL, KEY);
  const { data, error } = await sb.from('study_schedule_reshift25_backup').select('dia,tipo,codigo,extra').order('dia', { ascending: true });
  if (error) { console.error(error); process.exit(1); }
  const weekday = data.filter(r => r.tipo === 'deep_prime' || r.tipo === 'repaso');   // 40 (orden: 17 temas + 23 repaso)
  const sims = data.filter(r => r.tipo === 'simulacro' && (r.extra && r.extra.examDay) !== true);
  const dxRow = data.find(r => r.tipo === 'simulacro' && r.extra && r.extra.examDay === true);
  const examRow = data.find(r => r.tipo === 'examen');

  const assign = []; let cur = START, dia = 0, wi = 0, si = 0;
  while (cur <= EXAM) {
    if (dow(cur) === 0) { cur = addDays(cur, 1); continue; }       // domingo libre
    dia++;
    if (cur === EXAM) assign.push({ old: examRow.dia, dia, fecha: cur, wd: wd(cur) });
    else if (cur === DX) assign.push({ old: dxRow.dia, dia, fecha: cur, wd: wd(cur) });
    else if (dow(cur) === 6) { const r = sims[si++]; if (r) assign.push({ old: r.dia, dia, fecha: cur, wd: wd(cur) }); else dia--; }
    else { const r = weekday[wi++]; if (r) assign.push({ old: r.dia, dia, fecha: cur, wd: wd(cur) }); else dia--; }
    cur = addDays(cur, 1);
  }
  const leftoverWk = weekday.slice(wi);    // repaso sobrante (se descarta)
  const leftoverSim = sims.slice(si);      // bundle(s) de sim sobrante(s) → fusionar en dx
  const topicsLeft = leftoverWk.filter(r => r.tipo === 'deep_prime');
  if (topicsLeft.length) throw new Error('PELIGRO: temas sin fecha: ' + topicsLeft.map(r => r.codigo).join(','));

  const L = ['-- ENCAPS D1=2-jul · EXAMEN FIJO 20-ago · extiende estudio / reduce repaso. backup study_schedule_examen20b_backup', 'BEGIN;'];
  L.push("DROP TABLE IF EXISTS study_schedule_examen20b_backup;");
  L.push("CREATE TABLE study_schedule_examen20b_backup AS SELECT * FROM study_schedule WHERE examen='ENCAPS';");
  L.push("DELETE FROM study_schedule WHERE examen='ENCAPS';");
  L.push("INSERT INTO study_schedule SELECT * FROM study_schedule_reshift25_backup;");
  L.push("UPDATE study_schedule SET dia = dia + 1000 WHERE examen='ENCAPS';");
  for (const a of assign)
    L.push(`UPDATE study_schedule SET dia=${a.dia}, fecha='${a.fecha}', weekday='${a.wd}', updated_at=now() WHERE examen='ENCAPS' AND dia=${a.old + 1000};`);
  // fusionar simulacros sobrantes en el día-examen (dx) para no perder evaluaciones
  const dxNew = assign.find(a => a.old === dxRow.dia).dia;
  for (const r of leftoverSim) {
    L.push(`UPDATE study_schedule t SET extra = jsonb_set(COALESCE(t.extra,'{}'::jsonb), '{sims}', COALESCE(t.extra->'sims','[]'::jsonb) || COALESCE(s.extra->'sims','[]'::jsonb), true), subtema = t.subtema || ' + sims extra (recta final)', updated_at=now() FROM (SELECT extra FROM study_schedule WHERE examen='ENCAPS' AND dia=${r.dia + 1000}) s WHERE t.examen='ENCAPS' AND t.dia=${dxNew};`);
  }
  L.push("DELETE FROM study_schedule WHERE examen='ENCAPS' AND dia >= 1000;"); // borra repaso sobrante + sim fusionado
  L.push('COMMIT;');
  fs.writeFileSync(path.join(__dirname, '_encaps_reshift_2jul_exam20.sql'), L.join('\n'), 'utf8');

  const topics = weekday.filter(r => r.tipo === 'deep_prime').length;
  const ex = assign[assign.length - 1];
  console.log(`OK total_dias=${dia} | weekday=${wi}/${weekday.length} (temas=${topics} TODOS + repaso=${wi - topics}) | repaso descartado=${leftoverWk.length} | sims_sat=${si}/${sims.length} | sim sobrante→dx=${leftoverSim.length} | EXAMEN=${ex.fecha}(${ex.wd})`);
  console.log(`día1=${assign[0].fecha}(${assign[0].wd}) | STUDY_TOTAL_DAYS ENCAPS = ${dia}`);
})();
