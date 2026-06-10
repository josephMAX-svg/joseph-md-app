import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  DAILY_META, FRANJAS, DIAS, REC, FASE_INFO, DiaResearch, FaseId,
  diaDe, diaPrevio, ventana7d, proximoD,
} from '../../lib/researchDailyPlan';
import { agruparProgreso, progresoGlobal, GrupoProgreso, loadDone, saveDone } from '../../lib/studyProgress';
import { diaEstudioTipo, PRIORIDAD_COLOR } from '../../lib/researchData';
import { researchObsUrlDay } from '../../lib/obsidianResearchMap';

/**
 * ResearchTodayPlan — Plan de research día-a-día (revisiones sistemáticas), mismo motor
 * que UsmleTodayPlan: nav de día ◄►, sub-pestañas HOY/Horario/7d/Temario, progreso REAL
 * marcable (empieza 0%, localStorage clave 'research'), interdiario con Derma. Cada recurso
 * de la cola abre un sitio REAL verificado. El badge de fase lleva al Temario.
 */
const TEAL = '#0FD4A0';
const PURPLE = '#8B5CF6';
const OBS = '#A78BFA';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return DAILY_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}
function faseColor(f: FaseId): string { return FASE_INFO[f].color; }

/** Ítem de la cola de hoy: recurso real con botón "ver ↗". */
function ColaItem({ icon, lbl, val, sub, color, url }: { icon: string; lbl: string; val: string; sub: string; color: string; url: string }) {
  return (
    <View style={[st.cola, { borderLeftColor: color }]}>
      <Text style={st.colaIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={st.colaLbl}>{lbl}</Text>
        <Text style={st.colaVal} numberOfLines={2}>{val}</Text>
        <Text style={st.colaSub}>{sub}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(url)} style={[st.verBtn, { borderColor: color + '88' }]}>
        <Text style={[st.verTxt, { color }]}>ver ↗</Text>
      </TouchableOpacity>
    </View>
  );
}

function HoyView({ dia, onOpenTemario, hecho, onToggle }: { dia: DiaResearch; onOpenTemario: () => void; hecho: boolean; onToggle: (d: number) => void }) {
  const prev = diaPrevio(dia);
  const fc = faseColor(dia.fase);
  const fi = FASE_INFO[dia.fase];
  return (
    <View>
      {/* Tema del día — el badge de fase lleva al Temario */}
      <FadeUp>
        <View style={[st.temaCard, { borderColor: fc + '55' }]}>
          <View style={st.temaTop}>
            <TouchableOpacity activeOpacity={0.8} onPress={onOpenTemario} style={[st.sysBadge, { backgroundColor: fc + '1F', borderColor: fc + '66' }]}>
              <Text style={[st.sysBadgeTxt, { color: fc }]}>{dia.fase} · {fi.nombre} ›</Text>
            </TouchableOpacity>
            <Chip label={dia.code} color={fc} small />
            <Chip label={dia.prioridad} color={PRIORIDAD_COLOR[dia.prioridad]} small />
            {fi.pilar !== 'base' && <Chip label={fi.pilar} color={Colors.muted} small />}
          </View>
          <Text style={st.temaTitle}>{dia.objetivo}</Text>
          <View style={[st.entregBox, { borderColor: fc + '40' }]}>
            <Text style={st.entregLbl}>📦 ENTREGABLE (artefacto del día)</Text>
            <Text style={st.entregTxt}>{dia.entregable}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.85} onPress={() => onToggle(dia.d)} style={[st.doneBtn, hecho ? st.doneBtnOn : st.doneBtnOff]}>
            <Text style={[st.doneBtnTxt, { color: hecho ? '#062018' : TEAL }]}>{hecho ? '✓ Entregable hecho' : '○ Marcar entregable como hecho'}</Text>
          </TouchableOpacity>
        </View>
      </FadeUp>

      {/* Eval anclada (átomo previo) */}
      {prev && (
        <FadeUp delay={40}>
          <View style={st.anchor}>
            <Text style={st.anchorLbl}>🎯 13:30 · Eval anclada (átomo de AYER)</Text>
            <Text style={st.anchorVal}>{prev.code} · {prev.objetivo}</Text>
            <Text style={st.anchorSub}>2Q de auto-test del método + ¿avanzó el entregable de ayer? · APEX-método AGAIN/GOOD</Text>
          </View>
        </FadeUp>
      )}

      {/* Cola de recursos reales de hoy */}
      <Text style={st.secLbl}>📋 Deep work · 13:40–14:05 · recursos reales (en orden)</Text>
      {dia.recs.map((k, i) => {
        const r = REC[k];
        if (!r) return null;
        const icon = i === 0 ? '🎬' : i === 1 ? '📖' : '🔗';
        const color = i === 0 ? TEAL : i === 1 ? '#7BB1FF' : '#AFCBFF';
        return <FadeUp key={k} delay={60 + i * 30}><ColaItem icon={icon} lbl={`RECURSO ${i + 1} · ${dia.tool}`} val={r.label} sub={k} color={color} url={r.url} /></FadeUp>;
      })}

      {/* Obsidian — carpeta de la SR/fase de este átomo */}
      {researchObsUrlDay(dia.d) && (
        <FadeUp delay={195}>
          <ColaItem icon="◆" lbl="OBSIDIAN · carpeta de la SR" val={`SR-1 · ${fi.nombre}`}
            sub="Vault_Medicina MIR_Joseph · aquí caen las notas/APEX de esta fase" color={OBS} url={researchObsUrlDay(dia.d)!} />
        </FadeUp>
      )}

      {/* APEX */}
      <FadeUp delay={210}>
        <View style={[st.cola, { borderLeftColor: '#F5A623' }]}>
          <Text style={st.colaIcon}>🃏</Text>
          <View style={{ flex: 1 }}>
            <Text style={st.colaLbl}>APEX-método · 14:10–14:15</Text>
            <Text style={st.colaVal}>{dia.apex ? `Crea ≤3 APEX — hito: ${dia.apex.t}` : 'Crea ≤3 APEX-método (Palmerton)'}</Text>
            <Text style={st.colaSub}>Free recall a papel antes · guarda el artefacto (PROSPERO/Rayyan/Zotero/.docx)</Text>
          </View>
        </View>
      </FadeUp>
    </View>
  );
}

function HorarioView({ dia }: { dia: DiaResearch }) {
  const prev = diaPrevio(dia);
  const detalle = (tipo: string): string => {
    if (tipo === 'eval') return prev ? `${prev.code} → ${prev.entregable}` : 'no hay átomo previo';
    if (tipo === 'pretest') return dia.objetivo;
    if (tipo === 'work') return `${REC[dia.recs[0]]?.label ?? ''} · ${dia.entregable}`;
    if (tipo === 'apex') return dia.apex ? dia.apex.t : '';
    return '';
  };
  return (
    <View>
      <Text style={st.secLbl}>🕓 Bloque Research · Día {dia.d} ({fmtFecha(dia.fecha)}) · hora Lima</Text>
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
      <Text style={st.note}>Interdiario con Derma: el bloque 13:30–14:15 del Calendar alterna Research↔Derma. Avanzas 1 átomo por día-Research. No se modifica el Calendar.</Text>
    </View>
  );
}

function SieteView({ fromD, onPick }: { fromD: number; onPick: (d: number) => void }) {
  const win = ventana7d(fromD);
  return (
    <View>
      <Text style={st.secLbl}>📆 Próximos 7 átomos · toca uno para abrirlo</Text>
      {win.map((x, i) => {
        const fc = faseColor(x.fase);
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: fc }]}>
              <Text style={[st.d7day, { color: fc }]}>{x.code}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.objetivo}</Text>
                <Text style={st.d7sys}>{x.fase} · {FASE_INFO[x.fase].nombre}</Text>
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

function FaseCard({ g, hoyD, onPick, done, onToggle }: { g: GrupoProgreso<DiaResearch>; hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const fase = g.dias[0].fase;
  const fc = faseColor(fase);
  const estadoTxt = g.estado === 'completado' ? '✓ completado' : g.estado === 'en-curso' ? `en curso · ${g.pct}%` : `pendiente · empieza ${g.dias[0].code}`;
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
                  <Text style={[st.temaRowD, { color: hecho ? TEAL : now ? fc : Colors.muted }]}>{now ? '▶' : ''} {x.code}</Text>
                  <Text style={st.temaRowTxt} numberOfLines={1}>{x.objetivo}</Text>
                  <Text style={st.temaRowGo}>→</Text>
                </TouchableOpacity>
                {researchObsUrlDay(x.d) && (
                  <TouchableOpacity activeOpacity={0.7} onPress={() => openUrl(researchObsUrlDay(x.d)!)} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}>
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
  const grupos = agruparProgreso(DIAS, (x) => `${x.fase} · ${FASE_INFO[x.fase].nombre}`, hoyD, done);
  const glob = progresoGlobal(DIAS, done);
  return (
    <View>
      <View style={st.globCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={st.globTitle}>🗂️ Temario SR · progreso del plan</Text>
          <Text style={[st.globPct, { color: TEAL }]}>{glob.pct}%</Text>
        </View>
        <ProgressBar pct={glob.pct} color={TEAL} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} átomos · hoy = Día {hoyD} de {glob.total} · {grupos.length} fases · ejecuta SR-1</Text>
      </View>
      {grupos.map((g) => <FaseCard key={g.clave} g={g} hoyD={hoyD} onPick={onPick} done={done} onToggle={onToggle} />)}
      <Text style={st.note}>Progreso REAL: empezamos en 0%. ☑ marca un átomo como hecho (se guarda en este dispositivo). ▶ = átomo de hoy. Toca el objetivo para ir a ese día.</Text>
    </View>
  );
}

export default function ResearchTodayPlan() {
  const iso = todayISO();
  const tipoHoy = diaEstudioTipo(new Date());
  const hoyD = proximoD(iso);
  const todayDia = diaDe(iso) || DIAS.find((x) => x.d === hoyD) || DIAS[0];
  const [sel, setSel] = useState<number>(todayDia.d);
  const [view, setView] = useState<'hoy' | 'horario' | '7d' | 'temario'>('hoy');
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone('research')));
  const dia = DIAS.find((x) => x.d === sel) || DIAS[0];
  const esHoy = dia.fecha === iso;
  const pickDay = (d: number) => { setSel(d); setView('hoy'); };
  const toggleDone = (d: number) => setDone((prev) => {
    const n = new Set(prev);
    if (n.has(d)) n.delete(d); else n.add(d);
    saveDone('research', Array.from(n));
    return n;
  });

  return (
    <View>
      {/* Banner interdiario Research/Derma + artefacto vivo */}
      <View style={st.interRow}>
        <View style={[st.interBtn, tipoHoy === 'research' ? st.interOn : st.interOff]}>
          <Text style={[st.interBig, { color: tipoHoy === 'research' ? TEAL : Colors.muted }]}>🔬 RESEARCH</Text>
          <Text style={st.interSub}>{tipoHoy === 'research' ? 'HOY te toca' : 'no es hoy'}</Text>
        </View>
        <View style={[st.interBtn, tipoHoy === 'derma' ? { backgroundColor: PURPLE + '1A', borderColor: PURPLE + '88' } : st.interOff]}>
          <Text style={[st.interBig, { color: tipoHoy === 'derma' ? PURPLE : Colors.muted }]}>💎 DERMA</Text>
          <Text style={st.interSub}>{tipoHoy === 'derma' ? 'HOY te toca →' : 'día alterno'}</Text>
        </View>
        <View style={[st.interBtn, tipoHoy === 'descanso' ? st.interOn : st.interOff, { flex: 0.7 }]}>
          <Text style={[st.interBig, { color: tipoHoy === 'descanso' ? Colors.amber : Colors.muted }]}>😴</Text>
          <Text style={st.interSub}>finde</Text>
        </View>
      </View>
      <View style={st.artefactoBar}>
        <Text style={st.artefactoTxt}>🎯 Artefacto vivo: {DAILY_META.artefacto}</Text>
      </View>

      {/* Navegación de día */}
      <View style={st.navRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.max(1, s - 1))} style={st.navArrow}><Text style={st.navArrowTxt}>◄</Text></TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={st.navDay}>{dia.code} · Día {dia.d}/{DAILY_META.totalDias}{esHoy ? ' · HOY' : ''}</Text>
          <Text style={st.navFecha}>{fmtFecha(dia.fecha)} · {dia.fecha}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.min(DAILY_META.totalDias, s + 1))} style={st.navArrow}><Text style={st.navArrowTxt}>►</Text></TouchableOpacity>
      </View>
      {!esHoy && <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(todayDia.d)} style={st.hoyBtn}><Text style={st.hoyBtnTxt}>↩ volver a HOY</Text></TouchableOpacity>}

      {/* Sub-pestañas */}
      <View style={st.subTabs}>
        {([['hoy', '📋 HOY'], ['horario', '🕓 Horario'], ['7d', '📆 7 días'], ['temario', '🗂️ Temario']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
            <Text style={[st.subTabTxt, view === k && { color: TEAL }]}>{lbl}</Text>
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
  interOn: { backgroundColor: TEAL + '1A', borderColor: TEAL + '88' },
  interOff: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' },
  interBig: { fontSize: FontSize.bodyLg, fontWeight: '900', letterSpacing: 0.3 },
  interSub: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  artefactoBar: { ...cardBase, borderLeftWidth: 3, borderLeftColor: TEAL, padding: Spacing.sm, marginBottom: Spacing.sm },
  artefactoTxt: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, lineHeight: 15 },

  navRow: { flexDirection: 'row', alignItems: 'center', ...cardBase, padding: Spacing.sm, marginBottom: Spacing.xs },
  navArrow: { width: 40, height: 40, borderRadius: BorderRadius.md, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  navArrowTxt: { fontSize: 16, color: TEAL, fontWeight: '800' },
  navDay: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface },
  navFecha: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1 },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: TEAL, fontWeight: '700' },

  subTabs: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm },
  subTab: { flex: 1, paddingVertical: 7, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', alignItems: 'center' },
  subTabOn: { backgroundColor: TEAL + '14', borderColor: TEAL + '55' },
  subTabTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted },

  temaCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm },
  temaTop: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  sysBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 2, paddingHorizontal: 10 },
  sysBadgeTxt: { fontSize: FontSize.labelMd, fontWeight: '800' },
  temaTitle: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: 8, lineHeight: 22 },
  entregBox: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.sm, marginTop: 10, backgroundColor: 'rgba(255,255,255,0.02)' },
  entregLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4 },
  entregTxt: { fontSize: FontSize.labelMd, color: Colors.onSurface, marginTop: 3, lineHeight: 16 },
  doneBtn: { marginTop: 10, paddingVertical: 9, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center' },
  doneBtnOff: { backgroundColor: TEAL + '14', borderColor: TEAL + '66' },
  doneBtnOn: { backgroundColor: TEAL, borderColor: TEAL },
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

  franja: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 7, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  franjaHora: { backgroundColor: TEAL + '14', borderRadius: BorderRadius.sm, paddingVertical: 3, paddingHorizontal: 7, minWidth: 96, alignItems: 'center' },
  franjaHoraTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: TEAL },
  franjaFase: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
  franjaDet: { fontSize: FontSize.labelSm, color: TEAL, marginTop: 2, fontWeight: '600' },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: 15 },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.sm, marginBottom: 5 },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 40 },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 1 },
  d7go: { fontSize: 16, color: TEAL, fontWeight: '800', width: 18, textAlign: 'center' },

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
  temaRowOn: { backgroundColor: TEAL + '12' },
  temaRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  temaChk: { fontSize: 16, width: 22, textAlign: 'center' },
  temaRowD: { fontSize: FontSize.labelSm, fontWeight: '800', width: 40 },
  temaRowTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  temaRowGo: { fontSize: 14, color: Colors.muted, width: 16, textAlign: 'center' },
});
