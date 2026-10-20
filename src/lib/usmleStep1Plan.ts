/**
 * usmleStep1Plan.ts — Plan diario USMLE STEP 1, anclado a Google Calendar.
 *
 * Cruza TODO lo extraído: QBanks (uWorld/Amboss/PassMedicine, preguntas por
 * subtema), Librerías, Flashcards, Video Library (B&B Step 1/2 + Sketchy) y la
 * biblioteca High-Yield de Palmerton + lo que Palmerton dice de cada sistema.
 *
 * v6.03 (20-oct-2026): corrimiento rígido del D1 lun 19-oct → mié 21-oct (lun 19 y mar 20 sin estudio; Joseph: «corre dos días, no
 *  comprimas temas ni exámenes, alarga las fechas límite»). F1 = D1-D50 mié 21-oct → mié 30-dic-2026 (50 hábiles), misma regla de HITOS
 *  ANCLADOS: UWSA1 D1 mié 21-oct · NBME 25 D10 mar 3-nov · 26 D25 mar 24-nov · 27 D40 mar 15-dic · NBME 28 = D50 mié 30-dic (última
 *  sesión antes de la pausa; v5.20 D55). Van al tramo 2 (con su dOrig, T3-T10, jue 18 → mié 31-mar): Neuro v5.20 D50 (EM + meningitis +
 *  UNM + tumores SNC, T3), Heme/Onco D51-D54, D56, D57 (T4-T9; toda Heme/Onco empieza en el tramo 2 → diaInicio 104) y la bioestadística
 *  D79 (T10, d 110 → diaInicio de Psiquiatría = 110). D1 (mié 21-oct) = UWSA1 baseline; el contenido arranca el jue 22-oct (D2).
 * v6.02 (17-oct-2026): corrimiento rígido del D1 lun 12-oct → lun 19-oct (no se estudió del lun 12 al vie 16-oct). F1 = D1-D52 lun
 *  19-oct → mié 30-dic-2026 (52 hábiles) con los HITOS ANCLADOS en F1: UWSA1 D1 lun 19-oct · NBME 25 D10 vie 30-oct · 26 D25 vie 20-nov ·
 *  27 D40 vie 11-dic · NBME 28 = D52 mié 30-dic (última sesión antes de la pausa; v5.20 D55). Van al tramo 2 las últimas filas de temario:
 *  Heme/Onco v5.20 D52-D54, D56, D57 (T3-T7, jue 18 → mié 24-mar) y la bioestadística D79 (T8 lun 29-mar, d 108 → diaInicio de
 *  Psiquiatría = 108). D1 (lun 19-oct) = UWSA1 baseline; el contenido arranca el mar 20-oct (D2).
 * v6.01 (10-oct-2026): corrimiento rígido del D1 mié 7-oct → lun 12-oct (no se estudió el 7, 8 ni 9-oct). F1 = D1-D57 lun 12-oct →
 *  mié 30-dic-2026 (57 hábiles; C1/C2 consumidos; la bioestadística —ex-D79 v5.20, el D58 de la v6.00— pasa al tramo 2: T3 jue
 *  18-mar, d 103 → diaInicio de Psiquiatría = 103). D1 (lun 12-oct) = UWSA1 baseline; el contenido arranca el mar 13-oct (D2).
 *  Tramo 2, PAUSA y examen sin cambio (T1-T158 · examen target lun 27-sep-2027 PROVISIONAL).
 * v6.00 (6-oct-2026): REESTRUCTURACIÓN ANUAL (V6_ESPEC §B) — el plan día a día (usmleStep1Daily.ts, fuente de verdad) tiene DOS TRAMOS:
 *  F1 = D1-D60 mié 7-oct → mié 30-dic-2026 (L-V, 6h15/día: 05:00 ANKI AM · 07:15 repaso anclado · 08:15 PRE-TEST 10Q · 09:00-11:00
 *  DEEP PRIME · 11:00 30Q · 18:00 eval) · PAUSA 31-dic → 15-mar (ENCAPS) · tramo 2 = T1-T158 (d 101-258) mar 16-mar → sáb 25-sep-2027
 *  (F3 L-V 7h15 + F4 L-S con el SERUMS) · examen target lun 27-sep-2027 PROVISIONAL (ventana DJ-1: 31-ago / 27-sep / 25-oct).
 *  Los diaInicio = d de la 1.ª fila de cada sistema en DIAS_TODOS (F1: 1-60 · tramo 2: 101-258; Micro, Repro, MSK y Bioq solo
 *  existen en el tramo 2); los regenera update_diainicio.js. D1 (mié 7-oct) = UWSA1 baseline; el contenido arranca el jue 8-oct (D2).
 *  v5.20: plan de 95 días L-V (D1 mié 7-oct, corrimiento rígido +1 hábil por día no estudiado, examen en febrero) — sustituido.
 *
 * Prioridad: Step 1. Sistemas ordenados por peso real (preguntas uWorld) +
 * la serie High-Yield de Palmerton.
 */
export const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const QB = {
  qbanks: 'https://qbankly.app/qbanks',
  videos: 'https://qbankly.app/videos',
  flashcards: 'https://qbankly.app/flashcards',
  lib: (e: number, doc: number) => `https://qbankly.app/library?e=${e}&doc=${doc}`,
};

export const PLAN_META = {
  inicio: '2026-10-21', // v6.03 (20-oct): D1 = mié 21-oct (UWSA1 baseline) · F1 D1-D50 → mié 30-dic (D50 = NBME 28) · PAUSA → 15-mar · tramo 2 mar 16-mar → sáb 25-sep · examen lun 27-sep-2027 PROVISIONAL (v6.02: D1 = 19-oct, D1-D52 · v6.01: D1 = 12-oct, D1-D57 · v6.00: D1 = 7-oct, D1-D60)
  bloque: '05:00 ANKI AM · 07:15 repaso anclado · 08:15 PRE-TEST 10Q · 09:00 DEEP PRIME 2h · 11:00 30Q consolidación · 18:00 eval modo examen (6h15/día; F3 + 16:15 REENTRADA · F4 plantilla por turno del SERUMS)',
  metodo: 'Palmerton: ver vídeo High-Yield del sistema → leer (Library/First Aid) → Anki (FSRS) → preguntas en modo tutor → log de errores → APEX.',
  nota: 'Prioridad Step 1 (v6.03 · fin del corrimiento diario: un día perdido se paga con filas COLCHÓN). D1 = mié 21-oct = UWSA1 baseline · D2 jue 22-oct Fundamentos/Pathoma · D6 Cardiovascular (mié 28-oct) · F1 D1-D50 hasta el mié 30-dic = NBME 28 (los 5 hitos de F1 se quedan en F1; sin colchón F1: un día perdido pasa al tramo 2 el 31-dic) · Neuro cierra en F1 el D49 (mar 29-dic) salvo su última fila (EM + meningitis + UNM + tumores SNC), que va al tramo 2 (T3 jue 18-mar) con Heme/Onco entera (6 filas, T4-T9) y la bioestadística (T10 mié 31-mar) · PAUSA ENCAPS 31-dic → 15-mar · tramo 2 T1-T158 mar 16-mar → sáb 25-sep (Neuro 1 fila, Heme/Onco, bioestadística, Micro, Repro, MSK, Psiq, Bioq + reactivación + banco + taper) · examen target lun 27-sep-2027 PROVISIONAL.',
};

export interface SistemaUSMLE {
  sistema: string;
  /** preguntas uWorld del sistema (peso real) */
  uworldQ: number;
  tier: 'CORE' | 'HIGH' | 'MED';
  diaInicio: number; // d de la 1.ª fila del sistema en DIAS_TODOS (v6.03: F1 1-50 · tramo 2 101-258; D1 = mié 21-oct-2026 = UWSA1; lo regenera update_diainicio.js desde usmleStep1Daily.ts)
  /** subtemas uWorld top del sistema (nombre · nº preguntas) */
  uworldSubtemas: [string, number][];
  /** capítulo B&B Step 1 (nombre · nº vídeos · minutos) */
  bb1?: { ch: string; n: number; min: number };
  /** capítulo B&B Step 2 */
  bb2?: { ch: string; n: number; min: number };
  /** capítulo Sketchy relevante (nombre · nº vídeos) */
  sketchy?: { ch: string; n: number };
  /** vídeo(s) High-Yield de Palmerton del sistema */
  palmerton: { titulo: string; id: string; min?: number }[];
  /** qué dice Palmerton del sistema (consejo específico) */
  palmertonDice: string;
  /** librería uWorld (epub 1) — subject + primer docId para deep-link */
  lib?: { subject: string; doc: number };
  flashDeck: string; // deck de flashcards (uWorld Step 1 FlashCards · subject)
}

/** Orden Step 1 por rentabilidad (preguntas uWorld) + serie Palmerton. */
export const SISTEMAS: SistemaUSMLE[] = [
  {
    sistema: 'Cardiovascular', uworldQ: 413, tier: 'CORE', diaInicio: 6,
    uworldSubtemas: [['Normal structure & function', 55], ['Myopericardial diseases', 52], ['Cardiac arrhythmias', 50], ['Coronary heart disease', 47], ['Valvular heart diseases', 46], ['Heart failure and shock', 44], ['Aortic & peripheral artery dz', 37], ['Congenital heart disease', 32], ['Hypertension', 24]],
    bb1: { ch: 'Cardiology', n: 40, min: 818 }, bb2: { ch: 'Cardiology', n: 19, min: 405 },
    sketchy: { ch: 'Pharmacology (CV drugs) + Pathophysiology', n: 0 },
    palmerton: [{ titulo: 'High Yield Cardiology', id: 'hOGhcie47nM', min: 112 }, { titulo: 'High Yield Cardiology Part 2', id: 'nFfdaHLtxag', min: 84 }, { titulo: 'Cómo los 260+ dominan el cardio en el USMLE', id: 'TYe-wrDuFqg' }],
    palmertonDice: 'Cardio es el sistema #1: no memorices, entiende la fisiología (pre/afterload, curvas) primero — de ahí salen arritmias, IC y valvulopatías. Los 260+ dominan cardio razonando, no listando.',
    lib: { subject: 'Cardiology', doc: 0 }, flashDeck: 'Cardiovascular',
  },
  {
    sistema: 'Respiratory / Pulmonary', uworldQ: 285, tier: 'CORE', diaInicio: 17,
    uworldSubtemas: [['Pulmonary infections', 62], ['Obstructive lung disease', 48], ['Critical care medicine', 40], ['Interstitial lung disease', 26], ['Normal structure & function', 25], ['Pulmonary vascular disease', 23]],
    bb1: { ch: 'Pulmonary', n: 30, min: 639 }, bb2: { ch: 'Pulmonary Critical Care', n: 0, min: 0 },
    palmerton: [{ titulo: 'High Yield Respiratory', id: 'HU3V0kftcqY', min: 90 }],
    palmertonDice: 'Respiratorio: ancla en PFTs (obstructivo vs restrictivo) y A-a gradient; casi todo se deduce de esos dos.',
    lib: { subject: 'Pulmonary & Critical Care', doc: 0 }, flashDeck: 'Pulmonary',
  },
  {
    sistema: 'Renal & Electrolytes', uworldQ: 280, tier: 'CORE', diaInicio: 23,
    uworldSubtemas: [['Glomerular diseases', 39], ['Fluid/electrolytes/acid-base', 38], ['Normal structure & function', 24], ['Acute kidney injury', 22], ['Nephrolithiasis & obstruction', 16]],
    bb1: { ch: 'Renal', n: 28, min: 515 }, bb2: { ch: 'Renal and Genitourinary', n: 0, min: 0 },
    palmerton: [{ titulo: 'High Yield Renal', id: 'zeM8dMiRsJQ', min: 95 }, { titulo: 'High Yield Renal Part 2', id: 'CIIMMIvrRso', min: 109 }],
    palmertonDice: 'Renal asusta pero es lógico: domina la nefrona (qué se mueve dónde) y el ácido-base por pasos; las glomerulonefritis caen por patrón.',
    lib: { subject: 'Nephrology', doc: 0 }, flashDeck: 'Renal',
  },
  {
    sistema: 'Gastrointestinal', uworldQ: 263, tier: 'CORE', diaInicio: 30,
    uworldSubtemas: [['Intestinal & colorectal disorders', 66], ['Hepatic disorders', 59], ['Gastroesophageal disorders', 45], ['Tumors of the GI tract', 27], ['Pancreatic disorders', 17], ['Biliary tract disorders', 17]],
    bb1: { ch: 'Gastroenterology', n: 28, min: 533 }, bb2: { ch: 'Gastroenterology', n: 24, min: 455 },
    palmerton: [{ titulo: 'High Yield GI', id: '8gfhX1aR9-A', min: 164 }, { titulo: 'High Yield GI Part 2', id: 'E2sE4E6s9B8', min: 111 }],
    palmertonDice: 'GI: separa hígado (LFTs + cirrosis/hepatitis) del tubo digestivo; los LFTs son la pregunta de oro.',
    lib: { subject: 'Gastroenterology', doc: 0 }, flashDeck: 'Gastrointestinal',
  },
  {
    sistema: 'Endocrine', uworldQ: 199, tier: 'CORE', diaInicio: 37,
    uworldSubtemas: [['Diabetes mellitus', 49], ['Thyroid disorders', 34], ['Endocrine tumors', 26], ['Reproductive endocrinology', 21], ['Hypothalamus & pituitary', 13], ['Adrenal disorders', 11]],
    bb1: { ch: 'Endocrinology', n: 30, min: 688 }, bb2: { ch: 'Endocrinology', n: 16, min: 305 },
    palmerton: [{ titulo: 'High Yield Endocrinology', id: 'oQ8PSvInTgM', min: 125 }],
    palmertonDice: 'Endocrino = ejes (hipotálamo→hipófisis→glándula) y feedback. Si dominas el eje, primario vs secundario sale solo.',
    lib: { subject: 'Endocrinology', doc: 0 }, flashDeck: 'Endocrine',
  },
  {
    sistema: 'Nervous System', uworldQ: 397, tier: 'CORE', diaInicio: 43,
    uworldSubtemas: [['Disorders of peripheral nerves/muscles', 69], ['Cerebrovascular disease', 62], ['Normal structure & function', 48], ['Neurodegenerative & dementias', 34], ['Congenital/developmental', 34], ['CNS infections', 30]],
    bb1: { ch: 'Neurology', n: 50, min: 869 }, bb2: { ch: 'Neurology', n: 0, min: 0 },
    palmerton: [{ titulo: 'High Yield Neuro', id: 'YIwfdc7E8TU', min: 74 }, { titulo: 'High Yield Neuro Part 2', id: '52xHDZJy2sw', min: 99 }],
    palmertonDice: 'Neuro: neuroanatomía localizadora primero (¿dónde está la lesión?). Todo lo demás (ictus, médula) se cuelga de ahí.',
    lib: { subject: 'Neurology', doc: 0 }, flashDeck: 'Nervous System',
  },
  {
    sistema: 'Hematology & Oncology', uworldQ: 277, tier: 'HIGH', diaInicio: 104,
    uworldSubtemas: [['Red blood cell disorders', 85], ['White blood cell disorders', 48], ['Hemostasis & thrombosis', 36], ['Principles of oncology', 22], ['Platelet disorders', 15]],
    bb1: { ch: 'Hematology', n: 29, min: 498 }, bb2: { ch: 'Hematology and Oncology', n: 20, min: 390 },
    palmerton: [{ titulo: 'High Yield Hematology', id: 'zFGfP4d_aOc', min: 40 }],
    palmertonDice: 'Heme: las anemias por tamaño (micro/normo/macro) y el frotis; coagulación = vía intrínseca/extrínseca + PT/PTT.',
    lib: { subject: 'Hematology & Oncology', doc: 0 }, flashDeck: 'Hematology & Oncology',
  },
  {
    sistema: 'Reproductive', uworldQ: 169, tier: 'HIGH', diaInicio: 118,
    uworldSubtemas: [['Male reproductive disorders', 48], ['Female genital tract tumors', 26], ['Pregnancy & childbirth disorders', 44], ['Reproductive endocrinology', 21], ['GU infections', 13]],
    bb1: { ch: 'Reproductive', n: 37, min: 440 }, bb2: { ch: 'Obstetrics and Gynecology', n: 34, min: 569 },
    palmerton: [{ titulo: 'High Yield OB/GYN Review', id: '4D7MO0TR2fY', min: 104 }, { titulo: 'High Yield OB/GYN Review Part 2', id: 'nYtSNyXh_Ww', min: 91 }],
    palmertonDice: 'Repro: domina el ciclo menstrual (hormonas) — de ahí salen amenorreas, SOP y anticoncepción.',
    lib: { subject: 'Gynecology', doc: 0 }, flashDeck: 'Reproductive',
  },
  {
    sistema: 'Musculoskeletal / Rheum', uworldQ: 163, tier: 'HIGH', diaInicio: 123,
    uworldSubtemas: [['Arthritis & spondyloarthropathies', 38], ['Bone/joint injuries & infections', 34], ['Normal structure & function', 31], ['Autoimmune & vasculitides', 25], ['Metabolic bone disorders', 14]],
    bb1: { ch: 'Musculoskeletal', n: 20, min: 369 }, bb2: { ch: 'Musculoskeletal', n: 9, min: 165 },
    palmerton: [],
    palmertonDice: 'MSK/Reuma: separa artritis inflamatoria vs no; los autoanticuerpos (ANA, anti-CCP, ANCA) son las preguntas de patrón.',
    lib: { subject: 'Rheumatology/Orthopedics', doc: 0 }, flashDeck: 'Rheumatology/Orthopedics',
  },
  {
    sistema: 'Psychiatry & Behavioral', uworldQ: 179, tier: 'HIGH', diaInicio: 110,
    uworldSubtemas: [['Mood disorders', 33], ['Psychotic disorders', 26], ['Substance use disorders', 25], ['Anxiety/trauma-related', 25], ['Personality/Somatoform', 9]],
    bb1: { ch: 'Psychiatry', n: 21, min: 271 }, bb2: { ch: 'Psychiatry', n: 14, min: 198 },
    palmerton: [],
    palmertonDice: 'Psiquiatría: criterios DSM (tiempo + síntomas) y el árbol de fármacos. Alta densidad de preguntas fáciles si sabes criterios.',
    lib: { subject: 'Psychiatry', doc: 0 }, flashDeck: 'Behavioral science',
  },
  {
    sistema: 'Immunology', uworldQ: 108, tier: 'HIGH', diaInicio: 4,
    uworldSubtemas: [['Principles of immunology', 25], ['Immune deficiencies', 23], ['Miscellaneous', 21], ['Anaphylaxis & allergic reactions', 19], ['Autoimmune diseases', 13]],
    bb1: { ch: 'Immunology', n: 19, min: 362 },
    sketchy: { ch: 'Immunology', n: 23 },
    palmerton: [{ titulo: 'High Yield Immunology', id: 'Nfp3hs490wM', min: 41 }],
    palmertonDice: 'Inmuno: hipersensibilidades I-IV y las inmunodeficiencias por patrón de infección. Sketchy Immuno ayuda a fijar.',
    flashDeck: 'Immunology',
  },
  {
    sistema: 'Infectious Disease / Micro', uworldQ: 271, tier: 'HIGH', diaInicio: 111,
    uworldSubtemas: [['Bacterial infections', 112], ['Viral infections', 43], ['HIV & STIs', 42], ['Parasitic & helminthic', 26], ['Antimicrobial drugs', 23], ['Fungal infections', 12]],
    bb1: { ch: 'Infectious Disease', n: 36, min: 699 }, bb2: { ch: 'Infectious Disease', n: 16, min: 306 },
    sketchy: { ch: 'Microbiology', n: 44 },
    palmerton: [],
    palmertonDice: 'Micro/ID es PURO Sketchy — los 44 vídeos de Sketchy Micro fijan bichos/antibióticos por mnemotecnia visual; luego preguntas.',
    lib: { subject: 'Infectious Diseases', doc: 0 }, flashDeck: 'Microbiology',
  },
  {
    sistema: 'Biochemistry', uworldQ: 159, tier: 'MED', diaInicio: 129,
    uworldSubtemas: [['Bioenergetics & carbohydrate metabolism', 21], ['Amino acids/proteins/enzymes', 20], ['Cell & molecular biology', 17], ['Lipid metabolism', 3]],
    bb1: { ch: 'Biochemistry', n: 28, min: 549 },
    sketchy: { ch: 'Biochemistry', n: 86 },
    palmerton: [{ titulo: 'High Yield Biochemistry', id: 'FcXG3ux0a1I', min: 103 }],
    palmertonDice: 'Bioquímica: enfócate en errores innatos (presentación clínica) y vitaminas; las rutas completas dan poco ROI — ve lo high-yield.',
    flashDeck: 'Biochemistry',
  },
  {
    sistema: 'Pharmacology (transversal)', uworldQ: 550, tier: 'HIGH', diaInicio: 129,
    uworldSubtemas: [['Pharmacodynamics & receptors', 5], ['Pharmacokinetics', 14], ['Drug metabolism & toxicity', 18], ['(se estudia integrada en cada sistema)', 0]],
    bb1: { ch: 'Basic Pharmacology', n: 5, min: 86 },
    sketchy: { ch: 'Pharmacology', n: 130 },
    palmerton: [{ titulo: 'High Yield Pharmacology', id: 'J2KWVQ67H2U', min: 70 }, { titulo: 'High Yield Pharmacology Part 2', id: 'PvKp25ku0po', min: 70 }],
    palmertonDice: 'Farmacología NO se estudia sola: cae integrada en cada sistema. Sketchy Pharma (130 vídeos) + el fármaco al final de cada bloque.',
    flashDeck: 'Pharmacology',
  },
];

/** LEGADO (sin uso en la UI): unidades del arranque de un plan anterior (empezaba por Cardio). El día a día
 *  real es DIAS de usmleStep1Daily.ts (D1 UWSA1, D2-3 Fundamentos/Pathoma, D4-5 Inmuno, D6+ Cardio). Se conserva por compat.
 *  v6.01 (10-oct-2026): LEGADO v5 EXPLÍCITO — sus fechas (mié 7 → mar 13-oct) son el calendario v5.20 = v6.00 (D1 mié 7-oct) y NO se
 *  re-fechan con el corrimiento (D1 v6.01 = lun 12-oct = UWSA1, no Cardio): nadie importa UNIDADES ni unidadDe (grep 10-oct); para la fila
 *  real de una fecha usar usmleStep1Daily.ts. verificar_v6.js salta estas filas «{ dia: n». */
export interface UnidadDia { dia: number; fecha: string; sistema: string; foco: string; bbVideo: { titulo: string; min: number }; uworld: string; sketchy?: string; palmerton?: { titulo: string; id: string }; flash: string; }
export const UNIDADES: UnidadDia[] = [
  { dia: 1, fecha: '2026-10-07', sistema: 'Cardiovascular', foco: 'Anatomía + Fisiología cardíaca (la base de todo cardio)', bbVideo: { titulo: 'B&B Step 1 · 01 - Cardiac Anatomy', min: 15 }, uworld: 'uWorld · Cardiovascular → Normal structure & function (pre-test 2-3Q)', sketchy: 'Sketchy Anatomy → Heart (Chambers / Coronary circulation)', palmerton: { titulo: 'Palmerton · Cómo los 260+ dominan el cardio', id: 'TYe-wrDuFqg' }, flash: 'uWorld Step 1 FlashCards → Cardiovascular (mazo del día)' },
  { dia: 2, fecha: '2026-10-08', sistema: 'Cardiovascular', foco: 'Fisiología cardíaca II (PV loops, Wiggers, Starling)', bbVideo: { titulo: 'B&B Step 1 · 02 - Cardiac Physiology', min: 27 }, uworld: 'uWorld · Cardiovascular → Normal structure & function (10Q)', flash: 'FlashCards → Cardiovascular' },
  { dia: 3, fecha: '2026-10-09', sistema: 'Cardiovascular', foco: 'Hemodinámica + regulación de la PA', bbVideo: { titulo: 'B&B Step 1 · 04-05 Blood Flow / BP Regulation', min: 32 }, uworld: 'uWorld · Cardiovascular → Hypertension (10Q)', flash: 'FlashCards → Cardiovascular' },
  { dia: 4, fecha: '2026-10-12', sistema: 'Cardiovascular', foco: 'Cardiopatía isquémica (atero → SCA)', bbVideo: { titulo: 'B&B Step 1 · Cardiac Ischemia (01-06)', min: 64 }, uworld: 'uWorld · Cardiovascular → Coronary heart disease (10Q)', palmerton: { titulo: 'Palmerton · High Yield Cardiology', id: 'hOGhcie47nM' }, flash: 'FlashCards → Cardiovascular' },
  { dia: 5, fecha: '2026-10-13', sistema: 'Cardiovascular', foco: 'Arritmias (potenciales de acción → taqui/bradi)', bbVideo: { titulo: 'B&B Step 1 · Arrhythmias (01-08)', min: 90 }, uworld: 'uWorld · Cardiovascular → Cardiac arrhythmias (10Q)', flash: 'FlashCards → Cardiovascular' },
];

/** Devuelve la unidad del día según la fecha (YYYY-MM-DD). null si fuera de rango. LEGADO v5 (fechas v5.20 = v6.00; ver UNIDADES). */
export function unidadDe(fechaISO: string): UnidadDia | undefined {
  return UNIDADES.find((u) => u.fecha === fechaISO);
}
export function diaDesdeInicio(fechaISO: string): number {
  const a = new Date(PLAN_META.inicio + 'T12:00:00Z');
  const b = new Date(fechaISO + 'T12:00:00Z');
  let dias = Math.floor((b.getTime() - a.getTime()) / 86400000) + 1;
  // v3 (13-jun): TODOS los domingos son libres → no cuentan como días de plan
  for (let t = new Date(a); t <= b; t.setUTCDate(t.getUTCDate() + 1)) {
    if (t.getUTCDay() === 0) dias--;
  }
  return dias;
}
