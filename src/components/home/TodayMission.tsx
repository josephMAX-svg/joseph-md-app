import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Animated, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { MIR_DIAS, mirDiaDe, capUrl } from '../../lib/mirDailyPlan';
import { DIAS, diaDe, QBQ } from '../../lib/usmleStep1Daily';
import { mirObsUrl, usmleObsUrl, encapsObsUrl, OBS_MAPA_URL } from '../../lib/obsidianMap';

/**
 * TodayMission — "MISIÓN DE HOY" del cockpit (Home). Línea de tiempo REAL del Google
 * Calendar v5.5 (IA 04:15 · USMLE Anki AM 05:00 · USMLE 07:15-12:00 principal · MIR 15:15 · ENCAPS 16:15 1h · LIVIANO 17:15 · USMLE eval 18:00)
 * con el tema del día de cada plan (mirDailyPlan / usmleStep1Daily) y accesos
 * directos: ProMIR ↗ · Qbankly (◆ Edge) · ◆ Obsidian (nota madre donde caen los APEX).
 * El bloque en curso se resalta con "AHORA". Fase = detect_phase del orquestador.
 *
 * Colores por-segmento en JOYA APAGADA (mapeo cognitivo NASA), tokens v4:
 * ENCAPS→teal · MIR→gold(amber) · USMLE→jade(green) · Obsidian→amethyst(purple) · Edge→sapphire(blue)
 */
const AMBER = Colors.amber;   // MIR — champagne (gold)
const GREEN = Colors.green;   // USMLE — jade
const TEAL = Colors.teal;     // ENCAPS — muted teal
const EDGE = Colors.blue;     // Edge/Qbankly — sapphire
const OBS = Colors.purple;    // Obsidian — amethyst

const MONO = Platform.OS === 'web' ? "'JetBrains Mono', 'SF Mono', monospace" : undefined;

function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
export function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return '2026-06-10'; }
}
/** Fase del orquestador (D:\agente_estudio\CLAUDE.md · detect_phase). Exportada para la Cockpit Status Bar. */
export function faseActual(iso: string): string {
  if (iso < '2026-06-01') return 'FASE 4';
  if (iso < '2026-08-10') return 'FASE 5 · ENCAPS';
  if (iso < '2026-09-04') return 'FASE 6 · transición';
  if (iso < '2027-02-01') return 'FASE 7 · STEP 1 PRINCIPAL';
  return 'FASE 8 · ENCAPS FINAL';
}
function nowMin(): number { try { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); } catch { return 0; } }
const hm = (s: string) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };

/** Etiqueta corta MIR del día (para el briefing/status bar). null si fuera de rango. */
export function mirLabelDe(iso: string): string | null {
  const mir = mirDiaDe(iso);
  return mir ? `MIR D${mir.d} · ${mir.asignatura}` : null;
}
/** Etiqueta corta USMLE del día (para el briefing/status bar). null si fuera de rango. */
export function usmleLabelDe(iso: string): string | null {
  const us = diaDe(iso);
  return us ? `USMLE D${us.d} · ${us.system}` : null;
}

interface Accion { lbl: string; color: string; url: string; fill?: boolean }
interface Bloque { flag: string; nombre: string; ini: string; fin: string; color: string; tema: string; sub: string; acciones: Accion[] }

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

export default function TodayMission({ onGo }: { onGo?: (screen: string) => void }) {
  const iso = todayISO();
  const mir = mirDiaDe(iso);
  const us = diaDe(iso);
  const ahora = nowMin();

  const bloques: Bloque[] = [
    {
      flag: '🧠', nombre: 'IA · VIBECODING con Claude Code (1 proyecto real/semana)', ini: '04:15', fin: '05:00', color: OBS,
      tema: '5\' objetivo → 35\' construir → 5\' commit (synapse-journal) — NO programar desde cero',
      sub: 'reactivado 31-ago · teoría estructurada sigue en la misión SYNAPSE 12:30',
      acciones: [],
    },
    {
      flag: '🇺🇸', nombre: 'USMLE · ANKI AM (madrugada fresca · Palmerton 2x)', ini: '05:00', fin: '05:45', color: GREEN,
      tema: 'Pasada principal FSRS del deck USMLE · Fases B-C: + stress set 10Q/12min',
      sub: 'Step 1 = 6h15/día × 98 días (~612h) · el 07:15 queda para repaso anclado D-1/D-3/D-7',
      acciones: [],
    },
    {
      flag: '🇺🇸', nombre: 'USMLE · BLOQUE PRINCIPAL (Anki → Pre-test → Deep Prime → 30Q)', ini: '07:15', fin: '12:00', color: GREEN,
      tema: us ? `D${us.d}/${DIAS.length} · ${us.system} — ${us.sub}` : 'fuera del rango del plan',
      sub: us ? `${us.bbCh}: ${us.bbVid} · ${us.mat} · todo en inglés` : 'Step 1 · v5.5 desde vie 4-sep',
      acciones: us ? [
        { lbl: '◆ Edge', color: EDGE, url: 'microsoft-edge:' + QBQ, fill: true },
        ...(usmleObsUrl(us.d) ? [{ lbl: '◆ Obsidian', color: OBS, url: usmleObsUrl(us.d)! }] : []),
      ] : [],
    },
    {
      flag: '🇪🇸', nombre: 'MIR · Eval D-1 + Deep Work', ini: '15:15', fin: '16:15', color: AMBER,
      tema: mir ? `D${mir.d}/${MIR_DIAS.length} · ${mir.asignatura} — ${mir.tema}` : 'fuera del rango del plan',
      sub: mir && mir.peso != null ? `Peso MIR ${mir.peso}% · ${mir.vuelta}ª vuelta` : '1ª vuelta',
      acciones: mir ? [
        { lbl: 'ProMIR ↗', color: AMBER, url: capUrl(mir.capId), fill: true },
        ...(mirObsUrl(mir.capId) ? [{ lbl: '◆ Obsidian', color: OBS, url: mirObsUrl(mir.capId)! }] : []),
      ] : [],
    },
    {
      flag: '🇵🇪', nombre: 'ENCAPS · 1h banqueo (mantenimiento 2027-I)', ini: '16:15', fin: '17:15', color: TEAL,
      tema: 'Banco del día según pronóstico v3 (rotación II·I·V·III·IV) · viernes = mini-simulacro 25Q',
      sub: 'registro de errores en TRACKING_ERRORES · feb-mar 2027 vuelve a principal',
      acciones: [{ lbl: '◆ Obsidian', color: OBS, url: encapsObsUrl('salud_publica') || OBS_MAPA_URL }],
    },
    {
      flag: '⚖️', nombre: 'LIVIANO · Academia (obesidad/GLP-1/nutrición)', ini: '17:15', fin: '18:00', color: AMBER,
      tema: 'Módulo del día — ver Business → LIVIANO → Academia',
      sub: '25 min estudio + 20 min aplicación (explicárselo a un paciente)',
      acciones: [],
    },
    {
      flag: '🇺🇸', nombre: 'USMLE · Evaluación acumulativa (modo examen)', ini: '18:00', fin: '18:45', color: GREEN,
      tema: 'Bloque timed mixto de temas vistos + corrección + APEX',
      sub: 'termómetro diario del Step 1 · anchoring pre-sueño',
      acciones: [{ lbl: '◆ Obsidian', color: OBS, url: OBS_MAPA_URL }],
    },
  ];

  return (
    <View style={st.wrap}>
      <View style={st.head}>
        <View style={st.titleRail} />
        <Text style={st.title}>MISIÓN DE HOY</Text>
        <View style={st.faseChip}><Text style={st.faseTxt}>{faseActual(iso)}</Text></View>
        <Text style={st.fecha}>{iso}</Text>
      </View>
      {bloques.map((b, i) => {
        const enCurso = ahora >= hm(b.ini) && ahora < hm(b.fin);
        const pasado = ahora >= hm(b.fin);
        return (
          <TouchableOpacity key={i} activeOpacity={onGo ? 0.8 : 1} onPress={() => onGo?.('Estudio')}
            style={[st.bloque, { borderLeftColor: b.color }, enCurso && { backgroundColor: b.color + '14', borderColor: b.color + '66' }, pasado && { opacity: 0.5 }]}>
            <View style={st.horaCol}>
              <Text style={[st.hora, { color: b.color }]}>{b.ini}</Text>
              <Text style={st.horaFin}>{b.fin}</Text>
              {enCurso && <AhoraChip color={b.color} />}
              {pasado && <Text style={st.checkTxt}>✓</Text>}
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={st.bloqueNombre}>{b.flag} {b.nombre}</Text>
              <Text style={st.bloqueTema} numberOfLines={2}>{b.tema}</Text>
              <Text style={st.bloqueSub} numberOfLines={1}>{b.sub}</Text>
            </View>
            <View style={st.btnCol}>
              {b.acciones.map((a, j) => (
                <TouchableOpacity key={j} activeOpacity={0.85} onPress={() => openUrl(a.url)}
                  style={[st.btn, { borderColor: a.color + '88' }, a.fill && { backgroundColor: a.color + '22' }]}>
                  <Text style={[st.btnTxt, { color: a.color }]}>{a.lbl}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        );
      })}
      <Text style={st.nota}>Horario real del Google Calendar (Lima) · toca un bloque → abre Estudio · ◆ Obsidian = nota madre donde caen los APEX</Text>
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

  bloqueNombre: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface },
  bloqueTema: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 16 },
  bloqueSub: { fontSize: 9, color: Colors.muted, marginTop: 2 },

  btnCol: { gap: 5, alignItems: 'stretch', minWidth: 86 },
  btn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center' },
  btnTxt: { fontSize: FontSize.labelSm, fontWeight: '800' },
  nota: { fontSize: 9, color: Colors.muted, marginTop: 4 },
});
