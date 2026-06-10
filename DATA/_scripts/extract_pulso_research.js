// extract_pulso_research.js — extrae el resultado del workflow pulso-study-research
// a DATA/BUSINESS/ (hormozi-method.md, libros.md, raw) y genera src/lib/businessBooksExtra.ts
const fs = require('fs');
const SRC = process.argv[2];
const wrapper = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const r = wrapper.result || wrapper;

function clean(md) {
  if (!md || typeof md !== 'string') return '';
  let s = md;
  const fence = s.indexOf('```markdown');
  if (fence >= 0) { s = s.slice(fence + 11); const last = s.lastIndexOf('```'); if (last >= 0) s = s.slice(0, last); }
  else { const m = s.search(/(^|\n)#\s/); if (m > 0) s = s.slice(m); }
  return s.trim() + '\n';
}
fs.writeFileSync('DATA/BUSINESS/hormozi-method.md', clean(r.hormoziMd), 'utf8');
fs.writeFileSync('DATA/BUSINESS/libros.md', clean(r.librosMd), 'utf8');
fs.writeFileSync('DATA/BUSINESS/_scrape/research_raw.json', JSON.stringify(r.raw, null, 1), 'utf8');

// ── businessBooksExtra.ts ──
const KW = [
  [1,'obesity code'],[2,'outlive'],[3,'ozempic'],[4,'in defense of food'],[5,'hormone cure'],
  [6,'estrogen matters'],[8,'why we sleep'],[9,'circadian code'],[10,'feeling good'],
  [11,'lost connections'],[12,'how emotions are made'],[13,'adhd 2.0'],[14,'driven to distraction'],
  [15,'smart but scattered'],[16,'come as you are'],[17,'mating in captivity'],[18,'attached'],
  [19,'sex-starved'],[20,'$100m offers'],[21,'$100m leads'],[22,'$100m money models'],
  [23,'influence'],[24,'dotcom secrets'],[25,'expert secrets'],[26,'storybrand'],
  [27,'breakthrough advertising'],[28,'ultralearning'],
];
const libros = (r.raw.books || []).flatMap((b) => (b && b.libros) || []);
const extra = {};
for (const l of libros) {
  const low = (l.titulo || '').toLowerCase();
  const hit = KW.find(([n, k]) => low.includes(k));
  if (!hit) { console.log('  sin match:', l.titulo); continue; }
  const n = hit[0];
  // frase: quedarse con el texto citado (hasta el cierre de comillas) y limpiar acotaciones
  let frase = (l.fraseAncla || '').trim();
  const open = frase.search(/[«"“]/);
  if (open >= 0) {
    const close = frase.slice(open + 1).search(/[»"”]/);
    if (close > 10) frase = frase.slice(open + 1, open + 1 + close);
  }
  frase = frase.replace(/\s*[—(-][^)»"”]*(fiel|cap\.|capítulo|libro|paráfrasis|subtítulo|aforismo|principio|del cap|metáfora|su forma)[^)]*\)?\s*$/i, '');
  frase = frase.replace(/^[«"“'\s]+/, '').replace(/[»"”'\s]+$/g, '').trim();
  if (frase.length > 200) { const cut = frase.slice(0, 200); frase = cut.slice(0, cut.lastIndexOf(' ')) + '…'; }
  const recursos = (l.recursos || []).filter((x) => x.url && /^https?:/.test(x.url)).slice(0, 2)
    .map((x) => ({ titulo: x.titulo.slice(0, 90), url: x.url }));
  extra[n] = { n, frase, recursos };
}
const entries = Object.values(extra).sort((a, b) => a.n - b.n)
  .map((x) => `  ${x.n}: { n: ${x.n}, frase: ${JSON.stringify(x.frase)}, recursos: ${JSON.stringify(x.recursos)} },`)
  .join('\n');
const ts = `/**
 * businessBooksExtra.ts — GENERADO por DATA/_scripts/extract_pulso_research.js desde el
 * workflow pulso-study-research (10 agentes, fuentes verificadas → DATA/BUSINESS/libros.md).
 * Frases-ancla fieles a cada libro + recursos con URL real. NO editar a mano.
 */
export interface LibroExtra {
  n: number;                 // n de ESTUDIO_LIBROS
  frase: string;             // frase-ancla fiel al libro (no inventada)
  recursos?: { titulo: string; url: string }[];
}

export const LIBROS_EXTRA: Record<number, LibroExtra> = {
${entries}
};

/** frase del día (rota por fecha) — solo de libros con frase verificada */
export function fraseDelDia(iso: string): { frase: string; libro: number } | null {
  const all = Object.values(LIBROS_EXTRA).filter((x) => x.frase);
  if (!all.length) return null;
  const seed = parseInt(iso.replace(/-/g, ''), 10) % all.length;
  return { frase: all[seed].frase, libro: all[seed].n };
}
`;
fs.writeFileSync('src/lib/businessBooksExtra.ts', ts, 'utf8');
console.log('OK · libros con extra:', Object.keys(extra).length, '· hormozi-method.md:', clean(r.hormoziMd).length, 'chars · libros.md:', clean(r.librosMd).length, 'chars');
