import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  QBANKLY_META, QB_LIBRARIES, QB_BANKS, QB_VIDEOS, QbLibrary, QbBank, QbVideoCourse,
  qbLibUrl, bbHours, courseVideos, QB_VIDEOS_URL, QB_QBANKS_URL,
} from '../../lib/usmleQbanklyData';

/**
 * UsmleQbanklyExplorer — Qbankly REAL del usuario (qbankly.app): 3 librerías,
 * QBanks por subject/subtema con conteo de preguntas, y Video Library (B&B + Sketchy).
 * Deep-links abren Qbankly. Complementa la biblioteca High-Yield de Palmerton.
 */
const GREEN = '#3FB984';
const BLUE = '#7BB1FF';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

function LibraryCard({ lib, i }: { lib: QbLibrary; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeUp delay={i * 30}>
      <View style={st.card}>
        <TouchableOpacity activeOpacity={0.82} onPress={() => setOpen((o) => !o)} style={st.head}>
          <Text style={st.libBadge}>📚</Text>
          <View style={{ flex: 1 }}>
            <Text style={st.name} numberOfLines={1}>{lib.name}</Text>
            <Text style={st.metaSub}>{lib.subjects.length} subjects · {lib.nTopics} temas</Text>
          </View>
          <Text style={[st.caret, open && { color: BLUE }]}>{open ? '▾' : '▸'}</Text>
        </TouchableOpacity>
        {open && (
          <View style={st.body}>
            {lib.subjects.map((s, k) => (
              <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => openUrl(qbLibUrl(lib.epubId, s.firstDoc))} style={st.row}>
                <Text style={st.rowName} numberOfLines={1}>{s.subject}</Text>
                <Chip label={`${s.nTopics} temas`} color={BLUE} small />
                <Text style={{ color: BLUE, fontSize: 11 }}>↗</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </FadeUp>
  );
}

function BankCard({ bank, i }: { bank: QbBank; i: number }) {
  const [open, setOpen] = useState(false);
  const maxS = Math.max(...bank.subjects.map((s) => s[1]), 1);
  return (
    <FadeUp delay={i * 30}>
      <View style={[st.card, bank.active && { borderColor: GREEN + '66' }]}>
        <TouchableOpacity activeOpacity={0.82} onPress={() => setOpen((o) => !o)} style={st.head}>
          <View style={[st.qBadge, { backgroundColor: GREEN + '1F', borderColor: GREEN + '55' }]}>
            <Text style={[st.qBadgeTxt, { color: GREEN }]}>{bank.q}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={st.name} numberOfLines={1}>{bank.name}{bank.active ? '  ●' : ''}</Text>
            <Text style={st.metaSub}>{bank.subjects.length} subjects · {bank.yCount} subtemas{bank.active ? ' · ACTIVO' : ''}</Text>
          </View>
          <Text style={[st.caret, open && { color: GREEN }]}>{open ? '▾' : '▸'}</Text>
        </TouchableOpacity>
        {open && (
          <View style={st.body}>
            <Text style={st.boxLbl}>▦ Preguntas por subject (disciplina)</Text>
            {bank.subjects.slice(0, 16).map((s, k) => (
              <View key={k} style={st.barRow}>
                <Text style={st.barName} numberOfLines={1}>{s[0]}</Text>
                <View style={st.barTrack}><View style={[st.barFill, { width: (Math.max(4, Math.round((s[1] / maxS) * 100)) + '%') as any, backgroundColor: GREEN }]} /></View>
                <Text style={st.barN}>{s[1]}</Text>
              </View>
            ))}
            {bank.subtopics && (
              <>
                <Text style={[st.boxLbl, { marginTop: 10 }]}>★ Subtemas más preguntados (por sistema)</Text>
                <View style={st.chipWrap}>
                  {[...bank.subtopics].sort((a, b) => b[1] - a[1]).slice(0, 24).map((t, k) => (
                    <View key={k} style={st.subChip}><Text style={st.subTxt}>{t[0]} · {t[1]}</Text></View>
                  ))}
                </View>
              </>
            )}
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QB_QBANKS_URL)} style={st.openBtn}>
              <Text style={st.openBtnTxt}>Crear test en Qbankly ↗</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </FadeUp>
  );
}

function VideoCourseCard({ course, i }: { course: QbVideoCourse; i: number }) {
  const [open, setOpen] = useState(false);
  const hrs = bbHours(course);
  const total = courseVideos(course);
  const hasMin = course.chapters.some((c) => c.min);
  return (
    <FadeUp delay={i * 30}>
      <View style={[st.card, { borderLeftWidth: 3, borderLeftColor: course.id === 3 ? '#E0A93F' : '#E5484D' }]}>
        <TouchableOpacity activeOpacity={0.82} onPress={() => setOpen((o) => !o)} style={st.head}>
          <Text style={st.libBadge}>{course.id === 3 ? '🎨' : '🎬'}</Text>
          <View style={{ flex: 1 }}>
            <Text style={st.name} numberOfLines={1}>{course.name}</Text>
            <Text style={st.metaSub}>{total} vídeos{hasMin ? ` · ${hrs}h` : ''}</Text>
          </View>
          <Text style={[st.caret, open && { color: '#E5484D' }]}>{open ? '▾' : '▸'}</Text>
        </TouchableOpacity>
        {open && (
          <View style={st.body}>
            {course.chapters.filter((c) => c.n > 0).map((c, k) => (
              <View key={k} style={st.row}>
                <Text style={st.rowName} numberOfLines={1}>{c.chapter}</Text>
                <Chip label={`${c.n} vid`} color={Colors.muted} small />
                {c.min ? <Chip label={`${Math.round(c.min / 60)}h ${c.min % 60}m`} color={Colors.green} small /> : null}
              </View>
            ))}
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QB_VIDEOS_URL)} style={st.openBtn}>
              <Text style={st.openBtnTxt}>Ver en Qbankly ↗</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </FadeUp>
  );
}

export default function UsmleQbanklyExplorer() {
  return (
    <View>
      <GlassPanel accent={GREEN} style={{ marginBottom: Spacing.md, padding: Spacing.lg }}>
        <Text style={st.intro}>
          <Text style={{ color: GREEN, fontWeight: '800' }}>Tu Qbankly (real).</Text>{' '}
          {QBANKLY_META.libraries} librerías · {QBANKLY_META.qbanksUSMLE} QBanks USMLE · {QBANKLY_META.videos} vídeos.
          Extraído de tu cuenta Premium vía la API interna. Toca cualquier ítem → abre Qbankly. Complementa la biblioteca de <Text style={{ color: Colors.onSurface }}>Palmerton</Text>.
        </Text>
      </GlassPanel>

      <SectionLabel>Librerías (texto de referencia · tema por tema)</SectionLabel>
      <View style={{ marginBottom: Spacing.lg }}>
        {QB_LIBRARIES.map((l, i) => <LibraryCard key={l.epubId} lib={l} i={i} />)}
      </View>

      <SectionLabel>QBanks · preguntas por subject y subtema</SectionLabel>
      <View style={{ marginBottom: Spacing.lg }}>
        {QB_BANKS.map((b, i) => <BankCard key={b.id} bank={b} i={i} />)}
      </View>

      <SectionLabel>Video Library · Boards&Beyond + Sketchy</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {QB_VIDEOS.map((c, i) => <VideoCourseCard key={c.id} course={c} i={i} />)}
      </View>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder };
const st = StyleSheet.create({
  intro: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 19 },
  card: { ...cardBase, marginBottom: Spacing.sm, overflow: 'hidden' },
  head: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, padding: Spacing.md },
  libBadge: { fontSize: 18, width: 26, textAlign: 'center' },
  qBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 8, minWidth: 52, alignItems: 'center' },
  qBadgeTxt: { fontSize: 11, fontWeight: '800' },
  name: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  metaSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2 },
  caret: { fontSize: 16, color: Colors.muted, width: 18, textAlign: 'center' },
  body: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: Spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 5, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.04)' },
  rowName: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  boxLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4, marginBottom: 6 },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 3 },
  barName: { width: 150, fontSize: 10, color: Colors.onSurfaceVariant },
  barTrack: { flex: 1, height: 9, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.05)', overflow: 'hidden' },
  barFill: { height: 9, borderRadius: 5 },
  barN: { width: 38, fontSize: 10, fontWeight: '800', color: GREEN, textAlign: 'right' },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 4 },
  subChip: { backgroundColor: GREEN + '14', borderRadius: BorderRadius.sm, paddingVertical: 3, paddingHorizontal: 7, borderWidth: 1, borderColor: GREEN + '2A' },
  subTxt: { fontSize: 10, color: '#AEE6CC' },
  openBtn: { marginTop: 10, alignSelf: 'flex-start', backgroundColor: GREEN + '18', borderRadius: BorderRadius.md, borderWidth: 1, borderColor: GREEN + '44', paddingVertical: 6, paddingHorizontal: 12 },
  openBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: GREEN },
});
