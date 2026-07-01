/**
 * dermaDailyPlan.ts — Plan DÍA A DÍA Dermatología (1 tema-átomo/día-Derma).
 * 68 átomos: 52 board (orden Sima Jain reordenado × ponderación ABD APPLIED 55/15/15/15
 * × Peso MIR ProMIR) + 16 de estética estructural (DERMA_MASTER_SPEC, referentes verificados
 * + deep-links capítulo-nivel de los TOCs reales de AccessDerma — 16 libros, 740 caps).
 *
 * RITMO INTERDIARIO con Research (bloque Calendar 13:30–14:15, NO tocar el Calendar):
 * la alternancia vive en researchData.ts#diaEstudioTipo (días hábiles desde mié 10-jun-2026
 * = D0 Research; par→Research, impar→Derma; findes descanso). D1 Derma = jue 11-jun-2026.
 *
 * DATA REAL (10-jun-2026, nada inventado — ver DATA/DERMATOLOGIA/):
 * - AccessDermatologyDxRx: TOC Color Atlas 9e (35 secciones+sectionid), 36 libros (bookid),
 *   5 q-banks (1.301 Q), 300 casos, vídeos contados (91 sutura Kantor).
 * - Qbankly: uWorld Library subject Dermatology 43 temas (doc 70–112) + 78 Q derma Step 1.
 *   ⚠ Qbankly SOLO abre en Edge → la UI debe ofrecer botón ◆ Edge (microsoft-edge:<url>).
 * - ProMIR: asignatura 5, 11 capítulos /capitulo/<id>, vídeos con duración real.
 * - Referentes estética: DOIs/URLs verificados (DATA/DERMATOLOGIA/referentes.md).
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
/** Qbankly: SOLO Edge — la UI debe renderizar botón ◆ Edge además del link normal. */
export const qb = (doc: number) => `https://qbankly.app/library?e=1&doc=${doc}`;
export const QB_QBANKS = 'https://qbankly.app/qbanks';
export const pm = (capId: string) => `https://promir.medicapanamericana.com/capitulo/${capId}`;
/** capIds ProMIR Dermatología (asignatura 5) — de mirTemarioData.ts, verificados en vivo. */
export const PM_CAP = {
  intro: '62836950c0f8415ab9efb5c7', c1: '570779c8f4d68bf008dbc646', c2: '570779c8f4d68bf008dbc6a2',
  c3: '570779c9f4d68bf008dbc71f', c4: '570779c9f4d68bf008dbc77b', c5: '570779c8f4d68bf008dbc5fc',
  c6: '570779c8f4d68bf008dbc648', c7: '570779c8f4d68bf008dbc6a4', c8: '570779c9f4d68bf008dbc721',
  c9: '570779c9f4d68bf008dbc77d', c10: '64465ebc321262437c8d0c8f',
} as const;

export const DERMA_DAILY_META = {
  inicio: '2026-07-03', fin: '2027-01-13', totalDias: 70, // D1=Vie 2026-06-19 (1er slot-derma ≥19-jun) · alterna con Research (ancla 10-jun) · 68 átomos + 2 colchón → fin 30-dic
  bloque: '13:30–14:15 (franja boards del Calendar, alterna con Research — interdiario)',
  nota: 'Progreso REAL marcable (studyProgress key "derma", empieza 0%). El día mostrado salta los días-Research.',
};

/** Franjas de la sesión Derma de 45 min (espejo del protocolo USMLE/Research del Calendar). */
export const DERMA_FRANJAS = [
  { hora: '13:30–13:35', fase: 'Eval anclada del átomo PREVIO: 2Q (Qbankly ◆Edge o Q-bank Access) + log de error', tipo: 'eval' },
  { hora: '13:35–13:40', fase: 'PRE-TEST: 3Q ciegas del átomo nuevo + free recall 60s', tipo: 'pretest' },
  { hora: '13:40–14:00', fase: 'LECTURA ACTIVA: Color Atlas 9e / libro del día (dermpath→Barnhill · peds→Weinberg · color→Taylor&Kelly · qx→Kantor · estética→referente)', tipo: 'read' },
  { hora: '14:00–14:05', fase: '2º PASE ES: capítulo ProMIR equivalente (Enfoque + figuras)', tipo: 'promir' },
  { hora: '14:05–14:10', fase: 'FREE RECALL + 7 pasos del Cerebro Clínico en voz alta (mastery gate)', tipo: 'recall' },
  { hora: '14:10–14:15', fase: 'Crear ≤3 APEX + marcar progreso real', tipo: 'apex' },
];

export type DermaBloqueKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'Z' | 'X';
export type DermaTier = 'CRIT' | 'ALTA' | 'MED';
export interface MatLink { t: string; url: string; via?: 'edge' }
export interface DiaDerma {
  d: number; fecha: string; bloque: string; bKey: DermaBloqueKey; tier: DermaTier;
  sub: string; referente: string | null;
  access: MatLink;            // lectura primaria (AccessDerma o fuente del referente)
  qbankly: MatLink | null;    // práctica — SIEMPRE botón ◆ Edge
  promir: MatLink | null;     // 2º pase en español
  extra: MatLink | null;      // casos / vídeo / paper del día
}

const B = {
  A: 'Fundamentos / lenguaje', B: 'Genodermatosis / Pediátrica', C: 'Infecciosas',
  D: 'Neoplasias + dermatoscopia', E: 'Dermatopatología', F: 'Cirugía dermatológica',
  G: 'Farmacología', H: 'Medical amplio', Z: 'Cierre board', X: 'Estética estructural',
};

export const DERMA_DIAS: DiaDerma[] = [
  // ── BLOQUE A · Fundamentos (🔴 el alfabeto primero) ──
  { d: 1, fecha: '2026-07-03', bloque: B.A, bKey: 'A', tier: 'CRIT', sub: 'Lesiones elementales 1ª/2ª + descripción semiológica (el alfabeto)', referente: null,
    access: { t: 'Guidebook to Dermatologic Diagnosis', url: book(2960) }, qbankly: { t: 'QBanks (derma en uWorld S1)', url: QB_QBANKS, via: 'edge' }, promir: { t: 'Cap 1 §2 Lesiones elementales (subtema 6,78%)', url: pm(PM_CAP.c1) }, extra: null },
  { d: 2, fecha: '2026-07-07', bloque: B.A, bKey: 'A', tier: 'CRIT', sub: 'Estructura de la piel: epidermis, queratinocitos, barrera', referente: null,
    access: { t: "Fitzpatrick's Dermatology 9e", url: book(2570) }, qbankly: null, promir: { t: 'Cap 1 §1.1 Epidermis', url: pm(PM_CAP.c1) }, extra: null },
  { d: 3, fecha: '2026-07-09', bloque: B.A, bKey: 'A', tier: 'CRIT', sub: 'BMZ + dermis + anejos (ancla de las bullosas)', referente: null,
    access: { t: "Fitzpatrick's Dermatology 9e", url: book(2570) }, qbankly: null, promir: { t: 'Cap 1 §1.2-1.3 Dermis/Hipodermis', url: pm(PM_CAP.c1) }, extra: null },
  { d: 4, fecha: '2026-07-13', bloque: B.A, bKey: 'A', tier: 'CRIT', sub: 'Melanocito, pigmentación, fototipos Fitzpatrick + piel de color', referente: null,
    access: { t: "Taylor & Kelly's Skin of Color 3e", url: book(3609) }, qbankly: null, promir: { t: 'Cap 1 Conceptos generales', url: pm(PM_CAP.c1) }, extra: { t: 'Vídeos Essentials of Skin of Color (5)', url: mm(1661) } },
  { d: 5, fecha: '2026-07-15', bloque: B.A, bKey: 'A', tier: 'ALTA', sub: 'Inmunología cutánea: Th1/Th2/Th17 + hipersensibilidades', referente: null,
    access: { t: "Fitzpatrick's Dermatology 9e", url: book(2570) }, qbankly: { t: 'uWorld: Hypersensitivity reactions', url: qb(9), via: 'edge' }, promir: null, extra: null },
  { d: 6, fecha: '2026-07-17', bloque: B.A, bKey: 'A', tier: 'ALTA', sub: 'Genética básica: queratinas, colágenos, mosaicismo', referente: null,
    access: { t: "Fitzpatrick's Dermatology 9e", url: book(2570) }, qbankly: null, promir: { t: 'Cap 9 §1 Introducción genodermatosis', url: pm(PM_CAP.c9) }, extra: null },
  { d: 7, fecha: '2026-07-21', bloque: B.A, bKey: 'A', tier: 'ALTA', sub: 'Terapéutica básica: vehículos, corticoides por potencia, FTU', referente: null,
    access: { t: "Fitzpatrick's Therapeutics", url: book(3332) }, qbankly: null, promir: { t: 'Cap 1 §4 Tratamientos (subtema 7,46%)', url: pm(PM_CAP.c1) }, extra: null },
  // ── BLOQUE B · Genodermatosis / Pediátrica (15% APPLIED) ──
  { d: 8, fecha: '2026-07-23', bloque: B.B, bKey: 'B', tier: 'ALTA', sub: 'Ictiosis y cornificación (+ Darier / Hailey-Hailey)', referente: null,
    access: { t: 'Color Atlas 9e · S4 Ichthyoses', url: ca(275941889) }, qbankly: null, promir: { t: 'Cap 9 §2', url: pm(PM_CAP.c9) }, extra: null },
  { d: 9, fecha: '2026-07-27', bloque: B.B, bKey: 'B', tier: 'ALTA', sub: 'Epidermólisis bullosas', referente: null,
    access: { t: 'Color Atlas 9e · S6 Bullous Diseases', url: ca(275942016) }, qbankly: null, promir: { t: 'Cap 9 §2.4', url: pm(PM_CAP.c9) }, extra: null },
  { d: 10, fecha: '2026-07-29', bloque: B.B, bKey: 'B', tier: 'CRIT', sub: 'Facomatosis: NF1, esclerosis tuberosa, Sturge-Weber, VHL', referente: null,
    access: { t: 'Color Atlas 9e · S16 Genetic Diseases', url: ca(275943937) }, qbankly: null, promir: { t: 'Cap 9 §4-5', url: pm(PM_CAP.c9) }, extra: null },
  { d: 11, fecha: '2026-07-31', bloque: B.B, bKey: 'B', tier: 'MED', sub: 'Genodermatosis con riesgo tumoral (Gorlin, XP) + Marfan/PXE/Ehlers-Danlos', referente: null,
    access: { t: 'Color Atlas 9e · S16 Genetic Diseases', url: ca(275943937) }, qbankly: null, promir: { t: 'Cap 9 §3 (estrías angioides = perla MIR)', url: pm(PM_CAP.c9) }, extra: null },
  { d: 12, fecha: '2026-08-04', bloque: B.B, bKey: 'B', tier: 'ALTA', sub: 'Dermatosis neonatales + exantemas pediátricos', referente: null,
    access: { t: "Weinberg's Pediatric Dermatology 5e", url: book(1913) }, qbankly: { t: 'uWorld: Erythema infectiosum (+HFMD, roseola)', url: qb(86), via: 'edge' }, promir: { t: 'Cap 2 §1.6-1.7 Exantemas', url: pm(PM_CAP.c2) }, extra: { t: '30 casos Pediatric Dermatology', url: cases(1546) } },
  // ── BLOQUE C · Infecciosas (PM 17,29%) ──
  { d: 13, fecha: '2026-08-06', bloque: B.C, bKey: 'C', tier: 'CRIT', sub: 'Bacterianas: impétigo, celulitis/erisipela, SSSS, TSS', referente: null,
    access: { t: 'Color Atlas 9e · S25 Bacterial Infections', url: ca(275944706) }, qbankly: { t: 'uWorld: Cellulitis/abscess (+impétigo 92, SSSS 109)', url: qb(78), via: 'edge' }, promir: { t: 'Cap 2 §5 Bacterianas', url: pm(PM_CAP.c2) }, extra: null },
  { d: 14, fecha: '2026-08-10', bloque: B.C, bKey: 'C', tier: 'MED', sub: 'Micobacterias: TB cutánea, lepra', referente: null,
    access: { t: 'Color Atlas 9e · S25 Bacterial Infections', url: ca(275944706) }, qbankly: null, promir: { t: 'Cap 2 §5.7 Micobacterias', url: pm(PM_CAP.c2) }, extra: null },
  { d: 15, fecha: '2026-08-12', bloque: B.C, bKey: 'C', tier: 'ALTA', sub: 'Sífilis (estadios) + ITS cutáneas', referente: null,
    access: { t: 'Color Atlas 9e · S30 STDs', url: ca(275946713) }, qbankly: null, promir: { t: 'Cap 2 Infecciosas', url: pm(PM_CAP.c2) }, extra: null },
  { d: 16, fecha: '2026-08-14', bloque: B.C, bKey: 'C', tier: 'CRIT', sub: 'Virales: HSV/VZV, VPH, molusco, exantemas (PM 10,17%)', referente: null,
    access: { t: 'Color Atlas 9e · S27 Viral Diseases', url: ca(275945801) }, qbankly: { t: 'uWorld: Cutaneous warts (+varicela 79, molusco 98)', url: qb(81), via: 'edge' }, promir: { t: 'Cap 2 §1 Víricas', url: pm(PM_CAP.c2) }, extra: null },
  { d: 17, fecha: '2026-08-18', bloque: B.C, bKey: 'C', tier: 'ALTA', sub: 'Micosis superficiales/profundas + KOH (PM 5,42%)', referente: null,
    access: { t: 'Color Atlas 9e · S26 Fungal Infections', url: ca(275945320) }, qbankly: { t: 'uWorld: Dermatophyte (+versicolor 112)', url: qb(82), via: 'edge' }, promir: { t: 'Cap 2 §2 Fúngicas', url: pm(PM_CAP.c2) }, extra: { t: 'Vídeo KOH/Tzanck (Clinical Videos)', url: mm(46399) } },
  { d: 18, fecha: '2026-08-20', bloque: B.C, bKey: 'C', tier: 'CRIT', sub: 'Parasitosis: escabiosis, leishmaniasis (Perú), pediculosis, larva migrans', referente: null,
    access: { t: 'Color Atlas 9e · S28 Infestations', url: ca(275946425) }, qbankly: { t: 'uWorld: Scabies (+lice 95, larva 80)', url: qb(106), via: 'edge' }, promir: { t: 'Cap 2 §7-8 Parásitos/Infestaciones', url: pm(PM_CAP.c2) }, extra: null },
  // ── BLOQUE D · Neoplasias + dermatoscopia (PM 23,39% — tema nº1) ──
  { d: 19, fecha: '2026-08-24', bloque: B.D, bKey: 'D', tier: 'ALTA', sub: 'Tumores benignos + nevus melanocíticos', referente: null,
    access: { t: 'Color Atlas 9e · S9 Benign Neoplasms', url: ca(275942363) }, qbankly: { t: 'uWorld: Seborrheic keratosis', url: qb(108), via: 'edge' }, promir: { t: 'Cap 4 §1 Tumores benignos', url: pm(PM_CAP.c4) }, extra: null },
  { d: 20, fecha: '2026-08-26', bloque: B.D, bKey: 'D', tier: 'CRIT', sub: 'Queratosis actínica + campo de cancerización', referente: null,
    access: { t: 'Color Atlas 9e · S11 Precancerous Lesions', url: ca(275942807) }, qbankly: { t: 'uWorld: Actinic keratosis', url: qb(71), via: 'edge' }, promir: { t: 'Cap 4 §3 Premalignas', url: pm(PM_CAP.c4) }, extra: null },
  { d: 21, fecha: '2026-08-28', bloque: B.D, bKey: 'D', tier: 'CRIT', sub: 'Carcinoma basocelular + espinocelular', referente: null,
    access: { t: 'Color Atlas 9e · S11 Cutaneous Carcinomas', url: ca(275942807) }, qbankly: { t: 'uWorld: NMSC (SCC + BCC)', url: qb(99), via: 'edge' }, promir: { t: 'Cap 4 §4 No melanoma', url: pm(PM_CAP.c4) }, extra: null },
  { d: 22, fecha: '2026-09-01', bloque: B.D, bKey: 'D', tier: 'CRIT', sub: 'Melanoma: ABCDE, Breslow, TNM, manejo (PM 10,85% — subtema nº1)', referente: null,
    access: { t: 'Color Atlas 9e · S12 Melanoma', url: ca(275942978) }, qbankly: { t: 'uWorld: Melanoma', url: qb(97), via: 'edge' }, promir: { t: 'Cap 4 §5 Melanoma', url: pm(PM_CAP.c4) }, extra: { t: '🎬 Masterclass melanoma MIR (1:39:10)', url: pm(PM_CAP.c4) } },
  { d: 23, fecha: '2026-09-03', bloque: B.D, bKey: 'D', tier: 'CRIT', sub: 'Dermatoscopia I: lesiones melanocíticas', referente: null,
    access: { t: 'Dermoscopy Criteria Review', url: book(2804) }, qbankly: null, promir: { t: 'Cap 10 Dermatoscopia', url: pm(PM_CAP.c10) }, extra: { t: '🎬 Videoclase Dermatoscopia (18:36) + CA Apéndice B', url: ca(275944419) } },
  { d: 24, fecha: '2026-09-07', bloque: B.D, bKey: 'D', tier: 'ALTA', sub: 'Dermatoscopia II: no-melanocíticas + 2-step/chaos&clues', referente: null,
    access: { t: 'Dermoscopy: Illustrated Self-Assessment 2e', url: book(2929) }, qbankly: null, promir: { t: 'Cap 10 §3-5 CBC/epidermoide/otras', url: pm(PM_CAP.c10) }, extra: null },
  { d: 25, fecha: '2026-09-09', bloque: B.D, bKey: 'D', tier: 'ALTA', sub: 'Linfomas cutáneos (MF/Sézary), Merkel, Kaposi, DFSP, mastocitosis', referente: null,
    access: { t: 'Color Atlas 9e · S21 Lymphomas & Sarcoma', url: ca(275944447) }, qbankly: { t: 'uWorld: Kaposi sarcoma', url: qb(94), via: 'edge' }, promir: { t: 'Cap 4 §6-9', url: pm(PM_CAP.c4) }, extra: null },
  // ── BLOQUE E · Dermatopatología (15% APPLIED) ──
  { d: 26, fecha: '2026-09-11', bloque: B.E, bKey: 'E', tier: 'ALTA', sub: 'Cómo leer una biopsia + patrones de inflamación', referente: null,
    access: { t: "Barnhill's Dermatopathology 4e", url: book(2802) }, qbankly: null, promir: { t: 'Cap 1 §3 Nociones de AP', url: pm(PM_CAP.c1) }, extra: { t: "Barnhill's Challenge (403 Q)", url: qa(2865) } },
  { d: 27, fecha: '2026-09-15', bloque: B.E, bKey: 'E', tier: 'ALTA', sub: 'Ampollosas en biopsia: inmunofluorescencia directa/indirecta', referente: null,
    access: { t: "Barnhill's Dermatopathology 4e", url: book(2802) }, qbankly: null, promir: { t: 'Cap 6 §2 Diagnóstico ampollosas', url: pm(PM_CAP.c6) }, extra: { t: "Barnhill's Challenge (quiz IF)", url: qa(2865) } },
  { d: 28, fecha: '2026-09-17', bloque: B.E, bKey: 'E', tier: 'ALTA', sub: 'Tumores en histología (correlación con bloque D)', referente: null,
    access: { t: "Barnhill's Dermatopathology 4e", url: book(2802) }, qbankly: null, promir: null, extra: { t: '30 casos Dermatopathology (Board Review)', url: cases(1546) } },
  { d: 29, fecha: '2026-09-21', bloque: B.E, bKey: 'E', tier: 'MED', sub: 'Depósitos, infiltrados, paniculitis + drill 20Q Challenge', referente: null,
    access: { t: "Barnhill's Challenge: quiz 20Q", url: qa(2865) }, qbankly: null, promir: null, extra: null },
  // ── BLOQUE F · Cirugía dermatológica (15% APPLIED) ──
  { d: 30, fecha: '2026-09-23', bloque: B.F, bKey: 'F', tier: 'CRIT', sub: 'Anatomía quirúrgica facial: zonas de peligro, RSTL, unidades estéticas', referente: 'Cotofana (puente a X)',
    access: { t: 'Dermatologic Surgery · Cap 1 Surgical Anatomy & Cosmetic Subunits', url: `${MH}/content.aspx?bookid=2811&sectionid=245216992` }, qbankly: null, promir: null, extra: null },
  { d: 31, fecha: '2026-09-25', bloque: B.F, bKey: 'F', tier: 'CRIT', sub: 'Biopsias: punch / shave / excisional + anestesia local (dosis máximas)', referente: null,
    access: { t: 'Dermatologic Surgery · Local Anesthesia & Nerve Blocks', url: `${MH}/content.aspx?bookid=2811&sectionid=245217992` }, qbankly: null, promir: null, extra: { t: 'Vídeos: Punch & Shave Biopsy', url: mm(1417) } },
  { d: 32, fecha: '2026-09-29', bloque: B.F, bKey: 'F', tier: 'ALTA', sub: 'Suturas: instrumental, nudos, técnicas (Kantor)', referente: null,
    access: { t: 'Atlas of Suturing Techniques 2e (Kantor)', url: book(3138) }, qbankly: null, promir: null, extra: { t: '91 vídeos Suturing Techniques', url: mm(1420) } },
  { d: 33, fecha: '2026-10-01', bloque: B.F, bKey: 'F', tier: 'MED', sub: 'Colgajos e injertos (avance, rotación, romboidal, bilobulado)', referente: null,
    access: { t: 'Facial Flap Surgery', url: book(2829) }, qbankly: null, promir: null, extra: { t: '30 casos Surgical Dermatology', url: cases(1546) } },
  { d: 34, fecha: '2026-10-05', bloque: B.F, bKey: 'F', tier: 'ALTA', sub: 'Mohs + control de márgenes + complicaciones quirúrgicas', referente: null,
    access: { t: 'Margin Control Surgery of the Skin', url: book(3319) }, qbankly: null, promir: null, extra: { t: 'Skin Cancer: A Comprehensive Guide', url: book(3257) } },
  // ── BLOQUE G · Farmacología dermatológica ──
  { d: 35, fecha: '2026-10-07', bloque: B.G, bKey: 'G', tier: 'ALTA', sub: 'Corticoides tópicos (potencias) y sistémicos', referente: null,
    access: { t: "Fitzpatrick's Therapeutics", url: book(3332) }, qbankly: null, promir: { t: 'Cap 1 §4.1 Terapéutica tópica', url: pm(PM_CAP.c1) }, extra: null },
  { d: 36, fecha: '2026-10-09', bloque: B.G, bKey: 'G', tier: 'CRIT', sub: 'Retinoides + isotretinoína (teratogenia = no errar)', referente: 'Global Alliance',
    access: { t: "Fitzpatrick's Therapeutics", url: book(3332) }, qbankly: { t: 'uWorld: Acne vulgaris (isotretinoína)', url: qb(70), via: 'edge' }, promir: { t: 'Cap 7 §1 Acné (retinoides y embarazo = perla)', url: pm(PM_CAP.c7) }, extra: null },
  { d: 37, fecha: '2026-10-13', bloque: B.G, bKey: 'G', tier: 'MED', sub: 'Inmunosupresores clásicos: MTX, ciclosporina, azatioprina', referente: null,
    access: { t: "Fitzpatrick's Therapeutics", url: book(3332) }, qbankly: null, promir: null, extra: null },
  { d: 38, fecha: '2026-10-15', bloque: B.G, bKey: 'G', tier: 'ALTA', sub: 'Biológicos: anti-TNF, anti-IL-17/23, dupilumab, JAK', referente: null,
    access: { t: "Fitzpatrick's Therapeutics", url: book(3332) }, qbankly: null, promir: { t: 'Cap 5 §5.5 Nuevos tratamientos DA', url: pm(PM_CAP.c5) }, extra: null },
  { d: 39, fecha: '2026-10-19', bloque: B.G, bKey: 'G', tier: 'MED', sub: 'Antifúngicos y antivirales sistémicos', referente: null,
    access: { t: "Fitzpatrick's Therapeutics", url: book(3332) }, qbankly: null, promir: { t: 'Cap 2 Infecciosas', url: pm(PM_CAP.c2) }, extra: null },
  // ── BLOQUE H · Medical amplio (55% APPLIED) ──
  { d: 40, fecha: '2026-10-21', bloque: B.H, bKey: 'H', tier: 'CRIT', sub: 'Acné + rosácea + hidradenitis (mecanismo→adherencia; tesis CADI/IGA)', referente: 'Global Alliance (JAAD 2018)',
    access: { t: 'Color Atlas 9e · S1 Sebaceous/Eccrine/Apocrine', url: ca(275941112) }, qbankly: { t: 'uWorld: Acne (+rosácea 103, HS 91)', url: qb(70), via: 'edge' }, promir: { t: 'Cap 7 §1-2', url: pm(PM_CAP.c7) }, extra: { t: 'Consenso Global Alliance (JAAD 2018)', url: 'https://pubmed.ncbi.nlm.nih.gov/29127053/' } },
  { d: 41, fecha: '2026-10-23', bloque: B.H, bKey: 'H', tier: 'CRIT', sub: 'Eccemas: dermatitis atópica, de contacto, seborreica', referente: null,
    access: { t: 'Color Atlas 9e · S2 Eczema/Dermatitis', url: ca(275941291) }, qbankly: { t: 'uWorld: Atopic dermatitis', url: qb(74), via: 'edge' }, promir: { t: 'Cap 5 §4-6 Eccemas/DA/seborreica', url: pm(PM_CAP.c5) }, extra: null },
  { d: 42, fecha: '2026-10-27', bloque: B.H, bKey: 'H', tier: 'CRIT', sub: 'Psoriasis + papuloescamosas (liquen plano, pitiriasis rosada/rubra)', referente: null,
    access: { t: 'Color Atlas 9e · S3 Psoriasiform Dermatoses', url: ca(275941727) }, qbankly: { t: 'uWorld: Psoriasis (+pitiriasis rosea 100)', url: qb(101), via: 'edge' }, promir: { t: 'Cap 5 §1-3 (núcleo del Enfoque MIR)', url: pm(PM_CAP.c5) }, extra: null },
  { d: 43, fecha: '2026-10-29', bloque: B.H, bKey: 'H', tier: 'CRIT', sub: 'Ampollosas autoinmunes: pénfigo vs penfigoide, DH (DD = perla MIR)', referente: null,
    access: { t: 'Color Atlas 9e · S6 Bullous Diseases', url: ca(275942016) }, qbankly: { t: 'uWorld: Bullous pemphigoid & pemphigus', url: qb(76), via: 'edge' }, promir: { t: 'Cap 6 Ampollosas', url: pm(PM_CAP.c6) }, extra: null },
  { d: 44, fecha: '2026-11-02', bloque: B.H, bKey: 'H', tier: 'ALTA', sub: 'Urticaria y angioedema + prurito sine materia', referente: null,
    access: { t: 'Color Atlas 9e · S35 Generalized Pruritus', url: ca(275947685) }, qbankly: { t: 'uWorld: Angioedema & urticaria', url: qb(2), via: 'edge' }, promir: { t: 'Cap 7 §4', url: pm(PM_CAP.c7) }, extra: null },
  { d: 45, fecha: '2026-11-04', bloque: B.H, bKey: 'H', tier: 'ALTA', sub: 'Conectivopatías: lupus cutáneo, dermatomiositis, morfea/esclerodermia', referente: null,
    access: { t: 'Color Atlas 9e · S14 Autoimmune/Rheumatic', url: ca(275943310) }, qbankly: null, promir: { t: 'Cap 3 §1 + §5.2', url: pm(PM_CAP.c3) }, extra: null },
  { d: 46, fecha: '2026-11-06', bloque: B.H, bKey: 'H', tier: 'ALTA', sub: 'Vasculitis, paniculitis (eritema nodoso), neutrofílicas (Sweet, PG)', referente: null,
    access: { t: 'Color Atlas 9e · S7 Neutrophil-Mediated', url: ca(275942174) }, qbankly: { t: 'uWorld: Erythema nodosum (+PG 102)', url: qb(88), via: 'edge' }, promir: { t: 'Cap 3 §2 Paniculitis', url: pm(PM_CAP.c3) }, extra: null },
  { d: 47, fecha: '2026-11-10', bloque: B.H, bKey: 'H', tier: 'CRIT', sub: 'Farmacodermias graves: SJS/TEN, DRESS, AGEP (no errar)', referente: null,
    access: { t: 'Color Atlas 9e · S23 Adverse Drug Reactions', url: ca(275944593) }, qbankly: { t: 'uWorld: SJS/TEN (+DRESS 85, EM 87)', url: qb(111), via: 'edge' }, promir: { t: 'Cap 8 Toxicodermias', url: pm(PM_CAP.c8) }, extra: { t: 'CA S8: The Acutely Ill Patient', url: ca(275942269) } },
  { d: 48, fecha: '2026-11-12', bloque: B.H, bKey: 'H', tier: 'ALTA', sub: 'Piel y enfermedad sistémica: porfirias (PM 6,1%), paraneoplásicas, endocrino', referente: null,
    access: { t: 'Color Atlas 9e · S15 Endocrine/Metabolic', url: ca(275943857) }, qbankly: null, promir: { t: 'Cap 3 Sistémicas', url: pm(PM_CAP.c3) }, extra: { t: '🎬 Dermatosis paraneoplásicas (16:46) + CA S19', url: ca(275944194) } },
  { d: 49, fecha: '2026-11-16', bloque: B.H, bKey: 'H', tier: 'MED', sub: 'Fotodermatosis + fotoprotección', referente: null,
    access: { t: 'Color Atlas 9e · S10 Photosensitivity', url: ca(275942604) }, qbankly: null, promir: { t: 'Cap 8 §5 Fotosensibilidad', url: pm(PM_CAP.c8) }, extra: null },
  { d: 50, fecha: '2026-11-18', bloque: B.H, bKey: 'H', tier: 'ALTA', sub: 'Pigmentación (vitíligo, melasma, PIH) + piel de color (queloides, CCCA)', referente: null,
    access: { t: 'Color Atlas 9e · S13 Pigmentary Disorders', url: ca(275943230) }, qbankly: null, promir: { t: 'Cap 7 §3', url: pm(PM_CAP.c7) }, extra: { t: "Taylor & Kelly's 3e", url: book(3609) } },
  { d: 51, fecha: '2026-11-20', bloque: B.H, bKey: 'H', tier: 'ALTA', sub: 'Pelo y uñas: alopecias, tricoscopia, melanoniquia vs melanoma', referente: null,
    access: { t: 'Color Atlas 9e · S31 Hair Disorders', url: ca(275947046) }, qbankly: { t: 'uWorld: Alopecia', url: qb(72), via: 'edge' }, promir: { t: 'Cap 7 §3 Alopecias', url: pm(PM_CAP.c7) }, extra: { t: 'CA S32 Nail Apparatus + Hair&Nail book', url: ca(275947291) } },
  // ── CIERRE board ──
  { d: 52, fecha: '2026-11-24', bloque: B.Z, bKey: 'Z', tier: 'CRIT', sub: 'High-Yield Buzz Words + simulacro mixto (381Q Pictorial + DD Challenge)', referente: null,
    access: { t: 'Specialty Board Review Pictorial 4e (381 Q)', url: qa(3626) }, qbankly: { t: 'uWorld S1: 3 subtemas derma (78 Q)', url: QB_QBANKS, via: 'edge' }, promir: { t: '🎬 Videoclase resumen asignatura (3:18:11)', url: pm(PM_CAP.intro) }, extra: { t: 'DD Challenge (100 sets) + QOTW (50 Q)', url: cases(1616) } },
  // ── BLOQUE X · Estética estructural (capa del SPEC; anatomía antes que técnica) ──
  { d: 53, fecha: '2026-11-26', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Anatomía facial 3D: 5 capas, SMAS, espacios profundos', referente: 'Cotofana',
    access: { t: 'Baumann 3e · Cap 7 Facial Anatomy and Aging', url: `${MH}/content.aspx?bookid=3200&sectionid=266614877` }, qbankly: null, promir: null, extra: { t: 'Cotofana Anatomy (curso por disección)', url: 'https://cotofanaanatomy.com/' } },
  { d: 54, fecha: '2026-11-30', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Compartimentos grasos + ligamentos de retención + reabsorción ósea', referente: 'Cotofana',
    access: { t: 'Baumann 3e · Cap 3 Fat and the Subcutaneous Layer', url: `${MH}/content.aspx?bookid=3200&sectionid=266614442` }, qbankly: null, promir: null, extra: { t: 'de Maio PRS 2017: Upper Face guide', url: 'https://pubmed.ncbi.nlm.nih.gov/28746271/' } },
  { d: 55, fecha: '2026-12-02', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Arterias peligrosas + zonas seguras: nariz, glabela, temple (no errar)', referente: 'Cotofana',
    access: { t: 'Vascular Safe Zones (PAN 2022)', url: 'https://pubmed.ncbi.nlm.nih.gov/36469395/' }, qbankly: null, promir: null, extra: { t: 'Facial Safe Zones: Practical Guide (JDD 2019)', url: 'https://pubmed.ncbi.nlm.nih.gov/31524345/' } },
  { d: 56, fecha: '2026-12-04', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Análisis facial: tercios, cánones, MD ASA (H1-H5, 8 atributos)', referente: 'de Maio',
    access: { t: 'MD ASA (J Cosmet Dermatol 2021)', url: 'https://pubmed.ncbi.nlm.nih.gov/33977669/' }, qbankly: null, promir: null, extra: null },
  { d: 57, fecha: '2026-12-08', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Envejecimiento estructural: hueso → grasa → ligamento → piel', referente: 'de Maio',
    access: { t: 'MD Codes paper (open access PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8012343/' }, qbankly: null, promir: null, extra: { t: 'Baumann 3e · Cap 7 Facial Anatomy and Aging', url: `${MH}/content.aspx?bookid=3200&sectionid=266614877` } },
  { d: 58, fecha: '2026-12-10', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: "Reología del HA: G', cohesividad + bioestimuladores (CaHA/PLLA)", referente: 'de Maio / Carruthers',
    access: { t: 'Soft Tissue Augmentation 5e (Elsevier)', url: 'https://shop.elsevier.com/books/procedures-in-cosmetic-dermatology-soft-tissue-augmentation/carruthers/978-0-323-83075-1' }, qbankly: null, promir: null, extra: { t: 'Cosmeceuticals · Cap 26 Hyaluronic Acid', url: `${MH}/content.aspx?bookid=2812&sectionid=244978644` } },
  { d: 59, fecha: '2026-12-14', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'MD Codes I: fundación (mejilla Ck, temple T, lagrimal Tt)', referente: 'de Maio',
    access: { t: 'MD Codes paper (PMC8012343)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8012343/' }, qbankly: null, promir: null, extra: { t: 'MD Codes Institute', url: 'https://www.mdcodes.com/' } },
  { d: 60, fecha: '2026-12-16', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'MD Codes II + myomodulation (MD DYNA)', referente: 'de Maio',
    access: { t: 'Myomodulation (APS 2018)', url: 'https://pubmed.ncbi.nlm.nih.gov/29549406/' }, qbankly: null, promir: null, extra: { t: 'Procedural Dermatology · Cap 37 Fillers', url: `${MH}/content.aspx?bookid=2819&sectionid=242377676` } },
  { d: 61, fecha: '2026-12-18', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Toxina I: mecanismo, serotipos, unidades, tercio superior', referente: 'Carruthers',
    access: { t: 'Baumann 3e · Cap 23 Botulinum Toxins', url: `${MH}/content.aspx?bookid=3200&sectionid=266616475` }, qbankly: null, promir: null, extra: { t: 'Botulinum Toxin 5e (Elsevier)', url: 'https://shop.elsevier.com/books/procedures-in-cosmetic-dermatology-botulinum-toxin/carruthers/978-0-323-83116-1' } },
  { d: 62, fecha: '2026-12-22', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Toxina II: tercio inferior, Nefertiti, masetero, hiperhidrosis', referente: 'Carruthers',
    access: { t: 'Dermatologic Surgery · Cap 57 Neuromodulators', url: `${MH}/content.aspx?bookid=2811&sectionid=245227386` }, qbankly: null, promir: null, extra: { t: 'Botulinum Toxin 5e (Elsevier)', url: 'https://shop.elsevier.com/books/procedures-in-cosmetic-dermatology-botulinum-toxin/carruthers/978-0-323-83116-1' } },
  { d: 63, fecha: '2026-12-24', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Oclusión vascular + HDPH: recitar el protocolo completo (no errar)', referente: 'DeLorenzi',
    access: { t: 'HDPH Protocol (ASJ 2017)', url: 'https://pubmed.ncbi.nlm.nih.gov/28333326/' }, qbankly: null, promir: null, extra: { t: 'Complications of Injectable Fillers I (2013)', url: 'https://pubmed.ncbi.nlm.nih.gov/23636629/' } },
  { d: 64, fecha: '2026-12-28', bloque: B.X, bKey: 'X', tier: 'CRIT', sub: 'Ceguera por relleno: prevención + manejo inmediato + kit de emergencia', referente: 'Goodman/Magnusson 2020',
    access: { t: 'Consenso Embolic Visual Loss (ASJ 2020)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7427155/' }, qbankly: null, promir: null, extra: { t: 'Fillers Part 2: Vascular (ASJ 2014)', url: 'https://pubmed.ncbi.nlm.nih.gov/24692598/' } },
  { d: 65, fecha: '2026-12-30', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Fototermólisis selectiva: cromóforo → λ → pulso → enfriamiento', referente: 'Anderson',
    access: { t: 'Lasers in Dermatology · Cap 1 Fundamentals', url: `${MH}/content.aspx?bookid=2818&sectionid=240357100` }, qbankly: null, promir: null, extra: { t: 'Selective Photothermolysis (Science 1983)', url: 'https://pubmed.ncbi.nlm.nih.gov/6836297/' } },
  { d: 66, fecha: '2027-01-01', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Fraccional, RF, HIFU, criolipólisis + seguridad en fototipos altos', referente: 'Manstein/Anderson',
    access: { t: 'Dermatologic Surgery · Cap 71 Laser/Light en piel de color', url: `${MH}/content.aspx?bookid=2811&sectionid=245228834` }, qbankly: null, promir: null, extra: { t: 'Fractional Photothermolysis (LSM 2004)', url: 'https://pubmed.ncbi.nlm.nih.gov/15216537/' } },
  { d: 67, fecha: '2027-01-05', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Peelings químicos: superficial / medio / profundo, por fototipo', referente: 'Baumann',
    access: { t: 'Baumann 3e · Cap 24 Chemical Peels', url: `${MH}/content.aspx?bookid=3200&sectionid=266616672` }, qbankly: null, promir: null, extra: { t: 'Cosmetic Procedures in Primary Care · Cap 26 Chemical Peels', url: `${MH}/content.aspx?bookid=2953&sectionid=248412820` } },
  { d: 68, fecha: '2027-01-07', bloque: B.X, bKey: 'X', tier: 'ALTA', sub: 'Microneedling + PRP + cosmecéuticos / skincare basado en evidencia', referente: 'Baumann',
    access: { t: 'Baumann 3e · Cap 27 Microneedling and PRP', url: `${MH}/content.aspx?bookid=3200&sectionid=266617053` }, qbankly: null, promir: null, extra: { t: 'Cosmeceuticals and Cosmetic Ingredients (83 caps)', url: book(2812) } },

  { d: 69, fecha: '2027-01-11', bloque: B.Z, bKey: 'Z', tier: 'MED', sub: 'COLCHÓN 1 · Repaso libre: incorrects de QBanks + flashcards de los bloques más flojos', referente: null,
    access: { t: 'Tus notas + Guidebook (repaso)', url: book(2960) }, qbankly: { t: 'QBanks (repaso de incorrects)', url: QB_QBANKS, via: 'edge' }, promir: null, extra: null },
  { d: 70, fecha: '2027-01-13', bloque: B.Z, bKey: 'Z', tier: 'MED', sub: 'COLCHÓN 2 · Dermki/Anki segunda pasada + tabla de conceptos que aún fallan', referente: null,
    access: { t: 'Tus notas + Guidebook (repaso)', url: book(2960) }, qbankly: { t: 'QBanks (marcadas)', url: QB_QBANKS, via: 'edge' }, promir: null, extra: null },];

export function dermaDiaDe(fechaISO: string): DiaDerma | undefined { return DERMA_DIAS.find(x => x.fecha === fechaISO); }
export function dermaDiaPrevio(d: DiaDerma): DiaDerma | undefined { return DERMA_DIAS.find(x => x.d === d.d - 1); }
export function dermaVentana7(fromD: number): DiaDerma[] { return DERMA_DIAS.filter(x => x.d >= fromD && x.d < fromD + 7); }
export const DERMA_TIER_INFO: Record<DermaTier, { c: string; t: string }> = {
  CRIT: { c: '#E5484D', t: 'Crítico' }, ALTA: { c: '#F5A623', t: 'Alto' }, MED: { c: '#3FB984', t: 'Medio' },
};
/** URL ◆ Edge para links Qbankly (mismo patrón que UsmleTodayPlan). */
export const edgeUrl = (url: string) => `microsoft-edge:${url}`;
