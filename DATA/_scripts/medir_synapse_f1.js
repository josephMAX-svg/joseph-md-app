// medir_synapse_f1.js — MIDE el material del SYNAPSE de F1 (17-nov-2026 → 3-ene-2027) y escribe DATA/SYNAPSE/medidas_f1.json
// (v6.09b · S1, auditoría tiempo ↔ material, hallazgos a2-4 / a2-5 / a2-6). Lo lee gen_synapse_plan.js para trocear por FECHA cada lectura,
// audio y vídeo de F1 con su tamaño real.
//
// Uso: node DATA/_scripts/medir_synapse_f1.js <dir_descargas>
//   <dir_descargas> = copias de las páginas PÚBLICAS (curl, sin iniciar sesión) en subcarpetas: py/ (docs.python.org/3/tutorial/*.html),
//   atbs/ (automatetheboringstuff.com/3e/chapterN.html → cN.html), progit/ (git-scm.com/book/en/v2/* → NNN_<slug>.html), art/ (simonwillison.net y
//   anthropic.com: pi1, w2-w7, trifecta, manyshot, constclass, rsp) y yt/ (páginas de YouTube y de dwarkesh.com: lengthSeconds, capítulos de la
//   descripción, timestamps del episodio). Las descargas NO se versionan (repo público; el material es de sus autores): aquí solo se guardan NÚMEROS
//   (palabras por párrafo, segundos por capítulo) y títulos de sección o de capítulo, nunca el texto.
// Regla de conteo = la de la auditoría (audit609/sec/words.js): tokens [A-Za-z0-9][A-Za-z0-9'’\-.]*; da 741 en Python §1 («≈730» de la guía) y 805 en
// Pro Git 1.1 («≈800»). Un «párrafo» es un <p>; el código, las listas y las tablas que le siguen suman sus palabras a ese párrafo (localizador = sección +
// n.º de párrafo, sin citar el texto).
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = process.argv[2];
if (!DIR || !fs.existsSync(DIR)) throw new Error('uso: node DATA/_scripts/medir_synapse_f1.js <dir_descargas>');
const ROOT = path.join(__dirname, '..', '..');
const OUT = path.join(ROOT, 'DATA/SYNAPSE/medidas_f1.json');

const ent = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#39;|&#x27;|&rsquo;|&#8217;/g, '’').replace(/&lsquo;|&#8216;/g, '‘').replace(/&ldquo;|&rdquo;|&#8220;|&#8221;/g, '"').replace(/&[a-z#0-9]+;/gi, ' ');
const nw = (t) => (t.match(/[A-Za-z0-9][A-Za-z0-9'’\-.]*/g) || []).length;
function cuerpo(html, tipo) {
  let h = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const corta = (a, b) => { const i = h.indexOf(a); if (i < 0) return; const j = b ? h.indexOf(b, i) : -1; h = h.slice(i, j > i ? j : undefined); };
  if (tipo === 'py') corta('role="main"', 'class="sphinxsidebar"');
  if (tipo === 'progit') corta('<div id="main"', '<div id="nav">');
  if (tipo === 'atbs') corta('<body');
  if (tipo === 'sw') corta('<div class="entry entryPage">', '<div class="entryFooter">');
  if (tipo === 'ant') { const a = h.search(/<article|<main/i); const b = h.search(/<footer/i); if (a > 0) h = h.slice(a, b > a ? b : undefined); }
  return h;
}
/** secciones [{t, p: [palabras por párrafo]}] de una página; `pre` = palabras antes del 1.er encabezado (va a la sección del título de la página) */
function secciones(html, tipo, tituloPagina) {
  const h = cuerpo(html, tipo);
  const parts = h.split(/(?=<(?:h[1-6]|p|pre|li|dt|dd|table|blockquote)[\s>])/i);
  const sec = [{ t: tituloPagina, p: [] }];
  for (const part of parts) {
    const m = /^<(h[1-6]|p|pre|li|dt|dd|table|blockquote)/i.exec(part);
    const txt = ent(part.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
    if (!txt) continue;
    const tag = m ? m[1].toLowerCase() : '';
    if (/^h[1-6]$/.test(tag)) {
      const c = new RegExp(`</${tag}>`, 'i').exec(part);
      const head = ent((c ? part.slice(0, c.index) : part).replace(/<[^>]+>/g, ' ')).replace(/¶/g, '').replace(/\s+/g, ' ').trim();
      const resto = c ? nw(ent(part.slice(c.index).replace(/<[^>]+>/g, ' '))) : 0;
      const cur = sec[sec.length - 1];
      if (!cur.p.length && cur.t === tituloPagina && sec.length === 1) cur.t = head || tituloPagina; // el 1.er encabezado ES el título de la página
      else sec.push({ t: head, p: [] });
      sec[sec.length - 1].hw = nw(head);
      if (resto) sec[sec.length - 1].p.push(resto);
      continue;
    }
    const w = nw(txt);
    const cur = sec[sec.length - 1];
    if (tag === 'p' || !cur.p.length) cur.p.push(w); else cur.p[cur.p.length - 1] += w;
  }
  // el título de cada sección cuenta como lectura: se suma a su 1.er párrafo
  for (const s of sec) { if (s.hw) { if (s.p.length) s.p[0] += s.hw; else s.p.push(s.hw); } delete s.hw; }
  return sec.filter((s) => s.p.length && s.p.some((x) => x > 0));
}
const lee = (sub, f) => fs.readFileSync(path.join(DIR, sub, f), 'utf8');
const total = (secs) => secs.reduce((a, s) => a + s.p.reduce((x, y) => x + y, 0), 0);
const lectura = {};
const fuente = (id, titulo, url, secs, extra = {}) => { lectura[id] = { titulo, url, total: total(secs), ...extra, secciones: secs }; };

// ── The Python Tutorial §1-§7 (miércoles de F1) ──
const PY = [['appetite', 'Whetting Your Appetite'], ['interpreter', 'Using the Python Interpreter'], ['introduction', 'An Informal Introduction to Python'],
  ['controlflow', 'More Control Flow Tools'], ['datastructures', 'Data Structures'], ['modules', 'Modules'], ['inputoutput', 'Input and Output']];
PY.forEach(([f, t], i) => fuente(`py${i + 1}`, `The Python Tutorial › ${i + 1} «${t}»`, `https://docs.python.org/3/tutorial/${f}.html`, secciones(lee('py', f + '.html'), 'py', `${i + 1}. ${t}`)));
// ── Automate the Boring Stuff 3e cap. 0-6 (jueves de F1) ──
const AT = ['Introduction', 'Python Basics', 'if-else and Flow Control', 'Loops', 'Functions', 'Debugging', 'Lists'];
AT.forEach((t, i) => fuente(`atbs${i}`, `Automate the Boring Stuff 3e › cap. ${i} «${t}»`, `https://automatetheboringstuff.com/3e/chapter${i}.html`, secciones(lee('atbs', `c${i}.html`), 'atbs', t)));
// ── Pro Git cap. 1, 2, 3 y 6 (lunes de F1; el cap. 6 sigue el lun 4-ene) — una página por sección ──
const PG = { 1: [1, 8, 'Getting Started'], 2: [9, 16, 'Git Basics'], 3: [17, 23, 'Git Branching'], 6: [38, 43, 'GitHub'] };
for (const [cap, [a, b, t]] of Object.entries(PG)) {
  const files = fs.readdirSync(path.join(DIR, 'progit')).filter((f) => { const n = Number(f.slice(0, 3)); return n >= a && n <= b; }).sort();
  const secs = [];
  files.forEach((f, k) => {
    const slug = f.slice(4, -5).replace(/_3F$/, '%3F');
    const s = secciones(lee('progit', f), 'progit', `${cap}.${k + 1}`);
    if (s[0]) s[0].t = `${cap}.${k + 1} ${s[0].t.replace(/^\d+\.\d+\s*/, '')}`;
    for (const x of s) x.url = `https://git-scm.com/book/en/v2/${slug}`;
    secs.push(...s);
  });
  fuente(`progit${cap}`, `Pro Git › cap. ${cap} «${t}»`, `https://git-scm.com/book/en/v2/${files[0].slice(4, -5)}`, secs);
}
// ── Artículos (Willison · Anthropic) ──
const ART = [
  ['pi1', 'sw', 'Simon Willison · «Prompt injection attacks against GPT-3» (12-sep-2022)', 'https://simonwillison.net/2022/Sep/12/prompt-injection/'],
  ['w2', 'sw', 'Simon Willison · «I don’t know how to solve prompt injection» (16-sep-2022)', 'https://simonwillison.net/2022/Sep/16/prompt-injection-solutions/'],
  ['w3', 'sw', 'Simon Willison · «You can’t solve AI security problems with more AI» (17-sep-2022)', 'https://simonwillison.net/2022/Sep/17/prompt-injection-more-ai/'],
  ['w4', 'sw', 'Simon Willison · «A new AI game: Give me ideas for crimes to do» (4-dic-2022)', 'https://simonwillison.net/2022/Dec/4/give-me-ideas-for-crimes-to-do/'],
  ['w5', 'sw', 'Simon Willison · «Bing: “I will not harm you unless you harm me first”» (15-feb-2023)', 'https://simonwillison.net/2023/Feb/15/bing/'],
  ['w6', 'sw', 'Simon Willison · «Prompt injection: What’s the worst that can happen?» (14-abr-2023)', 'https://simonwillison.net/2023/Apr/14/worst-that-can-happen/'],
  ['w7', 'sw', 'Simon Willison · «The Dual LLM pattern for building AI assistants that can resist prompt injection» (25-abr-2023)', 'https://simonwillison.net/2023/Apr/25/dual-llm-pattern/'],
  ['trifecta', 'sw', 'Simon Willison · «The lethal trifecta for AI agents» (16-jun-2025)', 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/'],
  ['manyshot', 'ant', 'Anthropic Research · «Many-shot jailbreaking»', 'https://www.anthropic.com/research/many-shot-jailbreaking'],
  ['constclass', 'ant', 'Anthropic Research · «Constitutional Classifiers: Defending against universal jailbreaks»', 'https://www.anthropic.com/research/constitutional-classifiers'],
  ['rsp', 'ant', 'Anthropic · «Introducing Anthropic’s Responsible Scaling Policy»', 'https://www.anthropic.com/news/anthropics-responsible-scaling-policy'],
];
for (const [id, tipo, titulo, url] of ART) {
  let secs = secciones(lee('art', id + '.html'), tipo, titulo.replace(/^[^«]*«|»[^»]*$/g, ''));
  if (tipo === 'ant') secs = secs.filter((s) => !/^0?1 |^Change log$|^Join our team$|^Footnotes$|^Authors|^Acknowledgements$/i.test(s.t)); // índice lateral, pie y créditos: no son lectura
  fuente(id, titulo, url, secs);
}

// ── Audio / vídeo: duración (lengthSeconds / duration del reproductor) + capítulos (descripción del vídeo / timestamps del episodio) ──
const hms = (s) => s.split(':').reduce((a, x) => a * 60 + Number(x), 0);
function yt(f) {
  const h = lee('yt', f);
  const seg = Number((/"lengthSeconds":"(\d+)"/.exec(h) || [])[1] || (/"duration":\s*(\d+)/.exec(h) || [])[1]);
  const md = /"shortDescription":"((?:[^"\\]|\\.)*)"/.exec(h);
  let d = ''; try { d = md ? JSON.parse('"' + md[1] + '"') : ''; } catch { d = ''; }
  const caps = [];
  for (const l of d.split('\n')) { const m = /^\(?(\d{1,2}:\d{2}(?::\d{2})?)\)?\s*[-–]?\s*(.+)$/.exec(l.trim()); if (m) caps.push([hms(m[1]), m[2].trim()]); }
  return { seg, caps };
}
function dwarkesh(f) {
  const h = lee('yt', f);
  const seg = Number((/"duration":\s*(\d+)/.exec(h) || [])[1]);
  const t = ent(h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, '\n'));
  const caps = []; const vistos = new Set();
  for (const l of t.split('\n')) { const m = /^\((\d{1,2}:\d{2}:\d{2})\)\s*-\s*(.+?)\s*$/.exec(l.trim()); if (m && !vistos.has(m[1])) { vistos.add(m[1]); caps.push([hms(m[1]), m[2]]); } }
  return { seg, caps };
}
const audio = {
  deepDivePE: { titulo: 'Canal Anthropic · «AI prompt engineering: A deep dive»', url: 'https://www.youtube.com/watch?v=T9aRN5JkmL8', ...yt('T9aRN5JkmL8.html') },
  tips: { titulo: 'Canal Anthropic · «Tips for building AI agents»', url: 'https://www.youtube.com/watch?v=LP5OCa20Zpg', ...yt('LP5OCa20Zpg.html') },
  building: { titulo: 'Canal Anthropic · «Building Anthropic | A conversation with our co-founders»', url: 'https://www.youtube.com/watch?v=om2lIWXLLN4', ...yt('om2lIWXLLN4.html') },
  alignment: { titulo: 'Canal Anthropic · «How difficult is AI alignment? | Anthropic Research Salon»', url: 'https://www.youtube.com/watch?v=IPmt8b-qLgk', ...yt('IPmt8b-qLgk.html') },
  interp: { titulo: 'Canal Anthropic · «Interpretability: Understanding how AI models think»', url: 'https://www.youtube.com/watch?v=fGKNUvivvnc', ...yt('fGKNUvivvnc.html') },
  dario: { titulo: 'Dwarkesh · Dario Amodei', url: 'https://www.dwarkesh.com/p/dario-amodei', ...dwarkesh('dw_dario-amodei.html') },
  demis: { titulo: 'Dwarkesh · Demis Hassabis', url: 'https://www.dwarkesh.com/p/demis-hassabis', ...dwarkesh('dw_demis-hassabis.html') },
  sholto: { titulo: 'Dwarkesh · Sholto Douglas & Trenton Bricken: How LLMs actually think', url: 'https://www.dwarkesh.com/p/sholto-douglas-trenton-bricken', ...dwarkesh('dw_sholto-douglas-trenton-bricken.html') },
  // vídeos de los bloques A (pantalla)
  kIntro: { titulo: 'Karpathy · [1hr Talk] Intro to Large Language Models', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', ...yt('zjkBMFhNj_g.html') },
  kDeep: { titulo: 'Karpathy · Deep Dive into LLMs like ChatGPT', url: 'https://www.youtube.com/watch?v=7xTGNNLPyMI', ...yt('7xTGNNLPyMI.html') },
};
for (const v of Object.values(audio)) v.caps.sort((a, b) => a[0] - b[0]);
for (const [k, v] of Object.entries(audio)) if (!v.seg) throw new Error('sin duración: ' + k);

const out = {
  _meta: {
    generado: 'node DATA/_scripts/medir_synapse_f1.js <dir_descargas> (v6.09b · S1, 17-nov-2026)',
    medido: '2026-11-17 · curl de páginas públicas (sin iniciar sesión) · conteo = audit609/sec/words.js',
    reglas: 'lectura en inglés 100 palabras/min · audio/vídeo = duración ÷ velocidad (×1,2 si el paso pide pausas) · paso OK si necesario/asignado ∈ [0,85; 1,15]',
    nota: 'Solo números y títulos de sección/capítulo (localizador = sección + n.º de párrafo). El texto de las fuentes no se guarda (repo público).',
  },
  lectura,
  audio,
};
fs.writeFileSync(OUT, JSON.stringify(out, null, 1).replace(/\[\n\s+(\d[\d,\n\s]*?)\n\s+\]/g, (m, x) => '[' + x.replace(/\s+/g, '') + ']'), 'utf8');
console.log('OK', path.relative(ROOT, OUT), '·', Object.keys(lectura).length, 'lecturas ·', Object.keys(audio).length, 'audios/vídeos');
for (const [k, v] of Object.entries(lectura)) console.log('  ', k.padEnd(10), String(v.total).padStart(6), 'palabras ·', v.secciones.length, 'secciones');
for (const [k, v] of Object.entries(audio)) console.log('  ', k.padEnd(10), (v.seg / 60).toFixed(2).padStart(7), 'min ·', v.caps.length, 'capítulos');
