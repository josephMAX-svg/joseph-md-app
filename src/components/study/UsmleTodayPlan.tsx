import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  DAILY_META, FRANJAS, DIAS, DiaUSMLE, diaDe, diaPrevio, ventana7d, TIER_INFO,
  QBV, QBQ, QBF, QBL, yt,
} from '../../lib/usmleStep1Daily';
import { agruparProgreso, planHoyD, progresoGlobal, GrupoProgreso, loadDone, saveDone } from '../../lib/studyProgress';
import { usmleObsUrl } from '../../lib/obsidianMap';

/**
 * UsmleTodayPlan — Plan Step 1 día-a-día, estilo Perú/ENCAPS pero mejor.
 * Botones Step 1/2/3 · navegación Día X/70 (◄►) · sub-pestañas HOY/Horario/7d/Temario.
 * Qbankly SOLO abre en Edge → cada link Qbankly ofrece botón "Edge" (microsoft-edge:)
 * además del de Chrome. 7 días y temario son clicables → saltan al día. El badge de
 * sistema lleva al Temario con el progreso real del plan por sistema.
 */
const GREEN = '#3FB984';
const RED = '#E5484D';
const EDGE = '#3DA5E0';
const OBS = '#A78BFA';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function openEdge(u: string) { Linking.openURL('microsoft-edge:' + u).catch(() => openUrl(u)); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return DAILY_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}

/** Cola de hoy: ítem con link. `edge` añade el botón Microsoft Edge (para Qbankly). */
function ColaItem({ icon, lbl, val, sub, color, url, edge }: { icon: string; lbl: string; val: string; sub: string; color: string; url: string; edge?: boolean }) {
  return (
    <View style={[st.cola, { borderLeftColor: color }]}>
      <Text style={st.colaIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={st.colaLbl}>{lbl}</Text>
        <Text style={st.colaVal} numberOfLines={2}>{val}</Text>
        <Text style={st.colaSub}>{sub}</Text>
      </View>
      <View style={{ gap: 5, minWidth: 64 }}>
        {edge && (
          <TouchableOpacity activeOpacity={0.85} onPress={() => openEdge(url)} style={st.edgeBtn}>
            <Text style={st.edgeTxt}>◆ Edge</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(url)} style={[st.verBtn, { borderColor: color + '88' }]}>
          <Text style={[st.verTxt, { color }]}>{edge ? 'Chrome ↗' : 'ver ↗'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HoyView({ dia, onOpenTemario, hecho, onToggle }: { dia: DiaUSMLE; onOpenTemario: () => void; hecho: boolean; onToggle: (d: number) => void }) {
  const prev = diaPrevio(dia);
  const tier = TIER_INFO[dia.tier];
  return (
    <View>
      {/* Tema del día — el badge de sistema lleva al Temario */}
      <FadeUp>
        <View style={[st.temaCard, { borderColor: tier.c + '55' }]}>
          <View style={st.temaTop}>
            <TouchableOpacity activeOpacity={0.8} onPress={onOpenTemario} style={[st.sysBadge, { backgroundColor: tier.c + '1F', borderColor: tier.c + '66' }]}>
              <Text style={[st.sysBadgeTxt, { color: tier.c }]}>{dia.system} ›</Text>
            </TouchableOpacity>
            <Chip label={tier.t} color={tier.c} small />
            <Chip label="1ª vuelta" color={GREEN} small />
            <Chip label="Modo A" color={Colors.muted} small />
          </View>
          <Text style={st.temaTitle}>{dia.sub}</Text>
          <Text style={st.temaSub}>Subtema atómico del día · 1/día · toca el sistema para ver todo el temario y tu avance ›</Text>
          <TouchableOpacity activeOpacity={0.85} onPress={() => onToggle(dia.d)} style={[st.doneBtn, hecho ? st.doneBtnOn : st.doneBtnOff]}>
            <Text style={[st.doneBtnTxt, { color: hecho ? '#0A1A12' : GREEN }]}>{hecho ? '✓ Completado hoy' : '○ Marcar como completado'}</Text>
          </TouchableOpacity>
        </View>
      </FadeUp>

      {/* Anchored eval (tema previo) */}
      {prev && (
        <FadeUp delay={40}>
          <View style={st.anchor}>
            <Text style={st.anchorLbl}>🎯 16:15 · Anchored Eval (tema de AYER)</Text>
            <Text style={st.anchorVal}>{prev.system} → {prev.sub}</Text>
            <Text style={st.anchorSub}>2 preguntas uWorld + Anki SRS · 2/2→nuevo · 1/2→repaso finde · 0/2→repetir</Text>
            <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openEdge(QBQ)} style={st.edgeBtnWide}><Text style={st.edgeTxt}>◆ Abrir en Edge</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QBQ)} style={[st.verBtn, { borderColor: '#7BB1FF88' }]}><Text style={[st.verTxt, { color: '#AFCBFF' }]}>Chrome ↗</Text></TouchableOpacity>
            </View>
          </View>
        </FadeUp>
      )}

      {/* Cola de materiales de hoy */}
      <Text style={st.secLbl}>📋 Cola de hoy · 16:30–17:15 (en orden) · Qbankly = botón Edge</Text>
      <FadeUp delay={60}><ColaItem icon="🅠" lbl="PRE-TEST · uWorld (modo tutor)" val={`${dia.system} → ${dia.uw} · 3 preguntas ciegas + free recall 60s`} sub="Qbankly → QBanks → uWorld Step 1" color={GREEN} url={QBQ} edge /></FadeUp>
      <FadeUp delay={90}><ColaItem icon="🎬" lbl="VÍDEO · Boards & Beyond Step 1" val={`${dia.bbCh} → ${dia.bbVid}`} sub="Qbankly → Video Library → B&B Step 1" color={RED} url={QBV} edge /></FadeUp>
      <FadeUp delay={120}><ColaItem icon="📖" lbl="ACTIVE READING · material primario" val={dia.mat} sub="Qbankly → Library (uWorld/AMBOSS) · 25 min · 3-5 puntos high-yield" color="#7BB1FF" url={QBL} edge /></FadeUp>
      <FadeUp delay={150}><ColaItem icon="🗂️" lbl="FLASHCARDS · uWorld Step 1" val={`Deck: ${dia.system}`} sub="Qbankly → Flashcards · Anki SRS" color="#AFCBFF" url={QBF} edge /></FadeUp>
      {usmleObsUrl(dia.d) && (
        <FadeUp delay={165}><ColaItem icon="◆" lbl="OBSIDIAN · nota madre del subtema" val={`${dia.system} → ${dia.sub}`} sub="Vault_Medicina MIR_Joseph · aquí caen los APEX de hoy (motor APEX)" color={OBS} url={usmleObsUrl(dia.d)!} /></FadeUp>
      )}
      {dia.palm && (
        <FadeUp delay={180}><ColaItem icon="🧠" lbl="PALMERTON · al empezar el sistema" val={dia.palm.t} sub="YouTube · método + visión del sistema (abre en Chrome)" color={GREEN} url={yt(dia.palm.id)} /></FadeUp>
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

function HorarioView({ dia }: { dia: DiaUSMLE }) {
  const prev = diaPrevio(dia);
  const detalle = (tipo: string): string => {
    if (tipo === 'eval') return prev ? `${prev.system} → ${prev.sub}` : 'no hay día previo';
    if (tipo === 'pretest') return `${dia.system} → ${dia.uw}`;
    if (tipo === 'read') return `${dia.bbCh}: ${dia.bbVid} · ${dia.mat}`;
    return '';
  };
  return (
    <View>
      <Text style={st.secLbl}>🕓 Bloque USMLE · Día {dia.d} ({fmtFecha(dia.fecha)}) · hora Lima</Text>
      {FRANJAS.map((f, i) => {
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
      <Text style={st.note}>16:15–16:30 = repaso del tema de ayer (Anchored Eval). 16:30–17:15 = subtema nuevo (Mini Deep Work). Todo en inglés.</Text>
    </View>
  );
}

function SieteView({ fromD, onPick }: { fromD: number; onPick: (d: number) => void }) {
  const win = ventana7d(fromD);
  return (
    <View>
      <Text style={st.secLbl}>📆 Próximos 7 días · toca un día para abrirlo</Text>
      {win.map((x, i) => {
        const tier = TIER_INFO[x.tier];
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: tier.c }]}>
              <Text style={[st.d7day, { color: tier.c }]}>D{x.d}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.sub}</Text>
                <Text style={st.d7sys}>{x.system}</Text>
              </View>
              <Text style={st.d7go}>→</Text>
            </TouchableOpacity>
          </FadeUp>
        );
      })}
    </View>
  );
}

/** Barra de progreso simple (track + fill por %). */
function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <View style={st.barTrack}>
      <View style={[st.barFill, { width: (`${Math.max(0, Math.min(100, pct))}%` as any), backgroundColor: color }]} />
    </View>
  );
}

function SistemaCard({ g, hoyD, onPick, done, onToggle }: { g: GrupoProgreso<DiaUSMLE>; hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const tier = TIER_INFO[g.dias[0].tier];
  const estadoTxt = g.estado === 'completado' ? '✓ completado' : g.estado === 'en-curso' ? `en curso · ${g.pct}%` : `pendiente · empieza D${g.primerD}`;
  const estadoColor = g.estado === 'completado' ? GREEN : g.estado === 'en-curso' ? tier.c : Colors.muted;
  return (
    <View style={[st.sysCard, { borderColor: tier.c + (g.estado === 'en-curso' ? '88' : '2E') }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
        <View style={st.sysHead}>
          <Text style={st.sysTitle} numberOfLines={1}>{open ? '▾' : '▸'} {g.clave}</Text>
          <Text style={[st.sysCount, { color: estadoColor }]}>{g.hechos}/{g.total}</Text>
        </View>
        <ProgressBar pct={g.pct} color={tier.c} />
        <Text style={[st.sysEstado, { color: estadoColor }]}>
          {estadoTxt}{g.diaActual ? ` · hoy: ${g.diaActual.sub}` : ''}
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => openEdge(QBQ)} style={st.edgeBtnWide}><Text style={st.edgeTxt}>◆ Temario en Qbankly (Edge)</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QBQ)} style={[st.verBtn, { borderColor: tier.c + '88' }]}><Text style={[st.verTxt, { color: tier.c }]}>Chrome ↗</Text></TouchableOpacity>
      </View>
      {open && (
        <View style={{ marginTop: 8 }}>
          {g.dias.map((x) => {
            const hecho = done.has(x.d), now = x.d === hoyD;
            return (
              <View key={x.d} style={[st.temaRow, now && st.temaRowOn]}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle(x.d)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
                  <Text style={[st.temaChk, { color: hecho ? GREEN : 'rgba(255,255,255,0.25)' }]}>{hecho ? '☑' : '☐'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={st.temaRowMain}>
                  <Text style={[st.temaRowD, { color: hecho ? GREEN : now ? tier.c : Colors.muted }]}>{now ? '▶' : ''} D{x.d}</Text>
                  <Text style={st.temaRowTxt} numberOfLines={1}>{x.sub}</Text>
                  <Text style={st.temaRowGo}>→</Text>
                </TouchableOpacity>
                {usmleObsUrl(x.d) && (
                  <TouchableOpacity activeOpacity={0.7} onPress={() => openUrl(usmleObsUrl(x.d)!)} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}>
                    <Text style={{ fontSize: 13, color: OBS, width: 18, textAlign: 'center' }}>◆</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

function TemarioView({ hoyD, onPick, done, onToggle }: { hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const grupos = agruparProgreso(DIAS, (x) => x.system, hoyD, done);
  const glob = progresoGlobal(DIAS, done);
  return (
    <View>
      <View style={st.globCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={st.globTitle}>🗂️ Temario Step 1 · progreso del plan</Text>
          <Text style={[st.globPct, { color: GREEN }]}>{glob.pct}%</Text>
        </View>
        <ProgressBar pct={glob.pct} color={GREEN} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} subtemas · hoy = Día {hoyD} de {glob.total} · {grupos.length} sistemas</Text>
      </View>
      {grupos.map((g) => <SistemaCard key={g.clave} g={g} hoyD={hoyD} onPick={onPick} done={done} onToggle={onToggle} />)}
      <Text style={st.note}>Progreso REAL: empezamos en 0%. ☑ marca un subtema como completado (se guarda en este dispositivo). ▶ = día de hoy. Toca el título de un subtema para ir a ese día.</Text>
    </View>
  );
}

export default function UsmleTodayPlan() {
  const iso = todayISO();
  const hoyD = planHoyD(DIAS, iso);
  const todayDia = diaDe(iso) || DIAS.find((x) => x.d === hoyD) || DIAS[0];
  const [sel, setSel] = useState<number>(todayDia.d);
  const [view, setView] = useState<'hoy' | 'horario' | '7d' | 'temario'>('hoy');
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone('usmle')));
  const dia = DIAS.find((x) => x.d === sel) || DIAS[0];
  const esHoy = dia.fecha === iso;
  const pickDay = (d: number) => { setSel(d); setView('hoy'); };
  const toggleDone = (d: number) => setDone((prev) => {
    const n = new Set(prev);
    if (n.has(d)) n.delete(d); else n.add(d);
    saveDone('usmle', Array.from(n));
    return n;
  });

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
        {([['hoy', '📋 HOY'], ['horario', '🕓 Horario'], ['7d', '📆 7 días'], ['temario', '🗂️ Temario']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
            <Text style={[st.subTabTxt, view === k && { color: GREEN }]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <GlassPanel style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
        {view === 'hoy' ? <HoyView dia={dia} onOpenTemario={() => setView('temario')} hecho={done.has(dia.d)} onToggle={toggleDone} />
          : view === 'horario' ? <HorarioView dia={dia} />
          : view === '7d' ? <SieteView fromD={dia.d} onPick={pickDay} />
          : <TemarioView hoyD={hoyD} onPick={pickDay} done={done} onToggle={toggleDone} />}
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
  doneBtn: { marginTop: 10, paddingVertical: 9, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center' },
  doneBtnOff: { backgroundColor: GREEN + '14', borderColor: GREEN + '66' },
  doneBtnOn: { backgroundColor: GREEN, borderColor: GREEN },
  doneBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800' },

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
  verBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center' },
  verTxt: { fontSize: FontSize.labelSm, fontWeight: '800' },
  edgeBtn: { backgroundColor: EDGE + '22', borderWidth: 1, borderColor: EDGE + '99', borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center' },
  edgeBtnWide: { flex: 1, backgroundColor: EDGE + '22', borderWidth: 1, borderColor: EDGE + '99', borderRadius: BorderRadius.md, paddingVertical: 7, paddingHorizontal: 10, alignItems: 'center' },
  edgeTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: EDGE },

  franja: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 7, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  franjaHora: { backgroundColor: GREEN + '14', borderRadius: BorderRadius.sm, paddingVertical: 3, paddingHorizontal: 7, minWidth: 96, alignItems: 'center' },
  franjaHoraTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: GREEN },
  franjaFase: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
  franjaDet: { fontSize: FontSize.labelSm, color: GREEN, marginTop: 2, fontWeight: '600' },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: 15 },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.sm, marginBottom: 5 },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 36 },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 1 },
  d7go: { fontSize: 16, color: GREEN, fontWeight: '800', width: 18, textAlign: 'center' },

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
  sysCount: { fontSize: FontSize.labelMd, fontWeight: '800', marginLeft: 8 },
  sysEstado: { fontSize: FontSize.labelSm, fontWeight: '700', marginTop: 5 },
  temaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, paddingHorizontal: 6, borderRadius: BorderRadius.sm, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  temaRowOn: { backgroundColor: GREEN + '12' },
  temaRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  temaChk: { fontSize: 16, width: 22, textAlign: 'center' },
  temaRowD: { fontSize: FontSize.labelSm, fontWeight: '800', width: 40 },
  temaRowTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  temaRowGo: { fontSize: 14, color: Colors.muted, width: 16, textAlign: 'center' },
});
