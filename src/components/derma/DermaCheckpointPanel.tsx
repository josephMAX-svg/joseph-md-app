import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Motion, LineHeight, Hairline } from '../../theme/tokens';
import { DermaAtlas } from '../../lib/dermaData';
import { type DiaDerma, cases, DERMA_CASOS_META, dermaCasosPostStep1 } from '../../lib/dermaDailyPlan';
import { dermaAreasFlojas, dermaPreguntasFalladas, dermaCasosParaSegundaPasada, DERMA_FUENTES, type DermaFuente } from '../../lib/dermaLedger';
import { dermaAnkiDeck } from '../../lib/ankiLinks';
import DermaWeaknessWidget from './DermaWeaknessWidget';
import DermaCasoRegistro from './DermaCasoRegistro';
import { useDermaLedger, DERMA_AREA_LABEL, DERMA_AREA_COLOR } from './dermaLedgerBus';

/**
 * DermaCheckpointPanel — los 4 átomos que LEEN del ledger (no tienen caso nuevo como motor):
 *  d45 Checkpoint 1 · mapa de fallos por módulo CORE → qué re-drillear en FSRS
 *  d46 Checkpoint 2 · re-drill de fallos etiquetados + pares del DD Challenge de las áreas flojas (+ drill HDPH)
 *  d69 Repaso 1     · 2ª pasada FSRS SOLO de casos/preguntas fallados (registro de nuevo → si 'conocimiento', sale de la lista)
 *  d70 Repaso 2     · mapa final + export JSON + plan post-Step 1 (60 casos restantes a 5/sesión)
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;
export const DERMA_CHECKPOINT_DIAS = [45, 46, 69, 70];
const DD_CHALLENGE = cases(1616);
const open = (u: string) => Linking.openURL(u).catch(() => {});

export default function DermaCheckpointPanel({ dia, accent = DermaAtlas.amethyst }: { dia: DiaDerma; accent?: string }) {
  const { entries } = useDermaLedger();
  const [reg, setReg] = useState<number | null>(null);
  const flojas = useMemo(() => dermaAreasFlojas(entries), [entries]);
  const segunda = useMemo(() => dermaCasosParaSegundaPasada(entries), [entries]);
  const falladas = useMemo(() => dermaPreguntasFalladas(entries).filter((e) => e.fuente !== 'drill'), [entries]);
  const porFuente = useMemo(() => {
    const m = new Map<DermaFuente, number>();
    for (const e of falladas) m.set(e.fuente, (m.get(e.fuente) || 0) + 1);
    return DERMA_FUENTES.filter((f) => m.has(f.k)).map((f) => ({ ...f, n: m.get(f.k) || 0 }));
  }, [falladas]);
  if (!DERMA_CHECKPOINT_DIAS.includes(dia.d)) return null;
  const post = dermaCasosPostStep1();

  return (
    <View style={[st.wrap, { borderColor: accent + '55' }]}>
      <Text style={[st.title, { color: accent }]}>{dia.d === 45 ? 'CHECKPOINT 1 · mapa de fallos → qué re-drillear' : dia.d === 46 ? 'CHECKPOINT 2 · re-drill de fallos etiquetados' : dia.d === 69 ? 'REPASO 1 · segunda pasada FSRS (solo fallos)' : 'REPASO 2 · mapa final + plan post-Step 1'}</Text>
      <Text style={st.sub}>Este átomo no trae caso nuevo: su motor es el ledger. Los 2 casos de la fila (#{dia.casoIds[0]}, #{dia.casoIds[1]}) son la variable de ajuste si sobra tiempo.</Text>

      {/* Áreas flojas (todas las vistas) */}
      <View style={st.flojasRow}>
        <Text style={st.lbl}>Áreas CORE más flojas (≥4 ítems):</Text>
        {flojas.length ? flojas.map((a) => (
          <View key={a} style={[st.areaChip, { borderColor: DERMA_AREA_COLOR[a] }]}><Text style={[st.areaTxt, { color: DERMA_AREA_COLOR[a] }]}>{DERMA_AREA_LABEL[a]}</Text></View>
        )) : <Text style={st.hint}>aún sin muestra suficiente (registra casos y preguntas)</Text>}
      </View>

      {dia.d === 45 && (
        <View>
          <DermaWeaknessWidget compact accent={accent} />
          <Text style={st.hint}>Plan de re-drill (para d46 y FSRS): por cada área floja → sus casos fallados (chips de arriba) + tarjeta de MECANISMO por fallo CONCEPTO + tabla comparativa por CCSN/DDX + re-descripción 8 ejes por MORFOLOGÍA. Deck: {dermaAnkiDeck('H')}.</Text>
        </View>
      )}

      {dia.d === 46 && (
        <View>
          <Text style={st.lbl}>Preguntas de banco falladas / por suerte · {falladas.length}</Text>
          {porFuente.length ? porFuente.map((f) => (
            <View key={f.k} style={st.row}><Text style={st.rowT}>{f.label}</Text><Text style={[st.rowN, { color: DermaAtlas.crit }]}>{f.n}</Text></View>
          )) : <Text style={st.hint}>sin preguntas de banco registradas como fallo</Text>}
          <Text style={st.lbl}>Casos para re-hacer hoy (peor módulo primero) · {segunda.length}</Text>
          <View style={st.casosRow}>
            {segunda.slice(0, 24).map((c) => (
              <TouchableOpacity key={c.id} activeOpacity={0.8} onPress={() => open(cases(DERMA_CASOS_META.groupid))} style={[st.casoChip, { borderColor: DERMA_AREA_COLOR[c.area] + '66' }, Platform.OS === 'web' ? WEB : null]}>
                <Text style={[st.casoTxt, { color: DERMA_AREA_COLOR[c.area] }]}>#{c.id} {c.area}{c.tipoError ? ` · ${c.tipoError}` : ''}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity activeOpacity={0.85} onPress={() => open(DD_CHALLENGE)} style={[st.btn, { borderColor: accent }, Platform.OS === 'web' ? WEB : null]}>
            <Text style={[st.btnTxt, { color: accent }]}>Differential Diagnosis Challenge · pares de {flojas.length ? flojas.map((a) => DERMA_AREA_LABEL[a]).join(' + ') : 'tus áreas flojas'} ↗</Text>
          </TouchableOpacity>
          <Text style={st.hint}>El drill de oclusión vascular 90 s está más abajo en esta misma sesión (resultado al ledger).</Text>
        </View>
      )}

      {dia.d === 69 && (
        <View>
          <Text style={st.lbl}>Casos de la 2ª pasada (fallados o acertados por suerte; salen al registrarlos con "Lo sabía") · {segunda.length}</Text>
          {segunda.length ? segunda.map((c) => (
            <View key={c.id}>
              <View style={st.row}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => open(cases(DERMA_CASOS_META.groupid))} style={[{ flex: 1 }, Platform.OS === 'web' ? WEB : null]}>
                  <Text style={st.rowT}>#{c.id} · {DERMA_AREA_LABEL[c.area]}{c.d ? ` · d${c.d}` : ''} · {c.veces}× · último {c.ultimaFecha}{c.tipoError ? ` · ${c.tipoError}` : ''} ↗</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.85} onPress={() => setReg(reg === c.id ? null : c.id)} style={[st.miniBtn, { borderColor: DERMA_AREA_COLOR[c.area] }, Platform.OS === 'web' ? WEB : null]}>
                  <Text style={[st.miniBtnTxt, { color: DERMA_AREA_COLOR[c.area] }]}>{reg === c.id ? 'cerrar' : 'registrar de nuevo'}</Text>
                </TouchableOpacity>
              </View>
              {reg === c.id ? <DermaCasoRegistro dia={dia} id={c.id} segundaPasada accent={DERMA_AREA_COLOR[c.area]} titulo={`2ª pasada · caso #${c.id}`} onDone={() => setReg(null)} onCancel={() => setReg(null)} /> : null}
            </View>
          )) : <Text style={st.hint}>la lista está vacía: o no hubo fallos registrados o ya se re-hicieron todos con "Lo sabía"</Text>}
        </View>
      )}

      {dia.d === 70 && (
        <View>
          <DermaWeaknessWidget accent={accent} />
          <Text style={st.lbl}>Plan del ciclo siguiente (post-Step 1, feb-2027)</Text>
          <Text style={st.body}>{post.length} casos restantes de la permutación (Med {post.filter((c) => c.area === 'Med').length} · Path {post.filter((c) => c.area === 'Path').length} · Peds {post.filter((c) => c.area === 'Peds').length} · Surg {post.filter((c) => c.area === 'Surg').length}) a 5/sesión = {Math.ceil(post.length / 5)} sesiones + 2ª pasada de los {segunda.length} pendientes.</Text>
          <Text style={st.hint}>Exporta el JSON y pégalo en DATA/DERMATOLOGIA/TRACKING/_registro_derma.json → rondas[] (append). El drill HDPH final está más abajo.</Text>
        </View>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  wrap: { borderWidth: 1, borderRadius: BorderRadius.lg, padding: Spacing.md, marginTop: Spacing.sm, backgroundColor: 'rgba(154,123,200,0.05)' },
  title: { fontSize: FontSize.labelLg, fontWeight: '900', letterSpacing: 0.2 },
  sub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, lineHeight: LineHeight.labelSm, marginBottom: Spacing.sm },
  flojasRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginBottom: Spacing.sm },
  lbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, textTransform: 'uppercase', marginTop: Spacing.sm, marginBottom: 6 },
  areaChip: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 3, paddingHorizontal: 9 },
  areaTxt: { fontSize: FontSize.labelSm, fontWeight: '800' },
  hint: { fontSize: 9, color: Colors.muted, fontStyle: 'italic', lineHeight: 12, marginTop: 6 },
  body: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 18 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6, borderTopWidth: 1, borderTopColor: Hairline.soft },
  rowT: { flex: 1, fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant },
  rowN: { fontSize: FontSize.labelMd, fontWeight: '900' },
  casosRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  casoChip: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 3, paddingHorizontal: 8, backgroundColor: 'rgba(255,255,255,0.02)' },
  casoTxt: { fontSize: 9, fontWeight: '800' },
  btn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 12, marginTop: Spacing.sm, alignSelf: 'flex-start' },
  btnTxt: { fontSize: FontSize.labelSm, fontWeight: '800' },
  miniBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 8 },
  miniBtnTxt: { fontSize: 9, fontWeight: '800' },
});
