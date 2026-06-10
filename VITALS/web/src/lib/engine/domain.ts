/**
 * MOTOR · lógica de dominio (puerto fiel del Python `intelligence/app/domain/`).
 * TDEE adaptativo + pisos de seguridad, adherencia por pilar + garantía 90/95, plan adaptativo,
 * progresión/PR y RAG BM25-lite con stemming. Sin dependencias.
 */

// ─────────────────────────── TDEE + objetivo + PISOS ───────────────────────────
export const KCAL_POR_KG_GRASA = 7700;
export const PISO_KCAL_HOMBRE = 1500, PISO_KCAL_MUJER = 1200;
export const PROTEINA_PISO = 1.6, PROTEINA_DEFICIT = 2.0, VEL_MAX_PCT_SEM = 1.0;

export function mifflin(sexo: string, kg: number, altura: number, edad: number): number {
  const s = (sexo || "m").toLowerCase().startsWith("m") ? 5 : -161;
  return Math.round(10 * kg + 6.25 * altura - 5 * edad + s);
}

function slopePorDia(pts: [string, number][]): number | null {
  const p = pts.filter((x) => x[1] != null);
  if (p.length < 2) return null;
  const base = new Date(p[0][0].slice(0, 10)).getTime();
  const xs = p.map((x) => (new Date(x[0].slice(0, 10)).getTime() - base) / 86400000);
  const ys = p.map((x) => Number(x[1]));
  const n = xs.length, mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  const denom = xs.reduce((a, x) => a + (x - mx) ** 2, 0);
  if (denom === 0) return null;
  return xs.reduce((a, x, i) => a + (x - mx) * (ys[i] - my), 0) / denom;
}

export function estimarTdee(pesos: [string, number][], intakes: [string, number][], opts: {
  sexo?: string; altura?: number; edad?: number; pesoActual?: number; factor?: number;
} = {}): any {
  const { sexo = "m", altura = 170, edad = 35, factor = 1.5 } = opts;
  pesos = pesos.filter((p) => p[1] != null).sort((a, b) => a[0].localeCompare(b[0]));
  intakes = intakes.filter((i) => i[1] != null).sort((a, b) => a[0].localeCompare(b[0]));
  const peso = opts.pesoActual ?? (pesos.length ? pesos[pesos.length - 1][1] : 70);
  const slope = slopePorDia(pesos);
  const avg = intakes.length ? intakes.reduce((a, i) => a + i[1], 0) / intakes.length : null;
  let span = 0;
  if (pesos.length >= 2) span = Math.round((new Date(pesos[pesos.length - 1][0].slice(0, 10)).getTime() - new Date(pesos[0][0].slice(0, 10)).getTime()) / 86400000);
  if (slope != null && avg && pesos.length >= 5 && intakes.length >= 5 && span >= 7) {
    return { tdee: Math.round(avg - slope * KCAL_POR_KG_GRASA), metodo: "adaptativo",
      confianza: intakes.length >= 10 && span >= 14 ? "alta" : "media",
      cambio_kg_sem: Math.round(slope * 7 * 1000) / 1000, avg_intake: Math.round(avg), dias: span };
  }
  const bmr = mifflin(sexo, peso, altura, edad);
  return { tdee: Math.round(bmr * factor), metodo: "formula", confianza: "baja",
    cambio_kg_sem: slope != null ? Math.round(slope * 7 * 1000) / 1000 : null, bmr, dias: span };
}

function repartoProteina(prot: number): number[] {
  const tomas = prot >= 130 ? 4 : 3, base = Math.floor(prot / tomas), resto = prot - base * tomas;
  return Array.from({ length: tomas }, (_, i) => base + (i < resto ? 1 : 0));
}

export function objetivoCalorico(tdee: number, objetivo: string, opts: { sexo?: string; pesoKg?: number; frontload?: boolean } = {}): any {
  const { sexo = "m", pesoKg = 70, frontload = false } = opts;
  let deficit = 0;
  if (objetivo === "perder_grasa") deficit = frontload ? 0.2 : 0.15;
  else if (objetivo === "recomposicion") deficit = frontload ? 0.1 : 0.05;
  else if (objetivo === "ganar_musculo") deficit = -0.1;
  let kcal = tdee * (1 - deficit);
  const piso = sexo.toLowerCase().startsWith("m") ? PISO_KCAL_HOMBRE : PISO_KCAL_MUJER;
  let floored = false;
  if (kcal < piso) { kcal = piso; floored = true; }
  const protGkg = deficit > 0 ? PROTEINA_DEFICIT : PROTEINA_PISO;
  const prot = Math.round(protGkg * pesoKg);
  const grasa = Math.round((kcal * 0.25) / 9);
  const carb = Math.max(0, Math.round((kcal - prot * 4 - grasa * 9) / 4));
  return { kcal: Math.round(kcal), deficit_pct: Math.round(deficit * 100), proteina_g: prot,
    proteina_g_kg: protGkg, grasa_g: grasa, carbo_g: carb, piso_aplicado: floored, tomas_proteina: repartoProteina(prot) };
}

// ─────────────────────────── Progresión + PR ───────────────────────────
export function serieVolumen(series: any[]): number {
  return Math.round((series || []).reduce((t, s) => t + (Number(s.reps) || 0) * (Number(s.carga_kg) || 0), 0) * 10) / 10;
}
export function epley(carga: number, reps: number): number {
  return Math.round((reps <= 1 ? carga : carga * (1 + reps / 30)) * 10) / 10;
}
export function mejorE1rm(series: any[]): number {
  let best = 0;
  for (const s of series || []) { const r = Number(s.reps) || 0, c = Number(s.carga_kg) || 0; if (r > 0 && c > 0) best = Math.max(best, epley(c, r)); }
  return Math.round(best * 10) / 10;
}
function tendencia(vals: number[]): string {
  const v = vals.filter((x) => x != null);
  if (v.length < 2) return "estable";
  const mid = Math.floor(v.length / 2);
  const a = v.slice(0, mid).reduce((s, x) => s + x, 0) / Math.max(mid, 1);
  const b = v.slice(mid).reduce((s, x) => s + x, 0) / Math.max(v.length - mid, 1);
  return b > a * 1.05 ? "subiendo" : b < a * 0.95 ? "bajando" : "estable";
}
export function progresionPorEjercicio(logs: any[]): any[] {
  const byEx: Record<string, any[]> = {};
  for (const lg of logs) { const ex = (lg.ejercicio || "").trim(); if (ex) (byEx[ex.toLowerCase()] ||= []).push(lg); }
  const out: any[] = [];
  for (const items of Object.values(byEx)) {
    items.sort((a, b) => (a.fecha || "").localeCompare(b.fecha || ""));
    const puntos: any[] = []; let bestE = 0, bestV = 0;
    for (const it of items) {
      const series = it.series || []; const vol = it.volumen_total ?? serieVolumen(series); const e1 = mejorE1rm(series);
      puntos.push({ fecha: it.fecha, volumen: vol, e1rm: e1, top_carga: Math.max(0, ...series.map((s: any) => Number(s.carga_kg) || 0)) });
      bestE = Math.max(bestE, e1); bestV = Math.max(bestV, vol || 0);
    }
    const last = puntos[puntos.length - 1];
    const esPr = Boolean(last && ((last.e1rm >= bestE && bestE > 0) || (last.volumen >= bestV && bestV > 0)) && puntos.length > 1);
    out.push({ ejercicio: items[0].ejercicio, grupo_muscular: items[0].grupo_muscular, puntos,
      mejor_e1rm: bestE, mejor_volumen: bestV, es_pr_reciente: esPr, tendencia: tendencia(puntos.map((p) => p.volumen)), sesiones: puntos.length });
  }
  return out.sort((a, b) => b.sesiones - a.sesiones);
}

// ─────────────────────────── Adherencia + garantía ───────────────────────────
export const DEFAULT_WEIGHTS: Record<string, number> = { comida: 0.3, entrenamiento: 0.25, cardio: 0.15, hidratacion: 0.1, sueno: 0.1, medicion: 0.1 };
const MATCH_SCORE: Record<string, number> = { cumple: 1, parcial: 0.6, desviado: 0.3 };
const PILAR_LABEL: Record<string, string> = { comida: "Nutrición", entrenamiento: "Entrenamiento", cardio: "Cardio / caminata", hidratacion: "Hidratación", sueno: "Sueño", medicion: "Medición / peso" };
function weekday(fecha: string): number { const d = new Date(fecha.slice(0, 10) + "T12:00:00"); return (d.getDay() + 6) % 7; } // 0=lun..6=dom

function p(completion: number, weight: number, detalle: string) {
  return { completion: Math.round(Math.max(0, Math.min(1, completion)) * 1000) / 1000, weight: Math.round(weight * 1000) / 1000, detalle };
}

export function scoreDay(fecha: string, ctx: { plan: any; profile: any; foods: any[]; exercises: any[]; activities: any[]; wellness: any[]; bodyRecentDays: number | null; weights?: Record<string, number> }): any {
  const w = { ...DEFAULT_WEIGHTS, ...(ctx.weights || {}) };
  const wd = weekday(fecha);
  const entren = (ctx.plan || {}).entrenamiento || {};
  const diasFuerza = entren.dias_fuerza || [0, 1, 3, 4];
  const diasCardio = entren.dias_cardio || [2];
  const comidasObj = ((ctx.plan || {}).nutricion || {}).comidas_objetivo || 3;
  const metaAgua = ctx.profile.meta_agua_ml || 3000, metaSueno = ctx.profile.meta_sueno_h || 7;
  const pilares: Record<string, any> = {};
  // Comida
  const scoreSum = (ctx.foods || []).reduce((s, f) => s + (MATCH_SCORE[f.plan_match] ?? 0.5), 0);
  pilares.comida = p(ctx.foods.length ? Math.min(1, scoreSum / Math.max(comidasObj, 1)) : 0, w.comida, `${ctx.foods.length}/${comidasObj} comidas`);
  // Entrenamiento (días de fuerza)
  if (diasFuerza.includes(wd)) {
    const hecho = ctx.exercises.some((e) => e.hecho ?? true);
    pilares.entrenamiento = p(hecho ? 1 : 0, w.entrenamiento, hecho ? "Sesión hecha" : "Sesión pendiente");
  }
  // Cardio
  const cardioDone = ctx.activities.length > 0;
  if (diasCardio.includes(wd)) pilares.cardio = p(cardioDone ? 1 : 0, w.cardio, cardioDone ? "Cardio/baile hecho" : "Cardio pendiente");
  else pilares.cardio = p(cardioDone ? 1 : 0, w.cardio * 0.6, cardioDone ? "Caminata hecha" : "Sin caminata");
  // Hidratación
  const agua = ctx.wellness.find((x) => x.tipo === "agua")?.valor;
  if (agua != null) pilares.hidratacion = p(agua > 50 ? Math.min(1, agua / metaAgua) : Math.min(1, agua / 8), w.hidratacion, agua > 50 ? `${Math.round(agua)} ml` : `${Math.round(agua)} vasos`);
  else pilares.hidratacion = p(0, w.hidratacion, "Sin registro");
  // Sueño
  const sueno = ctx.wellness.find((x) => x.tipo === "sueno")?.valor;
  if (sueno != null) pilares.sueno = p(Math.min(1, sueno / metaSueno), w.sueno, `${sueno} h`);
  else pilares.sueno = p(0, w.sueno, "Sin registro");
  // Medición
  if (ctx.bodyRecentDays != null) pilares.medicion = p(ctx.bodyRecentDays <= 7 ? 1 : ctx.bodyRecentDays <= 10 ? 0.5 : 0, w.medicion, `Hace ${ctx.bodyRecentDays} d`);
  else pilares.medicion = p(0, w.medicion, "Nunca medido");

  const totalW = Object.values(pilares).reduce((s: number, x: any) => s + x.weight, 0);
  const score = totalW ? (Object.values(pilares).reduce((s: number, x: any) => s + x.completion * x.weight, 0) / totalW) * 100 : 0;
  const porPilar: Record<string, any> = {};
  for (const [k, v] of Object.entries(pilares)) porPilar[k] = { ...v, label: PILAR_LABEL[k] };
  return { fecha, score: Math.round(score * 10) / 10, por_pilar: porPilar };
}

export function guaranteeFlags(score: number): any {
  return { elegible_devolucion_total: score >= 95, elegible_devolucion_parcial: score >= 90 && score < 95,
    umbral_parcial: 90, umbral_total: 95, nota: "Solo marca elegibilidad. La decisión de devolución la toma el médico revisando la evidencia." };
}
function mensaje(score: number): string {
  if (score >= 95) return "Excelente. Estás cumpliendo casi todo tu plan — vas por el 100 % del beneficio. ¡Sigue así!";
  if (score >= 90) return "Muy bien. Estás en zona de devolución parcial. Un poco más de constancia y llegas al 100 %.";
  if (score >= 70) return "Buen ritmo. Recuerda: hacer la mayor parte del plan ya te da cerca del 80 % del beneficio. No busques perfección, busca constancia.";
  if (score >= 40) return "Vas avanzando. Un día imperfecto sigue sumando — elige una próxima acción y cúmplela hoy.";
  return "Empecemos por una sola cosa hoy. La constancia imperfecta gana al plan perfecto que no se hace.";
}
export function scorePeriod(daily: any[]): any {
  if (!daily.length) return { score: 0, dias: 0, por_pilar: {}, garantia: guaranteeFlags(0), mensaje: mensaje(0), serie: [] };
  const score = Math.round((daily.reduce((s, d) => s + d.score, 0) / daily.length) * 10) / 10;
  const acc: Record<string, number[]> = {};
  for (const d of daily) for (const [k, v] of Object.entries(d.por_pilar) as any) (acc[k] ||= []).push(v.completion);
  const porPilar: Record<string, any> = {};
  for (const [k, vs] of Object.entries(acc)) porPilar[k] = { completion_avg: Math.round((vs.reduce((s, x) => s + x, 0) / vs.length) * 1000) / 1000, dias: vs.length, label: PILAR_LABEL[k] || k };
  return { score, dias: daily.length, por_pilar: porPilar, garantia: guaranteeFlags(score), mensaje: mensaje(score), serie: daily.map((d) => ({ fecha: d.fecha, score: d.score })) };
}

// ─────────────────────────── RAG BM25-lite + stemming ───────────────────────────
const STOP = new Set(["de", "la", "el", "en", "y", "a", "los", "las", "un", "una", "que", "por", "con", "para", "es", "se", "del", "al", "lo", "como", "mas", "o", "su", "si", "tu", "te", "me", "mi", "cuanto", "cuanta", "cuantos", "cual", "puedo", "debo", "tengo"]);
const SUFIJOS = ["amiento", "imiento", "aciones", "iciones", "ando", "iendo", "acion", "icion", "adas", "ados", "idas", "idos", "ar", "er", "ir", "as", "os", "es", "an", "en", "ado", "ido", "aba", "ia", "mente", "s"];
function norm(s: string): string { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
function stem(t: string): string { for (const suf of SUFIJOS) if (t.endsWith(suf) && t.length - suf.length >= 4) { t = t.slice(0, -suf.length); break; } return t.slice(0, 6); }
function tokens(text: string): string[] { return (norm(text).match(/[a-z0-9]+/g) || []).filter((t) => t.length > 2 && !STOP.has(t)).map(stem); }

export function ragRetrieve(chunks: any[], query: string, k = 4): any[] {
  if (!chunks.length) return [];
  const qTokens = tokens(query); if (!qTokens.length) return [];
  const qSet = new Set(qTokens);
  const docs = chunks.map((r) => ({ row: r, toks: tokens(`${r.titulo} ${r.titulo} ${r.chunk} ${(r.tags || []).join(" ")}`) }));
  const N = docs.length; const df: Record<string, number> = {};
  for (const d of docs) for (const t of new Set(d.toks)) df[t] = (df[t] || 0) + 1;
  const idf: Record<string, number> = {}; for (const t of qSet) idf[t] = Math.log(1 + N / (1 + (df[t] || 0)));
  const avgdl = docs.reduce((s, d) => s + d.toks.length, 0) / Math.max(N, 1);
  const k1 = 1.5, b = 0.75; const scored: any[] = [];
  for (const d of docs) {
    const tf: Record<string, number> = {}; for (const t of d.toks) tf[t] = (tf[t] || 0) + 1;
    const dl = d.toks.length; let score = 0;
    for (const t of qSet) if (tf[t]) { const f = tf[t]; score += idf[t] * (f * (k1 + 1)) / (f + k1 * (1 - b + b * dl / avgdl)); }
    if (score > 0) scored.push({ knowledge_id: d.row.knowledge_id, titulo: d.row.titulo, contenido: d.row.chunk, fuente: d.row.fuente, categoria: d.row.categoria, score: Math.round(score * 1000) / 1000 });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, k);
}
