// Generador de los arrays DIAS (tramo 1 = F1) y DIAS_T2 (tramo 2) de usmleStep1Daily.ts — v6.00: D1-D60 = mié 7-oct → mié 30-dic-2026
//   + T1…T158 (d 101-258) = mar 16-mar → sáb 25-sep-2027 · examen lun 27-sep-2027 (base de planificación DJ-1; PROVISIONAL).
// v6.00 (6-oct-2026): REESTRUCTURACIÓN ANUAL (V6_ESPEC §B; DJ-1…DJ-5 de Joseph). FIN DEL CORRIMIENTO DIARIO: las fechas ya no son
//   constantes de este fichero, salen de DATA/_scripts/_fechas_v6.json validado por ../gen_fechas_v6.js (aborta si guardado ≠ derivado).
//   · F1 = 60 hábiles (f1.inicio → f1.fin, skip v6): D1-D57 IDÉNTICOS a v5.20 (fecha, contenido, nivelUW, qDia, franjaNota; solo cambia
//     la hora de los NBME 25-28: (07:15-11:00) → (07:00-12:30), §B1) · D58 = fila v5.20 D79 copiada tal cual (bioestadística; nivel 1 · 30Q
//     por la regla posSistema) · D59-D60 = C1/C2 COLCHÓN F1 (nivelUW 4 · qDia 40 por EXCEPCIÓN explícita).
//   · SIMS indexado por D# (no por fecha): los 12 hitos v5.20 conservan su D#; los de F1 (D1/D10/D25/D40/D55) viven en DIAS y los de
//     2027 (D65…D87) solo en la secuencia virtual v5.20 (su texto v5.20 es el subV520 del tramo 2, que los re-horariza).
//   · Tramo 2 (DIAS_T2) = gen_tramo2.js (PORT de ref_v6/gen_tramo2_ref.js r2, salida IDÉNTICA en todas las claves, V2): reinicio
//     mar 16-mar, SERUMS L-S desde lun 3-may [S], hitos 2027 por ventana semanal + preferente (§B5), taper y ritual, 40 filas COLCHÓN.
//     Opciones (las de la referencia): --congelar-hasta F --previo tramo2_vigente.json [--examen-previo E] [--pendientes uid,…]
//     (regeneración a mitad de camino, §B7.5) · --pendientes-f1 d,… (cierre de F1, disparador (f)) · --proteg a,b (adjudicación…)
//     · déficit de filas → ABORTA con exit 2 y no escribe nada (R1: nunca se recorta; --permitir-deficit solo con --seco).
//     Posicionales [ENCAPS] [EXAMEN] [SERUMS] solo para explorar con --seco (en producción mandan las fechas del JSON).
//   · Salidas: usmle_dias_v5.txt (DIAS + DIAS_T2 en TS) · usmle_dias_v6.json (lo lee assemble_usmle_ts.js) · tramo2_vigente.json
//     (DIAS_T2 en JSON = el --previo de la próxima regeneración con congelado y el fichero de V1/V2) · --json/--md opcionales.
//   Uso: node gen_usmle_v5.js && node assemble_usmle_ts.js && node update_diainicio.js && node remap_obsidian_usmle.js
//        && node verificar_v6.js   (V1 · V2 · V2b · V3 · F1 = v5.20 · API del .ts)
// ── historia v5.x (corrimiento rígido; ya NO aplica desde la v6.00) ──
// v5.20 (6-oct-2026, «DEFINITIVA»): tampoco se estudió el mar 6-oct → todo corre a D1 = MIÉ 7-OCT (27 hábiles perdidos desde el 31-ago).
//   Joseph: «todo inicia el día 7 de octubre … tan solamente corre las fechas». MISMA REGLA RÍGIDA (+1 hábil; temas intactos;
//   los 12 hitos conservan su D#). Con D1 en MIÉRCOLES los hitos caen casi todos en MARTES: UWSA1 mié 7-oct · NBME 25 mar 20-oct ·
//   26 mar 10-nov · 27 mar 1-dic · 28 mar 22-dic · 29 vie 8-ene (saltos 25-dic, 31-dic, 1-ene) · 30 mar 19-ene · UWSA2 mar 26-ene ·
//   NBME 31 mar 2-feb (GO/NO-GO, D82) · 32 mié 3-feb · 33 vie 5-feb · Free 120 mar 9-feb. Contenido cierra el lun 1-feb (D81).
//   D94 jue 18-feb = última sesión de banco · D95 vie 19-feb = último día del plan (D-1 HÁBIL) · sáb 20 y dom 21 libres (dom = D-1 real,
//   sin estudio) → EXAMEN TARGET LUN 22-FEB-2027. Tras el examen arranca la INTENSIVA ENCAPS (mar 23-feb → examen SERUMS mié 10-mar-2027).
// v5.19 (5-oct-2026): tampoco se estudió el lun 5-oct → todo corre a D1 = MAR 6-OCT (26 hábiles perdidos desde el 31-ago).
//   Joseph: «todo inicia el día de mañana 6 … solo corre las fechas y alarga un día más la fecha de término; no elimines
//   exámenes ni evaluaciones ya programados». MISMA REGLA RÍGIDA (+1 hábil; temas intactos; los 12 hitos conservan su D#).
//   Con D1 en MARTES los hitos caen casi todos en LUNES: UWSA1 mar 6-oct · NBME 25 lun 19-oct · 26 lun 9-nov · 27 lun 30-nov ·
//   28 lun 21-dic · 29 jue 7-ene (saltos 25-dic, 31-dic, 1-ene) · 30 lun 18-ene · UWSA2 lun 25-ene · NBME 31 lun 1-feb
//   (GO/NO-GO, D82) · 32 mar 2-feb · 33 jue 4-feb · Free 120 lun 8-feb. Contenido cierra el vie 29-ene (D81). D94 mié 17-feb =
//   última sesión de banco · D95 jue 18-feb = último día del plan y D-1 REAL (sin finde en medio) → EXAMEN TARGET VIE 19-FEB-2027.
// v5.18 (3-oct-2026): tampoco se estudiaron el jue 1 ni el vie 2-oct → todo corre a D1 = LUN 5-OCT (25 hábiles perdidos
//   desde el 31-ago). Joseph: «todo inicia el 5, corre lo que tengas que correr para que todo inicie el 5». MISMA REGLA RÍGIDA
//   (+2 hábiles; temas intactos; los 12 hitos conservan su D#). Con D1 en LUNES los hitos vuelven casi todos a VIERNES:
//   UWSA1 lun 5-oct · NBME 25 vie 16-oct · 26 vie 6-nov · 27 vie 27-nov · 28 vie 18-dic · 29 mié 6-ene (saltos 25-dic,
//   31-dic, 1-ene) · 30 vie 15-ene · UWSA2 vie 22-ene · NBME 31 vie 29-ene (GO/NO-GO, D82) · 32 lun 1-feb · 33 mié 3-feb ·
//   Free 120 vie 5-feb. Contenido cierra el jue 28-ene (D81). D94 mar 16-feb = última sesión de banco · D95 mié 17-feb =
//   último día del plan y D-1 REAL (sin finde en medio, como en v5.16) → EXAMEN TARGET JUE 18-FEB-2027.
// v5.17 (30-sep-2026): tampoco se estudiaron el lun 28, el mar 29 ni el mié 30-sep → todo corre a D1 = JUE 1-OCT
//   (23 hábiles perdidos desde el 31-ago). MISMA REGLA que en v5.15/v5.16, pedida otra vez por Joseph («todo inicia desde
//   mañana … solo corre los días en todos los aspectos; la fecha de término alarga los días que no se realizó»):
//   **CORRIMIENTO RÍGIDO** — solo corren los días (+3 hábiles), ningún tema se toca, y los 12 hitos NBME/UWSA/Free 120
//   corren con el plan conservando EXACTAMENTE su D# (UWSA1 D1 · NBME25 D10 · 26 D25 · 27 D40 · 28 D55 · 29 D65 · 30 D72 ·
//   UWSA2 D77 · NBME31 D82 · 32 D83 · 33 D85 · Free120 D87). Con D1 en JUEVES casi todos caen en MIÉRCOLES (D10 14-oct,
//   D25 4-nov, D40 25-nov, D55 16-dic, D72 13-ene, D77 20-ene, D82 27-ene, D87 3-feb); el NBME 29 = D65 cae el lun 4-ene
//   (saltos 25-dic, 31-dic y 1-ene), el NBME 32 = D83 el jue 28-ene y el NBME 33 = D85 el lun 1-feb. El UWSA1 sigue siendo el
//   D1 (… → mié 23 → lun 28-sep → jue 1-oct). El primer día de CONTENIDO pasa al vie 2-oct (D2).
//   ⚠ EXAMEN v5.17: target MAR 16-FEB-2027 (v5.16: jue 11-feb · v5.15: lun 8-feb · v5.14: jue 4-feb · v5.13: mar 2-feb;
//   la ventana original 25-29 ene quedó atrás en la v5.12). D94 (vie 12-feb) = última sesión de banco; sáb 13 y dom 14-feb
//   libres; D95 (lun 15-feb) = D-1 REAL (sesión mínima AM + ritual de test-day por la tarde: el examen es al día siguiente).
//   La estructura interna NO cambia: el contenido cierra en D81 (mar 26-ene) y el NBME 31 GO/NO-GO es el D82 (mié 27-ene).
//   Joseph debe agendar/reprogramar el Prometric y confirmar el eligibility period.
//   Cada día no estudiado mueve el examen un día hábil más (o exige recortar: decisión de Joseph).
// v5.16 (26-sep-2026): D1 = lun 28-sep → D95 = mié 10-feb, examen jue 11-feb; con D1 en lunes los hitos volvieron a viernes.
// v5.15 (22-sep-2026): D1 = mié 23-sep → D95 = vie 5-feb, examen lun 8-feb; primer corrimiento RÍGIDO (hitos con D# fijo).
// v5.14 (19-sep-2026): D1 = lun 21-sep → D95 = mié 3-feb, examen jue 4-feb; los 11 hitos distintos del UWSA1 aún anclados por fecha.
// v5.6-Palmerton (5-sep-2026): añade nivelUW (1-5) y qDia por día (ver bloque al final). 12-sep (tarde): flags VIERNES_N4_DESDE_SEMANA (=11) y TAPER_ACTIVO → franjaNota.
// v5.20: L-V únicamente, skip 2026-12-25, 2026-12-31, 2027-01-01, 95 días D1 mié 7-oct → D95 (fechas por corrimiento rígido).
'use strict';
const fs = require('fs');
const path = require('path');
const V6 = require('../gen_fechas_v6');
const { generarTramo2, opcionesTramo2, mdTramo2, cargarV520 } = require('./gen_tramo2');
const ARGV = process.argv.slice(2);
const SECO = ARGV.includes('--seco'); // explorar: no escribe usmle_dias_v5.txt / usmle_dias_v6.json / tramo2_vigente.json
const aborta = (msg, code = 1) => { console.error('✗ ' + msg + ' — ABORTO, no se escribe nada'); process.exit(code); };
// v6.00: fechas de _fechas_v6.json (cargarFechasV6 LANZA si un valor guardado ≠ derivado, §A4) · F1 = L-V sin SKIP v6 (60 hábiles).
let FV6;
try { FV6 = V6.cargarFechasV6(); } catch (e) { aborta(e.message); }
const SKIP = new Set(FV6.skip);
const F = V6.habLV(FV6.f1.inicio, FV6.f1.fin, SKIP); // v6.00: mié 7-oct → mié 30-dic-2026 = 60 hábiles (D1-D60) · v5.20: 7-oct → 19-feb = 95
if (F.length !== FV6.f1.dias) aborta(`F1 tiene ${F.length} hábiles y _fechas_v6.json dice f1.dias = ${FV6.f1.dias}`);
console.log('// total dias F1:', F.length, '(' + F[0] + ' → ' + F[F.length - 1] + ')');

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

// Simulacros de hito — v6.00: indexados por D# (no por fecha; el D# es estable y el tramo 2 los re-fecha por ventana, §B5).
//  F1: UWSA1 D1 mié 7-oct (09:00-13:00, sin cambio) · NBME 25 D10 mar 20-oct · 26 D25 mar 10-nov · 27 D40 mar 1-dic · 28 D55 mar 22-dic
//  (checkpoint de fecha, §B5) con horario NUEVO 07:00-12:30 (4×50Q×75' = 5 h netas; ese día sin las 30Q de las 11:00).
//  2027 (D65 NBME 29 · D72 NBME 30 · D77 UWSA2 · D82 NBME 31 · D83 NBME 32 · D85 NBME 33 · D87 Free 120): texto v5.20 LITERAL (con su
//  hora v5.20); viven solo en la secuencia virtual v5.20 y el tramo 2 los usa como subV520 y les pone la hora nueva dentro del paréntesis.
//  (Historia: v5.20 casi todos en MARTES · v5.19 lunes · v5.18 viernes — fecha → entrada.)
const SIMS = {
  1: ['Assessment', 'CORE', '🎯 UWSA1 — BASELINE (160Q, 09:00-13:00) + revisión completa por la tarde', 'Assessment', '—', 'uWorld Self-Assessment 1', 'uWorld UWSA1', 'clin'],
  10: ['Assessment', 'CORE', '🎯 NBME 25 (07:00-12:30) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 25', 'NBME 25 (Qbankly)', 'clin'],
  25: ['Assessment', 'CORE', '🎯 NBME 26 (07:00-12:30) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 26', 'NBME 26 (Qbankly)', 'clin'],
  40: ['Assessment', 'CORE', '🎯 NBME 27 (07:00-12:30) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 27', 'NBME 27 (Qbankly)', 'clin'],
  55: ['Assessment', 'CORE', '🎯 NBME 28 (07:00-12:30) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 28', 'NBME 28 (Qbankly)', 'clin'],
  65: ['Assessment', 'CORE', '🎯 NBME 29 (07:15-11:00) + revisión de errores + Anki de gaps', 'Assessment', '—', 'NBME CBS Form 29', 'NBME 29 (Qbankly)', 'clin'],
  72: ['Assessment', 'CORE', '🎯 NBME 30 — cierre Fase A (07:15-11:00) + plan Fase B según gaps', 'Assessment', '—', 'NBME CBS Form 30', 'NBME 30 (Qbankly)', 'clin'],
  77: ['Assessment', 'CORE', '🎯 UWSA2 — el predictor gold-standard (09:00-13:00) + revisión', 'Banco', '—', 'uWorld UWSA2', 'uWorld + First Aid + Anki', 'clin'],
  82: ['Assessment', 'CORE', '🎯 NBME 31 (07:15-11:00) + decisión GO/NO-GO de fecha de examen', 'Banco', '—', 'NBME 31 (Qbankly)', 'uWorld + First Aid + Anki', 'clin'],
  83: ['Sprint final', 'CORE', '🎯 NBME 32 (07:15-11:00) + revisión + repaso FA sistemas 1-5', 'Sprint', '—', 'NBME 32 (Qbankly)', 'uWorld + First Aid + Anki', 'clin'],
  85: ['Sprint final', 'CORE', '🎯 NBME 33 (07:15-11:00) + revisión + repaso FA sistemas 11-14', 'Sprint', '—', 'NBME 33 (Qbankly)', 'uWorld + First Aid + Anki', 'clin'],
  87: ['Sprint final', 'CORE', '🎯 FREE 120 oficial (07:15-11:00) + logística del examen + cierre', 'Sprint', '—', 'NBME Free 120', 'uWorld + First Aid + Anki', 'clin'],
};
// ── historia de SIMS (fecha → entrada hasta la v5.20; cada corrimiento re-fechaba las 12 claves) ──
//   v5.20 (6-oct, DEFINITIVA): CORRIMIENTO RÍGIDO (6.º; +1 hábil, D1 mié 7-oct → hitos casi todos en MARTES).
//   v5.19 (5-oct): CORRIMIENTO RÍGIDO (5.º; +1 hábil, D1 mar 6-oct → hitos casi todos en LUNES).
//   v5.18 (3-oct): CORRIMIENTO RÍGIDO (4.º; +2 hábiles, D1 lun 5-oct → hitos de nuevo casi todos en VIERNES). v5.17 (30-sep): 3.º — los 12 hitos
//     corren con el plan y conservan su D# exacto (UWSA1 D1 · NBME25 D10 · 26 D25 · 27 D40 · 28 D55 · 29 D65 · 30 D72 · UWSA2 D77 ·
//     NBME31 D82 · 32 D83 · 33 D85 · Free120 D87) → en la v6.00 ese D# pasa a ser la clave de SIMS.
//   v5.10-v5.14: solo el UWSA1 se movía; los otros 11 estaban anclados por fecha (cada corrimiento les comía días de contenido).
//   v5.8-v5.14: los 5 hitos de enero estaban ANCLADOS POR FECHA. Desde v5.15: corren con el plan como los demás.

// POST-FASE A (v5.20) — los 10 días NO-hito que iban después del último día de contenido (D84, D86, D88-D95).
// v6.00: ya NO entran en F1: viven en el TRAMO 2 como dOrig (uw_random D84/D86/D88/D89 · incorrectas D90/D91 · consolidación D92/D93 ·
//   taper D94/D95; gen_tramo2.js). Se conservan aquí (R1: nada se borra) para reconstruir la secuencia virtual v5.20 (SEQ_V520), que
//   comprueba que CONTENT/SIMS/POST_A siguen siendo la v5.20 congelada (ref_v6/dias_v520.json) de la que leen el tramo 2 y V1.
// Historia: se consumían EN ORDEN en los huecos libres de enero; ningún item se recortaba (el que no cabía antes del Free 120 se
// alargaba al D95). v5.20: banco D84/D86/D88-D93 y sprint D94-D95 (corrimiento rígido +1) · v5.19 y v5.18 igual, uno y dos hábiles antes ·
// v5.17: contenido cerraba el mar 26-ene, NBME 31 mié 27-ene.
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

// ── v6.00 · secuencia virtual v5.20 (D1-D95, sin fechas): SIMS por D# → CONTENT → POST_A, en el mismo orden en que la v5.20 los asignaba ──
const CAMPOS_CONTENIDO = ['system', 'tier', 'sub', 'bbCh', 'bbVid', 'uw', 'mat', 'matType', 'palm'];
const SEQ_V520 = {};
{
  let ci = 0, pa = 0;
  for (let d = 1; d <= 95; d++) {
    let row;
    if (SIMS[d]) { const s = SIMS[d]; row = { system: s[0], tier: s[1], sub: s[2], bbCh: s[3], bbVid: s[4], uw: s[5], mat: s[6], matType: s[7], palm: null }; }
    else if (ci < CONTENT.length) { const c = CONTENT[ci++]; row = { system: c[0], tier: c[1], sub: c[2], bbCh: c[3], bbVid: c[4], uw: c[5], mat: c[6], matType: c[7], palm: c[8] ? { id: c[8], t: c[9] } : null }; }
    else if (pa < POST_A.length) { const s = POST_A[pa++]; row = { system: s[0], tier: s[1], sub: s[2], bbCh: s[4], bbVid: '—', uw: s[3], mat: 'uWorld + First Aid + Anki', matType: 'clin', palm: null }; }
    else aborta('secuencia v5.20 sin item para D' + d);
    SEQ_V520[d] = row;
  }
  if (ci !== CONTENT.length || pa !== POST_A.length) aborta(`secuencia v5.20: sobran items (contenido ${ci}/${CONTENT.length} · post-A ${pa}/${POST_A.length})`);
}
// comprobación: la secuencia = la v5.20 CONGELADA (mismos campos de contenido; solo cambia la hora de los NBME 25-28 de F1, §B1)
const normSub = (s) => s.replace(/\d{2}:\d{2}-\d{2}:\d{2}/g, ''); // = v1_check.js
const V520 = cargarV520();
{
  const malas = V520.filter((v) => JSON.stringify(CAMPOS_CONTENIDO.map((k) => (k === 'sub' ? normSub(v[k]) : v[k]))) !== JSON.stringify(CAMPOS_CONTENIDO.map((k) => (k === 'sub' ? normSub(SEQ_V520[v.d][k]) : SEQ_V520[v.d][k]))));
  if (V520.length !== 95 || malas.length) aborta(`CONTENT/SIMS/POST_A ≠ ref_v6/dias_v520.json en ${malas.map((x) => 'D' + x.d).join(', ') || 'nº de filas'}`);
}

// ── v6.00 · F1 (D1-D60): D1-D57 = v5.20 D1-D57 · D58 = v5.20 D79 copiada tal cual · D59-D60 = C1/C2 COLCHÓN F1 (§B1) ──
const COLCHON_F1 = (n) => ({
  system: 'Colchón', tier: 'CORE',
  sub: `C${n} · COLCHÓN F1: si se perdió un día de D1-D58 → hacerlo hoy (el más antiguo); si no → 2.ª pasada de incorrectas de los 9 sistemas (40Q timed) + cerrar Anki antes de la pausa`,
  bbCh: 'Colchón', bbVid: '—', uw: 'uWorld incorrects (9 sistemas F1)', mat: 'uWorld + Anki', matType: 'clin', palm: null,
});
const ORIGEN_F1 = [...Array.from({ length: 57 }, (_, i) => i + 1), 79, 'C1', 'C2']; // D# v5.20 de cada fila F1 (o C1/C2)
if (ORIGEN_F1.length !== F.length) aborta(`F1: ${F.length} hábiles para ${ORIGEN_F1.length} filas (D1-D57 + D79 + C1 + C2)`);
const dias = F.map((fecha, i) => {
  const o = ORIGEN_F1[i];
  return { d: i + 1, fecha, ...(typeof o === 'number' ? SEQ_V520[o] : COLCHON_F1(o === 'C1' ? 1 : 2)) };
});

// ── Palmerton v3 (5-sep-2026): 5 niveles UWorld por día → nivelUW (1-5) + qDia (Q uWorld objetivo del día) ──
// Regla DETERMINISTA (no toca fechas, sistemas, hitos ni el total de días):
//  · Fase A (contenido): posición del día dentro de su sistema (sin contar Assessment):
//      1º-2º día del sistema → nivel 1 (bloques 5Q tutor SIN tiempo del subtema nuevo · 10 pre-test + 20 consolidación = 30Q)
//      viernes SIN hito y ≥3º día  → nivel 3 (11:00 = 20Q sistema completo timed + 10Q tutor · 40Q)
//      resto                       → nivel 2 (bloques 5Q timed de subtemas ya validados · 10 + 30 = 40Q)
//  · Hitos (UWSA/NBME/Free 120): formato nivel 5 como MEDICIÓN (UWSA 160Q · NBME 200Q · Free 120 = 120Q)
//  · v6.00: F1 ya no tiene filas de banco ni de sprint (Fases B-C, taper D94-D95 y Free 120 viven en el tramo 2, gen_tramo2.js, con su
//    propia regla de niveles: §B3). D58 (bioestadística) es la 1.ª fila de 'Psychiatry & Behavioral' en F1 → nivel 1 · 30Q por la regla.
//    C1/C2 (bbCh 'Colchón') = nivel 4 · 40Q por EXCEPCIÓN explícita (posSistema les daría 1 · 30 por ser las primeras de 'Colchón').
//  El gate (80% en 10Q consecutivas) vive en USMLE_GATE / usmleScores.ts, no aquí.
//
// ── 12-sep-2026 (tarde) · VIERNES DE NIVEL 4 (divergencia Palmerton #6 · decisión §E-2 → IMPLEMENTADA) ──
//  Desde la semana VIERNES_N4_DESDE_SEMANA (S1 = bloque de 7 días desde el D1 = mié 7 → mar 13-oct; S11 = mié 16 → mar 22-dic),
//  los viernes SIN hito de Fase A que serían nivel 3 (sistema único timed) pasan a NIVEL 4: 11:00 = 20-30Q timed MIXTOS
//  de los sistemas ya dominados (≥6 cerrados en S11) + 10Q tutor del subtema del día. Cambia SOLO nivelUW/qDia/franjaNota;
//  el subtema, el sistema, el material y el orden NO se tocan (el multiconjunto de contenido es idéntico).
//  Los viernes que abren sistema (pos ≤ 2) siguen en nivel 1: el subtema nuevo necesita su bloque tutor.
//  v6.00 (F1 = D1-D60, idéntica a v5.20 hasta el D57): viernes N3 = D8/D13/D28/D33/D48 · viernes N4 = D53 (vie 18-dic, Heme/Onco) ·
//    viernes que abren sistema = D3 Fundamentos, D18 Resp, D23 Renal, D38 Endocrino, D43 Neuro. En el tramo 2 la regla es la de §B3
//    (contenido N4 si cae en viernes; todo el tramo 2 está «desde S11»).
//  v5.20: viernes N3 = D8/D13/D28/D33/D48 · viernes N4 = D53 y D70 · v5.19: D54 · v5.18: ninguno · v5.17: D57, D69, D74, D79.
//  0 = desactivado (vuelve a la regla v5.10 original: viernes ≥3º día = nivel 3).
const VIERNES_N4_DESDE_SEMANA = 11;
// ── TAPER D94-D95 (divergencia #22 · §E-5): v6.00 → vive en el TRAMO 2 (gen_tramo2.js · V6_ESPEC §B3 tipo `taper` + §B6 USMLE_TAPER):
//  lun-mié de la semana previa = taper (20Q flagged, ≤2 h) · jue = D94 ÚLTIMA SESIÓN DE BANCO · vie = D95 sesión mínima (≤1 h) · sáb = ritual
//  (sin estudio) · dom = viaje (D-1) · lun = examen. El flag TAPER_ACTIVO de la v5.x (franjaNota de D94/D95 en DIAS) desaparece con F1 = 60.
//  v5.20: D94 jue 18 / D95 vie 19 de febrero con el finde en medio · v5.19 y v5.18: D95 = D-1 real · v5.17: finde entre D94 y D95.
const SEMANA1 = new Date(F[0] + 'T12:00:00Z'); // D1 = miércoles: las semanas del plan F1 son bloques mié→mar (v5.19: mar→lun · v5.18: lun→vie)
const semanaDe = (fecha) => Math.floor((new Date(fecha + 'T12:00:00Z') - SEMANA1) / (7 * 864e5)) + 1;
function qHito(sub) {
  if (/UWSA/.test(sub)) return 160;
  if (/FREE 120/i.test(sub)) return 120;
  if (/NBME/.test(sub)) return 200;
  return 40;
}
const posSistema = {};
for (const x of dias) {
  const dow = new Date(x.fecha + 'T12:00:00Z').getUTCDay();
  const hito = /🎯/.test(x.sub);
  if (hito) { x.nivelUW = 5; x.qDia = qHito(x.sub); continue; }
  if (x.bbCh === 'Colchón') { x.nivelUW = 4; x.qDia = 40; continue; } // v6.00: C1/C2 — excepción explícita (§B1)
  if (x.bbCh === 'Banco' || x.bbCh === 'Sprint') aborta(`F1 v6 no tiene filas de banco/sprint (D${x.d} ${x.bbCh}): viven en el tramo 2`);
  const pos = (posSistema[x.system] = (posSistema[x.system] || 0) + 1);
  if (pos <= 2) { x.nivelUW = 1; x.qDia = 30; }
  else if (dow === 5 && VIERNES_N4_DESDE_SEMANA > 0 && semanaDe(x.fecha) >= VIERNES_N4_DESDE_SEMANA) {
    x.nivelUW = 4; x.qDia = 40;
    x.franjaNota = `VIERNES NIVEL 4 (S${semanaDe(x.fecha)} · desde S${VIERNES_N4_DESDE_SEMANA}, Palmerton #6): 11:00 = 20-30Q timed MIXTOS de los sistemas ya dominados (${Object.keys(posSistema).filter(s => s !== x.system).join(', ')}) + 10Q tutor del subtema de hoy · gate: ≥80% en el bloque mixto → listo para Fase B; <80% → auditar el sistema que más falló (no el subtema de hoy)`;
  }
  else if (dow === 5) { x.nivelUW = 3; x.qDia = 40; }
  else { x.nivelUW = 2; x.qDia = 40; }
}
console.log('// viernes N4 (desde S' + VIERNES_N4_DESDE_SEMANA + '):', dias.filter(x => x.nivelUW === 4 && x.bbCh !== 'Colchón').map(x => 'D' + x.d + ' ' + x.fecha + ' ' + x.system).join(' · ') || '(ninguno)');
const byNivel = {};
dias.forEach(x => { byNivel['N' + x.nivelUW] = (byNivel['N' + x.nivelUW] || 0) + 1; });
console.log('// F1 niveles:', JSON.stringify(byNivel), '· Q total F1:', dias.reduce((a, x) => a + x.qDia, 0));
console.log('// F1 D58-D60:', dias.slice(57).map(x => `D${x.d} ${x.fecha} ${x.system} N${x.nivelUW}·${x.qDia}Q`).join(' · '));

// ── v6.00 · F1 D1-D57 = v5.20 (fecha, contenido, nivelUW, qDia, franjaNota; el sub solo cambia la hora de D10/D25/D40/D55) ──
{
  const CAMPOS_F1 = ['d', 'fecha', ...CAMPOS_CONTENIDO, 'nivelUW', 'qDia', 'franjaNota'];
  const HORA_V6 = new Set([10, 25, 40, 55]);
  const dif = [];
  for (const v of V520.filter((x) => x.d <= 57)) {
    const x = dias[v.d - 1];
    for (const k of CAMPOS_F1) {
      const a = k === 'sub' && HORA_V6.has(v.d) ? normSub(x[k]) : x[k], b = k === 'sub' && HORA_V6.has(v.d) ? normSub(v[k]) : v[k];
      if (JSON.stringify(a) !== JSON.stringify(b)) dif.push(`D${v.d}.${k}`);
    }
    if (HORA_V6.has(v.d) && !(x.sub.includes('(07:00-12:30)') && v.sub.includes('(07:15-11:00)'))) dif.push(`D${v.d}.hora`);
  }
  const d79 = V520.find((x) => x.d === 79);
  for (const k of CAMPOS_CONTENIDO) if (JSON.stringify(dias[57][k]) !== JSON.stringify(d79[k])) dif.push('D58.' + k + ' ≠ v5.20 D79');
  if (dif.length) aborta('F1 ≠ v5.20: ' + dif.join(', '));
  console.log('// ✓ F1 D1-D57 = v5.20 (solo cambia la hora de los NBME 25-28) · D58 = v5.20 D79 · D59-D60 = C1/C2');
}

// ── v6.00 · TRAMO 2 (DIAS_T2): port de ref_v6/gen_tramo2_ref.js r2 con las fechas de _fechas_v6.json (§B3) ──
let OPT2, T2;
try { OPT2 = opcionesTramo2(ARGV, FV6); } catch (e) { aborta('opciones del tramo 2: ' + e.message); }
if (!OPT2.escenarioJSON && !SECO) aborta(`ENCAPS/EXAMEN/SERUMS (${OPT2.encaps} · ${OPT2.examen} · ${OPT2.serums}) ≠ _fechas_v6.json: en producción mandan las fechas del JSON (edítalo con su disparador de §I y corre gen_fechas_v6.js); para explorar, --seco`);
if (OPT2.permitirDeficit && !SECO) aborta('--permitir-deficit solo existe para explorar (--seco): un déficit nunca se publica (R1)');
try { T2 = generarTramo2(OPT2); } catch (e) { aborta('tramo 2: ' + e.message); }
T2.log.forEach((l) => console.log('// ' + l));
if (OPT2.json) fs.writeFileSync(OPT2.json, JSON.stringify(T2.out, null, 1));
if (OPT2.md) fs.writeFileSync(OPT2.md, mdTramo2(T2.out));
if (T2.deficitFwd || T2.deficitBwd) {
  if (!OPT2.permitirDeficit) aborta(`DÉFICIT ${T2.deficitFwd + T2.deficitBwd} u en el tramo 2: fecha NO viable (R1: no se recorta) → siguiente fecha de la ventana (§B4.4)`, 2);
  console.log('// ⚠ déficit permitido (--seco --permitir-deficit): nada se escribe');
}
if (T2.faltan.length && !SECO) aborta('el tramo 2 no cubre los dOrig ' + T2.faltan.join(', ') + ' (R1)');
if (OPT2.escenarioJSON) { // coherencia con las fechas derivadas del JSON (gen_fechas_v6)
  const ult = T2.out[T2.out.length - 1], gate = T2.out.find((x) => x.gate);
  const inc = [];
  if (T2.out[0].fecha !== FV6.step1.reinicio) inc.push(`T1 ${T2.out[0].fecha} ≠ reinicio ${FV6.step1.reinicio}`);
  if (ult.tipo !== 'ritual' || ult.fecha !== FV6.step1.ritual) inc.push(`última fila ${ult.tipo} ${ult.fecha} ≠ ritual ${FV6.step1.ritual}`);
  if (!gate || gate.fecha !== FV6.step1.gonogo) inc.push(`gate ${gate ? gate.fecha : '—'} ≠ gonogo ${FV6.step1.gonogo}`);
  if (inc.length && !SECO) aborta('tramo 2 incoherente con _fechas_v6.json: ' + inc.join(' · '));
}

// ── salidas ──
// v6.00: claves sin comillas como en la v5.x (ahora también con dígitos: subV520, dF1, qDiaT); assemble_usmle_ts.js usa la misma serialización.
const aTS = (x) => JSON.stringify(x).replace(/"([a-zA-Z][a-zA-Z0-9]*)":/g, '$1:');
const txt = 'export const DIAS: DiaUSMLE[] = ' + aTS(dias) + ';\nexport const DIAS_T2: DiaUSMLE_T2[] = ' + aTS(T2.out) + ';';
const ESCENARIO = {
  encaps: OPT2.encaps, examen: OPT2.examen, serums: OPT2.serums, reinicio: T2.R, gonogo: T2.GONOGO, ritual: T2.ritual,
  congelarHasta: OPT2.congelarHasta, examenPrevio: OPT2.examenPrevio, previo: OPT2.previoFile ? path.relative(__dirname, OPT2.previoFile).replace(/\\/g, '/') : null,
  pendientes: OPT2.pendientes, pendientesF1: OPT2.pendientesF1, protegExtra: OPT2.protegExtra, filasCongeladas: T2.frozen,
};
if (SECO) {
  console.log('// --seco: no se escribe usmle_dias_v5.txt / usmle_dias_v6.json / tramo2_vigente.json');
} else {
  fs.writeFileSync(path.join(__dirname, 'usmle_dias_v5.txt'), txt, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'usmle_dias_v6.json'), JSON.stringify({ version: FV6.version, escenario: ESCENARIO, DIAS: dias, DIAS_T2: T2.out }, null, 1), 'utf8');
  fs.writeFileSync(path.join(__dirname, 'tramo2_vigente.json'), JSON.stringify(T2.out, null, 1), 'utf8');
  console.log('// escrito usmle_dias_v5.txt ·', txt.length, 'chars · usmle_dias_v6.json · tramo2_vigente.json (' + T2.out.length + ' filas T)');
}
// distribución
const bySys = {};
[...dias, ...T2.out].forEach(x => { bySys[x.system] = (bySys[x.system] || 0) + 1; });
console.log('// filas por sistema (F1 + tramo 2):', JSON.stringify(bySys));
