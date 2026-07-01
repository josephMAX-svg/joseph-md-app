import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Motion, LineHeight } from '../../theme/tokens';
import { DermaAtlas, DERMOSCOPY_STRUCTS } from '../../lib/dermaData';
import DermaLineIcon from './DermaLineIcons';

/**
 * DermaDermoscopyKey — leyenda de estructuras dermatoscópicas normalizadas (IDS).
 * Chips clicables hacia Dermoscopedia (firma de subespecialidad). Deep-links reales.
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;
const open = (u: string) => Linking.openURL(u).catch(() => {});

export default function DermaDermoscopyKey() {
  return (
    <View style={st.card}>
      <View style={st.head}>
        <DermaLineIcon name="dermatoscope" size={16} color={DermaAtlas.teal} />
        <Text style={st.title}>Leyenda dermatoscópica · estructuras normalizadas (IDS)</Text>
      </View>
      <View style={st.grid}>
        {DERMOSCOPY_STRUCTS.map((s) => (
          <TouchableOpacity key={s.k} activeOpacity={0.85} onPress={() => open(s.url)} style={[st.item, Platform.OS === 'web' ? WEB : null]}>
            <Text style={st.k}>{s.k} ↗</Text>
            <Text style={st.nota} numberOfLines={2}>{s.nota}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  card: { backgroundColor: 'rgba(15,25,45,0.5)', borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: 'rgba(107,184,176,0.22)', padding: Spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: Spacing.sm },
  title: { fontSize: FontSize.labelMd, fontWeight: '800', color: DermaAtlas.teal, letterSpacing: 0.2, flex: 1 },
  grid: { ...(Platform.OS === 'web' ? ({ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 } as any) : { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }) },
  item: { borderWidth: 1, borderColor: 'rgba(231,234,242,0.08)', borderRadius: BorderRadius.md, padding: Spacing.sm, backgroundColor: 'rgba(255,255,255,0.02)', ...(Platform.OS === 'web' ? {} : { flexBasis: 150, flexGrow: 1 }) },
  k: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.1 },
  nota: { fontSize: 10, color: Colors.muted, marginTop: 3, lineHeight: LineHeight.labelSm },
});
