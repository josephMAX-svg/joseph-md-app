import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';
import { useSupabaseQuery } from '../hooks/useSupabaseQuery';
import {
  getLatestCZI,
  getStudyProgress,
  getWeakTopics,
  getPalmertonErrors,
  getTimingStats,
  getApexQueueCount,
} from '../lib/supabase';
import type { PalmertonErrorDist, TimingStats, WeakTopic } from '../lib/supabase';
import ApexSubmitModal from '../components/ApexSubmitModal';

// ─── Data Structures ───
interface Bank {
  name: string;
  count: string;
  progress: number;
}

const UWORLD_SYSTEMS: Bank[] = [
  { name: 'Cardiovascular', count: '286 Qs', progress: 0 },
  { name: 'Endocrine', count: '192 Qs', progress: 0 },
  { name: 'Gastrointestinal', count: '244 Qs', progress: 0 },
  { name: 'Hematology/Oncology', count: '212 Qs', progress: 0 },
  { name: 'Immunology', count: '98 Qs', progress: 0 },
  { name: 'Infectious Disease', count: '176 Qs', progress: 0 },
  { name: 'Musculoskeletal', count: '134 Qs', progress: 0 },
  { name: 'Nephrology', count: '168 Qs', progress: 0 },
  { name: 'Neurology', count: '198 Qs', progress: 0 },
  { name: 'OB/GYN', count: '156 Qs', progress: 0 },
  { name: 'Ophthalmology', count: '64 Qs', progress: 0 },
  { name: 'Pediatrics', count: '188 Qs', progress: 0 },
  { name: 'Psychiatry', count: '142 Qs', progress: 0 },
  { name: 'Pulmonary', count: '178 Qs', progress: 0 },
  { name: 'Renal', count: '112 Qs', progress: 0 },
  { name: 'Reproductive', count: '96 Qs', progress: 0 },
  { name: 'Dermatology', count: '88 Qs', progress: 0 },
  { name: 'Emergency Medicine', count: '104 Qs', progress: 0 },
];

const AMBOSS_SUBJECTS: Bank[] = [
  'Anatomy', 'Biochemistry', 'Biostatistics', 'Cardiac', 'Dermatology',
  'Emergency', 'Endocrine', 'ENT', 'Ethics', 'Gastro',
  'Genetics', 'Hematology', 'Immunology', 'Infectious', 'MSK',
  'Nephrology', 'Neurology', 'Nutrition', 'OBGYN', 'Oncology',
  'Ophthalmology', 'Pathology', 'Pediatrics', 'Pharmacology', 'Psychiatry',
  'Pulmonary',
].map(name => ({ name, count: `${Math.floor(Math.random() * 8 + 3)} systems`, progress: 0 }));

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

// ═══════════════════════════════════════════════
// Palmerton Error Colors
// ═══════════════════════════════════════════════
const PALMERTON_COLORS: Record<string, string> = {
  CONTEXTO: Colors.coral,
  CRONOLOGIA: Colors.amber,
  CCSN: '#FACC15', // yellow
  CONCEPTO: Colors.blue,
  OLVIDO: Colors.purple,
};

// ─── Progress Item (with live data support) ───
function ProgressItem({ name, detail, progress, color }: { name: string; detail: string; progress: number; color: string }) {
  return (
    <View style={styles.progressItem}>
      <View style={styles.progressItemHeader}>
        <Text style={styles.progressItemName} numberOfLines={1}>{name}</Text>
        <Text style={styles.progressItemDetail}>{progress > 0 ? `${Math.round(progress)}%` : detail}</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressValue, { width: `${Math.min(progress, 100)}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

// ─── Palmerton Bar ───
function PalmertonBar({ label, count, percentage, color, maxCount }: { label: string; count: number; percentage: number; color: string; maxCount: number }) {
  const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;
  return (
    <View style={styles.palmertonItem}>
      <View style={styles.palmertonLabelRow}>
        <Text style={[styles.palmertonLabel, { color }]}>{label}</Text>
        <Text style={styles.palmertonCount}>{count} ({percentage}%)</Text>
      </View>
      <View style={styles.palmertonTrack}>
        <View style={[styles.palmertonValue, { width: `${barWidth}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

// ─── Time formatter ───
function formatSeconds(seconds: number | null): string {
  if (seconds === null || seconds <= 0) return '--:--';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ═══════════════════════════════════════════════
// Hook: Load live progress for a list of specialties
// ═══════════════════════════════════════════════
function useLiveProgress(specialties: string[], examen: string): Record<string, number> {
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      const results: Record<string, number> = {};
      // Batch — but be gentle on Supabase
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

export default function EstudioScreen() {
  const [activeTab, setActiveTab] = useState<CountryTab>('EEUU');
  const [showSecondary, setShowSecondary] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'banco' | 'especialidad'>('banco');
  const [modalInput, setModalInput] = useState('');
  const [customBanks, setCustomBanks] = useState<string[]>([]);
  const [customSpecs, setCustomSpecs] = useState<string[]>([]);

  // APEX modal
  const [apexModalVisible, setApexModalVisible] = useState(false);
  const [apexModalTipo, setApexModalTipo] = useState<'manual' | 'dictar_error'>('manual');

  // ─── Live Supabase data ───
  const { data: cziValue } = useSupabaseQuery(getLatestCZI, null);
  const { data: weakTopics } = useSupabaseQuery(
    () => {
      const examMap: Record<CountryTab, string> = { EEUU: 'USMLE', ESPAÑA: 'MIR', PERÚ: 'ENCAPS' };
      return getWeakTopics(examMap[activeTab]);
    },
    [] as WeakTopic[],
    [activeTab],
  );
  const { data: palmertonErrors } = useSupabaseQuery(getPalmertonErrors, [] as PalmertonErrorDist[]);
  const { data: timingStats } = useSupabaseQuery(getTimingStats, { avgReadingSeconds: null, avgConstructionSeconds: null } as TimingStats);
  const { data: queueCount, refetch: refetchQueue } = useSupabaseQuery(getApexQueueCount, 0);

  // Live progress per tab
  const examMap: Record<CountryTab, string> = { EEUU: 'USMLE', ESPAÑA: 'MIR', PERÚ: 'ENCAPS' };
  const uworldProgress = useLiveProgress(UWORLD_SYSTEMS.map(s => s.name), 'USMLE');
  const ambossProgress = useLiveProgress(AMBOSS_SUBJECTS.map(s => s.name), 'USMLE');
  const promirProgress = useLiveProgress(PROMIR_SPECIALTIES, 'MIR');
  const encapsProgress = useLiveProgress(ENCAPS_AREAS, 'ENCAPS');

  // CZI badge color
  const getCZIColor = (val: number | null) => {
    if (val === null) return Colors.muted;
    if (val >= 0.90) return Colors.green;
    if (val >= 0.70) return Colors.amber;
    return Colors.coral;
  };

  // Worst weak topic
  const worstWeakTopic = weakTopics.length > 0 ? weakTopics[0] : null;

  // Max count for Palmerton bars
  const maxPalmertonCount = Math.max(...palmertonErrors.map(e => e.count), 1);

  const tabs: { key: CountryTab; label: string; flex: number }[] = [
    { key: 'EEUU', label: '🇺🇸 EEUU', flex: 5 },
    { key: 'ESPAÑA', label: '🇪🇸 España', flex: 4 },
    { key: 'PERÚ', label: '🇵🇪 Perú', flex: 1 },
  ];

  const openModal = (type: 'banco' | 'especialidad') => {
    setModalType(type);
    setModalInput('');
    setModalVisible(true);
  };

  const handleModalSubmit = () => {
    if (!modalInput.trim()) return;
    if (modalType === 'banco') {
      setCustomBanks(prev => [...prev, modalInput.trim()]);
    } else {
      setCustomSpecs(prev => [...prev, modalInput.trim()]);
    }
    setModalVisible(false);
    setModalInput('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
        {/* Header with CZI Badge */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Motor APEX</Text>
            <Text style={styles.headerSub}>MIR · USMLE · ENCAPS</Text>
          </View>
          <View style={[styles.cziBadge, { borderColor: getCZIColor(cziValue) + '50' }]}>
            <Text style={[styles.cziLabel, { color: getCZIColor(cziValue) }]}>CZI</Text>
            <Text style={[styles.cziValue, { color: getCZIColor(cziValue) }]}>
              {cziValue !== null ? cziValue.toFixed(2) : '--'}
            </Text>
          </View>
        </View>

        {/* APEX Queue Status */}
        {queueCount > 0 && (
          <View style={styles.queueBanner}>
            <Text style={styles.queueBannerText}>
              ⏳ {queueCount} APEX pendiente{queueCount > 1 ? 's' : ''} · se procesarán al conectar PC
            </Text>
          </View>
        )}

        {/* Dynamic Weak Topic Alert */}
        {worstWeakTopic ? (
          <View style={styles.alertBanner}>
            <Text style={styles.alertIcon}>⚠️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>Tema débil detectado</Text>
              <Text style={styles.alertText}>
                {worstWeakTopic.especialidad} · {worstWeakTopic.daysSinceActivity} días sin actividad
              </Text>
            </View>
          </View>
        ) : (
          /* Fallback static alert if no Supabase data */
          <View style={styles.alertBanner}>
            <Text style={styles.alertIcon}>⚠️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>Temas débiles detectados</Text>
              <Text style={styles.alertText}>Cardiovascular, Nefrología, Farmacología requieren refuerzo</Text>
            </View>
          </View>
        )}

        {/* APEX Button — functional */}
        <TouchableOpacity
          style={styles.apexButton}
          onPress={() => {
            setApexModalTipo('manual');
            setApexModalVisible(true);
          }}
        >
          <Text style={styles.apexButtonText}>⚡ INICIAR APEX</Text>
          <Text style={styles.apexButtonSub}>Sesión adaptativa de estudio</Text>
        </TouchableOpacity>

        {/* Country Tabs */}
        <View style={styles.tabRow}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, { flex: tab.flex }, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ─── EEUU TAB ─── */}
        {activeTab === 'EEUU' && (
          <View>
            <View style={styles.bankSection}>
              <View style={styles.bankHeader}>
                <Text style={styles.bankTitle}>UWorld</Text>
                <View style={[styles.badge, { backgroundColor: Colors.blue + '20' }]}>
                  <Text style={[styles.badgeText, { color: Colors.blue }]}>PRIMARY</Text>
                </View>
              </View>
              <Text style={styles.bankCount}>18 systems · 0% complete</Text>
              {UWORLD_SYSTEMS.map((sys, i) => (
                <ProgressItem
                  key={i}
                  name={sys.name}
                  detail={sys.count}
                  progress={uworldProgress[sys.name] ?? 0}
                  color={Colors.teal}
                />
              ))}
            </View>

            <View style={styles.bankSection}>
              <View style={styles.bankHeader}>
                <Text style={styles.bankTitle}>AMBOSS</Text>
                <View style={[styles.badge, { backgroundColor: Colors.teal + '20' }]}>
                  <Text style={[styles.badgeText, { color: Colors.teal }]}>PRIMARY</Text>
                </View>
              </View>
              <Text style={styles.bankCount}>26 subjects · 0% complete</Text>
              {AMBOSS_SUBJECTS.map((sub, i) => (
                <ProgressItem
                  key={i}
                  name={sub.name}
                  detail={sub.count}
                  progress={ambossProgress[sub.name] ?? 0}
                  color={Colors.blue}
                />
              ))}
            </View>

            <View style={styles.bankSection}>
              <View style={styles.bankHeader}>
                <Text style={styles.bankTitle}>NBME</Text>
                <View style={[styles.badge, { backgroundColor: Colors.amber + '20' }]}>
                  <Text style={[styles.badgeText, { color: Colors.amber }]}>PRIMARY</Text>
                </View>
              </View>
              <Text style={styles.bankCount}>Practice exams · 0 completed</Text>
            </View>

            <View style={styles.bankSection}>
              <View style={styles.bankHeader}>
                <Text style={styles.bankTitle}>First Aid</Text>
                <View style={[styles.badge, { backgroundColor: Colors.green + '20' }]}>
                  <Text style={[styles.badgeText, { color: Colors.green }]}>PRIMARY</Text>
                </View>
              </View>
              <Text style={styles.bankCount}>Review resource · 0% read</Text>
            </View>

            <TouchableOpacity style={styles.collapseToggle} onPress={() => setShowSecondary(!showSecondary)}>
              <Text style={styles.collapseText}>{showSecondary ? '▾' : '▸'} Secondary Banks</Text>
            </TouchableOpacity>
            {showSecondary && (
              <View style={styles.bankSection}>
                <Text style={styles.bankCount}>Lecturio, Boards & Beyond, Sketchy, Pathoma — 0%</Text>
              </View>
            )}

            {/* Custom banks */}
            {customBanks.map((bank, i) => (
              <View key={`cb-${i}`} style={styles.bankSection}>
                <View style={styles.bankHeader}>
                  <Text style={styles.bankTitle}>{bank}</Text>
                  <View style={[styles.badge, { backgroundColor: Colors.purple + '20' }]}>
                    <Text style={[styles.badgeText, { color: Colors.purple }]}>CUSTOM</Text>
                  </View>
                </View>
                <Text style={styles.bankCount}>0% complete</Text>
              </View>
            ))}
          </View>
        )}

        {/* ─── ESPAÑA TAB ─── */}
        {activeTab === 'ESPAÑA' && (
          <View style={styles.bankSection}>
            <View style={styles.bankHeader}>
              <Text style={styles.bankTitle}>ProMIR</Text>
              <View style={[styles.badge, { backgroundColor: Colors.amber + '20' }]}>
                <Text style={[styles.badgeText, { color: Colors.amber }]}>30 specialties</Text>
              </View>
            </View>
            {PROMIR_SPECIALTIES.map((spec, i) => (
              <ProgressItem
                key={i}
                name={spec}
                detail="0%"
                progress={promirProgress[spec] ?? 0}
                color={Colors.amber}
              />
            ))}
            {customSpecs.map((spec, i) => (
              <ProgressItem key={`cs-${i}`} name={spec} detail="0%" progress={0} color={Colors.purple} />
            ))}
          </View>
        )}

        {/* ─── PERÚ TAB ─── */}
        {activeTab === 'PERÚ' && (
          <View style={styles.bankSection}>
            <View style={styles.bankHeader}>
              <Text style={styles.bankTitle}>ENCAPS</Text>
              <View style={[styles.badge, { backgroundColor: Colors.coral + '20' }]}>
                <Text style={[styles.badgeText, { color: Colors.coral }]}>5 areas</Text>
              </View>
            </View>
            {ENCAPS_AREAS.map((area, i) => (
              <ProgressItem
                key={i}
                name={area}
                detail="0%"
                progress={encapsProgress[area] ?? 0}
                color={Colors.coral}
              />
            ))}
          </View>
        )}

        {/* ─── Palmerton Error Chart — NEW ─── */}
        <View style={styles.palmertonSection}>
          <Text style={styles.palmertonTitle}>Errores Palmerton acumulados</Text>
          {palmertonErrors.length > 0 ? (
            palmertonErrors.map(e => (
              <PalmertonBar
                key={e.type}
                label={e.type}
                count={e.count}
                percentage={e.percentage}
                color={PALMERTON_COLORS[e.type] ?? Colors.muted}
                maxCount={maxPalmertonCount}
              />
            ))
          ) : (
            <Text style={styles.palmertonEmpty}>Sin datos de errores Palmerton</Text>
          )}
        </View>

        {/* ─── Time Per Question — NEW ─── */}
        <View style={styles.timingSection}>
          <Text style={styles.timingTitle}>Tiempos promedio</Text>
          {timingStats.avgReadingSeconds !== null || timingStats.avgConstructionSeconds !== null ? (
            <Text style={styles.timingText}>
              Promedio: {formatSeconds(timingStats.avgReadingSeconds)} lectura · {formatSeconds(timingStats.avgConstructionSeconds)} construcción
            </Text>
          ) : (
            <Text style={styles.timingEmpty}>Sin datos de tiempo</Text>
          )}
        </View>

        {/* Tools Row */}
        <View style={styles.toolsRow}>
          <TouchableOpacity
            style={styles.toolChip}
            onPress={() => {
              setApexModalTipo('dictar_error');
              setApexModalVisible(true);
            }}
          >
            <Text style={styles.toolChipText}>🎤 Dictar error</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolChip} onPress={() => Alert.alert('Modo CCS', 'CCS simulation mode: coming soon')}>
            <Text style={styles.toolChipText}>🩺 Modo CCS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolChip} onPress={() => Alert.alert('Timer DW', 'Deep Work timer: use the Home screen timer')}>
            <Text style={styles.toolChipText}>⏱ Timer DW</Text>
          </TouchableOpacity>
        </View>

        {/* Add Buttons */}
        <View style={styles.addRow}>
          <TouchableOpacity style={styles.addButton} onPress={() => openModal('banco')}>
            <Text style={styles.addButtonText}>+ Agregar banco</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={() => openModal('especialidad')}>
            <Text style={styles.addButtonText}>+ Agregar especialidad</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ─── Add Modal ─── */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalType === 'banco' ? 'Agregar banco de preguntas' : 'Agregar especialidad'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder={modalType === 'banco' ? 'Nombre del banco...' : 'Nombre de la especialidad...'}
              placeholderTextColor={Colors.muted}
              value={modalInput}
              onChangeText={setModalInput}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSubmit} onPress={handleModalSubmit}>
                <Text style={styles.modalSubmitText}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ─── APEX Submit Modal ─── */}
      <ApexSubmitModal
        visible={apexModalVisible}
        onClose={() => {
          setApexModalVisible(false);
          refetchQueue();
        }}
        initialTipo={apexModalTipo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.surface },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: 60, paddingBottom: 120 },

  header: { marginBottom: Spacing['2xl'], flexDirection: 'row', alignItems: 'flex-start' },
  headerTitle: { fontSize: FontSize.headlineLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5 },
  headerSub: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: 2 },

  // CZI Badge
  cziBadge: {
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    marginLeft: Spacing.md,
  },
  cziLabel: { fontSize: FontSize.labelSm, fontWeight: '700', letterSpacing: 1 },
  cziValue: { fontSize: FontSize.titleMd, fontWeight: '800' },

  // Queue banner
  queueBanner: {
    backgroundColor: Colors.teal + '18',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.section,
    borderLeftWidth: 3,
    borderLeftColor: Colors.teal,
  },
  queueBannerText: { fontSize: FontSize.bodyMd, color: Colors.teal, fontWeight: '600' },

  alertBanner: { backgroundColor: Colors.coral + '15', borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.section, flexDirection: 'row', alignItems: 'center' },
  alertIcon: { fontSize: 20, marginRight: Spacing.sm },
  alertTitle: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.coral, marginBottom: 2 },
  alertText: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant },

  apexButton: { backgroundColor: Colors.teal, borderRadius: BorderRadius.lg, padding: Spacing.xl, alignItems: 'center', marginBottom: Spacing.section },
  apexButtonText: { fontSize: FontSize.titleMd, fontWeight: '800', color: '#0B1628', letterSpacing: 0.5 },
  apexButtonSub: { fontSize: FontSize.labelSm, color: '#0B1628', marginTop: 2, opacity: 0.7 },

  tabRow: { flexDirection: 'row', marginBottom: Spacing.section, backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: 3 },
  tab: { paddingVertical: Spacing.sm, alignItems: 'center', borderRadius: BorderRadius.sm },
  tabActive: { backgroundColor: Colors.surfaceContainerHighest },
  tabText: { fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 0.5 },
  tabTextActive: { color: Colors.onSurface },

  bankSection: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.section },
  bankHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.sm },
  bankTitle: { fontSize: FontSize.titleMd, fontWeight: '700', color: Colors.onSurface },
  bankCount: { fontSize: FontSize.labelSm, color: Colors.muted, marginBottom: Spacing.md, letterSpacing: 0.3 },

  badge: { borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 8 },
  badgeText: { fontSize: FontSize.labelSm, fontWeight: '700', letterSpacing: 0.3 },

  progressItem: { marginBottom: Spacing.md },
  progressItemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressItemName: { fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '500', flex: 1 },
  progressItemDetail: { fontSize: FontSize.labelSm, color: Colors.muted, marginLeft: 8 },
  progressTrack: { height: 4, backgroundColor: Colors.surfaceContainerHighest, borderRadius: 2, overflow: 'hidden' },
  progressValue: { height: 4, borderRadius: 2 },

  collapseToggle: { paddingVertical: Spacing.sm, marginBottom: Spacing.sm },
  collapseText: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, fontWeight: '500' },

  // ─── Palmerton Error Chart ───
  palmertonSection: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.section,
  },
  palmertonTitle: {
    fontSize: FontSize.titleMd,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: Spacing.lg,
  },
  palmertonItem: { marginBottom: Spacing.md },
  palmertonLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  palmertonLabel: { fontSize: FontSize.bodyMd, fontWeight: '700', letterSpacing: 0.5 },
  palmertonCount: { fontSize: FontSize.labelSm, color: Colors.muted },
  palmertonTrack: {
    height: 8,
    backgroundColor: Colors.surfaceContainerHighest,
    borderRadius: 4,
    overflow: 'hidden',
  },
  palmertonValue: { height: 8, borderRadius: 4 },
  palmertonEmpty: { fontSize: FontSize.bodyMd, color: Colors.muted, fontStyle: 'italic' },

  // ─── Timing ───
  timingSection: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.section,
  },
  timingTitle: {
    fontSize: FontSize.titleMd,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: Spacing.sm,
  },
  timingText: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 22 },
  timingEmpty: { fontSize: FontSize.bodyMd, color: Colors.muted, fontStyle: 'italic' },

  toolsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.section },
  toolChip: { backgroundColor: Colors.surfaceContainerHighest, borderRadius: BorderRadius.full, paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md },
  toolChipText: { fontSize: FontSize.labelSm, color: Colors.onSurface, fontWeight: '500' },

  addRow: { flexDirection: 'row', gap: Spacing.sm },
  addButton: { flex: 1, borderRadius: BorderRadius.md, paddingVertical: Spacing.md, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(143, 144, 151, 0.3)', borderStyle: 'dashed' },
  addButtonText: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, fontWeight: '500' },

  // Modal
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalContent: { backgroundColor: Colors.surfaceContainer, borderRadius: BorderRadius.lg, padding: Spacing.xl, width: '85%', maxWidth: 400 },
  modalTitle: { fontSize: FontSize.titleMd, fontWeight: '700', color: Colors.onSurface, marginBottom: Spacing.lg },
  modalInput: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md, fontSize: FontSize.bodyMd, color: Colors.onSurface, marginBottom: Spacing.lg },
  modalButtons: { flexDirection: 'row', gap: Spacing.sm },
  modalCancel: { flex: 1, paddingVertical: Spacing.sm, alignItems: 'center', borderRadius: BorderRadius.md, backgroundColor: Colors.surfaceContainerHighest },
  modalCancelText: { fontSize: FontSize.labelMd, color: Colors.muted, fontWeight: '600' },
  modalSubmit: { flex: 1, paddingVertical: Spacing.sm, alignItems: 'center', borderRadius: BorderRadius.md, backgroundColor: Colors.teal },
  modalSubmitText: { fontSize: FontSize.labelMd, color: '#0B1628', fontWeight: '700' },
});
