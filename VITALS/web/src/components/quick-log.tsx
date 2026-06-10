"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Droplets, Moon, Plus, Check } from "lucide-react";
import { cn } from "@/lib/format";

/** Registro rápido de hidratación y sueño (pilares de adherencia), baja fricción. */
export function QuickLog({ agua, sueno }: { agua?: number | null; sueno?: number | null }) {
  const router = useRouter();
  const [vasos, setVasos] = useState(agua && agua < 50 ? agua : 0);
  const [busy, setBusy] = useState(false);
  const [savedSleep, setSavedSleep] = useState<number | null>(sueno ?? null);

  async function post(kind: string, payload: any) {
    setBusy(true);
    try {
      await fetch("/api/action", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, payload }) });
      router.refresh();
    } finally { setBusy(false); }
  }

  async function addVaso() {
    const v = vasos + 1;
    setVasos(v);
    await post("wellness.log", { tipo: "agua", valor: v, meta: 8 });
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="mv-card">
        <div className="flex items-center gap-2 text-sage-deep"><Droplets className="h-5 w-5" /><span className="text-sm font-medium">Agua</span></div>
        <p className="mt-2 font-serif text-2xl font-medium tabular-nums">{vasos}<span className="text-sm text-ink-muted"> /8 vasos</span></p>
        <button onClick={addVaso} disabled={busy} className="mv-btn-ghost mt-2 w-full"><Plus className="h-4 w-4" /> Un vaso</button>
      </div>
      <div className="mv-card">
        <div className="flex items-center gap-2 text-sage-deep"><Moon className="h-5 w-5" /><span className="text-sm font-medium">Sueño</span></div>
        <p className="mt-2 font-serif text-2xl font-medium tabular-nums">{savedSleep ?? "—"}<span className="text-sm text-ink-muted"> h</span></p>
        <div className="mt-2 flex gap-1">
          {[6, 7, 8].map((h) => (
            <button key={h} onClick={() => { setSavedSleep(h); post("wellness.log", { tipo: "sueno", valor: h, meta: 7 }); }}
              className={cn("mv-chip flex-1 justify-center", savedSleep === h ? "bg-sage text-ink-inverse" : "bg-subtle text-ink-secondary")}>
              {savedSleep === h ? <Check className="h-3.5 w-3.5" /> : `${h}h`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
