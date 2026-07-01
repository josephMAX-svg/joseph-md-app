import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Animated, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Hairline } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { BIBLIOTECA_NIVELES, BIBLIOTECA_LIBROS, BibCategoria, BibNivel, BibLibro } from '../../lib/bibliotecaNiveles';
import { ESTUDIO_LIBROS } from '../../lib/estudioPulsoData';
import { loadBooks, saveBooks, cyclePct } from '../../lib/booksProgress';
import { fraseDelDia } from '../../lib/businessBooksExtra';
import { setNavIntent } from '../../lib/navIntent';
import { esCanon, ideaDeLaSemana } from '../../lib/homeBriefing';

/**
 * BibliotecaHome — "MENTOR DECK · BIBLIOTECA DEL FUNDADOR" del cockpit. Los 86 libros
 * por NIVELES (Base→Maestría) reencuadrados como el CONSEJO DE MENTORES del operador:
 * cita-hero editorial (serif itálica + sello ORO), idea de la SEMANA (ligada a la fase),
 * y un marcador CANON (★) sobre el núcleo no-negociable. % LEÍDO REAL por libro (manual)
 * agregado por categoría, barras animadas, 🎧 Spotify · ▶ YouTube · 🛒 Comprar.
 * El header navega a Business → Pulso → Estudio (plan 96 días).
 */
const GOLD = Colors.gold;
const CHAMPAGNE = Colors.champagne;
const MONO = Platform.OS === 'web' ? "'JetBrains Mono', 'SF Mono', monospace" : undefined;
const SERIF = Platform.OS === 'web' ? "'Georgia', 'Iowan Old Style', 'Times New Roman', serif" : undefined;

function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return '2026-06-16'; }
}
const ytBuscar = (titulo: string, autor: string) =>
  'https://www.youtube.com/results?search_query=' + encodeURIComponent(`${titulo} ${autor} audiolibro`);

const webHoverProps = (set: (v: boolean) => void) =>
  Platform.OS === 'web' ? { onMouseEnter: () => set(true), onMouseLeave: () => set(false) } : {};

/** barra con fill animado (entra al montar) */
function AnimBar({ pct, color }: { pct: number; color: string }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: pct, duration: 700, useNativeDriver: false }).start();
  }, [pct]);
  const width = anim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });
  return (
    <View style={st.barTrack}>
      <Animated.View style={[st.barFill, { width: width as any, backgroundColor: color }]} />
    </View>
  );
}

/** botón de acción de un libro (🎧 / ▶ / 🛒) con feedback hover web + activeOpacity */
function ActionBtn({ label, color, onPress }: { label: string; color: string; onPress: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      {...(webHoverProps(setHover) as any)}
      hitSlop={{ top: 4, bottom: 4, left: 2, right: 2 }}
      style={[
        st.actBtn,
        { borderColor: color + '66', backgroundColor: color + (hover ? '26' : '12') },
        Platform.OS === 'web' ? ({ transition: 'all .15s ease', cursor: 'pointer' } as any) : null,
      ]}
    >
      <Text style={[st.actTxt, { color }]} numberOfLines={1}>{label}</Text>
    </TouchableOpacity>
  );
}

/** una fila de libro: % chip + título·autor (+NUEVO / ★CANON) + botones de acción */
function LibroRow({ b, pct, color, onCycle }: { b: BibLibro; pct: number; color: string; onCycle: (n: number) => void }) {
  const done = pct >= 100;
  const canon = esCanon(b.n);
  return (
    <View style={st.libRow}>
      <View style={st.libTop}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onCycle(b.n)}
          style={[st.pctChip, { borderColor: color + '66', backgroundColor: done ? color : color + (pct > 0 ? '22' : '08') }]}
          hitSlop={{ top: 6, bottom: 6, left: 2, right: 2 }}
        >
          <Text style={[st.pctTxt, { color: done ? '#081325' : color }]}>{pct}%</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <View style={st.libNameRow}>
            {canon && <Text style={st.canonStar}>★</Text>}
            <Text style={[st.libName, done && { textDecorationLine: 'line-through', color: Colors.muted }]} numberOfLines={2}>
              {b.titulo} <Text style={st.libAutor}>· {b.autor}</Text>
            </Text>
            {canon && (
              <View style={[st.canonChip, { borderColor: GOLD + '66', backgroundColor: GOLD + '14' }]}>
                <Text style={[st.canonChipTxt, { color: GOLD }]}>CANON</Text>
              </View>
            )}
            {!b.existente && (
              <View style={[st.newChip, { borderColor: color + '88', backgroundColor: color + '18' }]}>
                <Text style={[st.newChipTxt, { color }]}>NUEVO</Text>
              </View>
            )}
          </View>
          {!!b.porQue && <Text style={st.libWhy} numberOfLines={2}>{b.porQue}</Text>}
        </View>
      </View>
      <View style={st.actRow}>
        {b.audioSpotify ? <ActionBtn label="🎧 Spotify" color={Colors.green} onPress={() => openUrl(b.audioSpotify!)} /> : null}
        <ActionBtn
          label={b.audioYoutube ? '▶ YouTube' : '▶ Buscar'}
          color={Colors.coral}
          onPress={() => openUrl(b.audioYoutube || ytBuscar(b.titulo, b.autor))}
        />
        {b.compraUrl ? <ActionBtn label="🛒 Comprar" color={GOLD} onPress={() => openUrl(b.compraUrl!)} /> : null}
      </View>
    </View>
  );
}

/** bloque de un NIVEL: encabezado (label + objetivo corto) + sus libros */
function NivelBlock({ nv, color, prog, onCycle }: { nv: BibNivel; color: string; prog: Record<number, number>; onCycle: (n: number) => void }) {
  return (
    <View style={st.nivelBlock}>
      <View style={[st.nivelHead, { borderLeftColor: color }]}>
        <Text style={[st.nivelLabel, { color }]}>◆ Nivel {nv.nivel} · {nv.label}</Text>
        {!!nv.objetivo && <Text style={st.nivelObj} numberOfLines={2}>{nv.objetivo}</Text>}
      </View>
      {nv.libros.map((b) => (
        <LibroRow key={b.n} b={b} pct={prog[b.n] || 0} color={color} onCycle={onCycle} />
      ))}
    </View>
  );
}

function CatCard({ cat, prog, onCycle, delay }: {
  cat: BibCategoria; prog: Record<number, number>;
  onCycle: (n: number) => void; delay: number;
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const c = cat.color || GOLD;
  const libros = cat.niveles.flatMap((nv) => nv.libros);
  const pct = libros.length ? Math.round(libros.reduce((s, b) => s + (prog[b.n] || 0), 0) / libros.length) : 0;
  const canonCount = libros.filter((b) => esCanon(b.n)).length;
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 400, delay, useNativeDriver: false }).start();
  }, []);
  return (
    <Animated.View style={{ opacity: fade, transform: [{ translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }] }}>
      <View {...(webHoverProps(setHover) as any)} style={[st.catCard, { borderLeftColor: c }, hover && { borderColor: c + '66', transform: [{ scale: 1.01 }] }]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
          <View style={st.catHead}>
            <Text style={st.catName}>{open ? '▾' : '▸'} {cat.categoria}</Text>
            {canonCount > 0 && <Text style={st.catCanon}>★{canonCount}</Text>}
            <Text style={st.catCount}>{libros.length} libros · {cat.niveles.length} niveles</Text>
            <Text style={[st.catPct, { color: c }]}>{pct}%</Text>
          </View>
          <AnimBar pct={pct} color={c} />
        </TouchableOpacity>
        {open && (
          <View style={st.catBody}>
            {cat.niveles.map((nv) => (
              <NivelBlock key={nv.nivel} nv={nv} color={c} prog={prog} onCycle={onCycle} />
            ))}
          </View>
        )}
      </View>
    </Animated.View>
  );
}

export default function BibliotecaHome({ onGo }: { onGo?: (screen: string) => void }) {
  const [prog, setProg] = useState<Record<number, number>>(() => loadBooks());
  const iso = todayISO();
  const total = BIBLIOTECA_LIBROS.length
    ? Math.round(BIBLIOTECA_LIBROS.reduce((s, b) => s + (prog[b.n] || 0), 0) / BIBLIOTECA_LIBROS.length)
    : 0;
  const frase = fraseDelDia(iso);
  // la frase-ancla viene de LIBROS_EXTRA (n 1..28) → resuélvela contra ESTUDIO_LIBROS
  const fraseLibro = frase ? ESTUDIO_LIBROS.find((l) => l.n === frase.libro) : undefined;
  const idea = ideaDeLaSemana(iso);
  const cycle = (n: number) => setProg((prev) => {
    const next = { ...prev, [n]: cyclePct(prev[n] || 0) };
    saveBooks(next);
    return next;
  });

  return (
    <View style={st.wrap}>
      <View style={st.head}>
        <View style={st.railGold} />
        <Text style={st.title}>MENTOR DECK · BIBLIOTECA DEL FUNDADOR</Text>
        <Text style={[st.totalPct, { color: GOLD }]}>{total}%</Text>
        <TouchableOpacity activeOpacity={0.8} style={st.goBtn}
          onPress={() => { setNavIntent('estudio-pulso'); onGo?.('Empresa'); }}>
          <Text style={st.goBtnTxt}>Plan 96 días →</Text>
        </TouchableOpacity>
      </View>

      {/* Cita-hero editorial (real, de los libros) + sello ORO */}
      {frase && fraseLibro && (
        <View style={st.heroCard}>
          <Text style={st.heroMark}>“</Text>
          <View style={{ flex: 1 }}>
            <Text style={st.heroQuote}>{frase.frase}</Text>
            <View style={st.heroRule} />
            <Text style={st.heroSrc}>{fraseLibro.libro} · {fraseLibro.autor}</Text>
          </View>
        </View>
      )}

      {/* Idea de la SEMANA — ligada a la fase / doctrina de estudio */}
      <View style={st.ideaCard}>
        <View style={st.ideaHead}>
          <Text style={st.ideaLabel}>IDEA DE LA SEMANA</Text>
          <View style={st.ideaFoco}><Text style={st.ideaFocoTxt}>{idea.foco}</Text></View>
        </View>
        <Text style={st.ideaTxt}>{idea.idea}</Text>
        <Text style={st.ideaSrc}>— {idea.fuente}</Text>
      </View>

      <View style={st.grid}>
        {BIBLIOTECA_NIVELES.map((cat, i) => (
          <View key={cat.categoria} style={st.gridItem}>
            <CatCard cat={cat} prog={prog} onCycle={cycle} delay={i * 60} />
          </View>
        ))}
      </View>
      <Text style={st.nota}>★ CANON = núcleo no-negociable del founder · % leído REAL (empieza en 0) · toca el % = +25 · 🎧 Spotify · ▶ YouTube · 🛒 Comprar · {BIBLIOTECA_LIBROS.length} libros · base→élite por niveles</Text>
    </View>
  );
}

const st = StyleSheet.create({
  wrap: { marginBottom: 12 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  railGold: { width: 3, height: 13, borderRadius: 2, backgroundColor: GOLD },
  title: { fontSize: 12, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.4, fontFamily: MONO, flexShrink: 1 },
  totalPct: { fontSize: 16, fontWeight: '900', fontVariant: ['tabular-nums'] },
  goBtn: { marginLeft: 'auto', borderWidth: 1, borderColor: GOLD + '88', backgroundColor: GOLD + '14', borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 12 },
  goBtnTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: GOLD },

  // ── cita-hero editorial ──
  heroCard: {
    flexDirection: 'row', gap: 6,
    backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl,
    borderWidth: 1, borderColor: Hairline.soft,
    borderLeftWidth: 2, borderLeftColor: Hairline.accentSoft,
    padding: Spacing.lg, marginBottom: 8,
  },
  heroMark: { fontSize: 40, lineHeight: 40, color: GOLD, fontFamily: SERIF, marginTop: -4, opacity: 0.7 } as any,
  heroQuote: { fontSize: 17, lineHeight: 26, color: Colors.onSurface, fontStyle: 'italic', fontWeight: '400', fontFamily: SERIF, letterSpacing: 0.2 } as any,
  heroRule: { width: 34, height: 2, borderRadius: 1, backgroundColor: GOLD, marginTop: 10, marginBottom: 8, opacity: 0.8 },
  heroSrc: { fontSize: FontSize.labelSm, color: CHAMPAGNE, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase' as const },

  // ── idea de la semana ──
  ideaCard: {
    backgroundColor: 'rgba(200,169,106,0.05)', borderRadius: BorderRadius.lg,
    borderWidth: 1, borderColor: Hairline.accentSoft,
    padding: Spacing.md, marginBottom: 10,
  },
  ideaHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 },
  ideaLabel: { fontSize: 9, fontWeight: '800', color: GOLD, letterSpacing: 1.4, fontFamily: MONO },
  ideaFoco: { marginLeft: 'auto', borderRadius: BorderRadius.full, backgroundColor: GOLD + '18', paddingVertical: 2, paddingHorizontal: 8 },
  ideaFocoTxt: { fontSize: 9, fontWeight: '800', color: CHAMPAGNE, letterSpacing: 0.4 },
  ideaTxt: { fontSize: FontSize.bodyMd, color: Colors.onSurface, lineHeight: 20, fontWeight: '500' },
  ideaSrc: { fontSize: 10, color: Colors.muted, marginTop: 5, letterSpacing: 0.2 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  gridItem: { flexGrow: 1, flexBasis: 300, minWidth: 280 },

  catCard: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder, borderLeftWidth: 3, padding: Spacing.md },
  catHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 7 },
  catName: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, flex: 1 },
  catCanon: { fontSize: 10, fontWeight: '900', color: GOLD, letterSpacing: 0.3 },
  catCount: { fontSize: 9, color: Colors.muted },
  catPct: { fontSize: FontSize.labelLg, fontWeight: '900', fontVariant: ['tabular-nums'] },
  barTrack: { height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  barFill: { height: 6, borderRadius: 3 },

  // niveles
  catBody: { marginTop: 8 },
  nivelBlock: { marginTop: 6 },
  nivelHead: { borderLeftWidth: 2, paddingLeft: 8, marginBottom: 4, marginTop: 2 },
  nivelLabel: { fontSize: 10, fontWeight: '900', letterSpacing: 0.4 },
  nivelObj: { fontSize: 9, color: Colors.muted, marginTop: 1, lineHeight: 13 },

  // libro
  libRow: { paddingVertical: 7, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', marginTop: 5 },
  libTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  pctChip: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 3, width: 46, alignItems: 'center', marginTop: 1 },
  pctTxt: { fontSize: 10, fontWeight: '800', fontVariant: ['tabular-nums'] },
  libNameRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, flexWrap: 'wrap' },
  canonStar: { fontSize: 11, color: GOLD, fontWeight: '900', marginTop: 1 },
  libName: { fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.onSurface, flex: 1, lineHeight: 16 },
  libAutor: { fontSize: 10, color: Colors.muted, fontWeight: '400' },
  canonChip: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 6, marginTop: 1 },
  canonChipTxt: { fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  newChip: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 6, marginTop: 1 },
  newChipTxt: { fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  libWhy: { fontSize: 9, color: Colors.muted, marginTop: 2, lineHeight: 13 },

  actRow: { flexDirection: 'row', gap: 6, marginTop: 7, marginLeft: 54, flexWrap: 'wrap' },
  actBtn: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 4, paddingHorizontal: 9 },
  actTxt: { fontSize: 10, fontWeight: '700' },

  nota: { fontSize: 9, color: Colors.muted, marginTop: 6 },
});
