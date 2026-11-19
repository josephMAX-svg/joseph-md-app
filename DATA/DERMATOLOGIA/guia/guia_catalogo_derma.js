/**
 * guia_catalogo_derma.js — catálogo CURADO de la guía Derma «qué · cuánto · cómo» (lo lee gen_derma_guia.js → src/lib/dermaGuiaDatos.ts).
 * Aquí solo hay decisiones (qué recurso y en qué orden); los NÚMEROS salen de las fuentes vía el contexto `C` del generador:
 *   · casos: DATA/DERMATOLOGIA/_scrape/accessderma_cases1546.json (listado real 18-oct: Dermatopathology 1-30 · Medical 31-140 ·
 *     Pediatric 141-170 · Surgical 171-200 → C.caso(pos) da «<Área> Dermatology. Case NN» + URL directa CaseContent.aspx)
 *   · libros: accessderma_clinica_tocs.json + accessderma_estructura.json (índices leídos el 18-oct / 10-jun) → C.cap(bookid, sid)
 *   · B&B: DATA/USMLE/qbankly_bb_step1_videos.tsv → C.bb(id) (duración real) · C.bbMin(id, fecha) (velocidad de la semana, regla E1)
 *   · uWorld Step 1: qbankly_uworld_step1_filtros.tsv → C.uw(id) (nº real de preguntas del System)
 *   · ProMIR Dermatología cap. 1: medición E2 (DATA/MIR/guia_lectura_semana1-2.json → derma[]) → C.pmd1Lectura(d) · C.pmd1Test(d)
 *   · DermNet: palabras por apartado medidas el 18-oct (curl + recuento) → minutos a 100 palabras/min + 0,25′ por figura (regla fija de lectura en inglés;
 *     hasta el lote 1-bis, 120 palabras/min)
 * Pictorial Review 4e (qa.aspx?resourceid=3626) · «Create Custom Quiz»: 34 temas, 381 preguntas (leído el 18-oct). La asignación por
 * sesión NO repite preguntas (el generador aborta si un tema se pasa de sus preguntas): solo las sesiones NO-ProMIR con banco Pictorial
 * consumen tema; en las sesiones ProMIR (d ≡ 0 mod 3) el slot es el test del capítulo.
 * v6.02c (18-oct-2026, E3): nuevo — d1-d5 (v6.06: lun 2 · mié 4 · vie 6 · mar 10 · jue 12-nov; v6.05: mar 27 · jue 29-oct · lun 2 · mié 4 · vie 6-nov; v6.03: mié 21 · vie 23 · mar 27 · jue 29-oct · lun 2-nov; v6.02: lun 19 · mié 21 · vie 23 · mar 27 · jue 29-oct) curadas con plan A (AccessDerma) y plan B
 *   (acceso remoto caducado); el resto de sesiones por regla en src/lib/dermaGuia.ts.
 * v6.02c F2 (18-oct-2026, hallazgos E6): CME_DESPLAZADO (d12 → lectura del átomo, módulo 4 al d42) · respaldo DermNet «Dermoscopy» en las
 *   imágenes de Dermoscopedia (d2 · d4) · el test del d3 ya no cita «el caso de 13:36» (lo corrige gen_guia_lectura.js).
 * v6.09b · lote 1-ter (17-nov-2026, revisión R del lote 1-bis, hallazgo 4): DermNet/PMC del plan B a la regla fija de inglés (100 palabras/min + 0,25′/figura;
 *   antes 120) y cada paso declara «(N′ medidos»: d1 (mié 18-nov) «Terminology» 6′ → 8′ (7,62′; el dictado inverso 13′ → 11′) · d2 (vie 20-nov)
 *   «Terminology» 6′ → 7′ (6,71′), Blaschko con su alcance medido (2 apartados + 2 figuras = 1,44′ + dibujo 1,5′; el resto «no forma parte del átomo») y
 *   cierre 3′ → 2′ · d4 (jue 26-nov) 9′ → 10′ (10,15′; viñetas 16′ → 15′ = 3 de ≈5′, antes «5») · d5 (lun 30-nov) PMC 9′ → 11′ (12,07′; mapa 6′ → 4′).
 * v6.09b · lote 1-quater (17-nov-2026, revisión R2 del lote 1-ter): uWorld del plan B a la regla fija del modo Tutor (90 s + 0,85′ = 2,35′/Q): d1 4Q → 5Q en
 *   12′ · d2 3Q → 4Q en 9′ (el total de F1 por System no cambia: lo compensan las sesiones por regla, UW_TUTOR_F1 de dermaGuia.ts) · PassMedicine «Epidermis»
 *   (d3) y «Vitiligo» (d4) ACOTADOS al tiempo (piden sesión: no se pueden medir) · d5: resumen de PubMed 177 palabras → 5′ = 0,35 → 2′; el consenso PMC
 *   re-medido (la Pregunta 3 son 655 palabras: las «789» contaban dentro el pie de la Figura 3) + su Tabla 2 + «Key Points» + Figuras 1-3 = 11,98′ en 13′;
 *   mapa de memoria 4′ → 5′ (compara también con la Figura 3 y la Tabla 2) · ProMIR de d1-d3 a 150 palabras/min (min150 de E2) · Blaschko con el total primero.
 * v6.10e (18-nov-2026 · BASE CERO + PREGUNTAS REALES, orden de Joseph: «las preguntas tienen que ser REALES · todos partimos de CERO»): fuera el proyecto
 *   Claude «AESTHETIC DERMATOLOGY» (viñetas / dictado / tabla + preguntas generadas por IA). Lo sustituyen casos REALES de los DermNet Quizzes (imagen real
 *   + respuesta de DermNet tras «Show Answers»; ~2′/caso según el propio quiz) con su rango de casos por sesión (DERMA_QUIZ_F1), una lectura real medida
 *   (d5: StatPearls «Facial Artery»; d6: DermNet «Three-point checklist», el algoritmo para no expertos) o ProMIR (MIR oficiales) cuando el hueco no
 *   cuadra con casos de 2′ (d15). Mismos minutos y fechas; síntesis del método en DATA/DERMATOLOGIA/METODO_BASE_CERO.md.
 */
'use strict';

/** v6.10e (18-nov-2026): DermNet Quizzes (https://dermnetnz.org/quizzes — públicos y gratuitos, escritos por DermNet; cada caso = imagen real + «Name the
 *  skin lesion/s» / «What is the diagnosis?» y la respuesta con su nota docente tras «Show Answers»). Leído el 18-nov-2026: título, nº de casos (páginas
 *  /case/N que existen) y el tiempo por caso que declara el propio quiz («Each case should take approximately 2 minutes»; 5′ en «Mixed diagnoses» 3-11).
 *  Solo slug · título · nº · minutos (nada del contenido). */
const DERMNET_QUIZZES = {
  'acne-16-cases': { t: 'Acne – 16 cases', n: 16, min: 2 },
  'acneiform-eruptions-12-cases': { t: 'Acneiform eruptions – 12 cases', n: 12, min: 2 },
  'annular-plaque-12-cases': { t: 'Annular plaque – 12 cases', n: 12, min: 2 },
  'benign-melanocytic-naevi-11-cases': { t: 'Benign melanocytic naevi – 11 cases', n: 11, min: 2 },
  'blistering-conditions-affecting-the-feet-12-cases': { t: 'Blistering conditions affecting the feet – 12 cases', n: 12, min: 2 },
  'brown-skin-lesions-12-cases': { t: 'Brown skin lesions – 12 cases', n: 12, min: 2 },
  'cause-of-contact-allergic-dermatitis-10-cases': { t: 'Causes of contact allergic dermatitis – 10 cases', n: 10, min: 2 },
  'cutaneous-adverse-reactions-10-cases': { t: 'Cutaneous adverse reactions – 10 cases', n: 10, min: 2 },
  'dermoscopy-local-features-quiz': { t: 'Dermoscopy local features quiz', n: 16, min: 2 },
  'dermoscopy-pattern-analysis-quiz': { t: 'Dermoscopy pattern analysis quiz', n: 12, min: 2 },
  // v6.10g (revisión 18-nov-2026 · c11): relevo de la dermatoscopia en 2027 (la lista afín pedía 48 casos y «local features» + «pattern analysis» dejan 24):
  //   los 3 «Dermoscopy quiz» de dermnetnz.org/quizzes, 20 casos cada uno (páginas /case/1-20 existen, /case/21 da 404; contado el 18-nov-2026 sin abrir el quiz).
  //   No declaran tiempo por caso (sinTiempo) → ~2′, el de los otros quizzes de dermatoscopia.
  'dermoscopy-quiz-1-of-3': { t: 'Dermoscopy quiz (1 of 3)', n: 20, min: 2, sinTiempo: true },
  'dermoscopy-quiz-2-of-3': { t: 'Dermoscopy quiz (2 of 3)', n: 20, min: 2, sinTiempo: true },
  'dermoscopy-quiz-3-of-3': { t: 'Dermoscopy quiz (3 of 3)', n: 20, min: 2, sinTiempo: true },
  'different-causes-of-purpura-10-cases': { t: 'Different causes of purpura – 10 cases', n: 10, min: 2 },
  'eczema-14-cases': { t: 'Eczema – 14 cases', n: 14, min: 2 },
  'fungal-infection-12-cases': { t: 'Fungal infections – 12 cases', n: 12, min: 2 },
  'hair-loss-14-cases': { t: 'Hair loss – 14 cases', n: 14, min: 2 },
  'irritant-contact-dermatitis-12-cases': { t: 'Irritant contact dermatitis – 12 cases', n: 12, min: 2 },
  'led-rashes-and-unwell-10-cases': { t: 'Leg rashes and unwell – 10 cases', n: 10, min: 2 },
  'lichen-12-cases': { t: 'Lichen – 12 cases', n: 12, min: 2 },
  'malignant-skin-lesions-10-cases': { t: 'Malignant skin lesions – 10 cases', n: 10, min: 2 },
  'melanoma-terminology-10-cases': { t: 'Melanoma terminology – 10 cases', n: 10, min: 2 },
  'mixed-diagnoses-10-cases-1-of-11': { t: 'Mixed diagnoses – 10 cases (1 of 11)', n: 10, min: 2 },
  'mixed-diagnoses-10-cases-2-of-11': { t: 'Mixed diagnoses – 10 cases (2 of 11)', n: 10, min: 2 },
  'mixed-diagnoses-10-cases-3-of-11': { t: 'Mixed diagnoses – 10 cases (3 of 11)', n: 10, min: 5 },
  'mixed-diagnoses-10-cases-4-of-11': { t: 'Mixed diagnoses – 10 cases (4 of 11)', n: 10, min: 5 },
  'mixed-diagnoses-10-cases-5-of-11': { t: 'Mixed diagnoses – 10 cases (5 of 11)', n: 10, min: 5 },
  'mixed-diagnoses-10-cases-6-of-11': { t: 'Mixed diagnoses – 10 cases (6 of 11)', n: 10, min: 5 },
  'mixed-diagnoses-10-cases-7-of-11': { t: 'Mixed diagnoses – 10 cases (7 of 11)', n: 10, min: 5 },
  'mixed-diagnoses-10-cases-8-of-11': { t: 'Mixed diagnoses – 10 cases (8 of 11)', n: 10, min: 5 },
  'mixed-diagnoses-10-cases-9-of-11': { t: 'Mixed diagnoses – 10 cases (9 of 11)', n: 10, min: 5 },
  'mixed-diagnoses-10-cases-10-of-11': { t: 'Mixed diagnoses – 10 cases (10 of 11)', n: 10, min: 5 },
  'mixed-diagnoses-10-cases-11-of-11': { t: 'Mixed diagnoses – 10 cases (11 of 11)', n: 10, min: 5 },
  'nail-abnormalities-10-cases': { t: 'Nail abnormalities – 10 cases', n: 10, min: 2 },
  'nonmelanoma-skin-cancers-10-cases': { t: 'Nonmelanoma skin cancers – 10 cases', n: 10, min: 2 },
  'pigmented-lesions-10-cases': { t: 'Pigmented lesions – 10 cases', n: 10, min: 2 },
  'psoriasis-16-cases': { t: 'Psoriasis – 16 cases', n: 16, min: 2 },
  'pustules-15-cases': { t: 'Pustules – 15 cases', n: 15, min: 2 },
  'skin-coloured-lumps-and-bumps-12-cases': { t: 'Skin coloured lumps and bumps – 12 cases', n: 12, min: 2 },
  'skin-conditions-due-to-fungi-bacteria-and-viruses-10-cases': { t: 'Skin conditions due to fungi, bacteria and viruses – 10 cases', n: 10, min: 2 },
  'solitary-red-patches-17-cases': { t: 'Solitary red patches – 17 cases', n: 17, min: 2 },
  'telangiectasia-10-cases': { t: 'Telangiectasia – 10 cases', n: 10, min: 2 },
  'vascular-naevi-10-cases': { t: 'Vascular naevi – 10 cases', n: 10, min: 2 },
  'white-skin-lesions-12-cases': { t: 'White skin lesions – 12 cases', n: 12, min: 2 },
};

/** v6.10e (18-nov-2026): F1 — el hueco que llenaba el proyecto Claude, sesión a sesión (clave = d), con casos REALES de un quiz DermNet afín (rango fijo:
 *  `desde` y k = minutos/2, sin repetir casos entre sesiones; el generador lo comprueba) · d6 antes LEE el algoritmo para no expertos (lista de 3 puntos,
 *  medida) · d15 (5′ no cuadra con casos de 2′) → ProMIR cap. 2, 4Q a 77 s/Q. `foco` = qué se entrena (base cero: describir ANTES de diagnosticar). */
const DERMA_QUIZ_F1 = {
  // k = nº de casos (minutos del hueco / ~2′ por caso; el generador comprueba que cuadra con los minutos del paso en 0,85-1,15)
  // v6.10g (revisión 18-nov · c11): k = floor(min/2) para que la aritmética del paso cuadre (d4 15′ → 7 · d9 9′ → 4 · d10 y d11 15′ → 7 · d14 11′ → 5, antes
  //   8 · 5 · 8 · 8 · 6: «8 casos × ~2′ = 16′» en un paso de 15′); el minuto que sobra es para el ledger (lo dice el paso)
  1: { quiz: 'acne-16-cases', desde: 1, k: 5, foco: 'nombra la lesión elemental de cada caso y descríbela con los 8 ejes ANTES de «Show Answers»' }, // 19-nov: sin la lista de lesiones (eran las respuestas de los casos 1-5, en su orden)
  4: { quiz: 'brown-skin-lesions-12-cases', desde: 4, k: 7, foco: 'pigmentación: antes de «Show Answers» di epidérmica (marrón) o dérmica (gris-azul), si es postinflamatoria y qué fototipo crees que tiene' },
  6: { quiz: 'dermoscopy-local-features-quiz', desde: 1, k: 4, lectura: 'tresPuntos', foco: 'aplica la lista de 3 puntos que acabas de leer (asimetría · red atípica · estructuras blanco-azuladas) y nombra la estructura local antes de «Show Answers»' },
  9: { quiz: 'acne-16-cases', desde: 12, k: 4, foco: 'formas clínicas de acné: lesión elemental + gravedad antes de «Show Answers»' },
  10: { quiz: 'blistering-conditions-affecting-the-feet-12-cases', desde: 1, k: 7, foco: 'nivel de la ampolla (tensa = subepidérmica · flácida/erosión = intraepidérmica) antes de «Show Answers»' },
  11: { quiz: 'solitary-red-patches-17-cases', desde: 6, k: 7, foco: 'repaso INTERCALADO de la fase 2 (placas rojas: eccemas, psoriasis… ya vistos): 8 ejes + diferencial de 3 antes de «Show Answers»' },
  12: { quiz: 'cutaneous-adverse-reactions-10-cases', desde: 1, k: 5, foco: 'reacción a fármacos: morfología + latencia + signos de alarma (mucosas, despegamiento) antes de «Show Answers»' },
  13: { quiz: 'different-causes-of-purpura-10-cases', desde: 1, k: 5, foco: 'púrpura palpable (vasculitis) vs no palpable: describe y da 3 causas antes de «Show Answers»' },
  14: { quiz: 'led-rashes-and-unwell-10-cases', desde: 1, k: 5, foco: '¿es celulitis o no?: unilateral/bilateral, borde, dolor, fiebre antes de «Show Answers»' },
  15: { promir: 4, foco: '4 preguntas MIR oficiales más del cap. 2 (las siguientes a las del test y a las 2 de la 2.ª pasada)' },
  16: { quiz: 'skin-conditions-due-to-fungi-bacteria-and-viruses-10-cases', desde: 1, k: 5, foco: '¿virus, bacteria u hongo?: lesión elemental + agrupación (herpetiforme, umbilicada…) antes de «Show Answers»' },
  17: { quiz: 'fungal-infection-12-cases', desde: 1, k: 5, foco: 'tiña vs candida vs versicolor: borde activo, satélites, escama antes de «Show Answers»' },
};

/** v6.10e: lecturas REALES medidas el 18-nov-2026 que sustituyen al proyecto Claude (min = palabras/100 + 0,25′ por figura, regla fija de inglés). */
const LECTURA_REAL = {
  // DermNet › Dermoscopy course › «Three-point checklist» (curl 200): Introduction 163 + Symmetry 69 + Network 84 + Blue-white structures 56 = 372 palabras;
  //   imágenes 4 + 16 + 16 + 8 = 44 → 3,72 + 11 = 14,72′. «Activity» (136) no entra (ejercicio del curso CME, plan A del d10).
  tresPuntos: { t: 'DermNet · Dermoscopy course › «Three-point checklist»', url: 'https://dermnetnz.org/cme/dermoscopy-course/three-point-checklist', secciones: [['Introduction', 163, 4], ['Symmetry', 69, 16], ['Network', 84, 16], ['Blue-white structures', 56, 8]] },
  // StatPearls › «Anatomy, Head and Neck: Facial Artery» (Fakoya AO, Nessel TA, Downs BW; NBK536932, act. 6-may-2024; leído en Chrome el 18-nov-2026):
  //   Introduction 135 + Structure and Function 311 + Physiologic Variants 84 + Surgical Considerations 179 + Clinical Significance 143 = 852 palabras + Figura 1.
  arteriaFacial: { t: 'StatPearls · «Anatomy, Head and Neck: Facial Artery» (NBK536932)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK536932/', secciones: [['Introduction', 135, 0], ['Structure and Function', 311, 0], ['Physiologic Variants', 84, 0], ['Surgical Considerations', 179, 0], ['Clinical Significance', 143, 0], ['Figure 1', 0, 1]] },
};

/** Temas del «Create Custom Quiz» del Pictorial Review 4e (nombre exacto · nº disponible), leídos el 18-oct-2026. */
const PICTORIAL_TEMAS = [
  ['Hair Findings', 9], ['Eye Findings', 10], ['Nail Findings', 8], ['Oral Pathology', 10], ['Genital Dermatology', 6],
  ['Contact Dermatitis', 10], ['Autoimmune Bullous Diseases', 15], ['Disorders of Cornification, Infiltration, and Inflammation', 8],
  ['Pigmentary Disorders', 10], ['Disorders of Fat', 20], ['Cutaneous Tumors', 10], ['Melanoma and Non-Melanoma Skin Cancer', 10],
  ['Vascular Tumors and Malformations', 10], ['Genodermatoses', 10], ['Pediatric Dermatology', 10], ['Cutaneous Infestations', 10],
  ['Viral Diseases', 10], ['Bacterial Diseases', 9], ['Fungal Disease', 15], ['Nutrition-Related Diseases', 10],
  ['Cutaneous Findings Related to Pregnancy', 9], ['Rheumatologic Diseases', 10], ['Metabolic Diseases', 9], ['Dermatologic Medications', 7],
  ['Surgery and Anatomy', 13], ['Cosmetic Dermatology', 10], ['Immunology Review', 4], ['Basic Sciences', 20],
  ['Statistics and Epidemiology', 10], ['Histologic Stains and Special Studies', 15],
  ['Reflectance Confocal Microscopy: The Era of Noninvasive Imaging', 5], ['Radiologic Findings', 10], ['Electron Microscopy', 17],
  ['High-Yield Facts for the Dermatology Boards', 32],
].map(([t, n]) => ({ t, n }));

/**
 * Tema(s) del Pictorial por sesión (ciclo 1, solo sesiones con banco Pictorial 4e y SIN test ProMIR). Afinidad con el átomo del día;
 * un tema grande se reparte entre sesiones (el quiz custom elige al azar dentro del tema: pide solo las que te tocan y apunta cuáles
 * salieron; la siguiente sesión del mismo tema, «Start Custom Quiz» con el resto → si repite alguna, sáltala).
 */
const PICTORIAL_ASIGNACION = {
  1: [['Cutaneous Infestations', 10]],                   // lesiones 1ª/2ª en una misma imagen: surco · pápula · nódulo · excoriación · costra
  2: [['Vascular Tumors and Malformations', 10]],        // color (rojo/violáceo/azul) + distribución segmentaria / configuración
  4: [['Pigmentary Disorders', 10]],                     // fototipos: hiper/hipo, epidérmico vs dérmico
  5: [['Surgery and Anatomy', 10]],                      // anatomía facial y zonas de riesgo (las 3 restantes → d40)
  7: [['Disorders of Cornification, Infiltration, and Inflammation', 8], ['Nail Findings', 2]], // psoriasis/papuloescamosas + uña psoriásica
  8: [['Contact Dermatitis', 10]],
  10: [['Autoimmune Bullous Diseases', 10]],
  11: [['Immunology Review', 4], ['Dermatologic Medications', 6]], // urticaria: mecanismo + antihistamínicos
  14: [['Bacterial Diseases', 9]],
  16: [['Viral Diseases', 10]],
  17: [['Fungal Disease', 10]],
  19: [['Cosmetic Dermatology', 10]],
  22: [['Cutaneous Tumors', 10]],
  23: [['Melanoma and Non-Melanoma Skin Cancer', 10]],
  25: [['Reflectance Confocal Microscopy: The Era of Noninvasive Imaging', 5], ['Nail Findings', 5]], // melanocíticas: confocal + melanoma ungueal
  26: [['High-Yield Facts for the Dermatology Boards', 10]],
  34: [['Pediatric Dermatology', 10]],
  35: [['Oral Pathology', 10]],                          // enantemas (Koplik, lengua aframbuesada de Kawasaki)
  37: [['Genodermatoses', 10]],
  40: [['Surgery and Anatomy', 3], ['Histologic Stains and Special Studies', 7]], // biopsias → tinciones
  41: [['Basic Sciences', 10]],                          // cicatrización / colágeno
  53: [['Disorders of Fat', 10]],                        // compartimentos grasos faciales
  56: [['High-Yield Facts for the Dermatology Boards', 10]],
  59: [['Eye Findings', 10]],                            // ptosis y complicaciones perioculares de la toxina
  62: [['Disorders of Fat', 10]],
  64: [['High-Yield Facts for the Dermatology Boards', 10]],
};

/**
 * v6.02c F2 (E6): sesiones (pares d6-d40) cuya lectura de 10′ del plan A es la del ÁTOMO (la `extra` de la fila del plan, capítulo verificado
 * en el índice del Color Atlas 9e) y no el módulo del micro-track de dermatoscopia, que no tiene relación con el átomo. El módulo pasa a la
 * sesión `destino` (repaso del micro-track): nada se recorta. El generador comprueba fila, índice y destino.
 */
const CME_DESPLAZADO = {
  12: {
    destino: 42,
    foco: 'SJS/TEN (% de superficie, SCORTEN, fármacos culpables), DRESS (latencia 2-8 semanas, eosinofilia, órgano afectado) y AGEP (pústulas no foliculares, latencia corta) → tabla de 3 columnas',
    motivo: 'Farmacodermias graves = átomo «no errar»: el módulo 4 del micro-track (lesiones melanocíticas benignas) no tiene relación con el átomo → pasa al d42 (repaso del micro-track).',
  },
};

const QBANKS = 'https://qbankly.app/qbanks';
const VIDEOS = 'https://qbankly.app/videos';
const DERMNET = 'https://dermnetnz.org';
const DSC = 'https://dermoscopedia.org';
/** v6.02c F2 (E6): Dermoscopedia falla por HTTPS desde algunas redes → respaldo DermNet «Dermoscopy (Dermatoscopy)» (curl 200 el 18-oct-2026). */
const DERMNET_DERMOSCOPY = 'https://dermnetnz.org/topics/dermoscopy';
const DSC_RESPALDO = ' · si Dermoscopedia no carga: DermNet «Dermoscopy (Dermatoscopy)» (en los recursos), mismas estructuras con imágenes.';
const R_DSC = { t: 'DermNet · Dermoscopy (respaldo de Dermoscopedia)', url: DERMNET_DERMOSCOPY };
const PASSMED = (doc) => `https://qbankly.app/library?e=3&doc=${doc}`;
/** DermNet: palabras de los apartados usados (recuento del 18-oct-2026, sin menús ni referencias) → min a 100 palabras/min + 0,25′ por figura.
 *  v6.09b · lote 1-ter (17-nov-2026, revisión R, hallazgo 4): la regla fija de lectura en inglés es 100 palabras/min (antes 120: d1 762 palabras en 6′ = 1,27 y
 *  d5 1.132 palabras en 9′ = 1,34 quedaban fuera de 0,85-1,15). `DN_NEC` = minutos medidos sin redondear (el paso los declara: «(N′ medidos»). */
const DN_NEC = (palabras, figuras = 0) => palabras / 100 + figuras * 0.25;
const DN_MIN = (palabras, figuras = 0) => Math.max(1, Math.round(DN_NEC(palabras, figuras)));
const DN_TXT = (x) => `${String(Math.round(x * 100) / 100).replace('.', ',')}′ medidos`;
/** v6.09b · lote 1-quater (17-nov-2026): regla FIJA del modo Tutor de uWorld = 90 s de pregunta + 0,85′ de explicación ≈ 2,35′/Q (antes «~3′/Q»). */
const TUTOR = (n) => `modo Tutor = 90 s de pregunta + 0,85′ de explicación ≈ 2,35′/Q (${n}Q ≈ ${String(Math.round(n * 2.35 * 10) / 10).replace('.', ',')}′)`;
/** Lectura de ProMIR a la regla fija en español (prosa a 150 palabras/min; tablas a 90 y 0,5′ por figura, como la medición E2). */
const PMD_TXT = (p) => (p.minFig // v6.10 · tanda C: figuras contadas en vivo con su regla por figura (d1: 24 × 0,25′)
  ? `${String(p.min150).replace('.', ',')}′ medidos: ${p.palabras} palabras a 150 palabras/min + ${p.figs} figuras × ${String(p.minFig).replace('.', ',')}′`
  : `${String(p.min150).replace('.', ',')}′ medidos a 150 palabras/min · ${p.palabras} palabras · ${p.figs} figuras`);

/** Pasos comunes. */
// v6.10g (revisión 18-nov · c10, regla de Joseph: nada vacío por adelantado): el d1 ya no CREA el mazo antes de tener tarjetas (antes «crear el mazo
//   APEX::DERMA::A (preset FSRS)» a las 13:30, con 0 tarjetas); el mazo nace con la 1.ª tarjeta del cierre y ahí se le asigna el preset (mismos 3′), como
//   APEX::USMLE el jue 19 (bf439a9)
const anki = (C, d) => (d === 1
  ? { min: 3, que: `Anki · 1.ª sesión: sin repasos ni mazo todavía — ${C.deck('A')} nace con la 1.ª tarjeta del cierre`, como: `Ahora: Sync · al crear la 1.ª tarjeta del cierre nace ${C.deck('A')} → Options → preset FSRS (retention 0,90) · tag step1 en las tarjetas de los átomos que cuentan doble para el Step 1.` }
  : { min: 3, que: `Anki ${C.deck('A')} · repaso FSRS de las tarjetas de MECANISMO de las sesiones anteriores + fallos del ledger`, como: 'Solo Good/Again · deuda a cero; si no hay repasos, recita en voz alta la tarjeta de la sesión anterior.' });
const caso = (C, pos, k, n, min, foco) => {
  const c = C.caso(pos);
  return {
    min, que: `CASO CIEGO ${k}/${n} · ${c.titulo} (#${pos} de la permutación) — Dermatology Cases for Board Review`,
    como: `① solo la imagen: dictado de los 8 ejes en la app (lesión 1ª/2ª, tamaño, color, forma, borde, configuración, distribución, palpación) ② diferencial de 3 ANTES de leer ③ viñeta + responde ④ discusión → 1 tarjeta de MECANISMO + 1 oclusión de imagen · registra ✓/✗ desde el chip «Caso #${pos}» (módulo CORE: ${c.area}).${foco ? ' ' + foco : ''}`,
    enlace: { t: `Caso #${pos} · ${c.titulo}`, url: c.url },
  };
};
const cierre = (min = 2, extra = '') => ({ min, que: 'CIERRE · free recall en voz alta + tarjetas de MECANISMO', como: `Free recall en voz alta de lo de hoy (sin mirar) · etiqueta cada fallo con su módulo CORE (med/ped/surg/path) · marca el átomo («Marcar átomo como hecho»).${extra ? ' ' + extra : ''}` });
const pictorial = (C, d, como) => {
  const asig = C.pictorialDe(d);
  const txt = asig.map(([t, n]) => `«${t}» = ${n} (de ${C.temaN(t)})`).join(' + ');
  return {
    min: 10, que: `PICTORIAL REVIEW 4e · Create Custom Quiz › ${txt}`,
    como: `En la página del banco deja vacío «Create Random Quiz»; en «Create Custom Quiz» escribe ${asig.map(([t, n]) => `${n} en ${t}`).join(' y ')} → «Start Custom Quiz» · ~60 s/Q · ${como} · el quiz no se puede guardar a medias: termínalo · cada fallo → botón «fallo →» del banco (nº = posición en el quiz).`,
    enlace: { t: 'Pictorial Review 4e · Create Custom Quiz', url: C.url.pictorial },
  };
};
const uworld = (C, sysId, nQ, min, como) => {
  const s = C.uw(sysId);
  return {
    min, que: `uWorld Step 1 · System «${s.nombre}» · Unused · ${nQ}Q · Tutor (${s.q} preguntas en el System)`,
    como: `Qbankly › QBanks › uWorld - USMLE Step 1 › Test Composer: marca SOLO ese System → Status Unused → ${nQ} preguntas → Tutor → BEGIN TEST · ${como} · cuentan doble para el Step 1 (no se repiten después).`,
    enlace: { t: 'Qbankly › QBanks (uWorld Step 1)', url: QBANKS },
  };
};
const bbVideo = (C, id, fecha, que) => {
  const v = C.bb(id); const m = C.bbMin(id, fecha);
  return {
    min: m.min, que: `B&B Step 1 › Dermatology › «${v.nombre}» (${v.dur})${que ? ' — ' + que : ''}`,
    como: `Qbankly › Video Library › B&B Step 1 › Dermatology › General Topics › ${v.nombre} · ${m.x} = ${m.min}′ con pausas · al terminar, free recall de 60 s en el cuaderno (${m.subs.replace(/ \((\w+)\)$/, ', $1')}; regla de velocidad del Step 1).`, // v6.10j: la velocidad y sus minutos juntos (el Calendar corta el «cómo» a 110: antes «… · 1,0× …» sin los minutos)
    enlace: { t: `B&B · ${v.nombre}`, url: VIDEOS },
  };
};
// v6.10e (18-nov-2026): el helper `proyecto` (proyecto Claude «AESTHETIC DERMATOLOGY»: viñetas, dictado y preguntas generadas por IA) desaparece. Lo sustituyen
//   casos REALES de DermNet Quizzes (`quizPaso`) y lecturas reales medidas (`lecturaReal`).
const DN_QUIZ_URL = (slug) => `${DERMNET}/quizzes/${slug}`;
/** k casos REALES de un DermNet Quiz (rango fijo desde `desde`) en `minPaso` minutos (k × min/caso declarado por el quiz; el generador valida 0,85-1,15). */
const quizPaso = (slug, desde, k, minPaso, foco) => {
  const q = DERMNET_QUIZZES[slug];
  return {
    min: minPaso,
    que: `DermNet Quizzes › «${q.t}» · casos ${desde}-${desde + k - 1} (${k} casos REALES × ~${q.min}′ = ${k * q.min}′${minPaso > k * q.min ? ` + ${minPaso - k * q.min}′ para el ledger` : ''}, el tiempo por caso que declara el quiz)`, // v6.10g: + el minuto de ledger
    como: `dermnetnz.org/quizzes (gratis, sin cuenta) → «${q.t}» → caso ${desde}: ${foco} · después «Show Answers» y corrige · cada fallo → tarjeta de MECANISMO + ✓/✗ en el ledger («DermNet · caso N»).`,
    enlace: { t: `DermNet Quiz · ${q.t}`.slice(0, 70), url: `${DN_QUIZ_URL(slug)}/case/${desde}` },
  };
};
/** Palabras, figuras y minutos medidos (palabras/100 + 0,25′/figura) de una LECTURA_REAL. */
const medLectura = (L) => { const pal = L.secciones.reduce((a, s) => a + s[1], 0), fig = L.secciones.reduce((a, s) => a + s[2], 0); return { pal, fig, nec: DN_NEC(pal, fig) }; };

// v6.10g (revisión 18-nov · c11): más corto y empezando por «AccessDerma caducado» → dermaGuia.dermaGuiaPar lo pone ANTES de la fase (el Calendar corta el aviso
//   a 240 caracteres y al final del aviso de FASE no se veía)
const AVISO_B = 'AccessDerma caducado: renueva el acceso remoto desde la red de tu institución (campus/VPN u «Sign in via OpenAthens/Shibboleth»); mientras, manda el PLAN B (sin casos, Pictorial ni libros AccessDerma).';
const pendientes = (C, ids) => `Casos ${ids.map((p) => `#${p} (${C.caso(p).titulo})`).join(' y ')}, la imagen dermatoscópica y el Pictorial de hoy NO se pierden: al recuperar el acceso, cada sesión hace 1 caso pendiente en el slot del Pictorial (variable de ajuste) hasta ponerte al día; el tema del Pictorial de ese día pasa a la cola. El caso nunca se salta.`;

/** Sesiones curadas (d1-d5). Devuelve { d: { planA, planB } } con GuiaBloque completos (franja 13:30–14:15, 45′). */
function curadas(C) {
  const F = '13:30–14:15';
  const B = (d, titulo, pasos, recursos, hecho, planB, aviso) => ({ franja: F, plan: 'research-derma', titulo, totalMin: 45, pasos, recursos, hecho, planB, ...(aviso ? { aviso } : {}) });
  const dia = (d) => C.dia(d);
  const out = {};

  // ── d1 · lun 2-nov (v6.06 = día del UWSA1: sesión 13:30 tras el UWSA1; v6.05: mar 27-oct; v6.03: mié 21-oct; v6.02: lun 19-oct) · Lesiones elementales 1ª/2ª ──────────────────────────────────────────────────────────────────────────────
  {
    const x = dia(1); const [c1, c2] = x.casoIds;
    const ch2 = C.cap(2960, '248574793'), ch3 = C.cap(2960, '248574973'), dsa1 = C.cap(2929, '245859873');
    const pmd = C.pmd1Lectura(1);
    const mD1 = 45 - (3 + 12 + Math.round(pmd.min150) + DN_MIN(119 + 419 + 224) + 2), kD1 = DERMA_QUIZ_F1[1].k; // v6.10e: 10′ = 5 casos × ~2′ (el generador comprueba 0,85-1,15)
    out[1] = {
      planA: B(1, `DERMA d1 · ${x.sub.split(':')[0]} — plan A (AccessDerma)`, [
        anki(C, 1),
        caso(C, c1, 1, 2, 9), caso(C, c2, 2, 2, 9),
        { min: 2, que: `IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopy: An Illustrated Self-Assessment Guide 2e › ${dsa1.t} → la 1.ª imagen`, como: 'Estructuras → patrón → diagnóstico en voz alta ANTES de revelar · registra ✓/✗ en ①b · la próxima sesión impar sigue con la imagen siguiente.', enlace: { t: dsa1.t, url: dsa1.url } },
        pictorial(C, 1, 'antes de mirar las opciones nombra la lesión primaria y la secundaria de la imagen (surco, pápula, nódulo, excoriación, costra)'),
        { min: 10, que: `LECTURA · Guidebook to Dermatologic Diagnosis › ${ch2.t}`, como: `Por encabezados + figuras con su pie (Whole Page Rule por apartado); si acabas antes, ${ch3.t}. Sustituye al «approach» del Color Atlas 9e de la fila del plan: la 9e no tiene capítulo de enfoque (índice verificado el 18-oct: solo «How to Use this Book»). Longitud del capítulo no medida (acceso caducado).`, enlace: { t: ch2.t, url: ch2.url } },
        cierre(2, `≤3 tarjetas de MECANISMO en ${C.deck('A')}.`),
      ], [
        { t: 'Dermatology Cases for Board Review (listado)', url: C.url.casos, cantidad: '2 casos' },
        { t: 'Pictorial Review 4e', url: C.url.pictorial, cantidad: '10Q' },
        { t: ch2.t, url: ch2.url }, { t: ch3.t, url: ch3.url },
        { t: 'DermNet · Terminology (atlas)', url: `${DERMNET}/topics/terminology` },
      ], `2 casos registrados en el ledger (✓/✗) + 1 imagen dermatoscópica registrada + quiz de 10 terminado con sus fallos registrados + ${ch2.t.split(':')[0]} leído + ≤3 tarjetas de MECANISMO.`,
      'Sin acceso a AccessDerma → PLAN B de esta sesión (toca «AccessDerma caducado»).'),
      planB: B(1, `DERMA d1 · ${x.sub.split(':')[0]} — PLAN B (AccessDerma caducado)`, [
        anki(C, 1),
        // v6.09b · lote 1-quater: 4Q → 5Q en los mismos 12′ (regla del Tutor: 5 × 2,35′ = 11,75′); el total de F1 de este System no cambia (UW_TUTOR_F1)
        uworld(C, 1028, 5, 12, `en cada imagen, ANTES de las opciones: lesión 1ª + 2ª + color + distribución (8 ejes del dictado) y diferencial de 3 · ${TUTOR(5)}, en inglés`),
        // v6.10 · tanda C (corrección de hecho del chat Derma): §2.1-2.2 = 24 figuras (no 11) a 0,25′ → la lectura pasa de 9′ a 10′; la variable de ajuste es el
        //   dictado (11′ → 10′ = 5 rondas de ~2′). Ubicación en GoodNotes aprobada por Joseph: DERMATOLOGIA › A_Fundamentos › 01_d01_… y 02_d01_…
        { min: Math.round(pmd.min150), que: `LECTURA (español) · ProMIR Dermatología › cap. 1 «Introducción. Conceptos generales» › ${pmd.secciones} (${PMD_TXT(pmd)})`, como: 'Tapa el texto de cada figura y nombra la lesión ANTES de leer · Whole Page Rule (apartado entero) · al Shopping List: los términos que fallaste en el pre-test · notas en GoodNotes › DERMATOLOGIA › A_Fundamentos › «01_d01_ProMIR_cap1_lesiones_primarias_secundarias».', enlace: { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1 } },
        { min: DN_MIN(119 + 419 + 224), que: `DermNet › «Terminology» › Describing skin conditions + Morphology + Secondary changes (762 palabras = ${DN_TXT(DN_NEC(762))})`, como: 'Solo esos 3 apartados, a ~100 palabras/min · cada término en inglés que no sepas → glosario EN-ES del cuaderno (papule = pápula, wheal = habón, crust = costra…) · notas en GoodNotes › DERMATOLOGIA › A_Fundamentos › «02_d01_DermNet_Terminology».', enlace: { t: 'DermNet · Terminology', url: `${DERMNET}/topics/terminology` } },
        // v6.10e (18-nov-2026 · PREGUNTAS REALES): el «dictado inverso» del proyecto Claude (descripciones generadas por IA) → casos REALES de DermNet Quizzes
        //   (Acne 1-5 = lesiones primarias), mismos minutos (el hueco de siempre: 45 − el resto)
        quizPaso(DERMA_QUIZ_F1[1].quiz, DERMA_QUIZ_F1[1].desde, kD1, mD1, DERMA_QUIZ_F1[1].foco),
        cierre(2, `≤3 tarjetas de MECANISMO en ${C.deck('A')}.`),
      ], [
        { t: 'Qbankly › QBanks (uWorld Step 1)', url: QBANKS, cantidad: '5Q' },
        { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1, min: pmd.min150 },
        { t: 'DermNet · Terminology', url: `${DERMNET}/topics/terminology` },
        { t: `DermNet Quiz · ${DERMNET_QUIZZES[DERMA_QUIZ_F1[1].quiz].t}`, url: DN_QUIZ_URL(DERMA_QUIZ_F1[1].quiz), cantidad: `${kD1} casos` },
      ], `5Q de uWorld respondidas describiendo la imagen antes de las opciones + §2.1-2.2 de ProMIR leídas + 3 apartados de DermNet + ${kD1} casos DermNet con la lesión elemental nombrada antes de «Show Answers» + ≤3 tarjetas.`,
      pendientes(C, x.casoIds), AVISO_B),
    };
  }

  // ── d2 · mié 4-nov (v6.06; v6.05: jue 29-oct; v6.03: vie 23-oct; v6.02: mié 21-oct) · Color, distribución y configuración ─────────────────────────────────────────────────────────────────────
  {
    const x = dia(2); const [c1, c2] = x.casoIds;
    const ch11 = C.cap(2960, '248575828'), ch4 = C.cap(2960, '248575068'), ch12 = C.cap(2960, '248575965');
    const pmd = C.pmd1Lectura(2);
    out[2] = {
      planA: B(2, `DERMA d2 · Color, distribución y configuración — plan A (AccessDerma)`, [
        anki(C, 2),
        caso(C, c1, 1, 2, 9), caso(C, c2, 2, 2, 9),
        { min: 2, que: 'IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopedia › «Pigment network»', como: 'Tapa el título y los pies: describe la red (regular/atípica, fina/gruesa) antes de leer · registra ✓/✗ en ①b.' + DSC_RESPALDO, enlace: { t: 'Dermoscopedia · Pigment network', url: `${DSC}/Pigment_network` } },
        pictorial(C, 2, 'antes de las opciones: color (rojo/violáceo/azul), configuración y distribución (segmentaria, dermatomal) — el tema de hoy'),
        { min: 10, que: `LECTURA · Guidebook to Dermatologic Diagnosis › ${ch11.t}`, como: `Tabla en el cuaderno: configuración (anular · herpetiforme · lineal · Blaschko · dermatomal) → 2 ejemplos de cada una; si acabas: ${ch4.t}. ${ch12.t} queda como consulta. Longitud no medida (acceso caducado).`, enlace: { t: ch11.t, url: ch11.url } },
        cierre(2, `≤3 tarjetas en ${C.deck('A')}.`),
      ], [
        { t: 'Dermatology Cases for Board Review (listado)', url: C.url.casos, cantidad: '2 casos' },
        { t: 'Pictorial Review 4e', url: C.url.pictorial, cantidad: '10Q' },
        { t: ch11.t, url: ch11.url }, { t: ch4.t, url: ch4.url }, { t: ch12.t, url: ch12.url },
        { t: 'Dermoscopedia · Pigment network', url: `${DSC}/Pigment_network` }, R_DSC,
      ], `2 casos registrados + 1 imagen registrada + quiz de 10 terminado + tabla de configuraciones hecha + ≤3 tarjetas.`,
      'Sin acceso a AccessDerma → PLAN B de esta sesión.'),
      planB: B(2, `DERMA d2 · Color, distribución y configuración — PLAN B (AccessDerma caducado)`, [
        anki(C, 2),
        // v6.09b · lote 1-quater: 3Q → 4Q en los mismos 9′ (regla del Tutor: 4 × 2,35′ = 9,4′); el total de F1 de este System no cambia (UW_TUTOR_F1)
        // v6.10p (auditoría c18 · barrido de quizzes): «anular = tiña, herpetiforme = HSV, dermatomal = zóster» daba, ANTES de las 4Q de «Skin and soft tissue
        //   infections», el diagnóstico que esas preguntas piden → aquí solo el vocabulario de la configuración; las equivalencias, en el paso DermNet «Terminology»
        //   (después de las 4Q), detrás del corte del Calendar
        uworld(C, 1031, 4, 9, `antes de las opciones nombra la configuración (anular, herpetiforme, dermatomal…) y el color · ${TUTOR(4)}`),
        { min: 6, que: `LECTURA (español) · ProMIR Dermatología › cap. 1 › ${pmd.secciones} (${PMD_TXT(pmd)} · tabla 1-1 de signos)`, como: 'Whole Page Rule; los signos de la tabla 1-1 (Darier, Nikolsky, Koebner…) → 1 tarjeta cada uno que no supieras.', enlace: { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1 } },
        { min: DN_MIN(381 + 97 + 193), que: `DermNet › «Terminology» › Distribution + Configuration of lesions + Colour (671 palabras = ${DN_TXT(DN_NEC(671))})`, como: '~100 palabras/min · completa tu tabla de configuraciones con los términos en inglés y su ejemplo clásico (anular = tiña, herpetiforme = HSV, dermatomal = zóster).', enlace: { t: 'DermNet · Terminology', url: `${DERMNET}/topics/terminology` } },
        bbVideo(C, 74, x.fecha, 'color y distribución de las lesiones vasculares (por título; contenido no verificado)'),
        // v6.09b · lote 1-quater: el total (lectura + figuras + dibujo) va primero en el paréntesis «(N′ medidos: …)» para que cualquier medidor lo lea entero
        { min: 0, que: `DermNet › «Blaschko lines» › «What are the Blaschko lines?» + «What is the distribution of Blaschko lines?» + dibujo del patrón (${DN_TXT(DN_NEC(94, 2) + 1.5)}: 94 palabras + 2 figuras = ${String(DN_NEC(94, 2)).replace('.', ',')}′ + dibujo ≈1,5′)`, como: 'Lee esos 2 apartados y mira sus 2 figuras (tronco y extremidad); después dibuja el patrón en V/S sobre una silueta · «History…» y «Which skin conditions…» (164 palabras + 9 imágenes, el catálogo de enfermedades blaschkoides) no forman parte del átomo: el átomo es la configuración.', enlace: { t: 'DermNet · Blaschko lines', url: `${DERMNET}/topics/blaschko-lines` } },
        // v6.10p (auditoría c18 #14): el respaldo («si no carga: DermNet …») quedaba detrás del corte del Calendar («… · si Dermoscopedia no carga: …») → texto
        //   compacto (sin artículos; «si no carga» = Dermoscopedia, que nombra el «qué»): orden y respaldo enteros, la consecuencia dentro de los 110
        { min: 2, que: 'IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopedia › «Pigment network» (pública)', como: 'Tapa título y pies: describe la red antes de leer · registra ✓/✗ en ①b · si no carga: DermNet «Dermoscopy (Dermatoscopy)» (en los recursos), mismas estructuras con imágenes.', enlace: { t: 'Dermoscopedia · Pigment network', url: `${DSC}/Pigment_network` } },
        cierre(2, `≤3 tarjetas en ${C.deck('A')}.`), // v6.09b · lote 1-ter: 3′ → 2′ (como todas las sesiones): el minuto lo pide el «Terminology» a 100 palabras/min
      ], [
        { t: 'Qbankly › QBanks (uWorld Step 1)', url: QBANKS, cantidad: '4Q' },
        { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1, min: pmd.min150 },
        { t: `B&B · ${C.bb(74).nombre}`, url: VIDEOS, min: C.bbMin(74, x.fecha).min },
        { t: 'DermNet · Terminology', url: `${DERMNET}/topics/terminology` }, { t: 'DermNet · Blaschko lines', url: `${DERMNET}/topics/blaschko-lines` }, R_DSC,
      ], '4Q de uWorld + §2.3 de ProMIR + 3 apartados de DermNet + vídeo B&B visto con su free recall + dibujo de Blaschko + 1 imagen dermatoscópica + ≤3 tarjetas.',
      pendientes(C, x.casoIds), AVISO_B),
    };
  }

  // ── d3 · vie 6-nov (v6.06; v6.05: lun 2-nov; v6.03: mar 27-oct; v6.02: vie 23-oct) · Estructura de la piel (día ProMIR: TEST cap. 1) ─────────────────────────────────────────────────────────
  {
    const x = dia(3); const [c1, c2] = x.casoIds;
    const ch15 = C.cap(2570, '210416355'), ch5 = C.cap(2570, '210415435'), dsa1 = C.cap(2929, '245859873');
    const pmd = C.pmd1Lectura(3); const t = C.pmd1Test(3);
    const test = {
      min: 11, que: `ProMIR Dermatología › cap. 1 · TEST ${t.nQ}Q (preguntas MIR citadas en el capítulo: ${t.ids.slice(0, t.nQ).join(' · ')})`,
      como: `${t.como} · si te sobra tiempo: ${t.ids.slice(t.nQ, t.nQ + 2).join(' · ')}. La lista «Pool oficial» de la app trae preguntas de OTROS capítulos de Dermatología (el cap. 1 no tiene en el pool): déjalas para el banqueo y registra el neto con «Registrar 10Q MIR-Derma» (total ${t.nQ}).`,
      enlace: { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1 },
    };
    out[3] = {
      planA: B(3, `DERMA d3 · Estructura de la piel + TEST ProMIR cap. 1 — plan A (AccessDerma)`, [
        anki(C, 3),
        caso(C, c1, 1, 2, 9, 'Es un caso de DERMATOPATOLOGÍA: en ① describe la capa afectada (epidermis · unión · dermis · hipodermis) y el patrón.'), caso(C, c2, 2, 2, 8),
        { min: 2, que: `IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopy Self-Assessment 2e › ${dsa1.t} → la imagen siguiente`, como: 'Estructuras → patrón → diagnóstico en voz alta ANTES de revelar · registra ✓/✗ en ①b.', enlace: { t: dsa1.t, url: dsa1.url } },
        test,
        { min: 10, que: `LECTURA · Fitzpatrick's Dermatology 9e › Part 2 › ${ch15.t}`, como: `Solo las figuras de la unión dermoepidérmica y sus pies (hemidesmosoma → lámina lúcida → lámina densa → fibrillas de anclaje): es el mapa de las ampollosas del d10. ${ch5.t} = consulta si fallaste el caso #${c1}. Longitud no medida (acceso caducado).`, enlace: { t: ch15.t, url: ch15.url } },
        cierre(2),
      ], [
        { t: 'Dermatology Cases for Board Review (listado)', url: C.url.casos, cantidad: '2 casos' },
        { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1, cantidad: `${t.nQ}Q (${t.citadas} citadas en el capítulo)` },
        { t: ch15.t, url: ch15.url }, { t: ch5.t, url: ch5.url },
        { t: 'dermpathatlas (histología)', url: 'https://www.dermpathatlas.com/' },
        { t: 'DermNet · The structure of normal skin', url: `${DERMNET}/topics/the-structure-of-normal-skin` },
      ], `2 casos registrados + 1 imagen + ${t.nQ}Q ProMIR registradas (kind derma10Q) + figuras de la UDE dibujadas + ≤3 tarjetas.`,
      'Sin acceso a AccessDerma → PLAN B (el test ProMIR no depende de AccessDerma).'),
      planB: B(3, `DERMA d3 · Estructura de la piel + TEST ProMIR cap. 1 — PLAN B (AccessDerma caducado)`, [
        anki(C, 3),
        { ...test, que: `PRIMERO, ciego · ${test.que}` },
        { min: 8, que: `LECTURA (español) · ProMIR Dermatología › cap. 1 › ${pmd.secciones} (${PMD_TXT(pmd)})`, como: 'Primero el apartado de cada pregunta que fallaste (2020-004 → §3 · 2011-225 → §1.2) · Whole Page Rule.', enlace: { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1 } },
        bbVideo(C, 69, x.fecha, 'capas de la piel (por título)'),
        // v6.09b · lote 1-quater (revisión R2): PassMedicine pide iniciar sesión → no se puede medir: alcance ACOTADO al tiempo del paso (y el texto lo dice)
        { min: 3, que: 'PassMedicine (Library de Qbankly) › «Epidermis» — no medible sin iniciar sesión: acotado a 3′ (2′ de lectura + 1′ de recuerdo)', como: 'Lee 2′: las capas de la epidermis en orden (basal → espinosa → granulosa → lúcida → córnea) y qué define a cada una; marca dónde paras · 1′: escribe de memoria las 5 capas con 1 dato de cada una. Lo que quede después de tu marca es ampliación: el átomo (las capas) ya lo cubren ProMIR §1.1 y el B&B «01 - Skin».', enlace: { t: 'PassMedicine · Epidermis', url: PASSMED(493) } },
        cierre(2, 'Dibuja la piel en capas (epidermis → UDE → dermis → hipodermis) de memoria.'),
      ], [
        { t: 'ProMIR · Dermatología cap. 1', url: C.url.pmd1, min: pmd.min150 },
        { t: `B&B · ${C.bb(69).nombre}`, url: VIDEOS, min: C.bbMin(69, x.fecha).min },
        { t: 'PassMedicine · Epidermis', url: PASSMED(493) },
        { t: 'DermNet · The structure of normal skin (consulta)', url: `${DERMNET}/topics/the-structure-of-normal-skin` },
      ], `${t.nQ}Q ProMIR registradas + §1 y §3 leídas + vídeo B&B con free recall + dibujo de capas de memoria + ≤3 tarjetas.`,
      pendientes(C, x.casoIds), AVISO_B),
    };
  }

  // ── d4 · mar 10-nov (v6.06; v6.05: mié 4-nov; v6.03: jue 29-oct; v6.02: mar 27-oct) · Fototipos I-VI + piel de color ──────────────────────────────────────────────────────────────────────────
  {
    const x = dia(4); const [c1, c2] = x.casoIds;
    const tk1 = C.cap(3609, '301535746');
    // v6.10e: el hueco que ocupaba el proyecto Claude (45 − el resto del plan B) → k casos DermNet de ~2′
    const mD4 = 45 - (3 + C.bbMin(73, x.fecha).min + DN_MIN(227, 6) + DN_MIN(438, 8) + 5 + 2 + 2), kD4 = DERMA_QUIZ_F1[4].k; // 15′ = 7 casos × ~2′ + 1′ de ledger (v6.10g; antes 8 casos = 16′)
    out[4] = {
      planA: B(4, `DERMA d4 · Fototipos I-VI + piel de color — plan A (AccessDerma)`, [
        anki(C, 4),
        caso(C, c1, 1, 2, 9, 'Caso de DERMATOPATOLOGÍA: capa afectada + patrón en ①.'), caso(C, c2, 2, 2, 9),
        { min: 2, que: 'IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopedia › «Globules»', como: 'Tapa el título: describe los glóbulos (tamaño, color, distribución) antes de leer · registra ✓/✗ en ①b.' + DSC_RESPALDO, enlace: { t: 'Dermoscopedia · Globules', url: `${DSC}/Globules` } },
        pictorial(C, 4, 'antes de las opciones: ¿hiper o hipopigmentación?, ¿epidérmica (marrón) o dérmica (gris-azul)?, fototipo probable'),
        { min: 10, que: `LECTURA · Taylor and Kelly's Dermatology for Skin of Color 3e › Section 1 › ${tk1.t}`, como: 'Por encabezados: qué es «piel de color», cómo cambian el eritema y la pigmentación postinflamatoria en IV-VI · 3 ideas al cuaderno para SR-2 (L5, fototipos IV-VI). Longitud no medida (acceso caducado).', enlace: { t: tk1.t, url: tk1.url } },
        cierre(2),
      ], [
        { t: 'Dermatology Cases for Board Review (listado)', url: C.url.casos, cantidad: '2 casos' },
        { t: 'Pictorial Review 4e', url: C.url.pictorial, cantidad: '10Q' },
        { t: tk1.t, url: tk1.url },
        { t: 'DermNet · Skin phototype', url: `${DERMNET}/topics/skin-phototype` }, R_DSC,
      ], '2 casos registrados + 1 imagen + quiz de 10 terminado + 3 ideas para SR-2 + ≤3 tarjetas.',
      'Sin acceso a AccessDerma → PLAN B.'),
      planB: B(4, `DERMA d4 · Fototipos I-VI + piel de color — PLAN B (AccessDerma caducado)`, [
        anki(C, 4),
        bbVideo(C, 73, x.fecha),
        { min: DN_MIN(227, 6) + DN_MIN(438, 8), que: `DermNet (${DN_TXT(DN_NEC(227, 6) + DN_NEC(438, 8))} a 100 palabras/min + 0,25′ por figura) › «Skin phototype» (clasificación de Fitzpatrick, ≈230 palabras + 6 figuras) + «Postinflammatory hyperpigmentation» (≈440 palabras + 8 figuras)`, como: 'Tabla fototipo I-VI → quema/broncea → cómo se ve el eritema y la PIH en cada uno.', enlace: { t: 'DermNet · Skin phototype', url: `${DERMNET}/topics/skin-phototype` } },
        // v6.09b · lote 1-quater (revisión R2): PassMedicine «Vitiligo» pide iniciar sesión → acotado a 2′ (el texto lo dice); DermNet medido
        { min: 5, que: `Diferencial de hipopigmentación (${String(Math.round((DN_NEC(155, 4) + 2) * 100) / 100).replace('.', ',')}′ medidos y acotados: DermNet «Pityriasis alba» › clinical features, 155 palabras + 4 figuras = ${DN_TXT(DN_NEC(155, 4))} + PassMedicine «Vitiligo» (Library de Qbankly) acotado a 2′, no medible sin iniciar sesión)`, como: 'Primero DermNet (las 4 figuras + clinical features) · después lee 2′ de PassMedicine «Vitiligo»: definición → clínica → diagnóstico (lámpara de Wood); marca dónde paras · mientras lees, tabla de 3 columnas: pitiriasis alba vs vitíligo vs pitiriasis versicolor (borde, escama, Wood).', enlace: { t: 'DermNet · Pityriasis alba', url: `${DERMNET}/topics/pityriasis-alba` } },
        { min: 2, que: 'IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopedia › «Globules» (pública)', como: 'Describe antes de leer · registra ✓/✗ en ①b.' + DSC_RESPALDO, enlace: { t: 'Dermoscopedia · Globules', url: `${DSC}/Globules` } },
        // v6.10e (18-nov-2026 · PREGUNTAS REALES): las «3 viñetas en fototipo IV-VI» del proyecto Claude → casos REALES de DermNet Quizzes (Brown skin lesions
        //   4-11: melasma, pigmentación postinflamatoria, liquen plano pigmentoso… sin revelar cuál es cuál), mismos minutos (el hueco: 45 − el resto)
        quizPaso(DERMA_QUIZ_F1[4].quiz, DERMA_QUIZ_F1[4].desde, kD4, mD4, `${DERMA_QUIZ_F1[4].foco} · puente con SR-2 (L5)`),
        cierre(2),
      ], [
        { t: `B&B · ${C.bb(73).nombre}`, url: VIDEOS, min: C.bbMin(73, x.fecha).min },
        { t: 'DermNet · Skin phototype', url: `${DERMNET}/topics/skin-phototype` },
        { t: 'DermNet · Postinflammatory hyperpigmentation', url: `${DERMNET}/topics/postinflammatory-hyperpigmentation` },
        { t: 'DermNet · Pityriasis alba', url: `${DERMNET}/topics/pityriasis-alba` },
        { t: 'PassMedicine · Vitiligo', url: PASSMED(1413) }, R_DSC,
        { t: `DermNet Quiz · ${DERMNET_QUIZZES[DERMA_QUIZ_F1[4].quiz].t}`, url: DN_QUIZ_URL(DERMA_QUIZ_F1[4].quiz), cantidad: `${kD4} casos` },
      ], `Vídeo B&B con free recall + tabla de fototipos + tabla de hipopigmentaciones + ${kD4} casos DermNet reales corregidos + ≤3 tarjetas.`,
      pendientes(C, x.casoIds), AVISO_B),
    };
  }

  // ── d5 · jue 12-nov (v6.06; v6.05: vie 6-nov, día del NBME 25; v6.03: lun 2-nov; v6.02: jue 29-oct) · Anatomía facial + DANGER ZONES ─────────────────────────────────────────────────────────────────────────
  {
    const x = dia(5); const [c1, c2] = x.casoIds;
    const ds1 = C.cap(2811, '245216992'), dsa2 = C.cap(2929, '245860434');
    out[5] = {
      planA: B(5, `DERMA d5 · Anatomía facial + DANGER ZONES — plan A (AccessDerma)`, [
        anki(C, 5),
        caso(C, c1, 1, 2, 9), caso(C, c2, 2, 2, 9),
        { min: 2, que: `IMAGEN DERMATOSCÓPICA CIEGA · Dermoscopy Self-Assessment 2e › ${dsa2.t} → la 1.ª imagen`, como: 'Estructuras → patrón → diagnóstico en voz alta ANTES de revelar · registra ✓/✗ en ①b.', enlace: { t: dsa2.t, url: dsa2.url } },
        pictorial(C, 5, 'antes de las opciones: nombra la estructura/arteria o la subunidad estética de la imagen'),
        { min: 10, que: `LECTURA · Dermatologic Surgery › ${ds1.t}`, como: 'Solo los apartados de arterias faciales y zonas de riesgo · dibuja el mapa (a. facial → angular; supratroclear/supraorbitaria → oftálmica; dorsal nasal; rama frontal de la temporal superficial). Longitud no medida (acceso caducado).', enlace: { t: ds1.t, url: ds1.url } },
        cierre(2, 'Recita las 2 zonas de máximo riesgo (glabela, nariz) y por qué (ceguera por la a. oftálmica).'),
      ], [
        { t: 'Dermatology Cases for Board Review (listado)', url: C.url.casos, cantidad: '2 casos' },
        { t: 'Pictorial Review 4e', url: C.url.pictorial, cantidad: '10Q' },
        { t: ds1.t, url: ds1.url },
      ], '2 casos registrados + 1 imagen + quiz de 10 terminado + mapa arterial dibujado + ≤3 tarjetas.',
      'Sin acceso a AccessDerma → PLAN B.'),
      planB: B(5, `DERMA d5 · Anatomía facial + DANGER ZONES — PLAN B (AccessDerma caducado)`, [
        anki(C, 5),
        // v6.10e (18-nov-2026 · PREGUNTAS REALES): la «tabla de arterias de riesgo + 8 preguntas de verificación» del proyecto Claude (generadas por IA) → lectura
        //   REAL medida (StatPearls «Facial Artery», 852 palabras + Figura 1 = 8,77′ en 9′) + la tabla la construyes TÚ al final (paso «TABLA»), con las figuras del
        //   consenso; las 8 preguntas → recall en blanco del MAPA DE MEMORIA. Mismos 20′ (9 + 11).
        (() => { const L = LECTURA_REAL.arteriaFacial; const m = medLectura(L); return { min: Math.round(m.nec), que: `${L.t} › ${L.secciones.filter((s) => s[1]).map((s) => `«${s[0]}»`).join(' + ')} + su Figura 1 (${m.pal} palabras + ${m.fig} figura = ${DN_TXT(m.nec)} a 100 palabras/min)`, como: 'Lee esas secciones (Embryology, Blood Supply, Nerves y Muscles no forman parte del átomo: el átomo es trayecto + plano + riesgo) · la Figura 1 primero: tapa el pie y sigue el trayecto de la a. facial hasta la angular · subraya dónde es superficial y su relación con el surco nasogeniano.', enlace: { t: 'StatPearls · Facial Artery (NBK536932)', url: L.url } }; })(),
        // v6.09b · lote 1-quater (revisión de F1): el resumen de PubMed tiene 177 palabras (1,77′; medido el 17-nov-2026) → 5′ = 0,35 → 2′. El consenso, re-medido
        //   (PMC HTML + Europe PMC XML, 17-nov-2026): el texto de la Pregunta 3 son 655 palabras (las «789» contaban dentro el pie de la Figura 3) y los pies de
        //   las Figuras 1-3 suman 335; la Pregunta 3 remite a su Tabla 2 (riesgo por región, 72 palabras) → con los «Key Points» del inicio (61) = 1.123 palabras
        //   + 3 figuras = 11,98′ en 13′ (0,92). El mapa de memoria (relleno) se compara además con la Figura 3 y la Tabla 2.
        { min: 2, que: `PubMed · Cotofana S et al. «Vascular Safe Zones for Facial Soft Tissue Filler Injections» (Plast Aesthet Nurs 2022) — resumen (177 palabras = ${DN_TXT(DN_NEC(177))})`, como: 'Lee el resumen y apunta qué zonas llama «seguras» y en qué plano (resumen medido el 17-nov-2026 a 100 palabras/min).', enlace: { t: 'PubMed 36469395', url: 'https://pubmed.ncbi.nlm.nih.gov/36469395/' } },
        { min: 13, que: `PMC (acceso abierto) · «A Consensus on Minimizing the Risk of Hyaluronic Acid Embolic Visual Loss…» (ASJ 2020) › «Question 3: Are There Areas of Increased Risk…» (655 palabras) + su Tabla 2 «Regions of the Face and Their Relative Risk of Blindness» (72) + «Key Points» del inicio (61) + pies de las Figuras 1-3 (335) = 1.123 palabras + 3 figuras (${DN_TXT(DN_NEC(1123, 3))} a 100 palabras/min)`, como: 'La Pregunta 3 con su Tabla 2 y las 3 figuras: qué zonas son de alto riesgo y por qué (anastomosis con la a. oftálmica, Figura 3); los «Key Points», el mecanismo en 4 líneas · es la lectura del d20, aquí solo la anatomía y el riesgo por región.', enlace: { t: 'PMC7427155', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7427155/' } },
        { min: 11, que: 'TABLA de las 6 arterias de riesgo, hecha por TI (sin IA) desde lo leído hoy: facial · angular · supratroclear · supraorbitaria · dorsal nasal · rama frontal de la temporal superficial (6 filas × trayecto · plano/profundidad · qué produce su oclusión ≈ 1,8′ por fila)', como: 'Fuentes: StatPearls (a. facial y angular, Figura 1) + Figura 3 y Tabla 2 del consenso (ramas de la oftálmica y riesgo por región) · celda que no puedas llenar con lo leído = «?» en rojo y va como pregunta al Anki, nunca inventada.' },
        { min: 0, que: 'MAPA DE MEMORIA (recall en blanco)', como: 'Dibuja la cara con las 6 arterias y las 2 zonas de máximo riesgo SIN mirar; compáralo con tu tabla, con la Figura 1 de StatPearls y con la Figura 3 y la Tabla 2 del consenso, y corrige en rojo: es tu verificación (sin preguntas generadas: lo que no recuerdes = tarjeta).' },
        cierre(2),
      ], [
        { t: LECTURA_REAL.arteriaFacial.t, url: LECTURA_REAL.arteriaFacial.url, min: Math.round(medLectura(LECTURA_REAL.arteriaFacial).nec) },
        { t: 'PubMed · Vascular Safe Zones (Cotofana 2022)', url: 'https://pubmed.ncbi.nlm.nih.gov/36469395/' },
        { t: 'PMC · Consenso de pérdida visual embólica (2020)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7427155/' },
      ], 'StatPearls leído + tabla de las 6 arterias hecha por ti + mapa de memoria corregido contra las figuras reales + ≤3 tarjetas.',
      pendientes(C, x.casoIds), AVISO_B),
    };
  }
  return out;
}

module.exports = { PICTORIAL_TEMAS, PICTORIAL_ASIGNACION, curadas, QBANKS, VIDEOS, DERMNET, CME_DESPLAZADO, DERMNET_DERMOSCOPY, DERMNET_QUIZZES, DERMA_QUIZ_F1, LECTURA_REAL };
