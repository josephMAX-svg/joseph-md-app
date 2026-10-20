/**
 * mirGuia.ts — GUÍA «qué · cuánto · cómo» del bloque MIR (1 h/día, DJ-4) en el formato común `GuiaBloque` (src/lib/guia.ts).
 * Pedido de Joseph (18-oct-2026): «QUÉ leer, CUÁNTO leer, CÓMO leer — no puede estar al azar … que todo esté estructurado y definido».
 *
 *  · D1-D76 (v6.03: mié 21-oct-2026 → lun 8-feb-2027; v6.02c: solo D1-D10) = MEDIDOS: el bloque sale tal cual de
 *    DATA/MIR/guia_lectura_semana1-2.json (nombre histórico; E2: medición real de cada capítulo ProMIR — palabras deduplicadas, secciones,
 *    figuras, clips, preguntas MIR citadas; 10 capítulos el 18-oct + 66 el 20-oct) vía src/lib/mirGuiaDatos.ts (GENERADO por
 *    DATA/MIR/guia_lectura/gen_mir_guia.js). Las preguntas exactas de cada paso: `mirGuiaPreguntas(d)`.
 *  · POR REGLA solo si un día-tema no tuviera medición (desde v6.03 no ocurre con el plan vigente; queda para cambios de plan): misma
 *    estructura de 7 pasos, marcada «sin medir»: anclas fijas de
 *    mirDailyPlan.mirAnclas (D-1 2Q · D-3 1Q · D-7 1Q; la app puede cambiar un slot por un tema 🔥 caliente: manda la app) o TEST DE
 *    CIERRE el 1.er día de bloque · pre-test 5Q (pool oficial de la app → completar con preguntas MIR citadas ≥2015 del capítulo) ·
 *    lectura dirigida 15′ (Orientación MIR 1′ + secciones gap por chips MIR) · quiz 8-10Q (resto del pool + citadas) · ≤4 APEX.
 *    D77 mini-MIR 40Q · D78 corrección + tabla de neto (no leen capítulo: guía propia).
 *  · Banqueo (mirMantenimiento: mantenimiento + extensión + repuestas tras el Step 1 —v6.03: 11, v6.02c: 9—) = POR REGLA desde las sub-franjas
 *    del día (Anki → 25Q/30Q cronometradas → corrección −1/3), desplazadas al inicio de la franja del turno en el SERUMS; v6.03: la corrección
 *    Whole-Page lleva el dato MEDIDO de los capítulos de la asignatura foco (MIR_CAP_MEDIDO: minutos de lectura completa + secciones de más peso).
 *  Regla de oro (guia.ts): Σ pasos = minutos de la franja. Lo comprueba `gen_mir_guia.js --check` en TODOS los días (plan + banqueo).
 * v6.02c (18-oct-2026, E3): nuevo.
 * v6.03 (20-oct-2026): D1 = mié 21-oct; los 76 capítulos del plan medidos (D1-D76 medidos) + dato medido en el banqueo.
 */
import type { GuiaBloque, GuiaPaso, GuiaRecurso } from './guia';
import { aMinutos } from './guia';
import { MIR_DIAS, mirDiaDe, mirDiaN, mirAnclas, mirCierreDe, capUrl, MIR_TEMAS_TOTAL, MIR_SEG_POR_Q, mirMinutos, type DiaMIR } from './mirDailyPlan';
import { mirMantDiaDe, mirMantFranjas, MIR_MANT_META, type DiaMIRMant } from './mirMantenimiento';
import { mirAnkiDeck } from './ankiLinks';
import { MIR_GUIA_MEDIDA, MIR_POOL_POR_CAP, MIR_POOL_POR_ASIG, MIR_GUIA_DATOS_META, MIR_CAP_MEDIDO, type MirGuiaPreguntas } from './mirGuiaDatos';

export type { MirGuiaPreguntas, MirGuiaQ, MirGuiaEvalSlot, MirCapMedido } from './mirGuiaDatos';
export { MIR_GUIA_DATOS_META, MIR_CAP_MEDIDO };

const PROMIR = 'https://promir.medicapanamericana.com';
const EXAMENESMIR = 'https://www.examenesmir.com/examenes-mir';
const FRANJA_BASE = '15:15';
const hhmm = (m: number): string => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
/** Franja 'HH:MM–HH:MM' de `min` minutos desde `ini`. */
const franjaDe = (ini: string, min: number): string => `${ini}–${hhmm(aMinutos(ini) + min)}`;
/** Prefija la hora real de cada paso («15:15–15:22 · …») a partir del inicio de la franja. */
function conHoras(pasos: GuiaPaso[], ini: string): GuiaPaso[] {
  let t = aMinutos(ini);
  return pasos.map((p) => { const a = t; t += p.min; return { ...p, que: `${hhmm(a)}–${hhmm(t)} · ${p.que}` }; });
}
/** Quita el prefijo de hora de un paso medido (para re-prefijarlo si la franja se desplaza). */
const sinHora = (que: string): string => que.replace(/^\d{2}:\d{2}–\d{2}:\d{2} · /, '');
/** Desplaza un bloque medido (franja base 15:15) al inicio `ini` (p. ej. un turno del SERUMS). */
function desplazar(g: GuiaBloque, ini: string): GuiaBloque {
  if (g.franja.startsWith(ini)) return g;
  return { ...g, franja: franjaDe(ini, g.totalMin), pasos: conHoras(g.pasos.map((p) => ({ ...p, que: sinHora(p.que) })), ini) };
}
const poolCap = (capId: string): number => MIR_POOL_POR_CAP[capId] ?? 0;
const poolAsig = (num: number): number => MIR_POOL_POR_ASIG[num] ?? 0;

/** Guía del día del PLAN (1.ª vuelta, D1-D78). `ini` = inicio real de la franja (por defecto 15:15). */
export function mirGuiaPlan(dia: DiaMIR, ini: string = FRANJA_BASE): GuiaBloque {
  const medida = MIR_GUIA_MEDIDA[dia.d];
  if (medida && medida.fecha === dia.fecha && medida.capId === dia.capId) return desplazar(medida.bloque, ini);
  if (dia.d === 77) return guiaMiniMIR(dia, ini);
  if (dia.d === 78) return guiaCorreccion(dia, ini);
  return guiaPorRegla(dia, ini);
}

/** Día-tema SIN medición (no ocurre con el plan v6.03: los 76 capítulos están medidos): misma estructura que los medidos, con «sin medir». */
function guiaPorRegla(dia: DiaMIR, ini: string): GuiaBloque {
  const deck = mirAnkiDeck(dia.asignatura);
  const cierre = mirCierreDe(dia.d);
  const pool = poolCap(dia.capId);
  const pre = Math.min(5, pool);
  const quizPool = Math.max(0, Math.min(10, pool - pre));
  const url = capUrl(dia.capId);
  const pasos: GuiaPaso[] = [];
  if (cierre) {
    pasos.push({
      min: 15,
      que: `TEST DE CIERRE · 10Q reales MIR de ${cierre.asignatura} (bloque D${cierre.dIni}-D${cierre.dFin} cerrado)`,
      como: `Cronómetro ${mirMinutos(10)} min (${MIR_SEG_POR_Q} s/Q), en blanco si no descartas 2 · fuente: pool oficial de la app sin usar (${poolAsig(cierre.num)} preguntas de ${cierre.asignatura} en el pool, menos las ya usadas) → si faltan, cuadernillos oficiales examenesmir · neto = A − F/3 → ≥70 % consolidada · 55-69 % intermedia · <55 % entra en las anclas D-7 · 2′ para registrar (kind cierre). Hoy no hay eval anclada ni Anki en esta franja (los sustituye el cierre).`,
      enlace: { t: 'Cuadernillos MIR (respaldo)', url: EXAMENESMIR },
    });
  } else {
    const a = mirAnclas(dia.d);
    const slots = [a.d1 && `2Q D-1 (D${a.d1.d} ${a.d1.tema})`, a.d3 && `1Q D-3 (D${a.d3.d} ${a.d3.tema})`, a.d7 && `1Q D-7 (D${a.d7.d} ${a.d7.tema})`].filter(Boolean);
    const nQ = (a.d1 ? 2 : 0) + (a.d3 ? 1 : 0) + (a.d7 ? 1 : 0);
    pasos.push(
      {
        min: 7,
        que: `EVAL ANCLADA ${nQ}Q · ${slots.join(' + ') || 'sin temas previos'}`,
        como: `Cronómetro ${mirMinutos(nQ)} min (${MIR_SEG_POR_Q} s/Q), en blanco si no descartas 2 · preguntas: el pool oficial de la app (lista «Pool oficial · anclada» abajo); si el capítulo ya no tiene preguntas sin usar, las MIR citadas en las secciones que leíste ese día (chips «MIR AAAA-AAAA, Pnnn» del capítulo ProMIR) · si la app te propone un tema 🔥 caliente (gate), manda la app.`,
      },
      { min: 5, que: `Anki ${deck}`, como: 'FSRS · solo Good/Again · deuda a cero; si no hay repasos, revisa las tarjetas de ayer.' },
      { min: 3, que: 'Log de la eval en la app', como: `aciertos/${nQ || 4} · brecha knowledge / transfer / proceso · fallo D-7 → cola D+14 · slot ✗ → tema caliente mañana.` },
    );
  }
  pasos.push(
    {
      min: 8,
      que: `PRE-TEST 5Q ciegas del capítulo nuevo (${pre >= 5 ? '5 del pool oficial de la app' : pre > 0 ? `${pre} del pool oficial de la app + ${5 - pre} citadas ProMIR ≥2015` : '5 preguntas MIR citadas ≥2015 del capítulo (el pool de la app no tiene de este capítulo)'})`,
      como: `Sin leer nada · ${MIR_SEG_POR_Q} s/Q · registra en la app (kind pretest) · cada fallo = una sección «gap» (la sección donde está el chip MIR de esa pregunta).`,
      enlace: { t: 'Capítulo ProMIR', url },
    },
    {
      min: 15,
      que: `LECTURA DIRIGIDA 15′ · Orientación MIR (1′) + secciones «gap» del pre-test (14′) — ${dia.tema} · SIN MEDIR: secciones y minutos se eligen en el momento`,
      como: 'Orden: primero la sección de cada pregunta FALLADA; si acertaste las 5, las secciones con más chips «MIR ≥2015». Whole Page Rule: el apartado entero, no frases sueltas · ritmo de referencia 180 palabras/min (una sección de ~500 palabras ≈ 3′) · a las 15:53 paras: lo que no entra queda para la 2.ª vuelta (oct-2027) · vídeos largos (Masterclass/Videoclase/Imperdible) NO entran; solo clips ≤12 min.',
      enlace: { t: `ProMIR · ${dia.tema}`, url },
    },
    {
      min: 12,
      que: `8Q comentadas (máx. 10) · ${quizPool > 0 ? `${quizPool} del pool oficial que no entraron en el pre-test + ` : ''}preguntas MIR citadas en las secciones que acabas de leer`,
      como: `Rule-In → Rule-Out · tapa las opciones y contesta antes de verlas · ${MIR_SEG_POR_Q} s/Q + lee el comentario · registra en la app (kind quiz): <60 % = tema caliente mañana · a las 16:05 paras donde estés. Pool oficial de la app para este capítulo: ${pool}Q.`,
    },
    { min: 10, que: `≤4 APEX en ${deck}`, como: `Desde el Shopping List: pregunta SAQ + por qué + 🇪🇸 delta si aplica + tag sys:: del sistema USMLE (${dia.usmleSystem}) · 1 de cada 4 con imagen · creados directamente en Anki.` },
  );
  const recursos: GuiaRecurso[] = [
    { t: `ProMIR · ${dia.tema} (capítulo completo; lectura completa sin medir)`, url },
    { t: 'Pool oficial de la app (MIR 2022-2026) de este capítulo', url, cantidad: `${pool}Q` },
  ];
  if (dia.resumenVid) recursos.push({ t: `Vídeo resumen de ${dia.asignatura} (asignatura entera) — NO entra en la franja (${dia.resumenVid})`, url });
  return {
    franja: franjaDe(ini, 60), plan: 'mir',
    titulo: `MIR D${dia.d}/${MIR_DIAS.length} · ${dia.asignatura} — ${dia.tema}`,
    totalMin: 60,
    pasos: conHoras(pasos, ini),
    recursos,
    hecho: `${cierre ? 'Test de cierre 10Q registrado' : 'Eval anclada registrada'} + pre-test 5Q registrado + lectura de las secciones gap + ≥8Q del quiz registradas + ≤4 APEX creados.`,
    planB: 'Si ProMIR no abre: pre-test y quiz con el pool oficial de la app (pestaña MIR) y lectura en la nota madre de Obsidian (◆ Obsidian). Día roto (modo mínimo): Anki a cero + 4Q ancladas (15′).',
    aviso: `Capítulo sin medir (la medición cubre los 76 capítulos del plan v6.03; este día no está en ella): las secciones de la lectura se eligen por regla. Para fijarlas: DATA/MIR/guia_lectura/analiza_cap.js (DevTools) → medicion_promir_*/ → gen_guia_lectura.js → gen_mir_guia.js.`,
  };
}

function guiaMiniMIR(dia: DiaMIR, ini: string): GuiaBloque {
  return {
    franja: franjaDe(ini, 60), plan: 'mir', titulo: `MIR D${dia.d} · mini-MIR 40Q mixto (hito)`, totalMin: 60,
    pasos: conHoras([
      { min: 51, que: `mini-MIR 40Q mixtas cronometradas (${mirMinutos(40)} min · ${MIR_SEG_POR_Q} s/Q) de las 14 asignaturas del plan`, como: 'Pool oficial sin usar (lista «Pool oficial · mini-MIR mixto» de la app, mezcla determinista por fecha); si no llega a 40, completa con cuadernillos examenesmir · en blanco permitido · sin corregir todavía.', enlace: { t: 'Cuadernillos MIR (respaldo)', url: EXAMENESMIR } },
      { min: 9, que: 'Plantilla + neto (A − F/3) al log (kind miniMIR)', como: 'Solo la plantilla y el neto: la corrección es mañana (D78). Mínimo on-track del hito: 50 % neto.' },
    ], ini),
    recursos: [{ t: 'Cuadernillos oficiales MIR (examenesmir)', url: EXAMENESMIR }],
    hecho: '40Q respondidas en el tiempo y el neto registrado en la app (kind miniMIR).',
    planB: 'Sin tiempo para 51′: 25Q (32 min) y se registra el neto de 25.',
  };
}
function guiaCorreccion(dia: DiaMIR, ini: string): GuiaBloque {
  return {
    franja: franjaDe(ini, 60), plan: 'mir', titulo: `MIR D${dia.d} · corrección del mini-MIR + tabla de neto`, totalMin: 60,
    pasos: conHoras([
      { min: 40, que: 'Corrección Whole-Page de cada fallo del mini-MIR + Shopping List de APEX', como: 'Por cada fallo: abre su capítulo ProMIR, lee el apartado entero y escribe la regla que lo habría resuelto; ≤8 APEX directos en Anki.', enlace: { t: 'ProMIR', url: PROMIR } },
      { min: 20, que: 'Tabla de neto por asignatura (= baseline honesto) en la app', como: 'Asignaturas <55 % → anclas D-7 del banqueo (mantenimiento desde el día siguiente).' },
    ], ini),
    recursos: [{ t: 'ProMIR', url: PROMIR }],
    hecho: 'Todos los fallos corregidos con su regla + tabla de neto guardada.',
  };
}

/** v6.03: capítulos MEDIDOS del plan de una asignatura (num), en el orden del plan → corrección Whole-Page del banqueo. */
function capitulosMedidos(num: number): Array<{ capId: string; d: number; tema: string; min: number; top: string[] }> {
  return Object.entries(MIR_CAP_MEDIDO).filter(([, c]) => c.num === num).map(([capId, c]) => ({ capId, d: c.d, tema: c.tema, min: c.min, top: c.top })).sort((a, b) => a.d - b.d);
}

/** Guía de una sesión del BANQUEO (mantenimiento · extensión · repuestas tras el Step 1). `ini` = inicio de la franja del turno. */
export function mirGuiaMant(dia: DiaMIRMant, ini: string = FRANJA_BASE): GuiaBloque {
  const fr = mirMantFranjas(dia);
  // v6.03: dato medido de los capítulos de la asignatura foco (banco) o de la de registro por defecto (viernes); el sábado es mixto (14 asignaturas)
  const caps = dia.tipo === 'sabado' ? [] : capitulosMedidos(dia.num);
  const deck = 'APEX::MIR';
  const asigs = dia.tipo === 'sabado' ? 'MIXTAS de las 14 asignaturas del plan (mini-simulacro)' : dia.tipo === 'viernes' ? `la asignatura PEOR del log (fallback ${dia.asignatura})` : dia.tierC ? `${dia.nQ - dia.tierC.nQ}Q ${dia.asignatura} + ${dia.tierC.nQ}Q TIER C ${dia.tierC.asignatura} › ${dia.tierC.capitulo}` : `15Q ${dia.asignatura} + 10Q interleaving ${dia.asignatura2 ?? 'mixtas'}`;
  const pasos: GuiaPaso[] = fr.map((f) => {
    const [a, b] = f.hora.split('–');
    const min = aMinutos(b ?? '') - aMinutos(a ?? '');
    if (f.tipo === 'anki') return { min, que: `Anki ${deck} (todas las asignaturas)`, como: 'FSRS · solo Good/Again · retention 0,85 hasta el Step 1 (→ 0,90 en la fase principal, oct-2027) · deuda a cero.' };
    if (f.tipo === 'quiz') return {
      min, que: `${dia.nQ}Q reales MIR cronometradas · ${asigs}`,
      como: `${MIR_SEG_POR_Q} s/Q (${dia.minQ} min) · en blanco si no descartas 2 · preguntas: la lista «Pool oficial» de la app (sin usar) → si faltan, test por asignatura ProMIR o cuadernillos examenesmir${dia.tierC ? ` · las ${dia.tierC.nQ}Q Tier C se registran APARTE con su asignatura (${dia.tierC.asignatura})` : ''}.`,
      enlace: dia.tierC ? { t: `ProMIR · ${dia.tierC.capitulo}`, url: capUrl(dia.tierC.capId) } : { t: 'Cuadernillos MIR', url: EXAMENESMIR },
    };
    if (f.tipo === 'log') return { min, que: 'Corrección −1/3 + log', como: `Neto = A − F/3 · Whole-Page Rule de cada fallo (capítulo ProMIR: solo el APARTADO de la pregunta, 2-5′; ${caps.length ? `capítulos medidos de ${dia.asignatura} en los recursos, con su lectura completa y sus secciones de más peso` : 'busca el capítulo por el chip «MIR AAAA-AAAA, Pnnn»'}) · registra en la app (kind mantenimiento) con la brecha knowledge / transfer / proceso · 🇪🇸 delta.` };
    return { min, que: f.fase, como: 'Según la franja del día.' };
  });
  const recursos: GuiaRecurso[] = [{ t: 'Cuadernillos oficiales MIR (examenesmir)', url: EXAMENESMIR }, { t: 'ProMIR', url: PROMIR }];
  if (dia.tierC) recursos.unshift({ t: `ProMIR · Tier C ${dia.tierC.asignatura} › ${dia.tierC.capitulo}`, url: capUrl(dia.tierC.capId), cantidad: `${dia.tierC.nQ}Q` });
  for (const c of caps) recursos.push({ t: `ProMIR · ${dia.asignatura} · D${c.d} ${c.tema} — más peso: ${c.top.join(' · ') || '—'}`, url: capUrl(c.capId), min: c.min, cantidad: `lectura completa ≈${c.min}′ (medida, 180 ppm)` });
  const fase = dia.fase === 'extension' ? 'extensión' : 'mantenimiento';
  return {
    franja: franjaDe(ini, pasos.reduce((s, p) => s + p.min, 0)), plan: 'mir',
    titulo: `MIR M${dia.d}/${MIR_MANT_META.totalDias} · banqueo (${fase}) · ${dia.tipo === 'sabado' ? 'SÁBADO mini-simulacro' : dia.tipo === 'viernes' ? 'viernes' : dia.asignatura} — ${dia.nQ}Q`,
    totalMin: pasos.reduce((s, p) => s + p.min, 0),
    pasos: conHoras(pasos, ini),
    recursos,
    hecho: `${dia.nQ}Q respondidas en ${dia.minQ} min + neto registrado en la app (kind mantenimiento)${dia.tierC ? ' + entrada propia del Tier C' : ''} + Anki a cero.`,
    planB: 'Guardia o día roto: Anki a cero + 10Q en tiempo muerto; lo que no se termine se suma al día de plan siguiente (DJ-4).',
    ...(dia.repuesta ? { aviso: `Sesión REPUESTA (${dia.repuesta}): la extensión la perdió con los corrimientos v6.01/v6.02/v6.03 y se recoloca tras el examen Step 1 («si se recortó algo, alárgalo»).` } : {}),
  };
}

/** Guía MIR de una fecha (plan o banqueo). `ini` = inicio real de la franja (plantilla/turno); null = sin hora fija (guardia). */
export function mirGuiaDe(iso: string, ini?: string | null): GuiaBloque | null {
  const i0 = ini ?? FRANJA_BASE;
  const p = mirDiaDe(iso);
  let g: GuiaBloque | null = null;
  if (p) g = mirGuiaPlan(p, i0);
  else { const m = mirMantDiaDe(iso); if (m) g = mirGuiaMant(m, i0); }
  if (g && ini === null) g = { ...g, aviso: [g.aviso, 'Guardia: sin hora fija → mismo reparto en minutos, en tiempo muerto (DJ-4).'].filter(Boolean).join(' · ') };
  return g;
}
/** Preguntas exactas de la guía medida (D1-D76 desde v6.03); undefined en los días por regla (las da la app desde el pool). */
export function mirGuiaPreguntas(d: number): MirGuiaPreguntas | undefined {
  const m = MIR_GUIA_MEDIDA[d];
  const dia = mirDiaN(d);
  return m && dia && m.fecha === dia.fecha ? m.preguntas : undefined;
}
/** ¿El día está medido (D1-D76 desde v6.03)? */
export const mirGuiaMedido = (d: number): boolean => !!mirGuiaPreguntas(d);
/** Nº de días del plan con guía medida y por regla (para el informe). */
export const MIR_GUIA_RESUMEN = { medidos: Object.keys(MIR_GUIA_MEDIDA).length, porRegla: MIR_TEMAS_TOTAL - Object.keys(MIR_GUIA_MEDIDA).length, hitos: 2 } as const;
