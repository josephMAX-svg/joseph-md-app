import React from 'react';
import { View, Platform } from 'react-native';
import { DermaAtlas } from '../../lib/dermaData';

/**
 * DermaLineIcons — iconografía LINEAL médica fina (trazo 1.5px) que reemplaza los
 * emojis decorativos (💎🔬🩺) del atlas: lupa/dermatoscopio, silueta corporal, capas
 * de piel, gota H&E, dermatoscopio. Web = SVG inline; native = degrada a un cuadro.
 * Coherente con la metáfora "lupa del clínico" y la restricción de sobriedad tipográfica.
 */
export type DermaIconName = 'loupe' | 'dermatoscope' | 'skinLayers' | 'histoDrop' | 'body' | 'atlas' | 'differential' | 'flask';

const PATHS: Record<DermaIconName, string> = {
  // lupa (atlas / spot-diagnosis)
  loupe: '<circle cx="10" cy="10" r="6"/><line x1="14.5" y1="14.5" x2="21" y2="21"/><path d="M10 7v6M7 10h6" stroke-opacity="0.55"/>',
  // dermatoscopio (círculo con retícula polarizada)
  dermatoscope: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.4" stroke-opacity="0.6"/><line x1="12" y1="4" x2="12" y2="20" stroke-opacity="0.4"/><line x1="4" y1="12" x2="20" y2="12" stroke-opacity="0.4"/>',
  // capas de piel (epidermis→dermis→hipodermis)
  skinLayers: '<path d="M3 7h18" /><path d="M3 12h18" stroke-opacity="0.7"/><path d="M3 17h18" stroke-opacity="0.45"/><path d="M6 7v10M12 7v10M18 7v10" stroke-opacity="0.25"/>',
  // gota H&E (histología)
  histoDrop: '<path d="M12 3c3.5 4.5 5 7 5 9.5A5 5 0 0 1 7 12.5C7 10 8.5 7.5 12 3z"/><path d="M10 13.5c1 1 3 1 4 0" stroke-opacity="0.5"/>',
  // silueta corporal (body map)
  body: '<circle cx="12" cy="4.5" r="2.2"/><path d="M12 7v8"/><path d="M12 8l-4.5 3M12 8l4.5 3"/><path d="M12 15l-2.5 6M12 15l2.5 6"/>',
  // atlas (libro abierto de láminas)
  atlas: '<path d="M12 5c-2-1.2-4.5-1.4-7-0.6v13c2.5-0.8 5-0.6 7 0.6 2-1.2 4.5-1.4 7-0.6v-13c-2.5-0.8-5-0.6-7 0.6z"/><path d="M12 5v13" stroke-opacity="0.5"/>',
  // diferencial (nodos ramificados)
  differential: '<circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 12l10-6M7 12l10 6" stroke-opacity="0.6"/>',
  // matraz (práctica / Q-bank)
  flask: '<path d="M9 3h6"/><path d="M10 3v6l-4.5 8a1.6 1.6 0 0 0 1.5 2.4h10a1.6 1.6 0 0 0 1.5-2.4L14 9V3"/><path d="M8 15h8" stroke-opacity="0.5"/>',
};

export default function DermaLineIcon({
  name, size = 20, color = DermaAtlas.amethyst, strokeWidth = 1.5,
}: { name: DermaIconName; size?: number; color?: string; strokeWidth?: number }) {
  if (Platform.OS === 'web') {
    const svg = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${PATHS[name]}</svg>`;
    return <View style={{ width: size, height: size }} {...({ dangerouslySetInnerHTML: { __html: svg } } as any)} />;
  }
  // native fallback: bolita del acento (mantiene el layout sin romper)
  return <View style={{ width: size, height: size, borderRadius: size / 2, borderWidth: strokeWidth, borderColor: color, opacity: 0.85 }} />;
}
