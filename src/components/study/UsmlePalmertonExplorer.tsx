import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  USMLE_META, USMLE_TOT, USMLE_SYSTEMS, TIER_INFO, UsmleSystem,
  PALMERTON_METHOD, sistemasPorRentabilidad, systemMinutes, fmtMin, yt, QBANKLY,
} from '../../lib/usmlePalmertonData';

/**
 * UsmlePalmertonExplorer — la biblioteca High-Yield REAL de Alec Palmerton (Yousmle)
 * por sistema USMLE, ordenada por rentabilidad. Cada sistema despliega sus vídeos
 * reales (deep-link a YouTube + duración real) + el foco de práctica en Qbankly.
 * Mismo patrón que el explorador de ProMIR.
 */
const GREEN = '#3FB984';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

function SystemCard({ s, index }: { s: UsmleSystem; index: number }) {
  const [open, setOpen] = useState(false);
  const tier = TIER_INFO[s.tier];
  const mins = systemMinutes(s);
  return (
    <FadeUp delay={Math.min(index * 26, 360)}>
      <View style={[st.card, { borderLeftColor: tier.color }]}>
        <TouchableOpacity activeOpacity={0.82} onPress={() => setOpen((o) => !o)} style={st.head}>
          <View style={[st.tierBadge, { backgroundColor: tier.color + '1F', borderColor: tier.color + '55' }]}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: tier.color }} />
            <Text style={[st.tierTxt, { color: tier.color }]}>{s.tier}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={st.name} numberOfLines={1}>{s.sistema}</Text>
            <View style={st.metaRow}>
              <Text style={st.metaSub}>{s.videos.length} vídeo{s.videos.length > 1 ? 's' : ''} · {fmtMin(mins)}</Text>
              <View style={st.stepFlag}><Text style={st.stepFlagTxt}>{s.step}</Text></View>
            </View>
          </View>
          <Text style={[st.caret, open && { color: GREEN }]}>{open ? '▾' : '▸'}</Text>
        </TouchableOpacity>

        {open && (
          <View style={st.expand}>
            {s.videos.map((v) => (
              <TouchableOpacity key={v.id} activeOpacity={0.85} onPress={() => openUrl(yt(v.id))} style={st.vidRow}>
                <Text style={st.play}>▶</Text>
                <Text style={st.vidTxt} numberOfLines={2}>{v.titulo} <Text style={{ color: GREEN }}>↗</Text></Text>
                <Chip label={fmtMin(v.min)} color={v.min ? Colors.muted : Colors.smallLabel} small />
              </TouchableOpacity>
            ))}
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QBANKLY)} style={st.qbankRow}>
              <Text style={st.qbankLbl}>🎯 Práctica Qbankly</Text>
              <Text style={st.qbankFoco} numberOfLines={2}>{s.qbankFoco}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </FadeUp>
  );
}

export default function UsmlePalmertonExplorer() {
  const ordered = sistemasPorRentabilidad();
  return (
    <View>
      <GlassPanel accent={GREEN} style={{ marginBottom: Spacing.md, padding: Spacing.lg }}>
        <Text style={st.intro}>
          <Text style={{ color: GREEN, fontWeight: '800' }}>Biblioteca High-Yield REAL de Palmerton.</Text>
          {' '}{USMLE_SYSTEMS.length} sistemas · serie "High Yield [System]" de{' '}
          <Text style={{ color: Colors.onSurface }}>Alec Palmerton, MD</Text> (Yousmle) con duración real.
          Núcleo Step 1 ≈ <Text style={{ color: GREEN, fontWeight: '700' }}>{fmtMin(USMLE_TOT.coreMin)}</Text> de vídeo.
          Práctica en Qbankly por sistema. Todo en inglés/USMLE.
        </Text>
        <View style={st.legend}>
          {(['CORE', 'HIGH', 'MED'] as const).map((t) => (
            <View key={t} style={st.legendItem}>
              <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: TIER_INFO[t].color }} />
              <Text style={st.legendTxt}>{TIER_INFO[t].label}</Text>
            </View>
          ))}
        </View>
        <Text style={st.note}>{USMLE_META.nota}</Text>
      </GlassPanel>

      <View style={{ marginBottom: Spacing.xl }}>
        {ordered.map((s, i) => <SystemCard key={s.sistema} s={s} index={i} />)}
      </View>

      {/* MÉTODO Palmerton — vídeos reales */}
      <SectionLabel>El método Palmerton · vídeos núcleo (reales)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.md, padding: Spacing.lg }}>
        <Text style={st.body}>{PALMERTON_METHOD.tesis}</Text>
      </GlassPanel>
      <View style={{ marginBottom: Spacing.xl }}>
        {PALMERTON_METHOD.videos.map((v) => (
          <TouchableOpacity key={v.id} activeOpacity={0.85} onPress={() => openUrl(yt(v.id))} style={st.methodRow}>
            <Text style={st.play}>▶</Text>
            <Text style={st.vidTxt} numberOfLines={2}>{v.titulo} <Text style={{ color: GREEN }}>↗</Text></Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder };
const st = StyleSheet.create({
  intro: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 19 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 19 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginTop: Spacing.md },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendTxt: { fontSize: 10, color: Colors.onSurfaceVariant, fontWeight: '700' },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: 15 },

  card: { ...cardBase, borderLeftWidth: 3, marginBottom: Spacing.sm, overflow: 'hidden' },
  head: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, padding: Spacing.md },
  tierBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 9, minWidth: 64, justifyContent: 'center' },
  tierTxt: { fontSize: 9, fontWeight: '800' },
  name: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2, flexWrap: 'wrap' },
  metaSub: { fontSize: FontSize.labelSm, color: Colors.muted },
  stepFlag: { backgroundColor: GREEN + '1A', borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 6 },
  stepFlagTxt: { fontSize: 9, fontWeight: '800', color: GREEN },
  caret: { fontSize: 16, color: Colors.muted, width: 18, textAlign: 'center' },

  expand: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: Spacing.sm },
  vidRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 7, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.04)' },
  play: { color: GREEN, fontSize: 11, width: 14, textAlign: 'center' },
  vidTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
  qbankRow: { marginTop: 8, padding: Spacing.sm, borderRadius: BorderRadius.md, backgroundColor: 'rgba(229,72,77,0.06)', borderWidth: 1, borderColor: 'rgba(229,72,77,0.25)' },
  qbankLbl: { fontSize: FontSize.labelMd, fontWeight: '800', color: '#E5484D' },
  qbankFoco: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 15 },

  methodRow: { ...cardBase, flexDirection: 'row', alignItems: 'center', gap: 8, padding: Spacing.md, marginBottom: 6 },
});
