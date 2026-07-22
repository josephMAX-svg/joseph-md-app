// gen_encaps_buffer_9ago.js — Joseph 20-jul: el examen REAL es el 9-ago, pero el CONTENIDO debe terminar
// el 5-ago (límite), dejando 6→9-ago de margen para repaso/simulacros/descanso. Esto además ARREGLA los
// 3 riesgos MEDIA que marcó el workflow: (1) distribuye los 35 simulacros (antes amontonados el 4-ago) en
// 5/6/7-ago = práctica en condición de examen DISTRIBUIDA; (2) 8-ago = TAPER (víspera ligera, defiende 7h
// sueño); (3) repaso espaciado de los críticos en el buffer. NO toca los 13 días-tema (21-jul→4-ago, ya
// verificados 40/40). Solo reescribe el tramo final: limpia d13, inserta buffer d14-d17, mueve examen a d18.
//   node DATA/_scripts/gen_encaps_buffer_9ago.js   (emite _encaps_buffer_9ago.sql; aplicar por MCP execute_sql)
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs'); const path = require('path');
const URL = 'https://qacynpqdrorpuegsmtcy.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhY3lucHFkcm9ycHVlZ3NtdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODI3ODIsImV4cCI6MjA4OTk1ODc4Mn0.bQk5OCtaSuKqr31Gve1lZ2XBUQ46IvR50yVBeqDSsZE';
const j = o => JSON.stringify(o).replace(/'/g, "''");

(async () => {
  const sb = createClient(URL, KEY);
  const { data, error } = await sb.from('study_schedule').select('dia,extra').eq('examen', 'ENCAPS').eq('dia', 13).single();
  if (error) { console.error(error); process.exit(1); }
  const sims = (data.extra && data.extra.sims) || [];
  const b1 = sims.slice(0, 12), b2 = sims.slice(12, 24), b3 = sims.slice(24);   // 12 / 12 / 11
  const exBuffer = (act, min, batch) => j({
    actividad: act, accion: 'Simulacro modo examen (72s/Q) + cosecha de errores + repaso espaciado de críticos',
    vueltas: 0, minObjetivo: min, sims: batch, tierCobertura: 'BUFFER',
  });
  const ins = (dia, fecha, wd, tipo, subt, ex) =>
    `INSERT INTO study_schedule (examen,dia,fecha,weekday,tipo,codigo,subtema,prioridad,modo,videos,theomed,material_comp,extra,temas_secundarios,updated_at) ` +
    `VALUES ('ENCAPS',${dia},'${fecha}','${wd}','${tipo}',NULL,'${subt.replace(/'/g, "''")}','ALTA','A','[]'::jsonb,'[]'::jsonb,'[]'::jsonb,'${ex}'::jsonb,'[]'::jsonb,now());`;

  const L = [
    `-- ENCAPS buffer 6->9-ago · D1=22-jul · contenido LÍMITE 5-ago (d13) · examen REAL 9-ago (Dom, d17) · sims 35 distribuidos ${b1.length}/${b2.length}/${b3.length} en 6/7/8-ago`,
    'BEGIN;',
    // 1) d13 (5-ago III-9): quitar los 35 sims amontonados y restaurar el subtema limpio
    "UPDATE study_schedule SET extra = extra - 'sims', subtema='Derechos paciente', updated_at=now() WHERE examen='ENCAPS' AND dia=13;",
    // 2) mover el EXAMEN de 6-ago(d14, placeholder del generador) a 9-ago(d17) — la fecha real
    "UPDATE study_schedule SET dia=17, fecha='2026-08-09', weekday='Domingo', subtema='EXAMEN ENCAPS 2026-II · FECHA REAL 9-ago (el contenido cerró el 5-ago)', updated_at=now() WHERE examen='ENCAPS' AND tipo='examen';",
    // 3) buffer 6->8-ago (nada queda libre: los 3 días llevan simulacros; el 8-ago es recta final ligera + descanso)
    ins(14, '2026-08-06', 'Jueves', 'simulacro', 'BUFFER (margen al examen real 9-ago) · Repaso espaciado I-3/V-2/II-3/II-1/II-8/III-5/II-11 + simulacro completo modo examen', exBuffer('Buffer + simulacro', 150, b1)),
    ins(15, '2026-08-07', 'Viernes', 'simulacro', 'BUFFER · Repaso ligero + simulacro completo modo examen + cosecha de errores acumulados', exBuffer('Buffer + simulacro', 150, b2)),
    ins(16, '2026-08-08', 'Sábado', 'repaso', 'RECTA FINAL LIGERA (víspera −1) · Últimos simulacros a demanda + repaso de críticos + mapas; parar temprano, NO trasnochar (7h sueño intocables)', exBuffer('Recta final ligera + descanso', 120, b3)),
    'COMMIT;',
  ];
  fs.writeFileSync(path.join(__dirname, '_encaps_buffer_9ago.sql'), L.join('\n'), 'utf8');
  console.log(`OK sims=${sims.length} -> ${b1.length}/${b2.length}/${b3.length} · buffer 5->8-ago + EXAMEN 9-ago (Dom) · STUDY_TOTAL_DAYS ENCAPS = 18`);
})();
