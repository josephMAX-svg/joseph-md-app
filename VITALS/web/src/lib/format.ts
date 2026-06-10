import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fechaLarga(d = new Date()): string {
  return d.toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" });
}

export function fechaCorta(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? "T12:00:00" : ""));
  return d.toLocaleDateString("es-PE", { day: "2-digit", month: "short" });
}

export function nombreCorto(nombre: string): string {
  return (nombre || "").split(" ")[0].replace(/[()]/g, "");
}

export function num(v: number | null | undefined, dec = 0): string {
  if (v == null || Number.isNaN(v)) return "—";
  return v.toLocaleString("es-PE", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export function scoreColor(score: number): string {
  if (score >= 95) return "var(--mv-sage)";
  if (score >= 90) return "var(--mv-brass)";
  if (score >= 70) return "var(--mv-warn)";
  return "var(--mv-danger)";
}

export const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

/** Fecha local YYYY-MM-DD (coherente con el `date.today()` del servicio en el mismo equipo). */
export function todayISO(): string {
  return new Date().toLocaleDateString("en-CA");
}

/** Racha de días consecutivos (desde hoy hacia atrás) con score ≥ umbral. */
export function streakFrom(serie: { fecha: string; score: number }[], umbral = 50): number {
  let n = 0;
  for (let i = serie.length - 1; i >= 0; i--) {
    if (serie[i].score >= umbral) n++;
    else break;
  }
  return n;
}
