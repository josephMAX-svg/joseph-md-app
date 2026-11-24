/**
 * studyProgress.ts — progreso REAL del estudio. El avance NO se infiere de la fecha:
 * se marca manualmente día por día y se persiste (localStorage). Arranca en 0% porque
 * empezamos de cero. `hoyD` se usa solo para resaltar el día de hoy (no para contar).
 * Compartido USMLE + MIR.
 */
import { fechaPlanDe, fechaRealDe } from './fechasV6'; // v6.10d: planHoyD salta a la siguiente fila por su día REAL (alias de corrida_s1)

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
/** c45 · `key` de la tarjeta de un grupo (◈ checkpoints · temario): cambia cuando el día de hoy entra en su rango o sale de él, así que con la pestaña
 *  abierta de un día para otro esa tarjeta se vuelve a montar con su estado inicial (desplegada la de hoy), como al recargar; las demás conservan lo
 *  que Joseph abrió o cerró. */
export function claveGrupoDeHoy<T extends DiaBase>(g: GrupoProgreso<T>, hoyD: number): string {
  return hoyD >= g.primerD && hoyD <= g.ultimoD ? `${g.clave}·hoy` : g.clave;
}

/** Día del plan correspondiente a hoy (clamp a los extremos si fuera de rango).
 *  Si hoy es una fecha-hueco (p. ej. dom 14/21-jun-2026, días libres), devuelve el
 *  SIGUIENTE día del plan — nunca saltar al final. */
export function planHoyD(dias: DiaBase[], iso: string, frente?: string): number {
  if (!dias.length) return 1;
  const exact = dias.find((x) => x.fecha === iso);
  if (exact) return exact.d;
  // v6.10d (fix revisión 18-nov): la siguiente fila por su día REAL (alias de corrida_s1: el plan del vie 27-nov se hace el lun 30). Un fin de semana o el
  //   vie 25-dic dentro de la ventana del alias (fechaPlanDe los devuelve tal cual) mostraban la fila del MARTES real (plan lun 30 / lun 28-dic) y el hub se
  //   saltaba la sesión del lunes real. En un día hábil de plan no cambia nada (ninguna fila anterior se hace después de él); sin alias, real = plan.
  //   Con `frente`, el día real es el de SU alias (alias_frente): sin él, un fin de semana de diciembre mostraba la sesión del viernes ya pasado.
  const next = dias.find((x) => fechaRealDe(x.fecha, frente) > iso);
  if (next) return next.d;
  return dias[dias.length - 1].d;
}

/* ── Filas por día REAL (alias de corrida_s1 / alias_frente): con el alias las filas no van en el orden de los días reales y algunas no se pintan
 *    nunca (un descanso o feriado de plan cuyo día real hace otra sesión). «7 días» y ◄/► van por días reales con la fila que pinta cada uno.
 *    (SYNAPSE tiene las suyas en synapseProgreso.ts.) ── */
const _moverDias = (iso: string, n: number): string => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
/** Fila que el plan del día pinta el día real `real` del `frente`: la de su fecha de plan (un día sin sesión o un hueco → la siguiente, planHoyD). */
export function filaDeReal<T extends DiaBase>(dias: T[], real: string, frente: string): T {
  const iso = fechaPlanDe(real, frente);
  return dias.find((x) => x.fecha === iso) || dias.find((x) => x.d === planHoyD(dias, iso, frente)) || dias[0];
}
/** Fila sin día real propio: su día real pinta otra fila (ningún día la muestra como suya; su fecha se pinta «—»). */
export function filaSinDiaPropio(x: DiaBase, frente: string): boolean { return fechaPlanDe(fechaRealDe(x.fecha, frente), frente) !== x.fecha; }
const _rangosReales = new WeakMap<object, Map<string, { desde: string; hasta: string }>>();
function _rangoReal(dias: DiaBase[], frente: string): { desde: string; hasta: string } {
  let m = _rangosReales.get(dias);
  if (!m) { m = new Map(); _rangosReales.set(dias, m); }
  let r = m.get(frente);
  if (!r) {
    r = { desde: '9999-12-31', hasta: '0000-01-01' };
    for (const x of dias) { const f = fechaRealDe(x.fecha, frente); if (f < r.desde) r.desde = f; if (f > r.hasta) r.hasta = f; }
    m.set(frente, r);
  }
  return r;
}
/** Un día real de «7 días»: la fila que pinta ese día; `propia` = es la fila de ESE día (no la de otro día que se adelanta). */
export interface FilaDeDiaReal<T> { real: string; x: T; propia: boolean }
/** «7 días»: `n` días reales seguidos desde `desde`, cada uno con la fila que pinta. Los días iniciales que pintan la fila de otro día se omiten. */
export function filasDesdeReal<T extends DiaBase>(dias: T[], desde: string, n: number, frente: string): FilaDeDiaReal<T>[] {
  if (!dias.length) return [];
  const { hasta } = _rangoReal(dias, frente);
  let r = desde;
  while (r <= hasta && fechaRealDe(filaDeReal(dias, r, frente).fecha, frente) !== r) r = _moverDias(r, 1);
  const out: FilaDeDiaReal<T>[] = [];
  for (; out.length < n && r <= hasta; r = _moverDias(r, 1)) {
    const x = filaDeReal(dias, r, frente);
    out.push({ real: r, x, propia: fechaRealDe(x.fecha, frente) === r });
  }
  return out;
}
/** ◄/►: la fila del día real anterior (-1) o siguiente (+1) que ese día pinta como suya; null en los extremos. Desde una fila sin día propio, ►
 *  lleva primero a la sesión que hace su día real (un feriado de plan → la sesión de ese día). */
export function filaVecinaReal<T extends DiaBase>(dias: T[], x: T, paso: 1 | -1, frente: string): T | null {
  if (!dias.length) return null;
  const { desde, hasta } = _rangoReal(dias, frente);
  const r0 = fechaRealDe(x.fecha, frente);
  for (let r = paso === 1 && filaSinDiaPropio(x, frente) ? r0 : _moverDias(r0, paso); r >= desde && r <= hasta; r = _moverDias(r, paso)) {
    const y = filaDeReal(dias, r, frente);
    if (y.d !== x.d && fechaRealDe(y.fecha, frente) === r) return y;
  }
  return null;
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
 * `saveDone` anota la intención de cada fila que cambia (c45: cola hasta que Supabase la confirme) y la sube; el primer `loadDone`
 * de la sesión dispara el pull (remoto paginado + intenciones pendientes encima; migración única).
 * La API (loadDone/saveDone/PlanKey) no cambia: los componentes siguen leyendo síncrono.
 * -------------------------------------------------------------------------- */
import { leerStoreLS, escribirStoreLS, syncSaveDone, ensurePulled, anotarIntenciones } from './studyProgressSync';

export type PlanKey = 'usmle' | 'mir' | 'research' | 'derma' | 'business' | 'synapse' | 'aurum' | 'liviano' | 'vibecoding' | 'research-infra';

/** Carga los días marcados como hechos para un plan (caché local; en segundo plano sincroniza con Supabase). */
export function loadDone(plan: PlanKey): number[] {
  // El pull se difiere a un microtask: loadDone se llama durante el render de varios componentes y
  // ensurePulled acaba en setState de CockpitStatusBar (React: 'Cannot update a component while rendering').
  void Promise.resolve().then(ensurePulled);
  const s = leerStoreLS();
  return Array.isArray(s[plan]) ? s[plan] : [];
}
/** Guarda los días marcados como hechos para un plan (local al instante + upsert/delete en plan_checks). */
export function saveDone(plan: PlanKey, days: number[]): void {
  const s = leerStoreLS();
  anotarIntenciones(plan, s[plan] || [], days);   // c45: cada fila que cambia queda en la cola de intenciones hasta que Supabase la confirme
  s[plan] = days;
  escribirStoreLS(s);
  syncSaveDone(plan);
}
/** Los ✓ guardados de un plan en este momento, sin disparar el pull (para refrescar un componente cuando avisa onProgressSync). */
export function leerDone(plan: PlanKey): number[] {
  const s = leerStoreLS();
  return Array.isArray(s[plan]) ? s[plan] : [];
}
/**
 * Marca (valor = true) o desmarca UNA fila partiendo de lo guardado AHORA —no del estado que el componente leyó al montar, que
 * puede ser anterior al pull de otro dispositivo— y guarda solo ese cambio. Devuelve los ✓ resultantes del plan.
 * Guardar el estado montado entero borraba en plan_checks los ✓ que el pull había traído después (el push borra lo que falta).
 */
export function marcarDone(plan: PlanKey, d: number, valor: boolean): number[] {
  const s = new Set(leerDone(plan));
  if (s.has(d) === valor) return Array.from(s);
  if (valor) s.add(d); else s.delete(d);
  const days = Array.from(s);
  saveDone(plan, days);
  return days;
}
