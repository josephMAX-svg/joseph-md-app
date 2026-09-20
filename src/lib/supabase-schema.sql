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

-- ═══════════════════════════════════════════════
-- USMLE Step 1 · medición diaria (Palmerton v3 · 5 niveles UWorld) — 5-sep-2026
-- Espejo de localStorage 'jmd-usmle-scores' (src/lib/usmleScores.ts). Aplicada en Supabase como
-- migración usmle_daily_scores_palmerton_v3. Mismo patrón que study_sim_scores:
-- RLS ON + policy permisiva "Allow all" (app single-user con anon key; pg_policies: cmd ALL, qual true, with_check true).
-- ═══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS usmle_daily_scores (
  fecha DATE PRIMARY KEY,                               -- día (clave)
  d INTEGER,                                            -- día del plan (DIAS[].d)
  pretest10 INTEGER CHECK (pretest10 IS NULL OR (pretest10 BETWEEN 0 AND 10)),          -- aciertos pre-test 08:15 (B-C: stress set 05:00)
  consol30_pct NUMERIC CHECK (consol30_pct IS NULL OR (consol30_pct BETWEEN 0 AND 100)), -- % consolidación 11:00 (B-C: bloques timed)
  eval_pct NUMERIC CHECK (eval_pct IS NULL OR (eval_pct BETWEEN 0 AND 100)),             -- % eval 18:00 timed · hito = % NBME/UWSA/Free 120
  tipo_error TEXT CHECK (tipo_error IS NULL OR tipo_error IN ('knowledge', 'transfer', 'proceso')),
  nivel_uw INTEGER CHECK (nivel_uw IS NULL OR (nivel_uw BETWEEN 1 AND 5)),
  notas TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE usmle_daily_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON usmle_daily_scores FOR ALL USING (true) WITH CHECK (true);

-- ═══════════════════════════════════════════════════════════════════════════════════════
-- SEGUNDA CAPA "cero puntos ciegos" (12-13 sep-2026 · régimen v5.10) — migraciones concatenadas por el integrador el 13-sep-2026.
-- Copias canónicas: DATA/_scripts/_migrations/*.sql. TODAS están APLICADAS en el proyecto qacynpqdrorpuegsmtcy (verificado el 13-sep
-- con execute_sql sobre pg_class/pg_policies/information_schema: mir_eval_log 26 col · plan_checks 4 col · research_entregables 9 col,
-- RLS ON + policy "Allow all" [ALL/true/true] en las tres; RLS + "Allow all" en research_manuscripts y research_citations;
-- research_engine_state.sources_ok/last_error presentes; study_metrics.extra.horarios._nota = v5.10). Idempotentes (IF NOT EXISTS / DROP+CREATE POLICY;
-- el UPDATE de study_metrics fija el mismo JSON). datos_tesis NO se toca (RLS OFF, 0 policies: decisión pendiente de Joseph).
-- ═══════════════════════════════════════════════════════════════════════════════════════

-- ─── ORIGEN: DATA/_scripts/_migrations/mir_eval_log.sql ───
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

-- ─── ORIGEN: DATA/_scripts/_migrations/plan_checks.sql ───
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

-- ─── ORIGEN: DATA/_scripts/_migrations/research_entregables.sql ───
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

-- ─── ORIGEN: DATA/_scripts/_migrations/study_metrics_horarios.sql (parche de DATOS, no DDL: UPDATE jsonb_set aplicado el 12-sep; se conserva aquí solo como registro) ───
-- study_metrics.extra.horarios (examen ENCAPS) · alineado con la regla REAL de la eval anclada (gaps_v3b_encaps.json punto 9)
-- 12-sep-2026 · régimen v5.10 (D1 = lun 14-sep-2026). Aplicado por MCP execute_sql (proyecto qacynpqdrorpuegsmtcy) el 12-sep-2026.
-- Toca SOLO extra->'horarios' (jsonb_set en esa ruta): el resto de `extra` (d1, backup, regimen, exam_date, horarios_legacy_deep_prime…)
-- y las demás columnas de la fila quedan intactos. Estructura idéntica a la anterior (weekday[3] · weekend[2] · apex/hora/titulo/pasos/fuente):
-- la app (EncapsPlanView.tsx) solo lee esos bloques.
-- Qué cambia respecto al texto v5.4 (02-sep-2026):
--   · eval anclada: «si fallas ≥2 → el tema vuelve caliente y DESPLAZA al del día siguiente» era falso. Lo implementado
--     (gen_encaps_semana.js) es: fallos ≥2 → el código queda CALIENTE para el override de la SEMANA SIGUIENTE (máx. 2
--     sustituciones, I-3/V-2 intocables, un crítico solo se cede si ya está ≥85 % con n ≥ 5). Nada se desplaza esa semana.
--   · eval del lunes = 5Q rehechas con OTRO enfoque de los fallos del mini-sim del viernes; martes = código del lunes; etc.
--   · semana 1 (lun 14 y mar 15-sep): PRE-TEST DE ARRANQUE 20Q + 20Q sustituye el contenido del banco del día (no el horario).
--   · fuentes: los runners pre-generados de BANCO_PROPIO (banco_/eval_/minisim_<fecha>.html); QX queda como complemento por área.
UPDATE study_metrics
SET extra = jsonb_set(extra, '{horarios}', $J$
{
 "_nota": "v5.10 (12-sep-2026): 1h/día 16:15-17:15 L-V según DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md · weekday = lun-jue · weekend = plantilla del VIERNES mini-sim (la app la usa solo si today.simulacro está seteado) · sáb/dom libres · el horario deep-prime anterior quedó en horarios_legacy_deep_prime · regla REAL de la eval anclada (gen_encaps_semana.js): fallos ≥2 → código CALIENTE para el override del viernes (semana siguiente); NO desplaza al tema del día siguiente · semana 1 (lun 14 y mar 15-sep): PRE-TEST DE ARRANQUE 40Q (5Q × 8 críticos, ítems reales 2024-2A→2025-2) sustituye el CONTENIDO del banco del día, no el horario",
 "weekday": [
  {
   "apex": false,
   "hora": "16:15-16:30",
   "titulo": "EVAL ANCLADA — 5Q del código de AYER (lunes: fallos del mini-sim)",
   "pasos": [
    {
     "t": "16:15-16:30",
     "d": "5Q del código de AYER, de memoria, sin material: 3 cifras + 2 viñetas, solución al final. Lunes = 5Q rehechas con OTRO enfoque de los fallos del mini-sim del viernes; martes = código del lunes; miércoles = código del martes; jueves = código del miércoles (el viernes no lleva eval: el mini-sim ocupa las 16:15). Si fallas ≥2 → el código queda CALIENTE para el override del viernes (gen_encaps_semana.js: máx. 2 sustituciones/semana, I-3 y V-2 intocables, un crítico solo se cede si ya está ≥85 % con n ≥ 5). NO desplaza al tema del día siguiente. D1 (lun 14-sep): sin eval."
    }
   ],
   "fuente": {
    "url": null,
    "label": "BANCO_PROPIO/eval_<fecha>.html (runner pre-generado: node DATA/_scripts/gen_encaps_minisim.js --eval <fecha>)"
   }
  },
  {
   "apex": true,
   "hora": "16:30-17:10",
   "titulo": "BANCO DEL DÍA — 20-25Q CIEGAS del código y SUB-EJE de la rotación",
   "pasos": [
    {
     "t": "16:30-17:10",
     "d": "16-20Q del código ceñidas al sub-eje del día (◈ Sub-eje de hoy) + 4-5Q del secundario de cola larga, pregunta-por-pregunta con corrección inmediata (método Palmerton) y confianza 1-3 por ítem. Nivel ≥ examen real, distractor = concepto vecino. Orden de fuentes: BANCO_PROPIO (runner) → postests Theomed → banco QX (por área) → sets nuevos (motor 4 factores). Lun 14 y mar 15-sep: PRE-TEST DE ARRANQUE 20Q + 20Q (pretest_arranque_<fecha>.html, modo examen 72 s/Q, solución al final) en vez del banco del día."
    }
   ],
   "fuente": {
    "url": "https://virtualqxmedic.com/bancos-app/dashboard",
    "label": "BANCO_PROPIO/banco_<fecha>.html · complemento: QX Banco de Preguntas (por área, no filtrable por código)"
   }
  },
  {
   "apex": false,
   "hora": "17:10-17:15",
   "titulo": "CIERRE DE 1 LÍNEA — registro + ≤3 APEX",
   "pasos": [
    {
     "t": "17:10-17:15",
     "d": "Exportar el JSON del runner → node DATA/_scripts/gen_encaps_minisim.js --registrar <export.json> (da la línea de cierre; --append para rondas mixtas) → node DATA/_scripts/gen_encaps_semana.js --cerrar \"EXAMEN|tipoRonda|fecha|codigo|n=|seg=|dud=|fallos|t=\" --sql (INSERT en study_progress vía execute_sql; regenera PERFIL_CONOCIMIENTO.md). ≤3 APEX: solo los fallos knowledge/transfer generan tarjeta (OLVIDO/CRONOLOGÍA → Anki) o nota (CONCEPTO/CCSN → Obsidian); los de proceso generan regla de examen."
    }
   ],
   "fuente": {
    "url": null,
    "label": "DATA/ENCAPS/TRACKING_ERRORES (_registro_resoluciones.json · PERFIL_CONOCIMIENTO.md generado)"
   }
  }
 ],
 "weekend": [
  {
   "apex": false,
   "hora": "16:15-16:45",
   "titulo": "🔥 MINI-SIMULACRO 25Q mixtas cronometradas (72s/Q)",
   "pasos": [
    {
     "t": "16:15-16:45",
     "d": "Receta fija (extra del viernes): 8Q II · 7Q I · 5Q V · 3Q III · 2Q IV, 50 % viñeta, ≥10Q críticos, ≥5Q fallos previos con OTRO enfoque, 5-6Q de los 2 códigos de cola larga del viernes. Modo examen estricto, sin ayuda, solución al final (BANCO_PROPIO/minisim_<viernes>.html, pre-generado)."
    }
   ],
   "fuente": {
    "url": "https://virtualqxmedic.com/bancos-app/dashboard",
    "label": "BANCO_PROPIO/minisim_<viernes>.html · complemento: postests Theomed / QX por área"
   }
  },
  {
   "apex": false,
   "hora": "16:45-17:15",
   "titulo": "Corrección + patrón de fallos + cierre semanal",
   "pasos": [
    {
     "t": "16:45-17:15",
     "d": "Corrección 1×1 por código → nota /25 en ▲ SIM (study_sim_scores, sim_n = día) + cierre con tipoRonda=mini_sim y nota=NN (umbral ≥18/25 hacia diciembre; <15/25 dos viernes seguidos → override obligatorio). Luego node DATA/_scripts/gen_encaps_semana.js --sql: % ciego semanal, temas calientes (n ≥ 5 por código) y override de la semana siguiente, que se ACUMULA en SEMANAS/overrides_acumulado.json → node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-09-14 --override SEMANAS/override_<lunes>.json → execute_sql (backup study_schedule_bk_<YYYYMMDD>, DELETE solo modo=MANTENIMIENTO)."
    }
   ],
   "fuente": {
    "url": null,
    "label": "DATA/ENCAPS/TRACKING_ERRORES/SEMANAS (semana_<lunes>.md · override_<lunes>.json · overrides_acumulado.json)"
   }
  }
 ]
}
$J$::jsonb, true)
WHERE examen = 'ENCAPS';
-- verificación: select examen, extra->'horarios'->'_nota', jsonb_array_length(extra->'horarios'->'weekday') wd, jsonb_array_length(extra->'horarios'->'weekend') we from study_metrics where examen='ENCAPS';

-- 19-sep-2026 (v5.14, 2.ª capa): columna `extra` JSONB en usmle_daily_scores (cambiadas · relecturas · nFallos · nConocidos · bloquesPct).
-- Aplicada el 19-sep; copia canónica en DATA/_scripts/_migrations/usmle_daily_scores_extra.sql
ALTER TABLE usmle_daily_scores ADD COLUMN IF NOT EXISTS extra JSONB;
