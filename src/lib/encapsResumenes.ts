// encapsResumenes.ts — INVENTARIO FASE 2/3: bancos de preguntas, mapas conceptuales, resúmenes y
// postests de QX Medic + Theomed. MÉTODO BANQUEO (Joseph): se banquea PRIMERO, el mapa/resumen se
// revisa después (Palmerton: ciegas → clave → recalibrar). Los videos generales quedan FUERA del día.
// Verificado LOGUEADO apartado por apartado el 19-jul-2026 (QX: /evaluaciones, /banqueapp, /biblioteca,
// /tendencias · Theomed: las 47 secciones del curso 73 + cursos 37 y 89).
export type Resumen = { label: string; url: string; fuente: string };
const TH = (id: string) => `https://campus.academiatheomed.com/mod/resource/view.php?id=${id}`;
const THQ = (id: string) => `https://campus.academiatheomed.com/mod/quiz/view.php?id=${id}`;
const THU = (id: string) => `https://campus.academiatheomed.com/mod/url/view.php?id=${id}`;
const QX = (p: string) => `https://qxmedic-aulavirtual.com${p}`;

// ── 🎯 BANCOS DE PREGUNTAS GLOBALES (el centro del método; van al TOPE del día) ───────────────────
export const ENCAPS_BANCOS: Resumen[] = [
  { label: '⭐ App BANQUEO QX (banco principal)', url: QX('/evaluaciones/banqueapp'), fuente: 'QX · App Banqueo' },
  // Verificado en vivo 20-jul: 18 sets ENCAPS = 2.052 preguntas REALES, publicándose por área a diario
  // (Salud Pública 1-5 = 688Q · Ética 1-4 = 255Q · Cuidado Integral 1-9 = 1.109Q). Investigación y
  // Gestión aún no publicados → re-escanear cada arranque.
  { label: '⭐ QX · Banqueo ENCAPS por ÁREA (18 sets · 2.052 preguntas)', url: QX('/evaluaciones/tipo/UzBiYlBybXhBcU9hbVA4Z3hBN2ZEQT09'), fuente: 'QX · Banqueo' },
  { label: 'QX · Simulacros Virtuales', url: QX('/evaluaciones/tipo/NjlOQWdwRlptU2U0eUZtcU9uMW53Zz09'), fuente: 'QX · Simulacros' },
  { label: 'QX · Evaluación Virtual Avanzada', url: QX('/evaluaciones/tipo/Znd3WnF4VSs3ZzR0YmtsUDNoR1BUVkpYZnoreU9JT2RIbUpFUXNhbDdCTT0='), fuente: 'QX · Eval avanzada' },
  { label: 'Theomed · BANCO DE PREGUNTAS', url: TH('20134'), fuente: 'Theomed · banco' },
  { label: 'Theomed · BANCO MEDICINA 2026', url: THU('19226'), fuente: 'Theomed · banco' },
  { label: 'Theomed · FLASHCARDS', url: THU('19223'), fuente: 'Theomed · flashcards' },
  { label: 'Theomed · SIMULACROS MEDICINA (curso completo)', url: 'https://campus.academiatheomed.com/course/view.php?id=37', fuente: 'Theomed · simulacros' },
  { label: 'Theomed · KAHOOTS 2026-2', url: 'https://campus.academiatheomed.com/course/view.php?id=89', fuente: 'Theomed · kahoots' },
];

// ── 🎯 POSTESTS por ÁREA (50 quizzes con link directo = banco por tema) ───────────────────────────
export const ENCAPS_POSTESTS: Record<string, Resumen[]> = {
  'Salud Pública': [
    ...['20222','20266','20462','20387','20601','20649','20650','20658'].map((id,i)=>({label:`Postest asincrónico N°${i+1} · SP`, url:THQ(id), fuente:'Theomed · postest'})),
    ...['20516','20684','21396','22498','23218','23394','23392','23385'].map((id,i)=>({label:`Postest sesión EN VIVO N°${i+1} · SP`, url:THQ(id), fuente:'Theomed · postest'})),
    { label: 'Postest ADICIONAL · SP', url: THQ('23693'), fuente: 'Theomed · postest' },
  ],
  'Cuidado Integral': [
    ...['20201','20225','20270','20342','20341','20488','20586','20646'].map((id,i)=>({label:`Postest asincrónico N°${i+1} · CI`, url:THQ(id), fuente:'Theomed · postest'})),
    ...['20325','20338','20533','20519','20534'].map((id,i)=>({label:`Postest sincrónico N°${i+1} · CI`, url:THQ(id), fuente:'Theomed · postest'})),
  ],
  'Ética e Interculturalidad': [
    ...['20160','20175','20186'].map((id,i)=>({label:`Postest asincrónico N°${i+1} · Ética`, url:THQ(id), fuente:'Theomed · postest'})),
    ...['23212','23319'].map((id,i)=>({label:`Postest sesión EN VIVO N°${i+1} · Ética`, url:THQ(id), fuente:'Theomed · postest'})),
  ],
  'Investigación': ['20283','20284','20349'].map((id,i)=>({label:`Postest N°${i+1} · Investigación`, url:THQ(id), fuente:'Theomed · postest'})),
  'Gestión de Servicios': [
    ...['20495','20527','20605','20620','20681','21124','21427'].map((id,i)=>({label:`Postest asincrónico N°${i+1} · Gestión`, url:THQ(id), fuente:'Theomed · postest'})),
    ...['21391','23109','23111','23114','23129'].map((id,i)=>({label:`Postest sesión EN VIVO N°${i+1} · Gestión`, url:THQ(id), fuente:'Theomed · postest'})),
  ],
};

// ── 📝 RESÚMENES / THEOPEPAS por código (Fase 2, ya digeridos) ────────────────────────────────────
export const ENCAPS_THEOMED_RESUMENES: Record<string, Resumen[]> = {
  'I-3': [
    { label: 'THEOPEPAS Salud Pública (resumen integral · Premio Kahoot)', url: TH('23089'), fuente: 'Theomed · THEOPEPA' },
    { label: 'Resumen CAUSALIDAD', url: TH('19280'), fuente: 'Theomed · resumen' },
    { label: 'Resumen Enfermedades Endémicas', url: TH('23157'), fuente: 'Theomed · resumen' },
    { label: 'Ejemplos Cadena Epidemiológica', url: TH('22465'), fuente: 'Theomed · ejemplos' },
  ],
  'I-4': [
    { label: 'Resumen DEFINICIONES DE CASO', url: TH('19279'), fuente: 'Theomed · resumen' },
    { label: 'Resumen Definiciones de Caso en Vigilancia Epidemiológica', url: TH('23219'), fuente: 'Theomed · resumen' },
  ],
  'I-2': [
    { label: 'Resumen FESP RENOVADAS', url: TH('19278'), fuente: 'Theomed · resumen' },
    { label: 'Resumen FESP MINSA (21/05/26)', url: TH('20518'), fuente: 'Theomed · resumen' },
  ],
  'II-5': [
    { label: 'RESUMEN MCI (Modelo de Cuidado Integral)', url: TH('19281'), fuente: 'Theomed · resumen' },
    { label: 'REPASO CUIDADO INTEGRAL (con notas)', url: TH('23616'), fuente: 'Theomed · repaso' },
    { label: 'REPASO CUIDADO INTEGRAL', url: TH('23619'), fuente: 'Theomed · repaso' },
  ],
};

// ── 🗺️ MAPAS CONCEPTUALES: PDFs compilados por área (QX) + biblioteca QX ─────────────────────────
export const ENCAPS_MAPAS_PDF: Record<string, Resumen> = {
  'Salud Pública': { label: 'PDF Mapas Conceptuales · Salud Pública', url: 'https://www.dropbox.com/scl/fi/q01p4yyacsbu4mzrprhsg/SERUMS-2026-I-MAPAS-CONCEPTUALES-SALUD-P-BLICA.pdf?rlkey=tgqi3hq49orkc5rsxyxapib6x&st=elawp8hm&dl=0', fuente: 'QX · PDF mapas' },
  'Cuidado Integral': { label: 'PDF Mapas Conceptuales · Cuidado Integral', url: 'https://www.dropbox.com/scl/fi/sct5jgdylbcptufy5g9y4/MAPAS-CONCEPTUALES-CUIDADO-INTEGRAL.pdf?rlkey=romw7o4en2llzn4262srwkz5t&st=h3rpy4zv&dl=0', fuente: 'QX · PDF mapas' },
  'Ética e Interculturalidad': { label: 'PDF Mapas Conceptuales · Ética e Interculturalidad', url: 'https://www.dropbox.com/scl/fi/6fu4m71ufdcobpcrb10fx/MAPAS-CONCEPTUALES-TICA-E-INTERCULTURALIDAD.pdf?rlkey=ggsk0wi57kqrnpvkr4d6nwi48&dl=0', fuente: 'QX · PDF mapas' },
};

// Biblioteca QX: "Mapas Conceptuales" (18 recursos) + "Fundamentos Teóricos" (121 fichas MINSA)
export const ENCAPS_BIBLIOTECA_QX: Resumen = {
  label: 'Biblioteca QX · Mapas Conceptuales (18) + Fundamentos Teóricos (121 fichas)',
  url: QX('/mis-clases/biblioteca'), fuente: 'QX · Biblioteca',
};

// Manuales Theomed por área (respaldo de consulta puntual, NO lectura lineal)
export const ENCAPS_MANUALES_THEOMED: Record<string, Resumen> = {
  'Salud Pública': { label: 'Manual de Salud Pública', url: TH('18983'), fuente: 'Theomed · manual' },
  'Cuidado Integral': { label: 'Manual de Cuidado Integral', url: TH('19043'), fuente: 'Theomed · manual' },
  'Ética e Interculturalidad': { label: 'Manual de Ética e Interculturalidad', url: TH('19102'), fuente: 'Theomed · manual' },
  'Investigación': { label: 'Manual de Investigación', url: TH('19136'), fuente: 'Theomed · manual' },
  'Gestión de Servicios': { label: 'Manual de Gestión', url: TH('19164'), fuente: 'Theomed · manual' },
};

export const ENCAPS_RESUMENES_META = {
  fuente: 'QX Medic (aula virtual) + Theomed campus (curso 73: 47 secciones · cursos 37 y 89)',
  scrape: '2026-07-19 (apartado por apartado, logueado)',
  nota: 'MÉTODO BANQUEO. (1) BANCOS: App Banqueo QX + QX Banqueo/Simulacros/Eval avanzada + Theomed BANCO DE PREGUNTAS + BANCO MEDICINA 2026 + FLASHCARDS + cursos 37/89. (2) POSTESTS: 50 quizzes con link directo por área (SP 17, CI 13, Gestión 12, Ética 5, Inv 3) = banco por tema. (3) MAPAS: 42 en video (catálogo QX 163) + PDFs compilados por área + Biblioteca QX (18 mapas). (4) RESÚMENES/THEOPEPAS + REPASO CI. Theomed tiene además NORMAS TÉCNICAS (30 carpetas NTS por tema, sección 2267) y manuales por área. Secciones REPASOS/BANQUEOS por área aún vacías (Fase 3 pendiente de publicar) → re-escanear.',
};
