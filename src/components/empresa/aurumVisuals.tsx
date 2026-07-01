import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import CircularProgress from '../CircularProgress';
import AnimatedCounter from '../AnimatedCounter';
import {
  AurumColors as C, AurumRadius as R, AurumSpacing as S, AurumType as T,
  AurumShadow, aurumGradCss, withAlpha,
} from '../../theme/aurumTheme';
import { Elevation, Motion, Hairline } from '../../theme/tokens';

/**
 * aurumVisuals — capa visual PREMIUM de la sección AURUM (Hormozi / acquisition.com).
 * Todo referencia los tokens de src/theme/aurumTheme.ts: cero colores hardcodeados.
 * El movimiento (sweep, glow) va detrás de Platform.OS === 'web'; en native degrada
 * a estático. Sin dependencias nuevas: gradientes vía CSS en web + fallback de View.
 */

const isWeb = Platform.OS === 'web';
const web = (s: any) => (isWeb ? s : {});

// Inyección única de keyframes (web) — vive bajo el id 'aurum-anims'.
if (isWeb && typeof document !== 'undefined') {
  const id = 'aurum-anims';
  if (!document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = `
      @keyframes aurumSweep { 0%{transform:translateX(-60%)} 100%{transform:translateX(220%)} }
      @keyframes aurumRise { 0%{opacity:0;transform:translateY(14px)} 100%{opacity:1;transform:translateY(0)} }
      @keyframes aurumGlow { 0%{opacity:.45} 50%{opacity:.9} 100%{opacity:.45} }
      @media (prefers-reduced-motion: reduce){ [data-aurum-anim]{ animation:none !important } }
    `;
    document.head.appendChild(el);
  }
}

// ── AurumHero: cabecera con gradiente + barrido de luz oro ──────────────────
export function AurumHero({ children, gradient = 'hero', style }: {
  children: React.ReactNode; gradient?: Parameters<typeof aurumGradCss>[0]; style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[
      v.hero,
      isWeb ? ({ backgroundImage: aurumGradCss(gradient) } as any) : { backgroundColor: C.bgElevated },
      style,
    ]}>
      {isWeb ? (
        <>
          {/* hairline superior de luz — remate premium del borde */}
          <View pointerEvents="none" style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            backgroundImage: `linear-gradient(90deg, transparent, ${withAlpha(C.goldSoft, 0.5)}, transparent)`,
          } as any} />
          <View pointerEvents="none" {...({ 'data-aurum-anim': '' } as any)} style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, width: '38%',
            backgroundImage: 'linear-gradient(100deg, transparent, rgba(230,200,104,0.12), transparent)',
            animationName: 'aurumSweep', animationDuration: '6.5s',
            animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out',
          } as any} />
        </>
      ) : null}
      <View style={{ position: 'relative' }}>{children}</View>
    </View>
  );
}

// ── AurumWordmark: "AURUM" con tracking grande + brillo metálico (web) ──────
export function AurumWordmark({ size = T.size.mega }: { size?: number }) {
  const base: TextStyle = {
    fontSize: size, fontWeight: T.weight.black, letterSpacing: T.tracking.wordmark,
    color: C.goldSoft, fontFamily: T.family.display as any,
  };
  if (isWeb) {
    return (
      <Text style={[base, {
        // brillo metálico: degradado oro recortado al texto
        backgroundImage: 'linear-gradient(180deg, #F3E2A1 0%, #E6C868 38%, #C9A227 70%, #8A6D14 100%)',
        WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
      } as any]}>AURUM</Text>
    );
  }
  return <Text style={base}>AURUM</Text>;
}

// ── AurumChip: badge premium (relleno suave o sólido) ───────────────────────
export function AurumChip({ label, color = C.gold, solid = false, size = 'md' }: {
  label: string; color?: string; solid?: boolean; size?: 'sm' | 'md';
}) {
  const sm = size === 'sm';
  return (
    <View style={[
      v.chip,
      { borderColor: withAlpha(color, solid ? 1 : 0.32) },
      solid ? { backgroundColor: color } : { backgroundColor: withAlpha(color, 0.13) },
      sm && { paddingVertical: 1, paddingHorizontal: 7 },
    ]}>
      <Text style={[v.chipTxt, sm && { fontSize: T.size.nano }, { color: solid ? C.onGold : color }]}>{label}</Text>
    </View>
  );
}

// ── AurumLabel: rótulo de sección en mayúsculas con tracking ────────────────
export function AurumLabel({ children, color = C.textMute, style }: {
  children: React.ReactNode; color?: string; style?: TextStyle;
}) {
  return <Text style={[v.label, { color }, style]}>{children}</Text>;
}

// ── AurumPanel: contenedor glass premium (borde oro opcional a la izquierda) ─
export function AurumPanel({ children, accent, glow = false, style }: {
  children: React.ReactNode; accent?: string; glow?: boolean; style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[
      v.panel,
      AurumShadow.card,
      glow ? AurumShadow.gold : null,
      accent ? { borderLeftWidth: 3, borderLeftColor: accent } : null,
      style,
    ]}>
      {children}
    </View>
  );
}

// ── AurumButton: CTA primario satisfactorio (oro sólido) o ghost ────────────
export function AurumButton({ label, onPress, variant = 'primary', accent = C.gold, full = false, style }: {
  label: string; onPress: () => void; variant?: 'primary' | 'ghost'; accent?: string; full?: boolean; style?: ViewStyle;
}) {
  const [hover, setHover] = useState(false);
  const hoverProps = isWeb ? { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } : {};
  const primary = variant === 'primary';
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      {...(hoverProps as any)}
      style={[
        v.btn,
        full && { alignSelf: 'stretch' },
        primary
          ? { backgroundColor: accent, borderColor: accent }
          : { backgroundColor: withAlpha(accent, 0.12), borderColor: withAlpha(accent, 0.5) },
        hover && primary ? { backgroundColor: C.goldSoft } : null,
        hover && !primary ? { borderColor: accent, backgroundColor: withAlpha(accent, 0.18) } : null,
        hover && isWeb ? ({ transform: [{ translateY: -1 }] } as any) : null,
        web({ transition: `all ${Motion.base}`, cursor: 'pointer' }),
        primary ? AurumShadow.gold : null,
        style,
      ]}>
      <Text style={[v.btnTxt, { color: primary ? C.onGold : accent }]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── AurumProgressBar: barra de progreso real ────────────────────────────────
export function AurumProgressBar({ pct, color = C.gold, height = 8 }: { pct: number; color?: string; height?: number }) {
  const w = Math.max(0, Math.min(100, pct));
  return (
    <View style={[v.barTrack, { height, borderRadius: height / 2 }]}>
      <View style={[
        { height, borderRadius: height / 2, width: `${w}%` as any, backgroundColor: color },
        isWeb ? ({ backgroundImage: `linear-gradient(90deg, ${C.goldDeep}, ${color}, ${C.goldSoft})`, transition: `width ${Motion.spring}` } as any) : null,
      ]} />
    </View>
  );
}

// ── AurumRing: anillo de progreso + contador (reusa CircularProgress) ───────
export function AurumRing({ value, max = 100, label, sub, accent = C.gold, size = 96, suffix = '' }: {
  value: number; max?: number; label: string; sub?: string; accent?: string; size?: number; suffix?: string;
}) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setPct(Math.max(0, Math.min(100, (value / Math.max(1, max)) * 100))), 140);
    return () => clearTimeout(id);
  }, [value, max]);
  return (
    <View style={{ alignItems: 'center', minWidth: 92 }}>
      <CircularProgress progress={pct} size={size} strokeWidth={7} color={accent} trackColor={withAlpha('#FFFFFF', 0.07)}>
        <AnimatedCounter value={value} suffix={suffix} style={{ fontSize: size * 0.27, fontWeight: T.weight.extrabold, color: accent } as any} />
      </CircularProgress>
      <Text style={v.ringLabel}>{label.toUpperCase()}</Text>
      {sub ? <Text style={v.ringSub}>{sub}</Text> : null}
    </View>
  );
}

// ── AurumRise: entrada escalonada (cascada de boot, web) ────────────────────
export function AurumRise({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: ViewStyle }) {
  const anim = isWeb
    ? ({ animationName: 'aurumRise', animationDuration: '0.6s', animationFillMode: 'both', animationDelay: `${delay}ms`, animationTimingFunction: 'cubic-bezier(.16,1,.3,1)' } as any)
    : {};
  return <View {...(isWeb ? ({ 'data-aurum-anim': '' } as any) : {})} style={[anim, style]}>{children}</View>;
}

// ── Hover helper para tarjetas (lift + borde oro en web) ────────────────────
export function useAurumHover() {
  const [hovered, setHovered] = useState(false);
  const hoverProps = isWeb ? { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) } : {};
  return { hovered, hoverProps };
}

const v = StyleSheet.create({
  hero: {
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: withAlpha(C.gold, 0.24),
    padding: S['2xl'],
    overflow: 'hidden',
    ...AurumShadow.card,
    ...Elevation.lg,
  },
  chip: {
    borderRadius: R.pill,
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 11,
    alignSelf: 'flex-start',
  },
  chipTxt: { fontSize: T.size.micro, fontWeight: T.weight.extrabold, letterSpacing: 0.6 },
  label: {
    fontSize: T.size.caption,
    fontWeight: T.weight.bold,
    letterSpacing: T.tracking.label,
    lineHeight: 17,
    textTransform: 'uppercase',
    marginBottom: S.md,
  },
  panel: {
    backgroundColor: C.surface,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    padding: S.xl,
    ...Elevation.sm,
    ...web({ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }),
  },
  btn: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: R.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: { fontSize: T.size.body, fontWeight: T.weight.extrabold, letterSpacing: 0.4 },
  barTrack: { backgroundColor: withAlpha('#FFFFFF', 0.08), overflow: 'hidden', borderWidth: 1, borderColor: Hairline.soft },
  ringLabel: { fontSize: T.size.micro, fontWeight: T.weight.extrabold, color: C.textDim, letterSpacing: 0.8, marginTop: 9, textAlign: 'center' },
  ringSub: { fontSize: T.size.nano, color: C.textMute, marginTop: 2, textAlign: 'center', letterSpacing: 0.2 },
});
