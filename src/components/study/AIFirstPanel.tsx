import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { AI_FIRST_SEGMENTOS } from '../../lib/aiFirstTools';

/**
 * AIFirstPanel — tarjeta plegable "🤖 Estudiar/operar CON IA" para cualquier segmento.
 * Datos verificados en src/lib/aiFirstTools.ts. Recordatorio fijo: la IA es APOYO, el criterio es tuyo.
 */
const AI = Colors.teal; // teal IA apagado (#6BB8B0) — migrado de #2DD4BF neón

export default function AIFirstPanel({ segmento, accent = AI }: { segmento: string; accent?: string }) {
  const seg = AI_FIRST_SEGMENTOS[segmento];
  const [open, setOpen] = useState(false);
  if (!seg) return null;
  return (
    <View style={[st.card, { borderColor: accent + '55' }]}>
      <TouchableOpacity onPress={() => setOpen((o) => !o)} activeOpacity={0.8} style={st.head}>
        <View style={{ flex: 1 }}>
          <Text style={st.title}>🤖 {seg.titulo}</Text>
          {!open && <Text style={st.hint}>Estudiar/operar CON IA · {seg.herramientas.length} herramientas verificadas — toca para ver</Text>}
        </View>
        <Text style={[st.toggle, { color: accent }]}>{open ? '−' : '+'}</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: Spacing.sm }}>
          <Text style={st.principio}>{seg.principio}</Text>

          <Text style={[st.subh, { color: accent }]}>Herramientas</Text>
          {seg.herramientas.map((h, i) => (
            <TouchableOpacity key={i} onPress={() => Linking.openURL(h.url).catch(() => {})} activeOpacity={0.8} style={[st.tool, { borderLeftColor: accent }]}>
              <Text style={st.toolName} numberOfLines={2}>{h.nombre} ↗ <Text style={st.idi}>· {h.idioma}</Text></Text>
              <Text style={st.toolWhy}>{h.porQue}</Text>
              <Text style={[st.toolUse, { color: accent }]}>▸ {h.comoUsar}</Text>
            </TouchableOpacity>
          ))}

          <Text style={[st.subh, { color: accent }]}>Cómo integrarlo (medible, no consumo)</Text>
          {seg.integracion.map((x, i) => (
            <View key={i} style={st.liRow}><Text style={{ color: accent }}>•</Text><Text style={st.li}>{x}</Text></View>
          ))}

          <Text style={[st.subh, { color: Colors.amber }]}>⚠ Límites · la IA es apoyo, NO fuente clínica</Text>
          {seg.advertencias.map((x, i) => (
            <View key={i} style={st.liRow}><Text style={{ color: Colors.amber }}>•</Text><Text style={st.liWarn}>{x}</Text></View>
          ))}
        </View>
      )}
    </View>
  );
}

const WEB_LINK = { cursor: 'pointer', transition: Motion.base } as any;
const st = StyleSheet.create({
  card: { backgroundColor: 'rgba(107,184,176,0.06)', borderRadius: BorderRadius.lg, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.lg, ...Elevation.sm },
  head: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, ...WEB_LINK },
  title: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: 0.2 },
  hint: { fontSize: FontSize.labelMd, color: Colors.muted, marginTop: 3, lineHeight: LineHeight.labelMd },
  toggle: { fontSize: 24, fontWeight: '800', paddingHorizontal: 6 },
  principio: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 20, marginBottom: Spacing.sm },
  subh: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase', marginTop: Spacing.md, marginBottom: Spacing.xs },
  tool: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.soft, borderLeftWidth: 3, padding: Spacing.sm, marginBottom: Spacing.sm, ...WEB_LINK },
  toolName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  idi: { fontSize: 10, color: Colors.muted, fontWeight: '500' },
  toolWhy: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 17 },
  toolUse: { fontSize: FontSize.labelMd, marginTop: 5, lineHeight: 17, fontWeight: '600' },
  liRow: { flexDirection: 'row', gap: 8, paddingVertical: 3 },
  li: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 18 },
  liWarn: { flex: 1, fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 18 },
});
