import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { desktopStyles } from '../../theme/desktopStyles';

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
  { name: 'Clinical OS', status: 'Protocolos A/B/C listos', icon: '🏥', desc: 'Protocolos clínicos estandarizados' },
  { name: 'Producto & UX', status: 'Diseño', icon: '🎨', desc: 'Diseño de app y experiencia de consulta' },
  { name: 'Tech Stack', status: 'Pendiente', icon: '💻', desc: 'React Native + Supabase + Stripe' },
  { name: 'Growth & Marketing', status: 'Fase 0 orgánico', icon: '📣', desc: 'Contenido educativo, SEO médico' },
  { name: 'Finanzas', status: 'Unit economics definidos', icon: '💰', desc: 'CAC: S/50 · LTV: S/150+ · GM: 60.8%' },
  { name: 'Operaciones', status: 'Compliance pendiente', icon: '⚙️', desc: 'MINSA compliance, logistics' },
  { name: 'Integrador', status: 'Monitoreando', icon: '🔗', desc: 'Dashboard cross-funcional' },
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
  'Nombre de marca [DEFINIR PRIMERO]',
  'Propuesta de valor única [DEFINIR PRIMERO]',
  'Segmento exacto (edad, ciudad, condición)',
  'Precio consulta online',
  'Canal de adquisición',
  'Regulación MINSA',
];

/**
 * Desktop Empresa Content — 2-column layout with Nichos + Metrics,
 * horizontal timeline, and checklist with progress bar.
 */
export default function DesktopEmpresaContent() {
  const [checkState, setCheckState] = useState(CHECKLIST.map(() => false));
  const [expandedNiche, setExpandedNiche] = useState<number | null>(null);

  const toggleCheck = (i: number) => setCheckState(p => { const n = [...p]; n[i] = !n[i]; return n; });
  const completedCount = checkState.filter(Boolean).length;
  const completedPct = (completedCount / CHECKLIST.length) * 100;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.surface }}
      contentContainerStyle={desktopStyles.centerScrollContent}
    >
      {/* Header */}
      <View style={{ marginBottom: Spacing['2xl'] }}>
        <Text style={{ fontSize: FontSize.headlineLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5, marginBottom: Spacing.sm }}>
          DTC Dermatología Perú
        </Text>
        <View style={{ backgroundColor: Colors.amber + '20', borderRadius: 999, paddingVertical: 4, paddingHorizontal: 12, alignSelf: 'flex-start' }}>
          <Text style={{ fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.amber, letterSpacing: 0.3 }}>
            PRE-LANZAMIENTO MVP Oct 2026
          </Text>
        </View>
      </View>

      {/* Benchmarks */}
      <View style={{ backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.section }}>
        <Text style={{ fontSize: FontSize.titleMd, fontWeight: '700', color: Colors.onSurface, marginBottom: 2 }}>
          📊 Modelo: Hims & Hers
        </Text>
        <Text style={{ fontSize: FontSize.labelSm, color: Colors.muted, marginBottom: Spacing.md }}>
          DTC telehealth + personalized Rx dermatology
        </Text>
        <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
          {BENCHMARKS.map((b, i) => (
            <View key={i} style={{ flex: 1, backgroundColor: Colors.surfaceContainer, borderRadius: BorderRadius.md, padding: Spacing.md, alignItems: 'center' }}>
              <Text style={{ fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, fontWeight: '600', marginBottom: 4 }}>{b.name}</Text>
              <Text style={{ fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.amber }}>{b.revenue}</Text>
              <Text style={{ fontSize: 9, color: Colors.muted, marginTop: 2, letterSpacing: 0.5 }}>{b.metric}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 2-Column Layout */}
      <View style={desktopStyles.enterprise2Col}>
        {/* Left: Nichos Grid */}
        <View style={desktopStyles.enterpriseColLeft}>
          <Text style={{ fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.md }}>
            NICHOS DE MERCADO
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4 }}>
            {NICHES.map((n, i) => (
              <TouchableOpacity
                key={i}
                style={{ width: '50%', paddingHorizontal: 4, marginBottom: 8 }}
                onPress={() => setExpandedNiche(expandedNiche === i ? null : i)}
              >
                <View style={{ backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md }}>
                  <Text style={{ fontSize: 24, marginBottom: 4 }}>{n.icon}</Text>
                  <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '600', color: Colors.onSurface, marginBottom: 2 }}>{n.name}</Text>
                  {expandedNiche === i && (
                    <Text style={{ fontSize: 9, color: Colors.muted, marginBottom: 4, lineHeight: 13 }}>{n.detail}</Text>
                  )}
                  {n.potential && (
                    <View style={{ backgroundColor: Colors.amber + '20', borderRadius: 999, paddingVertical: 1, paddingHorizontal: 6, alignSelf: 'flex-start' }}>
                      <Text style={{ fontSize: 8, fontWeight: '800', color: Colors.amber, letterSpacing: 0.5 }}>HIGH POTENTIAL</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Business Areas */}
          <Text style={{ fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.md, marginTop: Spacing.lg }}>
            ÁREAS DE NEGOCIO
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4 }}>
            {BUSINESS_AREAS.map((area, i) => (
              <TouchableOpacity
                key={i}
                style={{ width: '50%', paddingHorizontal: 4, marginBottom: 8 }}
                onPress={() => Alert.alert(area.name, `${area.status}\n\n${area.desc}`)}
              >
                <View style={{ backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md }}>
                  <Text style={{ fontSize: 20, marginBottom: 4 }}>{area.icon}</Text>
                  <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '600', color: Colors.onSurface, marginBottom: 4 }}>{area.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.amber, marginRight: 4 }} />
                    <Text style={{ fontSize: FontSize.labelSm, color: Colors.amber, fontWeight: '500' }}>{area.status}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Right: Metrics + Checklist */}
        <View style={desktopStyles.enterpriseColRight}>
          {/* Financial Metrics */}
          <Text style={{ fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.md }}>
            MÉTRICAS FINANCIERAS
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.section }}>
            {[
              { label: 'PRECIO/MES', value: 'S/199' },
              { label: 'GM', value: '60.8%' },
              { label: 'BREAK-EVEN', value: '33' },
              { label: 'LTV/CAC', value: '≥3:1' },
            ].map((m, i) => (
              <View key={i} style={{ flex: 1, minWidth: '45%', backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md, alignItems: 'center' }}>
                <Text style={{ fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.amber }}>{m.value}</Text>
                <Text style={{ fontSize: 9, fontWeight: '600', color: Colors.muted, letterSpacing: 0.8, marginTop: 2 }}>{m.label}</Text>
              </View>
            ))}
          </View>

          {/* Checklist with Progress */}
          <Text style={{ fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.md }}>
            DECISIONES CLAVE ({completedCount}/{CHECKLIST.length})
          </Text>
          <View style={{ marginBottom: Spacing.md }}>
            <View style={{ height: 6, backgroundColor: Colors.surfaceContainerHighest, borderRadius: 3, overflow: 'hidden' }}>
              <View style={{ height: 6, width: `${completedPct}%`, backgroundColor: Colors.amber, borderRadius: 3 }} />
            </View>
          </View>
          <View style={{ backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.lg }}>
            {CHECKLIST.map((item, i) => (
              <TouchableOpacity key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm }} onPress={() => toggleCheck(i)}>
                <View style={{
                  width: 20, height: 20, borderRadius: 4,
                  borderWidth: 2, borderColor: checkState[i] ? Colors.amber : Colors.outlineVariant,
                  backgroundColor: checkState[i] ? Colors.amber : 'transparent',
                  marginRight: Spacing.md, alignItems: 'center', justifyContent: 'center',
                }}>
                  {checkState[i] && <Text style={{ fontSize: 12, fontWeight: '700', color: '#0B1628' }}>✓</Text>}
                </View>
                <Text style={{
                  fontSize: FontSize.bodyMd, color: checkState[i] ? Colors.muted : Colors.onSurface,
                  flex: 1, textDecorationLine: checkState[i] ? 'line-through' : 'none',
                }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Timeline */}
          <Text style={{ fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.md, marginTop: Spacing.xl }}>
            TIMELINE
          </Text>
          <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
            {PHASES.map((phase, i) => (
              <View key={i} style={{
                flex: 1,
                backgroundColor: phase.status === 'active' ? Colors.amber + '20' : Colors.surfaceContainerLow,
                borderRadius: BorderRadius.md,
                padding: Spacing.md,
                alignItems: 'center',
                borderWidth: phase.status === 'active' ? 1 : 0,
                borderColor: Colors.amber,
              }}>
                <Text style={{ fontSize: FontSize.titleMd, fontWeight: '800', color: phase.status === 'active' ? Colors.amber : Colors.onSurface }}>
                  {phase.name}
                </Text>
                <Text style={{ fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2 }}>{phase.label}</Text>
                {phase.status === 'active' && (
                  <View style={{ backgroundColor: Colors.amber, borderRadius: 999, paddingVertical: 1, paddingHorizontal: 6, marginTop: Spacing.xs }}>
                    <Text style={{ fontSize: 8, fontWeight: '800', color: '#0B1628', letterSpacing: 0.5 }}>CURRENT</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
