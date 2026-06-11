# Cómo ENCENDER el motor 24/7 (de "diseño" a "corriendo solo mientras estudias")

> 💸 **¿Quieres correrlo GRATIS (sin VPS ni API de pago)?** → usa **[`DEPLOY_GRATIS.md`](DEPLOY_GRATIS.md)**:
> tu PC + Programador de tareas de Windows + APIs gratis + **Claude Max / Gemini-free** para redactar +
> Supabase free + Unpaywall legal. Coste adicional **$0**. (Este documento es la vía "VPS 24/7" opcional/avanzada.)

> **Estado honesto (jun-2026):** la **extracción ya funciona** — `discovery_engine.py` corrió en vivo
> y devolvió **666 papers únicos para SR-1** (incluido el ancla DeLorenzi 2014). Pero **todavía NO corre
> solo 24/7**: para que extraiga y redacte en automático *mientras estudias* falta **desplegar el backend**
> (un servidor encendido siempre + las keys + n8n + los workers). Esto no se puede "encender" desde la app
> web (que es solo el **panel de control**); requiere los pasos de abajo, que solo tú puedes ejecutar
> porque necesitan tus credenciales y un servidor.

## Qué está LISTO vs qué FALTA

| Pieza | Estado | Qué es |
|---|---|---|
| Extracción 5 fuentes (`discovery_engine.py`) | ✅ **funciona** (probado en vivo: SR-1 666, SR-2 562 únicos) | OpenAlex troncal + PubMed + Europe PMC + S2 → dedup |
| Cascada texto completo (`fulltext_cascade.py`) | ✅ **funciona** (Unpaywall resolvió el PDF de DeLorenzi 2014) | resolver OA por DOI |
| Citas por IA (`citation_verifier.py`) | ✅ **funciona** (DOI real→verified, falso→rejected) | gate Crossref/PubMed + CSL/Vancouver |
| Ensamblador Word (`docx_assembler.py`) | ✅ **funciona** (genera .docx OOXML válido, solo stdlib) | el "escribe en Word" |
| Orquestador + workers (`agentic_writer.py`) | ✅ código listo (modo PLAN sin key; redacta con ANTHROPIC_API_KEY) | un líder dirige; 1 agente/sección |
| Esquema Supabase research (`supabase_schema.sql`) | ✅ **APLICADO** en el proyecto (6 tablas + RLS + Realtime, sembrado) | papers/screening/citations/agent_tasks/state/manuscripts |
| App = panel de control + **consola en vivo** (Vercel) | ✅ desplegada · lee `research_agent_tasks` de Supabase | dashboard/consola/checkpoints |
| Workflow n8n (`n8n_workflow.json`) | ✅ importable (6 nodos) | falta **importarlo** en un n8n encendido |
| Orquestación 24/7 (VPS encendido + n8n + Ollama) | ❌ **falta el servidor** | el "corre solo mientras estudias" vive aquí |
| Telegram (aprobaciones móviles) | ❌ falta bot + chat_id | checkpoints HITL |

> **En una línea:** todo el **código del motor funciona y está probado en vivo**; el esquema Supabase ya
> está **aplicado**. Lo único que falta para el "24/7 autónomo" es un **servidor encendido** que corra
> `n8n_workflow.json` + Ollama (los pasos 1–5 de abajo). Yo puedo correr cualquier etapa aquí cuando me digas.

## Pasos para encenderlo (una vez)

1. **Keys gratuitas (~10 min):**
   - OpenAlex: crea cuenta → `openalex.org/settings/api` → copia la key (**obligatoria desde 13-feb-2026**).
   - NCBI (PubMed): cuenta NCBI → API key (sube 3→10 req/s).
   - Semantic Scholar: formulario `semanticscholar.org/product/api` (aprobación manual).
   - Claude API key (para los workers) — ya tienes Claude Max; para el motor se usa la API.
2. **Supabase:** ejecuta `supabase_schema.sql` en el proyecto `qacynpqdrorpuegsmtcy` (SQL editor). Crea las 6 tablas research sin tocar las de estudio.
3. **Servidor 24/7 (VPS Hetzner CX32, ~$8/mes):** instala Docker + n8n + Ollama (phi4-mini). Pon
   `WEBHOOK_URL=https://tu-dominio/` y `N8N_PROXY_HOPS=1` (si no, los callbacks de Telegram no reanudan).
   `GENERIC_TIMEZONE=America/Lima`.
4. **Workflow n8n (cron diario):**
   `Schedule Trigger (0 6 * * *)` → `Google Calendar events.list (q="investigación", singleEvents=true)` →
   IF hay bloque hoy → `Execute Command: python discovery_engine.py "<query SR activa>" --line SR-1 --out corpus.csv` →
   pre-screening Ollama (`/api/generate`, `format` JSON `{relevant:bool}`) → insert en `research_papers` →
   `Telegram "Send and Wait" [Aprobar]/[Descartar]`.
5. **Workers de redacción (cuando una SR pasa a R34):** un orquestador (Claude) lanza subagentes
   Intro/Methods/Results/Discussion/References **según el estándar de la revista objetivo** (p. ej. **JEADV**:
   PRISMA 2020 + GRADE + Vancouver) → `CitationAgent` verifica (Crossref/PubMed + CSL-JSON) →
   `AssemblerAgent` (python-docx) → `.docx`.

## Cómo escriben en Word y dónde se sincroniza

- **El .docx lo genera `python-docx` en el servidor** (no Word de escritorio). Cada subagente devuelve su
  sección con marcadores `[CIT:id]`; el `AssemblerAgent` los une, reemplaza por citas Vancouver verificadas
  y guarda `revision_v{n}.docx`.
- **Sincronización (elige una, las dos funcionan):**
  - **Obsidian (ya conectado):** el ensamblador deja la nota-resumen del `.docx` en
    `04_INVESTIGACIÓN DERMATOLÓGICA/02_SR_EN_CURSO/SR-1_complicaciones/05_manuscrito/` (tu vault ya sincroniza). El `.docx` se guarda junto.
  - **Google Drive:** subir el `.docx` con la **Google Drive API** (`files.create`, mimeType docx) a una
    carpeta "Research/SR-1"; opcionalmente convertir a Google Docs (`mimeType=application/vnd.google-apps.document`)
    para editarlo online. (En este entorno hay un MCP de Drive disponible para automatizarlo.)
- **Tú llegas a tu hora de research (13:15) y solo revisas/apruebas** el Word en el checkpoint (R39).

## "Empieza desde ahí" — qué pasa cuando me lo pidas dentro de este chat

Yo (Claude Code) **puedo correr el motor de extracción aquí mismo** (como ya lo hice: 666 papers para SR-1)
y avanzar las fases manualmente cuando me lo pidas. Lo que **no** puedo es mantener un proceso corriendo
24/7 después de cerrar la sesión — eso es exactamente lo que resuelve el VPS+n8n de arriba. Mientras no esté
el VPS, el "automático mientras estudias" lo simulamos disparándolo por sesión; con el VPS pasa a ser real.
