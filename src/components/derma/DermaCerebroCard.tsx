import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Motion, LineHeight, Hairline } from '../../theme/tokens';
import { DermaAtlas } from '../../lib/dermaData';
import { DERMA_CEREBRO_PASOS, DERMA_MASTERY_GATE, type DermaCerebroFicha } from '../../lib/dermaCerebro';
import { DERMA_TIER_INFO } from '../../lib/dermaDailyPlan';
import DermaLineIcon from './DermaLineIcons';

/**
 * DermaCerebroCard — ficha del CEREBRO CLÍNICO (DERMA_MASTER_SPEC §3) del átomo: 7 pasos
 * (causa → mecanismo → capa → decisión → no-errar → comunicación → hábito) + catástrofe/rescate + guion.
 * Plegable. Modo "leer" muestra todo; modo "recitar" (mastery gate §6.3) oculta cada paso hasta pulsarlo:
 * Joseph recita en voz alta y luego compara. Los parámetros clínicos pendientes (ficha.verificar) se
 * pintan como "A VERIFICAR" en ámbar, separados del mecanismo (regla de honestidad del SPEC §8).
 * Checklist del gate (4 ítems) efímera por ficha → si 4/4, el átomo puede marcarse como dominado.
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;

export default function DermaCerebroCard({ ficha, accent = DermaAtlas.amethyst, abierto = false }: { ficha: DermaCerebroFicha; accent?: string; abierto?: boolean }) {
  const [open, setOpen] = useState(abierto);
  const [modo, setModo] = useState<'leer' | 'recitar'>('recitar');
  const [reveal, setReveal] = useState<Set<string>>(new Set());
  const [gate, setGate] = useState<Set<string>>(new Set());
  useEffect(() => { setReveal(new Set()); setGate(new Set()); setOpen(abierto); }, [ficha.id, abierto]);

  const GOLD = DermaAtlas.gold;
  const isShown = (k: string) => modo === 'leer' || reveal.has(k);
  const toggleReveal = (k: string) => setReveal((s) => { const n = new Set(s); if (n.has(k)) n.delete(k); else n.add(k); return n; });
  const toggleGate = (k: string) => setGate((s) => { const n = new Set(s); if (n.has(k)) n.delete(k); else n.add(k); return n; });
  const tierC = DERMA_TIER_INFO[ficha.tier].c;
  const gateOk = gate.size === DERMA_MASTERY_GATE.length;

  return (
    <View style={[st.card, { borderColor: (open ? GOLD : accent) + '44' }]}>
      <TouchableOpacity activeOpacity={0.85} onPress={() => setOpen((o) => !o)} style={[st.head, Platform.OS === 'web' ? WEB : null]}>
        <DermaLineIcon name="skinLayers" size={17} color={GOLD} />
        <View style={{ flex: 1 }}>
          <Text style={st.title}>Cerebro clínico · 7 pasos</Text>
          <Text style={st.sub} numberOfLines={open ? 3 : 1}>{ficha.titulo}</Text>
        </View>
        <View style={[st.tier, { borderColor: tierC + '66' }]}><Text style={[st.tierTxt, { color: tierC }]}>{ficha.tier}</Text></View>
        <Text style={st.tg}>{open ? '−' : '+'}</Text>
      </TouchableOpacity>

      {open && (
        <View style={{ marginTop: Spacing.sm }}>
          <View style={st.modoRow}>
            <Text style={st.ref}>según {ficha.referente}</Text>
            <View style={{ flex: 1 }} />
            {(['recitar', 'leer'] as const).map((m) => (
              <TouchableOpacity key={m} activeOpacity={0.85} onPress={() => { setModo(m); if (m === 'recitar') setReveal(new Set()); }} style={[st.modo, modo === m && { borderColor: GOLD, backgroundColor: GOLD + '1F' }, Platform.OS === 'web' ? WEB : null]}>
                <Text style={[st.modoTxt, modo === m && { color: GOLD }]}>{m === 'recitar' ? 'recitar (oculto)' : 'leer'}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {modo === 'recitar' ? <Text style={st.hint}>Recita cada paso en voz alta ANTES de tocarlo; compara y ajusta. Sin mirar = mastery gate §6.3.</Text> : null}

          {DERMA_CEREBRO_PASOS.map((p) => {
            const shown = isShown(p.k);
            return (
              <TouchableOpacity key={p.k} activeOpacity={modo === 'recitar' ? 0.85 : 1} onPress={() => modo === 'recitar' && toggleReveal(p.k)} style={[st.paso, shown && { borderLeftColor: GOLD }, modo === 'recitar' && Platform.OS === 'web' ? WEB : null]}>
                <View style={st.pasoHead}>
                  <Text style={[st.pasoN, { color: shown ? GOLD : Colors.muted }]}>{p.n}</Text>
                  <Text style={st.pasoLbl}>{p.label}</Text>
                  {!shown ? <Text style={st.pasoReveal}>tocar para comparar</Text> : null}
                </View>
                <Text style={st.pasoQ}>{p.pregunta}</Text>
                {shown ? <Text style={st.pasoTxt}>{ficha.pasos[p.k]}</Text> : <View style={st.hidden} />}
              </TouchableOpacity>
            );
          })}

          {/* Catástrofe + rescate · guion */}
          <TouchableOpacity activeOpacity={modo === 'recitar' ? 0.85 : 1} onPress={() => modo === 'recitar' && toggleReveal('catastrofe')} style={[st.cat, Platform.OS === 'web' && modo === 'recitar' ? WEB : null]}>
            <Text style={[st.catLbl, { color: DermaAtlas.crit }]}>CATÁSTROFE + RESCATE (precableado)</Text>
            {isShown('catastrofe') ? <Text style={st.catTxt}>{ficha.catastrofe}</Text> : <Text style={st.pasoReveal}>recítala → tocar para comparar</Text>}
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={modo === 'recitar' ? 0.85 : 1} onPress={() => modo === 'recitar' && toggleReveal('guion')} style={[st.cat, { borderColor: accent + '44' }, Platform.OS === 'web' && modo === 'recitar' ? WEB : null]}>
            <Text style={[st.catLbl, { color: accent }]}>GUION DE PACIENTE (frase ancla)</Text>
            {isShown('guion') ? <Text style={[st.catTxt, { fontStyle: 'italic' }]}>{ficha.guion}</Text> : <Text style={st.pasoReveal}>dilo tal cual → tocar para comparar</Text>}
          </TouchableOpacity>

          {/* Parámetros pendientes (honestidad §8) */}
          {ficha.verificar && ficha.verificar.length > 0 && (
            <View style={st.verif}>
              <Text style={[st.catLbl, { color: DermaAtlas.alta }]}>A VERIFICAR (parámetros clínicos, no mecanismo)</Text>
              {ficha.verificar.map((v, i) => <Text key={i} style={st.verifTxt}>▸ {v}</Text>)}
            </View>
          )}

          {/* Fuentes */}
          <Text style={[st.catLbl, { color: Colors.smallLabel, marginTop: Spacing.sm }]}>FUENTES</Text>
          {ficha.fuentes.map((f, i) => <Text key={i} style={st.src} numberOfLines={2}>· {f}</Text>)}

          {/* Mastery gate §6.3 */}
          <View style={[st.gate, { borderColor: (gateOk ? DermaAtlas.jade : GOLD) + '66' }]}>
            <Text style={[st.catLbl, { color: gateOk ? DermaAtlas.jade : GOLD }]}>MASTERY GATE §6.3 · {gate.size}/{DERMA_MASTERY_GATE.length}{gateOk ? ' · átomo dominado → márcalo como hecho' : ''}</Text>
            {DERMA_MASTERY_GATE.map((g) => {
              const on = gate.has(g.k);
              return (
                <TouchableOpacity key={g.k} activeOpacity={0.8} onPress={() => toggleGate(g.k)} style={[st.gateRow, Platform.OS === 'web' ? WEB : null]}>
                  <Text style={[st.gateChk, { color: on ? DermaAtlas.jade : 'rgba(255,255,255,0.3)' }]}>{on ? '☑' : '☐'}</Text>
                  <Text style={[st.gateTxt, on && { color: Colors.onSurface }]}>{g.t}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  card: { backgroundColor: 'rgba(200,169,106,0.05)', borderRadius: BorderRadius.lg, borderWidth: 1, padding: Spacing.md, marginTop: Spacing.sm },
  head: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  title: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  sub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2, lineHeight: 14 },
  tier: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 7 },
  tierTxt: { fontSize: 9, fontWeight: '900', letterSpacing: 0.4 },
  tg: { fontSize: 20, fontWeight: '800', color: DermaAtlas.gold, paddingHorizontal: 4 },
  modoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  ref: { fontSize: 9, color: DermaAtlas.gold, fontWeight: '700', letterSpacing: 0.3 },
  modo: { paddingVertical: 4, paddingHorizontal: 9, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Hairline.medium },
  modoTxt: { fontSize: 9, color: Colors.muted, fontWeight: '800' },
  hint: { fontSize: 9, color: Colors.muted, fontStyle: 'italic', marginBottom: 6, lineHeight: 12 },
  paso: { borderLeftWidth: 2, borderLeftColor: 'rgba(231,234,242,0.10)', paddingLeft: 9, paddingVertical: 6, marginBottom: 4 },
  pasoHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pasoN: { fontSize: FontSize.labelMd, fontWeight: '900', width: 14 },
  pasoLbl: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface },
  pasoReveal: { fontSize: 9, color: DermaAtlas.gold, fontStyle: 'italic', marginLeft: 6 },
  pasoQ: { fontSize: 9, color: Colors.muted, marginTop: 2, lineHeight: 12 },
  pasoTxt: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 5, lineHeight: 18 },
  hidden: { height: 8, marginTop: 6, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.05)', width: '60%' },
  cat: { borderWidth: 1, borderColor: 'rgba(197,106,90,0.35)', borderRadius: BorderRadius.md, padding: Spacing.sm, marginTop: 6, backgroundColor: 'rgba(255,255,255,0.02)' },
  catLbl: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  catTxt: { fontSize: FontSize.labelMd, color: Colors.onSurface, marginTop: 4, lineHeight: 18 },
  verif: { borderWidth: 1, borderColor: 'rgba(184,147,78,0.4)', borderRadius: BorderRadius.md, padding: Spacing.sm, marginTop: 6, backgroundColor: 'rgba(184,147,78,0.06)' },
  verifTxt: { fontSize: FontSize.labelSm, color: DermaAtlas.alta, marginTop: 4, lineHeight: LineHeight.labelSm },
  src: { fontSize: 9, color: Colors.muted, marginTop: 3, lineHeight: 12 },
  gate: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.sm, marginTop: Spacing.sm },
  gateRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  gateChk: { fontSize: 15, width: 20, textAlign: 'center' },
  gateTxt: { flex: 1, fontSize: FontSize.labelSm, color: Colors.muted },
});
