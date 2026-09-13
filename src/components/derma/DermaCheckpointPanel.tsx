import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Motion, LineHeight, Hairline } from '../../theme/tokens';
import { DermaAtlas } from '../../lib/dermaData';
import {
  type DiaDerma, type DermaCheckpointKey, cases, DERMA_CASOS_META, DERMA_CASO_META, DERMA_DAILY_META,
  DERMA_CHECKPOINT_DIAS_V3, DERMA_CHECKPOINTS, dermaCasosPostStep1,
} from '../../lib/dermaDailyPlan';
import { DERMA_CICLO2_META, DERMA_CICLO2_CHECKPOINTS } from '../../lib/dermaCiclo2';
import { dermaAreasFlojas, dermaPreguntasFalladas, dermaCasosParaSegundaPasada, dermaBancoCursores, DERMA_FUENTES, type DermaFuente } from '../../lib/dermaLedger';
import { dermaAnkiDeck } from '../../lib/ankiLinks';
import DermaWeaknessWidget from './DermaWeaknessWidget';
import DermaCasoRegistro from './DermaCasoRegistro';
import { useDermaLedger, DERMA_AREA_LABEL, DERMA_AREA_COLOR } from './dermaLedgerBus';

/**
 * DermaCheckpointPanel — los átomos que LEEN del ledger (su motor no es un caso nuevo). Desde la v3 (taper, 12-sep-2026)
 * NO se identifican por número fijo sino por el campo `dia.checkpoint` (DermaCheckpointKey): así sobreviven a cualquier
 * corrimiento y valen también para el ciclo 2 (dermaCiclo2.ts).
 *  cp1     · Checkpoint 1 (ciclo 1 d51 · ciclo 2 d85) · mapa de fallos por módulo CORE → qué re-drillear en FSRS
 *  cp2     · Checkpoint 2 (d52 · d94) · re-drill de fallos etiquetados + pares del DD Challenge de las áreas flojas (+ drill HDPH)
 *  repaso1 · Repaso 1 (d72) · 2ª pasada FSRS SOLO de casos/preguntas fallados (registro de nuevo → si 'conocimiento', sale de la lista)
 *  repaso2 · Repaso 2 (d73 · d103) · mapa final + export JSON + plan del ciclo siguiente (36 casos a 3/sesión en d74-d85 · fase práctica tras d103)
 * Los d reales viven en DERMA_CHECKPOINTS (ciclo 1) y DERMA_CICLO2_CHECKPOINTS (ciclo 2).
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;
/** Compat: d del ciclo 1 con checkpoint, derivados del contenido (ya no la lista fija [45,46,69,70] de la v2.1). */
export const DERMA_CHECKPOINT_DIAS = DERMA_CHECKPOINT_DIAS_V3;
const DD_CHALLENGE = cases(1616);
const open = (u: string) => Linking.openURL(u).catch(() => {});
const TITULO: Record<DermaCheckpointKey, string> = {
  cp1: 'CHECKPOINT 1 · mapa de fallos → qué re-drillear',
  cp2: 'CHECKPOINT 2 · re-drill de fallos etiquetados',
  repaso1: 'REPASO 1 · segunda pasada FSRS (solo fallos)',
  repaso2: 'REPASO 2 · mapa final + plan del ciclo siguiente',
};

export default function DermaCheckpointPanel({ dia, accent = DermaAtlas.amethyst }: { dia: DiaDerma; accent?: string }) {
  const { entries } = useDermaLedger();
  const [reg, setReg] = useState<number | null>(null);
  const flojas = useMemo(() => dermaAreasFlojas(entries), [entries]);
  const segunda = useMemo(() => dermaCasosParaSegundaPasada(entries), [entries]);
  const falladas = useMemo(() => dermaPreguntasFalladas(entries).filter((e) => e.fuente !== 'drill'), [entries]);
  const cursores = useMemo(() => dermaBancoCursores(entries).filter((c) => c.hechas > 0), [entries]);
  const porFuente = useMemo(() => {
    const m = new Map<DermaFuente, number>();
    for (const e of falladas) m.set(e.fuente, (m.get(e.fuente) || 0) + 1);
    return DERMA_FUENTES.filter((f) => m.has(f.k)).map((f) => ({ ...f, n: m.get(f.k) || 0 }));
  }, [falladas]);
  const key = dia.checkpoint;
  if (!key) return null;
  const esCiclo1 = dia.d <= DERMA_DAILY_META.totalDias;
  const post = dermaCasosPostStep1();
  const nCasos = dia.casoIds.length;
  const casosFila = nCasos > 0
    ? `${nCasos === 1 ? 'El caso' : `Los ${nCasos} casos`} de la fila (${dia.casoIds.map((id) => `#${id}`).join(', ')}) ${nCasos === 1 ? 'es' : 'son'} la variable de ajuste si sobra tiempo.`
    : 'Esta sesión no consume casos nuevos de la permutación.';

  return (
    <View style={[st.wrap, { borderColor: accent + '55' }]}>
      <Text style={[st.title, { color: accent }]}>{TITULO[key]}{esCiclo1 ? '' : ' · CICLO 2'}</Text>
      <Text style={st.sub}>Este átomo no trae caso nuevo: su motor es el ledger. {casosFila}</Text>

      {/* Áreas flojas (todas las vistas) */}
      <View style={st.flojasRow}>
        <Text style={st.lbl}>Áreas CORE más flojas (≥4 ítems):</Text>
        {flojas.length ? flojas.map((a) => (
          <View key={a} style={[st.areaChip, { borderColor: DERMA_AREA_COLOR[a] }]}><Text style={[st.areaTxt, { color: DERMA_AREA_COLOR[a] }]}>{DERMA_AREA_LABEL[a]}</Text></View>
        )) : <Text style={st.hint}>aún sin muestra suficiente (registra casos y preguntas)</Text>}
      </View>

      {key === 'cp1' && (
        <View>
          <DermaWeaknessWidget compact accent={accent} />
          <Text style={st.hint}>Plan de re-drill (para el checkpoint 2 y FSRS): por cada área floja → sus casos fallados (chips de arriba) + tarjeta de MECANISMO por fallo CONCEPTO + tabla comparativa por CCSN/DDX + re-descripción 8 ejes por MORFOLOGÍA. Deck: {dermaAnkiDeck('H')}.</Text>
          {cursores.length ? <Text style={st.hint}>Cursores de banco: {cursores.map((c) => `${c.t} → retoma en Q#${c.cursor} (${c.restantes} restantes)`).join(' · ')}.</Text> : null}
        </View>
      )}

      {key === 'cp2' && (
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
          {dia.drillHDPH ? <Text style={st.hint}>El drill de oclusión vascular 90 s está más abajo en esta misma sesión (resultado al ledger).</Text> : null}
        </View>
      )}

      {key === 'repaso1' && (
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

      {key === 'repaso2' && (
        <View>
          <DermaWeaknessWidget accent={accent} />
          {esCiclo1 ? (
            <View>
              <Text style={st.lbl}>Plan del CICLO 2 (d{DERMA_CICLO2_META.dOffset + 1}-d{DERMA_CICLO2_META.dOffset + DERMA_CICLO2_META.totalDias} · {DERMA_CICLO2_META.inicio} → {DERMA_CICLO2_META.fin})</Text>
              <Text style={st.body}>{post.length} casos restantes de la permutación (Med {post.filter((c) => c.area === 'Med').length} · Path {post.filter((c) => c.area === 'Path').length} · Peds {post.filter((c) => c.area === 'Peds').length} · Surg {post.filter((c) => c.area === 'Surg').length}) a {DERMA_CASO_META.porSesion.postStep1}/sesión = {DERMA_CICLO2_META.sesionesConCasos} sesiones (d{DERMA_CICLO2_META.dOffset + 1}-d{DERMA_CICLO2_META.dOffset + DERMA_CICLO2_META.sesionesConCasos}) → primera pasada de los 200 completa; después SOLO segunda pasada FSRS de los {segunda.length} pendientes + 1 módulo G+ por semana en el slot de lectura. Checkpoints del ciclo 2: cp1 d{DERMA_CICLO2_CHECKPOINTS.cp1} · cp2 d{DERMA_CICLO2_CHECKPOINTS.cp2} · repaso final d{DERMA_CICLO2_CHECKPOINTS.repaso2}.</Text>
            </View>
          ) : (
            <View>
              <Text style={st.lbl}>Cierre del CICLO 2 · primera pasada de los 200 casos completa</Text>
              <Text style={st.body}>Quedan {segunda.length} casos pendientes de 2ª pasada (fallados o por suerte). Siguiente etapa = fase práctica 2027: dermatoscopio, protocolos NÍTIDA (DATA/DERMATOLOGIA/NITIDA_PROTOCOLOS.md) y la ruta al fellowship (DATA/DERMATOLOGIA/RUTA_FELLOWSHIP_ESTETICO.md).</Text>
            </View>
          )}
          <Text style={st.hint}>Exporta el JSON y pégalo en DATA/DERMATOLOGIA/TRACKING/_registro_derma.json → rondas[] (append).{dia.drillHDPH ? ' El drill HDPH final está más abajo.' : ''} Checkpoints del ciclo 1: cp1 d{DERMA_CHECKPOINTS.cp1} · cp2 d{DERMA_CHECKPOINTS.cp2} · repaso1 d{DERMA_CHECKPOINTS.repaso1} · repaso2 d{DERMA_CHECKPOINTS.repaso2}.</Text>
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
