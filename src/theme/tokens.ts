/**
 * Joseph MD — Clinical Precision Design Tokens
 * Premium Design System v2.0
 * Extracted from Stitch MCP Design System "Clinical Precision"
 * Asset: assets/5d883d3d628b42178d535b93eb8a3a27
 */

export const Colors = {
  // Surface Hierarchy (Dark Navy Bedrock)
  surface: '#081325',
  surfaceDim: '#081325',
  surfaceContainerLowest: '#040E20',
  surfaceContainerLow: '#111C2E',
  surfaceContainer: '#152032',
  surfaceContainerHigh: '#202A3D',
  surfaceContainerHighest: '#2B3548',
  surfaceBright: '#2F394D',

  // Primary & Text
  primary: '#BCC7DF',
  primaryContainer: '#0B1628',
  onSurface: '#D8E3FC',
  onSurfaceVariant: '#C5C6CD',
  onPrimary: '#263144',
  outline: '#8F9097',
  outlineVariant: '#45474C',

  // Secondary (Teal System)
  secondary: '#52DAD7',
  secondaryContainer: '#00B0AE',
  onSecondary: '#003736',

  // Tertiary (Coral System)
  tertiary: '#FFB3B0',
  tertiaryContainer: '#360004',
  onTertiary: '#68000F',

  // Error
  error: '#FFB4AB',
  errorContainer: '#93000A',
  onError: '#690005',

  // Inverse
  inverseSurface: '#D8E3FC',
  inverseOnSurface: '#263144',
  inversePrimary: '#545F74',

  // App-Specific Accents
  blue: '#2E7CF6',
  teal: '#0FD4A0',
  amber: '#F5A623',
  coral: '#F56342',
  purple: '#8B5CF6',
  green: '#10B981',

  // Utility
  white: '#D8E3FC',
  muted: '#8F9097',
  transparent: 'transparent',

  // Premium Design System v2
  sectionHeader: '#8899AA',
  bodyText: '#D8E3FC',
  smallLabel: '#6B7C93',
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

// Sidebar accent colors per nav item
export const SidebarAccents: Record<string, string> = {
  Home: Colors.teal,
  Estudio: Colors.blue,
  Derma: Colors.purple,
  Empresa: Colors.amber,
  'Investigación': Colors.teal,
  Vitals: Colors.green,
  Synapse: '#818CF8', // índigo neural — formación élite en IA
} as const;

// Metric gradient colors
export const MetricColors: Record<string, string> = {
  tarjetas: Colors.teal,
  deepWork: Colors.amber,
  dominio: Colors.blue,
  publicaciones: Colors.green,
} as const;

// ─── Premium Design System v3 (2026) — ADITIVO, no rompe la API existente ───
// Referentes: Linear · Vercel · Stripe · Arc · Family · Things. Profundidad por sombra
// suave + hairlines de baja opacidad + micro-motion. RN-web mapea shadow* → boxShadow.

// Elevation — sombras suaves en capas (depth = "élite"). Úsalo en cards/botones flotantes.
export const Elevation = {
  none: {},
  sm: { shadowColor: '#00040D', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.20, shadowRadius: 3, elevation: 2 },
  md: { shadowColor: '#00040D', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.28, shadowRadius: 12, elevation: 6 },
  lg: { shadowColor: '#00040D', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.34, shadowRadius: 28, elevation: 14 },
  glow: (c: string) => ({ shadowColor: c, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 18, elevation: 10 }),
} as const;

// Hairline — definición 1px de baja opacidad (premium, sutil). Complementa el no-line.
export const Hairline = {
  soft: 'rgba(216, 227, 252, 0.06)',
  medium: 'rgba(216, 227, 252, 0.10)',
  strong: 'rgba(216, 227, 252, 0.16)',
  accentSoft: 'rgba(82, 218, 215, 0.18)',
} as const;

// Motion — tokens de transición para web (RN-web respeta `transition` en style).
export const Motion = {
  fast: '120ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '320ms cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

// Gradients — pares de acento (para LinearGradient / fondos web).
export const Gradients = {
  teal: ['#22E3C4', '#00B0AE'],
  blue: ['#3B82F6', '#6366F1'],
  amber: ['#FBBF24', '#F97316'],
  purple: ['#A78BFA', '#6366F1'],
  coral: ['#FB7185', '#F43F5E'],
  green: ['#34D399', '#10B981'],
  indigo: ['#818CF8', '#4F46E5'],
  surface: ['#152032', '#0B1628'],
  hero: ['#0FD4A0', '#00B0AE'],
} as const;

// Escala de line-height coherente con FontSize (ritmo tipográfico élite).
export const LineHeight = {
  displaySm: 40, headlineLg: 38, headlineSm: 30, titleLg: 28,
  titleMd: 24, bodyLg: 24, bodyMd: 21, labelLg: 20, labelMd: 16, labelSm: 15,
} as const;

export type ColorKey = keyof typeof Colors;
