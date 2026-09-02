-- ENCAPS D1 = DOM 26-jul-2026 · contenido cierra 6-ago · 7-ago mock1 · 8-ago medio día · 9-ago EXAMEN
-- Domingos 26-jul y 2-ago = 18:00-22:00 (4h). Los 7 críticos con día COMPLETO entre semana.
BEGIN;
DROP TABLE IF EXISTS study_schedule_bk_0726;
CREATE TABLE study_schedule_bk_0726 AS SELECT * FROM study_schedule WHERE examen='ENCAPS';
UPDATE study_schedule SET dia=101, fecha='2026-07-26', weekday='Domingo', temas_secundarios='[]'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND codigo='I-5+I-6' AND tipo='deep_prime';
UPDATE study_schedule SET dia=102, fecha='2026-07-27', weekday='Lunes', temas_secundarios='[]'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND codigo='I-3' AND tipo='deep_prime';
UPDATE study_schedule SET dia=103, fecha='2026-07-28', weekday='Martes', temas_secundarios='[]'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND codigo='V-2' AND tipo='deep_prime';
UPDATE study_schedule SET dia=104, fecha='2026-07-29', weekday='Miércoles', temas_secundarios='[]'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND codigo='II-1' AND tipo='deep_prime';
UPDATE study_schedule SET dia=105, fecha='2026-07-30', weekday='Jueves', temas_secundarios='[]'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND codigo='II-3' AND tipo='deep_prime';
UPDATE study_schedule SET dia=106, fecha='2026-07-31', weekday='Viernes', temas_secundarios='[]'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND codigo='III-5' AND tipo='deep_prime';
UPDATE study_schedule SET dia=107, fecha='2026-08-01', weekday='Sábado', temas_secundarios='[]'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND codigo='II-8' AND tipo='deep_prime';
UPDATE study_schedule SET dia=109, fecha='2026-08-03', weekday='Lunes', temas_secundarios='[]'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND codigo='II-11' AND tipo='deep_prime';
UPDATE study_schedule SET dia=110, fecha='2026-08-04', weekday='Martes', temas_secundarios='[]'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND codigo='I-1' AND tipo='deep_prime';
UPDATE study_schedule SET dia=111, fecha='2026-08-05', weekday='Miércoles', temas_secundarios='[]'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND codigo='V-3' AND tipo='deep_prime';
UPDATE study_schedule SET dia=112, fecha='2026-08-06', weekday='Jueves', temas_secundarios='[]'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND codigo='I-4' AND tipo='deep_prime';
UPDATE study_schedule SET dia=108, fecha='2026-08-02', weekday='Domingo', tipo='repaso', codigo='V-2', prioridad='ALTA', subtema='🌙 DOMINGO NOCHE 18:00-22:00 (4h · post-jornada) · LOS 2 GAPS REALES: (1) ÁREA V / GESTIÓN = 22% del examen y CERO mapas conceptuales en QX → banqueo dirigido V-2 PEI/POI/FODA + V-1 + V-3 + V-7+V-10 + V-MED, apoyado en los REPASOS DE GESTIÓN que Theomed acaba de publicar (sesiones 22/07 y 24/07); (2) III-9 derechos del paciente / HC / SUSALUD = el mayor miss histórico del backtest. Corte 22:00 → 7h de sueño intactas', extra='{"actividad":"Domingo noche · ÁREA V (22%, sin mapas) + rescate III-9","accion":"Banqueo dirigido de Gestión (repasos Theomed 22/07 y 24/07) + repaso de III-9; sin contenido nuevo pesado","vueltas":0,"minObjetivo":240,"tierCobertura":"GAP-AREA-V + RESCATE-III-9","weekday":"DOM","corte":"22:00 · sueño 7h intacto"}'::jsonb, temas_secundarios='[]'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND tipo='repaso' AND fecha='2026-08-02';
UPDATE study_schedule SET dia=113, fecha='2026-08-07', weekday='Viernes', updated_at=now() WHERE examen='ENCAPS' AND fecha='2026-08-07';
UPDATE study_schedule SET dia=114, fecha='2026-08-08', weekday='Sábado', updated_at=now() WHERE examen='ENCAPS' AND fecha='2026-08-08';
UPDATE study_schedule SET dia=115, fecha='2026-08-09', weekday='Domingo', updated_at=now() WHERE examen='ENCAPS' AND tipo='examen';