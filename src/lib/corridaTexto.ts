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

// v6.07a (lun 9-nov): «<día> <n>» SIN mes («Day-After 1/6 mar 10 18:00 · 2/6 jue 12 05:00») → el mes sale del rango de la corrida (DESDE-HASTA
//   abarca < 1 mes: el día del mes y el día de la semana lo fijan). Detrás no puede venir dígito, letra, «-» ni «/» (eso es la otra forma o una fracción).
// v6.07a ronda 3: ni detrás de un dígito o «-» («jue 11-mar 10:00») ni delante de «:» («vie 13:00» es una hora)
const RX2 = /(^|[^\p{L}\d\-])(lun|mar|mié|jue|vie|sáb|dom)(\.?) (\d{1,2})(?![\d\p{L}\-\/]|:\d)/giu;
// v6.07a: fechas REALES externas (en vivo de Theomed, apertura y publicación de simulacros, banqueos grabados de Theomed) y la bitácora de
//   versiones viejas (v5.x) no se traducen: no son fechas de plan. Se mira el texto de antes (60) y el de después (25: «(vie 13, grabado)»)
const EXTERNA = /theomed|en vivo|se public|banqueo \d+\/\d+|\bv5\.\d+/i;
const EXTERNA_DESPUES = /^.{0,25}(grabad|grabaci)/i; // v6.07d: también «(vie 27, grabación)»
const externa = (s: string, i: number, n = 0): boolean => EXTERNA.test(s.slice(Math.max(0, i - 60), i)) || EXTERNA_DESPUES.test(s.slice(i + n, i + n + 40));
// v6.07d (mié 11-nov): se prueban TODOS los meses de DESDE a HASTA, no solo los dos de los extremos. Con los repartos del 6, 13 y 20-dic el rango
//   va del 19-oct al 20-dic y noviembre quedaba fuera, así que «mar 10 18:00» ya no se traducía. Si dos meses cuadran (día del mes y día de la
//   semana), la fecha es ambigua y no se toca.
const MESES_RANGO: string[] = [];
for (let y = Number(DESDE.slice(0, 4)), m = Number(DESDE.slice(5, 7)); DESDE && `${y}-${String(m).padStart(2, '0')}` <= HASTA.slice(0, 7); m === 12 ? (y++, m = 1) : m++) {
  MESES_RANGO.push(`${y}-${String(m).padStart(2, '0')}`);
}
const planSinMes = (dd: string, dow: string): string | null => {
  const ok = MESES_RANGO.map((ym) => `${ym}-${String(Number(dd)).padStart(2, '0')}`)
    .filter((p) => p >= DESDE && p <= HASTA && DOW[dowDe(p)] === dow.toLowerCase());
  return ok.length === 1 ? ok[0] : null;
};
const diaReal = (real: string, dow: string): string => {
  const dr = DOW[dowDe(real)] ?? dow;
  return dow[0] !== dow[0]?.toLowerCase() ? (dow === dow.toUpperCase() ? dr.toUpperCase() : dr.charAt(0).toUpperCase() + dr.slice(1)) : dr;
};

/** Texto con las menciones «<día> <n>-<mes>» (y v6.07a «<día> <n>» sin mes) de la semana corrida (fechas de plan) cambiadas por su día real para `frente`. */
export function fechasRealesEnTexto(t: string, frente?: string): string {
  if (!t || !_ACTIVA) return t;
  const t1 = t.replace(RX, (m, pre: string, dow: string, punto: string, dd: string, mes: string, i: number, s: string) => {
    const plan = `${DESDE.slice(0, 4)}-${String(MES.indexOf(mes.toLowerCase()) + 1).padStart(2, '0')}-${String(Number(dd)).padStart(2, '0')}`;
    if (plan < DESDE || plan > HASTA) return m;
    if (DOW[dowDe(plan)] !== dow.toLowerCase()) return m; // el día de la semana no cuadra: no es una fecha de esta semana
    if (externa(s, i, m.length)) return m;
    const real = fechaRealDe(plan, frente);
    if (real === plan) return m;
    const mr = MES[Number(real.slice(5, 7)) - 1] ?? mes;
    return `${pre}${diaReal(real, dow)}${punto} ${Number(real.slice(8))}-${mes === mes.toUpperCase() ? mr.toUpperCase() : mr}`;
  });
  return t1.replace(RX2, (m, pre: string, dow: string, punto: string, dd: string, i: number, s: string) => {
    const plan = planSinMes(dd, dow);
    if (!plan || externa(s, i, m.length)) return m;
    const real = fechaRealDe(plan, frente);
    return real === plan ? m : `${pre}${diaReal(real, dow)}${punto} ${Number(real.slice(8))}`;
  });
}

/**
 * v6.07a (lun 9-nov): la guía de un día de PLAN pintada otro día real con los textos de corrida_s1.reemplazos[fechaPlan] (los que dicen «hoy»
 * de algo real que no se mueve: «Hoy 19:30 en vivo INV 1/4» del lun 9 pintado el mar 10, «Hoy 16:00 Theomed abre simulacro» del vie 13 pintado el
 * sáb 14…). Cada entrada vale para su `frente` (si lo trae) y se aplica a todas sus apariciones. Sin entradas = la guía tal cual.
 * Ronda 3: vale también para días FUERA de la corrida (fechaPlan = el propio día; p. ej. el lun 16 cita «las 11:40 del vie 13», que fue el sáb 14).
 */
export function reemplazosCorrida(g: GuiaBloque, fechaPlan: string): GuiaBloque {
  const xs = (_C.reemplazos?.[fechaPlan] ?? []).filter((x) => !x.frente || x.frente === g.plan);
  if (!xs.length) return g;
  const f = (t: string): string => xs.reduce((acc, x) => acc.split(x.a).join(x.por), t);
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
