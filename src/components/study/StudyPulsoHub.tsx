import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, gridStyle, gridItemStyle } from '../empresa/primitives';
import { GradientHero, MegaStat, RingStat, FadeUp } from '../empresa/visuals';
import {
  ESTUDIO_PULSO_META, ESTUDIO_RAMAS, ESTUDIO_MESES, ESTUDIO_LIBROS, ESTUDIO_REGLAS,
  ESTUDIO_REGIMEN, ESTUDIO_RECURSOS, ESTUDIO_JOSEPH_31AGO, ESTUDIO_NOTA, PrioLibro,
} from '../../lib/estudioPulsoData';

/**
 * StudyPulsoHub — "Estudio Pulso": el plan de 96 días del fundador, dentro de Business.
 * Render como View (vive dentro del ScrollView de EmpresaHub). Accent oro Pulso.
 */

const GOLD = ESTUDIO_PULSO_META.accent;
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
const prioColor = (p: PrioLibro) => (p === 1 ? Colors.green : p === 2 ? Colors.amber : Colors.muted);

const CATS = Array.from(new Set(ESTUDIO_LIBROS.map(l => l.categoria)));
const P1 = ESTUDIO_LIBROS.filter(l => l.prioridad === 1).length;
const HORAS = ESTUDIO_LIBROS.reduce((n, l) => n + l.horas, 0);

export default function StudyPulsoHub({ onBack }: { onBack: () => void }) {
  return (
    <View>
      <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={st.breadcrumb}>
        <Text style={st.breadcrumbText}>‹ Pulso</Text>
        <Text style={st.breadcrumbSep}>/ Estudio</Text>
      </TouchableOpacity>

      {/* HERO */}
      <GradientHero from="#2A2517" to="#0A1424" style={{ marginBottom: Spacing.lg, borderColor: GOLD + '33' }}>
        <Text style={st.heroTitle}>📚 {ESTUDIO_PULSO_META.titulo}</Text>
        <Text style={[st.heroSub, { color: GOLD }]}>{ESTUDIO_PULSO_META.subtitulo}</Text>
        <Text style={st.heroTesis}>{ESTUDIO_PULSO_META.resumen}</Text>
      </GradientHero>

      {/* MEGA STAT */}
      <MegaStat value={ESTUDIO_LIBROS.length} label="Libros priorizados con output operativo" accent={GOLD}
        footnote={`96 días · 2h/día · ${HORAS}h de lectura activa · ${P1} esenciales (P1)`} />

      {/* RINGS / RAMAS */}
      <View style={st.ringRow}>
        <View style={st.ringCard}><RingStat value={60} label="Rama Producto" sub="referente clínico" accent={GOLD} suffix="%" /></View>
        <View style={st.ringCard}><RingStat value={40} label="Rama Marketing" sub="máquina de venta" accent={Colors.blue} suffix="%" /></View>
        <View style={st.ringCard}><RingStat value={P1} max={ESTUDIO_LIBROS.length} label="Esenciales" sub="prioridad 1" accent={Colors.green} /></View>
        <View style={st.ringCard}><RingStat value={96} max={96} label="Días" sub="28 may → 31 ago" accent={Colors.amber} /></View>
      </View>

      {/* MESES */}
      <SectionLabel>Arco de 3 meses</SectionLabel>
      <View style={[gridStyle(220), { marginBottom: Spacing.xl }]}>
        {ESTUDIO_MESES.map((m, i) => (
          <View key={i} style={gridItemStyle(220)}>
            <FadeUp delay={i * 70}>
              <View style={[st.mesCard, { borderLeftColor: GOLD }]}>
                <Text style={[st.mesTag, { color: GOLD }]}>{m.mes}</Text>
                <Text style={st.mesFase}>{m.fase} · {m.horas}</Text>
                <Text style={st.body}>{m.desc}</Text>
              </View>
            </FadeUp>
          </View>
        ))}
      </View>

      {/* REGLAS */}
      <SectionLabel>7 reglas no negociables</SectionLabel>
      <GlassPanel accent={Colors.coral} style={{ marginBottom: Spacing.xl }}>
        {ESTUDIO_REGLAS.map((r, i) => (
          <View key={i} style={st.reglaRow}>
            <Text style={[st.reglaN, { color: Colors.coral }]}>{i + 1}</Text>
            <Text style={[st.body, { flex: 1 }]}>{r}</Text>
          </View>
        ))}
      </GlassPanel>

      {/* RÉGIMEN BIOLÓGICO */}
      <SectionLabel>Régimen biológico · pre-requisito innegociable</SectionLabel>
      <View style={[gridStyle(240), { marginBottom: Spacing.xl }]}>
        {ESTUDIO_REGIMEN.map((r, i) => (
          <View key={i} style={gridItemStyle(240)}>
            <View style={st.regCard}>
              <Text style={st.regPilar}>{r.pilar}</Text>
              <Text style={st.body}>{r.detalle}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* BIBLIOTECA */}
      <SectionLabel>Biblioteca priorizada · 28 libros (output por libro)</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {CATS.map((cat, ci) => (
          <FadeUp key={cat} delay={ci * 40}>
            <View style={st.catCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={st.catTitle}>{cat}</Text>
                <Chip label={ESTUDIO_LIBROS.find(l => l.categoria === cat)!.marca} color={GOLD} small />
              </View>
              {ESTUDIO_LIBROS.filter(l => l.categoria === cat).map(l => (
                <View key={l.n} style={st.libroRow}>
                  <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: prioColor(l.prioridad), marginRight: 8, marginTop: 5 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={st.libroName}>{l.libro} <Text style={st.libroAutor}>· {l.autor}</Text></Text>
                    <Text style={st.libroOut}>{l.output}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end', marginLeft: 6 }}>
                    <Text style={[st.libroPrio, { color: prioColor(l.prioridad) }]}>P{l.prioridad}</Text>
                    <Text style={st.libroHoras}>{l.horas}h</Text>
                  </View>
                </View>
              ))}
            </View>
          </FadeUp>
        ))}
      </View>

      {/* RECURSOS */}
      <SectionLabel>Recursos (tiempo "muerto": manejando, gym, comiendo)</SectionLabel>
      <View style={[gridStyle(220), { marginBottom: Spacing.xl }]}>
        {ESTUDIO_RECURSOS.map((r, i) => (
          <View key={i} style={gridItemStyle(220)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(r.url)} style={st.recCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={st.recLabel}>{r.label} ↗</Text>
                <Chip label={r.tipo} color={Colors.muted} small />
              </View>
              <Text style={st.recNota}>{r.nota}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* JOSEPH 31 AGO */}
      <SectionLabel>El Joseph del 31 de agosto 2026</SectionLabel>
      <View style={[gridStyle(240), { marginBottom: Spacing.xl }]}>
        {ESTUDIO_JOSEPH_31AGO.map((j, i) => (
          <View key={i} style={gridItemStyle(240)}>
            <View style={[st.jCard, { borderLeftColor: GOLD }]}>
              <Text style={[st.jDim, { color: GOLD }]}>{j.dim}</Text>
              <Text style={st.body}>{j.txt}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* NOTA */}
      <GlassPanel accent={GOLD} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
        <Text style={st.body}>{ESTUDIO_NOTA}</Text>
      </GlassPanel>
    </View>
  );
}

const cardBase = {
  backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg,
  borderWidth: 1, borderColor: DesktopColors.glassBorder, padding: Spacing.lg,
};

const st = StyleSheet.create({
  breadcrumb: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Spacing.md, alignSelf: 'flex-start' },
  breadcrumbText: { fontSize: FontSize.labelLg, color: GOLD, fontWeight: '700' },
  breadcrumbSep: { fontSize: FontSize.labelLg, color: Colors.muted },

  heroTitle: { fontSize: FontSize.headlineSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5 },
  heroSub: { fontSize: FontSize.labelLg, marginTop: 4, fontWeight: '600' },
  heroTesis: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: Spacing.md, lineHeight: 20, maxWidth: 640 },

  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 19 },

  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  ringCard: { flex: 1, minWidth: 140, backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: DesktopColors.glassBorder, paddingVertical: Spacing.lg, paddingHorizontal: Spacing.md, alignItems: 'center' },

  mesCard: { ...cardBase, borderLeftWidth: 3, minHeight: 130 },
  mesTag: { fontSize: FontSize.labelMd, fontWeight: '800' },
  mesFase: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, marginTop: 2, marginBottom: 4 },

  reglaRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 6 },
  reglaN: { fontSize: FontSize.bodyMd, fontWeight: '800', width: 18 },

  regCard: { ...cardBase },
  regPilar: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, marginBottom: 4 },

  catCard: { ...cardBase, marginBottom: Spacing.sm },
  catTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, textTransform: 'uppercase', letterSpacing: 0.5 },
  libroRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 6, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  libroName: { fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '600' },
  libroAutor: { fontSize: FontSize.labelMd, color: Colors.muted, fontWeight: '400' },
  libroOut: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 1, lineHeight: 15 },
  libroPrio: { fontSize: FontSize.labelMd, fontWeight: '800' },
  libroHoras: { fontSize: FontSize.labelSm, color: Colors.muted },

  recCard: { ...cardBase },
  recLabel: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, flex: 1 },
  recNota: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 6 },

  jCard: { ...cardBase, borderLeftWidth: 3 },
  jDim: { fontSize: FontSize.labelLg, fontWeight: '800', marginBottom: 4 },
});
