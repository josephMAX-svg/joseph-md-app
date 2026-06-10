import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  DAILY_META, FRANJAS, DIAS, DiaUSMLE, diaDe, diaPrevio, ventana7d, TIER_INFO,
  QBV, QBQ, QBF, yt,
} from '../../lib/usmleStep1Daily';

/**
 * UsmleTodayPlan — Plan Step 1 día-a-día, estilo Perú/ENCAPS pero mejor.
 * Botones Step 1/2/3 · navegación Día X/70 (◄►) · sub-pestañas HOY/Horario/7d ·
 * cola de materiales con links exactos (B&B, Sketchy, uWorld, Flashcards, Palmerton).
 */
const GREEN = '#3FB984';
const RED = '#E5484D';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return DAILY_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}

/** material → icono + dónde abrirlo */
function matLink(d: DiaUSMLE): { lbl: string; url: string } {
  if (/Sketchy/i.test(d.mat)) return { lbl: d.mat, url: QBV };
  return { lbl: d.mat, url: QBV };
}

function ColaItem({ icon, lbl, val, sub, color, url }: { icon: string; lbl: string; val: string; sub: string; color: string; url: string }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(url)} style={[st.cola, { borderLeftColor: color }]}>
      <Text style={st.colaIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={st.colaLbl}>{lbl}</Text>
        <Text style={st.colaVal} numberOfLines={2}>{val}</Text>
        <Text style={st.colaSub}>{sub}</Text>
      </View>
      <View style={[st.verBtn, { borderColor: color + '88' }]}><Text style={[st.verTxt, { color }]}>ver ↗</Text></View>
    </TouchableOpacity>
  );
}

function HoyView({ dia }: { dia: DiaUSMLE }) {
  const prev = diaPrevio(dia);
  const tier = TIER_INFO[dia.tier];
  return (
    <View>
      {/* Tema del día */}
      <FadeUp>
        <View style={[st.temaCard, { borderColor: tier.c + '55' }]}>
          <View style={st.temaTop}>
            <View style={[st.sysBadge, { backgroundColor: tier.c + '1F', borderColor: tier.c + '66' }]}>
              <Text style={[st.sysBadgeTxt, { color: tier.c }]}>{dia.system}</Text>
            </View>
            <Chip label={tier.t} color={tier.c} small />
            <Chip label="1ª vuelta" color={GREEN} small />
            <Chip label="Modo A" color={Colors.muted} small />
          </View>
          <Text style={st.temaTitle}>{dia.sub}</Text>
          <Text style={st.temaSub}>Subtema atómico del día · 1/día (mejor consolidación que cobertura)</Text>
        </View>
      </FadeUp>

      {/* Anchored eval (tema previo) */}
      {prev && (
        <FadeUp delay={40}>
          <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QBQ)} style={st.anchor}>
            <Text style={st.anchorLbl}>🎯 16:15 · Anchored Eval (tema de AYER)</Text>
            <Text style={st.anchorVal}>{prev.system} → {prev.sub}</Text>
            <Text style={st.anchorSub}>2 preguntas uWorld + Anki SRS · 2/2→nuevo · 1/2→repaso finde · 0/2→repetir</Text>
          </TouchableOpacity>
        </FadeUp>
      )}

      {/* Cola de materiales de hoy */}
      <Text style={st.secLbl}>📋 Cola de hoy · 16:30–17:15 (en orden)</Text>
      <FadeUp delay={60}><ColaItem icon="🅠" lbl="PRE-TEST · uWorld (modo tutor)" val={`${dia.system} → ${dia.uw} · 3 preguntas ciegas + free recall 60s`} sub="Qbankly → QBanks → uWorld Step 1" color={GREEN} url={QBQ} /></FadeUp>
      <FadeUp delay={90}><ColaItem icon="🎬" lbl="VÍDEO · Boards & Beyond Step 1" val={`${dia.bbCh} → ${dia.bbVid}`} sub="Qbankly → Video Library → B&B Step 1" color={RED} url={QBV} /></FadeUp>
      <FadeUp delay={120}><ColaItem icon="📖" lbl="ACTIVE READING · material primario" val={matLink(dia).lbl} sub="25 min · marca 3-5 puntos high-yield · glosario inglés" color="#7BB1FF" url={matLink(dia).url} /></FadeUp>
      <FadeUp delay={150}><ColaItem icon="🗂️" lbl="FLASHCARDS · uWorld Step 1" val={`Deck: ${dia.system}`} sub="Qbankly → Flashcards · Anki SRS" color="#AFCBFF" url={QBF} /></FadeUp>
      {dia.palm && (
        <FadeUp delay={180}><ColaItem icon="🧠" lbl="PALMERTON · al empezar el sistema" val={dia.palm.t} sub="YouTube · método + visión del sistema" color={GREEN} url={yt(dia.palm.id)} /></FadeUp>
      )}
      <FadeUp delay={210}>
        <View style={[st.cola, { borderLeftColor: '#F5A623' }]}>
          <Text style={st.colaIcon}>🃏</Text>
          <View style={{ flex: 1 }}>
            <Text style={st.colaLbl}>APEX · 17:05–17:15</Text>
            <Text style={st.colaVal}>Crea ≤3 tarjetas APEX (formato Palmerton · ≥1 mnemónica Sketchy)</Text>
            <Text style={st.colaSub}>Free recall a papel en blanco antes (en inglés)</Text>
          </View>
        </View>
      </FadeUp>
    </View>
  );
}

function HorarioView() {
  return (
    <View>
      <Text style={st.secLbl}>🕓 Bloque USMLE diario (Google Calendar · hora Lima)</Text>
      {FRANJAS.map((f, i) => (
        <FadeUp key={i} delay={i * 30}>
          <View style={st.franja}>
            <View style={st.franjaHora}><Text style={st.franjaHoraTxt}>{f.hora}</Text></View>
            <Text style={st.franjaFase}>{f.fase}</Text>
          </View>
        </FadeUp>
      ))}
      <Text style={st.note}>16:15–16:30 = repaso del tema de ayer (Anchored Eval). 16:30–17:15 = subtema nuevo (Mini Deep Work). Todo en inglés.</Text>
    </View>
  );
}

function SieteView({ fromD }: { fromD: number }) {
  const win = ventana7d(fromD);
  return (
    <View>
      <Text style={st.secLbl}>📆 Próximos 7 días</Text>
      {win.map((x, i) => {
        const tier = TIER_INFO[x.tier];
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <View style={[st.d7, { borderLeftColor: tier.c }]}>
              <Text style={[st.d7day, { color: tier.c }]}>D{x.d}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.sub}</Text>
                <Text style={st.d7sys}>{x.system}</Text>
              </View>
            </View>
          </FadeUp>
        );
      })}
    </View>
  );
}

export default function UsmleTodayPlan() {
  const iso = todayISO();
  const todayDia = diaDe(iso) || DIAS[0];
  const [sel, setSel] = useState<number>(todayDia.d);
  const [view, setView] = useState<'hoy' | 'horario' | '7d'>('hoy');
  const dia = DIAS.find((x) => x.d === sel) || DIAS[0];
  const esHoy = dia.fecha === iso;

  return (
    <View>
      {/* Botones grandes Step 1 / 2 / 3 */}
      <View style={st.stepRow}>
        <View style={[st.stepBtn, st.stepActive]}>
          <Text style={st.stepBig}>STEP 1</Text>
          <Text style={st.stepSub}>Foundation · 80% del foco</Text>
        </View>
        <View style={[st.stepBtn, st.stepSoon]}>
          <Text style={[st.stepBig, { color: Colors.muted }]}>STEP 2 CK</Text>
          <Text style={st.stepSub}>próximamente</Text>
        </View>
        <View style={[st.stepBtn, st.stepSoon]}>
          <Text style={[st.stepBig, { color: Colors.muted }]}>STEP 3</Text>
          <Text style={st.stepSub}>próximamente</Text>
        </View>
      </View>

      {/* Navegación de día */}
      <View style={st.navRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.max(1, s - 1))} style={st.navArrow}><Text style={st.navArrowTxt}>◄</Text></TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={st.navDay}>Día {dia.d}/{DAILY_META.totalDias}{esHoy ? ' · HOY' : ''}</Text>
          <Text style={st.navFecha}>{fmtFecha(dia.fecha)} · {dia.fecha}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.min(DAILY_META.totalDias, s + 1))} style={st.navArrow}><Text style={st.navArrowTxt}>►</Text></TouchableOpacity>
      </View>
      {!esHoy && <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(todayDia.d)} style={st.hoyBtn}><Text style={st.hoyBtnTxt}>↩ volver a HOY</Text></TouchableOpacity>}

      {/* Sub-pestañas */}
      <View style={st.subTabs}>
        {([['hoy', '📋 HOY'], ['horario', '🕓 Horario'], ['7d', '📆 7 días']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
            <Text style={[st.subTabTxt, view === k && { color: GREEN }]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <GlassPanel style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
        {view === 'hoy' ? <HoyView dia={dia} /> : view === 'horario' ? <HorarioView /> : <SieteView fromD={dia.d} />}
      </GlassPanel>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder };
const st = StyleSheet.create({
  stepRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  stepBtn: { flex: 1, borderRadius: BorderRadius.lg, borderWidth: 1, paddingVertical: Spacing.md, alignItems: 'center' },
  stepActive: { backgroundColor: GREEN + '1A', borderColor: GREEN + '88' },
  stepSoon: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' },
  stepBig: { fontSize: FontSize.titleMd, fontWeight: '900', color: GREEN, letterSpacing: 0.5 },
  stepSub: { fontSize: 9, color: Colors.muted, marginTop: 2 },

  navRow: { flexDirection: 'row', alignItems: 'center', ...cardBase, padding: Spacing.sm, marginBottom: Spacing.xs },
  navArrow: { width: 40, height: 40, borderRadius: BorderRadius.md, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  navArrowTxt: { fontSize: 16, color: GREEN, fontWeight: '800' },
  navDay: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface },
  navFecha: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1 },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: GREEN, fontWeight: '700' },

  subTabs: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm },
  subTab: { flex: 1, paddingVertical: 7, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', alignItems: 'center' },
  subTabOn: { backgroundColor: GREEN + '14', borderColor: GREEN + '55' },
  subTabTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted },

  temaCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm },
  temaTop: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  sysBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 2, paddingHorizontal: 10 },
  sysBadgeTxt: { fontSize: FontSize.labelMd, fontWeight: '800' },
  temaTitle: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: 8 },
  temaSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 3 },

  anchor: { ...cardBase, borderLeftWidth: 3, borderLeftColor: '#7BB1FF', padding: Spacing.md, marginBottom: Spacing.sm },
  anchorLbl: { fontSize: FontSize.labelMd, fontWeight: '800', color: '#AFCBFF' },
  anchorVal: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface, marginTop: 3 },
  anchorSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2, lineHeight: 15 },

  secLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4, marginBottom: 8, marginTop: Spacing.sm },
  cola: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 6 },
  colaIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  colaLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.3 },
  colaVal: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600', marginTop: 2, lineHeight: 16 },
  colaSub: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  verBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 10 },
  verTxt: { fontSize: FontSize.labelSm, fontWeight: '800' },

  franja: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 7, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  franjaHora: { backgroundColor: GREEN + '14', borderRadius: BorderRadius.sm, paddingVertical: 3, paddingHorizontal: 7, minWidth: 96, alignItems: 'center' },
  franjaHoraTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: GREEN },
  franjaFase: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: 15 },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.sm, marginBottom: 5 },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 36 },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 1 },
});
