import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight } from '../../theme/tokens';
import { desktopStyles, DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, PillTab, gridStyle, gridItemStyle, monoText } from '../empresa/primitives';
import { GradientHero, FadeUp, CommandBackdrop } from '../empresa/visuals';
import {
  SYNAPSE_META, SYNAPSE_KPIS, SYNAPSE_FASES, SYNAPSE_BIBLIOTECA, SYNAPSE_HORARIO,
  SYNAPSE_NIVEL_META, SYNAPSE_ADVERTENCIAS, SynapseMaterial, SynapseNivel,
  SYNAPSE_MINIFASE, SYNAPSE_PRACTICA,
} from '../../lib/synapseData';
import { obsUrl } from '../../lib/obsidianMap';
import { OBS_SYNAPSE_MATERIALES, OBS_SYNAPSE_FASES } from '../../lib/obsidianVaultMap';

const OBS = '#A78BFA'; // mismo morado ◆ que USMLE/MIR/ENCAPS
import { SYN_PLAN_META, SYN_DIAS, synDiaDe } from '../../lib/synapseDailyPlan';
import { loadDone, saveDone, planHoyD } from '../../lib/studyProgress';
import { synTodayISO } from './SynapseTodayPlan';
import SynapseTodayPlan from './SynapseTodayPlan';
import {
  CONSOLE, TelemetryStrip, PhaseGraph, ConsoleGrid,
  PromptGlyph, Caret, PhaseGraphItem,
} from './synapseConsole';

/**
 * SynapseHub — formación élite en IA (Mind · AI-engineered), RE-SKIN como CONSOLA
 * NEURAL / observabilidad de un modelo en entrenamiento (Anthropic Console / Warp /
 * W&B). El HERO es una "consola header" con TelemetryStrip mono (run D{n}/82 · loss↓
 * dominio · checkpoint · uptime) en vez de 4 RingStat sueltos; un PhaseGraph de
 * checkpoints F0→F6(META) va como banda propia; la sub-nav son "tabs de consola".
 * Mismo molde HUB (ScrollView + Hero + sub-nav) y mismo motor Hoy/Ruta/Biblioteca:
 * sólo cambia la PRESENTACIÓN. Materiales SOLO de referentes verificados.
 */
const INDIGO = SYNAPSE_META.accent; // #7C83D6 periwinkle (canónico)
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

type Sub = 'hoy' | 'agosto' | 'ruta' | 'biblioteca' | 'protocolo';

// ── Telemetría del run (derivada de SYN_DIAS + progreso REAL, sin tocar el motor) ──
function useSynTelemetry(done: Set<number>) {
  const iso = synTodayISO();
  const hoyD = planHoyD(SYN_DIAS, iso);
  const hoy = synDiaDe(iso) || SYN_DIAS.find((x) => x.d === hoyD) || SYN_DIAS[0];
  const total = SYN_PLAN_META.totalDias;
  const pct = Math.round((done.size / total) * 100);
  const faseDias = SYN_DIAS.filter((x) => x.faseId === hoy.faseId);
  const faseHechos = faseDias.filter((x) => done.has(x.d)).length;
  const fasePct = faseDias.length ? Math.round((faseHechos / faseDias.length) * 100) : 0;
  return { hoyD, hoy, total, pct, fasePct };
}

// Grafo de fases (SYNAPSE_FASES → nodos con estado) para el PhaseGraph.
const PHASE_ITEMS: PhaseGraphItem[] = SYNAPSE_FASES.map((f) => ({
  id: f.id, fase: f.fase, titulo: f.titulo, estado: f.estado,
}));

const NIVEL_COLOR: Record<SynapseNivel, string> = {
  base: Colors.green,
  intermedio: Colors.amber,
  avanzado: Colors.coral,
};

function MaterialRow({ m }: { m: SynapseMaterial }) {
  const nivelC = NIVEL_COLOR[m.nivel];
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(m.url)} style={[st.matCard, { borderLeftColor: nivelC }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.xs + 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, flex: 1, minWidth: 150 }}>
          <PromptGlyph char="›" color={nivelC} />
          <Text style={st.matName} numberOfLines={2}>{m.nombre} ↗</Text>
        </View>
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
        <Text style={[st.matMeta, { color: Colors.muted }]}>[{m.tipo}]</Text>
        <Text style={[st.matMeta, { color: nivelC }]}>{m.nivel}</Text>
        {m.duracion ? <Text style={st.matDur}>· {m.duracion}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

/** RUTA — los checkpoints del entrenamiento, de la escuela de Anthropic al nivel Fellows. */
function RutaView({ isDesktop }: { isDesktop: boolean }) {
  return (
    <View>
      <SectionLabel>◈ graph · checkpoints F0 → META (el orden importa)</SectionLabel>
      {/* mini-grafo de fases arriba de las tarjetas */}
      <View style={st.graphBand}>
        {isDesktop ? <PhaseGraph items={PHASE_ITEMS} /> : <PhaseGraph items={PHASE_ITEMS} vertical />}
      </View>
      {SYNAPSE_FASES.map((f, i) => {
        const activa = f.estado === 'activa';
        const meta = f.estado === 'meta';
        const acc = activa ? INDIGO : meta ? CONSOLE.milestone : Colors.muted;
        return (
          <FadeUp key={f.id} delay={i * 60}>
            <View style={[st.faseCard, { borderLeftColor: acc }, activa && { backgroundColor: INDIGO + '0E' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                <Text style={[st.faseTag, { color: acc }]}>{f.fase} · {f.duracion}</Text>
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  {activa ? <Chip label="▶ RUNNING" color={INDIGO} small /> : meta ? <Chip label="★ META" color={CONSOLE.milestone} small /> : <Chip label="○ queued" color={Colors.muted} small />}
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
      <SectionLabel>⌘ registry · solo referentes verificados (cero youtubers del momento)</SectionLabel>
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
      <SectionLabel>⏱ protocol · 30 min/día en espacios muertos (sin tocar bloques médicos)</SectionLabel>
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

  const t = useSynTelemetry(done);
  const activa = SYNAPSE_FASES.find((f) => f.estado === 'activa');
  // telemetría del run: run · loss↓ (dominio) · checkpoint · uptime · registry
  const telemetry = [
    { label: 'run', value: `D${t.hoyD}/${t.total}`, accent: true as const },
    { label: 'loss ↓ dominio', value: `${t.pct}%`, color: t.pct > 0 ? CONSOLE.passed : Colors.muted },
    { label: `checkpoint ${activa?.fase ?? 'F0'}`, value: `${t.fasePct}%`, accent: true as const },
    { label: 'uptime', value: `${done.size}d`, color: Colors.onSurface },
    { label: 'registry', value: `${SYNAPSE_KPIS.materialesVerificados}`, color: CONSOLE.milestone },
  ];

  const TABS: { key: Sub; label: string }[] = [
    { key: 'hoy', label: '⚡ run' },
    { key: 'agosto', label: '🚀 sprint' },
    { key: 'ruta', label: '◈ graph' },
    { key: 'biblioteca', label: '⌘ registry' },
    { key: 'protocolo', label: '⏱ protocol' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.surface }} contentContainerStyle={contentStyle as any} showsVerticalScrollIndicator={false}>
      <View style={{ position: 'relative' }}>
        <CommandBackdrop />

        {/* HERO → CONSOLA HEADER */}
        <GradientHero from="#181B36" to="#0A1424" style={{ marginBottom: Spacing.md, borderColor: INDIGO + '3D', overflow: 'hidden' }}>
          <ConsoleGrid />
          <View style={{ position: 'relative' }}>
            {/* prompt line estilo terminal */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <PromptGlyph char="$" color={INDIGO} />
              <Text style={st.heroPrompt}>synapse --train mind --target anthropic</Text>
              <Caret color={INDIGO} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.md }}>
              <View style={{ flex: 1, minWidth: 240 }}>
                <Text style={st.heroTitle}>🧠 {SYNAPSE_META.titulo}</Text>
                <Text style={[st.heroSub, { color: INDIGO }]}>{SYNAPSE_META.subtitulo}</Text>
                <Text style={st.heroTesis}>{SYNAPSE_META.tesis}</Text>
              </View>
              <View style={[st.todayChip, { borderColor: INDIGO + '66', backgroundColor: INDIGO + '14' }]}>
                <Text style={st.todayLabel}>RUN LIVE</Text>
                <Text style={[st.todayValue, { color: INDIGO }]}>30′</Text>
                <Text style={st.todaySub}>espacios muertos</Text>
              </View>
            </View>
          </View>
        </GradientHero>

        {/* TELEMETRY STRIP — línea de status IDE (reemplaza los 4 RingStat) */}
        <View style={{ marginBottom: Spacing.md }}>
          <TelemetryStrip items={telemetry} />
        </View>

        {/* PHASE GRAPH — banda de checkpoints F0 → META */}
        <View style={st.graphBandTop}>
          <Text style={st.bandLabel}>◈ training graph · F0 → META</Text>
          {isDesktop ? <PhaseGraph items={PHASE_ITEMS} /> : <PhaseGraph items={PHASE_ITEMS} vertical />}
        </View>

        {/* Motor día-a-día → chat SYNAPSE */}
        <GlassPanel accent={INDIGO} style={{ marginBottom: Spacing.lg, padding: Spacing.lg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <PromptGlyph char="›" color={INDIGO} />
            <Text style={st.h3}>run loop · motor día-a-día</Text>
            <Chip label="temario real" color={INDIGO} small />
          </View>
          <Text style={st.body}>{SYNAPSE_META.nota}</Text>
        </GlassPanel>

        {/* SUB-NAV → tabs de consola */}
        <View style={{ flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.xl, flexWrap: 'wrap' }}>
          {TABS.map((tab) => (
            <PillTab key={tab.key} label={tab.label} active={sub === tab.key} onPress={() => setSub(tab.key)} accent={INDIGO} />
          ))}
        </View>

        {sub === 'hoy' && <SynapseTodayPlan done={done} onToggle={toggleDone} />}
        {sub === 'agosto' && <MiniFaseView />}
        {sub === 'ruta' && <RutaView isDesktop={isDesktop} />}
        {sub === 'biblioteca' && <BibliotecaView />}
        {sub === 'protocolo' && <ProtocoloView />}
      </View>
    </ScrollView>
  );
}

const st = StyleSheet.create({
  heroPrompt: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, letterSpacing: 0.2, ...monoText },
  heroTitle: { fontSize: FontSize.headlineSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: 1.2, lineHeight: LineHeight.headlineSm, ...monoText },
  heroSub: { fontSize: FontSize.bodyMd, fontWeight: '700', marginTop: 4, letterSpacing: 0.6, textTransform: 'uppercase' },
  heroTesis: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: 8, lineHeight: LineHeight.bodyMd, maxWidth: 620 },
  todayChip: { borderWidth: 1, borderRadius: BorderRadius.lg, paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center', minWidth: 110, ...Elevation.sm },
  todayLabel: { fontSize: 8, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.4, ...monoText },
  todayValue: { fontSize: FontSize.titleLg, fontWeight: '800', marginTop: 2, letterSpacing: -0.4, ...monoText },
  todaySub: { fontSize: 8, color: Colors.muted, marginTop: 2, letterSpacing: 0.4, ...monoText },

  // banda del PhaseGraph
  graphBandTop: { backgroundColor: '#0B1220', borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: INDIGO + '22', padding: Spacing.lg, marginBottom: Spacing.lg, ...Elevation.sm },
  graphBand: { backgroundColor: 'rgba(124,131,214,0.05)', borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: INDIGO + '22', padding: Spacing.md, marginBottom: Spacing.md },
  bandLabel: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1, textTransform: 'uppercase', marginBottom: Spacing.md, ...monoText },

  h3: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, letterSpacing: 0.2, ...monoText },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.bodyMd },
  faseCard: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderLeftWidth: 3, borderWidth: 1, borderColor: Hairline.soft, padding: Spacing.lg, marginBottom: Spacing.md, ...Elevation.sm },
  faseTag: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.8, ...monoText },
  faseTitle: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.onSurface, marginTop: 6, letterSpacing: -0.3, lineHeight: LineHeight.titleMd },
  faseDesc: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: LineHeight.bodyMd },
  faseEntreg: { fontSize: FontSize.labelMd, fontWeight: '700', marginTop: 8, letterSpacing: 0.2 },
  matCard: { backgroundColor: 'rgba(124,131,214,0.04)', borderRadius: BorderRadius.lg, borderLeftWidth: 2, padding: Spacing.md, borderWidth: 1, borderColor: Hairline.soft },
  matName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, flex: 1, minWidth: 130, letterSpacing: -0.1 },
  matRef: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 5 },
  matWhy: { fontSize: FontSize.labelMd, color: Colors.muted, marginTop: 4, lineHeight: LineHeight.labelMd },
  matMeta: { fontSize: 9, fontWeight: '800', letterSpacing: 0.4, ...monoText },
  matDur: { fontSize: 9, color: Colors.muted, letterSpacing: 0.3, ...monoText },
  catTitle: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, marginBottom: Spacing.md, letterSpacing: 0.3 },
  horRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: 10, borderTopWidth: 1, borderTopColor: Hairline.soft },
  horBadge: { borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 10, minWidth: 52, alignItems: 'center' },
  horMin: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2, ...monoText },
  horBloque: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.1 },
  horQue: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: LineHeight.labelMd },
});
