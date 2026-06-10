/**
 * obsidianEncaps.ts — resuelve el deep-link Obsidian de un tema/video ENCAPS por NOMBRE.
 * Los títulos del plan (QX/Theomed, Supabase) no comparten numeración con las carpetas
 * del vault, así que se matchea por solape de palabras contra los 94 subtemas oficiales
 * (ENCAPS_BLOCKS_STATIC). Si el código trae el bloque romano (p. ej. "II-3"), se busca
 * solo dentro de ese bloque. Si no hay match confiable → Mapa del vault (nunca un link roto).
 */
import { ENCAPS_BLOCKS_STATIC } from './encapsBlocks';
import { encapsObsUrl, OBS_MAPA_URL } from './obsidianMap';

const ROMAN_TO_BLOCK: Record<string, string> = {
  I: 'salud_publica', II: 'cuidado_integral', III: 'etica_interculturalidad',
  IV: 'investigacion', V: 'gestion_salud',
};
const STOP = new Set(['de', 'la', 'el', 'los', 'las', 'del', 'y', 'en', 'para', 'con', 'a', 'al', 'su', 'sus', 'una', 'un', 'por', 'que', 'se']);
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const toks = (s: string) => new Set(norm(s).split(' ').filter((w) => w.length > 2 && !STOP.has(w)));

interface Sub { blockId: string; id: string; tokens: Set<string> }
let INDEX: Sub[] | null = null;
function indexSubtemas(): Sub[] {
  if (INDEX) return INDEX;
  INDEX = [];
  for (const b of ENCAPS_BLOCKS_STATIC) {
    for (const s of b.subtemas_detalle) {
      INDEX.push({ blockId: b.id, id: s.id, tokens: toks(s.id.replace(/^\d+_/, '').replace(/_/g, ' ')) });
    }
  }
  return INDEX;
}

/** URL Obsidian para un tema/video ENCAPS. `code` opcional tipo "II-3" acota el bloque. */
export function encapsObsByTitle(titulo: string, code?: string): string {
  const t = toks(titulo);
  if (!t.size) return OBS_MAPA_URL;
  const roman = code ? (code.match(/^(I{1,3}|IV|V)\b/i) || [])[1] : undefined;
  const blockId = roman ? ROMAN_TO_BLOCK[roman.toUpperCase()] : undefined;
  let cands = indexSubtemas();
  if (blockId) cands = cands.filter((x) => x.blockId === blockId);
  let best: Sub | null = null, bestScore = 0;
  for (const c of cands) {
    const inter = [...c.tokens].filter((w) => t.has(w)).length;
    if (!inter) continue;
    const score = inter / Math.min(c.tokens.size, t.size); // contención (títulos QX ≈ subconjunto)
    if (score > bestScore) { bestScore = score; best = c; }
  }
  if (best && bestScore >= 0.5) return encapsObsUrl(best.blockId, best.id) || OBS_MAPA_URL;
  return OBS_MAPA_URL;
}
