-- plan_checks — progreso REAL de los planes de la app (los ✓ día a día) espejado en Supabase.
-- v5.10 · 12-sep-2026 · vacío 9 de gaps_v3b_synapse.json ("todo el progreso vive en un solo localStorage").
--
-- Origen: localStorage 'jmd-study-progress-v1' = { <plan_key>: number[] } (días marcados). La app lo sigue
-- usando como caché/fallback offline; este espejo es la fuente de verdad entre dispositivos y lo lee
-- DATA/_scripts/gen_revision_semanal.js (métricas 6, 7 y 9) sin depender del navegador.
--
-- plan_key ∈ PlanKey de src/lib/studyProgress.ts:
--   'usmle' | 'mir' | 'research' | 'derma' | 'business' | 'synapse' | 'aurum' | 'liviano' | 'vibecoding' | 'research-infra'
-- dia = D# del plan (1..N). Una fila = un día marcado; desmarcar = DELETE de la fila.
-- device = id anónimo del navegador que marcó (localStorage 'jmd-device'), solo para auditar conflictos.
--
-- RLS + policy: mismo patrón que study_sim_scores (leído de pg_policies el 12-sep-2026:
--   policyname "Allow all", PERMISSIVE, roles {public}, cmd ALL, qual true, with_check true).
--
-- ESTADO: APLICADA en el proyecto qacynpqdrorpuegsmtcy el 12-sep-2026 (apply_migration
--   `plan_checks_progreso_app_v5_10`; verificado en information_schema.columns + pg_policies: 4 columnas,
--   RLS on, policy "Allow all" idéntica a study_sim_scores). Idempotente: re-ejecutarla no rompe nada.
-- Escritores: src/lib/studyProgressSync.ts (app) · lector: DATA/_scripts/gen_revision_semanal.js (SELECT anon).

create table if not exists public.plan_checks (
  plan_key   text        not null,
  dia        integer     not null,
  checked_at timestamptz not null default now(),
  device     text,
  primary key (plan_key, dia)
);

create index if not exists idx_plan_checks_checked_at on public.plan_checks (checked_at desc);

alter table public.plan_checks enable row level security;

drop policy if exists "Allow all" on public.plan_checks;
create policy "Allow all" on public.plan_checks
  for all
  to public
  using (true)
  with check (true);

comment on table public.plan_checks is
  'Espejo de los ✓ de progreso de la app Joseph MD (localStorage jmd-study-progress-v1). PK (plan_key, dia). v5.10 · 12-sep-2026.';
