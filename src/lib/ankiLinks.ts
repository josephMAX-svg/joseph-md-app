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
