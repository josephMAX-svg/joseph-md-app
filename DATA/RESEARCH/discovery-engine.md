# Motor de descubrimiento bibliográfico + citas por IA (verificado jun-2026)

> **El componente más crítico del sistema** (Manual Maestro §5–6). Reemplaza la metodología vieja
> ("PubMed + Zotero manual") por la real: **OpenAlex como troncal + 5 fuentes** (≈97% sensibilidad),
> **cascada de texto completo legal** (Unpaywall→…), y **citas generadas y verificadas por IA**
> (Crossref/PubMed + CSL-JSON), **nunca a mano con Zotero**. Todo verificado contra el estado de las
> APIs en **junio 2026** (las APIs cambian — re-verificar antes de codear; URLs al pie).
>
> Regla dura del Manual: **una SR rigurosa exige cubrir ~30 años con sensibilidad ≥90–97%**. Eso es
> inmanejable a mano en 1 h/día → el motor lo hace en automático antes del bloque de research.

---

## 1. Por qué NO solo PubMed, y por qué OpenAlex es el troncal

PubMed es excelente pero **parcial** (biomédico). Web of Science / Scopus son potentes pero **de pago**
y tampoco exhaustivos solos. La solución es un motor multi-fuente con **OpenAlex** (OurResearch, sin
fines de lucro) como capa de máxima cobertura abierta:

- **250M+ trabajos**, licencia **CC0**, API REST en `api.openalex.org`.
- **Validación para SR (verificada):** Stansfield et al., *Cochrane Evidence Synthesis Methods* 2025,
  **DOI 10.1002/cesm.70038** — de 131 registros relevantes de una SR real, **128 (98%) estaban
  contenidos** en OpenAlex; la **búsqueda booleana recuperó 96% (126/131)**. ⇒ *Contención ≠
  recuperación*: por eso se combina la búsqueda booleana con **citation-chasing** (referencias y citas)
  y una 2ª base (PubMed/Embase) para cerrar el último ~4%.

### ⚠️ CAMBIO MAYOR (verificado): OpenAlex ahora exige API key (13-feb-2026)
Anuncio oficial (openalex-users, ene-2026): *"API calls will require a key starting … Feb 13"* y
*"No more polite pool! No more email parameter — it was never secure and couldn't scale."*
- **El polite pool / `mailto` está DESCONTINUADO.** No usarlo.
- **Key gratis** en `https://openalex.org/settings/api` (cuenta gratuita, ~30 s) → se pasa como
  query param: `api.openalex.org/works?api_key=YOUR_KEY`. Sin key: 100 créditos de prueba → HTTP 409.
- **Modelo freemium por créditos:** ~**$1/día gratis** (reset 00:00 UTC). Tarifas: **List+Filter
  ≈ $0.10/1.000 llamadas**, **Search ≈ $1/1.000** (10×), **retrieval por ID/DOI = gratis**.
- **Docs migraron** a `developers.openalex.org` (las `docs.openalex.org` redirigen 301).
- Los filtros `.search` (`title_and_abstract.search`, etc.) están **DEPRECADOS** a favor del parámetro
  unificado `search=` (siguen funcionando).
- **Escape de coste a escala:** el **snapshot CC0 completo es gratis** en AWS Open Data
  (`s3://openalex`, `aws s3 sync --no-sign-request`, ~330 GB, refresco mensual) → espejar en
  Postgres y consultar local con coste marginal cero para cosechas grandes/repetidas.

---

## 2. Las 5 fuentes del motor (≈97% sensibilidad — "Capa 0 · Discovery")

| Fuente | Cobertura | API / auth (jun-2026) | Rol |
|--------|-----------|------------------------|-----|
| **OpenAlex** ⭐ | 250M+ (CC0) | `api.openalex.org/works` · **API key obligatoria** (`?api_key=`) · freemium | **Troncal** — máxima cobertura abierta + citation-chasing (`referenced_works`, `cited_by`) |
| **PubMed/MEDLINE** | 37M biomédicos | E-utilities (`esearch`/`efetch`/`esummary`) · sin key 3/s, con key NCBI 10/s | Gold standard biomédico (MeSH) |
| **Europe PMC** | 46M+ · 880k+ preprints | `ebi.ac.uk/europepmc/webservices/rest/search` · **sin key** · `cursorMark`, `pageSize≤1000`, `resultType=core` → `fullTextUrlList` | Cobertura europea + preprints + texto completo OA |
| **LILACS / BVS** | ~700 revistas desde 1982 · LILACS Plus ~2.8M docs (>50% OA) | iAHx `pesquisa.bvsalud.org/portal/?q=…&filter=db:LILACS&output=rss\|xml` (bot-protected → User-Agent de navegador) · `api.bvsalud.org` con token (BIREME) · descriptores **DeCS** | **Ventaja diferencial peruana/LATAM** (ES/PT) |
| **Semantic Scholar** | 214M+ papers | `api.semanticscholar.org/graph/v1` · **key gratis** (header `x-api-key`, 1 req/s introductorio) · `/paper/search/bulk` (token, hasta 10M) | Complemento semántico + `externalIds` (DOI/PMID) + `tldr` (IA) |

**Correcciones verificadas:** Europe PMC **NO indexa Embase** ("Embase-partial" del manual es inexacto;
sus fuentes son MEDLINE/PMC/Agricola/preprints/patentes/tesis). Semantic Scholar: `tldr` solo en
`/paper/search` y `/paper/batch` (no en `bulk`); sin key es prácticamente inusable (429). LILACS: su
endpoint público REST es menos estable que las otras 4 → validar o sustituir por DOAJ/Semantic Scholar
si falla.

**Flujo Capa 0:**
```
Query PICO (booleana) → ejecutar async en las 5 APIs → consolidar
  → deduplicar por DOI normalizado (minúsculas, sin https://doi.org/); fallback fuzzy título (rapidfuzz ≥0.90)
  → upsert idempotente en Supabase (papers) ON CONFLICT (doi) DO NOTHING
  → reportar a Telegram: "SR Línea X: N abstracts únicos listos"
```

---

> **✅ Ejecutable y probado en vivo (jun-2026):** [`agentic/discovery_engine.py`](agentic/discovery_engine.py)
> corrió de verdad para SR-1 → **804 brutos → 666 únicos (dedup DOI), 117 en ≥2 fuentes**, con el ancla
> **DeLorenzi 2014** como primer resultado. Esquema de BD: [`agentic/supabase_schema.sql`](agentic/supabase_schema.sql).
> Cómo encenderlo 24/7 (VPS/n8n/keys) + sincronización Word/Drive: [`agentic/DEPLOY.md`](agentic/DEPLOY.md).

## 3. Esqueleto del motor (Python async · verificado)

```python
# D:\motor_apex\discovery_engine.py  (conceptual — endpoints/auth reales jun-2026)
import asyncio, httpx
from Bio import Entrez

Entrez.email = "josephsototocas@gmail.com"; Entrez.api_key = NCBI_KEY  # 10 req/s
OPENALEX_KEY = "<key gratis de openalex.org/settings/api>"            # OBLIGATORIA desde 13-feb-2026

async def openalex(client, q, cursor="*"):
    # search= (troncal) cuesta ~$1/1k; filter= ~$0.10/1k. per_page max 200. NO mailto (muerto).
    r = await client.get("https://api.openalex.org/works", params={
        "search": q, "per_page": 200, "cursor": cursor, "api_key": OPENALEX_KEY,
        "select": "id,doi,ids,title,abstract_inverted_index,publication_year,open_access,referenced_works"})
    data = r.json()
    return data["results"], data["meta"]["next_cursor"]      # loop hasta next_cursor == None

async def europepmc(client, q):
    # sin key. cursorMark=* ; resultType=core → fullTextUrlList (acceso OA)
    r = await client.get("https://www.ebi.ac.uk/europepmc/webservices/rest/search",
        params={"query": q, "format": "json", "resultType": "core", "pageSize": 1000, "cursorMark": "*"})
    return r.json()

async def semantic_scholar(client, q):
    # header x-api-key (1 req/s) ; /paper/search/bulk (token, hasta 10M)
    r = await client.get("https://api.semanticscholar.org/graph/v1/paper/search/bulk",
        headers={"x-api-key": S2_KEY},
        params={"query": q, "fields": "externalIds,title,abstract,year,openAccessPdf,publicationTypes"})
    return r.json()

def pubmed(q):                       # síncrono (Entrez)
    ids = Entrez.read(Entrez.esearch(db="pubmed", term=q, retmax=2000))["IdList"]
    return Entrez.read(Entrez.efetch(db="pubmed", id=ids, retmode="xml")) if ids else []

async def lilacs(client, q):         # iAHx RSS/XML (User-Agent de navegador para evitar 403)
    r = await client.get("https://pesquisa.bvsalud.org/portal/",
        params={"q": q, "filter": "db:LILACS", "output": "rss", "lang": "es"},
        headers={"User-Agent": "Mozilla/5.0 (research-engine; mailto:josephsototocas@gmail.com)"})
    return r.text

async def discovery(q_pico):
    async with httpx.AsyncClient(timeout=60) as c:
        oa, epmc, s2, ll = await asyncio.gather(
            openalex(c, q_pico), europepmc(c, q_pico), semantic_scholar(c, q_pico), lilacs(c, q_pico))
    todos = consolidar(oa, epmc, s2, ll, pubmed(q_pico))
    unicos = deduplicar(todos, claves=["doi", "pmid", "titulo_norm"])  # ~33% duplicados es normal
    guardar_supabase(unicos)                                          # service_role, server-side only
    return f"{len(unicos)} únicos de {len(todos)} totales"
```
Notas: las abstracts de OpenAlex vienen como `abstract_inverted_index` → reconstruir a texto. Capar
concurrencia (~5–10) y backoff exponencial en 429 **y 409** (409 = sin créditos → parar/encolar al
día UTC siguiente). Preferir `filter=` sobre `search=` (10× más barato) salvo la query booleana de recall.

---

## 4. Cascada de acceso a texto completo (legal primero)

Encontrar el metadato ≠ tener el PDF. Para cada paper incluido, el agente intenta **en orden**, y corta
al primer PDF conseguido (registrando qué etapa ganó):

```
1. Unpaywall   api.unpaywall.org/v2/{DOI}?email=…  (de OurResearch · gratis · 100k/día)
               is_oa? → best_oa_location.url_for_pdf  (oa_status: gold/green/hybrid/bronze/closed)
2. Europe PMC  /{source}/{id}/fullTextXML  +  fullTextUrlList (resultType=core)
3. PMC OA      subset abierto (NCBI OA Web Service / FTP)
4. Preprints   bioRxiv / medRxiv / arXiv (por DOI/ID)
5. ALICIA-CONCYTEC  alicia.concytec.gob.pe (VuFind) → OAI-PMH (Dublin Core) → handle → PDF (match fuzzy)
6. Solicitud al autor (email automático "request reprint") — último recurso
```
**Unpaywall** (desde may-2025 es "un slice de OpenAlex" — ~50 ms/respuesta) es la pieza clave del acceso
**legal**; no se usa como pasarela a Sci-Hub (la cascada queda en OA/repositorio/preprint/autor). Para
corpus grandes, usar el **snapshot** en vez de llamadas por DOI. Campos: `is_oa`, `best_oa_location
.{url_for_pdf,url,host_type,version,license}`, `oa_status`.

---

## 5. Citas por IA (reemplaza Zotero) — el gate anti-alucinación

El usuario **no cita a mano**: la IA propone, pero **solo sobrevive lo que resuelve a un DOI/PMID real**.
La alucinación de citas por LLM está documentada y es de tasa alta → verificación mecánica obligatoria.

**Pipeline (gate entre "borrador IA" y "guardar en Supabase"):**
1. **El LLM emite JSON estructurado, no prosa**: cada referencia = `{claim_id, title, authors, year, doi?, pmid?}` + marcadores `[CIT:claim_id]` en el texto. Prohibido bibliografías de texto libre.
2. **Verificador async** (respeta límites): por referencia —
   - con DOI → `GET api.crossref.org/works/{DOI}?mailto=…`
   - con PMID → `esummary.fcgi?db=pubmed&id=…&retmode=json`
   - sin ninguno → `query.bibliographic` (Crossref) + `esearch [Title]` (PubMed) para candidatos.
3. **Match fuzzy**: normalizar títulos, `rapidfuzz token_sort_ratio` → **≥0.90 acepta · 0.80–0.90 a revisión humana · <0.80 rechaza**; + año ±1 + apellido 1er autor.
4. **Al aceptar, DESCARTA los metadatos del LLM** y re-baja el **CSL-JSON canónico** por content
   negotiation: `Accept: application/vnd.citationstyles.csl+json` en `https://doi.org/{DOI}` (o construye
   CSL desde `esummary` para PMID). Eso es la verdad de tierra.
5. **Formateo Vancouver/CSL**: `citation.js` (`@citation-js/plugin-csl`, `template:'vancouver'`) o
   `anystyle` — **nunca a mano**. (Crossref también da `Accept: text/x-bibliography; style=vancouver`.)
6. **Regla del motor:** una referencia solo sale del verificador con `status='verified'` si resolvió a un
   DOI/PMID real; lo demás es `needs_review` o `rejected` (tabla de auditoría — las alucinaciones quedan visibles).

**Límites verificados (jun-2026):** Crossref cambió sus límites el **1-dic-2025**: público **5/s**
single + 1/s listas (1 concurrente); **polite (mailto) 10/s** + 3/s (3 concurrentes) — **leer los headers
`X-Rate-Limit-Limit`/`X-Rate-Limit-Interval`** en runtime. PubMed: 3/s sin key, 10/s con key; `efetch`
de pubmed **no da JSON** (usar `esummary retmode=json`).

> **Adiós Zotero (manual):** la gestión manual de citas se sustituye por este gate + gestores con IA
> (SciSpace, Paperpile, Elicit) que importan/exportan, pero el **estándar de verdad es Crossref/PubMed +
> CSL-JSON verificado**, no la librería personal.

---

## 6. Herramientas de IA para screening/lectura/extracción (precios verificados jun-2026)

| Herramienta | Rol | Precio real (jun-2026) |
|------------|-----|------------------------|
| **Elicit** | Screening SR (workflow PRISMA-2020, scores por criterio, quotes) + extracción en tablas | Basic gratis (2 reports/mes); **Pro $49/mes** (5.000 papers, +20 cols); Scale $169; Enterprise (40.000 papers) — *(el "$12/mes" que circula está obsoleto)* |
| **Rayyan** | Cribado **2 revisores ciego** + detección de duplicados + Kappa exportable | **Free** (3 reviews, 2 revisores, predicciones IA); Essential $4.99; Advanced $8.33 |
| **ASReview** | Active-learning (prioriza relevantes); v3.0.7 (jun-2026), open-source Apache-2.0 | **$0** (self-hosted) |
| **SciSpace** | Chat-with-PDF + Deep Review (extracción hasta 100 columnas) | Free; Premium $20 (~$12 anual); Advanced ~$70 (modelo de créditos) |
| **Consensus** | Discovery + síntesis (Consensus Meter, filtros tipo de estudio) — **no** es cribado dual | Free; Pro ~$15/mes; Deep ~$65/mes |

**Reparto por etapa:** Consensus = scoping/orientación · OpenAlex+5 fuentes = descubrimiento exhaustivo
reproducible (PRISMA) · ASReview = priorización de gran volumen · **Rayyan = cribado dual formal + Kappa**
· Elicit/SciSpace = extracción. Ningún tool hace bien todo el pipeline.

---

## 7. Orquestación 24/7 (n8n + Calendar + Ollama + Telegram + Supabase) — verificado

```
n8n Schedule Trigger (cron "0 6 * * *"; GENERIC_TIMEZONE=America/Lima)
  → Google Calendar events.list (timeMin=now, timeMax=+24h, singleEvents=true, orderBy=startTime, q="research")
  → IF hay bloque hoy → Execute Command → discovery_engine.py (5 fuentes → dedup → Ollama → Supabase)
  → Ollama pre-screen local ($0): POST localhost:11434/api/generate, model phi4-mini, keep_alive="30m",
      format = JSON-schema {relevant:bool, reason:str}  (structured outputs)
  → Supabase (papers/screening/engine_state) + Realtime → dashboard en vivo
  → Telegram "Send and Wait for Response" (Approval [Aprobar]/[Descartar]) → PAUSA hasta decisión humana
```
**Gotchas verificados:** n8n self-hosted necesita `WEBHOOK_URL` (con `/` final) + `N8N_PROXY_HOPS=1`
o los callbacks de Telegram **nunca reanudan** el workflow (issues #20042/#23489). Calendar `orderBy=startTime`
exige `singleEvents=true` y `timeMin/timeMax` en RFC3339 con offset. Telegram: `getUpdates` y webhook son
**mutuamente excluyentes**; `answerCallbackQuery` es obligatorio. Supabase Realtime: Postgres Changes (simple)
o Broadcast (escala); free = 200 conexiones / 2M msg. Ollama `format` constriñe **formato, no verdad** →
sigue siendo pre-filtro (la inclusión formal son 2 revisores + Kappa).

**Esquema Supabase (mínimo):**
```sql
papers(id uuid pk default gen_random_uuid(), doi text unique, pmid text, title text, abstract text,
       source text, line text, ollama_relevant bool, ollama_reason text, screen_status text default 'pending_human',
       discovered_at timestamptz default now())
screening(id uuid pk, paper_id uuid references papers, stage text, decision text, reason text, decided_by text, decided_at timestamptz)
citations(id uuid pk, claim_id text, doi text unique, pmid text, csl_json jsonb, match_score numeric, status text, verified_at timestamptz)  -- gate §5
engine_state(id int pk default 1, last_run_at timestamptz, active_line text, batch_id uuid)
```
RLS activado: el dashboard usa anon/publishable key (SELECT); el escritor Python usa **service_role**
**solo server-side** (no embebible en navegador — coherente con la nota de Business/RLS del proyecto).

---

## 8. Fuentes verificadas (jun-2026)
- OpenAlex auth/pricing: https://developers.openalex.org/api-reference/authentication · https://help.openalex.org/hc/en-us/articles/24397762024087-Pricing · anuncio key: https://groups.google.com/g/openalex-users/c/rI1GIAySpVQ
- OpenAlex validación SR: https://onlinelibrary.wiley.com/doi/10.1002/cesm.70038
- OpenAlex snapshot (AWS): https://registry.opendata.aws/openalex/
- Unpaywall: https://unpaywall.org/products/api · https://blog.openalex.org/major-update-to-unpaywall-database/
- Semantic Scholar: https://api.semanticscholar.org/api-docs/graph · https://www.semanticscholar.org/product/api
- Europe PMC: https://europepmc.org/RestfulWebService · https://blog.europepmc.org/2025/05/making-sense-of-europe-pmc-answers-to-your-biggest-faqs.html
- LILACS/BVS + DeCS: https://lilacs.bvsalud.org/en/ · https://docs.api.bvsalud.org/ · https://decs.bvsalud.org/en/for-developers/
- Crossref (límites dic-2025 + content negotiation): https://www.crossref.org/blog/announcing-changes-to-rest-api-rate-limits/ · https://www.crossref.org/documentation/retrieve-metadata/content-negotiation/
- PubMed E-utilities: https://www.ncbi.nlm.nih.gov/books/NBK25501/
- citation.js / anystyle: https://citation.js.org/ · https://anystyle.io/
- Tools: https://elicit.com/pricing · https://www.rayyan.com/pricing/ · https://asreview.nl/ · https://scispace.com/pricing · https://consensus.app/pricing/
- Orquestación: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/ · https://docs.ollama.com/capabilities/structured-outputs · https://developers.google.com/workspace/calendar/api/v3/reference/events/list · https://supabase.com/docs/guides/realtime/postgres-changes

> Verificar herramientas, APIs y precios contra su estado actual al construir (cambian con frecuencia).
