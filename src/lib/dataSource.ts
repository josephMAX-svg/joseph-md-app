import { useEffect, useState, useRef } from 'react';

/**
 * Dual data source detection — "PC conectada" (local agent) vs "Modo nube" (Supabase).
 *
 * Local agent runs at http://localhost:3000 and exposes:
 *   GET /status → { services: { ... }, ok: true }
 *   GET /phase  → { phase: "Fase 0 · Research", days_remaining: 1367 }
 *
 * If localhost:3000 responds within 3s we prefer it for live PC telemetry.
 * Otherwise we fall back to Supabase queries.
 */

export type DataSource = 'local' | 'supabase';

const LOCAL_BASE_URL = 'http://localhost:3000';
const LOCAL_STATUS_URL = `${LOCAL_BASE_URL}/status`;
const DETECT_TIMEOUT_MS = 3000;
const POLL_INTERVAL_MS = 30_000;

/**
 * Fetch with a hard timeout using AbortController.
 */
async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Detect which data source to use. Returns 'local' if localhost:3000/status
 * responds within 3s with a 2xx, else 'supabase'.
 */
export async function detectDataSource(): Promise<DataSource> {
  try {
    const res = await fetchWithTimeout(LOCAL_STATUS_URL, DETECT_TIMEOUT_MS);
    if (res.ok) return 'local';
    return 'supabase';
  } catch {
    return 'supabase';
  }
}

/**
 * GET helper for the local agent — returns parsed JSON or null on failure.
 */
export async function fetchLocal<T>(path: string, timeoutMs = DETECT_TIMEOUT_MS): Promise<T | null> {
  try {
    const res = await fetchWithTimeout(`${LOCAL_BASE_URL}${path}`, timeoutMs);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * React hook: re-detects the data source every 30 seconds.
 * Exposes { source, isLocalAvailable, lastChecked }.
 */
export function useDataSource(): {
  source: DataSource;
  isLocalAvailable: boolean;
  lastChecked: Date | null;
} {
  const [source, setSource] = useState<DataSource>('supabase');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    let cancelled = false;

    const check = async () => {
      const next = await detectDataSource();
      if (!mountedRef.current || cancelled) return;
      setSource(next);
      setLastChecked(new Date());
    };

    check();
    const interval = setInterval(check, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, []);

  return {
    source,
    isLocalAvailable: source === 'local',
    lastChecked,
  };
}

// ═══════════════════════════════════════════════
// Typed endpoint shapes (matches agente_estudio API contract)
// ═══════════════════════════════════════════════

export interface LocalPhaseResponse {
  phase: string;
  days_remaining?: number;
  target_date?: string;
}

export interface LocalStatusResponse {
  ok: boolean;
  services?: Record<string, boolean | 'up' | 'down'>;
}

export interface LocalSkill {
  id?: string;
  skill_name: string;
  skill_description?: string | null;
  source_agent?: string | null;
  target_agents?: string[] | null;
  fecha_creado?: string;
}

/**
 * MIR 2030 fallback countdown (used when local agent isn't reachable).
 */
export function mirCountdown(target = '2030-01-01'): number {
  const now = new Date();
  const targetDate = new Date(target);
  const diff = targetDate.getTime() - now.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

/**
 * Hook: Fetches local /phase + /status when PC is available.
 * Returns null for each when PC is offline (caller handles fallback).
 */
export function useLocalTelemetry(source: DataSource): {
  phase: LocalPhaseResponse | null;
  status: LocalStatusResponse | null;
} {
  const [phase, setPhase] = useState<LocalPhaseResponse | null>(null);
  const [status, setStatus] = useState<LocalStatusResponse | null>(null);

  useEffect(() => {
    if (source !== 'local') {
      setPhase(null);
      setStatus(null);
      return;
    }
    let cancelled = false;
    (async () => {
      const [p, s] = await Promise.all([
        fetchLocal<LocalPhaseResponse>('/phase'),
        fetchLocal<LocalStatusResponse>('/status'),
      ]);
      if (cancelled) return;
      setPhase(p);
      setStatus(s);
    })();
    const interval = setInterval(async () => {
      const [p, s] = await Promise.all([
        fetchLocal<LocalPhaseResponse>('/phase'),
        fetchLocal<LocalStatusResponse>('/status'),
      ]);
      if (cancelled) return;
      setPhase(p);
      setStatus(s);
    }, POLL_INTERVAL_MS);
    return () => { cancelled = true; clearInterval(interval); };
  }, [source]);

  return { phase, status };
}
