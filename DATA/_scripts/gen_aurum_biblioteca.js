/**
 * gen_aurum_biblioteca.js — GENERADOR de la "Biblioteca por NIVELES de AURUM".
 *
 * Lee   DATA/BIBLIOTECA/_aurum_biblioteca.json  (1 categoría AURUM, 6 niveles
 *        Mentalidad→Cierre high-ticket, ~13 libros con audiolibros Spotify/YouTube
 *        + compra).
 * Emite  src/lib/aurumBiblioteca.ts             (tipos + datos deterministas).
 *
 * Regla de audio (igual que gen_biblioteca.js / BibliotecaHome): el link de audio
 * SOLO se emite si la url no está vacía y la confianza !== 'no_existe'.
 *
 * 100% determinista: sin Date.now / Math.random. Re-ejecutable:
 *      node DATA/_scripts/gen_aurum_biblioteca.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SRC_JSON = path.join(ROOT, 'DATA', 'BIBLIOTECA', '_aurum_biblioteca.json');
const OUT_TS = path.join(ROOT, 'src', 'lib', 'aurumBiblioteca.ts');

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

  const niveles = []; // { nivel, label, objetivo, libros:[...] }
  let totLibros = 0;

  for (const nv of raw.niveles || []) {
    const libros = [];
    for (const l of nv.libros || []) {
      libros.push({
        titulo: l.titulo,
        autor: l.autor,
        porQue: l.por_que || '',
        terminologia: l.terminologia_clave || [],
        audioYoutube: audioUrl(l.audiolibro_youtube),
        audioSpotify: audioUrl(l.audiolibro_spotify),
        compraUrl: l.compra && l.compra.url ? l.compra.url : undefined,
        compraTienda: l.compra && l.compra.tienda ? l.compra.tienda : undefined,
        idioma: l.idioma || 'en',
      });
      totLibros++;
    }
    niveles.push({ nivel: nv.nivel, label: nv.label, objetivo: nv.objetivo || '', libros });
  }

  writeTs(raw.categoria || 'AURUM', raw.intro_terminologia || '', niveles);

  console.log('── Biblioteca por NIVELES de AURUM — generado ──');
  console.log(`Categoría: ${raw.categoria || 'AURUM'}`);
  console.log(`Niveles (${niveles.length}): ${niveles.map((n) => `${n.nivel}·${n.label.replace(/^Nivel \d+ - /, '')} (${n.libros.length})`).join('  |  ')}`);
  console.log(`Total libros: ${totLibros}`);
}

function writeTs(categoria, intro, niveles) {
  const L = [];
  L.push('/**');
  L.push(' * aurumBiblioteca.ts — GENERADO por DATA/_scripts/gen_aurum_biblioteca.js desde');
  L.push(' * DATA/BIBLIOTECA/_aurum_biblioteca.json. NO editar a mano.');
  L.push(' *');
  L.push(' * Biblioteca por NIVELES de AURUM (closer de élite): 6 niveles');
  L.push(' * (Mentalidad → Cierre high-ticket), ~13 libros con audiolibros');
  L.push(' * (Spotify/YouTube) + link de compra. Mismo formato que la Biblioteca del Home.');
  L.push(' * El link de audio se emite solo si la url no está vacía y la confianza !== \'no_existe\'.');
  L.push(' * Regenerar:  node DATA/_scripts/gen_aurum_biblioteca.js');
  L.push(' */');
  L.push('');
  L.push('export interface AurumBibLibro {');
  L.push('  titulo: string;');
  L.push('  autor: string;');
  L.push('  porQue: string;');
  L.push('  terminologia: string[];');
  L.push('  audioYoutube?: string;');
  L.push('  audioSpotify?: string;');
  L.push('  compraUrl?: string;');
  L.push('  compraTienda?: string;');
  L.push('  idioma: string;');
  L.push('}');
  L.push('');
  L.push('export interface AurumBibNivel {');
  L.push('  nivel: number;');
  L.push('  label: string;');
  L.push('  objetivo: string;');
  L.push('  libros: AurumBibLibro[];');
  L.push('}');
  L.push('');
  L.push(`export const AURUM_BIBLIOTECA_CATEGORIA = ${tsStr(categoria)};`);
  L.push(`export const AURUM_BIBLIOTECA_INTRO = ${tsStr(intro)};`);
  L.push('');
  L.push('export const AURUM_BIBLIOTECA_NIVELES: AurumBibNivel[] = [');
  for (const nv of niveles) {
    L.push('  {');
    L.push(`    nivel: ${nv.nivel}, label: ${tsStr(nv.label)}, objetivo: ${tsStr(nv.objetivo)},`);
    L.push('    libros: [');
    for (const b of nv.libros) {
      const parts = [
        `titulo: ${tsStr(b.titulo)}`,
        `autor: ${tsStr(b.autor)}`,
        `porQue: ${tsStr(b.porQue)}`,
        `terminologia: ${tsArr(b.terminologia)}`,
      ];
      if (b.audioYoutube) parts.push(`audioYoutube: ${tsStr(b.audioYoutube)}`);
      if (b.audioSpotify) parts.push(`audioSpotify: ${tsStr(b.audioSpotify)}`);
      if (b.compraUrl) parts.push(`compraUrl: ${tsStr(b.compraUrl)}`);
      if (b.compraTienda) parts.push(`compraTienda: ${tsStr(b.compraTienda)}`);
      parts.push(`idioma: ${tsStr(b.idioma)}`);
      L.push(`      { ${parts.join(', ')} },`);
    }
    L.push('    ],');
    L.push('  },');
  }
  L.push('];');
  L.push('');
  L.push('/** Lista plana de todos los libros de AURUM (para conteos y lookups). */');
  L.push('export const AURUM_BIBLIOTECA_LIBROS: AurumBibLibro[] =');
  L.push('  AURUM_BIBLIOTECA_NIVELES.flatMap((nv) => nv.libros);');
  L.push('');
  fs.writeFileSync(OUT_TS, L.join('\n'), 'utf8');
}

main();
