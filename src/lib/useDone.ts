/**
 * useDone.ts — los ✓ de un plan para un componente (hubs y planes del día de todos los frentes).
 *   · refresca el estado cada vez que avisa onProgressSync (pull con lo marcado en otro dispositivo, push confirmado, import, y —c45— otra
 *     pestaña de este navegador que cambia la caché: evento 'storage') y al volver a la pestaña (web: focus / visibilitychange), que
 *     además lanza el pull si toca;
 *   · cada marca parte de lo guardado en ese momento (marcarDone) y solo cambia esa fila: un estado montado antes del pull
 *     ya no puede borrar en plan_checks un ✓ hecho en el móvil (o resucitar uno desmarcado allí).
 * Devuelve [done, marcar]: marcar(d) invierte lo que el componente muestra; marcar(d, true / false) lo fija.
 */
import { useEffect, useState } from 'react';
import { loadDone, leerDone, marcarDone } from './studyProgress';
import type { PlanKey } from './studyProgress';
import { onProgressSync, ensurePulled } from './studyProgressSync';

const mismo = (a: Set<number>, b: number[]): boolean => a.size === b.length && b.every((x) => a.has(x));

export function useDone(plan: PlanKey): [Set<number>, (d: number, valor?: boolean) => void] {
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone(plan)));
  useEffect(() => {
    const refrescar = () => { const xs = leerDone(plan); setDone((prev) => (mismo(prev, xs) ? prev : new Set(xs))); };
    refrescar();                       // por si el pull terminó entre el montaje y la suscripción
    const quitar = onProgressSync(refrescar);
    // pestaña abierta horas (web): al volver a ella repinta desde lo guardado (otra pestaña pudo marcar) y tira de Supabase si toca (PULL_MIN_MS)
    const w = globalThis as any, doc = w.document;
    const alVolver = () => { if (doc && doc.visibilityState === 'hidden') return; refrescar(); ensurePulled(); };
    try { w.addEventListener?.('focus', alVolver); doc?.addEventListener?.('visibilitychange', alVolver); } catch { /* sin eventos de ventana (nativo) */ }
    return () => {
      quitar();
      try { w.removeEventListener?.('focus', alVolver); doc?.removeEventListener?.('visibilitychange', alVolver); } catch { /* ídem */ }
    };
  }, [plan]);
  const marcar = (d: number, valor?: boolean) => setDone(new Set(marcarDone(plan, d, valor ?? !done.has(d))));
  return [done, marcar];
}
