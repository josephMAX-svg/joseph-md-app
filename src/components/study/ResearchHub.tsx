import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { desktopStyles, DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, PillTab, gridStyle, gridItemStyle } from '../empresa/primitives';
import { GradientHero, RingStat, MegaStat, FadeUp, CommandBackdrop } from '../empresa/visuals';
import {
  RESEARCH_META, RESEARCH_KPIS, RESEARCH_TARGETS, RESEARCH_FASES, RESEARCH_MODULOS,
  RESEARCH_JOURNALS, RESEARCH_PIPELINE, PIPELINE_NOTA, RESEARCH_HORARIO, RESEARCH_TIMELINE,
  RESEARCH_ADVERTENCIAS, VUELTAS, PRIORIDAD_COLOR, diaEstudioTipo, Prioridad,
} from '../../lib/researchData';
import { RESEARCH_RECURSOS_TOP } from '../../lib/researchDailyPlan';
import ResearchTodayPlan from './ResearchTodayPlan';
import ResearchAgenticSystem from './ResearchAgenticSystem';
import ResearchLinesExplorer from './ResearchLinesExplorer';
import AIFirstPanel from './AIFirstPanel';

/**
 * ResearchHub — sección Research (camino a Mayo Clinic). Rediseñada con el MISMO molde que
 * USMLE/MIR: HERO + sub-nav (Hoy/Sistema/Líneas/Panel). "Hoy" = motor día-a-día de revisiones
 * sistemáticas (HOY/Horario/7d/Temario, progreso real); "Sistema" = sistema agéntico (el corazón);
 * "Líneas" = las 8 líneas de investigación; "Panel" = cockpit (KPIs, fases, journals, timeline).
 */
const TEAL = RESEARCH_META.accent;
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

type Sub = 'hoy' | 'sistema' | 'lineas' | 'panel';

function VueltasDots({ prioridad }: { prioridad: Prioridad }) {
  const n = VUELTAS[prioridad];
  const color = PRIORIDAD_COLOR[prioridad];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <View key={i} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: i < n ? color : 'rgba(255,255,255,0.12)' }} />
      ))}
      <Text style={{ fontSize: 9, color: Colors.muted, marginLeft: 4 }}>{n} vueltas</Text>
    </View>
  );
}

/** Panel = cockpit original (KPIs, fases, targets, currículo, journals, timeline, advertencias). */
function PanelView() {
  return (
    <View>
      {/* MEGA STAT */}
      <MegaStat value={RESEARCH_KPIS.pipsParaCompetir} label="Publicaciones indexadas para competir" accent={TEAL}
        footnote={`8–15 para nivel Mayo (stretch) · hoy tienes ${RESEARCH_KPIS.pipsActuales}`} />

      {/* RINGS */}
      <View style={st.ringRow}>
        <View style={st.ringCard}><RingStat value={RESEARCH_KPIS.pipsActuales} max={3} label="PIPs hoy" sub="indexadas reales" accent={Colors.coral} /></View>
        <View style={st.ringCard}><RingStat value={RESEARCH_KPIS.pipsParaCompetir} max={15} label="Meta competir" sub="≈3 PIPs" accent={TEAL} /></View>
        <View style={st.ringCard}><RingStat value={RESEARCH_KPIS.primerSubmissionMes} max={6} label="1er submission" sub="mes" accent={Colors.amber} /></View>
        <View style={st.ringCard}><RingStat value={RESEARCH_KPIS.readiness} label="Readiness" sub="perfil research" accent={Colors.blue} suffix="%" /></View>
      </View>

      {/* CUELLO DE BOTELLA */}
      <GlassPanel accent={Colors.coral} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
        <Text style={st.h3}>⚠ El cuello de botella real</Text>
        <Text style={st.body}>{RESEARCH_META.cuelloBotella}</Text>
      </GlassPanel>

      {/* FASES */}
      <SectionLabel>Ruta por fases · MIR → Mayo</SectionLabel>
      <View style={[gridStyle(220), { marginBottom: Spacing.lg }]}>
        {RESEARCH_FASES.map((f, i) => {
          const activa = f.estado === 'activa';
          const meta = f.estado === 'meta';
          const acc = activa ? TEAL : meta ? Colors.green : Colors.muted;
          return (
            <View key={i} style={gridItemStyle(220)}>
              <FadeUp delay={i * 70}>
                <View style={[st.faseCard, { borderLeftColor: acc }, activa && { backgroundColor: TEAL + '0E' }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[st.faseTag, { color: acc }]}>{f.fase}</Text>
                    {activa ? <Chip label="AQUÍ" color={TEAL} small /> : meta ? <Chip label="META" color={Colors.green} small /> : null}
                  </View>
                  <Text style={st.faseTitle}>{f.titulo}</Text>
                  <Text style={st.faseDesc}>{f.desc}</Text>
                  <Text style={st.faseEntreg}>→ {f.entregable}</Text>
                </View>
              </FadeUp>
            </View>
          );
        })}
      </View>

      {/* TARGETS DE PUBLICACIÓN */}
      <SectionLabel>Targets de publicación (mix realista)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_TARGETS.map((t, i) => (
          <View key={i} style={[st.tRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={{ flex: 1.6 }}>
              <Text style={st.tName}>{t.tipo}</Text>
              <Text style={st.tPeso}>{t.peso}</Text>
            </View>
            <Text style={[st.tObj, { color: TEAL }]}>{t.objetivo}</Text>
            <View style={{ width: 86, alignItems: 'flex-end' }}>
              <Chip label={t.prioridad} color={PRIORIDAD_COLOR[t.prioridad]} small />
            </View>
          </View>
        ))}
      </GlassPanel>

      {/* MÓDULOS */}
      <SectionLabel>Currículo de research skills · por prioridad, vueltas y deadline</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_MODULOS.map((m, i) => (
          <FadeUp key={m.n} delay={i * 50}>
            <View style={[st.modCard, { borderLeftColor: PRIORIDAD_COLOR[m.prioridad] }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                <Text style={st.modName}>{m.n}. {m.nombre}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Chip label={m.prioridad} color={PRIORIDAD_COLOR[m.prioridad]} small />
                  <Chip label={`deadline ${m.deadline}`} color={Colors.muted} small />
                </View>
              </View>
              <View style={{ marginTop: 6, marginBottom: 8 }}><VueltasDots prioridad={m.prioridad} /></View>
              <Text style={st.body}>{m.nota}</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {m.links.map((l, j) => (
                  <TouchableOpacity key={j} activeOpacity={0.8} onPress={() => openUrl(l.url)} style={st.link}>
                    <Text style={st.linkText} numberOfLines={1}>🔗 {l.label} ↗</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </FadeUp>
        ))}
      </View>

      {/* ★ TOP 2026 — recursos de élite verificados (aditivo) */}
      <SectionLabel>★ TOP 2026 · recursos de élite GRATIS verificados (por capa del ciclo)</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_RECURSOS_TOP.map((c, i) => (
          <FadeUp key={i} delay={i * 50}>
            <View style={{ marginBottom: Spacing.md }}>
              <Text style={st.recTopCapa}>{c.capa}</Text>
              <View style={{ gap: Spacing.sm }}>
                {c.items.map((it, j) => (
                  <TouchableOpacity key={j} activeOpacity={0.85} onPress={() => openUrl(it.url)} style={st.recTopCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                      <Text style={st.recTopName} numberOfLines={2}>{it.label} ↗</Text>
                      <Chip label={it.confianza} color={it.confianza === 'verificado' ? Colors.green : Colors.amber} small />
                    </View>
                    <Text style={st.recTopMeta}>{it.autor}</Text>
                    <Text style={st.recTopWhy}>{it.porQue}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                      <Chip label={it.tipo} color={Colors.muted} small />
                      <Chip label={it.nivel} color={Colors.blue} small />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </FadeUp>
        ))}
      </View>

      {/* MICRO-HORARIO */}
      <SectionLabel>Micro-horario · 1h/día (días Research)</SectionLabel>
      <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.xl }]}>
        {RESEARCH_HORARIO.map((h, i) => (
          <View key={i} style={st.horCard}>
            <Text style={[st.horDia, { color: TEAL }]}>{h.dia}</Text>
            <Text style={st.horFoco}>{h.foco}</Text>
          </View>
        ))}
      </View>

      {/* PIPELINE AGÉNTICO (resumen — detalle en pestaña Sistema) */}
      <SectionLabel>Pipeline agéntico de papers (8 agentes + gates humanos)</SectionLabel>
      <View style={[gridStyle(160), { marginBottom: Spacing.sm }]}>
        {RESEARCH_PIPELINE.map((a) => (
          <View key={a.id} style={gridItemStyle(160)}>
            <View style={st.pipeCard}>
              <Text style={[st.pipeId, { color: TEAL }]}>{a.id}</Text>
              <Text style={st.pipeName}>{a.nombre}</Text>
              <Text style={st.pipeDesc}>{a.desc}</Text>
              <Text style={st.pipeTool}>{a.tool}</Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={[st.smallNote, { marginBottom: Spacing.xl }]}>{PIPELINE_NOTA}</Text>

      {/* JOURNALS */}
      <SectionLabel>Journals · empieza por el tier B</SectionLabel>
      <View style={[gridStyle(220), { marginBottom: Spacing.xl }]}>
        {RESEARCH_JOURNALS.map((j, i) => (
          <View key={i} style={gridItemStyle(220)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(j.url)} style={st.jCard}>
              <Text style={st.jName}>{j.nombre} ↗</Text>
              <Chip label={j.tier} color={j.tier.startsWith('B') ? Colors.green : j.tier.startsWith('A') ? Colors.amber : Colors.coral} small />
              <Text style={[st.body, { marginTop: 6 }]}>{j.nota}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* TIMELINE */}
      <SectionLabel>Timeline · 0 → primer paper</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_TIMELINE.map((t, i) => (
          <View key={i} style={[st.tlRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={[st.tlBadge, { backgroundColor: TEAL + '1A' }]}><Text style={[st.tlSem, { color: TEAL }]}>{t.sem}</Text></View>
            <Text style={st.tlFoco}>{t.foco}</Text>
            <Text style={st.tlOut}>{t.out}</Text>
          </View>
        ))}
      </GlassPanel>

      {/* ADVERTENCIAS */}
      <SectionLabel>Honestidad (no inventado)</SectionLabel>
      <GlassPanel accent={Colors.amber} style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_ADVERTENCIAS.map((a, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 5 }}>
            <Text style={{ color: Colors.amber }}>•</Text>
            <Text style={[st.body, { flex: 1 }]}>{a}</Text>
          </View>
        ))}
      </GlassPanel>
    </View>
  );
}

export default function ResearchHub({ variant = 'mobile' }: { variant?: 'mobile' | 'desktop' }) {
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
        <GradientHero from="#0E2A2A" to="#0A1424" style={{ marginBottom: Spacing.lg, borderColor: TEAL + '33' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.md }}>
            <View style={{ flex: 1, minWidth: 240 }}>
              <Text style={st.heroTitle}>🔬 {RESEARCH_META.titulo}</Text>
              <Text style={[st.heroSub, { color: TEAL }]}>{RESEARCH_META.subtitulo}</Text>
              <Text style={st.heroTesis}>{RESEARCH_META.tesis}</Text>
            </View>
            <View style={[st.todayChip, { borderColor: (hoy === 'research' ? TEAL : Colors.purple) + '66', backgroundColor: (hoy === 'research' ? TEAL : Colors.purple) + '14' }]}>
              <Text style={st.todayLabel}>HOY</Text>
              <Text style={[st.todayVal, { color: hoy === 'research' ? TEAL : hoy === 'derma' ? Colors.purple : Colors.muted }]}>
                {hoy === 'research' ? '🔬 RESEARCH' : hoy === 'derma' ? '💎 DERMA →' : '😴 Descanso'}
              </Text>
              <Text style={st.todaySub}>{hoy === 'derma' ? 'hoy toca Derma' : hoy === 'descanso' ? 'finde' : 'tu día'}</Text>
            </View>
          </View>
        </GradientHero>

        <AIFirstPanel segmento="research" accent={TEAL} />

        {/* SUB-NAV (estilo USMLE/MIR) */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.lg }}>
          <PillTab label="Hoy" icon="🗓️" active={sub === 'hoy'} accent={TEAL} onPress={() => setSub('hoy')} />
          <PillTab label="Sistema agéntico" icon="🧬" active={sub === 'sistema'} accent={TEAL} onPress={() => setSub('sistema')} />
          <PillTab label="Líneas" icon="🔬" active={sub === 'lineas'} accent={TEAL} onPress={() => setSub('lineas')} />
          <PillTab label="Panel" icon="📊" active={sub === 'panel'} accent={TEAL} onPress={() => setSub('panel')} />
        </View>

        {sub === 'hoy' ? <ResearchTodayPlan />
          : sub === 'sistema' ? <ResearchAgenticSystem />
          : sub === 'lineas' ? <ResearchLinesExplorer />
          : <PanelView />}
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
  heroTesis: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: Spacing.md, lineHeight: 20, maxWidth: 620 },
  todayChip: { borderRadius: BorderRadius.lg, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 14, alignItems: 'center', minWidth: 120 },
  todayLabel: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1 },
  todayVal: { fontSize: FontSize.bodyLg, fontWeight: '800', marginTop: 3 },
  todaySub: { fontSize: 9, color: Colors.muted, marginTop: 2 },

  h3: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: 6 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 19 },
  smallNote: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 17 },

  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  ringCard: { flex: 1, minWidth: 140, backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: DesktopColors.glassBorder, paddingVertical: Spacing.lg, paddingHorizontal: Spacing.md, alignItems: 'center' },

  faseCard: { ...cardBase, borderLeftWidth: 3, minHeight: 150 },
  faseTag: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.3 },
  faseTitle: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, marginTop: 4 },
  faseDesc: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 16 },
  faseEntreg: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 8, fontStyle: 'italic', lineHeight: 15 },

  tRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', gap: Spacing.sm },
  tName: { fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '600' },
  tPeso: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1 },
  tObj: { width: 60, fontSize: FontSize.bodyLg, fontWeight: '800', textAlign: 'center' },

  modCard: { ...cardBase, borderLeftWidth: 3, marginBottom: Spacing.sm },
  modName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, flexShrink: 1 },

  horCard: { flex: 1, minWidth: 120, ...cardBase, padding: Spacing.md },
  horDia: { fontSize: FontSize.labelLg, fontWeight: '800' },
  horFoco: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 15 },

  pipeCard: { ...cardBase, padding: Spacing.md, minHeight: 110 },
  pipeId: { fontSize: FontSize.titleMd, fontWeight: '800', opacity: 0.7 },
  pipeName: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface, marginTop: 2 },
  pipeDesc: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 14 },
  pipeTool: { fontSize: 9, color: TEAL, marginTop: 6, fontWeight: '600' },

  jCard: { ...cardBase },
  jName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, marginBottom: 6 },

  tlRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', gap: Spacing.sm },
  tlBadge: { borderRadius: BorderRadius.md, paddingVertical: 3, paddingHorizontal: 8, minWidth: 64, alignItems: 'center' },
  tlSem: { fontSize: FontSize.labelSm, fontWeight: '800' },
  tlFoco: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
  tlOut: { fontSize: FontSize.labelSm, color: Colors.onSurface, fontWeight: '600', width: 96, textAlign: 'right' },

  link: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: BorderRadius.md, borderWidth: 1, borderColor: DesktopColors.glassBorder, paddingVertical: 5, paddingHorizontal: 9, maxWidth: '100%' },
  linkText: { fontSize: FontSize.labelSm, color: TEAL, fontWeight: '500' },

  recTopCapa: { fontSize: FontSize.labelMd, fontWeight: '800', color: TEAL, letterSpacing: 0.3, marginBottom: 8, textTransform: 'uppercase' as const },
  recTopCard: { ...cardBase, padding: Spacing.md, borderLeftWidth: 3, borderLeftColor: TEAL },
  recTopName: { flex: 1, minWidth: 180, fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  recTopMeta: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 3 },
  recTopWhy: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 6, lineHeight: 16 },
});
