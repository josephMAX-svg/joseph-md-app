# EVALUACIÓN ESTRUCTURA LOCAL — D:\CRM_PULSO_v3.1
> Análisis de solo-lectura (2026-06-11). Nada fue modificado. Fuentes: README.md, PROMPT_CLAUDE_CODE_v3.3_PIRQA_LAUNCH.md, PROMPT-PIRQA-CAPI-Y-METRICAS.md, ACTIVAR-COEXISTENCIA-Y-CAPI.md, 00_BRIEF_PRINCIPAL/, 03_MODELO_DATOS/, 04_FLUJOS_PRE_ARMADOS/, 06_REPOS_DESTINO/, BUSINESS_HUB_LIVIANO/, pirqa/.

---

## 1. ESTRUCTURA GENERAL DEL CRM

### 1.1 Qué es
**Pulso** = CRM/EHR SaaS **multi-tenant** para sector salud (arquitectura "core + módulos verticales" estilo Epic), que hoy opera con 2 líneas reales no-médicas como validación: **PIRQA** (restaurante pachamanca + cuy, Huáchac, Junín) y **LIVIANO** (línea peso/GLP-1). Tenant demo: **Dermatología Sánchez** (V-DERMA, futura práctica de Joseph post-SERUMS 2027). Visión: SaaS B2B médico LATAM 2030, USA 2034.

### 1.2 Stack técnico (README + prompt v3.3)
- **Frontend:** Next.js 14 App Router + TypeScript estricto + Tailwind + shadcn/ui + reactflow (flow builder) + zustand + recharts
- **Backend:** Supabase (Postgres + RLS multi-tenant + Auth magic link/Google + Storage + Realtime + Edge Functions). Proyecto prod São Paulo `lhpkwfhbqxylkazfrkfb`
- **WhatsApp:** Baileys self-hosted en Railway (transición a **Cloud API por Coexistencia**, conmutado por env `WHATSAPP_TRANSPORT=cloud`)
- **OCR:** Google Vision API (comprobantes Yape/Plin peruanos)
- **IA:** Anthropic Claude (nodo `ai_action`, default Haiku) — nota: `pirqa-conversation.ts` también importa `geminiJSON` de `@/lib/ai/gemini`
- **Deploy:** Vercel (`pulso-crm.vercel.app`) + Railway (whatsapp-service)

### 1.3 Carpetas del paquete
```
CRM_PULSO_v3.1/
├── 00_BRIEF_PRINCIPAL/        INICIO_RAPIDO, _ADDENDUM_v3.1 (38 módulos+FHIR),
│                              _ADDENDUM_DISEÑO_v2, REGLAS_DE_TRABAJO,
│                              PLAN_5_HORAS_AUTONOMO, PROMPT_CLAUDE_CODE_PULSO_CRM (55KB)
├── 01_REFERENCIAS_VISUALES/   17 SVG mockups + research 40+ plataformas
├── 02_DESIGN_SYSTEM/          paleta cream/navy/gold, tipografía, shadcn, densidad
├── 03_MODELO_DATOS/           001→022 SQL (ver §1.5)
├── 04_FLUJOS_PRE_ARMADOS/     5 flujos JSON (DSL) + README del DSL
├── 05_VARIABLES_ENTORNO/      credenciales_a_obtener.md
├── 06_REPOS_DESTINO/          pulso-crm (Next.js)、pulso-intelligence (Python/Railway),
│                              pulso-whatsapp-service (Baileys/Railway)
├── 07_LOGS_Y_OUTPUTS/
├── BUSINESS_HUB_LIVIANO/      paquete hand-off al hub Business de joseph-md-app (COMPLETO)
├── pirqa/                     assets brand (logo 500, covers desktop/mobile)
├── PROMPT_CLAUDE_CODE_v3.3_PIRQA_LAUNCH.md  (63KB, prompt maestro de lanzamiento)
├── PROMPT-PIRQA-CAPI-Y-METRICAS.md           (prompt CAPI/atribución)
├── ACTIVAR-COEXISTENCIA-Y-CAPI.md            (runbook manual de activación)
├── PROMPT_CLAUDE_CODE_LIVIANO_v1.md · PROMPT_AUTONOMO_4_HORAS.md
└── LIVIANO_Oferta_Maestra.docx · qr-view.html · pirqa-qr.png
```

### 1.4 Repos destino (lo que YA existe construido)
**`06_REPOS_DESTINO/pulso-crm/src/app/(app)/`** — rutas: `hoy, agenda, pacientes, reservas, mensajes, flujos, pipeline, facturacion, inventario, referidos, resenas, campanas, marketing, encounter, plan-tratamiento, liviano, plataforma, configuracion`.
**`api/`**: `webhook/{whatsapp, whatsapp-in, whatsapp-cloud, pago}`, `ocr`, `comprobante`, `comprobante-pago`, `meta`, `cron`, `tenant`.
**`src/lib/`**: `flows/pirqa-conversation.ts` (máquina de estados real del bot), `meta/capi.ts` + `meta/marketing-api.ts`, `ocr/` (parser-yape-plin + validación), `pagos/`, `plantillas.ts`, `whatsapp/provider.ts` (abstracción Baileys|Cloud API), `tenants/`, `brand/`, `fhir/`, `lines/`, `agent/`, `ai/`.
También: `pulso-intelligence` (Python, Dockerfile/Procfile/railway.json) y `pulso-whatsapp-service` (TS, Dockerfile, railway.toml).

### 1.5 Modelo de datos (03_MODELO_DATOS, en orden de migración)
- **001_schema.sql — 13 tablas core:** `tenants` (config JSONB con carta/faq/pagos; vertical: gastronomia|salud|infoproductos|dermocosmetica|servicios), `users_tenants` (roles owner/admin/staff/viewer), `contactos` (UNIQUE tenant+telefono_e164, custom_fields JSONB), `tags`, `contacto_tags`, `conversaciones` (canal whatsapp/sms/email/instagram/webchat), `mensajes`, `reservas` (fecha+turno+personas, monto_total/pagado/saldo GENERATED, estado pendiente→confirmada→asistio/no_show/cancelada, captura_url + ocr_status + ocr_data), `plantillas` (slug+cuerpo con {{variables}}+variables[]), `flows` (definition JSONB DSL), `flow_executions` (current_node_id, context JSONB, next_action_at), `eventos_sistema` (event bus que dispara flows), `whatsapp_sessions`, `configuracion_tenant` (key-value). Vista materializada `dashboard_hoy` (refresh pg_cron 5 min).
- **002/003:** RLS multi-tenant (`current_user_tenants()` / `user_belongs_to_tenant()`) + triggers updated_at/audit.
- **005/006/007/008:** extensión v3.1 → +49 tablas FHIR-compatible (62 totales: notas_soap, recetas, planes_tratamiento, pipeline_leads, reviews, odontogramas, lesiones_cutaneas…), RLS, catálogo de 38 módulos, seed derma extendido.
- **009_capi_atribucion.sql (clave PIRQA):** ALTER `contactos` + `ctwa_clid, ad_id, adset_id, campaign_id, source, product_interest, first_msg_ts`; tabla `capi_events` (event_name Lead|Schedule|LeadQualified|Purchase, event_id UNIQUE(tenant,event_id) p/ dedupe, status pending|sent|failed|test, request/response JSONB); tabla `meta_ad_spend` (sync diario Marketing API: spend, impressions, clicks, conversaciones_iniciadas, cpl, breakdown edad/geo/placement; UNIQUE por grano fecha+ad/adset/campaign).
- **010_pirqa_cuy_y_fotos.sql:** data-only — agrega cuy a `tenants.config->carta` (jsonb_set idempotente), corrige FAQ. Tenant PIRQA = `a0000000-0000-4000-8000-000000000001`.
- **011–018, 021:** dominio LIVIANO (schema+seed+checkin v2+portal doctor+nutrición+channels publishing).
- **022_leads.sql:** tabla `leads` p/ lead magnets web (tipo paciente|medico, lead_magnet, payload JSONB de calculadora/quiz, estado nuevo→contactado→convertido→descartado). Aplicada a prod vía MCP 2026-06-06.
- **Patrón innegociable:** TODA tabla de negocio lleva `tenant_id UUID NOT NULL REFERENCES tenants ON DELETE CASCADE` + RLS con las 4 policies (`select/insert/update/delete using user_belongs_to_tenant`). service_role solo server-side.

### 1.6 Flujos pre-armados (04_FLUJOS_PRE_ARMADOS)
5 JSON con DSL común (`FlowDefinition{trigger{tipo: evento_sistema|cron|webhook}, pasos[], metricas_a_trackear[]}`; pasos tipo `enviar_mensaje|esperar|esperar_hasta|esperar_respuesta|decision|crear_tarea|enviar_email|actualizar_persona|query|notificacion_app|esperar_evento`):
1. `flujo_pachamanca_reserva` — confirmación + recordatorio 3h + post-evento SÍ/NO.
2. `flujo_onboarding_paciente_nuevo` — trigger `reserva.creada` si primera visita; intake → recordatorios 24h/2h → review Google.
3. `flujo_reactivacion_paciente_inactivo` — cron 10:00, ≥180 días, 3 ramas segmentadas, followup, marca inactivo.
4. `flujo_recordatorio_vacunas` — cron 08:00, T-30/T-15/T-7, certificado PDF post-aplicación.
5. `flujo_alertas_inventario_critico` — cron 07:00 sobre `vw_alertas_inventario`, tareas por severidad.
Cada flujo declara **métricas a trackear** (tasa respuesta, conversión, no-show, valor recuperado).

---

## 2. EL SISTEMA PIRQA DENTRO DEL CRM

### 2.1 Seguimiento de leads → reserva (pipeline end-to-end)
```
Anuncio Meta CTWA / web (wa.me) / orgánico
   → WhatsApp +51 934 173 914
   → Webhook (whatsapp-cloud con Coexistencia; whatsapp-in con Baileys)
   → PRIMER mensaje trae `referral` {ctwa_clid, source_id(ad), source_url, headline, body}
   → upsert `contactos` con atribución (ctwa_clid, ad_id, campaign_id, source, product_interest, first_msg_ts)
   → CAPI evento `Lead` a Meta (dataset 1623630512044277)
   → Bot (máquina de estados `pirqa-conversation.ts`, persistida en flow_executions.context):
       inicio → recolectando_datos → esperando_pago → confirmada
   → IA clasifica intención (RESERVA|PRECIO|HORARIO|MENU|UBICACION|OTRO) + extrae
     {nombre, fecha, hora_turno(5 turnos 11-15h), personas, tipo_plato(catálogo codes), carnes, notas}
   → crea `reservas` estado=pendiente_pago + calcula adelanto (S/15 indiv | S/45 familiar)
   → envía instrucciones Yape/Plin → cliente manda screenshot
   → OCR Google Vision (parser-yape-plin): valida confianza ≥0.85, monto, titular contiene
     "Soto Tocas", celular destino termina en 914, codigo_operacion ÚNICO (anti-fraude reuse)
   → reserva confirmada + comprobante PNG de lujo (1080×1350, @vercel/og/satori, sello "PAGO
     VERIFICADO") al cliente + aviso al grupo "PIRQA . Pagos" (no-op bajo cloud; pendiente decisión)
   → CAPI `Schedule`/`LeadQualified` (al dar fecha+personas) y `Purchase` (value=total, PEN) al verificar pago
   → recordatorios 24h / 2h antes + post-visita pidiendo review Google + tag IG
```

### 2.2 Respuestas automáticas (plantillas)
~20+ plantillas en BD (tabla `plantillas`, slug + cuerpo con `{{variables}}`): `saludo_general, horarios, ubicacion, precios_general, menu_pdf, cancelacion_politica, reservas_grupos, eventos_privados, opciones_dieta, delivery_info, metodos_pago, parking, mascotas, ninos, pedir_datos_faltantes, instrucciones_pago, pago_monto_incorrecto, pago_titular_incorrecto, pago_revision_manual, confirmacion_reserva, recordatorio_24h, recordatorio_2h, post_visita_review, reactivacion_60d`. Tono: "directo, peruano de sierra, cálido pero no pegajoso", sin emojis salvo confirmaciones críticas, sin "estimado/a". Fallbacks del bot: texto libre tras 1 repregunta → escalar a humano; intent "fotos" → web + foto; multi-producto pachamanca+cuy en el mismo flujo.

### 2.3 Coexistencia WhatsApp + CAPI (ACTIVAR-COEXISTENCIA-Y-CAPI.md)
- Código deployado y "dormido" detrás de env vars. `WHATSAPP_TRANSPORT=cloud` conmuta de Baileys a Cloud API.
- **Coexistencia:** el número sigue en el celular Y habilita webhooks oficiales (es lo que entrega `referral.ctwa_clid`). NO migrar el número fuera del cel.
- Env vars: `META_PHONE_NUMBER_ID, META_WABA_ID, META_GRAPH_TOKEN (system user: whatsapp_business_messaging+management+ads_read), META_CAPI_TOKEN, META_VERIFY_TOKEN, META_APP_SECRET, META_TEST_EVENT_CODE`.
- Webhook: `https://pulso-crm.vercel.app/api/webhook/whatsapp-cloud`, campo `messages`, firma HMAC-SHA256.
- CAPI: `POST graph.facebook.com/v21.0/{dataset}/events`, `action_source=business_messaging`, `messaging_channel=whatsapp`, user_data = {ctwa_clid sin hashear, page_id, waba_id, ph sha256}; dedupe con Pixel web por `event_id`; prueba con test_event_code → tabla `capi_events` status `test` → producción.
- Marketing API read-only → `meta_ad_spend` (botón "Sincronizar gasto" o cron `GET /api/meta/sync-spend?key=`) → dashboard CAC/ROAS/costo-por-venta reales.
- IDs PIRQA: Pixel/dataset `1623630512044277`, página FB `61590392518236`, IG `17841437527680861`, ad account `act_1011566678197801`, portfolio `28142705245319080`.

### 2.4 Tablas/flows que usa PIRQA
Tablas: `tenants(config: carta/faq/pagos/grupo_jid)`, `contactos(+atribución)`, `conversaciones`, `mensajes`, `reservas`, `plantillas`, `flows`, `flow_executions`, `eventos_sistema`, `pagos/comprobantes`, `capi_events`, `meta_ad_spend`, `whatsapp_sessions`, `gastos` (009 del repo v3.3).
Dashboard marketer (spec sección 5 del prompt CAPI): embudo Conversación→Cualificado→Pendiente→Pagada→Asistió→Recurrente con % de caída; velocidad de respuesta (<5 min); CPL/CAC/AOV/ROAS por campaña/adset/creativo/producto; geo/edad por distrito; mix producto; RFM/LTV/cohortes; % review Google; % bot vs humano; guardarraíl costo/plato > S/4.

---

## 3. FORMATO EXACTO DE LOS PROMPTS MAESTROS (para replicar)

### 3.1 Plantilla del prompt grande (estilo PROMPT_CLAUDE_CODE_v3.3, 63KB, secciones 0-18)
```
# PROMPT CLAUDE CODE vX.X — {PROYECTO} · {HITO + FECHA LÍMITE}
> Nota inicial a Claude Code: "este es tu único brief, leelo completo, no pidas confirmación,
  modo 100% autónomo salvo N excepciones de la Sección 1"

0. CONTEXTO — quién es el founder, qué se construye, "X en una frase" (analogía:
   HubSpot/ManyChat), visión a largo plazo con años, misión inmediata con DEADLINE
   exacto y diagrama ASCII del flujo end-to-end.
1. MODO DE OPERACIÓN — 100% autónomo + lista NUMERADA y cerrada de excepciones
   que requieren al humano (cuentas, tarjeta, QR, verificaciones). Todo lo demás:
   "decidís vos y documentás en DECISIONS.md". Protocolo BLOCKED.md. "Nunca esperás."
   Commits cada 20-30 min, push cada hora, prefijos feat:/fix:/refactor:.
2. INVESTIGACIÓN AUTORIZADA — permiso/obligación de investigar con URLs sugeridas
   (HubSpot, ManyChat, GHL, docs oficiales). Regla: "No alucines APIs. Verificá."
3. DATOS YA RECOGIDOS — NO PREGUNTAR, USAR — tablas Markdown con TODOS los datos
   duros: IDs Meta, teléfonos, precios, nombres EXACTOS (hasta "punto vs middle-dot"
   del nombre del grupo), coordenadas, horarios, carta completa con precios.
4. ASSETS — rutas exactas, comandos cp, paleta con hex en bloque TS exportable.
   "NO inventes ni generes con IA un logo aproximado."
5. STACK DEFINITIVO — árbol de dependencias + estructura de carpetas COMPLETA del
   monorepo (cada archivo nombrado con comentario de propósito).
6. ARQUITECTURA DE DATOS — modelo conceptual ASCII, tabla de migraciones en orden
   (cuáles existen / cuáles GENERAR), reglas RLS innegociables con SQL literal.
7-12. ESPECIFICACIONES POR MÓDULO — cada una con: tabla comparativa, schema TS
   literal, código de referencia copy-paste (funciones completas), prompts de IA
   ENTRE COMILLAS listos para usar, diagramas ASCII de flujo y de UI (layout del
   comprobante dibujado en caja ASCII), reglas duras numeradas (validación OCR,
   anti-baneo con límites cuantificados: 40 msg/h, 300/día, delay 2-8s random).
13. FASES DE EJECUCIÓN — orden estricto con tiempos estimados [Fase A · 60-90 min],
   tabla de pasos manuales del humano, y los mensajes LITERALES que Claude Code
   debe escribirle al founder ("PASO A.1.1 — Abrí https://... > Click ... > pegame
   las 3 keys").
14. CHECKLIST FINAL — checkboxes verificables antes de cerrar sesión.
15. NOTAS TÉCNICAS CRÍTICAS — numeradas: idioma (español Perú, UI neutra), timezone
   America/Lima, moneda PEN, security (service_role JAMÁS client-side, HMAC), perf,
   privacy, logs, reintentos con backoff, tests mínimos.
16. PROTOCOLO DE BLOQUEO — template literal de entrada en BLOCKED.md + ejemplo.
17. ENTREGABLES FINALES — RESUMEN_PARA_JOSEPH.md (template completo embebido),
   DECISIONS.md, LOG.md, BLOCKED.md.
18. ARRANQUE — qué hacer cuando el founder diga "vamos" (incluye el saludo sugerido).
## FIN DEL PROMPT. + estimación total de horas + "Vamos."
```

### 3.2 Plantilla del prompt mediano (estilo PROMPT-PIRQA-CAPI, ~9KB)
```
# 📋 PROMPT PARA {EL CHAT DESTINO}
*(Copiá/pegá... Es autónomo: ese chat NO conoce esta conversación.)*
— Rol en 1 línea ("Sos el desarrollador de Pulso...") + cliente + modelo de negocio.
— **Objetivo de este trabajo** en negrita, con el porqué económico (CAC alto).
## Estado actual (auditado en vivo el DD-mes-AAAA en URL) — bullets con números
   reales observados ("0 reservas", "37 conversaciones"), qué es demo vs real.
## IDs / datos — bloque denso de IDs literales.
## LO QUE HAY QUE CONSTRUIR — secciones numeradas ### 1)...### 7), cada una con
   payload JSON de ejemplo, reglas con negritas, y fallbacks.
## Criterios de aceptación — numerados y VERIFICABLES (qué se ve en qué pantalla).
## Restricciones — NO migrar número, hashear PII, datos del titular.
— Pie: *Generado por {chat origen} (fecha) tras auditar X. Doc hermano: Y.*
```

### 3.3 Rasgos de tono y nivel de detalle (comunes a todos)
- **Voseo rioplatense** al dirigirse a Claude ("decidís vos", "pausás", "buscá"), español peruano en los textos de negocio.
- **Cero ambigüedad:** todo dato que Claude podría inventar está dado (IDs, hex, precios, strings exactos); lo que NO debe inventar está prohibido explícitamente.
- **Autonomía por defecto + excepciones enumeradas y cerradas**; bloqueos van a archivo, nunca se espera.
- Código y prompts de IA **literales y completos** dentro del prompt (no descripciones).
- Criterios de aceptación observables + checklist final.
- Deadlines y duraciones por fase; entregables = 4 archivos doc estándar (RESUMEN/DECISIONS/LOG/BLOCKED).
- Runbooks manuales separados del prompt (ACTIVAR-*.md) con pasos clic-por-clic para el humano.

---

## 4. DÓNDE Y CÓMO ENCAJARÍAN "TERRENOS" Y "GOLDEN"

> No existe hoy ningún módulo "Terrenos" ni "Golden" en el CRM (grep: solo matches incidentales — "terreno" en docs de video/seed Liviano, "golden" en código no relacionado). Hay un activo relacionado en joseph-md-app: `DATA/BUSINESS/_scrape/catalogo_predios_huachac.txt`. Encajan de forma natural como **tenants nuevos (o líneas tipo `lines/`)** sobre el core existente, igual que PIRQA/LIVIANO.

### 4.1 Patrón de inserción (el mismo que PIRQA → LIVIANO)
1. **Tenant nuevo** en `tenants` (vertical `servicios`), `config` JSONB con catálogo (en vez de `carta`): lotes/terrenos u oferta Golden, FAQ, datos de pago.
2. **Migración SQL numerada** en `03_MODELO_DATOS/` (siguiente libre: `023_terrenos.sql`, `024_golden.sql`), idempotente (`IF NOT EXISTS`), con cabecera comentada estilo 009/010, RLS con las 4 policies estándar.
3. **Ruta UI** en `src/app/(app)/` (como `liviano/`): `terrenos/`, `golden/`.
4. **Seed** + plantillas de mensaje del tenant (estilo `013_plantillas_pirqa`).

### 4.2 Módulo "Terrenos" (venta/separación de lotes — ej. predios Huáchac)
- **Tablas nuevas:**
  - `terrenos` (tenant_id, codigo, ubicacion/distrito, area_m2, precio_total, precio_m2, estado `disponible|separado|vendido`, coordenadas, fotos JSONB, partida_registral, notas) — análogo a `productos`/carta.
  - `terreno_leads` o reuso de `contactos` + `pipeline_leads` (ya existe en extensión v3.1) con `custom_fields` {terreno_interes, presupuesto, financiamiento}.
  - Reuso de `reservas` (la entidad es genérica: contacto+fecha+monto_total/pagado+estado+OCR) para **separaciones con adelanto Yape verificado por el OCR existente** — mismo circuito PIRQA: pendiente_pago → OCR valida → confirmada.
  - Atribución: las columnas CTWA de `contactos` (009) sirven tal cual si se publicita por Meta; `capi_events` registra Lead/Purchase del terreno.
- **Vistas:** `vw_terrenos_disponibles`, `vw_embudo_terrenos` (lead→visita→separación→venta, calcado del embudo PIRQA), tarjeta en dashboard `hoy`.
- **Flujos** (tabla `flows`, DSL existente): "consulta de terreno" (trigger mensaje_recibido → ai_action clasifica intención PRECIO|UBICACION|VISITA|SEPARAR → plantillas), "agendar visita al lote" (reuso flujo de reserva + recordatorio 24h/2h), "seguimiento post-visita" (cron, estilo reactivación).
- **Plantillas:** `terreno_info`, `terreno_ubicacion_maps`, `terreno_precios`, `agendar_visita`, `instrucciones_separacion`, `separacion_confirmada`, `seguimiento_7d`.

### 4.3 Módulo "Golden" (seguimiento de leads + plantillas de respuesta)
- Si Golden = línea de negocio de captación: **tenant/línea nueva** con foco en inbox + pipeline, sin reservas necesariamente.
- **Tablas:** reusar `leads` (022) para captura web con `lead_magnet`+`payload`, `contactos`+atribución (009), `pipeline_leads` (v3.1) con etapas propias (`nuevo→contactado→interesado→negociacion→cerrado/descartado`); opcional `golden_seguimientos` (tenant_id, contacto_id, fecha_proximo_contacto, canal, resultado, notas) si se quiere cadencia de follow-up explícita — aunque el patrón canónico del CRM es modelarlo como **flow con smart_delay + crear_tarea**.
- **Plantillas de respuesta:** tabla `plantillas` tal cual (slug+cuerpo+{{variables}}+canal); sembrar set Golden vía `0XX_plantillas_golden.sql`; la UI `plantillas/` ya existe en el árbol del prompt v3.3.
- **Flujos:** primer-contacto auto (trigger mensaje_recibido → clasificar → plantilla), cadencia de seguimiento (smart_delay 3d → followup → marcar frío, calcado de `flujo_reactivacion`), escalación a humano tras 1 repregunta (regla PIRQA).
- **Vistas:** `vw_golden_pipeline` (conteo por etapa + tiempo en etapa), velocidad de respuesta (<5 min, métrica ya especificada para PIRQA).

### 4.4 Cómo pedirlo (formato recomendado)
Escribir un prompt mediano estilo PROMPT-PIRQA-CAPI: rol + objetivo económico, "Estado actual auditado", datos duros (catálogo de terrenos con precios reales, número WhatsApp, titular Yape), "LO QUE HAY QUE CONSTRUIR" numerado (migración 023/024, ruta UI, flows, plantillas, dashboard), criterios de aceptación verificables ("un lead CTWA crea contacto con ctwa_clid y una separación confirmada vía OCR aparece en /terrenos"), restricciones (no tocar PIRQA/LIVIANO, RLS en todas las tablas, idempotencia).

---

## 5. OBSERVACIONES FINALES
- El paquete es a la vez **spec** (briefs/SQL/flujos/SVG) y **código vivo** (06_REPOS_DESTINO con node_modules, deploys reales en Vercel/Railway/Supabase São Paulo). Las migraciones 009+ se aplican vía Supabase MCP y se conservan en archivo "para mantener repo y BD sincronizados" — convención a respetar.
- `BUSINESS_HUB_LIVIANO/` confirma el flujo de trabajo del dueño: investigar en paralelo → sintetizar → producir UN prompt autónomo para otro chat (`04_PROMPT_OTRO_CHAT/`). Terrenos/Golden deberían seguir ese mismo pipeline.
- Cuidado operativo: el bot lee `tenants.config` en vivo — orden deploy-código-antes-que-data (advertencia explícita en 010).
