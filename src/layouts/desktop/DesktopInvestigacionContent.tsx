import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { desktopStyles, DesktopColors } from '../../theme/desktopStyles';
import GlassCard from '../../components/GlassCard';

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

// FIX 7: Mayo score priority dot
function getMayoDot(mayo: number): { color: string; label: string } {
  if (mayo >= 35) return { color: Colors.green, label: 'HIGH PRIORITY' };
  if (mayo >= 30) return { color: '#FACC15', label: '' };
  return { color: Colors.muted, label: '' };
}

function KanbanCardItem({
  line,
  isExpanded,
  onToggle,
  columnKey,
}: {
  line: typeof RL[0];
  isExpanded: boolean;
  onToggle: () => void;
  columnKey: KanbanColumn;
}) {
  const [hovered, setHovered] = useState(false);
  const mayoDot = getMayoDot(line.mayo);

  const webHover = Platform.OS === 'web'
    ? { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }
    : {};

  const webStyle = Platform.OS === 'web'
    ? {
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        ...(hovered ? {
          borderColor: 'rgba(255,255,255,0.15)',
          transform: [{ translateY: -1 }],
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        } : {}),
      }
    : {};

  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View
        style={[desktopStyles.kanbanCard, webStyle as any]}
        {...webHover}
      >
        {/* Priority dot + Title */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
          <View style={{
            width: 8, height: 8, borderRadius: 4,
            backgroundColor: mayoDot.color,
            marginRight: 8, marginTop: 5,
          }} />
          <Text style={[desktopStyles.kanbanCardTitle, { flex: 1 }]}>{line.title}</Text>
        </View>

        {/* High Priority badge */}
        {mayoDot.label && (
          <View style={{
            backgroundColor: Colors.green + '20',
            borderRadius: 999,
            paddingVertical: 1,
            paddingHorizontal: 6,
            alignSelf: 'flex-start',
            marginBottom: 4,
            marginLeft: 16,
          }}>
            <Text style={{ fontSize: 8, fontWeight: '800', color: Colors.green, letterSpacing: 0.5 }}>
              {mayoDot.label}
            </Text>
          </View>
        )}

        {/* Target journal */}
        <Text style={[desktopStyles.kanbanCardMeta, { marginLeft: 16 }]}>
          📎 {line.target}
        </Text>

        {/* Mayo score badge + tags */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginLeft: 16 }}>
          <View style={{
            backgroundColor: line.mayo >= 35 ? Colors.teal + '20' : Colors.amber + '20',
            borderRadius: 6,
            paddingVertical: 2,
            paddingHorizontal: 6,
          }}>
            <Text style={{
              fontSize: 10, fontWeight: '800',
              color: line.mayo >= 35 ? Colors.teal : Colors.amber,
              letterSpacing: 0.5,
            }}>
              MAYO {line.mayo}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 3 }}>
            {line.tags.slice(0, 2).map((t, j) => (
              <View key={j} style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 999, paddingVertical: 1, paddingHorizontal: 5 }}>
                <Text style={{ fontSize: 8, fontWeight: '600', color: Colors.onSurfaceVariant }}>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bottleneck */}
        <Text style={[desktopStyles.kanbanCardBottleneck, { marginLeft: 16 }]}>
          ⚠ {line.bottleneck}
        </Text>

        {/* Expanded details */}
        {(isExpanded || hovered) && (
          <View style={{ marginTop: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', marginLeft: 16 }}>
            <Text style={{ fontSize: 10, color: Colors.onSurfaceVariant }}>
              Phase: {PHASES[line.phase]}
            </Text>
            <Text style={{ fontSize: 10, color: Colors.onSurfaceVariant, marginTop: 2 }}>
              Status: {line.status}
            </Text>
            {line.tags.length > 2 && (
              <Text style={{ fontSize: 10, color: Colors.muted, marginTop: 2 }}>
                Tags: {line.tags.join(', ')}
              </Text>
            )}
          </View>
        )}

        {/* Published column: celebration */}
        {columnKey === 'PUBLISHED' && (
          <View style={{ marginTop: 6, marginLeft: 16 }}>
            <Text style={{ fontSize: 11, color: Colors.green, fontWeight: '600' }}>
              🎉 Published in {line.target}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

/**
 * Desktop Research Content — Premium Kanban v2.0
 * Colored column badges, Mayo priority dots, hover expansion, glassmorphism.
 */
export default function DesktopInvestigacionContent() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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
        <Text style={desktopStyles.pageTitle}>Research Pipeline</Text>
        <Text style={[desktopStyles.bodyText, { color: Colors.teal, fontWeight: '600', marginTop: 4 }]}>
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
          <Text style={{ fontSize: 11, fontWeight: '700', color: Colors.teal }}>
            8 ACTIVE LINES
          </Text>
        </View>
      </View>

      {/* Multi-Agent Banner */}
      <GlassCard style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.section, backgroundColor: Colors.teal + '08' } as any}>
        <Text style={{ fontSize: 28, marginRight: Spacing.md }}>🤖</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.teal }}>
            Multi-Agent Systematic Review Engine
          </Text>
          <Text style={{ fontSize: 11, color: Colors.onSurfaceVariant, marginTop: 2 }}>
            Automated literature search, screening & extraction
          </Text>
        </View>
        <View style={{ backgroundColor: Colors.teal, borderRadius: 999, paddingVertical: 2, paddingHorizontal: 8 }}>
          <Text style={{ fontSize: 9, fontWeight: '800', color: '#0B1628', letterSpacing: 0.5 }}>BETA</Text>
        </View>
      </GlassCard>

      {/* Kanban Board */}
      <Text style={desktopStyles.sectionHeader}>RESEARCH KANBAN</Text>
      <View style={desktopStyles.kanbanContainer}>
        {KANBAN_COLUMNS.map((col) => (
          <View key={col.key} style={desktopStyles.kanbanColumn}>
            {/* Colored Badge Header */}
            <View style={desktopStyles.kanbanColumnHeader}>
              <View style={[desktopStyles.kanbanColumnBadge, { backgroundColor: col.color + '20' }]}>
                <Text style={[desktopStyles.kanbanColumnBadgeText, { color: col.color }]}>
                  {col.label}
                </Text>
              </View>
              <Text style={desktopStyles.kanbanColumnCount}>
                {columnData[col.key].length}
              </Text>
            </View>

            {columnData[col.key].length === 0 ? (
              <View style={{ padding: Spacing.lg, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, marginBottom: 4 }}>
                  {col.key === 'PUBLISHED' ? '🎯' : '📋'}
                </Text>
                <Text style={{ fontSize: 11, color: Colors.muted, fontStyle: 'italic', textAlign: 'center' }}>
                  {col.key === 'PUBLISHED'
                    ? 'Your first paper starts here'
                    : 'No items yet'
                  }
                </Text>
              </View>
            ) : (
              columnData[col.key].map((line) => {
                const globalIdx = RL.indexOf(line);
                const isExp = expandedCard === globalIdx;
                return (
                  <KanbanCardItem
                    key={globalIdx}
                    line={line}
                    isExpanded={isExp}
                    onToggle={() => setExpandedCard(isExp ? null : globalIdx)}
                    columnKey={col.key}
                  />
                );
              })
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
