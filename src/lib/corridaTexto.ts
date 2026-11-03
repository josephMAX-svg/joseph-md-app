/**
 * corridaTexto.ts — v6.02d (mar 20-oct-2026, a pedido de Joseph: «dice que empieza el 19 y estamos empezando el 20»).
 *
 * Las guías («qué · cuánto · cómo») se generaron con la fecha de PLAN y citan días de la semana 1 en su texto («→ D3 mié 21-oct 05:00»,
 * «lun 19-oct», «sáb 24-oct»). Con la semana 1 corrida esos días se hacen uno más tarde: estas funciones cambian SOLO al mostrar las
 * menciones «<día> <n>-oct» de 2026 entre el 19 y el 25 por su día REAL (fechasV6.fechaRealDe, según el frente de la guía). Nombres de
 * fichero e ISO (eval_2026-10-19, 2026-10-23) no se tocan. No es idempotente: aplicar UNA sola vez, al pintar (GuiaBloqueCard).
 */
import { FECHAS_V6, fechaRealDe } from './fechasV6';
import type { GuiaBloque } from './guia';

const DOW = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const RX = /(^|[^\p{L}])(lun|mar|mié|jue|vie|sáb|dom)(\.?) (\d{1,2})-(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)(?![\p{L}])/giu;
const dowDe = (iso: string): number => new Date(iso + 'T12:00:00Z').getUTCDay();
// v6.06a: el rango sale de corrida_s1 (días sin sesión, alias y repartos con sus fechas de plan), no de «19-25-oct» fijo. Sin alias ni reparto = inerte.
const _C = FECHAS_V6.corrida_s1;
const _ACTIVA = Object.keys(_C.alias).length > 0 || Object.keys(_C.reparto).length > 0;
const _FECHAS = [..._C.sin_sesion, ...Object.keys(_C.alias), ...Object.values(_C.alias), ...Object.keys(_C.reparto),
  ...Object.values(_C.reparto).flatMap((x) => x.partes.map((pt) => pt.de))].sort();
const DESDE = _FECHAS[0] ?? '', HASTA = _FECHAS[_FECHAS.length - 1] ?? '';

/** Texto con las menciones «<día> <n>-<mes>» de la semana corrida (fechas de plan) cambiadas por su día real para `frente`. */
export function fechasRealesEnTexto(t: string, frente?: string): string {
  if (!t || !_ACTIVA) return t;
  return t.replace(RX, (m, pre: string, dow: string, punto: string, dd: string, mes: string) => {
    const plan = `${DESDE.slice(0, 4)}-${String(MES.indexOf(mes.toLowerCase()) + 1).padStart(2, '0')}-${String(Number(dd)).padStart(2, '0')}`;
    if (plan < DESDE || plan > HASTA) return m;
    if (DOW[dowDe(plan)] !== dow.toLowerCase()) return m; // el día de la semana no cuadra: no es una fecha de esta semana
    const real = fechaRealDe(plan, frente);
    if (real === plan) return m;
    let dr = DOW[dowDe(real)] ?? dow;
    if (dow[0] !== dow[0]?.toLowerCase()) dr = dr.charAt(0).toUpperCase() + dr.slice(1);
    return `${pre}${dr}${punto} ${Number(real.slice(8))}-${MES[Number(real.slice(5, 7)) - 1]}`;
  });
}

/** La guía con sus textos visibles pasados por fechasRealesEnTexto (frente = g.plan). Franja, minutos y enlaces intactos. */
export function guiaConFechasReales(g: GuiaBloque, frente: string = g.plan): GuiaBloque {
  const f = (t: string): string => fechasRealesEnTexto(t, frente);
  return {
    ...g,
    titulo: f(g.titulo),
    pasos: g.pasos.map((p) => ({ ...p, que: f(p.que), como: f(p.como) })),
    recursos: g.recursos.map((r) => ({ ...r, t: f(r.t), ...(r.cantidad ? { cantidad: f(r.cantidad) } : {}) })),
    hecho: f(g.hecho),
    ...(g.planB ? { planB: f(g.planB) } : {}),
    ...(g.aviso ? { aviso: f(g.aviso) } : {}),
  };
}
