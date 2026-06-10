import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mvPost, mvPatch } from "@/lib/api";
import { USER_COOKIE, DEFAULT_USER } from "@/lib/user";

/**
 * Proxy de mutaciones JSON: el navegador llama same-origin `/api/action` con {kind, payload};
 * inyectamos el user_id de la cookie y reenviamos al servicio de inteligencia. Whitelist de paths.
 */
const ROUTES: Record<string, { path: (uid: string) => string; method: "POST" | "PATCH" }> = {
  "exercise.log": { path: () => "/exercise/log", method: "POST" },
  "exercise.voice": { path: () => "/exercise/voice", method: "POST" },
  "food.log": { path: () => "/food/log", method: "POST" },
  "body.manual": { path: () => "/body/manual", method: "POST" },
  "wellness.log": { path: () => "/wellness/log", method: "POST" },
  "plan.generate": { path: () => "/plan/generate", method: "POST" },
  "plan.restructure": { path: () => "/plan/restructure", method: "POST" },
  "coach.chat": { path: () => "/coach/chat", method: "POST" },
  "profile.patch": { path: (uid) => `/users/${uid}/profile`, method: "PATCH" },
};

export async function POST(req: NextRequest) {
  const { kind, payload } = await req.json();

  // Corrección de comida: PATCH /food/{log_id} con path dinámico.
  if (kind === "food.correct") {
    const { log_id, ...rest } = payload || {};
    try {
      return NextResponse.json(await mvPatch(`/food/${log_id}`, { log_id, ...rest }));
    } catch (e: any) {
      return NextResponse.json({ error: String(e?.message || e) }, { status: 502 });
    }
  }

  const route = ROUTES[kind];
  if (!route) return NextResponse.json({ error: `kind desconocido: ${kind}` }, { status: 400 });
  const uid = cookies().get(USER_COOKIE)?.value || DEFAULT_USER;
  const body = kind === "profile.patch" ? payload : { user_id: uid, ...payload };
  try {
    const data = route.method === "PATCH" ? await mvPatch(route.path(uid), body) : await mvPost(route.path(uid), body);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 502 });
  }
}
