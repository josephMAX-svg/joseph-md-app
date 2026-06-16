import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from './primitives';
import { FadeUp } from './visuals';
import {
  AURUM_PLAN_META, AURUM_DIAS, DiaAurum, AurumBloque, aurumDiaDe, aurum7d,
  AURUM_FORMATO_ICON, AURUM_TAG_LABEL, aurumObsUrl,
} from '../../lib/aurumDailyPlan';
import { agruparProgreso, planHoyD, progresoGlobal, GrupoProgreso } from '../../lib/studyProgress';

/**
 * AurumTodayPlan — motor día-a-día AURUM (130 días · 26 semanas, L-V), mismo molde que
 * SYNAPSE: HOY (bloques A/B/PRAC con links reales del currículo de ventas + nota Obsidian),
 * 7 días clicable y Temario por semana con PROGRESO REAL marcable (empieza 0%,
 * localStorage PlanKey 'aurum'). El estado `done` vive en AurumHub para que el
 * RingStat "Completadas" se actualice en vivo. Acento dorado AURUM.
 */
const GOLD = '#C9A227';
const OBS = '#A78BFA'; // mismo morado ◆ que el resto de planes
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
export function aurumTodayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return AURUM_PLAN_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}
/** Racha real: días consecutivos marcados ✓ terminando en hoy (o ayer si hoy aún no se marca). */
function rachaReal(done: Set<number>, hoyD: number): number {
  let d = done.has(hoyD) ? hoyD : hoyD - 1;
  let n = 0;
  while (d >= 1 && done.has(d)) { n++; d--; }
  return n;
}

function BloqueRow({ b, obsNota }: { b: AurumBloque; obsNota?: string }) {
  const accent = b.tag === 'A' ? GOLD : b.tag === 'PRAC' ? Colors.coral : Colors.blue;
  const obs = b.tag === 'PRAC' ? aurumObsUrl(obsNota) : null; // la nota Obsidian del día vive con el drill (núcleo)
  const inner = (
    <>
      <Text style={st.blkIcon}>{AURUM_FORMATO_ICON[b.formato]}</Text>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <Text style={[st.blkTag, { color: accent }]}>{AURUM_TAG_LABEL[b.tag]}</Text>
          {b.real ? <Chip label="link verificado" color={Colors.green} small /> : <Chip label="verifica el link" color={Colors.amber} small />}
          {obs ? (
            <TouchableOpacity activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }} onPress={() => openUrl(obs)}>
              <Chip label="◆" color={OBS} small />
            </TouchableOpacity>
          ) : null}
        </View>
        <Text style={st.blkMat}>{b.material}</Text>
        <Text style={st.blkLec}>{b.leccion}</Text>
        {b.dur ? <Text style={st.blkDur}>{b.dur}</Text> : null}
      </View>
      {b.url ? <View style={[st.verBtn, { borderColor: accent + '88' }]}><Text style={[st.verTxt, { color: accent }]}>abrir ↗</Text></View> : null}
    </>
  );
  if (!b.url) return <View style={[st.blk, { borderLeftColor: accent }]}>{inner}</View>;
  return <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(b.url!)} style={[st.blk, { borderLeftColor: accent }]}>{inner}</TouchableOpacity>;
}

function HoyView({ dia, hoyD, done, onToggle }: { dia: DiaAurum; hoyD: number; done: Set<number>; onToggle: (d: number) => void }) {
  const hecho = done.has(dia.d);
  const faseDias = AURUM_DIAS.filter((x) => x.faseId === dia.faseId);
  const faseHechos = faseDias.filter((x) => done.has(x.d)).length;
  const fasePct = Math.round((faseHechos / faseDias.length) * 100);
  const semDias = AURUM_DIAS.filter((x) => x.semana === dia.semana);
  const semHechos = semDias.filter((x) => done.has(x.d)).length;
  const racha = rachaReal(done, hoyD);
  const obsUrl = aurumObsUrl(dia.obs);
  const coreBloques = dia.bloques.filter((b) => b.slot === 'core');   // A + PRAC → ventana 14:15-15:15
  const lecturaBloques = dia.bloques.filter((b) => b.slot === 'lectura'); // L → huecos de viaje
  return (
    <View>
      {/* mini-stats: racha · semana · % fase (todo REAL, desde los ✓) */}
      <View style={st.statsRow}>
        <View style={st.statCard}><Text style={[st.statVal, { color: racha > 0 ? GOLD : Colors.muted }]}>{racha > 0 ? `🔥 ${racha}` : '—'}</Text><Text style={st.statLbl}>racha (días ✓ seguidos)</Text></View>
        <View style={st.statCard}><Text style={[st.statVal, { color: Colors.onSurface }]}>{semHechos}/{semDias.length}</Text><Text style={st.statLbl}>semana {dia.semana}/{AURUM_PLAN_META.semanas}</Text></View>
        <View style={st.statCard}><Text style={[st.statVal, { color: fasePct > 0 ? Colors.green : Colors.muted }]}>{fasePct}%</Text><Text style={st.statLbl}>{dia.faseId.toUpperCase()} real</Text></View>
      </View>

      <FadeUp>
        <View style={[st.misionCard, { borderColor: GOLD + '55' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Chip label={dia.fase} color={GOLD} small />
            <Chip label={`Semana ${dia.semana}`} color={Colors.muted} small />
            {obsUrl ? (
              <TouchableOpacity activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }} onPress={() => openUrl(obsUrl)}>
                <Chip label="◆ Obsidian" color={OBS} small />
              </TouchableOpacity>
            ) : null}
          </View>
          {/* núcleo prominente: minutos + ventana fija de Calendar */}
          <View style={[st.ventanaBadge, { borderColor: GOLD + '66', backgroundColor: GOLD + '14' }]}>
            <Text style={[st.ventanaTxt, { color: GOLD }]}>⏱️ {dia.min} min · {AURUM_PLAN_META.ventana}</Text>
          </View>
          <Text style={st.misionTitle}>Misión del día {dia.d}</Text>
          <Text style={st.misionSub}>{dia.titulo}</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onToggle(dia.d)}
            style={[st.doneBtn, hecho ? { backgroundColor: GOLD, borderColor: GOLD } : { backgroundColor: GOLD + '14', borderColor: GOLD + '66' }]}
          >
            <Text style={[st.doneBtnTxt, { color: hecho ? '#1A1505' : GOLD }]}>{hecho ? '✓ Misión completada' : '○ Marcar misión como completada'}</Text>
          </TouchableOpacity>
        </View>
      </FadeUp>

      <Text style={st.secLbl}>Núcleo de hoy · {dia.min} min en {AURUM_PLAN_META.ventana} (ver + practicar tu pitch)</Text>
      {coreBloques.map((b, i) => <FadeUp key={`c${i}`} delay={40 + i * 30}><BloqueRow b={b} obsNota={dia.obs} /></FadeUp>)}

      {lecturaBloques.length ? (
        <View style={st.lecturaBox}>
          <Text style={[st.secLbl, { marginTop: 0 }]}>📚 Para tus huecos (viaje / lectura) · fuera de la hora del núcleo</Text>
          {lecturaBloques.map((b, i) => <FadeUp key={`l${i}`} delay={40 + i * 30}><BloqueRow b={b} obsNota={dia.obs} /></FadeUp>)}
        </View>
      ) : null}
    </View>
  );
}

function SieteView({ fromD, done, onPick }: { fromD: number; done: Set<number>; onPick: (d: number) => void }) {
  const win = aurum7d(fromD);
  return (
    <View>
      <Text style={st.secLbl}>📆 Próximos 7 días · toca un día para abrirlo</Text>
      {win.map((x, i) => {
        const a = x.bloques[0];
        const hecho = done.has(x.d);
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: hecho ? Colors.green : GOLD }]}>
              <Text style={[st.d7day, { color: hecho ? Colors.green : GOLD }]}>{hecho ? '✓' : ''} D{x.d}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.titulo}</Text>
                <Text style={st.d7sys} numberOfLines={1}>{a.material} — {a.leccion}</Text>
              </View>
              <Text style={[st.d7go, { color: GOLD }]}>→</Text>
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

function SemanaCard({ g, hoyD, onPick, done, onToggle }: { g: GrupoProgreso<DiaAurum>; hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const estadoTxt = g.estado === 'completado' ? '✓ completada' : g.estado === 'en-curso' ? `en curso · ${g.pct}%` : 'pendiente';
  const estadoColor = g.estado === 'completado' ? Colors.green : g.estado === 'en-curso' ? GOLD : Colors.muted;
  return (
    <View style={[st.semCard, { borderColor: GOLD + (g.estado === 'en-curso' ? '88' : '2E') }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
        <View style={st.semHead}>
          <Text style={st.semTitle} numberOfLines={1}>{open ? '▾' : '▸'} {g.clave}</Text>
          <Text style={[st.semCount, { color: estadoColor }]}>{g.hechos}/{g.total}</Text>
        </View>
        <ProgressBar pct={g.pct} color={GOLD} />
        <Text style={[st.semEstado, { color: estadoColor }]}>{estadoTxt}</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: 8 }}>
          {g.dias.map((x) => {
            const hecho = done.has(x.d), now = x.d === hoyD;
            return (
              <View key={x.d} style={[st.diaRow, now && { backgroundColor: GOLD + '12' }]}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle(x.d)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
                  <Text style={[st.diaChk, { color: hecho ? Colors.green : 'rgba(255,255,255,0.25)' }]}>{hecho ? '☑' : '☐'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={st.diaRowMain}>
                  <Text style={[st.diaRowD, { color: hecho ? Colors.green : now ? GOLD : Colors.muted }]}>{now ? '▶' : ''} D{x.d}</Text>
                  <Text style={st.diaRowTxt} numberOfLines={1}>{x.titulo}</Text>
                  <Text style={st.diaRowGo}>→</Text>
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
  const grupos = agruparProgreso(AURUM_DIAS, (x) => `Semana ${x.semana} · ${x.faseId.toUpperCase()}`, hoyD, done);
  const glob = progresoGlobal(AURUM_DIAS, done);
  return (
    <View>
      <View style={st.globCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={st.globTitle}>🗺️ {AURUM_PLAN_META.semanas} semanas · progreso real</Text>
          <Text style={[st.globPct, { color: GOLD }]}>{glob.pct}%</Text>
        </View>
        <ProgressBar pct={glob.pct} color={GOLD} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} misiones · 7 fases · L-V · empieza en 0% (avance manual real)</Text>
      </View>
      {grupos.map((g) => <SemanaCard key={g.clave} g={g} hoyD={hoyD} onPick={onPick} done={done} onToggle={onToggle} />)}
      <Text style={st.note}>☑ marca una misión como completada (se guarda en este dispositivo). ▶ = día de hoy. Regenerar el plan: node DATA/_scripts/gen_aurum_plan.js.</Text>
    </View>
  );
}

export default function AurumTodayPlan({ done, onToggle }: { done: Set<number>; onToggle: (d: number) => void }) {
  const iso = aurumTodayISO();
  const hoyD = planHoyD(AURUM_DIAS, iso);
  const todayDia = aurumDiaDe(iso) || AURUM_DIAS.find((x) => x.d === hoyD) || AURUM_DIAS[0];
  const [sel, setSel] = useState<number>(todayDia.d);
  const [view, setView] = useState<'hoy' | '7d' | 'temario'>('hoy');
  const dia = AURUM_DIAS.find((x) => x.d === sel) || AURUM_DIAS[0];
  const esHoy = dia.fecha === iso;
  const pickDay = (d: number) => { setSel(d); setView('hoy'); };

  return (
    <View>
      <View style={st.navRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.max(1, s - 1))} style={st.navArrow}><Text style={st.navArrowTxt}>◄</Text></TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={st.navDay}>Día {dia.d}/{AURUM_PLAN_META.totalDias}{esHoy ? ' · HOY' : ''}</Text>
          <Text style={st.navFecha}>{fmtFecha(dia.fecha)} · {dia.fecha}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.min(AURUM_PLAN_META.totalDias, s + 1))} style={st.navArrow}><Text style={st.navArrowTxt}>►</Text></TouchableOpacity>
      </View>
      {!esHoy && <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(todayDia.d)} style={st.hoyBtn}><Text style={st.hoyBtnTxt}>↩ volver a HOY</Text></TouchableOpacity>}

      <View style={st.subTabs}>
        {([['hoy', '⚡ HOY'], ['7d', '📆 7 días'], ['temario', '🗺️ 26 semanas']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
            <Text style={[st.subTabTxt, view === k && { color: GOLD }]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <GlassPanel style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
        {view === 'hoy' ? <HoyView dia={dia} hoyD={hoyD} done={done} onToggle={onToggle} />
          : view === '7d' ? <SieteView fromD={dia.d} done={done} onPick={pickDay} />
          : <TemarioView hoyD={hoyD} onPick={pickDay} done={done} onToggle={onToggle} />}
      </GlassPanel>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder };
const st = StyleSheet.create({
  navRow: { flexDirection: 'row', alignItems: 'center', ...cardBase, padding: Spacing.sm, marginBottom: Spacing.xs },
  navArrow: { width: 40, height: 40, borderRadius: BorderRadius.md, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  navArrowTxt: { fontSize: 16, color: GOLD, fontWeight: '800' },
  navDay: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface },
  navFecha: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1 },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: GOLD, fontWeight: '700' },

  subTabs: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm, flexWrap: 'wrap' },
  subTab: { flexGrow: 1, paddingVertical: 7, paddingHorizontal: 8, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', alignItems: 'center' },
  subTabOn: { backgroundColor: GOLD + '14', borderColor: GOLD + '55' },
  subTabTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted },

  statsRow: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm },
  statCard: { flex: 1, ...cardBase, paddingVertical: 8, paddingHorizontal: 6, alignItems: 'center' },
  statVal: { fontSize: FontSize.bodyLg, fontWeight: '900' },
  statLbl: { fontSize: 9, color: Colors.muted, marginTop: 2, textAlign: 'center' },

  misionCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm },
  ventanaBadge: { alignSelf: 'flex-start', marginTop: 10, borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 10 },
  ventanaTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.3 },
  lecturaBox: { ...cardBase, borderStyle: 'dashed', borderColor: 'rgba(74,144,226,0.4)', padding: Spacing.md, marginTop: Spacing.sm },
  misionTitle: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: 8 },
  misionSub: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 3, lineHeight: 17 },
  doneBtn: { marginTop: 10, paddingVertical: 9, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center' },
  doneBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800' },

  secLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4, marginBottom: 8, marginTop: Spacing.sm },
  blk: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 6 },
  blkIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  blkTag: { fontSize: 9, fontWeight: '800', letterSpacing: 0.3 },
  blkMat: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '700', marginTop: 3 },
  blkLec: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 16 },
  blkDur: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  verBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center' },
  verTxt: { fontSize: FontSize.labelSm, fontWeight: '800' },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.sm, marginBottom: 5 },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 44 },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 1 },
  d7go: { fontSize: 16, fontWeight: '800', width: 18, textAlign: 'center' },

  globCard: { ...cardBase, padding: Spacing.md, marginBottom: Spacing.sm },
  globTitle: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface },
  globPct: { fontSize: FontSize.bodyLg, fontWeight: '900' },
  globSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 5 },
  barTrack: { height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  barFill: { height: 7, borderRadius: 4 },
  semCard: { ...cardBase, padding: Spacing.md, marginBottom: 6 },
  semHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  semTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flex: 1 },
  semCount: { fontSize: FontSize.labelMd, fontWeight: '800', marginLeft: 8 },
  semEstado: { fontSize: FontSize.labelSm, fontWeight: '700', marginTop: 5 },
  diaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, paddingHorizontal: 6, borderRadius: BorderRadius.sm, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  diaRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  diaChk: { fontSize: 16, width: 22, textAlign: 'center' },
  diaRowD: { fontSize: FontSize.labelSm, fontWeight: '800', width: 44 },
  diaRowTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  diaRowGo: { fontSize: 14, color: Colors.muted, width: 16, textAlign: 'center' },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: 15 },
});
