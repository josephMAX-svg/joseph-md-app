/**
 * studyProgress.ts — progreso REAL del estudio. El avance NO se infiere de la fecha:
 * se marca manualmente día por día y se persiste (localStorage). Arranca en 0% porque
 * empezamos de cero. `hoyD` se usa solo para resaltar el día de hoy (no para contar).
 * Compartido USMLE + MIR.
 */
export interface DiaBase { d: number; fecha: string; }

export interface GrupoProgreso<T extends DiaBase> {
  clave: string;          // nombre del sistema / asignatura
  dias: T[];              // días de ese grupo, en orden
  primerD: number;
  ultimoD: number;
  total: number;          // nº de días (subtemas) del grupo
  hechos: number;         // días marcados como completados (REAL)
  pct: number;            // 0..100 = hechos / total
  estado: 'completado' | 'en-curso' | 'pendiente';
  diaActual?: T;          // el día de HOY dentro del grupo (por fecha), para resaltar
}

/** Agrupa preservando el orden de aparición y cuenta lo realmente marcado en `done`. */
export function agruparProgreso<T extends DiaBase>(
  dias: T[], claveDe: (x: T) => string, hoyD: number, done: Set<number>,
): GrupoProgreso<T>[] {
  const orden: string[] = [];
  const mapa = new Map<string, T[]>();
  for (const x of dias) {
    const k = claveDe(x);
    if (!mapa.has(k)) { mapa.set(k, []); orden.push(k); }
    mapa.get(k)!.push(x);
  }
  return orden.map((clave) => {
    const ds = mapa.get(clave)!;
    const primerD = ds[0].d;
    const ultimoD = ds[ds.length - 1].d;
    const total = ds.length;
    const hechos = ds.filter((x) => done.has(x.d)).length;
    const enRango = hoyD >= primerD && hoyD <= ultimoD;
    const estado: GrupoProgreso<T>['estado'] =
      total > 0 && hechos === total ? 'completado'
        : (hechos > 0 || enRango) ? 'en-curso'
          : 'pendiente';
    const pct = total ? Math.round((hechos / total) * 100) : 0;
    const diaActual = enRango ? ds.find((x) => x.d === hoyD) : undefined;
    return { clave, dias: ds, primerD, ultimoD, total, hechos, pct, estado, diaActual };
  });
}

/** Día del plan correspondiente a hoy (clamp a los extremos si fuera de rango).
 *  Si hoy es una fecha-hueco (p. ej. dom 14/21-jun-2026, días libres), devuelve el
 *  SIGUIENTE día del plan — nunca saltar al final. */
export function planHoyD(dias: DiaBase[], iso: string): number {
  if (!dias.length) return 1;
  const exact = dias.find((x) => x.fecha === iso);
  if (exact) return exact.d;
  const next = dias.find((x) => x.fecha > iso);
  if (next) return next.d;
  return dias[dias.length - 1].d;
}

/** Progreso global del plan (días marcados / total). */
export function progresoGlobal(dias: DiaBase[], done: Set<number>) {
  const total = dias.length;
  const hechos = dias.filter((x) => done.has(x.d)).length;
  return { total, hechos, pct: total ? Math.round((hechos / total) * 100) : 0 };
}

/* ----------------------------------------------------------------------------
 * Persistencia del progreso real.
 * Estructura: { usmle: number[], mir: number[], … } = días marcados como hechos.
 * v5.10 (12-sep-2026): localStorage 'jmd-study-progress-v1' sigue siendo la caché/fallback offline,
 * pero la fuente de verdad entre dispositivos es Supabase `plan_checks` (src/lib/studyProgressSync.ts):
 * `saveDone` empuja el diff y el primer `loadDone` de la sesión dispara el pull (fusión + migración única).
 * La API (loadDone/saveDone/PlanKey) no cambia: los componentes siguen leyendo síncrono.
 * -------------------------------------------------------------------------- */
import { leerStoreLS, escribirStoreLS, syncSaveDone, ensurePulled } from './studyProgressSync';

export type PlanKey = 'usmle' | 'mir' | 'research' | 'derma' | 'business' | 'synapse' | 'aurum' | 'liviano' | 'vibecoding' | 'research-infra';

/** Carga los días marcados como hechos para un plan (caché local; en segundo plano sincroniza con Supabase). */
export function loadDone(plan: PlanKey): number[] {
  ensurePulled();
  const s = leerStoreLS();
  return Array.isArray(s[plan]) ? s[plan] : [];
}
/** Guarda los días marcados como hechos para un plan (local al instante + upsert/delete en plan_checks). */
export function saveDone(plan: PlanKey, days: number[]): void {
  const s = leerStoreLS();
  s[plan] = days;
  escribirStoreLS(s);
  syncSaveDone(plan, days);
}
