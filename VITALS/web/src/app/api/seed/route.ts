import { NextResponse } from "next/server";
import { engineEnabled } from "@/lib/engine/supabase";

/** Siembra Supabase (mv_*) una sola vez. Idempotente. Llamar tras el primer deploy. */
export async function GET() {
  if (!engineEnabled()) return NextResponse.json({ error: "Supabase no configurado (modo local usa FastAPI)" }, { status: 400 });
  try {
    const { seedIfEmpty } = await import("@/lib/engine/seed");
    const result = await seedIfEmpty();
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
