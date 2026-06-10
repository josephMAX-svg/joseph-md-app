import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  MIR_DAILY_META, MIR_FRANJAS, MIR_DIAS, DiaMIR, mirDiaDe, mirPrevio, mir7d, MIR_RENT, capUrl,
} from '../../lib/mirDailyPlan';

/**
 * MirTodayPlan — Plan MIR día-a-día (ProMIR), estilo USMLE/Perú. Vueltas (1ª/2ª/3ª),
 * navegación Día X/76, HOY/Horario/7d, cola de materiales con deep-links a ProMIR.
 */
const AMBER = '#F5A623';
const BLUE = '#7BB1FF';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return MIR_DAILY_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}
const vueltaTxt = (v: number) => (v === 1 ? '1ª vuelta' : v === 2 ? '2ª vuelta' : `${v}ª vuelta`);

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

function HoyView({ dia }: { dia: DiaMIR }) {
  const prev = mirPrevio(dia);
  const tier = MIR_RENT[dia.rent] || MIR_RENT.verde;
  return (
    <View>
      <FadeUp>
        <View style={[st.temaCard, { borderColor: tier.c + '55' }]}>
          <View style={st.temaTop}>
            <View style={[st.sysBadge, { backgroundColor: tier.c + '1F', borderColor: tier.c + '66' }]}>
              <Text style={[st.sysBadgeTxt, { color: tier.c }]}>{dia.asignatura}</Text>
            </View>
            <Chip label={`Rent. ${tier.t}`} color={tier.c} small />
            {dia.peso != null ? <Chip label={`Peso MIR ${dia.peso}%`} color={AMBER} small /> : null}
            <Chip label={vueltaTxt(dia.vuelta)} color="#4Fae6b" small />
            <Chip label="CRÍTICA" color={Colors.coral} small />
          </View>
          <Text style={st.temaTitle}>{dia.tema}</Text>
          <Text style={st.temaSub}>Tema atómico del día · 1/día (Atomic notes · profundidad &gt; amplitud)</Text>
        </View>
      </FadeUp>

      {prev && (
        <FadeUp delay={40}>
          <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(capUrl(prev.capId))} style={st.anchor}>
            <Text style={st.anchorLbl}>🎯 15:15 · Evaluación Anclada (tema de AYER)</Text>
            <Text style={st.anchorVal}>{prev.asignatura} → {prev.tema}</Text>
            <Text style={st.anchorSub}>4 preguntas ProMIR/AMIR + Anki · 4/4→nuevo · 3/4→repaso finde · &lt;3/4→repetir</Text>
          </TouchableOpacity>
        </FadeUp>
      )}

      <Text style={st.secLbl}>📋 Cola de hoy · 15:30–16:15 (en orden)</Text>
      <FadeUp delay={60}><ColaItem icon="❓" lbl="PRE-TEST · 3Q ciegas (AMIR Test)" val={`${dia.asignatura} → ${dia.tema} · + free recall 60s`} sub="ProMIR → Entrenar · marca 2-3 gaps" color="#4Fae6b" url={capUrl(dia.capId)} /></FadeUp>
      <FadeUp delay={90}><ColaItem icon="🎬" lbl="VÍDEO · ProMIR (videoclase)" val={`${dia.asignatura} → ${dia.tema}${dia.resumenVid ? ` · resumen ${dia.resumenVid}` : ''}`} sub="abre el capítulo en ProMIR ↗" color={AMBER} url={capUrl(dia.capId)} /></FadeUp>
      <FadeUp delay={120}><ColaItem icon="📖" lbl="LECTURA ACTIVA · Compendio" val="AMIR / ProMIR del subtema (25 min · 3-5 puntos clave)" sub="conexión con ENCAPS · dudas → CCSN" color={BLUE} url={capUrl(dia.capId)} /></FadeUp>
      <FadeUp delay={150}>
        <View style={[st.cola, { borderLeftColor: AMBER }]}>
          <Text style={st.colaIcon}>🃏</Text>
          <View style={{ flex: 1 }}>
            <Text style={st.colaLbl}>APEX · 16:05–16:15</Text>
            <Text style={st.colaVal}>Crea ≤4 tarjetas APEX (formato ENCAPS · conexión USMLE/ENCAPS)</Text>
            <Text style={st.colaSub}>Free recall libro cerrado (mapa mental) antes</Text>
          </View>
        </View>
      </FadeUp>
    </View>
  );
}

function HorarioView() {
  return (
    <View>
      <Text style={st.secLbl}>🕓 Bloque MIR diario (Google Calendar · hora Lima)</Text>
      {MIR_FRANJAS.map((f, i) => (
        <FadeUp key={i} delay={i * 30}>
          <View style={st.franja}>
            <View style={st.franjaHora}><Text style={st.franjaHoraTxt}>{f.hora}</Text></View>
            <Text style={st.franjaFase}>{f.fase}</Text>
          </View>
        </FadeUp>
      ))}
      <Text style={st.note}>15:15–15:30 = repaso del tema de ayer (Evaluación Anclada). 15:30–16:15 = subtema nuevo (Deep Work Mini).</Text>
    </View>
  );
}

function SieteView({ fromD }: { fromD: number }) {
  const win = mir7d(fromD);
  return (
    <View>
      <Text style={st.secLbl}>📆 Próximos 7 días</Text>
      {win.map((x, i) => {
        const tier = MIR_RENT[x.rent] || MIR_RENT.verde;
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <View style={[st.d7, { borderLeftColor: tier.c }]}>
              <Text style={[st.d7day, { color: tier.c }]}>D{x.d}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.tema}</Text>
                <Text style={st.d7sys}>{x.asignatura}{x.peso != null ? ` · ${x.peso}%` : ''} · {vueltaTxt(x.vuelta)}</Text>
              </View>
            </View>
          </FadeUp>
        );
      })}
    </View>
  );
}

export default function MirTodayPlan() {
  const iso = todayISO();
  const todayDia = mirDiaDe(iso) || MIR_DIAS[0];
  const [sel, setSel] = useState<number>(todayDia.d);
  const [view, setView] = useState<'hoy' | 'horario' | '7d'>('hoy');
  const dia = MIR_DIAS.find((x) => x.d === sel) || MIR_DIAS[0];
  const esHoy = dia.fecha === iso;

  return (
    <View>
      {/* Contexto: MIR · vuelta */}
      <View style={st.ctxRow}>
        <View style={[st.ctxBtn, st.ctxActive]}>
          <Text style={st.ctxBig}>MIR 2030</Text>
          <Text style={st.ctxSub}>1ª vuelta · ProMIR + AMIR · 100% foco</Text>
        </View>
        <View style={[st.ctxBtn, st.ctxSoon]}><Text style={[st.ctxBig, { color: Colors.muted }]}>2ª vuelta</Text><Text style={st.ctxSub}>tras 1ª</Text></View>
        <View style={[st.ctxBtn, st.ctxSoon]}><Text style={[st.ctxBig, { color: Colors.muted }]}>3ª vuelta</Text><Text style={st.ctxSub}>recta final</Text></View>
      </View>

      <View style={st.navRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.max(1, s - 1))} style={st.navArrow}><Text style={st.navArrowTxt}>◄</Text></TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={st.navDay}>Día {dia.d}/{MIR_DAILY_META.totalDias}{esHoy ? ' · HOY' : ''}</Text>
          <Text style={st.navFecha}>{fmtFecha(dia.fecha)} · {dia.fecha}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.min(MIR_DAILY_META.totalDias, s + 1))} style={st.navArrow}><Text style={st.navArrowTxt}>►</Text></TouchableOpacity>
      </View>
      {!esHoy && <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(todayDia.d)} style={st.hoyBtn}><Text style={st.hoyBtnTxt}>↩ volver a HOY</Text></TouchableOpacity>}

      <View style={st.subTabs}>
        {([['hoy', '📋 HOY'], ['horario', '🕓 Horario'], ['7d', '📆 7 días']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
            <Text style={[st.subTabTxt, view === k && { color: AMBER }]}>{lbl}</Text>
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
  ctxRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  ctxBtn: { flex: 1, borderRadius: BorderRadius.lg, borderWidth: 1, paddingVertical: Spacing.md, alignItems: 'center' },
  ctxActive: { backgroundColor: AMBER + '1A', borderColor: AMBER + '88' },
  ctxSoon: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' },
  ctxBig: { fontSize: FontSize.titleMd, fontWeight: '900', color: AMBER, letterSpacing: 0.5 },
  ctxSub: { fontSize: 9, color: Colors.muted, marginTop: 2 },

  navRow: { flexDirection: 'row', alignItems: 'center', ...cardBase, padding: Spacing.sm, marginBottom: Spacing.xs },
  navArrow: { width: 40, height: 40, borderRadius: BorderRadius.md, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  navArrowTxt: { fontSize: 16, color: AMBER, fontWeight: '800' },
  navDay: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface },
  navFecha: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1 },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: AMBER, fontWeight: '700' },

  subTabs: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm },
  subTab: { flex: 1, paddingVertical: 7, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', alignItems: 'center' },
  subTabOn: { backgroundColor: AMBER + '14', borderColor: AMBER + '55' },
  subTabTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted },

  temaCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm },
  temaTop: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  sysBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 2, paddingHorizontal: 10 },
  sysBadgeTxt: { fontSize: FontSize.labelMd, fontWeight: '800' },
  temaTitle: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: 8 },
  temaSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 3 },

  anchor: { ...cardBase, borderLeftWidth: 3, borderLeftColor: BLUE, padding: Spacing.md, marginBottom: Spacing.sm },
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
  franjaHora: { backgroundColor: AMBER + '14', borderRadius: BorderRadius.sm, paddingVertical: 3, paddingHorizontal: 7, minWidth: 96, alignItems: 'center' },
  franjaHoraTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: AMBER },
  franjaFase: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: 15 },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.sm, marginBottom: 5 },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 36 },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 1 },
});
