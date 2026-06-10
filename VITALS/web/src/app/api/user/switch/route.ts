import { NextRequest, NextResponse } from "next/server";
import { USER_COOKIE } from "@/lib/user";

/** Cambia el usuario activo (selector local). En prod: Supabase auth + magic_links. */
export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  if (!userId) return NextResponse.json({ error: "userId requerido" }, { status: 400 });
  const res = NextResponse.json({ ok: true, userId });
  res.cookies.set(USER_COOKIE, userId, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return res;
}
