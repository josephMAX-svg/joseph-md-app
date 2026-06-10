/**
 * booksProgress.ts — % leído REAL por libro (manual, empieza en 0%).
 * localStorage 'jmd-books-progress-v1' = { [n]: pct }. Tap = +25% (cicla a 0 tras 100).
 */
const KEY = 'jmd-books-progress-v1';

export function loadBooks(): Record<number, number> {
  try {
    const ls = (globalThis as any).localStorage;
    if (ls) { const raw = ls.getItem(KEY); if (raw) return JSON.parse(raw); }
  } catch { /* sin storage */ }
  return {};
}
export function saveBooks(m: Record<number, number>): void {
  try { const ls = (globalThis as any).localStorage; if (ls) ls.setItem(KEY, JSON.stringify(m)); } catch { /* ignore */ }
}
export function cyclePct(p: number): number { return p >= 100 ? 0 : Math.min(100, p + 25); }
