import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { desktopStyles } from '../../theme/desktopStyles';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery';
import {
  getLatestCZI,
  getStudyProgress,
  getWeakTopics,
} from '../../lib/supabase';
import type { WeakTopic } from '../../lib/supabase';

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

function getProgressColor(pct: number): string {
  if (pct < 20) return Colors.coral;
  if (pct <= 50) return Colors.amber;
  return Colors.green;
}

/**
 * Desktop Estudio Content — Specialty grid (3-4 columns) with expandable cells.
 */
export default function DesktopEstudioContent() {
  const [activeTab, setActiveTab] = useState<CountryTab>('EEUU');
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);

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
          <Text style={{ fontSize: FontSize.headlineLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5 }}>
            Motor APEX
          </Text>
          <Text style={{ fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: 2 }}>
            MIR · USMLE · ENCAPS
          </Text>
        </View>
        <View style={{
          borderRadius: BorderRadius.md,
          borderWidth: 1.5,
          borderColor: getCZIColor(cziValue) + '50',
          paddingVertical: Spacing.xs,
          paddingHorizontal: Spacing.md,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: FontSize.labelSm, fontWeight: '700', letterSpacing: 1, color: getCZIColor(cziValue) }}>CZI</Text>
          <Text style={{ fontSize: FontSize.titleMd, fontWeight: '800', color: getCZIColor(cziValue) }}>
            {cziValue !== null ? cziValue.toFixed(2) : '--'}
          </Text>
        </View>
      </View>

      {/* Weak Topic Alert */}
      {worstWeakTopic && (
        <View style={{ backgroundColor: Colors.coral + '15', borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.section, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, marginRight: Spacing.sm }}>⚠️</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.coral, marginBottom: 2 }}>Tema débil detectado</Text>
            <Text style={{ fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant }}>
              {worstWeakTopic.especialidad} · {worstWeakTopic.daysSinceActivity} días sin actividad
            </Text>
          </View>
        </View>
      )}

      {/* APEX Button */}
      <TouchableOpacity style={{
        backgroundColor: Colors.teal,
        borderRadius: BorderRadius.lg,
        padding: Spacing.xl,
        alignItems: 'center',
        marginBottom: Spacing.section,
      }}>
        <Text style={{ fontSize: FontSize.titleMd, fontWeight: '800', color: '#0B1628', letterSpacing: 0.5 }}>
          ⚡ INICIAR APEX
        </Text>
        <Text style={{ fontSize: FontSize.labelSm, color: '#0B1628', marginTop: 2, opacity: 0.7 }}>
          Sesión adaptativa de estudio
        </Text>
      </TouchableOpacity>

      {/* Country Tabs */}
      <View style={{ flexDirection: 'row', marginBottom: Spacing.section, backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: 3 }}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={{
              flex: 1,
              paddingVertical: Spacing.sm,
              alignItems: 'center',
              borderRadius: BorderRadius.sm,
              backgroundColor: activeTab === tab.key ? Colors.surfaceContainerHighest : 'transparent',
            }}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={{ fontSize: FontSize.labelMd, fontWeight: '600', color: activeTab === tab.key ? Colors.onSurface : Colors.muted }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Specialty Grid — 3-4 columns */}
      <Text style={{ fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.md }}>
        ESPECIALIDADES ({names.length})
      </Text>
      <View style={desktopStyles.specialtyGrid}>
        {names.map((name) => {
          const pct = progress[name] ?? 0;
          const progressColor = getProgressColor(pct);
          const isExpanded = expandedSpec === name;
          return (
            <TouchableOpacity
              key={name}
              style={desktopStyles.specialtyCell}
              onPress={() => setExpandedSpec(isExpanded ? null : name)}
              activeOpacity={0.7}
            >
              <View style={[desktopStyles.specialtyCellInner, isExpanded && { borderWidth: 1, borderColor: color + '40' }]}>
                <Text style={desktopStyles.specialtyCellName} numberOfLines={1}>{name}</Text>
                <Text style={[desktopStyles.specialtyCellPercent, { color: progressColor }]}>
                  {Math.round(pct)}%
                </Text>
                {/* Mini progress bar */}
                <View style={{ height: 4, backgroundColor: Colors.surfaceContainerHighest, borderRadius: 2, overflow: 'hidden' }}>
                  <View style={{ width: `${Math.min(pct, 100)}%`, height: 4, backgroundColor: progressColor, borderRadius: 2 }} />
                </View>
                {isExpanded && (
                  <View style={{ marginTop: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.surfaceContainerHighest }}>
                    <Text style={{ fontSize: FontSize.labelSm, color: Colors.muted }}>
                      Exam: {exam}
                    </Text>
                    <Text style={{ fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2 }}>
                      Last activity: {pct > 0 ? 'Recent' : 'Never'}
                    </Text>
                    <Text style={{ fontSize: FontSize.labelSm, color: Colors.teal, marginTop: 2, fontWeight: '600' }}>
                      Tap to start APEX →
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
