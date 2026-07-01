import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight } from '../../theme/tokens';
import { desktopStyles, DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, PillTab, gridStyle, gridItemStyle } from '../empresa/primitives';
import { GradientHero, RingStat, MegaStat, FadeUp, CommandBackdrop } from '../empresa/visuals';
import {
  SYNAPSE_META, SYNAPSE_KPIS, SYNAPSE_FASES, SYNAPSE_BIBLIOTECA, SYNAPSE_HORARIO,
  SYNAPSE_NIVEL_META, SYNAPSE_ADVERTENCIAS, SynapseMaterial, SynapseNivel,
  SYNAPSE_MINIFASE, SYNAPSE_PRACTICA,
} from '../../lib/synapseData';
import { obsUrl } from '../../lib/obsidianMap';
import { OBS_SYNAPSE_MATERIALES, OBS_SYNAPSE_FASES } from '../../lib/obsidianVaultMap';

const OBS = '#A78BFA'; // mismo morado ◆ que USMLE/MIR/ENCAPS
import { SYN_PLAN_META } from '../../lib/synapseDailyPlan';
import { loadDone, saveDone } from '../../lib/studyProgress';
import SynapseTodayPlan from './SynapseTodayPlan';

/**
 * SynapseHub — formación élite en IA (Mind · AI-engineered). MISMO molde que
 * Research/USMLE/MIR: HERO + sub-nav (Hoy/Ruta/Biblioteca/Protocolo). Materiales SOLO
 * de referentes verificados (URLs comprobadas). El motor día-a-día (pestaña ⚡ Hoy)
 * son misiones generadas desde temarios reales: src/lib/synapseDailyPlan.ts.
 */
const INDIGO = SYNAPSE_META.accent;
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

type Sub = 'hoy' | 'agosto' | 'ruta' | 'biblioteca' | 'protocolo';

const NIVEL_COLOR: Record<SynapseNivel, string> = {
  base: Colors.green,
  intermedio: Colors.amber,
  avanzado: Colors.coral,
};

function MaterialRow({ m }: { m: SynapseMaterial }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(m.url)} style={st.matCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.xs + 2 }}>
        <Text style={st.matName} numberOfLines={2}>{m.nombre} ↗</Text>
        <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
          {m.audio ? <Chip label="🎧 huecos" color={INDIGO} small /> : null}
          <Chip label={m.gratis} color={m.gratis === 'gratis' ? Colors.green : Colors.amber} small />
          {OBS_SYNAPSE_MATERIALES[m.nombre] ? (
            <TouchableOpacity activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
              onPress={() => openUrl(obsUrl(OBS_SYNAPSE_MATERIALES[m.nombre]))}>
              <Chip label="◆ Obsidian" color={OBS} small />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <Text style={st.matRef}>{m.referente} · <Text style={{ color: Colors.muted }}>{m.credencial}</Text></Text>
      <Text style={st.matWhy}>{m.porQue}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
        <Chip label={m.tipo} color={Colors.muted} small />
        <Chip label={m.nivel} color={NIVEL_COLOR[m.nivel]} small />
        {m.duracion ? <Text style={st.matDur}>{m.duracion}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

/** RUTA — las fases del curriculum, de la escuela de Anthropic al nivel Fellows. */
function RutaView() {
  return (
    <View>
      <SectionLabel>Ruta · médico → especialista en IA (el orden importa)</SectionLabel>
      {SYNAPSE_FASES.map((f, i) => {
        const activa = f.estado === 'activa';
        const meta = f.estado === 'meta';
        const acc = activa ? INDIGO : meta ? Colors.green : Colors.muted;
        return (
          <FadeUp key={f.id} delay={i * 60}>
            <View style={[st.faseCard, { borderLeftColor: acc }, activa && { backgroundColor: INDIGO + '0E' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                <Text style={[st.faseTag, { color: acc }]}>{f.fase} · {f.duracion}</Text>
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  {activa ? <Chip label="EMPIEZA AQUÍ" color={INDIGO} small /> : meta ? <Chip label="META" color={Colors.green} small /> : null}
                  {OBS_SYNAPSE_FASES[f.fase] ? (
                    <TouchableOpacity activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
                      onPress={() => openUrl(obsUrl(OBS_SYNAPSE_FASES[f.fase]))}>
                      <Chip label="◆ Obsidian" color={OBS} small />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
              <Text style={st.faseTitle}>{f.titulo}</Text>
              <Text style={st.faseDesc}>{f.desc}</Text>
              <Text style={[st.faseEntreg, { color: acc }]}>→ {f.entregable}</Text>
              <View style={{ marginTop: 10, gap: 8 }}>
                {f.materiales.map((m, j) => <MaterialRow key={j} m={m} />)}
              </View>
            </View>
          </FadeUp>
        );
      })}
    </View>
  );
}

/** BIBLIOTECA — todos los materiales verificados, por categoría. */
function BibliotecaView() {
  return (
    <View>
      <SectionLabel>Biblioteca · solo referentes verificados (cero youtubers del momento)</SectionLabel>
      {SYNAPSE_BIBLIOTECA.map((cat, i) => (
        <FadeUp key={i} delay={i * 50}>
          <View style={{ marginBottom: Spacing.xl }}>
            <Text style={st.catTitle}>{cat.icon} {cat.categoria}</Text>
            <View style={gridStyle(280)}>
              {cat.items.map((m, j) => (
                <View key={j} style={gridItemStyle(280)}>
                  <MaterialRow m={m} />
                </View>
              ))}
            </View>
          </View>
        </FadeUp>
      ))}
    </View>
  );
}

/** PROTOCOLO — los 30 min/día en espacios muertos + el nivel meta + honestidad. */
function ProtocoloView() {
  return (
    <View>
      <SectionLabel>Protocolo · 30 min/día en espacios muertos (sin tocar bloques médicos)</SectionLabel>
      <GlassPanel accent={INDIGO} style={{ marginBottom: Spacing.xl }}>
        {SYNAPSE_HORARIO.map((h, i) => (
          <View key={i} style={[st.horRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={[st.horBadge, { backgroundColor: INDIGO + '1A' }]}>
              <Text style={[st.horMin, { color: INDIGO }]}>{h.min}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={st.horBloque}>{h.bloque}</Text>
              <Text style={st.horQue}>{h.que}</Text>
            </View>
            <Chip label={h.formato} color={h.formato.includes('audio') ? INDIGO : Colors.muted} small />
          </View>
        ))}
      </GlassPanel>

      <SectionLabel>El nivel meta · lo que exige Anthropic (de sus vacantes y Fellows reales)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {SYNAPSE_NIVEL_META.map((n, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 5, alignItems: 'flex-start' }}>
            <Text style={{ color: INDIGO }}>◆</Text>
            <Text style={[st.body, { flex: 1 }]}>
              <Text style={{ fontWeight: '700', color: Colors.onSurface }}>{n.skill}</Text> — {n.fuente}
            </Text>
          </View>
        ))}
      </GlassPanel>

      <SectionLabel>Honestidad (no inventado)</SectionLabel>
      <GlassPanel accent={Colors.amber} style={{ marginBottom: Spacing.xl }}>
        {SYNAPSE_ADVERTENCIAS.map((a, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 5 }}>
            <Text style={{ color: Colors.amber }}>•</Text>
            <Text style={[st.body, { flex: 1 }]}>{a}</Text>
          </View>
        ))}
      </GlassPanel>
    </View>
  );
}

/** AGOSTO — la mini-fase AI-first (10 semanas, medible) + el sistema de práctica deliberada. */
function MiniFaseView() {
  const mf = SYNAPSE_MINIFASE; const pr = SYNAPSE_PRACTICA;
  return (
    <View>
      <SectionLabel>🚀 Mini-Fase AGOSTO · {mf.titulo}</SectionLabel>
      <GlassPanel accent={INDIGO} style={{ marginBottom: Spacing.lg }}>
        <Chip label={mf.etiqueta} color={INDIGO} small />
        <Text style={[st.body, { marginTop: 8 }]}>{mf.objetivo}</Text>
        <Text style={[st.faseEntreg, { color: Colors.green, marginTop: 10 }]}>🎯 Cierre de agosto: {mf.entregableFinal}</Text>
      </GlassPanel>

      <SectionLabel>KPIs medibles (práctica deliberada, no minutos)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.lg }}>
        {mf.kpis.map((k, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 5 }}>
            <Text style={{ color: INDIGO }}>◆</Text><Text style={[st.body, { flex: 1 }]}>{k}</Text>
          </View>
        ))}
      </GlassPanel>

      <SectionLabel>Las 10 semanas · cada una deja un entregable medible</SectionLabel>
      {mf.semanas.map((s, i) => (
        <FadeUp key={i} delay={i * 35}>
          <View style={[st.faseCard, { borderLeftColor: INDIGO }]}>
            <Text style={[st.faseTag, { color: INDIGO }]}>{s.rango}</Text>
            <Text style={st.faseTitle}>{s.foco}</Text>
            <Text style={[st.faseEntreg, { color: Colors.green }]}>→ {s.entregable}</Text>
            {s.recurso ? <Text style={[st.matDur, { marginTop: 4 }]}>📎 {s.recurso}</Text> : null}
          </View>
        </FadeUp>
      ))}

      <SectionLabel>La IA es tu coach · práctica deliberada (Peak · Ericsson)</SectionLabel>
      <GlassPanel accent={INDIGO} style={{ marginBottom: Spacing.lg }}>
        <Text style={[st.body, { marginBottom: 8 }]}>{pr.resumen}</Text>
        {pr.principios.map((p, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 4 }}>
            <Text style={{ color: INDIGO }}>•</Text><Text style={[st.body, { flex: 1 }]}>{p}</Text>
          </View>
        ))}
      </GlassPanel>

      <SectionLabel>Cómo se MIDE que sí aprendes (sistema calificable)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.lg }}>
        {pr.sistemaMedible.map((s, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 4 }}>
            <Text style={{ color: Colors.green }}>✓</Text><Text style={[st.body, { flex: 1 }]}>{s}</Text>
          </View>
        ))}
      </GlassPanel>

      <SectionLabel>¿Cuánto comprime la IA los 3 años?</SectionLabel>
      <GlassPanel accent={Colors.amber} style={{ marginBottom: Spacing.xl }}>
        <Text style={st.body}>{pr.compresion}</Text>
      </GlassPanel>
    </View>
  );
}

export default function SynapseHub({ variant = 'mobile' }: { variant?: 'mobile' | 'desktop' }) {
  const isDesktop = variant === 'desktop';
  const [sub, setSub] = useState<Sub>('hoy');
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone('synapse')));
  const toggleDone = (d: number) => setDone((prev) => {
    const n = new Set(prev);
    if (n.has(d)) n.delete(d); else n.add(d);
    saveDone('synapse', Array.from(n));
    return n;
  });
  const contentStyle = isDesktop
    ? desktopStyles.centerScrollContent
    : { paddingHorizontal: Spacing.lg, paddingTop: 56, paddingBottom: 110 };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.surface }} contentContainerStyle={contentStyle as any} showsVerticalScrollIndicator={false}>
      <View style={{ position: 'relative' }}>
        <CommandBackdrop />

        {/* HERO */}
        <GradientHero from="#181B36" to="#0A1424" style={{ marginBottom: Spacing.lg, borderColor: INDIGO + '33' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.md }}>
            <View style={{ flex: 1, minWidth: 240 }}>
              <Text style={st.heroTitle}>🧠 {SYNAPSE_META.titulo}</Text>
              <Text style={[st.heroSub, { color: INDIGO }]}>{SYNAPSE_META.subtitulo}</Text>
              <Text style={st.heroTesis}>{SYNAPSE_META.tesis}</Text>
            </View>
            <View style={[st.todayChip, { borderColor: INDIGO + '66', backgroundColor: INDIGO + '14' }]}>
              <Text style={st.todayLabel}>HOY</Text>
              <Text style={[st.todayValue, { color: INDIGO }]}>30 MIN</Text>
              <Text style={st.todaySub}>en espacios muertos</Text>
            </View>
          </View>
        </GradientHero>

        {/* KPIs */}
        <View style={st.ringRow}>
          <View style={st.ringCard}><RingStat value={SYNAPSE_KPIS.fases} max={SYNAPSE_KPIS.fases} label="Fases" sub="ruta completa" accent={INDIGO} /></View>
          <View style={st.ringCard}><RingStat value={SYNAPSE_KPIS.materialesVerificados} max={SYNAPSE_KPIS.materialesVerificados} label="Materiales" sub="URLs verificadas" accent={Colors.green} /></View>
          <View style={st.ringCard}><RingStat value={30} max={30} label="Min/día" sub="espacios muertos" accent={Colors.amber} /></View>
          <View style={st.ringCard}><RingStat value={done.size} max={SYN_PLAN_META.totalDias} label="Completadas" sub={`misiones reales · ${Math.round((done.size / SYN_PLAN_META.totalDias) * 100)}%`} accent={Colors.blue} /></View>
        </View>

        {/* Motor día-a-día → chat SYNAPSE */}
        <GlassPanel accent={INDIGO} style={{ marginBottom: Spacing.lg, padding: Spacing.lg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Text style={st.h3}>⚙ Motor día-a-día</Text>
            <Chip label="temario real" color={INDIGO} small />
          </View>
          <Text style={st.body}>{SYNAPSE_META.nota}</Text>
        </GlassPanel>

        {/* SUB-NAV */}
        <View style={{ flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.xl, flexWrap: 'wrap' }}>
          <PillTab label="⚡ Hoy" active={sub === 'hoy'} onPress={() => setSub('hoy')} accent={INDIGO} />
          <PillTab label="🚀 Agosto" active={sub === 'agosto'} onPress={() => setSub('agosto')} accent={INDIGO} />
          <PillTab label="◈ Ruta" active={sub === 'ruta'} onPress={() => setSub('ruta')} accent={INDIGO} />
          <PillTab label="⌘ Biblioteca" active={sub === 'biblioteca'} onPress={() => setSub('biblioteca')} accent={INDIGO} />
          <PillTab label="⏱ Protocolo" active={sub === 'protocolo'} onPress={() => setSub('protocolo')} accent={INDIGO} />
        </View>

        {sub === 'hoy' && <SynapseTodayPlan done={done} onToggle={toggleDone} />}
        {sub === 'agosto' && <MiniFaseView />}
        {sub === 'ruta' && <RutaView />}
        {sub === 'biblioteca' && <BibliotecaView />}
        {sub === 'protocolo' && <ProtocoloView />}
      </View>
    </ScrollView>
  );
}

const st = StyleSheet.create({
  heroTitle: { fontSize: FontSize.headlineSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.4, lineHeight: LineHeight.headlineSm },
  heroSub: { fontSize: FontSize.bodyMd, fontWeight: '700', marginTop: 4, letterSpacing: 0.6, textTransform: 'uppercase' },
  heroTesis: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: 8, lineHeight: LineHeight.bodyMd, maxWidth: 620 },
  todayChip: { borderWidth: 1, borderRadius: BorderRadius.lg, paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center', minWidth: 120, ...Elevation.sm },
  todayLabel: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.4 },
  todayValue: { fontSize: FontSize.titleLg, fontWeight: '800', marginTop: 2, letterSpacing: -0.4, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },
  todaySub: { fontSize: 9, color: Colors.muted, marginTop: 2, letterSpacing: 0.2 },
  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  ringCard: { flexGrow: 1, flexBasis: 150, backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, paddingVertical: Spacing.lg, alignItems: 'center', borderWidth: 1, borderColor: Hairline.medium, ...Elevation.sm },
  h3: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.bodyMd },
  faseCard: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderLeftWidth: 3, borderWidth: 1, borderColor: Hairline.soft, padding: Spacing.lg, marginBottom: Spacing.md, ...Elevation.sm },
  faseTag: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 1 },
  faseTitle: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.onSurface, marginTop: 6, letterSpacing: -0.3, lineHeight: LineHeight.titleMd },
  faseDesc: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: LineHeight.bodyMd },
  faseEntreg: { fontSize: FontSize.labelMd, fontWeight: '700', marginTop: 8, letterSpacing: 0.2 },
  matCard: { backgroundColor: 'rgba(216,227,252,0.03)', borderRadius: BorderRadius.lg, padding: Spacing.md, borderWidth: 1, borderColor: Hairline.soft },
  matName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, flex: 1, minWidth: 150, letterSpacing: -0.1 },
  matRef: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 4 },
  matWhy: { fontSize: FontSize.labelMd, color: Colors.muted, marginTop: 4, lineHeight: LineHeight.labelMd },
  matDur: { fontSize: 10, color: Colors.muted, letterSpacing: 0.2 },
  catTitle: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, marginBottom: Spacing.md, letterSpacing: 0.3 },
  horRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: 10, borderTopWidth: 1, borderTopColor: Hairline.soft },
  horBadge: { borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 10, minWidth: 52, alignItems: 'center' },
  horMin: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },
  horBloque: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.1 },
  horQue: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: LineHeight.labelMd },
});
