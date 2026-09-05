import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from './primitives';
import { FadeUp } from './visuals';
import { BIZ_META, BIZ_FRANJAS, BIZ_TRACKER, BIZ_DIAS, DiaBiz, bizDiaDe, biz7d, bizColor, bizModo } from '../../lib/businessStudyPlan';
import { ESTUDIO_LIBROS } from '../../lib/estudioPulsoData';
import { agruparProgreso, planHoyD, progresoGlobal, GrupoProgreso, loadDone, saveDone } from '../../lib/studyProgress';

/**
 * PulsoTodayPlan — "Estudio Pulso" día a día en FORMATO L (v3, 5-sep-2026): SIN franja en el
 * horario v5.6. 20-25 min de audiolibro/lectura en los huecos (L-J) + 1 OUTPUT pequeño el viernes
 * (25-40 min) + tracker semanal (Metricas_v2). Mismo motor que ENCAPS/USMLE/MIR: Día X/N, HOY
 * (lectura + acción + link real), Formato L, 7d clicable y Temario por materia con PROGRESO REAL
 * marcable (empieza 0%, localStorage 'business'). Ya NO sugiere el bloque de 2h (no existe en el
 * calendario): marketing/ventas viven en AURUM y la medicina de la obesidad en LIVIANO Academia.
 */
const GOLD = '#D9BE8A';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
const MODO_LABEL: Record<string, string> = { L: 'lectura en huecos', CRITICA: 'lectura crítica', OUTPUT: 'output del viernes', DESCANSO: 'descanso' };
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return BIZ_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}

function ColaItem({ icon, lbl, val, sub, color, url }: { icon: string; lbl: string; val: string; sub: string; color: string; url?: string }) {
  const inner = (
    <>
      <Text style={st.colaIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={st.colaLbl}>{lbl}</Text>
        <Text style={st.colaVal} numberOfLines={3}>{val}</Text>
        <Text style={st.colaSub}>{sub}</Text>
      </View>
      {url ? <View style={[st.verBtn, { borderColor: color + '88' }]}><Text style={[st.verTxt, { color }]}>ver ↗</Text></View> : null}
    </>
  );
  if (!url) return <View style={[st.cola, { borderLeftColor: color }]}>{inner}</View>;
  return <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(url)} style={[st.cola, { borderLeftColor: color }]}>{inner}</TouchableOpacity>;
}

function HoyView({ dia, onOpenTemario, hecho, onToggle }: { dia: DiaBiz; onOpenTemario: () => void; hecho: boolean; onToggle: (d: number) => void }) {
  const c = bizColor(dia.materia);
  const libro = dia.libroN != null ? ESTUDIO_LIBROS.find((l) => l.n === dia.libroN) : undefined;
  const descanso = dia.materia === 'DESCANSO';
  const modo = bizModo(dia);
  return (
    <View>
      <FadeUp>
        <View style={[st.temaCard, { borderColor: c + '55' }]}>
          <View style={st.temaTop}>
            <TouchableOpacity activeOpacity={0.8} onPress={onOpenTemario} style={[st.sysBadge, { backgroundColor: c + '1F', borderColor: c + '66' }]}>
              <Text style={[st.sysBadgeTxt, { color: c }]}>{dia.materia} ›</Text>
            </TouchableOpacity>
            {!descanso ? <Chip label={`${dia.min} min · ${MODO_LABEL[modo]}`} color={c} small /> : null}
            {libro ? <Chip label={`P${libro.prioridad} · ${libro.horas}h`} color={GOLD} small /> : null}
          </View>
          <Text style={st.temaTitle}>{dia.lectura}</Text>
          {libro ? <Text style={st.temaSub}>{libro.libro} · {libro.autor} → {libro.output}</Text>
            : <Text style={st.temaSub}>{descanso ? 'El cerebro consolida en el descanso — es parte del método.' : 'toca la materia para ver todo el temario y tu avance ›'}</Text>}
          {!descanso && (
            <TouchableOpacity activeOpacity={0.85} onPress={() => onToggle(dia.d)} style={[st.doneBtn, hecho ? { backgroundColor: GOLD, borderColor: GOLD } : { backgroundColor: GOLD + '14', borderColor: GOLD + '66' }]}>
              <Text style={[st.doneBtnTxt, { color: hecho ? '#1A1205' : GOLD }]}>{hecho ? '✓ Completado hoy' : '○ Marcar como completado'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </FadeUp>

      {descanso ? (
        <FadeUp delay={40}>
          <View style={[st.cola, { borderLeftColor: Colors.muted }]}>
            <Text style={st.colaIcon}>😴</Text>
            <View style={{ flex: 1 }}>
              <Text style={st.colaLbl}>DESCANSO PROGRAMADO</Text>
              <Text style={st.colaVal}>Sin lectura ni output. Repasa notas de la semana solo si apetece.</Text>
              <Text style={st.colaSub}>Make It Stick: la consolidación ocurre fuera del escritorio</Text>
            </View>
          </View>
        </FadeUp>
      ) : modo === 'OUTPUT' ? (
        <>
          <Text style={st.secLbl}>🛠️ Viernes · 1 output pequeño y TERMINADO · {BIZ_META.minOutput} min máx</Text>
          <FadeUp delay={40}><ColaItem icon="🛠️" lbl="OUTPUT DE LA SEMANA · 25–40 min" val={dia.lectura} sub="1 página / guion / tabla / tarjetas — terminado, no perfecto" color={GOLD} /></FadeUp>
          {dia.accion ? <FadeUp delay={70}><ColaItem icon="📌" lbl="DÓNDE QUEDA" val={dia.accion} sub="Obsidian o empresaData: si no está escrito, no existe" color={c} /></FadeUp> : null}
          <FadeUp delay={100}><ColaItem icon="📊" lbl="TRACKER SEMANAL (Metricas_v2) · 3 min" val={BIZ_TRACKER.slice(0, 6).map((t) => `${t.metrica}: ${t.meta}`).join(' · ')} sub={BIZ_TRACKER[BIZ_TRACKER.length - 1].meta} color="#A78BFA" /></FadeUp>
        </>
      ) : modo === 'CRITICA' ? (
        <>
          <Text style={st.secLbl}>🔎 Lectura crítica · 25 min en un hueco (no es un bloque del calendario)</Text>
          <FadeUp delay={40}><ColaItem icon="📖" lbl="LEER / ESCUCHAR · 20 min" val={dia.lectura} sub="el libro afirma; la Academia / la sociedad científica responde" color={c} url={dia.yt || undefined} /></FadeUp>
          <FadeUp delay={70}><ColaItem icon="📋" lbl="TABLA · 5 min" val={dia.accion || 'Fila: afirmación del libro · evidencia de la Academia · qué digo yo'} sub="contrastar con LIVIANO_ACADEMIA / CURVA_ACADEMIA — nada pasa a contenido sin fuente primaria" color={GOLD} /></FadeUp>
        </>
      ) : (
        <>
          <Text style={st.secLbl}>🎧 Formato L · {BIZ_META.minLectura} min en un hueco (coche, cola, gimnasio, comida)</Text>
          <FadeUp delay={40}><ColaItem icon="🎧" lbl="ESCUCHAR / LEER · 20 min" val={dia.lectura} sub="un solo tramo del libro; audiolibro verificado o búsqueda real" color={c} url={dia.yt || undefined} /></FadeUp>
          <FadeUp delay={70}><ColaItem icon="✍️" lbl="CERRAR · 5 min" val={dia.accion || 'Nota de 3 líneas en Obsidian o 1 tarjeta de mecanismo (¿por qué?)'} sub="mecanismo, no datos sueltos (Palmerton)" color={GOLD} /></FadeUp>
          <FadeUp delay={100}><ColaItem icon="📅" lbl="EL VIERNES" val="1 output pequeño y terminado + fila del tracker semanal" sub="marketing/ventas → AURUM (14:15) · obesidad/GLP-1 → LIVIANO Academia (17:15)" color="#A78BFA" /></FadeUp>
        </>
      )}
    </View>
  );
}

function HorarioView({ dia }: { dia: DiaBiz }) {
  const c = bizColor(dia.materia);
  const modo = bizModo(dia);
  return (
    <View>
      <Text style={st.secLbl}>🕓 Formato L · {BIZ_META.bloque}</Text>
      {BIZ_FRANJAS.map((f, i) => (
        <FadeUp key={i} delay={i * 25}>
          <View style={st.franja}>
            <View style={[st.franjaHora, { backgroundColor: c + '14' }]}><Text style={[st.franjaHoraTxt, { color: c }]}>{f.hora}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={st.franjaFase}>{f.fase}</Text>
              {f.tipo === 'read' && modo !== 'OUTPUT' && modo !== 'DESCANSO' ? <Text style={[st.franjaDet, { color: c }]}>↳ {dia.lectura}</Text> : null}
              {f.tipo === 'apply' && modo === 'OUTPUT' ? <Text style={[st.franjaDet, { color: GOLD }]}>↳ {dia.lectura}</Text> : null}
              {f.tipo === 'anki' && dia.accion && modo !== 'OUTPUT' ? <Text style={[st.franjaDet, { color: GOLD }]}>↳ {dia.accion}</Text> : null}
            </View>
          </View>
        </FadeUp>
      ))}
      <Text style={st.secLbl}>📊 Tracker semanal (Metricas_v2) · se llena el viernes con el output</Text>
      {BIZ_TRACKER.map((t, i) => (
        <View key={i} style={st.franja}>
          <View style={[st.franjaHora, { backgroundColor: GOLD + '14' }]}><Text style={[st.franjaHoraTxt, { color: GOLD }]}>{t.meta}</Text></View>
          <View style={{ flex: 1 }}><Text style={st.franjaFase}>{t.metrica}</Text></View>
        </View>
      ))}
      <Text style={st.note}>No hay bloque de 2h ni franja en el Calendar v5.6: el formato L vive en tus huecos. Lo que sí tiene hora es AURUM (14:15-15:15, ventas) y LIVIANO Academia (17:15-18:00, obesidad). Fuente: DATA/BUSINESS/plan_pulso_v3_L.json → gen_business_plan.py.</Text>
    </View>
  );
}

function SieteView({ fromD, onPick }: { fromD: number; onPick: (d: number) => void }) {
  const win = biz7d(fromD);
  return (
    <View>
      <Text style={st.secLbl}>📆 Próximos 7 días · toca un día para abrirlo</Text>
      {win.map((x, i) => {
        const c = bizColor(x.materia);
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: c }]}>
              <Text style={[st.d7day, { color: c }]}>D{x.d}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.lectura}</Text>
                <Text style={st.d7sys}>{x.materia}{x.min ? ` · ${x.min} min · ${MODO_LABEL[bizModo(x)]}` : ''}</Text>
              </View>
              <Text style={[st.d7go, { color: c }]}>→</Text>
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

function MateriaCard({ g, hoyD, onPick, done, onToggle }: { g: GrupoProgreso<DiaBiz>; hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const c = bizColor(g.clave);
  const estadoTxt = g.estado === 'completado' ? '✓ completado' : g.estado === 'en-curso' ? `en curso · ${g.pct}%` : 'pendiente';
  const estadoColor = g.estado === 'completado' ? '#3FB984' : g.estado === 'en-curso' ? c : Colors.muted;
  return (
    <View style={[st.sysCard, { borderColor: c + (g.estado === 'en-curso' ? '88' : '2E') }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
        <View style={st.sysHead}>
          <Text style={st.sysTitle} numberOfLines={1}>{open ? '▾' : '▸'} {g.clave}</Text>
          <Text style={[st.sysCount, { color: estadoColor }]}>{g.hechos}/{g.total}</Text>
        </View>
        <ProgressBar pct={g.pct} color={c} />
        <Text style={[st.sysEstado, { color: estadoColor }]}>
          {estadoTxt}{g.diaActual ? ` · hoy: ${g.diaActual.lectura.slice(0, 60)}` : ''}
        </Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: 8 }}>
          {g.dias.map((x) => {
            const hecho = done.has(x.d), now = x.d === hoyD;
            return (
              <View key={x.d} style={[st.temaRow, now && { backgroundColor: c + '12' }]}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle(x.d)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
                  <Text style={[st.temaChk, { color: hecho ? '#3FB984' : 'rgba(255,255,255,0.25)' }]}>{hecho ? '☑' : '☐'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={st.temaRowMain}>
                  <Text style={[st.temaRowD, { color: hecho ? '#3FB984' : now ? c : Colors.muted }]}>{now ? '▶' : ''} D{x.d}</Text>
                  <Text style={st.temaRowTxt} numberOfLines={1}>{x.lectura}</Text>
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
  const estudiables = BIZ_DIAS.filter((x) => x.materia !== 'DESCANSO');
  const grupos = agruparProgreso(estudiables, (x) => x.materia, hoyD, done);
  const glob = progresoGlobal(estudiables, done);
  return (
    <View>
      <View style={st.globCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={st.globTitle}>🗂️ Temario Estudio Pulso · progreso real</Text>
          <Text style={[st.globPct, { color: GOLD }]}>{glob.pct}%</Text>
        </View>
        <ProgressBar pct={glob.pct} color={GOLD} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} sesiones · {grupos.length} materias · empieza en 0% (avance manual real)</Text>
      </View>
      {grupos.map((g) => <MateriaCard key={g.clave} g={g} hoyD={hoyD} onPick={onPick} done={done} onToggle={onToggle} />)}
      <Text style={st.note}>☑ marca una sesión como completada (se guarda en este dispositivo). ▶ = día de hoy. Toca el título para ir a ese día.</Text>
    </View>
  );
}

export default function PulsoTodayPlan() {
  const iso = todayISO();
  const hoyD = planHoyD(BIZ_DIAS, iso);
  const todayDia = bizDiaDe(iso) || BIZ_DIAS.find((x) => x.d === hoyD) || BIZ_DIAS[0];
  const [sel, setSel] = useState<number>(todayDia.d);
  const [view, setView] = useState<'hoy' | 'horario' | '7d' | 'temario'>('hoy');
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone('business')));
  const dia = BIZ_DIAS.find((x) => x.d === sel) || BIZ_DIAS[0];
  const esHoy = dia.fecha === iso;
  const pickDay = (d: number) => { setSel(d); setView('hoy'); };
  const toggleDone = (d: number) => setDone((prev) => {
    const n = new Set(prev);
    if (n.has(d)) n.delete(d); else n.add(d);
    saveDone('business', Array.from(n));
    return n;
  });

  return (
    <View>
      <View style={st.navRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.max(1, s - 1))} style={st.navArrow}><Text style={st.navArrowTxt}>◄</Text></TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={st.navDay}>Día {dia.d}/{BIZ_META.totalDias}{esHoy ? ' · HOY' : ''}</Text>
          <Text style={st.navFecha}>{fmtFecha(dia.fecha)} · {dia.fecha}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.min(BIZ_META.totalDias, s + 1))} style={st.navArrow}><Text style={st.navArrowTxt}>►</Text></TouchableOpacity>
      </View>
      {!esHoy && <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(todayDia.d)} style={st.hoyBtn}><Text style={st.hoyBtnTxt}>↩ volver a HOY</Text></TouchableOpacity>}

      <View style={st.subTabs}>
        {([['hoy', '📋 HOY'], ['horario', '🕓 Formato L'], ['7d', '📆 7 días'], ['temario', '🗂️ Temario']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
            <Text style={[st.subTabTxt, view === k && { color: GOLD }]}>{lbl}</Text>
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

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, ...Elevation.sm };
const st = StyleSheet.create({
  navRow: { flexDirection: 'row', alignItems: 'center', ...cardBase, padding: Spacing.sm, marginBottom: Spacing.xs },
  navArrow: { width: 40, height: 40, borderRadius: BorderRadius.md, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: Hairline.soft, alignItems: 'center', justifyContent: 'center' },
  navArrowTxt: { fontSize: 16, color: GOLD, fontWeight: '800' },
  navDay: { fontSize: FontSize.bodyLg, lineHeight: LineHeight.bodyLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  navFecha: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2 },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm, paddingVertical: 3, paddingHorizontal: 8 },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: GOLD, fontWeight: '700', letterSpacing: 0.2 },

  subTabs: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm, flexWrap: 'wrap' },
  subTab: { flexGrow: 1, paddingVertical: 8, paddingHorizontal: 8, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, alignItems: 'center' },
  subTabOn: { backgroundColor: GOLD + '14', borderColor: GOLD + '55', ...Elevation.sm },
  subTabTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted, letterSpacing: 0.2 },

  temaCard: { ...cardBase, borderWidth: 1, padding: Spacing.lg, marginBottom: Spacing.sm },
  temaTop: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  sysBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 11 },
  sysBadgeTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.3 },
  temaTitle: { fontSize: FontSize.bodyLg, lineHeight: LineHeight.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: 9, letterSpacing: -0.2 },
  temaSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, lineHeight: LineHeight.labelSm + 1 },
  doneBtn: { marginTop: 12, paddingVertical: 10, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center' },
  doneBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.3 },

  secLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.8, marginBottom: 8, marginTop: Spacing.md, textTransform: 'uppercase' },
  cola: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 7 },
  colaIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  colaLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4 },
  colaVal: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600', marginTop: 3, lineHeight: LineHeight.labelMd },
  colaSub: { fontSize: 9, color: Colors.muted, marginTop: 3 },
  verBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 11, alignItems: 'center' },
  verTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },

  franja: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 8, borderTopWidth: 1, borderTopColor: Hairline.soft },
  franjaHora: { borderRadius: BorderRadius.sm, paddingVertical: 4, paddingHorizontal: 8, minWidth: 96, alignItems: 'center' },
  franjaHoraTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  franjaFase: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.labelMd },
  franjaDet: { fontSize: FontSize.labelSm, marginTop: 3, fontWeight: '600' },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: LineHeight.labelSm },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 6 },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 36, letterSpacing: 0.2 },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  d7go: { fontSize: 16, fontWeight: '800', width: 18, textAlign: 'center' },

  globCard: { ...cardBase, padding: Spacing.lg, marginBottom: Spacing.sm },
  globTitle: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.1 },
  globPct: { fontSize: FontSize.bodyLg, fontWeight: '900', letterSpacing: -0.3 },
  globSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 6, lineHeight: LineHeight.labelSm },
  barTrack: { height: 7, borderRadius: BorderRadius.full, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  barFill: { height: 7, borderRadius: BorderRadius.full },
  sysCard: { ...cardBase, padding: Spacing.md, marginBottom: 7 },
  sysHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 },
  sysTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flex: 1, letterSpacing: -0.1 },
  sysCount: { fontSize: FontSize.labelMd, fontWeight: '800', marginLeft: 8 },
  sysEstado: { fontSize: FontSize.labelSm, fontWeight: '700', marginTop: 6, lineHeight: LineHeight.labelSm },
  temaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 7, paddingHorizontal: 6, borderRadius: BorderRadius.sm, borderTopWidth: 1, borderTopColor: Hairline.soft },
  temaRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  temaChk: { fontSize: 16, width: 22, textAlign: 'center' },
  temaRowD: { fontSize: FontSize.labelSm, fontWeight: '800', width: 40 },
  temaRowTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  temaRowGo: { fontSize: 14, color: Colors.muted, width: 16, textAlign: 'center' },
});
