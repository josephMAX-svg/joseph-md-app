"use client";

import { useEffect, useRef, useState } from "react";
import { cn, scoreColor } from "@/lib/format";

/** ¿El elemento está a la vista? (dispara animaciones al hacer scroll). */
export function useInView<T extends Element>(ref: React.RefObject<T>): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return seen;
}

/** Cuenta animada (de 0 al valor) — arranca cuando `start` es true. Respeta reduced-motion. */
export function useCountUp(target: number, start = true, ms = 1000): number {
  const [v, setV] = useState(0);
  const raf = useRef<number>();
  useEffect(() => {
    if (!start) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setV(target); return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 4); // quart-out: arranque rápido, final suave
      setV(target * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, ms, start]);
  return v;
}

/** Anillo de adherencia (SVG, animado al entrar a la vista). */
export function Ring({ value, label, size = 88, sub }: { value: number; label?: string; size?: number; sub?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, value));
  const animated = useCountUp(pct, inView);
  const dash = (animated / 100) * c;
  const color = scoreColor(pct);
  return (
    <div ref={ref} className="relative flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--mv-ring-track)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-serif text-xl font-semibold tabular-nums tnum" style={{ color }}>{Math.round(animated)}</span>
        {label && <span className="text-[10px] uppercase tracking-wider text-ink-muted">{label}</span>}
        {sub && <span className="text-[10px] text-ink-muted">{sub}</span>}
      </div>
    </div>
  );
}

/** Sparkline / línea de tendencia (SVG, sin librerías). */
export function Sparkline({ values, height = 48, color = "var(--mv-sage)", fill = true, goal }: {
  values: (number | null | undefined)[]; height?: number; color?: string; fill?: boolean; goal?: number | null;
}) {
  const pts = values.map((v) => (typeof v === "number" ? v : null));
  const real = pts.filter((v): v is number => v != null);
  if (real.length < 2) return <div className="text-xs text-ink-muted">Datos insuficientes para la tendencia.</div>;
  const min = Math.min(...real, ...(goal ? [goal] : []));
  const max = Math.max(...real, ...(goal ? [goal] : []));
  const range = max - min || 1;
  const W = 100, H = height;
  const step = W / (pts.length - 1);
  const xy = pts.map((v, i) => (v == null ? null : [i * step, H - ((v - min) / range) * (H - 8) - 4] as [number, number]));
  const path = xy.filter(Boolean).map((p, i) => `${i === 0 ? "M" : "L"}${p![0].toFixed(1)},${p![1].toFixed(1)}`).join(" ");
  const area = `${path} L${W},${H} L0,${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
      {goal != null && (
        <line x1="0" x2={W} y1={H - ((goal - min) / range) * (H - 8) - 4} y2={H - ((goal - min) / range) * (H - 8) - 4}
          stroke="var(--mv-brass)" strokeWidth="0.6" strokeDasharray="2 2" />
      )}
      {fill && <path d={area} fill={color} opacity={0.10} />}
      <path d={path} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" pathLength={1} className="mv-draw" />
      {xy.filter(Boolean).slice(-1).map((p, i) => <circle key={i} cx={p![0]} cy={p![1]} r="1.8" fill={color} />)}
    </svg>
  );
}

/** Barras de progreso por pilar. */
export function PillarBars({ pilares }: { pilares: Record<string, { completion_avg?: number; completion?: number; label: string }> }) {
  return (
    <div className="space-y-2.5">
      {Object.entries(pilares).map(([k, p]) => {
        const v = Math.round((p.completion_avg ?? p.completion ?? 0) * 100);
        return (
          <div key={k}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-ink-secondary">{p.label}</span>
              <span className="tabular-nums tnum text-ink-muted">{v}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-bg-subtle">
              <div className="h-full rounded-full" style={{ width: `${v}%`, background: scoreColor(v) }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
