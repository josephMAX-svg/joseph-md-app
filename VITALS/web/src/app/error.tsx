"use client";

import { RefreshCw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mv-enter flex flex-col items-center gap-3 py-16 text-center">
      <div className="mv-accent" />
      <h2 className="font-serif text-xl font-medium">Algo no cargó</h2>
      <p className="max-w-xs text-sm text-ink-muted">
        Puede que la capa de inteligencia esté reiniciándose. Verifica que el servicio FastAPI (puerto 8000) esté corriendo.
      </p>
      <button onClick={reset} className="mv-btn-primary mt-2">
        <RefreshCw className="h-4 w-4" /> Reintentar
      </button>
      <p className="mt-1 text-[11px] text-ink-muted">{error?.message}</p>
    </div>
  );
}
