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
import { DAILY_META } from './usmleStep1Daily';

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
// v5.7 (5-sep-2026) — Semana N/20 del Step 1 · revisión semanal · modo mínimo · KPI Anki
// Todo se deriva de datos ya presentes (DAILY_META del USMLE + localStorage con prefijo jmd-).
// Doctrina: DATA/REVISION_SEMANAL.md · DATA/PROTOCOLO_MODO_MINIMO.md · DATA/SYNC_ANKI_OBSIDIAN_APP.md
// ═══════════════════════════════════════════════════════════════════════════

/** D1 del Step 1 (v5.6 = lun 7-sep-2026) — misma fuente que usmleStep1Daily.DAILY_META.inicio. */
export const STEP1_INICIO = DAILY_META.inicio;
export const STEP1_SEMANAS = 20; // S1 7-sep → S20 18-22 ene (examen semana 25-29 ene 2027)

/** Hitos FIJOS (viernes) con su mínimo on-track (PALMERTON_POR_MATERIA Parte V, regla 5%/mes). */
export const HITOS_STEP1: { fecha: string; nombre: string; minimo: string }[] = [
  { fecha: '2026-09-11', nombre: 'UWSA1', minimo: 'baseline (cualquier valor)' },
  { fecha: '2026-10-02', nombre: 'NBME 25', minimo: '≥51%' },
  { fecha: '2026-10-23', nombre: 'NBME 26', minimo: '≥54%' },
  { fecha: '2026-11-13', nombre: 'NBME 27', minimo: '≥57%' },
  { fecha: '2026-12-04', nombre: 'NBME 28', minimo: '≥61%' },
  { fecha: '2026-12-18', nombre: 'NBME 29', minimo: '≥63%' },
  { fecha: '2026-12-30', nombre: 'NBME 30', minimo: '≥65%' },
  { fecha: '2027-01-08', nombre: 'UWSA2', minimo: 'low risk' },
  { fecha: '2027-01-15', nombre: 'NBME 31 · GO/NO-GO', minimo: '≥68%' },
  { fecha: '2027-01-18', nombre: 'NBME 32', minimo: '≥68%' },
  { fecha: '2027-01-20', nombre: 'NBME 33', minimo: '≥68%' },
  { fecha: '2027-01-22', nombre: 'Free 120', minimo: '≥70%' },
];
/** Semanas DELOAD de los frentes SECUNDARIOS (50% de carga, fechas intactas): la posterior a NBME 26 y a NBME 28. */
export const DELOAD_SEMANAS: { lunes: string; motivo: string }[] = [
  { lunes: '2026-10-26', motivo: 'post-NBME 26 (23-oct)' },
  { lunes: '2026-12-07', motivo: 'post-NBME 28 (4-dic)' },
];

export interface SemanaStep1 {
  n: number;            // 1..20 (0 = antes del D1; >20 = semana de examen o después)
  total: number;        // 20
  lunes: string; viernes: string; sabado: string;
  deload: boolean; deloadMotivo?: string;
  hito?: string;        // hito que cae en esta semana (viernes)
  fueraDeRango: boolean;
}
const addDaysISO = (iso: string, n: number): string => {
  try { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); } catch { return iso; }
};
/** Semana N/20 del Step 1 para una fecha (lunes→domingo). Determinista, sin reloj. */
export function semanaStep1(iso: string): SemanaStep1 {
  let n = 0, lunes = STEP1_INICIO;
  try {
    const d = new Date(iso + 'T12:00:00Z');
    const dow = d.getUTCDay();                       // 0=Dom
    const offToMon = dow === 0 ? -6 : 1 - dow;       // lunes de la semana de `iso`
    lunes = addDaysISO(iso, offToMon);
    const d1 = new Date(STEP1_INICIO + 'T12:00:00Z');
    const diff = Math.round((new Date(lunes + 'T12:00:00Z').getTime() - d1.getTime()) / 86400000);
    n = Math.floor(diff / 7) + 1;
  } catch { /* fuera de rango */ }
  const viernes = addDaysISO(lunes, 4), sabado = addDaysISO(lunes, 5);
  const deload = DELOAD_SEMANAS.find((x) => x.lunes === lunes);
  const hito = HITOS_STEP1.filter((h) => h.fecha >= lunes && h.fecha <= addDaysISO(lunes, 6)).map((h) => h.nombre).join(' + ') || undefined;
  return { n, total: STEP1_SEMANAS, lunes, viernes, sabado, deload: !!deload, deloadMotivo: deload?.motivo, hito, fueraDeRango: n < 1 || n > STEP1_SEMANAS };
}
/** Etiqueta corta para el instrumento del cockpit: "S3/20" (o "pre-D1" / "examen"). */
export function semanaLabel(s: SemanaStep1): string {
  if (s.n < 1) return 'pre-D1';
  if (s.n > s.total) return 'examen';
  return `S${s.n}/${s.total}`;
}

// ── Modo mínimo (VERDE / ÁMBAR / ROJO) — DATA/PROTOCOLO_MODO_MINIMO.md ──
export type ModoNivel = 'VERDE' | 'AMBAR' | 'ROJO';
export const MODO_KEY = 'jmd-modo';          // { fecha, nivel } — vuelve a VERDE cada día
export const MODO_LOG_KEY = 'jmd-modo-log';  // { [fecha]: nivel } — lo lee gen_revision_semanal.js (export localStorage)
export const MODO_INFO: Record<ModoNivel, { label: string; resumen: string; disparador: string }> = {
  VERDE: { label: 'VERDE', resumen: 'Todo el plan.', disparador: 'por defecto' },
  AMBAR: { label: 'ÁMBAR', resumen: 'USMLE intacto · secundarios a su mínimo.', disparador: 'sueño <6h · eval <60% 2 días · 1 día perdido' },
  ROJO: { label: 'ROJO', resumen: 'Solo Anki + 10Q + dormir · remap.', disparador: '≥2 días perdidos o enfermedad' },
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
export type Frente = 'vibecoding' | 'usmle-anki' | 'usmle-principal' | 'synapse' | 'research-derma' | 'aurum' | 'mir' | 'encaps' | 'liviano' | 'usmle-eval';
/** Qué queda de cada frente según el nivel (null = intacto). Orden de degradación del PROTOCOLO_MODO_MINIMO. */
export function minimoPorFrente(frente: Frente, nivel: ModoNivel): string | null {
  if (nivel === 'VERDE') return null;
  const AMBAR: Record<Frente, string | null> = {
    'usmle-anki': null, 'usmle-principal': null, 'usmle-eval': null,                        // USMLE intacto
    vibecoding: "15': commit de lo que haya + 1 línea en synapse-journal. Sin construir nuevo.",
    synapse: "Solo audio B (10') — sin A ni C.",
    'research-derma': "1 ítem de 5' (leer el abstract/átomo del día y marcar ✓).",
    aurum: "1 ítem de 5' (el drill del día, sin vídeo).",
    mir: "Solo eval D-1 (15', 15:15-15:30). Sin deep work.",
    encaps: "10Q ciegas (20') con registro; sin tutoría larga.",
    liviano: "1 ítem de 5' (releer el módulo del día, sin aplicación).",
  };
  const ROJO: Record<Frente, string | null> = {
    'usmle-anki': 'Anki AM completo (innegociable).',
    'usmle-principal': 'Solo el pre-test 10Q (08:15) + Anki restante. El resto del bloque = dormir/recuperar.',
    'usmle-eval': 'Omitida hoy.',
    vibecoding: 'Omitido hoy.', synapse: 'Omitido hoy.', 'research-derma': 'Omitido hoy.', aurum: 'Omitido hoy.',
    mir: 'Omitido hoy.', encaps: 'Omitido hoy.', liviano: 'Omitido hoy.',
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
