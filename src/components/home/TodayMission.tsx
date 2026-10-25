import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Animated, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { MIR_DIAS, mirSesionDe, capUrl } from '../../lib/mirDailyPlan';
import { MIR_MANT_META } from '../../lib/mirMantenimiento';
import { QBQ, DIAS, DIAS_T2, estadoUSMLE, etiquetaDiaUSMLE, esFilaT2, TIPO_FILA_T2_LABEL, esHito } from '../../lib/usmleStep1Daily';
import { guiaUsmleDe, guiaUsmleEnRango } from '../../lib/usmleGuia';
import type { GuiaBloque } from '../../lib/guia';
import { fmtMin, partesFranja, aMinutos, moverGuia } from '../../lib/guia';
import GuiaBloqueCard from '../GuiaBloqueCard';
import { fechasRealesEnTexto } from '../../lib/corridaTexto';
import { mirObsUrl, usmleObsUrl, encapsObsUrl, OBS_MAPA_URL } from '../../lib/obsidianMap';
import { vibeDiaDe, vibeProyectoEnFecha, vibeTaperEnFecha, vibeJournalUrl, VIBE_TIPO_LABEL, VIBE_ROTACION_ICON, VIBE_META } from '../../lib/vibecodingPlan';
import {
  semanaStep1, semanaLabel, leerModo, guardarModo, minimoPorFrente, MODO_INFO, ModoNivel, Frente,
} from '../../lib/homeBriefing';
import { FECHAS_V6, faseV6, faseV6Info, fechaPlanDe, corridaS1De } from '../../lib/fechasV6';
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
import { mirGuiaDe } from '../../lib/mirGuia';
import { dermaGuiaPar, accessDermaOK, dermaCasoUrl } from '../../lib/dermaGuia';
import { aurumDiaDe } from '../../lib/aurumDailyPlan';
import { livDiaDe } from '../../lib/livianoStudyPlan';
import { synDiaDe } from '../../lib/synapseDailyPlan';
// v6.02c (E4 · ENCAPS 16:15 + Research): guías «qué · cuánto · cómo» + botones directos (runner BANCO_PROPIO · recurso del átomo · Obsidian)
import { guiaEncapsDe, sesionEncapsDe } from '../../lib/encapsGuia';
import { guiaResearchDe, GUIA_RESEARCH_MINIMO } from '../../lib/researchGuia';
import { REC as RESEARCH_REC } from '../../lib/researchDailyPlan';
import { researchObsUrlDay } from '../../lib/obsidianResearchMap';
// v6.02c (E5 · resto del día): guías «qué · cuánto · cómo» de vibecoding · SYNAPSE · Business · AURUM · LIVIANO · revisión · SHIP · Feynman
import { guiaVibeDe, guiaSynapseDe, guiaShipDe, guiaFeynmanDe, guiaAurumDe, guiaLivianoDe, guiaBusinessDe, guiaRevisionDe, revisionFicheroDe } from '../../lib/rutinaGuia';
import { aurumObsUrl } from '../../lib/aurumDailyPlan';
import { bizDiaDe } from '../../lib/businessStudyPlan';
/** v6.02c (E4): átomo de Research de una fecha ISO (ciclo 1 + ciclo 2), o undefined. */
const researchAtomoDe = (iso: string) => [...RESEARCH_DIAS, ...RESEARCH_DIAS_2027].find((x) => x.fecha === iso);
/** v6.02c (E5): 1.er enlace https de una guía (paso o recurso) — botón directo «al recurso de hoy». */
const primerEnlace = (g: GuiaBloque | null | undefined, re: RegExp = /^https?:/): string | null =>
  !g ? null : (g.pasos.find((p) => p.enlace && re.test(p.enlace.url))?.enlace?.url ?? g.recursos.find((r) => re.test(r.url))?.url ?? null);
const ANKIWEB = 'https://ankiweb.net/decks';
const vsRevision = (iso: string) => `vscode://file/D:/joseph-md-app/DATA/USMLE/REVISIONES/${revisionFicheroDe(iso)}`;
/**
 * v6.02c F2 (E6) · CABECERA de un bloque con guía = «la guía manda»: la franja real (unión de las franjas de la guía) y sus títulos, en vez
 * del texto genérico de la plantilla, que la contradecía (lun 19-oct: 05:00 decía «pasada FSRS… stress set» el día que se CONFIGURA el mazo
 * vacío; 07:15-12:00 decía «UWSA1 (160Q, 09:00-13:00)» con la guía empezando a las 08:50 y terminando a las 13:00; 18:00 decía «bloque timed
 * mixto» el día del Day-After del UWSA1).
 */
function spanGuias(gs: GuiaBloque[]): { ini: string; fin: string } | null {
  const ps = gs.map((g) => partesFranja(g.franja)).filter((x): x is { ini: string; fin: string } => !!x);
  if (!ps.length) return null;
  const ini = ps.reduce((a, x) => (aMinutos(x.ini) < aMinutos(a) ? x.ini : a), ps[0]!.ini);
  const fin = ps.reduce((a, x) => (aMinutos(x.fin) > aMinutos(a) ? x.fin : a), ps[0]!.fin);
  return { ini, fin };
}
/** Título de una guía sin el subtítulo (lo que va tras « — ») y sin el paréntesis final, recortado para la cabecera. */
const tituloCorto = (t: string, n = 46): string => {
  const x = (t.split(' — ')[0] ?? t).replace(/\s*\([^()]*\)\s*$/, '');
  return x.length > n ? x.slice(0, n - 1).trimEnd() + '…' : x;
};
/** Nombre del bloque sin la descripción genérica de la plantilla: «USMLE · BLOQUE PRINCIPAL (Anki → Pre-test…)» → «USMLE». */
const nombreBase = (n: string): string => {
  const i = n.indexOf(' · ');
  const base = (i > 0 ? n.slice(0, i) : n).replace(/\s*\([^()]*\)\s*$/, '') || n;
  return base === 'IA' ? 'IA · VIBECODING' : base;
};

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
 * v6.01 (10-oct-2026): corrimiento del D1 al lun 12-oct (F1 = D1-D57; STEP1_SEMANAS = 40 → chip S n/40): F1 ya no tiene C1/C2, así que
 *  el texto ROJO dice que el día perdido de F1 pasa al tramo 2 el 31-dic (disparador (f)); faseActual: antes del D1 = ≤ dom 11-oct.
 * v6.02 (17-oct-2026): corrimiento del D1 al lun 19-oct (F1 = D1-D52, D52 = NBME 28 mié 30-dic; STEP1_SEMANAS = 39 → chip S n/39): sin
 *  cambio de lógica (todo sale de fechasV6 / usmleStep1Daily); faseActual: antes del D1 = ≤ dom 18-oct.
 * v6.03 (20-oct-2026): corrimiento del D1 al mié 21-oct (lun 19 y mar 20 sin estudio; F1 = D1-D50, D1 = UWSA1, D50 = NBME 28 mié 30-dic;
 *  STEP1_SEMANAS = 39 → chip S n/39, S1 = semana del lun 19-oct): sin cambio de lógica; faseActual: antes del D1 = ≤ mar 20-oct (lun 19 y
 *  mar 20 = CORRIDO por fechasV6.corridaS1De, sin alias ni reparto). Las guías del resto del día (rutinaGuia) siguen al plan: el SYNAPSE
 *  del día del UWSA1 (mié 21) va a las 07:25 y el de los NBME (martes) a las 13:00.
 * v6.05 (24-oct-2026): del lun 19 al dom 25-oct sin estudio → D1 = lun 26-oct (UWSA1; F1 = D1-D47, D47 = NBME 28 mié 30-dic; STEP1_SEMANAS
 *  = 42 → chip S n/42, S1 = semana del lun 26-oct): sin cambio de lógica; faseActual: antes del D1 = ≤ dom 25-oct (lun 19 → dom 25 = CORRIDO
 *  por fechasV6.corridaS1De; la capa de alias/reparto v6.04a queda inerte, sin borrar). Las guías del resto del día (rutinaGuia) siguen al
 *  plan: el SYNAPSE del día del UWSA1 (lun 26) va a las 07:25 y el de los NBME (vie 6-nov · vie 27-nov · vie 18-dic · mié 30-dic) a las
 *  13:00; el OUTPUT de Business de esos viernes de NBME pasa entero al sábado 07:45-08:25.
 * v6.02c (18-oct-2026, E1 · SOLO USMLE + el hueco común): `contenidoBloque` puede devolver `guias: GuiaBloque[]` (formato común de
 *  src/lib/guia.ts) y el render las pinta debajo del bloque con <GuiaBloqueCard compacto> — cada plan rellena las suyas en su `case`.
 *  USMLE: 05:00 / 07:00-12:00 / 18:00 = usmleGuia.guiaUsmleEnRango; botón Qbankly en https (cualquier navegador: «UWSA1 ↗» el D1,
 *  «NBME n ↗» los hitos, «uWorld ↗» el resto) con «◆ Edge» como alternativa; las franjas USMLE sin bloque en la plantilla del día
 *  (Anki del sábado/domingo) salen al final como «🇺🇸 USMLE fuera de los bloques».
 *
 * v6.02c (18-oct-2026, E3 · SOLO MIR + R↔D/Derma): MIR → `guias` = mirGuia.mirGuiaDe(iso, b.ini) (D1-D10 medidos · D11+ y banqueo por
 *  regla; desplazada a la hora del turno en el SERUMS) + botón «Tier C ↗» / «MIR Q ↗» en el banqueo · Derma → `guias` = dermaGuia (plan A
 *  AccessDerma o PLAN B con el acceso remoto caducado, según la preferencia «AccessDerma renovado» de Derma › HOY; por defecto plan B) +
 *  botón directo «Caso #n ↗» (plan A) o «Plan B ↗» + «AccessDerma ↗» y el aviso de renovación en el sub.
 * v6.02c (18-oct-2026, E4 · SOLO ENCAPS 16:15 + Research): ENCAPS F1 → sesión de encapsGuia (PRE-TEST DE ARRANQUE lun 26 / mar 27-oct en v6.05, mié 21 / jue 22-oct en v6.03, lun 19 / mar 20-oct en v6.02 ·
 *  BANCO · MINI-SIM) con botones «Pre-test/Banco/Mini-sim ↗» (runner BANCO_PROPIO publicado en /encaps/bp) · «Eval ↗» · ◆ Obsidian del CÓDIGO
 *  · «Claude ↗» (proyecto del área) + `guias` = guía de la hora · Research → `guias` = researchGuia.guiaResearchDe (átomo del día) + botón
 *  al recurso 1 + ◆ Obsidian; en la pausa de átomos, la guía de 30′ «Research mínimo».
 * v6.02c (18-oct-2026, E5 · RESTO del día + Home completo): cada bloque lleva su guía (src/lib/rutinaGuia.ts) y un botón directo:
 *  vibecoding (docs ↗ · 📓 journal + guía del día; sáb = SHIP + SYNAPSE A/B/C con «SYNAPSE A ↗»; dom = Feynman opcional) · Anki (AnkiWeb ↗ +
 *  el vídeo pendiente de la guía USMLE si lo hay) · SYNAPSE (A/B/C ↗; lun 19 = 07:25 por el UWSA1, NBME = 13:00) · Business NUEVO (13:00-13:25;
 *  ▶ tramo del día · ◆ 01_PULSO) · AURUM (▶ vídeo CONCRETO · ◆ nota del día) · LIVIANO (lectura ↗ · ◆ concepto madre) · revisión del sábado
 *  (abre S<NN>_<sábado>.md · método ↗). El sábado el Home muestra también el SHIP/PC 15:00, el Business del tracker y el Anki 19:00; el domingo,
 *  el Feynman y el Anki opcionales (plantillasV6).
 * v6.02c F2 (18-oct-2026, pulido de las guías · hallazgos E6): la CABECERA de un bloque con guía la manda la guía — hora = unión de sus
 *  franjas (lun 19: USMLE 07:15 → 13:00), nombre sin la descripción genérica de la plantilla, tema = título(s) de la guía con su hora y la
 *  línea «🧭 la guía manda» (AHORA/✓ por las franjas de la guía) · MIR D1: botón «5Q extra ↗» (1.ª de las 5 preguntas ciegas de las 15:23) ·
 *  el SYNAPSE del lun 19 (07:25) sale una sola vez: la guía USMLE parte la preparación del UWSA1 en 07:15-07:25 y 07:55-08:50.
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
  serums: CORAL, gimnasio: Colors.muted, vida: Colors.muted, revision: Colors.champagne, business: Colors.brass,
};
const PLAN_FLAG: Record<PlanBloque, string> = {
  usmle: '🇺🇸', encaps: '🇵🇪', mir: '🇪🇸', 'research-derma': '🔬', aurum: '🪙', liviano: '⚖️', synapse: '🧠', vibecoding: '🧠',
  serums: '🏥', gimnasio: '🏋️', vida: '·', revision: '📋', business: '📈',
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
  return faseV6Info(iso).etiqueta; // antes del D1 (v6.05: ≤ dom 25-oct · v6.03: ≤ mar 20-oct · v6.02: ≤ dom 18-oct · v6.01: ≤ 11-oct · v6.00: ≤ 6-oct) faseV6 ya devuelve F1
}
function nowMin(): number { try { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); } catch { return 0; } }
const hm = (s: string) => { const [h, m] = s.split(':').map(Number); return (h as number) * 60 + (m as number); };
/** v6.02c · ¿la franja 'HH:MM–HH:MM' de una guía está en curso a `ahora` (minutos)? */
const enFranja = (franja: string, ahora: number): boolean => { const m = /^(\d{2}:\d{2})–(\d{2}:\d{2})$/.exec(franja); return !!m && ahora >= hm(m[1] as string) && ahora < hm(m[2] as string); };

/** Etiqueta corta MIR del día (para el briefing/status bar). null si no hay sesión MIR (v6.00: incluye mantenimiento y extensión). */
export function mirLabelDe(iso: string): string | null {
  if (corridaS1De(iso)?.tipo === 'sin_sesion') return null; // v6.02d: día corrido (lun 19) → sin sesión
  const s = mirSesionDe(fechaPlanDe(iso, 'mir')); // v6.02d: semana 1 corrida → la sesión de la fecha de plan
  if (!s) return null;
  return s.tipo === 'plan' ? `MIR D${s.dia.d} · ${s.dia.asignatura}` : `MIR M${s.dia.d}/${MIR_MANT_META.totalDias} · ${s.dia.asignatura}`;
}
/**
 * Etiqueta corta ENCAPS del día (para el briefing). F1 = la sesión de las 16:15 (encapsGuia) · F2 = la intensiva · null sin sesión.
 * v6.05: antes el briefing ponía el texto fijo «ENCAPS · tema del cronograma» también los días sin sesión (sáb 24 / dom 25).
 */
export function encapsLabelDe(iso: string): string | null {
  if (corridaS1De(iso)?.tipo === 'sin_sesion') return null;
  const s = sesionEncapsDe(iso);
  if (s) {
    if (s.tipo === 'pretest') return `ENCAPS D${s.dia} · pre-test ${s.pretest?.parte ?? 1}/${s.pretest?.de ?? 2}`;
    return s.tipo === 'minisim' ? `ENCAPS D${s.dia} · mini-sim 25Q` : `ENCAPS D${s.dia} · banco ${s.codigo ?? ''}`.trim();
  }
  return plantillaDelDia(iso).bloques.some((b) => b.plan === 'encaps') ? 'ENCAPS · intensiva (ver plan)' : null;
}
/** Etiqueta corta USMLE del día (para el briefing/status bar). null si no hay fila hoy · v6.00: «PAUSA» entre el 31-dic y el reinicio. */
export function usmleLabelDe(iso: string): string | null {
  if (corridaS1De(iso)?.tipo === 'sin_sesion') return null; // v6.02d: día corrido (lun 19) → sin sesión
  const e = estadoUSMLE(fechaPlanDe(iso, 'usmle')); // v6.02d: semana 1 corrida → la fila de la fecha de plan
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

/**
 * Tema / sub / acciones de un bloque de la plantilla · `guias` = qué · cuánto · cómo (v6.02c).
 * v6.02d (semana 1 corrida): el contenido se consulta con la FECHA DE PLAN del bloque (`b.fechaPlan`, p. ej. el mar 20 = plan del lun 19)
 * y a la HORA DE PLAN (hora real − `b.desfaseMin`); después las guías se mueven a la hora real del bloque (moverGuia). Sin corrida = igual que antes.
 */
function contenidoBloque(b: BloqueV6, p: PlantillaDia, iso: string): { tema: string; sub: string; acciones: Accion[]; guias?: GuiaBloque[] } {
  const f = b.fechaPlan ?? iso;
  const d = b.desfaseMin ?? 0;
  const desplazar = (h: string | null): string | null => (h && d ? `${String(Math.floor((hm(h) - d) / 60)).padStart(2, '0')}:${String((hm(h) - d) % 60).padStart(2, '0')}` : h);
  const bPlan: BloqueV6 = d ? { ...b, ini: desplazar(b.ini), fin: desplazar(b.fin) } : b;
  const c = contenidoBloquePlan(bPlan, p, f);
  return d && c.guias ? { ...c, guias: c.guias.map((g) => moverGuia(g, d)) } : c;
}
/** Contenido de un bloque en su fecha y hora de PLAN (lo que era contenidoBloque hasta v6.02c). */
function contenidoBloquePlan(b: BloqueV6, p: PlantillaDia, iso: string): { tema: string; sub: string; acciones: Accion[]; guias?: GuiaBloque[] } {
  const us = p.usmle && (p.corrida !== 'reparto' || p.usmle.fecha === iso) ? p.usmle : null; // v6.02d: en el reparto, el Anki sáb/dom no es del D5
  switch (b.plan) {
    case 'vibecoding': {
      const vibeDia = vibeDiaDe(iso), vibeP = vibeProyectoEnFecha(iso), vibeT = vibeTaperEnFecha(iso);
      const tema = vibeP
        ? (vibeDia
          ? `S${vibeP.s} · ${vibeP.nombre} — hoy (${VIBE_TIPO_LABEL[vibeDia.tipo]}${vibeDia.min !== 45 ? ` ${vibeDia.min}'` : ''}): ${vibeDia.paso}`
          : `S${vibeP.s} · ${vibeP.nombre} — fuera de L-V · SHIP sáb ${vibeP.ship.slice(8)}-${vibeP.ship.slice(5, 7)} (PC 15:00 · node DATA/_scripts/verify_vibecoding.js ${vibeP.s}) · dom = Feynman`) // v6.01 (10-oct): la fecha real del SHIP (sáb 26-dic = avance de S11, su SHIP es el sáb 2-ene; ver vibePCSabado)
        : vibeT
          ? (vibeDia ? `S${vibeT.s} · ${vibeT.nombre} — hoy (${VIBE_TIPO_LABEL[vibeDia.tipo]} ${vibeDia.min}'): ${vibeDia.paso}` : `S${vibeT.s} · ${vibeT.nombre} — ${vibeT.shipTxt}`)
          : `fuera del rango del plan (${VIBE_META.inicio.slice(8)}-${VIBE_META.inicio.slice(5, 7)} → ${VIBE_META.finTaper.slice(8)}-${VIBE_META.finTaper.slice(5, 7)})`;
      const sub = vibeP
        ? `${VIBE_ROTACION_ICON[vibeP.rotacion]} ${vibeP.rotacion} · entregable: ${vibeP.entregable}${vibeP.deload ? ' · DELOAD 50%' : ''} · ✓ diario en SYNAPSE → ⚡ run · ${VIBE_META.freno}`
        : vibeT ? `taper · ${vibeT.tipo} · ${vibeT.semanaStep1} · ${VIBE_META.freno}` : `5' objetivo → 35' construir → 5' journal · ${VIBE_META.freno}`;
      const acciones: Accion[] = [...(vibeP && vibeP.docs[0] ? [{ lbl: 'docs ↗', color: OBS, url: vibeP.docs[0].url, fill: true }] : []), { lbl: '📓 journal', color: OBS, url: vibeJournalUrl(iso) }];
      // v6.02c (E5): guía del bloque — sáb 'pc' = SHIP/avance/taper + SYNAPSE A/B/C · dom 'feynman' (opcional) · L-V = paso del día con comandos
      if (b.id === 'pc') {
        const g = guiaShipDe(iso);
        const synA = primerEnlace(g, /skilljar|academy|anthropic/);
        return { tema: g ? g.titulo : tema, sub: `PC 15:00 · ${sub}`, acciones: [...acciones, ...(synA ? [{ lbl: 'SYNAPSE A ↗', color: OBS, url: synA }] : [])], ...(g ? { guias: [g] } : {}) };
      }
      if (b.id === 'feynman') {
        const g = guiaFeynmanDe(iso);
        return { tema: g ? g.titulo : 'Feynman del proyecto (opcional)', sub: 'domingo libre · 10′ opcionales', acciones: [{ lbl: '📓 journal', color: OBS, url: vibeJournalUrl(iso), fill: true }], ...(g ? { guias: [g] } : {}) };
      }
      const gV = guiaVibeDe(iso);
      return { tema, sub, acciones, ...(gV ? { guias: [gV] } : {}) };
    }
    case 'usmle': {
      // v6.02c: guía qué · cuánto · cómo de las franjas que caen dentro del bloque (usmleGuia; F1 + fines de semana · v6.05: + las filas
      //   desplazadas de F1 al tramo 2 con el NBME 29 y los días de cola de vídeo, mar 17-mar → lun 12-abr, plantilla F3)
      const guiasEn = (ini: string, fin: string): GuiaBloque[] => guiaUsmleEnRango(iso, ini, fin);
      if (b.frente === 'usmle-anki') {
        // v6.02c (E5): botón directo también en el Anki (AnkiWeb en cualquier navegador + el vídeo/recurso pendiente de la guía si lo hay)
        const gA = guiasEn(b.ini ?? '05:00', b.fin ?? '05:45');
        const vidA = gA.map((g) => primerEnlace(g, /youtube|qbankly/)).find(Boolean);
        return { tema: b.detalle ?? 'Pasada principal FSRS del deck USMLE · Fases B-C: + stress set 10Q/12min', sub: us ? `Step 1 · ${etiquetaDiaUSMLE(us)}` : 'Step 1',
          acciones: [{ lbl: 'AnkiWeb ↗', color: GREEN, url: ANKIWEB, fill: true }, ...(vidA ? [{ lbl: 'Vídeo ↗', color: EDGE, url: vidA }] : [])], guias: gA };
      }
      if (b.frente === 'usmle-eval') return { tema: b.nombre.includes('hito') ? 'Registra el % del hito en 📏 Medición (Cola de hoy)' : 'Bloque timed mixto de temas vistos + corrección + APEX', sub: 'termómetro diario del Step 1 · anchoring pre-sueño · registra las horas netas del día (GO/NO-GO por horas)', acciones: [{ lbl: '◆ Obsidian', color: OBS, url: OBS_MAPA_URL }], guias: guiasEn(b.ini ?? '18:00', b.fin ?? '18:45') };
      // v6.05 (24-oct): las filas desplazadas de F1 al tramo 2 (T3-T13, F3) traen guía también de la 16:15 REENTRADA (usmleGuia)
      if (b.id === 'reentrada') return { tema: us?.franjaNota ?? 'REENTRADA: 20Q timed del sistema de la rotación', sub: 'F3 · 16:15 · ≥80 % → el sistema sigue vivo', acciones: [], guias: guiasEn(b.ini ?? '16:15', b.fin ?? '17:15') };
      if (!us || b.frente == null) return { tema: b.detalle ?? '', sub: '', acciones: [] };
      const tipo = esFilaT2(us) ? ` · ${TIPO_FILA_T2_LABEL[us.tipo]}${us.parte ? ` ${us.parte}` : ''}` : '';
      const q = esFilaT2(us) && us.qDiaT != null && p.turno === 'T' ? `${us.qDiaT}Q (turno T)` : `${us.qDia}Q`;
      // botón directo (https, cualquier navegador): el UWSA1 / el NBME del día / uWorld; «◆ Edge» queda como alternativa
      const hoyHito = us.fecha === iso && esHito(us);
      const lblQb = hoyHito ? (/Self-Assessment 1|UWSA1/.test(us.uw) ? 'UWSA1 ↗' : `${us.uw.replace('NBME CBS Form', 'NBME')} ↗`) : 'uWorld ↗';
      const ruta = hoyHito && /Self-Assessment 1|UWSA1/.test(us.uw)
        ? 'Qbankly › QBanks › USMLE High Yield › «uWorld - Step 1 Self Assessment Simulation 1» › Select QBank › New Test → Subject «Block - #1» · Timed'
        : hoyHito ? `Qbankly › QBanks › NBME - Comprehensive Basic Science (Step 1) › «Self-Assessment - Form ${(/Form (\d+)/.exec(us.uw) || [])[1] ?? ''}» › Select QBank › New Test → «Block 1» · Timed`
          : `${us.bbCh}: ${us.bbVid} · ${us.mat} · nivel UW ${us.nivelUW} · ${q} · todo en inglés`;
      return {
        tema: `${etiquetaDiaUSMLE(us)}${tipo} · ${us.system} — ${us.sub}`,
        sub: ruta,
        acciones: [
          { lbl: lblQb, color: EDGE, url: QBQ, fill: true },
          ...(usmleObsUrl(us.d) ? [{ lbl: '◆ Obsidian', color: OBS, url: usmleObsUrl(us.d) as string }] : []),
          { lbl: '◆ Edge', color: EDGE, url: 'microsoft-edge:' + QBQ },
        ],
        guias: guiasEn('07:00', b.fin ?? '12:00'),
      };
    }
    case 'mir': {
      const s = mirSesionDe(iso);
      if (!s) return { tema: p.protegido ? 'día protegido: sin MIR' : 'sin sesión MIR hoy', sub: '1 h/día (DJ-4)', acciones: [] };
      // v6.02c (E3): guía qué · cuánto · cómo del bloque (D1-D10 medidos por E2 · D11+ y banqueo por regla) a la hora real del bloque
      const gMir = mirGuiaDe(iso, b.ini);
      const guiasMir = gMir ? [gMir] : undefined;
      // v6.02c F2 (E6): D1 (lun 19) 15:23 «5Q CIEGAS extra» → botón directo a la 1.ª pregunta (las 5 están en la tarjeta de la guía)
      const extraQ = gMir?.pasos.find((x) => /5Q CIEGAS extra/.test(x.que) && x.enlace)?.enlace;
      if (s.tipo === 'plan') {
        const mir = s.dia;
        return {
          tema: `D${mir.d}/${MIR_DIAS.length} · ${mir.asignatura} — ${mir.tema}`,
          sub: mir.peso != null ? `Peso MIR ${mir.peso}% · ${mir.vuelta}ª vuelta` : '1ª vuelta',
          acciones: [
            { lbl: 'ProMIR ↗', color: AMBER, url: capUrl(mir.capId), fill: true },
            ...(extraQ ? [{ lbl: '5Q extra ↗', color: AMBER, url: extraQ.url }] : []),
            ...(mirObsUrl(mir.capId) ? [{ lbl: '◆ Obsidian', color: OBS, url: mirObsUrl(mir.capId) as string }] : []),
          ],
          guias: guiasMir,
        };
      }
      const m = s.dia;
      return {
        tema: `M${m.d}/${MIR_MANT_META.totalDias} · ${m.tipo === 'sabado' ? 'SÁBADO · mini-simulacro 30Q mixtas' : m.tipo === 'viernes' ? 'viernes · asignatura peor del log' : m.asignatura} — ${m.nQ}Q`,
        sub: `${m.repuesta ? `repuesta ${m.repuesta} · ` : ''}${m.fase === 'extension' ? 'extensión' : 'mantenimiento'} · banqueo puro (Anki APEX::MIR + preguntas reales) · franja según el turno`,
        acciones: [m.tierC ? { lbl: 'Tier C ↗', color: AMBER, url: capUrl(m.tierC.capId), fill: true } : { lbl: 'MIR Q ↗', color: AMBER, url: 'https://www.examenesmir.com/examenes-mir', fill: true }],
        guias: guiasMir,
      };
    }
    case 'encaps': {
      // v6.02c (E4): F1 16:15 → sesión de encapsGuia (= SQL vigente = Supabase): PRE-TEST DE ARRANQUE (lun 19 / mar 20-oct) · BANCO · MINI-SIM,
      // con el runner BANCO_PROPIO publicado (https), la eval, la nota Obsidian del CÓDIGO y el proyecto de Claude del área + la guía de la hora
      const ses = b.ini === '16:15' ? sesionEncapsDe(iso) : null;
      const gE = ses ? guiaEncapsDe(iso) : null;
      if (ses && gE) {
        const run = (r: { url: string | null; local: string } | null) => (r ? r.url || r.local : null);
        const pri = run(ses.principal), ev = run(ses.eval);
        const tema = ses.tipo === 'pretest' && ses.pretest
          ? `D${ses.dia} · 🧪 PRE-TEST DE ARRANQUE ${ses.pretest.parte}/${ses.pretest.de} · ${ses.pretest.n}Q (${ses.pretest.codigos.join(' · ')}) · modo examen 72 s/Q`
          : ses.tipo === 'minisim' ? `D${ses.dia} · 🔥 MINI-SIM 25Q · cola larga ${ses.secundarios.join(' + ')}` : `D${ses.dia} · 🎯 BANCO ${ses.codigo} · ${ses.subEje ?? ''}${ses.secundarios.length ? ` + ${ses.secundarios.join(' + ')}` : ''}`;
        const sub = ses.tipo === 'pretest' ? 'eval 5Q → pre-test 24′ → corrección → --registrar --append (no el formulario) · NO es «banco del día»'
          : ses.tipo === 'minisim' ? '72 s/Q · umbral 18/25 → corrección → nota /25 + cierre semanal' : `eval 5Q → banco ${ses.principal ? `${ses.principal.n}Q` : '(runner por generar)'} → material solo si ≥2 fallos → registro`;
        return {
          tema, sub,
          acciones: [
            ...(pri ? [{ lbl: ses.tipo === 'pretest' ? 'Pre-test ↗' : ses.tipo === 'minisim' ? 'Mini-sim ↗' : 'Banco ↗', color: TEAL, url: pri, fill: true }] : []),
            ...(ev ? [{ lbl: 'Eval ↗', color: TEAL, url: ev }] : []),
            ...(ses.obsidian ? [{ lbl: '◆ Obsidian', color: OBS, url: ses.obsidian }] : []),
            { lbl: 'Claude ↗', color: EDGE, url: ses.proyecto.url },
          ],
          guias: [gE],
        };
      }
      return {
        tema: b.detalle ?? (faseV6(iso) === 'F1' ? 'Banco del día según pronóstico v3 (rotación II·I·V·III·IV) · viernes = mini-simulacro 25Q' : 'tipo del día en ENCAPS → Plan (Supabase)'),
        sub: `registro de errores en TRACKING_ERRORES · intensiva ${FECHAS_V6.encaps.intensiva_desde.slice(8)}-ene → D-1 · examen ${FECHAS_V6.encaps.examen}${FECHAS_V6.encaps.provisional ? ' PROVISIONAL' : ''}`,
        acciones: [{ lbl: '◆ Obsidian', color: OBS, url: encapsObsUrl('salud_publica') || OBS_MAPA_URL }],
      };
    }
    case 'research-derma': {
      // v6.02c (E4 · Research): pausa de átomos → guía de 30′ «Research mínimo» con la franja real del bloque
      if (b.detalle) return { tema: b.detalle, sub: "30' (DJ-4) · sin átomo nuevo", acciones: [], ...(/RESEARCH · mínimo/.test(b.nombre) && b.ini && b.fin && hm(b.fin) - hm(b.ini) === GUIA_RESEARCH_MINIMO.totalMin ? { guias: [{ ...GUIA_RESEARCH_MINIMO, franja: `${b.ini}–${b.fin}` }] } : {}) };
      const r = [...RESEARCH_DIAS, ...RESEARCH_DIAS_2027].find((x) => x.fecha === iso);
      // v6.02c (E4 · Research): día-Research → guía del átomo (qué · cuánto · cómo) + botón al recurso 1 + ◆ Obsidian de la carpeta del entregable
      const rG = researchAtomoDe(iso);
      if (rG) {
        const r0 = RESEARCH_REC[rG.recs[0] ?? ''];
        const obsR = researchObsUrlDay(rG.d);
        // v6.03 (verificación total, 20-oct): en F4 la guía trae la franja NOMINAL 13:30–14:00 (30′ en tiempo muerto); si el bloque del turno tiene
        // hora (M 07:00–13:00 · L 16:20–16:50 · T 13:00–19:00) se mueve a su inicio, como la de Derma (dermaGuiaPar con ini = b.ini). Antes la guía
        // quedaba fuera del bloque en los turnos M y L (106 bloques F4 en la simulación 3-may → 24-sep-2027). F1-F3 sin cambio.
        const gR0 = guiaResearchDe(rG);
        const pR = partesFranja(gR0.franja);
        const gR = faseV6(iso) === 'F4' && b.ini && b.fin && pR && pR.ini !== b.ini ? moverGuia(gR0, hm(b.ini) - hm(pR.ini)) : gR0;
        return {
          tema: `Research ${rG.code} · ${rG.objetivo}`,
          sub: `${faseV6(iso) === 'F4' ? "30' en tiempo muerto (posta): núcleo del átomo" : 'interdiario Research ↔ Derma'} · entregable: ${rG.entregable}`,
          acciones: [...(r0 ? [{ lbl: `${rG.recs[0]} ↗`, color: EDGE, url: r0.url, fill: true }] : []), ...(obsR ? [{ lbl: '◆ Obsidian', color: OBS, url: obsR }] : [])],
          guias: [gR],
        };
      }
      const d = dermaDiaDeConCiclo2(iso);
      const tema = d ? `Derma d${d.d} · ${d.sub}` : 'sin átomo hoy (interdiario)';
      const subRD = faseV6(iso) === 'F4' ? "30' en tiempo muerto (posta): núcleo del átomo" : 'interdiario Research ↔ Derma';
      if (d) {
        // v6.02c (E3): Derma = guía de 45′ (30′ en el SERUMS) · plan A (AccessDerma) o PLAN B (acceso remoto caducado; por defecto)
        const ok = accessDermaOK();
        const par = dermaGuiaPar(d, { ini: b.ini ?? '13:30', minutos: faseV6(iso) === 'F4' ? 30 : 45 });
        const g = ok ? par.planA : par.planB;
        const primerCaso = d.casoIds[0];
        const directo = ok
          ? (primerCaso ? { lbl: `Caso #${primerCaso} ↗`, color: EDGE, url: dermaCasoUrl(primerCaso) ?? d.access.url, fill: true } : { lbl: 'AccessDerma ↗', color: EDGE, url: d.access.url, fill: true })
          : { lbl: 'Plan B ↗', color: EDGE, url: g.pasos.find((x) => x.enlace)?.enlace?.url ?? 'https://dermnetnz.org/', fill: true };
        return {
          tema, sub: ok ? subRD : `PLAN B (AccessDerma caducado: renuévalo desde la red de tu institución) · ${subRD}`,
          acciones: [directo, ...(ok ? [] : [{ lbl: 'AccessDerma ↗', color: CORAL, url: 'https://dermatology.mhmedical.com/' }])],
          guias: [g],
        };
      }
      return { tema, sub: subRD, acciones: [] };
    }
    case 'aurum': {
      const a = aurumDiaDe(iso);
      // v6.02c (E5): vídeo CONCRETO (semana 1) o regla fija de elección + drill + lectura L en los minutos libres de la hora
      // v6.05 (fix): en F4 (SERUMS) la guía arranca en la ventana del bloque (tiempo muerto del turno tras el R↔D), no a las 14:15 nominales
      const gAu = guiaAurumDe(iso, faseV6(iso) === 'F4' ? b.ini : undefined);
      const vid = primerEnlace(gAu, /youtube\.com\/(watch|@|user|c\/)/);
      const obsA = a ? aurumObsUrl(a.obs) : null;
      return {
        tema: a ? `D${a.d} · ${a.titulo}` : 'sin lección hoy',
        sub: a ? (a.min30 ? `30' (núcleo)${faseV6(iso) === 'F4' ? ' en tiempo muerto de la posta, tras el R↔D' : ''}${a.pitch ? ` · 🎙 PITCH v${a.pitch}` : ''} · bloques extra opcionales` : `${a.min}' núcleo (ver + practicar)${a.pitch ? ` · 🎙 PITCH v${a.pitch}` : ''} + lectura L en los minutos libres`) : '',
        acciones: [...(vid ? [{ lbl: /watch/.test(vid) ? '▶ Vídeo ↗' : 'Canal ↗', color: Colors.gold, url: vid, fill: true }] : []), ...(obsA ? [{ lbl: '◆ Obsidian', color: OBS, url: obsA }] : [])],
        ...(gAu ? { guias: [gAu] } : {}),
      };
    }
    case 'liviano': {
      const l = livDiaDe(iso);
      // v6.02c (E5): lectura con sección y nº de palabras (Schwartz 2017 en FISIOLOGÍA) · tarjetas del día · aplicación 20′ · viernes = caso + rúbrica
      const gL = guiaLivianoDe(iso);
      const lect = primerEnlace(gL);
      const obsL = primerEnlace(gL, /^obsidian:/);
      return {
        tema: l ? `${l.modulo} — ${l.tema}` : 'Módulo del día — ver Business → LIVIANO → Academia',
        sub: l?.casoId ? `VIERNES · caso ${l.casoId}/16 + rúbrica 0-2 × 4` : '25 min estudio + 20 min aplicación (explicárselo a un paciente)',
        acciones: [...(lect ? [{ lbl: 'Lectura ↗', color: AMBER, url: lect, fill: true }] : []), ...(obsL ? [{ lbl: '◆ Obsidian', color: OBS, url: obsL }] : [])],
        ...(gL ? { guias: [gL] } : {}),
      };
    }
    case 'synapse': {
      const s = synDiaDe(iso);
      // v6.02c (E5): A/B/C con qué y cuánto exactos; el día del UWSA1 (v6.05: lun 26-oct · v6.03: mié 21-oct · v6.02: lun 19-oct) se hace a las 07:25 · días de NBME a las 13:00
      const gS = guiaSynapseDe(iso);
      const movida = gS && !gS.franja.startsWith(b.ini ?? '12:30') ? ` · HOY a las ${gS.franja.slice(0, 5)} (hito USMLE)` : '';
      const tagUrl = (tag: string) => s?.bloques.find((x) => x.tag === tag && x.url)?.url;
      const btn = (['A', 'B', 'C'] as const).map((tag) => ({ tag, url: gS?.pasos.find((p) => p.que.startsWith(`${tag} `))?.enlace?.url ?? tagUrl(tag) })).filter((x) => !!x.url);
      return {
        tema: s ? `S${s.semana} · ${s.fase}${movida}` : 'SYNAPSE',
        sub: "A 15' pantalla · B 10' audio · C 5' lectura",
        acciones: btn.map((x, i) => ({ lbl: `${x.tag} ↗`, color: OBS, url: x.url as string, fill: i === 0 })),
        ...(gS ? { guias: [gS] } : {}),
      };
    }
    case 'business': {
      // v6.02c (E5): Estudio Pulso con franja propia (13:00-13:25 · NBME 12:30 · sábado = tracker del OUTPUT)
      const r = bizDiaDe(iso);
      const gB = guiaBusinessDe(iso);
      const tramo = primerEnlace(gB, /youtube|spotify/);
      const obsB = primerEnlace(gB, /^obsidian:/);
      return {
        tema: gB ? gB.titulo : r ? `${r.materia} · ${r.lectura}` : 'Business',
        sub: r && r.accion ? `acción: ${r.accion}` : gB && /tracker/.test(gB.titulo) ? 'tracker semanal + cierre de la página del OUTPUT' : 'Estudio Pulso',
        acciones: [...(tramo ? [{ lbl: '▶ Tramo ↗', color: Colors.brass, url: tramo, fill: true }] : []), ...(obsB ? [{ lbl: '◆ 01_PULSO', color: OBS, url: obsB, fill: !tramo }] : [])],
        ...(gB ? { guias: [gB] } : {}),
      };
    }
    case 'revision': {
      // v6.02c (E5): la revisión del sábado con su fichero S<NN>_<sábado>.md (lo crea gen_revision_semanal.js) y los 30′ partidos
      const gR = guiaRevisionDe(iso);
      return {
        tema: `${revisionFicheroDe(iso)} · 10 métricas + checklist G + 4 decisiones`,
        sub: 'node DATA/_scripts/gen_revision_semanal.js → abre el fichero · método: DATA/REVISION_SEMANAL.md',
        acciones: [{ lbl: `${revisionFicheroDe(iso).slice(0, 3)} ↗`, color: Colors.champagne, url: vsRevision(iso), fill: true }, { lbl: 'Método ↗', color: Colors.champagne, url: 'https://github.com/josephMAX-svg/joseph-md-app/blob/master/DATA/REVISION_SEMANAL.md' }],
        ...(gR ? { guias: [gR] } : {}),
      };
    }
    default:
      return { tema: b.detalle ?? '', sub: '', acciones: [] };
  }
}

/**
 * v6.02c F2 (E6) · CABECERA de un bloque (hora · AHORA/✓ · nombre · tema · sub). Sin guía = la de la plantilla. Con guía = «la guía manda»:
 * hora = unión de sus franjas, AHORA solo dentro de una franja de la guía (los huecos —p. ej. el SYNAPSE del lun 19 entre 07:25 y 07:55— no
 * cuentan), nombre sin la descripción genérica, tema = título(s) de la guía con su hora, sub = «🧭 la guía manda» (+ el sub del plan si no es
 * USMLE, cuyo sub genérico es el que contradecía).
 */
function cabeceraBloque(b: BloqueV6, c: { tema: string; sub: string; guias?: GuiaBloque[] }, ahora: number): {
  ini?: string | null; fin?: string | null; enCurso: boolean; pasado: boolean; nombre: string; tema: string; sub: string; varias: boolean; conGuia: boolean;
} {
  const gs = c.guias ?? [];
  const span = spanGuias(gs);
  if (!span) {
    return {
      ini: b.ini, fin: b.fin, enCurso: !!b.ini && !!b.fin && ahora >= hm(b.ini) && ahora < hm(b.fin),
      pasado: !!b.fin && ahora >= hm(b.fin) && b.ini !== b.fin, nombre: b.nombre, tema: c.tema, sub: c.sub, varias: false, conGuia: false,
    };
  }
  const tema = fechasRealesEnTexto(gs.length === 1 ? (gs[0] as GuiaBloque).titulo : gs.map((g) => `${g.franja.slice(0, 5)} ${tituloCorto(g.titulo)}`).join(' → '), b.plan); // v6.02d: fechas reales visibles
  const sub = `🧭 la guía manda · ${span.ini}–${span.fin} · ${fmtMin(gs.reduce((a, g) => a + g.totalMin, 0))}${gs.length > 1 ? ` en ${gs.length} franjas` : ''} · pasos en la tarjeta de abajo${b.plan !== 'usmle' && c.sub ? ` · ${c.sub}` : ''}`;
  return {
    ini: span.ini, fin: span.fin, enCurso: gs.some((g) => enFranja(g.franja, ahora)), pasado: ahora >= hm(span.fin),
    nombre: nombreBase(b.nombre), tema, sub, varias: gs.length > 1, conGuia: true,
  };
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
  // v6.02c · guía USMLE que no cae en ningún bloque USMLE de la plantilla (p. ej. Anki del sábado/domingo)
  const cubiertasUsmle = new Set(p.bloques.filter((b) => b.plan === 'usmle').flatMap((b) => contenidoBloque(b, p, iso).guias ?? []).map((g) => g.franja));
  const usmleFuera = p.corrida ? [] : guiaUsmleDe(iso).filter((g) => !cubiertasUsmle.has(g.franja)); // v6.02d: semana corrida → todo va en sus bloques

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
            : `${MODO_INFO[modo].label} · ${MODO_INFO[modo].resumen} (disparador: ${MODO_INFO[modo].disparador})${modo === 'ROJO' ? ' · el día perdido NO mueve el examen: su fila se hace en la próxima fila COLCHÓN (F1: sin colchón → pasa al tramo 2 el jue 31-dic)' : ''}`}
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
        const minimo = b.frente && !/^(feynman|anki-dom)$/.test(b.id) ? minimoPorFrente(b.frente as Frente, modo, iso) : null; // v6.02c (E5): los opcionales del domingo no tienen «mínimo»
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
        // v6.02c F2 (E6): con guía, la cabecera la manda la guía (franja real + títulos), no el texto genérico de la plantilla
        const { ini, fin, enCurso: enCursoG, pasado: pasadoG, nombre: nombreH, tema: temaH, sub: subH, varias, conGuia } = cabeceraBloque(b, c, ahora);
        return (
          <React.Fragment key={b.id}>
          <TouchableOpacity activeOpacity={onGo ? 0.8 : 1} onPress={() => onGo?.('Estudio')}
            style={[st.bloque, { borderLeftColor: color }, enCursoG && { backgroundColor: color + '14', borderColor: color + '66' }, (pasadoG || omitido) && { opacity: 0.5 }]}>
            <View style={st.horaCol}>
              <Text style={[st.hora, { color }]}>{ini ?? '—'}</Text>
              <Text style={st.horaFin}>{ini && fin && ini !== fin ? fin : ini ? '' : b.hora}</Text>
              {enCursoG && <AhoraChip color={color} />}
              {pasadoG && <Text style={st.checkTxt}>✓</Text>}
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={st.bloqueNombre}>{PLAN_FLAG[b.plan]} {nombreH}</Text>
              {minimo ? (
                <Text style={[st.bloqueTema, { color: MODO_COLOR[modo] }]} numberOfLines={2}>{MODO_INFO[modo].label} → {minimo}</Text>
              ) : null}
              {temaH ? <Text style={st.bloqueTema} numberOfLines={varias ? 3 : 2}>{temaH}</Text> : null}
              {subH ? <Text style={st.bloqueSub} numberOfLines={conGuia ? 2 : 1}>{subH}</Text> : null}
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
          {/* v6.02c · qué · cuánto · cómo de las franjas del bloque (formato común GuiaBloque; cada plan las da en su `case`) */}
          {c.guias && c.guias.length > 0 ? (
            <View style={st.guias}>
              {c.guias.map((g, k) => <GuiaBloqueCard key={k} g={g} color={color} compacto ahora={enFranja(g.franja, ahora)} />)}
            </View>
          ) : null}
          </React.Fragment>
        );
      })}
      {/* v6.02c · USMLE: franjas de la guía sin bloque en la plantilla de hoy (Anki del sábado 19:00 / domingo 17:00) */}
      {usmleFuera.length > 0 && (
        <View style={st.guias}>
          <Text style={st.bloqueSub}>🇺🇸 USMLE · fuera de los bloques de hoy</Text>
          {usmleFuera.map((g, k) => <GuiaBloqueCard key={k} g={g} color={GREEN} compacto={!enFranja(g.franja, ahora)} ahora={enFranja(g.franja, ahora)} />)}
        </View>
      )}
      <Text style={st.nota}>Plantilla {p.plantilla} (plantillasV6 · V6_ESPEC §A1/§B4.1) · toca un bloque → abre Estudio · ◆ Obsidian = nota madre donde caen los APEX · 04:55 commit-or-stash → 05:00 Anki sin excepción · 📓 journal = D:/synapse-journal (node DATA/_scripts/journal_hoy.js) · sáb 07:15-07:45 = revisión semanal (DATA/REVISION_SEMANAL.md; en el SERUMS, 20' dentro del Step 1 del sábado) · 13:00-13:25 = Business (Estudio Pulso) · cada bloque trae su guía «qué · cuánto · cómo» (toca la tarjeta para ver los pasos) · Step 1: {DIAS.length} días en F1 + {DIAS_T2.length} en el tramo 2</Text>
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
  guias: { marginLeft: 16, marginTop: -2, marginBottom: 6 },
});
