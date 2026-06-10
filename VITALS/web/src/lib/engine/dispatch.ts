import "server-only";
import { geminiEnabled } from "./gemini";
import * as E from "./index";

/** Enruta las llamadas (mismas rutas que el FastAPI) al motor serverless sobre Supabase. */
export async function engineGet(path: string): Promise<any> {
  const u = new URL(path, "http://x");
  const seg = u.pathname.split("/").filter(Boolean);
  const q = u.searchParams;
  const [a, b, c] = seg;
  if (a === "health") return { ok: true, service: "movimiento-engine", ai: geminiEnabled() ? "gemini" : "stub" };
  if (a === "config") return { ai_enabled: geminiEnabled(), models: { vision: "gemini-2.0-flash", coach: "gemini-2.0-flash" }, rag_namespace: "movimiento" };
  if (a === "users") return b ? E.getUser(b) : E.getUsers();
  if (a === "adherence") {
    if (c === "dashboard") return E.adherenceDashboard(b);
    if (c === "today") return E.adherenceToday(b);
    return E.adherencePeriod(b, parseInt(q.get("days") || "7"));
  }
  if (a === "plan") return E.getPlan(b);
  if (a === "body") return E.bodyHistory(b);
  if (a === "food") {
    if (b === "search") return E.foodSearch(q.get("q") || "", 12);
    return E.foodHistory(b, q.get("fecha") || undefined);
  }
  if (a === "exercise") {
    if (c === "today") return E.exerciseToday(b);
    if (c === "progression") return E.exerciseProgression(b);
    if (c === "streak") return E.weeklyStreak(b);
  }
  if (a === "coach") {
    if (b === "tasks") return E.coachTasks(q.get("estado") || "abierta");
    if (c === "messages") return E.coachMessages(b, parseInt(q.get("limit") || "50"));
  }
  if (a === "report" && b === "guarantee") return E.reportGuarantee(c, parseInt(q.get("days") || "35"));
  if (a === "report" && b === "weekly") return E.weeklyReport(c);
  throw new Error(`engineGet: ruta no mapeada ${path}`);
}

export async function enginePost(path: string, body: any): Promise<any> {
  const seg = path.split("?")[0].split("/").filter(Boolean);
  const [a, b] = seg;
  if (a === "coach" && b === "chat") return E.coachChat(body.user_id, body.message);
  if (a === "exercise" && b === "log") return E.exerciseLog(body.user_id, body);
  if (a === "exercise" && b === "voice") return E.exerciseVoice(body.user_id, body.transcript, body.fecha);
  if (a === "food" && b === "log") return E.foodLog(body.user_id, body);
  if (a === "body" && b === "manual") return E.bodyManual(body.user_id, body.metrics, body.fecha);
  if (a === "wellness" && b === "log") return E.wellnessLog(body.user_id, body.tipo, body.valor, body.meta, body.fecha);
  if (a === "plan" && b === "generate") return E.generatePlan(body.user_id, body.fase);
  if (a === "plan" && b === "restructure") return E.restructurePlan(body.user_id);
  throw new Error(`enginePost: ruta no mapeada ${path}`);
}

export async function enginePatch(path: string, body: any): Promise<any> {
  const seg = path.split("?")[0].split("/").filter(Boolean);
  if (seg[0] === "food") return E.foodCorrect(seg[1], body); // /food/{id}
  if (seg[0] === "users" && seg[2] === "profile") return E.patchProfile(seg[1], body); // /users/{uid}/profile
  throw new Error(`enginePatch: ruta no mapeada ${path}`);
}
