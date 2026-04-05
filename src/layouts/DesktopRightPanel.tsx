import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';
import { desktopStyles, DesktopColors } from '../theme/desktopStyles';
import { useSupabaseQuery } from '../hooks/useSupabaseQuery';
import {
  getAllReports,
  getPalmertonErrors,
  getTimingStats,
  markReportRead,
  getWeekSummary,
  getAgentSkills,
  getWeakTopicsFromBlocks,
} from '../lib/supabase';
import type {
  AgentReport,
  PalmertonErrorDist,
  TimingStats,
  WeekSummary,
  AgentSkill,
  WeakTopicByBlocks,
} from '../lib/supabase';
import { fetchLocal, useDataSource } from '../lib/dataSource';
import type { LocalSkill } from '../lib/dataSource';
import type { ScreenName } from './DesktopSidebar';
import GlassCard from '../components/GlassCard';
import CircularProgress from '../components/CircularProgress';
import SkeletonLoader, { PulseDash } from '../components/SkeletonLoader';
import AnimatedCounter from '../components/AnimatedCounter';

// Recharts imports — only used on web
let PieChart: any, Pie: any, Cell: any, BarChart: any, Bar: any, XAxis: any, YAxis: any, Tooltip: any, ResponsiveContainer: any;
try {
  const recharts = require('recharts');
  PieChart = recharts.PieChart;
  Pie = recharts.Pie;
  Cell = recharts.Cell;
  BarChart = recharts.BarChart;
  Bar = recharts.Bar;
  XAxis = recharts.XAxis;
  YAxis = recharts.YAxis;
  Tooltip = recharts.Tooltip;
  ResponsiveContainer = recharts.ResponsiveContainer;
} catch {
  // recharts not available on native — will show fallback
}

interface RightPanelProps {
  activeScreen: ScreenName;
}

// ─── Palmerton Error Colors ───
const PALMERTON_COLORS: Record<string, string> = {
  CONTEXTO: Colors.coral,
  CRONOLOGIA: Colors.amber,
  CCSN: '#FACC15',
  CONCEPTO: Colors.blue,
  OLVIDO: Colors.purple,
};

// ─── Agent colors ───
const AGENT_COLORS: Record<string, string> = {
  ProMIR: Colors.amber,
  USMLE: Colors.blue,
  ENCAPS: Colors.coral,
  MethodResearcher: Colors.purple,
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const d = new Date(dateStr);
  const diffMs = now.getTime() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ─── Mini Calendar: current week (Mon-Sun) with activity dots ───
function MiniCalendar({ activeDays }: { activeDays: string[] }) {
  const today = new Date();
  const jsDay = today.getDay(); // Sun=0..Sat=6
  // Monday = 0, Sunday = 6
  const mondayIdx = jsDay === 0 ? 6 : jsDay - 1;
  const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  // Build 7 dates for this week (Mon → Sun, Lima time)
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - mondayIdx + i);
    // Lima offset: subtract 5h to get Lima date
    const lima = new Date(d.getTime() - 5 * 60 * 60 * 1000);
    dates.push(lima.toISOString().split('T')[0]);
  }

  const activeSet = new Set(activeDays);

  return (
    <View style={{ marginBottom: Spacing.md }}>
      <Text style={desktopStyles.rightPanelTitle}>THIS WEEK</Text>
      <View style={[desktopStyles.rightPanelCard, { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 14 }]}>
        {weekDays.map((day, i) => {
          const isToday = i === mondayIdx;
          const hasActivity = activeSet.has(dates[i]);
          return (
            <View key={i} style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 9, fontWeight: '600', color: isToday ? Colors.onSurface : Colors.smallLabel, marginBottom: 4 }}>
                {day}
              </Text>
              <View style={{
                width: 10, height: 10, borderRadius: 5,
                backgroundColor: hasActivity ? Colors.teal : 'rgba(255,255,255,0.08)',
                borderWidth: isToday ? 1 : 0,
                borderColor: Colors.teal,
              }} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

// ─── This Week Summary (live data) ───
function WeekSummaryCard({ data }: { data: WeekSummary }) {
  const items = [
    { label: 'Hours studied', value: data.hoursStudied > 0 ? `${data.hoursStudied}h` : '0h', color: data.hoursStudied > 0 ? Colors.amber : Colors.muted },
    { label: 'Cards created', value: String(data.cardsCreated), color: data.cardsCreated > 0 ? Colors.teal : Colors.muted },
    { label: 'Questions', value: String(data.questions), color: data.questions > 0 ? Colors.blue : Colors.muted },
  ];
  return (
    <View style={desktopStyles.rightPanelCard}>
      <Text style={desktopStyles.rightPanelCardTitle}>📊 This Week</Text>
      <View style={{ gap: 6 }}>
        {items.map((item, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 11, color: Colors.smallLabel }}>{item.label}</Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: item.color }}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════
// HOME: Agent Reports Feed + Calendar + Summary
// ═══════════════════════════════════════════════
function HomeRightPanel() {
  const { data: reports, loading } = useSupabaseQuery(getAllReports, [] as AgentReport[]);
  const { data: week } = useSupabaseQuery(getWeekSummary, {
    hoursStudied: 0, cardsCreated: 0, questions: 0, activeDays: [],
  } as WeekSummary);
  const latest = reports.slice(0, 5);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <View>
      {/* Mini Calendar with real activity dots */}
      <MiniCalendar activeDays={week.activeDays} />

      {/* Week Summary */}
      <WeekSummaryCard data={week} />

      {/* Agent Reports */}
      <Text style={[desktopStyles.rightPanelTitle, desktopStyles.rightPanelTitleSeparated]}>AGENT REPORTS</Text>
      {loading ? (
        <SkeletonLoader lines={3} />
      ) : latest.length === 0 ? (
        <View style={[desktopStyles.rightPanelCard, { alignItems: 'center', paddingVertical: 24 }]}>
          <Text style={{ fontSize: 28, marginBottom: 8 }}>📋</Text>
          <Text style={{ fontSize: 13, color: Colors.muted, fontWeight: '500' }}>
            No agent reports
          </Text>
          <Text style={{ fontSize: 10, color: Colors.smallLabel, marginTop: 4, textAlign: 'center' }}>
            Reports appear after study blocks
          </Text>
        </View>
      ) : (
        latest.map((report) => {
          const color = AGENT_COLORS[report.agente ?? ''] ?? Colors.teal;
          const isExpanded = expandedId === report.id;
          return (
            <TouchableOpacity
              key={report.id}
              style={desktopStyles.rightPanelCard}
              onPress={() => {
                setExpandedId(isExpanded ? null : report.id);
                if (!report.leido) markReportRead(report.id);
              }}
              activeOpacity={0.7}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[desktopStyles.reportFeedDot, { backgroundColor: color }]} />
                <View style={desktopStyles.reportFeedInfo}>
                  <Text style={desktopStyles.reportFeedAgent}>
                    {report.agente ?? 'Agent'}
                  </Text>
                  <Text style={desktopStyles.reportFeedTime}>
                    {timeAgo(report.fecha)}
                  </Text>
                </View>
                {!report.leido && <View style={desktopStyles.reportFeedUnread} />}
              </View>
              {report.resumen_json && !isExpanded && (
                <Text style={desktopStyles.reportFeedPreview} numberOfLines={2}>
                  {typeof report.resumen_json === 'string'
                    ? report.resumen_json
                    : JSON.stringify(report.resumen_json).slice(0, 100)}
                </Text>
              )}
              {isExpanded && report.reporte_completo && (
                <Text style={{
                  fontSize: FontSize.labelSm,
                  color: Colors.onSurfaceVariant,
                  fontFamily: Platform.OS === 'web' ? "'JetBrains Mono', monospace" : 'monospace',
                  marginTop: 8,
                  lineHeight: 18,
                } as any}>
                  {report.reporte_completo}
                </Text>
              )}
            </TouchableOpacity>
          );
        })
      )}
    </View>
  );
}

// ═══════════════════════════════════════════════
// ESTUDIO: Palmerton Analytics + Charts
// ═══════════════════════════════════════════════
function useSharedSkills(): AgentSkill[] {
  const { source } = useDataSource();
  const [skills, setSkills] = useState<AgentSkill[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (source === 'local') {
        const local = await fetchLocal<{ skills?: LocalSkill[] } | LocalSkill[]>('/skills');
        if (cancelled) return;
        const arr = Array.isArray(local) ? local : local?.skills;
        if (arr && arr.length > 0) {
          setSkills(arr.map((s, i) => ({
            id: s.id ?? String(i),
            skill_name: s.skill_name,
            skill_description: s.skill_description ?? null,
            source_agent: s.source_agent ?? null,
            target_agents: s.target_agents ?? null,
            fecha_creado: s.fecha_creado,
          })));
          return;
        }
      }
      // Fallback to Supabase (or if local /skills endpoint returned nothing)
      const sb = await getAgentSkills();
      if (!cancelled) setSkills(sb);
    })();
    return () => { cancelled = true; };
  }, [source]);

  return skills;
}

function formatSeconds(s: number | null): string {
  if (s === null || s === 0) return '—';
  const mins = Math.floor(s / 60);
  const secs = Math.round(s % 60);
  if (mins === 0) return `${secs}s`;
  return `${mins}m${String(secs).padStart(2, '0')}s`;
}

function EstudioRightPanel() {
  const { data: errors, loading: errorsLoading } = useSupabaseQuery(getPalmertonErrors, [] as PalmertonErrorDist[]);
  const { data: timing, loading: timingLoading } = useSupabaseQuery(getTimingStats, {
    avgReadingSeconds: null,
    avgConstructionSeconds: null,
  } as TimingStats);
  const { data: weakTopics } = useSupabaseQuery(getWeakTopicsFromBlocks, [] as WeakTopicByBlocks[]);
  const skills = useSharedSkills();
  const maxError = Math.max(1, ...errors.map(e => e.count));

  const pieData = errors.map((e) => ({
    name: e.type,
    value: e.count,
  }));

  const hasErrors = errors.some((e) => e.count > 0);
  const hasTiming = timing.avgReadingSeconds !== null || timing.avgConstructionSeconds !== null;

  const timingBarData = [
    { name: 'T_lectura', seconds: timing.avgReadingSeconds ?? 0 },
    { name: 'T_constr', seconds: timing.avgConstructionSeconds ?? 0 },
  ];

  return (
    <View>
      {/* Palmerton — horizontal bars per type */}
      <Text style={desktopStyles.rightPanelTitle}>PALMERTON ERRORS</Text>
      <View style={desktopStyles.rightPanelCard}>
        {errorsLoading ? (
          <SkeletonLoader lines={3} />
        ) : !hasErrors ? (
          <View style={{ alignItems: 'center', paddingVertical: 16 }}>
            <Text style={{ fontSize: 24, marginBottom: 6 }}>📊</Text>
            <Text style={{ fontSize: 11, color: Colors.muted, textAlign: 'center' }}>Sin datos de errores aún</Text>
          </View>
        ) : (
          <View style={{ gap: 8 }}>
            {(['CONTEXTO', 'CRONOLOGIA', 'CCSN', 'CONCEPTO', 'OLVIDO'] as const).map((type) => {
              const row = errors.find(e => e.type === type);
              const count = row?.count ?? 0;
              const color = PALMERTON_COLORS[type] ?? Colors.muted;
              const widthPct = Math.max(4, (count / maxError) * 100);
              return (
                <View key={type}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                    <Text style={{ fontSize: 10, fontWeight: '700', color, letterSpacing: 0.5 }}>{type}</Text>
                    <Text style={{ fontSize: 10, fontWeight: '600', color: Colors.muted }}>{count}</Text>
                  </View>
                  <View style={{ height: 6, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                    <View style={{ height: 6, width: `${widthPct}%`, backgroundColor: color, borderRadius: 3 }} />
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>

      {/* Time Per Question — text summary */}
      <Text style={[desktopStyles.rightPanelTitle, desktopStyles.rightPanelTitleSeparated]}>TIME PER QUESTION</Text>
      <View style={desktopStyles.rightPanelCard}>
        {timingLoading ? (
          <SkeletonLoader lines={2} />
        ) : !hasTiming ? (
          <View style={{ alignItems: 'center', paddingVertical: 8 }}>
            <Text style={{ fontSize: 11, color: Colors.muted }}>Sin datos de tiempo aún</Text>
          </View>
        ) : (
          <View style={{ gap: 10 }}>
            <View>
              <Text style={{ fontSize: 10, color: Colors.smallLabel, fontWeight: '600', letterSpacing: 0.5 }}>LECTURA</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: Colors.teal }}>
                {formatSeconds(timing.avgReadingSeconds)}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 10, color: Colors.smallLabel, fontWeight: '600', letterSpacing: 0.5 }}>CONSTRUCCIÓN</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: Colors.amber }}>
                {formatSeconds(timing.avgConstructionSeconds)}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Weak Topics — derived from apex_blocks gaps */}
      <Text style={[desktopStyles.rightPanelTitle, desktopStyles.rightPanelTitleSeparated]}>WEAK TOPICS</Text>
      <View style={desktopStyles.rightPanelCard}>
        {weakTopics.length === 0 ? (
          <View style={{ alignItems: 'center', paddingVertical: 16 }}>
            <Text style={{ fontSize: 20, marginBottom: 6 }}>🎯</Text>
            <Text style={{ fontSize: 10, color: Colors.muted, textAlign: 'center' }}>
              Weak topics will appear based on activity gaps
            </Text>
          </View>
        ) : (
          <View style={{ gap: 8 }}>
            {weakTopics.map((t, i) => {
              const color = t.level === 'WEAK' ? Colors.coral : Colors.amber;
              return (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color, marginRight: 8 }} />
                    <Text style={{ fontSize: 12, color: Colors.onSurface, fontWeight: '500', flex: 1 }} numberOfLines={1}>
                      {t.especialidad}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 10, color, fontWeight: '700' }}>{t.daysSince}d</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>

      {/* Skills Compartidos */}
      <Text style={[desktopStyles.rightPanelTitle, desktopStyles.rightPanelTitleSeparated]}>SKILLS COMPARTIDOS</Text>
      <View style={desktopStyles.rightPanelCard}>
        {skills.length === 0 ? (
          <View style={{ alignItems: 'center', paddingVertical: 12 }}>
            <Text style={{ fontSize: 10, color: Colors.muted, textAlign: 'center', lineHeight: 15 }}>
              Sin skills registrados · Los agentes comparten skills automáticamente durante el estudio
            </Text>
          </View>
        ) : (
          <View style={{ gap: 10 }}>
            {skills.slice(0, 6).map((s) => (
              <View key={s.id} style={{ paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.onSurface, marginBottom: 2 }}>
                  {s.skill_name}
                </Text>
                {s.source_agent && (
                  <Text style={{ fontSize: 9, color: Colors.muted, marginBottom: 4 }}>
                    de {s.source_agent}
                  </Text>
                )}
                {s.target_agents && s.target_agents.length > 0 && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                    {s.target_agents.slice(0, 3).map((t, j) => (
                      <View key={j} style={{ backgroundColor: Colors.teal + '20', borderRadius: 999, paddingVertical: 1, paddingHorizontal: 6 }}>
                        <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.teal }}>{t}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════
// DERMA: Circular Progress + Open Counters
// ═══════════════════════════════════════════════
function DermaRightPanel() {
  return (
    <View>
      <Text style={desktopStyles.rightPanelTitle}>DERMA STATS</Text>

      {/* Circular Progress: Subtopics — FIX 1: no /70 limit */}
      <View style={[desktopStyles.rightPanelCard, { alignItems: 'center', paddingVertical: 20 }]}>
        <CircularProgress progress={0} size={100} strokeWidth={7} color={Colors.purple} trackColor="rgba(255,255,255,0.06)">
          <AnimatedCounter
            value={0}
            style={{ fontSize: 24, fontWeight: '800', color: Colors.purple }}
          />
        </CircularProgress>
        <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.muted, marginTop: 8, letterSpacing: 0.5 }}>
          subtopics completed
        </Text>
      </View>

      {/* Papers Read — no limit */}
      <View style={desktopStyles.rightPanelCard}>
        <Text style={desktopStyles.rightPanelCardTitle}>📄 Papers Read</Text>
        <View style={{ alignItems: 'center', paddingVertical: 8 }}>
          <AnimatedCounter
            value={0}
            style={{ fontSize: 36, fontWeight: '800', color: Colors.purple }}
          />
          <Text style={{ fontSize: 10, color: Colors.smallLabel, marginTop: 4 }}>
            publicaciones leídas
          </Text>
        </View>
      </View>

      {/* iPad Drawings */}
      <View style={desktopStyles.rightPanelCard}>
        <Text style={desktopStyles.rightPanelCardTitle}>✏️ iPad Drawings</Text>
        <View style={{ alignItems: 'center', paddingVertical: 8 }}>
          <AnimatedCounter
            value={0}
            style={{ fontSize: 36, fontWeight: '800', color: Colors.purple }}
          />
          <Text style={{ fontSize: 10, color: Colors.smallLabel, marginTop: 4 }}>
            Procreate anatomy sketches
          </Text>
        </View>
      </View>

      {/* APEX Cards in English */}
      <View style={desktopStyles.rightPanelCard}>
        <Text style={desktopStyles.rightPanelCardTitle}>⚡ APEX Cards</Text>
        <View style={{ alignItems: 'center', paddingVertical: 8 }}>
          <AnimatedCounter
            value={0}
            style={{ fontSize: 36, fontWeight: '800', color: Colors.purple }}
          />
          <Text style={{ fontSize: 10, color: Colors.smallLabel, marginTop: 4 }}>
            cards in English
          </Text>
        </View>
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════
// EMPRESA: Financials + Phase Indicator
// ═══════════════════════════════════════════════
function EmpresaRightPanel() {
  const metrics = [
    { label: 'PRECIO/MES', value: 'S/199', color: Colors.amber },
    { label: 'GM', value: '60.8%', color: Colors.amber },
    { label: 'BREAK-EVEN', value: '33', color: Colors.amber },
    { label: 'LTV/CAC', value: '≥3:1', color: Colors.amber },
  ];

  return (
    <View>
      <Text style={desktopStyles.rightPanelTitle}>KEY METRICS</Text>

      {metrics.map((m, i) => (
        <View key={i} style={desktopStyles.rightPanelCard}>
          <Text style={{ fontSize: 10, color: Colors.smallLabel, letterSpacing: 0.8, fontWeight: '600' }}>
            {m.label}
          </Text>
          <Text style={{ fontSize: 28, fontWeight: '800', color: m.color, marginTop: 4 }}>
            {m.value}
          </Text>
        </View>
      ))}

      {/* Checklist Progress Ring */}
      <Text style={[desktopStyles.rightPanelTitle, desktopStyles.rightPanelTitleSeparated]}>CHECKLIST PROGRESS</Text>
      <View style={[desktopStyles.rightPanelCard, { alignItems: 'center', paddingVertical: 16 }]}>
        <CircularProgress progress={0} size={80} strokeWidth={6} color={Colors.amber} trackColor="rgba(255,255,255,0.06)">
          <Text style={{ fontSize: 16, fontWeight: '800', color: Colors.amber }}>0/6</Text>
        </CircularProgress>
        <Text style={{ fontSize: 11, color: Colors.muted, marginTop: 8 }}>Decisiones Clave</Text>
      </View>

      {/* Phase Indicator */}
      <Text style={[desktopStyles.rightPanelTitle, desktopStyles.rightPanelTitleSeparated]}>PHASE</Text>
      <View style={desktopStyles.rightPanelCard}>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {[
            { name: 'Fase 0', active: true },
            { name: 'Fase 1', active: false },
            { name: 'Fase 2', active: false },
          ].map((phase, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor: phase.active ? Colors.amber + '20' : 'rgba(255,255,255,0.04)',
                borderWidth: phase.active ? 1 : 0,
                borderColor: Colors.amber + '40',
                alignItems: 'center',
              }}
            >
              <Text style={{
                fontSize: 11,
                fontWeight: '700',
                color: phase.active ? Colors.amber : Colors.muted,
              }}>
                {phase.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════
// RESEARCH: Open Counter + Journals + Next Action
// ═══════════════════════════════════════════════
function ResearchRightPanel() {
  const tiers = [
    { tier: 'Tier 1', color: '#FFD700', journals: ['JAAD (IF 11.8)', 'JAMA Dermatology (IF 10.9)', 'BJD (IF 9.0)'] },
    { tier: 'Tier 2', color: '#C0C0C0', journals: ['JAAD International (IF 5.2)', 'Dermatologic Surgery (IF 4.5)'] },
    { tier: 'Tier 3', color: '#CD7F32', journals: ['J Cosmetic Dermatology', 'Aesthetic Surgery Journal'] },
  ];

  // Find most urgent bottleneck
  const nextAction = {
    title: 'Manuscript revision',
    line: 'PERU-ACNE',
    urgency: 'high',
  };

  return (
    <View>
      {/* Publication Counter — FIX 1: open, no /10 limit */}
      <Text style={desktopStyles.rightPanelTitle}>MAYO CLINIC TRACKER</Text>
      <View style={[desktopStyles.rightPanelCard, { alignItems: 'center', paddingVertical: 20 }]}>
        <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.muted, marginBottom: 8, letterSpacing: 0.5 }}>
          Publications
        </Text>
        <AnimatedCounter
          value={0}
          style={{ fontSize: 48, fontWeight: '800', color: Colors.teal }}
        />
        <Text style={{ fontSize: 10, color: Colors.smallLabel, marginTop: 6 }}>
          publicaciones · Goal: competitive CV
        </Text>
      </View>

      {/* Next Action Card */}
      <Text style={[desktopStyles.rightPanelTitle, desktopStyles.rightPanelTitleSeparated]}>NEXT ACTION</Text>
      <View style={[desktopStyles.rightPanelCard, { borderLeftWidth: 3, borderLeftColor: Colors.coral }]}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.onSurface, marginBottom: 4 }}>
          🔥 {nextAction.title}
        </Text>
        <Text style={{ fontSize: 10, color: Colors.coral, fontWeight: '600' }}>
          {nextAction.line} · Most urgent bottleneck
        </Text>
      </View>

      {/* Journal Tier List */}
      <Text style={[desktopStyles.rightPanelTitle, desktopStyles.rightPanelTitleSeparated]}>TARGET JOURNALS</Text>
      {tiers.map((t, i) => (
        <View key={i} style={desktopStyles.rightPanelCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: t.color, marginRight: 8 }} />
            <Text style={{ fontSize: FontSize.labelMd, fontWeight: '700', color: t.color }}>{t.tier}</Text>
          </View>
          {t.journals.map((j, k) => (
            <Text key={k} style={{ fontSize: 10, color: Colors.onSurfaceVariant, paddingLeft: 18, lineHeight: 18 }}>
              {j}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

// ═══════════════════════════════════════════════
// Main Right Panel Router
// ═══════════════════════════════════════════════
export default function DesktopRightPanel({ activeScreen }: RightPanelProps) {
  return (
    <ScrollView
      style={desktopStyles.rightPanel}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {activeScreen === 'Home' && <HomeRightPanel />}
      {activeScreen === 'Estudio' && <EstudioRightPanel />}
      {activeScreen === 'Derma' && <DermaRightPanel />}
      {activeScreen === 'Empresa' && <EmpresaRightPanel />}
      {activeScreen === 'Investigación' && <ResearchRightPanel />}
    </ScrollView>
  );
}
