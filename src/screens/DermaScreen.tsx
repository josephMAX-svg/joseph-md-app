import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Linking, Modal } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';

type SubtopicStatus = 'NOT STARTED' | 'IN PROGRESS' | 'COMPLETED';
const TOPICS = [
  { title: 'Facial Topography & Vascularization — Cotofana' },
  { title: 'Structural Facial Analysis & Aging — Cotofana, de Maio' },
  { title: 'Injectables & Rheology — de Maio' },
  { title: 'Complication Management — Carruthers' },
  { title: 'Energy-Based Devices' },
  { title: 'Acne & Skin Science' },
  { title: 'Botulinum Toxin Mastery — Carruthers' },
].map(t => ({ ...t, subtopics: Array.from({ length: 10 }, (_, i) => `Subtopic ${i + 1}`) }));

const STATUS_CYCLE: SubtopicStatus[] = ['NOT STARTED', 'IN PROGRESS', 'COMPLETED'];
const SC: Record<SubtopicStatus, { bg: string; text: string; dot: string }> = {
  'NOT STARTED': { bg: Colors.surfaceContainerHighest, text: Colors.muted, dot: Colors.surfaceContainerHighest },
  'IN PROGRESS': { bg: Colors.amber + '20', text: Colors.amber, dot: Colors.amber },
  'COMPLETED': { bg: Colors.teal + '20', text: Colors.teal, dot: Colors.teal },
};

const PROTOCOL = [
  '1. STOP injection immediately', '2. Aspirate if possible',
  '3. Inject hyaluronidase 150–300 IU', '4. Apply warm compresses (NOT cold)',
  '5. Nitroglycerin paste 2%', '6. Aspirin 325mg PO immediately',
  '7. Massage gently', '8. Document time of onset, products, volumes',
  '9. Monitor capillary refill q15min', '10. Contact supervising physician',
  '11. Consider hyperbaric oxygen', '12. Photo-document q1h for 6h',
  '13. Schedule follow-up within 24h',
];

function TopicCard({ topic }: { topic: typeof TOPICS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [statuses, setStatuses] = useState<SubtopicStatus[]>(topic.subtopics.map(() => 'NOT STARTED'));
  const cycle = (i: number) => setStatuses(p => { const n = [...p]; n[i] = STATUS_CYCLE[(STATUS_CYCLE.indexOf(n[i]) + 1) % 3]; return n; });
  const done = statuses.filter(s => s === 'COMPLETED').length;
  const pct = Math.round((done / topic.subtopics.length) * 100);
  return (
    <View style={s.topicCard}>
      <TouchableOpacity style={s.topicHeader} onPress={() => setExpanded(!expanded)}>
        <View style={{ flex: 1 }}><Text style={s.topicTitle}>{topic.title}</Text><Text style={s.topicCount}>{done}/{topic.subtopics.length} subtopics</Text></View>
        <View style={s.topicProgress}><Text style={s.topicPercent}>{pct}%</Text></View>
        <Text style={s.expandIcon}>{expanded ? '▾' : '▸'}</Text>
      </TouchableOpacity>
      <View style={s.progressTrack}><View style={[s.progressValue, { width: `${pct}%` }]} /></View>
      {expanded && (<View style={s.subtopicList}>{topic.subtopics.map((sub, i) => {
        const st = statuses[i]; const c = SC[st];
        return (<TouchableOpacity key={i} style={s.subtopicRow} onPress={() => cycle(i)}>
          <View style={[s.subtopicDot, { backgroundColor: c.dot }]} />
          <Text style={[s.subtopicText, st === 'COMPLETED' && { textDecorationLine: 'line-through', color: Colors.muted }]}>{sub}</Text>
          <View style={[s.statusTag, { backgroundColor: c.bg }]}><Text style={[s.statusTagText, { color: c.text }]}>{st}</Text></View>
        </TouchableOpacity>);
      })}</View>)}
    </View>
  );
}

export default function DermaScreen() {
  const [showProtocol, setShowProtocol] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <ScrollView style={s.screen} contentContainerStyle={s.scrollContent}>
        <View style={s.header}><Text style={s.headerTitle}>Derma Estética</Text>
          <View style={[s.badge, { backgroundColor: Colors.purple + '20' }]}><Text style={[s.badgeText, { color: Colors.purple }]}>Fellowship Mayo Clinic 2035</Text></View></View>
        <View style={s.emergencyCard}>
          <View style={s.emergencyHeader}><Text style={s.emergencyIcon}>🚨</Text><Text style={s.emergencyTitle}>EMERGENCY: Vascular Occlusion Protocol</Text></View>
          <Text style={s.emergencyText}>Immediate hyaluronidase injection · Warm compress · Aspirin 325mg · Nitropaste 2%{'\n'}Document time of onset · Contact supervising physician</Text>
          <TouchableOpacity style={s.emergencyButton} onPress={() => setShowProtocol(true)}><Text style={s.emergencyButtonText}>VIEW FULL PROTOCOL</Text></TouchableOpacity>
        </View>
        {TOPICS.map((t, i) => <TopicCard key={i} topic={t} />)}
        <TouchableOpacity style={s.apexButton} onPress={() => Alert.alert('APEX English', 'APEX English block generation: coming soon')}>
          <Text style={s.apexButtonText}>⚡ Generate APEX Block</Text><Text style={s.apexButtonSub}>English only · Aesthetic Dermatology</Text></TouchableOpacity>
        <TouchableOpacity style={s.linkCard} onPress={() => Linking.openURL('https://accessdermatology.mhmedical.com')}>
          <Text style={s.linkCardTitle}>📚 Access Dermatology</Text><Text style={s.linkCardSub}>McGraw-Hill reference · Comprehensive atlas</Text></TouchableOpacity>
        <TouchableOpacity style={s.linkCard} onPress={() => Alert.alert('iPad Drawing Log', 'Camera integration: coming soon')}>
          <Text style={s.linkCardTitle}>✏️ iPad Drawing Log</Text><Text style={s.linkCardSub}>Procreate anatomy sketches · 0 drawings</Text></TouchableOpacity>
        <View style={s.totalsRow}><View style={s.totalBlock}><Text style={s.totalValue}>0</Text><Text style={s.totalLabel}>PAPERS</Text></View>
          <View style={s.totalBlock}><Text style={s.totalValue}>0/70</Text><Text style={s.totalLabel}>SUBTOPICS</Text></View>
          <View style={s.totalBlock}><Text style={s.totalValue}>0</Text><Text style={s.totalLabel}>DRAWINGS</Text></View>
          <View style={s.totalBlock}><Text style={s.totalValue}>0</Text><Text style={s.totalLabel}>APEX CARDS</Text></View></View>
      </ScrollView>
      <Modal visible={showProtocol} transparent animationType="slide" onRequestClose={() => setShowProtocol(false)}>
        <View style={s.modalOverlay}><View style={s.modalContent}><Text style={s.modalTitle}>🚨 Vascular Occlusion Protocol</Text>
          <ScrollView style={s.modalScroll}>{PROTOCOL.map((step, i) => <Text key={i} style={s.modalStep}>{step}</Text>)}</ScrollView>
          <TouchableOpacity style={s.modalClose} onPress={() => setShowProtocol(false)}><Text style={s.modalCloseText}>CLOSE</Text></TouchableOpacity></View></View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.surface },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: 60, paddingBottom: 120 },
  header: { marginBottom: Spacing['2xl'] },
  headerTitle: { fontSize: FontSize.headlineLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5, marginBottom: Spacing.sm },
  badge: { borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 12, alignSelf: 'flex-start' },
  badgeText: { fontSize: FontSize.labelSm, fontWeight: '700', letterSpacing: 0.3 },
  emergencyCard: { backgroundColor: Colors.coral + '12', borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.section, borderLeftWidth: 4, borderLeftColor: Colors.coral },
  emergencyHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  emergencyIcon: { fontSize: 18, marginRight: Spacing.sm },
  emergencyTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.coral, flex: 1 },
  emergencyText: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, lineHeight: 18, marginBottom: Spacing.md },
  emergencyButton: { backgroundColor: Colors.coral, borderRadius: BorderRadius.md, paddingVertical: Spacing.sm, alignItems: 'center' },
  emergencyButtonText: { fontSize: FontSize.labelMd, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.5 },
  topicCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.md },
  topicHeader: { flexDirection: 'row', alignItems: 'center' },
  topicTitle: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: 2 },
  topicCount: { fontSize: FontSize.labelSm, color: Colors.muted },
  topicProgress: { backgroundColor: Colors.purple + '20', borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 8, marginRight: Spacing.sm },
  topicPercent: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.purple },
  expandIcon: { fontSize: 16, color: Colors.muted },
  progressTrack: { height: 4, backgroundColor: Colors.surfaceContainerHighest, borderRadius: 2, overflow: 'hidden', marginTop: Spacing.sm },
  progressValue: { height: 4, borderRadius: 2, backgroundColor: Colors.purple },
  subtopicList: { marginTop: Spacing.md },
  subtopicRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.xs },
  subtopicDot: { width: 6, height: 6, borderRadius: 3, marginRight: Spacing.sm },
  subtopicText: { fontSize: FontSize.bodyMd, color: Colors.onSurface, flex: 1 },
  statusTag: { borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 6 },
  statusTagText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  apexButton: { backgroundColor: Colors.purple, borderRadius: BorderRadius.lg, padding: Spacing.xl, alignItems: 'center', marginBottom: Spacing.section },
  apexButtonText: { fontSize: FontSize.titleMd, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.5 },
  apexButtonSub: { fontSize: FontSize.labelSm, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  linkCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.md },
  linkCardTitle: { fontSize: FontSize.bodyLg, fontWeight: '600', color: Colors.onSurface, marginBottom: 2 },
  linkCardSub: { fontSize: FontSize.labelSm, color: Colors.muted },
  totalsRow: { flexDirection: 'row', backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginTop: Spacing.sm },
  totalBlock: { flex: 1, alignItems: 'center' },
  totalValue: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.purple },
  totalLabel: { fontSize: 9, fontWeight: '600', color: Colors.muted, letterSpacing: 0.8, marginTop: 2 },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalContent: { backgroundColor: Colors.surfaceContainer, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: Spacing.xl, maxHeight: '80%' },
  modalTitle: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.coral, marginBottom: Spacing.lg },
  modalScroll: { marginBottom: Spacing.lg },
  modalStep: { fontSize: FontSize.bodyMd, color: Colors.onSurface, lineHeight: 26, paddingVertical: 4 },
  modalClose: { backgroundColor: Colors.surfaceContainerHighest, borderRadius: BorderRadius.md, paddingVertical: Spacing.md, alignItems: 'center' },
  modalCloseText: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: 1 },
});
