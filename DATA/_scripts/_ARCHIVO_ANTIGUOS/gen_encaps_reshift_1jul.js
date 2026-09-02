// gen_encaps_reshift_1jul.js — ÚLTIMA reprogramación: 29-30 jun no se estudió → D1=1-jul.
// Filosofía nueva (Joseph): NO comprimir (no perder días). EXTENDER 1 día y correr el examen.
// → Restaura los 40 días de contenido COMPLETOS desde study_schedule_reshift25_backup (recupera el
//   repaso que la compresión del 25-jun había descartado) y re-camina el calendario desde 26-jun:
//   L-V = contenido (deep_prime/repaso en orden) · Sáb = simulacros · Dom libre · luego dx + EXAMEN.
//   El examen NO es fijo: cae naturalmente tras todo el contenido (se corre ~+1).
// Salida: _encaps_reshift_1jul.sql. node DATA/_scripts/gen_encaps_reshift_1jul.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs'); const path = require('path');
const URL = 'https://qacynpqdrorpuegsmtcy.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhY3lucHFkcm9ycHVlZ3NtdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODI3ODIsImV4cCI6MjA4OTk1ODc4Mn0.bQk5OCtaSuKqr31Gve1lZ2XBUQ46IvR50yVBeqDSsZE';
const WD = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const fromISO = s => new Date(s + 'T12:00:00Z'); const iso = d => d.toISOString().slice(0, 10);
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const dow = s => fromISO(s).getUTCDay(); const wd = s => WD[dow(s)];
const START = '2026-07-01';

(async () => {
  const sb = createClient(URL, KEY);
  // leer el backup COMPLETO (40 contenido + 8 sims + dx + examen)
  const { data, error } = await sb.from('study_schedule_reshift25_backup').select('dia,tipo,codigo,extra').order('dia', { ascending: true });
  if (error) { console.error(error); process.exit(1); }
  const weekday = data.filter(r => r.tipo === 'deep_prime' || r.tipo === 'repaso');      // 40 (en orden de día)
  const sims = data.filter(r => r.tipo === 'simulacro' && (r.extra && r.extra.examDay) !== true); // 8 sáb
  const dxRow = data.find(r => r.tipo === 'simulacro' && r.extra && r.extra.examDay === true);
  const examRow = data.find(r => r.tipo === 'examen');

  const assign = []; let cur = START, dia = 0, wi = 0, si = 0, dxDone = false, done = false;
  while (!done) {
    if (dow(cur) === 0) { cur = addDays(cur, 1); continue; }      // domingo libre (no día)
    if (dow(cur) === 6) {                                          // sábado → simulacro
      if (si < sims.length) { dia++; assign.push({ old: sims[si].dia, dia, fecha: cur, wd: wd(cur) }); si++; }
      cur = addDays(cur, 1); continue;                            // si no quedan sims, sábado vacío (sin día)
    }
    // L-V
    if (wi < weekday.length) { dia++; assign.push({ old: weekday[wi].dia, dia, fecha: cur, wd: wd(cur) }); wi++; }
    else if (!dxDone) { dia++; assign.push({ old: dxRow.dia, dia, fecha: cur, wd: wd(cur) }); dxDone = true; }
    else { dia++; assign.push({ old: examRow.dia, dia, fecha: cur, wd: wd(cur) }); done = true; }
    cur = addDays(cur, 1);
  }
  if (wi !== weekday.length) throw new Error('faltaron weekdayRows: ' + (weekday.length - wi));
  if (si !== sims.length) console.warn('OJO: sims colocados ' + si + '/' + sims.length);

  const L = ['-- ENCAPS reshift +1 → D1=1-jul · EXTENDIDO (no comprime · examen corre). Restaura 40 días de contenido.', 'BEGIN;'];
  L.push("DROP TABLE IF EXISTS study_schedule_reshift1jul_backup;");
  L.push("CREATE TABLE study_schedule_reshift1jul_backup AS SELECT * FROM study_schedule WHERE examen='ENCAPS';");
  // restaurar el contenido COMPLETO (50 filas) desde el backup del 24-jun multitema
  L.push("DELETE FROM study_schedule WHERE examen='ENCAPS';");
  L.push("INSERT INTO study_schedule SELECT * FROM study_schedule_reshift25_backup;");
  // re-datar vía offset anti-colisión PK
  L.push("UPDATE study_schedule SET dia = dia + 1000 WHERE examen='ENCAPS';");
  for (const a of assign)
    L.push(`UPDATE study_schedule SET dia=${a.dia}, fecha='${a.fecha}', weekday='${a.wd}', updated_at=now() WHERE examen='ENCAPS' AND dia=${a.old + 1000};`);
  L.push("DELETE FROM study_schedule WHERE examen='ENCAPS' AND dia >= 1000;"); // por si algo quedó
  L.push('COMMIT;');
  fs.writeFileSync(path.join(__dirname, '_encaps_reshift_1jul.sql'), L.join('\n'), 'utf8');

  const topics = weekday.filter(r => r.tipo === 'deep_prime').length;
  const ex = assign[assign.length - 1];
  console.log(`OK total_dias=${dia} | weekday=${wi} (topics=${topics} + repaso=${wi - topics}) | sims=${si} | dx=${dxDone} | EXAMEN=${ex.fecha}(${ex.wd})`);
  console.log(`día1=${assign[0].fecha}(${assign[0].wd}) | STUDY_TOTAL_DAYS ENCAPS = ${dia}`);
})();
