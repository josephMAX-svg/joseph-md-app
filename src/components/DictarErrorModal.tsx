import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';
import { submitApexQueue } from '../lib/supabase';

type Country = 'EEUU' | 'ESPAÑA' | 'PERU';
type ExamCode = 'USMLE' | 'MIR' | 'ENCAPS';

const COUNTRY_OPTIONS: { key: Country; flag: string; label: string; exam: ExamCode }[] = [
  { key: 'EEUU', flag: '🇺🇸', label: 'EEUU', exam: 'USMLE' },
  { key: 'ESPAÑA', flag: '🇪🇸', label: 'España', exam: 'MIR' },
  { key: 'PERU', flag: '🇵🇪', label: 'Perú', exam: 'ENCAPS' },
];

interface DictarErrorModalProps {
  visible: boolean;
  onClose: () => void;
}

/** Detect Web Speech API availability (Chrome/Edge/Safari). */
function getSpeechRecognition(): any {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export default function DictarErrorModal({ visible, onClose }: DictarErrorModalProps) {
  const [transcript, setTranscript] = useState('');
  const [interim, setInterim] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [country, setCountry] = useState<Country>('ESPAÑA');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const recognitionRef = useRef<any>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const SR = getSpeechRecognition();
  const hasWebSpeech = !!SR;

  // Pulsing animation while recording
  useEffect(() => {
    if (isRecording) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.12, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    }
    pulseAnim.setValue(1);
  }, [isRecording, pulseAnim]);

  const startRecording = useCallback(() => {
    if (!SR) return;
    try {
      const rec = new SR();
      rec.lang = 'es-PE';
      rec.continuous = true;
      rec.interimResults = true;

      rec.onresult = (event: any) => {
        let finalChunk = '';
        let interimChunk = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const r = event.results[i];
          if (r.isFinal) finalChunk += r[0].transcript;
          else interimChunk += r[0].transcript;
        }
        if (finalChunk) {
          setTranscript((prev) => (prev ? prev + ' ' : '') + finalChunk.trim());
        }
        setInterim(interimChunk);
      };
      rec.onerror = () => setIsRecording(false);
      rec.onend = () => {
        setIsRecording(false);
        setInterim('');
      };
      rec.start();
      recognitionRef.current = rec;
      setIsRecording(true);
    } catch {
      setIsRecording(false);
    }
  }, [SR]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      recognitionRef.current = null;
    }
    setIsRecording(false);
  }, []);

  const handleToggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  const handleSubmit = async () => {
    const text = transcript.trim();
    if (!text) return;
    setSubmitting(true);
    const examCode = COUNTRY_OPTIONS.find((c) => c.key === country)?.exam ?? 'MIR';
    const result = await submitApexQueue({
      texto_raw: text,
      tipo: 'dictar_error',
      pais: country,
      examen: examCode,
      fuente_app: 'dictar_error',
    });
    setSubmitting(false);
    setPendingCount(result.pendingCount);
    setSuccess(true);
  };

  const handleClose = () => {
    stopRecording();
    setTranscript('');
    setInterim('');
    setSuccess(false);
    setPendingCount(0);
    setCountry('ESPAÑA');
    onClose();
  };

  // Success screen
  if (success) {
    return (
      <Modal visible={visible} animationType="fade" onRequestClose={handleClose}>
        <View style={styles.container}>
          <View style={styles.successContainer}>
            <Text style={styles.successEmoji}>✅</Text>
            <Text style={styles.successTitle}>Error Dictado</Text>
            <Text style={styles.successSubtitle}>
              {pendingCount > 0
                ? `Encolado · ${pendingCount} pendiente${pendingCount !== 1 ? 's' : ''} en cola`
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
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeBtn}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🎙 Dictar Error</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
          {hasWebSpeech ? (
            <>
              {/* Record button */}
              <View style={styles.recordArea}>
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <TouchableOpacity
                    style={[
                      styles.recordBtn,
                      isRecording && styles.recordBtnActive,
                    ]}
                    onPress={handleToggleRecording}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.recordIcon}>{isRecording ? '■' : '🎙'}</Text>
                  </TouchableOpacity>
                </Animated.View>
                <Text style={styles.recordHint}>
                  {isRecording ? 'Escuchando…' : transcript ? 'Tap para continuar' : 'Tap para grabar'}
                </Text>
                {isRecording && (
                  <View style={styles.waveform}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <WaveBar key={i} delay={i * 100} />
                    ))}
                  </View>
                )}
              </View>
            </>
          ) : (
            <View style={styles.fallbackNotice}>
              <Text style={styles.fallbackEmoji}>⌨️</Text>
              <Text style={styles.fallbackTitle}>Speech Recognition no disponible</Text>
              <Text style={styles.fallbackText}>Describe tu error manualmente en el campo abajo</Text>
            </View>
          )}

          {/* Transcript editor */}
          <Text style={styles.label}>TRANSCRIPCIÓN</Text>
          <TextInput
            style={styles.transcriptInput}
            value={transcript + (interim ? ' ' + interim : '')}
            onChangeText={(text) => { setTranscript(text); setInterim(''); }}
            placeholder="El texto transcrito aparecerá aquí… (o escribe manualmente)"
            placeholderTextColor={Colors.muted}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          {/* Country picker */}
          <Text style={styles.label}>PAÍS / EXAMEN</Text>
          <View style={styles.countryRow}>
            {COUNTRY_OPTIONS.map((c) => (
              <TouchableOpacity
                key={c.key}
                style={[styles.countryBtn, country === c.key && styles.countryBtnActive]}
                onPress={() => setCountry(c.key)}
                activeOpacity={0.7}
              >
                <Text style={styles.countryFlag}>{c.flag}</Text>
                <Text style={[styles.countryLabel, country === c.key && styles.countryLabelActive]}>
                  {c.label}
                </Text>
                <Text style={[styles.countryExam, country === c.key && styles.countryExamActive]}>
                  {c.exam}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[styles.submitBtn, (!transcript.trim() || submitting) && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={!transcript.trim() || submitting}
            activeOpacity={0.8}
          >
            {submitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitBtnText}>⚡ ENCOLAR COMO ERROR</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

function WaveBar({ delay }: { delay: number }) {
  const h = useRef(new Animated.Value(8)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(h, { toValue: 24, duration: 300, useNativeDriver: false }),
        Animated.timing(h, { toValue: 8, duration: 300, useNativeDriver: false }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [delay, h]);
  return <Animated.View style={{ width: 4, height: h, backgroundColor: Colors.coral, borderRadius: 2, marginHorizontal: 2 }} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  header: {
    paddingTop: 60, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  closeBtn: { fontSize: 22, color: Colors.muted, fontWeight: '300' },
  headerTitle: { fontSize: FontSize.titleMd, fontWeight: '700', color: Colors.onSurface },
  content: { flex: 1 },
  contentInner: { padding: Spacing.lg, paddingBottom: 40 },

  recordArea: { alignItems: 'center', paddingVertical: Spacing.xl },
  recordBtn: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: Colors.coral, alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.coral, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6, shadowRadius: 20, elevation: 10,
    ...(Platform.OS === 'web' ? { boxShadow: '0 0 40px rgba(245, 99, 66, 0.5)', cursor: 'pointer' as any } : {}),
  },
  recordBtnActive: { backgroundColor: '#DC2626' },
  recordIcon: { fontSize: 40 },
  recordHint: { fontSize: FontSize.bodyMd, color: Colors.muted, marginTop: Spacing.md, fontWeight: '500' },
  waveform: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.md, height: 30 },

  fallbackNotice: {
    alignItems: 'center', padding: Spacing.xl,
    backgroundColor: 'rgba(245,99,66,0.08)', borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
  },
  fallbackEmoji: { fontSize: 32, marginBottom: 8 },
  fallbackTitle: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, marginBottom: 4 },
  fallbackText: { fontSize: 11, color: Colors.muted, textAlign: 'center' },

  label: {
    fontSize: 11, fontWeight: '600', color: Colors.smallLabel,
    letterSpacing: 0.96, textTransform: 'uppercase',
    marginTop: Spacing.lg, marginBottom: Spacing.sm,
  },
  transcriptInput: {
    backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, fontSize: FontSize.bodyMd, color: Colors.onSurface,
    minHeight: 120, lineHeight: 22,
  },

  countryRow: { flexDirection: 'row', gap: Spacing.sm },
  countryBtn: {
    flex: 1, paddingVertical: Spacing.md, paddingHorizontal: Spacing.xs,
    borderRadius: BorderRadius.md, borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)', backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
  },
  countryBtnActive: { borderColor: Colors.coral, backgroundColor: Colors.coral + '15' },
  countryFlag: { fontSize: 24, marginBottom: 4 },
  countryLabel: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.onSurface },
  countryLabelActive: { color: Colors.coral },
  countryExam: { fontSize: 9, color: Colors.muted, marginTop: 2, fontWeight: '600', letterSpacing: 0.5 },
  countryExamActive: { color: Colors.coral },

  submitBtn: {
    backgroundColor: Colors.coral, borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.xl, alignItems: 'center',
    marginTop: Spacing.xl,
  },
  submitBtnDisabled: { opacity: 0.4 },
  submitBtnText: { fontSize: FontSize.bodyLg, fontWeight: '800', color: '#FFFFFF', letterSpacing: 1 },

  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  successEmoji: { fontSize: 64, marginBottom: Spacing.xl },
  successTitle: { fontSize: FontSize.headlineLg, fontWeight: '800', color: Colors.coral, marginBottom: Spacing.sm },
  successSubtitle: { fontSize: FontSize.bodyLg, color: Colors.onSurfaceVariant, textAlign: 'center', marginBottom: 32 },
  doneBtn: { backgroundColor: Colors.surfaceContainerHighest, borderRadius: BorderRadius.md, paddingVertical: Spacing.md, paddingHorizontal: 48 },
  doneBtnText: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface, letterSpacing: 0.5 },
});
