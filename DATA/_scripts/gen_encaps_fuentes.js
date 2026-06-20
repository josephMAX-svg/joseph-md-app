// gen_encaps_fuentes.js — GENERA src/lib/encapsFuentes.ts (material ENCAPS verificado EN VIVO 19-jun):
//  · 95 fichas técnicas del MINSA (QxMedic biblioteca · Dropbox, link directo c/u, por área)
//  · 3 academias de respaldo del Drive (DR LOPEZ / GALENO / VILLAMEDIC) con link directo a CADA subcarpeta
//  · 8 simulacros Theomed con URL exacta de cuestionario
//  · accesos QxMedic (biblioteca + videoclases)
// Fuente: DATA/ENCAPS/_qx_fichas_minsa.json + IDs de Drive scrapeados con Chrome DevTools.
// Regenerar: node DATA/_scripts/gen_encaps_fuentes.js
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const fichasRaw = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/ENCAPS/_qx_fichas_minsa.json'), 'utf8')).fichas || [];
const areaDe = (u) => { const s = decodeURIComponent(u).toUpperCase();
  if (/CUIDADO-?INTEGRAL/.test(s)) return 'Cuidado Integral';
  if (/SALUD-?P/.test(s)) return 'Salud Pública';
  if (/ETICA|ÉTICA|INTERCULT/.test(s)) return 'Ética e Interculturalidad';
  if (/INVESTIGAC/.test(s)) return 'Investigación';
  if (/GESTI/.test(s)) return 'Gestión de Servicios';
  return 'Transversal'; };
const cap = (s) => s.replace(/\s+/g, ' ').trim().replace(/^\w/, (c) => c.toUpperCase());
const fichas = fichasRaw.map((f) => ({ titulo: cap(f.titulo), url: f.url, area: areaDe(f.url) }))
  .sort((a, b) => a.area.localeCompare(b.area) || a.titulo.localeCompare(b.titulo));
const folder = (id) => 'https://drive.google.com/drive/folders/' + id;
const file = (id) => 'https://drive.google.com/file/d/' + id + '/view';
const quiz = (id) => 'https://campus.academiatheomed.com/mod/quiz/view.php?id=' + id;

const academias = [
  { nombre: 'DR LOPEZ', tag: 'La más completa', url: folder('1na0lmY_BY9naLlcAzgqSBXR7T-kPUBKv'), carpetas: [
    { n: '🎬 Videoclases · Cuidado Integral', url: folder('1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE') },
    { n: '🎬 Videoclases · Ética e Interculturalidad', url: folder('1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu') },
    { n: '🎬 Videoclases · Salud Pública', url: folder('1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0') },
    { n: '📈 Normativas (fichas MINSA)', url: folder('1YdyhemfujHYIROcBcr9G9avUYulqfpko') },
    { n: '📝 Simulacros', url: folder('1Svt1JyDTunsfOYUI8ochTEYW6NzynsBH') },
    { n: '🎯 Compendio', url: folder('13fYG58fySgFIC1HKBVUCNw61ipa6C69V') },
    { n: '😬 Kahoot', url: folder('1qPY0rwPDsUZhIJfIyaL1z76W69YGUlFO') },
    { n: '🎥 Sesión Introductoria (mp4)', url: file('1gf2zPcrc4peDWScn6Lauvy2mrF7wQmc1') },
  ] },
  { nombre: 'GALENO MEDIC', tag: 'Perlitas high-yield', url: folder('1_hSoU8ZuLBCnq8VpWkPi6b7_ryUPxoUk'), carpetas: [
    { n: '✨ Perlitas Galeno (resúmenes high-yield)', url: folder('1U0aPoXeM9MmCdj7PspvKr5VP-b9RKxZN') },
    { n: '🎥 Videoclases', url: folder('1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8') },
    { n: '🤝 Tutoría General', url: folder('1iMNLfo7_Srhr12d6hR6jzU6594azb8Ez') },
    { n: '🎥 Introducción al curso (mp4)', url: file('1_ch2QERQ56uEulVQKM6vTqQSqbW--J4s') },
  ] },
  { nombre: 'VILLAMEDIC', tag: 'Clases en vivo + sims', url: folder('1ovJbxq1Bw_Jub6vPK-K1nv6Nc_ovh79P'), carpetas: [
    { n: '🎥 Fase 1: Clases en vivo', url: folder('1fVpTnKxprTgCS2ENeGlJ6PSL34I7ntXm') },
    { n: '📝 Simulacros', url: folder('1UiJVPpq_BCtp-dodUfDn1fnVURZC_16h') },
    { n: '📅 Cronograma jun-jul (pdf)', url: file('19kZQFC0bmT3hgmsOlGoyc7GsOnU8_6sc') },
  ] },
];
const theomedSims = [
  { n: 'Simulacro 15/05', url: quiz(20244) }, { n: 'Simulacro 29-MAY', url: quiz(4242) },
  { n: 'Simulacro 12-JUN', url: quiz(4442) }, { n: 'Examen TIPO A', url: quiz(7934) },
  { n: 'Examen TIPO B', url: quiz(7935) }, { n: 'Examen TIPO A (2)', url: quiz(7937) },
  { n: 'Examen TIPO B (2)', url: quiz(7938) }, { n: 'Examen 2025-II', url: quiz(7940) },
];
const qxAccesos = [
  { n: '📚 Biblioteca · Fundamentos Teóricos (95 fichas)', url: 'https://qxmedic-aulavirtual.com/mis-clases/biblioteca' },
  { n: '🎬 Videoclases QxMedic (184, por área)', url: 'https://qxmedic-aulavirtual.com/mis-clases/videoclases' },
  { n: '🧪 Evaluaciones / App Banqueo', url: 'https://qxmedic-aulavirtual.com/evaluaciones/banqueapp' },
];

const ts = `/**
 * encapsFuentes.ts — MATERIAL ENCAPS verificado EN VIVO (19-jun-2026, Chrome DevTools).
 * Todo el material con LINK DIRECTO (para no buscar). GENERADO por DATA/_scripts/gen_encaps_fuentes.js.
 * Cobertura 100% (meta ≥17/20): si un tema no tiene video en QxMedic → DR LOPEZ/GALENO Videoclases;
 * más simulacros → VILLAMEDIC/DR LOPEZ; fichas/normativa → QxMedic biblioteca + DR LOPEZ Normativas.
 */
export type FichaMinsa = { titulo: string; url: string; area: string };
export type FuenteLink = { n: string; url: string };
export type AcademiaRespaldo = { nombre: string; tag: string; url: string; carpetas: FuenteLink[] };

export const ENCAPS_FICHAS_MINSA: FichaMinsa[] = ${JSON.stringify(fichas, null, 0).replace(/},/g, '},\n  ').replace(/^\[/, '[\n  ').replace(/\]$/, ',\n]')};

export const ENCAPS_ACADEMIAS_RESPALDO: AcademiaRespaldo[] = ${JSON.stringify(academias, null, 1)};

export const ENCAPS_THEOMED_SIMULACROS: FuenteLink[] = ${JSON.stringify(theomedSims, null, 1)};

export const ENCAPS_QX_ACCESOS: FuenteLink[] = ${JSON.stringify(qxAccesos, null, 1)};

export const ENCAPS_FUENTES_META = {
  fichasMinsa: ${fichas.length},
  academiasRespaldo: ${academias.length},
  theomedSimulacros: ${theomedSims.length},
  verificado: '2026-06-19',
} as const;
`;
fs.writeFileSync(path.join(ROOT, 'src/lib/encapsFuentes.ts'), ts, 'utf8');
console.log('OK src/lib/encapsFuentes.ts ·', fichas.length, 'fichas MINSA ·', academias.length, 'academias ·', theomedSims.length, 'sims Theomed');
const byArea = {}; fichas.forEach((f) => byArea[f.area] = (byArea[f.area] || 0) + 1);
console.log('fichas por área:', JSON.stringify(byArea));
