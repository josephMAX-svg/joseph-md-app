/**
 * corridaTexto.ts — v6.02d (mar 20-oct-2026, a pedido de Joseph: «dice que empieza el 19 y estamos empezando el 20»).
 *
 * Las guías («qué · cuánto · cómo») se generaron con la fecha de PLAN y citan días de la semana 1 en su texto («→ D3 mié 21-oct 05:00»,
 * «lun 19-oct», «sáb 24-oct»). Con la semana 1 corrida esos días se hacen uno más tarde: estas funciones cambian SOLO al mostrar las
 * menciones «<día> <n>-oct» de 2026 entre el 19 y el 25 por su día REAL (fechasV6.fechaRealDe, según el frente de la guía). Nombres de
 * fichero e ISO (eval_2026-10-19, 2026-10-23) no se tocan. No es idempotente: aplicar UNA sola vez, al pintar (GuiaBloqueCard).
 */
import { FECHAS_V6, fechaRealDe, extraCorridaDe } from './fechasV6';
import type { GuiaBloque } from './guia';

const DOW = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
// v6.10d (fix revisión 18-nov): + el nombre COMPLETO con fecha («las 10 tarjetas del jueves 31-dic» → «viernes 1-ene»); sin mes, no (RX2): «(lunes 30, 19:30,
//   en vivo)» y los reemplazos «(viernes 20, 19:00)» son fechas reales a propósito
const RX = /(^|[^\p{L}])(lunes|martes|miércoles|jueves|viernes|sábado|domingo|lun|mar|mié|jue|vie|sáb|dom)(\.?) (\d{1,2})-(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)(?![\p{L}])/giu;
const DOW_L = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
/** «jueves» → «jue» (las abreviaturas, tal cual en minúscula) */
const abrev = (dow: string): string => { const i = DOW_L.indexOf(dow.toLowerCase()); return i >= 0 ? DOW[i] as string : dow.toLowerCase(); };
/** el nombre COMPLETO del día de `iso` con la capitalización de `como` («Jueves» → «Viernes») */
const largoComo = (iso: string, como: string): string => {
  const n = DOW_L[new Date(iso + 'T12:00:00Z').getUTCDay()] as string;
  return como === como.toUpperCase() ? n.toUpperCase() : como[0] !== como[0]?.toLowerCase() ? n.charAt(0).toUpperCase() + n.slice(1) : n;
};
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
// v6.10d (18-nov): + «SIMULACROS MEDICINA» (el simulacro de Theomed del viernes se publica ese viernes REAL: «Campus › curso 105 (SIMULACROS MEDICINA 2027) ›
//   el del vie 11-dic») · el banqueo en vivo solo protege la fecha que lo sigue de cerca («Banqueo 9/19 (vie 18-dic, grabado)»; antes, 60 caracteres, y
//   «Banqueo 9/19 + 30 flashcards del jue 31-dic» quedaba sin traducir) · después: «(vie 20-nov, en diferido)» = la fecha de la clase en vivo
const EXTERNA = /theomed|en vivo|se public|simulacros medicina|\bv5\.\d+/i;
const EXTERNA_BANQUEO = /banqueo \d+\/\d+ \(?$/i;
// v6.10d: bitácora de versiones viejas pegada a la fecha («de la F1 v6.05 (lun 28-dic)», «v6.05: mar 29-dic»): es la fecha de ENTONCES, no se traduce
const EXTERNA_VERSION = /\bv6\.0\d[a-z]?(?: lote [\w-]+)?(?::\s*| \(\s*)$/i;
// v6.10d (fix revisión 18-nov): solo la fecha PEGADA a «, grabado / grabación» («(vie 13, grabado)», «(vie 27, grabación)», «Banqueo 9/19 (vie 18-dic, grabado)»):
//   antes bastaba «grabad» a ≤ 25 caracteres y la frase SIGUIENTE bloqueaba la traducción («… en la mañana del lun 30-nov. Banqueos grabados nuevos …», «las 11:40
//   del vie 4-dic (y las de los banqueos grabados del domingo …)»): el aviso y la nota del dom 6-dic daban días distintos para la misma mañana
const EXTERNA_DESPUES = /^,\s?(grabad|grabaci)|^.{0,3}en diferido/i; // v6.07d: también «(vie 27, grabación)» · v6.10d: «(vie 20-nov, en diferido)»
// v6.10d: una fecha justo detrás de «→» es un DESTINO del plan («Banqueo 5/19 (hoy 19:00) → mié 2-dic (mañana 7/21)», «INV 4/4 (hoy 19:30, en vivo), en
//   diferido → vie 11-dic»): se traduce aunque antes se nombre una clase en vivo (antes, «en vivo» o «Banqueo n/m» a ≤ 60 caracteres la dejaban con la fecha de plan)
// v6.10g (revisión 18-nov · Research CR-1): el HISTORIAL de versiones es la fecha de ENTONCES y no se traduce (la misma regla que
//   gen_research_calendar.js#enHistorial, así el Home y el overlay del Calendar dicen las mismas fechas): la fecha está dentro de un paréntesis abierto con
//   «⏸», o su cláusula (desde el último « · », «; » o salto de línea, sin los paréntesis ya cerrados) lleva «⏸», o la última etiqueta de versión de la
//   cláusula es anterior a la base vigente (v6.08 = base de la v6.09/v6.10; ≤ v6.07e quedaron SIN EFECTO). Antes solo la fecha PEGADA a «vX.YY: » quedaba
//   igual y la 2.ª de cada par se traducía como si fuera de plan («⏸ v6.07: vie 11 / mar 15-dic» → «… / mié 16-dic»). Vale también contra «→».
const VIGENTE_MIN = 6008; // v6.08
const verN = (v: string): number => { const m = /^v(\d+)\.(\d+)/.exec(v); return m ? Number(m[1]) * 1000 + Number(m[2]) : 0; };
const enHistorial = (prev: string): boolean => {
  let s = prev, t: string;
  while ((t = s.replace(/\([^()]*\)/g, '')) !== s) s = t; // fuera los paréntesis ya cerrados
  if (/\(\s*⏸/.test(s)) return true;
  const clausula = s.slice(Math.max(s.lastIndexOf(' · '), s.lastIndexOf('; '), s.lastIndexOf('\n')) + 1);
  if (clausula.includes('⏸')) return true;
  const vs = clausula.match(/\bv\d\.\d+[a-z]?(?!\d)/g);
  return !!vs && verN(vs[vs.length - 1] as string) < VIGENTE_MIN;
};
// v6.10w (dom 22-nov): «el plan del <fecha>» nombra la FECHA DE PLAN misma (p. ej. «el plan del jue 31-dic no tiene día propio»): no se traduce
const PLAN_DEL = /\bplan del\s*$/i;
const externa = (s: string, i: number, n = 0, pre = ''): boolean => enHistorial(s.slice(0, i) + pre) || PLAN_DEL.test(s.slice(Math.max(0, i - 12), i) + pre) || (!/→\s*$/.test(s.slice(Math.max(0, i - 4), i) + pre)
  && (EXTERNA.test(s.slice(Math.max(0, i - 60), i)) || EXTERNA_BANQUEO.test(s.slice(Math.max(0, i - 20), i) + pre) || EXTERNA_VERSION.test(s.slice(Math.max(0, i - 30), i) + pre)
    || EXTERNA_DESPUES.test(s.slice(i + n, i + n + 40))));
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
    if (DOW[dowDe(plan)] !== abrev(dow)) return m; // el día de la semana no cuadra: no es una fecha de esta semana
    if (externa(s, i, m.length, pre)) return m;
    const real = fechaRealDe(plan, frente);
    if (real === plan) return m;
    const mr = MES[Number(real.slice(5, 7)) - 1] ?? mes;
    const dr = DOW_L.includes(dow.toLowerCase()) ? largoComo(real, dow) : diaReal(real, dow); // v6.10d: completo → completo
    return `${pre}${dr}${punto} ${Number(real.slice(8))}-${mes === mes.toUpperCase() ? mr.toUpperCase() : mr}`;
  });
  return t1.replace(RX2, (m, pre: string, dow: string, punto: string, dd: string, i: number, s: string) => {
    // v6.10d: «mar 08» (día con cero delante) no es una fecha de plan (las guías escriben «mar 8»): la nota del SERUMS «preferente mar 08» es de 2027
    const plan = dd.startsWith('0') ? null : planSinMes(dd, dow);
    if (!plan || externa(s, i, m.length, pre)) return m;
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
  // v6.10d: + «ayer» / «mañana a las HH:MM» / «el lunes a las HH:MM» del día de PLAN → el día que de verdad nombran (relativosReales)
  const real = fechaRealDe(fechaPlan);
  if (!xs.length && real === fechaPlan) return g;
  const f = (t: string): string => relativosReales(xs.reduce((acc, x) => acc.split(x.a).join(x.por), t), fechaPlan, real, g.plan);
  return {
    ...g,
    // v6.07e: también la franja (el UWSA1 del dom 15 va 07:40-11:50, no a la hora del plan del mar 10; un desfase único no la cuadra)
    franja: f(g.franja),
    titulo: f(g.titulo),
    pasos: g.pasos.map((p) => ({ ...p, que: f(p.que), como: f(p.como) })),
    recursos: g.recursos.map((r) => ({ ...r, t: f(r.t), ...(r.cantidad ? { cantidad: f(r.cantidad) } : {}) })),
    hecho: f(g.hecho),
    ...(g.planB ? { planB: f(g.planB) } : {}),
    ...(g.aviso ? { aviso: f(g.aviso) } : {}),
  };
}

const _add = (iso: string, n: number): string => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const _corta = (iso: string): string => `${DOW[dowDe(iso)]} ${Number(iso.slice(8))}-${MES[Number(iso.slice(5, 7)) - 1]}`;
const _cap = (t: string, como: string): string => (como[0] !== undefined && como[0] !== como[0].toLowerCase() ? t.charAt(0).toUpperCase() + t.slice(1) : t);
const _SKIP = new Set(FECHAS_V6.skip);
// v6.10f: «(de )mañana» + « (» o « » + una fecha «<día> <n>[-<mes>]» (abreviado o completo); detrás del número no puede venir dígito, letra, «/» ni «:» (hora)
const RX_MANANA_FECHA = /(^|[^\p{L}])(de )?(mañana)( \(| )((?:lunes|martes|miércoles|jueves|viernes|sábado|domingo|lun|mar|mié|jue|vie|sáb|dom)(?![\p{L}]))(\.? (\d{1,2})(?:-(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic))?)(?![\p{L}\d\/:])/giu;
/** v6.10f: la fecha (de PLAN) que nombra «<día> <n>[-<mes>]» en un texto del día de plan `plan`: la primera ≥ plan + 1 (≤ 60 días) con ese día del mes, ese
 *  mes (si lo trae) y ese día de la semana; null si no cuadra (no es una fecha) */
const fechaCitada = (plan: string, dow: string, dd: number, mes?: string): string | null => {
  const w = abrev(dow);
  for (let k = 1; k <= 60; k++) {
    const x = _add(plan, k);
    if (Number(x.slice(8)) === dd && DOW[dowDe(x)] === w && (!mes || MES[Number(x.slice(5, 7)) - 1] === mes.toLowerCase())) return x;
  }
  return null;
};
/**
 * v6.10d (mié 18-nov-2026): palabras RELATIVAS de un texto escrito para el día de PLAN `plan` y pintado el día REAL `real` (alias de corrida_s1: el
 * plan del vie 20 se hace el lun 23). «ayer» (= plan − 1), «mañana a las HH:MM» (= plan + 1) y «el lunes a las HH:MM» (= el lunes siguiente al plan)
 * siguen igual si su día real sigue siendo ayer / mañana; si no, pasan a la FECHA DE PLAN del día que nombran («el jue 19-nov», «el vie 20-nov a las
 * 05:00»), que fechasRealesEnTexto (después) pinta con su día real («el vie 20-nov» / «el lun 23-nov»). Sin alias (real = plan) = el texto tal cual.
 */
export function relativosReales(t: string, plan: string, real: string, frente?: string): string {
  if (!t || plan === real) return t;
  const ayerR = _add(real, -1), mananaR = _add(real, 1);
  const sinSes = new Set(_C.sin_sesion);
  // v6.10u (19-nov): la fecha de PLAN que «ayer» nombra solo cuenta como perdida si nadie la hace (no las que el alias lleva a otro día real: el mié 18-nov se hace
  //   el vie 20). Con la v6.10u el plan del jue 19 se pinta el lun 23 y su «ayer» (plan del mié 18) seguía diciendo «ayer» porque el mié 18 y el dom 22 eran los dos
  //   días reales sin sesión; es el vie 20 → «el mié 18-nov», que fechasRealesEnTexto pinta «el vie 20-nov». El «ayer» real (ayerR) sí es un día real sin sesión
  const llevadas = new Set(Object.values(_C.alias));
  const perdida = (d: string): boolean => sinSes.has(d) && !llevadas.has(d);
  // «de ayer» → «del <día>»; si el día nombrado y el ayer real fueron los dos sin sesión (1.er día), «ayer» sigue valiendo
  let o = t.replace(/(^|[^\p{L}])(de )?(ayer)(?![\p{L}])/giu, (m, pre: string, de: string | undefined, w: string) => {
    const ref = _add(plan, -1);
    if (fechaRealDe(ref) === ayerR || (perdida(ref) && sinSes.has(ayerR))) return m;
    return de ? `${pre}${_cap('del ' + _corta(ref), de)}` : `${pre}${_cap('el ' + _corta(ref), w)}`;
  });
  o = o.replace(/(^|[^\p{L}])(mañana)( a las \d\d:\d\d)/giu, (m, pre: string, w: string, h: string) => {
    // v6.10f (revisión 18-nov · Anki del lun 28-dic): si el día siguiente al plan es SKIP (sin plan para nadie: vie 25-dic), «mañana» quería decir la próxima
    //   sesión = el siguiente L-V hábil del plan (lun 28-dic → mar 29-dic real), no el SKIP («o el vie 25-dic a las 05:00» en el lun 28-dic real)
    let ref = _add(plan, 1);
    // v6.10g (revisión 18-nov · riesgo latente): un bloque EXTRA de corrida_s1 del mismo frente que empieza a esa hora el día real siguiente (sáb 2-ene: lo que
    //   recupera la transición) ES la sesión de «mañana a las HH:MM»: no se salta el sábado (antes iba al «lun 4-ene»)
    if (frente && extraCorridaDe(mananaR).some((x) => x.frente === frente && x.ini === h.slice(-5))) return m;
    if (_SKIP.has(ref)) while (_SKIP.has(ref) || dowDe(ref) === 0 || dowDe(ref) === 6) ref = _add(ref, 1);
    return fechaRealDe(ref) === mananaR ? m : `${pre}${_cap('el ' + _corta(ref), w)}${h}`;
  });
  // v6.10f (revisión 18-nov · relativos): «mañana (<día> <n>[-<mes>] …)» y «mañana <día> <n>[-<mes>]» llevan la FECHA DE PLAN del día que nombran: si su día
  //   real no es el siguiente al real, «mañana» es falso («la eval de mañana (vie 20-nov 15:15)» del plan del jue 19 pintado el vie 20 real = lun 23 real) →
  //   «de la próxima sesión (<fecha> …)» / «en la próxima sesión (<fecha> …)» / «el <fecha>» / «del <fecha>»; la fecha la pinta después fechasRealesEnTexto
  //   con su día real. «la mañana (…)» (= por la mañana) no se toca.
  o = o.replace(RX_MANANA_FECHA, (m, pre: string, de: string | undefined, w: string, sep: string, dow: string, resto: string, dd: string, mes: string | undefined, i: number, s: string) => {
    // v6.10g (revisión 18-nov): + los posesivos («su mañana (…)» = la mañana de alguien, no se toca) · detrás de una preposición («para / desde / hasta / a …
    //   mañana (vie 20-nov …)») va «la próxima sesión (…», sin «en» (antes «pasa para en la próxima sesión (…»)
    const antes = s.slice(Math.max(0, i + pre.length - 12), i + pre.length);
    if (/(?:^|[^\p{L}])(?:la|las|una|esa|cada|esta|toda|su|sus|tu|tus|mi|mis|nuestra|nuestras)\s$/iu.test(antes)) return m;
    const trasPrep = /(?:^|[^\p{L}])(?:a|al|para|desde|hasta|por|en|hacia|tras|sin|con|sobre|entre|antes de|después de)\s$/iu.test(antes);
    const ref = fechaCitada(plan, dow, Number(dd), mes);
    if (!ref || fechaRealDe(ref) === mananaR) return m;
    const fecha = `${dow}${resto}`;
    if (sep === ' ') return `${pre}${de ? _cap('del', de) : _cap('el', w)} ${fecha}`;
    return `${pre}${de ? de + 'la próxima sesión' : _cap(trasPrep ? 'la próxima sesión' : 'en la próxima sesión', w)} (${fecha}`;
  });
  o = o.replace(/(^|[^\p{L}])(el lunes)( a las \d\d:\d\d)/giu, (m, pre: string, w: string, h: string) => {
    let ref = _add(plan, 1); while (dowDe(ref) !== 1) ref = _add(ref, 1);
    const r = fechaRealDe(ref);
    return r === mananaR ? `${pre}${_cap('mañana', w)}${h}` : dowDe(r) === 1 && r > real && r <= _add(real, 7) ? m : `${pre}${_cap('el ' + _corta(ref), w)}${h}`;
  });
  // v6.10d (fix revisión 18-nov): «hoy <día>» con el día de la semana del PLAN → el del día REAL («Hoy viernes no va el OUTPUT» pintado el lunes real). Red de
  //   seguridad: rutinaGuia y gen_encaps_guia ya escriben el día real; esto cubre los textos de otros generadores (otro día nombrado = se deja tal cual)
  o = o.replace(/(^|[^\p{L}])(hoy) (lunes|martes|miércoles|jueves|viernes|sábado|domingo)(?![\p{L}])/giu, (m, pre: string, h: string, d: string) =>
    (d.toLowerCase() === DOW_L[dowDe(plan)] ? `${pre}${h} ${largoComo(real, d)}` : m));
  return o;
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
