/**
 * Stack de valor (Hormozi · $100M Offers) — los módulos que el paciente YA recibe, con su valor
 * declarado. Hacer el valor VISIBLE (>> precio) es la palanca anti-churn. Coherente con los bonos de
 * `LIVIANO_Oferta_Maestra.docx`. Editable por el médico en una iteración futura (config por tenant).
 */
export interface ValorItem {
  nombre: string;
  desc: string;
  valor: number; // S/
  icon: string; // lucide icon name
  ruta?: string;
}

export const VALOR_STACK: ValorItem[] = [
  { nombre: "Plan adaptativo con IA", desc: "Se reestructura con tus datos y pisos de seguridad", valor: 600, icon: "ClipboardList", ruta: "/plan" },
  { nombre: "Cocina: macros peruanos", desc: "Análisis por foto + base de alimentos andinos", valor: 500, icon: "Utensils", ruta: "/comida" },
  { nombre: "Rutinas con video", desc: "Técnica de referentes con base científica", valor: 400, icon: "Dumbbell", ruta: "/ejercicio" },
  { nombre: "Espejo de composición", desc: "Bioimpedancia leída sin tipear (Renpho/InBody)", valor: 400, icon: "Scale", ruta: "/composicion" },
  { nombre: "Defensa muscular", desc: "Proteína + fuerza para no perder músculo", valor: 450, icon: "ShieldPlus", ruta: "/plan" },
  { nombre: "Coach IA con evidencia", desc: "Responde con cita y escala lo clínico al médico", valor: 500, icon: "Sparkles", ruta: "/coach" },
  { nombre: "Acompañamiento médico", desc: "Humano en el bucle: el médico aprueba y revisa", valor: 700, icon: "Stethoscope", ruta: "/medico" },
  { nombre: "Garantía por adherencia", desc: "Cumples tu parte → recuperas tu inversión", valor: 500, icon: "ShieldCheck", ruta: "/adherencia" },
];

export const VALOR_TOTAL = VALOR_STACK.reduce((s, i) => s + i.valor, 0);

/** Ancla Hormozi: el comparador de mayor valor (cirugía bariátrica) para enmarcar el precio. */
export const ANCLA = {
  titulo: "Cirugía bariátrica",
  rango: "S/ 15,000 – 45,000",
  nota: "Invasiva, irreversible, con hospitalización. Tu programa: transformación médica real, sin bisturí, reversible, por una fracción.",
};

/** Las 4 fases de ascensión (Gym Launch) — el motor de retención. */
export const FASES = [
  { key: "front_load", nombre: "Arranque (front-loading)", semanas: "1–4", desc: "Resultado temprano visible que engancha." },
  { key: "sostenible", nombre: "Sostenible", semanas: "5–12", desc: "El hábito se vuelve tuyo, a ritmo mantenible." },
  { key: "mantenimiento", nombre: "Mantenimiento (anti-rebote)", semanas: "12+", desc: "Blindamos lo logrado. Aquí se evita el rebote." },
];
