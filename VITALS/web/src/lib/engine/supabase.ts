import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase del MOTOR serverless (corre en Vercel, sin servicio Python). Tablas con prefijo
 * `mv_` en el proyecto joseph-medicina (aislado). Solo se usa server-side. Cuando estas envs existen,
 * la app usa el motor TS + Supabase; si no, cae al proxy del FastAPI local (dual-mode).
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export function engineEnabled(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

let _sb: SupabaseClient | null = null;
export function sb(): SupabaseClient {
  if (!_sb) {
    _sb = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
  }
  return _sb;
}

export function newId(): string {
  // UUID v4 sin deps (crypto disponible en Node/Edge).
  return (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`).replace(/-/g, "");
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function todayISO(): string {
  return new Date().toLocaleDateString("en-CA");
}
