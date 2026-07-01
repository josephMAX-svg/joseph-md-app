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

// ─────────────────────────────────────────────────────────────────────────────
// BLINDAJE >17/20 — sets añadidos (01-jul) para cerrar los 3 huecos del pronóstico
// walk-forward v2: (1) el examen viró a ~90% VIÑETA CLÍNICA → falta práctica de casos
// ponderada por rentabilidad; (2) Gestión (V, ~23%) sub-cubierta por fichas → reforzar
// por Normas Técnicas; (3) clúster medicamentos (~6-12%) disperso → V-MED con banco propio.
// SOLO enriquecen contenido (data/consts): NO tocan fechas, item_key, motor ni Supabase.
// URLs reutilizadas de fuentes ya verificadas en vivo (Theomed/Drive DR LOPEZ · logueado).

// (1) Banco de VIÑETAS CLÍNICAS ponderado por rentabilidad (mezcla II 34/I 27/V 23/III 13/IV 3).
// Entrenar reconocimiento/conducta tipo SERUMS (caso + 4 opciones), no teoría plana.
export const ENCAPS_VINETA_PONDERADA: PracticaItem = { label: '▲ Viñetas clínicas ponderadas (II 34·I 27·V 23·III 13·IV 3)', url: 'https://campus.academiatheomed.com/course/view.php?id=37', min: 45, tipo: 'simulacro' };
export const ENCAPS_VINETA_QX_TENDENCIAS: PracticaItem = { label: '▲ Casos por tendencia QX (mix real /400 por sub-tema)', url: 'https://qxmedic-aulavirtual.com/evaluaciones', min: 30, tipo: 'simulacro' };

// (2) Refuerzo GESTIÓN (V) por Normas Técnicas — no por ficha. Punto ciego de V-2.
// POI/PEI (definición normativa CEPLAN), ciclo de planeamiento, categorización EESS/UPSS,
// referencia por nivel, residuos/bioseguridad. Fuente: NT + Normativas DR LOPEZ (Drive).
export const ENCAPS_GESTION_NORMAS: PracticaItem = { label: '◆ Gestión (V) · Normas Técnicas — POI/PEI/CEPLAN/categorización EESS', url: 'https://drive.google.com/drive/u/4/folders/1YdyhemfujHYIROcBcr9G9avUYulqfpko', min: 25, tipo: 'normativa' };
export const ENCAPS_GESTION_BANQUEO: PracticaItem = { label: '◆ Banqueo Gestión (V-2 planeamiento) — Theomed regular', url: 'https://campus.academiatheomed.com/course/view.php?id=73', min: 20, tipo: 'banco' };

// (3) Clúster nuevo V-MED (gestión de medicamentos) — banco propio.
// Farmacovigilancia/RAM, URM/resistencia, DIGEMID/SISMED/PNUME, cadena de frío 2-8°C, vencidos.
export const ENCAPS_VMED_NORMAS: PracticaItem = { label: '◆ V-MED · SISMED/PNUME/DIGEMID + cadena de frío (Normas)', url: 'https://drive.google.com/drive/u/4/folders/1YdyhemfujHYIROcBcr9G9avUYulqfpko', min: 20, tipo: 'normativa' };
export const ENCAPS_VMED_BANQUEO: PracticaItem = { label: '◆ V-MED · Farmacovigilancia/RAM/URM — banqueo', url: 'https://campus.academiatheomed.com/course/view.php?id=73', min: 15, tipo: 'banco' };

// (4) Set dirigido a EMERGENTES con ficha nueva (señal adelantada): II-3, II-11, II-9, III-9.
// Convertir teoría en preguntas de conducta antes del examen.
export const ENCAPS_EMERGENTES: PracticaItem = { label: '▲ Emergentes: II-3 vacunas · II-11 ITS dual · II-9 salud mental · III-9 HC/SUSALUD', url: 'https://campus.academiatheomed.com/course/view.php?id=89', min: 20, tipo: 'kahoot' };

// (5) DES-PRIORIZACIÓN de Investigación (IV) — contingencia mínima, no deep-work.
// IV colapsó a 3-4% pese a 20 videoclases + 4 banqueos: evitar la trampa de horas.
export const ENCAPS_IV_CONTINGENCIA: PracticaItem = { label: '▪ Investigación (IV) · repaso de CONTINGENCIA mínima (no sobre-invertir)', url: 'https://drive.google.com/drive/u/4/folders/1Svt1JyDTunsfOYUI8ochTEYW6NzynsBH', min: 10, tipo: 'banco' };

// Set para días de TEMA (deep_prime): banco/kahoot ligero del día.
// IMPORTANTE: los 2 primeros ítems se MANTIENEN en su posición original (índices 0,1) para no
// mover los item_key `D{N}:practica:{i}` que el daemon de Telegram ya persiste. El blindaje
// (viñeta ponderada + emergentes) se APÉNDA al final → índices nuevos, cero drift de keys.
export const PRACTICA_DEEP_PRIME: PracticaItem[] = [
  ENCAPS_THEOMED_KAHOOT, ENCAPS_DRIVE_SIMULACROS,           // 0,1 — originales (NO mover)
  ENCAPS_VINETA_PONDERADA, ENCAPS_EMERGENTES,               // 2,3 — blindaje (append)
];
// Set para días de REPASO/PREGUNTAS: arsenal completo (más preguntas por día).
// Los 6 primeros ítems se MANTIENEN en su orden original (índices 0..5); el blindaje se apénda.
export const PRACTICA_REPASO: PracticaItem[] = [
  ENCAPS_THEOMED_SIMULACROS, ENCAPS_THEOMED_KAHOOT, ENCAPS_THEOMED_BANQUEO,   // 0,1,2 — originales
  ENCAPS_DRIVE_SIMULACROS, ENCAPS_DRIVE_NORMATIVAS, ENCAPS_DRIVE_KAHOOT,      // 3,4,5 — originales
  // ── blindaje >17/20 (append · índices 6+) ──
  ENCAPS_VINETA_PONDERADA, ENCAPS_VINETA_QX_TENDENCIAS,
  ENCAPS_GESTION_NORMAS, ENCAPS_GESTION_BANQUEO,
  ENCAPS_VMED_NORMAS, ENCAPS_VMED_BANQUEO,
  ENCAPS_EMERGENTES, ENCAPS_IV_CONTINGENCIA,
];
