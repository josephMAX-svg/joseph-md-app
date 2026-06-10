import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, gridStyle, gridItemStyle, useHover } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  AGENT_LAYERS, AGENT_ROLES, HITL_CHECKPOINTS, AGENTIC_RESOURCES, AGENTIC_META,
  RESEARCH_LINES, CLUSTER_COLOR, AgentRole,
} from '../../lib/researchProgram';

/**
 * ResearchAgenticSystem — "el corazón": orchestrator-worker + HITL para redactar revisiones
 * sistemáticas. Arquitectura por capas, tarjetas de agente expandibles (prompt base real),
 * checkpoints humanos, capa 0 de descubrimiento, y selector de línea que conecta el sistema a
 * la SR viva. Cada link abre un recurso REAL verificado.
 */
const TEAL = '#0FD4A0';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

function AgentCard({ a }: { a: AgentRole }) {
  const [open, setOpen] = useState(false);
  const { hovered, hoverProps } = useHover();
  return (
    <View style={[st.agentCard, { borderColor: a.color + (open ? '88' : '33') }, hovered ? { borderColor: a.color + '99' } : null]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)} {...hoverProps}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 18 }}>{a.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={st.agentName}>{a.nombre}</Text>
            <Text style={st.agentMeta}>{a.capa} · {a.model}</Text>
          </View>
          <Text style={[st.agentToggle, { color: a.color }]}>{open ? 'ocultar prompt ▾' : 'ver prompt ▸'}</Text>
        </View>
        <Text style={st.agentRol}>{a.rol}</Text>
      </TouchableOpacity>
      {open && (
        <View style={[st.promptBox, { borderColor: a.color + '40' }]}>
          <Text style={st.promptLbl}>PROMPT BASE (inglés)</Text>
          <Text style={st.promptTxt}>{a.prompt}</Text>
        </View>
      )}
    </View>
  );
}

export default function ResearchAgenticSystem() {
  const srLines = RESEARCH_LINES.filter((l) => l.srTag);
  const [selLine, setSelLine] = useState<number>(4); // L4 / SR-1 por defecto
  const linea = RESEARCH_LINES.find((l) => l.id === selLine) || RESEARCH_LINES[4];

  return (
    <View>
      {/* Tesis */}
      <GlassPanel accent={TEAL} style={{ marginBottom: Spacing.lg, padding: Spacing.lg }}>
        <Text style={st.h3}>🧬 Sistema agéntico de revisiones sistemáticas</Text>
        <Text style={st.body}>{AGENTIC_META.tesis}</Text>
        <Text style={[st.smallNote, { marginTop: Spacing.sm }]}>⏱ {AGENTIC_META.cuandoEntra}</Text>
      </GlassPanel>

      {/* Selector de línea → SR viva */}
      <SectionLabel>Dirige una línea · el sistema escribe su SR</SectionLabel>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: Spacing.sm }}>
        {srLines.map((l) => (
          <TouchableOpacity key={l.id} activeOpacity={0.85} onPress={() => setSelLine(l.id)}
            style={[st.lineChip, selLine === l.id ? { backgroundColor: CLUSTER_COLOR[l.cluster] + '22', borderColor: CLUSTER_COLOR[l.cluster] + '99' } : null]}>
            <Text style={[st.lineChipTxt, selLine === l.id && { color: Colors.onSurface }]}>{l.code} · {l.srTag}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <GlassPanel style={{ marginBottom: Spacing.xl, borderLeftWidth: 3, borderLeftColor: CLUSTER_COLOR[linea.cluster] }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
          <Text style={st.lineTitle}>{linea.code} · {linea.nombre}</Text>
          <Chip label={`Mayo ${linea.mayoScore}/40`} color={CLUSTER_COLOR[linea.cluster]} small />
        </View>
        <Text style={[st.body, { marginTop: 6 }]}>📋 SR viva: {linea.srDerivable}</Text>
        <View style={{ flexDirection: 'row', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(linea.pubmedUrl)} style={[st.miniBtn, { borderColor: CLUSTER_COLOR[linea.cluster] + '88' }]}>
            <Text style={[st.miniBtnTxt, { color: CLUSTER_COLOR[linea.cluster] }]}>🔎 Semilla en PubMed ↗</Text>
          </TouchableOpacity>
          {linea.fichaUrl && (
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(linea.fichaUrl!)} style={[st.miniBtn, { borderColor: CLUSTER_COLOR[linea.cluster] + '88' }]}>
              <Text style={[st.miniBtnTxt, { color: CLUSTER_COLOR[linea.cluster] }]}>📄 Paper ancla ↗</Text>
            </TouchableOpacity>
          )}
        </View>
      </GlassPanel>

      {/* Arquitectura por capas (flujo) */}
      <SectionLabel>Arquitectura · orchestrator-worker + HITL</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {AGENT_LAYERS.map((cap, i) => (
          <FadeUp key={cap.capa} delay={i * 50}>
            <View>
              <View style={[st.layerCard, { borderLeftColor: cap.color }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ fontSize: 20 }}>{cap.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={[st.layerCapa, { color: cap.color }]}>{cap.capa}</Text>
                      <Text style={st.layerTitle}>{cap.titulo}</Text>
                    </View>
                    <Text style={st.layerDesc}>{cap.desc}</Text>
                  </View>
                </View>
              </View>
              {i < AGENT_LAYERS.length - 1 && <Text style={st.arrow}>↓</Text>}
            </View>
          </FadeUp>
        ))}
      </View>

      {/* Agentes (prompts base) */}
      <SectionLabel>Agentes · toca para ver su prompt base</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {AGENT_ROLES.map((a, i) => <FadeUp key={a.id} delay={i * 40}><AgentCard a={a} /></FadeUp>)}
      </View>

      {/* Checkpoints HITL */}
      <SectionLabel>Checkpoints humanos (HITL) · imposibles de saltar</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {HITL_CHECKPOINTS.map((c, i) => (
          <View key={c.id} style={[st.cpRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={[st.cpBadge, { backgroundColor: Colors.amber + '1A' }]}><Text style={[st.cpId, { color: Colors.amber }]}>{c.id}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={st.cpDespues}>tras {c.despues}</Text>
              <Text style={st.cpVerifica}>{c.verifica}</Text>
            </View>
          </View>
        ))}
        <Text style={st.smallNote}>Gate duro en CP-3: el ensamblado no corre mientras exista una sola cita [NO VERIFICABLE] sin resolver.</Text>
      </GlassPanel>

      {/* Recursos verificados */}
      <SectionLabel>Fuentes verificadas</SectionLabel>
      <View style={[gridStyle(240), { marginBottom: Spacing.xl }]}>
        {AGENTIC_RESOURCES.map((r, i) => (
          <View key={i} style={gridItemStyle(240)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(r.url)} style={st.resCard}>
              <Text style={st.resTxt} numberOfLines={2}>🔗 {r.label} ↗</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder };
const st = StyleSheet.create({
  h3: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: 6 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 19 },
  smallNote: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 17 },

  lineChip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.03)' },
  lineChipTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted },
  lineTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flexShrink: 1 },
  miniBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 11 },
  miniBtnTxt: { fontSize: FontSize.labelSm, fontWeight: '800' },

  layerCard: { ...cardBase, borderLeftWidth: 3, padding: Spacing.md },
  layerCapa: { fontSize: FontSize.labelMd, fontWeight: '900', letterSpacing: 0.3 },
  layerTitle: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, flexShrink: 1 },
  layerDesc: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 17 },
  arrow: { textAlign: 'center', color: Colors.muted, fontSize: 16, marginVertical: 2 },

  agentCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: 6 },
  agentName: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface },
  agentMeta: { fontSize: 9, color: Colors.muted, marginTop: 1, letterSpacing: 0.3 },
  agentToggle: { fontSize: FontSize.labelSm, fontWeight: '800' },
  agentRol: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 6, lineHeight: 16 },
  promptBox: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.sm, marginTop: 8, backgroundColor: 'rgba(255,255,255,0.02)' },
  promptLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, marginBottom: 4 },
  promptTxt: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, lineHeight: 16, fontStyle: 'italic' },

  cpRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  cpBadge: { borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 9, minWidth: 50, alignItems: 'center' },
  cpId: { fontSize: FontSize.labelMd, fontWeight: '900' },
  cpDespues: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '700' },
  cpVerifica: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 15 },

  resCard: { ...cardBase, padding: Spacing.md },
  resTxt: { fontSize: FontSize.labelMd, color: TEAL, fontWeight: '600', lineHeight: 16 },
});
