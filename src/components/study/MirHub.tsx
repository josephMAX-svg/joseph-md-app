import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, gridStyle, gridItemStyle } from '../empresa/primitives';
import { GradientHero, MegaStat, RingStat, FadeUp } from '../empresa/visuals';
import {
  MIR_META, MIR_KPIS, MIR_ASIGNATURAS, MIR_TIERS, PROMIR_FASES, MIR_HORA, MIR_CALENDARIO,
  MIR_TACTICA, MIR_RECURSOS, MIR_NOTA, PRIORIDAD_COLOR, VUELTAS,
} from '../../lib/mirData';

/**
 * MirHub — MIR España (ProMIR). Asignaturas por ROI tier + fases ProMIR + protocolo +
 * táctica de examen. Render como View dentro del ScrollView de EstudioScreen.
 */
const AMBER = MIR_META.accent;
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
const tierColor = (t: string) => (MIR_TIERS.find(x => x.tier === t)?.color ?? Colors.muted);

export default function MirHub() {
  return (
    <View>
      <GradientHero from="#2E2410" to="#0A1424" style={{ marginBottom: Spacing.lg, borderColor: AMBER + '33' }}>
        <Text style={st.heroTitle}>🇪🇸 {MIR_META.titulo}</Text>
        <Text style={[st.heroSub, { color: AMBER }]}>{MIR_META.subtitulo}</Text>
        <Text style={st.heroTesis}>{MIR_META.tesis}</Text>
      </GradientHero>

      <MegaStat value={MIR_KPIS.asignaturasTierS} label="Asignaturas Tier S · ROI máximo · empieza aquí" accent={AMBER}
        footnote="Estadística + Bioética + Cardiología · casi regalo de puntos + momentum" />

      <View style={st.ringRow}>
        <View style={st.ringCard}><RingStat value={3} max={4} label="Tier S" sub="ROI máximo" accent={Colors.green} /></View>
        <View style={st.ringCard}><RingStat value={6} max={6} label="Vueltas CRÍT" sub="Cardio/Estad/Ética" accent={Colors.coral} /></View>
        <View style={st.ringCard}><RingStat value={1} max={1} label="Simulacro" sub="/finde (mes 6+)" accent={AMBER} /></View>
        <View style={st.ringCard}><RingStat value={MIR_KPIS.readiness} label="Readiness" sub="desde cero" accent={Colors.blue} suffix="%" /></View>
      </View>

      {/* TIERS leyenda */}
      <SectionLabel>Asignaturas por rentabilidad (ROI/hora)</SectionLabel>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.md }}>
        {MIR_TIERS.map((t) => (
          <View key={t.tier} style={[st.tierChip, { borderColor: t.color + '66' }]}>
            <Text style={[st.tierTxt, { color: t.color }]}>Tier {t.tier} · {t.label}</Text>
          </View>
        ))}
      </View>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {MIR_ASIGNATURAS.map((a, i) => (
          <View key={i} style={[st.row, i === 0 && { borderTopWidth: 0 }]}>
            <View style={[st.tierBadge, { backgroundColor: tierColor(a.tier) + '22' }]}><Text style={[st.tierBadgeTxt, { color: tierColor(a.tier) }]}>{a.tier}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={st.rowName}>{a.nombre}</Text>
              <Text style={st.rowNota}>{a.nota}</Text>
            </View>
            <Text style={[st.rowVueltas, { color: PRIORIDAD_COLOR[a.prioridad] }]}>{VUELTAS[a.prioridad]}v</Text>
          </View>
        ))}
      </GlassPanel>

      {/* ProMIR fases */}
      <SectionLabel>ProMIR · las 5 fases</SectionLabel>
      <View style={[gridStyle(180), { marginBottom: Spacing.xl }]}>
        {PROMIR_FASES.map((f, i) => (
          <View key={i} style={gridItemStyle(180)}>
            <FadeUp delay={i * 50}>
              <View style={[st.faseCard, { borderLeftColor: AMBER }]}>
                <Text style={[st.faseTag, { color: AMBER }]}>{i + 1}. {f.fase}</Text>
                <Text style={st.body}>{f.desc}</Text>
              </View>
            </FadeUp>
          </View>
        ))}
      </View>

      {/* Hora diaria */}
      <SectionLabel>La hora diaria (aprendizaje basado en preguntas)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {MIR_HORA.map((h, i) => (
          <View key={i} style={[st.hourRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={[st.hourBadge, { backgroundColor: AMBER + '1A' }]}><Text style={[st.hourMin, { color: AMBER }]}>{h.min}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={st.hourBloque}>{h.bloque}</Text>
              <Text style={st.hourAct}>{h.act}</Text>
            </View>
          </View>
        ))}
      </GlassPanel>

      {/* Calendario macro */}
      <SectionLabel>Calendario macro (1h/día)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {MIR_CALENDARIO.map((c, i) => (
          <View key={i} style={[st.calRow, i === 0 && { borderTopWidth: 0 }]}>
            <Text style={[st.calFase, { color: AMBER }]}>{c.fase}</Text>
            <Text style={st.calFoco}>{c.foco}</Text>
          </View>
        ))}
      </GlassPanel>

      {/* Táctica de examen */}
      <SectionLabel>Táctica de examen · regla numérica (−1/3)</SectionLabel>
      <View style={[gridStyle(200), { marginBottom: Spacing.xl }]}>
        {MIR_TACTICA.map((t, i) => (
          <View key={i} style={gridItemStyle(200)}>
            <View style={st.tactCard}>
              <Text style={st.tactCaso}>{t.caso}</Text>
              <Text style={[st.tactEv, { color: AMBER }]}>{t.ev}</Text>
              <Chip label={t.accion} color={t.accion.startsWith('Responde') ? Colors.green : Colors.muted} small />
            </View>
          </View>
        ))}
      </View>

      {/* Recursos */}
      <SectionLabel>Recursos · cuadernillos oficiales gratis</SectionLabel>
      <View style={[gridStyle(240), { marginBottom: Spacing.lg }]}>
        {MIR_RECURSOS.map((r, i) => (
          <View key={i} style={gridItemStyle(240)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(r.url)} style={st.resCard}>
              <Text style={[st.resLabel, r.gated && { color: Colors.muted }]} numberOfLines={2}>{r.gated ? '🔒 ' : '🔗 '}{r.label} ↗</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <GlassPanel accent={AMBER} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
        <Text style={st.smallNote}>{MIR_NOTA}</Text>
      </GlassPanel>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder, padding: Spacing.lg };
const st = StyleSheet.create({
  heroTitle: { fontSize: FontSize.headlineSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5 },
  heroSub: { fontSize: FontSize.labelLg, marginTop: 4, fontWeight: '600' },
  heroTesis: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: Spacing.md, lineHeight: 20, maxWidth: 640 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 18 },
  smallNote: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 17 },

  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  ringCard: { flex: 1, minWidth: 140, backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: DesktopColors.glassBorder, paddingVertical: Spacing.lg, paddingHorizontal: Spacing.md, alignItems: 'center' },

  tierChip: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 10 },
  tierTxt: { fontSize: 10, fontWeight: '800' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', gap: 8 },
  tierBadge: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tierBadgeTxt: { fontSize: 11, fontWeight: '800' },
  rowName: { fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '600' },
  rowNota: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1, lineHeight: 15 },
  rowVueltas: { fontSize: 10, fontWeight: '700', width: 26, textAlign: 'right' },

  faseCard: { ...cardBase, borderLeftWidth: 3, minHeight: 110 },
  faseTag: { fontSize: FontSize.labelMd, fontWeight: '800', marginBottom: 4 },

  hourRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', gap: Spacing.sm },
  hourBadge: { borderRadius: BorderRadius.md, paddingVertical: 3, paddingHorizontal: 8, minWidth: 56, alignItems: 'center' },
  hourMin: { fontSize: FontSize.labelSm, fontWeight: '800' },
  hourBloque: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface },
  hourAct: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 1, lineHeight: 16 },

  calRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', gap: Spacing.md },
  calFase: { fontSize: FontSize.labelMd, fontWeight: '800', width: 110 },
  calFoco: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },

  tactCard: { ...cardBase, alignItems: 'center' },
  tactCaso: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600', textAlign: 'center' },
  tactEv: { fontSize: FontSize.titleMd, fontWeight: '800', marginVertical: 4 },

  resCard: { ...cardBase },
  resLabel: { fontSize: FontSize.labelMd, color: AMBER, fontWeight: '600', lineHeight: 16 },
});
