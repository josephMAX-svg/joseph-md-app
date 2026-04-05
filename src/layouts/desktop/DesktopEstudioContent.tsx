import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { desktopStyles, DesktopColors } from '../../theme/desktopStyles';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery';
import {
  getLatestCZI,
  getStudyProgress,
  getWeakTopics,
} from '../../lib/supabase';
import type { WeakTopic } from '../../lib/supabase';
import GlassCard from '../../components/GlassCard';
import CircularProgress from '../../components/CircularProgress';

// ─── Static Data ───
const UWORLD_SYSTEMS = [
  'Cardiovascular', 'Endocrine', 'Gastrointestinal', 'Hematology/Oncology',
  'Immunology', 'Infectious Disease', 'Musculoskeletal', 'Nephrology',
  'Neurology', 'OB/GYN', 'Ophthalmology', 'Pediatrics',
  'Psychiatry', 'Pulmonary', 'Renal', 'Reproductive',
  'Dermatology', 'Emergency Medicine',
];

const PROMIR_SPECIALTIES = [
  'Cardiología', 'Cirugía General', 'Dermatología', 'Endocrinología', 'Gastroenterología',
  'Ginecología', 'Hematología', 'Inmunología', 'Medicina Interna', 'Nefrología',
  'Neumología', 'Neurología', 'Oftalmología', 'Oncología', 'ORL',
  'Pediatría', 'Psiquiatría', 'Radiología', 'Reumatología', 'Traumatología',
  'Urgencias', 'Urología', 'Anatomía Patológica', 'Anestesiología', 'Farmacología',
  'Fisiología', 'Genética', 'Medicina Preventiva', 'Bioestadística', 'Ética Médica',
];

const ENCAPS_AREAS = [
  'Medicina', 'Cirugía', 'Gineco-Obstetricia', 'Pediatría', 'Salud Pública',
];

type CountryTab = 'EEUU' | 'ESPAÑA' | 'PERÚ';

function useLiveProgress(specialties: string[], examen: string): Record<string, number> {
  const [progress, setProgress] = useState<Record<string, number>>({});
  useEffect(() => {
    let mounted = true;
    (async () => {
      const results: Record<string, number> = {};
      for (const spec of specialties) {
        try {
          const val = await getStudyProgress(examen, spec);
          if (!mounted) return;
          results[spec] = val;
        } catch {
          results[spec] = 0;
        }
      }
      if (mounted) setProgress(results);
    })();
    return () => { mounted = false; };
  }, [specialties.length, examen]);
  return progress;
}

// FIX 6: Color-coded progress indicator
function getProgressColor(pct: number): string {
  if (pct === 0) return Colors.coral;       // red
  if (pct <= 20) return '#F97316';          // orange
  if (pct <= 50) return '#FACC15';          // yellow
  if (pct <= 80) return Colors.blue;        // blue
  return Colors.green;                       // green
}

function getBottomBorderColor(pct: number): string {
  return getProgressColor(pct);
}

// Mini circular progress ring for specialty cards
function MiniProgressRing({ progress, color, size = 36 }: { progress: number; color: string; size?: number }) {
  return (
    <CircularProgress progress={progress} size={size} strokeWidth={3} color={color} trackColor="rgba(255,255,255,0.06)">
      <Text style={{ fontSize: 9, fontWeight: '700', color }}>{Math.round(progress)}%</Text>
    </CircularProgress>
  );
}

function SpecialtyCard({
  name, pct, exam, accentColor,
}: {
  name: string; pct: number; exam: string; accentColor: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const progressColor = getProgressColor(pct);
  const borderColor = getBottomBorderColor(pct);

  const webHover = Platform.OS === 'web'
    ? { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }
    : {};

  const webStyle = Platform.OS === 'web'
    ? {
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        ...(hovered ? {
          transform: [{ translateY: -2 }],
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          borderColor: 'rgba(255,255,255,0.15)',
        } : {}),
      }
    : {};

  return (
    <TouchableOpacity
      style={desktopStyles.specialtyCell}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.7}
    >
      <View
        style={[
          desktopStyles.specialtyCellInner,
          { borderBottomWidth: 3, borderBottomColor: borderColor },
          expanded && { borderColor: accentColor + '40' },
          webStyle as any,
        ]}
        {...webHover}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={desktopStyles.specialtyCellName} numberOfLines={1}>{name}</Text>
            <Text style={{ fontSize: 10, color: Colors.smallLabel, marginTop: 2 }}>{exam}</Text>
          </View>
          <MiniProgressRing progress={pct} color={progressColor} />
        </View>

        {/* Hover tooltip: last studied info */}
        {(hovered || expanded) && (
          <View style={{ marginTop: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' }}>
            <Text style={{ fontSize: 10, color: Colors.muted }}>
              Last studied: {pct > 0 ? 'Recently' : 'Never'}
            </Text>
            {expanded && (
              <Text style={{ fontSize: 10, color: Colors.teal, marginTop: 2, fontWeight: '600' }}>
                Tap to start APEX →
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

/**
 * Desktop Estudio Content — Premium Design v2.0
 * Circular progress rings, color-coded specialty grid, iOS segmented control tabs.
 */
export default function DesktopEstudioContent() {
  const [activeTab, setActiveTab] = useState<CountryTab>('EEUU');

  const { data: cziValue } = useSupabaseQuery(getLatestCZI, null);
  const { data: weakTopics } = useSupabaseQuery(
    () => {
      const examMap: Record<CountryTab, string> = { EEUU: 'USMLE', ESPAÑA: 'MIR', PERÚ: 'ENCAPS' };
      return getWeakTopics(examMap[activeTab]);
    },
    [] as WeakTopic[],
    [activeTab],
  );

  const uworldProgress = useLiveProgress(UWORLD_SYSTEMS, 'USMLE');
  const promirProgress = useLiveProgress(PROMIR_SPECIALTIES, 'MIR');
  const encapsProgress = useLiveProgress(ENCAPS_AREAS, 'ENCAPS');

  const getCZIColor = (val: number | null) => {
    if (val === null) return Colors.muted;
    if (val >= 0.90) return Colors.green;
    if (val >= 0.70) return Colors.amber;
    return Colors.coral;
  };

  const worstWeakTopic = weakTopics.length > 0 ? weakTopics[0] : null;

  const tabs: { key: CountryTab; label: string }[] = [
    { key: 'EEUU', label: '🇺🇸 EEUU' },
    { key: 'ESPAÑA', label: '🇪🇸 España' },
    { key: 'PERÚ', label: '🇵🇪 Perú' },
  ];

  const getSpecialties = (): { names: string[]; progress: Record<string, number>; exam: string; color: string } => {
    switch (activeTab) {
      case 'EEUU':
        return { names: UWORLD_SYSTEMS, progress: uworldProgress, exam: 'USMLE', color: Colors.teal };
      case 'ESPAÑA':
        return { names: PROMIR_SPECIALTIES, progress: promirProgress, exam: 'MIR', color: Colors.amber };
      case 'PERÚ':
        return { names: ENCAPS_AREAS, progress: encapsProgress, exam: 'ENCAPS', color: Colors.coral };
    }
  };

  const { names, progress, exam, color } = getSpecialties();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.surface }}
      contentContainerStyle={desktopStyles.centerScrollContent}
    >
      {/* Header with CZI Badge */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing['2xl'] }}>
        <View style={{ flex: 1 }}>
          <Text style={desktopStyles.pageTitle}>Motor APEX</Text>
          <Text style={[desktopStyles.bodyText, { color: Colors.onSurfaceVariant, marginTop: 2 }]}>
            MIR · USMLE · ENCAPS
          </Text>
        </View>
        <GlassCard style={{ paddingVertical: 6, paddingHorizontal: 14, alignItems: 'center', marginBottom: 0 } as any}>
          <Text style={{ fontSize: 10, fontWeight: '700', letterSpacing: 1, color: getCZIColor(cziValue) }}>CZI</Text>
          <Text style={{ fontSize: FontSize.titleMd, fontWeight: '800', color: getCZIColor(cziValue) }}>
            {cziValue !== null ? cziValue.toFixed(2) : '--'}
          </Text>
        </GlassCard>
      </View>

      {/* Weak Topic Alert */}
      {worstWeakTopic && (
        <GlassCard style={{ backgroundColor: Colors.coral + '12', borderLeftWidth: 3, borderLeftColor: Colors.coral, marginBottom: Spacing.section, flexDirection: 'row', alignItems: 'center' } as any}>
          <Text style={{ fontSize: 20, marginRight: Spacing.sm }}>⚠️</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.coral, marginBottom: 2 }}>Tema débil detectado</Text>
            <Text style={{ fontSize: 11, color: Colors.onSurfaceVariant }}>
              {worstWeakTopic.especialidad} · {worstWeakTopic.daysSinceActivity} días sin actividad
            </Text>
          </View>
        </GlassCard>
      )}

      {/* APEX Button */}
      <TouchableOpacity style={[{
        backgroundColor: Colors.teal,
        borderRadius: 14,
        padding: Spacing.xl,
        alignItems: 'center',
        marginBottom: Spacing.section,
        ...(Platform.OS === 'web' ? {
          boxShadow: '0 0 24px rgba(15, 212, 160, 0.25)',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        } : {}),
      }]}>
        <Text style={{ fontSize: FontSize.titleMd, fontWeight: '800', color: '#0B1628', letterSpacing: 0.5 }}>
          ⚡ INICIAR APEX
        </Text>
        <Text style={{ fontSize: FontSize.labelSm, color: '#0B1628', marginTop: 2, opacity: 0.7 }}>
          Sesión adaptativa de estudio
        </Text>
      </TouchableOpacity>

      {/* Country Tabs — iOS Segmented Control Style */}
      <View style={{
        flexDirection: 'row',
        marginBottom: Spacing.section,
        backgroundColor: DesktopColors.glass,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: DesktopColors.glassBorder,
        padding: 3,
      }}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[{
              flex: 1,
              paddingVertical: Spacing.sm,
              alignItems: 'center',
              borderRadius: 9,
              backgroundColor: activeTab === tab.key ? Colors.surfaceContainerHighest : 'transparent',
              ...(Platform.OS === 'web' ? { transition: 'all 0.2s ease', cursor: 'pointer' } : {}),
            }]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={{
              fontSize: FontSize.labelMd,
              fontWeight: activeTab === tab.key ? '700' : '500',
              color: activeTab === tab.key ? Colors.onSurface : Colors.muted,
            }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Specialty Grid */}
      <Text style={desktopStyles.sectionHeader}>
        ESPECIALIDADES ({names.length})
      </Text>
      <View style={desktopStyles.specialtyGrid}>
        {names.map((name) => {
          const pct = progress[name] ?? 0;
          return (
            <SpecialtyCard
              key={name}
              name={name}
              pct={pct}
              exam={exam}
              accentColor={color}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}
