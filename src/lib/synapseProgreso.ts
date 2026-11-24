/**
 * synapseProgreso.ts — racha y contadores del SYNAPSE por día REAL (escrito a mano; synapseDailyPlan.ts es GENERADO).
 *
 * Con el alias de corrida_s1 las filas del plan no van en el orden de los días reales y algunas no se pintan nunca
 * (las filas sin sesión ni guía: ✈ viaje · ⏸ sin sesión o apertura de cadena · 🎄 feriado · 🛡 protegido = solo bloques R de 0′).
 * Contar por NÚMERO de fila cortaba la racha cada vez que el alias saltaba filas y dejaba semanas y fases sin completar nunca.
 *   · synFilaDeReal: la fila que «⚡ run» pinta un día real (fechaPlanDe → synDiaDe / planHoyD: la misma elección de la vista);
 *   · synSesionDeReal: esa fila solo si es la sesión de ESE día real (un día sin sesión pinta la de mañana; un feriado no tiene nada que marcar);
 *   · synRacha: días reales seguidos hasta hoy (o hasta ayer si hoy aún no se marcó) cuya sesión lleva ✓; un día real sin sesión propia
 *     ni rompe ni suma;
 *   · synCuentaHecha / synContarHechas / synDoneEfectivo / synGruposSemana: semana, fase y total cuentan las sesiones marcadas ✓ y las filas sin
 *     sesión cuyo día real ya llegó (nada sale hecho antes de su día; un ✓ antiguo en una fila sin sesión no cuenta); el denominador no cambia;
 *   · synSesionesMarcadas: los ✓ guardados en filas con sesión (uptime);
 *   · synSinDiaPropio: fila que ningún día real pinta (su fecha sale «—»: ⏸ que abre una cadena, ✈/⏸ de la semana 1, 🎄 feriado de plan cuyo día real hace otra sesión);
 *   · synRunsDesde / synFilaVecina: «◷ 7 runs» y ◄/► por DÍAS REALES (la fila que «⚡ run» pinta cada día), no por número de fila.
 * Solo LEE `done` (ids de fila de loadDone('synapse') / plan_checks): no cambia nada de lo guardado.
 * La revisión semanal (DATA/_scripts/gen_revision_semanal.js › synSemana) aplica el mismo criterio de fila sin sesión: la saca de sus misiones.
 */
import { SYN_DIAS, SYN_PLAN_META, synDiaDe } from './synapseDailyPlan';
import type { DiaSynapse } from './synapseDailyPlan';
import { fechaPlanDe, fechaRealDe } from './fechasV6';
import { planHoyD, agruparProgreso } from './studyProgress';
import type { GrupoProgreso } from './studyProgress';

const _isoLocal = (d: Date): string => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const _mover = (iso: string, n: number): string => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const _ayer = (iso: string): string => _mover(iso, -1);

/** Día REAL de hoy (reloj local, AAAA-MM-DD). */
export function synHoyReal(): string { return _isoLocal(new Date()); }

/** Fila que «⚡ run» pinta el día real `real`: la de su fecha de plan del SYNAPSE (un día sin sesión o un hueco → la siguiente). */
export function synFilaDeReal(real: string): DiaSynapse {
  const iso = fechaPlanDe(real, 'synapse');
  const exacta = synDiaDe(iso);
  if (exacta) return exacta;
  const hd = planHoyD(SYN_DIAS, iso, 'synapse'); // una sola vez (fuera del find)
  return SYN_DIAS.find((x) => x.d === hd) || SYN_DIAS[0];
}

/** Fila sin día real propio: ningún día real la pinta en «⚡ run» (su día real hace otra fecha de plan). Su fecha se pinta «—»; su texto lo dice el generador. */
export function synSinDiaPropio(x: DiaSynapse): boolean { return fechaPlanDe(fechaRealDe(x.fecha, 'synapse'), 'synapse') !== x.fecha; }

/** Fila sin sesión ni guía (✈ · ⏸ · 🎄 · 🛡): solo bloques R de 0′. No hay nada que marcar: cuenta sola al llegar su día y no toca la racha. */
export function synFilaSinSesion(x: DiaSynapse): boolean { return x.bloques.every((b) => b.tag === 'R' && b.min === 0); }

/** La sesión del día real `real`: la fila que pinta «⚡ run» si es SUYA (su día real es `real`) y tiene sesión; null si no (día sin sesión que
 *  pinta la de mañana, feriado, fila de cadena que no se pinta, día fuera del plan). */
export function synSesionDeReal(real: string): DiaSynapse | null {
  const x = synFilaDeReal(real);
  return fechaRealDe(x.fecha, 'synapse') === real && !synFilaSinSesion(x) ? x : null;
}

const _realSinSesion = new Map<number, string>();
/** Día real de una fila sin sesión (caché: son pocas). */
function _diaRealSinSesion(x: DiaSynapse): string {
  let r = _realSinSesion.get(x.d);
  if (r === undefined) { r = fechaRealDe(x.fecha, 'synapse'); _realSinSesion.set(x.d, r); }
  return r;
}

/** Cuenta como hecha en semana, fase y total: una sesión, si lleva ✓; una fila sin sesión (no exigible), cuando su día real ya llegó. */
export function synCuentaHecha(x: DiaSynapse, done: Set<number>, hoyReal: string = synHoyReal()): boolean {
  return synFilaSinSesion(x) ? _diaRealSinSesion(x) <= hoyReal : done.has(x.d);
}

/** Cuántas filas de `dias` cuentan como hechas (synCuentaHecha) a día real `hoyReal`. */
export function synContarHechas(dias: DiaSynapse[], done: Set<number>, hoyReal: string = synHoyReal()): number {
  return dias.filter((x) => synCuentaHecha(x, done, hoyReal)).length;
}

/** Ids de las filas que cuentan como hechas (para agruparProgreso / progresoGlobal; el denominador sigue siendo el plan entero). */
export function synDoneEfectivo(done: Set<number>, hoyReal: string = synHoyReal()): Set<number> {
  return new Set(SYN_DIAS.filter((x) => synCuentaHecha(x, done, hoyReal)).map((x) => x.d));
}

/** ✓ guardados en filas con sesión (un ✓ antiguo en una fila sin sesión no suma). */
export function synSesionesMarcadas(done: Set<number>): number {
  return SYN_DIAS.filter((x) => done.has(x.d) && !synFilaSinSesion(x)).length;
}

/** Semanas del plan (◈ checkpoints) con synCuentaHecha. Una semana sin ninguna sesión marcada y fuera de hoy sigue «pendiente» (no «en curso»
 *  por sus filas sin sesión). */
export function synGruposSemana(hoyD: number, done: Set<number>, hoyReal: string = synHoyReal()): GrupoProgreso<DiaSynapse>[] {
  return agruparProgreso(SYN_DIAS, (x) => `Semana ${x.semana} · ${x.faseId.toUpperCase()}`, hoyD, synDoneEfectivo(done, hoyReal)).map((g) =>
    g.estado === 'en-curso' && !(hoyD >= g.primerD && hoyD <= g.ultimoD) && !g.dias.some((x) => done.has(x.d) && !synFilaSinSesion(x))
      ? { ...g, estado: 'pendiente' as const } : g);
}

let _rango: { desde: string; hasta: string } | null = null;
/** Primer y último día real con fila del plan (cotas de la racha). */
function _rangoReal(): { desde: string; hasta: string } {
  if (!_rango) {
    let desde: string = SYN_PLAN_META.inicio, hasta: string = SYN_PLAN_META.fin;
    for (const x of SYN_DIAS) { const r = fechaRealDe(x.fecha, 'synapse'); if (r < desde) desde = r; if (r > hasta) hasta = r; }
    _rango = { desde, hasta };
  }
  return _rango;
}

/** Racha: días REALES seguidos hasta hoy (o hasta ayer si hoy aún no se marcó) cuya sesión (synSesionDeReal) lleva ✓. Los días reales sin
 *  sesión propia (sin sesión, feriados, días de cadena que no pintan sesión) ni rompen ni suman. */
export function synRacha(done: Set<number>, hoyReal: string = synHoyReal()): number {
  const { desde, hasta } = _rangoReal();
  const hoy = hoyReal > hasta ? null : synSesionDeReal(hoyReal); // después del último día real no hay sesión propia
  let r = hoy && done.has(hoy.d) ? hoyReal : _ayer(hoyReal);
  if (r > hasta) r = hasta;
  let n = 0;
  for (; r >= desde; r = _ayer(r)) {
    const x = synSesionDeReal(r);
    if (!x) continue;
    if (!done.has(x.d)) break;
    n++;
  }
  return n;
}

/** Un día real de «◷ 7 runs»: la fila que «⚡ run» pinta ese día; `propia` = es la fila de ESE día (no la de otro día que se adelanta). */
export interface SynRun { real: string; x: DiaSynapse; propia: boolean }
/** «◷ 7 runs»: `n` días reales seguidos (sin saltar ninguno) desde `desde` con la fila que «⚡ run» pinta cada uno. Los días iniciales que pintan la fila de
 *  otro día (lun 23-nov sin sesión → la del mar 24) se omiten: la lista empieza en el primer día con fila propia (hoy, mar 24 → lun 30). */
export function synRunsDesde(desde: string, n: number = 7): SynRun[] {
  const { hasta } = _rangoReal();
  let r = desde;
  while (r <= hasta && fechaRealDe(synFilaDeReal(r).fecha, 'synapse') !== r) r = _mover(r, 1);
  const out: SynRun[] = [];
  for (; out.length < n && r <= hasta; r = _mover(r, 1)) {
    const x = synFilaDeReal(r);
    out.push({ real: r, x, propia: fechaRealDe(x.fecha, 'synapse') === r });
  }
  return out;
}

/** ◄/►: la fila del día real anterior (-1) o siguiente (+1) al de `x` que «⚡ run» pinta como suya (los días que pintan la fila de otro día se saltan); null si
 *  no hay (antes de la 1.ª sesión real o tras la última). Desde una fila sin día propio, ► lleva primero a la sesión de su día real (D40 → D37 del vie 25-dic). */
export function synFilaVecina(x: DiaSynapse, paso: 1 | -1): DiaSynapse | null {
  const { desde, hasta } = _rangoReal();
  const r0 = fechaRealDe(x.fecha, 'synapse');
  for (let r = paso === 1 && synSinDiaPropio(x) ? r0 : _mover(r0, paso); r >= desde && r <= hasta; r = _mover(r, paso)) {
    const y = synFilaDeReal(r);
    if (y.d !== x.d && fechaRealDe(y.fecha, 'synapse') === r) return y;
  }
  return null;
}
