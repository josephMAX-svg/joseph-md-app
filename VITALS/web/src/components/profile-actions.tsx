"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ShieldCheck } from "lucide-react";

export function ConsentButton({ consentimiento }: { consentimiento?: string | null }) {
  const router = useRouter();
  const [given, setGiven] = useState(!!consentimiento);
  const [busy, setBusy] = useState(false);

  async function give() {
    setBusy(true);
    try {
      await fetch("/api/action", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "profile.patch", payload: { consentimiento: new Date().toISOString() } }),
      });
      setGiven(true);
      router.refresh();
    } finally { setBusy(false); }
  }

  if (given) return (
    <div className="flex items-center gap-2 rounded-xl bg-sage-subtle px-3 py-2.5 text-sm text-sage-deep">
      <Check className="h-4 w-4" /> Consentimiento registrado (Ley 29733)
    </div>
  );

  return (
    <button onClick={give} disabled={busy} className="mv-btn-primary w-full">
      <ShieldCheck className="h-4 w-4" /> {busy ? "Registrando…" : "Dar consentimiento de datos de salud"}
    </button>
  );
}
