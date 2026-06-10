/**
 * mirCardiologiaData.ts — DATOS REALES de ProMIR (Cardiología, asignatura 3 · #1 en rentabilidad).
 * Scrapeado vía Chrome DevTools (sesión del usuario), 2026-06-09. Los 17 capítulos con sus
 * deep-links reales /capitulo/<id>; los de mayor rendimiento con videos/duraciones reales
 * verificados; el resto con link real (duración: abrir en ProMIR — NO inventada).
 */
import { Prioridad } from './researchData';
const BASE = 'https://promir.medicapanamericana.com/capitulo/';
export function capUrl(id: string) { return BASE + id; }

export const CARDIO_META = {
  asignatura: 'Cardiología',
  numAsignatura: 3,
  fuente: 'ProMIR · Médica Panamericana',
  totalCaps: 17,
  pesoGlobal: '#1 del MIR (16–19 preguntas/año, estable) · la reina',
  nota: 'Datos reales de ProMIR (09-jun-2026). 17 capítulos con deep-links reales. Los de mayor rendimiento traen videos/duraciones verificadas; el resto abre en ProMIR (no se inventan duraciones).',
};

export interface CapCardio {
  n: number; titulo: string; capId: string; prioridad: Prioridad;
  videoMin?: number; figuras?: number; videosTxt?: string; verificado: boolean;
}

// Ordenados por rendimiento (orden de ataque). Los 4 primeros con data real verificada.
export const CARDIO_CAPITULOS: CapCardio[] = [
  { n: 6, titulo: 'Trastornos del ritmo (arritmias)', capId: '570779c9f4d68bf008dbc78d', prioridad: 'CRITICA', videoMin: 83, figuras: 58, videosTxt: '6 videos (incl. 50:04, 15:01, 14:13)', verificado: true },
  { n: 5, titulo: 'Cardiopatía isquémica', capId: '570779c9f4d68bf008dbc731', prioridad: 'CRITICA', videoMin: 27, figuras: 19, videosTxt: '1 video 26:30', verificado: true },
  { n: 4, titulo: 'Insuficiencia cardíaca', capId: '64588d5ef704295c924d9289', prioridad: 'CRITICA', videoMin: 4, figuras: 51, videosTxt: '1 video 2:04 + clips · lectura pesada (51 figs)', verificado: true },
  { n: 3, titulo: 'Hipertensión arterial', capId: '570779c8f4d68bf008dbc6b4', prioridad: 'CRITICA', figuras: 10, videosTxt: 'video · abrir en ProMIR', verificado: true },
  { n: 8, titulo: 'Valvulopatías', capId: '570779c8f4d68bf008dbc65a', prioridad: 'ALTA', verificado: false },
  { n: 1, titulo: 'Cardiología básica', capId: '570779c9f4d68bf008dbc7e9', prioridad: 'ALTA', verificado: false },
  { n: 2, titulo: 'Riesgo cardiovascular · prevención ECVA', capId: '570779c8f4d68bf008dbc658', prioridad: 'ALTA', verificado: false },
  { n: 7, titulo: 'Síncope', capId: '570779c9f4d68bf008dbc7eb', prioridad: 'MEDIA', verificado: false },
  { n: 9, titulo: 'Enfermedades del miocardio', capId: '570779c8f4d68bf008dbc6b6', prioridad: 'MEDIA', verificado: false },
  { n: 10, titulo: 'Enfermedades del pericardio', capId: '570779c9f4d68bf008dbc733', prioridad: 'MEDIA', verificado: false },
  { n: 11, titulo: 'Cardiopatías congénitas', capId: '570779c9f4d68bf008dbc78f', prioridad: 'MEDIA', verificado: false },
  { n: 13, titulo: 'Enfermedades de la aorta', capId: '570779c8f4d68bf008dbc65c', prioridad: 'MEDIA', verificado: false },
  { n: 14, titulo: 'Enfermedad arterial periférica', capId: '570779c8f4d68bf008dbc6b8', prioridad: 'MEDIA', verificado: false },
  { n: 15, titulo: 'Enfermedades de las venas y sistema linfático', capId: '570779c9f4d68bf008dbc735', prioridad: 'BAJA', verificado: false },
  { n: 16, titulo: 'Hipertensión pulmonar', capId: '5b0e81fe15ceab3a18dbb076', prioridad: 'BAJA', verificado: false },
  { n: 12, titulo: 'Tumores cardíacos', capId: '570779c9f4d68bf008dbc7ed', prioridad: 'BAJA', verificado: false },
  { n: 0, titulo: 'Introducción (Peso MIR + horas + presentación)', capId: '628333a65d635c5aaf6a81a3', prioridad: 'BAJA', verificado: false },
];
