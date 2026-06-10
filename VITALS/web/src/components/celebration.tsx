"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

/**
 * Celebración de hitos de racha SEMANAL (Peloton: la unidad es la semana cumplida).
 * Toast sobrio UNA VEZ por hito — persiste en localStorage. El confeti vive SOLO en el
 * banner de PR (exercise-logger): ahí es su momento. Respeta reduced-motion.
 */
export function Celebration({ semanas }: { semanas: number }) {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hitos = [4, 8, 12, 26, 52];
    if (!hitos.includes(semanas)) return;
    const key = `mv-cel-sem-${semanas}`;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
    setMsg(`¡${semanas} semanas cumplidas! La constancia imperfecta gana ✨`);
    setShow(true);
    const t = setTimeout(() => setShow(false), 4200);
    return () => clearTimeout(t);
  }, [semanas]);

  if (!show) return null;
  return (
    <div className="mv-toast fixed bottom-28 left-1/2 z-[90] flex items-center gap-2 rounded-full bg-raised px-5 py-3 text-sm font-medium text-ink shadow-lg lg:bottom-10">
      <Trophy className="h-5 w-5 text-brass" /> {msg}
    </div>
  );
}
