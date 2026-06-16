import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { SectionLabel, Chip, GlassPanel, PillTab, gridStyle, gridItemStyle } from './primitives';
import { GradientHero, RingStat, FadeUp } from './visuals';
import {
  AURUM_META, AURUM_KPIS, AURUM_FASES, AURUM_BIBLIOTECA, AURUM_PROTOCOLO,
  AURUM_NIVEL_META, AURUM_ADVERTENCIAS, AurumMaterial, AurumConfianza,
} from '../../lib/aurumData';
import { AURUM_PLAN_META } from '../../lib/aurumDailyPlan';
import { loadDone, saveDone } from '../../lib/studyProgress';
import AurumTodayPlan from './AurumTodayPlan';

/**
 * AurumHub — "AURUM · Closer de ventas de élite", dentro de Business → Pulso.
 * MISMO molde que SynapseHub: HERO + KPIs + sub-nav (Hoy/Ruta/Biblioteca/Protocolo).
 * Render como View (vive dentro del ScrollView de EmpresaHub, con breadcrumb a Pulso).
 * El motor día-a-día (pestaña ⚡ Hoy) son misiones generadas: src/lib/aurumDailyPlan.ts.
 * Acento dorado AURUM. Progreso real manual (PlanKey 'aurum', empieza 0%).
 */
const GOLD = AURUM_META.accent;
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

type Sub = 'hoy' | 'ruta' | 'biblioteca' | 'protocolo';

const CONF_COLOR: Record<AurumConfianza, string> = {
  verificado: Colors.green,
  estable: Colors.amber,
  incierto: Colors.coral,
};
const CONF_LABEL: Record<AurumConfianza, string> = {
  verificado: 'verificado', estable: 'estable', incierto: 'verifica el link',
};

function MaterialRow({ m }: { m: AurumMaterial }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(m.url)} style={st.matCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
        <Text style={st.matName} numberOfLines={2}>{m.nombre} ↗</Text>
        <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
          <Chip label={m.idioma === 'es' ? '🇪🇸 ES' : '🇬🇧 EN'} color={Colors.muted} small />
          <Chip label={CONF_LABEL[m.confianza]} color={CONF_COLOR[m.confianza]} small />
        </View>
      </View>
      <Text style={st.matRef}>{m.referente}</Text>
      <Text style={st.matWhy}>{m.porQue}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
        <Chip label={m.tipo} color={Colors.muted} small />
      </View>
    </TouchableOpacity>
  );
}

/** RUTA — las 7 fases del programa, de mentalidad a maestría. */
function RutaView() {
  return (
    <View>
      <SectionLabel>Ruta · de vendedor a closer de élite (el orden importa)</SectionLabel>
      {AURUM_FASES.map((f, i) => {
        const activa = f.estado === 'activa';
        const meta = f.estado === 'meta';
        const acc = activa ? GOLD : meta ? Colors.green : Colors.muted;
        return (
          <FadeUp key={f.id} delay={i * 60}>
            <View style={[st.faseCard, { borderLeftColor: acc }, activa && { backgroundColor: GOLD + '0E' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                <Text style={[st.faseTag, { color: acc }]}>{f.fase} · {f.duracion}</Text>
                {activa ? <Chip label="EMPIEZA AQUÍ" color={GOLD} small /> : meta ? <Chip label="META" color={Colors.green} small /> : null}
              </View>
              <Text style={st.faseTitle}>{f.titulo}</Text>
              <Text style={st.faseDesc}>{f.objetivo}</Text>
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

/** BIBLIOTECA — los 93 recursos gratis, por tipo. */
function BibliotecaView() {
  return (
    <View>
      <SectionLabel>Biblioteca · solo contenido GRATIS de los referentes #1 (cero cursos pagos)</SectionLabel>
      {AURUM_BIBLIOTECA.map((cat, i) => (
        <FadeUp key={i} delay={i * 50}>
          <View style={{ marginBottom: Spacing.xl }}>
            <Text style={st.catTitle}>{cat.icon} {cat.categoria} · {cat.items.length}</Text>
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

/** PROTOCOLO — el bloque diario L-V + los entregables por fase + honestidad. */
function ProtocoloView() {
  return (
    <View>
      <SectionLabel>Protocolo · núcleo 30-60 min en {AURUM_PLAN_META.ventana} (L-V) + lectura en tus huecos · sáb/dom libres</SectionLabel>
      <GlassPanel accent={GOLD} style={{ marginBottom: Spacing.xl }}>
        {AURUM_PROTOCOLO.map((h, i) => (
          <View key={i} style={[st.horRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={[st.horBadge, { backgroundColor: GOLD + '1A' }]}>
              <Text style={[st.horMin, { color: GOLD }]}>{h.min}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={st.horBloque}>{h.bloque}</Text>
              <Text style={st.horQue}>{h.que}</Text>
            </View>
            <Chip label={h.formato} color={h.formato.includes('audio') ? GOLD : Colors.muted} small />
          </View>
        ))}
      </GlassPanel>

      <SectionLabel>El nivel meta · los entregables que demuestran que eres closer</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {AURUM_NIVEL_META.map((n, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 5, alignItems: 'flex-start' }}>
            <Text style={{ color: GOLD }}>◆</Text>
            <Text style={[st.body, { flex: 1 }]}>
              <Text style={{ fontWeight: '700', color: Colors.onSurface }}>{n.skill}</Text> — {n.fuente}
            </Text>
          </View>
        ))}
      </GlassPanel>

      <SectionLabel>Honestidad (no inventado)</SectionLabel>
      <GlassPanel accent={Colors.amber} style={{ marginBottom: Spacing.xl }}>
        {AURUM_ADVERTENCIAS.map((a, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 5 }}>
            <Text style={{ color: Colors.amber }}>•</Text>
            <Text style={[st.body, { flex: 1 }]}>{a}</Text>
          </View>
        ))}
      </GlassPanel>
    </View>
  );
}

export default function AurumHub({ onBack }: { onBack?: () => void }) {
  const [sub, setSub] = useState<Sub>('hoy');
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone('aurum')));
  const toggleDone = (d: number) => setDone((prev) => {
    const n = new Set(prev);
    if (n.has(d)) n.delete(d); else n.add(d);
    saveDone('aurum', Array.from(n));
    return n;
  });

  return (
    <View>
      {onBack ? (
        <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={st.breadcrumb}>
          <Text style={st.breadcrumbText}>‹ Pulso</Text>
          <Text style={st.breadcrumbSep}>/ AURUM</Text>
        </TouchableOpacity>
      ) : null}

      {/* HERO */}
      <GradientHero from="#2A2517" to="#0A1424" style={{ marginBottom: Spacing.lg, borderColor: GOLD + '33' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.md }}>
          <View style={{ flex: 1, minWidth: 240 }}>
            <Text style={st.heroTitle}>🪙 {AURUM_META.titulo}</Text>
            <Text style={[st.heroSub, { color: GOLD }]}>{AURUM_META.subtitulo}</Text>
            <Text style={st.heroTesis}>{AURUM_META.tesis}</Text>
          </View>
          <View style={[st.todayChip, { borderColor: GOLD + '66', backgroundColor: GOLD + '14' }]}>
            <Text style={st.todayLabel}>HOY · {AURUM_PLAN_META.ventana}</Text>
            <Text style={[st.todayValue, { color: GOLD }]}>30-60'</Text>
            <Text style={st.todaySub}>L-V · ver+practicar</Text>
          </View>
        </View>
      </GradientHero>

      {/* KPIs */}
      <View style={st.ringRow}>
        <View style={st.ringCard}><RingStat value={AURUM_KPIS.fases} max={AURUM_KPIS.fases} label="Fases" sub="ruta completa" accent={GOLD} /></View>
        <View style={st.ringCard}><RingStat value={AURUM_PLAN_META.semanas} max={AURUM_PLAN_META.semanas} label="Semanas" sub="6 meses · L-V" accent={Colors.blue} /></View>
        <View style={st.ringCard}><RingStat value={AURUM_KPIS.materialesVerificados} max={AURUM_KPIS.materialesVerificados} label="Recursos" sub="gratis · referentes #1" accent={Colors.green} /></View>
        <View style={st.ringCard}><RingStat value={done.size} max={AURUM_PLAN_META.totalDias} label="Completadas" sub={`misiones reales · ${Math.round((done.size / AURUM_PLAN_META.totalDias) * 100)}%`} accent={Colors.amber} /></View>
      </View>

      {/* Motor día-a-día */}
      <GlassPanel accent={GOLD} style={{ marginBottom: Spacing.lg, padding: Spacing.lg }}>
        <Text style={st.h3}>⚙ Motor día-a-día</Text>
        <Text style={st.body}>{AURUM_META.nota}</Text>
      </GlassPanel>

      {/* SUB-NAV */}
      <View style={{ flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.xl, flexWrap: 'wrap' }}>
        <PillTab label="⚡ Hoy" active={sub === 'hoy'} onPress={() => setSub('hoy')} accent={GOLD} />
        <PillTab label="◈ Ruta" active={sub === 'ruta'} onPress={() => setSub('ruta')} accent={GOLD} />
        <PillTab label="⌘ Biblioteca" active={sub === 'biblioteca'} onPress={() => setSub('biblioteca')} accent={GOLD} />
        <PillTab label="🧭 Protocolo" active={sub === 'protocolo'} onPress={() => setSub('protocolo')} accent={GOLD} />
      </View>

      {sub === 'hoy' && <AurumTodayPlan done={done} onToggle={toggleDone} />}
      {sub === 'ruta' && <RutaView />}
      {sub === 'biblioteca' && <BibliotecaView />}
      {sub === 'protocolo' && <ProtocoloView />}
    </View>
  );
}

const st = StyleSheet.create({
  breadcrumb: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Spacing.md, alignSelf: 'flex-start' },
  breadcrumbText: { fontSize: FontSize.labelLg, color: GOLD, fontWeight: '700' },
  breadcrumbSep: { fontSize: FontSize.labelLg, color: Colors.muted },

  heroTitle: { fontSize: FontSize.headlineSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: 0.4 },
  heroSub: { fontSize: FontSize.bodyMd, fontWeight: '700', marginTop: 4, letterSpacing: 0.6 },
  heroTesis: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: 8, lineHeight: 20 },
  todayChip: { borderWidth: 1, borderRadius: BorderRadius.lg, paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center', minWidth: 120 },
  todayLabel: { fontSize: 9, fontWeight: '700', color: Colors.muted, letterSpacing: 1.2 },
  todayValue: { fontSize: FontSize.titleLg, fontWeight: '800', marginTop: 2 },
  todaySub: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  ringCard: { flexGrow: 1, flexBasis: 150, backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.xl, paddingVertical: Spacing.lg, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  h3: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: 6 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 20 },
  faseCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, borderLeftWidth: 3, padding: Spacing.lg, marginBottom: Spacing.md },
  faseTag: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 1 },
  faseTitle: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.onSurface, marginTop: 6 },
  faseDesc: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 19 },
  faseEntreg: { fontSize: FontSize.labelMd, fontWeight: '700', marginTop: 8 },
  matCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: BorderRadius.lg, padding: Spacing.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  matName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, flex: 1, minWidth: 150 },
  matRef: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 4 },
  matWhy: { fontSize: FontSize.labelMd, color: Colors.muted, marginTop: 4, lineHeight: 17 },
  catTitle: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, marginBottom: Spacing.md, letterSpacing: 0.3 },
  horRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  horBadge: { borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 10, minWidth: 52, alignItems: 'center' },
  horMin: { fontSize: FontSize.labelMd, fontWeight: '800' },
  horBloque: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  horQue: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 17 },
});
