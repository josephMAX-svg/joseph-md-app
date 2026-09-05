import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Motion, LineHeight, Hairline } from '../../theme/tokens';
import { DermaAtlas } from '../../lib/dermaData';
import { type DiaDerma, dermaCasoArea, type DermaAreaCORE } from '../../lib/dermaDailyPlan';
import {
  dermaLedgerAppend, DERMA_EVAL_ACIERTO, DERMA_TIPO_ERROR, DERMA_AREAS, DERMA_MODULO_POR_BLOQUE,
  type DermaEvalAcierto, type DermaTipoError, type DermaFuente,
} from '../../lib/dermaLedger';
import { notifyDermaLedger, dermaHoyISO, DERMA_AREA_LABEL, DERMA_AREA_COLOR } from './dermaLedgerBus';
import { dermaDictadoScore } from './dermaDictadoDraft';

/**
 * DermaCasoRegistro — el ÚNICO formulario que escribe un caso/pregunta en el ledger (dermaLedger.ts).
 * Lo abren la lámina (botones ✓/✗ por caso), el dictado morfológico (tras la autoevaluación 0-8) y la
 * 2ª pasada del d69. Campos = esquema del ledger: matriz Palmerton confianza×acierto → tipo de error
 * (solo fallos) → módulo CORE (los casos lo derivan del id; en preguntas de banco es editable) →
 * descripción 8 ejes (pre-rellena desde el borrador del dictado) → nota. Una entrada por guardado.
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;

export interface DermaCasoRegistroProps {
  dia: DiaDerma;
  /** id del caso (1-200) · nº de pregunta del banco · 0 si no hay id */
  id: number;
  fuente?: DermaFuente;             // por defecto 'caso'
  acierto?: boolean;                // pre-selección (✓ / ✗)
  accent?: string;
  titulo?: string;
  segundaPasada?: boolean;          // d69: se anota en la nota
  onDone?: () => void;
  onCancel?: () => void;
}

export default function DermaCasoRegistro({ dia, id, fuente = 'caso', acierto, accent = DermaAtlas.amethyst, titulo, segundaPasada, onDone, onCancel }: DermaCasoRegistroProps) {
  const esCaso = fuente === 'caso' && id >= 1 && id <= 200;
  const moduloFijo: DermaAreaCORE | null = esCaso ? dermaCasoArea(id) : null;
  const [evalAcierto, setEvalAcierto] = useState<DermaEvalAcierto>(acierto === false ? 'no-sabia' : 'conocimiento');
  const [tipoError, setTipoError] = useState<DermaTipoError>('CONCEPTO');
  const [modulo, setModulo] = useState<DermaAreaCORE>(moduloFijo || DERMA_MODULO_POR_BLOQUE[dia.bKey]);
  const [score, setScore] = useState<number | undefined>(() => (esCaso ? dermaDictadoScore(id) : undefined));
  const [nota, setNota] = useState('');
  const [msg, setMsg] = useState('');

  const esAcierto = evalAcierto === 'conocimiento' || evalAcierto === 'suerte';

  const guardar = () => {
    const r = dermaLedgerAppend({
      id, fecha: dermaHoyISO(), d: dia.d, bKey: dia.bKey, fuente,
      acierto: esAcierto, evalAcierto, tipoError: esAcierto ? null : tipoError,
      moduloCORE: modulo, descripcion8ejes: score,
      nota: [segundaPasada ? '2ª pasada FSRS (d69)' : '', nota.trim()].filter(Boolean).join(' · ') || undefined,
    });
    notifyDermaLedger();
    setMsg(r.guardado ? `✓ guardado en el ledger (${r.entry.moduloCORE} · ${r.entry.evalAcierto}${r.entry.tipoError ? ' · ' + r.entry.tipoError : ''})` : '⚠ sin localStorage: no se pudo guardar (SSR/nativo)');
    if (r.guardado && onDone) setTimeout(onDone, 350);
  };

  return (
    <View style={[st.card, { borderColor: accent + '55' }]}>
      <View style={st.head}>
        <Text style={[st.title, { color: accent }]}>{titulo || (esCaso ? `Registrar caso #${id}` : `Registrar ${fuente}${id ? ' #' + id : ''}`)}</Text>
        {moduloFijo ? (
          <View style={[st.lock, { borderColor: DERMA_AREA_COLOR[moduloFijo] + '66' }]}>
            <Text style={[st.lockTxt, { color: DERMA_AREA_COLOR[moduloFijo] }]}>{DERMA_AREA_LABEL[moduloFijo]} · por id</Text>
          </View>
        ) : null}
      </View>

      {/* Matriz Palmerton confianza × acierto */}
      <Text style={st.lbl}>¿Cómo fue el diagnóstico (antes de la discusión)?</Text>
      <View style={st.row}>
        {DERMA_EVAL_ACIERTO.map((e) => {
          const on = evalAcierto === e.k;
          const c = e.acierto ? DermaAtlas.jade : DermaAtlas.crit;
          return (
            <TouchableOpacity key={e.k} activeOpacity={0.85} onPress={() => setEvalAcierto(e.k)} style={[st.chip, on && { borderColor: c, backgroundColor: c + '22' }, Platform.OS === 'web' ? WEB : null]}>
              <Text style={[st.chipTxt, on && { color: c }]}>{e.acierto ? '✓' : '✗'} {e.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={st.hint}>{DERMA_EVAL_ACIERTO.find((e) => e.k === evalAcierto)?.desc}</Text>

      {/* Tipo de error (solo fallos) */}
      {!esAcierto && (
        <>
          <Text style={st.lbl}>Tipo de error → cura</Text>
          <View style={st.row}>
            {DERMA_TIPO_ERROR.map((t) => {
              const on = tipoError === t.k;
              return (
                <TouchableOpacity key={t.k} activeOpacity={0.85} onPress={() => setTipoError(t.k)} style={[st.chip, on && { borderColor: DermaAtlas.crit, backgroundColor: DermaAtlas.crit + '22' }, Platform.OS === 'web' ? WEB : null]}>
                  <Text style={[st.chipTxt, on && { color: DermaAtlas.crit }]}>{t.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={st.hint}>cura: {DERMA_TIPO_ERROR.find((t) => t.k === tipoError)?.cura}</Text>
        </>
      )}

      {/* Módulo CORE (editable solo en preguntas de banco) */}
      {!moduloFijo && (
        <>
          <Text style={st.lbl}>Módulo CORE</Text>
          <View style={st.row}>
            {DERMA_AREAS.map((a) => {
              const on = modulo === a; const c = DERMA_AREA_COLOR[a];
              return (
                <TouchableOpacity key={a} activeOpacity={0.85} onPress={() => setModulo(a)} style={[st.chip, on && { borderColor: c, backgroundColor: c + '22' }, Platform.OS === 'web' ? WEB : null]}>
                  <Text style={[st.chipTxt, on && { color: c }]}>{DERMA_AREA_LABEL[a]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}

      {/* Descripción morfológica 0-8 (paso ①) */}
      {(esCaso || fuente === 'dermatoscopia') && (
        <>
          <Text style={st.lbl}>Descripción en 8 ejes (paso ①) · autoevaluación</Text>
          <View style={[st.row, { alignItems: 'center' }]}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setScore((s) => Math.max(0, (s ?? 0) - 1))} style={[st.step, Platform.OS === 'web' ? WEB : null]}><Text style={st.stepTxt}>−</Text></TouchableOpacity>
            <Text style={[st.scoreTxt, { color: score == null ? Colors.muted : score >= 6 ? DermaAtlas.jade : DermaAtlas.alta }]}>{score == null ? '— / 8' : `${score} / 8`}</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setScore((s) => Math.min(8, (s ?? 0) + 1))} style={[st.step, Platform.OS === 'web' ? WEB : null]}><Text style={st.stepTxt}>+</Text></TouchableOpacity>
            {score != null && (
              <TouchableOpacity activeOpacity={0.8} onPress={() => setScore(undefined)} style={Platform.OS === 'web' ? WEB : null}><Text style={st.clear}>sin puntuar</Text></TouchableOpacity>
            )}
          </View>
          <Text style={st.hint}>{score == null ? 'sin borrador del dictado: puntúa aquí o déjalo vacío (no cuenta para el gate A)' : score >= 6 ? 'cuenta para el gate del módulo A (≥6/8)' : 'por debajo del gate (≥6/8): re-describe con los 8 ejes'}</Text>
        </>
      )}

      <TextInput value={nota} onChangeText={setNota} placeholder="nota (dx, rasgo discriminador que fallaste, CCSN…)" placeholderTextColor={Colors.muted} style={st.input} />

      <View style={[st.row, { alignItems: 'center', marginTop: Spacing.sm }]}>
        <TouchableOpacity activeOpacity={0.85} onPress={guardar} style={[st.save, { backgroundColor: accent }, Platform.OS === 'web' ? WEB : null]}>
          <Text style={st.saveTxt}>Guardar en el ledger</Text>
        </TouchableOpacity>
        {onCancel ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onCancel} style={Platform.OS === 'web' ? WEB : null}><Text style={st.cancel}>cancelar</Text></TouchableOpacity>
        ) : null}
        {!!msg && <Text style={[st.hint, { flex: 1, marginTop: 0 }]}>{msg}</Text>}
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: BorderRadius.lg, padding: Spacing.md, backgroundColor: 'rgba(15,25,45,0.55)', marginTop: Spacing.sm },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, marginBottom: 4 },
  title: { fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: -0.1 },
  lock: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 8 },
  lockTxt: { fontSize: 9, fontWeight: '800', letterSpacing: 0.3 },
  lbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, textTransform: 'uppercase', marginTop: Spacing.sm, marginBottom: 6 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: 'rgba(231,234,242,0.12)', backgroundColor: 'rgba(255,255,255,0.03)' },
  chipTxt: { fontSize: FontSize.labelSm, color: Colors.muted, fontWeight: '700' },
  hint: { fontSize: 9, color: Colors.muted, marginTop: 5, lineHeight: 13, fontStyle: 'italic' },
  step: { width: 28, height: 28, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)' },
  stepTxt: { fontSize: 16, fontWeight: '800', color: Colors.onSurface },
  scoreTxt: { fontSize: FontSize.labelLg, fontWeight: '900', minWidth: 56, textAlign: 'center', ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },
  clear: { fontSize: 9, color: Colors.muted, textDecorationLine: 'underline' },
  input: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 9, color: Colors.onSurface, fontSize: FontSize.labelSm, backgroundColor: 'rgba(255,255,255,0.03)', marginTop: Spacing.sm },
  save: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: BorderRadius.md },
  saveTxt: { fontSize: FontSize.labelMd, fontWeight: '800', color: '#1A1031', letterSpacing: 0.2 },
  cancel: { fontSize: FontSize.labelSm, color: Colors.muted, fontWeight: '700' },
  lh: { lineHeight: LineHeight.labelSm },
});
