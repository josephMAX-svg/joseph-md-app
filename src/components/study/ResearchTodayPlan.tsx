import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  DAILY_META, FRANJAS, DIAS, REC, FASE_INFO, PISTA_INFO, DiaResearch, FaseId,
  diaPrevio, ventana7d, proximoD,
} from '../../lib/researchDailyPlan';
import { DIAS_2027, DAILY_META_2027 } from '../../lib/researchDailyPlan2027';
import { agruparProgreso, progresoGlobal, GrupoProgreso, loadDone, saveDone } from '../../lib/studyProgress';
import { diaEstudioTipo, PRIORIDAD_COLOR } from '../../lib/researchData';
import { researchObsUrlDay } from '../../lib/obsidianResearchMap';
import { serifTitle, InkColors, OBSIDIAN } from './researchTheme';

/**
 * ResearchTodayPlan — Plan de research día-a-día (3 pistas: carta al editor · tesis · case report + SR-1),
 * presentado como ENTRADA de cuaderno de laboratorio (fecha en el lomo, código del átomo, objetivo en serif,
 * ENTREGABLE + ARTEFACTO como sello del día). Mismo motor que UsmleTodayPlan: nav de día ◄►, sub-pestañas
 * HOY/Horario/7d/Temario, progreso REAL marcable (empieza 0%, localStorage clave 'research'),
 * interdiario con Derma. Navega los DOS ciclos (ciclo 1 sep-26→feb-27 · ciclo 2 feb→ago-27, SR-1) con una
 * numeración continua de d. Cada recurso de la cola abre un sitio REAL verificado.
 * (05-sep-2026) Muestra PISTA (C/T/CR/R/M/K/B/X), ARTEFACTO y chips de dependencia (p. ej. "requiere Derma d19-20").
 */
const TEAL = InkColors.teal;      // #6BB8B0
const GOLD = InkColors.gold;      // #C8A96A — estatus (artefacto/entregable hecho)
const PURPLE = InkColors.amethyst; // #9A7BC8
const OBS = OBSIDIAN;             // #9A7BC8
const ANCLA = InkColors.periwinkle; // #7C83D6 — eval anclada
/** Ambos ciclos, d continuo (1-42 ciclo 1 · 43+ ciclo 2). */
const TODOS: DiaResearch[] = [...DIAS, ...DIAS_2027];
const PAUSA = (() => { const m = /^(20\d\d-\d\d-\d\d) → (20\d\d-\d\d-\d\d)/.exec(DAILY_META.pausa); return m ? { desde: m[1], hasta: m[2] } : null; })();
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return DAILY_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}
function faseColor(f: FaseId): string { return FASE_INFO[f].color; }
function diaLabel(d: DiaResearch): string {
  return d.ciclo === 1 ? `Día ${d.d}/${DAILY_META.totalDias} · ciclo 1` : `Día ${d.d - DAILY_META_2027.dOffset}/${DAILY_META_2027.totalDias} · ciclo 2 (d${d.d})`;
}

/** Ítem de la cola de hoy: recurso real con botón "ver ↗". */
function ColaItem({ icon, lbl, val, sub, color, url }: { icon: string; lbl: string; val: string; sub: string; color: string; url: string }) {
  return (
    <View style={[st.cola, { borderLeftColor: color }]}>
      <Text style={st.colaIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={st.colaLbl}>{lbl}</Text>
        <Text style={st.colaVal} numberOfLines={2}>{val}</Text>
        <Text style={st.colaSub}>{sub}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(url)} style={[st.verBtn, { borderColor: color + '88' }]}>
        <Text style={[st.verTxt, { color }]}>ver ↗</Text>
      </TouchableOpacity>
    </View>
  );
}

function HoyView({ dia, onOpenTemario, hecho, onToggle }: { dia: DiaResearch; onOpenTemario: () => void; hecho: boolean; onToggle: (d: number) => void }) {
  const prev = diaPrevio(dia, TODOS);
  const fc = faseColor(dia.fase);
  const fi = FASE_INFO[dia.fase];
  const pista = PISTA_INFO[dia.pista];
  const obsUrl = researchObsUrlDay(dia.d);
  return (
    <View>
      {/* Tema del día — el badge de fase lleva al Temario */}
      <FadeUp>
        <View style={[st.temaCard, { borderColor: fc + '55' }]}>
          <View style={st.temaTop}>
            <TouchableOpacity activeOpacity={0.8} onPress={onOpenTemario} style={[st.sysBadge, { backgroundColor: fc + '1F', borderColor: fc + '66' }]}>
              <Text style={[st.sysBadgeTxt, { color: fc }]}>{dia.fase} · {fi.nombre} ›</Text>
            </TouchableOpacity>
            <Chip label={dia.code} color={fc} small />
            <Chip label={`pista ${dia.pista} · ${pista.label}`} color={pista.color} small solid />
            <Chip label={dia.prioridad} color={PRIORIDAD_COLOR[dia.prioridad]} small />
            {fi.pilar !== 'base' && <Chip label={fi.pilar} color={Colors.muted} small />}
            <Chip label={`ciclo ${dia.ciclo}`} color={Colors.muted} small />
          </View>
          <Text style={[st.temaTitle, serifTitle]}>{dia.objetivo}</Text>
          {dia.chips && dia.chips.length > 0 && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              {dia.chips.map((c, i) => (
                <View key={i} style={[st.depChip, { borderColor: (c.startsWith('requiere') ? PURPLE : Colors.coral) + '77' }]}>
                  <Text style={[st.depChipTxt, { color: c.startsWith('requiere') ? PURPLE : Colors.coral }]}>⚑ {c}</Text>
                </View>
              ))}
            </View>
          )}
          <View style={[st.entregBox, { borderColor: GOLD + '3A' }]}>
            <Text style={st.entregLbl}>ENTREGABLE · lo que queda hecho hoy</Text>
            <Text style={st.entregTxt}>{dia.entregable}</Text>
          </View>
          <View style={[st.artefBox, { borderColor: pista.color + '44' }]}>
            <Text style={[st.entregLbl, { color: pista.color }]}>ARTEFACTO · dónde queda (fichero · nota · estado)</Text>
            <Text style={st.entregTxt}>{dia.artefacto}</Text>
            {pista.entregableId && <Text style={st.artefSub}>→ avanza el entregable «{pista.entregableId}» de la Mesa editorial (Desk)</Text>}
          </View>
          <TouchableOpacity activeOpacity={0.85} onPress={() => onToggle(dia.d)} style={[st.doneBtn, hecho ? st.doneBtnOn : st.doneBtnOff]}>
            <Text style={[st.doneBtnTxt, { color: hecho ? '#1A1505' : GOLD }]}>{hecho ? '✓ Artefacto sellado' : '○ Sellar artefacto como hecho'}</Text>
          </TouchableOpacity>
        </View>
      </FadeUp>

      {/* Eval anclada (átomo previo) */}
      {prev && (
        <FadeUp delay={40}>
          <View style={st.anchor}>
            <Text style={st.anchorLbl}>13:30 · Eval anclada (sesión anterior)</Text>
            <Text style={st.anchorVal}>{prev.code} · {prev.objetivo}</Text>
            <Text style={st.anchorSub}>2Q de auto-test del método + ¿existe el artefacto de la sesión anterior? ({prev.artefacto}) · APEX-método AGAIN/GOOD</Text>
          </View>
        </FadeUp>
      )}

      {/* Cola de recursos reales de hoy */}
      <Text style={st.secLbl}>📋 Deep work · 13:40–14:05 · recursos reales (en orden)</Text>
      {dia.recs.map((k, i) => {
        const r = REC[k];
        if (!r) return null;
        const icon = i === 0 ? '▶' : i === 1 ? '§' : '¶';
        const color = i === 0 ? TEAL : i === 1 ? ANCLA : InkColors.sapphire;
        return <FadeUp key={k} delay={60 + i * 30}><ColaItem icon={icon} lbl={`RECURSO ${i + 1} · ${dia.tool}`} val={r.label} sub={k} color={color} url={r.url} /></FadeUp>;
      })}

      {/* Obsidian — carpeta del entregable / fase de este átomo */}
      {obsUrl && (
        <FadeUp delay={195}>
          <ColaItem icon="◆" lbl="OBSIDIAN · carpeta del entregable / fase" val={`${pista.label} · ${fi.nombre}`}
            sub="Vault_Medicina MIR_Joseph · aquí caen las notas/APEX de este átomo" color={OBS} url={obsUrl} />
        </FadeUp>
      )}

      {/* APEX */}
      <FadeUp delay={210}>
        <View style={[st.cola, { borderLeftColor: GOLD }]}>
          <Text style={st.colaIcon}>◆</Text>
          <View style={{ flex: 1 }}>
            <Text style={st.colaLbl}>APEX-método · 14:10–14:15</Text>
            <Text style={st.colaVal}>{dia.apex ? `Crea ≤3 APEX — hito: ${dia.apex.t}` : 'Crea ≤3 APEX-método (Palmerton)'}</Text>
            <Text style={st.colaSub}>Free recall a papel antes · guarda el artefacto (Mesa editorial / PROSPERO / Rayyan / .docx)</Text>
          </View>
        </View>
      </FadeUp>
    </View>
  );
}

function HorarioView({ dia }: { dia: DiaResearch }) {
  const prev = diaPrevio(dia, TODOS);
  const detalle = (tipo: string): string => {
    if (tipo === 'eval') return prev ? `${prev.code} → ${prev.artefacto}` : 'no hay átomo previo';
    if (tipo === 'pretest') return dia.objetivo;
    if (tipo === 'work') return `${REC[dia.recs[0]]?.label ?? ''} · ${dia.entregable}`;
    if (tipo === 'recall') return dia.artefacto;
    if (tipo === 'apex') return dia.apex ? dia.apex.t : '';
    return '';
  };
  return (
    <View>
      <Text style={st.secLbl}>🕓 Bloque Research · {diaLabel(dia)} ({fmtFecha(dia.fecha)}) · hora Lima</Text>
      {FRANJAS.map((f, i) => {
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
      <Text style={st.note}>Interdiario con Derma: el bloque 13:30–14:15 del Calendar alterna Research↔Derma. Avanzas 1 átomo por día-Research. No se modifica el Calendar. {PAUSA ? `Pausa Step 1: ${PAUSA.desde} → ${PAUSA.hasta} (0 átomos).` : ''}</Text>
    </View>
  );
}

function SieteView({ fromD, onPick }: { fromD: number; onPick: (d: number) => void }) {
  const win = ventana7d(fromD, TODOS);
  return (
    <View>
      <Text style={st.secLbl}>📆 Próximos 7 átomos · toca uno para abrirlo</Text>
      {win.map((x, i) => {
        const fc = faseColor(x.fase);
        const p = PISTA_INFO[x.pista];
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: fc }]}>
              <Text style={[st.d7day, { color: fc }]}>{x.code}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.objetivo}</Text>
                <Text style={st.d7sys}><Text style={{ color: p.color, fontWeight: '800' }}>{x.pista}</Text> · {x.fase} · {FASE_INFO[x.fase].nombre} · {x.artefacto}</Text>
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

function FaseCard({ g, hoyD, onPick, done, onToggle }: { g: GrupoProgreso<DiaResearch>; hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const fase = g.dias[0].fase;
  const fc = faseColor(fase);
  const estadoTxt = g.estado === 'completado' ? '✓ completado' : g.estado === 'en-curso' ? `en curso · ${g.pct}%` : `pendiente · empieza ${g.dias[0].code} (${fmtFecha(g.dias[0].fecha)})`;
  const estadoColor = g.estado === 'completado' ? TEAL : g.estado === 'en-curso' ? fc : Colors.muted;
  return (
    <View style={[st.sysCard, { borderColor: fc + (g.estado === 'en-curso' ? '88' : '2E') }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
        <View style={st.sysHead}>
          <Text style={st.sysTitle} numberOfLines={1}>{open ? '▾' : '▸'} {g.clave}</Text>
          <Text style={[st.sysCount, { color: estadoColor }]}>{g.hechos}/{g.total}</Text>
        </View>
        <ProgressBar pct={g.pct} color={fc} />
        <Text style={[st.sysEstado, { color: estadoColor }]}>{estadoTxt}</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: 8 }}>
          {g.dias.map((x) => {
            const hecho = done.has(x.d), now = x.d === hoyD;
            const obs = researchObsUrlDay(x.d);
            return (
              <View key={x.d} style={[st.temaRow, now && st.temaRowOn]}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle(x.d)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
                  <Text style={[st.temaChk, { color: hecho ? TEAL : 'rgba(255,255,255,0.25)' }]}>{hecho ? '☑' : '☐'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={st.temaRowMain}>
                  <Text style={[st.temaRowD, { color: hecho ? TEAL : now ? fc : Colors.muted }]}>{now ? '▶' : ''} {x.code}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={st.temaRowTxt} numberOfLines={1}>{x.objetivo}</Text>
                    <Text style={st.temaRowSub} numberOfLines={1}>{fmtFecha(x.fecha)} · {x.artefacto}</Text>
                  </View>
                  <Text style={st.temaRowGo}>→</Text>
                </TouchableOpacity>
                {obs && (
                  <TouchableOpacity activeOpacity={0.7} onPress={() => openUrl(obs)} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}>
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
  const [modo, setModo] = useState<'pista' | 'fase'>('pista');
  const clave = modo === 'pista'
    ? (x: DiaResearch) => `C${x.ciclo} · pista ${x.pista} · ${PISTA_INFO[x.pista].label}`
    : (x: DiaResearch) => `C${x.ciclo} · ${x.fase} · ${FASE_INFO[x.fase].nombre}`;
  const grupos = agruparProgreso(TODOS, clave, hoyD, done);
  const glob = progresoGlobal(TODOS, done);
  const g1 = progresoGlobal(DIAS, done);
  const g2 = progresoGlobal(DIAS_2027, done);
  return (
    <View>
      <View style={st.globCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={st.globTitle}>🗂️ Temario · 3 pistas + SR-1 · progreso real</Text>
          <Text style={[st.globPct, { color: TEAL }]}>{glob.pct}%</Text>
        </View>
        <ProgressBar pct={glob.pct} color={TEAL} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} átomos · hoy = d{hoyD} · ciclo 1: {g1.hechos}/{g1.total} ({DAILY_META.inicio} → {DAILY_META.fin}) · ciclo 2: {g2.hechos}/{g2.total} ({DAILY_META_2027.inicio} → {DAILY_META_2027.fin})</Text>
        <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
          {([['pista', 'por pista (C · T · CR · R · M …)'], ['fase', 'por fase del método']] as const).map(([k, lbl]) => (
            <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setModo(k)} style={[st.modoBtn, modo === k && st.modoBtnOn]}>
              <Text style={[st.modoTxt, modo === k && { color: TEAL }]}>{lbl}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {grupos.map((g) => <FaseCard key={g.clave} g={g} hoyD={hoyD} onPick={onPick} done={done} onToggle={onToggle} />)}
      <Text style={st.note}>Progreso REAL: empezamos en 0%. ☑ marca un átomo como hecho (se guarda en este dispositivo). ▶ = átomo de hoy. Toca el objetivo para ir a ese día. El ciclo 2 (SR-1 con revisor humano #2) arranca tras el Step 1.</Text>
    </View>
  );
}

export default function ResearchTodayPlan() {
  const iso = todayISO();
  const tipoHoy = diaEstudioTipo(new Date());
  const hoyD = proximoD(iso, TODOS);
  const todayDia = TODOS.find((x) => x.fecha === iso) || TODOS.find((x) => x.d === hoyD) || TODOS[0];
  const [sel, setSel] = useState<number>(todayDia.d);
  const [view, setView] = useState<'hoy' | 'horario' | '7d' | 'temario'>('hoy');
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone('research')));
  const dia = TODOS.find((x) => x.d === sel) || TODOS[0];
  const esHoy = dia.fecha === iso;
  const enPausa = !!PAUSA && iso >= PAUSA.desde && iso <= PAUSA.hasta;
  const pickDay = (d: number) => { setSel(d); setView('hoy'); };
  const toggleDone = (d: number) => setDone((prev) => {
    const n = new Set(prev);
    if (n.has(d)) n.delete(d); else n.add(d);
    saveDone('research', Array.from(n));
    return n;
  });
  const artefactoVivo = dia.ciclo === 1 ? DAILY_META.artefacto : DAILY_META_2027.artefacto;

  return (
    <View>
      {/* Banner interdiario Research/Derma + artefacto vivo */}
      <View style={st.interRow}>
        <View style={[st.interBtn, tipoHoy === 'research' && !enPausa ? st.interOn : st.interOff]}>
          <Text style={[st.interBig, { color: tipoHoy === 'research' && !enPausa ? TEAL : Colors.muted }]}>🔬 RESEARCH</Text>
          <Text style={st.interSub}>{enPausa ? 'pausa Step 1' : tipoHoy === 'research' ? 'HOY te toca' : 'no es hoy'}</Text>
        </View>
        <View style={[st.interBtn, tipoHoy === 'derma' ? { backgroundColor: PURPLE + '1A', borderColor: PURPLE + '88' } : st.interOff]}>
          <Text style={[st.interBig, { color: tipoHoy === 'derma' ? PURPLE : Colors.muted }]}>💎 DERMA</Text>
          <Text style={st.interSub}>{tipoHoy === 'derma' ? 'HOY te toca →' : 'día alterno'}</Text>
        </View>
        <View style={[st.interBtn, tipoHoy === 'descanso' ? st.interOn : st.interOff, { flex: 0.7 }]}>
          <Text style={[st.interBig, { color: tipoHoy === 'descanso' ? Colors.amber : Colors.muted }]}>😴</Text>
          <Text style={st.interSub}>finde</Text>
        </View>
      </View>
      {enPausa && PAUSA && (
        <View style={[st.artefactoBar, { borderLeftColor: Colors.coral }]}>
          <Text style={[st.artefactoTxt, { color: Colors.coral }]}>⏸ PAUSA TOTAL {PAUSA.desde} → {PAUSA.hasta}: 0 átomos de research (examen Step 1). El siguiente átomo es {TODOS.find((x) => x.fecha > PAUSA.hasta)?.code ?? '—'} el {TODOS.find((x) => x.fecha > PAUSA.hasta)?.fecha ?? '—'}.</Text>
        </View>
      )}
      <View style={st.artefactoBar}>
        <Text style={st.artefactoTxt}>🎯 Artefacto vivo (ciclo {dia.ciclo}): {artefactoVivo}</Text>
      </View>

      {/* Navegación de día */}
      <View style={st.navRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.max(1, s - 1))} style={st.navArrow}><Text style={st.navArrowTxt}>◄</Text></TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={st.navDay}>{dia.code} · {diaLabel(dia)}{esHoy ? ' · HOY' : ''}</Text>
          <Text style={st.navFecha}>{fmtFecha(dia.fecha)} · {dia.fecha} · pista {dia.pista}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.min(TODOS.length, s + 1))} style={st.navArrow}><Text style={st.navArrowTxt}>►</Text></TouchableOpacity>
      </View>
      {!esHoy && <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(todayDia.d)} style={st.hoyBtn}><Text style={st.hoyBtnTxt}>↩ volver a HOY</Text></TouchableOpacity>}

      {/* Sub-pestañas */}
      <View style={st.subTabs}>
        {([['hoy', '📋 HOY'], ['horario', '🕓 Horario'], ['7d', '📆 7 días'], ['temario', '🗂️ Temario']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
            <Text style={[st.subTabTxt, view === k && { color: TEAL }]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <GlassPanel style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
        {view === 'hoy' ? <HoyView dia={dia} onOpenTemario={() => setView('temario')} hecho={done.has(dia.d)} onToggle={toggleDone} />
          : view === 'horario' ? <HorarioView dia={dia} />
          : view === '7d' ? <SieteView fromD={dia.d} onPick={pickDay} />
          : <TemarioView hoyD={hoyD} onPick={pickDay} done={done} onToggle={toggleDone} />}
      </GlassPanel>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, ...Elevation.sm };
const WEB_LINK = Platform.OS === 'web' ? ({ cursor: 'pointer', transition: Motion.base } as any) : {};
const st = StyleSheet.create({
  interRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.sm },
  interBtn: { flex: 1, minWidth: 96, borderRadius: BorderRadius.lg, borderWidth: 1, paddingVertical: Spacing.md, paddingHorizontal: 4, alignItems: 'center', ...WEB_LINK },
  interOn: { backgroundColor: TEAL + '1A', borderColor: TEAL + '88', ...Elevation.glow(TEAL) },
  interOff: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: Hairline.medium },
  interBig: { fontSize: FontSize.labelLg, fontWeight: '900', letterSpacing: 0.4 },
  interSub: { fontSize: 9, color: Colors.muted, marginTop: 3, letterSpacing: 0.2 },
  artefactoBar: { ...cardBase, borderLeftWidth: 3, borderLeftColor: TEAL, padding: Spacing.md, marginBottom: Spacing.sm },
  artefactoTxt: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, lineHeight: LineHeight.labelSm },

  navRow: { flexDirection: 'row', alignItems: 'center', ...cardBase, padding: Spacing.sm, marginBottom: Spacing.xs },
  navArrow: { width: 40, height: 40, borderRadius: BorderRadius.md, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: Hairline.soft, alignItems: 'center', justifyContent: 'center', ...WEB_LINK },
  navArrowTxt: { fontSize: 16, color: TEAL, fontWeight: '800' },
  navDay: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.3, textAlign: 'center' },
  navFecha: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2, letterSpacing: 0.2 },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm, ...WEB_LINK },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: TEAL, fontWeight: '700', letterSpacing: 0.2 },

  subTabs: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm },
  subTab: { flex: 1, paddingVertical: 8, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, alignItems: 'center', ...WEB_LINK },
  subTabOn: { backgroundColor: TEAL + '14', borderColor: TEAL + '55' },
  subTabTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted, letterSpacing: 0.2 },

  temaCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm, ...Elevation.md },
  temaTop: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  sysBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 11, ...WEB_LINK },
  sysBadgeTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },
  temaTitle: { fontSize: FontSize.titleMd, fontWeight: '700', color: Colors.onSurface, marginTop: 9, lineHeight: 25, letterSpacing: -0.3 },
  depChip: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 8, backgroundColor: 'rgba(255,255,255,0.03)' },
  depChipTxt: { fontSize: FontSize.labelSm, fontWeight: '700', lineHeight: 14 },
  entregBox: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.md, marginTop: 11, backgroundColor: GOLD + '08' },
  artefBox: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.md, marginTop: 8, backgroundColor: 'rgba(255,255,255,0.02)' },
  entregLbl: { fontSize: 9, fontWeight: '800', color: GOLD, letterSpacing: 0.8, textTransform: 'uppercase' },
  entregTxt: { fontSize: FontSize.labelMd, color: Colors.onSurface, marginTop: 4, lineHeight: 16 },
  artefSub: { fontSize: 9, color: Colors.muted, marginTop: 4, lineHeight: 13 },
  doneBtn: { marginTop: 11, paddingVertical: 10, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center', ...WEB_LINK },
  doneBtnOff: { backgroundColor: GOLD + '12', borderColor: GOLD + '55' },
  doneBtnOn: { backgroundColor: GOLD, borderColor: GOLD, ...Elevation.glow(GOLD) },
  doneBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },

  anchor: { ...cardBase, borderLeftWidth: 3, borderLeftColor: ANCLA, padding: Spacing.md, marginBottom: Spacing.sm },
  anchorLbl: { fontSize: FontSize.labelMd, fontWeight: '800', color: ANCLA, letterSpacing: 0.2 },
  anchorVal: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface, marginTop: 4, letterSpacing: -0.2 },
  anchorSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 3, lineHeight: LineHeight.labelSm },

  secLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 9, marginTop: Spacing.sm },
  cola: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md, marginBottom: 6 },
  colaIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  colaLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4, textTransform: 'uppercase' },
  colaVal: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600', marginTop: 3, lineHeight: 16 },
  colaSub: { fontSize: 9, color: Colors.muted, marginTop: 3, lineHeight: 13 },
  verBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 11, alignItems: 'center', ...WEB_LINK },
  verTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },

  franja: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 8, borderTopWidth: 1, borderTopColor: Hairline.soft },
  franjaHora: { backgroundColor: TEAL + '14', borderRadius: BorderRadius.sm, paddingVertical: 4, paddingHorizontal: 8, minWidth: 96, alignItems: 'center' },
  franjaHoraTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: TEAL, letterSpacing: 0.2 },
  franjaFase: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17 },
  franjaDet: { fontSize: FontSize.labelSm, color: TEAL, marginTop: 3, fontWeight: '600' },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: LineHeight.labelSm },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.sm, marginBottom: 5, ...WEB_LINK },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 60, letterSpacing: -0.2 },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  d7go: { fontSize: 16, color: TEAL, fontWeight: '800', width: 18, textAlign: 'center' },

  globCard: { ...cardBase, padding: Spacing.md, marginBottom: Spacing.sm },
  globTitle: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  globPct: { fontSize: FontSize.bodyLg, fontWeight: '900', letterSpacing: -0.3 },
  globSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 6, lineHeight: LineHeight.labelSm },
  modoBtn: { flex: 1, paddingVertical: 6, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, alignItems: 'center', ...WEB_LINK },
  modoBtnOn: { backgroundColor: TEAL + '14', borderColor: TEAL + '55' },
  modoTxt: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.muted, letterSpacing: 0.2 },
  barTrack: { height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  barFill: { height: 7, borderRadius: 4, ...(Platform.OS === 'web' ? { transition: Motion.spring } as any : {}) },
  sysCard: { ...cardBase, padding: Spacing.md, marginBottom: 6 },
  sysHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 },
  sysTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flex: 1, letterSpacing: -0.2 },
  sysCount: { fontSize: FontSize.labelMd, fontWeight: '800', marginLeft: 8 },
  sysEstado: { fontSize: FontSize.labelSm, fontWeight: '700', marginTop: 6, letterSpacing: 0.2 },
  temaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 7, paddingHorizontal: 6, borderRadius: BorderRadius.sm, borderTopWidth: 1, borderTopColor: Hairline.soft, ...WEB_LINK },
  temaRowOn: { backgroundColor: TEAL + '12' },
  temaRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  temaChk: { fontSize: 16, width: 22, textAlign: 'center' },
  temaRowD: { fontSize: FontSize.labelSm, fontWeight: '800', width: 62 },
  temaRowTxt: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  temaRowSub: { fontSize: 9, color: Colors.muted, marginTop: 1 },
  temaRowGo: { fontSize: 14, color: Colors.muted, width: 16, textAlign: 'center' },
});
