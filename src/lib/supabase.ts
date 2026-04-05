import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client for Joseph MD
 * Project: joseph-medicina
 */
const SUPABASE_URL = 'https://qacynpqdrorpuegsmtcy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhY3lucHFkcm9ycHVlZ3NtdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODI3ODIsImV4cCI6MjA4OTk1ODc4Mn0.bQk5OCtaSuKqr31Gve1lZ2XBUQ46IvR50yVBeqDSsZE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// ═══════════════════════════════════════════════
// TypeScript Interfaces
// ═══════════════════════════════════════════════

export interface ApexQueueItem {
  id?: string;
  texto_raw: string;
  tipo?: 'share_extension' | 'dictar_error' | 'manual';
  fuente_app?: string;
  pais?: 'EEUU' | 'ESPAÑA' | 'PERU';
  examen?: 'MIR' | 'USMLE' | 'ENCAPS';
  especialidad?: string;
  subtema?: string;
  fecha_creado?: string;
  estado?: 'pendiente' | 'procesando' | 'completado' | 'error';
  apex_block?: Record<string, unknown>;
  fecha_procesado?: string;
}

export interface ApexBlock {
  id: string;
  fecha: string;
  frente?: string;
  reverso?: string;
  especialidad?: string;
  subtema?: string;
  examen?: string;
  pais?: string;
  fuente_generacion?: string;
  error_palmerton?: 'CONTEXTO' | 'CRONOLOGIA' | 'CCSN' | 'CONCEPTO' | 'OLVIDO' | null;
  t1_captura?: string;
  t2_anki_solicitado?: string;
  t3_anki_enviado?: string;
}

export interface StudyProgress {
  id: string;
  fecha: string;
  especialidad?: string;
  examen?: string;
  porcentaje: number;
  fuente?: string;
  czi_valor?: number;
  deep_work_minutos: number;
  preguntas_resueltas: number;
  errores_por_tipo?: Record<string, unknown>;
}

export interface DeepWorkSession {
  id: string;
  fecha: string;
  inicio?: string;
  fin?: string;
  horas_totales: number;
  especialidad_estudiada?: string;
  fuente?: string;
}

export interface AgentReport {
  id: string;
  fecha: string;
  reporte_numero?: '1' | '2' | '3' | '4' | 'S';
  agente?: 'ProMIR' | 'USMLE' | 'ENCAPS' | 'MethodResearcher';
  resumen_json?: Record<string, unknown>;
  reporte_completo?: string;
  fase_actual?: string;
  leido: boolean;
}

export interface PalmertonErrorDist {
  type: string;
  count: number;
  percentage: number;
}

export interface TodayMetrics {
  cards: number;
  deepWorkHours: number;
  dominioMIR: number;
}

export interface TimingStats {
  avgReadingSeconds: number | null;
  avgConstructionSeconds: number | null;
}

export interface WeakTopic {
  especialidad: string;
  daysSinceActivity: number;
}

// ═══════════════════════════════════════════════
// Helper: Today's date in Lima timezone (UTC-5)
// ═══════════════════════════════════════════════

function getTodayLima(): string {
  const now = new Date();
  // UTC-5 offset
  const lima = new Date(now.getTime() - 5 * 60 * 60 * 1000);
  return lima.toISOString().split('T')[0];
}

function getTodayStart(): string {
  return `${getTodayLima()}T00:00:00-05:00`;
}

function getTodayEnd(): string {
  return `${getTodayLima()}T23:59:59-05:00`;
}

// ═══════════════════════════════════════════════
// Query Functions (all offline-safe)
// ═══════════════════════════════════════════════

/**
 * Count pending APEX queue items
 */
export async function getApexQueueCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('apex_queue')
      .select('*', { count: 'exact', head: true })
      .eq('estado', 'pendiente');
    if (error) throw error;
    return count ?? 0;
  } catch {
    return 0;
  }
}

/**
 * Submit a new item to the APEX queue
 */
export async function submitApexQueue(data: Omit<ApexQueueItem, 'id' | 'fecha_creado' | 'estado' | 'apex_block' | 'fecha_procesado'>): Promise<{ success: boolean; pendingCount: number }> {
  try {
    const { error } = await supabase
      .from('apex_queue')
      .insert({
        texto_raw: data.texto_raw,
        tipo: data.tipo ?? 'manual',
        pais: data.pais,
        examen: data.examen,
        especialidad: data.especialidad,
        subtema: data.subtema,
        fuente_app: data.fuente_app ?? 'joseph-md-app',
        estado: 'pendiente',
        // fecha_creado defaults to NOW() in the DB schema
      });
    if (error) throw error;
    const pendingCount = await getApexQueueCount();
    return { success: true, pendingCount };
  } catch {
    return { success: false, pendingCount: 0 };
  }
}

/**
 * Get today's metrics for the HomeScreen 2×2 grid
 */
export async function getTodayMetrics(): Promise<TodayMetrics> {
  try {
    const today = getTodayLima();

    // Cards today: count apex_blocks where fecha is today
    const { count: cards } = await supabase
      .from('apex_blocks')
      .select('*', { count: 'exact', head: true })
      .gte('fecha', getTodayStart())
      .lte('fecha', getTodayEnd());

    // Deep Work today: sum horas_totales for today's sessions
    const { data: dwData } = await supabase
      .from('deep_work_sessions')
      .select('horas_totales')
      .eq('fecha', today);
    const deepWorkHours = (dwData ?? []).reduce((sum, s) => sum + (s.horas_totales ?? 0), 0);

    // Dominio MIR: average porcentaje for MIR
    const { data: mirData } = await supabase
      .from('study_progress')
      .select('porcentaje')
      .eq('examen', 'MIR');
    const dominioMIR = mirData && mirData.length > 0
      ? mirData.reduce((sum, s) => sum + (s.porcentaje ?? 0), 0) / mirData.length
      : 0;

    return {
      cards: cards ?? 0,
      deepWorkHours: Math.round(deepWorkHours * 10) / 10,
      dominioMIR: Math.round(dominioMIR),
    };
  } catch {
    return { cards: 0, deepWorkHours: 0, dominioMIR: 0 };
  }
}

/**
 * Calculate study streak: consecutive days with ≥1 record in study_progress OR apex_blocks.
 */
export async function getStreak(): Promise<number> {
  try {
    // Gather active-day dates from both tables in parallel.
    const [studyRes, blocksRes] = await Promise.all([
      supabase
        .from('study_progress')
        .select('fecha')
        .order('fecha', { ascending: false })
        .limit(365),
      supabase
        .from('apex_blocks')
        .select('fecha')
        .order('fecha', { ascending: false })
        .limit(365),
    ]);

    const dates = new Set<string>();
    for (const row of studyRes.data ?? []) {
      if (row.fecha) dates.add(String(row.fecha).slice(0, 10));
    }
    for (const row of blocksRes.data ?? []) {
      if (row.fecha) dates.add(String(row.fecha).slice(0, 10));
    }
    if (dates.size === 0) return 0;

    let streak = 0;
    const today = getTodayLima();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().split('T')[0];
      if (dates.has(iso)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  } catch {
    return 0;
  }
}

/**
 * Get unread agent reports
 */
export async function getUnreadReports(): Promise<AgentReport[]> {
  try {
    const { data, error } = await supabase
      .from('agent_reports')
      .select('*')
      .eq('leido', false)
      .order('fecha', { ascending: false });
    if (error) throw error;
    return (data as AgentReport[]) ?? [];
  } catch {
    return [];
  }
}

/**
 * Get all agent reports (recent first)
 */
export async function getAllReports(): Promise<AgentReport[]> {
  try {
    const { data, error } = await supabase
      .from('agent_reports')
      .select('*')
      .order('fecha', { ascending: false })
      .limit(50);
    if (error) throw error;
    return (data as AgentReport[]) ?? [];
  } catch {
    return [];
  }
}

/**
 * Mark a report as read
 */
export async function markReportRead(id: string): Promise<void> {
  try {
    await supabase
      .from('agent_reports')
      .update({ leido: true })
      .eq('id', id);
  } catch {
    // Silent fail — offline
  }
}

/**
 * Get Palmerton error distribution
 */
export async function getPalmertonErrors(): Promise<PalmertonErrorDist[]> {
  try {
    const { data, error } = await supabase
      .from('apex_blocks')
      .select('error_palmerton')
      .not('error_palmerton', 'is', null);
    if (error || !data || data.length === 0) return [];

    const counts: Record<string, number> = {};
    const total = data.length;
    for (const row of data) {
      const type = row.error_palmerton as string;
      counts[type] = (counts[type] ?? 0) + 1;
    }

    const types = ['CONTEXTO', 'CRONOLOGIA', 'CCSN', 'CONCEPTO', 'OLVIDO'];
    return types.map(type => ({
      type,
      count: counts[type] ?? 0,
      percentage: total > 0 ? Math.round(((counts[type] ?? 0) / total) * 100) : 0,
    }));
  } catch {
    return [];
  }
}

/**
 * Get study progress for a specific exam/specialty
 */
export async function getStudyProgress(examen: string, especialidad: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('study_progress')
      .select('porcentaje')
      .eq('examen', examen)
      .eq('especialidad', especialidad)
      .order('fecha', { ascending: false })
      .limit(1);
    if (error || !data || data.length === 0) return 0;
    return data[0].porcentaje ?? 0;
  } catch {
    return 0;
  }
}

/**
 * Get weak topics: specialties with no activity in last 14 days
 */
export async function getWeakTopics(examen: string): Promise<WeakTopic[]> {
  try {
    const { data, error } = await supabase
      .from('study_progress')
      .select('especialidad, fecha')
      .eq('examen', examen)
      .order('fecha', { ascending: false });
    if (error || !data || data.length === 0) return [];

    // Group by specialty, find latest date
    const latestBySpec: Record<string, string> = {};
    for (const row of data) {
      if (row.especialidad && !latestBySpec[row.especialidad]) {
        latestBySpec[row.especialidad] = row.fecha;
      }
    }

    const today = new Date(getTodayLima());
    const weak: WeakTopic[] = [];

    for (const [especialidad, fecha] of Object.entries(latestBySpec)) {
      const lastDate = new Date(fecha);
      const daysSince = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysSince >= 14) {
        weak.push({ especialidad, daysSinceActivity: daysSince });
      }
    }

    // Sort worst first
    weak.sort((a, b) => b.daysSinceActivity - a.daysSinceActivity);
    return weak;
  } catch {
    return [];
  }
}

/**
 * Get timing statistics from apex_blocks
 */
export async function getTimingStats(): Promise<TimingStats> {
  try {
    const { data, error } = await supabase
      .from('apex_blocks')
      .select('t1_captura, t2_anki_solicitado, t3_anki_enviado')
      .not('t1_captura', 'is', null)
      .not('t2_anki_solicitado', 'is', null);
    if (error || !data || data.length === 0) {
      return { avgReadingSeconds: null, avgConstructionSeconds: null };
    }

    let readingSum = 0, readingCount = 0;
    let constructionSum = 0, constructionCount = 0;

    for (const row of data) {
      if (row.t1_captura && row.t2_anki_solicitado) {
        const diff = new Date(row.t2_anki_solicitado).getTime() - new Date(row.t1_captura).getTime();
        if (diff > 0) {
          readingSum += diff / 1000;
          readingCount++;
        }
      }
      if (row.t2_anki_solicitado && row.t3_anki_enviado) {
        const diff = new Date(row.t3_anki_enviado).getTime() - new Date(row.t2_anki_solicitado).getTime();
        if (diff > 0) {
          constructionSum += diff / 1000;
          constructionCount++;
        }
      }
    }

    return {
      avgReadingSeconds: readingCount > 0 ? Math.round(readingSum / readingCount) : null,
      avgConstructionSeconds: constructionCount > 0 ? Math.round(constructionSum / constructionCount) : null,
    };
  } catch {
    return { avgReadingSeconds: null, avgConstructionSeconds: null };
  }
}

/**
 * Get latest CZI value
 */
export async function getLatestCZI(): Promise<number | null> {
  try {
    const { data, error } = await supabase
      .from('study_progress')
      .select('czi_valor')
      .not('czi_valor', 'is', null)
      .order('fecha', { ascending: false })
      .limit(1);
    if (error || !data || data.length === 0) return null;
    return data[0].czi_valor;
  } catch {
    return null;
  }
}

/**
 * Start a Deep Work session — creates a row with inicio=NOW()
 */
export async function startDeepWork(): Promise<string | null> {
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('deep_work_sessions')
      .insert({
        fecha: getTodayLima(),
        inicio: now,
        horas_totales: 0,
        fuente: 'app',
      })
      .select('id')
      .single();
    if (error) throw error;
    return data?.id ?? null;
  } catch {
    return null;
  }
}

/**
 * Stop a Deep Work session — updates fin and calculates horas_totales
 */
export async function stopDeepWork(sessionId: string): Promise<void> {
  try {
    // Get the session to calculate duration
    const { data: session } = await supabase
      .from('deep_work_sessions')
      .select('inicio')
      .eq('id', sessionId)
      .single();

    if (!session?.inicio) return;

    const now = new Date();
    const inicio = new Date(session.inicio);
    const horasTotales = (now.getTime() - inicio.getTime()) / (1000 * 60 * 60);

    await supabase
      .from('deep_work_sessions')
      .update({
        fin: now.toISOString(),
        horas_totales: Math.round(horasTotales * 100) / 100,
      })
      .eq('id', sessionId);
  } catch {
    // Silent fail — offline
  }
}

/**
 * This Week summary: hours, cards, questions, and per-day activity.
 * Returns dates as YYYY-MM-DD strings (Lima tz).
 */
export interface WeekSummary {
  hoursStudied: number;
  cardsCreated: number;
  questions: number;
  /** Set of YYYY-MM-DD dates (Lima tz) with any activity */
  activeDays: string[];
}

function getWeekAgoLima(): string {
  const d = new Date(getTodayLima());
  d.setDate(d.getDate() - 6); // last 7 days including today
  return d.toISOString().split('T')[0];
}

export async function getWeekSummary(): Promise<WeekSummary> {
  try {
    const since = getWeekAgoLima();
    const sinceStart = `${since}T00:00:00-05:00`;

    const [dwRes, blocksRes, progressRes] = await Promise.all([
      supabase
        .from('deep_work_sessions')
        .select('horas_totales, fecha')
        .gte('fecha', since),
      supabase
        .from('apex_blocks')
        .select('fecha')
        .gte('fecha', sinceStart),
      supabase
        .from('study_progress')
        .select('preguntas_resueltas, fecha')
        .gte('fecha', since),
    ]);

    const hoursStudied = (dwRes.data ?? []).reduce(
      (sum, s) => sum + (Number(s.horas_totales) || 0),
      0,
    );
    const cardsCreated = (blocksRes.data ?? []).length;
    const questions = (progressRes.data ?? []).reduce(
      (sum, s) => sum + (Number(s.preguntas_resueltas) || 0),
      0,
    );

    const activeSet = new Set<string>();
    for (const r of dwRes.data ?? []) {
      if (r.fecha) activeSet.add(String(r.fecha).slice(0, 10));
    }
    for (const r of blocksRes.data ?? []) {
      if (r.fecha) activeSet.add(String(r.fecha).slice(0, 10));
    }
    for (const r of progressRes.data ?? []) {
      if (r.fecha) activeSet.add(String(r.fecha).slice(0, 10));
    }

    return {
      hoursStudied: Math.round(hoursStudied * 10) / 10,
      cardsCreated,
      questions,
      activeDays: Array.from(activeSet),
    };
  } catch {
    return { hoursStudied: 0, cardsCreated: 0, questions: 0, activeDays: [] };
  }
}

/**
 * Get skills shared between agents.
 * Silently falls back to [] if the agent_skills table doesn't exist yet.
 */
export interface AgentSkill {
  id: string;
  skill_name: string;
  skill_description?: string | null;
  source_agent?: string | null;
  target_agents?: string[] | null;
  fecha_creado?: string;
  aplicado?: boolean;
}

export async function getAgentSkills(): Promise<AgentSkill[]> {
  try {
    const { data, error } = await supabase
      .from('agent_skills')
      .select('*')
      .order('fecha_creado', { ascending: false })
      .limit(20);
    if (error) throw error;
    return (data as AgentSkill[]) ?? [];
  } catch {
    return [];
  }
}

/**
 * Weak topics inferred from apex_blocks activity gaps per especialidad.
 * WEAK if >14 days since last card, WARNING if >7 days.
 */
export interface WeakTopicByBlocks {
  especialidad: string;
  daysSince: number;
  level: 'WEAK' | 'WARNING';
}

export async function getWeakTopicsFromBlocks(): Promise<WeakTopicByBlocks[]> {
  try {
    const { data, error } = await supabase
      .from('apex_blocks')
      .select('especialidad, fecha')
      .not('especialidad', 'is', null)
      .order('fecha', { ascending: false });
    if (error || !data || data.length === 0) return [];

    const latest: Record<string, string> = {};
    for (const row of data) {
      const esp = (row as { especialidad?: string }).especialidad;
      const fecha = (row as { fecha?: string }).fecha;
      if (esp && fecha && !latest[esp]) latest[esp] = fecha;
    }

    const today = new Date(getTodayLima());
    const results: WeakTopicByBlocks[] = [];
    for (const [esp, fecha] of Object.entries(latest)) {
      const last = new Date(String(fecha).slice(0, 10));
      const days = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
      if (days > 14) results.push({ especialidad: esp, daysSince: days, level: 'WEAK' });
      else if (days > 7) results.push({ especialidad: esp, daysSince: days, level: 'WARNING' });
    }
    results.sort((a, b) => b.daysSince - a.daysSince);
    return results.slice(0, 8);
  } catch {
    return [];
  }
}

/**
 * Save a chat session's messages to Supabase chat_logs (batch insert).
 */
export interface ChatLogEntry {
  agente: string;
  mensaje_usuario: string;
  respuesta_agente: string;
  fase?: string;
  sesion_id: string;
}

export async function saveChatLogs(entries: ChatLogEntry[]): Promise<void> {
  if (entries.length === 0) return;
  try {
    await supabase.from('chat_logs').insert(entries);
  } catch {
    // Silent — offline or table missing
  }
}

/**
 * Get today's accumulated deep work hours from Supabase
 */
export async function getTodayDeepWorkHours(): Promise<number> {
  try {
    const today = getTodayLima();
    const { data } = await supabase
      .from('deep_work_sessions')
      .select('horas_totales')
      .eq('fecha', today);
    if (!data) return 0;
    return data.reduce((sum, s) => sum + (s.horas_totales ?? 0), 0);
  } catch {
    return 0;
  }
}
