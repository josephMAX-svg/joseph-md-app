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
  const { data, error } = await sb.from('study_schedule_reshift25_backup').select('dia,tipo,codigo,subtema,temas_secundarios,extra').order('dia', { ascending: true });
  if (error) { console.error(error); process.exit(1); }
  const temas = data.filter(r => r.tipo === 'deep_prime');                       // 17
  const sims = data.filter(r => r.tipo === 'simulacro' && !(r.extra && r.extra.examDay === true)); // 8 bundles
  const dxRow = data.find(r => r.tipo === 'simulacro' && r.extra && r.extra.examDay === true);
  const examRow = data.find(r => r.tipo === 'examen');

  // Cuerpo del plan = días no-domingo entre START y EXAM (exclusivo del examen).
  const bodyDays = []; for (let c = START; c < EXAM; c = addDays(c, 1)) if (dow(c) !== 0) bodyDays.push(c);
  const nAssign = Math.min(temas.length, bodyDays.length);
  const mergedTemas = temas.slice(nAssign);   // temas que NO caben como día propio → se fusionan como secundario
  // Tope de seguridad: hasta 4 temas excedentes se reparten UNO por día en los últimos días-tema
  // (con 21-jul→5-ago quedan 13 días de cuerpo y sobran 4 = IV-1+IV-2/I-2/III-2/III-8, los MENOS
  // rentables del pronóstico v2 → se fusionan como secundario BAJA). 5+ empezaría a apilar → aborta.
  if (mergedTemas.length > 4) throw new Error(`PELIGRO: ${bodyDays.length} días de cuerpo, ${mergedTemas.length} temas a fusionar (>4) — ventana demasiado corta`);

  const assign = []; let dia = 0;
  for (let i = 0; i < nAssign; i++) { dia++; assign.push({ old: temas[i].dia, dia, fecha: bodyDays[i], wd: wd(bodyDays[i]) }); }
  const rest = bodyDays.slice(nAssign);   // días sobrantes tras asignar los temas que caben
  const repaso = data.filter(r => r.tipo === 'repaso'); let ri = 0;
  let dxNew, fused;
  if (rest.length >= 1) {
    // MODO dx-STANDALONE: repaso rellena los sobrantes menos 1; dx en el último día sobrante
    for (let j = 0; j < rest.length - 1; j++) { const r = repaso[ri++]; if (!r) break; dia++; assign.push({ old: r.dia, dia, fecha: rest[j], wd: wd(rest[j]) }); }
    dia++; assign.push({ old: dxRow.dia, dia, fecha: rest[rest.length - 1], wd: wd(rest[rest.length - 1]) }); dxNew = dia; fused = false;
  } else {
    // MODO dx-FUSIONADO: sin día extra → el ÚLTIMO día-tema ES el dx (tema + TODOS los sims agrupados)
    dxNew = assign[assign.length - 1].dia; fused = true;
  }
  const dxFecha = fused ? assign[assign.length - 1].fecha : rest[rest.length - 1];
  const lastTemaDia = assign[nAssign - 1].dia;   // día donde se fusionan los temas excedentes (como secundario)
  dia++; assign.push({ old: examRow.dia, dia, fecha: EXAM, wd: wd(EXAM) });   // examen el último día

  const L = [`-- ENCAPS COMPRIMIDO D1=${START} · EXAMEN ${EXAM} · 17 temas + sims agrupados en dx ${dxFecha}${fused ? ' (FUSIONADO en último día-tema)' : ''}. backup ${BK}`, 'BEGIN;'];
  L.push(`DROP TABLE IF EXISTS ${BK};`);
  L.push(`CREATE TABLE ${BK} AS SELECT * FROM study_schedule WHERE examen='ENCAPS';`);
  L.push("DELETE FROM study_schedule WHERE examen='ENCAPS';");
  L.push("INSERT INTO study_schedule SELECT * FROM study_schedule_reshift25_backup;");
  L.push("UPDATE study_schedule SET dia = dia + 1000 WHERE examen='ENCAPS';");
  for (const a of assign)
    L.push(`UPDATE study_schedule SET dia=${a.dia}, fecha='${a.fecha}', weekday='${a.wd}', updated_at=now() WHERE examen='ENCAPS' AND dia=${a.old + 1000};`);
  // FUSIONAR los temas excedentes como SECUNDARIO, DISTRIBUIDOS en los últimos días-tema (uno c/u, no
  // todos apilados en un solo día). Sin perder nada; sus videos los re-aplica gen_encaps_cola_live porque
  // quedan como código secundario. El row original queda en 1000+ y lo borra el cleanup final.
  mergedTemas.forEach((m, mi) => {
    // reparte hacia atrás desde el último día-tema: merge0→último, merge1→penúltimo, …
    const tgt = assign[Math.max(0, nAssign - 1 - mi)].dia;
    // Lleva el tema fusionado + TODOS sus propios secundarios (si no, se perderían sus sub-temas).
    const secs = [{ codigo: m.codigo, subtema: m.subtema || '', prioridad: 'compl (junta ventana corta)' }, ...((m.temas_secundarios) || [])];
    const sec = JSON.stringify(secs).replace(/'/g, "''");
    L.push(`UPDATE study_schedule SET temas_secundarios = COALESCE(temas_secundarios,'[]'::jsonb) || '${sec}'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND dia=${tgt};`);
  });
  // AGRUPAR simulacros en el dx (los 8 bundles; si el dx está fusionado, también los del dxRow).
  const simsToMerge = fused ? [...sims, dxRow] : sims;
  for (const s of simsToMerge) {
    L.push(`UPDATE study_schedule t SET extra = jsonb_set(COALESCE(t.extra,'{}'::jsonb), '{sims}', COALESCE(t.extra->'sims','[]'::jsonb) || COALESCE(s.extra->'sims','[]'::jsonb), true), subtema = t.subtema || ' + sims extra (recta final)', updated_at=now() FROM (SELECT extra FROM study_schedule WHERE examen='ENCAPS' AND dia=${s.dia + 1000}) s WHERE t.examen='ENCAPS' AND t.dia=${dxNew};`);
  }
  L.push("DELETE FROM study_schedule WHERE examen='ENCAPS' AND dia >= 1000;"); // borra repaso sobrante + sims agrupados
  L.push('COMMIT;');
  fs.writeFileSync(path.join(__dirname, '_encaps_reshift_compress.sql'), L.join('\n'), 'utf8');

  console.log(`OK total_dias=${dia} | temas=${temas.length} (TODOS: ${nAssign} con día propio + ${mergedTemas.length} fusionado como secundario en día ${lastTemaDia} = ${mergedTemas.map(m=>m.codigo).join(',')||'—'}) | sims agrupados=${simsToMerge.length} en dx=${dxFecha}(${wd(dxFecha)})${fused ? ' [FUSIONADO]' : ''} | EXAMEN=${EXAM}(${wd(EXAM)})`);
  console.log(`día1=${assign[0].fecha}(${assign[0].wd}) | STUDY_TOTAL_DAYS ENCAPS = ${dia}`);
})();
