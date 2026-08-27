import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from './primitives';
import { FadeUp } from './visuals';
import { LIV_META, LIV_FRANJAS, LIV_DIAS, DiaLiviano, livDiaDe, livProximos, livColor } from '../../lib/livianoStudyPlan';
import { planHoyD, loadDone, saveDone } from '../../lib/studyProgress';

/**
 * LivianoTodayPlan — "LIVIANO Academia" día a día (90 días L-V · medicina de la
 * obesidad), mismo motor que Estudio Pulso: Día X/90, HOY (tema + 25' estudio +
 * 20' aplicación al paciente + fuente), ✓ Completado persistido ('liviano') y
 * los próximos 5 días. Generado desde DATA/BUSINESS/LIVIANO_ACADEMIA.md.
 */
const SALVIA = '#9DB07F';

function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return LIV_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}

function ColaItem({ icon, lbl, val, sub, color }: { icon: string; lbl: string; val: string; sub: string; color: string }) {
  return (
    <View style={[st.cola, { borderLeftColor: color }]}>
      <Text style={st.colaIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={st.colaLbl}>{lbl}</Text>
        <Text style={st.colaVal}>{val}</Text>
        <Text style={st.colaSub}>{sub}</Text>
      </View>
    </View>
  );
}

export default function LivianoTodayPlan() {
  const iso = todayISO();
  const hoyD = planHoyD(LIV_DIAS, iso);
  const todayDia = livDiaDe(iso) || LIV_DIAS.find((x) => x.d === hoyD) || LIV_DIAS[0];
  const [sel, setSel] = useState<number>(todayDia.d);
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone('liviano')));
  const dia = LIV_DIAS.find((x) => x.d === sel) || LIV_DIAS[0];
  const esHoy = dia.d === todayDia.d;
  const c = livColor(dia.modulo);
  const viernes = dia.wd === 'Vie';
  const hecho = done.has(dia.d);
  const toggleDone = (d: number) => setDone((prev) => {
    const n = new Set(prev);
    if (n.has(d)) n.delete(d); else n.add(d);
    saveDone('liviano', Array.from(n));
    return n;
  });
  const proximos = livProximos(dia.d, 5);

  return (
    <View>
      {/* Cabecera */}
      <View style={st.head}>
        <Text style={st.headTitle}>⚖️ LIVIANO ACADEMIA · Día {dia.d}/{LIV_META.totalDias}{esHoy ? ' · HOY' : ''}</Text>
        <Text style={st.headSub}>{fmtFecha(dia.fecha)} · {dia.fecha} · {LIV_META.franja}</Text>
      </View>
      {!esHoy && (
        <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(todayDia.d)} style={st.hoyBtn}>
          <Text style={st.hoyBtnTxt}>↩ volver a HOY</Text>
        </TouchableOpacity>
      )}

      <GlassPanel style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
        {/* Tema del día */}
        <FadeUp>
          <View style={[st.temaCard, { borderColor: c + '55' }]}>
            <View style={st.temaTop}>
              <View style={[st.modBadge, { backgroundColor: c + '1F', borderColor: c + '66' }]}>
                <Text style={[st.modBadgeTxt, { color: c }]}>{dia.modulo}</Text>
              </View>
              <Chip label={`${dia.min} min`} color={c} small />
              {viernes ? <Chip label="🩺 caso clínico" color={SALVIA} small /> : null}
            </View>
            <Text style={st.temaTitle}>{dia.tema}</Text>
            <Text style={st.temaSub}>25' mecanismo (Palmerton) + 20' explicárselo al paciente</Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => toggleDone(dia.d)}
              style={[st.doneBtn, hecho ? { backgroundColor: SALVIA, borderColor: SALVIA } : { backgroundColor: SALVIA + '14', borderColor: SALVIA + '66' }]}
            >
              <Text style={[st.doneBtnTxt, { color: hecho ? '#141A0F' : SALVIA }]}>{hecho ? '✓ Completado' : '○ Marcar como completado'}</Text>
            </TouchableOpacity>
          </View>
        </FadeUp>

        {/* Bloque de hoy */}
        <Text style={st.secLbl}>📋 Bloque de hoy · 45 min (en orden)</Text>
        <FadeUp delay={40}><ColaItem icon="📖" lbl={`ESTUDIO · ${LIV_FRANJAS[0].hora} (25 min)`} val={dia.estudio} sub="tarjetas de MECANISMO — ¿por qué?, no datos sueltos" color={c} /></FadeUp>
        <FadeUp delay={70}><ColaItem icon="🗣️" lbl={`APLICACIÓN · ${LIV_FRANJAS[1].hora} (20 min)`} val={dia.aplicacion} sub="en voz alta, como si el paciente estuviera al frente" color={SALVIA} /></FadeUp>
        <FadeUp delay={100}><ColaItem icon="📚" lbl="FUENTE (verificar antes de publicar)" val={dia.fuente} sub="regla anti-alucinación: todo dato clínico contra fuente primaria" color="#A78BFA" /></FadeUp>

        {/* Próximos 5 días */}
        <Text style={st.secLbl}>📆 Próximos 5 días</Text>
        {proximos.map((x, i) => {
          const xc = livColor(x.modulo);
          return (
            <FadeUp key={x.d} delay={i * 30}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(x.d)} style={[st.d5, { borderLeftColor: xc }]}>
                <Text style={[st.d5day, { color: xc }]}>D{x.d}</Text>
                <Text style={st.d5fecha}>{fmtFecha(x.fecha)}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={st.d5sub} numberOfLines={1}>{x.tema}</Text>
                  <Text style={st.d5mod}>{x.modulo} · {x.min} min</Text>
                </View>
                <Text style={[st.d5go, { color: xc }]}>→</Text>
              </TouchableOpacity>
            </FadeUp>
          );
        })}
        <Text style={st.note}>
          {LIV_META.totalDias} días L-V ({LIV_META.inicio} → {LIV_META.fin}) · 6 módulos del currículo LIVIANO_ACADEMIA
          · cada viernes: caso de paciente simulado. ✓ se guarda en este dispositivo.
        </Text>
      </GlassPanel>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, ...Elevation.sm };
const st = StyleSheet.create({
  head: { ...cardBase, padding: Spacing.md, marginBottom: Spacing.xs, alignItems: 'center' },
  headTitle: { fontSize: FontSize.bodyLg, lineHeight: LineHeight.bodyLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2, textAlign: 'center' },
  headSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 3, textAlign: 'center' },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm, paddingVertical: 3, paddingHorizontal: 8 },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: SALVIA, fontWeight: '700', letterSpacing: 0.2 },

  temaCard: { ...cardBase, borderWidth: 1, padding: Spacing.lg, marginBottom: Spacing.sm },
  temaTop: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  modBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 11 },
  modBadgeTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.3 },
  temaTitle: { fontSize: FontSize.bodyLg, lineHeight: LineHeight.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: 9, letterSpacing: -0.2 },
  temaSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, lineHeight: LineHeight.labelSm + 1 },
  doneBtn: { marginTop: 12, paddingVertical: 10, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center' },
  doneBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.3 },

  secLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.8, marginBottom: 8, marginTop: Spacing.md, textTransform: 'uppercase' },
  cola: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 7 },
  colaIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  colaLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4 },
  colaVal: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600', marginTop: 3, lineHeight: LineHeight.labelMd },
  colaSub: { fontSize: 9, color: Colors.muted, marginTop: 3 },

  d5: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 6 },
  d5day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 36, letterSpacing: 0.2 },
  d5fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d5sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d5mod: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  d5go: { fontSize: 16, fontWeight: '800', width: 18, textAlign: 'center' },

  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: LineHeight.labelSm },
});
