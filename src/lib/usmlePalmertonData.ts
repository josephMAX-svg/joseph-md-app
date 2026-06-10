/**
 * usmlePalmertonData.ts — USMLE (EEUU) construido sobre el material REAL de
 * Alec Palmerton, MD (Yousmle) — canal @alec.palmerton_md.
 *
 * Fuente: catálogo real del canal (180 vídeos) extraído vía Chrome DevTools de la
 * sesión del usuario (09-jun-2026). Se aísla la serie "High Yield [System]"
 * (Step 1 + Step 2 CK) con sus IDs y DURACIONES reales (de ytInitialPlayerResponse /
 * badge del thumbnail), + los vídeos núcleo del MÉTODO Palmerton.
 *
 * Qbankly = capa de QBank/práctica. Su contenido interno NO se pudo extraer en vivo
 * (la SPA bloquea la automatización CDP → documento en blanco). Se referencia como
 * destino de práctica por sistema, sin inventar URLs/duraciones internas.
 *
 * NO se inventan duraciones: las marcadas null abren en YouTube. Todo en inglés/USMLE.
 */
export const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const QBANKLY = 'https://qbankly.app/';

export type UsmleStep = 'Step 1' | 'Step 2 CK' | 'Step 1 + 2';
export type UsmleTier = 'CORE' | 'HIGH' | 'MED'; // por peso en el examen / orden de ataque

export interface PalmertonVideo { titulo: string; id: string; min: number | null; parte?: number; }
export interface UsmleSystem {
  sistema: string;
  step: UsmleStep;
  tier: UsmleTier;
  /** vídeos High Yield reales de Palmerton para este sistema */
  videos: PalmertonVideo[];
  /** foco de práctica en Qbankly (QBank) */
  qbankFoco: string;
}

export const USMLE_META = {
  fuente: 'Alec Palmerton, MD · Yousmle (@alec.palmerton_md)',
  canalVideos: 180,
  serieHighYield: 26,
  qbank: 'Qbankly (qbankly.app) — capa de preguntas',
  objetivo: 'Primera vuelta High-Yield (Step 1 núcleo) · 1h/día → 15-ago',
  nota: 'Vídeos High Yield reales de Palmerton con duración real. Qbankly se usa para hacer preguntas por sistema (su contenido interno no se extrajo en vivo: su SPA bloquea la automatización).',
};

/** El MÉTODO Palmerton — su framework real (First Aid en 5 fases + Anki + test-taking). */
export const PALMERTON_METHOD = {
  tesis: 'No es estudiar MÁS, es entender más profundo. First Aid como mapa, Anki para no olvidar, y preguntas para pensar como el examen. Los 260+ no trabajan más horas: razonan distinto.',
  fases: [
    { fase: 'Fase 1 · Mapa', desc: 'First Aid + un vídeo High-Yield por sistema para construir el esqueleto. No memorizar aún: entender la lógica.' },
    { fase: 'Fase 2 · Anki', desc: 'Tarjetas que prueban razonamiento (no datos sueltos). FSRS bien configurado. Repaso diario sagrado.' },
    { fase: 'Fase 3 · Preguntas', desc: 'QBank (Qbankly/UWorld) en modo tutor. Cada fallo → por qué fallaste (conocimiento vs lectura vs razonamiento).' },
    { fase: 'Fase 4 · Errores', desc: 'Log de errores. Convertir cada error en una tarjeta Anki de razonamiento. La estrategia STRESS para el día del examen.' },
    { fase: 'Fase 5 · Simulacros', desc: 'NBME/UWSA cronometrados. Test-taking: cuando dudas entre 2 respuestas, técnica para subir de 230 a 260+.' },
  ],
  videos: [
    { titulo: 'First Aid Ultimate Guide: 5 Phases to USMLE Mastery', id: 'fSAbdlygPNE', min: null },
    { titulo: 'The ONLY video you need to pass Step 1 in 2026', id: 'BOtQJeFE_rc', min: null },
    { titulo: 'How to Score 260+ on USMLEs in 2026 (Evidence-Based)', id: '7sS9ASCzPU8', min: null },
    { titulo: 'How to (Virtually) Guarantee a Step 1 Pass', id: 'ruFfBeg05ZM', min: null },
    { titulo: 'Test-Taking Tips: From "Stuck Between 2 Answers" to 260+', id: 'wISalwL5EgQ', min: null },
    { titulo: 'How to Score USMLE 260+ (Even If You\'re Failing)', id: 'buenR3-n2TQ', min: null },
    { titulo: 'Give Me 30 Min and I\'ll 5X Your Anki Efficiency (FSRS)', id: 'Te5RnxeG_Gg', min: null },
    { titulo: 'First Aid mistakes that cost you 30+ points', id: 'K6wlds9vz4I', min: null },
    { titulo: 'How to fix mistakes on exam day: the STRESS strategy', id: 'xCiUcrs8UgQ', min: null },
    { titulo: 'Why Anki and UWorld Aren\'t Enough for Step 1', id: 'u5CidwHoVBg', min: null },
  ] as PalmertonVideo[],
};

/** Sistemas USMLE ordenados por rentabilidad (peso en el examen / orden de ataque). */
export const USMLE_SYSTEMS: UsmleSystem[] = [
  { sistema: 'Cardiology', step: 'Step 1 + 2', tier: 'CORE', qbankFoco: 'ECG, IC, SCA, arritmias, valvulopatías, fármacos CV',
    videos: [
      { titulo: 'High Yield Cardiology', id: 'hOGhcie47nM', min: 112, parte: 1 },
      { titulo: 'High Yield Cardiology Part 2', id: 'nFfdaHLtxag', min: 84, parte: 2 },
    ] },
  { sistema: 'Renal', step: 'Step 1 + 2', tier: 'CORE', qbankFoco: 'Ácido-base, electrolitos, AKI/CKD, glomerulonefritis, diuréticos',
    videos: [
      { titulo: 'High Yield Renal', id: 'zeM8dMiRsJQ', min: 95, parte: 1 },
      { titulo: 'High Yield Renal Part 2', id: 'CIIMMIvrRso', min: 109, parte: 2 },
    ] },
  { sistema: 'Respiratory', step: 'Step 1 + 2', tier: 'CORE', qbankFoco: 'Obstructivas/restrictivas, ABG, embolia, Ca pulmón, ARDS',
    videos: [{ titulo: 'High Yield Respiratory', id: 'HU3V0kftcqY', min: 90 }] },
  { sistema: 'Gastrointestinal', step: 'Step 1 + 2', tier: 'CORE', qbankFoco: 'Hígado/LFTs, EII, úlcera, hemorragia GI, abdomen agudo',
    videos: [
      { titulo: 'High Yield GI', id: '8gfhX1aR9-A', min: 164, parte: 1 },
      { titulo: 'High Yield GI Part 2', id: 'E2sE4E6s9B8', min: 111, parte: 2 },
    ] },
  { sistema: 'Endocrine', step: 'Step 1 + 2', tier: 'CORE', qbankFoco: 'Tiroides, suprarrenal, DM, hipófisis, calcio/PTH',
    videos: [{ titulo: 'High Yield Endocrinology', id: 'oQ8PSvInTgM', min: 125 }] },
  { sistema: 'Neurology', step: 'Step 1 + 2', tier: 'CORE', qbankFoco: 'Ictus, lesiones localizadoras, convulsiones, demencias, médula',
    videos: [
      { titulo: 'High Yield Neuro', id: 'YIwfdc7E8TU', min: 74, parte: 1 },
      { titulo: 'High Yield Neuro Part 2', id: '52xHDZJy2sw', min: 99, parte: 2 },
    ] },
  { sistema: 'Hematology', step: 'Step 1 + 2', tier: 'CORE', qbankFoco: 'Anemias, leucemias/linfomas, coagulación, transfusión',
    videos: [{ titulo: 'High Yield Hematology', id: 'zFGfP4d_aOc', min: 40 }] },
  { sistema: 'Immunology', step: 'Step 1', tier: 'HIGH', qbankFoco: 'Hipersensibilidad, inmunodeficiencias, HLA, vacunas',
    videos: [{ titulo: 'High Yield Immunology', id: 'Nfp3hs490wM', min: 41 }] },
  { sistema: 'Pharmacology', step: 'Step 1 + 2', tier: 'HIGH', qbankFoco: 'Mecanismos, efectos adversos, interacciones, autonómicos',
    videos: [
      { titulo: 'High Yield Pharmacology', id: 'J2KWVQ67H2U', min: 70, parte: 1 },
      { titulo: 'High Yield Pharmacology Part 2', id: 'PvKp25ku0po', min: 70, parte: 2 },
    ] },
  { sistema: 'Biochemistry', step: 'Step 1', tier: 'HIGH', qbankFoco: 'Metabolismo, enzimopatías, vitaminas, genética molecular',
    videos: [{ titulo: 'High Yield Biochemistry', id: 'FcXG3ux0a1I', min: 103 }] },
  // ── Step 2 CK / clínicas ──
  { sistema: 'Internal Medicine', step: 'Step 2 CK', tier: 'HIGH', qbankFoco: 'Manejo clínico integrado, guidelines, next-best-step',
    videos: [
      { titulo: 'High Yield Internal Medicine Review (Part 1)', id: 'U336m3i7Qys', min: 158, parte: 1 },
      { titulo: 'High Yield Internal Medicine Review (Part 2)', id: 'MQ8DaEAUfpE', min: 159, parte: 2 },
    ] },
  { sistema: 'Surgery', step: 'Step 2 CK', tier: 'MED', qbankFoco: 'Abdomen agudo, trauma, pre/post-op, LFTs quirúrgicas',
    videos: [
      { titulo: 'High Yield Surgery Review for Step 2 CK', id: 'XwvpxXyNZvs', min: 139, parte: 1 },
      { titulo: 'High Yield Surgery: LFTs & Renal', id: 'qM37ivfjrGs', min: 155, parte: 2 },
    ] },
  { sistema: 'Pediatrics', step: 'Step 2 CK', tier: 'MED', qbankFoco: 'Neonatología, desarrollo, vacunas, urgencias pediátricas',
    videos: [
      { titulo: 'High Yield Pediatrics Review', id: 'h1gPmWX6-AY', min: 211, parte: 1 },
      { titulo: 'High Yield Pediatrics Review Part 2', id: 'wdT2E9Agcsc', min: 184, parte: 2 },
    ] },
  { sistema: 'OB/GYN', step: 'Step 2 CK', tier: 'MED', qbankFoco: 'Control gestación, sangrado, oncología gineco, anticoncepción',
    videos: [
      { titulo: 'High Yield OB/GYN Review', id: '4D7MO0TR2fY', min: 104, parte: 1 },
      { titulo: 'High Yield OB/GYN Review (Part 2)', id: 'nYtSNyXh_Ww', min: 91, parte: 2 },
    ] },
  { sistema: 'Family Medicine', step: 'Step 2 CK', tier: 'MED', qbankFoco: 'Screening, prevención, manejo ambulatorio, guidelines',
    videos: [
      { titulo: 'High Yield Family Medicine Review', id: '7_XnYOfrKzQ', min: 218, parte: 1 },
      { titulo: 'High Yield Family Medicine Review Part 2', id: '2SeEFy27iTI', min: 167, parte: 2 },
    ] },
];

const TIER_ORDER: Record<UsmleTier, number> = { CORE: 0, HIGH: 1, MED: 2 };
export const TIER_INFO: Record<UsmleTier, { label: string; color: string }> = {
  CORE: { label: 'Core · máximo peso', color: '#E5484D' },
  HIGH: { label: 'Alto rendimiento', color: '#F5A623' },
  MED: { label: 'Step 2 CK / clínica', color: '#4Fae6b' },
};

export function sistemasPorRentabilidad(): UsmleSystem[] {
  return [...USMLE_SYSTEMS].sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier]);
}

export function systemMinutes(s: UsmleSystem): number {
  return s.videos.reduce((sum, v) => sum + (v.min || 0), 0);
}
/** minutos totales de la serie High Yield (Step 1 núcleo CORE+HIGH) */
export const USMLE_TOT: {
  totalMin: number; coreMin: number; sistemas: number;
} = {
  totalMin: USMLE_SYSTEMS.reduce((s, x) => s + systemMinutes(x), 0),
  coreMin: USMLE_SYSTEMS.filter((x) => x.tier !== 'MED').reduce((s, x) => s + systemMinutes(x), 0),
  sistemas: USMLE_SYSTEMS.length,
};

export function fmtMin(min: number | null): string {
  if (!min) return 'ver en YouTube';
  const h = Math.floor(min / 60), m = min % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}
