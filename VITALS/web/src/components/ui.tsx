"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/format";

/**
 * Scroll-reveal gestionado por React: el estado `mv-in` lo pone el propio componente
 * (IntersectionObserver + setState) en vez de un script externo que mute el DOM —
 * mutar clases/atributos por fuera durante la hidratación dispara warnings de mismatch.
 * Solo actúa si el className incluye `mv-reveal`; respeta prefers-reduced-motion.
 */
function useReveal<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setSeen(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect(); } },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [enabled]);
  return { ref, seen };
}

export function PageHeader({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) {
  return (
    <header className="mb-5">
      <div className="mv-accent" />
      {label && <p className="mt-3 mv-label">{label}</p>}
      <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm capitalize text-ink-muted">{subtitle}</p>}
    </header>
  );
}

export function Card({ className, children, raised }: { className?: string; children: React.ReactNode; raised?: boolean }) {
  const revealing = !!className?.includes("mv-reveal");
  const { ref, seen } = useReveal<HTMLDivElement>(revealing);
  return <div ref={ref} className={cn(raised ? "mv-card-raised" : "mv-card", className, revealing && seen && "mv-in")}>{children}</div>;
}

export function SectionTitle({ children, hint }: { children: React.ReactNode; hint?: string }) {
  const { ref, seen } = useReveal<HTMLDivElement>(true);
  return (
    <div ref={ref} className={cn("mv-reveal mb-2 mt-6 flex items-baseline justify-between", seen && "mv-in")}>
      <h2 className="font-serif text-lg font-medium tracking-tight">{children}</h2>
      {hint && <span className="text-xs text-ink-muted">{hint}</span>}
    </div>
  );
}

export function Stat({ label, value, unit, hint, tone }: { label: string; value: React.ReactNode; unit?: string; hint?: string; tone?: "up" | "down" | "neutral" }) {
  return (
    <div>
      <p className="mv-label">{label}</p>
      <p className="mt-1.5 font-serif text-2xl font-medium tabular-nums tnum">
        {value}{unit && <span className="ml-0.5 text-sm font-normal text-ink-muted">{unit}</span>}
      </p>
      {hint && <p className={cn("mt-0.5 text-xs", tone === "up" ? "text-success" : tone === "down" ? "text-danger" : "text-ink-muted")}>{hint}</p>}
    </div>
  );
}

export function Progress({ value, color = "var(--mv-brass)", track = "var(--mv-bg-subtle)" }: { value: number; color?: string; track?: string }) {
  return (
    <div className="h-2 overflow-hidden rounded-full" style={{ background: track }}>
      <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }} />
    </div>
  );
}

export function Chip({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "sage" | "brass" | "warn" | "danger" | "success" }) {
  const map = {
    neutral: "bg-subtle text-ink-secondary",
    sage: "bg-sage-subtle text-sage-deep",
    brass: "bg-brass-subtle text-brass-deep",
    warn: "bg-warn-subtle text-warn",
    danger: "bg-danger-subtle text-danger",
    success: "bg-success-subtle text-success",
  };
  return <span className={cn("mv-chip", map[tone])}>{children}</span>;
}

export function EmptyState({ icon, title, hint }: { icon?: React.ReactNode; title: string; hint?: string }) {
  return (
    <Card className="text-center">
      {icon && <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-subtle text-sage-deep">{icon}</div>}
      <p className="font-serif text-base font-medium">{title}</p>
      {hint && <p className="mx-auto mt-1 max-w-xs text-sm text-ink-muted">{hint}</p>}
    </Card>
  );
}
