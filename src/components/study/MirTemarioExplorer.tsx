import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  MIR_TEMARIO_META, RENT_TIER, RentColor,
  asignaturasPorRentabilidad, prioridadDe, capUrl, MirAsignatura,
} from '../../lib/mirTemarioData';

/**
 * MirTemarioExplorer — las 30 asignaturas REALES de ProMIR ordenadas por
 * rentabilidad (chart "Distribución de preguntas MIR"), cada una desplegable a sus
 * capítulos reales (deep-links a ProMIR) + la capa de PRIORIDAD 1ª vuelta de rabi_94
 * (Google Drive: CTO × AMIR × MirAsturias). Cruce real ProMIR ⟷ Drive.
 */
const AMBER = '#F5A623';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

// tiers visibles en la leyenda (sin 'oculta', que es estado de captura)
const LEGEND: RentColor[] = ['roja', 'naranja', 'amarilla', 'verde', 'verdeOsc'];

function RentDot({ c, size = 12 }: { c: RentColor; size?: number }) {
  return <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: RENT_TIER[c].color }} />;
}

function AsignaturaCard({ a, index }: { a: MirAsignatura; index: number }) {
  const [open, setOpen] = useState(false);
  const tier = RENT_TIER[a.rentColor];
  const prio = prioridadDe(a);
  const realCaps = a.chapters.filter((c) => c.n > 0);
  return (
    <FadeUp delay={Math.min(index * 24, 360)}>
      <View style={[st.card, { borderLeftColor: tier.color }]}>
        <TouchableOpacity activeOpacity={0.82} onPress={() => setOpen((o) => !o)} style={st.head}>
          <View style={[st.rentBadge, { backgroundColor: tier.color + '1F', borderColor: tier.color + '55' }]}>
            <RentDot c={a.rentColor} size={9} />
            <Text style={[st.rentTxt, { color: tier.color }]}>{tier.rango}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={st.name} numberOfLines={1}>{a.num}. {a.name}</Text>
            <View style={st.metaRow}>
              <Text style={st.metaSub}>{realCaps.length} temas · tier {tier.label}</Text>
              {prio ? <View style={st.prioFlag}><Text style={st.prioFlagTxt}>★ rabi_94 1V</Text></View> : null}
              {a.detalle ? <View style={st.realFlag}><Text style={st.realFlagTxt}>✓ detalle real</Text></View> : null}
            </View>
          </View>
          <Text style={[st.caret, open && { color: AMBER }]}>{open ? '▾' : '▸'}</Text>
        </TouchableOpacity>

        {open && (
          <View style={st.body}>
            {/* Capa de PRIORIDAD rabi_94 (1ª vuelta) */}
            {prio && (
              <View style={[st.prioBox, { borderColor: AMBER + '40' }]}>
                <Text style={st.prioTitle}>★ Prioridad 1ª vuelta — rabi_94 (CTO × AMIR × MirAsturias)</Text>
                <Text style={st.prioLabel}>Núcleo (imprescindible):</Text>
                <View style={st.chipWrap}>
                  {prio.nucleo.map((n, i) => (
                    <View key={i} style={[st.nucleoChip]}><Text style={st.nucleoTxt}>{n}</Text></View>
                  ))}
                </View>
                {prio.complementarios && prio.complementarios.length > 0 && (
                  <>
                    <Text style={[st.prioLabel, { marginTop: 8 }]}>Complementarios:</Text>
                    <View style={st.chipWrap}>
                      {prio.complementarios.map((n, i) => (
                        <View key={i} style={st.compChip}><Text style={st.compTxt}>{n}</Text></View>
                      ))}
                    </View>
                  </>
                )}
                {prio.matices && prio.matices.map((m, i) => (
                  <Text key={i} style={st.matiz}>• {m}</Text>
                ))}
                <Text style={st.fuentes}>Fuentes: {prio.fuentes.join(' · ')}</Text>
              </View>
            )}

            {a.detalle && (
              <Text style={st.detalleNote}>
                ⭐ Esta asignatura tiene un bloque DETALLADO arriba (videos + duraciones reales verificadas en ProMIR).
              </Text>
            )}

            {/* Capítulos reales → deep-link a ProMIR */}
            <Text style={[st.prioLabel, { marginTop: prio ? 10 : 0, marginBottom: 4 }]}>Capítulos en ProMIR (toca → abre):</Text>
            {a.chapters.map((c) => (
              <TouchableOpacity key={c.capId} activeOpacity={0.8} onPress={() => openUrl(capUrl(c.capId))} style={st.capRow}>
                <Text style={[st.capN, { color: tier.color }]}>{c.n === 0 ? '·' : c.n}</Text>
                <Text style={st.capTxt} numberOfLines={2}>{c.titulo} <Text style={{ color: AMBER }}>↗</Text></Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </FadeUp>
  );
}

export default function MirTemarioExplorer() {
  const ordered = asignaturasPorRentabilidad();
  return (
    <View>
      <SectionLabel>Las 30 asignaturas de ProMIR · por rentabilidad real</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.md, padding: Spacing.lg }}>
        <Text style={st.intro}>
          <Text style={{ color: AMBER, fontWeight: '800' }}>{MIR_TEMARIO_META.totalAsignaturas} asignaturas · {MIR_TEMARIO_META.totalCapitulos} capítulos reales.</Text>
          {' '}Árbol extraído de tu ProMIR (deep-links reales). Ordenadas por el chart{' '}
          <Text style={{ color: Colors.onSurface }}>“Distribución de preguntas MIR”</Text>. Cada una cruza la{' '}
          <Text style={{ color: AMBER }}>capa de prioridad 1ª vuelta de rabi_94</Text> (CTO × AMIR × MirAsturias, Google Drive).
        </Text>
        {/* leyenda de tiers */}
        <View style={st.legend}>
          {LEGEND.map((c) => (
            <View key={c} style={st.legendItem}>
              <RentDot c={c} size={10} />
              <Text style={st.legendTxt}>{RENT_TIER[c].rango}</Text>
            </View>
          ))}
        </View>
        <Text style={st.legendNote}>{MIR_TEMARIO_META.nota}</Text>
      </GlassPanel>

      <View style={{ marginBottom: Spacing.xl }}>
        {ordered.map((a, i) => <AsignaturaCard key={a.subjectId} a={a} index={i} />)}
      </View>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder };
const st = StyleSheet.create({
  intro: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 19 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginTop: Spacing.md },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendTxt: { fontSize: 10, color: Colors.onSurfaceVariant, fontWeight: '700' },
  legendNote: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: 15 },

  card: { ...cardBase, borderLeftWidth: 3, marginBottom: Spacing.sm, overflow: 'hidden' },
  head: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, padding: Spacing.md },
  rentBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 8, minWidth: 78, justifyContent: 'center' },
  rentTxt: { fontSize: 9, fontWeight: '800' },
  name: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2, flexWrap: 'wrap' },
  metaSub: { fontSize: FontSize.labelSm, color: Colors.muted },
  prioFlag: { backgroundColor: AMBER + '1A', borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 6 },
  prioFlagTxt: { fontSize: 9, fontWeight: '800', color: AMBER },
  realFlag: { backgroundColor: Colors.green + '1A', borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 6 },
  realFlagTxt: { fontSize: 9, fontWeight: '800', color: Colors.green },
  caret: { fontSize: 16, color: Colors.muted, width: 18, textAlign: 'center' },

  body: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: Spacing.sm },
  prioBox: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.md, backgroundColor: 'rgba(245,166,35,0.05)', marginBottom: Spacing.sm },
  prioTitle: { fontSize: FontSize.labelMd, fontWeight: '800', color: AMBER, marginBottom: 6 },
  prioLabel: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.onSurfaceVariant },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 4 },
  nucleoChip: { backgroundColor: AMBER + '22', borderRadius: BorderRadius.sm, paddingVertical: 3, paddingHorizontal: 7, borderWidth: 1, borderColor: AMBER + '44' },
  nucleoTxt: { fontSize: 10, color: '#F8D89A', fontWeight: '700' },
  compChip: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: BorderRadius.sm, paddingVertical: 3, paddingHorizontal: 7 },
  compTxt: { fontSize: 10, color: Colors.onSurfaceVariant },
  matiz: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 5, lineHeight: 15 },
  fuentes: { fontSize: 9, color: Colors.muted, marginTop: 6, fontWeight: '700', letterSpacing: 0.3 },
  detalleNote: { fontSize: FontSize.labelSm, color: Colors.green, marginBottom: 8, lineHeight: 15 },

  capRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingVertical: 5, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.04)' },
  capN: { fontSize: FontSize.labelMd, fontWeight: '800', width: 18, textAlign: 'center' },
  capTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
});
