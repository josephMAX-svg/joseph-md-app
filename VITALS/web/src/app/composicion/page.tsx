import Link from "next/link";
import { Camera, Scale } from "lucide-react";
import { getUserId } from "@/lib/user";
import { mvGet } from "@/lib/api";
import { fechaCorta, num } from "@/lib/format";
import { PageHeader, Card, SectionTitle, EmptyState, Chip } from "@/components/ui";
import { Sparkline } from "@/components/charts";

export const dynamic = "force-dynamic";

const METRICAS: { key: string; label: string; unit: string; better: "down" | "up" | "neutral" }[] = [
  { key: "peso", label: "Peso", unit: "kg", better: "down" },
  { key: "grasa_pct", label: "% Grasa corporal", unit: "%", better: "down" },
  { key: "musculo_esqueletico_pct", label: "Músculo esquelético", unit: "%", better: "up" },
  { key: "masa_magra_kg", label: "Masa magra", unit: "kg", better: "up" },
  { key: "grasa_visceral", label: "Grasa visceral", unit: "", better: "down" },
  { key: "agua_pct", label: "Agua corporal", unit: "%", better: "neutral" },
  { key: "tmb", label: "Metabolismo basal", unit: "kcal", better: "up" },
  { key: "imc", label: "IMC", unit: "", better: "down" },
];

export default async function ComposicionPage() {
  const uid = getUserId();
  const body = await mvGet(`/body/${uid}`);
  const latest = body.latest || {};
  const delta = body.delta || {};
  const has = body.history?.length > 0;

  return (
    <div className="mv-enter">
      <PageHeader label="Bioimpedancia" title="Composición corporal" subtitle="Sube tu Renpho/InBody; se grafica solo." />

      <Link href="/capturar" className="mb-4 flex items-center gap-3 rounded-2xl bg-brass p-4 text-ink-inverse shadow-md active:scale-[0.98]">
        <Camera className="h-6 w-6" />
        <div className="flex-1"><p className="font-medium">Subir captura de báscula</p><p className="text-xs opacity-80">extrae todas tus métricas sin tipear</p></div>
      </Link>

      {!has ? (
        <EmptyState icon={<Scale className="h-6 w-6" />} title="Aún sin mediciones" hint="Sube una captura de tu báscula de bioimpedancia para empezar tu línea de tiempo." />
      ) : (
        <div className="space-y-4">
          <div className="grid gap-3 mv-stagger lg:grid-cols-2">
          {METRICAS.filter((m) => latest[m.key] != null).map((m) => {
            const serie = (body.series?.[m.key] || []).map((p: any) => p.valor);
            const d = delta[m.key];
            const bueno = d == null ? null : m.better === "neutral" ? null : (m.better === "down" ? d <= 0 : d >= 0);
            return (
              <Card key={m.key}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mv-label">{m.label}</p>
                    <p className="mt-1 font-serif text-2xl font-medium tabular-nums">{num(latest[m.key], m.unit === "%" || m.unit === "kg" ? 1 : 0)}<span className="ml-1 text-sm font-normal text-ink-muted">{m.unit}</span></p>
                  </div>
                  {d != null && d !== 0 && (
                    <Chip tone={bueno === null ? "neutral" : bueno ? "success" : "warn"}>{d > 0 ? "+" : ""}{num(d, 1)} {m.unit}</Chip>
                  )}
                </div>
                {serie.length >= 2 && <div className="mt-2"><Sparkline values={serie} height={40} color={m.better === "up" ? "var(--mv-sage)" : "var(--mv-brass)"} /></div>}
              </Card>
            );
          })}
          </div>

          <SectionTitle>Historial</SectionTitle>
          <div className="space-y-2">
            {body.history.slice().reverse().slice(0, 8).map((h: any, i: number) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-line bg-elevated px-4 py-3">
                <span className="text-sm">{fechaCorta(h.fecha)}</span>
                <span className="text-xs tabular-nums text-ink-muted">{num(h.metrics?.peso, 1)} kg · {num(h.metrics?.grasa_pct, 1)}% grasa · {h.fuente}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
