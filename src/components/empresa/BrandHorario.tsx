import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel } from './primitives';
import { FadeUp } from './visuals';
import { TIME_SPLIT, ESTANDARES, FLUJO_DICTADO, METRICAS, BRAND_PLANS } from '../../lib/brandContentPlan';
import { HERRAMIENTAS, REFERENTES } from '../../lib/brandContentExtras';

/**
 * BrandHorario — "🗓️ Horario" de contenido orgánico de una marca: qué publicar cada
 * día (L-D, 1 post/red), estándar Hormozi por publicación, flujo de dictado (el
 * fundador dicta → Claude Code ejecuta desde la carpeta nativa), métricas del domingo,
 * herramientas web y referentes verificados. El día de HOY se resalta.
 */
const DIAS_IDX = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const RED_COLOR: Record<string, string> = { TikTok: '#E5708A', Instagram: '#C77BE0', YouTube: '#E5484D' };
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function hoyDia(): string { try { return DIAS_IDX[new Date().getDay()]; } catch { return 'Lun'; } }

export default function BrandHorario({ brand }: { brand: 'pulso' | 'pirqa' }) {
  const plan = BRAND_PLANS[brand];
  const refs = REFERENTES[brand] || [];
  const hoy = hoyDia();
  const [openDia, setOpenDia] = useState<string>(hoy);
  if (!plan) return null;
  const A = plan.accent;

  return (
    <View>
      {/* Reparto del tiempo (regla 70/10/10/10) */}
      <SectionLabel>Reparto semanal del tiempo de business</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.lg }}>
        {TIME_SPLIT.map((t, i) => (
          <View key={i} style={st.splitRow}>
            <Text style={[st.splitPct, { color: t.color }]}>{t.pct}%</Text>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={st.splitMarca}>{t.marca}</Text>
                {t.estado === 'próximamente' && <Chip label="próximamente" color={Colors.muted} small />}
              </View>
              <Text style={st.splitDesc}>{t.desc}</Text>
            </View>
            <View style={[st.splitBar, { backgroundColor: t.color + '22' }]}>
              <View style={[st.splitFill, { width: (`${t.pct}%` as any), backgroundColor: t.color, opacity: t.estado === 'activo' ? 1 : 0.35 }]} />
            </View>
          </View>
        ))}
      </GlassPanel>

      {/* Semana L-D */}
      <SectionLabel>Semana de contenido · {plan.marca} ({plan.tiempoDia})</SectionLabel>
      <View style={{ marginBottom: Spacing.lg }}>
        {plan.semana.map((d, i) => {
          const esHoy = d.dia === hoy;
          const open = openDia === d.dia;
          return (
            <FadeUp key={d.dia} delay={i * 30}>
              <View style={[st.diaCard, { borderLeftColor: A }, esHoy && { borderColor: A + '88', backgroundColor: A + '0E' }]}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setOpenDia(open ? '' : d.dia)} style={st.diaHead}>
                  <Text style={[st.diaName, { color: esHoy ? A : Colors.onSurface }]}>{open ? '▾' : '▸'} {d.dia}{esHoy ? ' · HOY' : ''}</Text>
                  <Text style={st.diaFoco} numberOfLines={open ? 3 : 1}>{d.foco}</Text>
                </TouchableOpacity>
                {open && (
                  <View style={{ marginTop: 8 }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                      {d.redes.map((r, j) => (
                        <View key={j} style={[st.redChip, { borderColor: (RED_COLOR[r.red] || A) + (r.fuerte ? 'CC' : '55'), backgroundColor: r.fuerte ? (RED_COLOR[r.red] || A) + '1F' : 'transparent' }]}>
                          <Text style={[st.redTxt, { color: RED_COLOR[r.red] || A }]}>{r.fuerte ? '★ ' : ''}{r.red}</Text>
                          <Text style={st.redNota}>{r.nota}</Text>
                        </View>
                      ))}
                    </View>
                    {d.extra ? <Text style={[st.extra, { color: A }]}>{d.extra}</Text> : null}
                  </View>
                )}
              </View>
            </FadeUp>
          );
        })}
        <Text style={st.nota}>★ = ventana fuerte verificada (Buffer 9.6M posts · Sprout ~2B engagements · Hootsuite). Consistencia ≥1x/sem × 20 sem = +450% engagement — la constancia gana al volumen.</Text>
      </View>

      {/* Flujo de dictado */}
      <SectionLabel>Flujo: tú dictas → Claude Code ejecuta (carpeta nativa de la marca)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.lg }}>
        {FLUJO_DICTADO.map((f, i) => (
          <View key={i} style={st.flujoRow}>
            <Text style={[st.flujoPaso, { color: A }]}>{f.paso}</Text>
            <Text style={st.flujoDet}>{f.det}</Text>
          </View>
        ))}
      </GlassPanel>

      {/* Estándares por publicación */}
      <SectionLabel>Estándar de cada publicación (Hormozi · verificado)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.lg }}>
        {ESTANDARES.map((e, i) => (
          <View key={i} style={st.estRow}>
            <Text style={[st.estK, { color: A }]}>{e.k}</Text>
            <Text style={st.estV}>{e.v}</Text>
          </View>
        ))}
      </GlassPanel>

      {/* Métricas del domingo */}
      <SectionLabel>Qué medir (revisión del domingo)</SectionLabel>
      <GlassPanel accent={Colors.coral} style={{ marginBottom: Spacing.lg }}>
        {METRICAS.map((m, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 4 }}>
            <Text style={{ color: Colors.coral }}>•</Text>
            <Text style={[st.estV, { flex: 1 }]}>{m}</Text>
          </View>
        ))}
      </GlassPanel>

      {/* Herramientas web (verificadas) */}
      {HERRAMIENTAS.length > 0 && (
        <>
          <SectionLabel>Herramientas (web · gratuitas · automatizables por Claude Code)</SectionLabel>
          <View style={[st.grid, { marginBottom: Spacing.lg }]}>
            {HERRAMIENTAS.map((h, i) => (
              <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => openUrl(h.url)} style={[st.toolCard, { flexGrow: 1, flexBasis: 220 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={st.toolName}>{h.nombre} ↗</Text>
                  <Chip label={h.tipo} color={Colors.muted} small />
                </View>
                <Text style={st.toolNota}>{h.nota}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* Referentes (verificados) */}
      {refs.length > 0 && (
        <>
          <SectionLabel>Referentes a estudiar (formatos que funcionan)</SectionLabel>
          <View style={[st.grid, { marginBottom: Spacing.lg }]}>
            {refs.map((r, i) => (
              <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => openUrl(r.url)} style={[st.toolCard, { flexGrow: 1, flexBasis: 240 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={st.toolName}>{r.nombre} ↗</Text>
                  <Chip label={r.red} color={Colors.muted} small />
                </View>
                <Text style={st.toolNota}>{r.porQue}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <Text style={st.nota}>La publicación se ejecuta desde la carpeta nativa de cada marca (no desde esta app). Esto es el recordatorio diario + estándar. La rotación editorial es propuesta inicial: itera según métricas y lo relevante del país.</Text>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder };
const st = StyleSheet.create({
  splitRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 7, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  splitPct: { fontSize: FontSize.titleMd, fontWeight: '900', width: 52, textAlign: 'right' },
  splitMarca: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  splitDesc: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1 },
  splitBar: { width: 90, height: 7, borderRadius: 4, overflow: 'hidden' },
  splitFill: { height: 7, borderRadius: 4 },

  diaCard: { ...cardBase, borderLeftWidth: 3, padding: Spacing.md, marginBottom: 6 },
  diaHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  diaName: { fontSize: FontSize.labelLg, fontWeight: '800', width: 86 },
  diaFoco: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17 },
  redChip: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 9 },
  redTxt: { fontSize: FontSize.labelSm, fontWeight: '800' },
  redNota: { fontSize: 8, color: Colors.muted, marginTop: 1 },
  extra: { fontSize: FontSize.labelMd, fontWeight: '700', marginTop: 8 },

  flujoRow: { paddingVertical: 6, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  flujoPaso: { fontSize: FontSize.labelMd, fontWeight: '800' },
  flujoDet: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 17 },

  estRow: { paddingVertical: 6, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  estK: { fontSize: FontSize.labelMd, fontWeight: '800' },
  estV: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 17 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  toolCard: { ...cardBase, padding: Spacing.md },
  toolName: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.onSurface, flex: 1 },
  toolNota: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, lineHeight: 15 },

  nota: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, lineHeight: 16, marginBottom: Spacing.lg },
});
