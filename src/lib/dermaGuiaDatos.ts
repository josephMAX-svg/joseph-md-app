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
  "s1Hasta": "2026-10-27",
  "s23Hasta": "2026-11-10",
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
export const DERMA_VELOCIDAD = {"s1Hasta":"2026-10-27","s23Hasta":"2026-11-10"};

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

/** Sesiones CURADAS (d1-d5): plan A (AccessDerma) y plan B (acceso remoto caducado), 13:30–14:15. */
export const DERMA_GUIA_CURADA: Record<number, DermaGuiaCurada> = {
 "1": {
  "d": 1,
  "fecha": "2026-10-21",
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
     "que": "Anki · crear el mazo APEX::DERMA::A (preset FSRS) — 1.ª sesión: aún no hay repasos",
     "como": "Preset FSRS (retention 0,90) · tag step1 en las tarjetas de los átomos que cuentan doble para el Step 1 · las tarjetas de hoy se crean al cerrar cada caso."
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
     "que": "Anki · crear el mazo APEX::DERMA::A (preset FSRS) — 1.ª sesión: aún no hay repasos",
     "como": "Preset FSRS (retention 0,90) · tag step1 en las tarjetas de los átomos que cuentan doble para el Step 1 · las tarjetas de hoy se crean al cerrar cada caso."
    },
    {
     "min": 12,
     "que": "uWorld Step 1 · System «Dermatology (Inflammatory dermatoses and bullous diseases)» · Unused · 4Q · Tutor (28 preguntas en el System)",
     "como": "Qbankly › QBanks › uWorld - USMLE Step 1 › Test Composer: marca SOLO ese System → Status Unused → 4 preguntas → Tutor → BEGIN TEST · en cada imagen, ANTES de las opciones: lesión 1ª + 2ª + color + distribución (8 ejes del dictado) y diferencial de 3 · ~3′/Q en inglés, sin prisa · cuentan doble para el Step 1 (no se repiten después).",
     "enlace": {
      "t": "Qbankly › QBanks (uWorld Step 1)",
      "url": "https://qbankly.app/qbanks"
     }
    },
    {
     "min": 9,
     "que": "LECTURA (español) · ProMIR Dermatología › cap. 1 «Introducción. Conceptos generales» › 2.1. Lesiones primarias + 2.2. Lesiones secundarias (8.5′ medidos · 586 palabras · 11 figuras)",
     "como": "Tapa el texto de cada figura y nombra la lesión ANTES de leer · Whole Page Rule (apartado entero) · al Shopping List: los términos que fallaste en el pre-test.",
     "enlace": {
      "t": "ProMIR · Dermatología cap. 1",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646"
     }
    },
    {
     "min": 6,
     "que": "DermNet › «Terminology» › Describing skin conditions + Morphology + Secondary changes (762 palabras)",
     "como": "Solo esos 3 apartados, a ~120 palabras/min · cada término en inglés que no sepas → glosario EN-ES del cuaderno (papule = pápula, wheal = habón, crust = costra…).",
     "enlace": {
      "t": "DermNet · Terminology",
      "url": "https://dermnetnz.org/topics/terminology"
     }
    },
    {
     "min": 13,
     "que": "Proyecto Claude «AESTHETIC DERMATOLOGY» (tus libros) · DICTADO INVERSO de morfología",
     "como": "Pídele: «Dame 6 descripciones morfológicas de lesiones de mis libros SIN diagnóstico; yo nombro la lesión primaria y la secundaria; corrígeme citando libro y página». 6 rondas de ~2′ · cada fallo → tarjeta.",
     "enlace": {
      "t": "Proyecto AESTHETIC DERMATOLOGY",
      "url": "https://claude.ai/project/019d135e-b442-71fc-bd3c-e2b6ea78796f"
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
     "cantidad": "4Q"
    },
    {
     "t": "ProMIR · Dermatología cap. 1",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646",
     "min": 8.5
    },
    {
     "t": "DermNet · Terminology",
     "url": "https://dermnetnz.org/topics/terminology"
    },
    {
     "t": "Proyecto Claude · AESTHETIC DERMATOLOGY",
     "url": "https://claude.ai/project/019d135e-b442-71fc-bd3c-e2b6ea78796f"
    }
   ],
   "hecho": "4Q de uWorld respondidas describiendo la imagen antes de las opciones + §2.1-2.2 de ProMIR leídas + 3 apartados de DermNet + 6 rondas de dictado inverso + ≤3 tarjetas.",
   "planB": "Casos #192 (Surgical Dermatology. Case 22) y #43 (Medical Dermatology. Case 013), la imagen dermatoscópica y el Pictorial de hoy NO se pierden: al recuperar el acceso, cada sesión hace 1 caso pendiente en el slot del Pictorial (variable de ajuste) hasta ponerte al día; el tema del Pictorial de ese día pasa a la cola. El caso nunca se salta.",
   "aviso": "AccessDerma: renueva el acceso remoto desde la red de tu institución (campus/VPN, o Sign in via OpenAthens/Shibboleth). Hasta entonces manda el PLAN B (sin casos ni Pictorial ni libros AccessDerma)."
  }
 },
 "2": {
  "d": 2,
  "fecha": "2026-10-23",
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
     "que": "uWorld Step 1 · System «Dermatology (Skin and soft tissue infections)» · Unused · 3Q · Tutor (18 preguntas en el System)",
     "como": "Qbankly › QBanks › uWorld - USMLE Step 1 › Test Composer: marca SOLO ese System → Status Unused → 3 preguntas → Tutor → BEGIN TEST · antes de las opciones nombra la configuración (anular = tiña, herpetiforme = HSV, dermatomal = zóster) y el color · cuentan doble para el Step 1 (no se repiten después).",
     "enlace": {
      "t": "Qbankly › QBanks (uWorld Step 1)",
      "url": "https://qbankly.app/qbanks"
     }
    },
    {
     "min": 6,
     "que": "LECTURA (español) · ProMIR Dermatología › cap. 1 › 2.3. Exploración dermatológica (6′ medidos · 359 palabras · 5 figuras · tabla 1-1 de signos)",
     "como": "Whole Page Rule; los signos de la tabla 1-1 (Darier, Nikolsky, Koebner…) → 1 tarjeta cada uno que no supieras.",
     "enlace": {
      "t": "ProMIR · Dermatología cap. 1",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646"
     }
    },
    {
     "min": 6,
     "que": "DermNet › «Terminology» › Distribution + Configuration of lesions + Colour (671 palabras)",
     "como": "~120 palabras/min · completa tu tabla de configuraciones con los términos en inglés.",
     "enlace": {
      "t": "DermNet · Terminology",
      "url": "https://dermnetnz.org/topics/terminology"
     }
    },
    {
     "min": 13,
     "que": "B&B Step 1 › Dermatology › «06 - Vascular Lesions» (11:04) — color y distribución de las lesiones vasculares (por título; contenido no verificado)",
     "como": "Qbankly › Video Library › B&B Step 1 › Dermatology › General Topics › 06 - Vascular Lesions · 1,0× con subtítulos en inglés (CC) · 13′ con pausas (regla de velocidad del Step 1) · al terminar, free recall de 60 s en el cuaderno.",
     "enlace": {
      "t": "B&B · 06 - Vascular Lesions",
      "url": "https://qbankly.app/videos"
     }
    },
    {
     "min": 3,
     "que": "DermNet › «Blaschko lines» (≈250 palabras + 2 tablas + figuras)",
     "como": "Mira las figuras de tronco y extremidad y dibuja el patrón en V/S sobre una silueta.",
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
     "min": 3,
     "que": "CIERRE · free recall en voz alta + tarjetas de MECANISMO",
     "como": "Free recall en voz alta de lo de hoy (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo («Marcar átomo como hecho»). ≤3 tarjetas en APEX::DERMA::A."
    }
   ],
   "recursos": [
    {
     "t": "Qbankly › QBanks (uWorld Step 1)",
     "url": "https://qbankly.app/qbanks",
     "cantidad": "3Q"
    },
    {
     "t": "ProMIR · Dermatología cap. 1",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646",
     "min": 6
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
   "hecho": "3Q de uWorld + §2.3 de ProMIR + 3 apartados de DermNet + vídeo B&B visto con su free recall + dibujo de Blaschko + 1 imagen dermatoscópica + ≤3 tarjetas.",
   "planB": "Casos #112 (Medical Dermatology. Case 082) y #166 (Pediatric Dermatology. Case 26), la imagen dermatoscópica y el Pictorial de hoy NO se pierden: al recuperar el acceso, cada sesión hace 1 caso pendiente en el slot del Pictorial (variable de ajuste) hasta ponerte al día; el tema del Pictorial de ese día pasa a la cola. El caso nunca se salta.",
   "aviso": "AccessDerma: renueva el acceso remoto desde la red de tu institución (campus/VPN, o Sign in via OpenAthens/Shibboleth). Hasta entonces manda el PLAN B (sin casos ni Pictorial ni libros AccessDerma)."
  }
 },
 "3": {
  "d": 3,
  "fecha": "2026-10-27",
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
     "como": "11′ = 8Q a 77 s/Q (2Q más solo si te sobra tiempo) · el pool de la app no tiene preguntas de este capítulo (0; 30 de Dermatología en total) → se usan las 11 preguntas MIR citadas en el capítulo (más recientes primero) · si te sobra tiempo: 2008-144 · 2005-144. La lista «Pool oficial» de la app trae preguntas de OTROS capítulos de Dermatología (el cap. 1 no tiene en el pool): déjalas para el banqueo y registra el neto con «Registrar 10Q MIR-Derma» (total 8).",
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
     "como": "11′ = 8Q a 77 s/Q (2Q más solo si te sobra tiempo) · el pool de la app no tiene preguntas de este capítulo (0; 30 de Dermatología en total) → se usan las 11 preguntas MIR citadas en el capítulo (más recientes primero) · si te sobra tiempo: 2008-144 · 2005-144. La lista «Pool oficial» de la app trae preguntas de OTROS capítulos de Dermatología (el cap. 1 no tiene en el pool): déjalas para el banqueo y registra el neto con «Registrar 10Q MIR-Derma» (total 8).",
     "enlace": {
      "t": "ProMIR · Dermatología cap. 1",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646"
     }
    },
    {
     "min": 8,
     "que": "LECTURA (español) · ProMIR Dermatología › cap. 1 › 1.1. Epidermis + 1.2. Dermis + 1.3. Hipodermis + 3. Nociones de Anatomía Patológica. Alteraciones histológicas básicas (7.5′ medidos · 881 palabras · 2 figuras)",
     "como": "Primero el apartado de cada pregunta que fallaste (2020-004 → §3 · 2011-225 → §1.2) · Whole Page Rule.",
     "enlace": {
      "t": "ProMIR · Dermatología cap. 1",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc646"
     }
    },
    {
     "min": 18,
     "que": "B&B Step 1 › Dermatology › «01 - Skin» (14:36) — capas de la piel (por título)",
     "como": "Qbankly › Video Library › B&B Step 1 › Dermatology › General Topics › 01 - Skin · 1,0× con subtítulos en inglés (CC) · 18′ con pausas (regla de velocidad del Step 1) · al terminar, free recall de 60 s en el cuaderno.",
     "enlace": {
      "t": "B&B · 01 - Skin",
      "url": "https://qbankly.app/videos"
     }
    },
    {
     "min": 3,
     "que": "PassMedicine (Library de Qbankly) › «Epidermis» — artículo corto (sin medir)",
     "como": "Léelo y escribe de memoria las 5 capas de la epidermis con 1 dato de cada una.",
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
   "aviso": "AccessDerma: renueva el acceso remoto desde la red de tu institución (campus/VPN, o Sign in via OpenAthens/Shibboleth). Hasta entonces manda el PLAN B (sin casos ni Pictorial ni libros AccessDerma)."
  }
 },
 "4": {
  "d": 4,
  "fecha": "2026-10-29",
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
     "min": 6,
     "que": "B&B Step 1 › Dermatology › «05 - Pigment Disorders» (6:42)",
     "como": "Qbankly › Video Library › B&B Step 1 › Dermatology › General Topics › 05 - Pigment Disorders · 1,25× con subtítulos EN · 6′ con pausas (regla de velocidad del Step 1) · al terminar, free recall de 60 s en el cuaderno.",
     "enlace": {
      "t": "B&B · 05 - Pigment Disorders",
      "url": "https://qbankly.app/videos"
     }
    },
    {
     "min": 9,
     "que": "DermNet › «Skin phototype» (clasificación de Fitzpatrick, ≈230 palabras + 6 figuras) + «Postinflammatory hyperpigmentation» (≈440 palabras + 8 figuras)",
     "como": "Tabla fototipo I-VI → quema/broncea → cómo se ve el eritema y la PIH en cada uno.",
     "enlace": {
      "t": "DermNet · Skin phototype",
      "url": "https://dermnetnz.org/topics/skin-phototype"
     }
    },
    {
     "min": 5,
     "que": "Diferencial de hipopigmentación · DermNet «Pityriasis alba» (clinical features, 155 palabras + 4 figuras) + PassMedicine «Vitiligo» (Library de Qbankly, sin medir)",
     "como": "Tabla de 3 columnas: pitiriasis alba vs vitíligo vs pitiriasis versicolor (borde, escama, Wood).",
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
     "min": 18,
     "que": "Proyecto Claude «AESTHETIC DERMATOLOGY» (tus libros) · viñetas en fototipo IV-VI",
     "como": "Pídele 5 viñetas de tus libros en piel oscura SIN diagnóstico (eritema, PIH, melasma, queloide…); tú describes y diferencias (PIH vs melasma vs liquen plano pigmentoso · queloide vs cicatriz hipertrófica); que corrija citando libro y página. Puente con SR-2 (L5).",
     "enlace": {
      "t": "Proyecto AESTHETIC DERMATOLOGY",
      "url": "https://claude.ai/project/019d135e-b442-71fc-bd3c-e2b6ea78796f"
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
     "min": 6
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
     "t": "Proyecto Claude · AESTHETIC DERMATOLOGY",
     "url": "https://claude.ai/project/019d135e-b442-71fc-bd3c-e2b6ea78796f"
    }
   ],
   "hecho": "Vídeo B&B con free recall + tabla de fototipos + tabla de hipopigmentaciones + 5 viñetas corregidas + ≤3 tarjetas.",
   "planB": "Casos #21 (Dermatopathology. Case 21) y #194 (Surgical Dermatology. Case 24), la imagen dermatoscópica y el Pictorial de hoy NO se pierden: al recuperar el acceso, cada sesión hace 1 caso pendiente en el slot del Pictorial (variable de ajuste) hasta ponerte al día; el tema del Pictorial de ese día pasa a la cola. El caso nunca se salta.",
   "aviso": "AccessDerma: renueva el acceso remoto desde la red de tu institución (campus/VPN, o Sign in via OpenAthens/Shibboleth). Hasta entonces manda el PLAN B (sin casos ni Pictorial ni libros AccessDerma)."
  }
 },
 "5": {
  "d": 5,
  "fecha": "2026-11-02",
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
     "min": 20,
     "que": "Proyecto Claude «AESTHETIC DERMATOLOGY» (tus libros) · tabla de arterias de riesgo",
     "como": "Pídele la tabla de arterias de riesgo (facial, angular, supratroclear, supraorbitaria, dorsal nasal, rama frontal de la temporal superficial): trayecto, plano/profundidad y qué produce su oclusión, con libro y página; después 8 preguntas de verificación que respondes sin mirar.",
     "enlace": {
      "t": "Proyecto AESTHETIC DERMATOLOGY",
      "url": "https://claude.ai/project/019d135e-b442-71fc-bd3c-e2b6ea78796f"
     }
    },
    {
     "min": 5,
     "que": "PubMed · Cotofana S et al. «Vascular Safe Zones for Facial Soft Tissue Filler Injections» (Plast Aesthet Nurs 2022) — resumen",
     "como": "Lee el resumen y apunta qué zonas llama «seguras» y en qué plano.",
     "enlace": {
      "t": "PubMed 36469395",
      "url": "https://pubmed.ncbi.nlm.nih.gov/36469395/"
     }
    },
    {
     "min": 9,
     "que": "PMC (acceso abierto) · «A Consensus on Minimizing the Risk of Hyaluronic Acid Embolic Visual Loss…» (ASJ 2020) › «Question 3: Are There Areas of Increased Risk…» (789 palabras) + pies de las Figuras 1-2",
     "como": "Solo la Pregunta 3 y las figuras: qué zonas son de alto riesgo y por qué (anastomosis con la a. oftálmica) · es la lectura del d20, aquí solo la anatomía.",
     "enlace": {
      "t": "PMC7427155",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7427155/"
     }
    },
    {
     "min": 6,
     "que": "MAPA DE MEMORIA",
     "como": "Dibuja la cara con las 6 arterias y las 2 zonas de máximo riesgo sin mirar; compáralo con la tabla del proyecto y corrige en rojo."
    },
    {
     "min": 2,
     "que": "CIERRE · free recall en voz alta + tarjetas de MECANISMO",
     "como": "Free recall en voz alta de lo de hoy (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo («Marcar átomo como hecho»)."
    }
   ],
   "recursos": [
    {
     "t": "Proyecto Claude · AESTHETIC DERMATOLOGY",
     "url": "https://claude.ai/project/019d135e-b442-71fc-bd3c-e2b6ea78796f"
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
   "hecho": "Tabla de arterias corregida + 8 preguntas respondidas + mapa de memoria corregido + ≤3 tarjetas.",
   "planB": "Casos #36 (Medical Dermatology. Case 006) y #84 (Medical Dermatology. Case 054), la imagen dermatoscópica y el Pictorial de hoy NO se pierden: al recuperar el acceso, cada sesión hace 1 caso pendiente en el slot del Pictorial (variable de ajuste) hasta ponerte al día; el tema del Pictorial de ese día pasa a la cola. El caso nunca se salta.",
   "aviso": "AccessDerma: renueva el acceso remoto desde la red de tu institución (campus/VPN, o Sign in via OpenAthens/Shibboleth). Hasta entonces manda el PLAN B (sin casos ni Pictorial ni libros AccessDerma)."
  }
 }
};
