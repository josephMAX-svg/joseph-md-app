# 🧠 VIBECODING — 12 proyectos semanales (S1-S12 · jue 17-sep → mié 09-dic 2026) + taper S13-S20 (jue 10-dic → lun 01-feb 2027)

> GENERADO por `DATA/_scripts/gen_vibecoding_plan.js 2026-09-17` desde `DATA/SYNAPSE/vibecoding_proyectos.json` (editar el JSON, no este .md). Franja **04:15–05:00 L-V (45')** · sábado **PC SYNAPSE 15:00-17:00 = SHIP** del proyecto · domingo = Feynman del proyecto (10', opcional). Progreso real en la app: pestaña ⚡ run de SYNAPSE (PlanKey `vibecoding`, ✓ por día) y bloque 04:15 de MISIÓN DE HOY. **v5.10-b (12-sep-2026)**: catálogo RE-SECUENCIADO por riesgo para el Step 1 con lo ya construido por agentes (parser APEX v2.5.1 + test, usmleScores.ts, anki_telemetria.js v1, gen_revision_semanal.js v1, plan_checks.sql, verify_vibecoding.js, journal_hoy.js): cada proyecto COMPLETA o pone en producción algo real. 95 días = los mismos 95 del Step 1 (d == D#).

## Reglas (Palmerton aplicado a construir)

- Se mide por OUTPUT verificable (commit/URL viva/test verde/fichero de salida), nunca por tiempo sentado (Palmerton: medir por resultado, no por material consumido). Ciclo diario 5' objetivo → 35' construir con Claude Code → 5' commit + entrada en el journal (D:/synapse-journal, node DATA/_scripts/journal_hoy.js). 'Shipped' NO es auto-reporte: lo decide node DATA/_scripts/verify_vibecoding.js <n> (criterios mecánicos del proyecto → DATA/SYNAPSE/_vibecoding_ship.json); el ✓ manual de la app solo cuenta días.
- **FRENO 04:55**: 04:55 commit-or-stash OBLIGATORIO (git commit si compila; git stash si no); 05:00 Anki sin excepción (recomendación #1 de Palmerton: Anki a primera hora con la mente fresca). Si el día se recorta, pierde el proyecto, NUNCA el Anki. KPI: hora de la 1ª review de Anki del día (anki_telemetria.js → primeraReview; > 05:10 = ámbar; sin review L-V = rojo). La app muestra la cuenta atrás hasta las 04:55 en la tarjeta 04:15 de MISIÓN DE HOY.
- **Commits**: Todo commit del proyecto n lleva el prefijo '[S<n>] …' en el repo declarado en `repo_git` (p. ej. '[S3] plan_checks: upsert desde saveDone'). verify_vibecoding.js lo comprueba con git log --all --grep '\[S<n>\]'.
- **Verificación mecánica**: Cada criterio de `aceptacion[i]` tiene su comprobación mecánica en `verificacion[i]`: tipo git (commit [S<n>] en repo_git) · test (comando + texto esperado) · url (200) · supabase (tabla legible vía REST con la anon key, filas mínimas) · fichero (existe / contiene / entradas mínimas) · manual (no verificable por script: cuenta en el total y solo se acepta con --ok-manual i). Sábado PC = correr verify ANTES de marcar el proyecto como shipped.
- **Definition of done** = los 4 criterios de aceptación del proyecto verificados por `verify_vibecoding.js` (commit hash / test verde / URL o tabla viva / fichero de salida). Sin eso, el sábado PC se usa para cerrar; nada se arrastra a la semana siguiente.
- **Rotación** (repite subiendo nivel): `yocpmd` = Automatización YoCPMD (sensores, sync, generadores, skills, hooks) · `preguntas` = Pipeline de preguntas ENCAPS/USMLE/MIR · `bots` = Bots CRM Pulso / LIVIANO · `contenido` = Contenido IA para las marcas
- **Deload**: Semanas DELOAD de los frentes secundarios (PROTOCOLO_MODO_MINIMO §4, fechas intactas, carga 50%): post-NBME 26 = lun 26 → vie 30-oct-2026 y post-NBME 28 = lun 7 → vie 11-dic-2026. Con el orden v5.10-b el proyecto con `deload: true` es S7 (motor de preguntas ENCAPS), que en la v5.13 corre jue 29-oct → mié 4-nov (con D1 en jueves los bloques de 5 hábiles van tres días por detrás de la semana de calendario: lun 26, mar 27 y mié 28-oct son los días 3-5 de S6): 2 días de 45' + 3 días de ≤15'. La semana post-NBME 28 (7-11 dic) = días 3-5 de S12 (lun 7 → mié 9) + S13 taper desde el jue 10-dic (≤15'/día).
- **Taper S13-S20**: S13-S16 (10-dic → 6-ene, bloques secuenciales): MANTENIMIENTO ≤15'/día con flag deload (sensores verdes: node DATA/_scripts/verify_vibecoding.js --sensores · 1 mejora pequeña · retro) y el resto del bloque 04:15 = journal + lectura de docs (sin teclado pesado). S17-S20 (7-ene → 1-feb, Fases B-C del Step 1): DELOAD TOTAL del vibecoding = journal 5' + audio (bloque B del SYNAPSE); PC sáb/dom OPCIONAL (30' máx, solo en día VERDE). S20 = cierre del plan: jue 28-ene → lun 1-feb (D93-D95; vie 29 = D94 última sesión de banco, finde libre, lun 1-feb = D95 = D-1), mar 2-feb EXAMEN (v5.13). Ningún proyecto nuevo después de S12; la decisión de febrero (IA vs ENCAPS intensivo) sigue intacta.
- **Cero inventos**: Todas las URLs de 'docs' respondieron 200 el 5-sep-2026 (check_links.js) y su contenido se extrajo con WebFetch a curricula/_extracted.json; las que se reutilizan aquí son exactamente esas (cero inventos, ninguna URL nueva el 12-sep). Lo que exija credenciales o decisión de Joseph está marcado "A VERIFICAR".
- Cada día cierra con la entrada del journal (`node DATA/_scripts/journal_hoy.js` → `D:/synapse-journal/journal/<semana ISO>.md`: objetivo · qué construí · commit/URL · qué aprendí · % del código que entiendo · bloqueo). El sábado de SHIP se corre `verify` ANTES de marcar el proyecto como shipped.

## Calendario

| S | Proyecto | Rotación | L-V | SHIP (sáb PC) | Deload |
|---|---|---|---|---|---|
| S1 | APEX end-to-end: redeploy n8n + 1 APEX USMLE íntegro en Anki y vault + ruteo por subtema | yocpmd | jue 17-sep → mié 23-sep | sáb 26-sep | — |
| S2 | Anki: sync + KPI '1ª review del día' — telemetría v2 en producción | yocpmd | jue 24-sep → mié 30-sep | sáb 03-oct | — |
| S3 | Espejo Supabase del progreso (plan_checks) + exportar/importar | yocpmd | jue 01-oct → mié 07-oct | sáb 10-oct | — |
| S4 | verify_vibecoding + revisión semanal cerrada (10 métricas con dato real) | yocpmd | jue 08-oct → mié 14-oct | sáb 17-oct | — |
| S5 | Puente VITALS → revisión (sueño y agua cruzados con % eval) | yocpmd | jue 15-oct → mié 21-oct | sáb 24-oct | — |
| S6 | RLS en datos_tesis y kappa_piloto + auditoría de tablas sin RLS | yocpmd | jue 22-oct → mié 28-oct | sáb 31-oct | — |
| S7 | Motor de preguntas ENCAPS semiautomático (stock del banco propio) — semana DELOAD | preguntas | jue 29-oct → mié 04-nov | sáb 07-nov | **sí (50%)** |
| S8 | Pool MIR: clasificación verificada de los cuadernillos 2022-2026 + UI de 10Q | preguntas | jue 05-nov → mié 11-nov | sáb 14-nov | — |
| S9 | Migrador de overlays de hitos del Calendar (USMLE + Research) tras cada corrimiento | yocpmd | jue 12-nov → mié 18-nov | sáb 21-nov | — |
| S10 | Bot WhatsApp → OCR → ficha LIVIANO (n8n Webhook + visión) | bots | jue 19-nov → mié 25-nov | sáb 28-nov | — |
| S11 | Pipeline de contenido de marcas (brief → 3 guiones + títulos + thumbnail) con la API de Claude | contenido | jue 26-nov → mié 02-dic | sáb 05-dic | — |
| S12 | Capstone: README del sistema YoCPMD + demo 5' + retro de 12 semanas | yocpmd | jue 03-dic → mié 09-dic | sáb 12-dic | — |
| S13 | Mantenimiento 1: sensores verdes tras el NBME 28 | taper · mantenimiento | jue 10-dic → mié 16-dic (15'/día) | sáb 19-dic (opcional 30') | **sí (mantenimiento)** |
| S14 | Mantenimiento 2: revisión semanal automática y export | taper · mantenimiento | jue 17-dic → mié 23-dic (15'/día) | sáb 26-dic (opcional 30') | **sí (mantenimiento)** |
| S15 | Mantenimiento 3: semana corta de Navidad | taper · mantenimiento | jue 24-dic → mié 30-dic (15'/día) | sáb 02-ene (opcional 30') | **sí (mantenimiento)** |
| S16 | Mantenimiento 4: cierre de año, sensores verdes antes de la Fase B | taper · mantenimiento | lun 04-ene → mié 06-ene (15'/día) | sáb 09-ene (opcional 30') | **sí (mantenimiento)** |
| S17 | Deload total 1: journal 5' + audio (Fase B) | taper · deload | jue 07-ene → mié 13-ene (5'/día) | opcional / no | **sí (deload)** |
| S18 | Deload total 2: journal 5' + audio (semana GO/NO-GO) | taper · deload | jue 14-ene → mié 20-ene (5'/día) | opcional / no | **sí (deload)** |
| S19 | Deload total 3: journal 5' + audio (Fase C, última semana con SYNAPSE) | taper · deload | jue 21-ene → mié 27-ene (5'/día) | opcional / no | **sí (deload)** |
| S20 | Cierre del plan: journal 5' (jue 28, vie 29 y lun 1-feb), mar 2-feb EXAMEN | taper · deload | jue 28-ene → lun 01-feb (5'/día) | opcional / no | **sí (deload)** |

## S1 · APEX end-to-end: redeploy n8n + 1 APEX USMLE íntegro en Anki y vault + ruteo por subtema

- **Semana**: jue 17-sep → mié 23-sep · **SHIP**: sábado sáb 26-sep (PC SYNAPSE 15:00-17:00) · rotación `yocpmd` · commits `[S1] …` en `D:/joseph-md-app`
- **A quién sirve**: USMLE — el plan de 95 días apoya en ≤10 tarjetas de MECANISMO/día vía APEX. El parser v2.5.1 (P0-2/P0-3) YA está corregido y scripts/test_parser_multilinea.js YA está verde (13/13 el 12-sep), pero n8n sigue ejecutando el parser viejo: hasta el redeploy ninguna tarjeta multilínea llega íntegra, y nadie ha comprobado en vivo que el ruteo por subtema (subdeck APEX::USMLE::<sistema> + nota madre de 01_USMLE) funciona con un APEX real. D:/agente_estudio NO es repo git (verificado 12-sep): la evidencia y el commit [S1] van a joseph-md-app.
- **Objetivo**: Que un APEX multilínea de USMLE enviado desde el atajo llegue ÍNTEGRO a Anki (subdeck correcto) y a Obsidian (nota con caso_clinico + fisio_expandida), con evidencia guardada.
- **Entregable verificable**: Redeploy de n8n_parser_v2_3.js en n8n + DATA/USMLE/_apex_e2e_prueba.json (noteId, subdeck, ruta de la nota, hash del parser) + commit [S1] en joseph-md-app.
- **Dónde**: D:/agente_estudio/scripts (n8n_parser_v2_3.js · node_parsear_tarjeta_v2_3.js · node_crear_nota_v2_3.js · _mapping_slim.json · ensure_anki_subdecks.py · n8n_flow_4_destinos.json) · n8n (instancia propia) · DATA/USMLE/_apex_e2e_prueba.json
- **Criterio de aceptación (definition of done)** — `node DATA/_scripts/verify_vibecoding.js 1`:
  - [ ] node scripts/test_parser_multilinea.js en D:/agente_estudio → "0 failed" (13/13 passed: REVERSO, CASO_CLINICO, FISIO_EXPANDIDA íntegros; test ya existente, debe seguir verde) _(verify: test)_
  - [ ] Commit [S1] en joseph-md-app con la evidencia + doc del redeploy (fecha + hash del parser pegado en el nodo Code) _(verify: git)_
  - [ ] DATA/USMLE/_apex_e2e_prueba.json con la evidencia del APEX de prueba (is_test=true): noteId de Anki, subdeck APEX::USMLE::<sistema>, ruta de la nota en 01_USMLE, hash del parser _(verify: fichero)_
  - [ ] Comprobado en vivo que el nodo Code de n8n corre el fichero actual (hash igual) y que la tarjeta muestra el REVERSO completo en Anki — captura pegada en el journal _(verify: manual — abrir Anki y n8n; comparar hash del parser; pegar captura en el journal de la semana)_
- **Docs (verificadas 5-sep-2026)**: [Claude Code — Best practices (verificar con un test que Claude pueda correr)](https://code.claude.com/docs/en/best-practices) · [Claude Code — Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)
- **Pasos diarios (45' cada uno)**:
  - **Jue 17-09 · verificar en vivo (test/URL/dato)**: Inventario de lo hecho: correr node scripts/test_parser_multilinea.js (verde desde el 5-sep) y leer n8n_nodos_nuevos.md + n8n_flow_4_destinos.json para ubicar el nodo Code del parser. Objetivo del día: saber EXACTAMENTE qué fichero pegar y dónde; nada de reescribir el parser.
  - **Vie 18-09 · doc + commit + preparar SHIP**: Redeploy: pegar n8n_parser_v2_3.js íntegro en el nodo Code de n8n (copiar el fichero, no editar en la UI), guardar, activar; disparar 1 APEX de prueba de USMLE (Ctrl+Shift+A, is_test=true) y ver la ejecución verde en Executions.
  - **Lun 21-09 · 5' objetivo → spec del día**: Ruteo por subtema: comprobar que la tarjeta cayó en APEX::USMLE::<sistema> (ensure_anki_subdecks.py / _mapping_slim.json) y la nota en la carpeta correcta de 01_USMLE; si cae en el deck raíz o en 99_INBOX, corregir el mapping y repetir el envío.
  - **Mar 22-09 · construir con Claude Code**: Verificar en vivo: abrir Anki (REVERSO, CASO_CLINICO y FISIO_EXPANDIDA completos) y el vault (secciones renderizadas); escribir DATA/USMLE/_apex_e2e_prueba.json con noteId, subdeck, ruta de la nota y hash del parser (certutil -hashfile).
  - **Mié 23-09 · construir con Claude Code**: Commit [S1] en joseph-md-app (evidencia + doc del redeploy con fecha y hash; opcional: git init LOCAL en D:/agente_estudio con .gitignore — decisión de Joseph) + node DATA/_scripts/verify_vibecoding.js 1 + entrada del journal (node DATA/_scripts/journal_hoy.js). Lo que quede (T1/T2/T3 Palmerton = P1-6) NO entra: es otra semana.
- **SHIP**: SHIP S1: verify 1 → 4/4 (test verde · commit [S1] · fichero de evidencia · redeploy confirmado). Si falla algo, el sábado PC se usa para cerrarlo; no se arrastra a S2.

## S2 · Anki: sync + KPI '1ª review del día' — telemetría v2 en producción

- **Semana**: jue 24-sep → mié 30-sep · **SHIP**: sábado sáb 03-oct (PC SYNAPSE 15:00-17:00) · rotación `yocpmd` · commits `[S2] …` en `D:/joseph-md-app`
- **A quién sirve**: USMLE — anki_telemetria.js v1 YA existe (due/backlog/retención/minFinde, tolerante a Anki cerrado) y desde el 12-sep hace `sync` antes de leer (la app abre AnkiWeb) y calcula primeraReview (freno 04:55: 1ª review > 05:10 = ámbar; sin review L-V = rojo). Falta ponerlo en PRODUCCIÓN: 5 días seguidos sin intervención, validado contra Stats de Anki y con el KPI de hora visible en el Home.
- **Objetivo**: Un JSON diario automático (due, backlog, revisadas, % Again, retención FSRS, hora de la 1ª review) + KPI en CockpitStatusBar con el semáforo de la 1ª review.
- **Entregable verificable**: DATA/USMLE/_anki_telemetria.json con ≥5 entradas consecutivas (estado ok, campo primeraReview) + tarea programada activa + CockpitStatusBar mostrando 1ª review con color + commit [S2].
- **Dónde**: DATA/_scripts/anki_telemetria.js (v2 desde 12-sep: --sync/--no-sync · primeraReview) · src/components/home/CockpitStatusBar.tsx · src/lib/homeBriefing.ts (AnkiKpi) · DATA/USMLE/_anki_telemetria.json
- **Criterio de aceptación (definition of done)** — `node DATA/_scripts/verify_vibecoding.js 2`:
  - [ ] DATA/USMLE/_anki_telemetria.json tiene ≥5 entradas con estado ok y el campo primeraReview (generadas por la tarea programada, no a mano) _(verify: fichero)_
  - [ ] La tarea programada existe y responde: schtasks /query /tn "JMD Anki telemetria" (21:05 L-D, con Anki abierto; alternativa documentada: hook SessionEnd) _(verify: test)_
  - [ ] CockpitStatusBar muestra due/backlog/retención Y la hora de la 1ª review con su color (verde ≤05:10 · ámbar >05:10 · rojo sin review) leyendo localStorage 'jmd-anki-telemetria' _(verify: manual — abrir la app con el one-liner pegado y ver el instrumento ANKI con la hora de la 1ª review)_
  - [ ] Commit [S2] en joseph-md-app _(verify: git)_
- **Docs (verificadas 5-sep-2026)**: [AnkiConnect — repositorio oficial (API JSON en localhost:8765)](https://git.sr.ht/~foosoft/anki-connect) · [AnkiConnect — add-on en AnkiWeb (2055492159)](https://ankiweb.net/shared/info/2055492159) · [Claude Code — Run prompts on a schedule](https://code.claude.com/docs/en/scheduled-tasks)
- **Pasos diarios (45' cada uno)**:
  - **Jue 24-09 · verificar en vivo (test/URL/dato)**: Correr node DATA/_scripts/anki_telemetria.js con Anki abierto (hace sync antes de leer) y comparar due/backlog/revisadas/primeraReview con la pantalla Stats de Anki; anotar discrepancias (patrón APEX::USMLE* vs AnKing). Objetivo del día: números que cuadran ±5%.
  - **Vie 25-09 · doc + commit + preparar SHIP**: Retención y config: validar retencion30 (review-level, getReviewsOfCards) y que getDeckConfig devuelve 10 nuevas/día y desired retention 0.90 (si no, corregir en Anki, no en el script).
  - **Lun 28-09 · 5' objetivo → spec del día**: Automatizar: schtasks /create /tn "JMD Anki telemetria" /tr "node D:\joseph-md-app\DATA\_scripts\anki_telemetria.js --registrar-cerrado" /sc daily /st 21:05 (o hook SessionEnd de Claude Code); comprobar que escribe sin ventana abierta y que deja huella si Anki está cerrado.
  - **Mar 29-09 · construir con Claude Code**: KPI en Home: CockpitStatusBar lee primeraReview / primeraReviewEstado de jmd-anki-telemetria y colorea el instrumento ANKI (verde/ámbar/rojo); verificar en vivo con el one-liner que imprime el script.
  - **Mié 30-09 · construir con Claude Code**: Commit [S2] + node DATA/_scripts/verify_vibecoding.js 2 + journal. Regla 'Anki finde = due × 20 s' ya está en DATA/SYNC_ANKI_OBSIDIAN_APP.md: enlazarla desde el KPI.
- **SHIP**: SHIP S2: 5 días de JSON automáticos + KPI de 1ª review en el Home + tarea programada activa (verify 2 → 4/4).

## S3 · Espejo Supabase del progreso (plan_checks) + exportar/importar

- **Semana**: jue 01-oct → mié 07-oct · **SHIP**: sábado sáb 10-oct (PC SYNAPSE 15:00-17:00) · rotación `yocpmd` · commits `[S3] …` en `D:/joseph-md-app`
- **A quién sirve**: TODOS los frentes — los ✓ de los 10 PlanKeys vivían SOLO en localStorage jmd-study-progress-v1. El 12-sep ya existen la migración DATA/_scripts/_migrations/plan_checks.sql (RLS + policy calcada de study_sim_scores) y src/lib/studyProgressSync.ts (diff push/pull a plan_checks, migración única, export/import por portapapeles). Falta ponerlo en PRODUCCIÓN: aplicar la migración con Joseph, comprobar el sync en 2 navegadores, exponer el export/import en la UI y que gen_revision_semanal.js lea plan_checks.
- **Objetivo**: Que cada ✓ se refleje de verdad en la tabla plan_checks (plan_key, dia, checked_at, device) con localStorage como caché offline, probado entre dispositivos, y que el progreso pueda exportarse/importarse en 1 clic desde la app.
- **Entregable verificable**: Migración aplicada + studyProgressSync.ts verificado en vivo (2 navegadores) + botón Exportar/Importar visible en Home + gen_revision_semanal.js leyendo plan_checks + commit [S3].
- **Dónde**: DATA/_scripts/_migrations/plan_checks.sql (ya escrita) · src/lib/studyProgressSync.ts (ya existe, 12-sep) · src/lib/studyProgress.ts · src/components/home/CockpitStatusBar.tsx (botón export/import) · DATA/_scripts/gen_revision_semanal.js
- **Criterio de aceptación (definition of done)** — `node DATA/_scripts/verify_vibecoding.js 3`:
  - [ ] La tabla plan_checks responde por REST con la anon key (RLS activo + policy) y tiene ≥5 filas reales _(verify: supabase)_
  - [ ] Marcar un ✓ en la app crea la fila (plan_key, dia) y desmarcarlo la borra, comprobado desde un segundo navegador (misma cuenta de progreso) _(verify: manual — marcar/desmarcar un día en la app y consultar select * from plan_checks (execute_sql) desde otro navegador)_
  - [ ] Botón Exportar/Importar progreso: el JSON de jmd-* copiado al portapapeles y pegado en otro navegador reproduce los mismos % _(verify: manual — exportar en el navegador A, importar en el B y comparar el % de un plan)_
  - [ ] Commit [S3] en joseph-md-app _(verify: git)_
- **Docs (verificadas 5-sep-2026)**: [Supabase — JavaScript select (Getting your data · Querying with count)](https://supabase.com/docs/reference/javascript/select) · [Supabase — Row Level Security (Secure a table with RLS · Write a policy for each operation)](https://supabase.com/docs/guides/database/postgres/row-level-security) · [Claude Code — How Claude remembers your project (CLAUDE.md)](https://code.claude.com/docs/en/memory)
- **Pasos diarios (45' cada uno)**:
  - **Jue 01-10 · verificar en vivo (test/URL/dato)**: Leer plan_checks.sql y studyProgressSync.ts (push del diff en saveDone, pull en el primer loadDone, migración única, export/import); aplicar la migración CON Joseph (apply_migration, backup previo) y comprobar la policy en pg_policies. Objetivo del día: tabla viva.
  - **Vie 02-10 · doc + commit + preparar SHIP**: Probar el sync en vivo: marcar/desmarcar 3 días en la app → select * from plan_checks (execute_sql) refleja altas y bajas; revisar el log de errores del cliente (nunca debe lanzar).
  - **Lun 05-10 · 5' objetivo → spec del día**: Segundo navegador (o móvil): el pull fusiona remoto + local; la migración única sube el JSON existente una sola vez (jmd-study-progress-migrated-v1). Corregir lo que no cuadre en studyProgressSync.ts.
  - **Mar 06-10 · construir con Claude Code**: UI: botón Exportar/Importar progreso (portapapeles) en Home si aún no está expuesto; gen_revision_semanal.js lee plan_checks (métricas 6, 7, 9) con fallback al export.
  - **Mié 07-10 · construir con Claude Code**: Commit [S3] + node DATA/_scripts/verify_vibecoding.js 3 + journal.
- **SHIP**: SHIP S3: plan_checks con filas reales desde la app + export/import probado en 2 navegadores (verify 3 → 4/4).

## S4 · verify_vibecoding + revisión semanal cerrada (10 métricas con dato real)

- **Semana**: jue 08-oct → mié 14-oct · **SHIP**: sábado sáb 17-oct (PC SYNAPSE 15:00-17:00) · rotación `yocpmd` · commits `[S4] …` en `D:/joseph-md-app`
- **A quién sirve**: TODOS — verify_vibecoding.js (12-sep) ya mide 'shipped' mecánicamente y gen_revision_semanal.js v1 ya pre-rellena, pero la revisión sigue diciendo 'sin dato' en varias métricas y la 7 (vibecoding) se decide por el ✓ manual: hay que cerrar el circuito (scores USMLE de usmleScores.ts, telemetría v2, plan_checks, _vibecoding_ship.json) para que el sábado 07:15 Joseph solo DECIDA.
- **Objetivo**: Que la revisión S04 (sáb 10-oct) salga con ≥8/10 métricas reales y que la métrica 7 lea el último verify del proyecto de la semana, no el auto-reporte.
- **Entregable verificable**: DATA/USMLE/REVISIONES/S04_2026-10-10.md con ≥8/10 métricas reales + _vibecoding_ship.json con S1-S4 + gen_revision_semanal.js leyendo verify/scores/plan_checks + commit [S4].
- **Dónde**: DATA/_scripts/verify_vibecoding.js (ya existe) · DATA/_scripts/gen_revision_semanal.js (v1 ya existe) · DATA/REVISION_SEMANAL.md · DATA/USMLE/REVISIONES/ · src/lib/usmleScores.ts (solo lectura)
- **Criterio de aceptación (definition of done)** — `node DATA/_scripts/verify_vibecoding.js 4`:
  - [ ] node DATA/_scripts/gen_revision_semanal.js genera DATA/USMLE/REVISIONES/S04_2026-10-10.md con ≤2 métricas 'sin dato' _(verify: fichero)_
  - [ ] DATA/SYNAPSE/_vibecoding_ship.json tiene ≥4 entradas (S1-S4) con criterios_ok/total, escritas por verify_vibecoding.js cada sábado _(verify: fichero)_
  - [ ] La métrica 7 de S04 muestra los criterios del verify (texto 'criterios' presente), no '5/5 días = shipped' _(verify: fichero)_
  - [ ] Commit [S4] en joseph-md-app _(verify: git)_
- **Docs (verificadas 5-sep-2026)**: [Claude Code — Extend Claude with skills (Create your first skill)](https://code.claude.com/docs/en/skills) · [Claude Code — Run Claude Code programmatically (claude -p · --output-format json)](https://code.claude.com/docs/en/headless) · [Supabase — Data REST API](https://supabase.com/docs/guides/api)
- **Pasos diarios (45' cada uno)**:
  - **Jue 08-10 · verificar en vivo (test/URL/dato)**: Correr node DATA/_scripts/gen_revision_semanal.js y listar cada métrica 'sin dato'; correr node DATA/_scripts/verify_vibecoding.js 1, 2 y 3 y leer _vibecoding_ship.json. Objetivo del día: lista de las 3 conexiones más baratas.
  - **Vie 09-10 · doc + commit + preparar SHIP**: gen_revision_semanal.js: métrica 7 = último verify del proyecto de la semana (criterios_ok/total + shipped) en lugar de '5/5 días = shipped'; métrica 1 desde usmle_daily_scores / jmd-usmle-scores (usmleScores.ts).
  - **Lun 12-10 · 5' objetivo → spec del día**: Métricas 6 y 9 desde plan_checks (S3) con fallback al export de localStorage; métrica 3 desde la telemetría v2 (primeraReview incluido).
  - **Mar 13-10 · construir con Claude Code**: Generar S04 en seco, leerla completa y corregir la plantilla (DATA/REVISION_SEMANAL.md) donde no ayude a decidir; contar métricas reales (≥8/10).
  - **Mié 14-10 · construir con Claude Code**: Automatizar el pre-relleno (viernes 21:00, schtasks o /schedule) + commit [S4] + node DATA/_scripts/verify_vibecoding.js 4 + journal.
- **SHIP**: SHIP S4: sábado 10-oct 07:15 primera revisión con ≥8/10 métricas reales y métrica 7 verificada por script (verify 4 → 4/4).

## S5 · Puente VITALS → revisión (sueño y agua cruzados con % eval)

- **Semana**: jue 15-oct → mié 21-oct · **SHIP**: sábado sáb 24-oct (PC SYNAPSE 15:00-17:00) · rotación `yocpmd` · commits `[S5] …` en `D:/joseph-md-app`
- **A quién sirve**: USMLE + salud — VITALS ya registra mv_wellness_logs (tipo agua|sueno, misma Supabase) y usmleScores.ts ya guarda eval %; la doctrina 'si fallas <70% 3 días → bajar carga + dormir' y el disparador ÁMBAR 'sueño <6 h' del PROTOCOLO_MODO_MINIMO no tienen datos con los que dispararse.
- **Objetivo**: Tabla 'sueño × % eval' (7 noches) y contador de noches <7 h / <6 h en la revisión semanal + 'Sueño anoche: X h' en el Home + sugerencia automática de modo ÁMBAR si sueño <6 h (Joseph decide).
- **Entregable verificable**: gen_revision_semanal.js con la tabla sueño×eval real + CockpitStatusBar con sueño de anoche + TodayMission sugiriendo ÁMBAR + commit [S5].
- **Dónde**: VITALS/web (quick-log.tsx ya existe) · DATA/_scripts/gen_revision_semanal.js · src/components/home/CockpitStatusBar.tsx · src/components/home/TodayMission.tsx · src/lib/usmleScores.ts (solo lectura)
- **Criterio de aceptación (definition of done)** — `node DATA/_scripts/verify_vibecoding.js 5`:
  - [ ] La revisión S05 muestra la tabla sueño×eval con 7 noches reales (texto 'sueño' y horas por fecha) _(verify: fichero)_
  - [ ] El Home muestra 'Sueño anoche: X h' (lectura de mv_wellness_logs con la policy del usuario médico o del JSON de la revisión) _(verify: manual — abrir el Home tras un quick-log de sueño y ver el instrumento)_
  - [ ] Con sueño <6 h el selector de modo de TodayMission propone ÁMBAR (chip 'sugerido: ÁMBAR'), sin forzarlo _(verify: manual — registrar 5 h en VITALS y ver el chip 'sugerido: ÁMBAR' en MISIÓN DE HOY)_
  - [ ] Commit [S5] en joseph-md-app _(verify: git)_
- **Docs (verificadas 5-sep-2026)**: [Supabase — Row Level Security (auth.uid() · Helper functions)](https://supabase.com/docs/guides/database/postgres/row-level-security) · [Supabase — Build a User Management App with Expo React Native (Get API details · Account page)](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
- **Pasos diarios (45' cada uno)**:
  - **Jue 15-10 · verificar en vivo (test/URL/dato)**: Consultar mv_wellness_logs (tipo sueno/agua) con la anon key: si RLS bloquea, definir la policy de lectura para el usuario médico o usar el JSON de la revisión como puente. Objetivo del día: 7 noches leídas por script.
  - **Vie 16-10 · doc + commit + preparar SHIP**: gen_revision_semanal.js: tabla sueño×eval por fecha (join con usmle_daily_scores de usmleScores.ts) + contador de noches <7 h y <6 h.
  - **Lun 19-10 · 5' objetivo → spec del día**: CockpitStatusBar: 'Sueño anoche: X h' (último log o JSON) con try/catch y '—' si no hay dato.
  - **Mar 20-10 · construir con Claude Code**: TodayMission: si el sueño de anoche <6 h → chip 'sugerido: ÁMBAR' junto al selector de modo (PROTOCOLO_MODO_MINIMO); Joseph decide.
  - **Mié 21-10 · construir con Claude Code**: Fuente de datos documentada en PROTOCOLO_MODO_MINIMO.md (sección Fuentes) + commit [S5] + verify 5 + journal.
- **SHIP**: SHIP S5: revisión S05 con 7 noches reales + sueño en el Home + sugerencia ÁMBAR funcionando (verify 5 → 4/4).

## S6 · RLS en datos_tesis y kappa_piloto + auditoría de tablas sin RLS

- **Semana**: jue 22-oct → mié 28-oct · **SHIP**: sábado sáb 31-oct (PC SYNAPSE 15:00-17:00) · rotación `yocpmd` · commits `[S6] …` en `D:/joseph-md-app`
- **A quién sirve**: Research + seguridad — datos de menores (14-18 años) en tablas con RLS OFF y la anon key en un repo con remoto GitHub PÚBLICO (verificado 5-sep: datos_tesis 55 filas RLS false, kappa_piloto RLS false). Es 1 sentencia SQL + prueba del pipeline: si Joseph lo aprueba antes de S6, se aplica en D1-D2 y esta semana queda para el test anon + la auditoría de TODAS las tablas sin RLS.
- **Objetivo**: Que la anon key NO pueda leer datos_tesis ni kappa_piloto (el pipeline usa service_role desde .env local) y que no quede ninguna tabla con datos sensibles sin RLS.
- **Entregable verificable**: Migración aplicada con Joseph + DATA/_scripts/test_rls_anon.js verde + DATA/_scripts/_migrations/_auditoria_rls.md (inventario de tablas sin RLS, decisión por tabla) + commit [S6] en joseph-md-app (D:/agente_estudio no es repo git).
- **Dónde**: D:/agente_estudio (SECURITY_AUDIT.md · SECURITY_AUDIT_PHASE_A_C.sql; sin git) · Supabase qacynpqdrorpuegsmtcy · DATA/_scripts/test_rls_anon.js (nuevo) · DATA/_scripts/_migrations/_auditoria_rls.md (nuevo)
- **Criterio de aceptación (definition of done)** — `node DATA/_scripts/verify_vibecoding.js 6`:
  - [ ] node DATA/_scripts/test_rls_anon.js (joseph-md-app) → "OK": SELECT con anon key sobre datos_tesis y kappa_piloto devuelve 0 filas o 401 _(verify: test)_
  - [ ] DATA/_scripts/_migrations/_auditoria_rls.md existe con el inventario de pg_class (relrowsecurity) y 0 tablas de datos sensibles pendientes; get_advisors (security) ya no lista datos_tesis ni kappa_piloto _(verify: fichero)_
  - [ ] El pipeline Python de agente_estudio sigue escribiendo (SUPABASE_SERVICE_ROLE_KEY en .env, gitignored; nunca en el repo) _(verify: manual — correr el pipeline con service_role y ver la fila nueva en datos_tesis)_
  - [ ] Commit [S6] en joseph-md-app (SECURITY_AUDIT.md de agente_estudio actualizado con fecha y hash de la migración) _(verify: git)_
- **Docs (verificadas 5-sep-2026)**: [Supabase — Row Level Security (Enable RLS and set the grants · Policy tests · Bypassing RLS)](https://supabase.com/docs/guides/database/postgres/row-level-security) · [Supabase — Data REST API](https://supabase.com/docs/guides/api)
- **Pasos diarios (45' cada uno)**:
  - **Jue 22-10 · verificar en vivo (test/URL/dato)**: Inventario: quién lee/escribe datos_tesis y kappa_piloto (grep en agente_estudio + SECURITY_AUDIT_PHASE_A_C.sql) y listado de TODAS las tablas con relrowsecurity=false (execute_sql sobre pg_class); decidir política por tabla. Objetivo del día: _auditoria_rls.md borrador.
  - **Vie 23-10 · doc + commit + preparar SHIP**: Escribir la migración: alter table … enable row level security + policies (solo service_role + rol médico); probar en rama de Supabase (create_branch) o en seco. Si Joseph ya la aprobó en D1-D2, saltar a la prueba.
  - **Lun 26-10 · 5' objetivo → spec del día**: Mover el acceso del pipeline a SUPABASE_SERVICE_ROLE_KEY en .env (gitignored); comprobar que el pipeline sigue insertando.
  - **Mar 27-10 · construir con Claude Code**: DATA/_scripts/test_rls_anon.js: con la anon key de src/lib/supabase.ts, SELECT sobre datos_tesis y kappa_piloto → espera 0 filas/401 e imprime "OK"; correr get_advisors (security) y pegar la salida en _auditoria_rls.md.
  - **Mié 28-10 · construir con Claude Code**: Aplicar con Joseph (apply_migration, backup previo) + SECURITY_AUDIT.md + commit [S6] + node DATA/_scripts/verify_vibecoding.js 6 + journal.
- **SHIP**: SHIP S6: RLS activo en producción + test anon verde + auditoría con 0 pendientes sensibles (verify 6 → 4/4).

## S7 · Motor de preguntas ENCAPS semiautomático (stock del banco propio) — semana DELOAD · DELOAD

- **Semana**: jue 29-oct → mié 04-nov · **SHIP**: sábado sáb 07-nov (PC SYNAPSE 15:00-17:00) · rotación `preguntas` · commits `[S7] …` en `D:/joseph-md-app`
- **A quién sirve**: ENCAPS — la hora de banqueo 16:15 depende de que el chat genere preguntas con el mapa (pronóstico v3 + TRACKING_ERRORES) y registre la ronda; hay 18 sets / 2.052 preguntas del banco propio, gen_encaps_minisim.js (--banco/--eval/--sim100) y _etiquetas_examenes_reales_v3.json ya construidos: el motor debe SERVIR del stock por subtema del día y registrar la ronda, generando preguntas nuevas solo cuando el stock del subtema se agota. Semana post-NBME 26 (26-30 oct) = DELOAD: 2 días de 45' + 3 de ≤15'.
- **Objetivo**: Una skill /pregunta-encaps que lea el mapa del examen + el perfil de errores, sirva 5 viñetas ciegas del subtema del día desde el banco propio (sin repetir las ya usadas, fuente citada) y registre la ronda en _registro_resoluciones.json.
- **Entregable verificable**: .claude/skills/pregunta-encaps/SKILL.md + DATA/ENCAPS/TRACKING_ERRORES/_stock_usado.json (control de repetición) + 1 ronda real de 5Q registrada con confianza/error/ruta + commit [S7].
- **Dónde**: .claude/skills/pregunta-encaps/ (nuevo) · DATA/ENCAPS/TRACKING_ERRORES/ · DATA/_scripts/gen_encaps_minisim.js (ya existe) · DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md
- **Criterio de aceptación (definition of done)** — `node DATA/_scripts/verify_vibecoding.js 7`:
  - [ ] .claude/skills/pregunta-encaps/SKILL.md existe y cita PRONOSTICO_WALKFORWARD_2027-1_v3 + PERFIL_CONOCIMIENTO + el banco propio (rutas reales) _(verify: fichero)_
  - [ ] DATA/ENCAPS/TRACKING_ERRORES/_stock_usado.json registra los ids servidos (≥5) para no repetir preguntas del banco _(verify: fichero)_
  - [ ] La ronda se APENDA a _registro_resoluciones.json con el esquema del README (tu/correcta/ok/confianza/error/ruta) y PERFIL_CONOCIMIENTO.md se actualiza con el % ciego real _(verify: manual — abrir _registro_resoluciones.json y PERFIL_CONOCIMIENTO.md: la ronda de la semana está y el % ciego cambió)_
  - [ ] Commit [S7] en joseph-md-app · deload respetado (2 días de 45' + 3 de ≤15') _(verify: git)_
- **Docs (verificadas 5-sep-2026)**: [Anthropic Academy — Introduction to agent skills](https://anthropic.skilljar.com/introduction-to-agent-skills) · [Claude Code — Extend Claude with skills (Inject dynamic context · Run skills in a subagent)](https://code.claude.com/docs/en/skills)
- **Pasos diarios (45' cada uno; deload: mar/jue 15')**:
  - **Jue 29-10 · verificar en vivo (test/URL/dato)**: (45') Escribir SKILL.md: lee PRONOSTICO v3 + rotación del día + PERFIL_CONOCIMIENTO → sirve 5 viñetas del stock propio (gen_encaps_minisim.js --banco) en formato pregunta→solución interactiva, sin clave hasta que Joseph responda; genera nuevas SOLO si el subtema no tiene stock.
  - **Vie 30-10 · doc + commit + preparar SHIP (15')**: (15' deload) Revisar el formato de salida con 1 viñeta; nada más.
  - **Lun 02-11 · 5' objetivo → spec del día**: (45') Registro: la skill apenda la ronda a _registro_resoluciones.json (esquema README), vuelca RONDAS/<codigo>_<fecha>.json y anota los ids servidos en _stock_usado.json.
  - **Mar 03-11 · construir con Claude Code (15')**: (15' deload) Descanso activo: leer 1 ronda anterior y anotar 1 mejora.
  - **Mié 04-11 · construir con Claude Code (15')**: (15') 1 ronda real de 5Q en la hora ENCAPS (16:15) registrada + commit [S7] + node DATA/_scripts/verify_vibecoding.js 7 + journal.
- **SHIP**: SHIP S7 (deload): skill funcionando desde el stock + 1 ronda registrada. Sin ampliar alcance (verify 7 → 4/4).

## S8 · Pool MIR: clasificación verificada de los cuadernillos 2022-2026 + UI de 10Q

- **Semana**: jue 05-nov → mié 11-nov · **SHIP**: sábado sáb 14-nov (PC SYNAPSE 15:00-17:00) · rotación `preguntas` · commits `[S8] …` en `D:/joseph-md-app`
- **A quién sirve**: MIR — DATA/_scripts/gen_mir_pool.js (12-sep) ya descarga los cuadernos oficiales 2022-2026 + las hojas de respuestas DEFINITIVAS del Ministerio (DATA/MIR/pool/raw/*.pdf + plantillas) y los parsea a DATA/MIR/pool/AAAA.json con clave oficial; NO clasifica por asignatura/tema (paso 2 pendiente) y la eval D-1 de las 15:15 sigue sirviéndose a mano. Sin clasificación verificada se repite el error de las claves inventadas de ENCAPS.
- **Objetivo**: Paso 2 del pipeline: clasificar el pool (asignatura + tema del temario de mirDailyPlan.ts) con verificación por muestreo contra el PDF, y una UI que sirva 10Q ciegas del tema del día en el hub MIR.
- **Entregable verificable**: DATA/MIR/pool/_clasificacion.json (id → asignatura/tema, ≥200 preguntas) + DATA/MIR/pool/_verificacion.md (muestra de 30 comprobada a mano, ≥95%) + 10Q del tema del día en MirTodayPlan + commit [S8].
- **Dónde**: DATA/_scripts/gen_mir_pool.js (ya existe: --descargar/--parse/--stats) · DATA/MIR/pool/ (raw/*.pdf ya descargados · AAAA.json · _clasificacion.json y _verificacion.md nuevos) · DATA/_scripts/mir_pool_clasificar.js (nuevo) · src/components/study/MirTodayPlan.tsx · src/lib/mirDailyPlan.ts (solo lectura)
- **Criterio de aceptación (definition of done)** — `node DATA/_scripts/verify_vibecoding.js 8`:
  - [ ] DATA/MIR/pool/_clasificacion.json contiene ≥200 preguntas con asignatura y tema (la clave viene de la plantilla DEFINITIVA parseada por gen_mir_pool.js: 0 claves inventadas) _(verify: fichero)_
  - [ ] DATA/MIR/pool/_verificacion.md registra la muestra de 30 preguntas comprobadas a mano contra el PDF con ≥95% de clasificación correcta y 100% de claves correctas _(verify: fichero)_
  - [ ] MirTodayPlan sirve 10Q ciegas del tema del día desde el pool (clave solo después de responder) y registra la ronda en jmd-mir-eval-log _(verify: manual — abrir el hub MIR → 10Q del día; responder 1 y ver la clave oficial + registro)_
  - [ ] Commit [S8] en joseph-md-app _(verify: git)_
- **Docs (verificadas 5-sep-2026)**: [Automate the Boring Stuff (3ª ed.) — cap. 17: PDF and Word Documents](https://automatetheboringstuff.com/3e/chapter17.html) · [Claude Code — Run Claude Code programmatically (claude -p con --json-schema)](https://code.claude.com/docs/en/headless) · [Claude Code — Extend Claude with skills (Pass arguments to skills)](https://code.claude.com/docs/en/skills)
- **Pasos diarios (45' cada uno)**:
  - **Jue 05-11 · verificar en vivo (test/URL/dato)**: Correr node DATA/_scripts/gen_mir_pool.js --parse (si aún no) y leer _parse_errores.json + _stats.json; comprobar en 10 preguntas que la clave del JSON coincide con la plantilla definitiva del PDF. Objetivo del día: pool parseado y fiable.
  - **Vie 06-11 · doc + commit + preparar SHIP**: mir_pool_clasificar.js: clasificar por asignatura/tema (claude -p --json-schema con el temario de mirDailyPlan.ts como lista cerrada) → _clasificacion.json; empezar por 2026 y extender a 2022-2025.
  - **Lun 09-11 · 5' objetivo → spec del día**: Verificación: muestra aleatoria de 30 preguntas comprobada A MANO contra el PDF (enunciado, clave, asignatura) → _verificacion.md con % y las correcciones aplicadas.
  - **Mar 10-11 · construir con Claude Code**: UI: MirTodayPlan sirve 10Q ciegas del tema del día desde el pool (sin clave hasta responder) y registra la ronda en jmd-mir-eval-log; verificar en vivo.
  - **Mié 11-11 · construir con Claude Code**: Commit [S8] + node DATA/_scripts/verify_vibecoding.js 8 + journal.
- **SHIP**: SHIP S8: pool ≥200 preguntas con clave oficial + muestra verificada ≥95% + 10Q del día en el hub (verify 8 → 4/4).

## S9 · Migrador de overlays de hitos del Calendar (USMLE + Research) tras cada corrimiento

- **Semana**: jue 12-nov → mié 18-nov · **SHIP**: sábado sáb 21-nov (PC SYNAPSE 15:00-17:00) · rotación `yocpmd` · commits `[S9] …` en `D:/joseph-md-app`
- **A quién sirve**: USMLE + Research — los 12 hitos del Step 1 (UWSA1-2 · NBME 25-33 · Free 120) son overlays del Calendar que cada corrimiento desalinea del .ts y hoy se recrean a mano (recurrenceData del MCP está roto para UPDATE → delete + create). Para Research YA existe el patrón (12-sep): DATA/_scripts/gen_research_calendar.js + DATA/RESEARCH/_calendar_overlays.json (ids + hash, acción crear/recrear/nada). Falta el equivalente USMLE y un diff único.
- **Objetivo**: gen_hitos_overlays.js con el mismo contrato que gen_research_calendar.js: lee usmleStep1Daily.ts, calcula las fechas de los 12 hitos, emite el JSON de acciones (crear/recrear/nada por hash) con la descripción del protocolo test-day, y un diff en seco contra el Calendar vivo.
- **Entregable verificable**: DATA/_scripts/gen_hitos_overlays.js <START> → DATA/USMLE/_hitos_overlays.json + diff en seco (list_events) sin falsos positivos + commit [S9].
- **Dónde**: src/lib/usmleStep1Daily.ts (solo lectura) · DATA/_scripts/gen_research_calendar.js + DATA/RESEARCH/_calendar_overlays.json (patrón ya hecho, 12-sep) · DATA/USMLE/CALENDARIO_5_MESES.md · DATA/_scripts/gen_hitos_overlays.js (nuevo) · MCP Google Calendar
- **Criterio de aceptación (definition of done)** — `node DATA/_scripts/verify_vibecoding.js 9`:
  - [ ] node DATA/_scripts/gen_hitos_overlays.js 2026-09-17 imprime '12 hitos' y escribe DATA/USMLE/_hitos_overlays.json con fecha = la del .ts para cada uno _(verify: test)_
  - [ ] La descripción de cada overlay incluye el protocolo test-day (breaks, Ziploc Break 1/2/3, almuerzo dentro del sim, sin carbohidratos simples) tomado de PALMERTON_POR_MATERIA §F (texto 'Ziploc' presente) _(verify: fichero)_
  - [ ] Un diff en seco contra el Calendar (search_events 'NBME'|'UWSA') lista solo los overlays que cambian; nada se ejecuta sin confirmación explícita de Joseph _(verify: manual — correr el diff con el MCP del Calendar y comprobar que solo lista cambios reales)_
  - [ ] Commit [S9] en joseph-md-app _(verify: git)_
- **Docs (verificadas 5-sep-2026)**: [Claude Code — Connect Claude Code to tools via MCP (Installing MCP servers · Practical examples)](https://code.claude.com/docs/en/mcp) · [Claude Code — Connect to MCP servers (quickstart)](https://code.claude.com/docs/en/mcp-quickstart)
- **Pasos diarios (45' cada uno)**:
  - **Jue 12-11 · verificar en vivo (test/URL/dato)**: Leer gen_research_calendar.js (--print/--check/--set, hash por (fecha, título, descripción)) y listar los hitos y su D# desde usmleStep1Daily.ts (DIAS con 🎯); tabla esperada para START=2026-09-17 comparada con CALENDARIO_5_MESES.md. Objetivo del día: tabla de hitos + contrato del script.
  - **Vie 13-11 · doc + commit + preparar SHIP**: gen_hitos_overlays.js: mismo esquema que el de Research (DATA/USMLE/_hitos_overlays.json con ids + hash + accion); lee el .ts, calcula fechas, sin llamadas al Calendar.
  - **Lun 16-11 · 5' objetivo → spec del día**: Descripción del overlay = protocolo test-day generado desde PALMERTON_POR_MATERIA §F (texto fijo + hora de cada break).
  - **Mar 17-11 · construir con Claude Code**: Diff en seco: con el MCP (list_events/search_events 'NBME'|'UWSA') comparar fechas y listar solo cambios; corregir falsos positivos.
  - **Mié 18-11 · construir con Claude Code**: Doc + commit [S9] + node DATA/_scripts/verify_vibecoding.js 9 + journal. Ejecutar delete/create solo tras confirmación de Joseph (y solo si hubo corrimiento).
- **SHIP**: SHIP S9: JSON de overlays + diff en seco limpio; ejecución real solo con OK de Joseph (verify 9 → 4/4).

## S10 · Bot WhatsApp → OCR → ficha LIVIANO (n8n Webhook + visión)

- **Semana**: jue 19-nov → mié 25-nov · **SHIP**: sábado sáb 28-nov (PC SYNAPSE 15:00-17:00) · rotación `bots` · commits `[S10] …` en `D:/joseph-md-app`
- **A quién sirve**: LIVIANO / Pulso — el paciente manda foto (análisis, balanza, receta) por WhatsApp y hoy se transcribe a mano al CRM.
- **Objetivo**: Webhook de n8n que recibe la imagen de WhatsApp, la pasa por OCR/visión (Claude o Gemini), valida un JSON de ficha y lo guarda en Supabase con respuesta automática al paciente.
- **Entregable verificable**: Workflow n8n exportado (DATA/BUSINESS/n8n_liviano_ocr.json) + tabla liviano_fichas en Supabase (RLS) con ≥3 fichas reales + 3 pruebas en < 60 s con ≥5 campos correctos + commit [S10].
- **Dónde**: n8n (instancia propia) · Supabase (tabla nueva liviano_fichas con RLS; DDL en DATA/_scripts/_migrations/) · CRM Pulso (solo lectura, copiar nunca borrar) · DATA/BUSINESS/n8n_liviano_ocr.json
- **Criterio de aceptación (definition of done)** — `node DATA/_scripts/verify_vibecoding.js 10`:
  - [ ] La tabla liviano_fichas responde por REST (RLS + policy) y tiene ≥3 filas de las pruebas reales _(verify: supabase)_
  - [ ] DATA/BUSINESS/n8n_liviano_ocr.json es el export del workflow (nodo Webhook con verificación de firma; credenciales solo en n8n, nunca en el repo) _(verify: fichero)_
  - [ ] 3/3 pruebas: foto por WhatsApp → fila en < 60 s con ≥5 campos correctos + respuesta automática al paciente con aviso de revisión médica _(verify: manual — enviar 3 fotos reales y cronometrar; contar campos correctos por ficha)_
  - [ ] Commit [S10] en joseph-md-app _(verify: git)_
- **Docs (verificadas 5-sep-2026)**: [n8n — Build your first workflow (trigger · If · test)](https://docs.n8n.io/build-your-first-workflow/) · [n8n — Webhook node (Webhook URLs · HTTP Method · Respond)](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) · [n8n — AI Agent node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/) · [Supabase — Edge Functions quickstart (alternativa serverless)](https://supabase.com/docs/guides/functions/quickstart)
- **Pasos diarios (45' cada uno)**:
  - **Jue 19-11 · verificar en vivo (test/URL/dato)**: Diseño: WhatsApp Cloud API → Webhook n8n → descarga de media → visión (prompt de extracción a JSON) → validación → Supabase → respuesta. Credenciales de WhatsApp: A VERIFICAR con Joseph (cuenta Meta Business). Objetivo del día: diagrama + esquema de la ficha.
  - **Vie 20-11 · doc + commit + preparar SHIP**: n8n: Webhook node (POST, path propio) + verificación de firma + descarga de la imagen; probar con curl y una imagen local.
  - **Lun 23-11 · 5' objetivo → spec del día**: OCR/visión: prompt de extracción con esquema JSON fijo (campos de la ficha) + 2 ejemplos; validar con un nodo Code (campos obligatorios, unidades).
  - **Mar 24-11 · construir con Claude Code**: Guardar en Supabase (tabla liviano_fichas, RLS; migración aplicada con Joseph) + respuesta automática; 3 pruebas con imágenes reales y medir latencia.
  - **Mié 25-11 · construir con Claude Code**: Exportar el workflow a DATA/BUSINESS/n8n_liviano_ocr.json + doc + commit [S10] + node DATA/_scripts/verify_vibecoding.js 10 + journal.
- **SHIP**: SHIP S10: 3/3 pruebas reales en < 60 s con ≥5 campos correctos (verify 10 → 4/4).

## S11 · Pipeline de contenido de marcas (brief → 3 guiones + títulos + thumbnail) con la API de Claude

- **Semana**: jue 26-nov → mié 02-dic · **SHIP**: sábado sáb 05-dic (PC SYNAPSE 15:00-17:00) · rotación `contenido` · commits `[S11] …` en `D:/joseph-md-app`
- **A quién sirve**: Marcas (LIVIANO primero; CURVA/DENSA arrancan en febrero) — hoy el contenido se improvisa; la academia LIVIANO (curriculum.json + gen_liviano_plan.js) produce conocimiento que no se convierte en piezas.
- **Objetivo**: Un script que, dado marca + tema, produzca 3 guiones de 45 s (hook-cuerpo-CTA), 5 títulos, marcadores de corte y un prompt de thumbnail; 1 pieza publicada.
- **Entregable verificable**: DATA/_scripts/gen_contenido.js <marca> <tema> → DATA/BUSINESS/CONTENIDO/<marca>/<fecha>/ + 1 pieza publicada con alcance a 48 h anotado + commit [S11].
- **Dónde**: DATA/_scripts/gen_contenido.js (nuevo) · DATA/BUSINESS/CONTENIDO/ (nuevo) · academia LIVIANO (DATA/BUSINESS/LIVIANO/curriculum.json + src/lib/livianoStudyPlan.ts como banco de temas)
- **Criterio de aceptación (definition of done)** — `node DATA/_scripts/verify_vibecoding.js 11`:
  - [ ] node DATA/_scripts/gen_contenido.js liviano "tema" --dry-run imprime la estructura (3 guiones · 5 títulos · thumbnail) sin llamar a la API _(verify: test)_
  - [ ] Existe DATA/BUSINESS/CONTENIDO/liviano/ con ≥1 carpeta de pieza (guiones.md + titulos + prompt de thumbnail) _(verify: fichero)_
  - [ ] 1 pieza publicada (LIVIANO) con guion generado y revisado por Joseph; alcance a 48 h anotado en el .md; cada claim clínico cita fuente (academia LIVIANO) _(verify: manual — abrir la pieza publicada y el .md con el alcance a 48 h)_
  - [ ] Commit [S11] en joseph-md-app _(verify: git)_
- **Docs (verificadas 5-sep-2026)**: [Anthropic Academy — Building with the Claude API (Prompt engineering techniques · Structured data · Prompt evaluation)](https://anthropic.skilljar.com/claude-with-the-anthropic-api) · [Claude Code — Run Claude Code programmatically (claude -p con --json-schema)](https://code.claude.com/docs/en/headless)
- **Pasos diarios (45' cada uno)**:
  - **Jue 26-11 · verificar en vivo (test/URL/dato)**: Brief por marca (LIVIANO): 3 pilares + tono + 3 temas de la academia; escribir gen_contenido.js que arma el prompt y llama a la API (o claude -p --json-schema) con salida JSON y modo --dry-run. Objetivo del día: dry-run imprimiendo la estructura.
  - **Vie 27-11 · doc + commit + preparar SHIP**: Guiones: 3 guiones de 45 s (hook-cuerpo-CTA) + 5 títulos; guardar en DATA/BUSINESS/CONTENIDO/liviano/<fecha>/guiones.md.
  - **Lun 30-11 · 5' objetivo → spec del día**: Thumbnail: prompt de imagen + 1 imagen generada con la herramienta disponible; marcadores de corte para clips.
  - **Mar 01-12 · construir con Claude Code**: Revisión humana (claims clínicos con fuente de la academia) + publicar 1 pieza.
  - **Mié 02-12 · construir con Claude Code**: Anotar alcance a 48 h + commit [S11] + node DATA/_scripts/verify_vibecoding.js 11 + journal.
- **SHIP**: SHIP S11: 1 pieza publicada con guion generado + carpeta de la pieza completa (verify 11 → 4/4).

## S12 · Capstone: README del sistema YoCPMD + demo 5' + retro de 12 semanas

- **Semana**: jue 03-dic → mié 09-dic · **SHIP**: sábado sáb 12-dic (PC SYNAPSE 15:00-17:00) · rotación `yocpmd` · commits `[S12] …` en `D:/joseph-md-app`
- **A quién sirve**: Joseph futuro y cualquier agente nuevo — hoy el conocimiento del sistema vive en la memoria de Claude y en 60+ scripts sin mapa; y la retro de S1-S11 debe salir de _vibecoding_ship.json (verify), no de la memoria.
- **Objetivo**: Un README que permita a un agente/persona nueva operar el sistema (scripts, hooks, skills, pipeline de corrimiento, revisión semanal, verify) + demo grabada + retro honesta de los 12 entregables + decisión CCA-F.
- **Entregable verificable**: DATA/README_SISTEMA.md + demo de 5' + retro (tabla en VIBECODING_12_PROYECTOS.md rellenada desde _vibecoding_ship.json) + decisión CCA-F escrita + commit [S12] + tag vibecoding-s12.
- **Dónde**: DATA/README_SISTEMA.md (nuevo) · DATA/SYNAPSE/VIBECODING_12_PROYECTOS.md (retro) · DATA/SYNAPSE/_vibecoding_ship.json · D:/synapse-journal
- **Criterio de aceptación (definition of done)** — `node DATA/_scripts/verify_vibecoding.js 12`:
  - [ ] DATA/README_SISTEMA.md existe con el mapa de DATA/_scripts (qué genera cada uno y en qué orden), hooks, skills y los 3 rituales (diario, viernes, sábado); menciona remap_inicio.js y verify_vibecoding.js _(verify: fichero)_
  - [ ] DATA/SYNAPSE/_vibecoding_ship.json tiene ≥12 entradas (verify corrido para S1-S12) y la retro lista los 12 con estado (shipped / parcial / no) + 1 lección por proyecto _(verify: fichero)_
  - [ ] Demo de 5' grabada recorriendo Home → Estudio → revisión semanal (enlace en el README) y decisión escrita: examen CCA-F (fecha post-Step 1) o no, y plan de la fase siguiente _(verify: manual — abrir el enlace de la demo y leer la decisión CCA-F en el README)_
  - [ ] Commit [S12] en joseph-md-app (+ tag vibecoding-s12) _(verify: git)_
- **Docs (verificadas 5-sep-2026)**: [Anthropic Academy — Claude Code in Action (Verify and Share · Plugins)](https://anthropic.skilljar.com/claude-code-in-action) · [Claude Code — Create plugins (empaquetar skills/hooks propios)](https://code.claude.com/docs/en/plugins) · [Anthropic Academy — catálogo (22 cursos, prep CCA-F)](https://anthropic.skilljar.com/)
- **Pasos diarios (45' cada uno)**:
  - **Jue 03-12 · verificar en vivo (test/URL/dato)**: README_SISTEMA.md: inventario de DATA/_scripts (generadores, remap, telemetría, revisión, verify), hooks y skills; orden del pipeline de corrimiento. Objetivo del día: índice completo, sin prosa.
  - **Vie 04-12 · doc + commit + preparar SHIP**: Demo 5': grabar (OBS/Loom) Home → Estudio → revisión semanal; subir y enlazar desde el README.
  - **Lun 07-12 · 5' objetivo → spec del día**: Retro: correr node DATA/_scripts/verify_vibecoding.js para S1-S11 y rellenar la tabla de VIBECODING_12_PROYECTOS.md con estado + 1 lección cada uno; qué se automatiza en el taper.
  - **Mar 08-12 · construir con Claude Code**: Decisión CCA-F: revisar los 5 dominios (Agentic Architecture 27% · Claude Code 20% · Tool Design & MCP 18% · Prompt Engineering 20% · Context Management 15%, según CALIDAD/Synapse.md) contra lo hecho; fijar fecha post-Step 1 (feb-2027) o no.
  - **Mié 09-12 · construir con Claude Code**: Commit final [S12] + tag vibecoding-s12 + node DATA/_scripts/verify_vibecoding.js 12 + journal (cierre).
- **SHIP**: SHIP S12: README + demo + retro desde verify + decisión CCA-F publicados (verify 12 → 4/4).

## Semanas 13-20 · TAPER (mantenimiento → deload total → examen)

> S13-S16 (10-dic → 6-ene, bloques secuenciales): MANTENIMIENTO ≤15'/día con flag deload (sensores verdes: node DATA/_scripts/verify_vibecoding.js --sensores · 1 mejora pequeña · retro) y el resto del bloque 04:15 = journal + lectura de docs (sin teclado pesado). S17-S20 (7-ene → 1-feb, Fases B-C del Step 1): DELOAD TOTAL del vibecoding = journal 5' + audio (bloque B del SYNAPSE); PC sáb/dom OPCIONAL (30' máx, solo en día VERDE). S20 = cierre del plan: jue 28-ene → lun 1-feb (D93-D95; vie 29 = D94 última sesión de banco, finde libre, lun 1-feb = D95 = D-1), mar 2-feb EXAMEN (v5.13). Ningún proyecto nuevo después de S12; la decisión de febrero (IA vs ENCAPS intensivo) sigue intacta.

### S13 · Mantenimiento 1: sensores verdes tras el NBME 28 · MANTENIMIENTO (15'/día)

- **Semana**: jue 10-dic → mié 16-dic (5 días hábiles) · Step 1: S13 · post-NBME 28 (deload secundarios)
- **Objetivo**: Que telemetría Anki, verify, revisión semanal y plan_checks sigan verdes sin construir nada nuevo; el resto del bloque 04:15 = journal + lectura de docs.
- **Sensores**: `node DATA/_scripts/verify_vibecoding.js --sensores` · `node DATA/_scripts/anki_telemetria.js` · `node DATA/_scripts/gen_revision_semanal.js`
- **Días**:
  - **Jue 10-12 · sensores verdes (≤15')**: Sensores (≤15'): node DATA/_scripts/verify_vibecoding.js --sensores → todo verde o anotar el rojo; nada más de teclado. Resto: journal 5' + lectura de docs.
  - **Vie 11-12 · 1 mejora pequeña (≤15')**: 1 mejora pequeña (≤15') al sensor que dio rojo el lunes (o ninguna si todo verde); commit [S13].
  - **Lun 14-12 · journal + lectura de docs**: Journal 5' + lectura de docs (15'): 1 página de Claude Code docs pendiente del F1/F2 de las 12:30; sin construir.
  - **Mar 15-12 · retro semanal**: Retro semanal (≤15'): qué se rompió, qué sensor mintió, 1 línea por frente en el journal.
  - **Mié 16-12 · doc + commit + preparar SHIP**: Commit [S13] de lo que haya + journal + node DATA/_scripts/verify_vibecoding.js --sensores (deja constancia en _vibecoding_ship.json).
- **Sábado/domingo**: Sábado PC (opcional, 30'): verify --sensores + retro de la semana; no se abre ningún proyecto nuevo.

### S14 · Mantenimiento 2: revisión semanal automática y export · MANTENIMIENTO (15'/día)

- **Semana**: jue 17-dic → mié 23-dic (5 días hábiles) · Step 1: S14
- **Objetivo**: Que la revisión del sábado se pre-genere sola (viernes 21:00) y que el export de progreso no dependa del navegador.
- **Sensores**: `node DATA/_scripts/verify_vibecoding.js --sensores` · `node DATA/_scripts/gen_revision_semanal.js`
- **Días**:
  - **Jue 17-12 · sensores verdes (≤15')**: Sensores (≤15'): verify --sensores; comprobar que la tarea programada del viernes 21:00 dejó DATA/USMLE/REVISIONES/S13_*.md.
  - **Vie 18-12 · 1 mejora pequeña (≤15')**: 1 mejora pequeña (≤15'): la métrica que peor se lea en la revisión; commit [S14].
  - **Lun 21-12 · journal + lectura de docs**: Journal 5' + lectura de docs (15'); sin construir.
  - **Mar 22-12 · retro semanal**: Retro semanal (≤15') en el journal.
  - **Mié 23-12 · doc + commit + preparar SHIP**: Commit [S14] + journal + verify --sensores.
- **Sábado/domingo**: Sábado PC (opcional, 30'): verify --sensores + retro.

### S15 · Mantenimiento 3: semana corta de Navidad · MANTENIMIENTO (15'/día)

- **Semana**: jue 24-dic → mié 30-dic (4 días hábiles) · Step 1: S15 · Navidad (25-dic libre)
- **Objetivo**: Sensores verdes con 4 días hábiles; el 25-dic es libre (feriado).
- **Sensores**: `node DATA/_scripts/verify_vibecoding.js --sensores`
- **Días**:
  - **Jue 24-12 · sensores verdes (≤15')**: Sensores (≤15'): verify --sensores; journal 5'.
  - **Lun 28-12 · 1 mejora pequeña (≤15')**: 1 mejora pequeña (≤15') o ninguna; commit [S15].
  - **Mar 29-12 · journal + lectura de docs**: Journal 5' + lectura de docs (15').
  - **Mié 30-12 · retro semanal**: Retro semanal (≤15') + commit [S15] + verify --sensores (el vie 25-dic es feriado: el bloque S15 va del jue 24 al mié 30-dic).
- **Sábado/domingo**: Sábado 26-dic PC (opcional, 30'): verify --sensores + retro; si descansas, marca ✓ igual.

### S16 · Mantenimiento 4: cierre de año, sensores verdes antes de la Fase B · MANTENIMIENTO (15'/día)

- **Semana**: lun 04-ene → mié 06-ene (3 días hábiles) · Step 1: S16 · lun 4 → mié 6-ene (31-dic y 1-ene libres) · Fase A sigue hasta el mar 12-ene (D81)
- **Objetivo**: Llegar al UWSA2 (vie 8-ene) y a la Fase B (13-ene) con todos los sensores verdes y el journal al día; 3 días hábiles (31-dic y 1-ene feriados).
- **Sensores**: `node DATA/_scripts/verify_vibecoding.js --sensores` · `node DATA/_scripts/anki_telemetria.js`
- **Días**:
  - **Lun 04-01 · sensores verdes (≤15')**: Sensores (≤15'): verify --sensores + telemetría Anki (backlog = 0 antes del UWSA2 y la Fase B); journal 5'.
  - **Mar 05-01 · 1 mejora pequeña (≤15')**: 1 mejora pequeña (≤15') o ninguna; commit [S16].
  - **Mié 06-01 · retro semanal**: Retro de S13-S16 (≤15') en el journal: qué se mantiene en deload total, qué se apaga hasta febrero. Commit [S16] + verify --sensores.
- **Sábado/domingo**: Sábado 2-ene PC (opcional, 30'): verify --sensores + retro; desde aquí, deload total.

### S17 · Deload total 1: journal 5' + audio (Fase B) · DELOAD (5'/día)

- **Semana**: jue 07-ene → mié 13-ene (5 días hábiles) · Step 1: S17 · jue 7 → mié 13-ene · UWSA2 vie 8-ene (D79) · Fase B desde el mié 13-ene (D82)
- **Objetivo**: El 04:15 se reduce a 5' de journal + el audio B del SYNAPSE; el resto de la franja es dormir o Anki si hay backlog. Ningún teclado.
- **Días**:
  - **Jue 07-01 · journal 5' + audio (deload total)**: Journal 5' (objetivo del día del Step 1 · sueño · modo) + audio B. Nada más.
  - **Vie 08-01 · journal 5' + audio (deload total)**: Journal 5' + audio B (UWSA2 hoy, vie 8-ene: el journal anota solo cómo dormiste).
  - **Lun 11-01 · journal 5' + audio (deload total)**: Journal 5' + audio B (lun 11-ene: post-UWSA2, sin juicios).
  - **Mar 12-01 · journal 5' + audio (deload total)**: Journal 5' + audio B (mar 12-ene: cierre de Fase A).
  - **Mié 13-01 · journal 5' + audio (deload total)**: Journal 5' + audio B (mié 13-ene: arranca la Fase B).
- **Sábado/domingo**: PC sáb/dom OPCIONAL (30' máx, solo en día VERDE): verify --sensores; si no, nada.

### S18 · Deload total 2: journal 5' + audio (semana GO/NO-GO) · DELOAD (5'/día)

- **Semana**: jue 14-ene → mié 20-ene (5 días hábiles) · Step 1: S18 · jue 14 → mié 20-ene · NBME 31 vie 15 (GO/NO-GO) · NBME 32 lun 18 · NBME 33 mié 20
- **Objetivo**: Igual que S17. El viernes decide el GO/NO-GO: el journal solo registra sueño y modo, sin juicios.
- **Días**:
  - **Jue 14-01 · journal 5' + audio (deload total)**: Journal 5' + audio B.
  - **Vie 15-01 · journal 5' + audio (deload total)**: Journal 5' + audio B (NBME 31 hoy, vie 15-ene: GO/NO-GO).
  - **Lun 18-01 · journal 5' + audio (deload total)**: Journal 5' + audio B (NBME 32 hoy, lun 18-ene).
  - **Mar 19-01 · journal 5' + audio (deload total)**: Journal 5' + audio B (mar 19-ene: post-NBME 32).
  - **Mié 20-01 · journal 5' + audio (deload total)**: Journal 5' + audio B (NBME 33 hoy, mié 20-ene).
- **Sábado/domingo**: PC sáb/dom OPCIONAL (30' máx, solo en día VERDE).

### S19 · Deload total 3: journal 5' + audio (Fase C, última semana con SYNAPSE) · DELOAD (5'/día)

- **Semana**: jue 21-ene → mié 27-ene (5 días hábiles) · Step 1: S19 · Fase C (jue 21 → mié 27-ene) · Free 120 vie 22-ene (NBME 32/33 van en S18)
- **Objetivo**: Igual que S17-S18. El SYNAPSE de las 12:30 cierra el mar 26-ene (F2 · CCA-F prep, última A-unit); desde el mié 27 solo Step 1.
- **Días**:
  - **Jue 21-01 · journal 5' + audio (deload total)**: Journal 5' + audio B (jue 21-ene).
  - **Vie 22-01 · journal 5' + audio (deload total)**: Journal 5' + audio B (Free 120 hoy, vie 22-ene).
  - **Lun 25-01 · journal 5' + audio (deload total)**: Journal 5' + audio B (lun 25-ene).
  - **Mar 26-01 · journal 5' + audio (deload total)**: Journal 5' + audio B (mar 26-ene: última A-unit del SYNAPSE).
  - **Mié 27-01 · journal 5' + audio (deload total)**: Journal 5' + audio B (mié 27-ene) · cierre del journal S13-S19: 3 líneas para la reestructuración de febrero (IA vs ENCAPS intensivo).
- **Sábado/domingo**: Sáb 23 / dom 24-ene: NADA de IA (fin de semana pre-examen). PC = no.

### S20 · Cierre del plan: journal 5' (jue 28, vie 29 y lun 1-feb), mar 2-feb EXAMEN · DELOAD (5'/día)

- **Semana**: jue 28-ene → lun 01-feb (3 días hábiles) · Step 1: S20 · cierre del plan: jue 28-ene → lun 1-feb (D93-D95; vie 29 = D94 última sesión de banco · finde libre · lun 1-feb = D95 = D-1) · mar 2-feb EXAMEN
- **Objetivo**: Solo 5' de journal a las 04:15 los tres últimos días del plan (jue 28, vie 29 y lun 1-feb = D95 = D-1); sáb 30 y dom 31 libres; el mar 2-feb es el Step 1. Cero IA.
- **Días**:
  - **Jue 28-01 · journal 5' + audio (deload total)**: Journal 5' (sueño · modo · 1 frase de identidad). Nada más.
  - **Vie 29-01 · journal 5' + audio (deload total)**: Journal 5'.
  - **Lun 01-02 · journal 5' + audio (deload total)**: Journal 5' (D95 = lun 1-feb = D-1, último día del plan): cierre del journal del ciclo · nada de IA · dormir temprano · martes 2-feb = EXAMEN.
- **Sábado/domingo**: Sin PC: sáb 30-ene es post-examen (descanso). La decisión de febrero decide qué vuelve a la franja 04:15.

## Retro (rellenar en S12 desde `DATA/SYNAPSE/_vibecoding_ship.json`)

| S | Shipped (verify) | criterios_ok/total | Evidencia (commit/URL/test) | Lección |
|---|---|---|---|---|
| S1 | ☐ |  | | |
| S2 | ☐ |  | | |
| S3 | ☐ |  | | |
| S4 | ☐ |  | | |
| S5 | ☐ |  | | |
| S6 | ☐ |  | | |
| S7 | ☐ |  | | |
| S8 | ☐ |  | | |
| S9 | ☐ |  | | |
| S10 | ☐ |  | | |
| S11 | ☐ |  | | |
| S12 | ☐ |  | | |
