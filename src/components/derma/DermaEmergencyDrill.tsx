import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Motion, Hairline } from '../../theme/tokens';
import { DermaAtlas } from '../../lib/dermaData';
import { type DiaDerma } from '../../lib/dermaDailyPlan';
import { DERMA_DRILL_HDPH, dermaDrillEvaluar, type DermaDrillItem } from '../../lib/dermaCerebro';
import { dermaLedgerAppend } from '../../lib/dermaLedger';
import DermaLineIcon from './DermaLineIcons';
import { useDermaLedger, notifyDermaLedger, dermaHoyISO } from './dermaLedgerBus';

/**
 * DermaEmergencyDrill — simulador "Oclusión vascular · 90 s" (DERMA_MASTER_SPEC §9.5).
 * Cronómetro + checklist HDPH (reconocer → hialuronidasa → endpoints → ceguera → kit → prevención).
 * Flujo: RECITAR (los ítems permanecen ocultos, solo se ven las fases; Joseph recita de memoria en voz
 * alta) → PARAR → marcar lo que dijo → evaluar (dermaDrillEvaluar: ≤90 s + todos los VERIFICADOS +
 * ≥80 %) → guardar en el ledger (fuente 'drill', id 0). Se ejecuta en d19/d20 (tras el swap v2.1) y en los
 * checkpoints d46 (H) / d70 (Z) — DERMA_DRILL_DIAS. Historial = entradas 'drill' del ledger.
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;
const FASE_LABEL: Record<DermaDrillItem['fase'], string> = {
  reconocer: 'Reconocer y parar', hialuronidasa: 'Hialuronidasa (HDPH)', endpoints: 'Endpoints y ventana',
  ceguera: 'Ceguera', kit: 'Kit de emergencia', prevencion: 'Prevención',
};
const FASES: DermaDrillItem['fase'][] = ['reconocer', 'hialuronidasa', 'endpoints', 'ceguera', 'kit', 'prevencion'];
const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function DermaEmergencyDrill({ dia, accent = DermaAtlas.crit }: { dia: DiaDerma; accent?: string }) {
  const { entries } = useDermaLedger();
  const [fase, setFase] = useState<'idle' | 'recitando' | 'checklist' | 'resultado'>('idle');
  const [seg, setSeg] = useState(0);
  const [recitados, setRecitados] = useState<Set<string>>(new Set());
  const [guardado, setGuardado] = useState<string>('');
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const LIMITE = DERMA_DRILL_HDPH.segundos;
  const pasos = DERMA_DRILL_HDPH.pasos;

  const stop = () => { if (timer.current) { clearInterval(timer.current); timer.current = null; } };
  useEffect(() => () => stop(), []);
  useEffect(() => { reset(); }, [dia.d]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => { stop(); setFase('idle'); setSeg(0); setRecitados(new Set()); setGuardado(''); };
  const start = () => {
    reset(); setFase('recitando');
    timer.current = setInterval(() => setSeg((s) => { if (s + 1 >= 600) { stop(); } return s + 1; }), 1000);
  };
  const parar = () => { stop(); setFase('checklist'); };
  const toggle = (k: string) => setRecitados((s) => { const n = new Set(s); if (n.has(k)) n.delete(k); else n.add(k); return n; });
  const evaluar = () => setFase('resultado');
  const res = useMemo(() => dermaDrillEvaluar(Array.from(recitados), seg), [recitados, seg]);

  const guardar = () => {
    const nota = `drill HDPH ${res.pct}% en ${seg}s${res.aTiempo ? '' : ' (fuera de tiempo)'}${res.faltan.length ? ' · faltan: ' + res.faltan.map((p) => p.k).join(', ') : ''}`;
    const r = dermaLedgerAppend({
      id: 0, fecha: dermaHoyISO(), d: dia.d, bKey: dia.bKey, fuente: 'drill', acierto: res.acierto,
      moduloCORE: 'Surg', evalAcierto: res.acierto ? 'conocimiento' : 'no-sabia', tipoError: res.acierto ? null : 'CONCEPTO', nota,
    });
    notifyDermaLedger();
    setGuardado(r.guardado ? `✓ guardado en el ledger (${res.acierto ? 'acierto' : 'fallo'})` : '⚠ sin localStorage: no se guardó');
  };
  const historial = useMemo(() => entries.filter((e) => e.fuente === 'drill').slice(-5).reverse(), [entries]);
  const fuera = seg > LIMITE;
  const timerColor = fase === 'recitando' ? (fuera ? DermaAtlas.crit : DermaAtlas.jade) : Colors.muted;

  return (
    <View style={[st.card, { borderColor: accent + '55' }]}>
      <View style={st.head}>
        <DermaLineIcon name="histoDrop" size={17} color={accent} />
        <View style={{ flex: 1 }}>
          <Text style={st.title}>Drill · {DERMA_DRILL_HDPH.titulo}</Text>
          <Text style={st.sub}>SPEC §9.5 · recita de MEMORIA en ≤{LIMITE} s · acierto = a tiempo + todos los ítems verificados + ≥{Math.round(DERMA_DRILL_HDPH.minimoAcierto * 100)} %</Text>
        </View>
        <Text style={[st.timer, { color: timerColor }]}>{mmss(seg)}</Text>
      </View>

      {fase === 'idle' && (
        <TouchableOpacity activeOpacity={0.85} onPress={start} style={[st.btn, { backgroundColor: accent }, Platform.OS === 'web' ? WEB : null]}>
          <Text style={st.btnTxt}>▶ Empezar: {pasos.length} ítems en {LIMITE} s (ocultos hasta que pares)</Text>
        </TouchableOpacity>
      )}

      {fase === 'recitando' && (
        <View>
          <Text style={st.hint}>Solo ves las fases. Recita en voz alta signos → hialuronidasa → endpoints → ceguera → kit → prevención.</Text>
          <View style={st.faseRow}>
            {FASES.map((f) => <View key={f} style={st.faseChip}><Text style={st.faseTxt}>{FASE_LABEL[f]} · {pasos.filter((p) => p.fase === f).length}</Text></View>)}
          </View>
          {fuera ? <Text style={[st.hint, { color: DermaAtlas.crit }]}>fuera de los {LIMITE} s: en la vida real la hialuronidasa ya debería estar cargada.</Text> : null}
          <TouchableOpacity activeOpacity={0.85} onPress={parar} style={[st.btn, { backgroundColor: DermaAtlas.jade }, Platform.OS === 'web' ? WEB : null]}>
            <Text style={st.btnTxt}>■ Parar → marcar lo que dije</Text>
          </TouchableOpacity>
        </View>
      )}

      {(fase === 'checklist' || fase === 'resultado') && (
        <View>
          {FASES.map((f) => (
            <View key={f} style={st.grupo}>
              <Text style={st.grupoLbl}>{FASE_LABEL[f]}</Text>
              {pasos.filter((p) => p.fase === f).map((p) => {
                const on = recitados.has(p.k);
                const falta = fase === 'resultado' && !on;
                return (
                  <TouchableOpacity key={p.k} activeOpacity={0.8} onPress={() => fase === 'checklist' && toggle(p.k)} style={[st.item, falta && p.verificado && { borderLeftColor: DermaAtlas.crit }, on && { borderLeftColor: DermaAtlas.jade }, fase === 'checklist' && Platform.OS === 'web' ? WEB : null]}>
                    <Text style={[st.chk, { color: on ? DermaAtlas.jade : falta ? DermaAtlas.crit : 'rgba(255,255,255,0.3)' }]}>{on ? '☑' : '☐'}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={[st.itemT, on && { color: Colors.onSurface }]}>{p.t}</Text>
                      <Text style={st.itemD}>{p.detalle}</Text>
                      <Text style={[st.itemF, { color: p.verificado ? DermaAtlas.jade : DermaAtlas.alta }]}>{p.verificado ? '✓ verificado · ' : '⚠ '}{p.fuente}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
          {fase === 'checklist' && (
            <TouchableOpacity activeOpacity={0.85} onPress={evaluar} style={[st.btn, { backgroundColor: accent }, Platform.OS === 'web' ? WEB : null]}>
              <Text style={st.btnTxt}>Evaluar · {recitados.size}/{pasos.length} · {mmss(seg)}</Text>
            </TouchableOpacity>
          )}
          {fase === 'resultado' && (
            <View style={[st.res, { borderColor: (res.acierto ? DermaAtlas.jade : DermaAtlas.crit) + '88' }]}>
              <Text style={[st.resT, { color: res.acierto ? DermaAtlas.jade : DermaAtlas.crit }]}>{res.acierto ? 'ACIERTO' : 'FALLO'} · {res.pct} % · {mmss(seg)} {res.aTiempo ? '(a tiempo)' : `(> ${LIMITE} s)`}</Text>
              {res.faltanVerificados.length > 0 ? <Text style={st.resSub}>Ítems VERIFICADOS que faltaron ({res.faltanVerificados.length}): {res.faltanVerificados.map((p) => p.k).join(', ')} → tarjeta de MECANISMO hoy.</Text> : null}
              {res.faltan.length > res.faltanVerificados.length ? <Text style={st.resSub}>Pendientes no verificados omitidos: {res.faltan.filter((p) => !p.verificado).map((p) => p.k).join(', ')} (no penalizan; A VERIFICAR antes de fijar la cifra en Anki).</Text> : null}
              <View style={st.row}>
                {!guardado ? (
                  <TouchableOpacity activeOpacity={0.85} onPress={guardar} style={[st.btn, { backgroundColor: res.acierto ? DermaAtlas.jade : DermaAtlas.crit, marginTop: 0 }, Platform.OS === 'web' ? WEB : null]}>
                    <Text style={st.btnTxt}>Guardar resultado en el ledger</Text>
                  </TouchableOpacity>
                ) : <Text style={st.hint}>{guardado}</Text>}
                <TouchableOpacity activeOpacity={0.8} onPress={start} style={Platform.OS === 'web' ? WEB : null}><Text style={st.redo}>↻ repetir</Text></TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}

      {historial.length > 0 && (
        <View style={st.hist}>
          <Text style={st.grupoLbl}>Últimos drills</Text>
          {historial.map((h) => <Text key={h.uid} style={st.histTxt}>{h.fecha}{h.d ? ` · d${h.d}` : ''} · {h.acierto ? '✓' : '✗'} {h.nota || ''}</Text>)}
        </View>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  card: { backgroundColor: 'rgba(197,106,90,0.06)', borderRadius: BorderRadius.lg, borderWidth: 1, padding: Spacing.md, marginTop: Spacing.sm },
  head: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: Spacing.sm },
  title: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  sub: { fontSize: 9, color: Colors.muted, marginTop: 2, lineHeight: 12 },
  timer: { fontSize: 22, fontWeight: '900', letterSpacing: -0.5, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },
  btn: { marginTop: Spacing.sm, paddingVertical: 9, paddingHorizontal: 14, borderRadius: BorderRadius.md, alignSelf: 'flex-start' },
  btnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', color: '#1A1031', letterSpacing: 0.2 },
  hint: { fontSize: 9, color: Colors.muted, fontStyle: 'italic', lineHeight: 12, marginTop: 4 },
  faseRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: Spacing.sm },
  faseChip: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 10 },
  faseTxt: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, fontWeight: '700' },
  grupo: { marginTop: Spacing.sm },
  grupoLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 4 },
  item: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, borderLeftWidth: 2, borderLeftColor: 'rgba(231,234,242,0.10)', paddingLeft: 8, paddingVertical: 5 },
  chk: { fontSize: 15, width: 18, textAlign: 'center', marginTop: 1 },
  itemT: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, fontWeight: '700', lineHeight: 15 },
  itemD: { fontSize: 9, color: Colors.muted, marginTop: 2, lineHeight: 12 },
  itemF: { fontSize: 9, fontWeight: '700', marginTop: 2 },
  res: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.sm, marginTop: Spacing.sm, backgroundColor: 'rgba(255,255,255,0.02)' },
  resT: { fontSize: FontSize.labelLg, fontWeight: '900', letterSpacing: -0.2 },
  resSub: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 5, lineHeight: 15 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: Spacing.sm, flexWrap: 'wrap' },
  redo: { fontSize: FontSize.labelSm, color: DermaAtlas.amethyst, fontWeight: '700' },
  hist: { marginTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Hairline.soft, paddingTop: 8 },
  histTxt: { fontSize: 9, color: Colors.muted, lineHeight: 13 },
});
