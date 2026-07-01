import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import type { Semaforo } from '../../lib/empresaData';

/**
 * Primitivas compartidas del Hub de Empresa (Business).
 * Paradigma: TERMINAL FINANCIERO del holding (Bloomberg / Ramp / Mercury).
 * Paleta "Midnight Sapphire & Champagne Gold": zafiro profundo + oro firma
 * (Colors.gold #C8A96A), semántica de datos (jade meta / coral actuar / brass
 * vigilar). Numerales tabulares + mono para cifras/tickers/deltas. Todo el
 * movimiento y la fuente mono web-only van detrás de Platform.OS === 'web'.
 */

export const AMBER = Colors.gold;   // #C8A96A — oro-firma (acento del segmento Business)
export const BRASS = Colors.brass;  // #B8934E — brass profundo (semántica "vigilar")

// Fuente monoespaciada del terminal (web): cifras, tickers, reloj y deltas.
// En native no hay familia mono custom cargada → se degrada a la del sistema pero
// SIEMPRE con numerales tabulares (fontVariant) para que las columnas cuadren.
export const MONO_FAMILY = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';
export const monoText: any = Platform.OS === 'web'
  ? { fontFamily: MONO_FAMILY, fontVariantNumeric: 'tabular-nums' }
  : { fontVariant: ['tabular-nums'] as any };

// ── Mapas de color ──────────────────────────────────────────────
export function semaforoColor(s: Semaforo): string {
  switch (s) {
    case 'verde': return Colors.green;   // #5FA88C jade — meta
    case 'ambar': return Colors.brass;   // #B8934E brass — vigilar
    case 'rojo':  return Colors.coral;   // #C56A5A terracota — actuar
    default:      return Colors.muted;   // #7C8496 — sin dato
  }
}

const ACCENTS: Record<string, string> = {
  amber: Colors.gold, blue: Colors.blue, green: Colors.green,
  purple: Colors.purple, coral: Colors.coral, teal: Colors.teal,
  brass: Colors.brass, gold: Colors.gold,
};
export function accentColor(name: string): string {
  return ACCENTS[name] ?? Colors.gold;
}

export function estadoEmpresaColor(estado: string): string {
  switch (estado) {
    case 'activa': return Colors.green;
    case 'en_desarrollo': return Colors.brass;
    case 'piloto': return Colors.blue;
    default: return Colors.muted;
  }
}

export function estadoCreativoColor(estado: string): string {
  switch (estado) {
    case 'ganador': return Colors.green;
    case 'prueba': return Colors.brass;
    case 'matar': return Colors.coral;
    default: return Colors.muted;
  }
}

// ── Hook de hover (web-only) ─────────────────────────────────────
export function useHover() {
  const [hovered, setHovered] = useState(false);
  const hoverProps = Platform.OS === 'web'
    ? { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }
    : {};
  return { hovered, hoverProps };
}

const webTransition = Platform.OS === 'web'
  ? ({ transition: `border-color ${Motion.base}, background-color ${Motion.base}, transform ${Motion.base}, box-shadow ${Motion.base}` } as any)
  : {};

// ── GlassPanel: bloque glassmorphism (sin sombras decorativas) ───
export function GlassPanel({
  children, style, accent,
}: { children: React.ReactNode; style?: ViewStyle | ViewStyle[]; accent?: string }) {
  return (
    <View
      style={[
        styles.glass,
        accent ? { borderLeftWidth: 3, borderLeftColor: accent } : null,
        ...(Array.isArray(style) ? style : style ? [style] : []),
      ]}
    >
      {children}
    </View>
  );
}

// ── SectionLabel: encabezado de sección en mayúsculas ────────────
export function SectionLabel({ children, style }: { children: React.ReactNode; style?: TextStyle }) {
  return <Text style={[styles.sectionLabel, style]}>{children}</Text>;
}

// ── Chip / Badge ─────────────────────────────────────────────────
export function Chip({
  label, color = AMBER, solid = false, small = false,
}: { label: string; color?: string; solid?: boolean; small?: boolean }) {
  return (
    <View style={[
      styles.chip,
      small && { paddingVertical: 1, paddingHorizontal: 6 },
      solid ? { backgroundColor: color } : { backgroundColor: color + '20' },
    ]}>
      <Text style={[
        styles.chipText,
        small && { fontSize: 8 },
        { color: solid ? '#0B1628' : color },
      ]}>
        {label}
      </Text>
    </View>
  );
}

// ── SemaforoDot: punto de estado verde/ámbar/rojo/neutro ─────────
export function SemaforoDot({ s, size = 8 }: { s: Semaforo; size?: number }) {
  return <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: semaforoColor(s) }} />;
}

// ── MetricCard: tarjeta-métrica "hero" (valor grande + label) ────
export function MetricCard({
  label, value, meta, semaforo, hint, accent = AMBER,
}: {
  label: string; value: string; meta?: string;
  semaforo?: Semaforo; hint?: string; accent?: string;
}) {
  const { hovered, hoverProps } = useHover();
  const valueColor = semaforo ? semaforoColor(semaforo) : accent;
  return (
    <View
      style={[
        styles.metricCard,
        Platform.OS === 'web' ? webTransition : null,
        hovered && Platform.OS === 'web'
          ? { borderColor: Hairline.strong, transform: [{ translateY: -2 }], ...Elevation.md } as any
          : null,
      ]}
      {...hoverProps}
    >
      <View style={styles.metricTop}>
        <Text style={styles.metricLabel} numberOfLines={1}>{label.toUpperCase()}</Text>
        {semaforo ? <SemaforoDot s={semaforo} /> : null}
      </View>
      <Text style={[styles.metricValue, { color: valueColor }]} numberOfLines={1}>{value}</Text>
      {meta ? <Text style={styles.metricMeta} numberOfLines={1}>meta: {meta}</Text> : null}
      {hint ? <Text style={styles.metricHint} numberOfLines={2}>{hint}</Text> : null}
    </View>
  );
}

// ── KeyValueCard: tarjeta compacta label + valor ─────────────────
export function StatCell({ label, value, accent = AMBER }: { label: string; value: string; accent?: string }) {
  return (
    <View style={styles.statCell}>
      <Text style={[styles.statValue, { color: accent }]} numberOfLines={1}>{value}</Text>
      <Text style={styles.statLabel} numberOfLines={1}>{label.toUpperCase()}</Text>
    </View>
  );
}

// ── MonoNumeral: cifra en fuente mono + numerales tabulares (grado terminal) ─
export function MonoNumeral({
  children, color = Colors.onSurface, size = FontSize.titleMd, weight = '700', style,
}: { children: React.ReactNode; color?: string; size?: number; weight?: TextStyle['fontWeight']; style?: TextStyle }) {
  return (
    <Text style={[{ fontSize: size, fontWeight: weight, color, letterSpacing: 0 }, monoText, style]} numberOfLines={1}>
      {children}
    </Text>
  );
}

// ── DeltaValue: delta con glifo ▲/▼/● y color-semántica (verde/coral/muted) ──
export function DeltaValue({
  dir, label, size = FontSize.labelMd,
}: { dir: 'up' | 'down' | 'flat'; label: string; size?: number }) {
  const glyph = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '●';
  const color = dir === 'up' ? Colors.green : dir === 'down' ? Colors.coral : Colors.muted;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Text style={[{ fontSize: size - 1, color, fontWeight: '800' }, monoText]}>{glyph}</Text>
      <Text style={[{ fontSize: size, color, fontWeight: '700' }, monoText]} numberOfLines={1}>{label}</Text>
    </View>
  );
}

// ── TabularStat: celda de cifra "grado financiero" (label mono + valor tabular) ─
export function TabularStat({
  label, value, accent = AMBER, delta, sub,
}: { label: string; value: string; accent?: string; delta?: { dir: 'up' | 'down' | 'flat'; label: string }; sub?: string }) {
  return (
    <View style={styles.tabStat}>
      <Text style={styles.tabStatLabel} numberOfLines={1}>{label.toUpperCase()}</Text>
      <MonoNumeral color={accent} size={FontSize.titleMd} weight="800" style={{ marginTop: 3 }}>{value}</MonoNumeral>
      {delta ? <View style={{ marginTop: 4 }}><DeltaValue dir={delta.dir} label={delta.label} size={FontSize.labelSm} /></View> : null}
      {sub ? <Text style={styles.tabStatSub} numberOfLines={1}>{sub}</Text> : null}
    </View>
  );
}

// ── PillTab: tab/segmento (usado por el selector y sub-nav) ──────
export function PillTab({
  label, sublabel, icon, active, accent = AMBER, onPress, dot,
}: {
  label: string; sublabel?: string; icon?: string; active: boolean;
  accent?: string; onPress: () => void; dot?: string;
}) {
  const { hovered, hoverProps } = useHover();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.pill,
        active ? { backgroundColor: accent + '1F', borderColor: accent + '66', ...Elevation.sm } : null,
        !active && hovered && Platform.OS === 'web' ? { borderColor: Hairline.strong, backgroundColor: 'rgba(216,227,252,0.05)' } as any : null,
        Platform.OS === 'web' ? ({ ...webTransition, cursor: 'pointer' } as any) : null,
      ]}
      {...hoverProps}
    >
      {dot ? <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: dot, marginRight: 7 }} /> : null}
      {icon ? <Text style={styles.pillIcon}>{icon}</Text> : null}
      <View>
        <Text style={[styles.pillLabel, active && { color: Colors.onSurface, fontWeight: '700' }]}>{label}</Text>
        {sublabel ? <Text style={styles.pillSub} numberOfLines={1}>{sublabel}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

// ── Grid responsivo (web: CSS grid auto-fill; native: flexWrap) ──
export function gridStyle(min: number, gap = 12): any {
  if (Platform.OS === 'web') {
    return { display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, gap };
  }
  return { flexDirection: 'row', flexWrap: 'wrap', gap };
}
// Item para el fallback native (web ignora el width fijo dentro del grid)
export function gridItemStyle(min: number): any {
  return Platform.OS === 'web' ? {} : { flexGrow: 1, flexBasis: min, minWidth: min };
}

const styles = StyleSheet.create({
  glass: {
    backgroundColor: DesktopColors.glass,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Hairline.medium,
    padding: Spacing['2xl'],
    ...Elevation.sm,
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' } as any : {}),
  },
  sectionLabel: {
    fontSize: FontSize.labelMd,
    fontWeight: '700',
    color: Colors.smallLabel,
    letterSpacing: 1.3,
    lineHeight: LineHeight.labelMd,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
  },
  chip: {
    borderRadius: BorderRadius.full,
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  chipText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  metricCard: {
    backgroundColor: DesktopColors.glass,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Hairline.medium,
    padding: Spacing.lg,
    minWidth: 0,
    ...Elevation.sm,
  },
  metricTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.smallLabel,
    letterSpacing: 0.8,
    flex: 1,
    marginRight: 6,
  },
  metricValue: {
    fontSize: FontSize.titleMd,
    fontWeight: '800',
    letterSpacing: -0.2,
    ...monoText,
  },
  metricMeta: {
    fontSize: 10,
    color: Colors.muted,
    marginTop: 4,
    letterSpacing: 0.2,
  },
  metricHint: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    marginTop: 5,
    lineHeight: 15,
    opacity: 0.85,
  },
  statCell: {
    flex: 1,
    minWidth: 90,
    backgroundColor: DesktopColors.glass,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Hairline.medium,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    ...Elevation.sm,
  },
  statValue: {
    fontSize: FontSize.titleMd,
    fontWeight: '800',
    letterSpacing: -0.2,
    ...monoText,
  },
  tabStat: {
    flex: 1,
    minWidth: 92,
    backgroundColor: DesktopColors.glass,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Hairline.medium,
    borderLeftWidth: 2,
    borderLeftColor: Hairline.accentSoft,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    ...Elevation.sm,
  },
  tabStatLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.smallLabel,
    letterSpacing: 1,
  },
  tabStatSub: {
    fontSize: 9,
    color: Colors.muted,
    marginTop: 3,
    letterSpacing: 0.2,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.smallLabel,
    letterSpacing: 0.8,
    marginTop: 4,
    textAlign: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'rgba(216,227,252,0.03)',
  },
  pillIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  pillLabel: {
    fontSize: FontSize.bodyMd,
    fontWeight: '600',
    color: Colors.muted,
    letterSpacing: 0.1,
  },
  pillSub: {
    fontSize: 10,
    color: Colors.smallLabel,
    marginTop: 2,
    letterSpacing: 0.2,
  },
});
