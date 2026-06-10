"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Texto → voz (TTS) con Web Speech API `speechSynthesis`. El coach "te responde hablando". */
export function speak(text: string, opts: { rate?: number } = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-PE";
    u.rate = opts.rate ?? 1.02;
    const voices = window.speechSynthesis.getVoices();
    const es = voices.find((v) => v.lang?.toLowerCase().startsWith("es"));
    if (es) u.voice = es;
    window.speechSynthesis.speak(u);
  } catch {
    /* no-op */
  }
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

/** Voz → texto (STT) con Web Speech API. Devuelve {supported, listening, transcript, start, stop}. */
export function useSpeechToText(onResult?: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(false);
  const recRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    setSupported(true);
    const rec = new SR();
    rec.lang = "es-PE";
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e: any) => {
      const text = Array.from(e.results).map((r: any) => r[0].transcript).join(" ");
      setTranscript(text);
      if (e.results[e.results.length - 1].isFinal && onResult) onResult(text.trim());
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    return () => { try { rec.abort(); } catch { /* */ } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback(() => {
    if (!recRef.current) return;
    setTranscript("");
    try { recRef.current.start(); setListening(true); } catch { /* */ }
  }, []);
  const stop = useCallback(() => {
    try { recRef.current?.stop(); } catch { /* */ }
    setListening(false);
  }, []);

  return { supported, listening, transcript, start, stop };
}
