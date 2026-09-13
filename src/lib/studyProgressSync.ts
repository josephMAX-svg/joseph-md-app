/**
 * studyProgressSync.ts — espejo en Supabase (tabla `plan_checks`) de los ✓ de progreso de la app.
 * v5.10 · 12-sep-2026 · vacío 9 de gaps_v3b_synapse.json ("todo el progreso vive en un solo localStorage").
 *
 * Antes: `jmd-study-progress-v1` = { <plan>: number[] } solo en ESE navegador → cambiar de navegador, borrar
 * datos o abrir el móvil = 0 % en los 10 frentes y revisión semanal ciega. Ahora:
 *   · localStorage sigue siendo la CACHÉ y el fallback offline (misma clave, mismo formato: nada se rompe);
 *   · cada `saveDone` empuja el DIFF (altas → upsert, bajas → delete) a `plan_checks` {plan_key, dia, checked_at, device};
 *   · el primer `loadDone` de la sesión dispara un PULL que fusiona remoto + pendientes locales (migración única
 *     incluida: la primera vez, todo lo local sube; `jmd-study-progress-synced-v1` guarda lo último confirmado);
 *   · exportar / importar el progreso como JSON (portapapeles) para mover un navegador a otro sin red;
 *   · `DATA/_scripts/gen_revision_semanal.js` lee `plan_checks` directamente (ya no depende del export del navegador).
 * Regla de fusión: remoto ∪ altas locales pendientes − bajas locales pendientes (lo desmarcado desde el último sync
 * se borra en remoto; lo marcado en otro dispositivo aparece aquí). Nunca lanza: si Supabase falla, queda local.
 * Sin localStorage (nativo) usa un store en memoria alimentado por el pull.
 */
import { supabase } from './supabase';
import type { PlanKey } from './studyProgress';

export const STORE_KEY = 'jmd-study-progress-v1';           // caché local (formato histórico: { plan: number[] })
export const SYNCED_KEY = 'jmd-study-progress-synced-v1';   // último snapshot confirmado por Supabase (para el diff)
export const DEVICE_KEY = 'jmd-device';                      // id anónimo del navegador (auditoría de conflictos)
export const MIGRATED_KEY = 'jmd-study-progress-migrated-v1';// fecha ISO de la migración única localStorage → plan_checks
export const MODO_LOG_KEY = 'jmd-modo-log';                  // viaja en el export/import (niveles VERDE/ÁMBAR/ROJO por fecha)
export const TABLA = 'plan_checks';
/** Claves de plan válidas (= PlanKey de studyProgress.ts). Cualquier otra clave se ignora al importar. */
export const PLAN_KEYS: readonly string[] = ['usmle', 'mir', 'research', 'derma', 'business', 'synapse', 'aurum', 'liviano', 'vibecoding', 'research-infra'];
const PULL_MIN_MS = 5 * 60 * 1000;   // no volver a tirar de Supabase antes de 5' (los componentes llaman loadDone en cada montaje)

export type Store = Record<string, number[]>;

// ── storage (localStorage con try/catch; memoria si no hay) ──
const mem = new Map<string, string>();
function lsGet(k: string): string | null {
  try { const ls = (globalThis as any).localStorage; if (ls) return ls.getItem(k); } catch { /* sin storage */ }
  return mem.has(k) ? (mem.get(k) as string) : null;
}
function lsSet(k: string, v: string): void {
  try { const ls = (globalThis as any).localStorage; if (ls) { ls.setItem(k, v); return; } } catch { /* sin storage */ }
  mem.set(k, v);
}
function leerJSON<T>(k: string, def: T): T {
  try { const raw = lsGet(k); if (raw) return JSON.parse(raw) as T; } catch { /* ilegible */ }
  return def;
}
const limpiar = (xs: unknown): number[] => {
  if (!Array.isArray(xs)) return [];
  const out = new Set<number>();
  for (const x of xs) { const n = Number(x); if (Number.isInteger(n) && n > 0 && n < 100000) out.add(n); }
  return Array.from(out).sort((a, b) => a - b);
};
function normalizar(s: unknown): Store {
  const out: Store = {};
  if (!s || typeof s !== 'object') return out;
  for (const [k, v] of Object.entries(s as Record<string, unknown>)) if (PLAN_KEYS.includes(k)) out[k] = limpiar(v);
  return out;
}
/** Store local (caché). Mismo formato que siempre: { usmle: number[], mir: number[], … }. */
export function leerStoreLS(): Store { return normalizar(leerJSON<Store>(STORE_KEY, {})); }
export function escribirStoreLS(s: Store): void { lsSet(STORE_KEY, JSON.stringify(s)); }
function leerSynced(): Store { return normalizar(leerJSON<Store>(SYNCED_KEY, {})); }
function escribirSynced(s: Store): void { lsSet(SYNCED_KEY, JSON.stringify(s)); }

/** Id anónimo y estable del navegador/dispositivo ('jmd-device'); se genera una vez. */
export function deviceId(): string {
  let id = lsGet(DEVICE_KEY);
  if (id) return id;
  const rnd = Math.random().toString(36).slice(2, 8);
  const plat = (() => { try { const nav = (globalThis as any).navigator; return nav && /Mobi|Android|iPhone/i.test(String(nav.userAgent || '')) ? 'mov' : 'pc'; } catch { return 'pc'; } })();
  id = `${plat}-${Date.now().toString(36)}-${rnd}`;
  lsSet(DEVICE_KEY, id);
  return id;
}

// ── estado observable (para el cockpit) ──
export type SyncEstado = 'idle' | 'sync' | 'ok' | 'offline';
export interface SyncInfo { estado: SyncEstado; ultimoOk: string | null; error: string | null; device: string; totalChecks: number; migrado: string | null }
let estado: SyncEstado = 'idle';
let ultimoOk: string | null = null;
let ultimoError: string | null = null;
const listeners = new Set<(i: SyncInfo) => void>();
const totalChecks = (s: Store = leerStoreLS()): number => Object.values(s).reduce((n, xs) => n + xs.length, 0);
export function estadoSync(): SyncInfo {
  return { estado, ultimoOk, error: ultimoError, device: deviceId(), totalChecks: totalChecks(), migrado: lsGet(MIGRATED_KEY) };
}
function emitir(): void { const i = estadoSync(); listeners.forEach((cb) => { try { cb(i); } catch { /* ignore */ } }); }
function setEstado(e: SyncEstado, err: string | null = null): void {
  estado = e; ultimoError = err; if (e === 'ok') ultimoOk = new Date().toISOString(); emitir();
}
/** Suscripción a cambios de estado/progreso (pull terminado, push confirmado, import). Devuelve el unsubscribe. */
export function onProgressSync(cb: (i: SyncInfo) => void): () => void { listeners.add(cb); return () => { listeners.delete(cb); }; }

const diff = (a: number[], b: number[]): number[] => { const s = new Set(b); return a.filter((x) => !s.has(x)); };
const union = (a: number[], b: number[]): number[] => limpiar([...a, ...b]);

// ── PUSH (lo llama saveDone; cola por plan, nunca lanza) ──
const cola = new Map<string, number[]>();
let pushTimer: ReturnType<typeof setTimeout> | null = null;
let pushing = false;
async function pushPlan(plan: string, days: number[]): Promise<void> {
  const synced = leerSynced();
  const prev = synced[plan] || [];
  const adds = diff(days, prev), dels = diff(prev, days);
  if (!adds.length && !dels.length) return;
  const now = new Date().toISOString(), device = deviceId();
  if (adds.length) {
    const { error } = await supabase.from(TABLA).upsert(adds.map((dia) => ({ plan_key: plan, dia, checked_at: now, device })), { onConflict: 'plan_key,dia' });
    if (error) throw new Error(error.message);
  }
  if (dels.length) {
    const { error } = await supabase.from(TABLA).delete().eq('plan_key', plan).in('dia', dels);
    if (error) throw new Error(error.message);
  }
  const s2 = leerSynced(); s2[plan] = limpiar(days); escribirSynced(s2);
}
async function vaciarCola(): Promise<void> {
  if (pushing) return;
  pushing = true;
  try {
    setEstado('sync');
    while (cola.size) {
      const [plan, days] = cola.entries().next().value as [string, number[]];
      cola.delete(plan);
      await pushPlan(plan, days);
    }
    setEstado('ok');
  } catch (e) {
    setEstado('offline', e instanceof Error ? e.message : 'sin red');   // lo pendiente se recupera en el próximo pull (diff vs synced)
  } finally { pushing = false; }
}
/** Empuja el estado completo de un plan (upsert de altas, delete de bajas) sin bloquear la UI. */
export function syncSaveDone(plan: PlanKey | string, days: number[]): void {
  cola.set(plan, limpiar(days));
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => { pushTimer = null; void vaciarCola(); }, 400);   // agrupa toques rápidos
}

// ── PULL (fusión remoto + pendientes locales; migración única incluida) ──
let pullPromise: Promise<boolean> | null = null;
let ultimoPull = 0;
export async function pullAll(force = false): Promise<boolean> {
  if (pullPromise) return pullPromise;
  if (!force && Date.now() - ultimoPull < PULL_MIN_MS) return estado === 'ok';
  pullPromise = (async () => {
    try {
      setEstado('sync');
      const { data, error } = await supabase.from(TABLA).select('plan_key,dia').limit(10000);
      if (error) throw new Error(error.message);
      const remote: Store = {};
      for (const r of (data || []) as { plan_key: string; dia: number }[]) {
        if (!PLAN_KEYS.includes(r.plan_key)) continue;
        (remote[r.plan_key] = remote[r.plan_key] || []).push(Number(r.dia));
      }
      const local = leerStoreLS(), synced = leerSynced();
      const planes = new Set<string>([...Object.keys(local), ...Object.keys(remote), ...Object.keys(synced)]);
      const merged: Store = {};
      const now = new Date().toISOString(), device = deviceId();
      let pushOk = true;
      for (const plan of planes) {
        const L = local[plan] || [], S = synced[plan] || [], R = limpiar(remote[plan] || []);
        const adds = diff(L, S), dels = diff(S, L);           // pendientes locales desde el último sync (1.ª vez: S = ∅ → todo lo local sube)
        const M = diff(union(R, adds), dels);
        merged[plan] = M;
        const subir = diff(M, R), borrar = diff(R, M);
        try {
          if (subir.length) {
            const { error: e1 } = await supabase.from(TABLA).upsert(subir.map((dia) => ({ plan_key: plan, dia, checked_at: now, device })), { onConflict: 'plan_key,dia' });
            if (e1) throw new Error(e1.message);
          }
          if (borrar.length) {
            const { error: e2 } = await supabase.from(TABLA).delete().eq('plan_key', plan).in('dia', borrar);
            if (e2) throw new Error(e2.message);
          }
        } catch (e) { pushOk = false; ultimoError = e instanceof Error ? e.message : 'push'; remote[plan] = R; }
      }
      escribirStoreLS(merged);
      escribirSynced(pushOk ? merged : normalizar(remote));   // si el push falló, el diff se reintenta contra lo que SÍ tiene el remoto
      if (!lsGet(MIGRATED_KEY)) lsSet(MIGRATED_KEY, now);
      ultimoPull = Date.now();
      setEstado(pushOk ? 'ok' : 'offline', pushOk ? null : ultimoError);
      return pushOk;
    } catch (e) {
      setEstado('offline', e instanceof Error ? e.message : 'sin red');
      return false;
    } finally { pullPromise = null; }
  })();
  return pullPromise;
}
/** Dispara el pull en segundo plano si toca (lo llama loadDone). No bloquea ni lanza. */
export function ensurePulled(): void {
  if (pullPromise || Date.now() - ultimoPull < PULL_MIN_MS) return;
  void pullAll();
}

// ── EXPORTAR / IMPORTAR (JSON al portapapeles, sin red) ──
export interface ExportProgreso {
  _export: { tipo: 'jmd-progreso'; version: 1; fecha: string; device: string; planes: number; total: number; nota: string };
  progreso: Store;
  modo_log?: Record<string, string>;
}
export function exportProgreso(): ExportProgreso {
  const progreso = leerStoreLS();
  const modo = leerJSON<Record<string, string>>(MODO_LOG_KEY, {});
  return {
    _export: {
      tipo: 'jmd-progreso', version: 1, fecha: new Date().toISOString(), device: deviceId(),
      planes: Object.keys(progreso).length, total: totalChecks(progreso),
      nota: 'Pegar en otro navegador: cockpit → PROGRESO → Importar. También lo lee DATA/_scripts/gen_revision_semanal.js (--ls).',
    },
    progreso,
    ...(Object.keys(modo).length ? { modo_log: modo } : {}),
  };
}
export function exportProgresoJSON(): string { return JSON.stringify(exportProgreso()); }
export interface ResultadoImport { ok: boolean; planes: number; nuevos: number; total: number; error?: string }
/**
 * Importa un JSON (el de exportProgresoJSON, el export jmd-* del instrumento SEMANA, o el objeto crudo { usmle: [...] }).
 * Fusiona por UNIÓN con lo local (nunca borra un ✓) y empuja cada plan a Supabase.
 */
export function importProgresoJSON(texto: string): ResultadoImport {
  let obj: unknown;
  try { obj = JSON.parse(String(texto || '').trim()); } catch { return { ok: false, planes: 0, nuevos: 0, total: totalChecks(), error: 'no es JSON' }; }
  if (!obj || typeof obj !== 'object') return { ok: false, planes: 0, nuevos: 0, total: totalChecks(), error: 'JSON vacío' };
  const o = obj as Record<string, unknown>;
  const fuente = (o.progreso && typeof o.progreso === 'object') ? o.progreso
    : (o[STORE_KEY] && typeof o[STORE_KEY] === 'object') ? o[STORE_KEY]
      : o;
  const entrante = normalizar(fuente);
  const planes = Object.keys(entrante).filter((k) => entrante[k].length);
  if (!planes.length) return { ok: false, planes: 0, nuevos: 0, total: totalChecks(), error: 'sin planes reconocibles (usmle, mir, …)' };
  const local = leerStoreLS();
  let nuevos = 0;
  for (const plan of planes) {
    const antes = local[plan] || [];
    const despues = union(antes, entrante[plan]);
    nuevos += despues.length - antes.length;
    local[plan] = despues;
  }
  escribirStoreLS(local);
  const modoIn = (o.modo_log && typeof o.modo_log === 'object') ? o.modo_log as Record<string, string>
    : (o[MODO_LOG_KEY] && typeof o[MODO_LOG_KEY] === 'object') ? o[MODO_LOG_KEY] as Record<string, string> : null;
  if (modoIn) {
    const cur = leerJSON<Record<string, string>>(MODO_LOG_KEY, {});
    for (const [f, n] of Object.entries(modoIn)) if (/^\d{4}-\d{2}-\d{2}$/.test(f) && (n === 'VERDE' || n === 'AMBAR' || n === 'ROJO') && !cur[f]) cur[f] = n;
    lsSet(MODO_LOG_KEY, JSON.stringify(cur));
  }
  for (const plan of planes) syncSaveDone(plan, local[plan]);
  emitir();
  return { ok: true, planes: planes.length, nuevos, total: totalChecks(local) };
}
/** Portapapeles web (navigator.clipboard). false si no hay API (el componente cae a un campo de texto). */
export async function copiarAlPortapapeles(texto: string): Promise<boolean> {
  try { const nav = (globalThis as any).navigator; if (nav?.clipboard?.writeText) { await nav.clipboard.writeText(texto); return true; } } catch { /* sin permiso */ }
  return false;
}
export async function leerPortapapeles(): Promise<string | null> {
  try { const nav = (globalThis as any).navigator; if (nav?.clipboard?.readText) { const t = await nav.clipboard.readText(); return typeof t === 'string' ? t : null; } } catch { /* sin permiso: el usuario pega a mano */ }
  return null;
}
