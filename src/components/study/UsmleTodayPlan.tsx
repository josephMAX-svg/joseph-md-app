import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform, TextInput, Share } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { Chip, GlassPanel } from '../empresa/primitives';
import { FadeUp } from '../empresa/visuals';
import {
  DAILY_META, FRANJAS, FRANJAS_REGLAS, DIAS, DiaUSMLE, diaDe, diaPrevio, diaAnterior, ventana7d, TIER_INFO,
  QBV, QBQ, QBF, QBL, yt, nivelInfo, esHito, faseDe, USMLE_GATE,
  semanaDe, esViernesNivel4, esDiaTaper, esDiaDermaStep1, USMLE_TAPER, PROTOCOLO_BLOQUE, DAY_AFTER,
} from '../../lib/usmleStep1Daily';
import {
  UsmleScore, TipoErrorUW, TIPOS_ERROR, TIPO_ERROR_INFO, loadScores, scoreDe, upsertScore, gateDelDia, exportScoresJSON,
  subtemasValidados, alarmaAbogado, alarmaRelectura, reglaDelTercio, plantillaPorSistema, esParcial, marcarParcial, PISO_AMBAR, semaforoPct,
} from '../../lib/usmleScores';
import { usmleMirParalelo } from '../../lib/mirUsmleBridge';
import { mirBloques } from '../../lib/mirDailyPlan';
import * as dermaPlan from '../../lib/dermaDailyPlan';
import { agruparProgreso, planHoyD, progresoGlobal, GrupoProgreso, loadDone, saveDone } from '../../lib/studyProgress';
import { usmleObsUrl } from '../../lib/obsidianMap';
import { usmleAnkiDeck, ANKIWEB, sysTag, DERMA_STEP1_QUERY } from '../../lib/ankiLinks';

/**
 * UsmleTodayPlan — Plan Step 1 día-a-día, estilo Perú/ENCAPS pero mejor.
 * Botones Step 1/2/3 · navegación Día X/95 (◄►) · sub-pestañas HOY/Horario/7d/Temario.
 * Qbankly SOLO abre en Edge → cada link Qbankly ofrece botón "Edge" (microsoft-edge:)
 * además del de Chrome. 7 días y temario son clicables → saltan al día. El badge de
 * sistema lleva al Temario con el progreso real del plan por sistema.
 * Palmerton (5-sep-2026): chip de NIVEL UWorld del día (DIAS[].nivelUW) + chip "MIR en paralelo" +
 * tarjeta 📏 MEDICIÓN (pre-test /10 · consolidación % · eval % · tipo de error · gate ✓ subir / ✗ repetir ·
 * export JSON) → usmleScores.ts (localStorage 'jmd-usmle-scores' + Supabase usmle_daily_scores).
 * 2.ª capa Palmerton (19-sep-2026): repaso anclado sobre el último día de CONTENIDO (#6, salta hitos) · shopping list de ayer
 * arrastrada al 07:15 (#28) · kit anti-pánico los días de hito (#26) · Day-After Protocol el día siguiente (#5) · temporizador
 * 2:00/12:00/60:00 (#10) · cambiadas/relecturas (#11) · regla del tercio (#8) · % por bloque + plantilla por sistema en hitos (#27)
 * · chip "x/3 subtemas validados" y gate N3 solo sobre el bloque timed (#13) · reglas por franja en Horario (#16 #17) · toggle de
 * día parcial (§12.6-10). Las HORAS, el temario y las fechas no cambian.
 */
const GREEN = Colors.green;   // jade (US console) — migrado de #3FB984 fosforescente
const RED = Colors.coral;     // terracotta — migrado de #E5484D
const EDGE = '#5B86B8';       // sapphire apagado (marca MS Edge, sin neón) — de #3DA5E0
const OBS = Colors.purple;    // amethyst — migrado de #A78BFA
const READ = Colors.blue;     // sapphire (active reading) — migrado de #7BB1FF
const APEX = Colors.gold;     // oro-firma para el APEX transversal — migrado de #F5A623
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function openEdge(u: string) { Linking.openURL('microsoft-edge:' + u).catch(() => openUrl(u)); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return DAILY_META.inicio; }
}
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${iso.slice(8, 10)}-${iso.slice(5, 7)}`; } catch { return iso; }
}
function addDiasISO(iso: string, n: number): string {
  try { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); } catch { return iso; }
}

/**
 * Puente MIR → Step 1 (gaps v3b mir #9): el plan MIR v3 precede ~1 semana a su sistema Step 1 (prime en español 7 días
 * antes). Para el repaso anclado de las 07:15: la asignatura MIR de la SEMANA PASADA + el homólogo MIR del sistema de hoy.
 */
function mirPrecedio(dia: DiaUSMLE): { texto: string; tag: string } | null {
  const prev = usmleMirParalelo(addDiasISO(dia.fecha, -7)) || usmleMirParalelo(dia.fecha);
  let homologo: { asignatura: string; dIni: number; dFin: number } | null = null;
  try { homologo = mirBloques().find((b) => b.usmleSystem === dia.system) || null; } catch { homologo = null; }
  if (!prev && !homologo) return null;
  const partes: string[] = [];
  if (prev) partes.push(`MIR precedió esta semana: ${prev.asignatura} (D${prev.dIni}-D${prev.dFin})`);
  if (homologo && (!prev || homologo.asignatura !== prev.asignatura)) partes.push(`homólogo MIR de ${dia.system}: ${homologo.asignatura} (D${homologo.dIni}-D${homologo.dFin})`);
  return { texto: partes.join(' · '), tag: sysTag(dia.system) };
}

/**
 * Puente Derma → Step 1 (gaps v3b derma #6): los átomos Derma que cuentan doble el día de "dermato Step 1".
 * `DERMA_STEP1_DIAS` lo exporta otro agente en dermaDailyPlan.ts (import defensivo); si aún no existe, la lista fija del gap.
 */
const DERMA_STEP1_FALLBACK = [7, 8, 10, 12, 14, 16, 23, 24];
function dermaStep1Atomos(): { d: number; sub: string; fecha: string }[] {
  const mod: any = dermaPlan;
  const ids: number[] = Array.isArray(mod.DERMA_STEP1_DIAS) && mod.DERMA_STEP1_DIAS.length ? mod.DERMA_STEP1_DIAS : DERMA_STEP1_FALLBACK;
  const dias: any[] = Array.isArray(mod.DERMA_DIAS) ? mod.DERMA_DIAS : [];
  return ids.map((d) => { const x = dias.find((y) => y && y.d === d); return { d, sub: x ? String(x.sub) : `átomo d${d}`, fecha: x ? String(x.fecha) : '' }; });
}

/** Cola de hoy: ítem con link. `edge` añade el botón Microsoft Edge (para Qbankly). */
function ColaItem({ icon, lbl, val, sub, color, url, edge }: { icon: string; lbl: string; val: string; sub: string; color: string; url: string; edge?: boolean }) {
  return (
    <View style={[st.cola, { borderLeftColor: color }]}>
      <Text style={st.colaIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={st.colaLbl}>{lbl}</Text>
        <Text style={st.colaVal} numberOfLines={2}>{val}</Text>
        <Text style={st.colaSub}>{sub}</Text>
      </View>
      <View style={{ gap: 5, minWidth: 64 }}>
        {edge && (
          <TouchableOpacity activeOpacity={0.85} onPress={() => openEdge(url)} style={st.edgeBtn}>
            <Text style={st.edgeTxt}>◆ Edge</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(url)} style={[st.verBtn, { borderColor: color + '88' }]}>
          <Text style={[st.verTxt, { color }]}>{edge ? 'Chrome ↗' : 'ver ↗'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HoyView({ dia, onOpenTemario, hecho, onToggle }: { dia: DiaUSMLE; onOpenTemario: () => void; hecho: boolean; onToggle: (d: number) => void }) {
  const prev = diaPrevio(dia);            // #6: último día de CONTENIDO (salta los hitos 🎯)
  const ayer = diaAnterior(dia);          // D-1 literal (puede ser un hito)
  const postHito = !!ayer && esHito(ayer); // #5: hoy toca el Day-After Protocol además del subtema
  const scoresHoy = loadScores();
  const sPrev = prev ? scoreDe(scoresHoy, prev.fecha) : undefined;      // #28: shopping list de ayer (notas)
  const sAyer = ayer && ayer !== prev ? scoreDe(scoresHoy, ayer.fecha) : undefined;
  const sv = subtemasValidados(scoresHoy, dia);                          // #13
  const [parcial, setParcial] = useState<boolean>(() => esParcial(dia.fecha)); // §12.6-10
  useEffect(() => { setParcial(esParcial(dia.fecha)); }, [dia.fecha]);
  const toggleParcial = () => { const n = !parcial; marcarParcial(dia.fecha, n); setParcial(n); };
  const tier = TIER_INFO[dia.tier];
  const niv = nivelInfo(dia.nivelUW);
  const mir = usmleMirParalelo(dia.fecha);
  const mirPrev = mirPrecedio(dia);
  const viernesN4 = esViernesNivel4(dia);
  const taper = esDiaTaper(dia);
  const hitoHoy = esHito(dia); // día de UWSA/NBME/Free 120: no hay pre-test de nivel 1, la mañana es el sim
  const derma = esDiaDermaStep1(dia);
  const atomos = derma ? dermaStep1Atomos() : [];
  const notaColor = taper ? RED : Colors.gold;
  return (
    <View>
      {/* Tema del día — el badge de sistema lleva al Temario */}
      <FadeUp>
        <View style={[st.temaCard, { borderColor: tier.c + '55' }]}>
          <View style={st.temaTop}>
            <TouchableOpacity activeOpacity={0.8} onPress={onOpenTemario} style={[st.sysBadge, { backgroundColor: tier.c + '1F', borderColor: tier.c + '66' }]}>
              <Text style={[st.sysBadgeTxt, { color: tier.c }]}>{dia.system} ›</Text>
            </TouchableOpacity>
            <Chip label={tier.t} color={tier.c} small />
            <Chip label="1ª vuelta" color={GREEN} small />
            <Chip label={`Fase ${faseDe(dia.d)}`} color={Colors.muted} small />
            <Chip label={`Nivel UW ${dia.nivelUW} · ${dia.qDia}Q`} color={niv.color} small />
            {viernesN4 && <Chip label={`Viernes N4 · S${semanaDe(dia.fecha)}`} color={Colors.gold} small />}
            {taper && <Chip label={dia.d === DAILY_META.totalDias ? 'TAPER · D-1 (dentro del plan)' : 'TAPER · D-2 · última sesión de banco'} color={RED} small />}
            {!hitoHoy && faseDe(dia.d) === 'A' && (dia.nivelUW === 2 || dia.nivelUW === 3) && sv.total > 0 && <Chip label={`${sv.n}/${sv.objetivo} subtemas validados · ${dia.system}`} color={sv.n >= sv.objetivo ? GREEN : Colors.gold} small />}
            {parcial && <Chip label="🚦 DÍA PARCIAL (ROJO)" color={RED} small />}
            {derma && <Chip label="cuenta doble Derma ↔ Step 1" color={Colors.gold} small />}
            {mir && <Chip label={mir.texto} color={Colors.gold} small />}
            {usmleObsUrl(dia.d) && (
              <TouchableOpacity activeOpacity={0.8} onPress={() => openUrl(usmleObsUrl(dia.d)!)}
                style={[st.sysBadge, { backgroundColor: OBS + '1F', borderColor: OBS + '77' }]}>
                <Text style={[st.sysBadgeTxt, { color: OBS }]}>◆ Obsidian</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={st.temaTitle}>{dia.sub}</Text>
          <Text style={st.temaSub}>Subtema atómico del día · 1/día · toca el sistema para ver todo el temario y tu avance ›</Text>
          <Text style={[st.temaSub, { color: niv.color }]}>Nivel {niv.nivel} · {niv.nombre} — {niv.formato}. Gate: {niv.umbral}.</Text>
          <TouchableOpacity activeOpacity={0.85} onPress={() => onToggle(dia.d)} style={[st.doneBtn, hecho ? st.doneBtnOn : st.doneBtnOff]}>
            <Text style={[st.doneBtnTxt, { color: hecho ? '#0A1A12' : GREEN }]}>{hecho ? '✓ Completado hoy' : '○ Marcar como completado'}</Text>
          </TouchableOpacity>
          {/* §12.6-10 · día PARCIAL = modo ROJO de PROTOCOLO_MODO_MINIMO (solo Anki AM + 10Q pre-test): no es "completado", cuenta como perdido para el corrimiento */}
          <TouchableOpacity activeOpacity={0.85} onPress={toggleParcial} style={[st.parcialBtn, parcial && { backgroundColor: RED + '22', borderColor: RED + '99' }]}>
            <Text style={[st.parcialTxt, { color: parcial ? RED : Colors.muted }]}>{parcial ? '🚦 DÍA PARCIAL marcado · solo Anki AM + 10Q (ROJO) · cuenta como día perdido: +1 hábil con remap_inicio.js' : '🚦 Marcar como día PARCIAL (ROJO: solo Anki AM + 10Q pre-test; el resto del bloque = dormir)'}</Text>
          </TouchableOpacity>
        </View>
      </FadeUp>

      {/* #26 · Kit anti-pánico del bloque: días de hito (vale para cualquier bloque timed) */}
      {hitoHoy && (
        <FadeUp delay={15}>
          <View style={[st.anchor, { borderLeftColor: Colors.gold }]}>
            <Text style={[st.anchorLbl, { color: Colors.gold }]}>🧯 {PROTOCOLO_BLOQUE.titulo}</Text>
            {PROTOCOLO_BLOQUE.pasos.map((p, i) => <Text key={i} style={st.anchorSub}>{i + 1}. {p}</Text>)}
            <Text style={[st.anchorSub, { color: Colors.onSurfaceVariant, marginTop: 6 }]}>📝 {PROTOCOLO_BLOQUE.worstCase}</Text>
            <Text style={[st.anchorSub, { color: Colors.muted }]}>Fuente: {PROTOCOLO_BLOQUE.fuente}</Text>
          </View>
        </FadeUp>
      )}
      {/* #5 · Day-After Protocol: mañana (si hoy es hito) · hoy (si ayer fue hito; el subtema de hoy NO cambia) */}
      {(hitoHoy || postHito) && (
        <FadeUp delay={18}>
          <View style={[st.anchor, { borderLeftColor: postHito ? RED : Colors.gold }]}>
            <Text style={[st.anchorLbl, { color: postHito ? RED : Colors.gold }]}>{postHito ? `🔍 HOY · ${DAY_AFTER.titulo} del ${ayer!.uw} (D${ayer!.d}) — además del subtema de hoy` : `🔍 MAÑANA · ${DAY_AFTER.titulo}`}</Text>
            <Text style={st.anchorSub}>{DAY_AFTER.cuando}</Text>
            {postHito && DAY_AFTER.pasos.map((p, i) => <Text key={i} style={st.anchorSub}>{i + 1}. {p}</Text>)}
            {postHito && sAyer?.bloquesPct && sAyer.bloquesPct.some((b) => b != null) && <Text style={[st.anchorSub, { color: Colors.gold }]}>Bloques del hito: {sAyer.bloquesPct.map((b, i) => `B${i + 1} ${b != null ? b + '%' : '—'}`).join(' · ')}</Text>}
            {postHito && sAyer?.notas ? <Text style={[st.anchorSub, { color: Colors.onSurfaceVariant }]}>Notas del hito (reporte por sistema): {sAyer.notas}</Text> : null}
            <Text style={[st.anchorSub, { color: Colors.muted }]}>{DAY_AFTER.reglaDeOro}</Text>
          </View>
        </FadeUp>
      )}

      {/* Nota de franja 11:00 (viernes de nivel 4 desde S11 · taper D94-D95) — NO es contenido: el subtema sigue siendo `sub` */}
      {dia.franjaNota ? (
        <FadeUp delay={20}>
          <View style={[st.anchor, { borderLeftColor: notaColor }]}>
            <Text style={[st.anchorLbl, { color: notaColor }]}>{taper ? '🧘 TAPER · cierre pre-examen (Palmerton §8.3)' : '🎚️ 11:00 · VIERNES DE NIVEL 4 (mixto de sistemas dominados)'}</Text>
            <Text style={st.anchorSub}>{dia.franjaNota}</Text>
          </View>
        </FadeUp>
      ) : null}
      {/* D95 = último día del plan (v5.15) y examen lun 8-feb: solo se muestran en D95 para que el cierre quede a la vista */}
      {dia.d === DAILY_META.totalDias && (
        <FadeUp delay={25}>
          <View style={[st.anchor, { borderLeftColor: RED }]}>
            <Text style={[st.anchorLbl, { color: RED }]}>📅 {fmtFecha(USMLE_TAPER.dMenos1.fecha)} · {USMLE_TAPER.dMenos1.rol}</Text>
            {USMLE_TAPER.dMenos1.pasos.map((p, i) => <Text key={i} style={st.anchorSub}>• {p}</Text>)}
            <Text style={[st.anchorLbl, { color: GREEN, marginTop: 8 }]}>🏁 {fmtFecha(USMLE_TAPER.examen.fecha)} · {USMLE_TAPER.examen.rol}</Text>
            {USMLE_TAPER.examen.pasos.map((p, i) => <Text key={i} style={st.anchorSub}>• {p}</Text>)}
            <Text style={[st.anchorSub, { color: Colors.muted }]}>Fuente: {USMLE_TAPER.fuente}</Text>
          </View>
        </FadeUp>
      )}

      {/* Medición Palmerton del día (gate 80%) */}
      <FadeUp delay={30}><MedicionCard dia={dia} /></FadeUp>

      {/* Puente Derma ↔ Step 1: el día de "dermato Step 1" cuenta doble con los átomos Derma ya estudiados */}
      {derma && (
        <FadeUp delay={35}>
          <View style={[st.anchor, { borderLeftColor: Colors.gold }]}>
            <Text style={[st.anchorLbl, { color: Colors.gold }]}>🧬 Cuenta doble Step 1 ↔ Derma · átomos Derma ya estudiados (sep-nov)</Text>
            <Text style={st.anchorSub}>Hoy el pre-test 08:15 y el repaso anclado 07:15 apuntan a <Text style={{ color: Colors.onSurface, fontWeight: '700' }}>{DERMA_STEP1_QUERY}</Text> + fallos del ledger derma de estos {atomos.length} átomos (mismo motor FSRS; la derma de Step 1 no se estudia dos veces). El contenido USMLE del día no cambia.</Text>
            {atomos.map((a) => (
              <Text key={a.d} style={st.anchorSub}>• d{a.d}{a.fecha ? ` · ${fmtFecha(a.fecha)}` : ''} · {a.sub}</Text>
            ))}
          </View>
        </FadeUp>
      )}

      {/* Anchored eval (tema previo) */}
      {prev && (
        <FadeUp delay={40}>
          <View style={st.anchor}>
            <Text style={st.anchorLbl}>🎯 07:15 · Repaso anclado (tema de AYER + D-3/D-7)</Text>
            <Text style={st.anchorVal}>{prev.system} → {prev.sub}</Text>
            <Text style={st.anchorSub}>{derma ? `HOY: ${DERMA_STEP1_QUERY} + fallos del ledger derma (cuenta doble) antes de las 5Q del subtema de ayer · ` : ''}Anki FSRS deck USMLE + 5Q uWorld TIMED del subtema de ayer (1ª mitad del gate de 10Q; la 2ª mitad va en la consolidación) · si free recall &lt;60% → re-encolar</Text>
            {mirPrev && <Text style={[st.anchorSub, { color: Colors.gold }]}>🇪🇸 {mirPrev.texto} · Anki: tag compartido {mirPrev.tag} (APEX::MIR + APEX::USMLE) para el D-7 en español</Text>}
            {/* #28 · shopping list arrastrada (§3.5.B / §6.5): las notas de ayer se leen ANTES de las 5Q de validación */}
            <View style={st.shopBox}>
              <Text style={[st.anchorLbl, { color: APEX }]}>🛒 Shopping list de ayer · D{prev.d} ({fmtFecha(prev.fecha)})</Text>
              {sPrev?.notas ? <Text style={[st.anchorSub, { color: Colors.onSurfaceVariant }]}>{sPrev.notas}</Text> : <Text style={st.anchorSub}>sin notas registradas en D{prev.d} → hoy anota en 📏 Medición cada duda (también en las correctas): es lo que se valida mañana a las 07:15</Text>}
              {sPrev && (sPrev.tipoError || sPrev.consol30pct != null) ? <Text style={st.anchorSub}>ayer: consolidación {sPrev.consol30pct != null ? `${sPrev.consol30pct}%` : '—'}{sPrev.tipoError ? ` · error dominante ${TIPO_ERROR_INFO[sPrev.tipoError].corto} → ${TIPO_ERROR_INFO[sPrev.tipoError].tarjeta.split(' · ')[0]}` : ''}</Text> : null}
              {postHito && ayer && ayer.d !== prev.d ? <Text style={[st.anchorSub, { color: Colors.gold }]}>D{ayer.d} fue un hito ({ayer.uw}): el subtema que se valida hoy es el de D{prev.d}; la auditoría del hito va en el Day-After de arriba</Text> : null}
            </View>
            <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openEdge(QBQ)} style={st.edgeBtnWide}><Text style={st.edgeTxt}>◆ Abrir en Edge</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QBQ)} style={[st.verBtn, { borderColor: READ + '88' }]}><Text style={[st.verTxt, { color: READ }]}>Chrome ↗</Text></TouchableOpacity>
            </View>
          </View>
        </FadeUp>
      )}

      {/* Cola de materiales de hoy */}
      <Text style={st.secLbl}>📋 Cola de hoy · 05:00 Anki AM · 07:15–12:00 + 18:00–18:45 (en orden) · Qbankly = botón Edge</Text>
      <FadeUp delay={60}><ColaItem icon="🅠" lbl={hitoHoy ? `HITO · ${dia.uw} (${dia.qDia}Q · nivel 5 · timed)` : "PRE-TEST 08:15 · uWorld (modo tutor · SIN tiempo · nivel 1)"} val={hitoHoy ? `${dia.sub} · protocolo test-day (Ziploc BREAK 1/2/3, sit-in breaks, sin cambiar respuestas)` : derma ? `${DERMA_STEP1_QUERY} + fallos del ledger derma → luego ${dia.uw} · 10 preguntas ciegas` : `${dia.system} → ${dia.uw} · 10 preguntas ciegas + free recall 90s`} sub={derma ? 'Cuenta doble Derma ↔ Step 1: 15 min de tarjetas step1 + casos fallados del ledger, después las 10Q ciegas de uWorld (Qbankly, Edge)' : 'Qbankly → QBanks → uWorld Step 1 · UWorld primero para diagnosticar, First Aid después'} color={GREEN} url={QBQ} edge /></FadeUp>
      <FadeUp delay={90}><ColaItem icon="🎬" lbl="VÍDEO · Boards & Beyond Step 1" val={`${dia.bbCh} → ${dia.bbVid}`} sub="Qbankly → Video Library → B&B Step 1" color={RED} url={QBV} edge /></FadeUp>
      <FadeUp delay={120}><ColaItem icon="📖" lbl="ACTIVE READING · material primario" val={dia.mat} sub="Qbankly → Library (uWorld/AMBOSS) · 25 min · 3-5 puntos high-yield" color={READ} url={QBL} edge /></FadeUp>
      <FadeUp delay={150}><ColaItem icon="🗂️" lbl="FLASHCARDS · uWorld Step 1" val={`Deck: ${dia.system}`} sub="Qbankly → Flashcards · Anki SRS" color={Colors.teal} url={QBF} edge /></FadeUp>
      {usmleObsUrl(dia.d) && (
        <FadeUp delay={165}><ColaItem icon="◆" lbl="OBSIDIAN · nota madre del subtema" val={`${dia.system} → ${dia.sub}`} sub="Vault_Medicina MIR_Joseph · aquí caen los APEX de hoy (motor APEX)" color={OBS} url={usmleObsUrl(dia.d)!} /></FadeUp>
      )}
      <FadeUp delay={180}><ColaItem icon="🃏" lbl="ANKI · deck del sistema (SRS diario)" val={usmleAnkiDeck(dia.system, dia.matType)} sub="abre AnkiWeb ↗ · en Anki escritorio busca este deck exacto" color={Colors.teal} url={ANKIWEB} /></FadeUp>
      {dia.palm && (
        <FadeUp delay={180}><ColaItem icon="🧠" lbl="PALMERTON · al empezar el sistema" val={dia.palm.t} sub="YouTube · método + visión del sistema (abre en Chrome)" color={GREEN} url={yt(dia.palm.id)} /></FadeUp>
      )}
      <FadeUp delay={210}>
        <View style={[st.cola, { borderLeftColor: APEX }]}>
          <Text style={st.colaIcon}>🃏</Text>
          <View style={{ flex: 1 }}>
            <Text style={st.colaLbl}>APEX · 10:45–11:00 (cierre del DEEP PRIME) + CONSOLIDACIÓN 11:00 · nivel {dia.nivelUW}</Text>
            <Text style={st.colaVal}>{taper ? 'CERO tarjetas nuevas (taper) · solo Anki MADURO · luego ' : 'Crea ≤10 tarjetas de MECANISMO (patogenia→presentación) · luego '}{taper ? `${dia.qDia}Q flagged/incorrects ya vistos, sin bloque timed (nivel 5, taper ${dia.d === 95 ? 'D-2' : 'D-3'})` : dia.nivelUW === 1 ? '20Q en bloques de 5Q tutor del subtema (nivel 1)' : dia.nivelUW === 3 ? '20Q del sistema completo TIMED + 10Q tutor (nivel 3, viernes)' : viernesN4 ? '20-30Q TIMED MIXTOS de los sistemas ya dominados + 10Q tutor del subtema (nivel 4, viernes desde S11)' : dia.nivelUW === 2 ? '30Q en bloques de 5Q TIMED de subtemas validados (nivel 2)' : `${dia.qDia}Q en bloques timed mixtos (nivel ${dia.nivelUW})`}</Text>
            <Text style={st.colaSub}>Gate: ≥{USMLE_GATE.pct}% → mañana sube de nivel · &lt;{USMLE_GATE.pct}% → repetir 5Q del subtema fallado · 18:00 eval 10Q mixta timed (dosis de nivel 4) · registra todo en 📏 Medición</Text>
          </View>
        </View>
      </FadeUp>
    </View>
  );
}

/** 📏 Medición Palmerton del día: 3 números + tipo de error + gate ✓/✗ + export JSON (usmleScores). */
function MedicionCard({ dia }: { dia: DiaUSMLE }) {
  const hito = esHito(dia);
  const fase = faseDe(dia.d);
  const niv = nivelInfo(dia.nivelUW);
  const [pre, setPre] = useState('');
  const [con, setCon] = useState('');
  const [ev, setEv] = useState('');
  const [tipo, setTipo] = useState<TipoErrorUW | null>(null);
  const [notas, setNotas] = useState('');
  const [cam, setCam] = useState('');   // #11 respuestas cambiadas
  const [rel, setRel] = useState('');   // #11 relecturas
  const [nf, setNf] = useState('');     // #8 fallos totales
  const [nc, setNc] = useState('');     // #8 fallos en temas ya estudiados
  const [blq, setBlq] = useState<string[]>(['', '', '', '']); // #27 % por bloque del hito
  const [estado, setEstado] = useState<'idle' | 'saving' | 'ok' | 'local'>('idle');
  const [exp, setExp] = useState('');
  const str = (v: number | null | undefined) => (v != null ? String(v) : '');
  useEffect(() => {
    const s = scoreDe(loadScores(), dia.fecha);
    setPre(str(s?.pretest10)); setCon(str(s?.consol30pct)); setEv(str(s?.evalPct));
    setTipo(s?.tipoError ?? null);
    setNotas(s?.notas ?? '');
    setCam(str(s?.cambiadas)); setRel(str(s?.relecturas)); setNf(str(s?.nFallos)); setNc(str(s?.nConocidos));
    setBlq([0, 1, 2, 3].map((i) => str(s?.bloquesPct?.[i])));
    setEstado('idle'); setExp('');
  }, [dia.fecha]);
  const num = (t: string, max: number): number | null => {
    const v = t.trim(); if (!v) return null;
    const n = Number(v.replace(',', '.'));
    return isNaN(n) ? null : Math.max(0, Math.min(max, n));
  };
  const bloques = blq.map((b) => num(b, 100));
  const score: UsmleScore = {
    fecha: dia.fecha, d: dia.d, pretest10: num(pre, 10), consol30pct: num(con, 100), evalPct: num(ev, 100), tipoError: tipo, nivelUW: dia.nivelUW, notas, updatedAt: '',
    cambiadas: num(cam, 200), relecturas: num(rel, 200), nFallos: num(nf, 400), nConocidos: num(nc, 400), bloquesPct: bloques.some((b) => b != null) ? bloques : null,
  };
  const gate = gateDelDia(score, dia);
  const gateColor = gate.estado === 'sube' ? GREEN : gate.estado === 'repite' ? RED : gate.estado === 'lectura' ? Colors.gold : Colors.muted;
  // #8 regla del tercio sobre la semana (registros guardados + lo que hay en pantalla)
  const tercio = reglaDelTercio(loadScores().filter((x) => x.fecha !== dia.fecha).concat([score]), dia.fecha);
  const abogado = alarmaAbogado(score), circular = alarmaRelectura(score);
  const semCon = semaforoPct(score.consol30pct, 'consol'), semEv = semaforoPct(score.evalPct, 'eval');
  const semColor = (x: string) => x === 'verde' ? GREEN : x === 'ambar' ? Colors.gold : x === 'rojo' ? RED : Colors.muted;
  const pegarPlantilla = () => { const t = plantillaPorSistema(dia); if (!notas.includes('Reporte por sistema')) setNotas((n) => (n ? n + '\n\n' : '') + t); };
  const guardar = async () => {
    setEstado('saving');
    try { const r = await upsertScore(score); setEstado(r.supabase ? 'ok' : 'local'); } catch { setEstado('local'); }
  };
  const exportar = async () => {
    const json = exportScoresJSON();
    try {
      const nav = (globalThis as any).navigator;
      if (Platform.OS === 'web' && nav && nav.clipboard && nav.clipboard.writeText) { await nav.clipboard.writeText(json); setExp('✓ JSON copiado al portapapeles'); return; }
    } catch { /* cae al Share */ }
    try { await Share.share({ message: json, title: 'usmle-scores.json' }); setExp('✓ JSON compartido'); } catch { setExp('no se pudo exportar en este dispositivo'); }
  };
  const lblPre = fase === 'A' ? 'Pre-test 08:15 (aciertos /10)' : 'Stress set 05:00 (aciertos /10)';
  // #13: los viernes de nivel 3 el gate se mide SOLO sobre el bloque de 20Q del sistema timed (no sobre las 10Q tutor)
  const lblCon = hito ? 'Bloque timed extra (%) · opcional' : fase === 'A' ? (dia.nivelUW === 3 ? '20Q sistema TIMED (%) · solo ese bloque' : 'Consolidación 11:00 (%)') : 'Bloques timed del día (%)';
  const lblEv = hito ? `% del ${dia.uw}` : 'Eval 18:00 timed mixta (%)';
  return (
    <View style={[st.medCard, { borderColor: niv.color + '66' }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <Text style={st.medTitle}>📏 MEDICIÓN DEL DÍA</Text>
        <Chip label={`nivel ${dia.nivelUW} · ${niv.nombre}`} color={niv.color} small />
        <Chip label={`${dia.qDia}Q objetivo`} color={Colors.muted} small />
        {hito && <Chip label="HITO" color={Colors.gold} small />}
      </View>
      <Text style={st.medHint}>{hito ? `Día de hito: registra el % del ${dia.uw} en el campo eval. ${gate.detalle}.` : `Gate del día = ${gate.metrica} ≥ ${USMLE_GATE.pct}%. El % de UWorld es gate de proceso, no predicción (solo el NBME predice).`}</Text>
      <View style={st.medRow}>
        <View style={st.medField}><Text style={st.medLbl}>{lblPre}</Text><TextInput style={st.medInput} value={pre} onChangeText={setPre} keyboardType="numeric" placeholder="–" placeholderTextColor={Colors.muted} returnKeyType="done" /></View>
        <View style={st.medField}><Text style={st.medLbl}>{lblCon}</Text><TextInput style={st.medInput} value={con} onChangeText={setCon} keyboardType="numeric" placeholder="–" placeholderTextColor={Colors.muted} returnKeyType="done" /></View>
        <View style={st.medField}><Text style={st.medLbl}>{lblEv}</Text><TextInput style={st.medInput} value={ev} onChangeText={setEv} keyboardType="numeric" placeholder="–" placeholderTextColor={Colors.muted} returnKeyType="done" /></View>
      </View>
      <Text style={st.medLbl}>Tipo de error dominante (knowledge / transfer / proceso)</Text>
      <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
        {TIPOS_ERROR.map((t) => {
          const info = TIPO_ERROR_INFO[t]; const on = tipo === t;
          return (
            <TouchableOpacity key={t} activeOpacity={0.8} onPress={() => setTipo(on ? null : t)} style={[st.tipoChip, { borderColor: info.color + (on ? 'CC' : '55'), backgroundColor: on ? info.color + '26' : 'transparent' }]}>
              <Text style={[st.tipoChipTxt, { color: on ? info.color : Colors.muted }]}>{info.corto}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {tipo && <Text style={[st.medHint, { color: TIPO_ERROR_INFO[tipo].color }]}>{TIPO_ERROR_INFO[tipo].label}: {TIPO_ERROR_INFO[tipo].fix}</Text>}
      {tipo && <Text style={st.medHint}>🃏 Tarjeta (§4.4 · §6.2): {TIPO_ERROR_INFO[tipo].tarjeta}</Text>}
      {/* #11 §7.3-7.4 + #8 §6.1 · métricas del bloque */}
      <Text style={[st.medLbl, { marginTop: 8 }]}>Métricas del bloque (§7.3-7.4 · §6.1)</Text>
      <View style={st.medRow}>
        <View style={st.medField}><Text style={st.medLbl}>Resp. cambiadas</Text><TextInput style={[st.medInput, abogado && { borderColor: RED + 'AA' }]} value={cam} onChangeText={setCam} keyboardType="numeric" placeholder="–" placeholderTextColor={Colors.muted} returnKeyType="done" /></View>
        <View style={st.medField}><Text style={st.medLbl}>Relecturas (máx./Q)</Text><TextInput style={[st.medInput, circular && { borderColor: RED + 'AA' }]} value={rel} onChangeText={setRel} keyboardType="numeric" placeholder="–" placeholderTextColor={Colors.muted} returnKeyType="done" /></View>
        <View style={st.medField}><Text style={st.medLbl}>Fallos del día</Text><TextInput style={st.medInput} value={nf} onChangeText={setNf} keyboardType="numeric" placeholder="–" placeholderTextColor={Colors.muted} returnKeyType="done" /></View>
        <View style={st.medField}><Text style={st.medLbl}>…en temas YA estudiados</Text><TextInput style={[st.medInput, tercio.estado === 'ALARMA' && { borderColor: RED + 'AA' }]} value={nc} onChangeText={setNc} keyboardType="numeric" placeholder="–" placeholderTextColor={Colors.muted} returnKeyType="done" /></View>
      </View>
      {abogado && <Text style={[st.medHint, { color: RED }]}>⚖ ABOGADO: {score.cambiadas} respuestas cambiadas (≥2). Regla única §7.4: solo se cambia por error de lectura innegable; 60-70 % de los cambios van de correcta a incorrecta → mañana 18:00 stress set (sin tiempo para cambiar).</Text>}
      {circular && <Text style={[st.medHint, { color: RED }]}>🔁 LECTURA CIRCULAR: {score.relecturas} relecturas de una pregunta (§7.3). Causa nº1 = no dominar el material la 1ª vez; CCSN automático → diagnóstico en la primera lectura (&lt;60 s).</Text>}
      <Text style={[st.medHint, { color: tercio.estado === 'ALARMA' ? RED : tercio.estado === 'ok' ? GREEN : Colors.muted }]}>{tercio.label}{tercio.estado !== 'sin-dato' ? ` — ${tercio.detalle}` : ` (${tercio.detalle})`}</Text>
      {(score.consol30pct != null || score.evalPct != null) && <Text style={st.medHint}>Pisos ámbar (#21): consolidación <Text style={{ color: semColor(semCon), fontWeight: '800' }}>{semCon}</Text> (≥{PISO_AMBAR.consol} %) · eval <Text style={{ color: semColor(semEv), fontWeight: '800' }}>{semEv}</Text> (≥{PISO_AMBAR.eval} %) · gate de progresión = {USMLE_GATE.pct} %</Text>}
      {/* #27 · hito: % por bloque + plantilla del reporte por sistema */}
      {hito && (
        <View style={{ marginTop: 8 }}>
          <Text style={st.medLbl}>% por bloque del {dia.uw} (B1-B4 · §8.5 / §9.1)</Text>
          <View style={st.medRow}>
            {blq.map((b, i) => (
              <View key={i} style={[st.medField, { minWidth: 70 }]}><Text style={st.medLbl}>B{i + 1}</Text><TextInput style={st.medInput} value={b} onChangeText={(t) => setBlq((arr) => arr.map((x, k) => (k === i ? t : x)))} keyboardType="numeric" placeholder="–" placeholderTextColor={Colors.muted} returnKeyType="done" /></View>
            ))}
          </View>
          <TouchableOpacity activeOpacity={0.85} onPress={pegarPlantilla} style={[st.verBtn, { borderColor: Colors.gold + '88', alignSelf: 'flex-start' }]}><Text style={[st.verTxt, { color: Colors.gold }]}>📋 Pegar plantilla del reporte POR SISTEMA en notas</Text></TouchableOpacity>
          <Text style={st.medHint}>Lectura por sistema (§9.1): ≥80 % en lo ya estudiado; B1→B4 cayendo = fatiga/pánico (kit anti-pánico), no conocimiento. Qbankly = % bruto sin curva (A VERIFICAR · #24).</Text>
        </View>
      )}
      <TextInput style={st.medNotas} value={notas} onChangeText={setNotas} placeholder="Notas: shopping list (cada duda, también en aciertos), subtema a repetir, sensación del bloque… mañana se leen a las 07:15" placeholderTextColor={Colors.muted} multiline />
      <Temporizador />
      <View style={[st.gateBox, { borderColor: gateColor + '77', backgroundColor: gateColor + '14' }]}>
        <Text style={[st.gateTxt, { color: gateColor }]}>{gate.label}</Text>
        {gate.estado !== 'sin-dato' && <Text style={st.gateDet}>{gate.detalle}</Text>}
      </View>
      <View style={{ flexDirection: 'row', gap: 6, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <TouchableOpacity activeOpacity={0.85} onPress={guardar} style={[st.doneBtn, st.doneBtnOff, { flex: 1, marginTop: 0, minWidth: 160 }]}>
          <Text style={[st.doneBtnTxt, { color: GREEN }]}>{estado === 'saving' ? 'guardando…' : estado === 'ok' ? '✓ guardado (local + Supabase)' : estado === 'local' ? '✓ guardado en este dispositivo (Supabase sin respuesta)' : '💾 Guardar medición'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={exportar} style={[st.verBtn, { borderColor: Colors.gold + '88' }]}>
          <Text style={[st.verTxt, { color: Colors.gold }]}>⇪ Export JSON</Text>
        </TouchableOpacity>
      </View>
      {exp ? <Text style={st.medHint}>{exp}</Text> : null}
    </View>
  );
}

/** #10 · Temporizador §7.1/§7.5: 2:00 por pregunta (reiniciar en cada una) · 12:00 stress set 10Q · 60:00 bloque 40Q. setInterval, sin persistencia. */
function Temporizador() {
  const [total, setTotal] = useState(120);
  const [seg, setSeg] = useState(120);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!on) return;
    const id = setInterval(() => setSeg((x) => Math.max(0, x - 1)), 1000);
    return () => clearInterval(id);
  }, [on]);
  useEffect(() => { if (seg === 0 && on) setOn(false); }, [seg, on]);
  const preset = (n: number) => { setTotal(n); setSeg(n); setOn(false); };
  const mm = String(Math.floor(seg / 60)).padStart(2, '0'), ss = String(seg % 60).padStart(2, '0');
  const color = seg === 0 ? RED : seg <= 15 ? Colors.gold : GREEN;
  const presets: [number, string][] = [[120, '2:00 pregunta'], [720, '12:00 stress set'], [3600, '60:00 bloque 40Q']];
  return (
    <View style={st.timerBox}>
      <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <Text style={st.medLbl}>⏱ Temporizador (§7.1 · §7.5)</Text>
        {presets.map(([n, l]) => (
          <TouchableOpacity key={n} activeOpacity={0.8} onPress={() => preset(n)} style={[st.tipoChip, { borderColor: total === n ? GREEN + 'CC' : Hairline.medium, backgroundColor: total === n ? GREEN + '22' : 'transparent' }]}>
            <Text style={[st.tipoChipTxt, { color: total === n ? GREEN : Colors.muted }]}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6, flexWrap: 'wrap' }}>
        <Text style={[st.timerTxt, { color }]}>{mm}:{ss}</Text>
        <TouchableOpacity activeOpacity={0.85} onPress={() => { if (seg === 0) setSeg(total); setOn((o) => !o); }} style={[st.verBtn, { borderColor: GREEN + '88' }]}><Text style={[st.verTxt, { color: GREEN }]}>{on ? '❚❚ pausa' : '▶ iniciar'}</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={() => preset(total)} style={[st.verBtn, { borderColor: Hairline.medium }]}><Text style={[st.verTxt, { color: Colors.muted }]}>↺ reiniciar</Text></TouchableOpacity>
        <Text style={[st.colaSub, { flex: 1 }]}>{seg === 0 ? '⏰ se acabó: adivina, marca (flag) y avanza — nunca >2 min en una pregunta' : 'reinicia en cada pregunta (90 s + 30 % = tope de 2 min)'}</Text>
      </View>
    </View>
  );
}

function HorarioView({ dia }: { dia: DiaUSMLE }) {
  const prev = diaPrevio(dia); // #6: último día de contenido (salta hitos)
  const detalle = (tipo: string): string => {
    if (tipo === 'eval') return prev ? `${prev.system} → ${prev.sub}` : 'no hay día previo';
    if (tipo === 'pretest') return `${dia.system} → ${dia.uw}`;
    if (tipo === 'read') return `${dia.bbCh}: ${dia.bbVid} · ${dia.mat}`;
    return '';
  };
  return (
    <View>
      <Text style={st.secLbl}>🕓 Bloque USMLE · Día {dia.d} ({fmtFecha(dia.fecha)}) · hora Lima</Text>
      {FRANJAS.map((f, i) => {
        const det = detalle(f.tipo);
        return (
          <FadeUp key={i} delay={i * 25}>
            <View style={st.franja}>
              <View style={st.franjaHora}><Text style={st.franjaHoraTxt}>{f.hora}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={st.franjaFase}>{f.fase}</Text>
                {det ? <Text style={st.franjaDet}>↳ {det}</Text> : null}
                {f.nivel && f.nivel !== '—' ? <Text style={st.franjaNivel}>🎚️ nivel UW {f.nivel}{f.gate && f.gate !== '—' ? ` · gate: ${f.gate}` : ''}</Text> : null}
                {f.hora.startsWith('11:00') && dia.franjaNota ? <Text style={[st.franjaDet, { color: esDiaTaper(dia) ? RED : Colors.gold }]}>↳ HOY: {dia.franjaNota}</Text> : null}
                {f.hora.startsWith('07:15') && esDiaDermaStep1(dia) ? <Text style={[st.franjaDet, { color: Colors.gold }]}>↳ HOY (cuenta doble Derma): {DERMA_STEP1_QUERY} + fallos del ledger derma</Text> : null}
                {(FRANJAS_REGLAS[i] || []).map((r, k) => <Text key={k} style={st.franjaRegla}>⚙ {r}</Text>)}
              </View>
            </View>
          </FadeUp>
        );
      })}
      <Text style={st.note}>05:00 Anki AM · 07:15 repaso anclado · 08:15 pre-test 10Q · 09:00 DEEP PRIME 2h · 11:00 consolidación por nivel · 18:00 eval modo examen (6h15/día). Todo en inglés. Sáb/dom libres. Hoy: nivel UW {dia.nivelUW} ({nivelInfo(dia.nivelUW).nombre}) · {dia.qDia}Q objetivo. {DAILY_META.metodo}</Text>
    </View>
  );
}

function SieteView({ fromD, onPick }: { fromD: number; onPick: (d: number) => void }) {
  const win = ventana7d(fromD);
  return (
    <View>
      <Text style={st.secLbl}>📆 Próximos 7 días · toca un día para abrirlo</Text>
      {win.map((x, i) => {
        const tier = TIER_INFO[x.tier];
        return (
          <FadeUp key={x.d} delay={i * 30}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPick(x.d)} style={[st.d7, { borderLeftColor: tier.c }]}>
              <Text style={[st.d7day, { color: tier.c }]}>D{x.d}</Text>
              <Text style={st.d7fecha}>{fmtFecha(x.fecha)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={st.d7sub} numberOfLines={1}>{x.sub}</Text>
                <Text style={st.d7sys}>{x.system}</Text>
              </View>
              <Text style={st.d7go}>→</Text>
            </TouchableOpacity>
          </FadeUp>
        );
      })}
    </View>
  );
}

/** Barra de progreso simple (track + fill por %). */
function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <View style={st.barTrack}>
      <View style={[st.barFill, { width: (`${Math.max(0, Math.min(100, pct))}%` as any), backgroundColor: color }]} />
    </View>
  );
}

function SistemaCard({ g, hoyD, onPick, done, onToggle }: { g: GrupoProgreso<DiaUSMLE>; hoyD: number; onPick: (d: number) => void; done: Set<number>; onToggle: (d: number) => void }) {
  const [open, setOpen] = useState(g.estado === 'en-curso');
  const tier = TIER_INFO[g.dias[0].tier];
  const estadoTxt = g.estado === 'completado' ? '✓ completado' : g.estado === 'en-curso' ? `en curso · ${g.pct}%` : `pendiente · empieza D${g.primerD}`;
  const estadoColor = g.estado === 'completado' ? GREEN : g.estado === 'en-curso' ? tier.c : Colors.muted;
  return (
    <View style={[st.sysCard, { borderColor: tier.c + (g.estado === 'en-curso' ? '88' : '2E') }]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
        <View style={st.sysHead}>
          <Text style={st.sysTitle} numberOfLines={1}>{open ? '▾' : '▸'} {g.clave}</Text>
          <Text style={[st.sysCount, { color: estadoColor }]}>{g.hechos}/{g.total}</Text>
        </View>
        <ProgressBar pct={g.pct} color={tier.c} />
        <Text style={[st.sysEstado, { color: estadoColor }]}>
          {estadoTxt}{g.diaActual ? ` · hoy: ${g.diaActual.sub}` : ''}
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => openEdge(QBQ)} style={st.edgeBtnWide}><Text style={st.edgeTxt}>◆ Temario en Qbankly (Edge)</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(QBQ)} style={[st.verBtn, { borderColor: tier.c + '88' }]}><Text style={[st.verTxt, { color: tier.c }]}>Chrome ↗</Text></TouchableOpacity>
      </View>
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
                  <Text style={st.temaRowTxt} numberOfLines={1}>{x.sub}</Text>
                  <Text style={st.temaRowGo}>→</Text>
                </TouchableOpacity>
                {usmleObsUrl(x.d) && (
                  <TouchableOpacity activeOpacity={0.7} onPress={() => openUrl(usmleObsUrl(x.d)!)} hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}>
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
  const grupos = agruparProgreso(DIAS, (x) => x.system, hoyD, done);
  const glob = progresoGlobal(DIAS, done);
  return (
    <View>
      <View style={st.globCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <Text style={st.globTitle}>🗂️ Temario Step 1 · progreso del plan</Text>
          <Text style={[st.globPct, { color: GREEN }]}>{glob.pct}%</Text>
        </View>
        <ProgressBar pct={glob.pct} color={GREEN} />
        <Text style={st.globSub}>{glob.hechos}/{glob.total} subtemas · hoy = Día {hoyD} de {glob.total} · {grupos.length} sistemas</Text>
      </View>
      {grupos.map((g) => <SistemaCard key={g.clave} g={g} hoyD={hoyD} onPick={onPick} done={done} onToggle={onToggle} />)}
      <Text style={st.note}>Progreso REAL: empezamos en 0%. ☑ marca un subtema como completado (se guarda en este dispositivo). ▶ = día de hoy. Toca el título de un subtema para ir a ese día.</Text>
    </View>
  );
}

export default function UsmleTodayPlan() {
  const iso = todayISO();
  const hoyD = planHoyD(DIAS, iso);
  const todayDia = diaDe(iso) || DIAS.find((x) => x.d === hoyD) || DIAS[0];
  const [sel, setSel] = useState<number>(todayDia.d);
  const [view, setView] = useState<'hoy' | 'horario' | '7d' | 'temario'>('hoy');
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone('usmle')));
  const dia = DIAS.find((x) => x.d === sel) || DIAS[0];
  const esHoy = dia.fecha === iso;
  const pickDay = (d: number) => { setSel(d); setView('hoy'); };
  const toggleDone = (d: number) => setDone((prev) => {
    const n = new Set(prev);
    if (n.has(d)) n.delete(d); else n.add(d);
    saveDone('usmle', Array.from(n));
    return n;
  });

  return (
    <View>
      {/* Botones grandes Step 1 / 2 / 3 */}
      <View style={st.stepRow}>
        <View style={[st.stepBtn, st.stepActive]}>
          <Text style={st.stepBig}>STEP 1</Text>
          <Text style={st.stepSub}>BLOQUE PRINCIPAL · 6h15/día · examen lun 8-feb-2027 (v5.15)</Text>
        </View>
        <View style={[st.stepBtn, st.stepStep2]}>
          <Text style={[st.stepBig, { color: Colors.champagne }]}>STEP 2 CK</Text>
          <Text style={st.stepSub}>bancos + HY en pestaña ◈ Readiness</Text>
        </View>
        <View style={[st.stepBtn, st.stepSoon]}>
          <Text style={[st.stepBig, { color: Colors.muted }]}>STEP 3</Text>
          <Text style={st.stepSub}>próximamente</Text>
        </View>
      </View>

      {/* Navegación de día */}
      <View style={st.navRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.max(1, s - 1))} style={st.navArrow}><Text style={st.navArrowTxt}>◄</Text></TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={st.navDay}>Día {dia.d}/{DAILY_META.totalDias}{esHoy ? ' · HOY' : ''}</Text>
          <Text style={st.navFecha}>{fmtFecha(dia.fecha)} · {dia.fecha}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSel((s) => Math.min(DAILY_META.totalDias, s + 1))} style={st.navArrow}><Text style={st.navArrowTxt}>►</Text></TouchableOpacity>
      </View>
      {!esHoy && <TouchableOpacity activeOpacity={0.8} onPress={() => setSel(todayDia.d)} style={st.hoyBtn}><Text style={st.hoyBtnTxt}>↩ volver a HOY</Text></TouchableOpacity>}

      {/* Sub-pestañas */}
      <View style={st.subTabs}>
        {([['hoy', '📋 HOY'], ['horario', '🕓 Horario'], ['7d', '📆 7 días'], ['temario', '🗂️ Temario']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setView(k)} style={[st.subTab, view === k && st.subTabOn]}>
            <Text style={[st.subTabTxt, view === k && { color: GREEN }]}>{lbl}</Text>
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
const WEB_LINK = { cursor: 'pointer', transition: Motion.base } as any;
const st = StyleSheet.create({
  stepRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  stepBtn: { flex: 1, borderRadius: BorderRadius.lg, borderWidth: 1, paddingVertical: Spacing.md, alignItems: 'center' },
  stepActive: { backgroundColor: GREEN + '1A', borderColor: GREEN + '88', ...Elevation.glow(GREEN) },
  stepSoon: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: Hairline.medium },
  stepStep2: { backgroundColor: Colors.gold + '12', borderColor: Colors.gold + '3A' },
  stepBig: { fontSize: FontSize.titleMd, fontWeight: '900', color: GREEN, letterSpacing: 0.4 },
  stepSub: { fontSize: 9, color: Colors.muted, marginTop: 3, letterSpacing: 0.2 },

  navRow: { flexDirection: 'row', alignItems: 'center', ...cardBase, padding: Spacing.sm, marginBottom: Spacing.xs },
  navArrow: { width: 40, height: 40, borderRadius: BorderRadius.md, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: Hairline.soft, alignItems: 'center', justifyContent: 'center', ...WEB_LINK },
  navArrowTxt: { fontSize: 16, color: GREEN, fontWeight: '800' },
  navDay: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.3 },
  navFecha: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2, letterSpacing: 0.2 },
  hoyBtn: { alignSelf: 'center', marginBottom: Spacing.sm, ...WEB_LINK },
  hoyBtnTxt: { fontSize: FontSize.labelSm, color: GREEN, fontWeight: '700', letterSpacing: 0.2 },

  subTabs: { flexDirection: 'row', gap: 6, marginBottom: Spacing.sm },
  subTab: { flex: 1, paddingVertical: 8, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, alignItems: 'center', ...WEB_LINK },
  subTabOn: { backgroundColor: GREEN + '14', borderColor: GREEN + '55' },
  subTabTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted, letterSpacing: 0.2 },

  temaCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm, ...Elevation.md },
  temaTop: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  sysBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 11, ...WEB_LINK },
  sysBadgeTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },
  temaTitle: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, marginTop: 9, lineHeight: 22, letterSpacing: -0.3 },
  temaSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, lineHeight: LineHeight.labelSm },
  doneBtn: { marginTop: 11, paddingVertical: 10, borderRadius: BorderRadius.md, borderWidth: 1, alignItems: 'center', ...WEB_LINK },
  doneBtnOff: { backgroundColor: GREEN + '14', borderColor: GREEN + '66' },
  doneBtnOn: { backgroundColor: GREEN, borderColor: GREEN, ...Elevation.glow(GREEN) },
  doneBtnTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },

  anchor: { ...cardBase, borderLeftWidth: 3, borderLeftColor: READ, padding: Spacing.md, marginBottom: Spacing.sm },
  anchorLbl: { fontSize: FontSize.labelMd, fontWeight: '800', color: READ, letterSpacing: 0.2 },
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
  edgeBtn: { backgroundColor: EDGE + '22', borderWidth: 1, borderColor: EDGE + '99', borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 11, alignItems: 'center', ...WEB_LINK },
  edgeBtnWide: { flex: 1, backgroundColor: EDGE + '22', borderWidth: 1, borderColor: EDGE + '99', borderRadius: BorderRadius.md, paddingVertical: 8, paddingHorizontal: 11, alignItems: 'center', ...WEB_LINK },
  edgeTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: EDGE, letterSpacing: 0.2 },

  franja: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 8, borderTopWidth: 1, borderTopColor: Hairline.soft },
  franjaHora: { backgroundColor: GREEN + '14', borderRadius: BorderRadius.sm, paddingVertical: 4, paddingHorizontal: 8, minWidth: 96, alignItems: 'center' },
  franjaHoraTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: GREEN, letterSpacing: 0.2 },
  franjaFase: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17 },
  franjaDet: { fontSize: FontSize.labelSm, color: GREEN, marginTop: 3, fontWeight: '600' },
  franjaNivel: { fontSize: 10, color: Colors.champagne, marginTop: 3, lineHeight: 14 },
  franjaRegla: { fontSize: 10, color: Colors.muted, marginTop: 3, lineHeight: 14 },
  parcialBtn: { marginTop: 6, paddingVertical: 7, paddingHorizontal: 10, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, alignItems: 'center', ...WEB_LINK },
  parcialTxt: { fontSize: 10, fontWeight: '700', letterSpacing: 0.2, textAlign: 'center' },
  shopBox: { marginTop: 8, borderWidth: 1, borderColor: APEX + '44', backgroundColor: APEX + '0D', borderRadius: BorderRadius.md, padding: Spacing.sm },
  timerBox: { marginTop: 8, borderWidth: 1, borderColor: Hairline.soft, borderRadius: BorderRadius.md, padding: Spacing.sm },
  timerTxt: { fontSize: 22, fontWeight: '900', letterSpacing: 1, minWidth: 70 },

  // 📏 Medición Palmerton
  medCard: { ...cardBase, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm },
  medTitle: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: 0.4 },
  medHint: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 5, lineHeight: LineHeight.labelSm },
  medRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 8, marginBottom: 8 },
  medField: { flex: 1, minWidth: 120 },
  medLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4 },
  medInput: { height: 36, backgroundColor: Colors.surfaceContainerHighest, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, color: Colors.onSurface, textAlign: 'center', fontSize: FontSize.bodyMd, fontWeight: '800', paddingVertical: 0, ...(Platform.OS === 'web' ? { outlineStyle: 'none' as any } : {}) },
  medNotas: { marginTop: 8, minHeight: 40, backgroundColor: Colors.surfaceContainerHighest, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.medium, color: Colors.onSurface, fontSize: FontSize.labelMd, paddingHorizontal: 10, paddingVertical: 8, ...(Platform.OS === 'web' ? { outlineStyle: 'none' as any } : {}) },
  tipoChip: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 11, ...WEB_LINK },
  tipoChipTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  gateBox: { marginTop: 10, borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.sm },
  gateTxt: { fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: 0.2 },
  gateDet: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 3, lineHeight: LineHeight.labelSm },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: LineHeight.labelSm },

  d7: { ...cardBase, borderLeftWidth: 3, flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.sm, marginBottom: 5, ...WEB_LINK },
  d7day: { fontSize: FontSize.labelLg, fontWeight: '800', width: 36, letterSpacing: -0.2 },
  d7fecha: { fontSize: FontSize.labelSm, color: Colors.muted, width: 56 },
  d7sub: { fontSize: FontSize.labelMd, color: Colors.onSurface, fontWeight: '600' },
  d7sys: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  d7go: { fontSize: 16, color: GREEN, fontWeight: '800', width: 18, textAlign: 'center' },

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
  sysCount: { fontSize: FontSize.labelMd, fontWeight: '800', marginLeft: 8 },
  sysEstado: { fontSize: FontSize.labelSm, fontWeight: '700', marginTop: 6, letterSpacing: 0.2 },
  temaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 7, paddingHorizontal: 6, borderRadius: BorderRadius.sm, borderTopWidth: 1, borderTopColor: Hairline.soft, ...WEB_LINK },
  temaRowOn: { backgroundColor: GREEN + '12' },
  temaRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  temaChk: { fontSize: 16, width: 22, textAlign: 'center' },
  temaRowD: { fontSize: FontSize.labelSm, fontWeight: '800', width: 40 },
  temaRowTxt: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  temaRowGo: { fontSize: 14, color: Colors.muted, width: 16, textAlign: 'center' },
});
