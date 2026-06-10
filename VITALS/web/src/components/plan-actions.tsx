"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Loader2, AlertTriangle, Sparkles } from "lucide-react";

/** Botón de "reestructurar plan": la IA recalcula según tus datos (con pisos de seguridad). */
export function RestructureButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function run() {
    setBusy(true); setResult(null);
    try {
      const res = await fetch("/api/action", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "plan.restructure", payload: {} }),
      });
      const data = await res.json();
      setResult(data);
      router.refresh();
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-3">
      <button onClick={run} disabled={busy} className="mv-btn-primary w-full">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        {busy ? "Recalculando con tus datos…" : "Reestructurar mi plan"}
      </button>
      {result && (
        <div className={`rounded-2xl border p-4 mv-enter ${result.escalado ? "border-warn/30 bg-warn-subtle" : "border-sage/30 bg-sage-subtle"}`}>
          <div className="flex items-center gap-1.5 text-sm font-medium">
            {result.escalado ? <AlertTriangle className="h-4 w-4 text-warn" /> : <Sparkles className="h-4 w-4 text-sage-deep" />}
            Plan v{result.version} actualizado
          </div>
          <p className="mt-1 text-sm text-ink-secondary">{result.motivo}</p>
          {result.advertencias?.length > 0 && (
            <ul className="mt-2 space-y-0.5 text-xs text-warn">
              {result.advertencias.map((a: string, i: number) => <li key={i}>• {a}</li>)}
            </ul>
          )}
          {result.contexto && (
            <p className="mt-2 text-[11px] text-ink-muted">
              Adherencia 14d: {result.contexto.adherencia_14d}% · TDEE: {result.contexto.tdee?.tdee} kcal ({result.contexto.tdee?.metodo}) · Fuerza: {result.contexto.fuerza}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
