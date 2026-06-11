# Modo $0 — correr el motor GRATIS (sin VPS, sin API de pago, solo tu Claude Max + tu PC)

> Reemplaza el "VPS Hetzner $8/mes + Anthropic API de pago" por una arquitectura **a coste cero
> adicional**, usando lo que ya tienes: el **plan Claude Max ($200)**, **APIs públicas gratis**, y
> **tu propia PC** (que está encendida mientras estudias). Verificado jun-2026.

## La arquitectura $0

| Pieza | Antes (de pago) | Ahora (GRATIS) |
|---|---|---|
| Servidor 24/7 | VPS Hetzner ~$8/mes | **Tu PC** + **Programador de tareas de Windows** (corre mientras estudias) |
| Búsqueda 5 fuentes | — | OpenAlex (key gratis · $1/día) + PubMed + Europe PMC + Crossref — **$0** |
| Texto completo | — | **Unpaywall** (OA legal) — **$0** · (Sci-Hub: NO, ver abajo) |
| Screening | — | **Ollama local** (phi4-mini, gratis) o Claude Code |
| **Redacción (workers)** | Anthropic API de pago | **Claude Code (tu plan Max)** — **$0** *(Gemini NO: lo reservas para los anuncios)* |
| Verificación de citas | — | Crossref + PubMed — **$0** |
| Base de datos | — | **Supabase free tier** (ya aplicado) — **$0** |
| Word / sync | — | python-docx (stdlib) → Obsidian / Google Drive — **$0** |

**Coste adicional total: $0.** Solo usas tu suscripción Claude Max (o el tier gratis de Gemini) y tu PC.

## 1. La única key (GRATIS, 30s) — opcional

- **OpenAlex** → `https://openalex.org/settings/api` (crea cuenta gratis, copia la key).
  *Sin key también corre* (100 créditos/día), pero con key tienes **$1/día gratis** (~1.000 búsquedas) y
  las búsquedas por DOI son **gratis**. Para 1 SR/día sobra de largo. Pégala en `run_research_free.bat`.
- **Gemini: NO se usa** — reservas tus pocos tokens para los anuncios de la empresa. La redacción es
  con **Claude Code (tu plan Max)**.

## 2. Encenderlo: el BOTÓN ▶ desde la web — **en la nube, SIN tu PC**

Lo inicias **tú desde la web/app** (Research → Sistema agéntico). Pulsas **▶ Iniciar** por la mañana
mientras estudias ENCAPS y el **discovery corre EN LA NUBE** (una **Supabase Edge Function**, gratis): no
necesitas la PC encendida ni un runner. Deja el corpus cribado para tu hora de research. **⏸ Pausar /
⏹ Detener** cortan al instante. La consola muestra el estado real (🟢/🟡/🔴).

**Probado en vivo:** pulsar ▶ invoca la función `research-discovery` → 348 únicos → **200 papers reales
guardados en Supabase**, sin PC. (La **redacción** del manuscrito sí es con **Claude Code** cuando te
sientas — fase R34–R40 con humano presente; eso no se automatiza en la nube para no usar API de pago.)

**El runner del PC es OPCIONAL** — solo si quieres que la redacción/regeneración corra hands-off en tu
máquina. Si lo usas: pega tu **service_role** en `run_research_free.bat` (Supabase → Settings → API · solo
en tu PC) y déjalo corriendo (o `schtasks /SC ONLOGON`). Para el "▶ desde la web" **no hace falta**.

## 3. Quién redacta → **Claude Code (tu plan Max)**

`agentic_writer.py` (por defecto `--engine claude_code`) deja un prompt por sección en
`prompts_claude_code/` (Intro/Methods/Results/Discussion según el estándar de la revista). Los redactas en
**Claude Code** — o me dices **"redacta SR-1"** y lo hago aquí — y reensamblas con `docx_assembler.py`.
**No gasta API de pago ni tokens de Gemini:** usa tu suscripción Max.

**Qué corre solo vs qué necesita tu Max presente (honesto):**
- **Autónomo en tu PC (sin LLM):** búsqueda en las fuentes + dedup + texto completo (Unpaywall) +
  pre-screening (Ollama local). Eso es el grueso y corre con el `.bat` mientras estudias.
- **Con tu Max (interactivo):** la **prosa** del manuscrito (fase R34–R40 del plan, que ya es una fase con
  humano presente). Te sientas 1 vez, Claude Code redacta las secciones desde el corpus ya cribado, y sale el `.docx`.

## 4. Sci-Hub / "sci-bot" — el argumento ético, y por qué sigo sin conectarlo (con una salida mejor)

Tu punto es legítimo y lo respeto: **el acceso desigual a la literatura es un problema real**, sobre todo
para investigadores de países de ingreso medio como Perú, y el "bien común" del conocimiento importa. No te
voy a dar un sermón. Pero **no voy a conectar/automatizar Sci-Hub**, por dos razones concretas atadas a **tu
objetivo** (publicar en JEADV/JAAD y construir el CV Mayo):

1. **El sustento ético no cambia el estatus legal.** Sci-Hub elude controles de acceso de forma
   **ilegal/disputada en la mayoría de jurisdicciones**; que la motivación sea buena no lo hace legal, y yo
   no puedo construir la automatización que salta esos controles.
2. **Te perjudica justo donde quieres ganar.** Una SR que aspira a JEADV/JAAD y a un CV para Mayo se apoya
   en **integridad de proceso**. Editoriales e instituciones (Mayo incluida) ven con muy malos ojos el uso
   de Sci-Hub; el riesgo reputacional cae sobre lo único que estás construyendo: tu credibilidad.

**La salida que SÍ resuelve el "bien común / acceso para LMIC" — y es legítima:** existe un canal creado
**exactamente para tu situación**: **Research4Life / HINARI** (programa OMS + editoriales) da a
instituciones de países elegibles **acceso legal y gratuito/bajo costo a miles de revistas de pago**. Es la
respuesta institucional al problema que Sci-Hub dice atacar. **Acción:** verifica con la biblioteca de la
**UNCP** si está registrada en **HINARI** (`research4life.org`); si no, su registro es gratis y es la palanca
correcta. Eso te da, legalmente, el acceso que buscabas.

**Cascada legal gratuita (ya automatizada / probada — Unpaywall dio el PDF de DeLorenzi 2014):**
1. **Unpaywall** (OA legal por DOI) · 2. **Europe PMC / PMC OA** · 3. **CORE** (`core.ac.uk`, agregador OA,
   300M+, API gratis) y **BASE** (`base-search.net`) · 4. **Preprints** (medRxiv/bioRxiv) ·
5. **ALICIA-CONCYTEC** (repositorio peruano) · 6. **HINARI/Research4Life** vía UNCP (legal, cubre paywall) ·
7. **Solicitud al autor** (email "request reprint" — el `fulltext_cascade.py` te redacta el correo; muchos
   autores mandan el PDF gratis y encantados) · 8. **Acceso de biblioteca UNCP**.
En dermatología esto cubre el grueso; lo que quede se pide al autor o se saca por HINARI/UNCP — **nunca por
una ruta ilegal**. Mismo "bien común", sin el riesgo.

## 5. En una línea

Todo el motor corre **a $0**: tu PC + Programador de tareas + APIs gratis + Claude Max/Gemini-free para
redactar + Supabase free + Unpaywall legal. No necesitas el VPS ni ninguna API de pago. Lo único que no
hago es Sci-Hub — y no hace falta, la vía legal cubre lo que necesitas.
