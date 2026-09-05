/**
 * ankiLinks.ts — deck de Anki EXACTO para cada día de estudio, respetando la
 * nomenclatura REAL verificada vía AnkiConnect (10-jun-2026):
 *  · MIR:    APEX::MIR::<apex_lowercase>            (es, sin tildes — subtema_mapping.json)
 *  · USMLE:  APEX::USMLE::<Tag_PascalCase>          (los 44 canónicos; 8 ya creados)
 *  · ENCAPS: APEX::ENCAPS::<bloque>::<NN_subtema>   (94 sub-decks, 94/94 = vault)
 *  · Derma:  Dermki::<capítulo>                     (deck pagado, 11 capítulos + AAD)
 * El botón abre AnkiWeb (sesión del usuario); el deck exacto se muestra como texto
 * para ubicarlo en Anki escritorio. NO se crean nombres nuevos.
 */
export const ANKIWEB = 'https://ankiweb.net/decks';

/** USMLE — sistema del plan → tag canónico (subtema_mapping.json USMLE, 44 tags) */
const USMLE_DECK: Record<string, string> = {
  'Cardiovascular': 'Cardiology',
  'Respiratory': 'Pulmonology',
  'Renal': 'Nephrology',
  'Gastrointestinal': 'Gastroenterology',
  'Endocrine': 'Endocrinology',
  'Nervous System': 'Neurology',
  'Hematology & Oncology': 'Hematology_Oncology',
  'Reproductive': 'Gynecology',
  'Musculoskeletal / Rheum': 'Rheumatology',
  'Psychiatry & Behavioral': 'Psychiatry',
  'Immunology': 'Immunology',
  'Microbiology / ID': 'Microbiology',
  'Biochemistry': 'Biochemistry',
};
export const usmleAnkiDeck = (system: string): string =>
  `APEX::USMLE::${USMLE_DECK[system] || 'Cardiology'}`;

/** MIR — asignatura del plan → apex_lowercase (tags clínicos existentes en Anki) */
const MIR_DECK: Record<string, string> = {
  'Cardiología': 'cardiologia',
  'Gastroenterología': 'digestivo',          // el tag clínico histórico es "Digestivo"
  'Nefrología': 'nefrologia',
  'Endocrinología y Nutrición': 'endocrinologia',
  'Neumología': 'neumologia',
  'Enfermedades Infecciosas': 'infecciosas',
  'Neurología': 'neurologia',
  'Reumatología': 'reumatologia',
  'Hematología': 'hematologia',
  'Ginecología y Obstetricia': 'ginecologia',
  'Pediatría': 'pediatria',
  'Psiquiatría': 'psiquiatria',
};
export const mirAnkiDeck = (asignatura: string): string =>
  `APEX::MIR::${MIR_DECK[asignatura] || asignatura.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '')}`;

/** ENCAPS — bloque + subtema → sub-deck exacto (94 pre-creados, verificado 94/94) */
export const encapsAnkiDeck = (blockId: string, subtemaId: string): string =>
  `APEX::ENCAPS::${blockId}::${subtemaId}`;

/** Derma — deck pagado Dermki (capítulos reales verificados en Anki) */
export const DERMKI_DECK = 'Dermki';

/* ────────────────────────────────────────────────────────────────────────────
 * Derma · PLAN ÉLITE v2.1 (5-sep-2026) — estructura Anki propia del método Palmerton
 *  · Sub-decks APEX::DERMA::<bloque> (10: A B C D E F G H Z X = bloques de dermaDailyPlan.ts).
 *    ⚠ A VERIFICAR (05-sep): crear los 10 sub-decks en Anki escritorio (o vía AnkiConnect
 *    createDeck) ANTES del d1; aquí solo se NOMBRAN (misma convención que APEX::ENCAPS/USMLE/MIR).
 *  · Nota tipo "Palmerton-Mecanismo": FRENTE = pregunta de MECANISMO ("¿por qué X produce Y?")
 *    → REVERSO = el porqué (cascada) + CCSN (con qué se confunde y el discriminador) + fuente.
 *    Se importa como TSV (Front/Back/Deck/Tags) con la plantilla
 *    DATA/DERMATOLOGIA/ANKI_COLA/PLANTILLA_SESION.txt — el reverso lleva las 3 líneas.
 *  · Oclusión de imagen: notetype NATIVO "Image Occlusion" (Anki ≥ 23.10) sobre una CAPTURA
 *    PERSONAL de la lámina del caso (AccessDerma, uso privado). La imagen vive solo en la
 *    colección de Anki: NO se re-hostea en la app ni se sube a ningún sitio (DermNet es CC BY-NC-ND).
 *  · Mismo motor FSRS que Step 1 (un solo sistema); las tarjetas Derma se distinguen por deck+tag.
 * ────────────────────────────────────────────────────────────────────────── */
export const DERMA_ANKI_ROOT = 'APEX::DERMA';
export const DERMA_ANKI_BLOQUES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Z', 'X'] as const;
export type DermaAnkiBloque = (typeof DERMA_ANKI_BLOQUES)[number];
/** Sub-deck exacto del bloque (A..X). Un bKey desconocido cae en 'A' (fundamentos), nunca crea nombres nuevos. */
export const dermaAnkiDeck = (bKey: string): string =>
  `${DERMA_ANKI_ROOT}::${(DERMA_ANKI_BLOQUES as readonly string[]).includes(bKey) ? bKey : 'A'}`;
/** Los 10 sub-decks que deben existir en Anki (para el checklist de arranque / AnkiConnect deckNames). */
export const DERMA_ANKI_DECKS: string[] = DERMA_ANKI_BLOQUES.map((b) => `${DERMA_ANKI_ROOT}::${b}`);

/**
 * Dermki (deck pagado, 11 capítulos + AAD) — capítulo SUGERIDO por bloque del plan v2.
 * ⚠ Los nombres exactos de los sub-decks Dermki NO están verificados aquí (solo el raíz 'Dermki'):
 * la UI muestra "Dermki → <tema>" como pista de búsqueda; A VERIFICAR (05-sep) con AnkiConnect deckNames.
 */
export const DERMKI_TEMA_POR_BLOQUE: Record<DermaAnkiBloque, string> = {
  A: 'Fundamentos / morfología', B: 'Dermatosis inflamatorias', C: 'Infecciosas', D: 'Neoplasias / dermatoscopia',
  E: 'Dermatopatología', F: 'Pediátrica', G: 'Cirugía', H: 'Repaso general (CORE)', Z: 'Repaso general (CORE)', X: 'Cosmética / procedimientos',
};
export const dermkiPista = (bKey: string): string =>
  `${DERMKI_DECK} → ${DERMKI_TEMA_POR_BLOQUE[(bKey as DermaAnkiBloque)] || DERMKI_TEMA_POR_BLOQUE.A}`;

/** Tipos de nota Derma (nombres tal como deben verse en Anki). */
export const DERMA_ANKI_NOTETYPES = {
  /** Se importa como Basic (Front/Back) con el reverso en 3 líneas: POR QUÉ · CCSN · FUENTE. */
  mecanismo: 'Palmerton-Mecanismo',
  /** Notetype nativo de Anki ≥ 23.10 — se crea desde el editor (Añadir → Image Occlusion), no por TSV. */
  oclusion: 'Image Occlusion',
} as const;

export interface DermaTarjetaMecanismo {
  frente: string;        // "¿Por qué …?" (mecanismo, nunca dato suelto)
  porQue: string;        // la cascada / el porqué
  ccsn: string;          // con qué se confunde + el discriminador
  fuente: string;        // caso #id / capítulo / PMID
  bKey: string;          // bloque A..X → deck
  d: number;             // sesión del plan
  casoId?: number;       // id 1-200 del banco (si viene de un caso)
  moduloCORE?: 'Med' | 'Path' | 'Peds' | 'Surg';
}
/** Tags Anki de una tarjeta Derma: derma::<bloque> dNN mecanismo [caso-ID] [core-Área]. */
export function dermaAnkiTags(t: Pick<DermaTarjetaMecanismo, 'bKey' | 'd' | 'casoId' | 'moduloCORE'>): string {
  const tags = [`derma::${(DERMA_ANKI_BLOQUES as readonly string[]).includes(t.bKey) ? t.bKey : 'A'}`, `d${String(t.d).padStart(2, '0')}`, 'mecanismo'];
  if (t.casoId) tags.push(`caso-${t.casoId}`);
  if (t.moduloCORE) tags.push(`core-${t.moduloCORE}`);
  return tags.join(' ');
}
const tsvSafe = (s: string) => String(s || '').replace(/\t/g, ' ').replace(/\r?\n/g, ' · ').trim();
/** Fila TSV importable (Front⇥Back⇥Deck⇥Tags) — misma cabecera que PLANTILLA_SESION.txt. */
export function dermaAnkiTsvRow(t: DermaTarjetaMecanismo): string {
  const back = `POR QUÉ: ${tsvSafe(t.porQue)} · CCSN: ${tsvSafe(t.ccsn)} · FUENTE: ${tsvSafe(t.fuente)}`;
  return [tsvSafe(t.frente), back, dermaAnkiDeck(t.bKey), dermaAnkiTags(t)].join('\t');
}
/** Cabecera del fichero de importación (idéntica a DATA/DERMATOLOGIA/ANKI_COLA/PLANTILLA_SESION.txt). */
export const DERMA_ANKI_TSV_HEADER = ['#separator:tab', '#html:false', '#deck column:3', '#tags column:4', '#columns:Front\tBack\tDeck\tTags'].join('\n');
/** Fichero TSV completo de una sesión (cabecera + filas) listo para Archivo → Importar en Anki. */
export function dermaAnkiTsv(tarjetas: DermaTarjetaMecanismo[]): string {
  return [DERMA_ANKI_TSV_HEADER, ...tarjetas.map(dermaAnkiTsvRow)].join('\n') + '\n';
}
/** Checklist de la oclusión de imagen por caso (paso ④ del caso ciego). */
export const DERMA_OCLUSION_CHECKLIST: string[] = [
  'Captura personal de la lámina del caso (AccessDerma) — solo a tu colección de Anki, nunca a la app ni a Drive compartido',
  'Añadir → tipo "Image Occlusion" → deck APEX::DERMA::<bloque> → pegar la captura',
  'Ocultar SOLO el rasgo morfológico discriminador (no el diagnóstico escrito): p. ej. el borde perlado, el collarete, la umbilicación',
  'Campo extra: "¿Qué mecanismo produce este rasgo?" (enlaza con la tarjeta de mecanismo de la misma sesión)',
  'Tags: derma::<bloque> dNN oclusion caso-<id> core-<Área>',
];
