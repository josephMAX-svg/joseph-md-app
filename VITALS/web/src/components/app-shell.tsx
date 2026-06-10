"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home, Utensils, Dumbbell, MessageCircle, Camera, Menu, X, Activity,
  ShieldCheck, ClipboardList, Scale, User, Stethoscope, ChevronDown, Check, Gem,
} from "lucide-react";
import { cn, nombreCorto } from "@/lib/format";
import { PulseMark } from "./pulse-mark";

const NAV = [
  { href: "/", label: "Hoy", icon: Home },
  { href: "/capturar", label: "Capturar", icon: Camera },
  { href: "/comida", label: "Comida", icon: Utensils },
  { href: "/ejercicio", label: "Ejercicio", icon: Dumbbell },
  { href: "/composicion", label: "Composición", icon: Scale },
  { href: "/adherencia", label: "Adherencia", icon: ShieldCheck },
  { href: "/valor", label: "Tu valor", icon: Gem },
  { href: "/plan", label: "Plan", icon: ClipboardList },
  { href: "/coach", label: "Coach", icon: MessageCircle },
  { href: "/medico", label: "Médico", icon: Stethoscope },
  { href: "/perfil", label: "Perfil", icon: User },
];

// Tabs móviles (5, con cámara central como FAB).
const TABS = [
  { href: "/", label: "Hoy", icon: Home },
  { href: "/comida", label: "Comida", icon: Utensils },
  { href: "/capturar", label: "Capturar", icon: Camera, fab: true },
  { href: "/ejercicio", label: "Ejercicio", icon: Dumbbell },
  { href: "/coach", label: "Coach", icon: MessageCircle },
];

export function AppShell({ user, users, health, children }: {
  user: { id: string; nombre: string; role: string };
  users: { id: string; nombre: string; role: string }[];
  health: { ok: boolean; ai?: string } | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  async function switchUser(id: string) {
    await fetch("/api/user/switch", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: id }) });
    setMenuOpen(false); setUserOpen(false);
    router.refresh();
  }

  const initials = nombreCorto(user.nombre).slice(0, 1).toUpperCase();
  const aiReal = health?.ai === "claude" || health?.ai === "gemini";
  const AiChip = (
    <span className={cn("mv-chip", aiReal ? "bg-sage-subtle text-sage-deep" : "bg-brass-subtle text-brass-deep")}>
      {health ? (health.ai === "claude" ? "IA Claude" : health.ai === "gemini" ? "IA Gemini" : "Modo demo") : "Sin servicio"}
    </span>
  );

  return (
    <div className="min-h-screen bg-bg lg:flex">
      {/* ───────── Sidebar (desktop) ───────── */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-bg-elevated lg:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brass text-ink-inverse"><PulseMark size={20} /></span>
          <div>
            <div className="font-serif text-lg font-medium leading-none tracking-tight">VITALS</div>
            <div className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-ink-muted">Pulso</div>
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
          {NAV.map((n) => {
            const active = pathname === n.href;
            const Icon = n.icon;
            return (
              <Link key={n.href} href={n.href}
                className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                  active ? "bg-sage text-ink-inverse shadow-sm" : "text-ink-secondary hover:bg-subtle")}>
                <Icon className="h-[18px] w-[18px]" /> {n.label}
              </Link>
            );
          })}
        </nav>
        {/* Usuario + IA */}
        <div className="border-t border-line p-3">
          <div className="mb-2 flex justify-center">{AiChip}</div>
          <button onClick={() => setUserOpen(!userOpen)} className="flex w-full items-center gap-2 rounded-xl border border-line bg-raised p-2.5 text-left">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage font-serif text-ink-inverse">{initials}</span>
            <div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{user.nombre}</div><div className="text-[11px] capitalize text-ink-muted">{user.role}</div></div>
            <ChevronDown className={cn("h-4 w-4 text-ink-muted transition", userOpen && "rotate-180")} />
          </button>
          {userOpen && (
            <div className="mt-1 space-y-0.5 mv-enter">
              {users.map((u) => (
                <button key={u.id} onClick={() => switchUser(u.id)}
                  className={cn("flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm", u.id === user.id ? "bg-sage-subtle text-sage-deep" : "hover:bg-subtle")}>
                  {u.id === user.id ? <Check className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5 opacity-60" />} {u.nombre}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* ───────── Columna principal ───────── */}
      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        {/* Header móvil */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line-subtle bg-bg/85 px-4 py-3 backdrop-blur lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brass text-ink-inverse"><PulseMark size={18} /></span>
            <span className="font-serif text-lg font-medium tracking-tight">VITALS</span>
          </Link>
          <div className="flex items-center gap-2">
            {AiChip}
            <button onClick={() => setMenuOpen(true)} aria-label="Menú" className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-elevated"><Menu className="h-5 w-5" /></button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-md flex-1 px-4 pb-28 pt-4 lg:max-w-5xl lg:px-8 lg:pb-12 lg:pt-8">{children}</main>
      </div>

      {/* ───────── Bottom nav (móvil) ───────── */}
      <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-line bg-bg-elevated/95 backdrop-blur lg:hidden">
        <div className="flex items-end justify-around px-2 py-1.5">
          {TABS.map((t) => {
            const active = pathname === t.href;
            const Icon = t.icon;
            if (t.fab) return (
              <Link key={t.href} href={t.href} aria-label={t.label}
                className="-mt-6 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-brass text-ink-inverse shadow-lg transition active:scale-95">
                <Icon className="h-7 w-7" />
              </Link>
            );
            return (
              <Link key={t.href} href={t.href}
                className={cn("flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1 text-[11px] transition", active ? "text-sage-deep" : "text-ink-muted")}>
                <Icon className={cn("h-5 w-5", active && "stroke-[2.4]")} /> {t.label}
              </Link>
            );
          })}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>

      {/* ───────── Drawer (móvil) ───────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-ink/40" />
          <div className="absolute right-0 top-0 flex h-full w-[82%] max-w-xs flex-col bg-bg-elevated p-5 shadow-lg mv-enter" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="mv-label">Menú</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Cerrar" className="flex h-9 w-9 items-center justify-center rounded-full border border-line"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-line bg-raised p-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage font-serif text-lg text-ink-inverse">{initials}</span>
              <div className="min-w-0"><div className="truncate font-medium">{user.nombre}</div><div className="text-xs capitalize text-ink-muted">{user.role}</div></div>
            </div>
            <p className="mt-3 mv-label">Cambiar de usuario</p>
            <div className="mt-2 space-y-1">
              {users.map((u) => (
                <button key={u.id} onClick={() => switchUser(u.id)}
                  className={cn("flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm", u.id === user.id ? "bg-sage-subtle text-sage-deep" : "hover:bg-subtle")}>
                  <User className="h-4 w-4" /> {u.nombre}
                </button>
              ))}
            </div>
            <p className="mt-5 mv-label">Secciones</p>
            <nav className="mt-2 flex-1 space-y-0.5 overflow-y-auto">
              {NAV.filter((n) => !["/", "/comida", "/ejercicio"].includes(n.href)).map((m) => {
                const Icon = m.icon;
                return (
                  <Link key={m.href} href={m.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-subtle">
                    <Icon className="h-4 w-4 text-sage-deep" /> {m.label}
                  </Link>
                );
              })}
            </nav>
            <Link href="/perfil" onClick={() => setMenuOpen(false)} className="mt-3 rounded-xl bg-subtle p-3 text-[11px] leading-relaxed text-ink-muted">
              Herramienta de seguimiento bajo supervisión del médico colegiado. No reemplaza la atención clínica.
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
