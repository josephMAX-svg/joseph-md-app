import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Motion, LineHeight, Hairline, Elevation } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { DermaAtlas } from '../../lib/dermaData';
import { cases, DERMA_CASOS_META, type DermaAreaCORE } from '../../lib/dermaDailyPlan';
import {
  dermaPctCiego, dermaPctFalloPorModulo, dermaPctFalloPorBloque, dermaTiposError, dermaGateModuloA,
  dermaCasosParaSegundaPasada, dermaLedgerExportJSON, dermaLedgerImportJSON, dermaFallosRebuild,
  DERMA_TIPO_ERROR, DERMA_GATE_MODULO_A, type DermaStat, type DermaTipoError,
} from '../../lib/dermaLedger';
import DermaLineIcon from './DermaLineIcons';
import { useDermaLedger, notifyDermaLedger, dermaHoyISO, DERMA_AREA_LABEL, DERMA_AREA_COLOR } from './dermaLedgerBus';

/**
 * DermaWeaknessWidget — "Debilidades por módulo CORE" (Hub · pestaña Debilidades y checkpoints d45/d46/d69/d70).
 * Lee SOLO el ledger (dermaLedger.ts): % ciego real (solo aciertos seguros), % fallo Palmerton (fallos + suerte)
 * por módulo Med/Path/Peds/Surg y por bloque A-X, tipo de error dominante (+ cura), gate del módulo A,
 * drill HDPH, casos para la 2ª pasada FSRS. Export JSON = bloque para pegar en
 * DATA/DERMATOLOGIA/TRACKING/_registro_derma.json (descarga en web + portapapeles); import/merge por uid.
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;
const BLOQUE_COLOR: Record<string, string> = { A: '#C56A5A', B: '#B08AC0', C: '#B8934E', D: '#C56A5A', E: '#7C83D6', F: '#6BB8B0', G: '#5FA88C', H: '#9A7BC8', Z: '#C8A96A', X: '#9A7BC8' };

function Bar({ pct, color }: { pct: number; color: string }) {
  return <View style={st.track}><View style={[st.fill, { width: (`${Math.max(0, Math.min(100, pct))}%` as any), backgroundColor: color }]} /></View>;
}
function StatRow({ s, label, color }: { s: DermaStat; label: string; color: string }) {
  const tipos = (Object.keys(s.tipos) as DermaTipoError[]).filter((k) => s.tipos[k] > 0).map((k) => `${k} ${s.tipos[k]}`).join(' · ');
  return (
    <View style={st.statRow}>
      <View style={st.statHead}>
        <Text style={[st.statLbl, { color }]}>{label}</Text>
        <Text style={st.statN}>{s.n ? `${s.pctFallo}% fallo · ${s.pctCiego}% ciego · n=${s.n}` : 'sin datos'}</Text>
      </View>
      <Bar pct={s.pctFallo} color={s.n ? color : 'rgba(255,255,255,0.08)'} />
      {tipos ? <Text style={st.statTipos}>{tipos}{s.ultimo ? ` · último ${s.ultimo}` : ''}</Text> : null}
    </View>
  );
}

export default function DermaWeaknessWidget({ compact = false, accent = DermaAtlas.amethyst }: { compact?: boolean; accent?: string }) {
  const { entries } = useDermaLedger();
  const [msg, setMsg] = useState('');
  const [importTxt, setImportTxt] = useState('');
  const [showImport, setShowImport] = useState(false);

  const resumen = useMemo(() => dermaPctCiego(entries), [entries]);
  const porModulo = useMemo(() => dermaPctFalloPorModulo(entries), [entries]);
  const porBloque = useMemo(() => dermaPctFalloPorBloque(entries), [entries]);
  const tipos = useMemo(() => dermaTiposError(entries), [entries]);
  const gate = useMemo(() => dermaGateModuloA(entries), [entries]);
  const segunda = useMemo(() => dermaCasosParaSegundaPasada(entries), [entries]);
  const drills = useMemo(() => entries.filter((e) => e.fuente === 'drill'), [entries]);
  const dermat = useMemo(() => entries.filter((e) => e.fuente === 'dermatoscopia'), [entries]);
  const cura = tipos.dominante ? DERMA_TIPO_ERROR.find((t) => t.k === tipos.dominante)?.cura : null;

  const exportar = async () => {
    const json = dermaLedgerExportJSON();
    let out: string[] = [];
    if (Platform.OS === 'web') {
      try {
        const nav: any = (globalThis as any).navigator;
        if (nav?.clipboard?.writeText) { await nav.clipboard.writeText(json); out.push('copiado al portapapeles'); }
      } catch { /* sin permiso de portapapeles */ }
      try {
        const doc: any = (globalThis as any).document; const win: any = globalThis as any;
        if (doc && win.Blob && win.URL?.createObjectURL) {
          const blob = new win.Blob([json], { type: 'application/json' });
          const a = doc.createElement('a'); a.href = win.URL.createObjectURL(blob); a.download = `derma_ledger_${dermaHoyISO()}.json`;
          doc.body.appendChild(a); a.click(); doc.body.removeChild(a); setTimeout(() => win.URL.revokeObjectURL(a.href), 1000);
          out.push('descargado derma_ledger_' + dermaHoyISO() + '.json');
        }
      } catch { /* descarga bloqueada */ }
    }
    setMsg(out.length ? `✓ ${out.join(' · ')} → pegar en DATA/DERMATOLOGIA/TRACKING/_registro_derma.json → rondas[]` : `export listo (${entries.length} entradas) · sin portapapeles/descarga en esta plataforma`);
  };
  const importar = () => {
    const n = dermaLedgerImportJSON(importTxt);
    notifyDermaLedger();
    setMsg(n ? `✓ ${n} entradas nuevas fusionadas (por uid)` : 'nada que importar (JSON inválido o sin entradas nuevas)');
    if (n) { setImportTxt(''); setShowImport(false); }
  };
  const rebuild = () => { const n = dermaFallosRebuild(); notifyDermaLedger(); setMsg(`✓ espejo de fallos reconstruido: ${n} entradas`); };

  return (
    <View style={[st.card, compact && { padding: Spacing.sm }]}>
      <View style={st.head}>
        <DermaLineIcon name="differential" size={17} color={accent} />
        <Text style={st.title}>Debilidades por módulo CORE</Text>
        <Text style={[st.method, { color: accent }]}>ledger · % ciego real</Text>
      </View>

      {/* Resumen */}
      <View style={st.kpiRow}>
        {[
          { v: `${resumen.pctCiego}%`, l: '% ciego', c: DermaAtlas.jade },
          { v: `${resumen.pctFallo}%`, l: '% fallo Palmerton', c: DermaAtlas.crit },
          { v: String(resumen.n), l: 'ítems (casos + banco)', c: accent },
          { v: String(resumen.suerte), l: 'por suerte (no cuentan)', c: DermaAtlas.alta },
        ].map((k) => (
          <View key={k.l} style={st.kpi}><Text style={[st.kpiV, { color: k.c }]}>{k.v}</Text><Text style={st.kpiL}>{k.l}</Text></View>
        ))}
      </View>
      {resumen.n === 0 ? <Text style={st.empty}>Sin entradas todavía: registra cada caso ciego (✓/✗ en la lámina) y cada ~10Q de review; el mapa se dibuja solo.</Text> : null}

      {/* Por módulo CORE */}
      <Text style={st.lbl}>Por módulo CORE (peor → mejor · % fallo = fallos + aciertos por suerte)</Text>
      {porModulo.map((s) => <StatRow key={s.clave} s={s} label={`${DERMA_AREA_LABEL[s.clave as DermaAreaCORE]} (${s.clave})`} color={DERMA_AREA_COLOR[s.clave as DermaAreaCORE]} />)}

      {/* Por bloque */}
      {!compact && (
        <>
          <Text style={st.lbl}>Por bloque del plan A-X</Text>
          {porBloque.filter((s) => s.n > 0).map((s) => <StatRow key={s.clave} s={s} label={`Bloque ${s.clave}`} color={BLOQUE_COLOR[s.clave] || accent} />)}
          {porBloque.every((s) => s.n === 0) ? <Text style={st.empty}>sin datos por bloque</Text> : null}
        </>
      )}

      {/* Tipo de error dominante */}
      <Text style={st.lbl}>Tipo de error</Text>
      <View style={st.tipoRow}>
        {DERMA_TIPO_ERROR.map((t) => (
          <View key={t.k} style={[st.tipoChip, tipos.dominante === t.k && { borderColor: DermaAtlas.crit, backgroundColor: DermaAtlas.crit + '1F' }]}>
            <Text style={[st.tipoTxt, tipos.dominante === t.k && { color: DermaAtlas.crit }]}>{t.label} · {tipos.tipos[t.k]}</Text>
          </View>
        ))}
      </View>
      {cura ? <Text style={st.hint}>dominante {tipos.dominante} → cura: {cura}</Text> : null}

      {/* Gate A · drill · dermatoscopia */}
      <View style={st.miniRow}>
        <View style={st.mini}><Text style={[st.miniV, { color: gate.superado ? DermaAtlas.jade : DermaAtlas.alta }]}>{gate.buenas}/{DERMA_GATE_MODULO_A.descripciones}</Text><Text style={st.miniL}>gate A (≥{DERMA_GATE_MODULO_A.minimo}/8) · media {gate.media}</Text></View>
        <View style={st.mini}><Text style={[st.miniV, { color: drills.length && drills[drills.length - 1].acierto ? DermaAtlas.jade : DermaAtlas.crit }]}>{drills.length ? (drills[drills.length - 1].acierto ? '✓' : '✗') : '—'}</Text><Text style={st.miniL}>drill HDPH · {drills.length} intentos</Text></View>
        <View style={st.mini}><Text style={[st.miniV, { color: DermaAtlas.teal }]}>{dermat.length ? `${Math.round((dermat.filter((e) => e.acierto && e.evalAcierto === 'conocimiento').length / dermat.length) * 100)}%` : '—'}</Text><Text style={st.miniL}>dermatoscopia ciega · n={dermat.length}</Text></View>
      </View>

      {/* 2ª pasada */}
      <Text style={st.lbl}>2ª pasada FSRS (d69) · casos fallados / por suerte · {segunda.length}</Text>
      {segunda.length ? (
        <View style={st.casosRow}>
          {segunda.slice(0, compact ? 12 : 60).map((c) => (
            <TouchableOpacity key={c.id} activeOpacity={0.8} onPress={() => Linking.openURL(cases(DERMA_CASOS_META.groupid)).catch(() => {})} style={[st.casoChip, { borderColor: DERMA_AREA_COLOR[c.area] + '66' }, Platform.OS === 'web' ? WEB : null]}>
              <Text style={[st.casoTxt, { color: DERMA_AREA_COLOR[c.area] }]}>#{c.id} {c.area}{c.veces > 1 ? ` ×${c.veces}` : ''}{c.tipoError ? ` · ${c.tipoError}` : ''}</Text>
            </TouchableOpacity>
          ))}
          {segunda.length > (compact ? 12 : 60) ? <Text style={st.hint}>+{segunda.length - (compact ? 12 : 60)} más</Text> : null}
        </View>
      ) : <Text style={st.empty}>ningún caso pendiente de 2ª pasada</Text>}

      {/* Export / import */}
      <View style={st.btnRow}>
        <TouchableOpacity activeOpacity={0.85} onPress={exportar} style={[st.btn, { borderColor: accent, backgroundColor: accent + '1F' }, Platform.OS === 'web' ? WEB : null]}><Text style={[st.btnTxt, { color: accent }]}>⇩ Export JSON ({entries.length})</Text></TouchableOpacity>
        {!compact && (
          <>
            <TouchableOpacity activeOpacity={0.85} onPress={() => setShowImport((s) => !s)} style={[st.btn, Platform.OS === 'web' ? WEB : null]}><Text style={st.btnTxt}>⇧ Import / merge</Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.85} onPress={rebuild} style={[st.btn, Platform.OS === 'web' ? WEB : null]}><Text style={st.btnTxt}>↻ rehacer espejo de fallos</Text></TouchableOpacity>
          </>
        )}
      </View>
      {showImport && (
        <View style={{ marginTop: Spacing.sm }}>
          <TextInput value={importTxt} onChangeText={setImportTxt} multiline numberOfLines={4} placeholder='pega aquí el JSON exportado (o {"entradas":[…]}) de otro dispositivo' placeholderTextColor={Colors.muted} style={st.textarea} />
          <TouchableOpacity activeOpacity={0.85} onPress={importar} style={[st.btn, { alignSelf: 'flex-start', marginTop: 6 }, Platform.OS === 'web' ? WEB : null]}><Text style={st.btnTxt}>fusionar por uid</Text></TouchableOpacity>
        </View>
      )}
      {!!msg && <Text style={st.msg}>{msg}</Text>}
      {!compact ? <Text style={st.foot}>Esquema idéntico a DATA/DERMATOLOGIA/TRACKING/_registro_derma.json (rondas[] · items[]). Mientras no haya backend, el ledger vive en este navegador (localStorage jmd-derma-casos / jmd-derma-fallos): exporta en el cierre 14:13 y en d70.</Text> : null}
    </View>
  );
}

const st = StyleSheet.create({
  card: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, padding: Spacing.md, ...Elevation.sm },
  head: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: Spacing.sm },
  title: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  method: { fontSize: 9, fontWeight: '700', letterSpacing: 0.3 },
  kpiRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  kpi: { flex: 1, minWidth: 96, borderWidth: 1, borderColor: Hairline.soft, borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 8, backgroundColor: 'rgba(255,255,255,0.02)' },
  kpiV: { fontSize: FontSize.bodyLg, fontWeight: '900', letterSpacing: -0.3, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },
  kpiL: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  empty: { fontSize: FontSize.labelSm, color: Colors.muted, fontStyle: 'italic', marginTop: 6, lineHeight: LineHeight.labelSm },
  lbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, textTransform: 'uppercase', marginTop: Spacing.md, marginBottom: 6 },
  statRow: { marginBottom: 7 },
  statHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3, gap: 8 },
  statLbl: { fontSize: FontSize.labelSm, fontWeight: '800' },
  statN: { fontSize: 9, color: Colors.muted, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },
  statTipos: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  track: { height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  fill: { height: 6, borderRadius: 3 },
  tipoRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tipoChip: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 10 },
  tipoTxt: { fontSize: FontSize.labelSm, color: Colors.muted, fontWeight: '700' },
  hint: { fontSize: 9, color: Colors.muted, marginTop: 5, lineHeight: 12, fontStyle: 'italic' },
  miniRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: Spacing.md },
  mini: { flex: 1, minWidth: 110, borderWidth: 1, borderColor: Hairline.soft, borderRadius: BorderRadius.md, padding: 8, backgroundColor: 'rgba(255,255,255,0.02)' },
  miniV: { fontSize: FontSize.labelLg, fontWeight: '900' },
  miniL: { fontSize: 9, color: Colors.muted, marginTop: 2, lineHeight: 12 },
  casosRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  casoChip: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 3, paddingHorizontal: 8, backgroundColor: 'rgba(255,255,255,0.02)' },
  casoTxt: { fontSize: 9, fontWeight: '800' },
  btnRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: Spacing.md },
  btn: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.md, paddingVertical: 7, paddingHorizontal: 11, backgroundColor: 'rgba(255,255,255,0.03)' },
  btnTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.onSurfaceVariant },
  textarea: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 10, color: Colors.onSurface, fontSize: FontSize.labelSm, minHeight: 72, textAlignVertical: 'top', backgroundColor: 'rgba(255,255,255,0.03)' },
  msg: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: Spacing.sm, lineHeight: LineHeight.labelSm },
  foot: { fontSize: 9, color: Colors.muted, marginTop: Spacing.sm, lineHeight: 12, fontStyle: 'italic' },
});
