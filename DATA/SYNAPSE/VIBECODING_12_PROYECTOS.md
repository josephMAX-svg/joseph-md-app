# 🧠 VIBECODING — 12 proyectos semanales (S1-S12 · lun 07-sep → vie 27-nov 2026)

> GENERADO por `DATA/_scripts/gen_vibecoding_plan.js 2026-09-07` desde `DATA/SYNAPSE/vibecoding_proyectos.json` (editar el JSON, no este .md). Franja **04:15–05:00 L-V (45')** · sábado **PC SYNAPSE 15:00-17:00 = SHIP** del proyecto · domingo = Feynman del proyecto (10', opcional). Progreso real en la app: pestaña ⚡ run de SYNAPSE (PlanKey `vibecoding`, ✓ por día) y bloque 04:15 de MISIÓN DE HOY.

## Reglas (Palmerton aplicado a construir)

- Se mide por OUTPUT verificable (commit/URL viva/test verde), nunca por tiempo sentado (Palmerton: medir por resultado, no por material consumido). 5' objetivo → 35' construir con Claude Code → 5' commit + nota en synapse-journal.
- **Definition of done** = los 4 criterios de aceptación del proyecto verificados (commit hash / URL viva / test verde / dato en Supabase). Sin eso, el sábado PC se usa para cerrar; nada se arrastra a la semana siguiente.
- **Rotación** (repite subiendo nivel): `yocpmd` = Automatización YoCPMD (skills, hooks, generadores) · `preguntas` = Pipeline de preguntas ENCAPS/USMLE · `bots` = Bots CRM Pulso / LIVIANO · `contenido` = Contenido IA para las marcas
- **Deload**: La semana posterior a NBME 26 (26-30 oct) es DELOAD: carga 50% (2 días de 45' + 3 días de 15'), fechas intactas. NBME 28 (4-dic) cae fuera del rango S1-S12 — su deload (7-11 dic) lo cubre PROTOCOLO_MODO_MINIMO.md.
- **Cero inventos**: Todas las URLs de 'docs' respondieron 200 el 5-sep-2026 (check_links.js) y su contenido se extrajo con WebFetch a curricula/_extracted.json. Cero inventos. Lo que exija credenciales o decisión de Joseph está marcado "A VERIFICAR".
- Cada día cierra con 1 línea en `synapse-journal` (qué construí · qué aprendí · qué falta). El sábado de SHIP se marca el proyecto como shipped en la retro de S12.

## Calendario

| S | Proyecto | Rotación | L-V | SHIP (sáb PC) | Deload |
|---|---|---|---|---|---|
| S1 | Fix parser APEX (P0-2 / P0-3) + test multilínea | yocpmd | lun 07-sep → vie 11-sep | sáb 12-sep | — |
| S2 | Telemetría AnkiConnect en producción (due / backlog / retención) | yocpmd | lun 14-sep → vie 18-sep | sáb 19-sep | — |
| S3 | Captura diaria de scores USMLE → Supabase (pre-test / 30Q / eval + tipo de error) | preguntas | lun 21-sep → vie 25-sep | sáb 26-sep | — |
| S4 | gen_revision_semanal.js en producción (10 métricas con dato real) | yocpmd | lun 28-sep → vie 02-oct | sáb 03-oct | — |
| S5 | remap_todo.js: corrimiento de 1 comando + verificación automática | yocpmd | lun 05-oct → vie 09-oct | sáb 10-oct | — |
| S6 | RLS en datos_tesis y kappa_piloto (P0 de seguridad abierto desde el 2-jul) | yocpmd | lun 12-oct → vie 16-oct | sáb 17-oct | — |
| S7 | Puente VITALS → rendimiento (sueño y agua cruzados con % eval) | yocpmd | lun 19-oct → vie 23-oct | sáb 24-oct | — |
| S8 | Motor de preguntas ENCAPS semiautomático v0 (skill /pregunta-encaps) — semana DELOAD | preguntas | lun 26-oct → vie 30-oct | sáb 31-oct | **sí (50%)** |
| S9 | Migrador de overlays de hitos del Calendar (UWSA/NBME) tras cada corrimiento | yocpmd | lun 02-nov → vie 06-nov | sáb 07-nov | — |
| S10 | Bot WhatsApp → OCR → ficha LIVIANO (n8n Webhook + visión) | bots | lun 09-nov → vie 13-nov | sáb 14-nov | — |
| S11 | Pipeline de contenido de marcas (brief → 3 guiones + títulos + thumbnail) con la API de Claude | contenido | lun 16-nov → vie 20-nov | sáb 21-nov | — |
| S12 | Capstone: README del sistema YoCPMD + demo 5' + retro de 12 semanas | yocpmd | lun 23-nov → vie 27-nov | sáb 28-nov | — |

## S1 · Fix parser APEX (P0-2 / P0-3) + test multilínea

- **Semana**: lun 07-sep → vie 11-sep · **SHIP**: sábado sáb 12-sep (PC SYNAPSE 15:00-17:00) · rotación `yocpmd`
- **A quién sirve**: USMLE — el plan de 97 días apoya en ≤10 tarjetas de MECANISMO/día vía APEX; hoy el parser trunca REVERSO/CASO_CLINICO/FISIO_EXPANDIDA a la 1ª línea (verificado 4-sep, mtime 7-may)
- **Objetivo**: Que un APEX multilínea llegue ÍNTEGRO a Anki (tarjeta) y a Obsidian (nota con caso_clinico + fisio_expandida).
- **Entregable verificable**: Commit en D:/agente_estudio (parsers + creador de nota) + scripts/test_parser_multilinea.js verde (3/3) + 1 APEX de prueba íntegro en Anki y en el vault (is_test=true).
- **Dónde**: D:/agente_estudio/scripts (node_parsear_tarjeta_v2_3.js:27 · n8n_parser_v2_3.js:56 · node_crear_nota_v2_3.js)
- **Criterio de aceptación (definition of done)**:
  - [ ] node scripts/test_parser_multilinea.js → 3/3 OK (REVERSO, CASO_CLINICO, FISIO_EXPANDIDA con ≥3 líneas cada uno)
  - [ ] Tarjeta de prueba en Anki con el REVERSO completo (no solo la 1ª línea)
  - [ ] Nota en 01_USMLE con las secciones caso_clinico y fisio_expandida renderizadas
  - [ ] n8n_parser_v2_3.js re-pegado en el nodo Code de n8n (redeploy) y hash del commit anotado en synapse-journal
- **Docs (verificadas 5-sep-2026)**: [Claude Code — Best practices (verificar con un test que Claude pueda correr)](https://code.claude.com/docs/en/best-practices) · [Claude Code — Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)
- **Pasos diarios (45' cada uno)**:
  - **Lun 07-09 · 5' objetivo → spec del día**: Reproducir el bug: pegar un APEX con REVERSO de 3 líneas por node scripts/node_parsear_tarjeta_v2_3.js y ver el truncado. Escribir scripts/test_parser_multilinea.js con 3 fixtures que HOY fallan (rojo). Objetivo del día: test rojo reproducible.
  - **Mar 08-09 · construir con Claude Code**: P0-2: cambiar el lookahead en node_parsear_tarjeta_v2_3.js:27 y n8n_parser_v2_3.js:56 a (?=\n[A-Z_]+:|\n═|(?![\s\S])) (sin '$' bajo flag m). Correr el test → verde.
  - **Mié 09-09 · construir con Claude Code**: P0-3: node_crear_nota_v2_3.js renderiza caso_clinico y fisio_expandida en la nota Obsidian (sección condicional si viene vacía). Test de la nota con fixture.
  - **Jue 10-09 · verificar en vivo (test/URL/dato)**: Verificar en vivo: pegar n8n_parser_v2_3.js en el nodo Code de n8n (redeploy), enviar 1 APEX de prueba (Ctrl+Shift+A, is_test) → abrir Anki y el vault y comprobar que llega íntegro.
  - **Vie 11-09 · doc + commit + preparar SHIP**: Commit en agente_estudio + cerrar P0-2/P0-3 en DATA/ENCAPS/AUDITORIA_AGENTE_ESTUDIO_2026-07-02.md (fecha) + nota synapse-journal. Preparar el SHIP del sábado: lista de lo que falta (T1/T2/T3 Palmerton = P1-6, queda para otra semana).
- **SHIP**: SHIP S1: test verde + tarjeta y nota de prueba íntegras + commit. Si algo falla, el sábado PC se usa para cerrarlo; no se arrastra a S2.

## S2 · Telemetría AnkiConnect en producción (due / backlog / retención)

- **Semana**: lun 14-sep → vie 18-sep · **SHIP**: sábado sáb 19-sep (PC SYNAPSE 15:00-17:00) · rotación `yocpmd`
- **A quién sirve**: USMLE — la alarma G de Palmerton 'capar u omitir revisiones vencidas → avalancha' no tiene detector; el Anki de sáb/dom (30'/15') se dimensiona a ojo
- **Objetivo**: Un JSON diario automático con due, backlog (vencidas), revisadas hoy, % Again y retención FSRS del deck USMLE + KPI visible en el Home.
- **Entregable verificable**: DATA/USMLE/_anki_telemetria.json con ≥5 días consecutivos generados sin intervención + KPI 'Due/backlog/retención' en CockpitStatusBar + tarea programada.
- **Dónde**: D:/joseph-md-app/DATA/_scripts/anki_telemetria.js (v1 ya existe: hoy tolera Anki cerrado) · src/components/home/CockpitStatusBar.tsx
- **Criterio de aceptación (definition of done)**:
  - [ ] node DATA/_scripts/anki_telemetria.js con Anki abierto coincide (±5%) con la pantalla Stats de Anki
  - [ ] 5 entradas consecutivas en _anki_telemetria.json generadas por la tarea programada (schtasks) o por un hook SessionEnd
  - [ ] CockpitStatusBar muestra Due/backlog/retención del último JSON (localStorage 'jmd-anki-telemetria')
  - [ ] El script imprime los minutos recomendados del Anki de finde (due × 20 s) y avisa si backlog > 100
- **Docs (verificadas 5-sep-2026)**: [AnkiConnect — repositorio oficial (API JSON en localhost:8765)](https://git.sr.ht/~foosoft/anki-connect) · [AnkiConnect — add-on en AnkiWeb (2055492159)](https://ankiweb.net/shared/info/2055492159) · [Claude Code — Run prompts on a schedule](https://code.claude.com/docs/en/scheduled-tasks)
- **Pasos diarios (45' cada uno)**:
  - **Lun 14-09 · 5' objetivo → spec del día**: Correr node DATA/_scripts/anki_telemetria.js con Anki abierto. Comparar due/backlog/revisadas con la pantalla Stats de Anki y anotar discrepancias (deck pattern APEX::USMLE* vs AnKing).
  - **Mar 15-09 · construir con Claude Code**: Retención real: usar cardReviews de los últimos 30 días (reviewType=1) y calcular 1 − Again/total; validar que getDeckConfig devuelve 10 nuevas/día y desired retention 0.9 (si no, corregir en Anki, no en el script).
  - **Mié 16-09 · construir con Claude Code**: Automatizar: tarea programada de Windows (schtasks /create … 21:05 L-D) o hook SessionEnd de Claude Code que ejecute el script; comprobar que escribe sin ventana abierta.
  - **Jue 17-09 · verificar en vivo (test/URL/dato)**: KPI en Home: pegar el one-liner localStorage que imprime el script y verificar en vivo que CockpitStatusBar lo muestra; opcional: servir el JSON desde public/ para no pegar a mano.
  - **Vie 18-09 · doc + commit + preparar SHIP**: Regla 'Anki finde = due × 20 s' en DATA/SYNC_ANKI_OBSIDIAN_APP.md (ya escrita) + commit + nota synapse-journal.
- **SHIP**: SHIP S2: 5 días de JSON + KPI en el Home + tarea programada activa.

## S3 · Captura diaria de scores USMLE → Supabase (pre-test / 30Q / eval + tipo de error)

- **Semana**: lun 21-sep → vie 25-sep · **SHIP**: sábado sáb 26-sep (PC SYNAPSE 15:00-17:00) · rotación `preguntas`
- **A quién sirve**: USMLE — sin scores no se puede aplicar el gate 80% de Palmerton, ni detectar el ~50% de errores de interpretación, ni comparar contra los mínimos on-track por hito, ni alimentar la revisión semanal
- **Objetivo**: Registrar cada día 3 números (pre-test /10 · 30Q % · eval 18:00 %) + error dominante (knowledge / transfer / proceso) + CCSN, con fallback localStorage y espejo en Supabase.
- **Entregable verificable**: UsmleTodayPlan con 3 campos + selector de error → tabla usmle_daily_scores (o study_sim_scores con examen='USMLE') + ReadinessBar con media móvil 7d y distancia al mínimo on-track del próximo hito.
- **Dónde**: src/components/study/UsmleTodayPlan.tsx · src/components/study/ReadinessBar.tsx · src/lib/supabase.ts · src/lib/supabase-schema.sql
- **Criterio de aceptación (definition of done)**:
  - [ ] 5 días de scores reales persistidos (recargar la app y siguen) y visibles en Supabase
  - [ ] ReadinessBar muestra media 7d de eval y 'a X puntos del mínimo on-track del NBME 25 (≥51%)'
  - [ ] gen_revision_semanal.js importa los scores (la métrica 1 deja de decir 'sin dato')
  - [ ] Esquema documentado en src/lib/supabase-schema.sql (migración aplicada con Joseph, nunca automática)
- **Docs (verificadas 5-sep-2026)**: [Supabase — JavaScript select (Getting your data · Querying with count)](https://supabase.com/docs/reference/javascript/select) · [Supabase — Row Level Security (Secure a table with RLS · Write a policy for each operation)](https://supabase.com/docs/guides/database/postgres/row-level-security) · [Claude Code — How Claude remembers your project (CLAUDE.md)](https://code.claude.com/docs/en/memory)
- **Pasos diarios (45' cada uno)**:
  - **Lun 21-09 · 5' objetivo → spec del día**: Definir el esquema: tabla usmle_daily_scores(fecha date pk, pretest_10 int, q30_pct numeric, eval_pct numeric, error_dominante text, ccsn int, nota text) con RLS; escribir la migración en supabase-schema.sql (NO aplicar aún). Alternativa: study_sim_scores con examen='USMLE'.
  - **Mar 22-09 · construir con Claude Code**: UI: en UsmleTodayPlan añadir 3 inputs numéricos + selector knowledge/transfer/proceso + contador CCSN; guardar en localStorage 'jmd-usmle-scores' (try/catch) al instante.
  - **Mié 23-09 · construir con Claude Code**: Espejo: upsert en Supabase (anon + RLS por usuario) con reintento; lectura de los últimos 7 días para ReadinessBar (media móvil + distancia al mínimo on-track de la tabla Parte V).
  - **Jue 24-09 · verificar en vivo (test/URL/dato)**: Verificar en vivo (web): registrar los 3 valores de hoy, recargar, comprobar persistencia y la fila en Supabase (MCP execute_sql SELECT).
  - **Vie 25-09 · doc + commit + preparar SHIP**: Conectar gen_revision_semanal.js (fuente usmle_daily_scores) + commit + nota synapse-journal.
- **SHIP**: SHIP S3: 5 días de scores reales + ReadinessBar con media 7d + migración aplicada (con Joseph).

## S4 · gen_revision_semanal.js en producción (10 métricas con dato real)

- **Semana**: lun 28-sep → vie 02-oct · **SHIP**: sábado sáb 03-oct (PC SYNAPSE 15:00-17:00) · rotación `yocpmd`
- **A quién sirve**: TODOS los frentes — el checklist G de Palmerton se revisaba solo en cada NBME (~3 semanas); con 1 día perdido = +1 hábil hace falta un ritual semanal de 20'
- **Objetivo**: Que el sábado 07:15 la revisión ya esté pre-rellenada (Supabase + localStorage + AnkiConnect + JSON locales) y Joseph solo decida.
- **Entregable verificable**: DATA/USMLE/REVISIONES/S04_<fecha>.md con ≥8/10 métricas con dato real + _semanas.json con 4 entradas + export de localStorage automatizado.
- **Dónde**: DATA/_scripts/gen_revision_semanal.js (v1 ya existe) · DATA/REVISION_SEMANAL.md · DATA/USMLE/REVISIONES/
- **Criterio de aceptación (definition of done)**:
  - [ ] node DATA/_scripts/gen_revision_semanal.js genera S04 con ≥8 métricas reales (no 'sin dato')
  - [ ] _semanas.json tiene las entradas S1-S4 (append-only, sin duplicados)
  - [ ] El export de localStorage se hace con 1 clic/comando (skill o snippet), no copiando a mano
  - [ ] La tarjeta 'Semana N/20' del Home coincide con la semana de la revisión
- **Docs (verificadas 5-sep-2026)**: [Claude Code — Extend Claude with skills (Create your first skill)](https://code.claude.com/docs/en/skills) · [Claude Code — Run Claude Code programmatically (claude -p · --output-format json)](https://code.claude.com/docs/en/headless) · [Supabase — Data REST API](https://supabase.com/docs/guides/api)
- **Pasos diarios (45' cada uno)**:
  - **Lun 28-09 · 5' objetivo → spec del día**: Correr node DATA/_scripts/gen_revision_semanal.js y listar cada métrica que sale 'sin dato'; elegir las 3 más baratas de conectar.
  - **Mar 29-09 · construir con Claude Code**: Conectar fuentes: scores USMLE (S3), telemetría Anki (S2), % ciego ENCAPS del viernes desde TRACKING_ERRORES/_registro_resoluciones.json (rondas de la semana).
  - **Mié 30-09 · construir con Claude Code**: Export de localStorage sin fricción: skill /export-ls (imprime el snippet de consola) o botón en la app que descarga jmd-*.json a DATA/USMLE/REVISIONES/_localstorage_export.json.
  - **Jue 01-10 · verificar en vivo (test/URL/dato)**: Generar la revisión de esta semana en seco, leerla completa, corregir la plantilla (DATA/REVISION_SEMANAL.md) donde no ayude a decidir.
  - **Vie 02-10 · doc + commit + preparar SHIP**: Automatizar: viernes 21:00 el script pre-genera (schtasks o /schedule); sábado 07:15 Joseph rellena 20'. Commit + nota synapse-journal.
- **SHIP**: SHIP S4: primera revisión semanal completa (sábado 3-oct 07:15-07:35) con ≥8/10 métricas reales.

## S5 · remap_todo.js: corrimiento de 1 comando + verificación automática

- **Semana**: lun 05-oct → vie 09-oct · **SHIP**: sábado sáb 10-oct (PC SYNAPSE 15:00-17:00) · rotación `yocpmd`
- **A quién sirve**: TODOS los planes — ya van 5 corrimientos (31-ago→7-sep) y cada uno exige 5 scripts a mano + execute_sql + docs; un error de fecha rompe el Home de todos los frentes
- **Objetivo**: Un solo comando que encadene remap_inicio.js + gen_synapse_plan.js + gen_aurum_plan.js + gen_vibecoding_plan.js + gen_encaps_mantenimiento_2027.js y VERIFIQUE (nº de días, L-V, feriados, fechas monótonas, tsc) antes de dar el OK.
- **Entregable verificable**: DATA/_scripts/remap_todo.js <fecha> [--dry-run] + DATA/_scripts/verificar_planes.js + skill /remap.
- **Dónde**: DATA/_scripts/remap_inicio.js (leer, no romper sus regex) · gen_*_plan.js · .claude/skills/remap/SKILL.md
- **Criterio de aceptación (definition of done)**:
  - [ ] node DATA/_scripts/remap_todo.js 2026-10-12 --dry-run termina verde en < 2 min sin tocar el repo
  - [ ] verificar_planes.js detecta un sábado o un feriado inyectado a propósito en un .ts (test negativo)
  - [ ] La skill /remap <fecha> muestra el diff de fechas por plan y pide confirmación antes de escribir
  - [ ] El SQL de ENCAPS se genera pero NO se ejecuta (execute_sql sigue siendo manual con backup)
- **Docs (verificadas 5-sep-2026)**: [Claude Code — Extend Claude with skills (Pass arguments to skills · Pre-approve tools)](https://code.claude.com/docs/en/skills) · [Claude Code — Automate actions with hooks (PostToolUse · Stop)](https://code.claude.com/docs/en/hooks-guide) · [Claude Code — Hooks reference](https://code.claude.com/docs/en/hooks)
- **Pasos diarios (45' cada uno)**:
  - **Lun 05-10 · 5' objetivo → spec del día**: Escribir remap_todo.js: encadena los 5 generadores con child_process, acepta --dry-run (trabaja sobre una copia temporal de src/lib) y resume fechas inicio→fin por plan.
  - **Mar 06-10 · construir con Claude Code**: verificar_planes.js: lee cada src/lib/*DailyPlan.ts y usmleStep1Daily.ts (regex fecha:"20\d\d-\d\d-\d\d"), falla si hay sáb/dom, 25-dic/31-dic/1-ene, duplicados o fechas no crecientes; imprime nº de días vs esperado (USMLE 97 · MIR 78 · LIVIANO 90 · SYNAPSE 82 · VIBE 60).
  - **Mié 07-10 · construir con Claude Code**: Skill /remap <fecha> (.claude/skills/remap/SKILL.md, disable-model-invocation: true): ejecuta el dry-run, muestra el diff y pide confirmación; hook PostToolUse opcional que corre verificar_planes.js al editar src/lib/*Plan.ts.
  - **Jue 08-10 · verificar en vivo (test/URL/dato)**: Prueba negativa: inyectar un sábado en una copia y ver que verificar_planes.js falla; prueba positiva con la fecha real.
  - **Vie 09-10 · doc + commit + preparar SHIP**: Doc breve en DATA/_scripts (cabecera del script) + memoria de Claude (regla: usar remap_todo.js) + commit + nota synapse-journal.
- **SHIP**: SHIP S5: remap_todo.js --dry-run verde + verificar_planes.js con test negativo + skill /remap.

## S6 · RLS en datos_tesis y kappa_piloto (P0 de seguridad abierto desde el 2-jul)

- **Semana**: lun 12-oct → vie 16-oct · **SHIP**: sábado sáb 17-oct (PC SYNAPSE 15:00-17:00) · rotación `yocpmd`
- **A quién sirve**: Research — datos de menores (edad 14-18) en una tabla con RLS OFF y la anon key en un repo con remoto GitHub (verificado 5-sep: datos_tesis 55 filas RLS false, kappa_piloto RLS false)
- **Objetivo**: Que la anon key NO pueda leer datos_tesis ni kappa_piloto; el pipeline de la tesis usa service_role desde .env local.
- **Entregable verificable**: Migración SQL (enable RLS + policies) aplicada con Joseph + scripts/test_rls_anon.js verde + get_advisors sin 'RLS disabled' para esas tablas.
- **Dónde**: D:/agente_estudio (SECURITY_AUDIT.md · SECURITY_AUDIT_PHASE_A_C.sql) · Supabase qacynpqdrorpuegsmtcy
- **Criterio de aceptación (definition of done)**:
  - [ ] SELECT con anon key sobre datos_tesis devuelve 0 filas o 401 (test automático)
  - [ ] El pipeline Python de agente_estudio sigue escribiendo (service_role en .env, nunca en el repo)
  - [ ] get_advisors (security) no lista datos_tesis ni kappa_piloto
  - [ ] SECURITY_AUDIT.md de agente_estudio actualizado con fecha y hash
- **Docs (verificadas 5-sep-2026)**: [Supabase — Row Level Security (Enable RLS and set the grants · Policy tests · Bypassing RLS)](https://supabase.com/docs/guides/database/postgres/row-level-security) · [Supabase — Data REST API](https://supabase.com/docs/guides/api)
- **Pasos diarios (45' cada uno)**:
  - **Lun 12-10 · 5' objetivo → spec del día**: Inventario: quién lee/escribe datos_tesis y kappa_piloto (grep en agente_estudio + SECURITY_AUDIT_PHASE_A_C.sql ya existente); decidir política: solo service_role (pipeline) + rol médico.
  - **Mar 13-10 · construir con Claude Code**: Escribir la migración: alter table … enable row level security + policies; probar en una rama de Supabase (create_branch) o con --dry-run en local.
  - **Mié 14-10 · construir con Claude Code**: Mover el acceso del pipeline a SUPABASE_SERVICE_ROLE_KEY en .env (gitignored); comprobar que el pipeline sigue insertando.
  - **Jue 15-10 · verificar en vivo (test/URL/dato)**: scripts/test_rls_anon.js: con la anon key, SELECT → espera 0 filas/401; correr get_advisors y adjuntar salida.
  - **Vie 16-10 · doc + commit + preparar SHIP**: Aplicar con Joseph (apply_migration, backup previo) + SECURITY_AUDIT.md + commit + nota synapse-journal.
- **SHIP**: SHIP S6: RLS activo en producción + test anon verde + advisors limpio.

## S7 · Puente VITALS → rendimiento (sueño y agua cruzados con % eval)

- **Semana**: lun 19-oct → vie 23-oct · **SHIP**: sábado sáb 24-oct (PC SYNAPSE 15:00-17:00) · rotación `yocpmd`
- **A quién sirve**: USMLE + salud — VITALS ya registra mv_wellness_logs (tipo agua|sueno, 119 filas, misma Supabase) pero la doctrina 'si fallas <70% 3 días → bajar carga + dormir' no tiene datos con los que dispararse
- **Objetivo**: Tabla 'sueño vs % eval' y 'noches <7h' en la revisión semanal + 'Sueño anoche: X h' en el Home + sugerencia automática de modo ÁMBAR si sueño <6h.
- **Entregable verificable**: gen_revision_semanal.js con la tabla sueño×eval real (7 noches) + CockpitStatusBar con sueño de anoche + TodayMission sugiere ÁMBAR (Joseph decide).
- **Dónde**: VITALS/web (quick-log.tsx ya existe) · DATA/_scripts/gen_revision_semanal.js · src/components/home/CockpitStatusBar.tsx · src/components/home/TodayMission.tsx
- **Criterio de aceptación (definition of done)**:
  - [ ] La revisión semanal muestra 7 noches con horas reales y el cruce con eval % del mismo día
  - [ ] El Home muestra 'Sueño anoche: X h' (lectura RLS del usuario médico o JSON de la revisión)
  - [ ] Con sueño <6h el selector de modo de TodayMission propone ÁMBAR (no lo fuerza)
  - [ ] Quick-log de sueño/agua a las 07:00 registrado ≥5/7 días (hábito de 20 s en VITALS)
- **Docs (verificadas 5-sep-2026)**: [Supabase — Row Level Security (auth.uid() · Helper functions)](https://supabase.com/docs/guides/database/postgres/row-level-security) · [Supabase — Build a User Management App with Expo React Native (Get API details · Account page)](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
- **Pasos diarios (45' cada uno)**:
  - **Lun 19-10 · 5' objetivo → spec del día**: Consultar mv_wellness_logs (tipo sueno/agua) con la anon key: si RLS bloquea, definir la policy de lectura para el usuario médico (is_medico) o usar el JSON de la revisión como puente.
  - **Mar 20-10 · construir con Claude Code**: gen_revision_semanal.js: tabla sueño×eval por fecha (join con usmle_daily_scores de S3) + contador de noches <7h y <6h.
  - **Mié 21-10 · construir con Claude Code**: CockpitStatusBar: 'Sueño anoche: X h' (lectura del último log o del JSON) con try/catch y '—' si no hay dato.
  - **Jue 22-10 · verificar en vivo (test/URL/dato)**: TodayMission: si el sueño de anoche <6h → chip 'sugerido: ÁMBAR' junto al selector de modo (PROTOCOLO_MODO_MINIMO); Joseph decide.
  - **Vie 23-10 · doc + commit + preparar SHIP**: Doc: fuente de datos en PROTOCOLO_MODO_MINIMO.md (sección Fuentes) + commit + nota synapse-journal.
- **SHIP**: SHIP S7: revisión con 7 noches reales + sueño en el Home + sugerencia ÁMBAR funcionando.

## S8 · Motor de preguntas ENCAPS semiautomático v0 (skill /pregunta-encaps) — semana DELOAD · DELOAD

- **Semana**: lun 26-oct → vie 30-oct · **SHIP**: sábado sáb 31-oct (PC SYNAPSE 15:00-17:00) · rotación `preguntas`
- **A quién sirve**: ENCAPS — la hora de banqueo 16:15 depende de que el chat genere preguntas con el mapa (pronóstico v3 + TRACKING_ERRORES) y registre la ronda; hoy es manual y se pierde data
- **Objetivo**: Una skill que lea el mapa del examen y el perfil de errores, genere 5 viñetas ciegas (sin clave, fuente citada) y registre la ronda en _registro_resoluciones.json. Carga 50% (deload post-NBME 26).
- **Entregable verificable**: .claude/skills/pregunta-encaps/SKILL.md + 1 ronda real de 5Q registrada con confianza/error/ruta.
- **Dónde**: .claude/skills/pregunta-encaps/ · DATA/ENCAPS/TRACKING_ERRORES/ · DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md
- **Criterio de aceptación (definition of done)**:
  - [ ] La skill genera 5 viñetas del subtema del día (rotación v3) sin claves inventadas (cita fuente real: QX/MINSA/clave oficial PDF)
  - [ ] La ronda se APENDA a DATA/ENCAPS/TRACKING_ERRORES/_registro_resoluciones.json con el esquema del README (tu/correcta/ok/confianza/error/ruta)
  - [ ] PERFIL_CONOCIMIENTO.md se actualiza con el % ciego real de la ronda
  - [ ] Deload respetado: 2 días de 45' + 3 días de ≤15'
- **Docs (verificadas 5-sep-2026)**: [Anthropic Academy — Introduction to agent skills](https://anthropic.skilljar.com/introduction-to-agent-skills) · [Claude Code — Extend Claude with skills (Inject dynamic context · Run skills in a subagent)](https://code.claude.com/docs/en/skills)
- **Pasos diarios (45' cada uno; deload: mar/jue 15')**:
  - **Lun 26-10 · 5' objetivo → spec del día**: (45') Escribir SKILL.md: lee PRONOSTICO v3 + rotación del día + PERFIL_CONOCIMIENTO → genera 5 viñetas ciegas, formato pregunta→solución interactiva, sin clave hasta que Joseph responda.
  - **Mar 27-10 · construir con Claude Code (15')**: (15' deload) Revisar el formato de salida con 1 viñeta; nada más.
  - **Mié 28-10 · construir con Claude Code**: (45') Registro: la skill apenda la ronda a _registro_resoluciones.json (esquema README) y vuelca RONDAS/<codigo>_<fecha>.json.
  - **Jue 29-10 · verificar en vivo (test/URL/dato) (15')**: (15' deload) Descanso activo: leer 1 ronda anterior y anotar 1 mejora.
  - **Vie 30-10 · doc + commit + preparar SHIP (15')**: (15') 1 ronda real de 5Q en la hora ENCAPS (16:15) registrada + commit + nota synapse-journal.
- **SHIP**: SHIP S8 (deload): skill funcionando + 1 ronda registrada. Sin ampliar alcance.

## S9 · Migrador de overlays de hitos del Calendar (UWSA/NBME) tras cada corrimiento

- **Semana**: lun 02-nov → vie 06-nov · **SHIP**: sábado sáb 07-nov (PC SYNAPSE 15:00-17:00) · rotación `yocpmd`
- **A quién sirve**: USMLE — los 9 viernes de hito son overlays naranjas del Calendar; cada corrimiento los desalinea del .ts y hoy se recrean a mano (recurrenceData del MCP está roto para UPDATE → delete + create)
- **Objetivo**: Script que, dado el START, calcule las fechas de los hitos desde usmleStep1Daily.ts y emita el JSON de instrucciones delete_event/create_event (con la descripción del protocolo test-day) para ejecutarlo con confirmación.
- **Entregable verificable**: DATA/_scripts/gen_hitos_overlays.js <START> → DATA/USMLE/_hitos_overlays.json + diff contra el Calendar vivo (list_events) sin falsos positivos.
- **Dónde**: src/lib/usmleStep1Daily.ts (solo lectura) · DATA/USMLE/CALENDARIO_5_MESES.md · MCP Google Calendar
- **Criterio de aceptación (definition of done)**:
  - [ ] El JSON contiene los 9-12 hitos (UWSA1, NBME 25-31, UWSA2, NBME 32/33, Free 120) con fecha = la del .ts
  - [ ] La descripción de cada overlay incluye el protocolo test-day (cronograma de breaks, Ziploc Break 1/2/3, almuerzo dentro del sim, sin carbohidratos simples) tomado de PALMERTON_POR_MATERIA §F
  - [ ] Un diff en seco contra el Calendar (search_events 'NBME') lista solo los overlays que cambian
  - [ ] Nada se ejecuta sin confirmación explícita de Joseph
- **Docs (verificadas 5-sep-2026)**: [Claude Code — Connect Claude Code to tools via MCP (Installing MCP servers · Practical examples)](https://code.claude.com/docs/en/mcp) · [Claude Code — Connect to MCP servers (quickstart)](https://code.claude.com/docs/en/mcp-quickstart)
- **Pasos diarios (45' cada uno)**:
  - **Lun 02-11 · 5' objetivo → spec del día**: Listar los hitos y su D# desde usmleStep1Daily.ts (DIAS con palm/hito) y la regla 'hito = viernes de su semana'; escribir la tabla esperada para START=2026-09-07 y comparar con CALENDARIO_5_MESES.md.
  - **Mar 03-11 · construir con Claude Code**: gen_hitos_overlays.js: lee el .ts, calcula fechas, emite JSON {hito, fecha, hora, descripcion, accion:'delete+create'}; sin llamadas al Calendar.
  - **Mié 04-11 · construir con Claude Code**: Descripción del overlay = protocolo test-day generado desde PALMERTON_POR_MATERIA §F (texto fijo + hora de cada break).
  - **Jue 05-11 · verificar en vivo (test/URL/dato)**: Diff en seco: con el MCP (list_events/search_events 'NBME'|'UWSA') comparar fechas y listar solo cambios; corregir falsos positivos.
  - **Vie 06-11 · doc + commit + preparar SHIP**: Doc + commit + nota synapse-journal. Ejecutar delete/create solo tras confirmación de Joseph (y solo si hubo corrimiento).
- **SHIP**: SHIP S9: JSON de overlays + diff en seco limpio; ejecución real solo con OK de Joseph.

## S10 · Bot WhatsApp → OCR → ficha LIVIANO (n8n Webhook + visión)

- **Semana**: lun 09-nov → vie 13-nov · **SHIP**: sábado sáb 14-nov (PC SYNAPSE 15:00-17:00) · rotación `bots`
- **A quién sirve**: LIVIANO / Pulso — el paciente manda foto (análisis, balanza, receta) por WhatsApp y hoy se transcribe a mano al CRM
- **Objetivo**: Webhook de n8n que recibe la imagen de WhatsApp, la pasa por OCR/visión (Claude o Gemini), valida un JSON de ficha y lo guarda en Supabase con respuesta automática al paciente.
- **Entregable verificable**: Workflow n8n exportado (JSON) + tabla de fichas en Supabase + 3 pruebas reales en < 60 s con ≥5 campos correctos.
- **Dónde**: n8n (instancia propia) · Supabase (tabla nueva liviano_fichas con RLS) · CRM Pulso (solo lectura, copiar nunca borrar)
- **Criterio de aceptación (definition of done)**:
  - [ ] Enviar una foto por WhatsApp → fila en Supabase en < 60 s (3/3 pruebas)
  - [ ] ≥5 campos correctos por ficha (nombre, fecha, peso/talla o valores de laboratorio, medicación, observación)
  - [ ] Verificación de firma del webhook activa; credenciales solo en n8n (nunca en el repo)
  - [ ] Respuesta automática al paciente con resumen y aviso de revisión médica
- **Docs (verificadas 5-sep-2026)**: [n8n — Build your first workflow (trigger · If · test)](https://docs.n8n.io/build-your-first-workflow/) · [n8n — Webhook node (Webhook URLs · HTTP Method · Respond)](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) · [n8n — AI Agent node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/) · [Supabase — Edge Functions quickstart (alternativa serverless)](https://supabase.com/docs/guides/functions/quickstart)
- **Pasos diarios (45' cada uno)**:
  - **Lun 09-11 · 5' objetivo → spec del día**: Diseño: WhatsApp Cloud API → Webhook n8n → descarga de media → visión (prompt de extracción a JSON) → validación → Supabase → respuesta. Credenciales de WhatsApp: A VERIFICAR con Joseph (cuenta Meta Business).
  - **Mar 10-11 · construir con Claude Code**: n8n: Webhook node (POST, path propio) + verificación de firma + descarga de la imagen; probar con curl y una imagen local.
  - **Mié 11-11 · construir con Claude Code**: OCR/visión: prompt de extracción con esquema JSON fijo (campos de la ficha) + 2 ejemplos; validar con un nodo Code (campos obligatorios, unidades).
  - **Jue 12-11 · verificar en vivo (test/URL/dato)**: Guardar en Supabase (tabla liviano_fichas, RLS) + respuesta automática; 3 pruebas con imágenes reales y medir latencia.
  - **Vie 13-11 · doc + commit + preparar SHIP**: Exportar el workflow (JSON) a DATA/BUSINESS/ + doc + commit + nota synapse-journal.
- **SHIP**: SHIP S10: 3/3 pruebas reales en < 60 s con ≥5 campos correctos.

## S11 · Pipeline de contenido de marcas (brief → 3 guiones + títulos + thumbnail) con la API de Claude

- **Semana**: lun 16-nov → vie 20-nov · **SHIP**: sábado sáb 21-nov (PC SYNAPSE 15:00-17:00) · rotación `contenido`
- **A quién sirve**: Marcas (LIVIANO primero; CURVA/DENSA arrancan en febrero) — hoy el contenido se improvisa; la academia LIVIANO produce conocimiento que no se convierte en piezas
- **Objetivo**: Un script que, dado marca + tema, produzca 3 guiones de 45 s (hook-cuerpo-CTA), 5 títulos, marcadores de corte y un prompt de thumbnail; 1 pieza publicada.
- **Entregable verificable**: DATA/_scripts/gen_contenido.js <marca> <tema> → DATA/BUSINESS/CONTENIDO/<marca>/<fecha>/ + 1 pieza publicada con métrica de alcance anotada.
- **Dónde**: DATA/_scripts/gen_contenido.js (nuevo) · DATA/BUSINESS/CONTENIDO/ (nuevo) · academia LIVIANO (src/lib/livianoStudyPlan.ts como banco de temas)
- **Criterio de aceptación (definition of done)**:
  - [ ] gen_contenido.js genera 3 guiones + 5 títulos + prompt de thumbnail en < 1 min
  - [ ] 1 pieza publicada (LIVIANO) con el guion generado y revisado por Joseph
  - [ ] Alcance a 48 h anotado en el .md de la pieza
  - [ ] Sin claims médicos no verificados: cada afirmación clínica cita fuente (academia LIVIANO)
- **Docs (verificadas 5-sep-2026)**: [Anthropic Academy — Building with the Claude API (Prompt engineering techniques · Structured data · Prompt evaluation)](https://anthropic.skilljar.com/claude-with-the-anthropic-api) · [Claude Code — Run Claude Code programmatically (claude -p con --json-schema)](https://code.claude.com/docs/en/headless)
- **Pasos diarios (45' cada uno)**:
  - **Lun 16-11 · 5' objetivo → spec del día**: Brief por marca (LIVIANO): 3 pilares + tono + 3 temas de la academia; escribir gen_contenido.js que arma el prompt y llama a la API (o claude -p --json-schema) con salida JSON.
  - **Mar 17-11 · construir con Claude Code**: Guiones: 3 guiones de 45 s (hook-cuerpo-CTA) + 5 títulos; guardar en DATA/BUSINESS/CONTENIDO/liviano/<fecha>/guiones.md.
  - **Mié 18-11 · construir con Claude Code**: Thumbnail: prompt de imagen + 1 imagen generada con la herramienta disponible; marcadores de corte para clips.
  - **Jue 19-11 · verificar en vivo (test/URL/dato)**: Revisión humana (claims clínicos con fuente) + publicar 1 pieza.
  - **Vie 20-11 · doc + commit + preparar SHIP**: Anotar alcance a 48 h + commit + nota synapse-journal.
- **SHIP**: SHIP S11: 1 pieza publicada con guion generado + carpeta de la pieza completa.

## S12 · Capstone: README del sistema YoCPMD + demo 5' + retro de 12 semanas

- **Semana**: lun 23-nov → vie 27-nov · **SHIP**: sábado sáb 28-nov (PC SYNAPSE 15:00-17:00) · rotación `yocpmd`
- **A quién sirve**: Joseph futuro y cualquier agente nuevo — hoy el conocimiento del sistema vive en la memoria de Claude y en 40 scripts sin mapa
- **Objetivo**: Un README que permita a un agente/persona nueva operar el sistema (scripts, hooks, skills, pipeline de corrimiento, revisión semanal) + demo grabada + retro honesta de los 12 entregables.
- **Entregable verificable**: README_SISTEMA.md en DATA/ + demo de 5' + retro con estado de los 12 proyectos + decisión CCA-F.
- **Dónde**: DATA/README_SISTEMA.md (nuevo) · DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md (retro) · synapse-journal
- **Criterio de aceptación (definition of done)**:
  - [ ] README con mapa de DATA/_scripts (qué genera cada uno y en qué orden), hooks, skills y los 3 rituales (diario, viernes, sábado)
  - [ ] Demo de 5' grabada recorriendo Home → Estudio → revisión semanal
  - [ ] Retro: 12 proyectos con estado (shipped / parcial / no) y 1 lección por proyecto
  - [ ] Decisión escrita: examen CCA-F (fecha) o no, y plan de la fase siguiente (F2 del motor SYNAPSE)
- **Docs (verificadas 5-sep-2026)**: [Anthropic Academy — Claude Code in Action (Verify and Share · Plugins)](https://anthropic.skilljar.com/claude-code-in-action) · [Claude Code — Create plugins (empaquetar skills/hooks propios)](https://code.claude.com/docs/en/plugins) · [Anthropic Academy — catálogo (22 cursos, prep CCA-F)](https://anthropic.skilljar.com/)
- **Pasos diarios (45' cada uno)**:
  - **Lun 23-11 · 5' objetivo → spec del día**: README_SISTEMA.md: inventario de DATA/_scripts (generadores, remap, telemetría, revisión), hooks y skills; orden del pipeline de corrimiento.
  - **Mar 24-11 · construir con Claude Code**: Demo 5': grabar (OBS/Loom) Home → Estudio → revisión semanal; subir y enlazar.
  - **Mié 25-11 · construir con Claude Code**: Retro: tabla de los 12 proyectos con estado + 1 lección cada uno; qué se automatiza en F2.
  - **Jue 26-11 · verificar en vivo (test/URL/dato)**: Decisión CCA-F: revisar dominios (Agentic Architecture 27% · Claude Code 20% · Tool Design & MCP 18% · Prompt Engineering 20% · Context Management 15%) contra lo hecho; fijar fecha o no.
  - **Vie 27-11 · doc + commit + preparar SHIP**: Commit final + tag vibecoding-s12 + nota synapse-journal (cierre).
- **SHIP**: SHIP S12: README + demo + retro + decisión CCA-F publicados.

## Retro (rellenar en S12)

| S | Shipped | Evidencia (commit/URL/test) | Lección |
|---|---|---|---|
| S1 | ☐ | | |
| S2 | ☐ | | |
| S3 | ☐ | | |
| S4 | ☐ | | |
| S5 | ☐ | | |
| S6 | ☐ | | |
| S7 | ☐ | | |
| S8 | ☐ | | |
| S9 | ☐ | | |
| S10 | ☐ | | |
| S11 | ☐ | | |
| S12 | ☐ | | |
