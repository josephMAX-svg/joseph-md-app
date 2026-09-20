# SISTEMATIZACIÓN · sáb 19-sep-2026 — pasada de integradores (régimen v5.14)

**Régimen vigente: v5.14 · D1 = LUN 21-SEP-2026 · D95 = mié 3-feb-2027 = D-1 DENTRO del plan · EXAMEN TARGET JUE 4-FEB-2027**
(15 hábiles perdidos desde el 31-ago; decimotercer corrimiento). Regla permanente de Joseph: **no se fusiona ni se recorta
contenido**; cada día no estudiado mueve el examen un hábil más. Verificado con node el 19-sep: `usmleStep1Daily.ts` = 95 filas,
D1 `2026-09-21`, D95 `2027-02-03`, `DAILY_META.examenTarget = 2027-02-04`; ENCAPS `STUDY_D1 = 2026-09-21` · `STUDY_TOTAL_DAYS = 92`.

> Este documento cierra la pasada de agentes del 19-sep (integrador-mir · integrador-usmle-codigo · integrador-encaps ·
> integrador-liviano-synapse-derma · calendar-A/B + calendar-doc · docs-usmle · docs-resto). Es la referencia a la que remiten
> `DATA/PENDIENTES_JOSEPH.md` § "Segunda capa — lo que SIGUE ABIERTO", `DATA/USMLE/_palmerton_v3_extractos/SEGUNDA_CAPA_ESTADO.md` §3
> y `DATA/REESTRUCTURACION_31AGO_2026.md` §17.8. Contexto previo: `DATA/_HANDOFF_v5_14_PENDIENTE.md` (§2 lo hecho antes de esta
> pasada, §4 datos v5.14, §5 decisiones). Todo lo citado abajo se confirmó con `grep`/`git diff` sobre el working tree el 19-sep
> (noche); lo no confirmable lleva **A VERIFICAR (19-sep)**. Nada de esta pasada tocó git, Supabase (salvo lecturas) ni la memoria.

## 0 · Resumen

| Sección | Hecho | Parcial (por qué) | Exige decisión de Joseph (default vigente) |
|---|---|---|---|
| MIR pool → UI | pool oficial cableado en HoyView (5 segmentos), MantenimientoView (Tier C jueves) y Derma 13:30; espejo `q_ids` verificado | limpieza opcional `DermaMir10Q` (fuera de lista) | jueves Tier C reducidos = solo Tier C · pre-test primero · semilla mini-MIR por fecha · cuaderno de imágenes |
| USMLE hallazgos del crítico | 10 de 19 ítems P0/P1 hechos; 9 hechos en la app | DDL JSONB `extra` · telemetría Anki · README §4b · REVISION_SEMANAL · deck pharm en la UI · Calendar (agente aparte, ya hecho) | ninguna nueva (las de ⚪ siguen) |
| ENCAPS | `useEncapsPlan` → `regimenDe()` vivo · rama `modo='INTENSIVO'` completa · `--pull` · eval/banco nunca 0Q (fallback) | docs ENCAPS (`--pull`, fallback) · `gen_encaps_intensivo_2027.js` sin `--out` y con comentario obsoleto · `study_metrics.extra.horarios` de la intensiva | franjas de la intensiva · arranque vie 5 / lun 8-feb · umbral sim /100 (85 / alerta 70) · reponer stock de bancos · fecha real ENCAPS 2027-I |
| LIVIANO / SYNAPSE / Derma / agente_estudio | score LIVIANO persistido + espejo Supabase · decks `APEX::LIVIANO::*` + `APEX::USMLE::Pharmacology` · `_kpi/` · KPI 1.ª review Anki (Cockpit + revisión semanal) · bloque MIR en `gen_revision_semanal.js` · Derma re-anclada a v3 · vault Derma marcado histórico | texto "fuera del rango S1-S12" desfasado en `gen_revision_semanal.js:450` · `UsmleTodayPlan.tsx:264` no pasa `matType` · bloque "evaluación clínica del paciente con obesidad" sin verificar · `Metricas_v2`/`Outputs` del Excel | importar el CSV LIVIANO (D16 lun 12-oct) · crear los 8 sub-decks |
| Calendar | 12 overlays + examen + D94/D95 · 12 🔬 · 38 series · 6 extensiones D93-D95 · 📋 REVISIÓN SEMANAL · §16 de `CALENDAR_SEGMENTOS_V5_6.md` | `list_events` de lun 21-sep y 1-4 feb no hecho · texto literal SYNAPSE sáb/dom no releído | sáb vs dom · 4 títulos · ALUMUERZO · ALISTARSE martes · GYM/BAILE víspera · series secundarias el jue 4-feb |

## 1 · MIR · pool oficial → UI (integrador-mir)

**Hecho**
- `src/components/study/MirPoolEval.tsx` (NUEVO): `poolConFallback(capId, num, n, excl)` (:20; capítulo → asignatura, devuelve `ids/delCap/deAsig`),
  `MirPreguntaVista` (:30; enunciado + 4 opciones, clave definitiva al tocar, enlace al cuaderno oficial, marca imagen/confianza/nota),
  `MirPoolLista` (:51; plegable por segmento, "faltan n → test del capítulo ProMIR"), `MirPoolEvalCompacta` (:69; registra vía `mirEvalLogAppend` con `qIds`).
- `src/components/study/MirTodayPlan.tsx` › HoyView: memo `pool` reserva `qIds` en orden horario (anclada 2Q/1Q/1Q → cierre 10Q mezcla
  determinista por asignatura → pre-test 5Q → quiz 10Q → mini-MIR D77 40Q `preguntasMixtasSinUsar`), cada segmento excluye `mirUsadasIds`
  (log local + espejo) + lo reservado antes ese día; `EvalForm`/`CierreCard` reciben `qIds`; `MirPoolLista` en cada segmento.
- `MirTodayPlan.tsx` › MantenimientoView: `qIds` del banqueo (:793, kind `mantenimiento`); jueves con `dia.tierC` → 2.º `EvalForm` (:804;
  asignatura/capId/num de `tierC`, `qIds` capítulo→asignatura) + chips "TIER C EXPRESS" y "próximo Tier C" (`mirMantProximoTierC`, :729).
  Regla nQ: reducido 10Q (M3/M8/M13) = solo Tier C; normal 25Q = 15 foco + 10 Tier C.
- `src/components/study/DermaTodayPlan.tsx`: `DermaMirPool` (:153; `promirDermaCapDe(d)` → `poolConFallback(cap.capId, 5, 10, usadas)` :161 →
  `MirPoolLista` + `MirPoolEvalCompacta` kind `derma10Q`); sin pool sin usar → cae a `DermaMir10Q` (fichero no tocado).
- Supabase (solo lectura): `mir_eval_log` tiene `q_ids jsonb` (+ `kind`, `cap_id`), 0 filas el 19-sep; `mirEvalSync.ts` mapea `q_ids` en push y pull
  → cerrado el "A VERIFICAR (13-sep)" del espejo.
- Docs: `DATA/MIR/POOL_USO.md` §1 fila `qIds`, §2-§4 párrafos "cableado 19-sep", §5 reescrito como "Estado de la UI (cerrado 19-sep-2026)";
  `DATA/MIR/pool/README.md` § Pendientes: "cablear el pool en la UI" tachado. `DATA/MIR/README.md` (docs-resto): tabla de las 16 asignaturas
  fuera del plan (:96) y aviso "cobertura medida ≈80 %" en la fila D78 (:67).
- Verificado con node contra el pool real: D1 pre-test 5 ids (2025-041 · 2024-049 · 2024-050 · 2023-052 · 2022-046) y quiz a 0 del pool (fallback
  ProMIR declarado); mini-MIR 40/40 (11 asignaturas); Tier C M18 9 cap/28 asig; Derma 30 usables. `npx tsc --noEmit -p .` = 0.

**Parcial** — `src/components/derma/DermaMir10Q.tsx` podría aceptar `qIds?: string[]` y entonces `DermaMirPool` lo usaría en vez de
`MirPoolEvalCompacta` (evita dos formularios distintos para el mismo kind). Fuera de la lista del agente; opcional.

**Decisión de Joseph (default vigente)**
1. Jueves Tier C REDUCIDOS (M3 jue 14-ene · M8 jue 21-ene · M13 jue 28-ene, 10Q): **default = las 10Q son todas Tier C** (sin form foco);
   alternativa 10Q foco + 10Q Tier C (20Q, rompe el "reducido").
2. Pre-test 5Q se lleva las preguntas más recientes del capítulo y el quiz sigue con las siguientes: en capítulos con ≤5 usables (D22, D57, D60,
   D66, D4, D33, D48, D52, D53, D55, D58, D62…) el quiz queda 100 % ProMIR. **Default = pre-test primero** (POOL_USO §2).
3. Mini-MIR D77 (vie 8-ene-2027): semilla = `dia.fecha` → si el día se corre otra vez la mezcla cambia. **Default = por fecha**; alternativa semilla fija 'D77'.
4. Cuaderno de imágenes MIR fuera del repo (`gen_mir_pool.js --descargar --con-imagenes`; leyenda "prohibida la reproducción"): la vista marca
   "🖼 imagen n (cuaderno)" y enlaza el PDF oficial. **Default = no descargar.**

## 2 · USMLE · hallazgos del crítico que son código (integrador-usmle-codigo)

Detalle ítem a ítem con `fichero:línea` en `SEGUNDA_CAPA_ESTADO.md` §3 (líneas `→ ESTADO 19-sep:`). Resumen:

**Hecho (10)**: lectura del UWSA1 por tramos `HITOS_ONTRACK[0].tramos` + `lecturaHito` (#12, `usmleScores.ts:268/286`, `src/components/study/UsmleHub.tsx:132/148/152`) ·
kit anti-pánico `PROTOCOLO_BLOQUE` + `jmd-usmle-worstcase` (#26, `assemble_usmle_ts.js:186` → `usmleStep1Daily.ts:180`, `UsmleTodayPlan.tsx:173`,
`UsmleHub.tsx:158`) · bug `diaPrevio` post-hito (#6, `assemble_usmle_ts.js:113-119` → `usmleStep1Daily.ts:107-118`; verificado con node en los
12 días post-hito v5.14) · gate N3/N2 por sistema (#13, `usmleScores.ts:232/406`) · NBME por bloque `bloquesPct` + `plantillaPorSistema` (#27,
`usmleScores.ts:58/453`, `UsmleTodayPlan.tsx:385`) · `Temporizador` 2:00/12:00/60:00 (#10, `UsmleTodayPlan.tsx:415`) · `TIPO_ERROR_INFO.tarjeta`
(#18, `usmleScores.ts:26`) · `usmleData.ts` 3 de 4 puntos (#19: `FIRST_AID_INDEX.role` :188 · `USMLE_RAMP_LEGACY` :108 · nota biochem :87) ·
toggle "día PARCIAL" (§12.6-10, `UsmleTodayPlan.tsx:119`, `usmleScores.ts:437`) · residuos v5.14 (chip TAPER, "examen jue 4-feb", `TaperCard`).

**Hecho en la app con resto fuera de ella (9)**
- #5 `DAY_AFTER` (`usmleStep1Daily.ts:200`, `UsmleTodayPlan.tsx:184`) → Calendar: **hecho por calendar-B** (series 07:15/09:00/11:00/18:00 con FRANJAS).
- #8 regla del tercio · #11 respuestas cambiadas/relecturas · #28 shopping list · #30 checklist §11.5 · #16 backlog → **falta el bloque en
  `DATA/REVISION_SEMANAL.md` y en `gen_revision_semanal.js`** (métrica correspondiente) + README USMLE §4b.
- #11 persistencia: JSONB `extra` en `usmle_daily_scores` — **DDL pendiente** (`ALTER TABLE usmle_daily_scores ADD COLUMN IF NOT EXISTS extra JSONB;`);
  hasta aplicarlo el upsert reintenta sin la columna y los campos quedan solo en local.
- #15 `ANKI_CONFIG_PALMERTON` (`usmleData.ts:144`, `UsmleHub.tsx:207`) → **falta `anki_telemetria.js`** (`getDeckConfig` → `rev.perDay` ≥ 9999, rollover 4).
- #14 mazo Pharm: `usmleAnkiDeck(system, matType?)` + `USMLE_PHARM_DECK` ya en `ankiLinks.ts:41-44` (integrador-liviano) **pero
  `UsmleTodayPlan.tsx:264` sigue llamando `usmleAnkiDeck(dia.system)` sin `dia.matType`** → un diff de una línea (días pharm v5.14: D12 · D24 · D46 · D48 · D78, leídos con node).
- #17 regla del frente (`usmleStep1Daily.ts:219`, `usmleData.ts:136`) → Calendar: **hecho por calendar-B**.
- #21 `PISO_AMBAR` (`usmleScores.ts:397`) → falta la frase "65/60 = pisos ÁMBAR (gate 80)" en `REVISION_SEMANAL.md`.
- #19 4.º punto: **A VERIFICAR (19-sep)** (ver §3 de SEGUNDA_CAPA_ESTADO).

**Decisión de Joseph**: ninguna nueva; las P2 siguen en la tabla ⚪ de PENDIENTES.

## 3 · ENCAPS · régimen dinámico · rama INTENSIVO · `--pull` · eval sin 0Q (integrador-encaps)

**Hecho**
- `src/lib/encapsPlan.ts`: `useEncapsPlan` cableado a `regimenDe()` (cabecera :9; `StudyRegimen` :39; `regimenDe` :41): `hoyDia = diaActual(examen,
  regimen.d1, regimen.total)`, `total = regimen.total`, re-sincroniza el día visible al llegar el régimen vivo salvo navegación manual (ref `navegado`);
  `regimen` expuesto (`origenD1/origenTotal`). Probado con node: fallback → {2026-09-21, 92, fallback}; con `study_metrics.extra {d1, dias_ciclo}` →
  study_metrics; con filas INTENSIVO (dia 98-122) → total 122 study_schedule. **`STUDY_TOTAL_DAYS` ya NO es fijo.**
- Rama `modo='INTENSIVO'` en `itemsForDay` (:575): sims (pretest · sim100 · dress_rehearsal → ítem 'sim' 100Q·72 s/Q + cierre con nota /100 →
  `study_sim_scores` sim_n = dia), `senales`, `medio_dia`, `repaso_final`, `loop` (8 segmentos de `extra.loop` con hora calculada, kind por texto,
  detail con `extra.repaso` D-1/D-3/D-7, `critico_v3`, `sub_eje`, `drill_cifras`, `paraguas`; secundarios como `i_sec`). Helpers exportados:
  `ENCAPS_INTENSIVO_SIM_TIPOS`, `ENCAPS_SIM100_META` (:141; umbral 85 = `ENCAPS_CIEGO_META_PCT`, alerta 70; pretest 70), `esSimIntensivo`,
  `simIntensivoDe`, `encapsSim100Zone` (:164), `loopDe` (:171), `repasoIntensivoDe`, `tipoRondaDe` (:186). `simDays` incluye los 3 tipos.
  Probado en seco contra las 25 filas de `gen_encaps_intensivo_2027.js 2027-02-08 2027-03-14` (SQL en scratchpad; **nada sembrado en Supabase**).
- `src/components/EncapsPlanView.tsx` (mínimo): `SimView` ya no revienta con `simulacro` NULL; sims de la intensiva con escala /100 (zona
  verde/ámbar/rojo); hint de horario INTENSIVO; el CIERRE DE SESIÓN prellena el tipo de ronda con `tipoRondaDe(today)` y n=100.
- `DATA/_scripts/gen_encaps_semana.js` — modo `--pull [--dry] [--desde] [--hasta]` (cabecera :31-38): lee `study_progress` (examen ENCAPS, fuente
  `app:cierre`) por REST con la anon key de `src/lib/supabase.ts`, reconstruye rondas v3 desde `errores_por_tipo`, dedup por fecha+codigo+tipoRonda y
  por `_app_id/_supabase_id`, marca `_fuente 'app:cierre'` + `_meta.ultimo_pull`, recalcula resumen + PERFIL. Probado contra Supabase real (0 filas: aún
  no hay cierres) y contra un mock (idempotente); registro y PERFIL restaurados (git status DATA/ENCAPS vacío). **Cierra la decisión ⚪ "convergencia
  registro ↔ Supabase": flujo = viernes ANTES del cierre semanal `--pull` → `--semana`.**
- `DATA/_scripts/gen_encaps_minisim.js` — `completarConFallback()` (:365; cadena: 1 reales del mismo código ya usados "re-test con otro enfoque" →
  2 otros sub-ejes del código → 3 `banco_items_v1` del área → 4 cola larga del área → 5 último recurso área/pool), aplicada a la EVAL <5Q (:485) y al
  BANCO principal <16Q (:425); `_meta.fallback`, ítems `retest:true`, etiqueta "re-test (otro enfoque)" en el runner. Pruebas: `--eval 2026-10-22 --dry`
  1Q libre de V-2 → 5Q; `--banco 2026-10-22 --dry` 0Q libres de III-5 → 16Q; `--semana 2026-09-21 --dry` idéntica byte a byte. **Ningún fichero de
  BANCO_PROPIO regenerado.**
- Cabeceras "v5.14 (19-sep)" en los 4 ficheros; tsc = 0; line endings preservados.

**Parcial (por qué: ficheros fuera de la lista del agente)**
- Docs ENCAPS: `PROTOCOLO_HORA_MANTENIMIENTO.md` y `FASE_INTENSIVA_2027-I.md` aún no describen `--pull` ni la cadena de fallback (grep "pull" = 0).
  Texto propuesto: "v5.14 (19-sep): el CIERRE DE SESIÓN de la app escribe `study_progress` (fuente `app:cierre`); `node DATA/_scripts/gen_encaps_semana.js
  --pull` lo trae al registro v3 sin duplicar (clave fecha+codigo+tipoRonda); `--pull --dry` solo informa. La eval nunca sale con 0Q: `_meta.fallback` + ítems `retest`."
- `gen_encaps_intensivo_2027.js` líneas 7-9 ("la app necesita STUDY_TOTAL_DAYS = 102 + N y una rama modo INTENSIVO — pendiente") **OBSOLETO**; el
  generador no acepta `--out` (escribe siempre `DATA/_scripts/_encaps_intensivo_2027.sql`, versionado) → añadir `--out <ruta>`.
- `study_metrics.extra.horarios` sigue siendo el de MANTENIMIENTO: al sembrar la intensiva hay que re-sembrar `horarios` (weekday/weekend).
- Verificación E2E en Vercel tras el export: bundle con `ENCAPS:92` e `inicio:'2026-09-21'`; la vista ENCAPS debe mostrar D1 el lun 21-sep con
  `regimen.origenD1 = study_metrics` (`extra.d1` ya sembrado: 2026-09-21 / 92).

**Decisión de Joseph (default vigente)**
1. Franjas de la FASE INTENSIVA (feb-mar 2027): `extra.loop` hereda las horas del loop USMLE v5.6 (05:00 Anki · 07:15 repaso · 08:15 pre-test · 09:00
   deep prime · 11:00 30Q · 12:00 cierre · 17:15 anclaje · 18:00 eval); el 17:15 choca con LIVIANO/Research. **Default = mantener el esqueleto y
   confirmar horas en la reestructuración de febrero** (la app muestra "A CONFIRMAR").
2. Arranque: vie 5-feb (= pre-test 2026-II el mismo viernes, **sin semana de señales**) o lun 8-feb (semana 1 completa: señales lun + calentamiento +
   pre-test vie 12-feb; dia 98-122 con examen asumido 14-mar). **Default = lun 8-feb.** Los días 93-97 (1-5 feb) quedan sin fila → la app muestra
   "sin sesión". Esto responde el "A VERIFICAR (19-sep)" de la fila ⚪ A de PENDIENTES.
3. Umbral del sim /100: runner 85 % (`ENCAPS_CIEGO_META_PCT`) y alerta <70 %; el pre-test 2026-II usa ≥70. **Default = 85/70; cambiar `ENCAPS_SIM100_META` si no.**
4. Reponer stock de bancos (V-2 179 · I-3 165 · III-5 90 antes del jue 22-oct) = CONTENIDO de Joseph; mientras tanto el fallback re-testea (jue 22-oct = 16Q re-test).
5. Fecha real del examen ENCAPS 2027-I (convocatoria SERUMS) antes de sembrar la intensiva (⛔ el SQL no se aplica hasta entonces).

## 4 · LIVIANO · SYNAPSE · Derma · agente_estudio (integrador-liviano-synapse-derma + docs-resto)

**Hecho**
- **LIVIANO mide retención**: `src/lib/livianoScore.ts` (NUEVO; `LIVIANO_SCORE_KEY = 'jmd-liviano-score'` :22, `loadLivianoScore` :40, `espejarLivianoScore`,
  `pullLivianoScores`, `mergeLivianoScore`): pre-tests 5Q de lunes, drills D37/D58/D75/D88 y rúbrica 0-2×4 de los 16 casos; localStorage + espejo en
  `study_progress` (examen 'LIVIANO', fuente 'app:liviano', sin DDL). `LivianoTodayPlan.tsx` (:232 prop `onIrALogistica`, :256 pull al montar, :375 botón
  "Academia → Logística F5"); `src/components/empresa/EmpresaHub.tsx:47` (`render(go)`). Cierra `gaps_v3b_business` #1 (parcial → hecho en la app).
- **Decks**: `src/lib/ankiLinks.ts` — `APEX::LIVIANO::<modulo_slug>` re-exportado desde `livianoCasos.ts` (8 sub-decks, `LIVIANO_ANKI_DECKS` :116; CSV
  `DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv`, 216 tarjetas) + `USMLE_PHARM_DECK = 'APEX::USMLE::Pharmacology'` y `usmleAnkiDeck(system, matType?)` (:41-44).
- **KPIs**: `DATA/BUSINESS/_kpi/README.md` (NUEVO; destino del botón "Exportar JSON" del Cockpit F1, nombre `liviano_kpi_<AAAA>-W<SS>.json`, forma del JSON).
- **KPI 1.ª review de Anki** (regla "05:00 sin excepción"): `CockpitStatusBar.tsx:85-89` (`primeraReviewDe`, verde ≤05:10 · ámbar · rojo) y
  `gen_revision_semanal.js:353` (métrica 3 `primeraReview` + alarma ≥2 días hábiles).
- **Bloque MIR en la revisión semanal** (gap MIR 7): `gen_revision_semanal.js` lee `mirMantenimiento.ts` (:114) y `mir_eval_log` de Supabase (:190), métrica 5
  = unión por id export ∪ Supabase, % quiz/pre-test/neto, temas CALIENTES (regla del gate) y sesiones de mantenimiento (:371); métrica 7 lee
  `_vibecoding_ship.json` (:15/:47/:302). `homeBriefing.ts:103` comentario `STEP1_SEMANAS` ya en v5.14 (S1 = 21-25 sep → S20 = 1-5 feb).
- **Derma re-anclada a v3**: `dermaCerebro.ts:8-10` (35/35 fichas comprobadas con node; `dV21` conserva el d de la v2.1; `DERMA_DRILL_DIAS` eliminado, :25
  → `DERMA_DRILL_DIAS_V3` derivado de `drillHDPH`); `dermaLedger.ts:225` (comentario "2ª pasada FSRS" = parciales d47-d49 + REPASO d72);
  `obsidianDermaMap.ts:10` y `build_vault_derma.js:25` marcados ⚠ HISTÓRICO (vault d44-d70 = numeración v2.1; `dermaObsUrlDay(dV3)` traduce con el mapa inverso; NO se regenera el vault).
- **Docs** (docs-resto, verificados con grep): `PROTOCOLO_MODO_MINIMO.md` (S6 deload post-NBME 26 :83, S12 :84), `REVISION_SEMANAL.md`, `ROADMAP_MAESTRO_2026-2034.md`,
  `SYNAPSE/CURSO_IA_04H_31AGO.md`, `SYNAPSE/motor-dia-a-dia.md`, `SYNC_ANKI_OBSIDIAN_APP.md`, `RESEARCH/RUTA_PUBLICACION_2027.md` §9 (:162 "solo lectura,
  se regenera desde `research_entregables`" con `mesaMarkdown()`), `BUSINESS/LIVIANO_ACADEMIA.md` (trimestral D46 lun 23-nov), `ENCAPS/AUDITORIA_AGENTE_ESTUDIO_2026-07-02.md` en v5.14.
- **agente_estudio**: sin cambios de código (pipeline fuera del repo, abandonado vs la app viva); P0-2 (parser multilínea) y P0-3 (nota Obsidian vacía)
  siguen abiertos → regla vigente: NO enviar notas `::OBSIDIAN` por el pipeline.

**Parcial (por qué)**
- `gen_revision_semanal.js:450` conserva el texto "fuera del rango S1-S12 (14-sep → 4-dic)" (v5.11): en v5.14 es **21-sep → 11-dic** (S12 = 7-11 dic). Una línea.
- `UsmleTodayPlan.tsx:264` no pasa `dia.matType` a `usmleAnkiDeck` (ver §2 #14; fichero del agente USMLE, que cerró antes de existir el helper).
- "Evaluación clínica del paciente con obesidad" (`gaps_v3b_business` #3): sigue **A VERIFICAR (19-sep)** que exista un bloque de días dedicado en
  `livianoStudyPlan.ts` (anamnesis/antropometría/labs, SAOS/MASLD/SOP, causas secundarias, embarazo/anticoncepción con GLP-1, TCA). Si no, contenido nuevo para febrero.
- `Metricas_v2` y `Outputs` del Excel LIVIANO: siguen fuera de la app (el `_kpi/README.md` no los menciona) → **A VERIFICAR (19-sep)**.
- Los 8 sub-decks `APEX::LIVIANO::*` **no existen en Anki** (Anki cerrado; se crean al importar el CSV) → Joseph.

**Decisión / acción de Joseph**: importar `LIVIANO_mecanismo.csv` (default: D16 lun 12-oct-2026, `LIVIANO_ACADEMIA.md`) · sesión AccessDerma (🟡 Derma) · VITALS (🔵).

## 5 · Google Calendar (calendar-A/B + calendar-doc) — `josephsototocas@gmail.com` · America/Lima

**Hecho** (ids en `_HANDOFF_v5_14_PENDIENTE.md` §2.1 y `DATA/ENCAPS/CALENDAR_SEGMENTOS_V5_6.md` §16 :855-:915, releídos con `get_event` el 19-sep)
- UWSA1 `o1gla7846uae4tgngvc4q45osg` → lun 21-sep 09:00-13:00; 11 overlays NBME25-33/UWSA2/Free120 con D# v5.14; examen `oinh139dsnbuma9r3kfu56dhkc`
  → jue 4-feb-2027 07:00-16:00; overlays nuevos D94 `neboplchsaua4snj39nrl480nc` (mar 2-feb 07:15-12:00) y D95 `n90bdqhohadu1eqbctv148dn28` (mié 3-feb 05:00-12:00).
- 12 overlays 🔬 Research vía `gen_research_calendar.js --set` (`--check` = 0).
- UNTIL resuelto con **6 series de extensión** D93-D95 (repaso 07:15 · pre-test 08:15 solo lun 1-feb · ANKI AM · DEEP PRIME · 30Q · eval 18:00 MO,TU);
  ENCAPS 16:15 no se extiende (termina el 29-ene, la intensiva lleva serie propia).
- 📋 REVISIÓN SEMANAL `21fbiohc1i47r4lqmaa3eb76l4` (sáb 07:15-07:35 desde el 26-sep, UNTIL 7-feb).
- 38 series con descripción v5.14: 07:15 / 09:00 / 11:00 / 18:00 alineadas a FRANJAS (5Q timed · regla del frente · EO + shopping list · 10Q 90 s
  rule-in→juez→flag), MIR 15:15 con `MIR_FRANJAS`, MIR 15:30, SYNAPSE 12:30, SYNAPSE sáb/dom sin `<br>`, Research↔Derma, 9 GYM/BAILE con etiqueta v5.14
  (3 ids nuevos). → cierra el 🟠 "Calendar — sesión de 20'" puntos 1-4 y los hallazgos #1-#4 del crítico + gap MIR 8.

**Parcial** — no se hizo `list_events` del lun 21-sep ni del 1-4 feb-2027 (recuento por día) ni se releyó el texto literal de SYNAPSE sáb/dom → **A VERIFICAR (19-sep)**
en el workflow de verificación completa.

**Decisión de Joseph (default vigente)**: revisión semanal sáb (creada) vs dom · 4 títulos desalineados (07:15 "2Q", 11:00 "tutor", MIR 15:15 "4Q",
MIR 15:30 "Free Recall") · "ALUMUERZO" · ALISTARSE martes 18:30 · GYM/BAILE de la víspera (mié 3-feb) · series secundarias el jue 4-feb (default: dejarlas, el overlay avisa).

## 6 · Restos para el orquestador (fuera de las listas de los agentes; ninguno exige decisión)

1. `src/components/study/UsmleTodayPlan.tsx:264` → `usmleAnkiDeck(dia.system, dia.matType)` (#14).
2. `DATA/_scripts/gen_revision_semanal.js:450` → "fuera del rango S1-S12 (21-sep → 11-dic)".
3. `DATA/_scripts/gen_encaps_intensivo_2027.js:7-9` comentario obsoleto + opción `--out <ruta>`.
4. `DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md` + `FASE_INTENSIVA_2027-I.md`: flujo `--pull` + cadena de fallback + "la app ya renderiza modo INTENSIVO
   (loop 8 segmentos, sims /100 con sim_n = dia, total dinámico por max(dia) de `study_schedule`)".
5. Supabase DDL: `ALTER TABLE usmle_daily_scores ADD COLUMN IF NOT EXISTS extra JSONB;` (#11/#27; hasta entonces solo local).
6. `DATA/_scripts/anki_telemetria.js`: `getDeckConfig` → `rev.perDay` ≥ 9999 · rollover 4 (#15).
7. `DATA/USMLE/README.md` §4b (backlog §4.10, #16) y `DATA/REVISION_SEMANAL.md`: pisos ámbar 65/60 vs gate 80 (#21), regla del tercio (#8), abogado/relectura (#11),
   shopping list semanal (#28), checklist §11.5 (#30) — texto ya entregado por el agente USMLE en `SEGUNDA_CAPA_ESTADO.md` §3.
8. `src/components/derma/DermaMir10Q.tsx` prop `qIds?` (opcional, §1).
9. `src/lib/homeBriefing.ts`: tipar `primeraReview`/`primeraReviewEstado` en `AnkiKpi` (hoy `CockpitStatusBar` usa un tipo ampliado local).
10. Idempotencia pendiente desde v5.10: `remap_inicio.js 2026-09-21` + generadores → `git diff` vacío; `npx expo export --platform web`; Vercel (`USMLE Step 1 v5.14`,
    `inicio:'2026-09-21'`, `examenTarget:'2027-02-04'`, `ENCAPS:92`).

## 7 · Verificación de esta pasada

- `npx tsc --noEmit -p .` = 0 errores (reportado por los 4 integradores; **A VERIFICAR (19-sep)** de nuevo por el orquestador tras aplicar §6).
- Ficheros nuevos: `src/components/study/MirPoolEval.tsx`, `src/lib/livianoScore.ts`, `DATA/BUSINESS/_kpi/README.md`, este documento.
- Nada tocado en git (sin commit), Supabase (solo `execute_sql` de lectura y REST anon), BANCO_PROPIO, memoria de Claude ni `.claude/`.
