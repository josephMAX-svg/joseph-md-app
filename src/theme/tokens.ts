/**
 * Joseph MD — Design Tokens
 * Design System v4 (2026) — "Midnight Sapphire & Champagne Gold"
 * Quiet-luxury palette: deep desaturated sapphire bedrock, warm platinum text,
 * champagne-gold signature accent, muted jewel-tone segment accents. NO neon.
 * Referentes: private-bank / editorial / Rolex / Aesop restraint.
 */

export const Colors = {
  // ── Surface Hierarchy — Midnight Sapphire bedrock (deep, desaturated, warm-black)
  surface: '#0A0F1C',
  surfaceDim: '#070B15',
  surfaceContainerLowest: '#060A14',
  surfaceContainerLow: '#0F1626',
  surfaceContainer: '#141C2E',
  surfaceContainerHigh: '#1C2438',
  surfaceContainerHighest: '#262F45',
  surfaceBright: '#2E3850',

  // ── Primary & Text — warm platinum (less blue, more status)
  primary: '#C6CDDB',
  primaryContainer: '#0B1220',
  onSurface: '#E7EAF2',
  onSurfaceVariant: '#A9B0C0',
  onPrimary: '#1A2233',
  outline: '#7C8496',
  outlineVariant: '#3A4256',

  // ── Secondary (muted teal — the brand's calm, not neon)
  secondary: '#6BB8B0',
  secondaryContainer: '#2E6E6B',
  onSecondary: '#05201F',

  // ── Tertiary (muted terracotta)
  tertiary: '#D9A79C',
  tertiaryContainer: '#3A1E18',
  onTertiary: '#3A140C',

  // ── Error (muted, still legible)
  error: '#E0908A',
  errorContainer: '#5E211C',
  onError: '#2A0A08',

  // ── Inverse
  inverseSurface: '#E7EAF2',
  inverseOnSurface: '#1A2233',
  inversePrimary: '#4A536B',

  // ── App-Specific Accents — muted jewel tones (sophisticated, non-fluorescent)
  blue: '#4F7DD6',    // sapphire (Study/ENCAPS)
  teal: '#6BB8B0',    // muted teal (Home / Research base)
  amber: '#C8A96A',   // champagne gold (Business signature)
  coral: '#C56A5A',   // terracotta
  purple: '#9A7BC8',  // amethyst (Derma)
  green: '#5FA88C',   // jade (Vitals)

  // ── Signature metals (the "status" layer)
  gold: '#C8A96A',        // champagne gold — signature accent
  champagne: '#D8BE86',   // lighter gold (highlights, gradients)
  brass: '#B8934E',       // deeper brass (Business, depth)

  // ── Utility
  white: '#E7EAF2',
  muted: '#7C8496',
  transparent: 'transparent',

  // ── v2 aliases (kept for API compatibility)
  sectionHeader: '#8A93A6',
  bodyText: '#E7EAF2',
  smallLabel: '#6A7488',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  section: 12, // Tight card gap — cards feel connected, not floating
} as const;

export const FontSize = {
  displaySm: 36,   // 2.25rem — metric numbers
  headlineLg: 32,   // 2rem — page titles
  headlineSm: 24,   // 1.5rem
  titleLg: 22,
  titleMd: 18,      // card titles
  bodyLg: 16,
  bodyMd: 14,       // 0.875rem — body text
  labelLg: 14,      // section headers
  labelMd: 12,      // 0.75rem — small labels
  labelSm: 11,      // 0.6875rem
} as const;

export const BorderRadius = {
  sm: 4,
  md: 6,    // ROUND_FOUR (0.375rem)
  lg: 10,
  xl: 16,   // Glassmorphism cards
  '2xl': 20,
  full: 999,
} as const;

// Sidebar accent colors per nav item — distinct muted jewel per segment.
export const SidebarAccents: Record<string, string> = {
  Home: Colors.gold,            // command center → champagne gold (signature)
  Estudio: Colors.blue,         // sapphire
  Derma: Colors.purple,         // amethyst
  Empresa: Colors.brass,        // deep brass (money)
  'Investigación': Colors.teal, // muted teal
  Vitals: Colors.green,         // jade
  Synapse: '#7C83D6',           // periwinkle — formación élite en IA
} as const;

// Metric gradient colors
export const MetricColors: Record<string, string> = {
  tarjetas: Colors.teal,
  deepWork: Colors.gold,
  dominio: Colors.blue,
  publicaciones: Colors.green,
} as const;

// ─── Premium Design System v3 (depth) — ADITIVO, no rompe la API existente ───
// Profundidad por sombra suave + hairlines de baja opacidad + micro-motion.
// RN-web mapea shadow* → boxShadow.

// Elevation — sombras suaves en capas (depth = "élite"). Úsalo en cards/botones flotantes.
export const Elevation = {
  none: {},
  sm: { shadowColor: '#00030A', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 3, elevation: 2 },
  md: { shadowColor: '#00030A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.32, shadowRadius: 14, elevation: 6 },
  lg: { shadowColor: '#00030A', shadowOffset: { width: 0, height: 14 }, shadowOpacity: 0.40, shadowRadius: 32, elevation: 16 },
  glow: (c: string) => ({ shadowColor: c, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.45, shadowRadius: 18, elevation: 10 }),
} as const;

// Hairline — definición 1px de baja opacidad (premium, sutil). Warm platinum base.
export const Hairline = {
  soft: 'rgba(231, 234, 242, 0.06)',
  medium: 'rgba(231, 234, 242, 0.10)',
  strong: 'rgba(231, 234, 242, 0.16)',
  accentSoft: 'rgba(200, 169, 106, 0.20)', // champagne-gold hairline
} as const;

// Motion — tokens de transición para web (RN-web respeta `transition` en style).
export const Motion = {
  fast: '120ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '320ms cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

// Gradients — pares de acento MUTED (para LinearGradient / fondos web).
export const Gradients = {
  teal: ['#7FC6BE', '#4A8F8C'],
  blue: ['#6B93E0', '#3E63B8'],
  amber: ['#D8BE86', '#B8934E'],   // champagne → brass (gold)
  purple: ['#B49AD6', '#6E5AA0'],
  coral: ['#D98B7E', '#B45444'],
  green: ['#7FBFA6', '#4A8F76'],
  indigo: ['#8E96DE', '#5A63B0'],
  surface: ['#141C2E', '#0A0F1C'],
  hero: ['#D8BE86', '#C8A96A'],    // gold hero
  gold: ['#D8BE86', '#B8934E'],    // signature gold gradient
} as const;

// Escala de line-height coherente con FontSize (ritmo tipográfico élite).
export const LineHeight = {
  displaySm: 40, headlineLg: 38, headlineSm: 30, titleLg: 28,
  titleMd: 24, bodyLg: 24, bodyMd: 21, labelLg: 20, labelMd: 16, labelSm: 15,
} as const;

export type ColorKey = keyof typeof Colors;
