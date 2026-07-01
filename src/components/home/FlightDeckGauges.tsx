import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Hairline, MetricColors } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import CircularProgress from '../CircularProgress';
import AnimatedCounter from '../AnimatedCounter';
import { PulseDash } from '../SkeletonLoader';

/**
 * FlightDeckGauges — el cluster de 3 instrumentos primarios del cockpit (Home).
 * Deep Work es el GAUGE-FIRMA en ORO champagne (no amber prestado); Cards y
 * MIR Mastery lo acompañan como lecturas secundarias. Debajo, quick-actions
 * (APEX / DICTATE) siempre accesibles — el Home operable, no solo mirable.
 *
 * Toda la lógica del timer vive en el padre (AsyncStorage/Supabase); aquí solo
 * pintamos el gauge y disparamos los handlers que nos pasan.
 */

const MONO = Platform.OS === 'web' ? "'JetBrains Mono', 'SF Mono', monospace" : undefined;
const GOLD = Colors.gold;

interface MiniGaugeProps {
  label: string;
  value: number;
  unit?: string;
  color: string;
  loading?: boolean;
  decimals?: number;
}

function MiniGauge({ label, value, unit, color, loading, decimals = 0 }: MiniGaugeProps) {
  return (
    <View style={st.miniGauge}>
      <Text style={st.miniLabel}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 2 }}>
        {loading ? (
          <PulseDash color={color} size={20} />
        ) : (
          <>
            <AnimatedCounter
              value={value}
              decimals={decimals}
              style={{ fontSize: 30, fontWeight: '200', color, letterSpacing: 0.5, fontFamily: MONO, fontVariant: ['tabular-nums'] } as any}
            />
            {unit ? <Text style={st.miniUnit}>{unit}</Text> : null}
          </>
        )}
      </View>
    </View>
  );
}

export interface FlightDeckGaugesProps {
  timerRunning: boolean;
  timerProgress: number;      // 0-100
  timerHours: number;
  timerMins: number;
  timerSecs: number;
  liveDeepWorkHours: number;
  accumProgress: number;      // 0-100 toward 5h
  cards: number;
  dominioMIR: number;
  metricsLoading?: boolean;
  onTimerToggle: () => void;
  onApex?: () => void;        // APEX 1-TAP (mobile; en desktop vive en el sidebar)
  onDictate?: () => void;     // DICTATE ERROR (mobile)
}

export default function FlightDeckGauges(p: FlightDeckGaugesProps) {
  const webBtn = Platform.OS === 'web' ? ({ transition: 'all 0.2s ease', cursor: 'pointer' } as any) : {};

  return (
    <View style={st.wrap}>
      {/* Header del cluster */}
      <View style={st.head}>
        <View style={st.railGold} />
        <Text style={st.title}>DEEP WORK · PRIMARY GAUGE</Text>
        <Text style={st.window}>07:45–12:45</Text>
      </View>

      {/* Gauge-firma: Deep Work ring en ORO */}
      <View style={st.ringWrap}>
        <CircularProgress
          progress={p.timerProgress}
          size={148}
          strokeWidth={9}
          color={GOLD}
          trackColor="rgba(200,169,106,0.10)"
        >
          <Text style={[st.ringTime, { color: p.timerRunning ? GOLD : Colors.onSurface }]}>
            {String(p.timerHours).padStart(2, '0')}:{String(p.timerMins).padStart(2, '0')}
          </Text>
          <Text style={st.ringSecs}>{String(p.timerSecs).padStart(2, '0')}</Text>
        </CircularProgress>
      </View>

      {/* Barra acumulado hacia 5h */}
      <View style={{ marginBottom: Spacing.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <Text style={st.accumLabel}>Accumulated today</Text>
          <Text style={st.accumVal}>{Math.round(p.liveDeepWorkHours * 10) / 10}h / 5h</Text>
        </View>
        <View style={st.track}>
          <View style={[st.trackFill, { width: `${p.accumProgress}%` }, Platform.OS === 'web' ? ({ transition: 'width 0.3s ease' } as any) : {}]} />
        </View>
      </View>

      {/* START / STOP */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={p.onTimerToggle}
        style={[st.cta, p.timerRunning ? st.ctaStop : st.ctaGo, webBtn]}
      >
        <Text style={[st.ctaTxt, { color: p.timerRunning ? '#FFFFFF' : '#0A0F1C' }]}>
          {p.timerRunning ? '■  STOP' : '▶  START DEEP WORK'}
        </Text>
      </TouchableOpacity>

      {/* Instrumentos secundarios */}
      <View style={st.gaugeRow}>
        <MiniGauge label="CARDS TODAY" value={p.cards} color={MetricColors.tarjetas} loading={p.metricsLoading} />
        <View style={st.gaugeDiv} />
        <MiniGauge label="MIR MASTERY" value={p.dominioMIR} unit="%" color={MetricColors.dominio} loading={p.metricsLoading} />
      </View>

      {/* Quick actions — command palette del flight deck (mobile; en desktop viven en el sidebar) */}
      {(p.onApex || p.onDictate) && (
        <View style={st.quickRow}>
          {p.onApex && (
            <TouchableOpacity activeOpacity={0.85} onPress={p.onApex} style={[st.quickBtn, { borderColor: Colors.blue + '66' }, webBtn]}>
              <Text style={[st.quickTxt, { color: Colors.blue }]}>⚡ APEX 1-TAP</Text>
            </TouchableOpacity>
          )}
          {p.onDictate && (
            <TouchableOpacity activeOpacity={0.85} onPress={p.onDictate} style={[st.quickBtn, { borderColor: Colors.purple + '66' }, webBtn]}>
              <Text style={[st.quickTxt, { color: Colors.purple }]}>🎙 DICTATE ERROR</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  wrap: {
    backgroundColor: DesktopColors.glass,
    borderRadius: BorderRadius.xl,
    borderWidth: 1, borderColor: Hairline.soft,
    borderTopWidth: 2, borderTopColor: Hairline.accentSoft,   // firma ORO
    padding: Spacing.xl,
  },
  head: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: Spacing.md },
  railGold: { width: 3, height: 12, borderRadius: 2, backgroundColor: GOLD },
  title: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.2, fontFamily: MONO },
  window: { marginLeft: 'auto', fontSize: 10, fontWeight: '700', color: GOLD, letterSpacing: 0.5, fontVariant: ['tabular-nums'], fontFamily: MONO },

  ringWrap: { alignItems: 'center', marginBottom: Spacing.lg, marginTop: Spacing.xs },
  ringTime: {
    fontSize: 38, fontWeight: '200', letterSpacing: 2,
    fontFamily: MONO, fontVariant: ['tabular-nums'],
  } as any,
  ringSecs: { fontSize: 16, fontWeight: '300', color: Colors.muted, letterSpacing: 2, fontVariant: ['tabular-nums'], fontFamily: MONO } as any,

  accumLabel: { fontSize: 10, color: Colors.smallLabel, fontWeight: '600', letterSpacing: 0.4 },
  accumVal: { fontSize: 10, color: Colors.onSurfaceVariant, fontWeight: '700', letterSpacing: 0.3, fontVariant: ['tabular-nums'], fontFamily: MONO } as any,
  track: { height: 6, backgroundColor: 'rgba(200,169,106,0.10)', borderRadius: 3, overflow: 'hidden' },
  trackFill: { height: 6, backgroundColor: GOLD, borderRadius: 3 },

  cta: { borderRadius: BorderRadius.lg, paddingVertical: 13, alignItems: 'center', marginBottom: Spacing.lg },
  ctaGo: {
    backgroundColor: GOLD,
    ...(Platform.OS === 'web' ? { boxShadow: '0 0 22px rgba(200,169,106,0.28)' } as any : {}),
  },
  ctaStop: { backgroundColor: Colors.coral },
  ctaTxt: { fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: 1.4 },

  gaugeRow: {
    flexDirection: 'row', alignItems: 'center',
    borderTopWidth: 1, borderTopColor: Hairline.soft,
    paddingTop: Spacing.md, marginBottom: Spacing.md,
  },
  miniGauge: { flex: 1 },
  miniLabel: { fontSize: 9, fontWeight: '700', color: Colors.smallLabel, letterSpacing: 1, fontFamily: MONO },
  miniUnit: { fontSize: 10, fontWeight: '700', color: Colors.muted, marginLeft: 3, textTransform: 'uppercase' },
  gaugeDiv: { width: 1, height: 40, backgroundColor: Hairline.soft, marginHorizontal: Spacing.md },

  quickRow: { flexDirection: 'row', gap: 8 },
  quickBtn: {
    flex: 1, borderWidth: 1, borderRadius: BorderRadius.lg,
    paddingVertical: 10, alignItems: 'center',
    backgroundColor: 'rgba(231,234,242,0.02)',
  },
  quickTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.6 },
});
