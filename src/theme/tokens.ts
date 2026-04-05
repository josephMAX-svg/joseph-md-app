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
  section: 20, // spacing-6 equivalent (1.3rem ≈ 20px)
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
} as const;

// Metric gradient colors
export const MetricColors: Record<string, string> = {
  tarjetas: Colors.teal,
  deepWork: Colors.amber,
  dominio: Colors.blue,
  publicaciones: Colors.green,
} as const;

export type ColorKey = keyof typeof Colors;
