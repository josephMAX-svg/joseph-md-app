import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';

interface CircularProgressProps {
  /** 0-100 */
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  children?: React.ReactNode;
}

/**
 * CircularProgress — SVG circular progress ring.
 * Works on React Native Web using dangerouslySetInnerHTML for SVG.
 */
export default function CircularProgress({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#0FD4A0',
  trackColor = 'rgba(255,255,255,0.06)',
  children,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(progress, 100) / 100) * circumference;
  const center = size / 2;

  if (Platform.OS === 'web') {
    // Use direct SVG on web
    const svgStr = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform: rotate(-90deg)">
        <circle
          cx="${center}" cy="${center}" r="${radius}"
          fill="none"
          stroke="${trackColor}"
          stroke-width="${strokeWidth}"
        />
        <circle
          cx="${center}" cy="${center}" r="${radius}"
          fill="none"
          stroke="${color}"
          stroke-width="${strokeWidth}"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${strokeDashoffset}"
          stroke-linecap="round"
          style="transition: stroke-dashoffset 0.5s ease"
        />
      </svg>
    `;

    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View
          // @ts-ignore — web-only prop
          dangerouslySetInnerHTML={{ __html: svgStr }}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        <View style={styles.centerContent}>
          {children}
        </View>
      </View>
    );
  }

  // Native fallback — simple percentage text
  return (
    <View style={[styles.container, styles.nativeFallback, { width: size, height: size, borderRadius: size / 2, borderColor: color }]}>
      <View style={styles.centerContent}>
        {children || (
          <Text style={[styles.fallbackText, { color }]}>{Math.round(progress)}%</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nativeFallback: {
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
