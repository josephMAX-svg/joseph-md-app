/**
 * guia.ts — FORMATO COMÚN «qué · cuánto · cómo» de cada franja del día (v6.02c, dom 18-oct-2026, E1).
 *
 * Pedido de Joseph (18-oct): «para TODOS los casos debemos tener establecido QUÉ leer, CUÁNTO leer, CÓMO leer — no puede estar
 * al azar —, qué ver (vídeos y demás) … que todo esté estructurado y definido». Cada plan (USMLE, MIR, ENCAPS, Derma, Research,
 * AURUM, LIVIANO, SYNAPSE, vibecoding, Business) describe CADA franja con este tipo y la pinta con
 * `src/components/GuiaBloqueCard.tsx`. Módulo HOJA: no importa nada (lo pueden importar los .ts generados y los componentes).
 *
 * ── CÓMO USARLO (para los demás agentes / generadores) ──────────────────────────────────────────────────────────────────────────
 *  1. Construye un `GuiaBloque` por franja: `franja` 'HH:MM–HH:MM' (guion largo «–», como FRANJAS de usmleStep1Daily), `plan` = la
 *     clave del plan ('usmle', 'mir', 'encaps', 'research-derma', 'aurum', 'liviano', 'synapse', 'vibecoding', 'business'…; las de
 *     plantillasV6.PlanBloque), `titulo` corto, `totalMin` = minutos de la franja.
 *  2. `pasos` en orden. REGLA DE ORO: Σ pasos[].min === totalMin === minutos de `franja` (compruébalo con `validarGuia`; un
 *     generador debe abortar si devuelve errores). Cada paso:
 *       · `que`   = algo CONCRETO: vídeo por nombre + duración, capítulo/sección, nº de preguntas + filtro exacto, nº de casos,
 *                   páginas SOLO si son verificables. Nada inventado: si un dato no es verificable, dilo («sección X del capítulo»).
 *       · `como`  = instrucción operativa (método Palmerton / PLAN del plan): dónde se hace clic, modo, velocidad, qué se anota.
 *       · `enlace` = { t, url } directo cuando el recurso tiene URL (https; nunca un esquema que dependa de un navegador concreto).
 *  3. `recursos` = la lista de material de la franja con su URL (y `min` o `cantidad` si se conoce).
 *  4. `hecho` = criterio OBSERVABLE de «terminado» (p. ej. «10Q respondidas y el % anotado en 📏 Medición»).
 *  5. `planB` = qué hacer si el recurso no está (acceso caducado, web caída, sin suscripción…).
 *  6. `aviso` (opcional) = advertencia visible: mapeo no exacto con el catálogo, carga que no cabe, decisión pendiente de Joseph.
 *  Pintar: `<GuiaBloqueCard g={bloque} color={Colors.green} />` (prop `compacto` para el Home: cabecera + pasos plegables).
 *  Home (TodayMission): devuelve `guias: GuiaBloque[]` desde el `case` de tu plan en `contenidoBloque` y el render común las pinta
 *  debajo del bloque (no toques el render de otros planes).
 * ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 * v6.02c (18-oct-2026): nuevo (E1 · formato común + USMLE). Primer consumidor: src/lib/usmleGuia.ts (GENERADO por
 *   DATA/_scripts/usmle/gen_usmle_guia.js).
 */

export interface GuiaEnlace {
  /** texto del botón (corto) */
  t: string;
  /** URL https directa (o file:/// / obsidian:// cuando el recurso es local) */
  url: string;
}
export interface GuiaPaso {
  /** minutos del paso (enteros ≥ 1) */
  min: number;
  /** QUÉ: recurso concreto + cuánto (vídeo y duración, nº de preguntas y filtro exacto, sección…) */
  que: string;
  /** CÓMO: instrucción operativa */
  como: string;
  enlace?: GuiaEnlace;
}
export interface GuiaRecurso {
  t: string;
  url: string;
  /** minutos del recurso (vídeo) si se conocen */
  min?: number;
  /** cantidad legible («10Q», «2 artículos», «3 casos») */
  cantidad?: string;
}
export interface GuiaBloque {
  /** 'HH:MM–HH:MM' */
  franja: string;
  /** clave del plan ('usmle', 'mir', 'encaps'…) */
  plan: string;
  titulo: string;
  /** minutos de la franja = Σ pasos[].min */
  totalMin: number;
  pasos: GuiaPaso[];
  recursos: GuiaRecurso[];
  /** criterio de «terminado» */
  hecho: string;
  /** qué hacer si el recurso principal no está disponible */
  planB?: string;
  /** aviso visible (mapeo no exacto, carga que se reparte, decisión pendiente) */
  aviso?: string;
}

const HHMM = /^(\d{2}):(\d{2})$/;
/** 'HH:MM' → minutos desde las 00:00 (NaN si no es una hora). */
export function aMinutos(h: string): number {
  const m = HHMM.exec(h.trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : NaN;
}
/** Partes de una franja 'HH:MM–HH:MM' (acepta «–» o «-»). null si no es una franja. */
export function partesFranja(franja: string): { ini: string; fin: string } | null {
  const m = /^(\d{2}:\d{2})\s*[–-]\s*(\d{2}:\d{2})$/.exec(franja.trim());
  return m ? { ini: m[1] as string, fin: m[2] as string } : null;
}
/** Minutos de una franja 'HH:MM–HH:MM' (NaN si no es una franja). */
export function minutosFranja(franja: string): number {
  const p = partesFranja(franja);
  return p ? aMinutos(p.fin) - aMinutos(p.ini) : NaN;
}
/** Σ pasos[].min */
export function sumaPasos(g: GuiaBloque): number {
  return g.pasos.reduce((a, p) => a + (Number.isFinite(p.min) ? p.min : 0), 0);
}
/**
 * Errores de forma de un bloque (vacío = correcto): suma de pasos ≠ totalMin ≠ minutos de la franja, pasos sin qué/cómo,
 * minutos no enteros, enlaces sin URL, `hecho` vacío.
 */
export function validarGuia(g: GuiaBloque): string[] {
  const e: string[] = [];
  const mf = minutosFranja(g.franja);
  const sp = sumaPasos(g);
  if (!Number.isFinite(mf)) e.push(`franja «${g.franja}» no es HH:MM–HH:MM`);
  else if (mf !== g.totalMin) e.push(`totalMin ${g.totalMin} ≠ minutos de la franja ${mf}`);
  if (sp !== g.totalMin) e.push(`Σ pasos ${sp} ≠ totalMin ${g.totalMin}`);
  if (!g.pasos.length) e.push('sin pasos');
  g.pasos.forEach((p, i) => {
    if (!Number.isInteger(p.min) || p.min < 1) e.push(`paso ${i + 1}: min ${p.min} no es entero ≥ 1`);
    if (!p.que || !p.que.trim()) e.push(`paso ${i + 1}: «qué» vacío`);
    if (!p.como || !p.como.trim()) e.push(`paso ${i + 1}: «cómo» vacío`);
    if (p.enlace && !/^(https?:|file:|obsidian:|vscode:)/.test(p.enlace.url)) e.push(`paso ${i + 1}: enlace sin URL válida`);
  });
  g.recursos.forEach((r, i) => { if (!/^(https?:|file:|obsidian:|vscode:)/.test(r.url)) e.push(`recurso ${i + 1}: URL no válida`); });
  if (!g.hecho || !g.hecho.trim()) e.push('«hecho» vacío');
  return e;
}
/** «45′» · «1 h 05′» */
export function fmtMin(min: number): string {
  if (!Number.isFinite(min)) return '—';
  if (min < 60) return `${min}′`;
  const h = Math.floor(min / 60), m = min % 60;
  return m ? `${h} h ${String(m).padStart(2, '0')}′` : `${h} h`;
}
/** ¿La franja empieza dentro de [ini, fin)? (para agrupar las franjas de un bloque del Home, p. ej. 07:15–12:00). */
export function franjaDentro(franja: string, ini: string, fin: string): boolean {
  const p = partesFranja(franja);
  if (!p) return false;
  const a = aMinutos(p.ini);
  return a >= aMinutos(ini) && a < aMinutos(fin);
}
/**
 * v6.02d (semana 1 corrida): la misma guía `desfaseMin` minutos más tarde (o antes si es negativo). Solo cambia la franja: pasos,
 * minutos y Σ pasos quedan intactos (validarGuia sigue cuadrando). 0 → la misma guía.
 */
export function moverGuia(g: GuiaBloque, desfaseMin: number): GuiaBloque {
  const p = partesFranja(g.franja);
  if (!desfaseMin || !p) return g;
  const hhmm = (m: number): string => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  return { ...g, franja: `${hhmm(aMinutos(p.ini) + desfaseMin)}–${hhmm(aMinutos(p.fin) + desfaseMin)}` };
}
