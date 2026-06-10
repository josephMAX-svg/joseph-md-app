import Link from "next/link";
import {
  ClipboardList, Utensils, Dumbbell, Scale, ShieldPlus, Sparkles, Stethoscope, ShieldCheck,
  TrendingUp, Target, Clock, Camera, ChevronRight, ArrowUp, ArrowDown, Check,
} from "lucide-react";
import { getCurrentUser, getUserId } from "@/lib/user";
import { mvGet } from "@/lib/api";
import { nombreCorto, num } from "@/lib/format";
import { PageHeader, Card, SectionTitle, Chip } from "@/components/ui";
import { VALOR_STACK, VALOR_TOTAL, ANCLA, FASES } from "@/lib/valor";

export const dynamic = "force-dynamic";

const ICONS: Record<string, any> = { ClipboardList, Utensils, Dumbbell, Scale, ShieldPlus, Sparkles, Stethoscope, ShieldCheck };

export default async function ValorPage() {
  const uid = getUserId();
  const [user, dash, plan] = await Promise.all([
    getCurrentUser(), mvGet(`/adherence/${uid}/dashboard`), mvGet(`/plan/${uid}`),
  ]);
  const prog = dash.programa;
  const adh = Math.round(prog?.score ?? 0);
  const fase = plan.plan?.fase || "front_load";
  const objetivo = (plan.plan?.objetivo || "salud").replace(/_/g, " ");
  const faseIdx = fase === "front_load" ? 0 : fase === "sostenible" ? 1 : 2;

  const levers = [
    { dir: "up", icon: Target, label: "Tu meta (resultado soñado)", value: `${objetivo}`, hint: user.profile?.peso_meta ? `meta ${user.profile.peso_meta} kg` : "transformación medida" },
    { dir: "up", icon: TrendingUp, label: "Probabilidad de lograrlo", value: `${adh}% adherencia`, hint: "garantía + evidencia + médico" },
    { dir: "down", icon: Clock, label: "Tiempo hasta ver resultados", value: faseIdx === 0 ? "resultado temprano" : "constante", hint: "front-loading: ves avances ya" },
    { dir: "down", icon: Camera, label: "Esfuerzo del día a día", value: "foto + voz", hint: "registras en segundos, sin formularios" },
  ];

  return (
    <div className="mv-enter">
      <PageHeader label="Por qué quedarte" title="Tu valor" subtitle="Lo que recibes supera lo que pagas — y por qué te va a funcionar." />

      {/* Hero: valor total */}
      <div className="mv-gradient-gold mv-aurora relative overflow-hidden rounded-2xl p-6 text-ink shadow-md">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-deep">Estás recibiendo</p>
        <p className="mt-1 font-serif text-4xl font-semibold tabular-nums">S/ {num(VALOR_TOTAL)}</p>
        <p className="mt-1 max-w-md text-sm text-ink-secondary">en valor real (plan, cocina, rutinas, composición, coach, médico y garantía). El precio es una fracción de eso.</p>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Ecuación de valor con TUS datos */}
        <div>
          <SectionTitle hint="Hormozi · $100M Offers">Por qué te va a funcionar</SectionTitle>
          <Card className="mv-reveal">
            <div className="space-y-2.5">
              {levers.map((l) => (
                <div key={l.label} className="flex items-center gap-3 rounded-xl bg-subtle/60 p-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${l.dir === "up" ? "bg-sage-subtle text-sage-deep" : "bg-brass-subtle text-brass-deep"}`}>
                    <l.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{l.value}</p>
                    <p className="text-xs text-ink-muted">{l.label}</p>
                  </div>
                  {l.dir === "up" ? <ArrowUp className="h-4 w-4 text-sage-deep" /> : <ArrowDown className="h-4 w-4 text-brass-deep" />}
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-ink-muted">Sube tu meta y la probabilidad de lograrla; baja el tiempo y el esfuerzo. Así se construye un programa que SÍ funciona.</p>
          </Card>

          {/* Ancla */}
          <SectionTitle>El comparador honesto</SectionTitle>
          <Card className="mv-reveal border-brass/30">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger-subtle text-danger"><Scale className="h-5 w-5" /></span>
              <div>
                <p className="font-medium">{ANCLA.titulo} · <span className="tabular-nums text-ink-muted">{ANCLA.rango}</span></p>
                <p className="mt-1 text-sm text-ink-secondary">{ANCLA.nota}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Stack de valor */}
        <div className="mt-4 lg:mt-0">
          <SectionTitle hint={`total S/ ${num(VALOR_TOTAL)}`}>Lo que ya estás recibiendo</SectionTitle>
          <div className="space-y-2 mv-stagger">
            {VALOR_STACK.map((it) => {
              const Icon = ICONS[it.icon] || Sparkles;
              const inner = (
                <Card className="mv-lift mv-sheen flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-subtle text-sage-deep"><Icon className="h-5 w-5" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{it.nombre}</p>
                    <p className="truncate text-xs text-ink-muted">{it.desc}</p>
                  </div>
                  <span className="shrink-0 font-serif text-sm font-medium tabular-nums text-brass-deep">S/ {num(it.valor)}</span>
                </Card>
              );
              return it.ruta ? <Link key={it.nombre} href={it.ruta}>{inner}</Link> : <div key={it.nombre}>{inner}</div>;
            })}
          </div>

          {/* Garantía */}
          <Link href="/adherencia">
            <Card className="mv-reveal mv-lift mt-3 flex items-center gap-3 border-sage/30 bg-sage-subtle/40">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage text-ink-inverse"><ShieldCheck className="h-6 w-6" /></span>
              <div className="flex-1">
                <p className="font-medium">Garantía por adherencia</p>
                <p className="text-xs text-ink-muted">Cumples tu parte (≥90/95%), recuperas tu inversión. Premiamos el proceso.</p>
              </div>
              <ChevronRight className="h-5 w-5 text-ink-muted" />
            </Card>
          </Link>
        </div>
      </div>

      {/* Ascensión / fases (retención) */}
      <SectionTitle hint="Gym Launch · ascensión">Tu camino (y por qué no termina al llegar)</SectionTitle>
      <div className="grid gap-3 mv-stagger sm:grid-cols-3">
        {FASES.map((f, i) => (
          <Card key={f.key} className={`mv-reveal ${i === faseIdx ? "border-sage/40 bg-sage-subtle/40" : ""}`}>
            <div className="flex items-center justify-between">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage text-xs font-semibold text-ink-inverse">{i + 1}</span>
              {i === faseIdx ? <Chip tone="sage"><Check className="h-3 w-3" /> aquí estás</Chip> : <span className="text-[11px] text-ink-muted">sem {f.semanas}</span>}
            </div>
            <p className="mt-2 font-serif text-base font-medium">{f.nombre}</p>
            <p className="mt-0.5 text-xs text-ink-muted">{f.desc}</p>
          </Card>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] text-ink-muted">Llegar a la meta no es el final: es cuando blindamos lo logrado (anti-rebote). El médico hace la revisión y pasamos a mantenerte.</p>
    </div>
  );
}
