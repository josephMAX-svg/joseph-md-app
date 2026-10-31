/**
 * mirGuia.ts — GUÍA «qué · cuánto · cómo» del bloque MIR (1 h/día, DJ-4) en el formato común `GuiaBloque` (src/lib/guia.ts).
 * Pedido de Joseph (18-oct-2026): «QUÉ leer, CUÁNTO leer, CÓMO leer — no puede estar al azar … que todo esté estructurado y definido».
 *
 *  · D1-D76 (v6.06: lun 2-nov-2026 → jue 18-feb-2027; v6.05: lun 26-oct → jue 11-feb; v6.03: mié 21-oct → lun 8-feb; v6.02c: solo D1-D10) = MEDIDOS: el bloque sale tal cual de
 *    DATA/MIR/guia_lectura_semana1-2.json (nombre histórico; E2: medición real de cada capítulo ProMIR — palabras deduplicadas, secciones,
 *    figuras, clips, preguntas MIR citadas; 10 capítulos el 18-oct + 66 el 20-oct) vía src/lib/mirGuiaDatos.ts (GENERADO por
 *    DATA/MIR/guia_lectura/gen_mir_guia.js). Las preguntas exactas de cada paso: `mirGuiaPreguntas(d)`.
 *  · POR REGLA solo si un día-tema no tuviera medición (desde v6.03 no ocurre con el plan vigente; queda para cambios de plan): misma
 *    estructura de 7 pasos, marcada «sin medir»: anclas fijas de
 *    mirDailyPlan.mirAnclas (D-1 2Q · D-3 1Q · D-7 1Q; la app puede cambiar un slot por un tema 🔥 caliente: manda la app) o TEST DE
 *    CIERRE el 1.er día de bloque · pre-test 5Q (pool oficial de la app → completar con preguntas MIR citadas ≥2015 del capítulo) ·
 *    lectura dirigida 15′ (Orientación MIR 1′ + secciones gap por chips MIR) · quiz 8-10Q (resto del pool + citadas) · ≤4 APEX.
 *    D77 mini-MIR 40Q · D78 corrección + tabla de neto (no leen capítulo: guía propia).
 *  · Banqueo (mirMantenimiento: mantenimiento + extensión + repuestas tras el Step 1 —v6.06: 9, mar 26-oct → vie 5-nov-2027 · v6.05: 4, mar 26 → vie 29-oct · v6.04: 1 · v6.03: 11 · v6.02c: 9—) = POR REGLA desde las sub-franjas
 *    del día (Anki → 25Q/30Q cronometradas → corrección −1/3), desplazadas al inicio de la franja del turno en el SERUMS; v6.03: la corrección
 *    Whole-Page lleva el dato MEDIDO de los capítulos de la asignatura foco (MIR_CAP_MEDIDO: minutos de lectura completa + secciones de más peso).
 *  Regla de oro (guia.ts): Σ pasos = minutos de la franja. Lo comprueba `gen_mir_guia.js --check` en TODOS los días (plan + banqueo).
 * v6.02c (18-oct-2026, E3): nuevo.
 * v6.03 (20-oct-2026): D1 = mié 21-oct; los 76 capítulos del plan medidos (D1-D76 medidos) + dato medido en el banqueo.
 * v6.06 (31-oct-2026): D1 = lun 2-nov (+5 hábiles; mismos 76 capítulos medidos, misma guía: solo cambian las fechas, que salen de mirDailyPlan).
 * v6.05 (24-oct-2026): D1 = lun 26-oct (+3 hábiles; mismos 76 capítulos medidos, misma guía: solo cambian las fechas, que salen de mirDailyPlan).
 * v6.03b (20-oct-2026 · Joseph: «estructura el método de estudio de cada examen con los referentes … RaviMedTest para el MIR»): `metodoRavi`
 *   mete el método RaviMedTest (DATA/MIR/METODO_RAVIMEDTEST.md · datos MIR_METODO) DENTRO de los pasos de cada día del plan, sin tocar la franja
 *   ni los 60′: Anki = mazo personal APEX::MIR primero y mazo base de Ravi («1ºVUELTA 2MIR21», suspendido y reactivado por asignatura) después,
 *   en orden aleatorio · APEX solo de fallos y detalles de nivel 3-4/5 (formato pregunta → respuesta breve) · REPASO RELACIONAL «antes» el día que
 *   empieza cada asignatura (salvo D1) y «al terminar» su último día (los minutos salen del APEX: 10′ → 7′; 6′ en Bioética, que dura 1 día) ·
 *   el quiz exprime cada fallo. D77 = técnica de simulacro (reloj cada 10Q, revisión formal sin cambiar contenido) y D78 = orden de corrección de
 *   Ravi. El banqueo lleva los dos mazos, el reloj en los bloques ≥20Q y el orden de corrección. MIR_GUIA_MEDIDA sigue siendo la medición pura.
 */
import type { GuiaBloque, GuiaPaso, GuiaRecurso } from './guia';
import { aMinutos, partesFranja } from './guia';
import { MIR_DIAS, mirDiaDe, mirDiaN, mirAnclas, mirCierreDe, mirBloques, capUrl, MIR_TEMAS_TOTAL, MIR_SEG_POR_Q, mirMinutos, type DiaMIR } from './mirDailyPlan';
import { mirMantDiaDe, mirMantFranjas, MIR_MANT_META, type DiaMIRMant } from './mirMantenimiento';
import { mirAnkiDeck } from './ankiLinks';
import { MIR_GUIA_MEDIDA, MIR_POOL_POR_CAP, MIR_POOL_POR_ASIG, MIR_GUIA_DATOS_META, MIR_CAP_MEDIDO, MIR_METODO, type MirGuiaPreguntas, type MirMetodoAsig } from './mirGuiaDatos';

export type { MirGuiaPreguntas, MirGuiaQ, MirGuiaEvalSlot, MirCapMedido, MirMetodo, MirMetodoAsig } from './mirGuiaDatos';
export { MIR_GUIA_DATOS_META, MIR_CAP_MEDIDO, MIR_METODO };

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
  if (medida && medida.fecha === dia.fecha && medida.capId === dia.capId) return desplazar(metodoRavi(medida.bloque, dia), ini);
  if (dia.d === 77) return guiaMiniMIR(dia, ini);
  if (dia.d === 78) return guiaCorreccion(dia, ini);
  return metodoRavi(guiaPorRegla(dia, ini), dia);
}

// ── v6.03b · MÉTODO RaviMedTest dentro de los pasos (DATA/MIR/METODO_RAVIMEDTEST.md; datos en MIR_METODO) ──────────────────────────────
const M = MIR_METODO;
/** Recurso/vídeo del método por clave (los vídeos son públicos, del canal de Ravi). */
const vid = (k: string): GuiaRecurso[] => { const v = M.videos[k]; return v ? [{ t: v.t, url: v.url }] : []; };
const PREF = /^(\d{2}):(\d{2})–(\d{2}):(\d{2}) · /;
type TipoPaso = 'cierre' | 'eval' | 'arranqueD1' | 'anki' | 'log' | 'pretest' | 'lectura' | 'quiz' | 'apex' | 'otro';
function tipoPaso(que: string): TipoPaso {
  const q = sinHora(que);
  if (q.startsWith('TEST DE CIERRE')) return 'cierre';
  if (q.startsWith('EVAL ANCLADA')) return 'eval';
  if (q.startsWith('ARRANQUE (D1')) return 'arranqueD1';
  if (q.startsWith('Anki ')) return 'anki';
  if (q.startsWith('Log de la eval')) return 'log';
  if (q.startsWith('PRE-TEST')) return 'pretest';
  if (q.startsWith('LECTURA DIRIGIDA')) return 'lectura';
  if (q.includes('Q comentadas')) return 'quiz';
  if (q.includes('APEX en ')) return 'apex';
  return 'otro';
}
interface PasoOrig { p: GuiaPaso; a: number | null; b: number | null }
/**
 * Recalcula la hora de cada paso desde `ini` (los pasos nuevos o acortados mueven a los siguientes) y lleva las horas que el texto de un paso
 * cita de SU propio tramo («a las 16:05 paras») a su tramo nuevo. Los pasos sin hora previa (los nuevos) no se tocan por dentro.
 */
function rehorar(pasos: PasoOrig[], ini: string): GuiaPaso[] {
  let t = aMinutos(ini);
  return pasos.map(({ p, a, b }) => {
    const na = t; t += p.min; const nb = t;
    const mover = (s: string): string => (a == null || b == null || (a === na && b === nb) ? s : s.replace(/\b(\d{2}):(\d{2})\b/g, (x: string, h: string, m: string) => {
      const v = Number(h) * 60 + Number(m);
      return v === b ? hhmm(nb) : v === a ? hhmm(na) : x;
    }));
    return { ...p, que: `${hhmm(na)}–${hhmm(nb)} · ${mover(sinHora(p.que))}`, como: mover(p.como) };
  });
}
const fichasRavi = (a: MirMetodoAsig): string => `fichas relacionales de Ravi (Drive · ${M.raviCarpeta} › ${a.ravi.join(' + ')}: imágenes «concepto → concepto»; si la carpeta no abre o está vacía, sigue solo con tu hoja)`;
/** Repaso relacional ANTES de empezar la asignatura (1.ª de las 2 pasadas por vuelta) + reactivar su parte del mazo de Ravi. */
function pasoRelAntes(a: MirMetodoAsig, min: number): GuiaPaso {
  const leer = a.ravi.length
    ? `Lee las ${fichasRavi(a)} y, en la nota madre de ${a.asignatura} (sección «${M.seccionNota}»), las flechas que ya apuntan aquí desde otras asignaturas`
    : `En la carpeta compartida de relacionales de Ravi no hay ${a.asignatura}: lee en su nota madre (sección «${M.seccionNota}») las flechas que apuntaste hacia ${a.asignatura} desde las asignaturas anteriores (si aún no hay ninguna, recorre solo los títulos del capítulo de hoy)`;
  const segunda = a.dIni === a.dFin ? 'la 2.ª pasada es hoy, al final de la franja' : `la 2.ª pasada es el D${a.dFin}`;
  return {
    min,
    que: `REPASO RELACIONAL · ANTES de empezar ${a.asignatura} (1.ª de las 2 pasadas de la vuelta) + reactivar el mazo Ravi de ${a.asignatura}`,
    como: `${leer}. Es un vistazo, no estudio: solo deja listos los ganchos entre asignaturas (${segunda}). Último minuto en Anki: Navegador → tarjetas de ${a.asignatura} del mazo «${M.mazoBase}» → Reactivar (Ctrl+J); entran a ≤${M.nuevasBase1V} nuevas/día, mezcladas con lo ya reactivado (si el mazo no trae ${a.asignatura}, sigue).`,
    enlace: a.ravi.length ? { t: `Drive · ${M.raviCarpeta}`, url: M.raviBusca } : { t: `Nota madre · ${a.asignatura}`, url: a.nota },
  };
}
/** Repaso relacional AL TERMINAR la asignatura (2.ª pasada): las flechas nuevas salen de los fallos del bloque y NO van a Anki. */
function pasoRelFin(a: MirMetodoAsig, min: number): GuiaPaso {
  return {
    min,
    que: `REPASO RELACIONAL · AL TERMINAR ${a.asignatura} (2.ª pasada de la vuelta) · ≥2 flechas «concepto → concepto» nuevas`,
    como: `${a.ravi.length ? `Repasa otra vez las ${fichasRavi(a)}. ` : ''}Escribe en la nota madre de ${a.asignatura} (sección «${M.seccionNota}») ≥2 relaciones sacadas de tus fallos ${a.dIni === a.dFin ? `de hoy (D${a.dIni})` : `del bloque D${a.dIni}-D${a.dFin}`}, en formato «concepto (${a.asignatura}) → concepto (otra asignatura)», y copia cada línea en la nota de la otra asignatura (así la verás antes de empezarla). No van a Anki: Ravi mantiene relacionales y tarjetas sin un solo dato repetido. Próxima pasada: 2.ª vuelta.`,
    enlace: { t: `Nota madre · ${a.asignatura}`, url: a.nota },
  };
}
const ANKI_DOS_MAZOS = (): Pick<GuiaPaso, 'que' | 'como'> => ({
  que: `Anki · ① ${M.mazoPersonal} (tus fallos, todas las asignaturas mezcladas) → ② mazo Ravi «${M.mazoBase}» (solo lo ya reactivado)`,
  como: `FSRS · solo Good/Again · orden aleatorio, nunca por asignatura (Ravi: el examen no viene por bloques) · tu mazo de fallos primero y a cero; después el de Ravi hasta que acabe el paso: Anki nunca le quita tiempo a las preguntas · si el de Ravi pasa de ${M.umbralVencidas} vencidas dos días seguidos, sus nuevas a 0 esa semana · sin repasos: revisa las tarjetas de ayer.`,
});
const CRITERIO_APEX = 'Criterio Ravi: solo fallos de hoy (pre-test · quiz · eval) y detalles discriminativos de nivel 3-4/5; nunca el manual ni lo que acertaste con seguridad · formato pregunta → respuesta breve (el dato o la regla, sin adornos) · si el dato ya está en el mazo de Ravi, no lo dupliques: reactiva o marca esa tarjeta';
const ENVIO_APEX = (deck: string): string => `envío: ⚡ APEX 1-TAP (Ctrl+Shift+A) → n8n → tarjeta en ${deck} + nota en 03_MIR/…/APEX_creados cuando el redeploy del parser esté verificado; hasta entonces, directamente en Anki (README §5, regla v3b)`;

/**
 * Mete el método RaviMedTest en la guía de un día del plan (D1-D76) sin cambiar la franja ni los 60′: reescribe los pasos Anki y APEX, exprime el
 * quiz, añade el repaso relacional ANTES (día de inicio de la asignatura, salvo D1: no hay nada que repasar todavía) y AL TERMINAR (último día;
 * Bioética dura 1 día → 2′ + 2′) quitando esos minutos del APEX, y en D1 importa el mazo de Ravi suspendido. Si la guía no tiene los pasos
 * esperados la devuelve tal cual (gen_mir_guia.js --check exige el método en todos los días).
 */
export function metodoRavi(g: GuiaBloque, dia: DiaMIR): GuiaBloque {
  const blq = mirBloques().find((b) => dia.d >= b.dIni && dia.d <= b.dFin);
  const a = blq ? M.asignaturas[blq.num] : undefined;
  const fr = partesFranja(g.franja);
  if (!blq || !a || !fr) return g;
  const orig = g.pasos.map((p) => {
    const m = PREF.exec(p.que);
    return { p, a: m ? Number(m[1]) * 60 + Number(m[2]) : null, b: m ? Number(m[3]) * 60 + Number(m[4]) : null, t: tipoPaso(p.que) };
  });
  const apex = orig.find((x) => x.t === 'apex');
  if (!apex || !orig.some((x) => x.t === 'pretest')) return g;
  const esIni = dia.d === blq.dIni && dia.d > 1;
  const esFin = dia.d === blq.dFin;
  const rel = esIni && esFin ? M.relMin1dia : M.relMin;
  const apexMin = apex.p.min - (esIni ? rel : 0) - (esFin ? rel : 0);
  const nApex = Math.min(4, Math.floor(apexMin / 2));
  const deck = (sinHora(apex.p.que).split('APEX en ')[1] ?? M.mazoPersonal).trim();
  const out: PasoOrig[] = [];
  for (const x of orig) {
    let p: GuiaPaso = x.p;
    if (x.t === 'pretest' && esIni) out.push({ p: pasoRelAntes(a, rel), a: null, b: null });
    if (x.t === 'anki') p = { ...p, ...ANKI_DOS_MAZOS() };
    if (x.t === 'arranqueD1') p = {
      ...p,
      que: `${sinHora(p.que)} + importar el mazo Ravi «${M.mazoBase}» TODO SUSPENDIDO y reactivar ${a.asignatura}`,
      como: `Preset FSRS de ${M.mazoPersonal} (retention 0,85; README §5) con orden de repaso aleatorio · importa el .apkg (Drive → «${M.mazoBase}»; la descarga la haces tú en el PC) → Navegador → todo ese mazo → Suspender (Ctrl+J) → reactiva solo ${a.asignatura} · preset propio para él: ${M.presetBase}, ≤${M.nuevasBase1V} nuevas/día; cada asignatura se reactiva el día que empieza. La estructura del .apkg (subdecks o etiquetas por asignatura) se comprueba al importarlo: si no viene por asignatura, busca por texto. Sin tiempo hoy: impórtalo esta noche. Tarjetas propias todavía no: las crean los APEX del final.`,
      enlace: { t: `Drive · ${M.mazoBase}`, url: M.mazoBaseBusca },
    };
    if (x.t === 'quiz') p = { ...p, como: `${p.como} · Exprime cada fallo: lee también por qué es falsa cada opción incorrecta (Ravi trata cada pregunta como otro manual) y apunta en el Shopping List solo los fallos tontos y los detalles de nivel 3-4/5 para los APEX.` };
    if (x.t === 'apex') p = {
      ...p, min: apexMin,
      que: sinHora(p.que).replace(/≤\d+ APEX/, `≤${nApex} APEX`),
      como: `${CRITERIO_APEX} · ${p.como.replace(/ · creados directamente en Anki\.?$/, '').replace(/\.$/, '')} · ${ENVIO_APEX(deck)}.`,
    };
    out.push({ p, a: x.a, b: x.b });
  }
  if (esFin) out.push({ p: pasoRelFin(a, rel), a: null, b: null });
  const relTxt = [esIni && 'repaso relacional ANTES + mazo Ravi reactivado', esFin && '≥2 flechas relacionales AL TERMINAR', dia.d === 1 && 'mazo Ravi importado y suspendido'].filter(Boolean).join(' + ');
  const recursos: GuiaRecurso[] = [...g.recursos];
  if (esIni || esFin) recursos.push({ t: `◆ Obsidian · nota madre de ${a.asignatura} (sección «${M.seccionNota}»)`, url: a.nota });
  if ((esIni || esFin) && a.ravi.length) recursos.push({ t: `Drive · ${M.raviCarpeta} de Ravi › ${a.ravi.join(' + ')}`, url: M.raviBusca });
  if (esIni || dia.d === 1) recursos.push({ t: `Drive · mazo Ravi «${M.mazoBase}» (.apkg, se importa una vez)`, url: M.mazoBaseBusca });
  return {
    ...g,
    pasos: rehorar(out, fr.ini),
    recursos,
    hecho: g.hecho.replace(/≤\d+ APEX/, `≤${nApex} APEX`).replace(/\.$/, '') + (relTxt ? ` + ${relTxt}.` : '.'),
  };
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

/**
 * v6.03b: D77 = mini-MIR con la técnica de simulacro de Ravi adaptada a 40Q (DATA/MIR/METODO_RAVIMEDTEST.md §6): 1.ª y única pasada a ≈70 s/Q con
 * el reloj cada 10 preguntas, revisión FORMAL de 4′ (nunca se cambia una respuesta por contenido) y plantilla + neto. Tope de examen = 47 + 4 = 51′
 * (40 × 77 s); los 60′ y la franja no cambian.
 */
function guiaMiniMIR(dia: DiaMIR, ini: string): GuiaBloque {
  const PASADA = 47; const FORMAL = 4; const t0 = aMinutos(ini);
  const hito = (q: number): string => `Q${q} ≤ ${hhmm(t0 + Math.round((PASADA * q) / 40))}`;
  return {
    franja: franjaDe(ini, 60), plan: 'mir', titulo: `MIR D${dia.d} · mini-MIR 40Q mixto (hito) · técnica de simulacro`, totalMin: 60,
    pasos: conHoras([
      {
        min: PASADA,
        que: `mini-MIR 40Q mixtas cronometradas de las 14 asignaturas del plan · pasada única (objetivo ≈70 s/Q; tope ${PASADA + FORMAL}′ con la revisión ≈ 40 × ${MIR_SEG_POR_Q} s)`,
        como: `Técnica de simulacro de Ravi adaptada a 40Q: mira el reloj cada 10 preguntas (${[10, 20, 30, 40].map(hito).join(' · ')}); si vas tarde, recupera en las siguientes, no al final · las 10 primeras con atención extra: los nervios del arranque dan los fallos tontos · preguntas con imagen: resuélvelas por el texto y usa la imagen solo para confirmar; si una te atasca, pásala al final de la pasada · una sola decisión por pregunta: con 2 opciones descartadas, marca (con −1/3, arriesgar entre 2 tiene esperanza positiva); si no descartas 2, en blanco · preguntas: lista «Pool oficial · mini-MIR mixto» de la app (mezcla determinista por fecha); si no llega a 40, cuadernillos examenesmir · sin corregir todavía.`,
        enlace: { t: 'Cuadernillos MIR (respaldo)', url: EXAMENESMIR },
      },
      { min: FORMAL, que: 'REVISIÓN FORMAL de la plantilla, de la 1 a la 40', como: '¿Cada respuesta que pasaste a la app es la que elegiste? ¿Leíste bien los enunciados en negativo (FALSA · EXCEPTO · INCORRECTA)? Ravi cuenta que el día del MIR falló 4 preguntas por forma (marcó la verdadera cuando pedían la falsa) y que en simulacro la mayoría de fallos son de forma: aquí NUNCA cambias una respuesta por dudar del contenido, solo corriges la forma (si cambias algo, anótalo en «cambiadas»).' },
      { min: 9, que: 'Plantilla + neto (A − F/3) al log (kind miniMIR)', como: 'Solo la plantilla, el neto y la táctica −1/3 (blancos acertables · fallos entre dos · cambiadas): la corrección es mañana (D78). Mínimo on-track del hito: 50 % neto. Este neto se compara solo con tus propios cierres y mini-MIR (mismo instrumento): Ravi no compara netas entre academias ni entre simulacros distintos.' },
    ], ini),
    recursos: [{ t: 'Cuadernillos oficiales MIR (examenesmir)', url: EXAMENESMIR }, ...vid('simulacro')],
    hecho: `40Q respondidas en ≤${PASADA + FORMAL}′ con la revisión formal hecha + neto y táctica −1/3 registrados en la app (kind miniMIR).`,
    planB: 'Sin tiempo para 51′: 25Q (29′ de pasada + 3′ de revisión formal) y se registra el neto de 25.',
  };
}
/** v6.03b: D78 = corrección en el orden de Ravi (falladas → en blanco → acertadas con duda) + tarjetas solo de fallos/nivel 3-4/5 + tabla de neto. */
function guiaCorreccion(dia: DiaMIR, ini: string): GuiaBloque {
  return {
    franja: franjaDe(ini, 60), plan: 'mir', titulo: `MIR D${dia.d} · corrección del mini-MIR (orden de Ravi) + tabla de neto`, totalMin: 60,
    pasos: conHoras([
      { min: 25, que: 'FALLADAS del mini-MIR · corrección Whole-Page exprimiendo cada pregunta', como: 'Por cada fallo: abre su capítulo ProMIR, lee el apartado entero, escribe la regla que lo habría resuelto Y por qué es falsa cada opción incorrecta (el distractor de hoy es la pregunta de mañana) · brecha knowledge / transfer / proceso · 🇪🇸 delta si aplica · los fallos de forma (enunciado mal leído, respuesta mal pasada) dan una regla de examen, no una tarjeta.', enlace: { t: 'ProMIR', url: PROMIR } },
      { min: 10, que: 'EN BLANCO y ACERTADAS CON DUDA', como: 'Cada blanco: ¿había 2 opciones descartables? Si sí, era arriesgable → cuéntalo en «blancos acertables» (la táctica −1/3 lo convierte en consejo por asignatura). Cada acierto dudoso: ¿lógica o suerte? Un acierto por suerte se corrige como un fallo (Ravi exprime también las preguntas que acierta).' },
      { min: 10, que: '≤8 APEX + flechas relacionales', como: `Tarjetas SOLO de fallos tontos y de detalles discriminativos de nivel 3-4/5, formato pregunta → respuesta breve, al subdeck ${M.mazoPersonal}::<asignatura> (⚡ APEX 1-TAP · Ctrl+Shift+A; directo en Anki mientras el redeploy de n8n no esté verificado, README §5) · las conexiones entre asignaturas que descubras van como flecha «concepto → concepto» a la nota madre de las dos asignaturas (sección «${M.seccionNota}»), no a Anki.` },
      { min: 15, que: 'Tabla de neto por asignatura (= baseline honesto) + los 3 errores de Ravi', como: 'Asignaturas <55 % → anclas D-7 del banqueo (mantenimiento desde el día siguiente). Contrasta la tabla con los 3 errores que Ravi reconoce de su propia preparación: 1.ª vuelta floja (¿qué asignatura cerró con pocas preguntas?), estudio pasivo (¿qué días leíste sin testear?), repasar solo lo cómodo (¿tu peor asignatura es la que menos Anki y test tuvo?) → 1 línea de ajuste por error en el log.' },
    ], ini),
    recursos: [{ t: 'ProMIR', url: PROMIR }, ...vid('percentil100')],
    hecho: 'Fallos, blancos y aciertos dudosos corregidos con su regla + ≤8 APEX + tabla de neto guardada con las 3 líneas de ajuste.',
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
  const asigs = dia.tipo === 'sabado' ? 'MIXTAS de las 14 asignaturas del plan (mini-simulacro)' : dia.tipo === 'viernes' ? `la asignatura PEOR del log (fallback ${dia.asignatura})` : dia.tierC ? `${dia.nQ - dia.tierC.nQ}Q ${dia.asignatura} + ${dia.tierC.nQ}Q TIER C ${dia.tierC.asignatura} › ${dia.tierC.capitulo}` : `15Q ${dia.asignatura} + 10Q interleaving ${dia.asignatura2 ?? 'mixtas'}`;
  // v6.03b: el reloj del bloque de preguntas (técnica de simulacro de Ravi) se escribe con la hora real del turno (`ini`)
  let tPaso = aMinutos(ini);
  const pasos: GuiaPaso[] = fr.map((f) => {
    const [a, b] = f.hora.split('–');
    const min = aMinutos(b ?? '') - aMinutos(a ?? '');
    const t0 = tPaso; tPaso += min;
    if (f.tipo === 'anki') return { min, que: `Anki · ① ${M.mazoPersonal} (tus fallos, todas las asignaturas mezcladas) → ② mazo Ravi «${M.mazoBase}» (las 14 asignaturas del plan ya reactivadas)`, como: `FSRS · solo Good/Again · retention 0,85 hasta el Step 1 (→ 0,90 en la fase principal, oct-2027) · orden aleatorio, nunca por asignatura (Ravi) · tu mazo de fallos primero y a cero; el de Ravi después, ≤${M.nuevasBaseBanqueo} nuevas/día en el banqueo, hasta que acabe el paso (Anki no le quita tiempo a las preguntas) · si el de Ravi pasa de ${M.umbralVencidas} vencidas dos días seguidos, sus nuevas a 0 esa semana.` };
    if (f.tipo === 'quiz') {
      // ≥20Q: pasada a ≈72 s/Q con el reloj cada 10 preguntas y los últimos minutos para la revisión FORMAL (Ravi); <20Q: sin cambios
      const pasada = dia.nQ >= 20 ? Math.min(min - 2, Math.round(dia.nQ * 1.2)) : 0;
      const marcas = pasada ? [...Array.from({ length: Math.floor(dia.nQ / 10) }, (_, i) => (i + 1) * 10), ...(dia.nQ % 10 ? [dia.nQ] : [])] : [];
      const reloj = pasada ? ` · Técnica de simulacro (Ravi): reloj cada 10Q (${marcas.map((q) => `Q${q} ≤ ${hhmm(t0 + Math.round((pasada * q) / dia.nQ))}`).join(' · ')}) y los últimos ${min - pasada}′ para la revisión FORMAL de lo que marcaste (enunciados en negativo, respuesta bien pasada) — nunca cambias una respuesta por dudar del contenido` : '';
      return {
        min, que: `${dia.nQ}Q reales MIR cronometradas · ${asigs}`,
        como: `${MIR_SEG_POR_Q} s/Q (${dia.minQ} min) · en blanco si no descartas 2; con 2 descartadas, marca · preguntas: la lista «Pool oficial» de la app (sin usar) → si faltan, test por asignatura ProMIR o cuadernillos examenesmir${dia.tierC ? ` · las ${dia.tierC.nQ}Q Tier C se registran APARTE con su asignatura (${dia.tierC.asignatura})` : ''}${reloj}.`,
        enlace: dia.tierC ? { t: `ProMIR · ${dia.tierC.capitulo}`, url: capUrl(dia.tierC.capId) } : { t: 'Cuadernillos MIR', url: EXAMENESMIR },
      };
    }
    if (f.tipo === 'log') return { min, que: 'Corrección −1/3 + log', como: `Neto = A − F/3 · orden de Ravi: falladas (Whole-Page Rule: capítulo ProMIR, solo el APARTADO de la pregunta, 2-5′, y por qué es falsa cada opción incorrecta; ${caps.length ? `capítulos medidos de ${dia.asignatura} en los recursos, con su lectura completa y sus secciones de más peso` : 'busca el capítulo por el chip «MIR AAAA-AAAA, Pnnn»'}) → en blanco (¿había 2 descartables? → «blancos acertables») → acertadas con duda (¿lógica o suerte?) · tarjeta solo de fallos tontos o de nivel 3-4/5 · registra en la app (kind mantenimiento) con la brecha knowledge / transfer / proceso · 🇪🇸 delta.` };
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
