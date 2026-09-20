import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { preguntaPorId, preguntasSinUsar, preguntasSinUsarDeAsignatura, MirPreguntaOficial } from '../../lib/mirPreguntasOficiales';
import { mirEvalLogAppend, mirEvalLogLoad, mirNeto, MIR_TIPO_ERROR, MirTipoError, MirEvalKind } from '../../lib/mirEvalLog';

/**
 * MirPoolEval — piezas compartidas del pool oficial MIR (19-sep-2026, sistematización DATA/MIR/POOL_USO.md §2-§5):
 *  · `poolConFallback`: ids de un capítulo sin usar y, si faltan, de su asignatura (regla §3 Tier C / §4 Derma).
 *  · `MirPreguntaVista`: enunciado + 4 opciones de `preguntaPorId(id)`; la clave definitiva se revela al tocar.
 *  · `MirPoolLista`: lista plegable de las preguntas servidas a un segmento (pedidas vs disponibles → fallback ProMIR).
 *  · `MirPoolEvalCompacta`: registro mínimo → mirEvalLog con `qIds` (lo usa el bloque Derma 13:30; MirTodayPlan usa su EvalForm).
 * La anti-repetición se cierra al guardar: los `qIds` de la entrada entran en `mirUsadasIds()` (local + espejo Supabase `q_ids`).
 */
const WEB_LINK = { cursor: 'pointer', transition: Motion.base } as any;

export interface PoolServido { ids: string[]; delCap: number; deAsig: number }
/** n ids sin usar del capítulo; si no llegan, se completan con la asignatura (num). `excl` = usadas + reservadas hoy. */
export function poolConFallback(capId: string | null | undefined, num: number, n: number, excl: Iterable<string>): PoolServido {
  const u = new Set(excl);
  const cap: MirPreguntaOficial[] = capId ? preguntasSinUsar(capId, u).slice(0, n) : [];
  const ids = cap.map((q) => q.id);
  const capSet = new Set(ids);
  const asig = ids.length < n ? preguntasSinUsarDeAsignatura(num, u).filter((q) => !capSet.has(q.id)).slice(0, n - ids.length) : [];
  return { ids: ids.concat(asig.map((q) => q.id)), delCap: ids.length, deAsig: asig.length };
}

/** Vista de una pregunta oficial servida por id (texto oficial sin corregir + clave de la plantilla DEFINITIVA). */
export function MirPreguntaVista({ id, i, color }: { id: string; i: number; color: string }) {
  const q = preguntaPorId(id);
  const [ver, setVer] = useState(false);
  if (!q) return <Text style={st.hint}>#{i + 1} · {id} · no está en el pool actual (regenerar mirPreguntasOficiales.ts con gen_mir_pool.js --emit)</Text>;
  return (
    <View style={[st.q, { borderLeftColor: color }]}>
      <Text style={st.qHead}>#{i + 1} · MIR {q.anio} · P{q.numero}{q.reserva ? ' (reserva)' : ''} · {q.asignatura}{q.capitulo ? ` › ${q.capitulo}` : ''}{q.imagen ? ` · 🖼 imagen ${q.imagenNum || ''} (cuaderno)` : ''}{q.confianza !== 'alta' ? ` · confianza ${q.confianza}` : ''}</Text>
      <Text style={st.qTxt}>{q.enunciado}</Text>
      {q.opciones.map((o, k) => (
        <Text key={k} style={[st.qOpt, ver && q.clave === k + 1 ? { color, fontWeight: '800' } : null]}>{k + 1}. {o}{ver && q.clave === k + 1 ? '  ✓ clave' : ''}</Text>
      ))}
      <View style={st.row}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => setVer((v) => !v)} style={[st.btn, { borderColor: color + '88' }]}><Text style={[st.btnTxt, { color }]}>{ver ? 'ocultar clave' : 'ver clave'}</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={() => Linking.openURL(q.url).catch(() => {})} style={[st.btn, { borderColor: Colors.muted + '88' }]}><Text style={[st.btnTxt, { color: Colors.muted }]}>cuaderno oficial ↗</Text></TouchableOpacity>
      </View>
      {ver && q.nota ? <Text style={st.hint}>nota: {q.nota}</Text> : null}
    </View>
  );
}

/** Lista plegable de las preguntas servidas a un segmento. `pedidas` = las que pide el segmento (si faltan → fallback ProMIR, nunca otro capítulo sin decirlo). */
export function MirPoolLista({ qIds, color, titulo, pedidas, fallback, abierto: abiertoIni = false }: { qIds: string[]; color: string; titulo?: string; pedidas?: number; fallback?: string; abierto?: boolean }) {
  const [abierto, setAbierto] = useState(abiertoIni);
  const faltan = pedidas != null ? Math.max(0, pedidas - qIds.length) : 0;
  const fb = fallback || 'test del capítulo ProMIR';
  return (
    <View style={[st.card, { borderColor: color + '44' }]}>
      <TouchableOpacity activeOpacity={0.85} onPress={() => setAbierto((v) => !v)} style={st.head}>
        <Text style={[st.headTxt, { color }]}>{abierto ? '▾' : '▸'} {titulo || 'Pool oficial MIR'} · {qIds.length} Q{pedidas != null ? ` de ${pedidas}` : ''}{faltan ? ` · faltan ${faltan} → ${fb}` : ''}</Text>
      </TouchableOpacity>
      {abierto && (qIds.length ? qIds.map((id, i) => <MirPreguntaVista key={id} id={id} i={i} color={color} />) : <Text style={st.hint}>Sin preguntas oficiales sin usar para este segmento → {fb}.</Text>)}
    </View>
  );
}

/**
 * Registro compacto → mirEvalLog con `qIds` (append-only + espejo Supabase). Para segmentos fuera de MirTodayPlan
 * (bloque Derma 13:30, kind 'derma10Q'). `total` puede ser mayor que `qIds.length` (el resto se hizo en ProMIR).
 */
export function MirPoolEvalCompacta({ fecha, d, tema, asignatura, num, capId, kind, qIds, total, color, titulo, nota, onSaved }: {
  fecha: string; d: number; tema: string; asignatura: string; num?: number; capId?: string; kind: MirEvalKind; qIds: string[]; total: number;
  color: string; titulo: string; nota?: string; onSaved?: () => void;
}) {
  const [aciertos, setAciertos] = useState<number>(total);
  const [blancos, setBlancos] = useState<number>(0);
  const [tipo, setTipo] = useState<MirTipoError | null>(null);
  const [deltaEs, setDeltaEs] = useState(false);
  const [msg, setMsg] = useState('');
  const [tick, setTick] = useState(0);
  const previa = useMemo(() => mirEvalLogLoad().filter((e) => e.fecha === fecha && e.kind === kind && e.d === d).sort((a, b) => (b.ts || '').localeCompare(a.ts || ''))[0], [fecha, kind, d, tick]);
  const fallos = Math.max(0, total - aciertos - blancos);
  const r = mirNeto(aciertos, total, blancos);
  const guardar = () => {
    if (fallos > 0 && !tipo) { setMsg('Marca la brecha del fallo (knowledge / transfer / proceso).'); return; }
    const res = mirEvalLogAppend({
      fecha, d, tema, asignatura, num, capId, aciertos, total, blancos, tiempoSeg: 0,
      tipoError: fallos > 0 ? tipo : null, delta_es: deltaEs, kind, qIds: qIds.length ? qIds : undefined, nota,
    });
    setMsg(res.guardado ? `✓ registrado · neto ${r.neto}/${total} (${r.netoPct} %) · ${qIds.length} ids del pool marcadas como usadas · espejo Supabase en segundo plano` : '⚠ sin storage en este dispositivo: no se guardó');
    setTick((t) => t + 1);
    if (onSaved) onSaved();
  };
  const nums = Array.from({ length: total + 1 }, (_, k) => k);
  return (
    <View style={[st.card, { borderColor: color + '55' }]}>
      <Text style={[st.headTxt, { color }]}>{titulo}</Text>
      {previa && <Text style={st.prev}>✓ ya registrado hoy: {previa.aciertos}/{previa.total} · blancos {previa.blancos} · neto {mirNeto(previa.aciertos, previa.total, previa.blancos).netoPct} %{previa.qIds?.length ? ` · ${previa.qIds.length} ids usadas` : ''} (append-only: un nuevo guardado añade otra entrada)</Text>}
      {qIds.length > 0 && <Text style={st.hint}>pool oficial · ids que se marcarán como usadas: {qIds.join(', ')}</Text>}
      <Text style={st.lbl}>Aciertos</Text>
      <View style={st.row}>{nums.map((n) => (
        <TouchableOpacity key={n} activeOpacity={0.8} onPress={() => { setAciertos(n); if (blancos > total - n) setBlancos(total - n); }} style={[st.chip, aciertos === n ? { borderColor: color, backgroundColor: color + '22' } : null]}><Text style={[st.chipTxt, aciertos === n ? { color } : null]}>{n}</Text></TouchableOpacity>
      ))}</View>
      <Text style={st.lbl}>En blanco</Text>
      <View style={st.row}>{nums.filter((n) => n <= total - aciertos).map((n) => (
        <TouchableOpacity key={n} activeOpacity={0.8} onPress={() => setBlancos(n)} style={[st.chip, blancos === n ? { borderColor: color, backgroundColor: color + '22' } : null]}><Text style={[st.chipTxt, blancos === n ? { color } : null]}>{n}</Text></TouchableOpacity>
      ))}</View>
      <Text style={st.neto}>fallos {fallos} → neto = {aciertos} − {fallos}/3 = <Text style={{ color, fontWeight: '800' }}>{r.neto}</Text> ({r.netoPct} %)</Text>
      {fallos > 0 && (
        <>
          <Text style={st.lbl}>Brecha del fallo</Text>
          <View style={st.row}>{MIR_TIPO_ERROR.map((t) => (
            <TouchableOpacity key={t.k} activeOpacity={0.8} onPress={() => setTipo(t.k)} style={[st.chip, tipo === t.k ? { borderColor: color, backgroundColor: color + '22' } : null]}><Text style={[st.chipTxt, tipo === t.k ? { color } : null]}>{t.label}</Text></TouchableOpacity>
          ))}</View>
        </>
      )}
      <View style={st.row}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setDeltaEs((v) => !v)} style={[st.chip, deltaEs ? { borderColor: color, backgroundColor: color + '22' } : null]}><Text style={[st.chipTxt, deltaEs ? { color } : null]}>🇪🇸 delta-España</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={guardar} style={[st.save, { backgroundColor: color }]}><Text style={st.saveTxt}>Guardar en el log MIR</Text></TouchableOpacity>
      </View>
      {msg ? <Text style={st.hint}>{msg}</Text> : null}
    </View>
  );
}

const st = StyleSheet.create({
  card: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, ...Elevation.sm, padding: Spacing.md, marginBottom: Spacing.sm, marginTop: 4 },
  head: { paddingVertical: 2, ...WEB_LINK },
  headTxt: { fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: -0.2, marginBottom: 4 },
  q: { borderLeftWidth: 3, paddingLeft: 10, paddingVertical: 6, marginTop: 8 },
  qHead: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4 },
  qTxt: { fontSize: FontSize.bodyMd, color: Colors.onSurface, lineHeight: LineHeight.bodyMd, marginBottom: 6 },
  qOpt: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, lineHeight: LineHeight.labelSm, marginBottom: 2 },
  row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginVertical: 4 },
  btn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center', ...WEB_LINK },
  btnTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  chip: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 10, backgroundColor: 'rgba(255,255,255,0.03)', ...WEB_LINK },
  chipTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.muted, letterSpacing: 0.2 },
  lbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 6 },
  neto: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginVertical: 4 },
  prev: { fontSize: FontSize.labelSm, color: Colors.green, marginBottom: 6, lineHeight: LineHeight.labelSm },
  hint: { fontSize: FontSize.labelSm, color: Colors.muted, lineHeight: LineHeight.labelSm, marginTop: 2 },
  save: { borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 14, alignItems: 'center', ...WEB_LINK },
  saveTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: '#1A1205', letterSpacing: 0.2 },
});
