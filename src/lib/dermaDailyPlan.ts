/**
 * dermaDailyPlan.ts — Plan DÍA A DÍA Dermatología · PLAN ÉLITE v2.1 (5-sep-2026).
 * Fuente: DATA/DERMATOLOGIA/PLAN_ELITE_2026-27.md (agente macro:derma-estetica-elite +
 * inventario AccessDermatology REAL) — 70 sesiones hacia DERMATOLOGÍA ESTÉTICA.
 *
 * CICLO ÚNICO de 45′ por sesión (franja 13:30–14:15, interdiario con Research):
 *   1) 2 casos VISUALES CIEGOS de "Dermatology Cases for Board Review" (200 casos:
 *      Med 110 · Path 30 · Peds 30 · Surg 30) en ORDEN ALEATORIO FIJO (permutación seeded
 *      DERMA_CASO_ORDEN → campo casoIds por sesión; 140 en la primera pasada, 60 post-Step 1) —
 *      método Palmerton en 4 pasos: ① morfología en terminología estándar ② diferencial
 *      de 3 ③ viñeta y responder ④ discusión → 1-2 tarjetas de MECANISMO + 1 oclusión.
 *      El caso NUNCA se salta; los 10Q de review son la variable de ajuste.
 *      ①b) 1 imagen DERMATOSCÓPICA ciega por sesión (campo dermatoscopiaImg: Self-Assessment 2e
 *      en las impares · Dermoscopedia por patrón en las pares).
 *   2) ~10Q de review rotando los bancos REALES (1.301Q): Pictorial 4e 381Q (~38 sesiones)
 *      → CORE Exam Bank 104Q (~9, cierre de módulo) → Barnhill's Challenge 403Q (dermpath)
 *      → QOTW 50Q (checkpoints). Etiquetar CADA fallo con su módulo CORE (med/ped/surg/path)
 *      en el ledger (dermaLedger.ts · localStorage 'jmd-derma-casos' / 'jmd-derma-fallos').
 *   3) 10′ de LECTURA dirigida del módulo semanal: Fitzpatrick (clínica) · Baumann 3e /
 *      Lasers / Procedural / Dermatologic Surgery (estética) — nunca lectura lineal.
 *      MICRO-TRACK DERMATOSCOPIA: en las sesiones PARES d6→d40 el slot de lectura lo ocupa
 *      un módulo del DermNet Dermoscopy CME (18 módulos, campo dermatoscopiaModulo); d42 quizzes
 *      y d44 imágenes comparativas. La lectura del módulo queda en las impares.
 *
 * PROGRESIÓN de módulos (fundamentos → … → ESTÉTICA = la meta, 22 átomos X):
 *   A Fundamentos/morfología (d1-6) · B Inflamatorias (d7-13) · C Infecciosas (d14-18, d57-58) ·
 *   X SEGURIDAD DE FILLERS adelantada (d19-20: oclusión vascular + HDPH · ceguera + kit) ·
 *   D Tumores (d21-28) · E Dermpath básica (d29-33) · F Pediátrica (d34-38) ·
 *   G Quirúrgica/anatomía facial (d39-44) · H Checkpoint CORE (d45-46) ·
 *   X ESTÉTICA (d47-56, d59-68: toxina → fillers → peelings → láser → cosmecéutica) ·
 *   Z Cierre (d69-70). Regla de SEGURIDAD primero: complicaciones antes que técnica.
 *
 * ⚠ SWAP v2.1 (de CONTENIDO, no de fechas): d19↔d57 y d20↔d58. La seguridad de fillers
 *   (oclusión vascular/HDPH + ceguera) se estudia en octubre para preceder a la extracción de
 *   datos de SR-1 en Research (R22-R25, 5-13 nov) y a los subgrupos tiempo-a-hialuronidasa (R33,
 *   7-dic). "El paciente agudo con fiebre y rash" y "pelo y uñas infecciosos" pasan a d57-58.
 *   Campo puenteResearch marca los átomos que alimentan SR-1 (L4) / SR-2 (L5).
 *
 * ⚠ FECHAS re-fechadas v5.6: D1 lun 2026-09-07 → D70 lun 2027-03-22 (interdiario con Research,
 * ancla en researchData.ts#diaEstudioTipo; sáb+dom libres; salta 25-dic/31-dic/1-ene) — NO TOCAR
 * las fechas a mano (usar DATA/_scripts/remap_inicio.js, que localiza la PRIMERA aparición del
 * marcador del array de días y parsea cada campo fecha hasta el cierre del array — por eso este
 * comentario NO repite el marcador literal ni el cierre; no meter cierres de array ni otros campos
 * fecha dentro del bloque de días).
 * URLs 100% reales: q-banks y cases verificados en dermaSourcesData.ts; deep-links de libros con
 * sectionid verificado; papers = DOIs/PMC del PLAN_ELITE y de referentes.md; DermNet/Dermoscopedia
 * verificados por HTTP 200 / TOC del sitio el 5-sep-2026 (describing-skin-lesions y
 * cutaneous-leishmaniasis daban 404 → sustituidos por terminology / leishmaniasis).
 */
import { diaEstudioTipo, VUELTAS, INTERVALOS, type Prioridad } from './researchData';

export { diaEstudioTipo, VUELTAS, INTERVALOS };
export type { Prioridad };

const MH = 'https://dermatology.mhmedical.com';
export const ca = (sid: number) => `${MH}/content.aspx?bookid=3309&sectionid=${sid}`;
export const book = (id: number) => `${MH}/book.aspx?bookid=${id}`;
export const qa = (id: number) => `${MH}/qa.aspx?resourceid=${id}`;
export const cases = (gid: number) => `${MH}/cases.aspx?groupid=${gid}`;
export const mm = (hash: number) => `${MH}/multimedia.aspx#${hash}`;
/** Home de la biblioteca AccessDerma (36 libros). */
export const BOOKS_LIB = `${MH}/books.aspx?view=library`;
/** Qbankly (legado USMLE): SOLO Edge — se mantiene por compat, el plan v2 usa los q-banks de AccessDerma. */
export const qb = (doc: number) => `https://qbankly.app/library?e=1&doc=${doc}`;
export const QB_QBANKS = 'https://qbankly.app/qbanks';
export const pm = (capId: string) => `https://promir.medicapanamericana.com/capitulo/${capId}`;
/** capIds ProMIR Dermatología (asignatura 5) — verificados; NO usados por el plan v2 (compat). */
export const PM_CAP = {
  intro: '62836950c0f8415ab9efb5c7', c1: '570779c8f4d68bf008dbc646', c2: '570779c8f4d68bf008dbc6a2',
  c3: '570779c9f4d68bf008dbc71f', c4: '570779c9f4d68bf008dbc77b', c5: '570779c8f4d68bf008dbc5fc',
  c6: '570779c8f4d68bf008dbc648', c7: '570779c8f4d68bf008dbc6a4', c8: '570779c9f4d68bf008dbc721',
  c9: '570779c9f4d68bf008dbc77d', c10: '64465ebc321262437c8d0c8f',
} as const;

export const DERMA_DAILY_META = {
  inicio: '2026-09-07', fin: '2027-03-22', totalDias: 70, // v5.6 (5-sep): D1=lun 7-sep-2026 · interdiario con Research (paridad researchData.ts) · sáb+dom libres · salta 25-dic/31-dic/1-ene · NO tocar a mano
  bloque: '13:30–14:15 (45 min · franja boards del Calendar, alterna con Research — interdiario)',
  nota: 'PLAN ÉLITE v2.1: cada sesión = 2 casos CIEGOS fijos (casoIds, permutación seeded de los 200) + 1 imagen dermatoscópica ciega + ~10Q review (rotación 1.301Q, fallos etiquetados med/ped/surg/path en el ledger) + 10′ lectura del módulo (o módulo DermNet Dermoscopy CME en las pares d6-d44). Progreso REAL marcable (studyProgress key "derma"). El día mostrado salta los días-Research.',
};

/** Franjas de la sesión Derma de 45 min — ciclo único del PLAN ÉLITE (caso ciego + review + lectura). */
export const DERMA_FRANJAS = [
  { hora: '13:30–13:33', fase: 'Repaso FSRS: tarjetas de MECANISMO + fallos etiquetados (med/ped/surg/path) de la sesión previa', tipo: 'eval' },
  { hora: '13:33–13:36', fase: 'CASO CIEGO ①②: SOLO la imagen → describe la morfología en terminología estándar (8 ejes) + diferencial de 3 (sin leer nada) · ①b imagen dermatoscópica ciega', tipo: 'pretest' },
  { hora: '13:36–13:52', fase: 'CASO ③④: leer la viñeta y responder → discusión → 1-2 tarjetas de MECANISMO + 1 oclusión de imagen (el caso NUNCA se salta) · acierto/fallo al ledger', tipo: 'read' },
  { hora: '13:52–14:03', fase: '~10Q review del banco rotante (Pictorial 4e → CORE → Barnhill dermpath → QOTW) — variable de ajuste si el caso pidió más', tipo: 'review' },
  { hora: '14:03–14:13', fase: 'LECTURA dirigida 10′ del módulo (Fitzpatrick clínica · Baumann/Lasers/Procedural estética) — o módulo DermNet Dermoscopy CME en sesiones pares d6-d44', tipo: 'lectura' },
  { hora: '14:13–14:15', fase: 'Cierre: free recall del caso (7 pasos del cerebro clínico si es ficha) + etiquetar fallos con su módulo CORE + marcar progreso real', tipo: 'apex' },
];

export type DermaBloqueKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'Z' | 'X';
export type DermaTier = 'CRIT' | 'ALTA' | 'MED';
export interface MatLink { t: string; url: string; via?: 'edge' }

/** Área del banco "Dermatology Cases for Board Review" (200 casos: Med 110 · Path 30 · Peds 30 · Surg 30). */
export type DermaAreaCORE = 'Med' | 'Path' | 'Peds' | 'Surg';
export interface DermaCaso { id: number; area: DermaAreaCORE }
/** Módulo DermNet Dermoscopy CME (micro-track, ocupa el slot de lectura en sesiones pares d6→d44). */
export interface DermatoscopiaModulo { n: number; t: string; url: string }
/** Puente con el programa de Research: qué SR alimenta este átomo (chip "alimenta SR-1" en HOY). */
export interface PuenteResearch { linea: 'L4' | 'L5'; sr: 'SR-1' | 'SR-2'; nota: string }
/** Capa Nítida (Pulso · dermatología médica por suscripción): el átomo convertido en protocolo de producto. */
export interface NitidaProtocolo { protocolo: string; guion: string; seguimiento: string }

export interface DiaDerma {
  d: number; fecha: string; bloque: string; bKey: DermaBloqueKey; tier: DermaTier;
  sub: string; referente: string | null;
  access: MatLink;            // CASO del día (Cases for Board Review / DD Challenge — el motor)
  qbankly: MatLink | null;    // REVIEW ~10Q del banco rotante de AccessDerma (Pictorial/CORE/Barnhill/QOTW)
  promir: MatLink | null;     // 2º pase ES (NO usado en el plan v2 — compat con la UI)
  extra: MatLink | null;      // LECTURA dirigida 10′ del módulo (libro AccessDerma o paper del referente)
  /** Los 2 casos CIEGOS de la sesión (ids 1-200 de DERMA_CASOS, permutación fija DERMA_CASO_ORDEN). */
  casoIds: [number, number];
  // ── Capa ATLAS (todos OPCIONALES — no rompen ningún átomo existente) ──
  morfologia?: string;        // lesión elemental dominante (chip de la lámina)
  sitio?: string;             // sitio corporal → BodyMap
  fototipo?: string;          // nota de piel de color / Fitzpatrick
  ddx?: string[];             // diferencial (DifferentialTray, método Palmerton)
  atlasUrl?: string;          // lámina clínica: deep-link legal (DermNet/AccessDerma), NO re-host
  dermatoscopiaUrl?: string;  // panel dermatoscopia (Dermoscopedia)
  histoUrl?: string;          // panel histología (dermpathatlas / Barnhill)
  // ── Capa v2.1 ──
  dermatoscopiaModulo?: DermatoscopiaModulo; // módulo DermNet Dermoscopy CME de la sesión (pares d6-d44)
  dermatoscopiaImg?: string;  // 1 imagen dermatoscópica CIEGA por sesión (Self-Assessment 2e ↔ Dermoscopedia por patrón)
  puenteResearch?: PuenteResearch; // alimenta SR-1 (L4 oclusión vascular) / SR-2 (L5 fototipos IV-VI)
  nitida?: NitidaProtocolo;   // 7 átomos B + d68: consulta tipo tele-derma (foto estandarizada, rutina ≤3 pasos, revisión 6-8 sem, métrica)
}

const B = {
  A: 'Fundamentos / morfología', B: 'Dermatosis inflamatorias', C: 'Infecciosas',
  D: 'Tumores benignos / malignos', E: 'Dermatopatología básica', F: 'Pediátrica',
  G: 'Quirúrgica / anatomía facial', H: 'Checkpoint CORE', Z: 'Cierre / repaso', X: 'Estética',
};

// ── Bloques de review rotantes (q-banks REALES de AccessDerma, ids verificados) ──
const rPIC: MatLink = { t: 'Pictorial Review 4e · ~10Q (de 381)', url: qa(3626) };
const rCORE: MatLink = { t: 'CORE Exam Bank · ~10Q (de 104) — cierre de módulo', url: qa(3479) };
const rBARN: MatLink = { t: "Barnhill's Challenge · ~10Q dermpath (de 403)", url: qa(2865) };
const rQOTW: MatLink = { t: 'Question of the Week · archivo (50Q)', url: qa(3562) };
// ── El motor: casos visuales ciegos ──
const CASO: MatLink = { t: 'Cases for Board Review · 2 casos CIEGOS (casoIds · permutación fija de 200)', url: cases(1546) };
const CASO_DD: MatLink = { t: 'Differential Diagnosis Challenge · pares de diferencial (100 sets)', url: cases(1616) };
const CASO_FALLOS: MatLink = { t: 'Board Review · SOLO casos fallados del ledger (segunda pasada FSRS)', url: cases(1546) };
const ABD_GUIDE = 'https://dlpgnf31z4a6s.cloudfront.net/media/252836/core-study-guide-012021.pdf';

/* ────────────────────────────────────────────────────────────────────────────
 * CASOS · "Dermatology Cases for Board Review" (AccessDerma groupid 1546)
 * id = posición 1-200 en el listado del banco; área según los 4 apartados reales
 * (Medical 110 · Dermatopathology 30 · Pediatric 30 · Surgical 30 — dermaSourcesData.ts).
 * ⚠ A VERIFICAR (5-sep): que el listado de cases.aspx?groupid=1546 esté ordenado por área en
 * ese orden (Med 1-110 · Path 111-140 · Peds 141-170 · Surg 171-200); si no, re-mapear
 * dermaCasoArea() sin tocar DERMA_CASO_ORDEN.
 * ────────────────────────────────────────────────────────────────────────── */
export const DERMA_CASOS_META = { total: 200, med: 110, path: 30, peds: 30, surg: 30, groupid: 1546 } as const;
export function dermaCasoArea(id: number): DermaAreaCORE {
  return id <= 110 ? 'Med' : id <= 140 ? 'Path' : id <= 170 ? 'Peds' : 'Surg';
}
export const DERMA_CASOS: DermaCaso[] = Array.from({ length: 200 }, (_, i) => ({ id: i + 1, area: dermaCasoArea(i + 1) }));
/**
 * Permutación seeded FIJA de los 200 casos (interleaving real, sin agrupar por tema).
 * Generada una sola vez con mulberry32(seed 20260907 = D1 v5.6) + Fisher-Yates
 * (script: scratchpad/perm.js del agente derma v2.1) y CONGELADA aquí como literal para que
 * ningún cambio de runtime altere qué caso toca qué día. Posiciones 0-139 = primera pasada
 * (2/sesión × 70) · 140-199 = resto post-Step 1 (feb-2027, al subir a 5 casos/sesión).
 */
export const DERMA_CASO_ORDEN: number[] = [
  192, 43, 112, 166, 25, 165, 21, 194, 36, 84, 49, 14, 124, 67, 151, 179, 82, 47, 109, 176,
  162, 170, 142, 103, 155, 57, 55, 30, 146, 105, 76, 168, 20, 104, 150, 96, 148, 180, 89, 9,
  6, 159, 173, 12, 129, 32, 39, 121, 91, 42, 35, 189, 164, 108, 90, 158, 65, 58, 59, 134,
  71, 143, 107, 74, 27, 187, 68, 23, 184, 97, 126, 188, 169, 64, 62, 17, 72, 11, 40, 3,
  147, 154, 195, 88, 63, 86, 175, 122, 73, 54, 41, 198, 114, 110, 128, 144, 138, 28, 16, 177,
  171, 123, 127, 44, 48, 178, 200, 18, 81, 106, 182, 167, 130, 92, 61, 183, 31, 7, 51, 174,
  135, 8, 38, 186, 133, 29, 199, 70, 113, 95, 139, 197, 131, 185, 149, 33, 157, 181, 69, 66,
  115, 101, 156, 19, 191, 119, 99, 53, 145, 141, 172, 45, 34, 102, 163, 46, 87, 136, 77, 50,
  2, 196, 60, 190, 93, 80, 140, 5, 52, 1, 152, 4, 161, 78, 10, 24, 85, 193, 118, 56,
  26, 132, 116, 160, 94, 111, 117, 15, 13, 75, 98, 120, 137, 83, 100, 37, 22, 125, 153, 79,
];
export const DERMA_CASO_META = {
  seed: 20260907, algoritmo: 'mulberry32 + Fisher-Yates (congelado como literal)',
  porSesion: 2, primeraPasada: 140, restoPostStep1: 60,
  primeraPasadaPorArea: { Med: 75, Path: 18, Peds: 22, Surg: 25 },
} as const;
/** Par de casos de la sesión d (1-70) según la permutación fija (idéntico al literal casoIds de la fila). */
export function dermaCasosDeSesion(d: number): [number, number] {
  const i = Math.max(0, Math.min(69, d - 1)) * 2;
  return [DERMA_CASO_ORDEN[i], DERMA_CASO_ORDEN[i + 1]];
}
/** Los 60 casos que quedan para la 2ª fase (post-Step 1, feb-2027), en el orden de la permutación. */
export function dermaCasosPostStep1(): DermaCaso[] {
  return DERMA_CASO_ORDEN.slice(140).map((id) => ({ id, area: dermaCasoArea(id) }));
}

/* ────────────────────────────────────────────────────────────────────────────
 * MICRO-TRACK DERMATOSCOPIA · DermNet Dermoscopy CME (18 módulos, URLs verificadas 5-sep-2026
 * desde https://dermnetnz.org/cme/dermoscopy-course). Ocupa el slot de lectura de 10′ en las
 * sesiones PARES d6→d40 (módulo n en d = 6 + 2·(n−1)); d42 = quizzes, d44 = imágenes comparativas.
 * ────────────────────────────────────────────────────────────────────────── */
const DN = 'https://dermnetnz.org';
const CME = `${DN}/cme/dermoscopy-course`;
export const DERMATOSCOPIA_CME: DermatoscopiaModulo[] = [
  { n: 1, t: 'Introducción a la dermatoscopia', url: `${CME}/introduction-to-dermoscopy` },
  { n: 2, t: 'Estructuras dermatoscópicas', url: `${CME}/dermoscopic-features` },
  { n: 3, t: 'Lista de 3 puntos (three-point checklist)', url: `${CME}/three-point-checklist` },
  { n: 4, t: 'Lesiones melanocíticas benignas', url: `${CME}/dermoscopy-of-benign-melanocytic-lesions` },
  { n: 5, t: 'Nevus atípicos', url: `${CME}/dermoscopy-of-atypical-naevi` },
  { n: 6, t: 'Melanoma', url: `${CME}/dermoscopy-of-melanoma` },
  { n: 7, t: 'Queratosis seborreica', url: `${CME}/dermoscopy-of-seborrhoeic-keratosis` },
  { n: 8, t: 'Carcinoma basocelular', url: `${CME}/dermoscopy-of-basal-cell-carcinoma` },
  { n: 9, t: 'Carcinoma espinocelular', url: `${CME}/dermoscopy-of-squamous-cell-carcinoma` },
  { n: 10, t: 'Otras lesiones no melanocíticas', url: `${CME}/dermoscopy-of-other-non-melanocytic-lesions` },
  { n: 11, t: 'Algoritmo del primer paso (melanocítica vs no)', url: `${CME}/first-step-algorithm` },
  { n: 12, t: 'Análisis de patrones', url: `${CME}/pattern-analysis` },
  { n: 13, t: 'Otros algoritmos para lesiones melanocíticas (ABCD, Menzies, 7 puntos)', url: `${CME}/other-algorithms-for-melanocytic-lesions` },
  { n: 14, t: 'El informe dermatoscópico', url: `${CME}/the-dermoscopy-report` },
  { n: 15, t: 'Nevus melanocíticos: nueva clasificación', url: `${CME}/melanocytic-naevi-new-classification` },
  { n: 16, t: 'Dermatoscopia de la uña', url: `${CME}/dermoscopy-of-the-nail` },
  { n: 17, t: 'Correlación dermatoscópica-histológica', url: `${CME}/dermatoscopic-histologic-correlation` },
  { n: 18, t: 'Galería: nevus azul · globular (congénito) · reticular (adquirido)', url: `${CME}/reticular-acquired-naevus-images` },
];
/** Sesiones de repaso del micro-track (d42, d44) — no son módulos del curso. */
const DSC_QUIZ: DermatoscopiaModulo = { n: 19, t: 'Repaso: quizzes de dermatoscopia DermNet (casos ciegos)', url: `${DN}/cme/dermoscopy-quizzes` };
const DSC_COMP: DermatoscopiaModulo = { n: 20, t: 'Repaso: imágenes comparativas de dermatoscopia (pares benigno/maligno)', url: `${DN}/topics/comparative-dermoscopy-images` };
/** Módulo del micro-track que corresponde a la sesión d (pares d6-d40 → módulos 1-18; d42/d44 repaso). */
export function dermatoscopiaModuloDe(d: number): DermatoscopiaModulo | undefined {
  if (d === 42) return DSC_QUIZ;
  if (d === 44) return DSC_COMP;
  if (d < 6 || d > 40 || d % 2 !== 0) return undefined;
  return DERMATOSCOPIA_CME[(d - 6) / 2];
}
const M = (n: number): DermatoscopiaModulo => DERMATOSCOPIA_CME[n - 1];

// ── Imagen dermatoscópica CIEGA por sesión: Self-Assessment 2e (AccessDerma book 2929) en las
//    impares · Dermoscopedia por patrón en las pares (páginas del TOC de dermoscopedia.org, 5-sep) ──
const DSA = book(2929); // Dermoscopy: Illustrated Self-Assessment 2e (autoevaluación con imágenes)
const DS = 'https://dermoscopedia.org';
const DSP = {
  red: `${DS}/Pigment_network`, glob: `${DS}/Globules`, streaks: `${DS}/Streaks`, veil: `${DS}/Blue-white_veil`,
  vasos: `${DS}/Vascular_structures`, neg: `${DS}/Negative_network`, dots: `${DS}/Dots`, struct: `${DS}/Structureless_areas`,
  chaos: `${DS}/Chaos_and_clues`, twoStep: `${DS}/Two-step_algorithm`, three: `${DS}/Three_point_checklist`,
  seven: `${DS}/Seven_Point_Checklist`, menzies: `${DS}/Menzies_Method`, abcd: `${DS}/ABCD_rule`, pattern: `${DS}/Pattern_analysis`,
  bcc: `${DS}/Correlation_of_dermoscopic_structures_of_basal_cell_carcinoma`, sk: `${DS}/Correlation_of_seborrheic_keratosis`,
  df: `${DS}/Correlation_of_dermatofibroma`, scc: `${DS}/Level_5:_SCC`, nail: `${DS}/Nail_dermoscopy`, nailMel: `${DS}/Melanoma_at_nails`,
  trico: `${DS}/Trichoscopy`, aa: `${DS}/Alopecia_areata`, aga: `${DS}/Androgenetic_alopecia`,
  scabies: `${DS}/Scabies`, warts: `${DS}/Correlation_of_warts`, mollusc: `${DS}/Correlation_of_molluscum_contagiosum`,
  pso: `${DS}/Psoriasis`, lp: `${DS}/Lichen_planus`, rosacea: `${DS}/Rosacea14`, dle: `${DS}/Discoid_lupus_erythematosus`,
  mf: `${DS}/Mycosis_fungoides`, bcl: `${DS}/Cutaneous_B-cell_lymphoma`, mel: `${DS}/Melanoma`, melano: `${DS}/Melanocytic_lesions`,
  infl: `${DS}/Inflammatory_skin_diseases_(inflammoscopy_or_ID)`,
} as const;
const ANIM3D = mm(1457); // AccessDerma · Animations / 3D Modules (21 vídeos) — anatomía en capas
const IMG_LIB = `${DN}/image-library`;
const DN_QUIZ = `${DN}/cme/dermoscopy-quizzes`;

// ── Puentes Research (chips en HOY; el inverso vive en researchDailyPlan R6/R22/R33) ──
const PR_L4 = (nota: string): PuenteResearch => ({ linea: 'L4', sr: 'SR-1', nota });
const PR_L5 = (nota: string): PuenteResearch => ({ linea: 'L5', sr: 'SR-2', nota });
const SR1_NOTA = 'Alimenta SR-1 (complicaciones vasculares de fillers): extracción R22-R25 (5-13 nov) y subgrupos tiempo-a-hialuronidasa R33 (7-dic). Estudiar el protocolo ANTES de extraer outcomes.';
const SR2_NOTA = 'Alimenta SR-2 (L5, fototipos IV-VI; PICO se abre en R40 29-dic): eje piel de color del atlas.';

// ── Capa NÍTIDA (Pulso · dermatología médica por suscripción, fusionada con Derma el 27-ago) ──
//    Consulta tipo tele-derma: foto estandarizada · clasificar · rutina ≤3 pasos · revisión 6-8 sem · métrica.
const N_PSO: NitidaProtocolo = {
  protocolo: 'Tele-consulta psoriasis: foto estandarizada (placas índice + uñas + cuero cabelludo, luz natural, misma distancia) → clasificar BSA/PGA (leve <3 % BSA, sin artritis) → rutina ≤3 pasos: emoliente diario + corticoide potente/análogo vit D en placas (ciclos) + queratolítico si escama gruesa → derivar presencial si BSA >10 %, artritis, pustulosa/eritrodérmica o candidato a sistémico/biológico.',
  guion: '"La psoriasis es una enfermedad del sistema inmune de la piel, no es contagiosa ni por falta de higiene. No la curamos hoy: la ponemos bajo control y la mantenemos. Las placas tardan semanas en aplanarse; la mancha residual NO es que siga activa."',
  seguimiento: 'Revisión a 6-8 semanas con la misma foto; métrica PGA + BSA (y prurito 0-10). Preguntar articulaciones en cada visita. Escalar plan si <50 % de mejoría a las 8 sem.',
};
const N_ECZ: NitidaProtocolo = {
  protocolo: 'Tele-consulta eccema/DA: foto de pliegues + zona más activa → clasificar IGA/EASI simplificado y prurito 0-10 → rutina ≤3 pasos: emoliente 2×/día (cantidad FTU) + corticoide por potencia según zona (baja cara/pliegues, media-alta tronco/extremidades, ciclos) + antihistamínico nocturno si insomnio → contacto: retirar sospechoso y test del parche presencial.',
  guion: '"La piel atópica tiene una barrera que pierde agua: el emoliente ES el tratamiento, no un extra. El corticoide bien usado y por ciclos es seguro; lo peligroso es el brote sin tratar. Baños cortos, tibios, sin esponja."',
  seguimiento: 'Revisión a 6 semanas (foto + IGA + prurito). Plan de acción por semáforo: verde emoliente · ámbar corticoide 5-7 días · rojo consulta. Contar los brotes/mes como métrica.',
};
const N_ACNE: NitidaProtocolo = {
  protocolo: 'Tele-consulta acné (plantilla SPEC §3.2): foto frontal + 2 perfiles con luz natural → clasificar IGA (0-4) + fototipo + cicatriz (Glogau) → rutina ≤3 pasos: limpiador suave + retinoide tópico nocturno (empezar noches alternas) + BPO matutino (± antibiótico tópico corto) + fotoprotección obligatoria → moderado-severo: oral limitado en tiempo siempre con BPO; nódulo-quístico/cicatriz: isotretinoína presencial con su programa de seguridad (laboratorio, anticoncepción). Rosácea: evitar desencadenantes + metronidazol/ivermectina tópicos; HS: derivar.',
  guion: '"El acné es una enfermedad de la piel, no falta de higiene — lavarse más lo empeora. Es crónica: vamos a controlarla, no a curarla en una semana. Las primeras 4-8 semanas la piel puede irritarse o verse peor antes de mejorar; eso es esperado y NO es para abandonar." Dibujar el folículo. Aplicar sobre toda la zona, no solo el grano.',
  seguimiento: 'Revisión a 6-8 semanas con foto estandarizada; medir IGA (y CADI si tesis). Anticipar y nombrar los efectos = palanca nº1 de adherencia. Si isotretinoína: laboratorio y control mensual presencial.',
};
const N_AMP: NitidaProtocolo = {
  protocolo: 'TRIAJE, no tratamiento: ampolla flácida/erosiones orales (pénfigo) o ampollas tensas en anciano (penfigoide) → derivación presencial en <72 h para biopsia + IFD. Nítida solo cuida la piel erosionada (fomentos, emoliente, no reventar) y descarta emergencia (SJS/TEN, SSSS).',
  guion: '"Esto necesita una biopsia para saber exactamente qué es antes de tratar; no es urgencia de hoy pero sí de esta semana. Mientras tanto: no reventar, fomentos y evitar el sol."',
  seguimiento: 'Confirmar que la cita presencial ocurrió (48-72 h). Registrar fecha de biopsia y resultado en la ficha. Una vez diagnosticado, el seguimiento es del especialista; Nítida acompaña adherencia a corticoide/inmunosupresor y cribado de efectos.',
};
const N_URT: NitidaProtocolo = {
  protocolo: 'Tele-consulta urticaria: foto del habón con hora (¿dura <24 h? ¿deja marca?) → aguda (<6 sem) vs crónica espontánea → rutina ≤3 pasos: antihistamínico H1 de 2ª generación (subir hasta ×4 según guía — A VERIFICAR dosis en fuente) + evitar AINE/desencadenantes + diario de brotes → angioedema con disnea/lengua = emergencia; habón >24 h con dolor/púrpura = vasculitis urticarial → presencial + biopsia.',
  guion: '"El habón que va y viene en horas y no deja marca es urticaria: molesta pero no peligrosa. No suele ser alergia a un alimento aunque lo parezca; en la mayoría no encontramos causa y el antihistamínico diario la controla."',
  seguimiento: 'Revisión a 4-6 semanas con UAS7 (diario de habones + prurito). Si controlada 3 meses, bajar escalón. Prurito sine materia: analítica básica (hemograma, función renal/hepática/tiroidea) antes de etiquetar.',
};
const N_FARM: NitidaProtocolo = {
  protocolo: 'DERIVACIÓN URGENTE: fiebre + rash extenso + mucosas/ampollas/Nikolsky (SJS/TEN), edema facial + eosinofilia (DRESS) o pústulas estériles agudas (AGEP) → suspender TODOS los fármacos sospechosos (regla de las 8 semanas) + urgencias presencial hoy. Nítida documenta la cronología de fármacos (foto + lista con fechas) para el hospital.',
  guion: '"Esto puede ser una reacción grave a un medicamento y hay que verlo hoy en urgencias. Deje de tomar [fármaco] ahora mismo y lleve esta lista con las fechas: es lo que más ayuda al médico que lo reciba."',
  seguimiento: 'Al alta: alergia documentada en la ficha (fármaco + reacción + fecha) y tarjeta para el paciente; evitar reexposición y fármacos con reactividad cruzada. Revisión de secuelas oculares/mucosas a 4-8 semanas.',
};
const N_CONECT: NitidaProtocolo = {
  protocolo: 'Cribado + derivación: eritema malar fotosensible, placas discoides, heliotropo/Gottron o placas induradas → analítica básica (ANA, hemograma, CK) y derivación presencial en 1-2 semanas. Nítida asume la capa cutánea: fotoprotección estricta (SPF ≥30 amplio espectro — A VERIFICAR cifra en guía), corticoide tópico en placas, foto de seguimiento.',
  guion: '"Algunas enfermedades de la piel son la primera señal de algo que afecta a más órganos; por eso pedimos análisis. El sol empeora estas lesiones: la fotoprotección es parte del tratamiento, no cosmética."',
  seguimiento: 'Confirmar cita de reumatología/dermatología presencial. Foto de placas cada 8 semanas; registrar CLASI simplificado o extensión. Vasculitis con púrpura palpable + fiebre/afectación sistémica = urgencia.',
};
const N_COSM: NitidaProtocolo = {
  protocolo: 'Consulta cosmecéutica basada en evidencia (Nítida producto): clasificar Baumann Skin Type (seco/graso · sensible/resistente · pigmentado/no · arrugado/tenso) → rutina ≤3 pasos AM (limpiador + antioxidante vit C + fotoprotector) / PM (limpiador + retinoide tópico escalonado) → melasma/PIH: añadir despigmentante (hidroquinona ciclos — A VERIFICAR concentración/duración en fuente) y fotoprotector con color (óxido de hierro).',
  guion: '"No vamos a cambiarte la cara; vamos a devolverle lo que el tiempo movió — y eso empieza por proteger. Menos productos, mejor elegidos: una rutina de 3 pasos que se hace gana a una de 7 que se abandona. El retinoide irrita las primeras semanas: eso es normal."',
  seguimiento: 'Foto estandarizada basal y a 12 semanas (misma luz/ángulo). Métrica: tolerancia al retinoide (subir concentración/frecuencia), MASI si melasma. Revisión de fotoprotección en cada visita.',
};

export const DERMA_DIAS: DiaDerma[] = [
  // ── MÓDULO A · Fundamentos / morfología (🔴 el idioma del caso ciego, semanas 1-3 del élite) ──
  { d: 1, fecha: '2026-09-07', bloque: B.A, bKey: 'A', tier: 'CRIT', sub: 'Lesiones elementales 1ª/2ª: el vocabulario del paso ① (describir ANTES de diagnosticar)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: "Fitzpatrick's Color Atlas 9e · approach al diagnóstico", url: book(3309) }, casoIds: [192, 43],
    morfologia: 'Mácula → Tumor', sitio: 'Difuso', ddx: ['Mácula vs pápula', 'Placa vs nódulo', 'Vesícula vs pústula', 'Erosión vs úlcera'],
    atlasUrl: `${DN}/topics/terminology`, dermatoscopiaImg: DSA },
  { d: 2, fecha: '2026-09-09', bloque: B.A, bKey: 'A', tier: 'CRIT', sub: 'Color, distribución y configuración (anular, herpetiforme, lineal/Blaschko) — completa la descripción estándar', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Guidebook to Dermatologic Diagnosis', url: book(2960) }, casoIds: [112, 166],
    morfologia: 'Mácula', sitio: 'Difuso', ddx: ['Anular: tiña vs granuloma anular vs eritema anular centrífugo', 'Herpetiforme: HSV vs dermatitis herpetiforme', 'Lineal/Blaschko: liquen estriado vs nevus epidérmico', 'Dermatomal: zóster'],
    atlasUrl: `${DN}/topics/terminology`, dermatoscopiaImg: DSP.red },
  { d: 3, fecha: '2026-09-11', bloque: B.A, bKey: 'A', tier: 'ALTA', sub: 'Estructura de la piel: epidermis → BMZ → dermis → anejos (la base de toda tarjeta de MECANISMO)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: "Fitzpatrick's Dermatology 9e · Structure & Function", url: book(2570) }, casoIds: [25, 165],
    morfologia: 'Escama', sitio: 'Difuso', ddx: ['Epidermis: espongiosis (eccema) vs acantosis (psoriasis)', 'BMZ: ampolla subepidérmica (penfigoide)', 'Dermis: habón (urticaria) vs nódulo (paniculitis)', 'Anejos: acné vs hidradenitis'],
    atlasUrl: `${DN}/topics/the-structure-of-normal-skin`, histoUrl: 'https://www.dermpathatlas.com/', dermatoscopiaImg: DSA },
  { d: 4, fecha: '2026-09-15', bloque: B.A, bKey: 'A', tier: 'CRIT', sub: 'Fototipos I–VI + piel de color: cómo cambian los signos (eje Perú · conecta con L4/L5 de research)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: "Taylor & Kelly's Skin of Color 3e", url: book(3609) }, casoIds: [21, 194],
    morfologia: 'Mácula', sitio: 'Difuso', fototipo: 'Eje del atlas: I–VI · eritema, descriptores y PIH cambian en fototipos IV–VI',
    ddx: ['Eritema en fototipo V-VI: violáceo/gris, no rojo', 'PIH vs melasma vs liquen plano pigmentoso', 'Hipopigmentación: pitiriasis alba vs vitíligo vs versicolor', 'Queloide vs cicatriz hipertrófica'],
    atlasUrl: `${DN}/topics/skin-phototype`, dermatoscopiaImg: DSP.glob, puenteResearch: PR_L5(SR2_NOTA) },
  { d: 5, fecha: '2026-09-17', bloque: B.A, bKey: 'A', tier: 'CRIT', sub: 'Anatomía facial + DANGER ZONES: a. facial/angular/supratroclear · glabela y nariz = máximo riesgo de oclusión (sin esto nada de estética es seguro)', referente: 'Cotofana',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Dermatologic Surgery · Surgical Anatomy & Cosmetic Subunits', url: `${MH}/content.aspx?bookid=2811&sectionid=245216992` }, casoIds: [36, 84],
    morfologia: 'Anatomía (arterias)', sitio: 'Cara', ddx: ['Glabela: a. supratroclear/supraorbitaria → a. oftálmica (ceguera)', 'Nariz: a. dorsal nasal / angular', 'Surco nasogeniano: a. facial', 'Sien: rama frontal de la a. temporal superficial'],
    atlasUrl: ANIM3D, dermatoscopiaImg: DSA },
  { d: 6, fecha: '2026-09-21', bloque: B.A, bKey: 'A', tier: 'ALTA', sub: 'Dermatoscopia temprana: patrones básicos (3 de los 4 módulos CORE la preguntan transversalmente) · arranca el micro-track DermNet CME', referente: null,
    access: CASO, qbankly: rCORE, promir: null, extra: { t: 'Dermoscopy Criteria Review', url: book(2804) }, casoIds: [49, 14],
    morfologia: 'Mácula', sitio: 'Difuso', ddx: ['Melanocítica vs no melanocítica (paso 1)', 'Retículo vs glóbulos vs homogéneo', 'CBC: vasos arboriformes + nidos ovoides', 'QS: quistes de milium + aperturas comedonianas'],
    atlasUrl: `${DN}/topics/dermoscopy`, dermatoscopiaUrl: DSP.melano, dermatoscopiaModulo: M(1), dermatoscopiaImg: DSP.twoStep },
  // ── MÓDULO B · Dermatosis inflamatorias (el corazón del área Medical: 110/200 casos · materia prima de NÍTIDA) ──
  { d: 7, fecha: '2026-09-23', bloque: B.B, bKey: 'B', tier: 'CRIT', sub: 'Psoriasis + papuloescamosas (liquen plano, pitiriasis rosada/rubra)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S3 Psoriasiform Dermatoses', url: ca(275941727) }, casoIds: [124, 67],
    morfologia: 'Placa', sitio: 'Tronco', ddx: ['Psoriasis vulgar', 'Liquen plano', 'Pitiriasis rosada', 'Tiña corporis', 'Micosis fungoide'],
    atlasUrl: `${DN}/topics/psoriasis`, dermatoscopiaUrl: DSP.infl, dermatoscopiaImg: DSA, nitida: N_PSO },
  { d: 8, fecha: '2026-09-25', bloque: B.B, bKey: 'B', tier: 'CRIT', sub: 'Eccemas: dermatitis atópica, de contacto, seborreica', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S2 Eczema/Dermatitis', url: ca(275941291) }, casoIds: [151, 179],
    morfologia: 'Placa', sitio: 'Pliegues', fototipo: 'DA en piel de color: eritema violáceo/gris, papulosa folicular',
    ddx: ['DA', 'Dermatitis de contacto', 'Seborreica', 'Psoriasis', 'Tiña corporis'],
    atlasUrl: `${DN}/topics/atopic-dermatitis`, dermatoscopiaModulo: M(2), dermatoscopiaImg: DSP.pso, nitida: N_ECZ },
  { d: 9, fecha: '2026-09-29', bloque: B.B, bKey: 'B', tier: 'CRIT', sub: 'Acné + rosácea + hidradenitis (mecanismo → tratamiento; puente futuro a láser-acné y peelings)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S1 Sebaceous/Eccrine/Apocrine', url: ca(275941112) }, casoIds: [82, 47],
    morfologia: 'Pápula/pústula', sitio: 'Cara', ddx: ['Acné vulgar', 'Rosácea', 'Foliculitis', 'Dermatitis perioral'],
    atlasUrl: `${DN}/topics/acne`, dermatoscopiaUrl: DSP.rosacea, dermatoscopiaImg: DSA, nitida: N_ACNE },
  { d: 10, fecha: '2026-10-01', bloque: B.B, bKey: 'B', tier: 'CRIT', sub: 'Ampollosas autoinmunes: pénfigo vs penfigoide + dermatitis herpetiforme (nivel de la ampolla = mecanismo)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S6 Bullous Diseases', url: ca(275942016) }, casoIds: [109, 176],
    morfologia: 'Ampolla', sitio: 'Tronco', ddx: ['Pénfigo vulgar (flácida, Nikolsky +, mucosas)', 'Penfigoide ampolloso (tensa, prurito, anciano)', 'Dermatitis herpetiforme (vesículas agrupadas, codos, celiaquía)', 'Pénfigo foliáceo', 'Epidermólisis bullosa adquirida'],
    atlasUrl: `${DN}/topics/pemphigus-vulgaris`, histoUrl: 'https://www.dermpathatlas.com/', dermatoscopiaModulo: M(3), dermatoscopiaImg: DSP.three, nitida: N_AMP },
  { d: 11, fecha: '2026-10-05', bloque: B.B, bKey: 'B', tier: 'ALTA', sub: 'Urticaria y angioedema + prurito sine materia', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S35 Generalized Pruritus', url: ca(275947685) }, casoIds: [162, 170],
    morfologia: 'Habón', sitio: 'Difuso', ddx: ['Urticaria aguda vs crónica espontánea', 'Angioedema por bradicinina (IECA, hereditario) vs histaminérgico', 'Vasculitis urticarial (>24 h, dolor, púrpura residual)', 'Prurito sine materia: colestasis, IRC, linfoma, tiroides'],
    atlasUrl: `${DN}/topics/urticaria-an-overview`, dermatoscopiaImg: DSA, nitida: N_URT },
  { d: 12, fecha: '2026-10-07', bloque: B.B, bKey: 'B', tier: 'CRIT', sub: 'Farmacodermias graves: SJS/TEN, DRESS, AGEP (no errar)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S23 Adverse Drug Reactions', url: ca(275944593) }, casoIds: [142, 103],
    morfologia: 'Ampolla', sitio: 'Difuso', ddx: ['SJS/TEN', 'DRESS', 'AGEP', 'EM mayor', 'SSSS', 'Pénfigo paraneoplásico'],
    atlasUrl: `${DN}/topics/stevens-johnson-syndrome-toxic-epidermal-necrolysis`, dermatoscopiaModulo: M(4), dermatoscopiaImg: DSP.glob, nitida: N_FARM },
  { d: 13, fecha: '2026-10-09', bloque: B.B, bKey: 'B', tier: 'ALTA', sub: 'Conectivopatías (lupus, dermatomiositis, morfea) + vasculitis y paniculitis', referente: null,
    access: CASO, qbankly: rCORE, promir: null, extra: { t: 'Color Atlas 9e · S14 Autoimmune/Rheumatic', url: ca(275943310) }, casoIds: [155, 57],
    morfologia: 'Placa', sitio: 'Cara', ddx: ['LE cutáneo agudo (malar, respeta surcos) vs rosácea vs dermatomiositis (heliotropo, Gottron)', 'LE discoide vs sarcoidosis vs tiña facial', 'Morfea vs liquen escleroso', 'Vasculitis de pequeño vaso (púrpura palpable) vs paniculitis (eritema nodoso)'],
    atlasUrl: `${DN}/topics/cutaneous-lupus-erythematosus`, dermatoscopiaUrl: DSP.dle, dermatoscopiaImg: DSA, nitida: N_CONECT },
  // ── MÓDULO C · Infecciosas (alto ROI Perú) ──
  { d: 14, fecha: '2026-10-13', bloque: B.C, bKey: 'C', tier: 'CRIT', sub: 'Bacterianas: impétigo, celulitis/erisipela, SSSS, fascitis (cuándo NO es celulitis)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S25 Bacterial Infections', url: ca(275944706) }, casoIds: [55, 30],
    morfologia: 'Placa', sitio: 'Cara', ddx: ['Erisipela', 'Celulitis', 'Impétigo', 'SSSS', 'Dermatitis de contacto aguda'],
    atlasUrl: `${DN}/topics/cellulitis`, dermatoscopiaModulo: M(5), dermatoscopiaImg: DSP.streaks },
  { d: 15, fecha: '2026-10-15', bloque: B.C, bKey: 'C', tier: 'ALTA', sub: 'Sífilis (la gran imitadora) + ITS cutáneas + micobacterias (TB cutánea, lepra)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S30 STDs', url: ca(275946713) }, casoIds: [146, 105],
    morfologia: 'Pápula', sitio: 'Manos', ddx: ['Sífilis 2ª (palmoplantar, collarete) vs pitiriasis rosada vs psoriasis guttata', 'Chancro duro vs herpes vs chancroide', 'Lepra (mácula hipoestésica) vs versicolor vs vitíligo', 'TB cutánea (lupus vulgar) vs leishmaniasis vs esporotricosis'],
    atlasUrl: `${DN}/topics/syphilis`, dermatoscopiaImg: DSA },
  { d: 16, fecha: '2026-10-19', bloque: B.C, bKey: 'C', tier: 'CRIT', sub: 'Virales: HSV/VZV (Tzanck), VPH, molusco', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S27 Viral Diseases', url: ca(275945801) }, casoIds: [76, 168],
    morfologia: 'Vesícula', sitio: 'Cara', ddx: ['HSV (agrupadas sobre eritema) vs zóster (dermatomal, no cruza línea media) vs impétigo ampolloso', 'Verruga vulgar (puntos negros, interrumpe dermatoglifos) vs QS vs callo', 'Molusco (umbilicado) vs criptococosis/histoplasmosis en VIH'],
    atlasUrl: `${DN}/topics/herpes-simplex`, dermatoscopiaUrl: DSP.warts, dermatoscopiaModulo: M(6), dermatoscopiaImg: DSP.mollusc },
  { d: 17, fecha: '2026-10-21', bloque: B.C, bKey: 'C', tier: 'ALTA', sub: 'Micosis superficiales y profundas + KOH (esporotricosis, cromoblastomicosis)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S26 Fungal Infections', url: ca(275945320) }, casoIds: [20, 104],
    morfologia: 'Placa', sitio: 'Pies', ddx: ['Tiña pedis (interdigital/mocasín) vs eccema dishidrótico vs psoriasis palmoplantar', 'Pitiriasis versicolor vs vitíligo vs pitiriasis alba', 'Esporotricosis (linfangítica) vs leishmaniasis vs micobacteria atípica', 'Cromoblastomicosis (células muriformes) vs CEC verrucoso'],
    atlasUrl: `${DN}/topics/fungal-skin-infections`, dermatoscopiaImg: DSA },
  { d: 18, fecha: '2026-10-23', bloque: B.C, bKey: 'C', tier: 'CRIT', sub: 'Parasitosis: escabiosis, leishmaniasis (Perú), pediculosis, larva migrans', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S28 Infestations', url: ca(275946425) }, casoIds: [150, 96],
    morfologia: 'Nódulo', sitio: 'Cara', fototipo: 'Alto ROI Perú · úlcera de leishmaniasis en piel de color',
    ddx: ['Leishmaniasis', 'Esporotricosis', 'TB cutánea', 'Carcinoma basocelular', 'Úlcera piógena'],
    atlasUrl: `${DN}/topics/leishmaniasis`, dermatoscopiaUrl: DSP.scabies, dermatoscopiaModulo: M(7), dermatoscopiaImg: DSP.scabies },
  // ── SWAP v2.1 · SEGURIDAD DE FILLERS adelantada (contenido original de d57-58; fechas intactas) ──
  { d: 19, fecha: '2026-10-27', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'OCLUSIÓN VASCULAR: reconocimiento inmediato + protocolo HDPH de hialuronidasa DE MEMORIA (no errar) — adelantado desde d57 para preceder a la extracción de SR-1 (R22-R25)', referente: 'DeLorenzi',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'HDPH Protocol (ASJ 2017)', url: 'https://pubmed.ncbi.nlm.nih.gov/28333326/' }, casoIds: [148, 180],
    morfologia: 'Livedo / blanqueo', sitio: 'Cara', ddx: ['Oclusión ARTERIAL (blanqueo inmediato → livedo reticular → cianosis → necrosis) vs congestión venosa (edema violáceo tardío)', 'Dolor desproporcionado vs efecto del anestésico (el dolor PUEDE faltar — DeLorenzi)', 'Necrosis inminente vs hematoma vs Tyndall'],
    atlasUrl: `${DN}/topics/fillers`, dermatoscopiaImg: DSA, puenteResearch: PR_L4(SR1_NOTA) },
  { d: 20, fecha: '2026-10-29', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Ceguera por relleno: prevención, manejo inmediato, kit de emergencia (no errar) — adelantado desde d58 · cierre de módulo C (CORE bank)', referente: 'Goodman/Magnusson',
    access: CASO, qbankly: rCORE, promir: null, extra: { t: 'Consenso Embolic Visual Loss (ASJ 2020, OA)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7427155/' }, casoIds: [89, 9],
    morfologia: 'Livedo / blanqueo', sitio: 'Cara', ddx: ['Oclusión de a. central de la retina vs rama (oftálmica ← supratroclear/dorsal nasal)', 'Pérdida visual + ptosis + oftalmoplejía + dolor ocular (síndrome orbitario)', 'Ictus asociado (habla, fuerza, nivel de conciencia — Goodman 2020)'],
    atlasUrl: `${DN}/topics/fillers`, dermatoscopiaModulo: M(8), dermatoscopiaImg: DSP.vasos, puenteResearch: PR_L4(SR1_NOTA) },
  // ── MÓDULO D · Tumores benignos / malignos + dermatoscopia ──
  { d: 21, fecha: '2026-11-02', bloque: B.D, bKey: 'D', tier: 'ALTA', sub: 'Tumores benignos: q. seborreica, nevus melanocíticos, quistes (qué NO biopsiar)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S9 Benign Neoplasms', url: ca(275942363) }, casoIds: [6, 159],
    morfologia: 'Pápula', sitio: 'Tronco', ddx: ['QS ("pegada", milium, comedón-like) vs melanoma vs lentigo solar', 'Nevus intradérmico vs CBC nodular', 'Quiste epidermoide (poro central) vs lipoma vs pilomatricoma', 'Dermatofibroma (signo del hoyuelo) vs melanoma desmoplásico'],
    atlasUrl: `${DN}/topics/seborrhoeic-keratosis`, dermatoscopiaUrl: DSP.sk, dermatoscopiaImg: DSA },
  { d: 22, fecha: '2026-11-04', bloque: B.D, bKey: 'D', tier: 'CRIT', sub: 'Queratosis actínica + campo de cancerización (base del manejo con peelings/PDT después)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S11 Precancerous Lesions', url: ca(275942807) }, casoIds: [173, 12],
    morfologia: 'Escama', sitio: 'Cara', ddx: ['QA (áspera al tacto, patrón en fresa dermatoscópico) vs CEC in situ (Bowen) vs CEC invasor (induración, dolor)', 'QA vs QS irritada vs lupus discoide', 'Campo de cancerización vs dermatitis seborreica'],
    atlasUrl: `${DN}/topics/actinic-keratosis`, dermatoscopiaUrl: DSP.scc, dermatoscopiaModulo: M(9), dermatoscopiaImg: DSP.scc },
  { d: 23, fecha: '2026-11-06', bloque: B.D, bKey: 'D', tier: 'CRIT', sub: 'Carcinoma basocelular + espinocelular: subtipos, riesgo, manejo', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S11 Cutaneous Carcinomas', url: ca(275942807) }, casoIds: [129, 32],
    morfologia: 'Pápula perlada', sitio: 'Cara', ddx: ['CBC', 'CEC', 'Queratoacantoma', 'Nevus intradérmico', 'Hiperplasia sebácea'],
    atlasUrl: `${DN}/topics/basal-cell-carcinoma`, dermatoscopiaUrl: DSP.bcc, dermatoscopiaImg: DSA },
  { d: 24, fecha: '2026-11-10', bloque: B.D, bKey: 'D', tier: 'CRIT', sub: 'Melanoma: ABCDE, Breslow, TNM, manejo (acral/lentiginoso en fototipos altos = Perú)', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Color Atlas 9e · S12 Melanoma', url: ca(275942978) }, casoIds: [39, 121],
    morfologia: 'Mácula', sitio: 'Tronco', fototipo: 'Acral/lentiginoso más frecuente en fototipos altos (Perú)',
    ddx: ['Melanoma', 'Nevus displásico', 'Queratosis seborreica', 'CBC pigmentado', 'Lentigo'],
    atlasUrl: `${DN}/topics/melanoma`, dermatoscopiaUrl: DSP.mel, histoUrl: 'https://www.dermpathatlas.com/', dermatoscopiaModulo: M(10), dermatoscopiaImg: DSP.veil },
  { d: 25, fecha: '2026-11-12', bloque: B.D, bKey: 'D', tier: 'CRIT', sub: 'Dermatoscopia II: lesiones melanocíticas (patrones, 2-step)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · Apéndice B Dermoscopy', url: ca(275944419) }, casoIds: [91, 42],
    morfologia: 'Mácula', sitio: 'Difuso', ddx: ['Patrón reticular', 'Globular', 'Homogéneo', 'Multicomponente (alarma)'],
    atlasUrl: `${DN}/cme/dermoscopy-course`, dermatoscopiaUrl: DSP.melano, dermatoscopiaImg: DSA },
  { d: 26, fecha: '2026-11-16', bloque: B.D, bKey: 'D', tier: 'ALTA', sub: 'Dermatoscopia III: no-melanocíticas + chaos & clues', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Dermoscopy: Illustrated Self-Assessment 2e', url: book(2929) }, casoIds: [35, 189],
    morfologia: 'Pápula', sitio: 'Difuso', ddx: ['CBC (arboriformes, nidos ovoides azul-gris, hojas de arce)', 'QS (milium, aperturas comedonianas, fisuras cerebriformes)', 'Dermatofibroma (parche blanco central + retículo periférico fino)', 'Angioma (lagunas rojas) vs melanoma nodular (vasos polimorfos)'],
    atlasUrl: `${CME}/dermoscopy-of-other-non-melanocytic-lesions`, dermatoscopiaUrl: DSP.chaos, dermatoscopiaModulo: M(11), dermatoscopiaImg: DSP.df },
  { d: 27, fecha: '2026-11-18', bloque: B.D, bKey: 'D', tier: 'ALTA', sub: 'Linfomas cutáneos (MF/Sézary), Merkel, Kaposi, DFSP', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Color Atlas 9e · S21 Lymphomas & Sarcoma', url: ca(275944447) }, casoIds: [164, 108],
    morfologia: 'Placa', sitio: 'Tronco', ddx: ['MF en parches (zonas no fotoexpuestas, "bañador") vs eccema vs psoriasis vs parapsoriasis', 'Merkel (nódulo rojo-violáceo de crecimiento rápido, AEIOU) vs CBC vs quiste', 'Kaposi (máculas/placas violáceas, VIH/HHV-8) vs angioma vs hematoma', 'DFSP (placa indurada en tronco joven) vs queloide vs dermatofibroma'],
    atlasUrl: `${DN}/topics/mycosis-fungoides`, dermatoscopiaUrl: DSP.mf, histoUrl: 'https://www.dermpathatlas.com/', dermatoscopiaImg: DSA },
  { d: 28, fecha: '2026-11-20', bloque: B.D, bKey: 'D', tier: 'ALTA', sub: 'Fotoenvejecimiento + fotoprotección (ciencia básica que el CORE surgical exige → estética)', referente: null,
    access: CASO, qbankly: rCORE, promir: null, extra: { t: 'Color Atlas 9e · S10 Photosensitivity', url: ca(275942604) }, casoIds: [90, 158],
    morfologia: 'Mácula', sitio: 'Cara', ddx: ['Fotoenvejecimiento (elastosis, lentigos, arrugas finas) vs cronoenvejecimiento (laxitud, pérdida de volumen)', 'Lentigo solar vs lentigo maligno (Hutchinson)', 'Poiquilodermia de Civatte vs melasma', 'Fotodermatosis: erupción polimorfa lumínica vs lupus vs fototoxicidad medicamentosa'],
    atlasUrl: `${DN}/topics/ageing-skin`, dermatoscopiaModulo: M(12), dermatoscopiaImg: DSP.pattern },
  // ── MÓDULO E · Dermatopatología básica (semana Barnhill: 30/200 casos son dermpath) ──
  { d: 29, fecha: '2026-11-24', bloque: B.E, bKey: 'E', tier: 'ALTA', sub: 'Cómo leer una biopsia: los patrones de inflamación (el mapa antes del territorio)', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: "Barnhill's Dermatopathology 4e", url: book(2802) }, casoIds: [65, 58],
    morfologia: 'Patrón (histo)', sitio: 'Difuso', ddx: ['Espongiótico (eccema) vs psoriasiforme (psoriasis) vs liquenoide/interfase (LP, LE, EM)', 'Vesículo-ampolloso (nivel de la ampolla) vs granulomatoso vs vasculopático', 'Perivascular superficial vs nodular/difuso'],
    atlasUrl: `${DN}/topics/introduction-to-dermatopathology`, histoUrl: 'https://www.dermpathatlas.com/', dermatoscopiaImg: DSA },
  { d: 30, fecha: '2026-11-26', bloque: B.E, bKey: 'E', tier: 'ALTA', sub: 'Vocabulario dermpath: espongiosis, acantosis, interfase, granulomas (el idioma de la discusión del caso)', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: "Barnhill's Dermatopathology 4e", url: book(2802) }, casoIds: [59, 134],
    morfologia: 'Patrón (histo)', sitio: 'Difuso', ddx: ['Espongiosis vs acantosis vs paraqueratosis vs hipergranulosis', 'Interfase vacuolar (EM, LE) vs liquenoide en banda (LP)', 'Granuloma sarcoideo ("desnudo") vs tuberculoide (caseoso) vs necrobiótico vs cuerpo extraño'],
    atlasUrl: `${DN}/topics/dermatopathology`, histoUrl: 'https://www.dermpathatlas.com/', dermatoscopiaModulo: M(13), dermatoscopiaImg: DSP.abcd },
  { d: 31, fecha: '2026-11-30', bloque: B.E, bKey: 'E', tier: 'ALTA', sub: 'Ampollosas al microscopio: nivel de la ampolla + IF directa/indirecta', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: "Barnhill's Dermatopathology 4e", url: book(2802) }, casoIds: [71, 143],
    morfologia: 'Ampolla', sitio: 'Difuso', ddx: ['Intraepidérmica (acantólisis suprabasal: pénfigo vulgar; subcórnea: foliáceo/SSSS) vs subepidérmica (penfigoide, DH, EBA, porfiria)', 'IFD: IgG intercelular "en panal" (pénfigo) vs IgG/C3 lineal en BMZ (penfigoide) vs IgA granular en papilas (DH)', 'Salt-split: techo (penfigoide) vs suelo (EBA)'],
    atlasUrl: `${DN}/topics/bullous-pemphigoid`, histoUrl: 'https://www.dermpathatlas.com/', dermatoscopiaImg: DSA },
  { d: 32, fecha: '2026-12-02', bloque: B.E, bKey: 'E', tier: 'ALTA', sub: 'Histología de tumores: correlación clínica ↔ dermatoscopia ↔ histo del módulo D', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: "Barnhill's Dermatopathology 4e", url: book(2802) }, casoIds: [107, 74],
    morfologia: 'Tumor', sitio: 'Difuso', ddx: ['Nidos basaloides en empalizada + retracción (CBC) vs perlas córneas/atipia (CEC) vs atipia basal con paraqueratosis (QA)', 'Melanoma (asimetría, nidos irregulares, diseminación pagetoide, sin maduración) vs nevus (maduración en profundidad)', 'QS (pseudoquistes córneos, acantosis) vs verruga (koilocitos, papilomatosis)'],
    atlasUrl: `${DN}/topics/basal-cell-carcinoma`, dermatoscopiaUrl: DSP.bcc, histoUrl: 'https://www.dermpathatlas.com/', dermatoscopiaModulo: M(14), dermatoscopiaImg: DSP.menzies },
  { d: 33, fecha: '2026-12-04', bloque: B.E, bKey: 'E', tier: 'MED', sub: 'Depósitos, infiltrados y paniculitis + drill dermpath de cierre', referente: null,
    access: CASO, qbankly: rCORE, promir: null, extra: { t: "Barnhill's Dermatopathology 4e", url: book(2802) }, casoIds: [27, 187],
    morfologia: 'Nódulo', sitio: 'Difuso', ddx: ['Paniculitis septal (eritema nodoso) vs lobulillar (eritema indurado/vasculitis nodular, pancreática)', 'Depósitos: amiloide (rojo Congo) vs mucina (azul alcián) vs calcio (von Kossa) vs urato', 'Infiltrados: mastocitosis (Giemsa) vs leucemia cutis vs linfoma'],
    atlasUrl: `${DN}/topics/dermatopathology`, histoUrl: 'https://www.dermpathatlas.com/', dermatoscopiaImg: DSA },
  // ── MÓDULO F · Pediátrica (30/200 casos) ──
  { d: 34, fecha: '2026-12-08', bloque: B.F, bKey: 'F', tier: 'ALTA', sub: 'Dermatosis neonatales + hemangiomas infantiles y malformaciones vasculares', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: "Weinberg's Pediatric Dermatology 5e", url: book(1913) }, casoIds: [68, 23],
    morfologia: 'Nódulo', sitio: 'Cara', ddx: ['Hemangioma infantil (aparece a las semanas, prolifera, GLUT-1 +) vs malformación capilar (presente al nacer, crece con el niño)', 'Malformación venosa (compresible, flebolitos) vs linfática (vesículas "huevas de rana")', 'Eritema tóxico neonatal vs melanosis pustulosa transitoria vs acné neonatal', 'Miliaria vs candidiasis del pañal (satélites)'],
    atlasUrl: `${DN}/topics/infantile-haemangioma`, dermatoscopiaModulo: M(15), dermatoscopiaImg: DSP.dots },
  { d: 35, fecha: '2026-12-10', bloque: B.F, bKey: 'F', tier: 'ALTA', sub: 'Exantemas pediátricos + Kawasaki (el que no puedes fallar)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: "Weinberg's Pediatric Dermatology 5e", url: book(1913) }, casoIds: [184, 97],
    morfologia: 'Mácula', sitio: 'Difuso', ddx: ['Kawasaki (fiebre ≥5 d + conjuntivitis + labios/lengua + manos-pies + adenopatía + exantema) vs escarlatina vs sarampión', 'Exantema súbito (fiebre → rash) vs rubéola vs eritema infeccioso (mejillas abofeteadas)', 'Mano-pie-boca vs varicela vs impétigo', 'Shock tóxico vs SSSS'],
    atlasUrl: `${DN}/topics/kawasaki-disease`, dermatoscopiaImg: DSA },
  { d: 36, fecha: '2026-12-14', bloque: B.F, bKey: 'F', tier: 'CRIT', sub: 'Facomatosis: NF1, esclerosis tuberosa, Sturge-Weber (criterios en la piel)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S16 Genetic Diseases', url: ca(275943937) }, casoIds: [126, 188],
    morfologia: 'Mácula', sitio: 'Tronco', ddx: ['NF1 (≥6 café con leche, efélides axilares/inguinales, neurofibromas, nódulos de Lisch) vs síndrome de Legius vs McCune-Albright (borde irregular)', 'Esclerosis tuberosa (máculas hipomelanóticas "hoja de fresno", angiofibromas, placa de chagrín, fibromas ungueales)', 'Sturge-Weber (malformación capilar V1 + leptomeninges/glaucoma) vs hemangioma segmentario facial (PHACE)'],
    atlasUrl: `${DN}/topics/neurofibromatosis`, dermatoscopiaModulo: M(16), dermatoscopiaImg: DSP.seven },
  { d: 37, fecha: '2026-12-16', bloque: B.F, bKey: 'F', tier: 'ALTA', sub: 'Genodermatosis: ictiosis + epidermólisis bullosas (queratinas y colágenos = mecanismo)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S4 Ichthyoses', url: ca(275941889) }, casoIds: [169, 64],
    morfologia: 'Escama', sitio: 'Difuso', ddx: ['Ictiosis vulgar (filagrina, respeta pliegues) vs ligada al X (esteroide-sulfatasa, escama oscura) vs lamelar (bebé colodión)', 'EB simple (queratinas 5/14, intraepidérmica) vs juntural (laminina-332) vs distrófica (colágeno VII, cicatriz/pseudosindactilia)', 'Síndrome de Netherton vs DA grave'],
    atlasUrl: `${DN}/topics/ichthyosis`, dermatoscopiaImg: DSA },
  { d: 38, fecha: '2026-12-18', bloque: B.F, bKey: 'F', tier: 'MED', sub: 'Atopia pediátrica + acné neonatal/infantil + repaso del módulo', referente: null,
    access: CASO, qbankly: rCORE, promir: null, extra: { t: "Weinberg's Pediatric Dermatology 5e", url: book(1913) }, casoIds: [62, 17],
    morfologia: 'Pápula', sitio: 'Cara', ddx: ['Acné neonatal (pustulosis cefálica, Malassezia, <6 sem) vs acné infantil (3-12 m, comedones, cicatriz) vs hiperandrogenismo', 'DA del lactante (mejillas, respeta triángulo nasolabial) vs dermatitis seborreica (costra láctea) vs psoriasis del pañal', 'Escabiosis del lactante (palmas, plantas, axilas)'],
    atlasUrl: `${DN}/topics/infantile-acne`, dermatoscopiaModulo: M(17), dermatoscopiaImg: DSP.trico },
  // ── MÓDULO G · Quirúrgica / anatomía facial (30/200 casos; el CORE surgical INCLUYE la cosmética) ──
  { d: 39, fecha: '2026-12-22', bloque: B.G, bKey: 'G', tier: 'CRIT', sub: 'Anatomía quirúrgica facial II: RSTL, subunidades estéticas, nervios en riesgo (temporal, marginal)', referente: 'Cotofana',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Dermatologic Surgery · Surgical Anatomy & Cosmetic Subunits', url: `${MH}/content.aspx?bookid=2811&sectionid=245216992` }, casoIds: [72, 11],
    morfologia: 'Anatomía (nervios)', sitio: 'Cara', ddx: ['Rama temporal del facial (zona de Pitanguy, sobre el arco cigomático) → ptosis de ceja', 'Rama marginal mandibular (bajo el borde mandibular, cruza la a. facial) → asimetría de sonrisa', 'N. espinal accesorio (triángulo posterior, punto de Erb) → hombro caído', 'N. auricular mayor → hipoestesia del lóbulo'],
    atlasUrl: ANIM3D, dermatoscopiaImg: DSA },
  { d: 40, fecha: '2026-12-24', bloque: B.G, bKey: 'G', tier: 'ALTA', sub: 'Biopsias (punch/shave/excisional) + anestesia local: lidocaína y dosis máximas', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Dermatologic Surgery · Local Anesthesia & Nerve Blocks', url: `${MH}/content.aspx?bookid=2811&sectionid=245217992` }, casoIds: [40, 3],
    morfologia: 'Biopsia', sitio: 'Difuso', ddx: ['Punch (inflamatorias, dermis profunda/paniculitis) vs shave (exofíticas: CBC, QS) vs excisional (melanoma: NUNCA shave parcial)', 'Lidocaína con vs sin epinefrina: dosis máxima mg/kg (A VERIFICAR en Dermatologic Surgery sectionid 245217992)', 'Toxicidad de anestésico local (SNC → cardiovascular) vs reacción vasovagal vs alergia (raras, ésteres)'],
    atlasUrl: `${DN}/topics/skin-biopsy`, dermatoscopiaModulo: M(18), dermatoscopiaImg: DSP.neg },
  { d: 41, fecha: '2026-12-28', bloque: B.G, bKey: 'G', tier: 'ALTA', sub: 'Suturas y cierre: instrumental, nudos, técnicas (Kantor + sus 91 vídeos)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Atlas of Suturing Techniques 2e (Kantor)', url: book(3138) }, casoIds: [147, 154],
    morfologia: 'Sutura', sitio: 'Difuso', ddx: ['Absorbible (poliglactina, PDS: subcutáneo/enterrado) vs no absorbible (nylon, polipropileno: piel)', 'Simple vs colchonero vertical (eversión) vs horizontal (hemostasia) vs intradérmica continua (estética)', 'Nudo cuadrado vs de cirujano; tensión mínima en cara'],
    atlasUrl: `${DN}/topics/suturing-techniques`, dermatoscopiaImg: DSA },
  { d: 42, fecha: '2026-12-30', bloque: B.G, bKey: 'G', tier: 'MED', sub: 'Colgajos e injertos: avance, rotación, romboidal, bilobulado', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Facial Flap Surgery', url: book(2829) }, casoIds: [195, 88],
    morfologia: 'Colgajo', sitio: 'Cara', ddx: ['Avance (frente, RSTL) vs rotación (mejilla) vs transposición (romboidal de Limberg, bilobulado nasal)', 'Colgajo (aporte vascular propio) vs injerto de espesor total (cara) vs parcial (grandes defectos)', 'Cierre por segunda intención (superficies cóncavas: canto interno, concha, sien)'],
    atlasUrl: `${DN}/topics/skin-flaps`, dermatoscopiaModulo: DSC_QUIZ, dermatoscopiaImg: DSP.struct },
  { d: 43, fecha: '2027-01-05', bloque: B.G, bKey: 'G', tier: 'ALTA', sub: 'Mohs + control de márgenes: indicaciones (área H) y lógica', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Margin Control Surgery of the Skin', url: book(3319) }, casoIds: [63, 86],
    morfologia: 'Tumor', sitio: 'Cara', ddx: ['Mohs indicado: área H (máscara facial), recurrente, subtipo agresivo (morfeiforme/infiltrativo/micronodular), bordes mal definidos, inmunodeprimido', 'Mohs vs excisión estándar con margen clínico (mm según riesgo — A VERIFICAR en Margin Control Surgery)', 'Mohs vs radioterapia (no candidato quirúrgico) vs hedgehog (localmente avanzado)'],
    atlasUrl: `${DN}/topics/mohs-micrographic-surgery`, dermatoscopiaImg: DSA },
  { d: 44, fecha: '2027-01-07', bloque: B.G, bKey: 'G', tier: 'CRIT', sub: 'Cicatrización + complicaciones quirúrgicas y su manejo (ciencia CORE surgical)', referente: null,
    access: CASO, qbankly: rCORE, promir: null, extra: { t: 'Dermatologic Surgery · Managing Surgical Complications', url: `${MH}/content.aspx?bookid=2811&sectionid=245222451` }, casoIds: [175, 122],
    morfologia: 'Costra', sitio: 'Difuso', ddx: ['Fases: hemostasia → inflamación → proliferación (granulación/epitelización) → remodelación (colágeno III → I)', 'Hematoma (24-48 h, tenso, doloroso: drenar) vs infección (día 4-7: eritema, calor, exudado) vs dehiscencia (tensión, día 7-10)', 'Queloide (sobrepasa los bordes) vs cicatriz hipertrófica (confinada) — fototipos altos', 'Necrosis de colgajo (tensión, tabaco, hematoma bajo el colgajo)'],
    atlasUrl: `${DN}/topics/keloid-and-hypertrophic-scar`, dermatoscopiaModulo: DSC_COMP, dermatoscopiaImg: DSP.vasos },
  // ── MÓDULO H · Checkpoint CORE (mapa de debilidades antes de la fase estética — lee el ledger) ──
  { d: 45, fecha: '2027-01-11', bloque: B.H, bKey: 'H', tier: 'ALTA', sub: 'Checkpoint 1: mapa de fallos por módulo CORE (med/ped/surg/path) desde el ledger → qué re-drillear en FSRS', referente: null,
    access: CASO_DD, qbankly: rQOTW, promir: null, extra: { t: 'ABD CORE Study Guide (PDF oficial)', url: ABD_GUIDE }, casoIds: [73, 54],
    morfologia: 'Mapa de fallos', sitio: 'Difuso', ddx: ['% fallo por área del ledger: Med (110) · Path (30) · Peds (30) · Surg (30)', 'Tipo de error dominante: CCSN vs CONCEPTO vs MORFOLOGIA vs DDX', 'Descripción 8 ejes: media ≥6/8 = gate del módulo A superado'],
    atlasUrl: IMG_LIB, dermatoscopiaImg: DSA },
  { d: 46, fecha: '2027-01-13', bloque: B.H, bKey: 'H', tier: 'ALTA', sub: 'Checkpoint 2: re-drill de fallos etiquetados + pares del DD Challenge de tus áreas flojas + drill oclusión vascular 90 s', referente: null,
    access: CASO_DD, qbankly: rCORE, promir: null, extra: { t: 'Guidebook to Dermatologic Diagnosis (repaso)', url: book(2960) }, casoIds: [41, 198],
    morfologia: 'Mapa de fallos', sitio: 'Difuso', ddx: ['Pares del DD Challenge de las 2 áreas con mayor % fallo', 'Re-drill FSRS de los casos fallados (ledger jmd-derma-fallos)', 'Drill HDPH cronometrado: recitar signos → dosis → intervalos → ceguera → oftalmología'],
    atlasUrl: DN_QUIZ, dermatoscopiaImg: DSP.chaos },
  // ── MÓDULO X · ESTÉTICA (la meta: 22 átomos = d19-20 + d47-56 + d59-68 · seguridad ANTES que técnica) ──
  { d: 47, fecha: '2027-01-15', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Anatomía facial 3D: 5 capas, SMAS, compartimentos grasos, ligamentos de retención', referente: 'Cotofana',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Baumann 3e · Facial Anatomy and Aging', url: `${MH}/content.aspx?bookid=3200&sectionid=266614877` }, casoIds: [114, 110],
    morfologia: 'Capas (5)', sitio: 'Cara', ddx: ['Piel → grasa subcutánea (compartimentos superficiales) → SMAS/músculo → grasa profunda/espacios → periostio (Cotofana)', 'Ligamentos de retención: orbicular, cigomático, mandibular, masetérico-cutáneo', 'Plano supraperióstico profundo (relativamente seguro) vs subcutáneo superficial (arterias nominadas)'],
    atlasUrl: ANIM3D, dermatoscopiaImg: DSA },
  { d: 48, fecha: '2027-01-19', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Arterias peligrosas + zonas seguras: glabela, nariz, temple, surco nasogeniano (no errar)', referente: 'Cotofana',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Vascular Safe Zones (PAN 2022)', url: 'https://pubmed.ncbi.nlm.nih.gov/36469395/' }, casoIds: [128, 144],
    morfologia: 'Anatomía (arterias)', sitio: 'Cara', ddx: ['Riesgo de ceguera grado 4 (Goodman 2020): glabela, nariz, frente — nariz 56,3 % de los casos, glabela 27,1 %, frente 18,8 %', 'Grado 3: sien, surco nasogeniano, surco lagrimal, periorbital, mejilla medial', 'Zonas seguras por región + plano (Cotofana PAN 2022 / Freytag JDD 2019)'],
    atlasUrl: `${DN}/topics/fillers`, dermatoscopiaImg: DSP.vasos, puenteResearch: PR_L4('Mapa anatómico del riesgo = variable "zona" de los subgrupos de SR-1 (R33).') },
  { d: 49, fecha: '2027-01-21', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Envejecimiento estructural (hueso → grasa → ligamento → piel) + análisis facial: tercios, MD ASA', referente: 'de Maio',
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Baumann 3e · Intrinsic Aging', url: `${MH}/content.aspx?bookid=3200&sectionid=266614593` }, casoIds: [138, 28],
    morfologia: 'Surco / pliegue', sitio: 'Cara', ddx: ['MD ASA H1 (de Maio 2021): cansado/triste/enfadado/caído vs joven/atractivo/contorneado/fem-masc → 3 atributos prioritarios', 'Hueso (reabsorción orbitaria/maxilar/mandibular) vs grasa (deflación por compartimentos) vs ligamento (laxitud) vs piel (elastosis)', 'H2 tercios · H3 dinámica periorbital/perioral · H4 unidades · H5 subunidades'],
    atlasUrl: `${DN}/topics/facial-rejuvenation`, dermatoscopiaImg: DSA },
  { d: 50, fecha: '2027-01-25', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Toxina I: mecanismo (clivaje de SNAP-25), serotipos, unidades NO intercambiables entre marcas', referente: 'Carruthers',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Baumann 3e · Botulinum Toxins', url: `${MH}/content.aspx?bookid=3200&sectionid=266616475` }, casoIds: [16, 177],
    morfologia: 'Arruga dinámica', sitio: 'Cara', ddx: ['Serotipo A (onabotulinum, abobotulinum, incobotulinum, prabotulinum, daxibotulinum): unidades NO intercambiables — tablas de conversión por producto (A VERIFICAR en Carruthers 5e)', 'Arruga dinámica (toxina) vs estática (relleno/láser/peeling)', 'Mecanismo: clivaje de SNAP-25 → bloqueo de la exocitosis de ACh → denervación química reversible'],
    atlasUrl: `${DN}/topics/botulinum-toxin`, dermatoscopiaImg: DSP.red },
  { d: 51, fecha: '2027-01-27', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Toxina II: tercio superior (frontal, glabela, patas de gallo) — músculos, dosis, cómo evitar la ptosis', referente: 'Carruthers',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Dermatologic Surgery · Neuromodulators', url: `${MH}/content.aspx?bookid=2811&sectionid=245227386` }, casoIds: [171, 123],
    morfologia: 'Arruga dinámica', sitio: 'Cara', ddx: ['Glabela: corrugador + prócer (± depresor superciliar) — vector medial/inferior', 'Frontal: ÚNICO elevador de la ceja → sobredosis o puntos bajos = ptosis de ceja', 'Patas de gallo: orbicular lateral (puntos ≥1 cm del reborde orbitario — A VERIFICAR)', 'Ptosis palpebral (difusión al elevador del párpado) vs ptosis de ceja (frontal debilitado)'],
    atlasUrl: `${DN}/topics/botulinum-toxin`, dermatoscopiaImg: DSA },
  { d: 52, fecha: '2027-01-29', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Toxina III: tercio inferior, Nefertiti, masetero, hiperhidrosis', referente: 'Carruthers',
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Cosmetic Procedures in Primary Care · Botulinum Toxin', url: `${MH}/content.aspx?bookid=2953&sectionid=248412579` }, casoIds: [127, 44],
    morfologia: 'Arruga dinámica', sitio: 'Cara', ddx: ['Nefertiti: bandas platismales → libera el vector elevador (interacción de fuerzas)', 'Masetero: bruxismo/contorno mandibular (riesgo: debilidad masticatoria, sonrisa asimétrica por risorio)', 'DAO (comisura caída), mentalis (mentón empedrado), sonrisa gingival (elevador del labio superior y ala nasal)', 'Hiperhidrosis axilar: test de Minor (yodo-almidón) para mapear'],
    atlasUrl: `${DN}/topics/hyperhidrosis`, dermatoscopiaImg: DSP.glob },
  { d: 53, fecha: '2027-02-02', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Toxina IV: complicaciones y manejo — ptosis (apraclonidina), asimetrías, difusión (seguridad primero)', referente: 'Carruthers',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Complicaciones de toxina (Cureus 2026, OA)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12865869/' }, casoIds: [48, 178],
    morfologia: 'Ptosis', sitio: 'Cara', ddx: ['Ptosis palpebral (apraclonidina colirio — concentración/pauta A VERIFICAR en Cureus 2026) vs ptosis de ceja (esperar; no hay antídoto)', 'Asimetría (retoque a las 2 semanas) vs "Spock brow" (frontal lateral no tratado)', 'Difusión al cigomático (sonrisa asimétrica) / disfagia y debilidad cervical (platisma)', 'Fallo secundario: anticuerpos neutralizantes vs dosis insuficiente'],
    atlasUrl: `${DN}/topics/botulinum-toxin`, dermatoscopiaImg: DSA },
  { d: 54, fecha: '2027-02-04', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: "Rellenos I: reología del HA (G', cohesividad) + bioestimuladores (CaHA/PLLA)", referente: 'de Maio',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Cosmeceuticals · Hyaluronic Acid', url: `${MH}/content.aspx?bookid=2812&sectionid=244978644` }, casoIds: [200, 18],
    morfologia: 'Volumen', sitio: 'Cara', ddx: ["G' alto (proyección/soporte: mentón, mandíbula, pómulo) vs G' bajo (labio, surco lagrimal, líneas finas)", 'Cohesividad y tamaño de partícula → integración vs migración', 'HA (reversible con hialuronidasa) vs CaHA/PLLA (bioestimuladores NO reversibles: no en zonas de riesgo vascular alto)'],
    atlasUrl: `${DN}/topics/fillers`, dermatoscopiaImg: DSP.streaks },
  { d: 55, fecha: '2027-02-08', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Rellenos II: planos de inyección, aguja vs cánula, técnicas por región', referente: 'de Maio',
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Dermatologic Surgery · Fillers and Injectable Implants', url: `${MH}/content.aspx?bookid=2811&sectionid=245227491` }, casoIds: [81, 106],
    morfologia: 'Volumen', sitio: 'Cara', ddx: ['Aguja (bolo supraperióstico, precisión) vs cánula (subcutáneo, considerada más segura en ciertas zonas — Goodman 2020)', 'Plano por región: pómulo supraperióstico · labio submucoso · sien interfascial/supraperióstico · surco lagrimal profundo', 'Microbolos <0,1 mL, muy lento, baja presión de extrusión, aguja en movimiento; la aspiración NO tiene evidencia (Goodman 2020)'],
    atlasUrl: `${DN}/topics/fillers`, dermatoscopiaImg: DSA, puenteResearch: PR_L4('Técnica (aguja/cánula, plano, volumen) = variables de la plantilla de extracción de SR-1 (R22).') },
  { d: 56, fecha: '2027-02-10', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Rellenos III: MD Codes fundación (Ck, T, Tt) + myomodulation', referente: 'de Maio',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'MD Codes paper (open access PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8012343/' }, casoIds: [182, 167],
    morfologia: 'Volumen', sitio: 'Cara', ddx: ['MD Codes (de Maio 2021): Ck1-Ck5 mejilla · T1-T2 sien · Tt1-Tt3 surco lagrimal — checklist anatómico, no secuencia', 'Fundación (mediofacial) antes de refinamiento (labio, surcos)', 'Myomodulation (de Maio 2018 / update 2020 PMC7447619): el relleno modula la acción muscular'],
    atlasUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8012343/', dermatoscopiaImg: DSP.abcd },
  // ── SWAP v2.1 · contenido original de d19-20 (Infecciosas) trasladado aquí; fechas intactas ──
  { d: 57, fecha: '2027-02-12', bloque: B.C, bKey: 'C', tier: 'MED', sub: 'El paciente agudo con fiebre y rash: meningococemia, endocarditis, necrotizantes (trasladado desde d19 por el swap de seguridad de fillers)', referente: null,
    access: CASO, qbankly: rQOTW, promir: null, extra: { t: 'Color Atlas 9e · S8 The Acutely Ill Patient', url: ca(275942269) }, casoIds: [130, 92],
    morfologia: 'Púrpura', sitio: 'Difuso', ddx: ['Meningococemia (púrpura retiforme + fiebre + shock) vs vasculitis vs CID', 'Endocarditis: lesiones de Janeway, nódulos de Osler, hemorragias en astilla', 'Fascitis necrotizante (dolor desproporcionado, crepitación, bullas hemorrágicas) vs celulitis', 'SSSS vs TEN vs shock tóxico'],
    atlasUrl: `${DN}/topics/meningococcal-disease`, dermatoscopiaImg: DSA },
  { d: 58, fecha: '2027-02-16', bloque: B.C, bKey: 'C', tier: 'MED', sub: 'Pelo y uñas infecciosos (tiña capitis, onicomicosis) + repaso del módulo (trasladado desde d20)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S31 Hair Disorders', url: ca(275947046) }, casoIds: [61, 183],
    morfologia: 'Escama', sitio: 'Cuero cabelludo', ddx: ['Tiña capitis (querion, puntos negros, adenopatía) vs alopecia areata (pelos en signo de exclamación) vs tricotilomanía', 'Onicomicosis (subungueal distal, KOH/cultivo) vs psoriasis ungueal (pits, mancha de aceite) vs liquen plano (pterigion)', 'Melanoniquia longitudinal vs hematoma subungueal vs melanoma (Hutchinson)'],
    atlasUrl: `${DN}/topics/tinea-capitis`, dermatoscopiaUrl: DSP.nail, dermatoscopiaImg: DSP.nailMel },
  { d: 59, fecha: '2027-02-18', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Rellenos IV: consideraciones étnicas y de género + fat transfer', referente: 'de Maio',
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Dermatologic Surgery · Ethnic & Gender Considerations (Fillers)', url: `${MH}/content.aspx?bookid=2811&sectionid=245227608` }, casoIds: [31, 7],
    morfologia: 'Volumen', sitio: 'Cara', fototipo: 'Fototipo IV-VI: riesgo de PIH/queloide en puntos de entrada; preferir cánula y menos punciones',
    ddx: ['Proporciones étnicas (no "occidentalizar": proyección malar, mentón, perfil)', 'Género: ángulo mandibular, ceja, labio — vectores distintos', 'Fat transfer: volumen grande, supervivencia variable, riesgo embólico alto y NO reversible'],
    atlasUrl: `${DN}/topics/ethnic-dermatology`, dermatoscopiaImg: DSA, puenteResearch: PR_L5(SR2_NOTA) },
  { d: 60, fecha: '2027-02-22', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Peelings I: profundidad (superficial/medio/profundo), agentes (glicólico, salicílico, TCA, fenol), frosting', referente: 'Baumann',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Baumann 3e · Chemical Peels', url: `${MH}/content.aspx?bookid=3200&sectionid=266616672` }, casoIds: [51, 174],
    morfologia: 'Escama', sitio: 'Cara', ddx: ['Superficial (glicólico, salicílico, Jessner): epidermis — sin downtime', 'Medio (TCA a concentración media — A VERIFICAR % en Baumann 3e): dermis papilar; frosting nivel II', 'Profundo (fenol / Baker-Gordon): dermis reticular; cardiotoxicidad → monitorización'],
    atlasUrl: `${DN}/topics/chemical-peels`, dermatoscopiaImg: DSP.struct },
  { d: 61, fecha: '2027-02-24', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Peelings II: por fototipo (IV–VI), prevención de PIH, complicaciones (conecta con L4/L5 research)', referente: 'Baumann',
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Cosmetic Derm for Skin of Color · Ablative/Deep Peels', url: `${MH}/content.aspx?bookid=2956&sectionid=248485136` }, casoIds: [135, 8],
    morfologia: 'Mácula', sitio: 'Cara', fototipo: 'Fototipo IV-VI: solo superficiales/medios con pre-tratamiento; evitar profundos',
    ddx: ['PIH (epidérmica vs dérmica: luz de Wood) vs melasma vs hipopigmentación post-peel', 'Pre-tratamiento con retinoide/despigmentante y fotoprotección estricta (protocolo A VERIFICAR en 2956/248485136)', 'Herpes reactivado (profilaxis antiviral) vs infección bacteriana vs cicatriz'],
    atlasUrl: `${DN}/topics/postinflammatory-hyperpigmentation`, dermatoscopiaImg: DSA, puenteResearch: PR_L5(SR2_NOTA) },
  { d: 62, fecha: '2027-02-26', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Láser I: fototermólisis selectiva (Anderson-Parrish) — cromóforo → λ → duración de pulso → enfriamiento (la MISMA física del CORE surgical)', referente: 'Anderson',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Lasers in Dermatology · Fundamentals', url: `${MH}/content.aspx?bookid=2818&sectionid=240357100` }, casoIds: [38, 186],
    morfologia: 'Cromóforo', sitio: 'Difuso', ddx: ['Cromóforos: melanina (absorción decrece con λ) vs hemoglobina (picos en visible) vs agua (IR medio: Er:YAG, CO2) vs tinta', 'Duración de pulso < tiempo de relajación térmica del objetivo (Anderson-Parrish 1983): dañar el blanco sin cocer alrededor', 'Enfriamiento epidérmico (contacto, criógeno, aire) protege la melanina epidérmica → clave en fototipos altos'],
    atlasUrl: `${DN}/topics/lasers-in-dermatology`, dermatoscopiaImg: DSP.twoStep },
  { d: 63, fecha: '2027-03-02', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Láser II: lesiones vasculares (PDL) + pigmento y tatuajes (Q-switched/pico)', referente: 'Anderson',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Lasers in Dermatology · Cutaneous Vascular Lesions', url: `${MH}/content.aspx?bookid=2818&sectionid=240357136` }, casoIds: [133, 29],
    morfologia: 'Mácula', sitio: 'Cara', ddx: ['PDL (amarillo, absorción Hb): malformación capilar, telangiectasias, hemangioma, rosácea eritematosa — púrpura esperable', 'Q-switched / picosegundo (Nd:YAG 1064/532, alexandrita, rubí): tatuaje según color de tinta, lentigos, nevus de Ota — λ exactas A VERIFICAR en 2818/240357136', 'Púrpura post-PDL (esperada) vs quemadura (ampolla, hipopigmentación)'],
    atlasUrl: `${DN}/topics/lasers-in-dermatology`, dermatoscopiaUrl: DSP.vasos, dermatoscopiaImg: DSA },
  { d: 64, fecha: '2027-03-04', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Láser III: resurfacing fraccional (ablativo/no-ablativo) + radiofrecuencia + tightening', referente: 'Manstein/Anderson',
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Lasers in Dermatology · Laser & RF Resurfacing', url: `${MH}/content.aspx?bookid=2818&sectionid=240357478` }, casoIds: [199, 70],
    morfologia: 'Textura / cicatriz', sitio: 'Cara', ddx: ['Ablativo fraccional (CO2, Er:YAG — Manstein 2004): cicatrices, fotoenvejecimiento severo; más downtime y riesgo de PIH', 'No ablativo fraccional (columnas de daño térmico con epidermis intacta): sesiones múltiples, más seguro en fototipos altos', 'RF (mono/bipolar, microagujas) y HIFU: calentamiento dérmico sin cromóforo → tightening independiente del fototipo'],
    atlasUrl: `${DN}/topics/laser-resurfacing`, dermatoscopiaImg: DSP.pattern },
  { d: 65, fecha: '2027-03-08', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Láser IV: seguridad en fototipos IV–VI — parámetros, PIH, depilación en piel étnica (no errar)', referente: 'Anderson',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Dermatologic Surgery · Laser/Light en piel de color', url: `${MH}/content.aspx?bookid=2811&sectionid=245228834` }, casoIds: [113, 95],
    morfologia: 'Mácula', sitio: 'Difuso', fototipo: 'Fototipo V-VI: λ larga (Nd:YAG), pulso largo, fluencia conservadora, enfriamiento y test spot',
    ddx: ['Depilación en fototipo V-VI: Nd:YAG de pulso largo > diodo > alexandrita (mayor riesgo de quemadura por absorción epidérmica)', 'PIH post-láser vs hipopigmentación (daño melanocítico) vs quemadura', 'Test spot + esperar respuesta + parámetros conservadores (cifras A VERIFICAR en 2811/245228834)'],
    atlasUrl: `${DN}/topics/ethnic-dermatology`, dermatoscopiaImg: DSA, puenteResearch: PR_L5(SR2_NOTA) },
  { d: 66, fecha: '2027-03-10', bloque: B.X, bKey: 'X', tier: 'MED', sub: 'Contorno corporal (criolipólisis, HIFU) + escleroterapia básica (ambos en el temario CORE surgical)', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Lasers in Dermatology · Devices for Body Contour', url: `${MH}/content.aspx?bookid=2818&sectionid=240357542` }, casoIds: [139, 197],
    morfologia: 'Volumen', sitio: 'Tronco', ddx: ['Criolipólisis (apoptosis del adipocito por frío) vs HIFU vs RF: hiperplasia adiposa paradójica (criolipólisis)', 'Escleroterapia: telangiectasias/venas reticulares (polidocanol, STS — concentraciones A VERIFICAR); matting, pigmentación, úlcera por extravasación', 'Varices tronculares → dúplex primero'],
    atlasUrl: `${DN}/topics/sclerotherapy`, dermatoscopiaImg: DSP.glob },
  { d: 67, fecha: '2027-03-12', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Microneedling + PRP + skinboosters: evidencia y técnica', referente: 'Baumann',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Baumann 3e · Microneedling and PRP', url: `${MH}/content.aspx?bookid=3200&sectionid=266617053` }, casoIds: [131, 185],
    morfologia: 'Textura / cicatriz', sitio: 'Cara', ddx: ['Microneedling (profundidad por indicación — A VERIFICAR mm en Baumann 3e): cicatriz de acné, estrías; seguro en fototipos altos', 'PRP: evidencia moderada (alopecia androgénica, cicatrices, combinación con microneedling)', 'Skinboosters (HA poco reticulado): hidratación/calidad de piel, no volumen'],
    atlasUrl: `${DN}/topics/skin-needling`, dermatoscopiaImg: DSA },
  { d: 68, fecha: '2027-03-16', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Ciencia cosmecéutica: Baumann Skin Typing, retinoides tópicos, antioxidantes, fotoprotección (protocolo Nítida)', referente: 'Baumann',
    access: CASO, qbankly: rCORE, promir: null, extra: { t: 'Cosmeceuticals and Cosmetic Ingredients (83 caps)', url: book(2812) }, casoIds: [149, 33],
    morfologia: 'Mácula', sitio: 'Cara', ddx: ['Baumann Skin Type (16 tipos: seco/graso × sensible/resistente × pigmentado/no × arrugado/tenso)', 'Retinoides tópicos (retinol → retinaldehído → tretinoína/adapaleno) vs vitamina C (L-ascórbico) vs niacinamida', 'Fotoprotección amplio espectro diaria (SPF mínimo A VERIFICAR en guía) + con color (óxido de hierro) para melasma/PIH'],
    atlasUrl: `${DN}/topics/topical-retinoids`, dermatoscopiaImg: DSP.red, nitida: N_COSM },
  // ── MÓDULO Z · Cierre (integración + repaso de fallos desde el ledger) ──
  { d: 69, fecha: '2027-03-18', bloque: B.Z, bKey: 'Z', tier: 'MED', sub: 'REPASO 1: segunda pasada FSRS — SOLO casos y preguntas fallados del ledger, por módulo CORE más flojo', referente: null,
    access: CASO_FALLOS, qbankly: rPIC, promir: null, extra: { t: 'Guidebook to Dermatologic Diagnosis (repaso)', url: book(2960) }, casoIds: [157, 181],
    morfologia: 'Repaso', sitio: 'Difuso', ddx: ['SOLO fallos del ledger (dermaLedger.casosParaSegundaPasada)', 'Ordenados por módulo CORE con mayor % fallo', 'Re-describir los 8 ejes antes de reabrir la discusión'],
    atlasUrl: IMG_LIB, dermatoscopiaImg: DSA },
  { d: 70, fecha: '2027-03-22', bloque: B.Z, bKey: 'Z', tier: 'MED', sub: 'REPASO 2: mapa final de debilidades + plan del ciclo siguiente (post-Step 1: 5 casos/sesión con los 60 casos restantes)', referente: null,
    access: CASO_DD, qbankly: rQOTW, promir: null, extra: { t: 'ABD CORE Study Guide (PDF oficial)', url: ABD_GUIDE }, casoIds: [69, 66],
    morfologia: 'Repaso', sitio: 'Difuso', ddx: ['Mapa final por módulo CORE y por bloque A-X (exportLedgerJSON → _registro_derma.json)', 'Los 60 casos post-Step 1 (dermaCasosPostStep1) a 5/sesión', 'Drill HDPH 90 s final: recitar sin mirar'],
    atlasUrl: DN_QUIZ, dermatoscopiaImg: DSP.chaos },];

export function dermaDiaDe(fechaISO: string): DiaDerma | undefined { return DERMA_DIAS.find(x => x.fecha === fechaISO); }
export function dermaDiaPrevio(d: DiaDerma): DiaDerma | undefined { return DERMA_DIAS.find(x => x.d === d.d - 1); }
export function dermaVentana7(fromD: number): DiaDerma[] { return DERMA_DIAS.filter(x => x.d >= fromD && x.d < fromD + 7); }
/** Los 22 átomos X (estética) tras el swap v2.1: d19-20 + d47-56 + d59-68. */
export const DERMA_X_DIAS: number[] = DERMA_DIAS.filter(x => x.bKey === 'X').map(x => x.d);
/** Átomos que alimentan una SR del programa de Research (chip "alimenta SR-1/SR-2"). */
export function dermaPuentesResearch(sr?: 'SR-1' | 'SR-2'): DiaDerma[] {
  return DERMA_DIAS.filter(x => x.puenteResearch && (!sr || x.puenteResearch.sr === sr));
}
/** Átomos con protocolo Nítida (7 B + d68). */
export const DERMA_NITIDA_DIAS: number[] = DERMA_DIAS.filter(x => !!x.nitida).map(x => x.d);
export const DERMA_TIER_INFO: Record<DermaTier, { c: string; t: string }> = {
  // escala MINERAL (no neón): granate apagado · brass tostado · jade
  CRIT: { c: '#C56A5A', t: 'Crítico' }, ALTA: { c: '#B8934E', t: 'Alto' }, MED: { c: '#5FA88C', t: 'Medio' },
};
/** URL ◆ Edge para links Qbankly (mismo patrón que UsmleTodayPlan). */
export const edgeUrl = (url: string) => `microsoft-edge:${url}`;
