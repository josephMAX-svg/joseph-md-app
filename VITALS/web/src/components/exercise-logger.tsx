"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, Check, Plus, Trophy, Dumbbell, Loader2, X } from "lucide-react";
import { cn, num } from "@/lib/format";
import { Card, Chip } from "./ui";
import { useSpeechToText } from "./voice";
import { VideoButton } from "./video";
import { findTutorial } from "@/lib/tutorials";

interface PlanEx { nombre: string; grupo?: string; series: number | string; reps: string; rir?: number; hecho?: boolean }
interface PrInfo { ejercicio: string; cats: { e1rm?: boolean; volumen?: boolean; reps?: boolean }; e1rm?: number; volumen?: number }

const CONFETTI = ["#D9A441", "#E8D5AD", "#8FA8C8", "#F2E8D0", "#B8862F", "#51719A"];

/** Banner de PR en vivo (Hevy): multi-categoría, aparece al instante de loguear la serie.
 *  Es el ÚNICO lugar con confeti — el mejor momento dopamina de la app. */
function PRBanner({ pr, onClose }: { pr: PrInfo; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 6500);
    return () => clearTimeout(t);
  }, [onClose]);
  const cats: string[] = [];
  if (pr.cats.e1rm) cats.push(`nuevo e1RM ${pr.e1rm ? num(pr.e1rm, 1) + " kg" : ""}`.trim());
  if (pr.cats.volumen) cats.push("récord de volumen de sesión");
  if (pr.cats.reps) cats.push("más reps a tu peso top");
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  return (
    <>
      {!reduced && Array.from({ length: 30 }).map((_, i) => (
        <span key={i} className="mv-confetti"
          style={{ left: `${(i * 3.4 + (i % 5) * 4) % 100}%`, background: CONFETTI[i % CONFETTI.length], animationDuration: `${2.2 + (i % 5) * 0.4}s`, animationDelay: `${(i % 8) * 0.1}s` }} />
      ))}
      <div className="mv-toast fixed inset-x-4 top-4 z-[95] mx-auto max-w-md rounded-2xl border border-brass/40 bg-raised p-4 shadow-lg" role="status">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brass text-ink-inverse"><Trophy className="h-6 w-6" /></span>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-lg font-medium leading-tight">¡PR! {pr.ejercicio}</p>
            <p className="mt-0.5 text-xs text-ink-secondary">{cats.join(" · ")}</p>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-muted"><X className="h-4 w-4" /></button>
        </div>
      </div>
    </>
  );
}

export function ExerciseLogger({ ejercicios, dia }: { ejercicios: PlanEx[]; dia: any }) {
  const router = useRouter();
  const [openEx, setOpenEx] = useState<string | null>(null);
  const [done, setDone] = useState<Record<string, { pr?: boolean; vol?: number }>>({});
  const [voiceMsg, setVoiceMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [pr, setPr] = useState<PrInfo | null>(null);
  const { supported, listening, transcript, start, stop } = useSpeechToText((final) => { if (final) logVoice(final); });

  // Si hubo PR, NO refrescamos de inmediato: router.refresh() re-monta el árbol y se llevaría
  // el banner. El refresh ocurre cuando el banner se cierra (el momento dopamina es sagrado).
  function registrarResultado(nombre: string, data: any): boolean {
    const esPr = data.es_pr_alguno ?? data.es_pr;
    setDone((d) => ({ ...d, [nombre.toLowerCase()]: { pr: esPr, vol: data.volumen } }));
    if (esPr) setPr({ ejercicio: nombre, cats: data.pr_categorias || { e1rm: !!data.es_pr }, e1rm: data.e1rm, volumen: data.volumen });
    return !!esPr;
  }

  function cerrarBanner() {
    setPr(null);
    router.refresh();
  }

  async function logExercise(nombre: string, grupo: string | undefined, series: { reps: number; carga_kg: number; rir?: number }[]) {
    setBusy(true);
    try {
      const res = await fetch("/api/action", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "exercise.log", payload: { ejercicio: nombre, grupo_muscular: grupo, series } }),
      });
      const data = await res.json();
      const pr = registrarResultado(nombre, data);
      setOpenEx(null);
      if (!pr) router.refresh();
    } finally { setBusy(false); }
  }

  async function logVoice(transcript: string) {
    setBusy(true); setVoiceMsg(null);
    try {
      const res = await fetch("/api/action", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "exercise.voice", payload: { transcript } }),
      });
      const data = await res.json();
      if (data.ok === false) setVoiceMsg(data.error || "No te entendí.");
      else {
        setVoiceMsg(`✓ ${data.parsed?.ejercicio}: ${data.parsed?.carga_kg} kg × ${data.parsed?.reps}${data.es_pr_alguno || data.es_pr ? " · ¡PR!" : ""}`);
        const pr = registrarResultado(data.parsed?.ejercicio || "", data);
        if (!pr) router.refresh();
      }
    } finally { setBusy(false); }
  }

  // Subtareas cortas: la sesión es una lista de bloques de ~minPorEj minutos, no un muro.
  const total = ejercicios.length;
  const hechos = ejercicios.filter((e) => e.hecho || e.nombre.toLowerCase() in done).length;
  const minPorEj = total && dia?.duracion_min ? Math.max(4, Math.round(dia.duracion_min / total)) : null;
  const ahora = ejercicios.find((e) => !(e.hecho || e.nombre.toLowerCase() in done))?.nombre;

  return (
    <div className="space-y-3">
      {pr && <PRBanner pr={pr} onClose={cerrarBanner} />}

      {/* Progreso de la sesión: una sola siguiente acción obvia */}
      <div className="flex items-center justify-between px-1">
        <span className="mv-label">Sesión · {hechos}/{total} ejercicios</span>
        {minPorEj && <span className="text-[11px] tabular-nums text-ink-muted">~{minPorEj}′ por ejercicio</span>}
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-subtle">
        <div className="h-full rounded-full bg-brass transition-all duration-700" style={{ width: `${total ? (hechos / total) * 100 : 0}%` }} />
      </div>

      {/* Voz */}
      {supported && (
        <Card className="flex items-center gap-3">
          <button onClick={listening ? stop : start}
            className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full", listening ? "animate-pulse bg-danger text-ink-inverse" : "bg-sage text-ink-inverse")}>
            <Mic className="h-6 w-6" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{listening ? "Escuchando…" : "Registra por voz"}</p>
            <p className="truncate text-xs text-ink-muted">{listening ? (transcript || "habla ahora") : voiceMsg || "“press de pecho 35 kilos 10 reps”"}</p>
          </div>
        </Card>
      )}

      {/* Lista de ejercicios del día */}
      {ejercicios.map((ej) => {
        const key = ej.nombre.toLowerCase();
        const hecho = ej.hecho || key in done;
        const info = done[key];
        const esAhora = ej.nombre === ahora;
        return (
          <Card key={ej.nombre} className={cn(hecho && "border-sage/30 bg-sage-subtle/40", esAhora && "border-brass/50")}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl", hecho ? "bg-sage text-ink-inverse" : esAhora ? "bg-brass text-ink-inverse" : "bg-subtle text-ink-secondary")}>
                  {hecho ? <Check className="h-5 w-5" /> : <Dumbbell className="h-5 w-5" />}
                </span>
                <div>
                  <p className="font-medium">{ej.nombre}{esAhora && <span className="ml-2 align-middle text-[10px] font-semibold uppercase tracking-wider text-brass">ahora</span>}</p>
                  <p className="text-xs text-ink-muted">{ej.series} series · {ej.reps} · RIR {ej.rir ?? "—"}{minPorEj ? ` · ~${minPorEj}′` : ""}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <VideoButton tutorial={findTutorial(ej.nombre)} title={ej.nombre} />
                {hecho ? (
                  info?.pr ? <Chip tone="brass"><Trophy className="h-3.5 w-3.5" /> PR</Chip> : <Chip tone="success">Hecho</Chip>
                ) : (
                  <button onClick={() => setOpenEx(openEx === ej.nombre ? null : ej.nombre)} className="flex h-9 w-9 items-center justify-center rounded-full bg-sage text-ink-inverse"><Plus className="h-5 w-5" /></button>
                )}
              </div>
            </div>
            {openEx === ej.nombre && <QuickForm ej={ej} busy={busy} onSubmit={(s) => logExercise(ej.nombre, ej.grupo, s)} />}
          </Card>
        );
      })}
    </div>
  );
}

function QuickForm({ ej, onSubmit, busy }: { ej: PlanEx; busy: boolean; onSubmit: (s: { reps: number; carga_kg: number; rir?: number }[]) => void }) {
  const nSeries = typeof ej.series === "number" ? ej.series : 3;
  const [carga, setCarga] = useState("");
  const [reps, setReps] = useState(String(parseInt(String(ej.reps)) || 10));
  const [rir, setRir] = useState(String(ej.rir ?? 2));
  const [series, setSeries] = useState(String(nSeries));

  return (
    <div className="mt-3 border-t border-line-subtle pt-3">
      <div className="grid grid-cols-4 gap-2">
        {[["Carga", carga, setCarga, "kg"], ["Reps", reps, setReps, ""], ["Series", series, setSeries, ""], ["RIR", rir, setRir, ""]].map(([l, v, set, u]: any) => (
          <label key={l} className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wide text-ink-muted">{l}{u && ` (${u})`}</span>
            <input type="number" inputMode="decimal" value={v} onChange={(e) => set(e.target.value)}
              className="w-full rounded-lg border border-line bg-raised px-2 py-2 text-center text-sm tabular-nums outline-none focus:border-brass" />
          </label>
        ))}
      </div>
      <button disabled={busy || !carga} onClick={() => {
        const n = Math.max(1, parseInt(series) || 1);
        const s = Array.from({ length: n }, () => ({ reps: Number(reps), carga_kg: Number(carga), rir: rir ? Number(rir) : undefined }));
        onSubmit(s);
      }} className="mv-btn-primary mt-3 w-full disabled:opacity-40">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Registrar serie"}
      </button>
    </div>
  );
}
