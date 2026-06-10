import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel } from '../empresa/primitives';
import { GradientHero, FadeUp } from '../empresa/visuals';
import {
  PLAN_META, SISTEMAS, UNIDADES, SistemaUSMLE, unidadDe, diaDesdeInicio, yt, QB,
} from '../../lib/usmleStep1Plan';

/**
 * UsmleTodayPlan — "Hoy" + Curriculum Step 1. Marca el tema del día (Google
 * Calendar, arranque 10-jun) y lo cruza con QBank, Librería, Flashcards, Vídeos
 * (B&B1/2 + Sketchy) y Palmerton. Debajo, el curriculum completo por sistema.
 */
const GREEN = '#3FB984';
const AMBER = '#F5A623';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
const TIER: Record<string, { c: string; t: string }> = {
  CORE: { c: '#E5484D', t: 'Core' }, HIGH: { c: AMBER, t: 'Alto' }, MED: { c: GREEN, t: 'Medio' },
};

function todayISO(): string {
  try {
    const d = new Date();
    const z = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
  } catch { return PLAN_META.inicio; }
}

function TodayCard() {
  const iso = todayISO();
  const u = unidadDe(iso) || UNIDADES[0];
  const dia = diaDesdeInicio(u.fecha);
  const pal = u.palmerton;
  return (
    <GradientHero from="#0E2A1F" to="#0A1424" style={{ marginBottom: Spacing.lg, borderColor: GREEN + '44' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <Text style={st.todayTag}>🗓️ HOY · {u.fecha} · Día {dia}</Text>
        <View style={st.sysBadge}><Text style={st.sysBadgeTxt}>{u.sistema}</Text></View>
      </View>
      <Text style={st.todayFoco}>{u.foco}</Text>
      <Text style={st.todayBloque}>Bloque USMLE (tu Calendar): {PLAN_META.bloque}</Text>

      <View style={st.todayGrid}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QB.videos)} style={[st.todayItem, { borderColor: '#E5484D55' }]}>
          <Text style={st.tiLbl}>🎬 VÍDEO (B&B Step 1)</Text>
          <Text style={st.tiVal}>{u.bbVideo.titulo}</Text>
          <Text style={st.tiSub}>~{u.bbVideo.min} min · abre Qbankly ↗</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QB.qbanks)} style={[st.todayItem, { borderColor: GREEN + '55' }]}>
          <Text style={st.tiLbl}>🅠 QBANK (pre-test)</Text>
          <Text style={st.tiVal}>{u.uworld}</Text>
          <Text style={st.tiSub}>modo tutor · abre Qbankly ↗</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QB.flashcards)} style={[st.todayItem, { borderColor: '#7BB1FF55' }]}>
          <Text style={st.tiLbl}>🗂️ FLASHCARDS</Text>
          <Text style={st.tiVal}>{u.flash}</Text>
          <Text style={st.tiSub}>Anki SRS · abre Qbankly ↗</Text>
        </TouchableOpacity>
        {u.sketchy ? (
          <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QB.videos)} style={[st.todayItem, { borderColor: '#E0A93F55' }]}>
            <Text style={st.tiLbl}>🎨 SKETCHY</Text>
            <Text style={st.tiVal}>{u.sketchy}</Text>
            <Text style={st.tiSub}>mnemotecnia · abre Qbankly ↗</Text>
          </TouchableOpacity>
        ) : null}
        {pal ? (
          <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(yt(pal.id))} style={[st.todayItem, { borderColor: GREEN + '55' }]}>
            <Text style={st.tiLbl}>🧠 PALMERTON</Text>
            <Text style={st.tiVal}>{pal.titulo}</Text>
            <Text style={st.tiSub}>YouTube ↗</Text>
          </TouchableOpacity>
        ) : null}
        <View style={[st.todayItem, { borderColor: AMBER + '55' }]}>
          <Text style={st.tiLbl}>🃏 APEX (Free Recall)</Text>
          <Text style={st.tiVal}>Crea ≤3 tarjetas APEX de razonamiento</Text>
          <Text style={st.tiSub}>tras el pre-test + lectura</Text>
        </View>
      </View>
      <Text style={st.todayFlow}>Flujo: Anchored Eval (tema previo, 2Q+Anki) → Pre-test → ver vídeo → Active Reading → Free Recall → APEX ≤3.</Text>
    </GradientHero>
  );
}

function SistemaRow({ s, i }: { s: SistemaUSMLE; i: number }) {
  const [open, setOpen] = useState(false);
  const tier = TIER[s.tier];
  return (
    <FadeUp delay={Math.min(i * 24, 300)}>
      <View style={[st.card, { borderLeftColor: tier.c }]}>
        <TouchableOpacity activeOpacity={0.82} onPress={() => setOpen((o) => !o)} style={st.head}>
          <View style={[st.tierBadge, { backgroundColor: tier.c + '1F', borderColor: tier.c + '55' }]}>
            <Text style={[st.tierTxt, { color: tier.c }]}>{s.uworldQ}Q</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={st.name} numberOfLines={1}>{s.sistema}</Text>
            <Text style={st.metaSub}>Día {s.diaInicio}+ · {tier.t} · {s.uworldSubtemas.length} subtemas</Text>
          </View>
          {s.palmerton.length ? <View style={st.pFlag}><Text style={st.pFlagTxt}>🧠 Palmerton</Text></View> : null}
          <Text style={[st.caret, open && { color: tier.c }]}>{open ? '▾' : '▸'}</Text>
        </TouchableOpacity>
        {open && (
          <View style={st.body}>
            <View style={[st.pBox, { borderColor: GREEN + '44' }]}>
              <Text style={st.pTitle}>🧠 Palmerton dice</Text>
              <Text style={st.pTxt}>{s.palmertonDice}</Text>
              <View style={st.chipWrap}>
                {s.palmerton.map((p, k) => (
                  <TouchableOpacity key={k} activeOpacity={0.85} onPress={() => openUrl(yt(p.id))} style={st.pVid}>
                    <Text style={st.pVidTxt}>▶ {p.titulo}{p.min ? ` · ${p.min}min` : ''} ↗</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Text style={st.boxLbl}>🅠 QBank · subtemas más preguntados (uWorld)</Text>
            <View style={st.chipWrap}>
              {s.uworldSubtemas.filter((t) => t[1] > 0).map((t, k) => (
                <View key={k} style={st.subChip}><Text style={st.subTxt}>{t[0]} · {t[1]}</Text></View>
              ))}
            </View>

            <Text style={[st.boxLbl, { marginTop: 10 }]}>🎬 Vídeos del sistema</Text>
            {s.bb1 ? <Text style={st.vRow}>• B&B Step 1 → <Text style={st.vB}>{s.bb1.ch}</Text> · {s.bb1.n} vid · {Math.round(s.bb1.min / 60)}h{s.bb1.min % 60}m</Text> : null}
            {s.bb2 && s.bb2.n > 0 ? <Text style={st.vRow}>• B&B Step 2 → <Text style={st.vB}>{s.bb2.ch}</Text> · {s.bb2.n} vid · {Math.round(s.bb2.min / 60)}h{s.bb2.min % 60}m</Text> : null}
            {s.sketchy ? <Text style={st.vRow}>• Sketchy → <Text style={st.vB}>{s.sketchy.ch}</Text>{s.sketchy.n ? ` · ${s.sketchy.n} vid` : ''}</Text> : null}

            <View style={st.linkRow}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QB.qbanks)} style={st.linkBtn}><Text style={st.linkTxt}>QBank ↗</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QB.videos)} style={st.linkBtn}><Text style={st.linkTxt}>Vídeos ↗</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QB.flashcards)} style={st.linkBtn}><Text style={st.linkTxt}>Flashcards: {s.flashDeck} ↗</Text></TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </FadeUp>
  );
}

export default function UsmleTodayPlan() {
  return (
    <View>
      <TodayCard />
      <SectionLabel>Curriculum Step 1 · sistemas por rentabilidad (preguntas uWorld)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.md, padding: Spacing.md }}>
        <Text style={st.intro}>{PLAN_META.metodo}</Text>
        <Text style={st.introNote}>{PLAN_META.nota}</Text>
      </GlassPanel>
      <View style={{ marginBottom: Spacing.xl }}>
        {SISTEMAS.map((s, i) => <SistemaRow key={s.sistema} s={s} i={i} />)}
      </View>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder };
const st = StyleSheet.create({
  todayTag: { fontSize: FontSize.labelMd, fontWeight: '800', color: GREEN },
  sysBadge: { backgroundColor: '#E5484D22', borderRadius: BorderRadius.full, borderWidth: 1, borderColor: '#E5484D66', paddingVertical: 2, paddingHorizontal: 10 },
  sysBadgeTxt: { fontSize: FontSize.labelMd, fontWeight: '800', color: '#FF8A8E' },
  todayFoco: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginTop: 8 },
  todayBloque: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, lineHeight: 15 },
  todayGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.md },
  todayItem: { flexGrow: 1, flexBasis: 200, minWidth: 180, borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.sm, backgroundColor: 'rgba(255,255,255,0.03)' },
  tiLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4 },
  tiVal: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600', marginTop: 3, lineHeight: 16 },
  tiSub: { fontSize: 9, color: Colors.muted, marginTop: 3 },
  todayFlow: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: Spacing.md, lineHeight: 16, fontStyle: 'italic' },

  intro: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17 },
  introNote: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 6, lineHeight: 15 },

  card: { ...cardBase, borderLeftWidth: 3, marginBottom: Spacing.sm, overflow: 'hidden' },
  head: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, padding: Spacing.md },
  tierBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 8, minWidth: 48, alignItems: 'center' },
  tierTxt: { fontSize: 10, fontWeight: '800' },
  name: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  metaSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2 },
  pFlag: { backgroundColor: GREEN + '1A', borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 6 },
  pFlagTxt: { fontSize: 9, fontWeight: '800', color: GREEN },
  caret: { fontSize: 16, color: Colors.muted, width: 18, textAlign: 'center' },

  body: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: Spacing.sm },
  pBox: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.md, backgroundColor: 'rgba(63,185,132,0.05)', marginBottom: Spacing.sm },
  pTitle: { fontSize: FontSize.labelMd, fontWeight: '800', color: GREEN, marginBottom: 4 },
  pTxt: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17 },
  pVid: { backgroundColor: GREEN + '18', borderRadius: BorderRadius.sm, paddingVertical: 4, paddingHorizontal: 8, borderWidth: 1, borderColor: GREEN + '44', marginTop: 6 },
  pVidTxt: { fontSize: 10, color: GREEN, fontWeight: '700' },

  boxLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4, marginBottom: 6 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 2 },
  subChip: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: BorderRadius.sm, paddingVertical: 3, paddingHorizontal: 7 },
  subTxt: { fontSize: 10, color: Colors.onSurfaceVariant },
  vRow: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 18 },
  vB: { color: Colors.onSurface, fontWeight: '700' },
  linkRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  linkBtn: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: BorderRadius.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', paddingVertical: 5, paddingHorizontal: 10 },
  linkTxt: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, fontWeight: '600' },
});
