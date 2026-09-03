// ENCAPS Plan diario — capa de datos nativa (Opción B del PROMPT_ULTRAMAESTRO_APP)
// Lee study_schedule / study_metrics / study_checks / study_sim_scores de Supabase
// (regla #11: la app SOLO lee/escribe Supabase, nunca Claude).
// Escalable: examen = 'ENCAPS' | 'MIR' | 'USMLE'. Hoy sólo ENCAPS (regla #7).
import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from './supabase';
import { ENCAPS_FICHAS_POR_TEMA, ENCAPS_VIDEO_DRIVE, ENCAPS_THEOMED_AREA, ENCAPS_THEOMED_VIDEOS, ENCAPS_COMPENDIO, ENCAPS_AREA_PREFIJO, ENCAPS_THEOMED_TEMA_SESION } from './encapsFuentes';
import { ENCAPS_VIDEOS_POR_TEMA } from './encapsVideosPorTema';
import { ENCAPS_THEOMED_RESUMENES, ENCAPS_BANCOS, ENCAPS_MAPAS_PDF, ENCAPS_POSTESTS, ENCAPS_BIBLIOTECA_QX, ENCAPS_MANUALES_THEOMED } from './encapsResumenes';
import { PRACTICA_DEEP_PRIME, PRACTICA_REPASO } from './encapsPracticaExtra';

// ── D1 por examen (para calcular el día actual) ──
export const STUDY_D1: Record<string, string> = {
  ENCAPS: '2026-09-04',   // v6.3 MANTENIMIENTO 2027-I (D1=vie 4-sep; 31-ago→3-sep no estudiados): examen 2026-II rendido el 9-ago (Joseph NO lo dio; análisis real en DATA/ENCAPS/ANALISIS_EXAMEN_2026-2_REAL.md). Meta: ENCAPS 2027-I fines de MARZO 2027. 1h/día (16:15-17:15 L-V): banqueo puro guiado por el PRONÓSTICO v3 (II 30 · I 27 · V 21 · III 13 · IV 9 · 8 críticos: I-3 V-2 II-3 III-5 I-4 II-5 II-4 IV-1/2). Feb-mar 2027: vuelve a bloque principal (fase intensiva, se re-siembra entonces). Ciclo sembrado por gen_encaps_mantenimiento_2027.js · backup study_schedule_bk_0831.
  // MIR / USMLE se agregan cuando se construyan sus cronogramas.
};
// Fechas SIN actividad (bloqueadas por Joseph) — no cuentan como día de plan.
export const STUDY_SKIP_DATES: Record<string, string[]> = {
  ENCAPS: ['2026-12-25', '2026-12-31', '2027-01-01'],  // feriados; los fines de semana se saltan por STUDY_SKIP_WEEKENDS
};
// v6 (27-ago): SÁBADOS Y DOMINGOS LIBRES en el régimen de mantenimiento — no cuentan como día de plan.
export const STUDY_SKIP_WEEKENDS: Record<string, boolean> = { ENCAPS: true };
const STUDY_TOTAL_DAYS: Record<string, number> = { ENCAPS: 103 };

// ── Tipos (espejo de las columnas study_*) ──
export interface StudyVideo {
  titulo: string; bloque?: string; release?: string;
  dur?: number; duracion_min?: number;          // data.js usa duracion_min
  prio?: string; code?: string; slides?: string | null; url?: string | null;
  unlock?: string | null; estado?: string;       // pendiente | en_progreso | bloqueado | visto
  available?: boolean;                            // release <= fecha
}
export interface StudyTheomed { subtema?: string; n_files?: number; url?: string; tipo?: string; [k: string]: unknown }
export interface StudyMaterial { label?: string; url?: string; [k: string]: unknown }
export interface StudySim {
  clave?: string; label?: string; fecha?: string; simulacro_n?: number; duracion?: string;
  theomed_bank?: { cmid?: string; label?: string; url?: string };
}
export interface StudyScheduleDay {
  examen: string; dia: number; fecha: string; weekday?: string; tipo?: string;
  codigo?: string; subtema?: string; prioridad?: string; modo?: string; nts?: string | null;
  videos: StudyVideo[]; theomed: StudyTheomed[]; material_comp: StudyMaterial[];
  simulacro?: StudySim | null; pulso?: string | null; video_min?: number; n_videos?: number;
  temas_secundarios?: { codigo: string; subtema: string; prioridad: string }[];
  primer_finde_estudio?: boolean;
  sim_cap?: number; sim_libre?: boolean;
  simulacros?: { n: number; actividad?: string; banco?: string }[];
  extra?: Record<string, unknown>;
}
export interface StudyMetrics {
  examen: string; fecha?: string; qx_pct?: number | null; ritmo_min_dia?: number | null;
  accionable_videos?: number | null; cobertura_pct?: number | null; dias_a_examen?: number | null;
  pendiente_h?: number | null; total_h?: number | null; prom_sim?: number | null;
  extra?: Record<string, unknown>;
}
export interface StudySimScore { examen: string; sim_n: number; nota?: number | null; fecha?: string }

// Item chequeable del día (mismo esquema item_key que encaps_telegram_daemon.py)
export interface PlanItem {
  key: string;            // 'D{dia}:video:{i}' | 'D{dia}:theomed:{i}' | 'D{dia}:material:{i}' | 'D{dia}:pulso' | 'D{dia}:eval' | 'D{dia}:sim'
  kind: 'video' | 'theomed' | 'material' | 'pulso' | 'eval' | 'sim';
  label: string;
  detail?: string;
  url?: string | null;    // link principal (QX videoclase | Theomed | banco sim)
  slides?: string | null; // PDF de diapositivas (Dropbox) para videos QX
  source?: string;        // fuente legible: 'QX videoclase' | 'Theomed' | …
  locked?: boolean;       // video QX aún no liberado / sin url en QX
  unlock?: string | null; // fecha en que QX libera el video
  estado?: string;        // estado QX del video (pendiente|en_progreso|bloqueado|visto)
  code?: string;          // código del tema al que pertenece el video (p.ej. II-4)
  focusDia?: number;      // día-foco deep-prime de ese código (anemia=D3, VIH=D10)
  dur?: number;           // duración en minutos (para el micro-horario)
  hora?: string;          // franja exacta dentro del NÚCLEO DEEP PRIME (09:00–09:14)
  fallbackUrl?: string;   // respaldo Drive 2026-1 si QX no liberó el video
  fallbackLabel?: string;
}

// Respaldo Google Drive 2026-1 (ciclo anterior, QxMedic) para temas que QX 2026-II
// libera por goteo y aún no publica. Para usar si QX se atrasa. (verificado en Drive)
export const DRIVE_FALLBACK_2026_1: Record<string, { label: string; url: string }> = {
  'II-4': { label: '📁 Anemia — QxMedic 2026-1', url: 'https://drive.google.com/file/d/1vFuqUuGNHKyknAvaV2SR7pK1bMXJHulK/view' },
  'II-11': { label: '📁 VIH — QxMedic 2026-1', url: 'https://drive.google.com/file/d/1vtn1-za86do_axvPTGJ9VpaSBqv2QBRm/view' },
};

// Día-foco (deep-prime) por código de tema: busca el día donde theme.codigo == code.
export function focusDayByCode(days: StudyScheduleDay[]): Record<string, number> {
  const map: Record<string, number> = {};
  for (const d of days) {
    if (d.codigo && map[d.codigo] === undefined) map[d.codigo] = d.dia;
    // multi-tema: los temas secundarios del día también tienen su día-foco = el día que caen
    for (const s of d.temas_secundarios || []) {
      if (s.codigo && map[s.codigo] === undefined) map[s.codigo] = d.dia;
    }
  }
  return map;
}

// ── Repetición espaciada por tema, DIFERENCIADA POR PRIORIDAD ───────────────
// Cada subtema recibe sus vueltas según importancia (Joseph: "algunos 5, algunos
// 4, algunos 3"). Cada array = días desde la 1ª exposición (video). Todos incluyen
// un toque temprano + uno tardío. Cepeda 2008/2006: gap óptimo ≈10-20% del tiempo
// al examen. Más prioridad = más toques intermedios.
// v5 (13-jun): plan de 58 días (examen d55=17-ago) → el intervalo máximo baja de 63 a 50
// para que la ÚLTIMA vuelta de los temas tempranos caiga ANTES del examen (mismo nº de
// vueltas). Los temas tardíos cierran con los simulacros MEGA-FINAL de los últimos sábados.
export const SPACED_INTERVALS = [1, 3, 7, 14, 28, 50]; // superset de referencia
export const REPASO_POR_PRIORIDAD: Record<string, number[]> = {
  CRITICA: [1, 3, 7, 28, 50], // 5 repasos (1ª video + 5 = 6 vueltas) · máximo refuerzo
  ALTA: [1, 7, 28, 50],       // 4 repasos (= 5 vueltas)
  MEDIA: [3, 28, 50],         // 3 repasos (= 4 vueltas)
  BAJA: [7, 50],              // 2 repasos (= 3 vueltas · mapa+PDF+banco, ligero)
};
export function normPrio(p?: string): string {
  const s = (p || '').toUpperCase();
  if (s.includes('CRÍT') || s.includes('CRIT')) return 'CRITICA';
  if (s.includes('ALTA')) return 'ALTA';
  if (s.includes('BAJA')) return 'BAJA';
  return 'MEDIA';
}
export function intervalosDe(prioridad?: string): number[] {
  return REPASO_POR_PRIORIDAD[normPrio(prioridad)] || REPASO_POR_PRIORIDAD.MEDIA;
}
export function totalVueltas(prioridad?: string): number {
  return intervalosDe(prioridad).length + 1; // +1 por la 1ª exposición (video)
}
// Comprime los intervalos para que TODAS las vueltas caigan ANTES del examen (día `examen`).
// Mantiene los que entran con holgura y redistribuye los que se pasan en la ventana restante
// [díaFoco .. examen-1]. Resuelve el fallo de los temas sembrados tarde (regla gap≈compresión
// recta-final del plan data-driven 2026-2). Mismo nº de vueltas cuando hay margen.
export function intervalosComprimidos(prioridad: string | undefined, focusDia: number, examen: number): number[] {
  const base = intervalosDe(prioridad);
  if (!focusDia || !examen || examen <= focusDia + 1) return base;
  const limit = examen - focusDia - 1; // la última vuelta cae como muy tarde la víspera del examen
  if (base[base.length - 1] <= limit) return base; // ya entran todas
  const n = base.length;
  const fit: number[] = [];
  for (const i of base) { if (i <= limit - (n - 1 - fit.length)) fit.push(i); else break; }
  const start = fit.length ? fit[fit.length - 1] : 0;
  const rem = n - fit.length;
  for (let k = 1; k <= rem; k++) fit.push(start + Math.round(((limit - start) * k) / rem));
  const res: number[] = [];
  for (const v of fit) {
    const x = Math.min(limit, Math.max(res.length ? res[res.length - 1] + 1 : 1, v));
    if (x <= limit && (!res.length || x > res[res.length - 1])) res.push(x);
  }
  return res;
}

export interface RepasoHoy {
  codigo: string; subtema: string; focusDia: number; delta: number; vuelta: number;
  prioridad: string; totalVueltas: number;
}

// Temas cuyo repaso espaciado cae HOY (su día-foco + intervalo-según-prioridad == hoy).
export function repasosDeHoy(days: StudyScheduleDay[], dia: number): RepasoHoy[] {
  const out: RepasoHoy[] = [];
  const examenDia = days.reduce((m, d) => Math.max(m, d.dia), 0); // día del examen = tope del plan
  // multi-tema: aplanar TODOS los temas sembrados (principal + secundarios) con su día-foco
  const seeded: { codigo: string; subtema: string; prioridad?: string; focusDia: number }[] = [];
  const vistos = new Set<string>();
  for (const d of days) {
    if (d.codigo && !vistos.has(d.codigo)) {
      vistos.add(d.codigo);
      seeded.push({ codigo: d.codigo, subtema: d.subtema || d.codigo, prioridad: d.prioridad, focusDia: d.dia });
    }
    for (const s of d.temas_secundarios || []) {
      if (s.codigo && !vistos.has(s.codigo)) {
        vistos.add(s.codigo);
        seeded.push({ codigo: s.codigo, subtema: s.subtema || s.codigo, prioridad: s.prioridad, focusDia: d.dia });
      }
    }
  }
  for (const t of seeded) {
    if (t.focusDia >= dia) continue;
    const delta = dia - t.focusDia;
    const intervalos = intervalosComprimidos(t.prioridad, t.focusDia, examenDia); // comprimidos → caen antes del examen
    const idx = intervalos.indexOf(delta);
    if (idx >= 0) {
      out.push({
        codigo: t.codigo, subtema: t.subtema, focusDia: t.focusDia, delta,
        vuelta: idx + 2, prioridad: normPrio(t.prioridad), totalVueltas: intervalos.length + 1,
      });
    }
  }
  out.sort((a, b) => a.delta - b.delta);
  return out;
}

const ORDINAL = ['', '1ª', '2ª', '3ª', '4ª', '5ª', '6ª', '7ª'];
export function vueltaLabel(n: number): string { return ORDINAL[n] || `${n}ª`; }

// item_key de una vuelta de repaso (chequeable, por subtema+nº de vuelta).
export function repasoKey(codigo: string, vuelta: number): string { return `repaso:${codigo}:v${vuelta}`; }

// Cuántas vueltas YA hicimos de un subtema: la 1ª (ver el video del día-foco, si pasó)
// + las vueltas de repaso marcadas como hechas. Devuelve {hechas, total}.
export function vueltasHechasDe(
  codigo: string, prioridad: string | undefined, focusDia: number, diaActual: number,
  checks: Record<string, boolean>,
): { hechas: number; total: number } {
  const total = totalVueltas(prioridad);
  let hechas = focusDia <= diaActual ? 1 : 0; // 1ª = video del día-foco ya pasado
  for (let v = 2; v <= total; v++) if (checks[repasoKey(codigo, v)]) hechas++;
  return { hechas: Math.min(hechas, total), total };
}

// ── Predicción de próximos videos QX a liberar (drip semanal) ───────────────
// QX sube por goteo; cada video tiene su fecha de liberación (unlock). Listamos
// los que aún no salieron, deduplicados por título, ordenados por fecha.
export interface ProximoVideo { titulo: string; unlock: string; code?: string; bloque?: string; url?: string | null }

export function proximosVideos(days: StudyScheduleDay[], todayISO: string, limit = 14): ProximoVideo[] {
  const seen = new Set<string>();
  const out: ProximoVideo[] = [];
  for (const d of days) {
    for (const v of d.videos || []) {
      const t = v.titulo;
      const u = v.unlock || v.release;
      if (t && u && u > todayISO && !seen.has(t)) {
        seen.add(t);
        out.push({ titulo: t, unlock: u, code: v.code, bloque: v.bloque, url: v.url });
      }
    }
  }
  out.sort((a, b) => (a.unlock < b.unlock ? -1 : a.unlock > b.unlock ? 1 : 0));
  return out.slice(0, limit);
}

// ── Helpers de fecha (Lima UTC-5) ──
function todayLimaISO(): string {
  const now = new Date();
  const lima = new Date(now.getTime() - 5 * 60 * 60 * 1000);
  return lima.toISOString().slice(0, 10);
}
export function diaActual(examen: string): number {
  const d1 = STUDY_D1[examen];
  const total = STUDY_TOTAL_DAYS[examen] ?? 71;
  if (!d1) return 1;
  const hoy = todayLimaISO();
  let diff = Math.floor((Date.parse(hoy) - Date.parse(d1)) / 86_400_000) + 1;
  // Las fechas libres no son días de plan: réstalas si ya pasaron.
  for (const s of STUDY_SKIP_DATES[examen] ?? []) {
    if (s >= d1 && s <= hoy) diff--;
  }
  // v6: si el examen salta fines de semana, los sáb/dom entre d1 y hoy no cuentan.
  if (STUDY_SKIP_WEEKENDS[examen]) {
    for (let t = Date.parse(d1); t <= Date.parse(hoy); t += 86_400_000) {
      const dow = new Date(t).getUTCDay();
      if (dow === 0 || dow === 6) diff--;
    }
  }
  return Math.max(1, Math.min(total, diff));
}

// ── Enumera los items chequeables de un día (debe coincidir con el daemon) ──
export function itemsForDay(day: StudyScheduleDay, focusByCode: Record<string, number> = {}): PlanItem[] {
  const N = day.dia;
  const items: PlanItem[] = [];
  const pad = (n: number) => String(n).padStart(2, '0');

  // ── v6 · RÉGIMEN MANTENIMIENTO 2027-I (31-ago-2026 → fines de enero): 1h/día 16:15-17:15 ──
  // Cola COMPACTA de banqueo puro; nada de videos/theomed/fichas largas. El deep work de la
  // mañana ahora es del USMLE Step 1. Feb-mar 2027: fase intensiva (se re-siembra el ciclo).
  if (day.modo === 'MANTENIMIENTO') {
    const area = ENCAPS_AREA_PREFIJO[((day.codigo || '').match(/^[IVX]+/) || [''])[0]];
    if (day.tipo === 'mini_sim') {
      items.push({
        key: `D${N}:msim`, kind: 'sim',
        label: '🔥 MINI-SIMULACRO SEMANAL: 25Q mixtas cronometradas (72s/Q)',
        detail: 'Mezcla de las 5 áreas ponderada por el pronóstico v3 · modo examen estricto, sin pausa',
        url: ENCAPS_BANCOS[0]?.url, source: ENCAPS_BANCOS[0]?.fuente || 'Banco', dur: 30, hora: '16:15–16:45',
      });
      items.push({
        key: `D${N}:msim_corr`, kind: 'eval',
        label: '📊 Corrección + registro del patrón de fallos (TRACKING_ERRORES)',
        detail: 'Cada fallo: ¿área? ¿tipo (dato fino / viñeta / norma)? → alimenta la tutoría y la rotación de la semana siguiente',
        dur: 30, hora: '16:45–17:15',
      });
      return items;
    }
    items.push({
      key: `D${N}:m_eval`, kind: 'eval',
      label: '🎯 EVAL ANCLADA: 5Q del tema de AYER (recall + corrección)',
      detail: 'Testing effect: si fallas ≥2 → el tema de ayer vuelve caliente a la rotación',
      dur: 15, hora: '16:15–16:30',
    });
    items.push({
      key: `D${N}:m_banco`, kind: 'theomed',
      label: `🎯 BANCO DEL DÍA: ${day.codigo} — ${day.subtema || ''} (20-25Q ciegas)`,
      detail: `Prioridad ${day.prioridad || 'MEDIA'} · pregunta-por-pregunta con corrección inmediata · pronóstico v3`,
      url: ENCAPS_BANCOS[0]?.url, source: ENCAPS_BANCOS[0]?.fuente || 'Banco', code: day.codigo, dur: 40, hora: '16:30–17:10',
    });
    (area ? (ENCAPS_POSTESTS[area] || []).slice(0, 1) : []).forEach((q, i) => {
      items.push({
        key: `D${N}:m_postest:${i}`, kind: 'theomed',
        label: `🎯 Postest alternativo: ${q.label}`,
        detail: 'Si el banco principal se agota para este tema',
        url: q.url, source: q.fuente, code: day.codigo,
      });
    });
    items.push({
      key: `D${N}:m_log`, kind: 'material',
      label: '📝 Registro de fallos (TRACKING_ERRORES) + 1-3 APEX de errores de conocimiento',
      detail: 'Append en _registro_resoluciones.json · los APEX caen en Obsidian ENCAPS',
      dur: 5, hora: '17:10–17:15',
    });
    return items;
  }

  let ph = 9, pm = 0; // NÚCLEO DEEP PRIME arranca 09:00 (los videos se reparten ahí)
  (day.videos || []).forEach((v, i) => {
    const dur = v.duracion_min ?? v.dur;
    const live = !!v.url;
    const locked = !live || v.estado === 'bloqueado' || v.available === false
      || !!(v.unlock && day.fecha && v.unlock > day.fecha);
    const s = `${pad(ph)}:${pad(pm)}`;
    let em = pm + (dur ?? 20), eh = ph + Math.floor(em / 60); em %= 60;
    const hora = `${s}–${pad(eh)}:${pad(em)}`;
    ph = eh; pm = em;
    items.push({
      key: `D${N}:video:${i}`, kind: 'video',
      label: v.titulo || `Video ${i + 1}`,
      detail: [v.code, dur ? `${dur}min` : null, v.prio].filter(Boolean).join(' · '),
      url: v.url, slides: v.slides, locked, unlock: v.unlock, estado: v.estado,
      source: live ? 'QX videoclase' : 'QX — no liberado',
      code: v.code, focusDia: v.code ? focusByCode[v.code] : undefined, dur, hora,
      fallbackUrl: (locked && v.code) ? DRIVE_FALLBACK_2026_1[v.code]?.url : undefined,
      fallbackLabel: (locked && v.code) ? DRIVE_FALLBACK_2026_1[v.code]?.label : undefined,
    });
  });
  // helper: asigna franja horaria continuando el reloj donde terminaron los videos
  const slot = (mins: number) => {
    const s = `${pad(ph)}:${pad(pm)}`;
    let em = pm + mins, eh = ph + Math.floor(em / 60); em %= 60;
    const h = `${s}–${pad(eh)}:${pad(em)}`;
    ph = eh; pm = em;
    return h;
  };
  // VIDEO alternativo Google Drive (DR LOPEZ áreas I/II/III · GALENO áreas IV/V) → "Cola QX de hoy":
  // 2ª opción a QX para CADA tema (y respaldo principal en los temas sin video QX). Theomed NO aloja
  // videos de clase por tema (verificado: carpetas=PDF, sesiones=PPT/PDF + post-tests, sin Vimeo/YouTube).
  if (day.codigo && day.tipo === 'deep_prime') {
    // ── ⚡ ENFOQUE PREGUNTAS-PRIMERO (Joseph 16-jul · recta final 17-jul→5-ago) ──
    // El método vira a RESOLVER PREGUNTAS + mapas conceptuales. Los videos LARGOS pasan a OPCIONAL
    // (solo si sobra tiempo tras las preguntas). Se mide por % ciego, no por videos vistos.
    items.push({
      key: `D${N}:metodo`, kind: 'material',
      label: '⚡ MÉTODO: BANQUEO + MAPAS CONCEPTUALES (los videos generales quedan FUERA del plan diario)',
      detail: 'Recta final (Palmerton): resuelve PREGUNTAS ciegas primero (motor diario + postests/Kahoots Theomed + banco QX), luego revisa el MAPA CONCEPTUAL + resumen del tema. NO ver videos largos de inicio — están de referencia en la tarjeta de cobertura por si un tema no te cierra. Mídete por % ciego, no por videos vistos.',
      source: 'Método · banqueo + mapas',
    });
    const _areaBanco = ENCAPS_AREA_PREFIJO[(day.codigo.match(/^[IVX]+/) || [''])[0]];
    // 🎯 BANCOS DE PREGUNTAS — el centro del método: se banquea PRIMERO, el mapa se revisa después.
    ENCAPS_BANCOS.forEach((b, i) => {
      items.push({
        key: `D${N}:banco:${i}`, kind: 'theomed',
        label: `🎯 BANQUEO: ${b.label}`,
        detail: 'Resuelve preguntas CIEGAS del tema de hoy · luego revisa el mapa conceptual y recalibra (Palmerton)',
        url: b.url, source: b.fuente, dur: i === 0 ? 45 : 15, hora: slot(i === 0 ? 45 : 15),
      });
    });
    // POSTESTS del área con LINK DIRECTO (50 quizzes verificados 19-jul) = banco por tema
    (_areaBanco ? (ENCAPS_POSTESTS[_areaBanco] || []) : []).forEach((q, i) => {
      items.push({
        key: `D${N}:postest:${i}`, kind: 'theomed',
        label: `🎯 ${q.label}`,
        detail: 'Postest Theomed con link directo · banquea a ciegas y recalibra',
        url: q.url, source: q.fuente, dur: 12, hora: slot(12),
      });
    });
    // índice del área en Theomed (por si quiere navegar a la sesión completa)
    const _thBanco = _areaBanco ? ENCAPS_THEOMED_AREA[_areaBanco] : undefined;
    if (_thBanco) items.push({
      key: `D${N}:banco:area`, kind: 'theomed',
      label: `📂 Theomed ${_areaBanco} — índice del área (${_thBanco.n} recursos)`,
      detail: 'Sesiones, PPTs, postests y normas técnicas del área',
      url: _thBanco.url, source: 'Theomed área', dur: 10, hora: slot(10),
    });
    // 🗺️ PDF de mapas conceptuales del área + biblioteca QX de mapas (repaso de un vistazo)
    const _pdfMapas = _areaBanco ? ENCAPS_MAPAS_PDF[_areaBanco] : undefined;
    if (_pdfMapas) items.push({
      key: `D${N}:mapaspdf`, kind: 'material',
      label: `🗺️ ${_pdfMapas.label}`,
      detail: 'Compilado QX de mapas conceptuales del área — repasa el área entera de un vistazo tras banquear',
      url: _pdfMapas.url, source: _pdfMapas.fuente, dur: 15, hora: slot(15),
    });
    items.push({
      key: `D${N}:bibliotecaqx`, kind: 'material',
      label: `🗺️ ${ENCAPS_BIBLIOTECA_QX.label}`,
      detail: 'Biblioteca QX: sección de Mapas Conceptuales + fichas MINSA de Fundamentos Teóricos',
      url: ENCAPS_BIBLIOTECA_QX.url, source: ENCAPS_BIBLIOTECA_QX.fuente, dur: 10, hora: slot(10),
    });
    // Manual del área (consulta puntual, NO lectura lineal)
    const _man = _areaBanco ? ENCAPS_MANUALES_THEOMED[_areaBanco] : undefined;
    if (_man) items.push({
      key: `D${N}:manual`, kind: 'material',
      label: `📕 ${_man.label} (consulta puntual)`,
      detail: 'Solo para resolver una duda concreta tras banquear — NO leer lineal',
      url: _man.url, source: _man.fuente, dur: 5, hora: slot(5),
    });
    // ── FASE 2 · RESÚMENES/THEOPEPAS Theomed — PRIORIDAD sobre las sesiones en vivo (Joseph 10-jul) ──
    // Material ya digerido → agiliza incorporar conocimiento. Van ANTES del video largo/sesión en vivo;
    // el video grande queda de respaldo si sobra tiempo ese día. (La cola QX ya prioriza mapas conceptuales.)
    const _codesHoy = [day.codigo, ...((day.temas_secundarios || []).map(s => s.codigo))].filter(Boolean);
    _codesHoy.forEach(cod => {
      (ENCAPS_THEOMED_RESUMENES[cod] || []).forEach((r, i) => {
        items.push({
          key: `D${N}:resumen:${cod}:${i}`, kind: 'material',
          label: `⭐ RESUMEN Fase 2: ${r.label}`,
          detail: `${r.fuente} · ya digerido → VELO PRIMERO; la sesión en vivo es respaldo si te alcanza el tiempo`,
          url: r.url, source: r.fuente, dur: 10, hora: slot(10),
        });
      });
    });
    const areaV = ENCAPS_AREA_PREFIJO[(day.codigo.match(/^[IVX]+/) || [''])[0]];
    const vd = areaV ? ENCAPS_VIDEO_DRIVE[areaV] : undefined;
    if (vd) {
      const sinQX = (day.videos || []).filter(v => v.url).length === 0;
      items.push({
        key: `D${N}:vdrive`, kind: 'video', label: vd.label,
        detail: sinQX ? 'QX no tiene video de este tema → usa este' : `2ª opción · alternativa a QX (${vd.acad})`,
        url: vd.url, source: `Video Drive · ${vd.acad}`, dur: vd.min, hora: slot(vd.min),
      });
    }
    // 3ª opción: CLASES GRABADAS de Theomed por área (Vimeo: en vivo + asincrónicas, cada una con PDF)
    const tv = areaV ? ENCAPS_THEOMED_VIDEOS[areaV] : undefined;
    if (tv && tv.nVideos > 0) {
      items.push({
        key: `D${N}:thvideo`, kind: 'video',
        label: `🎥 Clases grabadas Theomed ${areaV} (${tv.nVideos} videos)`,
        detail: 'En vivo + asincrónicas (Vimeo) · cada una con su PDF · lista completa en 📚 Material',
        url: tv.envivoUrl || tv.asincUrl, source: 'Theomed grabado', dur: 30, hora: slot(30),
      });
    }
    // UBICACIÓN EXACTA del tema en el video grabado de Theomed: sesión + diapositiva → ~% del video.
    // Mapeado leyendo el "TEMARIO DE HOY" de los 29 PDFs asincrónicos (HOJA DE RUTA + PDF de sesión).
    const ts = ENCAPS_THEOMED_TEMA_SESION[day.codigo];
    if (ts) {
      const secUrl = ENCAPS_THEOMED_VIDEOS[ts.area]?.asincUrl || ts.slidesUrl;
      const otras = ts.otras && ts.otras.length ? ` · también en Ses ${ts.otras.map(o => o.sesion).join(', ')}` : '';
      items.push({
        key: `D${N}:thtema`, kind: 'video',
        label: `🎯 Theomed: este tema en Sesión ${ts.sesion} (${ts.area}) · ≈ diap. ${ts.slide}/${ts.nSlides} (~${ts.pct}% del video)`,
        detail: `Ubicación por índice de diapositivas (TEMARIO DE HOY del PDF de sesión)${otras} · slides: ${ts.slidesUrl}`,
        url: secUrl, source: 'Theomed grabado · ubicación exacta', dur: 25, hora: slot(25),
      });
    } else if (areaV && (ENCAPS_THEOMED_VIDEOS[areaV]?.nVideos ?? 0) > 0) {
      // Sub-tema no aislado en el índice del temario Theomed → está integrado en las clases del área.
      const tv = ENCAPS_THEOMED_VIDEOS[areaV];
      items.push({
        key: `D${N}:thtema`, kind: 'video',
        label: `🎯 Theomed ${areaV}: repásalo dentro de las clases grabadas del área`,
        detail: 'Este sub-tema no aparece aislado en el índice del temario — está integrado en las sesiones del área',
        url: tv.asincUrl || tv.envivoUrl, source: 'Theomed grabado · por área', dur: 25, hora: slot(25),
      });
    }
  }
  // Fichas técnicas MINSA de QxMedic (Biblioteca Fundamentos Teóricos) — MATERIAL QX, con hora
  const _fichas = day.codigo ? (ENCAPS_FICHAS_POR_TEMA[day.codigo] || []) : [];
  _fichas.forEach((f, i) => {
    items.push({
      key: `D${N}:qxficha:${i}`, kind: 'material',
      label: `📄 MINSA: ${f.titulo}`, detail: `Ficha QxMedic · ${f.min}min`,
      url: f.url, source: 'QX · Ficha MINSA', dur: f.min, hora: slot(f.min),
    });
  });
  // Carpetas Theomed del tema (PDFs/normas) — con hora
  (day.theomed || []).forEach((t, i) => {
    items.push({
      key: `D${N}:theomed:${i}`, kind: 'theomed',
      label: `Theomed: ${t.subtema || `bloque ${i + 1}`}`,
      detail: t.n_files ? `${t.n_files} archivos` : (t.tipo || undefined),
      url: t.url, source: 'Theomed', dur: 8, hora: slot(8),
    });
  });
  // Acceso Theomed por ÁREA (sesiones + PPTs + POSTESTS + repasos · incl. lo que libere por vueltas)
  const _area = day.codigo ? ENCAPS_AREA_PREFIJO[(day.codigo.match(/^[IVX]+/) || [''])[0]] : undefined;
  const _tarea = _area ? ENCAPS_THEOMED_AREA[_area] : undefined;
  if (_tarea) {
    items.push({
      key: `D${N}:tharea`, kind: 'theomed',
      label: `📂 Theomed ${_area} — sesiones + PPTs + POSTESTS + repasos`,
      detail: `${_tarea.n} recursos · incl. lo que libere por vueltas`,
      url: _tarea.url, source: 'Theomed área', dur: 20, hora: slot(20),
    });
  }
  // COMPENDIO DR LOPEZ del área (Google Drive · resumen completo) — material clave de repaso
  const _comp = _area ? ENCAPS_COMPENDIO[_area] : undefined;
  if (_comp) {
    items.push({
      key: `D${N}:compendio`, kind: 'material',
      label: `🎯 Compendio ${_area} (DR LOPEZ · resumen del área)`,
      detail: 'Google Drive · resumen completo del área para repaso', url: _comp,
      source: 'Compendio DR LOPEZ', dur: 20, hora: slot(20),
    });
  }
  // ── TEMAS SECUNDARIOS del día (front-load multi-tema: TODO el temario en ≤20 días, Pareto) ──
  // Cada tema adicional rinde su propio bloque: videos QX (ENCAPS_VIDEOS_POR_TEMA), ubicación Theomed,
  // fichas MINSA y compendio/Drive si es un área nueva. Su día-foco = este día → arranca su cadena de vueltas.
  const _areasHechas = new Set<string>();
  if (_area) _areasHechas.add(_area);
  (day.temas_secundarios || []).forEach((sec, si) => {
    const cod = sec.codigo;
    const areaS = ENCAPS_AREA_PREFIJO[(cod.match(/^[IVX]+/) || [''])[0]];
    items.push({
      key: `D${N}:sec${si}`, kind: 'material',
      label: `▶ TEMA ${cod} · ${sec.subtema}`,
      detail: `Tema adicional del día (${sec.prioridad}) · cobertura Fase 1 · inicia su cadena de vueltas hoy`,
      source: 'Tema del día',
    });
    (ENCAPS_VIDEOS_POR_TEMA[cod] || []).forEach((v, i) => {
      const locked = !v.url;
      const vdur = v.dur ?? 20;
      items.push({
        key: `D${N}:sec${si}:video:${i}`, kind: 'video',
        label: v.titulo, detail: [v.code, v.dur ? `${v.dur}min` : null].filter(Boolean).join(' · '),
        url: v.url, slides: v.slides, locked,
        source: locked ? 'QX — no liberado' : 'QX videoclase',
        code: v.code, focusDia: focusByCode[cod], dur: vdur, hora: slot(vdur),
      });
    });
    const tss = ENCAPS_THEOMED_TEMA_SESION[cod];
    if (tss) {
      const secUrl = ENCAPS_THEOMED_VIDEOS[tss.area]?.asincUrl || tss.slidesUrl;
      items.push({
        key: `D${N}:sec${si}:thtema`, kind: 'video',
        label: `🎯 Theomed ${cod}: Sesión ${tss.sesion} · ≈ diap. ${tss.slide}/${tss.nSlides} (~${tss.pct}%)`,
        detail: 'Ubicación exacta en la clase grabada', url: secUrl,
        source: 'Theomed grabado · ubicación', dur: 20, hora: slot(20),
      });
    }
    (ENCAPS_FICHAS_POR_TEMA[cod] || []).forEach((f, i) => {
      items.push({
        key: `D${N}:sec${si}:ficha:${i}`, kind: 'material',
        label: `📄 MINSA: ${f.titulo}`, detail: `Ficha QxMedic · ${f.min}min`,
        url: f.url, source: 'QX · Ficha MINSA', dur: f.min, hora: slot(f.min),
      });
    });
    if (areaS && !_areasHechas.has(areaS)) {
      _areasHechas.add(areaS);
      const comp = ENCAPS_COMPENDIO[areaS];
      if (comp) items.push({
        key: `D${N}:sec${si}:comp`, kind: 'material',
        label: `🎯 Compendio ${areaS} (DR LOPEZ)`, detail: 'Resumen del área para repaso',
        url: comp, source: 'Compendio DR LOPEZ', dur: 20, hora: slot(20),
      });
      const vd2 = ENCAPS_VIDEO_DRIVE[areaS];
      if (vd2) items.push({
        key: `D${N}:sec${si}:vdrive`, kind: 'video',
        label: vd2.label, detail: `2ª opción de video (${vd2.acad})`,
        url: vd2.url, source: `Video Drive · ${vd2.acad}`, dur: vd2.min, hora: slot(vd2.min),
      });
    }
  });
  // ── DÍA DE REPASO (Fase 2/3: tras cubrir todo el temario, solo vueltas + preguntas + mapas) ──
  if (day.tipo === 'repaso') {
    items.push({
      key: `D${N}:banco`, kind: 'eval',
      label: '🎯 Banco de preguntas del día (retrieval activo)',
      detail: 'QX BanqueApp + Eval del Tema + simulacros cortos · prioriza lo más rentable y tus fallos',
      dur: 90, hora: slot(90),
    });
    items.push({
      key: `D${N}:mapas`, kind: 'material',
      label: '🧠 Mapas conceptuales + repaso espaciado',
      detail: 'Construye/repasa los mapas de los temas que caen hoy (ver "Repasos de hoy") · 2ª fase Theomed',
      dur: 60, hora: slot(60),
    });
    // 🎯 PRÁCTICA EXTRA (días de preguntas): arsenal completo Theomed + DR LOPEZ (más preguntas/día)
    PRACTICA_REPASO.forEach((pe, i) => {
      items.push({
        key: `D${N}:practica:${i}`, kind: pe.tipo === 'normativa' ? 'material' : 'eval',
        label: `🎯 ${pe.label}`, detail: 'Práctica extra · banco de preguntas / simulacros / kahoot',
        url: pe.url, source: 'Práctica extra', dur: pe.min, hora: slot(pe.min),
      });
    });
  }
  // Material complementario (norma/guía + banco + Drive) — clave para temas normativa; con hora
  (day.material_comp || []).forEach((m, i) => {
    const mm = m as { label?: string; url?: string | null; tipo?: string; min?: number };
    const mins = mm.min ?? 12;
    items.push({
      key: `D${N}:material:${i}`, kind: 'material',
      label: mm.label || `Material ${i + 1}`,
      detail: mm.tipo, url: mm.url ?? null,
      source: 'Material complementario', dur: mins,
      hora: mm.url ? slot(mins) : undefined,
    });
  });
  if (day.pulso) {
    items.push({ key: `D${N}:pulso`, kind: 'pulso', label: 'PULSO', detail: String(day.pulso) });
  }
  if (day.tipo === 'deep_prime') {
    items.push({ key: `D${N}:eval`, kind: 'eval', label: 'Evaluación', detail: 'QX Eval del Tema + BanqueApp + POSTEST Theomed', dur: 30, hora: slot(30) });
    // 🎯 PRÁCTICA EXTRA (día de tema): banco/kahoot ligero del día (Theomed + DR LOPEZ)
    PRACTICA_DEEP_PRIME.forEach((pe, i) => {
      items.push({
        key: `D${N}:practica:${i}`, kind: 'eval',
        label: `🎯 ${pe.label}`, detail: 'Práctica extra del tema · preguntas / kahoot / simulacros',
        url: pe.url, source: 'Práctica extra', dur: pe.min, hora: slot(pe.min),
      });
    });
  }
  // v6 (13-jun): un día-examen puede tener 2-4 simulacros (extra.sims) → cada uno es un
  // item chequeable propio (key D{N}:sim:{i}). Fallback al simulacro singular (legacy).
  const simList = (day.extra && Array.isArray((day.extra as { sims?: unknown }).sims))
    ? (day.extra as { sims: Array<{ label?: string; fuente?: string; duracion?: string; url?: string }> }).sims
    : null;
  if (simList && simList.length) {
    simList.forEach((s, i) => {
      items.push({
        key: `D${N}:sim:${i}`, kind: 'sim',
        label: s.label || `Simulacro ${i + 1}`,
        detail: [s.fuente, s.duracion].filter(Boolean).join(' · ') || undefined,
        url: s.url || null,
      });
    });
  } else if (day.simulacro) {
    const s = day.simulacro;
    items.push({
      key: `D${N}:sim`, kind: 'sim',
      label: `Simulacro ${s.clave || s.label || ''}`.trim(),
      detail: s.duracion, url: s.theomed_bank?.url,
    });
  }
  return items;
}

// ── Queries Supabase ──
async function fetchSchedule(examen: string): Promise<StudyScheduleDay[]> {
  const { data, error } = await supabase
    .from('study_schedule')
    .select('*')
    .eq('examen', examen)
    .order('dia', { ascending: true });
  if (error || !data) return [];
  return data as StudyScheduleDay[];
}
async function fetchMetrics(examen: string): Promise<StudyMetrics | null> {
  const { data, error } = await supabase
    .from('study_metrics').select('*').eq('examen', examen).limit(1);
  if (error || !data || data.length === 0) return null;
  return data[0] as StudyMetrics;
}
async function fetchChecks(examen: string): Promise<Record<string, boolean>> {
  const { data, error } = await supabase
    .from('study_checks').select('item_key, checked').eq('examen', examen);
  const map: Record<string, boolean> = {};
  if (!error && data) for (const r of data as { item_key: string; checked: boolean }[]) map[r.item_key] = !!r.checked;
  return map;
}
async function fetchSimScores(examen: string): Promise<StudySimScore[]> {
  const { data, error } = await supabase
    .from('study_sim_scores').select('*').eq('examen', examen).order('sim_n', { ascending: true });
  if (error || !data) return [];
  return data as StudySimScore[];
}

export async function setStudyCheck(examen: string, itemKey: string, checked: boolean): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('study_checks')
      .upsert({ examen, item_key: itemKey, checked, ts: new Date().toISOString() }, { onConflict: 'examen,item_key' });
    return !error;
  } catch {
    return false;
  }
}
export async function setStudySimScore(examen: string, simN: number, nota: number | null, fecha?: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('study_sim_scores')
      .upsert({ examen, sim_n: simN, nota, fecha, updated_at: new Date().toISOString() }, { onConflict: 'examen,sim_n' });
    return !error;
  } catch {
    return false;
  }
}

// ── Hook principal ──
export interface UseEncapsPlan {
  loading: boolean;
  dia: number;
  total: number;
  today: StudyScheduleDay | null;
  days: StudyScheduleDay[];
  metrics: StudyMetrics | null;
  checks: Record<string, boolean>;
  simScores: Record<number, StudySimScore>;
  simDays: StudyScheduleDay[];
  todayItems: PlanItem[];
  doneToday: number;
  totalToday: number;
  repasos: RepasoHoy[];
  proximos: ProximoVideo[];
  hoyDia: number;                       // día real de hoy (para el botón "Hoy")
  setDia: (d: number) => void;          // navegar a otro día (ver plan completo)
  toggleCheck: (itemKey: string, value: boolean) => void;
  saveSim: (simN: number, nota: number | null, fecha?: string) => void;
  refetch: () => void;
}

export function useEncapsPlan(examen: string = 'ENCAPS'): UseEncapsPlan {
  const [days, setDays] = useState<StudyScheduleDay[]>([]);
  const [metrics, setMetrics] = useState<StudyMetrics | null>(null);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [simScores, setSimScores] = useState<Record<number, StudySimScore>>({});
  const [loading, setLoading] = useState(true);

  const hoyDia = diaActual(examen);
  const total = STUDY_TOTAL_DAYS[examen] ?? 71;
  const [dia, setDiaRaw] = useState(hoyDia);
  const setDia = useCallback((d: number) => setDiaRaw(Math.max(1, Math.min(total, d))), [total]);

  const load = useCallback(async () => {
    const [sched, met, chk, sims] = await Promise.all([
      fetchSchedule(examen), fetchMetrics(examen), fetchChecks(examen), fetchSimScores(examen),
    ]);
    setDays(sched);
    setMetrics(met);
    setChecks(chk);
    const sm: Record<number, StudySimScore> = {};
    for (const s of sims) sm[s.sim_n] = s;
    setSimScores(sm);
    setLoading(false);
  }, [examen]);

  useEffect(() => {
    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, [load]);

  const today = useMemo(() => days.find(d => d.dia === dia) ?? null, [days, dia]);
  const simDays = useMemo(() => days.filter(d => d.simulacro), [days]);
  const focusByCode = useMemo(() => focusDayByCode(days), [days]);
  const todayItems = useMemo(() => (today ? itemsForDay(today, focusByCode) : []), [today, focusByCode]);
  const repasos = useMemo(() => repasosDeHoy(days, dia), [days, dia]);
  const proximos = useMemo(() => proximosVideos(days, todayLimaISO()), [days]);
  const totalToday = todayItems.length;
  const doneToday = todayItems.reduce((n, it) => n + (checks[it.key] ? 1 : 0), 0);

  const toggleCheck = useCallback((itemKey: string, value: boolean) => {
    setChecks(prev => ({ ...prev, [itemKey]: value }));  // optimista
    setStudyCheck(examen, itemKey, value);
  }, [examen]);

  const saveSim = useCallback((simN: number, nota: number | null, fecha?: string) => {
    setSimScores(prev => ({ ...prev, [simN]: { examen, sim_n: simN, nota, fecha } }));
    setStudySimScore(examen, simN, nota, fecha);
  }, [examen]);

  return {
    loading, dia, total, today, days, metrics, checks, simScores, simDays,
    todayItems, doneToday, totalToday, repasos, proximos, hoyDia, setDia, toggleCheck, saveSim, refetch: load,
  };
}
