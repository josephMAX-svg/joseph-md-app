import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client for Joseph MD
 * Project: joseph-medicina
 *
 * TODO: Add your Supabase credentials from project "joseph-medicina"
 * SUPABASE_URL: found in Supabase Dashboard → Settings → API
 * SUPABASE_ANON_KEY: found in Supabase Dashboard → Settings → API
 */
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

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
        ...data,
        estado: 'pendiente',
        fuente_app: 'joseph-md-app',
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
 * Calculate study streak: consecutive days with at least 1 study_progress entry
 */
export async function getStreak(): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('study_progress')
      .select('fecha')
      .order('fecha', { ascending: false })
      .limit(365);
    if (error || !data || data.length === 0) return 0;

    // Get unique dates
    const uniqueDates = [...new Set(data.map(d => d.fecha))].sort().reverse();

    let streak = 0;
    const today = getTodayLima();

    for (let i = 0; i < uniqueDates.length; i++) {
      const expected = new Date(today);
      expected.setDate(expected.getDate() - i);
      const expectedStr = expected.toISOString().split('T')[0];

      if (uniqueDates[i] === expectedStr) {
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
