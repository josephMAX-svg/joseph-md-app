-- serums_turnos — turno de la posta SERUMS por día (F4 del plan v6.00: lun 3-may → sáb 25-sep-2027 [supuesto]).
-- v6.00 · 6-oct-2026 · V6_ESPEC §F (ficheros nuevos) · §B4.1 (plantillas M/T/L/G) · §B5 (hitos en su ventana según el turno).
--
-- Origen: localStorage 'jmd-turnos-v1' = { "AAAA-MM-DD": { turno, horaInicio?, updatedAt } } (src/lib/serumsTurnos.ts). La app lo
-- usa como caché/fallback offline; este espejo es la fuente entre dispositivos (PC ↔ móvil en la posta) y la lee, cuando exista,
-- DATA/_scripts/gen_calendar_turnos.js (§G5, opcional).
--
-- turno ∈ 'M' (mañana 07-13) · 'T' (tarde 13-19) · 'L' (feriado / sin turno = día doble) · 'G' (guardia).
-- hora_inicio = variante de hora del turno ('12:00' | '13:00' | '14:00' para T; NULL = la base del turno).
-- device = id anónimo del navegador que marcó (localStorage 'jmd-device'), solo para auditar conflictos (= plan_checks).
-- Una fila = un día marcado; desmarcar = DELETE de la fila (la app vuelve al default 'M' = PISO con aviso «marca tu turno»).
--
-- RLS + policy: copia del patrón de plan_checks (y study_sim_scores): policy "Allow all", PERMISSIVE, roles {public}, cmd ALL,
--   qual true, with_check true.
--
-- ESTADO: PENDIENTE — se aplica en el Lote 4 (después de la siembra ENCAPS), NO antes. Crear la tabla vacía no afecta a nada y el
--   cliente (serumsTurnos.ts) es tolerante a que no exista: no hace lectura/escritura remota para fechas < serums.inicio y, si
--   PostgREST responde «relation does not exist» / schema cache, desactiva el espejo en esa sesión. Idempotente: re-ejecutarla no
--   rompe nada.
-- Escritor: src/lib/serumsTurnos.ts (app: guardarTurno / desmarcarTurno / pullTurnos).

create table if not exists public.serums_turnos (
  fecha       date        primary key,
  turno       text        not null check (turno in ('M', 'T', 'L', 'G')),
  hora_inicio text,
  updated_at  timestamptz not null default now(),
  device      text
);

create index if not exists idx_serums_turnos_updated_at on public.serums_turnos (updated_at desc);

alter table public.serums_turnos enable row level security;

drop policy if exists "Allow all" on public.serums_turnos;
create policy "Allow all" on public.serums_turnos
  for all
  to public
  using (true)
  with check (true);

comment on table public.serums_turnos is
  'Turno de la posta SERUMS por día (M/T/L/G + variante de hora) marcado en la app Joseph MD (localStorage jmd-turnos-v1). PK fecha. v6.00 · 6-oct-2026.';
