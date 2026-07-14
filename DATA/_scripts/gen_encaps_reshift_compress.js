// gen_encaps_reshift_compress.js — RESHIFT COMPRIMIDO: mete los 17 temas + todos los simulacros en una
// ventana corta START→EXAM (Joseph 14-jul: ENCAPS debe TERMINAR el 5-ago). "Junta" = usa TODOS los días
// no-domingo para TEMAS (incl. sábados), AGRUPA los 8 bundles de simulacro en el dx (examen-espejo), y
// deja el examen el último día. Sin repaso standalone (el repaso se interleava en los bloques diarios).
// NADA se pierde: 17 temas (+ secundarios = 40 códigos) + 8 sims (en dx) + examen.
//   node DATA/_scripts/gen_encaps_reshift_compress.js 2026-07-15 2026-08-05
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs'); const path = require('path');
const URL = 'https://qacynpqdrorpuegsmtcy.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhY3lucHFkcm9ycHVlZ3NtdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODI3ODIsImV4cCI6MjA4OTk1ODc4Mn0.bQk5OCtaSuKqr31Gve1lZ2XBUQ46IvR50yVBeqDSsZE';
const WD = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const fromISO = s => new Date(s + 'T12:00:00Z'); const iso = d => d.toISOString().slice(0, 10);
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const dow = s => fromISO(s).getUTCDay(); const wd = s => WD[dow(s)];
const START = process.argv[2] || '2026-07-15', EXAM = process.argv[3] || '2026-08-05';
if (!/^20\d\d-\d\d-\d\d$/.test(START) || !/^20\d\d-\d\d-\d\d$/.test(EXAM)) throw new Error('fechas inválidas');
// DX = día no-domingo inmediatamente anterior al examen
let DX = addDays(EXAM, -1); while (dow(DX) === 0) DX = addDays(DX, -1);
if (START >= DX) throw new Error('START debe ser anterior al dx');
const BK = 'study_schedule_bk_' + START.replace(/-/g, '').slice(4);

(async () => {
  const sb = createClient(URL, KEY);
  const { data, error } = await sb.from('study_schedule_reshift25_backup').select('dia,tipo,codigo,extra').order('dia', { ascending: true });
  if (error) { console.error(error); process.exit(1); }
  const temas = data.filter(r => r.tipo === 'deep_prime');                       // 17
  const sims = data.filter(r => r.tipo === 'simulacro' && !(r.extra && r.extra.examDay === true)); // 8 bundles
  const dxRow = data.find(r => r.tipo === 'simulacro' && r.extra && r.extra.examDay === true);
  const examRow = data.find(r => r.tipo === 'examen');

  // Días no-domingo disponibles para TEMAS = todos entre START y (DX exclusivo)
  const topicDays = []; for (let c = START; c < DX; c = addDays(c, 1)) if (dow(c) !== 0) topicDays.push(c);
  if (topicDays.length < temas.length)
    throw new Error(`PELIGRO: ${topicDays.length} días < ${temas.length} temas — ventana muy corta, no cabe sin fusionar temas`);

  const assign = []; let dia = 0;
  temas.forEach((t, i) => { dia++; assign.push({ old: t.dia, dia, fecha: topicDays[i], wd: wd(topicDays[i]) }); });
  // repaso de relleno si sobran días-tema (no debería con ventana ajustada)
  const repaso = data.filter(r => r.tipo === 'repaso'); let ri = 0;
  for (let j = temas.length; j < topicDays.length; j++) { const r = repaso[ri++]; if (!r) break; dia++; assign.push({ old: r.dia, dia, fecha: topicDays[j], wd: wd(topicDays[j]) }); }
  // dx + examen
  dia++; assign.push({ old: dxRow.dia, dia, fecha: DX, wd: wd(DX) }); const dxNew = dia;
  dia++; assign.push({ old: examRow.dia, dia, fecha: EXAM, wd: wd(EXAM) });

  const L = [`-- ENCAPS COMPRIMIDO D1=${START} · EXAMEN ${EXAM} · 17 temas + sims agrupados en dx ${DX}. backup ${BK}`, 'BEGIN;'];
  L.push(`DROP TABLE IF EXISTS ${BK};`);
  L.push(`CREATE TABLE ${BK} AS SELECT * FROM study_schedule WHERE examen='ENCAPS';`);
  L.push("DELETE FROM study_schedule WHERE examen='ENCAPS';");
  L.push("INSERT INTO study_schedule SELECT * FROM study_schedule_reshift25_backup;");
  L.push("UPDATE study_schedule SET dia = dia + 1000 WHERE examen='ENCAPS';");
  for (const a of assign)
    L.push(`UPDATE study_schedule SET dia=${a.dia}, fecha='${a.fecha}', weekday='${a.wd}', updated_at=now() WHERE examen='ENCAPS' AND dia=${a.old + 1000};`);
  // AGRUPAR los 8 bundles de simulacro en el dx (examen-espejo, recta final)
  for (const s of sims) {
    L.push(`UPDATE study_schedule t SET extra = jsonb_set(COALESCE(t.extra,'{}'::jsonb), '{sims}', COALESCE(t.extra->'sims','[]'::jsonb) || COALESCE(s.extra->'sims','[]'::jsonb), true), subtema = t.subtema || ' + sims extra (recta final)', updated_at=now() FROM (SELECT extra FROM study_schedule WHERE examen='ENCAPS' AND dia=${s.dia + 1000}) s WHERE t.examen='ENCAPS' AND t.dia=${dxNew};`);
  }
  L.push("DELETE FROM study_schedule WHERE examen='ENCAPS' AND dia >= 1000;"); // borra repaso sobrante + sims agrupados
  L.push('COMMIT;');
  fs.writeFileSync(path.join(__dirname, '_encaps_reshift_compress.sql'), L.join('\n'), 'utf8');

  console.log(`OK total_dias=${dia} | temas=${temas.length} (TODOS) en días 1-${temas.length} | repaso relleno=${ri} | sims agrupados en dx=${sims.length} | dx=${DX}(${wd(DX)}) | EXAMEN=${EXAM}(${wd(EXAM)})`);
  console.log(`día1=${assign[0].fecha}(${assign[0].wd}) | STUDY_TOTAL_DAYS ENCAPS = ${dia}`);
})();
