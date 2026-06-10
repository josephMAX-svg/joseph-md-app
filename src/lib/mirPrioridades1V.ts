/**
 * mirPrioridades1V.ts — Estructura de PRIORIDADES de PRIMERA VUELTA.
 *
 * Fuente REAL: Google Drive compartido · rabi_94 → "MATERIAL ORIENTACIÓN 1V" →
 * documento "Asignaturas a trabajar en primera vuelta"
 * (Doc 1Req_Zq_XX5wtr159N9qDd8mV9Tjb21psIzqHnaN02mA, owner ravi_94@hotmail.es).
 *
 * Para cada asignatura, rabi_94 cruza qué TEMAS hacer en 1ª vuelta según los 3
 * grandes manuales españoles: CTO, AMIR y MirAsturias. Los temas marcados con
 * **dobleAsterisco** en el original = los que él remarca como núcleo duro.
 *
 * Esto NO sustituye a ProMIR: es la CAPA DE PRIORIZACIÓN que se superpone sobre
 * el temario real de ProMIR para decidir el orden de ataque y qué subtemas son
 * imprescindibles en la primera vuelta (1h/día → 15-ago).
 */

export interface Prioridad1V {
  asignatura: string;
  /** match con la clave de ProMIR (para cruzar con MIR_*_DATA) */
  promirKey?: string;
  /** Temas núcleo (rabi_94 los remarca con **) — los imprescindibles 1V */
  nucleo: string[];
  /** Temas complementarios de 1V según los manuales */
  complementarios?: string[];
  /** Notas/matices del propio rabi_94 (qué NO memorizar, qué sí, atajos) */
  matices?: string[];
  fuentes: Array<'CTO' | 'AMIR' | 'MirAsturias'>;
}

export const PRIORIDADES_1V_META = {
  titulo: 'Asignaturas a trabajar en 1.ª vuelta',
  autor: 'rabi_94 · MATERIAL ORIENTACIÓN 1V (Google Drive compartido)',
  metodo: 'Cruce CTO × AMIR × MirAsturias — qué temas son núcleo de 1ª vuelta',
  nota: 'Capa de priorización real (no inventada). Se superpone sobre el temario de ProMIR para fijar el orden de ataque hasta el 15-ago.',
};

export const PRIORIDADES_1V: Prioridad1V[] = [
  {
    asignatura: 'Estadística y Epidemiología',
    promirKey: 'estadistica',
    nucleo: ['Todo el manual (Preventiva parte 1 y parte 2)'],
    matices: ['Asignatura "todo o nada" rentable: rabi_94 la marca completa en 1ª vuelta.'],
    fuentes: ['CTO', 'AMIR'],
  },
  {
    asignatura: 'Cardiología',
    promirKey: 'cardiologia',
    nucleo: ['Valvulopatías'],
    complementarios: [
      'Semiología cardiológica',
      'Cardiopatía isquémica (en MirAsturias son varios temas: hacerlos todos)',
    ],
    matices: ['rabi_94 remarca Valvulopatías como núcleo duro de 1ª vuelta.'],
    fuentes: ['CTO', 'MirAsturias'],
  },
  {
    asignatura: 'Neurología',
    promirKey: 'neurologia',
    nucleo: ['Enfermedad cerebrovascular (ictus)', 'Patología raquimedular / radicular y medular'],
    complementarios: ['Semiología y anatomía del SNC', 'Anatomía y generalidades del SNC'],
    fuentes: ['CTO', 'AMIR'],
  },
  {
    asignatura: 'Endocrinología',
    promirKey: 'endocrino',
    nucleo: ['Introducción', 'Diabetes Mellitus', 'Tiroides'],
    complementarios: [
      'Nutrición, dislipemia y obesidad',
      'Trastornos del metabolismo lipídico / de las lipoproteínas',
    ],
    matices: ['rabi_94 remarca la Introducción + DM + Tiroides como núcleo en los 3 manuales.'],
    fuentes: ['CTO', 'AMIR', 'MirAsturias'],
  },
  {
    asignatura: 'Enfermedades Infecciosas',
    promirKey: 'infecciosas',
    nucleo: [
      'Bacterias y características generales',
      'Métodos diagnósticos en microbiología',
      'Antibióticos',
    ],
    complementarios: ['Neumonía', 'Tuberculosis / infecciones por micobacterias', 'VIH-SIDA'],
    matices: [
      'rabi_94 remarca Generalidades+microbiología+Antibióticos como base imprescindible.',
      'Atajo: esquema de microorganismos de la "Guía de Terapéutica Antimicrobiana 2018" (2ª pág).',
    ],
    fuentes: ['CTO', 'AMIR', 'MirAsturias'],
  },
  {
    asignatura: 'Neumología',
    promirKey: 'neumologia',
    nucleo: ['Fisiología y fisiopatología', 'Neoplasias pulmonares / Tumores', 'EPOC'],
    complementarios: ['Infecciones respiratorias'],
    fuentes: ['CTO', 'AMIR'],
  },
  {
    asignatura: 'Nefrología',
    promirKey: 'nefrologia',
    nucleo: ['Repaso anatomofisiológico / Introducción a nefrourología'],
    complementarios: [
      'Trastornos hidroelectrolíticos específicos (líquidos y electrolitos)',
      'Introducción a la patología glomerular (síndrome nefrótico / nefrítico)',
      'Enfermedades tubulointersticiales, fármacos y riñón',
      'Tubulopatías hereditarias',
    ],
    matices: ['rabi_94 remarca el repaso anatomofisiológico como puerta de entrada obligatoria.'],
    fuentes: ['CTO', 'AMIR', 'MirAsturias'],
  },
  {
    asignatura: 'Ginecología y Obstetricia',
    promirKey: 'ginecologia',
    nucleo: [
      'Cáncer de mama',
      'Cáncer de endometrio',
      'Cáncer de cérvix',
      'Cáncer de ovario',
      'Cáncer de vagina y vulva',
    ],
    complementarios: [
      'Ciclo genital femenino (de MirAsturias si eres de CTO 11ª ed.)',
      'SOPQ / amenorreas y androgenismos',
      'Algoritmo de amenorrea 2º',
      'Patología mamaria',
    ],
    matices: ['rabi_94 remarca toda la oncología ginecológica como núcleo duro de 1ª vuelta.'],
    fuentes: ['CTO', 'AMIR', 'MirAsturias'],
  },
  {
    asignatura: 'Digestivo y Cirugía General',
    promirKey: 'digestivo',
    nucleo: [
      'Estructura del esófago + síntomas esofágicos + anomalías del desarrollo',
      'Disfagia',
      'Trastornos motores del esófago',
      'Enfermedades inflamatorias del esófago (ERGE y esofagitis)',
      'Úlcera péptica / gastroduodenal',
    ],
    complementarios: [
      'Enfermedad Inflamatoria Intestinal',
      'Cirrosis (sólo cirrosis, no complicaciones; centrarse en generalidades y Child)',
      'Cáncer de colon (CCR esporádico) / tumores del intestino grueso',
      'Cáncer de páncreas (adenocarcinoma) / tumores pancreáticos exocrinos',
      'Tumores del esófago',
      'Tumores del estómago',
      'Politraumatismo / traumatismos abdominales',
    ],
    matices: [
      'rabi_94 remarca TODO el bloque esófago + úlcera péptica como núcleo de 1ª vuelta.',
      'Cirrosis: NO memorizar complicaciones en 1ª vuelta (sólo generalidades + Child).',
    ],
    fuentes: ['CTO', 'AMIR', 'MirAsturias'],
  },
  {
    asignatura: 'Reumatología',
    promirKey: 'reumatologia',
    nucleo: ['Generalidades', 'Microcristales (artritis por microcristales)', 'LES', 'Vasculitis'],
    complementarios: ['Artritis reumatoide', 'Espondiloartropatías seronegativas'],
    matices: ['rabi_94 remarca Generalidades + Microcristales + LES + Vasculitis como núcleo.'],
    fuentes: ['CTO', 'AMIR', 'MirAsturias'],
  },
  {
    asignatura: 'Psiquiatría',
    promirKey: 'psiquiatria',
    nucleo: ['Trastornos del ánimo / afectivos', 'Trastornos de ansiedad (neuróticos)'],
    complementarios: ['Introducción', 'Psicofarmacología', 'Trastornos somatomorfos y disociativos'],
    fuentes: ['CTO', 'AMIR', 'MirAsturias'],
  },
];

/** Lookup helper: dada una promirKey devuelve su bloque de prioridad 1V (o undefined). */
export function prioridad1V(promirKey: string): Prioridad1V | undefined {
  return PRIORIDADES_1V.find((p) => p.promirKey === promirKey);
}
