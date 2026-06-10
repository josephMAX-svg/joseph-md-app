/**
 * mirDigestivoData.ts — DATOS REALES extraídos de ProMIR (Gastroenterología, asignatura 11).
 * Scrapeado vía Chrome DevTools de promir.medicapanamericana.com (sesión del usuario),
 * capítulo por capítulo: videos reales + duraciones reales (mm:ss) + carga de lectura
 * (figuras/tablas) + Peso MIR real + deep-links reales a cada capítulo.
 * Fecha de extracción: 2026-06-09. NO inventado — verificado en plataforma.
 */
import { Prioridad } from './researchData';

const BASE = 'https://promir.medicapanamericana.com/capitulo/';

export interface CapituloProMIR {
  n: number;
  titulo: string;
  capId: string;            // ObjectId real del capítulo en ProMIR
  videos: number;
  duraciones: string[];     // mm:ss reales
  videoMin: number;         // total minutos de video (calculado de duraciones reales)
  figuras: number;
  tablas: number;
  pesoMirPct?: number;      // % dentro de Gastro (Peso MIR real de ProMIR; orden por carga)
  prioridad: Prioridad;
}

export const DIGESTIVO_META = {
  asignatura: 'Gastroenterología (Digestivo)',
  numAsignatura: 11,
  fuente: 'ProMIR · Médica Panamericana',
  introUrl: BASE + '627e3419522469540751b023',
  totalCaps: 9,
  totalVideos: 18,
  totalVideoMin: 118,
  totalFiguras: 209,
  totalTablas: 32,
  pesoGlobalAprox: '~2,46% del MIR (últimos 5 años) · top-3 por rentabilidad',
  nota: 'Datos reales de ProMIR (videos/duraciones/figuras/links verificados 09-jun-2026). El Peso MIR por tema es el real de ProMIR; el orden capítulo↔% se infiere por carga de contenido.',
};

// Capítulos ordenados por rentabilidad/carga (más rentable primero) — el orden de ataque.
export const DIGESTIVO_CAPITULOS: CapituloProMIR[] = [
  { n: 4, titulo: 'Enfermedades del hígado', capId: '570779c9f4d68bf008dbc723', videos: 4, duraciones: ['6:58','7:11','9:21','7:00'], videoMin: 31, figuras: 42, tablas: 9, pesoMirPct: 22.1, prioridad: 'CRITICA' },
  { n: 7, titulo: 'Enfermedades del colon', capId: '570779c8f4d68bf008dbc64c', videos: 1, duraciones: ['16:31'], videoMin: 17, figuras: 27, tablas: 3, pesoMirPct: 19.0, prioridad: 'CRITICA' },
  { n: 1, titulo: 'Enfermedades del esófago', capId: '570779c8f4d68bf008dbc5fe', videos: 4, duraciones: ['7:29','2:54','1:30','2:09'], videoMin: 14, figuras: 47, tablas: 1, pesoMirPct: 13.8, prioridad: 'CRITICA' },
  { n: 6, titulo: 'Enfermedades del páncreas', capId: '570779c8f4d68bf008dbc600', videos: 2, duraciones: ['9:07','7:32'], videoMin: 17, figuras: 20, tablas: 7, pesoMirPct: 12.0, prioridad: 'ALTA' },
  { n: 3, titulo: 'Enfermedades del intestino delgado', capId: '570779c8f4d68bf008dbc6a6', videos: 2, duraciones: ['5:15','4:52'], videoMin: 10, figuras: 34, tablas: 5, pesoMirPct: 10.5, prioridad: 'ALTA' },
  { n: 2, titulo: 'Enfermedades del estómago', capId: '570779c8f4d68bf008dbc64a', videos: 1, duraciones: ['6:42'], videoMin: 7, figuras: 10, tablas: 3, pesoMirPct: 9.3, prioridad: 'ALTA' },
  { n: 5, titulo: 'Enfermedades de la vía biliar', capId: '570779c9f4d68bf008dbc77f', videos: 1, duraciones: ['4:55'], videoMin: 5, figuras: 17, tablas: 3, pesoMirPct: 7.3, prioridad: 'MEDIA' },
  { n: 8, titulo: 'Miscelánea de temas quirúrgicos', capId: '570779c8f4d68bf008dbc6a8', videos: 1, duraciones: ['2:00'], videoMin: 2, figuras: 12, tablas: 1, pesoMirPct: 6.1, prioridad: 'MEDIA' },
  { n: 0, titulo: 'Introducción (Peso MIR + horas + 2 vídeos presentación)', capId: '627e3419522469540751b023', videos: 2, duraciones: ['3:48','3:21'], videoMin: 7, figuras: 0, tablas: 0, prioridad: 'BAJA' },
];

export function capUrl(capId: string) { return BASE + capId; }

// Plan día a día (1h/día, días MIR L–V) — primera vuelta de Digestivo, desde mañana.
// Cada día: ~video real + lectura + 5-8 preguntas (Entrenar) + APEX. Orden = rentabilidad.
export const DIGESTIVO_PLAN = [
  { dia: 'D1 · mié 10-jun', cap: 'Hígado (vídeos 1–2)', detalle: '6:58 + 7:11 de vídeo + figuras clave + 5 preguntas Entrenar + 3 APEX', vuelta: 1 },
  { dia: 'D2 · jue 11-jun', cap: 'Hígado (vídeos 3–4)', detalle: '9:21 + 7:00 + cirrosis/hepatitis + 5 preguntas + 3 APEX', vuelta: 1 },
  { dia: 'D3 · vie 12-jun', cap: 'Colon', detalle: '16:31 (EII, CCR, pólipos) — el tema más denso + 6 preguntas + 3 APEX', vuelta: 1 },
  { dia: 'D4 · lun 15-jun', cap: 'Esófago', detalle: '4 vídeos (14 min) + ERGE/acalasia/Barrett + 5 preguntas + 3 APEX', vuelta: 1 },
  { dia: 'D5 · mar 16-jun', cap: 'Páncreas', detalle: '9:07 + 7:32 (pancreatitis/ca páncreas) + 5 preguntas + 3 APEX', vuelta: 1 },
  { dia: 'D6 · mié 17-jun', cap: 'Intestino delgado', detalle: '5:15 + 4:52 (malabsorción/celiaca) + 5 preguntas + 3 APEX', vuelta: 1 },
  { dia: 'D7 · jue 18-jun', cap: 'Estómago + Vía biliar', detalle: '6:42 + 4:55 (úlcera/H.pylori + colelitiasis) + 5 preguntas + 3 APEX', vuelta: 1 },
  { dia: 'D8 · vie 19-jun', cap: 'Miscelánea + repaso', detalle: '2:00 + repaso vuelta-1 de Hígado/Colon (vencen hoy) + 8 preguntas mixtas', vuelta: 1 },
];
