import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Platform, TextInput } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { desktopStyles, DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, gridStyle, gridItemStyle } from '../empresa/primitives';
import { RingStat, MegaStat, FadeUp, CommandBackdrop } from '../empresa/visuals';
import {
  RESEARCH_META, RESEARCH_TARGETS, RESEARCH_FASES, RESEARCH_MODULOS,
  RESEARCH_JOURNALS, RESEARCH_PIPELINE, PIPELINE_NOTA,
  RESEARCH_ADVERTENCIAS, VUELTAS, PRIORIDAD_COLOR, diaEstudioTipo, Prioridad,
  RESEARCH_ENTREGABLES, ESTADOS_ENTREGABLE, ESTADO_ENTREGABLE_INFO, PASOS_ENTREGABLE, ENVIADO_O_MAS,
  INFRA_ACADEMICA, loadEntregables, saveEntregables, estadoDe, calcResearchKpis,
  Entregable, EstadoEntregable, EntregablesRegistro, EntregableRegistro, ResearchKpis,
} from '../../lib/researchData';
import { RESEARCH_RECURSOS_TOP, RESEARCH_MAESTRIA, REC, RESEARCH_HITOS, PISTA_INFO, DAILY_META } from '../../lib/researchDailyPlan';
import { loadDone, saveDone } from '../../lib/studyProgress';
import { researchObsUrlEntregable } from '../../lib/obsidianResearchMap';
import { getResearchEngineState } from '../../lib/supabase';
import { ResearchFonts, ensureResearchFonts, serifTitle, InkColors } from './researchTheme';
import ResearchTodayPlan from './ResearchTodayPlan';
import ResearchAgenticSystem from './ResearchAgenticSystem';
import ResearchLinesExplorer from './ResearchLinesExplorer';
import AIFirstPanel from './AIFirstPanel';

/**
 * ResearchHub — sección Research (camino a Mayo Clinic), rediseñada con IDENTIDAD PROPIA:
 * CUADERNO DE LABORATORIO EDITORIAL / research desk de revista científica (Elicit/Nature/NEJM).
 * En vez del hero degradado + PillTabs compartidos con USMLE/MIR, tiene un MASTHEAD editorial
 * (serif, con el status del motor y el PIP counter en oro) y pestañas tipo revista (subrayado oro).
 * "Hoy" = motor día-a-día (3 pistas: carta · tesis · case report + SR-1); "Sistema" = sistema agéntico;
 * "Líneas" = las 8 líneas; "Panel" = el desk: MESA EDITORIAL (estado real de los 5 entregables de la
 * RUTA 2027, persistido en localStorage 'jmd-research-entregables'), checklist INFRA ACADÉMICA (10 cuentas,
 * PlanKey 'research-infra'), KPIs derivados de ambos, fases, journals, maestría transversal.
 * (05-sep-2026) Sustituye a "Timeline 0→primer paper" y "Micro-horario": eran calendarios contradictorios.
 */
const TEAL = RESEARCH_META.accent;   // #6BB8B0 (token)
const GOLD = InkColors.gold;         // #C8A96A — capa de estatus (manuscrito/PIP/sellos)
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return DAILY_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}-${iso.slice(0, 4)}`; } catch { return iso; }
}
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
function fmtMes(ym: string): string { const m = Number(ym.slice(5, 7)); return m >= 1 && m <= 12 ? `${MESES[m - 1]}-${ym.slice(0, 4)}` : ym; }

type Sub = 'hoy' | 'sistema' | 'lineas' | 'panel';

// Numeración de protocolo tipo lomo de cuaderno (marca de agua editorial).
const SUB_META: Record<Sub, { label: string; proto: string; kicker: string }> = {
  hoy:     { label: 'Bitácora',   proto: 'R·LOG', kicker: 'ENTRADA DE HOY' },
  sistema: { label: 'Redacción',  proto: 'R·SYS', kicker: 'MOTOR AGÉNTICO' },
  lineas:  { label: 'Líneas',     proto: 'R·LIN', kicker: 'CARTERA DE LÍNEAS' },
  panel:   { label: 'Desk',       proto: 'R·DSK', kicker: 'MESA EDITORIAL' },
};

function VueltasDots({ prioridad }: { prioridad: Prioridad }) {
  const n = VUELTAS[prioridad];
  const color = PRIORIDAD_COLOR[prioridad];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <View key={i} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: i < n ? color : 'rgba(255,255,255,0.12)' }} />
      ))}
      <Text style={{ fontSize: 9, color: Colors.muted, marginLeft: 4 }}>{n} vueltas</Text>
    </View>
  );
}

/** MASTHEAD editorial — masthead de revista: título serif + status del motor + PIP counter en oro. */
function EditorialMasthead({ hoy, kpis }: { hoy: 'research' | 'derma' | 'descanso'; kpis: ResearchKpis }) {
  const [run, setRun] = useState<string>('idle');
  const [papersToday, setPapersToday] = useState<number | null>(null);
  useEffect(() => {
    let on = true;
    getResearchEngineState().then((s) => {
      if (!on || !s) return;
      if (s.run_state) setRun(s.run_state);
      if (s.papers_today != null) setPapersToday(s.papers_today);
    });
    return () => { on = false; };
  }, []);
  const runMeta = run === 'running'
    ? { c: InkColors.jade, lbl: 'MOTOR EN MARCHA' }
    : run === 'paused'
      ? { c: InkColors.brass, lbl: 'MOTOR EN PAUSA' }
      : run === 'stopped'
        ? { c: InkColors.coral, lbl: 'MOTOR DETENIDO' }
        : { c: InkColors.inkMute, lbl: 'MOTOR INACTIVO' };

  return (
    <View style={mh.wrap}>
      {/* regla superior de cuaderno + folio */}
      <View style={mh.topRule}>
        <Text style={mh.folio}>PERÚ · MAYO CLINIC PATH — vol. I</Text>
        <Text style={mh.folio}>ISSN·SR / {new Date().getFullYear()}</Text>
      </View>

      <View style={mh.body}>
        <View style={{ flex: 1, minWidth: 240 }}>
          <Text style={mh.kicker}>REVISTA DE INVESTIGACIÓN · CUADERNO DE LABORATORIO</Text>
          <Text style={[mh.title, serifTitle]}>Research</Text>
          <Text style={mh.sub}>{RESEARCH_META.subtitulo}</Text>
          <Text style={mh.tesis}>{RESEARCH_META.tesis}</Text>
        </View>

        {/* Columna de estatus: motor + PIP counter (oro) + día */}
        <View style={mh.statusCol}>
          <View style={[mh.engineChip, { borderColor: runMeta.c + '55' }]}>
            <View style={[mh.engineDot, { backgroundColor: runMeta.c }]} />
            <View>
              <Text style={[mh.engineLbl, { color: runMeta.c }]}>{runMeta.lbl}</Text>
              <Text style={mh.engineSub}>{papersToday != null ? `${papersToday} papers descubiertos hoy` : 'discovery en la nube'}</Text>
            </View>
          </View>

          {/* PIP counter — el objeto de máximo valor: en ORO (derivado de la Mesa editorial) */}
          <View style={mh.pipRow}>
            <View style={mh.pipCell}>
              <Text style={[mh.pipVal, { color: GOLD }]}>{kpis.pipsActuales}</Text>
              <Text style={mh.pipLbl}>PIP INDEXADOS</Text>
            </View>
            <View style={mh.pipDivider} />
            <View style={mh.pipCell}>
              <Text style={[mh.pipVal, { color: InkColors.brass }]}>{kpis.enviados}</Text>
              <Text style={mh.pipLbl}>ENVIADOS</Text>
            </View>
            <View style={mh.pipDivider} />
            <View style={mh.pipCell}>
              <Text style={[mh.pipVal, { color: InkColors.ink }]}>{kpis.pipsParaCompetir}</Text>
              <Text style={mh.pipLbl}>META · COMPETIR</Text>
            </View>
          </View>

          <View style={[mh.dayChip, { borderColor: (hoy === 'research' ? TEAL : hoy === 'derma' ? Colors.purple : Colors.muted) + '55' }]}>
            <Text style={mh.dayLbl}>HOY</Text>
            <Text style={[mh.dayVal, { color: hoy === 'research' ? TEAL : hoy === 'derma' ? Colors.purple : Colors.muted }]}>
              {hoy === 'research' ? 'RESEARCH' : hoy === 'derma' ? 'DERMA →' : 'Descanso'}
            </Text>
          </View>
        </View>
      </View>

      {/* regla inferior doble (masthead de revista) */}
      <View style={mh.bottomRuleThick} />
      <View style={mh.bottomRuleThin} />
    </View>
  );
}

/** Pestañas tipo revista: subrayado fino oro (no PillTab redondeado compartido). */
function JournalTabs({ sub, setSub }: { sub: Sub; setSub: (s: Sub) => void }) {
  const tabs: { k: Sub; label: string }[] = [
    { k: 'hoy', label: 'Bitácora' },
    { k: 'sistema', label: 'Redacción · agéntico' },
    { k: 'lineas', label: 'Líneas' },
    { k: 'panel', label: 'Desk editorial' },
  ];
  return (
    <View style={jt.row}>
      {tabs.map((t) => {
        const active = sub === t.k;
        return (
          <TouchableOpacity key={t.k} activeOpacity={0.8} onPress={() => setSub(t.k)} style={jt.tab}>
            <Text style={[jt.txt, serifTitle, active && { color: Colors.onSurface }]}>{t.label}</Text>
            <View style={[jt.underline, active ? { backgroundColor: GOLD } : { backgroundColor: 'transparent' }]} />
          </TouchableOpacity>
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

/** Selector de estado editorial (8 pasos, persistido). */
function EstadoSelector({ value, onChange }: { value: EstadoEntregable; onChange: (s: EstadoEntregable) => void }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
      {ESTADOS_ENTREGABLE.map((s) => {
        const info = ESTADO_ENTREGABLE_INFO[s];
        const on = s === value;
        return (
          <TouchableOpacity key={s} activeOpacity={0.8} onPress={() => onChange(s)}
            style={[st.estBtn, { borderColor: info.color + (on ? 'CC' : '3A') }, on && { backgroundColor: info.color + '22' }]}>
            <Text style={[st.estTxt, { color: on ? info.color : Colors.muted }]}>{on ? '● ' : '○ '}{info.lbl}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/** Tarjeta de un entregable de la Mesa editorial: estado real + hito del plan + cascada + senior author. */
function EntregableCard({ e, reg, onChange }: { e: Entregable; reg: EntregablesRegistro; onChange: (id: string, patch: Partial<EntregableRegistro>) => void }) {
  const estado = estadoDe(e, reg);
  const info = ESTADO_ENTREGABLE_INFO[estado];
  const hito = RESEARCH_HITOS[e.id];
  const pista = PISTA_INFO[e.pista];
  const r = reg[e.id];
  const pct = Math.round((info.paso / PASOS_ENTREGABLE) * 100);
  const obs = researchObsUrlEntregable(e.id);
  const hoy = todayISO();
  const atrasado = !!hito && hoy > hito.fecha && !ENVIADO_O_MAS.has(estado);
  const [ref, setRef] = useState<string>(r?.ref ?? '');
  const cambiarEstado = (s: EstadoEntregable) => {
    const patch: Partial<EntregableRegistro> = { estado: s };
    if (ENVIADO_O_MAS.has(s) && !r?.fechaEnvio) patch.fechaEnvio = hoy;
    if (!ENVIADO_O_MAS.has(s)) patch.fechaEnvio = null;
    onChange(e.id, patch);
  };
  return (
    <View style={[st.entCard, { borderLeftColor: pista.color }, atrasado && { borderColor: Colors.coral + '66' }]}>
      <Text style={st.protoMark}>{`Nº ${String(e.n).padStart(2, '0')}`}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap', paddingRight: 44 }}>
        <Chip label={`pista ${e.pista} · ${pista.label}`} color={pista.color} small />
        <Chip label={info.lbl} color={info.color} small solid />
        {e.esPIP ? <Chip label="PIP" color={GOLD} small /> : <Chip label="registro" color={Colors.muted} small />}
        {atrasado && <Chip label="ATRASADO vs plan" color={Colors.coral} small />}
      </View>
      <Text style={[st.entTitle, serifTitle]}>{e.titulo}</Text>
      <Text style={st.entTipo}>{e.tipo} · guía: {e.guia}</Text>
      <View style={{ marginTop: 8 }}><ProgressBar pct={pct} color={info.color} /></View>

      <View style={st.entGrid}>
        <View style={st.entCell}>
          <Text style={st.entLbl}>HITO DEL PLAN</Text>
          <Text style={[st.entVal, atrasado && { color: Colors.coral }]}>{hito ? `${hito.code} · ${fmtFecha(hito.fecha)} (ciclo ${hito.ciclo})` : '—'}</Text>
          <Text style={st.entSub}>mes RUTA: {fmtMes(e.fechaObjetivo)} · átomos {e.atomos}</Text>
        </View>
        <View style={st.entCell}>
          <Text style={st.entLbl}>SENIOR AUTHOR / EQUIPO</Text>
          <Text style={st.entVal}>{e.seniorAuthor}</Text>
        </View>
        <View style={st.entCell}>
          <Text style={st.entLbl}>COSTE</Text>
          <Text style={st.entVal}>{e.coste}</Text>
        </View>
        <View style={st.entCell}>
          <Text style={st.entLbl}>ENVÍO REAL</Text>
          <Text style={st.entVal}>{r?.fechaEnvio ? fmtFecha(r.fechaEnvio) : 'aún no enviado'}{r?.ref ? ` · ${r.ref}` : ''}</Text>
          {e.doi ? <Text style={st.entSub}>DOI {e.doi}</Text> : null}
        </View>
      </View>

      <Text style={st.entLbl}>CASCADA DE REVISTAS (una a la vez)</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4, marginBottom: 8 }}>
        {e.journalCascade.map((j, i) => (
          <View key={i} style={[st.cascade, i === 0 && { borderColor: GOLD + '66', backgroundColor: GOLD + '0C' }]}>
            <Text style={[st.cascadeTxt, i === 0 && { color: GOLD }]}>{i + 1}. {j}</Text>
          </View>
        ))}
      </View>

      <Text style={st.entNota}>{e.nota}</Text>

      <Text style={[st.entLbl, { marginTop: 10 }]}>ESTADO (se guarda en este dispositivo)</Text>
      <View style={{ marginTop: 6 }}><EstadoSelector value={estado} onChange={cambiarEstado} /></View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
        <TextInput value={ref} onChangeText={setRef} onBlur={() => onChange(e.id, { ref: ref.trim() || null })}
          placeholder="nº de manuscrito / DOI" placeholderTextColor={Colors.muted} style={st.input} />
        {obs && (
          <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(obs)} style={[st.link, { borderColor: Colors.purple + '66' }]}>
            <Text style={[st.linkText, { color: Colors.purple }]}>◆ carpeta en Obsidian ↗</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/** Checklist "Infra académica" (10 cuentas · átomo R0) persistida con PlanKey 'research-infra'. */
function InfraChecklist({ done, onToggle }: { done: Set<number>; onToggle: (n: number) => void }) {
  const total = INFRA_ACADEMICA.length;
  const pct = Math.round((done.size / total) * 100);
  return (
    <GlassPanel style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <Text style={[st.h3, serifTitle, { marginBottom: 0 }]}>Infra académica · {done.size}/{total} cuentas</Text>
        <Text style={[st.pctTxt, { color: pct === 100 ? InkColors.jade : TEAL }]}>{pct}%</Text>
      </View>
      <ProgressBar pct={pct} color={pct === 100 ? InkColors.jade : TEAL} />
      <Text style={[st.smallNote, { marginTop: 6, marginBottom: 6 }]}>
        Átomo R0 (D1 del plan). Cada cuenta son 10-15 min; se descubren faltantes el día del submit si no están.
        Guarda los IDs (ORCID iD, CTI Vitae) en DATA/RESEARCH/MENTORES.md §Identificadores.
      </Text>
      {INFRA_ACADEMICA.map((it) => {
        const ok = done.has(it.n);
        return (
          <View key={it.id} style={[st.infraRow, ok && { backgroundColor: InkColors.jade + '0E' }]}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => onToggle(it.n)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
              <Text style={[st.infraChk, { color: ok ? InkColors.jade : 'rgba(255,255,255,0.25)' }]}>{ok ? '☑' : '☐'}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={[st.infraName, ok && { color: InkColors.jade }]}>{it.n}. {it.nombre}</Text>
              <Text style={st.infraPara}>{it.para}</Text>
              <Text style={st.infraNota}>{it.nota}</Text>
            </View>
            {it.url ? (
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(it.url!)} style={[st.verBtn, { borderColor: TEAL + '88' }]}>
                <Text style={[st.verTxt, { color: TEAL }]}>abrir ↗</Text>
              </TouchableOpacity>
            ) : (
              <Chip label="A VERIFICAR" color={Colors.brass} small />
            )}
          </View>
        );
      })}
    </GlassPanel>
  );
}

/** Panel = el "desk" editorial (KPIs derivados, MESA EDITORIAL, infra, fases, targets, currículo, maestría, journals, advertencias). */
function PanelView({ reg, onChange, infra, onToggleInfra, kpis }: {
  reg: EntregablesRegistro; onChange: (id: string, patch: Partial<EntregableRegistro>) => void;
  infra: Set<number>; onToggleInfra: (n: number) => void; kpis: ResearchKpis;
}) {
  const proximo = [...RESEARCH_ENTREGABLES]
    .filter((e) => !ENVIADO_O_MAS.has(estadoDe(e, reg)) && RESEARCH_HITOS[e.id])
    .sort((a, b) => RESEARCH_HITOS[a.id].fecha.localeCompare(RESEARCH_HITOS[b.id].fecha))[0];
  return (
    <View>
      {/* MEGA STAT */}
      <MegaStat value={kpis.pipsParaCompetir} label="Publicaciones indexadas para competir" accent={GOLD}
        footnote={`8–15 para nivel Mayo (stretch) · hoy tienes ${kpis.pipsActuales} · ${kpis.enviados}/${RESEARCH_ENTREGABLES.length} entregables enviados`} />

      {/* RINGS (derivados de la Mesa editorial + infra) */}
      <View style={st.ringRow}>
        <View style={st.ringCard}><RingStat value={kpis.pipsActuales} max={3} label="PIPs hoy" sub="aceptadas/publicadas" accent={Colors.coral} /></View>
        <View style={st.ringCard}><RingStat value={kpis.enviados} max={RESEARCH_ENTREGABLES.length} label="Enviados" sub={`de ${RESEARCH_ENTREGABLES.length} entregables`} accent={GOLD} /></View>
        <View style={st.ringCard}><RingStat value={kpis.primerSubmissionMes} max={6} label="1er submission" sub="mes de la RUTA (sep=1)" accent={Colors.brass} /></View>
        <View style={st.ringCard}><RingStat value={kpis.readiness} label="Readiness" sub="30 % infra + 70 % mesa" accent={Colors.blue} suffix="%" /></View>
      </View>

      {/* CUELLO DE BOTELLA */}
      <GlassPanel accent={Colors.coral} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
        <Text style={[st.h3, serifTitle]}>El cuello de botella real</Text>
        <Text style={st.body}>{RESEARCH_META.cuelloBotella}</Text>
      </GlassPanel>

      {/* ★ MESA EDITORIAL — sustituye a Timeline + Micro-horario */}
      <SectionLabel>★ Mesa editorial · los 5 entregables de la RUTA 2027 (estado real)</SectionLabel>
      <Text style={st.desk}>
        Un solo calendario: el hito de cada tarjeta es la fecha del átomo que lo cierra en el plan día-a-día
        (se re-fecha con el pipeline). El estado lo marcas tú; "enviado" registra la fecha automáticamente.
        {proximo ? ` Próximo hito pendiente: ${proximo.titulo} → ${RESEARCH_HITOS[proximo.id].code} ${fmtFecha(RESEARCH_HITOS[proximo.id].fecha)}.` : ' Todos los entregables están enviados.'}
      </Text>
      <View style={{ marginBottom: Spacing.xl }}>
        {[...RESEARCH_ENTREGABLES].sort((a, b) => a.n - b.n).map((e, i) => (
          <FadeUp key={e.id} delay={i * 50}><EntregableCard e={e} reg={reg} onChange={onChange} /></FadeUp>
        ))}
      </View>

      {/* ★ INFRA ACADÉMICA — checklist persistida (PlanKey 'research-infra') */}
      <SectionLabel>★ Infra académica · 10 cuentas del circuito editorial (átomo R0)</SectionLabel>
      <InfraChecklist done={infra} onToggle={onToggleInfra} />

      {/* FASES — protocolo numerado */}
      <SectionLabel>Ruta por fases · MIR → Mayo</SectionLabel>
      <View style={[gridStyle(220), { marginBottom: Spacing.lg }]}>
        {RESEARCH_FASES.map((f, i) => {
          const activa = f.estado === 'activa';
          const meta = f.estado === 'meta';
          const acc = activa ? TEAL : meta ? GOLD : Colors.muted;
          return (
            <View key={i} style={gridItemStyle(220)}>
              <FadeUp delay={i * 70}>
                <View style={[st.faseCard, { borderLeftColor: acc }, activa && { backgroundColor: TEAL + '0E' }]}>
                  <Text style={st.protoMark}>{`§ ${String(i + 1).padStart(2, '0')}`}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[st.faseTag, { color: acc }]}>{f.fase}</Text>
                    {activa ? <Chip label="AQUÍ" color={TEAL} small /> : meta ? <Chip label="META" color={GOLD} small /> : null}
                  </View>
                  <Text style={[st.faseTitle, serifTitle]}>{f.titulo}</Text>
                  <Text style={st.faseDesc}>{f.desc}</Text>
                  <Text style={st.faseEntreg}>→ {f.entregable}</Text>
                </View>
              </FadeUp>
            </View>
          );
        })}
      </View>

      {/* TARGETS DE PUBLICACIÓN */}
      <SectionLabel>Targets de publicación (mix realista)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_TARGETS.map((t, i) => (
          <View key={i} style={[st.tRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={{ flex: 1.6 }}>
              <Text style={[st.tName, serifTitle]}>{t.tipo}</Text>
              <Text style={st.tPeso}>{t.peso}</Text>
            </View>
            <Text style={[st.tObj, { color: GOLD }]}>{t.objetivo}</Text>
            <View style={{ width: 86, alignItems: 'flex-end' }}>
              <Chip label={t.prioridad} color={PRIORIDAD_COLOR[t.prioridad]} small />
            </View>
          </View>
        ))}
      </GlassPanel>

      {/* MÓDULOS */}
      <SectionLabel>Currículo de research skills · por prioridad, vueltas y deadline</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_MODULOS.map((m, i) => (
          <FadeUp key={m.n} delay={i * 50}>
            <View style={[st.modCard, { borderLeftColor: PRIORIDAD_COLOR[m.prioridad] }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                <Text style={[st.modName, serifTitle]}>{m.n}. {m.nombre}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Chip label={m.prioridad} color={PRIORIDAD_COLOR[m.prioridad]} small />
                  <Chip label={`deadline ${m.deadline}`} color={Colors.muted} small />
                </View>
              </View>
              <View style={{ marginTop: 6, marginBottom: 8 }}><VueltasDots prioridad={m.prioridad} /></View>
              <Text style={st.body}>{m.nota}</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {m.links.map((l, j) => (
                  <TouchableOpacity key={j} activeOpacity={0.8} onPress={() => openUrl(l.url)} style={st.link}>
                    <Text style={st.linkText} numberOfLines={1}>{l.label} ↗</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </FadeUp>
        ))}
      </View>

      {/* ★ MAESTRÍA TRANSVERSAL — competencias de élite que atraviesan todas las fases (aditivo) */}
      <SectionLabel>★ Maestría transversal · competencias que atraviesan todo el plan</SectionLabel>
      <Text style={st.desk}>
        No son un día concreto: cierran los gaps de élite (integridad/ética, regresión clínica aplicada,
        ciencia abierta, peer review post-submit, redacción no-nativo, datos reproducibles).
      </Text>
      <View style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_MAESTRIA.map((m, i) => (
          <FadeUp key={m.id} delay={i * 45}>
            <View style={[st.maestriaCard, { borderLeftColor: GOLD }]}>
              <Text style={[st.maestriaTitle, serifTitle]}>{m.titulo}</Text>
              <Text style={st.maestriaAncla}>{m.anclaFase}</Text>
              <Text style={st.body}>{m.porQue}</Text>
              <View style={[st.drillBox, { borderColor: GOLD + '33' }]}>
                <Text style={st.drillLbl}>MICRO-DRILL</Text>
                <Text style={st.drillTxt}>{m.drill}</Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {m.recs.map((k) => {
                  const r = REC[k];
                  if (!r) return null;
                  return (
                    <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => openUrl(r.url)} style={st.link}>
                      <Text style={st.linkText} numberOfLines={1}>{r.label} ↗</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </FadeUp>
        ))}
      </View>

      {/* ★ TOP 2026 — recursos de élite verificados (aditivo) */}
      <SectionLabel>★ TOP 2026 · recursos de élite GRATIS verificados (por capa del ciclo)</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_RECURSOS_TOP.map((c, i) => (
          <FadeUp key={i} delay={i * 50}>
            <View style={{ marginBottom: Spacing.md }}>
              <Text style={st.recTopCapa}>{c.capa}</Text>
              <View style={{ gap: Spacing.sm }}>
                {c.items.map((it, j) => (
                  <TouchableOpacity key={j} activeOpacity={0.85} onPress={() => openUrl(it.url)} style={st.recTopCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                      <Text style={[st.recTopName, serifTitle]} numberOfLines={2}>{it.label} ↗</Text>
                      <Chip label={it.confianza} color={it.confianza === 'verificado' ? Colors.green : Colors.brass} small />
                    </View>
                    <Text style={st.recTopMeta}>{it.autor}</Text>
                    <Text style={st.recTopWhy}>{it.porQue}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                      <Chip label={it.tipo} color={Colors.muted} small />
                      <Chip label={it.nivel} color={Colors.blue} small />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </FadeUp>
        ))}
      </View>

      {/* PIPELINE AGÉNTICO (resumen — detalle en pestaña Sistema) */}
      <SectionLabel>Pipeline agéntico de papers (8 agentes + gates humanos)</SectionLabel>
      <View style={[gridStyle(160), { marginBottom: Spacing.sm }]}>
        {RESEARCH_PIPELINE.map((a) => (
          <View key={a.id} style={gridItemStyle(160)}>
            <View style={st.pipeCard}>
              <Text style={[st.pipeId, { color: TEAL }]}>{a.id}</Text>
              <Text style={[st.pipeName, serifTitle]}>{a.nombre}</Text>
              <Text style={st.pipeDesc}>{a.desc}</Text>
              <Text style={st.pipeTool}>{a.tool}</Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={[st.smallNote, { marginBottom: Spacing.xl }]}>{PIPELINE_NOTA}</Text>

      {/* JOURNALS — biblioteca */}
      <SectionLabel>Journals · empieza por el tier B</SectionLabel>
      <View style={[gridStyle(220), { marginBottom: Spacing.xl }]}>
        {RESEARCH_JOURNALS.map((j, i) => (
          <View key={i} style={gridItemStyle(220)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(j.url)} style={st.jCard}>
              <Text style={[st.jName, serifTitle]}>{j.nombre} ↗</Text>
              <Chip label={j.tier} color={j.tier.startsWith('B') ? Colors.green : j.tier.startsWith('A') ? Colors.brass : Colors.coral} small />
              <Text style={[st.body, { marginTop: 6 }]}>{j.nota}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* ADVERTENCIAS */}
      <SectionLabel>Honestidad (no inventado)</SectionLabel>
      <GlassPanel accent={Colors.brass} style={{ marginBottom: Spacing.xl }}>
        {RESEARCH_ADVERTENCIAS.map((a, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 5 }}>
            <Text style={{ color: Colors.brass }}>•</Text>
            <Text style={[st.body, { flex: 1 }]}>{a}</Text>
          </View>
        ))}
      </GlassPanel>
    </View>
  );
}

export default function ResearchHub({ variant = 'mobile' }: { variant?: 'mobile' | 'desktop' }) {
  const isDesktop = variant === 'desktop';
  const hoy = diaEstudioTipo(new Date());
  const [sub, setSub] = useState<Sub>('hoy');
  // Estado real de la Mesa editorial (localStorage 'jmd-research-entregables') + checklist infra (PlanKey 'research-infra').
  const [reg, setReg] = useState<EntregablesRegistro>(() => loadEntregables());
  const [infra, setInfra] = useState<Set<number>>(() => new Set(loadDone('research-infra')));
  const kpis = calcResearchKpis(reg, infra.size);
  const onChange = (id: string, patch: Partial<EntregableRegistro>) => setReg((prev) => {
    const base = RESEARCH_ENTREGABLES.find((e) => e.id === id);
    const cur: EntregableRegistro = prev[id] ?? { estado: base ? base.estado : 'idea' };
    const next: EntregablesRegistro = { ...prev, [id]: { ...cur, ...patch, actualizado: todayISO() } };
    saveEntregables(next);
    return next;
  });
  const onToggleInfra = (n: number) => setInfra((prev) => {
    const s = new Set(prev);
    if (s.has(n)) s.delete(n); else s.add(n);
    saveDone('research-infra', Array.from(s));
    return s;
  });
  useEffect(() => { ensureResearchFonts(); }, []);
  const contentStyle = isDesktop
    ? desktopStyles.centerScrollContent
    : { paddingHorizontal: Spacing.lg, paddingTop: 56, paddingBottom: 110 };
  const meta = SUB_META[sub];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.surface }} contentContainerStyle={contentStyle as any} showsVerticalScrollIndicator={false}>
      <View style={{ position: 'relative' }}>
        <CommandBackdrop />

        {/* MASTHEAD EDITORIAL (reemplaza el GradientHero compartido) */}
        <EditorialMasthead hoy={hoy} kpis={kpis} />

        <AIFirstPanel segmento="research" accent={TEAL} />

        {/* SUB-NAV tipo revista (subrayado oro) + marca de protocolo del cuaderno */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.sm }}>
          <JournalTabs sub={sub} setSub={setSub} />
          <View style={hd.protoTag}>
            <Text style={hd.protoKicker}>{meta.kicker}</Text>
            <Text style={hd.protoCode}>{meta.proto}</Text>
          </View>
        </View>

        {sub === 'hoy' ? <ResearchTodayPlan />
          : sub === 'sistema' ? <ResearchAgenticSystem />
          : sub === 'lineas' ? <ResearchLinesExplorer />
          : <PanelView reg={reg} onChange={onChange} infra={infra} onToggleInfra={onToggleInfra} kpis={kpis} />}
      </View>
    </ScrollView>
  );
}

const cardBase = {
  backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg,
  borderWidth: 1, borderColor: Hairline.soft, padding: Spacing.lg, ...Elevation.sm,
};
const WEB_LINK = Platform.OS === 'web' ? ({ cursor: 'pointer', transition: Motion.base } as any) : {};

// ── Masthead editorial ──────────────────────────────────────────────────────
const mh = StyleSheet.create({
  wrap: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Hairline.medium,
    backgroundColor: DesktopColors.glass,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    ...Elevation.md,
  },
  topRule: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingBottom: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Hairline.soft, marginBottom: Spacing.md,
  },
  folio: { fontSize: 9, color: Colors.smallLabel, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase' },
  body: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.lg },
  kicker: { fontSize: 9, color: InkColors.gold, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase' },
  title: { fontSize: 46, color: Colors.onSurface, fontWeight: '600', letterSpacing: -1, marginTop: 2, lineHeight: 50 },
  sub: { fontSize: FontSize.bodyMd, color: InkColors.teal, marginTop: 2, fontWeight: '600', letterSpacing: 0.2 },
  tesis: { fontSize: FontSize.labelLg, color: Colors.onSurfaceVariant, marginTop: Spacing.md, lineHeight: 21, maxWidth: 640 },

  statusCol: { alignItems: 'stretch', gap: Spacing.sm, minWidth: 230 },
  engineChip: {
    flexDirection: 'row', alignItems: 'center', gap: 9,
    borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 11,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  engineDot: { width: 9, height: 9, borderRadius: 5 },
  engineLbl: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  engineSub: { fontSize: 9, color: Colors.muted, marginTop: 2, letterSpacing: 0.2 },

  pipRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: InkColors.gold + '33', borderRadius: BorderRadius.md,
    backgroundColor: InkColors.gold + '0C', paddingVertical: 9, paddingHorizontal: 12,
  },
  pipCell: { flex: 1, alignItems: 'center' },
  pipVal: { fontSize: 26, fontWeight: '800', letterSpacing: -0.5, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },
  pipLbl: { fontSize: 8, color: Colors.smallLabel, fontWeight: '800', letterSpacing: 0.8, marginTop: 2, textAlign: 'center' },
  pipDivider: { width: 1, alignSelf: 'stretch', backgroundColor: Hairline.medium, marginHorizontal: 4 },

  dayChip: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 7, paddingHorizontal: 11,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  dayLbl: { fontSize: 9, color: Colors.smallLabel, fontWeight: '800', letterSpacing: 1.2 },
  dayVal: { fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: -0.2 },

  bottomRuleThick: { height: 2, backgroundColor: InkColors.gold + '66', marginTop: Spacing.md },
  bottomRuleThin: { height: 1, backgroundColor: Hairline.medium, marginTop: 2 },
});

// ── Journal tabs + protocol tag ─────────────────────────────────────────────
const jt = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.lg, alignItems: 'flex-end' },
  tab: { paddingBottom: 6, ...WEB_LINK },
  txt: { fontSize: FontSize.bodyLg, fontWeight: '600', color: Colors.muted, letterSpacing: 0.1 },
  underline: { height: 2, borderRadius: 2, marginTop: 6 },
});
const hd = StyleSheet.create({
  protoTag: { alignItems: 'flex-end', paddingBottom: 6 },
  protoKicker: { fontSize: 8, color: Colors.smallLabel, fontWeight: '800', letterSpacing: 1.4, textTransform: 'uppercase' },
  protoCode: { fontSize: FontSize.labelMd, color: InkColors.gold, fontWeight: '800', letterSpacing: 2, marginTop: 2, fontFamily: ResearchFonts.serif as any },
});

const st = StyleSheet.create({
  h3: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: 6, letterSpacing: -0.2 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.bodyMd },
  desk: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.labelMd, marginBottom: Spacing.md, marginTop: -4 },
  smallNote: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 17 },
  pctTxt: { fontSize: FontSize.bodyLg, fontWeight: '900', letterSpacing: -0.3 },

  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  ringCard: { flex: 1, minWidth: 140, backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: Hairline.soft, paddingVertical: Spacing.lg, paddingHorizontal: Spacing.md, alignItems: 'center', ...Elevation.sm },

  barTrack: { height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  barFill: { height: 6, borderRadius: 3, ...(Platform.OS === 'web' ? { transition: Motion.spring } as any : {}) },

  // Mesa editorial
  entCard: { ...cardBase, borderLeftWidth: 3, marginBottom: Spacing.md, position: 'relative' },
  entTitle: { fontSize: FontSize.titleMd, fontWeight: '700', color: Colors.onSurface, marginTop: 8, letterSpacing: -0.3, lineHeight: 24 },
  entTipo: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 3, lineHeight: 16 },
  entGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginTop: 10, marginBottom: 10 },
  entCell: { flex: 1, minWidth: 180 },
  entLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.8, textTransform: 'uppercase' },
  entVal: { fontSize: FontSize.labelMd, color: Colors.onSurface, marginTop: 3, lineHeight: 16, fontWeight: '600' },
  entSub: { fontSize: 9, color: Colors.muted, marginTop: 2, lineHeight: 13 },
  entNota: { fontSize: FontSize.labelSm, color: Colors.muted, fontStyle: 'italic', lineHeight: 15 },
  cascade: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 8, backgroundColor: 'rgba(255,255,255,0.03)' },
  cascadeTxt: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, fontWeight: '600' },
  estBtn: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 9, ...WEB_LINK },
  estTxt: { fontSize: FontSize.labelSm, fontWeight: '700', letterSpacing: 0.2 },
  input: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 9, color: Colors.onSurface, fontSize: FontSize.labelSm, minWidth: 180, backgroundColor: 'rgba(255,255,255,0.03)' },

  // Infra académica
  infraRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, paddingHorizontal: 6, borderTopWidth: 1, borderTopColor: Hairline.soft, borderRadius: BorderRadius.sm },
  infraChk: { fontSize: 17, width: 22, textAlign: 'center' },
  infraName: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.onSurface },
  infraPara: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 14 },
  infraNota: { fontSize: 9, color: Colors.muted, marginTop: 2, lineHeight: 12 },
  verBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 10, alignItems: 'center', ...WEB_LINK },
  verTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },

  faseCard: { ...cardBase, borderLeftWidth: 3, minHeight: 150 },
  protoMark: { position: 'absolute', top: 8, right: 12, fontSize: FontSize.labelSm, color: Colors.smallLabel, fontWeight: '800', letterSpacing: 1, opacity: 0.6, fontFamily: ResearchFonts.serif as any },
  faseTag: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.4, textTransform: 'uppercase' },
  faseTitle: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginTop: 5, letterSpacing: -0.2 },
  faseDesc: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 16 },
  faseEntreg: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 8, fontStyle: 'italic', lineHeight: 15 },

  tRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: Hairline.soft, gap: Spacing.sm },
  tName: { fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '700' },
  tPeso: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2 },
  tObj: { width: 60, fontSize: FontSize.bodyLg, fontWeight: '800', textAlign: 'center', letterSpacing: -0.3, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },

  modCard: { ...cardBase, borderLeftWidth: 3, marginBottom: Spacing.sm },
  modName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, flexShrink: 1, letterSpacing: -0.2 },

  maestriaCard: { ...cardBase, borderLeftWidth: 3, marginBottom: Spacing.sm },
  maestriaTitle: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  maestriaAncla: { fontSize: 9, color: InkColors.gold, fontWeight: '800', letterSpacing: 0.6, textTransform: 'uppercase', marginTop: 3, marginBottom: 7 },
  drillBox: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.md, marginTop: 9, backgroundColor: InkColors.gold + '08' },
  drillLbl: { fontSize: 9, fontWeight: '800', color: InkColors.gold, letterSpacing: 1, textTransform: 'uppercase' },
  drillTxt: { fontSize: FontSize.labelMd, color: Colors.onSurface, marginTop: 4, lineHeight: 16 },

  pipeCard: { ...cardBase, padding: Spacing.md, minHeight: 110 },
  pipeId: { fontSize: FontSize.titleMd, fontWeight: '800', opacity: 0.7, letterSpacing: -0.3, fontFamily: ResearchFonts.serif as any },
  pipeName: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface, marginTop: 3, letterSpacing: -0.2 },
  pipeDesc: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: 14 },
  pipeTool: { fontSize: 9, color: TEAL, marginTop: 7, fontWeight: '700', letterSpacing: 0.2 },

  jCard: { ...cardBase, ...WEB_LINK },
  jName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, marginBottom: 7, letterSpacing: -0.2 },

  link: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, paddingVertical: 6, paddingHorizontal: 10, maxWidth: '100%', ...WEB_LINK },
  linkText: { fontSize: FontSize.labelSm, color: TEAL, fontWeight: '600', letterSpacing: 0.2 },

  recTopCapa: { fontSize: FontSize.labelMd, fontWeight: '800', color: TEAL, letterSpacing: 0.5, marginBottom: 9, textTransform: 'uppercase' as const },
  recTopCard: { ...cardBase, padding: Spacing.md, borderLeftWidth: 3, borderLeftColor: TEAL, ...WEB_LINK },
  recTopName: { flex: 1, minWidth: 180, fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  recTopMeta: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4 },
  recTopWhy: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 7, lineHeight: 16 },
});
