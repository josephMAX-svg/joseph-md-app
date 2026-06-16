/**
 * aurumTheme.ts — FUENTE DE VERDAD VISUAL de la sección AURUM (closer de élite).
 * ──────────────────────────────────────────────────────────────────────────
 * Todo el aspecto de AURUM (colores, gradientes, radios, espaciado, tipografía,
 * sombras) vive AQUÍ. Los componentes (AurumHub.tsx, AurumTodayPlan.tsx) NO deben
 * tener un solo color hardcodeado: importan estos tokens. Cambiar el look completo
 * de la sección = editar este archivo en 1 línea.
 *
 * Estética: navy profundo + oro (acquisition.com / Alex Hormozi). Alto contraste,
 * mucho aire, jerarquía clarísima, sensación de autoridad. Hermano cromático de
 * Qori Golden dentro del ecosistema Pulso.
 *
 * Para cambiar el acento de toda la sección: edita `AurumColors.gold` (y, si
 * quieres, `goldDeep`/`goldSoft`). Para cambiar el fondo del HERO: edita
 * `AurumGradients.hero`. El resto se recalcula solo vía los helpers `withAlpha`.
 */

// ── Helpers de color ────────────────────────────────────────────────────────
/** Aplica un alpha (0..1) a un hex #RRGGBB → devuelve #RRGGBBAA. */
export function withAlpha(hex: string, alpha: number): string {
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${a}`;
}

// ── 1) Colores ───────────────────────────────────────────────────────────────
// Una sola paleta. Cambia `gold` y toda la sección cambia de acento.
export const AurumColors = {
  // Superficies (navy bedrock — más profundo que el resto de la app para dar peso)
  bg: '#070D1A',            // fondo base de la sección
  bgElevated: '#0B1424',    // paneles sobre el fondo
  surface: '#101B30',       // tarjetas
  surfaceAlt: '#16233C',    // tarjetas alternas / hover

  // Oro AURUM — el acento de autoridad (hermano de Qori Golden)
  gold: '#C9A227',          // acento principal (botones, números, bordes activos)
  goldSoft: '#E6C868',      // oro claro (texto sobre navy, brillos)
  goldDeep: '#8A6D14',      // oro profundo (sombras de oro, degradados)

  // Texto
  text: '#F3F6FF',          // titulares (casi blanco, alto contraste)
  textDim: '#C7D0E4',       // cuerpo
  textMute: '#8794AE',      // labels, metadatos
  onGold: '#1A1505',        // texto SOBRE relleno oro (navy casi negro, legible)

  // Bordes
  border: 'rgba(255,255,255,0.10)',
  borderSoft: 'rgba(255,255,255,0.05)',

  // Estado
  success: '#10B981',       // verde — hecho / verificado
  warn: '#F5A623',          // ámbar — atención / verifica
  danger: '#F56342',        // coral — riesgo / incierto

  // Acentos por tipo de bloque del día
  coreAccent: '#C9A227',    // núcleo (A · ver) → oro
  pracAccent: '#F56342',    // práctica (PRAC · drill) → coral (la "caja negra")
  lecturaAccent: '#4A90E2', // lectura/audio (L) → azul (huecos de viaje)

  // Morado Obsidian (compartido con el resto de planes — ◆)
  obsidian: '#A78BFA',
} as const;

export type AurumColorKey = keyof typeof AurumColors;

// ── 2) Gradientes (arrays [from, to] para LinearGradient o helper aurumGrad) ──
// En esta app no hay expo-linear-gradient: el HERO usa CSS linear-gradient en web
// (ver AurumHero) y backgroundColor en native. Estos arrays son la fuente única.
export const AurumGradients = {
  hero: ['#2A2210', '#0A1424'],            // navy → oro tostado (cabecera)
  heroGlow: ['#3A2E12', '#0B1424'],        // variante con más brillo de oro
  card: ['#13203A', '#0C1526'],            // tarjeta elevada
  goldSheen: ['#E6C868', '#C9A227', '#8A6D14'], // brillo metálico del wordmark / barras
  pracCard: ['#2A1410', '#0C1526'],        // tarjeta de práctica (coral tostado)
} as const;

export type AurumGradientKey = keyof typeof AurumGradients;

/** Devuelve el array de colores de un gradiente nombrado (para LinearGradient
 *  si algún día se instala, o para construir el `linear-gradient(...)` CSS). */
export function aurumGrad(name: AurumGradientKey): readonly string[] {
  return AurumGradients[name];
}

/** Construye un string CSS `linear-gradient(...)` desde un gradiente nombrado.
 *  Útil en web (backgroundImage). `angle` en grados, por defecto 135. */
export function aurumGradCss(name: AurumGradientKey, angle = 135): string {
  const stops = AurumGradients[name];
  return `linear-gradient(${angle}deg, ${stops.join(', ')})`;
}

// ── 3) Radios ────────────────────────────────────────────────────────────────
export const AurumRadius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

// ── 4) Espaciado (escala 4pt) ─────────────────────────────────────────────────
export const AurumSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  '2xl': 30,
  '3xl': 40,
} as const;

// ── 5) Tipografía (familias + tamaños + pesos por rol) ────────────────────────
// `display` = wordmark/megacifras · `title` = titulares de tarjeta · `body` ·
// `caption` = labels. Pesos como strings RN ('800' etc.).
export const AurumType = {
  // En RN no hay font-family custom cargada: usamos la del sistema (undefined =
  // System). Si algún día se carga una serif/condensada, cámbiala aquí y se
  // aplica en toda la sección.
  family: {
    display: undefined as undefined | string, // wordmark AURUM
    body: undefined as undefined | string,
  },
  size: {
    mega: 52,       // wordmark AURUM en el hero
    display: 34,    // cifras KPI grandes
    titleXl: 26,    // título de misión del día
    title: 20,      // títulos de tarjeta
    subtitle: 16,   // subtítulos
    body: 14,       // cuerpo
    bodySm: 13,
    caption: 12,    // labels
    micro: 10,      // chips, metadatos
    nano: 9,
  },
  weight: {
    black: '900' as const,
    extrabold: '800' as const,
    bold: '700' as const,
    semibold: '600' as const,
    medium: '500' as const,
    regular: '400' as const,
    light: '300' as const,
  },
  tracking: {
    wordmark: 8,    // letter-spacing del wordmark AURUM
    label: 1.2,     // labels en mayúsculas
    tight: -0.4,    // titulares grandes
  },
} as const;

// ── 6) Sombras (oro tenue + profundidad navy) ────────────────────────────────
// Objetos listos para usar en estilos RN. En web la sombra se nota; en native
// degrada con elevation.
export const AurumShadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 6,
  },
  gold: {
    // halo de oro para CTAs / tarjeta de misión activa
    shadowColor: AurumColors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
  },
  none: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
} as const;

// ── 7) Referentes REALES (chips de autoridad del hero) ────────────────────────
// Solo los maestros con track record verificable. NINGÚN referente descartado.
export const AURUM_AUTHORITIES: string[] = [
  'Hormozi',
  'Voss',
  'Cardone',
  'Cialdini',
  'Rackham',
  'Joe Girard',
  'Jeb Blount',
  'Aaron Ross',
];

export type AurumTheme = {
  colors: typeof AurumColors;
  gradients: typeof AurumGradients;
  radius: typeof AurumRadius;
  spacing: typeof AurumSpacing;
  type: typeof AurumType;
  shadow: typeof AurumShadow;
};

/** El tema completo en un solo objeto, por si se quiere pasar por contexto. */
export const aurumTheme: AurumTheme = {
  colors: AurumColors,
  gradients: AurumGradients,
  radius: AurumRadius,
  spacing: AurumSpacing,
  type: AurumType,
  shadow: AurumShadow,
};
