import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, gridStyle, gridItemStyle, PillTab, useHover } from '../empresa/primitives';
import { GradientHero, MegaStat, RingStat, FadeUp } from '../empresa/visuals';
import {
  USMLE_META, USMLE_KPIS, USMLE_SYSTEMS, USMLE_DISCIPLINES, PALMERTON_WHO, PALMERTON_HONESTY,
  PALMERTON_METHOD, PALMERTON_SYSTEMS, USMLE_RAMP, USMLE_HOUR, USMLE_QBANK_RULES, USMLE_RESOURCES,
  PRIORIDAD_COLOR, VUELTAS,
} from '../../lib/usmleData';
import UsmlePalmertonExplorer from './UsmlePalmertonExplorer';
import UsmleQbanklyExplorer from './UsmleQbanklyExplorer';
import UsmleTodayPlan from './UsmleTodayPlan';

/**
 * UsmleHub — USMLE Step 1 ("Estados Unidos"), IN ENGLISH. Two sub-views:
 * ROI Plan (systems by weight, ramp, Qbank rules) + Palmerton Brain (method +
 * per-system "how to study X"). Render as a View inside EstudioScreen's ScrollView.
 */
const GREEN = USMLE_META.accent;
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

export default function UsmleHub() {
  const [sub, setSub] = useState<'hoy' | 'hy' | 'qbankly' | 'roi' | 'brain'>('hoy');
  return (
    <View>
      {/* HERO */}
      <GradientHero from="#0E2A1F" to="#0A1424" style={{ marginBottom: Spacing.lg, borderColor: GREEN + '33' }}>
        <Text style={st.heroTitle}>🇺🇸 {USMLE_META.title}</Text>
        <Text style={[st.heroSub, { color: GREEN }]}>{USMLE_META.subtitle}</Text>
        <Text style={st.heroTesis}>{USMLE_META.thesis}</Text>
      </GradientHero>

      {/* sub-nav */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.lg }}>
        <PillTab label="Hoy" icon="🗓️" active={sub === 'hoy'} accent={GREEN} onPress={() => setSub('hoy')} />
        <PillTab label="High Yield" icon="🎬" active={sub === 'hy'} accent={GREEN} onPress={() => setSub('hy')} />
        <PillTab label="Qbankly" icon="🅠" active={sub === 'qbankly'} accent={GREEN} onPress={() => setSub('qbankly')} />
        <PillTab label="ROI Plan" icon="🎯" active={sub === 'roi'} accent={GREEN} onPress={() => setSub('roi')} />
        <PillTab label="Palmerton Brain" icon="🧠" active={sub === 'brain'} accent={GREEN} onPress={() => setSub('brain')} />
      </View>

      {sub === 'hoy' ? <UsmleTodayPlan /> : sub === 'hy' ? <UsmlePalmertonExplorer /> : sub === 'qbankly' ? <UsmleQbanklyExplorer /> : sub === 'roi' ? <RoiPlan /> : <PalmertonBrain />}
    </View>
  );
}

function RoiPlan() {
  return (
    <View>
      <MegaStat value={USMLE_KPIS.pathologyPct} label="Pathology = the exam" accent={GREEN} suffix="%"
        footnote="Pathology + Physiology ≈ 75–95% combined · Pathoma is the #1 ROI resource" />

      <View style={st.ringRow}>
        <View style={st.ringCard}><RingStat value={USMLE_KPIS.pathologyPct} label="Pathology" sub="Pathoma" accent={Colors.coral} suffix="%" /></View>
        <View style={st.ringCard}><RingStat value={35} label="Physiology" sub="Ninja Nerd" accent={Colors.blue} suffix="%" /></View>
        <View style={st.ringCard}><RingStat value={USMLE_KPIS.beginnerWeeks} max={16} label="English ramp" sub="weeks" accent={GREEN} /></View>
        <View style={st.ringCard}><RingStat value={USMLE_KPIS.readiness} label="Readiness" sub="from zero" accent={Colors.amber} suffix="%" /></View>
      </View>

      <SectionLabel>Organ systems · order of attack (official weight)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {USMLE_SYSTEMS.map((s, i) => (
          <View key={s.n} style={[st.row, i === 0 && { borderTopWidth: 0 }]}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: PRIORIDAD_COLOR[s.prioridad], marginRight: 8 }} />
            <Text style={st.rowName}>{s.n}. {s.system}</Text>
            <Text style={[st.rowVal, { color: GREEN }]}>{s.weight}</Text>
            <Text style={[st.rowVueltas, { color: PRIORIDAD_COLOR[s.prioridad] }]}>{VUELTAS[s.prioridad]}v</Text>
          </View>
        ))}
      </GlassPanel>

      <SectionLabel>Disciplines · the real truth of the exam</SectionLabel>
      <View style={[gridStyle(220), { marginBottom: Spacing.xl }]}>
        {USMLE_DISCIPLINES.map((d, i) => (
          <View key={i} style={gridItemStyle(220)}>
            <View style={st.discCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={st.discName}>{d.name}</Text>
                <Text style={[st.discWeight, { color: GREEN }]}>{d.weight}</Text>
              </View>
              <Text style={st.discAnchor}>⚓ {d.anchor}</Text>
            </View>
          </View>
        ))}
      </View>

      <SectionLabel>Beginner ramp · English + content (1h/day Mon–Fri)</SectionLabel>
      <View style={[gridStyle(240), { marginBottom: Spacing.xl }]}>
        {USMLE_RAMP.map((p, i) => (
          <View key={i} style={gridItemStyle(240)}>
            <FadeUp delay={i * 60}>
              <View style={[st.phaseCard, { borderLeftColor: GREEN }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={[st.phaseTag, { color: GREEN }]}>{p.phase}</Text>
                  <Chip label={p.hours} color={Colors.muted} small />
                </View>
                <Text style={st.body}>{p.focus}</Text>
              </View>
            </FadeUp>
          </View>
        ))}
      </View>

      <SectionLabel>The hour (English micro-block)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {USMLE_HOUR.map((h, i) => (
          <View key={i} style={[st.hourRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={[st.hourBadge, { backgroundColor: GREEN + '1A' }]}><Text style={[st.hourSlot, { color: GREEN }]}>{h.slot}</Text></View>
            <Text style={st.hourAct}>{h.act}</Text>
          </View>
        ))}
      </GlassPanel>

      <SectionLabel>Qbank rules (Qbankly / UWorld-style)</SectionLabel>
      <GlassPanel accent={Colors.coral} style={{ marginBottom: Spacing.xl }}>
        {USMLE_QBANK_RULES.map((r, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 5 }}>
            <Text style={{ color: Colors.coral }}>•</Text>
            <Text style={[st.body, { flex: 1 }]}>{r}</Text>
          </View>
        ))}
      </GlassPanel>

      <ResourcesBlock />
    </View>
  );
}

function PalmertonBrain() {
  return (
    <View>
      <GlassPanel accent={GREEN} style={{ marginBottom: Spacing.lg, padding: Spacing.lg }}>
        <Text style={st.h3}>🧠 The Palmerton Brain</Text>
        <Text style={st.body}>{PALMERTON_WHO}</Text>
        <Text style={[st.smallNote, { marginTop: Spacing.sm }]}>⚠ {PALMERTON_HONESTY}</Text>
      </GlassPanel>

      <SectionLabel>The method (verified principles)</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {PALMERTON_METHOD.map((m, i) => (
          <FadeUp key={i} delay={i * 35}>
            <View style={st.methodCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={st.methodName}>{m.name}</Text>
                <Chip label={m.verified ? 'VERIFIED' : 'general'} color={m.verified ? Colors.green : Colors.muted} small />
              </View>
              <Text style={[st.body, { marginTop: 4 }]}>{m.desc}</Text>
            </View>
          </FadeUp>
        ))}
      </View>

      <SectionLabel>How do I study… (tap a system)</SectionLabel>
      <Text style={[st.smallNote, { marginBottom: Spacing.md }]}>
        Per-system mini-methods, reconstructed in Palmerton's spirit. (A live voice tutor would need a secure backend; this is the structured knowledge.)
      </Text>
      <View style={{ marginBottom: Spacing.xl }}>
        {PALMERTON_SYSTEMS.map((s, i) => <SystemAccordion key={i} s={s} />)}
      </View>

      <ResourcesBlock />
    </View>
  );
}

function SystemAccordion({ s }: { s: typeof PALMERTON_SYSTEMS[0] }) {
  const [open, setOpen] = useState(false);
  const { hovered, hoverProps } = useHover();
  return (
    <View style={[st.accCard, hovered ? { borderColor: GREEN + '55' } : null]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen(o => !o)} {...hoverProps}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={st.accTitle}>{open ? '▾' : '▸'} {s.system}</Text>
        <Text style={[st.accHint, { color: GREEN }]}>{open ? '' : 'how to study'}</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: Spacing.sm, gap: 8 }}>
          <View><Text style={st.accLbl}>⚓ ANCHOR</Text><Text style={st.body}>{s.anchor}</Text></View>
          <View><Text style={[st.accLbl, { color: GREEN }]}>❓ SAQ STRATEGY</Text><Text style={st.body}>{s.saq}</Text></View>
          <View><Text style={[st.accLbl, { color: Colors.coral }]}>⚠ COMMON TRAP</Text><Text style={st.body}>{s.trap}</Text></View>
        </View>
      )}
    </View>
  );
}

function ResourcesBlock() {
  return (
    <View>
      <SectionLabel>Free resources & links</SectionLabel>
      <View style={[gridStyle(220), { marginBottom: Spacing.xl }]}>
        {USMLE_RESOURCES.map((r, i) => (
          <View key={i} style={gridItemStyle(220)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(r.url)} style={st.resCard}>
              <Text style={[st.resLabel, r.gated && { color: Colors.muted }]} numberOfLines={2}>
                {r.gated ? '🔒 ' : '🔗 '}{r.label} ↗
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder, padding: Spacing.lg };
const st = StyleSheet.create({
  heroTitle: { fontSize: FontSize.headlineSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5 },
  heroSub: { fontSize: FontSize.labelLg, marginTop: 4, fontWeight: '600' },
  heroTesis: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: Spacing.md, lineHeight: 20, maxWidth: 640 },
  h3: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: 6 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 19 },
  smallNote: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 17 },

  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  ringCard: { flex: 1, minWidth: 140, backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: DesktopColors.glassBorder, paddingVertical: Spacing.lg, paddingHorizontal: Spacing.md, alignItems: 'center' },

  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  rowName: { flex: 1, fontSize: FontSize.bodyMd, color: Colors.onSurface },
  rowVal: { fontSize: FontSize.labelLg, fontWeight: '800', width: 70, textAlign: 'right' },
  rowVueltas: { fontSize: 10, fontWeight: '700', width: 30, textAlign: 'right' },

  discCard: { ...cardBase },
  discName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, flex: 1 },
  discWeight: { fontSize: FontSize.labelLg, fontWeight: '800' },
  discAnchor: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 6 },

  phaseCard: { ...cardBase, borderLeftWidth: 3, minHeight: 120 },
  phaseTag: { fontSize: FontSize.labelMd, fontWeight: '800' },

  hourRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', gap: Spacing.sm },
  hourBadge: { borderRadius: BorderRadius.md, paddingVertical: 3, paddingHorizontal: 8, minWidth: 92, alignItems: 'center' },
  hourSlot: { fontSize: FontSize.labelSm, fontWeight: '800' },
  hourAct: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },

  methodCard: { ...cardBase, marginBottom: Spacing.sm },
  methodName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, flex: 1 },

  accCard: { ...cardBase, marginBottom: Spacing.sm, padding: Spacing.md },
  accTitle: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  accHint: { fontSize: FontSize.labelSm, fontWeight: '700' },
  accLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, marginBottom: 2 },

  resCard: { ...cardBase },
  resLabel: { fontSize: FontSize.labelMd, color: GREEN, fontWeight: '600', lineHeight: 16 },
});
