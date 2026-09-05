import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Motion, LineHeight, Hairline } from '../../theme/tokens';
import { DermaAtlas } from '../../lib/dermaData';
import { type DiaDerma, dermaCasoArea } from '../../lib/dermaDailyPlan';
import { DERMA_EJES_MORFOLOGIA, DERMA_GATE_MODULO_A, dermaGateModuloA, dermaCasoEstado } from '../../lib/dermaLedger';
import { OBS_DERMA_DICTADO_URL } from '../../lib/obsidianDermaMap';
import DermaLineIcon from './DermaLineIcons';
import DermaCasoRegistro from './DermaCasoRegistro';
import { useDermaLedger, dermaHoyISO, DERMA_AREA_LABEL, DERMA_AREA_COLOR } from './dermaLedgerBus';
import { dermaDictadoLoad, dermaDictadoSave, type DermaDictadoDraft } from './dermaDictadoDraft';

/**
 * DermaMorphologyDictation — PASO ① del caso ciego (Palmerton): describir la lámina en terminología
 * estándar ANTES de diagnosticar. Rúbrica de 8 ejes (lesión 1ª · 2ª · color · forma/borde ·
 * superficie/palpación · configuración · distribución · tamaño/número) con chips de vocabulario +
 * textarea de dictado; tras leer la discusión, autoevaluación 0-8 (qué ejes describiste bien).
 * Persistencia: borrador por caso (dermaDictadoDraft) + puntuación → ledger vía DermaCasoRegistro
 * (una sola entrada por caso; el 0-8 va en descripcion8ejes). Gate del módulo A (d1-d6):
 * 10 descripciones ≥6/8 antes de pasar a B (dermaGateModuloA).
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;
const OBS = '#A78BFA';
const TERMINOLOGY_URL = 'https://dermnetnz.org/topics/terminology';
const open = (u: string) => Linking.openURL(u).catch(() => {});

export default function DermaMorphologyDictation({ dia, accent = DermaAtlas.amethyst }: { dia: DiaDerma; accent?: string }) {
  const { entries } = useDermaLedger();
  const [idx, setIdx] = useState(0);
  const casoId = dia.casoIds[Math.min(idx, dia.casoIds.length - 1)];
  const area = dermaCasoArea(casoId);
  const [draft, setDraft] = useState<DermaDictadoDraft | undefined>(() => dermaDictadoLoad(casoId));
  const [texto, setTexto] = useState(draft?.texto || '');
  const [ejes, setEjes] = useState<Record<number, string[]>>(draft?.ejes || {});
  const [ejesOk, setEjesOk] = useState<Set<number>>(() => new Set(draft?.ejesOk || []));
  const [fase, setFase] = useState<'dictar' | 'evaluar'>(draft?.score != null ? 'evaluar' : 'dictar');
  const [openEje, setOpenEje] = useState<number | null>(1);
  const [registrar, setRegistrar] = useState(false);
  const [msg, setMsg] = useState('');

  // cambio de caso / de día → recargar borrador
  useEffect(() => {
    const d = dermaDictadoLoad(casoId);
    setDraft(d); setTexto(d?.texto || ''); setEjes(d?.ejes || {}); setEjesOk(new Set(d?.ejesOk || []));
    setFase(d?.score != null ? 'evaluar' : 'dictar'); setRegistrar(false); setMsg(''); setOpenEje(1);
  }, [casoId, dia.d]);
  useEffect(() => { setIdx(0); }, [dia.d]);

  const gate = useMemo(() => dermaGateModuloA(entries), [entries]);
  const estado = useMemo(() => dermaCasoEstado(casoId, entries), [casoId, entries]);
  const hoy = dermaHoyISO();
  const registradoHoy = !!estado && estado.fecha === hoy;
  const esModuloA = dia.bKey === 'A';
  const score = ejesOk.size;

  const toggleTermino = (n: number, term: string) => {
    setEjes((prev) => {
      const cur = prev[n] || [];
      const next = cur.includes(term) ? cur.filter((t) => t !== term) : [...cur, term];
      return { ...prev, [n]: next };
    });
    // el chip también alimenta el dictado libre (se puede editar después)
    setTexto((t) => (t.includes(term) ? t : (t.trim() ? `${t.trim()} · ${term}` : term)));
  };
  const guardarDictado = () => {
    const d = dermaDictadoSave(casoId, { d: dia.d, fecha: hoy, texto, ejes });
    setDraft(d); setMsg('✓ dictado guardado (borrador) → ahora ② diferencial de 3 y ③ viñeta; vuelve aquí tras la discusión');
    setFase('evaluar');
  };
  const toggleOk = (n: number) => setEjesOk((prev) => { const s = new Set(prev); if (s.has(n)) s.delete(n); else s.add(n); return s; });
  const guardarScore = () => {
    const d = dermaDictadoSave(casoId, { d: dia.d, fecha: hoy, texto, ejes, score, ejesOk: Array.from(ejesOk) });
    setDraft(d);
    if (registradoHoy) {
      setMsg(estado?.descripcion8ejes == null
        ? `puntuación ${score}/8 guardada en el borrador · el caso ya está registrado hoy SIN puntuación: usa "registrar de nuevo" en la lámina para que cuente en el gate`
        : `puntuación ${score}/8 guardada en el borrador · el ledger ya tiene ${estado?.descripcion8ejes}/8 para este caso`);
    } else {
      setMsg(`puntuación ${score}/8 guardada → regístrala en el ledger (③ acierto/fallo) para que cuente`);
      setRegistrar(true);
    }
  };
  const ejesRellenos = Object.values(ejes).filter((v) => v.length > 0).length;

  return (
    <View style={[st.card, { borderColor: accent + '3A' }]}>
      <View style={st.head}>
        <DermaLineIcon name="skinLayers" size={17} color={accent} />
        <Text style={st.title}>① Dicta la morfología · 8 ejes</Text>
        <Text style={[st.method, { color: accent }]}>describir ANTES de diagnosticar</Text>
      </View>

      {/* Gate del módulo A */}
      <View style={[st.gate, { borderColor: (gate.superado ? DermaAtlas.jade : esModuloA ? DermaAtlas.alta : Hairline.medium) + '88' }]}>
        <Text style={[st.gateN, { color: gate.superado ? DermaAtlas.jade : esModuloA ? DermaAtlas.alta : Colors.muted }]}>{gate.buenas}/{DERMA_GATE_MODULO_A.descripciones}</Text>
        <View style={{ flex: 1 }}>
          <Text style={st.gateT}>Gate del módulo A · {DERMA_GATE_MODULO_A.descripciones} descripciones ≥{DERMA_GATE_MODULO_A.minimo}/8 {gate.superado ? '· SUPERADO ✓' : `· faltan ${gate.faltan}`}</Text>
          <Text style={st.gateSub}>{gate.n} puntuadas · media {gate.media}/8{esModuloA && !gate.superado ? ' · no pases a B sin superarlo (d1-d6): añade casos del banco si hace falta' : ''}</Text>
        </View>
      </View>

      {/* Selector de caso (los 2 de la sesión) */}
      <View style={st.casoRow}>
        {dia.casoIds.map((id, i) => {
          const on = i === idx; const a = dermaCasoArea(id); const c = DERMA_AREA_COLOR[a];
          const e = dermaCasoEstado(id, entries);
          return (
            <TouchableOpacity key={id} activeOpacity={0.85} onPress={() => setIdx(i)} style={[st.casoChip, on && { borderColor: c, backgroundColor: c + '1F' }, Platform.OS === 'web' ? WEB : null]}>
              <Text style={[st.casoTxt, on && { color: c }]}>caso #{id} · {DERMA_AREA_LABEL[a]}{e && e.fecha === hoy ? (e.acierto ? ' ✓' : ' ✗') : ''}{typeof e?.descripcion8ejes === 'number' && e.fecha === hoy ? ` ${e.descripcion8ejes}/8` : ''}</Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity activeOpacity={0.8} onPress={() => open(TERMINOLOGY_URL)} style={Platform.OS === 'web' ? WEB : null}><Text style={st.link}>vocabulario DermNet ↗</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => open(OBS_DERMA_DICTADO_URL)} style={Platform.OS === 'web' ? WEB : null}><Text style={[st.link, { color: OBS }]}>◆ plantilla Obsidian</Text></TouchableOpacity>
      </View>

      {/* Rúbrica: 8 ejes con chips de vocabulario */}
      <View style={st.ejes}>
        {DERMA_EJES_MORFOLOGIA.map((e) => {
          const sel = ejes[e.n] || [];
          const abierto = openEje === e.n;
          const terms = e.ejemplos.split(' · ');
          return (
            <View key={e.n} style={[st.eje, sel.length > 0 && { borderLeftColor: accent }]}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setOpenEje(abierto ? null : e.n)} style={[st.ejeHead, Platform.OS === 'web' ? WEB : null]}>
                <Text style={[st.ejeN, { color: sel.length ? accent : Colors.muted }]}>{e.n}</Text>
                <Text style={st.ejeT}>{e.eje}</Text>
                <Text style={st.ejeSel} numberOfLines={1}>{sel.length ? sel.join(', ') : abierto ? '' : 'toca para ver términos'}</Text>
                <Text style={st.ejeTg}>{abierto ? '−' : '+'}</Text>
              </TouchableOpacity>
              {abierto && (
                <View style={st.termRow}>
                  {terms.map((t) => {
                    const on = sel.includes(t);
                    return (
                      <TouchableOpacity key={t} activeOpacity={0.8} onPress={() => toggleTermino(e.n, t)} style={[st.term, on && { borderColor: accent, backgroundColor: accent + '22' }, Platform.OS === 'web' ? WEB : null]}>
                        <Text style={[st.termTxt, on && { color: Colors.onSurface }]}>{t}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Dictado libre */}
      <Text style={st.lbl}>Dictado (en voz alta y aquí) · caso #{casoId} · {ejesRellenos}/8 ejes con término</Text>
      <TextInput
        value={texto} onChangeText={setTexto} multiline numberOfLines={4}
        placeholder="p. ej.: placas eritematosas con escama plateada gruesa, borde bien definido, superficie rugosa, configuración en placas confluentes, distribución simétrica extensora (codos/rodillas), múltiples de 2-8 cm…"
        placeholderTextColor={Colors.muted} style={st.textarea}
      />
      <View style={st.btnRow}>
        <TouchableOpacity activeOpacity={0.85} onPress={guardarDictado} style={[st.btn, { backgroundColor: accent + '1F', borderColor: accent }, Platform.OS === 'web' ? WEB : null]}>
          <Text style={[st.btnTxt, { color: accent }]}>Guardar dictado → ② ddx · ③ viñeta</Text>
        </TouchableOpacity>
        {fase === 'dictar' && draft?.texto ? <Text style={st.hint}>borrador del {draft.fecha}</Text> : null}
      </View>

      {/* Autoevaluación tras la discusión */}
      {fase === 'evaluar' && (
        <View style={[st.evalBox, { borderColor: accent + '44' }]}>
          <Text style={st.lbl}>Tras leer la discusión (④): ¿qué ejes describiste BIEN? · {score}/8</Text>
          <View style={st.okRow}>
            {DERMA_EJES_MORFOLOGIA.map((e) => {
              const on = ejesOk.has(e.n); const c = on ? DermaAtlas.jade : Colors.muted;
              return (
                <TouchableOpacity key={e.n} activeOpacity={0.85} onPress={() => toggleOk(e.n)} style={[st.ok, on && { borderColor: DermaAtlas.jade, backgroundColor: DermaAtlas.jade + '22' }, Platform.OS === 'web' ? WEB : null]}>
                  <Text style={[st.okTxt, { color: c }]}>{on ? '✓' : '○'} {e.n} {e.eje}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={st.btnRow}>
            <TouchableOpacity activeOpacity={0.85} onPress={guardarScore} style={[st.btn, { backgroundColor: (score >= 6 ? DermaAtlas.jade : DermaAtlas.alta) + '1F', borderColor: score >= 6 ? DermaAtlas.jade : DermaAtlas.alta }, Platform.OS === 'web' ? WEB : null]}>
              <Text style={[st.btnTxt, { color: score >= 6 ? DermaAtlas.jade : DermaAtlas.alta }]}>Guardar {score}/8 {score >= 6 ? '(cuenta para el gate)' : '(bajo el gate ≥6)'}</Text>
            </TouchableOpacity>
            {registradoHoy && !registrar ? <Text style={st.hint}>caso #{casoId} ya registrado hoy ({estado?.acierto ? '✓' : '✗'}{typeof estado?.descripcion8ejes === 'number' ? ` · ${estado.descripcion8ejes}/8` : ' · sin puntuación'})</Text> : null}
          </View>
          {registrar && !registradoHoy && (
            <DermaCasoRegistro dia={dia} id={casoId} accent={DERMA_AREA_COLOR[area]} titulo={`Registrar caso #${casoId} (③ acierto/fallo + ${score}/8)`} onDone={() => { setRegistrar(false); setMsg(`✓ caso #${casoId} en el ledger con ${score}/8`); }} onCancel={() => setRegistrar(false)} />
          )}
        </View>
      )}
      {!!msg && <Text style={st.msg}>{msg}</Text>}
    </View>
  );
}

const st = StyleSheet.create({
  card: { backgroundColor: 'rgba(154,123,200,0.06)', borderRadius: BorderRadius.lg, borderWidth: 1, padding: Spacing.md, marginTop: Spacing.sm },
  head: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: Spacing.sm },
  title: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  method: { fontSize: 9, fontWeight: '700', letterSpacing: 0.3 },
  gate: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: 'rgba(255,255,255,0.02)', marginBottom: Spacing.sm },
  gateN: { fontSize: FontSize.bodyLg, fontWeight: '900', letterSpacing: -0.3, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },
  gateT: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.onSurface },
  gateSub: { fontSize: 9, color: Colors.muted, marginTop: 2, lineHeight: 12 },
  casoRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginBottom: Spacing.sm },
  casoChip: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: 'rgba(231,234,242,0.12)', backgroundColor: 'rgba(255,255,255,0.03)' },
  casoTxt: { fontSize: FontSize.labelSm, color: Colors.muted, fontWeight: '800' },
  link: { fontSize: 9, color: DermaAtlas.teal, fontWeight: '700', paddingHorizontal: 4 },
  ejes: { gap: 4 },
  eje: { borderLeftWidth: 2, borderLeftColor: 'rgba(231,234,242,0.10)', paddingLeft: 8, paddingVertical: 2 },
  ejeHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ejeN: { fontSize: FontSize.labelSm, fontWeight: '900', width: 12 },
  ejeT: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.onSurface, minWidth: 128 },
  ejeSel: { flex: 1, fontSize: 9, color: Colors.onSurfaceVariant, fontStyle: 'italic' },
  ejeTg: { fontSize: 14, fontWeight: '800', color: Colors.muted, width: 14, textAlign: 'center' },
  termRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 5, marginBottom: 3 },
  term: { paddingVertical: 3, paddingHorizontal: 8, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: 'rgba(231,234,242,0.10)', backgroundColor: 'rgba(255,255,255,0.02)' },
  termTxt: { fontSize: 9, color: Colors.muted, fontWeight: '600' },
  lbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: Spacing.sm, marginBottom: 6 },
  textarea: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 10, color: Colors.onSurface, fontSize: FontSize.labelMd, lineHeight: 18, minHeight: 84, textAlignVertical: 'top', backgroundColor: 'rgba(255,255,255,0.03)' },
  btnRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: Spacing.sm },
  btn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 12 },
  btnTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  hint: { fontSize: 9, color: Colors.muted, fontStyle: 'italic', flex: 1, lineHeight: 12 },
  evalBox: { marginTop: Spacing.sm, borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.sm, backgroundColor: 'rgba(95,168,140,0.05)' },
  okRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  ok: { paddingVertical: 4, paddingHorizontal: 9, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: 'rgba(231,234,242,0.12)', backgroundColor: 'rgba(255,255,255,0.02)' },
  okTxt: { fontSize: 9, fontWeight: '700' },
  msg: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: Spacing.sm, lineHeight: LineHeight.labelSm },
});
