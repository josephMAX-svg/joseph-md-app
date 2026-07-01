import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Platform, ViewStyle } from 'react-native';
import { BorderRadius, Elevation, Hairline, Motion } from '../theme/tokens';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  interactive?: boolean;
  noPadding?: boolean;
}

/**
 * GlassCard — Glassmorphism card with subtle frosted-glass effect.
 * - background: rgba(15, 29, 50, 0.7)
 * - backdropFilter: blur(10px)
 * - border: 1px hairline (baja opacidad)
 * - borderRadius: 16px
 * - depth: Elevation.sm (layered soft shadow) → md on hover
 * - Hover: border brightens, subtle lift + scale
 */
export default function GlassCard({ children, style, interactive = false, noPadding = false }: GlassCardProps) {
  const [hovered, setHovered] = useState(false);

  const webHoverProps = Platform.OS === 'web' && interactive
    ? {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }
    : {};

  const webStyle = Platform.OS === 'web'
    ? {
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        transition: `transform ${Motion.base}, border-color ${Motion.base}, box-shadow ${Motion.base}`,
        cursor: interactive ? 'pointer' : 'default',
        ...(hovered && interactive
          ? {
              borderColor: Hairline.strong,
              transform: [{ translateY: -2 }, { scale: 1.008 }],
              boxShadow: '0 12px 34px rgba(0,4,13,0.34)',
            }
          : {}),
      }
    : {};

  return (
    <View
      style={[
        styles.card,
        !noPadding && styles.cardPadding,
        webStyle as any,
        ...(Array.isArray(style) ? style : style ? [style] : []),
      ]}
      {...webHoverProps}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(15, 29, 50, 0.7)',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Hairline.medium,
    ...Elevation.sm,
    overflow: 'hidden' as const,
  },
  cardPadding: {
    padding: 24,
  },
});
