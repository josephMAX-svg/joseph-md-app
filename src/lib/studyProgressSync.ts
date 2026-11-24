/**
 * studyProgressSync.ts — espejo en Supabase (tabla `plan_checks`) de los ✓ de progreso de la app.
 * v5.10 · 12-sep-2026 · vacío 9 de gaps_v3b_synapse.json ("todo el progreso vive en un solo localStorage").
 *
 * Antes: `jmd-study-progress-v1` = { <plan>: number[] } solo en ESE navegador → cambiar de navegador, borrar
 * datos o abrir el móvil = 0 % en los 10 frentes y revisión semanal ciega. Ahora:
 *   · localStorage sigue siendo la CACHÉ y el fallback offline (misma clave, mismo formato: nada se rompe);
 *   · c45 (v6.11): cada toque anota una INTENCIÓN por fila { valor, ts } en `jmd-study-progress-intents-v1` (anotarIntenciones, desde
 *     saveDone / marcarDone). El push sube las pendientes (✓ → upsert, sin ✓ → delete en `plan_checks` {plan_key, dia, checked_at, device})
 *     y solo las retira cuando Supabase las confirma: una escritura que entró pero respondió error, o cuya respuesta tarda, sigue pendiente,
 *     y si Joseph corrige ese ✓ antes del reintento sube lo último que tocó (antes: diff contra `synced`, que perdía o resucitaba ese ✓);
 *   · el primer `loadDone` de la sesión dispara un PULL paginado (order plan_key, dia + range de 1000 en 1000 hasta una página vacía:
 *     PostgREST corta cada respuesta en max-rows) que pinta lo remoto y vuelve a aplicar encima las intenciones pendientes;
 *   · migración: la primera vez todo lo local sube (S = ∅); si hay `synced` de antes y aún no hay cola, lo que el diff contra `synced`
 *     iba a subir pasa a la cola una sola vez (mismo resultado que antes) y desde entonces manda la cola; cada pull hace lo mismo con una
 *     fila donde la caché ≠ `synced` sin intención pendiente (la tocó una pestaña con el bundle anterior al deploy, que no conoce la cola);
 *   · exportar / importar el progreso como JSON (portapapeles) para mover un navegador a otro sin red;
 *   · `DATA/_scripts/gen_revision_semanal.js` lee `plan_checks` directamente (ya no depende del export del navegador).
 * Regla de fusión (c45): caché = remoto ⊕ intenciones (las pendientes y las confirmadas después de que el pull tomara su foto). En
 * plan_checks solo se escribe lo que Joseph tocó (o importó): una caché vieja ya no puede borrar un ✓ del móvil ni resucitar uno desmarcado.
 * Nunca lanza: si Supabase falla, queda local y el push y el pull se reintentan solos. Las otras pestañas del navegador repintan con el
 * evento 'storage'. Sin localStorage (nativo) usa un store en memoria alimentado por el pull.
 */
import { supabase } from './supabase';
import type { PlanKey } from './studyProgress';

export const STORE_KEY = 'jmd-study-progress-v1';           // caché local (formato histórico: { plan: number[] })
export const SYNCED_KEY = 'jmd-study-progress-synced-v1';   // último estado confirmado por Supabase (c45: ya no decide qué sube; lo usan la migración a la cola, las lápidas, el pull para recoger lo que toca una pestaña con el bundle anterior y esa misma pestaña)
export const INTENT_KEY = 'jmd-study-progress-intents-v1';  // c45 · cola de intenciones por fila hasta que Supabase las confirme (ver Intencion)
export const DEVICE_KEY = 'jmd-device';                      // id anónimo del navegador (auditoría de conflictos)
export const MIGRATED_KEY = 'jmd-study-progress-migrated-v1';// fecha ISO de la migración única localStorage → plan_checks
export const MODO_LOG_KEY = 'jmd-modo-log';                  // viaja en el export/import (niveles VERDE/ÁMBAR/ROJO por fecha)
export const TABLA = 'plan_checks';
/** Claves de plan válidas (= PlanKey de studyProgress.ts). Cualquier otra clave se ignora al importar. */
export const PLAN_KEYS: readonly string[] = ['usmle', 'mir', 'research', 'derma', 'business', 'synapse', 'aurum', 'liviano', 'vibecoding', 'research-infra'];
const PULL_MIN_MS = 5 * 60 * 1000;   // no volver a tirar de Supabase antes de 5' (los componentes llaman loadDone en cada montaje)
const ESPERA_MAX_MS = 20 * 1000;     // tope de la espera entre pull y push: una petición colgada no deja al otro esperando sin fin
const REINTENTO_MIN_MS = 30 * 1000;  // push o pull fallido: reintento solo a los 30 s, 1′, 2′… hasta PULL_MIN_MS (un toque nuevo adelanta el push)
const PAGINA = 1000;                 // c45 · filas por petición del pull (max-rows de PostgREST en Supabase)
const MAX_PAGINAS = 200;             // tope de seguridad del bucle del pull (200 000 ✓)
const CONFIRMADA_MS = 2 * PULL_MIN_MS;         // una intención ✓ confirmada se guarda 10′: un pull cuya foto es anterior a la confirmación la vuelve a aplicar
const LAPIDA_MS = 365 * 24 * 60 * 60 * 1000;   // un desmarcado confirmado (o visto desaparecer del remoto) se guarda 1 año: un import más viejo no lo resucita

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
/** Suscripción a cambios de estado/progreso (pull terminado, push confirmado, import, otra pestaña). Devuelve el unsubscribe. */
export function onProgressSync(cb: (i: SyncInfo) => void): () => void { listeners.add(cb); return () => { listeners.delete(cb); }; }
// c45 (E): otra pestaña de este navegador cambió la caché → avisar (useDone repinta sus ✓ y el cockpit recuenta) sin esperar a volver a la pestaña
try {
  (globalThis as any).addEventListener?.('storage', (e: { key?: string | null } | undefined) => { if (!e || e.key == null || e.key === STORE_KEY) emitir(); });
} catch { /* sin eventos de ventana (nativo) */ }

const diff = (a: number[], b: number[]): number[] => { const s = new Set(b); return a.filter((x) => !s.has(x)); };
const union = (a: number[], b: number[]): number[] => limpiar([...a, ...b]);
/** Espera (con tope) a que termine lo que hace `ocupado`: el pull y el push de ESTE dispositivo no se cruzan. Si se cruzan (tope vencido),
 *  la cola de intenciones evita que la foto vieja del remoto pise lo que Joseph tocó. */
async function esperarA(ocupado: () => boolean): Promise<void> {
  const t0 = Date.now();
  while (ocupado() && Date.now() - t0 < ESPERA_MAX_MS) await new Promise<void>((r) => setTimeout(r, 20));
}

// ── COLA DE INTENCIONES (c45) ──
/** Intención de UNA fila: v = con ✓ (true) o sin ✓ (false) · ts = cuándo se tocó (ms) · ok = cuándo la confirmó Supabase (ms); sin ok = pendiente.
 *  Una ✓ confirmada se borra a los CONFIRMADA_MS; un desmarcado confirmado queda como LÁPIDA (LAPIDA_MS) para el import. */
export interface Intencion { v: boolean; ts: number; ok?: number }
export type Intenciones = Record<string, Record<string, Intencion>>;
interface Enviada { dia: number; v: boolean; ts: number }
function normalizarIntenciones(x: unknown): Intenciones {
  const out: Intenciones = {};
  if (!x || typeof x !== 'object') return out;
  for (const [plan, filas] of Object.entries(x as Record<string, unknown>)) {
    if (!PLAN_KEYS.includes(plan) || !filas || typeof filas !== 'object') continue;
    for (const [d, e] of Object.entries(filas as Record<string, any>)) {
      const n = Number(d);
      if (!Number.isInteger(n) || n <= 0 || n >= 100000 || !e || typeof e.v !== 'boolean' || !Number.isFinite(e.ts)) continue;
      (out[plan] = out[plan] || {})[String(n)] = Number.isFinite(e.ok) ? { v: e.v, ts: e.ts, ok: e.ok } : { v: e.v, ts: e.ts };
    }
  }
  return out;
}
let ultimoTs = 0;
const nuevoTs = (): number => (ultimoTs = Math.max(Date.now(), ultimoTs + 1));   // estrictamente creciente: dos toques seguidos nunca comparten ts
function escribirIntenciones(I: Intenciones): void { lsSet(INTENT_KEY, JSON.stringify(I)); }
/** La cola guardada. Si aún no existe la clave, lo pendiente según el diff contra `synced` (lo que el código anterior iba a subir) pasa a la
 *  cola una sola vez: en un navegador que nunca sincronizó, S = ∅ y todo lo local sube (migración única), igual que antes. */
function leerIntenciones(): Intenciones {
  const raw = lsGet(INTENT_KEY);
  if (raw !== null) { try { return normalizarIntenciones(JSON.parse(raw)); } catch { return {}; } }
  const I: Intenciones = {}, L = leerStoreLS(), S = leerSynced();
  for (const plan of new Set<string>([...Object.keys(L), ...Object.keys(S)])) {
    const l = L[plan] || [], s = S[plan] || [];
    for (const d of diff(l, s)) (I[plan] = I[plan] || {})[String(d)] = { v: true, ts: nuevoTs() };
    for (const d of diff(s, l)) (I[plan] = I[plan] || {})[String(d)] = { v: false, ts: nuevoTs() };
  }
  escribirIntenciones(I);
  return I;
}
const pendientesDe = (I: Intenciones, plan: string): Enviada[] =>
  Object.entries(I[plan] || {}).filter(([, e]) => !e.ok).map(([d, e]) => ({ dia: Number(d), v: e.v, ts: e.ts }));
/** ¿Queda algún toque sin confirmar por Supabase? */
export function hayPendientes(): boolean { const I = leerIntenciones(); return Object.keys(I).some((p) => pendientesDe(I, p).length > 0); }
/** Anota la intención de cada fila que cambia de `antes` a `despues` (saveDone e import, ANTES de escribir la caché). */
export function anotarIntenciones(plan: string, antes: number[], despues: number[]): void {
  const a = limpiar(antes), b = limpiar(despues);
  const altas = diff(b, a), bajas = diff(a, b);
  if (!altas.length && !bajas.length) return;
  const I = leerIntenciones(), ent = (I[plan] = I[plan] || {});
  for (const d of altas) ent[String(d)] = { v: true, ts: nuevoTs() };
  for (const d of bajas) ent[String(d)] = { v: false, ts: nuevoTs() };
  escribirIntenciones(I);
}
/** R con las intenciones que cumplen `usar` encima (cada una fija su fila a su valor). */
function aplicar(R: number[], ent: Record<string, Intencion> | undefined, usar: (e: Intencion) => boolean): number[] {
  const s = new Set(R);
  for (const [d, e] of Object.entries(ent || {})) if (usar(e)) { if (e.v) s.add(Number(d)); else s.delete(Number(d)); }
  return Array.from(s).sort((a, b) => a - b);
}

// ── PUSH (lo llama saveDone; cola por plan, nunca lanza) ──
const cola = new Set<string>();   // planes con intenciones por subir
let pushTimer: ReturnType<typeof setTimeout> | null = null;
let pushing = false;
let reintentoMs = 0;
/** Cierra las intenciones de UNA escritura: confirmada → ok (y `synced`); una fila que Joseph volvió a tocar mientras tanto sigue pendiente.
 *  Si esa fila ya tenía una intención MÁS NUEVA confirmada (otra pestaña la subió mientras esta escritura iba por la red), esta escritura
 *  vieja pudo entrar después y pisarla: la nueva vuelve a pendiente y sube otra vez (con respuesta buena o con error: pudo entrar igual). */
function cerrar(plan: string, enviadas: Enviada[], confirmada: boolean): void {
  const I = leerIntenciones(), ent = I[plan] || {}, S = leerSynced(), s = new Set(S[plan] || []), ahora = Date.now();
  let repetir = false;
  for (const p of enviadas) {
    const e = ent[String(p.dia)];
    if (!e) continue;
    if (e.ts === p.ts) { if (confirmada) { e.ok = ahora; if (p.v) s.add(p.dia); else s.delete(p.dia); } }
    else if (e.ok) { delete e.ok; repetir = true; }
  }
  escribirIntenciones(I);
  if (confirmada) { S[plan] = Array.from(s).sort((a, b) => a - b); escribirSynced(S); }
  if (repetir) cola.add(plan);
}
async function escribir(plan: string, enviadas: Enviada[], op: () => PromiseLike<{ error: { message: string } | null }>): Promise<void> {
  let r: { error: { message: string } | null };
  try { r = await op(); } catch (e) { cerrar(plan, enviadas, false); throw e; }
  cerrar(plan, enviadas, !r.error);
  if (r.error) throw new Error(r.error.message);
}
async function pushPlan(plan: string): Promise<void> {
  const pend = pendientesDe(leerIntenciones(), plan);
  if (!pend.length) return;
  const device = deviceId();
  const altas = pend.filter((p) => p.v), bajas = pend.filter((p) => !p.v);
  // checked_at = la hora del TOQUE (p.ts), no la del push: un ✓ hecho sin red y subido al día siguiente (o reenviado) cuenta en su semana
  if (altas.length) await escribir(plan, altas, () => supabase.from(TABLA).upsert(altas.map((p) => ({ plan_key: plan, dia: p.dia, checked_at: new Date(p.ts).toISOString(), device })), { onConflict: 'plan_key,dia' }));
  if (bajas.length) await escribir(plan, bajas, () => supabase.from(TABLA).delete().eq('plan_key', plan).in('dia', bajas.map((p) => p.dia)));
}
async function vaciarCola(): Promise<void> {
  if (pushing) return;
  await esperarA(() => pullPromise !== null);   // un pull en vuelo termina antes
  if (pushing) return;
  pushing = true;
  let plan = '';
  try {
    setEstado('sync');
    while (cola.size) {
      plan = cola.values().next().value as string;
      cola.delete(plan);
      await pushPlan(plan);
    }
    reintentoMs = 0;
    setEstado('ok');
  } catch (e) {
    // sin red: el plan vuelve a la cola y se reintenta solo (30 s, 1′, 2′… hasta 5′), sin esperar a otro toque ni a otro montaje
    if (plan) cola.add(plan);
    reintentoMs = Math.min(reintentoMs ? reintentoMs * 2 : REINTENTO_MIN_MS, PULL_MIN_MS);
    if (!pushTimer) pushTimer = setTimeout(() => { pushTimer = null; void vaciarCola(); }, reintentoMs);
    setEstado('offline', e instanceof Error ? e.message : 'sin red');   // las intenciones siguen guardadas: también las sube el próximo pull
  } finally { pushing = false; }
}
/** Sube las intenciones pendientes de un plan (upsert de los ✓, delete de los desmarcados) sin bloquear la UI. */
export function syncSaveDone(plan: PlanKey | string): void {
  cola.add(plan);
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => { pushTimer = null; void vaciarCola(); }, 400);   // agrupa toques rápidos
}

// ── PULL (remoto paginado + intenciones pendientes encima; migración única incluida) ──
let pullPromise: Promise<boolean> | null = null;
let ultimoPull = 0;
let pullTimer: ReturnType<typeof setTimeout> | null = null;
let reintentoPullMs = 0;
/** Todas las filas de plan_checks por páginas: PostgREST corta cada respuesta en max-rows (1000 en Supabase) y sin `order` el corte se
 *  lleva filas al azar. Orden estable (plan_key, dia) + range hasta una página vacía (una página corta no se toma por la última: el
 *  max-rows del proyecto podría ser menor que PAGINA). */
async function leerRemoto(): Promise<Store> {
  const remote: Store = {};
  for (let desde = 0, n = 0; n < MAX_PAGINAS; n++) {
    const { data, error } = await supabase.from(TABLA).select('plan_key,dia').order('plan_key', { ascending: true }).order('dia', { ascending: true }).range(desde, desde + PAGINA - 1);
    if (error) throw new Error(error.message);
    const filas = (data || []) as { plan_key: string; dia: number }[];
    if (!filas.length) break;
    for (const r of filas) if (PLAN_KEYS.includes(r.plan_key)) (remote[r.plan_key] = remote[r.plan_key] || []).push(Number(r.dia));
    desde += filas.length;
  }
  return remote;
}
function tirar(force: boolean): Promise<boolean> {
  if (pullPromise) return pullPromise;
  if (!force && Date.now() - ultimoPull < PULL_MIN_MS) return Promise.resolve(estado === 'ok');
  pullPromise = (async () => {
    try {
      setEstado('sync');
      await esperarA(() => pushing);   // la foto del remoto se toma, si se puede, con el push de este dispositivo ya confirmado
      leerIntenciones();               // migración a la cola (si toca) ANTES de que el pull reescriba la caché
      const t0 = Date.now();           // la foto del remoto es posterior a t0: lo confirmado antes de t0 ya está en ella
      const remote = await leerRemoto();
      // de aquí al final, síncrono: caché, synced y cola se leen y se escriben sin otra espera por medio
      const local = leerStoreLS(), synced = leerSynced(), I = leerIntenciones(), ahora = Date.now();
      const final: Store = {}, sinc: Store = {};
      for (const plan of new Set<string>([...Object.keys(local), ...Object.keys(remote), ...Object.keys(synced), ...Object.keys(I)])) {
        const R = limpiar(remote[plan] || []), ent = (I[plan] = I[plan] || {});
        // una fila donde la caché ≠ synced sin intención pendiente la tocó quien no usa la cola (una pestaña con el bundle anterior al deploy,
        // o un corte entre escribir la cola y la caché): pasa a la cola con el valor de la caché, como en la migración, antes de que la foto la pise
        const l = new Set(local[plan] || []), sy = new Set(synced[plan] || []);
        for (const d of new Set<number>([...l, ...sy])) {
          const e = ent[String(d)];
          if (l.has(d) !== sy.has(d) && !(e && !e.ok)) ent[String(d)] = { v: l.has(d), ts: nuevoTs() };
        }
        final[plan] = aplicar(R, ent, (e) => !e.ok || e.ok > t0);   // remoto + lo tocado aquí sin confirmar (o confirmado después de la foto)
        sinc[plan] = aplicar(R, ent, (e) => !!e.ok && e.ok > t0);   // lo que tiene Supabase
        // un ✓ ya sincronizado que falta en el remoto lo desmarcó otro dispositivo → lápida (un import más viejo no lo resucita); si la fila ya
        // tenía una lápida, se renueva: que esté en synced quiere decir que se volvió a ver ✓ después, así que esta desaparición es nueva
        const r = new Set(R);
        for (const d of synced[plan] || []) {
          if (r.has(d)) continue;
          const e = ent[String(d)];
          if (!e || (e.ok && e.ok <= t0)) ent[String(d)] = { v: false, ts: t0, ok: t0 };
        }
        for (const [d, e] of Object.entries(ent)) if (e.ok && (e.v ? ahora - e.ok > CONFIRMADA_MS : ahora - e.ts > LAPIDA_MS)) delete ent[d];
        if (!Object.keys(ent).length) delete I[plan];
        else if (pendientesDe(I, plan).length) cola.add(plan);   // lo pendiente sube en el push de después (pullAll), con su reintento
      }
      escribirStoreLS(final);   // primero la caché y luego synced: otra pestaña que lea entre medias no toma un ✓ remoto por un desmarcado suyo
      escribirSynced(sinc);
      escribirIntenciones(I);
      if (!lsGet(MIGRATED_KEY)) lsSet(MIGRATED_KEY, new Date().toISOString());
      ultimoPull = Date.now();
      reintentoPullMs = 0;
      setEstado('ok');
      return true;
    } catch (e) {
      // c45 (J): sin red, o una página que falla: el pull también se reintenta solo (30 s, 1′, 2′… hasta 5′), sin esperar a otro montaje
      reintentoPullMs = Math.min(reintentoPullMs ? reintentoPullMs * 2 : REINTENTO_MIN_MS, PULL_MIN_MS);
      if (!pullTimer) pullTimer = setTimeout(() => { pullTimer = null; void pullAll(true); }, reintentoPullMs);
      setEstado('offline', e instanceof Error ? e.message : 'sin red');
      return false;
    } finally { pullPromise = null; }
  })();
  return pullPromise;
}
/** Pull + subida de lo pendiente. true = remoto leído y nada pendiente sin confirmar. */
export async function pullAll(force = false): Promise<boolean> {
  const ok = await tirar(force);
  if (!ok || !hayPendientes()) return ok;
  const I = leerIntenciones();
  for (const plan of Object.keys(I)) if (pendientesDe(I, plan).length) cola.add(plan);
  await esperarA(() => pushing);
  await vaciarCola();
  return !hayPendientes();
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
  /** c45 (L): la cola de intenciones del exportador (sus toques con su hora): el import la usa para saber si un ✓ es posterior a un desmarcado. */
  intenciones?: Intenciones;
  modo_log?: Record<string, string>;
}
export function exportProgreso(): ExportProgreso {
  const progreso = leerStoreLS();
  const intenciones = leerIntenciones();
  const modo = leerJSON<Record<string, string>>(MODO_LOG_KEY, {});
  return {
    _export: {
      tipo: 'jmd-progreso', version: 1, fecha: new Date().toISOString(), device: deviceId(),
      planes: Object.keys(progreso).length, total: totalChecks(progreso),
      nota: 'Pegar en otro navegador: cockpit → PROGRESO → Importar. También lo lee DATA/_scripts/gen_revision_semanal.js (--ls).',
    },
    progreso,
    ...(Object.keys(intenciones).length ? { intenciones } : {}),
    ...(Object.keys(modo).length ? { modo_log: modo } : {}),
  };
}
export function exportProgresoJSON(): string { return JSON.stringify(exportProgreso()); }
export interface ResultadoImport { ok: boolean; planes: number; nuevos: number; total: number; descartados?: number; error?: string }
/**
 * Importa un JSON (el de exportProgresoJSON, el export jmd-* del instrumento SEMANA, o el objeto crudo { usmle: [...] }).
 * Añade los ✓ que falten (nunca borra uno) y los sube a Supabase como intenciones.
 * c45 (L): un ✓ del JSON que este navegador sabe desmarcado (un desmarcado suyo, o uno de otro dispositivo que vio desaparecer en un pull)
 * solo vuelve si el exportador lo MARCÓ después (su cola de intenciones, que viaja en el export: `intenciones`, o la clave
 * jmd-study-progress-intents-v1 del export jmd-* de SEMANA); si no, no vuelve (`descartados`). La fecha del export no basta: un navegador
 * sin red exporta su foto vieja con la fecha de hoy. Un ✓ que el exportador solo vio en un pull ya está en plan_checks: llega con el
 * siguiente pull de este navegador. Sin cola en el JSON (export anterior a la c45, objeto crudo), cualquier desmarcado conocido gana.
 * Límite: plan_checks no guarda los borrados, así que un desmarcado hecho en otro dispositivo que este navegador nunca llegó a ver
 * (navegador nuevo, o lápida de más de 1 año) sí puede volver con un export viejo.
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
  const exI = normalizarIntenciones(o.intenciones ?? o[INTENT_KEY]);   // la cola del exportador ({} si el JSON no la trae)
  const local = leerStoreLS(), I = leerIntenciones();
  let nuevos = 0, descartados = 0;
  for (const plan of planes) {
    const antes = local[plan] || [], ya = new Set(antes), ent = I[plan] || {};
    const entran = entrante[plan].filter((d) => {
      if (ya.has(d)) return false;
      const e = ent[String(d)], x = exI[plan]?.[String(d)];
      if (e && !e.v && !(x && x.v && x.ts > e.ts)) { descartados++; return false; }   // desmarcado conocido y sin un ✓ posterior del exportador
      return true;
    });
    if (!entran.length) continue;
    const despues = union(antes, entran);
    anotarIntenciones(plan, antes, despues);
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
  for (const plan of planes) syncSaveDone(plan);
  emitir();
  return { ok: true, planes: planes.length, nuevos, total: totalChecks(local), descartados };
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
