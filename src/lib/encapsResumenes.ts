// encapsResumenes.ts — RESÚMENES DE FASE 2 (Theomed THEOPEPAS/Resúmenes + López) por código ENCAPS.
// Joseph los PRIORIZA sobre las sesiones en vivo / videos largos (Fase 1): son material ya digerido que
// agiliza la incorporación de conocimiento. En el plan diario van PRIMERO; el video largo queda de respaldo
// si sobra tiempo. Se re-escrapean de Theomed campus (curso 73) a medida que publican más (Fase 2 en curso).
// Fuente: campus.academiatheomed.com/mod/resource/view.php?id=NNN (verificado logueado 10-jul-2026).
export type Resumen = { label: string; url: string; fuente: string };
const TH = (id: string) => `https://campus.academiatheomed.com/mod/resource/view.php?id=${id}`;

export const ENCAPS_THEOMED_RESUMENES: Record<string, Resumen[]> = {
  'I-3': [
    { label: 'THEOPEPAS Salud Pública (resumen integral · Premio Kahoot)', url: TH('23089'), fuente: 'Theomed · THEOPEPA' },
    { label: 'Resumen Enfermedades Endémicas', url: TH('23157'), fuente: 'Theomed · resumen' },
    { label: 'Ejemplos Cadena Epidemiológica', url: TH('22465'), fuente: 'Theomed · ejemplos' },
  ],
  'I-4': [
    { label: 'Resumen Definiciones de Caso en Vigilancia Epidemiológica', url: TH('23219'), fuente: 'Theomed · resumen' },
  ],
  'I-2': [
    { label: 'Resumen FESP MINSA (21/05/26)', url: TH('20518'), fuente: 'Theomed · resumen' },
  ],
  'II-5': [
    { label: 'Resumen MCI (Modelo de Cuidado Integral)', url: TH('19281'), fuente: 'Theomed · resumen' },
  ],
};

// ── 🎯 BANCOS DE PREGUNTAS (el CENTRO del método banqueo, Joseph 19-jul) ──────────────────────────
// Verificado logueado 19-jul-2026 en QX Medic + Theomed. Estos van PRIMERO en el día: se banquea, y
// recién después se revisa el mapa conceptual del tema. Palmerton: ciegas → clave → recalibrar.
export const ENCAPS_BANCOS: Resumen[] = [
  { label: '⭐ App BANQUEO QX (banco principal de preguntas)', url: 'https://qxmedic-aulavirtual.com/evaluaciones/banqueapp', fuente: 'QX · App Banqueo' },
  { label: 'Evaluaciones QX (simulacros y exámenes por bloque)', url: 'https://qxmedic-aulavirtual.com/evaluaciones', fuente: 'QX · Evaluaciones' },
  { label: 'SIMULACROS MEDICINA (Theomed, curso completo)', url: 'https://campus.academiatheomed.com/course/view.php?id=37', fuente: 'Theomed · Simulacros' },
  { label: 'KAHOOTS 2026-2 (Theomed, preguntas rápidas por sesión)', url: 'https://campus.academiatheomed.com/course/view.php?id=89', fuente: 'Theomed · Kahoots' },
];

// ── 🗺️ PDFs de MAPAS CONCEPTUALES por área (QX, compilados) ──────────────────────────────────────
// Complementan los mapas en video: el PDF permite repasar el área entera de un vistazo.
export const ENCAPS_MAPAS_PDF: Record<string, Resumen> = {
  'Salud Pública': { label: 'PDF Mapas Conceptuales · Salud Pública', url: 'https://www.dropbox.com/scl/fi/q01p4yyacsbu4mzrprhsg/SERUMS-2026-I-MAPAS-CONCEPTUALES-SALUD-P-BLICA.pdf?rlkey=tgqi3hq49orkc5rsxyxapib6x&st=elawp8hm&dl=0', fuente: 'QX · PDF mapas' },
  'Cuidado Integral': { label: 'PDF Mapas Conceptuales · Cuidado Integral', url: 'https://www.dropbox.com/scl/fi/sct5jgdylbcptufy5g9y4/MAPAS-CONCEPTUALES-CUIDADO-INTEGRAL.pdf?rlkey=romw7o4en2llzn4262srwkz5t&st=h3rpy4zv&dl=0', fuente: 'QX · PDF mapas' },
  'Ética e Interculturalidad': { label: 'PDF Mapas Conceptuales · Ética e Interculturalidad', url: 'https://www.dropbox.com/scl/fi/6fu4m71ufdcobpcrb10fx/MAPAS-CONCEPTUALES-TICA-E-INTERCULTURALIDAD.pdf?rlkey=ggsk0wi57kqrnpvkr4d6nwi48&dl=0', fuente: 'QX · PDF mapas' },
};

export const ENCAPS_RESUMENES_META = {
  fuente: 'QX Medic (aula virtual) + Theomed campus (cursos 73/37/89)',
  scrape: '2026-07-19',
  nota: 'MÉTODO BANQUEO: (1) BANCOS = App Banqueo QX + Evaluaciones QX + Simulacros/Kahoots Theomed → se banquea PRIMERO; (2) MAPAS CONCEPTUALES QX (42 en catálogo de 163 videos; CI soltó 25 el 19-jul → los críticos II-1/II-3/II-11/II-10/II-4/II-2 YA tienen mapa) en la cola vía --maps-only; (3) resúmenes/THEOPEPAS Theomed + PDFs de mapas por área. Los videos generales largos quedan FUERA del plan diario (referencia en CoberturaCard). Re-escrapear QX/Theomed a medida que publiquen (GE/INV aún sin mapas).',
};
