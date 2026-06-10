// extract_content_extras.js — del workflow content-tools-referents → src/lib/brandContentExtras.ts
// + DATA/BUSINESS/content-calendar.md (raw a _scrape/). Curado: solo lo más accionable.
const fs = require('fs');
const SRC = process.argv[2];
const w = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const r = w.result || w;
fs.writeFileSync('DATA/BUSINESS/_scrape/content_tools_referents_raw.json', JSON.stringify(r, null, 1), 'utf8');

const firstUrl = (u) => {
  const m = (u || '').match(/https?:\/\/[^\s|·]+/);
  return m ? m[0] : '';
};
const cut = (s, n) => { s = (s || '').trim(); return s.length > n ? s.slice(0, n).slice(0, s.slice(0, n).lastIndexOf(' ')) + '…' : s; };

// ── HERRAMIENTAS (curadas: las que Claude Code puede operar ya) ──
const WANT_TOOLS = ['Canva', 'CapCut', 'Clipchamp', 'Veo', 'Google Flow', 'Meta Business Suite', 'TikTok Studio', 'YouTube Studio', 'Adobe Express'];
const tools = [];
for (const it of (r.tools && r.tools.items) || []) {
  const hit = WANT_TOOLS.find((wt) => it.nombre.includes(wt));
  if (!hit) continue;
  tools.push({
    nombre: it.nombre.replace(' — DESCONTINUADA', ''),
    tipo: cut(it.tipo, 38),
    url: firstUrl(it.url),
    nota: cut(`${it.porQue} ${it.automatizable ? '· ' + it.automatizable : ''}`, 180),
  });
}
// nota Sora si está
const sora = ((r.tools && r.tools.items) || []).find((x) => /Sora/i.test(x.nombre));

// ── REFERENTES curados por marca ──
const WANT_PULSO = ['Borja Bandera', 'Isabel Viña', 'Rawdy', 'Doctor Mike', 'Karan Rajan', 'Marian Rojas', 'Breus', 'Arrieta', 'Farmacéutico Fernández', 'Nadolsky'];
const WANT_PIRQA = ['Casita de Ricardo', 'Waldir', 'Mondalgo', 'Buenazo', 'Perú Foodies', 'Gastón Acurio'];
const WANT_GOLDEN = ['Soul Desire', 'Tucker', 'aguyandagolden', 'A Guy and A Golden', 'My Golden Retriever Puppies', 'Golden Retriever Perú', 'Rebas'];
function pick(items, want) {
  const out = [];
  for (const it of items || []) {
    const hit = want.find((wn) => it.nombre.toLowerCase().includes(wn.toLowerCase()));
    if (!hit) continue;
    out.push({ nombre: cut(it.nombre, 52), red: cut((it.tipo || '').replace(/^\([ab]\)\s*/, '').split('—')[0], 30), url: firstUrl(it.url), porQue: cut(it.porQue, 170) });
  }
  return out;
}
const salud = (r.salud && r.salud.items) || [];
const otros = (r.otros && r.otros.items) || [];
const refs = {
  pulso: pick(salud, WANT_PULSO),
  pirqa: pick(otros, WANT_PIRQA),
  golden: pick(otros, WANT_GOLDEN),
};

const ts = `/**
 * brandContentExtras.ts — GENERADO por DATA/_scripts/extract_content_extras.js desde el
 * workflow content-tools-referents (3 agentes, URLs verificadas; raw en
 * DATA/BUSINESS/_scrape/content_tools_referents_raw.json). NO editar a mano.
 * ⚠ Sora (OpenAI) DESCONTINUADA abr-2026 — usar Veo en Gemini (plan ya pagado) + Google Flow.
 */
export interface Herramienta { nombre: string; tipo: string; url: string; nota: string }
export interface Referente { nombre: string; red: string; url: string; porQue: string }

export const HERRAMIENTAS: Herramienta[] = ${JSON.stringify(tools, null, 2)};

export const REFERENTES: Record<string, Referente[]> = ${JSON.stringify(refs, null, 2)};
`;
fs.writeFileSync('src/lib/brandContentExtras.ts', ts, 'utf8');
console.log('OK · tools:', tools.length, '· refs pulso:', refs.pulso.length, '· pirqa:', refs.pirqa.length, '· golden:', refs.golden.length, '· sora:', sora ? 'descontinuada confirmada' : 'n/a');
