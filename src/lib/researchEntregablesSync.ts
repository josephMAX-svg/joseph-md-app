/**
 * researchEntregablesSync.ts — MESA EDITORIAL persistente en Supabase (Palmerton v3b · gap 8 · 12-sep-2026).
 *
 * Hasta hoy el estado real de los 5 entregables de la RUTA 2027 (estado · fecha de envío · nº de manuscrito) vivía SOLO en
 * localStorage 'jmd-research-entregables' (researchData.ts loadEntregables/saveEntregables): invisible desde el móvil, se
 * perdía al limpiar el navegador y su gemelo manual era la tabla de RUTA_PUBLICACION_2027.md §9 (dos fuentes de verdad).
 * Esta capa añade el espejo en la tabla `research_entregables` (DDL: DATA/_scripts/_migrations/research_entregables.sql,
 * RLS + policy "Allow all" como study_sim_scores) SIN cambiar la clave local ni el tipo EntregableRegistro:
 *
 *  1) la caché local sigue siendo la MISMA clave 'jmd-research-entregables' (try/catch; los campos extra viajan en el JSON);
 *  2) `pushEntregable` UPSERTea la fila por id al cambiar estado/ref/journal/decisión (ResearchHub → onChange);
 *  3) `pullEntregables` baja las filas y MEZCLA por updated_at (gana la más nueva); lo local más nuevo se sube;
 *  4) `aplicarCambio` APENDEA al `historial` cada cambio de estado ({ts, estado, journal, decision, ref}) → histórico de
 *     decisiones editoriales (rebuttal · rechazo · siguiente revista de la cascada) que antes no existía.
 *
 * Regla #11: la app solo lee/escribe Supabase (nunca Claude); si Supabase falla, el cambio queda local (synced=false) y
 * se reintenta en el siguiente pull. RUTA §9 pasa a ser solo lectura: se regenera desde esta tabla.
 */
import { supabase } from './supabase';
import {
  ESTADOS_ENTREGABLE, RESEARCH_ENTREGABLES, loadEntregables, saveEntregables,
  EntregableRegistro, EntregablesRegistro, EstadoEntregable,
} from './researchData';

export const TABLA_ENTREGABLES = 'research_entregables';
/** Misma clave que researchData.ts (la caché local NO cambia de sitio). */
export const ENTREGABLES_LS_KEY = 'jmd-research-entregables';
const MAX_HISTORIAL = 60;

/** Una decisión editorial registrada (se apenda en cada cambio de estado). */
export interface DecisionEditorial {
  ts: string;                 // ISO
  estado: EstadoEntregable;
  journal?: string | null;
  decision?: string | null;
  ref?: string | null;
}
/** Registro local EXTENDIDO: compatible con EntregableRegistro (estado · fechaEnvio · ref · actualizado) + campos de la mesa. */
export interface EntregableRegistroSync extends EntregableRegistro {
  journal?: string | null;    // escalón de la cascada en el que está
  decision?: string | null;   // última decisión editorial
  notas?: string | null;
  historial?: DecisionEditorial[];
  updatedAt?: string;         // ISO completo → merge por updated_at (`actualizado` YYYY-MM-DD se mantiene por compatibilidad)
  synced?: boolean;           // true si la última escritura llegó a Supabase
}
export type EntregablesRegistroSync = Record<string, EntregableRegistroSync>;

/** Fila de la tabla research_entregables. */
export interface EntregableRow {
  id: string;
  estado: EstadoEntregable;
  fecha_envio: string | null;
  ref_manuscrito: string | null;
  journal_actual: string | null;
  decision: string | null;
  notas: string | null;
  historial: DecisionEditorial[];
  updated_at: string;
}

export const IDS_ENTREGABLES: string[] = RESEARCH_ENTREGABLES.map((e) => e.id);
const nowISO = (): string => new Date().toISOString();
const hoyISO = (): string => nowISO().slice(0, 10);

export function estadoValido(s: unknown): s is EstadoEntregable {
  return typeof s === 'string' && (ESTADOS_ENTREGABLE as string[]).includes(s);
}
function estadoBase(id: string): EstadoEntregable {
  const e = RESEARCH_ENTREGABLES.find((x) => x.id === id);
  return e ? e.estado : 'idea';
}
/** Marca temporal comparable de un registro local (updatedAt ISO; si solo hay `actualizado` YYYY-MM-DD, medianoche UTC). */
export function tsDe(r: EntregableRegistroSync | undefined | null): string {
  if (!r) return '';
  if (r.updatedAt) return r.updatedAt;
  if (r.actualizado) return `${r.actualizado}T00:00:00.000Z`;
  return '';
}
function limpiarHistorial(h: unknown): DecisionEditorial[] {
  if (!Array.isArray(h)) return [];
  return h
    .filter((x) => x && typeof x === 'object' && typeof (x as DecisionEditorial).ts === 'string' && estadoValido((x as DecisionEditorial).estado))
    .slice(-MAX_HISTORIAL) as DecisionEditorial[];
}

/** Registro → fila (lo que se UPSERTea). */
export function toRow(id: string, r: EntregableRegistroSync): EntregableRow {
  return {
    id,
    estado: estadoValido(r.estado) ? r.estado : estadoBase(id),
    fecha_envio: r.fechaEnvio ? String(r.fechaEnvio).slice(0, 10) : null,
    ref_manuscrito: r.ref ? String(r.ref) : null,
    journal_actual: r.journal ? String(r.journal) : null,
    decision: r.decision ? String(r.decision) : null,
    notas: r.notas ? String(r.notas) : null,
    historial: limpiarHistorial(r.historial),
    updated_at: tsDe(r) || nowISO(),
  };
}
/** Fila → registro local (synced = true). */
export function fromRow(row: EntregableRow): EntregableRegistroSync {
  return {
    estado: estadoValido(row.estado) ? row.estado : estadoBase(row.id),
    fechaEnvio: row.fecha_envio ? String(row.fecha_envio).slice(0, 10) : null,
    ref: row.ref_manuscrito ?? null,
    journal: row.journal_actual ?? null,
    decision: row.decision ?? null,
    notas: row.notas ?? null,
    historial: limpiarHistorial(row.historial),
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : nowISO(),
    actualizado: (row.updated_at ? new Date(row.updated_at).toISOString() : nowISO()).slice(0, 10),
    synced: true,
  };
}

/**
 * Aplica un cambio de la UI a un registro: sella updatedAt/actualizado, deja synced=false y, si cambia el ESTADO,
 * apenda una entrada al historial (con la revista/decisión/ref vigentes tras el cambio).
 */
export function aplicarCambio(prev: EntregableRegistroSync | undefined, patch: Partial<EntregableRegistroSync>, id: string): EntregableRegistroSync {
  const cur: EntregableRegistroSync = prev ?? { estado: estadoBase(id) };
  const next: EntregableRegistroSync = { ...cur, ...patch };
  if (!estadoValido(next.estado)) next.estado = estadoBase(id);
  const ts = nowISO();
  next.updatedAt = ts;
  next.actualizado = ts.slice(0, 10);
  next.synced = false;
  const hist = limpiarHistorial(cur.historial);
  if (patch.estado && patch.estado !== cur.estado) {
    hist.push({ ts, estado: next.estado, journal: next.journal ?? null, decision: next.decision ?? null, ref: next.ref ?? null });
  }
  next.historial = hist.slice(-MAX_HISTORIAL);
  return next;
}

/**
 * Mezcla local ↔ remoto por marca temporal: para cada id gana el más nuevo; lo local más nuevo (o inexistente en remoto)
 * queda en `pushIds` para subirlo. Nunca borra: un id que solo existe en un lado se conserva.
 */
export function mergeRegistros(local: EntregablesRegistroSync, remoto: EntregablesRegistroSync): { merged: EntregablesRegistroSync; pushIds: string[] } {
  const merged: EntregablesRegistroSync = {};
  const pushIds: string[] = [];
  const ids = new Set<string>([...Object.keys(local), ...Object.keys(remoto)]);
  for (const id of ids) {
    const l = local[id], r = remoto[id];
    if (l && !r) { merged[id] = { ...l, synced: false }; pushIds.push(id); continue; }
    if (r && !l) { merged[id] = r; continue; }
    if (!l || !r) continue;
    const tl = tsDe(l), tr = tsDe(r);
    if (tl > tr) { merged[id] = { ...l, synced: false }; pushIds.push(id); }
    else merged[id] = r;
  }
  return { merged, pushIds };
}

export interface ResultadoPush { ok: boolean; error?: string }
/** UPSERT de una fila por id. Nunca lanza: ok=false si Supabase falla (el registro queda local, synced=false). */
export async function pushEntregable(id: string, r: EntregableRegistroSync): Promise<ResultadoPush> {
  try {
    const { error } = await supabase.from(TABLA_ENTREGABLES).upsert(toRow(id, r), { onConflict: 'id' });
    if (error) return { ok: false, error: error.message };
    marcarSynced(id, true);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'sin red' };
  }
}
/** Marca synced en la caché local sin tocar updatedAt (para no disparar un merge falso). */
function marcarSynced(id: string, synced: boolean): void {
  try {
    const reg = loadEntregables() as EntregablesRegistroSync;
    if (reg[id]) { reg[id] = { ...reg[id], synced }; saveEntregables(reg); }
  } catch { /* sin storage */ }
}

export interface ResultadoPull { ok: boolean; reg: EntregablesRegistroSync; pushed: number; error?: string }
/**
 * Pull + merge + push de lo pendiente. Devuelve el registro MEZCLADO (ya guardado en la caché local).
 * Si Supabase falla, devuelve el registro local tal cual con ok=false.
 */
export async function pullEntregables(): Promise<ResultadoPull> {
  const local = loadEntregables() as EntregablesRegistroSync;
  try {
    const { data, error } = await supabase.from(TABLA_ENTREGABLES).select('*');
    if (error) return { ok: false, reg: local, pushed: 0, error: error.message };
    const remoto: EntregablesRegistroSync = {};
    for (const row of (data ?? []) as EntregableRow[]) if (row && row.id) remoto[row.id] = fromRow(row);
    const { merged, pushIds } = mergeRegistros(local, remoto);
    // también se suben los locales que quedaron synced=false por un fallo previo
    const pendientes = new Set<string>(pushIds);
    for (const [id, r] of Object.entries(merged)) if (r.synced === false && !pendientes.has(id)) pendientes.add(id);
    let pushed = 0;
    for (const id of pendientes) {
      const { error: e2 } = await supabase.from(TABLA_ENTREGABLES).upsert(toRow(id, merged[id]), { onConflict: 'id' });
      if (!e2) { merged[id] = { ...merged[id], synced: true }; pushed++; }
    }
    saveEntregables(merged);
    return { ok: true, reg: merged, pushed };
  } catch (e) {
    return { ok: false, reg: local, pushed: 0, error: e instanceof Error ? e.message : 'sin red' };
  }
}

/** Filas de la mesa en el orden de RESEARCH_ENTREGABLES (para regenerar RUTA §9 o exportar). */
export function filasMesa(reg: EntregablesRegistroSync): EntregableRow[] {
  return [...RESEARCH_ENTREGABLES].sort((a, b) => a.n - b.n).map((e) => toRow(e.id, reg[e.id] ?? { estado: e.estado }));
}
/** Tabla Markdown (mismas columnas que RUTA_PUBLICACION_2027.md §9, versión "solo lectura, se regenera"). */
export function mesaMarkdown(reg: EntregablesRegistroSync): string {
  const out = ['| id | Entregable | Estado | Fecha envío | Revista actual | Última decisión | Ref. | Actualizado |', '|---|---|---|---|---|---|---|---|'];
  for (const e of [...RESEARCH_ENTREGABLES].sort((a, b) => a.n - b.n)) {
    const r = toRow(e.id, reg[e.id] ?? { estado: e.estado });
    out.push(`| \`${e.id}\` | ${e.titulo} | **${r.estado}** | ${r.fecha_envio ?? '—'} | ${r.journal_actual ?? e.journalCascade[0]} | ${r.decision ?? '—'} | ${r.ref_manuscrito ?? '—'} | ${r.updated_at.slice(0, 10)} |`);
  }
  out.push('', `_Generado desde Supabase \`${TABLA_ENTREGABLES}\` el ${hoyISO()} (Mesa editorial de la app · researchEntregablesSync.ts)._`);
  return out.join('\n');
}
