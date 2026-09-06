import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform, TextInput, Share } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  DAILY_META, FRANJAS, DIAS, DiaUSMLE, diaDe, diaPrevio, ventana7d, TIER_INFO,
  QBV, QBQ, QBF, QBL, yt, nivelInfo, esHito, faseDe, USMLE_GATE,
} from '../../lib/usmleStep1Daily';
import {
  UsmleScore, TipoErrorUW, TIPOS_ERROR, TIPO_ERROR_INFO, loadScores, scoreDe, upsertScore, gateDelDia, exportScoresJSON,
} from '../../lib/usmleScores';
import { usmleMirParalelo } from '../../lib/mirUsmleBridge';
import { agruparProgreso, planHoyD, progresoGlobal, GrupoProgreso, loadDone, saveDone } from '../../lib/studyProgress';
import { usmleObsUrl } from '../../lib/obsidianMap';
import { usmleAnkiDeck, ANKIWEB } from '../../lib/ankiLinks';

/**
 * UsmleTodayPlan — Plan Step 1 día-a-día, estilo Perú/ENCAPS pero mejor.
 * Botones Step 1/2/3 · navegación Día X/99 (◄►, v5.4) · sub-pestañas HOY/Horario/7d/Temario.
 * Qbankly SOLO abre en Edge → cada link Qbankly ofrece botón "Edge" (microsoft-edge:)
 * además del de Chrome. 7 días y temario son clicables → saltan al día. El badge de
 * sistema lleva al Temario con el progreso real del plan por sistema.
 * v5.6-Palmerton (5-sep-2026): chip de NIVEL UWorld del día (DIAS[].nivelUW) + chip "MIR en paralelo" +
 * tarjeta 📏 MEDICIÓN (pre-test /10 · consolidación % · eval % · tipo de error · gate ✓ subir / ✗ repetir ·
 * export JSON) → usmleScores.ts (localStorage 'jmd-usmle-scores' + Supabase usmle_daily_scores).
 */
const GREEN = Colors.green;   // jade (US console) — migrado de #3FB984 fosforescente
const RED = Colors.coral;     // terracotta — migrado de #E5484D
const EDGE = '#5B86B8';       // sapphire apagado (marca MS Edge, sin neón) — de #3DA5E0
const OBS = Colors.purple;    // amethyst — migrado de #A78BFA
const READ = Colors.blue;     // sapphire (active reading) — migrado de #7BB1FF
const APEX = Colors.gold;     // oro-firma para el APEX transversal — migrado de #F5A623
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function openEdge(u: string) { Linking.openURL('microsoft-edge:' + u).catch(() => openUrl(u)); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return DAILY_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}

/** Cola de hoy: ítem con link. `edge` añade el botón Microsoft Edge (para Qbankly). */
function ColaItem({ icon, lbl, val, sub, color, url, edge }: { icon: string; lbl: string; val: string; sub: string; color: string; url: string; edge?: boolean }) {
  return (
    <View style={[st.cola, { borderLeftColor: color }]}>
      <Text style={st.colaIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={st.colaLbl}>{lbl}</Text>
        <Text style={st.colaVal} numberOfLines={2}>{val}</Text>
        <Text style={st.colaSub}>{sub}</Text>
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
      </View>
    </View>
  );
}

function HoyView({ dia, onOpenTemario, hecho, onToggle }: { dia: DiaUSMLE; onOpenTemario: () => void; hecho: boolean; onToggle: (d: number) => void }) {
  const prev = diaPrevio(dia);
  const tier = TIER_INFO[dia.tier];
  const niv = nivelInfo(dia.nivelUW);
  const mir = usmleMirParalelo(dia.fecha);
  return (
    <View>
      {/* Tema del día — el badge de sistema lleva al Temario */}
      <FadeUp>
        <View style={[st.temaCard, { borderColor: tier.c + '55' }]}>
          <View style={st.temaTop}>
            <TouchableOpacity activeOpacity={0.8} onPress={onOpenTemario} style={[st.sysBadge, { backgroundColor: tier.c + '1F', borderColor: tier.c + '66' }]}>
              <Text style={[st.sysBadgeTxt, { color: tier.c }]}>{dia.system} ›</Text>
            </TouchableOpacity>
            <Chip label={tier.t} color={tier.c} small />
            <Chip label="1ª vuelta" color={GREEN} small />
            <Chip label={`Fase ${faseDe(dia.d)}`} color={Colors.muted} small />
            <Chip label={`Nivel UW ${dia.nivelUW} · ${dia.qDia}Q`} color={niv.color} small />
            {mir && <Chip label={mir.texto} color={Colors.gold} small />}
            {usmleObsUrl(dia.d) && (
              <TouchableOpacity activeOpacity={0.8} onPress={() => openUrl(usmleObsUrl(dia.d)!)}
                style={[st.sysBadge, { backgroundColor: OBS + '1F', borderColor: OBS + '77' }]}>
                <Text style={[st.sysBadgeTxt, { color: OBS }]}>◆ Obsidian</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={st.temaTitle}>{dia.sub}</Text>
          <Text style={st.temaSub}>Subtema atómico del día · 1/día · toca el sistema para ver todo el temario y tu avance ›</Text>
          <Text style={[st.temaSub, { color: niv.color }]}>Nivel {niv.nivel} · {niv.nombre} — {niv.formato}. Gate: {niv.umbral}.</Text>
          <TouchableOpacity activeOpacity={0.85} onPress={() => onToggle(dia.d)} style={[st.doneBtn, hecho ? st.doneBtnOn : st.doneBtnOff]}>
            <Text style={[st.doneBtnTxt, { color: hecho ? '#0A1A12' : GREEN }]}>{hecho ? '✓ Completado hoy' : '○ Marcar como completado'}</Text>
          </TouchableOpacity>
        </View>
      </FadeUp>

      {/* Medición Palmerton del día (gate 80%) */}
      <FadeUp delay={30}><MedicionCard dia={dia} /></FadeUp>

      {/* Anchored eval (tema previo) */}
      {prev && (
        <FadeUp delay={40}>
          <View style={st.anchor}>
            <Text style={st.anchorLbl}>🎯 07:15 · Repaso anclado (tema de AYER + D-3/D-7)</Text>
            <Text style={st.anchorVal}>{prev.system} → {prev.sub}</Text>
            <Text style={st.anchorSub}>Anki FSRS deck USMLE + 5Q uWorld TIMED del subtema de ayer (1ª mitad del gate de 10Q; la 2ª mitad va en la consolidación) · si free recall &lt;60% → re-encolar</Text>
            <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openEdge(QBQ)} style={st.edgeBtnWide}><Text style={st.edgeTxt}>◆ Abrir en Edge</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QBQ)} style={[st.verBtn, { borderColor: READ + '88' }]}><Text style={[st.verTxt, { color: READ }]}>Chrome ↗</Text></TouchableOpacity>
            </View>
          </View>
        </FadeUp>
      )}

      {/* Cola de materiales de hoy */}
      <Text style={st.secLbl}>📋 Cola de hoy · 05:00 Anki AM · 07:15–12:00 + 18:00–18:45 (en orden) · Qbankly = botón Edge</Text>
      <FadeUp delay={60}><ColaItem icon="🅠" lbl="PRE-TEST 08:15 · uWorld (modo tutor · SIN tiempo · nivel 1)" val={`${dia.system} → ${dia.uw} · 10 preguntas ciegas + free recall 90s`} sub="Qbankly → QBanks → uWorld Step 1 · UWorld primero para diagnosticar, First Aid después" color={GREEN} url={QBQ} edge /></FadeUp>
      <FadeUp delay={90}><ColaItem icon="🎬" lbl="VÍDEO · Boards & Beyond Step 1" val={`${dia.bbCh} → ${dia.bbVid}`} sub="Qbankly → Video Library → B&B Step 1" color={RED} url={QBV} edge /></FadeUp>
      <FadeUp delay={120}><ColaItem icon="📖" lbl="ACTIVE READING · material primario" val={dia.mat} sub="Qbankly → Library (uWorld/AMBOSS) · 25 min · 3-5 puntos high-yield" color={READ} url={QBL} edge /></FadeUp>
      <FadeUp delay={150}><ColaItem icon="🗂️" lbl="FLASHCARDS · uWorld Step 1" val={`Deck: ${dia.system}`} sub="Qbankly → Flashcards · Anki SRS" color={Colors.teal} url={QBF} edge /></FadeUp>
      {usmleObsUrl(dia.d) && (
        <FadeUp delay={165}><ColaItem icon="◆" lbl="OBSIDIAN · nota madre del subtema" val={`${dia.system} → ${dia.sub}`} sub="Vault_Medicina MIR_Joseph · aquí caen los APEX de hoy (motor APEX)" color={OBS} url={usmleObsUrl(dia.d)!} /></FadeUp>
      )}
      <FadeUp delay={180}><ColaItem icon="🃏" lbl="ANKI · deck del sistema (SRS diario)" val={usmleAnkiDeck(dia.system)} sub="abre AnkiWeb ↗ · en Anki escritorio busca este deck exacto" color={Colors.teal} url={ANKIWEB} /></FadeUp>
      {dia.palm && (
        <FadeUp delay={180}><ColaItem icon="🧠" lbl="PALMERTON · al empezar el sistema" val={dia.palm.t} sub="YouTube · método + visión del sistema (abre en Chrome)" color={GREEN} url={yt(dia.palm.id)} /></FadeUp>
      )}
      <FadeUp delay={210}>
        <View style={[st.cola, { borderLeftColor: APEX }]}>
          <Text style={st.colaIcon}>🃏</Text>
          <View style={{ flex: 1 }}>
            <Text style={st.colaLbl}>APEX · 10:45–11:00 (cierre del DEEP PRIME) + CONSOLIDACIÓN 11:00 · nivel {dia.nivelUW}</Text>
            <Text style={st.colaVal}>Crea ≤10 tarjetas de MECANISMO (patogenia→presentación) · luego {dia.nivelUW === 1 ? '20Q en bloques de 5Q tutor del subtema (nivel 1)' : dia.nivelUW === 3 ? '20Q del sistema completo TIMED + 10Q tutor (nivel 3, viernes)' : dia.nivelUW === 2 ? '30Q en bloques de 5Q TIMED de subtemas validados (nivel 2)' : `${dia.qDia}Q en bloques timed mixtos (nivel ${dia.nivelUW})`}</Text>
            <Text style={st.colaSub}>Gate: ≥{USMLE_GATE.pct}% → mañana sube de nivel · &lt;{USMLE_GATE.pct}% → repetir 5Q del subtema fallado · 18:00 eval 10Q mixta timed (dosis de nivel 4) · registra todo en 📏 Medición</Text>
          </View>
        </View>
      </FadeUp>
    </View>
  );
}

/** 📏 Medición Palmerton del día: 3 números + tipo de error + gate ✓/✗ + export JSON (usmleScores). */
function MedicionCard({ dia }: { dia: DiaUSMLE }) {
  const hito = esHito(dia);
  const fase = faseDe(dia.d);
  const niv = nivelInfo(dia.nivelUW);
  const [pre, setPre] = useState('');
  const [con, setCon] = useState('');
  const [ev, setEv] = useState('');
  const [tipo, setTipo] = useState<TipoErrorUW | null>(null);
  const [notas, setNotas] = useState('');
  const [estado, setEstado] = useState<'idle' | 'saving' | 'ok' | 'local'>('idle');
  const [exp, setExp] = useState('');
  useEffect(() => {
    const s = scoreDe(loadScores(), dia.fecha);
    setPre(s?.pretest10 != null ? String(s.pretest10) : '');
    setCon(s?.consol30pct != null ? String(s.consol30pct) : '');
    setEv(s?.evalPct != null ? String(s.evalPct) : '');
    setTipo(s?.tipoError ?? null);
    setNotas(s?.notas ?? '');
    setEstado('idle'); setExp('');
  }, [dia.fecha]);
  const num = (t: string, max: number): number | null => {
    const v = t.trim(); if (!v) return null;
    const n = Number(v.replace(',', '.'));
    return isNaN(n) ? null : Math.max(0, Math.min(max, n));
  };
  const score: UsmleScore = { fecha: dia.fecha, d: dia.d, pretest10: num(pre, 10), consol30pct: num(con, 100), evalPct: num(ev, 100), tipoError: tipo, nivelUW: dia.nivelUW, notas, updatedAt: '' };
  const gate = gateDelDia(score, dia);
  const gateColor = gate.estado === 'sube' ? GREEN : gate.estado === 'repite' ? RED : Colors.muted;
  const guardar = async () => {
    setEstado('saving');
    try { const r = await upsertScore(score); setEstado(r.supabase ? 'ok' : 'local'); } catch { setEstado('local'); }
  };
  const exportar = async () => {
    const json = exportScoresJSON();
    try {
      const nav = (globalThis as any).navigator;
      if (Platform.OS === 'web' && nav && nav.clipboard && nav.clipboard.writeText) { await nav.clipboard.writeText(json); setExp('✓ JSON copiado al portapapeles'); return; }
    } catch { /* cae al Share */ }
    try { await Share.share({ message: json, title: 'usmle-scores.json' }); setExp('✓ JSON compartido'); } catch { setExp('no se pudo exportar en este dispositivo'); }
  };
  const lblPre = fase === 'A' ? 'Pre-test 08:15 (aciertos /10)' : 'Stress set 05:00 (aciertos /10)';
  const lblCon = hito ? 'Bloque timed extra (%) · opcional' : fase === 'A' ? 'Consolidación 11:00 (%)' : 'Bloques timed del día (%)';
  const lblEv = hito ? `% del ${dia.uw}` : 'Eval 18:00 timed mixta (%)';
  return (
    <View style={[st.medCard, { borderColor: niv.color + '66' }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <Text style={st.medTitle}>📏 MEDICIÓN DEL DÍA</Text>
        <Chip label={`nivel ${dia.nivelUW} · ${niv.nombre}`} color={niv.color} small />
        <Chip label={`${dia.qDia}Q objetivo`} color={Colors.muted} small />
        {hito && <Chip label="HITO" color={Colors.gold} small />}
      </View>
      <Text style={st.medHint}>{hito ? `Día de hito: registra el % del ${dia.uw} en el campo eval. ${gate.detalle}.` : `Gate del día = ${gate.metrica} ≥ ${USMLE_GATE.pct}%. El % de UWorld es gate de proceso, no predicción (solo el NBME predice).`}</Text>
      <View style={st.medRow}>
        <View style={st.medField}><Text style={st.medLbl}>{lblPre}</Text><TextInput style={st.medInput} value={pre} onChangeText={setPre} keyboardType="numeric" placeholder="–" placeholderTextColor={Colors.muted} returnKeyType="done" /></View>
        <View style={st.medField}><Text style={st.medLbl}>{lblCon}</Text><TextInput style={st.medInput} value={con} onChangeText={setCon} keyboardType="numeric" placeholder="–" placeholderTextColor={Colors.muted} returnKeyType="done" /></View>
        <View style={st.medField}><Text style={st.medLbl}>{lblEv}</Text><TextInput style={st.medInput} value={ev} onChangeText={setEv} keyboardType="numeric" placeholder="–" placeholderTextColor={Colors.muted} returnKeyType="done" /></View>
      </View>
      <Text style={st.medLbl}>Tipo de error dominante (knowledge / transfer / proceso)</Text>
      <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
        {TIPOS_ERROR.map((t) => {
          const info = TIPO_ERROR_INFO[t]; const on = tipo === t;
          return (
            <TouchableOpacity key={t} activeOpacity={0.8} onPress={() => setTipo(on ? null : t)} style={[st.tipoChip, { borderColor: info.color + (on ? 'CC' : '55'), backgroundColor: on ? info.color + '26' : 'transparent' }]}>
              <Text style={[st.tipoChipTxt, { color: on ? info.color : Colors.muted }]}>{info.corto}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {tipo && <Text style={[st.medHint, { color: TIPO_ERROR_INFO[tipo].color }]}>{TIPO_ERROR_INFO[tipo].label}: {TIPO_ERROR_INFO[tipo].fix}</Text>}
      <TextInput style={st.medNotas} value={notas} onChangeText={setNotas} placeholder="Notas: shopping list, subtema a repetir, sensación del bloque…" placeholderTextColor={Colors.muted} multiline />
      <View style={[st.gateBox, { borderColor: gateColor + '77', backgroundColor: gateColor + '14' }]}>
        <Text style={[st.gateTxt, { color: gateColor }]}>{gate.label}</Text>
        {gate.estado !== 'sin-dato' && <Text style={st.gateDet}>{gate.detalle}</Text>}
      </View>
      <View style={{ flexDirection: 'row', gap: 6, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <TouchableOpacity activeOpacity={0.85} onPress={guardar} style={[st.doneBtn, st.doneBtnOff, { flex: 1, marginTop: 0, minWidth: 160 }]}>
          <Text style={[st.doneBtnTxt, { color: GREEN }]}>{estado === 'saving' ? 'guardando…' : estado === 'ok' ? '✓ guardado (local + Supabase)' : estado === 'local' ? '✓ guardado en este dispositivo (Supabase sin respuesta)' : '💾 Guardar medición'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={exportar} style={[st.verBtn, { borderColor: Colors.gold + '88' }]}>
          <Text style={[st.verTxt, { color: Colors.gold }]}>⇪ Export JSON</Text>
        </TouchableOpacity>
      </View>
      {exp ? <Text style={st.medHint}>{exp}</Text> : null}
    </View>
  );
}

function HorarioView({ dia }: { dia: DiaUSMLE }) {
  const prev = diaPrevio(dia);
  const detalle = (tipo: string): string => {
    if (tipo === 'eval') return prev ? `${prev.system} → ${prev.sub}` : 'no hay día previo';
    if (tipo === 'pretest') return `${dia.system} → ${dia.uw}`;
    if (tipo === 'read') return `${dia.bbCh}: ${dia.bbVid} · ${dia.mat}`;
    return '';
  };
  return (
    <View>
      <Text style={st.secLbl}>🕓 Bloque USMLE · Día {dia.d} ({fmtFecha(dia.fecha)}) · hora Lima</Text>
      {FRANJAS.map((f, i) => {
        const det = detalle(f.tipo);
        return (
          <FadeUp key={i} delay={i * 25}>
            <View style={st.franja}>
              <View style={st.franjaHora}><Text style={st.franjaHoraTxt}>{f.hora}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={st.franjaFase}>{f.fase}</Text>
                {det ? <Text style={st.franjaDet}>↳ {det}</Text> : null}
                {f.nivel && f.nivel !== '—' ? <Text style={st.franjaNivel}>🎚️ nivel UW {f.nivel}{f.gate && f.gate !== '—' ? ` · gate: ${f.gate}` : ''}</Text> : null}
              </View>
            </View>
          </FadeUp>
        );
      })}
      <Text style={st.note}>05:00 Anki AM · 07:15 repaso anclado · 08:15 pre-test 10Q · 09:00 DEEP PRIME 2h · 11:00 consolidación por nivel · 18:00 eval modo examen (6h15/día). Todo en inglés. Sáb/dom libres. Hoy: nivel UW {dia.nivelUW} ({nivelInfo(dia.nivelUW).nombre}) · {dia.qDia}Q objetivo. {DAILY_META.metodo}</Text>
    </View>
  );
}

function SieteView({ fromD, onPick }: { fromD: number; onPick: (d: number) => void }) {
  const win = ventana7d(fromD);
  return (
    <View>
      <Text style={st.secLbl}>📆 Próximos 7 días · toca un día para abrirlo</Text>
      {win.map((x, i) => {
        const tier = TIER_INFO[x.tier];
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: tier.c }]}>
              <Text style={[st.d7day, { color: tier.c }]}>D{x.d}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.sub}</Text>
                <Text style={st.d7sys}>{x.system}</Text>
              </View>
              <Text style={st.d7go}>→</Text>
            </TouchableOpacity>
          </FadeUp>
        );
      })}
    </View>
  );
}

/** Barra de progreso simple (track + fill por %). */
function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <View style={st.barTrack}>
      <View style={[st.barFill, { width: (`${Math.max(0, Math.min(100, pct))}%` as any), backgroundColor: color }]} />
    </View>
  );
}

function SistemaCard({ g, hoyD, onPick, done, onToggle }: { g: GrupoProgreso<DiaUSMLE>; hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const tier = TIER_INFO[g.dias[0].tier];
  const estadoTxt = g.estado === 'completado' ? '✓ completado' : g.estado === 'en-curso' ? `en curso · ${g.pct}%` : `pendiente · empieza D${g.primerD}`;
  const estadoColor = g.estado === 'completado' ? GREEN : g.estado === 'en-curso' ? tier.c : Colors.muted;
  return (
    <View style={[st.sysCard, { borderColor: tier.c + (g.estado === 'en-curso' ? '88' : '2E') }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
        <View style={st.sysHead}>
          <Text style={st.sysTitle} numberOfLines={1}>{open ? '▾' : '▸'} {g.clave}</Text>
          <Text style={[st.sysCount, { color: estadoColor }]}>{g.hechos}/{g.total}</Text>
        </View>
        <ProgressBar pct={g.pct} color={tier.c} />
        <Text style={[st.sysEstado, { color: estadoColor }]}>
          {estadoTxt}{g.diaActual ? ` · hoy: ${g.diaActual.sub}` : ''}
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => openEdge(QBQ)} style={st.edgeBtnWide}><Text style={st.edgeTxt}>◆ Temario en Qbankly (Edge)</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QBQ)} style={[st.verBtn, { borderColor: tier.c + '88' }]}><Text style={[st.verTxt, { color: tier.c }]}>Chrome ↗</Text></TouchableOpacity>
      </View>
      {open && (
        <View style={{ marginTop: 8 }}>
          {g.dias.map((x) => {
            const hecho = done.has(x.d), now = x.d === hoyD;
            return (
              <View key={x.d} style={[st.temaRow, now && st.temaRowOn]}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle(x.d)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
                  <Text style={[st.temaChk, { color: hecho ? GREEN : 'rgba(255,255,255,0.25)' }]}>{hecho ? '☑' : '☐'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={st.temaRowMain}>
                  <Text style={[st.temaRowD, { color: hecho ? GREEN : now ? tier.c : Colors.muted }]}>{now ? '▶' : ''} D{x.d}</Text>
                  <Text style={st.temaRowTxt} numberOfLines={1}>{x.sub}</Text>
                  <Text style={st.temaRowGo}>→</Text>
                </TouchableOpacity>
                {usmleObsUrl(x.d) && (
                  <TouchableOpacity activeOpacity={0.7} onPress={() => openUrl(usmleObsUrl(x.d)!)} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}>
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
  const grupos = agruparProgreso(DIAS, (x) => x.system, hoyD, done);
  const glob = progresoGlobal(DIAS, done);
  return (
    <View>
      <View style={st.globCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={st.globTitle}>🗂️ Temario Step 1 · progreso del plan</Text>
          <Text style={[st.globPct, { color: GREEN }]}>{glob.pct}%</Text>
        </View>
        <ProgressBar pct={glob.pct} color={GREEN} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} subtemas · hoy = Día {hoyD} de {glob.total} · {grupos.length} sistemas</Text>
      </View>
      {grupos.map((g) => <SistemaCard key={g.clave} g={g} hoyD={hoyD} onPick={onPick} done={done} onToggle={onToggle} />)}
      <Text style={st.note}>Progreso REAL: empezamos en 0%. ☑ marca un subtema como completado (se guarda en este dispositivo). ▶ = día de hoy. Toca el título de un subtema para ir a ese día.</Text>
    </View>
  );
}

export default function UsmleTodayPlan() {
  const iso = todayISO();
  const hoyD = planHoyD(DIAS, iso);
  const todayDia = diaDe(iso) || DIAS.find((x) => x.d === hoyD) || DIAS[0];
  const [sel, setSel] = useState<number>(todayDia.d);
  const [view, setView] = useState<'hoy' | 'horario' | '7d' | 'temario'>('hoy');
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone('usmle')));
  const dia = DIAS.find((x) => x.d === sel) || DIAS[0];
  const esHoy = dia.fecha === iso;
  const pickDay = (d: number) => { setSel(d); setView('hoy'); };
  const toggleDone = (d: number) => setDone((prev) => {
    const n = new Set(prev);
    if (n.has(d)) n.delete(d); else n.add(d);
    saveDone('usmle', Array.from(n));
    return n;
  });

  return (
    <View>
      {/* Botones grandes Step 1 / 2 / 3 */}
      <View style={st.stepRow}>
        <View style={[st.stepBtn, st.stepActive]}>
          <Text style={st.stepBig}>STEP 1</Text>
          <Text style={st.stepSub}>BLOQUE PRINCIPAL · 6h15/día · examen fin de enero</Text>
        </View>
        <View style={[st.stepBtn, st.stepStep2]}>
          <Text style={[st.stepBig, { color: Colors.champagne }]}>STEP 2 CK</Text>
          <Text style={st.stepSub}>bancos + HY en pestaña ◈ Readiness</Text>
        </View>
        <View style={[st.stepBtn, st.stepSoon]}>
          <Text style={[st.stepBig, { color: Colors.muted }]}>STEP 3</Text>
          <Text style={st.stepSub}>próximamente</Text>
        </View>
      </View>

      {/* Navegación de día */}
      <View style={st.navRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.max(1, s - 1))} style={st.navArrow}><Text style={st.navArrowTxt}>◄</Text></TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={st.navDay}>Día {dia.d}/{DAILY_META.totalDias}{esHoy ? ' · HOY' : ''}</Text>
          <Text style={st.navFecha}>{fmtFecha(dia.fecha)} · {dia.fecha}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.min(DAILY_META.totalDias, s + 1))} style={st.navArrow}><Text style={st.navArrowTxt}>►</Text></TouchableOpacity>
      </View>
      {!esHoy && <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(todayDia.d)} style={st.hoyBtn}><Text style={st.hoyBtnTxt}>↩ volver a HOY</Text></TouchableOpacity>}

      {/* Sub-pestañas */}
      <View style={st.subTabs}>
        {([['hoy', '📋 HOY'], ['horario', '🕓 Horario'], ['7d', '📆 7 días'], ['temario', '🗂️ Temario']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
            <Text style={[st.subTabTxt, view === k && { color: GREEN }]}>{lbl}</Text>
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
const WEB_LINK = { cursor: 'pointer', transition: Motion.base } as any;
const st = StyleSheet.create({
  stepRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  stepBtn: { flex: 1, borderRadius: BorderRadius.lg, borderWidth: 1, paddingVertical: Spacing.md, alignItems: 'center' },
  stepActive: { backgroundColor: GREEN + '1A', borderColor: GREEN + '88', ...Elevation.glow(GREEN) },
  stepSoon: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: Hairline.medium },
  stepStep2: { backgroundColor: Colors.gold + '12', borderColor: Colors.gold + '3A' },
  stepBig: { fontSize: FontSize.titleMd, fontWeight: '900', color: GREEN, letterSpacing: 0.4 },
  stepSub: { fontSize: 9, color: Colors.muted, marginTop: 3, letterSpacing: 0.2 },

  navRow: { flexDirection: 'row', alignItems: 'center', ...cardBase, padding: Spacing.sm, marginBottom: Spacing.xs },
  navArrow: { width: 40, height: 40, borderRadius: BorderRadius.md, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: Hairline.soft, alignItems: 'center', justifyContent: 'center', ...WEB_LINK },
  navArrowTxt: { fontSize: 16, color: GREEN, fontWeight: '800' },
  navDay: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.3 },
  navFecha: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2, letterSpacing: 0.2 },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm, ...WEB_LINK },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: GREEN, fontWeight: '700', letterSpacing: 0.2 },

  subTabs: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm },
  subTab: { flex: 1, paddingVertical: 8, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, alignItems: 'center', ...WEB_LINK },
  subTabOn: { backgroundColor: GREEN + '14', borderColor: GREEN + '55' },
  subTabTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted, letterSpacing: 0.2 },

  temaCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm, ...Elevation.md },
  temaTop: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  sysBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 11, ...WEB_LINK },
  sysBadgeTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },
  temaTitle: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: 9, lineHeight: 22, letterSpacing: -0.3 },
  temaSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, lineHeight: LineHeight.labelSm },
  doneBtn: { marginTop: 11, paddingVertical: 10, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center', ...WEB_LINK },
  doneBtnOff: { backgroundColor: GREEN + '14', borderColor: GREEN + '66' },
  doneBtnOn: { backgroundColor: GREEN, borderColor: GREEN, ...Elevation.glow(GREEN) },
  doneBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },

  anchor: { ...cardBase, borderLeftWidth: 3, borderLeftColor: READ, padding: Spacing.md, marginBottom: Spacing.sm },
  anchorLbl: { fontSize: FontSize.labelMd, fontWeight: '800', color: READ, letterSpacing: 0.2 },
  anchorVal: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface, marginTop: 4, letterSpacing: -0.2 },
  anchorSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 3, lineHeight: LineHeight.labelSm },

  secLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 9, marginTop: Spacing.sm },
  cola: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 6 },
  colaIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  colaLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4, textTransform: 'uppercase' },
  colaVal: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600', marginTop: 3, lineHeight: 16 },
  colaSub: { fontSize: 9, color: Colors.muted, marginTop: 3, lineHeight: 13 },
  verBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 11, alignItems: 'center', ...WEB_LINK },
  verTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  edgeBtn: { backgroundColor: EDGE + '22', borderWidth: 1, borderColor: EDGE + '99', borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 11, alignItems: 'center', ...WEB_LINK },
  edgeBtnWide: { flex: 1, backgroundColor: EDGE + '22', borderWidth: 1, borderColor: EDGE + '99', borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 11, alignItems: 'center', ...WEB_LINK },
  edgeTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: EDGE, letterSpacing: 0.2 },

  franja: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 8, borderTopWidth: 1, borderTopColor: Hairline.soft },
  franjaHora: { backgroundColor: GREEN + '14', borderRadius: BorderRadius.sm, paddingVertical: 4, paddingHorizontal: 8, minWidth: 96, alignItems: 'center' },
  franjaHoraTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: GREEN, letterSpacing: 0.2 },
  franjaFase: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17 },
  franjaDet: { fontSize: FontSize.labelSm, color: GREEN, marginTop: 3, fontWeight: '600' },
  franjaNivel: { fontSize: 10, color: Colors.champagne, marginTop: 3, lineHeight: 14 },

  // 📏 Medición Palmerton
  medCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm },
  medTitle: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: 0.4 },
  medHint: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 5, lineHeight: LineHeight.labelSm },
  medRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 8, marginBottom: 8 },
  medField: { flex: 1, minWidth: 120 },
  medLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4 },
  medInput: { height: 36, backgroundColor: Colors.surfaceContainerHighest, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, color: Colors.onSurface, textAlign: 'center', fontSize: FontSize.bodyMd, fontWeight: '800', paddingVertical: 0, ...(Platform.OS === 'web' ? { outlineStyle: 'none' as any } : {}) },
  medNotas: { marginTop: 8, minHeight: 40, backgroundColor: Colors.surfaceContainerHighest, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, color: Colors.onSurface, fontSize: FontSize.labelMd, paddingHorizontal: 10, paddingVertical: 8, ...(Platform.OS === 'web' ? { outlineStyle: 'none' as any } : {}) },
  tipoChip: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 11, ...WEB_LINK },
  tipoChipTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  gateBox: { marginTop: 10, borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.sm },
  gateTxt: { fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: 0.2 },
  gateDet: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 3, lineHeight: LineHeight.labelSm },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: LineHeight.labelSm },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.sm, marginBottom: 5, ...WEB_LINK },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 36, letterSpacing: -0.2 },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  d7go: { fontSize: 16, color: GREEN, fontWeight: '800', width: 18, textAlign: 'center' },

  // Temario
  globCard: { ...cardBase, padding: Spacing.md, marginBottom: Spacing.sm },
  globTitle: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  globPct: { fontSize: FontSize.bodyLg, fontWeight: '900', letterSpacing: -0.3 },
  globSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 6, lineHeight: LineHeight.labelSm },
  barTrack: { height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  barFill: { height: 7, borderRadius: 4, ...(Platform.OS === 'web' ? { transition: Motion.spring } as any : {}) },
  sysCard: { ...cardBase, padding: Spacing.md, marginBottom: 6 },
  sysHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 },
  sysTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flex: 1, letterSpacing: -0.2 },
  sysCount: { fontSize: FontSize.labelMd, fontWeight: '800', marginLeft: 8 },
  sysEstado: { fontSize: FontSize.labelSm, fontWeight: '700', marginTop: 6, letterSpacing: 0.2 },
  temaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 7, paddingHorizontal: 6, borderRadius: BorderRadius.sm, borderTopWidth: 1, borderTopColor: Hairline.soft, ...WEB_LINK },
  temaRowOn: { backgroundColor: GREEN + '12' },
  temaRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  temaChk: { fontSize: 16, width: 22, textAlign: 'center' },
  temaRowD: { fontSize: FontSize.labelSm, fontWeight: '800', width: 40 },
  temaRowTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  temaRowGo: { fontSize: 14, color: Colors.muted, width: 16, textAlign: 'center' },
});
