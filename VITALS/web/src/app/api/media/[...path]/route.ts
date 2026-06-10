import { NextRequest, NextResponse } from "next/server";
import { MV_URL } from "@/lib/api";

/**
 * Proxy de medios: sirve las fotos del servicio de inteligencia (FastAPI /uploads) a través del
 * MISMO origen del web. Así las imágenes cargan desde CUALQUIER dispositivo (el celular no puede
 * alcanzar 127.0.0.1:8000 del servidor). `mediaUrl()` devuelve /api/media/...
 */
export async function GET(_req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = (params.path || []).join("/");
  try {
    const res = await fetch(`${MV_URL}/uploads/${path}`, { cache: "no-store" });
    if (!res.ok) return new NextResponse("Not found", { status: 404 });
    const buf = await res.arrayBuffer();
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Upstream error", { status: 502 });
  }
}
