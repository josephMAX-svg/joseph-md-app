import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform, TextInput } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, gridStyle, gridItemStyle, useHover } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  AGENT_LAYERS, AGENT_ROLES, HITL_CHECKPOINTS, AGENTIC_RESOURCES, AGENTIC_META,
  RESEARCH_LINES, CLUSTER_COLOR, AgentRole,
  DISCOVERY_SOURCES, FULLTEXT_CASCADE, CITATION_PIPELINE, CONTROL_PANEL,
  AGENTE_SECCION, ESTADO_AGENTE, consolaSnapshot, journalStd,
} from '../../lib/researchProgram';
import { researchObsUrlSR, researchObsUrlLine } from '../../lib/obsidianResearchMap';
import {
  supabase,
  getResearchAgentTasks, getResearchEngineState, ResearchEngineState, ResearchAgentTask,
  sendResearchCommand, setResearchRunState, invokeResearchDiscovery, ResearchCmd,
  getResearchPapers, setPaperScreen, resolveFullText, ResearchPaper,
} from '../../lib/supabase';
import { serifTitle, InkColors, OBSIDIAN, ResearchFonts } from './researchTheme';

const OBS = OBSIDIAN; // #9A7BC8 (era #A78BFA)
// Acentos editoriales (joya apagada · tokens). Antes #0FD4A0/#F5A623/#F56342/#2E7CF6 neón.
const GOLD = InkColors.gold;      // #C8A96A — estatus (sellos de gate HITL, manuscrito, SUBMIT)
const BRASS = InkColors.brass;    // #B8934E — en curso
const CORAL = InkColors.coral;    // #C56A5A — crítica/detener
const SAPPHIRE = InkColors.sapphire; // #4F7DD6 — en cola

/** Dictado por voz (Web Speech API · solo web/Chrome-Edge). En native degrada a no-soportado. */
function useVoiceDictation(lang = 'es-PE') {
  const [listening, setListening] = useState(false);
  const recRef = useRef<any>(null);
  const SR = Platform.OS === 'web' && typeof window !== 'undefined'
    ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) : null;
  const supported = !!SR;
  const start = (onText: (t: string) => void) => {
    if (!SR) return;
    try {
      const rec = new SR();
      rec.lang = lang; rec.interimResults = false; rec.continuous = false;
      rec.onresult = (e: any) => { const t = e.results?.[0]?.[0]?.transcript || ''; if (t) onText(t); };
      rec.onend = () => setListening(false);
      rec.onerror = () => setListening(false);
      recRef.current = rec; rec.start(); setListening(true);
    } catch { setListening(false); }
  };
  const stop = () => { try { recRef.current?.stop(); } catch { /* noop */ } setListening(false); };
  return { supported, listening, start, stop };
}

/**
 * ResearchAgenticSystem — "el corazón": orchestrator-worker + HITL para redactar revisiones
 * sistemáticas. Arquitectura por capas, tarjetas de agente expandibles (prompt base real),
 * checkpoints humanos, capa 0 de descubrimiento, y selector de línea que conecta el sistema a
 * la SR viva. Cada link abre un recurso REAL verificado.
 */
const TEAL = InkColors.teal; // #6BB8B0 (era #0FD4A0)
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

// ── FIRMA nº1 · MANUSCRIPT PIPELINE (carriles editoriales) ──────────────────────────────────────
// La SR activa (SR-1) como tarjeta que AVANZA por los carriles de una redacción de revista.
// Los sellos CP-1..CP-4 (gates humanos) se anclan al carril donde ocurren.
type LaneState = 'done' | 'active' | 'todo';
const PIPELINE_STAGES: { key: string; label: string; sub: string; gate?: string }[] = [
  { key: 'idea',    label: 'Idea',        sub: 'gap · pregunta' },
  { key: 'proto',   label: 'Protocolo',   sub: 'PICO · PROSPERO', gate: 'CP-1' },
  { key: 'search',  label: 'Búsqueda',    sub: '5 fuentes · PRISMA-S' },
  { key: 'screen',  label: 'Screening',   sub: 'Rayyan · κ', gate: 'CP-2' },
  { key: 'extract', label: 'Extracción',  sub: 'matriz · RoB' },
  { key: 'synth',   label: 'Síntesis',    sub: 'meta-análisis · GRADE' },
  { key: 'draft',   label: 'Draft',       sub: 'IMRaD · citas', gate: 'CP-3' },
  { key: 'submit',  label: 'Submit',      sub: '.docx · journal', gate: 'CP-4' },
];
// Reparto de estado según el estado de la línea (ilustrativo; el motor real lo sobreescribe vía Supabase).
function stageStates(estado: string): Record<string, LaneState> {
  const order = PIPELINE_STAGES.map((s) => s.key);
  const activeIdx =
    estado === 'completada' ? order.length
    : estado === 'activa' ? order.indexOf('draft')  // SR-1 en redacción (R34–R40)
    : estado === 'pre-protocolo' ? order.indexOf('proto')
    : 0;
  const m: Record<string, LaneState> = {};
  order.forEach((k, i) => { m[k] = i < activeIdx ? 'done' : i === activeIdx ? 'active' : 'todo'; });
  return m;
}
function ManuscriptPipeline({ estado, srTag }: { estado: string; srTag: string }) {
  const states = stageStates(estado);
  return (
    <View style={st.pipeWrap}>
      <View style={st.pipeTrack}>
        {PIPELINE_STAGES.map((s, i) => {
          const stt = states[s.key];
          const isActive = stt === 'active';
          const c = stt === 'done' ? InkColors.jade : isActive ? InkColors.gold : Colors.muted;
          return (
            <React.Fragment key={s.key}>
              <View style={st.laneCol}>
                <View style={[st.laneNode, { borderColor: c + (isActive ? 'CC' : '55'), backgroundColor: c + (isActive ? '1F' : '0A') }, isActive && Elevation.glow(InkColors.gold)]}>
                  <Text style={[st.laneNum, { color: c }]}>{String(i + 1).padStart(2, '0')}</Text>
                  {stt === 'done' && <Text style={[st.laneCheck, { color: InkColors.jade }]}>✓</Text>}
                </View>
                <Text style={[st.laneLabel, serifTitle, { color: isActive ? Colors.onSurface : Colors.onSurfaceVariant }]}>{s.label}</Text>
                <Text style={st.laneSub}>{s.sub}</Text>
                {/* La SR activa viaja como "galera" sobre el carril en curso */}
                {isActive && (
                  <View style={[st.laneCard, { borderColor: InkColors.gold + '66' }]}>
                    <Text style={[st.laneCardTxt, { color: InkColors.gold }]}>{srTag || 'SR-1'} ▸</Text>
                  </View>
                )}
                {/* Sello de gate humano */}
                {s.gate && (
                  <View style={[st.gateSeal, { borderColor: (stt === 'done' ? InkColors.jade : InkColors.gold) + '99' }]}>
                    <Text style={[st.gateSealTxt, { color: stt === 'done' ? InkColors.jade : InkColors.gold }]}>
                      {stt === 'done' ? `✓ ${s.gate}` : s.gate}
                    </Text>
                  </View>
                )}
              </View>
              {i < PIPELINE_STAGES.length - 1 && (
                <View style={[st.laneConnector, { backgroundColor: states[PIPELINE_STAGES[i + 1].key] !== 'todo' ? InkColors.jade + '77' : Hairline.medium }]} />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

// ── FIRMA nº2 · PRISMA 2020 FLOW DIAGRAM (nativo, con counts reales del corpus) ──────────────────
function PrismaBox({ title, n, color, sub }: { title: string; n: number | string; color: string; sub?: string }) {
  return (
    <View style={[st.prismaBox, { borderColor: color + '55' }]}>
      <Text style={st.prismaBoxTitle}>{title}</Text>
      <Text style={[st.prismaBoxN, { color }]}>{n}</Text>
      {sub ? <Text style={st.prismaBoxSub}>{sub}</Text> : null}
    </View>
  );
}
function PrismaFlow({ total, inc, exc, pend }: { total: number; inc: number; exc: number; pend: number }) {
  const screened = total;
  const eligible = Math.max(0, total - exc);
  return (
    <View style={st.prismaWrap}>
      <View style={st.prismaCol}>
        <PrismaBox title="IDENTIFICADOS" n={total} color={InkColors.sapphire} sub="registros · 5 fuentes (dedup DOI)" />
        <Text style={st.prismaArrow}>↓</Text>
        <PrismaBox title="CRIBADOS" n={screened} color={InkColors.teal} sub="título / abstract" />
        <Text style={st.prismaArrow}>↓</Text>
        <PrismaBox title="ELEGIBILIDAD" n={eligible} color={InkColors.brass} sub="texto completo" />
        <Text style={st.prismaArrow}>↓</Text>
        <PrismaBox title="INCLUIDOS" n={inc} color={InkColors.gold} sub="síntesis (SR-1)" />
      </View>
      {/* rama lateral de exclusiones/pendientes (vía separada PRISMA 2020) */}
      <View style={st.prismaSide}>
        <View style={[st.prismaSideBox, { borderColor: InkColors.coral + '44' }]}>
          <Text style={[st.prismaSideN, { color: InkColors.coral }]}>{exc}</Text>
          <Text style={st.prismaSideTxt}>excluidos con motivo</Text>
        </View>
        <View style={[st.prismaSideBox, { borderColor: Colors.muted + '44' }]}>
          <Text style={[st.prismaSideN, { color: Colors.muted }]}>{pend}</Text>
          <Text style={st.prismaSideTxt}>pendientes de cribar</Text>
        </View>
      </View>
    </View>
  );
}

function AgentCard({ a }: { a: AgentRole }) {
  const [open, setOpen] = useState(false);
  const { hovered, hoverProps } = useHover();
  return (
    <View style={[st.agentCard, { borderColor: a.color + (open ? '88' : '33') }, open && Elevation.md, hovered && Platform.OS === 'web' ? ({ borderColor: a.color + '99', transform: [{ translateY: -1 }], ...Elevation.md } as any) : null]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)} {...hoverProps}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 18 }}>{a.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={st.agentName}>{a.nombre}</Text>
            <Text style={st.agentMeta}>{a.capa} · {a.model}</Text>
          </View>
          <Text style={[st.agentToggle, { color: a.color }]}>{open ? 'ocultar prompt ▾' : 'ver prompt ▸'}</Text>
        </View>
        <Text style={st.agentRol}>{a.rol}</Text>
      </TouchableOpacity>
      {open && (
        <View style={[st.promptBox, { borderColor: a.color + '40' }]}>
          <Text style={st.promptLbl}>PROMPT BASE (inglés)</Text>
          <Text style={st.promptTxt}>{a.prompt}</Text>
        </View>
      )}
    </View>
  );
}

export default function ResearchAgenticSystem() {
  const srLines = RESEARCH_LINES.filter((l) => l.srTag);
  const [selLine, setSelLine] = useState<number>(4); // L4 / SR-1 por defecto
  const linea = RESEARCH_LINES.find((l) => l.id === selLine) || RESEARCH_LINES[4];

  // Estado REAL del motor (Supabase) — si hay datos, la consola va "en vivo"; si no, fallback ilustrativo.
  const [live, setLive] = useState<Record<string, string>>({});
  const [tasks, setTasks] = useState<ResearchAgentTask[]>([]);
  const [engine, setEngine] = useState<ResearchEngineState | null>(null);
  const [runState, setRunState] = useState<string>('idle');
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string>('');
  // Documento + feedback por voz
  const [target, setTarget] = useState<string>('orquestador'); // 'orquestador' | agentId
  const [fb, setFb] = useState<string>('');
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const voice = useVoiceDictation();
  const srTag = linea.srTag || '';

  const reload = React.useCallback(() => {
    let on = true;
    getResearchAgentTasks(linea.code).then((rows) => {
      if (!on) return;
      const m: Record<string, string> = {};
      for (const r of rows) m[r.agent] = r.estado;
      setLive(m); setTasks(rows);
    });
    getResearchEngineState().then((s) => { if (on) { setEngine(s); if (s?.run_state) setRunState(s.run_state); } });
    if (srTag) getResearchPapers(srTag).then((p) => { if (on) setPapers(p); });
    return () => { on = false; };
  }, [linea.code, srTag]);
  useEffect(() => reload(), [reload]);

  // Realtime: el corpus/estado aparecen solos cuando la nube termina (sin recargar).
  useEffect(() => {
    const ch = supabase.channel('research-' + linea.code)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'research_papers', filter: `line=eq.${srTag}` }, () => { if (srTag) getResearchPapers(srTag).then(setPapers); })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'research_engine_state' }, () => { getResearchEngineState().then((s) => { setEngine(s); if (s?.run_state) setRunState(s.run_state); }); })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [linea.code, srTag]);

  async function screen(id: string | undefined, decision: 'included' | 'excluded' | 'maybe') {
    if (!id) return;
    setPapers((ps) => ps.map((p) => (p.id === id ? { ...p, screen_status: decision } : p)));
    await setPaperScreen(id, decision);
  }
  async function openPdf(p: ResearchPaper) {
    if (p.pdf_url) { openUrl(p.pdf_url); return; }
    if (!p.doi) return;
    flash('🔓 Buscando PDF de acceso abierto…');
    const r = await resolveFullText(p.doi);
    if (r.pdf_url) { setPapers((ps) => ps.map((x) => (x.id === p.id ? { ...x, pdf_url: r.pdf_url, is_oa: true } : x))); openUrl(r.pdf_url); }
    else flash('Sin OA legal directo · pide al autor o vía HINARI/UNCP (ver DEPLOY_GRATIS).');
  }
  const counts = { inc: papers.filter((p) => p.screen_status === 'included').length, exc: papers.filter((p) => p.screen_status === 'excluded').length, pend: papers.filter((p) => !p.screen_status || p.screen_status === 'pending_human').length };
  const isLive = Object.keys(live).length > 0;
  const outputByAgent: Record<string, string | null | undefined> = {};
  for (const t of tasks) outputByAgent[t.agent] = t.output_md;

  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2600); };
  async function control(rs: 'running' | 'paused' | 'stopped', cmd: ResearchCmd) {
    setBusy(true); setRunState(rs);
    await setResearchRunState(rs, linea.code);
    if (cmd === 'start') {
      flash('▶ Iniciando discovery en la nube…');
      const res = await invokeResearchDiscovery(linea.code); // corre EN LA NUBE (sin PC)
      setBusy(false);
      if (res.ok) { flash(`▶ Listo: ${res.unique ?? ''} papers descubiertos en la nube (sin PC). Revísalos en tu hora de research.`); reload(); }
      else { await sendResearchCommand('start', linea.code); flash('▶ Encolado para tu PC (la nube no respondió; lo recoge el runner).'); }
      return;
    }
    await sendResearchCommand(cmd, linea.code);
    setBusy(false);
    flash(cmd === 'pause' ? '⏸ Pausado.' : '⏹ Detenido (no consume más tokens).');
  }
  async function agentCmd(agent: string, cmd: ResearchCmd) {
    await sendResearchCommand(cmd, linea.code, { agent });
    flash((cmd === 'regenerate' ? '↻ Regenerar ' : '⏹ Parar ') + agent + ' (' + linea.code + ').');
  }
  async function sendFeedback() {
    if (!fb.trim()) return;
    const ag = target === 'orquestador' ? undefined : target;
    await sendResearchCommand('feedback', linea.code, { target, agent: ag, payload: fb.trim() });
    flash('🗣️ Indicación enviada ' + (target === 'orquestador' ? 'al orquestador' : 'a ' + target) + '.');
    setFb('');
  }

  return (
    <View>
      {/* Tesis */}
      <GlassPanel accent={TEAL} style={{ marginBottom: Spacing.lg, padding: Spacing.lg }}>
        <Text style={[st.h3, serifTitle]}>Sistema agéntico de revisiones sistemáticas</Text>
        <Text style={st.body}>{AGENTIC_META.tesis}</Text>
        <Text style={[st.smallNote, { marginTop: Spacing.sm }]}>⏱ {AGENTIC_META.cuandoEntra}</Text>
      </GlassPanel>

      {/* CONTROL BAR — Iniciar / Pausar / Detener (escribe a Supabase; el runner del PC ejecuta) */}
      <View style={st.ctrlBar}>
        <View style={{ flex: 1 }}>
          <Text style={st.ctrlTitle}>Motor · {linea.code}</Text>
          <Text style={st.ctrlState}>
            {runState === 'running' ? '🟢 corriendo' : runState === 'paused' ? '🟡 en pausa' : runState === 'stopped' ? '🔴 detenido' : '⚪ inactivo'}
            {engine?.calendar_block ? ` · ${engine.calendar_block}` : ''}
          </Text>
        </View>
        <TouchableOpacity disabled={busy} activeOpacity={0.85} onPress={() => control('running', 'start')} style={[st.ctrlBtn, { borderColor: TEAL + '88', backgroundColor: TEAL + '18' }]}>
          <Text style={[st.ctrlBtnTxt, { color: TEAL }]}>▶ Iniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={busy} activeOpacity={0.85} onPress={() => control('paused', 'pause')} style={[st.ctrlBtn, { borderColor: BRASS + '88', backgroundColor: BRASS + '14' }]}>
          <Text style={[st.ctrlBtnTxt, { color: BRASS }]}>⏸ Pausar</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={busy} activeOpacity={0.85} onPress={() => control('stopped', 'stop')} style={[st.ctrlBtn, { borderColor: CORAL + '88', backgroundColor: CORAL + '14' }]}>
          <Text style={[st.ctrlBtnTxt, { color: CORAL }]}>⏹ Detener</Text>
        </TouchableOpacity>
      </View>
      <Text style={st.ctrlHint}>
        Pulsa <Text style={{ color: TEAL }}>▶ Iniciar</Text> desde la web (mientras estudias ENCAPS): el discovery corre <Text style={{ color: TEAL }}>en la nube</Text> (Supabase, sin tu PC) y deja el corpus cribado para tu hora de research. La <Text style={{ color: OBS }}>redacción</Text> la haces con Claude Code. <Text style={{ color: CORAL }}>⏹ Detener</Text> = corta al instante.
      </Text>
      {toast ? <View style={st.toast}><Text style={st.toastTxt}>{toast}</Text></View> : null}

      {/* Selector de línea → SR viva */}
      <SectionLabel>Dirige una línea · el sistema escribe su SR</SectionLabel>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: Spacing.sm }}>
        {srLines.map((l) => (
          <TouchableOpacity key={l.id} activeOpacity={0.85} onPress={() => setSelLine(l.id)}
            style={[st.lineChip, selLine === l.id ? { backgroundColor: CLUSTER_COLOR[l.cluster] + '22', borderColor: CLUSTER_COLOR[l.cluster] + '99' } : null]}>
            <Text style={[st.lineChipTxt, selLine === l.id && { color: Colors.onSurface }]}>{l.code} · {l.srTag}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <GlassPanel style={{ marginBottom: Spacing.xl, borderLeftWidth: 3, borderLeftColor: CLUSTER_COLOR[linea.cluster] }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
          <Text style={[st.lineTitle, serifTitle]}>{linea.code} · {linea.nombre}</Text>
          <Chip label={`Mayo ${linea.mayoScore}/40`} color={CLUSTER_COLOR[linea.cluster]} small />
        </View>
        <Text style={[st.body, { marginTop: 6 }]}>📋 SR viva: {linea.srDerivable}</Text>
        <View style={{ flexDirection: 'row', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(linea.pubmedUrl)} style={[st.miniBtn, { borderColor: CLUSTER_COLOR[linea.cluster] + '88' }]}>
            <Text style={[st.miniBtnTxt, { color: CLUSTER_COLOR[linea.cluster] }]}>🔎 Semilla en PubMed ↗</Text>
          </TouchableOpacity>
          {linea.fichaUrl && (
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(linea.fichaUrl!)} style={[st.miniBtn, { borderColor: CLUSTER_COLOR[linea.cluster] + '88' }]}>
              <Text style={[st.miniBtnTxt, { color: CLUSTER_COLOR[linea.cluster] }]}>📄 Paper ancla ↗</Text>
            </TouchableOpacity>
          )}
          {linea.srTag && researchObsUrlSR(linea.srTag) && (
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(researchObsUrlSR(linea.srTag!)!)} style={[st.miniBtn, { borderColor: OBS + '88' }]}>
              <Text style={[st.miniBtnTxt, { color: OBS }]}>◆ Hoja de ruta (Obsidian)</Text>
            </TouchableOpacity>
          )}
          {researchObsUrlLine(linea.id) && (
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(researchObsUrlLine(linea.id)!)} style={[st.miniBtn, { borderColor: OBS + '88' }]}>
              <Text style={[st.miniBtnTxt, { color: OBS }]}>◆ Nota de la línea</Text>
            </TouchableOpacity>
          )}
        </View>
      </GlassPanel>

      {/* FIRMA nº1 · PIPELINE DE MANUSCRITO — la SR activa avanza por los carriles de la redacción */}
      <SectionLabel>Pipeline de manuscrito · {linea.srTag || 'SR-1'} avanza de carril (gates humanos CP-1..CP-4)</SectionLabel>
      <ManuscriptPipeline estado={linea.estado} srTag={linea.srTag || 'SR-1'} />

      {/* FIRMA nº2 · DIAGRAMA DE FLUJO PRISMA 2020 — vivo, con los counts reales del corpus */}
      <SectionLabel>Diagrama de flujo PRISMA 2020 · números reales del corpus</SectionLabel>
      <Text style={st.sectionIntro}>Se rellena con los conteos reales de <Text style={{ color: TEAL, fontWeight: '700' }}>{srTag || 'la SR activa'}</Text> a medida que cribas abajo (identificados → cribados → elegibilidad → incluidos), con su rama de exclusiones. Es el artefacto de reporte del dominio.</Text>
      <PrismaFlow total={papers.length} inc={counts.inc} exc={counts.exc} pend={counts.pend} />

      {/* CORPUS / MATRIZ DE EXTRACCIÓN — lo que descubrió la nube; lo cribas con 1 clic */}
      <SectionLabel>Corpus / matriz de extracción · {srTag} ({papers.length} papers · ✓{counts.inc} ✗{counts.exc} ○{counts.pend})</SectionLabel>
      <Text style={st.sectionIntro}>Lo que dejó el botón ▶ (ordenado por relevancia), como una hoja de extracción tipo Elicit: año · relevancia · fuentes · OA. Críbalo con un clic: ✓ incluir · ~ dudoso · ✗ excluir. PDF abre el acceso abierto legal (Unpaywall, sin Sci-Hub).</Text>
      {papers.length === 0 ? (
        <GlassPanel style={{ marginBottom: Spacing.xl }}><Text style={st.body}>— Vacío. Pulsa <Text style={{ color: TEAL, fontWeight: '800' }}>▶ Iniciar</Text> arriba: la nube descubre los papers y aparecen aquí solos.</Text></GlassPanel>
      ) : (
        <View style={{ marginBottom: Spacing.xl }}>
          {papers.map((p) => {
            const dec = p.screen_status;
            const rel = Math.min(5, p.relevance ?? 0);
            return (
              <View key={p.id || p.doi} style={[st.paperCard, dec === 'included' && { borderLeftColor: TEAL }, dec === 'excluded' && { opacity: 0.5, borderLeftColor: CORAL }, dec === 'maybe' && { borderLeftColor: BRASS }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[st.paperTitle, serifTitle]} numberOfLines={2}>{p.title || p.doi}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3, flexWrap: 'wrap' }}>
                    <Text style={st.paperMeta}>{p.year || '—'}</Text>
                    <Text style={st.relDots}>{'●'.repeat(rel)}<Text style={{ color: 'rgba(255,255,255,0.15)' }}>{'●'.repeat(5 - rel)}</Text></Text>
                    {(p.sources?.length ?? 0) > 1 && <Chip label={`${p.sources!.length} fuentes`} color={CLUSTER_COLOR[linea.cluster]} small />}
                    {p.is_oa && <Chip label="OA" color={TEAL} small />}
                    {p.doi && <TouchableOpacity onPress={() => openUrl('https://doi.org/' + p.doi)}><Text style={st.paperDoi}>DOI ↗</Text></TouchableOpacity>}
                    <TouchableOpacity onPress={() => openPdf(p)}><Text style={[st.paperDoi, { color: OBS }]}>PDF ↗</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  <TouchableOpacity onPress={() => screen(p.id, 'included')} style={[st.scBtn, dec === 'included' && { backgroundColor: TEAL + '22', borderColor: TEAL }]}><Text style={[st.scTxt, { color: TEAL }]}>✓</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => screen(p.id, 'maybe')} style={[st.scBtn, dec === 'maybe' && { backgroundColor: BRASS + '22', borderColor: BRASS }]}><Text style={[st.scTxt, { color: BRASS }]}>~</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => screen(p.id, 'excluded')} style={[st.scBtn, dec === 'excluded' && { backgroundColor: CORAL + '22', borderColor: CORAL }]}><Text style={[st.scTxt, { color: CORAL }]}>✗</Text></TouchableOpacity>
                </View>
              </View>
            );
          })}
          <Text style={st.smallNote}>Cribado de 2 revisores + Kappa = estándar PRISMA; aquí haces tu pase (revisor 1). Lo incluido alimenta la extracción y la redacción.</Text>
        </View>
      )}

      {/* Consola de agentes — quién redacta qué sección (por línea) */}
      <SectionLabel>Consola de agentes · {linea.code} (un líder dirige; cada agente, una sección)</SectionLabel>
      <Text style={st.sectionIntro}>Estándar objetivo: <Text style={{ color: CLUSTER_COLOR[linea.cluster], fontWeight: '700' }}>{journalStd(linea)}</Text>. {isLive ? '🟢 En vivo desde Supabase (research_agent_tasks).' : 'Ilustrativo (sin datos en Supabase para esta línea aún · ver DEPLOY.md).'}</Text>
      {isLive && engine && (engine.papers_today != null || engine.next_checkpoint) && (
        <View style={[st.consoleRow, { borderLeftColor: TEAL }]}>
          <Text style={{ fontSize: 16, width: 26, textAlign: 'center' }}>🛰️</Text>
          <View style={{ flex: 1 }}>
            <Text style={st.consoleSec}>Motor · {engine.active_line || linea.code}</Text>
            <Text style={st.consoleAgent}>{engine.papers_today != null ? `${engine.papers_today} papers descubiertos` : ''}{engine.next_checkpoint ? ` · próximo: ${engine.next_checkpoint}` : ''}{engine.calendar_block ? ` · ${engine.calendar_block}` : ''}</Text>
          </View>
        </View>
      )}
      {(() => {
        const snap = consolaSnapshot(linea.estado);
        return (
          <View style={{ marginBottom: Spacing.xl }}>
            {AGENTE_SECCION.map((a, i) => {
              const e = ESTADO_AGENTE[(live[a.agentId] as keyof typeof ESTADO_AGENTE) || snap[a.agentId] || 'idle'] || ESTADO_AGENTE.idle;
              return (
                <FadeUp key={a.agentId} delay={i * 25}>
                  <View style={[st.consoleRow, { borderLeftColor: a.color }]}>
                    <Text style={{ fontSize: 18, width: 26, textAlign: 'center' }}>{a.icon}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={st.consoleSec}>{a.seccion}</Text>
                      <Text style={st.consoleAgent}>{a.agentId === 'lead' ? 'Orquestador (Lead · Opus) — dirige a los demás' : a.agentId === 'citation' ? 'CitationAgent / QA' : a.agentId === 'assembler' ? 'AssemblerAgent' : a.agentId.charAt(0).toUpperCase() + a.agentId.slice(1) + 'Agent (Sonnet)'}</Text>
                    </View>
                    <View style={[st.estadoChip, { borderColor: e.color + '66', backgroundColor: e.color + '14' }]}>
                      <Text style={[st.estadoIcon, { color: e.color }]}>{e.icon}</Text>
                      <Text style={[st.estadoTxt, { color: e.color }]}>{e.lbl}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => agentCmd(a.agentId, 'regenerate')} style={st.agentBtn} hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}>
                      <Text style={[st.agentBtnTxt, { color: TEAL }]}>↻</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => agentCmd(a.agentId, 'stop')} style={st.agentBtn} hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}>
                      <Text style={[st.agentBtnTxt, { color: CORAL }]}>⏹</Text>
                    </TouchableOpacity>
                  </View>
                </FadeUp>
              );
            })}
            <Text style={st.smallNote}>○ inactivo · ◔ en cola · ◍ redactando · ● listo · ◆ requiere tu visto bueno (checkpoint humano). Botones por sección: ↻ regenerar · ⏹ parar (corta el gasto de ese agente). Los subagentes no se comunican entre sí; el Lead integra y rutea a QA.</Text>
          </View>
        );
      })()}

      {/* DOCUMENTO — dónde redacta cada agente + lee y dicta cambios (voz) */}
      <SectionLabel>Documento · lee cada sección y dicta cambios</SectionLabel>
      <Text style={st.sectionIntro}>Cada agente redacta su sección en Supabase (`research_agent_tasks.output_md`); aquí la lees como un Word. El `.docx` final va a tu Obsidian (`…/05_manuscrito/`). Dale indicaciones por texto o 🎤 voz, al orquestador o a un agente concreto.</Text>
      <View style={{ marginBottom: Spacing.md }}>
        {AGENTE_SECCION.filter((a) => a.agentId !== 'lead').map((a) => {
          const out = outputByAgent[a.agentId];
          return (
            <View key={a.agentId} style={[st.docCard, { borderLeftColor: a.color }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={st.docSec}>{a.icon} {a.seccion}</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { setTarget(a.agentId); flash('Indicaciones dirigidas a ' + a.agentId); }}>
                  <Text style={[st.docAim, { color: target === a.agentId ? TEAL : Colors.muted }]}>{target === a.agentId ? '● dirigido' : 'dictar a este ›'}</Text>
                </TouchableOpacity>
              </View>
              <Text style={st.docBody} numberOfLines={out ? 8 : 2}>{out || '— (vacío hasta que el agente redacte; pulsa ↻ en la consola o ▶ Iniciar)'}</Text>
            </View>
          );
        })}
      </View>
      {/* Caja de feedback + voz */}
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
          <Text style={st.smallNote}>Dirigir a:</Text>
          {['orquestador', ...AGENTE_SECCION.filter((a) => a.agentId !== 'lead').map((a) => a.agentId)].map((t) => (
            <TouchableOpacity key={t} activeOpacity={0.85} onPress={() => setTarget(t)}
              style={[st.aimChip, target === t ? { backgroundColor: TEAL + '22', borderColor: TEAL + '99' } : null]}>
              <Text style={[st.aimChipTxt, target === t && { color: Colors.onSurface }]}>{t === 'orquestador' ? '🧭 orquestador' : t}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6 }}>
          <TextInput value={fb} onChangeText={setFb} multiline placeholder="Ej.: 'En métodos, añade el cálculo de Kappa con IC 95%'…"
            placeholderTextColor={Colors.muted} style={st.fbInput} />
          <View style={{ gap: 6 }}>
            <TouchableOpacity activeOpacity={0.85} disabled={!voice.supported}
              onPress={() => (voice.listening ? voice.stop() : voice.start((t) => setFb((p) => (p ? p + ' ' : '') + t)))}
              style={[st.micBtn, voice.listening && { backgroundColor: CORAL + '22', borderColor: CORAL + '99' }, !voice.supported && { opacity: 0.4 }]}>
              <Text style={[st.micTxt, voice.listening && { color: CORAL }]}>{voice.listening ? '● grabando' : '🎤 voz'}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.85} onPress={sendFeedback} style={st.sendBtn}>
              <Text style={st.sendTxt}>Enviar ›</Text>
            </TouchableOpacity>
          </View>
        </View>
        {!voice.supported && <Text style={[st.smallNote, { marginTop: 6 }]}>🎤 El dictado por voz funciona en la web (Chrome/Edge). En móvil usa el micrófono del teclado.</Text>}
      </GlassPanel>

      {/* Arquitectura por capas (flujo) */}
      <SectionLabel>Arquitectura · orchestrator-worker + HITL</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {AGENT_LAYERS.map((cap, i) => (
          <FadeUp key={cap.capa} delay={i * 50}>
            <View>
              <View style={[st.layerCard, { borderLeftColor: cap.color }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ fontSize: 20 }}>{cap.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={[st.layerCapa, { color: cap.color }]}>{cap.capa}</Text>
                      <Text style={st.layerTitle}>{cap.titulo}</Text>
                    </View>
                    <Text style={st.layerDesc}>{cap.desc}</Text>
                  </View>
                </View>
              </View>
              {i < AGENT_LAYERS.length - 1 && <Text style={st.arrow}>↓</Text>}
            </View>
          </FadeUp>
        ))}
      </View>

      {/* Motor de descubrimiento — 5 fuentes */}
      <SectionLabel>Motor de descubrimiento · 5 fuentes (≈97% sensibilidad)</SectionLabel>
      <Text style={st.sectionIntro}>El motor NO se limita a PubMed. Corre async sobre 5 fuentes con OpenAlex como troncal, deduplica por DOI y deja el corpus listo antes del bloque de research.</Text>
      <View style={{ marginBottom: Spacing.xl }}>
        {DISCOVERY_SOURCES.map((s, i) => (
          <FadeUp key={s.nombre} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(s.url)} style={[st.srcCard, s.troncal && { borderColor: TEAL + '88', backgroundColor: TEAL + '0E' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                <Text style={st.srcName}>{s.troncal ? '⭐ ' : ''}{s.nombre} ↗</Text>
                <Text style={st.srcCov}>{s.cobertura}</Text>
              </View>
              <Text style={st.srcRol}>{s.rol}</Text>
              <Text style={st.srcAuth}>🔑 {s.auth}</Text>
            </TouchableOpacity>
          </FadeUp>
        ))}
      </View>

      {/* Cascada de texto completo */}
      <SectionLabel>Cascada de texto completo (legal primero)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {FULLTEXT_CASCADE.map((c, i) => (
          <View key={c.n} style={[st.cascRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={[st.cascNum, { backgroundColor: OBS + '1A' }]}><Text style={[st.cascNumTxt, { color: OBS }]}>{c.n}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={st.cascName}>{c.fuente}</Text>
              <Text style={st.cascNota}>{c.nota}</Text>
            </View>
          </View>
        ))}
      </GlassPanel>

      {/* Citas con IA (reemplaza Zotero) */}
      <SectionLabel>Citas con IA · reemplaza Zotero (gate anti-alucinación)</SectionLabel>
      <Text style={st.sectionIntro}>Joseph no cita a mano: la IA propone, pero solo persiste lo que resuelve a un DOI/PMID real (Crossref/PubMed + CSL-JSON verificado).</Text>
      <View style={{ marginBottom: Spacing.xl }}>
        {CITATION_PIPELINE.map((p, i) => (
          <FadeUp key={i} delay={i * 30}>
            <View style={[st.citCard, { borderLeftColor: CORAL }]}>
              <Text style={st.citPaso}>{p.paso}</Text>
              <Text style={st.citDet}>{p.detalle}</Text>
            </View>
          </FadeUp>
        ))}
      </View>

      {/* Agentes (prompts base) */}
      <SectionLabel>Agentes · toca para ver su prompt base</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {AGENT_ROLES.map((a, i) => <FadeUp key={a.id} delay={i * 40}><AgentCard a={a} /></FadeUp>)}
      </View>

      {/* Checkpoints HITL */}
      <SectionLabel>Checkpoints humanos (HITL) · imposibles de saltar</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {HITL_CHECKPOINTS.map((c, i) => (
          <View key={c.id} style={[st.cpRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={[st.cpBadge, { backgroundColor: Colors.amber + '1A' }]}><Text style={[st.cpId, { color: Colors.amber }]}>{c.id}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={st.cpDespues}>tras {c.despues}</Text>
              <Text style={st.cpVerifica}>{c.verifica}</Text>
            </View>
          </View>
        ))}
        <Text style={st.smallNote}>Gate duro en CP-3: el ensamblado no corre mientras exista una sola cita [NO VERIFICABLE] sin resolver.</Text>
      </GlassPanel>

      {/* Panel de control — lo que hace esta app (Manual §14) */}
      <SectionLabel>Panel de control · lo que opera esta app</SectionLabel>
      <Text style={st.sectionIntro}>La app es la capa de visualización y control del motor que corre 24/7 en el VPS: en 1 h de research, Joseph valida los checkpoints y deja el sistema corriendo.</Text>
      <View style={[gridStyle(220), { marginBottom: Spacing.xl }]}>
        {CONTROL_PANEL.map((f, i) => (
          <View key={i} style={gridItemStyle(220)}>
            <View style={st.cpCard}>
              <Text style={{ fontSize: 20 }}>{f.icon}</Text>
              <Text style={st.cpTitle}>{f.titulo}</Text>
              <Text style={st.cpDesc}>{f.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Recursos verificados */}
      <SectionLabel>Fuentes verificadas</SectionLabel>
      <View style={[gridStyle(240), { marginBottom: Spacing.xl }]}>
        {AGENTIC_RESOURCES.map((r, i) => (
          <View key={i} style={gridItemStyle(240)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(r.url)} style={st.resCard}>
              <Text style={st.resTxt} numberOfLines={2}>🔗 {r.label} ↗</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, ...Elevation.sm };
const WEB_LINK = Platform.OS === 'web' ? ({ cursor: 'pointer', transition: Motion.base } as any) : {};
const st = StyleSheet.create({
  h3: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: 6, letterSpacing: -0.2 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.bodyMd },
  smallNote: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 17 },

  lineChip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Hairline.medium, backgroundColor: 'rgba(255,255,255,0.03)', ...WEB_LINK },
  lineChipTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted, letterSpacing: 0.2 },
  lineTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flexShrink: 1, letterSpacing: -0.2 },
  miniBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 7, paddingHorizontal: 12, ...WEB_LINK },
  miniBtnTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },

  layerCard: { ...cardBase, borderLeftWidth: 3, padding: Spacing.md },
  layerCapa: { fontSize: FontSize.labelMd, fontWeight: '900', letterSpacing: 0.4, textTransform: 'uppercase' },
  layerTitle: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, flexShrink: 1, letterSpacing: -0.2 },
  layerDesc: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 17 },
  arrow: { textAlign: 'center', color: Colors.muted, fontSize: 16, marginVertical: 2 },

  agentCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: 6, ...WEB_LINK },
  agentName: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  agentMeta: { fontSize: 9, color: Colors.muted, marginTop: 2, letterSpacing: 0.3 },
  agentToggle: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  agentRol: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 7, lineHeight: 16 },
  promptBox: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.md, marginTop: 9, backgroundColor: 'rgba(255,255,255,0.02)' },
  promptLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.7, textTransform: 'uppercase', marginBottom: 5 },
  promptTxt: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, lineHeight: 16, fontStyle: 'italic' },

  cpRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: Hairline.soft },
  cpBadge: { borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 9, minWidth: 50, alignItems: 'center' },
  cpId: { fontSize: FontSize.labelMd, fontWeight: '900', letterSpacing: 0.2 },
  cpDespues: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '700' },
  cpVerifica: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 3, lineHeight: 15 },

  resCard: { ...cardBase, padding: Spacing.md, ...WEB_LINK },
  resTxt: { fontSize: FontSize.labelMd, color: TEAL, fontWeight: '600', lineHeight: 16 },

  sectionIntro: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.labelMd, marginBottom: Spacing.md, marginTop: -4 },

  srcCard: { ...cardBase, padding: Spacing.md, marginBottom: 6, ...WEB_LINK },
  srcName: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flexShrink: 1, letterSpacing: -0.2 },
  srcCov: { fontSize: FontSize.labelSm, color: TEAL, fontWeight: '700', letterSpacing: 0.2 },
  srcRol: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 6, lineHeight: 16 },
  srcAuth: { fontSize: 9, color: Colors.muted, marginTop: 6, letterSpacing: 0.3 },

  cascRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: Hairline.soft },
  cascNum: { borderRadius: BorderRadius.full, width: 26, height: 26, alignItems: 'center', justifyContent: 'center' },
  cascNumTxt: { fontSize: FontSize.labelMd, fontWeight: '900' },
  cascName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  cascNota: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 3, lineHeight: 15 },

  citCard: { ...cardBase, borderLeftWidth: 3, padding: Spacing.md, marginBottom: 6 },
  citPaso: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  citDet: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 16 },

  cpCard: { ...cardBase, padding: Spacing.md, minHeight: 120 },
  cpTitle: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, marginTop: 7, letterSpacing: -0.2 },
  cpDesc: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 15 },

  consoleRow: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 6 },
  consoleSec: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  consoleAgent: { fontSize: 9, color: Colors.muted, marginTop: 2, letterSpacing: 0.3 },
  estadoChip: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 4, paddingHorizontal: 9 },
  estadoIcon: { fontSize: 12, fontWeight: '900' },
  estadoTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },

  ctrlBar: { ...cardBase, flexDirection: 'row', alignItems: 'center', gap: 8, padding: Spacing.md, marginBottom: 6, flexWrap: 'wrap', ...Elevation.md },
  ctrlTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  ctrlState: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 3 },
  ctrlBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 12, ...WEB_LINK },
  ctrlBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },
  ctrlHint: { fontSize: FontSize.labelSm, color: Colors.muted, lineHeight: 16, marginBottom: Spacing.md },
  toast: { ...cardBase, borderColor: TEAL + '66', padding: Spacing.md, marginBottom: Spacing.md, ...Elevation.glow(TEAL) },
  toastTxt: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },

  agentBtn: { width: 26, height: 26, borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Hairline.soft, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)', ...WEB_LINK },
  agentBtnTxt: { fontSize: 14, fontWeight: '900' },

  docCard: { ...cardBase, borderLeftWidth: 3, padding: Spacing.md, marginBottom: 6 },
  docSec: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  docAim: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2, ...WEB_LINK },
  docBody: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 7, lineHeight: 17 },
  aimChip: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Hairline.medium, backgroundColor: 'rgba(255,255,255,0.03)', ...WEB_LINK },
  aimChipTxt: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.muted, letterSpacing: 0.2 },
  fbInput: { flex: 1, minHeight: 60, ...cardBase, padding: Spacing.sm, color: Colors.onSurface, fontSize: FontSize.labelMd, textAlignVertical: 'top' as any },
  micBtn: { borderWidth: 1, borderColor: Hairline.strong, borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 10, alignItems: 'center', minWidth: 84, ...WEB_LINK },
  micTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.onSurfaceVariant, letterSpacing: 0.2 },
  sendBtn: { backgroundColor: TEAL, borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 10, alignItems: 'center', minWidth: 84, ...Elevation.glow(TEAL), ...WEB_LINK },
  sendTxt: { fontSize: FontSize.labelSm, fontWeight: '900', color: '#05201F', letterSpacing: 0.2 },

  paperCard: { ...cardBase, borderLeftWidth: 3, borderLeftColor: Hairline.medium, flexDirection: 'row', alignItems: 'center', gap: 8, padding: Spacing.md, marginBottom: 5, ...(Platform.OS === 'web' ? ({ transition: Motion.base } as any) : {}) },
  paperTitle: { fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.onSurface, lineHeight: 16 },
  paperMeta: { fontSize: 9, color: Colors.muted, fontWeight: '700', letterSpacing: 0.2 },
  relDots: { fontSize: 9, color: BRASS, letterSpacing: 1 },
  paperDoi: { fontSize: 9, color: Colors.smallLabel, fontWeight: '800', letterSpacing: 0.3, ...WEB_LINK },
  scBtn: { width: 28, height: 28, borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Hairline.medium, alignItems: 'center', justifyContent: 'center', ...WEB_LINK },
  scTxt: { fontSize: 15, fontWeight: '900' },

  // ── Manuscript pipeline (carriles editoriales) ──
  pipeWrap: { ...cardBase, padding: Spacing.md, marginBottom: Spacing.xl },
  pipeTrack: { flexDirection: 'row', alignItems: 'flex-start', flexWrap: Platform.OS === 'web' ? ('nowrap' as any) : 'wrap', gap: Platform.OS === 'web' ? 0 : 8 },
  laneCol: { alignItems: 'center', minWidth: 78, flexGrow: 1, flexBasis: 78, paddingTop: 2 },
  laneNode: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  laneNum: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.3, fontFamily: ResearchFonts.serif as any },
  laneCheck: { position: 'absolute', bottom: -3, right: -3, fontSize: 11, fontWeight: '900' },
  laneLabel: { fontSize: FontSize.labelMd, fontWeight: '700', marginTop: 7, letterSpacing: -0.1, textAlign: 'center' },
  laneSub: { fontSize: 8, color: Colors.muted, marginTop: 2, textAlign: 'center', letterSpacing: 0.2, lineHeight: 11 },
  laneCard: { marginTop: 6, borderWidth: 1, borderRadius: BorderRadius.sm, paddingVertical: 2, paddingHorizontal: 7, backgroundColor: InkColors.gold + '12' },
  laneCardTxt: { fontSize: 9, fontWeight: '900', letterSpacing: 0.4 },
  gateSeal: { marginTop: 6, borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 7, backgroundColor: 'rgba(255,255,255,0.02)' },
  gateSealTxt: { fontSize: 8, fontWeight: '900', letterSpacing: 0.6 },
  laneConnector: { height: 2, flexGrow: 1, flexBasis: 8, minWidth: 8, marginTop: 20, borderRadius: 1 },

  // ── PRISMA 2020 flow ──
  prismaWrap: { ...cardBase, padding: Spacing.lg, marginBottom: Spacing.xl, flexDirection: 'row', gap: Spacing.lg, flexWrap: 'wrap' },
  prismaCol: { flex: 1, minWidth: 200, alignItems: 'stretch' },
  prismaBox: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: 'rgba(255,255,255,0.02)' },
  prismaBoxTitle: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1, textTransform: 'uppercase' },
  prismaBoxN: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5, marginTop: 2, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },
  prismaBoxSub: { fontSize: 9, color: Colors.muted, marginTop: 1, letterSpacing: 0.2 },
  prismaArrow: { textAlign: 'center', color: Colors.muted, fontSize: 15, marginVertical: 3 },
  prismaSide: { justifyContent: 'center', gap: Spacing.sm, minWidth: 140 },
  prismaSideBox: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 9, paddingHorizontal: 12, backgroundColor: 'rgba(255,255,255,0.02)' },
  prismaSideN: { fontSize: 18, fontWeight: '800', letterSpacing: -0.3, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },
  prismaSideTxt: { fontSize: 9, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 12 },
});
