import Link from "next/link";
import Image from "next/image";
import { Camera, Utensils } from "lucide-react";
import { getUserId } from "@/lib/user";
import { mvGet, mediaUrl } from "@/lib/api";
import { fechaCorta, todayISO } from "@/lib/format";
import { PageHeader, Card, SectionTitle, EmptyState, Chip } from "@/components/ui";
import { FoodAdd } from "@/components/food-add";

export const dynamic = "force-dynamic";

const MATCH_TONE: any = { cumple: "success", parcial: "warn", desviado: "danger" };

export default async function ComidaPage() {
  const uid = getUserId();
  const today = todayISO();
  const [todayLogs, hist, plan] = await Promise.all([
    mvGet(`/food/${uid}?fecha=${today}`),
    mvGet(`/food/${uid}`),
    mvGet(`/plan/${uid}`),
  ]);
  const tot = (todayLogs.por_dia || [])[0] || { kcal: 0, prot_g: 0, carb_g: 0, grasa_g: 0 };
  const n = plan.plan?.nutricion || {};

  return (
    <div className="mv-enter">
      <PageHeader label="Nutrición" title="Mi comida" subtitle="Fotografía tu plato; la IA mide por ti." />

      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Columna izquierda */}
        <div className="space-y-4">
          <Link href="/capturar" className="flex items-center gap-3 rounded-2xl bg-sage p-4 text-ink-inverse shadow-md transition active:scale-[0.98]">
            <Camera className="h-6 w-6" />
            <div className="flex-1"><p className="font-medium">Fotografiar mi comida</p><p className="text-xs opacity-80">alimentos, kcal y macros automáticos</p></div>
          </Link>

          <Card>
            <span className="mv-label">Hoy · objetivo {n.kcal ? `${n.kcal} kcal` : ""}</span>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center">
              {[["kcal", tot.kcal, n.kcal], ["Prot", tot.prot_g, n.proteina_g], ["Carbo", tot.carb_g, n.carbo_g], ["Grasa", tot.grasa_g, n.grasa_g]].map(([l, v, m]: any) => (
                <div key={l}>
                  <div className="font-serif text-lg font-medium tabular-nums">{Math.round(v)}</div>
                  <div className="text-[10px] uppercase tracking-wide text-ink-muted">{l}</div>
                  {m ? <div className="mt-1 h-1 overflow-hidden rounded-full bg-bg-subtle"><div className="h-full bg-sage transition-all duration-700" style={{ width: `${Math.min(100, v / m * 100)}%` }} /></div> : null}
                </div>
              ))}
            </div>
          </Card>

          <div><SectionTitle>Agregar manual</SectionTitle><FoodAdd /></div>
        </div>

        {/* Columna derecha */}
        <div className="mt-4 lg:mt-0">
          <SectionTitle hint={`${todayLogs.logs?.length || 0} hoy`}>Comidas de hoy</SectionTitle>
          {todayLogs.logs?.length === 0 ? (
            <EmptyState icon={<Utensils className="h-6 w-6" />} title="Aún no registras comida hoy" hint="Toma una foto de tu próximo plato." />
          ) : (
            <div className="space-y-2 mv-stagger">
              {todayLogs.logs.map((m: any) => (
                <Card key={m.id} className="mv-lift flex items-center gap-3">
                  {m.foto_url ? (
                    <Image src={mediaUrl(m.foto_url)!} alt="" width={56} height={56} className="h-14 w-14 rounded-xl object-cover" unoptimized />
                  ) : (
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-subtle text-ink-muted"><Utensils className="h-6 w-6" /></span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs capitalize text-ink-muted">{m.meal_type}</span>
                      {m.plan_match && <Chip tone={MATCH_TONE[m.plan_match]}>{m.plan_match}</Chip>}
                    </div>
                    <p className="truncate text-sm">{m.descripcion || "Comida"}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-base font-medium tabular-nums">{Math.round(m.kcal || 0)}</div>
                    <div className="text-[10px] text-ink-muted">kcal · {Math.round(m.prot_g || 0)}g P</div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <SectionTitle>Días anteriores</SectionTitle>
          <div className="space-y-2">
            {(hist.por_dia || []).filter((d: any) => d.fecha !== today).slice(0, 7).map((d: any) => (
              <div key={d.fecha} className="flex items-center justify-between rounded-xl border border-line bg-elevated px-4 py-3">
                <span className="text-sm">{fechaCorta(d.fecha)}</span>
                <span className="text-xs tabular-nums text-ink-muted">{Math.round(d.kcal)} kcal · {Math.round(d.prot_g)}g P · {d.comidas} comidas</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
