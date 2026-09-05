/**
 * mirData.ts — Sección MIR (España · ProMIR). Distilada de STUDY_HUB/04_MIR_promir.md
 * + 10_MIR_promir_detalle.md. Estructura ENCAPS (prioridad/vueltas) + táctica de examen.
 */
import { Prioridad, PRIORIDAD_COLOR, VUELTAS } from './researchData';
import { mirReadinessDerivado, MirReadiness } from './mirEvalLog';
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

// ── READINESS · simulacros cronometrados (AMIR/ProMIR) como checkpoints de score ──
// La "banca" honesta: el readiness solo tiene sentido anclado a un simulacro real
// con plantilla idéntica + corrección comentada al 100% (lo que MIR_NOTA pide copiar).
export interface MirSimulacro {
  nombre: string; fuente: 'ProMIR' | 'AMIR' | 'MirAsturias' | 'Oficial';
  cuando: string; formato: string; banda: string; url: string; gated: boolean;
}
export const MIR_SIMULACROS: MirSimulacro[] = [
  { nombre: 'Simulacro ProMIR (fase Competición)', fuente: 'ProMIR', cuando: '1/finde · mes 10+', formato: '200 preguntas · plantilla idéntica + corrección 100%', banda: 'neto ≥ 120 → zona plaza', url: 'https://promir.medicapanamericana.com/', gated: true },
  { nombre: 'AMIR · 40 simulacros programados (acceso A VERIFICAR — no hay matrícula confirmada)', fuente: 'AMIR', cuando: 'calendario propio', formato: 'Cronometrado + estadística por asignatura', banda: 'percentil > mediana del aula', url: 'https://www.amireducacion.com/', gated: true },
  { nombre: 'MirAsturias · simulacros', fuente: 'MirAsturias', cuando: 'recta final', formato: 'Cronometrado + ranking', banda: 'tendencia del neto > cifra suelta', url: 'https://www.curso-mir.com/', gated: true },
  { nombre: 'Examen MIR oficial (años previos)', fuente: 'Oficial', cuando: 'auto-simulacro gratis', formato: 'Cuadernillo real + plantilla BOE · 200 preguntas', banda: 'aplica −1/3 y mide el neto', url: 'https://www.examenesmir.com/examenes-mir', gated: false },
];
// Readiness DERIVADO del registro de evaluaciones (mirEvalLog · localStorage 'jmd-mir-eval-log'):
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
  { bloque: 'A · Eval anclada + Anki + log', min: '0–15', act: '4Q multi-temporales (2Q D-1 + 1Q D-3 + 1Q D-7, test del capítulo ProMIR, 77 s/Q) → Anki APEX::MIR → log (knowledge/transfer/proceso + 🇪🇸 delta). Lo PRIMERO, no negociable. 1er día de bloque: test de cierre 10Q de la asignatura anterior.' },
  { bloque: 'B · Pre-test + lectura dirigida', min: '15–38', act: '5Q ciegas del capítulo nuevo → lectura SOLO de los gaps (Whole Page Rule sobre el capítulo ProMIR; vídeo solo si el clip ≤12 min está verificado).' },
  { bloque: 'C · 8-10Q comentadas', min: '38–50', act: 'Test del capítulo ProMIR con Rule-In → Rule-Out y cover-the-options; cada fallo → Shopping List.' },
  { bloque: 'D · APEX', min: '50–60', act: '≤4 tarjetas APEX (SAQ + por qué + 🇪🇸 delta + tag sistema USMLE; 1 de cada 4 con imagen).' },
];

export const MIR_CALENDARIO = [
  { fase: 'Fase 0 · sem 1–4', foco: 'Tier S: Epidemiología + Bioética (D1-D4) + arranque Cardiología (D5). Puntos baratos + momentum.' },
  { fase: 'Fase 1 · mes 2–6', foco: 'Tier A: Cardio → Digestivo+CirGral → Infecciosas → Neuro → Endo → Reuma → Nefro + Derma.' },
  { fase: 'Fase 2 · mes 7–9', foco: 'Tier B: Gineco, Pediatría, Neumo, Hemato, Psiquiatría, Trauma.' },
  { fase: 'Fase 3 · mes 10–11', foco: 'Tier C en repaso rápido (videoclase + 10 preguntas/tema).' },
  { fase: 'Fase 4 · mes 12', foco: 'Solo simulacros + repaso del cuaderno de errores. 1 simulacro completo/finde.' },
];

// Táctica de examen (regla numérica de respuesta — 4 opciones, −1/3)
export const MIR_TACTICA = [
  { caso: 'Descartas 1 (quedan 3)', ev: 'EV = +0,33', accion: 'Responde' },
  { caso: 'Descartas 2 (quedan 2)', ev: 'EV = +1,0', accion: 'Responde sin dudar' },
  { caso: 'No descartas ninguna', ev: 'EV = 0', accion: 'Por defecto, en blanco' },
];

export const MIR_RECURSOS = [
  { label: 'examenesmir.com — cuadernillos 2014–2026 (libre)', url: 'https://www.examenesmir.com/examenes-mir', gated: false },
  { label: 'Ministerio de Sanidad — oficiales + plantillas (BOE)', url: 'https://www.sanidad.gob.es', gated: false },
  { label: 'Mirial — todos los MIR en PDF', url: 'https://mirial.es/examen-mir/24-examen-mir', gated: false },
  { label: 'ProMIR (Médica Panamericana) — temario base', url: 'https://promir.medicapanamericana.com/', gated: true },
];

export const MIR_NOTA = 'GATED (login): precios, calendario personalizado, manuales completos, videoclases y banco (>30.000 preguntas) requieren matrícula en promir.medicapanamericana.com. Tu motor ENCAPS (vueltas numéricas) ya supera sus "Repasos"; lo que vale copiar son los simulacros cronometrados con plantilla idéntica + corrección comentada al 100%.';
