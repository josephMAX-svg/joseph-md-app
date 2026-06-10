/** MOTOR · generador de plan adaptativo + pisos de seguridad (puerto de domain/plan.py). */
import { objetivoCalorico, estimarTdee, PISO_KCAL_HOMBRE, PISO_KCAL_MUJER, PROTEINA_PISO, VEL_MAX_PCT_SEM } from "./domain";

export const SPLIT_JOSEPH = [
  { dia: 0, nombre: "Torso empuje", duracion_min: 30, tipo: "fuerza", ejercicios: [
    { nombre: "Press de pecho con mancuernas", grupo: "pecho", series: 3, reps: "8-12", rir: 2 },
    { nombre: "Press militar", grupo: "hombro", series: 3, reps: "8-12", rir: 2 },
    { nombre: "Aperturas en polea", grupo: "pecho", series: 2, reps: "12-15", rir: 1 },
    { nombre: "Extensión de tríceps en polea", grupo: "triceps", series: 3, reps: "10-15", rir: 1 }] },
  { dia: 1, nombre: "Pierna posterior", duracion_min: 60, tipo: "fuerza", ejercicios: [
    { nombre: "Peso muerto rumano", grupo: "femoral", series: 4, reps: "8-10", rir: 2 },
    { nombre: "Curl femoral tumbado", grupo: "femoral", series: 3, reps: "10-12", rir: 1 },
    { nombre: "Hip thrust", grupo: "gluteo", series: 4, reps: "8-12", rir: 2 },
    { nombre: "Elevación de talones (gemelo)", grupo: "gemelo", series: 4, reps: "12-15", rir: 1 }] },
  { dia: 2, nombre: "Baile (cardio)", duracion_min: 45, tipo: "cardio", ejercicios: [{ nombre: "Baile / zona 2", grupo: "cardio", series: 1, reps: "45 min", rir: null }] },
  { dia: 3, nombre: "Torso jalón", duracion_min: 30, tipo: "fuerza", ejercicios: [
    { nombre: "Jalón al pecho", grupo: "espalda", series: 4, reps: "8-12", rir: 2 },
    { nombre: "Remo con mancuerna", grupo: "espalda", series: 3, reps: "8-12", rir: 2 },
    { nombre: "Face pull", grupo: "hombro_post", series: 3, reps: "12-15", rir: 1 },
    { nombre: "Curl de bíceps", grupo: "biceps", series: 3, reps: "10-15", rir: 1 }] },
  { dia: 4, nombre: "Pierna anterior", duracion_min: 60, tipo: "fuerza", ejercicios: [
    { nombre: "Sentadilla", grupo: "cuadriceps", series: 4, reps: "6-10", rir: 2 },
    { nombre: "Prensa de pierna", grupo: "cuadriceps", series: 3, reps: "10-12", rir: 1 },
    { nombre: "Extensión de cuádriceps", grupo: "cuadriceps", series: 3, reps: "12-15", rir: 1 },
    { nombre: "Zancadas", grupo: "gluteo", series: 3, reps: "10-12", rir: 1 }] },
];
const ALIMENTOS_BASE = ["pollo", "pescado", "huevos", "arroz", "papa", "ensalada lechuga-zanahoria"];

function edad(profile: any): number {
  const fn = profile.fecha_nac; if (!fn) return 35;
  const y = parseInt(String(fn).slice(0, 4)); return isNaN(y) ? 35 : Math.max(15, new Date().getFullYear() - y);
}
function volumenPorGrupo(split: any[]): Record<string, number> {
  const vol: Record<string, number> = {};
  for (const d of split) if (d.tipo === "fuerza") for (const e of d.ejercicios) vol[e.grupo || "otro"] = (vol[e.grupo || "otro"] || 0) + (e.series || 0);
  return vol;
}

export function safetyValidate(plan: any, profile: any): any {
  const violaciones: string[] = [], advertencias: string[] = [];
  const peso = profile.peso_inicial || 70, sexo = (profile.sexo || "m").toLowerCase();
  const nutri = plan.nutricion || {}, kcal = nutri.kcal || 0, prot = nutri.proteina_g || 0;
  const tmb = (profile.baseline || {}).tmb || (profile.baseline || {}).metabolismo_basal;
  const piso = sexo.startsWith("m") ? PISO_KCAL_HOMBRE : PISO_KCAL_MUJER;
  if (kcal < piso) violaciones.push(`Calorías (${kcal}) por debajo del piso seguro (${piso}).`);
  if (tmb && kcal < tmb * 0.8) violaciones.push(`Calorías (${kcal}) por debajo del 80% de la TMB (${Math.round(tmb * 0.8)}).`);
  if ((prot / peso) < PROTEINA_PISO - 0.05) violaciones.push(`Proteína (${(prot / peso).toFixed(1)} g/kg) por debajo del piso (1.6 g/kg).`);
  if ((nutri.ventana_horas || 12) < 8) advertencias.push("Ventana de alimentación muy estrecha (<8 h): evita ayunos extremos sin indicación médica.");
  return { ok: violaciones.length === 0, violaciones, advertencias, escalar: violaciones.length > 0 };
}

export function generarPlan(profile: any, tdee: any, fase = "sostenible"): any {
  const peso = profile.peso_inicial || 70, objetivo = profile.objetivo || "recomposicion", sexo = profile.sexo || "m";
  const front = fase === "front_load";
  const nutri = objetivoCalorico(tdee.tdee, objetivo, { sexo, pesoKg: peso, frontload: front });
  const plan: any = {
    objetivo, fase, generado_at: new Date().toLocaleDateString("en-CA"),
    nutricion: { ...nutri, comidas_objetivo: 4, ventana_horas: 12, alimentos_base: ALIMENTOS_BASE, tdee,
      notas: ["Prioriza proteína en cada comida (Phillips: 30-40 g por toma).", "Comida real andina; reduce ultraprocesados (Pollan).", "Hidratación ~3 L en días de gym."] },
    entrenamiento: { split: SPLIT_JOSEPH, dias_fuerza: SPLIT_JOSEPH.filter((d) => d.tipo === "fuerza").map((d) => d.dia),
      dias_cardio: SPLIT_JOSEPH.filter((d) => d.tipo === "cardio").map((d) => d.dia), volumen_objetivo: volumenPorGrupo(SPLIT_JOSEPH),
      rango_volumen_semanal: "10-20 series por grupo (Schoenfeld/Israetel)", rir_objetivo: "1-3",
      progresion: "Sube carga o reps cuando alcances el tope de RIR con buena técnica." },
  };
  if (front) plan.front_loading = { semanas: "1-3", que_cambia: "Déficit en el extremo alto seguro (~20%) + más caminata zona 2 para un resultado temprano visible.", luego: "Semana 4+: déficit sostenible (~15%) y foco en preservar masa magra." };
  plan.seguridad = safetyValidate(plan, profile);
  return plan;
}

export function reestructurarPlan(profile: any, current: any, opts: { cambioKgSem: number | null; adherencia: number | null; tdee: any; liftTend?: string }): any {
  const peso = profile.peso_inicial || 70, objetivo = profile.objetivo || "recomposicion";
  const motivos: string[] = [], advertencias: string[] = []; let escalar = false;
  const nuevo = generarPlan(profile, opts.tdee, current.fase || "sostenible");
  const pctSem = opts.cambioKgSem && peso ? Math.abs(opts.cambioKgSem) / peso * 100 : null;
  if (opts.cambioKgSem != null && opts.cambioKgSem < 0 && pctSem && pctSem > VEL_MAX_PCT_SEM) {
    nuevo.nutricion.kcal = Math.min(opts.tdee.tdee, Math.round(nuevo.nutricion.kcal + 0.1 * opts.tdee.tdee));
    motivos.push(`Pérdida de ${pctSem.toFixed(1)} %/sem (>1 %): subimos calorías para proteger tu músculo.`);
    advertencias.push("Pérdida demasiado rápida — derivado al médico para revisión."); escalar = true;
  } else if (objetivo === "perder_grasa" && opts.cambioKgSem != null && opts.cambioKgSem > -0.1 * peso / 100 && (opts.adherencia || 0) >= 85) {
    nuevo.nutricion.kcal -= Math.round(0.08 * opts.tdee.tdee);
    motivos.push("Buena adherencia pero progreso lento: ajustamos calorías a la baja según tu gasto real.");
  }
  if ((opts.adherencia ?? 100) < 70) motivos.push("Tu adherencia está baja: este ciclo priorizamos constancia (una acción a la vez) antes que apretar el plan.");
  if (opts.liftTend === "bajando") {
    motivos.push("Tu fuerza viene bajando: programamos una semana de descarga (deload) y luego retomamos volumen.");
    for (const d of nuevo.entrenamiento.split) for (const e of d.ejercicios || []) if (typeof e.series === "number") e.series = Math.max(1, e.series - 1);
    nuevo.entrenamiento.deload = true;
  } else if (opts.liftTend === "subiendo") motivos.push("Tu fuerza progresa: mantenemos la sobrecarga progresiva.");
  if (!motivos.length) motivos.push("Ajuste de mantenimiento según tu gasto energético estimado.");
  const seg = safetyValidate(nuevo, profile); nuevo.seguridad = seg;
  if (!seg.ok) { escalar = true; advertencias.push(...seg.violaciones); }
  return { plan: nuevo, motivo: motivos.join(" "), advertencias, escalar };
}

export { edad };
