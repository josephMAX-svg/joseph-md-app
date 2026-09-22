import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform, TextInput } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, gridStyle, gridItemStyle, useHover } from '../empresa/primitives';
import { RingStat, FadeUp } from '../empresa/visuals';
import {
  USMLE_META, USMLE_KPIS, USMLE_SYSTEMS, USMLE_DISCIPLINES, PALMERTON_WHO, PALMERTON_HONESTY,
  PALMERTON_METHOD, PALMERTON_SYSTEMS, USMLE_RAMP, USMLE_HOUR, USMLE_QBANK_RULES, USMLE_RESOURCES,
  USMLE_STEP2_RESOURCES, USMLE_CHECKPOINTS, USMLE_READINESS, FIRST_AID_INDEX, SKETCHY_SYMBOLS,
  PRIORIDAD_COLOR, VUELTAS, ANKI_CONFIG_PALMERTON, USMLE_RAMP_LEGACY, USMLE_LEGACY_NOTA,
} from '../../lib/usmleData';
import { DIAS, USMLE_NIVELES, USMLE_GATE, USMLE_TAPER, DAILY_META, PROTOCOLO_BLOQUE, DAY_AFTER } from '../../lib/usmleStep1Daily';
import { planHoyD, progresoGlobal, loadDone } from '../../lib/studyProgress';
import {
  UsmleScore, loadScores, pullScores, onScoresChange, mediaMovil7d, distanciaOnTrack, readinessDesdeHitos,
  hitosPlan, HITOS_ONTRACK_FUENTE, HITOS_ONTRACK, gateHito, GateHito, BURNOUT_PROTOCOLO,
  PISO_AMBAR, semaforoPct, reglaDelTercio, checklist115, loadWorstCase, saveWorstCase, REGLA_BACKLOG_HITO,
} from '../../lib/usmleScores';
import ReadinessBar from './ReadinessBar';
import { ConsoleTabs, CheckpointCard } from './ConsoleKit';
import UsmlePalmertonExplorer from './UsmlePalmertonExplorer';
import UsmleQbanklyExplorer from './UsmleQbanklyExplorer';
import UsmleTodayPlan from './UsmleTodayPlan';

/**
 * UsmleHub — "US knowledge-bank terminal" (consola inglesa · jade). Command bar de
 * readiness arriba (Día X/N · % temario · gauge NBME), sub-nav de consola, y cuerpo
 * = explorador-banco + cola del día + capa de readiness/Step 2 CK/First Aid/Sketchy.
 * Render as a View inside EstudioScreen's ScrollView.
 * 2.ª capa Palmerton (19-sep-2026): MEDIA 7D con semáforo verde/ámbar/rojo (gate 80 · pisos 65/60, #21) · serie de hitos con la
 * lectura por tramos del UWSA1 (#12) y el freno del backlog (#16) · Readiness: plan B "worst case" (#26), checklist §11.5 pre-marcado
 * (#30) + regla del tercio (#8), Day-After (#5) · ROI sin la rampa legacy (#19) · Palmerton: configuración Anki §4.2 (#15).
 */
const JADE = USMLE_META.accent;         // #5FA88C — muted jade (US console)
const FLAG_GREEN = '#5FB98C';           // verde bandera armonizado (core/pathology)
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return DIAS[0].fecha; }
}

const TABS = [
  { key: 'hoy', label: 'Cola de hoy', icon: '📋' },
  { key: 'hy', label: 'High Yield', icon: '🎬' },
  { key: 'qbankly', label: 'Qbankly', icon: '🅠' },
  { key: 'readiness', label: 'Readiness', icon: '◈' },
  { key: 'roi', label: 'ROI', icon: '🎯' },
  { key: 'brain', label: 'Palmerton', icon: '🧠' },
];

export default function UsmleHub() {
  const [sub, setSub] = useState('hoy');
  // Command-bar readiness metrics (derived, no data mutation).
  const done = loadDone('usmle');
  const iso = todayISO();
  const hoyD = planHoyD(DIAS, iso);
  const glob = progresoGlobal(DIAS, new Set(done));
  // Medición Palmerton (usmleScores): local al instante, Supabase al montar, y refresco cuando UsmleTodayPlan guarda.
  const [scores, setScores] = useState<UsmleScore[]>(() => loadScores());
  useEffect(() => {
    let vivo = true;
    const off = onScoresChange((s) => { if (vivo) setScores(s); });
    pullScores().then((s) => { if (vivo) setScores(s); }).catch(() => {});
    return () => { vivo = false; off(); };
  }, []);
  const media = mediaMovil7d(scores, iso);
  const dist = distanciaOnTrack(scores, iso);
  const rd = readinessDesdeHitos(scores);
  const mediaVal = media ? (media.evalPct ?? media.consolPct ?? media.pretestPct) : null;
  // REGLA §E-7 (12-sep-2026): 2 hitos consecutivos bajo mínimo → ALERTA BURNOUT visible en todas las pestañas.
  const gh = gateHito(scores);

  return (
    <View>
      {gh.estado === 'ALERTA BURNOUT' && <BurnoutAlert gh={gh} />}
      <ReadinessBar
        flag={USMLE_META.flag} title={USMLE_META.title}
        subtitle="US knowledge-bank terminal · Pathology + Physiology = the exam"
        accent={JADE}
        dia={hoyD} total={glob.total} temarioPct={glob.pct}
        racha={`${done.length} temas`}
        readinessPct={rd ? rd.pct : USMLE_READINESS.pct} readinessLabel={rd ? rd.label : USMLE_READINESS.status}
        extraStat={{ label: 'PATH', value: `${USMLE_KPIS.pathologyPct}%`, hint: 'del examen', accent: Colors.coral }}
        media7d={media && mediaVal != null ? (() => { const sem = semaforoPct(mediaVal, media.evalPct != null ? 'eval' : 'consol'); return { label: 'MEDIA 7D', value: `${mediaVal}%`, hint: `${media.evalPct != null ? 'eval timed' : 'consolidación'} · ${media.n} días · ${sem === 'verde' ? '≥ gate 80' : sem === 'ambar' ? `ámbar ≥${media.evalPct != null ? PISO_AMBAR.eval : PISO_AMBAR.consol}` : 'ROJO < piso'}`, accent: sem === 'verde' ? Colors.green : sem === 'ambar' ? Colors.gold : Colors.coral }; })() : null}
        onTrack={dist ? { label: `Δ ${dist.hito.clave.toUpperCase()}`, value: `${dist.delta >= 0 ? '+' : ''}${dist.delta}`, hint: `mín ${dist.hito.min}% · ${dist.referencia}`, accent: dist.delta >= 0 ? Colors.green : Colors.coral } : null}
      />

      <ConsoleTabs tabs={TABS} active={sub} accent={JADE} onSelect={setSub} />

      {sub === 'hoy' ? <UsmleTodayPlan />
        : sub === 'hy' ? <UsmlePalmertonExplorer />
        : sub === 'qbankly' ? <UsmleQbanklyExplorer />
        : sub === 'readiness' ? <ReadinessView scores={scores} />
        : sub === 'roi' ? <RoiPlan />
        : <PalmertonBrain />}
    </View>
  );
}

// ── 5 NIVELES UWORLD (Palmerton) · tabla ──
function NivelesTable() {
  return (
    <GlassPanel accent={JADE} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
      <Text style={st.h3}>🎚️ 5 niveles de maestría UWorld → fases A/B/C</Text>
      <Text style={[st.smallNote, { marginBottom: Spacing.sm }]}>{USMLE_GATE.regla} {USMLE_GATE.medida}</Text>
      {USMLE_NIVELES.map((n) => (
        <View key={n.nivel} style={[st.nivRow, { borderLeftColor: n.color }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <View style={[st.nivBadge, { backgroundColor: n.color + '22', borderColor: n.color + '77' }]}><Text style={[st.nivBadgeTxt, { color: n.color }]}>NIVEL {n.nivel}</Text></View>
            <Text style={st.nivName}>{n.nombre}</Text>
            <Chip label={`Fase ${n.fase}`} color={Colors.muted} small />
          </View>
          <Text style={st.nivLine}><Text style={st.nivKey}>Formato · </Text>{n.formato}</Text>
          <Text style={st.nivLine}><Text style={st.nivKey}>Q/día · </Text>{n.qDia}</Text>
          <Text style={st.nivLine}><Text style={[st.nivKey, { color: Colors.gold }]}>Umbral para subir · </Text>{n.umbral}</Text>
          <Text style={st.nivLine}><Text style={[st.nivKey, { color: JADE }]}>Dónde vive · </Text>{n.dondeVive}</Text>
        </View>
      ))}
      <Text style={[st.smallNote, { marginTop: Spacing.sm }]}>Si falla el gate: {USMLE_GATE.siFalla}</Text>
    </GlassPanel>
  );
}

// ── SERIE DE HITOS con mínimo on-track (Parte V) y % registrado ──
function HitosSerie({ scores }: { scores: UsmleScore[] }) {
  const hs = hitosPlan(scores);
  const color = (e: string) => e === 'on-track' ? Colors.green : e === 'bajo' ? Colors.coral : e === 'registrado' ? Colors.gold : Colors.muted;
  return (
    <GlassPanel accent={Colors.gold} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
      <Text style={st.h3}>🎯 Serie de hitos · mínimo on-track vs registrado</Text>
      <Text style={[st.smallNote, { marginBottom: Spacing.sm }]}>Mínimos: {HITOS_ONTRACK_FUENTE}. El % se registra el día del hito en 📏 Medición (Cola de hoy → campo eval). GO = 2 NBME consecutivos ≥68% + UWSA2 low risk.</Text>
      {hs.map((h) => (
        <View key={h.d} style={st.hitoRow}>
          <Text style={[st.hitoD, tabular]}>D{h.d}</Text>
          <Text style={[st.hitoFecha, tabular]}>{h.fecha.slice(5)}</Text>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={st.hitoClave} numberOfLines={1}>{h.clave}{h.tramo ? ` · ${h.tramo}` : ''}</Text>
            {h.nota ? <Text style={st.hitoNota} numberOfLines={3}>{h.nota}</Text> : null}
          </View>
          <Text style={[st.hitoMin, tabular]}>{h.min != null ? `≥${h.min}%` : 'baseline'}</Text>
          <Text style={[st.hitoVal, tabular, { color: color(h.estado) }]}>{h.valor != null ? `${Math.round(h.valor)}%` : '—'}</Text>
          <Text style={[st.hitoEstado, { color: color(h.estado) }]}>{h.estado === 'on-track' ? '✓' : h.estado === 'bajo' ? '✗' : h.estado === 'registrado' ? '●' : '○'}</Text>
        </View>
      ))}
      <Text style={[st.smallNote, { marginTop: Spacing.sm }]}>Un hito &gt;5 puntos bajo su mínimo → auditar el MÉTODO esa semana (checklist §G), no sumar horas; dos hitos seguidos bajo mínimo → ⚠ ALERTA BURNOUT (REGLA §E-7: 3-5 días solo Anki AM + sueño) y plan B de fecha (feb-mar, mismo eligibility period).</Text>
      {/* #12 · lectura del UWSA1 por tramos (no es gate) */}
      {(HITOS_ONTRACK.find((h) => h.clave === 'UWSA1')?.tramos || []).map((t, i) => (
        <Text key={i} style={[st.smallNote, { marginTop: 4 }]}><Text style={{ color: i === 0 ? Colors.coral : i === 1 ? Colors.gold : Colors.green, fontWeight: '800' }}>UWSA1 {t.label}</Text> → {t.accion}</Text>
      ))}
      {/* #16 · freno del backlog ligado al hito (§4.10) */}
      <Text style={[st.smallNote, { marginTop: Spacing.sm, color: Colors.onSurfaceVariant }]}>🃏 {REGLA_BACKLOG_HITO}</Text>
    </GlassPanel>
  );
}

// ── #26 · PLAN B / PEOR ESCENARIO (Worst-Case Scenario Planning §7.6-1) — se escribe ANTES del primer bloque del UWSA1 (D1) ──
function WorstCaseCard() {
  const [txt, setTxt] = useState<string>(() => loadWorstCase());
  const [guardado, setGuardado] = useState(false);
  const guardar = () => { saveWorstCase(txt); setGuardado(true); };
  return (
    <GlassPanel accent={Colors.gold} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
      <Text style={st.h3}>🧯 Plan B / peor escenario (kit anti-pánico #26 · Palmerton §7.6)</Text>
      <Text style={[st.smallNote, { marginBottom: Spacing.sm }]}>{PROTOCOLO_BLOQUE.worstCase}</Text>
      <TextInput
        style={st.worstInput} multiline value={txt} onChangeText={(t) => { setTxt(t); setGuardado(false); }}
        placeholder={'Peor escenario, en detalle: "fallo el UWSA1 con __ %" / "el NBME 31 sale <68 %" → qué hago exactamente: plan B de fecha (feb-mar 2027, mismo eligibility period), protocolo Jay, modo mínimo, a quién llamo, qué NO hago (no añadir recursos, no sumar horas). ¿Sería el fin del mundo? No: ...'}
        placeholderTextColor={Colors.muted}
      />
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: Spacing.sm, flexWrap: 'wrap' }}>
        <TouchableOpacity activeOpacity={0.85} onPress={guardar} style={[st.faBtn, { marginTop: 0 }]}><Text style={st.faBtnTxt}>{guardado ? '✓ guardado en este dispositivo' : '💾 Guardar plan B'}</Text></TouchableOpacity>
        <Text style={st.smallNote}>localStorage jmd-usmle-worstcase (solo este dispositivo; no viaja a Supabase)</Text>
      </View>
      <Text style={[st.smallNote, { marginTop: Spacing.sm }]}>Kit del bloque (se pinta en la Cola de hoy los días de hito): {PROTOCOLO_BLOQUE.pasos.map((p, i) => `${i + 1}) ${p.split(':')[0]}`).join(' · ')}.</Text>
    </GlassPanel>
  );
}

// ── #30 · CHECKLIST §11.5 pre-marcado con los datos de la semana + #8 regla del tercio + #5 Day-After ──
function ChecklistCard({ scores }: { scores: UsmleScore[] }) {
  const iso = todayISO();
  const items = checklist115(scores, iso);
  const tercio = reglaDelTercio(scores, iso);
  const marcadas = items.filter((x) => x.marcada === true).length;
  const color = marcadas ? Colors.coral : Colors.green;
  return (
    <GlassPanel accent={color} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
      <Text style={st.h3}>🚨 Checklist de alarmas §11.5 · semana hasta {iso.slice(5)} · {marcadas ? `${marcadas} marcada${marcadas > 1 ? 's' : ''} = orden de parar y cambiar` : 'sin alarmas con datos'}</Text>
      <Text style={[st.smallNote, { marginBottom: Spacing.sm, color: tercio.estado === 'ALARMA' ? Colors.coral : Colors.muted }]}>{tercio.label} · {tercio.detalle}</Text>
      {items.map((it) => (
        <View key={it.clave} style={{ flexDirection: 'row', gap: 8, paddingVertical: 4, alignItems: 'flex-start' }}>
          <Text style={{ color: it.marcada === true ? Colors.coral : it.marcada === false ? Colors.green : Colors.muted, fontWeight: '800', width: 18 }}>{it.marcada === true ? '☒' : it.marcada === false ? '☐' : '·'}</Text>
          <View style={{ flex: 1 }}>
            <Text style={[st.body, it.marcada === true && { color: Colors.coral }]}>{it.texto}</Text>
            <Text style={st.smallNote}>{it.evidencia}</Text>
          </View>
        </View>
      ))}
      <Text style={[st.smallNote, { marginTop: Spacing.sm }]}>☒ = alarma con datos · ☐ = sin alarma · "·" = sin datos para decidir (Anki: telemetría fuera de la app). El resto del checklist (recursos nuevos, anotar First Aid, última línea primero, sueño, "solo necesito aprobar") se marca a mano el viernes (REVISION_SEMANAL).</Text>
      <Text style={[st.smallNote, { marginTop: Spacing.sm, color: Colors.onSurfaceVariant }]}>🔍 {DAY_AFTER.titulo}: {DAY_AFTER.pasos.map((p) => p.split(':')[0]).join(' · ')} — se pinta en la Cola de hoy el día siguiente a cada hito (el subtema de ese día no cambia).</Text>
    </GlassPanel>
  );
}

// ── #15 · Configuración Anki §4.2 (Palmerton) ──
function AnkiConfigCard() {
  return (
    <GlassPanel accent={Colors.teal} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
      <Text style={st.h3}>🃏 Configuración Anki exacta (Palmerton §4.2) · aplicar antes del D1</Text>
      {ANKI_CONFIG_PALMERTON.map((a, i) => (
        <View key={i} style={[st.hourRow, i === 0 && { borderTopWidth: 0 }]}>
          <View style={{ flex: 1 }}>
            <Text style={[st.body, { color: Colors.onSurface }]}><Text style={{ fontWeight: '800' }}>{a.ajuste}</Text> · {a.valor}</Text>
            <Text style={st.smallNote}>{a.porque}{a.check ? ` · telemetría: ${a.check}` : ''}</Text>
          </View>
        </View>
      ))}
      <Text style={[st.smallNote, { marginTop: Spacing.sm }]}>La telemetría (anki_telemetria.js · getDeckConfig) debe alarmar si rev.perDay &lt; 9999 o rollover ≠ 4 (nombre exacto de las claves en AnkiConnect A VERIFICAR). Fuente: DATA/USMLE/PALMERTON_METODO_COMPLETO.md §4.2 · §4.10.</Text>
    </GlassPanel>
  );
}

// ── ALERTA BURNOUT (REGLA §E-7 · usmleScores.gateHito) — banner sobre las pestañas cuando 2 hitos seguidos quedan bajo mínimo ──
function BurnoutAlert({ gh }: { gh: GateHito }) {
  return (
    <GlassPanel accent={Colors.coral} style={{ marginBottom: Spacing.md, padding: Spacing.lg, borderColor: Colors.coral + '88' }}>
      <Text style={[st.h3, { color: Colors.coral }]}>{gh.label}</Text>
      <Text style={st.body}>{BURNOUT_PROTOCOLO.regla}</Text>
      {BURNOUT_PROTOCOLO.pasos.map((p, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 3 }}>
          <Text style={{ color: Colors.coral }}>{i + 1}.</Text>
          <Text style={[st.smallNote, { flex: 1, color: Colors.onSurfaceVariant }]}>{p}</Text>
        </View>
      ))}
      <Text style={[st.smallNote, { marginTop: Spacing.xs }]}>Fuente: {BURNOUT_PROTOCOLO.fuente}. Los síntomas los decides tú; la señal numérica la da la serie de hitos.</Text>
    </GlassPanel>
  );
}

// ── GATE DE HITOS + protocolo de burnout (siempre visible en Readiness, con o sin alerta) ──
function HitoGateCard({ gh }: { gh: GateHito }) {
  const color = gh.estado === 'on-track' ? Colors.green : gh.estado === 'bajo' ? Colors.gold : gh.estado === 'ALERTA BURNOUT' ? Colors.coral : Colors.muted;
  return (
    <GlassPanel accent={color} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
      <Text style={st.h3}>🔥 Gate de hitos · protocolo de burnout (REGLA §E-7)</Text>
      <View style={[st.gateBox, { borderColor: color + '77', backgroundColor: color + '14' }]}>
        <Text style={[st.gateTxt, { color }]}>{gh.label}</Text>
        <Text style={st.smallNote}>{gh.detalle}</Text>
      </View>
      <Text style={[st.smallNote, { marginTop: Spacing.sm }]}>Regla: {BURNOUT_PROTOCOLO.regla}</Text>
    </GlassPanel>
  );
}

// ── TAPER · D-1 · TEST DAY (Palmerton §8.3-§8.4 · DIVERGENCIAS §E-5 implementada 12-sep-2026) ──
function TaperCard() {
  const t = USMLE_TAPER;
  return (
    <GlassPanel accent={Colors.coral} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
      <Text style={st.h3}>🧘 Taper y semana de examen · D94 jue 4-feb última sesión de banco · D95 vie 5-feb = D-1 · finde libre · examen {DAILY_META.examenTarget}</Text>
      <Text style={[st.smallNote, { marginBottom: Spacing.sm }]}>{t.cierre}</Text>
      {[t.d94, t.d95].map((d) => (
        <View key={d.d} style={st.taperRow}>
          <Text style={[st.taperRol, tabular, { color: Colors.gold }]}>D{d.d} · {d.rol}</Text>
          <Text style={[st.taperFecha, tabular]}>{d.fecha.slice(5)}</Text>
          <Text style={[st.body, { flex: 1 }]}>{d.resumen}</Text>
        </View>
      ))}
      <View style={st.taperRow}>
        <Text style={[st.taperRol, tabular, { color: Colors.coral }]}>D95 · último día del plan (v5.15)</Text>
        <Text style={[st.taperFecha, tabular]}>{t.dMenos1.fecha.slice(5)}</Text>
        <View style={{ flex: 1 }}>{t.dMenos1.pasos.map((p, i) => <Text key={i} style={st.body}>• {p}</Text>)}</View>
      </View>
      <View style={st.taperRow}>
        <Text style={[st.taperRol, tabular, { color: Colors.green }]}>EXAMEN</Text>
        <Text style={[st.taperFecha, tabular]}>{t.examen.fecha.slice(5)}</Text>
        <View style={{ flex: 1 }}>{t.examen.pasos.map((p, i) => <Text key={i} style={st.body}>• {p}</Text>)}</View>
      </View>
      <Text style={[st.smallNote, { marginTop: Spacing.sm }]}>Fuente: {t.fuente}. Las franjas horarias no cambian; solo el volumen (20Q) y el contenido (nada nuevo).</Text>
    </GlassPanel>
  );
}

// ── READINESS · niveles UWorld + serie de hitos + NBME/UWSA/Free120 + Step 2 CK + First Aid + Sketchy ──
function ReadinessView({ scores }: { scores: UsmleScore[] }) {
  const gh = gateHito(scores);
  return (
    <View>
      <NivelesTable />
      <HitosSerie scores={scores} />
      <HitoGateCard gh={gh} />
      <WorstCaseCard />
      <ChecklistCard scores={scores} />
      <TaperCard />
      <CheckpointCard
        title="Score checkpoints · NBME / UWSA / Free 120"
        subtitle={USMLE_READINESS.next}
        rows={USMLE_CHECKPOINTS}
        accent={JADE}
        ctaOpen="note"
      />

      {/* STEP 2 CK — activado (deja de estar 'próximamente') */}
      <SectionLabel>Step 2 CK · gold standard (el que más pesa para Clínic / Mayo)</SectionLabel>
      <GlassPanel accent={FLAG_GREEN} style={{ marginBottom: Spacing.md, padding: Spacing.lg }}>
        <Text style={st.body}>
          <Text style={{ color: FLAG_GREEN, fontWeight: '800' }}>Step 2 CK ya no es "próximamente".</Text>{' '}
          La serie <Text style={{ color: Colors.onSurface }}>High Yield [System] Step 2 CK</Text> de Palmerton ya está en High Yield;
          esta es la capa de bancos + audio HY.
        </Text>
      </GlassPanel>
      <View style={[gridStyle(220), { marginBottom: Spacing.xl }]}>
        {USMLE_STEP2_RESOURCES.map((r, i) => (
          <View key={i} style={gridItemStyle(220)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(r.url)} style={st.resCard}>
              <Text style={[st.resLabel, { color: FLAG_GREEN }]} numberOfLines={2}>{r.gated ? '🔒 ' : '🔗 '}{r.label} ↗</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* FIRST AID — índice de repaso */}
      <SectionLabel>First Aid · índice de consolidación (no de 1ª pasada)</SectionLabel>
      <GlassPanel accent={Colors.gold} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
        <Text style={st.h3}>📕 {FIRST_AID_INDEX.title}</Text>
        <Text style={[st.smallNote, { marginBottom: Spacing.md }]}>{FIRST_AID_INDEX.role}</Text>
        {FIRST_AID_INDEX.sections.map((sec, i) => (
          <View key={i} style={{ marginBottom: Spacing.sm }}>
            <Text style={[st.faPart, { color: Colors.gold }]}>{sec.part}</Text>
            <View style={st.faWrap}>
              {sec.chapters.map((c, k) => (
                <View key={k} style={st.faChip}><Text style={st.faChipTxt}>{c}</Text></View>
              ))}
            </View>
          </View>
        ))}
        <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(FIRST_AID_INDEX.url)} style={[st.faBtn]}>
          <Text style={st.faBtnTxt}>Abrir First Aid Rx ↗</Text>
        </TouchableOpacity>
      </GlassPanel>

      {/* SKETCHY — mapa de símbolos (memory palace) */}
      <SectionLabel>Sketchy · mapa de símbolos (memory palace) · Micro / Pharm</SectionLabel>
      <View style={[gridStyle(200), { marginBottom: Spacing.xl }]}>
        {SKETCHY_SYMBOLS.map((s, i) => (
          <View key={i} style={gridItemStyle(200)}>
            <View style={st.skCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={st.skSym}>{s.symbol}</Text>
                <Chip label={s.world} color={s.world === 'Micro' ? JADE : Colors.purple} small />
              </View>
              <Text style={st.skConcept}>{s.concept}</Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={st.smallNote}>Los símbolos son consistentes entre escenas: al ver el símbolo, recuperas el concepto sin idioma — ideal para IMG.</Text>
    </View>
  );
}

function RoiPlan() {
  return (
    <View>
      <View style={st.ringRow}>
        <View style={st.ringCard}><RingStat value={USMLE_KPIS.pathologyPct} label="Pathology" sub="Pathoma" accent={Colors.coral} suffix="%" /></View>
        <View style={st.ringCard}><RingStat value={35} label="Physiology" sub="Ninja Nerd" accent={Colors.blue} suffix="%" /></View>
        <View style={st.ringCard}><RingStat value={USMLE_KPIS.beginnerWeeks} max={16} label="English ramp" sub="weeks" accent={JADE} /></View>
        <View style={st.ringCard}><RingStat value={USMLE_READINESS.pct} label="Readiness" sub="NBME-anchored" accent={Colors.gold} suffix="%" /></View>
      </View>

      <SectionLabel>Organ systems · order of attack (official weight)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {USMLE_SYSTEMS.map((s, i) => (
          <SystemWeightRow key={s.n} s={s} first={i === 0} />
        ))}
      </GlassPanel>

      <SectionLabel>Disciplines · the real truth of the exam</SectionLabel>
      <View style={[gridStyle(220), { marginBottom: Spacing.xl }]}>
        {USMLE_DISCIPLINES.map((d, i) => (
          <View key={i} style={gridItemStyle(220)}>
            <View style={st.discCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={st.discName}>{d.name}</Text>
                <Text style={[st.discWeight, { color: JADE }]}>{d.weight}</Text>
              </View>
              <Text style={st.discAnchor}>⚓ {d.anchor}</Text>
            </View>
          </View>
        ))}
      </View>

      {USMLE_RAMP_LEGACY && (
        <GlassPanel accent={Colors.muted} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
          <Text style={st.h3}>🗄️ Rampa y "la hora" = LEGACY (pre-v5)</Text>
          <Text style={st.smallNote}>{USMLE_LEGACY_NOTA} Bloque vigente: {DAILY_META.bloque}.</Text>
        </GlassPanel>
      )}
      {!USMLE_RAMP_LEGACY && <SectionLabel>Beginner ramp · English + content (1h/day Mon–Fri)</SectionLabel>}
      {!USMLE_RAMP_LEGACY && <View style={[gridStyle(240), { marginBottom: Spacing.xl }]}>
        {USMLE_RAMP.map((p, i) => (
          <View key={i} style={gridItemStyle(240)}>
            <FadeUp delay={i * 60}>
              <View style={[st.phaseCard, { borderLeftColor: JADE }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={[st.phaseTag, { color: JADE }]}>{p.phase}</Text>
                  <Chip label={p.hours} color={Colors.muted} small />
                </View>
                <Text style={st.body}>{p.focus}</Text>
              </View>
            </FadeUp>
          </View>
        ))}
      </View>}

      {!USMLE_RAMP_LEGACY && <SectionLabel>The hour (English micro-block)</SectionLabel>}
      {!USMLE_RAMP_LEGACY && <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {USMLE_HOUR.map((h, i) => (
          <View key={i} style={[st.hourRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={[st.hourBadge, { backgroundColor: JADE + '1A' }]}><Text style={[st.hourSlot, { color: JADE }]}>{h.slot}</Text></View>
            <Text style={st.hourAct}>{h.act}</Text>
          </View>
        ))}
      </GlassPanel>}

      <SectionLabel>Qbank rules (Qbankly / UWorld-style)</SectionLabel>
      <GlassPanel accent={Colors.coral} style={{ marginBottom: Spacing.xl }}>
        {USMLE_QBANK_RULES.map((r, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 5 }}>
            <Text style={{ color: Colors.coral }}>•</Text>
            <Text style={[st.body, { flex: 1 }]}>{r}</Text>
          </View>
        ))}
      </GlassPanel>

      <ResourcesBlock />
    </View>
  );
}

/** Fila-sistema de banca: nodo con barra de peso animada (grafo de rentabilidad). */
function SystemWeightRow({ s, first }: { s: typeof USMLE_SYSTEMS[0]; first: boolean }) {
  // "12–16%" → tope numérico para la barra (aire de terminal financiero).
  const top = parseInt((s.weight.match(/(\d+)\s*%$/) || [])[1] || (s.weight.match(/(\d+)/) || [])[1] || '0', 10);
  const w = Math.max(6, Math.round((top / 16) * 100));
  const col = PRIORIDAD_COLOR[s.prioridad];
  return (
    <View style={[st.wRow, first && { borderTopWidth: 0 }]}>
      <Text style={[st.wN, { color: col }]}>{String(s.n).padStart(2, '0')}</Text>
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={st.wName} numberOfLines={1}>{s.system}</Text>
          <Text style={[st.wVal, { color: JADE }]}>{s.weight}</Text>
        </View>
        <View style={st.wTrack}>
          <View style={[st.wFill, { width: (w + '%') as any, backgroundColor: col }]} />
        </View>
      </View>
      <Text style={[st.wVueltas, { color: col }]}>{VUELTAS[s.prioridad]}v</Text>
    </View>
  );
}

function PalmertonBrain() {
  return (
    <View>
      <GlassPanel accent={JADE} style={{ marginBottom: Spacing.lg, padding: Spacing.lg }}>
        <Text style={st.h3}>🧠 The Palmerton Brain</Text>
        <Text style={st.body}>{PALMERTON_WHO}</Text>
        <Text style={[st.smallNote, { marginTop: Spacing.sm }]}>⚠ {PALMERTON_HONESTY}</Text>
      </GlassPanel>

      <SectionLabel>The method (verified principles)</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {PALMERTON_METHOD.map((m, i) => (
          <FadeUp key={i} delay={i * 35}>
            <View style={st.methodCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={st.methodName}>{m.name}</Text>
                <Chip label={m.verified ? 'VERIFIED' : 'general'} color={m.verified ? JADE : Colors.muted} small />
              </View>
              <Text style={[st.body, { marginTop: 4 }]}>{m.desc}</Text>
            </View>
          </FadeUp>
        ))}
      </View>

      <SectionLabel>Anki · configuración exacta (§4.2)</SectionLabel>
      <AnkiConfigCard />

      <SectionLabel>How do I study… (tap a system)</SectionLabel>
      <Text style={[st.smallNote, { marginBottom: Spacing.md }]}>
        Per-system mini-methods, reconstructed in Palmerton's spirit. (A live voice tutor would need a secure backend; this is the structured knowledge.)
      </Text>
      <View style={{ marginBottom: Spacing.xl }}>
        {PALMERTON_SYSTEMS.map((s, i) => <SystemAccordion key={i} s={s} />)}
      </View>

      <ResourcesBlock />
    </View>
  );
}

function SystemAccordion({ s }: { s: typeof PALMERTON_SYSTEMS[0] }) {
  const [open, setOpen] = useState(false);
  const { hovered, hoverProps } = useHover();
  return (
    <View style={[st.accCard, hovered ? { borderColor: JADE + '55' } : null]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen(o => !o)} {...hoverProps}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={st.accTitle}>{open ? '▾' : '▸'} {s.system}</Text>
        <Text style={[st.accHint, { color: JADE }]}>{open ? '' : 'how to study'}</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: Spacing.sm, gap: 8 }}>
          <View><Text style={st.accLbl}>⚓ ANCHOR</Text><Text style={st.body}>{s.anchor}</Text></View>
          <View><Text style={[st.accLbl, { color: JADE }]}>❓ SAQ STRATEGY</Text><Text style={st.body}>{s.saq}</Text></View>
          <View><Text style={[st.accLbl, { color: Colors.coral }]}>⚠ COMMON TRAP</Text><Text style={st.body}>{s.trap}</Text></View>
        </View>
      )}
    </View>
  );
}

function ResourcesBlock() {
  return (
    <View>
      <SectionLabel>Free resources & links</SectionLabel>
      <View style={[gridStyle(220), { marginBottom: Spacing.xl }]}>
        {USMLE_RESOURCES.map((r, i) => (
          <View key={i} style={gridItemStyle(220)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(r.url)} style={st.resCard}>
              <Text style={[st.resLabel, r.gated && { color: Colors.muted }]} numberOfLines={2}>
                {r.gated ? '🔒 ' : '🔗 '}{r.label} ↗
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, padding: Spacing.lg, ...Elevation.sm };
const WEB_LINK = { cursor: 'pointer', transition: Motion.base } as any;
const tabular = Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {};
const st = StyleSheet.create({
  h3: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: 6, letterSpacing: -0.2 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 19 },
  smallNote: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 17 },

  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  ringCard: { flex: 1, minWidth: 140, backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: Hairline.soft, paddingVertical: Spacing.lg, paddingHorizontal: Spacing.md, alignItems: 'center', ...Elevation.sm },

  // system weight rows (bank graph)
  wRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 9, borderTopWidth: 1, borderTopColor: Hairline.soft },
  wN: { fontSize: FontSize.labelMd, fontWeight: '800', width: 22, textAlign: 'center', ...tabular },
  wName: { flex: 1, fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '600', letterSpacing: -0.2 },
  wVal: { fontSize: FontSize.labelLg, fontWeight: '800', marginLeft: 8, ...tabular },
  wTrack: { height: 7, borderRadius: 4, backgroundColor: 'rgba(231,234,242,0.06)', overflow: 'hidden', marginTop: 5 },
  wFill: { height: 7, borderRadius: 4, ...(Platform.OS === 'web' ? { transition: Motion.spring } as any : {}) },
  wVueltas: { fontSize: 10, fontWeight: '800', width: 26, textAlign: 'right' },

  discCard: { ...cardBase },
  discName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, flex: 1, letterSpacing: -0.2 },
  discWeight: { fontSize: FontSize.labelLg, fontWeight: '800', ...tabular },
  discAnchor: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 7, lineHeight: 17 },

  phaseCard: { ...cardBase, borderLeftWidth: 3, minHeight: 120 },
  phaseTag: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },

  hourRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: Hairline.soft, gap: Spacing.sm },
  hourBadge: { borderRadius: BorderRadius.md, paddingVertical: 3, paddingHorizontal: 8, minWidth: 92, alignItems: 'center' },
  hourSlot: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2, ...tabular },
  hourAct: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },

  methodCard: { ...cardBase, marginBottom: Spacing.sm },
  methodName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, flex: 1, letterSpacing: -0.2 },

  accCard: { ...cardBase, marginBottom: Spacing.sm, padding: Spacing.md, ...WEB_LINK },
  accTitle: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  accHint: { fontSize: FontSize.labelSm, fontWeight: '700', letterSpacing: 0.2 },
  accLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 3 },

  // readiness · step2 · first aid · sketchy
  faPart: { fontSize: 10, fontWeight: '800', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 6 },
  faWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  faChip: { backgroundColor: Colors.gold + '12', borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Colors.gold + '2E', paddingVertical: 3, paddingHorizontal: 8 },
  faChipTxt: { fontSize: 10, color: Colors.champagne, fontWeight: '600' },
  faBtn: { alignSelf: 'flex-start', marginTop: Spacing.sm, backgroundColor: Colors.gold + '16', borderWidth: 1, borderColor: Colors.gold + '44', borderRadius: BorderRadius.md, paddingVertical: 7, paddingHorizontal: 13, ...WEB_LINK },
  faBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.gold, letterSpacing: 0.2 },
  skCard: { ...cardBase, minHeight: 76 },
  skSym: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface },
  skConcept: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 8, lineHeight: 16 },

  resCard: { ...cardBase, ...WEB_LINK },
  resLabel: { fontSize: FontSize.labelMd, color: JADE, fontWeight: '600', lineHeight: 16 },

  // niveles UWorld + serie de hitos (Palmerton v3)
  nivRow: { borderLeftWidth: 3, paddingLeft: Spacing.md, paddingVertical: Spacing.sm, marginTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Hairline.soft },
  nivBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 2, paddingHorizontal: 9 },
  nivBadgeTxt: { fontSize: 10, fontWeight: '800', letterSpacing: 0.6 },
  nivName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  nivLine: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17, marginTop: 4 },
  nivKey: { fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.2 },
  hitoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 7, borderTopWidth: 1, borderTopColor: Hairline.soft },
  hitoD: { fontSize: FontSize.labelSm, fontWeight: '800', color: JADE, width: 34 },
  hitoFecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 40 },
  hitoClave: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.onSurface },
  hitoNota: { fontSize: 9, color: Colors.muted, marginTop: 1, lineHeight: 12 },
  hitoMin: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.gold, width: 56, textAlign: 'right' },
  hitoVal: { fontSize: FontSize.labelLg, fontWeight: '800', width: 44, textAlign: 'right' },
  hitoEstado: { fontSize: FontSize.bodyMd, fontWeight: '800', width: 16, textAlign: 'center' },

  // gate de hitos / burnout + taper (12-sep-2026)
  gateBox: { marginTop: Spacing.sm, borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.sm },
  worstInput: { minHeight: 96, backgroundColor: Colors.surfaceContainerHighest, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, color: Colors.onSurface, fontSize: FontSize.labelMd, paddingHorizontal: 10, paddingVertical: 8, textAlignVertical: 'top', ...(Platform.OS === 'web' ? { outlineStyle: 'none' as any } : {}) },
  gateTxt: { fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: 0.2, marginBottom: 3 },
  taperRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingVertical: 7, borderTopWidth: 1, borderTopColor: Hairline.soft },
  taperRol: { fontSize: FontSize.labelSm, fontWeight: '800', width: 118, letterSpacing: 0.2 },
  taperFecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 40 },
});
