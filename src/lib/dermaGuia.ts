/**
 * dermaGuia.ts — GUÍA «qué · cuánto · cómo» de cada sesión Derma (franja R↔D 13:30–14:15, 45′; 30′ en tiempo muerto en el SERUMS) en el
 * formato común `GuiaBloque` (src/lib/guia.ts). Pedido de Joseph (18-oct-2026): «para dermatología y para TODOS los casos … QUÉ leer,
 * CUÁNTO leer, CÓMO leer — no puede estar al azar».
 *
 *  · Cada sesión tiene DOS guías completas (Σ pasos = minutos de la franja):
 *      plan A = AccessDermatology (casos ciegos exactos con su URL directa · imagen dermatoscópica · Pictorial Review 4e por TEMA del
 *               «Create Custom Quiz» o el banco de la fila · test ProMIR en las sesiones d ≡ 0 mod 3 · lectura del libro por NOMBRE de capítulo)
 *      plan B = acceso remoto CADUCADO (comprobado el 18-oct): uWorld Step 1 › System de Dermatology afín (Tutor) · B&B Step 1 › Dermatology
 *               a la velocidad de la semana · ProMIR Dermatología · DermNet · casos REALES de DermNet Quizzes (v6.10e; antes, proyecto Claude); los casos del día
 *               quedan PENDIENTES (nada se recorta: entran en el slot del Pictorial al recuperar el acceso).
 *  · d1-d5 (v6.09: mié 18 · vie 20 · mar 24 · jue 26 · lun 30-nov; v6.08: lun 16 · mié 18 · vie 20 · mar 24 · jue 26-nov; v6.07: mar 10 · jue 12 · lun 16 · mié 18 · vie 20-nov; v6.06: lun 2 · mié 4 · vie 6 · mar 10 · jue 12-nov; v6.05: mar 27 · jue 29-oct · lun 2 · mié 4 · vie 6-nov; v6.03: mié 21 · vie 23 · mar 27 · jue 29-oct · lun 2-nov; v6.02: lun 19 · mié 21 · vie 23 · mar 27 · jue 29-oct) = CURADAS (DERMA_GUIA_CURADA, src/lib/dermaGuiaDatos.ts GENERADO por
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
 * v6.09 · lote 1 (17-nov-2026, auditoría tiempo ↔ material a2-8 · a2-16; SOLO F1 y el jue 31-dic: LOTE1_HASTA, 2027 queda igual):
 *  · el mismo B&B por 2.ª vez o más (bbAparicion) = «2.ª PASADA a 2× + recall de 60 s»; los minutos que libera → 1-2Q de uWorld del System del átomo
 *    que el plan no reparte o, si el plan lo reparte entero (Inflammatory y Skin and soft tissue infections), 1-2Q de ProMIR Dermatología del capítulo afín;
 *  · el paso B&B «1,5× (si no, 1,25×)» lleva los minutos a 1,25× (bbMinReserva): lo que sobre a 1,5× pasa al proyecto Claude (2027: el paso sigue con los
 *    minutos de 1,5× y el texto da los dos —a 1,25×, los minutos de más salen del paso de práctica real—);
 *  · el atlas DermNet sigue «sin medir» (medirlo pide red: queda pendiente con la regla de F1, palabras/120 + 0,25′/imagen).
 * v6.09b · lote 1-bis (17-nov-2026, auditoría a2-9; SOLO F1 y la transición, ≤ LOTE1_HASTA): el atlas DermNet del plan B lleva su MEDIDA (DERMNET_MEDIDO de
 *  dermaGuiaDatos.ts: alcance por secciones + palabras + imágenes → minutos = palabras/120 + 0,25′/imagen); lo que no usa de sus 8′ pasa al proyecto Claude
 *  (con su nº de viñetas) y, si necesita más, sale del proyecto Claude (que nunca queda < 3′). 2027 sigue «sin medir» (otro lote).
 * v6.09b · lote 1-ter (17-nov-2026, revisión R del lote 1-bis, hallazgos 4 · 5 · 8; SOLO F1, ≤ LOTE1_HASTA): DERMNET_MEDIDO por FECHA a la regla fija
 *  (palabras/100 + 0,25′/imagen; antes /120) con el alcance de antes del 1-bis (todas las imágenes + clínica + diferencial o su sustituto): `pasoDermnetMedido`.
 *  El proyecto Claude es la variable de ajuste: 0′ (sin paso) o k = round(min/5) viñetas con sus minutos reales por viñeta. Lo que no es del alcance «no forma
 *  parte del átomo» (ya no «no hoy»); lo del átomo que no cabe (vie 4-dic: 2 secciones de psoriasis) pasa al jue 10-dic con su fecha al principio del «cómo».
 * v6.09b · lote 1-quater (17-nov-2026, revisión R2 · pendiente de U2; SOLO F1, ≤ LOTE1_HASTA): regla FIJA del modo Tutor de uWorld = 90 s + 0,85′ = 2,35′/Q
 *  (antes ~3′/Q: 4Q en 12′ = 0,78). `UW_TUTOR_F1` reparte las Unused de F1 para que cada paso cuadre (5Q en 12′ · 3Q en 7′, lo que suelta va al proyecto
 *  Claude con k = round(min/5)) con el MISMO total por System que antes (2027 recibe el mismo stock: no cambia).
 * v6.10e (18-nov-2026 · BASE CERO + PREGUNTAS REALES, orden de Joseph: «las preguntas tienen que ser REALES · todos partimos de CERO»):
 *  · el proyecto Claude «AESTHETIC DERMATOLOGY» (viñetas de texto, dictado inverso, tablas y preguntas generadas por IA) DESAPARECE de todas las sesiones.
 *    Su hueco (la variable de ajuste del plan B, mismos minutos) lo llena `practicaReal`: en F1, los casos REALES de DermNet Quizzes del mapa DERMA_QUIZ_F1
 *    (rango fijo por sesión; d6 antes lee la lista de 3 puntos, medida; d15 → 4Q ProMIR) · en 2027, k casos del quiz DermNet AFÍN (Afin.dn, ~2′/caso) o,
 *    si el hueco es de 3-5′, preguntas MIR oficiales de ProMIR (77 s/Q) o, si el tema no tiene banco real abierto (estética, dermpath, cirugía),
 *    PRÁCTICA SIN PREGUNTAS (recall en blanco + explicar en voz alta + tarjetas), dicho como tal.
 *  · FASES (base cero): `DERMA_FASES` / `dermaFaseDe` — cada guía (plan A y B) lleva en su aviso la fase, qué se hace en ella y el criterio para pasar a la
 *    siguiente (Palmerton: 80 % en 10 consecutivas, Tutor y sin reloj al principio; si no se llega, los Four Critical Adjustments, nunca mover fechas).
 *    Síntesis con fuentes: DATA/DERMATOLOGIA/METODO_BASE_CERO.md.
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
  DERMA_GUIA_DATOS_META, DERMA_CME_DESPLAZADO, DERMNET_DERMOSCOPY, DERMNET_MEDIDO, DERMNET_QUIZZES, DERMA_QUIZ_F1, DERMA_LECTURA_REAL,
} from './dermaGuiaDatos';

export { DERMA_GUIA_DATOS_META, DERMA_TEST_PROMIR_D3, DERMNET_DERMOSCOPY, DERMNET_QUIZZES };

// v6.10e (18-nov-2026 · PREGUNTAS REALES): fuera el proyecto Claude «AESTHETIC DERMATOLOGY» (viñetas y preguntas generadas por IA) → practicaReal().
// v6.10g (revisión 18-nov · c11): empieza por «AccessDerma caducado» y dermaGuiaPar lo pone ANTES del aviso de FASE (al final, el corte de 240 del Calendar lo tapaba)
export const ACCESSDERMA_AVISO = 'AccessDerma caducado: renueva el acceso remoto desde la red de tu institución (campus/VPN u «Sign in via OpenAthens/Shibboleth»); mientras, manda el PLAN B.';
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
// v6.10j (auditoría c14): + x (la velocidad) · subs (los subtítulos) · cond (la condición del 1,5×) por separado: el paso dice «1,25× = 19′ con pausas (con
//   subtítulos EN)», con los minutos pegados a la velocidad (el Calendar corta el «cómo» a 110 y «1,5× con subtítulos EN (si el free recall del último vídeo
//   recogió ≥3 ideas …» dejaba fuera los minutos)
function vel(fecha: string): { v: number; f: number; txt: string; x: string; subs: string; cond?: string } {
  if (fecha <= DERMA_VELOCIDAD.s1Hasta) return { v: 1, f: 1.2, txt: '1,0× con subtítulos en inglés (CC)', x: '1,0×', subs: 'con subtítulos en inglés (CC)' };
  if (fecha <= DERMA_VELOCIDAD.s23Hasta) return { v: 1.25, f: 1.15, txt: '1,25× con subtítulos EN', x: '1,25×', subs: 'con subtítulos EN' };
  return { v: 1.5, f: 1.15, txt: '1,5× con subtítulos EN (si el free recall del último vídeo recogió ≥3 ideas; si no, 1,25×)', x: '1,5×', subs: 'con subtítulos EN', cond: 'si el free recall del último vídeo recogió ≥3 ideas; si no, 1,25×' };
}
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const bbMin = (id: number, fecha: string): number => { const v = BB_DERM[id]; const k = vel(fecha); return v ? Math.round((v.s / 60 / k.v) * k.f) : 0; };

// ── v6.09 · lote 1 (17-nov-2026, auditoría tiempo ↔ material a2-8 · a2-16) — SOLO F1 + jue 31-dic (≤ LOTE1_HASTA); 2027 sigue igual (otro lote) ──
/** Último día al que se aplican las reglas del lote 1 (F1 y la transición). */
const LOTE1_HASTA = '2027-01-03';
/** a2-16: el paso B&B «1,5× (si no, 1,25×)» lleva los minutos de la velocidad de RESERVA (1,25×) para que cuadre también si el free recall no deja subir.
 *  Solo F1 (≤ LOTE1_HASTA): en 2027 el paso conserva los minutos de 1,5× (y con ellos la cadena de casos DermNet del plan) y el TEXTO da los minutos a 1,25×
 *  y de dónde salen (bbMin125). */
const bbMinReserva = (id: number, fecha: string): number => {
  const v = BB_DERM[id]; const k = vel(fecha);
  return v && fecha <= LOTE1_HASTA && k.v === 1.5 ? Math.round((v.s / 60 / 1.25) * k.f) : bbMin(id, fecha);
};
/** Minutos del B&B a la velocidad de reserva (1,25×), con el mismo factor de pausas que la velocidad del día. */
const bbMin125 = (id: number, fecha: string): number => { const v = BB_DERM[id]; const k = vel(fecha); return v ? Math.round((v.s / 60 / 1.25) * k.f) : 0; };
/** v6.09b · lote 1-quater (revisión R2 · pendiente de U2): regla FIJA del modo Tutor de uWorld = 90 s de pregunta + 0,85′ de explicación = 2,35′/Q (la guía
 *  daba ~3′/Q: 4Q en 12′ = 0,78). Solo F1 (≤ LOTE1_HASTA); 2027 sigue con 4Q en 12′ (otro lote). */
const TUTOR_MIN_Q = 1.5 + 0.85;
const tutorMin = (n: number): number => Math.round(n * TUTOR_MIN_Q);
const tutorTxt = (n: number): string => `Tutor = 90 s de pregunta + 0,85′ de explicación ≈ 2,35′/Q (${n}Q ≈ ${String(Math.round(n * TUTOR_MIN_Q * 10) / 10).replace('.', ',')}′)`;
/** Unused de uWorld por sesión de F1 (plan B por regla) con la regla del Tutor: los minutos de cada sesión cuadran (5Q en 12′ = 0,98 · 3Q en 7′ = 1,01, y lo
 *  que suelta el paso de 12′ va al proyecto Claude con k = round(min/5) viñetas en 0,85-1,15) y el TOTAL de F1 por System es el mismo que con 4Q por sesión
 *  (Inflammatory 24 = 5 + 5 + 5 + 3 + 3 + 3 con el d1 curado · Skin and soft tissue infections 15 = 4 + 5 + 3 + 3 con el d2 curado), así que 2027 recibe el
 *  mismo stock y no cambia. El 4 y el 8-dic no tienen proyecto Claude (el atlas DermNet medido llena la franja): 5Q en los 12′. */
const UW_TUTOR_F1: Record<string, number> = { '2026-12-04': 5, '2026-12-08': 5, '2026-12-14': 3, '2026-12-16': 3, '2026-12-22': 3, '2026-12-24': 5, '2026-12-30': 3, '2026-12-31': 3 };
/** Nº de Unused que pide la regla en una sesión de 45′ (4 fuera de F1). */
const uwPideRegla = (fecha: string): number => (fecha <= LOTE1_HASTA ? UW_TUTOR_F1[fecha] ?? 4 : 4);
/** a2-8: 2.ª pasada de un B&B ya visto en una sesión anterior = 2× sin pausas + recall de 60 s. */
const bb2aMin = (id: number): number => { const v = BB_DERM[id]; return v ? Math.round(v.s / 60 / 2) + 1 : 0; };
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const DOW = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const fdc = (iso: string) => { const d = new Date(iso + 'T12:00:00Z'); return `${DOW[d.getUTCDay()]} ${d.getUTCDate()}-${MES[d.getUTCMonth()]}`; };
let BB_APAR: Map<string, { n: number; primera: string }> | null = null;
/** Nº de aparición (1 = primera) del vídeo B&B del PLAN B de cada sesión en orden de fecha (curadas d1-d5 por el nombre de su paso; regla por
 *  afinidad; el SERUMS, 30′, no lleva B&B) y la fecha de su 1.ª vez. Antes el generador repetía 7 vídeos en 25 sesiones presentados como nuevos. */
function bbAparicion(fecha: string): { n: number; primera: string } | null {
  if (!BB_APAR) {
    const m = new Map<string, { n: number; primera: string }>(); const vistos = new Map<number, { n: number; primera: string }>();
    const idPorNombre = new Map(Object.entries(BB_DERM).map(([id, v]) => [v.nombre, Number(id)]));
    for (const dia of [...DERMA_DIAS_TODOS].sort((x, y) => (x.fecha < y.fecha ? -1 : x.fecha > y.fecha ? 1 : 0))) {
      if (faseV6(dia.fecha) === 'F4') continue;
      const c = DERMA_GUIA_CURADA[dia.d];
      let id: number | undefined;
      if (c && c.fecha === dia.fecha) { for (const p of c.planB.pasos) { const r = /^B&B Step 1 ›.*«([^»]+)»/.exec(p.que); if (r && idPorNombre.has(r[1] as string)) id = idPorNombre.get(r[1] as string); } }
      else { const a = afinDe(dia); if (a.bb && BB_DERM[a.bb]) id = a.bb; }
      if (id == null) continue;
      const prev = vistos.get(id); const cur = { n: (prev?.n ?? 0) + 1, primera: prev?.primera ?? dia.fecha };
      vistos.set(id, cur); m.set(dia.fecha, cur);
    }
    BB_APAR = m;
  }
  return BB_APAR.get(fecha) ?? null;
}
/** Unused de un System de uWorld de Dermatology que el reparto del plan B NO usa en ninguna sesión (stock − lo repartido). */
const uwSobranteDelPlan = (uw: number): number => { let usado = 0; for (const a of dermaUwAsignacion().values()) if (a.uw === uw) usado += a.toma; return Math.max(0, (UW_DERM[uw]?.q ?? 0) - usado); };

// ── v6.09b · lote 1-ter (17-nov-2026, revisión R del lote 1-bis, hallazgos 4 · 5 · 8): paso DermNet de F1 MEDIDO por fecha ──────────────────────
const dec = (x: number): string => String(x).replace('.', ',');
/** Minutos con 1 decimal y coma, sin «,0» (5 → «5», 4.6 → «4,6»). */
const dec1 = (x: number): string => dec(Math.round(x * 10) / 10);
type DermnetMedido = NonNullable<(typeof DERMNET_MEDIDO)[string]>;
/** Paso «DermNet · atlas del átomo» con su medida (palabras/100 + 0,25′/imagen), el alcance de la guía anterior al lote 1-bis (todas las imágenes + clínica +
 *  diferencial o su sustituto), lo que no es del átomo dicho como tal (nunca «no hoy») y lo del átomo que no cabe con su FECHA al principio del «cómo». */
function pasoDermnetMedido(dn: DermnetMedido, atlasUrl: string): GuiaPaso {
  const varias = dn.lecturas.length > 1;
  const lista = (ts: string[]) => ts.map((t) => `«${t}»`).join(' + ');
  const otras = dn.lecturas.filter((l) => l.pag !== dn.atlas);
  const cab = `DermNet · atlas del átomo (${atlasUrl.replace(`${DERMNET}/`, '')})${otras.length ? ` + ${otras.length === 1 && otras[0]!.de ? `${otras[0]!.pag} del ${fdc(otras[0]!.de)}` : `${otras.length} de sus enlaces`}` : ''}`;
  const que = `${cab} · ${dn.min}′ = ${dn.palabras} palabras${dn.imagenes ? ` + ${dn.imagenes} imágenes` : ''} (${dec(dn.necesario)}′ medidos) — ${varias
    ? dn.lecturas.map((l) => `${l.pag}${l.de ? ` (del ${fdc(l.de)}, no cupo ese día: ${dec(Math.round((l.palabras / 100 + 0.25 * l.imagenes) * 100) / 100)}′)` : ''}: ${lista(l.texto)}`).join(' · ')
    : lista(dn.lecturas[0]!.texto)}`;
  const otro = dn.aOtroDia;
  const pasa = otro ? `Pasa al ${fdc(otro.fecha)} 13:30 (su paso DermNet, ${dec(otro.necesario)}′): ${lista(otro.texto)}${otro.imagenes ? ` con sus ${otro.imagenes} imágenes` : ''} · ` : '';
  const soloImg = dn.lecturas.flatMap((l) => l.soloImagenes ?? []);
  const todasAtlas = !otro && !varias;
  const imgs = dn.imagenes ? `Primero las ${dn.imagenes} imágenes${todasAtlas ? ' de la página' : ''}${soloImg.length ? ` —también las de ${lista(soloImg)}, sin su texto—` : ''} (tapa el pie y describe; 0,25′ cada una), después ` : '';
  const propias = dn.lecturas.filter((l) => !l.de).length;
  const fuera = dn.fuera.palabras > 0
    ? `el resto de ${propias > 1 ? 'esas páginas' : 'la página'} (${dn.fuera.palabras} palabras: ${dn.fuera.temas.join(', ')}) no forma parte del átomo: el atlas es imagen + clínica + diferencial.`
    : 'la página entera: no queda nada fuera.';
  return {
    min: dn.min, que,
    como: `${pasa}${imgs}esas secciones a 100 palabras/min (medido el 17-nov-2026: ${dn.palabras}/100 + ${dn.imagenes} × 0,25′ = ${dec(dn.necesario)}′)${dn.motivo ? ` · ${dn.motivo}` : ''} · ${fuera}`,
    enlace: { t: 'DermNet · atlas del átomo', url: atlasUrl },
  };
}

// ── v6.10e (18-nov-2026 · BASE CERO + PREGUNTAS REALES): FASES y práctica REAL del hueco del plan B (antes: proyecto Claude) ─────────────────────────
/** Una fase del plan Derma desde cero: qué se hace y el criterio objetivo para pasar a la siguiente (fechas fijas: si no se llega, se ajusta el método). */
export interface DermaFase { n: number; nombre: string; desde: number; hasta: number; que: string; criterio: string }
/** Fases (sesiones d1-d103). Criterio = mastery gate de Palmerton (80 % en 10 consecutivas, Tutor y sin reloj al principio) aplicado a lo que entrena cada
 *  fase; donde no hay banco real abierto (dermpath, cirugía, estética), el criterio es un recall en blanco sin error. Fuentes: METODO_BASE_CERO.md. */
export const DERMA_FASES: DermaFase[] = [
  { n: 1, nombre: 'Lenguaje y estructura', desde: 1, hasta: 6, que: 'describir ANTES de diagnosticar (lesión elemental, color, configuración, distribución), estructura de la piel, fototipos, anatomía facial y dermatoscopia de triaje (lista de 3 puntos); preguntas en Tutor o en modo estudio, sin cronómetro (los s/Q de cada paso son el presupuesto de la franja, no un reloj)', criterio: '≥ 80 % de lesiones elementales bien nombradas en 10 casos DermNet seguidos (ledger)' },
  { n: 2, nombre: 'Patrones inflamatorios', desde: 7, hasta: 13, que: 'psoriasis, eccemas, acné, ampollosas, urticaria, farmacodermias y conectivopatías: uWorld en Tutor + casos DermNet del tema + test ProMIR del capítulo', criterio: '≥ 80 % en 10 casos/preguntas seguidos de la fase (DermNet + uWorld Tutor, ledger)' },
  { n: 3, nombre: 'Infecciosas y parasitosis', desde: 14, hasta: 18, que: 'bacterianas, sífilis/ITS, virales, micosis y parasitosis: de la lesión elemental al agente', criterio: '≥ 80 % en 10 casos/preguntas seguidos de la fase + el test ProMIR del cap. 2 corregido' },
  { n: 4, nombre: 'Seguridad de rellenos', desde: 19, hasta: 20, que: 'oclusión vascular y ceguera ANTES que cualquier técnica (regla de seguridad del PLAN_ELITE §4)', criterio: 'protocolo HDPH y kit de emergencia recitados de memoria sin error (recall en blanco)' },
  { n: 5, nombre: 'Tumores y dermatoscopia', desde: 21, hasta: 28, que: 'benignos, queratosis actínica, CBC/CEC, melanoma, dermatoscopia II-III, linfomas y fotoenvejecimiento', criterio: '≥ 80 % en 10 casos seguidos de tumores/pigmentadas (DermNet + uWorld)' },
  { n: 6, nombre: 'Dermatopatología', desde: 29, hasta: 33, que: 'patrones de inflamación, vocabulario dermpath, ampollosas al microscopio, histología de tumores y depósitos', criterio: 'los patrones de inflamación dibujados y nombrados de memoria sin error (no hay banco real abierto: recall)' },
  { n: 7, nombre: 'Pediatría y genodermatosis', desde: 34, hasta: 38, que: 'neonatales, hemangiomas, exantemas y Kawasaki, facomatosis, genodermatosis y atopia pediátrica', criterio: '≥ 80 % en 10 casos seguidos de la fase (DermNet + uWorld)' },
  { n: 8, nombre: 'Cirugía dermatológica', desde: 39, hasta: 43, que: 'anatomía quirúrgica II, biopsias y anestesia local, suturas, colgajos e injertos, Mohs', criterio: 'pasos y complicaciones de cada técnica recitados de memoria sin error (no hay banco real abierto: recall)' },
  { n: 9, nombre: 'Consolidación (alivio del Step 1) + checkpoints', desde: 44, hasta: 52, que: 'segunda pasada de fallos, cicatrización y mapa de fallos por módulo CORE', criterio: 'mapa de debilidades hecho y cada módulo CORE con ≥ 80 % en sus 10 últimos casos' },
  { n: 10, nombre: 'Estética (seguridad primero)', desde: 53, hasta: 71, que: 'anatomía 3D → envejecimiento → toxina → rellenos → peelings → láser → microneedling → cosmecéutica', criterio: 'cada técnica: indicación + complicación + manejo recitados de memoria sin error (no hay banco real abierto: recall)' },
  { n: 11, nombre: 'Repaso intercalado + ciclo 2', desde: 72, hasta: 103, que: 'casos restantes, segunda pasada FSRS y práctica MEZCLADA (DermNet «Mixed diagnoses»)', criterio: '80 % sostenido en bloques mixtos (fin del plan)' },
];
/** Fase de una sesión (por su nº d). */
export function dermaFaseDe(dia: DiaDerma): DermaFase {
  return DERMA_FASES.find((f) => dia.d >= f.desde && dia.d <= f.hasta) ?? (DERMA_FASES[DERMA_FASES.length - 1] as DermaFase);
}
/** v6.10 · fix 18-nov (revisión de los frentes): en la FASE 1 el aviso dice «preguntas en Tutor, sin reloj» → los TEST ProMIR de esa fase (d3, d6) van en
 *  modo estudio y el 77 s/Q es solo el presupuesto de la franja (antes el paso decía «77 s/Q» a secas y parecía cronometrado). '' fuera de la fase 1. */
function sinRelojF1(dia: DiaDerma): string {
  return dermaFaseDe(dia).n === 1 ? 'En modo estudio, SIN cronómetro (fase 1): ' : '';
}
/** Aviso de fase que encabeza cada guía (plan A y B). */
export function dermaFaseAviso(dia: DiaDerma): string {
  const f = dermaFaseDe(dia); const sig = DERMA_FASES.find((x) => x.n === f.n + 1);
  return `FASE ${f.n}/${DERMA_FASES.length} (base cero) · ${f.nombre} (d${f.desde}-d${f.hasta}): ${f.que} · ${sig
    ? `pasa a la fase ${sig.n} con ${f.criterio}; si no llegas, las fechas no se mueven: ajusta el método (recursos → comprensión → aplicación → memoria) y sigue en Tutor`
    : `cierre: ${f.criterio}`}`;
}
const DN_Q = (slug: string) => `${DERMNET}/quizzes/${slug}`;
const en0 = (r: number) => r >= 0.85 && r <= 1.15;
/** k casos REALES de un DermNet Quiz con rango fijo (el mismo formato que el catálogo de las curadas: el generador lo valida). */
function quizPasoF1(slug: string, desde: number, k: number, min: number, foco: string): GuiaPaso {
  const q = DERMNET_QUIZZES[slug]!;
  return {
    min, que: `DermNet Quizzes › «${q.t}» · casos ${desde}-${desde + k - 1} (${k} casos REALES × ~${q.min}′ = ${k * q.min}′${min > k * q.min ? ` + ${min - k * q.min}′ para el ledger` : ''}, el tiempo por caso que declara el quiz)`, // v6.10g: + el minuto de ledger (k = floor(min/2))
    como: `dermnetnz.org/quizzes (gratis, sin cuenta) → «${q.t}» → caso ${desde}: ${foco} · después «Show Answers» y corrige · cada fallo → tarjeta de MECANISMO + ✓/✗ en el ledger («DermNet · caso N»).`,
    enlace: { t: `DermNet Quiz · ${q.t}`.slice(0, 70), url: `${DN_Q(slug)}/case/${desde}` },
  };
}
/** El hueco del plan B (variable de ajuste, `min` minutos) con práctica REAL: F1 = el mapa DERMA_QUIZ_F1 (casos fijos, lectura medida o ProMIR) · 2027 = k casos
 *  del quiz DermNet afín · 3-6′ = preguntas MIR oficiales del capítulo afín · sin banco real abierto = PRÁCTICA SIN PREGUNTAS (nada inventado). */
function practicaReal(dia: DiaDerma, min: number, a: Afin, corto: boolean): GuiaPaso[] {
  const f1 = !corto && dia.fecha <= LOTE1_HASTA ? DERMA_QUIZ_F1[dia.d] : undefined;
  if (f1 && f1.quiz && f1.desde && f1.k) {
    const out: GuiaPaso[] = []; let resto = min;
    const L = f1.lectura ? DERMA_LECTURA_REAL[f1.lectura] : undefined;
    if (L) {
      const m = Math.round(L.necesario);
      out.push({ min: m, que: `LECTURA REAL · ${L.t} › ${L.secciones.map((s) => `«${s[0]}»`).join(' + ')} (${L.palabras} palabras + ${L.figuras} imágenes = ${dec(L.necesario)}′ medidos a 100 palabras/min + 0,25′/imagen)`, como: 'El algoritmo para NO expertos, la puerta de entrada de la dermatoscopia (el análisis de patrones viene después, en la fase 5): en cada imagen tapa el pie y di si cumple el criterio ANTES de leerlo · «Activity» (ejercicio del curso CME) no forma parte del átomo de hoy.', enlace: { t: L.t.slice(0, 70), url: L.url } });
      resto -= m;
    }
    out.push(quizPasoF1(f1.quiz, f1.desde, f1.k, resto, f1.foco));
    return out;
  }
  if (f1 && f1.promir) {
    const c = capDe(dia) ?? PROMIR_DERMA_CAPS[(a.pmd ?? 1) - 1]!;
    return [{ min, que: `ProMIR Dermatología › cap. ${c.n} «${c.t}» · ${f1.promir}Q REALES más a 77 s/Q (preguntas MIR oficiales: ${dec1((f1.promir * SEG_Q) / 60)}′)`, como: `ProMIR › Entrenar (creador de tests) → Dermatología · cap. ${c.n} · ${f1.foco} · si una ya la hiciste, sáltala y toma la siguiente · registra el neto (kind derma10Q).`, enlace: { t: `ProMIR · Derma cap. ${c.n}`, url: pm(c.capId) } }];
  }
  // v6.10g (revisión 18-nov · c11): el quiz y el RANGO DE CASOS REAL de cada sesión salen del cursor de todo el plan (dermnetAsignacion: sin repetir casos,
  //   pasando al siguiente quiz real cuando uno se acaba); antes cada sesión pedía «desde el caso 1 (o 5)» del primer quiz de la lista y la suma se pasaba
  //   del quiz («Malignant skin lesions», 10 casos, recibía 23). Casos = floor(min / min por caso): la aritmética cuadra con los minutos del paso (+1′ de ledger).
  const lista = quizzesDe(dia).filter((s) => DERMNET_QUIZZES[s]);
  if (lista.length && usaDermnet(min)) return [pasoDermnet(dermnetAsignacionDe(dia, lista, min), min)];
  const pmdN = a.pmd ?? (a.uw ? UW_A_PMD[a.uw] : undefined); const nQ = Math.round((min * 60) / SEG_Q);
  if (pmdN && min <= 6 && nQ >= 1 && en0((nQ * SEG_Q) / 60 / min)) {
    const c = PROMIR_DERMA_CAPS[pmdN - 1]!;
    return [{ min, que: `ProMIR Dermatología › cap. ${c.n} «${c.t}» · ${nQ}Q REALES más a 77 s/Q (preguntas MIR oficiales: ${dec1((nQ * SEG_Q) / 60)}′)`, como: `ProMIR › Entrenar (creador de tests) → Dermatología · cap. ${c.n} · ${nQ} preguntas que no hayas hecho · registra el neto (kind derma10Q).`, enlace: { t: `ProMIR · Derma cap. ${c.n}`, url: pm(c.capId) } }];
  }
  const r1 = Math.max(1, Math.round(min * 0.4)), r2 = Math.max(0, Math.round(min * 0.3)), r3 = Math.max(0, min - r1 - r2);
  return [{ min, que: `PRÁCTICA SIN PREGUNTAS (${min}′; este tema no tiene banco real abierto): recall en blanco + explicar en voz alta + tarjetas`, como: `≈${r1}′ recall en blanco a papel de los puntos clave de «${dia.sub.split(/[:(—·]/)[0]!.trim()}»${r2 ? ` · ≈${r2}′ contrástalo con la lectura/vídeo de hoy y corrige en rojo` : ''}${r3 ? ` · ≈${r3}′ explícalo en voz alta como a un colega` : ''} · cada hueco = 1 tarjeta de MECANISMO. Nada de preguntas inventadas.` }];
}

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
  A: { bb: 69, uw: 1030, pmd: 1 }, B: { bb: 71, uw: 1028, pmd: 5 },
  C: { bb: 75, uw: 1031, pmd: 2 }, D: { bb: 78, uw: 1032, pmd: 4 },
  E: { uw: 1028, pmd: 1 }, F: { bb: 79, uw: 1032, pmd: 9 },
};
/** v6.10e (18-nov-2026): DermNet Quizzes afines por átomo (en orden: si el primero se acaba, el siguiente). Lista propia (no la de Afin, que reparte uWorld y
 *  B&B): los tumores van ANTES que los eccemas para que «q. seborreica» no caiga en eccema. Sin entrada = sin banco real abierto (estética, cirugía, dermpath). */
const MIXTOS = Array.from({ length: 11 }, (_, i) => `mixed-diagnoses-10-cases-${i + 1}-of-11`);
const DN_SUB: Array<[RegExp, string[]]> = [
  [/dermatoscop/i, ['dermoscopy-local-features-quiz', 'dermoscopy-pattern-analysis-quiz']],
  [/melanoma|basocelular|espinocelular|queratosis actínica|linfoma|Merkel|Kaposi|tumores benignos|nevus|q\. seborreica/i, ['malignant-skin-lesions-10-cases', 'nonmelanoma-skin-cancers-10-cases', 'pigmented-lesions-10-cases', 'benign-melanocytic-naevi-11-cases', 'skin-coloured-lumps-and-bumps-12-cases', 'melanoma-terminology-10-cases']],
  [/psoria|papuloescam|liquen/i, ['psoriasis-16-cases', 'lichen-12-cases']],
  [/eccema|atópica|atopia|contacto|seborreica/i, ['eczema-14-cases', 'cause-of-contact-allergic-dermatitis-10-cases', 'irritant-contact-dermatitis-12-cases']],
  [/acné|rosácea|hidradenitis/i, ['acne-16-cases', 'acneiform-eruptions-12-cases']],
  [/ampoll|pénfigo|penfigoide|herpetiforme/i, ['blistering-conditions-affecting-the-feet-12-cases']],
  [/urticaria|angioedema|prurito/i, ['solitary-red-patches-17-cases']],
  [/farmacoderm|SJS|DRESS|AGEP/i, ['cutaneous-adverse-reactions-10-cases']],
  [/conectivopat|lupus|dermatomiositis|morfea|vasculitis|paniculitis/i, ['different-causes-of-purpura-10-cases', 'annular-plaque-12-cases']],
  [/micosis|KOH|esporotric/i, ['fungal-infection-12-cases']],
  [/bacterian|impétigo|celulitis|SSSS|fascitis|sífilis|ITS|micobacter|lepra|virales|HSV|VPH|molusco|parasitosis|escabiosis|leishmaniasis|exantema|Kawasaki/i, ['skin-conditions-due-to-fungi-bacteria-and-viruses-10-cases', 'led-rashes-and-unwell-10-cases', 'pustules-15-cases']],
  [/hemangioma|malformaciones vasculares|neonatal/i, ['vascular-naevi-10-cases', 'telangiectasia-10-cases']],
  [/facomatosis|NF1|esclerosis tuberosa|Sturge|genodermatosis|ictiosis|epidermólisis/i, MIXTOS],
];
const DN_BLOQUE: Partial<Record<DiaDerma['bKey'], string[]>> = {
  A: ['solitary-red-patches-17-cases', 'annular-plaque-12-cases'], B: ['psoriasis-16-cases', 'eczema-14-cases'], C: ['skin-conditions-due-to-fungi-bacteria-and-viruses-10-cases'],
  D: ['malignant-skin-lesions-10-cases', 'pigmented-lesions-10-cases'], F: ['vascular-naevi-10-cases', ...MIXTOS],
  // repasos, checkpoints y ciclo 2 = práctica INTERCALADA (fase de mezcla): «Mixed diagnoses» de DermNet
  H: MIXTOS, Z: MIXTOS,
};
/** Quizzes DermNet afines de una sesión ([] = el tema no tiene banco real abierto). Repasos/ciclo 2 (H, Z o «CICLO 2 · …») = mixtos. */
function quizzesDe(dia: DiaDerma): string[] {
  if (dia.bKey === 'H' || dia.bKey === 'Z' || /^CICLO 2 · (Casos|Segunda pasada|Checkpoint|REPASO)/.test(dia.sub)) return MIXTOS;
  for (const [re, l] of DN_SUB) if (re.test(dia.sub)) return l;
  return DN_BLOQUE[dia.bKey] ?? [];
}
// ── v6.10g (revisión 18-nov-2026 · c11): CURSOR de casos REALES de DermNet Quizzes en todo el plan ───────────────────────────────────────────────
/** Relevo de una lista afín cuando se agota (antes de la reserva): la dermatoscopia sigue en los 3 «Dermoscopy quiz» (20 casos cada uno, contados en
 *  dermnetnz.org el 18-nov-2026; no declaran tiempo por caso → ~2′, como los otros quizzes de dermatoscopia). */
const DN_RELEVO: Record<string, string[]> = { 'dermoscopy-local-features-quiz': ['dermoscopy-quiz-1-of-3', 'dermoscopy-quiz-2-of-3', 'dermoscopy-quiz-3-of-3'] };
/** Un tramo de casos REALES de un quiz (números de caso 1-based, en orden) · mezcla = viene de la reserva (la lista del tema se agotó). */
export interface DermnetTramo { slug: string; casos: number[]; mezcla: boolean }
/** Lo que toca a una sesión: sus tramos, los minutos sin caso (1′ = ledger; 2-4′ = ledger + nota docente de los fallos, cuando el quiz va a ~5′/caso) y si
 *  TODO el catálogo se agotó (el resto = 2.ª pasada de los casos fallados, que también son reales). */
export interface DermnetAsig { tramos: DermnetTramo[]; resto: number; agotado: boolean }
type Usados = Map<string, Set<number>>;
const clonUsados = (u: Usados): Usados => new Map([...u].map(([k, v]) => [k, new Set(v)]));
/** ¿El hueco de `min` minutos va a casos DermNet? (casos de ~2′: floor(min/2) × 2 / min en 0,85-1,15 → todos salvo 5′; con < 4′, ProMIR o recall) */
const usaDermnet = (min: number): boolean => min >= 4 && en0((Math.floor(min / 2) * 2) / min);
/** Casos ya usados por el mapa fijo de F1 (DERMA_QUIZ_F1: d1 y d4 curadas + las sesiones por regla de F1). */
function usadosF1(): Usados {
  const u: Usados = new Map();
  for (const q of Object.values(DERMA_QUIZ_F1)) if (q.quiz && q.desde && q.k) { const s = u.get(q.quiz) ?? new Set<number>(); for (let c = q.desde; c < q.desde + q.k; c++) s.add(c); u.set(q.quiz, s); }
  return u;
}
const libresDe = (slug: string, usados: Usados): number => { const q = DERMNET_QUIZZES[slug]; return q ? q.n - (usados.get(slug)?.size ?? 0) : 0; };
/** Reparte `min` minutos en casos libres: la lista afín y su relevo; solo si se agotan (o si ninguno de sus casos cabe), la RESERVA (práctica MEZCLADA:
 *  «Mixed diagnoses» y después el resto del catálogo). Lo que no llena un caso de ~5′ queda como minutos de ledger y nota docente (no se salta de quiz). */
function asignarDN(lista: string[], min: number, usados: Usados): DermnetAsig {
  const propios = [...new Set([...lista, ...lista.flatMap((s) => DN_RELEVO[s] ?? [])])];
  const reserva = [...new Set([...MIXTOS, ...Object.keys(DERMNET_QUIZZES)])].filter((s) => !propios.includes(s));
  const tramos: DermnetTramo[] = []; let R = min;
  const tomar = (slug: string, mezcla: boolean): void => {
    const q = DERMNET_QUIZZES[slug]; if (!q || R < q.min) return;
    const u = usados.get(slug) ?? new Set<number>();
    const libres: number[] = []; for (let c = 1; c <= q.n && libres.length < Math.floor(R / q.min); c++) if (!u.has(c)) libres.push(c);
    if (!libres.length) return;
    for (const c of libres) u.add(c);
    usados.set(slug, u); tramos.push({ slug, casos: libres, mezcla }); R -= libres.length * q.min;
  };
  for (const s of propios) { if (R < 2) break; tomar(s, false); }
  const quedanPropios = propios.some((s) => libresDe(s, usados) > 0);
  if (R >= 2 && (!quedanPropios || !tramos.length)) for (const s of reserva) { if (R < 2) break; tomar(s, true); }
  const agotado = R >= 2 && [...propios, ...reserva].every((s) => libresDe(s, usados) === 0);
  return { tramos, resto: R, agotado };
}
interface DnPlanFila { fecha: string; antes: Usados; min: number; asig: DermnetAsig | null }
let DN_PLAN: DnPlanFila[] | null = null;
/** El cursor de todo el plan, en orden de fecha y con la franja de cada día (45′; 30′ en el SERUMS): para cada sesión, lo usado ANTES y lo que le toca. Las
 *  sesiones curadas y las del mapa de F1 llevan su rango fijo (usadosF1); el resto, la lista afín de quizzesDe. */
export function dermnetAsignacion(): DnPlanFila[] {
  if (DN_PLAN) return DN_PLAN;
  const usados = usadosF1(); const out: DnPlanFila[] = [];
  for (const dia of [...DERMA_DIAS_TODOS].sort((x, y) => (x.fecha < y.fecha ? -1 : x.fecha > y.fecha ? 1 : 0))) {
    const total = faseV6(dia.fecha) === 'F4' ? 30 : 45;
    const c = DERMA_GUIA_CURADA[dia.d];
    if (c && c.fecha === dia.fecha && total === 45) continue;
    if (total === 45 && dia.fecha <= LOTE1_HASTA && DERMA_QUIZ_F1[dia.d]) continue;
    const antes = clonUsados(usados);
    const h = planBBase(dia, total).p2.find((p) => p.que === HUECO);
    const lista = quizzesDe(dia).filter((s) => DERMNET_QUIZZES[s]);
    const asig = h && lista.length && usaDermnet(h.min) ? asignarDN(lista, h.min, usados) : null;
    out.push({ fecha: dia.fecha, antes, min: h ? h.min : 0, asig });
  }
  DN_PLAN = out;
  return out;
}
/** Lo que toca a la sesión con `min` minutos de hueco: el del cursor si es su franja canónica; si no (otra duración), desde lo usado antes de esa fecha. */
function dermnetAsignacionDe(dia: DiaDerma, lista: string[], min: number): DermnetAsig {
  const plan = dermnetAsignacion();
  const x = plan.find((y) => y.fecha === dia.fecha);
  if (x && x.asig && x.min === min) return x.asig;
  const prev = [...plan].reverse().find((y) => y.fecha <= dia.fecha);
  return asignarDN(lista, min, clonUsados(prev ? prev.antes : usadosF1()));
}
/** «1-4», «7», «1-3 y 12» */
const rangoCasos = (cs: number[]): string => {
  const g: string[] = []; let i = 0;
  while (i < cs.length) { let j = i; while (j + 1 < cs.length && cs[j + 1] === (cs[j] as number) + 1) j++; g.push(i === j ? `${cs[i]}` : `${cs[i]}-${cs[j]}`); i = j + 1; }
  return g.length > 1 ? `${g.slice(0, -1).join(', ')} y ${g[g.length - 1]}` : (g[0] ?? '');
};
/** El paso «DermNet Quizzes» de una sesión con su quiz y su rango de casos REALES (los tramos en el orden en que se hacen). */
function pasoDermnet(asig: DermnetAsig, min: number): GuiaPaso {
  const T = (s: string) => DERMNET_QUIZZES[s]!;
  const segunda = asig.agotado; // todo el catálogo agotado: el resto, 2.ª pasada de los casos fallados (reales, ya hechos)
  if (!asig.tramos.length) return { min, que: `DermNet Quizzes · 2.ª pasada de tus fallos (${min}′): los casos REALES marcados ✗ en el ledger, del más antiguo al más reciente (los quizzes del plan ya están todos hechos)`, como: 'dermnetnz.org/quizzes → abre cada caso fallado desde su quiz y su nº (ledger «DermNet · quiz · caso N») · 8 ejes + diferencial de 3 ANTES de «Show Answers» · si lo aciertas, sácalo de la lista.', enlace: { t: 'DermNet Quizzes', url: `${DERMNET}/quizzes` } };
  const n = asig.tramos.reduce((s, t) => s + t.casos.length, 0);
  const porMin = new Map<number, number>(); for (const t of asig.tramos) porMin.set(T(t.slug).min, (porMin.get(T(t.slug).min) ?? 0) + t.casos.length);
  const tot = [...porMin].reduce((s, [m, k]) => s + m * k, 0);
  const arit = porMin.size === 1 ? `${n} ${n === 1 ? 'caso REAL' : 'casos REALES'} × ~${[...porMin.keys()][0]}′ = ${tot}′` : `${n} casos REALES: ${[...porMin].map(([m, k]) => `${k} × ~${m}′`).join(' + ')} = ${tot}′`;
  const extra = segunda ? ` + ${asig.resto}′ de 2.ª pasada de tus fallos` : asig.resto >= 2 ? ` + ${asig.resto}′ para el ledger y la nota docente de tus fallos` : asig.resto ? ` + ${asig.resto}′ para el ledger` : '';
  const partes = asig.tramos.map((t) => `«${T(t.slug).t}» · ${t.casos.length === 1 ? 'caso' : 'casos'} ${rangoCasos(t.casos)}`);
  const [t0, ...ts] = asig.tramos as [DermnetTramo, ...DermnetTramo[]];
  const mezcla = asig.tramos.some((t) => t.mezcla) || asig.tramos.every((t) => t.slug.startsWith('mixed-'));
  const sinT = asig.tramos.filter((t) => T(t.slug).sinTiempo).map((t) => `«${T(t.slug).t}»`);
  return {
    min, que: `DermNet Quizzes › ${partes.join(' + ')} (${arit}${extra})`,
    como: `dermnetnz.org/quizzes (gratis, sin cuenta) → «${T(t0.slug).t}» → caso ${t0.casos[0]}${ts.length ? ` · después ${ts.map((t) => `«${T(t.slug).t}» desde el caso ${t.casos[0]}`).join(' y ')}` : ''}${mezcla ? ' (práctica MEZCLADA)' : ''} · en cada caso, 8 ejes + diferencial de 3 ANTES de «Show Answers» · cada fallo → tarjeta de MECANISMO + ✓/✗ en el ledger («DermNet · quiz · caso N»).${sinT.length ? ` ${sinT.join(' y ')} no declara${sinT.length > 1 ? 'n' : ''} tiempo por caso: ~2′, como los otros quizzes de dermatoscopia.` : ''}${segunda ? ' Los quizzes del plan están todos hechos: el resto del paso, tus casos fallados del ledger.' : ''}`,
    enlace: { t: `DermNet Quiz · ${T(t0.slug).t}`.slice(0, 70), url: `${DN_Q(t0.slug)}/case/${t0.casos[0]}` },
  };
}

function afinDe(dia: DiaDerma): Afin {
  for (const [re, a] of AFIN_SUB) if (re.test(dia.sub)) return a;
  return AFIN_BLOQUE[dia.bKey] ?? {};
}

/** Capítulo ProMIR del test de la sesión (rotación del ciclo 1 o, en el ciclo 2, el capId del enlace de la fila). */
const capDe = (dia: DiaDerma) => promirDermaCapDe(dia.d) ?? (dia.promir ? PROMIR_DERMA_CAPS.find((c) => dia.promir!.url.endsWith(c.capId)) : undefined);
const franjaDe = (ini: string, min: number) => { const f = aMinutos(ini) + min; return `${ini}–${String(Math.floor(f / 60)).padStart(2, '0')}:${String(f % 60).padStart(2, '0')}`; };
/** v6.10g (revisión 18-nov · c11): el `sub` del título de la guía, ≤ n caracteres SIN cortar a media palabra ni dejar un paréntesis abierto (antes
 *  `sub.slice(0, 80)`: «… (3 de los 4 módulos CORE la preguntan t», «… (p — PLAN B») → «…» tras la última palabra entera. */
export function subTitulo(sub: string, n = 80): string {
  if (sub.length <= n) return sub;
  // v6.10i (remate, revisión adversarial del 18-nov): tampoco termina en un conector («… del ledger de…», «… desde el…», «… de tus…»), y un paréntesis
  //   abierto al principio se cierra en su última cláusula entera («(mecanismo → tratamiento; puente futuro a…» → «(mecanismo → tratamiento)…»)
  // v6.10j (auditoría c14): + «no» / «NO» (una negación colgando cambia el sentido: «… serotipos, unidades NO…»; el sub dice «unidades NO intercambiables
  //   entre marcas») y, sin distinguir mayúsculas, los demás conectores
  const COLA = /(?:[\s,;:·—+(-]+|\s(?:de|del|el|la|los|las|lo|a|al|y|e|o|u|en|con|por|para|sin|desde|hasta|entre|tu|tus|su|sus|un|una|que|se|ni|no))+$/iu;
  let t = sub.slice(0, n);
  const sp = t.lastIndexOf(' ');
  if (sp > n * 0.5) t = t.slice(0, sp);
  t = t.replace(COLA, '');
  // v6.10j: tampoco un elemento nuevo cortado tras su 1.ª palabra («… + análisis…», «… — músculos…»): fuera, si queda un título de más de la mitad
  { const m = /\s[+—]\s[^\s+—()]+$/u.exec(t); if (m && m.index > n * 0.5) t = t.slice(0, m.index).replace(COLA, ''); }
  const ab = t.lastIndexOf('(');
  if (ab > t.lastIndexOf(')')) { // paréntesis sin cerrar: tardío → fuera · temprano → cerrado tras su última cláusula entera
    if (ab > n * 0.4) t = t.slice(0, ab).replace(COLA, '');
    else { const sep = Math.max(t.lastIndexOf(';'), t.lastIndexOf(',')); t = (sep > ab ? t.slice(0, sep) : t).replace(COLA, '') + ')'; }
  }
  return t + '…';
}
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
  return [a.uw, faseV6(dia.fecha) === 'F4' ? 3 : uwPideRegla(dia.fecha)];
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
    else if (dia.promir && cap && t) pasos.push({ min: t.min, que: `ProMIR Dermatología › cap. ${cap.n} «${cap.t}» · TEST ${t.nQ}Q`, como: `${sinRelojF1(dia)}77 s/Q (el mismo test de ${t.nQ}Q que el plan B) · preguntas: la lista «Pool oficial» de la app (capítulo → asignatura); si no hay, el test del capítulo ProMIR · registra el neto (kind derma10Q, asignatura Dermatología) · secciones del capítulo SIN MEDIR.`, enlace: { t: `ProMIR · Derma cap. ${cap.n}`, url: pm(cap.capId) } });
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
    franja: franjaDe(ini, total), plan: 'research-derma', titulo: `DERMA d${dia.d} · ${subTitulo(dia.sub)} — plan A (AccessDerma)`, totalMin: total, pasos: p2, recursos,
    hecho: `${n ? `${n} caso${n === 1 ? '' : 's'} registrado${n === 1 ? '' : 's'} en el ledger` : 'fallos del ledger re-registrados'}${dia.dermatoscopiaImg ? ' + 1 imagen dermatoscópica' : ''}${reviewMin >= 3 ? ' + review terminado con sus fallos registrados' : ''}${lecturaMin ? ' + lectura hecha' : ''} + ≤3 tarjetas de MECANISMO.`,
    planB: 'Sin acceso a AccessDerma → PLAN B de esta sesión (toca «AccessDerma caducado»).',
    aviso: corto ? 'SERUMS: 30′ en tiempo muerto → núcleo = casos ciegos + imagen; review y lectura solo si sobra.' : 'Guía por regla (sesión no curada): casos, banco y lectura salen de la fila del plan; el tema del Pictorial sale de la asignación por afinidad.',
  };
}

/** v6.10g: pasos del plan B por regla con el HUECO de práctica real todavía sin llenar (lo usa también el cursor de DermNet, dermnetAsignacion). */
const HUECO = '§hueco de práctica real§';
interface PlanBBase { p2: GuiaPaso[]; a: Afin; corto: boolean; ap: { n: number; primera: string } | null; dn: DermnetMedido | undefined }
function planBBase(dia: DiaDerma, total: number): PlanBBase {
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
      pasos.push({ min: m, que: `ProMIR Dermatología › cap. ${cap.n} «${cap.t}» · TEST ${q}Q (ciego, primero)`, como: `${sinRelojF1(dia)}77 s/Q · ${t ? `el mismo test de ${q}Q que el plan A` : 'el plan A de hoy (30′ con casos) no tiene hueco para el test'} · lista «Pool oficial» de la app o test del capítulo ProMIR · registra el neto (kind derma10Q) · no depende de AccessDerma.`, enlace: { t: `ProMIR · Derma cap. ${cap.n}`, url: pm(cap.capId) } });
    }
  } else if (a.uw && UW_DERM[a.uw]) {
    // v6.09b · lote 1-quater: en F1 la regla del Tutor (2,35′/Q) y el reparto UW_TUTOR_F1; 2027 (y el SERUMS, 30′) sin cambio
    const f1T = !corto && dia.fecha <= LOTE1_HASTA;
    const s = UW_DERM[a.uw]!; const pide = corto ? 3 : uwPideRegla(dia.fecha); const minUW = corto ? 9 : f1T ? tutorMin(pide) : 12;
    if (taper) pasos.push({ min: minUW, que: `TAPER · uWorld Step 1 · System «${s.nombre}» · Status Incorrect · hasta ${pide}Q (0 nuevas)`, como: 'Qbankly › QBanks › uWorld - USMLE Step 1 › Test Composer: SOLO ese System → Status Incorrect → Tutor · re-test de tus fallos; si no tienes incorrectas en ese System, repasa los fallos del ledger · la semana de examen no se abren preguntas nuevas.', enlace: { t: 'Qbankly › QBanks (uWorld Step 1)', url: QBANKS } });
    else {
      // v6.02c F2 (E6): reparto de las Unused en orden de fecha; si el System se agota → relleno CONCRETO en ProMIR (capítulo afín)
      const asig = dermaUwAsignacion().get(dia.fecha);
      const toma = Math.min(pide, asig ? asig.toma : pide);
      const minQ = toma === pide ? minUW : f1T ? tutorMin(toma) : toma * 3;
      if (toma > 0) pasos.push({ min: minQ, que: `uWorld Step 1 · System «${s.nombre}» · Unused · ${toma}Q · Tutor (${s.q} en el System${asig ? ` · quedan ${asig.quedanAntes} antes de hoy según este plan` : ''})`, como: `Qbankly › QBanks › uWorld - USMLE Step 1 › Test Composer: SOLO ese System → Unused → ${toma} → Tutor${f1T ? ` · ${tutorTxt(toma)}` : ''} · en cada imagen describe (8 ejes) y da 3 diagnósticos ANTES de las opciones · cuentan doble para el Step 1${toma < pide ? ' · son las últimas Unused del System: el resto del paso, en ProMIR (paso siguiente)' : ' · si el composer muestra menos Unused (las usaste en otro test), haz las que haya y completa con ProMIR Dermatología del capítulo afín a 77 s/Q'}.`, enlace: { t: 'Qbankly › QBanks (uWorld Step 1)', url: QBANKS } });
      if (toma < pide) {
        const c = PROMIR_DERMA_CAPS[(a.pmd ?? UW_A_PMD[a.uw] ?? 1) - 1]!;
        const mR = minUW - (toma > 0 ? minQ : 0); const nR = Math.max(2, Math.floor((mR * 60) / SEG_Q));
        pasos.push({ min: mR, que: `ProMIR Dermatología › cap. ${c.n} «${c.t}» · ${nR}Q a 77 s/Q (relleno: uWorld «${s.nombre}» agotado — sus ${s.q} preguntas se usaron en las sesiones anteriores de este plan)`, como: `ProMIR › Entrenar (creador de tests) → Dermatología · cap. ${c.n} · ${nR} preguntas · en las de imagen describe (8 ejes) y da 3 diagnósticos ANTES de las opciones · si una pregunta ya la hiciste en un test anterior del capítulo, sáltala y toma la siguiente · registra el neto (kind derma10Q).`, enlace: { t: `ProMIR · Derma cap. ${c.n}`, url: pm(c.capId) } });
      }
    }
  }
  const ap = !corto && a.bb && BB_DERM[a.bb] && dia.fecha <= LOTE1_HASTA ? bbAparicion(dia.fecha) : null;
  if (!corto && a.bb && BB_DERM[a.bb] && ap && ap.n >= 2) {
    // v6.09 · lote 1 (a2-8): el mismo B&B por 2.ª (o 3.ª) vez → 2.ª pasada a 2× + recall de 60 s; los minutos que libera → 1-2Q del System de uWorld del
    //   átomo que el plan no reparte o, si el plan ya lo reparte entero, de ProMIR Dermatología del capítulo afín (el relleno de siempre)
    const v = BB_DERM[a.bb]!; const m2 = bb2aMin(a.bb); const libre = bbMinReserva(a.bb, dia.fecha) - m2;
    // v6.10j (auditoría c14): «2× sin pausas = N′» primero (antes los minutos iban tras el tema entre comillas y el corte del Calendar a 110 los dejaba fuera)
    pasos.push({ min: m2, que: `B&B Step 1 › ${v.ruta.replace(' > ', ' › ')} › «${v.nombre}» (${mmss(v.s)}) — 2.ª PASADA a 2× (${ap.n}.ª vez en el plan; la 1.ª, el ${fdc(ap.primera)})`, como: `Qbankly › Video Library › B&B Step 1 · 2× sin pausas = ${Math.round(v.s / 60 / 2)}′ + recall de 60 s: sin mirar, 3 ideas del vídeo aplicadas al átomo de hoy (ya lo viste: solo lo que conecta con «${dia.sub.split(/[:(—·]/)[0]!.trim()}»).`, enlace: { t: `B&B · ${v.nombre}`, url: VIDEOS } });
    const s = a.uw ? UW_DERM[a.uw] : undefined;
    // v6.09b · lote 1-quater: en F1 con la regla del Tutor (2,35′/Q); en F1 no ocurre (Inflammatory y Skin and soft tissue infections van repartidos enteros)
    const f1T = dia.fecha <= LOTE1_HASTA;
    const kUW = s && a.uw ? Math.min(2, Math.floor(libre / (f1T ? TUTOR_MIN_Q : 3)), uwSobranteDelPlan(a.uw)) : 0;
    if (kUW >= 1 && s) pasos.push({ min: f1T ? tutorMin(kUW) : kUW * 3, que: `uWorld Step 1 · System «${s.nombre}» · Unused · ${kUW}Q · Tutor (con los minutos que libera la 2.ª pasada; el plan deja ${uwSobranteDelPlan(a.uw!)} sin repartir)`, como: `Qbankly › QBanks › uWorld - USMLE Step 1 › Test Composer: SOLO ese System → Unused → Tutor${f1T ? ` · ${tutorTxt(kUW)}` : ''} · en cada imagen describe (8 ejes) y da 3 diagnósticos ANTES de las opciones.`, enlace: { t: 'Qbankly › QBanks (uWorld Step 1)', url: QBANKS } });
    else {
      const c = PROMIR_DERMA_CAPS[(a.pmd ?? (a.uw ? UW_A_PMD[a.uw] : undefined) ?? 1) - 1]!;
      const k = Math.min(2, Math.floor((libre * 60) / SEG_Q));
      const delTest = !!(dia.promir && cap && cap.n === c.n);
      if (k >= 1) pasos.push({ min: Math.ceil((k * SEG_Q) / 60), que: `ProMIR Dermatología › cap. ${c.n} «${c.t}» · ${k}Q más a 77 s/Q (con los minutos que libera la 2.ª pasada${s ? `; uWorld «${s.nombre}» ya está repartido entero en este plan` : ''})`, como: `ProMIR › Entrenar (creador de tests) → Dermatología · cap. ${c.n} · ${k} preguntas${delTest ? ' · las siguientes de la lista, después del test del capítulo' : ''} · en las de imagen describe (8 ejes) y da 3 diagnósticos ANTES de las opciones · si una ya la hiciste, sáltala y toma la siguiente · registra el neto (kind derma10Q).`, enlace: { t: `ProMIR · Derma cap. ${c.n}`, url: pm(c.capId) } });
    }
  } else if (!corto && a.bb && BB_DERM[a.bb]) {
    const v = BB_DERM[a.bb]!; const m = bbMinReserva(a.bb, dia.fecha); const res = m !== bbMin(a.bb, dia.fecha);
    // v6.10j (auditoría c14): la velocidad y sus minutos juntos y primero («1,25× = 11′ con pausas»; antes «1,5× con subtítulos EN (si el free recall … ≥3 ideas …»
    //   y el Calendar se quedaba sin los minutos); los subtítulos y la condición, detrás entre paréntesis
    const k = vel(dia.fecha);
    pasos.push({ min: m, que: `B&B Step 1 › ${v.ruta.replace(' > ', ' › ')} › «${v.nombre}» (${mmss(v.s)}) — afinidad por título (contenido no verificado)`, como: res
      // remate v6.10j (revisión adversarial, visibilidad #3): la CONDICIÓN del 1,5× pegada a sus minutos, dentro de los 110 del Calendar (antes el 1,5× se leía
      //   incondicional y la reserva enseñaba solo «1,25× = 9′ … (1,25× es …»)
      // v6.10l (auditoría c15): los subtítulos delante, dentro de los 110 del Calendar (antes «; con subtítulos EN» iba al final y el corte lo dejaba fuera);
      //   «› B&B Step 1» ya lo dice el «qué»
      ? `Qbankly › Video Library (${k.subs.replace(/^con /, '')}) · 1,5× = ${bbMin(a.bb, dia.fecha)}′ si el último free recall dio ≥3 ideas; si no, 1,25× = ${m}′ · free recall de 60 s al terminar (con pausas; a 1,5×, lo que sobre pasa al paso de práctica real —casos DermNet / ProMIR—).`
      // 2027 (sin la reserva del lote 1, remate v6.10l): los dos minutos y de dónde salen los de más a 1,25×, dentro de los 110 del Calendar (antes «(si no,
      //   1,25×)» sin minutos, que no cuadraba con el paso); la ruta, detrás
      : k.cond ? ((d) => `Qbankly (${k.subs.replace(/^con /, '')}) · ${k.x} = ${m}′ si el último free recall dio ≥3 ideas; si no, 1,25× = ${m + d}′${d > 0 ? ` (+${d}′ de la práctica real)` : ''} · Video Library › B&B Step 1 · free recall de 60 s al terminar (con pausas)${d > 0 ? `; a 1,25×, el paso de práctica real (casos DermNet / ProMIR) cede esos ${d}′` : ''}.`)(Math.max(0, bbMin125(a.bb, dia.fecha) - m))
      : `Qbankly › Video Library › B&B Step 1 · ${k.x} = ${m}′ con pausas · free recall de 60 s al terminar (${k.subs}).`, enlace: { t: `B&B · ${v.nombre}`, url: VIDEOS } });
  }
  // v6.09b · lote 1-bis (a2-9) → lote 1-ter (revisión R, hallazgos 4 · 5 · 8): en F1 el atlas lleva su medida POR FECHA (DERMNET_MEDIDO: lecturas + palabras +
  //   imágenes → minutos = palabras/100 + 0,25′/imagen); lo que no es del alcance «no forma parte del átomo» y lo del átomo que no cabe va a su fecha con sus
  //   minutos; 2027 sigue «sin medir» (otro lote)
  const dnF = !corto && dia.fecha <= LOTE1_HASTA && dia.atlasUrl && dia.atlasUrl.startsWith(`${DERMNET}/topics/`) ? DERMNET_MEDIDO[dia.fecha] : undefined;
  const dn = dnF && dia.atlasUrl && dnF.atlas === dia.atlasUrl.replace(`${DERMNET}/topics/`, '') ? dnF : undefined;
  if (dn && dia.atlasUrl) pasos.push(pasoDermnetMedido(dn, dia.atlasUrl));
  else if (dia.atlasUrl && dia.atlasUrl.startsWith(DERMNET)) pasos.push({ min: corto ? 6 : 8, que: `DermNet · atlas del átomo (${dia.atlasUrl.replace(`${DERMNET}/`, '')}) — sin medir`, como: 'Primero las imágenes (tapa el pie y describe), después «clinical features» y «differential diagnosis» · ~120 palabras/min.', enlace: { t: 'DermNet · atlas del átomo', url: dia.atlasUrl } });
  else if (!corto && a.pmd && a.pmd !== cap?.n) { const c = PROMIR_DERMA_CAPS[a.pmd - 1]!; pasos.push({ min: 8, que: `LECTURA (español) · ProMIR Dermatología › cap. ${c.n} «${c.t}» — la sección del átomo de hoy (sin medir)`, como: 'Solo el apartado del átomo · Whole Page Rule · ritmo de referencia 180 palabras/min.', enlace: { t: `ProMIR · Derma cap. ${c.n}`, url: pm(c.capId) } }); }
  // v6.10e (18-nov-2026 · PREGUNTAS REALES): la variable de ajuste ya no es el proyecto Claude (viñetas generadas por IA) sino un HUECO que llena practicaReal()
  //   con casos REALES (DermNet Quizzes), preguntas MIR oficiales (ProMIR) o práctica sin preguntas; si el atlas medido se lleva toda la franja (4 y 8-dic), no hay hueco
  const conHueco = !dn || pasos.reduce((s, p) => s + p.min, 0) + 2 < total;
  if (conHueco) pasos.push({ min: 0, que: HUECO, como: HUECO });
  pasos.push(cierrePaso(2));
  let p2 = cuadrar(pasos, total);
  // si el hueco quedó < 3′, quita el paso más largo opcional (DermNet/ProMIR lectura) y vuelve a cuadrar (no con el atlas medido de F1: ahí cuadra por medida)
  const rell = p2.find((p) => p.que === HUECO);
  if (!dn && rell && rell.min < 3) { const sin = pasos.filter((p) => !/^(DermNet|LECTURA \(español\))/.test(p.que)); p2 = cuadrar(sin, total); }
  return { p2, a, corto, ap, dn };
}

/** Plan B por regla (acceso remoto caducado). */
function planBPorRegla(dia: DiaDerma, ini: string, total: number): GuiaBloque {
  const { p2: p0, a, corto, ap, dn } = planBBase(dia, total);
  const p2 = p0.flatMap((p) => (p.que === HUECO ? practicaReal(dia, p.min, a, corto) : [p]));
  const recursos: GuiaRecurso[] = [{ t: 'ProMIR · Dermatología', url: pm(PM_CAP.c1) }];
  // v6.10g: la cantidad sale del «(N casos REALES» del paso (un paso DermNet puede juntar dos quizzes)
  for (const p of p2) if (p.enlace && /^(DermNet Quizzes|LECTURA REAL)/.test(p.que)) { const k = /\((\d+) casos? REAL/.exec(p.que); recursos.unshift({ t: p.enlace.t, url: p.enlace.url, ...(k ? { cantidad: `${k[1]} caso${k[1] === '1' ? '' : 's'}` } : {}) }); }
  if (a.bb && BB_DERM[a.bb]) recursos.push({ t: `B&B · ${BB_DERM[a.bb]!.nombre}`, url: VIDEOS, min: ap && ap.n >= 2 ? bb2aMin(a.bb) : bbMinReserva(a.bb, dia.fecha) });
  if (dia.atlasUrl && dia.atlasUrl.startsWith(DERMNET)) recursos.push({ t: 'DermNet · atlas del átomo', url: dia.atlasUrl });
  if (dn) for (const l of dn.lecturas) if (l.pag !== dn.atlas) recursos.push({ t: `DermNet · ${l.pag}${l.de ? ` (del ${fdc(l.de)})` : ''}`, url: l.url });
  const ids = dia.casoIds;
  return {
    franja: franjaDe(ini, total), plan: 'research-derma', titulo: `DERMA d${dia.d} · ${subTitulo(dia.sub)} — PLAN B (AccessDerma caducado)`, totalMin: total, pasos: p2, recursos,
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
  // v6.10e (base cero): cada guía (plan A y B) lleva en su aviso la FASE, qué se hace en ella y el criterio para pasar a la siguiente (v6.10g: tras el de AccessDerma)
  // v6.10g (revisión 18-nov · c11): el aviso de AccessDerma (renovar el acceso remoto) va PRIMERO; el resto de avisos, tras la fase como antes
  const fase = (g: GuiaBloque): GuiaBloque => ({ ...g, aviso: !g.aviso ? dermaFaseAviso(dia) : /^AccessDerma/.test(g.aviso) ? `${g.aviso} · ${dermaFaseAviso(dia)}` : `${dermaFaseAviso(dia)} · ${g.aviso}` });
  if (c && c.fecha === dia.fecha && total === 45) return { planA: fase(moverA(c.planA, ini)), planB: fase(moverA(c.planB, ini)), curada: true };
  return { planA: fase(planAPorRegla(dia, ini, total)), planB: fase(planBPorRegla(dia, ini, total)), curada: false };
}
/** La guía que manda hoy según la preferencia «AccessDerma renovado» (por defecto: plan B). */
export function dermaGuiaDe(dia: DiaDerma, opts: { ini?: string; minutos?: number; accessOK?: boolean } = {}): GuiaBloque {
  const par = dermaGuiaPar(dia, opts);
  return (opts.accessOK ?? accessDermaOK()) ? par.planA : par.planB;
}
