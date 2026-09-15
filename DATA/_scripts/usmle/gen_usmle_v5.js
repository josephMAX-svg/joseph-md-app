// Generador del array DIAS para usmleStep1Daily.ts v5 — v5.12: D1=2026-09-16 → D95=2027-01-29
// v5.12 (15-sep-2026): el mar 15-sep tampoco se estudió → todo corre a D1 = MIÉ 16-SEP. REGLA DE ESTE CORRIMIENTO:
//   NO se fusiona ni se recorta NADA. El temario (CONTENT) sale 1:1 y el desfase se absorbe ALARGANDO el final
//   del plan hasta el vie 29-ene-2027 (= último día de la ventana 25-29 ene, que era el target de examen).
//   11 de los 12 hitos conservan su FECHA (anclados en SIMS), solo cambia su D#. El UWSA1 se mueve con cada
//   corrimiento (vie 11 → lun 14 → mar 15 → mié 16-sep) para seguir siendo el D1 (baseline el primer día, Palmerton).
//   El primer día de CONTENIDO pasa al jue 17-sep (D2). Ninguna fila de CONTENT se pierde por eso.
//   ⚠ CONSECUENCIA v5.12: el plan ya ocupa el vie 29-ene → el EXAMEN sale de la ventana: target LUN 1-FEB-2027
//   (sáb 30 y dom 31-ene = descanso pre-examen FUERA del plan: solo Anki vencido + ritual D-1 el domingo).
//   Joseph debe reprogramar/agendar el Prometric y confirmar que el eligibility period cubre el 1-feb (o decidir recortar).
//   Desde aquí cada día no estudiado mueve el examen un día hábil más (o exige recortar temario).
// v5.6-Palmerton (5-sep-2026): añade nivelUW (1-5) y qDia por día (ver bloque al final). 12-sep (tarde): flags VIERNES_N4_DESDE_SEMANA (=11) y TAPER_ACTIVO → franjaNota. Uso: node gen_usmle_v5.js && node assemble_usmle_ts.js && node update_diainicio.js && node remap_obsidian_usmle.js
// L-V únicamente. Skip: 2026-12-25, 2026-12-31, 2027-01-01. 95 días.
const SKIP = new Set(['2026-12-25', '2026-12-31', '2027-01-01']);
function* fechas(desde, hasta) {
  const d = new Date(desde + 'T12:00:00Z');
  const end = new Date(hasta + 'T12:00:00Z');
  while (d <= end) {
    const dow = d.getUTCDay();
    const iso = d.toISOString().slice(0, 10);
    if (dow >= 1 && dow <= 5 && !SKIP.has(iso)) yield iso;
    d.setUTCDate(d.getUTCDate() + 1);
  }
}
const F = [...fechas('2026-09-16', '2027-01-29')]; // v5.12: D1=mié 16-sep (15-sep tampoco estudiado) → D95=vie 29-ene (del 16-sep al 29-ene caben exactamente 95 hábiles)
console.log('// total dias:', F.length);

// helpers de material
const AM = 'AMBOSS + First Aid', PA = 'Pathoma (Sattar) + First Aid', SM = 'Sketchy Micro + First Aid',
      SP = 'Sketchy Pharm + First Aid', FU = 'First Aid + uWorld';

// [system, tier, sub, bbCh, bbVid, uw, mat, matType, palmId, palmT]
const CONTENT = [
// ── ARRANQUE · Principios (5) ──
['Fundamentos', 'CORE', 'Pathoma 1-2: lesión celular + muerte celular + inflamación', 'Pathology', 'Cell Injury + Inflammation', 'Principles of pathology', PA, 'path', 'BOtQJeFE_rc', 'The ONLY video: pass Step 1 in 2026'],
['Fundamentos', 'CORE', 'Pathoma 3: neoplasia (principios + carcinogénesis) · setup Anki FSRS', 'Pathology', 'Neoplasia 01-04', 'Principles of oncology', PA, 'path', 'Te5RnxeG_Gg', '5X Your Anki Efficiency (FSRS)'],
['Immunology', 'CORE', 'Inmunidad innata/adaptativa + MHC + linfocitos T/B', 'Immunology', 'Basic Immunology 01-05', 'Principles of immunology', AM, 'physio', 'Nfp3hs490wM', 'High Yield Immunology'],
['Immunology', 'CORE', 'Hipersensibilidades I-IV + autoinmunidad + inmunodeficiencias', 'Immunology', 'Clinical Immunology 01-03', 'Immune deficiencies', PA, 'path', null, null],
// ── CARDIOVASCULAR (10) ──
['Cardiovascular', 'CORE', 'Anatomía + fisiología cardíaca (GC, presiones, ciclos)', 'Cardiology', '01-02 Cardiac Anatomy & Physiology', 'Normal structure & function', AM, 'physio', 'hOGhcie47nM', 'High Yield Cardiology'],
['Cardiovascular', 'CORE', 'Hemodinámica + regulación de PA + HTA', 'Cardiology', '04-05 Blood Flow / BP Regulation + Hypertension', 'Hypertension', AM, 'physio', null, null],
['Cardiovascular', 'CORE', 'Curvas: PV loops, Wiggers, Starling', 'Cardiology', '06-09 PV Loops / Wiggers / Starling', 'Normal structure & function', AM, 'physio', null, null],
['Cardiovascular', 'CORE', 'Electrofisiología: potenciales + ECG + bloqueos', 'Cardiology', 'Arrhythmias 01-02', 'Cardiac arrhythmias', AM, 'physio', null, null],
['Cardiovascular', 'CORE', 'Taquiarritmias clínicas (FA, TSV, WPW, TV)', 'Cardiology', 'Arrhythmias 03-05', 'Cardiac arrhythmias', AM, 'clin', 'nFfdaHLtxag', 'High Yield Cardiology Part 2'],
['Cardiovascular', 'CORE', 'Antiarrítmicos + fármacos autonómicos CV', 'Cardiology', 'Arrhythmias 06-08 (Antiarrhythmics)', 'Cardiovascular drugs', SP, 'pharm', null, null],
['Cardiovascular', 'CORE', 'Aterosclerosis + isquemia + angina', 'Cardiology', 'Cardiac Ischemia 01-03', 'Coronary heart disease', PA, 'path', null, null],
['Cardiovascular', 'CORE', 'SCA: STEMI/NSTEMI/inestable + manejo + complicaciones IAM', 'Cardiology', 'Cardiac Ischemia 04-06', 'Coronary heart disease', AM, 'clin', null, null],
['Cardiovascular', 'CORE', 'Insuficiencia cardíaca + shock + fármacos IC', 'Cardiology', 'Other CV: Shock + HF', 'Heart failure and shock', PA, 'path', null, null],
['Cardiovascular', 'CORE', 'Valvulopatías + soplos + endocarditis · miocardiopatías + pericardio + congénitas', 'Cardiology', 'Valve Disease + HCM/Pericardial + Developing Heart', 'Valvular heart diseases', PA, 'clin', null, null],
// ── RESPIRATORY (6) ──
['Respiratory', 'CORE', 'Fisiología pulmonar: volúmenes + compliance + hemoglobina', 'Pulmonary', 'Physiology 04-06', 'Normal structure & function', AM, 'physio', 'HU3V0kftcqY', 'High Yield Respiratory'],
['Respiratory', 'CORE', 'V/Q + gradiente A-a + hipoxemia/hipoxia', 'Pulmonary', 'Physiology 09-12', 'Normal structure & function', AM, 'physio', null, null],
['Respiratory', 'CORE', 'Obstructivas: asma + EPOC + PFTs + broncodilatadores', 'Pulmonary', 'PFTs + COPD + Asthma', 'Obstructive lung disease', SP, 'clin', null, null],
['Respiratory', 'CORE', 'Restrictivas + intersticiales + ocupacionales', 'Pulmonary', 'Restrictive/ILD', 'Interstitial lung disease', PA, 'path', null, null],
['Respiratory', 'CORE', 'Neumonía + TBC + absceso', 'Pulmonary', 'Pneumonia I-II + TB', 'Pulmonary infections', SM, 'micro', null, null],
['Respiratory', 'CORE', 'TEP/TVP + HTP + ARDS + cáncer de pulmón', 'Pulmonary', 'DVT/PE + Lung Cancer', 'Pulmonary vascular disease', PA, 'path', null, null],
// ── RENAL (7) ──
['Renal', 'CORE', 'Nefrona + filtración + clearance + FG', 'Renal', 'Renal Physiology I-II + Nephron', 'Normal structure & function', AM, 'physio', 'zeM8dMiRsJQ', 'High Yield Renal'],
['Renal', 'CORE', 'Transporte tubular + diuréticos (sitio de acción)', 'Renal', 'Tubular Transport + Diuretics', 'Fluid/electrolytes/acid-base', SP, 'pharm', null, null],
['Renal', 'CORE', 'Electrolitos completos: Na/agua + SIADH/DI + K + Ca + P', 'Renal', 'Electrolytes 01-03', 'Fluid/electrolytes/acid-base', AM, 'physio', 'CIIMMIvrRso', 'High Yield Renal Part 2'],
['Renal', 'CORE', 'Ácido-base paso a paso + compensaciones + GAP', 'Renal', 'Acid-Base 02-07', 'Fluid/electrolytes/acid-base', AM, 'physio', null, null],
['Renal', 'CORE', 'Glomerulares: nefrítico vs nefrótico (patrones)', 'Renal', 'Nephritic + Nephrotic Syndrome', 'Glomerular diseases', PA, 'path', null, null],
['Renal', 'CORE', 'AKI (pre/intra/post) + ERC + litiasis + poliquistosis', 'Renal', 'Renal Failure + Kidney Stones', 'Acute kidney injury', AM, 'clin', null, null],
// ── GASTROINTESTINAL (7) ──
['Gastrointestinal', 'CORE', 'Fisiología GI: secreciones + hormonas + motilidad', 'Gastroenterology', 'GI Physiology 03-05', 'Normal structure & function', AM, 'physio', '8gfhX1aR9-A', 'High Yield GI'],
['Gastrointestinal', 'CORE', 'Esófago + estómago: ERGE, acalasia, úlcera, H. pylori, Ca', 'Gastroenterology', 'Esophageal + Gastric Disorders', 'Gastroesophageal disorders', AM, 'clin', null, null],
['Gastrointestinal', 'CORE', 'Intestino delgado: malabsorción + celiaquía + EII', 'Gastroenterology', 'Malabsorption + IBD', 'Intestinal & colorectal disorders', PA, 'path', 'E2sE4E6s9B8', 'High Yield GI Part 2'],
['Gastrointestinal', 'CORE', 'Colon: pólipos + CCR (vías) + diverticular + isquemia', 'Gastroenterology', 'Colon Cancer + Polyps', 'Tumors of the GI tract', PA, 'path', null, null],
['Gastrointestinal', 'CORE', 'Hígado I: LFTs + bilirrubina/ictericias + hepatitis', 'Gastroenterology', 'Liver: LFTs + Bilirubin + Hepatitis', 'Hepatic disorders', AM, 'physio', null, null],
['Gastrointestinal', 'CORE', 'Hígado II: cirrosis + complicaciones + HCC + hereditarias', 'Gastroenterology', 'Cirrhosis + Complications', 'Hepatic disorders', PA, 'path', null, null],
['Gastrointestinal', 'CORE', 'Biliar + páncreas: litiasis, colecistitis, pancreatitis, Ca', 'Gastroenterology', 'Bilirubin + Gallstones + Pancreatitis', 'Biliary tract disorders', AM, 'clin', null, null],
// ── ENDOCRINE (6) ──
['Endocrine', 'CORE', 'Ejes hipotálamo-hipófisis + feedback (1º vs 2º vs 3º)', 'Endocrinology', 'Hypothalamus-Pituitary Axes', 'Hypothalamus & pituitary', AM, 'physio', 'oQ8PSvInTgM', 'High Yield Endocrinology'],
['Endocrine', 'CORE', 'Tiroides: síntesis + hiper/hipo + tiroiditis + Ca', 'Endocrinology', 'Thyroid 01-04', 'Thyroid disorders', AM, 'clin', null, null],
['Endocrine', 'CORE', 'Suprarrenal: Cushing / Addison / CAH / feocromocitoma', 'Endocrinology', 'Adrenals 01-04', 'Adrenal disorders', PA, 'path', null, null],
['Endocrine', 'CORE', 'DM 1 y 2: fisiopatología + DKA/HHS + tratamiento (insulinas, ADO, GLP-1/SGLT2)', 'Endocrinology', 'Pancreas 03-06', 'Diabetes mellitus', SP, 'clin', null, null],
['Endocrine', 'CORE', 'Calcio/PTH + MEN + patología hipofisaria', 'Endocrinology', 'Other 01-05 Pituitary/PTH/MEN', 'Endocrine tumors', AM, 'physio', null, null],
// ── NERVOUS SYSTEM (8) ──
['Nervous System', 'CORE', 'Neuroanatomía localizadora + vías ascendentes/descendentes', 'Neurology', 'Nervous System Structures 01-05', 'Normal structure & function', AM, 'anat', 'YIwfdc7E8TU', 'High Yield Neuro'],
['Nervous System', 'CORE', 'Médula espinal: síndromes + Brown-Séquard', 'Neurology', 'Spinal Cord Syndromes', 'Normal structure & function', AM, 'anat', null, null],
['Nervous System', 'CORE', 'Tronco + pares craneales + reflejos', 'Neurology', 'Cranial Nerves I-II + Brainstem', 'Normal structure & function', AM, 'anat', '52xHDZJy2sw', 'High Yield Neuro Part 2'],
['Nervous System', 'CORE', 'SNA + fármacos autonómicos (completo)', 'Neurology', 'Autonomic NS 01-07', 'Normal structure & function', SP, 'pharm', null, null],
['Nervous System', 'CORE', 'Ictus: territorios + isquémico/hemorrágico + HSA', 'Neurology', 'Neurovascular 01-06', 'Cerebrovascular disease', AM, 'clin', null, null],
['Nervous System', 'CORE', 'Convulsiones + antiepilépticos', 'Neurology', 'Other 03-05 Seizures', 'Disorders of peripheral nerves/muscles', SP, 'pharm', null, null],
['Nervous System', 'CORE', 'Demencias + Parkinson + trastornos del movimiento', 'Neurology', 'Other 08, 14-15', 'Neurodegenerative & dementias', PA, 'path', null, null],
['Nervous System', 'CORE', 'EM/desmielinizantes + meningitis + NMJ + tumores SNC', 'Neurology', 'Other 01-02, 09-10, 18', 'CNS infections', AM, 'clin', null, null],
// ── HEMATOLOGY & ONCOLOGY (6) ──
['Hematology & Oncology', 'HIGH', 'Anemias microcíticas: Fe + talasemias + frotis', 'Hematology', 'Red Blood Cells 04-05', 'Red blood cell disorders', PA, 'path', 'zFGfP4d_aOc', 'High Yield Hematology'],
['Hematology & Oncology', 'HIGH', 'Macro/normocíticas + hemólisis + drepanocitosis', 'Hematology', 'Red Blood Cells 01-03, 06', 'Red blood cell disorders', PA, 'path', null, null],
['Hematology & Oncology', 'HIGH', 'Coagulación: cascada + PT/PTT + hemofilias + vWD', 'Hematology', 'Hemostasis 01-02', 'Hemostasis & thrombosis', AM, 'physio', null, null],
['Hematology & Oncology', 'HIGH', 'Plaquetas (PTI/PTT/SUH) + hipercoagulabilidad + CID', 'Hematology', 'Hemostasis 03-04', 'Platelet disorders', PA, 'path', null, null],
['Hematology & Oncology', 'HIGH', 'Leucemias agudas y crónicas + mielodisplasia', 'Hematology', 'White Blood Cells 01-02', 'White blood cell disorders', PA, 'path', null, null],
['Hematology & Oncology', 'HIGH', 'Linfomas + mieloma + transfusión + fármacos onco', 'Hematology', 'White Blood Cells 03-05', 'White blood cell disorders', PA, 'path', null, null],
// ── MICROBIOLOGY / ID (7) ──
['Microbiology / ID', 'HIGH', 'Bacteriología general + genética bacteriana + Gram+ cocos', 'Infectious Disease', 'Bacteria 01-03', 'Bacterial infections', SM, 'micro', null, null],
['Microbiology / ID', 'HIGH', 'Gram+ bacilos + anaerobios + Gram− cocos', 'Infectious Disease', 'Bacteria 04-05', 'Bacterial infections', SM, 'micro', null, null],
['Microbiology / ID', 'HIGH', 'Gram− bacilos (entéricos + respiratorios) + zoonosis', 'Infectious Disease', 'Bacteria 06-08', 'Bacterial infections', SM, 'micro', null, null],
['Microbiology / ID', 'HIGH', 'Micobacterias + espiroquetas + atípicas (Chlamydia/Mycoplasma)', 'Infectious Disease', 'TB + Spirochetes', 'Bacterial infections', SM, 'micro', null, null],
['Microbiology / ID', 'HIGH', 'Virus DNA + herpes + hepatitis virales', 'Infectious Disease', 'Viruses 01-05', 'Viral infections', SM, 'micro', null, null],
['Microbiology / ID', 'HIGH', 'Virus RNA + VIH + arbovirus', 'Infectious Disease', 'Viruses 06-09', 'Viral infections', SM, 'micro', null, null],
['Microbiology / ID', 'HIGH', 'Hongos + parásitos + antimicrobianos (ATB/antifúngicos/antivirales)', 'Infectious Disease', 'Fungi + Parasites + Antibiotics', 'Antimicrobial drugs', SM, 'micro', null, null],
// ── REPRODUCTIVE (5) ──
['Reproductive', 'HIGH', 'Embriología general + ciclo menstrual + hormonas repro', 'Reproductive', 'Endocrinology Reproductive 01-05', 'Reproductive endocrinology', AM, 'repro', '4D7MO0TR2fY', 'High Yield OB/GYN'],
['Reproductive', 'HIGH', 'Embarazo: fisiología + preeclampsia + TORCH', 'Reproductive', 'Pregnancy 04-09', 'Pregnancy & childbirth disorders', AM, 'clin', 'nYtSNyXh_Ww', 'High Yield OB/GYN Part 2'],
['Reproductive', 'HIGH', 'Gineco-oncología: cérvix + endometrio + ovario', 'Reproductive', 'Vagina/Cervix/Uterus + Ovary', 'Female genital tract tumors', PA, 'path', null, null],
['Reproductive', 'HIGH', 'Mama + aparato masculino + próstata', 'Reproductive', 'Breast + Male Disorders 01-04', 'Male reproductive disorders', PA, 'path', null, null],
['Reproductive', 'HIGH', 'ITS + anticoncepción + amenorreas + SOP', 'Reproductive', 'STIs + Contraception', 'GU infections', AM, 'clin', null, null],
// ── MSK / DERM / RHEUM (4) ──
['Musculoskeletal / Rheum', 'HIGH', 'Artritis: AR/OA/gota/espondiloartropatías + autoanticuerpos', 'Musculoskeletal', 'Pathology 06 Arthritis + Gout', 'Arthritis & spondyloarthropathies', PA, 'path', null, null],
['Musculoskeletal / Rheum', 'HIGH', 'LES + conectivopatías + vasculitis', 'Musculoskeletal', 'Immunology Autoimmune 01-06', 'Autoimmune & vasculitides', PA, 'path', null, null],
['Musculoskeletal / Rheum', 'HIGH', 'Hueso (osteoporosis/Paget/tumores) + anatomía MSK high-yield (plexos, nervios) + dermato Step 1', 'Musculoskeletal', 'Pathology 01-05 Bone + Anatomy + Dermatology', 'Metabolic bone disorders', PA, 'path', null, null],
// ── PSYCH / BEHAVIORAL / BIOSTATS (5) ──
['Psychiatry & Behavioral', 'HIGH', 'Trastornos del ánimo + psicóticos + DSM esquema', 'Psychiatry', 'Pathology 05-06, 10', 'Mood disorders', FU, 'behav', null, null],
['Psychiatry & Behavioral', 'HIGH', 'Ansiedad + personalidad + infancia (TDAH/autismo) + sustancias/toxidromes', 'Psychiatry', 'Pathology 07-09, 11 + Substance Use', 'Anxiety disorders', FU, 'behav', null, null],
['Psychiatry & Behavioral', 'HIGH', 'Psicofármacos: AD + antipsicóticos + litio + ansiolíticos', 'Psychiatry', 'Pharmacology 01-03', 'Mood disorders', SP, 'pharm', null, null],
['Psychiatry & Behavioral', 'HIGH', 'Bioestadística + epidemiología + ética/comunicación (AMBOSS HY 155Q)', 'Biostats/Epi', 'Biostatistics complete', 'Biostatistics & epidemiology', FU, 'behav', null, null],
// ── BIOCHEMISTRY / GENETICS (4) ──
// -- CIERRE FASE A · v5.7 (8-sep): 4 dias fusionados en 2 por el corrimiento a D1=9-sep. Ningun tema se pierde:
//    se comprime lo de MENOR ROI segun Palmerton (rutas metabolicas completas) y la farmacologia general,
//    que ya se vio sistema por sistema durante toda la Fase A (aqui solo es repaso transversal de PK/PD).
['Biochemistry', 'MED', 'Bioquímica HY (día doble): metabolismo glucólisis/TCA/CTE + glucógeno + lípidos · aminoácidos + ciclo de urea + errores innatos + vitaminas (SOLO high-yield: Palmerton = rutas completas son poco ROI)', 'Biochemistry', 'Metabolism 02-09 + Glycogen + Lipids + Amino Acids + Vitamins', 'Bioenergetics & carbohydrate metabolism + Amino acids/proteins/enzymes', AM, 'biochem', 'FcXG3ux0a1I', 'High Yield Biochemistry'],
['Biochemistry', 'MED', 'Cierre Fase A (día doble): biología molecular + genética (herencias, trinucleótidos) · farmacología general transversal PK/PD + toxicología + antídotos', 'Biochemistry', 'Molecular Biochemistry + Genetics + Pharmacokinetics/Toxicology', 'Cell & molecular biology + General principles of pharmacology', AM, 'biochem', 'J2KWVQ67H2U', 'High Yield Pharmacology (+ Part 2 PvKp25ku0po)'],
];

// Simulacros de hito (viernes) — fecha → entrada
const SIMS = {
  // v5.10-v5.12: el UWSA1 se MUEVE de fecha con cada corrimiento (vie 11 → lun 14 → mar 15 → mié 16-sep) para seguir siendo el D1. Único hito que cambia de fecha.
  '2026-09-16': ['Assessment', 'CORE', '🎯 UWSA1 — BASELINE (160Q, 09:00-13:00) + revisión completa por la tarde', 'Assessment', '—', 'uWorld Self-Assessment 1', 'uWorld UWSA1', 'clin'],
  '2026-10-02': ['Assessment', 'CORE', '🎯 NBME 25 (07:15-11:00) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 25', 'NBME 25 (Qbankly)', 'clin'],
  '2026-10-23': ['Assessment', 'CORE', '🎯 NBME 26 (07:15-11:00) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 26', 'NBME 26 (Qbankly)', 'clin'],
  '2026-11-13': ['Assessment', 'CORE', '🎯 NBME 27 (07:15-11:00) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 27', 'NBME 27 (Qbankly)', 'clin'],
  '2026-12-04': ['Assessment', 'CORE', '🎯 NBME 28 (07:15-11:00) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 28', 'NBME 28 (Qbankly)', 'clin'],
  '2026-12-18': ['Assessment', 'CORE', '🎯 NBME 29 (07:15-11:00) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 29', 'NBME 29 (Qbankly)', 'clin'],
  '2026-12-30': ['Assessment', 'CORE', '🎯 NBME 30 — cierre Fase A (07:15-11:00) + plan Fase B según gaps', 'Assessment', '—', 'NBME CBS Form 30', 'NBME 30 (Qbankly)', 'clin'],
  // v5.8/v5.9: los 5 hitos de enero están ANCLADOS POR FECHA (no posicionales) — así el día extra
  // del corrimiento se absorbe al final del plan sin mover ningún hito de su fecha original.
  '2027-01-08': ['Assessment', 'CORE', '🎯 UWSA2 — el predictor gold-standard (09:00-13:00) + revisión', 'Banco', '—', 'uWorld UWSA2', 'uWorld + First Aid + Anki', 'clin'],
  '2027-01-15': ['Assessment', 'CORE', '🎯 NBME 31 (07:15-11:00) + decisión GO/NO-GO de fecha de examen', 'Banco', '—', 'NBME 31 (Qbankly)', 'uWorld + First Aid + Anki', 'clin'],
  '2027-01-18': ['Sprint final', 'CORE', '🎯 NBME 32 (07:15-11:00) + revisión + repaso FA sistemas 1-5', 'Sprint', '—', 'NBME 32 (Qbankly)', 'uWorld + First Aid + Anki', 'clin'],
  '2027-01-20': ['Sprint final', 'CORE', '🎯 NBME 33 (07:15-11:00) + revisión + repaso FA sistemas 11-14', 'Sprint', '—', 'NBME 33 (Qbankly)', 'uWorld + First Aid + Anki', 'clin'],
  '2027-01-22': ['Sprint final', 'CORE', '🎯 FREE 120 oficial (07:15-11:00) + logística del examen + cierre', 'Sprint', '—', 'NBME Free 120', 'uWorld + First Aid + Anki', 'clin'],
};

// POST-FASE A (v5.12) — los 10 días NO-hito que van después del último día de contenido.
// Se consumen EN ORDEN en los huecos libres de enero (los 5 hitos de enero ya viven en SIMS, por fecha).
// Ningún item se recorta: el que no cabe antes del Free 120 se alarga al vie 29-ene (D95, última sesión; examen lun 1-feb).
// [system, tier, sub, uw, bbCh]
const POST_A = [
  ['Banco intensivo', 'CORE', 'Random timed 2×40Q + revisión profunda + sistema débil #1 (según NBMEs)', 'uWorld timed random', 'Banco'],
  ['Banco intensivo', 'CORE', 'Random timed 2×40Q + revisión + sistema débil #1 (First Aid + Anki)', 'uWorld timed random', 'Banco'],
  ['Banco intensivo', 'CORE', 'Random timed 2×40Q + revisión + sistema débil #2', 'uWorld timed random', 'Banco'],
  ['Banco intensivo', 'CORE', 'Random timed 2×40Q + revisión + sistema débil #2 (Mehlman HY del sistema)', 'uWorld timed random', 'Banco'],
  ['Banco intensivo', 'CORE', 'uWorld incorrects (2ª pasada) + sistema débil #3', 'uWorld incorrects', 'Banco'],
  ['Banco intensivo', 'CORE', 'uWorld incorrects (2ª pasada) + sistema débil #3', 'uWorld incorrects', 'Banco'],
  ['Banco intensivo', 'CORE', 'uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 1)', 'AMBOSS 200 conceptos', 'Banco'],
  ['Banco intensivo', 'CORE', 'uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 2)', 'AMBOSS 200 conceptos', 'Banco'],
  ['Sprint final', 'CORE', 'Repaso First Aid rápido sistemas 6-10 + Anki marathon + incorrects', 'First Aid + Anki', 'Sprint'],
  ['Sprint final', 'CORE', 'Repaso rapid review First Aid (páginas finales) + Anki + laboratorio de dudas', 'First Aid rapid review', 'Sprint'],
];

const dias = [];
let ci = 0;
let d = 0;
for (const fecha of F) {
  d++;
  let row;
  if (SIMS[fecha]) {
    const s = SIMS[fecha];
    row = { d, fecha, system: s[0], tier: s[1], sub: s[2], bbCh: s[3], bbVid: s[4], uw: s[5], mat: s[6], matType: s[7], palm: null };
  } else if (ci < CONTENT.length) {
    // v5.9+: el CONTENIDO manda — se consume ENTERO (1:1, sin fusiones ni recortes) antes de abrir el banco.
    const c = CONTENT[ci++];
    row = { d, fecha, system: c[0], tier: c[1], sub: c[2], bbCh: c[3], bbVid: c[4], uw: c[5], mat: c[6], matType: c[7], palm: c[8] ? { id: c[8], t: c[9] } : null };
  } else {
    const s = POST_A.shift();
    if (!s) { console.error('SIN ITEM POST-FASE-A para', fecha, 'd', d); break; }
    row = { d, fecha, system: s[0], tier: s[1], sub: s[2], bbCh: s[4], bbVid: '—', uw: s[3], mat: 'uWorld + First Aid + Anki', matType: 'clin', palm: null };
  }
  dias.push(row);
}
// ── Palmerton v3 (5-sep-2026): 5 niveles UWorld por día → nivelUW (1-5) + qDia (Q uWorld objetivo del día) ──
// Regla DETERMINISTA (no toca fechas, sistemas, hitos ni el total de días):
//  · Fase A (contenido): posición del día dentro de su sistema (sin contar Assessment):
//      1º-2º día del sistema → nivel 1 (bloques 5Q tutor SIN tiempo del subtema nuevo · 10 pre-test + 20 consolidación = 30Q)
//      viernes SIN hito y ≥3º día  → nivel 3 (11:00 = 20Q sistema completo timed + 10Q tutor · 40Q)
//      resto                       → nivel 2 (bloques 5Q timed de subtemas ya validados · 10 + 30 = 40Q)
//  · Hitos (UWSA/NBME/Free 120): formato nivel 5 como MEDICIÓN (UWSA 160Q · NBME 200Q · Free 120 = 120Q)
//  · Fase B (bbCh='Banco'): 'Random timed' → nivel 4 (2×40Q mixtos timed = 80Q) · resto → nivel 5 (incorrects + AMBOSS 200 = 80Q)
//  · Fase C (bbCh='Sprint'): nivel 5 · días sin simulacro = SOLO flagged/incorrects, sin preguntas nuevas (1º 40Q · resto 20Q)
//    v5.9+: la clasificación ya NO usa umbrales de fecha (2027-01-04 / 2027-01-18) sino el origen de la fila (bbCh),
//    porque el contenido de Fase A se derrama hasta enero y el sprint se alarga (v5.12: hasta el vie 29-ene).
//  El gate (80% en 10Q consecutivas) vive en USMLE_GATE / usmleScores.ts, no aquí.
//
// ── 12-sep-2026 (tarde) · VIERNES DE NIVEL 4 (divergencia Palmerton #6 · decisión §E-2 → IMPLEMENTADA) ──
//  Desde la semana VIERNES_N4_DESDE_SEMANA (S1 = semana del D1, lun 14-sep; S11 = semana del lun 23-nov → vie 27-nov),
//  los viernes SIN hito de Fase A que serían nivel 3 (sistema único timed) pasan a NIVEL 4: 11:00 = 20-30Q timed MIXTOS
//  de los sistemas ya dominados (≥6 cerrados en S11) + 10Q tutor del subtema del día. Cambia SOLO nivelUW/qDia/franjaNota;
//  el subtema, el sistema, el material y el orden NO se tocan (el multiconjunto de contenido es idéntico).
//  Los viernes que abren sistema (pos ≤ 2, p. ej. D65 Repro) siguen en nivel 1: el subtema nuevo necesita su bloque tutor.
//  0 = desactivado (vuelve a la regla v5.10 original: viernes ≥3º día = nivel 3).
const VIERNES_N4_DESDE_SEMANA = 11;
// ── 12-sep-2026 (tarde) · TAPER D94-D95 (divergencia #22 · decisión §E-5 → IMPLEMENTADA) ──
//  v5.12 (15-sep): el plan termina el vie 29-ene (D95 = última sesión, D-3) y el examen target es el LUN 1-FEB: D94 jue 28 y
//  D95 vie 29 = taper (20Q flagged + Anki maduro); sáb 30 = D-2 y dom 31 = D-1 FUERA del plan (solo Anki vencido + ritual
//  de test-day el domingo) → USMLE_TAPER en assemble_usmle_ts.js.
//  Ambos días bajan a 20Q (solo flagged/incorrects ya vistos) + Anki MADURO; cero preguntas nuevas, cero tarjetas nuevas.
//  Cambia SOLO qDia (D94: 40 → 20) y franjaNota; el contenido (sub) de D94/D95 no se toca.
const TAPER_ACTIVO = true;
const SEMANA1 = new Date(F[0] + 'T12:00:00Z'); // lunes del D1
const semanaDe = (fecha) => Math.floor((new Date(fecha + 'T12:00:00Z') - SEMANA1) / (7 * 864e5)) + 1;
function qHito(sub) {
  if (/UWSA/.test(sub)) return 160;
  if (/FREE 120/i.test(sub)) return 120;
  if (/NBME/.test(sub)) return 200;
  return 40;
}
const posSistema = {};
let faseCidx = 0;
const sprintNoHito = dias.filter(x => x.bbCh === 'Sprint' && !/🎯/.test(x.sub)); // D94, D95 (taper)
for (const x of dias) {
  const dow = new Date(x.fecha + 'T12:00:00Z').getUTCDay();
  const hito = /🎯/.test(x.sub);
  if (hito) { x.nivelUW = 5; x.qDia = qHito(x.sub); continue; }
  if (x.bbCh === 'Sprint') { // Fase C sin simulacro: taper (solo flagged/incorrects)
    faseCidx++;
    x.nivelUW = 5; x.qDia = faseCidx === 1 ? 40 : 20;
    if (TAPER_ACTIVO && sprintNoHito.length >= 2 && (x === sprintNoHito[sprintNoHito.length - 2] || x === sprintNoHito[sprintNoHito.length - 1])) {
      const esD2 = x === sprintNoHito[sprintNoHito.length - 1];
      x.qDia = 20;
      x.franjaNota = esD2
        ? 'TAPER · ÚLTIMA SESIÓN (vie 29-ene = D95 = D-3 · Palmerton §8.3): sesión LIGERA — solo Anki MADURO + 20Q flagged de UWorld con los mejores esquemas e imágenes · cero preguntas nuevas, cero tarjetas nuevas, ningún bloque timed · tarde: preparar permiso impreso + 2 ID, bolsas Ziploc numeradas (Break #1-#4), ruta al Prometric · sáb 30 = D-2 y dom 31-ene = D-1 FUERA DEL PLAN (solo Anki vencido, nada después de las 17:00 del domingo, dormir temprano) · lun 1-feb = EXAMEN (target v5.12, fuera de la ventana 25-29 ene: reprogramar Prometric)'
        : 'TAPER D-4 (jue 28-ene · Palmerton §8.3): cesa TODO lo nuevo — solo Anki MADURO + 20Q flagged/incorrects ya vistos (sin bloque timed, sin AMBOSS) · repaso First Aid de esquemas, no de detalle · dormir ≥7 h ya desde hoy';
    }
    continue;
  }
  if (x.bbCh === 'Banco') { // Fase B (banco intensivo)
    x.nivelUW = /Random timed/.test(x.sub) ? 4 : 5; x.qDia = 80; continue;
  }
  const pos = (posSistema[x.system] = (posSistema[x.system] || 0) + 1);
  if (pos <= 2) { x.nivelUW = 1; x.qDia = 30; }
  else if (dow === 5 && VIERNES_N4_DESDE_SEMANA > 0 && semanaDe(x.fecha) >= VIERNES_N4_DESDE_SEMANA) {
    x.nivelUW = 4; x.qDia = 40;
    x.franjaNota = `VIERNES NIVEL 4 (S${semanaDe(x.fecha)} · desde S${VIERNES_N4_DESDE_SEMANA}, Palmerton #6): 11:00 = 20-30Q timed MIXTOS de los sistemas ya dominados (${Object.keys(posSistema).filter(s => s !== x.system).join(', ')}) + 10Q tutor del subtema de hoy · gate: ≥80% en el bloque mixto → listo para Fase B; <80% → auditar el sistema que más falló (no el subtema de hoy)`;
  }
  else if (dow === 5) { x.nivelUW = 3; x.qDia = 40; }
  else { x.nivelUW = 2; x.qDia = 40; }
}
console.log('// viernes N4 (desde S' + VIERNES_N4_DESDE_SEMANA + '):', dias.filter(x => x.nivelUW === 4 && x.bbCh !== 'Banco').map(x => 'D' + x.d + ' ' + x.fecha + ' ' + x.system).join(' · ') || '(ninguno)');
console.log('// taper:', dias.filter(x => x.franjaNota && /TAPER/.test(x.franjaNota)).map(x => 'D' + x.d + ' ' + x.fecha + ' ' + x.qDia + 'Q').join(' · '));
const byNivel = {};
dias.forEach(x => byNivel['N' + x.nivelUW] = (byNivel['N' + x.nivelUW] || 0) + 1);
console.log('// niveles:', JSON.stringify(byNivel), '· Q total plan:', dias.reduce((a, x) => a + x.qDia, 0));
console.log('// dias generados:', dias.length, '· contenido usado:', ci, '/', CONTENT.length, '· postA restante:', POST_A.length);
console.log('// ultimo dia:', JSON.stringify(dias[dias.length - 1]));
const fs = require('fs');
const out = 'export const DIAS: DiaUSMLE[] = ' + JSON.stringify(dias).replace(/"([a-zA-Z]+)":/g, '$1:') + ';';
fs.writeFileSync(__dirname + '/usmle_dias_v5.txt', out, 'utf8');
console.log('// escrito usmle_dias_v5.txt ·', out.length, 'chars');
// distribución
const bySys = {};
dias.forEach(x => bySys[x.system] = (bySys[x.system] || 0) + 1);
console.log(JSON.stringify(bySys, null, 1));
