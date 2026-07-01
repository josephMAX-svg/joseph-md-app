import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, gridStyle, gridItemStyle } from '../empresa/primitives';
import MirTodayPlan from './MirTodayPlan';
import { RingStat, FadeUp } from '../empresa/visuals';
import {
  MIR_META, MIR_KPIS, PROMIR_FASES, MIR_HORA, MIR_CALENDARIO,
  MIR_TACTICA, MIR_RECURSOS, MIR_NOTA, MIR_SIMULACROS, MIR_READINESS, MIR_DESGLOSES,
  PRIORIDAD_COLOR, VUELTAS,
} from '../../lib/mirData';
import { DIGESTIVO_META, DIGESTIVO_CAPITULOS, DIGESTIVO_PLAN, capUrl } from '../../lib/mirDigestivoData';
import { CARDIO_META, CARDIO_CAPITULOS, capUrl as cardioUrl } from '../../lib/mirCardiologiaData';
import { MIR_DIAS } from '../../lib/mirDailyPlan';
import { planHoyD, progresoGlobal, loadDone } from '../../lib/studyProgress';
import ReadinessBar from './ReadinessBar';
import { ConsoleTabs, CheckpointCard } from './ConsoleKit';
import MirTemarioExplorer from './MirTemarioExplorer';

/**
 * MirHub — "consola española de banca de conocimiento" (ámbar/champagne). Command bar
 * de readiness arriba (Día X/N · % temario · gauge de simulacro), sub-nav de consola,
 * cuerpo = cola del día + explorador-banco + capa de simulacros/desgloses.
 * Render como View dentro del ScrollView de EstudioScreen.
 */
const AMBER = MIR_META.accent;   // #F5A623 — ámbar (consola española)
const CHAMP = Colors.champagne;  // #D8BE86 — se armoniza para no chocar con el oro-firma
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return MIR_DIAS[0].fecha; }
}

const TABS = [
  { key: 'hoy', label: 'Cola de hoy', icon: '📋' },
  { key: 'temario', label: 'Temario · High Yield', icon: '📚' },
  { key: 'readiness', label: 'Simulacros', icon: '◈' },
  { key: 'tactica', label: 'Táctica · ProMIR', icon: '🎯' },
];

export default function MirHub() {
  const [sub, setSub] = useState('hoy');
  const done = loadDone('mir');
  const hoyD = planHoyD(MIR_DIAS, todayISO());
  const glob = progresoGlobal(MIR_DIAS, new Set(done));

  return (
    <View>
      <ReadinessBar
        flag={MIR_META.flag} title={MIR_META.titulo}
        subtitle="Consola española · rentabilidad = preguntas ÷ temario"
        accent={AMBER}
        dia={hoyD} total={glob.total} temarioPct={glob.pct}
        racha={`${done.length} temas`}
        readinessPct={MIR_READINESS.pct} readinessLabel={MIR_READINESS.estado}
        extraStat={{ label: 'TIER S', value: `${MIR_KPIS.asignaturasTierS}`, hint: 'ROI máx', accent: Colors.coral }}
      />

      <ConsoleTabs tabs={TABS} active={sub} accent={AMBER} onSelect={setSub} />

      {sub === 'hoy' && <MirTodayPlan />}
      {sub === 'temario' && <TemarioView />}
      {sub === 'readiness' && <SimulacrosView />}
      {sub === 'tactica' && <TacticaView />}
    </View>
  );
}

// ── SIMULACROS · readiness cronometrado + desgloses por asignatura ──
function SimulacrosView() {
  return (
    <View>
      <CheckpointCard
        title="Simulacros cronometrados · readiness real"
        subtitle={MIR_READINESS.siguiente}
        rows={MIR_SIMULACROS.map((s) => ({
          form: s.nombre, kind: s.fuente, when: s.cuando, predictor: s.formato, band: s.banda, url: s.url, gated: s.gated,
        }))}
        accent={AMBER}
        ctaOpen="note"
      />

      {/* Desgloses por asignatura */}
      <SectionLabel>{MIR_DESGLOSES.titulo}</SectionLabel>
      <GlassPanel accent={CHAMP} style={{ marginBottom: Spacing.md, padding: Spacing.lg }}>
        <Text style={st.body}>{MIR_DESGLOSES.porQue}</Text>
      </GlassPanel>
      <View style={[gridStyle(240), { marginBottom: Spacing.xl }]}>
        {MIR_DESGLOSES.capas.map((c, i) => (
          <View key={i} style={gridItemStyle(240)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(c.url)} style={[st.desgCard, { borderLeftColor: c.gated ? Colors.muted : AMBER }]}>
              <Text style={st.desgFuente}>{c.gated ? '🔒 ' : '🔗 '}{c.fuente} ↗</Text>
              <Text style={st.desgQue} numberOfLines={2}>{c.que}</Text>
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

// ── TÁCTICA · fases ProMIR + hora + calendario + regla −1/3 + recursos ──
function TacticaView() {
  return (
    <View>
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

      <SectionLabel>Calendario macro (1h/día)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {MIR_CALENDARIO.map((c, i) => (
          <View key={i} style={[st.calRow, i === 0 && { borderTopWidth: 0 }]}>
            <Text style={[st.calFase, { color: AMBER }]}>{c.fase}</Text>
            <Text style={st.calFoco}>{c.foco}</Text>
          </View>
        ))}
      </GlassPanel>

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
    </View>
  );
}

// ── TEMARIO · explorador-banco + bloques reales Cardio/Digestivo ──
function TemarioView() {
  return (
    <View>
      <View style={st.ringRow}>
        <View style={st.ringCard}><RingStat value={3} max={4} label="Tier S" sub="ROI máximo" accent={Colors.green} /></View>
        <View style={st.ringCard}><RingStat value={6} max={6} label="Vueltas CRÍT" sub="Cardio/Estad/Ética" accent={Colors.coral} /></View>
        <View style={st.ringCard}><RingStat value={1} max={1} label="Simulacro" sub="/finde (mes 6+)" accent={AMBER} /></View>
        <View style={st.ringCard}><RingStat value={MIR_READINESS.pct} label="Readiness" sub="por simulacro" accent={Colors.gold} suffix="%" /></View>
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
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, padding: Spacing.lg, ...Elevation.sm };
const WEB_LINK = { cursor: 'pointer', transition: Motion.base } as any;
const tabular = Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {};
const st = StyleSheet.create({
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 19 },
  smallNote: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 17 },

  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  ringCard: { flex: 1, minWidth: 140, backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: Hairline.soft, paddingVertical: Spacing.lg, paddingHorizontal: Spacing.md, alignItems: 'center', ...Elevation.sm },

  // simulacros · desgloses
  desgCard: { ...cardBase, borderLeftWidth: 3, ...WEB_LINK },
  desgFuente: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  desgQue: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 5, lineHeight: 16 },

  faseCard: { ...cardBase, borderLeftWidth: 3, minHeight: 110 },
  faseTag: { fontSize: FontSize.labelMd, fontWeight: '800', marginBottom: 5, letterSpacing: 0.2 },

  hourRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: Hairline.soft, gap: Spacing.sm },
  hourBadge: { borderRadius: BorderRadius.md, paddingVertical: 3, paddingHorizontal: 8, minWidth: 56, alignItems: 'center' },
  hourMin: { fontSize: FontSize.labelSm, fontWeight: '800', ...tabular },
  hourBloque: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface },
  hourAct: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 16 },

  calRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: Hairline.soft, gap: Spacing.md },
  calFase: { fontSize: FontSize.labelMd, fontWeight: '800', width: 110, letterSpacing: 0.2 },
  calFoco: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },

  tactCard: { ...cardBase, alignItems: 'center' },
  tactCaso: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600', textAlign: 'center' },
  tactEv: { fontSize: FontSize.titleMd, fontWeight: '800', marginVertical: 5, letterSpacing: -0.3, ...tabular },

  resCard: { ...cardBase, ...WEB_LINK },
  resLabel: { fontSize: FontSize.labelMd, color: AMBER, fontWeight: '600', lineHeight: 16 },

  capCard: { ...cardBase, borderLeftWidth: 3, marginBottom: Spacing.sm, padding: Spacing.md, ...WEB_LINK },
  capTitulo: { flex: 1, fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  capPeso: { fontSize: FontSize.labelLg, fontWeight: '800', ...tabular },
  planRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: Hairline.soft, gap: Spacing.sm },
  planBadge: { borderRadius: BorderRadius.md, paddingVertical: 3, paddingHorizontal: 8, minWidth: 96, alignItems: 'center' },
  planDia: { fontSize: FontSize.labelSm, fontWeight: '800' },
  planCap: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface },
  planDet: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 16 },
});
