"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Mic, Volume2, VolumeX, Sparkles, AlertTriangle, BookOpen } from "lucide-react";
import { cn } from "@/lib/format";
import { useSpeechToText, speak, stopSpeaking } from "./voice";

interface Msg {
  role: "user" | "coach";
  text: string;
  escalated?: boolean;
  citations?: { titulo: string; fuente: string }[];
  redFlag?: any;
}

const SUGERENCIAS = [
  "¿Cuánta proteína debo comer al día?",
  "¿Cómo sé si estoy progresando en el gym?",
  "¿Puedo cambiar el arroz por otra cosa?",
  "Me cuesta entrenar, no tengo tiempo",
];

export function CoachChat({ initial }: { initial: Msg[] }) {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [tts, setTts] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const { supported, listening, transcript, start, stop } = useSpeechToText((final) => { if (final) send(final); });

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || sending) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: t }]);
    setSending(true);
    try {
      const res = await fetch("/api/action", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "coach.chat", payload: { message: t } }),
      });
      const data = await res.json();
      const reply: Msg = { role: "coach", text: data.reply, escalated: data.escalated, citations: data.used_knowledge, redFlag: data.red_flag };
      setMessages((m) => [...m, reply]);
      if (tts) speak(data.reply);
    } catch {
      setMessages((m) => [...m, { role: "coach", text: "No pude responder ahora. Intenta de nuevo en un momento." }]);
    } finally {
      setSending(false);
    }
  }

  function toggleTts() {
    if (tts) stopSpeaking();
    setTts(!tts);
  }

  return (
    <div className="flex h-[calc(100vh-13rem)] flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto pb-4">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
              m.role === "user" ? "bg-sage text-ink-inverse" : m.escalated ? "border border-warn/30 bg-warn-subtle" : "border border-line bg-elevated")}>
              {m.role === "coach" && (
                <div className="mb-1 flex items-center gap-1 text-[11px] font-medium text-sage-deep">
                  <Sparkles className="h-3 w-3" /> Pulso Coach
                  {m.escalated && <span className="ml-1 inline-flex items-center gap-0.5 rounded-full bg-warn px-1.5 py-0.5 text-[10px] text-ink-inverse"><AlertTriangle className="h-2.5 w-2.5" /> derivado al médico</span>}
                </div>
              )}
              <p className="leading-relaxed">{m.text}</p>
              {m.citations && m.citations.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {m.citations.slice(0, 3).map((c, j) => (
                    <span key={j} className="inline-flex items-center gap-1 rounded-full bg-subtle px-2 py-0.5 text-[10px] text-ink-muted"><BookOpen className="h-2.5 w-2.5" /> {c.fuente}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {sending && <div className="flex justify-start"><div className="rounded-2xl border border-line bg-elevated px-3.5 py-2.5 text-sm text-ink-muted">escribiendo…</div></div>}
        {listening && <div className="flex justify-end"><div className="rounded-2xl bg-sage/70 px-3.5 py-2.5 text-sm text-ink-inverse">🎙 {transcript || "escuchando…"}</div></div>}
        <div ref={endRef} />
      </div>

      {messages.length <= 1 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {SUGERENCIAS.map((s) => (
            <button key={s} onClick={() => send(s)} className="rounded-full border border-line bg-elevated px-3 py-1.5 text-xs text-ink-secondary active:scale-95">{s}</button>
          ))}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="flex items-center gap-2 rounded-full border border-line bg-elevated p-1.5">
        <button type="button" onClick={toggleTts} aria-label="Voz del coach"
          className={cn("flex h-10 w-10 items-center justify-center rounded-full", tts ? "bg-sage text-ink-inverse" : "text-ink-muted")}>
          {tts ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </button>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pregúntale a tu coach…"
          className="min-w-0 flex-1 bg-transparent px-1 text-sm outline-none" />
        {supported && (
          <button type="button" onClick={listening ? stop : start} aria-label="Hablar"
            className={cn("flex h-10 w-10 items-center justify-center rounded-full", listening ? "animate-pulse bg-danger text-ink-inverse" : "bg-subtle text-sage-deep")}>
            <Mic className="h-5 w-5" />
          </button>
        )}
        <button type="submit" disabled={!input.trim() || sending} aria-label="Enviar"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brass text-ink-inverse disabled:opacity-40">
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
