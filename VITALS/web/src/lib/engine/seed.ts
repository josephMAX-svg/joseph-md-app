import "server-only";
import { sb, newId, nowIso } from "./supabase";
import * as P from "./plan";
import * as D from "./domain";
import knowledgeData from "./knowledge.json";

/** Seed de Supabase (mv_*) — puerto de seed.py. Joseph (baseline real) + familiar + paciente + médico,
 * alimentos peruanos, chunks RAG y ~5 semanas de historia. Idempotente (no re-siembra si ya hay usuarios). */

function mulberry32(seed: number) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function dateMinus(d: number): string { const x = new Date(); x.setDate(x.getDate() - d); return x.toLocaleDateString("en-CA"); }
function choice<T>(rng: () => number, arr: T[]): T { return arr[Math.floor(rng() * arr.length)]; }

const JOSEPH_BASELINE: any = { peso: 62.55, grasa_pct: 18.7, musculo_esqueletico_pct: 52.5, masa_magra_kg: 50.85, grasa_visceral: 8, tmb: 1476, edad_metabolica: 25, agua_pct: 56.2, imc: 21.6 };
const FOODS: any[] = [
  ["Pechuga de pollo", "proteina", 165, 31, 0, 3.6, 100, "100 g", 1], ["Pescado jurel", "proteina", 140, 23, 0, 5, 100, "100 g", 1],
  ["Huevo de gallina", "proteina", 143, 13, 1, 10, 50, "1 unidad", 1], ["Lomo de res magro", "proteina", 180, 27, 0, 8, 100, "100 g", 1],
  ["Arroz blanco cocido", "cereal", 130, 2.7, 28, 0.3, 150, "1 taza", 1], ["Quinua cocida", "cereal", 120, 4.4, 21, 1.9, 100, "100 g", 1],
  ["Papa blanca sancochada", "tuberculo", 87, 2, 20, 0.1, 150, "1 unidad", 1], ["Camote", "tuberculo", 86, 1.6, 20, 0.1, 130, "1 unidad", 1],
  ["Lenteja guisada", "legumbre", 116, 9, 20, 0.4, 100, "1 cucharón", 1], ["Palta (aguacate)", "grasa", 160, 2, 9, 15, 100, "1/2 unidad", 1],
  ["Lechuga", "verdura", 15, 1.4, 2.9, 0.2, 50, "1 plato", 1], ["Zanahoria", "verdura", 41, 0.9, 10, 0.2, 60, "1 unidad", 1],
  ["Brócoli", "verdura", 34, 2.8, 7, 0.4, 80, "1 porción", 1], ["Plátano", "fruta", 89, 1.1, 23, 0.3, 120, "1 unidad", 1],
  ["Manzana", "fruta", 52, 0.3, 14, 0.2, 150, "1 unidad", 1], ["Avena", "cereal", 389, 17, 66, 7, 40, "1/2 taza", 1],
  ["Leche evaporada", "lacteo", 134, 7, 10, 7.6, 100, "100 ml", 1], ["Yogurt natural", "lacteo", 61, 3.5, 5, 3.3, 150, "1 vaso", 1],
  ["Pan integral", "cereal", 247, 13, 41, 3.4, 30, "1 rebanada", 1], ["Atún en agua", "proteina", 116, 26, 0, 1, 100, "1 lata", 1],
  ["Choclo (maíz)", "cereal", 96, 3.4, 21, 1.5, 100, "1/2 unidad", 1], ["Frejol canario", "legumbre", 127, 9, 23, 0.5, 100, "1 cucharón", 1],
  ["Aceite de oliva", "grasa", 884, 0, 0, 100, 10, "1 cucharada", 0], ["Queso fresco", "lacteo", 264, 17, 3, 21, 40, "1 tajada", 1],
  ["Pollo broaster", "preparado", 290, 22, 14, 17, 150, "1 presa", 1], ["Papas fritas", "preparado", 312, 3.4, 41, 15, 100, "1 porción", 1],
];
const MEAL_TEMPLATES: Record<string, any[]> = {
  desayuno: [{ m: "cumple", k: 360, p: 28, c: 30, g: 14, d: "Huevos + avena + plátano" }, { m: "cumple", k: 320, p: 25, c: 28, g: 12, d: "Yogurt + avena + manzana" }],
  almuerzo: [{ m: "cumple", k: 500, p: 46, c: 55, g: 9, d: "Pollo + arroz + ensalada" }, { m: "cumple", k: 490, p: 40, c: 52, g: 12, d: "Pescado + papa + ensalada criolla" }, { m: "parcial", k: 430, p: 28, c: 60, g: 8, d: "Quinua guisada + huevo" }],
  cena: [{ m: "cumple", k: 380, p: 38, c: 20, g: 14, d: "Lomo magro + ensalada + palta" }, { m: "cumple", k: 350, p: 34, c: 25, g: 12, d: "Atún + camote + brócoli" }],
  snack: [{ m: "cumple", k: 180, p: 18, c: 12, g: 6, d: "Yogurt + manzana" }, { m: "desviado", k: 460, p: 26, c: 55, g: 32, d: "Pollo broaster + papas" }],
};
const EX_BASE: Record<string, number> = { "Press de pecho con mancuernas": 22, "Press militar": 30, "Aperturas en polea": 12, "Extensión de tríceps en polea": 25, "Peso muerto rumano": 70, "Curl femoral tumbado": 35, "Hip thrust": 90, "Elevación de talones (gemelo)": 60, "Jalón al pecho": 55, "Remo con mancuerna": 26, "Face pull": 20, "Curl de bíceps": 14, "Sentadilla": 80, "Prensa de pierna": 140, "Extensión de cuádriceps": 45, "Zancadas": 18 };

export async function seedIfEmpty(): Promise<any> {
  const { data: existing } = await sb().from("mv_users").select("id").eq("id", "joseph").maybeSingle();
  if (existing) return { seeded: false, reason: "ya existe" };
  const rng = mulberry32(42); const ts = nowIso();
  const users = [
    ["joseph", "joseph", "Joseph (fundador)", "m", "1991-01-01", 170, 62.55, 60.0, "recomposicion", 0],
    ["familiar-ana", "familiar", "Ana (familiar)", "f", "1968-05-10", 158, 72.0, 64.0, "perder_grasa", 0],
    ["paciente-maria", "paciente", "María (paciente demo)", "f", "1985-03-20", 160, 84.0, 70.0, "perder_grasa", 1],
    ["medico-joseph", "medico", "Dr. Joseph (médico)", "m", "1991-01-01", 170, 62.55, 60.0, "salud", 0],
  ];
  await sb().from("mv_users").insert(users.map((u) => ({ id: u[0], role: u[1], nombre: u[2], created_at: ts })));
  await sb().from("mv_profiles").insert(users.map((u) => ({ user_id: u[0], sexo: u[3], fecha_nac: u[4], altura_cm: u[5], peso_inicial: u[6], peso_meta: u[7], objetivo: u[8], meta_agua_ml: 3000, meta_sueno_h: 7.0, baseline: u[0] === "joseph" ? JOSEPH_BASELINE : {}, pillar_weights: {}, bajo_glp1: u[9], consentimiento: ts, updated_at: ts })));
  await sb().from("mv_foods").insert(FOODS.map((f) => ({ id: newId(), nombre: f[0], categoria: f[1], kcal: f[2], proteina_g: f[3], carbo_g: f[4], grasa_g: f[5], porcion_g: f[6], porcion_nombre: f[7], es_peruano: !!f[8], created_at: ts })));
  // Knowledge
  const ns = (knowledgeData as any).namespace || "movimiento";
  const kbRows: any[] = [], kcRows: any[] = [];
  for (const ch of (knowledgeData as any).chunks) { const kid = newId(); kbRows.push({ id: kid, namespace: ns, titulo: ch.titulo, contenido: ch.contenido, categoria: ch.categoria, fuente: ch.fuente, tags: ch.tags || [], activo: true, created_at: ts }); kcRows.push({ id: newId(), knowledge_id: kid, chunk_index: 0, contenido: `${ch.titulo}. ${ch.contenido}`, created_at: ts }); }
  await sb().from("mv_knowledge_base").insert(kbRows);
  await sb().from("mv_knowledge_chunks").insert(kcRows);
  // Planes
  const teJ = D.estimarTdee([], [], { sexo: "m", altura: 170, edad: 35, pesoActual: 62.55, factor: 1.55 });
  const planJ = P.generarPlan({ peso_inicial: 62.55, objetivo: "recomposicion", sexo: "m", baseline: JOSEPH_BASELINE, fecha_nac: "1991-01-01" }, teJ, "front_load");
  await insertPlan("joseph", planJ, "Plan inicial (front-loading: resultado temprano visible).", ts, true);
  const plans: Record<string, any> = { joseph: planJ };
  for (const u of users) { if (u[0] === "joseph" || u[0] === "medico-joseph") continue;
    const prof = { peso_inicial: u[6], objetivo: u[8], sexo: u[3], baseline: {}, altura_cm: u[5], fecha_nac: u[4] };
    const te = D.estimarTdee([], [], { sexo: u[3] as string, altura: u[5] as number, edad: 45, pesoActual: u[6] as number, factor: 1.4 });
    const pl = P.generarPlan(prof, te, "sostenible"); await insertPlan(u[0] as string, pl, "Plan inicial.", ts, false); plans[u[0] as string] = pl;
  }
  await seedHistory("joseph", planJ, 35, rng, "alta");
  await seedHistory("paciente-maria", plans["paciente-maria"], 21, rng, "media");
  await seedHistory("familiar-ana", plans["familiar-ana"], 14, rng, "media");
  return { seeded: true, users: users.map((u) => u[0]) };
}

async function insertPlan(uid: string, plan: any, motivo: string, ts: string, aprobado: boolean) {
  await sb().from("mv_plans").insert({ id: newId(), user_id: uid, version: 1, tipo: "integral", contenido: plan, activo: true, motivo, aprobado_por_medico: aprobado, fecha: new Date().toLocaleDateString("en-CA"), created_at: ts });
}

async function seedHistory(uid: string, plan: any, days: number, rng: () => number, adherencia: string) {
  const split: Record<number, any> = {}; for (const d of plan.entrenamiento.split) split[d.dia] = d;
  const miss = adherencia === "alta" ? 0.03 : 0.22; const walkSkip = adherencia === "alta" ? 0.12 : 0.45;
  const foodRows: any[] = [], exRows: any[] = [], actRows: any[] = [], wellRows: any[] = [], bodyRows: any[] = [];
  for (let i = days; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i); const fecha = d.toLocaleDateString("en-CA"); const wd = (d.getDay() + 6) % 7; const week = Math.floor((days - i) / 7);
    const momentos = ["desayuno", "almuerzo", "cena"]; if (rng() > miss) momentos.push("snack");
    for (const mt of momentos) { if (rng() < miss) continue; const tpl = choice(rng, MEAL_TEMPLATES[mt]); foodRows.push({ id: newId(), user_id: uid, fecha, meal_type: mt, descripcion: tpl.d, kcal: tpl.k, prot_g: tpl.p, carb_g: tpl.c, grasa_g: tpl.g, plan_match: tpl.m, confianza: 0.72, fuente: "foto", created_at: nowIso() }); }
    const dia = split[wd];
    if (dia && dia.tipo === "fuerza" && rng() > miss) for (const ej of dia.ejercicios) {
      const base = EX_BASE[ej.nombre] || 20; const carga = Math.round((base * (1 + 0.02 * week) + choice(rng, [0, 0, 1.25, 2.5])) * 10) / 10;
      const nSeries = typeof ej.series === "number" ? ej.series : 3;
      const series = Array.from({ length: nSeries }, () => ({ reps: 10 + choice(rng, [-2, -1, 0, 0, 1]), carga_kg: carga, rir: choice(rng, [1, 2, 2, 3]) }));
      exRows.push({ id: newId(), user_id: uid, fecha, ejercicio: ej.nombre, grupo_muscular: ej.grupo, series, volumen_total: D.serieVolumen(series), hecho: true, fuente: choice(rng, ["manual", "voz"]), created_at: nowIso() });
    }
    if (wd === 2 && rng() > miss) actRows.push(act(uid, fecha, "baile", 45));
    else if (rng() > walkSkip) actRows.push(act(uid, fecha, "caminata", choice(rng, [20, 30, 40])));
    if (rng() > miss) { const agua = [0, 1, 3, 4].includes(wd) ? choice(rng, [2600, 2800, 3000, 3200]) : choice(rng, [2000, 2400, 2800]); wellRows.push({ id: newId(), user_id: uid, fecha, tipo: "agua", valor: agua, meta: 3000, created_at: nowIso() }); }
    if (rng() > miss) wellRows.push({ id: newId(), user_id: uid, fecha, tipo: "sueno", valor: Math.round((6.2 + rng() * 1.6) * 10) / 10, meta: 7, created_at: nowIso() });
    if (wd === 0 || i === days) bodyRows.push(body(uid, fecha, week, rng, plan));
  }
  // Batch inserts.
  for (const [t, rows] of [["mv_food_logs", foodRows], ["mv_exercise_logs", exRows], ["mv_activity_proofs", actRows], ["mv_wellness_logs", wellRows], ["mv_body_composition", bodyRows]] as any)
    if (rows.length) for (let j = 0; j < rows.length; j += 200) await sb().from(t).insert(rows.slice(j, j + 200));
}
function act(uid: string, fecha: string, tipo: string, dur: number) { return { id: newId(), user_id: uid, fecha, tipo, duracion_min: dur, ts: fecha + "T07:00:00Z", verificado: true, created_at: nowIso() }; }
function body(uid: string, fecha: string, week: number, rng: () => number, plan: any) {
  let metrics: any;
  if (uid === "joseph") { metrics = { ...JOSEPH_BASELINE, peso: Math.round((62.55 - 0.25 * week + (rng() - 0.5) * 0.6) * 10) / 10, grasa_pct: Math.round((JOSEPH_BASELINE.grasa_pct - 0.15 * week) * 10) / 10, musculo_esqueletico_pct: Math.round((JOSEPH_BASELINE.musculo_esqueletico_pct + 0.1 * week) * 10) / 10 }; }
  else { const peso = Math.round((84 - 0.25 * week + (rng() - 0.5) * 0.6) * 10) / 10; metrics = { peso, grasa_pct: Math.round((38 - 0.3 * week) * 10) / 10, musculo_kg: Math.round((24 + 0.1 * week) * 10) / 10, grasa_visceral: Math.max(6, 12 - 0.2 * week), imc: Math.round((peso / 1.6 / 1.6) * 10) / 10, tmb: 1400 }; }
  return { id: newId(), user_id: uid, fecha, metrics, fuente: "renpho", created_at: nowIso() };
}
