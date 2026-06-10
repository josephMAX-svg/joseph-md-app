import { Stethoscope, Target, Ruler, Activity } from "lucide-react";
import { getCurrentUser } from "@/lib/user";
import { mvGet } from "@/lib/api";
import { num } from "@/lib/format";
import { PageHeader, Card, SectionTitle } from "@/components/ui";
import { ConsentButton } from "@/components/profile-actions";

export const dynamic = "force-dynamic";

const OBJETIVOS: Record<string, string> = {
  recomposicion: "Recomposición (perder grasa + ganar músculo)",
  perder_grasa: "Perder grasa",
  ganar_musculo: "Ganar músculo",
  salud: "Salud y longevidad",
};

export default async function PerfilPage() {
  const user = await getCurrentUser();
  const p = user.profile || {};
  const base = p.baseline || {};
  const health = await mvGet("/config").catch(() => null);

  return (
    <div className="mv-enter lg:mx-auto lg:max-w-2xl">
      <PageHeader label="Mi perfil" title={user.nombre} subtitle={user.role} />

      <Card>
        <div className="grid grid-cols-2 gap-4">
          <Field icon={Target} label="Objetivo" value={OBJETIVOS[p.objetivo] || p.objetivo || "—"} />
          <Field icon={Ruler} label="Altura" value={p.altura_cm ? `${p.altura_cm} cm` : "—"} />
          <Field icon={Activity} label="Peso inicial" value={p.peso_inicial ? `${num(p.peso_inicial, 1)} kg` : "—"} />
          <Field icon={Target} label="Peso meta" value={p.peso_meta ? `${num(p.peso_meta, 1)} kg` : "—"} />
        </div>
        {p.bajo_glp1 ? <p className="mt-3 rounded-lg bg-warn-subtle px-3 py-2 text-xs text-warn">Bajo medicación GLP-1 — el plan prioriza proteína y vigila náuseas.</p> : null}
      </Card>

      {Object.keys(base).length > 0 && (
        <>
          <SectionTitle>Baseline (InBody)</SectionTitle>
          <Card>
            <div className="grid grid-cols-3 gap-2 text-center">
              {Object.entries(base).map(([k, v]) => (
                <div key={k} className="rounded-xl bg-subtle p-2">
                  <div className="font-serif text-base font-medium tabular-nums">{String(v)}</div>
                  <div className="text-[10px] uppercase tracking-wide text-ink-muted">{k.replace(/_/g, " ")}</div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      <SectionTitle>Consentimiento y privacidad</SectionTitle>
      <Card>
        <ConsentButton consentimiento={p.consentimiento} />
        <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
          Tus datos de salud se tratan según la <b>Ley 29733</b> (Perú): consentimiento explícito, cifrado en reposo y
          tránsito, derecho a borrado, y fotos privadas con URLs firmadas y expirables (en producción). Tú eres dueño de tu información.
        </p>
      </Card>

      <SectionTitle>Aviso médico</SectionTitle>
      <Card className="flex gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy"><Stethoscope className="h-5 w-5" /></span>
        <p className="text-sm leading-relaxed text-ink-secondary">
          Herramienta de seguimiento bajo supervisión del <b>médico colegiado</b> (Dr. Joseph, Director Científico).
          No reemplaza la atención clínica. Toda decisión clínica y la devolución de dinero la toma un humano.
        </p>
      </Card>

      <p className="mt-6 text-center text-[11px] text-ink-muted">
        Pulso Movimiento · IA {health?.ai_enabled ? "Claude activa" : "en modo demo (stubs)"} · multi-usuario desde el día 1
      </p>
    </div>
  );
}

function Field({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div>
      <p className="flex items-center gap-1 mv-label"><Icon className="h-3.5 w-3.5" /> {label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
