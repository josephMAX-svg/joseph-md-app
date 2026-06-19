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
import AIFirstPanel from './AIFirstPanel';
import {
  DERMA_LIBROS_ESTETICA, DERMA_VIDEOS, DERMA_QBANKS_ACCESS, DERMA_CASES_ACCESS,
  DERMA_QBANKLY_RESUMEN, srcBook, srcCap, srcMm, srcQa, srcCases,
} from '../../lib/dermaSourcesData';

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

type Sub = 'hoy' | 'fuentes' | 'cerebro';

/** Pestaña FUENTES — biblioteca REAL extraída y verificada (links 200 en vivo). */
function FuentesView() {
  const EDGE = '#3DA5E0';
  const openEdge = (u: string) => Linking.openURL('microsoft-edge:' + u).catch(() => openUrl(u));
  return (
    <View>
      {/* Las 3 fuentes */}
      <SectionLabel>Las 3 fuentes · data extraída y verificada en vivo (10-jun-2026)</SectionLabel>
      <View style={[gridStyle(250), { marginBottom: Spacing.lg }]}>
        {[
          { icon: '🏛️', t: 'AccessDermatologyDxRx', sub: '36 libros · 1.301 preguntas · 300 casos · 180 vídeos · sesión UF', url: 'https://dermatology.mhmedical.com/index.aspx', c: PURPLE },
          { icon: '🧪', t: 'Qbankly (⚠ SOLO Edge)', sub: 'derma: S1 488 Q · S2 CK 534 Q · S3 263 Q · 136 flashcards', url: 'https://qbankly.app/qbanks', c: EDGE, edge: true },
          { icon: '🇪🇸', t: 'ProMIR · Dermatología', sub: '11 capítulos · resumen 3:18:11 · Masterclass melanoma 1:39:10', url: 'https://promir.medicapanamericana.com/capitulo/62836950c0f8415ab9efb5c7', c: '#F5A623' },
        ].map((f, i) => (
          <View key={i} style={gridItemStyle(250)}>
            <FadeUp delay={i * 50}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => (f as any).edge ? openEdge(f.url) : openUrl(f.url)} style={[fst.srcCard, { borderLeftColor: f.c }]}>
                <Text style={{ fontSize: 22 }}>{f.icon}</Text>
                <Text style={fst.srcT}>{f.t}</Text>
                <Text style={fst.srcSub}>{f.sub}</Text>
                <Text style={[fst.srcGo, { color: f.c }]}>{(f as any).edge ? '◆ abrir en Edge' : 'abrir ↗'}</Text>
              </TouchableOpacity>
            </FadeUp>
          </View>
        ))}
      </View>

      {/* Q-banks + casos de Access */}
      <SectionLabel>Preguntas y casos (AccessDerma · conteos reales)</SectionLabel>
      <View style={[gridStyle(250), { marginBottom: Spacing.lg }]}>
        {DERMA_QBANKS_ACCESS.map((q, i) => (
          <View key={q.resourceid} style={gridItemStyle(250)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(srcQa(q.resourceid))} style={[fst.qRow, { borderLeftColor: PURPLE }]}>
              <Text style={fst.qN}>{q.preguntas}Q</Text>
              <Text style={fst.qT} numberOfLines={2}>{q.nombre} ↗</Text>
            </TouchableOpacity>
          </View>
        ))}
        {DERMA_CASES_ACCESS.map((c) => (
          <View key={c.groupid} style={gridItemStyle(250)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(srcCases(c.groupid))} style={[fst.qRow, { borderLeftColor: Colors.teal }]}>
              <Text style={[fst.qN, { color: Colors.teal }]}>🩺</Text>
              <Text style={fst.qT} numberOfLines={2}>{c.nombre} ↗</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Qbankly por step */}
      <SectionLabel>Qbankly · derma por step (◆ Edge)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.lg, padding: Spacing.md }}>
        {DERMA_QBANKLY_RESUMEN.map((s, i) => (
          <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => openEdge('https://qbankly.app/qbanks')} style={[fst.stepRow, i === 0 && { borderTopWidth: 0 }]}>
            <Text style={[fst.stepName, { color: EDGE }]}>{s.step}</Text>
            <Text style={fst.stepDet} numberOfLines={1}>{s.detalle}</Text>
            <Text style={fst.stepQ}>{s.q} Q ◆</Text>
          </TouchableOpacity>
        ))}
      </GlassPanel>

      {/* Vídeos */}
      <SectionLabel>Vídeos AccessDerma · 180 con título verificado</SectionLabel>
      <View style={[gridStyle(220), { marginBottom: Spacing.lg }]}>
        {DERMA_VIDEOS.map((v, i) => (
          <View key={v.nombre} style={gridItemStyle(220)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(v.hash ? srcMm(v.hash) : 'https://dermatology.mhmedical.com/multimedia.aspx')} style={fst.vidRow}>
              <Text style={fst.vidN}>{v.n}</Text>
              <Text style={fst.vidT} numberOfLines={2}>{v.nombre} ↗</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Biblioteca estética: 16 libros con capítulos ⭐ */}
      <SectionLabel>Biblioteca estética · 16 libros (740 capítulos con deep-link)</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {DERMA_LIBROS_ESTETICA.map((b, i) => (
          <FadeUp key={b.id} delay={Math.min(i * 25, 200)}>
            <View style={fst.libCard}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(srcBook(b.id))} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={fst.libT} numberOfLines={1}>📕 {b.t} ↗</Text>
                <Chip label={`${b.caps} caps`} color={PURPLE} small />
              </TouchableOpacity>
              {b.star.length > 0 && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {b.star.map((s) => (
                    <TouchableOpacity key={s.sid} activeOpacity={0.8} onPress={() => openUrl(srcCap(b.id, s.sid))} style={fst.starChip}>
                      <Text style={fst.starTxt} numberOfLines={1}>⭐ {s.t} ↗</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </FadeUp>
        ))}
        <Text style={fst.note}>Todos los links verificados en vivo (HTTP 200 + título correcto) con la sesión UF Remote Access · TOCs completos en DATA/DERMATOLOGIA/_scrape/.</Text>
      </View>
    </View>
  );
}

const fst = StyleSheet.create({
  srcCard: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder, borderLeftWidth: 3, padding: Spacing.lg, minHeight: 130 },
  srcT: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, marginTop: 6 },
  srcSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, lineHeight: 15 },
  srcGo: { fontSize: FontSize.labelSm, fontWeight: '800', marginTop: 8 },
  qRow: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder, borderLeftWidth: 3, padding: Spacing.md, flexDirection: 'row', alignItems: 'center', gap: 10 },
  qN: { fontSize: FontSize.bodyMd, fontWeight: '900', color: PURPLE, minWidth: 44 },
  qT: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  stepName: { fontSize: FontSize.labelMd, fontWeight: '800', width: 84 },
  stepDet: { flex: 1, fontSize: FontSize.labelSm, color: Colors.muted },
  stepQ: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface },
  vidRow: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder, padding: Spacing.md, flexDirection: 'row', alignItems: 'center', gap: 10 },
  vidN: { fontSize: FontSize.bodyLg, fontWeight: '900', color: '#22D3EE', minWidth: 34, textAlign: 'center' },
  vidT: { flex: 1, fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, lineHeight: 15 },
  libCard: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder, padding: Spacing.md, marginBottom: 6 },
  libT: { flex: 1, fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface },
  starChip: { backgroundColor: 'rgba(139,92,246,0.10)', borderWidth: 1, borderColor: 'rgba(139,92,246,0.35)', borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 10, maxWidth: 320 },
  starTxt: { fontSize: FontSize.labelSm, color: '#C4B5FD', fontWeight: '600' },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: 15 },
});

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

        <AIFirstPanel segmento="derma" accent={PURPLE} />

        {/* SUB-PESTAÑAS: plan día-a-día · fuentes · cerebro clínico */}
        <View style={{ flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg, flexWrap: 'wrap' }}>
          <PillTab label="Hoy" icon="🗓️" active={sub === 'hoy'} accent={PURPLE} onPress={() => setSub('hoy')} />
          <PillTab label="Fuentes" icon="📚" active={sub === 'fuentes'} accent={PURPLE} onPress={() => setSub('fuentes')} />
          <PillTab label="Cerebro clínico" icon="🧠" active={sub === 'cerebro'} accent={PURPLE} onPress={() => setSub('cerebro')} />
        </View>

        {sub === 'hoy' ? <DermaTodayPlan /> : sub === 'fuentes' ? <FuentesView /> : (
        <View>

        {/* MEGA STAT — lo que no puedes errar */}
        <MegaStat value={CRITICAS} label="Subtemas CRÍTICOS · lo que no puedes errar" accent={PURPLE}
          footnote={`de ${TOTAL_SUB} subtemas · mapa mental del SPEC (A–G) — la cola día-a-día (bloques propios A–X) vive en la pestaña Hoy`} />

        {/* RINGS */}
        <View style={st.ringRow}>
          <View style={st.ringCard}><RingStat value={DERMA_BLOQUES.length} max={7} label="Bloques" sub="mapa SPEC A–G" accent={PURPLE} /></View>
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
        <SectionLabel>Mapa mental del SPEC · bloques A–G (≠ bloques del plan día-a-día de Hoy)</SectionLabel>
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
