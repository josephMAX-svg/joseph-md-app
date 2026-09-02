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
