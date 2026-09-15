/**
 * mirEvalLog.ts — registro APPEND-ONLY de las evaluaciones del bloque MIR (localStorage 'jmd-mir-eval-log'
 * + espejo Supabase `mir_eval_log` vía mirEvalSync.ts, fallback silencioso).
 *
 * Palmerton: "medir por % ciego". Aquí se registra cada medición con la taxonomía unificada de brechas
 * (knowledge / transfer / proceso) + subtipo CCSN heredado del registro ENCAPS + flag `delta_es` (fallo por
 * contestar con el manejo Perú/USA a una pregunta española: terminología, guías, calendario vacunal, legislación).
 *
 * Tipos de medición (kind):
 *  · anclada      — 15:15 eval 4Q (2Q D-1 + 2 slots dinámicos); `anclas` = resultado por slot, `anclasD` = D# del
 *                   tema que ocupó cada slot (anclas dinámicas, v3b).
 *  · pretest      — 15:30 5Q ciegas del capítulo nuevo (diagnóstico: NO cuenta para readiness, SÍ para el gate del tema).
 *  · quiz         — 15:53 8-10Q comentadas del capítulo (Rule-In → Rule-Out). v3b: era el 50 % de las preguntas del día
 *                   y no se registraba. Cuenta para el gate del tema y para el agregado por asignatura.
 *  · cierre       — 1er día del bloque siguiente, 10Q reales de la asignatura cerrada (77 s/Q).
 *  · miniMIR      — D77: 40Q mixto cronometrado (51 min).
 *  · mantenimiento— ene-mar 2027: 25Q/30Q/10Q reales mixtas.
 *  · derma10Q     — bloque DERMA (13:52, 1 de cada 3 sesiones Derma): 10Q del test del capítulo ProMIR de
 *                   Dermatología; asignatura 'Dermatología', `d` = sesión del plan Derma (no del MIR). Cuenta en
 *                   mirStatsPorAsignatura pero NO en readiness, cierres ni cola D+14.
 *
 * GATE PALMERTON como selección de anclas (v3b, gap 1): con 1h/día el gate no puede parar el calendario, así que
 * decide QUÉ pregunta ocupa cada ancla. Por tema: pre-test 5Q + quiz 8-10Q + ancla D-1 ≥ 80 % acumulado → 'validado';
 * quiz < 60 % o acumulado < 50 % o ancla ✗ → 'caliente' (ocupa uno de los 2 slots dinámicos del día siguiente hasta
 * 2 aciertos de ancla consecutivos). Al 2º fallo del tema, `ajuste` obligatorio (recursos / comprensión / aplicación /
 * retención = los 4 ajustes de Palmerton). Ningún minuto nuevo.
 *
 * Neto MIR = A − F/3 (4 opciones, −1/3 por fallo, en blanco = 0). netoPct = neto / total × 100.
 * Umbrales de cierre POR FASE (gap 5): 70/55 hasta el 31-mar-2027 → 75/60 desde abr-2027 (mirCierreUmbral).
 * Táctica −1/3 (gap 6): campos opcionales blancosAcertables / fallosEntreDos / cambiadas / cambiadasAFallo →
 * mirStatsPorAsignatura calcula la EV de la política de blanco y emite consejo por asignatura.
 * Un fallo en el ancla D-7 reprograma el tema a la COLA D+14 (no hay "repaso finde": sáb+dom libres).
 *
 * MIR_READINESS se DERIVA de aquí (mirReadinessDerivado): mini-MIR > cierres > ancladas > sin dato.
 * Export/Import JSON + espejo Supabase (mirEvalLogPull: merge por id en ambos sentidos).
 */
import { mirAsignaturas, MIR_DIAS, MIR_TEMAS_TOTAL, mirDiaN, mirBloques, DiaMIR } from './mirDailyPlan';
import { mirEvalSyncPush, mirEvalSyncPull } from './mirEvalSync';

export const MIR_EVAL_LOG_KEY = 'jmd-mir-eval-log';
export const MIR_EVAL_LOG_VERSION = 2;

export type MirTipoError = 'knowledge' | 'transfer' | 'proceso';
export const MIR_TIPO_ERROR: Array<{ k: MirTipoError; label: string; desc: string }> = [
  { k: 'knowledge', label: 'Knowledge', desc: 'no sabía el dato/mecanismo (→ APEX de mecanismo)' },
  { k: 'transfer', label: 'Transfer', desc: 'lo sabía pero no lo reconocí en la viñeta (→ Rule-In/Rule-Out, más preguntas)' },
  { k: 'proceso', label: 'Proceso', desc: 'lectura/tiempo/cambié la respuesta (→ táctica 77 s/Q, cover-the-options)' },
];
export type MirEvalKind = 'anclada' | 'pretest' | 'quiz' | 'cierre' | 'miniMIR' | 'mantenimiento' | 'derma10Q';
/** Los 4 ajustes de Palmerton ("don't move on": diagnostica cuál de los 4 componentes está roto y corrige la raíz). */
export type MirAjuste = 'recursos' | 'comprension' | 'aplicacion' | 'retencion';
export const MIR_AJUSTES: Array<{ k: MirAjuste; label: string; desc: string }> = [
  { k: 'recursos', label: 'Recursos', desc: 'la fuente no lo cubría o no era la buena → cambia de recurso (capítulo completo ProMIR / cuadernillo oficial), no releas lo mismo' },
  { k: 'comprension', label: 'Comprensión', desc: 'no entendí el mecanismo → Whole Page Rule + explicarlo en voz alta ANTES de memorizar' },
  { k: 'aplicacion', label: 'Aplicación', desc: 'lo entendía pero no lo reconocí en la viñeta → más preguntas del capítulo, Rule-In → Rule-Out, CCSN' },
  { k: 'retencion', label: 'Retención', desc: 'lo sabía y se fue → APEX de MECANISMO (no de dato) en Anki + ancla extra en 48 h' },
];
/** Asignatura y nº ProMIR con que el bloque Derma escribe en este log (kind 'derma10Q'). */
export const MIR_DERMA_ASIGNATURA = 'Dermatología';
export const MIR_DERMA_NUM = 5;

export interface MirEvalEntry {
  /** id único (ts + aleatorio) · ts = ISO de creación · append-only: nunca se edita ni borra */
  id: string; ts: string;
  fecha: string; d: number; tema: string; asignatura: string; num?: number;
  /** capId ProMIR del tema medido (pretest/quiz: el del día; anclada: el del tema D-1) */
  capId?: string;
  aciertos: number; total: number; blancos: number; tiempoSeg: number;
  tipoError: MirTipoError | null;
  /** subtipo CCSN heredado de ENCAPS (cifra / clave / sigla / norma) — texto libre opcional */
  ccsn?: string;
  /** fallo "delta-España": contesté con el manejo Perú/USA a una pregunta española */
  delta_es: boolean;
  kind: MirEvalKind;
  /** resultado por slot en la eval anclada (true = acertadas todas las Q de ese slot) */
  anclas?: { d1?: boolean; d3?: boolean; d7?: boolean };
  /** D# del tema que ocupó cada slot (anclas dinámicas). Si falta, se asume D-1 / D-3 / D-7 fijos. */
  anclasD?: { d1?: number; d3?: number; d7?: number };
  /** ids de preguntas oficiales consumidas ("2025-114", …) — anti-repetición contra mirPreguntasOficiales */
  qIds?: string[];
  /** ajuste Palmerton registrado (obligatorio al 2º fallo del tema) */
  ajuste?: MirAjuste;
  /** táctica −1/3: blancos que habrían sido aciertos */
  blancosAcertables?: number;
  /** táctica −1/3: fallos con solo 2 opciones vivas ("entre dos") */
  fallosEntreDos?: number;
  /** táctica −1/3: respuestas cambiadas y, de ellas, las que pasaron de acierto a fallo */
  cambiadas?: number; cambiadasAFallo?: number;
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
const optNum = (v: unknown, max: number): number | undefined => (v == null || v === '' || Number.isNaN(Number(v)) ? undefined : clamp(Number(v), 0, max));
function hoyISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return MIR_DIAS[0]?.fecha || '2026-09-16'; }
}
const porTs = (a: MirEvalEntry, b: MirEvalEntry) => (a.ts || '').localeCompare(b.ts || '');

/** Todas las entradas (orden de inserción). */
export function mirEvalLogLoad(): MirEvalEntry[] { return leer(); }
/** Añade una entrada (append-only) y la sube al espejo Supabase en segundo plano. `guardado` = false si no hay storage. */
export function mirEvalLogAppend(e: MirEvalInput): { entry: MirEvalEntry; guardado: boolean } {
  const total = clamp(e.total, 1, 400);
  const aciertos = clamp(e.aciertos, 0, total);
  const blancos = clamp(e.blancos, 0, total - aciertos);
  const fallos = total - aciertos - blancos;
  const entry: MirEvalEntry = {
    ...e,
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    ts: new Date().toISOString(),
    kind: e.kind || 'anclada',
    aciertos, total, blancos,
    tiempoSeg: Math.max(0, Math.round(Number(e.tiempoSeg) || 0)),
    delta_es: !!e.delta_es,
    tipoError: e.tipoError || null,
    blancosAcertables: optNum(e.blancosAcertables, blancos),
    fallosEntreDos: optNum(e.fallosEntreDos, fallos),
    cambiadas: optNum(e.cambiadas, total),
    cambiadasAFallo: optNum(e.cambiadasAFallo, Math.min(fallos, optNum(e.cambiadas, total) ?? total)),
    qIds: e.qIds && e.qIds.length ? e.qIds.map(String) : undefined,
  };
  if (!entry.ajuste) delete entry.ajuste;
  const list = leer(); list.push(entry);
  const guardado = escribir(list);
  try { void mirEvalSyncPush([entry]); } catch { /* espejo opcional */ }
  return { entry, guardado };
}
/** Export JSON (para consolidar en TRACKING_ERRORES / DELTA_ESPANA / handoff 31-mar). */
export function mirEvalLogExportJSON(): string {
  return JSON.stringify({ version: MIR_EVAL_LOG_VERSION, plan: 'MIR', exportado: new Date().toISOString(), entradas: leer() }, null, 2);
}
function mergePorId(src: MirEvalEntry[]): number {
  const list = leer(); const ids = new Set(list.map((x) => x.id)); let n = 0;
  for (const e of src) if (e && e.id && !ids.has(e.id) && typeof e.total === 'number') { list.push(e); ids.add(e.id); n++; }
  if (n) escribir(list.sort(porTs));
  return n;
}
/** Import/merge por id (otro dispositivo / export JSON). Devuelve nº de entradas añadidas. */
export function mirEvalLogImportJSON(json: string): number {
  try {
    const obj = JSON.parse(json);
    const src: MirEvalEntry[] = Array.isArray(obj) ? obj : Array.isArray(obj?.entradas) ? obj.entradas : [];
    return mergePorId(src);
  } catch { return 0; }
}
/**
 * Espejo Supabase (gap 7): trae las filas remotas, fusiona por id en local y sube las locales que faltan.
 * Criterio de aceptación: registrar en el móvil y verlo en la web + fila en Supabase. Nunca lanza.
 */
export async function mirEvalLogPull(): Promise<{ ok: boolean; anadidas: number; subidas: number; remotas: number }> {
  try {
    const remotas = await mirEvalSyncPull();
    const anadidas = remotas.length ? mergePorId(remotas) : 0;
    const remoteIds = new Set(remotas.map((x) => x.id));
    const faltan = leer().filter((x) => !remoteIds.has(x.id));
    const ok = faltan.length ? await mirEvalSyncPush(faltan) : true;
    return { ok, anadidas, subidas: ok ? faltan.length : 0, remotas: remotas.length };
  } catch { return { ok: false, anadidas: 0, subidas: 0, remotas: 0 }; }
}
/** ids de preguntas oficiales ya consumidas (anti-repetición para mirPreguntasOficiales.preguntasSinUsar). */
export function mirUsadasIds(entries: MirEvalEntry[] = leer()): Set<string> {
  const s = new Set<string>();
  for (const e of entries) if (e.qIds) for (const q of e.qIds) s.add(String(q));
  return s;
}

// ── neto MIR ──
export function mirNeto(aciertos: number, total: number, blancos: number) {
  const fallos = Math.max(0, total - aciertos - blancos);
  const neto = aciertos - fallos / 3;
  return { fallos, neto: Math.round(neto * 100) / 100, netoPct: total ? Math.round((neto / total) * 1000) / 10 : 0 };
}
/** Umbrales del test de cierre POR FASE (gap 5: 'consolidada al 70 %' está 10 pts por debajo de lo que Top 50 exige). */
export interface MirUmbralFase { fase: string; hasta: string; consolidada: number; anclasD7: number; }
export const MIR_CIERRE_UMBRAL_FASES: MirUmbralFase[] = [
  { fase: '1ª vuelta + banqueo (hasta 31-mar-2027)', hasta: '2027-03-31', consolidada: 70, anclasD7: 55 },
  { fase: 'fase principal (desde abr-2027)', hasta: '9999-12-31', consolidada: 75, anclasD7: 60 },
];
export function mirCierreUmbral(fechaISO: string = hoyISO()): MirUmbralFase {
  return MIR_CIERRE_UMBRAL_FASES.find((f) => fechaISO <= f.hasta) || MIR_CIERRE_UMBRAL_FASES[MIR_CIERRE_UMBRAL_FASES.length - 1];
}
/** Compat (fase 1). Para el umbral vigente usa mirCierreUmbral(fecha). */
export const MIR_CIERRE_UMBRAL = { consolidada: MIR_CIERRE_UMBRAL_FASES[0].consolidada, anclasD7: MIR_CIERRE_UMBRAL_FASES[0].anclasD7 };
export type MirEstadoCierre = 'consolidada' | 'intermedia' | 'anclasD7' | 'sin-dato';
export function mirEstadoCierre(netoPct: number | null | undefined, fechaISO?: string): MirEstadoCierre {
  if (netoPct == null || Number.isNaN(netoPct)) return 'sin-dato';
  const u = mirCierreUmbral(fechaISO);
  if (netoPct >= u.consolidada) return 'consolidada';
  if (netoPct < u.anclasD7) return 'anclasD7';
  return 'intermedia';
}
export function mirEstadoCierreTxt(estado: MirEstadoCierre, fechaISO?: string): string {
  const u = mirCierreUmbral(fechaISO);
  switch (estado) {
    case 'consolidada': return `≥${u.consolidada} % neto · consolidada (solo Anki + anclas normales)`;
    case 'intermedia': return `${u.anclasD7}–${u.consolidada - 1} % neto · intermedia (Whole-Page de los fallos + 1 ancla extra)`;
    case 'anclasD7': return `<${u.anclasD7} % neto · entra a la rotación de anclas D-7 hasta recuperar`;
    default: return 'sin test de cierre registrado';
  }
}
/** Compat: textos de la fase 1. */
export const MIR_ESTADO_CIERRE_TXT: Record<MirEstadoCierre, string> = {
  consolidada: mirEstadoCierreTxt('consolidada', '2026-09-16'),
  intermedia: mirEstadoCierreTxt('intermedia', '2026-09-16'),
  anclasD7: mirEstadoCierreTxt('anclasD7', '2026-09-16'),
  'sin-dato': mirEstadoCierreTxt('sin-dato', '2026-09-16'),
};

// ── táctica −1/3 (gap 6) ──
export interface MirTacticaStat {
  /** entradas con algún campo táctico rellenado */
  n: number; blancos: number; blancosAcertables: number; fallos: number; fallosEntreDos: number; cambiadas: number; cambiadasAFallo: number;
  /** EV (puntos netos) de haber respondido TODOS los blancos = acertables·1 − (blancos − acertables)/3 · null sin dato */
  evBlanco: number | null;
  consejo: string;
}
export function mirTacticaConsejo(t: Omit<MirTacticaStat, 'consejo' | 'evBlanco'>): { evBlanco: number | null; consejo: string } {
  const partes: string[] = [];
  let evBlanco: number | null = null;
  if (t.n === 0) return { evBlanco, consejo: 'Sin datos tácticos: rellena blancos acertables / fallos entre dos / cambiadas al corregir.' };
  if (t.blancos > 0) {
    evBlanco = Math.round((t.blancosAcertables - (t.blancos - t.blancosAcertables) / 3) * 100) / 100;
    if (evBlanco > 0.5) partes.push(`arriesga más: responder tus ${t.blancos} blancos te habría dado +${evBlanco} netos (${t.blancosAcertables} eran aciertos)`);
    else if (evBlanco < -0.3) partes.push(`tu política de blanco es correcta (responderlos = ${evBlanco} netos): sigue en blanco cuando no descartas 2`);
    else partes.push('blanco neutro: solo responde si descartas ≥1 opción (EV +0,33)');
  }
  if (t.fallos > 0 && t.fallosEntreDos / t.fallos >= 0.5) partes.push(`${t.fallosEntreDos}/${t.fallos} fallos fueron "entre dos": el descarte final falla → Rule-Out con cover-the-options; cuando descartas 2, responde (EV +1,0)`);
  if (t.cambiadas >= 2 && t.cambiadasAFallo / t.cambiadas > 0.5) partes.push(`cambiaste ${t.cambiadas} respuestas y ${t.cambiadasAFallo} pasaron a fallo → NO cambies salvo error objetivo de lectura (Palmerton)`);
  else if (t.cambiadas >= 2) partes.push(`cambios de respuesta ${t.cambiadas} (${t.cambiadasAFallo} a fallo): solo por error de lectura, nunca por duda`);
  return { evBlanco, consejo: partes.join(' · ') || 'sin señal táctica todavía' };
}

// ── estadísticas ──
export interface MirStatAsig {
  asignatura: string; num?: number; n: number; aciertos: number; total: number; blancos: number; fallos: number;
  neto: number; netoPct: number; ultimo: string; deltaEs: number; tipos: Record<MirTipoError, number>;
  tactica: MirTacticaStat;
}
export function mirStatsPorAsignatura(entries: MirEvalEntry[] = leer(), kinds?: MirEvalKind[]): MirStatAsig[] {
  const m = new Map<string, MirStatAsig>();
  for (const e of entries) {
    if (kinds && !kinds.includes(e.kind)) continue;
    if (e.kind === 'pretest') continue; // el pre-test es diagnóstico (no mide retención)
    const k = e.asignatura || '—';
    const s = m.get(k) || {
      asignatura: k, num: e.num, n: 0, aciertos: 0, total: 0, blancos: 0, fallos: 0, neto: 0, netoPct: 0, ultimo: '', deltaEs: 0,
      tipos: { knowledge: 0, transfer: 0, proceso: 0 },
      tactica: { n: 0, blancos: 0, blancosAcertables: 0, fallos: 0, fallosEntreDos: 0, cambiadas: 0, cambiadasAFallo: 0, evBlanco: null, consejo: '' },
    };
    s.n++; s.aciertos += e.aciertos; s.total += e.total; s.blancos += e.blancos;
    if (e.delta_es) s.deltaEs++;
    if (e.tipoError) s.tipos[e.tipoError]++;
    if (e.fecha > s.ultimo) s.ultimo = e.fecha;
    if (e.blancosAcertables != null || e.fallosEntreDos != null || e.cambiadas != null) {
      const t = s.tactica; const f = Math.max(0, e.total - e.aciertos - e.blancos);
      t.n++; t.blancos += e.blancos; t.blancosAcertables += e.blancosAcertables ?? 0; t.fallos += f;
      t.fallosEntreDos += Math.min(f, e.fallosEntreDos ?? 0); t.cambiadas += e.cambiadas ?? 0; t.cambiadasAFallo += Math.min(e.cambiadas ?? 0, e.cambiadasAFallo ?? 0);
    }
    m.set(k, s);
  }
  return Array.from(m.values()).map((s) => {
    const r = mirNeto(s.aciertos, s.total, s.blancos);
    const c = mirTacticaConsejo(s.tactica);
    return { ...s, fallos: r.fallos, neto: r.neto, netoPct: r.netoPct, tactica: { ...s.tactica, evBlanco: c.evBlanco, consejo: c.consejo } };
  }).sort((a, b) => a.netoPct - b.netoPct);
}
/** Última entrada de una asignatura para un kind (p. ej. su test de cierre). */
export function mirUltimaDe(asignatura: string, kind: MirEvalKind, entries: MirEvalEntry[] = leer()): MirEvalEntry | undefined {
  return entries.filter((e) => e.kind === kind && e.asignatura === asignatura).sort((a, b) => (b.ts || '').localeCompare(a.ts || ''))[0];
}
export function mirCierreDeAsignatura(asignatura: string, entries: MirEvalEntry[] = leer()): { entry: MirEvalEntry; netoPct: number; estado: MirEstadoCierre } | null {
  const e = mirUltimaDe(asignatura, 'cierre', entries); if (!e) return null;
  const r = mirNeto(e.aciertos, e.total, e.blancos); return { entry: e, netoPct: r.netoPct, estado: mirEstadoCierre(r.netoPct, e.fecha) };
}
/** Preguntas mínimas para que el agregado por asignatura sustituya al último cierre de 10Q (±10 pp por pregunta). */
export const MIR_AGREGADO_MIN_Q = 20;
export interface MirAgregadoAsig { asignatura: string; n: number; total: number; aciertos: number; blancos: number; netoPct: number; fuente: 'agregado' | 'cierre' | 'ninguna'; estado: MirEstadoCierre; }
/**
 * Agregado por asignatura = cierre + ancladas + quiz (n ≥ 20 Q). Si no llega, cae al último cierre de 10Q.
 * Sustituye al veredicto de un solo test de 10Q para decidir la rotación de anclas D-7 (gap 1d).
 */
export function mirAgregadoAsignatura(asignatura: string, entries: MirEvalEntry[] = leer(), fechaISO?: string): MirAgregadoAsig {
  const sel = entries.filter((e) => e.asignatura === asignatura && (e.kind === 'cierre' || e.kind === 'anclada' || e.kind === 'quiz'));
  const t = sel.reduce((s, e) => ({ a: s.a + e.aciertos, t: s.t + e.total, b: s.b + e.blancos }), { a: 0, t: 0, b: 0 });
  if (t.t >= MIR_AGREGADO_MIN_Q) {
    const r = mirNeto(t.a, t.t, t.b);
    return { asignatura, n: sel.length, total: t.t, aciertos: t.a, blancos: t.b, netoPct: r.netoPct, fuente: 'agregado', estado: mirEstadoCierre(r.netoPct, fechaISO) };
  }
  const c = mirCierreDeAsignatura(asignatura, entries);
  if (c) return { asignatura, n: 1, total: c.entry.total, aciertos: c.entry.aciertos, blancos: c.entry.blancos, netoPct: c.netoPct, fuente: 'cierre', estado: c.estado };
  return { asignatura, n: sel.length, total: t.t, aciertos: t.a, blancos: t.b, netoPct: t.t ? mirNeto(t.a, t.t, t.b).netoPct : 0, fuente: 'ninguna', estado: 'sin-dato' };
}
/** Asignaturas cuyo agregado (n≥20) — o, si no llega, su último cierre — queda bajo el umbral → anclas D-7 y viernes del mantenimiento. */
export function mirAsignaturasEnAnclasD7(entries: MirEvalEntry[] = leer(), fechaISO?: string): string[] {
  return mirAsignaturas().map((a) => a.asignatura).filter((a) => mirAgregadoAsignatura(a, entries, fechaISO).estado === 'anclasD7');
}
/** Asignatura con peor neto % (mín. `minTotal` preguntas medidas, kinds ciegos). null si no hay dato. */
export function mirPeorAsignatura(entries: MirEvalEntry[] = leer(), minTotal = 4): string | null {
  const st = mirStatsPorAsignatura(entries, ['anclada', 'cierre', 'miniMIR', 'mantenimiento']).filter((s) => s.total >= minTotal && s.asignatura !== 'Repaso integral');
  return st.length ? st[0].asignatura : null;
}
/** Entrada ya registrada para un día/kind (para no duplicar en la UI). `d` opcional acota al tema. */
export function mirEntradaDe(fecha: string, kind: MirEvalKind, entries: MirEvalEntry[] = leer(), d?: number): MirEvalEntry | undefined {
  return entries.filter((e) => e.fecha === fecha && e.kind === kind && (d == null || e.d === d)).sort((a, b) => (b.ts || '').localeCompare(a.ts || ''))[0];
}
/** Entradas 'derma10Q' (10Q ProMIR Dermatología hechas desde el bloque Derma), más reciente primero. */
export function mirDermaEntradas(entries: MirEvalEntry[] = leer()): MirEvalEntry[] {
  return entries.filter((e) => e.kind === 'derma10Q').sort((a, b) => (b.ts || '').localeCompare(a.ts || ''));
}
/** Neto acumulado de las 10Q ProMIR-Derma (mide la asignatura 'Dermatología' desde el bloque Derma). */
export function mirDermaResumen(entries: MirEvalEntry[] = leer()): { n: number; aciertos: number; total: number; blancos: number; netoPct: number } {
  const t = mirDermaEntradas(entries).reduce((s, e) => ({ a: s.a + e.aciertos, t: s.t + e.total, b: s.b + e.blancos, n: s.n + 1 }), { a: 0, t: 0, b: 0, n: 0 });
  return { n: t.n, aciertos: t.a, total: t.t, blancos: t.b, netoPct: mirNeto(t.a, t.t, t.b).netoPct };
}

// ── GATE PALMERTON por tema (gap 1) ──
export const MIR_GATE = {
  /** acumulado (pre-test + quiz + ancla D-1) para 'validado' */
  validadoPct: 80,
  /** quiz 8-10Q por debajo → 'caliente' */
  quizMinPct: 60,
  /** acumulado por debajo → 'caliente' */
  acumMinPct: 50,
  /** aciertos de ancla consecutivos para salir de 'caliente' */
  aciertosConsecutivos: 2,
  /** preguntas mínimas para emitir veredicto */
  minQ: 5,
  /** nº de preguntas por slot de la eval anclada */
  nQSlot: { d1: 2, d3: 1, d7: 1 } as Record<'d1' | 'd3' | 'd7', number>,
};
export type MirValidacion = 'validado' | 'caliente' | 'pendiente' | 'sin-dato';
export const MIR_VALIDACION_TXT: Record<MirValidacion, string> = {
  validado: '✓ validado (≥80 % acumulado pre-test + quiz + ancla)',
  caliente: '● caliente (quiz <60 %, acumulado <50 % o ancla ✗) → ocupa un slot dinámico hasta 2 aciertos seguidos',
  pendiente: '○ medido, sin veredicto (50-79 %)',
  'sin-dato': '— sin medición',
};
export interface MirTemaEstado {
  d: number; capId: string; asignatura: string; tema: string;
  estado: MirValidacion; aciertos: number; total: number; pct: number;
  quizPct: number | null; nPretest: number; nQuiz: number; nAnclas: number;
  /** eventos de fallo del tema (quiz <60 % · slot de ancla ✗); el acumulado <50 % pone caliente pero no suma evento */
  fallos: number;
  /** aciertos de ancla consecutivos desde el último fallo */
  consecutivosOk: number;
  /** último ajuste Palmerton registrado para el tema */
  ajuste?: MirAjuste;
  /** ≥2 fallos y sin ajuste → el próximo registro del tema exige `ajuste` */
  necesitaAjuste: boolean;
  ultimo: string;
}
const SLOTS: Array<'d1' | 'd3' | 'd7'> = ['d1', 'd3', 'd7'];
const OFFSET: Record<'d1' | 'd3' | 'd7', number> = { d1: 1, d3: 3, d7: 7 };
/** D# del tema que ocupó un slot de una eval anclada (anclas dinámicas o fijas por defecto). */
export function mirSlotTemaD(e: MirEvalEntry, k: 'd1' | 'd3' | 'd7'): number | undefined {
  const dyn = e.anclasD?.[k];
  if (typeof dyn === 'number' && dyn > 0) return dyn;
  const fijo = e.d - OFFSET[k];
  return fijo >= 1 ? fijo : undefined;
}
interface EventoTema { ts: string; fecha: string; tipo: 'pretest' | 'quiz' | 'ancla'; aciertos: number; total: number; ok?: boolean; ajuste?: MirAjuste; }
function eventosTema(d: number, entries: MirEvalEntry[]): EventoTema[] {
  const ev: EventoTema[] = [];
  for (const e of entries) {
    if (e.kind === 'pretest' || e.kind === 'quiz') {
      if (e.d === d) ev.push({ ts: e.ts, fecha: e.fecha, tipo: e.kind, aciertos: e.aciertos, total: e.total, ajuste: e.ajuste });
    } else if (e.kind === 'anclada' && e.anclas) {
      for (const k of SLOTS) {
        const ok = e.anclas[k]; if (typeof ok !== 'boolean') continue;
        if (mirSlotTemaD(e, k) !== d) continue;
        const nQ = MIR_GATE.nQSlot[k];
        ev.push({ ts: e.ts, fecha: e.fecha, tipo: 'ancla', aciertos: ok ? nQ : 0, total: nQ, ok, ajuste: ok ? undefined : e.ajuste });
      }
    }
  }
  return ev.sort((a, b) => (a.ts || '').localeCompare(b.ts || ''));
}
/** Estado del gate para un tema (D#). Conservador: un slot de ancla ✗ cuenta 0/nQ. */
export function mirTemaEstado(d: number, entries: MirEvalEntry[] = leer()): MirTemaEstado | null {
  const dia = mirDiaN(d); if (!dia || d > MIR_TEMAS_TOTAL) return null;
  const ev = eventosTema(d, entries);
  let aciertos = 0, total = 0, fallos = 0, consecutivosOk = 0, nPretest = 0, nQuiz = 0, nAnclas = 0, quizPct: number | null = null, ultimo = '';
  let ajuste: MirAjuste | undefined;
  for (const x of ev) {
    aciertos += x.aciertos; total += x.total; if (x.fecha > ultimo) ultimo = x.fecha;
    if (x.ajuste) ajuste = x.ajuste;
    if (x.tipo === 'pretest') nPretest++;
    else if (x.tipo === 'quiz') {
      nQuiz++; quizPct = x.total ? Math.round((x.aciertos / x.total) * 1000) / 10 : null;
      if (quizPct != null && quizPct < MIR_GATE.quizMinPct) { fallos++; consecutivosOk = 0; }
    } else { nAnclas++; if (x.ok) consecutivosOk++; else { fallos++; consecutivosOk = 0; } }
  }
  const pct = total ? Math.round((aciertos / total) * 1000) / 10 : 0;
  // acumulado <50 % pone el tema en caliente, pero NO cuenta como evento de fallo (evita el doble conteo del mismo día malo:
  // el "2º fallo" que exige ajuste es una segunda MEDICIÓN fallida — quiz <60 % o slot de ancla ✗)
  const acumBajo = total >= MIR_GATE.minQ && pct < MIR_GATE.acumMinPct;
  let estado: MirValidacion;
  if (total === 0) estado = 'sin-dato';
  else if ((fallos > 0 || acumBajo) && consecutivosOk < MIR_GATE.aciertosConsecutivos) estado = 'caliente';
  else if (pct >= MIR_GATE.validadoPct && total >= MIR_GATE.minQ) estado = 'validado';
  else estado = 'pendiente';
  return { d, capId: dia.capId, asignatura: dia.asignatura, tema: dia.tema, estado, aciertos, total, pct, quizPct, nPretest, nQuiz, nAnclas, fallos, consecutivosOk, ajuste, necesitaAjuste: fallos >= 2 && !ajuste, ultimo };
}
/** Mapa D# → estado del gate para todos los temas con alguna medición. */
export function mirEstadosTemas(entries: MirEvalEntry[] = leer()): Map<number, MirTemaEstado> {
  const m = new Map<number, MirTemaEstado>();
  for (const x of MIR_DIAS) { if (x.d > MIR_TEMAS_TOTAL) break; const s = mirTemaEstado(x.d, entries); if (s && s.estado !== 'sin-dato') m.set(x.d, s); }
  return m;
}
/** Temas 'caliente' (no validados) anteriores al día `hastaD` (excluido). */
export function mirTemasCalientes(entries: MirEvalEntry[] = leer(), hastaD: number = MIR_TEMAS_TOTAL + 1): MirTemaEstado[] {
  return Array.from(mirEstadosTemas(entries).values()).filter((s) => s.estado === 'caliente' && s.d < hastaD);
}
/**
 * ¿Registrar este resultado sería el 2º fallo (o más) de algún tema sin ajuste? → la UI exige `ajuste`.
 * `temas` = D# que fallan en el registro que se va a guardar.
 */
export function mirTemasQueExigenAjuste(temasQueFallan: number[], entries: MirEvalEntry[] = leer()): MirTemaEstado[] {
  const out: MirTemaEstado[] = [];
  for (const d of temasQueFallan) { const s = mirTemaEstado(d, entries); if (s && s.fallos >= 1 && !s.ajuste) out.push(s); }
  return out;
}

// ── anclas dinámicas (D-1 fijo + 2 slots que priorizan temas calientes del bloque) ──
export interface MirAnclaSlot { k: 'd1' | 'd3' | 'd7'; nQ: number; label: string; dia?: DiaMIR; motivo: 'fijo' | 'caliente' | 'cola'; estado?: MirTemaEstado; }
export interface MirAnclasDinamicas { slots: MirAnclaSlot[]; anclasD: { d1?: number; d3?: number; d7?: number }; calientes: MirTemaEstado[]; }
/**
 * Slots de la eval anclada del día `d`: D-1 fijo (2Q) + 2 slots dinámicos (1Q c/u). Prioridad de los dinámicos:
 * temas calientes del bloque actual → calientes de bloques previos → cola D+14 vencida → D-3 y D-7 fijos.
 * Sin dato en el log = comportamiento previo (D-1 / D-3 / D-7).
 */
export function mirAnclasDinamicas(d: number, entries: MirEvalEntry[] = leer(), hoyISO_?: string): MirAnclasDinamicas {
  const tema = (k: number) => { const x = mirDiaN(d - k); return x && x.d <= MIR_TEMAS_TOTAL ? x : undefined; };
  const d1 = tema(1);
  const bloque = mirBloques().find((b) => d >= b.dIni && d <= b.dFin);
  const calientes = mirTemasCalientes(entries, d).filter((s) => !d1 || s.d !== d1.d)
    .sort((a, b) => {
      const ba = bloque && a.d >= bloque.dIni ? 0 : 1, bb = bloque && b.d >= bloque.dIni ? 0 : 1;
      return ba - bb || b.fallos - a.fallos || (b.ultimo || '').localeCompare(a.ultimo || '');
    });
  const usados = new Set<number>(d1 ? [d1.d] : []);
  const dyn: MirAnclaSlot[] = [];
  for (const s of calientes) {
    if (dyn.length >= 2 || usados.has(s.d)) continue;
    const x = mirDiaN(s.d); if (!x) continue;
    dyn.push({ k: 'd3', nQ: 1, label: `caliente D${s.d}`, dia: x, motivo: 'caliente', estado: s }); usados.add(s.d);
  }
  if (dyn.length < 2) {
    const hoy = hoyISO_ || mirDiaN(d)?.fecha || hoyISO();
    for (const c of mirColaD14(hoy, entries)) {
      if (dyn.length >= 2 || !c.vencida || usados.has(c.d)) continue;
      const x = mirDiaN(c.d); if (!x) continue;
      dyn.push({ k: 'd3', nQ: 1, label: `cola D+14 · D${c.d}`, dia: x, motivo: 'cola' }); usados.add(c.d);
    }
  }
  for (const k of [3, 7] as const) {
    if (dyn.length >= 2) break;
    const x = tema(k);
    if (x && usados.has(x.d)) continue;
    dyn.push({ k: 'd3', nQ: 1, label: `D-${k}`, dia: x, motivo: 'fijo' }); if (x) usados.add(x.d);
  }
  // los dos dinámicos se guardan en los slots 'd3' y 'd7' del registro (compat con `anclas`)
  const slots: MirAnclaSlot[] = [{ k: 'd1', nQ: 2, label: 'D-1', dia: d1, motivo: 'fijo' }, { ...dyn[0], k: 'd3' }, { ...dyn[1], k: 'd7' }];
  const anclasD = { d1: d1?.d, d3: slots[1].dia?.d, d7: slots[2].dia?.d };
  return { slots, anclasD, calientes };
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
/** Temas con fallo en el slot D-7 reprogramados a D+14 (día hábil). `vencida` = ya toca hoy o antes. */
export function mirColaD14(hoyISO_: string, entries: MirEvalEntry[] = leer()): MirColaItem[] {
  const out: MirColaItem[] = [];
  for (const e of entries) {
    if (e.kind !== 'anclada' || !e.anclas || e.anclas.d7 !== false) continue;
    const dTema = mirSlotTemaD(e, 'd7'); const dia = dTema ? mirDiaN(dTema) : undefined;
    if (!dia || dia.d > MIR_TEMAS_TOTAL) continue;
    const fechaObjetivo = addDiasHabiles(e.fecha, 14);
    out.push({ asignatura: dia.asignatura, tema: dia.tema, d: dia.d, fechaFallo: e.fecha, fechaObjetivo, vencida: fechaObjetivo <= hoyISO_ });
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
    const d77 = mirDiaN(77)?.fecha || '';
    return { pct: Math.max(0, Math.round(media)), estado: `${cierres.length}/${nAsig} asignaturas con test de cierre 10Q · neto medio ${Math.round(media)} %${malas ? ` · ${malas} en anclas D-7` : ''}`, siguiente: `mini-MIR 40Q mixto cronometrado (D77${d77 ? `, ${d77.slice(8, 10)}-${d77.slice(5, 7)}` : ''}) = baseline honesto.`, fuente: 'cierre', n: cierres.length };
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
