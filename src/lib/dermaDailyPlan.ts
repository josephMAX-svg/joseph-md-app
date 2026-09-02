/**
 * dermaDailyPlan.ts — Plan DÍA A DÍA Dermatología · PLAN ÉLITE v2 (27-ago-2026).
 * Fuente: DATA/DERMATOLOGIA/PLAN_ELITE_2026-27.md (agente macro:derma-estetica-elite +
 * inventario AccessDermatology REAL) — 70 sesiones hacia DERMATOLOGÍA ESTÉTICA.
 *
 * CICLO ÚNICO de 45′ por sesión (franja 13:30–14:15, interdiario con Research):
 *   1) 1-2 casos VISUALES CIEGOS de "Dermatology Cases for Board Review" (200 casos:
 *      Med 110 · Path 30 · Peds 30 · Surg 30) en ORDEN ALEATORIO (interleaving) —
 *      método Palmerton en 4 pasos: ① morfología en terminología estándar ② diferencial
 *      de 3 ③ viñeta y responder ④ discusión → 1-2 tarjetas de MECANISMO + 1 oclusión.
 *      El caso NUNCA se salta; los 10Q de review son la variable de ajuste.
 *   2) ~10Q de review rotando los bancos REALES (1.301Q): Pictorial 4e 381Q (~38 sesiones)
 *      → CORE Exam Bank 104Q (~9, cierre de módulo) → Barnhill's Challenge 403Q (dermpath)
 *      → QOTW 50Q (checkpoints). Etiquetar CADA fallo con su módulo CORE (med/ped/surg/path).
 *   3) 10′ de LECTURA dirigida del módulo semanal: Fitzpatrick (clínica) · Baumann 3e /
 *      Lasers / Procedural / Dermatologic Surgery (estética) — nunca lectura lineal.
 *
 * PROGRESIÓN de módulos (fundamentos → … → ESTÉTICA = últimos 22 átomos, la meta):
 *   A Fundamentos/morfología (d1-6) · B Inflamatorias (d7-13) · C Infecciosas (d14-20) ·
 *   D Tumores (d21-28) · E Dermpath básica (d29-33) · F Pediátrica (d34-38) ·
 *   G Quirúrgica/anatomía facial (d39-44) · H Checkpoint CORE (d45-46) ·
 *   X ESTÉTICA (d47-68: toxina → fillers/oclusión vascular → peelings → láser → cosmecéutica) ·
 *   Z Cierre (d69-70). Regla de SEGURIDAD primero: complicaciones antes que técnica.
 *
 * ⚠ FECHAS re-fechadas 2026-09-01 → 2027-03-12 (interdiario con Research, ancla en
 * researchData.ts#diaEstudioTipo) — NO TOCAR las fechas. URLs 100% reales: q-banks y
 * cases verificados en dermaSourcesData.ts; deep-links de libros con sectionid verificado;
 * papers = DOIs/PMC del PLAN_ELITE y de referentes.md.
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
  inicio: '2026-09-03', fin: '2027-03-16', totalDias: 70, // fechas YA re-fechadas (v2 27-ago) · interdiario con Research · NO tocar
  bloque: '13:30–14:15 (45 min · franja boards del Calendar, alterna con Research — interdiario)',
  nota: 'PLAN ÉLITE v2: cada sesión = 1-2 casos CIEGOS (Board Review, 200) + ~10Q review (rotación 1.301Q, fallos etiquetados med/ped/surg/path) + 10′ lectura del módulo. Progreso REAL marcable (studyProgress key "derma"). El día mostrado salta los días-Research.',
};

/** Franjas de la sesión Derma de 45 min — ciclo único del PLAN ÉLITE (caso ciego + review + lectura). */
export const DERMA_FRANJAS = [
  { hora: '13:30–13:33', fase: 'Repaso FSRS: tarjetas de MECANISMO + fallos etiquetados (med/ped/surg/path) de la sesión previa', tipo: 'eval' },
  { hora: '13:33–13:36', fase: 'CASO CIEGO ①②: SOLO la imagen → describe la morfología en terminología estándar + diferencial de 3 (sin leer nada)', tipo: 'pretest' },
  { hora: '13:36–13:52', fase: 'CASO ③④: leer la viñeta y responder → discusión → 1-2 tarjetas de MECANISMO + 1 oclusión de imagen (el caso NUNCA se salta)', tipo: 'read' },
  { hora: '13:52–14:03', fase: '~10Q review del banco rotante (Pictorial 4e → CORE → Barnhill dermpath → QOTW) — variable de ajuste si el caso pidió más', tipo: 'review' },
  { hora: '14:03–14:13', fase: 'LECTURA dirigida 10′ del módulo (Fitzpatrick clínica · Baumann/Lasers/Procedural estética) — nunca lineal', tipo: 'lectura' },
  { hora: '14:13–14:15', fase: 'Cierre: free recall del caso + etiquetar fallos con su módulo CORE + marcar progreso real', tipo: 'apex' },
];

export type DermaBloqueKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'Z' | 'X';
export type DermaTier = 'CRIT' | 'ALTA' | 'MED';
export interface MatLink { t: string; url: string; via?: 'edge' }
export interface DiaDerma {
  d: number; fecha: string; bloque: string; bKey: DermaBloqueKey; tier: DermaTier;
  sub: string; referente: string | null;
  access: MatLink;            // CASO del día (Cases for Board Review / DD Challenge — el motor)
  qbankly: MatLink | null;    // REVIEW ~10Q del banco rotante de AccessDerma (Pictorial/CORE/Barnhill/QOTW)
  promir: MatLink | null;     // 2º pase ES (NO usado en el plan v2 — compat con la UI)
  extra: MatLink | null;      // LECTURA dirigida 10′ del módulo (libro AccessDerma o paper del referente)
  // ── Capa ATLAS (todos OPCIONALES — no rompen ningún átomo existente) ──
  morfologia?: string;        // lesión elemental dominante (chip de la lámina)
  sitio?: string;             // sitio corporal → BodyMap
  fototipo?: string;          // nota de piel de color / Fitzpatrick
  ddx?: string[];             // diferencial (DifferentialTray, método Palmerton)
  atlasUrl?: string;          // lámina clínica: deep-link legal (DermNet/AccessDerma), NO re-host
  dermatoscopiaUrl?: string;  // panel dermatoscopia (Dermoscopedia)
  histoUrl?: string;          // panel histología (dermpathatlas / Barnhill)
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
const CASO: MatLink = { t: 'Cases for Board Review · 1-2 casos CIEGOS (orden aleatorio de 200)', url: cases(1546) };
const CASO_DD: MatLink = { t: 'Differential Diagnosis Challenge · pares de diferencial (100 sets)', url: cases(1616) };
const CASO_FALLOS: MatLink = { t: 'Board Review · SOLO casos fallados (segunda pasada FSRS)', url: cases(1546) };
const ABD_GUIDE = 'https://dlpgnf31z4a6s.cloudfront.net/media/252836/core-study-guide-012021.pdf';

export const DERMA_DIAS: DiaDerma[] = [
  // ── MÓDULO A · Fundamentos / morfología (🔴 el idioma del caso ciego, semanas 1-3 del élite) ──
  { d: 1, fecha: '2026-09-03', bloque: B.A, bKey: 'A', tier: 'CRIT', sub: 'Lesiones elementales 1ª/2ª: el vocabulario del paso ① (describir ANTES de diagnosticar)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: "Fitzpatrick's Color Atlas 9e · approach al diagnóstico", url: book(3309) },
    morfologia: 'Mácula → Tumor', sitio: 'Difuso', ddx: ['Mácula vs pápula', 'Placa vs nódulo', 'Vesícula vs pústula', 'Erosión vs úlcera'],
    atlasUrl: 'https://dermnetnz.org/topics/describing-skin-lesions' },
  { d: 2, fecha: '2026-09-07', bloque: B.A, bKey: 'A', tier: 'CRIT', sub: 'Color, distribución y configuración (anular, herpetiforme, lineal/Blaschko) — completa la descripción estándar', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Guidebook to Dermatologic Diagnosis', url: book(2960) },
    atlasUrl: 'https://dermnetnz.org/topics/describing-skin-lesions' },
  { d: 3, fecha: '2026-09-09', bloque: B.A, bKey: 'A', tier: 'ALTA', sub: 'Estructura de la piel: epidermis → BMZ → dermis → anejos (la base de toda tarjeta de MECANISMO)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: "Fitzpatrick's Dermatology 9e · Structure & Function", url: book(2570) } },
  { d: 4, fecha: '2026-09-11', bloque: B.A, bKey: 'A', tier: 'CRIT', sub: 'Fototipos I–VI + piel de color: cómo cambian los signos (eje Perú · conecta con L4/L5 de research)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: "Taylor & Kelly's Skin of Color 3e", url: book(3609) },
    morfologia: 'Mácula', sitio: 'Difuso', fototipo: 'Eje del atlas: I–VI · eritema, descriptores y PIH cambian en fototipos IV–VI',
    atlasUrl: 'https://dermnetnz.org/topics/skin-phototype' },
  { d: 5, fecha: '2026-09-15', bloque: B.A, bKey: 'A', tier: 'CRIT', sub: 'Anatomía facial + DANGER ZONES: a. facial/angular/supratroclear · glabela y nariz = máximo riesgo de oclusión (sin esto nada de estética es seguro)', referente: 'Cotofana',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Dermatologic Surgery · Surgical Anatomy & Cosmetic Subunits', url: `${MH}/content.aspx?bookid=2811&sectionid=245216992` } },
  { d: 6, fecha: '2026-09-17', bloque: B.A, bKey: 'A', tier: 'ALTA', sub: 'Dermatoscopia temprana: patrones básicos (3 de los 4 módulos CORE la preguntan transversalmente)', referente: null,
    access: CASO, qbankly: rCORE, promir: null, extra: { t: 'Dermoscopy Criteria Review', url: book(2804) },
    dermatoscopiaUrl: 'https://dermoscopedia.org/Melanocytic_lesions' },
  // ── MÓDULO B · Dermatosis inflamatorias (el corazón del área Medical: 110/200 casos) ──
  { d: 7, fecha: '2026-09-21', bloque: B.B, bKey: 'B', tier: 'CRIT', sub: 'Psoriasis + papuloescamosas (liquen plano, pitiriasis rosada/rubra)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S3 Psoriasiform Dermatoses', url: ca(275941727) },
    morfologia: 'Placa', sitio: 'Tronco', ddx: ['Psoriasis vulgar', 'Liquen plano', 'Pitiriasis rosada', 'Tiña corporis', 'Micosis fungoide'],
    atlasUrl: 'https://dermnetnz.org/topics/psoriasis', dermatoscopiaUrl: 'https://dermoscopedia.org/Inflammatory_skin_diseases_(inflammoscopy_or_ID)' },
  { d: 8, fecha: '2026-09-23', bloque: B.B, bKey: 'B', tier: 'CRIT', sub: 'Eccemas: dermatitis atópica, de contacto, seborreica', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S2 Eczema/Dermatitis', url: ca(275941291) },
    morfologia: 'Placa', sitio: 'Pliegues', fototipo: 'DA en piel de color: eritema violáceo/gris, papulosa folicular',
    ddx: ['DA', 'Dermatitis de contacto', 'Seborreica', 'Psoriasis', 'Tiña corporis'],
    atlasUrl: 'https://dermnetnz.org/topics/atopic-dermatitis' },
  { d: 9, fecha: '2026-09-25', bloque: B.B, bKey: 'B', tier: 'CRIT', sub: 'Acné + rosácea + hidradenitis (mecanismo → tratamiento; puente futuro a láser-acné y peelings)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S1 Sebaceous/Eccrine/Apocrine', url: ca(275941112) },
    morfologia: 'Pápula/pústula', sitio: 'Cara', ddx: ['Acné vulgar', 'Rosácea', 'Foliculitis', 'Dermatitis perioral'],
    atlasUrl: 'https://dermnetnz.org/topics/acne' },
  { d: 10, fecha: '2026-09-29', bloque: B.B, bKey: 'B', tier: 'CRIT', sub: 'Ampollosas autoinmunes: pénfigo vs penfigoide + dermatitis herpetiforme (nivel de la ampolla = mecanismo)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S6 Bullous Diseases', url: ca(275942016) } },
  { d: 11, fecha: '2026-10-01', bloque: B.B, bKey: 'B', tier: 'ALTA', sub: 'Urticaria y angioedema + prurito sine materia', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S35 Generalized Pruritus', url: ca(275947685) } },
  { d: 12, fecha: '2026-10-05', bloque: B.B, bKey: 'B', tier: 'CRIT', sub: 'Farmacodermias graves: SJS/TEN, DRESS, AGEP (no errar)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S23 Adverse Drug Reactions', url: ca(275944593) },
    morfologia: 'Ampolla', sitio: 'Difuso', ddx: ['SJS/TEN', 'DRESS', 'AGEP', 'EM mayor', 'SSSS', 'Pénfigo paraneoplásico'],
    atlasUrl: 'https://dermnetnz.org/topics/stevens-johnson-syndrome-toxic-epidermal-necrolysis' },
  { d: 13, fecha: '2026-10-07', bloque: B.B, bKey: 'B', tier: 'ALTA', sub: 'Conectivopatías (lupus, dermatomiositis, morfea) + vasculitis y paniculitis', referente: null,
    access: CASO, qbankly: rCORE, promir: null, extra: { t: 'Color Atlas 9e · S14 Autoimmune/Rheumatic', url: ca(275943310) } },
  // ── MÓDULO C · Infecciosas (alto ROI Perú) ──
  { d: 14, fecha: '2026-10-09', bloque: B.C, bKey: 'C', tier: 'CRIT', sub: 'Bacterianas: impétigo, celulitis/erisipela, SSSS, fascitis (cuándo NO es celulitis)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S25 Bacterial Infections', url: ca(275944706) },
    morfologia: 'Placa', sitio: 'Cara', ddx: ['Erisipela', 'Celulitis', 'Impétigo', 'SSSS', 'Dermatitis de contacto aguda'],
    atlasUrl: 'https://dermnetnz.org/topics/cellulitis' },
  { d: 15, fecha: '2026-10-13', bloque: B.C, bKey: 'C', tier: 'ALTA', sub: 'Sífilis (la gran imitadora) + ITS cutáneas + micobacterias (TB cutánea, lepra)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S30 STDs', url: ca(275946713) } },
  { d: 16, fecha: '2026-10-15', bloque: B.C, bKey: 'C', tier: 'CRIT', sub: 'Virales: HSV/VZV (Tzanck), VPH, molusco', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S27 Viral Diseases', url: ca(275945801) } },
  { d: 17, fecha: '2026-10-19', bloque: B.C, bKey: 'C', tier: 'ALTA', sub: 'Micosis superficiales y profundas + KOH (esporotricosis, cromoblastomicosis)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S26 Fungal Infections', url: ca(275945320) } },
  { d: 18, fecha: '2026-10-21', bloque: B.C, bKey: 'C', tier: 'CRIT', sub: 'Parasitosis: escabiosis, leishmaniasis (Perú), pediculosis, larva migrans', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S28 Infestations', url: ca(275946425) },
    morfologia: 'Nódulo', sitio: 'Cara', fototipo: 'Alto ROI Perú · úlcera de leishmaniasis en piel de color',
    ddx: ['Leishmaniasis', 'Esporotricosis', 'TB cutánea', 'Carcinoma basocelular', 'Úlcera piógena'],
    atlasUrl: 'https://dermnetnz.org/topics/cutaneous-leishmaniasis' },
  { d: 19, fecha: '2026-10-23', bloque: B.C, bKey: 'C', tier: 'MED', sub: 'El paciente agudo con fiebre y rash: meningococemia, endocarditis, necrotizantes', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S8 The Acutely Ill Patient', url: ca(275942269) } },
  { d: 20, fecha: '2026-10-27', bloque: B.C, bKey: 'C', tier: 'MED', sub: 'Pelo y uñas infecciosos (tiña capitis, onicomicosis) + repaso del módulo', referente: null,
    access: CASO, qbankly: rCORE, promir: null, extra: { t: 'Color Atlas 9e · S31 Hair Disorders', url: ca(275947046) } },
  // ── MÓDULO D · Tumores benignos / malignos + dermatoscopia ──
  { d: 21, fecha: '2026-10-29', bloque: B.D, bKey: 'D', tier: 'ALTA', sub: 'Tumores benignos: q. seborreica, nevus melanocíticos, quistes (qué NO biopsiar)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S9 Benign Neoplasms', url: ca(275942363) } },
  { d: 22, fecha: '2026-11-02', bloque: B.D, bKey: 'D', tier: 'CRIT', sub: 'Queratosis actínica + campo de cancerización (base del manejo con peelings/PDT después)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S11 Precancerous Lesions', url: ca(275942807) } },
  { d: 23, fecha: '2026-11-04', bloque: B.D, bKey: 'D', tier: 'CRIT', sub: 'Carcinoma basocelular + espinocelular: subtipos, riesgo, manejo', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S11 Cutaneous Carcinomas', url: ca(275942807) },
    morfologia: 'Pápula perlada', sitio: 'Cara', ddx: ['CBC', 'CEC', 'Queratoacantoma', 'Nevus intradérmico', 'Hiperplasia sebácea'],
    atlasUrl: 'https://dermnetnz.org/topics/basal-cell-carcinoma' },
  { d: 24, fecha: '2026-11-06', bloque: B.D, bKey: 'D', tier: 'CRIT', sub: 'Melanoma: ABCDE, Breslow, TNM, manejo (acral/lentiginoso en fototipos altos = Perú)', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Color Atlas 9e · S12 Melanoma', url: ca(275942978) },
    morfologia: 'Mácula', sitio: 'Tronco', fototipo: 'Acral/lentiginoso más frecuente en fototipos altos (Perú)',
    ddx: ['Melanoma', 'Nevus displásico', 'Queratosis seborreica', 'CBC pigmentado', 'Lentigo'],
    atlasUrl: 'https://dermnetnz.org/topics/melanoma', dermatoscopiaUrl: 'https://dermoscopedia.org/Melanoma', histoUrl: 'https://www.dermpathatlas.com/' },
  { d: 25, fecha: '2026-11-10', bloque: B.D, bKey: 'D', tier: 'CRIT', sub: 'Dermatoscopia II: lesiones melanocíticas (patrones, 2-step)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · Apéndice B Dermoscopy', url: ca(275944419) },
    morfologia: 'Mácula', sitio: 'Difuso', ddx: ['Patrón reticular', 'Globular', 'Homogéneo', 'Multicomponente (alarma)'],
    atlasUrl: 'https://dermnetnz.org/cme/dermoscopy-course', dermatoscopiaUrl: 'https://dermoscopedia.org/Melanocytic_lesions' },
  { d: 26, fecha: '2026-11-12', bloque: B.D, bKey: 'D', tier: 'ALTA', sub: 'Dermatoscopia III: no-melanocíticas + chaos & clues', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Dermoscopy: Illustrated Self-Assessment 2e', url: book(2929) } },
  { d: 27, fecha: '2026-11-16', bloque: B.D, bKey: 'D', tier: 'ALTA', sub: 'Linfomas cutáneos (MF/Sézary), Merkel, Kaposi, DFSP', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Color Atlas 9e · S21 Lymphomas & Sarcoma', url: ca(275944447) } },
  { d: 28, fecha: '2026-11-18', bloque: B.D, bKey: 'D', tier: 'ALTA', sub: 'Fotoenvejecimiento + fotoprotección (ciencia básica que el CORE surgical exige → estética)', referente: null,
    access: CASO, qbankly: rCORE, promir: null, extra: { t: 'Color Atlas 9e · S10 Photosensitivity', url: ca(275942604) } },
  // ── MÓDULO E · Dermatopatología básica (semana Barnhill: 30/200 casos son dermpath) ──
  { d: 29, fecha: '2026-11-20', bloque: B.E, bKey: 'E', tier: 'ALTA', sub: 'Cómo leer una biopsia: los patrones de inflamación (el mapa antes del territorio)', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: "Barnhill's Dermatopathology 4e", url: book(2802) },
    histoUrl: 'https://www.dermpathatlas.com/' },
  { d: 30, fecha: '2026-11-24', bloque: B.E, bKey: 'E', tier: 'ALTA', sub: 'Vocabulario dermpath: espongiosis, acantosis, interfase, granulomas (el idioma de la discusión del caso)', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: "Barnhill's Dermatopathology 4e", url: book(2802) } },
  { d: 31, fecha: '2026-11-26', bloque: B.E, bKey: 'E', tier: 'ALTA', sub: 'Ampollosas al microscopio: nivel de la ampolla + IF directa/indirecta', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: "Barnhill's Dermatopathology 4e", url: book(2802) } },
  { d: 32, fecha: '2026-11-30', bloque: B.E, bKey: 'E', tier: 'ALTA', sub: 'Histología de tumores: correlación clínica ↔ dermatoscopia ↔ histo del módulo D', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: "Barnhill's Dermatopathology 4e", url: book(2802) },
    histoUrl: 'https://www.dermpathatlas.com/' },
  { d: 33, fecha: '2026-12-02', bloque: B.E, bKey: 'E', tier: 'MED', sub: 'Depósitos, infiltrados y paniculitis + drill dermpath de cierre', referente: null,
    access: CASO, qbankly: rCORE, promir: null, extra: { t: "Barnhill's Dermatopathology 4e", url: book(2802) } },
  // ── MÓDULO F · Pediátrica (30/200 casos) ──
  { d: 34, fecha: '2026-12-04', bloque: B.F, bKey: 'F', tier: 'ALTA', sub: 'Dermatosis neonatales + hemangiomas infantiles y malformaciones vasculares', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: "Weinberg's Pediatric Dermatology 5e", url: book(1913) } },
  { d: 35, fecha: '2026-12-08', bloque: B.F, bKey: 'F', tier: 'ALTA', sub: 'Exantemas pediátricos + Kawasaki (el que no puedes fallar)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: "Weinberg's Pediatric Dermatology 5e", url: book(1913) } },
  { d: 36, fecha: '2026-12-10', bloque: B.F, bKey: 'F', tier: 'CRIT', sub: 'Facomatosis: NF1, esclerosis tuberosa, Sturge-Weber (criterios en la piel)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S16 Genetic Diseases', url: ca(275943937) } },
  { d: 37, fecha: '2026-12-14', bloque: B.F, bKey: 'F', tier: 'ALTA', sub: 'Genodermatosis: ictiosis + epidermólisis bullosas (queratinas y colágenos = mecanismo)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Color Atlas 9e · S4 Ichthyoses', url: ca(275941889) } },
  { d: 38, fecha: '2026-12-16', bloque: B.F, bKey: 'F', tier: 'MED', sub: 'Atopia pediátrica + acné neonatal/infantil + repaso del módulo', referente: null,
    access: CASO, qbankly: rCORE, promir: null, extra: { t: "Weinberg's Pediatric Dermatology 5e", url: book(1913) } },
  // ── MÓDULO G · Quirúrgica / anatomía facial (30/200 casos; el CORE surgical INCLUYE la cosmética) ──
  { d: 39, fecha: '2026-12-18', bloque: B.G, bKey: 'G', tier: 'CRIT', sub: 'Anatomía quirúrgica facial II: RSTL, subunidades estéticas, nervios en riesgo (temporal, marginal)', referente: 'Cotofana',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Dermatologic Surgery · Surgical Anatomy & Cosmetic Subunits', url: `${MH}/content.aspx?bookid=2811&sectionid=245216992` } },
  { d: 40, fecha: '2026-12-22', bloque: B.G, bKey: 'G', tier: 'ALTA', sub: 'Biopsias (punch/shave/excisional) + anestesia local: lidocaína y dosis máximas', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Dermatologic Surgery · Local Anesthesia & Nerve Blocks', url: `${MH}/content.aspx?bookid=2811&sectionid=245217992` } },
  { d: 41, fecha: '2026-12-24', bloque: B.G, bKey: 'G', tier: 'ALTA', sub: 'Suturas y cierre: instrumental, nudos, técnicas (Kantor + sus 91 vídeos)', referente: null,
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Atlas of Suturing Techniques 2e (Kantor)', url: book(3138) } },
  { d: 42, fecha: '2026-12-28', bloque: B.G, bKey: 'G', tier: 'MED', sub: 'Colgajos e injertos: avance, rotación, romboidal, bilobulado', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Facial Flap Surgery', url: book(2829) } },
  { d: 43, fecha: '2026-12-30', bloque: B.G, bKey: 'G', tier: 'ALTA', sub: 'Mohs + control de márgenes: indicaciones (área H) y lógica', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Margin Control Surgery of the Skin', url: book(3319) } },
  { d: 44, fecha: '2027-01-01', bloque: B.G, bKey: 'G', tier: 'CRIT', sub: 'Cicatrización + complicaciones quirúrgicas y su manejo (ciencia CORE surgical)', referente: null,
    access: CASO, qbankly: rCORE, promir: null, extra: { t: 'Dermatologic Surgery · Managing Surgical Complications', url: `${MH}/content.aspx?bookid=2811&sectionid=245222451` } },
  // ── MÓDULO H · Checkpoint CORE (mapa de debilidades antes de la fase estética) ──
  { d: 45, fecha: '2027-01-05', bloque: B.H, bKey: 'H', tier: 'ALTA', sub: 'Checkpoint 1: mapa de fallos por módulo CORE (med/ped/surg/path) → qué re-drillear en FSRS', referente: null,
    access: CASO_DD, qbankly: rQOTW, promir: null, extra: { t: 'ABD CORE Study Guide (PDF oficial)', url: ABD_GUIDE } },
  { d: 46, fecha: '2027-01-07', bloque: B.H, bKey: 'H', tier: 'ALTA', sub: 'Checkpoint 2: re-drill de fallos etiquetados + pares del DD Challenge de tus áreas flojas', referente: null,
    access: CASO_DD, qbankly: rCORE, promir: null, extra: { t: 'Guidebook to Dermatologic Diagnosis (repaso)', url: book(2960) } },
  // ── MÓDULO X · ESTÉTICA (la meta: 22 átomos · seguridad ANTES que técnica) ──
  { d: 47, fecha: '2027-01-11', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Anatomía facial 3D: 5 capas, SMAS, compartimentos grasos, ligamentos de retención', referente: 'Cotofana',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Baumann 3e · Facial Anatomy and Aging', url: `${MH}/content.aspx?bookid=3200&sectionid=266614877` } },
  { d: 48, fecha: '2027-01-13', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Arterias peligrosas + zonas seguras: glabela, nariz, temple, surco nasogeniano (no errar)', referente: 'Cotofana',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Vascular Safe Zones (PAN 2022)', url: 'https://pubmed.ncbi.nlm.nih.gov/36469395/' } },
  { d: 49, fecha: '2027-01-15', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Envejecimiento estructural (hueso → grasa → ligamento → piel) + análisis facial: tercios, MD ASA', referente: 'de Maio',
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Baumann 3e · Intrinsic Aging', url: `${MH}/content.aspx?bookid=3200&sectionid=266614593` } },
  { d: 50, fecha: '2027-01-19', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Toxina I: mecanismo (clivaje de SNAP-25), serotipos, unidades NO intercambiables entre marcas', referente: 'Carruthers',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Baumann 3e · Botulinum Toxins', url: `${MH}/content.aspx?bookid=3200&sectionid=266616475` } },
  { d: 51, fecha: '2027-01-21', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Toxina II: tercio superior (frontal, glabela, patas de gallo) — músculos, dosis, cómo evitar la ptosis', referente: 'Carruthers',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Dermatologic Surgery · Neuromodulators', url: `${MH}/content.aspx?bookid=2811&sectionid=245227386` } },
  { d: 52, fecha: '2027-01-25', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Toxina III: tercio inferior, Nefertiti, masetero, hiperhidrosis', referente: 'Carruthers',
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Cosmetic Procedures in Primary Care · Botulinum Toxin', url: `${MH}/content.aspx?bookid=2953&sectionid=248412579` } },
  { d: 53, fecha: '2027-01-27', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Toxina IV: complicaciones y manejo — ptosis (apraclonidina), asimetrías, difusión (seguridad primero)', referente: 'Carruthers',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Complicaciones de toxina (Cureus 2026, OA)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12865869/' } },
  { d: 54, fecha: '2027-01-29', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: "Rellenos I: reología del HA (G', cohesividad) + bioestimuladores (CaHA/PLLA)", referente: 'de Maio',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Cosmeceuticals · Hyaluronic Acid', url: `${MH}/content.aspx?bookid=2812&sectionid=244978644` } },
  { d: 55, fecha: '2027-02-02', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Rellenos II: planos de inyección, aguja vs cánula, técnicas por región', referente: 'de Maio',
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Dermatologic Surgery · Fillers and Injectable Implants', url: `${MH}/content.aspx?bookid=2811&sectionid=245227491` } },
  { d: 56, fecha: '2027-02-04', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Rellenos III: MD Codes fundación (Ck, T, Tt) + myomodulation', referente: 'de Maio',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'MD Codes paper (open access PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8012343/' } },
  { d: 57, fecha: '2027-02-08', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'OCLUSIÓN VASCULAR: reconocimiento inmediato + protocolo HDPH de hialuronidasa DE MEMORIA (no errar)', referente: 'DeLorenzi',
    access: CASO, qbankly: rQOTW, promir: null, extra: { t: 'HDPH Protocol (ASJ 2017)', url: 'https://pubmed.ncbi.nlm.nih.gov/28333326/' } },
  { d: 58, fecha: '2027-02-10', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Ceguera por relleno: prevención, manejo inmediato, kit de emergencia (no errar)', referente: 'Goodman/Magnusson',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Consenso Embolic Visual Loss (ASJ 2020, OA)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7427155/' } },
  { d: 59, fecha: '2027-02-12', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Rellenos IV: consideraciones étnicas y de género + fat transfer', referente: 'de Maio',
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Dermatologic Surgery · Ethnic & Gender Considerations (Fillers)', url: `${MH}/content.aspx?bookid=2811&sectionid=245227608` } },
  { d: 60, fecha: '2027-02-16', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Peelings I: profundidad (superficial/medio/profundo), agentes (glicólico, salicílico, TCA, fenol), frosting', referente: 'Baumann',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Baumann 3e · Chemical Peels', url: `${MH}/content.aspx?bookid=3200&sectionid=266616672` } },
  { d: 61, fecha: '2027-02-18', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Peelings II: por fototipo (IV–VI), prevención de PIH, complicaciones (conecta con L4/L5 research)', referente: 'Baumann',
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Cosmetic Derm for Skin of Color · Ablative/Deep Peels', url: `${MH}/content.aspx?bookid=2956&sectionid=248485136` } },
  { d: 62, fecha: '2027-02-22', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Láser I: fototermólisis selectiva (Anderson-Parrish) — cromóforo → λ → duración de pulso → enfriamiento (la MISMA física del CORE surgical)', referente: 'Anderson',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Lasers in Dermatology · Fundamentals', url: `${MH}/content.aspx?bookid=2818&sectionid=240357100` } },
  { d: 63, fecha: '2027-02-24', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Láser II: lesiones vasculares (PDL) + pigmento y tatuajes (Q-switched/pico)', referente: 'Anderson',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Lasers in Dermatology · Cutaneous Vascular Lesions', url: `${MH}/content.aspx?bookid=2818&sectionid=240357136` } },
  { d: 64, fecha: '2027-02-26', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Láser III: resurfacing fraccional (ablativo/no-ablativo) + radiofrecuencia + tightening', referente: 'Manstein/Anderson',
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Lasers in Dermatology · Laser & RF Resurfacing', url: `${MH}/content.aspx?bookid=2818&sectionid=240357478` } },
  { d: 65, fecha: '2027-03-02', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Láser IV: seguridad en fototipos IV–VI — parámetros, PIH, depilación en piel étnica (no errar)', referente: 'Anderson',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Dermatologic Surgery · Laser/Light en piel de color', url: `${MH}/content.aspx?bookid=2811&sectionid=245228834` } },
  { d: 66, fecha: '2027-03-04', bloque: B.X, bKey: 'X', tier: 'MED', sub: 'Contorno corporal (criolipólisis, HIFU) + escleroterapia básica (ambos en el temario CORE surgical)', referente: null,
    access: CASO, qbankly: rBARN, promir: null, extra: { t: 'Lasers in Dermatology · Devices for Body Contour', url: `${MH}/content.aspx?bookid=2818&sectionid=240357542` } },
  { d: 67, fecha: '2027-03-08', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Microneedling + PRP + skinboosters: evidencia y técnica', referente: 'Baumann',
    access: CASO, qbankly: rPIC, promir: null, extra: { t: 'Baumann 3e · Microneedling and PRP', url: `${MH}/content.aspx?bookid=3200&sectionid=266617053` } },
  { d: 68, fecha: '2027-03-10', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Ciencia cosmecéutica: Baumann Skin Typing, retinoides tópicos, antioxidantes, fotoprotección', referente: 'Baumann',
    access: CASO, qbankly: rCORE, promir: null, extra: { t: 'Cosmeceuticals and Cosmetic Ingredients (83 caps)', url: book(2812) } },
  // ── MÓDULO Z · Cierre (integración + repaso de fallos) ──
  { d: 69, fecha: '2027-03-12', bloque: B.Z, bKey: 'Z', tier: 'MED', sub: 'REPASO 1: segunda pasada FSRS — SOLO casos y preguntas fallados, por módulo CORE más flojo', referente: null,
    access: CASO_FALLOS, qbankly: rPIC, promir: null, extra: { t: 'Guidebook to Dermatologic Diagnosis (repaso)', url: book(2960) } },
  { d: 70, fecha: '2027-03-16', bloque: B.Z, bKey: 'Z', tier: 'MED', sub: 'REPASO 2: mapa final de debilidades + plan del ciclo siguiente (post-Step 1: subir a 5 casos/sesión)', referente: null,
    access: CASO_DD, qbankly: rQOTW, promir: null, extra: { t: 'ABD CORE Study Guide (PDF oficial)', url: ABD_GUIDE } },];

export function dermaDiaDe(fechaISO: string): DiaDerma | undefined { return DERMA_DIAS.find(x => x.fecha === fechaISO); }
export function dermaDiaPrevio(d: DiaDerma): DiaDerma | undefined { return DERMA_DIAS.find(x => x.d === d.d - 1); }
export function dermaVentana7(fromD: number): DiaDerma[] { return DERMA_DIAS.filter(x => x.d >= fromD && x.d < fromD + 7); }
export const DERMA_TIER_INFO: Record<DermaTier, { c: string; t: string }> = {
  // escala MINERAL (no neón): granate apagado · brass tostado · jade
  CRIT: { c: '#C56A5A', t: 'Crítico' }, ALTA: { c: '#B8934E', t: 'Alto' }, MED: { c: '#5FA88C', t: 'Medio' },
};
/** URL ◆ Edge para links Qbankly (mismo patrón que UsmleTodayPlan). */
export const edgeUrl = (url: string) => `microsoft-edge:${url}`;
