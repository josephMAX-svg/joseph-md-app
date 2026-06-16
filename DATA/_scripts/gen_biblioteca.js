/**
 * gen_biblioteca.js — GENERADOR de la "Biblioteca del Fundador v2".
 *
 * Lee   DATA/BIBLIOTECA/_biblioteca_niveles.json  (8 categorías, 86 libros por niveles
 *        Base→Maestría, con audiolibros Spotify/YouTube + compra).
 * Emite  src/lib/bibliotecaNiveles.ts            (tipos + datos deterministas).
 * Escribe DATA/BIBLIOTECA/<Categoria>.md          (1 doc por categoría, para futuros chats).
 *
 * Reglas de `n` (para conservar el % de progreso ya existente en booksProgress):
 *  - existente:true  → se matchea contra ESTUDIO_LIBROS (estudioPulsoData.ts) por
 *                       autor (token compartido) + título (substring / overlap) y REUSA su n (1..28).
 *  - existente:false → n secuencial desde 100 (sin colisión con los existentes).
 *
 * 100% determinista: sin Date.now / Math.random. Re-ejecutable:
 *      node DATA/_scripts/gen_biblioteca.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SRC_JSON = path.join(ROOT, 'DATA', 'BIBLIOTECA', '_biblioteca_niveles.json');
const OUT_TS = path.join(ROOT, 'src', 'lib', 'bibliotecaNiveles.ts');
const OUT_MD_DIR = path.join(ROOT, 'DATA', 'BIBLIOTECA');
const EST_TS = path.join(ROOT, 'src', 'lib', 'estudioPulsoData.ts');

// ── Normalización de categorías: quita paréntesis y descripciones → base canónica ──
const CAT_ORDER = ['Peso', 'Hormonal', 'Sueño', 'Mental', 'Foco', 'Pareja', 'Marketing', 'Meta'];
const CAT_COLOR = {
  Peso: '#3FB984', Hormonal: '#E8A0BF', 'Sueño': '#8FB6E8', Mental: '#A78BFA',
  Foco: '#F5A623', Pareja: '#E5708A', Marketing: '#D9BE8A', Meta: '#7BB1FF',
};
function normCategoria(raw) {
  // "Foco (TDAH adulto…)" → "Foco" ; "Pareja (sexualidad…)" → "Pareja"
  const base = String(raw).split('(')[0].trim();
  // tolera acentos/variantes: match contra el orden canónico por prefijo
  const found = CAT_ORDER.find((c) => base.toLowerCase().startsWith(c.toLowerCase()));
  return found || base;
}

// ── Texto helpers (acentos fuera, signos fuera) ──
function norm(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}
const STOP = new Set([
  'dr', 'the', 'and', 'phd', 'md', 'of', 'to', 'an', 'for', 'in', 'on', 'with',
  'version', 'para', 'adultos', 'guide', 'success', 'what', 'do', 'about', 'it',
  'its', 'your', 'you', 'con', 'enfoque', 'capitulo', 'cap',
]);
function tokens(s) {
  return norm(s).split(' ').filter((t) => t.length > 2 && !STOP.has(t));
}

// ── Parse de ESTUDIO_LIBROS desde el TS (sin importar TS en node) ──
function parseEstudioLibros() {
  const ts = fs.readFileSync(EST_TS, 'utf8');
  const re = /\{ n: (\d+), categoria: '[^']*', marca: '[^']*', libro: '([^']*)', autor: '([^']*)'/g;
  const out = []; let m;
  while ((m = re.exec(ts))) out.push({ n: +m[1], libro: m[2], autor: m[3] });
  if (out.length !== 28) {
    console.warn(`⚠ ESTUDIO_LIBROS: esperaba 28, encontré ${out.length}`);
  }
  return out;
}

// ── Matcher existente → n de ESTUDIO_LIBROS (greedy con n disponible) ──
function buildMatcher(estudio) {
  const used = new Set();
  function candidates(libro) {
    const lt = norm(libro.titulo);
    const la = tokens(libro.autor);
    const ltt = tokens(libro.titulo);
    return estudio.map((e) => {
      const ea = tokens(e.autor);
      const shareAuthor = la.some((t) => ea.includes(t));
      if (!shareAuthor) return null;
      const et = norm(e.libro);
      const sub = lt.includes(et) || et.includes(lt);
      const ett = tokens(e.libro);
      const overlap = ett.filter((t) => ltt.includes(t)).length;
      const score = (sub ? 100 : 0) + overlap;
      return score > 0 ? { n: e.n, score } : null;
    }).filter(Boolean).sort((a, b) => b.score - a.score);
  }
  return function matchN(libro) {
    const cand = candidates(libro);
    for (const c of cand) {
      if (!used.has(c.n)) { used.add(c.n); return c.n; }
    }
    return null; // sin match disponible
  };
}

// ── Audio link: solo si url no vacía y confianza !== 'no_existe' ──
function audioUrl(node) {
  if (!node) return undefined;
  const url = (node.url || '').trim();
  if (!url) return undefined;
  if (node.confianza === 'no_existe') return undefined;
  return url;
}

// ── Serializadores TS ──
function tsStr(s) {
  return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ') + "'";
}
function tsArr(arr) {
  return '[' + (arr || []).map(tsStr).join(', ') + ']';
}

function main() {
  const raw = JSON.parse(fs.readFileSync(SRC_JSON, 'utf8'));
  const estudio = parseEstudioLibros();
  const matchN = buildMatcher(estudio);

  // Ordena categorías al orden canónico
  const cats = (raw.categorias || []).slice().sort((a, b) => {
    return CAT_ORDER.indexOf(normCategoria(a.categoria)) - CAT_ORDER.indexOf(normCategoria(b.categoria));
  });

  let nextNew = 100;
  let totExist = 0, totNew = 0;
  const out = []; // { categoria, color, intro, niveles:[{nivel,label,objetivo,libros:[...]}] }

  for (const c of cats) {
    const categoria = normCategoria(c.categoria);
    const color = CAT_COLOR[categoria] || '#D9BE8A';
    const niveles = [];
    for (const nv of c.niveles || []) {
      const libros = [];
      for (const l of nv.libros || []) {
        let n;
        if (l.existente) {
          n = matchN(l);
          if (n == null) {
            console.warn(`⚠ existente sin match → n nuevo: ${l.titulo} · ${l.autor}`);
            n = nextNew++;
          }
          totExist++;
        } else {
          n = nextNew++;
          totNew++;
        }
        libros.push({
          n,
          titulo: l.titulo,
          autor: l.autor,
          categoria,
          nivel: nv.nivel,
          label: nv.label,
          porQue: l.por_que || '',
          terminologia: l.terminologia_clave || [],
          audioYoutube: audioUrl(l.audiolibro_youtube),
          audioSpotify: audioUrl(l.audiolibro_spotify),
          compraUrl: l.compra && l.compra.url ? l.compra.url : undefined,
          compraTienda: l.compra && l.compra.tienda ? l.compra.tienda : undefined,
          existente: !!l.existente,
          idioma: l.idioma || 'en',
        });
      }
      niveles.push({ nivel: nv.nivel, label: nv.label, objetivo: nv.objetivo || '', libros });
    }
    out.push({ categoria, color, intro: c.intro_terminologia || '', niveles });
  }

  writeTs(out);
  writeDocs(out);

  const total = totExist + totNew;
  console.log('── Biblioteca del Fundador v2 — generado ──');
  console.log(`Categorías (${out.length}): ${out.map((o) => `${o.categoria}(${o.niveles.reduce((s, n) => s + n.libros.length, 0)})`).join(', ')}`);
  console.log(`Total libros: ${total}  ·  existentes (n<100): ${totExist}  ·  nuevos (n>=100): ${totNew}`);
  console.log(`Niveles: ${out.map((o) => `${o.categoria}→${o.niveles.map((n) => n.label).join('/')}`).join('  |  ')}`);
}

function writeTs(out) {
  const L = [];
  L.push('/**');
  L.push(' * bibliotecaNiveles.ts — GENERADO por DATA/_scripts/gen_biblioteca.js desde');
  L.push(' * DATA/BIBLIOTECA/_biblioteca_niveles.json. NO editar a mano.');
  L.push(' *');
  L.push(' * Biblioteca del Fundador v2: 86 libros por NIVELES (Base→Maestría), 8 categorías,');
  L.push(' * con audiolibros (Spotify/YouTube) + link de compra. El campo `n` conserva el');
  L.push(' * progreso: existentes reusan su n de ESTUDIO_LIBROS (1..28), nuevos son n>=100.');
  L.push(' * Regenerar:  node DATA/_scripts/gen_biblioteca.js');
  L.push(' */');
  L.push('');
  L.push('export interface BibLibro {');
  L.push('  n: number;');
  L.push('  titulo: string;');
  L.push('  autor: string;');
  L.push('  categoria: string;');
  L.push('  nivel: number;');
  L.push('  label: string;');
  L.push('  porQue: string;');
  L.push('  terminologia: string[];');
  L.push('  audioYoutube?: string;');
  L.push('  audioSpotify?: string;');
  L.push('  compraUrl?: string;');
  L.push('  compraTienda?: string;');
  L.push('  existente: boolean;');
  L.push('  idioma: string;');
  L.push('}');
  L.push('');
  L.push('export interface BibNivel {');
  L.push('  nivel: number;');
  L.push('  label: string;');
  L.push('  objetivo: string;');
  L.push('  libros: BibLibro[];');
  L.push('}');
  L.push('');
  L.push('export interface BibCategoria {');
  L.push('  categoria: string;');
  L.push('  color: string;');
  L.push('  intro: string;');
  L.push('  niveles: BibNivel[];');
  L.push('}');
  L.push('');
  L.push('export const BIBLIOTECA_NIVELES: BibCategoria[] = [');
  for (const c of out) {
    L.push('  {');
    L.push(`    categoria: ${tsStr(c.categoria)},`);
    L.push(`    color: ${tsStr(c.color)},`);
    L.push(`    intro: ${tsStr(c.intro)},`);
    L.push('    niveles: [');
    for (const nv of c.niveles) {
      L.push('      {');
      L.push(`        nivel: ${nv.nivel}, label: ${tsStr(nv.label)}, objetivo: ${tsStr(nv.objetivo)},`);
      L.push('        libros: [');
      for (const b of nv.libros) {
        const parts = [
          `n: ${b.n}`,
          `titulo: ${tsStr(b.titulo)}`,
          `autor: ${tsStr(b.autor)}`,
          `categoria: ${tsStr(b.categoria)}`,
          `nivel: ${b.nivel}`,
          `label: ${tsStr(b.label)}`,
          `porQue: ${tsStr(b.porQue)}`,
          `terminologia: ${tsArr(b.terminologia)}`,
        ];
        if (b.audioYoutube) parts.push(`audioYoutube: ${tsStr(b.audioYoutube)}`);
        if (b.audioSpotify) parts.push(`audioSpotify: ${tsStr(b.audioSpotify)}`);
        if (b.compraUrl) parts.push(`compraUrl: ${tsStr(b.compraUrl)}`);
        if (b.compraTienda) parts.push(`compraTienda: ${tsStr(b.compraTienda)}`);
        parts.push(`existente: ${b.existente}`);
        parts.push(`idioma: ${tsStr(b.idioma)}`);
        L.push(`          { ${parts.join(', ')} },`);
      }
      L.push('        ],');
      L.push('      },');
    }
    L.push('    ],');
    L.push('  },');
  }
  L.push('];');
  L.push('');
  L.push('/** Lista plana de todos los libros (para % global y lookups por n). */');
  L.push('export const BIBLIOTECA_LIBROS: BibLibro[] = BIBLIOTECA_NIVELES.flatMap((c) =>');
  L.push('  c.niveles.flatMap((nv) => nv.libros),');
  L.push(');');
  L.push('');
  fs.writeFileSync(OUT_TS, L.join('\n'), 'utf8');
}

function writeDocs(out) {
  for (const c of out) {
    const M = [];
    M.push(`# Biblioteca del Fundador — ${c.categoria}`);
    M.push('');
    M.push('> GENERADO por `DATA/_scripts/gen_biblioteca.js`. Niveles Base→Maestría. Audiolibros + compra verificados.');
    M.push('');
    if (c.intro) { M.push('**Terminología base:** ' + c.intro); M.push(''); }
    const totalLibros = c.niveles.reduce((s, n) => s + n.libros.length, 0);
    M.push(`**${totalLibros} libros · ${c.niveles.length} niveles**`);
    M.push('');
    for (const nv of c.niveles) {
      M.push(`## Nivel ${nv.nivel} · ${nv.label}`);
      if (nv.objetivo) { M.push(''); M.push(`*${nv.objetivo}*`); }
      M.push('');
      for (const b of nv.libros) {
        M.push(`### ${b.titulo} — ${b.autor}${b.existente ? '' : '  · NUEVO'}`);
        M.push(`- **n:** ${b.n}  ·  **idioma:** ${b.idioma}`);
        if (b.porQue) M.push(`- **Por qué:** ${b.porQue}`);
        if (b.terminologia && b.terminologia.length) M.push(`- **Terminología:** ${b.terminologia.join(' · ')}`);
        if (b.audioSpotify) M.push(`- 🎧 **Spotify:** ${b.audioSpotify}`);
        if (b.audioYoutube) M.push(`- ▶ **YouTube:** ${b.audioYoutube}`);
        if (b.compraUrl) M.push(`- 🛒 **Comprar** (${b.compraTienda || 'tienda'}): ${b.compraUrl}`);
        M.push('');
      }
    }
    const file = path.join(OUT_MD_DIR, `${c.categoria}.md`);
    fs.writeFileSync(file, M.join('\n'), 'utf8');
  }
}

main();
