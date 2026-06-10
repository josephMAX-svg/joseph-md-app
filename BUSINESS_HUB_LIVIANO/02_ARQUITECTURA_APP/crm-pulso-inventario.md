# Inventario de `CRM_PULSO_v3.1` — qué existe y qué migrar

> Fuente: exploración del repo real `D:\CRM_PULSO_v3.1` (incl. `06_REPOS_DESTINO\pulso-crm`).
> Propósito: dar al hub de empresa (en `joseph-md-app`) el catálogo de links, branding, modelo de datos y datos de negocio reales de Pulso/Liviano.

---

## 1. Modelo de negocio

- **Pulso CRM v3.1**: plataforma multi-tenant SaaS de salud (arquitectura "core + verticales", estilo Epic/Salesforce Health Cloud). Founder: Dr. Joseph Soto Tocas. Base: Junín, Perú.
- **PIRQA** — primer tenant real (no clínico): pachamanca en Huáchac, Junín. WhatsApp +51 934 173 914, pago Yape/Plin, flujo automático WhatsApp→OCR→comprobante. **En producción** (Vercel).
- **LIVIANO** — línea pérdida de peso / GLP-1 (vertical V-NUTRITION, telesalud). Suscripción **S/1,200/mes (mínimo 3 meses)** + medicamento magistral. Bonos: Cocina Liviana, Movimiento 15, Escudo Liviano, Blindaje Anti-Rebote, Círculo Liviano. Portal médico + portal paciente hiper-personalizado. Doc maestra: `LIVIANO_Oferta_Maestra.docx`.
- **Dermatología Sánchez** — tenant demo (V-DERMA), 847 pacientes seed.

---

## 2. Design system de Pulso (`02_DESIGN_SYSTEM/`)

| Elemento | Valor | Uso |
|---|---|---|
| Crema principal | `#F4F1EA` / `#FBF9F4` | Fondos, espacios negativos |
| Navy oscuro | `#0E0F11` | Admin dark (Pulso core) |
| Navy suave | `#16181C` | Variantes, bordes |
| Oro/Latón | `#C6A56B` | Acentos, tags, dividers |
| Terracota PIRQA | `#C45C3F` | Logo/hero/accent PIRQA |
| Salvia (Liviano) | `#56624B` / `#3C4636` | Portal paciente Liviano |
| Serif display | Fraunces / Newsreader | Titulares |
| Serif/sans cuerpo | Hanken Grotesk / Inter | Body, UI |
| Mono | IBM Plex Mono / JetBrains Mono | Números, datos |

- **Admin (CRM)**: fondo `#0E0F11`, estilo Linear/Vercel (denso, técnico).
- **Portal paciente Liviano**: fondo microcemento `#F4F1EA`, tinta `#2A2620`, salvia + latón, cálido premium-clínico.
- Archivos: `paleta_colores.css`, `tipografia.md`, `componentes_shadcn.md`, `densidad_y_layout.md`.

---

## 3. Modelo de datos (`03_MODELO_DATOS/`) — 62 tablas FHIR R4

- **13 core**: `tenants`, `usuarios`, `tenant_usuarios`, `sedes`, `personas`, `reservas`, `mensajes`, `conversaciones`, `plantillas_mensaje`, `flujos`, `flujo_nodos`, `flujo_ejecuciones`, `archivos_paciente`.
- **49 FHIR**: clínicas (`diagnosticos`, `notas_soap`, `recetas`, `procedimientos`, `planes_tratamiento`…), `consentimientos`, `inmunizaciones`, seguros, inventario (`productos`, `lotes_producto`, `movimientos_inventario`), facturación (`facturas`, `pagos`, `comprobantes`), verticales (derma, dental, vet, medspa), `magic_links`, `audit_log`, `formularios`.
- Migraciones SQL: `001`–`022` (core, RLS, triggers, seeds, CAPI, PIRQA, **`011_liviano_domain.sql`**, `012_seed_liviano.sql`).
- Mapeo FHIR 1:1: `personas`→Patient, `reservas`→Appointment, `diagnosticos`→Condition, `recetas`→MedicationRequest, etc.

---

## 4. CATÁLOGO COMPLETO DE LINKS (crítico para el hub)

Dominio prod: `https://pulso-crm.vercel.app`

### Públicas (marketing, sin auth)
`/inicio` · `/programa` · `/precios` · `/clinicas` · `/evaluacion` · `/reservar` · `/mapa`
`/gratis` · `/gratis/plan-semana` · `/gratis/proteina` · `/gratis/no-shows`

### Auth
`/login` · `/api/auth/callback`

### CRM autenticado (`(app)`)
`/hoy` · `/agenda` · `/agenda/[id]` · `/pacientes` · `/pacientes/[id]` · `/mensajes` · `/flujos` · `/flujos/[id]/editor` · `/inventario` · `/facturacion` · `/pipeline` · `/plan-tratamiento` · `/encounter` · `/campanas` · `/marketing` · `/resenas` · `/referidos` · `/configuracion`
**Subportal LIVIANO:** `/liviano` · `/liviano/paciente/[id]` · `/liviano/agente` · `/liviano/bandeja` · `/liviano/bonos` · `/liviano/catalogo` · `/liviano/conocimiento`

### Portales por magic-link
**Paciente** `/p/[token]`: `/` · `/ejercicio` · `/comida` · `/bioimpedancia` · `/chat` · `/perfil`
**Médico/admin** `/m/[token]`: `/` · `/pacientes` · `/pacientes/nuevo` · `/agente` · `/campanas` · `/contenido` · `/anuncios` · `/conversaciones` · `/creditos` · `/negocio`

### Webhooks / API
`/api/webhook/whatsapp` · `/api/webhook/whatsapp-cloud` · `/api/webhook/whatsapp-in` · `/api/webhook/pago` · `/api/webhook/meta-lead` · `/api/ocr` · `/api/comprobante/[id]` · `/api/tenant/switch` · `/api/meta/sync-spend`

### WhatsApp
`https://wa.me/51934173914?text=...` (PIRQA). Links que envía el bot: portal `/p/[token]`, evaluación `/evaluacion?ref=[LEAD_ID]`, reserva `/reservar?lead=[LEAD_ID]`.

**Magic links**: tabla `magic_links` (token 32 bytes base64url), generados en `src/lib/portal/doctor-data.ts`. Registro central de links: `src/lib/marketing/links.ts`.

---

## 5. Integraciones (solo nombres de env vars — sin valores)

- **Supabase**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- **Anthropic**: `ANTHROPIC_API_KEY`.
- **Google Vision (OCR)**: `GOOGLE_APPLICATION_CREDENTIALS`.
- **WhatsApp Baileys**: `BAILEYS_WEBHOOK_SECRET`, `WHATSAPP_SERVICE_URL`.
- **WhatsApp Cloud API**: `WHATSAPP_TRANSPORT`, `META_PHONE_NUMBER_ID`, `META_WABA_ID`, `META_GRAPH_TOKEN`, `META_VERIFY_TOKEN`, `META_APP_SECRET`, `META_TEST_EVENT_CODE`.
- **Meta CAPI**: `META_CAPI_TOKEN`, `META_DATASET_ID`.
- **Meta Marketing API**: `META_AD_ACCOUNT_ID`.
- **Internos**: `WEBHOOK_SECRET`, `WHATSAPP_SERVICE_SECRET`.

---

## 6. Flujos pre-armados (`04_FLUJOS_PRE_ARMADOS/`)

| Archivo | Tenant | Propósito | Estado |
|---|---|---|---|
| `flujo_pachamanca_reserva.json` | PIRQA | Lead→reserva→pago→confirmación | Producción |
| `flujo_onboarding_paciente_nuevo.json` | LIVIANO | Bienvenida + evaluación | Listo |
| `flujo_reactivacion_paciente_inactivo.json` | LIVIANO | 60d+ → reenganche | Listo |
| `flujo_recordatorio_vacunas...json` | PEDIATRIC/VET | Recordatorio anual | Plantilla |
| `flujo_alertas_inventario_critico.json` | Core | Stock bajo | Plantilla |

Motor: `src/lib/flows/engine.ts`, canvas con `reactflow`. 9 tipos de nodo (trigger, send_message, smart_delay, condition, action, ai_action, go_to_flow, http_request, end).

---

## 7. Repos destino (`06_REPOS_DESTINO/`)

- **`pulso-crm`** — Next.js 14 App Router + Supabase + Tailwind/shadcn. ~15K líneas TS. Estructura `(public)`/`(auth)`/`(app)`/`(portal)`/`api`.
- **`pulso-intelligence`** — FastAPI/Python (agente IA, RAG). Parcial.
- **`pulso-whatsapp-service`** — Node/Express + Baileys en Railway.

---

## 8. Qué migrar al hub (y qué NO es copy-paste)

> ⚠️ **El CRM es Next.js/React-DOM; el hub es Expo/React-Native-Web.** Los componentes `.tsx` del CRM (Sidebar, FlowCanvas, tablas shadcn) **no se pegan tal cual** en el hub. Lo que migra bien es **datos + tokens + estructura**, no JSX de DOM.

**Directamente migrable al hub (alto valor):**
1. **Catálogo de links/sitemap** → para que el hub enlace a las páginas reales del CRM (sección "Web & Diseño").
2. **Design tokens Pulso/Liviano** (colores, fuentes) → como datos de referencia en el hub.
3. **Datos de negocio Liviano** (oferta, precio, bonos, métricas, subsecciones) → para poblar `empresaData.ts`.
4. **Resumen del modelo de datos** (qué entidades existen) → sección informativa.

**Reutilizable solo si en el futuro se reescribe el CRM en el mismo stack (referencia, no para el hub):**
- `src/lib/supabase/*`, `src/lib/flows/engine.ts`, `src/lib/tenant-config.ts`, patrón de magic-links, abstracción WhatsApp, pipeline OCR Yape/Plin.

→ Ver `03_CODIGO_PARA_MIGRAR/` para los artefactos listos para pegar en el hub.
