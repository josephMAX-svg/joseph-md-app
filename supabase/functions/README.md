# supabase/functions — Edge Functions de la rama RESEARCH (copia versionada)

Proyecto Supabase: `qacynpqdrorpuegsmtcy` (el mismo del motor APEX). Hasta el 5-sep-2026 el código de estas
funciones **solo vivía desplegado** (no había carpeta `supabase/` en el repo): un bug o un cambio de query no se
podía corregir desde git. Este directorio es la copia fiel descargada con `get_edge_function` (MCP Supabase) y
pasa a ser la **fuente de verdad**; si se edita aquí, hay que re-desplegar.

| Función | Versión desplegada | Creada (UTC) | Última actualización (UTC) | verify_jwt | Qué hace |
|---|---|---|---|---|---|
| `research-discovery` | **v2** · ACTIVE | 2026-06-11 02:19 | 2026-06-11 03:08 | true | Botón ▶ de la app: OpenAlex + Europe PMC + PubMed → dedup por DOI → `relevance` → `upsert research_papers` (máx. 200/línea) → pone `lead=working`, `intro/methods=queued` en `research_agent_tasks` |
| `research-fulltext` | **v1** · ACTIVE | 2026-06-11 03:10 | 2026-06-11 03:10 | true | Resuelve el PDF de acceso abierto LEGAL por DOI (Unpaywall → Europe PMC) y escribe `pdf_url`/`is_oa` |

Huellas (`ezbr_sha256`) del despliegue copiado: discovery `be42bb2d…a8c4ca` · fulltext `90770f57…37267`
(la huella completa está en la cabecera de cada `index.ts`).

## Secrets (Dashboard → Project Settings → Edge Functions → Secrets)
`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (las inyecta Supabase), `OPENALEX_KEY` (opcional, obligatoria para
cuota alta desde feb-2026), `NCBI_KEY` (opcional). **Ningún secreto está en el repo.** Las funciones usan
service_role server-side; la app las invoca con anon key + JWT (`supabase.functions.invoke`).

## Cómo se invocan desde la app (`src/lib/supabase.ts`)
- `invokeResearchDiscovery(line)` → `research-discovery` con `{ line: 'L4' | 'L5' }` (guarda como `SR-1`/`SR-2`).
- `resolveFullText(doi)` → `research-fulltext` con `{ doi }` — **de uno en uno** desde el botón de la cola.
- `exportResearchCorpus('SR-1')` (añadida 5-sep-2026) → CSV + RIS del corpus para Rayyan (no toca las funciones).

## Re-despliegue (cuando se edite algo aquí)
```bash
# CLI (requiere `supabase login` y `supabase link --project-ref qacynpqdrorpuegsmtcy`)
supabase functions deploy research-discovery
supabase functions deploy research-fulltext
```
o desde Claude Code con el MCP de Supabase: `deploy_edge_function` (name = slug, files = [index.ts]).
Después: `list_edge_functions` debe mostrar version+1; anotar la nueva versión/fecha en esta tabla.

## Estado real del corpus (verificado 5-sep-2026, SQL en vivo)
- `research_papers`: **200** filas `line='SR-1'` (todas `discovered_at` 11-jun-2026 03:13 UTC), **151** `is_oa=true`,
  **0** con `pdf_url`, **todas** `screen_status='pending_human'`. `research_screening`: 0 decisiones.
- `research_agent_tasks`: 7 filas L4/SR-1. Los 5 estados sembrados el 10-jun (`lead=working`, `intro/methods/
  results/citation=queued`) se pasaron a `idle` el 5-sep-2026 (UPDATE con RETURNING: 5 filas) para que la consola
  de la app no finja que redacta. `research-discovery` los vuelve a poner en working/queued cuando se ejecuta.
- El DDL que faltaba en `DATA/RESEARCH/agentic/supabase_schema.sql` (`relevance`, `run_state`, `output_md`,
  `research_commands`, policies de update/insert) se añadió el 5-sep-2026 al final de ese fichero.

## Pendiente (job "resolve fulltext" en lote — vacío 8.4 del análisis Palmerton v3)
`research-fulltext` existe pero solo se llama de uno en uno. Para los 151 OA de SR-1 hay dos vías sin tocar el
backend: (a) bucle desde la app/Claude Code: `for doi of dois: await resolveFullText(doi)` con 300 ms entre
llamadas (Unpaywall pide ≤100k req/día con email; sobra); (b) `DATA/RESEARCH/agentic/fulltext_cascade.py` sobre el
CSV exportado. Hacerlo en el átomo R17 (exportar corpus) — no antes de definir la query PRISMA-S final (R12), porque
el corpus se re-descubre y los PDFs de papers que se excluyen no sirven.
