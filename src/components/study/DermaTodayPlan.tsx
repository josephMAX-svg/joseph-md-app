import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp, RingStat } from '../empresa/visuals';
import {
  DERMA_DAILY_META, DERMA_FRANJAS, DERMA_DIAS, DERMA_TIER_INFO,
  DiaDerma, DermaBloqueKey, DermaTier, dermaDiaPrevio, dermaVentana7, diaEstudioTipo,
} from '../../lib/dermaDailyPlan';
import { VUELTAS, INTERVALOS, type Prioridad } from '../../lib/researchData';
import { agruparProgreso, progresoGlobal, planHoyD, GrupoProgreso, loadDone, saveDone } from '../../lib/studyProgress';
import { DERMKI_DECK, ANKIWEB } from '../../lib/ankiLinks';
import { DermaAtlas, SKIN_TONES, SkinTone } from '../../lib/dermaData';
import DermaClinicalPlate from '../derma/DermaClinicalPlate';
import DermaTriptych from '../derma/DermaTriptych';
import DermaDifferentialTray from '../derma/DermaDifferentialTray';
import DermaLineIcon from '../derma/DermaLineIcons';

/**
 * DermaTodayPlan — Plan Derma día-a-día PLAN ÉLITE v2 (70 sesiones: 46 board + 22 estética
 * + 2 checkpoint), mismo motor que Usmle/Mir/ResearchTodayPlan: nav ◄► Día X/70,
 * sub-pestañas HOY/Horario/7d/Temario, progreso REAL marcable (localStorage 'derma'),
 * interdiario con Research. Cada sesión (ciclo único de 45′) = 1-2 casos CIEGOS de
 * "Dermatology Cases for Board Review" (campo access) + ~10Q review del banco rotante
 * Pictorial/CORE/Barnhill/QOTW (campo qbankly) + 10′ lectura dirigida del módulo (campo
 * extra). Bloque Calendar 13:30–14:15 (alterna con Research).
 */
const PURPLE = DermaAtlas.amethyst; // #9A7BC8 amatista (antes #8B5CF6 fosforescente)
const TEAL = DermaAtlas.jade;        // #5FA88C jade (antes #0FD4A0 neón)
const EDGE = DermaAtlas.edge;        // #5B8FB0 zafiro apagado (antes #3DA5E0)
const GOLD = DermaAtlas.gold;        // #C8A96A élite / no-errar
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

type ColaIconName = 'read' | 'flask' | 'atlas' | 'body' | 'differential';
const COLA_ICON: Record<ColaIconName, React.ComponentProps<typeof DermaLineIcon>['name']> = {
  read: 'atlas', flask: 'flask', atlas: 'atlas', body: 'body', differential: 'differential',
};
/** Ítem de la cola: link real; `edge` añade el botón Microsoft Edge (Qbankly). */
function ColaItem({ icon, lbl, val, sub, color, url, edge }: { icon: ColaIconName; lbl: string; val: string; sub: string; color: string; url: string; edge?: boolean }) {
  return (
    <View style={[st.cola, { borderLeftColor: color }]}>
      <View style={st.colaIconBox}><DermaLineIcon name={COLA_ICON[icon]} size={18} color={color} /></View>
      <View style={{ flex: 1 }}>
        <Text style={st.colaLbl}>{lbl}</Text>
        <Text style={st.colaVal} numberOfLines={2}>{val}</Text>
        <Text style={st.colaSub} numberOfLines={2}>{sub}</Text>
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

function HoyView({ dia, onOpenTemario, hecho, onToggle, tone }: { dia: DiaDerma; onOpenTemario: () => void; hecho: boolean; onToggle: (d: number) => void; tone: SkinTone }) {
  const prev = dermaDiaPrevio(dia);
  const fc = bc(dia);
  const prio = TIER_PRIO[dia.tier];
  return (
    <View>
      {/* CASO DEL DÍA — lámina clínica (imagen primero) que envuelve el átomo */}
      <FadeUp>
        <DermaClinicalPlate dia={dia} accent={fc} tone={tone}>
          {/* Meta-fila: bloque (→ Temario) · tier · vueltas · referente */}
          <View style={st.temaTop}>
            <TouchableOpacity activeOpacity={0.8} onPress={onOpenTemario} style={[st.sysBadge, { backgroundColor: fc + '1F', borderColor: fc + '66' }]}>
              <Text style={[st.sysBadgeTxt, { color: fc }]}>{dia.bKey} · {dia.bloque} ›</Text>
            </TouchableOpacity>
            <Chip label={DERMA_TIER_INFO[dia.tier].t} color={DERMA_TIER_INFO[dia.tier].c} small />
            <Chip label={`${VUELTAS[prio]} vueltas · D+${INTERVALOS[prio].join('/')}`} color={Colors.muted} small />
            {dia.referente && <Chip label={`según ${dia.referente}`} color={GOLD} small />}
          </View>
          <View style={st.gateRow}>
            <DermaLineIcon name="skinLayers" size={15} color={fc} />
            <Text style={st.temaGate}>Mastery gate (caso ciego): describe la lámina en terminología estándar (lesión 1ª/2ª, color, distribución, configuración) + diferencial de 3 ANTES de leer la viñeta.</Text>
          </View>
          <TouchableOpacity activeOpacity={0.85} onPress={() => onToggle(dia.d)} style={[st.doneBtn, hecho ? st.doneBtnOn : st.doneBtnOff]}>
            <Text style={[st.doneBtnTxt, { color: hecho ? '#1A1031' : PURPLE }]}>{hecho ? '✓ Átomo dominado (cuenta en el %)' : '○ Marcar átomo como hecho'}</Text>
          </TouchableOpacity>
        </DermaClinicalPlate>
      </FadeUp>

      {/* Correlación clínica ↔ dermatoscopia ↔ histología (solo si el caso lo tiene) */}
      <FadeUp delay={30}><DermaTriptych dia={dia} accent={fc} /></FadeUp>

      {/* Construye tu diferencial (Palmerton, ciego → revelar) */}
      {dia.ddx && dia.ddx.length > 0 && (
        <FadeUp delay={50}>
          <View style={{ marginTop: Spacing.sm }}>
            <DermaDifferentialTray ddx={dia.ddx} diaKey={dia.d} />
          </View>
        </FadeUp>
      )}

      {/* Eval anclada (átomo previo) */}
      {prev && (
        <FadeUp delay={70}>
          <View style={st.anchor}>
            <Text style={st.anchorLbl}>13:30 · Repaso FSRS (sesión ANTERIOR)</Text>
            <Text style={st.anchorVal}>D{prev.d} · {prev.sub}</Text>
            <Text style={st.anchorSub}>Tarjetas de MECANISMO + oclusiones del caso previo · fallo repetido → segunda pasada FSRS · etiqueta cada fallo con su módulo CORE (med/ped/surg/path)</Text>
          </View>
        </FadeUp>
      )}

      {/* Cola de materiales reales de hoy (caso ciego → review → lectura) */}
      <Text style={st.secLbl}>Materiales de la sesión · 13:33–14:13 · links REALES (en orden)</Text>
      <FadeUp delay={80}>
        <ColaItem icon="read" lbl="CASO CIEGO · Cases for Board Review (4 pasos)" val={dia.access.t} sub={dia.sub} color={fc} url={dia.access.url} />
      </FadeUp>
      {dia.qbankly && (
        <FadeUp delay={100}>
          <ColaItem icon="flask" lbl="REVIEW · ~10Q del banco rotante" val={dia.qbankly.t} sub="variable de ajuste · etiqueta cada fallo con su módulo CORE (med/ped/surg/path)" color={EDGE} url={dia.qbankly.url} edge={dia.qbankly.via === 'edge'} />
        </FadeUp>
      )}
      {dia.promir && (
        <FadeUp delay={120}>
          <ColaItem icon="atlas" lbl="2º PASE ES · ProMIR (Enfoque + figuras)" val={dia.promir.t} sub="anclaje España · asignatura 5 Dermatología" color={DermaAtlas.promir} url={dia.promir.url} />
        </FadeUp>
      )}
      {dia.extra && (
        <FadeUp delay={150}>
          <ColaItem icon="body" lbl="LECTURA 10′ · dirigida del módulo" val={dia.extra.t} sub={dia.referente ? `fuente nº1 de ${dia.referente} · nunca lectura lineal` : 'lectura del módulo · nunca lineal'} color={DermaAtlas.periwinkle} url={dia.extra.url} />
        </FadeUp>
      )}

      {/* ANKI · Dermki (deck pagado, verificado en Anki) */}
      <FadeUp delay={165}>
        <ColaItem icon="differential" lbl="ANKI · Dermki (deck pagado · SRS)" val={`${DERMKI_DECK} → capítulo del bloque de hoy`} sub="abre AnkiWeb ↗ · 11 capítulos + AAD Basic Curriculum" color={DermaAtlas.teal} url={ANKIWEB} />
      </FadeUp>

      {/* APEX */}
      <FadeUp delay={180}>
        <View style={[st.cola, { borderLeftColor: GOLD }]}>
          <View style={st.colaIconBox}><DermaLineIcon name="histoDrop" size={18} color={GOLD} /></View>
          <View style={{ flex: 1 }}>
            <Text style={st.colaLbl}>CIERRE · 14:13–14:15</Text>
            <Text style={st.colaVal}>1-2 tarjetas de MECANISMO + 1 oclusión de imagen del caso (formato Palmerton)</Text>
            <Text style={st.colaSub}>Free recall del caso en voz alta · mismo mazo FSRS que Step 1 · etiqueta fallos por módulo CORE</Text>
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
    if (tipo === 'pretest') return dia.sub;
    if (tipo === 'read') return dia.access.t;
    if (tipo === 'review') return dia.qbankly ? dia.qbankly.t : '— (hoy sin bloque de review)';
    if (tipo === 'lectura') return dia.extra ? dia.extra.t : '— (hoy sin lectura dirigida)';
    if (tipo === 'promir') return dia.promir ? dia.promir.t : '— (átomo sin capítulo ProMIR)';
    if (tipo === 'recall') return 'free recall del caso: morfología → ddx → dx → mecanismo';
    if (tipo === 'apex') return 'tarjetas de mecanismo + etiquetar fallos + marcar progreso';
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
      <Text style={st.note}>Interdiario con Research: el bloque 13:30–14:15 del Calendar alterna Research↔Derma por día hábil. Avanzas 1 átomo por día-Derma. No se modifica el Calendar.</Text>
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
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: fc }]}>
              <Text style={[st.d7day, { color: fc }]}>D{x.d}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.sub}</Text>
                <Text style={st.d7sys}>{x.bKey} · {x.bloque}{x.referente ? ` · ${x.referente}` : ''}</Text>
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
  return (
    <View style={[st.sysCard, { borderColor: fc + (g.estado === 'en-curso' ? '88' : '2E') }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
        <View style={st.sysHead}>
          <Text style={st.sysTitle} numberOfLines={1}>{open ? '▾' : '▸'} {g.clave}</Text>
          <Text style={[st.sysCount, { color: estadoColor }]}>{g.hechos}/{g.total}</Text>
        </View>
        <ProgressBar pct={g.pct} color={fc} />
        <Text style={[st.sysEstado, { color: estadoColor }]}>{estadoTxt}</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: 8 }}>
          {g.dias.map((x) => {
            const hecho = done.has(x.d), now = x.d === hoyD;
            return (
              <View key={x.d} style={[st.temaRow, now && st.temaRowOn]}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle(x.d)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
                  <Text style={[st.temaChk, { color: hecho ? TEAL : 'rgba(255,255,255,0.25)' }]}>{hecho ? '☑' : '☐'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={st.temaRowMain}>
                  <Text style={[st.temaRowD, { color: hecho ? TEAL : now ? fc : Colors.muted }]}>{now ? '▶' : ''} D{x.d}</Text>
                  <Text style={st.temaRowTxt} numberOfLines={1}>{x.sub}</Text>
                  <Text style={[st.temaRowVta, { color: DERMA_TIER_INFO[x.tier].c }]}>{VUELTAS[TIER_PRIO[x.tier]]}v</Text>
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
        <Text style={st.globSub}>{glob.hechos}/{glob.total} átomos · hoy = Día {hoyD} · {grupos.length} bloques (A–H board · Z cierre · X estética) · vueltas: CRÍT {VUELTAS.CRITICA}v D+{INTERVALOS.CRITICA.join('/')} · ALTA {VUELTAS.ALTA}v · MEDIA {VUELTAS.MEDIA}v</Text>
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
        <Text style={st.artefactoTxt}>PLAN ÉLITE v2: 200 casos ciegos (Board Review) × review 1.301Q × módulos semanales → DERMATOLOGÍA ESTÉTICA (anatomía/danger zones → toxina → fillers → peelings → láser → cosmecéutica) · {DERMA_DAILY_META.bloque}</Text>
      </View>

      {/* Anillos de progreso REAL (board · estética · críticos · global) */}
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

  anchor: { ...cardBase, borderLeftWidth: 3, borderLeftColor: DermaAtlas.periwinkle, padding: Spacing.md, marginBottom: Spacing.sm },
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
  sysHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 },
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
