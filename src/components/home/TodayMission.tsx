import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Animated, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { MIR_DIAS, mirSesionDe, capUrl } from '../../lib/mirDailyPlan';
import { MIR_MANT_META } from '../../lib/mirMantenimiento';
import { QBQ, DIAS, DIAS_T2, estadoUSMLE, etiquetaDiaUSMLE, esFilaT2, TIPO_FILA_T2_LABEL } from '../../lib/usmleStep1Daily';
import { mirObsUrl, usmleObsUrl, encapsObsUrl, OBS_MAPA_URL } from '../../lib/obsidianMap';
import { vibeDiaDe, vibeProyectoEnFecha, vibeTaperEnFecha, vibeJournalUrl, VIBE_TIPO_LABEL, VIBE_ROTACION_ICON, VIBE_META } from '../../lib/vibecodingPlan';
import {
  semanaStep1, semanaLabel, leerModo, guardarModo, minimoPorFrente, MODO_INFO, ModoNivel, Frente,
} from '../../lib/homeBriefing';
import { FECHAS_V6, faseV6, faseV6Info } from '../../lib/fechasV6';
import type { Turno } from '../../lib/fechasV6';
import { plantillaDelDia } from '../../lib/plantillasV6';
import type { BloqueV6, PlanBloque, PlantillaDia } from '../../lib/plantillasV6';
import {
  infoTurno, guardarTurno, desmarcarTurno, onTurnosChange, pullTurnos, semanaLS, addDiasISO, dowCorto,
  TURNO_INFO, TURNOS_V6, VARIANTES_HORA, aplicaTurno,
} from '../../lib/serumsTurnos';
import { DIAS as RESEARCH_DIAS } from '../../lib/researchDailyPlan';
import { DIAS_2027 as RESEARCH_DIAS_2027 } from '../../lib/researchDailyPlan2027';
import { dermaDiaDeConCiclo2 } from '../../lib/dermaCiclo2';
import { aurumDiaDe } from '../../lib/aurumDailyPlan';
import { livDiaDe } from '../../lib/livianoStudyPlan';
import { synDiaDe } from '../../lib/synapseDailyPlan';

/**
 * TodayMission — "MISIÓN DE HOY" del cockpit (Home). Línea de tiempo REAL del Google
 * Calendar v5.5 (IA 04:15 · USMLE Anki AM 05:00 · USMLE 07:15-12:00 principal · MIR 15:15 · ENCAPS 16:15 1h · LIVIANO 17:15 · USMLE eval 18:00)
 * con el tema del día de cada plan (mirDailyPlan / usmleStep1Daily) y accesos
 * directos: ProMIR ↗ · Qbankly (◆ Edge) · ◆ Obsidian (nota madre donde caen los APEX).
 * El bloque en curso se resalta con "AHORA". Fase = detect_phase del orquestador.
 *
 * v5.7 (5-sep-2026):
 *  · bloque 04:15 enlazado al PROYECTO DE LA SEMANA del vibecoding (src/lib/vibecodingPlan.ts, S1-S12):
 *    paso del día + docs ↗; el ✓ diario vive en SYNAPSE → ⚡ run (PlanKey 'vibecoding').
 *  · selector de MODO del día (VERDE / ÁMBAR / ROJO, localStorage 'jmd-modo', default VERDE) según
 *    DATA/PROTOCOLO_MODO_MINIMO.md: cada bloque muestra su mínimo cuando el nivel no es VERDE.
 *  · chip "S N/STEP1_SEMANAS" (semana del Step 1) y "DELOAD" en las semanas post-NBME 26 / post-NBME 28.
 * v5.10-b (12-sep-2026, gaps_v3b_synapse 2/4/5):
 *  · FRENO 04:55: cuenta atrás en la tarjeta 04:15 (solo mientras la hora está dentro del bloque): "commit-or-stash en
 *    m:ss" y, desde las 04:55, "COMMIT OR STASH · Anki 05:00 en m:ss". Regla: si el día se recorta pierde el proyecto, nunca el Anki.
 *  · botón "📓 journal" → D:/synapse-journal/journal/<semana ISO>.md (vscode://; node DATA/_scripts/journal_hoy.js lo crea).
 *  · S13-S20 (taper: mantenimiento ≤15' / deload total) se muestran desde VIBE_TAPER cuando ya no hay proyecto.
 * v6.00 (6-oct-2026 · V6_ESPEC §F):
 *  · faseActual(iso) = etiqueta de fechasV6.faseV6 (F1 · TRANSICIÓN · F2 · LIBRE post-ENCAPS · F3 · F4 · EXAMEN · F5).
 *  · los bloques salen de plantillasV6.plantillaDelDia(iso, turno) (adiós a los bloques fijos de F1 escritos a mano): F1 = los de hoy
 *    (+ SYNAPSE 12:30, R↔D 13:30 y AURUM 14:15, que ya estaban en el Calendar) · F2 intensiva ENCAPS · F3 + 16:15 REENTRADA · F4 por turno.
 *  · desde serums.inicio: selector de TURNO del día (M · T · L · G + variante de hora del T) que re-renderiza la plantilla y se guarda
 *    con serumsTurnos.guardarTurno, + vista semanal (L-S) para pre-cargar el rol del mes.
 *  · banner 🛡 DÍA PROTEGIDO (fechasV6.esProtegido) · en F2 tarjeta «Step 1 en PAUSA» · chip semanaLabel (S n/41 · PAUSA · ENCAPS).
 *  · modo ÁMBAR: secundarios a 30' (mínimo DJ-4), MIR Anki + 25Q (1 h) · ROJO: la fila no hecha va al COLCHÓN (ya no hay remap).
 *
 * Colores por-segmento en JOYA APAGADA (mapeo cognitivo NASA), tokens v4:
 * ENCAPS→teal · MIR→gold(amber) · USMLE→jade(green) · Obsidian→amethyst(purple) · Edge→sapphire(blue)
 */
const AMBER = Colors.amber;   // MIR — champagne (gold)
const GREEN = Colors.green;   // USMLE — jade
const TEAL = Colors.teal;     // ENCAPS — muted teal
const EDGE = Colors.blue;     // Edge/Qbankly — sapphire
const OBS = Colors.purple;    // Obsidian — amethyst
const CORAL = Colors.coral;   // SERUMS / protegido

const MONO = Platform.OS === 'web' ? "'JetBrains Mono', 'SF Mono', monospace" : undefined;
const MODO_COLOR: Record<ModoNivel, string> = { VERDE: Colors.green, AMBAR: Colors.amber, ROJO: Colors.coral };
/** v6.00: color por plan del bloque (plantillasV6.PlanBloque). */
const PLAN_COLOR: Record<PlanBloque, string> = {
  usmle: GREEN, encaps: TEAL, mir: AMBER, 'research-derma': EDGE, aurum: Colors.gold, liviano: AMBER, synapse: OBS, vibecoding: OBS,
  serums: CORAL, gimnasio: Colors.muted, vida: Colors.muted, revision: Colors.champagne,
};
const PLAN_FLAG: Record<PlanBloque, string> = {
  usmle: '🇺🇸', encaps: '🇵🇪', mir: '🇪🇸', 'research-derma': '🔬', aurum: '🪙', liviano: '⚖️', synapse: '🧠', vibecoding: '🧠',
  serums: '🏥', gimnasio: '🏋️', vida: '·', revision: '📋',
};
const TURNO_COLOR: Record<Turno, string> = { M: AMBER, T: EDGE, L: GREEN, G: CORAL };

function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
export function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return '2026-06-10'; }
}
/**
 * Fase del plan (V6_ESPEC §A1/§F) para el chip y la Cockpit Status Bar. Exportada.
 * v6.00: etiqueta de fechasV6.faseV6 — antes FASE 4…9 del orquestador (v5.20: FASE 7 = Step 1 principal hasta el 22-feb).
 */
export function faseActual(iso: string): string {
  return faseV6Info(iso).etiqueta; // antes del D1 (≤ 6-oct) faseV6 ya devuelve F1
}
function nowMin(): number { try { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); } catch { return 0; } }
const hm = (s: string) => { const [h, m] = s.split(':').map(Number); return (h as number) * 60 + (m as number); };

/** Etiqueta corta MIR del día (para el briefing/status bar). null si no hay sesión MIR (v6.00: incluye mantenimiento y extensión). */
export function mirLabelDe(iso: string): string | null {
  const s = mirSesionDe(iso);
  if (!s) return null;
  return s.tipo === 'plan' ? `MIR D${s.dia.d} · ${s.dia.asignatura}` : `MIR M${s.dia.d}/${MIR_MANT_META.totalDias} · ${s.dia.asignatura}`;
}
/** Etiqueta corta USMLE del día (para el briefing/status bar). null si no hay fila hoy · v6.00: «PAUSA» entre el 31-dic y el reinicio. */
export function usmleLabelDe(iso: string): string | null {
  const e = estadoUSMLE(iso);
  if (e.estado === 'PAUSA') return 'USMLE · PAUSA (ENCAPS)';
  if (e.estado !== 'PLAN' || !e.exacto) return null;
  return `USMLE ${etiquetaDiaUSMLE(e.dia)} · ${e.dia.system}`;
}

interface Accion { lbl: string; color: string; url: string; fill?: boolean }

/** chip AHORA con pulso animado (élite, sutil) */
function AhoraChip({ color }: { color: string }) {
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 0.55, duration: 800, useNativeDriver: false }),
      Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: false }),
    ]));
    loop.start();
    return () => loop.stop();
  }, []);
  return (
    <Animated.View style={[st.ahoraChip, { backgroundColor: color, opacity: pulse }]}>
      <Text style={st.ahoraTxt}>AHORA</Text>
    </Animated.View>
  );
}

function segundosDia(): number { try { const d = new Date(); return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds(); } catch { return 0; } }
/** FRENO 04:55 (vacío 4 · gaps_v3b_synapse): cuenta atrás hasta el commit-or-stash y hasta el Anki de las 05:00.
 *  Tick de 1 s propio (como EncapsCockpit/ApexManualModal); fuera del bloque 04:15-05:00 no renderiza nada. */
function Freno0455() {
  const [seg, setSeg] = useState<number>(() => segundosDia());
  useEffect(() => {
    const id = setInterval(() => setSeg(segundosDia()), 1000);
    return () => clearInterval(id);
  }, []);
  const ini = hm('04:15') * 60, freno = hm(VIBE_META.freno0455) * 60, anki = hm(VIBE_META.ankiInicio) * 60;
  if (seg < ini || seg >= anki) return null;
  const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  if (seg < freno) {
    const falta = freno - seg; const urgente = falta <= 5 * 60; const c = urgente ? Colors.amber : OBS;
    return (
      <View style={[st.frenoChip, { borderColor: c + '88', backgroundColor: c + '18' }]}>
        <Text style={[st.frenoTxt, { color: c }]}>⏱ commit-or-stash en {mmss(falta)} · Anki {VIBE_META.ankiInicio}</Text>
      </View>
    );
  }
  return (
    <View style={[st.frenoChip, { borderColor: Colors.coral + 'AA', backgroundColor: Colors.coral + '22' }]}>
      <Text style={[st.frenoTxt, { color: Colors.coral }]}>COMMIT OR STASH · Anki {VIBE_META.ankiInicio} en {mmss(anki - seg)}</Text>
    </View>
  );
}

/** Selector VERDE / ÁMBAR / ROJO del día (PROTOCOLO_MODO_MINIMO). Persistente por día en localStorage 'jmd-modo'. */
function ModoSelector({ nivel, onChange }: { nivel: ModoNivel; onChange: (n: ModoNivel) => void }) {
  return (
    <View style={st.modoRow}>
      <Text style={st.modoLbl}>MODO</Text>
      {(['VERDE', 'AMBAR', 'ROJO'] as ModoNivel[]).map((n) => {
        const on = n === nivel; const c = MODO_COLOR[n];
        return (
          <TouchableOpacity key={n} activeOpacity={0.8} onPress={() => onChange(n)} hitSlop={{ top: 6, bottom: 6, left: 2, right: 2 }}
            style={[st.modoChip, { borderColor: c + (on ? 'AA' : '44') }, on && { backgroundColor: c + '22' }]}>
            <View style={[st.modoDot, { backgroundColor: c, opacity: on ? 1 : 0.45 }]} />
            <Text style={[st.modoTxt, { color: on ? c : Colors.muted }]}>{MODO_INFO[n].label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/** v6.00 · selector de TURNO del día (F4: M · T · L · G + variante de hora del T). Se guarda con serumsTurnos.guardarTurno. */
function TurnoSelector({ iso }: { iso: string }) {
  const it = infoTurno(iso);
  const variantes = VARIANTES_HORA[it.turno] ?? [];
  return (
    <View style={[st.modoCard, { borderColor: TURNO_COLOR[it.turno] + '66' }]}>
      <View style={st.modoRow}>
        <Text style={st.modoLbl}>TURNO HOY</Text>
        {TURNOS_V6.map((t) => {
          const on = it.marcado && it.turno === t; const c = TURNO_COLOR[t];
          return (
            <TouchableOpacity key={t} activeOpacity={0.8} onPress={() => guardarTurno(iso, t, t === it.turno ? it.horaInicio : null)} hitSlop={{ top: 6, bottom: 6, left: 2, right: 2 }}
              style={[st.modoChip, { borderColor: c + (on ? 'AA' : '44') }, on && { backgroundColor: c + '22' }]}>
              <Text style={[st.modoTxt, { color: on ? c : Colors.muted }]}>{t} · {TURNO_INFO[t].label}</Text>
            </TouchableOpacity>
          );
        })}
        {it.marcado && (
          <TouchableOpacity activeOpacity={0.8} onPress={() => desmarcarTurno(iso)} style={[st.modoChip, { borderColor: Colors.muted + '44' }]}>
            <Text style={[st.modoTxt, { color: Colors.muted }]}>✕ desmarcar</Text>
          </TouchableOpacity>
        )}
      </View>
      {it.marcado && variantes.length > 0 && (
        <View style={[st.modoRow, { marginTop: 6 }]}>
          <Text style={st.modoLbl}>HORA {it.turno}</Text>
          {variantes.map((h) => {
            const on = (it.horaInicio ?? '13:00') === h;
            return (
              <TouchableOpacity key={h} activeOpacity={0.8} onPress={() => guardarTurno(iso, it.turno, h === '13:00' ? null : h)}
                style={[st.modoChip, { borderColor: TURNO_COLOR[it.turno] + (on ? 'AA' : '44') }, on && { backgroundColor: TURNO_COLOR[it.turno] + '22' }]}>
                <Text style={[st.modoTxt, { color: on ? TURNO_COLOR[it.turno] : Colors.muted }]}>{h}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <Text style={st.modoInfo}>
        {it.marcado
          ? `${TURNO_INFO[it.turno].label} (${it.horaInicio ? `${it.horaInicio} · ` : ''}${TURNO_INFO[it.turno].horario}) · la plantilla de abajo se ajusta sola · MIR siempre 1 h · R↔D 30' en tiempo muerto.`
          : '⚠ Marca tu turno: sin marcar se asume M (PISO de horas). Un turno sin marcar nunca mueve un hito.'}
      </Text>
    </View>
  );
}
const CICLO_TURNO: (Turno | null)[] = [null, 'M', 'T', 'L', 'G'];
/** v6.00 · rol semanal (L-S) para pre-cargar los turnos del mes: tocar un día rota sin marcar → M → T → L → G. */
function RolSemanal({ iso }: { iso: string }) {
  // v6.00: el domingo (libre) abre la semana SIGUIENTE (la que hay que pre-cargar); semanaLS(dom) sería la que acaba de terminar
  const [off, setOff] = useState(() => (dowCorto(iso) === 'dom' ? 1 : 0));
  const dias = semanaLS(addDiasISO(iso, off * 7));
  const hitoDe = (f: string) => DIAS_T2.find((x) => x.fecha === f && x.tipo === 'hito');
  const rotar = (f: string) => {
    const it = infoTurno(f);
    const i = CICLO_TURNO.indexOf(it.marcado ? it.turno : null);
    const sig = CICLO_TURNO[(i + 1) % CICLO_TURNO.length] ?? null;
    if (sig) guardarTurno(f, sig); else desmarcarTurno(f);
  };
  return (
    <View style={st.rolCard}>
      <View style={st.modoRow}>
        <Text style={st.modoLbl}>ROL L-S</Text>
        <TouchableOpacity onPress={() => setOff((o) => Math.max(0, o - 1))} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}><Text style={st.rolNav}>◄</Text></TouchableOpacity>
        <Text style={st.rolSem}>{dias[0]?.slice(5)} → {dias[5]?.slice(5)}</Text>
        <TouchableOpacity onPress={() => setOff((o) => Math.min(8, o + 1))} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}><Text style={st.rolNav}>►</Text></TouchableOpacity>
      </View>
      <View style={[st.modoRow, { marginTop: 6 }]}>
        {dias.map((f) => {
          const it = infoTurno(f); const c = it.marcado ? TURNO_COLOR[it.turno] : Colors.muted; const h = hitoDe(f);
          return (
            <TouchableOpacity key={f} activeOpacity={0.8} disabled={!aplicaTurno(f)} onPress={() => rotar(f)}
              style={[st.rolDia, { borderColor: c + (it.marcado ? 'AA' : '44') }, f === iso && { backgroundColor: c + '22' }]}>
              <Text style={st.rolDow}>{dowCorto(f)} {f.slice(8)}{h ? ' 🎯' : ''}</Text>
              <Text style={[st.rolTurno, { color: c }]}>{it.marcado ? it.turno : '·'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={st.modoInfo}>Toca un día para rotar sin marcar → M → T → L → G. 🎯 = hito con fecha preferente ese día (se mueve al primer día T/L de su ventana si lo marcas M o G).</Text>
    </View>
  );
}

/** Tema / sub / acciones de un bloque de la plantilla (contenido del plan de cada frente para ESA fecha). */
function contenidoBloque(b: BloqueV6, p: PlantillaDia, iso: string): { tema: string; sub: string; acciones: Accion[] } {
  const us = p.usmle;
  switch (b.plan) {
    case 'vibecoding': {
      const vibeDia = vibeDiaDe(iso), vibeP = vibeProyectoEnFecha(iso), vibeT = vibeTaperEnFecha(iso);
      const tema = vibeP
        ? (vibeDia
          ? `S${vibeP.s} · ${vibeP.nombre} — hoy (${VIBE_TIPO_LABEL[vibeDia.tipo]}${vibeDia.min !== 45 ? ` ${vibeDia.min}'` : ''}): ${vibeDia.paso}`
          : `S${vibeP.s} · ${vibeP.nombre} — sáb PC 15:00 = SHIP (node DATA/_scripts/verify_vibecoding.js ${vibeP.s}) · dom = Feynman (fuera de L-V)`)
        : vibeT
          ? (vibeDia ? `S${vibeT.s} · ${vibeT.nombre} — hoy (${VIBE_TIPO_LABEL[vibeDia.tipo]} ${vibeDia.min}'): ${vibeDia.paso}` : `S${vibeT.s} · ${vibeT.nombre} — ${vibeT.shipTxt}`)
          : `fuera del rango del plan (${VIBE_META.inicio.slice(8)}-${VIBE_META.inicio.slice(5, 7)} → ${VIBE_META.finTaper.slice(8)}-${VIBE_META.finTaper.slice(5, 7)})`;
      const sub = vibeP
        ? `${VIBE_ROTACION_ICON[vibeP.rotacion]} ${vibeP.rotacion} · entregable: ${vibeP.entregable}${vibeP.deload ? ' · DELOAD 50%' : ''} · ✓ diario en SYNAPSE → ⚡ run · ${VIBE_META.freno}`
        : vibeT ? `taper · ${vibeT.tipo} · ${vibeT.semanaStep1} · ${VIBE_META.freno}` : `5' objetivo → 35' construir → 5' journal · ${VIBE_META.freno}`;
      const acciones: Accion[] = [...(vibeP && vibeP.docs[0] ? [{ lbl: 'docs ↗', color: OBS, url: vibeP.docs[0].url, fill: true }] : []), { lbl: '📓 journal', color: OBS, url: vibeJournalUrl(iso) }];
      return { tema, sub, acciones };
    }
    case 'usmle': {
      if (b.frente === 'usmle-anki') return { tema: b.detalle ?? 'Pasada principal FSRS del deck USMLE · Fases B-C: + stress set 10Q/12min', sub: us ? `Step 1 · ${etiquetaDiaUSMLE(us)}` : 'Step 1', acciones: [] };
      if (b.frente === 'usmle-eval') return { tema: b.nombre.includes('hito') ? 'Registra el % del hito en 📏 Medición (Cola de hoy)' : 'Bloque timed mixto de temas vistos + corrección + APEX', sub: 'termómetro diario del Step 1 · anchoring pre-sueño · registra las horas netas del día (GO/NO-GO por horas)', acciones: [{ lbl: '◆ Obsidian', color: OBS, url: OBS_MAPA_URL }] };
      if (b.id === 'reentrada') return { tema: us?.franjaNota ?? 'REENTRADA: 20Q timed del sistema de la rotación', sub: 'F3 · 16:15 · ≥80 % → el sistema sigue vivo', acciones: [] };
      if (!us || b.frente == null) return { tema: b.detalle ?? '', sub: '', acciones: [] };
      const tipo = esFilaT2(us) ? ` · ${TIPO_FILA_T2_LABEL[us.tipo]}${us.parte ? ` ${us.parte}` : ''}` : '';
      const q = esFilaT2(us) && us.qDiaT != null && p.turno === 'T' ? `${us.qDiaT}Q (turno T)` : `${us.qDia}Q`;
      return {
        tema: `${etiquetaDiaUSMLE(us)}${tipo} · ${us.system} — ${us.sub}`,
        sub: `${us.bbCh}: ${us.bbVid} · ${us.mat} · nivel UW ${us.nivelUW} · ${q} · todo en inglés`,
        acciones: [
          { lbl: '◆ Edge', color: EDGE, url: 'microsoft-edge:' + QBQ, fill: true },
          ...(usmleObsUrl(us.d) ? [{ lbl: '◆ Obsidian', color: OBS, url: usmleObsUrl(us.d) as string }] : []),
        ],
      };
    }
    case 'mir': {
      const s = mirSesionDe(iso);
      if (!s) return { tema: p.protegido ? 'día protegido: sin MIR' : 'sin sesión MIR hoy', sub: '1 h/día (DJ-4)', acciones: [] };
      if (s.tipo === 'plan') {
        const mir = s.dia;
        return {
          tema: `D${mir.d}/${MIR_DIAS.length} · ${mir.asignatura} — ${mir.tema}`,
          sub: mir.peso != null ? `Peso MIR ${mir.peso}% · ${mir.vuelta}ª vuelta` : '1ª vuelta',
          acciones: [{ lbl: 'ProMIR ↗', color: AMBER, url: capUrl(mir.capId), fill: true }, ...(mirObsUrl(mir.capId) ? [{ lbl: '◆ Obsidian', color: OBS, url: mirObsUrl(mir.capId) as string }] : [])],
        };
      }
      const m = s.dia;
      return { tema: `M${m.d}/${MIR_MANT_META.totalDias} · ${m.tipo === 'sabado' ? 'SÁBADO · mini-simulacro 30Q mixtas' : m.tipo === 'viernes' ? 'viernes · asignatura peor del log' : m.asignatura} — ${m.nQ}Q`, sub: `${m.fase === 'extension' ? 'extensión' : 'mantenimiento'} · banqueo puro (Anki APEX::MIR + preguntas reales) · franja según el turno`, acciones: [] };
    }
    case 'encaps':
      return {
        tema: b.detalle ?? (faseV6(iso) === 'F1' ? 'Banco del día según pronóstico v3 (rotación II·I·V·III·IV) · viernes = mini-simulacro 25Q' : 'tipo del día en ENCAPS → Plan (Supabase)'),
        sub: `registro de errores en TRACKING_ERRORES · intensiva ${FECHAS_V6.encaps.intensiva_desde.slice(8)}-ene → D-1 · examen ${FECHAS_V6.encaps.examen}${FECHAS_V6.encaps.provisional ? ' PROVISIONAL' : ''}`,
        acciones: [{ lbl: '◆ Obsidian', color: OBS, url: encapsObsUrl('salud_publica') || OBS_MAPA_URL }],
      };
    case 'research-derma': {
      if (b.detalle) return { tema: b.detalle, sub: "30' (DJ-4) · sin átomo nuevo", acciones: [] };
      const r = [...RESEARCH_DIAS, ...RESEARCH_DIAS_2027].find((x) => x.fecha === iso);
      const d = dermaDiaDeConCiclo2(iso);
      const tema = r ? `Research ${r.code} · ${r.objetivo}` : d ? `Derma d${d.d} · ${d.sub}` : 'sin átomo hoy (interdiario)';
      return { tema, sub: faseV6(iso) === 'F4' ? "30' en tiempo muerto (posta): núcleo del átomo" : 'interdiario Research ↔ Derma', acciones: [] };
    }
    case 'aurum': {
      const a = aurumDiaDe(iso);
      return { tema: a ? `D${a.d} · ${a.titulo}` : 'sin lección hoy', sub: a ? (a.min30 ? "30' (núcleo) · bloques extra opcionales" : `${a.min}' núcleo (ver + practicar)`) : '', acciones: [] };
    }
    case 'liviano': {
      const l = livDiaDe(iso);
      return { tema: l ? `${l.modulo} — ${l.tema}` : 'Módulo del día — ver Business → LIVIANO → Academia', sub: '25 min estudio + 20 min aplicación (explicárselo a un paciente)', acciones: [] };
    }
    case 'synapse': {
      const s = synDiaDe(iso);
      return { tema: s ? `S${s.semana} · ${s.fase}` : 'SYNAPSE', sub: "A 15' pantalla · B 10' audio · C 5' lectura", acciones: [] };
    }
    default:
      return { tema: b.detalle ?? '', sub: '', acciones: [] };
  }
}

export default function TodayMission({ onGo }: { onGo?: (screen: string) => void }) {
  const iso = todayISO();
  const ahora = nowMin();
  const sem = semanaStep1(iso);
  const [modo, setModo] = useState<ModoNivel>(() => leerModo(iso));
  const cambiarModo = (n: ModoNivel) => { setModo(n); guardarModo(iso, n); };
  const [, setTick] = useState(0);
  // v6.00: el turno re-renderiza la plantilla; en F4 se trae el rol de Supabase (serums_turnos; tolerante a que no exista)
  useEffect(() => onTurnosChange(() => setTick((t) => t + 1)), []);
  useEffect(() => { if (aplicaTurno(iso)) void pullTurnos(addDiasISO(iso, -7), addDiasISO(iso, 63)); }, [iso]);
  const p = plantillaDelDia(iso);
  const fase = faseV6(iso);
  const enF4 = fase === 'F4' && aplicaTurno(iso);

  return (
    <View style={st.wrap}>
      <View style={st.head}>
        <View style={st.titleRail} />
        <Text style={st.title}>MISIÓN DE HOY</Text>
        <View style={st.faseChip}><Text style={st.faseTxt}>{faseActual(iso)}</Text></View>
        {(!sem.fueraDeRango || sem.pausa || sem.examen) && ( /* v6.00: la semana del examen (fuera de rango, n = 42) muestra el chip «examen» */
          <View style={[st.faseChip, (sem.deload || sem.pausa) && { borderColor: Colors.amber + '66', backgroundColor: Colors.amber + '1A' }]}>
            <Text style={[st.faseTxt, (sem.deload || sem.pausa) && { color: Colors.amber }]}>{semanaLabel(sem)}{sem.hito ? ` · ${sem.hito}` : ''}{sem.deload ? " · DELOAD secundarios −50 % (piso 30' · MIR 1 h)" : ''}</Text>
          </View>
        )}
        <Text style={st.fecha}>{iso}</Text>
      </View>
      {/* v6.00 · banner de día protegido (§A3) */}
      {p.protegido && (
        <View style={[st.banner, { borderColor: CORAL + '88', backgroundColor: CORAL + '14' }]}>
          <Text style={[st.bannerTxt, { color: CORAL }]}>🛡 DÍA PROTEGIDO · {p.protegido}</Text>
          <Text style={st.modoInfo}>Sin MIR, Research, Derma ni AURUM. {p.titulo}</Text>
        </View>
      )}
      {/* v6.00 · F2: el Step 1 está en PAUSA (§B2) */}
      {fase === 'F2' && (
        <View style={[st.banner, { borderColor: GREEN + '66', backgroundColor: GREEN + '10' }]}>
          <Text style={[st.bannerTxt, { color: GREEN }]}>🇺🇸 Step 1 en PAUSA — Anki 30' + sábado 20Q mezcladas</Text>
          <Text style={st.modoInfo}>Anki USMLE 05:15-05:45 L-V (0 nuevas, FSRS 0,85) · sáb 07:45-09:15 STEP 1 VIVO (10 incorrectas UWorld + 10 AMBOSS) · reinicio mar {FECHAS_V6.step1.reinicio.slice(8)}-mar (NBME 29 al día siguiente).</Text>
        </View>
      )}
      {/* v6.00 · F4: turno del día + rol semanal */}
      {enF4 && p.plantilla !== 'DOMINGO' && <TurnoSelector iso={iso} />}{/* v6.00: el domingo es libre (sin turno que marcar); el rol semanal sigue visible */}
      {enF4 && <RolSemanal iso={iso} />}
      {/* v5.7 · modo del día (PROTOCOLO_MODO_MINIMO): VERDE todo · ÁMBAR secundarios al mínimo · ROJO Anki + 10Q + dormir */}
      <View style={[st.modoCard, { borderColor: MODO_COLOR[modo] + '55' }]}>
        <ModoSelector nivel={modo} onChange={cambiarModo} />
        <Text style={st.modoInfo}>
          {modo === 'VERDE'
            ? `VERDE · ${MODO_INFO.VERDE.resumen} Pasa a ÁMBAR si: ${MODO_INFO.AMBAR.disparador}. ROJO si: ${MODO_INFO.ROJO.disparador}.`
            : `${MODO_INFO[modo].label} · ${MODO_INFO[modo].resumen} (disparador: ${MODO_INFO[modo].disparador})${modo === 'ROJO' ? ' · el día perdido NO mueve el examen: su fila se hace en la próxima fila COLCHÓN (F1: C1/C2)' : ''}`}
        </Text>
      </View>
      {p.notas.length > 0 && (
        <View style={st.notasBox}>
          {p.notas.map((n, i) => <Text key={i} style={st.modoInfo}>• {n}</Text>)}
        </View>
      )}
      {p.bloques.length === 0 && (
        <View style={[st.bloque, { borderLeftColor: Colors.muted }]}>
          <View style={{ flex: 1 }}>
            <Text style={st.bloqueNombre}>{p.titulo}</Text>
            <Text style={st.bloqueSub}>Sin bloques de estudio hoy.</Text>
          </View>
        </View>
      )}
      {p.bloques.map((b) => {
        const color = PLAN_COLOR[b.plan];
        const enCurso = !!b.ini && !!b.fin && ahora >= hm(b.ini) && ahora < hm(b.fin);
        const pasado = !!b.fin && ahora >= hm(b.fin) && b.ini !== b.fin;
        const minimo = b.frente ? minimoPorFrente(b.frente as Frente, modo, iso) : null;
        const omitido = !!minimo && /^Omitid/.test(minimo);
        if (!b.frente && b.plan !== 'usmle' && b.plan !== 'encaps') {
          // SERUMS · gimnasio · vida · revisión: fila compacta
          return (
            <View key={b.id} style={[st.compacta, { borderLeftColor: color }, enCurso && { backgroundColor: color + '14' }]}>
              <Text style={[st.compactaHora, { color }]}>{b.hora}</Text>
              <Text style={st.compactaTxt} numberOfLines={2}>{PLAN_FLAG[b.plan]} {b.nombre}</Text>
              {enCurso && <AhoraChip color={color} />}
            </View>
          );
        }
        const c = contenidoBloque(b, p, iso);
        return (
          <TouchableOpacity key={b.id} activeOpacity={onGo ? 0.8 : 1} onPress={() => onGo?.('Estudio')}
            style={[st.bloque, { borderLeftColor: color }, enCurso && { backgroundColor: color + '14', borderColor: color + '66' }, (pasado || omitido) && { opacity: 0.5 }]}>
            <View style={st.horaCol}>
              <Text style={[st.hora, { color }]}>{b.ini ?? '—'}</Text>
              <Text style={st.horaFin}>{b.ini && b.fin && b.ini !== b.fin ? b.fin : b.ini ? '' : b.hora}</Text>
              {enCurso && <AhoraChip color={color} />}
              {pasado && <Text style={st.checkTxt}>✓</Text>}
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={st.bloqueNombre}>{PLAN_FLAG[b.plan]} {b.nombre}</Text>
              {minimo ? (
                <Text style={[st.bloqueTema, { color: MODO_COLOR[modo] }]} numberOfLines={2}>{MODO_INFO[modo].label} → {minimo}</Text>
              ) : null}
              {c.tema ? <Text style={st.bloqueTema} numberOfLines={2}>{c.tema}</Text> : null}
              {c.sub ? <Text style={st.bloqueSub} numberOfLines={1}>{c.sub}</Text> : null}
              {b.plan === 'vibecoding' ? <Freno0455 /> : null}
            </View>
            <View style={st.btnCol}>
              {c.acciones.map((a, j) => (
                <TouchableOpacity key={j} activeOpacity={0.85} onPress={() => openUrl(a.url)}
                  style={[st.btn, { borderColor: a.color + '88' }, a.fill && { backgroundColor: a.color + '22' }]}>
                  <Text style={[st.btnTxt, { color: a.color }]}>{a.lbl}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        );
      })}
      <Text style={st.nota}>Plantilla {p.plantilla} (plantillasV6 · V6_ESPEC §A1/§B4.1) · toca un bloque → abre Estudio · ◆ Obsidian = nota madre donde caen los APEX · 04:55 commit-or-stash → 05:00 Anki sin excepción · 📓 journal = D:/synapse-journal (node DATA/_scripts/journal_hoy.js) · sáb 07:15-07:45 = revisión semanal (DATA/REVISION_SEMANAL.md; en el SERUMS, 20' dentro del Step 1 del sábado) · Step 1: {DIAS.length} días en F1 + {DIAS_T2.length} en el tramo 2</Text>
    </View>
  );
}

const st = StyleSheet.create({
  wrap: { marginBottom: Spacing.section ?? Spacing.xl },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' },
  titleRail: { width: 3, height: 13, borderRadius: 2, backgroundColor: Colors.gold },
  title: { fontSize: 12, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.4, fontFamily: MONO },
  faseChip: { backgroundColor: TEAL + '1A', borderWidth: 1, borderColor: TEAL + '55', borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 10 },
  faseTxt: { fontSize: 10, fontWeight: '800', color: TEAL, letterSpacing: 0.4, fontFamily: MONO },
  fecha: { fontSize: 11, color: Colors.muted, marginLeft: 'auto', fontVariant: ['tabular-nums'], fontFamily: MONO },

  modoCard: {
    backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1,
    paddingVertical: 8, paddingHorizontal: 12, marginBottom: 8,
  },
  modoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  modoLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.2, fontFamily: MONO, marginRight: 4 },
  modoChip: { flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 3, paddingHorizontal: 9 },
  modoDot: { width: 7, height: 7, borderRadius: 4 },
  modoTxt: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5, fontFamily: MONO },
  modoInfo: { fontSize: 9, color: Colors.muted, marginTop: 5, lineHeight: 13 },

  // v6.00 · banner protegido / PAUSA · rol semanal · notas de la plantilla
  banner: { borderWidth: 1, borderRadius: BorderRadius.lg, paddingVertical: 8, paddingHorizontal: 12, marginBottom: 8 },
  bannerTxt: { fontSize: 11, fontWeight: '900', letterSpacing: 0.6, fontFamily: MONO },
  rolCard: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder, paddingVertical: 8, paddingHorizontal: 12, marginBottom: 8 },
  rolNav: { fontSize: 12, color: Colors.onSurfaceVariant, fontWeight: '800', paddingHorizontal: 4 },
  rolSem: { fontSize: 10, color: Colors.onSurfaceVariant, fontFamily: MONO, fontVariant: ['tabular-nums'] },
  rolDia: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 8, alignItems: 'center', minWidth: 54 },
  rolDow: { fontSize: 9, color: Colors.muted, fontFamily: MONO },
  rolTurno: { fontSize: 13, fontWeight: '900', fontFamily: MONO },
  notasBox: { marginBottom: 8, paddingHorizontal: 4 },
  compacta: { flexDirection: 'row', alignItems: 'center', gap: 10, borderLeftWidth: 2, paddingVertical: 4, paddingHorizontal: 10, marginBottom: 3, borderRadius: BorderRadius.sm },
  compactaHora: { fontSize: 10, fontWeight: '800', fontFamily: MONO, fontVariant: ['tabular-nums'], minWidth: 96 },
  compactaTxt: { fontSize: 10, color: Colors.onSurfaceVariant, flex: 1 },

  bloque: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg,
    borderWidth: 1, borderColor: DesktopColors.glassBorder, borderLeftWidth: 4,
    paddingVertical: 10, paddingHorizontal: 12, marginBottom: 6,
  },
  horaCol: { alignItems: 'center', width: 52 },
  hora: { fontSize: FontSize.labelMd, fontWeight: '800', fontVariant: ['tabular-nums'], fontFamily: MONO },
  horaFin: { fontSize: 9, color: Colors.muted, marginTop: 1, fontVariant: ['tabular-nums'], fontFamily: MONO },
  ahoraChip: { borderRadius: BorderRadius.sm, paddingVertical: 1, paddingHorizontal: 6, marginTop: 3 },
  ahoraTxt: { fontSize: 8, fontWeight: '900', color: '#081325', letterSpacing: 0.5 },
  checkTxt: { fontSize: 11, color: Colors.muted, marginTop: 2 },

  frenoChip: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 9, marginTop: 5 },
  frenoTxt: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5, fontVariant: ['tabular-nums'], fontFamily: MONO },

  bloqueNombre: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface },
  bloqueTema: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 16 },
  bloqueSub: { fontSize: 9, color: Colors.muted, marginTop: 2 },

  btnCol: { gap: 5, alignItems: 'stretch', minWidth: 86 },
  btn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center' },
  btnTxt: { fontSize: FontSize.labelSm, fontWeight: '800' },
  nota: { fontSize: 9, color: Colors.muted, marginTop: 4 },
});
