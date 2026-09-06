import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Motion, Hairline, LineHeight } from '../../theme/tokens';
import { DermaAtlas } from '../../lib/dermaData';
import { type DiaDerma, promirDermaCapDe, PROMIR_DERMA_CAPS, DERMA_PROMIR_DIAS } from '../../lib/dermaDailyPlan';
import {
  mirEvalLogAppend, mirEvalLogLoad, mirNeto, mirDermaEntradas, mirDermaResumen, MIR_TIPO_ERROR, MIR_DERMA_ASIGNATURA, MIR_DERMA_NUM,
  type MirTipoError,
} from '../../lib/mirEvalLog';
import DermaLineIcon from './DermaLineIcons';

/**
 * DermaMir10Q — segunda capa v2.1 (gaps_v3b_derma #3): en 1 de cada 3 sesiones Derma (d ≡ 0 mod 3) el slot
 * "~10Q review" (13:52-14:03) son las 10Q del TEST DEL CAPÍTULO ProMIR de Dermatología (rotación por peso,
 * PROMIR_DERMA_ROTACION). El resultado se registra en mirEvalLog (kind 'derma10Q', asignatura 'Dermatología',
 * neto MIR A − F/3, brecha knowledge/transfer/proceso + 🇪🇸 delta) — la misma API que MirTodayPlan, para que la
 * asignatura Dermatología del MIR se mida desde el bloque Derma sin tocar el horario MIR.
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;
const TOTAL = 10;
const MIR_AMBER = '#F5A623'; // ámbar España (acento de la consola MIR)

export default function DermaMir10Q({ dia, accent = DermaAtlas.promir }: { dia: DiaDerma; accent?: string }) {
  const cap = promirDermaCapDe(dia.d);
  const [aciertos, setAciertos] = useState<number>(TOTAL);
  const [blancos, setBlancos] = useState<number>(0);
  const [tipo, setTipo] = useState<MirTipoError | null>(null);
  const [deltaEs, setDeltaEs] = useState(false);
  const [tiempo, setTiempo] = useState('');
  const [nota, setNota] = useState('');
  const [msg, setMsg] = useState('');
  const [tick, setTick] = useState(0);
  const entries = useMemo(() => mirEvalLogLoad(), [tick]); // eslint-disable-line react-hooks/exhaustive-deps
  const hoy = useMemo(() => mirDermaEntradas(entries).find((e) => e.d === dia.d && (e.nota || '').includes(`derma d${dia.d}`)), [entries, dia.d]);
  const resumen = useMemo(() => mirDermaResumen(entries), [entries]);
  if (!cap) return null;

  const fallos = Math.max(0, TOTAL - aciertos - blancos);
  const r = mirNeto(aciertos, TOTAL, blancos);
  const idx = DERMA_PROMIR_DIAS.indexOf(dia.d) + 1;
  const vecesCap = DERMA_PROMIR_DIAS.filter((d) => promirDermaCapDe(d)?.n === cap.n).length;

  const guardar = () => {
    if (fallos > 0 && !tipo) { setMsg('Marca la brecha del fallo (knowledge / transfer / proceso).'); return; }
    const res = mirEvalLogAppend({
      fecha: dia.fecha, d: dia.d, tema: `ProMIR Derma cap ${cap.n} · ${cap.t}`, asignatura: MIR_DERMA_ASIGNATURA, num: MIR_DERMA_NUM,
      aciertos, total: TOTAL, blancos, tiempoSeg: Math.round((Number(tiempo) || 0) * 60),
      tipoError: fallos > 0 ? tipo : null, delta_es: deltaEs, kind: 'derma10Q',
      nota: [`derma d${dia.d} · bloque ${dia.bKey}`, nota.trim()].filter(Boolean).join(' · '),
    });
    setMsg(res.guardado ? `✓ registrado en el log MIR · neto ${r.neto}/${TOTAL} (${r.netoPct} %) · asignatura Dermatología` : '⚠ sin localStorage: no se guardó');
    setTick((t) => t + 1);
  };

  return (
    <View style={[st.card, { borderColor: accent + '55' }]}>
      <View style={st.head}>
        <DermaLineIcon name="flask" size={17} color={accent} />
        <View style={{ flex: 1 }}>
          <Text style={st.title}>10Q MIR-Dermatología · test del capítulo ProMIR</Text>
          <Text style={st.sub}>sesión MIR {idx}/{DERMA_PROMIR_DIAS.length} (1 de cada 3) · cap {cap.n} {cap.t} · peso MIR {cap.peso} % · {vecesCap}× en la rotación · 77 s/Q · en blanco permitido · neto = A − F/3</Text>
        </View>
        <View style={[st.pill, { borderColor: MIR_AMBER + '77' }]}><Text style={[st.pillTxt, { color: MIR_AMBER }]}>MIR</Text></View>
      </View>

      {hoy ? (
        <Text style={st.prev}>✓ ya registrado en esta sesión: {hoy.aciertos}/{hoy.total} · blancos {hoy.blancos} · neto {mirNeto(hoy.aciertos, hoy.total, hoy.blancos).netoPct} %{hoy.tipoError ? ` · ${hoy.tipoError}` : ''}{hoy.delta_es ? ' · 🇪🇸 delta' : ''} (append-only: un nuevo guardado añade otra entrada)</Text>
      ) : null}

      <Text style={st.lbl}>Aciertos /{TOTAL}</Text>
      <View style={st.row}>
        {Array.from({ length: TOTAL + 1 }, (_, i) => i).map((n) => (
          <TouchableOpacity key={n} activeOpacity={0.8} onPress={() => { setAciertos(n); if (blancos > TOTAL - n) setBlancos(TOTAL - n); }} style={[st.chip, aciertos === n && { borderColor: accent, backgroundColor: accent + '22' }, Platform.OS === 'web' ? WEB : null]}>
            <Text style={[st.chipTxt, aciertos === n && { color: accent }]}>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={st.lbl}>En blanco</Text>
      <View style={st.row}>
        {Array.from({ length: TOTAL - aciertos + 1 }, (_, i) => i).map((n) => (
          <TouchableOpacity key={n} activeOpacity={0.8} onPress={() => setBlancos(n)} style={[st.chip, blancos === n && { borderColor: Colors.muted, backgroundColor: 'rgba(255,255,255,0.08)' }, Platform.OS === 'web' ? WEB : null]}>
            <Text style={[st.chipTxt, blancos === n && { color: Colors.onSurface }]}>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={st.neto}>fallos {fallos} → neto = {aciertos} − {fallos}/3 = <Text style={{ color: accent, fontWeight: '800' }}>{r.neto}</Text> ({r.netoPct} %)</Text>

      {fallos > 0 && (
        <>
          <Text style={st.lbl}>Brecha del fallo</Text>
          <View style={st.row}>
            {MIR_TIPO_ERROR.map((t) => (
              <TouchableOpacity key={t.k} activeOpacity={0.8} onPress={() => setTipo(t.k)} style={[st.chip, tipo === t.k && { borderColor: DermaAtlas.crit, backgroundColor: DermaAtlas.crit + '22' }, Platform.OS === 'web' ? WEB : null]}>
                <Text style={[st.chipTxt, tipo === t.k && { color: DermaAtlas.crit }]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {tipo ? <Text style={st.hint}>{MIR_TIPO_ERROR.find((t) => t.k === tipo)?.desc}</Text> : null}
        </>
      )}

      <View style={[st.row, { alignItems: 'center', marginTop: Spacing.sm }]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setDeltaEs((v) => !v)} style={[st.chip, deltaEs && { borderColor: MIR_AMBER, backgroundColor: MIR_AMBER + '22' }, Platform.OS === 'web' ? WEB : null]}>
          <Text style={[st.chipTxt, deltaEs && { color: MIR_AMBER }]}>🇪🇸 delta-España {deltaEs ? '✓' : ''}</Text>
        </TouchableOpacity>
        <TextInput value={tiempo} onChangeText={setTiempo} placeholder="min" placeholderTextColor={Colors.muted} keyboardType="numeric" style={st.input} />
        <TextInput value={nota} onChangeText={setNota} placeholder="nota (subtema fallado…)" placeholderTextColor={Colors.muted} style={[st.input, { flex: 1, minWidth: 140 }]} />
      </View>
      <View style={[st.row, { alignItems: 'center', marginTop: Spacing.sm }]}>
        <TouchableOpacity activeOpacity={0.85} onPress={guardar} style={[st.save, { backgroundColor: accent }, Platform.OS === 'web' ? WEB : null]}>
          <Text style={st.saveTxt}>Guardar en el log MIR (Dermatología)</Text>
        </TouchableOpacity>
        {!!msg && <Text style={[st.hint, { flex: 1, marginTop: 0 }]}>{msg}</Text>}
      </View>

      {resumen.n > 0 ? (
        <Text style={st.foot}>Acumulado ProMIR-Derma: {resumen.n} test · {resumen.aciertos}/{resumen.total} · neto {resumen.netoPct} % → cuenta en la asignatura Dermatología del MIR (mirStatsPorAsignatura), no en readiness ni en la cola D+14.</Text>
      ) : (
        <Text style={st.foot}>Rotación: {PROMIR_DERMA_CAPS.map((c) => `cap ${c.n} ×${DERMA_PROMIR_DIAS.filter((d) => promirDermaCapDe(d)?.n === c.n).length}`).join(' · ')} (slots ∝ peso MIR, mín. 1).</Text>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: BorderRadius.lg, padding: Spacing.md, backgroundColor: 'rgba(200,169,106,0.05)', marginTop: 6, marginBottom: 6 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  title: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  sub: { fontSize: 9, color: Colors.muted, marginTop: 2, lineHeight: 12 },
  pill: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 8 },
  pillTxt: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  prev: { fontSize: 9, color: DermaAtlas.jade, marginTop: 6, lineHeight: 12, fontStyle: 'italic' },
  lbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, textTransform: 'uppercase', marginTop: Spacing.sm, marginBottom: 6 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  chip: { paddingVertical: 4, paddingHorizontal: 9, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: 'rgba(231,234,242,0.12)', backgroundColor: 'rgba(255,255,255,0.03)', minWidth: 30, alignItems: 'center' },
  chipTxt: { fontSize: FontSize.labelSm, color: Colors.muted, fontWeight: '700' },
  neto: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 8, lineHeight: LineHeight.labelSm },
  hint: { fontSize: 9, color: Colors.muted, marginTop: 5, lineHeight: 13, fontStyle: 'italic' },
  input: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 9, color: Colors.onSurface, fontSize: FontSize.labelSm, backgroundColor: 'rgba(255,255,255,0.03)', minWidth: 56 },
  save: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: BorderRadius.md },
  saveTxt: { fontSize: FontSize.labelMd, fontWeight: '800', color: '#1A1031', letterSpacing: 0.2 },
  foot: { fontSize: 9, color: Colors.muted, marginTop: Spacing.sm, lineHeight: 12, fontStyle: 'italic' },
});
