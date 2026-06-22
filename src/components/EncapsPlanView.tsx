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
  useEncapsPlan, itemsForDay, vueltaLabel, repasoKey, vueltasHechasDe,
  type PlanItem, type StudyScheduleDay, type StudyMetrics, type ProximoVideo,
} from '../lib/encapsPlan';
import EncapsWebView from './EncapsWebView';
import { encapsObsByTitle, encapsMatch } from '../lib/obsidianEncaps';
import { ANKIWEB } from '../lib/ankiLinks';
import { ENCAPS_FICHAS_MINSA, ENCAPS_ACADEMIAS_RESPALDO, ENCAPS_THEOMED_SIMULACROS, ENCAPS_QX_ACCESOS, ENCAPS_FUENTES_META, ENCAPS_THEOMED_AREA, ENCAPS_THEOMED_EXTRA } from '../lib/encapsFuentes';

// Google Calendar del usuario (día) embebido — sincronización minuto a minuto.
// Requiere sesión Google del navegador (calendario privado). ctz Lima.
const GCAL_EMBED_URL =
  'https://calendar.google.com/calendar/embed?src=josephsototocas%40gmail.com&ctz=America%2FLima&mode=DAY&showTitle=0&showPrint=0&showCalendars=0&showTabs=0';

type Sub = 'hoy' | 'meta' | 'sim' | 'sem' | 'horario' | 'material';

interface HorarioPaso { t: string; d: string }
interface HorarioFuente { label: string; url?: string | null }
interface HorarioBlock { hora: string; titulo: string; apex?: boolean; pasos?: HorarioPaso[]; fuente?: HorarioFuente | null }

const KIND_ICON: Record<PlanItem['kind'], string> = {
  video: '🎬', theomed: '📂', pulso: '💓', eval: '📝', sim: '🔥', material: '📎',
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
  const [jumpOpen, setJumpOpen] = useState(false);
  const [jumpVal, setJumpVal] = useState('');
  const doJump = (raw: string) => {
    const n = parseInt(String(raw).replace(/[^0-9]/g, ''), 10);
    if (!isNaN(n)) plan.setDia(Math.max(1, Math.min(plan.total, n)));
    setJumpOpen(false); setJumpVal('');
  };

  const subTabs: { key: Sub; label: string }[] = [
    { key: 'hoy', label: '📅 HOY' },
    { key: 'horario', label: '⏰ Horario' },
    { key: 'meta', label: '🎯 17/20' },
    { key: 'sim', label: '🔥 Sim' },
    { key: 'sem', label: '🗓️ 7d' },
    { key: 'material', label: '📚 Material' },
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
      {/* Navegación por día — ver el plan completo de cualquier día (D1..71) */}
      <View style={styles.dayNav}>
        <TouchableOpacity onPress={() => plan.setDia(plan.dia - 1)} disabled={plan.dia <= 1} style={styles.dayNavBtn}>
          <Text style={[styles.dayNavArrow, plan.dia <= 1 && { opacity: 0.25 }]}>◀</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => setJumpOpen(o => !o)} activeOpacity={0.7}>
          <Text style={styles.dayNavTitle}>
            Día {plan.dia}/{plan.total}{plan.dia === plan.hoyDia ? ' · HOY' : ''} {jumpOpen ? '▴' : '▾'}
          </Text>
          {!!plan.today?.fecha && (
            <Text style={styles.dayNavSub}>{plan.today.weekday || ''} {String(plan.today.fecha).slice(5)}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => plan.setDia(plan.dia + 1)} disabled={plan.dia >= plan.total} style={styles.dayNavBtn}>
          <Text style={[styles.dayNavArrow, plan.dia >= plan.total && { opacity: 0.25 }]}>▶</Text>
        </TouchableOpacity>
        {plan.dia !== plan.hoyDia && (
          <TouchableOpacity onPress={() => plan.setDia(plan.hoyDia)} style={styles.dayNavHoy}>
            <Text style={styles.dayNavHoyText}>↺ Hoy</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Selector de día directo — saltar a cualquier día (1..71) */}
      {jumpOpen && (
        <View style={styles.jumpRow}>
          <Text style={styles.jumpLabel}>Ir al día:</Text>
          <TextInput
            style={styles.jumpInput} value={jumpVal} onChangeText={setJumpVal}
            keyboardType="number-pad" placeholder={`1–${plan.total}`} placeholderTextColor={Colors.muted}
            onSubmitEditing={() => doJump(jumpVal)} autoFocus maxLength={2} returnKeyType="go"
          />
          <TouchableOpacity style={styles.jumpGo} onPress={() => doJump(jumpVal)} activeOpacity={0.7}>
            <Text style={styles.jumpGoText}>Ir ›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.jumpChip} onPress={() => doJump('1')}><Text style={styles.jumpChipText}>D1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.jumpChip} onPress={() => doJump(String(plan.hoyDia))}><Text style={styles.jumpChipText}>Hoy</Text></TouchableOpacity>
          <TouchableOpacity style={styles.jumpChip} onPress={() => doJump(String(plan.total))}><Text style={styles.jumpChipText}>D{plan.total}</Text></TouchableOpacity>
        </View>
      )}

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
      {sub === 'sem' && <SemView days={plan.days} dia={plan.dia} proximos={plan.proximos} metrics={plan.metrics} onOpenDay={(dn) => { plan.setDia(dn); setSub('hoy'); }} />}
      {sub === 'material' && <MaterialView />}
    </View>
  );
}

// ─── MATERIAL — todo el material ENCAPS con link directo (verificado en vivo 19-jun) ───
function MaterialView() {
  const areas = [...new Set(ENCAPS_FICHAS_MINSA.map((f) => f.area))];
  const [openArea, setOpenArea] = useState<string | null>(null);
  const H = (t: string) => <Text style={{ fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: Spacing.lg, marginBottom: Spacing.sm }}>{t}</Text>;
  const Link = ({ n, url }: { n: string; url: string }) => (
    <TouchableOpacity onPress={() => Linking.openURL(url).catch(() => {})} activeOpacity={0.7} style={{ paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
      <Text style={{ fontSize: FontSize.bodyMd, color: Colors.blue }} numberOfLines={2}>{n} ↗</Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <Text style={{ fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 17, marginBottom: Spacing.sm }}>
        Material verificado EN VIVO (19-jun) con link directo — para no buscar. Cobertura 100% para ≥17/20: si falta un video en QxMedic, está en DR LOPEZ/GALENO; más simulacros en VILLAMEDIC/DR LOPEZ.
      </Text>
      {H('🔵 QxMedic — accesos')}
      {ENCAPS_QX_ACCESOS.map((x, i) => <Link key={'q' + i} n={x.n} url={x.url} />)}
      {H(`📄 Fichas técnicas del MINSA (${ENCAPS_FUENTES_META.fichasMinsa}) · QxMedic biblioteca`)}
      {areas.map((area) => {
        const fis = ENCAPS_FICHAS_MINSA.filter((f) => f.area === area);
        const open = openArea === area;
        return (
          <View key={area} style={{ marginBottom: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: BorderRadius.md, padding: Spacing.sm }}>
            <TouchableOpacity onPress={() => setOpenArea(open ? null : area)} activeOpacity={0.8} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface }}>{area} · {fis.length} fichas</Text>
              <Text style={{ color: Colors.blue, fontWeight: '800' }}>{open ? '−' : '+'}</Text>
            </TouchableOpacity>
            {open && fis.map((f, i) => <Link key={i} n={f.titulo} url={f.url} />)}
          </View>
        );
      })}
      {H(`📝 Simulacros Theomed (${ENCAPS_THEOMED_SIMULACROS.length}) — URL exacta del cuestionario`)}
      {ENCAPS_THEOMED_SIMULACROS.map((x, i) => <Link key={'t' + i} n={x.n} url={x.url} />)}

      {H('📂 Theomed por área (sesiones + PPTs + POSTESTS + repasos · incl. lo que libere por vueltas)')}
      {Object.entries(ENCAPS_THEOMED_AREA).map(([area, v], i) => <Link key={'ta' + i} n={`${area} (${v.n} recursos)`} url={v.url} />)}
      {ENCAPS_THEOMED_EXTRA.map((x, i) => <Link key={'te' + i} n={x.n} url={x.url} />)}
      {H('🎒 Academias de respaldo (Drive) — si falta video/sim/ficha en QX/Theomed')}
      {ENCAPS_ACADEMIAS_RESPALDO.map((a, i) => (
        <View key={i} style={{ marginBottom: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: BorderRadius.md, padding: Spacing.sm }}>
          <TouchableOpacity onPress={() => Linking.openURL(a.url).catch(() => {})} activeOpacity={0.8}>
            <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface }}>{a.nombre} — {a.tag} ↗</Text>
          </TouchableOpacity>
          {a.carpetas.map((c, j) => <Link key={j} n={c.n} url={c.url} />)}
        </View>
      ))}
    </View>
  );
}

// ─── HOY ───
function HoyView({ plan }: { plan: ReturnType<typeof useEncapsPlan> }) {
  const { today, dia, total, metrics, todayItems, doneToday, totalToday, checks, toggleCheck, repasos } = plan;
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
          <TouchableOpacity activeOpacity={0.8}
            onPress={() => Linking.openURL(encapsObsByTitle(today.subtema || tema, today.codigo || undefined)).catch(() => {})}
            style={{ borderWidth: 1, borderColor: '#A78BFA99', backgroundColor: '#A78BFA1F', borderRadius: 999, paddingVertical: 2, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 11, fontWeight: '800', color: '#A78BFA' }}>◆ Obsidian</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}
            onPress={() => Linking.openURL(ANKIWEB).catch(() => {})}
            style={{ borderWidth: 1, borderColor: '#5BA8C999', backgroundColor: '#5BA8C91F', borderRadius: 999, paddingVertical: 2, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 11, fontWeight: '800', color: '#5BA8C9' }}>🃏 {(() => { const m = encapsMatch(today.subtema || tema, today.codigo || undefined); return m ? `Anki · ${m.id.slice(0, 2)}` : 'Anki'; })()}</Text>
          </TouchableOpacity>
        </View>
        {!!today.nts && <Text style={styles.ntsLine}>📋 NTS Tier-1: {today.nts}</Text>}
        {!!today.temas_secundarios?.length && (
          <Text style={styles.secLine}>➕ Tema liviano extra: {today.temas_secundarios.map(s => `${s.codigo} ${s.subtema}`).join(' · ')}</Text>
        )}
        {!!today.primer_finde_estudio && (
          <Text style={styles.findeStudyLine}>📚 Fin de semana de ESTUDIO (aún no hay examen — tu 1er examen es el 2º finde)</Text>
        )}
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

      {/* Repasos espaciados de hoy (repetición espaciada por tema) */}
      {repasos.length > 0 ? (
        <View style={styles.repasoBox}>
          <Text style={styles.repasoTitle}>🔁 Repasos espaciados de hoy ({repasos.length})</Text>
          <Text style={styles.repasoHint}>Bloque 07:15 — Anki + mapa en blanco (free recall). Tocá para marcar la vuelta hecha. Vueltas por prioridad: CRÍT 6 · ALTA 5 · MEDIA 4 · BAJA 3.</Text>
          {repasos.map(r => {
            const key = repasoKey(r.codigo, r.vuelta);
            const done = !!checks[key];
            const vh = vueltasHechasDe(r.codigo, r.prioridad, r.focusDia, dia, checks);
            return (
              <TouchableOpacity key={r.codigo} style={styles.repasoRow} onPress={() => toggleCheck(key, !done)} activeOpacity={0.7}>
                <Text style={[styles.repasoCheck, done && styles.repasoCheckOn]}>{done ? '☑' : '☐'}</Text>
                <Text style={styles.repasoVuelta}>{vueltaLabel(r.vuelta)}/{r.totalVueltas}</Text>
                <Text style={styles.repasoTema} numberOfLines={1}>{r.codigo} {r.subtema}</Text>
                <Text style={styles.repasoAgo}>✓{vh.hechas}/{vh.total} · {r.delta}d</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <Text style={styles.repasoEmpty}>🔁 Sin repasos espaciados hoy (D{dia}). Los temas vistos reaparecen a D+1/3/7/14/28…</Text>
      )}

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

      {/* (Las fichas QX MINSA + carpetas Theomed + acceso por área + material Drive son ahora ítems
          chequeables con HORA y ◆ Obs dentro de "Material del tema + práctica" — ver itemsForDay) */}
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
            {!!item.hora && <Text style={styles.horaTag}>🕘 {item.hora}</Text>}
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
                <TouchableOpacity onPress={() => Linking.openURL(item.fallbackUrl as string).catch(() => {})} activeOpacity={0.7}>
                  <Text style={styles.fallbackLink}>{item.fallbackLabel || 'Drive 2026-1'} ↗</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.linkCol}>
        {item.url ? (
          <TouchableOpacity onPress={() => Linking.openURL(item.url as string).catch(() => {})} style={styles.openBtn}>
            <Text style={styles.openBtnText}>{item.kind === 'video' ? '▶ ver' : 'abrir ↗'}</Text>
          </TouchableOpacity>
        ) : null}
        {!!item.slides && (
          <TouchableOpacity onPress={() => Linking.openURL(item.slides as string).catch(() => {})} style={[styles.openBtn, styles.pdfBtn]}>
            <Text style={[styles.openBtnText, { color: Colors.blue }]}>PDF</Text>
          </TouchableOpacity>
        )}
        {(item.kind === 'video' || item.kind === 'theomed' || item.kind === 'material') && (
          <TouchableOpacity
            onPress={() => Linking.openURL(encapsObsByTitle(item.label, item.code)).catch(() => {})}
            style={[styles.openBtn, { borderColor: '#A78BFA66', backgroundColor: '#A78BFA14' }]}>
            <Text style={[styles.openBtnText, { color: '#A78BFA' }]}>◆ Obs</Text>
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

      <Text style={styles.sectionSub}>{simDays.reduce((n, d) => n + (Array.isArray((d.extra as any)?.sims) ? (d.extra as any).sims.length : 1), 0)} simulacros programados · cargá las notas en la pestaña 🔥 Simulacros.</Text>
    </View>
  );
}

// ─── Simulacros ───
function SimView({ plan }: { plan: ReturnType<typeof useEncapsPlan> }) {
  const { simDays, simScores, saveSim } = plan;
  if (simDays.length === 0) return <Text style={styles.empty}>Sin simulacros en el cronograma.</Text>;
  // Cada día-sim agrupa 2-9 sub-simulacros REALES en extra.sims (n global 1..35, fuente QX/Theomed).
  // Iteramos las sub-sims (no los días) para que Joseph pueda cargar la nota de los 35, no solo de 10.
  const rows = simDays.flatMap(d => {
    const arr = Array.isArray((d.extra as any)?.sims) ? (d.extra as any).sims as any[] : null;
    if (arr && arr.length) {
      return arr.map((ss: any) => ({ d, simN: ss.n as number, clave: ss.fuente || ss.label || `Sim ${ss.n}`, duracion: ss.duracion as string | undefined, url: ss.url as string | undefined }));
    }
    const s = d.simulacro!;
    const simN = s.simulacro_n ?? d.dia;
    return [{ d, simN, clave: s.clave || s.label || `Sim ${simN}`, duracion: s.duracion, url: s.theomed_bank?.url }];
  });
  const conNota = rows.filter(r => simScores[r.simN]?.nota != null).length;
  return (
    <View>
      <View style={styles.simHeaderBox}>
        <Text style={styles.simHeaderTitle}>{rows.length} simulacros · {conNota} con nota · meta ≥17/20</Text>
        <Text style={styles.simHeaderHint}>
          Reales de QxMedic + Theomed, en los sábados (2-3 c/u) + recta final del día-examen. 1er sábado de simulacros: {simDays[0]?.fecha?.slice(5) || '—'}; examen jue 20-ago.
          Cargá tu nota /20 al terminar cada uno (se guarda y alimenta «Camino a 17/20» + Telegram).
        </Text>
      </View>
      {rows.map(r => (
        <SimRow
          key={`${r.d.dia}:${r.simN}`}
          dia={r.d.dia}
          weekday={r.d.weekday}
          fecha={r.d.fecha}
          clave={r.clave}
          duracion={r.duracion}
          url={r.url}
          nota={simScores[r.simN]?.nota ?? null}
          onSave={(nota) => saveSim(r.simN, nota, r.d.fecha)}
        />
      ))}
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
          <TouchableOpacity onPress={() => Linking.openURL(url).catch(() => {})}>
            <Text style={styles.simLink}>banco ↗</Text>
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
interface TheomedVid { tipo: string; sesion: number; dur?: number; fecha?: string; titulo?: string; vimeo_id?: string }
interface TheomedBloque { bloque: string; section_async?: number; section_live?: number; videos: TheomedVid[] }

function TheomedBlockRow({ b, base }: { b: TheomedBloque; base: string }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.thBlock}>
      <TouchableOpacity onPress={() => setOpen(o => !o)} activeOpacity={0.7}>
        <Text style={styles.thBlockTitle}>{b.bloque} ({b.videos.length}) {open ? '▾' : '▸'}</Text>
      </TouchableOpacity>
      {open && b.videos.map((v, i) => {
        const sec = v.tipo === 'live' ? b.section_live : b.section_async;
        const url = `${base}${sec}`;
        return (
          <TouchableOpacity key={i} style={styles.thVideoRow} onPress={() => Linking.openURL(url)} activeOpacity={0.7}>
            <Text style={styles.thVideoLabel} numberOfLines={1}>
              🎬 {v.titulo || `${v.tipo === 'live' ? 'En vivo' : 'Async'} S${v.sesion}`}{v.dur ? ` · ${v.dur}min` : ''}{v.fecha ? ` · ${v.fecha.slice(5)}` : ''}
            </Text>
            <Text style={styles.thOpen}>abrir ↗</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function SemView({ days, dia, proximos, metrics, onOpenDay }: { days: StudyScheduleDay[]; dia: number; proximos: ProximoVideo[]; metrics: StudyMetrics | null; onOpenDay: (dia: number) => void }) {
  const next = days.filter(d => d.dia >= dia && d.dia < dia + 7);
  const ex = (metrics?.extra as Record<string, unknown> | undefined) || {};
  const thBloques = (ex.theomed_videos as TheomedBloque[] | undefined) || [];
  const thPend = (ex.theomed_pendientes as { bloque: string; tipo: string; sesion: number; nota?: string }[] | undefined) || [];
  const thBase = (ex.theomed_section_base as string | undefined) || 'https://campus.academiatheomed.com/course/view.php?id=73&section=';
  const thTotal = thBloques.reduce((n, b) => n + (b.videos?.length || 0), 0);
  return (
    <View>
      {next.length === 0 ? (
        <Text style={styles.empty}>Sin próximos días.</Text>
      ) : next.map(d => {
        const isToday = d.dia === dia;
        const tema = `${d.codigo || ''} ${d.subtema || ''}`.trim() || (d.extra?.theme as string) || d.tipo || '—';
        return (
          <TouchableOpacity key={d.dia} style={[styles.semRow, isToday && styles.semRowToday]}
            onPress={() => onOpenDay(d.dia)} activeOpacity={0.6}>
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
            <Text style={styles.semChevron}>ver ›</Text>
          </TouchableOpacity>
        );
      })}

      {/* Predicción: próximos videos QX a liberar (drip semanal) */}
      {proximos.length > 0 && (
        <View style={styles.proxBox}>
          <Text style={styles.proxTitle}>📅 Próximos videos QX a liberar ({proximos.length})</Text>
          <Text style={styles.proxHint}>QX sube por goteo (semanal); se publican en su fecha. El link aparece al liberarse.</Text>
          {proximos.map((p, i) => (
            <View key={i} style={styles.proxRow}>
              <Text style={styles.proxFecha}>{String(p.unlock).slice(5)}</Text>
              <Text style={styles.proxTema} numberOfLines={1}>{p.code ? `[${p.code}] ` : ''}{p.titulo}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Videos Theomed (sesiones grabadas Vimeo) */}
      {thBloques.length > 0 && (
        <View style={styles.thBox}>
          <Text style={styles.thTitle}>🎥 Videos Theomed ({thTotal})</Text>
          <Text style={styles.proxHint}>Sesiones grabadas (Vimeo). Tocá un bloque para ver y abrir en Theomed.</Text>
          {thPend.length > 0 && (
            <Text style={styles.thPend}>⏳ Por subir: {thPend[0].bloque} · {thPend[0].tipo} S{thPend[0].sesion} (sube el día después de la clase)</Text>
          )}
          {thBloques.map((b, i) => <TheomedBlockRow key={i} b={b} base={thBase} />)}
        </View>
      )}
    </View>
  );
}

// ─── Horario (bloques del día, leídos de Google Calendar vía sync) ───
function HorarioBlockRow({ b, tema }: { b: HorarioBlock; tema?: string }) {
  const [open, setOpen] = useState(!!b.apex); // deep-prime arranca abierto
  const hasDetail = (b.pasos && b.pasos.length > 0) || !!b.fuente;
  return (
    <View style={[styles.horarioRow, b.apex && styles.horarioRowApex]}>
      <TouchableOpacity
        style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-start' }}
        onPress={() => hasDetail && setOpen(o => !o)}
        activeOpacity={hasDetail ? 0.7 : 1}
      >
        <Text style={[styles.horarioHora, b.apex && { color: Colors.coral }]}>{b.hora}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.horarioTitulo} numberOfLines={2}>
            {b.titulo}{hasDetail ? (open ? '  ▾' : '  ▸') : ''}
          </Text>
          {b.apex && !!tema && <Text style={styles.horarioTema}>→ HOY: {tema}</Text>}
          {!!b.fuente && <Text style={styles.horarioFuente}>📍 {b.fuente.label}</Text>}
          {open && (b.pasos || []).map((p, i) => (
            <View key={i} style={styles.pasoRow}>
              <Text style={styles.pasoT}>{p.t}</Text>
              <Text style={styles.pasoD}>{p.d}</Text>
            </View>
          ))}
          {open && !!b.fuente?.url && (
            <TouchableOpacity onPress={() => Linking.openURL(b.fuente!.url as string)} activeOpacity={0.7}>
              <Text style={styles.fuenteLink}>Abrir {b.fuente.label} ↗</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

function HorarioView({ plan }: { plan: ReturnType<typeof useEncapsPlan> }) {
  const { today, metrics } = plan;
  const horarios = (metrics?.extra as Record<string, unknown> | undefined)?.horarios as
    | { weekday?: HorarioBlock[]; weekend?: HorarioBlock[] }
    | undefined;
  // Plantilla por TIPO de día (no por día de semana): simulacro real → weekend; si no → deep-prime L-V.
  // Hoy/mañana (D1/D2) son fin de semana pero se estructuran como L-V (recuperación; 1er simulacro D8).
  const dow = today?.fecha ? new Date(`${today.fecha}T12:00:00`).getDay() : 1;
  const isWeekendDay = dow === 0 || dow === 6;
  const useSimTemplate = !!today?.simulacro;
  const blocks = (useSimTemplate ? horarios?.weekend : horarios?.weekday) ?? [];

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
        {useSimTemplate ? '🔥 Día de simulacro (modo examen)' : '🟢 Estructura deep-prime (Lunes-Viernes)'}
      </Text>
      {isWeekendDay && !useSimTemplate && (
        <Text style={styles.horarioWarn}>
          ℹ️ Hoy es fin de semana pero se estructura como L-V (recuperación de temas). El 1er simulacro es D8 (sáb 13 jun); desde ahí, sábados y domingos = simulacro.
        </Text>
      )}
      {blocks.length === 0 ? (
        <Text style={styles.empty}>Sin bloques cargados. Corré el sync.</Text>
      ) : blocks.map((b, i) => (
        <HorarioBlockRow key={i} b={b} tema={tema} />
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
  dayNav: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, marginBottom: Spacing.sm },
  dayNavBtn: { paddingHorizontal: Spacing.md, paddingVertical: 2 },
  dayNavArrow: { fontSize: 18, color: Colors.teal, fontWeight: '800' },
  dayNavTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface },
  dayNavSub: { fontSize: FontSize.labelSm, color: Colors.muted },
  dayNavHoy: { backgroundColor: Colors.teal + '22', borderRadius: BorderRadius.full, paddingVertical: 3, paddingHorizontal: 8, marginLeft: Spacing.sm },
  dayNavHoyText: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.teal },
  jumpRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6, backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.sm, marginBottom: Spacing.sm },
  jumpLabel: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.onSurfaceVariant },
  jumpInput: { width: 56, backgroundColor: Colors.surfaceContainerHighest, borderRadius: BorderRadius.sm, paddingVertical: 6, paddingHorizontal: 10, color: Colors.onSurface, fontSize: FontSize.bodyMd, fontWeight: '800', textAlign: 'center' },
  jumpGo: { backgroundColor: Colors.teal, borderRadius: BorderRadius.sm, paddingVertical: 6, paddingHorizontal: 12 },
  jumpGoText: { fontSize: FontSize.labelMd, fontWeight: '800', color: '#04201c' },
  jumpChip: { backgroundColor: Colors.surfaceContainerHighest, borderRadius: BorderRadius.full, paddingVertical: 5, paddingHorizontal: 11 },
  jumpChipText: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.onSurfaceVariant },

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
  secLine: { fontSize: FontSize.labelSm, color: Colors.teal, marginTop: 4, lineHeight: 16 },
  findeStudyLine: { fontSize: FontSize.labelSm, color: Colors.amber, marginTop: 4, fontWeight: '700', lineHeight: 16 },

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
  simHeaderBox: { backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.sm, borderLeftWidth: 3, borderLeftColor: Colors.coral },
  simHeaderTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface },
  simHeaderHint: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2, lineHeight: 15 },
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
  semChevron: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.teal, marginLeft: Spacing.sm },

  // Próximos videos a liberar (predicción drip)
  proxBox: { backgroundColor: Colors.blue + '12', borderRadius: BorderRadius.md, padding: Spacing.md, marginTop: Spacing.md, borderLeftWidth: 3, borderLeftColor: Colors.blue },
  proxTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.blue },
  proxHint: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1, marginBottom: Spacing.xs },
  proxRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 3 },
  proxFecha: { width: 52, fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.blue },
  proxTema: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },

  // Videos Theomed
  thBox: { backgroundColor: Colors.green + '12', borderRadius: BorderRadius.md, padding: Spacing.md, marginTop: Spacing.md, borderLeftWidth: 3, borderLeftColor: Colors.green },
  thTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.green },
  thPend: { fontSize: FontSize.labelSm, color: Colors.amber, marginTop: 2, marginBottom: 2, lineHeight: 15 },
  thBlock: { marginTop: Spacing.xs, borderTopWidth: 1, borderTopColor: 'rgba(143,144,151,0.12)', paddingTop: Spacing.xs },
  thBlockTitle: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.onSurface },
  thVideoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3, paddingLeft: Spacing.sm },
  thVideoLabel: { flex: 1, fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant },
  thOpen: { fontSize: FontSize.labelSm, color: Colors.blue, fontWeight: '700', marginLeft: Spacing.sm },

  // Horario
  horarioHint: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, fontWeight: '600', marginBottom: Spacing.sm },
  horarioWarn: { fontSize: FontSize.labelSm, color: Colors.amber, marginBottom: Spacing.sm, lineHeight: 15 },
  horarioRow: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: Colors.surfaceContainerLow, borderRadius: BorderRadius.md, paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, marginBottom: 6 },
  horarioRowApex: { borderLeftWidth: 3, borderLeftColor: Colors.coral },
  horarioHora: { width: 92, fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.teal },
  horarioTitulo: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurface, lineHeight: 16 },
  horarioFoot: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, fontStyle: 'italic' },
  horarioTema: { fontSize: FontSize.labelSm, color: Colors.coral, fontWeight: '700', marginTop: 2 },
  horarioFuente: { fontSize: FontSize.labelSm, color: Colors.teal, fontWeight: '600', marginTop: 2 },
  pasoRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 4 },
  pasoT: { width: 92, fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.onSurfaceVariant },
  pasoD: { flex: 1, fontSize: FontSize.labelSm, color: Colors.muted, lineHeight: 15 },
  fuenteLink: { fontSize: FontSize.labelSm, color: Colors.blue, fontWeight: '700', marginTop: 6 },
  calTitle: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.onSurface, marginTop: Spacing.lg, marginBottom: 2 },
  calHint: { fontSize: FontSize.labelSm, color: Colors.muted, marginBottom: Spacing.sm },

  // Grupos HOY (tema vs cola) + tags de tema/vuelta
  // Repasos espaciados (tracker de vueltas)
  repasoBox: { backgroundColor: Colors.purple + '14', borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.sm, borderLeftWidth: 3, borderLeftColor: Colors.purple },
  repasoTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.purple },
  repasoHint: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1, marginBottom: Spacing.xs },
  repasoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 3 },
  repasoCheck: { width: 22, fontSize: FontSize.bodyMd, color: Colors.muted },
  repasoCheckOn: { color: '#16a34a' },
  repasoVuelta: { width: 48, fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.purple },
  repasoTema: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurface },
  repasoAgo: { fontSize: FontSize.labelSm, color: Colors.muted, marginLeft: Spacing.sm },
  repasoEmpty: { fontSize: FontSize.labelSm, color: Colors.muted, fontStyle: 'italic', marginBottom: Spacing.sm },

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
  horaTag: { fontSize: 9, fontWeight: '800', color: Colors.coral, backgroundColor: Colors.coral + '22', paddingVertical: 1, paddingHorizontal: 6, borderRadius: 999, overflow: 'hidden' },
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
