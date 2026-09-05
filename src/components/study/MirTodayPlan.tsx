import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform, TextInput } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  MIR_DAILY_META, MIR_DIAS, DiaMIR, mirDiaDe, mirDiaN, mir7d, MIR_RENT, capUrl,
  mirAnclas, MIR_ANCLAS_Q, mirCierreDe, mirFranjasDe, mirSesionDe, MIR_SEG_POR_Q, mirMinutos, MIR_TEMAS_TOTAL,
} from '../../lib/mirDailyPlan';
import { DiaMIRMant, MIR_MANT_META, MIR_MANT_DIAS, mirMantFranjas, mirMantFoco, mirMant7d } from '../../lib/mirMantenimiento';
import {
  mirEvalLogAppend, mirEvalLogExportJSON, mirEvalLogLoad, mirEntradaDe, mirNeto, MIR_TIPO_ERROR, MirTipoError, MirEvalKind,
  mirCierreDeAsignatura, MIR_ESTADO_CIERRE_TXT, mirPeorAsignatura, mirColaD14, mirBaselineTabla, mirAsignaturasEnAnclasD7,
} from '../../lib/mirEvalLog';
import { mirUsmleBridge } from '../../lib/mirUsmleBridge';
import { agruparProgreso, planHoyD, progresoGlobal, GrupoProgreso, loadDone, saveDone } from '../../lib/studyProgress';
import { mirObsUrl } from '../../lib/obsidianMap';
import { mirAnkiDeck, ANKIWEB } from '../../lib/ankiLinks';

/**
 * MirTodayPlan — Plan MIR día-a-día (ProMIR), estilo USMLE/Perú. v3 Palmerton (5-sep-2026):
 *  · 3 anclas clicables (D-1 2Q · D-3 1Q · D-7 1Q) + formulario mínimo de la eval que escribe en
 *    mirEvalLog (aciertos/4 · brecha knowledge/transfer/proceso · 🇪🇸 delta · fallo D-7 → cola D+14).
 *  · Chip "Step 1 esta semana: <sistema> D#-D#" (mirUsmleBridge, lectura de usmleStep1Daily).
 *  · Test de cierre 10Q el 1er día de cada bloque · D77 mini-MIR 40Q · D78 tabla de neto (baseline).
 *  · Fallback a mirMantenimiento (4-ene→31-mar-2027) cuando no hay DiaMIR.
 *  · sáb+dom libres: no existe "repaso finde" → cola D+7/D+14.
 */
const AMBER = '#F5A623';       // ámbar España (acento oficial de la consola MIR)
const BLUE = Colors.blue;      // sapphire
const GREEN = Colors.green;    // jade
const OBS = Colors.purple;     // amethyst
const CORAL = Colors.coral;
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return MIR_DAILY_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}
const vueltaTxt = (v: number) => (v === 1 ? '1ª vuelta' : v === 2 ? '2ª vuelta' : `${v}ª vuelta`);
function copiar(texto: string): boolean {
  try { const nav = (globalThis as any).navigator; if (nav?.clipboard?.writeText) { nav.clipboard.writeText(texto); return true; } } catch { /* sin clipboard */ }
  return false;
}

function ColaItem({ icon, lbl, val, sub, color, url }: { icon: string; lbl: string; val: string; sub: string; color: string; url: string }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(url)} style={[st.cola, { borderLeftColor: color }]}>
      <Text style={st.colaIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={st.colaLbl}>{lbl}</Text>
        <Text style={st.colaVal} numberOfLines={2}>{val}</Text>
        <Text style={st.colaSub}>{sub}</Text>
      </View>
      <View style={[st.verBtn, { borderColor: color + '88' }]}><Text style={[st.verTxt, { color }]}>ver ↗</Text></View>
    </TouchableOpacity>
  );
}

/** Stepper − n + (para totales > 4) */
function Stepper({ label, value, min, max, onChange, color }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void; color: string }) {
  return (
    <View style={st.stepRow}>
      <Text style={st.stepLbl}>{label}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={() => onChange(Math.max(min, value - 1))} style={[st.stepBtn, { borderColor: color + '77' }]}><Text style={[st.stepBtnTxt, { color }]}>−</Text></TouchableOpacity>
      <Text style={[st.stepVal, { color }]}>{value}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={() => onChange(Math.min(max, value + 1))} style={[st.stepBtn, { borderColor: color + '77' }]}><Text style={[st.stepBtnTxt, { color }]}>+</Text></TouchableOpacity>
    </View>
  );
}

/**
 * Formulario mínimo de medición → mirEvalLog (append-only). Muestra la entrada ya registrada del día.
 * kind anclada: aciertos/4 + brecha + delta + toggles por ancla (D-1/D-3/D-7).
 */
function EvalForm({ dia, kind, total, asignatura, tema, color, titulo, conAnclas, onSaved }: {
  dia: { d: number; fecha: string; num?: number }; kind: MirEvalKind; total: number; asignatura: string; tema: string; color: string; titulo: string; conAnclas?: boolean; onSaved?: () => void;
}) {
  const [aciertos, setAciertos] = useState<number>(total);
  const [blancos, setBlancos] = useState<number>(0);
  const [tipo, setTipo] = useState<MirTipoError | null>(null);
  const [deltaEs, setDeltaEs] = useState(false);
  const [tiempo, setTiempo] = useState<string>('');
  const [ccsn, setCcsn] = useState<string>('');
  const [anclas, setAnclas] = useState<{ d1: boolean; d3: boolean; d7: boolean }>({ d1: true, d3: true, d7: true });
  const [msg, setMsg] = useState<string>('');
  const [tick, setTick] = useState(0);
  const previa = useMemo(() => mirEntradaDe(dia.fecha, kind), [dia.fecha, kind, tick]);
  const fallos = Math.max(0, total - aciertos - blancos);
  const r = mirNeto(aciertos, total, blancos);
  const guardar = () => {
    if (fallos > 0 && !tipo) { setMsg('Marca la brecha del fallo (knowledge / transfer / proceso).'); return; }
    const res = mirEvalLogAppend({
      fecha: dia.fecha, d: dia.d, tema, asignatura, num: dia.num, aciertos, total, blancos,
      tiempoSeg: Math.round((Number(tiempo) || 0) * 60), tipoError: fallos > 0 ? tipo : null, ccsn: ccsn.trim() || undefined,
      delta_es: deltaEs, kind, anclas: conAnclas ? anclas : undefined,
    });
    setMsg(res.guardado ? `Registrado · neto ${r.neto}/${total} (${r.netoPct} %)` : 'Sin storage en este dispositivo: no se guardó (copia el JSON).');
    setTick((t) => t + 1);
    if (onSaved) onSaved();
  };
  return (
    <View style={[st.formCard, { borderColor: color + '55' }]}>
      <Text style={[st.formTitle, { color }]}>{titulo}</Text>
      {previa && (
        <Text style={st.formPrev}>
          ✓ ya registrado hoy: {previa.aciertos}/{previa.total} · blancos {previa.blancos} · neto {mirNeto(previa.aciertos, previa.total, previa.blancos).netoPct} %{previa.tipoError ? ` · ${previa.tipoError}` : ''}{previa.delta_es ? ' · 🇪🇸 delta' : ''} (append-only: un nuevo guardado añade otra entrada)
        </Text>
      )}
      {total <= 4 ? (
        <View style={st.chipRow}>
          <Text style={st.stepLbl}>Aciertos</Text>
          {Array.from({ length: total + 1 }, (_, i) => i).map((n) => (
            <TouchableOpacity key={n} activeOpacity={0.8} onPress={() => { setAciertos(n); if (blancos > total - n) setBlancos(total - n); }} style={[st.numChip, aciertos === n && { backgroundColor: color + '33', borderColor: color }]}>
              <Text style={[st.numChipTxt, aciertos === n && { color }]}>{n}/{total}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Stepper label={`Aciertos /${total}`} value={aciertos} min={0} max={total} onChange={(n) => { setAciertos(n); if (blancos > total - n) setBlancos(total - n); }} color={color} />
      )}
      <Stepper label="En blanco" value={blancos} min={0} max={total - aciertos} onChange={setBlancos} color={Colors.muted} />
      <Text style={st.formNeto}>fallos {fallos} → neto = {aciertos} − {fallos}/3 = <Text style={{ color, fontWeight: '800' }}>{r.neto}</Text> ({r.netoPct} %)</Text>
      {conAnclas && (
        <View style={st.chipRow}>
          <Text style={st.stepLbl}>Anclas OK</Text>
          {(['d1', 'd3', 'd7'] as const).map((k) => (
            <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setAnclas((a) => ({ ...a, [k]: !a[k] }))} style={[st.numChip, anclas[k] ? { backgroundColor: GREEN + '2A', borderColor: GREEN } : { backgroundColor: CORAL + '2A', borderColor: CORAL }]}>
              <Text style={[st.numChipTxt, { color: anclas[k] ? GREEN : CORAL }]}>{k.toUpperCase().replace('D', 'D-')} {anclas[k] ? '✓' : '✗'}</Text>
            </TouchableOpacity>
          ))}
          {!anclas.d7 && <Text style={st.formHint}>fallo D-7 → el tema entra en la cola D+14</Text>}
        </View>
      )}
      {fallos > 0 && (
        <View style={st.chipRow}>
          <Text style={st.stepLbl}>Brecha</Text>
          {MIR_TIPO_ERROR.map((t) => (
            <TouchableOpacity key={t.k} activeOpacity={0.8} onPress={() => setTipo(t.k)} style={[st.numChip, tipo === t.k && { backgroundColor: CORAL + '2A', borderColor: CORAL }]}>
              <Text style={[st.numChipTxt, tipo === t.k && { color: CORAL }]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {fallos > 0 && tipo && <Text style={st.formHint}>{MIR_TIPO_ERROR.find((t) => t.k === tipo)?.desc}</Text>}
      <View style={st.chipRow}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setDeltaEs((v) => !v)} style={[st.numChip, deltaEs && { backgroundColor: AMBER + '2A', borderColor: AMBER }]}>
          <Text style={[st.numChipTxt, deltaEs && { color: AMBER }]}>🇪🇸 delta-España {deltaEs ? '✓' : ''}</Text>
        </TouchableOpacity>
        <TextInput value={tiempo} onChangeText={setTiempo} placeholder="min" placeholderTextColor={Colors.muted} keyboardType="numeric" style={st.input} />
        <TextInput value={ccsn} onChangeText={setCcsn} placeholder="CCSN (opcional)" placeholderTextColor={Colors.muted} style={[st.input, { minWidth: 120 }]} />
      </View>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <TouchableOpacity activeOpacity={0.85} onPress={guardar} style={[st.saveBtn, { backgroundColor: color }]}><Text style={st.saveBtnTxt}>Guardar en el log</Text></TouchableOpacity>
        {!!msg && <Text style={[st.formHint, { color: Colors.onSurfaceVariant }]}>{msg}</Text>}
      </View>
    </View>
  );
}

function ExportRow() {
  const [msg, setMsg] = useState('');
  const n = mirEvalLogLoad().length;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
      <TouchableOpacity activeOpacity={0.85} onPress={() => { const ok = copiar(mirEvalLogExportJSON()); setMsg(ok ? 'JSON copiado al portapapeles ✓' : 'Sin portapapeles: abre la consola y usa mirEvalLogExportJSON()'); }} style={[st.verWide, { borderColor: BLUE + '88', marginTop: 0, flex: 1 }]}>
        <Text style={[st.verTxt, { color: BLUE }]}>⤓ Exportar log JSON ({n} entradas · plan:MIR)</Text>
      </TouchableOpacity>
      {!!msg && <Text style={st.formHint}>{msg}</Text>}
    </View>
  );
}

/** Chip de puente con el Step 1 (semana actual + homólogo). */
function BridgeChip({ fecha }: { fecha: string }) {
  const b = mirUsmleBridge(fecha);
  return (
    <View style={[st.bridge, { borderColor: GREEN + '55' }]}>
      <Text style={[st.bridgeTxt, { color: GREEN }]}>🇺🇸 {b.texto}</Text>
      {!!b.textoHomologo && <Text style={st.bridgeSub}>{b.textoHomologo}</Text>}
    </View>
  );
}

/** 3 anclas clicables de la eval 15:15 (D-1 2Q · D-3 1Q · D-7 1Q). */
function AnclasView({ dia, onPick }: { dia: DiaMIR; onPick: (d: number) => void }) {
  const a = mirAnclas(dia.d);
  const enD7 = mirAsignaturasEnAnclasD7();
  return (
    <View>
      <Text style={st.secLbl}>🎯 15:15 · Evaluación anclada 4Q (2Q D-1 · 1Q D-3 · 1Q D-7) · {MIR_SEG_POR_Q} s/Q</Text>
      {MIR_ANCLAS_Q.map((q, i) => {
        const x = a[q.k];
        return (
          <FadeUp key={q.k} delay={30 + i * 25}>
            {x ? (
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(capUrl(x.capId))} style={st.anchor}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => onPick(x.d)} style={[st.dChip, { borderColor: BLUE + '88' }]}><Text style={[st.dChipTxt, { color: BLUE }]}>{q.label} · D{x.d}</Text></TouchableOpacity>
                  <Text style={st.anchorLbl}>{q.nQ}Q · {x.asignatura}</Text>
                </View>
                <Text style={st.anchorVal} numberOfLines={2}>{x.tema}</Text>
                <Text style={st.anchorSub}>test del capítulo ProMIR ↗ · {q.k === 'd7' ? 'fallo aquí → cola D+14 (no hay finde)' : 'fallo → Whole-Page del capítulo + APEX'}</Text>
              </TouchableOpacity>
            ) : (
              <View style={[st.anchor, { borderLeftColor: Hairline.medium }]}>
                <Text style={st.anchorLbl}>{q.label} · sin ancla todavía (arranque del plan)</Text>
                <Text style={st.anchorSub}>{q.nQ}Q pasan al tema D-1 hasta que exista</Text>
              </View>
            )}
          </FadeUp>
        );
      })}
      {enD7.length > 0 && <Text style={st.formHint}>Asignaturas en rotación D-7 por cierre &lt;55 %: {enD7.join(' · ')}</Text>}
    </View>
  );
}

/** Test de cierre (1er día del bloque siguiente): 10Q de la asignatura cerrada. */
function CierreCard({ dia, onSaved }: { dia: DiaMIR; onSaved: () => void }) {
  const c = mirCierreDe(dia.d);
  if (!c) return null;
  const prev = mirCierreDeAsignatura(c.asignatura);
  return (
    <FadeUp delay={30}>
      <View style={[st.temaCard, { borderColor: CORAL + '66' }]}>
        <Text style={[st.formTitle, { color: CORAL }]}>🏁 15:15–15:30 · TEST DE CIERRE · {c.asignatura} (D{c.dIni}-D{c.dFin})</Text>
        <Text style={st.temaSub}>10Q reales MIR mixtas de la asignatura · cronometrado {mirMinutos(10)} min ({MIR_SEG_POR_Q} s/Q) · en blanco permitido · neto = A − F/3 · ≥70 % consolidada · &lt;55 % entra a las anclas D-7. Sustituye hoy a la eval anclada.</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
          {c.capIds.map((id, i) => (
            <TouchableOpacity key={id} activeOpacity={0.8} onPress={() => openUrl(capUrl(id))} style={[st.dChip, { borderColor: CORAL + '66' }]}><Text style={[st.dChipTxt, { color: CORAL }]}>cap {i + 1} ↗</Text></TouchableOpacity>
          ))}
        </View>
        {prev && <Text style={[st.formHint, { marginTop: 8 }]}>Último cierre registrado: {prev.entry.fecha} · neto {prev.netoPct} % → {MIR_ESTADO_CIERRE_TXT[prev.estado]}</Text>}
        <EvalForm dia={{ d: dia.d, fecha: dia.fecha, num: c.num }} kind="cierre" total={10} asignatura={c.asignatura} tema={`Cierre ${c.asignatura}`} color={CORAL} titulo="Registrar test de cierre (10Q)" onSaved={onSaved} />
      </View>
    </FadeUp>
  );
}

function ColaD14({ hoy }: { hoy: string }) {
  const cola = mirColaD14(hoy);
  if (!cola.length) return null;
  return (
    <View style={[st.formCard, { borderColor: AMBER + '44' }]}>
      <Text style={[st.formTitle, { color: AMBER }]}>⏳ Cola D+14 (fallos en el ancla D-7)</Text>
      {cola.slice(0, 6).map((c, i) => (
        <Text key={i} style={[st.formHint, c.vencida && { color: CORAL }]}>{c.vencida ? '● ' : '○ '}{c.fechaObjetivo} · D{c.d} {c.asignatura} → {c.tema}</Text>
      ))}
    </View>
  );
}

function HoyView({ dia, onOpenTemario, hecho, onToggle, onPick, hoyISO, bump }: { dia: DiaMIR; onOpenTemario: () => void; hecho: boolean; onToggle: (d: number) => void; onPick: (d: number) => void; hoyISO: string; bump: () => void }) {
  const tier = MIR_RENT[dia.rent] || MIR_RENT.verde;
  const cierre = mirCierreDe(dia.d);
  const esTema = dia.d <= MIR_TEMAS_TOTAL;
  return (
    <View>
      <FadeUp>
        <View style={[st.temaCard, { borderColor: tier.c + '55' }]}>
          <View style={st.temaTop}>
            <TouchableOpacity activeOpacity={0.8} onPress={onOpenTemario} style={[st.sysBadge, { backgroundColor: tier.c + '1F', borderColor: tier.c + '66' }]}>
              <Text style={[st.sysBadgeTxt, { color: tier.c }]}>{dia.asignatura} ›</Text>
            </TouchableOpacity>
            <Chip label={`Rent. ${tier.t}`} color={tier.c} small />
            {dia.peso != null ? <Chip label={`Peso MIR ${dia.peso}%`} color={AMBER} small /> : null}
            {dia.sub ? <Chip label={dia.sub === 'epi' ? 'Tier S · Epi' : 'Tier S · Bioética'} color={GREEN} small /> : null}
            <Chip label={vueltaTxt(dia.vuelta)} color={GREEN} small />
            {mirObsUrl(dia.capId) && (
              <TouchableOpacity activeOpacity={0.8} onPress={() => openUrl(mirObsUrl(dia.capId)!)}
                style={[st.sysBadge, { backgroundColor: OBS + '1F', borderColor: OBS + '77' }]}>
                <Text style={[st.sysBadgeTxt, { color: OBS }]}>◆ Obsidian</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={st.temaTitle}>{dia.tema}</Text>
          <Text style={st.temaSub}>{esTema ? 'Tema atómico del día · 1/día · toca la asignatura para ver todo el temario y tu avance ›' : 'Día de medición: sin tema nuevo'}</Text>
          <TouchableOpacity activeOpacity={0.85} onPress={() => onToggle(dia.d)} style={[st.doneBtn, hecho ? st.doneBtnOn : st.doneBtnOff]}>
            <Text style={[st.doneBtnTxt, { color: hecho ? '#1A1205' : AMBER }]}>{hecho ? '✓ Completado hoy' : '○ Marcar como completado'}</Text>
          </TouchableOpacity>
        </View>
      </FadeUp>

      <BridgeChip fecha={dia.fecha} />

      {dia.d === 77 && (
        <FadeUp delay={30}>
          <View style={[st.temaCard, { borderColor: CORAL + '66' }]}>
            <Text style={[st.formTitle, { color: CORAL }]}>🏁 mini-MIR 40Q mixto · {mirMinutos(40)} min cronometrados · en blanco permitido</Text>
            <Text style={st.temaSub}>Preguntas oficiales de las 14 asignaturas (cuadernillos examenesmir.com hasta que exista el pool mapeado). Solo plantilla + neto hoy; la corrección es mañana (D78).</Text>
            <EvalForm dia={{ d: dia.d, fecha: dia.fecha }} kind="miniMIR" total={40} asignatura="Repaso integral" tema="mini-MIR 40Q" color={CORAL} titulo="Registrar mini-MIR (40Q)" onSaved={bump} />
          </View>
        </FadeUp>
      )}
      {dia.d === 78 && <BaselineView />}

      {esTema && (cierre ? <CierreCard dia={dia} onSaved={bump} /> : (
        <>
          <AnclasView dia={dia} onPick={onPick} />
          {(dia.d > 1) && <EvalForm dia={{ d: dia.d, fecha: dia.fecha, num: dia.num }} kind="anclada" total={4} asignatura={mirDiaN(dia.d - 1)?.asignatura || dia.asignatura} tema={mirDiaN(dia.d - 1)?.tema || dia.tema} color={BLUE} titulo="15:27 · Registrar eval anclada (4Q)" conAnclas onSaved={bump} />}
        </>
      ))}
      <ColaD14 hoy={hoyISO} />

      {esTema && (
        <>
          <Text style={st.secLbl}>📋 Cola de hoy · 15:30–16:15 (en orden) · 17-19 Q/día</Text>
          <FadeUp delay={60}><ColaItem icon="❓" lbl="PRE-TEST · 5Q ciegas (test del capítulo ProMIR) · 8 min" val={`${dia.asignatura} → ${dia.tema}`} sub="ProMIR → Entrenar · marca los gaps: solo eso se lee después" color={GREEN} url={capUrl(dia.capId)} /></FadeUp>
          <FadeUp delay={90}><ColaItem icon="📖" lbl="LECTURA DIRIGIDA · solo los gaps del pre-test · 15 min" val={`Whole Page Rule sobre el capítulo ProMIR${dia.resumenVid ? ` · (vídeo RESUMEN DE ASIGNATURA ${dia.resumenVid}: no es del capítulo, no verlo entero)` : ''}`} sub="vídeo solo si el clip del capítulo es ≤12 min verificado · dudas → CCSN" color={AMBER} url={capUrl(dia.capId)} /></FadeUp>
          <FadeUp delay={120}><ColaItem icon="🧪" lbl="8-10Q COMENTADAS · Rule-In → Rule-Out · 12 min" val={`Test del capítulo ProMIR · cover-the-options · ${MIR_SEG_POR_Q} s/Q`} sub="cada fallo → Shopping List (knowledge / transfer / proceso · 🇪🇸 delta)" color={BLUE} url={capUrl(dia.capId)} /></FadeUp>
          {mirObsUrl(dia.capId) && (
            <FadeUp delay={135}><ColaItem icon="◆" lbl="OBSIDIAN · nota madre del tema" val={`${dia.asignatura} → ${dia.tema}`} sub="Vault_Medicina MIR_Joseph · aquí caen los APEX de hoy (motor APEX)" color={OBS} url={mirObsUrl(dia.capId)!} /></FadeUp>
          )}
          <FadeUp delay={142}><ColaItem icon="🃏" lbl="ANKI · deck de la asignatura (FSRS · retention 0,85)" val={mirAnkiDeck(dia.asignatura)} sub="abre AnkiWeb ↗ · en Anki escritorio busca este deck exacto · preset APEX::MIR" color={Colors.teal} url={ANKIWEB} /></FadeUp>
          <FadeUp delay={150}>
            <View style={[st.cola, { borderLeftColor: AMBER }]}>
              <Text style={st.colaIcon}>🃏</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.colaLbl}>APEX · 16:05–16:15 · ≤4 desde el Shopping List</Text>
                <Text style={st.colaVal}>SAQ + por qué fisiopatológico + 🇪🇸 delta vs Perú/USA + tag {dia.usmleSystem !== '—' ? `USMLE ${dia.usmleSystem}` : 'USMLE'} · 1 de cada 4 con imagen</Text>
                <Text style={st.colaSub}>doble tag: {mirAnkiDeck(dia.asignatura)} + sistema USMLE</Text>
              </View>
            </View>
          </FadeUp>
        </>
      )}
      <ExportRow />
    </View>
  );
}

/** D78 / handoff: tabla de neto por asignatura (cierres + mini-MIR + mantenimiento). */
function BaselineView() {
  const tabla = mirBaselineTabla();
  return (
    <FadeUp delay={30}>
      <View style={[st.temaCard, { borderColor: CORAL + '66' }]}>
        <Text style={[st.formTitle, { color: CORAL }]}>📊 Tabla de neto por asignatura · baseline honesto (abr-2027)</Text>
        {tabla.length === 0 ? <Text style={st.temaSub}>Sin mediciones ciegas registradas (cierres / mini-MIR). Registra el mini-MIR de ayer y los cierres.</Text> : tabla.map((s) => (
          <View key={s.asignatura} style={st.baseRow}>
            <Text style={st.baseAsig} numberOfLines={1}>{s.asignatura}</Text>
            <Text style={[st.baseNeto, { color: s.netoPct >= 70 ? GREEN : s.netoPct < 55 ? CORAL : AMBER }]}>{s.netoPct} %</Text>
            <Text style={st.baseSub}>{s.aciertos}/{s.total} · bl {s.blancos} · 🇪🇸 {s.deltaEs}</Text>
          </View>
        ))}
        <Text style={st.formHint}>Corrección Whole-Page de cada fallo + Shopping List → APEX. &lt;55 % → anclas D-7 / viernes del mantenimiento.</Text>
      </View>
    </FadeUp>
  );
}

function HorarioView({ dia }: { dia: DiaMIR }) {
  const a = mirAnclas(dia.d);
  const cierre = mirCierreDe(dia.d);
  const franjas = mirFranjasDe(dia);
  const detalle = (tipo: string): string => {
    if (tipo === 'eval') return [a.d1 ? `D-1 ${a.d1.tema}` : '', a.d3 ? `D-3 ${a.d3.tema}` : '', a.d7 ? `D-7 ${a.d7.tema}` : ''].filter(Boolean).join(' · ') || 'sin anclas (arranque)';
    if (tipo === 'cierre') return cierre ? `${cierre.asignatura} (D${cierre.dIni}-D${cierre.dFin})` : '';
    if (tipo === 'pretest' || tipo === 'quiz') return `${dia.asignatura} → ${dia.tema}`;
    if (tipo === 'read') return `${dia.tema}${dia.resumenVid ? ` · resumen de ASIGNATURA ${dia.resumenVid} (no del capítulo)` : ''}`;
    if (tipo === 'apex') return dia.usmleSystem !== '—' ? `tag USMLE: ${dia.usmleSystem}` : '';
    return '';
  };
  return (
    <View>
      <Text style={st.secLbl}>🕓 Bloque MIR · Día {dia.d} ({fmtFecha(dia.fecha)}) · hora Lima · {MIR_SEG_POR_Q} s/Q real</Text>
      {franjas.map((f, i) => {
        const det = detalle(f.tipo);
        return (
          <FadeUp key={i} delay={i * 25}>
            <View style={st.franja}>
              <View style={st.franjaHora}><Text style={st.franjaHoraTxt}>{f.hora}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={st.franjaFase}>{f.fase}</Text>
                {det ? <Text style={st.franjaDet}>↳ {det}</Text> : null}
              </View>
            </View>
          </FadeUp>
        );
      })}
      <Text style={st.note}>15:15–15:30 = eval anclada multi-temporal (o test de cierre el 1er día de bloque). 15:30–16:15 = capítulo nuevo (pre-test → lectura dirigida → 8-10Q → APEX). Sáb y dom libres: lo que falla va a la cola D+7/D+14, no al finde.</Text>
    </View>
  );
}

function SieteView({ fromD, onPick }: { fromD: number; onPick: (d: number) => void }) {
  const win = mir7d(fromD);
  return (
    <View>
      <Text style={st.secLbl}>📆 Próximos 7 días · toca un día para abrirlo</Text>
      {win.map((x, i) => {
        const tier = MIR_RENT[x.rent] || MIR_RENT.verde;
        const cierre = mirCierreDe(x.d);
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: tier.c }]}>
              <Text style={[st.d7day, { color: tier.c }]}>D{x.d}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.tema}</Text>
                <Text style={st.d7sys}>{x.asignatura}{x.peso != null ? ` · ${x.peso}%` : ''} · {vueltaTxt(x.vuelta)}{cierre ? ` · 🏁 cierre ${cierre.asignatura}` : ''}{x.usmleSystem !== '—' ? ` · 🇺🇸 ${x.usmleSystem}` : ''}</Text>
              </View>
              <Text style={st.d7go}>→</Text>
            </TouchableOpacity>
          </FadeUp>
        );
      })}
    </View>
  );
}

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <View style={st.barTrack}>
      <View style={[st.barFill, { width: (`${Math.max(0, Math.min(100, pct))}%` as any), backgroundColor: color }]} />
    </View>
  );
}

function AsignaturaCard({ g, hoyD, onPick, done, onToggle }: { g: GrupoProgreso<DiaMIR>; hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const tier = MIR_RENT[g.dias[0].rent] || MIR_RENT.verde;
  const pesoBloque = Math.round(g.dias.reduce((s, x) => s + (x.peso || 0), 0) * 10) / 10;
  const cierre = mirCierreDeAsignatura(g.clave);
  const estadoTxt = g.estado === 'completado' ? '✓ completado' : g.estado === 'en-curso' ? `en curso · ${g.pct}%` : `pendiente · empieza D${g.primerD}`;
  const estadoColor = g.estado === 'completado' ? GREEN : g.estado === 'en-curso' ? tier.c : Colors.muted;
  return (
    <View style={[st.sysCard, { borderColor: tier.c + (g.estado === 'en-curso' ? '88' : '2E') }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
        <View style={st.sysHead}>
          <Text style={st.sysTitle} numberOfLines={1}>{open ? '▾' : '▸'} {g.clave}</Text>
          {pesoBloque > 0 ? <Text style={[st.sysPeso, { color: AMBER }]}>{pesoBloque}% cubierto</Text> : null}
          <Text style={[st.sysCount, { color: estadoColor }]}>{g.hechos}/{g.total}</Text>
        </View>
        <ProgressBar pct={g.pct} color={tier.c} />
        <Text style={[st.sysEstado, { color: estadoColor }]}>
          {estadoTxt}{g.diaActual ? ` · hoy: ${g.diaActual.tema}` : ''}{g.dias[0].usmleSystem !== '—' ? ` · 🇺🇸 ${g.dias[0].usmleSystem}` : ''}{cierre ? ` · cierre ${cierre.netoPct} %` : ''}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(capUrl(g.dias[0].capId))} style={[st.verWide, { borderColor: tier.c + '88' }]}>
        <Text style={[st.verTxt, { color: tier.c }]}>Ver todo el temario en ProMIR ↗</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: 8 }}>
          {g.dias.map((x) => {
            const hecho = done.has(x.d), now = x.d === hoyD;
            return (
              <View key={x.d} style={[st.temaRow, now && st.temaRowOn]}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle(x.d)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
                  <Text style={[st.temaChk, { color: hecho ? GREEN : 'rgba(255,255,255,0.25)' }]}>{hecho ? '☑' : '☐'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={st.temaRowMain}>
                  <Text style={[st.temaRowD, { color: hecho ? GREEN : now ? tier.c : Colors.muted }]}>{now ? '▶' : ''} D{x.d}</Text>
                  <Text style={st.temaRowTxt} numberOfLines={1}>{x.tema}{x.peso != null ? ` · ${x.peso}%` : ''}</Text>
                  <Text style={st.temaRowGo}>→</Text>
                </TouchableOpacity>
                {mirObsUrl(x.capId) && (
                  <TouchableOpacity activeOpacity={0.7} onPress={() => openUrl(mirObsUrl(x.capId)!)} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}>
                    <Text style={{ fontSize: 13, color: OBS, width: 18, textAlign: 'center' }}>◆</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

function TemarioView({ hoyD, onPick, done, onToggle }: { hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const grupos = agruparProgreso(MIR_DIAS, (x) => x.asignatura, hoyD, done);
  const glob = progresoGlobal(MIR_DIAS, done);
  return (
    <View>
      <View style={st.globCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={st.globTitle}>🗂️ Temario MIR · progreso del plan</Text>
          <Text style={[st.globPct, { color: AMBER }]}>{glob.pct}%</Text>
        </View>
        <ProgressBar pct={glob.pct} color={AMBER} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} días · hoy = Día {hoyD} de {glob.total} · {grupos.length} bloques · 1ª vuelta · selección top-N por Peso MIR + núcleo rabi_94 · cobertura {MIR_DAILY_META.coberturaPeso} pts (óptimo {MIR_DAILY_META.optimoTopN}; plan previo 744)</Text>
      </View>
      {grupos.map((g) => <AsignaturaCard key={g.clave} g={g} hoyD={hoyD} onPick={onPick} done={done} onToggle={onToggle} />)}
      <Text style={st.note}>Progreso REAL: empezamos en 0%. ☑ marca un tema como completado (se guarda en este dispositivo). ▶ = día de hoy. Toca el título de un tema para ir a ese día. "% cubierto" = suma del Peso MIR de los capítulos elegidos de esa asignatura.</Text>
    </View>
  );
}

/** Modo MANTENIMIENTO (4-ene→31-mar-2027): banqueo puro sin contenido nuevo. */
function MantenimientoView({ dia, onPick, bump }: { dia: DiaMIRMant; onPick: (d: number) => void; bump: () => void }) {
  const peor = mirPeorAsignatura();
  const foco = mirMantFoco(dia, peor);
  const franjas = mirMantFranjas(dia);
  const color = dia.tipo === 'viernes' ? CORAL : dia.modo === 'reducido' ? Colors.muted : AMBER;
  return (
    <View>
      <FadeUp>
        <View style={[st.temaCard, { borderColor: color + '66' }]}>
          <View style={st.temaTop}>
            <Chip label={dia.modo === 'reducido' ? 'REDUCIDO · Fase B/C Step 1' : 'BANQUEO'} color={color} small />
            <Chip label={dia.tipo === 'viernes' ? 'viernes · asignatura peor del log' : `rotación ponderada · sem ${dia.semana}`} color={BLUE} small />
            <Chip label={`${foco.nQ}Q · ${dia.minQ} min · ${MIR_SEG_POR_Q} s/Q`} color={GREEN} small />
          </View>
          <Text style={st.temaTitle}>{foco.asignatura}{dia.asignatura2 ? ` + ${dia.asignatura2}` : ''}</Text>
          <Text style={st.temaSub}>{dia.tema}</Text>
          {dia.tipo === 'viernes' && <Text style={[st.formHint, { marginTop: 6 }]}>{foco.origen === 'log' ? `Asignatura elegida por el log (peor neto): ${foco.asignatura}` : `Sin dato suficiente en el log → fallback por peso: ${foco.asignatura}`}</Text>}
        </View>
      </FadeUp>
      <BridgeChip fecha={dia.fecha} />
      <Text style={st.secLbl}>🕓 Franjas · {fmtFecha(dia.fecha)}</Text>
      {franjas.map((f, i) => (
        <FadeUp key={i} delay={i * 25}>
          <View style={st.franja}>
            <View style={st.franjaHora}><Text style={st.franjaHoraTxt}>{f.hora}</Text></View>
            <Text style={[st.franjaFase, { flex: 1 }]}>{f.fase}</Text>
          </View>
        </FadeUp>
      ))}
      <FadeUp delay={100}><ColaItem icon="🃏" lbl="ANKI · APEX::MIR (todas las asignaturas)" val={mirAnkiDeck(foco.asignatura)} sub="AnkiWeb ↗ · preset FSRS retention 0,85 hasta 31-mar (→ 0,90 en fase principal)" color={Colors.teal} url={ANKIWEB} /></FadeUp>
      <FadeUp delay={120}><ColaItem icon="🧪" lbl={`${foco.nQ}Q reales MIR · cronometradas`} val={`${foco.asignatura}${dia.asignatura2 ? ` (+ ${dia.asignatura2} interleaving)` : ''}`} sub="cuadernillos oficiales gratis (examenesmir) o test por asignatura ProMIR · en blanco permitido" color={AMBER} url="https://www.examenesmir.com/examenes-mir" /></FadeUp>
      <EvalForm dia={{ d: dia.d, fecha: dia.fecha, num: foco.num ?? undefined }} kind="mantenimiento" total={foco.nQ} asignatura={foco.asignatura} tema={`Mantenimiento ${dia.tipo} ${foco.nQ}Q`} color={color} titulo={`Registrar ${foco.nQ}Q (${dia.minCorr} min corrección)`} onSaved={bump} />
      <ExportRow />
      <Text style={st.secLbl}>📆 Próximos 7 días</Text>
      {mirMant7d(dia.d).map((x, i) => (
        <FadeUp key={x.d} delay={i * 25}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: x.tipo === 'viernes' ? CORAL : AMBER }]}>
            <Text style={[st.d7day, { color: x.tipo === 'viernes' ? CORAL : AMBER }]}>M{x.d}</Text>
            <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
            <View style={{ flex: 1 }}>
              <Text style={st.d7sub} numberOfLines={1}>{x.asignatura}{x.asignatura2 ? ` + ${x.asignatura2}` : ''}</Text>
              <Text style={st.d7sys}>{x.modo} · {x.tipo} · {x.nQ}Q</Text>
            </View>
            <Text style={st.d7go}>→</Text>
          </TouchableOpacity>
        </FadeUp>
      ))}
      <Text style={st.note}>{MIR_MANT_META.handoff}</Text>
    </View>
  );
}

export default function MirTodayPlan() {
  const iso = todayISO();
  const sesion = mirSesionDe(iso);
  const hoyD = planHoyD(MIR_DIAS, iso);
  const todayDia = mirDiaDe(iso) || MIR_DIAS.find((x) => x.d === hoyD) || MIR_DIAS[0];
  const enMant = !mirDiaDe(iso) && iso > MIR_DAILY_META.fin && MIR_MANT_DIAS.length > 0;
  const [modo, setModo] = useState<'plan' | 'mant'>(sesion?.tipo === 'mantenimiento' || enMant ? 'mant' : 'plan');
  const [sel, setSel] = useState<number>(todayDia.d);
  const [selM, setSelM] = useState<number>(() => planHoyD(MIR_MANT_DIAS, iso));
  const [view, setView] = useState<'hoy' | 'horario' | '7d' | 'temario'>('hoy');
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone('mir')));
  const [, setTick] = useState(0);
  const bump = () => setTick((t) => t + 1);
  const dia = MIR_DIAS.find((x) => x.d === sel) || MIR_DIAS[0];
  const diaM = MIR_MANT_DIAS.find((x) => x.d === selM) || MIR_MANT_DIAS[0];
  const esHoy = dia.fecha === iso;
  const pickDay = (d: number) => { setSel(d); setView('hoy'); };
  const toggleDone = (d: number) => setDone((prev) => {
    const n = new Set(prev);
    if (n.has(d)) n.delete(d); else n.add(d);
    saveDone('mir', Array.from(n));
    return n;
  });

  return (
    <View>
      {/* Contexto: MIR · vuelta / mantenimiento */}
      <View style={st.ctxRow}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => setModo('plan')} style={[st.ctxBtn, modo === 'plan' ? st.ctxActive : st.ctxSoon]}>
          <Text style={[st.ctxBig, modo !== 'plan' && { color: Colors.muted }]}>MIR 2030</Text>
          <Text style={st.ctxSub}>1ª vuelta · ProMIR · 78 d (7-sep→23-dic)</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={() => setModo('mant')} style={[st.ctxBtn, modo === 'mant' ? st.ctxActive : st.ctxSoon]}>
          <Text style={[st.ctxBig, modo !== 'mant' && { color: Colors.muted }]}>Banqueo</Text>
          <Text style={st.ctxSub}>ene→mar 2027 · {MIR_MANT_META.totalDias} d · 25Q/día</Text>
        </TouchableOpacity>
        <View style={[st.ctxBtn, st.ctxSoon]}><Text style={[st.ctxBig, { color: Colors.muted }]}>2ª vuelta</Text><Text style={st.ctxSub}>abr-2027 (fase principal)</Text></View>
      </View>

      {modo === 'mant' && diaM ? (
        <>
          <View style={st.navRow}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setSelM((s) => Math.max(1, s - 1))} style={st.navArrow}><Text style={st.navArrowTxt}>◄</Text></TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={st.navDay}>Mantenimiento {diaM.d}/{MIR_MANT_META.totalDias}{diaM.fecha === iso ? ' · HOY' : ''}</Text>
              <Text style={st.navFecha}>{fmtFecha(diaM.fecha)} · {diaM.fecha}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setSelM((s) => Math.min(MIR_MANT_META.totalDias, s + 1))} style={st.navArrow}><Text style={st.navArrowTxt}>►</Text></TouchableOpacity>
          </View>
          <GlassPanel style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
            <MantenimientoView dia={diaM} onPick={(d) => setSelM(d)} bump={bump} />
          </GlassPanel>
        </>
      ) : (
        <>
          <View style={st.navRow}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.max(1, s - 1))} style={st.navArrow}><Text style={st.navArrowTxt}>◄</Text></TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={st.navDay}>Día {dia.d}/{MIR_DAILY_META.totalDias}{esHoy ? ' · HOY' : ''}</Text>
              <Text style={st.navFecha}>{fmtFecha(dia.fecha)} · {dia.fecha}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.min(MIR_DAILY_META.totalDias, s + 1))} style={st.navArrow}><Text style={st.navArrowTxt}>►</Text></TouchableOpacity>
          </View>
          {!esHoy && <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(todayDia.d)} style={st.hoyBtn}><Text style={st.hoyBtnTxt}>↩ volver a HOY</Text></TouchableOpacity>}

          <View style={st.subTabs}>
            {([['hoy', '📋 HOY'], ['horario', '🕓 Horario'], ['7d', '📆 7 días'], ['temario', '🗂️ Temario']] as const).map(([k, lbl]) => (
              <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
                <Text style={[st.subTabTxt, view === k && { color: AMBER }]}>{lbl}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <GlassPanel style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
            {view === 'hoy' ? <HoyView dia={dia} onOpenTemario={() => setView('temario')} hecho={done.has(dia.d)} onToggle={toggleDone} onPick={pickDay} hoyISO={iso} bump={bump} />
              : view === 'horario' ? <HorarioView dia={dia} />
              : view === '7d' ? <SieteView fromD={dia.d} onPick={pickDay} />
              : <TemarioView hoyD={hoyD} onPick={pickDay} done={done} onToggle={toggleDone} />}
          </GlassPanel>
        </>
      )}
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, ...Elevation.sm };
const WEB_LINK = { cursor: 'pointer', transition: Motion.base } as any;
const st = StyleSheet.create({
  ctxRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  ctxBtn: { flex: 1, borderRadius: BorderRadius.lg, borderWidth: 1, paddingVertical: Spacing.md, alignItems: 'center', ...WEB_LINK },
  ctxActive: { backgroundColor: AMBER + '1A', borderColor: AMBER + '88', ...Elevation.glow(AMBER) },
  ctxSoon: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: Hairline.medium },
  ctxBig: { fontSize: FontSize.titleMd, fontWeight: '900', color: AMBER, letterSpacing: 0.4 },
  ctxSub: { fontSize: 9, color: Colors.muted, marginTop: 3, letterSpacing: 0.2, textAlign: 'center' },

  navRow: { flexDirection: 'row', alignItems: 'center', ...cardBase, padding: Spacing.sm, marginBottom: Spacing.xs },
  navArrow: { width: 40, height: 40, borderRadius: BorderRadius.md, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: Hairline.soft, alignItems: 'center', justifyContent: 'center', ...WEB_LINK },
  navArrowTxt: { fontSize: 16, color: AMBER, fontWeight: '800' },
  navDay: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.3 },
  navFecha: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2, letterSpacing: 0.2 },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm, ...WEB_LINK },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: AMBER, fontWeight: '700', letterSpacing: 0.2 },

  subTabs: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm },
  subTab: { flex: 1, paddingVertical: 8, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, alignItems: 'center', ...WEB_LINK },
  subTabOn: { backgroundColor: AMBER + '14', borderColor: AMBER + '55' },
  subTabTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted, letterSpacing: 0.2 },

  temaCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm, ...Elevation.md },
  temaTop: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  sysBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 11, ...WEB_LINK },
  sysBadgeTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },
  temaTitle: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: 9, lineHeight: 22, letterSpacing: -0.3 },
  temaSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, lineHeight: LineHeight.labelSm },
  doneBtn: { marginTop: 11, paddingVertical: 10, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center', ...WEB_LINK },
  doneBtnOff: { backgroundColor: AMBER + '14', borderColor: AMBER + '66' },
  doneBtnOn: { backgroundColor: AMBER, borderColor: AMBER, ...Elevation.glow(AMBER) },
  doneBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },

  bridge: { ...cardBase, borderLeftWidth: 3, borderLeftColor: GREEN, padding: Spacing.sm, paddingHorizontal: Spacing.md, marginBottom: Spacing.sm },
  bridgeTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },
  bridgeSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 3, lineHeight: LineHeight.labelSm },

  anchor: { ...cardBase, borderLeftWidth: 3, borderLeftColor: BLUE, padding: Spacing.md, marginBottom: 6, ...WEB_LINK },
  anchorLbl: { fontSize: FontSize.labelMd, fontWeight: '800', color: BLUE, letterSpacing: 0.2, flex: 1 },
  anchorVal: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface, marginTop: 4, letterSpacing: -0.2 },
  anchorSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 3, lineHeight: LineHeight.labelSm },
  dChip: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 9, ...WEB_LINK },
  dChipTxt: { fontSize: 10, fontWeight: '800', letterSpacing: 0.3 },

  formCard: { ...cardBase, padding: Spacing.md, marginBottom: Spacing.sm, marginTop: 4 },
  formTitle: { fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: -0.2, marginBottom: 6 },
  formPrev: { fontSize: FontSize.labelSm, color: GREEN, marginBottom: 6, lineHeight: LineHeight.labelSm },
  formNeto: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginVertical: 4 },
  formHint: { fontSize: FontSize.labelSm, color: Colors.muted, lineHeight: LineHeight.labelSm, marginTop: 2 },
  chipRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginVertical: 4 },
  numChip: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 10, backgroundColor: 'rgba(255,255,255,0.03)', ...WEB_LINK },
  numChipTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.muted, letterSpacing: 0.2 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 4 },
  stepLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.5, textTransform: 'uppercase', minWidth: 70 },
  stepBtn: { width: 30, height: 30, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.04)', ...WEB_LINK },
  stepBtnTxt: { fontSize: 16, fontWeight: '800' },
  stepVal: { fontSize: FontSize.bodyLg, fontWeight: '900', minWidth: 32, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 8, color: Colors.onSurface, fontSize: FontSize.labelSm, minWidth: 56, backgroundColor: 'rgba(255,255,255,0.03)' },
  saveBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: BorderRadius.md, marginTop: 6, ...WEB_LINK },
  saveBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', color: '#1A1205', letterSpacing: 0.2 },

  baseRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6, borderTopWidth: 1, borderTopColor: Hairline.soft },
  baseAsig: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  baseNeto: { fontSize: FontSize.labelLg, fontWeight: '900', width: 56, textAlign: 'right' },
  baseSub: { fontSize: 9, color: Colors.muted, width: 110, textAlign: 'right' },

  secLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 9, marginTop: Spacing.sm },
  cola: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 6, ...WEB_LINK },
  colaIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  colaLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4, textTransform: 'uppercase' },
  colaVal: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600', marginTop: 3, lineHeight: 16 },
  colaSub: { fontSize: 9, color: Colors.muted, marginTop: 3, lineHeight: 13 },
  verBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 11, alignItems: 'center', ...WEB_LINK },
  verWide: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 11, alignItems: 'center', marginTop: 8, ...WEB_LINK },
  verTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },

  franja: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 8, borderTopWidth: 1, borderTopColor: Hairline.soft },
  franjaHora: { backgroundColor: AMBER + '14', borderRadius: BorderRadius.sm, paddingVertical: 4, paddingHorizontal: 8, minWidth: 96, alignItems: 'center' },
  franjaHoraTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: AMBER, letterSpacing: 0.2 },
  franjaFase: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17 },
  franjaDet: { fontSize: FontSize.labelSm, color: AMBER, marginTop: 3, fontWeight: '600' },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: LineHeight.labelSm },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.sm, marginBottom: 5, ...WEB_LINK },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 36, letterSpacing: -0.2 },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  d7go: { fontSize: 16, color: AMBER, fontWeight: '800', width: 18, textAlign: 'center' },

  // Temario
  globCard: { ...cardBase, padding: Spacing.md, marginBottom: Spacing.sm },
  globTitle: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  globPct: { fontSize: FontSize.bodyLg, fontWeight: '900', letterSpacing: -0.3 },
  globSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 6, lineHeight: LineHeight.labelSm },
  barTrack: { height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  barFill: { height: 7, borderRadius: 4, ...(Platform.OS === 'web' ? { transition: Motion.spring } as any : {}) },
  sysCard: { ...cardBase, padding: Spacing.md, marginBottom: 6 },
  sysHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 },
  sysTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flex: 1, letterSpacing: -0.2 },
  sysPeso: { fontSize: FontSize.labelMd, fontWeight: '800', marginLeft: 8 },
  sysCount: { fontSize: FontSize.labelMd, fontWeight: '800', marginLeft: 8 },
  sysEstado: { fontSize: FontSize.labelSm, fontWeight: '700', marginTop: 6, letterSpacing: 0.2 },
  temaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 7, paddingHorizontal: 6, borderRadius: BorderRadius.sm, borderTopWidth: 1, borderTopColor: Hairline.soft, ...WEB_LINK },
  temaRowOn: { backgroundColor: AMBER + '12' },
  temaRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  temaChk: { fontSize: 16, width: 22, textAlign: 'center' },
  temaRowD: { fontSize: FontSize.labelSm, fontWeight: '800', width: 40 },
  temaRowTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  temaRowGo: { fontSize: 14, color: Colors.muted, width: 16, textAlign: 'center' },
});
