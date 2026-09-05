/**
 * dermaDictadoDraft — borrador del PASO ① (dictado morfológico en 8 ejes) por caso.
 * localStorage 'jmd-derma-dictado' (try/catch; sin storage = no-op). NO es el ledger: la puntuación 0-8
 * viaja al ledger (descripcion8ejes) en el ÚNICO registro del caso (DermaCasoRegistro), para no duplicar
 * entradas ni inflar el n del % ciego. El borrador se conserva para releerlo tras la discusión.
 */
export const DERMA_DICTADO_KEY = 'jmd-derma-dictado';

export interface DermaDictadoDraft {
  casoId: number;
  d: number;
  fecha: string;                     // YYYY-MM-DD de la última edición
  texto: string;                     // dictado libre en terminología estándar
  ejes: Record<number, string[]>;    // eje (1-8) → términos elegidos con los chips
  score?: number;                    // autoevaluación 0-8 tras leer la discusión
  ejesOk?: number[];                 // qué ejes se dieron por bien descritos (1-8)
  ts: string;                        // ISO
}

type Store = Record<string, DermaDictadoDraft>;

function leer(): Store {
  try {
    const ls = (globalThis as any).localStorage;
    if (!ls) return {};
    const raw = ls.getItem(DERMA_DICTADO_KEY);
    const obj = raw ? JSON.parse(raw) : {};
    return obj && typeof obj === 'object' ? obj : {};
  } catch { return {}; }
}
function escribir(s: Store): boolean {
  try { const ls = (globalThis as any).localStorage; if (!ls) return false; ls.setItem(DERMA_DICTADO_KEY, JSON.stringify(s)); return true; }
  catch { return false; }
}

export function dermaDictadoLoad(casoId: number): DermaDictadoDraft | undefined {
  const s = leer(); return s[String(casoId)];
}
export function dermaDictadoLoadAll(): DermaDictadoDraft[] {
  return Object.values(leer()).sort((a, b) => (b.ts || '').localeCompare(a.ts || ''));
}
/** Guarda (merge) el borrador de un caso. Devuelve el borrador resultante. */
export function dermaDictadoSave(casoId: number, patch: Partial<Omit<DermaDictadoDraft, 'casoId' | 'ts'>> & { d: number; fecha: string }): DermaDictadoDraft {
  const s = leer();
  const prev = s[String(casoId)];
  const next: DermaDictadoDraft = {
    casoId,
    d: patch.d,
    fecha: patch.fecha,
    texto: patch.texto ?? prev?.texto ?? '',
    ejes: patch.ejes ?? prev?.ejes ?? {},
    score: patch.score === undefined ? prev?.score : patch.score,
    ejesOk: patch.ejesOk ?? prev?.ejesOk,
    ts: new Date().toISOString(),
  };
  s[String(casoId)] = next;
  escribir(s);
  return next;
}
export function dermaDictadoClear(casoId: number): void {
  const s = leer(); delete s[String(casoId)]; escribir(s);
}
/** Puntuación 0-8 del borrador (para pre-rellenar el registro del caso). */
export function dermaDictadoScore(casoId: number): number | undefined {
  const d = dermaDictadoLoad(casoId);
  return typeof d?.score === 'number' ? Math.max(0, Math.min(8, Math.round(d.score))) : undefined;
}
