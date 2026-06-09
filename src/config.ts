/**
 * Joseph MD — runtime config (single place to edit integration URLs).
 *
 * VITALS = the fitness + nutrition app (own Next.js deploy on Vercel). It is embedded
 * in this dashboard as a cross-origin <iframe>. To point the VITALS button at a
 * different deploy, change ONE line below.
 *
 * Why an iframe to the absolute URL (not a Vercel `/vitals` basePath rewrite):
 * VITALS issues raw `fetch('/api/...')` calls (vision, coach, actions). Next.js
 * basePath rewrites <Link> and assets but NOT raw fetches, so proxying it under
 * `/vitals` would break every AI feature. Loading VITALS from its own origin keeps
 * 100% of its functionality (camera capture, Gemini coach, Supabase) intact.
 */
export const VITALS_URL = 'https://web-sigma-eight-92.vercel.app';
