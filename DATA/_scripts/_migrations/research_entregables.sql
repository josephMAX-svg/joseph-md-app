-- ═══════════════════════════════════════════════
-- RESEARCH · Mesa editorial persistente (Palmerton v3b · gap 8 · 12-sep-2026)
-- Espejo Supabase del registro localStorage 'jmd-research-entregables' (src/lib/researchData.ts loadEntregables /
-- src/lib/researchEntregablesSync.ts). Hasta hoy la Mesa editorial vivía solo en el navegador de UN dispositivo y su
-- gemelo manual era la tabla de DATA/RESEARCH/RUTA_PUBLICACION_2027.md §9 → dos fuentes de verdad, sin histórico de
-- decisiones editoriales (rebuttal · rechazo · siguiente revista de la cascada).
--
-- MISMO PATRÓN que study_sim_scores (verificado en pg_class/pg_policies el 12-sep-2026): RLS ON + policy permisiva
-- "Allow all" (cmd ALL · roles {public} · qual true · with_check true) — app single-user con anon key.
-- Una fila por entregable (id = RESEARCH_ENTREGABLES[].id: 'tesis-L0' · 'carta-1' · 'case-report-1' · 'PROSPERO-SR1' · 'SR-1');
-- la app UPSERTea por id al cambiar estado y hace pull con merge por updated_at (gana la más nueva).
-- `historial` = append de {ts, estado, journal, decision, ref} → histórico de decisiones editoriales.
--
-- Aplicada con apply_migration (nombre: research_entregables_palmerton_v3b). El integrador la concatena en
-- src/lib/supabase-schema.sql; este fichero es la copia canónica.
-- ═══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS research_entregables (
  id             TEXT PRIMARY KEY,                       -- = RESEARCH_ENTREGABLES[].id
  estado         TEXT NOT NULL DEFAULT 'idea'
                 CHECK (estado IN ('idea', 'borrador', 'revision-mentor', 'enviado', 'en-revision', 'revision-mayor', 'aceptado', 'publicado')),
  fecha_envio    DATE,                                   -- se fija al marcar "enviado" (o a mano)
  ref_manuscrito TEXT,                                   -- nº de manuscrito / DOI
  journal_actual TEXT,                                   -- escalón de la cascada en el que está el manuscrito
  decision       TEXT,                                   -- última decisión editorial (desk-reject · major revision · accept …)
  notas          TEXT,
  historial      JSONB NOT NULL DEFAULT '[]'::jsonb,     -- [{ts, estado, journal, decision, ref}] (append en cada cambio de estado)
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()      -- merge local↔remoto: gana la más nueva
);
ALTER TABLE research_entregables ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all" ON research_entregables;
CREATE POLICY "Allow all" ON research_entregables FOR ALL USING (true) WITH CHECK (true);

-- ── RLS que faltaba en dos tablas de la rama Research (RLS OFF y 0 policies el 12-sep-2026 según pg_class/pg_policies).
--    Misma policy permisiva que las tablas de estudio; el motor escribe con service_role (bypassa RLS) y la app con anon.
--    (datos_tesis NO se toca aquí: es decisión de Joseph — ver DATA/RESEARCH/TESIS_L0/DATOS_README.md §5.)
ALTER TABLE research_manuscripts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all" ON research_manuscripts;
CREATE POLICY "Allow all" ON research_manuscripts FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE research_citations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all" ON research_citations;
CREATE POLICY "Allow all" ON research_citations FOR ALL USING (true) WITH CHECK (true);

-- ── Motor de descubrimiento (gap 9): la Edge Function research-discovery (copia en supabase/functions/) registrará
--    qué fuentes devolvieron resultados y el último error explícito (p.ej. OpenAlex 0 resultados sin OPENALEX_KEY).
ALTER TABLE research_engine_state ADD COLUMN IF NOT EXISTS sources_ok JSONB;   -- {"openalex": n, "europepmc": n, "pubmed": n}
ALTER TABLE research_engine_state ADD COLUMN IF NOT EXISTS last_error TEXT;
