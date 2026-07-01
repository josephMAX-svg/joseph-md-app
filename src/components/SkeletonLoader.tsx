import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { BorderRadius, Hairline } from '../theme/tokens';

interface SkeletonLoaderProps {
  lines?: number;
  style?: ViewStyle;
}

/**
 * SkeletonLoader — Pulsing shimmer bars for loading states.
 * Default: 3 bars with staggered widths.
 */
export default function SkeletonLoader({ lines = 3, style }: SkeletonLoaderProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const widths = ['100%', '75%', '60%', '90%', '50%'];

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: lines }).map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            {
              width: widths[i % widths.length] as any,
              opacity,
            },
          ]}
        />
      ))}
    </View>
  );
}

export function SkeletonCard({ style }: { style?: ViewStyle }) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View style={[styles.cardSkeleton, { opacity }, style]} />
  );
}

export function PulseDash({ color = '#6B7C93', size = 36 }: { color?: string; size?: number }) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.Text style={{ fontSize: size, fontWeight: '700', color, opacity }}>
      —
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  bar: {
    height: 11,
    borderRadius: BorderRadius.full,
    backgroundColor: Hairline.soft,
  },
  cardSkeleton: {
    height: 80,
    borderRadius: BorderRadius.xl,
    backgroundColor: Hairline.soft,
    borderWidth: 1,
    borderColor: Hairline.soft,
    marginBottom: 12,
  },
});
