import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { desktopStyles, DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, PillTab, gridStyle, gridItemStyle } from '../empresa/primitives';
import { GradientHero, RingStat, MegaStat, FadeUp, CommandBackdrop } from '../empresa/visuals';
import { diaEstudioTipo, VUELTAS } from '../../lib/researchData';
import {
  DERMA_META, DERMA_BLOQUES, DERMA_RECURSOS, DERMA_FASES, DERMA_HORARIO, DERMA_NOTAS,
  PRIORIDAD_COLOR,
} from '../../lib/dermaData';
import DermaTodayPlan from './DermaTodayPlan';

/**
 * DermaHub — sección Derma (referente clínico → Mayo): pestaña HOY = plan día-a-día
 * REAL (68 átomos, 3 fuentes con links verificados, ◆ Edge para Qbankly, progreso 0%→)
 * + pestaña Cerebro clínico = currículo por bloques A–G, protocolo 12 semanas y recursos.
 * Interdiario con Research. Reutilizado mobile y desktop.
 */

const PURPLE = DERMA_META.accent;
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

const TOTAL_SUB = DERMA_BLOQUES.reduce((n, b) => n + b.subtemas.length, 0);
const CRITICAS = DERMA_BLOQUES.reduce((n, b) => n + b.subtemas.filter(s => s.prioridad === 'CRITICA').length, 0);

type Sub = 'hoy' | 'cerebro';

export default function DermaHub({ variant = 'mobile' }: { variant?: 'mobile' | 'desktop' }) {
  const isDesktop = variant === 'desktop';
  const hoy = diaEstudioTipo(new Date());
  const [sub, setSub] = useState<Sub>('hoy');
  const contentStyle = isDesktop
    ? desktopStyles.centerScrollContent
    : { paddingHorizontal: Spacing.lg, paddingTop: 56, paddingBottom: 110 };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.surface }} contentContainerStyle={contentStyle as any} showsVerticalScrollIndicator={false}>
      <View style={{ position: 'relative' }}>
        <CommandBackdrop />

        {/* HERO */}
        <GradientHero from="#241A33" to="#0A1424" style={{ marginBottom: Spacing.lg, borderColor: PURPLE + '33' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.md }}>
            <View style={{ flex: 1, minWidth: 240 }}>
              <Text style={st.heroTitle}>💎 {DERMA_META.titulo}</Text>
              <Text style={[st.heroSub, { color: PURPLE }]}>{DERMA_META.subtitulo}</Text>
              <Text style={st.heroTesis}>{DERMA_META.tesis}</Text>
            </View>
            <View style={[st.todayChip, { borderColor: (hoy === 'derma' ? PURPLE : Colors.teal) + '66', backgroundColor: (hoy === 'derma' ? PURPLE : Colors.teal) + '14' }]}>
              <Text style={st.todayLabel}>HOY</Text>
              <Text style={[st.todayVal, { color: hoy === 'derma' ? PURPLE : hoy === 'research' ? Colors.teal : Colors.muted }]}>
                {hoy === 'derma' ? '💎 DERMA' : hoy === 'research' ? '🔬 RESEARCH →' : '😴 Descanso'}
              </Text>
              <Text style={st.todaySub}>{hoy === 'research' ? 'hoy toca Research' : hoy === 'descanso' ? 'finde' : 'tu día'}</Text>
            </View>
          </View>
        </GradientHero>

        {/* SUB-PESTAÑAS: plan día-a-día vs cerebro clínico */}
        <View style={{ flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg, flexWrap: 'wrap' }}>
          <PillTab label="Hoy" icon="🗓️" active={sub === 'hoy'} accent={PURPLE} onPress={() => setSub('hoy')} />
          <PillTab label="Cerebro clínico" icon="🧠" active={sub === 'cerebro'} accent={PURPLE} onPress={() => setSub('cerebro')} />
        </View>

        {sub === 'hoy' ? <DermaTodayPlan /> : (
        <View>

        {/* MEGA STAT — lo que no puedes errar */}
        <MegaStat value={CRITICAS} label="Subtemas CRÍTICOS · lo que no puedes errar" accent={PURPLE}
          footnote={`de ${TOTAL_SUB} subtemas en el mapa · 7 bloques A–G`} />

        {/* RINGS */}
        <View style={st.ringRow}>
          <View style={st.ringCard}><RingStat value={DERMA_BLOQUES.length} max={7} label="Bloques" sub="A–G" accent={PURPLE} /></View>
          <View style={st.ringCard}><RingStat value={CRITICAS} max={TOTAL_SUB} label="Críticos" sub="no errar" accent={Colors.coral} /></View>
          <View style={st.ringCard}><RingStat value={12} max={12} label="Semanas" sub="protocolo starter" accent={Colors.amber} /></View>
          <View style={st.ringCard}><RingStat value={8} label="Readiness" sub="currículo" accent={Colors.teal} suffix="%" /></View>
        </View>

        {/* ESTRATEGIA MAYO */}
        <GlassPanel accent={Colors.green} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
          <Text style={st.h3}>🎯 Ángulo Mayo</Text>
          <Text style={st.body}>{DERMA_META.estrategiaMayo}</Text>
        </GlassPanel>

        {/* PROTOCOLO 12 SEMANAS */}
        <SectionLabel>Protocolo starter · 12 semanas (días Derma)</SectionLabel>
        <View style={[gridStyle(240), { marginBottom: Spacing.xl }]}>
          {DERMA_FASES.map((f, i) => (
            <View key={i} style={gridItemStyle(240)}>
              <FadeUp delay={i * 70}>
                <View style={[st.faseCard, { borderLeftColor: PURPLE }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                    <Text style={[st.faseTag, { color: PURPLE }]}>{f.fase}</Text>
                    <Chip label={f.semanas} color={Colors.muted} small />
                  </View>
                  <Text style={st.faseFoco}>{f.foco}</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    <Chip label={`bloques ${f.bloques}`} color={PURPLE} small />
                    <Chip label={`deadline ${f.deadline}`} color={Colors.amber} small />
                  </View>
                  <Text style={st.faseCrit}>Críticas nuevas: {f.criticas}</Text>
                </View>
              </FadeUp>
            </View>
          ))}
        </View>

        {/* BLOQUES A–G (currículo) */}
        <SectionLabel>Mapa de conocimiento · bloques A–G (por prioridad y vueltas)</SectionLabel>
        <View style={{ marginBottom: Spacing.xl }}>
          {DERMA_BLOQUES.map((b, i) => (
            <FadeUp key={b.id} delay={i * 40}>
              <View style={st.bloqueCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                    <Text style={{ fontSize: 20 }}>{b.emoji}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={st.bloqueTitle}>{b.nivel} {b.id} · {b.titulo}</Text>
                      <Text style={st.bloqueNota}>{b.nota}</Text>
                    </View>
                  </View>
                  <Chip label={`${b.subtemas.length} temas`} color={PURPLE} small />
                </View>
                <View style={st.subGrid}>
                  {b.subtemas.map((s) => (
                    <View key={s.code} style={st.subRow}>
                      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: PRIORIDAD_COLOR[s.prioridad], marginRight: 7 }} />
                      <Text style={st.subCode}>{s.code}</Text>
                      <Text style={st.subName} numberOfLines={1}>{s.nombre}</Text>
                      <Text style={[st.subVueltas, { color: PRIORIDAD_COLOR[s.prioridad] }]}>{VUELTAS[s.prioridad]}v</Text>
                    </View>
                  ))}
                </View>
              </View>
            </FadeUp>
          ))}
        </View>

        {/* RECURSOS GRATIS */}
        <SectionLabel>Recursos · enlaces directos</SectionLabel>
        <View style={[gridStyle(260), { marginBottom: Spacing.xl }]}>
          {DERMA_RECURSOS.map((r, i) => (
            <View key={i} style={gridItemStyle(260)}>
              <GlassPanel style={{ padding: Spacing.lg }}>
                <Text style={st.recCat}>{r.categoria}</Text>
                <View style={{ gap: 6, marginTop: 8 }}>
                  {r.items.map((it, j) => (
                    <TouchableOpacity key={j} activeOpacity={0.8} onPress={() => openUrl(it.url)} style={st.link}>
                      <Text style={[st.linkText, it.gated && { color: Colors.muted }]} numberOfLines={2}>
                        {it.gated ? '🔒 ' : '🔗 '}{it.label} ↗
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </GlassPanel>
            </View>
          ))}
        </View>

        {/* MICRO-HORARIO */}
        <SectionLabel>Micro-horario · sesión de 60 min</SectionLabel>
        <GlassPanel style={{ marginBottom: Spacing.xl }}>
          {DERMA_HORARIO.map((h, i) => (
            <View key={i} style={[st.horRow, i === 0 && { borderTopWidth: 0 }]}>
              <View style={[st.horBadge, { backgroundColor: PURPLE + '1A' }]}><Text style={[st.horFranja, { color: PURPLE }]}>{h.franja}</Text></View>
              <Text style={st.horAct}>{h.act}</Text>
            </View>
          ))}
        </GlassPanel>

        {/* NOTAS */}
        <SectionLabel>Honestidad (acceso / seguridad)</SectionLabel>
        <GlassPanel accent={Colors.amber} style={{ marginBottom: Spacing.xl }}>
          {DERMA_NOTAS.map((n, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 5 }}>
              <Text style={{ color: Colors.amber }}>•</Text>
              <Text style={[st.body, { flex: 1 }]}>{n}</Text>
            </View>
          ))}
        </GlassPanel>
        </View>
        )}
      </View>
    </ScrollView>
  );
}

const cardBase = {
  backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg,
  borderWidth: 1, borderColor: DesktopColors.glassBorder, padding: Spacing.lg,
};

const st = StyleSheet.create({
  heroTitle: { fontSize: FontSize.headlineSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5 },
  heroSub: { fontSize: FontSize.labelLg, marginTop: 4, fontWeight: '600' },
  heroTesis: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: Spacing.md, lineHeight: 20, maxWidth: 640 },
  todayChip: { borderRadius: BorderRadius.lg, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 14, alignItems: 'center', minWidth: 120 },
  todayLabel: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1 },
  todayVal: { fontSize: FontSize.bodyLg, fontWeight: '800', marginTop: 3 },
  todaySub: { fontSize: 9, color: Colors.muted, marginTop: 2 },

  h3: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: 6 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 19 },

  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  ringCard: { flex: 1, minWidth: 140, backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: DesktopColors.glassBorder, paddingVertical: Spacing.lg, paddingHorizontal: Spacing.md, alignItems: 'center' },

  faseCard: { ...cardBase, borderLeftWidth: 3, minHeight: 150 },
  faseTag: { fontSize: FontSize.labelMd, fontWeight: '800' },
  faseFoco: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 6, lineHeight: 16 },
  faseCrit: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 8, fontStyle: 'italic' },

  bloqueCard: { ...cardBase, marginBottom: Spacing.sm },
  bloqueTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface },
  bloqueNota: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1 },
  subGrid: { gap: 2 },
  subRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.04)' },
  subCode: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.onSurfaceVariant, width: 38 },
  subName: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurface },
  subVueltas: { fontSize: 9, fontWeight: '700', marginLeft: 6 },

  recCat: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  link: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: BorderRadius.md, borderWidth: 1, borderColor: DesktopColors.glassBorder, paddingVertical: 6, paddingHorizontal: 9 },
  linkText: { fontSize: FontSize.labelSm, color: PURPLE, fontWeight: '500', lineHeight: 15 },

  horRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', gap: Spacing.sm },
  horBadge: { borderRadius: BorderRadius.md, paddingVertical: 3, paddingHorizontal: 8, minWidth: 74, alignItems: 'center' },
  horFranja: { fontSize: FontSize.labelSm, fontWeight: '800' },
  horAct: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
});
