/**
 * ApexManualModal v2.3.2 — Capa 2 del flujo manual Palmerton-driven.
 * Para celular/iPad/PC web cuando NO se puede usar Ctrl+Shift+A.
 *
 * Joseph pega un BLOQUE APEX en el textarea, el cliente parsea en vivo
 * y muestra preview. Al confirmar:
 *   - PC en LAN: POST a http://localhost:3000/apex/manual
 *   - Vercel HTTPS / mobile fuera de LAN: insert a Supabase apex_queue
 */
import React, { useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight } from '../theme/tokens';
import { supabase } from '../lib/supabase';

interface ApexManualModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmitted?: (info: ApexParsed) => void;
}

export interface ApexParsed {
  examen: string;
  especialidad: string;
  subtema: string;
  fuente: string;
  modo: string;
  imagen: string;
  frente: string;
  reverso: string;
  ccsn: string;
  fisio: string;
  relaciones: string;
  is_valid: boolean;
  errors: string[];
}

const PATTERN = /═{3,}\s*BLOQUE\s*APEX/i;
const SUBTEMA_REGEX = /^\d{2}_[A-Za-z][A-Za-z0-9_]*$/;
const VALID_EXAM = ['MIR', 'ENCAPS', 'USMLE'];
const VALID_MODE: Record<string, string[]> = {
  MIR: ['estudio', 'simulacro_mir', 'examen_real'],
  ENCAPS: ['estudio', 'simulacro_sab', 'simulacro_dom', 'examen_real'],
  USMLE: ['estudio', 'simulacro_step1', 'examen_real'],
};

function extract(text: string, label: string, def = ''): string {
  const re = new RegExp(`^${label}\\s*:\\s*(.+?)(?=\\n[A-Z_]+\\s*:|\\n═|$)`, 'ms');
  const m = text.match(re);
  return m ? m[1].trim() : def;
}

function parseBloque(text: string): ApexParsed {
  const errors: string[] = [];
  if (!text || !PATTERN.test(text)) {
    errors.push("Falta patrón '═══ BLOQUE APEX'");
  }
  const examen = extract(text, 'EXAMEN').toUpperCase();
  const especialidad = extract(text, 'ESPECIALIDAD');
  const subtema = extract(text, 'SUBTEMA');
  const fuente = extract(text, 'FUENTE');
  const modo = extract(text, 'MODO', 'estudio');
  const imagen = extract(text, 'IMAGEN', 'no');
  const frente = extract(text, 'FRENTE');
  const reverso = extract(text, 'REVERSO');
  const ccsn = extract(text, 'CCSN');
  const fisio = extract(text, 'FISIO');
  const relaciones = extract(text, 'RELACIONES');

  if (!frente) errors.push('FRENTE vacío');
  if (!reverso) errors.push('REVERSO vacío');
  if (!VALID_EXAM.includes(examen)) {
    errors.push(`EXAMEN inválido (${examen || 'vacío'}); use MIR | ENCAPS | USMLE`);
  }
  if (!especialidad) errors.push('ESPECIALIDAD vacía');
  if (!SUBTEMA_REGEX.test(subtema)) {
    errors.push(`SUBTEMA inválido (${subtema || 'vacío'}); patrón NN_lowercase`);
  }
  if (examen && VALID_MODE[examen] && !VALID_MODE[examen].includes(modo)) {
    errors.push(`MODO inválido para ${examen}`);
  }
  return {
    examen, especialidad, subtema, fuente, modo, imagen,
    frente, reverso, ccsn, fisio, relaciones,
    is_valid: errors.length === 0,
    errors,
  };
}

async function tryLocalEndpoint(bloque: string, baseUrl: string): Promise<any | null> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    const r = await fetch(`${baseUrl}/apex/manual`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bloque_apex: bloque, source: 'pc_web' }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (r.ok) return await r.json();
    return { success: false, error: `HTTP ${r.status}` };
  } catch {
    return null;
  }
}

export default function ApexManualModal({ visible, onClose, onSubmitted }: ApexManualModalProps) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ kind: 'ok' | 'queued' | 'error'; msg: string } | null>(null);

  const parsed = useMemo(() => parseBloque(text), [text]);

  const handleSubmit = async () => {
    if (!parsed.is_valid || submitting) return;
    setSubmitting(true);
    setResult(null);
    try {
      // 1) intentar localhost (PC del usuario) — solo si protocol es http
      const isHttp = typeof window !== 'undefined' && window.location?.protocol === 'http:';
      let local: any = null;
      if (isHttp) {
        local = await tryLocalEndpoint(text, 'http://localhost:3000');
      }
      // 2) intentar LAN IP
      if (!local) {
        local = await tryLocalEndpoint(text, 'http://192.168.1.2:3000');
      }
      if (local && local.success) {
        setResult({
          kind: 'ok',
          msg: `✅ APEX enviado: ${local.examen} / ${local.especialidad} / ${local.subtema}`,
        });
        onSubmitted?.(parsed);
        setTimeout(() => { setText(''); setResult(null); onClose(); }, 1800);
        return;
      }
      // 3) fallback Supabase apex_queue
      const { error } = await supabase.from('apex_queue').insert({
        texto_raw: text,
        tipo: 'manual',
        fuente_app: 'mobile_or_vercel',
        examen: parsed.examen,
        especialidad: parsed.especialidad,
        subtema: parsed.subtema,
        estado: 'pendiente',
      });
      if (error) {
        setResult({ kind: 'error', msg: `❌ Supabase queue: ${error.message}` });
      } else {
        setResult({
          kind: 'queued',
          msg: '⏳ APEX en cola — se procesará al encender PC',
        });
        onSubmitted?.(parsed);
        setTimeout(() => { setText(''); setResult(null); onClose(); }, 2200);
      }
    } catch (e: any) {
      setResult({ kind: 'error', msg: `❌ ${String(e?.message || e)}` });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.modalCard}>
          <View style={styles.grabber} />
          <View style={styles.header}>
            <Text style={styles.title}>📋 Pegar APEX manual</Text>
            <TouchableOpacity onPress={onClose} hitSlop={10}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: Spacing.md }}>
            <Text style={styles.label}>BLOQUE APEX (pega aquí)</Text>
            <TextInput
              style={styles.textarea}
              multiline
              numberOfLines={12}
              placeholder={'═══════════ BLOQUE APEX ═══════════\nFRENTE: ...\nREVERSO: ...\n...'}
              placeholderTextColor={Colors.muted}
              value={text}
              onChangeText={setText}
              textAlignVertical="top"
            />

            <Text style={styles.label}>Vista previa parseada</Text>
            <View style={styles.previewBox}>
              <Row label="EXAMEN" value={parsed.examen} />
              <Row label="ESPECIALIDAD" value={parsed.especialidad} />
              <Row label="SUBTEMA" value={parsed.subtema} />
              <Row label="FUENTE" value={parsed.fuente} />
              <Row label="MODO" value={parsed.modo} />
              <Row label="IMAGEN" value={parsed.imagen} />
              <View style={styles.divider} />
              <Row label="FRENTE" value={parsed.frente} multiline />
              <Row label="REVERSO" value={parsed.reverso} multiline />
            </View>

            {parsed.errors.length > 0 && (
              <View style={styles.errorBox}>
                <Text style={styles.errorTitle}>⚠️ Validación pendiente:</Text>
                {parsed.errors.map((e, i) => (
                  <Text key={i} style={styles.errorItem}>• {e}</Text>
                ))}
              </View>
            )}

            {result && (
              <View style={[styles.resultBox, result.kind === 'ok' && styles.resultOk,
                            result.kind === 'queued' && styles.resultQueued,
                            result.kind === 'error' && styles.resultError]}>
                <Text style={styles.resultText}>{result.msg}</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity onPress={onClose} style={styles.btnCancel}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!parsed.is_valid || submitting}
              style={[styles.btnSubmit, (!parsed.is_valid || submitting) && styles.btnDisabled]}
            >
              <Text style={styles.btnSubmitText}>
                {submitting ? 'Enviando...' : 'Enviar a 5 destinos'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function Row({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <View style={[styles.row, multiline && { alignItems: 'flex-start' }]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue} numberOfLines={multiline ? 3 : 1}>
        {value || '—'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(2,6,16,0.72)' },
  modalCard: {
    backgroundColor: Colors.surfaceContainer,
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    borderWidth: 1, borderBottomWidth: 0, borderColor: Hairline.soft,
    maxHeight: '92%',
    ...Elevation.lg,
  },
  grabber: {
    alignSelf: 'center', width: 40, height: 4, borderRadius: BorderRadius.full,
    backgroundColor: Hairline.strong, marginTop: Spacing.sm, marginBottom: -Spacing.xs,
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.lg,
    borderBottomWidth: 1, borderBottomColor: Hairline.soft,
  },
  title: { fontSize: FontSize.titleLg, lineHeight: LineHeight.titleLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: 0.2 },
  closeBtn: {
    fontSize: 20, color: Colors.onSurfaceVariant, textAlign: 'center',
    width: 32, height: 32, lineHeight: 32, borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceContainerLow,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
  },
  label: {
    fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.smallLabel,
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: Spacing.sm, marginTop: Spacing.md,
  },
  textarea: {
    minHeight: 200, backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.lg, padding: Spacing.md,
    borderWidth: 1, borderColor: Hairline.soft,
    color: Colors.onSurface, fontSize: 13, lineHeight: 20,
    fontFamily: Platform.select({ ios: 'Courier', default: 'monospace' }),
  },
  previewBox: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg, padding: Spacing.lg,
    borderWidth: 1, borderColor: Hairline.soft,
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5 },
  rowLabel: { width: 104, fontSize: FontSize.labelSm, color: Colors.smallLabel, fontWeight: '700', letterSpacing: 0.4 },
  rowValue: { flex: 1, fontSize: FontSize.bodyMd, color: Colors.onSurface },
  divider: { height: 1, backgroundColor: Hairline.medium, marginVertical: Spacing.sm },
  errorBox: {
    backgroundColor: Colors.coral + '15', borderRadius: BorderRadius.lg,
    padding: Spacing.md, marginTop: Spacing.md,
    borderLeftWidth: 3, borderLeftColor: Colors.coral,
  },
  errorTitle: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.coral, marginBottom: Spacing.xs },
  errorItem: { fontSize: FontSize.labelSm, color: Colors.coral, lineHeight: LineHeight.labelSm },
  resultBox: { borderRadius: BorderRadius.lg, padding: Spacing.md, marginTop: Spacing.md },
  resultOk: { backgroundColor: Colors.teal + '20', borderLeftWidth: 3, borderLeftColor: Colors.teal, ...Elevation.sm },
  resultQueued: { backgroundColor: Colors.amber + '20', borderLeftWidth: 3, borderLeftColor: Colors.amber, ...Elevation.sm },
  resultError: { backgroundColor: Colors.coral + '20', borderLeftWidth: 3, borderLeftColor: Colors.coral, ...Elevation.sm },
  resultText: { fontSize: FontSize.bodyMd, lineHeight: LineHeight.bodyMd, fontWeight: '600', color: Colors.onSurface },
  footer: {
    flexDirection: 'row', gap: Spacing.sm,
    padding: Spacing.lg, borderTopWidth: 1, borderTopColor: Hairline.soft,
  },
  btnCancel: {
    flex: 1, paddingVertical: Spacing.md, alignItems: 'center',
    borderRadius: BorderRadius.lg, backgroundColor: Colors.surfaceContainerHighest,
    borderWidth: 1, borderColor: Hairline.soft,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
  },
  btnCancelText: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, fontWeight: '700' },
  btnSubmit: {
    flex: 2, paddingVertical: Spacing.md, alignItems: 'center',
    borderRadius: BorderRadius.lg, backgroundColor: Colors.teal,
    ...Elevation.glow(Colors.teal),
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
  },
  btnDisabled: { opacity: 0.4, ...Elevation.none },
  btnSubmitText: { fontSize: FontSize.bodyMd, color: '#0B1628', fontWeight: '800', letterSpacing: 0.3 },
});
