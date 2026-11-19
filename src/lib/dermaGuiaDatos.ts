/**
 * dermaGuiaDatos.ts — DATOS de la guía Derma «qué · cuánto · cómo» (la lógica y la regla del resto de sesiones: src/lib/dermaGuia.ts).
 * GENERADO por DATA/DERMATOLOGIA/guia/gen_derma_guia.js (decisiones: guia_catalogo_derma.js) — NO editar a mano:
 *   node DATA/DERMATOLOGIA/guia/gen_derma_guia.js           (escribe) · --check (compara + valida todas las sesiones, plan A y B)
 * Fuentes verificadas el 18-oct-2026: listado REAL de «Dermatology Cases for Board Review» (Dermatopathology 1-30 · Medical 31-140 ·
 * Pediatric 141-170 · Surgical 171-200; URL directa por gbosID) · índices de Fitzpatrick 9e, Guidebook, Taylor & Kelly 3e, Dermoscopy
 * Self-Assessment 2e y Dermatologic Surgery · «Create Custom Quiz» del Pictorial Review 4e (34 temas, 381 preguntas) · B&B Step 1 ›
 * Dermatology (duraciones reales) · uWorld Step 1 › Systems de Dermatology (nº reales) · ProMIR Dermatología cap. 1 (medición E2).
 * v6.02c (18-oct-2026, E3): nuevo.
 * v6.02c F2 (18-oct-2026, hallazgos E6): DERMA_CME_DESPLAZADO (d12 lee el capítulo de su átomo; su módulo CME pasa a d42) · DERMNET_DERMOSCOPY
 * (respaldo de Dermoscopedia) · los curados d2/d4 llevan ese respaldo · la lógica (reparto de uWorld del plan B y test PMD común) en dermaGuia.ts.
 */
import type { GuiaBloque } from './guia';

export interface DermaGuiaCurada { d: number; fecha: string; casoIds: number[]; planA: GuiaBloque; planB: GuiaBloque }

export const DERMA_GUIA_DATOS_META = {
 "version": "v6.02c",
 "generado": "2026-10-18",
 "fuente": "gen_derma_guia.js + guia_catalogo_derma.js · AccessDerma (listado de casos + índices, 18-oct) · Qbankly (B&B + uWorld, 18-oct) · E2 (ProMIR Derma cap. 1)",
 "curadas": [
  1,
  2,
  3,
  4,
  5
 ],
 "velocidad": {
  "s1Hasta": "2026-12-01",
  "s23Hasta": "2026-12-29",
  "regla": "hasta s1Hasta 1,0× (×1,2 pausas) · hasta s23Hasta 1,25× (×1,15) · después 1,5× (×1,15) — la misma regla que el Step 1 (E1)"
 },
 "pictorial": {
  "total": 381,
  "asignadas": 259
 },
 "casosOrden": "El listado real NO es Med→Path→Peds→Surg: es Dermatopathology 1-30 · Medical 31-140 · Pediatric 141-170 · Surgical 171-200 (pos = id 1-200 de dermaDailyPlan.DERMA_CASO_ORDEN). Los títulos son genéricos («<Área>. Case NN») y no revelan el diagnóstico."
};

/** gbosID de cada caso (índice = posición 1-200 − 1) → https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=… */
export const DERMA_CASO_GBOS: number[] = [614455,614454,614453,622627,622626,622625,622624,622623,622622,622621,622620,622619,622618,622617,622616,622615,622614,622613,622612,622611,622610,622609,622608,622607,622606,622605,622604,622603,622602,622601,614452,614451,614450,622597,622596,622595,622594,622593,622592,622591,622590,622589,622588,622587,622586,622585,622584,622583,622582,622581,622580,622579,622578,622577,622576,622575,622574,622573,622572,622571,622570,622569,622568,622567,622566,622565,622564,622563,622562,622561,622560,622559,622558,622557,622556,622555,622554,622553,622552,622551,622550,622549,622548,622547,622546,622545,622544,622543,622542,622541,622540,622539,622537,622536,622534,622533,622531,622530,622528,622526,622524,622521,622519,622518,622516,622514,622512,622510,622508,622507,622506,622504,622502,622500,622498,622496,622494,622493,622492,622490,622489,622487,622485,622484,622482,622480,622477,622475,622474,622472,622469,622467,622465,622462,622461,622459,622457,622455,622454,622451,614449,614448,614447,622442,622441,622439,622438,622436,622433,622431,622429,622427,622425,622423,622421,622420,622417,622415,622413,622412,622410,622408,622406,622405,622403,622401,622398,622396,622395,622393,614446,614445,614444,614443,614442,622383,622382,622380,622378,622377,622374,622373,622371,622370,622368,622367,622366,622363,622361,622359,622357,622355,622354,622352,622351,622350,622348,622347,622345,622343];

/** Pictorial Review 4e · «Create Custom Quiz»: tema exacto → nº de preguntas disponibles. */
export const PICTORIAL_TEMAS: Array<{ t: string; n: number }> = [{"t":"Hair Findings","n":9},{"t":"Eye Findings","n":10},{"t":"Nail Findings","n":8},{"t":"Oral Pathology","n":10},{"t":"Genital Dermatology","n":6},{"t":"Contact Dermatitis","n":10},{"t":"Autoimmune Bullous Diseases","n":15},{"t":"Disorders of Cornification, Infiltration, and Inflammation","n":8},{"t":"Pigmentary Disorders","n":10},{"t":"Disorders of Fat","n":20},{"t":"Cutaneous Tumors","n":10},{"t":"Melanoma and Non-Melanoma Skin Cancer","n":10},{"t":"Vascular Tumors and Malformations","n":10},{"t":"Genodermatoses","n":10},{"t":"Pediatric Dermatology","n":10},{"t":"Cutaneous Infestations","n":10},{"t":"Viral Diseases","n":10},{"t":"Bacterial Diseases","n":9},{"t":"Fungal Disease","n":15},{"t":"Nutrition-Related Diseases","n":10},{"t":"Cutaneous Findings Related to Pregnancy","n":9},{"t":"Rheumatologic Diseases","n":10},{"t":"Metabolic Diseases","n":9},{"t":"Dermatologic Medications","n":7},{"t":"Surgery and Anatomy","n":13},{"t":"Cosmetic Dermatology","n":10},{"t":"Immunology Review","n":4},{"t":"Basic Sciences","n":20},{"t":"Statistics and Epidemiology","n":10},{"t":"Histologic Stains and Special Studies","n":15},{"t":"Reflectance Confocal Microscopy: The Era of Noninvasive Imaging","n":5},{"t":"Radiologic Findings","n":10},{"t":"Electron Microscopy","n":17},{"t":"High-Yield Facts for the Dermatology Boards","n":32}];
/** Tema(s) del Pictorial por sesión (ciclo 1; solo sesiones Pictorial sin test ProMIR) — sin repetir preguntas. */
export const PICTORIAL_ASIGNACION: Record<number, Array<[string, number]>> = {"1":[["Cutaneous Infestations",10]],"2":[["Vascular Tumors and Malformations",10]],"4":[["Pigmentary Disorders",10]],"5":[["Surgery and Anatomy",10]],"7":[["Disorders of Cornification, Infiltration, and Inflammation",8],["Nail Findings",2]],"8":[["Contact Dermatitis",10]],"10":[["Autoimmune Bullous Diseases",10]],"11":[["Immunology Review",4],["Dermatologic Medications",6]],"14":[["Bacterial Diseases",9]],"16":[["Viral Diseases",10]],"17":[["Fungal Disease",10]],"19":[["Cosmetic Dermatology",10]],"22":[["Cutaneous Tumors",10]],"23":[["Melanoma and Non-Melanoma Skin Cancer",10]],"25":[["Reflectance Confocal Microscopy: The Era of Noninvasive Imaging",5],["Nail Findings",5]],"26":[["High-Yield Facts for the Dermatology Boards",10]],"34":[["Pediatric Dermatology",10]],"35":[["Oral Pathology",10]],"37":[["Genodermatoses",10]],"40":[["Surgery and Anatomy",3],["Histologic Stains and Special Studies",7]],"41":[["Basic Sciences",10]],"53":[["Disorders of Fat",10]],"56":[["High-Yield Facts for the Dermatology Boards",10]],"59":[["Eye Findings",10]],"62":[["Disorders of Fat",10]],"64":[["High-Yield Facts for the Dermatology Boards",10]]};

/** B&B Step 1 · vídeos de Dermatology (+ Fungal Skin Infections y Scleroderma) con duración real (s). */
export const BB_DERM: Record<number, { nombre: string; s: number; ruta: string }> = {"69":{"nombre":"01 - Skin","s":876,"ruta":"Dermatology > General Topics"},"70":{"nombre":"02 - Epithelial Cells","s":763,"ruta":"Dermatology > General Topics"},"71":{"nombre":"03 - Skin Disorders I","s":1222,"ruta":"Dermatology > General Topics"},"72":{"nombre":"04 - Skin Disorders II","s":709,"ruta":"Dermatology > General Topics"},"73":{"nombre":"05 - Pigment Disorders","s":402,"ruta":"Dermatology > General Topics"},"74":{"nombre":"06 - Vascular Lesions","s":664,"ruta":"Dermatology > General Topics"},"75":{"nombre":"07 - Skin Infections","s":791,"ruta":"Dermatology > General Topics"},"76":{"nombre":"08 - Blistering Disorders","s":606,"ruta":"Dermatology > General Topics"},"77":{"nombre":"09 - Hypersensitivity Disorders","s":794,"ruta":"Dermatology > General Topics"},"78":{"nombre":"10 - Skin Cancer","s":1117,"ruta":"Dermatology > General Topics"},"79":{"nombre":"11 - Neurocutaneous Disorders","s":1264,"ruta":"Dermatology > General Topics"},"251":{"nombre":"02 - Fungal Skin Infections","s":608,"ruta":"Infectious Disease > Fungi"},"281":{"nombre":"03 - Scleroderma","s":621,"ruta":"Immunology > Autoimmune Disorders"}};
/** uWorld Step 1 · Test Composer · Systems de Dermatology (nº reales de preguntas). */
export const UW_DERM: Record<number, { nombre: string; q: number }> = {"1027":{"nombre":"Dermatology (Disorders of epidermal appendages)","q":11},"1028":{"nombre":"Dermatology (Inflammatory dermatoses and bullous diseases)","q":28},"1029":{"nombre":"Dermatology (Miscellaneous)","q":4},"1030":{"nombre":"Dermatology (Normal structure and function of skin)","q":6},"1031":{"nombre":"Dermatology (Skin and soft tissue infections)","q":18},"1032":{"nombre":"Dermatology (Skin tumors and tumor-like lesions)","q":32}};
/** Cambios de velocidad de vídeo (fechas de D5 y D15 del Step 1). */
export const DERMA_VELOCIDAD = {"s1Hasta":"2026-12-01","s23Hasta":"2026-12-29"};

/** ProMIR Dermatología cap. 1: test del d3 (preguntas MIR citadas en el capítulo, más recientes primero; E2). */
export const DERMA_TEST_PROMIR_D3 = {"nQ":8,"citadas":11,"preguntas":[{"id":"2024-051","url":"https://promir.medicapanamericana.com/pregunta/MIR/2024-051","seccion":"4.3. Terapéutica física"},{"id":"2023-057","url":"https://promir.medicapanamericana.com/pregunta/MIR/2023-057","seccion":"4.3. Terapéutica física"},{"id":"2022-061","url":"https://promir.medicapanamericana.com/pregunta/MIR/2022-061","seccion":"4.3. Terapéutica física"},{"id":"2020-004","url":"https://promir.medicapanamericana.com/pregunta/MIR/2020-004","seccion":"3. Nociones de Anatomía Patológica. Alteraciones histológicas básicas"},{"id":"2017-041","url":"https://promir.medicapanamericana.com/pregunta/MIR/2017-041","seccion":"4.2. Terapéutica oral"},{"id":"2011-225","url":"https://promir.medicapanamericana.com/pregunta/MIR/2011-225","seccion":"1.2. Dermis"},{"id":"2010-019","url":"https://promir.medicapanamericana.com/pregunta/MIR/2010-019","seccion":"2.2. Lesiones secundarias"},{"id":"2009-016","url":"https://promir.medicapanamericana.com/pregunta/MIR/2009-016","seccion":"2.1. Lesiones primarias"},{"id":"2008-144","url":"https://promir.medicapanamericana.com/pregunta/MIR/2008-144","seccion":"4.2. Terapéutica oral"},{"id":"2005-144","url":"https://promir.medicapanamericana.com/pregunta/MIR/2005-144","seccion":"4.2. Terapéutica oral"},{"id":"2003-142","url":"https://promir.medicapanamericana.com/pregunta/MIR/2003-142","seccion":"2.1. Lesiones primarias"}]};

/** v6.02c F2 (E6): sesiones cuya lectura de 10′ (plan A) es la del ÁTOMO (fila del plan; título del índice) y no el módulo del micro-track de
 *  dermatoscopia, que pasa a la sesión «destino» (repaso del micro-track) — nada se recorta. */
export const DERMA_CME_DESPLAZADO: Record<number, { destino: number; libro: string; capitulo: string; url: string; foco: string; motivo: string }> = {
 "12": {
  "destino": 42,
  "libro": "Fitzpatrick's Color Atlas and Synopsis of Clinical Dermatology, 9e",
  "capitulo": "S23: Adverse Cutaneous Drug Reactions",
  "url": "https://dermatology.mhmedical.com/content.aspx?bookid=3309&sectionid=275944593",
  "foco": "SJS/TEN (% de superficie, SCORTEN, fármacos culpables), DRESS (latencia 2-8 semanas, eosinofilia, órgano afectado) y AGEP (pústulas no foliculares, latencia corta) → tabla de 3 columnas",
  "motivo": "Farmacodermias graves = átomo «no errar»: el módulo 4 del micro-track (lesiones melanocíticas benignas) no tiene relación con el átomo → pasa al d42 (repaso del micro-track)."
 }
};
/** Respaldo de Dermoscopedia (falla por HTTPS desde algunas redes): DermNet «Dermoscopy (Dermatoscopy)» (curl 200, 18-oct-2026). */
export const DERMNET_DERMOSCOPY = "https://dermnetnz.org/topics/dermoscopy";
/** v6.09b · lote 1-ter: atlas DermNet de F1 MEDIDO el 2026-11-17 POR SESIÓN (fecha) (DATA/DERMATOLOGIA/guia/dermnet_medidas_f1.json): lecturas (página +
 *  secciones), palabras de prosa, imágenes y minutos = palabras/100 + 0,25′ por imagen; «fuera» = lo que no forma parte del átomo; «aOtroDia» = lo del átomo que
 *  no cabe hoy, con su fecha (la sesión destino lo lee con «de»). Lo usa el paso «DermNet · atlas del átomo» del plan B de F1 (dermaGuia.ts, ≤ LOTE1_HASTA). */
export interface DermnetLectura { pag: string; url: string; texto: string[]; soloImagenes?: string[]; palabras: number; imagenes: number; de?: string }
export const DERMNET_MEDIDO: Record<string, { atlas: string; lecturas: DermnetLectura[]; palabras: number; imagenes: number; necesario: number; min: number; fuera: { palabras: number; temas: string[] }; aOtroDia?: { fecha: string; pag: string; texto: string[]; palabras: number; imagenes: number; necesario: number }; motivo?: string }> = {
 "2026-12-02": {
  "atlas": "dermoscopy",
  "lecturas": [
   {
    "pag": "dermoscopy",
    "url": "https://dermnetnz.org/topics/dermoscopy",
    "texto": [
     "What is dermoscopy?",
     "Dermatoscopic features of pigmented lesions",
     "Dermatoscopes"
    ],
    "palabras": 389,
    "imagenes": 9
   }
  ],
  "palabras": 389,
  "imagenes": 9,
  "necesario": 6.14,
  "min": 6,
  "fuera": {
   "palabras": 0,
   "temas": []
  },
  "motivo": "la página no tiene «clinical features» ni diferencial: su equivalente son los patrones dermatoscópicos; se lee entera (también «Dermatoscopes»: con qué se mira)"
 },
 "2026-12-04": {
  "atlas": "psoriasis",
  "lecturas": [
   {
    "pag": "psoriasis",
    "url": "https://dermnetnz.org/topics/psoriasis",
    "texto": [
     "What is psoriasis?",
     "What are the clinical features of psoriasis?",
     "Types of psoriasis"
    ],
    "palabras": 397,
    "imagenes": 24
   }
  ],
  "palabras": 397,
  "imagenes": 24,
  "necesario": 9.97,
  "min": 9,
  "fuera": {
   "palabras": 885,
   "temas": [
    "epidemiología",
    "causas",
    "factores agravantes",
    "tratamiento"
   ]
  },
  "aOtroDia": {
   "fecha": "2026-12-10",
   "pag": "psoriasis",
   "texto": [
    "How is psoriasis classified?",
    "How do clinical features vary in differing types of skin?",
    "How is psoriasis diagnosed?"
   ],
   "palabras": 358,
   "imagenes": 3,
   "necesario": 4.33
  },
  "motivo": "la página no tiene «differential diagnosis» ni complicaciones (su sustituto, el diagnóstico, va con la clasificación y la piel de color al jue 10-dic); la franja deja 9′ (uWorld 12′ + B&B «Skin Disorders I» 19′): hoy no queda hueco para el paso de casos reales"
 },
 "2026-12-08": {
  "atlas": "atopic-dermatitis",
  "lecturas": [
   {
    "pag": "atopic-dermatitis",
    "url": "https://dermnetnz.org/topics/atopic-dermatitis",
    "texto": [
     "What is atopic dermatitis?",
     "What are the clinical features of atopic dermatitis?",
     "How do clinical features vary in differing types of skin?",
     "What are the complications of atopic dermatitis?",
     "What is the differential diagnosis for atopic dermatitis?"
    ],
    "soloImagenes": [
     "Who gets atopic dermatitis?"
    ],
    "palabras": 767,
    "imagenes": 35
   }
  ],
  "palabras": 767,
  "imagenes": 35,
  "necesario": 16.42,
  "min": 16,
  "fuera": {
   "palabras": 380,
   "temas": [
    "epidemiología",
    "causas",
    "diagnóstico",
    "tratamiento",
    "pronóstico"
   ]
  },
  "motivo": "con la variación en piel de color y las complicaciones visibles; hoy no queda hueco para el paso de casos reales"
 },
 "2026-12-10": {
  "atlas": "acne",
  "lecturas": [
   {
    "pag": "acne",
    "url": "https://dermnetnz.org/topics/acne",
    "texto": [
     "What is acne?",
     "What causes acne?",
     "What are the clinical features of acne?",
     "What tests are necessary for acne?",
     "What is the treatment for acne?"
    ],
    "palabras": 393,
    "imagenes": 3
   },
   {
    "pag": "psoriasis",
    "url": "https://dermnetnz.org/topics/psoriasis",
    "texto": [
     "How is psoriasis classified?",
     "How do clinical features vary in differing types of skin?",
     "How is psoriasis diagnosed?"
    ],
    "palabras": 358,
    "imagenes": 3,
    "de": "2026-12-04"
   }
  ],
  "palabras": 751,
  "imagenes": 6,
  "necesario": 9.01,
  "min": 9,
  "fuera": {
   "palabras": 66,
   "temas": [
    "epidemiología",
    "pronóstico"
   ]
  },
  "motivo": "acné sin «differential diagnosis» ni complicaciones: entra «What tests…» (con sus 3 imágenes); el átomo es «mecanismo → tratamiento»: causa + clínica + tratamiento"
 },
 "2026-12-14": {
  "atlas": "pemphigus-vulgaris",
  "lecturas": [
   {
    "pag": "pemphigus-vulgaris",
    "url": "https://dermnetnz.org/topics/pemphigus-vulgaris",
    "texto": [
     "What is pemphigus vulgaris?",
     "What are the clinical features of pemphigus vulgaris?",
     "What are the complications of pemphigus vulgaris?",
     "How is pemphigus vulgaris diagnosed?"
    ],
    "palabras": 679,
    "imagenes": 9
   }
  ],
  "palabras": 679,
  "imagenes": 9,
  "necesario": 9.04,
  "min": 9,
  "fuera": {
   "palabras": 741,
   "temas": [
    "epidemiología",
    "causas",
    "gravedad",
    "tratamiento"
   ]
  },
  "motivo": "sin «differential diagnosis»: «How is … diagnosed?» (inmunofluorescencia, biopsia) es lo que separa pénfigo de penfigoide"
 },
 "2026-12-16": {
  "atlas": "urticaria-an-overview",
  "lecturas": [
   {
    "pag": "urticaria-an-overview",
    "url": "https://dermnetnz.org/topics/urticaria-an-overview",
    "texto": [
     "What is urticaria?",
     "Classification of urticaria",
     "What are the clinical features of urticaria?",
     "What is the differential diagnosis of urticaria?"
    ],
    "palabras": 465,
    "imagenes": 7
   }
  ],
  "palabras": 465,
  "imagenes": 7,
  "necesario": 6.4,
  "min": 7,
  "fuera": {
   "palabras": 1333,
   "temas": [
    "epidemiología",
    "causas",
    "diagnóstico",
    "tratamiento",
    "pronóstico"
   ]
  }
 },
 "2026-12-18": {
  "atlas": "stevens-johnson-syndrome-toxic-epidermal-necrolysis",
  "lecturas": [
   {
    "pag": "stevens-johnson-syndrome-toxic-epidermal-necrolysis",
    "url": "https://dermnetnz.org/topics/stevens-johnson-syndrome-toxic-epidermal-necrolysis",
    "texto": [
     "What are Stevens–Johnson syndrome and toxic epidermal necrolysis?",
     "What causes SJS/TEN?",
     "What are the clinical features of SJS/TEN?",
     "What are the complications of SJS/TEN?",
     "What is the differential diagnosis of SJS/TEN?"
    ],
    "soloImagenes": [
     "How is SJS/TEN diagnosed?",
     "What is the outlook for SJS/TEN?"
    ],
    "palabras": 615,
    "imagenes": 10
   }
  ],
  "palabras": 615,
  "imagenes": 10,
  "necesario": 8.65,
  "min": 8,
  "fuera": {
   "palabras": 1577,
   "temas": [
    "epidemiología",
    "diagnóstico",
    "tratamiento",
    "prevención",
    "pronóstico"
   ]
  },
  "motivo": "«What causes SJS/TEN?» entra: los fármacos culpables son el átomo («farmacodermias graves, no errar»)"
 },
 "2026-12-22": {
  "atlas": "cutaneous-lupus-erythematosus",
  "lecturas": [
   {
    "pag": "cutaneous-lupus-erythematosus",
    "url": "https://dermnetnz.org/topics/cutaneous-lupus-erythematosus",
    "texto": [
     "What is cutaneous lupus erythematosus?",
     "What are the clinical features of cutaneous lupus erythematosus?",
     "How do clinical features vary in differing types of skin?",
     "What are the complications of cutaneous lupus erythematosus?"
    ],
    "palabras": 713,
    "imagenes": 30
   }
  ],
  "palabras": 713,
  "imagenes": 30,
  "necesario": 14.63,
  "min": 13,
  "fuera": {
   "palabras": 411,
   "temas": [
    "epidemiología",
    "causas",
    "diagnóstico",
    "tratamiento",
    "pronóstico"
   ]
  },
  "motivo": "sin «differential diagnosis»"
 },
 "2026-12-24": {
  "atlas": "cellulitis",
  "lecturas": [
   {
    "pag": "cellulitis",
    "url": "https://dermnetnz.org/topics/cellulitis",
    "texto": [
     "What is cellulitis?",
     "What are the clinical features of cellulitis?",
     "What are the complications of cellulitis?",
     "How is the diagnosis of cellulitis made?",
     "What is the differential diagnosis of cellulitis?"
    ],
    "palabras": 423,
    "imagenes": 3
   }
  ],
  "palabras": 423,
  "imagenes": 3,
  "necesario": 4.98,
  "min": 5,
  "fuera": {
   "palabras": 667,
   "temas": [
    "epidemiología",
    "causas",
    "tratamiento"
   ]
  },
  "motivo": "«How is the diagnosis … made?» entra: el átomo pide «cuándo NO es celulitis»"
 },
 "2026-12-28": {
  "atlas": "syphilis",
  "lecturas": [
   {
    "pag": "syphilis",
    "url": "https://dermnetnz.org/topics/syphilis",
    "texto": [
     "What is syphilis?",
     "What are the clinical features of syphilis?",
     "What is the differential diagnosis of syphilis?"
    ],
    "palabras": 992,
    "imagenes": 15
   }
  ],
  "palabras": 992,
  "imagenes": 15,
  "necesario": 13.67,
  "min": 13,
  "fuera": {
   "palabras": 874,
   "temas": [
    "epidemiología",
    "diagnóstico",
    "tratamiento",
    "prevención",
    "pronóstico"
   ]
  }
 },
 "2026-12-30": {
  "atlas": "herpes-simplex",
  "lecturas": [
   {
    "pag": "herpes-simplex",
    "url": "https://dermnetnz.org/topics/herpes-simplex",
    "texto": [
     "What is herpes simplex?",
     "What causes herpes simplex?",
     "What are the clinical features of herpes simplex?",
     "How is herpes simplex diagnosed?",
     "What are the complications of herpes simplex?"
    ],
    "palabras": 923,
    "imagenes": 9
   }
  ],
  "palabras": 923,
  "imagenes": 9,
  "necesario": 11.48,
  "min": 12,
  "fuera": {
   "palabras": 485,
   "temas": [
    "epidemiología",
    "tratamiento",
    "prevención"
   ]
  },
  "motivo": "sin «differential diagnosis»: complicaciones (eccema herpético, queratitis), diagnóstico y causa (HSV-1 / HSV-2) son lo que el átomo pide"
 },
 "2026-12-31": {
  "atlas": "fungal-skin-infections",
  "lecturas": [
   {
    "pag": "fungal-skin-infections",
    "url": "https://dermnetnz.org/topics/fungal-skin-infections",
    "texto": [
     "Yeast infections",
     "Dermatophyte infections",
     "Deep fungal infections",
     "Other fungal infections",
     "Treatment of fungal infections",
     "Differential diagnosis of fungal infections"
    ],
    "palabras": 254,
    "imagenes": 0
   },
   {
    "pag": "laboratory-tests-for-fungal-infection",
    "url": "https://dermnetnz.org/topics/laboratory-tests-for-fungal-infection",
    "texto": [
     "Direct microscopy of skin scrapings and nail clippings"
    ],
    "palabras": 131,
    "imagenes": 3
   },
   {
    "pag": "sporotrichosis",
    "url": "https://dermnetnz.org/topics/sporotrichosis",
    "texto": [
     "What is sporotrichosis?",
     "What are the clinical features of sporotrichosis?",
     "How is sporotrichosis diagnosed?"
    ],
    "palabras": 431,
    "imagenes": 0
   },
   {
    "pag": "chromoblastomycosis",
    "url": "https://dermnetnz.org/topics/chromoblastomycosis",
    "texto": [
     "What is chromoblastomycosis?",
     "What are the clinical features of chromoblastomycosis?",
     "How is chromoblastomycosis diagnosed?"
    ],
    "palabras": 249,
    "imagenes": 8
   }
  ],
  "palabras": 1065,
  "imagenes": 11,
  "necesario": 13.4,
  "min": 14,
  "fuera": {
   "palabras": 872,
   "temas": [
    "introducción",
    "diagnóstico",
    "causas",
    "tratamiento"
   ]
  },
  "motivo": "la página del átomo es un índice (listas de enlaces, sin clínica ni imágenes): se recorre entera y se leen sus enlaces del átomo —KOH (examen directo), esporotricosis y cromoblastomicosis—"
 }
};

/** v6.10e (18-nov-2026 · PREGUNTAS REALES): DermNet Quizzes (https://dermnetnz.org/quizzes — públicos, escritos por DermNet: imagen real + respuesta tras
 *  «Show Answers») leídos el 18-nov-2026: slug → título · nº de casos · minutos por caso que declara el propio quiz. Sustituyen al proyecto Claude. */
export const DERMNET_QUIZZES: Record<string, { t: string; n: number; min: number; sinTiempo?: boolean }> = {"acne-16-cases":{"t":"Acne – 16 cases","n":16,"min":2},"acneiform-eruptions-12-cases":{"t":"Acneiform eruptions – 12 cases","n":12,"min":2},"annular-plaque-12-cases":{"t":"Annular plaque – 12 cases","n":12,"min":2},"benign-melanocytic-naevi-11-cases":{"t":"Benign melanocytic naevi – 11 cases","n":11,"min":2},"blistering-conditions-affecting-the-feet-12-cases":{"t":"Blistering conditions affecting the feet – 12 cases","n":12,"min":2},"brown-skin-lesions-12-cases":{"t":"Brown skin lesions – 12 cases","n":12,"min":2},"cause-of-contact-allergic-dermatitis-10-cases":{"t":"Causes of contact allergic dermatitis – 10 cases","n":10,"min":2},"cutaneous-adverse-reactions-10-cases":{"t":"Cutaneous adverse reactions – 10 cases","n":10,"min":2},"dermoscopy-local-features-quiz":{"t":"Dermoscopy local features quiz","n":16,"min":2},"dermoscopy-pattern-analysis-quiz":{"t":"Dermoscopy pattern analysis quiz","n":12,"min":2},"dermoscopy-quiz-1-of-3":{"t":"Dermoscopy quiz (1 of 3)","n":20,"min":2,"sinTiempo":true},"dermoscopy-quiz-2-of-3":{"t":"Dermoscopy quiz (2 of 3)","n":20,"min":2,"sinTiempo":true},"dermoscopy-quiz-3-of-3":{"t":"Dermoscopy quiz (3 of 3)","n":20,"min":2,"sinTiempo":true},"different-causes-of-purpura-10-cases":{"t":"Different causes of purpura – 10 cases","n":10,"min":2},"eczema-14-cases":{"t":"Eczema – 14 cases","n":14,"min":2},"fungal-infection-12-cases":{"t":"Fungal infections – 12 cases","n":12,"min":2},"hair-loss-14-cases":{"t":"Hair loss – 14 cases","n":14,"min":2},"irritant-contact-dermatitis-12-cases":{"t":"Irritant contact dermatitis – 12 cases","n":12,"min":2},"led-rashes-and-unwell-10-cases":{"t":"Leg rashes and unwell – 10 cases","n":10,"min":2},"lichen-12-cases":{"t":"Lichen – 12 cases","n":12,"min":2},"malignant-skin-lesions-10-cases":{"t":"Malignant skin lesions – 10 cases","n":10,"min":2},"melanoma-terminology-10-cases":{"t":"Melanoma terminology – 10 cases","n":10,"min":2},"mixed-diagnoses-10-cases-1-of-11":{"t":"Mixed diagnoses – 10 cases (1 of 11)","n":10,"min":2},"mixed-diagnoses-10-cases-2-of-11":{"t":"Mixed diagnoses – 10 cases (2 of 11)","n":10,"min":2},"mixed-diagnoses-10-cases-3-of-11":{"t":"Mixed diagnoses – 10 cases (3 of 11)","n":10,"min":5},"mixed-diagnoses-10-cases-4-of-11":{"t":"Mixed diagnoses – 10 cases (4 of 11)","n":10,"min":5},"mixed-diagnoses-10-cases-5-of-11":{"t":"Mixed diagnoses – 10 cases (5 of 11)","n":10,"min":5},"mixed-diagnoses-10-cases-6-of-11":{"t":"Mixed diagnoses – 10 cases (6 of 11)","n":10,"min":5},"mixed-diagnoses-10-cases-7-of-11":{"t":"Mixed diagnoses – 10 cases (7 of 11)","n":10,"min":5},"mixed-diagnoses-10-cases-8-of-11":{"t":"Mixed diagnoses – 10 cases (8 of 11)","n":10,"min":5},"mixed-diagnoses-10-cases-9-of-11":{"t":"Mixed diagnoses – 10 cases (9 of 11)","n":10,"min":5},"mixed-diagnoses-10-cases-10-of-11":{"t":"Mixed diagnoses – 10 cases (10 of 11)","n":10,"min":5},"mixed-diagnoses-10-cases-11-of-11":{"t":"Mixed diagnoses – 10 cases (11 of 11)","n":10,"min":5},"nail-abnormalities-10-cases":{"t":"Nail abnormalities – 10 cases","n":10,"min":2},"nonmelanoma-skin-cancers-10-cases":{"t":"Nonmelanoma skin cancers – 10 cases","n":10,"min":2},"pigmented-lesions-10-cases":{"t":"Pigmented lesions – 10 cases","n":10,"min":2},"psoriasis-16-cases":{"t":"Psoriasis – 16 cases","n":16,"min":2},"pustules-15-cases":{"t":"Pustules – 15 cases","n":15,"min":2},"skin-coloured-lumps-and-bumps-12-cases":{"t":"Skin coloured lumps and bumps – 12 cases","n":12,"min":2},"skin-conditions-due-to-fungi-bacteria-and-viruses-10-cases":{"t":"Skin conditions due to fungi, bacteria and viruses – 10 cases","n":10,"min":2},"solitary-red-patches-17-cases":{"t":"Solitary red patches – 17 cases","n":17,"min":2},"telangiectasia-10-cases":{"t":"Telangiectasia – 10 cases","n":10,"min":2},"vascular-naevi-10-cases":{"t":"Vascular naevi – 10 cases","n":10,"min":2},"white-skin-lesions-12-cases":{"t":"White skin lesions – 12 cases","n":12,"min":2}};
/** v6.10e: F1 — rango de casos REALES por sesión (clave = d; k = minutos del hueco / min por caso) o ProMIR (nº de preguntas MIR oficiales) y qué se entrena. */
export const DERMA_QUIZ_F1: Record<number, { quiz?: string; desde?: number; k?: number; lectura?: string; promir?: number; foco: string }> = {
 "1": {
  "quiz": "acne-16-cases",
  "desde": 1,
  "k": 5,
  "foco": "nombra la lesión elemental de cada caso y descríbela con los 8 ejes ANTES de «Show Answers»"
 },
 "4": {
  "quiz": "brown-skin-lesions-12-cases",
  "desde": 4,
  "k": 7,
  "foco": "pigmentación: antes de «Show Answers» di epidérmica (marrón) o dérmica (gris-azul), si es postinflamatoria y qué fototipo crees que tiene"
 },
 "6": {
  "quiz": "dermoscopy-local-features-quiz",
  "desde": 1,
  "k": 4,
  "lectura": "tresPuntos",
  "foco": "aplica la lista de 3 puntos que acabas de leer (asimetría · red atípica · estructuras blanco-azuladas) y nombra la estructura local antes de «Show Answers»"
 },
 "9": {
  "quiz": "acne-16-cases",
  "desde": 12,
  "k": 4,
  "foco": "formas clínicas de acné: lesión elemental + gravedad antes de «Show Answers»"
 },
 "10": {
  "quiz": "blistering-conditions-affecting-the-feet-12-cases",
  "desde": 1,
  "k": 7,
  "foco": "nivel de la ampolla (tensa = subepidérmica · flácida/erosión = intraepidérmica) antes de «Show Answers»"
 },
 "11": {
  "quiz": "solitary-red-patches-17-cases",
  "desde": 6,
  "k": 7,
  "foco": "repaso INTERCALADO de la fase 2 (placas rojas: eccemas, psoriasis… ya vistos): 8 ejes + diferencial de 3 antes de «Show Answers»"
 },
 "12": {
  "quiz": "cutaneous-adverse-reactions-10-cases",
  "desde": 1,
  "k": 5,
  "foco": "reacción a fármacos: morfología + latencia + signos de alarma (mucosas, despegamiento) antes de «Show Answers»"
 },
 "13": {
  "quiz": "different-causes-of-purpura-10-cases",
  "desde": 1,
  "k": 5,
  "foco": "púrpura palpable (vasculitis) vs no palpable: describe y da 3 causas antes de «Show Answers»"
 },
 "14": {
  "quiz": "led-rashes-and-unwell-10-cases",
  "desde": 1,
  "k": 5,
  "foco": "¿es celulitis o no?: unilateral/bilateral, borde, dolor, fiebre antes de «Show Answers»"
 },
 "15": {
  "promir": 4,
  "foco": "4 preguntas MIR oficiales más del cap. 2 (las siguientes a las del test y a las 2 de la 2.ª pasada)"
 },
 "16": {
  "quiz": "skin-conditions-due-to-fungi-bacteria-and-viruses-10-cases",
  "desde": 1,
  "k": 5,
  "foco": "¿virus, bacteria u hongo?: lesión elemental + agrupación (herpetiforme, umbilicada…) antes de «Show Answers»"
 },
 "17": {
  "quiz": "fungal-infection-12-cases",
  "desde": 1,
  "k": 5,
  "foco": "tiña vs candida vs versicolor: borde activo, satélites, escama antes de «Show Answers»"
 }
};
/** v6.10e: lecturas REALES medidas el 18-nov-2026 (palabras/100 + 0,25′ por figura) que sustituyen al proyecto Claude (d5 StatPearls · d6 lista de 3 puntos). */
export const DERMA_LECTURA_REAL: Record<string, { t: string; url: string; secciones: Array<[string, number, number]>; palabras: number; figuras: number; necesario: number }> = {
 "tresPuntos": {
  "t": "DermNet · Dermoscopy course › «Three-point checklist»",
  "url": "https://dermnetnz.org/cme/dermoscopy-course/three-point-checklist",
  "secciones": [
   [
    "Introduction",
    163,
    4
   ],
   [
    "Symmetry",
    69,
    16
   ],
   [
    "Network",
    84,
    16
   ],
   [
    "Blue-white structures",
    56,
    8
   ]
  ],
  "palabras": 372,
  "figuras": 44,
  "necesario": 14.72
 },
 "arteriaFacial": {
  "t": "StatPearls · «Anatomy, Head and Neck: Facial Artery» (NBK536932)",
  "url": "https://www.ncbi.nlm.nih.gov/books/NBK536932/",
  "secciones": [
   [
    "Introduction",
    135,
    0
   ],
   [
    "Structure and Function",
    311,
    0
   ],
   [
    "Physiologic Variants",
    84,
    0
   ],
   [
    "Surgical Considerations",
    179,
    0
   ],
   [
    "Clinical Significance",
    143,
    0
   ],
   [
    "Figure 1",
    0,
    1
   ]
  ],
  "palabras": 852,
  "figuras": 1,
  "necesario": 8.77
 }
};

/** Sesiones CURADAS (d1-d5): plan A (AccessDerma) y plan B (acceso remoto caducado), 13:30–14:15. */
export const DERMA_GUIA_CURADA: Record<number, DermaGuiaCurada> = {
 "1": {
  "d": 1,
  "fecha": "2026-11-18",
  "casoIds": [
   192,
   43
  ],
  "planA": {
   "franja": "13:30–14:15",
   "plan": "research-derma",
   "titulo": "DERMA d1 · Lesiones elementales 1ª/2ª — plan A (AccessDerma)",
   "totalMin": 45,
   "pasos": [
    {
     "min": 3,
     "que": "Anki · 1.ª sesión: sin repasos ni mazo todavía — APEX::DERMA::A nace con la 1.ª tarjeta del cierre",
     "como": "Ahora: Sync · al crear la 1.ª tarjeta del cierre nace APEX::DERMA::A → Options → preset FSRS (retention 0,90) · tag step1 en las tarjetas de los átomos que cuentan doble para el Step 1."
    },
    {
     "min": 9,
     "que": "CASO CIEGO 1/2 · Surgical Dermatology. Case 22 (#192 de la permutación) — Dermatology Cases for Board Review",
     "como": "① solo la imagen: dictado de los 8 ejes en la app (lesión 1ª/2ª, tamaño, color, forma, borde, configuración, distribución, palpación) ② diferencial de 3 ANTES de leer ③ viñeta + responde ④ discusión → 1 tarjeta de MECANISMO + 1 oclusión de imagen · registra ✓/✗ desde el chip «Caso #192» (módulo CORE: Surg).",
     "enlace": {
      "t": "Caso #192 · Surgical Dermatology. Case 22",
      "url": "https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=622355&gbosContainerID=310&viewByNumber=false&groupid=1546"
     }
    },
    {
     "min": 9,
     "que": "CASO CIEGO 2/2 · Medical Dermatology. Case 013 (#43 de la permutación) — Dermatology Cases for Board Review",
     "como": "① solo la imagen: dictado de los 8 ejes en la app (lesión 1ª/2ª, tamaño, color, forma, borde, configuración, distribución, palpación) ② diferencial de 3 ANTES de leer ③ viñeta + responde ④ discusión → 1 tarjeta de MECANISMO + 1 oclusión de imagen · registra ✓/✗ desde el chip «Caso #43» (módulo CORE: Med).",
     "enlace": {
      "t": "Caso #43 · Medical Dermatology. Case 013",
      "url": "https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=622588&gbosContainerID=310&viewByNumber=false&groupid=1546"
     }
    },
    {
     "min": 2,
     "que": "IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopy: An Illustrated Self-Assessment Guide 2e › Chapter 1: Dermoscopy from A to Z → la 1.ª imagen",
     "como": "Estructuras → patrón → diagnóstico en voz alta ANTES de revelar · registra ✓/✗ en ①b · la próxima sesión impar sigue con la imagen siguiente.",
     "enlace": {
      "t": "Chapter 1: Dermoscopy from A to Z",
      "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2929&sectionid=245859873"
     }
    },
    {
     "min": 10,
     "que": "PICTORIAL REVIEW 4e · Create Custom Quiz › «Cutaneous Infestations» = 10 (de 10)",
     "como": "En la página del banco deja vacío «Create Random Quiz»; en «Create Custom Quiz» escribe 10 en Cutaneous Infestations → «Start Custom Quiz» · ~60 s/Q · antes de mirar las opciones nombra la lesión primaria y la secundaria de la imagen (surco, pápula, nódulo, excoriación, costra) · el quiz no se puede guardar a medias: termínalo · cada fallo → botón «fallo →» del banco (nº = posición en el quiz).",
     "enlace": {
      "t": "Pictorial Review 4e · Create Custom Quiz",
      "url": "https://dermatology.mhmedical.com/qa.aspx?resourceid=3626"
     }
    },
    {
     "min": 10,
     "que": "LECTURA · Guidebook to Dermatologic Diagnosis › Chapter 2: An Approach to Primary Lesions",
     "como": "Por encabezados + figuras con su pie (Whole Page Rule por apartado); si acabas antes, Chapter 3: Diagnostic Clues from Secondary Lesions and Postinflammatory Pigmentary Change. Sustituye al «approach» del Color Atlas 9e de la fila del plan: la 9e no tiene capítulo de enfoque (índice verificado el 18-oct: solo «How to Use this Book»). Longitud del capítulo no medida (acceso caducado).",
     "enlace": {
      "t": "Chapter 2: An Approach to Primary Lesions",
      "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2960&sectionid=248574793"
     }
    },
    {
     "min": 2,
     "que": "CIERRE · free recall en voz alta + tarjetas de MECANISMO",
     "como": "Free recall en voz alta de lo de hoy (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo («Marcar átomo como hecho»). ≤3 tarjetas de MECANISMO en APEX::DERMA::A."
    }
   ],
   "recursos": [
    {
     "t": "Dermatology Cases for Board Review (listado)",
     "url": "https://dermatology.mhmedical.com/cases.aspx?groupid=1546",
     "cantidad": "2 casos"
    },
    {
     "t": "Pictorial Review 4e",
     "url": "https://dermatology.mhmedical.com/qa.aspx?resourceid=3626",
     "cantidad": "10Q"
    },
    {
     "t": "Chapter 2: An Approach to Primary Lesions",
     "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2960&sectionid=248574793"
    },
    {
     "t": "Chapter 3: Diagnostic Clues from Secondary Lesions and Postinflammatory Pigmentary Change",
     "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2960&sectionid=248574973"
    },
    {
     "t": "DermNet · Terminology (atlas)",
     "url": "https://dermnetnz.org/topics/terminology"
    }
   ],
   "hecho": "2 casos registrados en el ledger (✓/✗) + 1 imagen dermatoscópica registrada + quiz de 10 terminado con sus fallos registrados + Chapter 2 leído + ≤3 tarjetas de MECANISMO.",
   "planB": "Sin acceso a AccessDerma → PLAN B de esta sesión (toca «AccessDerma caducado»)."
  },
  "planB": {
   "franja": "13:30–14:15",
   "plan": "research-derma",
   "titulo": "DERMA d1 · Lesiones elementales 1ª/2ª — PLAN B (AccessDerma caducado)",
   "totalMin": 45,
   "pasos": [
    {
     "min": 3,
     "que": "Anki · 1.ª sesión: sin repasos ni mazo todavía — APEX::DERMA::A nace con la 1.ª tarjeta del cierre",
     "como": "Ahora: Sync · al crear la 1.ª tarjeta del cierre nace APEX::DERMA::A → Options → preset FSRS (retention 0,90) · tag step1 en las tarjetas de los átomos que cuentan doble para el Step 1."
    },
    {
     "min": 12,
     "que": "uWorld Step 1 · System «Dermatology (Inflammatory dermatoses and bullous diseases)» · Unused · 5Q · Tutor (28 preguntas en el System)",
     "como": "Qbankly › QBanks › uWorld - USMLE Step 1 › Test Composer: marca SOLO ese System → Status Unused → 5 preguntas → Tutor → BEGIN TEST · en cada imagen, ANTES de las opciones: lesión 1ª + 2ª + color + distribución (8 ejes del dictado) y diferencial de 3 · modo Tutor = 90 s de pregunta + 0,85′ de explicación ≈ 2,35′/Q (5Q ≈ 11,8′), en inglés · cuentan doble para el Step 1 (no se repiten después).",
     "enlace": {
      "t": "Qbankly › QBanks (uWorld Step 1)",
      "url": "https://qbankly.app/qbanks"
     }
    },
    {
     "min": 10,
     "que": "LECTURA (español) · ProMIR Dermatología › cap. 1 «Introducción. Conceptos generales» › 2.1. Lesiones primarias + 2.2. Lesiones secundarias (9,9′ medidos: 586 palabras a 150 palabras/min + 24 figuras × 0,25′)",
     "como": "Tapa el texto de cada figura y nombra la lesión ANTES de leer · Whole Page Rule (apartado entero) · al Shopping List: los términos que fallaste en el pre-test · notas en GoodNotes › DERMATOLOGIA › A_Fundamentos › «01_d01_ProMIR_cap1_lesiones_primarias_secundarias».",
     "enlace": {
      "t": "ProMIR · Dermatología cap. 1",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646"
     }
    },
    {
     "min": 8,
     "que": "DermNet › «Terminology» › Describing skin conditions + Morphology + Secondary changes (762 palabras = 7,62′ medidos)",
     "como": "Solo esos 3 apartados, a ~100 palabras/min · cada término en inglés que no sepas → glosario EN-ES del cuaderno (papule = pápula, wheal = habón, crust = costra…) · notas en GoodNotes › DERMATOLOGIA › A_Fundamentos › «02_d01_DermNet_Terminology».",
     "enlace": {
      "t": "DermNet · Terminology",
      "url": "https://dermnetnz.org/topics/terminology"
     }
    },
    {
     "min": 10,
     "que": "DermNet Quizzes › «Acne – 16 cases» · casos 1-5 (5 casos REALES × ~2′ = 10′, el tiempo por caso que declara el quiz)",
     "como": "dermnetnz.org/quizzes (gratis, sin cuenta) → «Acne – 16 cases» → caso 1: nombra la lesión elemental de cada caso y descríbela con los 8 ejes ANTES de «Show Answers» · después «Show Answers» y corrige · cada fallo → tarjeta de MECANISMO + ✓/✗ en el ledger («DermNet · caso N»).",
     "enlace": {
      "t": "DermNet Quiz · Acne – 16 cases",
      "url": "https://dermnetnz.org/quizzes/acne-16-cases/case/1"
     }
    },
    {
     "min": 2,
     "que": "CIERRE · free recall en voz alta + tarjetas de MECANISMO",
     "como": "Free recall en voz alta de lo de hoy (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo («Marcar átomo como hecho»). ≤3 tarjetas de MECANISMO en APEX::DERMA::A."
    }
   ],
   "recursos": [
    {
     "t": "Qbankly › QBanks (uWorld Step 1)",
     "url": "https://qbankly.app/qbanks",
     "cantidad": "5Q"
    },
    {
     "t": "ProMIR · Dermatología cap. 1",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646",
     "min": 9.9
    },
    {
     "t": "DermNet · Terminology",
     "url": "https://dermnetnz.org/topics/terminology"
    },
    {
     "t": "DermNet Quiz · Acne – 16 cases",
     "url": "https://dermnetnz.org/quizzes/acne-16-cases",
     "cantidad": "5 casos"
    }
   ],
   "hecho": "5Q de uWorld respondidas describiendo la imagen antes de las opciones + §2.1-2.2 de ProMIR leídas + 3 apartados de DermNet + 5 casos DermNet con la lesión elemental nombrada antes de «Show Answers» + ≤3 tarjetas.",
   "planB": "Casos #192 (Surgical Dermatology. Case 22) y #43 (Medical Dermatology. Case 013), la imagen dermatoscópica y el Pictorial de hoy NO se pierden: al recuperar el acceso, cada sesión hace 1 caso pendiente en el slot del Pictorial (variable de ajuste) hasta ponerte al día; el tema del Pictorial de ese día pasa a la cola. El caso nunca se salta.",
   "aviso": "AccessDerma caducado: renueva el acceso remoto desde la red de tu institución (campus/VPN u «Sign in via OpenAthens/Shibboleth»); mientras, manda el PLAN B (sin casos, Pictorial ni libros AccessDerma)."
  }
 },
 "2": {
  "d": 2,
  "fecha": "2026-11-20",
  "casoIds": [
   112,
   166
  ],
  "planA": {
   "franja": "13:30–14:15",
   "plan": "research-derma",
   "titulo": "DERMA d2 · Color, distribución y configuración — plan A (AccessDerma)",
   "totalMin": 45,
   "pasos": [
    {
     "min": 3,
     "que": "Anki APEX::DERMA::A · repaso FSRS de las tarjetas de MECANISMO de las sesiones anteriores + fallos del ledger",
     "como": "Solo Good/Again · deuda a cero; si no hay repasos, recita en voz alta la tarjeta de la sesión anterior."
    },
    {
     "min": 9,
     "que": "CASO CIEGO 1/2 · Medical Dermatology. Case 082 (#112 de la permutación) — Dermatology Cases for Board Review",
     "como": "① solo la imagen: dictado de los 8 ejes en la app (lesión 1ª/2ª, tamaño, color, forma, borde, configuración, distribución, palpación) ② diferencial de 3 ANTES de leer ③ viñeta + responde ④ discusión → 1 tarjeta de MECANISMO + 1 oclusión de imagen · registra ✓/✗ desde el chip «Caso #112» (módulo CORE: Med).",
     "enlace": {
      "t": "Caso #112 · Medical Dermatology. Case 082",
      "url": "https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=622504&gbosContainerID=310&viewByNumber=false&groupid=1546"
     }
    },
    {
     "min": 9,
     "que": "CASO CIEGO 2/2 · Pediatric Dermatology. Case 26 (#166 de la permutación) — Dermatology Cases for Board Review",
     "como": "① solo la imagen: dictado de los 8 ejes en la app (lesión 1ª/2ª, tamaño, color, forma, borde, configuración, distribución, palpación) ② diferencial de 3 ANTES de leer ③ viñeta + responde ④ discusión → 1 tarjeta de MECANISMO + 1 oclusión de imagen · registra ✓/✗ desde el chip «Caso #166» (módulo CORE: Peds).",
     "enlace": {
      "t": "Caso #166 · Pediatric Dermatology. Case 26",
      "url": "https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=622401&gbosContainerID=310&viewByNumber=false&groupid=1546"
     }
    },
    {
     "min": 2,
     "que": "IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopedia › «Pigment network»",
     "como": "Tapa el título y los pies: describe la red (regular/atípica, fina/gruesa) antes de leer · registra ✓/✗ en ①b. · si Dermoscopedia no carga: DermNet «Dermoscopy (Dermatoscopy)» (en los recursos), mismas estructuras con imágenes.",
     "enlace": {
      "t": "Dermoscopedia · Pigment network",
      "url": "https://dermoscopedia.org/Pigment_network"
     }
    },
    {
     "min": 10,
     "que": "PICTORIAL REVIEW 4e · Create Custom Quiz › «Vascular Tumors and Malformations» = 10 (de 10)",
     "como": "En la página del banco deja vacío «Create Random Quiz»; en «Create Custom Quiz» escribe 10 en Vascular Tumors and Malformations → «Start Custom Quiz» · ~60 s/Q · antes de las opciones: color (rojo/violáceo/azul), configuración y distribución (segmentaria, dermatomal) — el tema de hoy · el quiz no se puede guardar a medias: termínalo · cada fallo → botón «fallo →» del banco (nº = posición en el quiz).",
     "enlace": {
      "t": "Pictorial Review 4e · Create Custom Quiz",
      "url": "https://dermatology.mhmedical.com/qa.aspx?resourceid=3626"
     }
    },
    {
     "min": 10,
     "que": "LECTURA · Guidebook to Dermatologic Diagnosis › Chapter 11: Shape, Configuration, and Grouping of Lesions",
     "como": "Tabla en el cuaderno: configuración (anular · herpetiforme · lineal · Blaschko · dermatomal) → 2 ejemplos de cada una; si acabas: Chapter 4: Color as a Diagnostic Determinant. Chapter 12: More on Distribution queda como consulta. Longitud no medida (acceso caducado).",
     "enlace": {
      "t": "Chapter 11: Shape, Configuration, and Grouping of Lesions",
      "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2960&sectionid=248575828"
     }
    },
    {
     "min": 2,
     "que": "CIERRE · free recall en voz alta + tarjetas de MECANISMO",
     "como": "Free recall en voz alta de lo de hoy (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo («Marcar átomo como hecho»). ≤3 tarjetas en APEX::DERMA::A."
    }
   ],
   "recursos": [
    {
     "t": "Dermatology Cases for Board Review (listado)",
     "url": "https://dermatology.mhmedical.com/cases.aspx?groupid=1546",
     "cantidad": "2 casos"
    },
    {
     "t": "Pictorial Review 4e",
     "url": "https://dermatology.mhmedical.com/qa.aspx?resourceid=3626",
     "cantidad": "10Q"
    },
    {
     "t": "Chapter 11: Shape, Configuration, and Grouping of Lesions",
     "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2960&sectionid=248575828"
    },
    {
     "t": "Chapter 4: Color as a Diagnostic Determinant",
     "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2960&sectionid=248575068"
    },
    {
     "t": "Chapter 12: More on Distribution",
     "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2960&sectionid=248575965"
    },
    {
     "t": "Dermoscopedia · Pigment network",
     "url": "https://dermoscopedia.org/Pigment_network"
    },
    {
     "t": "DermNet · Dermoscopy (respaldo de Dermoscopedia)",
     "url": "https://dermnetnz.org/topics/dermoscopy"
    }
   ],
   "hecho": "2 casos registrados + 1 imagen registrada + quiz de 10 terminado + tabla de configuraciones hecha + ≤3 tarjetas.",
   "planB": "Sin acceso a AccessDerma → PLAN B de esta sesión."
  },
  "planB": {
   "franja": "13:30–14:15",
   "plan": "research-derma",
   "titulo": "DERMA d2 · Color, distribución y configuración — PLAN B (AccessDerma caducado)",
   "totalMin": 45,
   "pasos": [
    {
     "min": 3,
     "que": "Anki APEX::DERMA::A · repaso FSRS de las tarjetas de MECANISMO de las sesiones anteriores + fallos del ledger",
     "como": "Solo Good/Again · deuda a cero; si no hay repasos, recita en voz alta la tarjeta de la sesión anterior."
    },
    {
     "min": 9,
     "que": "uWorld Step 1 · System «Dermatology (Skin and soft tissue infections)» · Unused · 4Q · Tutor (18 preguntas en el System)",
     "como": "Qbankly › QBanks › uWorld - USMLE Step 1 › Test Composer: marca SOLO ese System → Status Unused → 4 preguntas → Tutor → BEGIN TEST · antes de las opciones nombra la configuración (anular = tiña, herpetiforme = HSV, dermatomal = zóster) y el color · modo Tutor = 90 s de pregunta + 0,85′ de explicación ≈ 2,35′/Q (4Q ≈ 9,4′) · cuentan doble para el Step 1 (no se repiten después).",
     "enlace": {
      "t": "Qbankly › QBanks (uWorld Step 1)",
      "url": "https://qbankly.app/qbanks"
     }
    },
    {
     "min": 6,
     "que": "LECTURA (español) · ProMIR Dermatología › cap. 1 › 2.3. Exploración dermatológica (6,1′ medidos a 150 palabras/min · 359 palabras · 5 figuras · tabla 1-1 de signos)",
     "como": "Whole Page Rule; los signos de la tabla 1-1 (Darier, Nikolsky, Koebner…) → 1 tarjeta cada uno que no supieras.",
     "enlace": {
      "t": "ProMIR · Dermatología cap. 1",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646"
     }
    },
    {
     "min": 7,
     "que": "DermNet › «Terminology» › Distribution + Configuration of lesions + Colour (671 palabras = 6,71′ medidos)",
     "como": "~100 palabras/min · completa tu tabla de configuraciones con los términos en inglés.",
     "enlace": {
      "t": "DermNet · Terminology",
      "url": "https://dermnetnz.org/topics/terminology"
     }
    },
    {
     "min": 13,
     "que": "B&B Step 1 › Dermatology › «06 - Vascular Lesions» (11:04) — color y distribución de las lesiones vasculares (por título; contenido no verificado)",
     "como": "Qbankly › Video Library › B&B Step 1 › Dermatology › General Topics › 06 - Vascular Lesions · 1,0× = 13′ con pausas · al terminar, free recall de 60 s en el cuaderno (con subtítulos en inglés, CC; regla de velocidad del Step 1).",
     "enlace": {
      "t": "B&B · 06 - Vascular Lesions",
      "url": "https://qbankly.app/videos"
     }
    },
    {
     "min": 3,
     "que": "DermNet › «Blaschko lines» › «What are the Blaschko lines?» + «What is the distribution of Blaschko lines?» + dibujo del patrón (2,94′ medidos: 94 palabras + 2 figuras = 1,44′ + dibujo ≈1,5′)",
     "como": "Lee esos 2 apartados y mira sus 2 figuras (tronco y extremidad); después dibuja el patrón en V/S sobre una silueta · «History…» y «Which skin conditions…» (164 palabras + 9 imágenes, el catálogo de enfermedades blaschkoides) no forman parte del átomo: el átomo es la configuración.",
     "enlace": {
      "t": "DermNet · Blaschko lines",
      "url": "https://dermnetnz.org/topics/blaschko-lines"
     }
    },
    {
     "min": 2,
     "que": "IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopedia › «Pigment network» (pública)",
     "como": "Tapa el título y los pies: describe la red antes de leer · registra ✓/✗ en ①b. · si Dermoscopedia no carga: DermNet «Dermoscopy (Dermatoscopy)» (en los recursos), mismas estructuras con imágenes.",
     "enlace": {
      "t": "Dermoscopedia · Pigment network",
      "url": "https://dermoscopedia.org/Pigment_network"
     }
    },
    {
     "min": 2,
     "que": "CIERRE · free recall en voz alta + tarjetas de MECANISMO",
     "como": "Free recall en voz alta de lo de hoy (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo («Marcar átomo como hecho»). ≤3 tarjetas en APEX::DERMA::A."
    }
   ],
   "recursos": [
    {
     "t": "Qbankly › QBanks (uWorld Step 1)",
     "url": "https://qbankly.app/qbanks",
     "cantidad": "4Q"
    },
    {
     "t": "ProMIR · Dermatología cap. 1",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646",
     "min": 6.1
    },
    {
     "t": "B&B · 06 - Vascular Lesions",
     "url": "https://qbankly.app/videos",
     "min": 13
    },
    {
     "t": "DermNet · Terminology",
     "url": "https://dermnetnz.org/topics/terminology"
    },
    {
     "t": "DermNet · Blaschko lines",
     "url": "https://dermnetnz.org/topics/blaschko-lines"
    },
    {
     "t": "DermNet · Dermoscopy (respaldo de Dermoscopedia)",
     "url": "https://dermnetnz.org/topics/dermoscopy"
    }
   ],
   "hecho": "4Q de uWorld + §2.3 de ProMIR + 3 apartados de DermNet + vídeo B&B visto con su free recall + dibujo de Blaschko + 1 imagen dermatoscópica + ≤3 tarjetas.",
   "planB": "Casos #112 (Medical Dermatology. Case 082) y #166 (Pediatric Dermatology. Case 26), la imagen dermatoscópica y el Pictorial de hoy NO se pierden: al recuperar el acceso, cada sesión hace 1 caso pendiente en el slot del Pictorial (variable de ajuste) hasta ponerte al día; el tema del Pictorial de ese día pasa a la cola. El caso nunca se salta.",
   "aviso": "AccessDerma caducado: renueva el acceso remoto desde la red de tu institución (campus/VPN u «Sign in via OpenAthens/Shibboleth»); mientras, manda el PLAN B (sin casos, Pictorial ni libros AccessDerma)."
  }
 },
 "3": {
  "d": 3,
  "fecha": "2026-11-24",
  "casoIds": [
   25,
   165
  ],
  "planA": {
   "franja": "13:30–14:15",
   "plan": "research-derma",
   "titulo": "DERMA d3 · Estructura de la piel + TEST ProMIR cap. 1 — plan A (AccessDerma)",
   "totalMin": 45,
   "pasos": [
    {
     "min": 3,
     "que": "Anki APEX::DERMA::A · repaso FSRS de las tarjetas de MECANISMO de las sesiones anteriores + fallos del ledger",
     "como": "Solo Good/Again · deuda a cero; si no hay repasos, recita en voz alta la tarjeta de la sesión anterior."
    },
    {
     "min": 9,
     "que": "CASO CIEGO 1/2 · Dermatopathology. Case 25 (#25 de la permutación) — Dermatology Cases for Board Review",
     "como": "① solo la imagen: dictado de los 8 ejes en la app (lesión 1ª/2ª, tamaño, color, forma, borde, configuración, distribución, palpación) ② diferencial de 3 ANTES de leer ③ viñeta + responde ④ discusión → 1 tarjeta de MECANISMO + 1 oclusión de imagen · registra ✓/✗ desde el chip «Caso #25» (módulo CORE: Path). Es un caso de DERMATOPATOLOGÍA: en ① describe la capa afectada (epidermis · unión · dermis · hipodermis) y el patrón.",
     "enlace": {
      "t": "Caso #25 · Dermatopathology. Case 25",
      "url": "https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=622606&gbosContainerID=310&viewByNumber=false&groupid=1546"
     }
    },
    {
     "min": 8,
     "que": "CASO CIEGO 2/2 · Pediatric Dermatology. Case 25 (#165 de la permutación) — Dermatology Cases for Board Review",
     "como": "① solo la imagen: dictado de los 8 ejes en la app (lesión 1ª/2ª, tamaño, color, forma, borde, configuración, distribución, palpación) ② diferencial de 3 ANTES de leer ③ viñeta + responde ④ discusión → 1 tarjeta de MECANISMO + 1 oclusión de imagen · registra ✓/✗ desde el chip «Caso #165» (módulo CORE: Peds).",
     "enlace": {
      "t": "Caso #165 · Pediatric Dermatology. Case 25",
      "url": "https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=622403&gbosContainerID=310&viewByNumber=false&groupid=1546"
     }
    },
    {
     "min": 2,
     "que": "IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopy Self-Assessment 2e › Chapter 1: Dermoscopy from A to Z → la imagen siguiente",
     "como": "Estructuras → patrón → diagnóstico en voz alta ANTES de revelar · registra ✓/✗ en ①b.",
     "enlace": {
      "t": "Chapter 1: Dermoscopy from A to Z",
      "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2929&sectionid=245859873"
     }
    },
    {
     "min": 11,
     "que": "ProMIR Dermatología › cap. 1 · TEST 8Q (preguntas MIR citadas en el capítulo: 2024-051 · 2023-057 · 2022-061 · 2020-004 · 2017-041 · 2011-225 · 2010-019 · 2009-016)",
     "como": "En modo estudio, SIN cronómetro (fase 1 de Derma): 11′ = 8Q a 77 s/Q, solo el presupuesto de la franja (2Q más solo si te sobra tiempo) · el pool de la app no tiene preguntas de este capítulo (0; 30 de Dermatología en total) → se usan las 11 preguntas MIR citadas en el capítulo (más recientes primero) · si te sobra tiempo: 2008-144 · 2005-144. La lista «Pool oficial» de la app trae preguntas de OTROS capítulos de Dermatología (el cap. 1 no tiene en el pool): déjalas para el banqueo y registra el neto con «Registrar 10Q MIR-Derma» (total 8).",
     "enlace": {
      "t": "ProMIR · Dermatología cap. 1",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646"
     }
    },
    {
     "min": 10,
     "que": "LECTURA · Fitzpatrick's Dermatology 9e › Part 2 › Chapter 15: Epidermal and Dermal Adhesion",
     "como": "Solo las figuras de la unión dermoepidérmica y sus pies (hemidesmosoma → lámina lúcida → lámina densa → fibrillas de anclaje): es el mapa de las ampollosas del d10. Chapter 5: Growth and Differentiation of the Epidermis = consulta si fallaste el caso #25. Longitud no medida (acceso caducado).",
     "enlace": {
      "t": "Chapter 15: Epidermal and Dermal Adhesion",
      "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2570&sectionid=210416355"
     }
    },
    {
     "min": 2,
     "que": "CIERRE · free recall en voz alta + tarjetas de MECANISMO",
     "como": "Free recall en voz alta de lo de hoy (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo («Marcar átomo como hecho»)."
    }
   ],
   "recursos": [
    {
     "t": "Dermatology Cases for Board Review (listado)",
     "url": "https://dermatology.mhmedical.com/cases.aspx?groupid=1546",
     "cantidad": "2 casos"
    },
    {
     "t": "ProMIR · Dermatología cap. 1",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646",
     "cantidad": "8Q (11 citadas en el capítulo)"
    },
    {
     "t": "Chapter 15: Epidermal and Dermal Adhesion",
     "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2570&sectionid=210416355"
    },
    {
     "t": "Chapter 5: Growth and Differentiation of the Epidermis",
     "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2570&sectionid=210415435"
    },
    {
     "t": "dermpathatlas (histología)",
     "url": "https://www.dermpathatlas.com/"
    },
    {
     "t": "DermNet · The structure of normal skin",
     "url": "https://dermnetnz.org/topics/the-structure-of-normal-skin"
    }
   ],
   "hecho": "2 casos registrados + 1 imagen + 8Q ProMIR registradas (kind derma10Q) + figuras de la UDE dibujadas + ≤3 tarjetas.",
   "planB": "Sin acceso a AccessDerma → PLAN B (el test ProMIR no depende de AccessDerma)."
  },
  "planB": {
   "franja": "13:30–14:15",
   "plan": "research-derma",
   "titulo": "DERMA d3 · Estructura de la piel + TEST ProMIR cap. 1 — PLAN B (AccessDerma caducado)",
   "totalMin": 45,
   "pasos": [
    {
     "min": 3,
     "que": "Anki APEX::DERMA::A · repaso FSRS de las tarjetas de MECANISMO de las sesiones anteriores + fallos del ledger",
     "como": "Solo Good/Again · deuda a cero; si no hay repasos, recita en voz alta la tarjeta de la sesión anterior."
    },
    {
     "min": 11,
     "que": "PRIMERO, ciego · ProMIR Dermatología › cap. 1 · TEST 8Q (preguntas MIR citadas en el capítulo: 2024-051 · 2023-057 · 2022-061 · 2020-004 · 2017-041 · 2011-225 · 2010-019 · 2009-016)",
     "como": "En modo estudio, SIN cronómetro (fase 1 de Derma): 11′ = 8Q a 77 s/Q, solo el presupuesto de la franja (2Q más solo si te sobra tiempo) · el pool de la app no tiene preguntas de este capítulo (0; 30 de Dermatología en total) → se usan las 11 preguntas MIR citadas en el capítulo (más recientes primero) · si te sobra tiempo: 2008-144 · 2005-144. La lista «Pool oficial» de la app trae preguntas de OTROS capítulos de Dermatología (el cap. 1 no tiene en el pool): déjalas para el banqueo y registra el neto con «Registrar 10Q MIR-Derma» (total 8).",
     "enlace": {
      "t": "ProMIR · Dermatología cap. 1",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646"
     }
    },
    {
     "min": 8,
     "que": "LECTURA (español) · ProMIR Dermatología › cap. 1 › 1.1. Epidermis + 1.2. Dermis + 1.3. Hipodermis + 3. Nociones de Anatomía Patológica. Alteraciones histológicas básicas (7,5′ medidos a 150 palabras/min · 881 palabras · 2 figuras)",
     "como": "Primero el apartado de cada pregunta que fallaste (2020-004 → §3 · 2011-225 → §1.2) · Whole Page Rule.",
     "enlace": {
      "t": "ProMIR · Dermatología cap. 1",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646"
     }
    },
    {
     "min": 18,
     "que": "B&B Step 1 › Dermatology › «01 - Skin» (14:36) — capas de la piel (por título)",
     "como": "Qbankly › Video Library › B&B Step 1 › Dermatology › General Topics › 01 - Skin · 1,0× = 18′ con pausas · al terminar, free recall de 60 s en el cuaderno (con subtítulos en inglés, CC; regla de velocidad del Step 1).",
     "enlace": {
      "t": "B&B · 01 - Skin",
      "url": "https://qbankly.app/videos"
     }
    },
    {
     "min": 3,
     "que": "PassMedicine (Library de Qbankly) › «Epidermis» — no medible sin iniciar sesión: acotado a 3′ (2′ de lectura + 1′ de recuerdo)",
     "como": "Lee 2′: las capas de la epidermis en orden (basal → espinosa → granulosa → lúcida → córnea) y qué define a cada una; marca dónde paras · 1′: escribe de memoria las 5 capas con 1 dato de cada una. Lo que quede después de tu marca es ampliación: el átomo (las capas) ya lo cubren ProMIR §1.1 y el B&B «01 - Skin».",
     "enlace": {
      "t": "PassMedicine · Epidermis",
      "url": "https://qbankly.app/library?e=3&doc=493"
     }
    },
    {
     "min": 2,
     "que": "CIERRE · free recall en voz alta + tarjetas de MECANISMO",
     "como": "Free recall en voz alta de lo de hoy (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo («Marcar átomo como hecho»). Dibuja la piel en capas (epidermis → UDE → dermis → hipodermis) de memoria."
    }
   ],
   "recursos": [
    {
     "t": "ProMIR · Dermatología cap. 1",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646",
     "min": 7.5
    },
    {
     "t": "B&B · 01 - Skin",
     "url": "https://qbankly.app/videos",
     "min": 18
    },
    {
     "t": "PassMedicine · Epidermis",
     "url": "https://qbankly.app/library?e=3&doc=493"
    },
    {
     "t": "DermNet · The structure of normal skin (consulta)",
     "url": "https://dermnetnz.org/topics/the-structure-of-normal-skin"
    }
   ],
   "hecho": "8Q ProMIR registradas + §1 y §3 leídas + vídeo B&B con free recall + dibujo de capas de memoria + ≤3 tarjetas.",
   "planB": "Casos #25 (Dermatopathology. Case 25) y #165 (Pediatric Dermatology. Case 25), la imagen dermatoscópica y el Pictorial de hoy NO se pierden: al recuperar el acceso, cada sesión hace 1 caso pendiente en el slot del Pictorial (variable de ajuste) hasta ponerte al día; el tema del Pictorial de ese día pasa a la cola. El caso nunca se salta.",
   "aviso": "AccessDerma caducado: renueva el acceso remoto desde la red de tu institución (campus/VPN u «Sign in via OpenAthens/Shibboleth»); mientras, manda el PLAN B (sin casos, Pictorial ni libros AccessDerma)."
  }
 },
 "4": {
  "d": 4,
  "fecha": "2026-11-26",
  "casoIds": [
   21,
   194
  ],
  "planA": {
   "franja": "13:30–14:15",
   "plan": "research-derma",
   "titulo": "DERMA d4 · Fototipos I-VI + piel de color — plan A (AccessDerma)",
   "totalMin": 45,
   "pasos": [
    {
     "min": 3,
     "que": "Anki APEX::DERMA::A · repaso FSRS de las tarjetas de MECANISMO de las sesiones anteriores + fallos del ledger",
     "como": "Solo Good/Again · deuda a cero; si no hay repasos, recita en voz alta la tarjeta de la sesión anterior."
    },
    {
     "min": 9,
     "que": "CASO CIEGO 1/2 · Dermatopathology. Case 21 (#21 de la permutación) — Dermatology Cases for Board Review",
     "como": "① solo la imagen: dictado de los 8 ejes en la app (lesión 1ª/2ª, tamaño, color, forma, borde, configuración, distribución, palpación) ② diferencial de 3 ANTES de leer ③ viñeta + responde ④ discusión → 1 tarjeta de MECANISMO + 1 oclusión de imagen · registra ✓/✗ desde el chip «Caso #21» (módulo CORE: Path). Caso de DERMATOPATOLOGÍA: capa afectada + patrón en ①.",
     "enlace": {
      "t": "Caso #21 · Dermatopathology. Case 21",
      "url": "https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=622610&gbosContainerID=310&viewByNumber=false&groupid=1546"
     }
    },
    {
     "min": 9,
     "que": "CASO CIEGO 2/2 · Surgical Dermatology. Case 24 (#194 de la permutación) — Dermatology Cases for Board Review",
     "como": "① solo la imagen: dictado de los 8 ejes en la app (lesión 1ª/2ª, tamaño, color, forma, borde, configuración, distribución, palpación) ② diferencial de 3 ANTES de leer ③ viñeta + responde ④ discusión → 1 tarjeta de MECANISMO + 1 oclusión de imagen · registra ✓/✗ desde el chip «Caso #194» (módulo CORE: Surg).",
     "enlace": {
      "t": "Caso #194 · Surgical Dermatology. Case 24",
      "url": "https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=622352&gbosContainerID=310&viewByNumber=false&groupid=1546"
     }
    },
    {
     "min": 2,
     "que": "IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopedia › «Globules»",
     "como": "Tapa el título: describe los glóbulos (tamaño, color, distribución) antes de leer · registra ✓/✗ en ①b. · si Dermoscopedia no carga: DermNet «Dermoscopy (Dermatoscopy)» (en los recursos), mismas estructuras con imágenes.",
     "enlace": {
      "t": "Dermoscopedia · Globules",
      "url": "https://dermoscopedia.org/Globules"
     }
    },
    {
     "min": 10,
     "que": "PICTORIAL REVIEW 4e · Create Custom Quiz › «Pigmentary Disorders» = 10 (de 10)",
     "como": "En la página del banco deja vacío «Create Random Quiz»; en «Create Custom Quiz» escribe 10 en Pigmentary Disorders → «Start Custom Quiz» · ~60 s/Q · antes de las opciones: ¿hiper o hipopigmentación?, ¿epidérmica (marrón) o dérmica (gris-azul)?, fototipo probable · el quiz no se puede guardar a medias: termínalo · cada fallo → botón «fallo →» del banco (nº = posición en el quiz).",
     "enlace": {
      "t": "Pictorial Review 4e · Create Custom Quiz",
      "url": "https://dermatology.mhmedical.com/qa.aspx?resourceid=3626"
     }
    },
    {
     "min": 10,
     "que": "LECTURA · Taylor and Kelly's Dermatology for Skin of Color 3e › Section 1 › Chapter 1: Defining Skin of Color",
     "como": "Por encabezados: qué es «piel de color», cómo cambian el eritema y la pigmentación postinflamatoria en IV-VI · 3 ideas al cuaderno para SR-2 (L5, fototipos IV-VI). Longitud no medida (acceso caducado).",
     "enlace": {
      "t": "Chapter 1: Defining Skin of Color",
      "url": "https://dermatology.mhmedical.com/content.aspx?bookid=3609&sectionid=301535746"
     }
    },
    {
     "min": 2,
     "que": "CIERRE · free recall en voz alta + tarjetas de MECANISMO",
     "como": "Free recall en voz alta de lo de hoy (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo («Marcar átomo como hecho»)."
    }
   ],
   "recursos": [
    {
     "t": "Dermatology Cases for Board Review (listado)",
     "url": "https://dermatology.mhmedical.com/cases.aspx?groupid=1546",
     "cantidad": "2 casos"
    },
    {
     "t": "Pictorial Review 4e",
     "url": "https://dermatology.mhmedical.com/qa.aspx?resourceid=3626",
     "cantidad": "10Q"
    },
    {
     "t": "Chapter 1: Defining Skin of Color",
     "url": "https://dermatology.mhmedical.com/content.aspx?bookid=3609&sectionid=301535746"
    },
    {
     "t": "DermNet · Skin phototype",
     "url": "https://dermnetnz.org/topics/skin-phototype"
    },
    {
     "t": "DermNet · Dermoscopy (respaldo de Dermoscopedia)",
     "url": "https://dermnetnz.org/topics/dermoscopy"
    }
   ],
   "hecho": "2 casos registrados + 1 imagen + quiz de 10 terminado + 3 ideas para SR-2 + ≤3 tarjetas.",
   "planB": "Sin acceso a AccessDerma → PLAN B."
  },
  "planB": {
   "franja": "13:30–14:15",
   "plan": "research-derma",
   "titulo": "DERMA d4 · Fototipos I-VI + piel de color — PLAN B (AccessDerma caducado)",
   "totalMin": 45,
   "pasos": [
    {
     "min": 3,
     "que": "Anki APEX::DERMA::A · repaso FSRS de las tarjetas de MECANISMO de las sesiones anteriores + fallos del ledger",
     "como": "Solo Good/Again · deuda a cero; si no hay repasos, recita en voz alta la tarjeta de la sesión anterior."
    },
    {
     "min": 8,
     "que": "B&B Step 1 › Dermatology › «05 - Pigment Disorders» (6:42)",
     "como": "Qbankly › Video Library › B&B Step 1 › Dermatology › General Topics › 05 - Pigment Disorders · 1,0× = 8′ con pausas · al terminar, free recall de 60 s en el cuaderno (con subtítulos en inglés, CC; regla de velocidad del Step 1).",
     "enlace": {
      "t": "B&B · 05 - Pigment Disorders",
      "url": "https://qbankly.app/videos"
     }
    },
    {
     "min": 10,
     "que": "DermNet (10,15′ medidos a 100 palabras/min + 0,25′ por figura) › «Skin phototype» (clasificación de Fitzpatrick, ≈230 palabras + 6 figuras) + «Postinflammatory hyperpigmentation» (≈440 palabras + 8 figuras)",
     "como": "Tabla fototipo I-VI → quema/broncea → cómo se ve el eritema y la PIH en cada uno.",
     "enlace": {
      "t": "DermNet · Skin phototype",
      "url": "https://dermnetnz.org/topics/skin-phototype"
     }
    },
    {
     "min": 5,
     "que": "Diferencial de hipopigmentación (4,55′ medidos y acotados: DermNet «Pityriasis alba» › clinical features, 155 palabras + 4 figuras = 2,55′ medidos + PassMedicine «Vitiligo» (Library de Qbankly) acotado a 2′, no medible sin iniciar sesión)",
     "como": "Primero DermNet (las 4 figuras + clinical features) · después lee 2′ de PassMedicine «Vitiligo»: definición → clínica → diagnóstico (lámpara de Wood); marca dónde paras · mientras lees, tabla de 3 columnas: pitiriasis alba vs vitíligo vs pitiriasis versicolor (borde, escama, Wood).",
     "enlace": {
      "t": "DermNet · Pityriasis alba",
      "url": "https://dermnetnz.org/topics/pityriasis-alba"
     }
    },
    {
     "min": 2,
     "que": "IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopedia › «Globules» (pública)",
     "como": "Describe antes de leer · registra ✓/✗ en ①b. · si Dermoscopedia no carga: DermNet «Dermoscopy (Dermatoscopy)» (en los recursos), mismas estructuras con imágenes.",
     "enlace": {
      "t": "Dermoscopedia · Globules",
      "url": "https://dermoscopedia.org/Globules"
     }
    },
    {
     "min": 15,
     "que": "DermNet Quizzes › «Brown skin lesions – 12 cases» · casos 4-10 (7 casos REALES × ~2′ = 14′ + 1′ para el ledger, el tiempo por caso que declara el quiz)",
     "como": "dermnetnz.org/quizzes (gratis, sin cuenta) → «Brown skin lesions – 12 cases» → caso 4: pigmentación: antes de «Show Answers» di epidérmica (marrón) o dérmica (gris-azul), si es postinflamatoria y qué fototipo crees que tiene · puente con SR-2 (L5) · después «Show Answers» y corrige · cada fallo → tarjeta de MECANISMO + ✓/✗ en el ledger («DermNet · caso N»).",
     "enlace": {
      "t": "DermNet Quiz · Brown skin lesions – 12 cases",
      "url": "https://dermnetnz.org/quizzes/brown-skin-lesions-12-cases/case/4"
     }
    },
    {
     "min": 2,
     "que": "CIERRE · free recall en voz alta + tarjetas de MECANISMO",
     "como": "Free recall en voz alta de lo de hoy (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo («Marcar átomo como hecho»)."
    }
   ],
   "recursos": [
    {
     "t": "B&B · 05 - Pigment Disorders",
     "url": "https://qbankly.app/videos",
     "min": 8
    },
    {
     "t": "DermNet · Skin phototype",
     "url": "https://dermnetnz.org/topics/skin-phototype"
    },
    {
     "t": "DermNet · Postinflammatory hyperpigmentation",
     "url": "https://dermnetnz.org/topics/postinflammatory-hyperpigmentation"
    },
    {
     "t": "DermNet · Pityriasis alba",
     "url": "https://dermnetnz.org/topics/pityriasis-alba"
    },
    {
     "t": "PassMedicine · Vitiligo",
     "url": "https://qbankly.app/library?e=3&doc=1413"
    },
    {
     "t": "DermNet · Dermoscopy (respaldo de Dermoscopedia)",
     "url": "https://dermnetnz.org/topics/dermoscopy"
    },
    {
     "t": "DermNet Quiz · Brown skin lesions – 12 cases",
     "url": "https://dermnetnz.org/quizzes/brown-skin-lesions-12-cases",
     "cantidad": "7 casos"
    }
   ],
   "hecho": "Vídeo B&B con free recall + tabla de fototipos + tabla de hipopigmentaciones + 7 casos DermNet reales corregidos + ≤3 tarjetas.",
   "planB": "Casos #21 (Dermatopathology. Case 21) y #194 (Surgical Dermatology. Case 24), la imagen dermatoscópica y el Pictorial de hoy NO se pierden: al recuperar el acceso, cada sesión hace 1 caso pendiente en el slot del Pictorial (variable de ajuste) hasta ponerte al día; el tema del Pictorial de ese día pasa a la cola. El caso nunca se salta.",
   "aviso": "AccessDerma caducado: renueva el acceso remoto desde la red de tu institución (campus/VPN u «Sign in via OpenAthens/Shibboleth»); mientras, manda el PLAN B (sin casos, Pictorial ni libros AccessDerma)."
  }
 },
 "5": {
  "d": 5,
  "fecha": "2026-11-30",
  "casoIds": [
   36,
   84
  ],
  "planA": {
   "franja": "13:30–14:15",
   "plan": "research-derma",
   "titulo": "DERMA d5 · Anatomía facial + DANGER ZONES — plan A (AccessDerma)",
   "totalMin": 45,
   "pasos": [
    {
     "min": 3,
     "que": "Anki APEX::DERMA::A · repaso FSRS de las tarjetas de MECANISMO de las sesiones anteriores + fallos del ledger",
     "como": "Solo Good/Again · deuda a cero; si no hay repasos, recita en voz alta la tarjeta de la sesión anterior."
    },
    {
     "min": 9,
     "que": "CASO CIEGO 1/2 · Medical Dermatology. Case 006 (#36 de la permutación) — Dermatology Cases for Board Review",
     "como": "① solo la imagen: dictado de los 8 ejes en la app (lesión 1ª/2ª, tamaño, color, forma, borde, configuración, distribución, palpación) ② diferencial de 3 ANTES de leer ③ viñeta + responde ④ discusión → 1 tarjeta de MECANISMO + 1 oclusión de imagen · registra ✓/✗ desde el chip «Caso #36» (módulo CORE: Med).",
     "enlace": {
      "t": "Caso #36 · Medical Dermatology. Case 006",
      "url": "https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=622595&gbosContainerID=310&viewByNumber=false&groupid=1546"
     }
    },
    {
     "min": 9,
     "que": "CASO CIEGO 2/2 · Medical Dermatology. Case 054 (#84 de la permutación) — Dermatology Cases for Board Review",
     "como": "① solo la imagen: dictado de los 8 ejes en la app (lesión 1ª/2ª, tamaño, color, forma, borde, configuración, distribución, palpación) ② diferencial de 3 ANTES de leer ③ viñeta + responde ④ discusión → 1 tarjeta de MECANISMO + 1 oclusión de imagen · registra ✓/✗ desde el chip «Caso #84» (módulo CORE: Med).",
     "enlace": {
      "t": "Caso #84 · Medical Dermatology. Case 054",
      "url": "https://dermatology.mhmedical.com/CaseContent.aspx?gbosID=622547&gbosContainerID=310&viewByNumber=false&groupid=1546"
     }
    },
    {
     "min": 2,
     "que": "IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopy Self-Assessment 2e › Chapter 2: Head and Neck → la 1.ª imagen",
     "como": "Estructuras → patrón → diagnóstico en voz alta ANTES de revelar · registra ✓/✗ en ①b.",
     "enlace": {
      "t": "Chapter 2: Head and Neck",
      "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2929&sectionid=245860434"
     }
    },
    {
     "min": 10,
     "que": "PICTORIAL REVIEW 4e · Create Custom Quiz › «Surgery and Anatomy» = 10 (de 13)",
     "como": "En la página del banco deja vacío «Create Random Quiz»; en «Create Custom Quiz» escribe 10 en Surgery and Anatomy → «Start Custom Quiz» · ~60 s/Q · antes de las opciones: nombra la estructura/arteria o la subunidad estética de la imagen · el quiz no se puede guardar a medias: termínalo · cada fallo → botón «fallo →» del banco (nº = posición en el quiz).",
     "enlace": {
      "t": "Pictorial Review 4e · Create Custom Quiz",
      "url": "https://dermatology.mhmedical.com/qa.aspx?resourceid=3626"
     }
    },
    {
     "min": 10,
     "que": "LECTURA · Dermatologic Surgery › Chapter 1: Surgical Anatomy, Surface Anatomy, and Cosmetic Subunits",
     "como": "Solo los apartados de arterias faciales y zonas de riesgo · dibuja el mapa (a. facial → angular; supratroclear/supraorbitaria → oftálmica; dorsal nasal; rama frontal de la temporal superficial). Longitud no medida (acceso caducado).",
     "enlace": {
      "t": "Chapter 1: Surgical Anatomy, Surface Anatomy, and Cosmetic Subunits",
      "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2811&sectionid=245216992"
     }
    },
    {
     "min": 2,
     "que": "CIERRE · free recall en voz alta + tarjetas de MECANISMO",
     "como": "Free recall en voz alta de lo de hoy (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo («Marcar átomo como hecho»). Recita las 2 zonas de máximo riesgo (glabela, nariz) y por qué (ceguera por la a. oftálmica)."
    }
   ],
   "recursos": [
    {
     "t": "Dermatology Cases for Board Review (listado)",
     "url": "https://dermatology.mhmedical.com/cases.aspx?groupid=1546",
     "cantidad": "2 casos"
    },
    {
     "t": "Pictorial Review 4e",
     "url": "https://dermatology.mhmedical.com/qa.aspx?resourceid=3626",
     "cantidad": "10Q"
    },
    {
     "t": "Chapter 1: Surgical Anatomy, Surface Anatomy, and Cosmetic Subunits",
     "url": "https://dermatology.mhmedical.com/content.aspx?bookid=2811&sectionid=245216992"
    }
   ],
   "hecho": "2 casos registrados + 1 imagen + quiz de 10 terminado + mapa arterial dibujado + ≤3 tarjetas.",
   "planB": "Sin acceso a AccessDerma → PLAN B."
  },
  "planB": {
   "franja": "13:30–14:15",
   "plan": "research-derma",
   "titulo": "DERMA d5 · Anatomía facial + DANGER ZONES — PLAN B (AccessDerma caducado)",
   "totalMin": 45,
   "pasos": [
    {
     "min": 3,
     "que": "Anki APEX::DERMA::A · repaso FSRS de las tarjetas de MECANISMO de las sesiones anteriores + fallos del ledger",
     "como": "Solo Good/Again · deuda a cero; si no hay repasos, recita en voz alta la tarjeta de la sesión anterior."
    },
    {
     "min": 9,
     "que": "StatPearls · «Anatomy, Head and Neck: Facial Artery» (NBK536932) › «Introduction» + «Structure and Function» + «Physiologic Variants» + «Surgical Considerations» + «Clinical Significance» + su Figura 1 (852 palabras + 1 figura = 8,77′ medidos a 100 palabras/min)",
     "como": "Lee esas secciones (Embryology, Blood Supply, Nerves y Muscles no forman parte del átomo: el átomo es trayecto + plano + riesgo) · la Figura 1 primero: tapa el pie y sigue el trayecto de la a. facial hasta la angular · subraya dónde es superficial y su relación con el surco nasogeniano.",
     "enlace": {
      "t": "StatPearls · Facial Artery (NBK536932)",
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK536932/"
     }
    },
    {
     "min": 2,
     "que": "PubMed · Cotofana S et al. «Vascular Safe Zones for Facial Soft Tissue Filler Injections» (Plast Aesthet Nurs 2022) — resumen (177 palabras = 1,77′ medidos)",
     "como": "Lee el resumen y apunta qué zonas llama «seguras» y en qué plano (resumen medido el 17-nov-2026 a 100 palabras/min).",
     "enlace": {
      "t": "PubMed 36469395",
      "url": "https://pubmed.ncbi.nlm.nih.gov/36469395/"
     }
    },
    {
     "min": 13,
     "que": "PMC (acceso abierto) · «A Consensus on Minimizing the Risk of Hyaluronic Acid Embolic Visual Loss…» (ASJ 2020) › «Question 3: Are There Areas of Increased Risk…» (655 palabras) + su Tabla 2 «Regions of the Face and Their Relative Risk of Blindness» (72) + «Key Points» del inicio (61) + pies de las Figuras 1-3 (335) = 1.123 palabras + 3 figuras (11,98′ medidos a 100 palabras/min)",
     "como": "La Pregunta 3 con su Tabla 2 y las 3 figuras: qué zonas son de alto riesgo y por qué (anastomosis con la a. oftálmica, Figura 3); los «Key Points», el mecanismo en 4 líneas · es la lectura del d20, aquí solo la anatomía y el riesgo por región.",
     "enlace": {
      "t": "PMC7427155",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7427155/"
     }
    },
    {
     "min": 11,
     "que": "TABLA de las 6 arterias de riesgo, hecha por TI (sin IA) desde lo leído hoy: facial · angular · supratroclear · supraorbitaria · dorsal nasal · rama frontal de la temporal superficial (6 filas × trayecto · plano/profundidad · qué produce su oclusión ≈ 1,8′ por fila)",
     "como": "Fuentes: StatPearls (a. facial y angular, Figura 1) + Figura 3 y Tabla 2 del consenso (ramas de la oftálmica y riesgo por región) · celda que no puedas llenar con lo leído = «?» en rojo y va como pregunta al Anki, nunca inventada."
    },
    {
     "min": 5,
     "que": "MAPA DE MEMORIA (recall en blanco)",
     "como": "Dibuja la cara con las 6 arterias y las 2 zonas de máximo riesgo SIN mirar; compáralo con tu tabla, con la Figura 1 de StatPearls y con la Figura 3 y la Tabla 2 del consenso, y corrige en rojo: es tu verificación (sin preguntas generadas: lo que no recuerdes = tarjeta)."
    },
    {
     "min": 2,
     "que": "CIERRE · free recall en voz alta + tarjetas de MECANISMO",
     "como": "Free recall en voz alta de lo de hoy (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo («Marcar átomo como hecho»)."
    }
   ],
   "recursos": [
    {
     "t": "StatPearls · «Anatomy, Head and Neck: Facial Artery» (NBK536932)",
     "url": "https://www.ncbi.nlm.nih.gov/books/NBK536932/",
     "min": 9
    },
    {
     "t": "PubMed · Vascular Safe Zones (Cotofana 2022)",
     "url": "https://pubmed.ncbi.nlm.nih.gov/36469395/"
    },
    {
     "t": "PMC · Consenso de pérdida visual embólica (2020)",
     "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7427155/"
    }
   ],
   "hecho": "StatPearls leído + tabla de las 6 arterias hecha por ti + mapa de memoria corregido contra las figuras reales + ≤3 tarjetas.",
   "planB": "Casos #36 (Medical Dermatology. Case 006) y #84 (Medical Dermatology. Case 054), la imagen dermatoscópica y el Pictorial de hoy NO se pierden: al recuperar el acceso, cada sesión hace 1 caso pendiente en el slot del Pictorial (variable de ajuste) hasta ponerte al día; el tema del Pictorial de ese día pasa a la cola. El caso nunca se salta.",
   "aviso": "AccessDerma caducado: renueva el acceso remoto desde la red de tu institución (campus/VPN u «Sign in via OpenAthens/Shibboleth»); mientras, manda el PLAN B (sin casos, Pictorial ni libros AccessDerma)."
  }
 }
};
