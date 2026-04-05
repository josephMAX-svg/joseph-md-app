import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';
import { useSupabaseQuery } from '../hooks/useSupabaseQuery';
import {
  getTodayMetrics,
  getStreak,
  getApexQueueCount,
  getUnreadReports,
  getAllReports,
  markReportRead,
  startDeepWork,
  stopDeepWork,
  getTodayDeepWorkHours,
} from '../lib/supabase';
import type { AgentReport, TodayMetrics } from '../lib/supabase';
import ApexSubmitModal from '../components/ApexSubmitModal';
import AgentReportViewer from '../components/AgentReportViewer';

const TIMER_STORAGE_KEY = '@joseph_md_deep_work_seconds';
const TIMER_START_KEY = '@joseph_md_deep_work_start';
const TIMER_SESSION_KEY = '@joseph_md_deep_work_session_id';

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
function MetricCard({ label, value, unit, color, loading }: { label: string; value: string; unit?: string; color: string; loading?: boolean }) {
  return (
    <View style={[styles.metricCard, { borderLeftColor: color, borderLeftWidth: 3 }]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <View style={styles.metricRow}>
        {loading ? (
          <ActivityIndicator size="small" color={color} />
        ) : (
          <>
            <Text style={[styles.metricValue, { color }]}>{value}</Text>
            {unit && <Text style={styles.metricUnit}>{unit}</Text>}
          </>
        )}
      </View>
    </View>
  );
}

// ─── Report Card (for notification list) ───
function ReportCard({ report, onPress }: { report: AgentReport; onPress: () => void }) {
  const agentColors: Record<string, string> = {
    ProMIR: Colors.amber,
    USMLE: Colors.blue,
    ENCAPS: Colors.coral,
    MethodResearcher: Colors.purple,
  };
  const color = agentColors[report.agente ?? ''] ?? Colors.teal;

  return (
    <TouchableOpacity style={styles.reportCard} onPress={onPress}>
      <View style={[styles.reportDot, { backgroundColor: color }]} />
      <View style={styles.reportInfo}>
        <Text style={styles.reportAgent}>{report.agente ?? 'Agent'}</Text>
        <Text style={styles.reportDate}>
          {new Date(report.fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
        </Text>
        {report.resumen_json && (
          <Text style={styles.reportSummary} numberOfLines={2}>
            {typeof report.resumen_json === 'string'
              ? report.resumen_json
              : JSON.stringify(report.resumen_json).slice(0, 100)}
          </Text>
        )}
      </View>
      {!report.leido && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const [countdown, setCountdown] = useState(getCountdown(new Date('2030-01-01')));
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [dwSessionId, setDwSessionId] = useState<string | null>(null);
  const [dwAccumulatedHours, setDwAccumulatedHours] = useState(0);

  // APEX modals
  const [apexModalVisible, setApexModalVisible] = useState(false);
  const [apexModalTipo, setApexModalTipo] = useState<'manual' | 'dictar_error'>('manual');
  const [dictarErrorModalVisible, setDictarErrorModalVisible] = useState(false);

  // Notification modal
  const [notifModalVisible, setNotifModalVisible] = useState(false);

  // Report viewer
  const [selectedReport, setSelectedReport] = useState<AgentReport | null>(null);
  const [reportViewerVisible, setReportViewerVisible] = useState(false);

  // ─── Live Supabase data ───
  const { data: metrics, loading: metricsLoading, refetch: refetchMetrics } = useSupabaseQuery<TodayMetrics>(
    getTodayMetrics,
    { cards: 0, deepWorkHours: 0, dominioMIR: 0 },
  );
  const { data: streak, refetch: refetchStreak } = useSupabaseQuery(getStreak, 0);
  const { data: queueCount, refetch: refetchQueue } = useSupabaseQuery(getApexQueueCount, 0);
  const { data: unreadReports, refetch: refetchReports } = useSupabaseQuery(getUnreadReports, []);
  const { data: allReports, refetch: refetchAllReports } = useSupabaseQuery(getAllReports, []);

  // ─── Load saved timer state on mount (persistence) ───
  useEffect(() => {
    (async () => {
      const savedStart = await AsyncStorage.getItem(TIMER_START_KEY);
      const savedSession = await AsyncStorage.getItem(TIMER_SESSION_KEY);
      const savedSeconds = await AsyncStorage.getItem(TIMER_STORAGE_KEY);

      if (savedStart) {
        // Timer was running — restore it
        const startTime = parseInt(savedStart, 10);
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setTimerSeconds(elapsed);
        setTimerRunning(true);
        if (savedSession) setDwSessionId(savedSession);
      } else if (savedSeconds) {
        setTimerSeconds(parseInt(savedSeconds, 10));
      }

      // Load accumulated hours
      const hours = await getTodayDeepWorkHours();
      setDwAccumulatedHours(hours);
    })();
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

  // Deep work timer — count up
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // ─── Timer Toggle — syncs to Supabase ───
  const handleTimerToggle = async () => {
    if (timerRunning) {
      // STOPPING
      setTimerRunning(false);
      AsyncStorage.setItem(TIMER_STORAGE_KEY, String(timerSeconds));
      AsyncStorage.removeItem(TIMER_START_KEY);
      AsyncStorage.removeItem(TIMER_SESSION_KEY);

      // Stop Supabase session
      if (dwSessionId) {
        await stopDeepWork(dwSessionId);
        setDwSessionId(null);
      }

      // Refresh accumulated hours
      const hours = await getTodayDeepWorkHours();
      setDwAccumulatedHours(hours);
      refetchMetrics();
    } else {
      // STARTING
      const now = Date.now();
      setTimerRunning(true);
      setTimerSeconds(0);
      AsyncStorage.setItem(TIMER_START_KEY, String(now));
      AsyncStorage.removeItem(TIMER_STORAGE_KEY);

      // Create Supabase session
      const sessionId = await startDeepWork();
      if (sessionId) {
        setDwSessionId(sessionId);
        AsyncStorage.setItem(TIMER_SESSION_KEY, sessionId);
      }
    }
  };

  // ─── Refresh all metrics ───
  const handleRefreshAll = () => {
    refetchMetrics();
    refetchStreak();
    refetchQueue();
    refetchReports();
    refetchAllReports();
  };

  // ─── Open report ───
  const handleOpenReport = (report: AgentReport) => {
    setSelectedReport(report);
    setReportViewerVisible(true);
    setNotifModalVisible(false);
    // Mark as read
    if (!report.leido) {
      markReportRead(report.id);
      refetchReports();
    }
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

  // Compute live deep work value: accumulated + current session
  const liveDeepWorkHours = dwAccumulatedHours + (timerSeconds / 3600);
  const displayDeepWork = metricsLoading
    ? '...'
    : String(Math.round(liveDeepWorkHours * 10) / 10);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      {/* ─── Header with Notification Bell ─── */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.greeting}>{greeting}, Joseph MD</Text>
          <Text style={styles.subtitle}>Dermatologist · Mayo Clinic · Rochester, MN</Text>
        </View>
        <TouchableOpacity style={styles.bellButton} onPress={() => setNotifModalVisible(true)}>
          <Text style={styles.bellIcon}>🔔</Text>
          {unreadReports.length > 0 && (
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>{unreadReports.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ─── APEX Queue Status ─── */}
      {queueCount > 0 && (
        <View style={styles.queueBanner}>
          <Text style={styles.queueBannerText}>
            ⏳ {queueCount} APEX pendiente{queueCount > 1 ? 's' : ''} · se procesarán al conectar PC
          </Text>
        </View>
      )}

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

      {/* ─── Metrics Grid (2×2) LIVE ─── */}
      <View style={styles.metricsHeader}>
        <Text style={styles.sectionTitle}>MÉTRICAS EN VIVO</Text>
        <TouchableOpacity onPress={handleRefreshAll} style={styles.refreshBtn}>
          <Text style={styles.refreshIcon}>🔄</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.metricsGrid}>
        <View style={styles.metricGridItem}>
          <MetricCard label="Tarjetas hoy" value={String(metrics.cards)} color={Colors.teal} loading={metricsLoading} />
        </View>
        <View style={styles.metricGridItem}>
          <MetricCard label="Deep Work" value={displayDeepWork} unit="hrs" color={Colors.amber} loading={metricsLoading} />
        </View>
        <View style={styles.metricGridItem}>
          <MetricCard label="Dominio MIR" value={String(metrics.dominioMIR)} unit="%" color={Colors.blue} loading={metricsLoading} />
        </View>
        <View style={styles.metricGridItem}>
          <MetricCard label="Publicaciones" value="0" color={Colors.green} />
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
        {/* Accumulated hours today */}
        <Text style={styles.timerAccum}>
          Acumulado hoy: {Math.round(liveDeepWorkHours * 10) / 10}h
        </Text>
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
          onPress={() => {
            setApexModalTipo('manual');
            setApexModalVisible(true);
          }}
        >
          <Text style={styles.actionBtnText}>APEX 1 TOQUE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: Colors.purple }]}
          onPress={() => {
            setApexModalTipo('dictar_error');
            setApexModalVisible(true);
          }}
        >
          <Text style={styles.actionBtnText}>DICTAR ERROR</Text>
        </TouchableOpacity>
      </View>

      {/* ─── APEX Submit Modal ─── */}
      <ApexSubmitModal
        visible={apexModalVisible}
        onClose={() => {
          setApexModalVisible(false);
          refetchQueue();
        }}
        initialTipo={apexModalTipo}
      />

      {/* ─── Agent Report Viewer ─── */}
      <AgentReportViewer
        visible={reportViewerVisible}
        report={selectedReport}
        onClose={() => {
          setReportViewerVisible(false);
          setSelectedReport(null);
          refetchReports();
          refetchAllReports();
        }}
      />

      {/* ─── Notifications Modal ─── */}
      <Modal
        visible={notifModalVisible}
        animationType="slide"
        onRequestClose={() => setNotifModalVisible(false)}
      >
        <View style={styles.notifContainer}>
          <View style={styles.notifHeader}>
            <TouchableOpacity onPress={() => setNotifModalVisible(false)}>
              <Text style={styles.notifClose}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.notifTitle}>📋 Reportes del Agente</Text>
            <View style={{ width: 22 }} />
          </View>

          {unreadReports.length > 0 && (
            <View style={styles.notifUnreadBanner}>
              <Text style={styles.notifUnreadText}>
                {unreadReports.length} reporte{unreadReports.length > 1 ? 's' : ''} sin leer
              </Text>
            </View>
          )}

          <FlatList
            data={allReports}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingHorizontal: Spacing.lg, paddingBottom: 40 }}
            renderItem={({ item }) => (
              <ReportCard report={item} onPress={() => handleOpenReport(item)} />
            )}
            ListEmptyComponent={
              <View style={styles.emptyReports}>
                <Text style={styles.emptyReportsText}>Sin reportes</Text>
                <Text style={styles.emptyReportsHint}>
                  Los agentes generan reportes después de cada bloque de estudio
                </Text>
              </View>
            }
          />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.surface },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: 60, paddingBottom: 120 },

  header: { marginBottom: Spacing['3xl'], flexDirection: 'row', alignItems: 'flex-start' },
  greeting: { fontSize: FontSize.headlineLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5, marginBottom: Spacing.xs },
  subtitle: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant },

  // Notification bell
  bellButton: { padding: Spacing.sm, position: 'relative' },
  bellIcon: { fontSize: 24 },
  bellBadge: {
    position: 'absolute', top: 2, right: 0,
    backgroundColor: Colors.coral, borderRadius: 10,
    minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 4,
  },
  bellBadgeText: { fontSize: 10, fontWeight: '800', color: '#FFFFFF' },

  // Queue banner
  queueBanner: {
    backgroundColor: Colors.teal + '18',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.section,
    borderLeftWidth: 3,
    borderLeftColor: Colors.teal,
  },
  queueBannerText: { fontSize: FontSize.bodyMd, color: Colors.teal, fontWeight: '600' },

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

  // Metrics header with refresh
  metricsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  refreshBtn: { padding: Spacing.xs },
  refreshIcon: { fontSize: 18 },

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
  timerAccum: { fontSize: FontSize.labelSm, color: Colors.muted, textAlign: 'center', marginTop: Spacing.sm, marginBottom: Spacing.sm, letterSpacing: 0.3 },
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

  // ─── Notifications Modal ───
  notifContainer: { flex: 1, backgroundColor: Colors.surface },
  notifHeader: {
    paddingTop: 60, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: Colors.surfaceContainerHighest,
  },
  notifClose: { fontSize: 22, color: Colors.muted, fontWeight: '300' },
  notifTitle: { fontSize: FontSize.titleMd, fontWeight: '700', color: Colors.onSurface },

  notifUnreadBanner: {
    backgroundColor: Colors.coral + '18',
    paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg,
  },
  notifUnreadText: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.coral, letterSpacing: 0.5 },

  // Report cards
  reportCard: {
    backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md,
    padding: Spacing.md, marginTop: Spacing.sm,
    flexDirection: 'row', alignItems: 'center',
  },
  reportDot: { width: 10, height: 10, borderRadius: 5, marginRight: Spacing.md },
  reportInfo: { flex: 1 },
  reportAgent: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  reportDate: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2 },
  reportSummary: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 4 },
  unreadDot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.coral,
    marginLeft: Spacing.sm,
  },

  emptyReports: { alignItems: 'center', paddingTop: Spacing['5xl'] },
  emptyReportsText: { fontSize: FontSize.titleMd, fontWeight: '600', color: Colors.muted, marginBottom: Spacing.sm },
  emptyReportsHint: { fontSize: FontSize.bodyMd, color: Colors.muted, textAlign: 'center' },
});
