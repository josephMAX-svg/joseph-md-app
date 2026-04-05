import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Platform, ViewStyle } from 'react-native';

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
 * - border: 1px solid rgba(255,255,255,0.08)
 * - borderRadius: 16px
 * - shadow: 0 4px 24px rgba(0,0,0,0.2)
 * - Hover: border brightens, slight scale
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
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transition: 'all 0.2s ease',
        cursor: interactive ? 'pointer' : 'default',
        ...(hovered && interactive
          ? {
              borderColor: 'rgba(255,255,255,0.15)',
              transform: [{ scale: 1.01 }],
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    // Shadow for native
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
    overflow: 'hidden' as const,
  },
  cardPadding: {
    padding: 16,
  },
});
