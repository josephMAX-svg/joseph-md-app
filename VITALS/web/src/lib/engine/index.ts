import "server-only";
import { sb, newId, nowIso, todayISO } from "./supabase";
import { geminiEnabled, geminiText } from "./gemini";
import * as D from "./domain";
import * as P from "./plan";
import * as AI from "./ai";

/** MOTOR serverless — funciones que reemplazan a los endpoints del FastAPI, sobre Supabase (mv_*). */

function dateMinus(days: number): string {
  const d = new Date(); d.setDate(d.getDate() - days); return d.toLocaleDateString("en-CA");
}
async function sel(table: string): Promise<any[]> { const { data } = await sb().from(table).select("*"); return data || []; }

export async function getUsers(): Promise<any[]> {
  const { data } = await sb().from("mv_users").select("id, role, nombre");
  const order: any = { joseph: 0, familiar: 1, paciente: 2 };
  return (data || []).sort((a, b) => (order[a.role] ?? 3) - (order[b.role] ?? 3));
}
export async function getUser(uid: string): Promise<any> {
  const { data: u } = await sb().from("mv_users").select("id, role, nombre").eq("id", uid).maybeSingle();
  if (!u) throw new Error(`Usuario '${uid}' no existe`);
  const { data: pr } = await sb().from("mv_profiles").select("*").eq("user_id", uid).maybeSingle();
  const profile = pr || {};
  return { id: u.id, role: u.role, nombre: u.nombre, profile: {
    sexo: profile.sexo, fecha_nac: profile.fecha_nac, altura_cm: profile.altura_cm, peso_inicial: profile.peso_inicial,
    peso_meta: profile.peso_meta, objetivo: profile.objetivo, meta_kcal: profile.meta_kcal, meta_proteina_g: profile.meta_proteina_g,
    meta_agua_ml: profile.meta_agua_ml, meta_sueno_h: profile.meta_sueno_h, bajo_glp1: profile.bajo_glp1,
    baseline: profile.baseline || {}, pillar_weights: profile.pillar_weights || {}, consentimiento: profile.consentimiento } };
}
export async function patchProfile(uid: string, fields: any): Promise<any> {
  await sb().from("mv_profiles").update({ ...fields, updated_at: nowIso() }).eq("user_id", uid);
  return getUser(uid);
}

export async function activePlan(uid: string): Promise<any> {
  const { data } = await sb().from("mv_plans").select("contenido").eq("user_id", uid).eq("activo", true).order("version", { ascending: false }).limit(1).maybeSingle();
  return data?.contenido || {};
}
export async function getPlan(uid: string): Promise<any> {
  await getUser(uid);
  const { data: row } = await sb().from("mv_plans").select("*").eq("user_id", uid).eq("activo", true).order("version", { ascending: false }).limit(1).maybeSingle();
  if (!row) return { plan: null };
  const { data: vers } = await sb().from("mv_plans").select("version, motivo, fecha, aprobado_por_medico").eq("user_id", uid).order("version", { ascending: false });
  return { plan: row.contenido, version: row.version, aprobado_por_medico: !!row.aprobado_por_medico, motivo: row.motivo, historial: vers || [] };
}

async function tdeeFor(uid: string, profile: any): Promise<any> {
  const si = dateMinus(21);
  const { data: bodies } = await sb().from("mv_body_composition").select("fecha, metrics").eq("user_id", uid).gte("fecha", si).order("fecha");
  const pesos: [string, number][] = (bodies || []).map((r) => [r.fecha, (r.metrics || {}).peso]).filter((x) => x[1] != null) as any;
  const { data: foods } = await sb().from("mv_food_logs").select("fecha, kcal").eq("user_id", uid).gte("fecha", si);
  const byDay: Record<string, number> = {};
  for (const f of foods || []) byDay[f.fecha] = (byDay[f.fecha] || 0) + (f.kcal || 0);
  const intakes: [string, number][] = Object.entries(byDay) as any;
  return D.estimarTdee(pesos, intakes, { sexo: profile.sexo || "m", altura: profile.altura_cm || 170, edad: P.edad(profile), pesoActual: pesos.length ? pesos[pesos.length - 1][1] : profile.peso_inicial, factor: 1.5 });
}

export async function generatePlan(uid: string, fase = "sostenible"): Promise<any> {
  const user = await getUser(uid);
  const te = await tdeeFor(uid, user.profile);
  const plan = P.generarPlan(user.profile, te, fase);
  const ver = await nextVersion(uid);
  await savePlan(uid, ver, plan, "Plan generado a partir de tus stats.", user.role);
  if (!plan.seguridad.ok) await escalateTask(uid, "Plan generado viola pisos de seguridad", plan.seguridad.violaciones.join("\n"));
  return { ok: true, version: ver, plan };
}
export async function restructurePlan(uid: string): Promise<any> {
  const user = await getUser(uid);
  const current = await activePlan(uid);
  const te = await tdeeFor(uid, user.profile);
  const adh14 = (await computeAdherence(uid, 14)).period.score;
  const { data: exRows } = await sb().from("mv_exercise_logs").select("fecha, ejercicio, grupo_muscular, series, volumen_total").eq("user_id", uid).order("fecha");
  const prog = D.progresionPorEjercicio(exRows || []);
  const sub = prog.filter((p) => p.tendencia === "subiendo").length, baj = prog.filter((p) => p.tendencia === "bajando").length;
  const liftTend = sub > baj ? "subiendo" : baj > sub ? "bajando" : "estable";
  const res = P.reestructurarPlan(user.profile, current, { cambioKgSem: te.cambio_kg_sem, adherencia: adh14, tdee: te, liftTend });
  const ver = await nextVersion(uid);
  await savePlan(uid, ver, res.plan, res.motivo, user.role);
  if (res.escalar) await escalateTask(uid, "Plan requiere revisión del médico", res.motivo + "\n" + res.advertencias.join("\n"));
  return { ok: true, version: ver, motivo: res.motivo, advertencias: res.advertencias, escalado: res.escalar, plan: res.plan, contexto: { adherencia_14d: adh14, tdee: te, fuerza: liftTend } };
}
async function nextVersion(uid: string): Promise<number> {
  const { data } = await sb().from("mv_plans").select("version").eq("user_id", uid).order("version", { ascending: false }).limit(1).maybeSingle();
  return (data?.version || 0) + 1;
}
async function savePlan(uid: string, ver: number, plan: any, motivo: string, role: string) {
  await sb().from("mv_plans").update({ activo: false }).eq("user_id", uid);
  await sb().from("mv_plans").insert({ id: newId(), user_id: uid, version: ver, tipo: "integral", contenido: plan, activo: true, motivo, aprobado_por_medico: role === "joseph" || role === "medico", fecha: todayISO(), created_at: nowIso() });
}

// ── Adherencia ──
function bucket(rows: any[]): Record<string, any[]> { const o: Record<string, any[]> = {}; for (const r of rows) (o[r.fecha] ||= []).push(r); return o; }
export async function computeAdherence(uid: string, days: number): Promise<any> {
  const user = await getUser(uid); const plan = await activePlan(uid); const profile = user.profile; const weights = profile.pillar_weights || {};
  const si = dateMinus(days - 1), ei = todayISO();
  const [foods, exers, acts, wells, bodies] = await Promise.all([
    sb().from("mv_food_logs").select("fecha, plan_match").eq("user_id", uid).gte("fecha", si).lte("fecha", ei),
    sb().from("mv_exercise_logs").select("fecha, hecho").eq("user_id", uid).gte("fecha", si).lte("fecha", ei),
    sb().from("mv_activity_proofs").select("fecha, tipo").eq("user_id", uid).gte("fecha", si).lte("fecha", ei),
    sb().from("mv_wellness_logs").select("fecha, tipo, valor").eq("user_id", uid).gte("fecha", si).lte("fecha", ei),
    sb().from("mv_body_composition").select("fecha").eq("user_id", uid).order("fecha"),
  ]);
  const fB = bucket(foods.data || []), eB = bucket(exers.data || []), aB = bucket(acts.data || []), wB = bucket(wells.data || []);
  const bodyDates = (bodies.data || []).map((r) => r.fecha);
  const daily: any[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(); d.setDate(d.getDate() - (days - 1 - i)); const f = d.toLocaleDateString("en-CA");
    const prev = bodyDates.filter((bd) => bd <= f);
    const recent = prev.length ? Math.round((new Date(f).getTime() - new Date(prev[prev.length - 1]).getTime()) / 86400000) : null;
    daily.push(D.scoreDay(f, { plan, profile, foods: fB[f] || [], exercises: eB[f] || [], activities: aB[f] || [], wellness: wB[f] || [], bodyRecentDays: recent, weights }));
  }
  return { daily, period: D.scorePeriod(daily) };
}
export async function adherenceDashboard(uid: string): Promise<any> {
  const [d1, d7, d30, prog] = await Promise.all([computeAdherence(uid, 1), computeAdherence(uid, 7), computeAdherence(uid, 30), computeAdherence(uid, 35)]);
  return { hoy: d1.daily[0], semana: d7.period, mes: d30.period, programa: { ...prog.period, garantia: prog.period.garantia } };
}
export async function adherencePeriod(uid: string, days: number): Promise<any> {
  const res = await computeAdherence(uid, days);
  return { dias: days, ...res.period, hoy: res.daily[res.daily.length - 1] || null };
}
export async function adherenceToday(uid: string): Promise<any> { return (await computeAdherence(uid, 1)).daily[0]; }

// ── Body + wellness ──
export async function bodyHistory(uid: string): Promise<any> {
  await getUser(uid);
  const { data } = await sb().from("mv_body_composition").select("id, fecha, metrics, fuente, screenshot_url").eq("user_id", uid).order("fecha");
  const hist = data || []; const series: Record<string, any[]> = {};
  for (const h of hist) for (const [k, v] of Object.entries(h.metrics || {})) if (typeof v === "number") (series[k] ||= []).push({ fecha: h.fecha, valor: v });
  const latest = hist.length ? hist[hist.length - 1].metrics : {}; const first = hist.length ? hist[0].metrics : {};
  const delta: any = {}; for (const k of Object.keys(latest)) if (typeof latest[k] === "number") delta[k] = Math.round((latest[k] - (first[k] ?? latest[k])) * 10) / 10;
  return { history: hist, series, latest, delta };
}
export async function bodyManual(uid: string, metrics: any, fecha?: string): Promise<any> {
  await getUser(uid); const sid = newId(); const f = fecha || todayISO();
  await sb().from("mv_body_composition").insert({ id: sid, user_id: uid, fecha: f, metrics, fuente: "manual", created_at: nowIso() });
  return { ok: true, id: sid, fecha: f };
}
export async function wellnessLog(uid: string, tipo: string, valor: number, meta?: number, fecha?: string): Promise<any> {
  await getUser(uid); const f = fecha || todayISO();
  await sb().from("mv_wellness_logs").upsert({ id: newId(), user_id: uid, fecha: f, tipo, valor, meta, created_at: nowIso() }, { onConflict: "user_id,fecha,tipo" });
  return { ok: true, fecha: f, tipo, valor };
}

// ── Food ──
export async function foodHistory(uid: string, fecha?: string): Promise<any> {
  await getUser(uid);
  let q = sb().from("mv_food_logs").select("*").eq("user_id", uid);
  q = fecha ? q.eq("fecha", fecha).order("created_at") : q.order("fecha", { ascending: false }).order("created_at", { ascending: false }).limit(200);
  const { data } = await q; const logs = data || [];
  const porDia: Record<string, any> = {};
  for (const lg of logs) { const d = (porDia[lg.fecha] ||= { kcal: 0, prot_g: 0, carb_g: 0, grasa_g: 0, comidas: 0 }); d.kcal += lg.kcal || 0; d.prot_g += lg.prot_g || 0; d.carb_g += lg.carb_g || 0; d.grasa_g += lg.grasa_g || 0; d.comidas += 1; }
  return { logs, por_dia: Object.entries(porDia).sort((a, b) => b[0].localeCompare(a[0])).map(([fecha, v]: any) => ({ fecha, kcal: Math.round(v.kcal * 10) / 10, prot_g: Math.round(v.prot_g * 10) / 10, carb_g: Math.round(v.carb_g * 10) / 10, grasa_g: Math.round(v.grasa_g * 10) / 10, comidas: v.comidas })) };
}
export async function foodLog(uid: string, body: any): Promise<any> {
  await getUser(uid); const f = body.fecha || todayISO(); let { kcal, prot_g, carb_g, grasa_g, descripcion } = body;
  if (body.food_id && body.cantidad_g) {
    const { data: food } = await sb().from("mv_foods").select("*").eq("id", body.food_id).maybeSingle();
    if (food) { const factor = body.cantidad_g / 100; kcal = Math.round(food.kcal * factor * 10) / 10; prot_g = Math.round(food.proteina_g * factor * 10) / 10; carb_g = Math.round(food.carbo_g * factor * 10) / 10; grasa_g = Math.round(food.grasa_g * factor * 10) / 10; descripcion = descripcion || `${food.nombre} (${Math.round(body.cantidad_g)} g)`; }
  }
  const lid = newId();
  await sb().from("mv_food_logs").insert({ id: lid, user_id: uid, fecha: f, meal_type: body.meal_type || "almuerzo", descripcion, kcal, prot_g, carb_g, grasa_g, plan_match: body.plan_match || "parcial", confianza: 1, fuente: "manual", created_at: nowIso() });
  return { ok: true, log_id: lid, fecha: f, macros: { kcal, prot_g, carb_g, grasa_g } };
}
export async function foodCorrect(logId: string, fields: any): Promise<any> {
  await sb().from("mv_food_logs").update({ ...fields, fuente: "manual", confianza: 1 }).eq("id", logId);
  return { ok: true, log_id: logId, corregido: fields };
}
export async function foodSearch(q: string, limit = 12): Promise<any[]> {
  const { data } = await sb().from("mv_foods").select("*").ilike("nombre", `%${q}%`).limit(limit);
  return (data || []).sort((a, b) => (a.es_peruano === b.es_peruano ? a.nombre.length - b.nombre.length : a.es_peruano ? -1 : 1));
}

// ── Exercise ──
function normEx(s: string): string { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
export async function exerciseToday(uid: string): Promise<any> {
  await getUser(uid); const plan = await activePlan(uid); const f = todayISO();
  const wd = (new Date().getDay() + 6) % 7;
  const dia = (plan.entrenamiento?.split || []).find((d: any) => d.dia === wd) || null;
  const { data: logged } = await sb().from("mv_exercise_logs").select("id, ejercicio, grupo_muscular, series, volumen_total").eq("user_id", uid).eq("fecha", f);
  const done = new Set((logged || []).map((r) => normEx(r.ejercicio)));
  const ejercicios = dia ? (dia.ejercicios || []).map((ej: any) => ({ ...ej, hecho: done.has(normEx(ej.nombre)) })) : [];
  // ¿Quedó pendiente la sesión de fuerza de ayer? (el home lo dice en UNA línea, sin culpa)
  const wdAyer = (wd + 6) % 7;
  let ayerPendiente = false;
  if ((plan.entrenamiento?.dias_fuerza || []).includes(wdAyer)) {
    const { data: logsAyer } = await sb().from("mv_exercise_logs").select("id").eq("user_id", uid).eq("fecha", dateMinus(1)).limit(1);
    ayerPendiente = !(logsAyer || []).length;
  }
  return { fecha: f, dia, ejercicios_plan: ejercicios, logged: logged || [], es_dia_descanso: dia === null, ayer_pendiente: ayerPendiente };
}
export async function exerciseProgression(uid: string): Promise<any> {
  await getUser(uid);
  const { data } = await sb().from("mv_exercise_logs").select("fecha, ejercicio, grupo_muscular, series, volumen_total").eq("user_id", uid).order("fecha");
  return { ejercicios: D.progresionPorEjercicio(data || []) };
}
export async function exerciseLog(uid: string, body: any): Promise<any> {
  const f = body.fecha || todayISO(); const series = body.series || []; const vol = D.serieVolumen(series);
  const plan = await activePlan(uid);
  let grupo = body.grupo_muscular;
  if (!grupo) for (const d of plan.entrenamiento?.split || []) for (const ej of d.ejercicios || []) { const t = normEx(body.ejercicio); if (normEx(ej.nombre).includes(t) || t.includes(normEx(ej.nombre))) grupo = ej.grupo; }
  const { data: prev } = await sb().from("mv_exercise_logs").select("series, volumen_total").eq("user_id", uid).ilike("ejercicio", body.ejercicio);
  const prevRows = prev || [];
  const bestPrev = Math.max(0, ...prevRows.map((r) => D.mejorE1rm(r.series || [])));
  const e1 = D.mejorE1rm(series); const esPr = e1 > bestPrev && bestPrev > 0;
  // PR multi-categoría (Hevy): e1RM + volumen de sesión + reps al peso top. Récords frecuentes
  // y honestos — solo cuentan si hay historial previo contra el que comparar.
  const bestPrevVol = Math.max(0, ...prevRows.map((r) => Number(r.volumen_total) || D.serieVolumen(r.series || [])));
  const topCarga = Math.max(0, ...series.map((s: any) => Number(s.carga_kg) || 0));
  const repsAtTop = Math.max(0, ...series.filter((s: any) => (Number(s.carga_kg) || 0) >= topCarga).map((s: any) => Number(s.reps) || 0));
  let bestPrevRepsAtTop = 0;
  for (const r of prevRows) for (const s of r.series || []) if ((Number(s.carga_kg) || 0) >= topCarga) bestPrevRepsAtTop = Math.max(bestPrevRepsAtTop, Number(s.reps) || 0);
  const prCats: Record<string, boolean> = {
    e1rm: esPr,
    volumen: vol > bestPrevVol && bestPrevVol > 0,
    reps: topCarga > 0 && bestPrevRepsAtTop > 0 && repsAtTop > bestPrevRepsAtTop,
  };
  const lid = newId();
  await sb().from("mv_exercise_logs").insert({ id: lid, user_id: uid, fecha: f, ejercicio: body.ejercicio, grupo_muscular: grupo, series, volumen_total: vol, hecho: true, fuente: body.fuente || "manual", nota: body.nota, created_at: nowIso() });
  return { ok: true, log_id: lid, volumen: vol, e1rm: e1, es_pr: esPr, pr_categorias: prCats, es_pr_alguno: prCats.e1rm || prCats.volumen || prCats.reps, mejor_e1rm_anterior: bestPrev, grupo_muscular: grupo };
}
export async function exerciseVoice(uid: string, transcript: string, fecha?: string): Promise<any> {
  const t = normEx(transcript);
  const find = (re: RegExp) => { const m = t.match(re); return m ? parseFloat(m[1].replace(",", ".")) : null; };
  const carga = find(/(\d+(?:[.,]\d+)?)\s*(?:kilo|kilos|kg)/), reps = find(/(\d+(?:[.,]\d+)?)\s*(?:rep|reps|repeticion|repeticiones)/);
  const rir = find(/(\d+(?:[.,]\d+)?)\s*(?:rir|de reserva|reserva)/), seriesN = find(/(\d+(?:[.,]\d+)?)\s*(?:serie|series)/);
  const m = transcript.match(/\d/); const nombre = (m ? transcript.slice(0, m.index) : transcript).replace(/[,.\s]+$/, "").trim();
  if (!nombre || reps == null || carga == null) return { ok: false, error: "No pude entender el ejercicio. Di algo como: 'press de pecho 35 kilos 10 reps'.", parsed: { ejercicio: nombre, carga_kg: carga, reps } };
  const n = Math.round(seriesN || 3); const serie = { reps: Math.round(reps), carga_kg: carga, rir: rir != null ? Math.round(rir) : null };
  const r = await exerciseLog(uid, { ejercicio: nombre, series: Array(n).fill(serie), fecha, fuente: "voz" });
  return { ...r, parsed: { ejercicio: nombre, ...serie, series: n } };
}

// ── Coach ──
async function escalateTask(uid: string, titulo: string, detalle: string, tipo = "revision", severidad = "revisar", data: any = {}) {
  await sb().from("mv_clinician_tasks").insert({ id: newId(), user_id: uid, tipo, severidad, titulo, detalle, origen: "agente", estado: "abierta", data, created_at: nowIso() });
}
export async function coachChat(uid: string, message: string): Promise<any> {
  const user = await getUser(uid);
  const flag = AI.matchRedFlag(message);
  if (flag) {
    await escalateTask(uid, `Bandera roja: ${flag.key.replace(/_/g, " ")}`, `${flag.motivo}\n\nMensaje: "${message}"`, "bandera_roja", flag.severidad, { red_flag: flag.key, mensaje: message });
    const mid = await logMessage(uid, message, flag.respuesta, 1, true, "redflag", []);
    return { reply: flag.respuesta, escalated: true, source: "redflag", red_flag: { key: flag.key, severidad: flag.severidad }, used_knowledge: [], confianza: 1, message_id: mid };
  }
  const { data: chunks } = await sb().from("mv_knowledge_chunks").select("knowledge_id, contenido, mv_knowledge_base!inner(titulo, fuente, categoria, tags, namespace, activo)").eq("mv_knowledge_base.namespace", "movimiento").eq("mv_knowledge_base.activo", true);
  const flat = (chunks || []).map((c: any) => ({ knowledge_id: c.knowledge_id, chunk: c.contenido, titulo: c.mv_knowledge_base.titulo, fuente: c.mv_knowledge_base.fuente, categoria: c.mv_knowledge_base.categoria, tags: c.mv_knowledge_base.tags }));
  const knowledge = D.ragRetrieve(flat, message, 4);
  const { data: hist } = await sb().from("mv_messages").select("pregunta").eq("user_id", uid).order("created_at", { ascending: false }).limit(6);
  const history = (hist || []).reverse().map((m) => ({ contenido: m.pregunta, direccion: "entrante" }));
  let { reply, source } = await AI.reasonCoach(user, message, knowledge, history);
  const esClinico = AI.CLINICOS.some((c) => AI.normTxt(message).includes(c));
  const escalado = esClinico || (knowledge.length === 0 && source === "fallback" && message.trim().endsWith("?"));
  const confianza = escalado ? 0.4 : knowledge.length ? 0.8 : 0.6;
  if (escalado) {
    const motivo = esClinico ? "Consulta clínica (dosis/medicamento)." : "Sin evidencia suficiente — requiere criterio del médico.";
    await escalateTask(uid, "Consulta escalada al médico", `${motivo}\n\nMensaje: "${message}"`, "escalamiento", "revisar", { motivo, mensaje: message });
    if (esClinico) reply = reply + " Esto ya entra en terreno médico, así que se lo dejé anotado al Dr. para que te responda con seguridad.";
  }
  const seen = new Set<string>();
  const used = knowledge.map((k) => ({ titulo: k.titulo, fuente: k.fuente })).filter((u) => { if (seen.has(u.titulo)) return false; seen.add(u.titulo); return true; });
  const mid = await logMessage(uid, message, reply, confianza, escalado, source, used);
  return { reply, escalated: escalado, source, used_knowledge: used, confianza, message_id: mid };
}
async function logMessage(uid: string, pregunta: string, respuesta: string, confianza: number, escalado: boolean, fuente: string, used: any[]): Promise<string> {
  const mid = newId();
  await sb().from("mv_messages").insert({ id: mid, user_id: uid, direccion: "entrante", pregunta, respuesta_ia: respuesta, confianza, escalado, fuente, used_knowledge: used, created_at: nowIso() });
  return mid;
}
export async function coachMessages(uid: string, limit = 50): Promise<any[]> {
  await getUser(uid);
  const { data } = await sb().from("mv_messages").select("id, pregunta, respuesta_ia, confianza, escalado, fuente, used_knowledge, created_at").eq("user_id", uid).order("created_at", { ascending: false }).limit(limit);
  return (data || []).reverse();
}
export async function coachTasks(estado = "abierta"): Promise<any[]> {
  const { data } = await sb().from("mv_clinician_tasks").select("*, mv_users!inner(nombre)").eq("estado", estado);
  const sev: any = { urgente: 0, revisar: 1, info: 2 };
  return (data || []).map((t: any) => ({ ...t, nombre: t.mv_users.nombre })).sort((a, b) => (sev[a.severidad] - sev[b.severidad]) || b.created_at.localeCompare(a.created_at));
}

// ── Retención (Hormozi: bajar effort/time-delay, perdonar la vida real) ──

/** Racha SEMANAL + freeze (Peloton/Duolingo): la unidad es la SEMANA cumplida — un día perdido
 *  no destruye meses de constancia. Semana cumplida = sesiones (días con fuerza o actividad
 *  registrada) ≥ días del plan − 1. Freeze: 1 por mes calendario, automático. Solo lectura. */
export async function weeklyStreak(uid: string): Promise<any> {
  const plan = await activePlan(uid);
  const diasPlan = (plan.entrenamiento?.split || []).length || 5;
  const meta = Math.max(2, diasPlan - 1);
  const si = dateMinus(7 * 26);
  const [ex, act] = await Promise.all([
    sb().from("mv_exercise_logs").select("fecha").eq("user_id", uid).gte("fecha", si),
    sb().from("mv_activity_proofs").select("fecha").eq("user_id", uid).gte("fecha", si),
  ]);
  const dias = new Set<string>([...(ex.data || []).map((r: any) => r.fecha), ...(act.data || []).map((r: any) => r.fecha)]);
  const fmt = (d: Date) => d.toLocaleDateString("en-CA");
  const monday = (d: Date) => { const x = new Date(d); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };
  const sesionesEn = (mon: Date) => { let n = 0; for (let i = 0; i < 7; i++) { const d = new Date(mon); d.setDate(mon.getDate() + i); if (dias.has(fmt(d))) n++; } return n; };
  const monNow = monday(new Date());
  const actual = sesionesEn(monNow);
  let semanas = 0, freezes = 0; const freezeMes = new Set<string>();
  if (actual >= meta) semanas++; // la semana en curso suma si ya cumplió; si no, ni suma ni rompe
  for (let w = 1; w <= 26; w++) {
    const mon = new Date(monNow); mon.setDate(monNow.getDate() - 7 * w);
    if (sesionesEn(mon) >= meta) { semanas++; continue; }
    const mes = fmt(mon).slice(0, 7);
    if (!freezeMes.has(mes)) { freezeMes.add(mes); freezes++; continue; } // freeze automático (1/mes)
    break;
  }
  return { semanas, freezes_usados: freezes, semana_actual: { sesiones: actual, meta }, unidad: "semana" };
}

/** Reporte de lunes (Whoop WPA): resumen 7d del motor + comparación contra TU semana pasada
 *  + 1 insight accionable del coach (adherence-neutral: reconoce y ajusta hacia adelante). */
export async function weeklyReport(uid: string): Promise<any> {
  const user = await getUser(uid);
  const res = await computeAdherence(uid, 14);
  const prev7 = D.scorePeriod(res.daily.slice(0, 7));
  const last7 = D.scorePeriod(res.daily.slice(7));
  const si = dateMinus(14);
  const { data: bodies } = await sb().from("mv_body_composition").select("fecha, metrics").eq("user_id", uid).gte("fecha", si).order("fecha");
  const pesos = (bodies || []).map((r: any) => (r.metrics || {}).peso).filter((x: any) => x != null);
  const deltaPeso = pesos.length >= 2 ? Math.round((pesos[pesos.length - 1] - pesos[0]) * 10) / 10 : null;
  const { data: exRows } = await sb().from("mv_exercise_logs").select("fecha, ejercicio, grupo_muscular, series, volumen_total").eq("user_id", uid).order("fecha");
  const prs = D.progresionPorEjercicio(exRows || []).filter((p) => p.es_pr_reciente).map((p) => p.ejercicio);
  const pares = Object.entries(last7.por_pilar || {}) as [string, any][];
  pares.sort((a, b) => (b[1].completion_avg || 0) - (a[1].completion_avg || 0));
  const fuerte = pares[0]?.[1]?.label || null;
  const debil = pares.length ? pares[pares.length - 1][1]?.label || null : null;
  let insight = "";
  if (geminiEnabled()) {
    const sys = AI.PERSONA + " Genera UN insight accionable (1-2 frases) para la semana que empieza. Reconoce lo logrado y propone UNA sola acción concreta. Sin culpa.";
    const prompt = `Resumen 7d de ${user.nombre}: adherencia ${last7.score}% (semana previa: ${prev7.score}%). Pilar más fuerte: ${fuerte}. Pilar con más margen: ${debil}. PRs recientes: ${prs.join(", ") || "ninguno"}. Cambio de peso 14d: ${deltaPeso ?? "sin datos"} kg. Insight:`;
    insight = (await geminiText(prompt, { system: sys, maxTokens: 140, temperature: 0.4 })) || "";
  }
  if (!insight) {
    insight = debil
      ? `Semana al ${last7.score}%${last7.score >= prev7.score ? " — mejor que la pasada" : ""}. La palanca de esta semana: ${String(debil).toLowerCase()}. Una sola mejora ahí sube todo el score.`
      : `Semana registrada al ${last7.score}%. Esta semana: misma estrategia, un día a la vez.`;
  }
  return {
    score_7d: last7.score, score_prev: prev7.score,
    delta_score: Math.round((last7.score - prev7.score) * 10) / 10,
    por_pilar: last7.por_pilar, prs, delta_peso_14d: deltaPeso,
    pilar_fuerte: fuerte, pilar_debil: debil, insight,
  };
}

// ── Report ──
export async function reportGuarantee(uid: string, days = 35): Promise<any> {
  const user = await getUser(uid); const res = await computeAdherence(uid, days); const period = res.period; const si = dateMinus(days - 1);
  const [food, ex, act, body, fotos] = await Promise.all([
    sb().from("mv_food_logs").select("foto_url").eq("user_id", uid).gte("fecha", si),
    sb().from("mv_exercise_logs").select("id").eq("user_id", uid).gte("fecha", si),
    sb().from("mv_activity_proofs").select("verificado").eq("user_id", uid).gte("fecha", si),
    sb().from("mv_body_composition").select("id").eq("user_id", uid).gte("fecha", si),
    sb().from("mv_food_logs").select("fecha, foto_url, created_at").eq("user_id", uid).gte("fecha", si).not("foto_url", "is", null).limit(30),
  ]);
  return { usuario: { id: user.id, nombre: user.nombre }, periodo_dias: days, adherencia_pct: period.score, elegibilidad: period.garantia,
    evidencia: { comidas_registradas: (food.data || []).length, comidas_con_foto: (food.data || []).filter((f) => f.foto_url).length, sesiones_fuerza: (ex.data || []).length, actividades: (act.data || []).length, actividades_verificadas: (act.data || []).filter((a) => a.verificado).length, mediciones_composicion: (body.data || []).length, fotos: (fotos.data || []).map((f) => ({ ...f, tipo: "comida" })) },
    por_pilar: period.por_pilar, serie_diaria: period.serie || [], decision: "PENDIENTE DE REVISIÓN MÉDICA — el sistema solo marca elegibilidad; la devolución la decide el médico." };
}

// ── Vision (persiste) ──
export async function visionMeal(uid: string, b64: string, mealType: string, fotoUrl?: string): Promise<any> {
  const plan = await activePlan(uid); const analysis = await AI.analizarComida(b64, mealType, plan); const f = todayISO(); const lid = newId();
  await sb().from("mv_food_logs").insert({ id: lid, user_id: uid, fecha: f, meal_type: mealType, descripcion: (analysis.alimentos || []).map((a: any) => a.nombre).join(", ").slice(0, 200), foto_url: fotoUrl, ai_analysis: analysis, kcal: analysis.kcal, prot_g: analysis.prot_g, carb_g: analysis.carb_g, grasa_g: analysis.grasa_g, plan_match: analysis.plan_match, confianza: analysis.confianza, fuente: "foto", created_at: nowIso() });
  return { ok: true, log_id: lid, foto_url: fotoUrl, fecha: f, analysis };
}
export async function visionBody(uid: string, b64: string, fotoUrl?: string): Promise<any> {
  const result = await AI.analizarRenpho(b64); const f = todayISO(); const sid = newId();
  await sb().from("mv_body_composition").insert({ id: sid, user_id: uid, fecha: f, metrics: result.metrics, fuente: result.fuente || "renpho", screenshot_url: fotoUrl, raw_extract: result, created_at: nowIso() });
  return { ok: true, id: sid, screenshot_url: fotoUrl, fecha: f, ...result };
}
export async function visionScreenshot(uid: string, b64: string): Promise<any> {
  const result = await AI.analizarScreenshot(b64); const f = todayISO();
  if (result.metrics?.sueno_h) await wellnessLog(uid, "sueno", Number(result.metrics.sueno_h), 7, f);
  return { ok: true, fecha: f, ...result };
}
export async function visionActivity(uid: string, b64: string, tipo: string, duracion: number, fotoUrl?: string): Promise<any> {
  const result = await AI.analizarActividad(b64, tipo); const f = todayISO(); const sid = newId();
  await sb().from("mv_activity_proofs").insert({ id: sid, user_id: uid, fecha: f, tipo: result.tipo || tipo, foto_url: fotoUrl, duracion_min: duracion, ts: nowIso(), verificado: result.verificado, created_at: nowIso() });
  return { ok: true, id: sid, foto_url: fotoUrl, fecha: f, ...result };
}
