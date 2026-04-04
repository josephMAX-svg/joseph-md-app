import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';
import { desktopStyles } from '../theme/desktopStyles';
import { useSupabaseQuery } from '../hooks/useSupabaseQuery';
import {
  getAllReports,
  getPalmertonErrors,
  getTimingStats,
  markReportRead,
} from '../lib/supabase';
import type { AgentReport, PalmertonErrorDist, TimingStats } from '../lib/supabase';
import type { ScreenName } from './DesktopSidebar';

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

// ═══════════════════════════════════════════════
// HOME: Agent Reports Feed
// ═══════════════════════════════════════════════
function HomeRightPanel() {
  const { data: reports } = useSupabaseQuery(getAllReports, [] as AgentReport[]);
  const latest = reports.slice(0, 5);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <View>
      <Text style={desktopStyles.rightPanelTitle}>AGENT REPORTS</Text>
      {latest.length === 0 ? (
        <View style={desktopStyles.rightPanelCard}>
          <Text style={{ fontSize: FontSize.bodyMd, color: Colors.muted, fontStyle: 'italic' }}>
            No agent reports yet
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
                  fontFamily: 'monospace',
                  marginTop: 8,
                  lineHeight: 18,
                }}>
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
// ESTUDIO: Palmerton Analytics
// ═══════════════════════════════════════════════
function EstudioRightPanel() {
  const { data: errors } = useSupabaseQuery(getPalmertonErrors, [] as PalmertonErrorDist[]);
  const { data: timing } = useSupabaseQuery(getTimingStats, {
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
        {hasErrors && PieChart ? (
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
                  backgroundColor: '#152032',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 12,
                }}
                labelStyle={{ color: Colors.onSurface }}
                itemStyle={{ color: Colors.onSurfaceVariant }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <Text style={{ fontSize: FontSize.bodyMd, color: Colors.muted, fontStyle: 'italic', textAlign: 'center', paddingVertical: 24 }}>
            No error data yet
          </Text>
        )}
        {/* Legend */}
        {hasErrors && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {errors.map((e) => (
              <View key={e.type} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
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
        {hasTiming && BarChart ? (
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
              <Bar dataKey="seconds" radius={[4, 4, 0, 0]}>
                <Cell fill={Colors.teal} />
                <Cell fill={Colors.amber} />
              </Bar>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#152032',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 12,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Text style={{ fontSize: FontSize.bodyMd, color: Colors.muted, fontStyle: 'italic', textAlign: 'center', paddingVertical: 24 }}>
            No timing data yet
          </Text>
        )}
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════
// DERMA: Papers + Drawings
// ═══════════════════════════════════════════════
function DermaRightPanel() {
  return (
    <View>
      <Text style={desktopStyles.rightPanelTitle}>DERMA STATS</Text>

      <View style={desktopStyles.rightPanelCard}>
        <Text style={desktopStyles.rightPanelCardTitle}>📄 Papers Read</Text>
        <Text style={{ fontSize: FontSize.displaySm, fontWeight: '800', color: Colors.purple, textAlign: 'center' }}>
          0
        </Text>
        <Text style={{ fontSize: FontSize.labelSm, color: Colors.muted, textAlign: 'center', marginTop: 4 }}>
          Goal: Comprehensive literature review
        </Text>
      </View>

      <View style={desktopStyles.rightPanelCard}>
        <Text style={desktopStyles.rightPanelCardTitle}>✏️ iPad Drawings</Text>
        <Text style={{ fontSize: FontSize.displaySm, fontWeight: '800', color: Colors.purple, textAlign: 'center' }}>
          0
        </Text>
        <Text style={{ fontSize: FontSize.labelSm, color: Colors.muted, textAlign: 'center', marginTop: 4 }}>
          Procreate anatomy sketches
        </Text>
      </View>

      <View style={desktopStyles.rightPanelCard}>
        <Text style={desktopStyles.rightPanelCardTitle}>📚 Subtopics</Text>
        <Text style={{ fontSize: FontSize.displaySm, fontWeight: '800', color: Colors.purple, textAlign: 'center' }}>
          0/70
        </Text>
      </View>

      <View style={desktopStyles.rightPanelCard}>
        <Text style={desktopStyles.rightPanelCardTitle}>⚡ APEX Cards</Text>
        <Text style={{ fontSize: FontSize.displaySm, fontWeight: '800', color: Colors.purple, textAlign: 'center' }}>
          0
        </Text>
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════
// EMPRESA: Financials + Checklist
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
          <Text style={{ fontSize: FontSize.labelSm, color: Colors.muted, letterSpacing: 0.8, fontWeight: '600' }}>
            {m.label}
          </Text>
          <Text style={{ fontSize: FontSize.headlineSm, fontWeight: '800', color: m.color, marginTop: 4 }}>
            {m.value}
          </Text>
        </View>
      ))}

      <Text style={[desktopStyles.rightPanelTitle, { marginTop: Spacing.lg }]}>
        CHECKLIST PROGRESS
      </Text>
      <View style={desktopStyles.rightPanelCard}>
        <Text style={{ fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '600', marginBottom: 8 }}>
          Decisiones Clave
        </Text>
        <View style={{ height: 6, backgroundColor: Colors.surfaceContainerHighest, borderRadius: 3, overflow: 'hidden' }}>
          <View style={{ height: 6, width: '0%', backgroundColor: Colors.amber, borderRadius: 3 }} />
        </View>
        <Text style={{ fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4 }}>
          0/6 completed
        </Text>
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════
// RESEARCH: Mayo Tracker + Journals
// ═══════════════════════════════════════════════
function ResearchRightPanel() {
  const tiers = [
    { tier: 'Tier 1', color: '#FFD700', journals: ['JAAD (IF 11.8)', 'JAMA Dermatology (IF 10.9)', 'BJD (IF 9.0)'] },
    { tier: 'Tier 2', color: '#C0C0C0', journals: ['JAAD International (IF 5.2)', 'Dermatologic Surgery (IF 4.5)'] },
    { tier: 'Tier 3', color: '#CD7F32', journals: ['J Cosmetic Dermatology', 'Aesthetic Surgery Journal'] },
  ];

  return (
    <View>
      <Text style={desktopStyles.rightPanelTitle}>MAYO CLINIC TRACKER</Text>

      <View style={desktopStyles.rightPanelCard}>
        <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, marginBottom: 8 }}>
          Publications Goal
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', marginBottom: 8 }}>
          <Text style={{ fontSize: FontSize.displaySm, fontWeight: '800', color: Colors.teal }}>0</Text>
          <Text style={{ fontSize: FontSize.headlineSm, fontWeight: '300', color: Colors.muted }}>/10</Text>
        </View>
        <View style={{ height: 6, backgroundColor: Colors.surfaceContainerHighest, borderRadius: 3, overflow: 'hidden' }}>
          <View style={{ height: 6, width: '0%', backgroundColor: Colors.teal, borderRadius: 3 }} />
        </View>
        <Text style={{ fontSize: FontSize.labelSm, color: Colors.muted, textAlign: 'center', marginTop: 4 }}>
          Before fellowship application
        </Text>
      </View>

      <Text style={[desktopStyles.rightPanelTitle, { marginTop: Spacing.lg }]}>
        TARGET JOURNALS
      </Text>
      {tiers.map((t, i) => (
        <View key={i} style={desktopStyles.rightPanelCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: t.color, marginRight: 8 }} />
            <Text style={{ fontSize: FontSize.labelMd, fontWeight: '700', color: t.color }}>{t.tier}</Text>
          </View>
          {t.journals.map((j, k) => (
            <Text key={k} style={{ fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, paddingLeft: 16, lineHeight: 20 }}>
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
