-- ═══════════════════════════════════════════════
-- MIR · espejo Supabase del registro de evaluaciones (localStorage 'jmd-mir-eval-log' · src/lib/mirEvalLog.ts)
-- Palmerton v3b (12-sep-2026) · gap 7: "el log MIR vive solo en localStorage de UN dispositivo".
-- Mismo patrón que study_sim_scores / usmle_daily_scores (verificado en pg_policies el 12-sep-2026):
--   RLS ON + policy permisiva "Allow all" (cmd ALL, roles {public}, qual true, with_check true) — app
--   single-user con anon key. Append-only en la app: la fila se UPSERTea por `id` (ts+aleatorio) y nunca se
--   borra desde la UI; `updated_at` sirve al merge (gana la más nueva) si algún día se edita `ajuste`/`nota`.
-- Aplicada con apply_migration (nombre: mir_eval_log_palmerton_v3b). El integrador la concatena en
-- src/lib/supabase-schema.sql; este fichero es la copia canónica.
-- ═══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS mir_eval_log (
  id TEXT PRIMARY KEY,                                   -- id de la entrada (Date.now().toString(36) + '-' + aleatorio)
  ts TIMESTAMPTZ NOT NULL,                               -- ISO de creación en el dispositivo
  fecha DATE NOT NULL,                                   -- día de la medición (YYYY-MM-DD)
  d INTEGER,                                             -- día del plan (MIR_DIAS[].d · mantenimiento: M#)
  tema TEXT,
  asignatura TEXT,
  num INTEGER,                                           -- nº ProMIR de la asignatura
  cap_id TEXT,                                           -- capId ProMIR del tema medido (si aplica)
  aciertos INTEGER NOT NULL CHECK (aciertos >= 0),
  total INTEGER NOT NULL CHECK (total BETWEEN 1 AND 400),
  blancos INTEGER NOT NULL DEFAULT 0 CHECK (blancos >= 0),
  tiempo_seg INTEGER DEFAULT 0,
  tipo_error TEXT CHECK (tipo_error IS NULL OR tipo_error IN ('knowledge', 'transfer', 'proceso')),
  ccsn TEXT,                                             -- subtipo CCSN (cifra / clave / sigla / norma)
  delta_es BOOLEAN NOT NULL DEFAULT false,               -- fallo por contestar con el manejo Perú/USA
  kind TEXT NOT NULL CHECK (kind IN ('anclada', 'pretest', 'quiz', 'cierre', 'miniMIR', 'mantenimiento', 'derma10Q')),
  anclas JSONB,                                          -- {d1,d3,d7}: true = acertadas todas las Q de ese slot
  anclas_d JSONB,                                        -- {d1,d3,d7}: D# del tema que ocupó cada slot (anclas dinámicas)
  q_ids JSONB,                                           -- ids de preguntas oficiales consumidas ["2025-114", …] (anti-repetición)
  ajuste TEXT CHECK (ajuste IS NULL OR ajuste IN ('recursos', 'comprension', 'aplicacion', 'retencion')), -- 4 ajustes Palmerton (obligatorio al 2º fallo del tema)
  blancos_acertables INTEGER CHECK (blancos_acertables IS NULL OR blancos_acertables >= 0), -- táctica −1/3: blancos que habrían sido aciertos
  fallos_entre_dos INTEGER CHECK (fallos_entre_dos IS NULL OR fallos_entre_dos >= 0),       -- fallos con 2 opciones vivas
  cambiadas INTEGER CHECK (cambiadas IS NULL OR cambiadas >= 0),                             -- respuestas cambiadas
  cambiadas_a_fallo INTEGER CHECK (cambiadas_a_fallo IS NULL OR cambiadas_a_fallo >= 0),     -- de ellas, acierto → fallo
  nota TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS mir_eval_log_fecha_idx ON mir_eval_log (fecha);
CREATE INDEX IF NOT EXISTS mir_eval_log_asig_kind_idx ON mir_eval_log (asignatura, kind);
ALTER TABLE mir_eval_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON mir_eval_log FOR ALL USING (true) WITH CHECK (true);
