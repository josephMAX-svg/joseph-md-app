/**
 * livianoScore.ts — SCORE real de LIVIANO Academia (Palmerton: "se mide por % ciego, no por ✓").
 *
 * Lo que mide LivianoTodayPlan (src/components/empresa/LivianoTodayPlan.tsx):
 *   · PRE-TEST ciego 5Q de los lunes (18 en LIV_META.pretests)  → pretests[d]   = { ok, total, fecha }
 *   · DRILL de cifras ancla (D36 · D57 · D74 · D87, v5.15)        → drills[d]     = { ok, total, fecha }
 *   · CASO del viernes con rúbrica 0-2 × 4 (16 casos)            → rubricas[casoId] = { items[4], fecha }
 *
 * Persistencia (19-sep-2026, v5.14 — mismo patrón que ENCAPS `encapsProgressSync.ts`):
 *   1) SIEMPRE en localStorage 'jmd-liviano-score' (try/catch; sin storage arranca vacío) — lo que se pinta.
 *   2) ESPEJO en Supabase `study_progress` (tabla existente, sin DDL nuevo) con examen = 'LIVIANO', fuente = 'app:liviano',
 *      especialidad = módulo del día, porcentaje = ok/total × 100 (rúbrica: puntos/8 × 100), preguntas_resueltas = total,
 *      errores_por_tipo = { tipo: 'pretest'|'drill'|'rubrica', clave, d, casoId, modulo, ok, total, items, app: 'liviano' }.
 *      study_progress no tiene UNIQUE → select→update/insert por examen + fuente + errores_por_tipo->>tipo + ->>clave.
 *   3) `pullLivianoScores()` reconstruye el store desde Supabase (otro dispositivo) y `mergeLivianoScore` deja ganar la entrada
 *      más reciente por `fecha` (ISO). Nunca lanza: si Supabase falla, el score queda local y se reintenta en el próximo guardado.
 * El ✓ de studyProgress ('liviano' → plan_checks) se sigue escribiendo aparte para el progreso global.
 * gen_revision_semanal.js puede leer estas filas: `examen = 'LIVIANO' AND fuente = 'app:liviano'`.
 */
import { supabase } from './supabase';

export const LIVIANO_SCORE_KEY = 'jmd-liviano-score';
export const FUENTE_LIVIANO = 'app:liviano';
export const EXAMEN_LIVIANO = 'LIVIANO';
const RUBRICA_MAX = 8; // 0-2 × 4 ítems (LIV_META_RUBRICA.max en livianoCasos.ts)

export type TipoScoreLiviano = 'pretest' | 'drill' | 'rubrica';
export interface ScoreEntry { ok: number; total: number; fecha: string }
export interface RubricaEntry { items: number[]; fecha: string }
export interface LivianoScoreStore {
  v: 1;
  pretests: Record<string, ScoreEntry>;
  drills: Record<string, ScoreEntry>;
  rubricas: Record<string, RubricaEntry>;
}
export const EMPTY_LIVIANO_SCORE: LivianoScoreStore = { v: 1, pretests: {}, drills: {}, rubricas: {} };

const hasLS = () => typeof window !== 'undefined' && !!window.localStorage;

export function loadLivianoScore(): LivianoScoreStore {
  if (!hasLS()) return EMPTY_LIVIANO_SCORE;
  try {
    const raw = window.localStorage.getItem(LIVIANO_SCORE_KEY);
    if (!raw) return EMPTY_LIVIANO_SCORE;
    const p = JSON.parse(raw);
    return { v: 1, pretests: p.pretests || {}, drills: p.drills || {}, rubricas: p.rubricas || {} };
  } catch { return EMPTY_LIVIANO_SCORE; }
}
export function saveLivianoScore(s: LivianoScoreStore): void {
  if (!hasLS()) return;
  try { window.localStorage.setItem(LIVIANO_SCORE_KEY, JSON.stringify(s)); } catch {}
}

/** Descriptor de UNA entrada a espejar (lo que acaba de guardar el usuario). */
export interface EntradaLiviano {
  tipo: TipoScoreLiviano;
  /** clave del store: d del plan (pretest/drill) o casoId (rúbrica) */
  clave: string;
  d: number;
  modulo: string;
  casoId?: number;
  entry: ScoreEntry | RubricaEntry;
}

const esRubrica = (e: ScoreEntry | RubricaEntry): e is RubricaEntry => Array.isArray((e as RubricaEntry).items);

/** Fila de study_progress (misma forma que filaProgress de ENCAPS; sin id: la PK la pone Postgres). */
export function filaLiviano(x: EntradaLiviano) {
  const rub = esRubrica(x.entry);
  const ok = rub ? (x.entry as RubricaEntry).items.reduce((a, b) => a + (Number(b) || 0), 0) : (x.entry as ScoreEntry).ok;
  const total = rub ? RUBRICA_MAX : (x.entry as ScoreEntry).total;
  return {
    fecha: x.entry.fecha,
    especialidad: x.modulo,
    examen: EXAMEN_LIVIANO,
    porcentaje: total > 0 ? Math.round((ok / total) * 1000) / 10 : 0,
    fuente: FUENTE_LIVIANO,
    preguntas_resueltas: total,
    errores_por_tipo: {
      tipo: x.tipo, clave: x.clave, d: x.d, casoId: x.casoId ?? null, modulo: x.modulo,
      ok, total, items: rub ? (x.entry as RubricaEntry).items : null, app: 'liviano',
    },
  };
}

export interface ResultadoEspejo { ok: boolean; id: string | null; error?: string }

/** Espejo en Supabase. Nunca lanza; ok=false → queda solo en localStorage (se reintenta en el próximo guardado). */
export async function espejarLivianoScore(x: EntradaLiviano): Promise<ResultadoEspejo> {
  try {
    const fila = filaLiviano(x);
    const { data: prev, error: e0 } = await supabase
      .from('study_progress').select('id')
      .eq('examen', EXAMEN_LIVIANO).eq('fuente', FUENTE_LIVIANO)
      .eq('errores_por_tipo->>tipo', x.tipo).eq('errores_por_tipo->>clave', x.clave)
      .limit(1);
    if (e0) return { ok: false, id: null, error: e0.message };
    const id = prev && prev.length ? String((prev[0] as { id: string }).id) : null;
    if (id) {
      const { error } = await supabase.from('study_progress').update(fila).eq('id', id);
      return error ? { ok: false, id, error: error.message } : { ok: true, id };
    }
    const { data, error } = await supabase.from('study_progress').insert(fila).select('id').limit(1);
    if (error) return { ok: false, id: null, error: error.message };
    return { ok: true, id: data && data.length ? String((data[0] as { id: string }).id) : null };
  } catch (e) {
    return { ok: false, id: null, error: e instanceof Error ? e.message : String(e) };
  }
}

/** Reconstruye el store desde Supabase (null si no hay red/tabla). */
export async function pullLivianoScores(): Promise<LivianoScoreStore | null> {
  try {
    const { data, error } = await supabase
      .from('study_progress').select('fecha, errores_por_tipo')
      .eq('examen', EXAMEN_LIVIANO).eq('fuente', FUENTE_LIVIANO).limit(500);
    if (error || !data) return null;
    const s: LivianoScoreStore = { v: 1, pretests: {}, drills: {}, rubricas: {} };
    for (const row of data as { fecha: string; errores_por_tipo: Record<string, unknown> }[]) {
      const e = row.errores_por_tipo || {};
      const clave = String(e.clave ?? '');
      const fecha = String(row.fecha || '');
      if (!clave) continue;
      if (e.tipo === 'rubrica' && Array.isArray(e.items)) s.rubricas[clave] = { items: (e.items as number[]).map(Number), fecha };
      else if (e.tipo === 'pretest') s.pretests[clave] = { ok: Number(e.ok) || 0, total: Number(e.total) || 0, fecha };
      else if (e.tipo === 'drill') s.drills[clave] = { ok: Number(e.ok) || 0, total: Number(e.total) || 0, fecha };
    }
    return s;
  } catch { return null; }
}

/** Fusión local ⊕ remoto: por clave gana la entrada con `fecha` más reciente (empate → local). */
export function mergeLivianoScore(local: LivianoScoreStore, remote: LivianoScoreStore | null): LivianoScoreStore {
  if (!remote) return local;
  const pick = <T extends { fecha: string }>(a: Record<string, T>, b: Record<string, T>): Record<string, T> => {
    const out: Record<string, T> = { ...a };
    for (const k of Object.keys(b)) if (!out[k] || (b[k].fecha || '') > (out[k].fecha || '')) out[k] = b[k];
    return out;
  };
  return { v: 1, pretests: pick(local.pretests, remote.pretests), drills: pick(local.drills, remote.drills), rubricas: pick(local.rubricas, remote.rubricas) };
}
