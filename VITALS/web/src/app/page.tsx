import Link from "next/link";
import { Flame, Camera, Mic, ChevronRight, Scale, Utensils, Dumbbell, TrendingDown, Snowflake, Trophy, Play, CalendarCheck } from "lucide-react";
import { getCurrentUser, getUserId } from "@/lib/user";
import { mvGet } from "@/lib/api";
import { fechaLarga, nombreCorto, todayISO, num } from "@/lib/format";
import { Card, Chip } from "@/components/ui";
import { Ring, Sparkline } from "@/components/charts";
import { QuickLog } from "@/components/quick-log";
import { Celebration } from "@/components/celebration";

export const dynamic = "force-dynamic";

export default async function HoyPage() {
  const uid = getUserId();
  const today = todayISO();
  const esLunes = new Date().getDay() === 1;
  const [user, dash, body, exToday, foodToday, plan, streak, weekly] = await Promise.all([
    getCurrentUser(),
    mvGet(`/adherence/${uid}/dashboard`),
    mvGet(`/body/${uid}`),
    mvGet(`/exercise/${uid}/today`),
    mvGet(`/food/${uid}?fecha=${today}`),
    mvGet(`/plan/${uid}`),
    mvGet(`/exercise/${uid}/streak`).catch(() => null),
    esLunes ? mvGet(`/report/weekly/${uid}`).catch(() => null) : Promise.resolve(null),
  ]);

  const firstName = nombreCorto(user.nombre);
  const hoy = dash.hoy;
  const pesos = (body.series?.peso || []).map((p: any) => p.valor);
  const pesoActual = body.latest?.peso;
  const meta = user.profile?.peso_meta;
  const comidasHoy = foodToday.logs?.length || 0;
  const totHoy = (foodToday.por_dia || [])[0];
  const metaKcal = plan.plan?.nutricion?.kcal;
  const metaProt = plan.plan?.nutricion?.proteina_g;

  const dia = exToday.dia;
  const ejerciciosPlan: any[] = exToday.ejercicios_plan || [];
  const pendientes = ejerciciosPlan.filter((e: any) => !e.hecho);
  const entrenoCompleto = dia && dia.tipo === "fuerza" && ejerciciosPlan.length > 0 && pendientes.length === 0;

  return (
    <div className="mv-enter">
      <Celebration semanas={streak?.semanas ?? 0} />
      <header className="flex items-start justify-between">
        <div>
          <p className="mv-label text-brass">{user.role === "joseph" ? "Tu laboratorio" : "Tu programa"}</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight lg:text-4xl">Hola, {firstName}</h1>
          <p className="mt-0.5 text-sm capitalize text-ink-muted">{fechaLarga()}</p>
        </div>
      </header>

      <div className="mt-5 lg:grid lg:grid-cols-12 lg:gap-6">
        {/* ── Columna izquierda ── */}
        <div className="space-y-4 lg:col-span-5">
          {/* 1 · SCORE DE HOY (Whoop): un número que expira — mañana se recalcula desde cero. */}
          <div className="mv-gradient-navy mv-aurora relative overflow-hidden rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-5">
              <div className="mv-float rounded-full bg-white/5 p-1.5 backdrop-blur"><Ring value={hoy?.score ?? 0} label="HOY" size={116} /></div>
              <div className="flex-1">
                <p className="mv-label !text-ink-muted">Tu día, en un número</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-secondary">Expira a medianoche: mañana se recalcula desde cero. Cada registro de hoy lo sube.</p>
                {streak && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brass-subtle"><Flame className="h-4 w-4 text-brass" /></span>
                    <div>
                      <div className="font-serif text-base font-medium tabular-nums leading-none">{streak.semanas} semanas cumplidas</div>
                      <div className="mt-0.5 text-[11px] text-ink-muted">
                        esta semana {streak.semana_actual.sesiones}/{streak.semana_actual.meta} sesiones
                        {streak.freezes_usados > 0 && <span className="ml-1 inline-flex items-center gap-0.5"><Snowflake className="h-3 w-3" />{streak.freezes_usados} freeze</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2 · PLAN PRE-ARMADO (Fitbod): el entreno de hoy YA está listo — cero decisiones. */}
          {dia ? (
            <Card className="mv-reveal">
              <div className="flex items-baseline justify-between">
                <span className="mv-label">Tu entreno de hoy · listo</span>
                <span className="text-xs tabular-nums text-ink-muted">{dia.duracion_min} min</span>
              </div>
              <p className="mt-1.5 font-serif text-xl font-medium">{dia.nombre}</p>
              {exToday.ayer_pendiente && (
                <p className="mt-1 text-xs text-ink-muted">Ayer quedó pendiente — no pasa nada: hoy es el mejor siguiente paso, sin recuperar de más.</p>
              )}
              {dia.tipo === "fuerza" ? (
                <ul className="mt-3 space-y-1.5">
                  {ejerciciosPlan.map((e: any) => (
                    <li key={e.nombre} className="flex items-center justify-between text-sm">
                      <span className={e.hecho ? "text-ink-muted line-through" : "text-ink-secondary"}>{e.nombre}</span>
                      <span className="text-xs tabular-nums text-ink-muted">{e.series}×{e.reps}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-ink-secondary">Sesión continua de coreografías FitDance — dale play y no pares.</p>
              )}
              <Link href="/ejercicio" className="mv-btn-primary mt-4 w-full">
                {entrenoCompleto ? <>Sesión completa · ver progreso</> : <><Play className="h-4 w-4" fill="currentColor" /> {dia.tipo === "fuerza" ? "Empezar entrenamiento" : "Iniciar sesión de baile"}</>}
              </Link>
            </Card>
          ) : (
            <Card className="mv-reveal">
              <span className="mv-label">Hoy descansas</span>
              <p className="mt-1.5 text-sm text-ink-secondary">El descanso es parte del plan. Una caminata suave (zona 2) suma a tu score.</p>
              <Link href="/ejercicio" className="mv-btn-ghost mt-4 w-full">Ver píldora de evidencia</Link>
            </Card>
          )}

          {/* Logging sin fricción (MacroFactor): foto o voz, <5 s. */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/capturar" className="mv-pulse flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-brass py-6 text-ink-inverse shadow-md transition active:scale-[0.98]">
              <Camera className="h-8 w-8" /><span className="text-sm font-medium">Fotografiar</span><span className="text-[11px] opacity-80">comida · báscula</span>
            </Link>
            <Link href="/coach" className="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-sage py-6 text-ink-inverse shadow-md transition active:scale-[0.98]">
              <Mic className="h-8 w-8" /><span className="text-sm font-medium">Hablar</span><span className="text-[11px] opacity-80">con tu coach</span>
            </Link>
          </div>

          <QuickLog />
        </div>

        {/* ── Columna derecha ── */}
        <div className="mt-4 space-y-4 lg:col-span-7 lg:mt-0">
          {/* 5 · REPORTE DE LUNES (Whoop WPA): resumen 7d + 1 insight accionable. */}
          {weekly && (
            <Card className="mv-reveal mv-sheen border-brass/30">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><CalendarCheck className="h-4 w-4 text-brass" /><span className="mv-label">Reporte de lunes</span></span>
                <Chip tone={weekly.delta_score >= 0 ? "success" : "warn"}>{weekly.delta_score >= 0 ? "+" : ""}{num(weekly.delta_score, 1)} vs tu semana pasada</Chip>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <Ring value={weekly.score_7d} label="7 días" size={76} />
                <div className="flex-1 text-sm leading-relaxed text-ink-secondary">{weekly.insight}</div>
              </div>
              {weekly.prs?.length > 0 && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-brass"><Trophy className="h-3.5 w-3.5" /> PRs de la semana: {weekly.prs.slice(0, 3).join(", ")}</p>
              )}
              <Link href="/adherencia" className="mt-3 flex items-center justify-between text-sm text-brass">Ver semana completa <ChevronRight className="h-4 w-4" /></Link>
            </Card>
          )}

          <Card className="mv-reveal mv-sheen">
            <div className="flex items-baseline justify-between">
              <span className="mv-label">Hoy comiste</span>
              <span className="text-xs text-ink-muted">{comidasHoy} comidas</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <MacroRow label="Calorías" value={Math.round(totHoy?.kcal || 0)} meta={metaKcal} unit="kcal" />
              <MacroRow label="Proteína" value={Math.round(totHoy?.prot_g || 0)} meta={metaProt} unit="g" />
            </div>
            <Link href="/comida" className="mt-3 flex items-center justify-between text-sm text-brass">Ver detalle de comida <ChevronRight className="h-4 w-4" /></Link>
          </Card>

          {pesos.length >= 2 && (
            <Card className="mv-reveal">
              <div className="flex items-baseline justify-between">
                <span className="mv-label">Tendencia de peso</span>
                {meta && <span className="flex items-center gap-1 text-xs text-ink-muted"><TrendingDown className="h-3.5 w-3.5" /> meta {meta} kg</span>}
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-medium tabular-nums">{num(pesoActual, 1)}</span><span className="text-sm text-ink-muted">kg</span>
                {body.delta?.peso != null && <Chip tone={body.delta.peso <= 0 ? "success" : "warn"}>{body.delta.peso > 0 ? "+" : ""}{num(body.delta.peso, 1)} kg</Chip>}
              </div>
              <div className="mt-2"><Sparkline values={pesos} goal={meta} height={64} /></div>
            </Card>
          )}

          {pesos.length === 0 && (
            <Link href="/composicion">
              <Card className="mv-lift flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brass-subtle text-brass"><Scale className="h-6 w-6" /></span>
                <div className="flex-1"><p className="font-medium">Registra tu peso</p><p className="text-xs text-ink-muted">Empecemos a ver tu tendencia</p></div>
                <ChevronRight className="h-5 w-5 text-ink-muted" />
              </Card>
            </Link>
          )}

          <Link href="/adherencia">
            <Card className="mv-lift mv-sheen mv-reveal flex items-center gap-3">
              <Ring value={dash.programa?.score ?? 0} label="Programa" size={68} />
              <div className="flex-1">
                <p className="font-medium">Adherencia y garantía</p>
                <p className="text-xs text-ink-muted">{dash.programa?.mensaje?.slice(0, 80)}…</p>
                <div className="mt-1.5 flex gap-1.5">
                  {dash.programa?.garantia?.elegible_devolucion_total && <Chip tone="sage">Elegible total</Chip>}
                  {dash.programa?.garantia?.elegible_devolucion_parcial && <Chip tone="brass">Elegible parcial</Chip>}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-ink-muted" />
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MacroRow({ label, value, meta, unit }: { label: string; value: number; meta?: number; unit: string }) {
  const pct = meta ? Math.min(100, (value / meta) * 100) : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-ink-secondary">{label}</span>
        <span className="text-xs tabular-nums text-ink-muted">{value}{meta ? ` / ${meta}` : ""} {unit}</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-subtle">
        <div className="h-full rounded-full bg-brass transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
