import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { desktopStyles } from '../../theme/desktopStyles';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery';
import {
  getTodayMetrics,
  getStreak,
  getTodayDeepWorkHours,
  startDeepWork,
  stopDeepWork,
} from '../../lib/supabase';
import type { TodayMetrics } from '../../lib/supabase';

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

function ProgressBar({ value, color, height = 4 }: { value: number; color: string; height?: number }) {
  return (
    <View style={{ height, backgroundColor: Colors.surfaceContainerHighest, borderRadius: height / 2, overflow: 'hidden' }}>
      <View style={{ width: `${Math.min(value, 100)}%`, backgroundColor: color, height, borderRadius: height / 2 }} />
    </View>
  );
}

function MetricCard({ label, value, unit, color, loading }: { label: string; value: string; unit?: string; color: string; loading?: boolean }) {
  return (
    <View style={{
      backgroundColor: Colors.surfaceContainerLow,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      borderLeftWidth: 3,
      borderLeftColor: color,
    }}>
      <Text style={{ fontSize: FontSize.labelSm, fontWeight: '600', color: Colors.muted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: Spacing.xs }}>
        {label}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        {loading ? (
          <ActivityIndicator size="small" color={color} />
        ) : (
          <>
            <Text style={{ fontSize: FontSize.headlineSm, fontWeight: '800', color }}>{value}</Text>
            {unit && <Text style={{ fontSize: FontSize.labelSm, fontWeight: '600', color: Colors.muted, marginLeft: 4, textTransform: 'uppercase' }}>{unit}</Text>}
          </>
        )}
      </View>
    </View>
  );
}

/**
 * Desktop Home Content — same data as HomeScreen, but with 4-column metrics grid
 * and wider layout that takes advantage of horizontal space.
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
  const displayDeepWork = metricsLoading ? '...' : String(Math.round(liveDeepWorkHours * 10) / 10);
  const timerHours = Math.floor(timerSeconds / 3600);
  const timerMins = Math.floor((timerSeconds % 3600) / 60);
  const timerSecs = timerSeconds % 60;
  const timerPresetTotal = 5 * 60 * 60;
  const timerProgress = Math.min((timerSeconds / timerPresetTotal) * 100, 100);

  const milestones = [
    { title: 'Top 50 MIR 2030', opacity: 1.0 },
    { title: 'Fellowship Mayo 2035', opacity: 0.6 },
    { title: 'Residencia 2037–2041', opacity: 0.3 },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.surface }}
      contentContainerStyle={desktopStyles.centerScrollContent}
    >
      {/* Header */}
      <View style={{ marginBottom: Spacing['3xl'] }}>
        <Text style={{ fontSize: FontSize.headlineLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5, marginBottom: Spacing.xs }}>
          {greeting}, Joseph MD
        </Text>
        <Text style={{ fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant }}>
          Dermatologist · Mayo Clinic · Rochester, MN
        </Text>
      </View>

      {/* Career Milestones */}
      <Text style={{ fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.md }}>
        CAREER MILESTONES
      </Text>
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: Spacing.section }}>
        {milestones.map((m, i) => (
          <View key={i} style={{
            flex: 1,
            backgroundColor: Colors.surfaceContainerLow,
            borderRadius: BorderRadius.md,
            padding: Spacing.md,
            opacity: m.opacity,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.blue, marginRight: Spacing.md }} />
            <Text style={{ fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '500', flex: 1 }}>{m.title}</Text>
            {i === 0 && (
              <View style={{ backgroundColor: Colors.blue + '20', borderRadius: 999, paddingVertical: 2, paddingHorizontal: 8 }}>
                <Text style={{ fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.blue, letterSpacing: 0.5 }}>ACTIVE</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Countdown */}
      <View style={{ backgroundColor: Colors.surfaceContainer, borderRadius: BorderRadius.lg, padding: Spacing.xl, marginBottom: Spacing.section, alignItems: 'center' }}>
        <Text style={{ fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.lg }}>
          DÍAS PARA MIR 2030
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {[
            { num: countdown.days, unit: 'DÍAS' },
            { num: countdown.hours, unit: 'HRS' },
            { num: countdown.mins, unit: 'MIN' },
          ].map((block, i) => (
            <React.Fragment key={i}>
              {i > 0 && <Text style={{ fontSize: FontSize.headlineSm, fontWeight: '300', color: Colors.muted, marginHorizontal: Spacing.sm }}>:</Text>}
              <View style={{ alignItems: 'center', minWidth: 64 }}>
                <Text style={{ fontSize: FontSize.displaySm, fontWeight: '800', color: Colors.blue, letterSpacing: -1 }}>{block.num}</Text>
                <Text style={{ fontSize: FontSize.labelSm, fontWeight: '600', color: Colors.muted, letterSpacing: 1, marginTop: 2 }}>{block.unit}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Metrics Grid 4 columns */}
      <Text style={{ fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.md }}>
        MÉTRICAS EN VIVO
      </Text>
      <View style={desktopStyles.metricsGrid4}>
        <View style={desktopStyles.metricGridItem4}>
          <MetricCard label="Tarjetas hoy" value={String(metrics.cards)} color={Colors.teal} loading={metricsLoading} />
        </View>
        <View style={desktopStyles.metricGridItem4}>
          <MetricCard label="Deep Work" value={displayDeepWork} unit="hrs" color={Colors.amber} loading={metricsLoading} />
        </View>
        <View style={desktopStyles.metricGridItem4}>
          <MetricCard label="Dominio MIR" value={String(metrics.dominioMIR)} unit="%" color={Colors.blue} loading={metricsLoading} />
        </View>
        <View style={desktopStyles.metricGridItem4}>
          <MetricCard label="Publicaciones" value="0/10" color={Colors.green} />
        </View>
      </View>

      {/* Deep Work Timer */}
      <View style={{ backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.xl, marginBottom: Spacing.section }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg }}>
          <Text style={{ fontSize: FontSize.titleMd, fontWeight: '600', color: Colors.onSurface }}>Deep Work Timer</Text>
          <Text style={{ fontSize: FontSize.labelSm, color: Colors.amber, fontWeight: '600', letterSpacing: 0.5 }}>07:45 – 12:45</Text>
        </View>
        <View style={{ alignItems: 'center', marginBottom: Spacing.lg }}>
          <Text style={{ fontSize: 48, fontWeight: '200', color: Colors.amber, letterSpacing: 2 }}>
            {String(timerHours).padStart(2, '0')}:{String(timerMins).padStart(2, '0')}:{String(timerSecs).padStart(2, '0')}
          </Text>
        </View>
        <ProgressBar value={timerProgress} color={Colors.amber} height={6} />
        <Text style={{ fontSize: FontSize.labelSm, color: Colors.muted, textAlign: 'center', marginTop: Spacing.sm }}>
          Acumulado hoy: {Math.round(liveDeepWorkHours * 10) / 10}h
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: timerRunning ? Colors.coral : Colors.amber,
            borderRadius: BorderRadius.md,
            paddingVertical: Spacing.md,
            alignItems: 'center',
            marginTop: Spacing.md,
          }}
          onPress={handleTimerToggle}
        >
          <Text style={{ color: '#0B1628', fontSize: FontSize.labelLg, fontWeight: '700', letterSpacing: 1 }}>
            {timerRunning ? '■  STOP' : '▶  START'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Streak */}
      <View style={{
        backgroundColor: Colors.surfaceContainerLow,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.section,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Text style={{ fontSize: 32, marginRight: Spacing.md }}>🔥</Text>
        <View>
          <Text style={{ fontSize: FontSize.headlineSm, fontWeight: '800', color: Colors.amber }}>{streak} días</Text>
          <Text style={{ fontSize: FontSize.labelSm, fontWeight: '600', color: Colors.muted, letterSpacing: 1 }}>RACHA ACTUAL</Text>
        </View>
      </View>
    </ScrollView>
  );
}
