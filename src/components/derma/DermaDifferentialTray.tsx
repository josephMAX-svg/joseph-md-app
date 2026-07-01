import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Motion, LineHeight } from '../../theme/tokens';
import { DermaAtlas } from '../../lib/dermaData';
import DermaLineIcon from './DermaLineIcons';

/**
 * DermaDifferentialTray — "construye tu diferencial" (método Palmerton).
 * Para el caso del día: Joseph nombra sus DDx CIEGOS (sin ver la clave), luego
 * revela el diferencial correcto + discriminadores. Convierte el pre-test 3Q ciegas
 * en un ejercicio VISUAL de diferencial. Sin estado persistido (ejercicio efímero por día).
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;

export default function DermaDifferentialTray({ ddx, diaKey }: { ddx: string[]; diaKey: number }) {
  const [revealed, setRevealed] = useState(false);
  // reset al cambiar de día
  React.useEffect(() => { setRevealed(false); }, [diaKey]);
  if (!ddx || ddx.length === 0) return null;

  return (
    <View style={st.card}>
      <View style={st.head}>
        <DermaLineIcon name="differential" size={17} color={DermaAtlas.amethyst} />
        <Text style={st.title}>Construye tu diferencial</Text>
        <Text style={st.method}>método Palmerton · ciego primero</Text>
      </View>

      {!revealed ? (
        <>
          <Text style={st.prompt}>Antes de ver la clave: nombra en voz alta (o a papel) tus 3–4 diagnósticos diferenciales para la lámina de hoy. Un discriminador por cada uno.</Text>
          <View style={st.blindRows}>
            {[1, 2, 3, 4].map((n) => (
              <View key={n} style={st.blindRow}>
                <Text style={st.blindN}>{n}</Text>
                <View style={st.blindLine} />
              </View>
            ))}
          </View>
          <TouchableOpacity activeOpacity={0.85} onPress={() => setRevealed(true)} style={[st.revealBtn, Platform.OS === 'web' ? WEB : null]}>
            <Text style={st.revealTxt}>Ya lo dije → revelar el diferencial</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={st.revealedLbl}>DIFERENCIAL DEL CASO · compáralo con el tuyo</Text>
          <View style={st.ddxGrid}>
            {ddx.map((d, i) => (
              <View key={d} style={[st.ddxChip, i === 0 && st.ddxChipTop]}>
                <Text style={[st.ddxTxt, i === 0 && st.ddxTxtTop]}>{i === 0 ? '◆ ' : ''}{d}</Text>
              </View>
            ))}
          </View>
          <Text style={st.calibrate}>Recalibra: ¿qué DDx te faltó? ¿cuál pusiste de más? Ese hueco → 1 APEX (Palmerton).</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setRevealed(false)} style={Platform.OS === 'web' ? WEB : null}>
            <Text style={st.redo}>↩ ocultar y repetir ciego</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  card: { backgroundColor: 'rgba(154,123,200,0.06)', borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: 'rgba(154,123,200,0.30)', padding: Spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: Spacing.sm },
  title: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  method: { fontSize: 9, color: DermaAtlas.amethyst, fontWeight: '700', letterSpacing: 0.3 },
  prompt: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 18, marginBottom: Spacing.sm },
  blindRows: { gap: 7, marginBottom: Spacing.md },
  blindRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  blindN: { fontSize: FontSize.labelMd, fontWeight: '800', color: DermaAtlas.amethyst, width: 16 },
  blindLine: { flex: 1, height: 1, borderBottomWidth: 1, borderStyle: 'dashed' as any, borderColor: 'rgba(154,123,200,0.35)' },
  revealBtn: { alignSelf: 'flex-start', paddingVertical: 8, paddingHorizontal: 14, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: DermaAtlas.amethyst, backgroundColor: 'rgba(154,123,200,0.12)' },
  revealTxt: { fontSize: FontSize.labelMd, fontWeight: '800', color: DermaAtlas.amethyst, letterSpacing: 0.2 },
  revealedLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.2, marginBottom: 8 },
  ddxGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: Spacing.sm },
  ddxChip: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: 'rgba(231,234,242,0.12)', backgroundColor: 'rgba(255,255,255,0.03)' },
  ddxChipTop: { borderColor: DermaAtlas.gold, backgroundColor: 'rgba(200,169,106,0.12)' },
  ddxTxt: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, fontWeight: '600' },
  ddxTxtTop: { color: DermaAtlas.gold, fontWeight: '800' },
  calibrate: { fontSize: FontSize.labelSm, color: Colors.muted, lineHeight: LineHeight.labelSm, marginBottom: Spacing.sm, fontStyle: 'italic' },
  redo: { fontSize: FontSize.labelSm, color: DermaAtlas.amethyst, fontWeight: '700' },
});
