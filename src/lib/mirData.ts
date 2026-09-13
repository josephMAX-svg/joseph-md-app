/**
 * mirData.ts — Sección MIR (España · ProMIR). Distilada de STUDY_HUB/04_MIR_promir.md
 * + 10_MIR_promir_detalle.md. Estructura ENCAPS (prioridad/vueltas) + táctica de examen.
 * v3b (12-sep-2026): métricas calibradas a Top 50 (MIR_HITOS con mínimo on-track por hito, bandas de
 * simulacro en netas, fases reales del calendario) + táctica −1/3 con las reglas de Palmerton.
 */
import { Prioridad, PRIORIDAD_COLOR, VUELTAS } from './researchData';
import { mirReadinessDerivado, MirReadiness, mirEvalLogLoad, MirEvalEntry } from './mirEvalLog';
import { mirDiaN } from './mirDailyPlan';
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
export const MIR_HITOS: MirHito[] = [
  { clave: 'mini-MIR', nombre: 'mini-MIR 40Q mixto (D77)', fecha: mirDiaN(77)?.fecha || '2026-12-30', min: 50, fase: '1ª vuelta', nota: 'baseline honesto tras 76 temas; 40Q ⇒ ±2,5 pp por pregunta' },
  { clave: 'handoff', nombre: 'Handoff 31-mar-2027 (entrada a la fase principal)', fecha: '2027-03-31', min: 60, fase: 'banqueo', nota: 'tabla de neto por asignatura (cierres + mini-MIR + mantenimiento) + stats FSRS del deck' },
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
export const MIR_CALENDARIO = [
  { fase: '1ª vuelta · sep→dic-2026', foco: '78 días (14-sep→4-ene): 76 temas top-N por Peso MIR + núcleo rabi_94, Epi/Bioética D1-D4, cada bloque precede ~1 semana a su sistema Step 1. mini-MIR D77 ≥ 50 % neto.' },
  { fase: 'Banqueo · ene→mar-2027', foco: 'Sin contenido nuevo: Anki + 25Q/día reales (viernes 30Q de la asignatura peor del log). Modo reducido hasta el 27-ene (Step 1). Handoff 31-mar ≥ 60 %.' },
  { fase: 'Principal · abr-2027→dic-2027', foco: 'MIR pasa a bloque principal: 1ª vuelta COMPLETA (30 asignaturas, Tier C incluido), umbrales de cierre 75/60, retention FSRS 0,90. Fin de vuelta ≥ 68 %.' },
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
