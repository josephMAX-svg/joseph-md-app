import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors, BorderRadius, Motion } from '../../theme/tokens';
import { SKIN_TONES, SkinTone, DermaAtlas } from '../../lib/dermaData';

/**
 * SkinToneToggle — rampa Fitzpatrick I–VI FUNCIONAL (no decorativa).
 * Firma del atlas: eleva "skin of color" de nota a eje. Coherente con el ángulo Perú.
 * Estado controlado por el shell (DermaHub). Marco de swatch en oro cuando activo.
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;

export default function SkinToneToggle({
  value, onChange, compact = false,
}: { value: SkinTone['id']; onChange: (id: SkinTone['id']) => void; compact?: boolean }) {
  return (
    <View style={st.wrap}>
      {!compact && <Text style={st.lbl}>FOTOTIPO</Text>}
      <View style={st.row}>
        {SKIN_TONES.map((t) => {
          const on = t.id === value;
          return (
            <TouchableOpacity
              key={t.id}
              activeOpacity={0.85}
              onPress={() => onChange(t.id)}
              style={[
                st.swatch,
                { backgroundColor: t.hex },
                on ? st.swatchOn : st.swatchOff,
                Platform.OS === 'web' ? WEB : null,
              ]}
            >
              <Text style={[st.roman, { color: t.id === 'I' || t.id === 'II' ? '#4A2C1E' : '#F3E9DF' }]}>{t.id}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  wrap: { alignItems: 'flex-start' },
  lbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.4, marginBottom: 6 },
  row: { flexDirection: 'row', gap: 5, padding: 4, borderRadius: BorderRadius.full, backgroundColor: 'rgba(10,15,28,0.6)', borderWidth: 1, borderColor: 'rgba(200,169,106,0.20)' },
  swatch: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  swatchOn: { borderColor: DermaAtlas.gold, transform: [{ scale: 1.12 }] },
  swatchOff: { borderColor: 'rgba(255,255,255,0.10)' },
  roman: { fontSize: 9, fontWeight: '900', letterSpacing: 0.2, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },
});
