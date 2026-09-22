import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native';
import { Colors, Spacing, BorderRadius, Hairline } from '../../theme/tokens';
import { HeroBackdrop } from '../HeroBackdrop';
import {
  semanaStep1, semanaLabel, SemanaStep1,
  leerAnkiKpi, ankiKpiLabel, ankiAlarma, AnkiKpi, ANKI_KPI_KEY,
} from '../../lib/homeBriefing';
import {
  estadoSync, onProgressSync, pullAll, exportProgresoJSON, importProgresoJSON,
  copiarAlPortapapeles, leerPortapapeles, SyncInfo,
} from '../../lib/studyProgressSync';

/**
 * CockpitStatusBar — la "línea de estado" firma del Home (mission control).
 * Numerales de instrumento (tabular-nums + mono), borde inferior en ORO champagne
 * (Hairline.accentSoft) que NINGÚN otro segmento usa → reconocible al instante.
 *
 * Consume datos YA cargados por el Home (no pide data nueva): hora Lima, fase del
 * orquestador, countdown MIR, dot Online/Offline, racha discreta y campana de reports.
 * La racha vive AQUÍ (Things 3: nada de card 🔥 gigante — dato discreto de estado).
 *
 * v5.7 (5-sep-2026): + instrumento SEMANA "S N/20" del Step 1 (revisión semanal, deload) y
 * + instrumento ANKI "due · backlog · retención" leído de localStorage 'jmd-anki-telemetria'
 * (lo escribe DATA/_scripts/anki_telemetria.js; opcionalmente /anki_telemetria.json en web).
 * Ambos son opcionales: si el Home no los pasa, se calculan aquí sin pedir data nueva.
 *
 * v5.10 (12-sep-2026): + instrumento PROGRESO "N ✓ · ☁ ok/offline" (espejo Supabase `plan_checks`,
 * src/lib/studyProgressSync.ts). Tocar = panel con "Exportar / Importar progreso" (JSON al portapapeles y
 * pegar) + "Sincronizar ahora". Vacío 9 de gaps_v3b_synapse.json: el progreso ya no vive solo en un navegador.
 */

const MONO = Platform.OS === 'web' ? "'JetBrains Mono', 'SF Mono', monospace" : undefined;
const GOLD = Colors.gold;

/** Hora local de Lima (UTC-5) en HH:MM, sin depender del huso del dispositivo. */
export function limaHHMM(): string {
  try {
    const now = new Date();
    const lima = new Date(now.getTime() + (now.getTimezoneOffset() - 300) * 60000);
    const z = (n: number) => String(n).padStart(2, '0');
    return `${z(lima.getHours())}:${z(lima.getMinutes())}`;
  } catch {
    return '--:--';
  }
}
function hoyISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return '2026-09-23'; }
}

interface Item {
  label: string;
  value: string;
  color?: string;
  mono?: boolean;
}

export interface CockpitStatusBarProps {
  timeLabel: string;        // hora Lima HH:MM
  phase: string;            // fase del orquestador
  countdownDays: number;    // días a MIR 2030
  online: boolean;          // isLocalAvailable
  streak: number;           // racha (dato discreto — sin emoji gigante)
  unread: number;           // reports sin leer
  onBell?: () => void;      // abre modal de reports (mobile); undefined = sin campana táctil
  compact?: boolean;        // mobile
  semana?: SemanaStep1 | null;   // v5.7 opcional: semana N/20 del Step 1 (si no, se calcula aquí)
  anki?: AnkiKpi | null;         // v5.7 opcional: KPI Anki (si no, localStorage 'jmd-anki-telemetria')
}

function Instrument({ label, value, color, mono = true }: Item) {
  return (
    <View style={st.inst}>
      <Text style={st.instLabel}>{label}</Text>
      <Text style={[st.instValue, mono && { fontFamily: MONO, fontVariant: ['tabular-nums'] }, color ? { color } : null]}>
        {value}
      </Text>
    </View>
  );
}

/**
 * v5.14 (19-sep) · KPI "1ª review de Anki del día" (regla "05:00 Anki sin excepción", telemetría v2 de anki_telemetria.js):
 * primeraReview = 'HH:MM' de la 1ª review del revlog · primeraReviewEstado = verde (≤ 05:10) · ambar (> 05:10) · rojo (sin review L-V)
 * · finde (sáb/dom) · pendiente (antes de las 05:00) · desconocido. Los campos viajan en la misma entrada de 'jmd-anki-telemetria';
 * AnkiKpi (homeBriefing.ts) aún no los tipa → se leen aquí con un tipo ampliado. Solo cuenta la entrada de HOY (fecha = hoy).
 */
type AnkiKpiV2 = AnkiKpi & { primeraReview?: string | null; primeraReviewEstado?: 'verde' | 'ambar' | 'rojo' | 'finde' | 'pendiente' | 'desconocido' | string };
export interface PrimeraReview { estado: string; hora: string | null; color: string | null; sufijo: string }
export function primeraReviewDe(k: AnkiKpi | null, hoyISO?: string): PrimeraReview {
  const e = k as AnkiKpiV2 | null;
  const hoy = hoyISO ?? new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  if (!e || !e.primeraReviewEstado || e.fecha !== hoy) return { estado: 'sin-dato', hora: null, color: null, sufijo: '' };
  const estado = String(e.primeraReviewEstado);
  const hora = e.primeraReview ?? null;
  const color = estado === 'verde' ? Colors.green : estado === 'ambar' ? Colors.amber : estado === 'rojo' ? Colors.coral : null;
  const sufijo = estado === 'verde' || estado === 'ambar' ? ` · 1ª ${hora ?? '?'}` : estado === 'rojo' ? ' · 1ª —' : estado === 'pendiente' ? ' · 1ª ⏳' : '';
  return { estado, hora, color, sufijo };
}

/** KPI Anki: localStorage primero; en web intenta además /anki_telemetria.json (si se sirve desde public/). */
function useAnkiKpi(prop?: AnkiKpi | null): AnkiKpi | null {
  const [kpi, setKpi] = useState<AnkiKpi | null>(() => (prop !== undefined ? prop : leerAnkiKpi()));
  useEffect(() => {
    if (prop !== undefined) { setKpi(prop); return; }
    if (Platform.OS !== 'web' || typeof fetch !== 'function') return;
    let alive = true;
    fetch('/anki_telemetria.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!alive || !j) return;
        const e = Array.isArray(j) ? j[j.length - 1] : (Array.isArray(j?.entradas) ? j.entradas[j.entradas.length - 1] : j);
        if (e && e.fecha) {
          try { (globalThis as any).localStorage?.setItem(ANKI_KPI_KEY, JSON.stringify(e)); } catch { /* ignore */ }
          setKpi(e as AnkiKpi);
        }
      })
      .catch(() => { /* sin fichero: se queda con localStorage */ });
    return () => { alive = false; };
  }, [prop]);
  return kpi;
}

/** Export de localStorage (claves jmd-*) al portapapeles — lo lee DATA/_scripts/gen_revision_semanal.js (--ls). Solo web; no-op si no hay storage/clipboard. */
export function exportarLocalStorageJmd(): boolean {
  try {
    const ls = (globalThis as any).localStorage; const nav = (globalThis as any).navigator;
    if (!ls || !nav?.clipboard?.writeText) return false;
    const out: Record<string, unknown> = {};
    for (let i = 0; i < ls.length; i++) {
      const k = ls.key(i); if (!k || !k.startsWith('jmd-')) continue;
      const raw = ls.getItem(k); try { out[k] = JSON.parse(raw as string); } catch { out[k] = raw; }
    }
    out['_export'] = { fecha: new Date().toISOString(), claves: Object.keys(out).length };
    nav.clipboard.writeText(JSON.stringify(out)); return true;
  } catch { return false; }
}

/** Estado del espejo de progreso (plan_checks): se refresca con cada pull/push/import. */
function useProgresoSync(): SyncInfo {
  const [info, setInfo] = useState<SyncInfo>(() => estadoSync());
  useEffect(() => onProgressSync(setInfo), []);
  return info;
}
const SYNC_LABEL: Record<SyncInfo['estado'], string> = { idle: '☁ —', sync: '☁ …', ok: '☁ ok', offline: '☁ offline' };

/**
 * Panel "Exportar / Importar progreso" (v5.10). Exportar = JSON de los ✓ de los 10 planes (+ jmd-modo-log) al
 * portapapeles; Importar = lee el portapapeles (si el navegador lo permite) o el campo de texto, fusiona por UNIÓN
 * (nunca borra un ✓) y empuja a Supabase. También sirve para pegar el export jmd-* del instrumento SEMANA.
 */
function ProgresoPanel({ info, onClose }: { info: SyncInfo; onClose: () => void }) {
  const [texto, setTexto] = useState('');
  const [msg, setMsg] = useState<string>(info.error ? `último error: ${info.error.slice(0, 60)}` : '');
  const exportar = async () => {
    const json = exportProgresoJSON();
    const ok = await copiarAlPortapapeles(json);
    setTexto(ok ? '' : json);
    setMsg(ok ? `copiado (${info.totalChecks} ✓ de los planes) — pégalo en el otro navegador o en DATA/USMLE/REVISIONES/_localstorage_export.json` : 'sin portapapeles: copia el JSON del campo de abajo');
  };
  const importar = async (src?: string) => {
    let t = (src ?? texto).trim();
    if (!t) { const clip = await leerPortapapeles(); if (clip) t = clip.trim(); }
    if (!t) { setMsg('nada que importar: pega el JSON en el campo (el navegador no deja leer el portapapeles)'); return; }
    const r = importProgresoJSON(t);
    setMsg(r.ok ? `importado: ${r.planes} plan(es), +${r.nuevos} ✓ nuevos (total ${r.total}) · subiendo a Supabase…` : `no importado: ${r.error}`);
    if (r.ok) setTexto('');
  };
  const sincronizar = async () => { setMsg('sincronizando…'); const ok = await pullAll(true); setMsg(ok ? 'sincronizado con Supabase (plan_checks)' : `sin conexión: ${estadoSync().error || 'reintenta luego'} · el progreso sigue guardado en este navegador`); };
  return (
    <View style={st.panel}>
      <View style={st.panelRow}>
        <Text style={st.panelTitle}>PROGRESO · {info.totalChecks} ✓ · {SYNC_LABEL[info.estado]}{info.ultimoOk ? ` ${new Date(info.ultimoOk).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Lima' })}` : ''} · {info.device}</Text>
        <TouchableOpacity onPress={onClose} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}><Text style={st.panelClose}>✕</Text></TouchableOpacity>
      </View>
      <View style={st.panelRow}>
        <TouchableOpacity style={st.panelBtn} onPress={() => { void exportar(); }}><Text style={st.panelBtnTxt}>EXPORTAR → portapapeles</Text></TouchableOpacity>
        <TouchableOpacity style={st.panelBtn} onPress={() => { void importar(); }}><Text style={st.panelBtnTxt}>IMPORTAR ← portapapeles / campo</Text></TouchableOpacity>
        <TouchableOpacity style={st.panelBtn} onPress={() => { void sincronizar(); }}><Text style={st.panelBtnTxt}>SINCRONIZAR AHORA</Text></TouchableOpacity>
      </View>
      <TextInput
        value={texto} onChangeText={setTexto} placeholder='pega aquí el JSON exportado ({"progreso":{"usmle":[1,2,…]}}) y toca IMPORTAR'
        placeholderTextColor={Colors.muted} multiline numberOfLines={2} style={st.panelInput} autoCapitalize="none" autoCorrect={false}
      />
      {!!msg && <Text style={st.panelMsg}>{msg}</Text>}
    </View>
  );
}

export default function CockpitStatusBar({
  timeLabel, phase, countdownDays, online, streak, unread, onBell, compact, semana, anki,
}: CockpitStatusBarProps) {
  const dotColor = online ? Colors.teal : Colors.muted;
  const sem = semana !== undefined && semana !== null ? semana : semanaStep1(hoyISO());
  const kpi = useAnkiKpi(anki);
  const alarma = ankiAlarma(kpi);
  const pr = primeraReviewDe(kpi);                                         // v5.14: 1ª review del día (verde ≤05:10 · ámbar · rojo)
  const semColor = sem.fueraDeRango ? Colors.muted : sem.deload ? Colors.amber : Colors.teal;
  const [exportado, setExportado] = useState<'ok' | 'no' | null>(null); // feedback del export jmd-* (revisión semanal)
  const prog = useProgresoSync();                                         // v5.10 · espejo plan_checks
  const [panel, setPanel] = useState(false);                              // panel Exportar / Importar progreso
  const progColor = prog.estado === 'ok' ? Colors.green : prog.estado === 'offline' ? Colors.amber : Colors.muted;

  const bell = (
    <View style={[st.bell, unread > 0 && { borderColor: Colors.coral + '55' }]}>
      <Text style={st.bellGlyph}>{unread > 0 ? '◉' : '○'}</Text>
      <Text style={[st.bellTxt, unread > 0 && { color: Colors.coral }]}>
        {unread > 0 ? `${unread} report${unread > 1 ? 's' : ''}` : 'reports'}
      </Text>
      {unread > 0 && <View style={st.bellDot} />}
    </View>
  );

  return (
    <View style={[st.bar, compact && st.barCompact]}>
      {/* Constelación real (mission control) de fondo, sutil — no roba legibilidad */}
      <HeroBackdrop image="home" opacity={0.3} scrim="bottom" />
      {/* Identidad + reloj (bloque izquierdo) */}
      <View style={st.left}>
        <View style={st.railGold} />
        <View>
          <Text style={st.callsign}>JOSEPH MD · COMMAND</Text>
          <Text style={st.subline}>Dermatologist · Mayo Clinic · Rochester, MN</Text>
        </View>
      </View>

      {/* Instrumentos numéricos (bloque derecho) */}
      <View style={st.instrumentsRow}>
        <Instrument label="LIMA" value={timeLabel} color={Colors.onSurface} />
        <View style={st.vDiv} />
        <Instrument label="PHASE" value={phase} color={Colors.teal} mono={false} />
        <View style={st.vDiv} />
        {/* v5.7 · Semana N/20 del Step 1 (sáb 07:15 revisión semanal · deload secundarios). Tocar = copiar export jmd-* (web) */}
        <TouchableOpacity activeOpacity={0.7} onPress={() => setExportado(exportarLocalStorageJmd() ? 'ok' : 'no')} hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}>
          <Instrument
            label={exportado === 'ok' ? 'SEMANA · export ✓' : exportado === 'no' ? 'SEMANA · sin clipboard' : sem.deload ? 'SEMANA · DELOAD' : sem.hito ? `SEMANA · ${sem.hito}` : 'SEMANA'}
            value={semanaLabel(sem)}
            color={semColor}
          />
        </TouchableOpacity>
        <View style={st.vDiv} />
        {/* v5.7 · KPI Anki (due hoy · backlog · retención 30d) — alarma G si backlog>100 o retención<85%.
            v5.14 · color por 1ª review del día (primeraReviewEstado): verde ≤05:10 · ámbar >05:10 · rojo sin review L-V; la avalancha manda. */}
        <Instrument
          label={alarma ? 'ANKI · ⚠ avalancha' : pr.estado === 'rojo' ? 'ANKI · ⚠ sin 1ª review' : pr.estado === 'ambar' ? 'ANKI · 1ª tarde' : 'ANKI'}
          value={`${ankiKpiLabel(kpi)}${pr.sufijo}`}
          color={alarma ? Colors.coral : pr.color ?? (kpi && kpi.estado === 'ok' ? Colors.green : Colors.muted)} />
        <View style={st.vDiv} />
        <Instrument label="MIR 2030" value={`${countdownDays}d`} color={GOLD} />
        <View style={st.vDiv} />
        <Instrument label="STREAK" value={`${streak}d`} color={streak > 0 ? Colors.champagne : Colors.muted} />
        <View style={st.vDiv} />
        {/* v5.10 · PROGRESO: ✓ de los 10 planes + estado del espejo Supabase (plan_checks). Tocar = Exportar / Importar */}
        <TouchableOpacity activeOpacity={0.7} onPress={() => setPanel((p) => !p)} hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
          style={Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : undefined}>
          <Instrument label={panel ? 'PROGRESO · cerrar' : 'PROGRESO · exportar/importar'} value={`${prog.totalChecks} ✓ · ${SYNC_LABEL[prog.estado]}`} color={progColor} />
        </TouchableOpacity>
        <View style={st.vDiv} />
        {/* Online/Offline */}
        <View style={st.inst}>
          <Text style={st.instLabel}>LINK</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
            <View style={[st.statusDot, { backgroundColor: dotColor }]} />
            <Text style={[st.instValue, { fontFamily: MONO, color: dotColor, fontSize: 12 }]}>
              {online ? 'ONLINE' : 'OFFLINE'}
            </Text>
          </View>
        </View>
        <View style={st.vDiv} />
        {onBell ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onBell}
            style={Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : undefined}>
            {bell}
          </TouchableOpacity>
        ) : bell}
      </View>
      {/* v5.10 · panel Exportar / Importar progreso (ocupa toda la fila; solo cuando se abre) */}
      {panel && <ProgresoPanel info={prog} onClose={() => setPanel(false)} />}
    </View>
  );
}

const st = StyleSheet.create({
  bar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    flexWrap: 'wrap', gap: 12,
    paddingVertical: 12, paddingHorizontal: 14,
    backgroundColor: 'rgba(15,25,45,0.55)',
    borderRadius: BorderRadius.lg,
    borderWidth: 1, borderColor: Hairline.soft,
    borderBottomWidth: 2, borderBottomColor: Hairline.accentSoft,   // firma ORO
    marginBottom: Spacing.section,
    overflow: 'hidden',   // recorta la hero constelación al borde redondeado
  },
  barCompact: { paddingVertical: 10, paddingHorizontal: 12 },

  left: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  railGold: { width: 3, height: 30, borderRadius: 2, backgroundColor: GOLD },
  callsign: { fontSize: 13, fontWeight: '800', color: Colors.onSurface, letterSpacing: 1.2, fontFamily: MONO },
  subline: { fontSize: 10, color: Colors.onSurfaceVariant, marginTop: 2, letterSpacing: 0.2 },

  instrumentsRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 4 },
  inst: { alignItems: 'flex-start', paddingHorizontal: 8, minWidth: 44 },
  instLabel: { fontSize: 8, fontWeight: '700', color: Colors.smallLabel, letterSpacing: 1.2, fontFamily: MONO },
  instValue: { fontSize: 14, fontWeight: '300', color: Colors.onSurfaceVariant, letterSpacing: 0.3, marginTop: 2 },

  vDiv: { width: 1, height: 22, backgroundColor: Hairline.soft },

  statusDot: { width: 7, height: 7, borderRadius: 4, marginRight: 5 },

  bell: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(231,234,242,0.04)',
    borderWidth: 1, borderColor: Hairline.soft, borderRadius: BorderRadius.full,
    paddingVertical: 5, paddingHorizontal: 11,
  },
  bellGlyph: { fontSize: 11, color: Colors.onSurfaceVariant },
  bellTxt: { fontSize: 10, fontWeight: '700', color: Colors.onSurfaceVariant, letterSpacing: 0.5, fontFamily: MONO },
  bellDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.coral, marginLeft: 2 },

  // v5.10 · panel Exportar / Importar progreso (mismo lenguaje que la barra: mono, hairlines, oro)
  panel: {
    width: '100%', gap: 8, paddingTop: 10, marginTop: 2,
    borderTopWidth: 1, borderTopColor: Hairline.soft,
  },
  panelRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between' },
  panelTitle: { fontSize: 9, fontWeight: '700', color: Colors.smallLabel, letterSpacing: 1, fontFamily: MONO, flexShrink: 1 },
  panelClose: { fontSize: 12, color: Colors.onSurfaceVariant, paddingHorizontal: 6 },
  panelBtn: {
    backgroundColor: 'rgba(231,234,242,0.04)', borderWidth: 1, borderColor: Hairline.accentSoft,
    borderRadius: BorderRadius.full, paddingVertical: 5, paddingHorizontal: 11,
  },
  panelBtnTxt: { fontSize: 10, fontWeight: '700', color: GOLD, letterSpacing: 0.5, fontFamily: MONO },
  panelInput: {
    minHeight: 34, maxHeight: 72, fontSize: 10, color: Colors.onSurface, fontFamily: MONO,
    backgroundColor: 'rgba(0,0,0,0.25)', borderWidth: 1, borderColor: Hairline.soft, borderRadius: BorderRadius.md,
    paddingVertical: 6, paddingHorizontal: 10,
  },
  panelMsg: { fontSize: 10, color: Colors.onSurfaceVariant, fontFamily: MONO, letterSpacing: 0.2 },
});
