// ENCAPS Plan diario — capa de datos nativa (Opción B del PROMPT_ULTRAMAESTRO_APP)
// Lee study_schedule / study_metrics / study_checks / study_sim_scores de Supabase
// (regla #11: la app SOLO lee/escribe Supabase, nunca Claude).
// Escalable: examen = 'ENCAPS' | 'MIR' | 'USMLE'. Hoy sólo ENCAPS (regla #7).
import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from './supabase';

// ── D1 por examen (para calcular el día actual 1..71) ──
export const STUDY_D1: Record<string, string> = {
  ENCAPS: '2026-06-06',
  // MIR / USMLE se agregan cuando se construyan sus cronogramas.
};
const STUDY_TOTAL_DAYS: Record<string, number> = { ENCAPS: 71 };

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
  key: string;            // 'D{dia}:video:{i}' | 'D{dia}:theomed:{i}' | 'D{dia}:pulso' | 'D{dia}:eval' | 'D{dia}:sim'
  kind: 'video' | 'theomed' | 'pulso' | 'eval' | 'sim';
  label: string;
  detail?: string;
  url?: string | null;    // link principal (QX videoclase | Theomed | banco sim)
  slides?: string | null; // PDF de diapositivas (Dropbox) para videos QX
  source?: string;        // fuente legible: 'QX videoclase' | 'Theomed' | …
  locked?: boolean;       // video QX aún no liberado / sin url en QX
  unlock?: string | null; // fecha en que QX libera el video
  estado?: string;        // estado QX del video (pendiente|en_progreso|bloqueado|visto)
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
  const diff = Math.floor((Date.parse(todayLimaISO()) - Date.parse(d1)) / 86_400_000) + 1;
  return Math.max(1, Math.min(total, diff));
}

// ── Enumera los items chequeables de un día (debe coincidir con el daemon) ──
export function itemsForDay(day: StudyScheduleDay): PlanItem[] {
  const N = day.dia;
  const items: PlanItem[] = [];
  (day.videos || []).forEach((v, i) => {
    const dur = v.duracion_min ?? v.dur;
    const live = !!v.url;
    const locked = !live || v.estado === 'bloqueado' || v.available === false
      || !!(v.unlock && day.fecha && v.unlock > day.fecha);
    items.push({
      key: `D${N}:video:${i}`, kind: 'video',
      label: v.titulo || `Video ${i + 1}`,
      detail: [v.code, dur ? `${dur}min` : null, v.prio].filter(Boolean).join(' · '),
      url: v.url, slides: v.slides, locked, unlock: v.unlock, estado: v.estado,
      source: live ? 'QX videoclase' : 'QX — no liberado',
    });
  });
  (day.theomed || []).forEach((t, i) => {
    items.push({
      key: `D${N}:theomed:${i}`, kind: 'theomed',
      label: `Theomed: ${t.subtema || `bloque ${i + 1}`}`,
      detail: t.n_files ? `${t.n_files} archivos` : (t.tipo || undefined),
      url: t.url, source: 'Theomed',
    });
  });
  if (day.pulso) {
    items.push({ key: `D${N}:pulso`, kind: 'pulso', label: 'PULSO', detail: String(day.pulso) });
  }
  if (day.tipo === 'deep_prime') {
    items.push({ key: `D${N}:eval`, kind: 'eval', label: 'Evaluación', detail: 'QX Eval del Tema + BanqueApp' });
  }
  if (day.simulacro) {
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

  const dia = diaActual(examen);
  const total = STUDY_TOTAL_DAYS[examen] ?? 71;

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
  const todayItems = useMemo(() => (today ? itemsForDay(today) : []), [today]);
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
    todayItems, doneToday, totalToday, toggleCheck, saveSim, refetch: load,
  };
}
