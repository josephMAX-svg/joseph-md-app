/**
 * usmleQbanklyData.ts — DATOS REALES de Qbankly (qbankly.app), extraídos de la
 * sesión logueada del usuario vía la API interna (/api/v2/...) el 10-jun-2026.
 * Ruta: extensión Claude en Microsoft Edge (Chrome bloqueaba por la sesión CDP).
 *
 * 3 librerías (uWorld/Amboss/PassMedicine) · 14 QBanks USMLE · Video Library
 * (Boards&Beyond Step 1/2 + Sketchy). Conteos de preguntas por subject y subtema
 * y duraciones de vídeo son reales. Cruza con Palmerton (usmlePalmertonData).
 */
export const QBANKLY_META = {
  fuente: 'Qbankly · qbankly.app (cuenta Premium del usuario)',
  libraries: 3, qbanksUSMLE: 14, videos: 1546,
  nota: 'Extraído por API interna. Deep-links abren Qbankly: library?e=<id>&doc=<docId>, /qbanks, /videos.',
};

export const QB_LIB_BASE = 'https://qbankly.app/library';
export const qbLibUrl = (epubId: number, docId: number) => `${QB_LIB_BASE}?e=${epubId}&doc=${docId}`;

export interface QbLibSubject { subject: string; nTopics: number; firstDoc: number; }
export interface QbLibrary { epubId: number; name: string; nTopics: number; subjects: QbLibSubject[]; }
export const QB_LIBRARIES: QbLibrary[] = [
  { epubId: 1, name: "uWorld Medical Library", nTopics: 824, subjects: [
    { subject: "Allergy & Immunology", nTopics: 19, firstDoc: 0 },
    { subject: "Cardiology", nTopics: 51, firstDoc: 19 },
    { subject: "Dermatology", nTopics: 43, firstDoc: 70 },
    { subject: "Ear, Nose & Throat (ENT)", nTopics: 26, firstDoc: 113 },
    { subject: "Endocrinology", nTopics: 38, firstDoc: 139 },
    { subject: "Gastroenterology", nTopics: 70, firstDoc: 177 },
    { subject: "Gynecology", nTopics: 57, firstDoc: 247 },
    { subject: "Hematology & Oncology", nTopics: 46, firstDoc: 304 },
    { subject: "Infectious Diseases", nTopics: 96, firstDoc: 350 },
    { subject: "Male Reproductive System", nTopics: 25, firstDoc: 446 },
    { subject: "Nephrology", nTopics: 33, firstDoc: 471 },
    { subject: "Neurology", nTopics: 57, firstDoc: 504 },
    { subject: "Obstetrics", nTopics: 40, firstDoc: 561 },
    { subject: "Ophthalmology", nTopics: 30, firstDoc: 601 },
    { subject: "Psychiatry", nTopics: 70, firstDoc: 631 },
    { subject: "Pulmonary & Critical Care", nTopics: 49, firstDoc: 701 },
    { subject: "Rheumatology/Orthopedics", nTopics: 50, firstDoc: 750 },
    { subject: "Social Sciences", nTopics: 8, firstDoc: 800 },
    { subject: "Toxicology", nTopics: 16, firstDoc: 808 }
  ] },
  { epubId: 2, name: "Amboss USMLE Library", nTopics: 268, subjects: [
    { subject: "Basic sciences", nTopics: 9, firstDoc: 0 },
    { subject: "Clinical knowledge", nTopics: 24, firstDoc: 0 },
    { subject: "Clinical skills", nTopics: 5, firstDoc: 0 },
    { subject: "Clerkship survival guide", nTopics: 11, firstDoc: 6681 },
    { subject: "Transition to residency", nTopics: 8, firstDoc: 6712 },
    { subject: "On-call survival guide", nTopics: 39, firstDoc: 5340 },
    { subject: "Osteopathic medicine", nTopics: 14, firstDoc: 6759 },
    { subject: "CME-eligible articles", nTopics: 158, firstDoc: 4348 }
  ] },
  { epubId: 3, name: "PassMedicine - USMLE Step 1 Textbook", nTopics: 1436, subjects: [
    { subject: "General principles", nTopics: 348, firstDoc: 14 },
    { subject: "Cardiovascular system", nTopics: 135, firstDoc: 3 },
    { subject: "Endocrine system", nTopics: 80, firstDoc: 22 },
    { subject: "Gastrointestinal system", nTopics: 146, firstDoc: 2 },
    { subject: "Haematology and oncology", nTopics: 96, firstDoc: 9 },
    { subject: "Musculoskeletal system and skin", nTopics: 171, firstDoc: 7 },
    { subject: "Neurological system", nTopics: 186, firstDoc: 1 },
    { subject: "Psychiatry", nTopics: 25, firstDoc: 71 },
    { subject: "Renal system", nTopics: 88, firstDoc: 19 },
    { subject: "Reproductive system", nTopics: 74, firstDoc: 10 },
    { subject: "Respiratory system", nTopics: 87, firstDoc: 27 }
  ] },
];

export interface QbBank { id: number; name: string; q: number; active?: boolean; subjects: [string, number][]; subtopics: [string, number][] | null; yCount: number; }
export const QB_BANKS: QbBank[] = [{id:1,name:"uWorld - USMLE Step 1",q:3659,active:true,subjects:[["Pathology",819],["Pharmacology",550],["Pathophysiology",487],["Microbiology",348],["Anatomy",309],["Physiology",269],["Behavioral science",254],["Biochemistry",159],["Immunology",132],["Biostatistics",121],["Genetics",107],["Embryology",75],["Histology",29]],subtopics:[["Allergy & Immunology (Anaphylaxis and allergic reactions)",19],["Allergy & Immunology (Autoimmune diseases)",13],["Allergy & Immunology (Immune deficiencies)",23],["Allergy & Immunology (Miscellaneous)",21],["Allergy & Immunology (Principles of immunology)",25],["Allergy & Immunology (Transplant medicine)",7],["Biochemistry (Amino acids, proteins, and enzymes)",20],["Biochemistry (Bioenergetics and carbohydrate metabolism)",21],["Biochemistry (Cell and molecular biology)",17],["Biochemistry (Lipid metabolism)",3],["Biostatistics & Epidemiology (Epidemiology and population health)",31],["Biostatistics & Epidemiology (Measures and distribution of data)",11],["Biostatistics & Epidemiology (Probability and principles of testing)",23],["Biostatistics & Epidemiology (Study design and interpretation)",54],["Cardiovascular (Aortic and peripheral artery diseases)",37],["Cardiovascular (Cardiac arrhythmias)",50],["Cardiovascular (Cardiovascular drugs)",16],["Cardiovascular (Congenital heart disease)",32],["Cardiovascular (Coronary heart disease)",47],["Cardiovascular (Heart failure and shock)",44],["Cardiovascular (Hypertension)",24],["Cardiovascular (Myopericardial diseases)",52],["Cardiovascular (Normal structure and function)",55],["Cardiovascular (Valvular heart diseases)",46],["Dermatology (Inflammatory dermatoses and bullous diseases)",28],["Dermatology (Skin and soft tissue infections)",18],["Dermatology (Skin tumors and tumor-like lesions)",32],["ENT (Disorders of the ear, nose, and throat)",40],["Endocrine (Adrenal disorders)",11],["Endocrine (Diabetes mellitus)",49],["Endocrine (Endocrine tumors)",26],["Endocrine (Hypothalamus and pituitary disorders)",13],["Endocrine (Reproductive endocrinology)",21],["Endocrine (Thyroid disorders)",34],["Female Reproductive & Breast (Genital tract tumors)",26],["Female Reproductive & Breast (Genitourinary tract infections)",13],["Gastrointestinal (Gastroesophageal disorders)",45],["Gastrointestinal (Hepatic disorders)",59],["Gastrointestinal (Intestinal and colorectal disorders)",66],["Gastrointestinal (Pancreatic disorders)",17],["Gastrointestinal (Tumors of the GI tract)",27],["Hematology & Oncology (Hemostasis and thrombosis)",36],["Hematology & Oncology (Red blood cell disorders)",85],["Hematology & Oncology (White blood cell disorders)",48],["Infectious Diseases (Bacterial infections)",112],["Infectious Diseases (HIV and STIs)",42],["Infectious Diseases (Viral infections)",43],["Male Reproductive (Disorders)",48],["Nervous System (Cerebrovascular disease)",62],["Nervous System (Disorders of peripheral nerves and muscles)",69],["Nervous System (Neurodegenerative disorders and dementias)",34],["Nervous System (Normal structure and function)",48],["Pregnancy & Childbirth (Disorders)",44],["Psychiatric/Substance Use (Mood disorders)",33],["Psychiatric/Substance Use (Psychotic disorders)",26],["Psychiatric/Substance Use (Substance use disorders)",25],["Pulmonary & Critical Care (Critical care medicine)",40],["Pulmonary & Critical Care (Obstructive lung disease)",48],["Pulmonary & Critical Care (Pulmonary infections)",62],["Renal & Electrolytes (Fluid, electrolytes, and acid-base)",38],["Renal & Electrolytes (Glomerular diseases)",39],["Rheumatology/Orthopedics (Arthritis and spondyloarthropathies)",38],["Social Sciences (Communication and interpersonal skills)",62]],yCount:169},{id:3,name:"Amboss - USMLE Step 1",q:2745,subjects:[["Clinical pathology/Lab medicine",408],["Clinical pharmacology",344],["Biochemistry",293],["Anatomy",284],["Allergy and immunology",269],["Behavioral sciences",108],["Family medicine",104],["Infectious diseases",103],["IM - Cardiology",79],["Genetics",69],["Emergency medicine",58],["Histology",48],["Epidemiology/Biostats",43],["IM - Endocrinology",41],["Aging",39],["Neurology",36],["Gynecology",36]],subtopics:null,yCount:18},{id:78,name:"Mehlman - Step 1 QBank 2026",q:7278,subjects:[["Pathology",977],["Physiology",683],["Pharmacology",629],["Pathophysiology",568],["Biochemistry",566],["Immunology",534],["Risk factors",530],["Anatomy",526],["Genetics",404],["Biostatistics",281],["Histology",263],["Radiology",248],["Behavioral science",238],["Miscellaneous",123],["Embryology",98]],subtopics:null,yCount:1083},{id:87,name:"PassMedicine - USMLE Step 1",q:3846,subjects:[["General principles",1122],["Neurological system",673],["Cardiovascular system",425],["Musculoskeletal system and skin",386],["Gastrointestinal system",369],["Renal system",190],["Haematology and oncology",160],["Respiratory system",161],["Endocrine system",158],["Reproductive system",137],["Psychiatry",65]],subtopics:null,yCount:1},{id:117,name:"USMLERx - USMLE Step 1",q:2150,subjects:[["Pathology",552],["Pharmacology",361],["Clinical Diagnosis",290],["Microbiology",187],["Physiology",138],["Anatomy",127],["Communications",105],["Biochemistry",101],["Epidemiology",77],["Genetics",62],["Immunology",56],["Embryology",43],["Histology",32],["Cell Biology",19]],subtopics:[["Cardiovascular",200],["Dermatology",53],["Endocrine",104],["Gastrointestinal",202],["Hematology",193],["Multisystem",297],["Musculoskeletal",108],["Neurology and Special Senses",276],["Psychiatry",77],["Reproduction",142],["Respiratory",151],["Renal",167],["Nonsystem",180]],yCount:13}];

export interface QbVidChapter { chapter: string; n: number; min?: number; }
export interface QbVideoCourse { id: number; name: string; chapters: QbVidChapter[]; }
export const QB_VIDEOS: QbVideoCourse[] = [
  { id: 1, name: 'Boards & Beyond — Step 1', chapters: [{"chapter":"Anesthesia (NEW)","n":4,"min":75},{"chapter":"Basic Pharmacology","n":5,"min":86},{"chapter":"Behavioral Science","n":9,"min":130},{"chapter":"Biochemistry","n":28,"min":549},{"chapter":"Biostats/Epi","n":12,"min":213},{"chapter":"Cardiology (NEW)","n":40,"min":818},{"chapter":"Cell Biology","n":14,"min":203},{"chapter":"Dermatology","n":0,"min":0},{"chapter":"Endocrinology (NEW)","n":30,"min":688},{"chapter":"Gastroenterology","n":28,"min":533},{"chapter":"Genetics","n":12,"min":146},{"chapter":"Hematology","n":29,"min":498},{"chapter":"Immunology","n":19,"min":362},{"chapter":"Infectious Disease","n":36,"min":699},{"chapter":"Musculoskeletal (NEW)","n":20,"min":369},{"chapter":"Neurology (NEW)","n":50,"min":869},{"chapter":"Ophthalmology (NEW)","n":10,"min":195},{"chapter":"Pathology","n":11,"min":181},{"chapter":"Psychiatry","n":21,"min":271},{"chapter":"Pulmonary (NEW)","n":30,"min":639},{"chapter":"Renal","n":28,"min":515},{"chapter":"Reproductive","n":37,"min":440}] },
  { id: 2, name: 'Boards & Beyond — Step 2', chapters: [{"chapter":"Behavioral Science","n":8,"min":132},{"chapter":"Cardiology","n":19,"min":405},{"chapter":"Emergency Medicine","n":10,"min":142},{"chapter":"Endocrinology","n":16,"min":305},{"chapter":"Epidemiology","n":12,"min":213},{"chapter":"Gastroenterology","n":24,"min":455},{"chapter":"Hematology and Oncology","n":20,"min":390},{"chapter":"Infectious Disease","n":16,"min":306},{"chapter":"Musculoskeletal","n":9,"min":165},{"chapter":"Neurology","n":0,"min":0},{"chapter":"Obstetrics and Gynecology","n":34,"min":569},{"chapter":"Pediatrics","n":16,"min":272},{"chapter":"Psychiatry","n":14,"min":198},{"chapter":"Pulmonary Critical Care","n":0,"min":0},{"chapter":"Renal and Genitourinary","n":0,"min":0},{"chapter":"Surgery and Anesthesia","n":0,"min":0}] },
  { id: 3, name: 'Sketchy', chapters: [{"chapter":"Anatomy","n":52},{"chapter":"Biochemistry","n":86},{"chapter":"Biostatistics & Epidemiology","n":22},{"chapter":"Immunology","n":23},{"chapter":"Internal Medicine","n":169},{"chapter":"Microbiology","n":44},{"chapter":"Neurology","n":16},{"chapter":"Obstetrics & Gynecology","n":50},{"chapter":"Pathophysiology","n":148},{"chapter":"Pediatrics","n":62},{"chapter":"Pharmacology","n":130},{"chapter":"Physiology","n":73},{"chapter":"Surgery","n":0},{"chapter":"Toxicology","n":0}] },
];
export const QB_VIDEOS_URL = 'https://qbankly.app/videos';
export const QB_QBANKS_URL = 'https://qbankly.app/qbanks';

export function bbHours(course: QbVideoCourse): number {
  return Math.round(course.chapters.reduce((a, c) => a + (c.min || 0), 0) / 60);
}
export function courseVideos(course: QbVideoCourse): number {
  return course.chapters.reduce((a, c) => a + c.n, 0);
}
