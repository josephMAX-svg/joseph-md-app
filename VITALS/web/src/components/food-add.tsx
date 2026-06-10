"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/format";

/** Alta manual de comida buscando en la base de alimentos peruanos (reuso tabla `foods`). */
export function FoodAdd() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [sel, setSel] = useState<any>(null);
  const [gramos, setGramos] = useState("150");
  const [mealType, setMealType] = useState("almuerzo");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function search(value: string) {
    setQ(value); setSel(null);
    if (value.length < 2) { setResults([]); return; }
    const res = await fetch(`/api/food-search?q=${encodeURIComponent(value)}`);
    setResults(await res.json());
  }

  async function add() {
    if (!sel) return;
    setBusy(true);
    try {
      await fetch("/api/action", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "food.log", payload: { food_id: sel.id, cantidad_g: Number(gramos), meal_type: mealType, plan_match: sel.es_peruano ? "cumple" : "parcial" } }),
      });
      setDone(true); setSel(null); setQ(""); setResults([]);
      router.refresh();
      setTimeout(() => setDone(false), 2000);
    } finally { setBusy(false); }
  }

  return (
    <div className="rounded-2xl border border-line bg-elevated p-4">
      <div className="flex items-center gap-2 rounded-xl border border-line bg-raised px-3">
        <Search className="h-4 w-4 text-ink-muted" />
        <input value={q} onChange={(e) => search(e.target.value)} placeholder="Buscar alimento (pollo, quinua…)"
          className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none" />
        {done && <Check className="h-4 w-4 text-sage" />}
      </div>
      {results.length > 0 && !sel && (
        <ul className="mt-2 max-h-52 space-y-1 overflow-y-auto">
          {results.map((f) => (
            <li key={f.id}>
              <button onClick={() => setSel(f)} className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm hover:bg-subtle">
                <span>{f.nombre}{f.es_peruano ? " 🇵🇪" : ""}</span>
                <span className="tabular-nums text-xs text-ink-muted">{f.kcal} kcal · {f.proteina_g}g P /100g</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {sel && (
        <div className="mt-3 space-y-2">
          <p className="text-sm font-medium">{sel.nombre}</p>
          <div className="flex items-center gap-2">
            <input type="number" value={gramos} onChange={(e) => setGramos(e.target.value)} className="w-20 rounded-lg border border-line bg-raised px-2 py-2 text-center text-sm tabular-nums" />
            <span className="text-xs text-ink-muted">g</span>
            <select value={mealType} onChange={(e) => setMealType(e.target.value)} className="flex-1 rounded-lg border border-line bg-raised px-2 py-2 text-sm capitalize">
              {["desayuno", "almuerzo", "cena", "snack"].map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <p className="text-xs text-ink-muted tabular-nums">
            ≈ {Math.round(sel.kcal * Number(gramos) / 100)} kcal · {Math.round(sel.proteina_g * Number(gramos) / 100)}g proteína
          </p>
          <button onClick={add} disabled={busy} className="mv-btn-primary w-full">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Agregar
          </button>
        </div>
      )}
    </div>
  );
}
