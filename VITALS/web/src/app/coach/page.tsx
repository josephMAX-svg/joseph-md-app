import { getCurrentUser, getUserId } from "@/lib/user";
import { mvGet } from "@/lib/api";
import { nombreCorto } from "@/lib/format";
import { CoachChat } from "@/components/coach-chat";

export const dynamic = "force-dynamic";

export default async function CoachPage() {
  const uid = getUserId();
  const [user, msgs] = await Promise.all([getCurrentUser(), mvGet(`/coach/${uid}/messages?limit=20`)]);

  const initial: any[] = [
    { role: "coach", text: `Hola ${nombreCorto(user.nombre)}, soy tu Pulso Coach. Pregúntame por técnica, comida o tu plan — te respondo con evidencia y, si es algo médico, te derivo al Dr.` },
  ];
  for (const m of msgs as any[]) {
    if (m.pregunta) initial.push({ role: "user", text: m.pregunta });
    if (m.respuesta_ia) initial.push({ role: "coach", text: m.respuesta_ia, citations: m.used_knowledge, escalated: !!m.escalado });
  }

  return (
    <div className="flex h-full flex-col lg:mx-auto lg:max-w-2xl">
      <div className="mb-2">
        <div className="mv-accent" />
        <h1 className="mt-2 font-serif text-2xl font-medium tracking-tight">Pulso Coach</h1>
        <p className="text-xs text-ink-muted">Hermano de Klotho · responde con cita, escala lo clínico</p>
      </div>
      <CoachChat initial={initial} />
    </div>
  );
}
