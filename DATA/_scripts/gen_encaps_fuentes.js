// gen_encaps_fuentes.js — GENERA src/lib/encapsFuentes.ts (material ENCAPS verificado EN VIVO):
//  · 105 fichas técnicas del MINSA (QxMedic biblioteca · Dropbox, link directo c/u, por área)
//  · ENCAPS_FICHAS_POR_TEMA: las 105 fichas mapeadas a cada tema (codigo) por keyword → se muestran
//    inline en "Material del tema" del plan diario, con tiempo (min) por ficha.
//  · ENCAPS_VIDEO_RESPALDO: por tema SIN video QX → videoclase de respaldo (DR LOPEZ/GALENO).
//  · 3 academias de respaldo del Drive (DR LOPEZ / GALENO / VILLAMEDIC) con link a cada subcarpeta.
//  · 8 simulacros Theomed con URL exacta + accesos QxMedic.
// Fuente: DATA/ENCAPS/_qx_fichas_minsa_v2.json (105, re-scrape 22-jun) + IDs Drive (Chrome DevTools).
// Regenerar: node DATA/_scripts/gen_encaps_fuentes.js
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const v2 = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/ENCAPS/_qx_fichas_minsa_v2.json'), 'utf8'));
const fichasRaw = (v2.fichas || v2).map(f => ({ titulo: f.titulo.replace(/\s+/g, ' ').trim(), url: f.url.replace(/[?&](st|e)=[^&]+/g, '') }));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const areaDe = (u) => { const s = decodeURIComponent(u).toUpperCase();
  if (/CUIDADO-?INTEGRAL/.test(s)) return 'Cuidado Integral';
  if (/SALUD-?P/.test(s)) return 'Salud Pública';
  if (/ETICA|ÉTICA|INTERCULT/.test(s)) return 'Ética e Interculturalidad';
  if (/INVESTIGAC/.test(s)) return 'Investigación';
  if (/GESTI/.test(s)) return 'Gestión de Servicios';
  return 'Transversal'; };
const cap = (s) => s.replace(/\s+/g, ' ').trim().replace(/^\w/, (c) => c.toUpperCase());
const cortar = s => s
  .replace(/\s+temas? (transversales|especificos|específicos).*$/i, '')
  .replace(/\s+atenci[oó]n intercultural en salud.*$/i, '')
  .replace(/\s+promoci[oó]n de la salud.*$/i, '')
  .replace(/\s+m[eé]todos y aplicaciones.*$/i, '')
  .replace(/\s+conceptos y clasificaci[oó]n.*$/i, '')
  .replace(/\s+ejecuci[oó]n de la investigaci[oó]n.*$/i, '')
  .replace(/\s+metodolog[ií]a de la investigaci[oó]n.*$/i, '').trim();
const fichas = fichasRaw.map((f) => ({ titulo: cap(cortar(f.titulo)), url: f.url, area: areaDe(f.url) }))
  .sort((a, b) => a.area.localeCompare(b.area) || a.titulo.localeCompare(b.titulo));

// ── mapeo ficha → tema (codigo) por keyword (1ª coincidencia, en orden del plan) ──
const TOPICS = [
  ['II-3', ['vacunaci', 'esquema regular de vacunaci', 'esavi', 'cadena de frio', 'inmunizaci']],
  ['II-1', ['materna', 'prenatal', 'atencion prenatal', 'parto', 'gestante', 'puerperio', 'alumbramiento', 'climaterio', 'menopausia', 'planificacion familiar', 'obstetr', 'diagnostico del embarazo', 'dilatacion', 'expulsivo', 'binomio madre nino', 'emergencias neonatales', 'manejo inicial de emergencias']],
  ['II-2', ['cred', 'crecimiento y desarrollo', 'paquete del cuidado integral de salud del nino', 'salud del nino']],
  ['I-4', ['dengue', 'malaria', 'metaxenic', 'zoonosis', 'leishman', 'bartonel', 'chagas', 'leptospir', 'metales pesados', 'intoxicaci', 'enfermedades transmisibles', 'prevencion de enfermedades transmisibles']],
  ['II-4', ['anemia', 'nutrici', 'alimentaci', 'micronutriente', 'desnutricion', 'vitamina a', 'suplementacion']],
  ['II-6', ['tuberculosis']],
  ['V-1', ['categorizaci', 'establecimientos de salud']],
  ['II-11', ['atencion integral de las its', ' its', 'vih', 'sida', 'sifilis', 'transmision sexual']],
  ['I-1', ['promocion de la salud', 'bioseguridad', 'prevencion del riesgo', 'estilos de vida', 'infecciones asociadas a la atencion', 'prevencion y control de infecciones', 'historia natural del proceso salud', 'etapas y niveles de prevencion', 'conceptos basicos de salud publica']],
  ['I-2', ['fesp', 'funciones esenciales']],
  ['I-3', ['vigilancia epidemiolog', 'vigilancia en salud publica', 'notificaci', 'brote', 'conceptos basicos de epidemiologia']],
  ['II-5', ['atencion primaria de salud', 'modelo de cuidado', 'atencion centrada en la persona', 'paquete de atencion integral', 'curso de vida', 'mci -', 'definicion del modelo', 'politica nacional multisectorial', 'prestacion', 'examenes auxiliares', 'paquete basico de cuidado para el adolescente', 'paquete basico del cuidado integral del joven', 'paquete basico del cuidado integral del adulto', 'uso racional de medicamentos']],
  ['II-7', ['adulto mayor', 'vacam', 'persona adulta mayor']],
  ['II-8', ['hipertensi', 'diabetes', 'cardiovascular', 'no transmisibles', 'enfermedades cronicas', 'metabolic', 'ecnt']],
  ['II-9', ['salud mental']],
  ['II-10', ['cancer', 'oncolog', 'neoplas', 'enfermedades raras y huerfanas']],
  ['III-1', ['bioetica', 'principios eticos', 'belmont', 'dilemas eticos']],
  ['III-3', ['consentimiento']],
  ['III-9', ['derechos del paciente', 'derechos de los usuarios', 'derechos del usuario', 'deberes y derechos']],
  ['V-2', ['planeamiento', 'plan operativo', 'plan estrategico', 'foda', ' pei', ' poi']],
  ['V-6', ['telesalud', 'telemedicina', 'telemonitoreo', 'teleorientaci']],
  ['IV-1', ['tipos de estudio', 'disenos de estudio', 'diseno de investigacion', 'estudios epidemiologic', 'conceptos basicos de investigacion', 'enfoques y metodos de investigacion', 'estudios analiticos', 'estudios descriptivos', 'tipos de investigacion', 'clasificacion de las investigaciones', 'conceptos y clasificacion']],
  ['I-5+I-6', ['determinantes', 'bioestadistica', 'estadistica', 'demografia']],
  ['I-7', ['infancia', 'pnaia', 'plan nacional de accion por la']],
  ['I-8', ['discapacidad']],
  ['I-9', ['estrategia nacional de salud familiar', 'familias']],
  ['I-11+I-12', ['comunitari', 'comunidad', 'agente comunitario', 'salud familiar y comunitaria']],
  ['II-12', ['bucal', 'odontolog', 'salud oral']],
  ['II-13', ['ocular', 'oftalm', 'salud visual', 'audit', 'oido', 'otolog']],
  ['III-2', ['colegio medico', ' cmp', 'deontolog', 'aspectos legales y forenses', 'acto medico']],
  ['III-5', ['intercultural', 'pertinencia cultural', 'parto vertical', 'medicina tradicional', 'identidad cultural', 'diversidad cultural', 'migrante', 'estigma', 'autopercepcion etnica', 'enfoque intercultural', 'dialogo intercultural', 'inclusion y la equidad']],
  ['III-6+III-10', ['adecuacion cultural', 'politica intercultural', 'pueblos indigenas', 'poblacion indigena']],
  ['III-8', ['etica publica', '27815', 'funcion publica', 'codigo de etica de la funcion', 'aspectos eticos de las publicaciones', 'etica y aspectos eticos']],
  ['IV-2', ['validez', 'sesgo', 'confusion', 'causalidad', 'instrumentos de recoleccion', 'procesamiento y analisis de datos', 'metodologia de la investigacion', 'elaboracion del proyecto de investigacion']],
  ['IV-3+IV-5', ['tamizaje', 'cribado', 'prueba diagnostic', 'pruebas diagnostic', 'sensibilidad', 'especificidad']],
  ['IV-4', ['riesgo relativo', 'odds', 'medidas de asociacion', 'razon de momios']],
  ['IV-6+IV-7', ['indicador', 'sala situacional', 'analisis situacional', 'publicacion cientifica', 'caracteristicas estructurales del informe', 'requisitos metodologicos del informe', 'ejecucion de la investigacion']],
  ['V-3', ['niveles de atencion', 'referencia y contrarreferencia', 'emergencia, urgencia']],
  ['V-7+V-10', [' sis', 'aseguramiento', ' aus', 'seguro integral']],
  ['I-10', ['atencion primaria', ' aps ', 'primer nivel', 'alma']],
  ['III-4+III-7', ['violencia', 'genero', 'aborto', 'maltrato']],
];
const porTema = {}; TOPICS.forEach(([c]) => porTema[c] = []);
let sinAsignar = 0;
for (const f of fichas) {
  const t = ' ' + norm(f.titulo) + ' ';
  let hit = null;
  for (const [cod, kws] of TOPICS) { if (kws.some(k => t.includes(k))) { hit = cod; break; } }
  if (hit) porTema[hit].push({ titulo: f.titulo, url: f.url, min: 10 }); else sinAsignar++;
}
// respaldo de video por área (DR LOPEZ; Investigación/Gestión → GALENO) para temas SIN video QX
const F = id => 'https://drive.google.com/drive/folders/' + id;
const AREA_PREF = { I: 'Salud Pública', II: 'Cuidado Integral', III: 'Ética e Interculturalidad', IV: 'Investigación', V: 'Gestión de Servicios' };
const VIDEO_FB = { 'Salud Pública': F('1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0'), 'Cuidado Integral': F('1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE'), 'Ética e Interculturalidad': F('1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu'), 'Investigación': F('1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8'), 'Gestión de Servicios': F('1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8') };
const SIN_VIDEO = ['III-3', 'I-7', 'I-8', 'I-9', 'II-13', 'IV-3+IV-5', 'IV-4', 'IV-6+IV-7', 'III-4+III-7'];
const videoRespaldo = {};
SIN_VIDEO.forEach(cod => { const area = AREA_PREF[cod.match(/^[IVX]+/)[0]]; videoRespaldo[cod] = { url: VIDEO_FB[area], label: '🎬 Videoclase de respaldo (' + (area === 'Investigación' || area === 'Gestión de Servicios' ? 'GALENO' : 'DR LOPEZ') + ') — QxMedic no tiene video de este tema', min: 25 }; });
// VIDEO alternativo (Google Drive · DR LOPEZ áreas I/II/III, GALENO áreas IV/V) — 2ª opción a QX para CADA tema.
// Theomed NO tiene videos de clase por tema (verificado 22-jun: carpetas=PDF, sesiones=PPT/PDF, sin Vimeo/YouTube).
const videoDriveArea = {};
Object.entries(AREA_PREF).forEach(([pref, area]) => {
  const acad = (area === 'Investigación' || area === 'Gestión de Servicios') ? 'GALENO' : 'DR LOPEZ';
  videoDriveArea[area] = { url: VIDEO_FB[area], label: `🎬 Videoclases ${area} (${acad} · Google Drive)`, min: 25, acad };
});

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
// Theomed MEDICINA REGULAR GP1 (curso 73) — sección por área (sesiones asincrónicas + en vivo + manual +
// repasos + banqueos + POSTESTS). El deep-link a la sección incluye SIEMPRE el material actual Y el que
// se libere por vueltas/fases (Theomed sube por fases: video → repaso → evaluación). Verificado 22-jun.
const thSec = (n) => 'https://campus.academiatheomed.com/course/view.php?id=73&section=' + n;
const THEOMED_AREA = {
  'Salud Pública': { url: thSec(2), n: 31 },
  'Cuidado Integral': { url: thSec(3), n: 54 },
  'Ética e Interculturalidad': { url: thSec(4), n: 11 },
  'Investigación': { url: thSec(5), n: 7 },
  'Gestión de Servicios': { url: thSec(6), n: 25 },
};
const THEOMED_EXTRA = [
  { n: '📋 Normas Técnicas (transversal · 30 docs)', url: thSec(1) },
  { n: '📂 Material complementario', url: thSec(7) },
  { n: '🎥 Webinars', url: thSec(8) },
  { n: '🏁 Actividades finales 2026-II', url: thSec(9) },
];
const AREA_PREFIJO = { I: 'Salud Pública', II: 'Cuidado Integral', III: 'Ética e Interculturalidad', IV: 'Investigación', V: 'Gestión de Servicios' };
const qxAccesos = [
  { n: '📚 Biblioteca · Fundamentos Teóricos (105 fichas)', url: 'https://qxmedic-aulavirtual.com/mis-clases/biblioteca' },
  { n: '🎬 Videoclases QxMedic (184, por área)', url: 'https://qxmedic-aulavirtual.com/mis-clases/videoclases' },
  { n: '🧪 Evaluaciones / App Banqueo', url: 'https://qxmedic-aulavirtual.com/evaluaciones/banqueapp' },
];

// ── Theomed VIDEOS GRABADOS (Vimeo) por área — scrape 22-jun de las 10 sub-secciones SESIONES (curso 73).
// Cada sesión = video Vimeo embebido en Theomed + PDF de la sesión. Las en-vivo de Inv/Ética son futuras
// (curso cronológico) → se llenan por vueltas; el deep-link a la sección las trae automáticamente.
const SEC_AREA = {
  '2420': ['Salud Pública', 'en vivo'], '2419': ['Salud Pública', 'asinc'],
  '2421': ['Cuidado Integral', 'en vivo'], '2276': ['Cuidado Integral', 'asinc'],
  '2422': ['Ética e Interculturalidad', 'en vivo'], '2423': ['Ética e Interculturalidad', 'asinc'],
  '2425': ['Investigación', 'en vivo'], '2424': ['Investigación', 'asinc'],
  '2428': ['Gestión de Servicios', 'en vivo'], '2426': ['Gestión de Servicios', 'asinc'],
};
const thvDir = path.join(ROOT, 'DATA/ENCAPS/thv');
const theomedVideos = {};
if (fs.existsSync(thvDir)) {
  for (const f of fs.readdirSync(thvDir).filter((x) => x.endsWith('.json'))) {
    const d = JSON.parse(fs.readFileSync(path.join(thvDir, f), 'utf8'));
    const id = d.secId || (d.url && (d.url.match(/id=(\d+)/) || [])[1]) || (f.match(/(\d+)/) || [])[1];
    const m = SEC_AREA[id]; if (!m) continue;
    const [area, tipo] = m;
    if (!theomedVideos[area]) theomedVideos[area] = { envivoUrl: '', asincUrl: '', sesiones: [] };
    theomedVideos[area][tipo === 'en vivo' ? 'envivoUrl' : 'asincUrl'] = 'https://campus.academiatheomed.com/course/section.php?id=' + id;
    for (const s of (d.sessions || [])) {
      if (!s.vimeo && !s.pdf) continue;
      const fecha = (s.sesion.match(/\(([^)]+)\)/) || [])[1] || '';
      theomedVideos[area].sesiones.push({ tipo, label: s.sesion.replace(/\s*\([^)]*\)/, '').trim(), fecha, pdf: s.pdf || '', vimeo: s.vimeo || '' });
    }
  }
}
const thvTotal = Object.values(theomedVideos).reduce((a, x) => a + x.sesiones.filter((s) => s.vimeo).length, 0);
Object.keys(theomedVideos).forEach((a) => { const v = theomedVideos[a]; v.nVideos = v.sesiones.filter((s) => s.vimeo).length; });

const ts = `/**
 * encapsFuentes.ts — MATERIAL ENCAPS verificado EN VIVO (re-scrape 22-jun-2026, Chrome DevTools).
 * Todo el material con LINK DIRECTO (para no buscar). GENERADO por DATA/_scripts/gen_encaps_fuentes.js.
 * Cobertura 100% (meta ≥17/20): cada tema muestra sus fichas MINSA QX (ENCAPS_FICHAS_POR_TEMA) + video
 * de respaldo si QX no tiene (ENCAPS_VIDEO_RESPALDO); fichas/normativa → QX biblioteca + DR LOPEZ Normativas.
 */
export type FichaMinsa = { titulo: string; url: string; area: string };
export type FichaTema = { titulo: string; url: string; min: number };
export type FuenteLink = { n: string; url: string };
export type AcademiaRespaldo = { nombre: string; tag: string; url: string; carpetas: FuenteLink[] };

export const ENCAPS_FICHAS_MINSA: FichaMinsa[] = ${JSON.stringify(fichas, null, 0).replace(/},/g, '},\n  ').replace(/^\[/, '[\n  ').replace(/\]$/, ',\n]')};

// 105 fichas MINSA mapeadas a cada tema (codigo) → "Material del tema" del plan diario, con tiempo.
export const ENCAPS_FICHAS_POR_TEMA: Record<string, FichaTema[]> = ${JSON.stringify(porTema, null, 1)};

// temas SIN video en QxMedic → videoclase de respaldo (DR LOPEZ / GALENO)
export const ENCAPS_VIDEO_RESPALDO: Record<string, { url: string; label: string; min: number }> = ${JSON.stringify(videoRespaldo, null, 1)};

// VIDEO alternativo por área (Google Drive · DR LOPEZ / GALENO) — 2ª opción a QX para CADA tema.
export const ENCAPS_VIDEO_DRIVE: Record<string, { url: string; label: string; min: number; acad: string }> = ${JSON.stringify(videoDriveArea, null, 1)};

// Theomed VIDEOS GRABADOS (Vimeo) por área — 3ª opción de video. Cada sesión tiene su PDF. Los videos
// están embebidos en Theomed (Vimeo dominio-restringido) → se abren vía la sección (envivoUrl/asincUrl).
export type TheomedSesion = { tipo: string; label: string; fecha: string; pdf: string; vimeo: string };
export const ENCAPS_THEOMED_VIDEOS: Record<string, { envivoUrl: string; asincUrl: string; nVideos: number; sesiones: TheomedSesion[] }> = ${JSON.stringify(theomedVideos, null, 1)};

export const ENCAPS_ACADEMIAS_RESPALDO: AcademiaRespaldo[] = ${JSON.stringify(academias, null, 1)};

export const ENCAPS_THEOMED_SIMULACROS: FuenteLink[] = ${JSON.stringify(theomedSims, null, 1)};

// Theomed por área (sección del curso 73): cada tema deep-linkea a su área → sesiones + PPTs + POSTESTS
// + repasos + banqueos, incluido lo que se libere por vueltas. area = ENCAPS_AREA_PREFIJO[codigo prefijo].
export const ENCAPS_THEOMED_AREA: Record<string, { url: string; n: number }> = ${JSON.stringify(THEOMED_AREA, null, 1)};
export const ENCAPS_THEOMED_EXTRA: FuenteLink[] = ${JSON.stringify(THEOMED_EXTRA, null, 1)};
export const ENCAPS_AREA_PREFIJO: Record<string, string> = ${JSON.stringify(AREA_PREFIJO, null, 1)};

export const ENCAPS_QX_ACCESOS: FuenteLink[] = ${JSON.stringify(qxAccesos, null, 1)};

export const ENCAPS_FUENTES_META = {
  fichasMinsa: ${fichas.length},
  fichasAsignadas: ${fichas.length - sinAsignar},
  academiasRespaldo: ${academias.length},
  theomedSimulacros: ${theomedSims.length},
  verificado: '2026-06-22',
} as const;
`;
fs.writeFileSync(path.join(ROOT, 'src/lib/encapsFuentes.ts'), ts, 'utf8');
console.log('OK encapsFuentes.ts ·', fichas.length, 'fichas ·', fichas.length - sinAsignar, 'asignadas a temas ·', sinAsignar, 'sin asignar ·', academias.length, 'academias');
const byArea = {}; fichas.forEach((f) => byArea[f.area] = (byArea[f.area] || 0) + 1);
console.log('fichas por área:', JSON.stringify(byArea));
console.log('temas con fichas:', Object.entries(porTema).filter(([k, v]) => v.length).length, '/ 41 · video respaldo:', Object.keys(videoRespaldo).length, 'temas');
console.log('Theomed videos grabados (Vimeo):', thvTotal, 'en', Object.keys(theomedVideos).length, 'áreas →', Object.entries(theomedVideos).map(([a, v]) => a.split(' ')[0] + ':' + v.nVideos).join(' '));
