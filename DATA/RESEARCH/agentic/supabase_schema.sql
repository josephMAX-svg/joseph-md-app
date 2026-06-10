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
