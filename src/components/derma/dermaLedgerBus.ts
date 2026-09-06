/**
 * dermaLedgerBus — pub/sub mínimo para que los componentes Derma (lámina, dictado, drill, widget de
 * debilidades del Hub, checkpoints) se refresquen cuando alguien escribe en dermaLedger.ts.
 * El ledger vive en localStorage ('jmd-derma-casos' / 'jmd-derma-fallos'); aquí NO se persiste nada.
 */
import { useCallback, useEffect, useState } from 'react';
import { dermaLedgerLoad, type DermaLedgerEntry } from '../../lib/dermaLedger';

type Listener = () => void;
const listeners = new Set<Listener>();

/** Avisar a todos los suscriptores de que el ledger cambió (llamar tras cada dermaLedgerAppend / import). */
export function notifyDermaLedger(): void {
  listeners.forEach((l) => { try { l(); } catch { /* no-op */ } });
}
export function subscribeDermaLedger(l: Listener): () => void {
  listeners.add(l);
  return () => { listeners.delete(l); };
}

/** Hook: entradas del ledger re-leídas en cada notifyDermaLedger(). `tick` sirve como dependencia. */
export function useDermaLedger(): { entries: DermaLedgerEntry[]; tick: number; refresh: () => void } {
  const [tick, setTick] = useState(0);
  const [entries, setEntries] = useState<DermaLedgerEntry[]>(() => dermaLedgerLoad());
  const refresh = useCallback(() => { setEntries(dermaLedgerLoad()); setTick((t) => t + 1); }, []);
  useEffect(() => subscribeDermaLedger(refresh), [refresh]);
  return { entries, tick, refresh };
}

/** Fecha local YYYY-MM-DD (la sesión se registra con la fecha real en que se hace). */
export function dermaHoyISO(): string {
  try {
    const d = new Date(); const z = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
  } catch { return '2026-09-07'; }
}

/** Copia texto al portapapeles (web). Devuelve false si no hay clipboard. */
export function dermaCopiar(texto: string): boolean {
  try { const nav: any = (globalThis as any).navigator; if (nav?.clipboard?.writeText) { nav.clipboard.writeText(texto); return true; } } catch { /* sin clipboard */ }
  return false;
}
/** Descarga un fichero de texto (web, Blob + <a download>). Devuelve false si la plataforma no lo permite. */
export function dermaDescargar(nombre: string, contenido: string, mime = 'application/json'): boolean {
  try {
    const doc: any = (globalThis as any).document; const win: any = globalThis as any;
    if (!doc || !win.Blob || !win.URL?.createObjectURL) return false;
    const blob = new win.Blob([contenido], { type: mime });
    const a = doc.createElement('a'); a.href = win.URL.createObjectURL(blob); a.download = nombre;
    doc.body.appendChild(a); a.click(); doc.body.removeChild(a); setTimeout(() => win.URL.revokeObjectURL(a.href), 1000);
    return true;
  } catch { return false; }
}
/** ¿Es viernes (día de exportar el ledger)? */
export function dermaEsViernes(fechaISO: string): boolean {
  try { return new Date(fechaISO + 'T12:00:00').getDay() === 5; } catch { return false; }
}

/** Etiquetas de UI compartidas (módulo CORE del banco de 200 casos). */
export const DERMA_AREA_LABEL: Record<'Med' | 'Path' | 'Peds' | 'Surg', string> = {
  Med: 'Medical', Path: 'Dermpath', Peds: 'Pediátrica', Surg: 'Quirúrgica',
};
export const DERMA_AREA_COLOR: Record<'Med' | 'Path' | 'Peds' | 'Surg', string> = {
  Med: '#9A7BC8', Path: '#7C83D6', Peds: '#6BB8B0', Surg: '#B8934E',
};
