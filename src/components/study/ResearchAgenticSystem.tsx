import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform, TextInput } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
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
  getResearchAgentTasks, getResearchEngineState, ResearchEngineState, ResearchAgentTask,
  sendResearchCommand, setResearchRunState, ResearchCmd,
} from '../../lib/supabase';

const OBS = '#A78BFA';

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
const TEAL = '#0FD4A0';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

function AgentCard({ a }: { a: AgentRole }) {
  const [open, setOpen] = useState(false);
  const { hovered, hoverProps } = useHover();
  return (
    <View style={[st.agentCard, { borderColor: a.color + (open ? '88' : '33') }, hovered ? { borderColor: a.color + '99' } : null]}>
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
  const voice = useVoiceDictation();

  const reload = React.useCallback(() => {
    let on = true;
    getResearchAgentTasks(linea.code).then((rows) => {
      if (!on) return;
      const m: Record<string, string> = {};
      for (const r of rows) m[r.agent] = r.estado;
      setLive(m); setTasks(rows);
    });
    getResearchEngineState().then((s) => { if (on) { setEngine(s); if (s?.run_state) setRunState(s.run_state); } });
    return () => { on = false; };
  }, [linea.code]);
  useEffect(() => reload(), [reload]);
  const isLive = Object.keys(live).length > 0;
  const outputByAgent: Record<string, string | null | undefined> = {};
  for (const t of tasks) outputByAgent[t.agent] = t.output_md;

  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2600); };
  async function control(rs: 'running' | 'paused' | 'stopped', cmd: ResearchCmd) {
    setBusy(true); setRunState(rs);
    await setResearchRunState(rs, linea.code);
    await sendResearchCommand(cmd, linea.code);
    setBusy(false);
    flash(cmd === 'start' ? '▶ Motor iniciado para ' + linea.code + ' (lo recoge el runner del PC).'
      : cmd === 'pause' ? '⏸ Pausado.' : '⏹ Detenido (no consume más tokens).');
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
        <Text style={st.h3}>🧬 Sistema agéntico de revisiones sistemáticas</Text>
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
        <TouchableOpacity disabled={busy} activeOpacity={0.85} onPress={() => control('running', 'start')} style={[st.ctrlBtn, { borderColor: '#0FD4A0' + '88', backgroundColor: '#0FD4A0' + '18' }]}>
          <Text style={[st.ctrlBtnTxt, { color: '#0FD4A0' }]}>▶ Iniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={busy} activeOpacity={0.85} onPress={() => control('paused', 'pause')} style={[st.ctrlBtn, { borderColor: '#F5A623' + '88', backgroundColor: '#F5A623' + '14' }]}>
          <Text style={[st.ctrlBtnTxt, { color: '#F5A623' }]}>⏸ Pausar</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={busy} activeOpacity={0.85} onPress={() => control('stopped', 'stop')} style={[st.ctrlBtn, { borderColor: '#F56342' + '88', backgroundColor: '#F56342' + '14' }]}>
          <Text style={[st.ctrlBtnTxt, { color: '#F56342' }]}>⏹ Detener</Text>
        </TouchableOpacity>
      </View>
      <Text style={st.ctrlHint}>
        Pulsa <Text style={{ color: '#0FD4A0' }}>▶ Iniciar</Text> en la mañana (mientras estudias ENCAPS): el motor descubre/criba en tu PC y para al llegar tu hora de research. Sigue al día siguiente solo si dejas la PC encendida. <Text style={{ color: '#F56342' }}>⏹ Detener</Text> = corta el gasto de tokens al instante.
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
          <Text style={st.lineTitle}>{linea.code} · {linea.nombre}</Text>
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
                      <Text style={[st.agentBtnTxt, { color: '#0FD4A0' }]}>↻</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => agentCmd(a.agentId, 'stop')} style={st.agentBtn} hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}>
                      <Text style={[st.agentBtnTxt, { color: '#F56342' }]}>⏹</Text>
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
                  <Text style={[st.docAim, { color: target === a.agentId ? '#0FD4A0' : Colors.muted }]}>{target === a.agentId ? '● dirigido' : 'dictar a este ›'}</Text>
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
              style={[st.aimChip, target === t ? { backgroundColor: '#0FD4A0' + '22', borderColor: '#0FD4A0' + '99' } : null]}>
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
              style={[st.micBtn, voice.listening && { backgroundColor: '#F56342' + '22', borderColor: '#F56342' + '99' }, !voice.supported && { opacity: 0.4 }]}>
              <Text style={[st.micTxt, voice.listening && { color: '#F56342' }]}>{voice.listening ? '● grabando' : '🎤 voz'}</Text>
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
            <View style={[st.cascNum, { backgroundColor: '#A78BFA1A' }]}><Text style={[st.cascNumTxt, { color: '#A78BFA' }]}>{c.n}</Text></View>
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
            <View style={[st.citCard, { borderLeftColor: '#F56342' }]}>
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

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder };
const st = StyleSheet.create({
  h3: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: 6 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 19 },
  smallNote: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 17 },

  lineChip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.03)' },
  lineChipTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted },
  lineTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flexShrink: 1 },
  miniBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 11 },
  miniBtnTxt: { fontSize: FontSize.labelSm, fontWeight: '800' },

  layerCard: { ...cardBase, borderLeftWidth: 3, padding: Spacing.md },
  layerCapa: { fontSize: FontSize.labelMd, fontWeight: '900', letterSpacing: 0.3 },
  layerTitle: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, flexShrink: 1 },
  layerDesc: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 17 },
  arrow: { textAlign: 'center', color: Colors.muted, fontSize: 16, marginVertical: 2 },

  agentCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: 6 },
  agentName: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface },
  agentMeta: { fontSize: 9, color: Colors.muted, marginTop: 1, letterSpacing: 0.3 },
  agentToggle: { fontSize: FontSize.labelSm, fontWeight: '800' },
  agentRol: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 6, lineHeight: 16 },
  promptBox: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.sm, marginTop: 8, backgroundColor: 'rgba(255,255,255,0.02)' },
  promptLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, marginBottom: 4 },
  promptTxt: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, lineHeight: 16, fontStyle: 'italic' },

  cpRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  cpBadge: { borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 9, minWidth: 50, alignItems: 'center' },
  cpId: { fontSize: FontSize.labelMd, fontWeight: '900' },
  cpDespues: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '700' },
  cpVerifica: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 15 },

  resCard: { ...cardBase, padding: Spacing.md },
  resTxt: { fontSize: FontSize.labelMd, color: TEAL, fontWeight: '600', lineHeight: 16 },

  sectionIntro: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17, marginBottom: Spacing.md, marginTop: -4 },

  srcCard: { ...cardBase, padding: Spacing.md, marginBottom: 6 },
  srcName: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flexShrink: 1 },
  srcCov: { fontSize: FontSize.labelSm, color: TEAL, fontWeight: '700' },
  srcRol: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 5, lineHeight: 16 },
  srcAuth: { fontSize: 9, color: Colors.muted, marginTop: 5, letterSpacing: 0.2 },

  cascRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  cascNum: { borderRadius: BorderRadius.full, width: 26, height: 26, alignItems: 'center', justifyContent: 'center' },
  cascNumTxt: { fontSize: FontSize.labelMd, fontWeight: '900' },
  cascName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  cascNota: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 15 },

  citCard: { ...cardBase, borderLeftWidth: 3, padding: Spacing.md, marginBottom: 6 },
  citPaso: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface },
  citDet: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 3, lineHeight: 16 },

  cpCard: { ...cardBase, padding: Spacing.md, minHeight: 120 },
  cpTitle: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, marginTop: 6 },
  cpDesc: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 15 },

  consoleRow: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 6 },
  consoleSec: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  consoleAgent: { fontSize: 9, color: Colors.muted, marginTop: 1, letterSpacing: 0.2 },
  estadoChip: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 4, paddingHorizontal: 9 },
  estadoIcon: { fontSize: 12, fontWeight: '900' },
  estadoTxt: { fontSize: FontSize.labelSm, fontWeight: '800' },

  ctrlBar: { ...cardBase, flexDirection: 'row', alignItems: 'center', gap: 8, padding: Spacing.md, marginBottom: 6, flexWrap: 'wrap' },
  ctrlTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface },
  ctrlState: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2 },
  ctrlBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 12 },
  ctrlBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800' },
  ctrlHint: { fontSize: FontSize.labelSm, color: Colors.muted, lineHeight: 16, marginBottom: Spacing.md },
  toast: { ...cardBase, borderColor: '#0FD4A0' + '66', padding: Spacing.sm, marginBottom: Spacing.md },
  toastTxt: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },

  agentBtn: { width: 26, height: 26, borderRadius: BorderRadius.sm, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)' },
  agentBtnTxt: { fontSize: 14, fontWeight: '900' },

  docCard: { ...cardBase, borderLeftWidth: 3, padding: Spacing.md, marginBottom: 6 },
  docSec: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  docAim: { fontSize: FontSize.labelSm, fontWeight: '800' },
  docBody: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 6, lineHeight: 17 },
  aimChip: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.03)' },
  aimChipTxt: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.muted },
  fbInput: { flex: 1, minHeight: 60, ...cardBase, padding: Spacing.sm, color: Colors.onSurface, fontSize: FontSize.labelMd, textAlignVertical: 'top' as any },
  micBtn: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)', borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 10, alignItems: 'center', minWidth: 84 },
  micTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.onSurfaceVariant },
  sendBtn: { backgroundColor: '#0FD4A0', borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 10, alignItems: 'center', minWidth: 84 },
  sendTxt: { fontSize: FontSize.labelSm, fontWeight: '900', color: '#062018' },
});
