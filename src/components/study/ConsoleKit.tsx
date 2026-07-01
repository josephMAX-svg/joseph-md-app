import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { useHover } from '../empresa/primitives';

/**
 * ConsoleKit — primitivas de la "terminal de banca" MIR+USMLE (identidad propia).
 * Pestañas de consola, tarjeta de checkpoint de readiness y el riel CROSSLINK
 * estilo AMBOSS (vídeo → Qbank → flashcard → Obsidian). Todo presentacional; no
 * inventa URLs (los null los resuelve el llamador con el destino real por diseño).
 */
const isWeb = Platform.OS === 'web';
const WEB_LINK = isWeb ? ({ cursor: 'pointer', transition: Motion.base } as any) : {};
const GOLD = Colors.gold;
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

// ── ConsoleTabs: sub-nav re-estilado como pestañas de terminal ──
export interface ConsoleTab { key: string; label: string; icon?: string; }
export function ConsoleTabs({ tabs, active, accent, onSelect }: {
  tabs: ConsoleTab[]; active: string; accent: string; onSelect: (k: string) => void;
}) {
  return (
    <View style={ck.tabsWrap}>
      {tabs.map((t) => {
        const on = t.key === active;
        return <ConsoleTabBtn key={t.key} tab={t} on={on} accent={accent} onPress={() => onSelect(t.key)} />;
      })}
    </View>
  );
}
function ConsoleTabBtn({ tab, on, accent, onPress }: { tab: ConsoleTab; on: boolean; accent: string; onPress: () => void }) {
  const { hovered, hoverProps } = useHover();
  return (
    <TouchableOpacity
      activeOpacity={0.85} onPress={onPress} {...hoverProps}
      style={[ck.tab, WEB_LINK,
        on ? { backgroundColor: accent + '1C', borderColor: accent + '66', ...Elevation.sm }
           : hovered && isWeb ? ({ borderColor: Hairline.strong } as any) : null]}>
      {on ? <View style={[ck.tabDot, { backgroundColor: accent }]} /> : null}
      {tab.icon ? <Text style={ck.tabIcon}>{tab.icon}</Text> : null}
      <Text style={[ck.tabTxt, on && { color: Colors.onSurface, fontWeight: '800' }]}>{tab.label}</Text>
    </TouchableOpacity>
  );
}

// ── CheckpointCard: "próxima autoevaluación" de readiness (el gancho de estatus) ──
export interface CheckpointRow {
  form: string; kind: string; when: string; predictor: string; band: string; url: string; gated: boolean;
}
export function CheckpointCard({ title, subtitle, rows, accent, ctaOpen }: {
  title: string; subtitle: string; rows: CheckpointRow[]; accent: string; ctaOpen?: string;
}) {
  return (
    <View style={[ck.chkCard, { borderColor: GOLD + '3A' }]}>
      <View style={ck.chkHead}>
        <Text style={ck.chkTitle}>◈ {title}</Text>
        <View style={[ck.chkPill, { backgroundColor: GOLD + '1A', borderColor: GOLD + '55' }]}>
          <Text style={ck.chkPillTxt}>READINESS</Text>
        </View>
      </View>
      <Text style={ck.chkSub}>{subtitle}</Text>
      {rows.map((r, i) => (
        <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => openUrl(r.url)} style={[ck.chkRow, WEB_LINK]}>
          <View style={[ck.chkKind, { borderColor: accent + '55', backgroundColor: accent + '14' }]}>
            <Text style={[ck.chkKindTxt, { color: accent }]}>{r.kind}</Text>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={ck.chkForm} numberOfLines={1}>{r.gated ? '🔒 ' : ''}{r.form} <Text style={{ color: accent }}>↗</Text></Text>
            <Text style={ck.chkPred} numberOfLines={2}>{r.predictor}</Text>
            <View style={ck.chkMeta}>
              <Text style={ck.chkWhen}>{r.when}</Text>
              <View style={[ck.bandChip, { backgroundColor: GOLD + '18', borderColor: GOLD + '3A' }]}>
                <Text style={ck.bandTxt}>{r.band}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      {ctaOpen ? (
        <Text style={ck.chkNote}>El readiness sube solo cuando registras un checkpoint real. Sin autoevaluación, la banca no da número serio.</Text>
      ) : null}
    </View>
  );
}

// ── CrosslinkRail: el "grafo AMBOSS" — 4 recursos del MISMO concepto ──
export interface CrosslinkNode { icon: string; kind: string; label: string; url: string | null; accent: string; note?: string; }
export function CrosslinkRail({ nodes, fallbackUrl }: { nodes: CrosslinkNode[]; fallbackUrl: string }) {
  return (
    <View style={ck.railWrap}>
      <Text style={ck.railLbl}>⇄ CROSSLINK · el mismo concepto en 4 capas (nada aislado)</Text>
      <View style={ck.railRow}>
        {nodes.map((n, i) => (
          <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => openUrl(n.url || fallbackUrl)}
            style={[ck.node, { borderColor: n.accent + '44', backgroundColor: n.accent + '10' }, WEB_LINK]}>
            <Text style={ck.nodeIcon}>{n.icon}</Text>
            <Text style={[ck.nodeKind, { color: n.accent }]}>{n.kind}</Text>
            <Text style={ck.nodeLabel} numberOfLines={2}>{n.label}</Text>
            {n.note ? <Text style={ck.nodeNote} numberOfLines={1}>{n.note}</Text> : null}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, ...Elevation.sm };
const ck = StyleSheet.create({
  tabsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft,
    backgroundColor: 'rgba(6,10,20,0.5)', padding: 5 },
  tab: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 7, paddingHorizontal: 12,
    borderRadius: BorderRadius.md, borderWidth: 1, borderColor: 'transparent' },
  tabDot: { width: 6, height: 6, borderRadius: 3 },
  tabIcon: { fontSize: 13 },
  tabTxt: { fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.muted, letterSpacing: 0.2 },

  chkCard: { ...cardBase, borderRadius: BorderRadius.xl, padding: Spacing.lg, marginBottom: Spacing.xl },
  chkHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  chkTitle: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.3 },
  chkPill: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 2, paddingHorizontal: 9 },
  chkPillTxt: { fontSize: 9, fontWeight: '800', color: GOLD, letterSpacing: 1 },
  chkSub: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17, marginBottom: Spacing.md },
  chkRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', paddingVertical: 9, borderTopWidth: 1, borderTopColor: Hairline.soft },
  chkKind: { borderRadius: BorderRadius.md, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 8, minWidth: 66, alignItems: 'center' },
  chkKindTxt: { fontSize: 9, fontWeight: '800', letterSpacing: 0.4 },
  chkForm: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  chkPred: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 3, lineHeight: 15 },
  chkMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 5, flexWrap: 'wrap' },
  chkWhen: { fontSize: 9, color: Colors.muted, letterSpacing: 0.2 },
  bandChip: { borderRadius: BorderRadius.sm, borderWidth: 1, paddingVertical: 2, paddingHorizontal: 7 },
  bandTxt: { fontSize: 9, fontWeight: '800', color: Colors.champagne, letterSpacing: 0.2 },
  chkNote: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: 15 },

  railWrap: { marginTop: Spacing.sm, marginBottom: Spacing.xs },
  railLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 7 },
  railRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  node: { flexGrow: 1, flexBasis: 120, minWidth: 110, borderRadius: BorderRadius.md, borderWidth: 1, padding: Spacing.sm },
  nodeIcon: { fontSize: 15 },
  nodeKind: { fontSize: 8, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 4 },
  nodeLabel: { fontSize: FontSize.labelSm, color: Colors.onSurface, fontWeight: '600', marginTop: 2, lineHeight: 14 },
  nodeNote: { fontSize: 8, color: Colors.muted, marginTop: 2 },
});
