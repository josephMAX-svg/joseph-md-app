BEGIN;
DROP TABLE IF EXISTS study_schedule_multitema_backup_24jun;
CREATE TABLE study_schedule_multitema_backup_24jun AS SELECT * FROM study_schedule WHERE examen='ENCAPS';

-- 1) temas_secundarios en días 6-20 (subtema/prioridad leídos de la fila origen, ANTES de nulificar)
UPDATE study_schedule t SET temas_secundarios = (
  SELECT jsonb_agg(jsonb_build_object('codigo',s.codigo,'subtema',s.subtema,'prioridad',s.prioridad) ORDER BY s.dia)
  FROM study_schedule s WHERE s.examen='ENCAPS' AND s.codigo = ANY(ARRAY['II-6'])), updated_at=now()
WHERE t.examen='ENCAPS' AND t.dia=6;
UPDATE study_schedule t SET temas_secundarios = (
  SELECT jsonb_agg(jsonb_build_object('codigo',s.codigo,'subtema',s.subtema,'prioridad',s.prioridad) ORDER BY s.dia)
  FROM study_schedule s WHERE s.examen='ENCAPS' AND s.codigo = ANY(ARRAY['II-9'])), updated_at=now()
WHERE t.examen='ENCAPS' AND t.dia=7;
UPDATE study_schedule t SET temas_secundarios = (
  SELECT jsonb_agg(jsonb_build_object('codigo',s.codigo,'subtema',s.subtema,'prioridad',s.prioridad) ORDER BY s.dia)
  FROM study_schedule s WHERE s.examen='ENCAPS' AND s.codigo = ANY(ARRAY['II-7'])), updated_at=now()
WHERE t.examen='ENCAPS' AND t.dia=8;
UPDATE study_schedule t SET temas_secundarios = (
  SELECT jsonb_agg(jsonb_build_object('codigo',s.codigo,'subtema',s.subtema,'prioridad',s.prioridad) ORDER BY s.dia)
  FROM study_schedule s WHERE s.examen='ENCAPS' AND s.codigo = ANY(ARRAY['II-5'])), updated_at=now()
WHERE t.examen='ENCAPS' AND t.dia=9;
UPDATE study_schedule t SET temas_secundarios = (
  SELECT jsonb_agg(jsonb_build_object('codigo',s.codigo,'subtema',s.subtema,'prioridad',s.prioridad) ORDER BY s.dia)
  FROM study_schedule s WHERE s.examen='ENCAPS' AND s.codigo = ANY(ARRAY['II-10'])), updated_at=now()
WHERE t.examen='ENCAPS' AND t.dia=11;
UPDATE study_schedule t SET temas_secundarios = (
  SELECT jsonb_agg(jsonb_build_object('codigo',s.codigo,'subtema',s.subtema,'prioridad',s.prioridad) ORDER BY s.dia)
  FROM study_schedule s WHERE s.examen='ENCAPS' AND s.codigo = ANY(ARRAY['II-4'])), updated_at=now()
WHERE t.examen='ENCAPS' AND t.dia=12;
UPDATE study_schedule t SET temas_secundarios = (
  SELECT jsonb_agg(jsonb_build_object('codigo',s.codigo,'subtema',s.subtema,'prioridad',s.prioridad) ORDER BY s.dia)
  FROM study_schedule s WHERE s.examen='ENCAPS' AND s.codigo = ANY(ARRAY['III-1'])), updated_at=now()
WHERE t.examen='ENCAPS' AND t.dia=13;
UPDATE study_schedule t SET temas_secundarios = (
  SELECT jsonb_agg(jsonb_build_object('codigo',s.codigo,'subtema',s.subtema,'prioridad',s.prioridad) ORDER BY s.dia)
  FROM study_schedule s WHERE s.examen='ENCAPS' AND s.codigo = ANY(ARRAY['III-4+III-7'])), updated_at=now()
WHERE t.examen='ENCAPS' AND t.dia=14;
UPDATE study_schedule t SET temas_secundarios = (
  SELECT jsonb_agg(jsonb_build_object('codigo',s.codigo,'subtema',s.subtema,'prioridad',s.prioridad) ORDER BY s.dia)
  FROM study_schedule s WHERE s.examen='ENCAPS' AND s.codigo = ANY(ARRAY['I-11+I-12','V-6'])), updated_at=now()
WHERE t.examen='ENCAPS' AND t.dia=15;
UPDATE study_schedule t SET temas_secundarios = (
  SELECT jsonb_agg(jsonb_build_object('codigo',s.codigo,'subtema',s.subtema,'prioridad',s.prioridad) ORDER BY s.dia)
  FROM study_schedule s WHERE s.examen='ENCAPS' AND s.codigo = ANY(ARRAY['III-6+III-10','I-7'])), updated_at=now()
WHERE t.examen='ENCAPS' AND t.dia=17;
UPDATE study_schedule t SET temas_secundarios = (
  SELECT jsonb_agg(jsonb_build_object('codigo',s.codigo,'subtema',s.subtema,'prioridad',s.prioridad) ORDER BY s.dia)
  FROM study_schedule s WHERE s.examen='ENCAPS' AND s.codigo = ANY(ARRAY['II-2','I-10','III-3'])), updated_at=now()
WHERE t.examen='ENCAPS' AND t.dia=18;
UPDATE study_schedule t SET temas_secundarios = (
  SELECT jsonb_agg(jsonb_build_object('codigo',s.codigo,'subtema',s.subtema,'prioridad',s.prioridad) ORDER BY s.dia)
  FROM study_schedule s WHERE s.examen='ENCAPS' AND s.codigo = ANY(ARRAY['V-7+V-10','IV-4','IV-3+IV-5'])), updated_at=now()
WHERE t.examen='ENCAPS' AND t.dia=19;
UPDATE study_schedule t SET temas_secundarios = (
  SELECT jsonb_agg(jsonb_build_object('codigo',s.codigo,'subtema',s.subtema,'prioridad',s.prioridad) ORDER BY s.dia)
  FROM study_schedule s WHERE s.examen='ENCAPS' AND s.codigo = ANY(ARRAY['II-12','IV-6+IV-7','I-8','I-9','II-13'])), updated_at=now()
WHERE t.examen='ENCAPS' AND t.dia=20;

-- 2) días >=21 (deep_prime) → REPASO (sin tema nuevo): todo el temario ya se vio en días 1-20
UPDATE study_schedule SET tipo='repaso', codigo=NULL,
  subtema='Repaso espaciado + banco de preguntas + mapas conceptuales', prioridad=NULL, nts=NULL,
  videos='[]'::jsonb, theomed='[]'::jsonb, material_comp='[]'::jsonb, n_videos=0, video_min=0, updated_at=now()
WHERE examen='ENCAPS' AND tipo='deep_prime' AND dia>=21;

COMMIT;
