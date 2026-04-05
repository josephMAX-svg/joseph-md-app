import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';
import { desktopStyles, DesktopColors } from '../theme/desktopStyles';
import { useSupabaseQuery } from '../hooks/useSupabaseQuery';
import {
  getAllReports,
  getPalmertonErrors,
  getTimingStats,
  markReportRead,
} from '../lib/supabase';
import type { AgentReport, PalmertonErrorDist, TimingStats } from '../lib/supabase';
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

// ─── Mini Calendar (current week, all gray — no data) ───
function MiniCalendar() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  return (
    <View style={{ marginBottom: Spacing.md }}>
      <Text style={desktopStyles.rightPanelTitle}>THIS WEEK</Text>
      <View style={[desktopStyles.rightPanelCard, { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 14 }]}>
        {weekDays.map((day, i) => {
          const isToday = (i + 1) % 7 === dayOfWeek;
          return (
            <View key={i} style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 9, fontWeight: '600', color: isToday ? Colors.onSurface : Colors.smallLabel, marginBottom: 4 }}>
                {day}
              </Text>
              <View style={{
                width: 10, height: 10, borderRadius: 5,
                backgroundColor: isToday ? Colors.teal + '40' : 'rgba(255,255,255,0.06)',
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

// ─── This Week Summary ───
function WeekSummary() {
  return (
    <View style={desktopStyles.rightPanelCard}>
      <Text style={desktopStyles.rightPanelCardTitle}>📊 This Week</Text>
      <View style={{ gap: 6 }}>
        {[
          { label: 'Hours studied', value: '—', color: Colors.muted },
          { label: 'Cards created', value: '—', color: Colors.muted },
          { label: 'Questions', value: '—', color: Colors.muted },
        ].map((item, i) => (
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
  const latest = reports.slice(0, 5);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <View>
      {/* Mini Calendar */}
      <MiniCalendar />

      {/* Week Summary */}
      <WeekSummary />

      {/* Agent Reports */}
      <Text style={[desktopStyles.rightPanelTitle, { marginTop: Spacing.lg }]}>AGENT REPORTS</Text>
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
function EstudioRightPanel() {
  const { data: errors, loading: errorsLoading } = useSupabaseQuery(getPalmertonErrors, [] as PalmertonErrorDist[]);
  const { data: timing, loading: timingLoading } = useSupabaseQuery(getTimingStats, {
    avgReadingSeconds: null,
    avgConstructionSeconds: null,
  } as TimingStats);

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
      {/* Palmerton Pie Chart */}
      <Text style={desktopStyles.rightPanelTitle}>PALMERTON ERRORS</Text>
      <View style={desktopStyles.chartContainer}>
        {errorsLoading ? (
          <SkeletonLoader lines={3} />
        ) : hasErrors && PieChart ? (
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={35}
                paddingAngle={2}
              >
                {pieData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PALMERTON_COLORS[entry.name] ?? Colors.muted}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: DesktopColors.glass,
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  fontSize: 11,
                  backdropFilter: 'blur(10px)',
                }}
                labelStyle={{ color: Colors.onSurface }}
                itemStyle={{ color: Colors.onSurfaceVariant }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <View style={{ alignItems: 'center', paddingVertical: 24 }}>
            <Text style={{ fontSize: 28, marginBottom: 8 }}>📊</Text>
            <Text style={{ fontSize: 12, color: Colors.muted }}>No error data yet</Text>
          </View>
        )}
        {/* Legend */}
        {hasErrors && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {errors.map((e) => (
              <View key={e.type} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 8, height: 8, borderRadius: 4,
                  backgroundColor: PALMERTON_COLORS[e.type] ?? Colors.muted,
                  marginRight: 4,
                }} />
                <Text style={{ fontSize: 10, color: Colors.muted }}>
                  {e.type} ({e.percentage}%)
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Time Per Question Bar Chart */}
      <Text style={desktopStyles.rightPanelTitle}>TIME PER QUESTION</Text>
      <View style={desktopStyles.chartContainer}>
        {timingLoading ? (
          <SkeletonLoader lines={2} />
        ) : hasTiming && BarChart ? (
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={timingBarData} barCategoryGap="30%">
              <XAxis
                dataKey="name"
                tick={{ fill: Colors.muted, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: Colors.muted, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                unit="s"
              />
              <Bar dataKey="seconds" radius={[6, 6, 0, 0]}>
                <Cell fill={Colors.teal} />
                <Cell fill={Colors.amber} />
              </Bar>
              <Tooltip
                contentStyle={{
                  backgroundColor: DesktopColors.glass,
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  fontSize: 11,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <View style={{ alignItems: 'center', paddingVertical: 24 }}>
            <Text style={{ fontSize: 28, marginBottom: 8 }}>⏱</Text>
            <Text style={{ fontSize: 12, color: Colors.muted }}>No timing data yet</Text>
          </View>
        )}
      </View>

      {/* Weak Topics Alert */}
      <Text style={desktopStyles.rightPanelTitle}>WEAK TOPICS</Text>
      <View style={[desktopStyles.rightPanelCard, { alignItems: 'center', paddingVertical: 20 }]}>
        <Text style={{ fontSize: 20, marginBottom: 6 }}>🎯</Text>
        <Text style={{ fontSize: 11, color: Colors.muted, textAlign: 'center' }}>
          Weak topics will appear based on activity gaps
        </Text>
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
      <Text style={[desktopStyles.rightPanelTitle, { marginTop: Spacing.lg }]}>CHECKLIST PROGRESS</Text>
      <View style={[desktopStyles.rightPanelCard, { alignItems: 'center', paddingVertical: 16 }]}>
        <CircularProgress progress={0} size={80} strokeWidth={6} color={Colors.amber} trackColor="rgba(255,255,255,0.06)">
          <Text style={{ fontSize: 16, fontWeight: '800', color: Colors.amber }}>0/6</Text>
        </CircularProgress>
        <Text style={{ fontSize: 11, color: Colors.muted, marginTop: 8 }}>Decisiones Clave</Text>
      </View>

      {/* Phase Indicator */}
      <Text style={[desktopStyles.rightPanelTitle, { marginTop: Spacing.lg }]}>PHASE</Text>
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
      <Text style={[desktopStyles.rightPanelTitle, { marginTop: Spacing.lg }]}>NEXT ACTION</Text>
      <View style={[desktopStyles.rightPanelCard, { borderLeftWidth: 3, borderLeftColor: Colors.coral }]}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.onSurface, marginBottom: 4 }}>
          🔥 {nextAction.title}
        </Text>
        <Text style={{ fontSize: 10, color: Colors.coral, fontWeight: '600' }}>
          {nextAction.line} · Most urgent bottleneck
        </Text>
      </View>

      {/* Journal Tier List */}
      <Text style={[desktopStyles.rightPanelTitle, { marginTop: Spacing.lg }]}>TARGET JOURNALS</Text>
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
