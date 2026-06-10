# Cómo ENCENDER el motor 24/7 (de "diseño" a "corriendo solo mientras estudias")

> **Estado honesto (jun-2026):** la **extracción ya funciona** — `discovery_engine.py` corrió en vivo
> y devolvió **666 papers únicos para SR-1** (incluido el ancla DeLorenzi 2014). Pero **todavía NO corre
> solo 24/7**: para que extraiga y redacte en automático *mientras estudias* falta **desplegar el backend**
> (un servidor encendido siempre + las keys + n8n + los workers). Esto no se puede "encender" desde la app
> web (que es solo el **panel de control**); requiere los pasos de abajo, que solo tú puedes ejecutar
> porque necesitan tus credenciales y un servidor.

## Qué está LISTO vs qué FALTA

| Pieza | Estado | Qué es |
|---|---|---|
| Extracción 5 fuentes (`discovery_engine.py`) | ✅ **funciona** (probado en vivo) | OpenAlex troncal + PubMed + Europe PMC + S2 → dedup |
| Cascada texto completo (Unpaywall→…) | 🟡 especificada (§4 discovery-engine.md) | falta el resolver por DOI |
| Esquema Supabase research (`supabase_schema.sql`) | ✅ escrito | falta **ejecutarlo** en el proyecto |
| App = panel de control (Vercel) | ✅ desplegada | dashboard/consola/checkpoints |
| Orquestación 24/7 (n8n + cron + Calendar) | ❌ **falta desplegar** | el "corre solo" vive aquí |
| Workers Claude (Intro/Methods/Results/…) | ❌ falta | redactan secciones (Claude API) |
| QA citas IA (Crossref/CSL) + .docx | 🟡 especificada | falta el código del worker |
| Telegram (aprobaciones móviles) | ❌ falta bot | checkpoints HITL |

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
