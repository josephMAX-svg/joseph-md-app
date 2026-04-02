import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';

const NICHES = [
  { name: 'Acné adolescente', icon: '🧬', potential: true, detail: 'Prevalencia Alta · Competencia Baja · S/40-60/mes' },
  { name: 'Acné adulto mujer', icon: '👩', potential: true, detail: '45% prevalencia · Competencia Nula · S/60-90/mes' },
  { name: 'Botox accesible DTC', icon: '💉', potential: true, detail: 'Demanda+ · Competencia Nula · S/150-300/sesión' },
  { name: 'Melasma subscription', icon: '🌗', potential: false, detail: '35% · Alta competencia · S/60-90/mes' },
  { name: 'Dermatitis atópica', icon: '🧴', potential: false, detail: '15% · Media · S/50-70/mes' },
  { name: 'Rosácea', icon: '🌹', potential: false, detail: '10% · Moderada · S/50-80/mes' },
];
const BUSINESS_AREAS = [
  { name: 'Estrategia', status: 'Pendiente', icon: '🎯', desc: 'Definir modelo de negocio, propuesta de valor y segmentación' },
  { name: 'Clinical OS', status: 'Protocolos A/B/C listos', icon: '🏥', desc: 'Protocolos clínicos estandarizados para acné, melasma y rosacea' },
  { name: 'Producto & UX', status: 'Diseño', icon: '🎨', desc: 'Diseño de app, flujo de usuario y experiencia de consulta' },
  { name: 'Tech Stack', status: 'Pendiente', icon: '💻', desc: 'React Native + Supabase + Stripe + Telemedicina SDK' },
  { name: 'Growth & Marketing', status: 'Fase 0 orgánico', icon: '📣', desc: 'Contenido educativo, SEO médico, y partnerships con influencers' },
  { name: 'Finanzas', status: 'Unit economics definidos', icon: '💰', desc: 'CAC target: S/50 · LTV: S/150+ · GM: 60.8%' },
  { name: 'Operaciones', status: 'Compliance pendiente', icon: '⚙️', desc: 'MINSA compliance, farmacia, logistics, fulfillment' },
  { name: 'Integrador', status: 'Monitoreando', icon: '🔗', desc: 'Dashboard para monitoreo cross-funcional de todas las áreas' },
];
const BENCHMARKS = [
  { name: 'Hims & Hers', revenue: '$440M', metric: 'ARR' },
  { name: 'Curology', revenue: '$88', metric: '/mes' },
  { name: 'Flo Health', revenue: 'Latam', metric: 'Expansion' },
];
const PHASES = [
  { name: 'Fase 0', label: 'Research', status: 'active' },
  { name: 'Fase 1', label: 'MVP Build', status: 'pending' },
  { name: 'Fase 2', label: 'Launch', status: 'pending' },
];
const CHECKLIST = [
  { text: 'Nombre de marca [DEFINIR PRIMERO]' },
  { text: 'Propuesta de valor única [DEFINIR PRIMERO]' },
  { text: 'Segmento exacto (edad, ciudad, condición)' },
  { text: 'Precio consulta online' },
  { text: 'Canal de adquisición' },
  { text: 'Regulación MINSA' },
];

export default function EmpresaScreen() {
  const [checkState, setCheckState] = useState(CHECKLIST.map(() => false));
  const [expandedNiche, setExpandedNiche] = useState<number | null>(null);

  const toggleCheck = (i: number) => setCheckState(p => { const n = [...p]; n[i] = !n[i]; return n; });

  return (
    <ScrollView style={st.screen} contentContainerStyle={st.scrollContent}>
      <View style={st.header}>
        <Text style={st.headerTitle}>DTC Dermatología Perú</Text>
        <View style={[st.badge, { backgroundColor: Colors.amber + '20' }]}>
          <Text style={[st.badgeText, { color: Colors.amber }]}>PRE-LANZAMIENTO MVP Oct 2026</Text>
        </View>
      </View>

      <View style={st.refCard}>
        <Text style={st.refTitle}>📊 Modelo: Hims & Hers</Text>
        <Text style={st.refSub}>DTC telehealth + personalized Rx dermatology</Text>
        <View style={st.benchmarksRow}>
          {BENCHMARKS.map((b, i) => (
            <View key={i} style={st.benchmarkCard}>
              <Text style={st.benchmarkName}>{b.name}</Text>
              <Text style={st.benchmarkRevenue}>{b.revenue}</Text>
              <Text style={st.benchmarkMetric}>{b.metric}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={st.sectionTitle}>NICHOS DE MERCADO</Text>
      <View style={st.nichesGrid}>
        {NICHES.map((n, i) => (
          <TouchableOpacity key={i} style={st.nicheCard} onPress={() => setExpandedNiche(expandedNiche === i ? null : i)}>
            <Text style={st.nicheIcon}>{n.icon}</Text>
            <Text style={st.nicheName}>{n.name}</Text>
            {expandedNiche === i && n.detail && <Text style={st.nicheDetail}>{n.detail}</Text>}
            {n.potential && (
              <View style={st.potentialBadge}><Text style={st.potentialText}>HIGH POTENTIAL</Text></View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Text style={st.sectionTitle}>ÁREAS DE NEGOCIO</Text>
      <View style={st.areasGrid}>
        {BUSINESS_AREAS.map((area, i) => (
          <TouchableOpacity key={i} style={st.areaCard} onPress={() => Alert.alert(area.name, `${area.status}\n\n${area.desc}`)}>
            <Text style={st.areaIcon}>{area.icon}</Text>
            <Text style={st.areaName}>{area.name}</Text>
            <View style={st.areaStatus}><View style={st.statusDot} /><Text style={st.statusText}>{area.status}</Text></View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={st.sectionTitle}>MÉTRICAS FINANCIERAS CLAVE</Text>
      <View style={st.finRow}>
        <View style={st.finCard}><Text style={st.finValue}>S/199</Text><Text style={st.finLabel}>PRECIO/MES</Text></View>
        <View style={st.finCard}><Text style={st.finValue}>60.8%</Text><Text style={st.finLabel}>GM</Text></View>
        <View style={st.finCard}><Text style={st.finValue}>33</Text><Text style={st.finLabel}>BREAK-EVEN</Text></View>
        <View style={st.finCard}><Text style={st.finValue}>≥3:1</Text><Text style={st.finLabel}>LTV/CAC</Text></View>
      </View>

      <Text style={st.sectionTitle}>DECISIONES CLAVE</Text>
      <View style={st.checklistCard}>
        {CHECKLIST.map((item, i) => (
          <TouchableOpacity key={i} style={st.checkRow} onPress={() => toggleCheck(i)}>
            <View style={[st.checkbox, checkState[i] && st.checkboxChecked]}>
              {checkState[i] && <Text style={st.checkmark}>✓</Text>}
            </View>
            <Text style={[st.checkText, checkState[i] && st.checkTextDone]}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={st.sectionTitle}>TIMELINE</Text>
      <View style={st.timelineRow}>
        {PHASES.map((phase, i) => (
          <View key={i} style={[st.phaseCard, phase.status === 'active' && { backgroundColor: Colors.amber + '20', borderColor: Colors.amber, borderWidth: 1 }]}>
            <Text style={[st.phaseName, phase.status === 'active' && { color: Colors.amber }]}>{phase.name}</Text>
            <Text style={st.phaseLabel}>{phase.label}</Text>
            {phase.status === 'active' && <View style={st.phaseTag}><Text style={st.phaseTagText}>CURRENT</Text></View>}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.surface },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: 60, paddingBottom: 120 },
  header: { marginBottom: Spacing['2xl'] },
  headerTitle: { fontSize: FontSize.headlineLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5, marginBottom: Spacing.sm },
  badge: { borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 12, alignSelf: 'flex-start' },
  badgeText: { fontSize: FontSize.labelSm, fontWeight: '700', letterSpacing: 0.3 },
  sectionTitle: { fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.md, marginTop: Spacing.lg },
  refCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.section },
  refTitle: { fontSize: FontSize.titleMd, fontWeight: '700', color: Colors.onSurface, marginBottom: 2 },
  refSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginBottom: Spacing.md },
  benchmarksRow: { flexDirection: 'row', gap: Spacing.sm },
  benchmarkCard: { flex: 1, backgroundColor: Colors.surfaceContainer, borderRadius: BorderRadius.md, padding: Spacing.md, alignItems: 'center' },
  benchmarkName: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, fontWeight: '600', marginBottom: 4 },
  benchmarkRevenue: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.amber },
  benchmarkMetric: { fontSize: 9, color: Colors.muted, marginTop: 2, letterSpacing: 0.5 },
  nichesGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4, marginBottom: Spacing.section },
  nicheCard: { width: '50%', paddingHorizontal: 4, marginBottom: 8 },
  nicheIcon: { fontSize: 24, marginBottom: 4 },
  nicheName: { fontSize: FontSize.bodyMd, fontWeight: '600', color: Colors.onSurface, marginBottom: 2 },
  nicheDetail: { fontSize: 9, color: Colors.muted, marginBottom: 4, lineHeight: 13 },
  potentialBadge: { backgroundColor: Colors.amber + '20', borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 6, alignSelf: 'flex-start' },
  potentialText: { fontSize: 8, fontWeight: '800', color: Colors.amber, letterSpacing: 0.5 },
  areasGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4, marginBottom: Spacing.section },
  areaCard: { width: '50%', paddingHorizontal: 4, marginBottom: 8 },
  areaIcon: { fontSize: 20, marginBottom: 4 },
  areaName: { fontSize: FontSize.bodyMd, fontWeight: '600', color: Colors.onSurface, marginBottom: 4 },
  areaStatus: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.amber, marginRight: 4 },
  statusText: { fontSize: FontSize.labelSm, color: Colors.amber, fontWeight: '500' },
  finRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.section },
  finCard: { flex: 1, backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md, alignItems: 'center' },
  finValue: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.amber },
  finLabel: { fontSize: 9, fontWeight: '600', color: Colors.muted, letterSpacing: 0.8, marginTop: 2 },
  checklistCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.section },
  checkRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: Colors.outlineVariant, marginRight: Spacing.md, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: Colors.amber, borderColor: Colors.amber },
  checkmark: { fontSize: 12, fontWeight: '700', color: '#0B1628' },
  checkText: { fontSize: FontSize.bodyMd, color: Colors.onSurface, flex: 1 },
  checkTextDone: { textDecorationLine: 'line-through', color: Colors.muted },
  timelineRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.section },
  phaseCard: { flex: 1, backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md, alignItems: 'center' },
  phaseName: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.onSurface },
  phaseLabel: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2 },
  phaseTag: { backgroundColor: Colors.amber, borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 6, marginTop: Spacing.xs },
  phaseTagText: { fontSize: 8, fontWeight: '800', color: '#0B1628', letterSpacing: 0.5 },
});
