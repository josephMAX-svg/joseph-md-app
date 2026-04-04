import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';
import type { AgentReport } from '../lib/supabase';
import { markReportRead } from '../lib/supabase';

interface AgentReportViewerProps {
  visible: boolean;
  report: AgentReport | null;
  onClose: () => void;
}

/** Format date to readable string */
function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

/** Map agent name to color accent */
function getAgentColor(agente?: string): string {
  switch (agente) {
    case 'ProMIR': return Colors.amber;
    case 'USMLE': return Colors.blue;
    case 'ENCAPS': return Colors.coral;
    case 'MethodResearcher': return Colors.purple;
    default: return Colors.teal;
  }
}

export default function AgentReportViewer({ visible, report, onClose }: AgentReportViewerProps) {
  // Mark as read when opened
  React.useEffect(() => {
    if (visible && report && !report.leido) {
      markReportRead(report.id);
    }
  }, [visible, report]);

  if (!report) return null;

  const agentColor = getAgentColor(report.agente);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: agentColor + '30' }]}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeBtn}>✕</Text>
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>
              📊 {report.agente ?? 'Agent'} — {formatDate(report.fecha)}
            </Text>
            {report.reporte_numero && (
              <View style={[styles.reportBadge, { backgroundColor: agentColor + '20' }]}>
                <Text style={[styles.reportBadgeText, { color: agentColor }]}>
                  Reporte #{report.reporte_numero}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Body — monospace for ASCII tables & emoji */}
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          {/* Summary JSON if available */}
          {report.resumen_json && (
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>RESUMEN</Text>
              <Text style={styles.summaryText}>
                {typeof report.resumen_json === 'string'
                  ? report.resumen_json
                  : JSON.stringify(report.resumen_json, null, 2)}
              </Text>
            </View>
          )}

          {/* Full report text */}
          {report.reporte_completo ? (
            <View style={styles.reportCard}>
              <Text style={styles.reportText}>{report.reporte_completo}</Text>
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>Sin contenido de reporte</Text>
            </View>
          )}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          {report.fase_actual && (
            <View style={styles.faseRow}>
              <Text style={styles.faseLabel}>Fase actual:</Text>
              <View style={[styles.faseBadge, { backgroundColor: agentColor + '20' }]}>
                <Text style={[styles.faseText, { color: agentColor }]}>{report.fase_actual}</Text>
              </View>
            </View>
          )}
          <TouchableOpacity style={styles.dismissBtn} onPress={onClose}>
            <Text style={styles.dismissBtnText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

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
    borderBottomWidth: 1,
  },
  closeBtn: {
    fontSize: 22,
    color: Colors.muted,
    fontWeight: '300',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: FontSize.titleMd,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 4,
  },
  reportBadge: {
    alignSelf: 'flex-start',
    borderRadius: BorderRadius.full,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  reportBadgeText: {
    fontSize: FontSize.labelSm,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  summaryLabel: {
    fontSize: FontSize.labelSm,
    fontWeight: '700',
    color: Colors.muted,
    letterSpacing: 1.2,
    marginBottom: Spacing.sm,
  },
  summaryText: {
    fontSize: FontSize.bodyMd,
    color: Colors.onSurface,
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  reportCard: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  reportText: {
    fontSize: FontSize.bodyMd,
    color: Colors.onSurface,
    lineHeight: 22,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  emptyCard: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    padding: Spacing['3xl'],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FontSize.bodyMd,
    color: Colors.muted,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceContainerHighest,
  },
  faseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  faseLabel: {
    fontSize: FontSize.bodyMd,
    color: Colors.muted,
    fontWeight: '500',
  },
  faseBadge: {
    borderRadius: BorderRadius.full,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  faseText: {
    fontSize: FontSize.labelMd,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dismissBtn: {
    backgroundColor: Colors.surfaceContainerHighest,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  dismissBtnText: {
    fontSize: FontSize.labelLg,
    fontWeight: '700',
    color: Colors.onSurface,
    letterSpacing: 0.5,
  },
});
