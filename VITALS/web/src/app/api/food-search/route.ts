import { NextRequest, NextResponse } from "next/server";
import { mvGet } from "@/lib/api";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  if (q.length < 2) return NextResponse.json([]);
  try {
    return NextResponse.json(await mvGet(`/food/search?q=${encodeURIComponent(q)}`));
  } catch {
    return NextResponse.json([]);
  }
}
