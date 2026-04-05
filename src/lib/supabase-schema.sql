-- ═══════════════════════════════════════════════
-- Joseph MD — Supabase Schema
-- Project: joseph-medicina
-- Run this in Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════

-- Cola de APEX pendientes (input desde celular)
CREATE TABLE apex_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  texto_raw TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('share_extension', 'dictar_error', 'manual')) DEFAULT 'manual',
  fuente_app TEXT,
  pais TEXT CHECK (pais IN ('EEUU', 'ESPAÑA', 'PERU')),
  examen TEXT CHECK (examen IN ('MIR', 'USMLE', 'ENCAPS')),
  especialidad TEXT,
  subtema TEXT,
  fecha_creado TIMESTAMPTZ DEFAULT NOW(),
  estado TEXT CHECK (estado IN ('pendiente', 'procesando', 'completado', 'error')) DEFAULT 'pendiente',
  apex_block JSONB,
  fecha_procesado TIMESTAMPTZ
);

-- Bloques APEX procesados (output del agente)
CREATE TABLE apex_blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fecha TIMESTAMPTZ DEFAULT NOW(),
  frente TEXT,
  reverso TEXT,
  especialidad TEXT,
  subtema TEXT,
  examen TEXT,
  pais TEXT,
  fuente_generacion TEXT,
  error_palmerton TEXT CHECK (error_palmerton IN ('CONTEXTO', 'CRONOLOGIA', 'CCSN', 'CONCEPTO', 'OLVIDO', NULL)),
  t1_captura TIMESTAMPTZ,
  t2_anki_solicitado TIMESTAMPTZ,
  t3_anki_enviado TIMESTAMPTZ
);

-- Progreso de estudio (alimentado por el agente)
CREATE TABLE study_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fecha DATE DEFAULT CURRENT_DATE,
  especialidad TEXT,
  examen TEXT,
  porcentaje REAL DEFAULT 0,
  fuente TEXT,
  czi_valor REAL,
  deep_work_minutos INTEGER DEFAULT 0,
  preguntas_resueltas INTEGER DEFAULT 0,
  errores_por_tipo JSONB DEFAULT '{}'::jsonb
);

-- Sesiones Deep Work (timer de la app)
CREATE TABLE deep_work_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fecha DATE DEFAULT CURRENT_DATE,
  inicio TIMESTAMPTZ,
  fin TIMESTAMPTZ,
  horas_totales REAL DEFAULT 0,
  especialidad_estudiada TEXT,
  fuente TEXT DEFAULT 'app'
);

-- Skills compartidas entre agentes
CREATE TABLE IF NOT EXISTS agent_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_name TEXT NOT NULL,
  skill_description TEXT,
  source_agent TEXT,
  target_agents TEXT[],
  fecha_creado TIMESTAMPTZ DEFAULT NOW(),
  aplicado BOOLEAN DEFAULT FALSE
);

-- Logs de conversación con agentes
CREATE TABLE IF NOT EXISTS chat_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fecha TIMESTAMPTZ DEFAULT NOW(),
  agente TEXT NOT NULL,
  mensaje_usuario TEXT,
  respuesta_agente TEXT,
  fase TEXT,
  sesion_id TEXT
);

-- Reportes del agente (para notificaciones)
CREATE TABLE agent_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fecha TIMESTAMPTZ DEFAULT NOW(),
  reporte_numero TEXT CHECK (reporte_numero IN ('1', '2', '3', '4', 'S')),
  agente TEXT CHECK (agente IN ('ProMIR', 'USMLE', 'ENCAPS', 'MethodResearcher')),
  resumen_json JSONB,
  reporte_completo TEXT,
  fase_actual TEXT,
  leido BOOLEAN DEFAULT FALSE
);

-- ═══════════════════════════════════════════════
-- Row Level Security (optional — enable per table)
-- ═══════════════════════════════════════════════
-- ALTER TABLE apex_queue ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE apex_blocks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE study_progress ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE deep_work_sessions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE agent_reports ENABLE ROW LEVEL SECURITY;

-- For single-user app, allow all operations with anon key:
-- CREATE POLICY "Allow all" ON apex_queue FOR ALL USING (true);
-- CREATE POLICY "Allow all" ON apex_blocks FOR ALL USING (true);
-- CREATE POLICY "Allow all" ON study_progress FOR ALL USING (true);
-- CREATE POLICY "Allow all" ON deep_work_sessions FOR ALL USING (true);
-- CREATE POLICY "Allow all" ON agent_reports FOR ALL USING (true);
