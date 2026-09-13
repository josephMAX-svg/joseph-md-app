/**
 * mirEvalSync.ts — espejo Supabase del registro MIR (tabla `mir_eval_log`, DDL en
 * DATA/_scripts/_migrations/mir_eval_log.sql). Palmerton v3b (12-sep-2026), gap 7: el log vivía solo en
 * localStorage de UN dispositivo y ningún proceso lo leía.
 *
 *  · push: UPSERT por `id` (append-only en la app; la fila nunca se borra desde aquí). Fallback SILENCIOSO:
 *    sin red / sin tabla / RLS → devuelve false y la UI sigue con lo local.
 *  · pull: SELECT de las filas remotas → el llamador (mirEvalLog.mirEvalLogPull) hace el merge por id.
 *  · No importa mirEvalLog en runtime (solo tipos) para no crear un ciclo: mirEvalLog → mirEvalSync → supabase.
 *  · Criterio de aceptación (gap 7): registrar en el móvil y verlo en la web + fila en Supabase.
 */
import { supabase } from './supabase';
import type { MirEvalEntry } from './mirEvalLog';

export const MIR_EVAL_TABLA = 'mir_eval_log';

/** Entrada de la app → fila de Supabase (snake_case). */
export function mirEvalAFila(e: MirEvalEntry): Record<string, unknown> {
  return {
    id: e.id, ts: e.ts, fecha: e.fecha, d: e.d ?? null, tema: e.tema ?? null, asignatura: e.asignatura ?? null,
    num: e.num ?? null, cap_id: e.capId ?? null,
    aciertos: e.aciertos, total: e.total, blancos: e.blancos ?? 0, tiempo_seg: e.tiempoSeg ?? 0,
    tipo_error: e.tipoError ?? null, ccsn: e.ccsn ?? null, delta_es: !!e.delta_es, kind: e.kind,
    anclas: e.anclas ?? null, anclas_d: e.anclasD ?? null, q_ids: e.qIds && e.qIds.length ? e.qIds : null,
    ajuste: e.ajuste ?? null,
    blancos_acertables: e.blancosAcertables ?? null, fallos_entre_dos: e.fallosEntreDos ?? null,
    cambiadas: e.cambiadas ?? null, cambiadas_a_fallo: e.cambiadasAFallo ?? null,
    nota: e.nota ?? null, updated_at: new Date().toISOString(),
  };
}
const numOpt = (v: unknown): number | undefined => (v == null || v === '' ? undefined : Number.isFinite(Number(v)) ? Number(v) : undefined);
/** Fila de Supabase → entrada de la app. null si la fila no es válida. */
export function mirEvalDeFila(r: any): MirEvalEntry | null {
  if (!r || typeof r.id !== 'string' || typeof r.fecha !== 'string' || typeof r.total !== 'number') return null;
  const e: MirEvalEntry = {
    id: r.id, ts: typeof r.ts === 'string' ? r.ts : new Date().toISOString(),
    fecha: String(r.fecha).slice(0, 10), d: Number(r.d) || 0, tema: r.tema || '', asignatura: r.asignatura || '',
    num: numOpt(r.num), capId: r.cap_id || undefined,
    aciertos: Number(r.aciertos) || 0, total: Number(r.total) || 1, blancos: Number(r.blancos) || 0,
    tiempoSeg: Number(r.tiempo_seg) || 0,
    tipoError: r.tipo_error === 'knowledge' || r.tipo_error === 'transfer' || r.tipo_error === 'proceso' ? r.tipo_error : null,
    ccsn: r.ccsn || undefined, delta_es: !!r.delta_es, kind: r.kind,
    anclas: r.anclas && typeof r.anclas === 'object' ? r.anclas : undefined,
    anclasD: r.anclas_d && typeof r.anclas_d === 'object' ? r.anclas_d : undefined,
    qIds: Array.isArray(r.q_ids) ? r.q_ids.map(String) : undefined,
    ajuste: r.ajuste || undefined,
    blancosAcertables: numOpt(r.blancos_acertables), fallosEntreDos: numOpt(r.fallos_entre_dos),
    cambiadas: numOpt(r.cambiadas), cambiadasAFallo: numOpt(r.cambiadas_a_fallo),
    nota: r.nota || undefined,
  };
  return e;
}

/** Sube (upsert por id) una o varias entradas. true si Supabase respondió sin error. Nunca lanza. */
export async function mirEvalSyncPush(entries: MirEvalEntry[]): Promise<boolean> {
  if (!entries.length) return true;
  try {
    const { error } = await supabase.from(MIR_EVAL_TABLA).upsert(entries.map(mirEvalAFila), { onConflict: 'id' });
    return !error;
  } catch { return false; }
}
/** Trae todas las filas remotas (máx. 5.000, orden ts). [] si no hay red/tabla. Nunca lanza. */
export async function mirEvalSyncPull(): Promise<MirEvalEntry[]> {
  try {
    const { data, error } = await supabase.from(MIR_EVAL_TABLA).select('*').order('ts', { ascending: true }).limit(5000);
    if (error || !data) return [];
    return (data as any[]).map(mirEvalDeFila).filter((x): x is MirEvalEntry => !!x);
  } catch { return []; }
}
/** Nº de filas remotas (para el chip "espejo: N filas"). null si no responde. */
export async function mirEvalSyncCount(): Promise<number | null> {
  try {
    const { count, error } = await supabase.from(MIR_EVAL_TABLA).select('*', { count: 'exact', head: true });
    return error ? null : (count ?? 0);
  } catch { return null; }
}
