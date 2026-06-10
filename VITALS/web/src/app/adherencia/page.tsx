import Link from "next/link";
import { ShieldCheck, FileText, Info } from "lucide-react";
import { getUserId } from "@/lib/user";
import { mvGet } from "@/lib/api";
import { fechaCorta } from "@/lib/format";
import { PageHeader, Card, SectionTitle, Chip } from "@/components/ui";
import { Ring, Sparkline, PillarBars } from "@/components/charts";

export const dynamic = "force-dynamic";

export default async function AdherenciaPage() {
  const uid = getUserId();
  const dash = await mvGet(`/adherence/${uid}/dashboard`);
  const prog = dash.programa;
  const g = prog.garantia;

  return (
    <div className="mv-enter">
      <PageHeader label="Proceso, no resultado" title="Adherencia y garantía" subtitle="Medimos lo que SÍ depende de ti." />

      {/* Resumen de ventanas */}
      <Card className="grid grid-cols-4 gap-2 lg:gap-6">
        <RingCol value={dash.hoy?.score ?? 0} label="Hoy" />
        <RingCol value={dash.semana?.score ?? 0} label="7 días" />
        <RingCol value={dash.mes?.score ?? 0} label="30 días" />
        <RingCol value={prog?.score ?? 0} label="Programa" />
      </Card>

      <div className="mt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Garantía */}
        <div>
          <SectionTitle>Garantía por adherencia</SectionTitle>
          <Card className={g.elegible_devolucion_total ? "border-sage/40 bg-sage-subtle/50" : g.elegible_devolucion_parcial ? "border-brass/40 bg-brass-subtle/50" : ""}>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-ink-inverse"><ShieldCheck className="h-7 w-7" /></span>
              <div className="flex-1">
                <div className="flex flex-wrap gap-1.5">
                  <Chip tone={g.elegible_devolucion_total ? "sage" : "neutral"}>≥95% · total {g.elegible_devolucion_total ? "✓" : ""}</Chip>
                  <Chip tone={g.elegible_devolucion_parcial ? "brass" : "neutral"}>≥90% · parcial {g.elegible_devolucion_parcial ? "✓" : ""}</Chip>
                </div>
                <p className="mt-2 text-sm text-ink-secondary">{prog.mensaje}</p>
              </div>
            </div>
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-bg-subtle p-3 text-[11px] text-ink-muted">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {g.nota}
            </div>
            <Link href="/medico" className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-line py-2.5 text-sm text-sage-deep">
              <FileText className="h-4 w-4" /> Ver reporte de evidencia
            </Link>
          </Card>
        </div>

        {/* Constancia + pilares */}
        <div className="mt-4 lg:mt-0">
          <SectionTitle hint="últimos 30 días">Tu constancia</SectionTitle>
          <Card>
            <Sparkline values={(dash.mes?.serie || []).map((s: any) => s.score)} height={64} goal={90} />
            <div className="mt-1 flex justify-between text-[10px] text-ink-muted">
              <span>{fechaCorta((dash.mes?.serie || [])[0]?.fecha || "")}</span><span>línea = meta 90%</span><span>hoy</span>
            </div>
          </Card>
          <SectionTitle>Por pilar (30 días)</SectionTitle>
          <Card><PillarBars pilares={dash.mes?.por_pilar || {}} /></Card>
        </div>
      </div>
    </div>
  );
}

function RingCol({ value, label }: { value: number; label: string }) {
  return <div className="flex flex-col items-center gap-1"><Ring value={value} size={64} /><span className="text-[11px] text-ink-muted">{label}</span></div>;
}
