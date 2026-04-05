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
import AgentChatModal from '../../components/AgentChatModal';

// ─── Data Structures ───
interface BankItem { name: string; count: string; }

const UWORLD_SYSTEMS: BankItem[] = [
  { name: 'Behavioral Health', count: '96 Qs' },
  { name: 'Biostatistics & Epidemiology', count: '75 Qs' },
  { name: 'Blood & Lymphoreticular', count: '175 Qs' },
  { name: 'Cardiovascular', count: '256 Qs' },
  { name: 'Endocrine', count: '145 Qs' },
  { name: 'Female Reproductive', count: '85 Qs' },
  { name: 'Gastrointestinal', count: '225 Qs' },
  { name: 'Human Development', count: '327 Qs' },
  { name: 'Immune System', count: '123 Qs' },
  { name: 'Male Reproductive', count: '43 Qs' },
  { name: 'Multisystem Processes', count: '206 Qs' },
  { name: 'Musculoskeletal', count: '132 Qs' },
  { name: 'Nervous System', count: '318 Qs' },
  { name: 'Pregnancy & Puerperium', count: '58 Qs' },
  { name: 'Renal & Urinary', count: '146 Qs' },
  { name: 'Respiratory', count: '173 Qs' },
  { name: 'Skin & Subcutaneous', count: '108 Qs' },
  { name: 'Social Sciences', count: '54 Qs' },
];

const AMBOSS_SUBJECTS: BankItem[] = [
  { name: 'Allergy & Immunology', count: '6 systems' },
  { name: 'Biochemistry', count: '5 systems' },
  { name: 'Biostatistics & Epidemiology', count: '5 systems' },
  { name: 'Cardiovascular', count: '11 systems' },
  { name: 'Dermatology', count: '6 systems' },
  { name: 'ENT', count: '1 system' },
  { name: 'Endocrine Diabetes & Metabolism', count: '10 systems' },
  { name: 'Female Reproductive', count: '7 systems' },
  { name: 'GI & Nutrition', count: '10 systems' },
  { name: 'Genetics', count: '6 systems' },
  { name: 'Hematology & Oncology', count: '9 systems' },
  { name: 'Infectious Diseases', count: '8 systems' },
  { name: 'Male Reproductive', count: '2 systems' },
  { name: 'Microbiology', count: '5 systems' },
  { name: 'Miscellaneous', count: '1 system' },
  { name: 'Nervous System', count: '16 systems' },
  { name: 'Ophthalmology', count: '2 systems' },
  { name: 'Pathology', count: '3 systems' },
  { name: 'Pharmacology', count: '4 systems' },
  { name: 'Poisoning & Environmental', count: '2 systems' },
  { name: 'Pregnancy & Puerperium', count: '2 systems' },
  { name: 'Psychiatric/Behavioral', count: '10 systems' },
  { name: 'Pulmonary & Critical Care', count: '10 systems' },
  { name: 'Renal Urinary & Electrolytes', count: '13 systems' },
  { name: 'Rheumatology/Orthopedics', count: '9 systems' },
  { name: 'Social Sciences', count: '6 systems' },
];

const SECONDARY_BANKS = [
  'Bootcamp', 'B&B', 'Costanzo', 'Osmosis', 'Pixorize', 'NinjaNerd',
  'USMLERx', 'COMBANK', 'SketchyPath', 'SketchyPharm', 'SketchyMicro',
  'SketchyAnatomy', 'SketchyBiochem', 'SketchyImmunology', 'SketchyPhysiology',
  'DirtyMedicine', 'OME', 'Low/HighYield',
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

// ─── Bank Colors (user spec) ───
const BANK_COLORS = {
  uworld: Colors.amber,   // orange
  amboss: Colors.green,   // green
  nbme: Colors.blue,      // blue
  firstaid: Colors.coral, // red
  secondary: Colors.muted,
};

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
  if (pct === 0) return Colors.coral;
  if (pct <= 20) return '#F97316';
  if (pct <= 50) return '#FACC15';
  if (pct <= 80) return Colors.blue;
  return Colors.green;
}

function MiniProgressRing({ progress, color, size = 64 }: { progress: number; color: string; size?: number }) {
  return (
    <CircularProgress progress={progress} size={size} strokeWidth={4} color={color} trackColor="rgba(255,255,255,0.06)">
      <Text style={{ fontSize: 24, fontWeight: '700', color }}>{Math.round(progress)}</Text>
    </CircularProgress>
  );
}

function BankCard({
  name, detail, pct, accentColor,
}: {
  name: string; detail: string; pct: number; accentColor: string;
}) {
  const [hovered, setHovered] = useState(false);
  const progressColor = getProgressColor(pct);

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
    <View style={desktopStyles.specialtyCell}>
      <View
        style={[
          desktopStyles.specialtyCellInner,
          { borderLeftColor: accentColor },
          webStyle as any,
        ]}
        {...webHover}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={desktopStyles.specialtyCellName} numberOfLines={2}>{name}</Text>
            <Text style={{ fontSize: 10, color: Colors.smallLabel, marginTop: 2 }}>{detail}</Text>
            {pct === 0 && (
              <Text style={{ fontSize: 10, color: Colors.muted, marginTop: 4, fontStyle: 'italic' }}>
                Sin actividad
              </Text>
            )}
          </View>
          <MiniProgressRing progress={pct} color={progressColor} />
        </View>
      </View>
    </View>
  );
}

function BankSectionHeader({
  title, color, badge, count,
}: {
  title: string; color: string; badge?: string; count?: string;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md, marginTop: Spacing.lg }}>
      <View style={{ width: 4, height: 20, backgroundColor: color, borderRadius: 2, marginRight: 10 }} />
      <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.onSurface, letterSpacing: 0.5, flex: 1 }}>
        {title}
      </Text>
      {count && (
        <Text style={{ fontSize: 11, color: Colors.smallLabel, marginRight: badge ? 8 : 0 }}>{count}</Text>
      )}
      {badge && (
        badge === 'PRIMARY' ? (
          <View style={{ backgroundColor: color + '20', borderRadius: 999, paddingVertical: 2, paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 10, fontWeight: '800', color, letterSpacing: 0.5 }}>{badge}</Text>
          </View>
        ) : (
          <Text style={{ fontSize: 11, color: Colors.muted, fontWeight: '500' }}>
            {badge.toLowerCase()}
          </Text>
        )
      )}
    </View>
  );
}

function CompactBankCard({ title, subtitle, color }: { title: string; subtitle: string; color: string }) {
  return (
    <View
      style={[
        desktopStyles.specialtyCellInner,
        { borderLeftColor: color, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
      ]}
    >
      <View>
        <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.onSurface }}>{title}</Text>
        <Text style={{ fontSize: 11, color: Colors.smallLabel, marginTop: 2 }}>{subtitle}</Text>
      </View>
      <Text style={{ fontSize: 24, fontWeight: '700', color }}>0%</Text>
    </View>
  );
}

/**
 * Desktop Estudio Content — bank-structured EEUU, flat lists for ESPAÑA/PERÚ.
 */
export default function DesktopEstudioContent() {
  const [activeTab, setActiveTab] = useState<CountryTab>('EEUU');
  const [showSecondary, setShowSecondary] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);

  const { data: cziValue } = useSupabaseQuery(getLatestCZI, null);
  const { data: weakTopics } = useSupabaseQuery(
    () => {
      const examMap: Record<CountryTab, string> = { EEUU: 'USMLE', ESPAÑA: 'MIR', PERÚ: 'ENCAPS' };
      return getWeakTopics(examMap[activeTab]);
    },
    [] as WeakTopic[],
    [activeTab],
  );

  const uworldProgress = useLiveProgress(UWORLD_SYSTEMS.map(s => s.name), 'USMLE');
  const ambossProgress = useLiveProgress(AMBOSS_SUBJECTS.map(s => s.name), 'USMLE');
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

      {/* APEX Button + Chat button row */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: Spacing.section }}>
        <TouchableOpacity style={[{
          flex: 2,
          backgroundColor: Colors.teal,
          borderRadius: 14,
          padding: Spacing.xl,
          alignItems: 'center',
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
        <TouchableOpacity
          onPress={() => setChatVisible(true)}
          style={[{
            flex: 1,
            backgroundColor: 'rgba(46,124,246,0.15)',
            borderRadius: 14,
            padding: Spacing.xl,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: Colors.blue + '40',
            ...(Platform.OS === 'web' ? { transition: 'all 0.2s ease', cursor: 'pointer' as any } : {}),
          }]}
        >
          <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.blue, letterSpacing: 0.3 }}>
            💬 Chat con agente
          </Text>
          <Text style={{ fontSize: 10, color: Colors.muted, marginTop: 2 }}>
            ProMIR Scout
          </Text>
        </TouchableOpacity>
      </View>

      <AgentChatModal
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
        initialAgent="promir"
      />

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

      {/* ═══ EEUU TAB — Bank-structured ═══ */}
      {activeTab === 'EEUU' && (
        <View>
          {/* UWORLD */}
          <BankSectionHeader title="UWORLD" color={BANK_COLORS.uworld} badge="PRIMARY" count={`${UWORLD_SYSTEMS.length} systems`} />
          <View style={desktopStyles.specialtyGrid}>
            {UWORLD_SYSTEMS.map((s) => (
              <BankCard
                key={s.name}
                name={s.name}
                detail={s.count}
                pct={uworldProgress[s.name] ?? 0}
                accentColor={BANK_COLORS.uworld}
              />
            ))}
          </View>

          {/* AMBOSS */}
          <BankSectionHeader title="AMBOSS" color={BANK_COLORS.amboss} badge="PRIMARY" count={`${AMBOSS_SUBJECTS.length} subjects`} />
          <View style={desktopStyles.specialtyGrid}>
            {AMBOSS_SUBJECTS.map((s) => (
              <BankCard
                key={s.name}
                name={s.name}
                detail={s.count}
                pct={ambossProgress[s.name] ?? 0}
                accentColor={BANK_COLORS.amboss}
              />
            ))}
          </View>

          {/* NBME — compact */}
          <BankSectionHeader title="NBME" color={BANK_COLORS.nbme} />
          <CompactBankCard title="NBME Practice Exams" subtitle="Practice exams" color={BANK_COLORS.nbme} />

          {/* FIRST AID — compact */}
          <View style={{ marginTop: 16 }}>
            <BankSectionHeader title="FIRST AID" color={BANK_COLORS.firstaid} />
            <CompactBankCard title="First Aid" subtitle="Review resource" color={BANK_COLORS.firstaid} />
          </View>

          {/* Secondary Banks (collapsible) */}
          <TouchableOpacity
            onPress={() => setShowSecondary(!showSecondary)}
            style={[{
              marginTop: Spacing.lg,
              paddingVertical: Spacing.md,
              paddingHorizontal: Spacing.md,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.03)',
              ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
            }]}
          >
            <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.muted, flex: 1 }}>
              {showSecondary ? '▾' : '▸'} Secondary Banks ({SECONDARY_BANKS.length})
            </Text>
          </TouchableOpacity>
          {showSecondary && (
            <View style={[desktopStyles.specialtyGrid, { marginTop: Spacing.md }]}>
              {SECONDARY_BANKS.map((b) => (
                <BankCard
                  key={b}
                  name={b}
                  detail="0%"
                  pct={0}
                  accentColor={BANK_COLORS.secondary}
                />
              ))}
            </View>
          )}
        </View>
      )}

      {/* ═══ ESPAÑA TAB — ProMIR 30 specialties ═══ */}
      {activeTab === 'ESPAÑA' && (
        <View>
          <BankSectionHeader title="PROMIR" color={Colors.amber} badge="30 SPECIALTIES" />
          <View style={desktopStyles.specialtyGrid}>
            {PROMIR_SPECIALTIES.map((name) => (
              <BankCard
                key={name}
                name={name}
                detail="MIR"
                pct={promirProgress[name] ?? 0}
                accentColor={Colors.amber}
              />
            ))}
          </View>
        </View>
      )}

      {/* ═══ PERÚ TAB — ENCAPS 5 areas ═══ */}
      {activeTab === 'PERÚ' && (
        <View>
          <BankSectionHeader title="ENCAPS" color={Colors.coral} badge="5 AREAS" />
          <View style={desktopStyles.specialtyGrid}>
            {ENCAPS_AREAS.map((name) => (
              <BankCard
                key={name}
                name={name}
                detail="ENCAPS"
                pct={encapsProgress[name] ?? 0}
                accentColor={Colors.coral}
              />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
