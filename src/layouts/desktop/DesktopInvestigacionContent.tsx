import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { desktopStyles } from '../../theme/desktopStyles';

const PHASES = ['Ideation', 'Protocol', 'Data Collection', 'Analysis', 'Manuscript', 'Submission'];

const RL = [
  { title: 'Facial Topography & Vascularization', status: 'PLANNING', sc: Colors.amber, mayo: 33, phase: 0, tags: ['Anatomy', 'Vascular'], target: 'Dermatologic Surgery', bottleneck: 'Need cadaver lab access' },
  { title: 'Structural Facial Analysis & Aging', status: 'PLANNING', sc: Colors.amber, mayo: 33, phase: 0, tags: ['Facial Analysis'], target: 'J Cosmetic Dermatology', bottleneck: 'Image dataset collection' },
  { title: 'Injectables & Rheology', status: 'PLANNING', sc: Colors.amber, mayo: 34, phase: 0, tags: ['Fillers', 'Rheology'], target: 'Aesthetic Surgery Journal', bottleneck: 'Lab equipment access' },
  { title: 'Vascular Complications (PERU-SAFE)', status: 'PLANNING', sc: Colors.amber, mayo: 38, phase: 0, tags: ['Safety', 'Peru'], target: 'JAAD International', bottleneck: 'IRB approval pending' },
  { title: 'Energy-Based Devices', status: 'PLANNING', sc: Colors.amber, mayo: 34, phase: 0, tags: ['Laser', 'EBD'], target: 'Lasers in Medical Science', bottleneck: 'Patient recruitment' },
  { title: 'Acne & Quality of Life (PERU-ACNE)', status: 'WRITING', sc: Colors.teal, mayo: 35, phase: 4, tags: ['Acne', 'QoL', 'Thesis'], target: 'JAAD International', bottleneck: 'Manuscript revision' },
  { title: 'Botulinum Toxin Dosing', status: 'PLANNING', sc: Colors.amber, mayo: 34, phase: 0, tags: ['Botox'], target: 'Dermatologic Surgery', bottleneck: 'Protocol design' },
  { title: 'Teledermatology & AI (PERU-SKIN)', status: 'PLANNING', sc: Colors.amber, mayo: 39, phase: 0, tags: ['AI', 'Telehealth'], target: 'JAMA Dermatology', bottleneck: 'Model training data' },
];

type KanbanColumn = 'PLANNING' | 'WRITING' | 'REVIEW' | 'PUBLISHED';

const KANBAN_COLUMNS: { key: KanbanColumn; label: string; color: string }[] = [
  { key: 'PLANNING', label: 'PLANNING', color: Colors.amber },
  { key: 'WRITING', label: 'WRITING', color: Colors.teal },
  { key: 'REVIEW', label: 'REVIEW', color: Colors.blue },
  { key: 'PUBLISHED', label: 'PUBLISHED', color: Colors.green },
];

function getKanbanColumn(status: string): KanbanColumn {
  switch (status) {
    case 'WRITING': return 'WRITING';
    case 'REVIEW': return 'REVIEW';
    case 'PUBLISHED': return 'PUBLISHED';
    default: return 'PLANNING';
  }
}

/**
 * Desktop Research Content — Kanban-style 4-column layout for research lines.
 */
export default function DesktopInvestigacionContent() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Group research lines by kanban column
  const columnData: Record<KanbanColumn, typeof RL> = {
    PLANNING: [],
    WRITING: [],
    REVIEW: [],
    PUBLISHED: [],
  };

  RL.forEach((line) => {
    const col = getKanbanColumn(line.status);
    columnData[col].push(line);
  });

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.surface }}
      contentContainerStyle={desktopStyles.centerScrollContent}
    >
      {/* Header */}
      <View style={{ marginBottom: Spacing['2xl'] }}>
        <Text style={{ fontSize: FontSize.headlineLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5 }}>
          Research Pipeline
        </Text>
        <Text style={{ fontSize: FontSize.bodyMd, color: Colors.teal, fontWeight: '600', marginTop: 2 }}>
          Mayo Clinic 2035
        </Text>
        <View style={{
          backgroundColor: Colors.teal + '20',
          borderRadius: 999,
          paddingVertical: 4,
          paddingHorizontal: 12,
          alignSelf: 'flex-start',
          marginTop: Spacing.sm,
        }}>
          <Text style={{ fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.teal }}>
            8 ACTIVE LINES
          </Text>
        </View>
      </View>

      {/* Multi-Agent Banner */}
      <View style={{
        backgroundColor: Colors.teal + '12',
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.section,
      }}>
        <Text style={{ fontSize: 28, marginRight: Spacing.md }}>🤖</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.teal }}>
            Multi-Agent Systematic Review Engine
          </Text>
          <Text style={{ fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2 }}>
            Automated literature search, screening & extraction
          </Text>
        </View>
        <View style={{ backgroundColor: Colors.teal, borderRadius: 999, paddingVertical: 2, paddingHorizontal: 8 }}>
          <Text style={{ fontSize: 9, fontWeight: '800', color: '#0B1628', letterSpacing: 0.5 }}>BETA</Text>
        </View>
      </View>

      {/* Kanban Board */}
      <Text style={{ fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: Spacing.md }}>
        RESEARCH KANBAN
      </Text>
      <View style={desktopStyles.kanbanContainer}>
        {KANBAN_COLUMNS.map((col) => (
          <View key={col.key} style={desktopStyles.kanbanColumn}>
            <Text style={[desktopStyles.kanbanColumnTitle, { color: col.color }]}>
              {col.label} ({columnData[col.key].length})
            </Text>
            {columnData[col.key].length === 0 ? (
              <View style={{ padding: Spacing.md, alignItems: 'center' }}>
                <Text style={{ fontSize: FontSize.labelSm, color: Colors.muted, fontStyle: 'italic' }}>
                  No items
                </Text>
              </View>
            ) : (
              columnData[col.key].map((line, i) => {
                const globalIdx = RL.indexOf(line);
                const isExp = expandedCard === globalIdx;
                return (
                  <TouchableOpacity
                    key={globalIdx}
                    style={desktopStyles.kanbanCard}
                    onPress={() => setExpandedCard(isExp ? null : globalIdx)}
                    activeOpacity={0.7}
                  >
                    <Text style={desktopStyles.kanbanCardTitle}>{line.title}</Text>
                    <Text style={desktopStyles.kanbanCardMeta}>
                      {line.target}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ fontSize: 9, fontWeight: '600', color: Colors.muted, letterSpacing: 0.8, marginRight: 4 }}>MAYO</Text>
                        <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '800', color: line.mayo >= 38 ? Colors.teal : Colors.amber }}>
                          {line.mayo}
                        </Text>
                      </View>
                      {/* Tags */}
                      <View style={{ flexDirection: 'row', gap: 3 }}>
                        {line.tags.slice(0, 2).map((t, j) => (
                          <View key={j} style={{ backgroundColor: Colors.surfaceContainerHighest, borderRadius: 999, paddingVertical: 1, paddingHorizontal: 4 }}>
                            <Text style={{ fontSize: 8, fontWeight: '600', color: Colors.onSurfaceVariant }}>{t}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                    <Text style={desktopStyles.kanbanCardBottleneck}>
                      ⚠ {line.bottleneck}
                    </Text>
                    {isExp && (
                      <View style={{ marginTop: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.surfaceContainerHighest }}>
                        <Text style={{ fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant }}>
                          Status: {line.status}
                        </Text>
                        <Text style={{ fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2 }}>
                          Phase: {PHASES[line.phase]}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
