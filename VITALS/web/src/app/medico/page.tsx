import Image from "next/image";
import { AlertTriangle, Stethoscope, FileText, CheckCircle2 } from "lucide-react";
import { getUserId } from "@/lib/user";
import { mvGet, mediaUrl } from "@/lib/api";
import { fechaCorta } from "@/lib/format";
import { PageHeader, Card, SectionTitle, Chip, EmptyState } from "@/components/ui";

export const dynamic = "force-dynamic";

const SEV_TONE: any = { urgente: "danger", revisar: "warn", info: "neutral" };

export default async function MedicoPage() {
  const uid = getUserId();
  const [tasks, report] = await Promise.all([
    mvGet(`/coach/tasks?estado=abierta`),
    mvGet(`/report/guarantee/${uid}`),
  ]);
  const ev = report.evidencia;
  const g = report.elegibilidad;

  return (
    <div className="mv-enter lg:mx-auto lg:max-w-3xl">
      <PageHeader label="Humano en el bucle" title="Bandeja médica" subtitle="Escalamientos, banderas rojas y evidencia de garantía" />

      {/* Bandeja */}
      <SectionTitle hint={`${tasks.length} abiertas`}>Cola del médico</SectionTitle>
      {tasks.length === 0 ? (
        <EmptyState icon={<CheckCircle2 className="h-6 w-6" />} title="Sin pendientes" hint="No hay banderas rojas ni escalamientos abiertos." />
      ) : (
        <div className="space-y-2">
          {tasks.map((t: any) => (
            <Card key={t.id}>
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${t.severidad === "urgente" ? "bg-danger-subtle text-danger" : "bg-warn-subtle text-warn"}`}>
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Chip tone={SEV_TONE[t.severidad]}>{t.severidad}</Chip>
                    <span className="text-xs text-ink-muted">{t.nombre} · {fechaCorta(t.created_at)}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium">{t.titulo}</p>
                  <p className="mt-0.5 whitespace-pre-line text-xs text-ink-secondary">{t.detalle}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Reporte de evidencia de garantía */}
      <SectionTitle>Reporte de evidencia · {report.usuario?.nombre}</SectionTitle>
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="mv-label">Adherencia del programa ({report.periodo_dias} d)</p>
            <p className="mt-1 font-serif text-3xl font-medium tabular-nums">{report.adherencia_pct}%</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            {g.elegible_devolucion_total && <Chip tone="sage">Elegible total</Chip>}
            {g.elegible_devolucion_parcial && <Chip tone="brass">Elegible parcial</Chip>}
            {!g.elegible_devolucion_total && !g.elegible_devolucion_parcial && <Chip>No elegible aún</Chip>}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <Evid label="Comidas registradas" value={ev.comidas_registradas} />
          <Evid label="Comidas con foto" value={ev.comidas_con_foto} />
          <Evid label="Sesiones de fuerza" value={ev.sesiones_fuerza} />
          <Evid label="Actividades verificadas" value={ev.actividades_verificadas} />
          <Evid label="Mediciones de composición" value={ev.mediciones_composicion} />
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-warn-subtle p-3 text-[11px] text-warn">
          <Stethoscope className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {report.decision}
        </div>
      </Card>

      {/* Fotos de evidencia (timestamps) */}
      {ev.fotos?.length > 0 && (
        <>
          <SectionTitle hint="con timestamp de servidor"><span className="flex items-center gap-1"><FileText className="h-4 w-4" /> Evidencia fotográfica</span></SectionTitle>
          <div className="grid grid-cols-3 gap-2">
            {ev.fotos.slice(0, 9).map((f: any, i: number) => (
              <div key={i} className="overflow-hidden rounded-xl border border-line">
                <Image src={mediaUrl(f.foto_url)!} alt="" width={120} height={120} className="aspect-square w-full object-cover" unoptimized />
                <div className="bg-elevated px-1.5 py-1 text-[9px] text-ink-muted">{f.tipo} · {fechaCorta(f.fecha)}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Evid({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-subtle px-3 py-2">
      <span className="text-xs text-ink-secondary">{label}</span>
      <span className="font-serif text-base font-medium tabular-nums">{value}</span>
    </div>
  );
}
