import "server-only";

/**
 * Wrapper Gemini (REST, sin SDK) — la IA real disponible (visión de comida/Renpho + coach).
 * Sin GEMINI_API_KEY → null y el motor cae a stubs deterministas. Modelo multimodal flash.
 */
const KEY = process.env.GEMINI_API_KEY || "";
const MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const BASE = "https://generativelanguage.googleapis.com/v1beta/models";

export function geminiEnabled(): boolean {
  return Boolean(KEY);
}

export async function geminiText(prompt: string, opts: { system?: string; temperature?: number; maxTokens?: number } = {}): Promise<string | null> {
  if (!KEY) return null;
  try {
    const res = await fetch(`${BASE}/${MODEL}:generateContent?key=${KEY}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: opts.system ? { parts: [{ text: opts.system }] } : undefined,
        generationConfig: { temperature: opts.temperature ?? 0.4, maxOutputTokens: opts.maxTokens ?? 500 },
      }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("").trim() || null;
  } catch { return null; }
}

export async function geminiVisionJson(prompt: string, base64: string, mime = "image/jpeg", system = ""): Promise<any | null> {
  if (!KEY) return null;
  try {
    const res = await fetch(`${BASE}/${MODEL}:generateContent?key=${KEY}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ inline_data: { mime_type: mime, data: base64 } }, { text: prompt }] }],
        systemInstruction: system ? { parts: [{ text: system }] } : undefined,
        generationConfig: { temperature: 0.2, maxOutputTokens: 900, responseMimeType: "application/json" },
      }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("").trim() || "";
    return extractJson(raw);
  } catch { return null; }
}

function extractJson(raw: string): any | null {
  if (!raw) return null;
  raw = raw.replace(/^```(?:json)?|```$/gm, "").trim();
  try { return JSON.parse(raw); } catch {
    const m = raw.match(/\{[\s\S]*\}/);
    if (m) { try { return JSON.parse(m[0]); } catch { return null; } }
    return null;
  }
}
