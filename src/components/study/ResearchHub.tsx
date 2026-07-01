import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { desktopStyles, DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, gridStyle, gridItemStyle } from '../empresa/primitives';
import { RingStat, MegaStat, FadeUp, CommandBackdrop } from '../empresa/visuals';
import {
  RESEARCH_META, RESEARCH_KPIS, RESEARCH_TARGETS, RESEARCH_FASES, RESEARCH_MODULOS,
  RESEARCH_JOURNALS, RESEARCH_PIPELINE, PIPELINE_NOTA, RESEARCH_HORARIO, RESEARCH_TIMELINE,
  RESEARCH_ADVERTENCIAS, VUELTAS, PRIORIDAD_COLOR, diaEstudioTipo, Prioridad,
} from '../../lib/researchData';
import { RESEARCH_RECURSOS_TOP, RESEARCH_MAESTRIA, REC } from '../../lib/researchDailyPlan';
import { getResearchEngineState } from '../../lib/supabase';
import { ResearchFonts, ensureResearchFonts, serifTitle, InkColors } from './researchTheme';
import ResearchTodayPlan from './ResearchTodayPlan';
import ResearchAgenticSystem from './ResearchAgenticSystem';
import ResearchLinesExplorer from './ResearchLinesExplorer';
import AIFirstPanel from './AIFirstPanel';

/**
 * ResearchHub — sección Research (camino a Mayo Clinic), rediseñada con IDENTIDAD PROPIA:
 * CUADERNO DE LABORATORIO EDITORIAL / research desk de revista científica (Elicit/Nature/NEJM).
 * En vez del hero degradado + PillTabs compartidos con USMLE/MIR, tiene un MASTHEAD editorial
 * (serif, con el status del motor y el PIP counter en oro) y pestañas tipo revista (subrayado oro).
 * "Hoy" = motor día-a-día de revisiones sistemáticas; "Sistema" = sistema agéntico (el corazón);
 * "Líneas" = las 8 líneas; "Panel" = el desk (KPIs, fases, journals, maestría transversal, timeline).
 */
const TEAL = RESEARCH_META.accent;   // #6BB8B0 (token)
const GOLD = InkColors.gold;         // #C8A96A — capa de estatus (manuscrito/PIP/sellos)
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

type Sub = 'hoy' | 'sistema' | 'lineas' | 'panel';

// Numeración de protocolo tipo lomo de cuaderno (marca de agua editorial).
const SUB_META: Record<Sub, { label: string; proto: string; kicker: string }> = {
  hoy:     { label: 'Bitácora',   proto: 'R·LOG', kicker: 'ENTRADA DE HOY' },
  sistema: { label: 'Redacción',  proto: 'R·SYS', kicker: 'MOTOR AGÉNTICO' },
  lineas:  { label: 'Líneas',     proto: 'R·LIN', kicker: 'CARTERA DE LÍNEAS' },
  panel:   { label: 'Desk',       proto: 'R·DSK', kicker: 'MESA EDITORIAL' },
};

function VueltasDots({ prioridad }: { prioridad: Prioridad }) {
  const n = VUELTAS[prioridad];
  const color = PRIORIDAD_COLOR[prioridad];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <View key={i} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: i < n ? color : 'rgba(255,255,255,0.12)' }} />
      ))}
      <Text style={{ fontSize: 9, color: Colors.muted, marginLeft: 4 }}>{n} vueltas</Text>
    </View>
  );
}

/** MASTHEAD editorial — masthead de revista: título serif + status del motor + PIP counter en oro. */
function EditorialMasthead({ hoy }: { hoy: 'research' | 'derma' | 'descanso' }) {
  const [run, setRun] = useState<string>('idle');
  const [papersToday, setPapersToday] = useState<number | null>(null);
  useEffect(() => {
    let on = true;
    getResearchEngineState().then((s) => {
      if (!on || !s) return;
      if (s.run_state) setRun(s.run_state);
      if (s.papers_today != null) setPapersToday(s.papers_today);
    });
    return () => { on = false; };
  }, []);
  const runMeta = run === 'running'
    ? { c: InkColors.jade, lbl: 'MOTOR EN MARCHA' }
    : run === 'paused'
      ? { c: InkColors.brass, lbl: 'MOTOR EN PAUSA' }
      : run === 'stopped'
        ? { c: InkColors.coral, lbl: 'MOTOR DETENIDO' }
        : { c: InkColors.inkMute, lbl: 'MOTOR INACTIVO' };

  return (
    <View style={mh.wrap}>
      {/* regla superior de cuaderno + folio */}
      <View style={mh.topRule}>
        <Text style={mh.folio}>PERÚ · MAYO CLINIC PATH — vol. I</Text>
        <Text style={mh.folio}>ISSN·SR / {new Date().getFullYear()}</Text>
      </View>

      <View style={mh.body}>
        <View style={{ flex: 1, minWidth: 240 }}>
          <Text style={mh.kicker}>REVISTA DE INVESTIGACIÓN · CUADERNO DE LABORATORIO</Text>
          <Text style={[mh.title, serifTitle]}>Research</Text>
          <Text style={mh.sub}>{RESEARCH_META.subtitulo}</Text>
          <Text style={mh.tesis}>{RESEARCH_META.tesis}</Text>
        </View>

        {/* Columna de estatus: motor + PIP counter (oro) + día */}
        <View style={mh.statusCol}>
          <View style={[mh.engineChip, { borderColor: runMeta.c + '55' }]}>
            <View style={[mh.engineDot, { backgroundColor: runMeta.c }]} />
            <View>
              <Text style={[mh.engineLbl, { color: runMeta.c }]}>{runMeta.lbl}</Text>
              <Text style={mh.engineSub}>{papersToday != null ? `${papersToday} papers descubiertos hoy` : 'discovery en la nube'}</Text>
            </View>
          </View>

          {/* PIP counter — el objeto de máximo valor: en ORO */}
          <View style={mh.pipRow}>
            <View style={mh.pipCell}>
              <Text style={[mh.pipVal, { color: GOLD }]}>{RESEARCH_KPIS.pipsActuales}</Text>
              <Text style={mh.pipLbl}>PIP INDEXADOS</Text>
            </View>
            <View style={mh.pipDivider} />
            <View style={mh.pipCell}>
              <Text style={[mh.pipVal, { color: InkColors.ink }]}>{RESEARCH_KPIS.pipsParaCompetir}</Text>
              <Text style={mh.pipLbl}>META · COMPETIR</Text>
            </View>
          </View>

          <View style={[mh.dayChip, { borderColor: (hoy === 'research' ? TEAL : hoy === 'derma' ? Colors.purple : Colors.muted) + '55' }]}>
            <Text style={mh.dayLbl}>HOY</Text>
            <Text style={[mh.dayVal, { color: hoy === 'research' ? TEAL : hoy === 'derma' ? Colors.purple : Colors.muted }]}>
              {hoy === 'research' ? 'RESEARCH' : hoy === 'derma' ? 'DERMA →' : 'Descanso'}
            </Text>
          </View>
        </View>
      </View>

      {/* regla inferior doble (masthead de revista) */}
      <View style={mh.bottomRuleThick} />
      <View style={mh.bottomRuleThin} />
    </View>
  );
}

/** Pestañas tipo revista: subrayado fino oro (no PillTab redondeado compartido). */
function JournalTabs({ sub, setSub }: { sub: Sub; setSub: (s: Sub) => void }) {
  const tabs: { k: Sub; label: string }[] = [
    { k: 'hoy', label: 'Bitácora' },
    { k: 'sistema', label: 'Redacción · agéntico' },
    { k: 'lineas', label: 'Líneas' },
    { k: 'panel', label: 'Desk editorial' },
  ];
  return (
    <View style={jt.row}>
      {tabs.map((t) => {
        const active = sub === t.k;
        return (
          <TouchableOpacity key={t.k} activeOpacity={0.8} onPress={() => setSub(t.k)} style={jt.tab}>
            <Text style={[jt.txt, serifTitle, active && { color: Colors.onSurface }]}>{t.label}</Text>
            <View style={[jt.underline, active ? { backgroundColor: GOLD } : { backgroundColor: 'transparent' }]} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/** Panel = el "desk" editorial (KPIs, fases, targets, currículo, maestría, journals, timeline, advertencias). */
function PanelView() {
  return (
    <View>
      {/* MEGA STAT */}
      <MegaStat value={RESEARCH_KPIS.pipsParaCompetir} label="Publicaciones indexadas para competir" accent={GOLD}
        footnote={`8–15 para nivel Mayo (stretch) · hoy tienes ${RESEARCH_KPIS.pipsActuales}`} />

      {/* RINGS */}
      <View style={st.ringRow}>
        <View style={st.ringCard}><RingStat value={RESEARCH_KPIS.pipsActuales} max={3} label="PIPs hoy" sub="indexadas reales" accent={Colors.coral} /></View>
        <View style={st.ringCard}><RingStat value={RESEARCH_KPIS.pipsParaCompetir} max={15} label="Meta competir" sub="≈3 PIPs" accent={GOLD} /></View>
        <View style={st.ringCard}><RingStat value={RESEARCH_KPIS.primerSubmissionMes} max={6} label="1er submission" sub="mes" accent={Colors.brass} /></View>
        <View style={st.ringCard}><RingStat value={RESEARCH_KPIS.readiness} label="Readiness" sub="perfil research" accent={Colors.blue} suffix="%" /></View>
      </View>

      {/* CUELLO DE BOTELLA */}
      <GlassPanel accent={Colors.coral} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
        <Text style={[st.h3, serifTitle]}>El cuello de botella real</Text>
        <Text style={st.body}>{RESEARCH_META.cuelloBotella}</Text>
      </GlassPanel>

      {/* FASES — protocolo numerado */}
      <SectionLabel>Ruta por fases · MIR → Mayo</SectionLabel>
      <View style={[gridStyle(220), { marginBottom: Spacing.lg }]}>
        {RESEARCH_FASES.map((f, i) => {
          const activa = f.estado === 'activa';
          const meta = f.estado === 'meta';
          const acc = activa ? TEAL : meta ? GOLD : Colors.muted;
          return (
            <View key={i} style={gridItemStyle(220)}>
              <FadeUp delay={i * 70}>
                <View style={[st.faseCard, { borderLeftColor: acc }, activa && { backgroundColor: TEAL + '0E' }]}>
                  <Text style={st.protoMark}>{`§ ${String(i + 1).padStart(2, '0')}`}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[st.faseTag, { color: acc }]}>{f.fase}</Text>
                    {activa ? <Chip label="AQUÍ" color={TEAL} small /> : meta ? <Chip label="META" color={GOLD} small /> : null}
                  </View>
                  <Text style={[st.faseTitle, serifTitle]}>{f.titulo}</Text>
                  <Text style={st.faseDesc}>{f.desc}</Text>
                  <Text style={st.faseEntreg}>→ {f.entregable}</Text>
                </View>
              </FadeUp>
            </View>
          );
        })}
      </View>

      {/* TARGETS DE PUBLICACIÓN */}
      <SectionLabel>Targets de publicación (mix realista)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_TARGETS.map((t, i) => (
          <View key={i} style={[st.tRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={{ flex: 1.6 }}>
              <Text style={[st.tName, serifTitle]}>{t.tipo}</Text>
              <Text style={st.tPeso}>{t.peso}</Text>
            </View>
            <Text style={[st.tObj, { color: GOLD }]}>{t.objetivo}</Text>
            <View style={{ width: 86, alignItems: 'flex-end' }}>
              <Chip label={t.prioridad} color={PRIORIDAD_COLOR[t.prioridad]} small />
            </View>
          </View>
        ))}
      </GlassPanel>

      {/* MÓDULOS */}
      <SectionLabel>Currículo de research skills · por prioridad, vueltas y deadline</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_MODULOS.map((m, i) => (
          <FadeUp key={m.n} delay={i * 50}>
            <View style={[st.modCard, { borderLeftColor: PRIORIDAD_COLOR[m.prioridad] }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                <Text style={[st.modName, serifTitle]}>{m.n}. {m.nombre}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Chip label={m.prioridad} color={PRIORIDAD_COLOR[m.prioridad]} small />
                  <Chip label={`deadline ${m.deadline}`} color={Colors.muted} small />
                </View>
              </View>
              <View style={{ marginTop: 6, marginBottom: 8 }}><VueltasDots prioridad={m.prioridad} /></View>
              <Text style={st.body}>{m.nota}</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {m.links.map((l, j) => (
                  <TouchableOpacity key={j} activeOpacity={0.8} onPress={() => openUrl(l.url)} style={st.link}>
                    <Text style={st.linkText} numberOfLines={1}>{l.label} ↗</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </FadeUp>
        ))}
      </View>

      {/* ★ MAESTRÍA TRANSVERSAL — competencias de élite que atraviesan todas las fases (aditivo) */}
      <SectionLabel>★ Maestría transversal · competencias que atraviesan todo el plan</SectionLabel>
      <Text style={st.desk}>
        No son un día concreto: cierran los gaps de élite (integridad/ética, regresión clínica aplicada,
        ciencia abierta, peer review post-submit, redacción no-nativo, datos reproducibles).
      </Text>
      <View style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_MAESTRIA.map((m, i) => (
          <FadeUp key={m.id} delay={i * 45}>
            <View style={[st.maestriaCard, { borderLeftColor: GOLD }]}>
              <Text style={[st.maestriaTitle, serifTitle]}>{m.titulo}</Text>
              <Text style={st.maestriaAncla}>{m.anclaFase}</Text>
              <Text style={st.body}>{m.porQue}</Text>
              <View style={[st.drillBox, { borderColor: GOLD + '33' }]}>
                <Text style={st.drillLbl}>MICRO-DRILL</Text>
                <Text style={st.drillTxt}>{m.drill}</Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {m.recs.map((k) => {
                  const r = REC[k];
                  if (!r) return null;
                  return (
                    <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => openUrl(r.url)} style={st.link}>
                      <Text style={st.linkText} numberOfLines={1}>{r.label} ↗</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </FadeUp>
        ))}
      </View>

      {/* ★ TOP 2026 — recursos de élite verificados (aditivo) */}
      <SectionLabel>★ TOP 2026 · recursos de élite GRATIS verificados (por capa del ciclo)</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_RECURSOS_TOP.map((c, i) => (
          <FadeUp key={i} delay={i * 50}>
            <View style={{ marginBottom: Spacing.md }}>
              <Text style={st.recTopCapa}>{c.capa}</Text>
              <View style={{ gap: Spacing.sm }}>
                {c.items.map((it, j) => (
                  <TouchableOpacity key={j} activeOpacity={0.85} onPress={() => openUrl(it.url)} style={st.recTopCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                      <Text style={[st.recTopName, serifTitle]} numberOfLines={2}>{it.label} ↗</Text>
                      <Chip label={it.confianza} color={it.confianza === 'verificado' ? Colors.green : Colors.brass} small />
                    </View>
                    <Text style={st.recTopMeta}>{it.autor}</Text>
                    <Text style={st.recTopWhy}>{it.porQue}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                      <Chip label={it.tipo} color={Colors.muted} small />
                      <Chip label={it.nivel} color={Colors.blue} small />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </FadeUp>
        ))}
      </View>

      {/* MICRO-HORARIO */}
      <SectionLabel>Micro-horario · 1h/día (días Research)</SectionLabel>
      <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.xl }]}>
        {RESEARCH_HORARIO.map((h, i) => (
          <View key={i} style={st.horCard}>
            <Text style={[st.horDia, { color: TEAL }]}>{h.dia}</Text>
            <Text style={st.horFoco}>{h.foco}</Text>
          </View>
        ))}
      </View>

      {/* PIPELINE AGÉNTICO (resumen — detalle en pestaña Sistema) */}
      <SectionLabel>Pipeline agéntico de papers (8 agentes + gates humanos)</SectionLabel>
      <View style={[gridStyle(160), { marginBottom: Spacing.sm }]}>
        {RESEARCH_PIPELINE.map((a) => (
          <View key={a.id} style={gridItemStyle(160)}>
            <View style={st.pipeCard}>
              <Text style={[st.pipeId, { color: TEAL }]}>{a.id}</Text>
              <Text style={[st.pipeName, serifTitle]}>{a.nombre}</Text>
              <Text style={st.pipeDesc}>{a.desc}</Text>
              <Text style={st.pipeTool}>{a.tool}</Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={[st.smallNote, { marginBottom: Spacing.xl }]}>{PIPELINE_NOTA}</Text>

      {/* JOURNALS — biblioteca */}
      <SectionLabel>Journals · empieza por el tier B</SectionLabel>
      <View style={[gridStyle(220), { marginBottom: Spacing.xl }]}>
        {RESEARCH_JOURNALS.map((j, i) => (
          <View key={i} style={gridItemStyle(220)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(j.url)} style={st.jCard}>
              <Text style={[st.jName, serifTitle]}>{j.nombre} ↗</Text>
              <Chip label={j.tier} color={j.tier.startsWith('B') ? Colors.green : j.tier.startsWith('A') ? Colors.brass : Colors.coral} small />
              <Text style={[st.body, { marginTop: 6 }]}>{j.nota}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* TIMELINE */}
      <SectionLabel>Timeline · 0 → primer paper</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_TIMELINE.map((t, i) => (
          <View key={i} style={[st.tlRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={[st.tlBadge, { backgroundColor: TEAL + '1A' }]}><Text style={[st.tlSem, { color: TEAL }]}>{t.sem}</Text></View>
            <Text style={st.tlFoco}>{t.foco}</Text>
            <Text style={st.tlOut}>{t.out}</Text>
          </View>
        ))}
      </GlassPanel>

      {/* ADVERTENCIAS */}
      <SectionLabel>Honestidad (no inventado)</SectionLabel>
      <GlassPanel accent={Colors.brass} style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_ADVERTENCIAS.map((a, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 5 }}>
            <Text style={{ color: Colors.brass }}>•</Text>
            <Text style={[st.body, { flex: 1 }]}>{a}</Text>
          </View>
        ))}
      </GlassPanel>
    </View>
  );
}

export default function ResearchHub({ variant = 'mobile' }: { variant?: 'mobile' | 'desktop' }) {
  const isDesktop = variant === 'desktop';
  const hoy = diaEstudioTipo(new Date());
  const [sub, setSub] = useState<Sub>('hoy');
  useEffect(() => { ensureResearchFonts(); }, []);
  const contentStyle = isDesktop
    ? desktopStyles.centerScrollContent
    : { paddingHorizontal: Spacing.lg, paddingTop: 56, paddingBottom: 110 };
  const meta = SUB_META[sub];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.surface }} contentContainerStyle={contentStyle as any} showsVerticalScrollIndicator={false}>
      <View style={{ position: 'relative' }}>
        <CommandBackdrop />

        {/* MASTHEAD EDITORIAL (reemplaza el GradientHero compartido) */}
        <EditorialMasthead hoy={hoy} />

        <AIFirstPanel segmento="research" accent={TEAL} />

        {/* SUB-NAV tipo revista (subrayado oro) + marca de protocolo del cuaderno */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.sm }}>
          <JournalTabs sub={sub} setSub={setSub} />
          <View style={hd.protoTag}>
            <Text style={hd.protoKicker}>{meta.kicker}</Text>
            <Text style={hd.protoCode}>{meta.proto}</Text>
          </View>
        </View>

        {sub === 'hoy' ? <ResearchTodayPlan />
          : sub === 'sistema' ? <ResearchAgenticSystem />
          : sub === 'lineas' ? <ResearchLinesExplorer />
          : <PanelView />}
      </View>
    </ScrollView>
  );
}

const cardBase = {
  backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg,
  borderWidth: 1, borderColor: Hairline.soft, padding: Spacing.lg, ...Elevation.sm,
};
const WEB_LINK = Platform.OS === 'web' ? ({ cursor: 'pointer', transition: Motion.base } as any) : {};

// ── Masthead editorial ──────────────────────────────────────────────────────
const mh = StyleSheet.create({
  wrap: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Hairline.medium,
    backgroundColor: DesktopColors.glass,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    ...Elevation.md,
  },
  topRule: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingBottom: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Hairline.soft, marginBottom: Spacing.md,
  },
  folio: { fontSize: 9, color: Colors.smallLabel, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase' },
  body: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.lg },
  kicker: { fontSize: 9, color: InkColors.gold, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase' },
  title: { fontSize: 46, color: Colors.onSurface, fontWeight: '600', letterSpacing: -1, marginTop: 2, lineHeight: 50 },
  sub: { fontSize: FontSize.bodyMd, color: InkColors.teal, marginTop: 2, fontWeight: '600', letterSpacing: 0.2 },
  tesis: { fontSize: FontSize.labelLg, color: Colors.onSurfaceVariant, marginTop: Spacing.md, lineHeight: 21, maxWidth: 640 },

  statusCol: { alignItems: 'stretch', gap: Spacing.sm, minWidth: 210 },
  engineChip: {
    flexDirection: 'row', alignItems: 'center', gap: 9,
    borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 11,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  engineDot: { width: 9, height: 9, borderRadius: 5 },
  engineLbl: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  engineSub: { fontSize: 9, color: Colors.muted, marginTop: 2, letterSpacing: 0.2 },

  pipRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: InkColors.gold + '33', borderRadius: BorderRadius.md,
    backgroundColor: InkColors.gold + '0C', paddingVertical: 9, paddingHorizontal: 12,
  },
  pipCell: { flex: 1, alignItems: 'center' },
  pipVal: { fontSize: 26, fontWeight: '800', letterSpacing: -0.5, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },
  pipLbl: { fontSize: 8, color: Colors.smallLabel, fontWeight: '800', letterSpacing: 0.8, marginTop: 2, textAlign: 'center' },
  pipDivider: { width: 1, alignSelf: 'stretch', backgroundColor: Hairline.medium, marginHorizontal: 4 },

  dayChip: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 7, paddingHorizontal: 11,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  dayLbl: { fontSize: 9, color: Colors.smallLabel, fontWeight: '800', letterSpacing: 1.2 },
  dayVal: { fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: -0.2 },

  bottomRuleThick: { height: 2, backgroundColor: InkColors.gold + '66', marginTop: Spacing.md },
  bottomRuleThin: { height: 1, backgroundColor: Hairline.medium, marginTop: 2 },
});

// ── Journal tabs + protocol tag ─────────────────────────────────────────────
const jt = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.lg, alignItems: 'flex-end' },
  tab: { paddingBottom: 6, ...WEB_LINK },
  txt: { fontSize: FontSize.bodyLg, fontWeight: '600', color: Colors.muted, letterSpacing: 0.1 },
  underline: { height: 2, borderRadius: 2, marginTop: 6 },
});
const hd = StyleSheet.create({
  protoTag: { alignItems: 'flex-end', paddingBottom: 6 },
  protoKicker: { fontSize: 8, color: Colors.smallLabel, fontWeight: '800', letterSpacing: 1.4, textTransform: 'uppercase' },
  protoCode: { fontSize: FontSize.labelMd, color: InkColors.gold, fontWeight: '800', letterSpacing: 2, marginTop: 2, fontFamily: ResearchFonts.serif as any },
});

const st = StyleSheet.create({
  h3: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: 6, letterSpacing: -0.2 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.bodyMd },
  desk: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.labelMd, marginBottom: Spacing.md, marginTop: -4 },
  smallNote: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 17 },

  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  ringCard: { flex: 1, minWidth: 140, backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: Hairline.soft, paddingVertical: Spacing.lg, paddingHorizontal: Spacing.md, alignItems: 'center', ...Elevation.sm },

  faseCard: { ...cardBase, borderLeftWidth: 3, minHeight: 150 },
  protoMark: { position: 'absolute', top: 8, right: 12, fontSize: FontSize.labelSm, color: Colors.smallLabel, fontWeight: '800', letterSpacing: 1, opacity: 0.6, fontFamily: ResearchFonts.serif as any },
  faseTag: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.4, textTransform: 'uppercase' },
  faseTitle: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginTop: 5, letterSpacing: -0.2 },
  faseDesc: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 16 },
  faseEntreg: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 8, fontStyle: 'italic', lineHeight: 15 },

  tRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: Hairline.soft, gap: Spacing.sm },
  tName: { fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '700' },
  tPeso: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2 },
  tObj: { width: 60, fontSize: FontSize.bodyLg, fontWeight: '800', textAlign: 'center', letterSpacing: -0.3, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },

  modCard: { ...cardBase, borderLeftWidth: 3, marginBottom: Spacing.sm },
  modName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, flexShrink: 1, letterSpacing: -0.2 },

  maestriaCard: { ...cardBase, borderLeftWidth: 3, marginBottom: Spacing.sm },
  maestriaTitle: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  maestriaAncla: { fontSize: 9, color: InkColors.gold, fontWeight: '800', letterSpacing: 0.6, textTransform: 'uppercase', marginTop: 3, marginBottom: 7 },
  drillBox: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.md, marginTop: 9, backgroundColor: InkColors.gold + '08' },
  drillLbl: { fontSize: 9, fontWeight: '800', color: InkColors.gold, letterSpacing: 1, textTransform: 'uppercase' },
  drillTxt: { fontSize: FontSize.labelMd, color: Colors.onSurface, marginTop: 4, lineHeight: 16 },

  horCard: { flex: 1, minWidth: 120, ...cardBase, padding: Spacing.md },
  horDia: { fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: 0.2 },
  horFoco: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 5, lineHeight: 15 },

  pipeCard: { ...cardBase, padding: Spacing.md, minHeight: 110 },
  pipeId: { fontSize: FontSize.titleMd, fontWeight: '800', opacity: 0.7, letterSpacing: -0.3, fontFamily: ResearchFonts.serif as any },
  pipeName: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface, marginTop: 3, letterSpacing: -0.2 },
  pipeDesc: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 14 },
  pipeTool: { fontSize: 9, color: TEAL, marginTop: 7, fontWeight: '700', letterSpacing: 0.2 },

  jCard: { ...cardBase, ...WEB_LINK },
  jName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, marginBottom: 7, letterSpacing: -0.2 },

  tlRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: Hairline.soft, gap: Spacing.sm },
  tlBadge: { borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 9, minWidth: 64, alignItems: 'center' },
  tlSem: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  tlFoco: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
  tlOut: { fontSize: FontSize.labelSm, color: Colors.onSurface, fontWeight: '600', width: 96, textAlign: 'right' },

  link: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, paddingVertical: 6, paddingHorizontal: 10, maxWidth: '100%', ...WEB_LINK },
  linkText: { fontSize: FontSize.labelSm, color: TEAL, fontWeight: '600', letterSpacing: 0.2 },

  recTopCapa: { fontSize: FontSize.labelMd, fontWeight: '800', color: TEAL, letterSpacing: 0.5, marginBottom: 9, textTransform: 'uppercase' as const },
  recTopCard: { ...cardBase, padding: Spacing.md, borderLeftWidth: 3, borderLeftColor: TEAL, ...WEB_LINK },
  recTopName: { flex: 1, minWidth: 180, fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  recTopMeta: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4 },
  recTopWhy: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 7, lineHeight: 16 },
});
