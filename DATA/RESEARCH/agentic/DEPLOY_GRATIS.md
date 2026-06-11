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
| **Redacción (workers)** | Anthropic API de pago | **Claude Code (tu Max)** o **Gemini free API** — **$0** |
| Verificación de citas | — | Crossref + PubMed — **$0** |
| Base de datos | — | **Supabase free tier** (ya aplicado) — **$0** |
| Word / sync | — | python-docx (stdlib) → Obsidian / Google Drive — **$0** |

**Coste adicional total: $0.** Solo usas tu suscripción Claude Max (o el tier gratis de Gemini) y tu PC.

## 1. Las únicas 2 keys (ambas GRATIS, 30s cada una) — opcionales

- **OpenAlex** → `https://openalex.org/settings/api` (crea cuenta gratis, copia la key `...`).
  *Sin key también corre* (100 créditos/día), pero con key tienes **$1/día gratis** (~1.000 búsquedas) y
  las búsquedas por DOI son **gratis**. Para 1 SR/día sobra de largo.
- **Gemini** (si quieres redacción hands-off sin abrir Claude Code) → `https://aistudio.google.com/apikey`
  (key `AIza...`, **tier gratis permanente**, 1.500 peticiones/día con `gemini-2.5-flash`). Una SR ≈ 5-7
  llamadas → gratis. *Tu "Gemini básico" del móvil no es esto; AI Studio da una key de API aparte, gratis.*

Pega ambas en `run_research_free.bat` (líneas `set OPENALEX_KEY=` / `set GEMINI_API_KEY=`).

## 2. Encenderlo en tu PC (cron gratis, una vez)

`cmd` como administrador:
```
schtasks /Create /SC WEEKLY /D MON,TUE,WED,THU,FRI ^
  /TR "D:\joseph-md-app\DATA\RESEARCH\agentic\run_research_free.bat" ^
  /TN "Research Discovery" /ST 06:00
```
Cada día hábil 06:00 (con la PC encendida) corre discovery + redacción. Quitar: `schtasks /Delete /TN "Research Discovery" /F`.

## 3. Quién redacta (elige; ambos $0)

- **Claude Code (tu plan Max · recomendado):** `agentic_writer.py --engine claude_code` deja un prompt por
  sección en `prompts_claude_code/`. Los redactas en Claude Code (o me dices **"redacta SR-1"** y lo hago
  aquí) — **no gasta API**, usa tu suscripción. Mejor calidad para el manuscrito final.
- **Gemini free (hands-off):** con `GEMINI_API_KEY` puesta, `agentic_writer.py` redacta solo, gratis, sin
  abrir nada. Ideal para que "corra mientras estudias".

El orquestador ya elige el motor gratis disponible automáticamente (Gemini si hay key, si no Claude Code).

## 4. Sci-Hub / "sci-bot" — por qué NO, y qué usar en su lugar

**No voy a automatizar Sci-Hub ni un "sci-bot".** Su estatus legal es **disputado/ilegal en muchas
jurisdicciones** (incluida la mayoría de editoriales), y va contra las reglas del propio sistema
(`agentic-system.md`: *"prioriza acceso abierto legal; Sci-Hub no se usa"*). Para una SR que quieres
publicar en JEADV/JAAD, usar Sci-Hub es además un riesgo reputacional real.

**La vía legal gratuita ya cubre la mayoría** (probado: Unpaywall resolvió el PDF de DeLorenzi 2014):
1. **Unpaywall** (OA legal por DOI) · 2. **Europe PMC / PMC OA** · 3. **Preprints** (medRxiv/bioRxiv) ·
4. **ALICIA-CONCYTEC** (repositorio peruano) · 5. **Solicitud al autor** (email "request reprint" — muchos
mandan el PDF gratis) · 6. **Tu acceso institucional UNCP** (login de biblioteca, legal).
En dermatología, esto basta para el grueso de la literatura; lo que quede tras paywall se marca para
gestión manual (pedir al autor o vía UNCP), no por una ruta ilegal.

## 5. En una línea

Todo el motor corre **a $0**: tu PC + Programador de tareas + APIs gratis + Claude Max/Gemini-free para
redactar + Supabase free + Unpaywall legal. No necesitas el VPS ni ninguna API de pago. Lo único que no
hago es Sci-Hub — y no hace falta, la vía legal cubre lo que necesitas.
