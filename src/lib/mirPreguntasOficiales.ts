/**
 * mirPreguntasOficiales.ts — ESQUELETO del mapa capítulo ProMIR → preguntas MIR oficiales (año-nº).
 *
 * Objetivo (Palmerton: "questions as the curriculum" — el MIR recicla conceptos año tras año):
 *  · por cada capítulo del plan (capId), la lista de IDs de preguntas oficiales 2016-2026 (≈2.200 Q)
 *    → pre-test, eval anclada, test de cierre y mini-MIR se sirven de este pool con marcado "ya usada"
 *    en mirEvalLog (anti-repetición) y cada viñeta generada por Claude cita la pregunta oficial de la
 *    que deriva (regla anti-alucinación: verificar contra fuente real).
 *
 * ESTADO: VACÍO · A VERIFICAR (05-sep). Requiere scrape LOGUEADO de ProMIR (sección "preguntas MIR de
 * este capítulo", vía Chrome DevTools como se hizo con el temario el 09-jun-2026) o clasificar los
 * cuadernillos gratuitos de examenesmir.com con la plantilla oficial. Arranque mínimo viable: las 14
 * asignaturas del plan × convocatorias 2024-2026. NO se inventan IDs ni enunciados.
 */
export type MirFuentePregunta = 'ProMIR' | 'examenesmir' | 'BOE';

export interface MirPreguntaOficial {
  /** id canónico "AAAA-NNN" (convocatoria-nº de pregunta en el cuadernillo), p. ej. "2025-114" */
  id: string;
  anio: number;
  numero: number;
  /** asignatura ProMIR (num + nombre) y capítulo (capId real de mirTemarioData) */
  num: number; asignatura: string; capId: string;
  /** subtema/etiqueta de ProMIR si existe */
  tema?: string;
  /** true si la pregunta lleva imagen (ECG, Rx, analítica, derma…) → cuota 1/4 de APEX con imagen */
  imagen?: boolean;
  fuente: MirFuentePregunta;
  /** URL de la pregunta en la fuente (solo si es real y verificada) */
  url?: string;
}

/** Pool oficial — se rellena por scrape verificado. Mientras esté vacío, la UI muestra "sin pool oficial". */
export const MIR_PREGUNTAS_OFICIALES: MirPreguntaOficial[] = [];

export const MIR_POOL_META = {
  estado: 'A VERIFICAR (05-sep) · pool vacío · pendiente scrape logueado de ProMIR o clasificación de cuadernillos examenesmir.com',
  convocatoriasObjetivo: '2016–2026 (mínimo viable: 2024–2026)',
  fuentesLibres: [
    { fuente: 'examenesmir.com', url: 'https://www.examenesmir.com/examenes-mir', nota: 'cuadernillos 2014–2026 + plantilla oficial (gratis)' },
  ],
};

/** Preguntas oficiales de un capítulo (vacío hasta que exista el pool). */
export function preguntasDeCapitulo(capId: string): MirPreguntaOficial[] {
  return MIR_PREGUNTAS_OFICIALES.filter((q) => q.capId === capId);
}
/** Preguntas no usadas todavía (anti-repetición): `usadas` = ids ya consumidas (del log). */
export function preguntasSinUsar(capId: string, usadas: Iterable<string>): MirPreguntaOficial[] {
  const u = new Set(usadas); return preguntasDeCapitulo(capId).filter((q) => !u.has(q.id));
}
/** Resumen del pool por asignatura (para la UI: "0 Q oficiales mapeadas"). */
export function poolResumen(): Array<{ num: number; asignatura: string; n: number; conImagen: number }> {
  const m = new Map<number, { num: number; asignatura: string; n: number; conImagen: number }>();
  for (const q of MIR_PREGUNTAS_OFICIALES) {
    const s = m.get(q.num) || { num: q.num, asignatura: q.asignatura, n: 0, conImagen: 0 };
    s.n++; if (q.imagen) s.conImagen++; m.set(q.num, s);
  }
  return Array.from(m.values()).sort((a, b) => b.n - a.n);
}
export const mirPoolDisponible = (): boolean => MIR_PREGUNTAS_OFICIALES.length > 0;
