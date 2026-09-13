// research-discovery v3 (repo) — discovery EN LA NUBE (boton ▶ web, sin PC) + relevancia para pre-ordenar.
// 3 fuentes gratis (OpenAlex troncal + Europe PMC + PubMed) → dedup DOI → score → upsert research_papers.
//
// ── Origen: copia FIEL del código desplegado (v2, get_edge_function 5-sep-2026 · ezbr_sha256 be42bb2d…a8c4ca) ──
// ── v3 (12-sep-2026 · Palmerton v3b · gap 9): SOLO EN EL REPO, NO DESPLEGADA. Cambios: ──
//   • OpenAlex ya NO es opcional en silencio: sin OPENALEX_KEY (obligatoria desde el 13-feb-2026) o con 0 resultados, la
//     función registra `sources_ok` {openalex, europepmc, pubmed} + `last_error` en research_engine_state (columnas creadas
//     por DATA/_scripts/_migrations/research_entregables.sql) y responde ok:false (HTTP 502) SIN insertar nada.
//     `{ line, strict: false }` inserta lo que haya (PubMed + Europe PMC) y solo avisa (`warnings`).
//   • Cada fuente devuelve {rows, ok, error} para que el monitor de la app sepa qué aportó cada una.
//   Esta función es el FEEDER de la app (cola de screening); la búsqueda PRISMA-S final de la SR se corre con
//   DATA/RESEARCH/agentic/discovery_engine.py (5 fuentes, sin tope) → Rayyan (agentic-system.md §9.1).
// Secrets en runtime (Dashboard → Edge Functions → Secrets): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENALEX_KEY
// (troncal; pendiente de cargar), NCBI_KEY (opcional). NO hay secretos en este fichero.
// Re-despliegue: `supabase functions deploy research-discovery` (o deploy_edge_function del MCP) — ver README.md.
import { createClient } from 'jsr:@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const CONTACT = 'josephsototocas@gmail.com';
const UA = { 'User-Agent': `joseph-md-research/1.0 (mailto:${CONTACT})` };
const QUERIES: Record<string, string> = {
  L4: '(dermal filler OR hyaluronic acid filler) AND (vascular occlusion OR skin necrosis OR blindness) AND hyaluronidase',
  L5: '(fractional radiofrequency microneedling OR fractional CO2 laser) AND (skin of color OR Fitzpatrick IV OR Fitzpatrick V OR Fitzpatrick VI) AND (acne scar OR rejuvenation)',
};
const SR_OF: Record<string, string> = { L4: 'SR-1', L5: 'SR-2' };
const KW: Record<string, string[]> = {
  L4: ['vascular', 'occlusion', 'necrosis', 'blindness', 'hyaluronidase', 'filler', 'embolism', 'ischemia', 'retinal'],
  L5: ['fitzpatrick', 'skin of color', 'radiofrequency', 'microneedling', 'co2', 'acne scar', 'hyperpigmentation', 'dark skin', 'phototype'],
};
const normDoi = (d?: string | null) => d ? d.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').toLowerCase() || null : null;

type Hit = { source: string; doi: string | null; pmid: string | null; title: string; year: number | null; is_oa: boolean | null; sources?: Set<string> };
/** Resultado por fuente: `ok` = aportó ≥1 registro; `error` = motivo explícito (key ausente, HTTP, 0 resultados). */
type SourceResult = { source: string; rows: Hit[]; ok: boolean; error: string | null };
const SOURCES = ['openalex', 'europepmc', 'pubmed'] as const;
const OPENALEX_KEY_MSG = 'OPENALEX_KEY ausente: OpenAlex exige API key desde el 13-feb-2026 (openalex.org/settings/api → Dashboard → Edge Functions → Secrets)';

async function openalex(q: string): Promise<SourceResult> {
  const key = Deno.env.get('OPENALEX_KEY');
  if (!key) return { source: 'openalex', rows: [], ok: false, error: OPENALEX_KEY_MSG };
  const u = new URL('https://api.openalex.org/works');
  u.searchParams.set('search', q); u.searchParams.set('per_page', '200');
  u.searchParams.set('select', 'id,doi,ids,title,publication_year,open_access');
  u.searchParams.set('api_key', key);
  const r = await fetch(u, { headers: UA });
  if (!r.ok) return { source: 'openalex', rows: [], ok: false, error: `OpenAlex HTTP ${r.status}` };
  const d = await r.json();
  const rows: Hit[] = (d.results ?? []).map((w: any) => ({ source: 'openalex', doi: normDoi(w.doi), pmid: (w.ids?.pmid ?? '').replace('https://pubmed.ncbi.nlm.nih.gov/', '').replace(/\/$/, '') || null, title: w.title ?? '', year: w.publication_year ?? null, is_oa: w.open_access?.is_oa ?? null }));
  return { source: 'openalex', rows, ok: rows.length > 0, error: rows.length ? null : 'OpenAlex devolvió 0 resultados para la query' };
}
async function europepmc(q: string): Promise<SourceResult> {
  const u = new URL('https://www.ebi.ac.uk/europepmc/webservices/rest/search');
  u.searchParams.set('query', q); u.searchParams.set('format', 'json'); u.searchParams.set('resultType', 'lite'); u.searchParams.set('pageSize', '100');
  const r = await fetch(u, { headers: UA });
  if (!r.ok) return { source: 'europepmc', rows: [], ok: false, error: `Europe PMC HTTP ${r.status}` };
  const d = await r.json();
  const rows: Hit[] = (d.resultList?.result ?? []).map((x: any) => ({ source: 'europepmc', doi: normDoi(x.doi), pmid: x.pmid ?? null, title: x.title ?? '', year: x.pubYear ? Number(x.pubYear) : null, is_oa: x.isOpenAccess === 'Y' }));
  return { source: 'europepmc', rows, ok: rows.length > 0, error: rows.length ? null : 'Europe PMC devolvió 0 resultados' };
}
async function pubmed(q: string): Promise<SourceResult> {
  const base = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
  const key = Deno.env.get('NCBI_KEY');
  const es = new URL(base + 'esearch.fcgi');
  es.searchParams.set('db', 'pubmed'); es.searchParams.set('term', q); es.searchParams.set('retmax', '100'); es.searchParams.set('retmode', 'json'); es.searchParams.set('tool', 'joseph-md'); es.searchParams.set('email', CONTACT);
  if (key) es.searchParams.set('api_key', key);
  const r1 = await fetch(es, { headers: UA });
  if (!r1.ok) return { source: 'pubmed', rows: [], ok: false, error: `PubMed esearch HTTP ${r1.status}` };
  const ids = (await r1.json()).esearchresult?.idlist ?? [];
  if (!ids.length) return { source: 'pubmed', rows: [], ok: false, error: 'PubMed devolvió 0 resultados' };
  const su = new URL(base + 'esummary.fcgi');
  su.searchParams.set('db', 'pubmed'); su.searchParams.set('id', ids.join(',')); su.searchParams.set('retmode', 'json'); su.searchParams.set('tool', 'joseph-md'); su.searchParams.set('email', CONTACT);
  if (key) su.searchParams.set('api_key', key);
  const r2 = await fetch(su, { headers: UA });
  if (!r2.ok) return { source: 'pubmed', rows: [], ok: false, error: `PubMed esummary HTTP ${r2.status}` };
  const res = (await r2.json()).result ?? {};
  const rows: Hit[] = (res.uids ?? []).map((id: string) => { const it = res[id]; const doi = (it.articleids ?? []).find((a: any) => a.idtype === 'doi')?.value; return { source: 'pubmed', doi: normDoi(doi), pmid: id, title: it.title ?? '', year: it.pubdate ? Number(String(it.pubdate).slice(0, 4)) : null, is_oa: null }; });
  return { source: 'pubmed', rows, ok: rows.length > 0, error: null };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  const J = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...CORS, 'Content-Type': 'application/json' } });
  try {
    const body = await req.json().catch(() => ({}));
    const line: string = body.line ?? 'L4';
    const strict: boolean = body.strict !== false;   // por defecto: fallo explícito si la fuente troncal no aporta nada
    const q = QUERIES[line] ?? QUERIES.L4; const kw = KW[line] ?? KW.L4;
    const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    await sb.from('research_engine_state').update({ run_state: 'running', active_line: SR_OF[line] ?? 'SR-1', last_run_at: new Date().toISOString() }).eq('id', 1);

    const settle = await Promise.allSettled([openalex(q), europepmc(q), pubmed(q)]);
    const results: SourceResult[] = settle.map((s, i) => s.status === 'fulfilled' ? s.value : { source: SOURCES[i], rows: [], ok: false, error: String(s.reason).slice(0, 200) });
    const sources_ok: Record<string, number> = {};
    const errores: string[] = [];
    for (const r of results) { sources_ok[r.source] = r.rows.length; if (r.error) errores.push(`${r.source}: ${r.error}`); }
    const troncalOk = (sources_ok.openalex ?? 0) > 0;
    const last_error = errores.length ? errores.join(' | ').slice(0, 500) : null;

    const all = results.flatMap((r) => r.rows);
    const seen = new Map<string, Hit>();
    for (const r of all) {
      const k = r.doi || ('t:' + (r.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 80));
      if (!k || k === 't:') continue;
      if (seen.has(k)) { seen.get(k)!.sources!.add(r.source); continue; }
      r.sources = new Set([r.source]); seen.set(k, r);
    }
    const unique = [...seen.values()];
    const score = (r: Hit) => { const t = (r.title || '').toLowerCase(); let s = kw.reduce((a, w) => a + (t.includes(w) ? 1 : 0), 0); s += ((r.sources?.size ?? 1) - 1) * 2; return s; };
    const rows = unique.filter((r) => r.doi).map((r) => ({ ...r, rel: score(r) })).sort((a, b) => b.rel - a.rel).slice(0, 200)
      .map((r) => ({ line: SR_OF[line] ?? 'SR-1', doi: r.doi, pmid: r.pmid, title: r.title, year: r.year, sources: [...(r.sources ?? [])], is_oa: r.is_oa, relevance: r.rel, screen_status: 'pending_human' }));

    if (!troncalOk && strict) {
      // FALLO EXPLÍCITO: la fuente troncal no aportó nada → no se inserta un corpus incompleto ni se despiertan los agentes.
      await sb.from('research_engine_state').update({
        run_state: 'idle', papers_today: 0, sources_ok, last_error,
        next_checkpoint: 'BLOQUEADO: OpenAlex (fuente troncal) no aportó registros — cargar OPENALEX_KEY en Secrets y relanzar',
        last_run_at: new Date().toISOString(),
      }).eq('id', 1);
      const aportaron = Object.entries(sources_ok).filter(([, n]) => n > 0).map(([s]) => s).join(' + ') || 'ninguna';
      return J({ ok: false, line, error: `OpenAlex (troncal) devolvió 0 registros → discovery incompleto (solo ${aportaron}); nada insertado. ${errores.find((e) => e.startsWith('openalex')) ?? ''}`.trim(), sources_ok, unique: unique.length, would_insert: rows.length, raw: all.length }, 502);
    }

    if (rows.length) await sb.from('research_papers').upsert(rows, { onConflict: 'doi', ignoreDuplicates: true });
    await sb.from('research_engine_state').update({
      run_state: 'running', papers_today: unique.length, sources_ok, last_error,
      next_checkpoint: troncalOk ? 'Screening (incluir/excluir en la app)' : 'Screening (incluir/excluir en la app) · AVISO: corrió sin OpenAlex (strict=false)',
      last_run_at: new Date().toISOString(),
    }).eq('id', 1);
    await sb.from('research_agent_tasks').update({ estado: 'working' }).eq('line', line).eq('agent', 'lead');
    await sb.from('research_agent_tasks').update({ estado: 'queued' }).eq('line', line).in('agent', ['intro', 'methods']);
    return J({ ok: true, line, unique: unique.length, inserted: rows.length, raw: all.length, sources_ok, warnings: errores });
  } catch (e) { return J({ ok: false, error: String(e).slice(0, 300) }, 500); }
});
