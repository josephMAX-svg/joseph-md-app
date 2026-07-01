import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, gridStyle, gridItemStyle, PillTab } from '../empresa/primitives';
import MirTodayPlan from './MirTodayPlan';
import { GradientHero, MegaStat, RingStat, FadeUp } from '../empresa/visuals';
import {
  MIR_META, MIR_KPIS, PROMIR_FASES, MIR_HORA, MIR_CALENDARIO,
  MIR_TACTICA, MIR_RECURSOS, MIR_NOTA, PRIORIDAD_COLOR, VUELTAS,
} from '../../lib/mirData';
import { DIGESTIVO_META, DIGESTIVO_CAPITULOS, DIGESTIVO_PLAN, capUrl } from '../../lib/mirDigestivoData';
import { CARDIO_META, CARDIO_CAPITULOS, capUrl as cardioUrl } from '../../lib/mirCardiologiaData';
import MirTemarioExplorer from './MirTemarioExplorer';

/**
 * MirHub — MIR España (ProMIR). Asignaturas por ROI tier + fases ProMIR + protocolo +
 * táctica de examen. Render como View dentro del ScrollView de EstudioScreen.
 */
const AMBER = MIR_META.accent;
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

export default function MirHub() {
  const [sub, setSub] = useState<'hoy' | 'temario'>('hoy');
  return (
    <View>
      <GradientHero from="#2E2410" to="#0A1424" style={{ marginBottom: Spacing.lg, borderColor: AMBER + '33' }}>
        <Text style={st.heroTitle}>🇪🇸 {MIR_META.titulo}</Text>
        <Text style={[st.heroSub, { color: AMBER }]}>{MIR_META.subtitulo}</Text>
        <Text style={st.heroTesis}>{MIR_META.tesis}</Text>
      </GradientHero>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.lg }}>
        <PillTab label="Hoy" icon="🗓️" active={sub === 'hoy'} accent={AMBER} onPress={() => setSub('hoy')} />
        <PillTab label="Temario · High Yield" icon="📚" active={sub === 'temario'} accent={AMBER} onPress={() => setSub('temario')} />
      </View>

      {sub === 'hoy' && <MirTodayPlan />}
      {sub === 'temario' && (<>
      <MegaStat value={MIR_KPIS.asignaturasTierS} label="Asignaturas Tier S · ROI máximo · empieza aquí" accent={AMBER}
        footnote="Estadística + Bioética + Cardiología · casi regalo de puntos + momentum" />

      <View style={st.ringRow}>
        <View style={st.ringCard}><RingStat value={3} max={4} label="Tier S" sub="ROI máximo" accent={Colors.green} /></View>
        <View style={st.ringCard}><RingStat value={6} max={6} label="Vueltas CRÍT" sub="Cardio/Estad/Ética" accent={Colors.coral} /></View>
        <View style={st.ringCard}><RingStat value={1} max={1} label="Simulacro" sub="/finde (mes 6+)" accent={AMBER} /></View>
        <View style={st.ringCard}><RingStat value={MIR_KPIS.readiness} label="Readiness" sub="desde cero" accent={Colors.blue} suffix="%" /></View>
      </View>

      {/* LAS 30 ASIGNATURAS REALES de ProMIR (rentabilidad + cruce rabi_94) */}
      <MirTemarioExplorer />

      {/* CARDIOLOGÍA — bloque REAL extraído de ProMIR (#1 rentabilidad) */}
      <SectionLabel>⭐ Cardiología · ProMIR — bloque REAL (#1 en rentabilidad)</SectionLabel>
      <GlassPanel accent={Colors.coral} style={{ marginBottom: Spacing.md, padding: Spacing.lg }}>
        <Text style={st.body}>
          <Text style={{ color: Colors.coral, fontWeight: '800' }}>{CARDIO_META.totalCaps} capítulos · {CARDIO_META.pesoGlobal}.</Text>
          {' '}Orden de ataque por rendimiento. Capítulos verificados con videos/duraciones reales; el resto abre en ProMIR.
        </Text>
      </GlassPanel>
      <View style={{ marginBottom: Spacing.xl }}>
        {CARDIO_CAPITULOS.map((c) => (
          <TouchableOpacity key={c.capId} activeOpacity={0.85} onPress={() => openUrl(cardioUrl(c.capId))}
            style={[st.capCard, { borderLeftColor: PRIORIDAD_COLOR[c.prioridad] }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: PRIORIDAD_COLOR[c.prioridad] }} />
              <Text style={st.capTitulo}>{c.n}. {c.titulo} ↗</Text>
              {c.verificado ? <Chip label="✓ real" color={Colors.green} small /> : <Chip label="ProMIR" color={Colors.muted} small />}
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6, marginLeft: 14 }}>
              {c.videosTxt ? <Chip label={`🎬 ${c.videosTxt}`} color={Colors.green} small /> : null}
              {c.videoMin ? <Chip label={`~${c.videoMin} min`} color={Colors.muted} small /> : null}
              {c.figuras ? <Chip label={`${c.figuras} figs`} color={Colors.blue} small /> : null}
              <Chip label={`${VUELTAS[c.prioridad]}v`} color={PRIORIDAD_COLOR[c.prioridad]} small />
            </View>
          </TouchableOpacity>
        ))}
        <Text style={st.smallNote}>{CARDIO_META.nota}</Text>
      </View>

      {/* DIGESTIVO — primer bloque REAL extraído de ProMIR */}
      <SectionLabel>⭐ Digestivo · ProMIR — bloque REAL (extraído de tu plataforma)</SectionLabel>
      <GlassPanel accent={Colors.green} style={{ marginBottom: Spacing.md, padding: Spacing.lg }}>
        <Text style={st.body}>
          <Text style={{ color: Colors.green, fontWeight: '800' }}>{DIGESTIVO_META.totalCaps} capítulos · {DIGESTIVO_META.totalVideos} videos · ~{DIGESTIVO_META.totalVideoMin} min · {DIGESTIVO_META.totalFiguras} figuras · {DIGESTIVO_META.totalTablas} tablas.</Text>
          {' '}{DIGESTIVO_META.pesoGlobalAprox}. Capítulos en orden de rentabilidad (Peso MIR real). Tocá un capítulo → abre ProMIR.
        </Text>
      </GlassPanel>
      <View style={{ marginBottom: Spacing.md }}>
        {DIGESTIVO_CAPITULOS.map((c) => (
          <TouchableOpacity key={c.capId} activeOpacity={0.85} onPress={() => openUrl(capUrl(c.capId))}
            style={[st.capCard, { borderLeftColor: PRIORIDAD_COLOR[c.prioridad] }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: PRIORIDAD_COLOR[c.prioridad] }} />
              <Text style={st.capTitulo}>{c.n}. {c.titulo} ↗</Text>
              {c.pesoMirPct ? <Text style={[st.capPeso, { color: AMBER }]}>{c.pesoMirPct}%</Text> : null}
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6, marginLeft: 14 }}>
              <Chip label={`🎬 ${c.videos} vid · ${c.duraciones.join(' · ')}`} color={Colors.green} small />
              <Chip label={`~${c.videoMin} min`} color={Colors.muted} small />
              {c.figuras ? <Chip label={`${c.figuras} figs`} color={Colors.blue} small /> : null}
              {c.tablas ? <Chip label={`${c.tablas} tablas`} color={Colors.purple} small /> : null}
              <Chip label={`${VUELTAS[c.prioridad]}v`} color={PRIORIDAD_COLOR[c.prioridad]} small />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <SectionLabel>Plan 1ª vuelta · Digestivo (1h/día, desde mañana)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {DIGESTIVO_PLAN.map((d, i) => (
          <View key={i} style={[st.planRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={[st.planBadge, { backgroundColor: Colors.green + '1A' }]}><Text style={[st.planDia, { color: Colors.green }]}>{d.dia}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={st.planCap}>{d.cap}</Text>
              <Text style={st.planDet}>{d.detalle}</Text>
            </View>
          </View>
        ))}
        <Text style={[st.smallNote, { marginTop: Spacing.sm }]}>{DIGESTIVO_META.nota}</Text>
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
      </>)}
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, padding: Spacing.lg, ...Elevation.sm };
const WEB_LINK = { cursor: 'pointer', transition: Motion.base } as any;
const st = StyleSheet.create({
  heroTitle: { fontSize: FontSize.headlineSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5, lineHeight: LineHeight.headlineSm },
  heroSub: { fontSize: FontSize.labelLg, marginTop: 5, fontWeight: '600', letterSpacing: 0.2 },
  heroTesis: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: Spacing.md, lineHeight: 20, maxWidth: 640 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 19 },
  smallNote: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 17 },

  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  ringCard: { flex: 1, minWidth: 140, backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: Hairline.soft, paddingVertical: Spacing.lg, paddingHorizontal: Spacing.md, alignItems: 'center', ...Elevation.sm },

  tierChip: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 10 },
  tierTxt: { fontSize: 10, fontWeight: '800' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderTopWidth: 1, borderTopColor: Hairline.soft, gap: 8 },
  tierBadge: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tierBadgeTxt: { fontSize: 11, fontWeight: '800' },
  rowName: { fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '600' },
  rowNota: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1, lineHeight: 15 },
  rowVueltas: { fontSize: 10, fontWeight: '700', width: 26, textAlign: 'right' },

  faseCard: { ...cardBase, borderLeftWidth: 3, minHeight: 110 },
  faseTag: { fontSize: FontSize.labelMd, fontWeight: '800', marginBottom: 5, letterSpacing: 0.2 },

  hourRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: Hairline.soft, gap: Spacing.sm },
  hourBadge: { borderRadius: BorderRadius.md, paddingVertical: 3, paddingHorizontal: 8, minWidth: 56, alignItems: 'center' },
  hourMin: { fontSize: FontSize.labelSm, fontWeight: '800' },
  hourBloque: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface },
  hourAct: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 16 },

  calRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: Hairline.soft, gap: Spacing.md },
  calFase: { fontSize: FontSize.labelMd, fontWeight: '800', width: 110, letterSpacing: 0.2 },
  calFoco: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },

  tactCard: { ...cardBase, alignItems: 'center' },
  tactCaso: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600', textAlign: 'center' },
  tactEv: { fontSize: FontSize.titleMd, fontWeight: '800', marginVertical: 5, letterSpacing: -0.3 },

  resCard: { ...cardBase, ...WEB_LINK },
  resLabel: { fontSize: FontSize.labelMd, color: AMBER, fontWeight: '600', lineHeight: 16 },

  capCard: { ...cardBase, borderLeftWidth: 3, marginBottom: Spacing.sm, padding: Spacing.md, ...WEB_LINK },
  capTitulo: { flex: 1, fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  capPeso: { fontSize: FontSize.labelLg, fontWeight: '800' },
  planRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: Hairline.soft, gap: Spacing.sm },
  planBadge: { borderRadius: BorderRadius.md, paddingVertical: 3, paddingHorizontal: 8, minWidth: 96, alignItems: 'center' },
  planDia: { fontSize: FontSize.labelSm, fontWeight: '800' },
  planCap: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface },
  planDet: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 16 },
});
