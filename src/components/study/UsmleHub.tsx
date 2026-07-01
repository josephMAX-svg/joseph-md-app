import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, gridStyle, gridItemStyle, useHover } from '../empresa/primitives';
import { RingStat, FadeUp } from '../empresa/visuals';
import {
  USMLE_META, USMLE_KPIS, USMLE_SYSTEMS, USMLE_DISCIPLINES, PALMERTON_WHO, PALMERTON_HONESTY,
  PALMERTON_METHOD, PALMERTON_SYSTEMS, USMLE_RAMP, USMLE_HOUR, USMLE_QBANK_RULES, USMLE_RESOURCES,
  USMLE_STEP2_RESOURCES, USMLE_CHECKPOINTS, USMLE_READINESS, FIRST_AID_INDEX, SKETCHY_SYMBOLS,
  PRIORIDAD_COLOR, VUELTAS,
} from '../../lib/usmleData';
import { DIAS } from '../../lib/usmleStep1Daily';
import { planHoyD, progresoGlobal, loadDone } from '../../lib/studyProgress';
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
  const hoyD = planHoyD(DIAS, todayISO());
  const glob = progresoGlobal(DIAS, new Set(done));

  return (
    <View>
      <ReadinessBar
        flag={USMLE_META.flag} title={USMLE_META.title}
        subtitle="US knowledge-bank terminal · Pathology + Physiology = the exam"
        accent={JADE}
        dia={hoyD} total={glob.total} temarioPct={glob.pct}
        racha={`${done.length} temas`}
        readinessPct={USMLE_READINESS.pct} readinessLabel={USMLE_READINESS.status}
        extraStat={{ label: 'PATH', value: `${USMLE_KPIS.pathologyPct}%`, hint: 'del examen', accent: Colors.coral }}
      />

      <ConsoleTabs tabs={TABS} active={sub} accent={JADE} onSelect={setSub} />

      {sub === 'hoy' ? <UsmleTodayPlan />
        : sub === 'hy' ? <UsmlePalmertonExplorer />
        : sub === 'qbankly' ? <UsmleQbanklyExplorer />
        : sub === 'readiness' ? <ReadinessView />
        : sub === 'roi' ? <RoiPlan />
        : <PalmertonBrain />}
    </View>
  );
}

// ── READINESS · NBME/UWSA/Free120 + Step 2 CK + First Aid + Sketchy ──
function ReadinessView() {
  return (
    <View>
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

      <SectionLabel>Beginner ramp · English + content (1h/day Mon–Fri)</SectionLabel>
      <View style={[gridStyle(240), { marginBottom: Spacing.xl }]}>
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
      </View>

      <SectionLabel>The hour (English micro-block)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {USMLE_HOUR.map((h, i) => (
          <View key={i} style={[st.hourRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={[st.hourBadge, { backgroundColor: JADE + '1A' }]}><Text style={[st.hourSlot, { color: JADE }]}>{h.slot}</Text></View>
            <Text style={st.hourAct}>{h.act}</Text>
          </View>
        ))}
      </GlassPanel>

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
});
