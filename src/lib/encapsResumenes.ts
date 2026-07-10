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

export const ENCAPS_RESUMENES_META = {
  fuente: 'Theomed campus curso 73 (Medicina Regular GP1 2026-II)',
  scrape: '2026-07-10',
  nota: 'Fase 2 = resúmenes/THEOPEPAS ya digeridos → prioridad sobre sesión en vivo (Fase 1). QX SP también publica MAPAS CONCEPTUALES (priorizados en la cola vía merge_qx_live.js). López: compendio de área = su resumen Fase 2, ya enlazado (ENCAPS_COMPENDIO). Re-escrapear Theomed a medida que publiquen más resúmenes por sesión.',
};
