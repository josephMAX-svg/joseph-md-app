import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import CircularProgress from '../CircularProgress';
import { useMountProgress } from '../empresa/visuals';

/**
 * ReadinessBar — el COMMAND BAR de banca (firma del segmento MIR+USMLE).
 * Terminal de operaciones de examen: Día X/N · % temario · racha · GAUGE de readiness.
 * El oro-firma (#C8A96A) es el hilo transversal que une las dos "mesas de país"
 * (readiness/peso/racha); el acento de país (jade USMLE / ámbar MIR) tiñe el gauge.
 *
 * Puramente presentacional: recibe valores ya calculados por el Hub. No toca datos,
 * progreso ni localStorage. Números tabulares (aire de terminal financiero clínico).
 * v5.6-Palmerton (5-sep-2026): stats opcionales `media7d` (media móvil 7 días de la eval timed) y
 * `onTrack` (distancia al mínimo on-track del próximo hito) — solo se pintan si el Hub tiene datos.
 */
const GOLD = Colors.gold;
const isWeb = Platform.OS === 'web';
const tabular = isWeb ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {};

export interface ReadinessStat { label: string; value: string; hint?: string; accent?: string; }

export function ConsoleStat({ label, value, hint, accent = GOLD }: ReadinessStat) {
  return (
    <View style={st.stat}>
      <Text style={st.statLabel} numberOfLines={1}>{label}</Text>
      <Text style={[st.statValue, { color: accent }, tabular]} numberOfLines={1}>{value}</Text>
      {hint ? <Text style={st.statHint} numberOfLines={1}>{hint}</Text> : null}
    </View>
  );
}

export default function ReadinessBar({
  flag, title, subtitle, accent,
  dia, total, temarioPct, racha, readinessPct, readinessLabel,
  extraStat, media7d, onTrack,
}: {
  flag: string; title: string; subtitle: string; accent: string;
  dia: number; total: number; temarioPct: number; racha?: string;
  readinessPct: number; readinessLabel: string;
  extraStat?: ReadinessStat;
  /** media móvil 7d (usmleScores.mediaMovil7d) — opcional, solo con datos */
  media7d?: ReadinessStat | null;
  /** distancia al mínimo on-track del próximo hito (usmleScores.distanciaOnTrack) — opcional, solo con datos */
  onTrack?: ReadinessStat | null;
}) {
  const gauge = useMountProgress(Math.max(0, Math.min(100, readinessPct)));
  return (
    <View style={[st.bar, isWeb ? ({ position: 'sticky', top: 0, zIndex: 5 } as any) : null, { borderColor: accent + '30' }]}>
      {/* hilo de oro superior — la firma transversal de banca */}
      <View style={st.goldThread} />
      <View style={st.grid}>
        {/* identidad de la consola (bandera + país) */}
        <View style={st.ident}>
          <Text style={st.flag}>{flag}</Text>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={st.title} numberOfLines={1}>{title}</Text>
            <Text style={[st.subtitle, { color: accent }]} numberOfLines={1}>{subtitle}</Text>
          </View>
        </View>

        {/* métricas transversales (oro) */}
        <View style={st.stats}>
          <ConsoleStat label="DÍA" value={`${dia}/${total}`} hint="del plan" />
          <View style={st.divider} />
          <ConsoleStat label="TEMARIO" value={`${temarioPct}%`} hint="cubierto" />
          {racha ? (<><View style={st.divider} /><ConsoleStat label="RACHA" value={racha} hint="constancia" /></>) : null}
          {extraStat ? (<><View style={st.divider} /><ConsoleStat {...extraStat} /></>) : null}
          {media7d ? (<><View style={st.divider} /><ConsoleStat {...media7d} /></>) : null}
          {onTrack ? (<><View style={st.divider} /><ConsoleStat {...onTrack} /></>) : null}
        </View>

        {/* GAUGE de readiness (acento de país) */}
        <View style={st.gauge}>
          <CircularProgress progress={gauge} size={62} strokeWidth={6} color={accent} trackColor="rgba(231,234,242,0.08)">
            <Text style={[st.gaugeNum, { color: accent }, tabular]}>{readinessPct}%</Text>
          </CircularProgress>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={st.gaugeLbl}>READINESS</Text>
            <Text style={st.gaugeHint} numberOfLines={2}>{readinessLabel}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  bar: {
    backgroundColor: DesktopColors.glass,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    ...Elevation.md,
    ...(isWeb ? { backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' } as any : {}),
  },
  goldThread: {
    height: 2,
    backgroundColor: GOLD,
    ...(isWeb ? ({ backgroundImage: `linear-gradient(90deg, transparent, ${GOLD}, ${Colors.champagne}, transparent)` } as any) : {}),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  ident: { flexDirection: 'row', alignItems: 'center', gap: 10, flexGrow: 1, flexBasis: 200, minWidth: 180 },
  flag: { fontSize: 26 },
  title: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.4 },
  subtitle: { fontSize: FontSize.labelSm, fontWeight: '700', letterSpacing: 0.2, marginTop: 2 },

  stats: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flexGrow: 1, flexWrap: 'wrap' },
  divider: { width: 1, height: 30, backgroundColor: Hairline.medium },
  stat: { minWidth: 56 },
  statLabel: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1 },
  statValue: { fontSize: FontSize.titleMd, fontWeight: '800', letterSpacing: -0.5, marginTop: 2 },
  statHint: { fontSize: 9, color: Colors.muted, marginTop: 1, letterSpacing: 0.2 },

  gauge: { flexDirection: 'row', alignItems: 'center', gap: 10, flexGrow: 1, flexBasis: 190, minWidth: 170,
    borderLeftWidth: 1, borderLeftColor: Hairline.medium, paddingLeft: Spacing.md,
    ...(isWeb ? { transition: Motion.base } as any : {}) },
  gaugeNum: { fontSize: 15, fontWeight: '800', letterSpacing: -0.4 },
  gaugeLbl: { fontSize: 9, fontWeight: '800', color: GOLD, letterSpacing: 1.2 },
  gaugeHint: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 14 },
});
