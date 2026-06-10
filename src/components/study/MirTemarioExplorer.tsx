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
import { detalleDe, pesoColor } from '../../lib/mirDetalleData';
import { recursosDe } from '../../lib/mirDriveResources';

/**
 * MirTemarioExplorer — las 30 asignaturas REALES de ProMIR por rentabilidad.
 * Al desplegar cada una cruza 4 fuentes:
 *  (1) ProMIR: Enfoque + Peso MIR % por tema + horas/páginas + vídeo resumen + capítulos.
 *  (2) rabi_94 (Google Drive): temas núcleo de 1ª vuelta (CTO×AMIR×MirAsturias).
 *  (3) Rentabilidad (chart Distribución MIR).
 *  (4) Resúmenes de Drive (Mirnion / MIR 2022) por asignatura.
 */
const AMBER = '#F5A623';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
const LEGEND: RentColor[] = ['roja', 'naranja', 'amarilla', 'verde', 'verdeOsc'];

function RentDot({ c, size = 12 }: { c: RentColor; size?: number }) {
  return <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: RENT_TIER[c].color }} />;
}

/** Barra animada de Peso MIR de un tema (gráfico en movimiento). */
function PesoBar({ nombre, pct, horas, max }: { nombre: string; pct: number; horas: string; max: number }) {
  const w = Math.max(4, Math.round((pct / max) * 100));
  const col = pesoColor(pct);
  return (
    <View style={st.barRow}>
      <Text style={st.barName} numberOfLines={1}>{nombre}</Text>
      <View style={st.barTrack}>
        <FadeUp>
          <View style={[st.barFill, { width: (w + '%') as any, backgroundColor: col }]} />
        </FadeUp>
      </View>
      <Text style={[st.barPct, { color: col }]}>{pct}%</Text>
      <Text style={st.barHoras}>{horas}</Text>
    </View>
  );
}

function AsignaturaCard({ a, index }: { a: MirAsignatura; index: number }) {
  const [open, setOpen] = useState(false);
  const tier = RENT_TIER[a.rentColor];
  const prio = prioridadDe(a);
  const det = detalleDe(a.num);
  const recursos = recursosDe(a.num);
  const realCaps = a.chapters.filter((c) => c.n > 0);
  const introCap = a.chapters.find((c) => c.n === 0);
  const maxPeso = det ? Math.max(...det.temas.map((t) => t.pesoPct), 1) : 1;

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
              <Text style={st.metaSub}>{realCaps.length} temas{det?.horasTotales ? ` · ${det.horasTotales}` : ''}</Text>
              {prio ? <View style={st.prioFlag}><Text style={st.prioFlagTxt}>★ rabi_94</Text></View> : null}
              {recursos.length ? <View style={st.driveFlag}><Text style={st.driveFlagTxt}>📄 {recursos.length} resúmenes</Text></View> : null}
              {det?.resumenVideoDur ? <View style={st.vidFlag}><Text style={st.vidFlagTxt}>▶ {det.resumenVideoDur}</Text></View> : null}
            </View>
          </View>
          <Text style={[st.caret, open && { color: AMBER }]}>{open ? '▾' : '▸'}</Text>
        </TouchableOpacity>

        {open && (
          <View style={st.body}>
            {det && (
              <>
                {/* Peso global + vídeo resumen */}
                <Text style={st.pesoGlobal}>{det.pesoGlobal}</Text>
                {introCap && (det.resumenVideoDur || det.presentacionVideoDur) && (
                  <View style={st.vidRow}>
                    {det.resumenVideoDur ? (
                      <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(capUrl(introCap.capId))} style={st.vidBtn}>
                        <Text style={st.vidBtnTxt}>▶ Videoclase resumen · {det.resumenVideoDur} ↗</Text>
                      </TouchableOpacity>
                    ) : null}
                    {det.presentacionVideoDur ? (
                      <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(capUrl(introCap.capId))} style={[st.vidBtn, { backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.12)' }]}>
                        <Text style={[st.vidBtnTxt, { color: Colors.onSurfaceVariant }]}>▶ Presentación · {det.presentacionVideoDur} ↗</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                )}

                {/* Enfoque ProMIR */}
                <View style={[st.enfoqueBox, { borderColor: tier.color + '40' }]}>
                  <Text style={[st.boxLbl, { color: tier.color }]}>◆ Enfoque ProMIR</Text>
                  <Text style={st.enfoqueTxt}>{det.enfoque}</Text>
                </View>

                {/* Prioridad 1ª vuelta (cruce ProMIR + Peso + rabi_94) */}
                {det.prioridad1V?.length > 0 && (
                  <View style={[st.prioBox, { borderColor: AMBER + '40' }]}>
                    <Text style={st.prioTitle}>① Orden de ataque 1ª vuelta (ProMIR × Peso MIR × rabi_94)</Text>
                    <View style={st.chipWrap}>
                      {det.prioridad1V.map((p, i) => (
                        <View key={i} style={st.ordChip}><Text style={st.ordN}>{i + 1}</Text><Text style={st.ordTxt}>{p}</Text></View>
                      ))}
                    </View>
                    <Text style={st.notaPrio}>{det.notaPrioridad}</Text>
                  </View>
                )}
              </>
            )}

            {/* rabi_94 núcleo (Drive) */}
            {prio && (
              <View style={[st.rabiBox]}>
                <Text style={st.rabiTitle}>★ rabi_94 · núcleo 1V (CTO × AMIR × MirAsturias)</Text>
                <View style={st.chipWrap}>
                  {prio.nucleo.map((n, i) => <View key={i} style={st.nucleoChip}><Text style={st.nucleoTxt}>{n}</Text></View>)}
                </View>
                {prio.matices && prio.matices.map((m, i) => <Text key={i} style={st.matiz}>• {m}</Text>)}
              </View>
            )}

            {/* Temas con Peso MIR (gráfico de barras) */}
            {det && det.temas.length > 0 && (
              <View style={st.temasBox}>
                <Text style={st.boxLbl}>▦ Peso MIR por tema · horas de estudio</Text>
                {det.temas.map((t, i) => <PesoBar key={i} nombre={t.nombre} pct={t.pesoPct} horas={t.horas} max={maxPeso} />)}
              </View>
            )}

            {/* Top subtemas */}
            {det?.topSubtemas && det.topSubtemas.length > 0 && (
              <View style={st.subBox}>
                <Text style={st.boxLbl}>★ Subtemas más preguntados</Text>
                {det.topSubtemas.slice(0, 8).map((s, i) => (
                  <View key={i} style={st.subRow}>
                    <Text style={st.subPct}>{s.pesoPct}%</Text>
                    <Text style={st.subTxt} numberOfLines={1}><Text style={{ color: Colors.onSurfaceVariant, fontWeight: '700' }}>{s.tema}:</Text> {s.subtema}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Resúmenes de Drive */}
            {recursos.length > 0 && (
              <View style={st.driveBox}>
                <Text style={[st.boxLbl, { color: '#7BB1FF' }]}>📄 Resúmenes (tu Google Drive) — léelos para el esquema</Text>
                <View style={st.chipWrap}>
                  {recursos.map((r, i) => (
                    <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => openUrl(r.url)} style={[st.driveChip, r.tipo === 'note' && { borderStyle: 'dashed' }]}>
                      <Text style={st.driveChipTxt}>{r.tipo === 'pdf' ? '📕' : '✍️'} {r.fuente} · {r.titulo} ↗</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={st.driveNote}>✍️ = Notability manuscrito (se descarga) · 📕 = PDF</Text>
              </View>
            )}

            {/* Capítulos reales → ProMIR */}
            <Text style={[st.boxLbl, { marginTop: 12, marginBottom: 4 }]}>▸ Capítulos en ProMIR (toca → abre)</Text>
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
          <Text style={{ color: AMBER, fontWeight: '800' }}>{MIR_TEMARIO_META.totalAsignaturas} asignaturas · {MIR_TEMARIO_META.totalCapitulos} capítulos.</Text>
          {' '}Cada una cruza <Text style={{ color: Colors.onSurface }}>ProMIR</Text> (Enfoque + Peso MIR % por tema + horas + vídeo resumen),{' '}
          <Text style={{ color: AMBER }}>rabi_94</Text> (núcleo 1V), la <Text style={{ color: Colors.onSurface }}>rentabilidad</Text> del chart MIR y tus{' '}
          <Text style={{ color: '#7BB1FF' }}>resúmenes de Drive</Text> (Mirnion / MIR 2022).
        </Text>
        <View style={st.legend}>
          {LEGEND.map((c) => (
            <View key={c} style={st.legendItem}><RentDot c={c} size={10} /><Text style={st.legendTxt}>{RENT_TIER[c].rango}</Text></View>
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
  driveFlag: { backgroundColor: 'rgba(123,177,255,0.12)', borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 6 },
  driveFlagTxt: { fontSize: 9, fontWeight: '800', color: '#7BB1FF' },
  vidFlag: { backgroundColor: Colors.green + '1A', borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 6 },
  vidFlagTxt: { fontSize: 9, fontWeight: '800', color: Colors.green },
  caret: { fontSize: 16, color: Colors.muted, width: 18, textAlign: 'center' },

  body: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: Spacing.sm },
  pesoGlobal: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600', lineHeight: 17, marginBottom: 8 },
  vidRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  vidBtn: { backgroundColor: Colors.green + '18', borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.green + '44', paddingVertical: 6, paddingHorizontal: 10 },
  vidBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.green },

  boxLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4, marginBottom: 6 },
  enfoqueBox: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.sm, backgroundColor: 'rgba(255,255,255,0.02)' },
  enfoqueTxt: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17 },

  prioBox: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.md, backgroundColor: 'rgba(245,166,35,0.05)', marginBottom: Spacing.sm },
  prioTitle: { fontSize: FontSize.labelMd, fontWeight: '800', color: AMBER, marginBottom: 6 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 2 },
  ordChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: AMBER + '18', borderRadius: BorderRadius.sm, paddingVertical: 3, paddingHorizontal: 7, borderWidth: 1, borderColor: AMBER + '3A' },
  ordN: { fontSize: 9, fontWeight: '800', color: '#0A1424', backgroundColor: AMBER, borderRadius: 7, width: 14, height: 14, textAlign: 'center', lineHeight: 14, overflow: 'hidden' },
  ordTxt: { fontSize: 10, color: '#F8D89A', fontWeight: '700' },
  notaPrio: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 7, lineHeight: 15 },

  rabiBox: { borderWidth: 1, borderColor: AMBER + '2A', borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.sm },
  rabiTitle: { fontSize: FontSize.labelSm, fontWeight: '800', color: AMBER, marginBottom: 5 },
  nucleoChip: { backgroundColor: AMBER + '14', borderRadius: BorderRadius.sm, paddingVertical: 3, paddingHorizontal: 7, borderWidth: 1, borderColor: AMBER + '33' },
  nucleoTxt: { fontSize: 10, color: '#F8D89A', fontWeight: '700' },
  matiz: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 5, lineHeight: 15 },

  temasBox: { marginBottom: Spacing.sm },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 3 },
  barName: { width: 120, fontSize: 10, color: Colors.onSurfaceVariant },
  barTrack: { flex: 1, height: 9, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.05)', overflow: 'hidden' },
  barFill: { height: 9, borderRadius: 5 },
  barPct: { width: 42, fontSize: 10, fontWeight: '800', textAlign: 'right' },
  barHoras: { width: 56, fontSize: 9, color: Colors.muted, textAlign: 'right' },

  subBox: { marginBottom: Spacing.sm },
  subRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 3 },
  subPct: { width: 40, fontSize: 10, fontWeight: '800', color: AMBER, textAlign: 'right' },
  subTxt: { flex: 1, fontSize: FontSize.labelSm, color: Colors.muted },

  driveBox: { borderWidth: 1, borderColor: 'rgba(123,177,255,0.25)', borderRadius: BorderRadius.md, padding: Spacing.md, backgroundColor: 'rgba(123,177,255,0.04)', marginBottom: Spacing.sm },
  driveChip: { backgroundColor: 'rgba(123,177,255,0.1)', borderRadius: BorderRadius.sm, paddingVertical: 4, paddingHorizontal: 8, borderWidth: 1, borderColor: 'rgba(123,177,255,0.3)' },
  driveChipTxt: { fontSize: 10, color: '#AFCBFF', fontWeight: '600' },
  driveNote: { fontSize: 9, color: Colors.muted, marginTop: 6 },

  capRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingVertical: 5, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.04)' },
  capN: { fontSize: FontSize.labelMd, fontWeight: '800', width: 18, textAlign: 'center' },
  capTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
});
