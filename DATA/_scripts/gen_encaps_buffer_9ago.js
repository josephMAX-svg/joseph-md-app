// gen_encaps_buffer_9ago.js — tramo final ENCAPS. El examen REAL es dom 9-ago; el CONTENIDO cierra el
// 5-ago (límite), y 6→9-ago = margen (Joseph: nada libre PERO 8-ago = MEDIO DÍA para no quemarse antes
// del examen). Distribuye los 35 simulacros 15/15/5 en 6/7/8-ago (práctica en condición de examen espaciada
// + víspera ligera que protege 7h sueño). NO toca los días-tema; solo reescribe la cola:
//   D1=23-jul: contenido = d1..d12 (23-jul→5-ago), placeholder-examen = d13(6-ago) con sims fusionados en d12.
//   Resultado: d13=6-ago sim, d14=7-ago sim, d15=8-ago MEDIO DÍA, d16=9-ago EXAMEN. STUDY_TOTAL_DAYS=16.
//   node DATA/_scripts/gen_encaps_buffer_9ago.js   (emite _encaps_buffer_9ago.sql; aplicar por MCP execute_sql)
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs'); const path = require('path');
const URL = 'https://qacynpqdrorpuegsmtcy.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhY3lucHFkcm9ycHVlZ3NtdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODI3ODIsImV4cCI6MjA4OTk1ODc4Mn0.bQk5OCtaSuKqr31Gve1lZ2XBUQ46IvR50yVBeqDSsZE';
const j = o => JSON.stringify(o).replace(/'/g, "''");
const LAST = 12;          // último día-tema (donde el compress fusionó los sims)
const EXAM_DIA = 16, EXAM_FECHA = '2026-08-09';

(async () => {
  const sb = createClient(URL, KEY);
  const { data, error } = await sb.from('study_schedule').select('dia,extra').eq('examen', 'ENCAPS').eq('dia', LAST).single();
  if (error) { console.error(error); process.exit(1); }
  const sims = (data.extra && data.extra.sims) || [];
  const b1 = sims.slice(0, 15), b2 = sims.slice(15, 30), b3 = sims.slice(30);   // 15 / 15 / 5 (8-ago ligero)
  const exBuffer = (act, min, batch) => j({
    actividad: act, accion: 'Simulacro modo examen (72s/Q) + cosecha de errores + repaso espaciado de críticos',
    vueltas: 0, minObjetivo: min, sims: batch, tierCobertura: 'BUFFER',
  });
  const ins = (dia, fecha, wd, tipo, subt, ex) =>
    `INSERT INTO study_schedule (examen,dia,fecha,weekday,tipo,codigo,subtema,prioridad,modo,videos,theomed,material_comp,extra,temas_secundarios,updated_at) ` +
    `VALUES ('ENCAPS',${dia},'${fecha}','${wd}','${tipo}',NULL,'${subt.replace(/'/g, "''")}','ALTA','A','[]'::jsonb,'[]'::jsonb,'[]'::jsonb,'${ex}'::jsonb,'[]'::jsonb,now());`;

  const L = [
    `-- ENCAPS buffer 6->9-ago · D1=23-jul · contenido LÍMITE 5-ago (d${LAST}) · examen REAL 9-ago (Dom, d${EXAM_DIA}) · sims 35 -> ${b1.length}/${b2.length}/${b3.length} en 6/7/8-ago · 8-ago = MEDIO DÍA`,
    'BEGIN;',
    // 1) último día-tema: quitar los sims fusionados y restaurar el subtema (regexp, sin hardcode)
    `UPDATE study_schedule SET extra = extra - 'sims', subtema = regexp_replace(subtema, ' \\+ sims extra.*$', ''), updated_at=now() WHERE examen='ENCAPS' AND dia=${LAST};`,
    // 2) mover el EXAMEN (placeholder del generador) a 9-ago
    `UPDATE study_schedule SET dia=${EXAM_DIA}, fecha='${EXAM_FECHA}', weekday='Domingo', subtema='EXAMEN ENCAPS 2026-II · FECHA REAL 9-ago (el contenido cerró el 5-ago)', updated_at=now() WHERE examen='ENCAPS' AND tipo='examen';`,
    // 3) buffer 6->8-ago (nada libre, pero 8-ago = MEDIO DÍA para no quemarse)
    ins(13, '2026-08-06', 'Jueves', 'simulacro', 'BUFFER (margen al examen real 9-ago) · Repaso espaciado I-3/V-2/II-3/II-1/II-8/III-5/II-11 + simulacro completo modo examen', exBuffer('Buffer + simulacro', 150, b1)),
    ins(14, '2026-08-07', 'Viernes', 'simulacro', 'BUFFER · Repaso ligero + simulacro completo modo examen + cosecha de errores acumulados', exBuffer('Buffer + simulacro', 150, b2)),
    ins(15, '2026-08-08', 'Sábado', 'repaso', '🌓 MEDIO DÍA (víspera −1) · SOLO hasta mediodía: 1-2 banqueos cortos + repaso de los 7 críticos + mapas. TARDE LIBRE = descanso real (anti-burnout, dormir 7h; NO trasnochar antes del examen)', exBuffer('Medio día + tarde libre', 90, b3)),
    'COMMIT;',
  ];
  fs.writeFileSync(path.join(__dirname, '_encaps_buffer_9ago.sql'), L.join('\n'), 'utf8');
  console.log(`OK sims=${sims.length} -> ${b1.length}/${b2.length}/${b3.length} · buffer 6->8-ago (8-ago MEDIO DÍA) + EXAMEN 9-ago (Dom) · STUDY_TOTAL_DAYS ENCAPS = ${EXAM_DIA}`);
})();
