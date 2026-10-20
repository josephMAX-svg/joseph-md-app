/**
 * mirData.ts — Sección MIR (España · ProMIR). Distilada de STUDY_HUB/04_MIR_promir.md
 * + 10_MIR_promir_detalle.md. Estructura ENCAPS (prioridad/vueltas) + táctica de examen.
 * v3b (12-sep-2026): métricas calibradas a Top 50 (MIR_HITOS con mínimo on-track por hito, bandas de
 * simulacro en netas, fases reales del calendario) + táctica −1/3 con las reglas de Palmerton.
 * v6.03 (20-oct-2026 · corrimiento D1 = mié 21-oct; lun 19 y mar 20-oct sin estudio · Joseph: «simplemente corre, alarga las fechas límite»):
 *   1.ª vuelta mié 21-oct → mié 10-feb (78; D77 mini-MIR mar 9-feb) · mantenimiento jue 11-feb → jue 6-may (57, mismas filas; lun 3 → jue 6-may
 *   ya en el SERUMS) · extensión vie 7-may → vie 24-sep (121: absorbe los 2 días) + 11 REPUESTAS tras el examen Step 1 (mar 28-sep → mar 12-oct-2027:
 *   las 9 de v6.02c + 2 de v6.03; piso por asignatura: nadie baja de lo publicado) → handoff mar 12-oct-2027 (MIR_MANT_META.fin). 189 sesiones.
 * v6.02c (18-oct-2026 · Joseph «si se recortó algo, alárgalo»): la extensión recupera lo que perdieron v6.01/v6.02 (2 Tier C de la vuelta 3
 *   + 7 banco + 2 viernes) como 9 filas REPUESTAS tras el examen Step 1 (mar 28-sep → vie 8-oct-2027; MIR_MANT_META.ext.repuestas) → el
 *   handoff pasa a la última sesión del banqueo (vie 8-oct = MIR_MANT_META.fin); el nombre del hito y MIR_CALENDARIO se derivan del META.
 * v6.02 (17-oct-2026 · corrimiento D1 = lun 19-oct): 1.ª vuelta lun 19-oct → lun 8-feb (78) · mantenimiento mar 9-feb → mar 4-may (57, mismas
 *   filas; lun 3 y mar 4-may ya en el SERUMS) · extensión mié 5-may → vie 24-sep (123: absorbe los 5 días) · handoff sin cambio (vie 24-sep).
 * v6.01 (10-oct-2026 · corrimiento D1 = lun 12-oct): 1.ª vuelta lun 12-oct → lun 1-feb (78) · mantenimiento mar 2-feb → mar 27-abr (57,
 *   mismas filas) · extensión mié 28-abr → vie 24-sep (128: absorbe los 3 días) · handoff sin cambio (vie 24-sep). Los textos de
 *   MIR_CALENDARIO formatean las fechas desde MIR_DAILY_META / MIR_MANT_META (antes el mes y el día de la semana iban escritos a mano).
 * v6.00 (6-oct-2026 · V6_ESPEC §D · DJ-4): MIR 1 h/día en TODAS las fases → mantenimiento jue 28-ene → jue 22-abr (57 filas, sin modo
 *   reducido) + EXTENSIÓN vie 23-abr → vie 24-sep (131 filas; L-S desde el SERUMS) · protegidos v6 (vie 12-mar · sáb 13 · dom 14-mar ENCAPS
 *   · lun 15-mar · sáb 25 / dom 26 / lun 27-sep Step 1) + Semana Santa (25-26-mar) sin sesión; los v5.20 (22-feb · 9-mar · 10-mar) ya
 *   no existen · el handoff a la fase principal pasa al vie 24-sep-2027 (MIR_MANT_META.handoff; fase principal desde oct-2027).
 */
import { Prioridad, PRIORIDAD_COLOR, VUELTAS } from './researchData';
import { mirReadinessDerivado, MirReadiness, mirEvalLogLoad, MirEvalEntry } from './mirEvalLog';
import { mirDiaN, MIR_DAILY_META } from './mirDailyPlan';
import { MIR_MANT_META } from './mirMantenimiento';
import { FECHAS_V6 } from './fechasV6';
export { PRIORIDAD_COLOR, VUELTAS };
export type { Prioridad };

export const MIR_META = {
  titulo: 'MIR · España',
  subtitulo: 'ProMIR · Top 50 → Dermatología Hospital Clínic Barcelona',
  accent: '#F5A623', // amber (consola española)
  flag: '🇪🇸',
  tesis: 'El nº de preguntas no es todo: divide por el tamaño del temario. Bloques pequeños que caen mucho = oro. Empieza por Epidemiología + Bioética (D1-D4: 3 capítulos de Epi = 70 % de sus ~10 Q/año), luego Cardiología (la reina). Aprendizaje basado en preguntas desde el día 1, medido por % ciego (neto = A − F/3).',
};

export const MIR_KPIS = { asignaturasTierS: 3, vueltasCritica: 6, simulacrosMeta: 1 };

// ── HITOS · trayectoria objetivo hacia Top 50 (mínimo on-track por hito, en % neto ciego) ──
// Referencias de netas (gap 5, análisis v3b · verificado en web el 6-sep-2026 y registrado en
// DATA/USMLE/_palmerton_v3_extractos/gaps_v3b_mir.json): MIR 2026 nº1 = 188 netas/200 (récord) · MIR 2025:
// última plaza de Dermatología = 137,8 netas (puesto 233) · top-1000 ≈ 126,7 · >3.000 ≈ 110.
// → Top 50 ≈ 150-165 netas (75-82 % neto) según la dificultad del año. Las tablas oficiales netas–nº de orden
// (Ministerio, listados de adjudicación 2025/2026) quedan A VERIFICAR (12-sep) y se recalibran cada año con
// el examen recién rendido (ROADMAP regla 3).
export interface MirHito { clave: string; nombre: string; fecha: string; min: number; fase: string; nota: string; }
/** v6.02c: «vie 8-oct-2027» desde un ISO (para el nombre del hito handoff; function declaration → sin TDZ). */
function _fechaLarga(iso: string): string {
  const wd = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'][new Date(iso + 'T12:00:00Z').getUTCDay()];
  const mes = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][Number(iso.slice(5, 7)) - 1];
  return `${wd} ${Number(iso.slice(8, 10))}-${mes}-${iso.slice(0, 4)}`;
}
export const MIR_HITOS: MirHito[] = [
  { clave: 'mini-MIR', nombre: 'mini-MIR 40Q mixto (D77)', fecha: mirDiaN(77)?.fecha || '2027-02-09', min: 50, fase: '1ª vuelta', nota: 'baseline honesto tras 76 temas; 40Q ⇒ ±2,5 pp por pregunta' }, // v6.03: fallback = D77 mar 9-feb (v6.02: vie 5-feb · v6.01: vie 29-ene)
  // v6.03: handoff = última sesión del banqueo (mar 12-oct-2027: cierra las 11 repuestas tras el Step 1; MIR_MANT_META.fin) · v6.02c: vie 8-oct-2027 (9 repuestas) · v6.00-v6.02: vie 24-sep-2027 (día de plan anterior al ritual del Step 1); v5.20: jue 22-abr.
  { clave: 'handoff', nombre: `Handoff ${_fechaLarga(MIR_MANT_META.fin)} (entrada a la fase principal, oct-2027)`, fecha: MIR_MANT_META.fin, min: 60, fase: 'banqueo', nota: 'tabla de neto por asignatura (cierres + mini-MIR + mantenimiento + extensión) + stats FSRS del deck (retention 0,85 → 0,90)' },
  { clave: '1ª vuelta', nombre: 'Fin de la 1ª vuelta completa (dic-2027)', fecha: '2027-12-31', min: 68, fase: 'principal', nota: 'simulacro 200Q oficial cronometrado (examenesmir.com)' },
  { clave: 'sims 2028', nombre: 'Simulacros 2028', fecha: '2028-12-31', min: 75, fase: 'principal', nota: '≈150 netas: borde inferior de la banda Top 50' },
  { clave: 'sims 2029', nombre: 'Simulacros 2029', fecha: '2029-12-31', min: 82, fase: 'competición', nota: '≈165 netas: banda Top 50 en un año difícil' },
  { clave: 'MIR 2030', nombre: 'Examen MIR 2030', fecha: '2030-01-31', min: 82, fase: 'examen', nota: 'fecha exacta de la convocatoria A VERIFICAR (12-sep): cota fin de enero' },
];
export const MIR_HITOS_FUENTE = 'Netas de referencia: MIR 2026 nº1 = 188/200 · MIR 2025 Derma última plaza 137,8 (puesto 233) · top-1000 ≈ 126,7 (web 6-sep-2026, gaps_v3b_mir.json). Tablas oficiales netas–nº de orden A VERIFICAR (12-sep). Recalibración anual con el examen recién rendido.';
export interface MirDistanciaOnTrack { hito: MirHito; valor: number; delta: number; referencia: string; texto: string; }
/** Distancia (pts de % neto) al mínimo on-track del PRÓXIMO hito, con el readiness derivado del log como referencia. null sin dato. */
export function mirDistanciaOnTrack(fechaISO: string, entries: MirEvalEntry[] = mirEvalLogLoad()): MirDistanciaOnTrack | null {
  const next = MIR_HITOS.find((h) => h.fecha >= fechaISO);
  if (!next) return null;
  const r = mirReadinessDerivado(entries);
  if (r.fuente === 'ninguna') return null;
  const referencia = r.fuente === 'miniMIR' ? 'mini-MIR' : r.fuente === 'cierre' ? `media de ${r.n} cierres` : `${r.n} ancladas`;
  const delta = Math.round(r.pct - next.min);
  const signo = delta >= 0 ? '+' : '';
  return { hito: next, valor: r.pct, delta, referencia, texto: `${next.clave} (${next.fecha.slice(5)}): mín ${next.min} % · ${referencia} ${r.pct} % → ${signo}${delta} pts` };
}

// ── READINESS · simulacros cronometrados (AMIR/ProMIR) como checkpoints de score ──
// La "banca" honesta: el readiness solo tiene sentido anclado a un simulacro real
// con plantilla idéntica + corrección comentada al 100% (lo que MIR_NOTA pide copiar).
// Bandas en NETAS sobre 200 (v3b): ≥150 (75 %) = banda Top 50 · ≥138 = última plaza Derma 2025 · ≥120 = solo zona plaza (~puesto 1.500).
export interface MirSimulacro {
  nombre: string; fuente: 'ProMIR' | 'AMIR' | 'MirAsturias' | 'Oficial';
  cuando: string; formato: string; banda: string; url: string; gated: boolean;
}
export const MIR_SIMULACROS: MirSimulacro[] = [
  { nombre: 'Simulacro ProMIR (fase Competición)', fuente: 'ProMIR', cuando: '1/finde · mes 10+', formato: '200 preguntas · plantilla idéntica + corrección 100%', banda: 'neto ≥150 (75 %) = banda Top 50 · ≥138 = Derma 2025 (última plaza 137,8) · ≥120 = solo zona plaza', url: 'https://promir.medicapanamericana.com/', gated: true },
  { nombre: 'AMIR · 40 simulacros programados (acceso A VERIFICAR — no hay matrícula confirmada)', fuente: 'AMIR', cuando: 'calendario propio', formato: 'Cronometrado + estadística por asignatura', banda: 'percentil > mediana del aula · neto ≥150 = Top 50', url: 'https://www.amireducacion.com/', gated: true },
  { nombre: 'MirAsturias · simulacros', fuente: 'MirAsturias', cuando: 'recta final', formato: 'Cronometrado + ranking', banda: 'tendencia del neto > cifra suelta · objetivo 150-165', url: 'https://www.curso-mir.com/', gated: true },
  { nombre: 'Examen MIR oficial (años previos)', fuente: 'Oficial', cuando: 'auto-simulacro gratis', formato: 'Cuadernillo real + plantilla BOE · 200 preguntas', banda: 'aplica −1/3 · neto ≥150/200 (75 %) = banda Top 50 (150-165 según el año)', url: 'https://www.examenesmir.com/examenes-mir', gated: false },
];
// Readiness DERIVADO del registro de evaluaciones (mirEvalLog · localStorage 'jmd-mir-eval-log' + espejo Supabase):
// mini-MIR D77 > tests de cierre 10Q por asignatura > evals ancladas > sin dato (0 %).
// Sustituye al pct=5 hardcodeado: ya no hay número sin medición ciega detrás.
export const MIR_READINESS_BASE: MirReadiness = {
  pct: 0, fuente: 'ninguna', n: 0,
  estado: 'Sin registro · línea base = primer test de cierre (10Q, 77 s/Q)',
  siguiente: 'Registra la eval anclada de hoy (15:27) y el test de cierre al cambiar de asignatura.',
};
export function mirReadiness(): MirReadiness {
  try { return mirReadinessDerivado(); } catch { return MIR_READINESS_BASE; }
}

// ── Desgloses MIR por asignatura (preguntas reales de años previos) ──
// Pilar AMIR "Libro Gordo" / CTO: navegar las preguntas reales por asignatura +
// corrección comentada. No se copian enunciados — se enlaza a las fuentes ya presentes.
export const MIR_DESGLOSES = {
  titulo: 'Desgloses MIR · preguntas reales por asignatura',
  porQue: 'AMIR "Libro Gordo" y CTO lo tratan como pilar: repetir las preguntas que YA cayeron por asignatura fija más que leer. Corrección comentada al 100%.',
  capas: [
    { fuente: 'examenesmir.com', que: 'Cuadernillos 2014–2026 filtrables · plantilla oficial', url: 'https://www.examenesmir.com/examenes-mir', gated: false },
    { fuente: 'Ministerio de Sanidad (BOE)', que: 'Plantillas oficiales + impugnaciones', url: 'https://www.sanidad.gob.es', gated: false },
    { fuente: 'AMIR Libro Gordo (2012–2022)', que: 'Desglose por asignatura + comentario', url: 'https://www.amireducacion.com/', gated: true },
    { fuente: 'ProMIR · banco por asignatura', que: '>30.000 preguntas etiquetadas por tema', url: 'https://promir.medicapanamericana.com/', gated: true },
  ],
};

export interface AsignaturaMIR { nombre: string; tier: 'S' | 'A' | 'B' | 'C'; nota: string; prioridad: Prioridad; }
export const MIR_ASIGNATURAS: AsignaturaMIR[] = [
  { nombre: 'Epidemiología (+ Preventiva)', tier: 'S', nota: 'Epidemiología ~10 Q/año (~5 % del MIR); 3 capítulos = 70 %: Ensayo clínico 32 % · Clasificación de estudios 24 % · Pruebas diagnósticas 14 %. Estadística inferencial: 0 Q en 5 años (ProMIR) → no invertir. EMPIEZA AQUÍ (D1-D3).', prioridad: 'CRITICA' },
  { nombre: 'Bioética / Medicina Legal', tier: 'S', nota: '~1,2 % del MIR (11 Q en 5 años) pero Principios de bioética = 40 % del bloque → 1 día (D4) y pura rentabilidad/hora. El resto forense: 0 % histórico.', prioridad: 'CRITICA' },
  { nombre: 'Cardiología', tier: 'S', nota: '16–19 preguntas siempre · la reina · columna fisiopatológica de Nefro/Neumo/UCI.', prioridad: 'CRITICA' },
  { nombre: 'Digestivo + Cirugía General', tier: 'A', nota: 'Estúdialos juntos: ~25 preguntas combinadas. Muy alta rentabilidad.', prioridad: 'ALTA' },
  { nombre: 'Infecciosas', tier: 'A', nota: 'Transversal: refuerza Neumo, Digestivo, Derma, Pediatría.', prioridad: 'ALTA' },
  { nombre: 'Neurología', tier: 'A', nota: 'Top-3 crónico (10–15 preguntas).', prioridad: 'ALTA' },
  { nombre: 'Endocrinología', tier: 'A', nota: 'Alta y consistente.', prioridad: 'ALTA' },
  { nombre: 'Reumatología', tier: 'A', nota: 'Alta, consistente (9–15).', prioridad: 'ALTA' },
  { nombre: 'Nefrología', tier: 'A', nota: 'Media-alta · sinergia con Cardio.', prioridad: 'ALTA' },
  { nombre: 'Dermatología', tier: 'A', nota: '⭐ Cae poco (4–6) pero es TU meta → sobreinvierte. Compone con USMLE/ENCAPS.', prioridad: 'ALTA' },
  { nombre: 'Gineco-Obstetricia', tier: 'B', nota: 'Estable media-alta.', prioridad: 'MEDIA' },
  { nombre: 'Pediatría', tier: 'B', nota: 'Subiendo.', prioridad: 'MEDIA' },
  { nombre: 'Neumología', tier: 'B', nota: 'Media-alta.', prioridad: 'MEDIA' },
  { nombre: 'Hematología', tier: 'B', nota: 'Media estable.', prioridad: 'MEDIA' },
  { nombre: 'Psiquiatría', tier: 'B', nota: 'Media.', prioridad: 'MEDIA' },
  { nombre: 'Traumatología', tier: 'B', nota: 'Media, volátil.', prioridad: 'MEDIA' },
  { nombre: 'Resto (Oftalmo, ORL, Uro, Onco, Geriatría…)', tier: 'C', nota: 'Baja prioridad · repaso rápido al final.', prioridad: 'BAJA' },
];

// Colores en joya apagada (sin neón) — coherentes con la consola española.
export const MIR_TIERS = [
  { tier: 'S', label: 'ROI máximo', desc: 'Poco temario, muchas preguntas. Empieza aquí.', color: '#5FA88C' },  // jade (era #10B981)
  { tier: 'A', label: 'Alta rentabilidad', desc: 'Temario grande pero imprescindible.', color: '#C8A96A' },      // gold (era #F5A623)
  { tier: 'B', label: 'Media', desc: 'Después del Tier A.', color: '#4F7DD6' },                                  // sapphire (era #2E7CF6)
  { tier: 'C', label: 'Baja', desc: 'No abandonar, pero al final y en repaso rápido.', color: '#7C8496' },        // muted (era #8F9097)
];

// ProMIR (Médica Panamericana) — 5 fases públicas
export const PROMIR_FASES = [
  { fase: 'Calentamiento', desc: 'Familiarización + primeros tests/simulacros.' },
  { fase: 'Construcción', desc: 'Estudio intensivo con metas diarias, autodiagnóstico, repaso acumulativo.' },
  { fase: 'Consolidación', desc: 'Refuerzo de puntos débiles (IA), muy personalizado.' },
  { fase: 'Competición', desc: 'Sprint final, técnica de examen, práctica de preguntas.' },
  { fase: 'Calibración', desc: 'Opcional (repetidores): personaliza calendario por fortalezas/debilidades.' },
];

// Estructura de la hora diaria (aprendizaje basado en preguntas · 17-19 Q/día · = MIR_FRANJAS de mirDailyPlan.ts)
export const MIR_HORA = [
  { bloque: 'A · Eval anclada + Anki + log', min: '0–15', act: '4Q multi-temporales (2Q D-1 + 2 slots dinámicos que priorizan temas calientes; test del capítulo ProMIR, 77 s/Q) → Anki APEX::MIR → log (knowledge/transfer/proceso + 🇪🇸 delta + táctica). Lo PRIMERO, no negociable. 1er día de bloque: test de cierre 10Q de la asignatura anterior.' },
  { bloque: 'B · Pre-test + lectura dirigida', min: '15–38', act: '5Q ciegas del capítulo nuevo (se registran: cuentan para el gate del tema) → lectura SOLO de los gaps (Whole Page Rule sobre el capítulo ProMIR; vídeo solo si el clip ≤12 min está verificado).' },
  { bloque: 'C · 8-10Q comentadas', min: '38–50', act: 'Test del capítulo ProMIR con Rule-In → Rule-Out y cover-the-options; cada fallo → Shopping List. Registro n/total en el log (kind quiz, 20 s): <60 % = tema caliente → ancla de mañana.' },
  { bloque: 'D · APEX', min: '50–60', act: '≤4 tarjetas APEX creadas DIRECTAMENTE en Anki (SAQ + por qué + 🇪🇸 delta + tag sistema USMLE; 1 de cada 4 con imagen) hasta que el redeploy de n8n esté verificado.' },
];

// Fases REALES del calendario MIR (v3b; antes describía las "Fase 0-4 por meses" del plan de junio)
// v6.01: fechas formateadas desde los META generados (día de la semana + día + mes), nada a mano.
const _MIR_WD = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const _MIR_MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const _mirF = (iso: string): string => `${_MIR_WD[new Date(iso + 'T12:00:00Z').getUTCDay()]} ${Number(iso.slice(8, 10))}-${_MIR_MES[Number(iso.slice(5, 7)) - 1]}`;
export const MIR_CALENDARIO = [
  { fase: '1ª vuelta · oct-2026→feb-2027', foco: `78 días (${_mirF(MIR_DAILY_META.inicio)} → ${_mirF(MIR_DAILY_META.fin)}; v6.03: corrió +2 hábiles con el D1 · v6.02: lun 19-oct → lun 8-feb · v6.01: lun 12-oct → lun 1-feb · v6.00: mié 7-oct → mié 27-ene): 76 temas top-N por Peso MIR + núcleo rabi_94, Epi/Bioética D1-D4, cada bloque precede ~1 semana a su sistema Step 1. mini-MIR D77 ≥ 50 % neto.` },
  { fase: `Banqueo · feb→${MIR_MANT_META.fin.slice(5, 7) === '10' ? 'oct' : 'sep'}-2027 (v6.03)`, foco: `Sin contenido nuevo: Anki + 25Q/día reales (viernes 30Q de la asignatura peor del log). Mantenimiento ${_mirF(MIR_MANT_META.mant.inicio)} → ${_mirF(MIR_MANT_META.mant.fin)} (${MIR_MANT_META.mant.totalDias} días, sin modo reducido: DJ-4 = 1 h/día en todas las fases) + EXTENSIÓN ${_mirF(MIR_MANT_META.ext.inicio)} → ${_mirF(MIR_MANT_META.ext.tope)} (${MIR_MANT_META.ext.totalDiasHastaTope} días${MIR_MANT_META.ext.repuestas ? ` + ${MIR_MANT_META.ext.repuestas.totalDias} REPUESTAS tras el Step 1 ${_mirF(MIR_MANT_META.ext.repuestas.desde)} → ${_mirF(MIR_MANT_META.ext.repuestas.hasta)}: lo que recortaron los corrimientos v6.01/v6.02/v6.03, Tier C ${MIR_MANT_META.ext.repuestas.tierC.join(' + ')}` : ''}; desde el SERUMS ${_mirF(FECHAS_V6.serums.inicio)} también el SÁBADO = mini-simulacro 30Q mixtas; franja según el turno: M 16:00 · T 10:35 · L 15:15 · hito 04:05 · guardia en tiempo muerto). DÍAS PROTEGIDOS sin sesión MIR: ${FECHAS_V6.protegidos.map((p) => p.fecha.slice(5)).join(' · ')} (ENCAPS y Step 1) + Semana Santa 25-26-mar. Handoff ${_mirF(MIR_MANT_META.fin)} ≥ 60 %.` },
  { fase: 'Principal · oct-2027→', foco: 'MIR pasa a bloque principal tras el Step 1 (F5): 1ª vuelta COMPLETA (30 asignaturas, Tier C incluido), umbrales de cierre 75/60, retention FSRS 0,90. Fin de vuelta ≥ 68 %.' },
  { fase: 'Vueltas + simulacros · 2028→2029', foco: 'Vueltas numéricas (motor ENCAPS) + simulacros 200Q cronometrados con plantilla idéntica. 2028 ≥ 75 % · 2029 ≥ 82 % (banda Top 50 = 150-165 netas).' },
  { fase: 'Competición · ene-2030', foco: 'Solo simulacros + cuaderno de errores + taper. Examen MIR 2030 → Top 50 → Dermatología (Clínic).' },
];

// Táctica de examen (regla numérica de respuesta — 4 opciones, −1/3) + reglas de Palmerton (v3b)
export const MIR_TACTICA = [
  { caso: 'Descartas 1 (quedan 3)', ev: 'EV = +0,33', accion: 'Responde' },
  { caso: 'Descartas 2 (quedan 2)', ev: 'EV = +1,0', accion: 'Responde sin dudar' },
  { caso: 'No descartas ninguna', ev: 'EV = 0', accion: 'Por defecto, en blanco' },
  { caso: 'Dudas y el reloj pasa de ~100 s en la pregunta', ev: 'regla de los 2 min (MIR ≈ 100 s)', accion: 'Adivina-marca-avanza (o en blanco)' },
  { caso: 'Quieres cambiar una respuesta ya marcada', ev: 'Palmerton: 0 cambios por duda', accion: 'Solo por error objetivo de lectura' },
];
export const MIR_TACTICA_NOTA = 'Un Top 50 deja ≤3-5 blancos: la calibración del riesgo son puntos netos directos. Al corregir, registra blancos acertables / fallos entre dos / respuestas cambiadas (formulario del log): mirStatsPorAsignatura calcula la EV de tu política de blanco y emite consejo por asignatura. Hasta el 50 % de los fallos son de interpretación (Palmerton): una sola lectura lenta y lineal, cover-the-options.';

export const MIR_RECURSOS = [
  { label: 'examenesmir.com — cuadernillos 2014–2026 (libre)', url: 'https://www.examenesmir.com/examenes-mir', gated: false },
  { label: 'Ministerio de Sanidad — oficiales + plantillas (BOE)', url: 'https://www.sanidad.gob.es', gated: false },
  { label: 'Mirial — todos los MIR en PDF', url: 'https://mirial.es/examen-mir/24-examen-mir', gated: false },
  { label: 'ProMIR (Médica Panamericana) — temario base', url: 'https://promir.medicapanamericana.com/', gated: true },
];

export const MIR_NOTA = 'GATED (login): precios, calendario personalizado, manuales completos, videoclases y banco (>30.000 preguntas) requieren matrícula en promir.medicapanamericana.com. Tu motor ENCAPS (vueltas numéricas) ya supera sus "Repasos"; lo que vale copiar son los simulacros cronometrados con plantilla idéntica + corrección comentada al 100%.';
