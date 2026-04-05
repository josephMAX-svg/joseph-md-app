import React, { useEffect, useRef, useState } from 'react';
import { Text, TextStyle, Animated } from 'react-native';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  style?: TextStyle | TextStyle[];
  suffix?: string;
  prefix?: string;
}

/**
 * AnimatedCounter — Count-up animation from 0 to target value.
 * Duration: 1.5s default, easeOutCubic.
 */
export default function AnimatedCounter({
  value,
  duration = 1500,
  decimals = 0,
  style,
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const animRef = useRef<number | null>(null);
  const startTime = useRef<number>(0);
  const prevValue = useRef<number>(0);

  useEffect(() => {
    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    const from = prevValue.current;
    const to = value;
    startTime.current = Date.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = () => {
      const elapsed = Date.now() - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = from + (to - from) * easedProgress;

      setDisplayValue(current);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        prevValue.current = to;
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [value, duration]);

  const formatted = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toString();

  return (
    <Text style={style}>
      {prefix}{formatted}{suffix}
    </Text>
  );
}
