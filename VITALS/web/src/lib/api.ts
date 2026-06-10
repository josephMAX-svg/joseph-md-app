/**
 * Cliente del servicio de inteligencia (FastAPI). Corre en el SERVIDOR (server components /
 * route handlers) → server-to-server, sin CORS. Para subir fotos/voz desde el navegador se usan
 * los route handlers en `/api/*` que reenvían el multipart.
 */
export const MV_URL = process.env.INTELLIGENCE_URL || "http://127.0.0.1:8000";

/**
 * Dual-mode: si Supabase está configurado (Vercel) → usa el MOTOR serverless (TS + Supabase, sin PC);
 * si no → proxy al FastAPI local (dev). Las páginas/rutas no cambian: siguen llamando mvGet/mvPost.
 */
async function useEngine(): Promise<boolean> {
  const { engineEnabled } = await import("./engine/supabase");
  return engineEnabled();
}

export async function mvGet<T = any>(path: string): Promise<T> {
  if (await useEngine()) { const { engineGet } = await import("./engine/dispatch"); return engineGet(path); }
  const res = await fetch(`${MV_URL}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
  return res.json();
}

export async function mvPost<T = any>(path: string, body: unknown): Promise<T> {
  if (await useEngine()) { const { enginePost } = await import("./engine/dispatch"); return enginePost(path, body); }
  const res = await fetch(`${MV_URL}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), cache: "no-store" });
  if (!res.ok) throw new Error(`POST ${path} → ${res.status}`);
  return res.json();
}

export async function mvPatch<T = any>(path: string, body: unknown): Promise<T> {
  if (await useEngine()) { const { enginePatch } = await import("./engine/dispatch"); return enginePatch(path, body); }
  const res = await fetch(`${MV_URL}${path}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), cache: "no-store" });
  if (!res.ok) throw new Error(`PATCH ${path} → ${res.status}`);
  return res.json();
}

/** Resuelve una foto a una URL SAME-ORIGIN (/api/media/...) para que cargue desde cualquier
 *  dispositivo (un celular no alcanza el 127.0.0.1 del servidor). */
export function mediaUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  // /uploads/abc.jpg → /api/media/abc.jpg
  const clean = path.replace(/^\/?uploads\//, "");
  return `/api/media/${clean}`;
}

/** ¿Está el servicio arriba? (para mostrar estado de salud en la UI). */
export async function mvHealth(): Promise<{ ok: boolean; ai?: string } | null> {
  try {
    if (await useEngine()) { const { engineGet } = await import("./engine/dispatch"); return engineGet("/health"); }
    const res = await fetch(`${MV_URL}/health`, { cache: "no-store" });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}
