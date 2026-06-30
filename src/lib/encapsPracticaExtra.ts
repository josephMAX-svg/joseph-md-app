// encapsPracticaExtra.ts — Recursos de PREGUNTAS/PRÁCTICA extra verificados EN VIVO (1-jul, logueado).
// Theomed (cursos) + Google Drive DR LOPEZ (subcarpetas reales). Se renderizan en itemsForDay como
// "🎯 Práctica extra" para los días deep_prime (banco del tema) y repaso (arsenal completo de preguntas).
// Honra el pedido de Joseph: más preguntas por día, nada de las fuentes queda fuera.
export interface PracticaItem { label: string; url: string; min: number; tipo: 'kahoot' | 'simulacro' | 'banco' | 'normativa' }

// Theomed — cursos verificados (campus.academiatheomed.com · logueado)
export const ENCAPS_THEOMED_KAHOOT: PracticaItem = { label: '😬 Kahoots Theomed (preguntas gamificadas)', url: 'https://campus.academiatheomed.com/course/view.php?id=89', min: 15, tipo: 'kahoot' };
export const ENCAPS_THEOMED_SIMULACROS: PracticaItem = { label: '📝 Simulacros Theomed', url: 'https://campus.academiatheomed.com/course/view.php?id=37', min: 60, tipo: 'simulacro' };
export const ENCAPS_THEOMED_BANQUEO: PracticaItem = { label: '🏦 Banqueos + Repasos Theomed (curso regular)', url: 'https://campus.academiatheomed.com/course/view.php?id=73', min: 20, tipo: 'banco' };

// Google Drive — DR LOPEZ subcarpetas (IDs reales capturados en vivo)
export const ENCAPS_DRIVE_NORMATIVAS: PracticaItem = { label: '📈 Normativas DR LOPEZ (Drive)', url: 'https://drive.google.com/drive/u/4/folders/1YdyhemfujHYIROcBcr9G9avUYulqfpko', min: 15, tipo: 'normativa' };
export const ENCAPS_DRIVE_SIMULACROS: PracticaItem = { label: '📝 Simulacros DR LOPEZ (Drive)', url: 'https://drive.google.com/drive/u/4/folders/1Svt1JyDTunsfOYUI8ochTEYW6NzynsBH', min: 30, tipo: 'simulacro' };
export const ENCAPS_DRIVE_KAHOOT: PracticaItem = { label: '😬 Kahoot DR LOPEZ (Drive)', url: 'https://drive.google.com/drive/u/4/folders/1qPY0rwPDsUZhIJfIyaL1z76W69YGUlFO', min: 15, tipo: 'kahoot' };

// Set para días de TEMA (deep_prime): banco/kahoot ligero del día.
export const PRACTICA_DEEP_PRIME: PracticaItem[] = [ENCAPS_THEOMED_KAHOOT, ENCAPS_DRIVE_SIMULACROS];
// Set para días de REPASO/PREGUNTAS: arsenal completo (más preguntas por día).
export const PRACTICA_REPASO: PracticaItem[] = [
  ENCAPS_THEOMED_SIMULACROS, ENCAPS_THEOMED_KAHOOT, ENCAPS_THEOMED_BANQUEO,
  ENCAPS_DRIVE_SIMULACROS, ENCAPS_DRIVE_NORMATIVAS, ENCAPS_DRIVE_KAHOOT,
];
