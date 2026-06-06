// EncapsPlanView — Opción B (nativa) del PROMPT_ULTRAMAESTRO_APP.
// PE Perú → ENCAPS → "Plan diario": HOY · Camino a 17/20 · Simulacros · 7 días.
// Lee study_schedule/metrics/checks/sim_scores de Supabase; los checks se
// sincronizan a study_checks (dashboard ↔ app ↔ Supabase ↔ Telegram).
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Linking, TextInput, Platform, ActivityIndicator,
} from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';
import {
  useEncapsPlan, itemsForDay, type PlanItem, type StudyScheduleDay, type StudyMetrics,
} from '../lib/encapsPlan';
import EncapsWebView from './EncapsWebView';

// Google Calendar del usuario (día) embebido — sincronización minuto a minuto.
// Requiere sesión Google del navegador (calendario privado). ctz Lima.
const GCAL_EMBED_URL =
  'https://calendar.google.com/calendar/embed?src=josephsototocas%40gmail.com&ctz=America%2FLima&mode=DAY&showTitle=0&showPrint=0&showCalendars=0&showTabs=0';

type Sub = 'hoy' | 'meta' | 'sim' | 'sem' | 'horario';

interface HorarioBlock { hora: string; titulo: string; apex?: boolean }

const KIND_ICON: Record<PlanItem['kind'], string> = {
  video: '🎬', theomed: '📂', pulso: '💓', eval: '📝', sim: '🔥',
};

// Estado QX del video → etiqueta/color (igual que el dashboard)
function estadoMeta(estado?: string): { label: string; color: string } | null {
  switch (estado) {
    case 'visto': return { label: 'visto', color: Colors.green };
    case 'en_progreso': return { label: 'en progreso', color: Colors.amber };
    case 'bloqueado': return { label: '🔒 no liberado', color: Colors.muted };
    case 'pendiente': return { label: 'pendiente', color: Colors.coral };
    default: return estado ? { label: estado, color: Colors.muted } : null;
  }
}

export default function EncapsPlanView() {
  const plan = useEncapsPlan('ENCAPS');
  const [sub, setSub] = useState<Sub>('hoy');

  const subTabs: { key: Sub; label: string }[] = [
    { key: 'hoy', label: '📅 HOY' },
    { key: 'horario', label: '⏰ Horario' },
    { key: 'meta', label: '🎯 17/20' },
    { key: 'sim', label: '🔥 Sim' },
    { key: 'sem', label: '🗓️ 7d' },
  ];

  if (plan.loading) {
    return (
      <View style={{ paddingVertical: Spacing['3xl'], alignItems: 'center' }}>
        <ActivityIndicator color={Colors.coral} />
        <Text style={{ color: Colors.muted, marginTop: Spacing.sm, fontSize: FontSize.labelSm }}>
          Cargando plan ENCAPS…
        </Text>
      </View>
    );
  }

  return (
    <View>
      {/* Sub-tabs */}
      <View style={styles.subTabRow}>
        {subTabs.map(t => (
          <TouchableOpacity
            key={t.key}
            style={[styles.subTab, sub === t.key && styles.subTabActive]}
            onPress={() => setSub(t.key)}
          >
            <Text style={[styles.subTabText, sub === t.key && styles.subTabTextActive]} numberOfLines={1}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {sub === 'hoy' && <HoyView plan={plan} />}
      {sub === 'horario' && <HorarioView plan={plan} />}
      {sub === 'meta' && <MetaView metrics={plan.metrics} simScores={plan.simScores} simDays={plan.simDays} />}
      {sub === 'sim' && <SimView plan={plan} />}
      {sub === 'sem' && <SemView days={plan.days} dia={plan.dia} />}
    </View>
  );
}

// ─── HOY ───
function HoyView({ plan }: { plan: ReturnType<typeof useEncapsPlan> }) {
  const { today, dia, total, metrics, todayItems, doneToday, totalToday, checks, toggleCheck } = plan;
  if (!today) {
    return <Text style={styles.empty}>Sin datos del cronograma para hoy. Corré el sync (encaps_supabase_sync.py).</Text>;
  }
  const pct = totalToday > 0 ? Math.round((doneToday / totalToday) * 100) : 0;
  const tema = `${today.codigo || ''} ${today.subtema || ''}`.trim() || (today.extra?.theme as string) || '—';
  const vueltas = (today.extra as Record<string, unknown> | undefined)?.vueltas as string | undefined;

  return (
    <View>
      <View style={styles.hoyHeader}>
        <Text style={styles.hoyDay}>D{dia}/{total} · {today.weekday || ''} {String(today.fecha).slice(5)}</Text>
        <Text style={styles.hoyTema}>{tema}</Text>
        <View style={styles.hoyMetaRow}>
          {!!today.prioridad && <Pill text={today.prioridad} color={today.prioridad.includes('CRÍT') ? Colors.coral : Colors.amber} />}
          {!!today.modo && <Pill text={`Modo ${today.modo}`} color={Colors.teal} />}
          {!!vueltas && <Pill text={`${vueltas} vueltas`} color={Colors.purple} />}
          {metrics?.qx_pct != null && <Pill text={`QX ${metrics.qx_pct}%`} color={Colors.blue} />}
          {metrics?.dias_a_examen != null && <Pill text={`examen ${metrics.dias_a_examen}d`} color={Colors.muted} />}
        </View>
        {!!today.nts && <Text style={styles.ntsLine}>📋 NTS Tier-1: {today.nts}</Text>}
      </View>

      {/* Progreso de hoy */}
      <View style={styles.progressCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm }}>
          <Text style={styles.progressLabel}>Hechos hoy</Text>
          <Text style={[styles.progressValue, { color: pct >= 80 ? Colors.green : pct > 0 ? Colors.amber : Colors.muted }]}>
            {doneToday}/{totalToday} · {pct}%
          </Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${pct}%`, backgroundColor: pct >= 80 ? Colors.green : Colors.coral }]} />
        </View>
      </View>

      {/* Aclaración tema vs cola */}
      {todayItems.some(i => i.kind === 'video') && (
        <>
          <Text style={styles.groupHdr}>📺 Cola QX de hoy</Text>
          <Text style={styles.groupHint}>
            Videos que QX ya liberó, en orden de prioridad (no todos son del tema de hoy: cada video
            pertenece a su propio tema/día-foco). El “tema de hoy” para crear APEX es <Text style={{ color: Colors.coral, fontWeight: '700' }}>{tema}</Text>.
          </Text>
          {todayItems.filter(i => i.kind === 'video').map(it => (
            <CheckRow key={it.key} item={it} checked={!!checks[it.key]} onToggle={v => toggleCheck(it.key, v)} todayDia={dia} />
          ))}
        </>
      )}

      {todayItems.some(i => i.kind !== 'video') && (
        <>
          <Text style={styles.groupHdr}>📚 Material del tema + práctica</Text>
          {todayItems.filter(i => i.kind !== 'video').map(it => (
            <CheckRow key={it.key} item={it} checked={!!checks[it.key]} onToggle={v => toggleCheck(it.key, v)} todayDia={dia} />
          ))}
        </>
      )}

      {/* NTS Tier-1 — qué normas y dónde estudiarlas */}
      {!!today.nts && (
        <View style={styles.refBox}>
          <Text style={styles.refTitle}>📋 NTS Tier-1 (normas técnicas)</Text>
          <Text style={styles.refBody}>{today.nts}</Text>
          <Text style={styles.refWhere}>Dónde: Theomed → carpeta “NORMAS TÉCNICAS” + Material Drive ↓</Text>
        </View>
      )}

      {/* Material complementario (Drive / otras academias) */}
      {Array.isArray(today.material_comp) && today.material_comp.length > 0 && (
        <View style={styles.refBox}>
          <Text style={styles.refTitle}>📚 Material complementario (Drive)</Text>
          {today.material_comp.map((mm, i) => (
            <TouchableOpacity key={i} onPress={() => mm.url && Linking.openURL(mm.url)} disabled={!mm.url} activeOpacity={0.7}>
              <Text style={styles.matLink} numberOfLines={2}>• {mm.label || mm.url} {mm.url ? '↗' : ''}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

function CheckRow({ item, checked, onToggle, todayDia }: { item: PlanItem; checked: boolean; onToggle: (v: boolean) => void; todayDia?: number }) {
  const m = item.kind === 'video' ? estadoMeta(item.estado) : null;
  const ownTheme = item.kind === 'video' && item.focusDia != null && item.focusDia === todayDia;
  return (
    <View style={styles.checkRow}>
      <TouchableOpacity onPress={() => onToggle(!checked)} style={styles.checkTouch} activeOpacity={0.7}>
        <View style={[styles.checkbox, checked && styles.checkboxOn]}>
          {checked && <Text style={styles.checkMark}>✓</Text>}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.checkLabel, checked && styles.checkLabelDone]} numberOfLines={2}>
            {KIND_ICON[item.kind]} {item.label}
          </Text>
          <View style={styles.checkSubRow}>
            {!!item.source && <Text style={styles.srcTag}>{item.source}</Text>}
            {!!item.detail && <Text style={styles.checkDetail} numberOfLines={1}>{item.detail}</Text>}
            {m && <Text style={[styles.estadoBadge, { color: m.color, backgroundColor: m.color + '22' }]}>{m.label}</Text>}
            {item.kind === 'video' && item.code && (
              <Text style={[styles.themeTag, ownTheme ? styles.themeTagOwn : styles.themeTagOther]}>
                {ownTheme ? '★ tema de hoy' : `tema propio: D${item.focusDia ?? '?'}`}
              </Text>
            )}
            {item.kind === 'video' && <Text style={styles.vueltaTag}>1ª vuelta</Text>}
          </View>
          {/* Bloqueado en QX → dónde estudiarlo hoy */}
          {item.kind === 'video' && item.locked && !item.url && (
            <View>
              <Text style={styles.lockHint}>
                🔒 QX libera {item.unlock ? item.unlock.slice(5) : 'pronto'} → hoy: Theomed equivalente
              </Text>
              {!!item.fallbackUrl && (
                <TouchableOpacity onPress={() => Linking.openURL(item.fallbackUrl as string)} activeOpacity={0.7}>
                  <Text style={styles.fallbackLink}>{item.fallbackLabel || 'Drive 2026-1'} ↗</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.linkCol}>
        {item.url ? (
          <TouchableOpacity onPress={() => Linking.openURL(item.url as string)} style={styles.openBtn}>
            <Text style={styles.openBtnText}>{item.kind === 'video' ? '▶ ver' : 'abrir ↗'}</Text>
          </TouchableOpacity>
        ) : null}
        {!!item.slides && (
          <TouchableOpacity onPress={() => Linking.openURL(item.slides as string)} style={[styles.openBtn, styles.pdfBtn]}>
            <Text style={[styles.openBtnText, { color: Colors.blue }]}>PDF</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// ─── Camino a 17/20 ───
function MetaView({ metrics, simScores, simDays }: {
  metrics: StudyMetrics | null;
  simScores: Record<number, { nota?: number | null }>;
  simDays: StudyScheduleDay[];
}) {
  const prom = metrics?.prom_sim ?? null;
  const metaPct = prom != null ? Math.min(100, Math.round((prom / 20) * 100)) : 0;
  const notas = Object.values(simScores).map(s => s.nota).filter((n): n is number => n != null);

  const stats: { label: string; value: string; color: string }[] = [
    { label: 'QX vistos', value: metrics?.qx_pct != null ? `${metrics.qx_pct}%` : 's/d', color: Colors.blue },
    { label: 'Cobertura plan', value: metrics?.cobertura_pct != null ? `${metrics.cobertura_pct}%` : 's/d', color: Colors.teal },
    { label: 'Ritmo', value: metrics?.ritmo_min_dia != null ? `${metrics.ritmo_min_dia}min` : 's/d', color: Colors.amber },
    { label: 'Accionable', value: metrics?.accionable_videos != null ? `${metrics.accionable_videos} vids` : 's/d', color: Colors.coral },
    { label: 'Examen en', value: metrics?.dias_a_examen != null ? `${metrics.dias_a_examen}d` : 's/d', color: Colors.purple },
    { label: 'Pendiente', value: metrics?.pendiente_h != null ? `${metrics.pendiente_h}h` : 's/d', color: Colors.muted },
  ];

  return (
    <View>
      {/* Barra hacia 17/20 */}
      <View style={styles.metaCard}>
        <Text style={styles.metaTitle}>Promedio simulacros → meta ≥17/20</Text>
        <Text style={[styles.metaBig, { color: prom != null ? (prom >= 17 ? Colors.green : Colors.amber) : Colors.muted }]}>
          {prom != null ? `${prom}` : 'sin datos'}<Text style={styles.metaBigSub}> /20</Text>
        </Text>
        <View style={styles.metaTrackWrap}>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${metaPct}%`, backgroundColor: prom != null && prom >= 17 ? Colors.green : Colors.amber }]} />
          </View>
          {/* marca 17/20 = 85% */}
          <View style={[styles.metaMarker, { left: '85%' }]} />
        </View>
        <Text style={styles.metaHint}>{notas.length} simulacro{notas.length === 1 ? '' : 's'} con nota · marca = 17/20 (85%)</Text>
      </View>

      {/* KPIs */}
      <View style={styles.statGrid}>
        {stats.map(s => (
          <View key={s.label} style={styles.statCell}>
            <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionSub}>{simDays.length} simulacros programados · cargá las notas en la pestaña 🔥 Simulacros.</Text>
    </View>
  );
}

// ─── Simulacros ───
function SimView({ plan }: { plan: ReturnType<typeof useEncapsPlan> }) {
  const { simDays, simScores, saveSim } = plan;
  if (simDays.length === 0) return <Text style={styles.empty}>Sin simulacros en el cronograma.</Text>;
  return (
    <View>
      {simDays.map(d => {
        const s = d.simulacro!;
        const simN = s.simulacro_n ?? d.dia;
        return (
          <SimRow
            key={d.dia}
            dia={d.dia}
            weekday={d.weekday}
            fecha={d.fecha}
            clave={s.clave || s.label || `Sim ${simN}`}
            duracion={s.duracion}
            url={s.theomed_bank?.url}
            nota={simScores[simN]?.nota ?? null}
            onSave={(nota) => saveSim(simN, nota, d.fecha)}
          />
        );
      })}
    </View>
  );
}

function SimRow({ dia, weekday, fecha, clave, duracion, url, nota, onSave }: {
  dia: number; weekday?: string; fecha: string; clave: string; duracion?: string;
  url?: string; nota: number | null; onSave: (nota: number | null) => void;
}) {
  const [txt, setTxt] = useState(nota != null ? String(nota) : '');
  const commit = () => {
    const t = txt.trim();
    if (t === '') { onSave(null); return; }
    const n = Number(t.replace(',', '.'));
    if (!isNaN(n)) onSave(n);
  };
  const passed = nota != null && nota >= 17;
  return (
    <View style={[styles.simCard, { borderLeftColor: nota == null ? Colors.muted : passed ? Colors.green : Colors.amber }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.simClave}>{clave}</Text>
        <Text style={styles.simMeta}>D{dia} · {weekday || ''} {String(fecha).slice(5)}{duracion ? ` · ${duracion}` : ''}</Text>
        {!!url && (
          <TouchableOpacity onPress={() => Linking.openURL(url)}>
            <Text style={styles.simLink}>Theomed ↗</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={styles.simInput}
            value={txt}
            onChangeText={setTxt}
            onEndEditing={commit}
            onBlur={commit}
            keyboardType="numeric"
            placeholder="–"
            placeholderTextColor={Colors.muted}
            returnKeyType="done"
          />
          <Text style={styles.simSlash}>/20</Text>
        </View>
        {nota != null && (
          <Text style={[styles.simBadge, { color: passed ? Colors.green : Colors.amber }]}>
            {passed ? '✓ ≥17' : 'meta 17'}
          </Text>
        )}
      </View>
    </View>
  );
}

// ─── 7 días ───
function SemView({ days, dia }: { days: StudyScheduleDay[]; dia: number }) {
  const next = days.filter(d => d.dia >= dia && d.dia < dia + 7);
  if (next.length === 0) return <Text style={styles.empty}>Sin próximos días.</Text>;
  return (
    <View>
      {next.map(d => {
        const isToday = d.dia === dia;
        const tema = `${d.codigo || ''} ${d.subtema || ''}`.trim() || (d.extra?.theme as string) || d.tipo || '—';
        return (
          <View key={d.dia} style={[styles.semRow, isToday && styles.semRowToday]}>
            <View style={styles.semDayBox}>
              <Text style={[styles.semDayNum, isToday && { color: Colors.coral }]}>D{d.dia}</Text>
              <Text style={styles.semWeekday}>{(d.weekday || '').slice(0, 3)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.semTema} numberOfLines={1}>{tema}</Text>
              <Text style={styles.semDetail}>
                {String(d.fecha).slice(5)}
                {d.n_videos ? ` · ${d.n_videos} vids` : ''}
                {d.simulacro ? ' · 🔥 simulacro' : ''}
              </Text>
            </View>
            {!!d.prioridad && d.prioridad.includes('CRÍT') && <Text style={styles.semCrit}>CRÍTICA</Text>}
          </View>
        );
      })}
    </View>
  );
}

// ─── Horario (bloques del día, leídos de Google Calendar vía sync) ───
function HorarioView({ plan }: { plan: ReturnType<typeof useEncapsPlan> }) {
  const { today, metrics } = plan;
  const horarios = (metrics?.extra as Record<string, unknown> | undefined)?.horarios as
    | { weekday?: HorarioBlock[]; weekend?: HorarioBlock[] }
    | undefined;
  // día de semana del día actual (12:00 para evitar saltos de tz)
  const dow = today?.fecha ? new Date(`${today.fecha}T12:00:00`).getDay() : 1;
  const isWeekend = dow === 0 || dow === 6;
  const blocks = (isWeekend ? horarios?.weekend : horarios?.weekday) ?? [];
  const isSimPlan = !!today?.simulacro;

  const tema = today ? `${today.codigo || ''} ${today.subtema || ''}`.trim() : '';

  // Micro-horario: reparte los videos del día dentro del bloque deep-prime, hora exacta.
  const apexBlock = blocks.find(b => b.apex);
  const micro: { time: string; label: string; dur: number; locked?: boolean }[] = [];
  if (apexBlock && plan.todayItems.length) {
    const start = apexBlock.hora.split('-')[0].trim();
    let h = parseInt(start.split(':')[0], 10) || 9;
    let mn = parseInt(start.split(':')[1], 10) || 0;
    for (const v of plan.todayItems.filter(i => i.kind === 'video')) {
      const dur = v.dur ?? 20;
      const s = `${String(h).padStart(2, '0')}:${String(mn).padStart(2, '0')}`;
      let em = mn + dur; let eh = h + Math.floor(em / 60); em %= 60;
      micro.push({ time: `${s}–${String(eh).padStart(2, '0')}:${String(em).padStart(2, '0')}`, label: v.label, dur, locked: v.locked });
      h = eh; mn = em;
    }
  }

  return (
    <View>
      <Text style={styles.horarioHint}>
        {isWeekend ? '🔥 Fin de semana — estructura de simulacro (Google Calendar)' : '🟢 Día de semana — estructura deep-prime (Google Calendar)'}
      </Text>
      {isWeekend && !isSimPlan && (
        <Text style={styles.horarioWarn}>
          ⚠️ El Calendar marca simulacro hoy, pero el plan ENCAPS de este día es deep-prime (1er simulacro: D8).
        </Text>
      )}
      {blocks.length === 0 ? (
        <Text style={styles.empty}>Sin bloques cargados. Corré el sync.</Text>
      ) : blocks.map((b, i) => (
        <View key={i} style={[styles.horarioRow, b.apex && styles.horarioRowApex]}>
          <Text style={[styles.horarioHora, b.apex && { color: Colors.coral }]}>{b.hora}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.horarioTitulo} numberOfLines={2}>{b.titulo}</Text>
            {b.apex && !!tema && <Text style={styles.horarioTema}>→ HOY: {tema}</Text>}
          </View>
        </View>
      ))}
      <Text style={styles.horarioFoot}>🔴/🔥 = ventana donde se crean los APEX del día.</Text>

      {/* Micro-horario: cada video a su hora exacta dentro del DEEP PRIME */}
      {micro.length > 0 && (
        <View style={styles.microWrap}>
          <Text style={styles.microTitle}>⏱ Minuto a minuto — NÚCLEO DEEP PRIME ({apexBlock?.hora})</Text>
          {micro.map((mm, i) => (
            <View key={i} style={styles.microRow}>
              <Text style={styles.microTime}>{mm.time}</Text>
              <Text style={styles.microLabel} numberOfLines={2}>
                🎬 {mm.label} ({mm.dur}'){mm.locked ? ' · 🔒 usar Theomed/Drive' : ''}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Google Calendar en vivo (minuto a minuto) */}
      <Text style={styles.calTitle}>📆 Tu Google Calendar (en vivo)</Text>
      <Text style={styles.calHint}>Sincronizado minuto a minuto. Si no carga, iniciá sesión en Google en este navegador.</Text>
      <EncapsWebView
        url={GCAL_EMBED_URL}
        title="📆 Google Calendar"
        subtitle="Tu agenda ENCAPS del día, minuto a minuto."
        height={620}
      />
    </View>
  );
}

// ─── átomos ───
function Pill({ text, color }: { text: string; color: string }) {
  return (
    <View style={[styles.pill, { backgroundColor: color + '22' }]}>
      <Text style={[styles.pillText, { color }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subTabRow: { flexDirection: 'row', backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: 3, marginBottom: Spacing.section },
  subTab: { flex: 1, paddingVertical: Spacing.sm, alignItems: 'center', borderRadius: BorderRadius.sm },
  subTabActive: { backgroundColor: Colors.surfaceContainerHighest },
  subTabText: { fontSize: FontSize.labelSm, fontWeight: '600', color: Colors.muted },
  subTabTextActive: { color: Colors.onSurface },

  empty: { fontSize: FontSize.bodyMd, color: Colors.muted, fontStyle: 'italic', paddingVertical: Spacing.lg, textAlign: 'center' },
  note: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: Spacing.sm, lineHeight: 16 },
  sectionSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.md, fontStyle: 'italic' },

  // HOY header
  hoyHeader: { marginBottom: Spacing.md },
  hoyDay: { fontSize: FontSize.labelSm, color: Colors.muted, fontWeight: '600', letterSpacing: 0.5 },
  hoyTema: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.onSurface, marginTop: 2 },
  hoyMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: Spacing.sm },
  ntsLine: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: Spacing.sm, lineHeight: 16 },

  pill: { borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 8 },
  pillText: { fontSize: FontSize.labelSm, fontWeight: '700' },

  progressCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.md },
  progressLabel: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, fontWeight: '600' },
  progressValue: { fontSize: FontSize.titleMd, fontWeight: '800' },

  track: { height: 8, backgroundColor: Colors.surfaceContainerHighest, borderRadius: 4, overflow: 'hidden', flex: 1 },
  fill: { height: 8, borderRadius: 4 },

  checkRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, marginBottom: 6 },
  checkTouch: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: Colors.muted, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  checkboxOn: { backgroundColor: Colors.green, borderColor: Colors.green },
  checkMark: { color: '#0B1628', fontSize: 14, fontWeight: '900' },
  checkLabel: { fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '500' },
  checkLabelDone: { color: Colors.muted, textDecorationLine: 'line-through' },
  checkSubRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 1 },
  checkDetail: { fontSize: FontSize.labelSm, color: Colors.muted },
  estadoBadge: { fontSize: 9, fontWeight: '800', paddingVertical: 1, paddingHorizontal: 6, borderRadius: 999, overflow: 'hidden' },
  openBtn: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: BorderRadius.sm, backgroundColor: Colors.surfaceContainerHighest, marginLeft: Spacing.sm },
  openBtnText: { fontSize: FontSize.labelSm, color: Colors.blue, fontWeight: '700' },

  // Meta
  metaCard: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.md, alignItems: 'center' },
  metaTitle: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, fontWeight: '600' },
  metaBig: { fontSize: FontSize.displaySm, fontWeight: '900', marginTop: 4 },
  metaBigSub: { fontSize: FontSize.titleMd, color: Colors.muted, fontWeight: '700' },
  metaTrackWrap: { width: '100%', marginTop: Spacing.md, position: 'relative', flexDirection: 'row' },
  metaMarker: { position: 'absolute', top: -3, width: 2, height: 14, backgroundColor: Colors.green },
  metaHint: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm },

  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  statCell: { width: '31%', backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, paddingVertical: Spacing.md, paddingHorizontal: Spacing.sm, alignItems: 'center', flexGrow: 1 },
  statValue: { fontSize: FontSize.titleMd, fontWeight: '800' },
  statLabel: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2 },

  // Sim
  simCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: 6, borderLeftWidth: 4 },
  simClave: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  simMeta: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1 },
  simLink: { fontSize: FontSize.labelSm, color: Colors.blue, fontWeight: '700', marginTop: 2 },
  simInput: { width: 46, height: 34, backgroundColor: Colors.surfaceContainerHighest, borderRadius: BorderRadius.sm, color: Colors.onSurface, textAlign: 'center', fontSize: FontSize.bodyMd, fontWeight: '700', paddingVertical: 0, ...(Platform.OS === 'web' ? { outlineStyle: 'none' as any } : {}) },
  simSlash: { fontSize: FontSize.labelSm, color: Colors.muted, marginLeft: 2 },
  simBadge: { fontSize: FontSize.labelSm, fontWeight: '800', marginTop: 2 },

  // 7 días
  semRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: 6 },
  semRowToday: { borderWidth: 1, borderColor: Colors.coral + '80' },
  semDayBox: { width: 44, alignItems: 'center', marginRight: Spacing.md },
  semDayNum: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface },
  semWeekday: { fontSize: FontSize.labelSm, color: Colors.muted },
  semTema: { fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '500' },
  semDetail: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1 },
  semCrit: { fontSize: 9, fontWeight: '800', color: Colors.coral, backgroundColor: Colors.coral + '22', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 999, marginLeft: Spacing.sm },

  // Horario
  horarioHint: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, fontWeight: '600', marginBottom: Spacing.sm },
  horarioWarn: { fontSize: FontSize.labelSm, color: Colors.amber, marginBottom: Spacing.sm, lineHeight: 15 },
  horarioRow: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, marginBottom: 6 },
  horarioRowApex: { borderLeftWidth: 3, borderLeftColor: Colors.coral },
  horarioHora: { width: 92, fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.teal },
  horarioTitulo: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurface, lineHeight: 16 },
  horarioFoot: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, fontStyle: 'italic' },
  horarioTema: { fontSize: FontSize.labelSm, color: Colors.coral, fontWeight: '700', marginTop: 2 },
  calTitle: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.onSurface, marginTop: Spacing.lg, marginBottom: 2 },
  calHint: { fontSize: FontSize.labelSm, color: Colors.muted, marginBottom: Spacing.sm },

  // Grupos HOY (tema vs cola) + tags de tema/vuelta
  groupHdr: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, marginTop: Spacing.md, marginBottom: 2 },
  groupHint: { fontSize: FontSize.labelSm, color: Colors.muted, marginBottom: Spacing.sm, lineHeight: 15 },
  themeTag: { fontSize: 9, fontWeight: '800', paddingVertical: 1, paddingHorizontal: 6, borderRadius: 999, overflow: 'hidden' },
  themeTagOwn: { color: Colors.coral, backgroundColor: Colors.coral + '22' },
  themeTagOther: { color: Colors.muted, backgroundColor: Colors.muted + '22' },
  vueltaTag: { fontSize: 9, fontWeight: '800', color: Colors.purple, backgroundColor: Colors.purple + '22', paddingVertical: 1, paddingHorizontal: 6, borderRadius: 999, overflow: 'hidden' },

  // Micro-horario (videos mapeados a horas exactas dentro del bloque deep-prime)
  microWrap: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md, marginTop: Spacing.sm, borderLeftWidth: 3, borderLeftColor: Colors.coral },
  microTitle: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface, marginBottom: Spacing.xs },
  microRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 3 },
  microTime: { width: 72, fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.coral },
  microLabel: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },

  // CheckRow extras
  srcTag: { fontSize: 9, fontWeight: '800', color: Colors.teal, backgroundColor: Colors.teal + '1F', paddingVertical: 1, paddingHorizontal: 6, borderRadius: 999, overflow: 'hidden' },
  lockHint: { fontSize: FontSize.labelSm, color: Colors.amber, marginTop: 3, lineHeight: 14 },
  fallbackLink: { fontSize: FontSize.labelSm, color: Colors.blue, fontWeight: '700', marginTop: 2 },
  linkCol: { alignItems: 'flex-end', marginLeft: Spacing.sm },
  pdfBtn: { marginTop: 4, backgroundColor: Colors.blue + '22' },

  // Cajas de referencia (NTS / Material)
  refBox: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md, marginTop: Spacing.sm, borderLeftWidth: 3, borderLeftColor: Colors.teal },
  refTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, marginBottom: 4 },
  refBody: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17 },
  refWhere: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, fontStyle: 'italic' },
  matLink: { fontSize: FontSize.labelMd, color: Colors.blue, marginTop: 4, lineHeight: 17 },
});
