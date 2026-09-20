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
 */
import { supabase } from './supabase';
import { DIAS, DiaUSMLE, USMLE_GATE, esHito, faseDe } from './usmleStep1Daily';

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
  };
}
/** ¿Trae algún campo de la 2.ª capa? (decide si se envía la columna `extra`) */
function tieneExtra(s: UsmleScore): boolean {
  return s.cambiadas != null || s.relecturas != null || s.nFallos != null || s.nConocidos != null || !!(s.bloquesPct && s.bloquesPct.length);
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
  if (conExtra && tieneExtra(s)) base.extra = { cambiadas: s.cambiadas ?? null, relecturas: s.relecturas ?? null, nFallos: s.nFallos ?? null, nConocidos: s.nConocidos ?? null, bloquesPct: s.bloquesPct ?? null };
  return base;
}
function deFila(r: any): UsmleScore | null {
  if (!r || typeof r.fecha !== 'string') return null;
  const ex = r.extra && typeof r.extra === 'object' ? r.extra : {};
  return normalizar({
    fecha: r.fecha.slice(0, 10), d: r.d, pretest10: r.pretest10, consol30pct: r.consol30_pct, evalPct: r.eval_pct,
    tipoError: r.tipo_error, nivelUW: r.nivel_uw, notas: r.notas || '', updatedAt: r.updated_at || new Date().toISOString(),
    cambiadas: ex.cambiadas, relecturas: ex.relecturas, nFallos: ex.nFallos, nConocidos: ex.nConocidos, bloquesPct: ex.bloquesPct,
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
    const h = HITOS_ONTRACK.find((t) => t.match.test(dia.uw));
    const pct = s?.evalPct ?? null;
    const minimo = h?.min ?? USMLE_GATE.pct;
    if (pct == null) return { estado: 'sin-dato', pct, minimo, metrica: `% del ${h?.clave || dia.uw}`, label: '— sin registrar', detalle: h?.min != null ? `mínimo on-track ${h.min}%` : (h?.nota || 'baseline: se lee por tramos, no es gate') };
    if (h?.min == null) {
      // #12: hitos sin mínimo (UWSA1 baseline, UWSA2 low-risk) se LEEN por tramos; no son gate
      const tr = h ? lecturaHito(h, pct) : null;
      return tr
        ? { estado: 'lectura', pct, minimo, metrica: `% del ${h!.clave}`, label: `● ${pct}% · ${tr.label}`, detalle: tr.accion }
        : { estado: 'sube', pct, minimo, metrica: `% del ${h?.clave || dia.uw}`, label: `✓ ${pct}% registrado`, detalle: h?.nota || 'baseline' };
    }
    const ok = pct >= h.min;
    if (!ok && s) {
      // REGLA §E-7: si el hito con mínimo anterior también quedó bajo mínimo → ALERTA BURNOUT (gateHito sobre local + este registro)
      const merged = leer().filter((x) => x.fecha !== s.fecha).concat([normalizar({ ...s, updatedAt: s.updatedAt || new Date().toISOString() })]);
      const gh = gateHito(merged, dia.fecha);
      if (gh.estado === 'ALERTA BURNOUT') return { estado: 'repite', pct, minimo: h.min, metrica: `% del ${h.clave}`, label: gh.label, detalle: gh.detalle };
    }
    return { estado: ok ? 'sube' : 'repite', pct, minimo: h.min, metrica: `% del ${h.clave}`, label: ok ? `✓ ON-TRACK · ${pct}% ≥ ${h.min}%` : `✗ BAJO MÍNIMO · ${pct}% < ${h.min}%`, detalle: ok ? 'trayectoria de GO intacta' : 'auditar el MÉTODO esta semana (checklist §G), no sumar horas · un segundo hito bajo mínimo dispara ALERTA BURNOUT (§E-7)' };
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
export const HITOS_ONTRACK_FUENTE = 'DATA/USMLE/PALMERTON_POR_MATERIA.md · Parte V-A (regla Palmerton del +5%/mes aplicada hacia atrás desde 68% en NBME 31; 65% ≈ 95% de pase, 70% ≈ 99%)';
/** #12: tramo de LECTURA de un hito sin mínimo (no es gate): [desde, hasta] inclusivos en %. */
export interface HitoTramo { desde?: number; hasta?: number; label: string; accion: string }
export interface HitoOnTrack { clave: string; match: RegExp; min: number | null; nota: string; tramos?: HitoTramo[] }
export const HITOS_ONTRACK: HitoOnTrack[] = [
  { clave: 'UWSA1', match: /Self-Assessment 1|UWSA1/i, min: null, nota: 'baseline (D1, lun 21-sep): no es gate, se LEE por tramos — <40 % protocolo Jay · 40-48 % justo · ≥48 % on-track (Parte V-A · §12.4 · §12.6-8)', tramos: [
    { hasta: 39, label: '<40 % · PROTOCOLO JAY', accion: 'S1-S2 (semanas del 21 y 28-sep) a 20 Q/día untimed estilo Jay/Melody (§12.6-8, divergencia #2: se decide el mismo lun 21-sep con el % real); tarjetas propias del porqué, todos los due reviews a primera hora, CCSN. El temario NO se toca.' },
    { desde: 40, hasta: 47, label: '40-48 % · JUSTO', accion: 'Trayectoria posible pero sin margen: con la regla del 5 %/mes un baseline <45-48 % hace difícil el 70 % (§12.4 "Goldilocks check"). Volumen del plan sin subir; auditar el método cada viernes (checklist §11.5); el NBME 25 (D10, vie 2-oct) decide si se aplica Jay.' },
    { desde: 48, label: '≥48 % · ON-TRACK', accion: 'Trayectoria de GO (Parte V: ~48 % ya es trayectoria de GO); seguir el plan tal cual y no leer el UWSA como predicción (sobreestima 10-15 puntos).' },
  ] },
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
/** #12: tramo que corresponde a un % en un hito con `tramos` (UWSA1); null si el hito no se lee por tramos. */
export function lecturaHito(h: HitoOnTrack, pct: number): HitoTramo | null {
  if (!h.tramos || !h.tramos.length) return null;
  return h.tramos.find((t) => (t.desde == null || pct >= t.desde) && (t.hasta == null || pct <= t.hasta)) || null;
}
export interface HitoPlan { d: number; fecha: string; uw: string; sub: string; clave: string; min: number | null; nota: string; valor: number | null; estado: 'pendiente' | 'registrado' | 'on-track' | 'bajo'; /** #12: etiqueta del tramo cuando el hito se lee por tramos */ tramo?: string }
/** Serie de hitos del plan (DIAS con 🎯) cruzada con la tabla de mínimos y el % registrado en usmleScores. */
export function hitosPlan(scores: UsmleScore[]): HitoPlan[] {
  return DIAS.filter(esHito).map((x) => {
    const h = HITOS_ONTRACK.find((t) => t.match.test(x.uw));
    const s = scoreDe(scores, x.fecha);
    const valor = s?.evalPct ?? null;
    const min = h?.min ?? null;
    const estado: HitoPlan['estado'] = valor == null ? 'pendiente' : min == null ? 'registrado' : valor >= min ? 'on-track' : 'bajo';
    const tr = h && valor != null ? lecturaHito(h, valor) : null;
    return { d: x.d, fecha: x.fecha, uw: x.uw, sub: x.sub, clave: h?.clave || x.uw, min, nota: h?.nota || '', valor, estado, tramo: tr?.label };
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

// ── Gate de HITOS + protocolo de burnout (DIVERGENCIAS #29 → REGLA §E-7 · METODO §9.12) · 12-sep-2026 ──
/**
 * REGLA (no propuesta): 2 hitos consecutivos bajo su mínimo on-track + síntomas → 3-5 días con SOLO Anki AM + sueño.
 * La señal la calcula `gateHito`; los síntomas los pone Joseph. Texto de PALMERTON_METODO_COMPLETO.md §9.12; nada estimado.
 */
export const BURNOUT_PROTOCOLO = {
  regla: '2 hitos consecutivos bajo su mínimo on-track + síntomas de burnout (releer el mismo párrafo sin comprender, irritabilidad extrema, indiferencia por el examen, descansos de 5 min que se vuelven de 1 h) → 3-5 días con SOLO Anki AM (30-45 min de tarjetas viejas) + sueño. Frenar QBank y contenido nuevo. El corrimiento determinista (+1 día hábil por día no estudiado) absorbe la pausa: no se recorta ni se fusiona temario. Se reanuda por el gate del 80%, no por la fecha.',
  pasos: [
    'Frenar el QBank: seguir haciendo preguntas consolida malos hábitos de lectura bajo estrés',
    'Parar la adquisición: sin vídeos, sin temas nuevos, sin tarjetas nuevas',
    'Mantenimiento mínimo: 30-45 min/día de Anki viejo (la franja de las 05:00) y nada más',
    'Recuperación con flow: 3-5 días de descanso activo (correr, journaling, meditación, cenas familiares); Palmerton da 3-7',
    'Cada día parado = +1 día hábil en el plan (remap_inicio.js): el temario no se toca',
    'Reanudar por el gate (80% en 10Q del último subtema validado); si el siguiente hito vuelve a quedar bajo mínimo → plan B de fecha (feb-mar 2027, mismo eligibility period)',
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
  const previos = DIAS.filter((x) => x.system === dia.system && x.d < dia.d && !esHito(x) && (x.nivelUW === 1 || x.nivelUW === 2));
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

/** §12.6-10 · día PARCIAL (modo ROJO de PROTOCOLO_MODO_MINIMO: solo Anki AM + 10Q pre-test). Cuenta como día perdido para el corrimiento (+1 hábil), pero cumple el mínimo no-zero-day. */
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

/** #27 · plantilla del reporte POR SISTEMA del hito (sistemas ya estudiados hasta ese día, derivados de DIAS) para pegar en notas. */
export function plantillaPorSistema(dia: DiaUSMLE): string {
  const vistos: string[] = [];
  for (const x of DIAS) { if (x.d >= dia.d) break; if (esHito(x) || /Assessment|Sprint|Banco/i.test(x.system)) continue; if (!vistos.includes(x.system)) vistos.push(x.system); }
  const cab = `Reporte por sistema · ${dia.uw} (≥80 % en lo YA estudiado, §9.1; pocos ítems por materia → leer con cautela):`;
  if (!vistos.length) return `${cab}\n(baseline: ningún sistema estudiado aún → anotar los 3 sistemas más bajos para priorizar la shopping list)`;
  return `${cab}\n${vistos.map((v) => `· ${v}: __ % (n=__)`).join('\n')}\n· sistemas NO estudiados aún: __ % (informativo)\n· ítems experimentales/gráficos separados: __`;
}

/** #30 · checklist §11.5 pre-marcado con los datos de la semana (ventana [hasta-6, hasta]). `marcada: null` = sin datos para decidir. */
export interface AlarmaChecklist { clave: string; texto: string; marcada: boolean | null; evidencia: string }
export function checklist115(scores: UsmleScore[], hasta: string): AlarmaChecklist[] {
  const desde = addDias(hasta, -6);
  const win = scores.filter((s) => s.fecha >= desde && s.fecha <= hasta && tieneDatos(s));
  const gatesFallidos = win.filter((s) => { const d = DIAS.find((x) => x.fecha === s.fecha); return !!d && !esHito(d) && s.consol30pct != null && s.consol30pct < USMLE_GATE.pct; });
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
    { clave: 'parcial', texto: 'Días PARCIALES (ROJO: solo Anki + 10Q) esta semana → cuentan como perdidos para el corrimiento (+1 hábil cada uno)', marcada: parciales.length > 0, evidencia: parciales.length ? parciales.map((x) => x.slice(5)).join(', ') : 'ninguno' },
    { clave: 'hardEasy', texto: 'Uso Hard/Easy con frecuencia o pulso Good sin poder explicar el mecanismo (AnkiConnect rated:1:2 / rated:1:4)', marcada: null, evidencia: 'lo mide anki_telemetria.js (fuera de la app · pendiente #30)' },
    { clave: 'backlog', texto: 'Revisiones vencidas acumuladas → nuevas = 0, cap 200, protocolo de backlog', marcada: null, evidencia: 'DATA/USMLE/_anki_telemetria.json (fuera de la app)' },
  ];
}

// ── Export ──
export function exportScoresJSON(): string {
  const scores = leer();
  return JSON.stringify({
    exportado: new Date().toISOString(), plan: 'USMLE Step 1 v5.14 (D1 = 2026-09-21 · 95 días · examen jue 4-feb-2027)', clave: KEY, tabla: TABLA,
    gate: USMLE_GATE, minimosOnTrack: { fuente: HITOS_ONTRACK_FUENTE, hitos: HITOS_ONTRACK.map((h) => ({ clave: h.clave, min: h.min, nota: h.nota })) },
    gateHitos: (({ estado, label }) => ({ estado, label }))(gateHito(scores)),
    pisoAmbar: { consol: PISO_AMBAR.consol, eval: PISO_AMBAR.eval },
    reglaDelTercio: (({ estado, label }) => ({ estado, label }))(reglaDelTercio(scores, scores.length ? scores[scores.length - 1].fecha : DIAS[0].fecha)),
    diasParciales: diasParciales(),
    worstCase: loadWorstCase(),
    scores,
  }, null, 2);
}
