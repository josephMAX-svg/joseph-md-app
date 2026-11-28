import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel, monoText } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  SYN_PLAN_META, SYN_DIAS, DiaSynapse, SynBloque,
  SYN_FORMATO_ICON, SYN_FASES_BC, synFaseBCDe, // v6.10 · base cero: fase explícita del día (1-6)
} from '../../lib/synapseDailyPlan';
import { planHoyD, progresoGlobal, GrupoProgreso, claveGrupoDeHoy } from '../../lib/studyProgress';
import { useDone } from '../../lib/useDone';
// racha por día REAL y semana/fase/total con las filas sin sesión contadas como hechas al llegar su día (con el alias las filas no van en orden de días reales)
import { synHoyReal, synFilaDeReal, synFilaSinSesion, synContarHechas, synDoneEfectivo, synGruposSemana, synRacha, synSinDiaPropio, synRunsDesde, synFilaVecina, synDiaRealDe, synSesionDeReal } from '../../lib/synapseProgreso';
import { useHoyReal, useSelDeHoy } from '../../lib/useHoyReal'; // c45: la pestaña abierta de un día para otro vuelve a la fila de hoy
import { FECHAS_V6, fechaPlanDe, fechaRealDe, enShipDe } from '../../lib/fechasV6'; // v6.10y: + FECHAS_V6 (alias propio del vibecoding, vibeFechaDe) y enShipDe (el paso que absorbe el SHIP del domingo)
import { synObsUrl } from '../../lib/obsidianVaultMap';
import { PERIWINKLE, statusGlyph, tagBar, PromptGlyph } from './synapseConsole';
import {
  VIBE_META, VIBE_DIAS, vibeDiaDe, vibeProyectoEnFecha, vibeTaperEnFecha, vibePCDomingo, vibeShipped, vibeShippedVerificado, vibeUltimoVerify, vibeJournalUrl,
  VIBE_TIPO_LABEL, VIBE_ROTACION_ICON, type DiaVibe,
} from '../../lib/vibecodingPlan';
import GuiaBloqueCard from '../GuiaBloqueCard';
import { reemplazosCorrida } from '../../lib/corridaTexto'; // v6.10g: la guía de un día de plan pintada en su día real («mañana», «ayer», corrida_s1.reemplazos), como el Home y el hub MIR
// v6.02c (E5): guías «qué · cuánto · cómo» del 04:15 (vibecoding), del SYNAPSE de L-V, del sábado PC (SHIP + A/B/C) y del Feynman del domingo
import { guiaVibeDe, guiaSynapseDe, guiaShipDe, guiaFeynmanDe } from '../../lib/rutinaGuia';

const OBS = '#A78BFA'; // mismo morado ◆ que el resto de planes

/**
 * SynapseTodayPlan — motor día-a-día SYNAPSE (SYN_PLAN_META.totalDias · SYN_PLAN_META.semanas semanas; v5.10-b: F0-F1 +
 * F2 sem 13-19 = Academy restante + prep CCA-F, taper del Step 1 · v6.00 (6-oct-2026): «taper por el ENCAPS», solo texto), RE-SKIN como
 * CONSOLA NEURAL: cada día es un "run", cada bloque un "job" (RunBlock estilo Warp
 * con barra-de-status lateral + header mono + exit-status ○/▷/✓). Mismo molde que
 * ENCAPS/Business (HOY / 7 días / 12 semanas) con PROGRESO REAL marcable (empieza 0%,
 * localStorage PlanKey 'synapse'). El estado `done` vive en SynapseHub para que la
 * telemetría "loss↓/completadas" se actualice en vivo. Sólo cambia la PRESENTACIÓN:
 * datos, props, handlers y links reales intactos.
 */
const INDIGO = PERIWINKLE; // periwinkle — color canónico de la consola (antes #818CF8)
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
/** «Hoy» para ELEGIR LA FILA del plan (SynapseTodayPlan · SynapseHub · DesktopRightPanel): la fecha de plan, no la del reloj. */
export function synTodayISO(): string {
  // v6.02d: semana 1 corrida → fila de la fecha de plan
  try { return fechaPlanDe(synHoyReal(), 'synapse'); }
  catch { return SYN_PLAN_META.inicio; }
}
/** v6.10q · v6.10y: fecha de PLAN del vibecoding del mismo día REAL que la fecha de plan `fSyn` del SYNAPSE (con el alias propio del vibecoding difieren: mar
 *  24-nov = SYNAPSE del jue 19 y vibecoding del mié 18). Solo cambia en los días de ese alias propio; el resto (también los días sin sesión), la misma fecha. */
function vibeFechaDe(fSyn: string): string { return FECHAS_V6.corrida_s1.alias_frente?.vibecoding?.alias[fechaRealDe(fSyn, 'synapse')] ?? fSyn; }
/** v6.10y (revisión): el día REAL al que el alias propio del vibecoding lleva el paso de la fecha de plan `fV` si NO es el día real de este SYNAPSE (lun 23-nov:
 *  plan global del mié 18, cuyo paso 1/5 va el mar 24); null si hoy es su día. Solo para las fechas de plan de ese alias propio: así el ✓ de hoy no marca
 *  (vibeDone por d) el paso de otro día. */
function vibeVaOtroDia(fSyn: string, fV: string): string | null {
  const own = FECHAS_V6.corrida_s1.alias_frente?.vibecoding;
  if (!own || !Object.values(own.alias).includes(fV)) return null;
  const r = fechaRealDe(fV, 'vibecoding');
  return r !== fechaRealDe(fSyn, 'synapse') ? r : null;
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}
/** Día de la semana corto (Lun…Dom) de una fecha ISO — para etiquetas. */
function wdDe(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { return dias[new Date(iso + 'T12:00:00').getDay()] ?? iso; } catch { return iso; }
}
/** RunBlock — un "job" del run de hoy, estilo Warp: barra-de-status lateral por tag,
 *  header mono [tag·min] · formato · exit-status ○/▷/✓, salida (material/lección) mono-ish. */
function BloqueRow({ b }: { b: SynBloque }) {
  const accent = tagBar(b.tag);
  const { glyph, color: stColor } = statusGlyph(b.tag);
  const obs = synObsUrl(b.material, b.leccion); // nota exacta del material en el vault (nombre + lección para desambiguar)
  const minTxt = b.tag === 'R' ? (b.min === 0 ? 'libre' : "30'") : b.min === 0 ? 'opc' : `${b.min}'`;
  const inner = (
    <>
      {/* barra-de-status lateral (data-plane) */}
      <View style={[st.blkBar, { backgroundColor: accent }]} />
      <View style={{ flex: 1 }}>
        {/* header mono estilo consola: exit-status · [tag·min] · formato */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
          <Text style={[st.blkStatus, { color: stColor }]}>{glyph}</Text>
          <Text style={[st.blkTag, { color: accent }]}>[{b.tag}·{minTxt}]</Text>
          <Text style={st.blkFmt}>{SYN_FORMATO_ICON[b.formato]} {b.formato}</Text>
          {b.real ? <Chip label="temario real" color={Colors.green} small /> : <Chip label="continúa" color={Colors.muted} small />}
          {b.audit ? <Chip label="base cero: se cursa entera" color={Colors.amber} small /> : null /* v6.10 · base cero (antes «auditar: ✓ si ya hecho») */}
          {obs ? (
            <TouchableOpacity activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }} onPress={() => openUrl(obs)}>
              <Chip label="◆" color={OBS} small />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 5 }}>
          <PromptGlyph char="›" color={accent} />
          <Text style={st.blkMat}>{b.material}</Text>
        </View>
        <Text style={st.blkLec}>{b.leccion}</Text>
        {b.dur ? <Text style={st.blkDur}>⏱ {b.dur}</Text> : null}
      </View>
      {b.url ? <View style={[st.verBtn, { borderColor: accent + '88' }]}><Text style={[st.verTxt, { color: accent }]}>abrir ↗</Text></View> : null}
    </>
  );
  if (!b.url) return <View style={[st.blk, { borderColor: accent + '2E' }]}>{inner}</View>;
  return <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(b.url!)} style={[st.blk, { borderColor: accent + '2E' }]}>{inner}</TouchableOpacity>;
}

/** VibeCard — proyecto de la semana del VIBECODING 04:15 (src/lib/vibecodingPlan.ts) para la fecha del run
 *  seleccionado: paso del día (L-V) con ✓ propio (PlanKey 'vibecoding'), o SHIP + Feynman (dom; v6.07 —hasta v6.06 el SHIP era el sábado—).
 *  v5.10-b: el ✓ manual solo cuenta días; SHIPPED lo dice el último verify (node DATA/_scripts/verify_vibecoding.js <s> →
 *  VIBE_SHIP_LOG horneado + localStorage 'jmd-vibe-ship'). S13-S20 (taper) se pintan desde VIBE_TAPER. Botón 📓 journal.
 *  v6.01 (10-oct-2026): el sábado se pinta con vibePCSabado = los mismos bloques PC que el SYNAPSE de ese día (SHIP · AVANCE si el proyecto
 *  aún no terminó · taper; + el PC propio desplazado de S16 el sáb 6-feb). Antes: sáb 26-dic decía SHIP S11, sáb 2-ene SHIP S12, sáb 9-ene
 *  taper S13 y sáb 6-feb solo S17. v6.02 (17-oct-2026, D1 lun 19-oct): sáb 26-dic = avance S10 · sáb 2-ene SHIP S10 · sáb 9-ene SHIP S11 ·
 *  sáb 16-ene SHIP S12 · sáb 13-feb = PC propio de S16 + PC 0' de S17 (comprobado sábado a sábado contra synapseDailyPlan.ts). v6.03 (20-oct-2026,
 *  D1 mié 21-oct): sáb 24-oct = AVANCE S1 (S1 mié 21 → mar 27-oct) · SHIP S1 sáb 31-oct … S9 sáb 26-dic · S10 sáb 2-ene · S11 sáb 9-ene · S12 sáb
 *  16-ene · taper S13-S18 sáb 23-ene → sáb 27-feb, uno por sábado (ningún PC desplazado; S19/S20 cierran el sáb 6-mar, después del SYNAPSE). v6.05
 *  (24-oct-2026, D1 lun 26-oct): SHIP S1 sáb 31-oct … S8 sáb 19-dic · sáb 26-dic = AVANCE S9 · S9 sáb 2-ene · S10 sáb 9-ene · S11 sáb 16-ene · S12
 *  sáb 23-ene · taper S13 sáb 30-ene · S14 6-feb · S15 13-feb · sáb 20-feb = PC propio de S16 + PC 0' de S17 · S18 27-feb (S19 sáb 6-mar y S20
 *  sáb 13-mar, PROTEGIDO, cierran después del SYNAPSE). v6.06 (31-oct-2026, D1 lun 2-nov): SHIP S1 sáb 7-nov … S7 sáb 19-dic · sáb 26-dic = AVANCE
 *  S8 · S8 sáb 2-ene · S9 9-ene · S10 16-ene · S11 23-ene · S12 30-ene · taper S13 6-feb · S14 13-feb · S15 20-feb · sáb 27-feb = PC propio de S16 +
 *  PC 0' de S17 · S18 6-mar (sáb 13-mar PROTEGIDO: sin PC, vibePCSabado devuelve [] · S19 sáb 20-mar y S20 sáb 27-mar, ya en F3, sin PC).
 *  v6.07 (8-nov-2026, D1 lun 9-nov): el PC (SHIP del vibecoding) pasa al DOMINGO, flexible, 2 h (el sábado 15:00-17:00 es la clase EN VIVO de
 *  Theomed) → la card usa vibePCDomingo y VIBE_META.diaShip: SHIP S1 dom 15-nov … S6 dom 20-dic · dom 27-dic = AVANCE S7 · S7 dom 3-ene … S12 dom
 *  7-feb · taper S13 dom 14-feb · S14 21-feb · S15 28-feb · dom 7-mar = PC propio de S16 + PC 0' de S17 · S18 dom 21-mar (dom 14-mar = ENCAPS,
 *  PROTEGIDO; S19 y S20 cierran después del SYNAPSE, sin PC). El sábado ya no lleva PC. */
function VibeCard({ fecha, vibeDone, onToggleVibe, vaEl }: { fecha: string; vibeDone: Set<number>; onToggleVibe: (d: number) => void; vaEl?: string | null }) {
  const wd = (() => { try { return new Date(fecha + 'T12:00:00').getDay(); } catch { return 1; } })();
  // v7.00 (sáb 28-nov, chat vibe · ítem 47-3): el SÁBADO la card es la del PC de MAÑANA (vibePCDomingo del domingo: SHIP · AVANCE · PC del taper), no la del proyecto
  //   en curso: desde el sáb 2-ene cada proyecto cierra a media semana y vibeProyectoEnFecha daba el SIGUIENTE (sáb 2-ene «S5 … SHIP dom 10-ene» con el SHIP de S4
  //   al día siguiente; sáb 27-feb, el taper S13 con el SHIP de S12). Sin PC mañana (o fuera del sábado), la de siempre
  const manana = (() => { try { const d = new Date(fecha + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + 1); return d.toISOString().slice(0, 10); } catch { return fecha; } })();
  const pcMan = wd === 6 ? vibePCDomingo(manana) : [];
  const mMan = pcMan.length ? pcMan[pcMan.length - 1] : undefined;
  const p = mMan ? mMan.proyecto : vibeProyectoEnFecha(fecha);
  const t = mMan ? mMan.taper : vibeTaperEnFecha(fecha);
  // el próximo paso del vibecoding tras ese domingo, si es de OTRO proyecto / taper (sáb 2-ene: S5 sigue el lun 4-ene)
  const sigV = mMan ? VIBE_DIAS.find((y) => fechaRealDe(y.fecha, 'vibecoding') > manana) : undefined;
  const sigTxt = sigV && sigV.semana !== mMan?.s ? ` S${sigV.semana} sigue el ${fmtFecha(fechaRealDe(sigV.fecha, 'vibecoding'))}.` : '';
  const pcSab = vibePCDomingo(fecha); // v6.07: el PC es el domingo (nombre de la variable, histórico)
  const pcMain = pcSab.length ? pcSab[pcSab.length - 1] : undefined;
  const pcExtra = pcSab.slice(0, -1).map((x) => x.taper ? (
    <Text key={'pc' + x.s} style={st.vibeStep}>› + PC propio de S{x.s} · {x.taper.nombre} ({x.taper.tipo === 'mantenimiento' ? "30' opcional" : "0'"}): {x.taper.shipTxt}</Text>
  ) : null);
  const vd = vibeDiaDe(fecha);
  // v6.10q · v6.10y: el domingo cuyo SHIP ABSORBE pasos del proyecto (corrida_s1.alias_frente.vibecoding.en_ship) pinta esos pasos y su ✓ (sin esto el paso
  //   no salía en ningún día y vibeShipped nunca lo contaba) · v6.11 (mar 24-nov): en_ship es una lista (dom 29-nov = los pasos 4/5 y 5/5 de S1, en ese orden):
  //   un botón por paso
  const vdShips = (!vd ? enShipDe(fecha) : []).map((f) => vibeDiaDe(f)).filter((x): x is DiaVibe => !!x);
  const shipped = vibeShipped(vibeDone);
  const verificados = vibeShippedVerificado();
  const accent = OBS;
  const journal = vibeJournalUrl(fecha);
  // v6.10y (revisión): el paso de hoy va OTRO día real (vaEl) → sin ✓ (lo marcarías el día que no es)
  // c45 (F): como el ✓ del SYNAPSE, el paso de un día REAL que aún no llega no se marca (desmarcar sí se puede); el SHIP que absorbe un paso, su domingo
  const botonPaso = (x: DiaVibe, enShip: boolean) => {
    const hecho = vibeDone.has(x.d);
    const real = fechaRealDe(x.fecha, 'vibecoding');
    if (!hecho && real > synHoyReal()) return (
      <View key={'vb' + x.d} style={[st.doneBtn, { flex: 1, marginTop: 0, borderColor: Hairline.medium }]}>
        <Text style={[st.doneBtnTxt, { color: Colors.muted }]}>{`es el paso del ${fmtFecha(real)}: el ✓ se marca ese día`}</Text>
      </View>
    );
    return (
      <TouchableOpacity key={'vb' + x.d} activeOpacity={0.85} onPress={() => onToggleVibe(x.d)}
        style={[st.doneBtn, { flex: 1, marginTop: 0 }, hecho ? { backgroundColor: accent, borderColor: accent } : { backgroundColor: accent + '14', borderColor: accent + '66' }]}>
        <Text style={[st.doneBtnTxt, { color: hecho ? '#10122B' : accent }]}>{enShip ? (hecho ? `✓ paso ${x.k}/5 de S${x.semana} hecho` : `○ marcar paso ${x.k}/5 de S${x.semana}`) : hecho ? '✓ paso del día hecho' : '○ marcar paso del día'}</Text>
      </TouchableOpacity>
    );
  };
  const btnDia = vaEl ? (
    <Text style={[st.vibeSub, { flex: 1 }]}>Hoy sin vibecoding: este paso va el {fmtFecha(vaEl)} (márcalo ese día).</Text>
  ) : vd ? botonPaso(vd, false) : vdShips.length ? <>{vdShips.map((x) => botonPaso(x, true))}</> : null;
  const btnJournal = (
    <TouchableOpacity activeOpacity={0.8} onPress={() => openUrl(journal)} style={[st.verBtn, { borderColor: accent + '88' }]}>
      <Text style={[st.verTxt, { color: accent }]} numberOfLines={1}>📓 journal</Text>
    </TouchableOpacity>
  );
  // v6.02d: fecha real visible (semana corrida) — el día de la semana del paso y las fechas del proyecto (ini/fin/SHIP) se pintan con
  // fechaRealDe; `fecha`, `wd === 6` y las búsquedas siguen con la fecha de plan.
  if (!p && t) {
    const semDias = VIBE_DIAS.filter((x) => x.semana === t.s);
    const semHechos = semDias.filter((x) => vibeDone.has(x.d)).length;
    return (
      <View style={[st.vibeCard, { borderColor: Colors.amber + '55' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <Chip label={`04:15 TAPER · S${t.s}/${VIBE_META.semanas}`} color={accent} small />
          <Chip label={t.tipo === 'deload' ? "DELOAD TOTAL · journal 5' + audio" : "MANTENIMIENTO ≤15'/día"} color={Colors.amber} small />
          <Text style={[st.vibeStat, { marginLeft: 'auto' }]}>{semHechos}/{semDias.length} días · {verificados}/12 shipped (verify)</Text>
        </View>
        <Text style={st.vibeTitle}>{t.nombre}</Text>
        {vd ? (
          <Text style={st.vibeStep}>› {wdDe(fechaRealDe(vd.fecha, 'vibecoding'))} · {VIBE_TIPO_LABEL[vd.tipo]} ({vd.min}'): {vd.paso}</Text>
        ) : wd === VIBE_META.diaShip && pcSab.length ? (
          <Text style={st.vibeStep}>› DOMINGO (flexible): {t.shipTxt}</Text>
        ) : wd === VIBE_META.diaShip ? (
          <Text style={st.vibeStep}>› DOMINGO: sin PC del vibecoding (día protegido o sin sesión).{((x) => (x ? ` El vibecoding sigue el ${fmtFecha(fechaRealDe(x.fecha, 'vibecoding'))} (S${x.semana}).` : ''))(VIBE_DIAS.find((y) => fechaRealDe(y.fecha, 'vibecoding') > fecha))}</Text>
        ) : wd === 6 ? (
          // integración v7.00 (revisión de regresiones): el sábado de un taper de deload dice lo mismo que el domingo (su shipTxt): «PC opcional y sin bloque: solo si es
          //   día VERDE, hasta 30′ de verify --sensores» (sáb 3, 10 y 17-abr) o, con «Sin PC» (S20, sáb 24-abr), que mañana no hay PC; antes «PC de 0′ (deload total)»
          <Text style={st.vibeStep}>› SÁBADO: sin vibecoding (15:00-17:00 es la clase EN VIVO de Theomed). {mMan && !(t.tipo !== 'mantenimiento' && /^Sin PC/.test(t.shipTxt)) ? `${t.tipo === 'mantenimiento' ? `El PC opcional (30′) va mañana (${fmtFecha(manana)})` : `Mañana (${fmtFecha(manana)}), ${t.shipTxt.replace(/\s*\([^()]*\)\.?$/, '').replace(/\.$/, '').replace(/^Opcional/, 'PC opcional')}`}.${sigTxt}` : 'Mañana domingo no hay PC del vibecoding.'}</Text>
        ) : (
          <Text style={st.vibeStep}>› Hoy no hay paso del vibecoding (feriado).</Text>
        )}
        {pcExtra}
        <Text style={st.vibeSub} numberOfLines={2}>{t.semanaStep1} · {t.objetivo}</Text>
        <Text style={[st.vibeSub, { color: Colors.amber }]} numberOfLines={1}>{VIBE_META.freno}</Text>
        <View style={{ flexDirection: 'row', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          {btnDia}
          {btnJournal}
        </View>
      </View>
    );
  }
  if (!p) return null;
  const semDias = VIBE_DIAS.filter((x) => x.semana === p.s);
  const semHechos = semDias.filter((x) => vibeDone.has(x.d)).length;
  const verify = vibeUltimoVerify(p.s);
  const verifyColor = verify ? (verify.shipped ? Colors.green : Colors.amber) : Colors.muted;
  return (
    <View style={[st.vibeCard, { borderColor: accent + '55' }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <Chip label={`04:15 VIBECODING · S${p.s}/12`} color={accent} small />
        <Chip label={`${VIBE_ROTACION_ICON[p.rotacion]} ${p.rotacion}`} color={Colors.muted} small />
        {p.deload ? <Chip label="DELOAD 50%" color={Colors.amber} small /> : null}
        {verify ? <Chip label={verify.shipped ? `verify ✅ ${verify.criterios_ok}/${verify.total}` : `verify ✗ ${verify.criterios_ok}/${verify.total}`} color={verifyColor} small /> : null}
        <Text style={[st.vibeStat, { marginLeft: 'auto' }]}>{semHechos}/{semDias.length} días · ✓{shipped}/12 · {verificados}/12 shipped (verify)</Text>
      </View>
      <Text style={st.vibeTitle}>{p.nombre}</Text>
      {vd ? (
        <Text style={st.vibeStep}>› {wdDe(fechaRealDe(vd.fecha, 'vibecoding'))} · {VIBE_TIPO_LABEL[vd.tipo]}{vd.min !== 45 ? ` (${vd.min}')` : ''}: {vd.paso}</Text>
      ) : wd === VIBE_META.diaShip && pcMain?.tipo === 'avance' ? (
        <Text style={st.vibeStep}>› DOMINGO PC (2 h, a la hora que puedas) = AVANCE. El proyecto aún no termina: último día {fmtFecha(fechaRealDe(p.fin, 'vibecoding'))} · SHIP {fmtFecha(fechaRealDe(p.ship, 'vibecoding'))}. Avanza los pasos que faltan; hoy no hay verify. Feynman (10′) opcional.</Text>
      ) : wd === VIBE_META.diaShip && !pcMain ? (
        <Text style={st.vibeStep}>› DOMINGO: sin PC del vibecoding (S{p.s} arranca el {fmtFecha(fechaRealDe(p.ini, 'vibecoding'))} · SHIP {fmtFecha(fechaRealDe(p.ship, 'vibecoding'))}). Feynman (10′) opcional.</Text>
      ) : wd === VIBE_META.diaShip ? (
        <Text style={st.vibeStep}>› DOMINGO PC (2 h, a la hora que puedas) = {((xs) => (xs.length === 1 ? `primero el paso ${xs[0]!.k}/5 de S${p.s} (${VIBE_TIPO_LABEL[xs[0]!.tipo]}: commit [S${p.s}] + verify ${p.s}; márcalo con su botón), después el `
          : xs.length ? `primero los pasos ${xs.map((x, i) => `${x.k}/5 (${VIBE_TIPO_LABEL[x.tipo]}${i === xs.length - 1 ? `: commit [S${p.s}] + verify ${p.s}` : ''})`).join(' y ')} de S${p.s}, en ese orden (márcalos con su botón); después el ` : ''))(vdShips.filter((x) => x.semana === p.s))}SHIP: {p.shipTxt} Antes de marcar: node DATA/_scripts/verify_vibecoding.js {p.s}. Después, Feynman (10′, opcional): explica en voz alta qué construiste.</Text>
      ) : wd === 6 ? (
        <Text style={st.vibeStep}>› SÁBADO: sin vibecoding (15:00-17:00 es la clase EN VIVO de Theomed). {mMan?.tipo === 'avance'
          ? `Mañana (${fmtFecha(manana)}), AVANCE de S${p.s} (aún no termina: último día ${fmtFecha(fechaRealDe(p.fin, 'vibecoding'))} · SHIP ${fmtFecha(fechaRealDe(p.ship, 'vibecoding'))}).`
          : mMan ? `Mañana (${fmtFecha(manana)}), el SHIP de S${p.s} (flexible).${sigTxt}`
          : `El SHIP de S${p.s} es el domingo ${fmtFecha(fechaRealDe(p.ship, 'vibecoding'))}.`}</Text>
      ) : (
        <Text style={st.vibeStep}>› Hoy no hay paso del vibecoding (feriado). SHIP de S{p.s}: {fmtFecha(fechaRealDe(p.ship, 'vibecoding'))}.</Text>
      )}
      {pcExtra}
      <Text style={st.vibeSub} numberOfLines={2}>entregable: {p.entregable}</Text>
      <Text style={[st.vibeSub, { color: verifyColor }]} numberOfLines={2}>
        {verify
          ? `último verify ${verify.fecha} ${verify.hora}: ${verify.criterios_ok}/${verify.total} · ${verify.shipped ? 'SHIPPED ✅' : 'NO shipped'} · ${verify.resumen}`
          : `sin verify todavía: node DATA/_scripts/verify_vibecoding.js ${p.s} (SHIP del domingo, antes de marcar) · commits [S${p.s}] …`}
      </Text>
      <View style={{ flexDirection: 'row', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
        {btnDia}
        {p.docs.slice(0, 2).map((d, i) => (
          <TouchableOpacity key={i} activeOpacity={0.8} onPress={() => openUrl(d.url)} style={[st.verBtn, { borderColor: accent + '88' }]}>
            <Text style={[st.verTxt, { color: accent }]} numberOfLines={1}>docs {i + 1} ↗</Text>
          </TouchableOpacity>
        ))}
        {btnJournal}
      </View>
    </View>
  );
}

function HoyView({ dia, done, onToggle, vibeDone, onToggleVibe }: { dia: DiaSynapse; done: Set<number>; onToggle: (d: number) => void; vibeDone: Set<number>; onToggleVibe: (d: number) => void }) {
  const hecho = done.has(dia.d);
  const sinSesion = synFilaSinSesion(dia); // ✈ · ⏸ · 🎄 · 🛡: nada que marcar (cuenta sola al llegar su día y no toca la racha)
  const hoyReal = synHoyReal();
  const diaReal = fechaRealDe(dia.fecha, 'synapse');
  const fV = dia.d === SYN_DIAS[SYN_DIAS.length - 1].d && hoyReal > diaReal ? fechaPlanDe(hoyReal, 'vibecoding') : vibeFechaDe(dia.fecha); // fecha de plan del VibeCard
  const otroDia = !sinSesion && !hecho && diaReal > hoyReal; // sesión de un día real que aún no llega (lun 23-nov pinta la del mar 24): su ✓ va ese día
  // c45 (I): una fila sin sesión cuyo día real hace OTRA sesión (🎄 D40 → D37 del vie 25-dic · D47 → D45 · ⏸ que abre una cadena → la sesión del día que cita
  //   su texto): ese día la racha depende de esa sesión, no «se conserva»
  const realSin = sinSesion ? synDiaRealDe(dia) : null;
  const sesionSust = realSin ? synSesionDeReal(realSin) : null;
  const txtSinSesion = realSin && sesionSust && sesionSust.d !== dia.d
    ? `nada que marcar en esta fila (cuenta sola); la racha del ${fmtFecha(realSin)} depende de la sesión D${sesionSust.d}: márcala ese día`
    : 'nada que marcar en esta fila: cuenta sola y la racha se conserva';
  const faseDias = SYN_DIAS.filter((x) => x.faseId === dia.faseId);
  const faseHechos = synContarHechas(faseDias, done, hoyReal);
  const fasePct = Math.round((faseHechos / faseDias.length) * 100);
  const semDias = SYN_DIAS.filter((x) => x.semana === dia.semana);
  const semHechos = synContarHechas(semDias, done, hoyReal);
  const racha = synRacha(done, hoyReal);
  return (
    <View>
      {/* telemetría del run: streak · semana · % checkpoint (desde los ✓; las filas sin nada que marcar cuentan al llegar su día) */}
      <View style={st.statsRow}>
        <View style={st.statCard}><Text style={[st.statVal, { color: racha > 0 ? INDIGO : Colors.muted }]}>{racha > 0 ? `🔥${racha}` : '—'}</Text><Text style={st.statLbl}>streak · días ✓</Text></View>
        <View style={st.statCard}><Text style={[st.statVal, { color: Colors.onSurface }]}>{semHechos}/{semDias.length}</Text><Text style={st.statLbl}>week {dia.semana}/{SYN_PLAN_META.semanas}</Text></View>
        <View style={st.statCard}><Text style={[st.statVal, { color: fasePct > 0 ? Colors.green : Colors.muted }]}>{fasePct}%</Text><Text style={st.statLbl}>{dia.faseId.toUpperCase()} checkpoint</Text></View>
      </View>

      <FadeUp>
        <View style={[st.misionCard, { borderColor: INDIGO + '55' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Chip label={dia.fase} color={INDIGO} small />
            {(() => { const f = synFaseBCDe(dia.fecha); return f ? <Chip label={`fase ${f.id}/${SYN_FASES_BC.length} · ${f.corto}`} color={PERIWINKLE} small /> : null; })() /* v6.10 · base cero */}
            <Chip label={`week ${dia.semana}`} color={Colors.muted} small />
            {dia.deload ? <Chip label="DELOAD · si aprieta: solo A o solo B" color={Colors.amber} small /> : null}
            {dia.wd !== 'Dom' && <Chip label={`${dia.bloques.reduce((n, b) => n + (b.tag === 'PC' ? 0 : b.min), 0)} min${dia.bloques.some(b => b.tag === 'PC') ? ' + PC opt' : ''}`} color={Colors.amber} small />}
          </View>
          <Text style={st.misionKicker}>{dia.wd === 'Dom' ? '$ run --review' : `$ run --day ${dia.d}`}</Text>
          <Text style={st.misionTitle}>{dia.wd === 'Dom' ? '🌿 Domingo de repaso' : `Misión del día ${dia.d}`}</Text>
          {sinSesion || otroDia ? (
            <View style={[st.doneBtn, { borderColor: Hairline.medium }]}>
              <Text style={[st.doneBtnTxt, { color: Colors.muted }]}>{sinSesion ? txtSinSesion : `es la sesión del ${fmtFecha(diaReal)}: el ✓ se marca ese día`}</Text>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onToggle(dia.d)}
              style={[st.doneBtn, hecho ? { backgroundColor: INDIGO, borderColor: INDIGO } : { backgroundColor: INDIGO + '14', borderColor: INDIGO + '66' }]}
            >
              <Text style={[st.doneBtnTxt, { color: hecho ? '#10122B' : INDIGO }]}>{hecho ? '✓ run passed — misión completada' : '○ marcar run como passed'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </FadeUp>

      {/* v6.10y: el vibecoding puede ir con su alias PROPIO (corrida_s1.alias_frente: S1 corre una sesión) → su fecha de plan sale del día REAL de este SYNAPSE.
          c45: terminado el SYNAPSE (hoy después del día real de su última fila, que «⚡ run» sigue pintando), el paso es el del vibecoding de HOY: S20 cierra después */}
      <FadeUp delay={30}><VibeCard fecha={fV} vibeDone={vibeDone} onToggleVibe={onToggleVibe} vaEl={vibeVaOtroDia(dia.fecha, fV)} /></FadeUp>

      {/* v6.02c (E5) · guías del día (formato común): 04:15 vibecoding · SYNAPSE de L-V · sábado PC (SHIP + A/B/C) · domingo Feynman */}
      {(() => {
        // v7.00 · ítem 46 (bajo): la MISMA fecha de plan del vibecoding que la VibeCard (fV de arriba); antes se recalculaba con vibeFechaDe(dia.fecha) y, terminado el
        //   SYNAPSE (vie 23-abr-2027), la VibeCard enseñaba el paso de hoy y la guía seguía en la del último día del SYNAPSE
        // un día sin vibecoding (su paso va otro día real: vibeVaOtroDia, la misma condición que la VibeCard) no pinta la guía de ese paso
        const otroDia = !!vibeVaOtroDia(dia.fecha, fV);
        const gs = [otroDia ? null : guiaVibeDe(fV), guiaShipDe(fV), guiaFeynmanDe(fV), guiaSynapseDe(dia.fecha)].filter((g): g is NonNullable<typeof g> => !!g);
        return gs.length ? (
          <View>
            <Text style={st.secLbl}>🧭 guía del día · qué · cuánto · cómo</Text>
            {gs.map((g, i) => <FadeUp key={i} delay={35 + i * 20}><GuiaBloqueCard g={reemplazosCorrida(g, g.plan === 'synapse' ? dia.fecha : fV)} color={g.plan === 'synapse' ? INDIGO : OBS} /></FadeUp>)}
          </View>
        ) : null;
      })()}

      <Text style={st.secLbl}>◈ jobs del run · en espacios muertos (no tocan tus bloques médicos)</Text>
      {dia.bloques.map((b, i) => <FadeUp key={i} delay={40 + i * 30}><BloqueRow b={b} /></FadeUp>)}
    </View>
  );
}

function SieteView({ desde, done, onPick }: { desde: string; done: Set<number>; onPick: (d: number) => void }) {
  // por DÍAS REALES seguidos (sin saltos) con la fila que «⚡ run» pinta cada día; las filas sin día real propio no salen (ningún día las pinta)
  const win = synRunsDesde(desde);
  return (
    <View>
      <Text style={st.secLbl}>◷ próximos 7 runs · toca un día para abrirlo</Text>
      {win.map(({ real, x, propia }, i) => {
        const a = x.bloques[0];
        const sinSes = synFilaSinSesion(x) || !propia; // nada que marcar ese día (o pinta la fila de otro día): «–» gris, como en ◈ checkpoints
        const hecho = !sinSes && done.has(x.d);
        return (
          <FadeUp key={real} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: sinSes ? Colors.muted : hecho ? Colors.green : INDIGO }]}>
              <Text style={[st.d7day, { color: sinSes ? Colors.muted : hecho ? Colors.green : INDIGO }]}>{sinSes ? '–' : hecho ? '✓' : ''} D{x.d}</Text>
              <Text style={st.d7fecha}>{fmtFecha(real)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{a.material}</Text>
                <Text style={st.d7sys} numberOfLines={1}>{propia ? a.leccion : `sin sesión propia: es la fila del ${fmtFecha(fechaRealDe(x.fecha, 'synapse'))}`}</Text>
              </View>
              <Text style={[st.d7go, { color: INDIGO }]}>→</Text>
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

function SemanaCard({ g, hoyD, onPick, done, onToggle }: { g: GrupoProgreso<DiaSynapse>; hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const hoyReal = synHoyReal();
  const estadoTxt = g.estado === 'completado' ? '✓ completada' : g.estado === 'en-curso' ? `en curso · ${g.pct}%` : 'pendiente';
  const estadoColor = g.estado === 'completado' ? Colors.green : g.estado === 'en-curso' ? INDIGO : Colors.muted;
  return (
    <View style={[st.semCard, { borderColor: INDIGO + (g.estado === 'en-curso' ? '88' : '2E') }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
        <View style={st.semHead}>
          <Text style={st.semTitle} numberOfLines={1}>{open ? '▾' : '▸'} {g.clave}</Text>
          <Text style={[st.semCount, { color: estadoColor }]}>{g.hechos}/{g.total}</Text>
        </View>
        <ProgressBar pct={g.pct} color={INDIGO} />
        <Text style={[st.semEstado, { color: estadoColor }]}>{estadoTxt}</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: 8 }}>
          {g.dias.map((x) => {
            const sinSes = synFilaSinSesion(x); // nada que marcar: cuenta sola al llegar su día
            const hecho = !sinSes && done.has(x.d), now = x.d === hoyD;
            const futura = !sinSes && !hecho && fechaRealDe(x.fecha, 'synapse') > hoyReal; // sesión de un día real que aún no llega: su ✓ va ese día (desmarcar sí se puede)
            const a = x.bloques[0];
            return (
              <View key={x.d} style={[st.diaRow, now && { backgroundColor: INDIGO + '12' }]}>
                <TouchableOpacity activeOpacity={0.7} disabled={sinSes || futura} onPress={() => onToggle(x.d)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
                  <Text style={[st.diaChk, { color: sinSes ? Colors.muted : hecho ? Colors.green : futura ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.25)' }]}>{sinSes ? '–' : hecho ? '☑' : '☐'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={st.diaRowMain}>
                  <Text style={[st.diaRowD, { color: hecho ? Colors.green : now ? INDIGO : Colors.muted }]}>{now ? '▶' : ''} D{x.d}</Text>
                  <Text style={st.diaRowTxt} numberOfLines={1}>{a.tag === 'R' ? (x.wd === 'Dom' ? `🌿 ${a.material}` : a.material) : `${a.material} — ${a.leccion}`}</Text>
                  <Text style={st.diaRowGo}>→</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

function TemarioView({ hoyD, onPick, done, onToggle }: { hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const grupos = synGruposSemana(hoyD, done);
  const glob = progresoGlobal(SYN_DIAS, synDoneEfectivo(done));
  return (
    <View>
      <View style={st.globCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={st.globTitle}>◈ {SYN_PLAN_META.semanas} checkpoints · training progress</Text>
          <Text style={[st.globPct, { color: INDIGO }]}>{glob.pct}%</Text>
        </View>
        <ProgressBar pct={glob.pct} color={INDIGO} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} runs al día · F0 sem 1-8 (base cero: fases 1-4, se cursa entera) · F1 sem 9-12 = stack del vibecoding · F2 sem 13-{SYN_PLAN_META.semanas} = Academy restante + prep CCA-F (taper por el ENCAPS; sem {SYN_PLAN_META.deloadDesde}+ deload) · domingo PC = SHIP (flexible) · avance manual real: cuentan las sesiones con ✓ y, al llegar su día, las filas sin nada que marcar (–: viaje, feriado, protegido, día sin sesión); las sesiones a hora fija de las cadenas y recuperaciones van sin ✓</Text>
      </View>
      {grupos.map((g) => <SemanaCard key={claveGrupoDeHoy(g, hoyD)} g={g} hoyD={hoyD} onPick={onPick} done={done} onToggle={onToggle} />)}
      <Text style={st.note}>☑ marca un run como passed (se guarda en este dispositivo y se sincroniza con Supabase, tabla plan_checks: lo ves en tus otros dispositivos y lo lee la revisión semanal). ▶ = run de hoy. – = nada que marcar: cuenta sola al llegar su día. ☐ tenue = sesión de un día que aún no llega: se marca ese día. El plan termina el {fechaRealDe(SYN_PLAN_META.fin, 'synapse')}{/* v6.02d: fecha real visible (semana corrida) */}, con las mismas 110 A-units; sin SYNAPSE en los días PROTEGIDOS del ENCAPS ni en los feriados que conservan su día (un feriado de plan sin día propio, con fecha «—», no quita la sesión de ese día real: la hace otra fila) (node DATA/_scripts/gen_synapse_plan.js).</Text>
    </View>
  );
}

export default function SynapseTodayPlan({ done, onToggle, vibeDone: vibeDoneProp, onToggleVibe: onToggleVibeProp }: {
  done: Set<number>; onToggle: (d: number) => void;
  vibeDone?: Set<number>; onToggleVibe?: (d: number) => void; // v5.7: ✓ del vibecoding (PlanKey 'vibecoding'); si el hub no los pasa, estado local
}) {
  // c45 (A): el día real de este render; con la pestaña abierta de un día para otro repinta (medianoche, focus, visibilitychange) y la selección vuelve a hoy
  const hoyReal = useHoyReal();
  const iso = fechaPlanDe(hoyReal, 'synapse'); // = synTodayISO() del mismo día
  const hoyD = planHoyD(SYN_DIAS, iso, 'synapse');
  const todayDia = synFilaDeReal(hoyReal); // la misma fila que usa la racha (synapseProgreso)
  const [sel, setSel] = useSelDeHoy(hoyReal, todayDia.d);
  const [view, setView] = useState<'hoy' | '7d' | 'temario'>('hoy');
  const [vibeLocal, marcarVibeLocal] = useDone('vibecoding');
  const vibeDone = vibeDoneProp ?? vibeLocal;
  const onToggleVibe = onToggleVibeProp ?? marcarVibeLocal;
  const dia = SYN_DIAS.find((x) => x.d === sel) || SYN_DIAS[0];
  // por .d (no por fecha): así el día por defecto figura como HOY aunque hoy caiga antes del inicio o en un hueco
  const esHoy = dia.d === todayDia.d;
  const pickDay = (d: number) => { setSel(d); setView('hoy'); };
  // ◄/► por DÍAS REALES: la fila que «⚡ run» pinta el día real anterior / siguiente (las filas sin día real propio no se recorren; se abren desde ◈ checkpoints)
  const filaAnt = synFilaVecina(dia, -1), filaSig = synFilaVecina(dia, 1);
  // c45 (G): el día real de la fila; en una fila que abre una cadena (⏸ D16 · D46), el de su sesión (el que dice su texto: sáb 5-dic · sáb 2-ene) → ◷ 7 runs parte de ahí
  const diaReal = synDiaRealDe(dia);

  return (
    <View>
      <View style={st.navRow}>
        <TouchableOpacity activeOpacity={0.7} disabled={!filaAnt} onPress={() => { if (filaAnt) setSel(filaAnt.d); }} style={[st.navArrow, !filaAnt && { opacity: 0.35 }]}><Text style={st.navArrowTxt}>◄</Text></TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={st.navDay}>run D{dia.d}/{SYN_PLAN_META.totalDias}{esHoy ? ' · LIVE' : ''}</Text>
          {/* fecha real visible · «—» si ningún día real pinta esta fila (su día real hace otra; el texto de la fila dice cuál) */}
          <Text style={st.navFecha}>{synSinDiaPropio(dia) ? '—' : `${fmtFecha(diaReal)} · ${diaReal}`}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} disabled={!filaSig} onPress={() => { if (filaSig) setSel(filaSig.d); }} style={[st.navArrow, !filaSig && { opacity: 0.35 }]}><Text style={st.navArrowTxt}>►</Text></TouchableOpacity>
      </View>
      {!esHoy && <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(todayDia.d)} style={st.hoyBtn}><Text style={st.hoyBtnTxt}>↩ volver al run LIVE</Text></TouchableOpacity>}

      <View style={st.subTabs}>
        {([['hoy', '⚡ run'], ['7d', '◷ 7 runs'], ['temario', '◈ checkpoints']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
            <Text style={[st.subTabTxt, view === k && { color: INDIGO }]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <GlassPanel style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
        {view === 'hoy' ? <HoyView dia={dia} done={done} onToggle={onToggle} vibeDone={vibeDone} onToggleVibe={onToggleVibe} />
          : view === '7d' ? <SieteView desde={diaReal} done={done} onPick={pickDay} />
          : <TemarioView hoyD={hoyD} onPick={pickDay} done={done} onToggle={onToggle} />}
      </GlassPanel>
    </View>
  );
}

const cardBase = { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.medium, ...Elevation.sm };
const st = StyleSheet.create({
  navRow: { flexDirection: 'row', alignItems: 'center', ...cardBase, padding: Spacing.sm, marginBottom: Spacing.xs },
  navArrow: { width: 40, height: 40, borderRadius: BorderRadius.md, backgroundColor: 'rgba(216,227,252,0.05)', borderWidth: 1, borderColor: Hairline.soft, alignItems: 'center', justifyContent: 'center' },
  navArrowTxt: { fontSize: 16, color: INDIGO, fontWeight: '800' },
  navDay: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: 0.2, ...monoText },
  navFecha: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1, letterSpacing: 0.2, ...monoText },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: INDIGO, fontWeight: '700', letterSpacing: 0.3, ...monoText },

  subTabs: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm, flexWrap: 'wrap' },
  subTab: { flexGrow: 1, paddingVertical: 7, paddingHorizontal: 8, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, alignItems: 'center' },
  subTabOn: { backgroundColor: INDIGO + '14', borderColor: INDIGO + '55', ...Elevation.sm },
  subTabTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted, letterSpacing: 0.4, ...monoText },

  statsRow: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm },
  statCard: { flex: 1, ...cardBase, paddingVertical: 10, paddingHorizontal: 6, alignItems: 'center' },
  statVal: { fontSize: FontSize.bodyLg, fontWeight: '900', letterSpacing: -0.2, ...monoText },
  statLbl: { fontSize: 8, color: Colors.smallLabel, fontWeight: '700', marginTop: 3, textAlign: 'center', letterSpacing: 0.5, textTransform: 'uppercase', ...monoText },

  misionCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm, ...Elevation.md },
  vibeCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm },
  vibeStat: { fontSize: 9, color: Colors.muted, letterSpacing: 0.3, ...monoText },
  vibeTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, marginTop: 6, letterSpacing: -0.1 },
  vibeStep: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 4, lineHeight: LineHeight.labelMd },
  vibeSub: { fontSize: 9, color: Colors.muted, marginTop: 4, lineHeight: 13 },
  misionKicker: { fontSize: FontSize.labelSm, color: INDIGO, marginTop: 8, letterSpacing: 0.3, ...monoText },
  misionTitle: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: 2, letterSpacing: -0.2, lineHeight: LineHeight.bodyLg },
  doneBtn: { marginTop: 10, paddingVertical: 9, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center' },
  doneBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.3, ...monoText },

  secLbl: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.9, textTransform: 'uppercase', marginBottom: 8, marginTop: Spacing.sm, ...monoText },
  blk: { ...cardBase, borderWidth: 1, flexDirection: 'row', alignItems: 'stretch', gap: 10, paddingVertical: Spacing.md, paddingRight: Spacing.md, paddingLeft: 0, marginBottom: 6, overflow: 'hidden' },
  blkBar: { width: 4, alignSelf: 'stretch', borderTopLeftRadius: BorderRadius.lg, borderBottomLeftRadius: BorderRadius.lg },
  blkStatus: { fontSize: 13, fontWeight: '800', ...monoText },
  blkTag: { fontSize: 10, fontWeight: '800', letterSpacing: 0.3, ...monoText },
  blkFmt: { fontSize: 9, color: Colors.muted, letterSpacing: 0.3, ...monoText },
  blkMat: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '700', letterSpacing: -0.1, flex: 1 },
  blkLec: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 3, lineHeight: LineHeight.labelMd },
  blkDur: { fontSize: 9, color: Colors.muted, marginTop: 3, letterSpacing: 0.3, ...monoText },
  verBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center', alignSelf: 'center' },
  verTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.3, ...monoText },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.sm, marginBottom: 5 },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 44, ...monoText },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56, letterSpacing: 0.2, ...monoText },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 1 },
  d7go: { fontSize: 16, fontWeight: '800', width: 18, textAlign: 'center' },

  globCard: { ...cardBase, padding: Spacing.md, marginBottom: Spacing.sm },
  globTitle: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: 0.3, ...monoText },
  globPct: { fontSize: FontSize.bodyLg, fontWeight: '900', letterSpacing: -0.3, ...monoText },
  globSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 5, lineHeight: LineHeight.labelSm },
  barTrack: { height: 7, borderRadius: BorderRadius.full, backgroundColor: Hairline.strong, overflow: 'hidden' },
  barFill: { height: 7, borderRadius: BorderRadius.full },
  semCard: { ...cardBase, padding: Spacing.md, marginBottom: 6 },
  semHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  semTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flex: 1, letterSpacing: -0.1 },
  semCount: { fontSize: FontSize.labelMd, fontWeight: '800', marginLeft: 8, ...monoText },
  semEstado: { fontSize: FontSize.labelSm, fontWeight: '700', marginTop: 5, letterSpacing: 0.3, ...monoText },
  diaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, paddingHorizontal: 6, borderRadius: BorderRadius.sm, borderTopWidth: 1, borderTopColor: Hairline.soft },
  diaRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  diaChk: { fontSize: 16, width: 22, textAlign: 'center' },
  diaRowD: { fontSize: FontSize.labelSm, fontWeight: '800', width: 44, ...monoText },
  diaRowTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  diaRowGo: { fontSize: 14, color: Colors.muted, width: 16, textAlign: 'center' },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: LineHeight.labelSm },
});
