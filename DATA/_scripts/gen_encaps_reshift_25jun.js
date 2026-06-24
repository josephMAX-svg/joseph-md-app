// gen_encaps_reshift_25jun.js — corrimiento +1: 24-jun no se estudió (estructuración) → D1=25-jun.
// NO reconstruye: LEE el estado actual de Supabase (con multi-tema: deep_prime+secundarios, repaso, sims)
// y RE-CAMINA el calendario desde 25-jun preservando el contenido y el rol de cada día:
//   - L-V → siguiente día de contenido (deep_prime/repaso) en su orden actual
//   - Sábado → siguiente bundle de simulacros
//   - 19-ago (dx, día-examen recta final) → bundle dx (extra.examDay=true)
//   - 20-ago → EXAMEN (tope FIJO)
// Examen FIJO 20-ago → el plan queda 1 día más corto: se descarta el ÚLTIMO día de repaso sobrante.
// Salida: _encaps_reshift_25jun.sql (offset trick por dia). node DATA/_scripts/gen_encaps_reshift_25jun.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs'); const path = require('path');
const URL = 'https://qacynpqdrorpuegsmtcy.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhY3lucHFkcm9ycHVlZ3NtdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODI3ODIsImV4cCI6MjA4OTk1ODc4Mn0.bQk5OCtaSuKqr31Gve1lZ2XBUQ46IvR50yVBeqDSsZE';
const WD = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const fromISO = s => new Date(s + 'T12:00:00Z'); const iso = d => d.toISOString().slice(0, 10);
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const dow = s => fromISO(s).getUTCDay(); const wd = s => WD[dow(s)];
const START = '2026-06-25', EXAM = '2026-08-20', DX = '2026-08-19';

(async () => {
  const sb = createClient(URL, KEY);
  const { data, error } = await sb.from('study_schedule').select('dia,fecha,weekday,tipo,codigo,extra')
    .eq('examen', 'ENCAPS').order('dia', { ascending: true });
  if (error) { console.error(error); process.exit(1); }

  // partición por rol, en orden de día actual
  const weekdayRows = data.filter(r => r.tipo === 'deep_prime' || r.tipo === 'repaso'); // L-V (topics + repaso) en orden
  const satRows = data.filter(r => r.tipo === 'simulacro' && !(r.extra && r.extra.examDay)); // 8 sábados
  const dxRow = data.find(r => r.tipo === 'simulacro' && r.extra && r.extra.examDay);          // día-examen recta final
  const examRow = data.find(r => r.tipo === 'examen');

  // re-caminar el calendario desde START
  const assign = []; let cur = START, dia = 0, wi = 0, si = 0;
  while (cur <= EXAM) {
    if (dow(cur) === 0) { cur = addDays(cur, 1); continue; } // domingos libres
    dia++;
    if (cur === EXAM) assign.push({ oldDia: examRow.dia, dia, fecha: cur, wd: wd(cur) });
    else if (cur === DX && dxRow) assign.push({ oldDia: dxRow.dia, dia, fecha: cur, wd: wd(cur) });
    else if (dow(cur) === 6) { const r = satRows[si++]; if (r) assign.push({ oldDia: r.dia, dia, fecha: cur, wd: wd(cur) }); }
    else { const r = weekdayRows[wi++]; if (r) assign.push({ oldDia: r.dia, dia, fecha: cur, wd: wd(cur) }); }
    cur = addDays(cur, 1);
  }
  const leftover = weekdayRows.slice(wi).map(r => r.dia); // repaso sobrante (plan 1 día más corto)
  // sanity: ningún topic (deep_prime) debe quedar sin asignar
  const dpLeft = weekdayRows.slice(wi).filter(r => r.tipo === 'deep_prime');
  if (dpLeft.length) throw new Error('PELIGRO: quedaron temas deep_prime sin fecha: ' + dpLeft.map(r => r.codigo).join(','));

  const L = ['-- ENCAPS reshift +1 → D1=25-jun (examen FIJO 20-ago). Preserva multi-tema. backup study_schedule_reshift25_backup','BEGIN;'];
  L.push("DROP TABLE IF EXISTS study_schedule_reshift25_backup;");
  L.push("CREATE TABLE study_schedule_reshift25_backup AS SELECT * FROM study_schedule WHERE examen='ENCAPS';");
  L.push("UPDATE study_schedule SET dia = dia + 1000 WHERE examen='ENCAPS';"); // offset anti-colisión PK
  for (const a of assign)
    L.push(`UPDATE study_schedule SET dia=${a.dia}, fecha='${a.fecha}', weekday='${a.wd}', updated_at=now() WHERE examen='ENCAPS' AND dia=${a.oldDia + 1000};`);
  for (const old of leftover)
    L.push(`DELETE FROM study_schedule WHERE examen='ENCAPS' AND dia=${old + 1000};`);
  L.push("DELETE FROM study_schedule WHERE examen='ENCAPS' AND dia >= 1000;"); // limpieza por si algo quedó
  L.push('COMMIT;');
  fs.writeFileSync(path.join(__dirname, '_encaps_reshift_25jun.sql'), L.join('\n'), 'utf8');

  const topics = weekdayRows.filter(r => r.tipo === 'deep_prime').length;
  console.log(`OK total_dias=${dia} | weekday_slots=${wi}/${weekdayRows.length} (topics=${topics}) | sims_sat=${si}/${satRows.length} | dx=${dxRow ? 'sí' : 'no'} | examen=${assign[assign.length - 1].fecha}(${assign[assign.length - 1].wd})`);
  console.log(`leftover repaso descartado: ${leftover.length} | día1=${assign[0].fecha}(${assign[0].wd}) oldDia=${assign[0].oldDia}`);
  console.log(`STUDY_TOTAL_DAYS ENCAPS = ${dia}`);
})();
