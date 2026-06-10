import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import { RESEARCH_LINES, CLUSTER_COLOR, CLUSTER_LABEL, LineaResearch, Cluster } from '../../lib/researchProgram';

/**
 * ResearchLinesExplorer — las 8 líneas de investigación (L0–L8). Cada tarjeta es expandible:
 * gap, SR derivable, journals, colaboradores, cuello de botella, Mayo score. Botones que abren
 * PubMed (semilla de búsqueda real) y el paper ancla. Color por cluster.
 */
const TEAL = '#0FD4A0';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

const ESTADO_COLOR: Record<LineaResearch['estado'], string> = {
  completada: TEAL, activa: '#F5A623', 'pre-protocolo': '#2E7CF6', backlog: Colors.muted,
};
const ESTADO_LBL: Record<LineaResearch['estado'], string> = {
  completada: '✓ completada', activa: '● activa', 'pre-protocolo': 'pre-protocolo', backlog: 'backlog',
};

function LineCard({ l }: { l: LineaResearch }) {
  const [open, setOpen] = useState(l.estado === 'activa');
  const c = CLUSTER_COLOR[l.cluster];
  return (
    <View style={[st.card, { borderColor: c + (open ? '77' : '2E') }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
        <View style={st.head}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={[st.codeBadge, { backgroundColor: c + '1F', borderColor: c + '66' }]}>
              <Text style={[st.codeTxt, { color: c }]}>{l.code}</Text>
            </View>
            <Text style={st.name} numberOfLines={open ? 2 : 1}>{open ? '▾' : '▸'} {l.nombre}</Text>
          </View>
          {l.mayoScore > 0 && <Text style={[st.mayo, { color: c }]}>{l.mayoScore}/40</Text>}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }}>
          <Chip label={CLUSTER_LABEL[l.cluster]} color={c} small />
          <Chip label={ESTADO_LBL[l.estado]} color={ESTADO_COLOR[l.estado]} small />
          {l.srTag && <Chip label={l.srTag} color={c} small />}
        </View>
      </TouchableOpacity>

      {open && (
        <View style={{ marginTop: 10, gap: 8 }}>
          <View><Text style={st.lbl}>⚠ GAP</Text><Text style={st.txt}>{l.gap}</Text></View>
          <View><Text style={[st.lbl, { color: c }]}>🔬 SR DERIVABLE{l.srTag ? ` · ${l.srTag}` : ''}</Text><Text style={st.txt}>{l.srDerivable}</Text></View>
          <View><Text style={st.lbl}>📰 JOURNALS</Text><Text style={st.txt}>{l.journals.join(' · ')}</Text></View>
          <View><Text style={st.lbl}>🤝 COLABORADORES</Text><Text style={st.txt}>{l.colaboradores.join(' · ')}</Text></View>
          <View><Text style={[st.lbl, { color: Colors.coral }]}>⛔ CUELLO DE BOTELLA</Text><Text style={st.txt}>{l.cuelloBotella}</Text></View>
          <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 2 }}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(l.pubmedUrl)} style={[st.btn, { borderColor: c + '88' }]}>
              <Text style={[st.btnTxt, { color: c }]}>🔎 Semilla en PubMed ↗</Text>
            </TouchableOpacity>
            {l.fichaUrl && (
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(l.fichaUrl!)} style={[st.btn, { borderColor: c + '88' }]}>
                <Text style={[st.btnTxt, { color: c }]}>📄 Paper ancla ↗</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

export default function ResearchLinesExplorer() {
  const clusters: Cluster[] = ['estetica', 'acne_qol', 'energia', 'ia'];
  return (
    <View>
      <SectionLabel>8 líneas · énfasis estética estructural (L1–L4, L7)</SectionLabel>
      <Text style={st.intro}>
        Cada línea es un silo de contexto con una SR derivable ($0, sin comité de ética). El plan día-a-día
        ejecuta SR-1 (L4) y luego SR-2 (L5). Toca una línea para ver su gap, SR, journals y abrir la semilla
        de búsqueda real.
      </Text>

      {/* leyenda de clusters */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: Spacing.md }}>
        {clusters.map((cl) => (
          <View key={cl} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: CLUSTER_COLOR[cl] }} />
            <Text style={st.legend}>{CLUSTER_LABEL[cl]}</Text>
          </View>
        ))}
      </View>

      {RESEARCH_LINES.map((l, i) => <FadeUp key={l.id} delay={i * 35}><LineCard l={l} /></FadeUp>)}
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder };
const st = StyleSheet.create({
  intro: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17, marginBottom: Spacing.md },
  legend: { fontSize: 10, color: Colors.muted, fontWeight: '600' },
  card: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: 8 },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  codeBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 2, paddingHorizontal: 9 },
  codeTxt: { fontSize: FontSize.labelMd, fontWeight: '900' },
  name: { flex: 1, fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  mayo: { fontSize: FontSize.labelLg, fontWeight: '900', marginLeft: 8 },
  lbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.5, marginBottom: 2 },
  txt: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
  btn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 11 },
  btnTxt: { fontSize: FontSize.labelSm, fontWeight: '800' },
});
