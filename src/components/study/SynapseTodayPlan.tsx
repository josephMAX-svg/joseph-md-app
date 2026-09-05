import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel, monoText } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  SYN_PLAN_META, SYN_DIAS, DiaSynapse, SynBloque, synDiaDe, syn7d,
  SYN_FORMATO_ICON,
} from '../../lib/synapseDailyPlan';
import { agruparProgreso, planHoyD, progresoGlobal, GrupoProgreso, loadDone, saveDone } from '../../lib/studyProgress';
import { synObsUrl } from '../../lib/obsidianVaultMap';
import { PERIWINKLE, statusGlyph, tagBar, PromptGlyph } from './synapseConsole';
import {
  VIBE_META, VIBE_DIAS, vibeDiaDe, vibeProyectoEnFecha, vibeShipped, VIBE_TIPO_LABEL, VIBE_ROTACION_ICON,
} from '../../lib/vibecodingPlan';

const OBS = '#A78BFA'; // mismo morado ◆ que el resto de planes

/**
 * SynapseTodayPlan — motor día-a-día SYNAPSE (82 días · 12 semanas), RE-SKIN como
 * CONSOLA NEURAL: cada día es un "run", cada bloque un "job" (RunBlock estilo Warp
 * con barra-de-status lateral + header mono + exit-status ○/▷/✓). Mismo molde que
 * ENCAPS/Business (HOY / 7 días / 12 semanas) con PROGRESO REAL marcable (empieza 0%,
 * localStorage PlanKey 'synapse'). El estado `done` vive en SynapseHub para que la
 * telemetría "loss↓/completadas" se actualice en vivo. Sólo cambia la PRESENTACIÓN:
 * datos, props, handlers y links reales intactos.
 */
const INDIGO = PERIWINKLE; // periwinkle — color canónico de la consola (antes #818CF8)
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
export function synTodayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return SYN_PLAN_META.inicio; }
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

/** RunBlock — un "job" del run de hoy, estilo Warp: barra-de-status lateral por tag,
 *  header mono [tag·min] · formato · exit-status ○/▷/✓, salida (material/lección) mono-ish. */
function BloqueRow({ b }: { b: SynBloque }) {
  const accent = tagBar(b.tag);
  const { glyph, color: stColor } = statusGlyph(b.tag);
  const obs = synObsUrl(b.material, b.leccion); // nota exacta del material en el vault (nombre + lección para desambiguar)
  const minTxt = b.tag === 'R' ? "30'" : `${b.min}'`;
  const inner = (
    <>
      {/* barra-de-status lateral (data-plane) */}
      <View style={[st.blkBar, { backgroundColor: accent }]} />
      <View style={{ flex: 1 }}>
        {/* header mono estilo consola: exit-status · [tag·min] · formato */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
          <Text style={[st.blkStatus, { color: stColor }]}>{glyph}</Text>
          <Text style={[st.blkTag, { color: accent }]}>[{b.tag}·{minTxt}]</Text>
          <Text style={st.blkFmt}>{SYN_FORMATO_ICON[b.formato]} {b.formato}</Text>
          {b.real ? <Chip label="temario real" color={Colors.green} small /> : <Chip label="continúa" color={Colors.muted} small />}
          {b.audit ? <Chip label="auditar: ✓ si ya hecho" color={Colors.amber} small /> : null}
          {obs ? (
            <TouchableOpacity activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }} onPress={() => openUrl(obs)}>
              <Chip label="◆" color={OBS} small />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 5 }}>
          <PromptGlyph char="›" color={accent} />
          <Text style={st.blkMat}>{b.material}</Text>
        </View>
        <Text style={st.blkLec}>{b.leccion}</Text>
        {b.dur ? <Text style={st.blkDur}>⏱ {b.dur}</Text> : null}
      </View>
      {b.url ? <View style={[st.verBtn, { borderColor: accent + '88' }]}><Text style={[st.verTxt, { color: accent }]}>abrir ↗</Text></View> : null}
    </>
  );
  if (!b.url) return <View style={[st.blk, { borderColor: accent + '2E' }]}>{inner}</View>;
  return <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(b.url!)} style={[st.blk, { borderColor: accent + '2E' }]}>{inner}</TouchableOpacity>;
}

/** VibeCard — proyecto de la semana del VIBECODING 04:15 (src/lib/vibecodingPlan.ts) para la fecha del run
 *  seleccionado: paso del día (L-V) con ✓ propio (PlanKey 'vibecoding'), o SHIP (sáb) / Feynman (dom). */
function VibeCard({ fecha, vibeDone, onToggleVibe }: { fecha: string; vibeDone: Set<number>; onToggleVibe: (d: number) => void }) {
  const p = vibeProyectoEnFecha(fecha);
  const vd = vibeDiaDe(fecha);
  if (!p) return null;
  const hecho = vd ? vibeDone.has(vd.d) : false;
  const semDias = VIBE_DIAS.filter((x) => x.semana === p.s);
  const semHechos = semDias.filter((x) => vibeDone.has(x.d)).length;
  const shipped = vibeShipped(vibeDone);
  const wd = (() => { try { return new Date(fecha + 'T12:00:00').getDay(); } catch { return 1; } })();
  const accent = OBS;
  return (
    <View style={[st.vibeCard, { borderColor: accent + '55' }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <Chip label={`04:15 VIBECODING · S${p.s}/12`} color={accent} small />
        <Chip label={`${VIBE_ROTACION_ICON[p.rotacion]} ${p.rotacion}`} color={Colors.muted} small />
        {p.deload ? <Chip label="DELOAD 50%" color={Colors.amber} small /> : null}
        <Text style={[st.vibeStat, { marginLeft: 'auto' }]}>{semHechos}/{semDias.length} días · {shipped}/12 shipped</Text>
      </View>
      <Text style={st.vibeTitle}>{p.nombre}</Text>
      {vd ? (
        <Text style={st.vibeStep}>› {vd.wd} · {VIBE_TIPO_LABEL[vd.tipo]}{vd.min !== 45 ? ` (${vd.min}')` : ''}: {vd.paso}</Text>
      ) : wd === 6 ? (
        <Text style={st.vibeStep}>› SÁBADO PC 15:00-17:00 = SHIP: {p.shipTxt}</Text>
      ) : (
        <Text style={st.vibeStep}>› DOMINGO (opcional): Feynman del proyecto — explica en voz alta qué construiste y cómo funciona.</Text>
      )}
      <Text style={st.vibeSub} numberOfLines={2}>entregable: {p.entregable}</Text>
      <View style={{ flexDirection: 'row', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
        {vd ? (
          <TouchableOpacity activeOpacity={0.85} onPress={() => onToggleVibe(vd.d)}
            style={[st.doneBtn, { flex: 1, marginTop: 0 }, hecho ? { backgroundColor: accent, borderColor: accent } : { backgroundColor: accent + '14', borderColor: accent + '66' }]}>
            <Text style={[st.doneBtnTxt, { color: hecho ? '#10122B' : accent }]}>{hecho ? '✓ paso del día hecho' : '○ marcar paso del día'}</Text>
          </TouchableOpacity>
        ) : null}
        {p.docs.slice(0, 2).map((d, i) => (
          <TouchableOpacity key={i} activeOpacity={0.8} onPress={() => openUrl(d.url)} style={[st.verBtn, { borderColor: accent + '88' }]}>
            <Text style={[st.verTxt, { color: accent }]} numberOfLines={1}>docs {i + 1} ↗</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function HoyView({ dia, hoyD, done, onToggle, vibeDone, onToggleVibe }: { dia: DiaSynapse; hoyD: number; done: Set<number>; onToggle: (d: number) => void; vibeDone: Set<number>; onToggleVibe: (d: number) => void }) {
  const hecho = done.has(dia.d);
  const faseDias = SYN_DIAS.filter((x) => x.faseId === dia.faseId);
  const faseHechos = faseDias.filter((x) => done.has(x.d)).length;
  const fasePct = Math.round((faseHechos / faseDias.length) * 100);
  const semDias = SYN_DIAS.filter((x) => x.semana === dia.semana);
  const semHechos = semDias.filter((x) => done.has(x.d)).length;
  const racha = rachaReal(done, hoyD);
  return (
    <View>
      {/* telemetría del run: streak · semana · % checkpoint (todo REAL, desde los ✓) */}
      <View style={st.statsRow}>
        <View style={st.statCard}><Text style={[st.statVal, { color: racha > 0 ? INDIGO : Colors.muted }]}>{racha > 0 ? `🔥${racha}` : '—'}</Text><Text style={st.statLbl}>streak · días ✓</Text></View>
        <View style={st.statCard}><Text style={[st.statVal, { color: Colors.onSurface }]}>{semHechos}/{semDias.length}</Text><Text style={st.statLbl}>week {dia.semana}/12</Text></View>
        <View style={st.statCard}><Text style={[st.statVal, { color: fasePct > 0 ? Colors.green : Colors.muted }]}>{fasePct}%</Text><Text style={st.statLbl}>{dia.faseId.toUpperCase()} checkpoint</Text></View>
      </View>

      <FadeUp>
        <View style={[st.misionCard, { borderColor: INDIGO + '55' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Chip label={dia.fase} color={INDIGO} small />
            <Chip label={`week ${dia.semana}`} color={Colors.muted} small />
            {dia.wd !== 'Dom' && <Chip label={`${dia.bloques.reduce((n, b) => n + (b.tag === 'PC' ? 0 : b.min), 0)} min${dia.bloques.some(b => b.tag === 'PC') ? ' + PC opt' : ''}`} color={Colors.amber} small />}
          </View>
          <Text style={st.misionKicker}>{dia.wd === 'Dom' ? '$ run --review' : `$ run --day ${dia.d}`}</Text>
          <Text style={st.misionTitle}>{dia.wd === 'Dom' ? '🌿 Domingo de repaso' : `Misión del día ${dia.d}`}</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onToggle(dia.d)}
            style={[st.doneBtn, hecho ? { backgroundColor: INDIGO, borderColor: INDIGO } : { backgroundColor: INDIGO + '14', borderColor: INDIGO + '66' }]}
          >
            <Text style={[st.doneBtnTxt, { color: hecho ? '#10122B' : INDIGO }]}>{hecho ? '✓ run passed — misión completada' : '○ marcar run como passed'}</Text>
          </TouchableOpacity>
        </View>
      </FadeUp>

      <FadeUp delay={30}><VibeCard fecha={dia.fecha} vibeDone={vibeDone} onToggleVibe={onToggleVibe} /></FadeUp>

      <Text style={st.secLbl}>◈ jobs del run · en espacios muertos (no tocan tus bloques médicos)</Text>
      {dia.bloques.map((b, i) => <FadeUp key={i} delay={40 + i * 30}><BloqueRow b={b} /></FadeUp>)}
    </View>
  );
}

function SieteView({ fromD, done, onPick }: { fromD: number; done: Set<number>; onPick: (d: number) => void }) {
  const win = syn7d(fromD);
  return (
    <View>
      <Text style={st.secLbl}>◷ próximos 7 runs · toca un día para abrirlo</Text>
      {win.map((x, i) => {
        const a = x.bloques[0];
        const hecho = done.has(x.d);
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: hecho ? Colors.green : INDIGO }]}>
              <Text style={[st.d7day, { color: hecho ? Colors.green : INDIGO }]}>{hecho ? '✓' : ''} D{x.d}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{a.material}</Text>
                <Text style={st.d7sys} numberOfLines={1}>{a.leccion}</Text>
              </View>
              <Text style={[st.d7go, { color: INDIGO }]}>→</Text>
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

function SemanaCard({ g, hoyD, onPick, done, onToggle }: { g: GrupoProgreso<DiaSynapse>; hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const estadoTxt = g.estado === 'completado' ? '✓ completada' : g.estado === 'en-curso' ? `en curso · ${g.pct}%` : 'pendiente';
  const estadoColor = g.estado === 'completado' ? Colors.green : g.estado === 'en-curso' ? INDIGO : Colors.muted;
  return (
    <View style={[st.semCard, { borderColor: INDIGO + (g.estado === 'en-curso' ? '88' : '2E') }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
        <View style={st.semHead}>
          <Text style={st.semTitle} numberOfLines={1}>{open ? '▾' : '▸'} {g.clave}</Text>
          <Text style={[st.semCount, { color: estadoColor }]}>{g.hechos}/{g.total}</Text>
        </View>
        <ProgressBar pct={g.pct} color={INDIGO} />
        <Text style={[st.semEstado, { color: estadoColor }]}>{estadoTxt}</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: 8 }}>
          {g.dias.map((x) => {
            const hecho = done.has(x.d), now = x.d === hoyD;
            const a = x.bloques[0];
            return (
              <View key={x.d} style={[st.diaRow, now && { backgroundColor: INDIGO + '12' }]}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle(x.d)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
                  <Text style={[st.diaChk, { color: hecho ? Colors.green : 'rgba(255,255,255,0.25)' }]}>{hecho ? '☑' : '☐'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={st.diaRowMain}>
                  <Text style={[st.diaRowD, { color: hecho ? Colors.green : now ? INDIGO : Colors.muted }]}>{now ? '▶' : ''} D{x.d}</Text>
                  <Text style={st.diaRowTxt} numberOfLines={1}>{x.wd === 'Dom' ? '🌿 Repaso semanal' : `${a.material} — ${a.leccion}`}</Text>
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
  const grupos = agruparProgreso(SYN_DIAS, (x) => `Semana ${x.semana} · ${x.faseId.toUpperCase()}`, hoyD, done);
  const glob = progresoGlobal(SYN_DIAS, done);
  return (
    <View>
      <View style={st.globCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={st.globTitle}>◈ 12 checkpoints · training progress</Text>
          <Text style={[st.globPct, { color: INDIGO }]}>{glob.pct}%</Text>
        </View>
        <ProgressBar pct={glob.pct} color={INDIGO} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} runs passed · F0 sem 1-8 (auditar ✓ lo ya cursado) · F1 sem 9-12 = stack del vibecoding · sáb PC = SHIP · empieza en 0% (avance manual real)</Text>
      </View>
      {grupos.map((g) => <SemanaCard key={g.clave} g={g} hoyD={hoyD} onPick={onPick} done={done} onToggle={onToggle} />)}
      <Text style={st.note}>☑ marca un run como passed (se guarda en este dispositivo). ▶ = run de hoy. Los checkpoints 13+ se generan al avanzar de fase (node DATA/_scripts/gen_synapse_plan.js).</Text>
    </View>
  );
}

export default function SynapseTodayPlan({ done, onToggle, vibeDone: vibeDoneProp, onToggleVibe: onToggleVibeProp }: {
  done: Set<number>; onToggle: (d: number) => void;
  vibeDone?: Set<number>; onToggleVibe?: (d: number) => void; // v5.7: ✓ del vibecoding (PlanKey 'vibecoding'); si el hub no los pasa, estado local
}) {
  const iso = synTodayISO();
  const hoyD = planHoyD(SYN_DIAS, iso);
  const todayDia = synDiaDe(iso) || SYN_DIAS.find((x) => x.d === hoyD) || SYN_DIAS[0];
  const [sel, setSel] = useState<number>(todayDia.d);
  const [view, setView] = useState<'hoy' | '7d' | 'temario'>('hoy');
  const [vibeLocal, setVibeLocal] = useState<Set<number>>(() => new Set(loadDone('vibecoding')));
  const vibeDone = vibeDoneProp ?? vibeLocal;
  const onToggleVibe = onToggleVibeProp ?? ((d: number) => setVibeLocal((prev) => {
    const n = new Set(prev); if (n.has(d)) n.delete(d); else n.add(d); saveDone('vibecoding', Array.from(n)); return n;
  }));
  const dia = SYN_DIAS.find((x) => x.d === sel) || SYN_DIAS[0];
  // por .d (no por fecha): así el día por defecto figura como HOY aunque hoy caiga antes del inicio o en un hueco
  const esHoy = dia.d === todayDia.d;
  const pickDay = (d: number) => { setSel(d); setView('hoy'); };

  return (
    <View>
      <View style={st.navRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.max(1, s - 1))} style={st.navArrow}><Text style={st.navArrowTxt}>◄</Text></TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={st.navDay}>run D{dia.d}/{SYN_PLAN_META.totalDias}{esHoy ? ' · LIVE' : ''}</Text>
          <Text style={st.navFecha}>{fmtFecha(dia.fecha)} · {dia.fecha}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.min(SYN_PLAN_META.totalDias, s + 1))} style={st.navArrow}><Text style={st.navArrowTxt}>►</Text></TouchableOpacity>
      </View>
      {!esHoy && <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(todayDia.d)} style={st.hoyBtn}><Text style={st.hoyBtnTxt}>↩ volver al run LIVE</Text></TouchableOpacity>}

      <View style={st.subTabs}>
        {([['hoy', '⚡ run'], ['7d', '◷ 7 runs'], ['temario', '◈ checkpoints']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
            <Text style={[st.subTabTxt, view === k && { color: INDIGO }]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <GlassPanel style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
        {view === 'hoy' ? <HoyView dia={dia} hoyD={hoyD} done={done} onToggle={onToggle} vibeDone={vibeDone} onToggleVibe={onToggleVibe} />
          : view === '7d' ? <SieteView fromD={dia.d} done={done} onPick={pickDay} />
          : <TemarioView hoyD={hoyD} onPick={pickDay} done={done} onToggle={onToggle} />}
      </GlassPanel>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.medium, ...Elevation.sm };
const st = StyleSheet.create({
  navRow: { flexDirection: 'row', alignItems: 'center', ...cardBase, padding: Spacing.sm, marginBottom: Spacing.xs },
  navArrow: { width: 40, height: 40, borderRadius: BorderRadius.md, backgroundColor: 'rgba(216,227,252,0.05)', borderWidth: 1, borderColor: Hairline.soft, alignItems: 'center', justifyContent: 'center' },
  navArrowTxt: { fontSize: 16, color: INDIGO, fontWeight: '800' },
  navDay: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: 0.2, ...monoText },
  navFecha: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1, letterSpacing: 0.2, ...monoText },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: INDIGO, fontWeight: '700', letterSpacing: 0.3, ...monoText },

  subTabs: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm, flexWrap: 'wrap' },
  subTab: { flexGrow: 1, paddingVertical: 7, paddingHorizontal: 8, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, alignItems: 'center' },
  subTabOn: { backgroundColor: INDIGO + '14', borderColor: INDIGO + '55', ...Elevation.sm },
  subTabTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted, letterSpacing: 0.4, ...monoText },

  statsRow: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm },
  statCard: { flex: 1, ...cardBase, paddingVertical: 10, paddingHorizontal: 6, alignItems: 'center' },
  statVal: { fontSize: FontSize.bodyLg, fontWeight: '900', letterSpacing: -0.2, ...monoText },
  statLbl: { fontSize: 8, color: Colors.smallLabel, fontWeight: '700', marginTop: 3, textAlign: 'center', letterSpacing: 0.5, textTransform: 'uppercase', ...monoText },

  misionCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm, ...Elevation.md },
  vibeCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm },
  vibeStat: { fontSize: 9, color: Colors.muted, letterSpacing: 0.3, ...monoText },
  vibeTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, marginTop: 6, letterSpacing: -0.1 },
  vibeStep: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: LineHeight.labelMd },
  vibeSub: { fontSize: 9, color: Colors.muted, marginTop: 4, lineHeight: 13 },
  misionKicker: { fontSize: FontSize.labelSm, color: INDIGO, marginTop: 8, letterSpacing: 0.3, ...monoText },
  misionTitle: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: 2, letterSpacing: -0.2, lineHeight: LineHeight.bodyLg },
  doneBtn: { marginTop: 10, paddingVertical: 9, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center' },
  doneBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.3, ...monoText },

  secLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.9, textTransform: 'uppercase', marginBottom: 8, marginTop: Spacing.sm, ...monoText },
  blk: { ...cardBase, borderWidth: 1, flexDirection: 'row', alignItems: 'stretch', gap: 10, paddingVertical: Spacing.md, paddingRight: Spacing.md, paddingLeft: 0, marginBottom: 6, overflow: 'hidden' },
  blkBar: { width: 4, alignSelf: 'stretch', borderTopLeftRadius: BorderRadius.lg, borderBottomLeftRadius: BorderRadius.lg },
  blkStatus: { fontSize: 13, fontWeight: '800', ...monoText },
  blkTag: { fontSize: 10, fontWeight: '800', letterSpacing: 0.3, ...monoText },
  blkFmt: { fontSize: 9, color: Colors.muted, letterSpacing: 0.3, ...monoText },
  blkMat: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '700', letterSpacing: -0.1, flex: 1 },
  blkLec: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 3, lineHeight: LineHeight.labelMd },
  blkDur: { fontSize: 9, color: Colors.muted, marginTop: 3, letterSpacing: 0.3, ...monoText },
  verBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center', alignSelf: 'center' },
  verTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.3, ...monoText },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.sm, marginBottom: 5 },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 44, ...monoText },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56, letterSpacing: 0.2, ...monoText },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 1 },
  d7go: { fontSize: 16, fontWeight: '800', width: 18, textAlign: 'center' },

  globCard: { ...cardBase, padding: Spacing.md, marginBottom: Spacing.sm },
  globTitle: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: 0.3, ...monoText },
  globPct: { fontSize: FontSize.bodyLg, fontWeight: '900', letterSpacing: -0.3, ...monoText },
  globSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 5, lineHeight: LineHeight.labelSm },
  barTrack: { height: 7, borderRadius: BorderRadius.full, backgroundColor: Hairline.strong, overflow: 'hidden' },
  barFill: { height: 7, borderRadius: BorderRadius.full },
  semCard: { ...cardBase, padding: Spacing.md, marginBottom: 6 },
  semHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  semTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flex: 1, letterSpacing: -0.1 },
  semCount: { fontSize: FontSize.labelMd, fontWeight: '800', marginLeft: 8, ...monoText },
  semEstado: { fontSize: FontSize.labelSm, fontWeight: '700', marginTop: 5, letterSpacing: 0.3, ...monoText },
  diaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, paddingHorizontal: 6, borderRadius: BorderRadius.sm, borderTopWidth: 1, borderTopColor: Hairline.soft },
  diaRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  diaChk: { fontSize: 16, width: 22, textAlign: 'center' },
  diaRowD: { fontSize: FontSize.labelSm, fontWeight: '800', width: 44, ...monoText },
  diaRowTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  diaRowGo: { fontSize: 14, color: Colors.muted, width: 16, textAlign: 'center' },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: LineHeight.labelSm },
});
