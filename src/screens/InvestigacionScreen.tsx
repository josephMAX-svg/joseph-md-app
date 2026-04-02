import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Linking, Modal, TextInput } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';

const PHASES = ['Ideation', 'Protocol', 'Data Collection', 'Analysis', 'Manuscript', 'Submission'];
const RL = [
  { title: 'Facial Topography & Vascularization', status: 'PLANNING', sc: Colors.amber, mayo: 33, phase: 0, tags: ['Anatomy', 'Vascular'], target: 'Dermatologic Surgery', desc: 'Mapping facial vascular territories for safer injection protocols.', bottleneck: 'Need cadaver lab access', timeline: 'Q3 2026 — Q1 2027' },
  { title: 'Structural Facial Analysis & Aging', status: 'PLANNING', sc: Colors.amber, mayo: 33, phase: 0, tags: ['Facial Analysis', 'Aging'], target: 'J Cosmetic Dermatology', desc: 'Age-related structural changes in facial compartments.', bottleneck: 'Image dataset collection', timeline: 'Q4 2026 — Q2 2027' },
  { title: 'Injectables & Rheology', status: 'PLANNING', sc: Colors.amber, mayo: 34, phase: 0, tags: ['Fillers', 'Rheology'], target: 'Aesthetic Surgery Journal', desc: 'Comparative rheological properties of HA fillers.', bottleneck: 'Lab equipment access', timeline: 'Q1 2027 — Q3 2027' },
  { title: 'Vascular Complications & Safety (PERU-SAFE)', status: 'PLANNING', sc: Colors.amber, mayo: 38, phase: 0, tags: ['Safety', 'Complications', 'Peru'], target: 'JAAD International', desc: 'Retrospective study of vascular complications in Lima clinics.', bottleneck: 'IRB approval pending', timeline: 'Q2 2026 — Q4 2026' },
  { title: 'Energy-Based Devices', status: 'PLANNING', sc: Colors.amber, mayo: 34, phase: 0, tags: ['Laser', 'EBD'], target: 'Lasers in Medical Science', desc: 'Outcomes of EBD in Fitzpatrick IV-VI patients.', bottleneck: 'Patient recruitment', timeline: 'Q3 2026 — Q1 2027' },
  { title: 'Acne & Quality of Life (PERU-ACNE)', status: 'WRITING', sc: Colors.teal, mayo: 35, phase: 4, tags: ['Acne', 'QoL', 'Thesis'], target: 'JAAD International', desc: 'IGA vs CADI correlation in Peruvian adolescents.', bottleneck: 'Manuscript revision', timeline: 'Q1 2026 — Q3 2026' },
  { title: 'Botulinum Toxin Dosing', status: 'PLANNING', sc: Colors.amber, mayo: 34, phase: 0, tags: ['Botox', 'Dosing'], target: 'Dermatologic Surgery', desc: 'Dose-response curves for various facial regions.', bottleneck: 'Protocol design', timeline: 'Q1 2027 — Q3 2027' },
  { title: 'Teledermatology & AI (PERU-SKIN)', status: 'PLANNING', sc: Colors.amber, mayo: 39, phase: 0, tags: ['AI', 'Telehealth', 'Peru'], target: 'JAMA Dermatology', desc: 'AI diagnostic accuracy vs dermatologists in resource-limited settings.', bottleneck: 'Model training data', timeline: 'Q2 2026 — Q2 2027', flagship: true },
];
const JT = [
  { tier: 'Tier 1', color: '#FFD700', journals: [{ name: 'JAAD (IF 11.8)', url: 'https://www.jaad.org' }, { name: 'JAMA Dermatology (IF 10.9)', url: 'https://jamanetwork.com/journals/jamadermatology' }, { name: 'BJD (IF 9.0)', url: 'https://onlinelibrary.wiley.com/journal/13652133' }] },
  { tier: 'Tier 2', color: '#C0C0C0', journals: [{ name: 'JAAD International (IF 5.2)', url: 'https://www.jaadinternational.org' }, { name: 'Dermatologic Surgery (IF 4.5)', url: 'https://journals.lww.com/dermatologicsurgery' }, { name: 'Am J Clinical Dermatology (IF 8.5)', url: 'https://www.springer.com/journal/40257' }] },
  { tier: 'Tier 3', color: '#CD7F32', journals: [{ name: 'J Cosmetic Dermatology', url: 'https://onlinelibrary.wiley.com/journal/14732165' }, { name: 'Aesthetic Surgery Journal', url: 'https://academic.oup.com/asj' }, { name: 'JEADV', url: 'https://onlinelibrary.wiley.com/journal/14683083' }, { name: 'Clinical Anatomy', url: 'https://onlinelibrary.wiley.com/journal/10982353' }] },
];

function PhaseStep({ label, index, active, onPress }: { label: string; index: number; active: number; onPress: () => void }) {
  const isA = index <= active; const isC = index === active;
  return (
    <TouchableOpacity style={ss.phaseStepContainer} onPress={onPress}>
      <View style={[ss.phaseCircle, isA && { backgroundColor: Colors.teal }, isC && { borderWidth: 2, borderColor: '#FFFFFF' }]}>
        <Text style={[ss.phaseCircleText, isA && { color: '#0B1628' }]}>{index + 1}</Text>
      </View>
      <Text style={[ss.phaseStepLabel, isA && { color: Colors.teal }]} numberOfLines={1}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function InvestigacionScreen() {
  const [activePhase, setActivePhase] = useState(-1); // -1 = show all
  const [expandedLine, setExpandedLine] = useState<number | null>(null);
  const [showPubBreakdown, setShowPubBreakdown] = useState(false);
  const [doiModal, setDoiModal] = useState(false);
  const [doiInput, setDoiInput] = useState('');

  const filtered = activePhase === -1 ? RL : RL.filter(l => l.phase === activePhase);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <ScrollView style={ss.screen} contentContainerStyle={ss.scrollContent}>
        <View style={ss.header}>
          <Text style={ss.headerTitle}>Research Pipeline</Text>
          <Text style={ss.headerSub}>Mayo Clinic 2035</Text>
          <TouchableOpacity style={[ss.badge, { backgroundColor: Colors.teal + '20' }]} onPress={() => setActivePhase(-1)}>
            <Text style={[ss.badgeText, { color: Colors.teal }]}>{activePhase === -1 ? '8 ACTIVE LINES' : `Phase: ${PHASES[activePhase]} · Tap to reset`}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={ss.phaseStepper}>
          {PHASES.map((p, i) => (
            <React.Fragment key={i}>
              <PhaseStep label={p} index={i} active={activePhase} onPress={() => setActivePhase(activePhase === i ? -1 : i)} />
              {i < PHASES.length - 1 && <View style={ss.phaseConnector} />}
            </React.Fragment>
          ))}
        </ScrollView>

        <View style={ss.agentBanner}>
          <Text style={ss.agentIcon}>🤖</Text>
          <View style={{ flex: 1 }}><Text style={ss.agentTitle}>Multi-Agent Systematic Review Engine</Text><Text style={ss.agentSub}>Automated literature search, screening & extraction</Text></View>
          <View style={ss.agentTag}><Text style={ss.agentTagText}>BETA</Text></View>
        </View>

        <Text style={ss.sectionTitle}>RESEARCH LINES{activePhase !== -1 ? ` (${filtered.length})` : ''}</Text>
        {filtered.map((line, i) => {
          const idx = RL.indexOf(line);
          const isExp = expandedLine === idx;
          return (
            <TouchableOpacity key={idx} style={ss.researchCard} onPress={() => setExpandedLine(isExp ? null : idx)} activeOpacity={0.7}>
              <View style={ss.researchHeader}><View style={{ flex: 1 }}>
                <Text style={ss.researchTitle}>{line.title}</Text>
                {line.target && <Text style={ss.targetJournal}>Target: {line.target}</Text>}
                <View style={ss.tagsRow}>
                  {line.tags.map((t, j) => <View key={j} style={ss.tagChip}><Text style={ss.tagText}>{t}</Text></View>)}
                  {line.flagship && <View style={[ss.tagChip, { backgroundColor: Colors.teal + '30' }]}><Text style={[ss.tagText, { color: Colors.teal, fontWeight: '800' }]}>FLAGSHIP</Text></View>}
                </View>
              </View></View>
              <View style={ss.researchMeta}>
                <View style={[ss.statusTag, { backgroundColor: line.sc + '20' }]}><Text style={[ss.statusTagText, { color: line.sc }]}>{line.status}</Text></View>
                <View style={ss.mayoScoreContainer}><Text style={ss.mayoScoreLabel}>MAYO</Text><Text style={[ss.mayoScore, { color: line.mayo >= 38 ? Colors.teal : Colors.amber }]}>{line.mayo}</Text></View>
              </View>
              {isExp && (
                <View style={ss.expandedInfo}>
                  <Text style={ss.expandedLabel}>Description</Text><Text style={ss.expandedText}>{line.desc}</Text>
                  <Text style={ss.expandedLabel}>Timeline</Text><Text style={ss.expandedText}>{line.timeline}</Text>
                  <Text style={ss.expandedLabel}>Bottleneck</Text><Text style={[ss.expandedText, { color: Colors.coral }]}>{line.bottleneck}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        <Text style={ss.sectionTitle}>TARGET JOURNALS</Text>
        {JT.map((tier, i) => (
          <View key={i} style={ss.tierCard}>
            <View style={ss.tierHeader}><View style={[ss.tierDot, { backgroundColor: tier.color }]} /><Text style={[ss.tierName, { color: tier.color }]}>{tier.tier}</Text></View>
            {tier.journals.map((j, k) => (
              <TouchableOpacity key={k} onPress={() => Linking.openURL(j.url)}>
                <Text style={[ss.journalName, { textDecorationLine: 'underline' }]}>{j.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity style={ss.pubTracker} onPress={() => setShowPubBreakdown(!showPubBreakdown)} activeOpacity={0.7}>
          <Text style={ss.pubTitle}>Mayo Clinic Publications</Text>
          <View style={ss.pubRow}><Text style={ss.pubValue}>0</Text><Text style={ss.pubTotal}>/10</Text></View>
          <View style={ss.progressTrack}><View style={[ss.progressValue, { width: '0%' }]} /></View>
          <Text style={ss.pubSub}>Goal: 10 publications before fellowship application</Text>
          {showPubBreakdown && (
            <View style={ss.breakdownContainer}>
              {['JAAD', 'JAMA Dermatology', 'BJD', 'JAAD International', 'Dermatologic Surgery', 'Other'].map((j, i) => (
                <View key={i} style={ss.breakdownRow}><Text style={ss.breakdownJournal}>{j}</Text><Text style={ss.breakdownCount}>0</Text></View>
              ))}
            </View>
          )}
        </TouchableOpacity>

        <Text style={ss.sectionTitle}>CITATION PIPELINE</Text>
        <View style={ss.citationRow}>
          <TouchableOpacity style={ss.citationCard} onPress={() => Linking.openURL('https://www.semanticscholar.org')}>
            <Text style={ss.citationIcon}>🔍</Text><Text style={ss.citationName}>Semantic Scholar</Text><Text style={ss.citationSub}>AI-powered search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ss.citationCard} onPress={() => Linking.openURL('https://www.perplexity.ai')}>
            <Text style={ss.citationIcon}>🧠</Text><Text style={ss.citationName}>Perplexity</Text><Text style={ss.citationSub}>Research assistant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ss.citationCard} onPress={() => setDoiModal(true)}>
            <Text style={ss.citationIcon}>📄</Text><Text style={ss.citationName}>DOI → APA 7</Text><Text style={ss.citationSub}>Auto-format</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={doiModal} transparent animationType="fade" onRequestClose={() => setDoiModal(false)}>
        <View style={ss.modalOverlay}><View style={ss.modalContent}>
          <Text style={ss.modalTitle}>DOI → APA 7</Text>
          <TextInput style={ss.modalInput} placeholder="Paste DOI here (e.g. 10.1001/...)" placeholderTextColor={Colors.muted} value={doiInput} onChangeText={setDoiInput} autoFocus />
          <View style={ss.modalButtons}>
            <TouchableOpacity style={ss.modalCancel} onPress={() => setDoiModal(false)}><Text style={ss.modalCancelText}>Cancel</Text></TouchableOpacity>
            <TouchableOpacity style={ss.modalSubmit} onPress={() => { Alert.alert('DOI Lookup', `Will format DOI: ${doiInput}\n\nAPI integration coming soon`); setDoiModal(false); setDoiInput(''); }}><Text style={ss.modalSubmitText}>Format</Text></TouchableOpacity>
          </View>
        </View></View>
      </Modal>
    </View>
  );
}

const ss = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.surface },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: 60, paddingBottom: 120 },
  header: { marginBottom: Spacing['2xl'] },
  headerTitle: { fontSize: FontSize.headlineLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5 },
  headerSub: { fontSize: FontSize.bodyMd, color: Colors.teal, fontWeight: '600', marginBottom: Spacing.sm },
  badge: { borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 12, alignSelf: 'flex-start' },
  badgeText: { fontSize: FontSize.labelSm, fontWeight: '700', letterSpacing: 0.3 },
  sectionTitle: { fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.md, marginTop: Spacing.xl },
  phaseStepper: { marginBottom: Spacing.section },
  phaseStepContainer: { alignItems: 'center', width: 72 },
  phaseCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.surfaceContainerHighest, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  phaseCircleText: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.muted },
  phaseStepLabel: { fontSize: 9, fontWeight: '600', color: Colors.muted, textAlign: 'center', letterSpacing: 0.3 },
  phaseConnector: { width: 16, height: 2, backgroundColor: Colors.surfaceContainerHighest, alignSelf: 'center', marginTop: -20 },
  agentBanner: { backgroundColor: Colors.teal + '12', borderRadius: BorderRadius.lg, padding: Spacing.lg, flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.section },
  agentIcon: { fontSize: 28, marginRight: Spacing.md },
  agentTitle: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.teal },
  agentSub: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2 },
  agentTag: { backgroundColor: Colors.teal, borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 8 },
  agentTagText: { fontSize: 9, fontWeight: '800', color: '#0B1628', letterSpacing: 0.5 },
  researchCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.md },
  researchHeader: { flexDirection: 'row', marginBottom: Spacing.sm },
  researchTitle: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, lineHeight: 20 },
  targetJournal: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2, fontStyle: 'italic' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: Spacing.xs },
  tagChip: { backgroundColor: Colors.surfaceContainerHighest, borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 6 },
  tagText: { fontSize: 9, fontWeight: '600', color: Colors.onSurfaceVariant },
  researchMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statusTag: { borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 8 },
  statusTagText: { fontSize: FontSize.labelSm, fontWeight: '700', letterSpacing: 0.3 },
  mayoScoreContainer: { flexDirection: 'row', alignItems: 'baseline' },
  mayoScoreLabel: { fontSize: 9, fontWeight: '600', color: Colors.muted, letterSpacing: 0.8, marginRight: 4 },
  mayoScore: { fontSize: FontSize.titleMd, fontWeight: '800' },
  expandedInfo: { marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.surfaceContainerHighest },
  expandedLabel: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.muted, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: Spacing.sm, marginBottom: 2 },
  expandedText: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 20 },
  tierCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.sm },
  tierHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs },
  tierDot: { width: 8, height: 8, borderRadius: 4, marginRight: Spacing.sm },
  tierName: { fontSize: FontSize.labelMd, fontWeight: '700', letterSpacing: 0.5 },
  journalName: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, paddingLeft: Spacing.xl, lineHeight: 22 },
  pubTracker: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.xl, marginTop: Spacing.xl, marginBottom: Spacing.section, alignItems: 'center' },
  pubTitle: { fontSize: FontSize.titleMd, fontWeight: '700', color: Colors.onSurface, marginBottom: Spacing.md },
  pubRow: { flexDirection: 'row', alignItems: 'baseline' },
  pubValue: { fontSize: FontSize.displaySm, fontWeight: '800', color: Colors.teal },
  pubTotal: { fontSize: FontSize.headlineSm, fontWeight: '300', color: Colors.muted },
  progressTrack: { height: 6, backgroundColor: Colors.surfaceContainerHighest, borderRadius: 3, overflow: 'hidden', width: '100%', marginTop: Spacing.md },
  progressValue: { height: 6, borderRadius: 3, backgroundColor: Colors.teal },
  pubSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, textAlign: 'center' },
  breakdownContainer: { width: '100%', marginTop: Spacing.lg, borderTopWidth: 1, borderTopColor: Colors.surfaceContainerHighest, paddingTop: Spacing.md },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  breakdownJournal: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant },
  breakdownCount: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.teal },
  citationRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.section },
  citationCard: { flex: 1, backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md, alignItems: 'center' },
  citationIcon: { fontSize: 24, marginBottom: 4 },
  citationName: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.onSurface, textAlign: 'center' },
  citationSub: { fontSize: 9, color: Colors.muted, textAlign: 'center', marginTop: 2 },
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
