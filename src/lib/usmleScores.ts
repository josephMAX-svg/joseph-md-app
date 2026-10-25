/**
 * usmleScores.ts — MEDICIÓN diaria del bloque Step 1 (Palmerton v3: "se mide por % ciego, no por horas").
 *
 * Registro por día: aciertos del pre-test 10Q, % de la consolidación 11:00, % de la eval 18:00 timed (en día de
 * hito = % del NBME/UWSA/Free 120), tipo de error dominante (knowledge / transfer / proceso), nivel UWorld del día
 * (DIAS[].nivelUW) y notas.
 *  · Persistencia local: localStorage 'jmd-usmle-scores' (try/catch; sin storage arranca vacío).
 *  · Espejo en Supabase: tabla usmle_daily_scores (upsert por fecha; fallback silencioso si no hay red/tabla).
 *  · Derivados: gate del día (≥80% → SUBE de nivel · <80% → REPITE), media móvil de 7 días, distancia al mínimo
 *    on-track del próximo hito (tabla de DATA/USMLE/PALMERTON_POR_MATERIA.md · Parte V-A: regla del 5%/mes
 *    hacia atrás desde 68% en NBME 31), readiness anclado al último hito registrado y export JSON.
 *  · Gate de HITOS (12-sep-2026, REGLA §E-7): `gateHito` → 'ALERTA BURNOUT' cuando 2 hitos consecutivos con mínimo quedan
 *    bajo mínimo; el protocolo (3-5 días solo Anki AM + sueño) vive en BURNOUT_PROTOCOLO y se pinta en UsmleHub.
 * Regla de lectura (Palmerton): el % de UWorld es gate de PROCESO, no predicción — solo los NBME predicen.
 *  · 2.ª capa Palmerton (19-sep-2026, hallazgos del crítico que son código): lectura del UWSA1 por tramos (#12), PISO_AMBAR 65/60
 *    vs gate 80 (#21), subtemasValidados para el chip N2/N3 (#13), regla del tercio (#8), cambiadas/relecturas (#11), % por bloque
 *    del hito + plantilla por sistema (#27), fixes de tarjeta por tipo de error (#18), checklist §11.5 pre-marcado (#30), día parcial
 *    (§12.6-10) y plan B "worst case" (#26). Los campos nuevos viajan a Supabase en la columna JSONB `extra` (si no existe,
 *    el upsert reintenta sin ella: nunca rompe la UI; DDL pendiente en DATA/_scripts/_migrations).
 *  · v6.00 (6-oct-2026 · V6_ESPEC §B5 · §B4.5 · §F): los 2 tramos (DIAS → DIAS_TODOS en hitosPlan, subtemasValidados, plantillaPorSistema
 *    y checklist115: si no, proximoHito / gateHito / readiness / distanciaOnTrack no ven NBME 29-33, UWSA3, Free 120 ni el GO/NO-GO) ·
 *    HITOS_ONTRACK v6 (NBME 25 sin mínimo · 26/27 relativos a NBME 25 con `minRel` · NBME 28 por tramos 58/50 = checkpoint de fecha ·
 *    NBME 29 ≥ NBME 28 − 5 + alerta de caída > 8 · NBME 30 ≥ NBME 28 · 31 ≥ 65 · 32/33 ≥ 68 · Free 120 ≥ 70 · UWSA3 formativa ·
 *    GO/NO-GO) · campo diario `horas` (horas netas de Step 1, en `extra.horas`; sin migración: la columna JSONB ya existe) ·
 *    horasDesde() y evaluarGoNoGo() = GO/NO-GO por horas (B4.5) + NBME 31/32 (o el criterio del GO/NO-GO #2).
 *  · v6.01 (10-oct-2026): corrimiento del D1 al lun 12-oct (sin lógica nueva): textos de HITOS_ONTRACK con las fechas F1 nuevas
 *    (UWSA1 D1 lun 12-oct · NBME 25 D10 vie 23-oct · NBME 28 D55 lun 28-dic = checkpoint de fecha) y F1 sin C1/C2 en BURNOUT_PROTOCOLO.
 *  · v6.02 (17-oct-2026): corrimiento del D1 al lun 19-oct (sin lógica nueva; los hitos se identifican por `match`, no por D#): UWSA1 D1
 *    lun 19-oct · protocolo Jay D1-D9 lun 19 → jue 29-oct · NBME 25 D10 vie 30-oct · NBME 28 = D52 mié 30-dic (último slot de F1: un hito
 *    de F1 no sale de F1; sigue siendo el checkpoint de fecha).
 *  · v6.03 (20-oct-2026): corrimiento del D1 al mié 21-oct (lun 19 y mar 20 sin estudio; sin lógica nueva): UWSA1 D1 mié 21-oct ·
 *    protocolo Jay D1-D9 mié 21-oct → lun 2-nov · NBME 25 D10 mar 3-nov · NBME 28 = D50 mié 30-dic (último slot de F1).
 *  · v6.05 (24-oct-2026): corrimiento del D1 al lun 26-oct (la semana del 19 sin estudio; sin lógica nueva): UWSA1 D1 lun 26-oct ·
 *    protocolo Jay D1-D9 lun 26-oct → jue 5-nov · NBME 25 D10 vie 6-nov · NBME 28 = D47 mié 30-dic (último slot de F1). Esas fechas ya
 *    no se escriben a mano en HITOS_ONTRACK: salen de las filas de F1 (fF1 / NBME28_TXT), como el examen y el GO/NO-GO salen de FECHAS_V6.
 */
import { supabase } from './supabase';
import { DIAS_TODOS, DiaUSMLE, DAILY_META, USMLE_GATE, esHito, faseDe, esFilaT2 } from './usmleStep1Daily';
import { FECHAS_V6 } from './fechasV6';

export type TipoErrorUW = 'knowledge' | 'transfer' | 'proceso';
/** Fix por categoría (§6.1) + QUÉ TARJETA se hace (§4.4 · §6.2 · §6.5; 2.ª capa #18, 19-sep-2026): la tarjeta apunta al motivo exacto del fallo, nunca al dato aislado. */
export const TIPO_ERROR_INFO: Record<TipoErrorUW, { label: string; corto: string; fix: string; tarjeta: string; color: string }> = {
  knowledge: { label: 'Knowledge gap', corto: 'Knowledge', fix: 'No sabía el hecho/mecanismo → página COMPLETA de First Aid (Whole Page Rule) + tarjeta de mecanismo.', tarjeta: 'Diagnóstico fallado → PC card (cronología fisiopatológica; §4.4: "si fallas el diagnóstico la respuesta es siempre una PC card") · fallo de reconocimiento VISUAL (histo, placa, tira, frotis) → 20 tarjetas de IMAGEN del tema de golpe ("Identify the following…", Image Occlusion) · nunca una tarjeta del dato fallado: la sección completa (§6.5)', color: '#C56A5A' },
  transfer: { label: 'Transfer / interpretación', corto: 'Transfer', fix: 'Sabía la medicina pero no la reconocí con ruido → CCSN, cronología en presente, juez (no abogado), rule-in antes de rule-out.', tarjeta: 'Skills gap (sé el qué, no el cómo: tira de ritmo, vasos en serie/paralelo) → TRANSFER card (dato duro → estado fisiopatológico, §6.2-1) · noise gap (un rasgo atípico me secuestra) → COMPARE & CONTRAST card + juez (§6.2-2) · consistency gap (no ejecuto CCSN/SAQ en el 100 %) → drill hasta "no poder fallar" (§6.2-3)', color: '#C8A96A' },
  proceso: { label: 'Proceso / unforced', corto: 'Proceso', fix: 'Leí rápido, cambié una correcta o me anclé en la 1ª frase → una sola lectura lenta y lineal, cover-the-options, no cambiar salvo error de lectura indiscutible.', tarjeta: 'Sin tarjeta: es hábito, no conocimiento → micro-destreza en la bitácora (§6.4: relectura, última línea primero, respuesta cambiada) y drill de lectura lineal; si se repite ≥2 por bloque → stress set 10Q/12 min (§7.5)', color: '#4F7DD6' },
};
export const TIPOS_ERROR: TipoErrorUW[] = ['knowledge', 'transfer', 'proceso'];

export interface UsmleScore {
  /** ISO YYYY-MM-DD (clave del registro) */
  fecha: string;
  /** día del plan (DIAS[].d) */
  d: number;
  /** aciertos /10 del pre-test ciego 08:15 (Fases B-C: stress set 05:00) */
  pretest10: number | null;
  /** % de la consolidación 11:00 (Fases B-C: % de los bloques timed del día) */
  consol30pct: number | null;
  /** % de la eval 18:00 timed mixta · en día de hito = % del NBME/UWSA/Free 120 */
  evalPct: number | null;
  tipoError: TipoErrorUW | null;
  nivelUW: number | null;
  notas: string;
  /** ISO timestamp de la última edición (gana el más nuevo al fusionar con Supabase) */
  updatedAt: string;
  // ── 2.ª capa (19-sep-2026) · opcionales; en Supabase van dentro del JSONB `extra` ──
  /** #11 §7.4: respuestas CAMBIADAS en los bloques del día (≥2 = alarma "abogado") */
  cambiadas?: number | null;
  /** #11 §7.3: RELECTURAS de una misma pregunta (3-4 = lectura circular) */
  relecturas?: number | null;
  /** #8 §6.1 regla del tercio: fallos totales del día · fallos en temas YA estudiados (>1/3 → parar adquisición) */
  nFallos?: number | null;
  nConocidos?: number | null;
  /** #27 §8.5/§9.1: % por bloque del hito (B1-B4: UWSA 4×40 · NBME 4×50 · Free 120 3×40) */
  bloquesPct?: (number | null)[] | null;
  /** v6.00 (§B4.5): horas NETAS de Step 1 del día (0-16), registradas en el cierre · suman para el GO/NO-GO por horas (extra.horas) */
  horas?: number | null;
}
/** Claves localStorage de la 2.ª capa (try/catch; sin storage no pasa nada). */
const KEY_PARCIAL = 'jmd-usmle-parcial';
const KEY_WORSTCASE = 'jmd-usmle-worstcase';

const KEY = 'jmd-usmle-scores';
const TABLA = 'usmle_daily_scores';

// ── localStorage (try/catch; claves 'jmd-*') ──
function leer(): UsmleScore[] {
  try {
    const ls = (globalThis as any).localStorage;
    if (!ls) return [];
    const raw = ls.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter(esScore).sort((a, b) => a.fecha.localeCompare(b.fecha)) : [];
  } catch { return []; }
}
function escribir(list: UsmleScore[]): void {
  try {
    const ls = (globalThis as any).localStorage;
    if (ls) ls.setItem(KEY, JSON.stringify(list));
  } catch { /* sin storage: solo memoria */ }
}
function esScore(x: any): x is UsmleScore {
  return !!x && typeof x.fecha === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(x.fecha);
}
const clamp = (v: number | null | undefined, max: number): number | null => {
  if (v == null || v === undefined) return null;
  const n = Number(v);
  return isNaN(n) ? null : Math.max(0, Math.min(max, n));
};
function normalizar(s: UsmleScore): UsmleScore {
  return {
    fecha: s.fecha, d: Number(s.d) || 0,
    pretest10: clamp(s.pretest10, 10),
    consol30pct: clamp(s.consol30pct, 100),
    evalPct: clamp(s.evalPct, 100),
    tipoError: s.tipoError && TIPOS_ERROR.includes(s.tipoError) ? s.tipoError : null,
    nivelUW: s.nivelUW == null ? null : Math.min(5, Math.max(1, Math.round(Number(s.nivelUW)) || 1)),
    notas: String(s.notas || '').slice(0, 2000),
    updatedAt: s.updatedAt || new Date().toISOString(),
    cambiadas: clamp(s.cambiadas, 200), relecturas: clamp(s.relecturas, 200),
    nFallos: clamp(s.nFallos, 400), nConocidos: clamp(s.nConocidos, 400),
    bloquesPct: Array.isArray(s.bloquesPct) && s.bloquesPct.some((v) => v != null) ? s.bloquesPct.slice(0, 8).map((v) => clamp(v, 100)) : null,
    horas: clamp(s.horas, 16),
  };
}
/** ¿Trae algún campo de la 2.ª capa? (decide si se envía la columna `extra`) */
function tieneExtra(s: UsmleScore): boolean {
  return s.cambiadas != null || s.relecturas != null || s.nFallos != null || s.nConocidos != null || !!(s.bloquesPct && s.bloquesPct.length) || s.horas != null;
}
function lsGet(key: string): string | null { try { const ls = (globalThis as any).localStorage; return ls ? ls.getItem(key) : null; } catch { return null; } }
function lsSet(key: string, val: string): void { try { const ls = (globalThis as any).localStorage; if (ls) ls.setItem(key, val); } catch { /* sin storage */ } }

// ── suscripción (UsmleHub recalcula la barra cuando UsmleTodayPlan guarda) ──
const listeners = new Set<(s: UsmleScore[]) => void>();
export function onScoresChange(cb: (s: UsmleScore[]) => void): () => void {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}
function emitir(list: UsmleScore[]): void { listeners.forEach((cb) => { try { cb(list); } catch { /* ignore */ } }); }

/** Todos los registros locales, ordenados por fecha. */
export function loadScores(): UsmleScore[] { return leer(); }
export function scoreDe(scores: UsmleScore[], fecha: string): UsmleScore | undefined { return scores.find((s) => s.fecha === fecha); }
/** ¿Tiene algún dato numérico? (un registro vacío no cuenta para medias ni gate) */
export function tieneDatos(s: UsmleScore | undefined | null): boolean {
  return !!s && (s.pretest10 != null || s.consol30pct != null || s.evalPct != null);
}

/** Upsert local por fecha (siempre funciona). Devuelve la lista actualizada. */
export function upsertScoreLocal(s: UsmleScore): UsmleScore[] {
  const n = normalizar({ ...s, updatedAt: new Date().toISOString() });
  const list = leer().filter((x) => x.fecha !== n.fecha);
  list.push(n);
  list.sort((a, b) => a.fecha.localeCompare(b.fecha));
  escribir(list);
  emitir(list);
  return list;
}
export function deleteScoreLocal(fecha: string): UsmleScore[] {
  const list = leer().filter((x) => x.fecha !== fecha);
  escribir(list);
  emitir(list);
  return list;
}

// ── Supabase (fallback silencioso: nunca rompe la UI) ──
function aFila(s: UsmleScore, conExtra: boolean) {
  const base: any = {
    fecha: s.fecha, d: s.d, pretest10: s.pretest10, consol30_pct: s.consol30pct, eval_pct: s.evalPct,
    tipo_error: s.tipoError, nivel_uw: s.nivelUW, notas: s.notas || null, updated_at: s.updatedAt,
  };
  // 2.ª capa: JSONB `extra` (DDL: ALTER TABLE usmle_daily_scores ADD COLUMN IF NOT EXISTS extra JSONB). Si la columna no existe, upsertScore reintenta sin ella.
  // v6.00: + horas (GO/NO-GO por horas, §B4.5) — antes `extra` se sobrescribía con 5 claves fijas y las horas nunca se guardaban.
  if (conExtra && tieneExtra(s)) base.extra = { cambiadas: s.cambiadas ?? null, relecturas: s.relecturas ?? null, nFallos: s.nFallos ?? null, nConocidos: s.nConocidos ?? null, bloquesPct: s.bloquesPct ?? null, horas: s.horas ?? null };
  return base;
}
function deFila(r: any): UsmleScore | null {
  if (!r || typeof r.fecha !== 'string') return null;
  const ex = r.extra && typeof r.extra === 'object' ? r.extra : {};
  return normalizar({
    fecha: r.fecha.slice(0, 10), d: r.d, pretest10: r.pretest10, consol30pct: r.consol30_pct, evalPct: r.eval_pct,
    tipoError: r.tipo_error, nivelUW: r.nivel_uw, notas: r.notas || '', updatedAt: r.updated_at || new Date().toISOString(),
    cambiadas: ex.cambiadas, relecturas: ex.relecturas, nFallos: ex.nFallos, nConocidos: ex.nConocidos, bloquesPct: ex.bloquesPct, horas: ex.horas,
  });
}
/** Guarda local + Supabase. `supabase` = true si el espejo remoto respondió sin error. */
export async function upsertScore(s: UsmleScore): Promise<{ scores: UsmleScore[]; supabase: boolean }> {
  const scores = upsertScoreLocal(s);
  const guardado = scoreDe(scores, s.fecha);
  let ok = false;
  try {
    if (guardado) {
      const { error } = await supabase.from(TABLA).upsert(aFila(guardado, true), { onConflict: 'fecha' });
      ok = !error;
      if (error && tieneExtra(guardado)) {
        // columna `extra` aún sin migrar → segunda pasada sin ella (los campos nuevos quedan solo en local)
        const r2 = await supabase.from(TABLA).upsert(aFila(guardado, false), { onConflict: 'fecha' });
        ok = !r2.error;
      }
    }
  } catch { ok = false; }
  return { scores, supabase: ok };
}
/** Trae Supabase y fusiona con lo local (gana el updatedAt más nuevo). Si falla, devuelve lo local sin tocar nada. */
export async function pullScores(): Promise<UsmleScore[]> {
  const local = leer();
  try {
    const { data, error } = await supabase.from(TABLA).select('*').order('fecha', { ascending: true }).limit(400);
    if (error || !data) return local;
    const map = new Map<string, UsmleScore>();
    for (const x of local) map.set(x.fecha, x);
    let cambio = false;
    for (const r of data as any[]) {
      const remoto = deFila(r);
      if (!remoto) continue;
      const mio = map.get(remoto.fecha);
      if (!mio || (remoto.updatedAt > mio.updatedAt)) { map.set(remoto.fecha, remoto); cambio = true; }
    }
    const merged = Array.from(map.values()).sort((a, b) => a.fecha.localeCompare(b.fecha));
    if (cambio) { escribir(merged); emitir(merged); }
    return merged;
  } catch { return local; }
}

// ── Gate del día (Palmerton: 80% en 10Q consecutivas → subir; si no, repetir) ──
export interface GateDia { estado: 'sube' | 'repite' | 'sin-dato' | 'lectura'; pct: number | null; minimo: number; metrica: string; label: string; detalle: string }
export function gateDelDia(s: UsmleScore | null | undefined, dia: DiaUSMLE): GateDia {
  if (esHito(dia)) {
    const h = hitoOnTrackDe(dia.uw);
    const pct = s?.evalPct ?? null;
    // v6.00: mínimo RESUELTO (minRel → % registrado del hito de referencia + delta)
    const local = leer().filter((x) => !s || x.fecha !== s.fecha).concat(s ? [normalizar({ ...s, updatedAt: s.updatedAt || new Date().toISOString() })] : []);
    const minRes = h ? minimoResuelto(h, local) : null;
    const minimo = minRes ?? USMLE_GATE.pct;
    if (pct == null) return { estado: 'sin-dato', pct, minimo, metrica: `% del ${h?.clave || dia.uw}`, label: '— sin registrar', detalle: minRes != null ? `mínimo on-track ${minRes}% (${h ? minimoTexto(h) : ''})` : h ? minimoTexto(h) + (h.nota ? ` · ${h.nota}` : '') : 'baseline: se lee por tramos, no es gate' };
    const caida = h ? alertaCaidaDe(h, pct, local) : null;
    if (minRes == null) {
      // #12: hitos sin mínimo (UWSA1 baseline, UWSA2 low-risk) se LEEN por tramos; no son gate
      const tr = h ? lecturaHito(h, pct) : null;
      return tr
        ? { estado: 'lectura', pct, minimo, metrica: `% del ${h!.clave}`, label: `● ${pct}% · ${tr.label}`, detalle: tr.accion }
        : { estado: 'sube', pct, minimo, metrica: `% del ${h?.clave || dia.uw}`, label: `✓ ${pct}% registrado`, detalle: (h?.minRel ? `${minimoTexto(h)}: sin % del ${h.minRel.ref} registrado · ` : '') + (h?.nota || 'baseline') };
    }
    if (caida) return { estado: 'repite', pct, minimo: minRes, metrica: `% del ${h!.clave}`, label: caida.label, detalle: caida.accion };
    const ok = pct >= minRes;
    if (!ok && s) {
      // REGLA §E-7: si el hito con mínimo anterior también quedó bajo mínimo → ALERTA BURNOUT (gateHito sobre local + este registro)
      const merged = leer().filter((x) => x.fecha !== s.fecha).concat([normalizar({ ...s, updatedAt: s.updatedAt || new Date().toISOString() })]);
      const gh = gateHito(merged, dia.fecha);
      if (gh.estado === 'ALERTA BURNOUT') return { estado: 'repite', pct, minimo: minRes, metrica: `% del ${h!.clave}`, label: gh.label, detalle: gh.detalle };
    }
    return { estado: ok ? 'sube' : 'repite', pct, minimo: minRes, metrica: `% del ${h!.clave}`, label: ok ? `✓ ON-TRACK · ${pct}% ≥ ${minRes}%` : `✗ BAJO MÍNIMO · ${pct}% < ${minRes}%`, detalle: ok ? 'trayectoria de GO intacta' : 'auditar el MÉTODO esta semana (checklist §G), no sumar horas · un segundo hito bajo mínimo dispara ALERTA BURNOUT (§E-7)' };
  }
  const fase = faseDe(dia.d);
  const pct = fase === 'A' ? (s?.consol30pct ?? null) : (s?.consol30pct ?? s?.evalPct ?? null);
  // #13: en los viernes de nivel 3 el gate se mide SOLO sobre el bloque de 20Q del sistema timed (no sobre las 10Q tutor)
  const metrica = fase === 'A' ? (dia.nivelUW === 3 && !esHito(dia) ? '20Q del sistema TIMED (%) — solo ese bloque' : 'consolidación 11:00') : 'bloques timed del día';
  if (pct == null) return { estado: 'sin-dato', pct, minimo: USMLE_GATE.pct, metrica, label: '— sin registrar', detalle: `gate = ${metrica} ≥ ${USMLE_GATE.pct}%` };
  const ok = pct >= USMLE_GATE.pct;
  return {
    estado: ok ? 'sube' : 'repite', pct, minimo: USMLE_GATE.pct, metrica,
    label: ok ? `✓ SUBIR de nivel · ${pct}% ≥ ${USMLE_GATE.pct}%` : `✗ REPETIR nivel · ${pct}% < ${USMLE_GATE.pct}%`,
    detalle: ok ? 'mañana: siguiente nivel / subtema nuevo con el gate validado' : USMLE_GATE.siFalla,
  };
}

// ── Media móvil 7 días (ventana calendario [hasta-6, hasta] ≈ 5 días hábiles) ──
export interface Media7d { desde: string; hasta: string; n: number; pretestPct: number | null; consolPct: number | null; evalPct: number | null }
function addDias(iso: string, n: number): string {
  try { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); } catch { return iso; }
}
const media = (xs: number[]): number | null => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : null);
export function mediaMovil7d(scores: UsmleScore[], hasta: string): Media7d | null {
  const desde = addDias(hasta, -6);
  const win = scores.filter((s) => s.fecha >= desde && s.fecha <= hasta && tieneDatos(s));
  if (!win.length) return null;
  return {
    desde, hasta, n: win.length,
    pretestPct: media(win.filter((s) => s.pretest10 != null).map((s) => (s.pretest10 as number) * 10)),
    consolPct: media(win.filter((s) => s.consol30pct != null).map((s) => s.consol30pct as number)),
    evalPct: media(win.filter((s) => s.evalPct != null).map((s) => s.evalPct as number)),
  };
}
/** Serie diaria (para mini-gráficos): últimos `n` registros con datos. */
export function serieReciente(scores: UsmleScore[], n = 14): UsmleScore[] { return scores.filter(tieneDatos).slice(-n); }

// ── Hitos y mínimos on-track ──
export const HITOS_ONTRACK_FUENTE = 'V6_ESPEC §B5 (v6.00, 6-oct-2026: mínimos F1 relativos a la línea base real del NBME 25 · NBME 28 = checkpoint de fecha · tramo 2 relativo al NBME 28 y GO/NO-GO por horas + NBME 31/32) sobre DATA/USMLE/PALMERTON_POR_MATERIA.md · Parte V-A (65% ≈ 95% de pase, 70% ≈ 99%)';
/** #12: tramo de LECTURA de un hito sin mínimo (no es gate): [desde, hasta] inclusivos en %. */
export interface HitoTramo { desde?: number; hasta?: number; label: string; accion: string }
export interface HitoOnTrack {
  clave: string; match: RegExp;
  /** mínimo ABSOLUTO (%) · null = sin mínimo absoluto (baseline, lectura por tramos, relativo o decisión) */
  min: number | null;
  nota: string; tramos?: HitoTramo[];
  /** v6.00: mínimo RELATIVO al % registrado de otro hito (p. ej. NBME 26 ≥ NBME 25 + 3); sin ese % → sin mínimo todavía */
  minRel?: { ref: string; delta: number };
  /** v6.00: alerta de caída frente a otro hito (NBME 29: caída > 8 frente al NBME 28 → +2 semanas de reactivación) */
  alertaCaida?: { ref: string; delta: number; accion: string };
}
// v6.04 (21-oct-2026): el examen pasó del lun 27-sep al LUN 25-OCT-2027 (DJ-1 v6.04, decisión de Joseph: misma fecha en todos los escenarios
//   ENCAPS; es el último mes de la elegibilidad ago-sep-oct). Los textos de los tramos del NBME 28 y del GO/NO-GO salen de FECHAS_V6.
const _MES_CORTO = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const _DIA_CORTO = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
/** «lun 25-oct» de una fecha ISO (UTC-noon, sin zonas horarias). */
const fCorta = (iso: string): string => `${_DIA_CORTO[new Date(iso + 'T12:00:00Z').getUTCDay()]} ${+iso.slice(8)}-${_MES_CORTO[+iso.slice(5, 7) - 1]}`;
const EXAMEN_V6 = fCorta(FECHAS_V6.step1.examen);   // lun 25-oct (v6.03: lun 27-sep)
const GONOGO_V6 = fCorta(FECHAS_V6.step1.gonogo);   // lun 6-sep (E-49; v6.03: lun 9-ago)
// v6.05 (24-oct-2026): fechas de F1 DERIVADAS de las filas (antes se reescribían a mano en cada corrimiento): D1 = UWSA1, D9 = fin del
//   protocolo Jay, D10 = NBME 25 y el NBME 28 en el último slot de F1 (hitos anclados).
const F1_FILAS = DIAS_TODOS.filter((x) => !esFilaT2(x));
const fF1 = (d: number): string => { const x = F1_FILAS.find((y) => y.d === d); return x ? fCorta(x.fecha) : 'D' + d; };
const NBME28_F1 = F1_FILAS.find((x) => /NBME 28/.test(x.sub));
const NBME28_TXT = NBME28_F1 ? `D${NBME28_F1.d} ${fCorta(NBME28_F1.fecha)}` : 'último slot de F1';
export const HITOS_ONTRACK: HitoOnTrack[] = [
  { clave: 'UWSA1', match: /Self-Assessment 1|UWSA1/i, min: null, nota: `baseline (D1, ${fF1(1)}): no es gate, se LEE por tramos — <40 % protocolo Jay · 40-48 % justo · ≥48 % on-track (Parte V-A · §12.4 · §12.6-8)`, tramos: [
    { hasta: 39, label: '<40 % · PROTOCOLO JAY', accion: `D1-D9 (${fF1(1)} → ${fF1(9)}, hasta el NBME 25 = D10 ${fF1(10)}) a 20 Q/día untimed estilo Jay/Melody (§12.6-8, divergencia #2: se decide el mismo ${fF1(1)} con el % real); tarjetas propias del porqué, todos los due reviews a primera hora, CCSN. El temario NO se toca.` },
    { desde: 40, hasta: 47, label: '40-48 % · JUSTO', accion: `Trayectoria posible pero sin margen: con la regla del 5 %/mes un baseline <45-48 % hace difícil el 70 % (§12.4 "Goldilocks check"). Volumen del plan sin subir; auditar el método cada viernes (checklist §11.5); el NBME 25 (D10, ${fF1(10)}) decide si se aplica Jay.` },
    { desde: 48, label: '≥48 % · ON-TRACK', accion: 'Trayectoria de GO (Parte V: ~48 % ya es trayectoria de GO); seguir el plan tal cual y no leer el UWSA como predicción (sobreestima 10-15 puntos).' },
  ] },
  { clave: 'NBME 25', match: /NBME (CBS Form )?25\b/i, min: null, nota: 'línea base REAL del NBME (sin mínimo): los mínimos de NBME 26 y 27 se calculan sobre este %' },
  { clave: 'NBME 26', match: /NBME (CBS Form )?26\b/i, min: null, minRel: { ref: 'NBME 25', delta: 3 }, nota: '≥ NBME 25 + 3' },
  { clave: 'NBME 27', match: /NBME (CBS Form )?27\b/i, min: null, minRel: { ref: 'NBME 25', delta: 6 }, nota: '≥ NBME 25 + 6 · gate 1 ECFMG pide ≥55%' },
  { clave: 'NBME 28', match: /NBME (CBS Form )?28\b/i, min: null, nota: `CHECKPOINT DE FECHA (${NBME28_TXT} = última sesión de F1, §B5): se lee por tramos`, tramos: [
    // v6.04: la base YA es el último mes de la elegibilidad (v6.00-v6.03: <50 % movía la base del 27-sep al plan B 25-oct)
    { hasta: 49, label: `<50 % · ${EXAMEN_V6} SIN MARGEN`, accion: `La base ya es el ${EXAMEN_V6}-${FECHAS_V6.step1.examen.slice(0, 4)} (DJ-1 v6.04, último mes de la elegibilidad): no hay fecha posterior dentro de la ventana → decidirlo con Joseph al registrar el NBME 28 (extensión de la elegibilidad nov-dic-ene, la única permitida, §B5); el temario no se toca.` },
    { desde: 50, hasta: 57, label: `50-57 % · ${EXAMEN_V6} con GATE ESTRICTO`, accion: `Base ${EXAMEN_V6} con gate estricto: el GO/NO-GO exige además NBME 30 ≥ NBME 28 + 5.` },
    { desde: 58, label: `≥58 % · EN RUTA ${EXAMEN_V6}`, accion: `Base ${EXAMEN_V6} en ruta: seguir el plan; reservar el ${EXAMEN_V6} (DJ-1) al salir la convocatoria.` },
  ] },
  { clave: 'NBME 29', match: /NBME (CBS Form )?29\b/i, min: null, minRel: { ref: 'NBME 28', delta: -5 }, alertaCaida: { ref: 'NBME 28', delta: 8, accion: 'CAÍDA > 8 puntos frente al NBME 28 tras la pausa → +2 semanas de REACTIVACIÓN (las paga el colchón, §B5)' }, nota: 'NUEVA LÍNEA BASE tras la pausa ENCAPS: ≥ NBME 28 − 5' },
  { clave: 'NBME 30', match: /NBME (CBS Form )?30\b/i, min: null, minRel: { ref: 'NBME 28', delta: 0 }, nota: '≥ NBME 28 · ritmo medido ≥ 18 h/sem (§B4.5) · con NBME 28 en 50-57 % el GO/NO-GO exige NBME 30 ≥ NBME 28 + 5' },
  { clave: 'UWSA3', match: /UWSA3|Self-Assessment 3/i, min: null, nota: 'formativa (opcional, sin mínimo)' },
  { clave: 'NBME 31', match: /NBME (CBS Form )?31\b/i, min: 65, nota: 'GO/NO-GO: NBME 31 y 32 ≥ 68 % con uno ≥ 70 % + horas (§B4.5)' },
  { clave: 'NBME 32', match: /NBME (CBS Form )?32\b/i, min: 68, nota: '31 y 32 ≥ 68 %, uno ≥ 70 % (GO/NO-GO del lunes siguiente)' },
  { clave: 'UWSA2', match: /UWSA2|Self-Assessment 2/i, min: null, nota: '"low risk" (señal secundaria) · el UWSA sobreestima: la fecha la deciden los NBME y las horas' },
  // v6.04: con el examen 25-oct el ensayo de 7 bloques es el Free 120 + 4 bloques (vie 8-oct, feriado) y el NBME 33 va solo (lun 27-sep, E-28);
  //   v6.00-v6.03 (examen 27-sep): NBME 33 + 3 bloques (lun 30-ago) y < 65 % → 25-oct pagando recargo.
  { clave: 'NBME 33', match: /NBME (CBS Form )?33\b/i, min: 68, nota: `E-28 (base ${EXAMEN_V6}) · < 65 % → mover la fecha pagando recargo (DJ-1 v6.04: ya no hay fecha posterior dentro de la elegibilidad → extensión, §B5)` },
  { clave: 'Free 120', match: /Free 120/i, min: 70, nota: '≥70% = heurística comunitaria, no cifra Palmerton · v6.04: es el ensayo de 7 bloques (Free 120 + 4 bloques) · desde aquí 0 preguntas y 0 tarjetas nuevas (cierre §B6)' },
  { clave: 'GO/NO-GO', match: /GO\/NO-GO/i, min: null, nota: `DECISIÓN (E-49, ${GONOGO_V6}): horas reales ≥ umbral (B4.5: 294 h al ${EXAMEN_V6}) y NBME 31 y 32 ≥ 68 % con uno ≥ 70 % → GO; si no, NO-GO = mover la fecha (gratis antes del E-46; con la DJ-1 v6.04 no queda fecha posterior dentro de la elegibilidad → extensión, §B5)` },
];
/** Ficha on-track de un hito por su `uw` (o nombre). */
export function hitoOnTrackDe(uw: string): HitoOnTrack | undefined { return HITOS_ONTRACK.find((t) => t.match.test(uw)); }
/** Mínimo en texto (para el Home / hitosStep1): «≥65%» · «≥ NBME 25 +3» · «lectura por tramos» · nota. */
export function minimoTexto(h: HitoOnTrack): string {
  if (h.min != null) return `≥${h.min}%`;
  if (h.minRel) return h.minRel.delta === 0 ? `≥ ${h.minRel.ref}` : `≥ ${h.minRel.ref} ${h.minRel.delta > 0 ? '+' : '−'}${Math.abs(h.minRel.delta)}`;
  if (h.clave === 'GO/NO-GO') return 'horas ≥ umbral B4.5 + NBME 31/32 ≥68% (uno ≥70%)';
  if (h.tramos?.length) return 'lectura por tramos';
  return h.nota.split(' (')[0]?.split(':')[0] || 'sin mínimo';
}
/** % registrado (evalPct del día del hito) de un hito por su clave · null si no está registrado. */
export function valorHito(scores: UsmleScore[], clave: string): number | null {
  for (const x of DIAS_TODOS) {
    if (!esHito(x)) continue;
    const h = hitoOnTrackDe(x.uw);
    if (h?.clave !== clave) continue;
    const v = scoreDe(scores, x.fecha)?.evalPct;
    if (v != null) return v;
  }
  return null;
}
/** Mínimo efectivo de un hito: absoluto, o relativo resuelto con el % registrado del hito de referencia (null si aún no se puede). */
export function minimoResuelto(h: HitoOnTrack, scores: UsmleScore[]): number | null {
  if (h.min != null) return h.min;
  if (h.minRel) { const ref = valorHito(scores, h.minRel.ref); return ref == null ? null : Math.round(ref + h.minRel.delta); }
  return null;
}
/** Alerta de caída (NBME 29 vs NBME 28): null si no aplica o no hay datos. */
export function alertaCaidaDe(h: HitoOnTrack, pct: number, scores: UsmleScore[]): { label: string; accion: string } | null {
  if (!h.alertaCaida) return null;
  const ref = valorHito(scores, h.alertaCaida.ref);
  if (ref == null || ref - pct <= h.alertaCaida.delta) return null;
  return { label: `⚠ CAÍDA ${Math.round(ref - pct)} pts · ${h.clave} ${pct}% vs ${h.alertaCaida.ref} ${ref}%`, accion: h.alertaCaida.accion };
}
/** #12: tramo que corresponde a un % en un hito con `tramos` (UWSA1, NBME 28); null si el hito no se lee por tramos. */
export function lecturaHito(h: HitoOnTrack, pct: number): HitoTramo | null {
  if (!h.tramos || !h.tramos.length) return null;
  return h.tramos.find((t) => (t.desde == null || pct >= t.desde) && (t.hasta == null || pct <= t.hasta)) || null;
}
export interface HitoPlan {
  d: number; fecha: string; uw: string; sub: string; clave: string; min: number | null; nota: string; valor: number | null;
  estado: 'pendiente' | 'registrado' | 'on-track' | 'bajo';
  /** #12: etiqueta del tramo cuando el hito se lee por tramos */ tramo?: string;
  /** v6.00: 'decision' = el GO/NO-GO (fila con `gate`; sin % propio: se evalúa con evaluarGoNoGo) */
  tipo: 'hito' | 'decision';
  /** v6.00: etiqueta del día del plan («D10» en F1 · «T51» en el tramo 2) */
  etiqueta: string;
  /** v6.00: mínimo en texto (relativo, tramos o absoluto) */
  minTexto: string;
}
const etiquetaD = (x: DiaUSMLE): string => (esFilaT2(x) ? `T${x.t}` : `D${x.d}`);
/** Serie de hitos del plan (DIAS_TODOS con 🎯 + la decisión GO/NO-GO) cruzada con la tabla de mínimos y el % registrado. */
export function hitosPlan(scores: UsmleScore[]): HitoPlan[] {
  const out: HitoPlan[] = [];
  for (const x of DIAS_TODOS) {
    if (esHito(x)) {
      const h = hitoOnTrackDe(x.uw);
      const s = scoreDe(scores, x.fecha);
      const valor = s?.evalPct ?? null;
      const min = h ? minimoResuelto(h, scores) : null;
      const estado: HitoPlan['estado'] = valor == null ? 'pendiente' : min == null ? 'registrado' : valor >= min ? 'on-track' : 'bajo';
      const tr = h && valor != null ? lecturaHito(h, valor) : null;
      const nombre = esFilaT2(x) && x.nombre ? x.nombre : (h?.clave || x.uw);
      out.push({ d: x.d, fecha: x.fecha, uw: x.uw, sub: x.sub, clave: h?.clave || nombre, min, nota: h?.nota || '', valor, estado, tramo: tr?.label, tipo: 'hito', etiqueta: etiquetaD(x), minTexto: h ? minimoTexto(h) : '—' });
    }
    if (esFilaT2(x) && x.gate) {
      const g = HITOS_ONTRACK.find((h) => h.clave === 'GO/NO-GO');
      const ev = evaluarGoNoGo(scores, x.fecha, x.gate);
      out.push({ d: x.d, fecha: x.fecha, uw: x.gate, sub: x.gate, clave: x.gate.startsWith('GO/NO-GO #2') ? 'GO/NO-GO #2' : 'GO/NO-GO', min: null, nota: g?.nota || '', valor: null,
        estado: ev.estado === 'pendiente' ? 'pendiente' : ev.estado === 'GO' ? 'on-track' : 'bajo', tipo: 'decision', etiqueta: etiquetaD(x), minTexto: g ? minimoTexto(g) : 'B4.5' });
    }
  }
  return out;
}
export function proximoHito(scores: UsmleScore[], fecha: string): HitoPlan | null {
  return hitosPlan(scores).find((h) => h.fecha >= fecha) || null;
}
export function ultimoHitoRegistrado(scores: UsmleScore[]): HitoPlan | null {
  const hs = hitosPlan(scores).filter((h) => h.valor != null);
  return hs.length ? hs[hs.length - 1] : null;
}
export interface DistanciaOnTrack { hito: HitoPlan; referencia: 'último hito' | 'media 7d timed'; valor: number; delta: number; texto: string }
/**
 * Distancia al mínimo on-track del PRÓXIMO hito con mínimo. Referencia = media 7d de la eval timed (proxy diario);
 * si no hay media, el último hito registrado. null si no hay datos (la barra no muestra nada).
 */
export function distanciaOnTrack(scores: UsmleScore[], fecha: string): DistanciaOnTrack | null {
  const next = hitosPlan(scores).find((h) => h.fecha >= fecha && h.min != null);
  if (!next || next.min == null) return null;
  const m = mediaMovil7d(scores, fecha);
  const ult = ultimoHitoRegistrado(scores);
  let referencia: DistanciaOnTrack['referencia'];
  let valor: number;
  if (m && m.evalPct != null) { referencia = 'media 7d timed'; valor = m.evalPct; }
  else if (ult && ult.valor != null) { referencia = 'último hito'; valor = ult.valor; }
  else return null;
  const delta = Math.round(valor - next.min);
  const signo = delta >= 0 ? '+' : '';
  return { hito: next, referencia, valor, delta, texto: `${next.clave} (${next.fecha.slice(5)}): mín ${next.min}% · ${referencia} ${valor}% → ${signo}${delta} pts` };
}
/** Readiness anclado al último hito registrado (sustituye el 4% hardcodeado cuando hay data). */
export function readinessDesdeHitos(scores: UsmleScore[]): { pct: number; label: string } | null {
  const u = ultimoHitoRegistrado(scores);
  if (!u || u.valor == null) return null;
  const ok = u.min == null ? '' : u.valor >= u.min ? ' ✓' : ' ✗';
  return { pct: Math.round(u.valor), label: `${u.clave} (${u.fecha.slice(5)}): ${Math.round(u.valor)}%${u.min != null ? ` · mín ${u.min}%${ok}` : ' · baseline'}` };
}

// ── Gate de HITOS + protocolo de burnout (DIVERGENCIAS #29 → REGLA §E-7 · METODO §9.12) · 12-sep-2026 ──
/**
 * REGLA (no propuesta): 2 hitos consecutivos bajo su mínimo on-track + síntomas → 3-5 días con SOLO Anki AM + sueño.
 * La señal la calcula `gateHito`; los síntomas los pone Joseph. Texto de PALMERTON_METODO_COMPLETO.md §9.12; nada estimado.
 */
export const BURNOUT_PROTOCOLO = {
  // v6.00 (§B7.1): ya no hay corrimiento diario → la pausa la pagan las filas COLCHÓN; agotadas, decide el GO/NO-GO.
  // v6.01 (10-oct): F1 sin C1/C2 (consumidos por el corrimiento al lun 12-oct) → en F1 el día parado pasa al tramo 2 el jue 31-dic (disparador (f)).
  // v6.02 (17-oct): igual con D1 lun 19-oct (F1 D1-D52); el colchón del tramo 2 queda en 28 filas.
  // v6.03 (20-oct): igual con D1 mié 21-oct (F1 D1-D50); el colchón del tramo 2 baja a 24 filas (≈ 63 h al piso).
  // v6.05 (24-oct): igual con D1 lun 26-oct (F1 D1-D47); con el examen del 25-oct el colchón del tramo 2 queda en 42 filas (≈ 110 h al piso).
  regla: '2 hitos consecutivos bajo su mínimo on-track + síntomas de burnout (releer el mismo párrafo sin comprender, irritabilidad extrema, indiferencia por el examen, descansos de 5 min que se vuelven de 1 h) → 3-5 días con SOLO Anki AM (30-45 min de tarjetas viejas) + sueño. Frenar QBank y contenido nuevo. La pausa se paga con filas COLCHÓN (en F1 no hay: el día pasa al tramo 2 el jue 31-dic y allí lo absorbe el colchón): no se recorta ni se fusiona temario; agotado el colchón, decide el GO/NO-GO. Se reanuda por el gate del 80%, no por la fecha.',
  pasos: [
    'Frenar el QBank: seguir haciendo preguntas consolida malos hábitos de lectura bajo estrés',
    'Parar la adquisición: sin vídeos, sin temas nuevos, sin tarjetas nuevas',
    'Mantenimiento mínimo: 30-45 min/día de Anki viejo (la franja de las 05:00) y nada más',
    'Recuperación con flow: 3-5 días de descanso activo (correr, journaling, meditación, cenas familiares); Palmerton da 3-7',
    'Cada día parado = una fila atrasada que se hace en la próxima fila COLCHÓN (F1: pasa al tramo 2 el jue 31-dic, disparador (f)): el temario no se toca y el examen no se mueve por un día perdido (§B7.1)',
    `Reanudar por el gate (80% en 10Q del último subtema validado); si el siguiente hito vuelve a quedar bajo mínimo → lo decide el GO/NO-GO (E-49, ${GONOGO_V6}): examen ${EXAMEN_V6} (DJ-1 v6.04) o, con NO-GO, extensión de la elegibilidad (nov-dic-ene, §B5); nunca se recorta temario`,
    'Burnout ≠ depresión (Palmerton): si el deseo cumplido lo disolvería es burnout; si no, buscar ayuda profesional (sábado, nunca sacrificando sueño)',
  ],
  fuente: 'DATA/USMLE/PALMERTON_METODO_COMPLETO.md §9.12 · PALMERTON_DIVERGENCIAS_PLAN.md #29 y §E-7 · README §3b',
};
export interface GateHito {
  estado: 'sin-dato' | 'on-track' | 'bajo' | 'ALERTA BURNOUT';
  /** hito evaluado (último con mínimo registrado, o el de `fecha`) */
  hito: HitoPlan | null;
  /** hito con mínimo inmediatamente anterior (UWSA1/UWSA2 no tienen mínimo y no cuentan) */
  previo: HitoPlan | null;
  label: string; detalle: string;
}
/**
 * Gate de HITOS (no del día): evalúa el último hito CON mínimo registrado (o el de `fecha` si se pasa) contra su mínimo
 * on-track y mira el hito con mínimo anterior. Dos consecutivos bajo mínimo → 'ALERTA BURNOUT' (REGLA §E-7).
 * Los hitos sin mínimo (UWSA1 baseline, UWSA2 "low risk") no rompen ni cuentan la secuencia.
 */
export function gateHito(scores: UsmleScore[], fecha?: string): GateHito {
  const conMin = hitosPlan(scores).filter((h) => h.min != null);
  let idx = fecha ? conMin.findIndex((h) => h.fecha === fecha) : -1;
  if (idx < 0) { for (let i = conMin.length - 1; i >= 0; i--) if (conMin[i].valor != null) { idx = i; break; } }
  if (idx < 0) return { estado: 'sin-dato', hito: null, previo: null, label: '— sin hitos con mínimo registrados', detalle: 'registra el % del NBME el día del hito en 📏 Medición (campo eval)' };
  const hito = conMin[idx];
  const previo = idx > 0 ? conMin[idx - 1] : null;
  if (hito.valor == null) return { estado: 'sin-dato', hito, previo, label: `${hito.clave}: sin registrar`, detalle: `mínimo on-track ${hito.min}%` };
  const bajo = hito.estado === 'bajo';
  const previoBajo = !!previo && previo.estado === 'bajo';
  if (bajo && previoBajo && previo) {
    return {
      estado: 'ALERTA BURNOUT', hito, previo,
      label: `⚠ ALERTA BURNOUT · ${previo.clave} ${Math.round(previo.valor as number)}% < ${previo.min}% y ${hito.clave} ${Math.round(hito.valor)}% < ${hito.min}% (2 hitos seguidos bajo mínimo)`,
      detalle: BURNOUT_PROTOCOLO.regla,
    };
  }
  if (bajo) return { estado: 'bajo', hito, previo, label: `✗ ${hito.clave} bajo mínimo · ${Math.round(hito.valor)}% < ${hito.min}%`, detalle: 'auditar el MÉTODO esta semana (checklist §G), no sumar horas · si el siguiente hito con mínimo también queda bajo → ALERTA BURNOUT (§E-7)' };
  return { estado: 'on-track', hito, previo, label: `✓ ${hito.clave} on-track · ${Math.round(hito.valor)}% ≥ ${hito.min}%`, detalle: 'trayectoria de GO intacta' };
}
/** true cuando el último hito con mínimo registrado y el anterior quedaron ambos bajo mínimo (REGLA §E-7). */
export function alertaBurnout(scores: UsmleScore[]): boolean { return gateHito(scores).estado === 'ALERTA BURNOUT'; }

// ── 2.ª capa Palmerton (19-sep-2026): pisos ámbar · subtemas validados · regla del tercio · abogado · checklist §11.5 · día parcial · plan B ──
/**
 * #21 Dos umbrales para la misma métrica: el gate de PROGRESIÓN es 80 % (USMLE_GATE, decide subir/repetir nivel);
 * 65 % (30Q) / 60 % (eval) son PISOS ÁMBAR de la semana (REVISION_SEMANAL · PROTOCOLO_MODO_MINIMO): por debajo la semana
 * está en rojo aunque el gate diario se repita con normalidad. Una sola fuente para barra, revisión semanal y modo mínimo.
 */
export const PISO_AMBAR = { consol: 65, eval: 60, fuente: 'DATA/REVISION_SEMANAL.md (on-track 30Q ≥65 % · eval ≥60 %) · DATA/PROTOCOLO_MODO_MINIMO.md (eval <60 % dos días seguidos = ÁMBAR) · gate de progresión 80 % = USMLE_GATE' };
export type Semaforo = 'verde' | 'ambar' | 'rojo' | 'sin-dato';
/** verde ≥ gate 80 % · ámbar ≥ piso (65 consol / 60 eval) · rojo por debajo del piso. */
export function semaforoPct(pct: number | null | undefined, metrica: 'consol' | 'eval'): Semaforo {
  if (pct == null) return 'sin-dato';
  return pct >= USMLE_GATE.pct ? 'verde' : pct >= PISO_AMBAR[metrica] ? 'ambar' : 'rojo';
}

/** #13: subtemas del MISMO sistema ya validados (consol ≥80 % en días de nivel 1-2 anteriores) → "x/3" del umbral de nivel 2 (≥3 subtemas). */
export function subtemasValidados(scores: UsmleScore[], dia: DiaUSMLE): { n: number; objetivo: number; dias: number[]; total: number } {
  const previos = DIAS_TODOS.filter((x) => x.system === dia.system && x.d < dia.d && !esHito(x) && (x.nivelUW === 1 || x.nivelUW === 2));
  const dias = previos.filter((x) => { const s = scoreDe(scores, x.fecha); return s?.consol30pct != null && s.consol30pct >= USMLE_GATE.pct; }).map((x) => x.d);
  return { n: dias.length, objetivo: 3, dias, total: previos.length };
}

/** #8 §6.1 REGLA DEL TERCIO: >1/3 de los fallos de la ventana (7 d) en temas YA estudiados → parar adquisición, entrenar solo lectura. */
export interface ReglaTercio { estado: 'sin-dato' | 'ok' | 'ALARMA'; fallos: number; conocidos: number; frac: number | null; n: number; label: string; detalle: string }
export function reglaDelTercio(scores: UsmleScore[], hasta: string): ReglaTercio {
  const desde = addDias(hasta, -6);
  const win = scores.filter((s) => s.fecha >= desde && s.fecha <= hasta && s.nFallos != null && (s.nFallos as number) > 0);
  const fallos = win.reduce((a, s) => a + (s.nFallos || 0), 0);
  const conocidos = win.reduce((a, s) => a + (s.nConocidos || 0), 0);
  if (!fallos) return { estado: 'sin-dato', fallos: 0, conocidos: 0, frac: null, n: win.length, label: '⅓ · sin datos', detalle: 'registra en 📏 Medición los fallos del día y cuántos fueron en temas YA estudiados' };
  const frac = conocidos / fallos;
  const alarma = frac > 1 / 3;
  return {
    estado: alarma ? 'ALARMA' : 'ok', fallos, conocidos, frac, n: win.length,
    label: `⅓ · ${Math.round(frac * 100)}% de los fallos en temas conocidos (${conocidos}/${fallos} · ${win.length} d)`,
    detalle: alarma ? 'REGLA DEL TERCIO (§6.1): >1/3 de los fallos son de temas que ya conoces → estudiar más horas BAJARÁ el score: suspender adquisición (sin vídeo ni subtema nuevo) y entrenar solo lectura/interpretación (CCSN · SAQ · juez) hasta bajar de 1/3' : 'bajo 1/3: la adquisición sigue (§6.1)',
  };
}
/** #11 §7.4: ≥2 respuestas cambiadas en el día = "abogado" (60-70 % de los cambios van de correcta a incorrecta). */
export function alarmaAbogado(s: UsmleScore | null | undefined): boolean { return !!s && s.cambiadas != null && s.cambiadas >= 2; }
/** #11 §7.3: ≥3 relecturas de una misma pregunta = lectura circular. */
export function alarmaRelectura(s: UsmleScore | null | undefined): boolean { return !!s && s.relecturas != null && s.relecturas >= 3; }

/** #16 §4.10 (HitosSerie): freno del backlog ligado al hito. */
export const REGLA_BACKLOG_HITO = 'Hito bajo su mínimo + backlog Anki > 0 → nuevas = 0 hasta limpiar (cap 200/día, nunca Forget en bloque); % estancado o en declive = misma regla. Métrica semanal: días con backlog > 0 (regla del 100 %). Fuente: PALMERTON_METODO_COMPLETO.md §4.10.';

/** §12.6-10 · día PARCIAL (modo ROJO de PROTOCOLO_MODO_MINIMO: solo Anki AM + 10Q pre-test). Cuenta como día perdido (v6.00: la fila va al COLCHÓN; ya no hay corrimiento), pero cumple el mínimo no-zero-day. */
export function diasParciales(): string[] {
  try { const arr = JSON.parse(lsGet(KEY_PARCIAL) || '[]'); return Array.isArray(arr) ? arr.filter((x: any) => typeof x === 'string').sort() : []; } catch { return []; }
}
export function esParcial(fecha: string): boolean { return diasParciales().includes(fecha); }
export function marcarParcial(fecha: string, on: boolean): string[] {
  const set = new Set(diasParciales());
  if (on) set.add(fecha); else set.delete(fecha);
  const list = Array.from(set).sort();
  lsSet(KEY_PARCIAL, JSON.stringify(list));
  return list;
}
/** #26 · plan B / peor escenario (Worst-Case Scenario Planning §7.6-1), escrito ANTES del primer bloque del UWSA1. Solo local. */
export function loadWorstCase(): string { return lsGet(KEY_WORSTCASE) || ''; }
export function saveWorstCase(texto: string): void { lsSet(KEY_WORSTCASE, String(texto || '').slice(0, 4000)); }

/** #27 · plantilla del reporte POR SISTEMA del hito (sistemas ya estudiados hasta ese día, derivados de DIAS_TODOS) para pegar en notas. */
export function plantillaPorSistema(dia: DiaUSMLE): string {
  const vistos: string[] = [];
  for (const x of DIAS_TODOS) { if (x.d >= dia.d) break; if (esHito(x) || /Assessment|Sprint|Banco|Colchón|Reentrada/i.test(x.system)) continue; if (!vistos.includes(x.system)) vistos.push(x.system); }
  const cab = `Reporte por sistema · ${dia.uw} (≥80 % en lo YA estudiado, §9.1; pocos ítems por materia → leer con cautela):`;
  if (!vistos.length) return `${cab}\n(baseline: ningún sistema estudiado aún → anotar los 3 sistemas más bajos para priorizar la shopping list)`;
  return `${cab}\n${vistos.map((v) => `· ${v}: __ % (n=__)`).join('\n')}\n· sistemas NO estudiados aún: __ % (informativo)\n· ítems experimentales/gráficos separados: __`;
}

/** #30 · checklist §11.5 pre-marcado con los datos de la semana (ventana [hasta-6, hasta]). `marcada: null` = sin datos para decidir. */
export interface AlarmaChecklist { clave: string; texto: string; marcada: boolean | null; evidencia: string }
export function checklist115(scores: UsmleScore[], hasta: string): AlarmaChecklist[] {
  const desde = addDias(hasta, -6);
  const win = scores.filter((s) => s.fecha >= desde && s.fecha <= hasta && tieneDatos(s));
  const gatesFallidos = win.filter((s) => { const d = DIAS_TODOS.find((x) => x.fecha === s.fecha); return !!d && !esHito(d) && s.consol30pct != null && s.consol30pct < USMLE_GATE.pct; });
  const conCamb = win.filter((s) => s.cambiadas != null); const camb = conCamb.filter((s) => alarmaAbogado(s));
  const conRel = win.filter((s) => s.relecturas != null); const rel = conRel.filter((s) => alarmaRelectura(s));
  const tercio = reglaDelTercio(scores, hasta);
  const parciales = diasParciales().filter((f) => f >= desde && f <= hasta);
  const evalBajo = win.filter((s) => s.evalPct != null && (s.evalPct as number) < PISO_AMBAR.eval);
  const f = (xs: UsmleScore[]) => xs.map((s) => s.fecha.slice(5)).join(', ');
  return [
    { clave: 'gate', texto: 'Estudié un subtema y no llegué al 80 % en 10Q dentro de 24-48 h → Four Critical Adjustments, no avanzar', marcada: win.length ? gatesFallidos.length > 0 : null, evidencia: gatesFallidos.length ? `gate <80 %: ${f(gatesFallidos)}` : win.length ? `${win.length} d con gate ≥80 %` : 'sin mediciones esta semana' },
    { clave: 'tercio', texto: '>1/3 de mis fallos son de temas que ya conozco → parar adquisición, entrenar solo interpretación', marcada: tercio.estado === 'sin-dato' ? null : tercio.estado === 'ALARMA', evidencia: tercio.label },
    { clave: 'abogado', texto: 'Cambio respuestas por sensación de duda (abogado) — ≥2 cambiadas/día', marcada: conCamb.length ? camb.length > 0 : null, evidencia: camb.length ? `≥2 cambiadas: ${f(camb)}` : conCamb.length ? 'sin días con ≥2 cambiadas' : 'campo "cambiadas" sin registrar' },
    { clave: 'relectura', texto: 'Lectura circular (3-4 relecturas) / paso >2 min de forma habitual', marcada: conRel.length ? rel.length > 0 : null, evidencia: rel.length ? `≥3 relecturas: ${f(rel)}` : conRel.length ? 'sin lectura circular' : 'campo "relecturas" sin registrar' },
    { clave: 'evalPiso', texto: `Eval 18:00 bajo el piso ámbar (${PISO_AMBAR.eval} %) — dos días seguidos = ÁMBAR (modo mínimo)`, marcada: win.some((s) => s.evalPct != null) ? evalBajo.length >= 2 : null, evidencia: evalBajo.length ? `<${PISO_AMBAR.eval} %: ${f(evalBajo)}` : 'eval ≥ piso toda la semana' },
    { clave: 'parcial', texto: 'Días PARCIALES (ROJO: solo Anki + 10Q) esta semana → cuentan como perdidos: su fila va a la próxima fila COLCHÓN (v6.00)', marcada: parciales.length > 0, evidencia: parciales.length ? parciales.map((x) => x.slice(5)).join(', ') : 'ninguno' },
    { clave: 'hardEasy', texto: 'Uso Hard/Easy con frecuencia o pulso Good sin poder explicar el mecanismo (AnkiConnect rated:1:2 / rated:1:4)', marcada: null, evidencia: 'lo mide anki_telemetria.js (fuera de la app · pendiente #30)' },
    { clave: 'backlog', texto: 'Revisiones vencidas acumuladas → nuevas = 0, cap 200, protocolo de backlog', marcada: null, evidencia: 'DATA/USMLE/_anki_telemetria.json (fuera de la app)' },
  ];
}

// ── v6.00 (6-oct-2026 · V6_ESPEC §B4.5): GO/NO-GO por HORAS (además del criterio NBME de §B5) ──
/** Umbral de horas reales acumuladas desde el reinicio (usmle_daily_scores.extra.horas) por fecha de examen, y checkpoints de ritmo. */
export interface UmbralGoNoGo { examen: string; gonogo: string; quedanPiso: number; umbral: number; checkpoints: { fecha: string; requerido: number }[] }
export const GONOGO_HORAS: UmbralGoNoGo[] = [
  { examen: '2027-08-31', gonogo: '2027-07-13', quedanPiso: 109, umbral: 290, checkpoints: [{ fecha: '2027-05-31', requerido: 192 }, { fecha: '2027-06-30', requerido: 264 }] },
  { examen: '2027-09-27', gonogo: '2027-08-09', quedanPiso: 106, umbral: 294, checkpoints: [{ fecha: '2027-05-31', requerido: 127 }, { fecha: '2027-06-30', requerido: 199 }, { fecha: '2027-07-31', requerido: 276 }] },
  { examen: '2027-10-25', gonogo: '2027-09-06', quedanPiso: 106, umbral: 294, checkpoints: [{ fecha: '2027-05-31', requerido: 62 }, { fecha: '2027-06-30', requerido: 134 }, { fecha: '2027-07-31', requerido: 211 }] },
];
/** Horas netas de Step 1 registradas (extra.horas) en [desde, hasta] (por defecto desde el reinicio del tramo 2). */
export function horasDesde(scores: UsmleScore[], desde: string = FECHAS_V6.step1.reinicio, hasta?: string): number {
  return Math.round(scores.filter((s) => s.fecha >= desde && (!hasta || s.fecha <= hasta) && s.horas != null).reduce((a, s) => a + (s.horas as number), 0) * 100) / 100;
}
export interface EvalGoNoGo {
  estado: 'GO' | 'NO-GO' | 'pendiente';
  tipo: 'GO/NO-GO (E-49)' | 'GO/NO-GO #2 (E-49)';
  examen: string; gonogo: string; umbral: number; horas: number; horasOk: boolean;
  /** criterio de hitos: NBME 31/32 (#1) o UWSA2/UWSA3 · NBME 33 (#2) */
  criterios: { texto: string; ok: boolean | null }[];
  checkpoints: { fecha: string; requerido: number; real: number | null; ok: boolean | null }[];
  texto: string;
}
/**
 * GO/NO-GO (§B4.5 + §B5): GO = horas reales acumuladas desde el reinicio ≥ umbral de la fecha **y** NBME 31 y 32 ≥ 68 % con uno ≥ 70 %
 * (con NBME 28 en 50-57 %: además NBME 30 ≥ NBME 28 + 5). #2 (tras un NO-GO): horas ≥ umbral y, al 27-sep, UWSA2 + UWSA3 «low risk»
 * (≥ 70 % predicho) · al 25-oct, NBME 33 ≥ 68 % + UWSA2 «low risk». Un checkpoint mensual incumplido no replanifica: solo avisa.
 */
export function evaluarGoNoGo(scores: UsmleScore[], hoy?: string, tipo: EvalGoNoGo['tipo'] = 'GO/NO-GO (E-49)', examen: string = DAILY_META.examenTarget): EvalGoNoGo {
  const u = GONOGO_HORAS.find((x) => x.examen === examen) ?? (GONOGO_HORAS[1] as UmbralGoNoGo);
  const corte = hoy && hoy < u.gonogo ? hoy : u.gonogo;
  const horas = horasDesde(scores, FECHAS_V6.step1.reinicio, corte);
  const horasOk = horas >= u.umbral;
  const v = (c: string) => valorHito(scores, c);
  const criterios: EvalGoNoGo['criterios'] = [];
  if (tipo === 'GO/NO-GO (E-49)') {
    const a = v('NBME 31'), b = v('NBME 32');
    criterios.push({ texto: `NBME 31 y 32 ≥ 68 % con uno ≥ 70 % (${a ?? '—'} % · ${b ?? '—'} %)`, ok: a == null || b == null ? null : a >= 68 && b >= 68 && Math.max(a, b) >= 70 });
    const n28 = v('NBME 28');
    if (n28 != null && n28 >= 50 && n28 <= 57) { const n30 = v('NBME 30'); criterios.push({ texto: `gate estricto (NBME 28 = ${n28} %): NBME 30 ≥ NBME 28 + 5 (${n30 ?? '—'} %)`, ok: n30 == null ? null : n30 >= n28 + 5 }); }
  } else if (examen === '2027-10-25') {
    const n33 = v('NBME 33'), w2 = v('UWSA2');
    criterios.push({ texto: `NBME 33 ≥ 68 % (${n33 ?? '—'} %) + UWSA2 «low risk» (${w2 ?? '—'} %)`, ok: n33 == null || w2 == null ? null : n33 >= 68 && w2 >= 70 });
  } else {
    const w2 = v('UWSA2'), w3 = v('UWSA3');
    criterios.push({ texto: `UWSA2 + UWSA3 «low risk» (≥ 70 % predicho: ${w2 ?? '—'} % · ${w3 ?? '—'} %)`, ok: w2 == null || w3 == null ? null : w2 >= 70 && w3 >= 70 });
  }
  const checkpoints = u.checkpoints.map((c) => {
    const llegado = !!hoy && hoy >= c.fecha;
    const real = llegado ? horasDesde(scores, FECHAS_V6.step1.reinicio, c.fecha) : null;
    return { fecha: c.fecha, requerido: c.requerido, real, ok: real == null ? null : real >= c.requerido };
  });
  const decidible = !hoy || hoy >= u.gonogo;
  const hitosOk = criterios.every((c) => c.ok === true);
  const algunNo = criterios.some((c) => c.ok === false);
  const estado: EvalGoNoGo['estado'] = !decidible ? 'pendiente' : !horasOk || algunNo ? 'NO-GO' : hitosOk ? 'GO' : 'pendiente';
  const texto = `${tipo} ${u.gonogo} (examen ${examen}): horas ${horas}/${u.umbral} ${horasOk ? '✓' : '✗'} · ${criterios.map((c) => `${c.texto} ${c.ok == null ? '·' : c.ok ? '✓' : '✗'}`).join(' · ')} → ${estado}`;
  return { estado, tipo, examen, gonogo: u.gonogo, umbral: u.umbral, horas, horasOk, criterios, checkpoints, texto };
}

// ── Export ──
export function exportScoresJSON(): string {
  const scores = leer();
  return JSON.stringify({
    exportado: new Date().toISOString(), plan: `USMLE Step 1 ${DAILY_META.version} (D1 = ${DAILY_META.inicio} · ${DIAS_TODOS.length} filas en 2 tramos · examen ${DAILY_META.examenTarget} PROVISIONAL · GO/NO-GO ${DAILY_META.gonogo})`, clave: KEY, tabla: TABLA,
    gate: USMLE_GATE, minimosOnTrack: { fuente: HITOS_ONTRACK_FUENTE, hitos: HITOS_ONTRACK.map((h) => ({ clave: h.clave, min: h.min, nota: h.nota })) },
    gateHitos: (({ estado, label }) => ({ estado, label }))(gateHito(scores)),
    pisoAmbar: { consol: PISO_AMBAR.consol, eval: PISO_AMBAR.eval },
    reglaDelTercio: (({ estado, label }) => ({ estado, label }))(reglaDelTercio(scores, scores.length ? scores[scores.length - 1].fecha : DAILY_META.inicio)),
    horas: { desdeReinicio: horasDesde(scores), goNoGo: (({ estado, texto }) => ({ estado, texto }))(evaluarGoNoGo(scores)) },
    diasParciales: diasParciales(),
    worstCase: loadWorstCase(),
    scores,
  }, null, 2);
}
