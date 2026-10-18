/**
 * dermaGuia.ts — GUÍA «qué · cuánto · cómo» de cada sesión Derma (franja R↔D 13:30–14:15, 45′; 30′ en tiempo muerto en el SERUMS) en el
 * formato común `GuiaBloque` (src/lib/guia.ts). Pedido de Joseph (18-oct-2026): «para dermatología y para TODOS los casos … QUÉ leer,
 * CUÁNTO leer, CÓMO leer — no puede estar al azar».
 *
 *  · Cada sesión tiene DOS guías completas (Σ pasos = minutos de la franja):
 *      plan A = AccessDermatology (casos ciegos exactos con su URL directa · imagen dermatoscópica · Pictorial Review 4e por TEMA del
 *               «Create Custom Quiz» o el banco de la fila · test ProMIR en las sesiones d ≡ 0 mod 3 · lectura del libro por NOMBRE de capítulo)
 *      plan B = acceso remoto CADUCADO (comprobado el 18-oct): uWorld Step 1 › System de Dermatology afín (Tutor) · B&B Step 1 › Dermatology
 *               a la velocidad de la semana · ProMIR Dermatología · DermNet · proyecto Claude «AESTHETIC DERMATOLOGY»; los casos del día
 *               quedan PENDIENTES (nada se recorta: entran en el slot del Pictorial al recuperar el acceso).
 *  · d1-d5 (lun 19 · mié 21 · vie 23 · mar 27 · jue 29-oct) = CURADAS (DERMA_GUIA_CURADA, src/lib/dermaGuiaDatos.ts GENERADO por
 *    DATA/DERMATOLOGIA/guia/gen_derma_guia.js); el resto = POR REGLA desde la fila del plan (dermaDailyPlan / dermaCiclo2) con aviso visible.
 *  · `accessDermaOK()` / `guardarAccessDermaOK()` — preferencia por visor (localStorage 'jmd-accessderma-ok'; por defecto CADUCADO): decide
 *    qué guía se muestra primero en el Home y en Derma › HOY.
 * v6.02c (18-oct-2026, E3): nuevo.
 * v6.02c F2 (18-oct-2026, pulido · hallazgos E6):
 *  · uWorld Step 1 › Dermatology en el PLAN B: las Unused se REPARTEN en orden de fecha (`dermaUwAsignacion`, peor caso = todas las sesiones
 *    por plan B; el plan A no toca uWorld): cuando un System se agota (Inflammatory 28 · Skin and soft tissue infections 18 · …), el paso se
 *    sustituye por un relleno CONCRETO = ProMIR Dermatología › capítulo afín · N preguntas a 77 s/Q (nada de minutos vacíos). Taper = 0 nuevas
 *    (Status Incorrect).
 *  · TEST ProMIR de las sesiones PMD: el MISMO nº de preguntas y minutos en plan A y plan B (`testPMDDe`: el hueco de review del plan A, con la
 *    lectura a 9′ en PMD → 8Q en 11′ con 2 casos); taper = 0 preguntas nuevas en los dos planes.
 *  · d12 (farmacodermias, «no errar»): la lectura de 10′ es la del ÁTOMO (S23 «Adverse Cutaneous Drug Reactions» del Color Atlas 9e, fila del
 *    plan + índice verificado) y el módulo 4 del micro-track de dermatoscopia (sin relación con el átomo) pasa a d42 (`moduloCMEDe`).
 *  · imagen dermatoscópica en Dermoscopedia: respaldo DermNet «Dermoscopy (Dermatoscopy)» (Dermoscopedia falla por HTTPS desde algunas redes).
 */
import type { GuiaBloque, GuiaPaso, GuiaRecurso } from './guia';
import { aMinutos } from './guia';
import {
  type DiaDerma, type DermatoscopiaModulo, dermaCasoArea, dermaTaperEfectivo, promirDermaCapDe, PROMIR_DERMA_CAPS, pm, PM_CAP,
  dermatoscopiaModuloDe, qa, cases, DERMA_DIAS,
} from './dermaDailyPlan';
import { DERMA_DIAS_TODOS } from './dermaCiclo2';
import { faseV6 } from './fechasV6';
import { dermaAnkiDeck } from './ankiLinks';
import {
  DERMA_CASO_GBOS, DERMA_GUIA_CURADA, PICTORIAL_ASIGNACION, PICTORIAL_TEMAS, BB_DERM, UW_DERM, DERMA_VELOCIDAD, DERMA_TEST_PROMIR_D3,
  DERMA_GUIA_DATOS_META, DERMA_CME_DESPLAZADO, DERMNET_DERMOSCOPY,
} from './dermaGuiaDatos';

export { DERMA_GUIA_DATOS_META, DERMA_TEST_PROMIR_D3, DERMNET_DERMOSCOPY };

export const AESTHETIC_DERMATOLOGY_URL = 'https://claude.ai/project/019d135e-b442-71fc-bd3c-e2b6ea78796f';
export const ACCESSDERMA_AVISO = 'AccessDerma: renueva el acceso remoto desde la red de tu institución (campus/VPN, o «Sign in via OpenAthens/Shibboleth»). Mientras tanto manda el PLAN B.';
const QBANKS = 'https://qbankly.app/qbanks';
const VIDEOS = 'https://qbankly.app/videos';
const DERMNET = 'https://dermnetnz.org';
/** Respaldo de Dermoscopedia (que falla por HTTPS desde algunas redes): mismo patrón en DermNet. */
const DSC_RESPALDO = '· si Dermoscopedia no carga: DermNet «Dermoscopy (Dermatoscopy)» (en los recursos), mismas estructuras con imágenes.';
const SEG_Q = 77; // s por pregunta ProMIR (ritmo MIR)
const AREA_TXT = { Med: 'Medical Dermatology', Path: 'Dermatopathology', Peds: 'Pediatric Dermatology', Surg: 'Surgical Dermatology' } as const;
const AREA_OFFSET = { Path: 0, Med: 30, Peds: 140, Surg: 170 } as const;

/** URL DIRECTA del caso (id = posición 1-200 del listado real) · null si no existe. */
export function dermaCasoUrl(id: number): string | null {
  const g = DERMA_CASO_GBOS[id - 1];
  return g ? `https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=${g}&gbosContainerID=310&viewByNumber=false&groupid=1546` : null;
}
/** «Medical Dermatology. Case 013» (título real del listado; no revela el diagnóstico). */
export function dermaCasoTitulo(id: number): string {
  const a = dermaCasoArea(id);
  const n = id - AREA_OFFSET[a];
  return `${AREA_TXT[a]}. Case ${String(n).padStart(a === 'Med' ? 3 : 2, '0')}`;
}

// ── preferencia: ¿AccessDerma renovado? (por visor; por defecto NO: el 18-oct el acceso remoto estaba caducado) ──
const LS_KEY = 'jmd-accessderma-ok';
export function accessDermaOK(): boolean {
  try { const ls = (globalThis as any).localStorage; return !!ls && ls.getItem(LS_KEY) === '1'; } catch { return false; }
}
export function guardarAccessDermaOK(ok: boolean): void {
  try { const ls = (globalThis as any).localStorage; if (ls) ls.setItem(LS_KEY, ok ? '1' : '0'); } catch { /* sin almacenamiento */ }
}

// ── velocidad de vídeo (misma regla que el Step 1) ──
function vel(fecha: string): { v: number; f: number; txt: string } {
  if (fecha <= DERMA_VELOCIDAD.s1Hasta) return { v: 1, f: 1.2, txt: '1,0× con subtítulos en inglés (CC)' };
  if (fecha <= DERMA_VELOCIDAD.s23Hasta) return { v: 1.25, f: 1.15, txt: '1,25× con subtítulos EN' };
  return { v: 1.5, f: 1.15, txt: '1,5× con subtítulos EN (si el free recall del último vídeo recogió ≥3 ideas; si no, 1,25×)' };
}
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const bbMin = (id: number, fecha: string): number => { const v = BB_DERM[id]; const k = vel(fecha); return v ? Math.round((v.s / 60 / k.v) * k.f) : 0; };

/** Afinidad átomo → B&B (vídeo) · uWorld (System) · ProMIR Dermatología (capítulo). Por palabras del `sub`; si no, por bloque. */
interface Afin { bb?: number; uw?: number; pmd?: number }
const AFIN_SUB: Array<[RegExp, Afin]> = [
  [/dermatoscop/i, { pmd: 10 }],
  [/psoria|papuloescam|liquen/i, { bb: 71, uw: 1028, pmd: 5 }],
  [/eccema|atópica|contacto|seborreica/i, { bb: 77, uw: 1028, pmd: 5 }],
  [/acné|rosácea|hidradenitis/i, { bb: 72, uw: 1027, pmd: 7 }],
  [/ampoll|pénfigo|penfigoide|herpetiforme/i, { bb: 76, uw: 1028, pmd: 6 }],
  [/urticaria|angioedema|prurito/i, { bb: 77, uw: 1028, pmd: 7 }],
  [/farmacoderm|SJS|DRESS|AGEP/i, { bb: 77, uw: 1028, pmd: 8 }],
  [/conectivopat|lupus|dermatomiositis|morfea|vasculitis|paniculitis/i, { bb: 281, uw: 1028, pmd: 3 }],
  [/bacterian|impétigo|celulitis|SSSS|fascitis|sífilis|ITS|micobacter|lepra|virales|HSV|VPH|molusco|parasitosis|escabiosis|leishmaniasis/i, { bb: 75, uw: 1031, pmd: 2 }],
  [/micosis|KOH|esporotric/i, { bb: 251, uw: 1031, pmd: 2 }],
  [/melanoma|basocelular|espinocelular|queratosis actínica|linfoma|Merkel|Kaposi|tumores benignos|nevus/i, { bb: 78, uw: 1032, pmd: 4 }],
  [/facomatosis|NF1|esclerosis tuberosa|Sturge/i, { bb: 79, uw: 1032, pmd: 9 }],
  [/genodermatosis|ictiosis|epidermólisis/i, { bb: 76, uw: 1028, pmd: 9 }],
  [/hemangioma|malformaciones vasculares|neonatal/i, { bb: 74, uw: 1032 }],
  [/exantema|Kawasaki/i, { bb: 75, uw: 1031, pmd: 2 }],
];
const AFIN_BLOQUE: Partial<Record<DiaDerma['bKey'], Afin>> = {
  A: { bb: 69, uw: 1030, pmd: 1 }, B: { bb: 71, uw: 1028, pmd: 5 }, C: { bb: 75, uw: 1031, pmd: 2 }, D: { bb: 78, uw: 1032, pmd: 4 },
  E: { uw: 1028, pmd: 1 }, F: { bb: 79, uw: 1032, pmd: 9 },
};
function afinDe(dia: DiaDerma): Afin {
  for (const [re, a] of AFIN_SUB) if (re.test(dia.sub)) return a;
  return AFIN_BLOQUE[dia.bKey] ?? {};
}

/** Capítulo ProMIR del test de la sesión (rotación del ciclo 1 o, en el ciclo 2, el capId del enlace de la fila). */
const capDe = (dia: DiaDerma) => promirDermaCapDe(dia.d) ?? (dia.promir ? PROMIR_DERMA_CAPS.find((c) => dia.promir!.url.endsWith(c.capId)) : undefined);
const franjaDe = (ini: string, min: number) => { const f = aMinutos(ini) + min; return `${ini}–${String(Math.floor(f / 60)).padStart(2, '0')}:${String(f % 60).padStart(2, '0')}`; };
/** Reparte el sobrante en el paso «relleno» (min 0) para que Σ pasos = total. */
function cuadrar(pasos: GuiaPaso[], total: number): GuiaPaso[] {
  const fijo = pasos.reduce((s, p) => s + p.min, 0);
  const i = pasos.findIndex((p) => p.min === 0);
  if (i >= 0) { const out = pasos.slice(); out[i] = { ...out[i], min: Math.max(1, total - fijo) } as GuiaPaso; return out; }
  if (fijo !== total && pasos.length) { const out = pasos.slice(); const k = out.length - 1; out[k] = { ...out[k], min: Math.max(1, (out[k] as GuiaPaso).min + total - fijo) } as GuiaPaso; return out; }
  return pasos;
}
const ankiPaso = (dia: DiaDerma, min: number): GuiaPaso => ({
  min, que: `Anki ${dermaAnkiDeck(dia.bKey)} · repaso FSRS de las tarjetas de MECANISMO + fallos del ledger`,
  como: 'Solo Good/Again · deuda a cero; si no hay repasos, recita en voz alta la tarjeta de la sesión anterior.',
});
const cierrePaso = (min: number, extra = ''): GuiaPaso => ({ min, que: 'CIERRE · free recall en voz alta + tarjetas de MECANISMO', como: `Free recall en voz alta (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo.${extra ? ' ' + extra : ''}` });
function casoPaso(id: number, k: number, n: number, min: number): GuiaPaso {
  const url = dermaCasoUrl(id) ?? cases(1546);
  return {
    min, que: `CASO CIEGO ${k}/${n} · ${dermaCasoTitulo(id)} (#${id}) — Dermatology Cases for Board Review`,
    como: `① solo la imagen: dictado de los 8 ejes en la app ② diferencial de 3 ANTES de leer ③ viñeta + responde ④ discusión → 1 tarjeta de MECANISMO + 1 oclusión · registra ✓/✗ desde el chip «Caso #${id}» (módulo CORE: ${dermaCasoArea(id)}).`,
    enlace: { t: `Caso #${id} · ${dermaCasoTitulo(id)}`, url },
  };
}

// ── v6.02c F2 (E6) · micro-track de dermatoscopia: módulo que se LEE en la sesión ────────────────────────────────────────────────────
export interface ModuloCMEHoy { modulo: DermatoscopiaModulo; pendienteDe?: number; siSobra?: DermatoscopiaModulo }
/** Módulo DermNet Dermoscopy CME que se lee HOY en el plan A (null = la lectura de 10′ es la del ÁTOMO). d12 → lectura del átomo (su módulo 4
 *  no tiene relación con las farmacodermias) · d42 (repaso del micro-track) → el módulo 4 pendiente del d12 y, si sobra, sus quizzes. */
export function moduloCMEDe(dia: DiaDerma): ModuloCMEHoy | null {
  const propio = dia.dermatoscopiaModulo ?? dermatoscopiaModuloDe(dia.d);
  if (DERMA_CME_DESPLAZADO[dia.d]) return null;
  const org = Object.entries(DERMA_CME_DESPLAZADO).find(([, v]) => v.destino === dia.d);
  if (org) {
    const o = DERMA_DIAS.find((x) => x.d === Number(org[0]));
    const m = o ? (o.dermatoscopiaModulo ?? dermatoscopiaModuloDe(o.d)) : undefined;
    if (m) return { modulo: m, pendienteDe: Number(org[0]), ...(propio ? { siSobra: propio } : {}) };
  }
  return propio ? { modulo: propio } : null;
}

// ── v6.02c F2 (E6) · presupuesto del plan A y TEST ProMIR común a los dos planes ───────────────────────────────────────────────────────
const esPMD = (dia: DiaDerma) => !!(dia.promir && capDe(dia));
interface PresupuestoA { pasos: GuiaPaso[]; n: number; taper: boolean; corto: boolean; cme: ModuloCMEHoy | null; lecturaMin: number; cierreMin: number; reviewMin: number }
/** Minutos del plan A por regla: Anki + casos + imagen + LECTURA (9′ en PMD para que el test tenga 11′ = 8Q con 2 casos) + cierre; el resto =
 *  review (variable de ajuste). */
function presupuestoA(dia: DiaDerma, total: number): PresupuestoA {
  const taper = !!dermaTaperEfectivo(dia);
  const corto = total < 45;
  const casos = taper ? dia.casoIds.slice(0, 1) : dia.casoIds;
  const n = casos.length;
  const pasos: GuiaPaso[] = [ankiPaso(dia, corto ? 2 : 3)];
  const porCaso = taper ? 12 : n >= 3 ? 8 : 9;
  if (n) casos.forEach((id, i) => pasos.push(casoPaso(id, i + 1, n, porCaso)));
  else pasos.push({ min: corto ? 14 : 18, que: 'SEGUNDA PASADA FSRS · solo casos fallados del ledger (0 casos nuevos)', como: 'Abre cada caso fallado desde su chip y re-regístralo; si sale «Lo sabía», abandona la lista.', enlace: { t: 'Board Review · casos', url: cases(1546) } });
  if (dia.dermatoscopiaImg) {
    const dsa = dia.dermatoscopiaImg.includes('bookid=2929');
    pasos.push({ min: 2, que: `IMAGEN DERMATOSCÓPICA CIEGA · ${dsa ? 'Dermoscopy: An Illustrated Self-Assessment Guide 2e → la imagen siguiente' : 'Dermoscopedia · patrón de la sesión (tapa el título)'}`, como: `Estructuras → patrón → diagnóstico en voz alta ANTES de revelar · registra ✓/✗ en ①b.${dsa ? '' : ' ' + DSC_RESPALDO}`, enlace: { t: dsa ? 'Dermoscopy Self-Assessment 2e' : 'Dermoscopedia', url: dia.dermatoscopiaImg } });
  }
  const cme = moduloCMEDe(dia);
  const lecturaMin = corto ? 0 : (cme || dia.extra || taper) ? (esPMD(dia) && !taper ? 9 : 10) : 0;
  const cierreMin = 2;
  const reviewMin = total - pasos.reduce((s, p) => s + p.min, 0) - lecturaMin - cierreMin;
  return { pasos, n, taper, corto, cme, lecturaMin, cierreMin, reviewMin };
}
/** TEST ProMIR de una sesión PMD: el MISMO nº de preguntas y minutos en plan A y plan B (77 s/Q, máx. 8) = el hueco de review del plan A.
 *  null = no hay test común (no es PMD · taper = 0 preguntas nuevas · el plan A de 30′ con casos no tiene hueco). */
export function testPMDDe(dia: DiaDerma, total = 45): { nQ: number; min: number } | null {
  if (!esPMD(dia) || dermaTaperEfectivo(dia)) return null;
  const r = presupuestoA(dia, total).reviewMin;
  return r >= 3 ? { nQ: Math.min(8, Math.floor((r * 60) / SEG_Q)), min: r } : null;
}

// ── v6.02c F2 (E6) · reparto de las Unused de uWorld (Systems de Dermatology) entre las sesiones del PLAN B ─────────────────────────────
/** System de uWorld → capítulo ProMIR Dermatología afín (relleno cuando el System se agota). */
const UW_A_PMD: Record<number, number> = { 1027: 7, 1028: 5, 1029: 1, 1030: 1, 1031: 2, 1032: 4 };
export interface DermaUwAsig { uw: number; pide: number; toma: number; quedanAntes: number }
let UW_ASIG: Map<string, DermaUwAsig> | null = null;
/** Lo que pide el plan B por regla de uWorld en esa sesión ([System, nº]) · null si no usa uWorld nuevo (PMD · taper · sin System afín). */
function uwPedidoRegla(dia: DiaDerma): [number, number] | null {
  if (esPMD(dia) || dermaTaperEfectivo(dia)) return null;
  const a = afinDe(dia);
  if (!a.uw || !UW_DERM[a.uw]) return null;
  return [a.uw, faseV6(dia.fecha) === 'F4' ? 3 : 4];
}
/** Reparto en orden de fecha (peor caso: TODAS las sesiones por plan B; el plan A no toca uWorld): curadas d1-d5 (lo que piden sus pasos) +
 *  regla (4Q; 3Q en el SERUMS, 30′). `toma` < `pide` = el System se agotó → el paso pasa a ProMIR. */
export function dermaUwAsignacion(): Map<string, DermaUwAsig> {
  if (UW_ASIG) return UW_ASIG;
  const quedan = new Map<number, number>(Object.entries(UW_DERM).map(([id, v]) => [Number(id), v.q]));
  const idDe = (nombre: string) => Number(Object.entries(UW_DERM).find(([, v]) => v.nombre === nombre)?.[0] ?? NaN);
  const m = new Map<string, DermaUwAsig>();
  for (const dia of [...DERMA_DIAS_TODOS].sort((x, y) => (x.fecha < y.fecha ? -1 : x.fecha > y.fecha ? 1 : 0))) {
    const c = DERMA_GUIA_CURADA[dia.d];
    let pedido: [number, number] | null = null;
    if (c && c.fecha === dia.fecha) {
      for (const p of c.planB.pasos) { const r = /System «([^»]+)» · Unused · (\d+)Q/.exec(p.que); if (r) { const id = idDe(r[1] as string); if (Number.isFinite(id)) pedido = [id, Number(r[2])]; } }
    } else pedido = uwPedidoRegla(dia);
    if (!pedido) continue;
    const [uw, pide] = pedido; const q = quedan.get(uw) ?? 0; const toma = Math.min(pide, q);
    m.set(dia.fecha, { uw, pide, toma, quedanAntes: q });
    quedan.set(uw, q - toma);
  }
  UW_ASIG = m;
  return m;
}

/** Plan A por regla (fila del plan → pasos). `total` 45′ (F1-F3) o 30′ (SERUMS: núcleo = casos + imagen). */
function planAPorRegla(dia: DiaDerma, ini: string, total: number): GuiaBloque {
  const { pasos, n, taper, corto, cme, lecturaMin, cierreMin, reviewMin } = presupuestoA(dia, total);
  const modulo = cme?.modulo;
  // review = variable de ajuste (v6.02c F2: en PMD el test es el MISMO que el del plan B → testPMDDe)
  if (reviewMin >= 3) {
    const cap = capDe(dia);
    const nQ = Math.max(2, Math.floor((reviewMin * 60) / SEG_Q));
    const t = testPMDDe(dia, total);
    if (taper && dia.qbankly) pasos.push({ min: reviewMin, que: 'REVIEW · TAPER: repaso FSRS de fallos del ledger (0 preguntas nuevas)', como: 'Re-registra cada caso/pregunta fallado; el cursor de cada banco no se mueve hoy.', enlace: { t: dia.qbankly.t.slice(0, 60), url: dia.qbankly.url } });
    else if (dia.promir && cap && t) pasos.push({ min: t.min, que: `ProMIR Dermatología › cap. ${cap.n} «${cap.t}» · TEST ${t.nQ}Q`, como: `77 s/Q (el mismo test de ${t.nQ}Q que el plan B) · preguntas: la lista «Pool oficial» de la app (capítulo → asignatura); si no hay, el test del capítulo ProMIR · registra el neto (kind derma10Q, asignatura Dermatología) · secciones del capítulo SIN MEDIR.`, enlace: { t: `ProMIR · Derma cap. ${cap.n}`, url: pm(cap.capId) } });
    else if (dia.qbankly && dia.qbankly.url.startsWith(qa(3626)) && PICTORIAL_ASIGNACION[dia.d]) {
      const asig = PICTORIAL_ASIGNACION[dia.d]!;
      const tot = (t: string) => PICTORIAL_TEMAS.find((x) => x.t === t)?.n ?? 0;
      pasos.push({ min: reviewMin, que: `PICTORIAL REVIEW 4e · Create Custom Quiz › ${asig.map(([t, k]) => `«${t}» = ${k} (de ${tot(t)})`).join(' + ')}`, como: `«Create Custom Quiz»: escribe ${asig.map(([t, k]) => `${k} en ${t}`).join(' y ')} → «Start Custom Quiz» · ~60 s/Q · antes de las opciones describe la imagen (lesión 1ª/2ª + color) · el quiz no se guarda a medias · cada fallo → «fallo →».`, enlace: { t: 'Pictorial Review 4e', url: qa(3626) } });
    } else if (dia.qbankly) pasos.push({ min: reviewMin, que: `REVIEW · ${dia.qbankly.t.split(' · ')[0]} · ~${Math.min(10, nQ)}Q desde el Q# del cursor`, como: 'Retoma en el «Q#» que muestra la app (cursor del ledger) · ~60 s/Q · cada fallo → ledger con su módulo CORE · variable de ajuste: si el caso pidió más, menos preguntas.', enlace: { t: dia.qbankly.t.slice(0, 60), url: dia.qbankly.url } });
    else pasos.push({ min: reviewMin, que: 'REVIEW · fallos del ledger', como: 'Sin banco asignado: repasa los casos/preguntas fallados.', enlace: { t: 'Board Review · casos', url: cases(1546) } });
  }
  const desplazado = DERMA_CME_DESPLAZADO[dia.d];
  if (lecturaMin) {
    if (modulo && cme?.pendienteDe) pasos.push({ min: lecturaMin, que: `LECTURA · DermNet Dermoscopy CME › módulo ${modulo.n}/18 «${modulo.t}» (pendiente del d${cme.pendienteDe})${cme.siSobra ? ` · si sobra: «${cme.siSobra.t}»` : ''}`, como: `Lee el módulo con sus imágenes; tapa el pie de cada imagen y nómbrala antes de leer · el d${cme.pendienteDe} leyó el capítulo de su átomo y su módulo del micro-track pasó aquí (la sesión de repaso del micro-track): nada se recorta.`, enlace: { t: `DermNet CME · ${modulo.t}`.slice(0, 70), url: modulo.url } });
    else if (modulo) pasos.push({ min: lecturaMin, que: `LECTURA · DermNet Dermoscopy CME › ${modulo.n <= 18 ? `módulo ${modulo.n}/18` : 'repaso'} «${modulo.t}»`, como: 'Lee el módulo con sus imágenes; tapa el pie de cada imagen y nómbrala antes de leer · la lectura del módulo del libro pasa a la sesión impar.', enlace: { t: `DermNet CME · ${modulo.t}`.slice(0, 70), url: modulo.url } });
    else if (dia.extra && desplazado) pasos.push({ min: lecturaMin, que: `LECTURA del ÁTOMO · ${desplazado.libro} › «${desplazado.capitulo}»`, como: `Por encabezados + figuras con su pie (nunca lineal): ${desplazado.foco} · longitud sin medir (acceso caducado). ${desplazado.motivo}`, enlace: { t: desplazado.capitulo.slice(0, 70), url: desplazado.url } });
    else if (dia.extra) pasos.push({ min: lecturaMin, que: `LECTURA dirigida · ${dia.extra.t}`, como: `${dia.referente ? `Fuente nº1 de ${dia.referente} · ` : ''}por encabezados + figuras con su pie; nunca lectura lineal · capítulo/sección por nombre (longitud sin medir).`, enlace: { t: dia.extra.t.slice(0, 70), url: dia.extra.url } });
    else pasos.push({ min: lecturaMin, que: 'TAPER · 0 lectura nueva: repaso de las tarjetas de MECANISMO falladas', como: 'La semana de examen se consolida lo fallado (regla PLAN_ELITE).' });
  }
  pasos.push(cierrePaso(cierreMin));
  const p2 = cuadrar(pasos, total);
  const recursos: GuiaRecurso[] = [{ t: 'Dermatology Cases for Board Review (listado)', url: cases(1546), cantidad: `${n} caso${n === 1 ? '' : 's'}` }];
  if (dia.qbankly) recursos.push({ t: dia.qbankly.t.slice(0, 70), url: dia.qbankly.url });
  if (dia.promir) recursos.push({ t: dia.promir.t.slice(0, 70), url: dia.promir.url });
  if (dia.extra) recursos.push({ t: dia.extra.t.slice(0, 70), url: dia.extra.url });
  if (cme?.siSobra) recursos.push({ t: `DermNet CME · ${cme.siSobra.t}`.slice(0, 70), url: cme.siSobra.url });
  if (dia.atlasUrl) recursos.push({ t: 'Atlas del átomo', url: dia.atlasUrl });
  if (dia.dermatoscopiaImg && !dia.dermatoscopiaImg.includes('bookid=2929')) recursos.push({ t: 'DermNet · Dermoscopy (respaldo de Dermoscopedia)', url: DERMNET_DERMOSCOPY });
  return {
    franja: franjaDe(ini, total), plan: 'research-derma', titulo: `DERMA d${dia.d} · ${dia.sub.slice(0, 80)} — plan A (AccessDerma)`, totalMin: total, pasos: p2, recursos,
    hecho: `${n ? `${n} caso${n === 1 ? '' : 's'} registrado${n === 1 ? '' : 's'} en el ledger` : 'fallos del ledger re-registrados'}${dia.dermatoscopiaImg ? ' + 1 imagen dermatoscópica' : ''}${reviewMin >= 3 ? ' + review terminado con sus fallos registrados' : ''}${lecturaMin ? ' + lectura hecha' : ''} + ≤3 tarjetas de MECANISMO.`,
    planB: 'Sin acceso a AccessDerma → PLAN B de esta sesión (toca «AccessDerma caducado»).',
    aviso: corto ? 'SERUMS: 30′ en tiempo muerto → núcleo = casos ciegos + imagen; review y lectura solo si sobra.' : 'Guía por regla (sesión no curada): casos, banco y lectura salen de la fila del plan; el tema del Pictorial sale de la asignación por afinidad.',
  };
}

/** Plan B por regla (acceso remoto caducado). */
function planBPorRegla(dia: DiaDerma, ini: string, total: number): GuiaBloque {
  const a = afinDe(dia);
  const corto = total < 45;
  const taper = !!dermaTaperEfectivo(dia);
  const pasos: GuiaPaso[] = [ankiPaso(dia, corto ? 2 : 3)];
  const cap = capDe(dia);
  const t = testPMDDe(dia, total);
  if (dia.promir && cap) {
    // v6.02c F2 (E6): el MISMO test que el plan A (nº de preguntas y minutos) · taper = 0 preguntas nuevas
    if (taper) pasos.push({ min: corto ? 8 : 11, que: `TAPER · ProMIR Dermatología › cap. ${cap.n} «${cap.t}» · 0 preguntas nuevas: repaso de tus fallos ProMIR de Dermatología del ledger`, como: 'Re-responde (sin mirar) cada pregunta ProMIR de Dermatología fallada en sesiones anteriores · 77 s/Q · la semana de examen se consolida lo fallado (como el plan A).', enlace: { t: `ProMIR · Derma cap. ${cap.n}`, url: pm(cap.capId) } });
    else {
      const m = t ? t.min : corto ? 8 : 11; const q = t ? t.nQ : corto ? 6 : 8;
      pasos.push({ min: m, que: `ProMIR Dermatología › cap. ${cap.n} «${cap.t}» · TEST ${q}Q (ciego, primero)`, como: `77 s/Q · ${t ? `el mismo test de ${q}Q que el plan A` : 'el plan A de hoy (30′ con casos) no tiene hueco para el test'} · lista «Pool oficial» de la app o test del capítulo ProMIR · registra el neto (kind derma10Q) · no depende de AccessDerma.`, enlace: { t: `ProMIR · Derma cap. ${cap.n}`, url: pm(cap.capId) } });
    }
  } else if (a.uw && UW_DERM[a.uw]) {
    const s = UW_DERM[a.uw]!; const pide = corto ? 3 : 4; const minUW = corto ? 9 : 12;
    if (taper) pasos.push({ min: minUW, que: `TAPER · uWorld Step 1 · System «${s.nombre}» · Status Incorrect · hasta ${pide}Q (0 nuevas)`, como: 'Qbankly › QBanks › uWorld - USMLE Step 1 › Test Composer: SOLO ese System → Status Incorrect → Tutor · re-test de tus fallos; si no tienes incorrectas en ese System, repasa los fallos del ledger · la semana de examen no se abren preguntas nuevas.', enlace: { t: 'Qbankly › QBanks (uWorld Step 1)', url: QBANKS } });
    else {
      // v6.02c F2 (E6): reparto de las Unused en orden de fecha; si el System se agota → relleno CONCRETO en ProMIR (capítulo afín)
      const asig = dermaUwAsignacion().get(dia.fecha);
      const toma = Math.min(pide, asig ? asig.toma : pide);
      const minQ = toma === pide ? minUW : toma * 3;
      if (toma > 0) pasos.push({ min: minQ, que: `uWorld Step 1 · System «${s.nombre}» · Unused · ${toma}Q · Tutor (${s.q} en el System${asig ? ` · quedan ${asig.quedanAntes} antes de hoy según este plan` : ''})`, como: `Qbankly › QBanks › uWorld - USMLE Step 1 › Test Composer: SOLO ese System → Unused → ${toma} → Tutor · en cada imagen describe (8 ejes) y da 3 diagnósticos ANTES de las opciones · cuentan doble para el Step 1${toma < pide ? ' · son las últimas Unused del System: el resto del paso, en ProMIR (paso siguiente)' : ' · si el composer muestra menos Unused (las usaste en otro test), haz las que haya y completa con ProMIR Dermatología del capítulo afín a 77 s/Q'}.`, enlace: { t: 'Qbankly › QBanks (uWorld Step 1)', url: QBANKS } });
      if (toma < pide) {
        const c = PROMIR_DERMA_CAPS[(a.pmd ?? UW_A_PMD[a.uw] ?? 1) - 1]!;
        const mR = minUW - (toma > 0 ? minQ : 0); const nR = Math.max(2, Math.floor((mR * 60) / SEG_Q));
        pasos.push({ min: mR, que: `ProMIR Dermatología › cap. ${c.n} «${c.t}» · ${nR}Q a 77 s/Q (relleno: uWorld «${s.nombre}» agotado — sus ${s.q} preguntas se usaron en las sesiones anteriores de este plan)`, como: `ProMIR › Entrenar (creador de tests) → Dermatología · cap. ${c.n} · ${nR} preguntas · en las de imagen describe (8 ejes) y da 3 diagnósticos ANTES de las opciones · si una pregunta ya la hiciste en un test anterior del capítulo, sáltala y toma la siguiente · registra el neto (kind derma10Q).`, enlace: { t: `ProMIR · Derma cap. ${c.n}`, url: pm(c.capId) } });
      }
    }
  }
  if (!corto && a.bb && BB_DERM[a.bb]) { const v = BB_DERM[a.bb]!; const m = bbMin(a.bb, dia.fecha); pasos.push({ min: m, que: `B&B Step 1 › ${v.ruta.replace(' > ', ' › ')} › «${v.nombre}» (${mmss(v.s)}) — afinidad por título (contenido no verificado)`, como: `Qbankly › Video Library › B&B Step 1 · ${vel(dia.fecha).txt} · ${m}′ con pausas · free recall de 60 s al terminar.`, enlace: { t: `B&B · ${v.nombre}`, url: VIDEOS } }); }
  if (dia.atlasUrl && dia.atlasUrl.startsWith(DERMNET)) pasos.push({ min: corto ? 6 : 8, que: `DermNet · atlas del átomo (${dia.atlasUrl.replace(`${DERMNET}/`, '')}) — sin medir`, como: 'Primero las imágenes (tapa el pie y describe), después «clinical features» y «differential diagnosis» · ~120 palabras/min.', enlace: { t: 'DermNet · atlas del átomo', url: dia.atlasUrl } });
  else if (!corto && a.pmd && a.pmd !== cap?.n) { const c = PROMIR_DERMA_CAPS[a.pmd - 1]!; pasos.push({ min: 8, que: `LECTURA (español) · ProMIR Dermatología › cap. ${c.n} «${c.t}» — la sección del átomo de hoy (sin medir)`, como: 'Solo el apartado del átomo · Whole Page Rule · ritmo de referencia 180 palabras/min.', enlace: { t: `ProMIR · Derma cap. ${c.n}`, url: pm(c.capId) } }); }
  pasos.push({ min: 0, que: 'Proyecto Claude «AESTHETIC DERMATOLOGY» (tus libros) · casos de texto del átomo', como: `Pídele: «Dame viñetas de ${dia.sub.split(/[:(—·]/)[0].trim()} de mis libros SIN diagnóstico; yo describo (8 ejes), doy diferencial de 3 y diagnóstico; corrígeme citando libro y página». Cada fallo → tarjeta de MECANISMO.`, enlace: { t: 'Proyecto AESTHETIC DERMATOLOGY', url: AESTHETIC_DERMATOLOGY_URL } });
  pasos.push(cierrePaso(2));
  let p2 = cuadrar(pasos, total);
  // si el relleno quedó < 3′, quita el paso más largo opcional (DermNet/ProMIR lectura) y vuelve a cuadrar
  const rell = p2.find((p) => p.que.startsWith('Proyecto Claude'));
  if (rell && rell.min < 3) { const sin = pasos.filter((p) => !/^(DermNet|LECTURA \(español\))/.test(p.que)); p2 = cuadrar(sin, total); }
  const recursos: GuiaRecurso[] = [{ t: 'Proyecto Claude · AESTHETIC DERMATOLOGY', url: AESTHETIC_DERMATOLOGY_URL }, { t: 'ProMIR · Dermatología', url: pm(PM_CAP.c1) }];
  if (a.bb && BB_DERM[a.bb]) recursos.push({ t: `B&B · ${BB_DERM[a.bb]!.nombre}`, url: VIDEOS, min: bbMin(a.bb, dia.fecha) });
  if (dia.atlasUrl && dia.atlasUrl.startsWith(DERMNET)) recursos.push({ t: 'DermNet · atlas del átomo', url: dia.atlasUrl });
  const ids = dia.casoIds;
  return {
    franja: franjaDe(ini, total), plan: 'research-derma', titulo: `DERMA d${dia.d} · ${dia.sub.slice(0, 80)} — PLAN B (AccessDerma caducado)`, totalMin: total, pasos: p2, recursos,
    hecho: 'Todos los pasos hechos con sus fallos anotados + ≤3 tarjetas de MECANISMO.',
    planB: ids.length ? `Casos ${ids.map((id) => `#${id} (${dermaCasoTitulo(id)})`).join(', ')} PENDIENTES: al recuperar el acceso, 1 caso pendiente por sesión en el slot del review (variable de ajuste) hasta ponerte al día. El caso nunca se salta.` : 'Sin casos nuevos hoy.',
    aviso: ACCESSDERMA_AVISO,
  };
}

/** Desplaza un bloque curado (13:30) a otra hora de inicio. */
function moverA(g: GuiaBloque, ini: string): GuiaBloque { return g.franja.startsWith(ini) ? g : { ...g, franja: franjaDe(ini, g.totalMin) }; }

export interface DermaGuiaPar { planA: GuiaBloque; planB: GuiaBloque; curada: boolean }
/** Las dos guías (A = AccessDerma · B = acceso caducado) de una sesión. `ini` 13:30 por defecto; `minutos` 45 (30 en el SERUMS). */
export function dermaGuiaPar(dia: DiaDerma, opts: { ini?: string; minutos?: number } = {}): DermaGuiaPar {
  const ini = opts.ini ?? '13:30';
  const total = opts.minutos ?? 45;
  const c = DERMA_GUIA_CURADA[dia.d];
  if (c && c.fecha === dia.fecha && total === 45) return { planA: moverA(c.planA, ini), planB: moverA(c.planB, ini), curada: true };
  return { planA: planAPorRegla(dia, ini, total), planB: planBPorRegla(dia, ini, total), curada: false };
}
/** La guía que manda hoy según la preferencia «AccessDerma renovado» (por defecto: plan B). */
export function dermaGuiaDe(dia: DiaDerma, opts: { ini?: string; minutos?: number; accessOK?: boolean } = {}): GuiaBloque {
  const par = dermaGuiaPar(dia, opts);
  return (opts.accessOK ?? accessDermaOK()) ? par.planA : par.planB;
}
