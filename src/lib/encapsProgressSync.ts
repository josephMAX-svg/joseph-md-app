/**
 * encapsProgressSync.ts — CIERRE DE SESIÓN ENCAPS desde la app (régimen MANTENIMIENTO 2027-I · v5.15, D1 = mié 23-sep-2026).
 *
 * Cierra el circuito del % CIEGO REAL sin pasar por una sesión de Claude: el formulario de cierre de EncapsPlanView
 * (final de la cola del día) llama a `cerrarSesion()` y esta capa:
 *  1) valida la ronda con las MISMAS reglas que DATA/_scripts/gen_encaps_semana.js --cerrar
 *     (n − seguras − dudosas debe coincidir con la suma de fallos por subtipo; avisa si no);
 *  2) la guarda SIEMPRE en localStorage 'jmd-encaps-cierres' (try/catch; append/upsert por id);
 *  3) la upsertea en Supabase `study_progress` con la misma fórmula del script:
 *       porcentaje = correctas_seguras / n × 100 · especialidad = código · preguntas_resueltas = n
 *       errores_por_tipo = { tipoRonda, fallos, seguras, dudosas, sub_eje, nota, … } · fuente = 'app:cierre'
 *     (study_progress no tiene UNIQUE → el upsert es select→update/insert por examen+fecha+especialidad+fuente+tipoRonda);
 *  4) si la ronda es mini_sim / simulacro / pretest, espeja la nota en `study_sim_scores` (sim_n = día del plan);
 *  5) produce la LÍNEA de cierre (`--cerrar`) y un JSON con la forma del export del runner gen_encaps_minisim.js
 *     (`--registrar <json> --append` lo apenda a _registro_resoluciones.json), para que registro y Supabase converjan.
 *
 * Métrica que manda (README_SISTEMA_TRACKING.md): % CIEGO = correctas SEGURAS / total; las dudosas/adivinadas NO cuentan.
 * Taxonomía v3 (Palmerton): knowledge CONCEPTO·OLVIDO·CRONOLOGIA · transfer CCSN·CONTEXTO · proceso CAMBIO·TIEMPO·LECTURA.
 * Regla #11: la app solo lee/escribe Supabase (nunca Claude); si Supabase falla, la ronda queda local y se reintenta.
 */
import { supabase } from './supabase';

// ── Tipos v3 (espejo del esquema de ronda del README) ──
export type TipoRonda = 'banco_dia' | 'eval_anclada' | 'mini_sim' | 'pretest' | 'simulacro' | 'repaso' | 'warmup';
export const TIPOS_RONDA: TipoRonda[] = ['banco_dia', 'eval_anclada', 'mini_sim', 'pretest', 'simulacro', 'repaso', 'warmup'];
export const TIPO_RONDA_LABEL: Record<TipoRonda, string> = {
  banco_dia: 'Banco del día', eval_anclada: 'Eval anclada', mini_sim: 'Mini-sim /25', pretest: 'Pre-test',
  simulacro: 'Simulacro', repaso: 'Repaso', warmup: 'Warm-up',
};
export type TipoFallo = 'knowledge' | 'transfer' | 'proceso';
export type SubtipoFallo = 'CONCEPTO' | 'OLVIDO' | 'CRONOLOGIA' | 'CCSN' | 'CONTEXTO' | 'CAMBIO' | 'TIEMPO' | 'LECTURA';
export interface FallosPorTipo {
  knowledge: { CONCEPTO: number; OLVIDO: number; CRONOLOGIA: number };
  transfer: { CCSN: number; CONTEXTO: number };
  proceso: { CAMBIO: number; TIEMPO: number; LECTURA: number };
}
export const SUBTIPOS: Record<TipoFallo, SubtipoFallo[]> = {
  knowledge: ['CONCEPTO', 'OLVIDO', 'CRONOLOGIA'],
  transfer: ['CCSN', 'CONTEXTO'],
  proceso: ['CAMBIO', 'TIEMPO', 'LECTURA'],
};
export const TIPO_DE: Record<SubtipoFallo, TipoFallo> = {
  CONCEPTO: 'knowledge', OLVIDO: 'knowledge', CRONOLOGIA: 'knowledge',
  CCSN: 'transfer', CONTEXTO: 'transfer',
  CAMBIO: 'proceso', TIEMPO: 'proceso', LECTURA: 'proceso',
};
export const TIPO_FALLO_LABEL: Record<TipoFallo, string> = { knowledge: 'knowledge', transfer: 'transfer', proceso: 'proceso' };
// Significado + cura (tabla del README_SISTEMA_TRACKING · taxonomía v3).
export const SUBTIPO_INFO: Record<SubtipoFallo, { label: string; cura: string }> = {
  CONCEPTO: { label: 'no entiende la idea', cura: 'nota Obsidian (porqué) + re-pregunta con otro enfoque' },
  OLVIDO: { label: 'cifra/plazo que supo', cura: 'tarjeta Anki esa misma tarde' },
  CRONOLOGIA: { label: 'secuencia o plazo mal aprendido', cura: 'tabla de secuencia + Anki' },
  CCSN: { label: 'confusión entre conceptos vecinos', cura: 'tabla comparativa + imagen mnemónica' },
  CONTEXTO: { label: 'no leyó la palabra clave', cura: 'subrayar el gatillo antes de responder' },
  CAMBIO: { label: 'cambió una correcta por incorrecta', cura: 'no cambiar sin evidencia nueva en el enunciado' },
  TIEMPO: { label: 'se pasó de 72 s/Q', cura: 'ritmo: marcar y seguir' },
  LECTURA: { label: 'leyó mal enunciado/opciones', cura: 'releer la pregunta antes de las opciones' },
};

export interface CierreSesion {
  /** id estable de la ronda en la app: APP_<TIPO>_<fecha>_<codigo> (distinto de los BANCO_/EVAL_/MINISIM_ del runner) */
  id: string;
  examen: 'ENCAPS';
  tipoRonda: TipoRonda;
  fecha: string;              // YYYY-MM-DD (Lima)
  dia: number | null;         // D# del plan (study_schedule.dia)
  codigo: string;             // código del temario (I-3, V-2, II-EMG…) · MIX en mini-sim/pretest
  tema: string;               // sub-eje legible / texto libre
  sub_eje: string | null;     // clave del sub-eje (study_schedule.extra.sub_eje)
  n: number;
  correctas_seguras: number;
  correctas_dudosas: number;
  fallos_por_tipo: FallosPorTipo;
  tiempo_medio_seg: number | null;
  pct_ciego: number;          // derivado = seguras / n × 100 (1 decimal, igual que el script)
  nota: number | null;        // solo mini_sim / simulacro / pretest: nota bruta (seguras + dudosas por defecto)
  sim_n: number | null;       // study_sim_scores.sim_n (= día del plan en los mini-sims)
  updatedAt: string;          // ISO
  supabase: boolean;          // true si study_progress respondió sin error
  supabaseId?: string | null; // uuid de la fila en study_progress
}

export const CIERRES_KEY = 'jmd-encaps-cierres';
export const FUENTE_APP = 'app:cierre';
export const FUENTE_APP_LOCAL = 'app:cierre:local'; // fila derivada de un cierre aún no sincronizado (solo en memoria/Cockpit)
const TIPOS_CON_NOTA: TipoRonda[] = ['mini_sim', 'simulacro', 'pretest'];

// ── helpers de fórmula (idénticos a gen_encaps_semana.js) ──
export const emptyFallos = (): FallosPorTipo => ({
  knowledge: { CONCEPTO: 0, OLVIDO: 0, CRONOLOGIA: 0 },
  transfer: { CCSN: 0, CONTEXTO: 0 },
  proceso: { CAMBIO: 0, TIEMPO: 0, LECTURA: 0 },
});
export function sumFallos(f: FallosPorTipo | null | undefined): number {
  if (!f) return 0;
  return (Object.values(f) as Record<string, number>[]).reduce((n, g) => n + Object.values(g || {}).reduce((m, v) => m + (Number(v) || 0), 0), 0);
}
export function sumTipo(f: FallosPorTipo | null | undefined, tipo: TipoFallo): number {
  if (!f || !f[tipo]) return 0;
  return Object.values(f[tipo] as Record<string, number>).reduce((m, v) => m + (Number(v) || 0), 0);
}
/** % ciego con 1 decimal (misma redondeo que el script: Math.round(a/b*1000)/10). */
export const pctCiego = (seguras: number, n: number): number => (n ? Math.round((seguras / n) * 1000) / 10 : 0);
export function fallosDesdePlano(plano: Partial<Record<SubtipoFallo, number>>): FallosPorTipo {
  const f = emptyFallos();
  for (const s of Object.keys(TIPO_DE) as SubtipoFallo[]) {
    const v = Math.max(0, Math.round(Number(plano[s] || 0)));
    (f[TIPO_DE[s]] as Record<string, number>)[s] = v;
  }
  return f;
}
export function fallosAPlano(f: FallosPorTipo | null | undefined): Record<SubtipoFallo, number> {
  const out = {} as Record<SubtipoFallo, number>;
  for (const s of Object.keys(TIPO_DE) as SubtipoFallo[]) out[s] = Number((f?.[TIPO_DE[s]] as Record<string, number> | undefined)?.[s] || 0);
  return out;
}
/** Lee `errores_por_tipo` de una fila de study_progress: acepta la forma v3 ({ fallos: {knowledge…} }) del script/app y la forma
 *  plana por defecto de la tabla ({ ccsn, olvido, concepto, contexto, cronologia, terminology }). */
export function fallosDeErrores(err: unknown): FallosPorTipo | null {
  if (!err || typeof err !== 'object') return null;
  const e = err as Record<string, unknown>;
  const src = (e.fallos && typeof e.fallos === 'object') ? e.fallos as Record<string, unknown> : e;
  if (src.knowledge || src.transfer || src.proceso) {
    const f = emptyFallos();
    for (const t of Object.keys(SUBTIPOS) as TipoFallo[]) {
      const g = (src[t] || {}) as Record<string, unknown>;
      for (const s of SUBTIPOS[t]) (f[t] as Record<string, number>)[s] = Number(g[s] || 0) || 0;
    }
    return f;
  }
  const plano: Partial<Record<SubtipoFallo, number>> = {};
  let alguno = false;
  for (const [k, v] of Object.entries(src)) {
    const S = k.toUpperCase().replace('Í', 'I') as SubtipoFallo;
    if (TIPO_DE[S] && typeof v === 'number') { plano[S] = v; alguno = true; }
  }
  return alguno ? fallosDesdePlano(plano) : null;
}

export function cierreId(tipoRonda: TipoRonda, fecha: string, codigo: string): string {
  return `APP_${tipoRonda.toUpperCase()}_${fecha}_${(codigo || 'MIX').replace(/[^A-Za-z0-9+/-]/g, '')}`;
}
const clampInt = (v: unknown, min: number, max: number): number => {
  const n = Math.round(Number(v));
  return isNaN(n) ? min : Math.max(min, Math.min(max, n));
};
/** Normaliza un cierre parcial al esquema v3 completo (id, pct, nota por defecto). */
export function normalizarCierre(c: Partial<CierreSesion> & { tipoRonda: TipoRonda; fecha: string; codigo: string; n: number }): CierreSesion {
  const n = clampInt(c.n, 0, 500);
  const seg = clampInt(c.correctas_seguras ?? 0, 0, n);
  const dud = clampInt(c.correctas_dudosas ?? 0, 0, Math.max(0, n - seg));
  const codigo = String(c.codigo || 'MIX').trim() || 'MIX';
  const tipoRonda = TIPOS_RONDA.includes(c.tipoRonda) ? c.tipoRonda : 'banco_dia';
  const conNota = TIPOS_CON_NOTA.includes(tipoRonda);
  const notaRaw = c.nota == null || c.nota === undefined ? null : Number(c.nota);
  return {
    id: c.id || cierreId(tipoRonda, c.fecha, codigo),
    examen: 'ENCAPS', tipoRonda, fecha: String(c.fecha).slice(0, 10), dia: c.dia == null ? null : Number(c.dia),
    codigo, tema: String(c.tema || '').slice(0, 300), sub_eje: c.sub_eje ? String(c.sub_eje) : null,
    n, correctas_seguras: seg, correctas_dudosas: dud,
    fallos_por_tipo: c.fallos_por_tipo ? fallosDesdePlano(fallosAPlano(c.fallos_por_tipo)) : emptyFallos(),
    tiempo_medio_seg: c.tiempo_medio_seg == null || isNaN(Number(c.tiempo_medio_seg)) ? null : Math.max(0, Math.round(Number(c.tiempo_medio_seg))),
    pct_ciego: pctCiego(seg, n),
    nota: conNota ? (notaRaw == null || isNaN(notaRaw) ? seg + dud : Math.max(0, Math.min(n || 25, notaRaw))) : null,
    sim_n: conNota ? (c.sim_n == null ? (c.dia == null ? null : Number(c.dia)) : Number(c.sim_n)) : null,
    updatedAt: c.updatedAt || new Date().toISOString(),
    supabase: !!c.supabase, supabaseId: c.supabaseId ?? null,
  };
}
/** Validación con las reglas del script: errores bloquean; avisos se guardan igual (como hace --cerrar). */
export function validarCierre(c: CierreSesion): { errores: string[]; avisos: string[] } {
  const errores: string[] = [], avisos: string[] = [];
  if (!/^20\d\d-\d\d-\d\d$/.test(c.fecha)) errores.push('fecha inválida');
  if (!c.n) errores.push('falta n (nº de preguntas)');
  if (!c.codigo) errores.push('falta el código');
  const esperado = c.n - c.correctas_seguras - c.correctas_dudosas;
  if (esperado < 0) errores.push('seguras + dudosas > n');
  const fallos = sumFallos(c.fallos_por_tipo);
  if (!errores.length && fallos !== esperado) avisos.push(`fallos clasificados ${fallos} ≠ n − seg − dud = ${esperado} (se guarda igual; corrige si es error)`);
  if (c.tipoRonda === 'mini_sim' && c.n !== 25) avisos.push(`mini-sim con n=${c.n} (la receta v3 es 25Q)`);
  if (c.tipoRonda === 'eval_anclada' && c.n !== 5) avisos.push(`eval anclada con n=${c.n} (la regla es 5Q)`);
  return { errores, avisos };
}

// ── localStorage (try/catch; clave jmd-encaps-cierres) ──
function leerLS(): CierreSesion[] {
  try {
    const ls = (globalThis as any).localStorage;
    if (!ls) return [];
    const raw = ls.getItem(CIERRES_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => x && typeof x.id === 'string' && typeof x.fecha === 'string') : [];
  } catch { return []; }
}
function escribirLS(list: CierreSesion[]): void {
  try {
    const ls = (globalThis as any).localStorage;
    if (ls) ls.setItem(CIERRES_KEY, JSON.stringify(list));
  } catch { /* sin storage: solo memoria */ }
}
const listeners = new Set<(l: CierreSesion[]) => void>();
export function onCierresChange(cb: (l: CierreSesion[]) => void): () => void { listeners.add(cb); return () => { listeners.delete(cb); }; }
function emitir(l: CierreSesion[]): void { listeners.forEach((cb) => { try { cb(l); } catch { /* ignore */ } }); }
/** Todos los cierres locales ordenados por fecha/updatedAt. */
export function loadCierres(): CierreSesion[] {
  return leerLS().sort((a, b) => a.fecha.localeCompare(b.fecha) || a.updatedAt.localeCompare(b.updatedAt));
}
export function guardarCierreLocal(c: CierreSesion): CierreSesion[] {
  const list = leerLS().filter((x) => x.id !== c.id);
  list.push(c);
  const out = list.sort((a, b) => a.fecha.localeCompare(b.fecha) || a.updatedAt.localeCompare(b.updatedAt));
  escribirLS(out);
  emitir(out);
  return out;
}
export function borrarCierreLocal(id: string): CierreSesion[] {
  const out = leerLS().filter((x) => x.id !== id);
  escribirLS(out);
  emitir(out);
  return out;
}

// ── Supabase: study_progress (misma fórmula/JSON que gen_encaps_semana.js sqlProgress) + study_sim_scores ──
export function filaProgress(c: CierreSesion) {
  return {
    fecha: c.fecha,
    especialidad: c.codigo,
    examen: 'ENCAPS',
    porcentaje: c.pct_ciego,
    fuente: FUENTE_APP,
    preguntas_resueltas: c.n,
    errores_por_tipo: {
      tipoRonda: c.tipoRonda, fallos: c.fallos_por_tipo, seguras: c.correctas_seguras, dudosas: c.correctas_dudosas,
      sub_eje: c.sub_eje, nota: c.nota, id: c.id, dia: c.dia, tema: c.tema || null, tiempo_medio_seg: c.tiempo_medio_seg, app: 'cierre',
    },
    tiempo_promedio_pregunta: c.tiempo_medio_seg != null ? `${c.tiempo_medio_seg} seconds` : null,
  };
}
export interface ResultadoSync { ok: boolean; supabaseId: string | null; simOk: boolean | null; error?: string }
/**
 * Upsert en study_progress. La tabla solo tiene PK(id) → buscamos la fila de la MISMA sesión
 * (examen + fecha + especialidad + fuente 'app:cierre' + errores_por_tipo.tipoRonda) y actualizamos; si no existe, insertamos.
 * Si la ronda lleva nota (mini_sim / simulacro / pretest) y sim_n, espeja en study_sim_scores (upsert examen,sim_n).
 * Nunca lanza: devuelve ok=false si Supabase falla (la ronda queda en localStorage para reintentar).
 */
export async function setStudyProgress(c: CierreSesion): Promise<ResultadoSync> {
  let supabaseId: string | null = c.supabaseId ?? null;
  try {
    const fila = filaProgress(c);
    if (!supabaseId) {
      const { data: prev, error: e0 } = await supabase
        .from('study_progress').select('id')
        .eq('examen', 'ENCAPS').eq('fecha', c.fecha).eq('especialidad', c.codigo).eq('fuente', FUENTE_APP)
        .eq('errores_por_tipo->>tipoRonda', c.tipoRonda)
        .order('created_at', { ascending: false }).limit(1);
      if (e0) return { ok: false, supabaseId: null, simOk: null, error: e0.message };
      if (prev && prev.length) supabaseId = String((prev[0] as { id: string }).id);
    }
    if (supabaseId) {
      const { error } = await supabase.from('study_progress').update(fila).eq('id', supabaseId);
      if (error) return { ok: false, supabaseId, simOk: null, error: error.message };
    } else {
      const { data, error } = await supabase.from('study_progress').insert(fila).select('id').limit(1);
      if (error) return { ok: false, supabaseId: null, simOk: null, error: error.message };
      supabaseId = data && data.length ? String((data[0] as { id: string }).id) : null;
    }
    let simOk: boolean | null = null;
    if (c.nota != null && c.sim_n != null && TIPOS_CON_NOTA.includes(c.tipoRonda)) {
      const { error: e2 } = await supabase
        .from('study_sim_scores')
        .upsert({ examen: 'ENCAPS', sim_n: c.sim_n, nota: c.nota, fecha: c.fecha, updated_at: new Date().toISOString() }, { onConflict: 'examen,sim_n' });
      simOk = !e2;
    }
    return { ok: true, supabaseId, simOk };
  } catch (e) {
    return { ok: false, supabaseId, simOk: null, error: e instanceof Error ? e.message : 'sin red' };
  }
}
/** Guarda local (siempre) + Supabase (si responde). Devuelve el cierre final y la lista local. */
export async function cerrarSesion(input: Partial<CierreSesion> & { tipoRonda: TipoRonda; fecha: string; codigo: string; n: number }): Promise<{ cierre: CierreSesion; cierres: CierreSesion[]; sync: ResultadoSync }> {
  const c = normalizarCierre({ ...input, updatedAt: new Date().toISOString() });
  guardarCierreLocal(c);
  const sync = await setStudyProgress(c);
  const final: CierreSesion = { ...c, supabase: sync.ok, supabaseId: sync.supabaseId ?? c.supabaseId ?? null };
  const cierres = guardarCierreLocal(final);
  return { cierre: final, cierres, sync };
}
/** Reintenta los cierres locales que no llegaron a Supabase. Devuelve cuántos se sincronizaron. */
export async function sincronizarPendientes(): Promise<{ intentados: number; ok: number; cierres: CierreSesion[] }> {
  const pend = leerLS().filter((x) => !x.supabase);
  let ok = 0;
  for (const c of pend) {
    const r = await setStudyProgress(c);
    if (r.ok) { ok++; guardarCierreLocal({ ...c, supabase: true, supabaseId: r.supabaseId }); }
  }
  return { intentados: pend.length, ok, cierres: loadCierres() };
}

// ── Salidas compatibles con el pipeline de ficheros (registro / runner) ──
/** Línea de cierre para `node DATA/_scripts/gen_encaps_semana.js --cerrar "<línea>"` (mismo formato que emite el runner). */
export function lineaCierre(c: CierreSesion): string {
  const fl = (Object.values(c.fallos_por_tipo) as Record<string, number>[])
    .flatMap((g) => Object.entries(g)).filter(([, v]) => v).map(([k, v]) => `${k}:${v}`).join(',') || 'CONCEPTO:0';
  const tema = String(c.tema || '').replace(/\|/g, '/');
  return `ENCAPS|${c.tipoRonda}|${c.fecha}|${c.codigo || 'MIX'}|n=${c.n}|seg=${c.correctas_seguras}|dud=${c.correctas_dudosas}|${fl}|t=${c.tiempo_medio_seg ?? 0}`
    + (c.sub_eje ? `|sub=${c.sub_eje}` : '') + (tema ? `|tema=${tema}` : '') + (c.nota != null && TIPOS_CON_NOTA.includes(c.tipoRonda) ? `|nota=${c.nota}` : '');
}
/** Ronda v3 con la MISMA forma que el export del runner (gen_encaps_minisim.js): apta para `--registrar <json> --append`. */
export function rondaExport(c: CierreSesion) {
  const ok = c.correctas_seguras + c.correctas_dudosas;
  return {
    id: c.id, examen: 'ENCAPS', tipoRonda: c.tipoRonda, fecha: c.fecha, codigo: c.codigo, tema: c.tema || '', sub_eje: c.sub_eje,
    fuente_preguntas: 'app:cierre (cierre agregado desde la app · sin detalle por ítem)', vector_referencia: 'v3 II30·I27·V21·III13·IV9',
    n: c.n, correctas_seguras: c.correctas_seguras, correctas_dudosas: c.correctas_dudosas, fallos_por_tipo: c.fallos_por_tipo,
    tiempo_medio_seg: c.tiempo_medio_seg, pct_ciego: c.pct_ciego, nota: c.nota != null ? c.nota : ok, puntaje: `${ok}/${c.n}`,
    delta_es: null, preguntas: [] as unknown[],
    _app: { dia: c.dia, sim_n: c.sim_n, updatedAt: c.updatedAt, supabase: c.supabase, supabaseId: c.supabaseId ?? null, linea_cierre: lineaCierre(c) },
  };
}
export function exportCierreJSON(c: CierreSesion): string { return JSON.stringify(rondaExport(c), null, 1); }
/** Todos los cierres locales como { _meta, rondas[] } (mismo esquema de rondas que _registro_resoluciones.json). */
export function exportCierresJSON(list: CierreSesion[] = loadCierres()): string {
  return JSON.stringify({
    _meta: { origen: 'joseph-md-app · EncapsPlanView cierre de sesión', exportado: new Date().toISOString(), clave_localStorage: CIERRES_KEY, n: list.length, uso: 'cada ronda → node DATA/_scripts/gen_encaps_minisim.js --registrar <ronda.json> --append · o pegar la línea_cierre en gen_encaps_semana.js --cerrar' },
    rondas: list.map(rondaExport),
  }, null, 1);
}
/** Copia al portapapeles en web (navigator.clipboard). Devuelve false si no hay API (el componente cae a Share). */
export async function copiarTexto(texto: string): Promise<boolean> {
  try {
    const nav = (globalThis as any).navigator;
    if (nav && nav.clipboard && nav.clipboard.writeText) { await nav.clipboard.writeText(texto); return true; }
  } catch { /* cae al Share */ }
  return false;
}
/** Fila equivalente a study_progress para un cierre local aún no sincronizado (el Cockpit la mezcla con las remotas). */
export function cierreARow(c: CierreSesion) {
  return {
    fecha: c.fecha, especialidad: c.codigo, examen: 'ENCAPS', porcentaje: c.pct_ciego, fuente: c.supabase ? FUENTE_APP : FUENTE_APP_LOCAL,
    preguntas_resueltas: c.n, errores_por_tipo: filaProgress(c).errores_por_tipo as Record<string, unknown>,
    tiempo_promedio_pregunta: c.tiempo_medio_seg != null ? `${c.tiempo_medio_seg} seconds` : null, created_at: c.updatedAt,
  };
}
