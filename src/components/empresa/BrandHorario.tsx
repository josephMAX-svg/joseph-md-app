import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight, Motion } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel } from './primitives';
import { FadeUp } from './visuals';
import { TIME_SPLIT, ESTANDARES, FLUJO_DICTADO, METRICAS, BRAND_PLANS } from '../../lib/brandContentPlan';
import { HERRAMIENTAS, REFERENTES } from '../../lib/brandContentExtras';
import { bizDiaDe, BIZ_DIAS } from '../../lib/businessStudyPlan';
import { ESTUDIO_LIBROS } from '../../lib/estudioPulsoData';

/**
 * BrandHorario — "🗓️ Horario" de contenido orgánico de una marca: qué publicar cada
 * día (L-D, 1 post/red), estándar Hormozi por publicación, flujo de dictado (el
 * fundador dicta → Claude Code ejecuta desde la carpeta nativa), métricas del domingo,
 * herramientas web y referentes verificados. El día de HOY se resalta.
 */
const webHover = Platform.OS === 'web' ? ({ cursor: 'pointer', transition: `all ${Motion.base}` } as any) : null;
const DIAS_IDX = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const RED_COLOR: Record<string, string> = {
  TikTok: '#E5708A', Instagram: '#C77BE0', YouTube: '#E5484D',
  Facebook: '#7BB1FF', Marketplace: '#8FB6E8', WhatsApp: '#3FB984',
};
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function hoyDia(): string { try { return DIAS_IDX[new Date().getDay()]; } catch { return 'Lun'; } }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return '2026-06-10'; }
}

export default function BrandHorario({ brand }: { brand: 'pulso' | 'pirqa' | 'terrenos' | 'golden' }) {
  const plan = BRAND_PLANS[brand];
  const refs = REFERENTES[brand] || [];
  const hoy = hoyDia();
  const [openDia, setOpenDia] = useState<string>(hoy);
  if (!plan) return null;
  const A = plan.accent;
  // El 70% de LIVIANO = lectura del plan 96 días + aplicación directa (contenido)
  const lecturaHoy = brand === 'pulso' ? bizDiaDe(todayISO()) : undefined;
  const libroHoy = lecturaHoy && lecturaHoy.libroN != null ? ESTUDIO_LIBROS.find((l) => l.n === lecturaHoy.libroN) : undefined;

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

      {/* 70% LIVIANO = lectura del día (plan 96 días) + aplicación */}
      {lecturaHoy && (
        <>
          <SectionLabel>📖 Lectura de HOY · plan 96 días (D{lecturaHoy.d}/{BIZ_DIAS.length})</SectionLabel>
          <TouchableOpacity activeOpacity={lecturaHoy.yt ? 0.85 : 1} onPress={() => lecturaHoy.yt && openUrl(lecturaHoy.yt)}
            style={[st.lecturaCard, { borderLeftColor: A }, lecturaHoy.yt ? webHover : null]}>
            <View style={{ flex: 1 }}>
              <Text style={st.lecturaTitulo}>{lecturaHoy.lectura}</Text>
              {libroHoy ? <Text style={st.lecturaSub}>{libroHoy.libro} · {libroHoy.autor} → {libroHoy.output}</Text> : null}
              {lecturaHoy.accion ? <Text style={[st.lecturaAccion, { color: A }]}>🛠 Aplicación: {lecturaHoy.accion}</Text> : null}
            </View>
            {lecturaHoy.yt ? <Text style={[st.lecturaGo, { color: A }]}>▶</Text> : null}
          </TouchableOpacity>
          <Text style={[st.nota, { marginTop: 0 }]}>El 70% = leer (2h del plan) + aplicar directo creando el contenido del día. Plan completo en Pulso → Estudio → Día a día.</Text>
        </>
      )}

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
              <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => openUrl(h.url)} style={[st.toolCard, { flexGrow: 1, flexBasis: 220 }, webHover]}>
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
              <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => openUrl(r.url)} style={[st.toolCard, { flexGrow: 1, flexBasis: 240 }, webHover]}>
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
  splitRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 9, borderTopWidth: 1, borderTopColor: Hairline.soft },
  splitPct: { fontSize: FontSize.titleMd, fontWeight: '900', width: 52, textAlign: 'right', letterSpacing: -0.4 },
  splitMarca: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  splitDesc: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2, lineHeight: LineHeight.labelSm },
  splitBar: { width: 90, height: 7, borderRadius: 4, overflow: 'hidden', borderWidth: 1, borderColor: Hairline.soft },
  splitFill: { height: 7, borderRadius: 4 },

  diaCard: { ...cardBase, borderLeftWidth: 3, padding: Spacing.md, marginBottom: 7, ...Elevation.sm },
  diaHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  diaName: { fontSize: FontSize.labelLg, fontWeight: '800', width: 86, letterSpacing: 0.2 },
  diaFoco: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.labelMd },
  redChip: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 9 },
  redTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  redNota: { fontSize: 8, color: Colors.muted, marginTop: 2 },
  extra: { fontSize: FontSize.labelMd, fontWeight: '700', marginTop: 9, lineHeight: LineHeight.labelMd },

  flujoRow: { paddingVertical: 7, borderTopWidth: 1, borderTopColor: Hairline.soft },
  flujoPaso: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },
  flujoDet: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 3, lineHeight: LineHeight.labelMd },

  estRow: { paddingVertical: 7, borderTopWidth: 1, borderTopColor: Hairline.soft },
  estK: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },
  estV: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 3, lineHeight: LineHeight.labelMd },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  toolCard: { ...cardBase, padding: Spacing.md, ...Elevation.sm },
  toolName: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.onSurface, flex: 1 },
  toolNota: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 5, lineHeight: LineHeight.labelSm },

  nota: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 5, lineHeight: LineHeight.labelSm, marginBottom: Spacing.lg },

  lecturaCard: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 8, ...Elevation.sm },
  lecturaTitulo: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, lineHeight: LineHeight.bodyMd },
  lecturaSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, lineHeight: LineHeight.labelSm },
  lecturaAccion: { fontSize: FontSize.labelMd, fontWeight: '600', marginTop: 6, lineHeight: LineHeight.labelMd },
  lecturaGo: { fontSize: 18, fontWeight: '800', width: 22, textAlign: 'center' },
});
