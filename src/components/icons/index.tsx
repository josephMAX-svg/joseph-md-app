/**
 * Joseph MD — Icon system v1
 * Iconos SVG de línea (react-native-svg), reemplazan los emoji de chrome.
 * Estilo: stroke fino redondeado, color por token (acento del segmento), premium/editorial.
 * Uso: <Icon name="home" size={20} color={Colors.gold} />
 */
import React from 'react';
import Svg, { Path, Circle, Line, Polyline, G } from 'react-native-svg';
import { Colors } from '../../theme/tokens';

export type IconName =
  | 'home' | 'study' | 'derma' | 'business' | 'research' | 'vitals' | 'synapse'
  | 'flame' | 'bolt' | 'bell' | 'timer' | 'target' | 'chart' | 'calendar'
  | 'rocket' | 'book' | 'video' | 'doc' | 'mic' | 'brain' | 'check' | 'gem'
  | 'flask' | 'pulse' | 'crosshair' | 'chat' | 'queue';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  accent?: string; // color de relleno tenue opcional (duotono)
};

// Paths de línea (viewBox 24x24), fill none salvo puntos.
const PATHS: Record<IconName, (p: { c: string; sw: number; a?: string }) => React.ReactNode> = {
  home: ({ c, sw }) => (
    <G>
      <Path d="M3.5 11.2 12 4l8.5 7.2" stroke={c} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5.5 9.8V20h13V9.8" stroke={c} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9.7 20v-5.2h4.6V20" stroke={c} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </G>
  ),
  study: ({ c, sw }) => (
    <G>
      <Path d="M12 6.2C10 4.7 6.4 4.6 4 5.3V18c2.4-.7 6-.6 8 .9 2-1.5 5.6-1.6 8-.9V5.3c-2.4-.7-6-.6-8 .9Z" stroke={c} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="12" y1="7.1" x2="12" y2="18.9" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </G>
  ),
  gem: ({ c, sw, a }) => (
    <G>
      <Path d="M6 3.5h12l3 5.2L12 20.5 3 8.7Z" stroke={c} strokeWidth={sw} fill={a || 'none'} strokeLinejoin="round" />
      <Path d="M3 8.7h18M9 3.5 7.5 8.7 12 20.5l4.5-11.8L15 3.5" stroke={c} strokeWidth={sw * 0.8} fill="none" strokeLinejoin="round" opacity={0.7} />
    </G>
  ),
  derma: ({ c, sw, a }) => ( // dermatoscopio / lente de escaneo
    <G>
      <Circle cx="10.5" cy="10.5" r="6.4" stroke={c} strokeWidth={sw} fill={a || 'none'} />
      <Path d="M15.2 15.2 20.5 20.5" stroke={c} strokeWidth={sw} strokeLinecap="round" />
      <Path d="M8 10.5h5M10.5 8v5" stroke={c} strokeWidth={sw * 0.85} strokeLinecap="round" opacity={0.75} />
    </G>
  ),
  business: ({ c, sw, a }) => (
    <G>
      <Path d="M3.5 8.2h17v11.3h-17Z" stroke={c} strokeWidth={sw} fill={a || 'none'} strokeLinejoin="round" />
      <Path d="M8.8 8.2V6.6c0-.9.7-1.6 1.6-1.6h3.2c.9 0 1.6.7 1.6 1.6v1.6" stroke={c} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="3.5" y1="13" x2="20.5" y2="13" stroke={c} strokeWidth={sw} />
    </G>
  ),
  research: ({ c, sw, a }) => ( // matraz Erlenmeyer
    <G>
      <Path d="M9 3.5h6M10 3.5v6L5.2 18.3c-.5.9.1 2.2 1.2 2.2h11.2c1.1 0 1.7-1.3 1.2-2.2L14 9.5v-6" stroke={c} strokeWidth={sw} fill={a || 'none'} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="7.4" y1="14" x2="16.6" y2="14" stroke={c} strokeWidth={sw * 0.85} opacity={0.75} />
    </G>
  ),
  vitals: ({ c, sw }) => ( // línea ECG / actividad
    <Polyline points="2.5,12 7,12 9.5,5.5 13,18.5 15.5,12 21.5,12" stroke={c} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  pulse: ({ c, sw }) => (
    <Polyline points="2.5,12 7,12 9.5,5.5 13,18.5 15.5,12 21.5,12" stroke={c} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  synapse: ({ c, sw, a }) => ( // grafo neural
    <G>
      <Line x1="7" y1="7.5" x2="16.5" y2="8.5" stroke={c} strokeWidth={sw * 0.8} opacity={0.7} />
      <Line x1="7" y1="7.5" x2="9.5" y2="16" stroke={c} strokeWidth={sw * 0.8} opacity={0.7} />
      <Line x1="16.5" y1="8.5" x2="15.5" y2="16" stroke={c} strokeWidth={sw * 0.8} opacity={0.7} />
      <Line x1="9.5" y1="16" x2="15.5" y2="16" stroke={c} strokeWidth={sw * 0.8} opacity={0.7} />
      <Circle cx="7" cy="7.5" r="2.1" stroke={c} strokeWidth={sw} fill={a || 'none'} />
      <Circle cx="16.5" cy="8.5" r="2.1" stroke={c} strokeWidth={sw} fill={a || 'none'} />
      <Circle cx="9.5" cy="16" r="2.1" stroke={c} strokeWidth={sw} fill={a || 'none'} />
      <Circle cx="15.5" cy="16" r="2.1" stroke={c} strokeWidth={sw} fill={a || 'none'} />
    </G>
  ),
  brain: ({ c, sw, a }) => (
    <G>
      <Line x1="7" y1="7.5" x2="16.5" y2="8.5" stroke={c} strokeWidth={sw * 0.8} opacity={0.7} />
      <Line x1="7" y1="7.5" x2="9.5" y2="16" stroke={c} strokeWidth={sw * 0.8} opacity={0.7} />
      <Line x1="16.5" y1="8.5" x2="15.5" y2="16" stroke={c} strokeWidth={sw * 0.8} opacity={0.7} />
      <Circle cx="7" cy="7.5" r="2.1" stroke={c} strokeWidth={sw} fill={a || 'none'} />
      <Circle cx="16.5" cy="8.5" r="2.1" stroke={c} strokeWidth={sw} fill={a || 'none'} />
      <Circle cx="9.5" cy="16" r="2.1" stroke={c} strokeWidth={sw} fill={a || 'none'} />
      <Circle cx="15.5" cy="16" r="2.1" stroke={c} strokeWidth={sw} fill={a || 'none'} />
    </G>
  ),
  flame: ({ c, sw, a }) => (
    <Path d="M12 3.5c2.4 3.2 4.2 5 4.2 8.4A4.2 4.2 0 0 1 7.8 12c0-1.6.8-2.7 1.9-3.7 0 1.6.8 2.6 1.8 2.6.9 0 1.7-.9 1.7-2.5 0-2.3-1.4-3.6-1.2-4.9Z" stroke={c} strokeWidth={sw} fill={a || 'none'} strokeLinejoin="round" />
  ),
  bolt: ({ c, sw, a }) => (
    <Path d="M13.2 2.5 4.5 13.4h6.1l-1 8.1 8.9-11.5h-6.1Z" stroke={c} strokeWidth={sw} fill={a || 'none'} strokeLinejoin="round" />
  ),
  bell: ({ c, sw, a }) => (
    <G>
      <Path d="M6.3 9.5a5.7 5.7 0 0 1 11.4 0c0 4.4 1.6 5.9 1.6 5.9H4.7s1.6-1.5 1.6-5.9Z" stroke={c} strokeWidth={sw} fill={a || 'none'} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10.2 19a2 2 0 0 0 3.6 0" stroke={c} strokeWidth={sw} fill="none" strokeLinecap="round" />
    </G>
  ),
  timer: ({ c, sw }) => (
    <G>
      <Circle cx="12" cy="13" r="8" stroke={c} strokeWidth={sw} fill="none" />
      <Path d="M12 8.5V13l3 2M9.5 3h5" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </G>
  ),
  target: ({ c, sw }) => (
    <G>
      <Circle cx="12" cy="12" r="8.4" stroke={c} strokeWidth={sw} fill="none" />
      <Circle cx="12" cy="12" r="4.6" stroke={c} strokeWidth={sw} fill="none" opacity={0.8} />
      <Circle cx="12" cy="12" r="1.2" fill={c} />
    </G>
  ),
  crosshair: ({ c, sw }) => (
    <G>
      <Circle cx="12" cy="12" r="8.4" stroke={c} strokeWidth={sw} fill="none" />
      <Path d="M12 1.5v5M12 17.5v5M1.5 12h5M17.5 12h5" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </G>
  ),
  chart: ({ c, sw }) => (
    <G>
      <Path d="M4 4v16h16" stroke={c} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="7,15 11,10 14,13 19,6" stroke={c} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </G>
  ),
  calendar: ({ c, sw, a }) => (
    <G>
      <Path d="M4.5 6.5h15v14h-15Z" stroke={c} strokeWidth={sw} fill={a || 'none'} strokeLinejoin="round" />
      <Path d="M8 4v4M16 4v4M4.5 11h15" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </G>
  ),
  rocket: ({ c, sw, a }) => (
    <G>
      <Path d="M12 3c3 1.4 4.6 4.4 4.6 8 0 2-1.6 5.2-4.6 8-3-2.8-4.6-6-4.6-8 0-3.6 1.6-6.6 4.6-8Z" stroke={c} strokeWidth={sw} fill={a || 'none'} strokeLinejoin="round" />
      <Circle cx="12" cy="9.5" r="1.9" stroke={c} strokeWidth={sw} fill="none" />
      <Path d="M9.2 16.5C7.6 17.2 7 19 7 21c2 0 3.8-.6 4.5-2.2M14.8 16.5c1.6.7 2.2 2.5 2.2 4.5-2 0-3.8-.6-4.5-2.2" stroke={c} strokeWidth={sw * 0.85} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </G>
  ),
  book: ({ c, sw }) => PATHS.study({ c, sw }),
  video: ({ c, sw, a }) => (
    <G>
      <Path d="M3.5 7.5h11v9h-11Z" stroke={c} strokeWidth={sw} fill={a || 'none'} strokeLinejoin="round" />
      <Path d="M14.5 10.5 20.5 7v10l-6-3.5Z" stroke={c} strokeWidth={sw} fill={a || 'none'} strokeLinejoin="round" />
    </G>
  ),
  doc: ({ c, sw, a }) => (
    <G>
      <Path d="M6.5 3.5h7l4.5 4.5v12h-11.5Z" stroke={c} strokeWidth={sw} fill={a || 'none'} strokeLinejoin="round" />
      <Path d="M13.5 3.5V8h4.5M9 12.5h6M9 15.5h6" stroke={c} strokeWidth={sw * 0.9} strokeLinecap="round" strokeLinejoin="round" />
    </G>
  ),
  mic: ({ c, sw, a }) => (
    <G>
      <Path d="M12 3.5a2.6 2.6 0 0 1 2.6 2.6v5a2.6 2.6 0 0 1-5.2 0v-5A2.6 2.6 0 0 1 12 3.5Z" stroke={c} strokeWidth={sw} fill={a || 'none'} strokeLinejoin="round" />
      <Path d="M6.5 11a5.5 5.5 0 0 0 11 0M12 16.5V20.5M9 20.5h6" stroke={c} strokeWidth={sw} fill="none" strokeLinecap="round" />
    </G>
  ),
  check: ({ c, sw }) => (
    <Polyline points="4,12.5 9.5,18 20,6" stroke={c} strokeWidth={sw * 1.15} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  flask: ({ c, sw, a }) => PATHS.research({ c, sw, a }),
  chat: ({ c, sw, a }) => (
    <Path d="M4 5.5h16v10.5h-9.5L6.5 19v-3H4Z" stroke={c} strokeWidth={sw} fill={a || 'none'} strokeLinejoin="round" />
  ),
  queue: ({ c, sw }) => (
    <G>
      <Path d="M4 6.5h11M4 12h11M4 17.5h7" stroke={c} strokeWidth={sw} strokeLinecap="round" />
      <Circle cx="18.5" cy="17.5" r="2.4" stroke={c} strokeWidth={sw} fill="none" />
    </G>
  ),
};

export function Icon({ name, size = 20, color = Colors.onSurface, strokeWidth = 1.75, accent }: Props) {
  const render = PATHS[name] || PATHS.target;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {render({ c: color, sw: strokeWidth, a: accent })}
    </Svg>
  );
}

// Mapa de segmento → icono (para la navegación)
export const SEGMENT_ICON: Record<string, IconName> = {
  Home: 'home',
  Estudio: 'study',
  Derma: 'gem',
  Empresa: 'business',
  'Investigación': 'research',
  Vitals: 'vitals',
  Synapse: 'synapse',
};

export default Icon;
