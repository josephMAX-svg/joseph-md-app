/**
 * aurumProgreso.ts — racha del AURUM por día REAL (escrito a mano; aurumDailyPlan.ts es GENERADO). Mismo criterio que synapseProgreso.synRacha.
 *
 * Con el alias de corrida_s1 (alias_frente.aurum + el sáb 28-nov a hora fija) las filas se hacen en otro día real que su fecha de plan; contar por NÚMERO de
 * fila supone que la fila d-1 es «ayer». Aquí la racha mira el calendario real:
 *   · aurumFilaDeReal: la fila que el plan del día pinta un día real (fechaPlanDe → aurumDiaDe / planHoyD: la misma elección que AurumTodayPlan);
 *   · aurumSesionDeReal: esa fila solo si es la sesión de ESE día real (fin de semana, feriado o día sin sesión → null);
 *   · aurumRacha: días reales seguidos hasta hoy (o hasta ayer si hoy aún no se marcó) cuya sesión lleva ✓; un día real sin sesión propia ni rompe ni suma.
 * Solo LEE `done` (ids de fila de loadDone('aurum') / plan_checks): no cambia nada de lo guardado.
 */
import { AURUM_DIAS, AURUM_PLAN_META, aurumDiaDe } from './aurumDailyPlan';
import type { DiaAurum } from './aurumDailyPlan';
import { fechaPlanDe, fechaRealDe } from './fechasV6';
import { planHoyD } from './studyProgress';

const _isoLocal = (d: Date): string => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const _ayer = (iso: string): string => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() - 1); return d.toISOString().slice(0, 10); };

/** Día REAL de hoy (reloj local, AAAA-MM-DD). */
export function aurumHoyReal(): string { return _isoLocal(new Date()); }

/** Fila que el plan del día pinta el día real `real`: la de su fecha de plan del AURUM (un día sin sesión o un hueco → la siguiente). */
export function aurumFilaDeReal(real: string): DiaAurum {
  const iso = fechaPlanDe(real, 'aurum');
  const exacta = aurumDiaDe(iso);
  if (exacta) return exacta;
  const hd = planHoyD(AURUM_DIAS, iso, 'aurum'); // una sola vez (fuera del find); con su alias_frente, un fin de semana pinta la sesión siguiente
  return AURUM_DIAS.find((x) => x.d === hd) || AURUM_DIAS[0]!;
}

/** La sesión del día real `real`: la fila que pinta el plan del día si es SUYA (su día real es `real`); null si no (fin de semana, feriado, día sin sesión). */
export function aurumSesionDeReal(real: string): DiaAurum | null {
  const x = aurumFilaDeReal(real);
  return fechaRealDe(x.fecha, 'aurum') === real ? x : null;
}

let _rango: { desde: string; hasta: string } | null = null;
/** Primer y último día real con fila del plan (cotas de la racha). */
function _rangoReal(): { desde: string; hasta: string } {
  if (!_rango) {
    let desde: string = AURUM_PLAN_META.inicio, hasta: string = AURUM_PLAN_META.fin;
    for (const x of AURUM_DIAS) { const r = fechaRealDe(x.fecha, 'aurum'); if (r < desde) desde = r; if (r > hasta) hasta = r; }
    _rango = { desde, hasta };
  }
  return _rango;
}

/** Racha: días REALES seguidos hasta hoy (o hasta ayer si hoy aún no se marcó) cuya sesión (aurumSesionDeReal) lleva ✓. Los días reales sin sesión propia
 *  (fines de semana, feriados, días sin sesión de corrida_s1) ni rompen ni suman. */
export function aurumRacha(done: Set<number>, hoyReal: string = aurumHoyReal()): number {
  const { desde, hasta } = _rangoReal();
  const hoy = hoyReal > hasta ? null : aurumSesionDeReal(hoyReal); // después del último día real no hay sesión propia
  let r = hoy && done.has(hoy.d) ? hoyReal : _ayer(hoyReal);
  if (r > hasta) r = hasta;
  let n = 0;
  for (; r >= desde; r = _ayer(r)) {
    const x = aurumSesionDeReal(r);
    if (!x) continue;
    if (!done.has(x.d)) break;
    n++;
  }
  return n;
}
