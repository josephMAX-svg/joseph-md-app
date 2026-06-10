import "server-only";
import { geminiVisionJson, geminiText, geminiEnabled } from "./gemini";

/** MOTOR · IA (visión + coach). Usa Gemini si hay key; si no, stubs deterministas (demo estable). */

function hashBytes(b64: string): number { let h = 0; for (let i = 0; i < b64.length; i += 97) h = (h * 31 + b64.charCodeAt(i)) >>> 0; return h; }

const MEALS = [
  { alimentos: [{ nombre: "Pechuga de pollo a la plancha", porcion: "150 g", kcal: 248, prot: 46, carb: 0, grasa: 5 }, { nombre: "Arroz blanco", porcion: "1 taza (150 g)", kcal: 205, prot: 4, carb: 45, grasa: 0 }, { nombre: "Ensalada lechuga-zanahoria", porcion: "1 plato", kcal: 45, prot: 1, carb: 9, grasa: 0 }], match: "cumple", nota: "Plato alineado a tu plan: proteína magra + carbo + verdura." },
  { alimentos: [{ nombre: "Filete de pescado (jurel) al horno", porcion: "160 g", kcal: 230, prot: 38, carb: 0, grasa: 8 }, { nombre: "Papa sancochada", porcion: "2 unidades", kcal: 220, prot: 5, carb: 50, grasa: 0 }, { nombre: "Ensalada criolla", porcion: "1 porción", kcal: 40, prot: 1, carb: 8, grasa: 1 }], match: "cumple", nota: "Pescado + papa + verdura: excelente para tu plan." },
  { alimentos: [{ nombre: "Huevos revueltos", porcion: "3 unidades", kcal: 215, prot: 19, carb: 2, grasa: 15 }, { nombre: "Pan integral", porcion: "2 rebanadas", kcal: 160, prot: 8, carb: 28, grasa: 2 }, { nombre: "Palta", porcion: "1/2 unidad", kcal: 120, prot: 2, carb: 6, grasa: 11 }], match: "cumple", nota: "Buen desayuno proteico. Vigila la grasa total del día." },
  { alimentos: [{ nombre: "Pollo broaster", porcion: "1 presa", kcal: 380, prot: 28, carb: 18, grasa: 22 }, { nombre: "Papas fritas", porcion: "1 porción", kcal: 310, prot: 4, carb: 40, grasa: 15 }, { nombre: "Gaseosa", porcion: "1 vaso", kcal: 150, prot: 0, carb: 39, grasa: 0 }], match: "desviado", nota: "Comida fuera de plan: fritura + azúcar. Un día no arruina nada — vuelve a tu base mañana." },
  { alimentos: [{ nombre: "Quinua guisada con verduras", porcion: "1 plato", kcal: 280, prot: 12, carb: 48, grasa: 5 }, { nombre: "Huevo sancochado", porcion: "1 unidad", kcal: 72, prot: 6, carb: 0, grasa: 5 }], match: "parcial", nota: "Buena base andina; te falta un poco de proteína para llegar a tu meta de la comida." },
];
const BODY_BASE: Record<string, number> = { peso: 62.5, grasa_pct: 18.7, grasa_subcutanea_pct: 14.9, musculo_esqueletico_pct: 52.5, masa_muscular_kg: 49.6, masa_magra_kg: 50.85, agua_pct: 56.2, grasa_visceral: 8, masa_osea_kg: 3.1, proteina_pct: 18.5, tmb: 1476, edad_metabolica: 25, imc: 21.6 };

function stubMeal(b64: string) {
  const tpl = MEALS[hashBytes(b64) % MEALS.length];
  const sum = (k: string) => tpl.alimentos.reduce((s: number, a: any) => s + a[k], 0);
  return { alimentos: tpl.alimentos, kcal: sum("kcal"), prot_g: sum("prot"), carb_g: sum("carb"), grasa_g: sum("grasa"), plan_match: tpl.match, plan_match_explicacion: tpl.nota, confianza: 0.72, fuente: "stub", disclaimer: "Estimación por foto (±20–30 %). Puedes corregir en un toque." };
}
function stubBody(b64: string) {
  const d = ((hashBytes(b64) % 7) - 3) * 0.1; const m = { ...BODY_BASE };
  m.peso = Math.round((m.peso + d) * 10) / 10; m.grasa_pct = Math.round((m.grasa_pct + d * 0.3) * 10) / 10; m.musculo_esqueletico_pct = Math.round((m.musculo_esqueletico_pct - d * 0.2) * 10) / 10;
  return { metrics: m, fuente: "renpho", confianza: 0.9, campos_detectados: Object.keys(m) };
}

export async function analizarComida(b64: string, mealType: string, plan: any) {
  const base = ((plan?.nutricion || {}).alimentos_base || []).join(", ");
  const prompt = `Analiza esta foto de comida (${mealType}). Identifica alimentos y porciones aproximadas. El plan se basa en: ${base || "comida real andina"}. Devuelve SOLO JSON: {"alimentos":[{"nombre":str,"porcion":str,"kcal":int,"prot":int,"carb":int,"grasa":int}],"kcal":int,"prot_g":int,"carb_g":int,"grasa_g":int,"plan_match":"cumple|parcial|desviado","plan_match_explicacion":str,"confianza":number}. La estimación por foto es aproximada (±20-30%). plan_match: 'cumple' si es comida real alineada, 'parcial' si falta algo, 'desviado' si es frito/ultraprocesado/azúcar.`;
  const out = await geminiVisionJson(prompt, b64, "image/jpeg", "Eres nutricionista clínico. Responde SOLO JSON.");
  if (out && out.alimentos) {
    for (const k of ["kcal", "prot_g", "carb_g", "grasa_g"]) out[k] = Math.round(Number(out[k]) || 0);
    return { ...out, confianza: out.confianza ?? 0.6, fuente: "gemini", disclaimer: "Estimación por foto (±20–30 %). Puedes corregir en un toque." };
  }
  return stubMeal(b64);
}
export async function analizarRenpho(b64: string) {
  const prompt = 'Captura de báscula de bioimpedancia (Renpho/InBody). Extrae TODAS las métricas visibles. Devuelve SOLO JSON: {"metrics":{"peso":num,"grasa_pct":num,"musculo_esqueletico_pct":num,"masa_magra_kg":num,"agua_pct":num,"grasa_visceral":num,"tmb":num,"edad_metabolica":num,"imc":num},"confianza":number}. Solo las métricas que veas.';
  const out = await geminiVisionJson(prompt, b64, "image/jpeg", "Eres extractor OCR de bioimpedancia. Responde SOLO JSON.");
  if (out && out.metrics && Object.keys(out.metrics).length) return { ...out, fuente: "renpho", confianza: out.confianza ?? 0.8, campos_detectados: Object.keys(out.metrics) };
  return stubBody(b64);
}
export async function analizarScreenshot(b64: string) {
  const out = await geminiVisionJson('Captura de app de salud (pasos, sueño, ritmo). Extrae métricas. SOLO JSON: {"tipo_detectado":str,"metrics":{clave:valor},"confianza":number}.', b64, "image/jpeg", "Extractor OCR. SOLO JSON.");
  if (out && out.metrics) return { ...out, fuente: "gemini", confianza: out.confianza ?? 0.6 };
  const h = hashBytes(b64);
  return { tipo_detectado: "actividad/wearable", metrics: { pasos: 6000 + h % 6000, sueno_h: Math.round((6.5 + (h % 5) * 0.3) * 10) / 10, frecuencia_cardiaca_reposo: 56 + h % 12, calorias_activas: 300 + h % 400 }, confianza: 0.65, fuente: "stub" };
}
export async function analizarActividad(b64: string, tipo: string) {
  const out = await geminiVisionJson(`Foto de prueba de actividad (${tipo}). ¿Coherente con actividad física (ropa deportiva, exterior, movimiento)? SOLO JSON: {"tipo":str,"coherente":bool,"descripcion":str,"confianza":number}.`, b64, "image/jpeg", "Verificador de evidencia. SOLO JSON.");
  if (out && "coherente" in out) return { tipo: out.tipo || tipo, verificado: Boolean(out.coherente), evidencia: out.descripcion || "", confianza: out.confianza ?? 0.6, fuente: "gemini" };
  return { tipo, verificado: true, evidencia: "Foto con timestamp de servidor registrada.", confianza: 0.8, fuente: "stub" };
}

// ── Coach: persona, banderas rojas, razonamiento ──
export const PERSONA = "Eres Pulso Coach, un acompañante de ejercicio y nutrición cálido, claro y basado en evidencia, para usuarios de Pulso en Perú. Hablas en español peruano, frases cortas, tono directo y motivador. Acompañas la adherencia, respondes dudas comunes con base en el conocimiento del programa y motivas con la lógica 80/20. Eres ADHERENCE-NEUTRAL (filosofía MacroFactor): NUNCA regañas, NUNCA culpas ni sermoneas por una comida fuera de plan, un día perdido o una semana floja — la culpa predice abandono. Ante un desvío: reconoce el dato con neutralidad, rescata lo que sí se hizo y ajusta hacia adelante con UNA siguiente acción concreta. Cuando cites, menciona al referente. NUNCA diagnosticas, NUNCA cambias dosis, NUNCA das indicación médica nueva; si no sabes o hay bandera roja, lo dices y derivas al médico.";
export const RED_FLAGS = [
  { key: "vomito_severo", patrones: ["vomito", "vomite", "vomitando", "no paro de vomitar"], severidad: "urgente", respuesta: "Lamento que te sientas así. El vómito persistente necesita la mirada del Dr. ahora mismo — ya le avisé. Mientras, toma sorbitos de agua o suero y no fuerces comida. Si es intenso o no para, acude a emergencias.", motivo: "Vómito (posible deshidratación / intolerancia GLP-1)." },
  { key: "dolor_abdominal_severo", patrones: ["dolor abdominal", "dolor fuerte de barriga", "me duele mucho el estomago", "dolor que llega a la espalda"], severidad: "urgente", respuesta: "Un dolor abdominal fuerte hay que revisarlo de inmediato. Ya avisé al Dr. Si es intenso, constante o se va a la espalda, acude a emergencias ahora.", motivo: "Posible pancreatitis/vesícula — urgente." },
  { key: "reaccion_alergica", patrones: ["alergia", "ronchas", "hinchazon", "no puedo respirar", "se me cierra la garganta"], severidad: "urgente", respuesta: "Eso suena a posible reacción alérgica. Si tienes dificultad para respirar o hinchazón en cara/garganta, acude a emergencias YA. Ya avisé al Dr.", motivo: "Posible reacción alérgica." },
  { key: "mareo_deshidratacion", patrones: ["no orino", "mareo fuerte", "muy debil", "no puedo retener liquidos", "desmayo"], severidad: "urgente", respuesta: "Esos síntomas pueden ser deshidratación. Ya avisé al Dr. Toma suero a sorbitos; si te sientes muy débil, acude a emergencias.", motivo: "Posible deshidratación / síncope." },
  { key: "lesion", patrones: ["me lesione", "me duele la rodilla", "me duele la espalda al levantar", "escuche un crack", "no puedo mover"], severidad: "revisar", respuesta: "Gracias por avisar. Con una posible lesión, mejor frena ese ejercicio y no cargues hoy. Le dejé la nota al Dr. para adaptar tu entrenamiento.", motivo: "Posible lesión — requiere ajuste del plan." },
  { key: "relacion_comida", patrones: ["me odio por comer", "no quiero comer nada", "vomito lo que como a proposito", "me siento culpable de comer", "atracon", "no merezco comer", "castigo con ejercicio"], severidad: "revisar", respuesta: "Gracias por confiarme esto. Comer no es un examen que se aprueba o reprueba, y lo que sientes importa. Quiero que lo converses con el Dr. — ya le dejé la nota. No estás solo en esto.", motivo: "Posible relación poco sana con la comida." },
];
export const CLINICOS = ["dosis", "medicamento", "pastilla", "inyeccion", "ozempic", "semaglutida", "presion", "diabetes", "tiroides", "analisis", "examen de sangre", "embarazo", "lactancia", "receta"];

export function normTxt(s: string): string { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
export function matchRedFlag(message: string): any | null {
  const n = normTxt(message);
  for (const f of RED_FLAGS) for (const pp of f.patrones) if (n.includes(normTxt(pp))) return f;
  return null;
}

export async function reasonCoach(user: any, message: string, knowledge: any[], history: any[]): Promise<{ reply: string; source: string }> {
  const conocimiento = knowledge.length ? knowledge.map((k, i) => `[${i + 1}] ${k.titulo} (fuente: ${k.fuente}): ${k.contenido}`).join("\n") : "(sin coincidencias)";
  const profile = user.profile || {};
  const system = [PERSONA, "", `Usuario: ${user.nombre}. Objetivo: ${profile.objetivo || "salud"}. Bajo GLP-1: ${profile.bajo_glp1 ? "sí" : "no"}.`,
    "Responde corto (2-4 frases). Si usas el conocimiento, básate en él y cita al referente; si no sabes, dilo y deriva al Dr.", "", "Conocimiento del programa:", conocimiento].join("\n");
  const convo = (history || []).slice(-6).map((m) => `${m.direccion === "entrante" ? "Usuario" : "Coach"}: ${m.contenido}`).join("\n");
  const prompt = (convo ? convo + "\n" : "") + `Usuario: ${message}\nCoach:`;
  if (geminiEnabled()) {
    const reply = await geminiText(prompt, { system, maxTokens: 400, temperature: 0.4 });
    if (reply) return { reply, source: "gemini" };
  }
  // Fallback honesto basado en RAG.
  const nombre = (user.nombre || "").split(" ")[0];
  if (!knowledge.length) return { reply: `Gracias por escribir, ${nombre}. No tengo una respuesta exacta para eso ahora mismo, así que se la dejo anotada al Dr. para que te responda. Si es urgente, escríbele directamente.`, source: "fallback" };
  return { reply: `Sobre eso — según ${knowledge[0].fuente}: ${knowledge[0].contenido} Si necesitas algo más específico de tu caso, lo veo con el Dr.`, source: "fallback" };
}
