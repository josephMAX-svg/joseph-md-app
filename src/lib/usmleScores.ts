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
 * Regla de lectura (Palmerton): el % de UWorld es gate de PROCESO, no predicción — solo los NBME predicen.
 */
import { supabase } from './supabase';
import { DIAS, DiaUSMLE, USMLE_GATE, esHito, faseDe } from './usmleStep1Daily';

export type TipoErrorUW = 'knowledge' | 'transfer' | 'proceso';
export const TIPO_ERROR_INFO: Record<TipoErrorUW, { label: string; corto: string; fix: string; color: string }> = {
  knowledge: { label: 'Knowledge gap', corto: 'Knowledge', fix: 'No sabía el hecho/mecanismo → página COMPLETA de First Aid (Whole Page Rule) + tarjeta de mecanismo.', color: '#C56A5A' },
  transfer: { label: 'Transfer / interpretación', corto: 'Transfer', fix: 'Sabía la medicina pero no la reconocí con ruido → CCSN, cronología en presente, juez (no abogado), rule-in antes de rule-out.', color: '#C8A96A' },
  proceso: { label: 'Proceso / unforced', corto: 'Proceso', fix: 'Leí rápido, cambié una correcta o me anclé en la 1ª frase → una sola lectura lenta y lineal, cover-the-options, no cambiar salvo error de lectura indiscutible.', color: '#4F7DD6' },
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
}

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
  };
}

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
function aFila(s: UsmleScore) {
  return {
    fecha: s.fecha, d: s.d, pretest10: s.pretest10, consol30_pct: s.consol30pct, eval_pct: s.evalPct,
    tipo_error: s.tipoError, nivel_uw: s.nivelUW, notas: s.notas || null, updated_at: s.updatedAt,
  };
}
function deFila(r: any): UsmleScore | null {
  if (!r || typeof r.fecha !== 'string') return null;
  return normalizar({
    fecha: r.fecha.slice(0, 10), d: r.d, pretest10: r.pretest10, consol30pct: r.consol30_pct, evalPct: r.eval_pct,
    tipoError: r.tipo_error, nivelUW: r.nivel_uw, notas: r.notas || '', updatedAt: r.updated_at || new Date().toISOString(),
  });
}
/** Guarda local + Supabase. `supabase` = true si el espejo remoto respondió sin error. */
export async function upsertScore(s: UsmleScore): Promise<{ scores: UsmleScore[]; supabase: boolean }> {
  const scores = upsertScoreLocal(s);
  const guardado = scoreDe(scores, s.fecha);
  let ok = false;
  try {
    if (guardado) {
      const { error } = await supabase.from(TABLA).upsert(aFila(guardado), { onConflict: 'fecha' });
      ok = !error;
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
export interface GateDia { estado: 'sube' | 'repite' | 'sin-dato'; pct: number | null; minimo: number; metrica: string; label: string; detalle: string }
export function gateDelDia(s: UsmleScore | null | undefined, dia: DiaUSMLE): GateDia {
  if (esHito(dia)) {
    const h = HITOS_ONTRACK.find((t) => t.match.test(dia.uw));
    const pct = s?.evalPct ?? null;
    const minimo = h?.min ?? USMLE_GATE.pct;
    if (pct == null) return { estado: 'sin-dato', pct, minimo, metrica: `% del ${h?.clave || dia.uw}`, label: '— sin registrar', detalle: h?.min != null ? `mínimo on-track ${h.min}%` : (h?.nota || 'baseline: cualquier valor sirve') };
    if (h?.min == null) return { estado: 'sube', pct, minimo, metrica: `% del ${h?.clave || dia.uw}`, label: `✓ ${pct}% registrado`, detalle: h?.nota || 'baseline' };
    const ok = pct >= h.min;
    return { estado: ok ? 'sube' : 'repite', pct, minimo: h.min, metrica: `% del ${h.clave}`, label: ok ? `✓ ON-TRACK · ${pct}% ≥ ${h.min}%` : `✗ BAJO MÍNIMO · ${pct}% < ${h.min}%`, detalle: ok ? 'trayectoria de GO intacta' : 'auditar el MÉTODO esta semana (checklist §G), no sumar horas' };
  }
  const fase = faseDe(dia.d);
  const pct = fase === 'A' ? (s?.consol30pct ?? null) : (s?.consol30pct ?? s?.evalPct ?? null);
  const metrica = fase === 'A' ? 'consolidación 11:00' : 'bloques timed del día';
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
export const HITOS_ONTRACK_FUENTE = 'DATA/USMLE/PALMERTON_POR_MATERIA.md · Parte V-A (regla Palmerton del +5%/mes aplicada hacia atrás desde 68% en NBME 31; 65% ≈ 95% de pase, 70% ≈ 99%)';
export interface HitoOnTrack { clave: string; match: RegExp; min: number | null; nota: string }
export const HITOS_ONTRACK: HitoOnTrack[] = [
  { clave: 'UWSA1', match: /Self-Assessment 1|UWSA1/i, min: null, nota: 'baseline — cualquier valor sirve (Parte V: ~48% ya es trayectoria de GO)' },
  { clave: 'NBME 25', match: /NBME (CBS Form )?25\b/i, min: 51, nota: '' },
  { clave: 'NBME 26', match: /NBME (CBS Form )?26\b/i, min: 54, nota: '' },
  { clave: 'NBME 27', match: /NBME (CBS Form )?27\b/i, min: 57, nota: 'gate 1 ECFMG pide ≥55%' },
  { clave: 'NBME 28', match: /NBME (CBS Form )?28\b/i, min: 61, nota: '' },
  { clave: 'NBME 29', match: /NBME (CBS Form )?29\b/i, min: 63, nota: 'gate 2 pide ≥60%' },
  { clave: 'NBME 30', match: /NBME (CBS Form )?30\b/i, min: 65, nota: 'umbral de seguridad Palmerton (≈95% de pase)' },
  { clave: 'UWSA2', match: /UWSA2|Self-Assessment 2/i, min: null, nota: '"low risk" · el UWSA sobreestima: solo resistencia, la fecha la decide el NBME' },
  { clave: 'NBME 31', match: /NBME (CBS Form )?31\b/i, min: 68, nota: 'GO/NO-GO: 2 NBME consecutivos ≥68% + UWSA2 low risk' },
  { clave: 'NBME 32', match: /NBME (CBS Form )?32\b/i, min: 68, nota: 'confirma el GO (mismo 68%; no figura en Parte V)' },
  { clave: 'NBME 33', match: /NBME (CBS Form )?33\b/i, min: 68, nota: 'confirma el GO (mismo 68%; no figura en Parte V)' },
  { clave: 'Free 120', match: /Free 120/i, min: 70, nota: '≥70% = heurística comunitaria (CALENDARIO_5_MESES), no cifra Palmerton · rendirlo en el Prometric real' },
];
export interface HitoPlan { d: number; fecha: string; uw: string; sub: string; clave: string; min: number | null; nota: string; valor: number | null; estado: 'pendiente' | 'registrado' | 'on-track' | 'bajo' }
/** Serie de hitos del plan (DIAS con 🎯) cruzada con la tabla de mínimos y el % registrado en usmleScores. */
export function hitosPlan(scores: UsmleScore[]): HitoPlan[] {
  return DIAS.filter(esHito).map((x) => {
    const h = HITOS_ONTRACK.find((t) => t.match.test(x.uw));
    const s = scoreDe(scores, x.fecha);
    const valor = s?.evalPct ?? null;
    const min = h?.min ?? null;
    const estado: HitoPlan['estado'] = valor == null ? 'pendiente' : min == null ? 'registrado' : valor >= min ? 'on-track' : 'bajo';
    return { d: x.d, fecha: x.fecha, uw: x.uw, sub: x.sub, clave: h?.clave || x.uw, min, nota: h?.nota || '', valor, estado };
  });
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

// ── Export ──
export function exportScoresJSON(): string {
  return JSON.stringify({
    exportado: new Date().toISOString(), plan: 'USMLE Step 1 v5.6 (D1 = 2026-09-07 · 97 días)', clave: KEY, tabla: TABLA,
    gate: USMLE_GATE, minimosOnTrack: { fuente: HITOS_ONTRACK_FUENTE, hitos: HITOS_ONTRACK.map((h) => ({ clave: h.clave, min: h.min, nota: h.nota })) },
    scores: leer(),
  }, null, 2);
}
