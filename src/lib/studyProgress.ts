/**
 * studyProgress.ts — agrupa el plan día-a-día por sistema/asignatura y calcula el
 * progreso REAL según el ritmo del plan: hoy = Día N → días < N = completados, día
 * N = en curso, días > N = pendientes. No inventa actividad del usuario; refleja
 * exactamente dónde toca estar hoy según el cronograma. Compartido USMLE + MIR.
 */
export interface DiaBase { d: number; fecha: string; }

export interface GrupoProgreso<T extends DiaBase> {
  clave: string;          // nombre del sistema / asignatura
  dias: T[];              // días de ese grupo, en orden
  primerD: number;
  ultimoD: number;
  total: number;          // nº de días (subtemas) del grupo
  hechos: number;         // días estrictamente antes de hoy (completados según plan)
  pct: number;            // 0..100 = hechos / total
  estado: 'completado' | 'en-curso' | 'pendiente';
  diaActual?: T;          // si en-curso, el día de hoy dentro del grupo
}

/** Agrupa preservando el orden de aparición (= orden de ataque del plan). */
export function agruparProgreso<T extends DiaBase>(
  dias: T[], claveDe: (x: T) => string, hoyD: number,
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
    const hechos = ds.filter((x) => x.d < hoyD).length;
    const enCurso = hoyD >= primerD && hoyD <= ultimoD;
    const estado: GrupoProgreso<T>['estado'] = hoyD > ultimoD ? 'completado' : enCurso ? 'en-curso' : 'pendiente';
    const pct = total ? Math.round((hechos / total) * 100) : 0;
    const diaActual = enCurso ? ds.find((x) => x.d === hoyD) : undefined;
    return { clave, dias: ds, primerD, ultimoD, total, hechos, pct, estado, diaActual };
  });
}

/** Día del plan correspondiente a hoy (clamp a los extremos si fuera de rango). */
export function planHoyD(dias: DiaBase[], iso: string): number {
  if (!dias.length) return 1;
  const exact = dias.find((x) => x.fecha === iso);
  if (exact) return exact.d;
  if (iso < dias[0].fecha) return dias[0].d;
  return dias[dias.length - 1].d;
}

/** Progreso global del plan (días cubiertos / total). */
export function progresoGlobal(dias: DiaBase[], hoyD: number) {
  const total = dias.length;
  const hechos = dias.filter((x) => x.d < hoyD).length;
  return { total, hechos, pct: total ? Math.round((hechos / total) * 100) : 0 };
}
