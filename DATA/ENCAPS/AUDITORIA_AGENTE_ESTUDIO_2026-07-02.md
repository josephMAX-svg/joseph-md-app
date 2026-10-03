# 🔍 AUDITORÍA CONSOLIDADA — APEX / agente_estudio
> Fable 5 (código) + Sonnet (inventario) · 02-jul-2026 · 6 auditorías + síntesis · **solo lectura, nada modificado.** 7 agentes, ~890k tokens, 178 tool calls.

## 1. VEREDICTO
Sistema **estructuralmente sano y en producción, pero NO al 100%.** Los 8 daemons corren, el pipeline Ctrl+Shift+A → n8n → 4 destinos está bien cableado, y **Telegram SÍ envía** (verificado en logs: APEX 18:00 + ENCAPS 18:05 del 01-jul con "Telegram=OK"). Pero hay **3 roturas silenciosas** + **1 seguridad P0 sin aplicar**.

| Subsistema | Estado |
|--|--|
| Flask :3000 | 🟡 vivo; cola offline pierde imagen; /reports/week inconsistente |
| n8n :5678 (APEX-MOTOR-FLOW-V2) | 🟢 activo, webhook OK; JSON de flow en disco OBSOLETO (landmine) |
| **Parser** | 🔴 **trunca campos multilínea silenciosamente** |
| Anki :8765 | 🟢 OK (cards de 1 línea; largas truncadas por el parser) |
| **Obsidian** | 🔴 **ignora `caso_clinico`/`fisio_expandida` + truncación → notas casi vacías** |
| Notion | 🟢 OK, 0 pendientes |
| Supabase | 🟡 inserts OK; doble insert madre; cleanup roto 2 meses; **seguridad P0 sin aplicar** |
| Telegram | 🟡 envía (18:00/18:05); faltan 07:15/12:10/17:25; números del plan VIEJO |

## 2. BUGS P0 (rompen envío o pierden contenido)
- **P0-1 · Scheduler** (`orquestador.py:291-296`): los reportes 07:15/12:10/17:25 **nunca disparan**; el de 19:00 dispara **4×** (112 duplicados). Fix: una cadena `schedule` por job dentro de doble loop día/hora.
- **P0-2 · Parser trunca multilínea** (`node_parsear_tarjeta_v2_3.js:27` y `n8n_parser_v2_3.js:56`): regex `.+?` con `$`/flag `m` corta todo campo a su **primera línea**. REVERSO, CASO_CLINICO (4-8 líneas), FISIO_EXPANDIDA pierden todo salvo la línea 1. Fix: lookahead `(?=\n[A-Z_]+:|\n═|(?![\s\S]))` en ambos + redeploy.
- **P0-3 · Nota Obsidian ignora los campos expandidos** (`node_crear_nota_v2_3.js:112-119`): para `::OBSIDIAN` el cuerpo queda casi vacío. Fix: renderizar `caso_clinico`/`fisio_expandida`.
- **P0-4 · Cleanup en loop de fallo desde 07-may** (`apex_pending_cleanup.py:~71-74`): timestamp con `+` sin URL-encodear → Supabase 400 cada 15s, **179.948 warnings, log 36.7 MB**. Fix: URL-encode + truncar log.

## 3. P1 (inconsistencias)
- **P1-2 · DRIFT DE PLAN:** configs dicen D/71, examen **10-ago**, `d1=2026-06-10`. El plan vigente es **D1=02-jul, examen 20-ago** → los reportes ENCAPS de Telegram **mienten**. (`encaps_telegram_daemon.py:102/205/220/256-271` + `config/fases.json` + `ENCAPS/config/encaps_config.json`).
- P1-1 cola offline pierde imagen · P1-3 doble insert concepto_madre · P1-4 /reports/week double-count latente · P1-5 `n8n_flow_4_destinos.json` obsoleto y peligroso si se re-importa · P1-6 T1/T2/T3 Palmerton nunca se transportan (0 filas) · P1-7 parser de tests divergente (11 passed que no cubren P0-2/P0-3).

## 4. 🔴 SEGURIDAD (crítico)
- **La auditoría Supabase del 13-may quedó ESCRITA pero JAMÁS EJECUTADA (7 semanas).** Verificado hoy en vivo: `datos_tesis` (**55 filas de datos clínicos de menores 14-18 años**) y `kappa_piloto` con **RLS OFF**; anon con **28 grants incl. DELETE sobre apex_blocks**; 4 views como owner; `chat_logs`/`agent_skills` sin RLS.
- La **anon key está hardcodeada en `joseph-md-app` (repo con remoto GitHub)** → con RLS off, equivale a lectura+borrado público de todo, incluidos datos de menores.
- 5 secretos en claro (Telegram, n8n, Supabase, Google client_secret + refresh_token) + tokens inline en `.claude/settings.local.json`.
- **Acción:** ejecutar `SECURITY_AUDIT_PHASE_A_C.sql` (transaccional, idempotente, rollback, <1 min) → rotar token Telegram + key n8n → limpiar settings.local.json → `.gitignore` en agente_estudio (hoy NO es repo git, sin barrera).

## 5. DEDUP ENCAPS — complementarios, NO duplicados
- **A** (`agente_estudio\ENCAPS`) = materia prima (285 MB, 105 PDF fuente). **B** (`joseph-md-app\DATA\ENCAPS`) = inteligencia derivada (3.1 MB, versionada). Solo **1 archivo idéntico cross-árbol** (`Horario_Asincronico_Theomed...pdf`).
- Plan de archivo reversible (mover a `_OBSOLETOS`/`_DUPLICADOS`, nunca borrar): ULTIMO CALENDARIO v7, .lnk rotos, compendios 2026-I de López, zip ya extraído, 14 PPT QXMEDIC=THEOMED idénticos, 5 claves EXAMENES=TIO LOPEZ. **B no requiere nada.**

## 6. ARQUITECTURA — NO anidar (confirmado)
Mantener `agente_estudio` y `joseph-md-app` como **vecinos separados**. Razones: (1) secretos → un `git add .` los publica en el remoto; (2) Vercel desplegaría el runtime Python + log 36MB + configs (riesgo de servir `config/*.json`); (3) ciclos de vida incompatibles (app versionada vs runtime vivo con colas/logs); (4) cero beneficio (se hablan por HTTP + Supabase, no por filesystem). Opcional a futuro: agente_estudio como su propio repo privado con `.gitignore` estricto.

## 7. TOP 5 ACCIONES
1. **Ejecutar `SECURITY_AUDIT_PHASE_A_C.sql`** (sella datos de menores) + rotar Telegram/n8n + limpiar settings.local.json.
2. **Fix scheduler** (P0-1) — restaura 3 reportes, mata el cuádruple.
3. **Fix parser + nota Obsidian** (P0-2/P0-3) + redeploy + test multilínea — restaura la fidelidad de TODO el contenido.
4. **Fix cleanup** (P0-4) + truncar log 36MB + marcar `n8n_flow_4_destinos.json` como `_DEPRECATED_`.
5. **Sincronizar plan vigente** (D1=02-jul, examen 20-ago) en los 3 configs + literales.

> **Nota del auditor:** el hallazgo operativo mayor no es un bug — es que el pipeline **no recibe un bloque desde el 06-may**. Con D1 del loop siendo HOY, arreglar los P0 esta semana importa porque el sistema vuelve a usarse.

---

## 8. ESTADO 05-sep-2026 — P0-2 y P0-3 CORREGIDOS EN DISCO (n8n SIN redesplegar)
> Contexto: régimen **v5.18 (D1 = lun 5-oct-2026; tampoco se estudiaron el jue 1 ni el vie 2-oct, decimoséptimo corrimiento 31-ago→5-oct, 25 hábiles; corrimiento RÍGIDO — solo corren los días, ningún tema se toca; el Step 1 termina el mié 17-feb-2027 = D95 = último día del plan y D-1 real, su D94 mar 16-feb es la última sesión de banco, sin finde entre D94 y D95, y el examen pasa al jue 18-feb-2027; v5.17: D1 jue 1-oct, D95 lun 15-feb, examen mar 16-feb)** apoya 95 días de Step 1 en "≤10 tarjetas de MECANISMO/día + APEX" — exactamente el contenido multilínea que el parser perdía. Verificado el 05-sep que los 3 ficheros seguían con mtime 07-may y el bug intacto; corregidos entonces. Vibecoding arranca con el **START lun 5-oct-2026** (S1 = lun 5 → vie 9-oct, SHIP sáb 10-oct, leído de `vibecodingPlan.ts` el 3-oct; en v5.17 era jue 1 → mié 7-oct con SHIP sáb 10-oct, en v5.16 lun 28-sep → vie 2-oct con SHIP sáb 3-oct, en v5.15 arrancaba el mié 23-sep, en v5.14 lun 21 → vie 25-sep con SHIP sáb 26, en v5.13 jue 17 → mié 23, en v5.12 mié 16 → mar 22, en v5.11 mar 15 → lun 21, mismo SHIP; en v5.10 lun 14 → vie 18, SHIP sáb 19) = validar esto en vivo.

| Ítem | Estado | Detalle |
|--|--|--|
| **P0-2 parser trunca multilínea** | ✅ **corregido en disco** | `scripts/node_parsear_tarjeta_v2_3.js` (nodo n8n) y `scripts/n8n_parser_v2_3.js` (local): `extract()` pasa de `(.+?)(?=\n[A-Z_]+:\|\n═\|$)` con flag `m` (= fin de CADA línea) a `[ \t]*(.*?)(?=\n[A-Z_]+:\|\n═\|(?![\s\S]))` (= fin REAL del input). Extras: `\r\n` normalizado (pyperclip en Windows), campo vacío ya no se come el label siguiente, valor vacío → `def`. |
| **P0-3 nota Obsidian ignora `caso_clinico`/`fisio_expandida`** | ✅ **corregido en disco** | `scripts/node_crear_nota_v2_3.js`: nueva función pura `renderNotaCuerpo()` (marcadores `RENDER_NOTA_BEGIN/END`): título = TITULO o FRENTE · `## Caso clínico fuente` y `## Fisiopatología expandida` íntegros (multilínea) · Reverso solo si no es copia del caso · CCSN solo con contenido · etiquetas EN para USMLE. |
| **P1-7 parsers divergentes** | 🟡 **parcial** | El parser local **no emitía** `titulo_obsidian`/`caso_clinico`/`fisio_expandida` (el nodo n8n sí) → añadidos al `return` para paridad. Siguen divergiendo (fuera de alcance hoy): ruta Obsidian ENCAPS sin carpeta de subtema en el local (v2.4 rule 19 solo en el nodo), `fecha_iso` UTC (local) vs Lima (nodo), sin `attachImageToItem` en el local. |
| **Test multilínea** | ✅ `scripts/test_parser_multilinea.js` — **13/13 passed** | Carga los 3 ficheros REALES (no réplicas): `require` del local, `new Function` del nodo hasta `$input.all()`, y la función de render por marcadores. Fichas APEX multilínea reales (::OBSIDIAN ENCAPS bartonelosis 5+3+2 líneas · ::ANKI USMLE estenosis aórtica/Valsalva 3+2 líneas · legacy MIR sin cierre · formato secciones ═══ · doble bloque · CRLF · campo vacío · CONCEPTO_MADRE · test de regresión que demuestra que el regex viejo truncaba). `node D:\agente_estudio\scripts\test_parser_multilinea.js` → exit 1 si falla. |
| **Suites antiguas** (`_ARCHIVO_DESARROLLO/test_parser_v2_3.js`, `_concepto_madre`, `_v2_4_combined`, `_v2_4_multi`, `test_obsidian_routing_v2_3.js`) | ✅ siguen pasando contra el parser corregido (ejecutadas 05-sep con resolución de `require` redirigida a `scripts/`) | Ninguna cubría P0-2/P0-3: por eso "11 passed" convivía con el bug. |
| **Redeploy n8n (APEX-MOTOR-FLOW-V2)** | ⏳ **PENDIENTE (Joseph)** | El workflow vivo en :5678 sigue con el código del 07-may. Redesplegar con `python D:\agente_estudio\scripts\_ARCHIVO_DESARROLLO\update_n8n_workflow_v2_3.py` (lee `SCRIPTS = D:\agente_estudio\scripts` y hace PUT de `apex-node-002` = parser y `apex-node-005` = crear nota; usa `config/n8n_config.json`). Antes: n8n arriba, exportar backup del workflow desde la UI. Después: enviar 1 APEX ::OBSIDIAN de prueba (p. ej. la ficha del test) con Ctrl+Shift+A y comprobar que la nota en `01_USMLE\...\APEX_creados\` y la card en Anki llegan íntegras. |
| Regla de formato para los chats tutores | 📌 | Un campo `LABEL:` puede ocupar varias líneas; termina en la siguiente línea que empieza con `OTRO_LABEL:` (mayúsculas + dos puntos), en una línea `═` o al final. **Una línea de continuación no debe empezar con MAYÚSCULAS seguidas de `:`** (p. ej. `NTS:` o `DDX:`) porque se interpreta como label nuevo — escribir `Nts:`/`Diferencial:`. |

Sin cambios hoy: P0-1 (scheduler), P0-4 (cleanup loop), P1-2 (drift de plan — ahora el plan vigente es **v5.18, D1 = lun 5-oct-2026** (3-oct-2026), Step 1 principal con examen target jue 18-feb-2027; `config/fases.json` seguía (último dato registrado aquí, no releído el 3-oct) con `FASE_4.is_current_phase=true` y `FASE_7.inicio=2026-10-01`, mientras `CLAUDE.md` ya dice FASE_7 desde el 7-sep — al alinearlo, `FASE_7.inicio` debe ser `2026-10-05` (= D1 v5.18; en v5.17 era `2026-10-01`, en v5.16 `2026-09-28`), lo hace Joseph fuera del repo; y el drift ya no es solo de reportes: ver §9), seguridad §4 (**sigue abierta**: `datos_tesis` RLS OFF + anon key en repo).

---

## 9. NOTA 30-sep-2026 — la tarea `ENCAPS_v9_daily_0400` de agente_estudio PISÓ Supabase (hazard cerrado: tarea desactivada el 30-sep con permiso de Joseph)
> Contexto: régimen **v5.18** desde el 3-oct (D1 = lun 5-oct-2026; ENCAPS mantenimiento 92 días `2026-10-05 → 2027-02-12`, régimen `MANTENIMIENTO_2027-1 v6.16`, backup `study_schedule_bk_1003`; cuando se escribió esta nota regía v5.17: `2026-10-01 → 2027-02-10`, v6.15, `bk_0930`). Es la consecuencia práctica del P1-2 (drift de plan) de §3: el runtime de `D:\agente_estudio` sigue ejecutando el **plan v9 viejo** y, además de mandar reportes con números falsos, **escribe en la misma base que lee la app**.

| Ítem | Estado | Detalle |
|--|--|--|
| **Qué pasó** | 🔴 **pisada real (27-sep)** | La tarea programada de Windows **`ENCAPS_v9_daily_0400`** (04:00 diaria) corre `D:/agente_estudio/ENCAPS/scripts/run_daily.bat` → `daily_update.py` → `encaps_supabase_sync.py`, que hace *upsert* en `study_schedule` (`on_conflict examen,dia`) y en `study_metrics` con el plan v9. **El 27-sep sobrescribió los días 1-71 de ENCAPS y `study_metrics`** (incluido su `extra`) con ese plan viejo. |
| **Limpieza** | ✅ **30-sep** | Se limpió lo pisado y se re-sembró v5.17 (92 filas `MANTENIMIENTO` jue 1-oct → mié 10-feb, backup `study_schedule_bk_0930`, **verificado**) y se restauró `study_metrics.extra` (`d1 = 2026-10-01`, `dias_ciclo = 92`). |
| **Riesgo vigente** | ✅ **cerrado (30-sep)** | Con la tarea desactivada ya no hay escrituras de madrugada. Por qué importaba: la app (`encapsPlan.ts` → `regimenDe()`) lee `study_metrics.extra.d1` / `dias_ciclo` y las filas de `study_schedule`, así que una pisada cambia lo que Joseph ve en «Hoy» sin tocar el repo. Si alguna vez se reactiva o se sospecha otra pisada: comprobar **92 filas `MANTENIMIENTO` `2026-10-05 → 2027-02-12`** y **`study_metrics.extra.d1 = 2026-10-05`** (v5.18; con v5.17 eran `2026-10-01 → 2027-02-10` / `2026-10-01`). |
| **Acción (decisión de Joseph, fuera del repo)** | ✅ **hecha (30-sep)** | Opción (a) con permiso de Joseph: `schtasks /change /tn "ENCAPS_v9_daily_0400" /disable` → Estado: Deshabilitado (se reactiva con `/enable`; no reactivar). La opción (b) —quitar la llamada `run_parent("encaps_supabase_sync.py")` de `daily_update.py`— no se aplicó (`DATA/PENDIENTES_JOSEPH.md`: ítem 🔴 y fila ⚪ P resueltos; `DATA/REESTRUCTURACION_31AGO_2026.md` §20.7). |
| **Relación con esta auditoría** | 📌 | Agrava el **P1-2** (§3): ya no son solo reportes de Telegram con el plan viejo, sino escrituras en Supabase. Refuerza la regla de §6 (NO anidar `agente_estudio` en `joseph-md-app`) y la acción 5 de §7 (sincronizar el plan vigente en los configs de agente_estudio, hoy v5.18 con D1 = 2026-10-05) — o, más simple, apagar la sincronización ENCAPS de ese runtime. |
