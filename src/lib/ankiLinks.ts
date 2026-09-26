/**
 * ankiLinks.ts — deck de Anki EXACTO para cada día de estudio, respetando la
 * nomenclatura REAL verificada vía AnkiConnect (10-jun-2026):
 *  · MIR:    APEX::MIR::<apex_lowercase>            (es, sin tildes — subtema_mapping.json)
 *  · USMLE:  APEX::USMLE::<Tag_PascalCase>          (los 44 canónicos; 8 ya creados)
 *  · ENCAPS: APEX::ENCAPS::<bloque>::<NN_subtema>   (94 sub-decks, 94/94 = vault)
 *  · Derma:  Dermki::<capítulo>                     (deck pagado, 11 capítulos + AAD)
 *  · LIVIANO: APEX::LIVIANO::<modulo_slug>          (8 sub-decks, generados en livianoCasos.ts; CSV ANKI_COLA/LIVIANO_mecanismo.csv)
 *  · USMLE Pharm: APEX::USMLE::Pharmacology          (mazo TRANSVERSAL aparte — Palmerton §3.5.F regla 5: los días matType='pharm' van ahí)
 * El botón abre AnkiWeb (sesión del usuario); el deck exacto se muestra como texto
 * para ubicarlo en Anki escritorio. NO se crean nombres nuevos.
 */
import { LIV_ANKI_DECK as _LIV_ANKI_DECK } from './livianoCasos';
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
  // v5.7: sistemas del plan que no son de órgano — antes caían al deck de Cardiology por el fallback.
  'Fundamentos': 'General',
  'Pharmacology (transversal)': 'Pharmacology',
  'Assessment': 'General',
  'Banco intensivo': 'General',
  'Sprint final': 'General',
};
/** Mazo de Farmacología TRANSVERSAL (Palmerton §3.5.F regla 5 · ANKI_CONFIG_PALMERTON en usmleData.ts: "pharm = mazo aparte,
 *  20 nuevas/día dentro del cap de 50"). v5.14: los días con `matType === 'pharm'` son D12 · D24 · D46 · D48 · D78 (leídos con node
 *  de usmleStep1Daily.ts el 19-sep). El deck del SISTEMA sigue existiendo para esos días: solo cambia el deck de las tarjetas nuevas. */
export const USMLE_PHARM_DECK = 'APEX::USMLE::Pharmacology';
/** Deck exacto del día USMLE. `matType` (DiaUSMLE.matType) opcional: 'pharm' → mazo transversal de Farmacología. */
export const usmleAnkiDeck = (system: string, matType?: string): string =>
  matType === 'pharm' ? USMLE_PHARM_DECK : `APEX::USMLE::${USMLE_DECK[system] || 'General'}`;

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
  // 12-sep-2026 (puente MIR ↔ USMLE, gaps v3b mir #9): asignaturas del plan MIR v3 que caían al slug automático.
  // ⚠ A VERIFICAR (12-sep): nombres reales por AnkiConnect `deckNames` — Anki estaba CERRADO al escribir esto
  // (localhost:8765 sin respuesta). El motor crea el sub-deck lazy al primer APEX: el slug debe coincidir con la
  // carpeta del vault 03_MIR (epidemiologia / bioetica / dermatologia). No crear variantes a mano.
  'Epidemiología': 'epidemiologia',
  'Medicina Legal y Bioética': 'bioetica',
  'Dermatología': 'dermatologia',
};
export const mirAnkiDeck = (asignatura: string): string =>
  `APEX::MIR::${MIR_DECK[asignatura] || asignatura.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '')}`;

/* ────────────────────────────────────────────────────────────────────────────
 * TAG COMPARTIDO POR SISTEMA · sys::<UsmleSystem> (12-sep-2026 · gaps v3b mir #9 · Palmerton "I Haven't Had to
 * Re-Learn Anything" / Med School Anki FAQ: nunca resetear el mazo, etiquetar por sistema orgánico, suspender
 * quirúrgicamente lo que no aplique).
 *  · Lo llevan las tarjetas de APEX::USMLE (sistema del día = DIAS[].system), de APEX::MIR (usmleSystem del día MIR,
 *    mirDailyPlan) y de APEX::DERMA cuando el átomo cruza con Step 1 (sys::Dermatology + step1).
 *  · Handoff 7-abr-2027 (fase principal MIR): un filtered deck por sistema = `tag:sys::Cardiovascular` reúne el
 *    mecanismo (USMLE) + la clínica (MIR) sin crear ni resetear nada — receta en DATA/SYNC_ANKI_OBSIDIAN_APP.md.
 *  · Formato: Anki separa tags por espacio → sin espacios ni símbolos ('Hematology & Oncology' → Hematology_Oncology).
 * ────────────────────────────────────────────────────────────────────────── */
export const SYS_TAG_SLUG: Record<string, string> = {
  'Fundamentos': 'Fundamentos', 'Immunology': 'Immunology', 'Cardiovascular': 'Cardiovascular', 'Respiratory': 'Respiratory',
  'Renal': 'Renal', 'Gastrointestinal': 'Gastrointestinal', 'Endocrine': 'Endocrine', 'Nervous System': 'Nervous_System',
  'Hematology & Oncology': 'Hematology_Oncology', 'Microbiology / ID': 'Microbiology_ID', 'Reproductive': 'Reproductive',
  'Musculoskeletal / Rheum': 'Musculoskeletal_Rheum', 'Psychiatry & Behavioral': 'Psychiatry_Behavioral', 'Biochemistry': 'Biochemistry',
  // bbCh/usmleSystem que no son sistema de órgano (MIR Epidemiología → Biostats/Epi · Bioética → Ethics/Behavioral · Derma)
  'Biostats/Epi': 'Biostats_Epi', 'Ethics/Behavioral': 'Ethics_Behavioral', 'Dermatology': 'Dermatology',
};
const sysSlug = (system: string): string =>
  SYS_TAG_SLUG[system]
  || String(system || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_+|_+$/g, '')
  || 'General';
/** Tag compartido USMLE ↔ MIR ↔ Derma: 'sys::<usmleSystem>'. MIR pasa `dia.usmleSystem`; '—' / vacío → 'sys::General'. */
export const sysTag = (system: string): string => `sys::${!system || system === '—' ? 'General' : sysSlug(system)}`;
/** Búsqueda Anki (Browse / filtered deck) que reúne USMLE + MIR de un sistema — la receta del handoff 7-abr. */
export const sysFilteredQuery = (system: string): string => `${sysTag(system).replace(/^/, 'tag:')} (deck:APEX::USMLE OR deck:APEX::MIR)`;
/** Los 14 sistemas del plan Step 1 con su tag (para el checklist de arranque y la tabla de SYNC_ANKI). */
export const SYS_TAGS: { system: string; tag: string }[] = Object.keys(SYS_TAG_SLUG).map((system) => ({ system, tag: sysTag(system) }));

/** ENCAPS — bloque + subtema → sub-deck exacto (94 pre-creados, verificado 94/94) */
export const encapsAnkiDeck = (blockId: string, subtemaId: string): string =>
  `APEX::ENCAPS::${blockId}::${subtemaId}`;

/* ─────────────────────────────────────────────────────────────────
 * LIVIANO (Academia · Logística F5) — deck de MECANISMO APEX::LIVIANO::<modulo_slug> (19-sep-2026, v5.14)
 *  · 8 sub-decks: fisiologia · glp1 · acceso_peru · nutricion · ejercicio · farmaco_qx · conducta · sintesis
 *    (= módulos de livianoStudyPlan.ts; mapa GENERADO por DATA/_scripts/gen_liviano_plan.js en livianoCasos.ts:
 *    LIV_ANKI_DECK / livAnkiDeck — aquí se RE-EXPORTA para que ankiLinks.ts siga siendo el catálogo único).
 *  · 216 tarjetas en DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv (#deck column:3 · tags `liviano::<modulo> dNN mecanismo`).
 *    ⚠ A VERIFICAR (19-sep): los 8 sub-decks NO están creados en Anki (Anki cerrado; sin AnkiConnect). Se crean solos al
 *    importar el CSV (D16 lun 19-oct-2026 en v5.16; ver LIVIANO_ACADEMIA.md) o antes con createDeck.
 *  · Mismo motor FSRS que el resto del sistema APEX; sin deck de pago.
 * ───────────────────────────────────────────────────────────────── */
export { LIV_ANKI_DECK_ROOT as LIVIANO_ANKI_ROOT, LIV_ANKI_DECK as LIVIANO_DECK_POR_MODULO, livAnkiDeck as livianoAnkiDeck } from './livianoCasos';
/** Los 8 sub-decks que deben existir en Anki (checklist de arranque / AnkiConnect deckNames), en orden del currículo. */
export const LIVIANO_ANKI_DECKS: string[] = Array.from(new Set(Object.values(_LIV_ANKI_DECK)));

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
  /** 12-sep-2026 (puente Derma ↔ Step 1, gaps v3b derma #6): el átomo cruza con "dermato Step 1" (DiaDerma.step1 / DERMA_STEP1_DIAS) → tag `step1`. */
  step1?: boolean;
}
/** Tag de cuenta doble Derma ↔ Step 1: las tarjetas con este tag son el repaso anclado del día "dermato Step 1" (D73). */
export const DERMA_STEP1_TAG = 'step1';
/** Búsqueda Anki del repaso anclado / pre-test del día "dermato Step 1" (texto de UI; el contenido USMLE no cambia). */
export const DERMA_STEP1_QUERY = `deck:${DERMA_ANKI_ROOT} tag:${DERMA_STEP1_TAG}`;
/** Tags Anki de una tarjeta Derma: derma::<bloque> dNN mecanismo [caso-ID] [core-Área] [step1 sys::Dermatology]. */
export function dermaAnkiTags(t: Pick<DermaTarjetaMecanismo, 'bKey' | 'd' | 'casoId' | 'moduloCORE' | 'step1'>): string {
  const tags = [`derma::${(DERMA_ANKI_BLOQUES as readonly string[]).includes(t.bKey) ? t.bKey : 'A'}`, `d${String(t.d).padStart(2, '0')}`, 'mecanismo'];
  if (t.casoId) tags.push(`caso-${t.casoId}`);
  if (t.moduloCORE) tags.push(`core-${t.moduloCORE}`);
  if (t.step1) tags.push(DERMA_STEP1_TAG, sysTag('Dermatology'));
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
