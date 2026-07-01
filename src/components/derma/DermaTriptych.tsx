import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Motion } from '../../theme/tokens';
import { DermaAtlas } from '../../lib/dermaData';
import { DiaDerma } from '../../lib/dermaDailyPlan';
import DermaLineIcon, { DermaIconName } from './DermaLineIcons';

/**
 * DermaTriptych — correlación clínica ↔ dermatoscopia ↔ histología (H&E) del MISMO caso.
 * Materializa la tesis de DERMA_META ("la correlación... distingue al élite").
 * Cada panel deep-linkea a su fuente REAL (atlas clínico / Dermoscopedia / dermpathatlas·Barnhill).
 * Solo aparece cuando el átomo tiene al menos dermatoscopia o histo (átomos oncología/dermatoscopia).
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;
const open = (u: string) => Linking.openURL(u).catch(() => {});

function Panel({ icon, title, url, accent, note }: { icon: DermaIconName; title: string; url: string | undefined; accent: string; note: string }) {
  const active = !!url;
  const texture = Platform.OS === 'web'
    ? `<svg width="100%" height="100%" viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice">
         <defs><pattern id="p-${title}" width="14" height="14" patternUnits="userSpaceOnUse">
           <path d="M14 0H0V14" fill="none" stroke="${accent}" stroke-opacity="${active ? 0.14 : 0.05}" stroke-width="0.5"/>
         </pattern></defs>
         <rect width="120" height="90" fill="url(#p-${title})"/>
       </svg>` : '';
  return (
    <TouchableOpacity activeOpacity={active ? 0.85 : 1} onPress={() => active && open(url!)} style={[st.panel, { borderColor: accent + (active ? '44' : '1F') }, active && Platform.OS === 'web' ? WEB : null]}>
      <View style={[st.thumb, { backgroundColor: DermaAtlas.ink }]}>
        {Platform.OS === 'web' ? <View style={StyleSheet.absoluteFill as any} {...({ dangerouslySetInnerHTML: { __html: texture } } as any)} /> : null}
        <DermaLineIcon name={icon} size={22} color={active ? accent : Colors.muted} />
      </View>
      <Text style={[st.pTitle, { color: active ? accent : Colors.muted }]}>{title}</Text>
      <Text style={st.pNote} numberOfLines={2}>{active ? `${note} ↗` : 'sin panel para este caso'}</Text>
    </TouchableOpacity>
  );
}

export default function DermaTriptych({ dia, accent }: { dia: DiaDerma; accent: string }) {
  if (!dia.dermatoscopiaUrl && !dia.histoUrl) return null;
  return (
    <View style={st.wrap}>
      <View style={st.head}>
        <DermaLineIcon name="dermatoscope" size={15} color={accent} />
        <Text style={[st.title, { color: accent }]}>Correlación élite · clínica ↔ dermatoscopia ↔ histología</Text>
      </View>
      <View style={st.row}>
        <Panel icon="loupe" title="Clínica" url={dia.atlasUrl || dia.access.url} accent={DermaAtlas.amethyst} note="atlas / Color Atlas" />
        <Panel icon="dermatoscope" title="Dermatoscopia" url={dia.dermatoscopiaUrl} accent={DermaAtlas.teal} note="Dermoscopedia (IDS)" />
        <Panel icon="histoDrop" title="Histología H&E" url={dia.histoUrl} accent={DermaAtlas.periwinkle} note="dermpathatlas / Barnhill" />
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  wrap: { marginTop: Spacing.sm },
  head: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: Spacing.sm },
  title: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.1, flex: 1 },
  row: { flexDirection: 'row', gap: Spacing.sm },
  panel: { flex: 1, borderWidth: 1, borderRadius: BorderRadius.lg, padding: Spacing.sm, backgroundColor: 'rgba(15,25,45,0.5)' },
  thumb: { width: '100%', aspectRatio: 4 / 3, borderRadius: BorderRadius.md, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginBottom: 7, borderWidth: 1, borderColor: 'rgba(231,234,242,0.05)' },
  pTitle: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  pNote: { fontSize: 9, color: Colors.muted, marginTop: 2, lineHeight: 12 },
});
