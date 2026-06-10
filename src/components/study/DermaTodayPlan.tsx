import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  DERMA_DAILY_META, DERMA_FRANJAS, DERMA_DIAS, DERMA_TIER_INFO,
  DiaDerma, DermaBloqueKey, DermaTier, dermaDiaPrevio, dermaVentana7, diaEstudioTipo,
} from '../../lib/dermaDailyPlan';
import { VUELTAS, INTERVALOS, type Prioridad } from '../../lib/researchData';
import { agruparProgreso, progresoGlobal, planHoyD, GrupoProgreso, loadDone, saveDone } from '../../lib/studyProgress';

/**
 * DermaTodayPlan — Plan Derma día-a-día (68 átomos: 52 board + 16 estética), mismo motor
 * que Usmle/Mir/ResearchTodayPlan: nav ◄► Día X/68, sub-pestañas HOY/Horario/7d/Temario,
 * progreso REAL marcable (empieza 0%, localStorage clave 'derma'), interdiario con Research.
 * Cada átomo trae sus 3 fuentes REALES: lectura AccessDermatology (deep-link sectionid),
 * práctica Qbankly (⚠ SOLO Edge → botón ◆ Edge + Chrome) y 2º pase ProMIR, + extra
 * (casos/vídeo/paper del referente). Bloque Calendar 13:30–14:15 (alterna con Research).
 */
const PURPLE = '#8B5CF6';
const TEAL = '#0FD4A0';
const EDGE = '#3DA5E0';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function openEdge(u: string) { Linking.openURL('microsoft-edge:' + u).catch(() => openUrl(u)); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return DERMA_DAILY_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}

/** Color por bloque (A–H board · Z cierre · X estética). */
const BLOQUE_COLOR: Record<DermaBloqueKey, string> = {
  A: '#E5484D', B: '#F472B6', C: '#F59E0B', D: '#EF4444', E: '#60A5FA',
  F: '#22D3EE', G: '#34D399', H: '#A78BFA', Z: '#FBBF24', X: PURPLE,
};
/** Tier del plan → prioridad del motor de vueltas compartido (ENCAPS/Research). */
const TIER_PRIO: Record<DermaTier, Prioridad> = { CRIT: 'CRITICA', ALTA: 'ALTA', MED: 'MEDIA' };
const bc = (d: DiaDerma) => BLOQUE_COLOR[d.bKey];

/** Ítem de la cola: link real; `edge` añade el botón Microsoft Edge (Qbankly). */
function ColaItem({ icon, lbl, val, sub, color, url, edge }: { icon: string; lbl: string; val: string; sub: string; color: string; url: string; edge?: boolean }) {
  return (
    <View style={[st.cola, { borderLeftColor: color }]}>
      <Text style={st.colaIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={st.colaLbl}>{lbl}</Text>
        <Text style={st.colaVal} numberOfLines={2}>{val}</Text>
        <Text style={st.colaSub} numberOfLines={2}>{sub}</Text>
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

function HoyView({ dia, onOpenTemario, hecho, onToggle }: { dia: DiaDerma; onOpenTemario: () => void; hecho: boolean; onToggle: (d: number) => void }) {
  const prev = dermaDiaPrevio(dia);
  const fc = bc(dia);
  const prio = TIER_PRIO[dia.tier];
  return (
    <View>
      {/* Átomo del día — el badge de bloque lleva al Temario */}
      <FadeUp>
        <View style={[st.temaCard, { borderColor: fc + '55' }]}>
          <View style={st.temaTop}>
            <TouchableOpacity activeOpacity={0.8} onPress={onOpenTemario} style={[st.sysBadge, { backgroundColor: fc + '1F', borderColor: fc + '66' }]}>
              <Text style={[st.sysBadgeTxt, { color: fc }]}>{dia.bKey} · {dia.bloque} ›</Text>
            </TouchableOpacity>
            <Chip label={DERMA_TIER_INFO[dia.tier].t} color={DERMA_TIER_INFO[dia.tier].c} small />
            <Chip label={`${VUELTAS[prio]} vueltas · D+${INTERVALOS[prio].join('/')}`} color={Colors.muted} small />
            {dia.referente && <Chip label={`según ${dia.referente}`} color={PURPLE} small />}
          </View>
          <Text style={st.temaTitle}>{dia.sub}</Text>
          <Text style={st.temaGate}>🧠 Mastery gate: recita los 7 pasos del Cerebro Clínico (causa → mecanismo → capa → decisión → no-errar → comunicación → hábito) + guion de paciente.</Text>
          <TouchableOpacity activeOpacity={0.85} onPress={() => onToggle(dia.d)} style={[st.doneBtn, hecho ? st.doneBtnOn : st.doneBtnOff]}>
            <Text style={[st.doneBtnTxt, { color: hecho ? '#1A1031' : PURPLE }]}>{hecho ? '✓ Átomo dominado (cuenta en el %)' : '○ Marcar átomo como hecho'}</Text>
          </TouchableOpacity>
        </View>
      </FadeUp>

      {/* Eval anclada (átomo previo) */}
      {prev && (
        <FadeUp delay={40}>
          <View style={st.anchor}>
            <Text style={st.anchorLbl}>🎯 13:30 · Eval anclada (átomo de la sesión ANTERIOR)</Text>
            <Text style={st.anchorVal}>D{prev.d} · {prev.sub}</Text>
            <Text style={st.anchorSub}>2Q ({prev.qbankly ? 'Qbankly ◆Edge' : 'Q-bank Access'}) + log de error (gap básico/razonamiento/vocabulario) · 2/2→nuevo · 1/2→finde · 0/2→repetir</Text>
          </View>
        </FadeUp>
      )}

      {/* Cola de materiales reales de hoy (3 fuentes + extra) */}
      <Text style={st.secLbl}>📋 Materiales del átomo · 13:35–14:15 · links REALES (en orden)</Text>
      <FadeUp delay={60}>
        <ColaItem icon="📖" lbl="LECTURA · AccessDermatology (UF)" val={dia.access.t} sub={dia.sub} color={fc} url={dia.access.url} />
      </FadeUp>
      {dia.qbankly && (
        <FadeUp delay={90}>
          <ColaItem icon="🧪" lbl="PRÁCTICA · Qbankly (pre-test 3Q + eval)" val={dia.qbankly.t} sub="⚠ Qbankly SOLO abre bien en Edge" color={EDGE} url={dia.qbankly.url} edge />
        </FadeUp>
      )}
      {dia.promir && (
        <FadeUp delay={120}>
          <ColaItem icon="🇪🇸" lbl="2º PASE ES · ProMIR (Enfoque + figuras)" val={dia.promir.t} sub="anclaje España · asignatura 5 Dermatología" color="#F5A623" url={dia.promir.url} />
        </FadeUp>
      )}
      {dia.extra && (
        <FadeUp delay={150}>
          <ColaItem icon="➕" lbl="EXTRA · casos / vídeo / paper del referente" val={dia.extra.t} sub={dia.referente ? `fuente nº1 de ${dia.referente}` : 'material complementario'} color="#7BB1FF" url={dia.extra.url} />
        </FadeUp>
      )}

      {/* APEX */}
      <FadeUp delay={180}>
        <View style={[st.cola, { borderLeftColor: '#F5A623' }]}>
          <Text style={st.colaIcon}>🃏</Text>
          <View style={{ flex: 1 }}>
            <Text style={st.colaLbl}>APEX · 14:10–14:15</Text>
            <Text style={st.colaVal}>Crea ≤3 APEX (formato Palmerton) del átomo de hoy</Text>
            <Text style={st.colaSub}>Free recall a papel antes · los 7 pasos del Cerebro Clínico en voz alta = mastery gate</Text>
          </View>
        </View>
      </FadeUp>
    </View>
  );
}

function HorarioView({ dia }: { dia: DiaDerma }) {
  const prev = dermaDiaPrevio(dia);
  const detalle = (tipo: string): string => {
    if (tipo === 'eval') return prev ? `D${prev.d} · ${prev.sub}` : 'no hay átomo previo';
    if (tipo === 'pretest') return dia.sub;
    if (tipo === 'read') return dia.access.t;
    if (tipo === 'promir') return dia.promir ? dia.promir.t : '— (átomo sin capítulo ProMIR)';
    if (tipo === 'recall') return 'los 7 pasos + guion de paciente del átomo';
    if (tipo === 'apex') return '≤3 APEX + marcar progreso';
    return '';
  };
  return (
    <View>
      <Text style={st.secLbl}>🕓 Bloque Derma · Día {dia.d} ({fmtFecha(dia.fecha)}) · hora Lima</Text>
      {DERMA_FRANJAS.map((f, i) => {
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
      <Text style={st.note}>Interdiario con Research: el bloque 13:30–14:15 del Calendar alterna Research↔Derma por día hábil. Avanzas 1 átomo por día-Derma. No se modifica el Calendar.</Text>
    </View>
  );
}

function SieteView({ fromD, onPick }: { fromD: number; onPick: (d: number) => void }) {
  const win = dermaVentana7(fromD);
  return (
    <View>
      <Text style={st.secLbl}>📆 Próximos 7 átomos-Derma · toca uno para abrirlo</Text>
      {win.map((x, i) => {
        const fc = bc(x);
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: fc }]}>
              <Text style={[st.d7day, { color: fc }]}>D{x.d}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.sub}</Text>
                <Text style={st.d7sys}>{x.bKey} · {x.bloque}{x.referente ? ` · ${x.referente}` : ''}</Text>
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

function BloqueCard({ g, hoyD, onPick, done, onToggle }: { g: GrupoProgreso<DiaDerma>; hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const fc = bc(g.dias[0]);
  const estadoTxt = g.estado === 'completado' ? '✓ completado' : g.estado === 'en-curso' ? `en curso · ${g.pct}% · 1ª vuelta` : `pendiente · empieza D${g.primerD}`;
  const estadoColor = g.estado === 'completado' ? TEAL : g.estado === 'en-curso' ? fc : Colors.muted;
  return (
    <View style={[st.sysCard, { borderColor: fc + (g.estado === 'en-curso' ? '88' : '2E') }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
        <View style={st.sysHead}>
          <Text style={st.sysTitle} numberOfLines={1}>{open ? '▾' : '▸'} {g.clave}</Text>
          <Text style={[st.sysCount, { color: estadoColor }]}>{g.hechos}/{g.total}</Text>
        </View>
        <ProgressBar pct={g.pct} color={fc} />
        <Text style={[st.sysEstado, { color: estadoColor }]}>{estadoTxt}</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: 8 }}>
          {g.dias.map((x) => {
            const hecho = done.has(x.d), now = x.d === hoyD;
            return (
              <View key={x.d} style={[st.temaRow, now && st.temaRowOn]}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle(x.d)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
                  <Text style={[st.temaChk, { color: hecho ? TEAL : 'rgba(255,255,255,0.25)' }]}>{hecho ? '☑' : '☐'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={st.temaRowMain}>
                  <Text style={[st.temaRowD, { color: hecho ? TEAL : now ? fc : Colors.muted }]}>{now ? '▶' : ''} D{x.d}</Text>
                  <Text style={st.temaRowTxt} numberOfLines={1}>{x.sub}</Text>
                  <Text style={[st.temaRowVta, { color: DERMA_TIER_INFO[x.tier].c }]}>{VUELTAS[TIER_PRIO[x.tier]]}v</Text>
                  <Text style={st.temaRowGo}>→</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

function TemarioView({ hoyD, onPick, done, onToggle }: { hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const grupos = agruparProgreso(DERMA_DIAS, (x) => `${x.bKey} · ${x.bloque}`, hoyD, done);
  const glob = progresoGlobal(DERMA_DIAS, done);
  return (
    <View>
      <View style={st.globCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={st.globTitle}>🗂️ Temario Derma · progreso REAL del plan</Text>
          <Text style={[st.globPct, { color: PURPLE }]}>{glob.pct}%</Text>
        </View>
        <ProgressBar pct={glob.pct} color={PURPLE} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} átomos · hoy = Día {hoyD} · {grupos.length} bloques (A–H board · Z cierre · X estética) · vueltas: CRÍT {VUELTAS.CRITICA}v D+{INTERVALOS.CRITICA.join('/')} · ALTA {VUELTAS.ALTA}v · MEDIA {VUELTAS.MEDIA}v</Text>
      </View>
      {grupos.map((g) => <BloqueCard key={g.clave} g={g} hoyD={hoyD} onPick={onPick} done={done} onToggle={onToggle} />)}
      <Text style={st.note}>Progreso REAL: empezamos en 0%. ☑ marca un átomo como hecho (1ª vuelta; se guarda en este dispositivo). ▶ = átomo de hoy. Nv = vueltas objetivo según prioridad. Toca el subtema para ir a ese día.</Text>
    </View>
  );
}

export default function DermaTodayPlan() {
  const iso = todayISO();
  const tipoHoy = diaEstudioTipo(new Date());
  const hoyD = planHoyD(DERMA_DIAS, iso);
  const [sel, setSel] = useState<number>(hoyD);
  const [view, setView] = useState<'hoy' | 'horario' | '7d' | 'temario'>('hoy');
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone('derma')));
  const dia = DERMA_DIAS.find((x) => x.d === sel) || DERMA_DIAS[0];
  const esHoy = dia.fecha === iso;
  const pickDay = (d: number) => { setSel(d); setView('hoy'); };
  const toggleDone = (d: number) => setDone((prev) => {
    const n = new Set(prev);
    if (n.has(d)) n.delete(d); else n.add(d);
    saveDone('derma', Array.from(n));
    return n;
  });

  return (
    <View>
      {/* Banner interdiario Derma/Research */}
      <View style={st.interRow}>
        <View style={[st.interBtn, tipoHoy === 'derma' ? st.interOn : st.interOff]}>
          <Text style={[st.interBig, { color: tipoHoy === 'derma' ? PURPLE : Colors.muted }]}>💎 DERMA</Text>
          <Text style={st.interSub}>{tipoHoy === 'derma' ? 'HOY te toca' : 'día alterno'}</Text>
        </View>
        <View style={[st.interBtn, tipoHoy === 'research' ? { backgroundColor: TEAL + '1A', borderColor: TEAL + '88' } : st.interOff]}>
          <Text style={[st.interBig, { color: tipoHoy === 'research' ? TEAL : Colors.muted }]}>🔬 RESEARCH</Text>
          <Text style={st.interSub}>{tipoHoy === 'research' ? 'HOY te toca →' : 'día alterno'}</Text>
        </View>
        <View style={[st.interBtn, tipoHoy === 'descanso' ? st.interOn : st.interOff, { flex: 0.7 }]}>
          <Text style={[st.interBig, { color: tipoHoy === 'descanso' ? Colors.amber : Colors.muted }]}>😴</Text>
          <Text style={st.interSub}>finde</Text>
        </View>
      </View>
      <View style={st.artefactoBar}>
        <Text style={st.artefactoTxt}>🎓 Meta viva: board (Jain × ABD 55/15/15/15 × Peso MIR) + estética estructural (Cotofana → MD Codes → toxina → HDPH 🔴 → energía) · {DERMA_DAILY_META.bloque}</Text>
      </View>

      {/* Navegación de día */}
      <View style={st.navRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.max(1, s - 1))} style={st.navArrow}><Text style={st.navArrowTxt}>◄</Text></TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={st.navDay}>D{dia.d} · Día {dia.d}/{DERMA_DAILY_META.totalDias}{esHoy ? ' · HOY' : ''}</Text>
          <Text style={st.navFecha}>{fmtFecha(dia.fecha)} · {dia.fecha}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.min(DERMA_DAILY_META.totalDias, s + 1))} style={st.navArrow}><Text style={st.navArrowTxt}>►</Text></TouchableOpacity>
      </View>
      {!esHoy && <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(hoyD)} style={st.hoyBtn}><Text style={st.hoyBtnTxt}>↩ volver a HOY</Text></TouchableOpacity>}

      {/* Sub-pestañas */}
      <View style={st.subTabs}>
        {([['hoy', '📋 HOY'], ['horario', '🕓 Horario'], ['7d', '📆 7 días'], ['temario', '🗂️ Temario']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
            <Text style={[st.subTabTxt, view === k && { color: PURPLE }]}>{lbl}</Text>
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
  interRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.sm },
  interBtn: { flex: 1, borderRadius: BorderRadius.lg, borderWidth: 1, paddingVertical: Spacing.md, alignItems: 'center' },
  interOn: { backgroundColor: PURPLE + '1A', borderColor: PURPLE + '88' },
  interOff: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' },
  interBig: { fontSize: FontSize.bodyLg, fontWeight: '900', letterSpacing: 0.3 },
  interSub: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  artefactoBar: { ...cardBase, borderLeftWidth: 3, borderLeftColor: PURPLE, padding: Spacing.sm, marginBottom: Spacing.sm },
  artefactoTxt: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, lineHeight: 15 },

  navRow: { flexDirection: 'row', alignItems: 'center', ...cardBase, padding: Spacing.sm, marginBottom: Spacing.xs },
  navArrow: { width: 40, height: 40, borderRadius: BorderRadius.md, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  navArrowTxt: { fontSize: 16, color: PURPLE, fontWeight: '800' },
  navDay: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface },
  navFecha: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1 },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: PURPLE, fontWeight: '700' },

  subTabs: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm },
  subTab: { flex: 1, paddingVertical: 7, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', alignItems: 'center' },
  subTabOn: { backgroundColor: PURPLE + '14', borderColor: PURPLE + '55' },
  subTabTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted },

  temaCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm },
  temaTop: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  sysBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 2, paddingHorizontal: 10 },
  sysBadgeTxt: { fontSize: FontSize.labelMd, fontWeight: '800' },
  temaTitle: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: 8, lineHeight: 22 },
  temaGate: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 7, lineHeight: 15 },
  doneBtn: { marginTop: 10, paddingVertical: 9, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center' },
  doneBtnOff: { backgroundColor: PURPLE + '14', borderColor: PURPLE + '66' },
  doneBtnOn: { backgroundColor: PURPLE, borderColor: PURPLE },
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
  edgeBtn: { backgroundColor: EDGE + '1F', borderWidth: 1, borderColor: EDGE + '88', borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center' },
  edgeTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: EDGE },

  franja: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 7, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  franjaHora: { backgroundColor: PURPLE + '14', borderRadius: BorderRadius.sm, paddingVertical: 3, paddingHorizontal: 7, minWidth: 96, alignItems: 'center' },
  franjaHoraTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: PURPLE },
  franjaFase: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
  franjaDet: { fontSize: FontSize.labelSm, color: PURPLE, marginTop: 2, fontWeight: '600' },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: 15 },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.sm, marginBottom: 5 },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 40 },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 1 },
  d7go: { fontSize: 16, color: PURPLE, fontWeight: '800', width: 18, textAlign: 'center' },

  globCard: { ...cardBase, padding: Spacing.md, marginBottom: Spacing.sm },
  globTitle: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface },
  globPct: { fontSize: FontSize.bodyLg, fontWeight: '900' },
  globSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 5, lineHeight: 15 },
  barTrack: { height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  barFill: { height: 7, borderRadius: 4 },
  sysCard: { ...cardBase, padding: Spacing.md, marginBottom: 6 },
  sysHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  sysTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flex: 1 },
  sysCount: { fontSize: FontSize.labelMd, fontWeight: '800', marginLeft: 8 },
  sysEstado: { fontSize: FontSize.labelSm, fontWeight: '700', marginTop: 5 },
  temaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, paddingHorizontal: 6, borderRadius: BorderRadius.sm, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  temaRowOn: { backgroundColor: PURPLE + '12' },
  temaRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  temaChk: { fontSize: 16, width: 22, textAlign: 'center' },
  temaRowD: { fontSize: FontSize.labelSm, fontWeight: '800', width: 44 },
  temaRowTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  temaRowVta: { fontSize: 9, fontWeight: '800', width: 22, textAlign: 'right' },
  temaRowGo: { fontSize: 14, color: Colors.muted, width: 16, textAlign: 'center' },
});
