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
  Linking,
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
  getApexCountToday,
} from '../lib/supabase';
import type {
  PalmertonErrorDist,
  TimingStats,
  WeakTopic,
  ApexCountByExam,
} from '../lib/supabase';
import ApexSubmitModal from '../components/ApexSubmitModal';
import ApexManualModal from '../components/ApexManualModal';
import { useEncapsBlocks } from '../lib/encapsBlocks';
import type { EncapsBlock } from '../lib/encapsBlocks';
import EncapsPlanView from '../components/EncapsPlanView';
import EncapsWebView from '../components/EncapsWebView';
import UsmleHub from '../components/study/UsmleHub';
import MirHub from '../components/study/MirHub';

// ─── Data Structures ───
interface Bank {
  name: string;
  count: string;
  progress: number;
}

const UWORLD_SYSTEMS: Bank[] = [
  { name: 'Behavioral Health', count: '96 Qs', progress: 0 },
  { name: 'Biostatistics & Epidemiology', count: '75 Qs', progress: 0 },
  { name: 'Blood & Lymphoreticular', count: '175 Qs', progress: 0 },
  { name: 'Cardiovascular', count: '256 Qs', progress: 0 },
  { name: 'Endocrine', count: '145 Qs', progress: 0 },
  { name: 'Female Reproductive', count: '85 Qs', progress: 0 },
  { name: 'Gastrointestinal', count: '225 Qs', progress: 0 },
  { name: 'Human Development', count: '327 Qs', progress: 0 },
  { name: 'Immune System', count: '123 Qs', progress: 0 },
  { name: 'Male Reproductive', count: '43 Qs', progress: 0 },
  { name: 'Multisystem Processes', count: '206 Qs', progress: 0 },
  { name: 'Musculoskeletal', count: '132 Qs', progress: 0 },
  { name: 'Nervous System', count: '318 Qs', progress: 0 },
  { name: 'Pregnancy & Puerperium', count: '58 Qs', progress: 0 },
  { name: 'Renal & Urinary', count: '146 Qs', progress: 0 },
  { name: 'Respiratory', count: '173 Qs', progress: 0 },
  { name: 'Skin & Subcutaneous', count: '108 Qs', progress: 0 },
  { name: 'Social Sciences', count: '54 Qs', progress: 0 },
];

const AMBOSS_SUBJECTS: Bank[] = [
  { name: 'Allergy & Immunology', count: '6 systems', progress: 0 },
  { name: 'Biochemistry', count: '5 systems', progress: 0 },
  { name: 'Biostatistics & Epidemiology', count: '5 systems', progress: 0 },
  { name: 'Cardiovascular', count: '11 systems', progress: 0 },
  { name: 'Dermatology', count: '6 systems', progress: 0 },
  { name: 'ENT', count: '1 system', progress: 0 },
  { name: 'Endocrine Diabetes & Metabolism', count: '10 systems', progress: 0 },
  { name: 'Female Reproductive', count: '7 systems', progress: 0 },
  { name: 'GI & Nutrition', count: '10 systems', progress: 0 },
  { name: 'Genetics', count: '6 systems', progress: 0 },
  { name: 'Hematology & Oncology', count: '9 systems', progress: 0 },
  { name: 'Infectious Diseases', count: '8 systems', progress: 0 },
  { name: 'Male Reproductive', count: '2 systems', progress: 0 },
  { name: 'Microbiology', count: '5 systems', progress: 0 },
  { name: 'Miscellaneous', count: '1 system', progress: 0 },
  { name: 'Nervous System', count: '16 systems', progress: 0 },
  { name: 'Ophthalmology', count: '2 systems', progress: 0 },
  { name: 'Pathology', count: '3 systems', progress: 0 },
  { name: 'Pharmacology', count: '4 systems', progress: 0 },
  { name: 'Poisoning & Environmental', count: '2 systems', progress: 0 },
  { name: 'Pregnancy & Puerperium', count: '2 systems', progress: 0 },
  { name: 'Psychiatric/Behavioral', count: '10 systems', progress: 0 },
  { name: 'Pulmonary & Critical Care', count: '10 systems', progress: 0 },
  { name: 'Renal Urinary & Electrolytes', count: '13 systems', progress: 0 },
  { name: 'Rheumatology/Orthopedics', count: '9 systems', progress: 0 },
  { name: 'Social Sciences', count: '6 systems', progress: 0 },
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

// Las áreas genéricas (Medicina/Cirugía/...) NO son bloques oficiales del ENCAPS.
// La reorganización oficial v2.3.2 usa los 5 bloques del temario MINSA.
// Ver: src/lib/encapsBlocks.ts → ENCAPS_BLOCKS_STATIC

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
  // Deep Work timer (cuenta-arriba): tocar = iniciar/pausar · mantener = reset
  const [dwSec, setDwSec] = useState(0);
  const [dwRunning, setDwRunning] = useState(false);
  useEffect(() => {
    if (!dwRunning) return;
    const id = setInterval(() => setDwSec(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [dwRunning]);
  const dwLabel = `${String(Math.floor(dwSec / 60)).padStart(2, '0')}:${String(dwSec % 60).padStart(2, '0')}`;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'banco' | 'especialidad'>('banco');
  const [modalInput, setModalInput] = useState('');
  const [customBanks, setCustomBanks] = useState<string[]>([]);
  const [customSpecs, setCustomSpecs] = useState<string[]>([]);

  // APEX modal
  const [apexModalVisible, setApexModalVisible] = useState(false);
  const [apexModalTipo, setApexModalTipo] = useState<'manual' | 'dictar_error'>('manual');
  // APEX manual modal (v2.3.2 — flujo Palmerton manual)
  const [apexManualModalVisible, setApexManualModalVisible] = useState(false);
  // ENCAPS 5 bloques oficiales
  const { blocks: encapsBlocks, refetch: refetchEncaps } = useEncapsBlocks();
  // PE Perú → ENCAPS: sub-vista (Plan diario nativo · Bloques APEX · Dashboard WebView)
  const [peView, setPeView] = useState<'plan' | 'bloques' | 'dashboard'>('plan');

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
  const { data: apexToday } = useSupabaseQuery(
    getApexCountToday,
    { fecha: '', MIR: 0, ENCAPS: 0, USMLE: 0, total: 0 } as ApexCountByExam,
  );

  // Live progress per tab
  const examMap: Record<CountryTab, string> = { EEUU: 'USMLE', ESPAÑA: 'MIR', PERÚ: 'ENCAPS' };
  const uworldProgress = useLiveProgress(UWORLD_SYSTEMS.map(s => s.name), 'USMLE');
  const ambossProgress = useLiveProgress(AMBOSS_SUBJECTS.map(s => s.name), 'USMLE');
  const promirProgress = useLiveProgress(PROMIR_SPECIALTIES, 'MIR');

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

        {/* Pegar APEX manual v2.3.2 — Capa 2 flujo Palmerton-driven */}
        <View style={styles.apexManualCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.apexManualTitle}>📋 Pegar APEX manual</Text>
            <Text style={styles.apexManualSub}>
              Para celular o cuando no estás en PC (sin Ctrl+Shift+A)
            </Text>
          </View>
          <TouchableOpacity
            style={styles.apexManualBtn}
            onPress={() => setApexManualModalVisible(true)}
          >
            <Text style={styles.apexManualBtnText}>Pegar bloque APEX</Text>
          </TouchableOpacity>
        </View>

        {/* APEX Hoy — Trilingüe v2.3.2 */}
        <View style={styles.apexTodayCard}>
          <Text style={styles.apexTodayTitle}>📊 APEX creados hoy</Text>
          <View style={styles.apexTodayRow}>
            <View style={styles.apexTodayItem}>
              <Text style={styles.apexTodayFlag}>🇪🇸</Text>
              <Text style={styles.apexTodayLabel}>MIR</Text>
              <Text style={[styles.apexTodayCount, { color: Colors.amber }]}>{apexToday.MIR}</Text>
            </View>
            <View style={styles.apexTodayItem}>
              <Text style={styles.apexTodayFlag}>🇵🇪</Text>
              <Text style={styles.apexTodayLabel}>ENCAPS</Text>
              <Text style={[styles.apexTodayCount, { color: Colors.coral }]}>{apexToday.ENCAPS}</Text>
            </View>
            <View style={styles.apexTodayItem}>
              <Text style={styles.apexTodayFlag}>🇺🇸</Text>
              <Text style={styles.apexTodayLabel}>USMLE</Text>
              <Text style={[styles.apexTodayCount, { color: Colors.green }]}>{apexToday.USMLE}</Text>
            </View>
            <View style={[styles.apexTodayItem, styles.apexTodayItemTotal]}>
              <Text style={styles.apexTodayFlag}>🌐</Text>
              <Text style={styles.apexTodayLabel}>TOTAL</Text>
              <Text style={[styles.apexTodayCount, { color: Colors.teal }]}>{apexToday.total}</Text>
            </View>
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

        {/* ─── EEUU TAB → USMLE Hub (Plan ROI + Cerebro Palmerton) ─── */}
        {activeTab === 'EEUU' && <UsmleHub />}
        {false && (
          <View>
            <View style={[styles.bankSection, { borderLeftWidth: 4, borderLeftColor: Colors.amber }]}>
              <View style={styles.bankHeader}>
                <Text style={styles.bankTitle}>UWORLD</Text>
                <View style={[styles.badge, { backgroundColor: Colors.amber + '20' }]}>
                  <Text style={[styles.badgeText, { color: Colors.amber }]}>PRIMARY</Text>
                </View>
              </View>
              <Text style={styles.bankCount}>18 systems · 0% complete</Text>
              {UWORLD_SYSTEMS.map((sys, i) => (
                <ProgressItem
                  key={i}
                  name={sys.name}
                  detail={sys.count}
                  progress={uworldProgress[sys.name] ?? 0}
                  color={Colors.amber}
                />
              ))}
            </View>

            <View style={[styles.bankSection, { borderLeftWidth: 4, borderLeftColor: Colors.green }]}>
              <View style={styles.bankHeader}>
                <Text style={styles.bankTitle}>AMBOSS</Text>
                <View style={[styles.badge, { backgroundColor: Colors.green + '20' }]}>
                  <Text style={[styles.badgeText, { color: Colors.green }]}>PRIMARY</Text>
                </View>
              </View>
              <Text style={styles.bankCount}>26 subjects · 0% complete</Text>
              {AMBOSS_SUBJECTS.map((sub, i) => (
                <ProgressItem
                  key={i}
                  name={sub.name}
                  detail={sub.count}
                  progress={ambossProgress[sub.name] ?? 0}
                  color={Colors.green}
                />
              ))}
            </View>

            <View style={[styles.bankSection, { borderLeftWidth: 4, borderLeftColor: Colors.blue }]}>
              <View style={styles.bankHeader}>
                <Text style={styles.bankTitle}>NBME</Text>
              </View>
              <Text style={styles.bankCount}>NBME Practice Exams · 0%</Text>
            </View>

            <View style={[styles.bankSection, { borderLeftWidth: 4, borderLeftColor: Colors.coral }]}>
              <View style={styles.bankHeader}>
                <Text style={styles.bankTitle}>FIRST AID</Text>
              </View>
              <Text style={styles.bankCount}>First Aid · 0%</Text>
            </View>

            <TouchableOpacity style={styles.collapseToggle} onPress={() => setShowSecondary(!showSecondary)}>
              <Text style={styles.collapseText}>{showSecondary ? '▾' : '▸'} Secondary Banks</Text>
            </TouchableOpacity>
            {showSecondary && (
              <View style={styles.bankSection}>
                {SECONDARY_BANKS.map((b, i) => (
                  <ProgressItem key={i} name={b} detail="0%" progress={0} color={Colors.muted} />
                ))}
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

        {/* ─── ESPAÑA TAB → MIR Hub (ProMIR · ROI) ─── */}
        {activeTab === 'ESPAÑA' && <MirHub />}
        {false && (
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

        {/* ─── PERÚ TAB — ENCAPS nativo: Plan diario · Bloques APEX · Dashboard ─── */}
        {activeTab === 'PERÚ' && (
          <View>
            <View style={styles.peSubTabRow}>
              {([
                ['plan', '📅 Plan diario'],
                ['bloques', '📚 Bloques APEX'],
                ['dashboard', '📊 Dashboard'],
              ] as const).map(([k, l]) => (
                <TouchableOpacity
                  key={k}
                  style={[styles.peSubTab, peView === k && styles.peSubTabActive]}
                  onPress={() => setPeView(k)}
                >
                  <Text style={[styles.peSubTabText, peView === k && styles.peSubTabTextActive]} numberOfLines={1}>
                    {l}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Plan diario nativo (HOY · 17/20 · Simulacros · 7 días) — sync Supabase */}
            {peView === 'plan' && <EncapsPlanView />}

            {/* 5 bloques oficiales · 94 subtemas (cobertura APEX) */}
            {peView === 'bloques' && (
              <View>
                <View style={styles.encapsHeader}>
                  <Text style={styles.encapsHeaderTitle}>ENCAPS — 5 bloques oficiales</Text>
                  <Text style={styles.encapsHeaderSub}>
                    94 subtemas · examen 10 ago 2026
                  </Text>
                </View>
                {encapsBlocks.map((b) => (
                  <EncapsBlockCard key={b.id} block={b} />
                ))}
              </View>
            )}

            {/* Dashboard ENCAPS v9 embebido (WebView/iframe) */}
            {peView === 'dashboard' && <EncapsWebView />}
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
          <TouchableOpacity
            style={[styles.toolChip, dwRunning && { backgroundColor: Colors.teal + '22' }]}
            onPress={() => setDwRunning(r => !r)}
            onLongPress={() => { setDwRunning(false); setDwSec(0); }}
          >
            <Text style={[styles.toolChipText, dwRunning && { color: Colors.teal }]}>
              {dwRunning ? `⏸ DW ${dwLabel}` : dwSec > 0 ? `▶ DW ${dwLabel}` : '⏱ Timer DW'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolChip} onPress={() => Linking.openURL('https://qxmedic-aulavirtual.com/evaluaciones')}>
            <Text style={styles.toolChipText}>📝 Banco QX</Text>
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

      {/* ─── APEX Manual Modal v2.3.2 (flujo Palmerton manual) ─── */}
      <ApexManualModal
        visible={apexManualModalVisible}
        onClose={() => {
          setApexManualModalVisible(false);
          refetchEncaps();
          refetchQueue();
        }}
      />
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════
// EncapsBlockCard — card expandible por bloque oficial v2.3.2
// ═══════════════════════════════════════════════════════════════════
function EncapsBlockCard({ block }: { block: EncapsBlock }) {
  const [expanded, setExpanded] = useState(false);
  const colorMap: Record<string, string> = {
    blue: Colors.blue,
    green: Colors.green,
    gray: Colors.muted,
    orange: Colors.amber,
  };
  const accent = colorMap[block.color] ?? Colors.coral;
  const noActivity = block.apex_count === 0;
  const fechaTxt = block.ultimo_apex_fecha
    ? `Último APEX: ${String(block.ultimo_apex_fecha).slice(0, 10)}`
    : null;

  return (
    <View style={[styles.encapsCard, { borderLeftColor: accent }]}>
      <TouchableOpacity
        onPress={() => setExpanded(e => !e)}
        style={styles.encapsCardHeader}
        activeOpacity={0.7}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.encapsCardTitle}>{block.nombre}</Text>
            {block.rentable && (
              <Text style={styles.rentableBadge}>⭐ MÁS RENTABLE</Text>
            )}
          </View>
          <Text style={styles.encapsCardId}>
            {block.id} · {block.subtemas_total} subtemas
          </Text>
        </View>
        <View style={styles.encapsCardRightCol}>
          <Text style={[styles.encapsPeso, { color: accent }]}>{block.peso}</Text>
          <Text style={styles.encapsPreguntas}>~{block.preguntas_target} Q</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.encapsCardBody}>
        <View style={styles.encapsStatsRow}>
          <Text style={styles.encapsCount}>
            <Text style={[styles.encapsCountValue, { color: accent }]}>
              {block.apex_count}
            </Text>{' '}
            APEX creados
          </Text>
          <Text style={styles.encapsCobertura}>
            Cobertura: {block.subtemas_cubiertos}/{block.subtemas_total}
          </Text>
        </View>
        {noActivity ? (
          <Text style={styles.encapsNoActivity}>Sin actividad</Text>
        ) : (
          fechaTxt && <Text style={styles.encapsLastDate}>{fechaTxt}</Text>
        )}
        <TouchableOpacity onPress={() => setExpanded(e => !e)}>
          <Text style={styles.encapsToggle}>
            {expanded ? '▾ Ocultar subtemas' : '▸ Ver subtemas'}
          </Text>
        </TouchableOpacity>
      </View>

      {expanded && (
        <View style={styles.encapsSubtemasList}>
          {block.subtemas_detalle.map(s => (
            <View key={s.id} style={styles.encapsSubtemaRow}>
              <Text
                style={[
                  styles.encapsSubtemaName,
                  s.apex > 0 && { color: Colors.green, fontWeight: '600' },
                ]}
                numberOfLines={1}
              >
                {s.label || s.id}
              </Text>
              <Text
                style={[
                  styles.encapsSubtemaCount,
                  s.apex > 0 && { color: Colors.green, fontWeight: '700' },
                ]}
              >
                {s.apex}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Barra de progreso de cobertura */}
      {block.subtemas_total > 0 && (
        <View style={styles.encapsProgressTrack}>
          <View
            style={[
              styles.encapsProgressFill,
              {
                width: `${Math.min(100, (block.subtemas_cubiertos / block.subtemas_total) * 100)}%`,
                backgroundColor: accent,
              },
            ]}
          />
        </View>
      )}
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

  // APEX manual card v2.3.2 (Capa 2 flujo Palmerton)
  apexManualCard: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.section,
    borderLeftWidth: 3,
    borderLeftColor: Colors.amber,
    flexDirection: 'row',
    alignItems: 'center',
  },
  apexManualTitle: {
    fontSize: FontSize.titleMd,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  apexManualSub: {
    fontSize: FontSize.labelSm,
    color: Colors.muted,
    marginTop: 2,
  },
  apexManualBtn: {
    backgroundColor: Colors.amber,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    marginLeft: Spacing.md,
  },
  apexManualBtnText: {
    fontSize: FontSize.labelMd,
    fontWeight: '800',
    color: '#0B1628',
  },

  // PE Perú → sub-tabs (Plan diario · Bloques · Dashboard)
  peSubTabRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.md,
    padding: 3,
    marginBottom: Spacing.section,
  },
  peSubTab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
  },
  peSubTabActive: { backgroundColor: Colors.surfaceContainerHighest },
  peSubTabText: { fontSize: FontSize.labelSm, fontWeight: '600', color: Colors.muted },
  peSubTabTextActive: { color: Colors.onSurface },

  // ENCAPS 5 bloques oficiales v2.3.2
  encapsHeader: {
    marginBottom: Spacing.md,
  },
  encapsHeaderTitle: {
    fontSize: FontSize.titleMd,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  encapsHeaderSub: {
    fontSize: FontSize.labelSm,
    color: Colors.muted,
    marginTop: 2,
  },
  encapsCard: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
  },
  encapsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  encapsCardTitle: {
    fontSize: FontSize.titleMd,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  rentableBadge: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.green,
    backgroundColor: Colors.green + '20',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 999,
    marginLeft: Spacing.sm,
    letterSpacing: 0.5,
  },
  encapsCardId: {
    fontSize: FontSize.labelSm,
    color: Colors.muted,
    marginTop: 2,
  },
  encapsCardRightCol: { alignItems: 'flex-end' },
  encapsPeso: {
    fontSize: FontSize.titleMd,
    fontWeight: '800',
  },
  encapsPreguntas: {
    fontSize: FontSize.labelSm,
    color: Colors.muted,
  },
  encapsCardBody: {
    marginTop: Spacing.md,
  },
  encapsStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  encapsCount: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant },
  encapsCountValue: { fontSize: FontSize.titleMd, fontWeight: '800' },
  encapsCobertura: { fontSize: FontSize.labelSm, color: Colors.muted },
  encapsNoActivity: {
    fontSize: FontSize.labelSm,
    color: Colors.coral,
    fontWeight: '600',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  encapsLastDate: {
    fontSize: FontSize.labelSm,
    color: Colors.muted,
    marginBottom: 4,
  },
  encapsToggle: {
    fontSize: FontSize.labelSm,
    color: Colors.onSurfaceVariant,
    fontWeight: '600',
    marginTop: 4,
  },
  encapsSubtemasList: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(143,144,151,0.15)',
  },
  encapsSubtemaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  encapsSubtemaName: {
    flex: 1,
    fontSize: FontSize.labelSm,
    color: Colors.onSurfaceVariant,
  },
  encapsSubtemaCount: {
    fontSize: FontSize.labelSm,
    color: Colors.muted,
    minWidth: 24,
    textAlign: 'right',
  },
  encapsProgressTrack: {
    height: 4,
    backgroundColor: Colors.surfaceContainerHighest,
    borderRadius: 2,
    marginTop: Spacing.sm,
    overflow: 'hidden',
  },
  encapsProgressFill: {
    height: 4,
    borderRadius: 2,
  },

  // APEX Hoy card v2.3.2
  apexTodayCard: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.section,
    borderLeftWidth: 3,
    borderLeftColor: Colors.teal,
  },
  apexTodayTitle: {
    fontSize: FontSize.titleMd,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: Spacing.md,
  },
  apexTodayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  apexTodayItem: {
    flex: 1,
    alignItems: 'center',
  },
  apexTodayItemTotal: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(143,144,151,0.2)',
    paddingLeft: Spacing.sm,
  },
  apexTodayFlag: {
    fontSize: 18,
    marginBottom: 2,
  },
  apexTodayLabel: {
    fontSize: FontSize.labelSm,
    color: Colors.muted,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  apexTodayCount: {
    fontSize: FontSize.headlineLg,
    fontWeight: '800',
  },

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
