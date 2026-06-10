import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  MIR_DAILY_META, MIR_FRANJAS, MIR_DIAS, DiaMIR, mirDiaDe, mirPrevio, mir7d, MIR_RENT, capUrl,
} from '../../lib/mirDailyPlan';
import { agruparProgreso, planHoyD, progresoGlobal, GrupoProgreso } from '../../lib/studyProgress';

/**
 * MirTodayPlan — Plan MIR día-a-día (ProMIR), estilo USMLE/Perú. Vueltas (1ª/2ª/3ª),
 * navegación Día X/76, sub-pestañas HOY/Horario/7d/Temario. 7 días y temario son
 * clicables → saltan al día. El badge de asignatura lleva al Temario con el progreso
 * real del plan por asignatura. Cada asignatura abre su temario completo en ProMIR.
 */
const AMBER = '#F5A623';
const BLUE = '#7BB1FF';
const GREEN = '#4Fae6b';
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

function HoyView({ dia, onOpenTemario }: { dia: DiaMIR; onOpenTemario: () => void }) {
  const prev = mirPrevio(dia);
  const tier = MIR_RENT[dia.rent] || MIR_RENT.verde;
  return (
    <View>
      <FadeUp>
        <View style={[st.temaCard, { borderColor: tier.c + '55' }]}>
          <View style={st.temaTop}>
            <TouchableOpacity activeOpacity={0.8} onPress={onOpenTemario} style={[st.sysBadge, { backgroundColor: tier.c + '1F', borderColor: tier.c + '66' }]}>
              <Text style={[st.sysBadgeTxt, { color: tier.c }]}>{dia.asignatura} ›</Text>
            </TouchableOpacity>
            <Chip label={`Rent. ${tier.t}`} color={tier.c} small />
            {dia.peso != null ? <Chip label={`Peso MIR ${dia.peso}%`} color={AMBER} small /> : null}
            <Chip label={vueltaTxt(dia.vuelta)} color={GREEN} small />
          </View>
          <Text style={st.temaTitle}>{dia.tema}</Text>
          <Text style={st.temaSub}>Tema atómico del día · 1/día · toca la asignatura para ver todo el temario y tu avance ›</Text>
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
      <FadeUp delay={60}><ColaItem icon="❓" lbl="PRE-TEST · 3Q ciegas (AMIR Test)" val={`${dia.asignatura} → ${dia.tema} · + free recall 60s`} sub="ProMIR → Entrenar · marca 2-3 gaps" color={GREEN} url={capUrl(dia.capId)} /></FadeUp>
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

function HorarioView({ dia }: { dia: DiaMIR }) {
  const prev = mirPrevio(dia);
  const detalle = (tipo: string): string => {
    if (tipo === 'eval') return prev ? `${prev.asignatura} → ${prev.tema}` : 'no hay día previo';
    if (tipo === 'pretest') return `${dia.asignatura} → ${dia.tema}`;
    if (tipo === 'read') return `${dia.tema}${dia.resumenVid ? ` · resumen ${dia.resumenVid}` : ''}`;
    return '';
  };
  return (
    <View>
      <Text style={st.secLbl}>🕓 Bloque MIR · Día {dia.d} ({fmtFecha(dia.fecha)}) · hora Lima</Text>
      {MIR_FRANJAS.map((f, i) => {
        const det = detalle(f.tipo);
        return (
          <FadeUp key={i} delay={i * 25}>
            <View style={st.franja}>
              <View style={st.franjaHora}><Text style={st.franjaHoraTxt}>{f.hora}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={st.franjaFase}>{f.fase}</Text>
                {det ? <Text style={st.franjaDet}>↳ {det}</Text> : null}
              </View>
            </View>
          </FadeUp>
        );
      })}
      <Text style={st.note}>15:15–15:30 = repaso del tema de ayer (Evaluación Anclada). 15:30–16:15 = subtema nuevo (Deep Work Mini).</Text>
    </View>
  );
}

function SieteView({ fromD, onPick }: { fromD: number; onPick: (d: number) => void }) {
  const win = mir7d(fromD);
  return (
    <View>
      <Text style={st.secLbl}>📆 Próximos 7 días · toca un día para abrirlo</Text>
      {win.map((x, i) => {
        const tier = MIR_RENT[x.rent] || MIR_RENT.verde;
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: tier.c }]}>
              <Text style={[st.d7day, { color: tier.c }]}>D{x.d}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.tema}</Text>
                <Text style={st.d7sys}>{x.asignatura}{x.peso != null ? ` · ${x.peso}%` : ''} · {vueltaTxt(x.vuelta)}</Text>
              </View>
              <Text style={st.d7go}>→</Text>
            </TouchableOpacity>
          </FadeUp>
        );
      })}
    </View>
  );
}

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <View style={st.barTrack}>
      <View style={[st.barFill, { width: (`${Math.max(0, Math.min(100, pct))}%` as any), backgroundColor: color }]} />
    </View>
  );
}

function AsignaturaCard({ g, hoyD, onPick }: { g: GrupoProgreso<DiaMIR>; hoyD: number; onPick: (d: number) => void }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const tier = MIR_RENT[g.dias[0].rent] || MIR_RENT.verde;
  const peso = g.dias[0].peso;
  const estadoTxt = g.estado === 'completado' ? '✓ completado' : g.estado === 'en-curso' ? `en curso · ${g.pct}%` : `pendiente · empieza D${g.primerD}`;
  const estadoColor = g.estado === 'completado' ? GREEN : g.estado === 'en-curso' ? tier.c : Colors.muted;
  return (
    <View style={[st.sysCard, { borderColor: tier.c + (g.estado === 'en-curso' ? '88' : '2E') }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
        <View style={st.sysHead}>
          <Text style={st.sysTitle} numberOfLines={1}>{open ? '▾' : '▸'} {g.clave}</Text>
          {peso != null ? <Text style={[st.sysPeso, { color: AMBER }]}>{peso}%</Text> : null}
          <Text style={[st.sysCount, { color: estadoColor }]}>{g.hechos}/{g.total}</Text>
        </View>
        <ProgressBar pct={g.estado === 'completado' ? 100 : g.pct} color={tier.c} />
        <Text style={[st.sysEstado, { color: estadoColor }]}>
          {estadoTxt}{g.diaActual ? ` · hoy: ${g.diaActual.tema}` : ''}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(capUrl(g.dias[0].capId))} style={[st.verWide, { borderColor: tier.c + '88' }]}>
        <Text style={[st.verTxt, { color: tier.c }]}>Ver todo el temario en ProMIR ↗</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: 8 }}>
          {g.dias.map((x) => {
            const done = x.d < hoyD, now = x.d === hoyD;
            return (
              <TouchableOpacity key={x.d} activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.temaRow, now && st.temaRowOn]}>
                <Text style={[st.temaRowD, { color: done ? GREEN : now ? tier.c : Colors.muted }]}>{done ? '✓' : now ? '▶' : '·'} D{x.d}</Text>
                <Text style={st.temaRowTxt} numberOfLines={1}>{x.tema}</Text>
                <Text style={st.temaRowGo}>→</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

function TemarioView({ hoyD, onPick }: { hoyD: number; onPick: (d: number) => void }) {
  const grupos = agruparProgreso(MIR_DIAS, (x) => x.asignatura, hoyD);
  const glob = progresoGlobal(MIR_DIAS, hoyD);
  return (
    <View>
      <View style={st.globCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={st.globTitle}>🗂️ Temario MIR · progreso del plan</Text>
          <Text style={[st.globPct, { color: AMBER }]}>{glob.pct}%</Text>
        </View>
        <ProgressBar pct={glob.pct} color={AMBER} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} temas · hoy = Día {hoyD} de {glob.total} · {grupos.length} asignaturas · 1ª vuelta</Text>
      </View>
      {grupos.map((g) => <AsignaturaCard key={g.clave} g={g} hoyD={hoyD} onPick={onPick} />)}
      <Text style={st.note}>Progreso = temas del plan ya cubiertos / total de la asignatura (ritmo previsto, hoy = Día {hoyD}). El tema en curso se resalta. Toca cualquier tema para ir a ese día.</Text>
    </View>
  );
}

export default function MirTodayPlan() {
  const iso = todayISO();
  const hoyD = planHoyD(MIR_DIAS, iso);
  const todayDia = mirDiaDe(iso) || MIR_DIAS.find((x) => x.d === hoyD) || MIR_DIAS[0];
  const [sel, setSel] = useState<number>(todayDia.d);
  const [view, setView] = useState<'hoy' | 'horario' | '7d' | 'temario'>('hoy');
  const dia = MIR_DIAS.find((x) => x.d === sel) || MIR_DIAS[0];
  const esHoy = dia.fecha === iso;
  const pickDay = (d: number) => { setSel(d); setView('hoy'); };

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
        {([['hoy', '📋 HOY'], ['horario', '🕓 Horario'], ['7d', '📆 7 días'], ['temario', '🗂️ Temario']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
            <Text style={[st.subTabTxt, view === k && { color: AMBER }]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <GlassPanel style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
        {view === 'hoy' ? <HoyView dia={dia} onOpenTemario={() => setView('temario')} />
          : view === 'horario' ? <HorarioView dia={dia} />
          : view === '7d' ? <SieteView fromD={dia.d} onPick={pickDay} />
          : <TemarioView hoyD={hoyD} onPick={pickDay} />}
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
  verBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center' },
  verWide: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 7, paddingHorizontal: 10, alignItems: 'center', marginTop: 8 },
  verTxt: { fontSize: FontSize.labelSm, fontWeight: '800' },

  franja: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 7, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  franjaHora: { backgroundColor: AMBER + '14', borderRadius: BorderRadius.sm, paddingVertical: 3, paddingHorizontal: 7, minWidth: 96, alignItems: 'center' },
  franjaHoraTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: AMBER },
  franjaFase: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
  franjaDet: { fontSize: FontSize.labelSm, color: AMBER, marginTop: 2, fontWeight: '600' },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: 15 },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.sm, marginBottom: 5 },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 36 },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 1 },
  d7go: { fontSize: 16, color: AMBER, fontWeight: '800', width: 18, textAlign: 'center' },

  // Temario
  globCard: { ...cardBase, padding: Spacing.md, marginBottom: Spacing.sm },
  globTitle: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface },
  globPct: { fontSize: FontSize.bodyLg, fontWeight: '900' },
  globSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 5 },
  barTrack: { height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  barFill: { height: 7, borderRadius: 4 },
  sysCard: { ...cardBase, padding: Spacing.md, marginBottom: 6 },
  sysHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  sysTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flex: 1 },
  sysPeso: { fontSize: FontSize.labelMd, fontWeight: '800', marginLeft: 8 },
  sysCount: { fontSize: FontSize.labelMd, fontWeight: '800', marginLeft: 8 },
  sysEstado: { fontSize: FontSize.labelSm, fontWeight: '700', marginTop: 5 },
  temaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6, paddingHorizontal: 6, borderRadius: BorderRadius.sm, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  temaRowOn: { backgroundColor: AMBER + '12' },
  temaRowD: { fontSize: FontSize.labelSm, fontWeight: '800', width: 40 },
  temaRowTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  temaRowGo: { fontSize: 14, color: Colors.muted, width: 16, textAlign: 'center' },
});
