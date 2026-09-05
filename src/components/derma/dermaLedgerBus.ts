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

/** Etiquetas de UI compartidas (módulo CORE del banco de 200 casos). */
export const DERMA_AREA_LABEL: Record<'Med' | 'Path' | 'Peds' | 'Surg', string> = {
  Med: 'Medical', Path: 'Dermpath', Peds: 'Pediátrica', Surg: 'Quirúrgica',
};
export const DERMA_AREA_COLOR: Record<'Med' | 'Path' | 'Peds' | 'Surg', string> = {
  Med: '#9A7BC8', Path: '#7C83D6', Peds: '#6BB8B0', Surg: '#B8934E',
};
