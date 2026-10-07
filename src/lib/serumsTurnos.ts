/**
 * serumsTurnos.ts — TURNO de la posta SERUMS por día (F4: lun 3-may → sáb 25-sep-2027 [S]) · V6_ESPEC §B4.1 · §B5 · §F.
 *
 * v6.00 (6-oct-2026): nuevo. En el SERUMS el turno es VARIABLE (M mañana 07-13 · T tarde 13-19 · L feriado/sin turno · G guardia)
 * y Joseph lo marca cada día en la app (TodayMission: selector + vista semanal para pre-cargar el rol del mes). La plantilla del
 * día (plantillasV6.bloquesDelDia) y la franja MIR (mirMantenimiento.mirFranjaPorTurno) salen de aquí. Nada se regenera por un
 * turno (§I): la app aplica la plantilla del día.
 *  · Caché local: localStorage 'jmd-turnos-v1' = { [AAAA-MM-DD]: { turno, horaInicio?, updatedAt } } (try/catch; memoria si no hay).
 *  · Espejo Supabase: tabla `serums_turnos` (fecha PK · turno · hora_inicio · updated_at · device), mismo patrón que `plan_checks`
 *    (studyProgressSync). La tabla se crea en el Lote 4 (DATA/_scripts/_migrations/serums_turnos.sql): el cliente es TOLERANTE a que
 *    no exista (si Supabase responde «relation does not exist» / schema cache, se desactiva el espejo en esa sesión y todo sigue
 *    en local) y NO hay lectura ni escritura remota para fechas < serums.inicio (guarda §F: el cliente desplegado no consulta la
 *    tabla antes del SERUMS).
 *  · Default sin marcar = 'M' (PISO de horas, §B4.2) con aviso «marca tu turno»: un día SIN marcar nunca mueve un hito (ordenSemana
 *    solo reasigna cuando el turno de la fecha preferente está MARCADO como M o G).
 *  · ordenSemana (§B5): hito → su fecha preferente si ese día es T/L (o aún sin marcar); si está marcado M/G → primer día de la
 *    ventana (L→S) con turno T o L → plantilla H; si la semana no tiene ningún T/L → sábado de la ventana por la tarde (plantilla
 *    H-sáb, «condición degradada»). El day-after va al día de plan siguiente al hito real y el resto de filas de la semana conserva
 *    su orden en los días que quedan.
 */
import { supabase } from './supabase';
import { deviceId } from './studyProgressSync';
import { FECHAS_V6, TURNOS, esDiaPlan } from './fechasV6';
import type { Turno } from './fechasV6';
import { DIAS_T2 } from './usmleStep1Daily';
import type { DiaUSMLE_T2 } from './usmleStep1Daily';

export type { Turno };
export const TURNOS_KEY = 'jmd-turnos-v1';
export const TABLA_TURNOS = 'serums_turnos';
/** Turno asumido cuando el día no está marcado: PISO (todo M, bloque B al 25 %, §B4.2). */
export const TURNO_DEFAULT: Turno = 'M';
export const TURNOS_V6: Turno[] = TURNOS;
export const TURNO_INFO: Record<Turno, { label: string; corto: string; horario: string }> = {
  M: { label: 'Turno MAÑANA', corto: 'M', horario: '07:00-13:00' },
  T: { label: 'Turno TARDE', corto: 'T', horario: '13:00-19:00' },
  L: { label: 'Feriado / sin turno', corto: 'L', horario: 'sin posta (día doble)' },
  G: { label: 'GUARDIA', corto: 'G', horario: 'guardia' },
};
/** Variantes de hora del turno T (§B4.1): 12:00-18:00 · 13:00-19:00 (base) · 14:00-20:00. null = la base del turno. */
export const VARIANTES_HORA: Partial<Record<Turno, string[]>> = { T: ['12:00', '13:00', '14:00'] };

export interface RegistroTurno { turno: Turno; horaInicio?: string | null; updatedAt: string }
export interface InfoTurno {
  fecha: string;
  /** turno efectivo (marcado o, si no, TURNO_DEFAULT) */
  turno: Turno;
  horaInicio: string | null;
  /** false = sin marcar → la app avisa «marca tu turno» */
  marcado: boolean;
  /** ¿la fecha está en el SERUMS (≥ serums.inicio)? Antes no hay turno */
  aplica: boolean;
}

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
const ES_ISO = /^\d{4}-\d{2}-\d{2}$/;
const esTurno = (x: unknown): x is Turno => typeof x === 'string' && (TURNOS as string[]).includes(x);
function leerStore(): Record<string, RegistroTurno> {
  try {
    const raw = lsGet(TURNOS_KEY);
    if (!raw) return {};
    const o = JSON.parse(raw) as Record<string, any>;
    const out: Record<string, RegistroTurno> = {};
    for (const [k, v] of Object.entries(o || {})) {
      if (!ES_ISO.test(k) || !v || !esTurno(v.turno)) continue;
      out[k] = { turno: v.turno, horaInicio: typeof v.horaInicio === 'string' ? v.horaInicio : null, updatedAt: String(v.updatedAt || '') };
    }
    return out;
  } catch { return {}; }
}
function escribirStore(s: Record<string, RegistroTurno>): void { lsSet(TURNOS_KEY, JSON.stringify(s)); }

// ── suscripción (TodayMission / MirTodayPlan / UsmleTodayPlan re-renderizan al marcar) ──
const listeners = new Set<() => void>();
export function onTurnosChange(cb: () => void): () => void { listeners.add(cb); return () => { listeners.delete(cb); }; }
function emitir(): void { listeners.forEach((cb) => { try { cb(); } catch { /* ignore */ } }); }

/** ¿La fecha lleva turno? (SERUMS: desde serums.inicio). */
export function aplicaTurno(iso: string): boolean { return iso >= FECHAS_V6.serums.inicio; }

/** Turno del día con su estado (marcado / default). Antes del SERUMS: aplica = false (turno = default, sin uso). */
export function infoTurno(iso: string): InfoTurno {
  const r = leerStore()[iso];
  return { fecha: iso, turno: r ? r.turno : TURNO_DEFAULT, horaInicio: r?.horaInicio ?? null, marcado: !!r, aplica: aplicaTurno(iso) };
}
/** Turno efectivo del día (sin marcar → 'M', piso). */
export function leerTurno(iso: string): Turno { return infoTurno(iso).turno; }
/** Solo los turnos MARCADOS de un rango [desde, hasta] (los no marcados quedan fuera: ordenSemana no los mueve). */
export function turnosMarcados(desde: string, hasta: string): Record<string, Turno> {
  const s = leerStore(); const out: Record<string, Turno> = {};
  for (const [k, v] of Object.entries(s)) if (k >= desde && k <= hasta) out[k] = v.turno;
  return out;
}

// ── espejo Supabase (tolerante a que la tabla no exista todavía) ──
let remotoOff = false;          // la tabla no existe / no es accesible → solo local en esta sesión
let ultimoErrorRemoto: string | null = null;
export function estadoRemotoTurnos(): { activo: boolean; error: string | null } { return { activo: !remotoOff, error: ultimoErrorRemoto }; }
function registrarError(e: any): void {
  const msg = String(e?.message || e?.code || e || 'error');
  ultimoErrorRemoto = msg.slice(0, 160);
  // relación inexistente (42P01) o fuera del schema cache de PostgREST (PGRST205/PGRST204) → no volver a intentarlo en la sesión
  if (/42P01|PGRST20[45]|does not exist|schema cache|could not find the table/i.test(String(e?.code || '') + ' ' + msg)) remotoOff = true;
}
async function subirTurno(iso: string, r: RegistroTurno | null): Promise<boolean> {
  if (remotoOff || !aplicaTurno(iso)) return false;      // guarda §F: nada remoto antes del SERUMS
  try {
    if (r) {
      const { error } = await supabase.from(TABLA_TURNOS).upsert(
        { fecha: iso, turno: r.turno, hora_inicio: r.horaInicio ?? null, updated_at: r.updatedAt, device: deviceId() }, { onConflict: 'fecha' });
      if (error) { registrarError(error); return false; }
    } else {
      const { error } = await supabase.from(TABLA_TURNOS).delete().eq('fecha', iso);
      if (error) { registrarError(error); return false; }
    }
    return true;
  } catch (e) { registrarError(e); return false; }
}

/** Marca el turno del día (local al instante + espejo Supabase en segundo plano si la fecha es ≥ serums.inicio). */
export function guardarTurno(iso: string, turno: Turno, horaInicio?: string | null): void {
  if (!ES_ISO.test(iso) || !esTurno(turno)) return;
  const s = leerStore();
  const r: RegistroTurno = { turno, horaInicio: horaInicio ?? null, updatedAt: new Date().toISOString() };
  s[iso] = r;
  escribirStore(s);
  emitir();
  void subirTurno(iso, r);
}
/** Quita la marca del día (vuelve al default 'M' con aviso). */
export function desmarcarTurno(iso: string): void {
  const s = leerStore();
  if (!s[iso]) return;
  delete s[iso];
  escribirStore(s);
  emitir();
  void subirTurno(iso, null);
}

/**
 * Trae los turnos de Supabase en [desde, hasta] y fusiona con lo local (gana el updated_at más nuevo). Solo consulta el tramo
 * ≥ serums.inicio; si el rango es anterior, o la tabla no existe, no hace nada. Nunca lanza.
 */
export async function pullTurnos(desde: string, hasta: string): Promise<boolean> {
  const d0 = desde < FECHAS_V6.serums.inicio ? FECHAS_V6.serums.inicio : desde;
  if (remotoOff || hasta < d0) return false;
  try {
    const { data, error } = await supabase.from(TABLA_TURNOS).select('fecha,turno,hora_inicio,updated_at').gte('fecha', d0).lte('fecha', hasta).limit(400);
    if (error || !data) { if (error) registrarError(error); return false; }
    const s = leerStore(); let cambio = false;
    for (const row of data as any[]) {
      const f = String(row?.fecha || '').slice(0, 10);
      if (!ES_ISO.test(f) || !esTurno(row?.turno)) continue;
      const remoto: RegistroTurno = { turno: row.turno, horaInicio: row.hora_inicio ?? null, updatedAt: String(row.updated_at || '') };
      const mio = s[f];
      if (!mio || remoto.updatedAt > mio.updatedAt) { s[f] = remoto; cambio = true; }
    }
    if (cambio) { escribirStore(s); emitir(); }
    return true;
  } catch (e) { registrarError(e); return false; }
}

// ── calendario mínimo (UTC-noon; mismo criterio que fechasV6) ──
const _D = (s: string): Date => new Date(s + 'T12:00:00Z');
export const addDiasISO = (s: string, n: number): string => { const d = _D(s); if (isNaN(d.getTime())) return s; d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
export const lunesDeISO = (s: string): string => { const w = _D(s).getUTCDay(); return addDiasISO(s, w === 0 ? -6 : 1 - w); };
const DOW = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
export const dowCorto = (s: string): string => DOW[_D(s).getUTCDay()] ?? '';
/** Los 6 días L-S de la semana de `iso` (en F4 todos son días de plan salvo protegidos). */
export function semanaLS(iso: string): string[] { const l = lunesDeISO(iso); return [0, 1, 2, 3, 4, 5].map((i) => addDiasISO(l, i)); }

// ── ordenSemana (§B5): hitos en su ventana según los turnos MARCADOS ──
export interface HitoAsignado {
  fila: DiaUSMLE_T2;
  /** fecha preferente (la del plan) y fecha real tras aplicar los turnos */
  preferente: string; real: string;
  plantilla: 'H' | 'H-sáb';
  /** «condición degradada»: semana sin ningún día T/L → tarde del sábado post-turno M */
  degradada: boolean;
  movido: boolean;
  /** la preferente aún no tiene turno marcado: se mantiene, con aviso */
  pendienteMarcar: boolean;
  /** ensayo de 7 bloques con turno T: se parte (NBME 33 hoy · 3 bloques random el siguiente día T) */
  ensayoPartido?: string;
  motivo: string;
}
export interface OrdenSemana {
  /** fecha (día de plan de la semana) → fila que se hace ese día · null = hueco liberado por el reorden (atrasada o colchón) */
  porFecha: Record<string, DiaUSMLE_T2 | null>;
  /** d de la fila → fecha real */
  fechaDe: Record<number, string>;
  hitos: HitoAsignado[];
  /** day-after empujado fuera de la semana (hito en el último día de plan de la semana) */
  fuera: { fila: DiaUSMLE_T2; fecha: string }[];
  /** ¿algún hito cambió de día? */
  reordenada: boolean;
}
const esTL = (t: Turno | undefined): boolean => t === 'T' || t === 'L';
/** Siguiente día de plan del Step 1 estrictamente posterior a `iso` (para el day-after empujado). */
function siguienteDiaPlanUSMLE(iso: string): string {
  let x = addDiasISO(iso, 1);
  for (let i = 0; i < 14; i++, x = addDiasISO(x, 1)) if (esDiaPlan(x, 'usmle')) return x;
  return addDiasISO(iso, 1);
}
/**
 * Reparte las filas de UNA semana del tramo 2 en sus días según los turnos MARCADOS (los no marcados no cuentan como T/L
 * ni mueven nada). Determinista y puro: no lee el reloj ni el storage.
 */
export function ordenSemana(filasSemana: DiaUSMLE_T2[], turnos: Record<string, Turno | undefined>): OrdenSemana {
  const filas = filasSemana.slice().sort((a, b) => (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : a.t - b.t));
  const dias = Array.from(new Set(filas.map((x) => x.fecha))).sort();
  const identidad = (): OrdenSemana => {
    const porFecha: Record<string, DiaUSMLE_T2 | null> = {}; const fechaDe: Record<number, string> = {};
    for (const x of filas) { porFecha[x.fecha] = x; fechaDe[x.d] = x.fecha; }
    return { porFecha, fechaDe, hitos: [], fuera: [], reordenada: false };
  };
  const hitos: HitoAsignado[] = [];
  for (const h of filas) {
    if (h.tipo !== 'hito' || !h.ventana) continue;                         // NBME 29 (F3) no tiene ventana
    const [ini, fin] = h.ventana;
    const pref = h.fecha, tPref = turnos[pref];
    let real = pref, plantilla: 'H' | 'H-sáb' = 'H', degradada = false;
    let motivo = tPref ? `preferente ${dowCorto(pref)} ${pref.slice(8)} con turno ${tPref}` : `preferente ${dowCorto(pref)} ${pref.slice(8)} · turno sin marcar (se asume T/L: márcalo)`;
    if (tPref === 'M' || tPref === 'G') {
      const alt = dias.find((d) => d >= ini && d <= fin && esTL(turnos[d]));
      if (alt) { real = alt; motivo = `preferente con turno ${tPref} → primer día T/L de la ventana: ${dowCorto(alt)} ${alt.slice(8)} (plantilla H)`; }
      else {
        real = dias.filter((d) => d >= ini && d <= fin).pop() ?? fin; plantilla = 'H-sáb'; degradada = true;
        motivo = `semana sin ningún día T/L → ${dowCorto(real)} ${real.slice(8)} por la tarde tras el turno M (plantilla H-sáb · CONDICIÓN DEGRADADA)`;
      }
    }
    let ensayoPartido: string | undefined;
    if (h.forma === 85 && turnos[real] === 'T') {
      const sigT = dias.find((d) => d > real && d <= fin && turnos[d] === 'T');
      ensayoPartido = `ensayo de 7 bloques con turno T → se parte: NBME 33 hoy (07:00-12:15) y los 3 bloques random el ${sigT ? `${dowCorto(sigT)} ${sigT.slice(8)} (siguiente día T de la ventana)` : 'siguiente día T de la ventana (aún no hay otro: márcalo)'}`;
    }
    hitos.push({ fila: h, preferente: pref, real, plantilla, degradada, movido: real !== pref, pendienteMarcar: !tPref, ensayoPartido, motivo });
  }
  if (!hitos.some((x) => x.movido)) { const o = identidad(); o.hitos = hitos; return o; }
  // reorden: hito → real · su day-after → siguiente día libre tras el real · el resto, en su orden, en los días que quedan
  const porFecha: Record<string, DiaUSMLE_T2 | null> = {}; const fechaDe: Record<number, string> = {}; const fuera: OrdenSemana['fuera'] = [];
  const usadas = new Set<number>();
  for (const a of hitos) { porFecha[a.real] = a.fila; fechaDe[a.fila.d] = a.real; usadas.add(a.fila.d); }
  for (const a of hitos) {
    const idx = filas.findIndex((x) => x.d === a.fila.d);
    const da = filas.slice(idx + 1).find((x) => x.tipo === 'day_after' && !usadas.has(x.d));
    if (!da) continue;
    usadas.add(da.d);
    const libre = dias.find((d) => d > a.real && !(d in porFecha));
    if (libre) { porFecha[libre] = da; fechaDe[da.d] = libre; }
    else { const f = siguienteDiaPlanUSMLE(dias[dias.length - 1] ?? a.real); fuera.push({ fila: da, fecha: f }); fechaDe[da.d] = f; }
  }
  const resto = filas.filter((x) => !usadas.has(x.d));
  const libres = dias.filter((d) => !(d in porFecha));
  libres.forEach((d, i) => { const x = resto[i]; porFecha[d] = x ?? null; if (x) fechaDe[x.d] = d; });
  return { porFecha, fechaDe, hitos, fuera, reordenada: true };
}
/** ordenSemana de la semana (L-S) de `iso` con las filas de DIAS_T2 y los turnos MARCADOS de la caché local (+ `extra`: turnos
 *  forzados, p. ej. el del selector antes de guardarlo). */
export function ordenSemanaDe(iso: string, extra?: Record<string, Turno>): OrdenSemana {
  const dias = semanaLS(iso); const l = dias[0] as string, s = dias[5] as string;
  return ordenSemana(DIAS_T2.filter((x) => x.fecha >= l && x.fecha <= s), { ...turnosMarcados(l, s), ...(extra ?? {}) });
}
/** Fila del tramo 2 que toca HOY tras el reorden de la semana (null = hueco liberado · undefined = no hay fila ese día). */
export function filaT2DelDia(iso: string, extra?: Record<string, Turno>): DiaUSMLE_T2 | null | undefined {
  const o = ordenSemanaDe(iso, extra);
  return iso in o.porFecha ? (o.porFecha[iso] ?? null) : undefined;
}
/** Day-after empujados a `iso` desde la semana anterior (hito movido al sábado): se hacen HOY además de la fila del día. */
export function filasEmpujadas(iso: string): DiaUSMLE_T2[] {
  return ordenSemanaDe(addDiasISO(lunesDeISO(iso), -1)).fuera.filter((x) => x.fecha === iso).map((x) => x.fila);
}
