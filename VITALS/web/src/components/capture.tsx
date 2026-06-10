"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera, Utensils, Scale, Smartphone, Footprints, Loader2, Check, Pencil, X } from "lucide-react";
import { cn } from "@/lib/format";
import { Card, Chip } from "./ui";

type Kind = "meal" | "body" | "screenshot" | "activity";

const KINDS: { kind: Kind; label: string; icon: any; desc: string; tone: string }[] = [
  { kind: "meal", label: "Mi comida", icon: Utensils, desc: "Foto del plato → alimentos, kcal y macros", tone: "bg-sage-subtle text-sage-deep" },
  { kind: "body", label: "Báscula / Renpho", icon: Scale, desc: "Captura de bioimpedancia → composición", tone: "bg-brass-subtle text-brass-deep" },
  { kind: "activity", label: "Mi actividad", icon: Footprints, desc: "Selfie / caminata → sesión cumplida", tone: "bg-success-subtle text-success" },
  { kind: "screenshot", label: "Otra app", icon: Smartphone, desc: "Pasos, sueño, ritmo cardíaco…", tone: "bg-subtle text-ink-secondary" },
];

const MEALS = ["desayuno", "almuerzo", "cena", "snack"];
const ACTS = ["caminata", "correr", "baile"];

export function Capture({ initial }: { initial?: Kind }) {
  const router = useRouter();
  const [kind, setKind] = useState<Kind | null>(initial ?? null);
  const [mealType, setMealType] = useState("almuerzo");
  const [actTipo, setActTipo] = useState("caminata");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !kind) return;
    setLoading(true); setError(null); setResult(null);
    const fd = new FormData();
    fd.append("kind", kind);
    fd.append("file", file);
    if (kind === "meal") fd.append("meal_type", mealType);
    if (kind === "activity") { fd.append("tipo", actTipo); fd.append("duracion_min", "30"); }
    try {
      const res = await fetch("/api/vision", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo analizar");
      setResult(data);
      router.refresh();
    } catch (err: any) {
      setError(String(err?.message || err));
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  // Selector de tipo de captura
  if (!kind) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {KINDS.map((k) => (
          <button key={k.kind} onClick={() => setKind(k.kind)}
            className="flex flex-col items-start gap-2 rounded-2xl border border-line bg-elevated p-4 text-left shadow-sm active:scale-[0.98]">
            <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", k.tone)}><k.icon className="h-6 w-6" /></span>
            <span className="font-medium">{k.label}</span>
            <span className="text-xs text-ink-muted">{k.desc}</span>
          </button>
        ))}
      </div>
    );
  }

  const meta = KINDS.find((k) => k.kind === kind)!;

  return (
    <div className="space-y-4">
      <button onClick={() => { setKind(null); setResult(null); }} className="text-sm text-ink-muted">‹ Cambiar tipo</button>

      <Card>
        <div className="flex items-center gap-3">
          <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", meta.tone)}><meta.icon className="h-5 w-5" /></span>
          <div><p className="font-medium">{meta.label}</p><p className="text-xs text-ink-muted">{meta.desc}</p></div>
        </div>

        {kind === "meal" && (
          <div className="mt-3 flex gap-1.5 overflow-x-auto no-scrollbar">
            {MEALS.map((m) => (
              <button key={m} onClick={() => setMealType(m)}
                className={cn("mv-chip capitalize", mealType === m ? "bg-sage text-ink-inverse" : "bg-subtle text-ink-secondary")}>{m}</button>
            ))}
          </div>
        )}
        {kind === "activity" && (
          <div className="mt-3 flex gap-1.5">
            {ACTS.map((a) => (
              <button key={a} onClick={() => setActTipo(a)}
                className={cn("mv-chip capitalize", actTipo === a ? "bg-sage text-ink-inverse" : "bg-subtle text-ink-secondary")}>{a}</button>
            ))}
          </div>
        )}

        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-raised py-10 active:scale-[0.99]">
          {loading ? <Loader2 className="h-9 w-9 animate-spin text-sage" /> : <Camera className="h-9 w-9 text-sage" />}
          <span className="text-sm font-medium">{loading ? "Analizando con IA…" : "Tomar foto o elegir"}</span>
          <span className="text-xs text-ink-muted">La IA identifica y registra. Tú casi no escribes.</span>
          <input ref={inputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFile} disabled={loading} />
        </label>
      </Card>

      {error && <Card className="border-danger/30 bg-danger-subtle text-sm text-danger">{error}</Card>}
      {result && <ResultView kind={kind} result={result} />}
    </div>
  );
}

function ResultView({ kind, result }: { kind: Kind; result: any }) {
  if (kind === "meal") return <MealResult result={result} />;
  if (kind === "body") return <BodyResult result={result} />;
  if (kind === "activity") return <ActivityResult result={result} />;
  return <ScreenshotResult result={result} />;
}

function MealResult({ result }: { result: any }) {
  const a = result.analysis;
  const [correcting, setCorrecting] = useState(false);
  const [kcal, setKcal] = useState(a.kcal);
  const [prot, setProt] = useState(a.prot_g);
  const [saved, setSaved] = useState(false);
  const matchTone = a.plan_match === "cumple" ? "success" : a.plan_match === "parcial" ? "warn" : "danger";

  async function saveCorrection() {
    await fetch("/api/action", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "food.correct", payload: { log_id: result.log_id, kcal: Number(kcal), prot_g: Number(prot) } }),
    });
    setSaved(true); setCorrecting(false);
  }

  return (
    <Card className="mv-enter">
      <div className="flex items-center justify-between">
        <span className="mv-label">Análisis</span>
        <Chip tone={matchTone as any}>{a.plan_match}</Chip>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2 text-center">
        {[["kcal", saved ? kcal : a.kcal, ""], ["Prot", saved ? prot : a.prot_g, "g"], ["Carbo", a.carb_g, "g"], ["Grasa", a.grasa_g, "g"]].map(([l, v, u]) => (
          <div key={l as string} className="rounded-xl bg-subtle py-2">
            <div className="font-serif text-lg font-medium tabular-nums tnum">{v as any}<span className="text-[10px] text-ink-muted">{u as string}</span></div>
            <div className="text-[10px] uppercase tracking-wide text-ink-muted">{l as string}</div>
          </div>
        ))}
      </div>
      <ul className="mt-3 space-y-1">
        {a.alimentos?.map((f: any, i: number) => (
          <li key={i} className="flex justify-between text-sm">
            <span>{f.nombre} <span className="text-ink-muted">· {f.porcion}</span></span>
            <span className="tabular-nums tnum text-ink-muted">{f.kcal} kcal</span>
          </li>
        ))}
      </ul>
      {a.plan_match_explicacion && <p className="mt-2 text-sm text-ink-secondary">{a.plan_match_explicacion}</p>}
      <p className="mt-2 text-[11px] text-ink-muted">
        {a.disclaimer} · Confianza {Math.round((a.confianza ?? 0.6) * 100)}% · {a.fuente === "claude" ? "Claude visión" : "modo demo"}
      </p>

      <div className="mt-3 flex items-center gap-2">
        {saved ? (
          <Chip tone="success"><Check className="h-3.5 w-3.5" /> Corregido y guardado</Chip>
        ) : !correcting ? (
          <>
            <Chip tone="success"><Check className="h-3.5 w-3.5" /> Registrado</Chip>
            <button onClick={() => setCorrecting(true)} className="mv-chip bg-subtle text-ink-secondary"><Pencil className="h-3.5 w-3.5" /> Corregir</button>
          </>
        ) : (
          <div className="flex w-full items-center gap-2">
            <input type="number" value={kcal} onChange={(e) => setKcal(e.target.value)} className="w-20 rounded-lg border border-line bg-raised px-2 py-1 text-sm tabular-nums" />
            <span className="text-xs text-ink-muted">kcal</span>
            <input type="number" value={prot} onChange={(e) => setProt(e.target.value)} className="w-16 rounded-lg border border-line bg-raised px-2 py-1 text-sm tabular-nums" />
            <span className="text-xs text-ink-muted">g prot</span>
            <button onClick={saveCorrection} className="mv-chip bg-sage text-ink-inverse">Guardar</button>
            <button onClick={() => setCorrecting(false)} className="flex h-7 w-7 items-center justify-center rounded-full bg-subtle"><X className="h-4 w-4" /></button>
          </div>
        )}
      </div>
    </Card>
  );
}

function BodyResult({ result }: { result: any }) {
  const m = result.metrics || {};
  const keys: [string, string, string][] = [
    ["peso", "Peso", "kg"], ["grasa_pct", "% Grasa", "%"], ["musculo_esqueletico_pct", "Músculo esq.", "%"],
    ["masa_magra_kg", "Masa magra", "kg"], ["grasa_visceral", "Visceral", ""], ["tmb", "TMB", "kcal"],
  ];
  return (
    <Card className="mv-enter">
      <div className="flex items-center justify-between"><span className="mv-label">Composición extraída</span><Chip tone="success"><Check className="h-3.5 w-3.5" /> Registrado</Chip></div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {keys.filter(([k]) => m[k] != null).map(([k, l, u]) => (
          <div key={k} className="rounded-xl bg-subtle p-2 text-center">
            <div className="font-serif text-lg font-medium tabular-nums tnum">{m[k]}<span className="text-[10px] text-ink-muted">{u}</span></div>
            <div className="text-[10px] uppercase tracking-wide text-ink-muted">{l}</div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-ink-muted">Sin tipear. Confianza {Math.round((result.confianza ?? 0.8) * 100)}% · {result.fuente}</p>
    </Card>
  );
}

function ActivityResult({ result }: { result: any }) {
  return (
    <Card className="mv-enter">
      <div className="flex items-center gap-2"><Chip tone="success"><Check className="h-3.5 w-3.5" /> Actividad verificada</Chip><span className="text-sm capitalize">{result.tipo}</span></div>
      <p className="mt-2 text-sm text-ink-secondary">{result.evidencia}</p>
      <p className="mt-1 text-[11px] text-ink-muted">Timestamp de servidor registrado{result.exif && Object.keys(result.exif).length ? " · EXIF detectado" : ""}. Sostiene tu garantía.</p>
    </Card>
  );
}

function ScreenshotResult({ result }: { result: any }) {
  const m = result.metrics || {};
  return (
    <Card className="mv-enter">
      <span className="mv-label">{result.tipo_detectado || "Extraído"}</span>
      <div className="mt-2 space-y-1">
        {Object.entries(m).map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm"><span className="capitalize text-ink-secondary">{k.replace(/_/g, " ")}</span><span className="tabular-nums tnum">{String(v)}</span></div>
        ))}
      </div>
    </Card>
  );
}
