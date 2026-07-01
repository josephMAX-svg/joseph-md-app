/**
 * researchTheme.ts — FUENTE DE VERDAD VISUAL de la sección Research (cuaderno de laboratorio editorial).
 * ──────────────────────────────────────────────────────────────────────────────────────────────────
 * Metáfora: research desk de una revista científica (Elicit / Nature / NEJM / Overleaf). Papel = zafiro,
 * texto platino, tipografía SERIF editorial para títulos/objetivos/nombres de línea, sans para datos.
 * Acento de segmento = teal apagado (#6BB8B0, token) + ORO champagne (#C8A96A) como capa de ESTATUS
 * (el manuscrito, los sellos de gate HITL aprobado, SUBMIT, el PIP counter).
 *
 * Este módulo centraliza:
 *   1) La familia serif + su carga vía <link>/@font-face en web (una sola vez).
 *   2) Los colores de FASE (R0–R8) y de ESTADO de agente en JOYA APAGADA (mapeados a tokens),
 *      para que researchDailyPlan / researchProgram / los 4 componentes lean UN solo punto de verdad
 *      en vez de duplicar hex neón (#0FD4A0 · #F56342 · #F5A623 · #2E7CF6).
 *
 * Regla: NADA fosforescente. Migración: #0FD4A0→teal · #2E7CF6→sapphire · #F5A623→brass · #F56342→coral.
 * (No editamos tokens.ts — importamos de él; este archivo vive dentro de la carpeta del segmento.)
 */
import { Platform } from 'react-native';
import { Colors } from '../../theme/tokens';

// ── 1) Tipografía editorial ──────────────────────────────────────────────────────────────────────
// Serif de revista para lectura en pantalla (Source Serif 4 · Adobe/Google Fonts, humanista, pareja
// natural del sans del sistema — modelo NEJM: serif para títulos, sans para labels/números).
// En web se carga por <link> a Google Fonts (una sola vez). En native no hay fuente custom cargada →
// degradamos a la serif del sistema con un stack ('Georgia'…), que sigue leyéndose editorial.
export const ResearchFonts = {
  serif:
    Platform.OS === 'web'
      ? ('"Source Serif 4", "Source Serif Pro", Georgia, "Times New Roman", serif' as string)
      : ('Georgia' as string),
  // El cuerpo/labels/números siguen en la sans del sistema (undefined = System en RN).
  sans: undefined as undefined | string,
};

/** Inyecta el <link> de la serif editorial una sola vez (web). Idempotente; no-op en native. */
export function ensureResearchFonts(): void {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  const id = 'research-editorial-fonts';
  if (document.getElementById(id)) return;
  try {
    const pre1 = document.createElement('link');
    pre1.rel = 'preconnect';
    pre1.href = 'https://fonts.googleapis.com';
    const pre2 = document.createElement('link');
    pre2.rel = 'preconnect';
    pre2.href = 'https://fonts.gstatic.com';
    (pre2 as any).crossOrigin = 'anonymous';
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400&display=swap';
    document.head.appendChild(pre1);
    document.head.appendChild(pre2);
    document.head.appendChild(link);
  } catch {
    /* noop */
  }
}

/** Estilos serif listos para usar (títulos/objetivos/nombres de línea). */
export const serifTitle = { fontFamily: ResearchFonts.serif } as any;
export const serifItalic = { fontFamily: ResearchFonts.serif, fontStyle: 'italic' as const } as any;

// ── 2) Paleta editorial (joya apagada, sobre papel zafiro) ────────────────────────────────────────
export const InkColors = {
  paper: Colors.surface, //           #0A0F1C  — "papel" del cuaderno
  paperRaised: Colors.surfaceContainerLow, // #0F1626
  ink: Colors.onSurface, //           #E7EAF2  — texto platino
  inkDim: Colors.onSurfaceVariant, // #A9B0C0
  inkMute: Colors.muted, //           #7C8496
  rule: 'rgba(231,234,242,0.10)', //  reglado de cuaderno (hairline)
  ruleSoft: 'rgba(231,234,242,0.06)',
  teal: Colors.teal, //               #6BB8B0  — acento de segmento (era #0FD4A0)
  gold: Colors.gold, //               #C8A96A  — capa de ESTATUS (manuscrito/sellos/SUBMIT/PIP)
  goldSoft: Colors.champagne, //      #D8BE86
  sapphire: Colors.blue, //           #4F7DD6  — en cola (era #2E7CF6)
  brass: Colors.brass, //             #B8934E  — en curso (era #F5A623)
  coral: Colors.coral, //             #C56A5A  — crítica/bloqueo (era #F56342)
  jade: Colors.green, //              #5FA88C  — hecho
  amethyst: Colors.purple, //         #9A7BC8  — Obsidian / meta-análisis
  periwinkle: '#7C83D6', //           anclas / referencias secundarias
} as const;

/** Obsidian (◆) — amatista apagada, coherente con Derma. Antes '#A78BFA' (neón). */
export const OBSIDIAN = Colors.purple;

// ── 3) Estados del pipeline / agente (joya apagada) ───────────────────────────────────────────────
// mapea 1:1 los estados a color, sin hex saturado.
export const STATE_COLOR = {
  critica: InkColors.coral, //   bloqueo / crítica
  encurso: InkColors.brass, //   en curso (redactando)
  cola: InkColors.sapphire, //   en cola
  hecho: InkColors.jade, //      hecho / listo
  idle: InkColors.inkMute, //    inactivo
} as const;
