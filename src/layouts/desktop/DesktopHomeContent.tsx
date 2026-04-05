import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, FontSize, BorderRadius, MetricColors } from '../../theme/tokens';
import { desktopStyles, DesktopColors } from '../../theme/desktopStyles';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery';
import {
  getTodayMetrics,
  getStreak,
  getTodayDeepWorkHours,
  startDeepWork,
  stopDeepWork,
} from '../../lib/supabase';
import type { TodayMetrics } from '../../lib/supabase';
import GlassCard from '../../components/GlassCard';
import AnimatedCounter from '../../components/AnimatedCounter';
import CircularProgress from '../../components/CircularProgress';
import { PulseDash } from '../../components/SkeletonLoader';

// Recharts sparkline — web only
let AreaChart: any, Area: any, ResponsiveContainer: any;
try {
  const recharts = require('recharts');
  AreaChart = recharts.AreaChart;
  Area = recharts.Area;
  ResponsiveContainer = recharts.ResponsiveContainer;
} catch {}

const TIMER_STORAGE_KEY = '@joseph_md_deep_work_seconds';
const TIMER_START_KEY = '@joseph_md_deep_work_start';
const TIMER_SESSION_KEY = '@joseph_md_deep_work_session_id';

function getCountdown(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
  };
}

// Empty sparkline data (7 points)
const EMPTY_SPARKLINE = [
  { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 0 },
];

function MiniSparkline({ color, data }: { color: string; data?: { v: number }[] }) {
  const isEmpty = !data || data.every(d => d.v === 0);

  if (!AreaChart || !ResponsiveContainer) return null;

  return (
    <View style={{ height: 24, marginTop: 6, opacity: isEmpty ? 0.3 : 1 }}>
      <ResponsiveContainer width="100%" height={24}>
        <AreaChart data={data || EMPTY_SPARKLINE} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            fill={color}
            fillOpacity={0.1}
            strokeDasharray={isEmpty ? '4 4' : undefined}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </View>
  );
}

function MetricCard({
  label, value, unit, color, loading, sparkData,
}: {
  label: string; value: number; unit?: string; color: string; loading?: boolean;
  sparkData?: { v: number }[];
}) {
  const [hovered, setHovered] = useState(false);
  const webHover = Platform.OS === 'web'
    ? { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }
    : {};
  const webStyle = Platform.OS === 'web'
    ? {
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        ...(hovered ? { borderColor: 'rgba(255,255,255,0.15)', transform: [{ scale: 1.02 }] } : {}),
      }
    : {};

  return (
    <View
      style={[{
        backgroundColor: DesktopColors.glass,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: DesktopColors.glassBorder,
        padding: 24,
        borderLeftWidth: 4,
        borderLeftColor: color,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4,
      }, webStyle as any]}
      {...webHover}
    >
      <Text style={{
        fontSize: 11, fontWeight: '500', color: Colors.smallLabel,
        letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: Spacing.xs,
      }}>
        {label}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        {loading ? (
          <PulseDash color={color} size={24} />
        ) : (
          <>
            <AnimatedCounter
              value={value}
              decimals={unit === 'hrs' ? 1 : 0}
              style={{ fontSize: 48, fontWeight: '700', color }}
            />
            {unit && (
              <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.smallLabel, marginLeft: 4, textTransform: 'uppercase' }}>
                {unit}
              </Text>
            )}
          </>
        )}
      </View>
      <MiniSparkline color={color} data={sparkData} />
    </View>
  );
}

/**
 * Desktop Home Content — Premium Design v2.0
 * Animated counters, glassmorphism cards, circular progress timer,
 * open counters (no artificial limits).
 */
export default function DesktopHomeContent() {
  const [countdown, setCountdown] = useState(getCountdown(new Date('2030-01-01')));
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [dwSessionId, setDwSessionId] = useState<string | null>(null);
  const [dwAccumulatedHours, setDwAccumulatedHours] = useState(0);

  const { data: metrics, loading: metricsLoading, refetch: refetchMetrics } = useSupabaseQuery<TodayMetrics>(
    getTodayMetrics,
    { cards: 0, deepWorkHours: 0, dominioMIR: 0 },
  );
  const { data: streak } = useSupabaseQuery(getStreak, 0);

  useEffect(() => {
    (async () => {
      const savedStart = await AsyncStorage.getItem(TIMER_START_KEY);
      const savedSession = await AsyncStorage.getItem(TIMER_SESSION_KEY);
      const savedSeconds = await AsyncStorage.getItem(TIMER_STORAGE_KEY);
      if (savedStart) {
        const startTime = parseInt(savedStart, 10);
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setTimerSeconds(elapsed);
        setTimerRunning(true);
        if (savedSession) setDwSessionId(savedSession);
      } else if (savedSeconds) {
        setTimerSeconds(parseInt(savedSeconds, 10));
      }
      const hours = await getTodayDeepWorkHours();
      setDwAccumulatedHours(hours);
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdown(new Date('2030-01-01'))), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning) interval = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleTimerToggle = async () => {
    if (timerRunning) {
      setTimerRunning(false);
      AsyncStorage.setItem(TIMER_STORAGE_KEY, String(timerSeconds));
      AsyncStorage.removeItem(TIMER_START_KEY);
      AsyncStorage.removeItem(TIMER_SESSION_KEY);
      if (dwSessionId) {
        await stopDeepWork(dwSessionId);
        setDwSessionId(null);
      }
      const hours = await getTodayDeepWorkHours();
      setDwAccumulatedHours(hours);
      refetchMetrics();
    } else {
      const now = Date.now();
      setTimerRunning(true);
      setTimerSeconds(0);
      AsyncStorage.setItem(TIMER_START_KEY, String(now));
      AsyncStorage.removeItem(TIMER_STORAGE_KEY);
      const sessionId = await startDeepWork();
      if (sessionId) {
        setDwSessionId(sessionId);
        AsyncStorage.setItem(TIMER_SESSION_KEY, sessionId);
      }
    }
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';
  const liveDeepWorkHours = dwAccumulatedHours + (timerSeconds / 3600);
  const timerHours = Math.floor(timerSeconds / 3600);
  const timerMins = Math.floor((timerSeconds % 3600) / 60);
  const timerSecs = timerSeconds % 60;
  const timerPresetTotal = 5 * 60 * 60;
  const timerProgress = Math.min((timerSeconds / timerPresetTotal) * 100, 100);
  const accumProgress = Math.min((liveDeepWorkHours / 5) * 100, 100);

  const milestones = [
    { title: 'Top 50 MIR 2030', opacity: 1.0, color: Colors.coral },
    { title: 'Fellowship Mayo 2035', opacity: 0.7, color: Colors.blue },
    { title: 'Residencia 2037–2041', opacity: 0.4, color: Colors.teal },
  ];

  const webBtnTransition = Platform.OS === 'web'
    ? { transition: 'all 0.2s ease', cursor: 'pointer' as any }
    : {};

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.surface }}
      contentContainerStyle={desktopStyles.centerScrollContent}
    >
      {/* Header */}
      <View style={{ marginBottom: Spacing['3xl'] }}>
        <Text style={desktopStyles.pageTitle}>
          {greeting}, Joseph MD
        </Text>
        <Text style={[desktopStyles.bodyText, { color: Colors.onSurfaceVariant, marginTop: 4 }]}>
          Dermatologist · Mayo Clinic · Rochester, MN
        </Text>
      </View>

      {/* Career Milestones */}
      <Text style={desktopStyles.sectionHeader}>CAREER MILESTONES</Text>
      <View style={desktopStyles.milestonesRow}>
        {milestones.map((m, i) => (
          <GlassCard key={i} style={{ flex: 1, opacity: m.opacity, flexDirection: 'row', alignItems: 'center', borderLeftWidth: 4, borderLeftColor: m.color, marginBottom: 0 } as any}>
            <Text style={{ fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '500', flex: 1 }}>{m.title}</Text>
            {i === 0 && (
              <View style={{ backgroundColor: m.color + '20', borderRadius: 999, paddingVertical: 2, paddingHorizontal: 8 }}>
                <Text style={{ fontSize: FontSize.labelSm, fontWeight: '700', color: m.color, letterSpacing: 0.5 }}>ACTIVE</Text>
              </View>
            )}
          </GlassCard>
        ))}
      </View>

      {/* Countdown */}
      <GlassCard style={{ alignItems: 'center', marginBottom: Spacing.section } as any}>
        <Text style={{
          fontSize: 13, fontWeight: '600', color: Colors.muted,
          letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.lg,
        }}>
          DÍAS PARA MIR 2030
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: 'center', minWidth: 140 }}>
            <AnimatedCounter
              value={countdown.days}
              style={{ fontSize: 72, fontWeight: '700', color: Colors.teal, letterSpacing: -2 }}
            />
            <Text style={{ fontSize: 10, fontWeight: '600', color: Colors.smallLabel, letterSpacing: 1, marginTop: 2 }}>DÍAS</Text>
          </View>
          {[
            { num: countdown.hours, unit: 'HRS' },
            { num: countdown.mins, unit: 'MIN' },
          ].map((block, i) => (
            <React.Fragment key={i}>
              <Text style={{ fontSize: FontSize.headlineSm, fontWeight: '300', color: Colors.muted, marginHorizontal: Spacing.sm }}>:</Text>
              <View style={{ alignItems: 'center', minWidth: 72 }}>
                <AnimatedCounter
                  value={block.num}
                  style={{ fontSize: 40, fontWeight: '800', color: Colors.blue, letterSpacing: -1 }}
                />
                <Text style={{ fontSize: 10, fontWeight: '600', color: Colors.smallLabel, letterSpacing: 1, marginTop: 2 }}>{block.unit}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>
      </GlassCard>

      {/* Metrics Row — single row, wraps on narrow widths */}
      <Text style={desktopStyles.sectionHeader}>MÉTRICAS EN VIVO</Text>
      <View style={desktopStyles.metricsRow}>
        <View style={desktopStyles.metricsRowItem}>
          <MetricCard label="Tarjetas hoy" value={metrics.cards} color={MetricColors.tarjetas} loading={metricsLoading} />
        </View>
        <View style={desktopStyles.metricsRowItem}>
          <MetricCard label="Deep Work" value={Math.round(liveDeepWorkHours * 10) / 10} unit="hrs" color={MetricColors.deepWork} loading={metricsLoading} />
        </View>
        <View style={desktopStyles.metricsRowItem}>
          <MetricCard label="Dominio MIR" value={metrics.dominioMIR} unit="%" color={MetricColors.dominio} loading={metricsLoading} />
        </View>
        <View style={desktopStyles.metricsRowItem}>
          {/* Open counter, no "/10" limit */}
          <MetricCard label="Publicaciones" value={0} color={MetricColors.publicaciones} />
        </View>
      </View>

      {/* Deep Work Timer — PREMIUM with Circular Progress Ring */}
      <GlassCard style={{ marginBottom: Spacing.section }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {timerRunning && (
              <View style={{
                width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.amber,
                marginRight: 8,
                // Pulsing via opacity animation would need Animated — using static glow for now
              }} />
            )}
            <Text style={desktopStyles.cardTitle}>Deep Work Timer</Text>
          </View>
          <Text style={{ fontSize: FontSize.labelSm, color: Colors.amber, fontWeight: '600', letterSpacing: 0.5 }}>07:45 – 12:45</Text>
        </View>

        {/* Circular Progress Ring + Timer */}
        <View style={{ alignItems: 'center', marginBottom: Spacing.xl }}>
          <CircularProgress
            progress={timerProgress}
            size={180}
            strokeWidth={10}
            color={Colors.amber}
            trackColor="rgba(255,255,255,0.06)"
          >
            <Text style={{
              fontSize: 44,
              fontWeight: '200',
              color: timerRunning ? Colors.amber : Colors.onSurface,
              letterSpacing: 2,
              fontFamily: Platform.OS === 'web' ? "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace" : undefined,
              fontVariant: ['tabular-nums'],
            } as any}>
              {String(timerHours).padStart(2, '0')}:{String(timerMins).padStart(2, '0')}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: '300', color: Colors.muted, letterSpacing: 2, fontVariant: ['tabular-nums'] }}>
              {String(timerSecs).padStart(2, '0')}
            </Text>
          </CircularProgress>
        </View>

        {/* Accumulated today progress bar toward 5h */}
        <View style={{ marginBottom: Spacing.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={desktopStyles.smallLabel}>Acumulado hoy</Text>
            <Text style={desktopStyles.smallLabel}>{Math.round(liveDeepWorkHours * 10) / 10}h / 5h</Text>
          </View>
          <View style={{ height: 6, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
            <View style={{
              height: 6,
              width: `${accumProgress}%`,
              backgroundColor: Colors.amber,
              borderRadius: 3,
              ...(Platform.OS === 'web' ? { transition: 'width 0.3s ease' } : {}),
            } as any} />
          </View>
        </View>

        {/* START/STOP Button — Gradient teal with glow */}
        <TouchableOpacity
          style={[{
            backgroundColor: timerRunning ? Colors.coral : Colors.teal,
            borderRadius: 12,
            paddingVertical: 14,
            alignItems: 'center',
            marginTop: Spacing.md,
            ...(Platform.OS === 'web' && !timerRunning ? {
              boxShadow: '0 0 20px rgba(15, 212, 160, 0.3)',
            } : {}),
          }, webBtnTransition as any]}
          onPress={handleTimerToggle}
        >
          <Text style={{ color: '#0B1628', fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: 1.5 }}>
            {timerRunning ? '■  STOP' : '▶  START DEEP WORK'}
          </Text>
        </TouchableOpacity>
      </GlassCard>

      {/* Streak */}
      <GlassCard style={{ flexDirection: 'row', alignItems: 'center' } as any}>
        <Text style={{ fontSize: 32, marginRight: Spacing.md }}>🔥</Text>
        <View>
          <AnimatedCounter
            value={streak}
            style={{ fontSize: FontSize.headlineSm, fontWeight: '800', color: Colors.amber }}
            suffix=" días"
          />
          <Text style={[desktopStyles.smallLabel, { letterSpacing: 1 }]}>RACHA ACTUAL</Text>
        </View>
      </GlassCard>
    </ScrollView>
  );
}
