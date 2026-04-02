import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';

const TIMER_STORAGE_KEY = '@joseph_md_deep_work_seconds';

// ─── Countdown helper ───
function getCountdown(target: Date): { days: number; hours: number; mins: number } {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
  };
}

// ─── Progress Bar ───
function ProgressBar({ value, color, height = 4 }: { value: number; color: string; height?: number }) {
  return (
    <View style={[styles.progressTrack, { height }]}>
      <View style={[styles.progressValue, { width: `${Math.min(value, 100)}%`, backgroundColor: color, height }]} />
    </View>
  );
}

// ─── Metric Card ───
function MetricCard({ label, value, unit, color }: { label: string; value: string; unit?: string; color: string }) {
  return (
    <View style={[styles.metricCard, { borderLeftColor: color, borderLeftWidth: 3 }]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <View style={styles.metricRow}>
        <Text style={[styles.metricValue, { color }]}>{value}</Text>
        {unit && <Text style={styles.metricUnit}>{unit}</Text>}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [countdown, setCountdown] = useState(getCountdown(new Date('2030-01-01')));
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const streak = 0; // hardcoded to 0

  // Load saved timer on mount
  useEffect(() => {
    AsyncStorage.getItem(TIMER_STORAGE_KEY).then(val => {
      if (val) setTimerSeconds(parseInt(val, 10));
    });
  }, []);

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(new Date('2030-01-01')));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Deep work timer — count up and save to AsyncStorage
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => {
          const next = s + 1;
          // Save every 30 seconds to avoid excessive writes
          if (next % 30 === 0) {
            AsyncStorage.setItem(TIMER_STORAGE_KEY, String(next));
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleTimerToggle = () => {
    if (timerRunning) {
      // Stopping — save immediately
      AsyncStorage.setItem(TIMER_STORAGE_KEY, String(timerSeconds));
    }
    setTimerRunning(r => !r);
  };

  const timerHours = Math.floor(timerSeconds / 3600);
  const timerMins = Math.floor((timerSeconds % 3600) / 60);
  const timerSecs = timerSeconds % 60;
  const timerPresetTotal = 5 * 60 * 60; // 07:45-12:45 = 5h
  const timerProgress = Math.min((timerSeconds / timerPresetTotal) * 100, 100);

  const milestones = [
    { title: 'Top 50 MIR 2030', opacity: 1.0 },
    { title: 'Fellowship Mayo 2035', opacity: 0.6 },
    { title: 'Residencia 2037–2041', opacity: 0.3 },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      {/* ─── Header ─── */}
      <View style={styles.header}>
        <Text style={styles.greeting}>{greeting}, Joseph MD</Text>
        <Text style={styles.subtitle}>Dermatologist · Mayo Clinic · Rochester, MN</Text>
      </View>

      {/* ─── Career Milestones ─── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CAREER MILESTONES</Text>
        {milestones.map((m, i) => (
          <View key={i} style={[styles.milestoneCard, { opacity: m.opacity }]}>
            <View style={styles.milestoneDot} />
            <Text style={styles.milestoneText}>{m.title}</Text>
            {i === 0 && (
              <View style={[styles.chip, { backgroundColor: Colors.blue + '20' }]}>
                <Text style={[styles.chipText, { color: Colors.blue }]}>ACTIVE</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* ─── Countdown ─── */}
      <View style={styles.countdownCard}>
        <Text style={styles.countdownLabel}>DÍAS PARA MIR 2030</Text>
        <View style={styles.countdownRow}>
          <View style={styles.countdownBlock}>
            <Text style={styles.countdownNumber}>{countdown.days}</Text>
            <Text style={styles.countdownUnit}>DÍAS</Text>
          </View>
          <Text style={styles.countdownSep}>:</Text>
          <View style={styles.countdownBlock}>
            <Text style={styles.countdownNumber}>{countdown.hours}</Text>
            <Text style={styles.countdownUnit}>HRS</Text>
          </View>
          <Text style={styles.countdownSep}>:</Text>
          <View style={styles.countdownBlock}>
            <Text style={styles.countdownNumber}>{countdown.mins}</Text>
            <Text style={styles.countdownUnit}>MIN</Text>
          </View>
        </View>
      </View>

      {/* ─── Metrics Grid (2×2) ─── */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricGridItem}>
          <MetricCard label="Tarjetas hoy" value="0" color={Colors.teal} />
        </View>
        <View style={styles.metricGridItem}>
          <MetricCard label="Deep Work" value={String(Math.round(timerSeconds / 3600 * 10) / 10)} unit="hrs" color={Colors.amber} />
        </View>
        <View style={styles.metricGridItem}>
          <MetricCard label="Dominio MIR" value="0" unit="%" color={Colors.blue} />
        </View>
        <View style={styles.metricGridItem}>
          <MetricCard label="Publicaciones" value="0/10" color={Colors.green} />
        </View>
      </View>

      {/* ─── Deep Work Timer ─── */}
      <View style={styles.timerCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.timerTitle}>Deep Work Timer</Text>
          <Text style={styles.timerPreset}>07:45 – 12:45</Text>
        </View>
        <View style={styles.timerDisplay}>
          <Text style={styles.timerTime}>
            {String(timerHours).padStart(2, '0')}:{String(timerMins).padStart(2, '0')}:{String(timerSecs).padStart(2, '0')}
          </Text>
        </View>
        <ProgressBar value={timerProgress} color={Colors.amber} height={6} />
        <TouchableOpacity
          style={[styles.timerButton, timerRunning && styles.timerButtonStop]}
          onPress={handleTimerToggle}
        >
          <Text style={styles.timerButtonText}>{timerRunning ? '■  STOP' : '▶  START'}</Text>
        </TouchableOpacity>
      </View>

      {/* ─── Streak ─── */}
      <View style={styles.streakCard}>
        <Text style={styles.streakEmoji}>🔥</Text>
        <View>
          <Text style={styles.streakCount}>{streak} días</Text>
          <Text style={styles.streakLabel}>RACHA ACTUAL</Text>
        </View>
      </View>

      {/* ─── Action Buttons ─── */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: Colors.blue }]}
          onPress={() => Alert.alert('APEX 1 Toque', 'APEX queue: coming soon — will connect to Supabase')}
        >
          <Text style={styles.actionBtnText}>APEX 1 TOQUE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: Colors.purple }]}
          onPress={() => Alert.alert('Dictar Error', 'Voice recording: coming soon')}
        >
          <Text style={styles.actionBtnText}>DICTAR ERROR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.surface },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: 60, paddingBottom: 120 },

  header: { marginBottom: Spacing['3xl'] },
  greeting: { fontSize: FontSize.headlineLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5, marginBottom: Spacing.xs },
  subtitle: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant },

  section: { marginBottom: Spacing.section },
  sectionTitle: { fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.md },

  milestoneCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.sm, flexDirection: 'row', alignItems: 'center' },
  milestoneDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.blue, marginRight: Spacing.md },
  milestoneText: { fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '500', flex: 1 },
  chip: { borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 8 },
  chipText: { fontSize: FontSize.labelSm, fontWeight: '700', letterSpacing: 0.5 },

  countdownCard: { backgroundColor: Colors.surfaceContainer, borderRadius: BorderRadius.lg, padding: Spacing.xl, marginBottom: Spacing.section, alignItems: 'center' },
  countdownLabel: { fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.lg },
  countdownRow: { flexDirection: 'row', alignItems: 'center' },
  countdownBlock: { alignItems: 'center', minWidth: 64 },
  countdownNumber: { fontSize: FontSize.displaySm, fontWeight: '800', color: Colors.blue, letterSpacing: -1 },
  countdownUnit: { fontSize: FontSize.labelSm, fontWeight: '600', color: Colors.muted, letterSpacing: 1, marginTop: 2 },
  countdownSep: { fontSize: FontSize.headlineSm, fontWeight: '300', color: Colors.muted, marginHorizontal: Spacing.sm },

  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4, marginBottom: Spacing.section },
  metricGridItem: { width: '50%', paddingHorizontal: 4, marginBottom: 8 },
  metricCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md, borderLeftWidth: 3 },
  metricLabel: { fontSize: FontSize.labelSm, fontWeight: '600', color: Colors.muted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: Spacing.xs },
  metricRow: { flexDirection: 'row', alignItems: 'baseline' },
  metricValue: { fontSize: FontSize.headlineSm, fontWeight: '800' },
  metricUnit: { fontSize: FontSize.labelSm, fontWeight: '600', color: Colors.muted, marginLeft: 4, textTransform: 'uppercase' },

  timerCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.xl, marginBottom: Spacing.section },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
  timerTitle: { fontSize: FontSize.titleMd, fontWeight: '600', color: Colors.onSurface },
  timerPreset: { fontSize: FontSize.labelSm, color: Colors.amber, fontWeight: '600', letterSpacing: 0.5 },
  timerDisplay: { alignItems: 'center', marginBottom: Spacing.lg },
  timerTime: { fontSize: 48, fontWeight: '200', color: Colors.amber, letterSpacing: 2, fontVariant: ['tabular-nums'] },
  timerButton: { backgroundColor: Colors.amber, borderRadius: BorderRadius.md, paddingVertical: Spacing.md, alignItems: 'center', marginTop: Spacing.md },
  timerButtonStop: { backgroundColor: Colors.coral },
  timerButtonText: { color: '#0B1628', fontSize: FontSize.labelLg, fontWeight: '700', letterSpacing: 1 },

  progressTrack: { height: 4, backgroundColor: Colors.surfaceContainerHighest, borderRadius: 2, overflow: 'hidden' },
  progressValue: { height: 4, borderRadius: 2 },

  streakCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.section, flexDirection: 'row', alignItems: 'center' },
  streakEmoji: { fontSize: 32, marginRight: Spacing.md },
  streakCount: { fontSize: FontSize.headlineSm, fontWeight: '800', color: Colors.amber },
  streakLabel: { fontSize: FontSize.labelSm, fontWeight: '600', color: Colors.muted, letterSpacing: 1 },

  actionRow: { flexDirection: 'row', gap: Spacing.sm },
  actionBtn: { flex: 1, borderRadius: BorderRadius.md, paddingVertical: Spacing.md, alignItems: 'center' },
  actionBtnText: { color: '#FFFFFF', fontSize: FontSize.labelMd, fontWeight: '700', letterSpacing: 1 },
});
