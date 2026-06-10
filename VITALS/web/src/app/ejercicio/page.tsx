import { Dumbbell, Trophy, Minus, ArrowUpRight, ArrowDownRight, GraduationCap } from "lucide-react";
import { getUserId } from "@/lib/user";
import { mvGet } from "@/lib/api";
import { num } from "@/lib/format";
import { PageHeader, Card, SectionTitle, EmptyState, Chip } from "@/components/ui";
import { Sparkline } from "@/components/charts";
import { ExerciseLogger } from "@/components/exercise-logger";
import { TecnicaCard, VideoEmbed } from "@/components/video";
import { findTutorial, REFERENTES, EVIDENCIA } from "@/lib/tutorials";

export const dynamic = "force-dynamic";

export default async function EjercicioPage() {
  const uid = getUserId();
  const [today, prog] = await Promise.all([
    mvGet(`/exercise/${uid}/today`),
    mvGet(`/exercise/${uid}/progression`),
  ]);
  const dia = today.dia;
  const primaryEx = dia?.tipo === "fuerza" ? dia?.ejercicios?.[0] : null;

  return (
    <div className="mv-enter">
      <PageHeader label="Entrenamiento" title={dia ? `Hoy: ${dia.nombre}` : "Día de descanso"}
        subtitle={dia ? `${dia.duracion_min} min · ${dia.tipo}` : "Recupera. Mañana volvemos."} />

      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
        {/* Columna izquierda: video destacado + registro */}
        <div className="space-y-4">
          {primaryEx && (
            <TecnicaCard
              nombre={primaryEx.nombre}
              detalle={`${primaryEx.series} × ${primaryEx.reps} · RIR ${primaryEx.rir ?? "—"}`}
              tutorial={findTutorial(primaryEx.nombre)}
            />
          )}

          {dia && dia.tipo === "fuerza" ? (
            <ExerciseLogger ejercicios={today.ejercicios_plan} dia={dia} />
          ) : dia ? (
            <>
              <TecnicaCard
                nombre={dia.nombre}
                detalle={`${dia.duracion_min} min`}
                tutorial={findTutorial(dia.nombre)}
                label="Sesión de hoy"
              />
              <Card>
                <p className="mv-label mb-2">Después de la sesión</p>
                <p className="text-sm text-ink-secondary">Registra tu actividad con una foto desde Capturar — cuenta para tu score de hoy.</p>
              </Card>
            </>
          ) : (
            <>
              <EmptyState icon={<Dumbbell className="h-6 w-6" />} title="Hoy descansas" hint="El descanso es parte del plan. Aprovecha para una caminata suave (zona 2)." />
              <TecnicaCard nombre={EVIDENCIA[0].titulo} tutorial={{ yt: EVIDENCIA[0].yt, creator: EVIDENCIA[0].creator, q: "Antelm Pujol ejercicio salud" }} label="Píldora de evidencia" />
            </>
          )}
        </div>

        {/* Columna derecha: progresión */}
        <div className="mt-6 lg:mt-0">
          <SectionTitle hint="tendencia de volumen">¿Estoy progresando?</SectionTitle>
          {prog.ejercicios?.length === 0 ? (
            <EmptyState title="Aún sin historial" hint="Registra tus series y verás tu progresión aquí." />
          ) : (
            <div className="space-y-3 mv-stagger">
              {prog.ejercicios.slice(0, 8).map((e: any) => (
                <Card key={e.ejercicio} className="mv-lift">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{e.ejercicio}</p>
                      <p className="text-xs text-ink-muted">{e.sesiones} sesiones · mejor e1RM {num(e.mejor_e1rm, 1)} kg</p>
                    </div>
                    <TrendChip t={e.tendencia} pr={e.es_pr_reciente} />
                  </div>
                  <div className="mt-2"><Sparkline values={e.puntos.map((p: any) => p.volumen)} height={40} /></div>
                </Card>
              ))}
            </div>
          )}

          {/* Referentes basados en evidencia (suscripciones reales) */}
          <SectionTitle>Referentes (base científica)</SectionTitle>
          <Card>
            <ul className="space-y-2.5">
              {REFERENTES.map((r) => (
                <li key={r.nombre} className="flex items-start gap-2">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brass-subtle text-brass-deep"><GraduationCap className="h-3.5 w-3.5" /></span>
                  <div>
                    <a href={r.canal} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-ink hover:text-brass">{r.nombre} ↗</a>
                    <p className="text-xs text-ink-muted">{r.credencial} · {r.tema}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-ink-muted">Videos de técnica de los canales a los que ya estás suscrito, curados por base en evidencia. Cada video verificado como embebible.</p>
          </Card>

          <SectionTitle>Evidencia de la semana</SectionTitle>
          <Card>
            <VideoEmbed tutorial={{ yt: EVIDENCIA[1].yt, creator: EVIDENCIA[1].creator, q: "Antelm Pujol fuerza evidencia" }} title={EVIDENCIA[1].titulo} />
            <p className="mt-2 text-xs text-ink-secondary">{EVIDENCIA[1].titulo}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TrendChip({ t, pr }: { t: string; pr: boolean }) {
  if (pr) return <Chip tone="brass"><Trophy className="h-3.5 w-3.5" /> PR</Chip>;
  if (t === "subiendo") return <Chip tone="success"><ArrowUpRight className="h-3.5 w-3.5" /> subiendo</Chip>;
  if (t === "bajando") return <Chip tone="danger"><ArrowDownRight className="h-3.5 w-3.5" /> bajando</Chip>;
  return <Chip><Minus className="h-3.5 w-3.5" /> estable</Chip>;
}
