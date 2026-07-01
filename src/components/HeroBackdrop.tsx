/**
 * HeroBackdrop / HeroBanner — imágenes hero ultra-reales (generadas on-brand Zafiro+Oro).
 * HeroBackdrop: imagen absoluta con scrim para poner texto encima (va de primer hijo de un
 * contenedor position:relative). HeroBanner: banda hero con altura fija (Derma atlas).
 */
import React from 'react';
import { View, Image, Text, Platform } from 'react-native';
import { Colors, BorderRadius, Hairline, FontSize, LineHeight } from '../theme/tokens';

export type HeroKey = 'home' | 'derma' | 'vitals';

const HERO: Record<HeroKey, any> = {
  home: require('../../assets/heroes/home.webp'),
  derma: require('../../assets/heroes/derma.webp'),
  vitals: require('../../assets/heroes/vitals.webp'),
};

const S = Colors.surface;

// Scrim CSS (web) para mantener legible el texto sobre la imagen.
function scrimStyle(dir: 'left' | 'bottom'): any {
  if (Platform.OS !== 'web') return { backgroundColor: S + '88' };
  return {
    backgroundImage:
      dir === 'left'
        ? `linear-gradient(90deg, ${S} 0%, ${S}dd 34%, ${S}55 60%, ${S}00 82%)`
        : `linear-gradient(180deg, ${S}00 0%, ${S}55 55%, ${S} 100%)`,
  };
}

/** Fondo absoluto (para headers): imagen + scrim. El contenido va DESPUÉS (encima). */
export function HeroBackdrop({
  image,
  opacity = 0.55,
  scrim = 'left',
}: {
  image: HeroKey;
  opacity?: number;
  scrim?: 'left' | 'bottom';
}) {
  return (
    <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' } as any}>
      <Image source={HERO[image]} resizeMode="cover" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity } as any} />
      <View style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as any, scrimStyle(scrim)]} />
    </View>
  );
}

/** Banda hero con título encima (Derma atlas, etc.). */
export function HeroBanner({
  image,
  eyebrow,
  title,
  subtitle,
  height = 132,
  accent = Colors.gold,
}: {
  image: HeroKey;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  height?: number;
  accent?: string;
}) {
  return (
    <View
      style={{
        height,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Hairline.soft,
        justifyContent: 'center',
        marginBottom: 12,
      }}
    >
      <Image source={HERO[image]} resizeMode="cover" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' } as any} />
      <View style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as any, scrimStyle('left')]} />
      <View style={{ paddingHorizontal: 22, gap: 3 }}>
        {eyebrow ? (
          <Text style={{ color: accent, fontSize: FontSize.labelSm, fontWeight: '700', letterSpacing: 1.6 }}>{eyebrow.toUpperCase()}</Text>
        ) : null}
        <Text style={{ color: Colors.onSurface, fontSize: FontSize.headlineSm, lineHeight: LineHeight.headlineSm, fontWeight: '800', letterSpacing: -0.3 }}>{title}</Text>
        {subtitle ? (
          <Text style={{ color: Colors.onSurfaceVariant, fontSize: FontSize.bodyMd, lineHeight: LineHeight.bodyMd }} numberOfLines={1}>{subtitle}</Text>
        ) : null}
      </View>
    </View>
  );
}

export default HeroBackdrop;
