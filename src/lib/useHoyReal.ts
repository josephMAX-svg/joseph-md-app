/**
 * useHoyReal.ts — el día REAL de hoy (reloj local, AAAA-MM-DD: el mismo que synHoyReal / aurumHoyReal / todayISO de cada hub; en los dispositivos de
 * Joseph, Lima) para un componente, que se actualiza solo cuando el día cambia con la pestaña abierta (c45, ítem 42 A):
 *   · a medianoche: un temporizador hasta la siguiente medianoche (la local y la de Lima, la que llegue antes; en Lima son la misma);
 *   · al volver a la pestaña (web: focus / visibilitychange);
 *   · y, como red, una comprobación por minuto (con el equipo suspendido el temporizador largo llega tarde).
 * Solo vuelve a pintar si el día cambió (useSyncExternalStore con la fecha como instantánea). Un único juego de temporizadores y eventos para
 * todos los componentes montados.
 * useSelDeHoy: la selección de fila de un hub (◄/►, «toca un día», el modo) que vuelve a la de hoy cuando cambia el día real; dentro del mismo día
 * se comporta como useState.
 */
import { useState, useCallback, useSyncExternalStore } from 'react';
import type { SetStateAction } from 'react';

const _isoLocal = (d: Date): string => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Día REAL de hoy (reloj local, AAAA-MM-DD). */
export function hoyRealISO(): string { return _isoLocal(new Date()); }

const LIMA_UTC_H = 5; // Lima = UTC-5 todo el año (sin horario de verano): su medianoche es a las 05:00 UTC
/** ms hasta la siguiente medianoche (local o de Lima, la primera) + 1 s de margen. */
function _msHastaMedianoche(ahora: Date = new Date()): number {
  const t = ahora.getTime();
  const local = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1).getTime();
  let lima = Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate(), LIMA_UTC_H);
  if (lima <= t) lima += 24 * 3600 * 1000;
  return Math.max(1000, Math.min(local, lima) - t + 1000);
}

const _subs = new Set<() => void>();
let _timer: ReturnType<typeof setTimeout> | null = null;
let _red: ReturnType<typeof setInterval> | null = null;
const _avisar = (): void => { for (const f of Array.from(_subs)) f(); };
function _armar(): void {
  if (_timer) clearTimeout(_timer);
  _timer = setTimeout(() => { _timer = null; _avisar(); _armar(); }, _msHastaMedianoche());
}
function _alVolver(): void {
  const doc = (globalThis as any).document;
  if (doc && doc.visibilityState === 'hidden') return;
  _avisar();
  _armar(); // tras una suspensión el temporizador pudo quedarse atrás
}
function _suscribir(f: () => void): () => void {
  _subs.add(f);
  if (_subs.size === 1) {
    _armar();
    _red = setInterval(_avisar, 60 * 1000);
    const w = globalThis as any, doc = w.document;
    try { w.addEventListener?.('focus', _alVolver); doc?.addEventListener?.('visibilitychange', _alVolver); } catch { /* sin eventos de ventana (nativo) */ }
  }
  return () => {
    _subs.delete(f);
    if (_subs.size) return;
    if (_timer) { clearTimeout(_timer); _timer = null; }
    if (_red) { clearInterval(_red); _red = null; }
    const w = globalThis as any, doc = w.document;
    try { w.removeEventListener?.('focus', _alVolver); doc?.removeEventListener?.('visibilitychange', _alVolver); } catch { /* ídem */ }
  };
}

/** El día REAL de hoy; el componente vuelve a pintarse cuando cambia (medianoche, vuelta a la pestaña o la comprobación por minuto). */
export function useHoyReal(): string {
  return useSyncExternalStore(_suscribir, hoyRealISO, hoyRealISO);
}

/** Selección (fila, índice, modo…) que arranca en `deHoy` y vuelve a `deHoy` cuando cambia el día real `hoy` (pestaña abierta de un día para otro).
 *  `deHoy` se calcula con el `hoy` de este render (valor o función, como useState). Dentro del mismo día, igual que useState. */
export function useSelDeHoy<T>(hoy: string, deHoy: T | (() => T)): [T, (v: SetStateAction<T>) => void] {
  const ini = (): T => (typeof deHoy === 'function' ? (deHoy as () => T)() : deHoy);
  const [st, setSt] = useState<{ hoy: string; sel: T }>(() => ({ hoy, sel: ini() }));
  const setSel = useCallback((v: SetStateAction<T>) => setSt((p) => ({ hoy: p.hoy, sel: typeof v === 'function' ? (v as (x: T) => T)(p.sel) : v })), []);
  if (st.hoy !== hoy) { // cambió el día: vuelve a la fila de hoy (ajuste de estado durante el render, sin pintar antes la de ayer)
    const sel = ini();
    setSt({ hoy, sel });
    return [sel, setSel];
  }
  return [st.sel, setSel];
}
