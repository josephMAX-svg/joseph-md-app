/**
 * mirData.ts — Sección MIR (España · ProMIR). Distilada de STUDY_HUB/04_MIR_promir.md
 * + 10_MIR_promir_detalle.md. Estructura ENCAPS (prioridad/vueltas) + táctica de examen.
 */
import { Prioridad, PRIORIDAD_COLOR, VUELTAS } from './researchData';
export { PRIORIDAD_COLOR, VUELTAS };
export type { Prioridad };

export const MIR_META = {
  titulo: 'MIR · España',
  subtitulo: 'ProMIR · Top 50 → Dermatología Hospital Clínic Barcelona',
  accent: '#F5A623', // amber (España)
  tesis: 'El nº de preguntas no es todo: divide por el tamaño del temario. Bloques pequeños que caen mucho = oro. Empieza por Estadística + Bioética (casi regalo de puntos), luego Cardiología (la reina). Aprendizaje basado en preguntas desde el día 1.',
};

export const MIR_KPIS = { asignaturasTierS: 3, vueltasCritica: 6, simulacrosMeta: 1, readiness: 5 };

export interface AsignaturaMIR { nombre: string; tier: 'S' | 'A' | 'B' | 'C'; nota: string; prioridad: Prioridad; }
export const MIR_ASIGNATURAS: AsignaturaMIR[] = [
  { nombre: 'Estadística / Epidemiología / Preventiva', tier: 'S', nota: '6–10 preguntas · temario pequeño y memorizable · casi regalo. EMPIEZA AQUÍ.', prioridad: 'CRITICA' },
  { nombre: 'Bioética / Medicina Legal', tier: 'S', nota: '6–8 preguntas · temario corto · pura rentabilidad/hora.', prioridad: 'CRITICA' },
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

export const MIR_TIERS = [
  { tier: 'S', label: 'ROI máximo', desc: 'Poco temario, muchas preguntas. Empieza aquí.', color: '#10B981' },
  { tier: 'A', label: 'Alta rentabilidad', desc: 'Temario grande pero imprescindible.', color: '#F5A623' },
  { tier: 'B', label: 'Media', desc: 'Después del Tier A.', color: '#2E7CF6' },
  { tier: 'C', label: 'Baja', desc: 'No abandonar, pero al final y en repaso rápido.', color: '#8F9097' },
];

// ProMIR (Médica Panamericana) — 5 fases públicas
export const PROMIR_FASES = [
  { fase: 'Calentamiento', desc: 'Familiarización + primeros tests/simulacros.' },
  { fase: 'Construcción', desc: 'Estudio intensivo con metas diarias, autodiagnóstico, repaso acumulativo.' },
  { fase: 'Consolidación', desc: 'Refuerzo de puntos débiles (IA), muy personalizado.' },
  { fase: 'Competición', desc: 'Sprint final, técnica de examen, práctica de preguntas.' },
  { fase: 'Calibración', desc: 'Opcional (repetidores): personaliza calendario por fortalezas/debilidades.' },
];

// Estructura de la hora diaria (aprendizaje basado en preguntas)
export const MIR_HORA = [
  { bloque: 'A · Repaso espaciado', min: '0–15', act: 'Tarjetas/preguntas de asignaturas que "vencen hoy". Lo PRIMERO, no negociable.' },
  { bloque: 'B · Tema nuevo', min: '15–45', act: 'Videoclase corta (10–12 min) + 15–18 preguntas comentadas → marca 1ª exposición.' },
  { bloque: 'C · Test mixto', min: '45–55', act: '10 preguntas aleatorias acumuladas (interleaved).' },
  { bloque: 'D · Bitácora', min: '55–60', act: 'Anota fallos; sube un escalón de prioridad los temas fallados.' },
];

export const MIR_CALENDARIO = [
  { fase: 'Fase 0 · sem 1–4', foco: 'Tier S: Estadística + Bioética + arranque Cardiología. Puntos baratos + momentum.' },
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
