import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../../theme/tokens';
import { desktopStyles, DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, GlassPanel, gridStyle, gridItemStyle } from '../empresa/primitives';
import { RingStat, MegaStat, FadeUp, CommandBackdrop } from '../empresa/visuals';
import { diaEstudioTipo, VUELTAS } from '../../lib/researchData';
import {
  DERMA_META, DERMA_BLOQUES, DERMA_RECURSOS, DERMA_FASES, DERMA_HORARIO, DERMA_NOTAS,
  PRIORIDAD_COLOR, DermaAtlas, SKIN_TONES, SkinTone, DERMA_GAP_MODULOS,
} from '../../lib/dermaData';
import { DERMA_DIAS } from '../../lib/dermaDailyPlan';
import DermaTodayPlan from './DermaTodayPlan';
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
 * DermaHub — sección Derma (referente clínico → Mayo): pestaña HOY = plan día-a-día
 * REAL (68 átomos, 3 fuentes con links verificados, ◆ Edge para Qbankly, progreso 0%→)
 * + pestaña Cerebro clínico = currículo por bloques A–G, protocolo 12 semanas y recursos.
 * Interdiario con Research. Reutilizado mobile y desktop.
 */

const PURPLE = DERMA_META.accent; // amatista #9A7BC8
const GOLD = DermaAtlas.gold;
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

const TOTAL_SUB = DERMA_BLOQUES.reduce((n, b) => n + b.subtemas.length, 0);
const CRITICAS = DERMA_BLOQUES.reduce((n, b) => n + b.subtemas.filter(s => s.prioridad === 'CRITICA').length, 0);

type Sub = 'hoy' | 'atlas' | 'dermatoscopia' | 'fuentes' | 'cerebro';

/** Pestaña FUENTES — biblioteca REAL extraída y verificada (links 200 en vivo). */
function FuentesView() {
  const EDGE = DermaAtlas.edge;
  const openEdge = (u: string) => Linking.openURL('microsoft-edge:' + u).catch(() => openUrl(u));
  return (
    <View>
      {/* Las 3 fuentes */}
      <SectionLabel>Las 3 fuentes · data extraída y verificada en vivo (10-jun-2026)</SectionLabel>
      <View style={[gridStyle(250), { marginBottom: Spacing.lg }]}>
        {[
          { ic: 'atlas' as const, t: 'AccessDermatologyDxRx', sub: '36 libros · 1.301 preguntas · 300 casos · 180 vídeos · sesión UF', url: 'https://dermatology.mhmedical.com/index.aspx', c: PURPLE },
          { ic: 'flask' as const, t: 'Qbankly (⚠ SOLO Edge)', sub: 'derma: S1 488 Q · S2 CK 534 Q · S3 263 Q · 136 flashcards', url: 'https://qbankly.app/qbanks', c: EDGE, edge: true },
          { ic: 'body' as const, t: 'ProMIR · Dermatología', sub: '11 capítulos · resumen 3:18:11 · Masterclass melanoma 1:39:10', url: 'https://promir.medicapanamericana.com/capitulo/62836950c0f8415ab9efb5c7', c: DermaAtlas.promir },
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

/** Pestaña CEREBRO — temario ampliado (gaps de élite) inline dentro del mapa clínico. */
function GapModulos() {
  return (
    <View style={{ marginBottom: Spacing.xl }}>
      <SectionLabel>Temario ampliado · huecos de dermatólogo de élite (enriquecimiento, no re-programa el plan)</SectionLabel>
      <View style={gridStyle(260)}>
        {DERMA_GAP_MODULOS.map((m, i) => (
          <View key={m.id} style={gridItemStyle(260)}>
            <FadeUp delay={i * 35}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(m.url)} style={[gmt.card, Platform.OS === 'web' ? WEB_LINK : null]}>
                <View style={gmt.head}>
                  <Text style={gmt.id}>{m.id}</Text>
                  <Text style={gmt.bloque} numberOfLines={1}>{m.bloque}</Text>
                </View>
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
        ))}
      </View>
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
  { k: 'cerebro', label: 'Temario', icon: 'skinLayers' },
];

export default function DermaHub({ variant = 'mobile' }: { variant?: 'mobile' | 'desktop' }) {
  const isDesktop = variant === 'desktop';
  const hoy = diaEstudioTipo(new Date());
  const [sub, setSub] = useState<Sub>('hoy');
  const [toneId, setToneId] = useState<SkinTone['id']>('III');
  const [filters, setFilters] = useState<DermaFilters>({ morfologia: null, sitio: null, categoria: null });
  const tone = SKIN_TONES.find((t) => t.id === toneId) || SKIN_TONES[2];
  const hoyColor = hoy === 'derma' ? PURPLE : hoy === 'research' ? DermaAtlas.jade : Colors.muted;
  const hoyLabel = hoy === 'derma' ? 'DERMA · hoy te toca' : hoy === 'research' ? 'RESEARCH · día alterno →' : 'Descanso · finde';

  // El BodyMap/MorphologyFilter filtran el ATLAS; tocar una lámina abre el "Caso de hoy".
  const goCase = (_d: number) => { setSub('hoy'); };
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
        <View style={st.railStatRow}><Text style={[st.railStatN, { color: DermaAtlas.gold }]}>{DERMA_GAP_MODULOS.length}</Text><Text style={st.railStatT}>módulos élite (gaps)</Text></View>
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
            <TouchableOpacity key={n.k} activeOpacity={0.85} onPress={() => setSub(n.k)} style={[st.navTab, on && st.navTabOn, Platform.OS === 'web' ? WEB_LINK : null]}>
              <DermaLineIcon name={n.icon} size={15} color={on ? PURPLE : Colors.muted} />
              <Text style={[st.navTabTxt, on && { color: Colors.onSurface }]}>{n.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {sub === 'hoy' ? <DermaTodayPlan tone={tone} />
        : sub === 'atlas' ? <AtlasView filters={filters} onPick={goCase} tone={tone} />
        : sub === 'dermatoscopia' ? <DermatoscopiaView />
        : sub === 'fuentes' ? <FuentesView /> : (
        <View>
        <GapModulos />

        {/* MEGA STAT — lo que no puedes errar */}
        <MegaStat value={CRITICAS} label="Subtemas CRÍTICOS · lo que no puedes errar" accent={PURPLE}
          footnote={`de ${TOTAL_SUB} subtemas · mapa mental del SPEC (A–G) — la cola día-a-día (bloques propios A–X) vive en la pestaña Hoy`} />

        {/* RINGS */}
        <View style={st.ringRow}>
          <View style={st.ringCard}><RingStat value={DERMA_BLOQUES.length} max={7} label="Bloques" sub="mapa SPEC A–G" accent={PURPLE} /></View>
          <View style={st.ringCard}><RingStat value={CRITICAS} max={TOTAL_SUB} label="Críticos" sub="no errar" accent={DermaAtlas.crit} /></View>
          <View style={st.ringCard}><RingStat value={12} max={12} label="Semanas" sub="protocolo starter" accent={DermaAtlas.gold} /></View>
          <View style={st.ringCard}><RingStat value={8} label="Readiness" sub="currículo" accent={DermaAtlas.teal} suffix="%" /></View>
        </View>

        {/* ESTRATEGIA MAYO */}
        <GlassPanel accent={DermaAtlas.gold} style={{ marginBottom: Spacing.xl, padding: Spacing.lg }}>
          <Text style={st.h3}>Ángulo Mayo</Text>
          <Text style={st.body}>{DERMA_META.estrategiaMayo}</Text>
        </GlassPanel>

        {/* PROTOCOLO 12 SEMANAS */}
        <SectionLabel>Protocolo starter · 12 semanas (días Derma)</SectionLabel>
        <View style={[gridStyle(240), { marginBottom: Spacing.xl }]}>
          {DERMA_FASES.map((f, i) => (
            <View key={i} style={gridItemStyle(240)}>
              <FadeUp delay={i * 70}>
                <View style={[st.faseCard, { borderLeftColor: PURPLE }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                    <Text style={[st.faseTag, { color: PURPLE }]}>{f.fase}</Text>
                    <Chip label={f.semanas} color={Colors.muted} small />
                  </View>
                  <Text style={st.faseFoco}>{f.foco}</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    <Chip label={`bloques ${f.bloques}`} color={PURPLE} small />
                    <Chip label={`deadline ${f.deadline}`} color={Colors.amber} small />
                  </View>
                  <Text style={st.faseCrit}>Críticas nuevas: {f.criticas}</Text>
                </View>
              </FadeUp>
            </View>
          ))}
        </View>

        {/* BLOQUES A–G (currículo) */}
        <SectionLabel>Mapa mental del SPEC · bloques A–G (≠ bloques del plan día-a-día de Hoy)</SectionLabel>
        <View style={{ marginBottom: Spacing.xl }}>
          {DERMA_BLOQUES.map((b, i) => (
            <FadeUp key={b.id} delay={i * 40}>
              <View style={st.bloqueCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                    <View style={[st.bloqueDot, { backgroundColor: (BLOQUE_ACCENT[b.id] || PURPLE) }]} />
                    <View style={{ flex: 1 }}>
                      <Text style={st.bloqueTitle}>{b.id} · {b.titulo}</Text>
                      <Text style={st.bloqueNota}>{b.nota}</Text>
                    </View>
                  </View>
                  <Chip label={`${b.subtemas.length} temas`} color={BLOQUE_ACCENT[b.id] || PURPLE} small />
                </View>
                <View style={st.subGrid}>
                  {b.subtemas.map((s) => (
                    <View key={s.code} style={st.subRow}>
                      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: PRIORIDAD_COLOR[s.prioridad], marginRight: 7 }} />
                      <Text style={st.subCode}>{s.code}</Text>
                      <Text style={st.subName} numberOfLines={1}>{s.nombre}</Text>
                      <Text style={[st.subVueltas, { color: PRIORIDAD_COLOR[s.prioridad] }]}>{VUELTAS[s.prioridad]}v</Text>
                    </View>
                  ))}
                </View>
              </View>
            </FadeUp>
          ))}
        </View>

        {/* RECURSOS GRATIS */}
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

        {/* MICRO-HORARIO */}
        <SectionLabel>Micro-horario · sesión de 60 min</SectionLabel>
        <GlassPanel style={{ marginBottom: Spacing.xl }}>
          {DERMA_HORARIO.map((h, i) => (
            <View key={i} style={[st.horRow, i === 0 && { borderTopWidth: 0 }]}>
              <View style={[st.horBadge, { backgroundColor: PURPLE + '1A' }]}><Text style={[st.horFranja, { color: PURPLE }]}>{h.franja}</Text></View>
              <Text style={st.horAct}>{h.act}</Text>
            </View>
          ))}
        </GlassPanel>

        {/* NOTAS */}
        <SectionLabel>Honestidad (acceso / seguridad)</SectionLabel>
        <GlassPanel accent={DermaAtlas.gold} style={{ marginBottom: Spacing.xl }}>
          {DERMA_NOTAS.map((n, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 8, paddingVertical: 5 }}>
              <Text style={{ color: DermaAtlas.gold }}>•</Text>
              <Text style={[st.body, { flex: 1 }]}>{n}</Text>
            </View>
          ))}
        </GlassPanel>
        </View>
        )}
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
