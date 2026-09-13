import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { desktopStyles, DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, gridStyle, gridItemStyle } from '../empresa/primitives';
import { RingStat, MegaStat, FadeUp, CommandBackdrop } from '../empresa/visuals';
import { diaEstudioTipo } from '../../lib/researchData';
import {
  DERMA_META, DERMA_BLOQUES, DERMA_RECURSOS, DERMA_FASES, DERMA_HORARIO, DERMA_NOTAS, DERMA_SPEC_TO_PLAN,
  PRIORIDAD_COLOR, DermaAtlas, SKIN_TONES, SkinTone, DERMA_GAP_MODULOS, DERMA_NOTEBOOKLM,
} from '../../lib/dermaData';
import {
  DERMA_DIAS, DERMA_PROMIR_DIAS, DERMA_DAILY_META, DERMA_FRANJAS, DERMA_CHECKPOINTS, DERMA_CHECKPOINT_DIAS_V3,
  DERMA_STEP1_DIAS, DERMA_TAPER_DIAS, DERMA_DRILL_DIAS_V3, DERMA_TAPER_ENCAPS_FECHA, dermaDNuevo,
  type DermaBloqueKey, type DermaAreaCORE,
} from '../../lib/dermaDailyPlan';
import {
  DERMA_DIAS_TODOS, DERMA_CICLO2_META, DERMA_CICLO2_CHECKPOINTS, DERMA_CICLO2_GPLUS_DIAS, DERMA_CICLO2_DRILL_DIAS, dermaDiaPorD,
} from '../../lib/dermaCiclo2';
import { dermaPctCiego, dermaPctFalloPorModulo, DERMA_AREAS, DERMA_MODULO_POR_BLOQUE, type DermaStat } from '../../lib/dermaLedger';
import { DERMA_CEREBRO, type DermaCerebroFicha } from '../../lib/dermaCerebro';
import { loadDone, agruparProgreso, planHoyD } from '../../lib/studyProgress';
import DermaTodayPlan from './DermaTodayPlan';
import DermaWeaknessWidget from '../derma/DermaWeaknessWidget';
import DermaCerebroCard from '../derma/DermaCerebroCard';
import { useDermaLedger, dermaCopiar, DERMA_AREA_LABEL, DERMA_AREA_COLOR } from '../derma/dermaLedgerBus';
import AIFirstPanel from './AIFirstPanel';
import SkinToneToggle from '../derma/SkinToneToggle';
import DermaBodyMap from '../derma/DermaBodyMap';
import DermaMorphologyFilter, { DermaFilters } from '../derma/DermaMorphologyFilter';
import DermaDermoscopyKey from '../derma/DermaDermoscopyKey';
import DermaLineIcon from '../derma/DermaLineIcons';
import { HeroBackdrop } from '../HeroBackdrop';
import {
  DERMA_LIBROS_ESTETICA, DERMA_VIDEOS, DERMA_QBANKS_ACCESS, DERMA_CASES_ACCESS,
  DERMA_QBANKLY_RESUMEN, srcBook, srcCap, srcMm, srcQa, srcCases,
} from '../../lib/dermaSourcesData';

/**
 * DermaHub — sección Derma (referente clínico → Mayo): pestaña HOY = plan día-a-día REAL (PLAN ÉLITE v3: 73 átomos del
 * ciclo 1 + 30 del ciclo 2, 3 fuentes con links verificados, ◆ Edge para Qbankly, progreso 0%→) + Atlas + Dermatoscopia +
 * Fuentes + Debilidades (ledger) + CEREBRO CLÍNICO.
 *
 * Pestaña Cerebro (12-sep-2026, gaps v3b derma nº 7): SOLO datos vivos — % ciego real global y por módulo CORE (ledger),
 * progreso por bloque A–X del plan (studyProgress 'derma'), próximos hitos con las fechas v5.10 leídas del plan
 * (taper Step 1, checkpoints cp1/cp2/repaso1/repaso2, drills HDPH, ciclo 2), el ciclo real de 45′ (DERMA_FRANJAS) y el
 * mapa del SPEC A–G como ÍNDICE hacia las fichas de 7 pasos (dermaCerebro.ts) y hacia el día del plan (salto a HOY).
 * DERMA_FASES / DERMA_HORARIO (junio, v1) y el RingStat «12 semanas» ya no se muestran como verdad: quedan en un bloque
 * plegado «histórico v1» que no alimenta ningún cálculo. Interdiario con Research. Reutilizado mobile y desktop.
 */

const PURPLE = DERMA_META.accent; // amatista #9A7BC8
const GOLD = DermaAtlas.gold;
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }


/** Hoy en ISO (hora local Lima) — misma regla que DermaTodayPlan. */
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return DERMA_DAILY_META.inicio; }
}
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
function fmtFecha(iso: string): string {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  try { const d = new Date(iso + 'T12:00:00'); return `${dias[d.getDay()]} ${Number(iso.slice(8, 10))}-${MESES[d.getMonth()]}-${iso.slice(0, 4)}`; } catch { return iso; }
}
/** Fecha v5.10 de un d (ciclo 1 o 2) leída del plan; '' si no existe. */
const fechaDeD = (d: number | undefined): string => (d ? dermaDiaPorD(d)?.fecha ?? '' : '');
/**
 * Ficha del cerebro clínico → d de la v3. dermaCerebro.ts (fichero del agente de datos) sigue keyed por el d de la v2.1 en las
 * 22 fichas desplazadas por el taper (d44 → d50, d47-d68 → d53-d71, d66 → d46): misma sentinela que DermaTodayPlan.
 */
const CEREBRO_REANCLADO_V3 = DERMA_CEREBRO.some((f) => f.id === 'G-44-cicatrizacion' && f.d === 50);
const fichaD = (f: DermaCerebroFicha): number => (CEREBRO_REANCLADO_V3 ? f.d : dermaDNuevo(f.d));

type Sub = 'hoy' | 'atlas' | 'dermatoscopia' | 'fuentes' | 'debilidades' | 'cerebro';

/** Prompts de uso del cuaderno NotebookLM "DERMA · Élite Engine" (motor de verificación, NO fuente). */
const NBLM_PROMPTS: Array<{ cuando: string; t: string; p: string }> = [
  { cuando: 'cierre 14:13 · cada sesión', t: 'Tarjeta de MECANISMO verificada', p: 'Con las fuentes del cuaderno, dame la tarjeta de MECANISMO verificada del caso de hoy [dx / átomo dNN]. Formato: FRENTE "¿por qué…?" → POR QUÉ (cascada tejido/fisiología) · CCSN (con qué se confunde + el rasgo discriminador) · FUENTE (cita exacta del cuaderno). Marca "A VERIFICAR" toda dosis, concentración o cifra que no esté literalmente en las fuentes.' },
  { cuando: `checkpoints: cp1 d${DERMA_CHECKPOINTS.cp1} (${fmtFecha(fechaDeD(DERMA_CHECKPOINTS.cp1))}) · repaso1 d${DERMA_CHECKPOINTS.repaso1} (${fmtFecha(fechaDeD(DERMA_CHECKPOINTS.repaso1))}) · ciclo 2 d${DERMA_CICLO2_CHECKPOINTS.cp1}/d${DERMA_CICLO2_CHECKPOINTS.cp2}/d${DERMA_CICLO2_CHECKPOINTS.repaso2}`, t: 'Qué no sé del módulo X', p: 'Con las fuentes del cuaderno y esta lista de mis fallos del ledger [pegar export JSON: por_modulo + tipos de error], dime qué NO sé del módulo CORE [Med/Path/Peds/Surg]: los 10 conceptos/mecanismos con más probabilidad de fallo, cada uno con su rasgo discriminador y la fuente exacta. Sin adular; ordena por impacto en el examen CORE.' },
];

/** Pestaña DEBILIDADES — el ledger (dermaLedger.ts) leído como mapa: % ciego, % fallo por módulo CORE y por bloque A-X, tipo de error, gate A, 2ª pasada, export JSON. */
function DebilidadesView() {
  return (
    <View>
      <SectionLabel>Debilidades por módulo CORE · % ciego REAL desde el ledger (alimenta los checkpoints {DERMA_CHECKPOINT_DIAS_V3.map((d) => `d${d}`).join(' · ')} y los del ciclo 2 d{DERMA_CICLO2_CHECKPOINTS.cp1} · d{DERMA_CICLO2_CHECKPOINTS.cp2} · d{DERMA_CICLO2_CHECKPOINTS.repaso2})</SectionLabel>
      <Text style={fst.note}>Cada caso ciego (✓/✗ en la lámina de Hoy), cada pregunta fallada del banco, la imagen dermatoscópica y el drill HDPH escriben aquí. Solo los aciertos "Lo sabía" cuentan para el % ciego; "acerté por suerte" cuenta como fallo (Palmerton). Exporta el JSON cada viernes → DATA/DERMATOLOGIA/TRACKING/_registro_derma.json.</Text>
      <View style={{ marginTop: Spacing.md, marginBottom: Spacing.xl }}>
        <DermaWeaknessWidget accent={PURPLE} />
      </View>
    </View>
  );
}

/** Pestaña FUENTES — biblioteca REAL extraída y verificada (links 200 en vivo). */
function FuentesView() {
  const EDGE = DermaAtlas.edge;
  const openEdge = (u: string) => Linking.openURL('microsoft-edge:' + u).catch(() => openUrl(u));
  const [nblmMsg, setNblmMsg] = useState('');
  return (
    <View>
      {/* Las 3 fuentes + el motor de verificación */}
      <SectionLabel>Las 3 fuentes · data extraída y verificada en vivo (10-jun-2026) + cuaderno NotebookLM (05-sep-2026)</SectionLabel>
      <View style={[gridStyle(250), { marginBottom: Spacing.md }]}>
        {[
          { ic: 'atlas' as const, t: 'AccessDermatologyDxRx', sub: '36 libros · 1.301 preguntas · 300 casos · 180 vídeos · sesión UF', url: 'https://dermatology.mhmedical.com/index.aspx', c: PURPLE },
          { ic: 'flask' as const, t: 'Qbankly (⚠ SOLO Edge)', sub: 'derma: S1 488 Q · S2 CK 534 Q · S3 263 Q · 136 flashcards', url: 'https://qbankly.app/qbanks', c: EDGE, edge: true },
          { ic: 'body' as const, t: 'ProMIR · Dermatología', sub: `11 capítulos · resumen 3:18:11 · Masterclass melanoma 1:39:10 · 10Q del test del capítulo en ${DERMA_PROMIR_DIAS.length} sesiones Derma (1 de cada 3) → log MIR`, url: 'https://promir.medicapanamericana.com/capitulo/62836950c0f8415ab9efb5c7', c: DermaAtlas.promir },
          { ic: 'skinLayers' as const, t: 'NotebookLM · DERMA · Élite Engine', sub: 'cuaderno con las fuentes OA verificadas (PubMed de referentes.md/PLAN_ELITE, DermNet CME 18 módulos + terminología, Dermoscopedia, ABD CORE/APPLIED, ISSVA, AAD, rutas de fellowship) · motor de VERIFICACIÓN de tarjetas, no sustituye la fuente', url: DERMA_NOTEBOOKLM.url, c: GOLD },
        ].map((f, i) => (
          <View key={i} style={gridItemStyle(250)}>
            <FadeUp delay={i * 50}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => (f as any).edge ? openEdge(f.url) : openUrl(f.url)} style={[fst.srcCard, { borderLeftColor: f.c }]}>
                <DermaLineIcon name={f.ic} size={22} color={f.c} />
                <Text style={fst.srcT}>{f.t}</Text>
                <Text style={fst.srcSub}>{f.sub}</Text>
                <Text style={[fst.srcGo, { color: f.c }]}>{(f as any).edge ? '◆ abrir en Edge' : 'abrir ↗'}</Text>
              </TouchableOpacity>
            </FadeUp>
          </View>
        ))}
      </View>

      {/* Prompts de uso del cuaderno (regla: motor de verificación, no fuente) */}
      <GlassPanel accent={GOLD} style={{ marginBottom: Spacing.lg, padding: Spacing.md }}>
        <Text style={fst.nblmTitle}>NotebookLM "DERMA · Élite Engine" · 2 prompts de uso · id {DERMA_NOTEBOOKLM.id.slice(0, 8)}…</Text>
        {NBLM_PROMPTS.map((p, i) => (
          <View key={i} style={[fst.nblmRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={{ flex: 1 }}>
              <Text style={fst.nblmWhen}>{p.cuando}</Text>
              <Text style={fst.nblmT}>{p.t}</Text>
              <Text style={fst.nblmP} numberOfLines={4}>{p.p}</Text>
            </View>
            <View style={{ gap: 5 }}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => { const ok = dermaCopiar(p.p); setNblmMsg(ok ? `✓ prompt "${p.t}" copiado` : 'sin portapapeles en esta plataforma'); }} style={[fst.nblmBtn, { borderColor: GOLD + '88' }]}><Text style={[fst.nblmBtnTxt, { color: GOLD }]}>copiar</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(DERMA_NOTEBOOKLM.url)} style={[fst.nblmBtn, { borderColor: GOLD + '88', backgroundColor: GOLD + '1A' }]}><Text style={[fst.nblmBtnTxt, { color: GOLD }]}>abrir ↗</Text></TouchableOpacity>
            </View>
          </View>
        ))}
        <Text style={fst.note}>Regla de honestidad: el cuaderno verifica contra fuente; toda dosis/cifra que no esté literal en las fuentes va como "A VERIFICAR". {nblmMsg ? `· ${nblmMsg}` : ''}</Text>
      </GlassPanel>

      {/* Q-banks + casos de Access */}
      <SectionLabel>Preguntas y casos (AccessDerma · conteos reales)</SectionLabel>
      <View style={[gridStyle(250), { marginBottom: Spacing.lg }]}>
        {DERMA_QBANKS_ACCESS.map((q, i) => (
          <View key={q.resourceid} style={gridItemStyle(250)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(srcQa(q.resourceid))} style={[fst.qRow, { borderLeftColor: PURPLE }]}>
              <Text style={fst.qN}>{q.preguntas}Q</Text>
              <Text style={fst.qT} numberOfLines={2}>{q.nombre} ↗</Text>
            </TouchableOpacity>
          </View>
        ))}
        {DERMA_CASES_ACCESS.map((c) => (
          <View key={c.groupid} style={gridItemStyle(250)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(srcCases(c.groupid))} style={[fst.qRow, { borderLeftColor: DermaAtlas.teal }]}>
              <View style={{ width: 26, alignItems: 'center' }}><DermaLineIcon name="body" size={16} color={DermaAtlas.teal} /></View>
              <Text style={fst.qT} numberOfLines={2}>{c.nombre} ↗</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Qbankly por step */}
      <SectionLabel>Qbankly · derma por step (◆ Edge)</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.lg, padding: Spacing.md }}>
        {DERMA_QBANKLY_RESUMEN.map((s, i) => (
          <TouchableOpacity key={i} activeOpacity={0.85} onPress={() => openEdge('https://qbankly.app/qbanks')} style={[fst.stepRow, i === 0 && { borderTopWidth: 0 }]}>
            <Text style={[fst.stepName, { color: EDGE }]}>{s.step}</Text>
            <Text style={fst.stepDet} numberOfLines={1}>{s.detalle}</Text>
            <Text style={fst.stepQ}>{s.q} Q ◆</Text>
          </TouchableOpacity>
        ))}
      </GlassPanel>

      {/* Vídeos */}
      <SectionLabel>Vídeos AccessDerma · 180 con título verificado</SectionLabel>
      <View style={[gridStyle(220), { marginBottom: Spacing.lg }]}>
        {DERMA_VIDEOS.map((v, i) => (
          <View key={v.nombre} style={gridItemStyle(220)}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(v.hash ? srcMm(v.hash) : 'https://dermatology.mhmedical.com/multimedia.aspx')} style={fst.vidRow}>
              <Text style={fst.vidN}>{v.n}</Text>
              <Text style={fst.vidT} numberOfLines={2}>{v.nombre} ↗</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Biblioteca estética: 16 libros con capítulos ⭐ */}
      <SectionLabel>Biblioteca estética · 16 libros (740 capítulos con deep-link)</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {DERMA_LIBROS_ESTETICA.map((b, i) => (
          <FadeUp key={b.id} delay={Math.min(i * 25, 200)}>
            <View style={fst.libCard}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(srcBook(b.id))} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <DermaLineIcon name="atlas" size={16} color={PURPLE} />
                <Text style={fst.libT} numberOfLines={1}>{b.t} ↗</Text>
                <Chip label={`${b.caps} caps`} color={PURPLE} small />
              </TouchableOpacity>
              {b.star.length > 0 && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {b.star.map((s) => (
                    <TouchableOpacity key={s.sid} activeOpacity={0.8} onPress={() => openUrl(srcCap(b.id, s.sid))} style={fst.starChip}>
                      <Text style={fst.starTxt} numberOfLines={1}>◆ {s.t} ↗</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </FadeUp>
        ))}
        <Text style={fst.note}>Todos los links verificados en vivo (HTTP 200 + título correcto) con la sesión UF Remote Access · TOCs completos en DATA/DERMATOLOGIA/_scrape/.</Text>
      </View>
    </View>
  );
}

const WEB_LINK = { cursor: 'pointer', transition: Motion.base } as any;

const fst = StyleSheet.create({
  srcCard: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: Hairline.soft, borderLeftWidth: 3, padding: Spacing.lg, minHeight: 132, ...Elevation.sm, ...WEB_LINK },
  srcT: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, marginTop: 8, letterSpacing: -0.2 },
  srcSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 5, lineHeight: LineHeight.labelSm },
  srcGo: { fontSize: FontSize.labelSm, fontWeight: '800', marginTop: 10, letterSpacing: 0.2 },
  qRow: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, borderLeftWidth: 3, padding: Spacing.md, flexDirection: 'row', alignItems: 'center', gap: 10, ...Elevation.sm, ...WEB_LINK },
  qN: { fontSize: FontSize.bodyMd, fontWeight: '900', color: PURPLE, minWidth: 44, letterSpacing: -0.3 },
  qT: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 9, borderTopWidth: 1, borderTopColor: Hairline.soft, ...WEB_LINK },
  stepName: { fontSize: FontSize.labelMd, fontWeight: '800', width: 84, letterSpacing: 0.2 },
  stepDet: { flex: 1, fontSize: FontSize.labelSm, color: Colors.muted },
  stepQ: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface },
  vidRow: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, padding: Spacing.md, flexDirection: 'row', alignItems: 'center', gap: 10, ...Elevation.sm, ...WEB_LINK },
  vidN: { fontSize: FontSize.bodyLg, fontWeight: '900', color: DermaAtlas.teal, minWidth: 34, textAlign: 'center', letterSpacing: -0.3 },
  vidT: { flex: 1, fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, lineHeight: 15 },
  libCard: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, padding: Spacing.md, marginBottom: Spacing.sm, ...Elevation.sm },
  libT: { flex: 1, fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  starChip: { backgroundColor: 'rgba(154,123,200,0.10)', borderWidth: 1, borderColor: 'rgba(154,123,200,0.35)', borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 10, maxWidth: 320, ...WEB_LINK },
  starTxt: { fontSize: FontSize.labelSm, color: '#C6B4E0', fontWeight: '600' },
  note: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.sm, lineHeight: LineHeight.labelSm },
  nblmTitle: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2, marginBottom: 4 },
  nblmRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 9, borderTopWidth: 1, borderTopColor: Hairline.soft },
  nblmWhen: { fontSize: 9, fontWeight: '800', color: GOLD, letterSpacing: 0.4, textTransform: 'uppercase' },
  nblmT: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface, marginTop: 2 },
  nblmP: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 3, lineHeight: LineHeight.labelSm, fontStyle: 'italic' },
  nblmBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center', ...WEB_LINK },
  nblmBtnTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
});

const BLOQUE_ACCENT: Record<string, string> = {
  A: '#C56A5A', B: '#B08AC0', C: '#B8934E', D: '#C56A5A', E: '#7C83D6',
  F: '#6BB8B0', G: '#5FA88C', H: '#9A7BC8', Z: '#C8A96A', X: '#9A7BC8',
};

/** Pestaña ATLAS — galería filtrable de láminas: el temario día-a-día como índice visual. */
function AtlasView({ filters, onPick, tone }: { filters: DermaFilters; onPick: (d: number) => void; tone: SkinTone }) {
  const items = DERMA_DIAS.filter((d) => {
    if (filters.morfologia && d.morfologia !== filters.morfologia) return false;
    if (filters.sitio && d.sitio !== filters.sitio) return false;
    return true;
  });
  const hasFilter = !!(filters.morfologia || filters.sitio || filters.categoria);
  return (
    <View>
      <View style={ast.head}>
        <Text style={ast.title}>Galería de láminas · {items.length} de {DERMA_DIAS.length} casos</Text>
        <View style={[ast.toneChip, { borderColor: DermaAtlas.gold + '55' }]}>
          <View style={[ast.toneSw, { backgroundColor: tone.hex }]} />
          <Text style={ast.toneTxt}>Fitzpatrick {tone.id}</Text>
        </View>
      </View>
      {hasFilter && items.length === 0 ? (
        <Text style={ast.empty}>Ningún caso con imagen etiquetada coincide con ese filtro. Los casos con lámina cargada son los de mayor rinde (fundamentos, infecciosas, oncología, inflamatorias). Limpia el filtro o toca otra región.</Text>
      ) : null}
      <View style={gridStyle(180)}>
        {items.map((d, i) => {
          const c = BLOQUE_ACCENT[d.bKey] || PURPLE;
          const isCrit = d.tier === 'CRIT';
          return (
            <View key={d.d} style={gridItemStyle(180)}>
              <FadeUp delay={Math.min(i * 18, 220)}>
                <TouchableOpacity activeOpacity={0.88} onPress={() => onPick(d.d)} style={[ast.plate, { borderColor: c + '3A' }, Platform.OS === 'web' ? WEB_LINK : null]}>
                  <View style={[ast.thumb, { backgroundColor: DermaAtlas.ink }]}>
                    {Platform.OS === 'web' ? (
                      <View style={StyleSheet.absoluteFill as any} {...({ dangerouslySetInnerHTML: { __html: `<svg width='100%' height='100%' viewBox='0 0 160 120' preserveAspectRatio='xMidYMid slice'><defs><pattern id='g${d.d}' width='18' height='18' patternUnits='userSpaceOnUse'><path d='M18 0H0V18' fill='none' stroke='${c}' stroke-opacity='0.10' stroke-width='0.5'/></pattern></defs><rect width='160' height='120' fill='url(#g${d.d})'/><circle cx='80' cy='58' r='30' fill='none' stroke='${c}' stroke-opacity='0.22' stroke-width='0.8'/></svg>` } } as any)} />
                    ) : null}
                    <DermaLineIcon name={d.dermatoscopiaUrl ? 'dermatoscope' : d.atlasUrl ? 'loupe' : 'atlas'} size={20} color={c} />
                    {isCrit ? <View style={ast.critTag}><Text style={ast.critTxt}>NO ERRAR</Text></View> : null}
                    <View style={ast.caseNo}><Text style={[ast.caseNoTxt, { color: c }]}>Nº{String(d.d).padStart(2, '0')}</Text></View>
                  </View>
                  <Text style={ast.plateSub} numberOfLines={2}>{d.sub}</Text>
                  <View style={ast.plateMeta}>
                    <Text style={[ast.plateBloque, { color: c }]} numberOfLines={1}>{d.bKey} · {d.bloque}</Text>
                    {d.morfologia ? <Text style={ast.plateMorf}>{d.morfologia}</Text> : null}
                  </View>
                </TouchableOpacity>
              </FadeUp>
            </View>
          );
        })}
      </View>
      <Text style={ast.lic}>Láminas vía deep-link legal a DermNet (CC BY-NC-ND) / AccessDerma / Full Spectrum — se enlaza y cita, NUNCA se re-hostea el bitmap ni se entrena IA. Toca una lámina para ir a su caso del día.</Text>
    </View>
  );
}

/** Pestaña DERMATOSCOPIA — algoritmos entrenables (capa élite) + leyenda IDS + gaps ampliados. */
function DermatoscopiaView() {
  const ALGOS = [
    { t: 'Pattern analysis', d: 'análisis global de patrón + estructuras locales (base kittleriana)', url: 'https://dermoscopedia.org/Pattern_analysis' },
    { t: 'Two-step algorithm', d: 'paso 1: melanocítica vs no · paso 2: benigno vs maligno', url: 'https://dermoscopedia.org/Two_step_algorithm' },
    { t: 'Chaos & Clues', d: 'asimetría de patrón/color + pistas → decisión de biopsia', url: 'https://dermoscopedia.org/Chaos_and_clues' },
    { t: 'TADA', d: 'triage amalgamated dermoscopic algorithm (screening)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5424662/' },
    { t: '7-point checklist', d: '3 criterios mayores + 4 menores para melanoma', url: 'https://dermoscopedia.org/Seven-point_checklist' },
    { t: 'Tricoscopia', d: 'estructuras del pelo/cuero cabelludo (alopecias)', url: 'https://dermoscopedia.org/Trichoscopy' },
    { t: 'Onicoscopia', d: 'melanoniquia vs melanoma ungueal · patrón vascular', url: 'https://dermoscopedia.org/Nail_dermoscopy' },
  ];
  return (
    <View>
      <SectionLabel>Capa élite · algoritmos dermatoscópicos como unidad entrenable</SectionLabel>
      <Text style={dst.intro}>El mayor diferenciador del dermatólogo camino a Mayo: entrenar el algoritmo, no memorizar imágenes sueltas. Cada uno deep-linkea a Dermoscopedia (estándar IDS).</Text>
      <View style={[gridStyle(240), { marginBottom: Spacing.lg }]}>
        {ALGOS.map((a, i) => (
          <View key={a.t} style={gridItemStyle(240)}>
            <FadeUp delay={i * 40}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(a.url)} style={[dst.algo, Platform.OS === 'web' ? WEB_LINK : null]}>
                <DermaLineIcon name="dermatoscope" size={18} color={DermaAtlas.teal} />
                <Text style={dst.algoT}>{a.t} ↗</Text>
                <Text style={dst.algoD} numberOfLines={2}>{a.d}</Text>
              </TouchableOpacity>
            </FadeUp>
          </View>
        ))}
      </View>
      <DermaDermoscopyKey />
    </View>
  );
}

/** Pestaña CEREBRO — temario ampliado (gaps de élite): desde la v3 cada módulo G+ tiene su sesión de lectura en el CICLO 2 (dermaCiclo2.ts). */
function GapModulos({ onJump }: { onJump?: (d: number) => void }) {
  return (
    <View style={{ marginBottom: Spacing.xl }}>
      <SectionLabel>Temario ampliado · huecos de dermatólogo de élite (enriquecimiento: 1 módulo G+ por semana en el slot de lectura del CICLO 2, d{DERMA_CICLO2_META.dOffset + 1}-d{DERMA_CICLO2_META.dOffset + DERMA_CICLO2_META.totalDias})</SectionLabel>
      <View style={gridStyle(260)}>
        {DERMA_GAP_MODULOS.map((m, i) => { const d2 = DERMA_CICLO2_GPLUS_DIAS[m.id]; return (
          <View key={m.id} style={gridItemStyle(260)}>
            <FadeUp delay={i * 35}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(m.url)} style={[gmt.card, Platform.OS === 'web' ? WEB_LINK : null]}>
                <View style={gmt.head}>
                  <Text style={gmt.id}>{m.id}</Text>
                  <Text style={gmt.bloque} numberOfLines={1}>{m.bloque}</Text>
                </View>
                {d2 ? (
                  <TouchableOpacity activeOpacity={0.85} onPress={() => (onJump ? onJump(d2) : openUrl(m.url))} style={[gmt.fechaChip, Platform.OS === 'web' ? WEB_LINK : null]}>
                    <Text style={gmt.fechaTxt}>ciclo 2 · d{d2} · {fmtFecha(fechaDeD(d2))} {onJump ? '▶' : ''}</Text>
                  </TouchableOpacity>
                ) : null}
                <Text style={gmt.title}>{m.titulo} ↗</Text>
                <Text style={gmt.why} numberOfLines={3}>{m.porQue}</Text>
                {m.ddx ? (
                  <View style={gmt.ddxRow}>
                    {m.ddx.slice(0, 4).map((d) => <View key={d} style={gmt.ddxChip}><Text style={gmt.ddxTxt}>{d}</Text></View>)}
                  </View>
                ) : null}
                <Text style={gmt.src} numberOfLines={2}>fuente: {m.fuente}</Text>
              </TouchableOpacity>
            </FadeUp>
          </View>
        ); })}
      </View>
    </View>
  );
}

/** Estado de un bloque del PLAN (A-X) leído del progreso REAL (studyProgress 'derma') + fichas del cerebro + CRIT. */
interface BloquePlanStat { bKey: DermaBloqueKey; bloque: string; total: number; hechos: number; pct: number; estado: 'completado' | 'en-curso' | 'pendiente'; primerD: number; ultimoD: number; crit: number; fichas: number; siguiente: number }

/**
 * Pestaña CEREBRO — SOLO datos vivos (gaps v3b derma nº 7). Nada hardcoded: el % ciego sale del ledger, el progreso del
 * marcado real de HOY, las fechas de los hitos del plan v5.10 (dermaDailyPlan/dermaCiclo2) y el SPEC A–G es un índice
 * (DERMA_SPEC_TO_PLAN) hacia las fichas de 7 pasos y hacia el día del plan. El histórico v1 de junio queda plegado al final.
 */
function CerebroView({ hoyD, onJump, onGoDebilidades }: { hoyD: number; onJump: (d: number) => void; onGoDebilidades: () => void }) {
  const { entries } = useDermaLedger();
  const hoy = todayISO();
  const done = useMemo(() => new Set(loadDone('derma')), []);
  const ciego = useMemo(() => dermaPctCiego(entries), [entries]);
  const porModulo = useMemo(() => {
    const st = dermaPctFalloPorModulo(entries);
    return DERMA_AREAS.map((a) => st.find((x) => x.clave === a)).filter((x): x is DermaStat => !!x);
  }, [entries]);
  const casosRegistrados = useMemo(() => new Set(entries.filter((e) => e.fuente === 'caso').map((e) => e.id)).size, [entries]);
  const bloques: BloquePlanStat[] = useMemo(() => agruparProgreso(DERMA_DIAS, (x) => x.bKey, hoyD, done).map((g) => ({
    bKey: g.dias[0].bKey, bloque: g.dias[0].bloque, total: g.total, hechos: g.hechos, pct: g.pct, estado: g.estado, primerD: g.primerD, ultimoD: g.ultimoD,
    crit: g.dias.filter((x) => x.tier === 'CRIT').length,
    fichas: DERMA_CEREBRO.filter((f) => f.bKey === g.dias[0].bKey).length,
    siguiente: (g.dias.find((x) => !done.has(x.d)) ?? g.dias[0]).d,
  })), [hoyD, done]);
  const hechosC1 = DERMA_DIAS.filter((x) => done.has(x.d)).length;
  const hechosC2 = DERMA_DIAS_TODOS.filter((x) => x.d > DERMA_DAILY_META.totalDias && done.has(x.d)).length;
  const critTotal = DERMA_DIAS.filter((x) => x.tier === 'CRIT').length;
  const critHechos = DERMA_DIAS.filter((x) => x.tier === 'CRIT' && done.has(x.d)).length;
  const [specOpen, setSpecOpen] = useState<string | null>(null);
  const [fichaOpen, setFichaOpen] = useState<string | null>(null);
  const [histOpen, setHistOpen] = useState(false);

  /** Hitos con fecha v5.10 — todo leído del plan (taper, checkpoints, drills, ciclo 2), ordenado por fecha. */
  const hitos = useMemo(() => {
    const t = DERMA_DAILY_META.taperStep1;
    const items: Array<{ d: number; fecha: string; t: string; sub: string; color: string }> = [];
    if (DERMA_STEP1_DIAS.length) {
      const primero = DERMA_STEP1_DIAS[0]; const ultimo = DERMA_STEP1_DIAS[DERMA_STEP1_DIAS.length - 1];
      items.push({ d: primero, fecha: fechaDeD(primero), t: `Cuenta doble Step 1 · ${DERMA_STEP1_DIAS.length} átomos (${DERMA_STEP1_DIAS.map((d) => `d${d}`).join(' ')})`, sub: `${fmtFecha(fechaDeD(primero))} → ${fmtFecha(fechaDeD(ultimo))} · mismo mazo FSRS, tag step1 · anclaje al día "dermato" del plan USMLE en d12/d24`, color: DermaAtlas.periwinkle });
    }
    for (const d of DERMA_DRILL_DIAS_V3) if (!DERMA_CHECKPOINT_DIAS_V3.includes(d)) items.push({ d, fecha: fechaDeD(d), t: `Drill HDPH · oclusión vascular 90 s · d${d}`, sub: 'DermaEmergencyDrill cronometrado → ledger (fuente drill) · prompt HDPH del NotebookLM', color: DermaAtlas.crit });
    items.push({ d: t.desdeD, fecha: t.desde, t: `TAPER Step 1 · d${t.desdeD}-d${t.hastaD} (${DERMA_TAPER_DIAS.length} sesiones)`, sub: `${fmtFecha(t.desde)} → ${fmtFecha(t.hasta)} · 1 caso ciego + FSRS de fallos + 0 preguntas y 0 lectura nuevas · el ${fmtFecha(t.hasta)} es el día del examen (sesión opcional)`, color: DermaAtlas.crit });
    items.push({ d: DERMA_DAILY_META.postStep1D1, fecha: fechaDeD(DERMA_DAILY_META.postStep1D1), t: `Post-Step 1 · d${DERMA_DAILY_META.postStep1D1}: 3 casos ciegos por sesión`, sub: 'primera sesión tras el examen · los 10Q del banco pasan a variable de ajuste', color: DermaAtlas.jade });
    const CP_T: Record<string, string> = { cp1: 'Checkpoint 1 · mapa de fallos por módulo CORE', cp2: 'Checkpoint 2 · re-drill + DD Challenge + drill HDPH', repaso1: 'Repaso 1 · 2ª pasada FSRS solo de fallados', repaso2: 'Repaso 2 · mapa final de debilidades' };
    for (const [k, d] of Object.entries(DERMA_CHECKPOINTS)) items.push({ d, fecha: fechaDeD(d), t: `${CP_T[k] ?? k} · d${d}`, sub: 'lee el ledger (DermaCheckpointPanel) · prompt 2 del NotebookLM «qué no sé del módulo X»', color: PURPLE });
    items.push({ d: DERMA_CICLO2_META.dOffset + 1, fecha: DERMA_CICLO2_META.inicio, t: `CICLO 2 · d${DERMA_CICLO2_META.dOffset + 1}-d${DERMA_CICLO2_META.dOffset + DERMA_CICLO2_META.totalDias}`, sub: `${fmtFecha(DERMA_CICLO2_META.inicio)} → ${fmtFecha(DERMA_CICLO2_META.fin)} · ${DERMA_CICLO2_META.casosRestantes} casos restantes a ${DERMA_CICLO2_META.casosPorSesion}/sesión + 2ª pasada FSRS + módulos G+1…G+9 en el slot de lectura`, color: GOLD });
    for (const [k, d] of Object.entries(DERMA_CICLO2_CHECKPOINTS)) if (d) items.push({ d, fecha: fechaDeD(d), t: `${CP_T[k] ?? k} (ciclo 2) · d${d}`, sub: DERMA_CICLO2_DRILL_DIAS.includes(d) ? 'lee el ledger + drill HDPH cronometrado' : 'lee el ledger', color: PURPLE });
    return items.filter((i) => i.fecha).sort((a, b) => a.fecha.localeCompare(b.fecha) || a.d - b.d);
  }, []);
  const proximo = hitos.find((h) => h.fecha >= hoy);

  return (
    <View>
      <Text style={cst.intro}>Datos VIVOS: % ciego del ledger (solo aciertos «lo sabía»), progreso real marcado en Hoy, hitos con las fechas v5.10 leídas del plan y el mapa del SPEC A–G como índice hacia las fichas de 7 pasos. El material de junio (protocolo starter 12 semanas · micro-horario 60′) queda plegado al final como histórico v1: no alimenta ninguna cifra.</Text>

      {/* MEGA STAT — % ciego REAL (ledger), no un readiness inventado */}
      <MegaStat value={ciego.pctCiego} suffix="%" decimals={1} label="% CIEGO REAL · aciertos seguros / registrados (ledger)" accent={PURPLE}
        footnote={ciego.n
          ? `${ciego.seguras}/${ciego.n} seguras · ${ciego.fallos} fallos · ${ciego.suerte} por suerte (cuentan como fallo, Palmerton) · ${casosRegistrados}/200 casos ciegos registrados`
          : 'ledger vacío · el % ciego nace cuando registras el primer caso ciego en Hoy (✓/✗ + confianza + módulo CORE + tipo de error)'} />

      {/* RINGS vivos: ciclo 1 · críticos · casos ciegos · % ciego */}
      <View style={st.ringRow}>
        <View style={st.ringCard}><RingStat value={hechosC1} max={DERMA_DAILY_META.totalDias} label="Ciclo 1" sub={`${hechosC1}/${DERMA_DAILY_META.totalDias} átomos${hechosC2 ? ` · +${hechosC2} ciclo 2` : ''}`} accent={PURPLE} /></View>
        <View style={st.ringCard}><RingStat value={critHechos} max={critTotal} label="Críticos" sub={`${critHechos}/${critTotal} no-errar hechos`} accent={DermaAtlas.crit} /></View>
        <View style={st.ringCard}><RingStat value={casosRegistrados} max={200} label="Casos ciegos" sub={`${casosRegistrados}/200 Board Review`} accent={DermaAtlas.teal} /></View>
        <View style={st.ringCard}><RingStat value={ciego.pctCiego} max={100} label="% ciego" sub={ciego.n ? `${ciego.seguras}/${ciego.n} seguras · ledger` : 'ledger vacío · registra casos'} accent={DermaAtlas.gold} suffix="%" /></View>
      </View>

      {/* % CIEGO POR MÓDULO CORE (ledger) */}
      <SectionLabel>% ciego por módulo CORE · ledger (Med · Path · Peds · Surg)</SectionLabel>
      <GlassPanel accent={DermaAtlas.teal} style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
        {porModulo.map((s, i) => {
          const a = s.clave as DermaAreaCORE; const c = DERMA_AREA_COLOR[a];
          return (
            <View key={s.clave} style={[cst.modRow, i === 0 && { borderTopWidth: 0 }]}>
              <View style={cst.modHead}>
                <Text style={[cst.modLbl, { color: c }]}>{DERMA_AREA_LABEL[a]}</Text>
                <Text style={cst.modN}>{s.n ? `${s.pctCiego}% ciego · ${s.pctFallo}% fallo · n=${s.n}${s.ultimo ? ` · último ${s.ultimo}` : ''}` : 'sin datos'}</Text>
              </View>
              <View style={cst.track}><View style={[cst.fill, { width: `${Math.max(0, Math.min(100, s.pctCiego))}%` as any, backgroundColor: s.n ? c : 'rgba(255,255,255,0.08)' }]} /></View>
            </View>
          );
        })}
        <TouchableOpacity activeOpacity={0.85} onPress={onGoDebilidades} style={cst.linkBtn}><Text style={[cst.linkBtnTxt, { color: DermaAtlas.teal }]}>mapa completo (por bloque, tipo de error dominante + cura, gate del módulo A, 2ª pasada, export JSON) → pestaña Debilidades</Text></TouchableOpacity>
      </GlassPanel>

      {/* PROGRESO POR BLOQUE DEL PLAN A–X (studyProgress 'derma') */}
      <SectionLabel>Progreso por bloque del plan A–X · marcado REAL en Hoy (toca → siguiente átomo pendiente del bloque)</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {bloques.map((b, i) => {
          const c = BLOQUE_ACCENT[b.bKey] || PURPLE; const enCurso = hoyD >= b.primerD && hoyD <= b.ultimoD;
          return (
            <FadeUp key={b.bKey} delay={i * 30}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => onJump(b.siguiente)} style={[cst.bloqueRow, { borderLeftColor: c }, Platform.OS === 'web' ? WEB_LINK : null]}>
                <View style={cst.bloqueHead}>
                  <Text style={[cst.bloqueKey, { color: c }]}>{b.bKey}</Text>
                  <Text style={cst.bloqueName} numberOfLines={1}>{b.bloque}</Text>
                  <Text style={cst.bloquePct}>{b.hechos}/{b.total} · {b.pct}%</Text>
                </View>
                <View style={cst.track}><View style={[cst.fill, { width: `${b.pct}%` as any, backgroundColor: c }]} /></View>
                <Text style={cst.bloqueMeta}>d{b.primerD}–d{b.ultimoD}{b.total !== b.ultimoD - b.primerD + 1 ? ' (intercalado)' : ''} · {b.crit} CRIT · módulo CORE {DERMA_MODULO_POR_BLOQUE[b.bKey]} · {b.fichas} ficha{b.fichas === 1 ? '' : 's'} de 7 pasos · {b.estado === 'completado' ? 'completado' : enCurso ? `en curso (hoy d${hoyD})` : b.estado === 'en-curso' ? 'empezado' : 'pendiente'} · ▶ d{b.siguiente}</Text>
              </TouchableOpacity>
            </FadeUp>
          );
        })}
        <TouchableOpacity activeOpacity={0.85} onPress={() => onJump(DERMA_CICLO2_META.dOffset + 1)} style={[cst.bloqueRow, { borderLeftColor: GOLD }, Platform.OS === 'web' ? WEB_LINK : null]}>
          <View style={cst.bloqueHead}>
            <Text style={[cst.bloqueKey, { color: GOLD }]}>C2</Text>
            <Text style={cst.bloqueName} numberOfLines={1}>Ciclo 2 · {DERMA_CICLO2_META.casosRestantes} casos restantes + 2ª pasada FSRS + G+1…G+9</Text>
            <Text style={cst.bloquePct}>{hechosC2}/{DERMA_CICLO2_META.totalDias} · {Math.round((hechosC2 / DERMA_CICLO2_META.totalDias) * 100)}%</Text>
          </View>
          <View style={cst.track}><View style={[cst.fill, { width: `${Math.round((hechosC2 / DERMA_CICLO2_META.totalDias) * 100)}%` as any, backgroundColor: GOLD }]} /></View>
          <Text style={cst.bloqueMeta}>d{DERMA_CICLO2_META.dOffset + 1}–d{DERMA_CICLO2_META.dOffset + DERMA_CICLO2_META.totalDias} · {fmtFecha(DERMA_CICLO2_META.inicio)} → {fmtFecha(DERMA_CICLO2_META.fin)} · dermaCiclo2.ts (generado)</Text>
        </TouchableOpacity>
      </View>

      {/* PRÓXIMOS HITOS · fechas v5.10 */}
      <SectionLabel>Hitos del plan · fechas v5.10 leídas de dermaDailyPlan/dermaCiclo2 (toca → abre el día en Hoy)</SectionLabel>
      <GlassPanel accent={PURPLE} style={{ marginBottom: Spacing.xl, padding: Spacing.md }}>
        {hitos.map((h, i) => {
          const pasado = h.fecha < hoy; const esProx = !!proximo && proximo.d === h.d && proximo.t === h.t;
          return (
            <TouchableOpacity key={`${h.d}-${i}`} activeOpacity={0.85} onPress={() => onJump(h.d)} style={[cst.hitoRow, i === 0 && { borderTopWidth: 0 }, pasado && { opacity: 0.45 }, Platform.OS === 'web' ? WEB_LINK : null]}>
              <View style={[cst.hitoDate, { borderColor: h.color + '66', backgroundColor: h.color + (esProx ? '33' : '14') }]}><Text style={[cst.hitoDateTxt, { color: h.color }]}>{fmtFecha(h.fecha)}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={cst.hitoT}>{h.t}{esProx ? '  ← próximo' : pasado ? '  · pasado' : ''}</Text>
                <Text style={cst.hitoSub}>{h.sub}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <Text style={fst.note}>Regla PLAN_ELITE §13: ningún átomo CRIT nuevo a ±3 días hábiles de un examen mayor. El taper ENCAPS se activa solo cuando DERMA_TAPER_ENCAPS_FECHA tenga la fecha real del examen 2027-I ({DERMA_TAPER_ENCAPS_FECHA ? `fijada: ${fmtFecha(DERMA_TAPER_ENCAPS_FECHA)}` : 'hoy null · A VERIFICAR (13-sep)'}).</Text>
      </GlassPanel>

      {/* CICLO REAL DE LA SESIÓN · DERMA_FRANJAS (sustituye al micro-horario v1 de 60′) */}
      <SectionLabel>Ciclo de la sesión · {DERMA_DAILY_META.bloque}</SectionLabel>
      <GlassPanel style={{ marginBottom: Spacing.xl }}>
        {DERMA_FRANJAS.map((h, i) => (
          <View key={i} style={[st.horRow, i === 0 && { borderTopWidth: 0 }]}>
            <View style={[st.horBadge, { backgroundColor: PURPLE + '1A' }]}><Text style={[st.horFranja, { color: PURPLE }]}>{h.hora}</Text></View>
            <Text style={st.horAct}>{h.fase}</Text>
          </View>
        ))}
      </GlassPanel>

      {/* MAPA DEL SPEC A–G como ÍNDICE (fichas de 7 pasos + salto al día) */}
      <SectionLabel>Mapa del SPEC A–G · índice hacia las fichas de 7 pasos y los átomos del plan (sin «vueltas»: el progreso real está arriba)</SectionLabel>
      <View style={{ marginBottom: Spacing.xl }}>
        {DERMA_BLOQUES.map((b, i) => {
          const c = BLOQUE_ACCENT[b.id] || PURPLE;
          const planKeys = (DERMA_SPEC_TO_PLAN[b.id] ?? []) as DermaBloqueKey[];
          const planStats = planKeys.map((k) => bloques.find((x) => x.bKey === k)).filter((x): x is BloquePlanStat => !!x);
          const fichas = DERMA_CEREBRO.filter((f) => planKeys.includes(f.bKey)).sort((x, y) => fichaD(x) - fichaD(y));
          const hechos = planStats.reduce((n, x) => n + x.hechos, 0); const total = planStats.reduce((n, x) => n + x.total, 0);
          const open = specOpen === b.id;
          return (
            <FadeUp key={b.id} delay={i * 40}>
              <View style={st.bloqueCard}>
                <TouchableOpacity activeOpacity={0.85} onPress={() => setSpecOpen(open ? null : b.id)} style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }, Platform.OS === 'web' ? WEB_LINK : null]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                    <View style={[st.bloqueDot, { backgroundColor: c }]} />
                    <View style={{ flex: 1 }}>
                      <Text style={st.bloqueTitle}>{b.id} · {b.titulo}</Text>
                      <Text style={st.bloqueNota}>{b.nota} · plan: {planStats.length ? planStats.map((x) => `${x.bKey} ${x.hechos}/${x.total}`).join(' + ') : '—'}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Chip label={`${hechos}/${total} átomos`} color={c} small />
                    <Chip label={`${fichas.length} fichas`} color={GOLD} small />
                    <Chip label={`${b.subtemas.length} subtemas`} color={Colors.muted} small />
                    <Text style={mex.toggle}>{open ? '−' : '+'}</Text>
                  </View>
                </TouchableOpacity>
                {open && (
                  <View style={{ marginTop: Spacing.sm }}>
                    {fichas.length > 0 ? <Text style={cst.subLbl}>Fichas del cerebro clínico · 7 pasos, modo recitar — «ficha» la abre aquí · ▶ abre el día en Hoy</Text> : <Text style={cst.subLbl}>Sin ficha de 7 pasos todavía en estos bloques (dermaCerebro.ts cubre los 22 átomos X + 13 CRIT clínicos)</Text>}
                    {fichas.map((f) => {
                      const dv = fichaD(f); const fo = fichaOpen === f.id; const tc = f.tier === 'CRIT' ? DermaAtlas.crit : f.tier === 'ALTA' ? DermaAtlas.alta : DermaAtlas.media;
                      return (
                        <View key={f.id}>
                          <View style={cst.fichaRow}>
                            <Text style={[cst.fichaD, { color: c }]}>d{dv}</Text>
                            <Text style={cst.fichaT} numberOfLines={2}>{f.titulo}</Text>
                            <Chip label={f.tier} color={tc} small />
                            <TouchableOpacity activeOpacity={0.85} onPress={() => setFichaOpen(fo ? null : f.id)} style={[cst.miniBtn, { borderColor: GOLD + '88', backgroundColor: fo ? GOLD + '1A' : 'transparent' }]}><Text style={[cst.miniBtnTxt, { color: GOLD }]}>{fo ? 'cerrar' : 'ficha'}</Text></TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.85} onPress={() => onJump(dv)} style={[cst.miniBtn, { borderColor: c + '88' }]}><Text style={[cst.miniBtnTxt, { color: c }]}>▶</Text></TouchableOpacity>
                          </View>
                          {fo && <View style={{ marginVertical: Spacing.sm }}><DermaCerebroCard ficha={f} accent={c} abierto /></View>}
                        </View>
                      );
                    })}
                    <Text style={[cst.subLbl, { marginTop: Spacing.sm }]}>Subtemas del SPEC (índice · la prioridad marca lo que no puedes errar)</Text>
                    <View style={st.subGrid}>
                      {b.subtemas.map((s) => (
                        <View key={s.code} style={st.subRow}>
                          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: PRIORIDAD_COLOR[s.prioridad], marginRight: 7 }} />
                          <Text style={st.subCode}>{s.code}</Text>
                          <Text style={st.subName} numberOfLines={1}>{s.nombre}</Text>
                          <Text style={[st.subVueltas, { color: PRIORIDAD_COLOR[s.prioridad] }]}>{s.prioridad}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </FadeUp>
          );
        })}
      </View>

      {/* ESTRATEGIA MAYO */}
      <GlassPanel accent={DermaAtlas.gold} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
        <Text style={st.h3}>Ángulo Mayo</Text>
        <Text style={st.body}>{DERMA_META.estrategiaMayo}</Text>
      </GlassPanel>

      {/* TEMARIO AMPLIADO G+ (con su sesión del ciclo 2) */}
      <GapModulos onJump={onJump} />

      {/* RECURSOS */}
      <SectionLabel>Recursos · enlaces directos</SectionLabel>
      <View style={[gridStyle(260), { marginBottom: Spacing.xl }]}>
        {DERMA_RECURSOS.map((r, i) => (
          <View key={i} style={gridItemStyle(260)}>
            <GlassPanel style={{ padding: Spacing.lg }}>
              <Text style={st.recCat}>{r.categoria}</Text>
              <View style={{ gap: 6, marginTop: 8 }}>
                {r.items.map((it, j) => (
                  <TouchableOpacity key={j} activeOpacity={0.8} onPress={() => openUrl(it.url)} style={st.link}>
                    <Text style={[st.linkText, it.gated && { color: Colors.muted }]} numberOfLines={2}>
                      {it.gated ? '● ' : '▸ '}{it.label} ↗
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </GlassPanel>
          </View>
        ))}
      </View>

      {/* NOTAS DE HONESTIDAD */}
      <SectionLabel>Honestidad (acceso / seguridad)</SectionLabel>
      <GlassPanel accent={DermaAtlas.gold} style={{ marginBottom: Spacing.xl }}>
        {DERMA_NOTAS.map((n, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 5 }}>
            <Text style={{ color: DermaAtlas.gold }}>•</Text>
            <Text style={[st.body, { flex: 1 }]}>{n}</Text>
          </View>
        ))}
      </GlassPanel>

      {/* HISTÓRICO v1 (jun-2026) — plegado, no operativo */}
      <TouchableOpacity activeOpacity={0.85} onPress={() => setHistOpen((o) => !o)} style={cst.histHead}>
        <Text style={cst.histT}>Histórico v1 (jun-2026) · «protocolo starter 12 semanas» + «micro-horario 60′» — NO operativo: sustituido por el PLAN ÉLITE v3 de arriba (ciclo de 45′ con caso ciego)</Text>
        <Text style={mex.toggle}>{histOpen ? '−' : '+'}</Text>
      </TouchableOpacity>
      {histOpen && (
        <View style={{ opacity: 0.72, marginBottom: Spacing.xl }}>
          <Text style={fst.note}>Se conserva solo como referencia de cómo se pensó la sección en junio (DERMA_FASES · DERMA_HORARIO, marcados @deprecated en dermaData.ts). No alimenta fechas, metas ni cálculos; el readiness «8 %» de entonces era un valor fijo y se retiró.</Text>
          <View style={[gridStyle(240), { marginTop: Spacing.md, marginBottom: Spacing.md }]}>
            {DERMA_FASES.map((f, i) => (
              <View key={i} style={gridItemStyle(240)}>
                <View style={[st.faseCard, { borderLeftColor: Colors.muted }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                    <Text style={[st.faseTag, { color: Colors.muted }]}>{f.fase}</Text>
                    <Chip label={f.semanas} color={Colors.muted} small />
                  </View>
                  <Text style={st.faseFoco}>{f.foco}</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    <Chip label={`bloques ${f.bloques}`} color={Colors.muted} small />
                    <Chip label={`deadline ${f.deadline}`} color={Colors.muted} small />
                  </View>
                  <Text style={st.faseCrit}>Críticas nuevas: {f.criticas}</Text>
                </View>
              </View>
            ))}
          </View>
          <GlassPanel>
            {DERMA_HORARIO.map((h, i) => (
              <View key={i} style={[st.horRow, i === 0 && { borderTopWidth: 0 }]}>
                <View style={[st.horBadge, { backgroundColor: 'rgba(255,255,255,0.05)' }]}><Text style={[st.horFranja, { color: Colors.muted }]}>{h.franja}</Text></View>
                <Text style={st.horAct}>{h.act}</Text>
              </View>
            ))}
          </GlassPanel>
        </View>
      )}
    </View>
  );
}

/** Índice espacial/morfológico plegable para mobile (BodyMap + filtros en un sheet). */
function MobileExplorer({ filters, onSitio, onFilters }: { filters: DermaFilters; onSitio: (s: string | null) => void; onFilters: (f: DermaFilters) => void }) {
  const [open, setOpen] = useState(false);
  const active = [filters.morfologia, filters.sitio, filters.categoria].filter(Boolean).length;
  return (
    <View style={mex.wrap}>
      <TouchableOpacity activeOpacity={0.85} onPress={() => setOpen((o) => !o)} style={mex.head}>
        <DermaLineIcon name="body" size={16} color={PURPLE} />
        <Text style={mex.title}>Explorar el atlas · mapa corporal + filtros</Text>
        {active > 0 ? <View style={mex.badge}><Text style={mex.badgeTxt}>{active}</Text></View> : null}
        <Text style={mex.toggle}>{open ? '−' : '+'}</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ marginTop: Spacing.md, gap: Spacing.md }}>
          <DermaBodyMap active={filters.sitio} onPick={onSitio} />
          <DermaMorphologyFilter filters={filters} onChange={onFilters} />
        </View>
      )}
    </View>
  );
}

const ATLAS_NAV: { k: Sub; label: string; icon: React.ComponentProps<typeof DermaLineIcon>['name'] }[] = [
  { k: 'hoy', label: 'Caso de hoy', icon: 'loupe' },
  { k: 'atlas', label: 'Atlas', icon: 'atlas' },
  { k: 'dermatoscopia', label: 'Dermatoscopia', icon: 'dermatoscope' },
  { k: 'fuentes', label: 'Fuentes', icon: 'flask' },
  { k: 'debilidades', label: 'Debilidades', icon: 'differential' },
  { k: 'cerebro', label: 'Cerebro', icon: 'skinLayers' },
];

export default function DermaHub({ variant = 'mobile' }: { variant?: 'mobile' | 'desktop' }) {
  const isDesktop = variant === 'desktop';
  const hoy = diaEstudioTipo(new Date());
  const [sub, setSub] = useState<Sub>('hoy');
  /** Salto externo a un día del plan (Cerebro/Atlas → HOY); `k` = nonce para repetir el mismo d. Se limpia al cambiar de pestaña. */
  const [jump, setJump] = useState<{ d: number; k: number } | undefined>(undefined);
  const [toneId, setToneId] = useState<SkinTone['id']>('III');
  const [filters, setFilters] = useState<DermaFilters>({ morfologia: null, sitio: null, categoria: null });
  const tone = SKIN_TONES.find((t) => t.id === toneId) || SKIN_TONES[2];
  const { entries: ledger } = useDermaLedger();
  const ciego = dermaPctCiego(ledger);
  const hoyColor = hoy === 'derma' ? PURPLE : hoy === 'research' ? DermaAtlas.jade : Colors.muted;
  const hoyLabel = hoy === 'derma' ? 'DERMA · hoy te toca' : hoy === 'research' ? 'RESEARCH · día alterno →' : 'Descanso · finde';

  // Día de HOY en la numeración continua (ciclo 1 → ciclo 2 cuando la fecha pasa del d73).
  const hoyD = planHoyD(DERMA_DIAS_TODOS, todayISO());
  // El BodyMap/MorphologyFilter filtran el ATLAS; tocar una lámina (o un hito/ficha del Cerebro) abre ESE día en "Caso de hoy".
  const goCase = (d: number) => { setJump({ d, k: Date.now() }); setSub('hoy'); };
  const pickSitio = (s: string | null) => { setFilters((f) => ({ ...f, sitio: s })); if (s) setSub('atlas'); };

  const contentStyle = isDesktop
    ? { padding: 28, paddingTop: 32, paddingBottom: 60, width: '100%' as const }
    : { paddingHorizontal: Spacing.lg, paddingTop: 52, paddingBottom: 110 };

  // ── Riel lateral del atlas (índice espacial/morfológico) ──
  const rail = (
    <View style={st.rail}>
      <View style={st.railCard}>
        <Text style={st.railLbl}>MAPA CORPORAL</Text>
        <DermaBodyMap active={filters.sitio} onPick={pickSitio} />
      </View>
      <View style={st.railCard}>
        <DermaMorphologyFilter filters={filters} onChange={(f) => { setFilters(f); if (f.morfologia || f.sitio || f.categoria) setSub('atlas'); }} />
      </View>
      <View style={st.railStatsCard}>
        <Text style={st.railLbl}>ÍNDICE DEL ATLAS</Text>
        <View style={st.railStatRow}><Text style={st.railStatN}>{DERMA_DIAS.length}</Text><Text style={st.railStatT}>casos día-a-día</Text></View>
        <View style={st.railStatRow}><Text style={[st.railStatN, { color: DermaAtlas.crit }]}>{DERMA_DIAS.filter((d) => d.tier === 'CRIT').length}</Text><Text style={st.railStatT}>no-errar (crítico)</Text></View>
        <View style={st.railStatRow}><Text style={[st.railStatN, { color: DermaAtlas.gold }]}>{DERMA_GAP_MODULOS.length}</Text><Text style={st.railStatT}>módulos élite (gaps · ciclo 2)</Text></View>
        <View style={st.railStatRow}><Text style={[st.railStatN, { color: DermaAtlas.jade }]}>{DERMA_CICLO2_META.totalDias}</Text><Text style={st.railStatT}>sesiones ciclo 2 (d{DERMA_CICLO2_META.dOffset + 1}-d{DERMA_CICLO2_META.dOffset + DERMA_CICLO2_META.totalDias})</Text></View>
      </View>
    </View>
  );

  const body = (
    <View style={{ flex: 1, minWidth: 0 }}>
      <AIFirstPanel segmento="derma" accent={PURPLE} />

      {/* En mobile el índice espacial/morfológico colapsa a un panel plegable */}
      {!isDesktop && (
        <MobileExplorer
          filters={filters}
          onSitio={pickSitio}
          onFilters={(f) => { setFilters(f); if (f.morfologia || f.sitio || f.categoria) setSub('atlas'); }}
        />
      )}

      {/* SUB-NAV propia de atlas */}
      <View style={st.atlasNav}>
        {ATLAS_NAV.map((n) => {
          const on = sub === n.k;
          return (
            <TouchableOpacity key={n.k} activeOpacity={0.85} onPress={() => { setJump(undefined); setSub(n.k); }} style={[st.navTab, on && st.navTabOn, Platform.OS === 'web' ? WEB_LINK : null]}>
              <DermaLineIcon name={n.icon} size={15} color={on ? PURPLE : Colors.muted} />
              <Text style={[st.navTabTxt, on && { color: Colors.onSurface }]}>{n.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {sub === 'hoy' ? <DermaTodayPlan tone={tone} jump={jump} />
        : sub === 'atlas' ? <AtlasView filters={filters} onPick={goCase} tone={tone} />
        : sub === 'dermatoscopia' ? <DermatoscopiaView />
        : sub === 'fuentes' ? <FuentesView />
        : sub === 'debilidades' ? <DebilidadesView />
        : <CerebroView hoyD={hoyD} onJump={goCase} onGoDebilidades={() => { setJump(undefined); setSub('debilidades'); }} />}
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.surface }} contentContainerStyle={contentStyle as any} showsVerticalScrollIndicator={false}>
      <View style={{ position: 'relative' }}>
        <CommandBackdrop />

        {/* ── HEADER PROPIO DEL ATLAS (con hero real de dermatoscopía) ── */}
        <View style={[st.atlasHeader, { position: 'relative', overflow: 'hidden', borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: Hairline.soft, paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg }]}>
          <HeroBackdrop image="derma" opacity={0.55} scrim="left" />
          <View style={st.headerTop}>
            <View style={{ flex: 1, minWidth: 220 }}>
              <View style={st.headerTitleRow}>
                <DermaLineIcon name="loupe" size={22} color={PURPLE} />
                <Text style={st.atlasTitle}>{DERMA_META.titulo}</Text>
              </View>
              <Text style={st.atlasSub}>{DERMA_META.subtitulo}</Text>
            </View>
            <View style={st.headerRight}>
              <SkinToneToggle value={toneId} onChange={setToneId} />
              <View style={[st.todayPill, { borderColor: hoyColor + '66', backgroundColor: hoyColor + '14' }]}>
                <View style={[st.todayDot, { backgroundColor: hoyColor }]} />
                <Text style={[st.todayPillTxt, { color: hoyColor }]}>{hoyLabel}</Text>
              </View>
            </View>
          </View>
          {/* greca "capas de piel" — divisor sutil bajo el header */}
          <View style={st.layersDivider}>
            <View style={[st.layerLine, { opacity: 0.5 }]} />
            <View style={[st.layerLine, { opacity: 0.28 }]} />
            <View style={[st.layerLine, { opacity: 0.14 }]} />
          </View>
          <Text style={st.atlasTesis} numberOfLines={isDesktop ? 2 : 4}>{DERMA_META.tesis}</Text>
        </View>

        {/* Cuerpo: 2 zonas en desktop (riel índice + atlas), 1 columna en mobile */}
        {isDesktop ? (
          <View style={st.twoZone}>
            {rail}
            {body}
          </View>
        ) : body}
      </View>
    </ScrollView>
  );
}

const cardBase = {
  backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg,
  borderWidth: 1, borderColor: Hairline.soft, padding: Spacing.lg,
  ...Elevation.sm,
};

const st = StyleSheet.create({
  // ── HEADER PROPIO DEL ATLAS ──
  atlasHeader: { marginBottom: Spacing.lg, paddingBottom: Spacing.sm },
  headerTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.md },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  atlasTitle: { fontSize: FontSize.headlineSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.6, lineHeight: LineHeight.headlineSm },
  atlasSub: { fontSize: FontSize.labelLg, marginTop: 4, fontWeight: '600', letterSpacing: 0.1, color: PURPLE },
  headerRight: { alignItems: 'flex-end', gap: Spacing.sm },
  todayPill: { flexDirection: 'row', alignItems: 'center', gap: 7, borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 6, paddingHorizontal: 12 },
  todayDot: { width: 7, height: 7, borderRadius: 4 },
  todayPillTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.3 },
  layersDivider: { marginTop: Spacing.md, gap: 3 },
  layerLine: { height: 1, backgroundColor: PURPLE, borderRadius: 1 },
  atlasTesis: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: Spacing.md, lineHeight: LineHeight.bodyMd, maxWidth: 760, fontStyle: 'italic' },

  // ── layout de 2 zonas ──
  twoZone: { flexDirection: 'row', gap: Spacing.lg, alignItems: 'flex-start' },
  rail: { width: 268, gap: Spacing.md, ...(Platform.OS === 'web' ? ({ position: 'sticky', top: 16 } as any) : {}) },
  railCard: { ...cardBase, padding: Spacing.md },
  railStatsCard: { ...cardBase, padding: Spacing.md, gap: 4 },
  railLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.4, marginBottom: Spacing.sm },
  railStatRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, paddingVertical: 3 },
  railStatN: { fontSize: FontSize.bodyLg, fontWeight: '900', color: PURPLE, minWidth: 30, letterSpacing: -0.3, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },
  railStatT: { fontSize: FontSize.labelSm, color: Colors.muted },

  // ── sub-nav del atlas ──
  atlasNav: { flexDirection: 'row', gap: 6, marginBottom: Spacing.lg, flexWrap: 'wrap' },
  navTab: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 8, paddingHorizontal: 13, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Hairline.medium, backgroundColor: 'rgba(255,255,255,0.02)' },
  navTabOn: { borderColor: PURPLE + '66', backgroundColor: PURPLE + '18' },
  navTabTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted, letterSpacing: 0.1 },

  h3: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: 7, letterSpacing: -0.2 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.bodyMd },
  bloqueDot: { width: 9, height: 9, borderRadius: 5 },

  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  ringCard: { flex: 1, minWidth: 140, backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: Hairline.soft, paddingVertical: Spacing.lg, paddingHorizontal: Spacing.md, alignItems: 'center', ...Elevation.sm },

  faseCard: { ...cardBase, borderLeftWidth: 3, minHeight: 150, ...WEB_LINK },
  faseTag: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.3 },
  faseFoco: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 7, lineHeight: 17 },
  faseCrit: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 9, fontStyle: 'italic' },

  bloqueCard: { ...cardBase, marginBottom: Spacing.sm },
  bloqueTitle: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  bloqueNota: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2 },
  subGrid: { gap: 2 },
  subRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5, borderTopWidth: 1, borderTopColor: Hairline.soft },
  subCode: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.onSurfaceVariant, width: 38 },
  subName: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurface },
  subVueltas: { fontSize: 9, fontWeight: '800', marginLeft: 6, letterSpacing: 0.2 },

  recCat: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.2 },
  link: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.soft, paddingVertical: 7, paddingHorizontal: 10, ...WEB_LINK },
  linkText: { fontSize: FontSize.labelSm, color: PURPLE, fontWeight: '600', lineHeight: 15 },

  horRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: Hairline.soft, gap: Spacing.sm },
  horBadge: { borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 9, minWidth: 76, alignItems: 'center' },
  horFranja: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  horAct: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 17 },
});

/** Estilos de la galería del Atlas. */
const ast = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md, flexWrap: 'wrap', gap: Spacing.sm },
  title: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  toneChip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 10 },
  toneSw: { width: 12, height: 12, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  toneTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: DermaAtlas.gold, letterSpacing: 0.2 },
  empty: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 18, marginBottom: Spacing.md, fontStyle: 'italic' },
  plate: { backgroundColor: DermaAtlas.plateFrame, borderRadius: BorderRadius.lg, borderWidth: 1, padding: Spacing.sm, ...Elevation.sm },
  thumb: { width: '100%', aspectRatio: 4 / 3, borderRadius: BorderRadius.md, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(231,234,242,0.05)' },
  critTag: { position: 'absolute', top: 6, right: 6, backgroundColor: 'rgba(197,106,90,0.9)', borderRadius: BorderRadius.sm, paddingVertical: 1, paddingHorizontal: 6 },
  critTxt: { fontSize: 8, fontWeight: '900', color: '#F3E4E0', letterSpacing: 0.4 },
  caseNo: { position: 'absolute', bottom: 6, left: 6, backgroundColor: 'rgba(10,15,28,0.7)', borderRadius: BorderRadius.sm, paddingVertical: 1, paddingHorizontal: 5 },
  caseNoTxt: { fontSize: 8, fontWeight: '900', letterSpacing: 0.4, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },
  plateSub: { fontSize: FontSize.labelSm, color: Colors.onSurface, marginTop: 8, lineHeight: 15, fontWeight: '600', fontStyle: 'italic' },
  plateMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, gap: 6 },
  plateBloque: { fontSize: 9, fontWeight: '800', letterSpacing: 0.2, flex: 1 },
  plateMorf: { fontSize: 9, color: Colors.muted, fontWeight: '600' },
  lic: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: Spacing.md, lineHeight: LineHeight.labelSm, fontStyle: 'italic' },
});

/** Estilos de la vista Dermatoscopia (algoritmos). */
const dst = StyleSheet.create({
  intro: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.bodyMd, marginBottom: Spacing.md },
  algo: { ...cardBase, borderLeftWidth: 3, borderLeftColor: DermaAtlas.teal, minHeight: 96 },
  algoT: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, marginTop: 8, letterSpacing: -0.2 },
  algoD: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 5, lineHeight: 15 },
});

/** Estilos de los módulos-gap (temario ampliado). */
const gmt = StyleSheet.create({
  card: { ...cardBase, borderLeftWidth: 3, borderLeftColor: DermaAtlas.gold, minHeight: 150 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  id: { fontSize: FontSize.labelSm, fontWeight: '900', color: DermaAtlas.gold, letterSpacing: 0.3 },
  bloque: { fontSize: 9, color: Colors.muted, fontWeight: '700', letterSpacing: 0.3, flex: 1, textTransform: 'uppercase' },
  title: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2, lineHeight: 18 },
  why: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 6, lineHeight: 15 },
  ddxRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 8 },
  ddxChip: { borderWidth: 1, borderColor: 'rgba(154,123,200,0.30)', borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 7 },
  ddxTxt: { fontSize: 9, color: DermaAtlas.amethyst, fontWeight: '600' },
  src: { fontSize: 9, color: Colors.muted, marginTop: 8, lineHeight: 12, fontStyle: 'italic' },
  fechaChip: { alignSelf: 'flex-start', borderWidth: 1, borderColor: 'rgba(200,169,106,0.45)', backgroundColor: 'rgba(200,169,106,0.10)', borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 8, marginBottom: 6 },
  fechaTxt: { fontSize: 9, fontWeight: '800', color: DermaAtlas.gold, letterSpacing: 0.2 },
});

/** Estilos de la pestaña CEREBRO (datos vivos). */
const TABULAR = Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {};
const cst = StyleSheet.create({
  intro: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.bodyMd, marginBottom: Spacing.lg },
  modRow: { paddingVertical: 7, borderTopWidth: 1, borderTopColor: Hairline.soft },
  modHead: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 5, flexWrap: 'wrap' },
  modLbl: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },
  modN: { fontSize: FontSize.labelSm, color: Colors.muted, ...TABULAR },
  track: { height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.06)', overflow: 'hidden' },
  fill: { height: 6, borderRadius: 3 },
  linkBtn: { marginTop: Spacing.sm, paddingVertical: 6, ...WEB_LINK },
  linkBtnTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  bloqueRow: { ...cardBase, borderLeftWidth: 3, padding: Spacing.md, marginBottom: Spacing.sm },
  bloqueHead: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 6 },
  bloqueKey: { fontSize: FontSize.bodyMd, fontWeight: '900', width: 28, letterSpacing: -0.2 },
  bloqueName: { flex: 1, fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.onSurface },
  bloquePct: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.onSurfaceVariant, ...TABULAR },
  bloqueMeta: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 6, lineHeight: LineHeight.labelSm },
  hitoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 8, borderTopWidth: 1, borderTopColor: Hairline.soft },
  hitoDate: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 8, minWidth: 112, alignItems: 'center' },
  hitoDateTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2, ...TABULAR },
  hitoT: { fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.onSurface, lineHeight: 17 },
  hitoSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2, lineHeight: LineHeight.labelSm },
  subLbl: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 },
  fichaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6, borderTopWidth: 1, borderTopColor: Hairline.soft },
  fichaD: { fontSize: FontSize.labelSm, fontWeight: '900', width: 36, ...TABULAR },
  fichaT: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurface, lineHeight: 16 },
  miniBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 8, ...WEB_LINK },
  miniBtnTxt: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.2 },
  histHead: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: Spacing.md, paddingHorizontal: Spacing.md, borderWidth: 1, borderStyle: 'dashed', borderColor: Hairline.medium, borderRadius: BorderRadius.lg, marginBottom: Spacing.md, ...WEB_LINK },
  histT: { flex: 1, fontSize: FontSize.labelMd, fontWeight: '700', color: Colors.muted, lineHeight: 17 },
});

/** Estilos del explorador plegable de mobile. */
const mex = StyleSheet.create({
  wrap: { ...cardBase, padding: Spacing.md, marginBottom: Spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', gap: 8, ...WEB_LINK },
  title: { flex: 1, fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.1 },
  badge: { backgroundColor: PURPLE + '26', borderRadius: BorderRadius.full, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 },
  badgeTxt: { fontSize: 10, fontWeight: '900', color: PURPLE },
  toggle: { fontSize: 20, fontWeight: '800', color: PURPLE, paddingHorizontal: 4 },
});
