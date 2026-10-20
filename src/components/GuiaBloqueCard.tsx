import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Hairline, LineHeight, Motion } from '../theme/tokens';
import { DesktopColors } from '../theme/desktopStyles';
import type { GuiaBloque } from '../lib/guia';
import { fmtMin, sumaPasos } from '../lib/guia';
import { guiaConFechasReales } from '../lib/corridaTexto';

/**
 * GuiaBloqueCard — pinta un `GuiaBloque` (src/lib/guia.ts): franja · título · minutos → pasos (min · QUÉ · CÓMO · enlace directo)
 * → recursos → «terminado cuando» → plan B · aviso visible (mapeo no exacto / carga repartida / decisión pendiente).
 * Formato común para TODOS los planes (v6.02c, 18-oct-2026, E1). Solo tokens de diseño existentes (no toca tokens.ts ni el app-shell).
 *   <GuiaBloqueCard g={bloque} color={Colors.green} />                 → tarjeta completa (pantallas de plan)
 *   <GuiaBloqueCard g={bloque} color={Colors.green} compacto />        → cabecera + aviso; pasos al tocar (Home)
 * Los enlaces abren la URL https tal cual (cualquier navegador): nunca un esquema de navegador concreto.
 */
export default function GuiaBloqueCard({ g: gPlan, color = Colors.gold, compacto = false, ahora = false }: { g: GuiaBloque; color?: string; compacto?: boolean; ahora?: boolean }) {
  const g = guiaConFechasReales(gPlan); // v6.02d: las fechas de la semana corrida citadas en el texto se muestran con su día real (19-oct → mar 20…)
  const [abierto, setAbierto] = useState<boolean>(!compacto);
  const cuadra = sumaPasos(g) === g.totalMin;
  const abrir = (url: string) => { Linking.openURL(url).catch(() => {}); };
  return (
    <View style={[st.card, { borderLeftColor: color }, ahora && { borderColor: color + '88', backgroundColor: color + '10' }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setAbierto((a) => !a)} style={st.head} accessibilityRole="button"
        accessibilityLabel={`${g.franja} ${g.titulo} · ${abierto ? 'plegar' : 'desplegar'} pasos`}>
        <Text style={[st.franja, { color }]}>{g.franja}</Text>
        <Text style={st.titulo} numberOfLines={compacto && !abierto ? 2 : undefined}>{g.titulo}</Text>
        <View style={[st.minChip, { borderColor: color + '66' }]}><Text style={[st.minTxt, { color }]}>{fmtMin(g.totalMin)}</Text></View>
        <Text style={st.chev}>{abierto ? '▾' : '▸'}</Text>
      </TouchableOpacity>
      {g.aviso ? (
        <View style={st.aviso}><Text style={st.avisoTxt}>⚠ {g.aviso}</Text></View>
      ) : null}
      {abierto && (
        <View>
          {g.pasos.map((p, i) => (
            <View key={i} style={st.paso}>
              <View style={[st.pasoMin, { backgroundColor: color + '16', borderColor: color + '44' }]}>
                <Text style={[st.pasoMinTxt, { color }]}>{p.min}′</Text>
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={st.que}>{p.que}</Text>
                <Text style={st.como}>{p.como}</Text>
                {p.enlace ? (
                  <TouchableOpacity activeOpacity={0.85} onPress={() => abrir(p.enlace!.url)} style={[st.btn, { borderColor: color + '88' }]}
                    accessibilityRole="link" accessibilityLabel={p.enlace.t}>
                    <Text style={[st.btnTxt, { color }]} numberOfLines={1}>{p.enlace.t} ↗</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          ))}
          {g.recursos.length > 0 && (
            <View style={st.recursos}>
              {g.recursos.map((r, i) => (
                <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => abrir(r.url)} style={st.recurso} accessibilityRole="link" accessibilityLabel={r.t}>
                  <Text style={st.recursoTxt} numberOfLines={2}>{r.t}{r.min != null ? ` · ${r.min}′` : ''}{r.cantidad ? ` · ${r.cantidad}` : ''} ↗</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Text style={st.hecho}>✓ Terminado cuando: {g.hecho}</Text>
          {g.planB ? <Text style={st.planB}>↺ Plan B: {g.planB}</Text> : null}
          {!cuadra ? <Text style={st.planB}>⚠ los minutos de los pasos ({sumaPasos(g)}′) no suman la franja ({g.totalMin}′)</Text> : null}
        </View>
      )}
    </View>
  );
}

const WEB_LINK = (Platform.OS === 'web' ? { cursor: 'pointer', transition: Motion.base } : {}) as any;
const st = StyleSheet.create({
  card: {
    backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, borderLeftWidth: 3,
    paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, marginBottom: 6,
  },
  head: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', ...WEB_LINK },
  franja: { fontSize: FontSize.labelSm, fontWeight: '800', fontVariant: ['tabular-nums'], letterSpacing: 0.2, minWidth: 92 },
  titulo: { flex: 1, minWidth: 140, fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface, lineHeight: LineHeight.labelMd },
  minChip: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 8 },
  minTxt: { fontSize: 10, fontWeight: '800', fontVariant: ['tabular-nums'] },
  chev: { fontSize: 11, color: Colors.muted, width: 12, textAlign: 'center' },
  aviso: { marginTop: 6, borderWidth: 1, borderColor: Colors.gold + '55', backgroundColor: Colors.gold + '12', borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 8 },
  avisoTxt: { fontSize: FontSize.labelSm, color: Colors.champagne, lineHeight: LineHeight.labelSm },
  paso: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingTop: 7, marginTop: 7, borderTopWidth: 1, borderTopColor: Hairline.soft },
  pasoMin: { borderWidth: 1, borderRadius: BorderRadius.sm, minWidth: 38, paddingVertical: 2, alignItems: 'center' },
  pasoMinTxt: { fontSize: 10, fontWeight: '900', fontVariant: ['tabular-nums'] },
  que: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '700', lineHeight: LineHeight.labelMd },
  como: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: LineHeight.labelSm },
  btn: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 9, marginTop: 5, maxWidth: '100%', ...WEB_LINK },
  btnTxt: { fontSize: FontSize.labelSm, fontWeight: '800' },
  recursos: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 8 },
  recurso: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.full, paddingVertical: 3, paddingHorizontal: 9, maxWidth: '100%', ...WEB_LINK },
  recursoTxt: { fontSize: 10, color: Colors.onSurfaceVariant, fontWeight: '600' },
  hecho: { fontSize: FontSize.labelSm, color: Colors.green, marginTop: 8, lineHeight: LineHeight.labelSm, fontWeight: '700' },
  planB: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, lineHeight: LineHeight.labelSm },
});
