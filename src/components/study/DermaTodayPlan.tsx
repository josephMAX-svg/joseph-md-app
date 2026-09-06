import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform, TextInput } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp, RingStat } from '../empresa/visuals';
import {
  DERMA_DAILY_META, DERMA_FRANJAS, DERMA_DIAS, DERMA_TIER_INFO, DERMA_PROMIR_DIAS,
  DiaDerma, DermaBloqueKey, DermaTier, dermaDiaPrevio, dermaVentana7, diaEstudioTipo, dermaCasoArea,
} from '../../lib/dermaDailyPlan';
import { VUELTAS, INTERVALOS, type Prioridad } from '../../lib/researchData';
import { agruparProgreso, progresoGlobal, planHoyD, GrupoProgreso, loadDone, saveDone } from '../../lib/studyProgress';
import { DermaAtlas, SKIN_TONES, SkinTone, DERMA_NOTEBOOKLM } from '../../lib/dermaData';
import { dermaCasoEstado, dermaPctCiego, dermaLedgerExportJSON, type DermaFuente } from '../../lib/dermaLedger';
import { dermaCerebroDe, DERMA_DRILL_DIAS } from '../../lib/dermaCerebro';
import { dermaObsUrlDay, dermaObsUrlBlock } from '../../lib/obsidianDermaMap';
import DermaClinicalPlate from '../derma/DermaClinicalPlate';
import DermaTriptych from '../derma/DermaTriptych';
import DermaDifferentialTray from '../derma/DermaDifferentialTray';
import DermaLineIcon from '../derma/DermaLineIcons';
import DermaMorphologyDictation from '../derma/DermaMorphologyDictation';
import DermaCasoRegistro from '../derma/DermaCasoRegistro';
import DermaCerebroCard from '../derma/DermaCerebroCard';
import DermaEmergencyDrill from '../derma/DermaEmergencyDrill';
import DermaCheckpointPanel, { DERMA_CHECKPOINT_DIAS } from '../derma/DermaCheckpointPanel';
import DermaMir10Q from '../derma/DermaMir10Q';
import DermaAnkiCola from '../derma/DermaAnkiCola';
import { useDermaLedger, dermaHoyISO, dermaCopiar, dermaDescargar, dermaEsViernes, DERMA_AREA_LABEL, DERMA_AREA_COLOR } from '../derma/dermaLedgerBus';

/**
 * DermaTodayPlan — Plan Derma día-a-día PLAN ÉLITE v2.1 (70 sesiones: 46 board + 22 estética
 * + 2 checkpoint), mismo motor que Usmle/Mir/ResearchTodayPlan: nav ◄► Día X/70,
 * sub-pestañas HOY/Horario/7d/Temario, progreso REAL marcable (localStorage 'derma'),
 * interdiario con Research. Cada sesión (ciclo único de 45′) = 2 casos CIEGOS fijos (casoIds,
 * permutación de los 200 de "Cases for Board Review") + 1 imagen dermatoscópica ciega + ~10Q review
 * del banco rotante (1 de cada 3 sesiones = 10Q MIR del capítulo ProMIR → mirEvalLog) + 10′ lectura
 * (o módulo DermNet Dermoscopy CME en las pares d6-d44). Bloque Calendar 13:30–14:15.
 *
 * CAPA PALMERTON cableada (5-sep-2026): paso ① DermaMorphologyDictation (8 ejes + gate A) · registro por
 * caso DermaCasoRegistro (matriz confianza×acierto + módulo CORE + tipo de error → dermaLedger) ·
 * DermaCerebroCard (7 pasos, modo recitar) cuando el átomo tiene ficha · DermaEmergencyDrill (HDPH 90 s)
 * en d19/d20/d46/d70 · DermaCheckpointPanel en d45/d46/d69/d70 (lee el ledger) · chips "alimenta SR-1/SR-2"
 * y "Nítida" · ANKI → APEX::DERMA::<bloque> + cola TSV · ◆ Obsidian (rama 10_DERMATOLOGIA) · export del ledger.
 */
const PURPLE = DermaAtlas.amethyst; // #9A7BC8 amatista (antes #8B5CF6 fosforescente)
const TEAL = DermaAtlas.jade;        // #5FA88C jade (antes #0FD4A0 neón)
const EDGE = DermaAtlas.edge;        // #5B8FB0 zafiro apagado (antes #3DA5E0)
const GOLD = DermaAtlas.gold;        // #C8A96A élite / no-errar
const OBS = '#A78BFA';               // ◆ Obsidian (mismo tono que MIR/USMLE/ENCAPS/Research)
const MIR_AMBER = '#F5A623';         // ámbar España (chip MIR 10Q)
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function openEdge(u: string) { Linking.openURL('microsoft-edge:' + u).catch(() => openUrl(u)); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return DERMA_DAILY_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}

/** Color por bloque (A–H board · Z cierre · X estética) — paleta JOYA apagada, sin neón. */
const BLOQUE_COLOR: Record<DermaBloqueKey, string> = {
  A: '#C56A5A', // fundamentos — terracota
  B: '#B08AC0', // genoderma/pediátrica — malva
  C: '#B8934E', // infecciosas — brass
  D: '#C56A5A', // neoplasias — terracota (crítico)
  E: '#7C83D6', // dermatopatología — periwinkle
  F: '#6BB8B0', // cirugía — teal
  G: '#5FA88C', // farmacología — jade
  H: '#9A7BC8', // medical amplio — amatista
  Z: '#C8A96A', // cierre board — oro
  X: '#9A7BC8', // estética — amatista
};
/** Tier del plan → prioridad del motor de vueltas compartido (ENCAPS/Research). */
const TIER_PRIO: Record<DermaTier, Prioridad> = { CRIT: 'CRITICA', ALTA: 'ALTA', MED: 'MEDIA' };
const bc = (d: DiaDerma) => BLOQUE_COLOR[d.bKey];
/** Fuente del ledger para el banco de review de la sesión (por resourceid REAL de AccessDerma). */
function bancoFuente(url: string | undefined): DermaFuente {
  if (!url) return 'pictorial';
  if (url.includes('resourceid=3479')) return 'core';
  if (url.includes('resourceid=2865')) return 'barnhill';
  if (url.includes('resourceid=3562')) return 'qotw';
  return 'pictorial';
}
const casosTxt = (dia: DiaDerma) => dia.casoIds.map((id) => `#${id} ${DERMA_AREA_LABEL[dermaCasoArea(id)]}`).join(' + ');

type ColaIconName = 'read' | 'flask' | 'atlas' | 'body' | 'differential' | 'dermatoscope' | 'layers';
const COLA_ICON: Record<ColaIconName, React.ComponentProps<typeof DermaLineIcon>['name']> = {
  read: 'atlas', flask: 'flask', atlas: 'atlas', body: 'body', differential: 'differential', dermatoscope: 'dermatoscope', layers: 'skinLayers',
};
/** Ítem de la cola: link real; `edge` añade el botón Microsoft Edge (Qbankly); `action` añade un botón secundario. */
function ColaItem({ icon, lbl, val, sub, color, url, edge, action, actionOn, dim }: {
  icon: ColaIconName; lbl: string; val: string; sub: string; color: string; url: string; edge?: boolean;
  action?: { lbl: string; onPress: () => void }; actionOn?: boolean; dim?: boolean;
}) {
  return (
    <View style={[st.cola, { borderLeftColor: color }, dim && { opacity: 0.72 }]}>
      <View style={st.colaIconBox}><DermaLineIcon name={COLA_ICON[icon]} size={18} color={color} /></View>
      <View style={{ flex: 1 }}>
        <Text style={st.colaLbl}>{lbl}</Text>
        <Text style={st.colaVal} numberOfLines={2}>{val}</Text>
        <Text style={st.colaSub} numberOfLines={3}>{sub}</Text>
      </View>
      <View style={{ gap: 5, minWidth: 64 }}>
        {edge && (
          <TouchableOpacity activeOpacity={0.85} onPress={() => openEdge(url)} style={st.edgeBtn}>
            <Text style={st.edgeTxt}>◆ Edge</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(url)} style={[st.verBtn, { borderColor: color + '88' }]}>
          <Text style={[st.verTxt, { color }]}>{edge ? 'Chrome ↗' : 'ver ↗'}</Text>
        </TouchableOpacity>
        {action && (
          <TouchableOpacity activeOpacity={0.85} onPress={action.onPress} style={[st.verBtn, { borderColor: color + '88' }, actionOn && { backgroundColor: color + '22' }]}>
            <Text style={[st.verTxt, { color }]}>{action.lbl}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/** Botón-chip tocable (mismo look que el badge del bloque). */
function ChipBtn({ label, color, on, onPress }: { label: string; color: string; on?: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[st.sysBadge, { backgroundColor: color + (on ? '33' : '1F'), borderColor: color + (on ? 'CC' : '66') }]}>
      <Text style={[st.sysBadgeTxt, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function HoyView({ dia, onOpenTemario, hecho, onToggle, tone }: { dia: DiaDerma; onOpenTemario: () => void; hecho: boolean; onToggle: (d: number) => void; tone: SkinTone }) {
  const prev = dermaDiaPrevio(dia);
  const fc = bc(dia);
  const prio = TIER_PRIO[dia.tier];
  const { entries } = useDermaLedger();
  const [reg, setReg] = useState<{ id: number; fuente: DermaFuente; acierto?: boolean } | null>(null);
  const [showNitida, setShowNitida] = useState(false);
  const [showPuente, setShowPuente] = useState(false);
  const [dictado, setDictado] = useState(true);
  const [bancoQ, setBancoQ] = useState('');
  const [cierreMsg, setCierreMsg] = useState('');
  useEffect(() => { setReg(null); setShowNitida(false); setShowPuente(false); setBancoQ(''); setCierreMsg(''); }, [dia.d]);

  const hoy = dermaHoyISO();
  const ficha = dermaCerebroDe(dia.d);
  const esDrill = DERMA_DRILL_DIAS.includes(dia.d);
  const esCheckpoint = DERMA_CHECKPOINT_DIAS.includes(dia.d);
  const obsDay = dermaObsUrlDay(dia.d);
  const obsBlock = dermaObsUrlBlock(dia.bKey);
  const fuenteBanco = bancoFuente(dia.qbankly?.url);
  const dscSelf = !!dia.dermatoscopiaImg && dia.dermatoscopiaImg.includes('bookid=2929');
  const dscHoy = useMemo(() => entries.find((e) => e.fuente === 'dermatoscopia' && e.d === dia.d), [entries, dia.d]);
  const viernes = dermaEsViernes(dia.fecha);
  const modulo = dia.dermatoscopiaModulo;

  const exportarLedger = () => {
    const json = dermaLedgerExportJSON();
    const out: string[] = [];
    if (dermaCopiar(json)) out.push('copiado');
    if (Platform.OS === 'web' && dermaDescargar(`derma_ledger_${hoy}.json`, json)) out.push(`descargado derma_ledger_${hoy}.json`);
    setCierreMsg(out.length ? `✓ ${out.join(' · ')} (${entries.length} entradas) → pegar en DATA/DERMATOLOGIA/TRACKING/_registro_derma.json → rondas[]` : `export listo (${entries.length} entradas) · sin portapapeles/descarga en esta plataforma`);
  };
  const promptNblm = `Con las fuentes del cuaderno, dame la tarjeta de MECANISMO verificada de los casos de hoy (${casosTxt(dia)}; átomo d${dia.d}: ${dia.sub}). Formato: FRENTE "¿por qué…?" → POR QUÉ (cascada) · CCSN (con qué se confunde + discriminador) · FUENTE (cita exacta). Marca "A VERIFICAR" toda dosis/cifra que no esté en las fuentes.`;

  return (
    <View>
      {/* CASO DEL DÍA — lámina clínica (imagen primero) que envuelve el átomo */}
      <FadeUp>
        <DermaClinicalPlate dia={dia} accent={fc} tone={tone}>
          {/* Meta-fila: bloque (→ Temario) · tier · vueltas · referente · puentes · Nítida · Obsidian · MIR */}
          <View style={st.temaTop}>
            <TouchableOpacity activeOpacity={0.8} onPress={onOpenTemario} style={[st.sysBadge, { backgroundColor: fc + '1F', borderColor: fc + '66' }]}>
              <Text style={[st.sysBadgeTxt, { color: fc }]}>{dia.bKey} · {dia.bloque} ›</Text>
            </TouchableOpacity>
            <Chip label={DERMA_TIER_INFO[dia.tier].t} color={DERMA_TIER_INFO[dia.tier].c} small />
            <Chip label={`${VUELTAS[prio]} vueltas · D+${INTERVALOS[prio].join('/')}`} color={Colors.muted} small />
            {dia.referente && <Chip label={`según ${dia.referente}`} color={GOLD} small />}
            {dia.puenteResearch && <ChipBtn label={`alimenta ${dia.puenteResearch.sr} (${dia.puenteResearch.linea})`} color={TEAL} on={showPuente} onPress={() => setShowPuente((s) => !s)} />}
            {dia.nitida && <ChipBtn label="Nítida · protocolo" color={DermaAtlas.champagne} on={showNitida} onPress={() => setShowNitida((s) => !s)} />}
            {dia.promir && <Chip label="MIR 10Q hoy" color={MIR_AMBER} small />}
            {obsDay && (
              <TouchableOpacity activeOpacity={0.8} onPress={() => openUrl(obsDay)} style={[st.sysBadge, { backgroundColor: OBS + '1F', borderColor: OBS + '77' }]}>
                <Text style={[st.sysBadgeTxt, { color: OBS }]}>◆ Obsidian</Text>
              </TouchableOpacity>
            )}
          </View>
          {showPuente && dia.puenteResearch && (
            <View style={[st.infoBox, { borderColor: TEAL + '66' }]}>
              <Text style={[st.infoLbl, { color: TEAL }]}>PUENTE RESEARCH · {dia.puenteResearch.linea} → {dia.puenteResearch.sr}</Text>
              <Text style={st.infoTxt}>{dia.puenteResearch.nota}</Text>
            </View>
          )}
          {showNitida && dia.nitida && (
            <View style={[st.infoBox, { borderColor: DermaAtlas.champagne + '66' }]}>
              <Text style={[st.infoLbl, { color: DermaAtlas.champagne }]}>NÍTIDA · consulta tipo tele-derma (Pulso · dermatología médica por suscripción)</Text>
              <Text style={st.infoSub}>PROTOCOLO</Text><Text style={st.infoTxt}>{dia.nitida.protocolo}</Text>
              <Text style={st.infoSub}>GUION (frase ancla)</Text><Text style={[st.infoTxt, { fontStyle: 'italic' }]}>{dia.nitida.guion}</Text>
              <Text style={st.infoSub}>SEGUIMIENTO</Text><Text style={st.infoTxt}>{dia.nitida.seguimiento}</Text>
              <Text style={st.infoFoot}>Banco de guiones editable: DATA/DERMATOLOGIA/NITIDA_PROTOCOLOS.md · toda dosis/concentración queda "A VERIFICAR" hasta cotejarla.</Text>
            </View>
          )}

          {/* Los 2 casos CIEGOS fijos de la sesión (ids reales de la permutación) → registro en el ledger */}
          <View style={st.casosRow}>
            <Text style={st.casosLbl}>CASOS CIEGOS DE HOY · Board Review</Text>
            {dia.casoIds.map((id) => {
              const a = dermaCasoArea(id); const c = DERMA_AREA_COLOR[a]; const e = dermaCasoEstado(id, entries);
              const estado = e ? `${e.acierto ? '✓' : '✗'} ${e.evalAcierto}${e.fecha === hoy ? ' · hoy' : ' · ' + e.fecha}` : '○ registrar';
              const abierto = reg?.fuente === 'caso' && reg.id === id;
              return (
                <View key={id} style={[st.casoChip, { borderColor: c + '77', backgroundColor: c + '12' }]}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => openUrl(dia.access.url)} style={Platform.OS === 'web' ? WEB_LINK : null}>
                    <Text style={[st.casoTxt, { color: c }]}>Caso #{id} · {DERMA_AREA_LABEL[a]} ↗</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setReg(abierto ? null : { id, fuente: 'caso' })} style={[st.casoBtn, { borderColor: c + '66' }, abierto && { backgroundColor: c + '33' }, Platform.OS === 'web' ? WEB_LINK : null]}>
                    <Text style={[st.casoBtnTxt, { color: e ? (e.acierto ? TEAL : DermaAtlas.crit) : c }]}>{abierto ? 'cerrar' : estado}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          {reg && reg.fuente === 'caso' && (
            <DermaCasoRegistro dia={dia} id={reg.id} accent={DERMA_AREA_COLOR[dermaCasoArea(reg.id)]} onDone={() => setReg(null)} onCancel={() => setReg(null)} />
          )}

          <View style={st.gateRow}>
            <DermaLineIcon name="skinLayers" size={15} color={fc} />
            <Text style={st.temaGate}>Mastery gate (caso ciego): ① describe la lámina en los 8 ejes (abajo) + ② diferencial de 3 ANTES de leer la viñeta · ③ responde y registra acierto/fallo · ④ discusión → tarjetas de mecanismo{ficha ? ' · recita los 7 pasos del cerebro clínico' : ''}.</Text>
          </View>
          <TouchableOpacity activeOpacity={0.85} onPress={() => onToggle(dia.d)} style={[st.doneBtn, hecho ? st.doneBtnOn : st.doneBtnOff]}>
            <Text style={[st.doneBtnTxt, { color: hecho ? '#1A1031' : PURPLE }]}>{hecho ? '✓ Átomo dominado (cuenta en el %)' : '○ Marcar átomo como hecho'}</Text>
          </TouchableOpacity>
        </DermaClinicalPlate>
      </FadeUp>

      {/* PASO ① · dictado morfológico en 8 ejes (gate del módulo A) */}
      <FadeUp delay={20}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setDictado((o) => !o)} style={[st.plegHead, { borderColor: fc + '44' }, Platform.OS === 'web' ? WEB_LINK : null]}>
          <DermaLineIcon name="skinLayers" size={14} color={fc} />
          <Text style={st.plegTxt}>① Dictado morfológico · 8 ejes · describir ANTES de diagnosticar</Text>
          <Text style={[st.plegTg, { color: fc }]}>{dictado ? '−' : '+'}</Text>
        </TouchableOpacity>
        {dictado && <DermaMorphologyDictation dia={dia} accent={fc} />}
      </FadeUp>

      {/* ①b · imagen dermatoscópica CIEGA (Self-Assessment 2e impares · Dermoscopedia pares) */}
      {dia.dermatoscopiaImg && (
        <FadeUp delay={30}>
          <ColaItem
            icon="dermatoscope" lbl="①b · IMAGEN DERMATOSCÓPICA CIEGA (1 por sesión)"
            val={dscSelf ? 'Dermoscopy: Illustrated Self-Assessment 2e · 1 imagen sin leer la respuesta' : 'Dermoscopedia · imagen del patrón de la sesión (tapa el título)'}
            sub={`estructuras → patrón → dx en voz alta ANTES de revelar · ${dscHoy ? (dscHoy.acierto ? '✓ registrada hoy' : '✗ registrada hoy') : 'registra ✓/✗ (fuente dermatoscopia del ledger)'}`}
            color={DermaAtlas.teal} url={dia.dermatoscopiaImg}
            action={{ lbl: reg?.fuente === 'dermatoscopia' ? 'cerrar' : 'registrar', onPress: () => setReg(reg?.fuente === 'dermatoscopia' ? null : { id: 0, fuente: 'dermatoscopia' }) }}
            actionOn={reg?.fuente === 'dermatoscopia'}
          />
          {reg?.fuente === 'dermatoscopia' && (
            <DermaCasoRegistro dia={dia} id={0} fuente="dermatoscopia" accent={DermaAtlas.teal} titulo="Registrar imagen dermatoscópica ciega" onDone={() => setReg(null)} onCancel={() => setReg(null)} />
          )}
        </FadeUp>
      )}

      {/* Correlación clínica ↔ dermatoscopia ↔ histología (solo si el caso lo tiene) */}
      <FadeUp delay={40}><DermaTriptych dia={dia} accent={fc} /></FadeUp>

      {/* ② Construye tu diferencial (Palmerton, ciego → revelar) */}
      {dia.ddx && dia.ddx.length > 0 && (
        <FadeUp delay={50}>
          <View style={{ marginTop: Spacing.sm }}>
            <DermaDifferentialTray ddx={dia.ddx} diaKey={dia.d} />
          </View>
        </FadeUp>
      )}

      {/* Cerebro clínico · 7 pasos (35 fichas: 22 X + 13 CRIT) — modo recitar */}
      {ficha && <FadeUp delay={60}><DermaCerebroCard ficha={ficha} accent={fc} /></FadeUp>}

      {/* Drill "Oclusión vascular · 90 s" (d19/d20 + checkpoints H/Z) */}
      {esDrill && <FadeUp delay={70}><DermaEmergencyDrill dia={dia} /></FadeUp>}

      {/* Checkpoints y repasos que LEEN del ledger (d45/d46/d69/d70) */}
      {esCheckpoint && <FadeUp delay={70}><DermaCheckpointPanel dia={dia} accent={fc} /></FadeUp>}

      {/* Eval anclada (átomo previo) */}
      {prev && (
        <FadeUp delay={80}>
          <View style={st.anchor}>
            <Text style={st.anchorLbl}>13:30 · Repaso FSRS (sesión ANTERIOR)</Text>
            <Text style={st.anchorVal}>D{prev.d} · {prev.sub}</Text>
            <Text style={st.anchorSub}>Tarjetas de MECANISMO + oclusiones de los casos {casosTxt(prev)} · fallo repetido → 2ª pasada FSRS (d69) · cada fallo ya lleva su módulo CORE en el ledger</Text>
          </View>
        </FadeUp>
      )}

      {/* Cola de materiales reales de hoy (caso ciego → review → lectura) */}
      <Text style={st.secLbl}>Materiales de la sesión · 13:33–14:13 · links REALES (en orden)</Text>
      <FadeUp delay={90}>
        <ColaItem icon="read" lbl="CASO CIEGO ①②③④ · Cases for Board Review" val={`Casos ${casosTxt(dia)} · ${dia.access.t}`} sub={dia.sub} color={fc} url={dia.access.url} />
      </FadeUp>

      {/* REVIEW: 10Q MIR (1 de cada 3) o banco AccessDerma */}
      {dia.promir ? (
        <FadeUp delay={100}>
          <ColaItem icon="flask" lbl={`REVIEW · 10Q MIR-DERMATOLOGÍA (sesión MIR ${DERMA_PROMIR_DIAS.indexOf(dia.d) + 1}/${DERMA_PROMIR_DIAS.length} · 1 de cada 3)`} val={dia.promir.t} sub="test del capítulo ProMIR · 77 s/Q · neto A − F/3 → log MIR (asignatura Dermatología) · sustituye hoy al banco AccessDerma" color={DermaAtlas.promir} url={dia.promir.url} />
          <DermaMir10Q dia={dia} accent={DermaAtlas.promir} />
          {dia.qbankly && (
            <ColaItem icon="flask" lbl="BANCO ACCESSDERMA · solo si sobra tiempo" val={dia.qbankly.t} sub="hoy el review es MIR; el banco rotante sigue mañana" color={EDGE} url={dia.qbankly.url} edge={dia.qbankly.via === 'edge'} dim />
          )}
        </FadeUp>
      ) : dia.qbankly && (
        <FadeUp delay={100}>
          <ColaItem icon="flask" lbl="REVIEW · ~10Q del banco rotante" val={dia.qbankly.t} sub="variable de ajuste · cada fallo o acierto por suerte → ledger con su módulo CORE (med/ped/surg/path)" color={EDGE} url={dia.qbankly.url} edge={dia.qbankly.via === 'edge'}
            action={{ lbl: reg?.fuente === fuenteBanco ? 'cerrar' : 'fallo →', onPress: () => setReg(reg?.fuente === fuenteBanco ? null : { id: Number(bancoQ) || 0, fuente: fuenteBanco, acierto: false }) }} actionOn={reg?.fuente === fuenteBanco} />
          {reg?.fuente === fuenteBanco && (
            <View>
              <View style={st.bancoRow}>
                <Text style={st.bancoLbl}>nº de pregunta del banco (opcional, para retomar):</Text>
                <TextInput value={bancoQ} onChangeText={setBancoQ} placeholder="Q#" placeholderTextColor={Colors.muted} keyboardType="numeric" style={st.bancoInput} />
              </View>
              <DermaCasoRegistro dia={dia} id={Number(bancoQ) || 0} fuente={fuenteBanco} acierto={false} accent={EDGE} titulo={`Registrar pregunta del banco (${fuenteBanco}${bancoQ ? ' #' + bancoQ : ''})`} onDone={() => setReg(null)} onCancel={() => setReg(null)} />
            </View>
          )}
        </FadeUp>
      )}

      {/* LECTURA 10′: micro-track DermNet CME (pares d6-d44) o lectura dirigida del módulo */}
      {modulo ? (
        <FadeUp delay={120}>
          <ColaItem icon="dermatoscope" lbl={`LECTURA 10′ · MICRO-TRACK DERMATOSCOPIA (DermNet CME ${modulo.n <= 18 ? `módulo ${modulo.n}/18` : 'repaso'})`} val={modulo.t} sub="3 de 4 módulos CORE preguntan dermatoscopia transversalmente · el mayor diferenciador · la lectura del módulo queda para la sesión impar" color={DermaAtlas.teal} url={modulo.url} />
          {dia.extra && <ColaItem icon="body" lbl="LECTURA DEL MÓDULO · pasa a la sesión impar (si sobra tiempo)" val={dia.extra.t} sub={dia.referente ? `fuente nº1 de ${dia.referente} · nunca lectura lineal` : 'lectura del módulo · nunca lineal'} color={DermaAtlas.periwinkle} url={dia.extra.url} dim />}
        </FadeUp>
      ) : dia.extra && (
        <FadeUp delay={120}>
          <ColaItem icon="body" lbl="LECTURA 10′ · dirigida del módulo" val={dia.extra.t} sub={dia.referente ? `fuente nº1 de ${dia.referente} · nunca lectura lineal` : 'lectura del módulo · nunca lineal'} color={DermaAtlas.periwinkle} url={dia.extra.url} />
        </FadeUp>
      )}

      {/* ANKI · deck del bloque + cola de tarjetas de MECANISMO (TSV) + oclusión */}
      <FadeUp delay={140}><DermaAnkiCola dia={dia} accent={DermaAtlas.teal} /></FadeUp>

      {/* ◆ OBSIDIAN · nota madre del átomo + índice del bloque (rama 10_DERMATOLOGIA) */}
      {(obsDay || obsBlock) && (
        <FadeUp delay={150}>
          <View style={[st.cola, { borderLeftColor: OBS }]}>
            <View style={st.colaIconBox}><Text style={{ fontSize: 16, color: OBS, fontWeight: '900' }}>◆</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={st.colaLbl}>OBSIDIAN · nota madre del átomo (7 pasos) + dictados</Text>
              <Text style={st.colaVal} numberOfLines={2}>10_DERMATOLOGIA → {dia.bKey} · {dia.bloque} → d{String(dia.d).padStart(2, '0')}</Text>
              <Text style={st.colaSub} numberOfLines={2}>Vault_Medicina MIR_Joseph · aquí caen las tarjetas de mecanismo y la descripción morfológica de hoy (notas manuales; el ruteo automático APEX sigue en P0-2/P0-3)</Text>
            </View>
            <View style={{ gap: 5, minWidth: 64 }}>
              {obsDay && <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(obsDay)} style={[st.verBtn, { borderColor: OBS + '88', backgroundColor: OBS + '1F' }]}><Text style={[st.verTxt, { color: OBS }]}>◆ átomo</Text></TouchableOpacity>}
              {obsBlock && <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(obsBlock)} style={[st.verBtn, { borderColor: OBS + '88' }]}><Text style={[st.verTxt, { color: OBS }]}>◆ bloque</Text></TouchableOpacity>}
            </View>
          </View>
        </FadeUp>
      )}

      {/* CIERRE 14:13 · free recall + NotebookLM + export del ledger */}
      <FadeUp delay={170}>
        <View style={[st.cola, { borderLeftColor: GOLD, alignItems: 'flex-start' }]}>
          <View style={st.colaIconBox}><DermaLineIcon name="histoDrop" size={18} color={GOLD} /></View>
          <View style={{ flex: 1 }}>
            <Text style={st.colaLbl}>CIERRE · 14:13–14:15</Text>
            <Text style={st.colaVal}>Free recall de los 2 casos en voz alta → 1-2 tarjetas de MECANISMO + 1 oclusión (cola Anki de arriba) → registrar en el ledger lo que falte</Text>
            <Text style={st.colaSub}>NotebookLM "DERMA · Élite Engine" = motor de verificación de la tarjeta (no sustituye la fuente) · {viernes ? 'VIERNES: exporta el ledger' : 'exporta el ledger cada viernes'} (localStorage es el único depósito del % ciego)</Text>
            <View style={st.cierreRow}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => { const ok = dermaCopiar(promptNblm); openUrl(DERMA_NOTEBOOKLM.url); setCierreMsg(ok ? '✓ prompt copiado → pégalo en el cuaderno' : 'cuaderno abierto (sin portapapeles: escribe el prompt a mano)'); }} style={[st.cierreBtn, { borderColor: GOLD + '88', backgroundColor: GOLD + '1A' }, Platform.OS === 'web' ? WEB_LINK : null]}>
                <Text style={[st.cierreBtnTxt, { color: GOLD }]}>NotebookLM · tarjeta verificada ↗</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85} onPress={exportarLedger} style={[st.cierreBtn, { borderColor: (viernes ? TEAL : Hairline.medium) }, viernes && { backgroundColor: TEAL + '1A' }, Platform.OS === 'web' ? WEB_LINK : null]}>
                <Text style={[st.cierreBtnTxt, { color: viernes ? TEAL : Colors.onSurfaceVariant }]}>⇩ Exportar ledger JSON ({entries.length})</Text>
              </TouchableOpacity>
            </View>
            {!!cierreMsg && <Text style={[st.colaSub, { marginTop: 6 }]}>{cierreMsg}</Text>}
          </View>
        </View>
      </FadeUp>
    </View>
  );
}

function HorarioView({ dia }: { dia: DiaDerma }) {
  const prev = dermaDiaPrevio(dia);
  const detalle = (tipo: string): string => {
    if (tipo === 'eval') return prev ? `D${prev.d} · ${prev.sub}` : 'no hay sesión previa';
    if (tipo === 'pretest') return `casos ${casosTxt(dia)}${dia.dermatoscopiaImg ? ' · ①b imagen dermatoscópica ciega' : ''}`;
    if (tipo === 'read') return `${dia.access.t} · registrar acierto/fallo de cada caso en el ledger`;
    if (tipo === 'review') return dia.promir ? `MIR 10Q · ${dia.promir.t}` : dia.qbankly ? dia.qbankly.t : '— (hoy sin bloque de review)';
    if (tipo === 'lectura') return dia.dermatoscopiaModulo ? `micro-track: ${dia.dermatoscopiaModulo.t}` : dia.extra ? dia.extra.t : '— (hoy sin lectura dirigida)';
    if (tipo === 'promir') return dia.promir ? dia.promir.t : '— (hoy el review es del banco AccessDerma)';
    if (tipo === 'recall') return 'free recall del caso: morfología → ddx → dx → mecanismo';
    if (tipo === 'apex') return `tarjetas de mecanismo (cola Anki APEX::DERMA::${dia.bKey}) + registrar en el ledger + ${dermaEsViernes(dia.fecha) ? 'EXPORTAR ledger (viernes)' : 'marcar progreso'}`;
    return '';
  };
  return (
    <View>
      <Text style={st.secLbl}>Bloque Derma · Día {dia.d} ({fmtFecha(dia.fecha)}) · hora Lima</Text>
      {DERMA_FRANJAS.map((f, i) => {
        const det = detalle(f.tipo);
        return (
          <FadeUp key={i} delay={i * 25}>
            <View style={st.franja}>
              <View style={st.franjaHora}><Text style={st.franjaHoraTxt}>{f.hora}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={st.franjaFase}>{f.fase}</Text>
                {det ? <Text style={st.franjaDet}>↳ {det}</Text> : null}
              </View>
            </View>
          </FadeUp>
        );
      })}
      <Text style={st.note}>Interdiario con Research: el bloque 13:30–14:15 del Calendar alterna Research↔Derma por día hábil. Avanzas 1 átomo por día-Derma. 1 de cada 3 sesiones (d ≡ 0 mod 3) el review son 10Q MIR del capítulo ProMIR. No se modifica el Calendar.</Text>
    </View>
  );
}

function SieteView({ fromD, onPick }: { fromD: number; onPick: (d: number) => void }) {
  const win = dermaVentana7(fromD);
  return (
    <View>
      <Text style={st.secLbl}>Próximos 7 átomos-Derma · toca uno para abrirlo</Text>
      {win.map((x, i) => {
        const fc = bc(x);
        const tags = [x.promir ? 'MIR 10Q' : '', x.dermatoscopiaModulo ? 'CME' : '', DERMA_DRILL_DIAS.includes(x.d) ? 'drill' : '', DERMA_CHECKPOINT_DIAS.includes(x.d) ? 'checkpoint' : '', x.puenteResearch ? x.puenteResearch.sr : '', x.nitida ? 'Nítida' : ''].filter(Boolean);
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: fc }]}>
              <Text style={[st.d7day, { color: fc }]}>D{x.d}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.sub}</Text>
                <Text style={st.d7sys}>{x.bKey} · {x.bloque}{x.referente ? ` · ${x.referente}` : ''} · casos {casosTxt(x)}{tags.length ? ` · ${tags.join(' · ')}` : ''}</Text>
              </View>
              <Text style={st.d7go}>→</Text>
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

function BloqueCard({ g, hoyD, onPick, done, onToggle }: { g: GrupoProgreso<DiaDerma>; hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const fc = bc(g.dias[0]);
  const estadoTxt = g.estado === 'completado' ? '✓ completado' : g.estado === 'en-curso' ? `en curso · ${g.pct}% · 1ª vuelta` : `pendiente · empieza D${g.primerD}`;
  const estadoColor = g.estado === 'completado' ? TEAL : g.estado === 'en-curso' ? fc : Colors.muted;
  const obsBlock = dermaObsUrlBlock(g.dias[0].bKey);
  return (
    <View style={[st.sysCard, { borderColor: fc + (g.estado === 'en-curso' ? '88' : '2E') }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
        <View style={st.sysHead}>
          <Text style={st.sysTitle} numberOfLines={1}>{open ? '▾' : '▸'} {g.clave}</Text>
          {obsBlock && (
            <TouchableOpacity activeOpacity={0.7} onPress={() => openUrl(obsBlock)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={{ fontSize: 13, color: OBS, width: 22, textAlign: 'center' }}>◆</Text>
            </TouchableOpacity>
          )}
          <Text style={[st.sysCount, { color: estadoColor }]}>{g.hechos}/{g.total}</Text>
        </View>
        <ProgressBar pct={g.pct} color={fc} />
        <Text style={[st.sysEstado, { color: estadoColor }]}>{estadoTxt}</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: 8 }}>
          {g.dias.map((x) => {
            const hecho = done.has(x.d), now = x.d === hoyD;
            const obs = dermaObsUrlDay(x.d);
            return (
              <View key={x.d} style={[st.temaRow, now && st.temaRowOn]}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle(x.d)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
                  <Text style={[st.temaChk, { color: hecho ? TEAL : 'rgba(255,255,255,0.25)' }]}>{hecho ? '☑' : '☐'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={st.temaRowMain}>
                  <Text style={[st.temaRowD, { color: hecho ? TEAL : now ? fc : Colors.muted }]}>{now ? '▶' : ''} D{x.d}</Text>
                  <Text style={st.temaRowTxt} numberOfLines={1}>{x.sub}</Text>
                  {x.promir ? <Text style={[st.temaRowVta, { color: MIR_AMBER, width: 26 }]}>MIR</Text> : null}
                  <Text style={[st.temaRowVta, { color: DERMA_TIER_INFO[x.tier].c }]}>{VUELTAS[TIER_PRIO[x.tier]]}v</Text>
                  <Text style={st.temaRowGo}>→</Text>
                </TouchableOpacity>
                {obs && (
                  <TouchableOpacity activeOpacity={0.7} onPress={() => openUrl(obs)} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}>
                    <Text style={{ fontSize: 13, color: OBS, width: 18, textAlign: 'center' }}>◆</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

function TemarioView({ hoyD, onPick, done, onToggle }: { hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const grupos = agruparProgreso(DERMA_DIAS, (x) => `${x.bKey} · ${x.bloque}`, hoyD, done);
  const glob = progresoGlobal(DERMA_DIAS, done);
  return (
    <View>
      <View style={st.globCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={st.globTitle}>Temario Derma · progreso REAL del plan</Text>
          <Text style={[st.globPct, { color: PURPLE }]}>{glob.pct}%</Text>
        </View>
        <ProgressBar pct={glob.pct} color={PURPLE} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} átomos · hoy = Día {hoyD} · {grupos.length} bloques (A–H board · Z cierre · X estética) · vueltas: CRÍT {VUELTAS.CRITICA}v D+{INTERVALOS.CRITICA.join('/')} · ALTA {VUELTAS.ALTA}v · MEDIA {VUELTAS.MEDIA}v · ◆ = nota Obsidian (10_DERMATOLOGIA) · MIR = sesión con 10Q ProMIR</Text>
      </View>
      {grupos.map((g) => <BloqueCard key={g.clave} g={g} hoyD={hoyD} onPick={onPick} done={done} onToggle={onToggle} />)}
      <Text style={st.note}>Progreso REAL: empezamos en 0%. ☑ marca un átomo como hecho (1ª vuelta; se guarda en este dispositivo). ▶ = átomo de hoy. Nv = vueltas objetivo según prioridad. Toca el subtema para ir a ese día.</Text>
    </View>
  );
}

export default function DermaTodayPlan({ tone }: { tone?: SkinTone }) {
  const iso = todayISO();
  const tipoHoy = diaEstudioTipo(new Date());
  const hoyD = planHoyD(DERMA_DIAS, iso);
  const [sel, setSel] = useState<number>(hoyD);
  const [view, setView] = useState<'hoy' | 'horario' | '7d' | 'temario'>('hoy');
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone('derma')));
  const { entries } = useDermaLedger();
  const ciego = useMemo(() => dermaPctCiego(entries), [entries]);
  const activeTone = tone ?? SKIN_TONES[2];
  const dia = DERMA_DIAS.find((x) => x.d === sel) || DERMA_DIAS[0];
  const esHoy = dia.fecha === iso;
  const pickDay = (d: number) => { setSel(d); setView('hoy'); };
  const toggleDone = (d: number) => setDone((prev) => {
    const n = new Set(prev);
    if (n.has(d)) n.delete(d); else n.add(d);
    saveDone('derma', Array.from(n));
    return n;
  });

  return (
    <View>
      {/* Banner interdiario Derma/Research */}
      <View style={st.interRow}>
        <View style={[st.interBtn, tipoHoy === 'derma' ? st.interOn : st.interOff]}>
          <View style={st.interHead}><DermaLineIcon name="loupe" size={14} color={tipoHoy === 'derma' ? PURPLE : Colors.muted} /><Text numberOfLines={1} style={[st.interBig, { color: tipoHoy === 'derma' ? PURPLE : Colors.muted }]}>DERMA</Text></View>
          <Text style={st.interSub}>{tipoHoy === 'derma' ? 'HOY te toca' : 'día alterno'}</Text>
        </View>
        <View style={[st.interBtn, tipoHoy === 'research' ? { backgroundColor: TEAL + '1A', borderColor: TEAL + '88' } : st.interOff]}>
          <View style={st.interHead}><DermaLineIcon name="flask" size={14} color={tipoHoy === 'research' ? TEAL : Colors.muted} /><Text numberOfLines={1} style={[st.interBig, { color: tipoHoy === 'research' ? TEAL : Colors.muted }]}>RESEARCH →</Text></View>
          <Text style={st.interSub}>{tipoHoy === 'research' ? 'HOY te toca →' : 'día alterno'}</Text>
        </View>
        <View style={[st.interBtn, tipoHoy === 'descanso' ? st.interOn : st.interOff, { flex: 0.7 }]}>
          <Text style={[st.interBig, { color: tipoHoy === 'descanso' ? GOLD : Colors.muted, letterSpacing: 0 }]}>finde</Text>
          <Text style={st.interSub}>descanso</Text>
        </View>
      </View>
      <View style={st.artefactoBar}>
        <Text style={st.artefactoTxt}>PLAN ÉLITE v2.1: 2 casos CIEGOS fijos por sesión (permutación de los 200 Board Review) + imagen dermatoscópica ciega + ~10Q review (1 de cada 3 sesiones = 10Q MIR ProMIR) + micro-track DermNet CME + ledger por caso (% ciego real, fallos por módulo CORE) → DERMATOLOGÍA ESTÉTICA (seguridad de fillers d19-20 → anatomía → toxina → fillers → peelings → láser → cosmecéutica) · {DERMA_DAILY_META.bloque}</Text>
      </View>

      {/* Anillos de progreso REAL (global · críticos · board · estética · % ciego del ledger) */}
      <View style={st.ringRow}>
        <View style={st.ringCard}>
          <RingStat value={done.size} max={DERMA_DAILY_META.totalDias} label="Global" sub={`${done.size}/${DERMA_DAILY_META.totalDias} átomos`} accent={PURPLE} />
        </View>
        <View style={st.ringCard}>
          <RingStat value={DERMA_DIAS.filter(x => x.tier === 'CRIT' && done.has(x.d)).length} max={DERMA_DIAS.filter(x => x.tier === 'CRIT').length} label="Críticos" sub="no errar" accent={DermaAtlas.crit} />
        </View>
        <View style={st.ringCard}>
          <RingStat value={DERMA_DIAS.filter(x => x.bKey !== 'X' && done.has(x.d)).length} max={DERMA_DIAS.filter(x => x.bKey !== 'X').length} label="Board" sub="A–H + cierre" accent={GOLD} />
        </View>
        <View style={st.ringCard}>
          <RingStat value={DERMA_DIAS.filter(x => x.bKey === 'X' && done.has(x.d)).length} max={DERMA_DIAS.filter(x => x.bKey === 'X').length} label="Estética" sub="bloque X" accent={DermaAtlas.teal} />
        </View>
        <View style={st.ringCard}>
          <RingStat value={ciego.pctCiego} max={100} label="% ciego" sub={ciego.n ? `${ciego.seguras}/${ciego.n} seguras · ledger` : 'sin registros aún'} accent={TEAL} suffix="%" />
        </View>
      </View>

      {/* Navegación de día */}
      <View style={st.navRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.max(1, s - 1))} style={st.navArrow}><Text style={st.navArrowTxt}>◄</Text></TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={st.navDay}>D{dia.d} · Día {dia.d}/{DERMA_DAILY_META.totalDias}{esHoy ? ' · HOY' : ''}</Text>
          <Text style={st.navFecha}>{fmtFecha(dia.fecha)} · {dia.fecha}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.min(DERMA_DAILY_META.totalDias, s + 1))} style={st.navArrow}><Text style={st.navArrowTxt}>►</Text></TouchableOpacity>
      </View>
      {!esHoy && <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(hoyD)} style={st.hoyBtn}><Text style={st.hoyBtnTxt}>↩ volver a HOY</Text></TouchableOpacity>}

      {/* Sub-pestañas */}
      <View style={st.subTabs}>
        {([['hoy', 'Caso de hoy'], ['horario', 'Horario'], ['7d', '7 días'], ['temario', 'Temario']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
            <Text style={[st.subTabTxt, view === k && { color: PURPLE }]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <GlassPanel style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
        {view === 'hoy' ? <HoyView dia={dia} onOpenTemario={() => setView('temario')} hecho={done.has(dia.d)} onToggle={toggleDone} tone={activeTone} />
          : view === 'horario' ? <HorarioView dia={dia} />
          : view === '7d' ? <SieteView fromD={dia.d} onPick={pickDay} />
          : <TemarioView hoyD={hoyD} onPick={pickDay} done={done} onToggle={toggleDone} />}
      </GlassPanel>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, ...Elevation.sm };
const WEB_LINK = { cursor: 'pointer', transition: Motion.base } as any;
const st = StyleSheet.create({
  interRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.sm },
  interBtn: { flex: 1, minWidth: 96, borderRadius: BorderRadius.lg, borderWidth: 1, paddingVertical: Spacing.md, paddingHorizontal: 4, alignItems: 'center', ...WEB_LINK },
  interOn: { backgroundColor: PURPLE + '1A', borderColor: PURPLE + '88', ...Elevation.glow(PURPLE) },
  interOff: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: Hairline.medium },
  interHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  interBig: { fontSize: FontSize.labelLg, fontWeight: '900', letterSpacing: 0.4 },
  interSub: { fontSize: 9, color: Colors.muted, marginTop: 3, letterSpacing: 0.2 },
  artefactoBar: { ...cardBase, borderLeftWidth: 3, borderLeftColor: PURPLE, padding: Spacing.md, marginBottom: Spacing.sm },
  artefactoTxt: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, lineHeight: LineHeight.labelSm },
  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.sm },
  ringCard: { flex: 1, minWidth: 130, ...cardBase, borderRadius: BorderRadius.xl, paddingVertical: Spacing.md, paddingHorizontal: Spacing.sm, alignItems: 'center' },

  navRow: { flexDirection: 'row', alignItems: 'center', ...cardBase, padding: Spacing.sm, marginBottom: Spacing.xs },
  navArrow: { width: 40, height: 40, borderRadius: BorderRadius.md, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: Hairline.soft, alignItems: 'center', justifyContent: 'center', ...WEB_LINK },
  navArrowTxt: { fontSize: 16, color: PURPLE, fontWeight: '800' },
  navDay: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.3 },
  navFecha: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2, letterSpacing: 0.2 },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm, ...WEB_LINK },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: PURPLE, fontWeight: '700', letterSpacing: 0.2 },

  subTabs: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm },
  subTab: { flex: 1, paddingVertical: 8, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, alignItems: 'center', ...WEB_LINK },
  subTabOn: { backgroundColor: PURPLE + '14', borderColor: PURPLE + '55' },
  subTabTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted, letterSpacing: 0.2 },

  temaTop: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginTop: Spacing.md },
  sysBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 11, ...WEB_LINK },
  sysBadgeTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },
  temaGate: { flex: 1, fontSize: FontSize.labelSm, color: Colors.muted, lineHeight: LineHeight.labelSm },
  doneBtn: { marginTop: 11, paddingVertical: 10, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center', ...WEB_LINK },
  doneBtnOff: { backgroundColor: PURPLE + '14', borderColor: PURPLE + '66' },
  doneBtnOn: { backgroundColor: PURPLE, borderColor: PURPLE, ...Elevation.glow(PURPLE) },
  doneBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },

  infoBox: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.sm, marginTop: Spacing.sm, backgroundColor: 'rgba(255,255,255,0.02)' },
  infoLbl: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  infoSub: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.5, marginTop: 7 },
  infoTxt: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 3, lineHeight: LineHeight.labelSm },
  infoFoot: { fontSize: 9, color: Colors.muted, marginTop: 7, lineHeight: 12, fontStyle: 'italic' },

  casosRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginTop: Spacing.md },
  casosLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, width: '100%' },
  casoChip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 3, paddingLeft: 10, paddingRight: 4 },
  casoTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  casoBtn: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 8, backgroundColor: 'rgba(10,15,28,0.5)' },
  casoBtnTxt: { fontSize: 9, fontWeight: '800', letterSpacing: 0.2 },

  plegHead: { flexDirection: 'row', alignItems: 'center', gap: 8, ...cardBase, borderLeftWidth: 3, paddingVertical: 8, paddingHorizontal: Spacing.md, marginTop: Spacing.sm },
  plegTxt: { flex: 1, fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.1 },
  plegTg: { fontSize: 18, fontWeight: '800', paddingHorizontal: 4 },

  anchor: { ...cardBase, borderLeftWidth: 3, borderLeftColor: DermaAtlas.periwinkle, padding: Spacing.md, marginBottom: Spacing.sm, marginTop: Spacing.sm },
  anchorLbl: { fontSize: FontSize.labelMd, fontWeight: '800', color: DermaAtlas.periwinkle, letterSpacing: 0.2 },
  anchorVal: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface, marginTop: 4, letterSpacing: -0.2 },
  anchorSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 3, lineHeight: LineHeight.labelSm },

  secLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 9, marginTop: Spacing.sm },
  cola: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 6 },
  colaIconBox: { width: 24, alignItems: 'center', justifyContent: 'center' },
  gateRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginTop: 10 },
  colaLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4, textTransform: 'uppercase' },
  colaVal: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600', marginTop: 3, lineHeight: 16 },
  colaSub: { fontSize: 9, color: Colors.muted, marginTop: 3, lineHeight: 13 },
  verBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 11, alignItems: 'center', ...WEB_LINK },
  verTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  edgeBtn: { backgroundColor: EDGE + '1F', borderWidth: 1, borderColor: EDGE + '88', borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 11, alignItems: 'center', ...WEB_LINK },
  edgeTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: EDGE, letterSpacing: 0.2 },
  bancoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 4 },
  bancoLbl: { fontSize: 9, color: Colors.muted },
  bancoInput: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 8, color: Colors.onSurface, fontSize: FontSize.labelSm, backgroundColor: 'rgba(255,255,255,0.03)', width: 64 },
  cierreRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  cierreBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 10, backgroundColor: 'rgba(255,255,255,0.03)' },
  cierreBtnTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },

  franja: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 8, borderTopWidth: 1, borderTopColor: Hairline.soft },
  franjaHora: { backgroundColor: PURPLE + '14', borderRadius: BorderRadius.sm, paddingVertical: 4, paddingHorizontal: 8, minWidth: 96, alignItems: 'center' },
  franjaHoraTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: PURPLE, letterSpacing: 0.2 },
  franjaFase: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17 },
  franjaDet: { fontSize: FontSize.labelSm, color: PURPLE, marginTop: 3, fontWeight: '600' },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: LineHeight.labelSm },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.sm, marginBottom: 5, ...WEB_LINK },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 40, letterSpacing: -0.2 },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  d7go: { fontSize: 16, color: PURPLE, fontWeight: '800', width: 18, textAlign: 'center' },

  globCard: { ...cardBase, padding: Spacing.md, marginBottom: Spacing.sm },
  globTitle: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  globPct: { fontSize: FontSize.bodyLg, fontWeight: '900', letterSpacing: -0.3 },
  globSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 6, lineHeight: LineHeight.labelSm },
  barTrack: { height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  barFill: { height: 7, borderRadius: 4, ...(Platform.OS === 'web' ? { transition: Motion.spring } as any : {}) },
  sysCard: { ...cardBase, padding: Spacing.md, marginBottom: 6 },
  sysHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7, gap: 6 },
  sysTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flex: 1, letterSpacing: -0.2 },
  sysCount: { fontSize: FontSize.labelMd, fontWeight: '800', marginLeft: 8 },
  sysEstado: { fontSize: FontSize.labelSm, fontWeight: '700', marginTop: 6, letterSpacing: 0.2 },
  temaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 7, paddingHorizontal: 6, borderRadius: BorderRadius.sm, borderTopWidth: 1, borderTopColor: Hairline.soft, ...WEB_LINK },
  temaRowOn: { backgroundColor: PURPLE + '12' },
  temaRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  temaChk: { fontSize: 16, width: 22, textAlign: 'center' },
  temaRowD: { fontSize: FontSize.labelSm, fontWeight: '800', width: 44 },
  temaRowTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  temaRowVta: { fontSize: 9, fontWeight: '800', width: 22, textAlign: 'right' },
  temaRowGo: { fontSize: 14, color: Colors.muted, width: 16, textAlign: 'center' },
});
