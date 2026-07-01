import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight, Motion } from '../theme/tokens';
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
import TodayMission, { todayISO, faseActual, mirLabelDe } from '../components/home/TodayMission';
import BibliotecaHome from '../components/home/BibliotecaHome';
import CockpitStatusBar, { limaHHMM } from '../components/home/CockpitStatusBar';
import FlightDeckGauges from '../components/home/FlightDeckGauges';
import { consumeNavIntent } from '../lib/navIntent';
import { componerBriefing } from '../lib/homeBriefing';
import { mirCountdown } from '../lib/dataSource';
import { useFocusEffect } from '@react-navigation/native';

const TIMER_STORAGE_KEY = '@joseph_md_deep_work_seconds';
const TIMER_START_KEY = '@joseph_md_deep_work_start';
const TIMER_SESSION_KEY = '@joseph_md_deep_work_session_id';

const MONO = Platform.OS === 'web' ? "'JetBrains Mono', 'SF Mono', monospace" : undefined;

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
          {new Date(report.fecha).toLocaleDateString('en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
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

export default function HomeScreen({ navigation }: { navigation?: any }) {
  const [countdown, setCountdown] = useState(getCountdown(new Date('2030-01-01')));
  const [clock, setClock] = useState(limaHHMM());
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [dwSessionId, setDwSessionId] = useState<string | null>(null);
  const [dwAccumulatedHours, setDwAccumulatedHours] = useState(0);

  // APEX modals
  const [apexModalVisible, setApexModalVisible] = useState(false);
  const [apexModalTipo, setApexModalTipo] = useState<'manual' | 'dictar_error'>('manual');

  // Notification modal
  const [notifModalVisible, setNotifModalVisible] = useState(false);

  // Report viewer
  const [selectedReport, setSelectedReport] = useState<AgentReport | null>(null);
  const [reportViewerVisible, setReportViewerVisible] = useState(false);

  // ─── Deep-link → Biblioteca (desde AURUM "ver en Biblioteca") ───
  const scrollRef = useRef<ScrollView>(null);
  const bibliotecaY = useRef(0);
  useFocusEffect(
    useCallback(() => {
      if (consumeNavIntent() === 'biblioteca') {
        setTimeout(() => scrollRef.current?.scrollTo({ y: Math.max(0, bibliotecaY.current - 12), animated: true }), 120);
      }
    }, []),
  );

  // ─── Live Supabase data ───
  const { data: metrics, loading: metricsLoading, refetch: refetchMetrics } = useSupabaseQuery<TodayMetrics>(
    getTodayMetrics,
    { cards: 0, deepWorkHours: 0, dominioMIR: 0 },
  );
  const { data: streak } = useSupabaseQuery(getStreak, 0);
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

  // Countdown + clock timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(new Date('2030-01-01')));
      setClock(limaHHMM());
    }, 30000);
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

  // ─── Open report ───
  const handleOpenReport = (report: AgentReport) => {
    setSelectedReport(report);
    setReportViewerVisible(true);
    setNotifModalVisible(false);
    if (!report.leido) {
      markReportRead(report.id);
      refetchReports();
    }
  };

  const iso = todayISO();
  const timerHours = Math.floor(timerSeconds / 3600);
  const timerMins = Math.floor((timerSeconds % 3600) / 60);
  const timerSecs = timerSeconds % 60;
  const timerPresetTotal = 5 * 60 * 60; // 07:45-12:45 = 5h
  const timerProgress = Math.min((timerSeconds / timerPresetTotal) * 100, 100);
  const liveDeepWorkHours = dwAccumulatedHours + (timerSeconds / 3600);
  const accumProgress = Math.min((liveDeepWorkHours / 5) * 100, 100);

  const briefing = componerBriefing({
    encapsTema: 'ENCAPS · tema del cronograma',
    mirBloque: mirLabelDe(iso),
    unread: unreadReports.length,
    apexQueue: queueCount,
    streak,
    deepWorkH: liveDeepWorkHours,
  });

  const milestones = [
    { title: 'Top 50 MIR 2030', color: Colors.gold, active: true, next: 'ENCAPS + eval MIR D-1 hoy' },
    { title: 'Fellowship · Mayo 2035', color: Colors.blue, active: false, next: 'CV competitivo · publicaciones' },
    { title: 'Residency · 2037–2041', color: Colors.teal, active: false, next: 'USMLE Step 1 en curso' },
  ];

  return (
    <ScrollView ref={scrollRef} style={styles.screen} contentContainerStyle={styles.scrollContent}>
      {/* ─── COCKPIT STATUS BAR (firma ORO · racha + campana integradas) ─── */}
      <CockpitStatusBar
        compact
        timeLabel={clock}
        phase={faseActual(iso)}
        countdownDays={mirCountdown()}
        online={false}
        streak={streak}
        unread={unreadReports.length}
        onBell={() => setNotifModalVisible(true)}
      />

      {/* ─── Today at a glance — Morning Briefing ─── */}
      <View style={styles.briefing}>
        <Text style={styles.briefingLabel}>TODAY AT A GLANCE</Text>
        <Text style={styles.briefingTxt}>{briefing}</Text>
      </View>

      {/* ─── APEX Queue alert (solo alerta real) ─── */}
      {queueCount > 0 && (
        <View style={styles.queueBanner}>
          <Text style={styles.queueBannerText}>
            ⏳ {queueCount} APEX pending · will process when PC connects
          </Text>
        </View>
      )}

      {/* ─── FLIGHT DECK: Misión de HOY (timeline real del Calendar) ─── */}
      <TodayMission onGo={(s) => navigation?.navigate?.(s)} />

      {/* ─── Deep Work gauge en ORO + quick-actions (APEX / DICTATE) ─── */}
      <View style={{ marginBottom: Spacing.section }}>
        <FlightDeckGauges
          timerRunning={timerRunning}
          timerProgress={timerProgress}
          timerHours={timerHours}
          timerMins={timerMins}
          timerSecs={timerSecs}
          liveDeepWorkHours={liveDeepWorkHours}
          accumProgress={accumProgress}
          cards={metrics.cards}
          dominioMIR={metrics.dominioMIR}
          metricsLoading={metricsLoading}
          onTimerToggle={handleTimerToggle}
          onApex={() => { setApexModalTipo('manual'); setApexModalVisible(true); }}
          onDictate={() => { setApexModalTipo('dictar_error'); setApexModalVisible(true); }}
        />
      </View>

      {/* ─── MENTOR DECK — Biblioteca del fundador (cita-hero + canon) ─── */}
      <View onLayout={(e) => { bibliotecaY.current = e.nativeEvent.layout.y; }}>
        <BibliotecaHome onGo={(s) => navigation?.navigate?.(s)} />
      </View>

      {/* ─── BANDA SECUNDARIA: Career Milestones (identidad→acción) ─── */}
      <View style={styles.section}>
        <View style={styles.secHead}>
          <View style={styles.secRail} />
          <Text style={styles.secTitle}>CAREER MILESTONES</Text>
        </View>
        {milestones.map((m, i) => (
          <View key={i} style={[styles.milestoneCard, { borderLeftColor: m.color }, !m.active && { opacity: 0.62 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.milestoneText}>{m.title}</Text>
              <Text style={styles.milestoneNext}>→ {m.next}</Text>
            </View>
            {m.active && (
              <View style={[styles.chip, { backgroundColor: m.color + '20', borderColor: m.color + '44' }]}>
                <Text style={[styles.chipText, { color: m.color }]}>ACTIVE</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* ─── Countdown compacto en ORO ─── */}
      <View style={styles.countdownCard}>
        <Text style={styles.countdownLabel}>COUNTDOWN · MIR 2030</Text>
        <View style={styles.countdownRow}>
          <View style={styles.countdownBlock}>
            <Text style={[styles.countdownNumber, styles.countdownDays]}>{countdown.days}</Text>
            <Text style={styles.countdownUnit}>DAYS</Text>
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
            <Text style={styles.notifTitle}>📋 Agent Reports</Text>
            <View style={{ width: 22 }} />
          </View>

          {unreadReports.length > 0 && (
            <View style={styles.notifUnreadBanner}>
              <Text style={styles.notifUnreadText}>
                {unreadReports.length} unread report{unreadReports.length > 1 ? 's' : ''}
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
                <Text style={styles.emptyReportsText}>No reports</Text>
                <Text style={styles.emptyReportsHint}>
                  Agents generate reports after each study block
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
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: 52, paddingBottom: 120 },

  // Today at a glance
  briefing: { paddingVertical: 8, paddingHorizontal: 2, marginBottom: Spacing.section },
  briefingLabel: { fontSize: 9, fontWeight: '800', color: Colors.gold, letterSpacing: 1.6, fontFamily: MONO, marginBottom: 4 },
  briefingTxt: { fontSize: FontSize.bodyMd, lineHeight: 20, color: Colors.onSurface, letterSpacing: 0.2 },

  // Queue banner
  queueBanner: {
    backgroundColor: Colors.coral + '14',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.section,
    borderWidth: 1, borderColor: Colors.coral + '22',
    borderLeftWidth: 3,
    borderLeftColor: Colors.coral,
  },
  queueBannerText: { fontSize: FontSize.bodyMd, color: Colors.coral, fontWeight: '600', letterSpacing: 0.1 },

  section: { marginBottom: Spacing.section },
  secHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: Spacing.sm },
  secRail: { width: 3, height: 12, borderRadius: 2, backgroundColor: Colors.gold },
  secTitle: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.2, fontFamily: MONO },

  milestoneCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.sm, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: Hairline.soft, borderLeftWidth: 3, ...Elevation.sm },
  milestoneText: { fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '600', letterSpacing: 0.1 },
  milestoneNext: { fontSize: 10, color: Colors.muted, marginTop: 2, letterSpacing: 0.2 },
  chip: { borderRadius: BorderRadius.full, paddingVertical: 3, paddingHorizontal: 9, borderWidth: 1 },
  chipText: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.6 },

  countdownCard: { backgroundColor: Colors.surfaceContainer, borderRadius: BorderRadius.xl, padding: Spacing.xl, marginBottom: Spacing.section, alignItems: 'center', borderWidth: 1, borderColor: Hairline.soft, borderTopWidth: 2, borderTopColor: Hairline.accentSoft, ...Elevation.md },
  countdownLabel: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.4, marginBottom: Spacing.lg, fontFamily: MONO },
  countdownRow: { flexDirection: 'row', alignItems: 'center' },
  countdownBlock: { alignItems: 'center', minWidth: 64 },
  countdownNumber: { fontSize: 34, lineHeight: 40, fontWeight: '300', color: Colors.onSurfaceVariant, letterSpacing: -0.5, fontVariant: ['tabular-nums'], fontFamily: MONO },
  countdownDays: { fontSize: 48, fontWeight: '200', color: Colors.gold },
  countdownUnit: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.smallLabel, letterSpacing: 1.2, marginTop: 2, fontFamily: MONO },
  countdownSep: { fontSize: FontSize.headlineSm, fontWeight: '200', color: Colors.outlineVariant, marginHorizontal: Spacing.sm },

  // ─── Notifications Modal ───
  notifContainer: { flex: 1, backgroundColor: Colors.surface },
  notifHeader: {
    paddingTop: 60, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: Hairline.medium,
  },
  notifClose: { fontSize: 22, color: Colors.muted, fontWeight: '300' },
  notifTitle: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },

  notifUnreadBanner: {
    backgroundColor: Colors.coral + '14',
    paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1, borderBottomColor: Colors.coral + '22',
  },
  notifUnreadText: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.coral, letterSpacing: 0.6 },

  // Report cards
  reportCard: {
    backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg,
    padding: Spacing.md, marginTop: Spacing.sm,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: Hairline.soft,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any, transition: Motion.base } as any : {}),
  },
  reportDot: { width: 10, height: 10, borderRadius: 5, marginRight: Spacing.md },
  reportInfo: { flex: 1 },
  reportAgent: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: 0.1 },
  reportDate: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2, fontVariant: ['tabular-nums'] },
  reportSummary: { fontSize: FontSize.labelSm, lineHeight: LineHeight.labelSm, color: Colors.onSurfaceVariant, marginTop: 4 },
  unreadDot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.coral,
    marginLeft: Spacing.sm, ...Elevation.glow(Colors.coral),
  },

  emptyReports: { alignItems: 'center', paddingTop: Spacing['5xl'] },
  emptyReportsText: { fontSize: FontSize.titleMd, fontWeight: '700', color: Colors.muted, marginBottom: Spacing.sm },
  emptyReportsHint: { fontSize: FontSize.bodyMd, lineHeight: LineHeight.bodyMd, color: Colors.muted, textAlign: 'center' },
});
