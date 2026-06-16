-- Reconstrucción ENCAPS 15-jun (backup: study_schedule_backup_v4_20260613)
BEGIN;
UPDATE study_schedule SET dia = dia + 1000 WHERE examen='ENCAPS';
UPDATE study_schedule SET dia=1, fecha='2026-06-15', weekday='Lunes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1001; -- II-3
UPDATE study_schedule SET dia=2, fecha='2026-06-16', weekday='Martes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1002; -- II-1
UPDATE study_schedule SET dia=3, fecha='2026-06-17', weekday='Miércoles', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1003; -- II-2
UPDATE study_schedule SET dia=4, fecha='2026-06-18', weekday='Jueves', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1004; -- I-4
UPDATE study_schedule SET dia=5, fecha='2026-06-19', weekday='Viernes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1005; -- II-4
UPDATE study_schedule SET dia=7, fecha='2026-06-22', weekday='Lunes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1006; -- II-6
UPDATE study_schedule SET dia=8, fecha='2026-06-23', weekday='Martes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1007; -- V-1
UPDATE study_schedule SET dia=9, fecha='2026-06-24', weekday='Miércoles', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1008; -- II-11
UPDATE study_schedule SET dia=10, fecha='2026-06-25', weekday='Jueves', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1009; -- I-1
UPDATE study_schedule SET dia=11, fecha='2026-06-26', weekday='Viernes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1010; -- I-2
UPDATE study_schedule SET dia=13, fecha='2026-06-29', weekday='Lunes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1011; -- I-3
UPDATE study_schedule SET dia=14, fecha='2026-06-30', weekday='Martes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1012; -- II-5
UPDATE study_schedule SET dia=15, fecha='2026-07-01', weekday='Miércoles', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1013; -- II-7
UPDATE study_schedule SET dia=16, fecha='2026-07-02', weekday='Jueves', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1014; -- II-8
UPDATE study_schedule SET dia=17, fecha='2026-07-03', weekday='Viernes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1015; -- II-9
UPDATE study_schedule SET dia=19, fecha='2026-07-06', weekday='Lunes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1017; -- II-10
UPDATE study_schedule SET dia=20, fecha='2026-07-07', weekday='Martes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1018; -- III-1
UPDATE study_schedule SET dia=21, fecha='2026-07-08', weekday='Miércoles', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1019; -- III-3
UPDATE study_schedule SET dia=22, fecha='2026-07-09', weekday='Jueves', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1020; -- III-9
UPDATE study_schedule SET dia=23, fecha='2026-07-10', weekday='Viernes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1021; -- V-2
UPDATE study_schedule SET dia=25, fecha='2026-07-13', weekday='Lunes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1024; -- V-6
UPDATE study_schedule SET dia=26, fecha='2026-07-14', weekday='Martes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1025; -- IV-1
UPDATE study_schedule SET dia=27, fecha='2026-07-15', weekday='Miércoles', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1026; -- I-5+I-6
UPDATE study_schedule SET dia=28, fecha='2026-07-16', weekday='Jueves', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1027; -- I-7
UPDATE study_schedule SET dia=29, fecha='2026-07-17', weekday='Viernes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1028; -- I-8
UPDATE study_schedule SET dia=31, fecha='2026-07-20', weekday='Lunes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1031; -- I-9
UPDATE study_schedule SET dia=32, fecha='2026-07-21', weekday='Martes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1032; -- I-11+I-12
UPDATE study_schedule SET dia=33, fecha='2026-07-22', weekday='Miércoles', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1033; -- II-12
UPDATE study_schedule SET dia=34, fecha='2026-07-23', weekday='Jueves', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1034; -- II-13
UPDATE study_schedule SET dia=35, fecha='2026-07-24', weekday='Viernes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1035; -- III-2
UPDATE study_schedule SET dia=37, fecha='2026-07-27', weekday='Lunes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1038; -- III-5
UPDATE study_schedule SET dia=38, fecha='2026-07-28', weekday='Martes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1039; -- III-6+III-10
UPDATE study_schedule SET dia=39, fecha='2026-07-29', weekday='Miércoles', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1040; -- III-8
UPDATE study_schedule SET dia=40, fecha='2026-07-30', weekday='Jueves', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1041; -- IV-2
UPDATE study_schedule SET dia=41, fecha='2026-07-31', weekday='Viernes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1042; -- IV-3
UPDATE study_schedule SET dia=43, fecha='2026-08-03', weekday='Lunes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1045; -- IV-4
UPDATE study_schedule SET dia=44, fecha='2026-08-04', weekday='Martes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1046; -- IV-5
UPDATE study_schedule SET dia=45, fecha='2026-08-05', weekday='Miércoles', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1047; -- IV-6
UPDATE study_schedule SET dia=46, fecha='2026-08-06', weekday='Jueves', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1048; -- IV-7
UPDATE study_schedule SET dia=47, fecha='2026-08-07', weekday='Viernes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1049; -- V-3
UPDATE study_schedule SET dia=49, fecha='2026-08-10', weekday='Lunes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1052; -- V-7
UPDATE study_schedule SET dia=50, fecha='2026-08-11', weekday='Martes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1053; -- V-10
UPDATE study_schedule SET dia=51, fecha='2026-08-12', weekday='Miércoles', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1054; -- I-10
UPDATE study_schedule SET dia=52, fecha='2026-08-13', weekday='Jueves', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1055; -- III-4
UPDATE study_schedule SET dia=53, fecha='2026-08-14', weekday='Viernes', tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=1056; -- III-7
DELETE FROM study_schedule WHERE examen='ENCAPS' AND dia >= 1000;
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, updated_at) VALUES ('ENCAPS', 6, '2026-06-20', 'Sábado', 'simulacro', 'SIM #1 · Línea base diagnóstica', NULL, '{"clave":"CLAVE 2024-2A","label":"SIM #1 · Línea base diagnóstica","duracion":"2h 50min","sims":"#1"}'::jsonb, now());
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, updated_at) VALUES ('ENCAPS', 12, '2026-06-27', 'Sábado', 'simulacro', 'SIM #2 · Línea base', NULL, '{"clave":"CLAVE 2025-1B","label":"SIM #2 · Línea base","duracion":"2h 50min","sims":"#2"}'::jsonb, now());
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, updated_at) VALUES ('ENCAPS', 18, '2026-07-04', 'Sábado', 'simulacro', 'SIM #3 + SIM #4', NULL, '{"clave":"CLAVE 2025-2A + CLAVE 2024-1A","label":"SIM #3 + SIM #4","duracion":"2h 50min","sims":"#3+#4"}'::jsonb, now());
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, updated_at) VALUES ('ENCAPS', 24, '2026-07-11', 'Sábado', 'simulacro', 'SIM #5 + SIM #6', NULL, '{"clave":"Banco mixto INFORSALUD + Bogotá-MINSA","label":"SIM #5 + SIM #6","duracion":"2h 50min","sims":"#5+#6"}'::jsonb, now());
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, updated_at) VALUES ('ENCAPS', 30, '2026-07-18', 'Sábado', 'simulacro', 'SIM #7 + SIM #8', NULL, '{"clave":"Banco mixto USP/UNMSM + CLAVE 2025-2C","label":"SIM #7 + SIM #8","duracion":"2h 50min","sims":"#7+#8"}'::jsonb, now());
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, updated_at) VALUES ('ENCAPS', 36, '2026-07-25', 'Sábado', 'simulacro', 'SIM #9 + SIM #10', NULL, '{"clave":"CLAVE 2026-1 mock oficial","label":"SIM #9 + SIM #10","duracion":"2h 50min","sims":"#9+#10"}'::jsonb, now());
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, updated_at) VALUES ('ENCAPS', 42, '2026-08-01', 'Sábado', 'simulacro', 'SIM #11 + SIM #12 · Repaso BRUTAL bloques I+II', NULL, '{"clave":"Repaso I+II · 50Q dirigidas","label":"SIM #11 + SIM #12 · Repaso BRUTAL bloques I+II","duracion":"2h 50min","sims":"#11+#12"}'::jsonb, now());
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, updated_at) VALUES ('ENCAPS', 48, '2026-08-08', 'Sábado', 'simulacro', 'SIM #13 + SIM #14 · Repaso BRUTAL III+IV+V + APEX cards rojas', NULL, '{"clave":"Repaso V + 30 cards rojas","label":"SIM #13 + SIM #14 · Repaso BRUTAL III+IV+V + APEX cards rojas","duracion":"2h 50min","sims":"#13+#14"}'::jsonb, now());
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, updated_at) VALUES ('ENCAPS', 54, '2026-08-15', 'Sábado', 'simulacro', 'SIM #15 MEGA-FINAL + tabla 50 conceptos (capacidad ×4: nuevos QX según liberación)', NULL, '{"clave":"SIM #15 MEGA-FINAL premium 100Q","label":"SIM #15 MEGA-FINAL + tabla 50 conceptos (capacidad ×4: nuevos QX según liberación)","duracion":"2h 50min","sims":"#15"}'::jsonb, now());
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, updated_at) VALUES ('ENCAPS', 55, '2026-08-17', 'Lunes', 'examen', 'EXAMEN ENCAPS 2026-II', NULL, NULL, now());
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, updated_at) VALUES ('ENCAPS', 56, '2026-08-18', 'Martes', 'buffer', 'Buffer post-examen · transición SERUMS + Pulso', NULL, NULL, now());
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, updated_at) VALUES ('ENCAPS', 57, '2026-08-19', 'Miércoles', 'buffer', 'Buffer post-examen · transición SERUMS + Pulso', NULL, NULL, now());
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, updated_at) VALUES ('ENCAPS', 58, '2026-08-20', 'Jueves', 'cierre', 'Cierre del plan · inicio transición SERUMS + Pulso', NULL, NULL, now());
COMMIT;
-- verificación:
-- SELECT count(*) total, count(*) FILTER (WHERE tipo='deep_prime') temas, count(*) FILTER (WHERE tipo='simulacro') sims, min(fecha), max(fecha), count(*) FILTER (WHERE extract(dow from fecha)=0) domingos FROM study_schedule WHERE examen='ENCAPS';