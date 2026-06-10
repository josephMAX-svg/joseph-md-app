import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Animated } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { MIR_DIAS, mirDiaDe, capUrl } from '../../lib/mirDailyPlan';
import { DIAS, diaDe, QBQ } from '../../lib/usmleStep1Daily';
import { mirObsUrl, usmleObsUrl, encapsObsUrl, OBS_MAPA_URL } from '../../lib/obsidianMap';

/**
 * TodayMission — "🎯 Misión de HOY" en el Home. Línea de tiempo REAL del Google
 * Calendar (ENCAPS 09:00 deep prime · MIR 15:15 · USMLE 16:15 · ENCAPS 17:15-18:45)
 * con el tema del día de cada plan (mirDailyPlan / usmleStep1Daily) y accesos
 * directos: ProMIR ↗ · Qbankly (◆ Edge) · ◆ Obsidian (nota madre donde caen los APEX).
 * El bloque en curso se resalta con "AHORA". Fase = detect_phase del orquestador.
 */
const AMBER = '#F5A623';
const GREEN = '#3FB984';
const TEAL = '#2EE6A8';
const EDGE = '#3DA5E0';
const OBS = '#A78BFA';

function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return '2026-06-10'; }
}
/** Fase del orquestador (D:\agente_estudio\CLAUDE.md · detect_phase) */
function faseActual(iso: string): string {
  if (iso < '2026-06-01') return 'FASE 4';
  if (iso < '2026-08-10') return 'FASE 5 · ENCAPS dominante';
  if (iso < '2026-10-01') return 'FASE 6 · post-ENCAPS';
  return 'FASE 7 · USMLE dominante';
}
function nowMin(): number { try { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); } catch { return 0; } }
const hm = (s: string) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };

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
      flag: '🇵🇪', nombre: 'ENCAPS · Deep Prime', ini: '09:00', fin: '11:00', color: TEAL,
      tema: 'Encoding — tema nuevo del cronograma ENCAPS', sub: 'deep work mañana · ver pestaña Estudio → Perú',
      acciones: [{ lbl: '◆ Obsidian', color: OBS, url: encapsObsUrl('salud_publica') || OBS_MAPA_URL }],
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
      flag: '🇺🇸', nombre: 'USMLE · Anchored Eval + Deep Work', ini: '16:15', fin: '17:15', color: GREEN,
      tema: us ? `D${us.d}/${DIAS.length} · ${us.system} — ${us.sub}` : 'fuera del rango del plan',
      sub: us ? `${us.bbCh}: ${us.bbVid} · ${us.mat}` : 'Step 1 · 1ª vuelta',
      acciones: us ? [
        { lbl: '◆ Edge', color: EDGE, url: 'microsoft-edge:' + QBQ, fill: true },
        ...(usmleObsUrl(us.d) ? [{ lbl: '◆ Obsidian', color: OBS, url: usmleObsUrl(us.d)! }] : []),
      ] : [],
    },
    {
      flag: '🇵🇪', nombre: 'ENCAPS · Anclaje + Evaluación', ini: '17:15', fin: '18:45', color: TEAL,
      tema: 'Mapa Notability → validación Obsidian → Anki · 18:00 modo examen',
      sub: 'anchoring pre-sueño · loop 24h del Calendar',
      acciones: [{ lbl: '◆ Obsidian', color: OBS, url: OBS_MAPA_URL }],
    },
  ];

  return (
    <View style={st.wrap}>
      <View style={st.head}>
        <Text style={st.title}>🎯 MISIÓN DE HOY</Text>
        <View style={st.faseChip}><Text style={st.faseTxt}>{faseActual(iso)}</Text></View>
        <Text style={st.fecha}>{iso}</Text>
      </View>
      {bloques.map((b, i) => {
        const enCurso = ahora >= hm(b.ini) && ahora < hm(b.fin);
        const pasado = ahora >= hm(b.fin);
        return (
          <TouchableOpacity key={i} activeOpacity={onGo ? 0.8 : 1} onPress={() => onGo?.('Estudio')}
            style={[st.bloque, { borderLeftColor: b.color }, enCurso && { backgroundColor: b.color + '14', borderColor: b.color + '66' }, pasado && { opacity: 0.55 }]}>
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
  title: { fontSize: 12, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.2 },
  faseChip: { backgroundColor: TEAL + '1A', borderWidth: 1, borderColor: TEAL + '55', borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 10 },
  faseTxt: { fontSize: 10, fontWeight: '800', color: TEAL, letterSpacing: 0.4 },
  fecha: { fontSize: 11, color: Colors.muted, marginLeft: 'auto' },

  bloque: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg,
    borderWidth: 1, borderColor: DesktopColors.glassBorder, borderLeftWidth: 4,
    paddingVertical: 10, paddingHorizontal: 12, marginBottom: 6,
  },
  horaCol: { alignItems: 'center', width: 52 },
  hora: { fontSize: FontSize.labelMd, fontWeight: '800' },
  horaFin: { fontSize: 9, color: Colors.muted, marginTop: 1 },
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
