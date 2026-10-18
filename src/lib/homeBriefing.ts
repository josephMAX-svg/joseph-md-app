/**
 * homeBriefing.ts — Material curado del COCKPIT del Home (Command Center).
 *
 * Enriquece el Home con contenido, SIN tocar Supabase, fechas, cronogramas ni
 * item_keys. Todo se compone al vuelo desde datos ya presentes en la app:
 *   - "Today at a glance"  → patrón Superhuman Morning Briefing (1 línea accionable)
 *   - IDEA DE LA SEMANA    → 1 idea-ancla semanal ligada a la fase del orquestador
 *   - CANON (no negociable)→ núcleo de ~10 lecturas del founder (Naval / Tribe of Mentors)
 *
 * Fuentes del encuadre: superhuman.com/products/mail · navalmanack.com/navals-recommended-reading
 * · notion.com/templates/life-command-center-529 · culturedcode.com/things
 * NO editar cronogramas: esto es contenido/encuadre, no reprogramación.
 */
import { DAILY_META, hitosDelPlan, esFilaT2 } from './usmleStep1Daily';
import { FECHAS_V6, STEP1_SEMANAS, semanaStep1 as semanaStep1V6, faseV6 } from './fechasV6';
import type { SemanaStep1 } from './fechasV6';
import { HITOS_ONTRACK, hitoOnTrackDe, minimoTexto } from './usmleScores';

// ── Núcleo "no negociable" de la Biblioteca (canon del operador) ──
// Referencia por n de ESTUDIO_LIBROS / BIBLIOTECA_LIBROS. Marca el núcleo (lo
// esencial) separado de la cola larga. NO añade libros: solo los clasifica.
export const BIBLIOTECA_CANON: number[] = [
  2,   // Outlive — Peter Attia (identidad/longevidad · referente maestro)
  1,   // The Obesity Code — Jason Fung (paradigma hormonal · columna de Liviano)
  8,   // Why We Sleep — Matthew Walker (defiende las 7h · doctrina militarizada)
  20,  // $100M Offers — Alex Hormozi (oferta irresistible · núcleo comercial)
  21,  // $100M Leads — Alex Hormozi (generación de leads)
  28,  // Ultralearning — Scott Young (método de aprendizaje directo · meta-skill)
];

export function esCanon(n: number): boolean {
  return BIBLIOTECA_CANON.includes(n);
}

// ── IDEA DE LA SEMANA (idea-ancla, no solo frase diaria) ──
// Rota por número de semana ISO. Enmarca el foco semanal del cockpit y lo liga
// a la doctrina de estudio (Palmerton/Oakley/Deep Work) ya presente en memoria.
export interface IdeaSemana {
  idea: string;
  fuente: string;
  foco: string;
}

const IDEAS_SEMANA: IdeaSemana[] = [
  { idea: 'Comprensión antes que memoria: 1 idea por tarjeta, y solo avanzas cuando la entiendes al 100%.', fuente: 'Alec Palmerton · Yousmle', foco: 'Calidad del encoding' },
  { idea: 'Mide por % en ciego, no por sensación. La ilusión de competencia se rompe con el pre-test.', fuente: 'Barbara Oakley · A Mind for Numbers', foco: 'Testing efectivo' },
  { idea: 'Defiende las 7h de sueño con evidencia: el sueño consolida lo que estudiaste hoy.', fuente: 'Matthew Walker · Why We Sleep', foco: 'Consolidación' },
  { idea: 'Deep work sin fricción: elimina la decisión, protege el bloque, entra al foco enfocado→difuso.', fuente: 'Cal Newport · Deep Work', foco: 'Foco profundo' },
  { idea: 'La dificultad deseable es la que enseña: intercalar y espaciar cuesta hoy y paga mañana.', fuente: 'Bjork · desirable difficulty', foco: 'Interleaving' },
  { idea: 'El operador parte del Higher Self: identidad → meta → proyecto → la acción de hoy.', fuente: 'Notion Life OS · identity-based', foco: 'Identidad→acción' },
  { idea: 'Haz ofertas tan buenas que decir que no se sienta estúpido — vale para tu tiempo también.', fuente: 'Alex Hormozi · $100M Offers', foco: 'Prioridad brutal' },
];

/** Idea de la semana (rota por semana del año, determinista). */
export function ideaDeLaSemana(iso: string): IdeaSemana {
  const wk = isoWeek(iso);
  return IDEAS_SEMANA[wk % IDEAS_SEMANA.length];
}

function isoWeek(iso: string): number {
  try {
    const d = new Date(iso + 'T00:00:00');
    const jan1 = new Date(d.getFullYear(), 0, 1);
    const days = Math.floor((d.getTime() - jan1.getTime()) / 86400000);
    return Math.floor((days + jan1.getDay()) / 7);
  } catch {
    return 0;
  }
}

// ── "Today at a glance" — Morning Briefing de 1 línea ──
// Compone un resumen accionable desde datos ya cargados por el Home. No pide
// data nueva: recibe lo que el cockpit ya tiene en mano.
export interface BriefingInput {
  encapsTema?: string | null;     // tema ENCAPS del día (texto corto)
  mirBloque?: string | null;      // etiqueta MIR/USMLE (p.ej. "MIR D12 · Cardio")
  unread?: number;                // reports sin leer
  apexQueue?: number;             // APEX pendientes
  streak?: number;                // racha
  deepWorkH?: number;             // horas deep work hoy
}

/** Frase-briefing de 1 línea (estilo Superhuman). Vacía si no hay señales. */
export function componerBriefing(inp: BriefingInput): string {
  const partes: string[] = [];
  if (inp.encapsTema) partes.push(`hoy toca ${inp.encapsTema}`);
  if (inp.mirBloque) partes.push(inp.mirBloque);
  if ((inp.deepWorkH ?? 0) > 0) partes.push(`${Math.round((inp.deepWorkH ?? 0) * 10) / 10}h deep work`);
  if ((inp.apexQueue ?? 0) > 0) partes.push(`${inp.apexQueue} APEX en cola`);
  if ((inp.unread ?? 0) > 0) partes.push(`${inp.unread} reporte${(inp.unread ?? 0) > 1 ? 's' : ''} sin leer`);
  if ((inp.streak ?? 0) > 0) partes.push(`racha ${inp.streak}d`);
  if (!partes.length) return 'Sin loops abiertos — arranca el bloque de HOY.';
  // capitaliza la primera parte
  const s = partes.join(' · ');
  return s.charAt(0).toUpperCase() + s.slice(1) + '.';
}

// ═══════════════════════════════════════════════════════════════════════════
// v5.7 (5-sep-2026) — Semana N/STEP1_SEMANAS del Step 1 · revisión semanal · modo mínimo · KPI Anki
// v6.00 (6-oct-2026): STEP1_SEMANAS y semanaStep1 se DEFINEN en fechasV6 (módulo hoja; corta el ciclo usmleStep1Daily ↔ homeBriefing,
//   V6_ESPEC §F r2 · I7) y aquí se re-exportan (compatibilidad de imports): 41 = 13 (F1) + semanas(lun 15-mar → lun 27-sep) · la PAUSA
//   (lun 4-ene → semana del ENCAPS) → { pausa: true } y etiqueta 'PAUSA · ENCAPS' · la semana del examen → 'examen'.
//   HITOS_STEP1 (constante) → hitosStep1() PEREZOSA (hitosDelPlan() de los 2 tramos + GO/NO-GO; mínimo desde usmleScores.HITOS_ONTRACK).
// v6.01 (10-oct-2026): corrimiento del D1 mié 7-oct → lun 12-oct: STEP1_SEMANAS = 40 = 12 (F1: S1 lun 12-oct → S12 lun 28-dic) +
//   semanas(lun 15-mar → lun 27-sep) · DELOAD_SEMANAS: mismos lunes (16-nov y 28-dic) con los hitos re-fechados (NBME 26 vie 13-nov ·
//   NBME 28 lun 28-dic, que cae DENTRO de la segunda semana deload).
// v6.02 (17-oct-2026): corrimiento del D1 lun 12-oct → lun 19-oct: STEP1_SEMANAS = 39 = 11 (F1: S1 lun 19-oct → S11 lun 28-dic) +
//   semanas(lun 15-mar → lun 27-sep) · DELOAD_SEMANAS: lun 23-nov (post-NBME 26, vie 20-nov) y la semana del lun 28-dic (NBME 28 = D52
//   mié 30-dic, última sesión de F1: un hito de F1 no sale de F1). Gates F1 del núcleo: D18 mié 11-nov · D38 mié 9-dic.
// Doctrina: DATA/REVISION_SEMANAL.md · DATA/PROTOCOLO_MODO_MINIMO.md · DATA/SYNC_ANKI_OBSIDIAN_APP.md
// ═══════════════════════════════════════════════════════════════════════════

/** D1 del Step 1 (v6.02: lun 19-oct-2026; v6.01: lun 12-oct; v6.00 = v5.20: mié 7-oct) — misma fuente que usmleStep1Daily.DAILY_META.inicio (fechasV6 → _fechas_v6.json). */
export const STEP1_INICIO = FECHAS_V6.f1.inicio;
export { STEP1_SEMANAS };
export type { SemanaStep1 };

/** Hito del Home (chip de la semana · Cockpit): fecha, nombre y mínimo on-track en texto. */
export interface HitoStep1 { fecha: string; nombre: string; minimo: string }
/**
 * Hitos del Step 1 (v6.00, §B5): los de los 2 tramos (hitosDelPlan(): UWSA1 + NBME 25-28 en F1 · NBME 29-33, UWSA3 (opc.), UWSA2 y
 * Free 120 en el tramo 2) + la DECISIÓN GO/NO-GO (E-49, DAILY_META.gonogo). PEREZOSA: se evalúa al llamarla, no al cargar el módulo.
 * El mínimo sale de usmleScores.HITOS_ONTRACK (no escrito a mano).
 */
export function hitosStep1(): HitoStep1[] {
  const hs: HitoStep1[] = hitosDelPlan().map((x) => {
    const h = hitoOnTrackDe(x.uw);
    const nombre = esFilaT2(x) && x.nombre ? x.nombre : (h?.clave ?? x.uw);
    return { fecha: x.fecha, nombre, minimo: h ? minimoTexto(h) : '—' };
  });
  const g = HITOS_ONTRACK.find((h) => h.clave === 'GO/NO-GO');
  hs.push({ fecha: DAILY_META.gonogo, nombre: 'GO/NO-GO', minimo: g ? minimoTexto(g) : 'B4.5' });
  return hs.sort((a, b) => (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0));
}
/** Semanas DELOAD de los frentes SECUNDARIOS (50% de carga, fechas intactas): la posterior al NBME 26 y la del NBME 28 (F1).
 *  v6.02: lun 23-nov (NBME 26 = D25 vie 20-nov) y lun 28-dic (NBME 28 = D52 mié 30-dic, última sesión de F1 antes de la pausa).
 *  (v6.01: lun 16-nov y lun 28-dic · v6.00: los mismos lunes con los NBME en martes.) */
export const DELOAD_SEMANAS: { lunes: string; motivo: string }[] = [
  { lunes: '2026-11-23', motivo: 'post-NBME 26 (vie 20-nov)' },
  { lunes: '2026-12-28', motivo: 'semana del NBME 28 (mié 30-dic)' },
];

/** Semana del Step 1 para una fecha (lunes→domingo; determinista, sin reloj) = fechasV6.semanaStep1 con los hitos y deloads del plan. */
export function semanaStep1(iso: string): SemanaStep1 {
  let hitos: { fecha: string; nombre: string }[] = [];
  try { hitos = hitosStep1(); } catch { hitos = []; }
  return semanaStep1V6(iso, { hitos, deloads: DELOAD_SEMANAS });
}
/** Etiqueta corta para el instrumento del cockpit: "S3/39" (v6.02; v6.01: /40 · v6.00: /41) · "PAUSA · ENCAPS" · "pre-D1" · "examen" · "post-Step 1". */
export function semanaLabel(s: SemanaStep1): string {
  if (s.pausa) return 'PAUSA · ENCAPS';
  if (s.examen) return 'examen';
  if (s.n < 1) return 'pre-D1';
  if (s.n > s.total) return 'post-Step 1';
  return `S${s.n}/${s.total}`;
}

// ── Modo mínimo (VERDE / ÁMBAR / ROJO) — DATA/PROTOCOLO_MODO_MINIMO.md ──
export type ModoNivel = 'VERDE' | 'AMBAR' | 'ROJO';
export const MODO_KEY = 'jmd-modo';          // { fecha, nivel } — vuelve a VERDE cada día
export const MODO_LOG_KEY = 'jmd-modo-log';  // { [fecha]: nivel } — lo lee gen_revision_semanal.js (export localStorage)
export const MODO_INFO: Record<ModoNivel, { label: string; resumen: string; disparador: string }> = {
  VERDE: { label: 'VERDE', resumen: 'Todo el plan.', disparador: 'por defecto' },
  AMBAR: { label: 'ÁMBAR', resumen: 'USMLE intacto · secundarios a su mínimo.', disparador: 'sueño <6h · eval <60% 2 días · 1 día perdido' },
  // v6.00: «remap» → fin del corrimiento diario (V6_ESPEC §B7.1): el día perdido se hace en la próxima fila COLCHÓN (F3/F4) o en C1/C2 (F1).
  // v6.01: F1 ya no tiene C1/C2 (consumidos por el corrimiento al lun 12-oct) → un día perdido de F1 pasa al tramo 2 el jue 31-dic
  //   (disparador (f), --pendientes-f1) y allí lo absorbe el COLCHÓN. v6.02 (D1 lun 19-oct): igual; el colchón del tramo 2 baja a 28 filas.
  ROJO: { label: 'ROJO', resumen: 'Solo Anki + 10Q + dormir · la fila no hecha va al COLCHÓN.', disparador: '≥2 días perdidos o enfermedad' },
};
function lsGet(key: string): string | null {
  try { const ls = (globalThis as any).localStorage; return ls ? ls.getItem(key) : null; } catch { return null; }
}
function lsSet(key: string, val: string): void {
  try { const ls = (globalThis as any).localStorage; if (ls) ls.setItem(key, val); } catch { /* sin storage */ }
}
/** Nivel del día (default VERDE; si lo guardado es de otro día, vuelve a VERDE). */
export function leerModo(iso: string): ModoNivel {
  try {
    const raw = lsGet(MODO_KEY);
    if (!raw) return 'VERDE';
    const o = JSON.parse(raw) as { fecha?: string; nivel?: string };
    if (o.fecha !== iso) return 'VERDE';
    return o.nivel === 'AMBAR' || o.nivel === 'ROJO' ? o.nivel : 'VERDE';
  } catch { return 'VERDE'; }
}
/** Guarda el nivel del día + lo apunta en el log (últimos 120 días) para la revisión semanal. */
export function guardarModo(iso: string, nivel: ModoNivel): void {
  lsSet(MODO_KEY, JSON.stringify({ fecha: iso, nivel }));
  try {
    const log = JSON.parse(lsGet(MODO_LOG_KEY) || '{}') as Record<string, string>;
    log[iso] = nivel;
    const keys = Object.keys(log).sort();
    while (keys.length > 120) delete log[keys.shift() as string];
    lsSet(MODO_LOG_KEY, JSON.stringify(log));
  } catch { /* ignore */ }
}
// v6.02c (18-oct-2026, E5): + 'business' (Estudio Pulso, 13:00-13:25 L-V) y 'revision' (sáb 07:15) → el Home los pinta con guía y botón directo.
export type Frente = 'vibecoding' | 'usmle-anki' | 'usmle-principal' | 'synapse' | 'research-derma' | 'aurum' | 'mir' | 'encaps' | 'liviano' | 'usmle-eval'
  | 'business' | 'revision';
/** Mínimo DJ-4 de los secundarios (Joseph, 6-oct-2026): nunca 0 — 30' en ÁMBAR y en la regla de carga (§B7.4). */
export const MINIMO_DJ4 = "30' (mínimo DJ-4)";
/**
 * Qué queda de cada frente según el nivel (null = intacto). Orden de degradación del PROTOCOLO_MODO_MINIMO.
 * v6.00 (6-oct-2026 · DJ-4 · V6_ESPEC §F): ÁMBAR = research-derma, aurum, liviano, synapse y vibecoding a 30' (mínimo DJ-4, nunca 0) ·
 * MIR = Anki + 25Q (1 h, DJ-4) · ENCAPS en F2 (intensiva) = loop mínimo (pre-test 10Q + 30Q + eval 20Q); fuera de F2, 10Q ciegas.
 * ROJO (enfermedad): secundarios omitidos; el bloque PRINCIPAL de la fase conserva su mínimo — F1/F3/F4 = Step 1 (Anki + pre-test 10Q);
 * F2 = ENCAPS (Anki cifras + pre-test 10Q del sub-eje) y el Step 1 en mantenimiento queda en Anki vencido ≤15'. `iso` (opcional) decide la fase.
 */
export function minimoPorFrente(frente: Frente, nivel: ModoNivel, iso?: string): string | null {
  if (nivel === 'VERDE') return null;
  const f2 = !!iso && faseV6(iso) === 'F2';
  const AMBAR: Record<Frente, string | null> = {
    'usmle-anki': null, 'usmle-principal': null, 'usmle-eval': null,                        // USMLE intacto
    vibecoding: MINIMO_DJ4, synapse: MINIMO_DJ4, 'research-derma': MINIMO_DJ4, aurum: MINIMO_DJ4, liviano: MINIMO_DJ4,
    mir: 'Anki + 25Q (1 h, DJ-4)',
    encaps: f2 ? 'loop: pre-test 10Q + 30Q + eval 20Q' : "10Q ciegas (20') con registro; sin tutoría larga.",
    business: "15': solo el tramo de audio/lectura (L-V 13:00-13:15; la siesta 13:15-13:30 manda) o la fila del tracker (sábado); la nota, mañana.",
    revision: null,
  };
  const ROJO: Record<Frente, string | null> = f2 ? {
    // v6.00 · F2: el principal es el ENCAPS (intensiva); el Step 1 está en mantenimiento.
    'usmle-anki': "Anki vencido ≤15' (Step 1 en mantenimiento).",
    'usmle-principal': 'Omitido hoy (F2: Step 1 en mantenimiento).',
    'usmle-eval': 'Omitida hoy.',
    vibecoding: 'Omitido hoy.', synapse: 'Omitido hoy.', 'research-derma': 'Omitido hoy.', aurum: 'Omitido hoy.',
    mir: 'Omitido hoy.', liviano: 'Omitido hoy.', business: 'Omitido hoy.',
    revision: "10': abre el fichero, marca el nivel de la semana y 1 corrección (el resto, mañana).",
    encaps: 'Solo Anki cifras + pre-test 10Q del sub-eje (08:15). El resto del bloque = dormir/recuperar.',
  } : {
    'usmle-anki': 'Anki AM completo (innegociable).',
    'usmle-principal': 'Solo el pre-test 10Q (08:15) + Anki restante. El resto del bloque = dormir/recuperar.',
    'usmle-eval': 'Omitida hoy.',
    vibecoding: 'Omitido hoy.', synapse: 'Omitido hoy.', 'research-derma': 'Omitido hoy.', aurum: 'Omitido hoy.',
    mir: 'Omitido hoy.', encaps: 'Omitido hoy.', liviano: 'Omitido hoy.', business: 'Omitido hoy.',
    revision: "10': abre el fichero, marca el nivel de la semana y 1 corrección (el resto, mañana).",
  };
  return nivel === 'AMBAR' ? AMBAR[frente] : ROJO[frente];
}

// ── KPI Anki (telemetría) — DATA/_scripts/anki_telemetria.js → localStorage 'jmd-anki-telemetria' ──
export const ANKI_KPI_KEY = 'jmd-anki-telemetria';
export interface AnkiKpi {
  fecha: string;
  estado: 'ok' | 'anki_cerrado' | string;
  due?: number | null; backlog?: number | null; nuevas?: number | null;
  revisadasHoy?: number | null; retencion30?: number | null; againHoyPct?: number | null;
  minFinde?: number | null;                  // due × seg/tarjeta ÷ 60
  /** v5.14 (19-sep): hora de la 1.ª review del día (anki_telemetria.js v2) y su estado (verde ≤05:10 · ámbar >05:10 · rojo sin review L-V). */
  primeraReview?: string | null;
  primeraReviewEstado?: 'verde' | 'ambar' | 'rojo' | 'finde' | 'pendiente' | 'desconocido' | string;
}
/** Lee el último KPI (acepta objeto o array de entradas). null si no hay. */
export function leerAnkiKpi(): AnkiKpi | null {
  try {
    const raw = lsGet(ANKI_KPI_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    const e = Array.isArray(o) ? o[o.length - 1] : (o && Array.isArray(o.entradas) ? o.entradas[o.entradas.length - 1] : o);
    if (!e || typeof e !== 'object' || !e.fecha) return null;
    return e as AnkiKpi;
  } catch { return null; }
}
/** Valor compacto para el instrumento: "due 120 · back 15 · 91%" / "cerrado" / "—". */
export function ankiKpiLabel(k: AnkiKpi | null): string {
  if (!k) return '—';
  if (k.estado !== 'ok') return 'Anki cerrado';
  const ret = k.retencion30 == null ? '' : ` · ${Math.round(k.retencion30 * 100)}%`;
  return `due ${k.due ?? '?'} · back ${k.backlog ?? '?'}${ret}`;
}
/** Alarma G "capar/omitir revisiones vencidas → avalancha": backlog > 100 o retención < 85%. */
export function ankiAlarma(k: AnkiKpi | null): boolean {
  if (!k || k.estado !== 'ok') return false;
  return (k.backlog ?? 0) > 100 || (k.retencion30 != null && k.retencion30 < 0.85);
}
