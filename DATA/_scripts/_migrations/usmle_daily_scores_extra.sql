-- 2.ª capa Palmerton · 19-sep-2026 (v5.14): columna libre para los hallazgos del crítico que son código
-- (#11 respuestas cambiadas / relecturas · #8 regla del tercio: nFallos / nConocidos · #27 bloquesPct por bloque/sistema).
-- usmleScores.aFila envía `extra` solo cuando hay datos y reintenta sin él si la columna no existe.
-- APLICADA en el proyecto qacynpqdrorpuegsmtcy el 19-sep-2026 (execute_sql; verificada con information_schema.columns).
ALTER TABLE usmle_daily_scores ADD COLUMN IF NOT EXISTS extra JSONB;
