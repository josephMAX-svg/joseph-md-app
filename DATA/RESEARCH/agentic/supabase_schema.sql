-- supabase_schema.sql — tablas de la RAMA RESEARCH (papers/screening/citas/agentes).
-- Proyecto Supabase existente: qacynpqdrorpuegsmtcy (ya usado por el motor APEX de estudio).
-- Estas tablas son NUEVAS y NO tocan las de estudio (apex_blocks, study_progress, etc.).
-- El escritor (discovery_engine.py / workers) usa service_role SOLO server-side (no embebible).
-- El dashboard (app) lee con anon key bajo RLS de solo-lectura. Realtime para estado en vivo.

-- 1) Corpus descubierto por el motor (Capa 0)
create table if not exists research_papers (
  id            uuid primary key default gen_random_uuid(),
  line          text not null,                 -- 'L4' / 'SR-1'
  doi           text unique,
  pmid          text,
  title         text,
  abstract      text,
  year          int,
  sources       text[],                        -- ['openalex','pubmed',...]
  is_oa         boolean,
  pdf_url       text,                           -- resuelto por la cascada (Unpaywall→…)
  ollama_relevant boolean,                      -- pre-screening local
  ollama_reason text,
  screen_status text default 'pending_human'    -- pending_human|reviewer1|reviewer2|included|excluded
    check (screen_status in ('pending_human','reviewer1','reviewer2','included','excluded','maybe')),
  discovered_at timestamptz default now()
);
create index if not exists idx_research_papers_line on research_papers(line);

-- 2) Decisiones de screening (2 revisores + Kappa)
create table if not exists research_screening (
  id          uuid primary key default gen_random_uuid(),
  paper_id    uuid references research_papers(id) on delete cascade,
  stage       text check (stage in ('ollama_prescreen','human_telegram','reviewer1','reviewer2')),
  decision    text check (decision in ('include','exclude','maybe')),
  reason      text,
  decided_by  text,
  decided_at  timestamptz default now()
);

-- 3) Citas verificadas por IA (gate anti-alucinación · §5 discovery-engine.md)
create table if not exists research_citations (
  id          uuid primary key default gen_random_uuid(),
  line        text,
  claim_id    text,
  doi         text,
  pmid        text,
  csl_json    jsonb,                            -- CSL-JSON canónico (verdad de tierra)
  match_score numeric,
  status      text check (status in ('verified','needs_review','rejected')),
  verified_at timestamptz default now(),
  -- solo cuenta como verificada si resuelve a un identificador real
  constraint verified_needs_id check (status <> 'verified' or doi is not null or pmid is not null)
);
create unique index if not exists uq_research_citations_doi on research_citations(doi) where doi is not null;

-- 4) Estado de los agentes (lo que pinta la CONSOLA de la app: quién redacta qué sección)
create table if not exists research_agent_tasks (
  id          uuid primary key default gen_random_uuid(),
  line        text not null,                    -- 'L4'
  sr          text,                             -- 'SR-1'
  agent       text not null,                    -- 'lead'|'intro'|'methods'|'results'|'discuss'|'citation'|'assembler'
  seccion     text,                             -- 'Introduction'|'Methods'|...
  estado      text default 'idle'               -- idle|queued|working|done|blocked|needs_human
    check (estado in ('idle','queued','working','done','blocked','needs_human')),
  journal_std text,                             -- 'JEADV · PRISMA 2020 + GRADE + Vancouver'
  output_url  text,                             -- borrador/seccion
  updated_at  timestamptz default now()
);
create index if not exists idx_agent_tasks_line on research_agent_tasks(line);

-- 5) Estado del motor (1 fila) — para el monitor de pipeline
create table if not exists research_engine_state (
  id              int primary key default 1,
  last_run_at     timestamptz,
  active_line     text,
  papers_today    int default 0,
  next_checkpoint text,
  calendar_block  text                          -- 'INVESTIGACIÓN 13:15-14:15' si hoy toca
);

-- 6) Manuscritos ensamblados (.docx) — enlaza con la nota en Obsidian 05_manuscrito
create table if not exists research_manuscripts (
  id          uuid primary key default gen_random_uuid(),
  line        text, sr text, version int,
  docx_path   text,                             -- ruta local / Drive
  obsidian_note text,                           -- 04_INVESTIGACIÓN…/02_SR_EN_CURSO/<sr>/05_manuscrito/<file>.md
  citations_verified int, citations_unverified int,
  human_approved boolean default false,
  created_at  timestamptz default now()
);

-- ── Realtime + RLS ──
alter publication supabase_realtime add table research_papers, research_agent_tasks, research_engine_state;
alter table research_papers       enable row level security;
alter table research_agent_tasks  enable row level security;
alter table research_engine_state enable row level security;
-- Dashboard: solo lectura con anon key
create policy if not exists r_papers_read  on research_papers       for select using (true);
create policy if not exists r_agents_read  on research_agent_tasks  for select using (true);
create policy if not exists r_state_read   on research_engine_state for select using (true);
-- La escritura la hace service_role (bypassa RLS) desde el motor Python / n8n. NUNCA desde el navegador.

-- ═══════════════════════════════════════════════════════════════════════════════════════
-- DDL FALTANTE — añadido 5-sep-2026 tras comparar este fichero con information_schema del
-- proyecto qacynpqdrorpuegsmtcy (Palmerton v3 · vacío 8 "pipeline agéntico no versionado").
-- Todo lo de abajo YA EXISTE en producción; se documenta aquí para que el repo sea la fuente
-- de verdad. Idempotente (add column if not exists / create table if not exists / drop+create policy).
-- ═══════════════════════════════════════════════════════════════════════════════════════

-- 7) research_papers.relevance — score de pre-ordenación que escribe research-discovery v2
--    (nº de keywords de la línea en el título + 2 puntos por cada fuente extra que lo confirma).
alter table research_papers add column if not exists relevance int default 0;
create index if not exists idx_research_papers_line_rel on research_papers(line, relevance desc);

-- 8) research_engine_state.run_state — estado de ejecución que pinta el monitor de la app
--    ('idle'|'running'|'paused'|'stopped'; lo escribe setResearchRunState desde la app y la
--    Edge Function research-discovery al arrancar). Sin CHECK en producción; se documenta el dominio.
alter table research_engine_state add column if not exists run_state text default 'idle';

-- 9) research_agent_tasks.output_md — prosa devuelta por el subagente (la consola la muestra).
alter table research_agent_tasks add column if not exists output_md text;

-- 10) research_commands — cola de comandos app → runner del PC (research_runner.py hace polling).
--     La app inserta con anon key (policy rc_insert); el runner marca done/error con service_role.
create table if not exists research_commands (
  id          uuid primary key default gen_random_uuid(),
  kind        text not null check (kind in ('start','pause','stop','regenerate','feedback')),
  line        text,                              -- 'L4' / 'L5'
  agent       text,                              -- 'intro'|'methods'|... (regenerate/feedback)
  target      text,                              -- sección / id objetivo
  payload     text,                              -- texto libre (feedback humano)
  status      text default 'pending' check (status in ('pending','done','error')),
  created_at  timestamptz default now()
);

-- ── RLS + policies que existen en producción y faltaban aquí (pg_policies, 5-sep-2026) ──
-- Nota: Postgres NO soporta `create policy if not exists`; se usa drop-if-exists + create.
alter table research_commands  enable row level security;
alter table research_screening enable row level security;

drop policy if exists r_papers_update on research_papers;
create policy r_papers_update on research_papers for update using (true) with check (true);   -- setPaperScreen (app)

drop policy if exists r_state_update on research_engine_state;
create policy r_state_update on research_engine_state for update using (true) with check (true); -- setResearchRunState (app)

drop policy if exists rs_read on research_screening;
create policy rs_read on research_screening for select using (true);
drop policy if exists rs_insert on research_screening;
create policy rs_insert on research_screening for insert with check (true);                    -- decisiones desde la app

drop policy if exists rc_read on research_commands;
create policy rc_read on research_commands for select using (true);
drop policy if exists rc_insert on research_commands;
create policy rc_insert on research_commands for insert with check (true);                     -- sendResearchCommand (app)

-- ── Estado real verificado el 5-sep-2026 (para no re-descubrirlo) ──
-- research_papers: 200 filas line='SR-1' (discovered_at 11-jun-2026), 151 is_oa=true, 0 pdf_url,
--   todas screen_status='pending_human'. research_screening: 0 decisiones. research_commands: 1 (done).
-- research_agent_tasks: 7 filas L4/SR-1; los 5 estados sembrados ('working'/'queued' del 10-jun) se
--   pusieron en 'idle' el 5-sep-2026 (UPDATE ... where estado in ('working','queued')) para que la
--   consola no finja que redacta. research-discovery vuelve a ponerlos en working/queued al correr.
-- Export a Rayyan: exportResearchCorpus(line) en src/lib/supabase.ts (CSV + RIS).
