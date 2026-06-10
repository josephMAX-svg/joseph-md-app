import { ShieldCheck, AlertTriangle, Flame, Beef, Wheat, Droplet, CheckCircle2, Clock } from "lucide-react";
import { getUserId } from "@/lib/user";
import { mvGet } from "@/lib/api";
import { DIAS } from "@/lib/format";
import { PageHeader, Card, SectionTitle, Chip, EmptyState } from "@/components/ui";
import { RestructureButton } from "@/components/plan-actions";
import { VideoButton } from "@/components/video";
import { findTutorial } from "@/lib/tutorials";

export const dynamic = "force-dynamic";

export default async function PlanPage() {
  const uid = getUserId();
  const data = await mvGet(`/plan/${uid}`);
  const plan = data.plan;
  if (!plan) return <div className="mv-enter"><PageHeader title="Plan" /><EmptyState title="Aún no tienes un plan" hint="Genera tu primer plan desde el botón inferior." /><div className="mt-4"><RestructureButton /></div></div>;

  const n = plan.nutricion || {};
  const e = plan.entrenamiento || {};
  const seg = plan.seguridad || {};

  return (
    <div className="mv-enter">
      <PageHeader label="Plan adaptativo" title="Tu plan" subtitle={`v${data.version} · ${plan.fase === "front_load" ? "fase inicial (front-loading)" : "fase sostenible"}`} />

      <div className="mb-4 flex flex-wrap gap-1.5">
        <Chip tone={data.aprobado_por_medico ? "success" : "warn"}>{data.aprobado_por_medico ? "Aprobado por el médico" : "Propuesto por IA — pendiente"}</Chip>
        <Chip tone={seg.ok ? "sage" : "danger"}><ShieldCheck className="h-3.5 w-3.5" /> {seg.ok ? "Pisos de seguridad OK" : "Revisar seguridad"}</Chip>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Nutrición */}
        <div>
          <SectionTitle>Nutrición del día</SectionTitle>
          <Card>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[[Flame, "kcal", n.kcal], [Beef, "Prot", `${n.proteina_g}g`], [Wheat, "Carbo", `${n.carbo_g}g`], [Droplet, "Grasa", `${n.grasa_g}g`]].map(([Icon, l, v]: any) => (
                <div key={l} className="rounded-xl bg-subtle py-2.5">
                  <Icon className="mx-auto h-4 w-4 text-sage-deep" />
                  <div className="mt-1 font-serif text-base font-medium tabular-nums">{v}</div>
                  <div className="text-[10px] uppercase tracking-wide text-ink-muted">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1.5 text-sm text-ink-secondary">
              <p>· {n.proteina_g_kg} g/kg de proteína en {n.tomas_proteina?.length || 4} tomas {n.tomas_proteina ? `(${n.tomas_proteina.join("/")} g)` : ""}</p>
              <p className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Ventana de alimentación de {n.ventana_horas} h</p>
              <p>· Base: {(n.alimentos_base || []).join(", ")}</p>
            </div>
            {n.tdee && <p className="mt-2 text-[11px] text-ink-muted">TDEE estimado: {n.tdee.tdee} kcal ({n.tdee.metodo}, confianza {n.tdee.confianza}) · déficit {n.deficit_pct}%</p>}
          </Card>

          {plan.front_loading && (
            <Card className="mt-3 border-brass/30 bg-brass-subtle/40">
              <p className="text-sm font-medium text-brass-deep">Front-loading (semanas {plan.front_loading.semanas})</p>
              <p className="mt-1 text-sm text-ink-secondary">{plan.front_loading.que_cambia}</p>
              <p className="mt-1 text-xs text-ink-muted">{plan.front_loading.luego}</p>
            </Card>
          )}

          <SectionTitle>Pisos de seguridad</SectionTitle>
          <Card>
            {seg.ok ? (
              <div className="flex items-center gap-2 text-sm text-success"><CheckCircle2 className="h-5 w-5" /> Tu plan respeta los límites seguros (calorías, proteína, velocidad).</div>
            ) : (
              <div className="space-y-1">{(seg.violaciones || []).map((v: string, i: number) => (<p key={i} className="flex items-center gap-2 text-sm text-danger"><AlertTriangle className="h-4 w-4 shrink-0" /> {v}</p>))}</div>
            )}
            {(seg.advertencias || []).map((a: string, i: number) => <p key={i} className="mt-1 text-xs text-warn">⚠ {a}</p>)}
            <p className="mt-2 text-[11px] text-ink-muted">La IA propone; el médico aprueba. Nunca recomendamos déficits peligrosos ni ayunos extremos.</p>
          </Card>
        </div>

        {/* Entrenamiento */}
        <div className="mt-4 lg:mt-0">
          <SectionTitle hint={e.rir_objetivo ? `RIR ${e.rir_objetivo}` : ""}>Split semanal</SectionTitle>
          <div className="space-y-2 mv-stagger">
            {(e.split || []).map((d: any) => (
              <Card key={d.dia} className="mv-lift">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage-subtle text-xs font-semibold text-sage-deep">{DIAS[(d.dia + 1) % 7]}</span>
                    <span className="font-medium">{d.nombre}</span>
                  </div>
                  <span className="text-xs text-ink-muted">{d.duracion_min}′ · {d.tipo}</span>
                </div>
                {d.ejercicios?.length > 0 && d.tipo === "fuerza" && (
                  <ul className="mt-2 space-y-1.5">
                    {d.ejercicios.map((ej: any, i: number) => (
                      <li key={i} className="flex items-center justify-between gap-2 text-xs text-ink-secondary">
                        <span className="truncate">{ej.nombre}</span>
                        <span className="flex shrink-0 items-center gap-2">
                          <span className="tabular-nums text-ink-muted">{ej.series}×{ej.reps}</span>
                          <VideoButton tutorial={findTutorial(ej.nombre)} title={ej.nombre} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>

          <SectionTitle>Reestructurar</SectionTitle>
          <p className="mb-3 text-sm text-ink-muted">La IA recalcula tu plan según tu peso, ingesta, adherencia y progreso de fuerza — con pisos de seguridad.</p>
          <RestructureButton />

          {data.historial?.length > 1 && (
            <>
              <SectionTitle>Historial de versiones</SectionTitle>
              <div className="space-y-1.5">
                {data.historial.map((h: any) => (
                  <div key={h.version} className="rounded-xl border border-line bg-elevated px-4 py-2.5 text-sm">
                    <div className="flex justify-between"><span className="font-medium">v{h.version}</span><span className="text-xs text-ink-muted">{h.fecha}</span></div>
                    {h.motivo && <p className="mt-0.5 text-xs text-ink-secondary">{h.motivo}</p>}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
