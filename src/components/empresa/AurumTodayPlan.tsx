import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Linking } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { setNavIntent } from '../../lib/navIntent';
import {
  AURUM_PLAN_META, AURUM_DIAS, DiaAurum, AurumBloque, aurumDiaDe, aurum7d,
  AURUM_FORMATO_ICON, AURUM_TAG_LABEL, aurumObsUrl,
} from '../../lib/aurumDailyPlan';
import { agruparProgreso, planHoyD, progresoGlobal, GrupoProgreso } from '../../lib/studyProgress';
import {
  AurumColors as C, AurumRadius as R, AurumSpacing as S, AurumType as T, withAlpha,
} from '../../theme/aurumTheme';
import { Elevation, Motion, Hairline } from '../../theme/tokens';
import { AurumChip, AurumLabel, AurumPanel, AurumProgressBar, AurumButton, AurumRise, useAurumHover } from './aurumVisuals';

/**
 * AurumTodayPlan — motor día a día (130 días · 26 semanas, L-V), rediseño PREMIUM.
 * Misión destacada con anillo/tiempo, núcleo audaz (A=ver, PRAC=la caja negra del
 * closer), lectura distinta para huecos, completar satisfactorio y vistas 7 días /
 * 26 semanas elegantes. Todo el look sale de src/theme/aurumTheme.ts. Data/wiring
 * intactos: PlanKey 'aurum', AURUM_* y studyProgress sin tocar.
 */
const isWeb = Platform.OS === 'web';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
export function aurumTodayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return AURUM_PLAN_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}
function rachaReal(done: Set<number>, hoyD: number): number {
  let d = done.has(hoyD) ? hoyD : hoyD - 1; let n = 0;
  while (d >= 1 && done.has(d)) { n++; d--; } return n;
}
// Acento por tag de bloque (desde tokens)
function tagAccent(tag: AurumBloque['tag']): string {
  return tag === 'A' ? C.coreAccent : tag === 'PRAC' ? C.pracAccent : C.lecturaAccent;
}

// ── Bloque (A=ver / PRAC=drill / L=lectura) — tarjeta audaz ──────────────────
function BloqueRow({ b, obsNota }: { b: AurumBloque; obsNota?: string }) {
  const accent = tagAccent(b.tag);
  const isPrac = b.tag === 'PRAC';
  const obs = isPrac ? aurumObsUrl(obsNota) : null;
  const { hovered, hoverProps } = useAurumHover();
  const inner = (
    <>
      <View style={[st.blkIconWrap, { backgroundColor: withAlpha(accent, 0.14), borderColor: withAlpha(accent, 0.4) }]}>
        <Text style={st.blkIcon}>{AURUM_FORMATO_ICON[b.formato]}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={st.blkTagRow}>
          <Text style={[st.blkTag, { color: accent }]}>{AURUM_TAG_LABEL[b.tag]}</Text>
          {b.real ? <AurumChip label="link verificado" color={C.success} size="sm" /> : <AurumChip label="verifica el link" color={C.warn} size="sm" />}
          {obs ? (
            <TouchableOpacity activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }} onPress={() => openUrl(obs)}>
              <AurumChip label="◆ Obsidian" color={C.obsidian} size="sm" />
            </TouchableOpacity>
          ) : null}
        </View>
        <Text style={st.blkMat}>{b.material}</Text>
        <Text style={st.blkLec}>{b.leccion}</Text>
        {b.dur ? <Text style={st.blkDur}>⏱ {b.dur}</Text> : null}
      </View>
      {b.url ? (
        <View style={[st.verBtn, { borderColor: withAlpha(accent, 0.6), backgroundColor: withAlpha(accent, 0.1) }]}>
          <Text style={[st.verTxt, { color: accent }]}>abrir ↗</Text>
        </View>
      ) : null}
    </>
  );
  const cardStyle = [
    st.blk,
    { borderLeftColor: accent },
    isPrac ? { backgroundColor: withAlpha(C.pracAccent, 0.07), borderColor: withAlpha(C.pracAccent, 0.3) } : null,
    hovered && isWeb ? ({ borderColor: withAlpha(accent, 0.5), transform: [{ translateX: 2 }], ...Elevation.md } as any) : null,
    isWeb ? ({ transition: `all ${Motion.base}` } as any) : null,
  ];
  if (isPrac) {
    return (
      <View>
        <View style={st.pracBanner}><Text style={st.pracBannerTxt}>◆ LA CAJA NEGRA DEL CLOSER — graba, role-play, revisa</Text></View>
        {!b.url
          ? <View style={cardStyle}>{inner}</View>
          : <TouchableOpacity activeOpacity={0.85} {...(hoverProps as any)} onPress={() => openUrl(b.url!)} style={cardStyle}>{inner}</TouchableOpacity>}
      </View>
    );
  }
  if (!b.url) return <View style={cardStyle}>{inner}</View>;
  return <TouchableOpacity activeOpacity={0.85} {...(hoverProps as any)} onPress={() => openUrl(b.url!)} style={[cardStyle, isWeb ? ({ cursor: 'pointer' } as any) : null]}>{inner}</TouchableOpacity>;
}

// ── HOY — misión destacada + núcleo + lectura ───────────────────────────────
function HoyView({ dia, hoyD, done, onToggle, onGoBiblioteca }: { dia: DiaAurum; hoyD: number; done: Set<number>; onToggle: (d: number) => void; onGoBiblioteca: () => void }) {
  const hecho = done.has(dia.d);
  const faseDias = AURUM_DIAS.filter((x) => x.faseId === dia.faseId);
  const fasePct = Math.round((faseDias.filter((x) => done.has(x.d)).length / faseDias.length) * 100);
  const semDias = AURUM_DIAS.filter((x) => x.semana === dia.semana);
  const semHechos = semDias.filter((x) => done.has(x.d)).length;
  const racha = rachaReal(done, hoyD);
  const obsUrl = aurumObsUrl(dia.obs);
  const coreBloques = dia.bloques.filter((b) => b.slot === 'core');
  const lecturaBloques = dia.bloques.filter((b) => b.slot === 'lectura');
  return (
    <View>
      {/* mini-stats reales */}
      <View style={st.statsRow}>
        <View style={st.statCard}><Text style={[st.statVal, { color: racha > 0 ? C.pracAccent : C.textMute }]}>{racha > 0 ? `🔥 ${racha}` : '—'}</Text><Text style={st.statLbl}>racha (días ✓)</Text></View>
        <View style={st.statCard}><Text style={[st.statVal, { color: C.text }]}>{semHechos}/{semDias.length}</Text><Text style={st.statLbl}>semana {dia.semana}/{AURUM_PLAN_META.semanas}</Text></View>
        <View style={st.statCard}><Text style={[st.statVal, { color: fasePct > 0 ? C.success : C.textMute }]}>{fasePct}%</Text><Text style={st.statLbl}>{dia.faseId.toUpperCase()} real</Text></View>
      </View>

      {/* MISIÓN DEL DÍA — tarjeta destacada */}
      <AurumRise>
        <AurumPanel accent={C.gold} glow={!hecho} style={[st.misionCard, hecho ? { borderColor: withAlpha(C.success, 0.5) } : null]}>
          <View style={st.misionTop}>
            <AurumChip label={dia.fase.split('·')[0].trim()} color={C.gold} size="sm" />
            <AurumChip label={`Semana ${dia.semana}`} color={C.textMute} size="sm" />
            {obsUrl ? (
              <TouchableOpacity activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }} onPress={() => openUrl(obsUrl)}>
                <AurumChip label="◆ Obsidian" color={C.obsidian} size="sm" />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={[st.timeBadge, hecho ? { borderColor: withAlpha(C.success, 0.5), backgroundColor: withAlpha(C.success, 0.12) } : null]}>
            <Text style={[st.timeBadgeTxt, hecho && { color: C.success }]}>⏱️ {dia.min} min · {AURUM_PLAN_META.ventana}</Text>
          </View>
          <Text style={st.misionKicker}>Misión del día {dia.d}</Text>
          <Text style={st.misionTitle}>{dia.titulo}</Text>

          {/* barra de progreso de la fase */}
          <View style={{ marginTop: S.md }}>
            <View style={st.misionBarHead}>
              <Text style={st.misionBarLbl}>{dia.faseId.toUpperCase()} · progreso real</Text>
              <Text style={[st.misionBarPct, { color: fasePct > 0 ? C.gold : C.textMute }]}>{fasePct}%</Text>
            </View>
            <AurumProgressBar pct={fasePct} />
          </View>

          <AurumButton
            label={hecho ? '✓ Misión completada' : '○ Marcar misión como completada'}
            onPress={() => onToggle(dia.d)}
            accent={hecho ? C.success : C.gold}
            full
            style={{ marginTop: S.md }}
          />
        </AurumPanel>
      </AurumRise>

      {/* NÚCLEO */}
      <AurumLabel style={{ marginTop: S.lg }}>Núcleo de hoy · {dia.min} min en {AURUM_PLAN_META.ventana} (ver + practicar tu pitch)</AurumLabel>
      {coreBloques.map((b, i) => <AurumRise key={`c${i}`} delay={40 + i * 30}><BloqueRow b={b} obsNota={dia.obs} /></AurumRise>)}

      {/* LECTURA — visualmente distinto */}
      {lecturaBloques.length ? (
        <View style={st.lecturaBox}>
          <Text style={st.lecturaHead}>📚 Para tus huecos (viaje / lectura) · fuera de la hora del núcleo</Text>
          {lecturaBloques.map((b, i) => <AurumRise key={`l${i}`} delay={40 + i * 30}><BloqueRow b={b} obsNota={dia.obs} /></AurumRise>)}
          <TouchableOpacity activeOpacity={0.85} onPress={onGoBiblioteca}
            style={[st.bibBtn, isWeb ? ({ cursor: 'pointer', transition: `all ${Motion.base}` } as any) : null]}>
            <Text style={st.bibBtnTxt}>📚 ver en Biblioteca</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

// ── 7 DÍAS ───────────────────────────────────────────────────────────────────
function SieteView({ fromD, hoyD, done, onPick }: { fromD: number; hoyD: number; done: Set<number>; onPick: (d: number) => void }) {
  const win = aurum7d(fromD);
  return (
    <View>
      <AurumLabel>📆 Próximos 7 días · toca un día para abrirlo</AurumLabel>
      {win.map((x, i) => {
        const a = x.bloques[0];
        const hecho = done.has(x.d);
        const now = x.d === hoyD;
        const acc = hecho ? C.success : now ? C.gold : C.textMute;
        return (
          <AurumRise key={x.d} delay={i * 28}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => onPick(x.d)}
              style={[st.d7, { borderLeftColor: acc }, now && { backgroundColor: withAlpha(C.gold, 0.06) }, isWeb ? ({ cursor: 'pointer' } as any) : null]}>
              <View style={[st.d7Day, { borderColor: withAlpha(acc, 0.5), backgroundColor: withAlpha(acc, 0.12) }]}>
                <Text style={[st.d7DayTxt, { color: acc }]}>{hecho ? '✓' : `D${x.d}`}</Text>
              </View>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.titulo}</Text>
                <Text style={st.d7sys} numberOfLines={1}>{a.material} — {a.leccion}</Text>
              </View>
              <Text style={[st.d7go, { color: acc }]}>→</Text>
            </TouchableOpacity>
          </AurumRise>
        );
      })}
    </View>
  );
}

// ── 26 SEMANAS ────────────────────────────────────────────────────────────────
function SemanaCard({ g, hoyD, onPick, done, onToggle }: { g: GrupoProgreso<DiaAurum>; hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const estadoTxt = g.estado === 'completado' ? '✓ completada' : g.estado === 'en-curso' ? `en curso · ${g.pct}%` : 'pendiente';
  const estadoColor = g.estado === 'completado' ? C.success : g.estado === 'en-curso' ? C.gold : C.textMute;
  return (
    <AurumPanel style={[st.semCard, { borderColor: withAlpha(C.gold, g.estado === 'en-curso' ? 0.5 : 0.18) }]}>
      <TouchableOpacity activeOpacity={0.85} onPress={() => setOpen((o) => !o)} style={isWeb ? ({ cursor: 'pointer' } as any) : null}>
        <View style={st.semHead}>
          <Text style={st.semTitle} numberOfLines={1}>{open ? '▾' : '▸'} {g.clave}</Text>
          <Text style={[st.semCount, { color: estadoColor }]}>{g.hechos}/{g.total}</Text>
        </View>
        <AurumProgressBar pct={g.pct} height={7} />
        <Text style={[st.semEstado, { color: estadoColor }]}>{estadoTxt}</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: S.sm }}>
          {g.dias.map((x) => {
            const hecho = done.has(x.d), now = x.d === hoyD;
            return (
              <View key={x.d} style={[st.diaRow, now && { backgroundColor: withAlpha(C.gold, 0.08) }]}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle(x.d)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
                  <Text style={[st.diaChk, { color: hecho ? C.success : withAlpha('#FFFFFF', 0.25) }]}>{hecho ? '☑' : '☐'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.85} onPress={() => onPick(x.d)} style={st.diaRowMain}>
                  <Text style={[st.diaRowD, { color: hecho ? C.success : now ? C.gold : C.textMute }]}>{now ? '▶' : ''} D{x.d}</Text>
                  <Text style={st.diaRowTxt} numberOfLines={1}>{x.titulo}</Text>
                  <Text style={st.diaRowGo}>→</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </AurumPanel>
  );
}

function TemarioView({ hoyD, onPick, done, onToggle }: { hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const grupos = agruparProgreso(AURUM_DIAS, (x) => `Semana ${x.semana} · ${x.faseId.toUpperCase()}`, hoyD, done);
  const glob = progresoGlobal(AURUM_DIAS, done);
  return (
    <View>
      <AurumPanel accent={C.gold} style={st.globCard}>
        <View style={st.globHead}>
          <Text style={st.globTitle}>🗺️ {AURUM_PLAN_META.semanas} semanas · progreso real</Text>
          <Text style={[st.globPct, { color: C.gold }]}>{glob.pct}%</Text>
        </View>
        <AurumProgressBar pct={glob.pct} height={9} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} misiones · 7 fases · L-V · empieza en 0% (avance manual real)</Text>
      </AurumPanel>
      {grupos.map((g) => <SemanaCard key={g.clave} g={g} hoyD={hoyD} onPick={onPick} done={done} onToggle={onToggle} />)}
      <Text style={st.note}>☑ marca una misión como completada (se guarda en este dispositivo). ▶ = día de hoy. Regenerar el plan: node DATA/_scripts/gen_aurum_plan.js.</Text>
    </View>
  );
}

// ── Sub-tab del motor (HOY / 7d / 26 sem) ───────────────────────────────────
function ViewTab({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}
      style={[st.subTab, active && { backgroundColor: withAlpha(C.gold, 0.14), borderColor: withAlpha(C.gold, 0.5) }, isWeb ? ({ cursor: 'pointer' } as any) : null]}>
      <Text style={[st.subTabTxt, active && { color: C.gold }]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function AurumTodayPlan({ done, onToggle, isDesktop = false }: { done: Set<number>; onToggle: (d: number) => void; isDesktop?: boolean }) {
  // En desktop el árbol NO tiene NavigationContainer (DesktopLayout usa estado propio);
  // leer el contexto con useContext NO lanza (devuelve undefined) → en desktop es no-op,
  // en móvil/tablet sigue navegando. Antes usábamos useNavigation() que CRASHEABA en desktop.
  const navigation = React.useContext(NavigationContext) as any;
  const iso = aurumTodayISO();
  const hoyD = planHoyD(AURUM_DIAS, iso);
  const todayDia = aurumDiaDe(iso) || AURUM_DIAS.find((x) => x.d === hoyD) || AURUM_DIAS[0];
  const [sel, setSel] = useState<number>(todayDia.d);
  const [view, setView] = useState<'hoy' | '7d' | 'temario'>('hoy');
  const dia = AURUM_DIAS.find((x) => x.d === sel) || AURUM_DIAS[0];
  const esHoy = dia.fecha === iso;
  const pickDay = (d: number) => { setSel(d); setView('hoy'); };
  // deep-link AURUM (lectura) → Home/Biblioteca: marca la intención y salta a la pestaña Home
  const goBiblioteca = () => { setNavIntent('biblioteca'); navigation?.navigate?.('Home'); };

  return (
    <View>
      {/* navegador de día */}
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
        <ViewTab label="⚡ HOY" active={view === 'hoy'} onPress={() => setView('hoy')} />
        <ViewTab label="📆 7 días" active={view === '7d'} onPress={() => setView('7d')} />
        <ViewTab label="🗺️ 26 semanas" active={view === 'temario'} onPress={() => setView('temario')} />
      </View>

      <AurumPanel style={[st.motorBox, isDesktop && { padding: S.xl }]}>
        {view === 'hoy' ? <HoyView dia={dia} hoyD={hoyD} done={done} onToggle={onToggle} onGoBiblioteca={goBiblioteca} />
          : view === '7d' ? <SieteView fromD={dia.d} hoyD={hoyD} done={done} onPick={pickDay} />
            : <TemarioView hoyD={hoyD} onPick={pickDay} done={done} onToggle={onToggle} />}
      </AurumPanel>
    </View>
  );
}

const st = StyleSheet.create({
  // navegador
  navRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface, borderRadius: R.md, borderWidth: 1, borderColor: C.border, padding: S.sm, marginBottom: S.xs },
  navArrow: { width: 42, height: 42, borderRadius: R.sm, backgroundColor: withAlpha('#FFFFFF', 0.05), alignItems: 'center', justifyContent: 'center' },
  navArrowTxt: { fontSize: 16, color: C.gold, fontWeight: T.weight.extrabold },
  navDay: { fontSize: T.size.subtitle, fontWeight: T.weight.extrabold, color: C.text },
  navFecha: { fontSize: T.size.micro, color: C.textMute, marginTop: 1 },
  hoyBtn: { alignSelf: 'center', marginBottom: S.sm },
  hoyBtnTxt: { fontSize: T.size.micro, color: C.gold, fontWeight: T.weight.bold },

  // sub-tabs
  subTabs: { flexDirection: 'row', gap: 7, marginBottom: S.sm, flexWrap: 'wrap' },
  subTab: { flexGrow: 1, paddingVertical: 9, paddingHorizontal: 10, borderRadius: R.sm, borderWidth: 1, borderColor: C.border, alignItems: 'center' },
  subTabTxt: { fontSize: T.size.caption, fontWeight: T.weight.bold, color: C.textMute },

  motorBox: { marginBottom: S.xl, padding: S.lg },

  // mini-stats
  statsRow: { flexDirection: 'row', gap: 7, marginBottom: S.md },
  statCard: { flex: 1, backgroundColor: C.surfaceAlt, borderRadius: R.sm, borderWidth: 1, borderColor: C.border, paddingVertical: 9, paddingHorizontal: 6, alignItems: 'center' },
  statVal: { fontSize: T.size.subtitle, fontWeight: T.weight.black },
  statLbl: { fontSize: T.size.nano, color: C.textMute, marginTop: 2, textAlign: 'center' },

  // misión
  misionCard: { padding: S.lg, marginBottom: S.sm },
  misionTop: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  timeBadge: { alignSelf: 'flex-start', marginTop: S.md, borderWidth: 1, borderColor: withAlpha(C.gold, 0.5), backgroundColor: withAlpha(C.gold, 0.12), borderRadius: R.sm, paddingVertical: 5, paddingHorizontal: 11 },
  timeBadgeTxt: { fontSize: T.size.caption, fontWeight: T.weight.extrabold, color: C.goldSoft, letterSpacing: 0.3 },
  misionKicker: { fontSize: T.size.micro, fontWeight: T.weight.extrabold, color: C.textMute, letterSpacing: 1, marginTop: S.md },
  misionTitle: { fontSize: T.size.titleXl, fontWeight: T.weight.black, color: C.text, marginTop: 4, lineHeight: 30 },
  misionBarHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  misionBarLbl: { fontSize: T.size.nano, fontWeight: T.weight.bold, color: C.textMute, letterSpacing: 0.6 },
  misionBarPct: { fontSize: T.size.caption, fontWeight: T.weight.black },

  // bloques
  pracBanner: { alignSelf: 'flex-start', backgroundColor: withAlpha(C.pracAccent, 0.14), borderRadius: R.xs, paddingVertical: 3, paddingHorizontal: 9, marginTop: 6, marginBottom: 5 },
  pracBannerTxt: { fontSize: T.size.nano, fontWeight: T.weight.black, color: C.pracAccent, letterSpacing: 0.5 },
  blk: { backgroundColor: C.surfaceAlt, borderRadius: R.sm, borderWidth: 1, borderColor: C.border, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 11, padding: S.md, marginBottom: 7 },
  blkIconWrap: { width: 38, height: 38, borderRadius: R.sm, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  blkIcon: { fontSize: 18 },
  blkTagRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  blkTag: { fontSize: T.size.nano, fontWeight: T.weight.black, letterSpacing: 0.3 },
  blkMat: { fontSize: T.size.caption, color: C.text, fontWeight: T.weight.bold, marginTop: 3 },
  blkLec: { fontSize: T.size.caption, color: C.textDim, marginTop: 2, lineHeight: 17 },
  blkDur: { fontSize: T.size.nano, color: C.textMute, marginTop: 3 },
  verBtn: { borderWidth: 1, borderRadius: R.sm, paddingVertical: 6, paddingHorizontal: 11, alignItems: 'center' },
  verTxt: { fontSize: T.size.micro, fontWeight: T.weight.extrabold },

  // lectura
  lecturaBox: { backgroundColor: withAlpha(C.lecturaAccent, 0.06), borderRadius: R.md, borderWidth: 1, borderStyle: 'dashed', borderColor: withAlpha(C.lecturaAccent, 0.4), padding: S.lg, marginTop: S.md },
  lecturaHead: { fontSize: T.size.nano, fontWeight: T.weight.extrabold, color: C.lecturaAccent, letterSpacing: 0.6, marginBottom: S.sm },
  bibBtn: { alignSelf: 'flex-start', marginTop: S.sm, borderWidth: 1, borderColor: withAlpha(C.lecturaAccent, 0.6), backgroundColor: withAlpha(C.lecturaAccent, 0.12), borderRadius: R.sm, paddingVertical: 7, paddingHorizontal: 13 },
  bibBtnTxt: { fontSize: T.size.caption, fontWeight: T.weight.extrabold, color: C.lecturaAccent, letterSpacing: 0.3 },

  // 7 días
  d7: { backgroundColor: C.surfaceAlt, borderRadius: R.sm, borderWidth: 1, borderColor: C.border, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: S.sm, marginBottom: 6 },
  d7Day: { minWidth: 42, height: 30, borderRadius: R.xs, borderWidth: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  d7DayTxt: { fontSize: T.size.caption, fontWeight: T.weight.black },
  d7fecha: { fontSize: T.size.micro, color: C.textMute, width: 56 },
  d7sub: { fontSize: T.size.caption, color: C.text, fontWeight: T.weight.semibold },
  d7sys: { fontSize: T.size.nano, color: C.textMute, marginTop: 1 },
  d7go: { fontSize: 17, fontWeight: T.weight.extrabold, width: 18, textAlign: 'center' },

  // 26 semanas
  globCard: { marginBottom: S.sm, padding: S.lg },
  globHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 },
  globTitle: { fontSize: T.size.body, fontWeight: T.weight.extrabold, color: C.text },
  globPct: { fontSize: T.size.subtitle, fontWeight: T.weight.black },
  globSub: { fontSize: T.size.micro, color: C.textMute, marginTop: 6 },
  semCard: { padding: S.md, marginBottom: 7 },
  semHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 },
  semTitle: { fontSize: T.size.bodySm, fontWeight: T.weight.extrabold, color: C.text, flex: 1 },
  semCount: { fontSize: T.size.caption, fontWeight: T.weight.extrabold, marginLeft: 8 },
  semEstado: { fontSize: T.size.micro, fontWeight: T.weight.bold, marginTop: 6 },
  diaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 7, paddingHorizontal: 6, borderRadius: R.xs, borderTopWidth: 1, borderTopColor: C.borderSoft },
  diaRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  diaChk: { fontSize: 16, width: 22, textAlign: 'center' },
  diaRowD: { fontSize: T.size.micro, fontWeight: T.weight.extrabold, width: 44 },
  diaRowTxt: { flex: 1, fontSize: T.size.caption, color: C.textDim },
  diaRowGo: { fontSize: 14, color: C.textMute, width: 16, textAlign: 'center' },
  note: { fontSize: T.size.micro, color: C.textMute, marginTop: S.sm, lineHeight: 15 },
});
