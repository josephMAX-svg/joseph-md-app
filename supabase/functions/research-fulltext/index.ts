// research-fulltext — resuelve el PDF de ACCESO ABIERTO LEGAL por DOI (Unpaywall → Europe PMC).
// Sin Sci-Hub. Actualiza research_papers.pdf_url/is_oa y devuelve la URL para abrirla desde la app.
//
// ── Copia FIEL del código desplegado en Supabase (proyecto qacynpqdrorpuegsmtcy) ──
// Descargado con get_edge_function el 5-sep-2026 · slug: research-fulltext · version 1 · status ACTIVE
// · verify_jwt: true · ezbr_sha256 90770f573338bef3da24e6708a54b93a54814a9fc00794d73f0d1122d9137267
// Secrets que usa en el runtime: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY. NO hay secretos en este fichero.
// Se invoca de UNO en UNO desde la app (resolveFullText en src/lib/supabase.ts); para resolver en lote los
// 151 OA de SR-1 ver README.md (bucle desde la app o desde fulltext_cascade.py).
import { createClient } from 'jsr:@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const CONTACT = 'josephsototocas@gmail.com';
const UA = { 'User-Agent': `joseph-md-research/1.0 (mailto:${CONTACT})` };

async function unpaywall(doi: string) {
  try {
    const r = await fetch(`https://api.unpaywall.org/v2/${encodeURIComponent(doi)}?email=${encodeURIComponent(CONTACT)}`, { headers: UA });
    if (!r.ok) return null;
    const d = await r.json();
    if (!d.is_oa) return { is_oa: false, pdf_url: null, oa_status: d.oa_status ?? 'closed' };
    const loc = d.best_oa_location ?? {};
    return { is_oa: true, pdf_url: loc.url_for_pdf ?? loc.url ?? null, oa_status: d.oa_status, host_type: loc.host_type, version: loc.version };
  } catch { return null; }
}
async function europepmc(doi: string) {
  try {
    const u = new URL('https://www.ebi.ac.uk/europepmc/webservices/rest/search');
    u.searchParams.set('query', `DOI:${doi}`); u.searchParams.set('format', 'json'); u.searchParams.set('resultType', 'core'); u.searchParams.set('pageSize', '1');
    const r = await fetch(u, { headers: UA }); if (!r.ok) return null;
    const res = (await r.json()).resultList?.result ?? [];
    if (!res.length) return null;
    for (const x of (res[0].fullTextUrlList?.fullTextUrl ?? [])) {
      if (x.availabilityCode === 'OA' && (x.documentStyle === 'pdf' || x.documentStyle === 'html')) return x.url;
    }
    return null;
  } catch { return null; }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  const J = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...CORS, 'Content-Type': 'application/json' } });
  try {
    const { doi } = await req.json().catch(() => ({}));
    if (!doi) return J({ ok: false, error: 'falta doi' }, 400);
    const d = String(doi).toLowerCase();
    const up = await unpaywall(d);
    let pdf = up?.pdf_url ?? null; let stage = 'unpaywall'; let is_oa = !!up?.is_oa;
    if (!pdf) { const ft = await europepmc(d); if (ft) { pdf = ft; stage = 'europepmc'; is_oa = true; } }
    const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    await sb.from('research_papers').update({ pdf_url: pdf, is_oa }).eq('doi', d);
    return J({ ok: true, doi: d, pdf_url: pdf, is_oa, stage: pdf ? stage : 'manual', oa_status: up?.oa_status ?? null,
      note: pdf ? null : 'No OA legal en Unpaywall/EuropePMC. Vias legales: HINARI via UNCP, repositorio, o pedir al autor (fulltext_cascade.py). Nunca Sci-Hub.' });
  } catch (e) { return J({ ok: false, error: String(e).slice(0, 300) }, 500); }
});
