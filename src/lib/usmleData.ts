/**
 * usmleData.ts — USMLE Step 1 section ("Estados Unidos"). IN ENGLISH (Step 1 is in English).
 * Distilled from STUDY_HUB/05_USMLE_curriculo_roi.md + 07_USMLE_palmerton_por_sistema.md.
 * Includes the "Palmerton brain": his verified method + per-system mini-methods.
 * Spaced repetition reuses the ENCAPS engine (CRÍTICA=6/ALTA=5/MEDIA=4/BAJA=3).
 */
import { Prioridad, PRIORIDAD_COLOR, VUELTAS } from './researchData';
export { PRIORIDAD_COLOR, VUELTAS };
export type { Prioridad };

export const USMLE_META = {
  title: 'USMLE Step 1',
  subtitle: 'United States · pass with margin → springboard to Step 2 CK (Mayo)',
  accent: '#5FA88C', // jade (USA console) — quiet-luxury, non-neon
  flag: '🇺🇸',
  thesis: 'Step 1 is Pass/Fail but we train like it is 270. Pathology + Physiology are 75–95% of the exam. Medical English is not a separate subject — it is the VEHICLE: learn the content itself in English. Compounding beats cramming.',
};

export const USMLE_KPIS = { systems: 11, pathologyPct: 50, beginnerWeeks: 8, readiness: 4 };

// ── READINESS · NBME / UWSA / Free 120 checkpoints (score-prediction layer) ──
// The "bank" honesty layer: a readiness gauge is only meaningful once anchored to a
// real self-assessment. Bands are the published predictive ranges (AMBOSS ±7-10 pts).
export interface UsmleCheckpoint {
  form: string; kind: 'NBME' | 'FREE120' | 'UWSA' | 'AMBOSS';
  when: string; predictor: string; band: string; url: string; gated: boolean;
}
export const USMLE_CHECKPOINTS: UsmleCheckpoint[] = [
  { form: 'NBME CBSSA Forms 25–33', kind: 'NBME', when: 'plan v5.6: 7 in Phase A (every ~3 weeks) · NBME 31 = GO/NO-GO · 32/33 final week', predictor: 'Best single predictor of a Step 1 pass (Palmerton: the ONLY one — UWorld % is a vanity metric)', band: '≥65% ≈ 95% pass · ≥70% ≈ 99% · plan GO = 2 consecutive ≥68% · on-track minimums per milestone in usmleScores.HITOS_ONTRACK', url: 'https://www.nbme.org/examinees/self-assessments', gated: true },
  { form: 'USMLE Free 120', kind: 'FREE120', when: '1–2 weeks pre-exam (plan: D97, vie 22-ene) — ideally at the real Prometric', predictor: 'Current NBME item wording · no official explanations → audit the PROCESS, not theory', band: '≥70% heuristic (community, not Palmerton) · 3 blocks of 40, timed', url: 'https://www.usmle.org/prepare-your-exam', gated: false },
  { form: 'UWorld Self-Assessment 1–2', kind: 'UWSA', when: 'UWSA1 = week-1 baseline (D5) · UWSA2 = D87', predictor: 'Systematically OVER-predicts (Palmerton, same authors as the bank) — endurance only, never a date decision', band: 'trend > absolute number · the date is decided by NBMEs', url: 'https://www.uworld.com/', gated: true },
  { form: 'AMBOSS Score Predictor', kind: 'AMBOSS', when: 'from your Qbank %', predictor: 'Predicted range ±7–10 pts from Qbank performance', band: 'confirm with an NBME', url: 'https://www.amboss.com/us/usmle/score-predictor', gated: true },
];
// Readiness derived from the checkpoint layer (replaces the hardcoded 4).
export const USMLE_READINESS = {
  pct: 4, // pre-first-NBME baseline · rises only when a checkpoint is logged
  status: 'Baseline · no NBME logged yet',
  next: 'UWSA1 vie 11-sep (D5, baseline) → luego NBME 25/26/27/28/29 cada ~3 semanas (plan v5.6). Registra el % de cada hito en 📏 Medición (Cola de hoy): el gauge se ancla al último hito y muestra la distancia al mínimo on-track.',
};

// Organ systems ordered by official exam weight (order of attack)
export interface UsmleSystem { n: number; system: string; weight: string; prioridad: Prioridad; }
export const USMLE_SYSTEMS: UsmleSystem[] = [
  { n: 1, system: 'Reproductive & Endocrine', weight: '12–16%', prioridad: 'CRITICA' },
  { n: 2, system: 'Respiratory & Renal/Urinary', weight: '11–15%', prioridad: 'CRITICA' },
  { n: 3, system: 'Behavioral + Nervous/Special senses', weight: '10–14%', prioridad: 'CRITICA' },
  { n: 4, system: 'Blood & Lymphoreticular/Immune', weight: '9–13%', prioridad: 'ALTA' },
  { n: 5, system: 'Musculoskeletal, Skin & SubQ', weight: '8–12%', prioridad: 'ALTA' },
  { n: 6, system: 'Multisystem (genetics, aging, neoplasia)', weight: '8–12%', prioridad: 'ALTA' },
  { n: 7, system: 'Cardiovascular', weight: '7–11%', prioridad: 'ALTA' },
  { n: 8, system: 'Gastrointestinal', weight: '6–10%', prioridad: 'MEDIA' },
  { n: 9, system: 'Biostatistics & Epidemiology', weight: '4–6%', prioridad: 'ALTA' },
  { n: 10, system: 'Human Development (embryology)', weight: '1–3%', prioridad: 'BAJA' },
];

// Disciplines — the real truth of the exam
export const USMLE_DISCIPLINES = [
  { name: 'Pathology', weight: '45–55%', anchor: 'Pathoma (the absolute ROI king)', prioridad: 'CRITICA' as Prioridad },
  { name: 'Physiology', weight: '30–40%', anchor: 'Ninja Nerd / Armando Hasudungan', prioridad: 'CRITICA' as Prioridad },
  { name: 'Microbiology', weight: '10–20%', anchor: 'Sketchy Micro', prioridad: 'ALTA' as Prioridad },
  { name: 'Pharmacology', weight: '10–20%', anchor: 'Sketchy Pharm', prioridad: 'ALTA' as Prioridad },
  { name: 'Behavioral / Ethics', weight: '10–15%', anchor: 'Dirty Medicine', prioridad: 'ALTA' as Prioridad },
  { name: 'Immunology', weight: '5–15%', anchor: 'First Aid + B&B', prioridad: 'ALTA' as Prioridad },
  { name: 'Biochemistry', weight: '5–15%', anchor: 'B&B / Dirty Medicine', prioridad: 'MEDIA' as Prioridad },
];

// ── PALMERTON BRAIN ──
export const PALMERTON_WHO = 'Alec Palmerton, MD — Stanford MD, scored 270 (99.9th %ile) on Step 1, matched Harvard-MGH. Founder of YouSMLE. Brand: "understanding over memorization".';
export const PALMERTON_HONESTY = 'His GENERAL method is documented on yousmle.com (high confidence). He does NOT publish a tidy per-system video framework — the per-system mini-methods below are RECONSTRUCTED in his spirit. "AGAIN/GOOD" grading and a fixed vueltas count are standard Anki/AnKing conventions (your ENCAPS layer), NOT Palmerton-specified.';

export const PALMERTON_METHOD = [
  { name: 'Pathogenesis-to-presentation cards', desc: 'Each card connects mechanism → disease → presentation, never isolated facts. "The better you know it, the fewer words to describe it." Fewer, connected cards beat many atomic ones.', verified: true },
  { name: 'Pathophysiologic Chronology (PC)', desc: 'For each vignette, explain EVERY sentence, starting from the day the patient was born. Trace causation as a timeline. Core of review AND question interpretation.', verified: true },
  { name: 'Stand-Alone Question (SAQ)', desc: 'Re-phrase the vignette into one question that stands without the stem. Predict the answer BEFORE reading the choices.', verified: true },
  { name: '3-category miss diagnosis', desc: 'Every missed Q is: (1) concept gap, (2) recognition gap, or (3) unforced error. The fix differs per type.', verified: true },
  { name: 'Two-question screen', desc: 'After a miss: "Could I have gotten this with knowledge I already had?" + "What exact behavior would have changed the answer?"', verified: true },
  { name: 'Pharm: forward + reverse, ~6/drug', desc: 'Mechanism / use / toxicity, each forward AND reverse ≈ 6 cards per drug. Class-level card for shared properties. "More but shorter cards."', verified: true },
  { name: 'Daily card-creation limit', desc: 'Cap new cards/day — "the more cards you make, the more you review." Permission to NOT remember everything.', verified: true },
  { name: 'Slow is fast', desc: 'Spend real time understanding the miss instead of grinding volume. A Qbank raises scores when each question teaches a decision rule, not by volume.', verified: true },
  { name: 'Sequencing: biochem first', desc: 'Do biochemistry videos first to build a foundation, then fill gaps via questions, making cards from what you miss.', verified: true },
];

// Per-system mini-methods (reconstructed in Palmerton's spirit)
export interface SystemMethod { system: string; anchor: string; saq: string; trap: string; }
export const PALMERTON_SYSTEMS: SystemMethod[] = [
  { system: 'Cardio', anchor: 'Pressure-volume loop + cardiac cycle + baroreceptor reflex. Murmurs, drugs, shock all hang off preload/afterload/contractility.', saq: '"What does this maneuver/drug do to preload or afterload?" Predict the murmur change first.', trap: 'Treating murmurs/ECGs as buzzwords instead of deriving from flow/pressure.' },
  { system: 'Pulm', anchor: 'A–a gradient + V/Q mismatch + the O2-hemoglobin curve.', saq: '"Is this hypoxia from hypoventilation, shunt, V/Q, or diffusion?" Pick mechanism, then disease.', trap: 'Memorizing PFT patterns without the flow-volume loop logic.' },
  { system: 'GI / Digestive', anchor: 'The "tube + accessory organs" map: where each secretion/hormone acts (gastrin, CCK, secretin) + portal/biliary anatomy.', saq: '"Which segment / which secretion is broken?" Localize anatomically first.', trap: 'LFTs and jaundice without the bilirubin pathway timeline (pre/intra/post-hepatic PC).' },
  { system: 'Renal', anchor: 'The nephron as a sequence: what each segment reabsorbs/secretes + RAAS + acid-base. Most renal = "which transporter, which segment".', saq: '"Which nephron segment + which electrolyte/acid-base derangement?" Diuretics map onto segments.', trap: 'Acid-base questions: skipping the stepwise pH → primary → compensation → anion gap algorithm.' },
  { system: 'Endocrine', anchor: 'Every axis as a feedback loop (hypothalamus→pituitary→gland→hormone→negative feedback). Anchor on the loop, not the disease name.', saq: '"Where in the axis is the lesion (primary/secondary/tertiary)?" Predict the lab pattern before reading.', trap: 'Confusing primary vs secondary because you memorized diseases instead of deriving feedback labs.' },
  { system: 'Repro', anchor: 'Hypothalamic-pituitary-gonadal axis + menstrual cycle hormone curves; embryo as a timeline.', saq: '"Where in the cycle / which hormone shift?" For DSDs: karyotype → gonad → hormone → phenotype.', trap: 'Embryology/intersex without a birth-forward timeline.' },
  { system: 'Heme/Onc', anchor: 'RBC indices + the coagulation cascade + the cell-lineage tree. Anchor on "where in maturation/cascade is the block".', saq: '"Micro/normo/macrocytic? Intrinsic vs extrinsic?" Classify before naming the disease.', trap: 'Leukemia/lymphoma translocations as flashcards with no lineage scaffold.' },
  { system: 'MSK / Derm', anchor: 'Collagen/elastin + inflammation type; for derm, the histologic layer + lesion morphology vocabulary.', saq: '"Which structural protein / which immune mechanism?"', trap: 'Pure picture-matching; derm needs morphology→mechanism.' },
  { system: 'Neuro', anchor: 'Neuroanatomic localization (tract + level) + the lesion-to-deficit map. Localize, then name.', saq: '"Where is the lesion (tract + level)?" Then derive the deficit.', trap: 'Memorizing syndromes without localizing on the tract map.' },
  { system: 'Psych / Behavioral', anchor: 'DSM timeframes + ethics fixed rules. "Free points" for a non-native: rules are fixed.', saq: '"Which timeframe / which ethical principle governs?"', trap: 'Overthinking ethics — the tested rule is usually the patient-autonomy default.' },
  { system: 'Micro', anchor: 'Sketchy images: the picture carries the meaning without language. Ideal for IMG.', saq: '"Which bug fits the host + presentation?" Let the image cue the associations.', trap: 'Trying to memorize lists instead of using the visual mnemonic.' },
];

// Beginner ramp (English + content), 1h/day Mon–Fri
export const USMLE_RAMP = [
  { phase: 'Phase 0 · Weeks 1–4', focus: 'English foundations: 30 min medical English + 30 min Pathoma Ch.1 (free trial). Goal: follow a HY video at 0.75x without Spanish subs.', hours: '~20h' },
  { phase: 'Phase 1 · Weeks 5–16', focus: 'Pathoma as the backbone, chapter by chapter. English subs on. AnKing filtered by Pathoma tag. Covers 45–55% of the exam.', hours: '~60h' },
  { phase: 'Phase 2 · Weeks 17–32', focus: 'Physiology + high-weight systems in weight order (Repro/Endo → Resp/Renal → Neuro…). Start Qbank in TUTOR mode.', hours: '~80h' },
  { phase: 'Phase 3 · Weeks 33+', focus: 'Sketchy Micro/Pharm + Biostats (one weekend) + heavy Qbank (random/timed). First Aid becomes your review index.', hours: '~80h+' },
];

export const USMLE_HOUR = [
  { slot: '00:00–00:10', act: 'Active medical English (shadowing / vocab of the day) — warm up the ear' },
  { slot: '00:10–00:45', act: 'New content in ENGLISH (HY video) + note IN ENGLISH (never Spanish)' },
  { slot: '00:45–00:55', act: 'Anki (AnKing subset of the topic) — spaced review' },
  { slot: '00:55–01:00', act: '1–2 sentences out loud describing what you learned (English output)' },
];

// Palmerton v3 (5-sep-2026): the 5 UWorld mastery levels govern the plan (usmleStep1Daily.USMLE_NIVELES · DIAS[].nivelUW).
export const USMLE_QBANK_RULES = [
  'The Qbank is NOT a test — it is your main LEARNING tool. UWorld FIRST to diagnose, First Aid AFTER to treat (the blind 10Q pre-test at 08:15 is exactly that).',
  'Level 1 → 5, like a video game: 5Q tutor untimed of ONE subtopic → 5Q timed → 10-20Q full system timed → 20-30Q mixed → 40Q random timed. You do NOT level up without 80% in 10 consecutive questions (validated within 24-48 h).',
  'If <80%: do NOT move to a new topic. Repeat 5Q blocks of the failed subtopic and audit resources → comprehension → application → memory. 1-2 days without 80% = the method is broken, fix it NOW.',
  'Volume follows skill, not the other way round (NBA analogy): level 1 = 20-30Q/day; only 80-100Q/day in the final dedicated weeks. >120Q/day means you stopped reviewing.',
  'Review = Educational Objective + shopping list (every discomfort, ALSO in correct answers) + Whole Page Rule (the whole First Aid section, not the missed detail) → mechanism cards (≤50 new/day).',
  'Classify every miss: knowledge gap · transfer/interpretation gap · unforced process error. Up to 50% of NBME misses are interpretation, not knowledge.',
  'One deep pass of UWorld. Never reset. Incorrects + flagged only (Phase B); if time remains, a NEW bank (AMBOSS/Kaplan), never a second pass.',
  'UWorld % is a vanity metric (40-60% is normal early); it is a PROCESS gate, not a prediction. Only NBMEs predict: ≥65% ≈ 95% pass, ≥70% ≈ 99%. Never sit "hoping for a good day".',
];

export const USMLE_RESOURCES = [
  { label: 'USMLE Content Outline (official weights, free)', url: 'https://www.usmle.org/exam-resources/step-1-materials', gated: false },
  { label: 'Pathoma — Ch.1–3 free (rest paid)', url: 'https://www.pathoma.com/', gated: false },
  { label: 'Ninja Nerd (physiology, free)', url: 'https://www.youtube.com/@NinjaNerdOfficial', gated: false },
  { label: 'Armando Hasudungan (mechanism drawings, free)', url: 'https://www.youtube.com/@armandohasudungan', gated: false },
  { label: 'Dirty Medicine (ethics/biochem/biostat, free)', url: 'https://www.youtube.com/@DirtyMedicine', gated: false },
  { label: 'Mehlman Medical (free HY PDFs — "Arrows")', url: 'https://mehlmanmedical.com/free-stuff/', gated: false },
  { label: 'Randy Neil — Biostatistics (free, ~3–4h)', url: 'https://www.youtube.com/results?search_query=randy+neil+biostatistics+usmle', gated: false },
  { label: 'Dr Heidi — Medical English (free)', url: 'https://www.youtube.com/c/DrHeidiMedicalEnglish', gated: false },
  { label: 'YouSMLE (Palmerton method articles)', url: 'https://www.yousmle.com/', gated: false },
  { label: 'Qbankly (your Qbank — opens in Edge)', url: 'https://qbankly.app/', gated: true },
  { label: 'Sketchy Micro/Pharm', url: 'https://www.sketchy.com/', gated: true },
  { label: 'AnKing Step Deck', url: 'https://www.theanking.com/', gated: true },
];

// ── Step 2 CK resource layer (gold-standard 2025) — heaviest for Clínic/Mayo ──
export const USMLE_STEP2_RESOURCES = [
  { label: 'UWorld Step 2 CK (4.250+ Q — the reference)', url: 'https://www.uworld.com/', gated: true },
  { label: 'AMBOSS Step 2 (3.200+ Q · crosslinked library)', url: 'https://www.amboss.com/us/usmle/step2', gated: true },
  { label: 'Divine Intervention (HY podcasts, free audio)', url: 'https://divineinterventionpodcasts.com/', gated: false },
  { label: 'OnlineMedEd (clinical framework, free tier)', url: 'https://onlinemeded.org/', gated: false },
  { label: 'NBME CCSSA Forms 9–15 (Step 2 self-assessments)', url: 'https://www.nbme.org/examinees/self-assessments', gated: true },
];

// ── First Aid as a review INDEX (map the chapter skeleton, don't copy content) ──
// Gold-standard consolidation layer: FA is the spine everything else hangs off.
export const FIRST_AID_INDEX = {
  title: 'First Aid for the USMLE Step 1',
  role: 'The consolidation index — not a first-pass text. Annotate it from Qbank misses.',
  sections: [
    { part: 'General Principles', chapters: ['Biochemistry', 'Immunology', 'Microbiology', 'Pathology', 'Pharmacology', 'Public Health Sciences'] },
    { part: 'Organ Systems', chapters: ['Cardiovascular', 'Endocrine', 'Gastrointestinal', 'Hematology & Oncology', 'Musculoskeletal / Skin', 'Neurology & Special Senses', 'Psychiatry', 'Renal', 'Reproductive', 'Respiratory'] },
  ],
  url: 'https://www.usmle-rx.com/first-aid-step-1/',
};

// ── Sketchy symbol map (memory palace) — symbol → concept, the visual mnemonic ──
export interface SketchySymbol { symbol: string; concept: string; world: 'Micro' | 'Pharm'; }
export const SKETCHY_SYMBOLS: SketchySymbol[] = [
  { symbol: '🎀 Bow-tie', concept: 'Thyroid (Sketchy anchor)', world: 'Micro' },
  { symbol: '🌵 Cactus', concept: 'Gram-positive spore-formers (dry, hardy)', world: 'Micro' },
  { symbol: '👑 Crown / royalty', concept: 'Streptococcus (the "royal" cocci scenes)', world: 'Micro' },
  { symbol: '🍇 Grapes', concept: 'Staphylococcus (clusters)', world: 'Micro' },
  { symbol: '🧲 Magnet', concept: 'Beta-lactams binding PBPs', world: 'Pharm' },
  { symbol: '🚧 Roadblock', concept: 'Protein-synthesis inhibitors (ribosome halt)', world: 'Pharm' },
];
