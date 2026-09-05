import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Linking } from 'react-native';
import {
  AURUM_META, AURUM_KPIS, AURUM_FASES, AURUM_BIBLIOTECA, AURUM_PROTOCOLO,
  AURUM_NIVEL_META, AURUM_ADVERTENCIAS, AurumMaterial, AurumConfianza,
  AURUM_MINIFASE, AURUM_PRACTICA, AURUM_CLOSER_SCOREBOARD, AURUM_SCOREBOARD_NOTA,
  AurumRubricaStore, AurumRubricaScore, aurumRubricaKey, loadAurumRubrica, saveAurumRubrica,
  AurumScoreboardStore, AurumScoreKey, loadAurumScoreboard, saveAurumScoreboard,
  aurumSemanaISO, aurumSemanaPrev, aurumScoreSemaforo, AURUM_SCOREBOARD_METAS, AURUM_RUBRICA_PITCH,
} from '../../lib/aurumData';
import { AURUM_PLAN_META, AURUM_PITCH_DIAS, AURUM_LIVIANO_DIAS } from '../../lib/aurumDailyPlan';
import { AURUM_BIBLIOTECA_NIVELES, AurumBibLibro } from '../../lib/aurumBiblioteca';
import { loadDone, saveDone, planHoyD, progresoGlobal } from '../../lib/studyProgress';
import { AURUM_DIAS } from '../../lib/aurumDailyPlan';
import AurumTodayPlan, { aurumTodayISO } from './AurumTodayPlan';
import {
  AurumColors as C, AurumRadius as R, AurumSpacing as S, AurumType as T,
  AURUM_AUTHORITIES, withAlpha,
} from '../../theme/aurumTheme';
import { Elevation, Motion, Hairline } from '../../theme/tokens';
import {
  AurumHero, AurumWordmark, AurumChip, AurumLabel, AurumPanel, AurumRing,
  AurumRise, useAurumHover, AurumCloserDesk, AurumScoreboardEditor, AurumPitchChart, CloserCell,
} from './aurumVisuals';

/**
 * AurumHub — "AURUM · El arte de convertir conversaciones en oro" (Business → Pulso).
 * Rediseño PREMIUM (estética Hormozi / acquisition.com): navy profundo + oro, alto
 * contraste, jerarquía de autoridad. TODO el look sale de src/theme/aurumTheme.ts.
 * NO toca data/wiring: PlanKey 'aurum', AURUM_* y la navegación quedan intactos.
 */
const isWeb = Platform.OS === 'web';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }

type Sub = 'hoy' | 'agosto' | 'ruta' | 'biblioteca' | 'protocolo';

const CONF_COLOR: Record<AurumConfianza, string> = {
  verificado: C.success, estable: C.warn, incierto: C.danger,
};
const CONF_LABEL: Record<AurumConfianza, string> = {
  verificado: 'verificado', estable: 'estable', incierto: 'verifica el link',
};

// ── Tarjeta de material (biblioteca / ruta) ─────────────────────────────────
function MaterialCard({ m, badge }: { m: AurumMaterial; badge?: string }) {
  const { hovered, hoverProps } = useAurumHover();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => openUrl(m.url)}
      {...(hoverProps as any)}
      style={[
        st.matCard,
        hovered && isWeb ? ({ borderColor: withAlpha(C.gold, 0.5), backgroundColor: withAlpha(C.gold, 0.05), transform: [{ translateY: -2 }], ...Elevation.md } as any) : null,
        isWeb ? ({ transition: `all ${Motion.base}`, cursor: 'pointer' } as any) : null,
      ]}>
      <View style={st.matTop}>
        <Text style={st.matName} numberOfLines={2}>{m.nombre}</Text>
        <View style={[st.openPill, { borderColor: withAlpha(C.gold, 0.5) }]}>
          <Text style={st.openPillTxt}>abrir ↗</Text>
        </View>
      </View>
      <Text style={st.matRef}>{m.referente}</Text>
      <Text style={st.matWhy}>{m.porQue}</Text>
      <View style={st.matMeta}>
        {badge ? <AurumChip label={badge} color={C.gold} size="sm" /> : null}
        <AurumChip label={m.tipo} color={C.textMute} size="sm" />
        <AurumChip label={m.idioma === 'es' ? 'ES' : 'EN'} color={C.textMute} size="sm" />
        <AurumChip label={CONF_LABEL[m.confianza]} color={CONF_COLOR[m.confianza]} size="sm" />
      </View>
    </TouchableOpacity>
  );
}

// ── RUTA — roadmap de 7 fases como timeline vertical elegante ────────────────
function RutaView({ done }: { done: Set<number> }) {
  return (
    <View>
      <AurumLabel>Ruta · de vendedor a closer de élite (el orden importa)</AurumLabel>
      <View style={st.timeline}>
        {AURUM_FASES.map((f, i) => {
          const activa = f.estado === 'activa';
          const meta = f.estado === 'meta';
          const acc = activa ? C.gold : meta ? C.success : C.textMute;
          // progreso real de la fase desde los ✓
          const faseDias = AURUM_DIAS.filter((x) => x.faseId === f.id);
          const faseHechos = faseDias.filter((x) => done.has(x.d)).length;
          const pct = faseDias.length ? Math.round((faseHechos / faseDias.length) * 100) : 0;
          const last = i === AURUM_FASES.length - 1;
          return (
            <AurumRise key={f.id} delay={i * 55}>
              <View style={st.tlRow}>
                {/* rail + nodo numerado */}
                <View style={st.tlRail}>
                  <View style={[st.tlNode, { borderColor: acc, backgroundColor: withAlpha(acc, 0.16) }]}>
                    <Text style={[st.tlNodeTxt, { color: acc }]}>{i + 1}</Text>
                  </View>
                  {!last ? <View style={[st.tlLine, { backgroundColor: withAlpha(acc, 0.35) }]} /> : null}
                </View>
                {/* tarjeta de fase */}
                <AurumPanel accent={acc} glow={activa} style={st.faseCard}>
                  <View style={st.faseHead}>
                    <Text style={[st.faseTag, { color: acc }]}>{f.fase} · {f.duracion}</Text>
                    {activa ? <AurumChip label="EMPIEZA AQUÍ" color={C.gold} size="sm" />
                      : meta ? <AurumChip label="META" color={C.success} size="sm" />
                        : pct > 0 ? <AurumChip label={`${pct}%`} color={C.success} size="sm" /> : null}
                  </View>
                  <Text style={st.faseTitle}>{f.titulo}</Text>
                  <Text style={st.faseDesc}>{f.objetivo}</Text>
                  <View style={[st.libroPill, { borderColor: withAlpha(acc, 0.4) }]}>
                    <Text style={[st.libroTxt, { color: acc }]}>📘 ancla · {f.libroAncla}</Text>
                  </View>
                  <Text style={[st.faseEntreg, { color: C.textDim }]}>→ {f.entregable}</Text>
                  <View style={{ marginTop: S.md, gap: S.sm }}>
                    {f.materiales.map((m, j) => <MaterialCard key={j} m={m} />)}
                  </View>
                </AurumPanel>
              </View>
            </AurumRise>
          );
        })}
      </View>
    </View>
  );
}

// ── Botón de acción de un libro (🎧 / ▶ / 🛒) — mismo formato que la Biblioteca del Home ──
const ytBuscar = (titulo: string, autor: string) =>
  'https://www.youtube.com/results?search_query=' + encodeURIComponent(`${titulo} ${autor} audiolibro`);

function BibActionBtn({ label, color, onPress }: { label: string; color: string; onPress: () => void }) {
  const { hovered, hoverProps } = useAurumHover();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      {...(hoverProps as any)}
      hitSlop={{ top: 4, bottom: 4, left: 2, right: 2 }}
      style={[
        st.bibActBtn,
        { borderColor: withAlpha(color, hovered ? 0.7 : 0.5), backgroundColor: withAlpha(color, hovered ? 0.22 : 0.1) },
        isWeb ? ({ transition: `all ${Motion.fast}`, cursor: 'pointer' } as any) : null,
      ]}>
      <Text style={[st.bibActTxt, { color }]} numberOfLines={1}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── Tarjeta de libro de nivel: título·autor + por_qué + chips terminología + fila 🎧/▶/🛒 ──
function BibLibroCard({ b }: { b: AurumBibLibro }) {
  const { hovered, hoverProps } = useAurumHover();
  return (
    <View
      {...(hoverProps as any)}
      style={[
        st.bibCard,
        hovered && isWeb ? ({ borderColor: withAlpha(C.gold, 0.5), backgroundColor: withAlpha(C.gold, 0.05), transform: [{ translateY: -2 }], ...Elevation.md } as any) : null,
        isWeb ? ({ transition: `all ${Motion.base}` } as any) : null,
      ]}>
      <View style={st.bibTop}>
        <Text style={st.bibName} numberOfLines={3}>
          {b.titulo} <Text style={st.bibAutor}>· {b.autor}</Text>
        </Text>
        <AurumChip label={b.idioma === 'es' ? 'ES' : 'EN'} color={C.textMute} size="sm" />
      </View>
      {!!b.porQue ? <Text style={st.bibWhy} numberOfLines={3}>{b.porQue}</Text> : null}
      {b.terminologia.length ? (
        <View style={st.bibTermRow}>
          {b.terminologia.slice(0, 4).map((t, i) => (
            <View key={i} style={st.bibTerm}>
              <Text style={st.bibTermTxt} numberOfLines={1}>{t}</Text>
            </View>
          ))}
        </View>
      ) : null}
      <View style={st.bibActRow}>
        {b.audioSpotify ? <BibActionBtn label="🎧 Spotify" color="#1DB954" onPress={() => openUrl(b.audioSpotify!)} /> : null}
        <BibActionBtn
          label={b.audioYoutube ? '▶ YouTube' : '▶ Buscar'}
          color={C.danger}
          onPress={() => openUrl(b.audioYoutube || ytBuscar(b.titulo, b.autor))}
        />
        {b.compraUrl ? <BibActionBtn label="🛒 Comprar" color={C.goldSoft} onPress={() => openUrl(b.compraUrl!)} /> : null}
      </View>
    </View>
  );
}

// ── Biblioteca por NIVELES de AURUM (Mentalidad → Cierre high-ticket) ────────
function BibliotecaNiveles({ isDesktop }: { isDesktop: boolean }) {
  const cols = isDesktop ? 2 : 1;
  const totalLibros = AURUM_BIBLIOTECA_NIVELES.reduce((s, nv) => s + nv.libros.length, 0);
  return (
    <View style={{ marginBottom: S['2xl'] }}>
      <AurumLabel>Biblioteca por niveles · {totalLibros} libros · mentalidad → cierre high-ticket · 🎧 Spotify · ▶ YouTube · 🛒 Comprar</AurumLabel>
      {AURUM_BIBLIOTECA_NIVELES.map((nv, i) => (
        <AurumRise key={nv.nivel} delay={i * 45}>
          <View style={st.nivelBlock}>
            <View style={st.nivelHead}>
              <View style={[st.nivelNum, { borderColor: withAlpha(C.gold, 0.5), backgroundColor: withAlpha(C.gold, 0.14) }]}>
                <Text style={st.nivelNumTxt}>{nv.nivel}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={st.nivelLabel}>{nv.label.replace(/^Nivel \d+ - /, '')}</Text>
                {!!nv.objetivo ? <Text style={st.nivelObj} numberOfLines={3}>{nv.objetivo}</Text> : null}
              </View>
              <AurumChip label={`${nv.libros.length}`} color={C.gold} size="sm" />
            </View>
            <View style={[st.grid, isWeb ? ({ gridTemplateColumns: `repeat(${cols}, 1fr)` } as any) : null]}>
              {nv.libros.map((b, j) => (
                <View key={j} style={isWeb ? null : { width: '100%' }}>
                  <BibLibroCard b={b} />
                </View>
              ))}
            </View>
          </View>
        </AurumRise>
      ))}
    </View>
  );
}

// ── BIBLIOTECA — niveles premium arriba + contenido GRATIS por categoría ─────
function BibliotecaView({ isDesktop }: { isDesktop: boolean }) {
  const cols = isDesktop ? 2 : 1;
  return (
    <View>
      <BibliotecaNiveles isDesktop={isDesktop} />
      <AurumLabel>Biblioteca · solo contenido GRATIS de los referentes #1 (cero cursos pagos)</AurumLabel>
      {AURUM_BIBLIOTECA.map((cat, i) => (
        <AurumRise key={i} delay={i * 45}>
          <View style={{ marginBottom: S['2xl'] }}>
            <View style={st.catHead}>
              <Text style={st.catIcon}>{cat.icon}</Text>
              <Text style={st.catTitle}>{cat.categoria}</Text>
              <AurumChip label={`${cat.items.length}`} color={C.gold} size="sm" />
            </View>
            <View style={[st.grid, isWeb ? ({ gridTemplateColumns: `repeat(${cols}, 1fr)` } as any) : null]}>
              {cat.items.map((m, j) => (
                <View key={j} style={isWeb ? null : { width: '100%' }}>
                  <MaterialCard m={m} />
                </View>
              ))}
            </View>
          </View>
        </AurumRise>
      ))}
    </View>
  );
}

// ── PROTOCOLO — horario + nivel meta + honestidad ───────────────────────────
function ProtocoloView() {
  return (
    <View>
      <AurumLabel>Protocolo · núcleo en {AURUM_PLAN_META.ventana} (L-V) + lectura en tus huecos · sáb/dom libres</AurumLabel>
      <AurumPanel accent={C.gold} glow style={{ marginBottom: S['2xl'] }}>
        {AURUM_PROTOCOLO.map((h, i) => {
          const audio = h.formato.includes('audio');
          const acc = i === 1 ? C.pracAccent : audio ? C.lecturaAccent : C.gold;
          return (
            <View key={i} style={[st.horRow, i === 0 && { borderTopWidth: 0 }]}>
              <View style={[st.horBadge, { backgroundColor: withAlpha(acc, 0.14), borderColor: withAlpha(acc, 0.4) }]}>
                <Text style={[st.horMin, { color: acc }]}>{h.min}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={st.horBloque}>{h.bloque}</Text>
                <Text style={st.horQue}>{h.que}</Text>
              </View>
              <AurumChip label={h.formato} color={acc} size="sm" />
            </View>
          );
        })}
      </AurumPanel>

      <AurumLabel>El nivel meta · los entregables (PITCH v1→v7) que demuestran que eres closer</AurumLabel>
      <AurumPanel accent={C.gold} style={{ marginBottom: S.lg }}>
        <Text style={[st.body, { color: C.text, fontWeight: T.weight.bold, marginBottom: 4 }]}>Rúbrica del PITCH · 6 ítems 0-2 (score /12) en los 7 viernes de cierre de fase</Text>
        <Text style={st.body}>{AURUM_PITCH_DIAS.map((p) => `v${p.pitch}=D${p.d} (${p.fecha.slice(8, 10)}-${p.fecha.slice(5, 7)}${p.liviano ? ' +LIVIANO' : ''})`).join(' · ')}</Text>
        {AURUM_RUBRICA_PITCH.map((it, i) => (
          <View key={it.key} style={st.warnRow}>
            <Text style={{ color: C.gold, fontWeight: T.weight.extrabold }}>{i + 1}</Text>
            <Text style={[st.body, { flex: 1 }]}><Text style={{ color: C.text, fontWeight: T.weight.bold }}>{it.label}</Text> — 0: {it.n0} · 1: {it.n1} · 2: {it.n2}</Text>
          </View>
        ))}
        <Text style={[st.body, { marginTop: 6, color: C.textMute }]}>Variante LIVIANO (venta ética de un programa médico, mismo paciente que la Academia): 1 de cada 5 drills en F3-F6 → D{AURUM_LIVIANO_DIAS.join(', D')}. Verde ≥ 10/12 · ámbar 7-9 · rojo {'<'} 7.</Text>
      </AurumPanel>
      <AurumPanel style={{ marginBottom: S['2xl'] }}>
        {AURUM_NIVEL_META.map((n, i) => (
          <View key={i} style={st.metaRow}>
            <View style={[st.metaDot, { backgroundColor: withAlpha(C.gold, 0.16), borderColor: withAlpha(C.gold, 0.5) }]}>
              <Text style={st.metaDotTxt}>{i + 1}</Text>
            </View>
            <Text style={[st.body, { flex: 1 }]}>
              <Text style={{ fontWeight: T.weight.bold, color: C.text }}>{n.skill}</Text> — {n.fuente}
            </Text>
          </View>
        ))}
      </AurumPanel>

      <AurumLabel>Honestidad (no inventado)</AurumLabel>
      <AurumPanel accent={C.warn} style={{ marginBottom: S['2xl'] }}>
        {AURUM_ADVERTENCIAS.map((a, i) => (
          <View key={i} style={st.warnRow}>
            <Text style={{ color: C.warn, fontWeight: T.weight.extrabold }}>•</Text>
            <Text style={[st.body, { flex: 1 }]}>{a}</Text>
          </View>
        ))}
      </AurumPanel>
    </View>
  );
}

// ── SUB-NAV pill premium ─────────────────────────────────────────────────────
function NavPill({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const { hovered, hoverProps } = useAurumHover();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      {...(hoverProps as any)}
      style={[
        st.navPill,
        active ? { backgroundColor: withAlpha(C.gold, 0.16), borderColor: withAlpha(C.gold, 0.6), ...Elevation.glow(withAlpha(C.gold, 0.28)) } : null,
        !active && hovered && isWeb ? ({ borderColor: withAlpha(C.gold, 0.3), backgroundColor: withAlpha('#FFFFFF', 0.05) } as any) : null,
        isWeb ? ({ transition: `all ${Motion.base}`, cursor: 'pointer' } as any) : null,
      ]}>
      <Text style={[st.navPillTxt, active && { color: C.text, fontWeight: T.weight.extrabold }]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── AGOSTO — mini-fase AI-first (medible) + práctica deliberada ─────────────
function MiniFaseView() {
  const mf = AURUM_MINIFASE; const pr = AURUM_PRACTICA;
  return (
    <View>
      <AurumLabel>🚀 Mini-Fase AGOSTO · {mf.titulo}</AurumLabel>
      <AurumPanel accent={C.gold} glow style={{ marginBottom: S['2xl'] }}>
        <AurumChip label={mf.etiqueta} color={C.gold} size="sm" />
        <Text style={[st.body, { marginTop: S.md }]}>{mf.objetivo}</Text>
        <Text style={[st.body, { marginTop: S.md, color: C.success, fontWeight: T.weight.bold }]}>🎯 Cierre de agosto: {mf.entregableFinal}</Text>
      </AurumPanel>

      <AurumLabel>KPIs medibles (práctica deliberada, no minutos)</AurumLabel>
      <AurumPanel style={{ marginBottom: S['2xl'] }}>
        {mf.kpis.map((k, i) => (
          <View key={i} style={st.warnRow}>
            <Text style={{ color: C.gold, fontWeight: T.weight.extrabold }}>◆</Text>
            <Text style={[st.body, { flex: 1 }]}>{k}</Text>
          </View>
        ))}
      </AurumPanel>

      <AurumLabel>Las 10 semanas · cada una deja un entregable medible</AurumLabel>
      {mf.semanas.map((s, i) => (
        <AurumRise key={i} delay={i * 30}>
          <AurumPanel style={{ marginBottom: S.md }}>
            <AurumChip label={s.rango} color={C.gold} size="sm" />
            <Text style={[st.body, { marginTop: 6, color: C.text, fontWeight: T.weight.bold }]}>{s.foco}</Text>
            <Text style={[st.body, { marginTop: 6, color: C.success }]}>→ {s.entregable}</Text>
            {s.recurso ? <Text style={[st.body, { marginTop: 4, color: C.textMute }]}>📎 {s.recurso}</Text> : null}
          </AurumPanel>
        </AurumRise>
      ))}

      <AurumLabel>La IA es tu coach · práctica deliberada (Peak · Ericsson)</AurumLabel>
      <AurumPanel accent={C.gold} style={{ marginBottom: S['2xl'] }}>
        <Text style={[st.body, { marginBottom: S.sm }]}>{pr.resumen}</Text>
        {pr.principios.map((p, i) => (
          <View key={i} style={st.warnRow}><Text style={{ color: C.gold }}>•</Text><Text style={[st.body, { flex: 1 }]}>{p}</Text></View>
        ))}
      </AurumPanel>

      <AurumLabel>Cómo se MIDE que sí aprendes (sistema calificable)</AurumLabel>
      <AurumPanel style={{ marginBottom: S['2xl'] }}>
        {pr.sistemaMedible.map((s, i) => (
          <View key={i} style={st.warnRow}><Text style={{ color: C.success }}>✓</Text><Text style={[st.body, { flex: 1 }]}>{s}</Text></View>
        ))}
      </AurumPanel>

      <AurumLabel>¿Cuánto comprime la IA el camino al top?</AurumLabel>
      <AurumPanel accent={C.warn} style={{ marginBottom: S['2xl'] }}>
        <Text style={st.body}>{pr.compresion}</Text>
      </AurumPanel>
    </View>
  );
}

export default function AurumHub({ onBack, variant = 'mobile' }: { onBack?: () => void; variant?: 'mobile' | 'desktop' }) {
  const isDesktop = variant === 'desktop';
  const [sub, setSub] = useState<Sub>('hoy');
  const [done, setDone] = useState<Set<number>>(() => new Set(loadDone('aurum')));
  const toggleDone = (d: number) => setDone((prev) => {
    const n = new Set(prev);
    if (n.has(d)) n.delete(d); else n.add(d);
    saveDone('aurum', Array.from(n));
    return n;
  });

  // v3 · rúbrica del PITCH (score por grabación, 'jmd-aurum-rubrica') — compartida con el motor HOY y la gráfica v1→v7
  const [rubrica, setRubrica] = useState<AurumRubricaStore>(() => loadAurumRubrica());
  const saveRubrica = (s: AurumRubricaScore) => setRubrica((prev) => {
    const n = { ...prev, [aurumRubricaKey(s.pitch, s.variante)]: s }; saveAurumRubrica(n); return n;
  });
  const rubricaConDatos = Object.keys(rubrica).length > 0;

  // v3 · Closer Scoreboard EDITABLE por semana ISO ('jmd-aurum-scoreboard-v1') + semáforo contra la meta
  const [scoreboard, setScoreboard] = useState<AurumScoreboardStore>(() => loadAurumScoreboard());
  const semanaHoy = aurumSemanaISO();
  const [semanaSel, setSemanaSel] = useState<string>(semanaHoy);
  const [editScore, setEditScore] = useState(false);
  const semValores = scoreboard[semanaSel] || {};
  const semPrev = scoreboard[aurumSemanaPrev(semanaSel)];
  const setScore = (key: AurumScoreKey, valor: number | undefined) => setScoreboard((prev) => {
    const fila = { ...(prev[semanaSel] || {}) };
    if (valor == null) delete fila[key]; else fila[key] = valor;
    const n = { ...prev, [semanaSel]: fila };
    if (!Object.keys(fila).length) delete n[semanaSel];
    saveAurumScoreboard(n); return n;
  });
  const fmtScore = (key: AurumScoreKey, v: number | undefined): string => {
    if (v == null) return AURUM_SCOREBOARD_METAS[key].tipo === 'pct' ? '—' : AURUM_SCOREBOARD_METAS[key].tipo === 'soles' ? 'S/ 0' : '0';
    return AURUM_SCOREBOARD_METAS[key].tipo === 'pct' ? `${v}%` : AURUM_SCOREBOARD_METAS[key].tipo === 'soles' ? `S/ ${v.toLocaleString('es-PE')}` : String(v);
  };
  const closerMetrics: CloserCell[] = AURUM_CLOSER_SCOREBOARD.map((m) => {
    const key = m.key as AurumScoreKey;
    const v = semValores[key];
    return { ...m, valor: fmtScore(key, v), meta: AURUM_SCOREBOARD_METAS[key]?.label || m.meta, estado: aurumScoreSemaforo(key, v, semPrev ? semPrev[key] : undefined) };
  });
  const semanasRegistradas = Object.keys(scoreboard).length;

  // KPIs REALES desde el progreso + el calendario
  const hoyD = planHoyD(AURUM_DIAS, aurumTodayISO());
  const glob = progresoGlobal(AURUM_DIAS, done);
  const diaHoy = AURUM_DIAS.find((x) => x.d === hoyD) || AURUM_DIAS[0];
  const semanaActual = diaHoy.semana;
  const faseActual = AURUM_DIAS.filter((x) => x.faseId === diaHoy.faseId);
  const faseHechos = faseActual.filter((x) => done.has(x.d)).length;
  const fasePct = faseActual.length ? Math.round((faseHechos / faseActual.length) * 100) : 0;
  // racha real: días ✓ consecutivos terminando en hoy (o ayer)
  const racha = (() => {
    let d = done.has(hoyD) ? hoyD : hoyD - 1; let n = 0;
    while (d >= 1 && done.has(d)) { n++; d--; } return n;
  })();

  return (
    <View>
      {onBack ? (
        <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={st.breadcrumb}>
          <Text style={st.breadcrumbText}>‹ Pulso</Text>
          <Text style={st.breadcrumbSep}>/ AURUM</Text>
        </TouchableOpacity>
      ) : null}

      {/* ───── HERO ───── */}
      <AurumHero gradient="hero" style={{ marginBottom: S.xl }}>
        <View style={[st.heroInner, isDesktop && { flexDirection: 'row', alignItems: 'flex-start' }]}>
          <View style={{ flex: 1, minWidth: 260 }}>
            <AurumWordmark size={isDesktop ? T.size.mega : 42} />
            <Text style={st.heroTagline}>El arte de convertir conversaciones en oro</Text>
            <Text style={st.heroTesis}>
              Método de los REALES — los que vendieron y construyeron antes de enseñar — aplicado a
              ALLPA (terrenos) y Qori Golden. 26 semanas, ventana {AURUM_PLAN_META.ventana} L-V: ver + practicar tu pitch.
            </Text>
            {/* chips de autoridad — referentes reales */}
            <View style={st.authRow}>
              {AURUM_AUTHORITIES.map((a, i) => (
                <View key={a} style={st.authChip}>
                  <Text style={st.authTxt}>{a}</Text>
                  {i < AURUM_AUTHORITIES.length - 1 ? <Text style={st.authSep}>·</Text> : null}
                </View>
              ))}
            </View>
          </View>
          {/* sello HOY */}
          <View style={[st.todaySeal, isDesktop ? { marginLeft: S.xl } : { marginTop: S.lg }]}>
            <Text style={st.todayLabel}>HOY · {AURUM_PLAN_META.ventana}</Text>
            <Text style={st.todayValue}>{diaHoy.min}'</Text>
            <Text style={st.todaySub}>núcleo · ver + practicar</Text>
          </View>
        </View>
      </AurumHero>

      {/* ───── CLOSER SCOREBOARD (KPIs high-ticket · el "closer desk") — EDITABLE por semana ───── */}
      <AurumCloserDesk
        metrics={closerMetrics}
        nota={AURUM_SCOREBOARD_NOTA}
        hint={`semana ${semanaSel}${semanaSel === semanaHoy ? ' (actual)' : ''} · ${semanasRegistradas ? `${semanasRegistradas} sem. registradas` : 'registro manual · empieza 0'}`}
        onEdit={() => setEditScore((v) => !v)}
      />
      {editScore ? (
        <AurumScoreboardEditor
          semana={semanaSel}
          values={semValores}
          prev={semPrev}
          esActual={semanaSel === semanaHoy}
          onChange={setScore}
          onPrevSemana={() => setSemanaSel((s) => aurumSemanaPrev(s))}
          onNextSemana={() => setSemanaSel((s) => {
            // avanzar una semana ISO: jueves de la semana s + 7 días
            const m = /^(\d{4})-W(\d{2})$/.exec(s); if (!m) return s;
            const jan4 = new Date(Date.UTC(+m[1], 0, 4)); const day = jan4.getUTCDay() || 7;
            const mon = new Date(jan4); mon.setUTCDate(jan4.getUTCDate() - day + 1 + (+m[2] - 1) * 7 + 7);
            return aurumSemanaISO(new Date(mon.getUTCFullYear(), mon.getUTCMonth(), mon.getUTCDate()));
          })}
        />
      ) : null}

      {/* ───── PITCH v1→v7 · score de rúbrica por grabación ───── */}
      {rubricaConDatos || sub === 'protocolo' ? <AurumPitchChart store={rubrica} /> : null}

      {/* ───── KPIs (anillos reales) ───── */}
      <View style={[st.kpiRow, isDesktop && { flexWrap: 'nowrap' }]}>
        <View style={st.kpiCard}><AurumRing value={hoyD} max={AURUM_PLAN_META.totalDias} label="Día" sub={`/ ${AURUM_PLAN_META.totalDias} · L-V`} accent={C.gold} /></View>
        <View style={st.kpiCard}><AurumRing value={semanaActual} max={AURUM_PLAN_META.semanas} label="Semana" sub={`/ ${AURUM_PLAN_META.semanas}`} accent={C.lecturaAccent} /></View>
        <View style={st.kpiCard}><AurumRing value={fasePct} max={100} label={diaHoy.faseId.toUpperCase()} sub="fase actual" accent={C.success} suffix="%" /></View>
        <View style={st.kpiCard}><AurumRing value={racha} max={Math.max(7, racha)} label="Racha" sub="días ✓ seguidos" accent={C.pracAccent} /></View>
      </View>

      {/* motor */}
      <AurumPanel accent={C.gold} style={{ marginBottom: S.lg }}>
        <Text style={st.motorTitle}>⚙ Motor día a día · {glob.hechos}/{glob.total} misiones ({glob.pct}%)</Text>
        <Text style={st.body}>{AURUM_META.nota}</Text>
      </AurumPanel>

      {/* ───── SUB-NAV ───── */}
      <View style={st.navRow}>
        <NavPill label="⚡ Hoy" active={sub === 'hoy'} onPress={() => setSub('hoy')} />
        <NavPill label="🚀 Agosto" active={sub === 'agosto'} onPress={() => setSub('agosto')} />
        <NavPill label="◈ Ruta" active={sub === 'ruta'} onPress={() => setSub('ruta')} />
        <NavPill label="⌘ Biblioteca" active={sub === 'biblioteca'} onPress={() => setSub('biblioteca')} />
        <NavPill label="🧭 Protocolo" active={sub === 'protocolo'} onPress={() => setSub('protocolo')} />
      </View>

      {sub === 'hoy' && <AurumTodayPlan done={done} onToggle={toggleDone} isDesktop={isDesktop} rubrica={rubrica} onSaveRubrica={saveRubrica} />}
      {sub === 'agosto' && <MiniFaseView />}
      {sub === 'ruta' && <RutaView done={done} />}
      {sub === 'biblioteca' && <BibliotecaView isDesktop={isDesktop} />}
      {sub === 'protocolo' && <ProtocoloView />}
    </View>
  );
}

const st = StyleSheet.create({
  breadcrumb: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: S.md, alignSelf: 'flex-start' },
  breadcrumbText: { fontSize: T.size.caption, color: C.gold, fontWeight: T.weight.bold },
  breadcrumbSep: { fontSize: T.size.caption, color: C.textMute },

  // hero
  heroInner: { gap: S.lg },
  heroTagline: { fontSize: T.size.subtitle, fontWeight: T.weight.bold, color: C.goldSoft, marginTop: S.sm, letterSpacing: 0.4, lineHeight: 22 },
  heroTesis: { fontSize: T.size.body, color: C.textDim, marginTop: S.md, lineHeight: 22, maxWidth: 560 },
  authRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginTop: S.lg, rowGap: 4 },
  authChip: { flexDirection: 'row', alignItems: 'center' },
  authTxt: { fontSize: T.size.caption, fontWeight: T.weight.extrabold, color: C.goldSoft, letterSpacing: 0.3 },
  authSep: { fontSize: T.size.caption, color: withAlpha(C.gold, 0.5), marginHorizontal: 7 },
  todaySeal: {
    borderWidth: 1, borderColor: withAlpha(C.gold, 0.5), backgroundColor: withAlpha(C.gold, 0.12),
    borderRadius: R.lg, paddingVertical: S.md, paddingHorizontal: S.lg, alignItems: 'center', minWidth: 132,
    ...Elevation.glow(withAlpha(C.gold, 0.4)),
  },
  todayLabel: { fontSize: T.size.nano, fontWeight: T.weight.extrabold, color: C.textMute, letterSpacing: 1.2 },
  todayValue: { fontSize: T.size.titleXl, fontWeight: T.weight.black, color: C.goldSoft, marginTop: 3, letterSpacing: T.tracking.tight },
  todaySub: { fontSize: T.size.nano, color: C.textMute, marginTop: 3, textAlign: 'center', letterSpacing: 0.3 },

  // KPIs
  kpiRow: { flexDirection: 'row', flexWrap: 'wrap', gap: S.md, marginBottom: S.lg },
  kpiCard: {
    flexGrow: 1, flexBasis: 150, backgroundColor: C.bgElevated, borderRadius: R.lg,
    paddingVertical: S.xl, alignItems: 'center', borderWidth: 1, borderColor: Hairline.medium,
    ...Elevation.sm,
  },

  motorTitle: { fontSize: T.size.subtitle, fontWeight: T.weight.extrabold, color: C.text, marginBottom: 6, letterSpacing: 0.2 },
  body: { fontSize: T.size.body, color: C.textDim, lineHeight: 22 },

  // sub-nav
  navRow: { flexDirection: 'row', gap: S.sm, marginBottom: S.xl, flexWrap: 'wrap' },
  navPill: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16,
    borderRadius: R.md, borderWidth: 1, borderColor: Hairline.soft, backgroundColor: withAlpha('#FFFFFF', 0.03),
  },
  navPillTxt: { fontSize: T.size.body, fontWeight: T.weight.semibold, color: C.textMute, letterSpacing: 0.2 },

  // timeline / ruta
  timeline: {},
  tlRow: { flexDirection: 'row', gap: S.md, marginBottom: S.lg },
  tlRail: { alignItems: 'center', width: 34 },
  tlNode: { width: 34, height: 34, borderRadius: 17, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  tlNodeTxt: { fontSize: T.size.body, fontWeight: T.weight.black },
  tlLine: { width: 2, flex: 1, marginTop: 4, borderRadius: 1 },
  faseCard: { flex: 1, padding: S.lg, marginBottom: 0 },
  faseHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 },
  faseTag: { fontSize: T.size.caption, fontWeight: T.weight.extrabold, letterSpacing: 1.1 },
  faseTitle: { fontSize: T.size.title, fontWeight: T.weight.extrabold, color: C.text, marginTop: 7, letterSpacing: T.tracking.tight, lineHeight: 25 },
  faseDesc: { fontSize: T.size.bodySm, color: C.textDim, marginTop: 5, lineHeight: 19 },
  libroPill: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: R.sm, paddingVertical: 3, paddingHorizontal: 9, marginTop: S.md },
  libroTxt: { fontSize: T.size.micro, fontWeight: T.weight.bold },
  faseEntreg: { fontSize: T.size.bodySm, fontWeight: T.weight.medium, marginTop: S.sm, lineHeight: 18 },

  // material card
  matCard: { backgroundColor: C.surfaceAlt, borderRadius: R.md, padding: S.md, borderWidth: 1, borderColor: C.border, ...Elevation.sm },
  matTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 },
  matName: { fontSize: T.size.body, fontWeight: T.weight.bold, color: C.text, flex: 1, lineHeight: 19 },
  openPill: { borderWidth: 1, borderRadius: R.pill, paddingVertical: 3, paddingHorizontal: 10 },
  openPillTxt: { fontSize: T.size.micro, fontWeight: T.weight.extrabold, color: C.goldSoft, letterSpacing: 0.3 },
  matRef: { fontSize: T.size.caption, color: C.textDim, marginTop: 6, fontWeight: T.weight.semibold },
  matWhy: { fontSize: T.size.caption, color: C.textMute, marginTop: 5, lineHeight: 17 },
  matMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: S.md, flexWrap: 'wrap' },

  // biblioteca grid
  catHead: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: S.md },
  catIcon: { fontSize: 20 },
  catTitle: { fontSize: T.size.subtitle, fontWeight: T.weight.extrabold, color: C.text, letterSpacing: 0.3, flex: 1 },
  grid: isWeb ? ({ display: 'grid', gap: 12 } as any) : { flexDirection: 'column', gap: 12 },

  // biblioteca por niveles
  nivelBlock: { marginBottom: S.xl },
  nivelHead: { flexDirection: 'row', alignItems: 'flex-start', gap: S.md, marginBottom: S.md },
  nivelNum: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  nivelNumTxt: { fontSize: T.size.body, fontWeight: T.weight.black, color: C.goldSoft },
  nivelLabel: { fontSize: T.size.subtitle, fontWeight: T.weight.extrabold, color: C.text, letterSpacing: 0.2, lineHeight: 21 },
  nivelObj: { fontSize: T.size.caption, color: C.textMute, marginTop: 4, lineHeight: 17 },

  // tarjeta de libro de nivel
  bibCard: { backgroundColor: C.surfaceAlt, borderRadius: R.md, padding: S.md, borderWidth: 1, borderColor: C.border, ...Elevation.sm },
  bibTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 },
  bibName: { fontSize: T.size.body, fontWeight: T.weight.bold, color: C.text, flex: 1, lineHeight: 19 },
  bibAutor: { fontSize: T.size.caption, color: C.textMute, fontWeight: T.weight.regular },
  bibWhy: { fontSize: T.size.caption, color: C.textMute, marginTop: 5, lineHeight: 17 },
  bibTermRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: S.sm },
  bibTerm: { borderWidth: 1, borderColor: C.borderSoft, backgroundColor: withAlpha('#FFFFFF', 0.03), borderRadius: R.xs, paddingVertical: 2, paddingHorizontal: 7, maxWidth: '100%' },
  bibTermTxt: { fontSize: T.size.nano, color: C.textDim, fontWeight: T.weight.medium },
  bibActRow: { flexDirection: 'row', gap: 6, marginTop: S.md, flexWrap: 'wrap' },
  bibActBtn: { borderWidth: 1, borderRadius: R.sm, paddingVertical: 5, paddingHorizontal: 10 },
  bibActTxt: { fontSize: T.size.micro, fontWeight: T.weight.bold },

  // protocolo
  horRow: { flexDirection: 'row', alignItems: 'center', gap: S.md, paddingVertical: 12, borderTopWidth: 1, borderTopColor: Hairline.soft },
  horBadge: { borderRadius: R.sm, borderWidth: 1, paddingVertical: 6, paddingHorizontal: 11, minWidth: 56, alignItems: 'center' },
  horMin: { fontSize: T.size.caption, fontWeight: T.weight.extrabold },
  horBloque: { fontSize: T.size.body, fontWeight: T.weight.bold, color: C.text, letterSpacing: 0.1 },
  horQue: { fontSize: T.size.caption, color: C.textDim, marginTop: 3, lineHeight: 17 },

  // nivel meta
  metaRow: { flexDirection: 'row', gap: 10, paddingVertical: 7, alignItems: 'flex-start' },
  metaDot: { width: 22, height: 22, borderRadius: 11, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  metaDotTxt: { fontSize: T.size.micro, fontWeight: T.weight.black, color: C.goldSoft },
  warnRow: { flexDirection: 'row', gap: 8, paddingVertical: 6 },
});
