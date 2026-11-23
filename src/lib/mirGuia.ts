/**
 * mirGuia.ts — GUÍA «qué · cuánto · cómo» del bloque MIR (1 h/día, DJ-4) en el formato común `GuiaBloque` (src/lib/guia.ts).
 * Pedido de Joseph (18-oct-2026): «QUÉ leer, CUÁNTO leer, CÓMO leer — no puede estar al azar … que todo esté estructurado y definido».
 *
 *  · D1-D76 (v6.08: lun 16-nov-2026 → jue 4-mar-2027; v6.07: lun 9-nov → jue 25-feb; v6.06: lun 2-nov → jue 18-feb; v6.05: lun 26-oct → jue 11-feb; v6.03: mié 21-oct → lun 8-feb; v6.02c: solo D1-D10) = MEDIDOS: el bloque sale tal cual de
 *    DATA/MIR/guia_lectura_semana1-2.json (nombre histórico; E2: medición real de cada capítulo ProMIR — palabras deduplicadas, secciones,
 *    figuras, clips, preguntas MIR citadas; 10 capítulos el 18-oct + 66 el 20-oct) vía src/lib/mirGuiaDatos.ts (GENERADO por
 *    DATA/MIR/guia_lectura/gen_mir_guia.js). Las preguntas exactas de cada paso: `mirGuiaPreguntas(d)`.
 *  · POR REGLA solo si un día-tema no tuviera medición (desde v6.03 no ocurre con el plan vigente; queda para cambios de plan): misma
 *    estructura de 7 pasos, marcada «sin medir»: anclas fijas de
 *    mirDailyPlan.mirAnclas (D-1 2Q · D-3 1Q · D-7 1Q; la app puede cambiar un slot por un tema 🔥 caliente: manda la app) o TEST DE
 *    CIERRE el 1.er día de bloque · pre-test 5Q (pool oficial de la app → completar con preguntas MIR citadas ≥2015 del capítulo) ·
 *    lectura dirigida 15′ (Orientación MIR 1′ + secciones gap por chips MIR) · quiz: 6Q comentadas (máx. 8; v6.09 · lote 1, antes 8-10) de una lista de 8-10 (resto del pool +
 *    citadas; las que no entran siguen en la cola del capítulo) · ≤4 APEX.
 *    D77 mini-MIR 40Q · D78 corrección + tabla de neto (no leen capítulo: guía propia).
 *  · Banqueo (mirMantenimiento: mantenimiento + extensión + repuestas tras el Step 1 —v6.08 = v6.07 final: 0 (la extensión llega al vie 3-dic-2027, examen lun 6-dic) · v6.07 (borrador): 14, mar 26-oct → vie 12-nov-2027 · v6.06: 9, mar 26-oct → vie 5-nov · v6.05: 4, mar 26 → vie 29-oct · v6.04: 1 · v6.03: 11 · v6.02c: 9—) = POR REGLA desde las sub-franjas
 *    del día (Anki → 25Q/30Q cronometradas → corrección −1/3), desplazadas al inicio de la franja del turno en el SERUMS; v6.03: la corrección
 *    Whole-Page lleva el dato MEDIDO de los capítulos de la asignatura foco (MIR_CAP_MEDIDO: minutos de lectura completa + secciones de más peso).
 *  Regla de oro (guia.ts): Σ pasos = minutos de la franja. Lo comprueba `gen_mir_guia.js --check` en TODOS los días (plan + banqueo).
 * v6.02c (18-oct-2026, E3): nuevo.
 * v6.03 (20-oct-2026): D1 = mié 21-oct; los 76 capítulos del plan medidos (D1-D76 medidos) + dato medido en el banqueo.
 * v6.08 (14-nov-2026): D1 = lun 16-nov (+5 hábiles; mismos 76 capítulos medidos, misma guía: solo cambian las fechas, que salen de mirDailyPlan).
 * v6.07 (8-nov-2026): D1 = lun 9-nov (+5 hábiles; mismos 76 capítulos medidos, misma guía: solo cambian las fechas, que salen de mirDailyPlan).
 * v6.06 (31-oct-2026): D1 = lun 2-nov (+5 hábiles; mismos 76 capítulos medidos, misma guía: solo cambian las fechas, que salen de mirDailyPlan).
 * v6.05 (24-oct-2026): D1 = lun 26-oct (+3 hábiles; mismos 76 capítulos medidos, misma guía: solo cambian las fechas, que salen de mirDailyPlan).
 * v6.10 · tanda C (17-nov-2026 · DECIDIDO CON JOSEPH en el chat MIR): (A) la hora MIR empieza SIEMPRE con preguntas y Anki solo repasa lo ya estudiado
 *   (desde el D+1) · (B) el mazo de Ravi YA está en Anki («1º VUELTA», 851 tarjetas suspendidas): nada se importa y se reactiva POR SUBTEMA al terminarlo
 *   (último minuto del paso APEX; el D1 en su último paso) · (D) el pre-test no muestra la sección de una pregunta antes de contestarla · D1 = el reloj
 *   decidido (sin ARRANQUE de Anki; las 5Q ciegas extra pasan a reserva opcional).
 * v6.10 · base cero (18-nov-2026 · Joseph: «todos estamos partiendo de CERO … las preguntas tienen que ser REALES»): fases de la 1.ª vuelta (mirFaseDe ·
 *   MIR_METODO.fases · DATA/MIR/METODO_BASE_CERO.md): F1 BASE nivel 1 (D1-D32) · F2 CONSOLIDACIÓN niveles 1-2 (D33-D76) · F3 DISCRIMINATIVA nivel 3 (D77-D78 +
 *   banqueo). metodoRavi comenta el quiz al NIVEL de la fase (antes, en los 76 días, «por qué es falsa cada incorrecta + detalles de nivel 3-4/5») y el APEX
 *   lleva el criterio de su fase; la fase va primero en el aviso del día (también D77, D78 y el banqueo). El respaldo de preguntas del banqueo es solo MIR
 *   oficial con su año-número (antes «test por asignatura ProMIR», sin filtro). Mismas franjas, minutos y preguntas.
 * v6.10j (18-nov-2026 · auditoría c14 del Calendar, solo TEXTO): Anki del plan = «Anki FSRS · …» + «solo Good/Again · ② > 60 vencidas 2 días seguidos →
 *   nuevas a 0 esa semana · sin repasos: …» (FSRS y Good/Again quedaban tras el corte de 110); Anki del banqueo abre con «FSRS · solo Good/Again»; banqueo:
 *   el ritmo pasa al «qué» y el «cómo» abre con ««Pool oficial» de la app (sin usar) → si faltan, MIR oficiales con año-número · en blanco si no descartas 2».
 * v6.10l (19-nov-2026 · auditoría c15 del Calendar, solo TEXTO): banqueo = «NQ reales MIR cronometradas …» y el «cómo» abre con la regla del blanco ENTERA
 *   («En blanco si no descartas 2; con 2, marca») y la fuente en corto; D77 = fuente, regla del blanco y «cronometradas» en el «qué» (lo único que se ve en
 *   el evento de las 15:15) y el ritmo + tope delante del reloj; repaso relacional «(1.ª/2.ª de 2 pasadas)» y fichas de Ravi sin «Drive ·» en el texto.
 * v6.10m (19-nov-2026 · ronda c16 del Calendar, solo TEXTO): banqueo = «En blanco si no descartas 2; con 2, marca · MIR oficiales con año-número: «Pool
 *   oficial» de la app sin usar → si faltan, solo MIR oficiales: …» (el año-número vuelve a verse en los 110 del Calendar). En la guía medida
 *   (gen_guia_lectura.js): el ritmo del pre-test de F1 al final del «qué» y el del quiz del D1 y del D2 delante de la cola de mañana.
 * v6.10o (19-nov-2026 · ronda c17 del Calendar, solo TEXTO): banqueo = «En blanco si no descartas 2; con 2, marca · año-número: Pool oficial sin usar → si
 *   faltan, ProMIR/examenesmir (solo MIR oficiales: …)» (el respaldo vuelve a verse en los 110 del Calendar). En la guía medida: quiz del D1 con «tapa las
 *   opciones · Rule-In → Rule-Out» delante del ritmo.
 * v6.10p (19-nov-2026 · ronda c18 del Calendar, solo TEXTO): en la guía medida, el quiz del D2 abre como el del D1 («Tapa las opciones · Rule-In → Rule-Out
 *   · 6Q ≈ 10,7′ (…) · las 2 primeras que no entren abren la eval de mañana (…)»): el par ya no queda partido por el ritmo ni tras el corte del Calendar.
 * v6.10r (19-nov-2026 · chat MIR, hallazgo 9; solo TEXTO del plan B): con ProMIR caído, la eval o el cierre y el pre-test van con SUS MISMAS preguntas de hoy
 *   (por el chat MIR), la lectura en el resumen de Ravi del Drive y el quiz se aplaza con su misma lista; nunca el pool de la asignatura (son los pre-tests,
 *   quizzes y cierres de otros días) ni la nota madre (vacía hasta que se escribe). Días por regla: planBPorRegla; banqueo: «las 10 primeras de las NQ de hoy».
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
import { MIR_GUIA_MEDIDA, MIR_POOL_POR_CAP, MIR_POOL_POR_ASIG, MIR_GUIA_DATOS_META, MIR_CAP_MEDIDO, MIR_METODO, type MirGuiaPreguntas, type MirMetodoAsig, type MirFase } from './mirGuiaDatos';
import { extraDePlan, FECHAS_V6 } from './fechasV6'; // v6.10: domingo de recuperación a hora fija (corrida_s1.extra › mir) · v6.10w: por fecha de plan (extraDePlan)
/** v6.10 · base cero (fix 18-nov): «vie 3-dic-2027» = handoff del banqueo → fase principal MIR (antes «oct-2027» escrito, de la v6.00). */
const _HANDOFF_MIR = MIR_MANT_META.handoff.split(' (')[0];

export type { MirGuiaPreguntas, MirGuiaQ, MirGuiaEvalSlot, MirCapMedido, MirMetodo, MirMetodoAsig, MirFase } from './mirGuiaDatos';
export { MIR_GUIA_DATOS_META, MIR_CAP_MEDIDO, MIR_METODO };

/**
 * v6.10 · base cero (18-nov-2026 · Joseph: «todos estamos partiendo de CERO»): fase de la 1.ª vuelta del día `d` del plan (D1-D78; el banqueo = la última,
 * `banqueo: true`). F1 BASE (nivel 1, D1-D32 = F1 del calendario) · F2 CONSOLIDACIÓN (niveles 1-2, D33-D76) · F3 DISCRIMINATIVA (nivel 3, D77-D78 + banqueo).
 * Datos: DATA/MIR/metodo_ravimedtest.json › fases (síntesis y fuentes: DATA/MIR/METODO_BASE_CERO.md).
 */
export function mirFaseDe(d: number | 'banqueo'): MirFase | undefined {
  const F = MIR_METODO.fases ?? [];
  return d === 'banqueo' ? F.find((f) => f.banqueo) : F.find((f) => d >= f.dDesde && d <= f.dHasta);
}
/** Aviso de la fase (va primero en el aviso de la guía: el Calendar corta el aviso a 240 caracteres). */
const avisoFase = (f: MirFase | undefined): string => (f ? `FASE ${f.n} de la 1.ª vuelta · ${f.nombre} (D${f.dDesde}-D${f.dHasta}${f.banqueo ? ' + banqueo' : ''}) · avance: ${f.avance}.` : '');

const PROMIR = 'https://promir.medicapanamericana.com';
const EXAMENESMIR = 'https://www.examenesmir.com/examenes-mir';
const FRANJA_BASE = '15:15';
const hhmm = (m: number): string => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
/** 'AAAA-MM-DD' → «lun 8-mar» (v6.10h · c12: el D77 nombra el día de su corrección; «mañana» de un viernes era el sábado). */
export const fechaCorta = (iso: string): string => {
  const d = new Date(`${iso}T12:00:00Z`);
  return `${['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'][d.getUTCDay()]} ${d.getUTCDate()}-${['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][d.getUTCMonth()]}`;
};
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
  if (q.startsWith('LECTURA DIRIGIDA') || q.startsWith('LECTURA DE BASE')) return 'lectura'; // v6.10 · base cero: F1 = LECTURA DE BASE
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
// v6.10l (auditoría c15): la carpeta sin «Drive ·» delante (el botón del paso ya dice Drive): el Calendar quita los tramos con «Drive» y dejaba el «cómo»
//   empezando en «TARJETAS RELACIONALES › CARDIOLOGÍA: imágenes …», sin el verbo
// remate v6.10l (revisión adversarial · visibilidad): la RUTA delante («TARJETAS RELACIONALES › CARDIOLOGÍA (carpeta compartida de Ravi): lee sus fichas …»),
//   dentro de los 110 del Calendar (con «Lee las fichas relacionales de Ravi (imágenes …» delante, la ruta quedaba tras el corte en los 16 repasos relacionales)
const rutaRavi = (a: MirMetodoAsig): string => `${M.raviCarpeta} › ${a.ravi.join(' + ')} (carpeta compartida de Ravi)`;
const fichasRavi = (a: MirMetodoAsig, verbo: string): string => `${rutaRavi(a)}: ${verbo} sus fichas «concepto → concepto» (si no abre o está vacía, sigue solo con tu hoja)`;
/** Repaso relacional ANTES de empezar la asignatura (1.ª de las 2 pasadas por vuelta) + reactivar su parte del mazo de Ravi. */
function pasoRelAntes(a: MirMetodoAsig, min: number): GuiaPaso {
  const leer = a.ravi.length
    ? `${fichasRavi(a, 'lee')} y, en la nota madre de ${a.asignatura} (sección «${M.seccionNota}»), las flechas que ya apuntan aquí desde otras asignaturas`
    : `En la carpeta compartida de relacionales de Ravi no hay ${a.asignatura}: lee en su nota madre (sección «${M.seccionNota}») las flechas que apuntaste hacia ${a.asignatura} desde las asignaturas anteriores (si aún no hay ninguna, recorre solo los títulos del capítulo de hoy)`;
  const segunda = a.dIni === a.dFin ? 'la 2.ª pasada es hoy, al final de la franja' : `la 2.ª pasada es el D${a.dFin}`;
  return {
    min,
    // v6.10 · tanda C (decidido con Joseph, 17-nov): el mazo de Ravi ya NO se reactiva por asignatura al empezarla: cada subtema, al terminarlo (paso APEX)
    // v6.10l (auditoría c15, vetadas #31): «(1.ª de 2 pasadas)» en corto: los días de 5 pasos de 2027 pasaban del máximo del evento del Calendar y el
    //   constructor recortaba el «cómo» del quiz («77 s/Q + 30 s …»)
    que: `REPASO RELACIONAL · ANTES de empezar ${a.asignatura} (1.ª de 2 pasadas)`,
    como: `${leer}. Es un vistazo, no estudio: solo deja listos los ganchos entre asignaturas (${segunda}). Las tarjetas de Ravi de ${a.asignatura} se reactivan por subtema, al terminar cada día (no ahora).`,
    enlace: a.ravi.length ? { t: `Drive · ${M.raviCarpeta}`, url: M.raviBusca } : { t: `Nota madre · ${a.asignatura}`, url: a.nota },
  };
}
/** Repaso relacional AL TERMINAR la asignatura (2.ª pasada): las flechas nuevas salen de los fallos del bloque y NO van a Anki. */
function pasoRelFin(a: MirMetodoAsig, min: number): GuiaPaso {
  return {
    min,
    // v6.10l: en corto (ver pasoRelAntes); el formato «concepto → concepto» lo dice el «cómo»
    que: `REPASO RELACIONAL · AL TERMINAR ${a.asignatura} (2.ª de 2 pasadas) · ≥2 flechas nuevas`,
    como: `${a.ravi.length ? `${fichasRavi(a, 'repasa otra vez')}. ` : ''}Escribe en la nota madre de ${a.asignatura} (sección «${M.seccionNota}») ≥2 relaciones sacadas de tus fallos ${a.dIni === a.dFin ? `de hoy (D${a.dIni})` : `del bloque D${a.dIni}-D${a.dFin}`}, en formato «concepto (${a.asignatura}) → concepto (otra asignatura)», y copia cada línea en la nota de la otra asignatura (así la verás antes de empezarla). No van a Anki: Ravi mantiene relacionales y tarjetas sin un solo dato repetido. Próxima pasada: 2.ª vuelta.`,
    enlace: { t: `Nota madre · ${a.asignatura}`, url: a.nota },
  };
}
// El Calendar corta el «qué» a 150 (con la hora del paso delante) y el «cómo» a 110: el orden de los mazos, que del de Ravi solo salen los subtemas ya
//   reactivados y el orden aleatorio van en el «qué»; la regla de las vencidas y la salida «sin repasos» abren el «cómo».
// v6.10j (auditoría c14, diffs #9): «FSRS» va en el «qué» («Anki FSRS ·») y «solo Good/Again» abre el «cómo», con la regla de las vencidas en corto: los
//   110 caracteres del Calendar dejan ver las dos cosas además de las reglas que ya se veían (antes «FSRS · solo Good/Again» quedaba detrás del corte)
const ANKI_DOS_MAZOS = (): Pick<GuiaPaso, 'que' | 'como'> => ({
  que: `Anki FSRS · ① ${M.mazoPersonal} (tus fallos) a cero → ② Ravi «${M.mazoBase}» (solo subtemas ya reactivados) · orden aleatorio, nunca por asignatura`,
  como: `solo Good/Again · ② > ${M.umbralVencidas} vencidas 2 días seguidos → nuevas a 0 esa semana · sin repasos: tu última sesión MIR · ② hasta el final del paso · del mazo de Ravi solo salen los subtemas que ya terminaste (los reactivas en su último minuto; el resto sigue suspendido) · tus fallos de todas las asignaturas, mezclados (Ravi: el examen no viene por bloques) · Anki nunca le quita tiempo a las preguntas.`,
});
/** v6.10 · base cero: el criterio de tarjeta es el de la FASE del día (fase 1-2: solo fallos; los detalles discriminativos de nivel 3-4/5 son de la fase 3). */
const criterioApex = (f: MirFase | undefined): string => f?.apex ?? 'Criterio Ravi: solo fallos de hoy (pre-test · quiz · eval) y detalles discriminativos de nivel 3-4/5; nunca el manual ni lo que acertaste con seguridad · formato pregunta → respuesta breve (el dato o la regla, sin adornos) · si el dato ya está en el mazo de Ravi, no lo dupliques: reactiva o marca esa tarjeta';
const ENVIO_APEX = (deck: string): string => `envío: ⚡ APEX 1-TAP (Ctrl+Shift+A) → n8n → tarjeta en ${deck} + nota en 03_MIR/…/APEX_creados cuando el redeploy del parser esté verificado; hasta entonces, directamente en Anki (README §5, regla v3b)`;

/**
 * Mete el método RaviMedTest en la guía de un día del plan (D1-D76) sin cambiar la franja ni los 60′: reescribe los pasos Anki y APEX, exprime el
 * quiz, añade el repaso relacional ANTES (día de inicio de la asignatura, salvo D1: no hay nada que repasar todavía) y AL TERMINAR (último día;
 * Bioética dura 1 día → 2′ + 2′) quitando esos minutos del APEX, (v6.10 · tanda C: ya no importa nada en D1; reactiva por subtema al final). Si la guía no tiene los pasos
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
  // v6.10 · tanda C: el D1 (reloj decidido con Joseph: 16:05-16:12) lleva ≤4 APEX en 7′ (solo de los fallos)
  const nApex = dia.d === 1 ? 4 : Math.min(4, Math.floor(apexMin / 2));
  // v6.10 · tanda C (regla B, decidida con Joseph): las tarjetas de «1º VUELTA» se reactivan POR SUBTEMA al terminarlo; el D1 lo trae en su último paso
  const yaReactiva = orig.some((x) => /[Rr]eactiva/.test(x.p.que) && x.p.que.includes(M.mazoBase));
  const rv = M.raviPorCap[dia.capId];
  const reactivaTxt = yaReactiva ? '' : rv && rv.n === 0
    ? ` · Último minuto: el mazo «${M.mazoBase}» no tiene tarjetas de este subtema (contadas: 0): nada que reactivar`
    : ` · Último minuto: reactiva en Anki las tarjetas de «${M.mazoBase}» de ESTE subtema (${rv ? `${rv.n}: ${rv.nota ?? rv.tema}` : `${dia.tema.split(' (')[0]}: búscalas por texto`}) — Navegador → «${M.mazoBase}» → Reactivar (Ctrl+J); entran en el repaso desde la próxima sesión, nunca antes de estudiarlo`;
  const deck = (sinHora(apex.p.que).split('APEX en ')[1] ?? M.mazoPersonal).trim();
  const fase = mirFaseDe(dia.d); // v6.10 · base cero
  const out: PasoOrig[] = [];
  for (const x of orig) {
    let p: GuiaPaso = x.p;
    if (x.t === 'pretest' && esIni) out.push({ p: pasoRelAntes(a, rel), a: null, b: null });
    if (x.t === 'anki') p = { ...p, ...ANKI_DOS_MAZOS() };
    // v6.10 · tanda C: el D1 ya no tiene ARRANQUE de Anki (el mazo de Ravi ya está en Anki y la hora empieza con preguntas); ningún paso importa nada
    // v6.10 · base cero (18-nov-2026): el comentario de cada pregunta sube de NIVEL por fases (Ravi, NLM 18-nov: quien parte de cero empieza por el nivel 1)
    //   — antes, en los 76 días: «Exprime cada fallo: lee también por qué es falsa cada opción incorrecta … y los detalles de nivel 3-4/5 para los APEX»
    //   el nivel va también al final del «qué» (el «cómo» lo corta el Calendar a 110 caracteres y su principio anuncia la eval de mañana)
    if (x.t === 'quiz') p = { ...p, que: fase ? `${p.que} · comentario de ${fase.n === 1 ? 'nivel 1 (literal)' : fase.n === 2 ? 'niveles 1-2 (+ permutaciones)' : 'nivel 3 (cara B)'}` : p.que, como: `${p.como} · ${fase ? fase.quiz : 'Exprime cada fallo: por qué es falsa cada opción incorrecta'} · al Shopping List solo lo que irá a APEX (${fase && fase.n === 1 ? 'los conceptos de nivel 1 que fallaste' : 'los fallos y los fallos tontos'}).` };
    if (x.t === 'apex') p = {
      ...p, min: apexMin,
      // v6.10 · tanda C: la reactivación del subtema también en el «qué» (el volcado del Calendar corta el «cómo» en 110 caracteres)
      que: `${sinHora(p.que).replace(/≤\d+ APEX/, `≤${nApex} APEX`)}${yaReactiva ? '' : rv && rv.n === 0 ? ` · «${M.mazoBase}»: 0 tarjetas de este subtema` : ` + reactivar en «${M.mazoBase}» ${rv ? `las ${rv.n} tarjetas` : 'las tarjetas'} de este subtema`}`,
      como: `${criterioApex(fase)} · ${p.como.replace(/ · creados directamente en Anki\.?$/, '').replace(/\.$/, '')} · ${ENVIO_APEX(deck)}${reactivaTxt}.`,
    };
    out.push({ p, a: x.a, b: x.b });
  }
  if (esFin) out.push({ p: pasoRelFin(a, rel), a: null, b: null });
  const relTxt = [esIni && 'repaso relacional ANTES', esFin && '≥2 flechas relacionales AL TERMINAR', !yaReactiva && !(rv && rv.n === 0) && 'tarjetas de Ravi del subtema reactivadas'].filter(Boolean).join(' + ');
  const recursos: GuiaRecurso[] = [...g.recursos];
  if (esIni || esFin) recursos.push({ t: `◆ Obsidian · nota madre de ${a.asignatura} (sección «${M.seccionNota}»)`, url: a.nota });
  if ((esIni || esFin) && a.ravi.length) recursos.push({ t: `Drive · ${M.raviCarpeta} de Ravi › ${a.ravi.join(' + ')}`, url: M.raviBusca });
  // v6.10 · tanda C: el mazo de Ravi ya está en Anki («1º VUELTA»): sin enlace de importación
  return {
    ...g,
    pasos: rehorar(out, fr.ini),
    recursos,
    hecho: g.hecho.replace(/≤\d+ APEX/, `≤${nApex} APEX`).replace(/\.$/, '') + (relTxt ? ` + ${relTxt}.` : '.'),
    // v6.10 · base cero: la fase va PRIMERO en el aviso (el Calendar corta el aviso a 240 caracteres)
    aviso: [avisoFase(fase), g.aviso].filter(Boolean).join(' · ') || undefined,
  };
}

/** v6.10r (19-nov-2026 · chat MIR, hallazgo 9): plan B de un día por regla con ProMIR caído = las MISMAS preguntas de hoy (eval o cierre + pre-test) por el
 *  chat MIR, lectura en el resumen de Ravi y el quiz aplazado con su misma lista; nunca el pool de la asignatura ni la nota madre (texto de planBMir). */
function planBPorRegla(dia: DiaMIR, cierre: boolean): string {
  const a = mirAnclas(dia.d);
  const nEv = cierre ? 0 : (a.d1 ? 2 : 0) + (a.d3 ? 1 : 0) + (a.d7 ? 1 : 0);
  const previas = cierre ? 'el test de cierre con sus 10Q de hoy y ' : nEv ? `la eval anclada con sus ${nEv}Q de hoy y ` : '';
  const modo = cierre ? 'el test de cierre de hoy (sus 10Q, 15′).' : nEv ? `Anki a cero + las ${nEv}Q de la eval de hoy (15′).` : 'Anki a cero + el pre-test de hoy (15′).';
  return `Si ProMIR no abre: ${previas}el pre-test con SUS MISMAS 5Q (las de Estudio › 🇪🇸 España › Cola de hoy), por el chat MIR · lectura: el resumen de Ravi del tema (rabi_94, Drive) · el quiz se aplaza hasta que ProMIR vuelva, con su misma lista (no lo sustituyas por otras preguntas del pool oficial: son los pre-tests, quizzes y cierres de otros días). Día roto (modo mínimo): ${modo}`;
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
      que: `TEST DE CIERRE · 10Q reales MIR cronometradas de ${cierre.asignatura} (bloque D${cierre.dIni}-D${cierre.dFin} cerrado)`,
      como: `Fuente: pool oficial de la app sin usar (${poolAsig(cierre.num)} preguntas de ${cierre.asignatura} en el pool, menos las ya usadas) → si faltan, cuadernillos oficiales examenesmir · Cronómetro ${mirMinutos(10)} min (${MIR_SEG_POR_Q} s/Q), en blanco si no descartas 2 · neto = A − F/3 → ≥70 % consolidada · 55-69 % intermedia · <55 % entra en las anclas D-7 · 2′ para registrar (kind cierre). Hoy no hay eval anclada ni Anki en esta franja (los sustituye el cierre).`,
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
      { min: 5, que: `Anki ${deck}`, como: 'FSRS · solo Good/Again · deuda a cero; si no hay repasos, revisa las tarjetas de tu última sesión MIR.' },
      // v6.10h · c12: «aciertos/N» al «qué» para que el destino del slot fallado quepa en los 110 caracteres del «cómo» que copia el Calendar
      { min: 3, que: `Log de la eval en la app · aciertos/${nQ || 4}`, como: 'brecha knowledge / transfer / proceso · fallo D-7 → cola D+14 · slot ✗ → tema caliente en la próxima sesión.' },
    );
  }
  const f1 = mirFaseDe(dia.d)?.n === 1; // v6.10 · base cero: fase 1 = pre-test de línea base + LECTURA DE BASE
  pasos.push(
    {
      min: 8,
      que: `PRE-TEST 5Q ciegas del capítulo nuevo (${pre >= 5 ? '5 del pool oficial de la app' : pre > 0 ? `${pre} del pool oficial de la app + ${5 - pre} citadas ProMIR ≥2015` : '5 preguntas MIR citadas ≥2015 del capítulo (el pool de la app no tiene de este capítulo)'})${f1 ? ' · línea base, no nota' : ''}`,
      como: `${f1 ? 'Base cero: contesta las 5 aunque adivines (si no sabes, marca A): es la línea base, no la nota · sin leer nada' : 'Sin leer nada · en blanco si no descartas 2'} · ${MIR_SEG_POR_Q} s/Q · registra en la app (kind pretest) · cada fallo marca la sección que lees con más atención (no se salta ninguna): la sección de cada pregunta (donde está su chip MIR) la miras DESPUÉS de contestar las 5 (antes no: con la lista de lectura delataría la clave).`,
      enlace: { t: 'Capítulo ProMIR', url },
    },
    {
      min: 15,
      que: `${f1 ? 'LECTURA DE BASE' : 'LECTURA DIRIGIDA'} 15′ · Orientación MIR (1′) + secciones con más preguntas MIR citadas, en orden (14′) — ${dia.tema} · SIN MEDIR: secciones y minutos se eligen en el momento`,
      como: 'En el orden del capítulo, las secciones con más chips «MIR ≥2015», cada una entera (Whole Page Rule) y sin saltar ninguna por acertar el pre-test (1.ª vuelta: no se recorta el temario); las de las preguntas FALLADAS, con más atención · ritmo de referencia 180 palabras/min (una sección de ~500 palabras ≈ 3′) · a las 15:53 paras: lo que no entra queda para la 2.ª vuelta (fase principal MIR, tras el handoff del ' + _HANDOFF_MIR + ') · vídeos largos (Masterclass/Videoclase/Imperdible) NO entran; solo clips ≤12 min.',
      enlace: { t: `ProMIR · ${dia.tema}`, url },
    },
    {
      min: 12,
      que: `6Q comentadas (máx. 8) · ${quizPool > 0 ? `${quizPool} del pool oficial que no entraron en el pre-test + ` : ''}preguntas MIR citadas en las secciones que acabas de leer`,
      como: `Rule-In → Rule-Out · tapa las opciones y contesta antes de verlas · ${MIR_SEG_POR_Q} s/Q + 30 s de comentario (≈${MIR_SEG_POR_Q + 30} s/Q: 6Q ≈ 10,7′; la 7.ª y la 8.ª solo si vas rápido) · registra en la app (kind quiz): <60 % = tema caliente en la próxima sesión · a las 16:05 paras donde estés: las que no entren siguen en la cola del capítulo para la 2.ª vuelta y como reserva de su EVAL anclada D-3/D-7. Pool oficial de la app para este capítulo: ${pool}Q.`,
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
    hecho: `${cierre ? 'Test de cierre 10Q registrado' : 'Eval anclada registrada'} + pre-test 5Q registrado + lectura en orden, sin saltar secciones + ≥6Q del quiz registradas + ≤4 APEX creados.`,
    // v6.10r (chat MIR, hallazgo 9): las MISMAS preguntas de hoy, como la guía medida (gen_guia_lectura.planBMir); antes «pre-test y quiz con el pool oficial
    //   de la app» (el pool de la asignatura son los pre-tests, quizzes y cierres de otros días) y la nota madre (vacía hasta que se escribe)
    planB: planBPorRegla(dia, !!cierre),
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
  // v6.10h · c12 (auditoría c11): la corrección es el D78 (el lunes siguiente al viernes del mini-MIR, no «mañana») y la serie de controles del reloj abre el
  //   «cómo» (el Calendar lo corta a 110 y antes se quedaba en «Q30 …»)
  const d78 = mirDiaN(dia.d + 1);
  const correccion = d78 ? `el ${fechaCorta(d78.fecha)} (D${d78.d})` : `en la sesión siguiente (D${dia.d + 1})`;
  return {
    franja: franjaDe(ini, 60), plan: 'mir', titulo: `MIR D${dia.d} · mini-MIR 40Q mixto (hito) · técnica de simulacro`, totalMin: 60,
    pasos: conHoras([
      {
        min: PASADA,
        // v6.10l (auditoría c15, cambios #15): el hito de más peso de la 1.ª vuelta dice en el «qué» (lo único que se ve en el evento de las 15:15 y lo
        //   primero en el de las 15:30) de dónde salen las 40, la regla del blanco y que van con cronómetro, como el TEST DE CIERRE; el ritmo y el tope abren
        //   el «cómo», delante del reloj cada 10Q (antes la fuente y el blanco iban al final del «cómo», detrás del corte de 110)
        que: `mini-MIR 40Q mixtas cronometradas · Fuente: «Pool oficial» de la app (respaldo: cuadernillos examenesmir) · en blanco si no descartas 2`,
        como: `Pasada única a ≈70 s/Q (tope ${PASADA + FORMAL}′ con la revisión) · reloj cada 10Q: ${[10, 20, 30, 40].map(hito).join(' · ')} · si vas tarde, recupera en las siguientes, no al final (técnica de simulacro de Ravi adaptada a 40Q; el tope = 40 × ${MIR_SEG_POR_Q} s, el ritmo del MIR) · las 10 primeras con atención extra: los nervios del arranque dan los fallos tontos · preguntas con imagen: resuélvelas por el texto y usa la imagen solo para confirmar; si una te atasca, pásala al final de la pasada · una sola decisión por pregunta: con 2 opciones descartadas, marca (con −1/3, arriesgar entre 2 tiene esperanza positiva); si no descartas 2, en blanco · preguntas: lista «Pool oficial · mini-MIR mixto» de la app, de las 14 asignaturas del plan (mezcla determinista por fecha); si no llega a 40, cuadernillos oficiales examenesmir · sin corregir todavía.`,
        enlace: { t: 'Cuadernillos MIR (respaldo)', url: EXAMENESMIR },
      },
      { min: FORMAL, que: 'REVISIÓN FORMAL de la plantilla, de la 1 a la 40', como: '¿Cada respuesta que pasaste a la app es la que elegiste? ¿Leíste bien los enunciados en negativo (FALSA · EXCEPTO · INCORRECTA)? Ravi cuenta que el día del MIR falló 4 preguntas por forma (marcó la verdadera cuando pedían la falsa) y que en simulacro la mayoría de fallos son de forma: aquí NUNCA cambias una respuesta por dudar del contenido, solo corriges la forma (si cambias algo, anótalo en «cambiadas»).' },
      { min: 9, que: 'Plantilla + neto (A − F/3) al log (kind miniMIR)', como: `La corrección es ${correccion}: hoy solo la plantilla, el neto y la táctica −1/3 (blancos acertables · fallos entre dos · cambiadas). Mínimo on-track del hito: 50 % neto. Este neto se compara solo con tus propios cierres y mini-MIR (mismo instrumento): Ravi no compara netas entre academias ni entre simulacros distintos.` },
    ], ini),
    recursos: [{ t: 'Cuadernillos oficiales MIR (examenesmir)', url: EXAMENESMIR }, ...vid('simulacro')],
    hecho: `40Q respondidas en ≤${PASADA + FORMAL}′ con la revisión formal hecha + neto y táctica −1/3 registrados en la app (kind miniMIR).`,
    planB: 'Sin tiempo para 51′: 25Q (29′ de pasada + 3′ de revisión formal) y se registra el neto de 25.',
    aviso: avisoFase(mirFaseDe(dia.d)) || undefined, // v6.10 · base cero: el mini-MIR es la PUERTA de la fase 3
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
    aviso: avisoFase(mirFaseDe(dia.d)) || undefined, // v6.10 · base cero
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
    // El Calendar corta el «qué» a 150 (con la hora delante) y el «cómo» a 110, alargado hasta el final de la cláusula de una fecha: los mazos, sus nuevas
    //   y el orden aleatorio en el «qué»; la regla de las vencidas y la retention con la fecha del handoff abren el «cómo».
    // v6.10j (auditoría c14, diffs #9): «FSRS · solo Good/Again» abre el «cómo» (antes iba detrás de la fecha del handoff y el corte lo escondía) y la regla de
    //   las vencidas, en corto como en el plan; el «qué» (136, lleno) no cambia
    if (f.tipo === 'anki') return { min, que: `Anki · ① ${M.mazoPersonal} (tus fallos) a cero → ② Ravi «${M.mazoBase}» (las 14 asignaturas), ≤${M.nuevasBaseBanqueo} nuevas/día · orden aleatorio, nunca por asignatura`, como: `FSRS · solo Good/Again · ② > ${M.umbralVencidas} vencidas 2 días seguidos → nuevas a 0 esa semana · retention 85 % hasta el Step 1 → 90 % tras el handoff del ${_HANDOFF_MIR} (fase principal MIR) · ② hasta que acabe el paso: las 14 asignaturas del plan ya reactivadas (Anki no le quita tiempo a las preguntas) · tus fallos de todas las asignaturas, mezclados (Ravi: el examen no viene por bloques).` };
    if (f.tipo === 'quiz') {
      // ≥20Q: pasada a ≈72 s/Q con el reloj cada 10 preguntas y los últimos minutos para la revisión FORMAL (Ravi); <20Q: sin cambios
      const pasada = dia.nQ >= 20 ? Math.min(min - 2, Math.round(dia.nQ * 1.2)) : 0;
      const marcas = pasada ? [...Array.from({ length: Math.floor(dia.nQ / 10) }, (_, i) => (i + 1) * 10), ...(dia.nQ % 10 ? [dia.nQ] : [])] : [];
      const reloj = pasada ? ` · Técnica de simulacro (Ravi): reloj cada 10Q (${marcas.map((q) => `Q${q} ≤ ${hhmm(t0 + Math.round((pasada * q) / dia.nQ))}`).join(' · ')}) y los últimos ${min - pasada}′ para la revisión FORMAL de lo que marcaste (enunciados en negativo, respuesta bien pasada) — nunca cambias una respuesta por dudar del contenido` : '';
      return {
        // v6.10j (auditoría c14, vetadas #2): el ritmo pasa al «qué» (cabe en los 136 en las 220 sesiones) y el «cómo» abre con la FUENTE de las preguntas
        //   reales y la regla del blanco, en los 110 caracteres del Calendar (antes el corte caía dentro de «la lista «Pool …»)
        // v6.10l (auditoría c15, diffs #39): «cronometradas» vuelve al «qué»: cabe entero en las 35 sesiones con evento en el Calendar (M1-M35, hasta el
        //   vie 30-abr); 6 de mayo en adelante con un Tier C de nombre largo (M39, M61, M111, M183, M207, M213) pasan de 136, pero desde el SERUMS el Calendar
        //   no lleva el banqueo (solo lo invariante) y la app no corta
        min, que: `${dia.nQ}Q reales MIR cronometradas a ${MIR_SEG_POR_Q} s/Q (${dia.minQ} min) · ${asigs}`,
        // v6.10 · base cero («las preguntas tienen que ser REALES»): el respaldo es solo MIR oficial con su año-número (antes «test por asignatura ProMIR», sin filtro)
        // v6.10l (auditoría c15, vetadas #22): la regla del blanco ENTERA abre el «cómo» («en blanco si no descartas 2; con 2, marca»: el corte de 110 la dejaba
        //   en «… descartas 2 …», sin cuándo SÍ marcar) y la fuente, en corto, detrás
        // v6.10m (ronda c16, área MIR · diffs #23): la trazabilidad («MIR oficiales con año-número») va delante de la fuente principal y las dos caben en los
        //   110 del Calendar con la regla del blanco entera (antes el corte dejaba «→ si faltan, solo MIR oficiales …», sin el año-número); el respaldo
        //   («si faltan, solo MIR oficiales: …») sigue entero detrás
        // v6.10o (ronda c17, área MIR · diffs #18): la fuente en corto, CON su respaldo, cabe en los 110 del Calendar detrás de la regla del blanco entera
        //   («año-número: Pool oficial sin usar → si faltan, ProMIR/examenesmir»; el «qué» ya dice «reales MIR»); antes el corte dejaba «… «Pool oficial» de la
        //   app sin usar …», sin qué hacer cuando el pool se agota (25-30Q al día). El detalle de cada fuente, entre paréntesis detrás
        como: `En blanco si no descartas 2; con 2, marca · año-número: Pool oficial sin usar → si faltan, ProMIR/examenesmir (solo MIR oficiales: el «Pool oficial» es el de la app; en ProMIR, las citadas en los capítulos de la asignatura, /pregunta/MIR/AAAA-NNN; en examenesmir, los cuadernillos oficiales)${dia.tierC ? ` · las ${dia.tierC.nQ}Q Tier C se registran APARTE con su asignatura (${dia.tierC.asignatura})` : ''}${reloj}.`,
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
    // v6.10r (chat MIR, hallazgo 9): las 10Q son de HOY (antes «10Q en tiempo muerto», sin decir de dónde: el pool de la asignatura es de otros días)
    planB: `Guardia o día roto: Anki a cero + ${dia.nQ > 10 ? `las 10 primeras de las ${dia.nQ}Q de hoy` : `las ${dia.nQ}Q de hoy`} en tiempo muerto (nunca preguntas de otro día); lo que no se termine se suma al día de plan siguiente (DJ-4).`,
    // v6.10 · base cero: el banqueo es la fase 3 (nivel 3) si el mini-MIR D77 pasó la puerta; si no, sigue en niveles 1-2
    aviso: [avisoFase(mirFaseDe('banqueo')), dia.repuesta ? `Sesión REPUESTA (${dia.repuesta}): la extensión la perdió con los corrimientos v6.01/v6.02/v6.03 y se recoloca tras el examen Step 1 («si se recortó algo, alárgalo»).` : ''].filter(Boolean).join(' · ') || undefined,
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
  // v6.10 (17-nov-2026): hábil EXTRA de fin de semana (v6.10c: sáb 2-ene 07:15-08:15, el D32 · v6.10: dom 29-nov 08:15-09:15, recupera el mar 17): la guía sigue en la hora de PLAN (15:15) y el Home la
  //   mueve a la real (plantillasV6 › bloqueCorrido + moverGuia); el aviso nombra la hora real (fuera de la franja que se mueve)
  // v6.10w (dom 22-nov): por FECHA DE PLAN (extraDePlan): el sáb 2-ene hace el D31 (plan del jue 31-dic, sin día propio) y el dom 3-ene el D32 (el del sáb 2-ene)
  const fx = g ? extraDePlan(iso, 'mir') : null;
  const diaFx = fx ? ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][new Date(fx.real + 'T12:00:00Z').getUTCDay()] : '';
  // v6.11 fase 2: un fin de semana de F1 que hace a hora fija la fila de otra fecha de plan (sáb 5-dic 07:15 = D10, plan del mar 1-dic): sin el porqué de la transición
  const f1x = !!fx && fx.real !== iso && fx.real < FECHAS_V6.transicion.desde;
  if (g && fx) g = { ...g, aviso: [f1x
    ? `Hoy ${diaFx}, a hora fija (${fx.ini}-${fx.fin}): la sesión que toca en orden; desde el lunes, una por día. Mismo reparto que entre semana.`
    : fx.real !== iso
    ? `Hoy ${diaFx}, a hora fija (${fx.ini}-${fx.fin}): la sesión que toca en orden (su día de plan ya tiene otra sesión MIR: nada se compacta; desde el lunes, las fechas de siempre). Mismo reparto que entre semana.`
    : `Hoy ${diaFx}, a hora fija (${fx.ini}-${fx.fin}): la sesión que toca en orden (el mar 17-nov fue sin sesión y cada día MIR de F1 corrió uno; desde mañana, las fechas de siempre). Mismo reparto que entre semana.`, g.aviso].filter(Boolean).join(' · ') };
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
