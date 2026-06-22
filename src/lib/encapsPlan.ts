// ENCAPS Plan diario — capa de datos nativa (Opción B del PROMPT_ULTRAMAESTRO_APP)
// Lee study_schedule / study_metrics / study_checks / study_sim_scores de Supabase
// (regla #11: la app SOLO lee/escribe Supabase, nunca Claude).
// Escalable: examen = 'ENCAPS' | 'MIR' | 'USMLE'. Hoy sólo ENCAPS (regla #7).
import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from './supabase';
import { ENCAPS_FICHAS_POR_TEMA, ENCAPS_VIDEO_RESPALDO, ENCAPS_THEOMED_AREA, ENCAPS_AREA_PREFIJO } from './encapsFuentes';

// ── D1 por examen (para calcular el día actual 1..71) ──
export const STUDY_D1: Record<string, string> = {
  ENCAPS: '2026-06-23',   // re-estructurado (22-jun: 20-22 no se estudió): D1=mar 23-jun (día1=tema II-3, ya NO simulacro diagnóstico) · TODOS los domingos LIBRES · 41 días-tema L-V (45 temas; III-4+III-7, IV-6+IV-7, V-7+V-10 y AHORA IV-3+IV-5 fusionados, temas 23-jun→18-ago) · 35 SIMULACROS reales QX+Theomed (8 sáb 3-4 + día-examen 19-ago) · EXAMEN jue 20-ago (tope FIJO)
  // MIR / USMLE se agregan cuando se construyan sus cronogramas.
};
// Fechas SIN actividad (bloqueadas por Joseph) — no cuentan como día de plan.
// v6 (22-jun): TODOS los domingos del tramo 23-jun → 20-ago quedan libres (8 domingos).
export const STUDY_SKIP_DATES: Record<string, string[]> = {
  ENCAPS: ['2026-06-28', '2026-07-05', '2026-07-12', '2026-07-19', '2026-07-26', '2026-08-02', '2026-08-09', '2026-08-16'],
};
const STUDY_TOTAL_DAYS: Record<string, number> = { ENCAPS: 51 };

// ── Tipos (espejo de las columnas study_*) ──
export interface StudyVideo {
  titulo: string; bloque?: string; release?: string;
  dur?: number; duracion_min?: number;          // data.js usa duracion_min
  prio?: string; code?: string; slides?: string | null; url?: string | null;
  unlock?: string | null; estado?: string;       // pendiente | en_progreso | bloqueado | visto
  available?: boolean;                            // release <= fecha
}
export interface StudyTheomed { subtema?: string; n_files?: number; url?: string; tipo?: string; [k: string]: unknown }
export interface StudyMaterial { label?: string; url?: string; [k: string]: unknown }
export interface StudySim {
  clave?: string; label?: string; fecha?: string; simulacro_n?: number; duracion?: string;
  theomed_bank?: { cmid?: string; label?: string; url?: string };
}
export interface StudyScheduleDay {
  examen: string; dia: number; fecha: string; weekday?: string; tipo?: string;
  codigo?: string; subtema?: string; prioridad?: string; modo?: string; nts?: string | null;
  videos: StudyVideo[]; theomed: StudyTheomed[]; material_comp: StudyMaterial[];
  simulacro?: StudySim | null; pulso?: string | null; video_min?: number; n_videos?: number;
  temas_secundarios?: { codigo: string; subtema: string; prioridad: string }[];
  primer_finde_estudio?: boolean;
  sim_cap?: number; sim_libre?: boolean;
  simulacros?: { n: number; actividad?: string; banco?: string }[];
  extra?: Record<string, unknown>;
}
export interface StudyMetrics {
  examen: string; fecha?: string; qx_pct?: number | null; ritmo_min_dia?: number | null;
  accionable_videos?: number | null; cobertura_pct?: number | null; dias_a_examen?: number | null;
  pendiente_h?: number | null; total_h?: number | null; prom_sim?: number | null;
  extra?: Record<string, unknown>;
}
export interface StudySimScore { examen: string; sim_n: number; nota?: number | null; fecha?: string }

// Item chequeable del día (mismo esquema item_key que encaps_telegram_daemon.py)
export interface PlanItem {
  key: string;            // 'D{dia}:video:{i}' | 'D{dia}:theomed:{i}' | 'D{dia}:material:{i}' | 'D{dia}:pulso' | 'D{dia}:eval' | 'D{dia}:sim'
  kind: 'video' | 'theomed' | 'material' | 'pulso' | 'eval' | 'sim';
  label: string;
  detail?: string;
  url?: string | null;    // link principal (QX videoclase | Theomed | banco sim)
  slides?: string | null; // PDF de diapositivas (Dropbox) para videos QX
  source?: string;        // fuente legible: 'QX videoclase' | 'Theomed' | …
  locked?: boolean;       // video QX aún no liberado / sin url en QX
  unlock?: string | null; // fecha en que QX libera el video
  estado?: string;        // estado QX del video (pendiente|en_progreso|bloqueado|visto)
  code?: string;          // código del tema al que pertenece el video (p.ej. II-4)
  focusDia?: number;      // día-foco deep-prime de ese código (anemia=D3, VIH=D10)
  dur?: number;           // duración en minutos (para el micro-horario)
  hora?: string;          // franja exacta dentro del NÚCLEO DEEP PRIME (09:00–09:14)
  fallbackUrl?: string;   // respaldo Drive 2026-1 si QX no liberó el video
  fallbackLabel?: string;
}

// Respaldo Google Drive 2026-1 (ciclo anterior, QxMedic) para temas que QX 2026-II
// libera por goteo y aún no publica. Para usar si QX se atrasa. (verificado en Drive)
export const DRIVE_FALLBACK_2026_1: Record<string, { label: string; url: string }> = {
  'II-4': { label: '📁 Anemia — QxMedic 2026-1', url: 'https://drive.google.com/file/d/1vFuqUuGNHKyknAvaV2SR7pK1bMXJHulK/view' },
  'II-11': { label: '📁 VIH — QxMedic 2026-1', url: 'https://drive.google.com/file/d/1vtn1-za86do_axvPTGJ9VpaSBqv2QBRm/view' },
};

// Día-foco (deep-prime) por código de tema: busca el día donde theme.codigo == code.
export function focusDayByCode(days: StudyScheduleDay[]): Record<string, number> {
  const map: Record<string, number> = {};
  for (const d of days) {
    if (d.codigo && map[d.codigo] === undefined) map[d.codigo] = d.dia;
  }
  return map;
}

// ── Repetición espaciada por tema, DIFERENCIADA POR PRIORIDAD ───────────────
// Cada subtema recibe sus vueltas según importancia (Joseph: "algunos 5, algunos
// 4, algunos 3"). Cada array = días desde la 1ª exposición (video). Todos incluyen
// un toque temprano + uno tardío. Cepeda 2008/2006: gap óptimo ≈10-20% del tiempo
// al examen. Más prioridad = más toques intermedios.
// v5 (13-jun): plan de 58 días (examen d55=17-ago) → el intervalo máximo baja de 63 a 50
// para que la ÚLTIMA vuelta de los temas tempranos caiga ANTES del examen (mismo nº de
// vueltas). Los temas tardíos cierran con los simulacros MEGA-FINAL de los últimos sábados.
export const SPACED_INTERVALS = [1, 3, 7, 14, 28, 50]; // superset de referencia
export const REPASO_POR_PRIORIDAD: Record<string, number[]> = {
  CRITICA: [1, 3, 7, 28, 50], // 5 repasos (1ª video + 5 = 6 vueltas) · máximo refuerzo
  ALTA: [1, 7, 28, 50],       // 4 repasos (= 5 vueltas)
  MEDIA: [3, 28, 50],         // 3 repasos (= 4 vueltas)
  BAJA: [7, 50],              // 2 repasos (= 3 vueltas · mapa+PDF+banco, ligero)
};
export function normPrio(p?: string): string {
  const s = (p || '').toUpperCase();
  if (s.includes('CRÍT') || s.includes('CRIT')) return 'CRITICA';
  if (s.includes('ALTA')) return 'ALTA';
  if (s.includes('BAJA')) return 'BAJA';
  return 'MEDIA';
}
export function intervalosDe(prioridad?: string): number[] {
  return REPASO_POR_PRIORIDAD[normPrio(prioridad)] || REPASO_POR_PRIORIDAD.MEDIA;
}
export function totalVueltas(prioridad?: string): number {
  return intervalosDe(prioridad).length + 1; // +1 por la 1ª exposición (video)
}

export interface RepasoHoy {
  codigo: string; subtema: string; focusDia: number; delta: number; vuelta: number;
  prioridad: string; totalVueltas: number;
}

// Temas cuyo repaso espaciado cae HOY (su día-foco + intervalo-según-prioridad == hoy).
export function repasosDeHoy(days: StudyScheduleDay[], dia: number): RepasoHoy[] {
  const out: RepasoHoy[] = [];
  for (const d of days) {
    if (!d.codigo || d.dia >= dia) continue;
    const delta = dia - d.dia;
    const intervalos = intervalosDe(d.prioridad);
    const idx = intervalos.indexOf(delta);
    if (idx >= 0) {
      out.push({
        codigo: d.codigo, subtema: d.subtema || d.codigo, focusDia: d.dia, delta,
        vuelta: idx + 2, prioridad: normPrio(d.prioridad), totalVueltas: intervalos.length + 1,
      });
    }
  }
  out.sort((a, b) => a.delta - b.delta);
  return out;
}

const ORDINAL = ['', '1ª', '2ª', '3ª', '4ª', '5ª', '6ª', '7ª'];
export function vueltaLabel(n: number): string { return ORDINAL[n] || `${n}ª`; }

// item_key de una vuelta de repaso (chequeable, por subtema+nº de vuelta).
export function repasoKey(codigo: string, vuelta: number): string { return `repaso:${codigo}:v${vuelta}`; }

// Cuántas vueltas YA hicimos de un subtema: la 1ª (ver el video del día-foco, si pasó)
// + las vueltas de repaso marcadas como hechas. Devuelve {hechas, total}.
export function vueltasHechasDe(
  codigo: string, prioridad: string | undefined, focusDia: number, diaActual: number,
  checks: Record<string, boolean>,
): { hechas: number; total: number } {
  const total = totalVueltas(prioridad);
  let hechas = focusDia <= diaActual ? 1 : 0; // 1ª = video del día-foco ya pasado
  for (let v = 2; v <= total; v++) if (checks[repasoKey(codigo, v)]) hechas++;
  return { hechas: Math.min(hechas, total), total };
}

// ── Predicción de próximos videos QX a liberar (drip semanal) ───────────────
// QX sube por goteo; cada video tiene su fecha de liberación (unlock). Listamos
// los que aún no salieron, deduplicados por título, ordenados por fecha.
export interface ProximoVideo { titulo: string; unlock: string; code?: string; bloque?: string; url?: string | null }

export function proximosVideos(days: StudyScheduleDay[], todayISO: string, limit = 14): ProximoVideo[] {
  const seen = new Set<string>();
  const out: ProximoVideo[] = [];
  for (const d of days) {
    for (const v of d.videos || []) {
      const t = v.titulo;
      const u = v.unlock || v.release;
      if (t && u && u > todayISO && !seen.has(t)) {
        seen.add(t);
        out.push({ titulo: t, unlock: u, code: v.code, bloque: v.bloque, url: v.url });
      }
    }
  }
  out.sort((a, b) => (a.unlock < b.unlock ? -1 : a.unlock > b.unlock ? 1 : 0));
  return out.slice(0, limit);
}

// ── Helpers de fecha (Lima UTC-5) ──
function todayLimaISO(): string {
  const now = new Date();
  const lima = new Date(now.getTime() - 5 * 60 * 60 * 1000);
  return lima.toISOString().slice(0, 10);
}
export function diaActual(examen: string): number {
  const d1 = STUDY_D1[examen];
  const total = STUDY_TOTAL_DAYS[examen] ?? 71;
  if (!d1) return 1;
  const hoy = todayLimaISO();
  let diff = Math.floor((Date.parse(hoy) - Date.parse(d1)) / 86_400_000) + 1;
  // Las fechas libres (14/21-jun) no son días de plan: réstalas si ya pasaron.
  for (const s of STUDY_SKIP_DATES[examen] ?? []) {
    if (s >= d1 && s <= hoy) diff--;
  }
  return Math.max(1, Math.min(total, diff));
}

// ── Enumera los items chequeables de un día (debe coincidir con el daemon) ──
export function itemsForDay(day: StudyScheduleDay, focusByCode: Record<string, number> = {}): PlanItem[] {
  const N = day.dia;
  const items: PlanItem[] = [];
  const pad = (n: number) => String(n).padStart(2, '0');
  let ph = 9, pm = 0; // NÚCLEO DEEP PRIME arranca 09:00 (los videos se reparten ahí)
  (day.videos || []).forEach((v, i) => {
    const dur = v.duracion_min ?? v.dur;
    const live = !!v.url;
    const locked = !live || v.estado === 'bloqueado' || v.available === false
      || !!(v.unlock && day.fecha && v.unlock > day.fecha);
    const s = `${pad(ph)}:${pad(pm)}`;
    let em = pm + (dur ?? 20), eh = ph + Math.floor(em / 60); em %= 60;
    const hora = `${s}–${pad(eh)}:${pad(em)}`;
    ph = eh; pm = em;
    items.push({
      key: `D${N}:video:${i}`, kind: 'video',
      label: v.titulo || `Video ${i + 1}`,
      detail: [v.code, dur ? `${dur}min` : null, v.prio].filter(Boolean).join(' · '),
      url: v.url, slides: v.slides, locked, unlock: v.unlock, estado: v.estado,
      source: live ? 'QX videoclase' : 'QX — no liberado',
      code: v.code, focusDia: v.code ? focusByCode[v.code] : undefined, dur, hora,
      fallbackUrl: (locked && v.code) ? DRIVE_FALLBACK_2026_1[v.code]?.url : undefined,
      fallbackLabel: (locked && v.code) ? DRIVE_FALLBACK_2026_1[v.code]?.label : undefined,
    });
  });
  // helper: asigna franja horaria continuando el reloj donde terminaron los videos
  const slot = (mins: number) => {
    const s = `${pad(ph)}:${pad(pm)}`;
    let em = pm + mins, eh = ph + Math.floor(em / 60); em %= 60;
    const h = `${s}–${pad(eh)}:${pad(em)}`;
    ph = eh; pm = em;
    return h;
  };
  // Video de RESPALDO (Drive DR LOPEZ/GALENO) para temas SIN video en QxMedic → "Cola QX de hoy"
  if (day.codigo && ENCAPS_VIDEO_RESPALDO[day.codigo]) {
    const vr = ENCAPS_VIDEO_RESPALDO[day.codigo];
    items.push({
      key: `D${N}:vresp`, kind: 'video', label: vr.label,
      detail: 'Respaldo · QX no tiene video de este tema', url: vr.url,
      source: 'Video respaldo (Drive)', dur: vr.min, hora: slot(vr.min),
    });
  }
  // Fichas técnicas MINSA de QxMedic (Biblioteca Fundamentos Teóricos) — MATERIAL QX, con hora
  const _fichas = day.codigo ? (ENCAPS_FICHAS_POR_TEMA[day.codigo] || []) : [];
  _fichas.forEach((f, i) => {
    items.push({
      key: `D${N}:qxficha:${i}`, kind: 'material',
      label: `📄 MINSA: ${f.titulo}`, detail: `Ficha QxMedic · ${f.min}min`,
      url: f.url, source: 'QX · Ficha MINSA', dur: f.min, hora: slot(f.min),
    });
  });
  // Carpetas Theomed del tema (PDFs/normas) — con hora
  (day.theomed || []).forEach((t, i) => {
    items.push({
      key: `D${N}:theomed:${i}`, kind: 'theomed',
      label: `Theomed: ${t.subtema || `bloque ${i + 1}`}`,
      detail: t.n_files ? `${t.n_files} archivos` : (t.tipo || undefined),
      url: t.url, source: 'Theomed', dur: 8, hora: slot(8),
    });
  });
  // Acceso Theomed por ÁREA (sesiones + PPTs + POSTESTS + repasos · incl. lo que libere por vueltas)
  const _area = day.codigo ? ENCAPS_AREA_PREFIJO[(day.codigo.match(/^[IVX]+/) || [''])[0]] : undefined;
  const _tarea = _area ? ENCAPS_THEOMED_AREA[_area] : undefined;
  if (_tarea) {
    items.push({
      key: `D${N}:tharea`, kind: 'theomed',
      label: `📂 Theomed ${_area} — sesiones + PPTs + POSTESTS + repasos`,
      detail: `${_tarea.n} recursos · incl. lo que libere por vueltas`,
      url: _tarea.url, source: 'Theomed área', dur: 20, hora: slot(20),
    });
  }
  // Material complementario (norma/guía + banco + Drive) — clave para temas normativa; con hora
  (day.material_comp || []).forEach((m, i) => {
    const mm = m as { label?: string; url?: string | null; tipo?: string; min?: number };
    const mins = mm.min ?? 12;
    items.push({
      key: `D${N}:material:${i}`, kind: 'material',
      label: mm.label || `Material ${i + 1}`,
      detail: mm.tipo, url: mm.url ?? null,
      source: 'Material complementario', dur: mins,
      hora: mm.url ? slot(mins) : undefined,
    });
  });
  if (day.pulso) {
    items.push({ key: `D${N}:pulso`, kind: 'pulso', label: 'PULSO', detail: String(day.pulso) });
  }
  if (day.tipo === 'deep_prime') {
    items.push({ key: `D${N}:eval`, kind: 'eval', label: 'Evaluación', detail: 'QX Eval del Tema + BanqueApp + POSTEST Theomed', dur: 30, hora: slot(30) });
  }
  // v6 (13-jun): un día-examen puede tener 2-4 simulacros (extra.sims) → cada uno es un
  // item chequeable propio (key D{N}:sim:{i}). Fallback al simulacro singular (legacy).
  const simList = (day.extra && Array.isArray((day.extra as { sims?: unknown }).sims))
    ? (day.extra as { sims: Array<{ label?: string; fuente?: string; duracion?: string; url?: string }> }).sims
    : null;
  if (simList && simList.length) {
    simList.forEach((s, i) => {
      items.push({
        key: `D${N}:sim:${i}`, kind: 'sim',
        label: s.label || `Simulacro ${i + 1}`,
        detail: [s.fuente, s.duracion].filter(Boolean).join(' · ') || undefined,
        url: s.url || null,
      });
    });
  } else if (day.simulacro) {
    const s = day.simulacro;
    items.push({
      key: `D${N}:sim`, kind: 'sim',
      label: `Simulacro ${s.clave || s.label || ''}`.trim(),
      detail: s.duracion, url: s.theomed_bank?.url,
    });
  }
  return items;
}

// ── Queries Supabase ──
async function fetchSchedule(examen: string): Promise<StudyScheduleDay[]> {
  const { data, error } = await supabase
    .from('study_schedule')
    .select('*')
    .eq('examen', examen)
    .order('dia', { ascending: true });
  if (error || !data) return [];
  return data as StudyScheduleDay[];
}
async function fetchMetrics(examen: string): Promise<StudyMetrics | null> {
  const { data, error } = await supabase
    .from('study_metrics').select('*').eq('examen', examen).limit(1);
  if (error || !data || data.length === 0) return null;
  return data[0] as StudyMetrics;
}
async function fetchChecks(examen: string): Promise<Record<string, boolean>> {
  const { data, error } = await supabase
    .from('study_checks').select('item_key, checked').eq('examen', examen);
  const map: Record<string, boolean> = {};
  if (!error && data) for (const r of data as { item_key: string; checked: boolean }[]) map[r.item_key] = !!r.checked;
  return map;
}
async function fetchSimScores(examen: string): Promise<StudySimScore[]> {
  const { data, error } = await supabase
    .from('study_sim_scores').select('*').eq('examen', examen).order('sim_n', { ascending: true });
  if (error || !data) return [];
  return data as StudySimScore[];
}

export async function setStudyCheck(examen: string, itemKey: string, checked: boolean): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('study_checks')
      .upsert({ examen, item_key: itemKey, checked, ts: new Date().toISOString() }, { onConflict: 'examen,item_key' });
    return !error;
  } catch {
    return false;
  }
}
export async function setStudySimScore(examen: string, simN: number, nota: number | null, fecha?: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('study_sim_scores')
      .upsert({ examen, sim_n: simN, nota, fecha, updated_at: new Date().toISOString() }, { onConflict: 'examen,sim_n' });
    return !error;
  } catch {
    return false;
  }
}

// ── Hook principal ──
export interface UseEncapsPlan {
  loading: boolean;
  dia: number;
  total: number;
  today: StudyScheduleDay | null;
  days: StudyScheduleDay[];
  metrics: StudyMetrics | null;
  checks: Record<string, boolean>;
  simScores: Record<number, StudySimScore>;
  simDays: StudyScheduleDay[];
  todayItems: PlanItem[];
  doneToday: number;
  totalToday: number;
  repasos: RepasoHoy[];
  proximos: ProximoVideo[];
  hoyDia: number;                       // día real de hoy (para el botón "Hoy")
  setDia: (d: number) => void;          // navegar a otro día (ver plan completo)
  toggleCheck: (itemKey: string, value: boolean) => void;
  saveSim: (simN: number, nota: number | null, fecha?: string) => void;
  refetch: () => void;
}

export function useEncapsPlan(examen: string = 'ENCAPS'): UseEncapsPlan {
  const [days, setDays] = useState<StudyScheduleDay[]>([]);
  const [metrics, setMetrics] = useState<StudyMetrics | null>(null);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [simScores, setSimScores] = useState<Record<number, StudySimScore>>({});
  const [loading, setLoading] = useState(true);

  const hoyDia = diaActual(examen);
  const total = STUDY_TOTAL_DAYS[examen] ?? 71;
  const [dia, setDiaRaw] = useState(hoyDia);
  const setDia = useCallback((d: number) => setDiaRaw(Math.max(1, Math.min(total, d))), [total]);

  const load = useCallback(async () => {
    const [sched, met, chk, sims] = await Promise.all([
      fetchSchedule(examen), fetchMetrics(examen), fetchChecks(examen), fetchSimScores(examen),
    ]);
    setDays(sched);
    setMetrics(met);
    setChecks(chk);
    const sm: Record<number, StudySimScore> = {};
    for (const s of sims) sm[s.sim_n] = s;
    setSimScores(sm);
    setLoading(false);
  }, [examen]);

  useEffect(() => {
    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, [load]);

  const today = useMemo(() => days.find(d => d.dia === dia) ?? null, [days, dia]);
  const simDays = useMemo(() => days.filter(d => d.simulacro), [days]);
  const focusByCode = useMemo(() => focusDayByCode(days), [days]);
  const todayItems = useMemo(() => (today ? itemsForDay(today, focusByCode) : []), [today, focusByCode]);
  const repasos = useMemo(() => repasosDeHoy(days, dia), [days, dia]);
  const proximos = useMemo(() => proximosVideos(days, todayLimaISO()), [days]);
  const totalToday = todayItems.length;
  const doneToday = todayItems.reduce((n, it) => n + (checks[it.key] ? 1 : 0), 0);

  const toggleCheck = useCallback((itemKey: string, value: boolean) => {
    setChecks(prev => ({ ...prev, [itemKey]: value }));  // optimista
    setStudyCheck(examen, itemKey, value);
  }, [examen]);

  const saveSim = useCallback((simN: number, nota: number | null, fecha?: string) => {
    setSimScores(prev => ({ ...prev, [simN]: { examen, sim_n: simN, nota, fecha } }));
    setStudySimScore(examen, simN, nota, fecha);
  }, [examen]);

  return {
    loading, dia, total, today, days, metrics, checks, simScores, simDays,
    todayItems, doneToday, totalToday, repasos, proximos, hoyDia, setDia, toggleCheck, saveSim, refetch: load,
  };
}
