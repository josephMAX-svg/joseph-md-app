/**
 * mirEvalLog.ts — registro APPEND-ONLY de las evaluaciones del bloque MIR (localStorage 'jmd-mir-eval-log').
 *
 * Palmerton: "medir por % ciego". Hasta ahora el bloque MIR solo persistía '✓ completado'; aquí se
 * registra cada medición con la taxonomía unificada de brechas (knowledge / transfer / proceso) +
 * subtipo CCSN heredado del registro ENCAPS + flag `delta_es` (fallo por contestar con el manejo
 * Perú/USA a una pregunta española: terminología, guías, calendario vacunal, legislación).
 *
 * Tipos de medición (kind):
 *  · anclada      — 15:15 eval 4Q (2Q D-1 + 1Q D-3 + 1Q D-7); `anclas` guarda el resultado por ancla.
 *  · pretest      — 15:30 5Q ciegas del capítulo nuevo (diagnóstico, no cuenta para readiness).
 *  · cierre       — 1er día del bloque siguiente, 10Q reales de la asignatura cerrada (77 s/Q).
 *  · miniMIR      — D77: 40Q mixto cronometrado (51 min).
 *  · mantenimiento— ene-mar 2027: 25Q/30Q/10Q reales mixtas.
 * Neto MIR = A − F/3 (4 opciones, −1/3 por fallo, en blanco = 0). netoPct = neto / total × 100.
 * Umbrales de cierre: ≥70 % neto = consolidada · <55 % = la asignatura entra a las anclas D-7.
 * Un fallo en el ancla D-7 reprograma el tema a la COLA D+14 (no hay "repaso finde": sáb+dom libres).
 *
 * MIR_READINESS se DERIVA de aquí (mirReadinessDerivado): mini-MIR > cierres > ancladas > sin dato.
 * Export/Import JSON para consolidar con DATA/ENCAPS/TRACKING_ERRORES (plan:'MIR') o Supabase.
 */
import { mirAsignaturas, MIR_DIAS, MIR_TEMAS_TOTAL } from './mirDailyPlan';

export const MIR_EVAL_LOG_KEY = 'jmd-mir-eval-log';
export const MIR_EVAL_LOG_VERSION = 1;

export type MirTipoError = 'knowledge' | 'transfer' | 'proceso';
export const MIR_TIPO_ERROR: Array<{ k: MirTipoError; label: string; desc: string }> = [
  { k: 'knowledge', label: 'Knowledge', desc: 'no sabía el dato/mecanismo (→ APEX de mecanismo)' },
  { k: 'transfer', label: 'Transfer', desc: 'lo sabía pero no lo reconocí en la viñeta (→ Rule-In/Rule-Out, más preguntas)' },
  { k: 'proceso', label: 'Proceso', desc: 'lectura/tiempo/cambié la respuesta (→ táctica 77 s/Q, cover-the-options)' },
];
export type MirEvalKind = 'anclada' | 'pretest' | 'cierre' | 'miniMIR' | 'mantenimiento';

export interface MirEvalEntry {
  /** id único (ts + aleatorio) · ts = ISO de creación · append-only: nunca se edita ni borra */
  id: string; ts: string;
  fecha: string; d: number; tema: string; asignatura: string; num?: number;
  aciertos: number; total: number; blancos: number; tiempoSeg: number;
  tipoError: MirTipoError | null;
  /** subtipo CCSN heredado de ENCAPS (cifra / clave / sigla / norma) — texto libre opcional */
  ccsn?: string;
  /** fallo "delta-España": contesté con el manejo Perú/USA a una pregunta española */
  delta_es: boolean;
  kind: MirEvalKind;
  /** resultado por ancla en la eval anclada (true = acertadas todas las Q de esa ancla) */
  anclas?: { d1?: boolean; d3?: boolean; d7?: boolean };
  nota?: string;
}
export type MirEvalInput = Omit<MirEvalEntry, 'id' | 'ts' | 'kind'> & { kind?: MirEvalKind };

// ── storage (localStorage web; no-op seguro sin storage) ──
function leer(): MirEvalEntry[] {
  try {
    const ls = (globalThis as any).localStorage;
    if (!ls) return [];
    const raw = ls.getItem(MIR_EVAL_LOG_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => x && typeof x.fecha === 'string' && typeof x.total === 'number') : [];
  } catch { return []; }
}
function escribir(list: MirEvalEntry[]): boolean {
  try { const ls = (globalThis as any).localStorage; if (!ls) return false; ls.setItem(MIR_EVAL_LOG_KEY, JSON.stringify(list)); return true; }
  catch { return false; }
}
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, Math.round(Number(n) || 0)));

/** Todas las entradas (orden de inserción). */
export function mirEvalLogLoad(): MirEvalEntry[] { return leer(); }
/** Añade una entrada (append-only). Devuelve la entrada normalizada; `guardado` = false si no hay storage. */
export function mirEvalLogAppend(e: MirEvalInput): { entry: MirEvalEntry; guardado: boolean } {
  const total = clamp(e.total, 1, 400);
  const aciertos = clamp(e.aciertos, 0, total);
  const blancos = clamp(e.blancos, 0, total - aciertos);
  const entry: MirEvalEntry = {
    ...e,
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    ts: new Date().toISOString(),
    kind: e.kind || 'anclada',
    aciertos, total, blancos,
    tiempoSeg: Math.max(0, Math.round(Number(e.tiempoSeg) || 0)),
    delta_es: !!e.delta_es,
    tipoError: e.tipoError || null,
  };
  const list = leer(); list.push(entry);
  return { entry, guardado: escribir(list) };
}
/** Export JSON (para consolidar en TRACKING_ERRORES / Supabase / handoff 31-mar). */
export function mirEvalLogExportJSON(): string {
  return JSON.stringify({ version: MIR_EVAL_LOG_VERSION, plan: 'MIR', exportado: new Date().toISOString(), entradas: leer() }, null, 2);
}
/** Import/merge por id (otro dispositivo). Devuelve nº de entradas añadidas. */
export function mirEvalLogImportJSON(json: string): number {
  try {
    const obj = JSON.parse(json);
    const src: MirEvalEntry[] = Array.isArray(obj) ? obj : Array.isArray(obj?.entradas) ? obj.entradas : [];
    const list = leer(); const ids = new Set(list.map((x) => x.id)); let n = 0;
    for (const e of src) if (e && e.id && !ids.has(e.id) && typeof e.total === 'number') { list.push(e); ids.add(e.id); n++; }
    if (n) escribir(list.sort((a, b) => (a.ts || '').localeCompare(b.ts || '')));
    return n;
  } catch { return 0; }
}

// ── neto MIR ──
export function mirNeto(aciertos: number, total: number, blancos: number) {
  const fallos = Math.max(0, total - aciertos - blancos);
  const neto = aciertos - fallos / 3;
  return { fallos, neto: Math.round(neto * 100) / 100, netoPct: total ? Math.round((neto / total) * 1000) / 10 : 0 };
}
export const MIR_CIERRE_UMBRAL = { consolidada: 70, anclasD7: 55 };
export type MirEstadoCierre = 'consolidada' | 'intermedia' | 'anclasD7' | 'sin-dato';
export function mirEstadoCierre(netoPct: number | null | undefined): MirEstadoCierre {
  if (netoPct == null || Number.isNaN(netoPct)) return 'sin-dato';
  if (netoPct >= MIR_CIERRE_UMBRAL.consolidada) return 'consolidada';
  if (netoPct < MIR_CIERRE_UMBRAL.anclasD7) return 'anclasD7';
  return 'intermedia';
}
export const MIR_ESTADO_CIERRE_TXT: Record<MirEstadoCierre, string> = {
  consolidada: '≥70 % neto · consolidada (solo Anki + anclas normales)',
  intermedia: '55–69 % neto · intermedia (Whole-Page de los fallos + 1 ancla extra)',
  anclasD7: '<55 % neto · entra a la rotación de anclas D-7 hasta recuperar',
  'sin-dato': 'sin test de cierre registrado',
};

// ── estadísticas ──
export interface MirStatAsig {
  asignatura: string; num?: number; n: number; aciertos: number; total: number; blancos: number; fallos: number;
  neto: number; netoPct: number; ultimo: string; deltaEs: number; tipos: Record<MirTipoError, number>;
}
export function mirStatsPorAsignatura(entries: MirEvalEntry[] = leer(), kinds?: MirEvalKind[]): MirStatAsig[] {
  const m = new Map<string, MirStatAsig>();
  for (const e of entries) {
    if (kinds && !kinds.includes(e.kind)) continue;
    if (e.kind === 'pretest') continue; // el pre-test es diagnóstico (no mide retención)
    const k = e.asignatura || '—';
    const s = m.get(k) || { asignatura: k, num: e.num, n: 0, aciertos: 0, total: 0, blancos: 0, fallos: 0, neto: 0, netoPct: 0, ultimo: '', deltaEs: 0, tipos: { knowledge: 0, transfer: 0, proceso: 0 } };
    s.n++; s.aciertos += e.aciertos; s.total += e.total; s.blancos += e.blancos;
    if (e.delta_es) s.deltaEs++;
    if (e.tipoError) s.tipos[e.tipoError]++;
    if (e.fecha > s.ultimo) s.ultimo = e.fecha;
    m.set(k, s);
  }
  return Array.from(m.values()).map((s) => { const r = mirNeto(s.aciertos, s.total, s.blancos); return { ...s, fallos: r.fallos, neto: r.neto, netoPct: r.netoPct }; })
    .sort((a, b) => a.netoPct - b.netoPct);
}
/** Última entrada de una asignatura para un kind (p. ej. su test de cierre). */
export function mirUltimaDe(asignatura: string, kind: MirEvalKind, entries: MirEvalEntry[] = leer()): MirEvalEntry | undefined {
  return entries.filter((e) => e.kind === kind && e.asignatura === asignatura).sort((a, b) => (b.ts || '').localeCompare(a.ts || ''))[0];
}
export function mirCierreDeAsignatura(asignatura: string, entries: MirEvalEntry[] = leer()): { entry: MirEvalEntry; netoPct: number; estado: MirEstadoCierre } | null {
  const e = mirUltimaDe(asignatura, 'cierre', entries); if (!e) return null;
  const r = mirNeto(e.aciertos, e.total, e.blancos); return { entry: e, netoPct: r.netoPct, estado: mirEstadoCierre(r.netoPct) };
}
/** Asignaturas cuyo último cierre quedó <55 % → van a las anclas D-7 (y a los viernes del mantenimiento). */
export function mirAsignaturasEnAnclasD7(entries: MirEvalEntry[] = leer()): string[] {
  return mirAsignaturas().map((a) => a.asignatura).filter((a) => mirCierreDeAsignatura(a, entries)?.estado === 'anclasD7');
}
/** Asignatura con peor neto % (mín. `minTotal` preguntas medidas, kinds ciegos). null si no hay dato. */
export function mirPeorAsignatura(entries: MirEvalEntry[] = leer(), minTotal = 4): string | null {
  const st = mirStatsPorAsignatura(entries, ['anclada', 'cierre', 'miniMIR', 'mantenimiento']).filter((s) => s.total >= minTotal && s.asignatura !== 'Repaso integral');
  return st.length ? st[0].asignatura : null;
}
/** Entrada ya registrada para un día/kind (para no duplicar en la UI). */
export function mirEntradaDe(fecha: string, kind: MirEvalKind, entries: MirEvalEntry[] = leer()): MirEvalEntry | undefined {
  return entries.filter((e) => e.fecha === fecha && e.kind === kind).sort((a, b) => (b.ts || '').localeCompare(a.ts || ''))[0];
}

// ── cola D+14 (fallo en el ancla D-7) ──
function addDiasHabiles(fechaISO: string, dias: number): string {
  try {
    const d = new Date(fechaISO + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + dias);
    while (d.getUTCDay() === 0 || d.getUTCDay() === 6) d.setUTCDate(d.getUTCDate() + 1);
    return d.toISOString().slice(0, 10);
  } catch { return fechaISO; }
}
export interface MirColaItem { asignatura: string; tema: string; d: number; fechaFallo: string; fechaObjetivo: string; vencida: boolean; }
/** Temas con fallo en D-7 reprogramados a D+14 (día hábil). `vencida` = ya toca hoy o antes. */
export function mirColaD14(hoyISO: string, entries: MirEvalEntry[] = leer()): MirColaItem[] {
  const out: MirColaItem[] = [];
  for (const e of entries) {
    if (e.kind !== 'anclada' || !e.anclas || e.anclas.d7 !== false) continue;
    const dTema = e.d - 7; const dia = MIR_DIAS.find((x) => x.d === dTema);
    if (!dia || dia.d > MIR_TEMAS_TOTAL) continue;
    const fechaObjetivo = addDiasHabiles(e.fecha, 14);
    out.push({ asignatura: dia.asignatura, tema: dia.tema, d: dia.d, fechaFallo: e.fecha, fechaObjetivo, vencida: fechaObjetivo <= hoyISO });
  }
  return out.sort((a, b) => a.fechaObjetivo.localeCompare(b.fechaObjetivo));
}

// ── readiness derivado (sustituye el pct=5 hardcodeado de mirData.ts) ──
export interface MirReadiness { pct: number; estado: string; siguiente: string; fuente: 'miniMIR' | 'cierre' | 'anclada' | 'ninguna'; n: number; }
export function mirReadinessDerivado(entries: MirEvalEntry[] = leer()): MirReadiness {
  const nAsig = mirAsignaturas().length;
  const mini = entries.filter((e) => e.kind === 'miniMIR').sort((a, b) => (b.ts || '').localeCompare(a.ts || ''))[0];
  if (mini) {
    const r = mirNeto(mini.aciertos, mini.total, mini.blancos);
    return { pct: Math.max(0, Math.round(r.netoPct)), estado: `mini-MIR ${mini.fecha} · neto ${r.neto}/${mini.total} (${r.netoPct} %)`, siguiente: 'Cuadernillo oficial 200Q cronometrado (4h30, examenesmir.com) al abrir la fase principal MIR.', fuente: 'miniMIR', n: 1 };
  }
  const cierres = mirAsignaturas().map((a) => mirCierreDeAsignatura(a.asignatura, entries)).filter((x): x is NonNullable<typeof x> => !!x);
  if (cierres.length) {
    const media = cierres.reduce((s, c) => s + c.netoPct, 0) / cierres.length;
    const malas = cierres.filter((c) => c.estado === 'anclasD7').length;
    return { pct: Math.max(0, Math.round(media)), estado: `${cierres.length}/${nAsig} asignaturas con test de cierre 10Q · neto medio ${Math.round(media)} %${malas ? ` · ${malas} en anclas D-7` : ''}`, siguiente: 'mini-MIR 40Q mixto cronometrado (D77, 22-dic) = baseline honesto.', fuente: 'cierre', n: cierres.length };
  }
  const anc = entries.filter((e) => e.kind === 'anclada');
  if (anc.length) {
    const t = anc.reduce((s, e) => ({ a: s.a + e.aciertos, t: s.t + e.total, b: s.b + e.blancos }), { a: 0, t: 0, b: 0 });
    const r = mirNeto(t.a, t.t, t.b);
    return { pct: Math.max(0, Math.round(r.netoPct)), estado: `solo evals ancladas (${anc.length} × 4Q · no es test ciego de examen) · neto ${r.netoPct} %`, siguiente: 'Primer test de cierre 10Q (1er día del bloque siguiente, 15:15).', fuente: 'anclada', n: anc.length };
  }
  return { pct: 0, estado: 'Sin registro · línea base = primer test de cierre (10Q, 77 s/Q)', siguiente: 'Registra la eval anclada de hoy (15:27) y el test de cierre al cambiar de asignatura.', fuente: 'ninguna', n: 0 };
}
/** Tabla de neto por asignatura para D78 / handoff 31-mar (cierres + mini-MIR + mantenimiento). */
export function mirBaselineTabla(entries: MirEvalEntry[] = leer()): MirStatAsig[] {
  return mirStatsPorAsignatura(entries, ['cierre', 'miniMIR', 'mantenimiento']);
}
