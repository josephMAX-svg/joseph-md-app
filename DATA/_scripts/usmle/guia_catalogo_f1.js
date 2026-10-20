/**
 * guia_catalogo_f1.js — CATÁLOGO de mapeo D# de F1 → recursos concretos para la guía «qué · cuánto · cómo» del USMLE
 * (lo consume gen_usmle_guia.js). Editable a mano: cada cambio se regenera con `node DATA/_scripts/usmle/gen_usmle_guia.js`.
 *
 * Fuentes (todas verificadas el dom 18-oct-2026, sesión de Joseph, solo lectura):
 *   · bb  = id de vídeo de DATA/USMLE/qbankly_bb_step1_videos.tsv (B&B Step 1 en la Video Library de Qbankly; duración real).
 *   · uw  = systemId de DATA/USMLE/qbankly_uworld_step1_filtros.tsv (Test Composer de «uWorld - USMLE Step 1»; nº real de preguntas).
 *     uwSub = [subjectId, [systemIds]] para filtros Subject ∩ System (matriz real en qbankly_uworld_step1_matriz.tsv).
 *   · mh  = systemId de DATA/USMLE/qbankly_mehlman_step1_sistemas.tsv (respaldo «Mehlman - Step 1 QBank - 2026» cuando uWorld no alcanza).
 *   · lib = [epub, doc] de la Library de Qbankly (1 = uWorld Medical Library · 3 = PassMedicine USMLE Step 1 Textbook); índice en
 *     STUDY_HUB/_scrape/qbankly_libs_full.json; enlace qbankly.app/library?e=<epub>&doc=<doc> (verificado e=1 doc=11 y e=3 doc=275).
 *     Los 2 primeros son el NÚCLEO de la lectura; el resto, «si sobra tiempo».
 *   · fa  = capítulo › sección de First Aid 2026 (no hay PDF ni enlace en el repo: SOLO nombre de sección, nunca páginas).
 *   · pathoma = capítulo de Pathoma (Fundamentals of Pathology) — solo con cuenta (pathoma.com: Free = 6 vídeos de prueba 1 mes · Pro
 *     desde US$84,95 con libro en papel, sin PDF; verificado 18-oct) → sin cuenta, la lectura de la Library lo cubre.
 *   · nota = AVISO VISIBLE cuando el mapeo etiqueta-del-plan → catálogo NO es exacto (se explica qué se tomó y por qué).
 * v6.02c (18-oct-2026, E1): nuevo.
 */
'use strict';

/** Pathoma: nº de capítulo → tema (nombre corto en español; el título exacto es el del índice del libro). */
const PATHOMA = {
  1: 'adaptaciones del crecimiento, lesión y muerte celular', 2: 'inflamación, trastornos inflamatorios y reparación', 3: 'principios de neoplasia',
  5: 'trastornos de los hematíes', 7: 'patología vascular', 8: 'patología cardíaca', 9: 'patología respiratoria', 10: 'patología gastrointestinal',
  11: 'páncreas exocrino, vesícula e hígado', 12: 'riñón y vías urinarias', 15: 'patología endocrina', 17: 'sistema nervioso central',
};

/** Palmerton (YouTube): título actual y duración real (lengthSeconds leído el 18-oct-2026; v6.03, 20-oct: los 4 «Part 2» con el título EXACTO de YouTube, verificado por oEmbed). */
const PALM = {
  BOtQJeFE_rc: { t: 'The ONLY Video You Need to Pass the USMLE Step 1 in 2026', s: 2293 },
  Te5RnxeG_Gg: { t: 'Anki Almost Broke Me at Stanford Med. 8 Changes Fixed It. (en la app: «5X Your Anki Efficiency (FSRS)»)', s: 1847 },
  Nfp3hs490wM: { t: 'High Yield Immunology for Shelf Exams & Step 1 + Step 2 CK', s: 2486 },
  hOGhcie47nM: { t: 'High Yield Cardiology for Shelf Exam & Step 1 + Step 2 CK', s: 6719 },
  nFfdaHLtxag: { t: 'High Yield Cardiology Part 2 | Shelf Exam, Step 1 & Step 2 CK', s: 5043 },
  HU3V0kftcqY: { t: 'High Yield Respiratory for Shelf Exams & Step 1 + Step 2 CK', s: 5455 },
  zeM8dMiRsJQ: { t: 'High Yield Renal for Shelf Exams & Step 1 + Step 2 CK', s: 5722 },
  CIIMMIvrRso: { t: 'High Yield Renal for Shelf Exams & Step 1 + Step 2 CK (Part 2)', s: 6598 },
  '8gfhX1aR9-A': { t: 'High Yield GI for Shelf Exam & Step 1 + Step 2 CK', s: 9898 },
  E2sE4E6s9B8: { t: 'High Yield GI for Shelf Exam & Step 1 + Step 2 CK (Part 2)', s: 6687 },
  oQ8PSvInTgM: { t: 'High Yield Endocrinology for Shelf Exams & Step 1 + Step 2 CK', s: 7519 },
  YIwfdc7E8TU: { t: 'High Yield Neuro for Shelf Exams & Step 1 + Step 2 CK', s: 4456 },
  '52xHDZJy2sw': { t: 'High Yield Neuro Part 2 - Shelf Exams & Step 1 + Step 2 CK', s: 5973 },
  zFGfP4d_aOc: { t: 'High Yield Hematology for Shelf Exams & Step 1 + Step 2 CK', s: 2370 },
};

/** Mapeo por D# (filas de contenido de F1; los hitos D1/D10/D25/D40/D52 no llevan mapeo). */
const MAPA = {
  2: { bb: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89], uw: [1110, 1111], mh: [48, 204], lib: [[3, 275], [3, 988], [3, 32], [3, 309]], fa: 'Pathology › Cellular injury', pathoma: [1, 2],
    nota: '«Cell Injury + Inflammation» = Pathology › General Topics 01-10 (es un grupo, no un título). uWorld solo tiene 8Q de este subtema (Cellular pathology 6 + Inflammation and repair 2) → la consolidación va con Mehlman (respaldo).' },
  3: { bb: [90], uw: [1112, 1072], mh: [204, 46, 79], lib: [[3, 32], [3, 936], [3, 1352], [3, 309], [3, 766], [3, 1015], [3, 258], [3, 1350]], fa: 'Pathology › Inflammation + Pathology › Neoplasia', pathoma: [2, 3],
    nota: '«Neoplasia 01-04» NO existe en B&B Step 1 (Qbankly): solo hay 1 vídeo, Pathology › General Topics › 11 - Neoplasia (24:01). El resto del día lo ocupan los vídeos de inflamación que vienen del D2.' },
  4: { bb: [269, 270, 271, 272, 273], uw: [1004], mh: [60, 65, 66, 63], lib: [[1, 11], [3, 705], [3, 704], [3, 707], [3, 354], [3, 658]], fa: 'Immunology › Lymphoid structures · Cellular components · Immune responses' },
  5: { bb: [274, 275, 276], uw: [1002, 1001, 1000, 1005], mh: [336, 614, 186, 383], lib: [[1, 9], [3, 1069], [1, 11], [1, 15], [3, 681], [3, 1182], [3, 353]], fa: 'Immunology › Immune responses (hipersensibilidad · inmunodeficiencias · rechazo de trasplante)', pathoma: [2] },
  6: { bb: [12, 13], uw: [1025], mh: [127, 230], lib: [[3, 261], [1, 31], [3, 1240], [3, 375]], fa: 'Cardiovascular › Anatomy + Physiology' },
  7: { bb: [15, 16, 1, 2, 3, 4], uw: [1022], mh: [121], lib: [[1, 36], [1, 60], [3, 1129], [3, 683]], fa: 'Cardiovascular › Physiology + Pathology (hypertension)',
    nota: '«04-05 Blood Flow / BP Regulation + Hypertension» → 04 Blood Flow Mechanics + 05 Regulation of Blood Pressure + la sección Hypertension completa (01 Hypertension · 02 Secondary · 03-04 Antihypertensives I-II: no aparecen en ningún otro día de F1).' },
  8: { bb: [17, 18, 19, 20], uw: [1025], mh: [127, 230], lib: [[1, 31], [3, 1240], [3, 739], [3, 618]], fa: 'Cardiovascular › Physiology' },
  9: { bb: [29, 30, 27, 28], uw: [1017], mh: [231, 82], lib: [[3, 260], [3, 1292], [1, 29], [3, 781]], fa: 'Cardiovascular › Physiology (electrofisiología, ECG)',
    nota: '«Arrhythmias 01-02» + la sección EKGs (01 EKG Basics · 02 High Yield EKGs): el subtema pide ECG y esos vídeos no están en otro día de F1.' },
  11: { bb: [31, 32, 33], uw: [1017], mh: [231, 82], lib: [[1, 26], [1, 54], [1, 69], [1, 68]], fa: 'Cardiovascular › Pathology (arritmias)' },
  12: { bb: [34, 35, 36], uw: [1018], uwSub: [118, [1017]], mh: [293], lib: [[3, 115], [3, 83], [3, 428], [3, 57]], fa: 'Cardiovascular › Pharmacology',
    nota: 'Los «fármacos autonómicos CV» del subtema están en B&B › Neurology › Autonomic Nervous System (D46). uWorld «Cardiovascular drugs» tiene 16Q → se suma Subject Pharmacology ∩ Cardiac arrhythmias (23Q).' },
  13: { bb: [21, 22, 23], uw: [1020], mh: [235], lib: [[3, 151], [1, 34], [1, 53], [3, 1230]], fa: 'Cardiovascular › Pathology (aterosclerosis, cardiopatía isquémica)', pathoma: [7, 8] },
  14: { bb: [24, 25, 26], uw: [1020], mh: [235], lib: [[1, 19], [1, 47]], fa: 'Cardiovascular › Pathology (SCA, complicaciones del IAM)' },
  15: { bb: [6, 39, 40, 41, 42, 43], uw: [1021], mh: [218], lib: [[1, 38], [3, 617], [3, 308], [3, 1194]], fa: 'Cardiovascular › Pathology + Pharmacology (insuficiencia cardíaca, shock)', pathoma: [8],
    nota: '«Other CV: Shock + HF» → Other Cardiovascular Topics › 02 Shock + la sección Heart Failure completa (01-05).' },
  16: { bb: [5, 37, 38, 11, 10, 7, 44, 45, 46, 47], uw: [1026, 1024, 1019], mh: [217, 89, 102, 291], lib: [[1, 25], [1, 48], [1, 28], [1, 43], [1, 21], [1, 52]], fa: 'Cardiovascular › Pathology + Embryology (valvulopatías, miocardiopatías, pericardio, congénitas)', pathoma: [8],
    nota: 'Día FUSIONADO (v5.20): «Valve Disease + HCM/Pericardial + Developing Heart» y el subtema pide además soplos y endocarditis → + Cardiac Auscultation (Heart Murmurs, Heart Sounds) + Infective Endocarditis. ≈4 h de vídeo: el reparto sigue en los días siguientes (07:15 «vídeo pendiente»). uWorld: Valvular + Myopericardial + Congenital.' },
  17: { bb: [186, 187, 188], uw: [1136], mh: [96], lib: [[3, 1135], [3, 1134], [3, 959], [3, 1097]], fa: 'Respiratory › Physiology' },
  18: { bb: [191, 192, 193, 194], uw: [1136], mh: [96], lib: [[3, 1133], [3, 369], [3, 961]], fa: 'Respiratory › Physiology (V/Q, gradiente A-a, hipoxemia)' },
  19: { bb: [197, 198, 199, 201], uw: [1137], mh: [97], lib: [[1, 711], [1, 706], [1, 732], [1, 705]], fa: 'Respiratory › Pathology + Pharmacology (obstructivas)',
    nota: '«PFTs + COPD + Asthma» + 05 Treatment of COPD and Asthma (el subtema pide broncodilatadores).' },
  20: { bb: [200, 210], uw: [1133], mh: [84], lib: [[1, 722], [1, 736], [1, 703], [1, 738]], fa: 'Respiratory › Pathology (restrictivas, intersticiales, ocupacionales)', pathoma: [9],
    nota: '«Restrictive/ILD» → 04 Restrictive Lung Disease + Other Pulmonary Topics › 09 Sarcoidosis (intersticial; no está en otro día de F1).' },
  21: { bb: [202, 203, 208, 209], uw: [1138], mh: [287], lib: [[1, 730], [1, 747]], fa: 'Respiratory › Pathology (neumonía, TBC) + Microbiology' },
  22: { bb: [211, 205, 190], uw: [1139, 1134, 1132], mh: [362, 120, 103, 379, 157], lib: [[1, 749], [1, 733], [1, 702], [3, 795]], fa: 'Respiratory › Pathology (TEP, HTP, SDRA, cáncer de pulmón)', pathoma: [9],
    nota: '«DVT/PE + Lung Cancer» + Embryology, Anatomy and Physiology › 08 Pulmonary Hypertension (el subtema pide HTP). uWorld: Pulmonary vascular + Lung cancer + Critical care (SDRA).' },
  23: { bb: [157, 158, 159], uw: [1152], mh: [88], lib: [[3, 1123], [3, 818]], fa: 'Renal › Physiology' },
  24: { bb: [179], uw: [1147], uwSub: [118, [1147]], mh: [122, 105], lib: [[1, 478], [3, 783], [3, 1294], [3, 1058]], fa: 'Renal › Physiology + Pharmacology (diuréticos)',
    nota: '«Tubular Transport» no existe como vídeo en B&B Step 1 (el transporte tubular está en 05 Nephron Physiology, del D23) → hoy solo Other Renal Topics › 03 Diuretics. uWorld: Subject Pharmacology ∩ Fluid, electrolytes and acid-base = 16Q.' },
  26: { bb: [168, 169, 170], uw: [1147, 1146], mh: [122, 105], lib: [[1, 482], [1, 492], [1, 498], [1, 481], [1, 143]], fa: 'Renal › Physiology + Pathology (electrolitos)' },
  27: { bb: [162, 163, 164, 165, 166, 167], uw: [1147], mh: [122, 144, 502], lib: [[1, 471], [1, 495], [3, 840], [3, 841]], fa: 'Renal › Physiology (ácido-base)' },
  28: { bb: [171, 172, 173, 174], uw: [1148], mh: [209, 64], lib: [[1, 479], [1, 486], [1, 488]], fa: 'Renal › Pathology (glomerulopatías)', pathoma: [12],
    nota: '«Nephritic + Nephrotic Syndrome» + 01 Glomerulonephritis Principles y 04 MPGN (misma sección; no aparecen en otro día de F1).' },
  29: { bb: [176, 180, 178], uw: [1141, 1143, 1151, 1145], mh: [115, 131, 19], lib: [[1, 472], [1, 475], [1, 487], [1, 489]], fa: 'Renal › Pathology (AKI, ERC, litiasis, quistes)',
    nota: '«Renal Failure + Kidney Stones» + 02 Cystic Kidney Disease (el subtema pide poliquistosis). uWorld: AKI + CKD + Nephrolithiasis + Cystic.' },
  30: { bb: [315, 316, 317], uw: [1058], mh: [126], lib: [[3, 559], [3, 192]], fa: 'Gastrointestinal › Physiology' },
  31: { bb: [325, 332], uw: [1054], mh: [94], lib: [[1, 203], [1, 232], [1, 178], [3, 553]], fa: 'Gastrointestinal › Pathology (esófago, estómago)' },
  32: { bb: [333, 337], uw: [1056], mh: [3, 83], lib: [[1, 185], [1, 217]], fa: 'Gastrointestinal › Pathology (malabsorción, EII)', pathoma: [10] },
  33: { bb: [338, 336], uw: [1060], mh: [143], lib: [[1, 190], [1, 193], [3, 343]], fa: 'Gastrointestinal › Pathology (colon)', pathoma: [10],
    nota: '«Colon Cancer + Polyps» → 14 Colon Cancer + 12 Intestinal Disorders (el subtema pide diverticular + isquemia).' },
  34: { bb: [326, 314], uw: [1055], mh: [92], lib: [[1, 199], [1, 213], [1, 211], [1, 212]], fa: 'Gastrointestinal › Physiology + Pathology (bilirrubina, hepatitis)',
    nota: 'No hay vídeos «LFTs» ni «Hepatitis» en B&B Step 1 → Clinical Gastroenterology › 02 Liver Disease + GI Physiology › 02 Bilirubin.' },
  35: { bb: [327, 328, 329], uw: [1055], mh: [92], lib: [[1, 188], [1, 191], [1, 245], [1, 323], [3, 634]], fa: 'Gastrointestinal › Pathology (cirrosis, HCC, hereditarias)', pathoma: [11],
    nota: '«Cirrhosis + Complications» + 04 Liver Tumors y 05 Wilson\'s Disease and Hemochromatosis (el subtema pide HCC + hereditarias).' },
  36: { bb: [330, 331, 334, 335], uw: [1051, 1059], mh: [5, 61], lib: [[1, 202], [1, 230], [1, 228]], fa: 'Gastrointestinal › Pathology (vía biliar, páncreas)',
    nota: '«Bilirubin» ya se vio el D34 → hoy 06 Gallstones · 07 Biliary Disorders · 10 Acute Pancreatitis · 11 Chronic Pancreatitis & Pancreatic Cancer. uWorld: Biliary + Pancreatic disorders.' },
  37: { bb: [365, 370], uw: [1038], mh: [226], lib: [[3, 1021], [3, 695], [3, 1073], [3, 594]], fa: 'Endocrine › Physiology (hipotálamo-hipófisis)',
    nota: 'No hay vídeo «Hypothalamus-Pituitary Axes» → Endocrinology › Other Topics › 01 Pituitary Anatomy and Physiology + 06 Signaling Pathways.' },
  38: { bb: [341, 342, 343, 344, 345], uw: [1043], mh: [243], lib: [[1, 172], [1, 152], [1, 153], [1, 173], [1, 170]], fa: 'Endocrine › Physiology + Pathology (tiroides)',
    nota: '«Thyroid 01-04» + 05 Thyroid Cancer (el subtema pide Ca).' },
  39: { bb: [346, 347, 348, 349, 350, 351], uw: [1034], mh: [99], lib: [[1, 139], [1, 146], [1, 141], [1, 144], [1, 163]], fa: 'Endocrine › Pathology (suprarrenal)', pathoma: [15],
    nota: '«Adrenals 01-04» + 05 Adrenal Tumors y 06 Congenital Adrenal Hyperplasia (el subtema pide CAH + feocromocitoma). uWorld «Adrenal disorders» solo tiene 11Q → respaldo Mehlman.' },
  41: { bb: [354, 355, 356, 357], uw: [1036], mh: [415], lib: [[1, 175], [1, 148], [1, 155], [1, 158]], fa: 'Endocrine › Pathology + Pharmacology (diabetes)' },
  42: { bb: [366, 367, 368, 369], uw: [1037], mh: [87], lib: [[1, 162], [1, 143], [1, 157], [1, 164]], fa: 'Endocrine › Pathology (calcio/PTH, MEN, hipófisis)',
    nota: '«Other 01-05 Pituitary/PTH/MEN» → 01 Pituitary Anatomy and Physiology ya se vio el D37: hoy 02-05.' },
  43: { bb: [97, 98], uw: [1102], mh: [150], lib: [[1, 540], [3, 1220], [3, 1218]], fa: 'Neurology and Special Senses › Anatomy and Physiology',
    nota: '«Nervous System Structures 01-05» se solapa con el D44 (03 Spinal Cord Syndromes) y el D45 (04 Brainstem · 05 Rule of 4s) → hoy 01 Cerebral Cortex + 02 Spinal Cord.' },
  44: { bb: [99], uw: [1102, 1105], mh: [150, 95], lib: [[1, 541], [3, 1219]], fa: 'Neurology and Special Senses › Anatomy and Physiology (médula)' },
  45: { bb: [100, 101, 102, 103], uw: [1102], mh: [150], lib: [[3, 379], [3, 1114], [3, 515], [3, 1337]], fa: 'Neurology and Special Senses › Anatomy and Physiology (tronco, pares craneales)',
    nota: '«Cranial Nerves I-II + Brainstem» → 04 Brainstem + 05 Rule of 4s (de «01-05») + 06-07 Cranial Nerves I-II.' },
  46: { bb: [116, 117, 118, 119, 120, 121, 122], uw: [1102, 1114], mh: [150], lib: [[3, 164], [3, 69], [3, 303], [3, 67], [3, 68]], fa: 'Pharmacology › Autonomic drugs' },
  47: { bb: [110, 111, 112, 113, 114, 115], uw: [1094], mh: [2], lib: [[1, 549], [1, 550], [1, 551]], fa: 'Neurology and Special Senses › Pathology (ictus, HSA)' },
  48: { bb: [125, 126, 127], uw: [1103, 1097], mh: [57, 214], lib: [[1, 522]], fa: 'Neurology and Special Senses › Pathology + Pharmacology (convulsiones, antiepilépticos)',
    nota: 'El plan dice uWorld «Disorders of peripheral nerves/muscles»; el subtema (convulsiones + antiepilépticos) es «Nervous System (Seizures and epilepsy)» (19Q) → se usa ese primero.' },
  49: { bb: [130, 136, 137], uw: [1101], mh: [161], lib: [[1, 504], [1, 545], [1, 531], [1, 557]], fa: 'Neurology and Special Senses › Pathology + Pharmacology (demencias, Parkinson)', pathoma: [17] },
  50: { bb: [123, 124, 131, 132, 140, 134, 135], uw: [1093, 1096, 1107, 1097], mh: [50, 182, 214], lib: [[1, 536], [1, 508], [1, 537], [1, 514]], fa: 'Neurology and Special Senses › Pathology (EM, meningitis, UNM, tumores)',
    nota: '«Other 01-02, 09-10, 18» + 12 Adult Brain Tumors y 13 Childhood Brain Tumors (el subtema pide tumores SNC). uWorld: CNS infections + Demyelinating + Tumors + Peripheral nerves/muscles (UNM).' },
  51: { bb: [381, 382], uw: [1073], mh: [54], lib: [[1, 311], [3, 731], [1, 307], [1, 313]], fa: 'Hematology and Oncology › Pathology (anemias microcíticas)', pathoma: [5] },
};

/** Vídeos B&B de los capítulos de F1 que NO caen en ningún día de F1 (constancia; el tramo 2 los cubre o quedan como repaso). */
const BB_SIN_DIA_F1_NOTA = 'Se listan en el informe (E1.md) a partir del catálogo; no se asignan a ningún día para no inflar la carga.';

module.exports = { MAPA, PALM, PATHOMA, BB_SIN_DIA_F1_NOTA };
