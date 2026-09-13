-- study_metrics.extra.horarios (examen ENCAPS) · alineado con la regla REAL de la eval anclada (gaps_v3b_encaps.json punto 9)
-- 12-sep-2026 · régimen v5.10 (D1 = lun 14-sep-2026). Aplicado por MCP execute_sql (proyecto qacynpqdrorpuegsmtcy) el 12-sep-2026.
-- Toca SOLO extra->'horarios' (jsonb_set en esa ruta): el resto de `extra` (d1, backup, regimen, exam_date, horarios_legacy_deep_prime…)
-- y las demás columnas de la fila quedan intactos. Estructura idéntica a la anterior (weekday[3] · weekend[2] · apex/hora/titulo/pasos/fuente):
-- la app (EncapsPlanView.tsx) solo lee esos bloques.
-- Qué cambia respecto al texto v5.4 (02-sep-2026):
--   · eval anclada: «si fallas ≥2 → el tema vuelve caliente y DESPLAZA al del día siguiente» era falso. Lo implementado
--     (gen_encaps_semana.js) es: fallos ≥2 → el código queda CALIENTE para el override de la SEMANA SIGUIENTE (máx. 2
--     sustituciones, I-3/V-2 intocables, un crítico solo se cede si ya está ≥85 % con n ≥ 5). Nada se desplaza esa semana.
--   · eval del lunes = 5Q rehechas con OTRO enfoque de los fallos del mini-sim del viernes; martes = código del lunes; etc.
--   · semana 1 (lun 14 y mar 15-sep): PRE-TEST DE ARRANQUE 20Q + 20Q sustituye el contenido del banco del día (no el horario).
--   · fuentes: los runners pre-generados de BANCO_PROPIO (banco_/eval_/minisim_<fecha>.html); QX queda como complemento por área.
UPDATE study_metrics
SET extra = jsonb_set(extra, '{horarios}', $J$
{
 "_nota": "v5.10 (12-sep-2026): 1h/día 16:15-17:15 L-V según DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md · weekday = lun-jue · weekend = plantilla del VIERNES mini-sim (la app la usa solo si today.simulacro está seteado) · sáb/dom libres · el horario deep-prime anterior quedó en horarios_legacy_deep_prime · regla REAL de la eval anclada (gen_encaps_semana.js): fallos ≥2 → código CALIENTE para el override del viernes (semana siguiente); NO desplaza al tema del día siguiente · semana 1 (lun 14 y mar 15-sep): PRE-TEST DE ARRANQUE 40Q (5Q × 8 críticos, ítems reales 2024-2A→2025-2) sustituye el CONTENIDO del banco del día, no el horario",
 "weekday": [
  {
   "apex": false,
   "hora": "16:15-16:30",
   "titulo": "EVAL ANCLADA — 5Q del código de AYER (lunes: fallos del mini-sim)",
   "pasos": [
    {
     "t": "16:15-16:30",
     "d": "5Q del código de AYER, de memoria, sin material: 3 cifras + 2 viñetas, solución al final. Lunes = 5Q rehechas con OTRO enfoque de los fallos del mini-sim del viernes; martes = código del lunes; miércoles = código del martes; jueves = código del miércoles (el viernes no lleva eval: el mini-sim ocupa las 16:15). Si fallas ≥2 → el código queda CALIENTE para el override del viernes (gen_encaps_semana.js: máx. 2 sustituciones/semana, I-3 y V-2 intocables, un crítico solo se cede si ya está ≥85 % con n ≥ 5). NO desplaza al tema del día siguiente. D1 (lun 14-sep): sin eval."
    }
   ],
   "fuente": {
    "url": null,
    "label": "BANCO_PROPIO/eval_<fecha>.html (runner pre-generado: node DATA/_scripts/gen_encaps_minisim.js --eval <fecha>)"
   }
  },
  {
   "apex": true,
   "hora": "16:30-17:10",
   "titulo": "BANCO DEL DÍA — 20-25Q CIEGAS del código y SUB-EJE de la rotación",
   "pasos": [
    {
     "t": "16:30-17:10",
     "d": "16-20Q del código ceñidas al sub-eje del día (◈ Sub-eje de hoy) + 4-5Q del secundario de cola larga, pregunta-por-pregunta con corrección inmediata (método Palmerton) y confianza 1-3 por ítem. Nivel ≥ examen real, distractor = concepto vecino. Orden de fuentes: BANCO_PROPIO (runner) → postests Theomed → banco QX (por área) → sets nuevos (motor 4 factores). Lun 14 y mar 15-sep: PRE-TEST DE ARRANQUE 20Q + 20Q (pretest_arranque_<fecha>.html, modo examen 72 s/Q, solución al final) en vez del banco del día."
    }
   ],
   "fuente": {
    "url": "https://virtualqxmedic.com/bancos-app/dashboard",
    "label": "BANCO_PROPIO/banco_<fecha>.html · complemento: QX Banco de Preguntas (por área, no filtrable por código)"
   }
  },
  {
   "apex": false,
   "hora": "17:10-17:15",
   "titulo": "CIERRE DE 1 LÍNEA — registro + ≤3 APEX",
   "pasos": [
    {
     "t": "17:10-17:15",
     "d": "Exportar el JSON del runner → node DATA/_scripts/gen_encaps_minisim.js --registrar <export.json> (da la línea de cierre; --append para rondas mixtas) → node DATA/_scripts/gen_encaps_semana.js --cerrar \"EXAMEN|tipoRonda|fecha|codigo|n=|seg=|dud=|fallos|t=\" --sql (INSERT en study_progress vía execute_sql; regenera PERFIL_CONOCIMIENTO.md). ≤3 APEX: solo los fallos knowledge/transfer generan tarjeta (OLVIDO/CRONOLOGÍA → Anki) o nota (CONCEPTO/CCSN → Obsidian); los de proceso generan regla de examen."
    }
   ],
   "fuente": {
    "url": null,
    "label": "DATA/ENCAPS/TRACKING_ERRORES (_registro_resoluciones.json · PERFIL_CONOCIMIENTO.md generado)"
   }
  }
 ],
 "weekend": [
  {
   "apex": false,
   "hora": "16:15-16:45",
   "titulo": "🔥 MINI-SIMULACRO 25Q mixtas cronometradas (72s/Q)",
   "pasos": [
    {
     "t": "16:15-16:45",
     "d": "Receta fija (extra del viernes): 8Q II · 7Q I · 5Q V · 3Q III · 2Q IV, 50 % viñeta, ≥10Q críticos, ≥5Q fallos previos con OTRO enfoque, 5-6Q de los 2 códigos de cola larga del viernes. Modo examen estricto, sin ayuda, solución al final (BANCO_PROPIO/minisim_<viernes>.html, pre-generado)."
    }
   ],
   "fuente": {
    "url": "https://virtualqxmedic.com/bancos-app/dashboard",
    "label": "BANCO_PROPIO/minisim_<viernes>.html · complemento: postests Theomed / QX por área"
   }
  },
  {
   "apex": false,
   "hora": "16:45-17:15",
   "titulo": "Corrección + patrón de fallos + cierre semanal",
   "pasos": [
    {
     "t": "16:45-17:15",
     "d": "Corrección 1×1 por código → nota /25 en ▲ SIM (study_sim_scores, sim_n = día) + cierre con tipoRonda=mini_sim y nota=NN (umbral ≥18/25 hacia diciembre; <15/25 dos viernes seguidos → override obligatorio). Luego node DATA/_scripts/gen_encaps_semana.js --sql: % ciego semanal, temas calientes (n ≥ 5 por código) y override de la semana siguiente, que se ACUMULA en SEMANAS/overrides_acumulado.json → node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-09-14 --override SEMANAS/override_<lunes>.json → execute_sql (backup study_schedule_bk_<YYYYMMDD>, DELETE solo modo=MANTENIMIENTO)."
    }
   ],
   "fuente": {
    "url": null,
    "label": "DATA/ENCAPS/TRACKING_ERRORES/SEMANAS (semana_<lunes>.md · override_<lunes>.json · overrides_acumulado.json)"
   }
  }
 ]
}
$J$::jsonb, true)
WHERE examen = 'ENCAPS';
-- verificación: select examen, extra->'horarios'->'_nota', jsonb_array_length(extra->'horarios'->'weekday') wd, jsonb_array_length(extra->'horarios'->'weekend') we from study_metrics where examen='ENCAPS';
