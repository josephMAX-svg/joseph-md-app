import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { MV_URL } from "@/lib/api";
import { USER_COOKIE, DEFAULT_USER } from "@/lib/user";
import { engineEnabled } from "@/lib/engine/supabase";
import * as E from "@/lib/engine";

/**
 * Captura por foto. Dual-mode: en Vercel (Supabase) usa el MOTOR (Gemini/stub) y persiste en Supabase;
 * en local reenvía el multipart al FastAPI. kind ∈ meal | body | screenshot | activity.
 */
const KINDS = new Set(["meal", "body", "screenshot", "activity"]);

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const kind = String(form.get("kind") || "");
  if (!KINDS.has(kind)) return NextResponse.json({ error: `kind inválido: ${kind}` }, { status: 400 });
  const uid = cookies().get(USER_COOKIE)?.value || DEFAULT_USER;
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "file requerido" }, { status: 400 });

  if (engineEnabled()) {
    try {
      const b64 = Buffer.from(await file.arrayBuffer()).toString("base64");
      const mealType = String(form.get("meal_type") || "almuerzo");
      const tipo = String(form.get("tipo") || "caminata");
      const dur = parseInt(String(form.get("duracion_min") || "30"));
      let data: any;
      if (kind === "meal") data = await E.visionMeal(uid, b64, mealType);
      else if (kind === "body") data = await E.visionBody(uid, b64);
      else if (kind === "screenshot") data = await E.visionScreenshot(uid, b64);
      else data = await E.visionActivity(uid, b64, tipo, dur);
      return NextResponse.json(data);
    } catch (e: any) {
      return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
    }
  }

  // Local: reenvía al FastAPI.
  const out = new FormData();
  out.append("user_id", uid);
  out.append("file", file, (file as File).name || "captura.jpg");
  for (const k of ["meal_type", "tipo", "duracion_min"]) { const v = form.get(k); if (v != null) out.append(k, String(v)); }
  try {
    const res = await fetch(`${MV_URL}/vision/${kind}`, { method: "POST", body: out });
    const data = await res.json();
    return NextResponse.json(data, { status: res.ok ? 200 : 502 });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 502 });
  }
}
