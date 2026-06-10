-- ============================================================
-- PULSO MOVIMIENTO — Esquema de producción (Supabase / Postgres)
-- ------------------------------------------------------------
-- Proyecto/schema NUEVO y AISLADO (nunca el CRM en vivo). Espejo del SQLite local de
-- `intelligence/`. Mapea a FHIR R4 donde aplica (composición y actividad como Observation).
-- Reusa patrones del CRM (RLS estricto, knowledge_base + pgvector, fhir_resources).
--
-- Modelo de acceso: multi-usuario sobre auth.users. Cada usuario ve SOLO su data;
-- el rol 'medico' (Joseph) ve la de todos. RLS por `auth.uid()` (no tenant, app standalone).
-- Aplicar con: supabase db push  (o el editor SQL). Idempotente donde es posible.
-- ============================================================

create extension if not exists "uuid-ossp";
create extension if not exists vector;        -- RAG (embeddings)

-- ── Perfiles (1:1 con auth.users) ────────────────────────────────────────────
create table if not exists profiles (
  id               uuid primary key references auth.users(id) on delete cascade,
  role             text not null default 'paciente' check (role in ('joseph','familiar','paciente','medico')),
  nombre           text not null,
  sexo             text check (sexo in ('m','f')),
  fecha_nac        date,
  altura_cm        numeric(5,1),
  peso_inicial     numeric(5,1),
  peso_meta        numeric(5,1),
  objetivo         text check (objetivo in ('recomposicion','perder_grasa','ganar_musculo','salud')),
  meta_kcal        int,
  meta_proteina_g  int,
  meta_agua_ml     int default 3000,
  meta_sueno_h     numeric(3,1) default 7.0,
  baseline         jsonb not null default '{}',     -- baseline InBody
  pillar_weights   jsonb not null default '{}',     -- pesos por pilar (editable por el médico)
  bajo_glp1        boolean not null default false,
  consentimiento   timestamptz,                     -- Ley 29733
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Helper: ¿el usuario actual es médico? (SECURITY DEFINER para evitar recursión RLS).
create or replace function is_medico() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'medico');
$$;

-- ── Planes (versionados; historial de reestructuraciones) ────────────────────
create table if not exists plans (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references profiles(id) on delete cascade,
  version       int not null default 1,
  tipo          text not null default 'integral' check (tipo in ('entrenamiento','nutricion','integral')),
  contenido     jsonb not null default '{}',
  activo        boolean not null default true,
  motivo        text,
  aprobado_por_medico boolean not null default false,
  fecha         date not null default current_date,
  created_at    timestamptz not null default now()
);
create index if not exists idx_plans_user on plans(user_id, activo);

-- ── Ejercicio ────────────────────────────────────────────────────────────────
create table if not exists exercise_logs (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references profiles(id) on delete cascade,
  fecha         date not null default current_date,
  ejercicio     text not null,
  grupo_muscular text,
  series        jsonb not null default '[]',         -- [{reps, carga_kg, rir}]
  volumen_total numeric(10,2),
  hecho         boolean not null default true,
  fuente        text not null default 'manual' check (fuente in ('manual','voz','plan')),
  nota          text,
  created_at    timestamptz not null default now()
);
create index if not exists idx_ex_user_fecha on exercise_logs(user_id, fecha desc);

-- ── Comida ───────────────────────────────────────────────────────────────────
create table if not exists food_logs (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references profiles(id) on delete cascade,
  fecha         date not null default current_date,
  meal_type     text not null check (meal_type in ('desayuno','almuerzo','cena','snack')),
  descripcion   text,
  foto_url      text,
  ai_analysis   jsonb,
  kcal          numeric(7,1), prot_g numeric(6,1), carb_g numeric(6,1), grasa_g numeric(6,1),
  plan_match    text check (plan_match in ('cumple','parcial','desviado')),
  confianza     numeric(3,2),
  fuente        text not null default 'foto',
  created_at    timestamptz not null default now()
);
create index if not exists idx_food_user_fecha on food_logs(user_id, fecha desc);

create table if not exists foods (
  id            uuid primary key default uuid_generate_v4(),
  nombre        text not null, marca text, categoria text,
  kcal          numeric(7,1) not null default 0,     -- por 100 g
  proteina_g    numeric(6,1) not null default 0,
  carbo_g       numeric(6,1) not null default 0,
  grasa_g       numeric(6,1) not null default 0,
  porcion_g     numeric(7,1) default 100, porcion_nombre text default '100 g',
  es_peruano    boolean not null default false, barcode text,
  tsv tsvector generated always as (to_tsvector('spanish', nombre || ' ' || coalesce(marca,''))) stored,
  created_at    timestamptz not null default now()
);
create index if not exists idx_foods_tsv on foods using gin(tsv);

-- ── Composición corporal (Renpho/InBody) ─────────────────────────────────────
create table if not exists body_composition (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references profiles(id) on delete cascade,
  fecha         date not null default current_date,
  metrics       jsonb not null default '{}',         -- {peso, grasa_pct, musculo_esqueletico_pct, ...}
  fuente        text not null default 'manual' check (fuente in ('renpho','inbody','manual')),
  screenshot_url text,
  raw_extract   jsonb,
  created_at    timestamptz not null default now()
);
create index if not exists idx_body_user_fecha on body_composition(user_id, fecha desc);

-- ── Pruebas de actividad (compliance / garantía) ─────────────────────────────
create table if not exists activity_proofs (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references profiles(id) on delete cascade,
  fecha         date not null default current_date,
  tipo          text not null check (tipo in ('caminata','correr','baile','cardio')),
  foto_url      text, duracion_min int,
  ts            timestamptz not null default now(),   -- timestamp de SERVIDOR (anti-trampa)
  exif          jsonb, verificado boolean not null default true,
  created_at    timestamptz not null default now()
);
create index if not exists idx_act_user_fecha on activity_proofs(user_id, fecha desc);

-- ── Bienestar (hidratación, sueño) ───────────────────────────────────────────
create table if not exists wellness_logs (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references profiles(id) on delete cascade,
  fecha         date not null default current_date,
  tipo          text not null check (tipo in ('agua','sueno')),
  valor         numeric(8,1) not null, meta numeric(8,1),
  created_at    timestamptz not null default now(),
  unique(user_id, fecha, tipo)
);

-- ── Coach: mensajes + bandeja del médico ─────────────────────────────────────
create table if not exists messages (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references profiles(id) on delete cascade,
  direccion     text not null default 'entrante',
  pregunta      text, respuesta_ia text, confianza numeric(3,2),
  escalado      boolean not null default false,
  fuente        text, used_knowledge jsonb,
  resuelto_por_medico boolean not null default false,
  created_at    timestamptz not null default now()
);
create index if not exists idx_msg_user on messages(user_id, created_at desc);

create table if not exists clinician_tasks (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references profiles(id) on delete cascade,
  tipo          text not null check (tipo in ('bandera_roja','escalamiento','revision','seguimiento')),
  severidad     text not null default 'revisar' check (severidad in ('urgente','revisar','info')),
  titulo        text not null, detalle text,
  origen        text not null default 'sistema' check (origen in ('agente','sistema','manual')),
  estado        text not null default 'abierta' check (estado in ('abierta','en_proceso','resuelta')),
  data          jsonb not null default '{}',
  resuelta_por  uuid references profiles(id), resuelta_at timestamptz,
  created_at    timestamptz not null default now()
);
create index if not exists idx_ctasks_estado on clinician_tasks(estado, severidad);

-- ── RAG: conocimiento + chunks (pgvector) ────────────────────────────────────
create table if not exists knowledge_base (
  id            uuid primary key default uuid_generate_v4(),
  namespace     text not null default 'movimiento',
  titulo        text not null, contenido text not null,
  categoria     text, fuente text, tags jsonb not null default '[]',
  activo        boolean not null default true,
  created_at    timestamptz not null default now()
);
create table if not exists knowledge_chunks (
  id            uuid primary key default uuid_generate_v4(),
  knowledge_id  uuid not null references knowledge_base(id) on delete cascade,
  chunk_index   int not null default 0,
  contenido     text not null,
  embedding     vector(768),                          -- text-embedding-004 (Gemini) o Voyage
  tsv tsvector generated always as (to_tsvector('spanish', contenido)) stored,
  created_at    timestamptz not null default now()
);
create index if not exists idx_kchunks_tsv on knowledge_chunks using gin(tsv);
do $$ begin
  create index idx_kchunks_embedding on knowledge_chunks using hnsw (embedding vector_cosine_ops);
exception when undefined_object or duplicate_table then null; end $$;

-- ── Proyección FHIR R4 (DEC-L5 del CRM) ──────────────────────────────────────
create table if not exists fhir_resources (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references profiles(id) on delete cascade,
  resource_type text not null,                        -- Observation | CarePlan | Flag | Patient
  fhir_id       text, code_system text, code text, status text,
  effective_at  timestamptz, resource jsonb not null,
  source_table  text, source_id uuid,
  created_at    timestamptz not null default now()
);
create index if not exists idx_fhir_user on fhir_resources(user_id, resource_type);

-- ============================================================
-- RLS — cada usuario ve SOLO su data; el médico (Joseph) ve todo.
-- ============================================================
alter table profiles enable row level security;
drop policy if exists profiles_self on profiles;
create policy profiles_self on profiles for all
  using (id = auth.uid() or is_medico()) with check (id = auth.uid() or is_medico());

do $$
declare t text;
begin
  foreach t in array array[
    'plans','exercise_logs','food_logs','body_composition','activity_proofs',
    'wellness_logs','messages','clinician_tasks','fhir_resources'
  ] loop
    execute format('alter table %I enable row level security;', t);
    execute format('drop policy if exists %I on %I;', t||'_owner', t);
    execute format(
      'create policy %I on %I for all using (user_id = auth.uid() or is_medico()) with check (user_id = auth.uid() or is_medico());',
      t||'_owner', t);
  end loop;
end $$;

-- foods y knowledge_* son catálogo compartido: lectura para autenticados, escritura solo médico.
alter table foods enable row level security;
drop policy if exists foods_read on foods;
create policy foods_read on foods for select using (auth.role() = 'authenticated');
drop policy if exists foods_write on foods;
create policy foods_write on foods for all using (is_medico()) with check (is_medico());

alter table knowledge_base enable row level security;
alter table knowledge_chunks enable row level security;
drop policy if exists kb_read on knowledge_base;
create policy kb_read on knowledge_base for select using (auth.role() = 'authenticated');
drop policy if exists kc_read on knowledge_chunks;
create policy kc_read on knowledge_chunks for select using (auth.role() = 'authenticated');

-- ── Funciones de apoyo (RAG vector + FTS, búsqueda de alimentos, adherencia) ──
create or replace function match_knowledge(p_namespace text, p_query_embedding vector(768), p_match_count int default 5)
returns table (knowledge_id uuid, titulo text, contenido text, fuente text, similarity float)
language sql stable as $$
  select k.id, k.titulo, kc.contenido, k.fuente, 1 - (kc.embedding <=> p_query_embedding)
  from knowledge_chunks kc join knowledge_base k on k.id = kc.knowledge_id
  where k.namespace = p_namespace and k.activo and kc.embedding is not null
  order by kc.embedding <=> p_query_embedding limit p_match_count;
$$;

create or replace function search_foods(p_query text, p_match_count int default 12)
returns setof foods language sql stable as $$
  select * from foods
  where tsv @@ websearch_to_tsquery('spanish', p_query) or nombre ilike '%'||p_query||'%'
  order by es_peruano desc limit p_match_count;
$$;

-- updated_at trigger en profiles/plans.
create or replace function set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists trg_profiles_updated on profiles;
create trigger trg_profiles_updated before update on profiles for each row execute function set_updated_at();
