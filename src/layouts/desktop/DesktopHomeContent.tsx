import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, FontSize, BorderRadius, Hairline } from '../../theme/tokens';
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
import TodayMission, { todayISO, faseActual, mirLabelDe } from '../../components/home/TodayMission';
import BibliotecaHome from '../../components/home/BibliotecaHome';
import CockpitStatusBar, { limaHHMM } from '../../components/home/CockpitStatusBar';
import FlightDeckGauges from '../../components/home/FlightDeckGauges';
import AnimatedCounter from '../../components/AnimatedCounter';
import { useDataSource, useLocalTelemetry, mirCountdown } from '../../lib/dataSource';
import { getApexQueueCount, getUnreadReports } from '../../lib/supabase';
import { componerBriefing } from '../../lib/homeBriefing';

const TIMER_STORAGE_KEY = '@joseph_md_deep_work_seconds';
const TIMER_START_KEY = '@joseph_md_deep_work_start';
const TIMER_SESSION_KEY = '@joseph_md_deep_work_session_id';

const MONO = Platform.OS === 'web' ? "'JetBrains Mono', 'SF Mono', monospace" : undefined;

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

/**
 * Desktop Home Content — COCKPIT / Mission Control v3
 * Cockpit status bar sticky (numerales de instrumento, firma ORO champagne) ·
 * flight-deck above-the-fold (Misión de HOY | Deep Work gauge en oro + gauges) ·
 * Mentor Deck (Biblioteca con cita-hero editorial) · banda secundaria compacta.
 */
export default function DesktopHomeContent({ onNavigate }: { onNavigate?: (screen: any) => void } = {}) {
  const [countdown, setCountdown] = useState(getCountdown(new Date('2030-01-01')));
  const { width } = useWindowDimensions();
  const { source, isLocalAvailable } = useDataSource();
  const { phase: localPhase } = useLocalTelemetry(source);
  const { data: queueCount } = useSupabaseQuery(getApexQueueCount, 0);
  const { data: unreadReports } = useSupabaseQuery(getUnreadReports, []);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [dwSessionId, setDwSessionId] = useState<string | null>(null);
  const [dwAccumulatedHours, setDwAccumulatedHours] = useState(0);
  const [clock, setClock] = useState(limaHHMM());

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
    const interval = setInterval(() => {
      setCountdown(getCountdown(new Date('2030-01-01')));
      setClock(limaHHMM());
    }, 30000);
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

  const iso = todayISO();
  const liveDeepWorkHours = dwAccumulatedHours + (timerSeconds / 3600);
  const timerHours = Math.floor(timerSeconds / 3600);
  const timerMins = Math.floor((timerSeconds % 3600) / 60);
  const timerSecs = timerSeconds % 60;
  const timerPresetTotal = 5 * 60 * 60;
  const timerProgress = Math.min((timerSeconds / timerPresetTotal) * 100, 100);
  const accumProgress = Math.min((liveDeepWorkHours / 5) * 100, 100);
  const cdDays = localPhase?.days_remaining ?? mirCountdown();

  // Briefing de 1 línea (Superhuman Morning Briefing) — compuesto de datos ya presentes.
  const briefing = componerBriefing({
    encapsTema: 'ENCAPS · tema del cronograma',
    mirBloque: mirLabelDe(iso),
    unread: unreadReports?.length ?? 0,
    apexQueue: queueCount,
    streak,
    deepWorkH: liveDeepWorkHours,
  });

  // Milestones con encuadre identidad → meta → siguiente acción (Notion Life OS).
  const milestones = [
    { title: 'Top 50 MIR 2030', color: Colors.gold, active: true, next: 'ENCAPS + eval MIR D-1 hoy' },
    { title: 'Fellowship · Mayo 2035', color: Colors.blue, active: false, next: 'CV competitivo · publicaciones' },
    { title: 'Residency · 2037–2041', color: Colors.teal, active: false, next: 'USMLE Step 1 en curso' },
  ];

  // Flight deck 2-col collapsa a 1-col en anclos estrechos.
  const stacked = width < 1200;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.surface }}
      contentContainerStyle={desktopStyles.centerScrollContent}
      stickyHeaderIndices={[0]}
    >
      {/* ── COCKPIT STATUS BAR (sticky · firma ORO) ── */}
      <View style={{ backgroundColor: DesktopColors.contentBase, paddingTop: 4, paddingBottom: 2 }}>
        <CockpitStatusBar
          timeLabel={clock}
          phase={faseActual(iso)}
          countdownDays={cdDays}
          online={isLocalAvailable}
          streak={streak}
          unread={unreadReports?.length ?? 0}
        />
      </View>

      {/* ── Today at a glance — Morning Briefing (1 línea) ── */}
      <View style={cs.briefing}>
        <Text style={cs.briefingLabel}>TODAY AT A GLANCE</Text>
        <Text style={cs.briefingTxt} numberOfLines={2}>{briefing}</Text>
      </View>

      {/* ── FLIGHT DECK (above-the-fold): Misión de HOY | Deep Work gauge ── */}
      <View style={[cs.flightDeck, stacked && { flexDirection: 'column' }]}>
        <View style={[cs.deckMission, stacked && { flexBasis: 'auto', width: '100%' }]}>
          <TodayMission onGo={onNavigate} />
        </View>
        <View style={[cs.deckGauges, stacked && { flexBasis: 'auto', width: '100%' }]}>
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
          />
        </View>
      </View>

      {/* ── MENTOR DECK — Biblioteca del Fundador (cita-hero + canon) ── */}
      <BibliotecaHome onGo={onNavigate} />

      {/* ── APEX Queue alert (solo alerta real) ── */}
      {queueCount > 0 && (
        <GlassCard style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.section, borderLeftWidth: 3, borderLeftColor: Colors.coral } as any}>
          <Text style={{ fontSize: 18, marginRight: Spacing.md }}>⚡</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface }}>APEX Queue</Text>
            <Text style={{ fontSize: 11, color: Colors.onSurfaceVariant, marginTop: 2 }}>{queueCount} pending to process</Text>
          </View>
          <View style={{ backgroundColor: Colors.coral + '20', borderRadius: 999, paddingVertical: 4, paddingHorizontal: 12 }}>
            <Text style={{ fontSize: 12, fontWeight: '800', color: Colors.coral, fontVariant: ['tabular-nums'] } as any}>{queueCount}</Text>
          </View>
        </GlassCard>
      )}

      {/* ── BANDA SECUNDARIA: Milestones (identidad→acción) + Countdown compacto ── */}
      <View style={cs.secBand}>
        {/* Career Milestones */}
        <View style={cs.secCol}>
          <View style={cs.secHead}>
            <View style={cs.secRail} />
            <Text style={cs.secTitle}>CAREER MILESTONES</Text>
          </View>
          {milestones.map((m, i) => (
            <View key={i} style={[cs.mCard, { borderLeftColor: m.color }, !m.active && { opacity: 0.62 }]}>
              <View style={{ flex: 1 }}>
                <Text style={cs.mTitle}>{m.title}</Text>
                <Text style={cs.mNext}>→ {m.next}</Text>
              </View>
              {m.active && (
                <View style={[cs.mChip, { backgroundColor: m.color + '20', borderColor: m.color + '44' }]}>
                  <Text style={[cs.mChipTxt, { color: m.color }]}>ACTIVE</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Countdown compacto */}
        <View style={cs.secCol}>
          <View style={cs.secHead}>
            <View style={cs.secRail} />
            <Text style={cs.secTitle}>COUNTDOWN · MIR 2030</Text>
          </View>
          <View style={cs.cdCard}>
            <View style={{ alignItems: 'center', minWidth: 110 }}>
              <AnimatedCounter
                value={countdown.days}
                style={{ fontSize: 56, fontWeight: '200', color: Colors.gold, letterSpacing: -1, fontFamily: MONO, fontVariant: ['tabular-nums'] } as any}
              />
              <Text style={cs.cdUnit}>DAYS</Text>
            </View>
            {[
              { num: countdown.hours, unit: 'HRS' },
              { num: countdown.mins, unit: 'MIN' },
            ].map((block, i) => (
              <React.Fragment key={i}>
                <Text style={cs.cdSep}>:</Text>
                <View style={{ alignItems: 'center', minWidth: 60 }}>
                  <AnimatedCounter
                    value={block.num}
                    style={{ fontSize: 30, fontWeight: '300', color: Colors.onSurfaceVariant, letterSpacing: -0.5, fontFamily: MONO, fontVariant: ['tabular-nums'] } as any}
                  />
                  <Text style={cs.cdUnit}>{block.unit}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const cs = {
  briefing: {
    flexDirection: 'row' as const, alignItems: 'baseline' as const, gap: 10, flexWrap: 'wrap' as const,
    paddingVertical: 8, paddingHorizontal: 4, marginBottom: Spacing.section,
  },
  briefingLabel: {
    fontSize: 9, fontWeight: '800' as const, color: Colors.gold, letterSpacing: 1.6,
    fontFamily: MONO,
  },
  briefingTxt: {
    flex: 1, minWidth: 240, fontSize: 14, fontWeight: '400' as const,
    color: Colors.onSurface, letterSpacing: 0.2, lineHeight: 20,
  },

  flightDeck: {
    flexDirection: 'row' as const, gap: 16, marginBottom: Spacing.section, alignItems: 'stretch' as const,
  },
  deckMission: { flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0 },
  deckGauges: { flexGrow: 0, flexShrink: 0, flexBasis: 360, minWidth: 320 },

  secBand: {
    flexDirection: 'row' as const, gap: 16, flexWrap: 'wrap' as const, marginBottom: Spacing.section,
  },
  secCol: { flexGrow: 1, flexBasis: 320, minWidth: 280 },
  secHead: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 8, marginBottom: Spacing.sm },
  secRail: { width: 3, height: 12, borderRadius: 2, backgroundColor: Colors.gold },
  secTitle: { fontSize: 10, fontWeight: '800' as const, color: Colors.smallLabel, letterSpacing: 1.2, fontFamily: MONO },

  mCard: {
    flexDirection: 'row' as const, alignItems: 'center' as const,
    backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg,
    borderWidth: 1, borderColor: Hairline.soft, borderLeftWidth: 3,
    paddingVertical: 11, paddingHorizontal: 13, marginBottom: 6,
  },
  mTitle: { fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '600' as const },
  mNext: { fontSize: 10, color: Colors.muted, marginTop: 2, letterSpacing: 0.2 },
  mChip: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 2, paddingHorizontal: 9 },
  mChipTxt: { fontSize: FontSize.labelSm, fontWeight: '800' as const, letterSpacing: 0.6 },

  cdCard: {
    flexDirection: 'row' as const, alignItems: 'center' as const, justifyContent: 'center' as const,
    backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl,
    borderWidth: 1, borderColor: Hairline.soft, borderTopWidth: 2, borderTopColor: Hairline.accentSoft,
    paddingVertical: Spacing.lg, paddingHorizontal: Spacing.md,
  },
  cdSep: { fontSize: 26, fontWeight: '200' as const, color: Colors.outlineVariant, marginHorizontal: Spacing.sm },
  cdUnit: { fontSize: 9, fontWeight: '700' as const, color: Colors.smallLabel, letterSpacing: 1.4, marginTop: 2, fontFamily: MONO },
};
