// research-discovery v2 — discovery EN LA NUBE (boton ▶ web, sin PC) + relevancia para pre-ordenar.
// 3 fuentes gratis (OpenAlex troncal + Europe PMC + PubMed) → dedup DOI → score → upsert research_papers.
//
// ── Copia FIEL del código desplegado en Supabase (proyecto qacynpqdrorpuegsmtcy) ──
// Descargado con get_edge_function el 5-sep-2026 · slug: research-discovery · version 2 · status ACTIVE
// · verify_jwt: true · ezbr_sha256 be42bb2dfe26f36c54e3748493da29e22443bab9a5002865bfa1ef0b16a8c4ca
// Secrets que usa en el runtime (Dashboard → Edge Functions → Secrets): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
// OPENALEX_KEY (opcional), NCBI_KEY (opcional). NO hay secretos en este fichero.
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

async function openalex(q: string) {
  const key = Deno.env.get('OPENALEX_KEY');
  const u = new URL('https://api.openalex.org/works');
  u.searchParams.set('search', q); u.searchParams.set('per_page', '200');
  u.searchParams.set('select', 'id,doi,ids,title,publication_year,open_access');
  if (key) u.searchParams.set('api_key', key);
  const r = await fetch(u, { headers: UA }); if (!r.ok) return [];
  const d = await r.json();
  return (d.results ?? []).map((w: any) => ({ source: 'openalex', doi: normDoi(w.doi), pmid: (w.ids?.pmid ?? '').replace('https://pubmed.ncbi.nlm.nih.gov/', '').replace(/\/$/, '') || null, title: w.title ?? '', year: w.publication_year ?? null, is_oa: w.open_access?.is_oa ?? null }));
}
async function europepmc(q: string) {
  const u = new URL('https://www.ebi.ac.uk/europepmc/webservices/rest/search');
  u.searchParams.set('query', q); u.searchParams.set('format', 'json'); u.searchParams.set('resultType', 'lite'); u.searchParams.set('pageSize', '100');
  const r = await fetch(u, { headers: UA }); if (!r.ok) return [];
  const d = await r.json();
  return (d.resultList?.result ?? []).map((x: any) => ({ source: 'europepmc', doi: normDoi(x.doi), pmid: x.pmid ?? null, title: x.title ?? '', year: x.pubYear ? Number(x.pubYear) : null, is_oa: x.isOpenAccess === 'Y' }));
}
async function pubmed(q: string) {
  const base = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
  const key = Deno.env.get('NCBI_KEY');
  const es = new URL(base + 'esearch.fcgi');
  es.searchParams.set('db', 'pubmed'); es.searchParams.set('term', q); es.searchParams.set('retmax', '100'); es.searchParams.set('retmode', 'json'); es.searchParams.set('tool', 'joseph-md'); es.searchParams.set('email', CONTACT);
  if (key) es.searchParams.set('api_key', key);
  const r1 = await fetch(es, { headers: UA }); if (!r1.ok) return [];
  const ids = (await r1.json()).esearchresult?.idlist ?? []; if (!ids.length) return [];
  const su = new URL(base + 'esummary.fcgi');
  su.searchParams.set('db', 'pubmed'); su.searchParams.set('id', ids.join(',')); su.searchParams.set('retmode', 'json'); su.searchParams.set('tool', 'joseph-md'); su.searchParams.set('email', CONTACT);
  if (key) su.searchParams.set('api_key', key);
  const r2 = await fetch(su, { headers: UA }); if (!r2.ok) return [];
  const res = (await r2.json()).result ?? {};
  return (res.uids ?? []).map((id: string) => { const it = res[id]; const doi = (it.articleids ?? []).find((a: any) => a.idtype === 'doi')?.value; return { source: 'pubmed', doi: normDoi(doi), pmid: id, title: it.title ?? '', year: it.pubdate ? Number(String(it.pubdate).slice(0, 4)) : null, is_oa: null }; });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  const J = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...CORS, 'Content-Type': 'application/json' } });
  try {
    const { line = 'L4' } = await req.json().catch(() => ({}));
    const q = QUERIES[line] ?? QUERIES.L4; const kw = KW[line] ?? KW.L4;
    const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    await sb.from('research_engine_state').update({ run_state: 'running', active_line: SR_OF[line] ?? 'SR-1', last_run_at: new Date().toISOString() }).eq('id', 1);
    const settle = await Promise.allSettled([openalex(q), europepmc(q), pubmed(q)]);
    const all = settle.flatMap((s) => s.status === 'fulfilled' ? s.value : []);
    const seen = new Map<string, any>();
    for (const r of all) {
      const k = r.doi || ('t:' + (r.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 80));
      if (!k || k === 't:') continue;
      if (seen.has(k)) { seen.get(k).sources.add(r.source); continue; }
      r.sources = new Set([r.source]); seen.set(k, r);
    }
    const unique = [...seen.values()];
    const score = (r: any) => { const t = (r.title || '').toLowerCase(); let s = kw.reduce((a, w) => a + (t.includes(w) ? 1 : 0), 0); s += (r.sources.size - 1) * 2; return s; };
    const rows = unique.filter((r) => r.doi).map((r) => ({ ...r, rel: score(r) })).sort((a, b) => b.rel - a.rel).slice(0, 200)
      .map((r) => ({ line: SR_OF[line] ?? 'SR-1', doi: r.doi, pmid: r.pmid, title: r.title, year: r.year, sources: [...r.sources], is_oa: r.is_oa, relevance: r.rel, screen_status: 'pending_human' }));
    if (rows.length) await sb.from('research_papers').upsert(rows, { onConflict: 'doi', ignoreDuplicates: true });
    await sb.from('research_engine_state').update({ run_state: 'running', papers_today: unique.length, next_checkpoint: 'Screening (incluir/excluir en la app)', last_run_at: new Date().toISOString() }).eq('id', 1);
    await sb.from('research_agent_tasks').update({ estado: 'working' }).eq('line', line).eq('agent', 'lead');
    await sb.from('research_agent_tasks').update({ estado: 'queued' }).eq('line', line).in('agent', ['intro', 'methods']);
    return J({ ok: true, line, unique: unique.length, inserted: rows.length, raw: all.length });
  } catch (e) { return J({ ok: false, error: String(e).slice(0, 300) }, 500); }
});
