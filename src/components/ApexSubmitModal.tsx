import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';
import { submitApexQueue } from '../lib/supabase';

// ═══════════════════════════════════════════════
// Specialty lists (reused from EstudioScreen — DRY)
// ═══════════════════════════════════════════════

const UWORLD_SYSTEMS = [
  'Cardiovascular', 'Endocrine', 'Gastrointestinal', 'Hematology/Oncology',
  'Immunology', 'Infectious Disease', 'Musculoskeletal', 'Nephrology',
  'Neurology', 'OB/GYN', 'Ophthalmology', 'Pediatrics', 'Psychiatry',
  'Pulmonary', 'Renal', 'Reproductive', 'Dermatology', 'Emergency Medicine',
];

const AMBOSS_SUBJECTS = [
  'Anatomy', 'Biochemistry', 'Biostatistics', 'Cardiac', 'Dermatology',
  'Emergency', 'Endocrine', 'ENT', 'Ethics', 'Gastro', 'Genetics',
  'Hematology', 'Immunology', 'Infectious', 'MSK', 'Nephrology',
  'Neurology', 'Nutrition', 'OBGYN', 'Oncology', 'Ophthalmology',
  'Pathology', 'Pediatrics', 'Pharmacology', 'Psychiatry', 'Pulmonary',
];

const PROMIR_SPECIALTIES = [
  'Cardiología', 'Cirugía General', 'Dermatología', 'Endocrinología',
  'Gastroenterología', 'Ginecología', 'Hematología', 'Inmunología',
  'Medicina Interna', 'Nefrología', 'Neumología', 'Neurología',
  'Oftalmología', 'Oncología', 'ORL', 'Pediatría', 'Psiquiatría',
  'Radiología', 'Reumatología', 'Traumatología', 'Urgencias', 'Urología',
  'Anatomía Patológica', 'Anestesiología', 'Farmacología', 'Fisiología',
  'Genética', 'Medicina Preventiva', 'Bioestadística', 'Ética Médica',
];

const ENCAPS_AREAS = [
  'Medicina', 'Cirugía', 'Gineco-Obstetricia', 'Pediatría', 'Salud Pública',
];

// ═══════════════════════════════════════════════
// Exam sources per country
// ═══════════════════════════════════════════════

type Country = 'EEUU' | 'ESPAÑA' | 'PERU';

const EXAM_SOURCES: Record<Country, string[]> = {
  EEUU: ['UWorld', 'AMBOSS', 'NBME', 'First Aid', 'Other'],
  ESPAÑA: ['ProMIR', 'AMIR', 'MIR Asturias', 'Other'],
  PERU: ['ENCAPS'],
};

function getSpecialties(country: Country, examSource: string): string[] {
  if (country === 'EEUU') {
    if (examSource === 'UWorld') return UWORLD_SYSTEMS;
    if (examSource === 'AMBOSS') return AMBOSS_SUBJECTS;
    return UWORLD_SYSTEMS; // fallback for NBME, First Aid, Other
  }
  if (country === 'ESPAÑA') return PROMIR_SPECIALTIES;
  return ENCAPS_AREAS; // PERU
}

function getExamCode(country: Country): 'USMLE' | 'MIR' | 'ENCAPS' {
  if (country === 'EEUU') return 'USMLE';
  if (country === 'ESPAÑA') return 'MIR';
  return 'ENCAPS';
}

// ═══════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════

interface ApexSubmitModalProps {
  visible: boolean;
  onClose: () => void;
  /** Pre-fill tipo for dictar_error flow */
  initialTipo?: 'manual' | 'dictar_error';
}

type Step = 'text' | 'country' | 'exam' | 'specialty' | 'subtopic';

export default function ApexSubmitModal({ visible, onClose, initialTipo = 'manual' }: ApexSubmitModalProps) {
  const [step, setStep] = useState<Step>('text');
  const [texto, setTexto] = useState('');
  const [country, setCountry] = useState<Country | null>(null);
  const [examSource, setExamSource] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [subtema, setSubtema] = useState('');
  const [specSearch, setSpecSearch] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const reset = useCallback(() => {
    setStep('text');
    setTexto('');
    setCountry(null);
    setExamSource('');
    setEspecialidad('');
    setSubtema('');
    setSpecSearch('');
    setSubmitting(false);
    setSuccess(false);
  }, []);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!texto.trim() || !country) return;
    setSubmitting(true);
    const result = await submitApexQueue({
      texto_raw: texto.trim(),
      tipo: initialTipo,
      pais: country,
      examen: getExamCode(country),
      especialidad: especialidad || undefined,
      subtema: subtema.trim() || undefined,
      fuente_app: examSource || undefined,
    });
    setSubmitting(false);
    if (result.success) {
      setPendingCount(result.pendingCount);
      setSuccess(true);
    } else {
      setSuccess(true); // Show enqueued even offline — will sync later
      setPendingCount(0);
    }
  };

  const filteredSpecs = country && examSource
    ? getSpecialties(country, examSource).filter(s =>
        s.toLowerCase().includes(specSearch.toLowerCase())
      )
    : [];

  const renderStep = () => {
    switch (step) {
      case 'text':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepLabel}>PASO 1 · TEXTO</Text>
            <Text style={styles.stepHint}>
              {initialTipo === 'dictar_error'
                ? 'Describe tu error clínico o conceptual'
                : 'Pega el texto o describe el error'}
            </Text>
            <TextInput
              style={styles.textArea}
              placeholder="Pega el texto o describe el error..."
              placeholderTextColor={Colors.muted}
              value={texto}
              onChangeText={setTexto}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              autoFocus
            />
            <TouchableOpacity
              style={[styles.nextBtn, !texto.trim() && styles.nextBtnDisabled]}
              onPress={() => texto.trim() && setStep('country')}
              disabled={!texto.trim()}
            >
              <Text style={styles.nextBtnText}>Siguiente →</Text>
            </TouchableOpacity>
          </View>
        );

      case 'country':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepLabel}>PASO 2 · PAÍS</Text>
            <Text style={styles.stepHint}>¿De qué sistema de examen proviene?</Text>
            <View style={styles.countryRow}>
              {([
                { key: 'EEUU' as Country, flag: '🇺🇸', label: 'EEUU' },
                { key: 'ESPAÑA' as Country, flag: '🇪🇸', label: 'España' },
                { key: 'PERU' as Country, flag: '🇵🇪', label: 'Perú' },
              ]).map(c => (
                <TouchableOpacity
                  key={c.key}
                  style={[styles.countryBtn, country === c.key && styles.countryBtnActive]}
                  onPress={() => {
                    setCountry(c.key);
                    setExamSource('');
                    setEspecialidad('');
                    // If Peru, auto-select ENCAPS and skip exam step
                    if (c.key === 'PERU') {
                      setExamSource('ENCAPS');
                      setStep('specialty');
                    } else {
                      setStep('exam');
                    }
                  }}
                >
                  <Text style={styles.countryFlag}>{c.flag}</Text>
                  <Text style={[styles.countryLabel, country === c.key && styles.countryLabelActive]}>
                    {c.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'exam':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepLabel}>PASO 3 · FUENTE</Text>
            <Text style={styles.stepHint}>¿De qué banco o recurso?</Text>
            {country && EXAM_SOURCES[country].map(exam => (
              <TouchableOpacity
                key={exam}
                style={[styles.examBtn, examSource === exam && styles.examBtnActive]}
                onPress={() => {
                  setExamSource(exam);
                  setEspecialidad('');
                  setStep('specialty');
                }}
              >
                <Text style={[styles.examBtnText, examSource === exam && styles.examBtnTextActive]}>
                  {exam}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'specialty':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepLabel}>PASO 4 · ESPECIALIDAD</Text>
            <Text style={styles.stepHint}>Selecciona o busca (opcional)</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar especialidad..."
              placeholderTextColor={Colors.muted}
              value={specSearch}
              onChangeText={setSpecSearch}
            />
            <ScrollView style={styles.specList} nestedScrollEnabled>
              {filteredSpecs.map(spec => (
                <TouchableOpacity
                  key={spec}
                  style={[styles.specItem, especialidad === spec && styles.specItemActive]}
                  onPress={() => setEspecialidad(spec)}
                >
                  <Text style={[styles.specItemText, especialidad === spec && styles.specItemTextActive]}>
                    {spec}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => setStep('subtopic')}
            >
              <Text style={styles.nextBtnText}>
                {especialidad ? 'Siguiente →' : 'Omitir →'}
              </Text>
            </TouchableOpacity>
          </View>
        );

      case 'subtopic':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepLabel}>PASO 5 · SUBTEMA</Text>
            <Text style={styles.stepHint}>Subtema específico (opcional)</Text>
            <TextInput
              style={styles.subtopicInput}
              placeholder="Ej: Bloqueo AV de 2do grado Mobitz II"
              placeholderTextColor={Colors.muted}
              value={subtema}
              onChangeText={setSubtema}
            />
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color="#0B1628" />
              ) : (
                <Text style={styles.submitBtnText}>⚡ ENCOLAR APEX</Text>
              )}
            </TouchableOpacity>
          </View>
        );
    }
  };

  // ─── Success screen ───
  if (success) {
    return (
      <Modal visible={visible} animationType="fade" onRequestClose={handleClose}>
        <View style={styles.container}>
          <View style={styles.successContainer}>
            <Text style={styles.successEmoji}>✅</Text>
            <Text style={styles.successTitle}>APEX Encolado</Text>
            <Text style={styles.successSubtitle}>
              {pendingCount > 0
                ? `Pendiente · ${pendingCount} en cola`
                : 'Se procesará al conectar PC'}
            </Text>
            <TouchableOpacity style={styles.doneBtn} onPress={handleClose}>
              <Text style={styles.doneBtnText}>Hecho</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeBtn}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {initialTipo === 'dictar_error' ? 'Dictar Error' : 'APEX Submit'}
          </Text>
          <View style={styles.stepIndicator}>
            {(['text', 'country', 'exam', 'specialty', 'subtopic'] as Step[]).map((s, i) => (
              <View
                key={s}
                style={[
                  styles.stepDot,
                  step === s && styles.stepDotActive,
                  (['text', 'country', 'exam', 'specialty', 'subtopic'] as Step[]).indexOf(step) > i && styles.stepDotDone,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Back button */}
        {step !== 'text' && (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              const order: Step[] = ['text', 'country', 'exam', 'specialty', 'subtopic'];
              const idx = order.indexOf(step);
              if (idx > 0) setStep(order[idx - 1]);
            }}
          >
            <Text style={styles.backBtnText}>← Atrás</Text>
          </TouchableOpacity>
        )}

        {/* Step content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          {renderStep()}
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ═══════════════════════════════════════════════
// Styles
// ═══════════════════════════════════════════════

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  closeBtn: {
    fontSize: 22,
    color: Colors.muted,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: FontSize.titleMd,
    fontWeight: '700',
    color: Colors.onSurface,
    flex: 1,
  },
  stepIndicator: {
    flexDirection: 'row',
    gap: 6,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.surfaceContainerHighest,
  },
  stepDotActive: {
    backgroundColor: Colors.teal,
    width: 20,
  },
  stepDotDone: {
    backgroundColor: Colors.teal + '60',
  },
  backBtn: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
  },
  backBtnText: {
    fontSize: FontSize.bodyMd,
    color: Colors.muted,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: 40,
  },
  stepContainer: {
    flex: 1,
  },
  stepLabel: {
    fontSize: FontSize.labelMd,
    fontWeight: '700',
    color: Colors.teal,
    letterSpacing: 1.2,
    marginBottom: Spacing.xs,
  },
  stepHint: {
    fontSize: FontSize.bodyMd,
    color: Colors.onSurfaceVariant,
    marginBottom: Spacing.xl,
  },

  // Text step
  textArea: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    fontSize: FontSize.bodyLg,
    color: Colors.onSurface,
    minHeight: 160,
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },

  // Country step
  countryRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  countryBtn: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing['3xl'],
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  countryBtnActive: {
    borderColor: Colors.teal,
    backgroundColor: Colors.teal + '15',
  },
  countryFlag: {
    fontSize: 36,
    marginBottom: Spacing.sm,
  },
  countryLabel: {
    fontSize: FontSize.labelLg,
    fontWeight: '700',
    color: Colors.onSurface,
    letterSpacing: 0.5,
  },
  countryLabelActive: {
    color: Colors.teal,
  },

  // Exam step
  examBtn: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  examBtnActive: {
    borderColor: Colors.teal,
    backgroundColor: Colors.teal + '15',
  },
  examBtnText: {
    fontSize: FontSize.bodyLg,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  examBtnTextActive: {
    color: Colors.teal,
  },

  // Specialty step
  searchInput: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSize.bodyMd,
    color: Colors.onSurface,
    marginBottom: Spacing.md,
  },
  specList: {
    maxHeight: 300,
    marginBottom: Spacing.lg,
  },
  specItem: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginBottom: 4,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  specItemActive: {
    borderLeftColor: Colors.teal,
    backgroundColor: Colors.teal + '12',
  },
  specItemText: {
    fontSize: FontSize.bodyMd,
    color: Colors.onSurface,
    fontWeight: '500',
  },
  specItemTextActive: {
    color: Colors.teal,
  },

  // Subtopic step
  subtopicInput: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    fontSize: FontSize.bodyLg,
    color: Colors.onSurface,
    marginBottom: Spacing.xl,
  },

  // Buttons
  nextBtn: {
    backgroundColor: Colors.surfaceContainerHighest,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  nextBtnDisabled: {
    opacity: 0.4,
  },
  nextBtnText: {
    fontSize: FontSize.labelLg,
    fontWeight: '700',
    color: Colors.onSurface,
    letterSpacing: 0.5,
  },
  submitBtn: {
    backgroundColor: Colors.teal,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  submitBtnText: {
    fontSize: FontSize.titleMd,
    fontWeight: '800',
    color: '#0B1628',
    letterSpacing: 1,
  },

  // Success
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['3xl'],
  },
  successEmoji: {
    fontSize: 64,
    marginBottom: Spacing.xl,
  },
  successTitle: {
    fontSize: FontSize.headlineLg,
    fontWeight: '800',
    color: Colors.teal,
    marginBottom: Spacing.sm,
  },
  successSubtitle: {
    fontSize: FontSize.bodyLg,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: Spacing['3xl'],
  },
  doneBtn: {
    backgroundColor: Colors.surfaceContainerHighest,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing['4xl'],
  },
  doneBtnText: {
    fontSize: FontSize.labelLg,
    fontWeight: '700',
    color: Colors.onSurface,
    letterSpacing: 0.5,
  },
});
