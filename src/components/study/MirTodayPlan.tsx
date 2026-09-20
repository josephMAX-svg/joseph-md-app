import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform, TextInput } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  MIR_DAILY_META, MIR_DIAS, DiaMIR, mirDiaDe, mirDiaN, mir7d, MIR_RENT, capUrl,
  mirCierreDe, mirFranjasDe, mirSesionDe, MIR_SEG_POR_Q, mirMinutos, MIR_TEMAS_TOTAL,
} from '../../lib/mirDailyPlan';
import { DiaMIRMant, MIR_MANT_META, MIR_MANT_DIAS, mirMantFranjas, mirMantFoco, mirMant7d, mirMantProximoTierC } from '../../lib/mirMantenimiento';
import {
  mirEvalLogAppend, mirEvalLogExportJSON, mirEvalLogLoad, mirEvalLogPull, mirEntradaDe, mirNeto, MIR_TIPO_ERROR, MirTipoError, MirEvalKind,
  mirCierreDeAsignatura, mirEstadoCierreTxt, mirCierreUmbral, mirPeorAsignatura, mirColaD14, mirBaselineTabla, mirAsignaturasEnAnclasD7,
  mirAnclasDinamicas, MirAnclaSlot, mirEstadosTemas, MirTemaEstado, MIR_AJUSTES, MirAjuste, mirTemasQueExigenAjuste,
  mirAgregadoAsignatura, MIR_AGREGADO_MIN_Q, mirUsadasIds, MIR_VALIDACION_TXT, MIR_GATE, MirEvalEntry,
} from '../../lib/mirEvalLog';
import {
  preguntasSinUsar, preguntasSinUsarDeAsignatura, preguntasMixtasSinUsar, mezclaDeterminista, mirPoolDisponible, MirPreguntaOficial,
} from '../../lib/mirPreguntasOficiales';
import { MirPoolLista, poolConFallback } from './MirPoolEval';
import { mirUsmleBridge } from '../../lib/mirUsmleBridge';
import { agruparProgreso, planHoyD, progresoGlobal, GrupoProgreso, loadDone, saveDone } from '../../lib/studyProgress';
import { mirObsUrl } from '../../lib/obsidianMap';
import { mirAnkiDeck, ANKIWEB } from '../../lib/ankiLinks';

/**
 * MirTodayPlan — Plan MIR día-a-día (ProMIR), estilo USMLE/Perú. v3 Palmerton (5-sep-2026) + v3b (12-sep-2026):
 *  · Anclas DINÁMICAS: D-1 fijo (2Q) + 2 slots que priorizan temas 'caliente' del gate (mirAnclasDinamicas);
 *    formulario de la eval que escribe en mirEvalLog con el D# real de cada slot (anclasD).
 *  · GATE PALMERTON por tema (gap 1): se registran el pre-test 5Q y el quiz 8-10Q (kind 'quiz', 20 s);
 *    pre-test + quiz + ancla D-1 ≥80 % → ✓ validado; quiz <60 % / acumulado <50 % / ancla ✗ → ● caliente
 *    (ocupa un slot mañana hasta 2 aciertos seguidos); al 2º fallo del tema, `ajuste` obligatorio.
 *  · Táctica −1/3 (gap 6): campos opcionales blancos acertables / fallos entre dos / cambiadas + cronómetro
 *    77 s/Q (4Q/10Q/25Q/40Q, aviso a 100 s por pregunta, sin librerías).
 *  · 🇪🇸 chip 'delta previsible' en los días con `delta:true` (DATA/MIR/DELTA_ESPANA.md).
 *  · Espejo Supabase: al montar, mirEvalLogPull() fusiona por id en ambos sentidos (fallback silencioso).
 *  · Chip "Step 1 esta semana: <sistema> D#-D#" (mirUsmleBridge, lectura de usmleStep1Daily).
 *  · Test de cierre 10Q el 1er día de cada bloque · D77 mini-MIR 40Q · D78 tabla de neto (baseline).
 *  · Fallback a mirMantenimiento (4-ene→31-mar-2027) cuando no hay DiaMIR. sáb+dom libres → cola D+14.
 *  · Regla v3b (gap 11): los APEX MIR se crean DIRECTAMENTE en Anki hasta que el redeploy de n8n esté verificado.
 *  · Pool oficial (19-sep-2026, DATA/MIR/POOL_USO.md §2-§5): anclada 4Q · pre-test 5Q · quiz 8-10Q · cierre 10Q · mini-MIR 40Q
 *    reservan `qIds` en orden horario del día (cada segmento excluye las usadas del log + las reservadas antes ese día; si el
 *    segmento ya se guardó, se muestran sus ids); banqueo: foco + 2.º EvalForm los jueves Tier C (`dia.tierC`, entrada propia);
 *    vista de pregunta con `preguntaPorId` (MirPoolEval.tsx). Fallback declarado: test del capítulo/asignatura ProMIR.
 */
const AMBER = '#F5A623';       // ámbar España (acento oficial de la consola MIR)
const BLUE = Colors.blue;      // sapphire
const GREEN = Colors.green;    // jade
const OBS = Colors.purple;     // amethyst
const CORAL = Colors.coral;
const APEX_DIRECTO_ANKI = 'Crea los APEX DIRECTAMENTE en Anki escritorio (no por la nota Obsidian / n8n) hasta que el redeploy de n8n esté verificado con un test multilínea real.';
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
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
type SyncInfo = { ok: boolean; anadidas: number; subidas: number; remotas: number } | null;

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

/** Sección plegable (los formularios de pre-test / quiz / táctica no deben ocupar pantalla si no se usan). */
function Plegable({ titulo, color, abierto = false, children }: { titulo: string; color: string; abierto?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(abierto);
  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)} style={[st.plegHead, { borderColor: color + '55' }]}>
        <Text style={[st.plegTxt, { color }]}>{open ? '▾' : '▸'} {titulo}</Text>
      </TouchableOpacity>
      {open ? children : null}
    </View>
  );
}

/** Cronómetro 77 s/Q (gap 6): cuenta atrás del bloque + reloj por pregunta con aviso a 100 s. Sin librerías. */
function TimerQ({ color, presets = [4, 10, 25, 40], segPorQ = MIR_SEG_POR_Q, aviso = 100 }: { color: string; presets?: number[]; segPorQ?: number; aviso?: number }) {
  const [nQ, setNQ] = useState(presets[0]);
  const [restante, setRestante] = useState(presets[0] * segPorQ);
  const [lap, setLap] = useState(0);
  const [q, setQ] = useState(1);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!on) return;
    const id = setInterval(() => { setRestante((r) => Math.max(0, r - 1)); setLap((l) => l + 1); }, 1000);
    return () => clearInterval(id);
  }, [on]);
  useEffect(() => { if (restante === 0 && on) setOn(false); }, [restante, on]);
  const reset = (n: number) => { setOn(false); setNQ(n); setRestante(n * segPorQ); setLap(0); setQ(1); };
  const siguiente = () => { setQ((x) => Math.min(nQ, x + 1)); setLap(0); };
  const transcurrido = nQ * segPorQ - restante;
  const ritmoQ = Math.min(nQ, Math.floor(transcurrido / segPorQ) + 1);
  const atrasado = q < ritmoQ;
  const alerta = lap >= aviso;
  return (
    <View style={[st.formCard, { borderColor: color + '44' }]}>
      <View style={st.chipRow}>
        <Text style={st.stepLbl}>⏱ Bloque</Text>
        {presets.map((n) => (
          <TouchableOpacity key={n} activeOpacity={0.8} onPress={() => reset(n)} style={[st.numChip, nQ === n && { backgroundColor: color + '33', borderColor: color }]}>
            <Text style={[st.numChipTxt, nQ === n && { color }]}>{n}Q · {mirMinutos(n)} min</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={st.timerRow}>
        <Text style={[st.timerBig, { color: restante === 0 ? CORAL : atrasado ? AMBER : color }]}>{mmss(restante)}</Text>
        <View style={{ flex: 1 }}>
          <Text style={[st.timerLap, { color: alerta ? CORAL : Colors.onSurface }]}>Q {q}/{nQ} · esta pregunta: {lap} s{alerta ? ' · ≥100 s → adivina-marca-avanza' : ''}</Text>
          <Text style={st.formHint}>{segPorQ} s/Q real · ritmo esperado: Q {ritmoQ}{atrasado ? ' (vas por detrás)' : ''} · no cambies respuestas salvo error objetivo de lectura</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => setOn((v) => !v)} style={[st.saveBtn, { backgroundColor: color, marginTop: 0 }]}><Text style={st.saveBtnTxt}>{on ? '⏸ Pausa' : restante === 0 ? '✓ Tiempo' : '▶ Iniciar'}</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={siguiente} style={[st.verBtn, { borderColor: color + '88' }]}><Text style={[st.verTxt, { color }]}>siguiente Q →</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={() => reset(nQ)} style={[st.verBtn, { borderColor: Colors.muted + '88' }]}><Text style={[st.verTxt, { color: Colors.muted }]}>⟲ reset</Text></TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * Formulario mínimo de medición → mirEvalLog (append-only + espejo Supabase). Muestra la entrada ya registrada.
 *  · kind anclada: aciertos/4 + brecha + delta + toggles por slot (D-1 + 2 dinámicos) → anclasD real.
 *  · kind pretest / quiz: `temaD` alimenta el gate del tema; quiz <60 % → caliente; 2º fallo → `ajuste` obligatorio.
 *  · `tactica`: blancos acertables / fallos entre dos / cambiadas (opcionales, plegados).
 *  · `qIds`: ids del pool oficial consumidos (anti-repetición) si el pool existe.
 */
function EvalForm({ dia, kind, total, totalOpciones, asignatura, tema, capId, temaD, color, titulo, conAnclas, slots, tactica, qIds, onSaved }: {
  dia: { d: number; fecha: string; num?: number }; kind: MirEvalKind; total: number; totalOpciones?: number[]; asignatura: string; tema: string;
  capId?: string; temaD?: number; color: string; titulo: string; conAnclas?: boolean; slots?: MirAnclaSlot[]; tactica?: boolean; qIds?: string[]; onSaved?: () => void;
}) {
  const [tot, setTot] = useState<number>(total);
  const [aciertos, setAciertos] = useState<number>(total);
  const [blancos, setBlancos] = useState<number>(0);
  const [tipo, setTipo] = useState<MirTipoError | null>(null);
  const [deltaEs, setDeltaEs] = useState(false);
  const [tiempo, setTiempo] = useState<string>('');
  const [ccsn, setCcsn] = useState<string>('');
  const [anclas, setAnclas] = useState<{ d1: boolean; d3: boolean; d7: boolean }>({ d1: true, d3: true, d7: true });
  const [ajuste, setAjuste] = useState<MirAjuste | null>(null);
  const [bAcert, setBAcert] = useState(0);
  const [fDos, setFDos] = useState(0);
  const [camb, setCamb] = useState(0);
  const [cambF, setCambF] = useState(0);
  const [tacticaOn, setTacticaOn] = useState(false);
  const [msg, setMsg] = useState<string>('');
  const [tick, setTick] = useState(0);
  const previa = useMemo(() => kind === 'mantenimiento'
    ? mirEvalLogLoad().filter((e) => e.fecha === dia.fecha && e.kind === kind && e.asignatura === asignatura).sort((a, b) => (b.ts || '').localeCompare(a.ts || ''))[0]
    : mirEntradaDe(dia.fecha, kind, undefined, kind === 'pretest' || kind === 'quiz' ? dia.d : undefined), [dia.fecha, dia.d, kind, asignatura, tick]);
  const fallos = Math.max(0, tot - aciertos - blancos);
  const r = mirNeto(aciertos, tot, blancos);
  const pct = tot ? Math.round((aciertos / tot) * 1000) / 10 : 0;
  const cambiarTotal = (n: number) => { setTot(n); setAciertos((a) => Math.min(a, n)); setBlancos((b) => Math.min(b, Math.max(0, n - Math.min(aciertos, n)))); };
  // temas que fallarían con este registro (gate) → ¿exigen ajuste?
  const temasQueFallan: number[] = kind === 'quiz' && temaD && pct < MIR_GATE.quizMinPct ? [temaD]
    : conAnclas && slots ? slots.filter((s) => s.dia && !anclas[s.k]).map((s) => s.dia!.d) : [];
  const exigen = useMemo(() => (temasQueFallan.length ? mirTemasQueExigenAjuste(temasQueFallan) : []), [temasQueFallan.join(','), tick]);
  const hayFallo = fallos > 0 || temasQueFallan.length > 0;
  const guardar = () => {
    if (fallos > 0 && !tipo) { setMsg('Marca la brecha del fallo (knowledge / transfer / proceso).'); return; }
    if (exigen.length && !ajuste) { setMsg(`2º fallo de ${exigen.map((s) => `D${s.d} ${s.tema}`).join(' · ')}: marca el AJUSTE (recursos / comprensión / aplicación / retención) — Palmerton: no sigas sin diagnosticar la raíz.`); return; }
    const anclasD = slots ? { d1: slots[0]?.dia?.d, d3: slots[1]?.dia?.d, d7: slots[2]?.dia?.d } : undefined;
    const res = mirEvalLogAppend({
      fecha: dia.fecha, d: dia.d, tema, asignatura, num: dia.num, capId, aciertos, total: tot, blancos,
      tiempoSeg: Math.round((Number(tiempo) || 0) * 60), tipoError: fallos > 0 ? tipo : null, ccsn: ccsn.trim() || undefined,
      delta_es: deltaEs, kind, anclas: conAnclas ? anclas : undefined, anclasD: conAnclas ? anclasD : undefined,
      ajuste: ajuste || undefined, qIds: qIds && qIds.length ? qIds : undefined,
      blancosAcertables: tacticaOn ? bAcert : undefined, fallosEntreDos: tacticaOn ? fDos : undefined,
      cambiadas: tacticaOn ? camb : undefined, cambiadasAFallo: tacticaOn ? cambF : undefined,
    });
    const gate = kind === 'quiz' ? (pct < MIR_GATE.quizMinPct ? ' · quiz <60 % → tema CALIENTE (ancla de mañana)' : pct >= MIR_GATE.validadoPct ? ' · ≥80 %' : '') : '';
    setMsg(res.guardado ? `Registrado · neto ${r.neto}/${tot} (${r.netoPct} %)${gate} · espejo Supabase en segundo plano` : 'Sin storage en este dispositivo: no se guardó (copia el JSON).');
    setTick((t) => t + 1);
    if (onSaved) onSaved();
  };
  return (
    <View style={[st.formCard, { borderColor: color + '55' }]}>
      <Text style={[st.formTitle, { color }]}>{titulo}</Text>
      {previa && (
        <Text style={st.formPrev}>
          ✓ ya registrado hoy: {previa.aciertos}/{previa.total} · blancos {previa.blancos} · neto {mirNeto(previa.aciertos, previa.total, previa.blancos).netoPct} %{previa.tipoError ? ` · ${previa.tipoError}` : ''}{previa.delta_es ? ' · 🇪🇸 delta' : ''}{previa.ajuste ? ` · ajuste ${previa.ajuste}` : ''} (append-only: un nuevo guardado añade otra entrada)
        </Text>
      )}
      {qIds && qIds.length > 0 && <Text style={st.formHint}>pool oficial · ids que se marcarán como usadas: {qIds.join(', ')}</Text>}
      {totalOpciones && totalOpciones.length > 1 && (
        <View style={st.chipRow}>
          <Text style={st.stepLbl}>Total Q</Text>
          {totalOpciones.map((n) => (
            <TouchableOpacity key={n} activeOpacity={0.8} onPress={() => cambiarTotal(n)} style={[st.numChip, tot === n && { backgroundColor: color + '33', borderColor: color }]}>
              <Text style={[st.numChipTxt, tot === n && { color }]}>{n}Q</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {tot <= 5 ? (
        <View style={st.chipRow}>
          <Text style={st.stepLbl}>Aciertos</Text>
          {Array.from({ length: tot + 1 }, (_, i) => i).map((n) => (
            <TouchableOpacity key={n} activeOpacity={0.8} onPress={() => { setAciertos(n); if (blancos > tot - n) setBlancos(tot - n); }} style={[st.numChip, aciertos === n && { backgroundColor: color + '33', borderColor: color }]}>
              <Text style={[st.numChipTxt, aciertos === n && { color }]}>{n}/{tot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Stepper label={`Aciertos /${tot}`} value={aciertos} min={0} max={tot} onChange={(n) => { setAciertos(n); if (blancos > tot - n) setBlancos(tot - n); }} color={color} />
      )}
      <Stepper label="En blanco" value={blancos} min={0} max={tot - aciertos} onChange={(n) => { setBlancos(n); if (bAcert > n) setBAcert(n); }} color={Colors.muted} />
      <Text style={st.formNeto}>fallos {fallos} → neto = {aciertos} − {fallos}/3 = <Text style={{ color, fontWeight: '800' }}>{r.neto}</Text> ({r.netoPct} %){kind === 'quiz' || kind === 'pretest' ? ` · gate: ${pct} % acertado` : ''}</Text>
      {conAnclas && slots && (
        <View style={st.chipRow}>
          <Text style={st.stepLbl}>Slots OK</Text>
          {slots.map((s) => (
            <TouchableOpacity key={s.k} activeOpacity={0.8} disabled={!s.dia} onPress={() => setAnclas((a) => ({ ...a, [s.k]: !a[s.k] }))} style={[st.numChip, !s.dia ? { opacity: 0.4 } : anclas[s.k] ? { backgroundColor: GREEN + '2A', borderColor: GREEN } : { backgroundColor: CORAL + '2A', borderColor: CORAL }]}>
              <Text style={[st.numChipTxt, { color: !s.dia ? Colors.muted : anclas[s.k] ? GREEN : CORAL }]}>{s.label}{s.dia ? ` D${s.dia.d}` : ''} {s.dia ? (anclas[s.k] ? '✓' : '✗') : '—'}</Text>
            </TouchableOpacity>
          ))}
          {slots[2]?.dia && !anclas.d7 && slots[2].motivo === 'fijo' && <Text style={st.formHint}>fallo D-7 → el tema entra en la cola D+14</Text>}
          {temasQueFallan.length > 0 && <Text style={[st.formHint, { color: CORAL }]}>slot ✗ → el tema queda CALIENTE y vuelve mañana</Text>}
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
      {hayFallo && (kind === 'quiz' || conAnclas) && (
        <View style={st.chipRow}>
          <Text style={[st.stepLbl, exigen.length ? { color: CORAL } : null]}>Ajuste{exigen.length ? ' ⚠' : ''}</Text>
          {MIR_AJUSTES.map((a) => (
            <TouchableOpacity key={a.k} activeOpacity={0.8} onPress={() => setAjuste((v) => (v === a.k ? null : a.k))} style={[st.numChip, ajuste === a.k && { backgroundColor: AMBER + '2A', borderColor: AMBER }]}>
              <Text style={[st.numChipTxt, ajuste === a.k && { color: AMBER }]}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {exigen.length > 0 && <Text style={[st.formHint, { color: CORAL }]}>2º fallo de {exigen.map((s) => `D${s.d} ${s.tema}`).join(' · ')} → ajuste OBLIGATORIO (¿qué está roto: recursos, comprensión, aplicación o retención?)</Text>}
      {ajuste && <Text style={st.formHint}>{MIR_AJUSTES.find((a) => a.k === ajuste)?.desc}</Text>}
      {tactica && (
        <View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setTacticaOn((v) => !v)} style={[st.plegHead, { borderColor: AMBER + '44', marginTop: 4 }]}>
            <Text style={[st.plegTxt, { color: AMBER }]}>{tacticaOn ? '▾' : '▸'} táctica −1/3 (opcional · 10 s): blancos acertables · fallos entre dos · cambiadas</Text>
          </TouchableOpacity>
          {tacticaOn && (
            <View>
              <Stepper label="Blancos acertables" value={bAcert} min={0} max={blancos} onChange={setBAcert} color={AMBER} />
              <Stepper label="Fallos entre dos" value={fDos} min={0} max={fallos} onChange={setFDos} color={AMBER} />
              <Stepper label="Cambiadas" value={camb} min={0} max={tot} onChange={(n) => { setCamb(n); if (cambF > n) setCambF(n); }} color={AMBER} />
              <Stepper label="…a fallo" value={cambF} min={0} max={Math.min(camb, fallos)} onChange={setCambF} color={CORAL} />
              <Text style={st.formHint}>EV de responder tus blancos = acertables − (blancos − acertables)/3 · un Top 50 deja ≤3-5 blancos · cambia solo por error objetivo de lectura</Text>
            </View>
          )}
        </View>
      )}
      <View style={st.chipRow}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setDeltaEs((v) => !v)} style={[st.numChip, deltaEs && { backgroundColor: AMBER + '2A', borderColor: AMBER }]}>
          <Text style={[st.numChipTxt, deltaEs && { color: AMBER }]}>🇪🇸 delta-España {deltaEs ? '✓' : ''}</Text>
        </TouchableOpacity>
        <TextInput value={tiempo} onChangeText={setTiempo} placeholder="min" placeholderTextColor={Colors.muted} keyboardType="numeric" style={st.input} />
        <TextInput value={ccsn} onChangeText={setCcsn} placeholder="CCSN (opcional)" placeholderTextColor={Colors.muted} style={[st.input, { minWidth: 120 }]} />
      </View>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <TouchableOpacity activeOpacity={0.85} onPress={guardar} style={[st.saveBtn, { backgroundColor: color }]}><Text style={st.saveBtnTxt}>Guardar en el log</Text></TouchableOpacity>
        {!!msg && <Text style={[st.formHint, { color: Colors.onSurfaceVariant, flex: 1 }]}>{msg}</Text>}
      </View>
    </View>
  );
}

function ExportRow({ sync }: { sync: SyncInfo }) {
  const [msg, setMsg] = useState('');
  const n = mirEvalLogLoad().length;
  const syncTxt = sync == null ? 'espejo Supabase: conectando…' : sync.ok ? `espejo Supabase ✓ ${sync.remotas} filas${sync.anadidas ? ` · +${sync.anadidas} traídas` : ''}${sync.subidas ? ` · ${sync.subidas} subidas` : ''}` : 'espejo Supabase: sin conexión (solo local)';
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
      <TouchableOpacity activeOpacity={0.85} onPress={() => { const ok = copiar(mirEvalLogExportJSON()); setMsg(ok ? 'JSON copiado ✓ → pégalo en DATA/MIR/mir_eval_log_export.json (gen_delta_espana.js)' : 'Sin portapapeles: abre la consola y usa mirEvalLogExportJSON()'); }} style={[st.verWide, { borderColor: BLUE + '88', marginTop: 0, flex: 1 }]}>
        <Text style={[st.verTxt, { color: BLUE }]}>⤓ Exportar log JSON ({n} entradas · plan:MIR)</Text>
      </TouchableOpacity>
      <Text style={[st.formHint, { color: sync?.ok ? GREEN : Colors.muted }]}>{syncTxt}</Text>
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

/** Anclas DINÁMICAS de la eval 15:15: D-1 fijo (2Q) + 2 slots que priorizan temas calientes (gate Palmerton). */
function AnclasView({ dia, slots, calientes, onPick }: { dia: DiaMIR; slots: MirAnclaSlot[]; calientes: MirTemaEstado[]; onPick: (d: number) => void }) {
  const enD7 = mirAsignaturasEnAnclasD7(undefined, dia.fecha);
  const motivoColor = (m: MirAnclaSlot['motivo']) => (m === 'caliente' ? CORAL : m === 'cola' ? AMBER : BLUE);
  return (
    <View>
      <Text style={st.secLbl}>🎯 15:15 · Evaluación anclada 4Q (2Q D-1 + 2 slots dinámicos) · {MIR_SEG_POR_Q} s/Q</Text>
      {slots.map((s, i) => {
        const x = s.dia; const c = motivoColor(s.motivo);
        return (
          <FadeUp key={s.k} delay={30 + i * 25}>
            {x ? (
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(capUrl(x.capId))} style={[st.anchor, { borderLeftColor: c }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => onPick(x.d)} style={[st.dChip, { borderColor: c + '88' }]}><Text style={[st.dChipTxt, { color: c }]}>{s.label} · D{x.d}</Text></TouchableOpacity>
                  <Text style={[st.anchorLbl, { color: c }]}>{s.nQ}Q · {x.asignatura}</Text>
                  {s.motivo === 'caliente' && s.estado ? <Chip label={`● caliente · ${s.estado.pct} % · ${s.estado.fallos} fallo${s.estado.fallos === 1 ? '' : 's'} · ${s.estado.consecutivosOk}/2 OK`} color={CORAL} small /> : null}
                  {s.motivo === 'cola' ? <Chip label="cola D+14 vencida" color={AMBER} small /> : null}
                </View>
                <Text style={st.anchorVal} numberOfLines={2}>{x.tema}</Text>
                <Text style={st.anchorSub}>test del capítulo ProMIR ↗ · {s.motivo === 'caliente' ? `sale de caliente con ${MIR_GATE.aciertosConsecutivos} aciertos seguidos${s.estado?.necesitaAjuste ? ' · ⚠ 2º fallo: ajuste obligatorio' : ''}` : s.k === 'd7' && s.motivo === 'fijo' ? 'fallo aquí → cola D+14 (no hay finde) y tema caliente' : 'fallo → tema caliente mañana + Whole-Page del capítulo + APEX'}</Text>
              </TouchableOpacity>
            ) : (
              <View style={[st.anchor, { borderLeftColor: Hairline.medium }]}>
                <Text style={st.anchorLbl}>{s.label} · sin ancla todavía (arranque del plan)</Text>
                <Text style={st.anchorSub}>{s.nQ}Q pasan al tema D-1 hasta que exista</Text>
              </View>
            )}
          </FadeUp>
        );
      })}
      {calientes.length > 2 && <Text style={st.formHint}>Temas calientes en espera ({calientes.length - 2} más): {calientes.slice(2, 8).map((s) => `D${s.d}`).join(' · ')} — entran cuando se liberen slots.</Text>}
      {enD7.length > 0 && <Text style={st.formHint}>Asignaturas en rotación D-7 (agregado n≥{MIR_AGREGADO_MIN_Q} o último cierre &lt;{mirCierreUmbral(dia.fecha).anclasD7} %): {enD7.join(' · ')}</Text>}
    </View>
  );
}

/** Test de cierre (1er día del bloque siguiente): 10Q de la asignatura cerrada. */
function CierreCard({ dia, qIds, onSaved }: { dia: DiaMIR; qIds: string[]; onSaved: () => void }) {
  const c = mirCierreDe(dia.d);
  if (!c) return null;
  const prev = mirCierreDeAsignatura(c.asignatura);
  const agg = mirAgregadoAsignatura(c.asignatura, undefined, dia.fecha);
  const u = mirCierreUmbral(dia.fecha);
  return (
    <FadeUp delay={30}>
      <View style={[st.temaCard, { borderColor: CORAL + '66' }]}>
        <Text style={[st.formTitle, { color: CORAL }]}>🏁 15:15–15:30 · TEST DE CIERRE · {c.asignatura} (D{c.dIni}-D{c.dFin})</Text>
        <Text style={st.temaSub}>10Q reales MIR mixtas de la asignatura · cronometrado {mirMinutos(10)} min ({MIR_SEG_POR_Q} s/Q) · en blanco permitido · neto = A − F/3 · ≥{u.consolidada} % consolidada · &lt;{u.anclasD7} % entra a las anclas D-7 ({u.fase}). Sustituye hoy a la eval anclada.</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
          {c.capIds.map((id, i) => (
            <TouchableOpacity key={id} activeOpacity={0.8} onPress={() => openUrl(capUrl(id))} style={[st.dChip, { borderColor: CORAL + '66' }]}><Text style={[st.dChipTxt, { color: CORAL }]}>cap {i + 1} ↗</Text></TouchableOpacity>
          ))}
        </View>
        {prev && <Text style={[st.formHint, { marginTop: 8 }]}>Último cierre registrado: {prev.entry.fecha} · neto {prev.netoPct} % → {mirEstadoCierreTxt(prev.estado, dia.fecha)}</Text>}
        {agg.fuente === 'agregado' && <Text style={st.formHint}>Agregado de la asignatura (cierre + ancladas + quiz, {agg.total}Q): neto {agg.netoPct} % → {mirEstadoCierreTxt(agg.estado, dia.fecha)} (el agregado manda sobre el cierre de 10Q)</Text>}
        <TimerQ color={CORAL} presets={[10, 25, 40]} />
        {mirPoolDisponible() && <MirPoolLista qIds={qIds} color={CORAL} titulo={`Pool oficial · ${c.asignatura} (mezcla determinista por fecha)`} pedidas={10} fallback="test por asignatura ProMIR" />}
        <EvalForm dia={{ d: dia.d, fecha: dia.fecha, num: c.num }} kind="cierre" total={10} asignatura={c.asignatura} tema={`Cierre ${c.asignatura}`} color={CORAL} titulo="Registrar test de cierre (10Q)" tactica qIds={qIds} onSaved={onSaved} />
      </View>
    </FadeUp>
  );
}

function ColaD14({ hoy }: { hoy: string }) {
  const cola = mirColaD14(hoy);
  if (!cola.length) return null;
  return (
    <View style={[st.formCard, { borderColor: AMBER + '44' }]}>
      <Text style={[st.formTitle, { color: AMBER }]}>⏳ Cola D+14 (fallos en el slot D-7)</Text>
      {cola.slice(0, 6).map((c, i) => (
        <Text key={i} style={[st.formHint, c.vencida && { color: CORAL }]}>{c.vencida ? '● ' : '○ '}{c.fechaObjetivo} · D{c.d} {c.asignatura} → {c.tema}</Text>
      ))}
    </View>
  );
}

function HoyView({ dia, onOpenTemario, hecho, onToggle, onPick, hoyISO, bump, sync }: { dia: DiaMIR; onOpenTemario: () => void; hecho: boolean; onToggle: (d: number) => void; onPick: (d: number) => void; hoyISO: string; bump: () => void; sync: SyncInfo }) {
  const tier = MIR_RENT[dia.rent] || MIR_RENT.verde;
  const cierre = mirCierreDe(dia.d);
  const esTema = dia.d <= MIR_TEMAS_TOTAL;
  const entries = mirEvalLogLoad();
  const din = useMemo(() => mirAnclasDinamicas(dia.d, entries, hoyISO), [dia.d, entries.length, hoyISO]);
  const estadoTema = esTema ? mirEstadosTemas(entries).get(dia.d) : undefined;
  const poolOK = mirPoolDisponible();
  const d1 = din.slots[0].dia;
  // Pool oficial: reserva de ids en orden horario (15:15 anclada/cierre → 15:38 pre-test → 16:05 quiz → D77 mini-MIR).
  // Cada segmento excluye las usadas del log (local + espejo) y las reservadas antes ese día; si ya se guardó, muestra sus ids.
  const pool = useMemo(() => {
    const vacio = { anclada: [] as string[], cierre: [] as string[], pretest: [] as string[], quiz: [] as string[], miniMIR: [] as string[] };
    if (!poolOK) return vacio;
    const excl = new Set<string>(mirUsadasIds(entries));
    const toma = (kind: MirEvalKind, d: number | undefined, fn: () => MirPreguntaOficial[], n: number): string[] => {
      const prev: MirEvalEntry | undefined = mirEntradaDe(dia.fecha, kind, entries, d);
      const ids = prev?.qIds?.length ? prev.qIds.slice() : fn().filter((q) => !excl.has(q.id)).slice(0, n).map((q) => q.id);
      ids.forEach((id) => excl.add(id));
      return ids;
    };
    const anclada: string[] = [];
    if (esTema && !cierre && dia.d > 1) {
      const prev = mirEntradaDe(dia.fecha, 'anclada', entries);
      if (prev?.qIds?.length) anclada.push(...prev.qIds);
      else for (const s of din.slots) { if (!s.dia) continue; const ids = preguntasSinUsar(s.dia.capId, excl).slice(0, s.nQ).map((q) => q.id); ids.forEach((id) => excl.add(id)); anclada.push(...ids); }
      anclada.forEach((id) => excl.add(id));
    }
    const cierreIds = esTema && cierre ? toma('cierre', undefined, () => mezclaDeterminista(preguntasSinUsarDeAsignatura(cierre.num, excl), dia.fecha), 10) : [];
    const pretest = esTema ? toma('pretest', dia.d, () => preguntasSinUsar(dia.capId, excl), 5) : [];
    const quiz = esTema ? toma('quiz', dia.d, () => preguntasSinUsar(dia.capId, excl), 10) : [];
    const miniMIR = dia.d === 77 ? toma('miniMIR', undefined, () => preguntasMixtasSinUsar(40, excl, dia.fecha, { soloPlan: true }), 40) : [];
    return { anclada, cierre: cierreIds, pretest, quiz, miniMIR };
  }, [dia.d, dia.fecha, dia.capId, entries.length, poolOK, esTema, cierre, din]);
  const qIdsQuiz = pool.quiz;
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
            {dia.delta ? <Chip label="🇪🇸 delta previsible" color={AMBER} small /> : null}
            {estadoTema && estadoTema.estado !== 'sin-dato' ? <Chip label={estadoTema.estado === 'validado' ? `✓ validado ${estadoTema.pct} %` : estadoTema.estado === 'caliente' ? `● caliente ${estadoTema.pct} %` : `○ ${estadoTema.pct} % (${estadoTema.total}Q)`} color={estadoTema.estado === 'validado' ? GREEN : estadoTema.estado === 'caliente' ? CORAL : Colors.muted} small /> : null}
            {mirObsUrl(dia.capId) && (
              <TouchableOpacity activeOpacity={0.8} onPress={() => openUrl(mirObsUrl(dia.capId)!)}
                style={[st.sysBadge, { backgroundColor: OBS + '1F', borderColor: OBS + '77' }]}>
                <Text style={[st.sysBadgeTxt, { color: OBS }]}>◆ Obsidian</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={st.temaTitle}>{dia.tema}</Text>
          <Text style={st.temaSub}>{esTema ? 'Tema atómico del día · 1/día · toca la asignatura para ver todo el temario y tu avance ›' : 'Día de medición: sin tema nuevo'}</Text>
          {dia.delta ? <Text style={[st.formHint, { color: AMBER, marginTop: 6 }]}>🇪🇸 Delta-España previsible en este capítulo (legislación / guías de sociedad / calendario vacunal / cribados): lee antes la fila de DATA/MIR/DELTA_ESPANA.md y marca 🇪🇸 en el log si fallas por contestar con el manejo Perú/USA. Cada APEX delta lleva fuente oficial española verificada.</Text> : null}
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
            <Text style={st.temaSub}>40Q oficiales sin usar de las 14 asignaturas del plan (preguntasMixtasSinUsar, mezcla determinista por fecha); si el pool no llega a 40, el resto con cuadernillos examenesmir.com. Solo plantilla + neto hoy; la corrección es mañana (D78). Mínimo on-track del hito: 50 % neto.</Text>
            <TimerQ color={CORAL} presets={[40, 25, 10]} />
            {poolOK && <MirPoolLista qIds={pool.miniMIR} color={CORAL} titulo="Pool oficial · mini-MIR mixto" pedidas={40} fallback="cuadernillos examenesmir.com" />}
            <EvalForm dia={{ d: dia.d, fecha: dia.fecha }} kind="miniMIR" total={40} asignatura="Repaso integral" tema="mini-MIR 40Q" color={CORAL} titulo="Registrar mini-MIR (40Q)" tactica qIds={pool.miniMIR} onSaved={bump} />
          </View>
        </FadeUp>
      )}
      {dia.d === 78 && <BaselineView />}

      {esTema && (cierre ? <CierreCard dia={dia} qIds={pool.cierre} onSaved={bump} /> : (
        <>
          <AnclasView dia={dia} slots={din.slots} calientes={din.calientes} onPick={onPick} />
          {dia.d > 1 && (
            <>
              <Plegable titulo={`⏱ Cronómetro ${MIR_SEG_POR_Q} s/Q (4Q · 10Q · 25Q · 40Q) · aviso a 100 s por pregunta`} color={BLUE}>
                <TimerQ color={BLUE} />
              </Plegable>
              {poolOK && <MirPoolLista qIds={pool.anclada} color={BLUE} titulo="Pool oficial · anclada (2Q D-1 + 1Q por slot dinámico)" pedidas={din.slots.reduce((a, s) => a + (s.dia ? s.nQ : 0), 0)} fallback="test del capítulo ProMIR de cada slot" />}
              <EvalForm dia={{ d: dia.d, fecha: dia.fecha, num: dia.num }} kind="anclada" total={4} asignatura={d1?.asignatura || dia.asignatura} tema={d1?.tema || dia.tema} capId={d1?.capId} color={BLUE} titulo="15:27 · Registrar eval anclada (4Q)" conAnclas slots={din.slots} tactica qIds={pool.anclada} onSaved={bump} />
            </>
          )}
        </>
      ))}
      <ColaD14 hoy={hoyISO} />

      {esTema && (
        <>
          <Text style={st.secLbl}>📋 Cola de hoy · 15:30–16:15 (en orden) · 17-19 Q/día</Text>
          <FadeUp delay={60}><ColaItem icon="❓" lbl="PRE-TEST · 5Q ciegas (pool oficial → test del capítulo ProMIR) · 8 min" val={`${dia.asignatura} → ${dia.tema}${poolOK ? ` · pool oficial: ${pool.pretest.length} Q sin usar` : ''}`} sub="ProMIR → Entrenar · marca los gaps: solo eso se lee después · REGÍSTRALO: cuenta para el gate del tema" color={GREEN} url={capUrl(dia.capId)} /></FadeUp>
          <Plegable titulo="Registrar pre-test 5Q (10 s · diagnóstico, no cuenta para readiness; sí para validar el tema)" color={GREEN}>
            {poolOK && <MirPoolLista qIds={pool.pretest} color={GREEN} titulo="Pool oficial · pre-test (ciego: no abras la clave antes de contestar)" pedidas={5} />}
            <EvalForm dia={{ d: dia.d, fecha: dia.fecha, num: dia.num }} kind="pretest" total={5} asignatura={dia.asignatura} tema={dia.tema} capId={dia.capId} temaD={dia.d} color={GREEN} titulo="15:38 · Pre-test 5Q ciegas" qIds={pool.pretest} onSaved={bump} />
          </Plegable>
          <FadeUp delay={90}><ColaItem icon="📖" lbl="LECTURA DIRIGIDA · solo los gaps del pre-test · 15 min" val={`Whole Page Rule sobre el capítulo ProMIR${dia.resumenVid ? ` · (vídeo RESUMEN DE ASIGNATURA ${dia.resumenVid}: no es del capítulo, no verlo entero)` : ''}`} sub="vídeo solo si el clip del capítulo es ≤12 min verificado · dudas → CCSN" color={AMBER} url={capUrl(dia.capId)} /></FadeUp>
          <FadeUp delay={120}><ColaItem icon="🧪" lbl="8-10Q COMENTADAS · Rule-In → Rule-Out · 12 min" val={`Test del capítulo ProMIR · cover-the-options · ${MIR_SEG_POR_Q} s/Q${poolOK ? ` · pool oficial: ${qIdsQuiz.length} Q sin usar de este capítulo` : ' · sin pool oficial (test del capítulo)'}`} sub="cada fallo → Shopping List (knowledge / transfer / proceso · 🇪🇸 delta) · REGÍSTRALO (20 s): <60 % = tema caliente → ancla de mañana" color={BLUE} url={capUrl(dia.capId)} /></FadeUp>
          <Plegable titulo="Registrar quiz 8-10Q (20 s · gate Palmerton: <60 % → caliente · 2º fallo → ajuste)" color={BLUE} abierto={!!mirEntradaDe(dia.fecha, 'pretest', entries, dia.d)}>
            {poolOK && <MirPoolLista qIds={qIdsQuiz} color={BLUE} titulo="Pool oficial · quiz (sin las 5 del pre-test)" pedidas={10} />}
            <EvalForm dia={{ d: dia.d, fecha: dia.fecha, num: dia.num }} kind="quiz" total={10} totalOpciones={[8, 9, 10]} asignatura={dia.asignatura} tema={dia.tema} capId={dia.capId} temaD={dia.d} color={BLUE} titulo="16:05 · Quiz 8-10Q comentadas" tactica qIds={qIdsQuiz} onSaved={bump} />
          </Plegable>
          {mirObsUrl(dia.capId) && (
            <FadeUp delay={135}><ColaItem icon="◆" lbl="OBSIDIAN · nota madre del tema (lectura / Shopping List)" val={`${dia.asignatura} → ${dia.tema}`} sub="Vault_Medicina MIR_Joseph · los APEX NO pasan por aquí hasta verificar n8n (P0-2/P0-3): van directos a Anki" color={OBS} url={mirObsUrl(dia.capId)!} /></FadeUp>
          )}
          <FadeUp delay={142}><ColaItem icon="🃏" lbl="ANKI · deck de la asignatura (FSRS · retention 0,85)" val={mirAnkiDeck(dia.asignatura)} sub={`abre AnkiWeb ↗ · en Anki escritorio busca este deck exacto · preset APEX::MIR · ${APEX_DIRECTO_ANKI}`} color={Colors.teal} url={ANKIWEB} /></FadeUp>
          <FadeUp delay={150}>
            <View style={[st.cola, { borderLeftColor: AMBER }]}>
              <Text style={st.colaIcon}>🃏</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.colaLbl}>APEX · 16:05–16:15 · ≤4 desde el Shopping List · DIRECTAMENTE EN ANKI</Text>
                <Text style={st.colaVal}>SAQ + por qué fisiopatológico + 🇪🇸 delta vs Perú/USA + tag {dia.usmleSystem !== '—' ? `USMLE ${dia.usmleSystem}` : 'USMLE'} · 1 de cada 4 con imagen{poolOK ? ` · campo "Pregunta oficial origen" = id del pool (${qIdsQuiz.slice(0, 3).join(', ')}${qIdsQuiz.length > 3 ? '…' : ''})` : ' · campo "Pregunta oficial origen" cuando exista el pool'}</Text>
                <Text style={st.colaSub}>doble tag: {mirAnkiDeck(dia.asignatura)} + sistema USMLE · {APEX_DIRECTO_ANKI}{dia.delta ? ' · APEX delta: fuente oficial española de DELTA_ESPANA.md' : ''}</Text>
              </View>
            </View>
          </FadeUp>
        </>
      )}
      <ExportRow sync={sync} />
    </View>
  );
}

/** D78 / handoff: tabla de neto por asignatura (cierres + mini-MIR + mantenimiento). */
function BaselineView() {
  const tabla = mirBaselineTabla();
  const u = mirCierreUmbral();
  return (
    <FadeUp delay={30}>
      <View style={[st.temaCard, { borderColor: CORAL + '66' }]}>
        <Text style={[st.formTitle, { color: CORAL }]}>📊 Tabla de neto por asignatura · baseline honesto (abr-2027)</Text>
        {tabla.length === 0 ? <Text style={st.temaSub}>Sin mediciones ciegas registradas (cierres / mini-MIR). Registra el mini-MIR de ayer y los cierres.</Text> : tabla.map((s) => (
          <View key={s.asignatura} style={st.baseRow}>
            <Text style={st.baseAsig} numberOfLines={1}>{s.asignatura}</Text>
            <Text style={[st.baseNeto, { color: s.netoPct >= u.consolidada ? GREEN : s.netoPct < u.anclasD7 ? CORAL : AMBER }]}>{s.netoPct} %</Text>
            <Text style={st.baseSub}>{s.aciertos}/{s.total} · bl {s.blancos} · 🇪🇸 {s.deltaEs}</Text>
          </View>
        ))}
        <Text style={st.formHint}>Corrección Whole-Page de cada fallo + Shopping List → APEX (directos en Anki). &lt;{u.anclasD7} % → anclas D-7 / viernes del mantenimiento. Handoff 31-mar: mínimo on-track 60 % neto · 🇪🇸 = fallos delta (objetivo 0 repetidos).</Text>
      </View>
    </FadeUp>
  );
}

function HorarioView({ dia }: { dia: DiaMIR }) {
  const din = mirAnclasDinamicas(dia.d);
  const cierre = mirCierreDe(dia.d);
  const franjas = mirFranjasDe(dia);
  const detalle = (tipo: string): string => {
    if (tipo === 'eval') return din.slots.map((s) => (s.dia ? `${s.label} ${s.dia.tema}` : '')).filter(Boolean).join(' · ') || 'sin anclas (arranque)';
    if (tipo === 'cierre') return cierre ? `${cierre.asignatura} (D${cierre.dIni}-D${cierre.dFin})` : '';
    if (tipo === 'pretest' || tipo === 'quiz') return `${dia.asignatura} → ${dia.tema}${tipo === 'quiz' ? ' · registrar n/total (gate)' : ' · registrar /5'}`;
    if (tipo === 'read') return `${dia.tema}${dia.resumenVid ? ` · resumen de ASIGNATURA ${dia.resumenVid} (no del capítulo)` : ''}${dia.delta ? ' · 🇪🇸 delta previsible' : ''}`;
    if (tipo === 'apex') return `${dia.usmleSystem !== '—' ? `tag USMLE: ${dia.usmleSystem} · ` : ''}directo en Anki (n8n sin verificar)`;
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
      <Text style={st.note}>15:15–15:30 = eval anclada multi-temporal (D-1 fijo + 2 slots que priorizan temas calientes) o test de cierre el 1er día de bloque. 15:30–16:15 = capítulo nuevo (pre-test → lectura dirigida → 8-10Q → APEX). Sáb y dom libres: lo que falla va a la cola D+7/D+14, no al finde.</Text>
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
                <Text style={st.d7sys}>{x.asignatura}{x.peso != null ? ` · ${x.peso}%` : ''} · {vueltaTxt(x.vuelta)}{cierre ? ` · 🏁 cierre ${cierre.asignatura}` : ''}{x.usmleSystem !== '—' ? ` · 🇺🇸 ${x.usmleSystem}` : ''}{x.delta ? ' · 🇪🇸 delta' : ''}</Text>
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

const marcaTema = (s?: MirTemaEstado): { txt: string; color: string } => {
  if (!s || s.estado === 'sin-dato') return { txt: '', color: Colors.muted };
  if (s.estado === 'validado') return { txt: '✓', color: GREEN };
  if (s.estado === 'caliente') return { txt: '●', color: CORAL };
  return { txt: '○', color: AMBER };
};

function AsignaturaCard({ g, hoyD, onPick, done, onToggle, estados }: { g: GrupoProgreso<DiaMIR>; hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void; estados: Map<number, MirTemaEstado> }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const tier = MIR_RENT[g.dias[0].rent] || MIR_RENT.verde;
  const pesoBloque = Math.round(g.dias.reduce((s, x) => s + (x.peso || 0), 0) * 10) / 10;
  const agg = mirAgregadoAsignatura(g.clave);
  const nVal = g.dias.filter((x) => estados.get(x.d)?.estado === 'validado').length;
  const nCal = g.dias.filter((x) => estados.get(x.d)?.estado === 'caliente').length;
  const estadoTxt = g.estado === 'completado' ? '✓ completado' : g.estado === 'en-curso' ? `en curso · ${g.pct}%` : `pendiente · empieza D${g.primerD}`;
  const estadoColor = g.estado === 'completado' ? GREEN : g.estado === 'en-curso' ? tier.c : Colors.muted;
  const aggTxt = agg.fuente === 'agregado' ? ` · agregado ${agg.netoPct} % (${agg.total}Q)` : agg.fuente === 'cierre' ? ` · cierre ${agg.netoPct} %` : '';
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
          {estadoTxt}{g.diaActual ? ` · hoy: ${g.diaActual.tema}` : ''}{g.dias[0].usmleSystem !== '—' ? ` · 🇺🇸 ${g.dias[0].usmleSystem}` : ''}{aggTxt}{agg.estado === 'anclasD7' ? ' · ⚠ anclas D-7' : ''}
        </Text>
        {(nVal > 0 || nCal > 0) && <Text style={[st.formHint, { marginTop: 3 }]}>gate: {nVal > 0 ? <Text style={{ color: GREEN }}>✓ {nVal} validado{nVal === 1 ? '' : 's'}</Text> : null}{nVal > 0 && nCal > 0 ? ' · ' : ''}{nCal > 0 ? <Text style={{ color: CORAL }}>● {nCal} caliente{nCal === 1 ? '' : 's'}</Text> : null}</Text>}
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(capUrl(g.dias[0].capId))} style={[st.verWide, { borderColor: tier.c + '88' }]}>
        <Text style={[st.verTxt, { color: tier.c }]}>Ver todo el temario en ProMIR ↗</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: 8 }}>
          {g.dias.map((x) => {
            const hecho = done.has(x.d), now = x.d === hoyD;
            const m = marcaTema(estados.get(x.d));
            return (
              <View key={x.d} style={[st.temaRow, now && st.temaRowOn]}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle(x.d)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
                  <Text style={[st.temaChk, { color: hecho ? GREEN : 'rgba(255,255,255,0.25)' }]}>{hecho ? '☑' : '☐'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={st.temaRowMain}>
                  <Text style={[st.temaRowD, { color: hecho ? GREEN : now ? tier.c : Colors.muted }]}>{now ? '▶' : ''} D{x.d}</Text>
                  <Text style={st.temaRowTxt} numberOfLines={1}>{x.tema}{x.peso != null ? ` · ${x.peso}%` : ''}{x.delta ? ' · 🇪🇸' : ''}</Text>
                  {m.txt ? <Text style={[st.markTxt, { color: m.color }]}>{m.txt}</Text> : null}
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
  const estados = useMemo(() => mirEstadosTemas(), [done.size, hoyD]);
  const nVal = Array.from(estados.values()).filter((s) => s.estado === 'validado').length;
  const nCal = Array.from(estados.values()).filter((s) => s.estado === 'caliente').length;
  return (
    <View>
      <View style={st.globCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={st.globTitle}>🗂️ Temario MIR · progreso del plan</Text>
          <Text style={[st.globPct, { color: AMBER }]}>{glob.pct}%</Text>
        </View>
        <ProgressBar pct={glob.pct} color={AMBER} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} días · hoy = Día {hoyD} de {glob.total} · {grupos.length} bloques · 1ª vuelta · selección top-N por Peso MIR + núcleo rabi_94 · cobertura {MIR_DAILY_META.coberturaPeso} pts (óptimo {MIR_DAILY_META.optimoTopN}; plan previo 744)</Text>
        <Text style={[st.globSub, { marginTop: 4 }]}>Gate Palmerton: <Text style={{ color: GREEN }}>✓ {nVal} validado{nVal === 1 ? '' : 's'}</Text> · <Text style={{ color: CORAL }}>● {nCal} caliente{nCal === 1 ? '' : 's'}</Text> · {MIR_VALIDACION_TXT.validado} · {MIR_VALIDACION_TXT.caliente}</Text>
      </View>
      {grupos.map((g) => <AsignaturaCard key={g.clave} g={g} hoyD={hoyD} onPick={onPick} done={done} onToggle={onToggle} estados={estados} />)}
      <Text style={st.note}>Progreso REAL: empezamos en 0%. ☑ marca un tema como completado (se guarda en este dispositivo). ▶ = día de hoy. Toca el título de un tema para ir a ese día. "% cubierto" = suma del Peso MIR de los capítulos elegidos de esa asignatura. ✓ / ● / ○ = gate por tema (validado / caliente / medido sin veredicto); "agregado" = cierre + ancladas + quiz con n≥{MIR_AGREGADO_MIN_Q} (manda sobre el cierre de 10Q). 🇪🇸 = delta-España previsible.</Text>
    </View>
  );
}

/** Modo MANTENIMIENTO (4-ene→31-mar-2027): banqueo puro sin contenido nuevo. */
function MantenimientoView({ dia, onPick, bump, sync }: { dia: DiaMIRMant; onPick: (d: number) => void; bump: () => void; sync: SyncInfo }) {
  const entries = mirEvalLogLoad();
  const peor = mirPeorAsignatura(entries);
  const foco = mirMantFoco(dia, peor);
  const franjas = mirMantFranjas(dia);
  const color = dia.tipo === 'viernes' ? CORAL : dia.modo === 'reducido' ? Colors.muted : AMBER;
  const tierC = dia.tierC;
  // Tier C express (jueves): sus 10Q salen de foco.nQ (reducido 10Q → hoy todo es Tier C, sin EvalForm foco; normal 25Q → 15Q foco + 10Q Tier C).
  const focoNQ = tierC ? Math.max(0, foco.nQ - tierC.nQ) : foco.nQ;
  const proximoTierC = mirMantProximoTierC(dia.d + 1);
  const poolOK = mirPoolDisponible();
  // Pool oficial (POOL_USO §3): foco = asignatura (mezcla determinista por fecha) + 10Q interleaving de num2 en los días normales;
  // reducido = mixtas [num, num2]; viernes = asignatura peor del log; Tier C = capítulo → asignatura → test ProMIR (entrada propia).
  const pool = useMemo(() => {
    const vacio = { foco: [] as string[], tierC: [] as string[], tierCDelCap: 0 };
    if (!poolOK) return vacio;
    const excl = new Set<string>(mirUsadasIds(entries));
    const prevDe = (asig: string) => entries.filter((e) => e.fecha === dia.fecha && e.kind === 'mantenimiento' && e.asignatura === asig && e.qIds?.length).sort((a, b) => (b.ts || '').localeCompare(a.ts || ''))[0];
    const prevFoco = prevDe(foco.asignatura);
    let focoIds: string[] = [];
    if (prevFoco?.qIds?.length) focoIds = prevFoco.qIds.slice();
    else if (focoNQ > 0) {
      const asig: number | string = foco.num ?? foco.asignatura;
      if (dia.tipo === 'viernes') focoIds = preguntasSinUsarDeAsignatura(asig, excl).slice(0, focoNQ).map((q) => q.id);
      else if (dia.modo === 'reducido') focoIds = preguntasMixtasSinUsar(focoNQ, excl, dia.fecha, { nums: [dia.num, dia.num2].filter((x): x is number => x != null) }).map((q) => q.id);
      else {
        const nInter = !tierC && dia.num2 != null ? Math.min(10, focoNQ) : 0;
        focoIds = mezclaDeterminista(preguntasSinUsarDeAsignatura(asig, excl), dia.fecha).slice(0, focoNQ - nInter).map((q) => q.id);
        focoIds.forEach((id) => excl.add(id));
        if (nInter) focoIds = focoIds.concat(preguntasSinUsarDeAsignatura(dia.num2 as number, excl).slice(0, nInter).map((q) => q.id));
      }
    }
    focoIds.forEach((id) => excl.add(id));
    let tierCIds: string[] = []; let tierCDelCap = 0;
    if (tierC) {
      const prevC = prevDe(tierC.asignatura);
      if (prevC?.qIds?.length) { tierCIds = prevC.qIds.slice(); tierCDelCap = -1; }
      else { const r = poolConFallback(tierC.capId, tierC.num, tierC.nQ, excl); tierCIds = r.ids; tierCDelCap = r.delCap; }
    }
    return { foco: focoIds, tierC: tierCIds, tierCDelCap };
  }, [dia.d, dia.fecha, foco.asignatura, foco.num, focoNQ, entries.length, poolOK, tierC]);
  return (
    <View>
      <FadeUp>
        <View style={[st.temaCard, { borderColor: color + '66' }]}>
          <View style={st.temaTop}>
            <Chip label={dia.modo === 'reducido' ? 'REDUCIDO · Fase B/C Step 1' : 'BANQUEO'} color={color} small />
            <Chip label={dia.tipo === 'viernes' ? 'viernes · asignatura peor del log' : `rotación ponderada · sem ${dia.semana}`} color={BLUE} small />
            <Chip label={`${foco.nQ}Q · ${dia.minQ} min · ${MIR_SEG_POR_Q} s/Q`} color={GREEN} small />
            {tierC ? <Chip label={`TIER C EXPRESS · ${tierC.asignatura} › ${tierC.capitulo} (${tierC.nQ}Q · ${tierC.pesoCap} % de la asignatura)`} color={CORAL} small /> : null}
            {proximoTierC ? <Chip label={`próximo Tier C: ${proximoTierC.asignatura} · ${proximoTierC.capitulo} · ${fmtFecha(proximoTierC.fecha)} (M${proximoTierC.d})`} color={Colors.muted} small /> : null}
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
      <FadeUp delay={100}><ColaItem icon="🃏" lbl="ANKI · APEX::MIR (todas las asignaturas)" val={mirAnkiDeck(foco.asignatura)} sub={`AnkiWeb ↗ · preset FSRS retention 0,85 hasta 31-mar (→ 0,90 en fase principal) · ${APEX_DIRECTO_ANKI}`} color={Colors.teal} url={ANKIWEB} /></FadeUp>
      <FadeUp delay={120}><ColaItem icon="🧪" lbl={`${foco.nQ}Q reales MIR · cronometradas`} val={`${foco.asignatura}${dia.asignatura2 ? ` (+ ${dia.asignatura2} interleaving)` : ''}`} sub="cuadernillos oficiales gratis (examenesmir) o test por asignatura ProMIR · en blanco permitido" color={AMBER} url="https://www.examenesmir.com/examenes-mir" /></FadeUp>
      <TimerQ color={color} presets={[foco.nQ, 10, 25, 40].filter((v, i, a) => a.indexOf(v) === i)} />
      {focoNQ > 0 && (
        <>
          {poolOK && <MirPoolLista qIds={pool.foco} color={color} titulo={`Pool oficial · ${foco.asignatura}${!tierC && dia.modo === 'normal' && dia.asignatura2 ? ` + ${dia.asignatura2} (10Q interleaving)` : ''}`} pedidas={focoNQ} fallback="test por asignatura ProMIR / cuadernillos examenesmir" />}
          <EvalForm dia={{ d: dia.d, fecha: dia.fecha, num: foco.num ?? undefined }} kind="mantenimiento" total={focoNQ} asignatura={foco.asignatura} tema={`Mantenimiento ${dia.tipo} ${focoNQ}Q`} color={color} titulo={`Registrar ${focoNQ}Q (${dia.minCorr} min corrección)`} tactica qIds={pool.foco} onSaved={bump} />
        </>
      )}
      {tierC && (
        <FadeUp delay={130}>
          <View style={[st.temaCard, { borderColor: CORAL + '66' }]}>
            <Text style={[st.formTitle, { color: CORAL }]}>🎯 TIER C EXPRESS · {tierC.asignatura} › {tierC.capitulo} · {tierC.nQ}Q</Text>
            <Text style={st.temaSub}>Capítulo top-1 de una asignatura fuera del plan ({tierC.pesoCap} % de su peso; semana {dia.semana}). Entrada PROPIA en el log con asignatura {tierC.asignatura} (no se mezcla con la foco: así entra en las estadísticas por asignatura y en el handoff 31-mar).{tierC.nota ? ` · ${tierC.nota}` : ''}</Text>
            {poolOK && <Text style={st.formHint}>{pool.tierCDelCap < 0 ? 'ids ya registradas hoy' : `${pool.tierCDelCap} del capítulo + ${pool.tierC.length - pool.tierCDelCap} de la asignatura`}{pool.tierC.length < tierC.nQ ? ` · faltan ${tierC.nQ - pool.tierC.length} → test del capítulo ProMIR` : ''}</Text>}
            <TouchableOpacity activeOpacity={0.8} onPress={() => openUrl(capUrl(tierC.capId))} style={[st.dChip, { borderColor: CORAL + '66', alignSelf: 'flex-start', marginTop: 6 }]}><Text style={[st.dChipTxt, { color: CORAL }]}>capítulo ProMIR ↗</Text></TouchableOpacity>
            {poolOK && <MirPoolLista qIds={pool.tierC} color={CORAL} titulo={`Pool oficial · ${tierC.asignatura}`} pedidas={tierC.nQ} />}
            <EvalForm dia={{ d: dia.d, fecha: dia.fecha, num: tierC.num }} kind="mantenimiento" total={tierC.nQ} asignatura={tierC.asignatura} tema={`Tier C express · ${tierC.capitulo}`} capId={tierC.capId} color={CORAL} titulo={`Registrar ${tierC.nQ}Q Tier C · ${tierC.asignatura}`} tactica qIds={pool.tierC} onSaved={bump} />
          </View>
        </FadeUp>
      )}
      <ExportRow sync={sync} />
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
  const [sync, setSync] = useState<SyncInfo>(null);
  // bump = re-render tras guardar; el contador del espejo sube 1 (el push va en segundo plano)
  const bump = () => { setTick((t) => t + 1); setSync((s) => (s && s.ok ? { ...s, remotas: s.remotas + 1 } : s)); };
  // espejo Supabase: merge por id en ambos sentidos al montar (fallback silencioso)
  useEffect(() => {
    let vivo = true;
    mirEvalLogPull().then((r) => { if (!vivo) return; setSync(r); if (r.anadidas) bump(); }).catch(() => { if (vivo) setSync({ ok: false, anadidas: 0, subidas: 0, remotas: 0 }); });
    return () => { vivo = false; };
  }, []);
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
          <Text style={st.ctxSub}>{`1ª vuelta · ProMIR · ${MIR_DIAS.length} d (${MIR_DAILY_META.inicio.slice(5).replace('-', '-')}→${MIR_DAILY_META.fin.slice(5)})`}</Text>
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
            <MantenimientoView dia={diaM} onPick={(d) => setSelM(d)} bump={bump} sync={sync} />
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
            {view === 'hoy' ? <HoyView dia={dia} onOpenTemario={() => setView('temario')} hecho={done.has(dia.d)} onToggle={toggleDone} onPick={pickDay} hoyISO={iso} bump={bump} sync={sync} />
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
const tabular = Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {};
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
  plegHead: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 10, marginBottom: 6, backgroundColor: 'rgba(255,255,255,0.02)', ...WEB_LINK },
  plegTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },

  timerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 6 },
  timerBig: { fontSize: 30, fontWeight: '900', letterSpacing: -1, minWidth: 92, ...tabular },
  timerLap: { fontSize: FontSize.labelMd, fontWeight: '700', ...tabular },

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
  markTxt: { fontSize: 13, fontWeight: '900', width: 16, textAlign: 'center' },
});
