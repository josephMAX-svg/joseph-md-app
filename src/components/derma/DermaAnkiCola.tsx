import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Motion, Hairline, LineHeight } from '../../theme/tokens';
import { DermaAtlas } from '../../lib/dermaData';
import { type DiaDerma, dermaCasoArea } from '../../lib/dermaDailyPlan';
import { dermaAnkiDeck, dermkiPista, dermaAnkiTsv, dermaAnkiTags, DERMA_OCLUSION_CHECKLIST, DERMA_ANKI_NOTETYPES, ANKIWEB, type DermaTarjetaMecanismo } from '../../lib/ankiLinks';
import DermaLineIcon from './DermaLineIcons';
import { dermaCopiar, dermaDescargar, dermaHoyISO, DERMA_AREA_LABEL } from './dermaLedgerBus';

/**
 * DermaAnkiCola — cola Anki de la SESIÓN (cierre 14:13): 1-2 tarjetas de MECANISMO por caso (formato Palmerton:
 * FRENTE "¿por qué…?" → REVERSO POR QUÉ · CCSN · FUENTE) que se acumulan en localStorage 'jmd-derma-anki-cola'
 * y se exportan como TSV importable (dermaAnkiTsv, cabecera de PLANTILLA_SESION.txt) al deck APEX::DERMA::<bloque>.
 * La oclusión de imagen NO pasa por aquí (notetype nativo de Anki sobre captura personal): solo el checklist.
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;
export const DERMA_ANKI_COLA_KEY = 'jmd-derma-anki-cola';
interface Tarjeta extends DermaTarjetaMecanismo { uid: string; ts: string; exportada?: boolean }

function leer(): Tarjeta[] {
  try { const ls = (globalThis as any).localStorage; if (!ls) return []; const raw = ls.getItem(DERMA_ANKI_COLA_KEY); const arr = raw ? JSON.parse(raw) : []; return Array.isArray(arr) ? arr : []; }
  catch { return []; }
}
function escribir(list: Tarjeta[]): boolean {
  try { const ls = (globalThis as any).localStorage; if (!ls) return false; ls.setItem(DERMA_ANKI_COLA_KEY, JSON.stringify(list)); return true; }
  catch { return false; }
}
const open = (u: string) => Linking.openURL(u).catch(() => {});

export default function DermaAnkiCola({ dia, accent = DermaAtlas.teal }: { dia: DiaDerma; accent?: string }) {
  const [cola, setCola] = useState<Tarjeta[]>(() => leer());
  const [openForm, setOpenForm] = useState(false);
  const [showChk, setShowChk] = useState(false);
  const [casoIdx, setCasoIdx] = useState<number>(0);
  const [frente, setFrente] = useState('');
  const [porQue, setPorQue] = useState('');
  const [ccsn, setCcsn] = useState('');
  const [fuente, setFuente] = useState('');
  const [msg, setMsg] = useState('');
  useEffect(() => { setOpenForm(false); setMsg(''); setCasoIdx(0); }, [dia.d]);

  const deck = dermaAnkiDeck(dia.bKey);
  const deSesion = useMemo(() => cola.filter((t) => t.d === dia.d), [cola, dia.d]);
  const pendientes = useMemo(() => cola.filter((t) => !t.exportada), [cola]);
  const casoId = dia.casoIds[casoIdx] ?? dia.casoIds[0];

  const añadir = () => {
    if (!frente.trim() || !porQue.trim()) { setMsg('FRENTE (¿por qué…?) y POR QUÉ son obligatorios: sin mecanismo no es tarjeta Palmerton.'); return; }
    const t: Tarjeta = {
      uid: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`, ts: new Date().toISOString(),
      frente: frente.trim(), porQue: porQue.trim(), ccsn: ccsn.trim() || '—', fuente: fuente.trim() || `caso #${casoId} · d${dia.d}`,
      bKey: dia.bKey, d: dia.d, casoId, moduloCORE: dermaCasoArea(casoId),
    };
    const next = [...cola, t]; setCola(next);
    setMsg(escribir(next) ? `✓ tarjeta en la cola (${deck} · tags ${dermaAnkiTags(t)})` : '⚠ sin localStorage: no se guardó');
    setFrente(''); setPorQue(''); setCcsn(''); setFuente('');
  };
  const borrar = (uid: string) => { const next = cola.filter((t) => t.uid !== uid); setCola(next); escribir(next); };
  const exportar = (solo: Tarjeta[]) => {
    if (!solo.length) { setMsg('nada que exportar'); return; }
    const tsv = dermaAnkiTsv(solo);
    const out: string[] = [];
    if (dermaCopiar(tsv)) out.push('TSV copiado');
    if (Platform.OS === 'web' && dermaDescargar(`derma_anki_${dermaHoyISO()}_d${dia.d}.txt`, tsv, 'text/plain')) out.push(`descargado derma_anki_${dermaHoyISO()}_d${dia.d}.txt`);
    const ids = new Set(solo.map((t) => t.uid));
    const next = cola.map((t) => (ids.has(t.uid) ? { ...t, exportada: true } : t)); setCola(next); escribir(next);
    setMsg(out.length ? `✓ ${out.join(' · ')} → Anki: Archivo → Importar (deck y tags van en las columnas 3-4)` : `TSV listo (${solo.length} tarjetas) · sin portapapeles/descarga en esta plataforma`);
  };

  return (
    <View style={[st.card, { borderColor: accent + '44' }]}>
      <View style={st.head}>
        <DermaLineIcon name="differential" size={17} color={accent} />
        <View style={{ flex: 1 }}>
          <Text style={st.title}>ANKI · {deck}</Text>
          <Text style={st.sub}>{DERMA_ANKI_NOTETYPES.mecanismo} (FRENTE mecanismo → POR QUÉ · CCSN · FUENTE) + {DERMA_ANKI_NOTETYPES.oclusion} de la lámina · mismo FSRS que Step 1 · pista {dermkiPista(dia.bKey)}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.85} onPress={() => open(ANKIWEB)} style={[st.btn, { borderColor: accent + '88' }, Platform.OS === 'web' ? WEB : null]}><Text style={[st.btnTxt, { color: accent }]}>AnkiWeb ↗</Text></TouchableOpacity>
      </View>

      <View style={st.row}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => setOpenForm((o) => !o)} style={[st.btn, { borderColor: accent, backgroundColor: accent + '1A' }, Platform.OS === 'web' ? WEB : null]}>
          <Text style={[st.btnTxt, { color: accent }]}>{openForm ? '− cerrar' : '+ tarjeta de MECANISMO'} · sesión {deSesion.length}/2</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={() => exportar(deSesion.length ? deSesion : pendientes)} style={[st.btn, Platform.OS === 'web' ? WEB : null]}>
          <Text style={st.btnTxt}>⇩ TSV {deSesion.length ? `de la sesión (${deSesion.length})` : `pendientes (${pendientes.length})`}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={() => setShowChk((s) => !s)} style={[st.btn, Platform.OS === 'web' ? WEB : null]}>
          <Text style={st.btnTxt}>{showChk ? '− ' : ''}oclusión de imagen · checklist</Text>
        </TouchableOpacity>
      </View>

      {openForm && (
        <View style={st.form}>
          <View style={st.row}>
            <Text style={st.lbl}>caso</Text>
            {dia.casoIds.map((id, i) => (
              <TouchableOpacity key={id} activeOpacity={0.8} onPress={() => setCasoIdx(i)} style={[st.chip, casoIdx === i && { borderColor: accent, backgroundColor: accent + '22' }, Platform.OS === 'web' ? WEB : null]}>
                <Text style={[st.chipTxt, casoIdx === i && { color: accent }]}>#{id} · {DERMA_AREA_LABEL[dermaCasoArea(id)]}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput value={frente} onChangeText={setFrente} placeholder="FRENTE · ¿Por qué … produce …? (mecanismo, nunca dato suelto)" placeholderTextColor={Colors.muted} style={st.input} />
          <TextInput value={porQue} onChangeText={setPorQue} multiline placeholder="POR QUÉ · la cascada (tejido/fisiología → signo)" placeholderTextColor={Colors.muted} style={[st.input, { minHeight: 56, textAlignVertical: 'top' }]} />
          <TextInput value={ccsn} onChangeText={setCcsn} placeholder="CCSN · con qué se confunde + el rasgo discriminador" placeholderTextColor={Colors.muted} style={st.input} />
          <TextInput value={fuente} onChangeText={setFuente} placeholder={`FUENTE · caso #${casoId} / capítulo / PMID (por defecto: caso #${casoId} · d${dia.d})`} placeholderTextColor={Colors.muted} style={st.input} />
          <TouchableOpacity activeOpacity={0.85} onPress={añadir} style={[st.save, { backgroundColor: accent }, Platform.OS === 'web' ? WEB : null]}><Text style={st.saveTxt}>Añadir a la cola</Text></TouchableOpacity>
        </View>
      )}

      {deSesion.length > 0 && (
        <View style={{ marginTop: Spacing.sm }}>
          {deSesion.map((t) => (
            <View key={t.uid} style={st.item}>
              <View style={{ flex: 1 }}>
                <Text style={st.itemF} numberOfLines={2}>{t.exportada ? '✓ ' : '○ '}{t.frente}</Text>
                <Text style={st.itemB} numberOfLines={2}>{t.porQue}{t.casoId ? ` · caso #${t.casoId}` : ''}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} onPress={() => borrar(t.uid)} style={Platform.OS === 'web' ? WEB : null}><Text style={st.del}>×</Text></TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {showChk && (
        <View style={st.chk}>
          <Text style={st.lbl}>Oclusión de imagen (paso ④) · {DERMA_ANKI_NOTETYPES.oclusion}</Text>
          {DERMA_OCLUSION_CHECKLIST.map((c, i) => <Text key={i} style={st.chkTxt}>{i + 1}. {c}</Text>)}
        </View>
      )}
      {!!msg && <Text style={st.msg}>{msg}</Text>}
    </View>
  );
}

const st = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: BorderRadius.lg, padding: Spacing.md, backgroundColor: 'rgba(107,184,176,0.05)', marginBottom: 6 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: Spacing.sm },
  title: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.1 },
  sub: { fontSize: 9, color: Colors.muted, marginTop: 2, lineHeight: 12 },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6 },
  btn: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 10, backgroundColor: 'rgba(255,255,255,0.03)' },
  btnTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.onSurfaceVariant, letterSpacing: 0.2 },
  form: { marginTop: Spacing.sm, gap: 6 },
  lbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, textTransform: 'uppercase' },
  chip: { paddingVertical: 4, paddingHorizontal: 9, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: 'rgba(231,234,242,0.12)', backgroundColor: 'rgba(255,255,255,0.03)' },
  chipTxt: { fontSize: FontSize.labelSm, color: Colors.muted, fontWeight: '700' },
  input: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 9, color: Colors.onSurface, fontSize: FontSize.labelSm, backgroundColor: 'rgba(255,255,255,0.03)' },
  save: { alignSelf: 'flex-start', paddingVertical: 7, paddingHorizontal: 13, borderRadius: BorderRadius.md },
  saveTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: '#1A1031', letterSpacing: 0.2 },
  item: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, borderTopWidth: 1, borderTopColor: Hairline.soft, paddingVertical: 6 },
  itemF: { fontSize: FontSize.labelSm, color: Colors.onSurface, fontWeight: '700', lineHeight: 15 },
  itemB: { fontSize: 9, color: Colors.muted, marginTop: 2, lineHeight: 12 },
  del: { fontSize: 16, color: Colors.muted, paddingHorizontal: 6 },
  chk: { marginTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Hairline.soft, paddingTop: 8, gap: 3 },
  chkTxt: { fontSize: 9, color: Colors.onSurfaceVariant, lineHeight: 13 },
  msg: { fontSize: 9, color: Colors.onSurfaceVariant, marginTop: 6, lineHeight: LineHeight.labelSm, fontStyle: 'italic' },
});
