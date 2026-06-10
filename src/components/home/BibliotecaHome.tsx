import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Animated, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { ESTUDIO_LIBROS } from '../../lib/estudioPulsoData';
import { loadBooks, saveBooks, cyclePct } from '../../lib/booksProgress';
import { LIBROS_EXTRA, fraseDelDia } from '../../lib/businessBooksExtra';
import { setNavIntent } from '../../lib/navIntent';

/**
 * BibliotecaHome — "📚 BIBLIOTECA DEL FUNDADOR" en el Home. Los 28 libros del plan
 * Pulso con % LEÍDO REAL por libro (manual: toca el % → +25, empieza 0) agregado por
 * materia, barras animadas, frase-ancla del día (real, de los libros — no bullshit),
 * y acceso directo: cada libro abre su resumen/canal (YouTube real); el header navega
 * a Business → Pulso → Estudio.
 */
const GOLD = '#D9BE8A';
function openUrl(u: string) { Linking.openURL(u).catch(() => {}); }
function todayISO(): string {
  try { const d = new Date(); const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
  catch { return '2026-06-10'; }
}
const CAT_COLOR: Record<string, string> = {
  Peso: '#3FB984', Hormonal: '#E8A0BF', 'Sueño': '#8FB6E8', Mental: '#A78BFA',
  Foco: '#F5A623', Pareja: '#E5708A', Marketing: GOLD, Meta: '#7BB1FF',
};
const ytLibro = (titulo: string, autor: string) =>
  'https://www.youtube.com/results?search_query=' + encodeURIComponent(`${titulo} ${autor} resumen`);

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

function CatCard({ cat, books, prog, onCycle, delay }: {
  cat: string; books: typeof ESTUDIO_LIBROS; prog: Record<number, number>;
  onCycle: (n: number) => void; delay: number;
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const c = CAT_COLOR[cat] || GOLD;
  const pct = Math.round(books.reduce((s, b) => s + (prog[b.n] || 0), 0) / books.length);
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 400, delay, useNativeDriver: false }).start();
  }, []);
  const webHover = Platform.OS === 'web' ? { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } : {};
  return (
    <Animated.View style={{ opacity: fade, transform: [{ translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }] }}>
      <View {...(webHover as any)} style={[st.catCard, { borderLeftColor: c }, hover && { borderColor: c + '66', transform: [{ scale: 1.01 }] }]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen((o) => !o)}>
          <View style={st.catHead}>
            <Text style={st.catName}>{open ? '▾' : '▸'} {cat}</Text>
            <Text style={st.catCount}>{books.length} libros</Text>
            <Text style={[st.catPct, { color: c }]}>{pct}%</Text>
          </View>
          <AnimBar pct={pct} color={c} />
        </TouchableOpacity>
        {open && books.map((b) => {
          const p = prog[b.n] || 0;
          const extra = LIBROS_EXTRA[b.n];
          return (
            <View key={b.n} style={st.libRow}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => onCycle(b.n)} style={[st.pctChip, { borderColor: c + '66', backgroundColor: p >= 100 ? c : c + (p > 0 ? '22' : '08') }]} hitSlop={{ top: 6, bottom: 6 }}>
                <Text style={[st.pctTxt, { color: p >= 100 ? '#081325' : c }]}>{p}%</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={{ flex: 1 }} onPress={() => openUrl(extra?.recursos?.[0]?.url || ytLibro(b.libro, b.autor))}>
                <Text style={[st.libName, p >= 100 && { textDecorationLine: 'line-through', color: Colors.muted }]} numberOfLines={1}>
                  {b.libro} <Text style={st.libAutor}>· {b.autor}</Text>
                </Text>
                <Text style={st.libOut} numberOfLines={1}>{extra?.frase || b.output}</Text>
              </TouchableOpacity>
              <Text style={[st.libGo, { color: c }]}>▶</Text>
            </View>
          );
        })}
      </View>
    </Animated.View>
  );
}

export default function BibliotecaHome({ onGo }: { onGo?: (screen: string) => void }) {
  const [prog, setProg] = useState<Record<number, number>>(() => loadBooks());
  const cats: string[] = [];
  for (const l of ESTUDIO_LIBROS) if (!cats.includes(l.categoria)) cats.push(l.categoria);
  const total = Math.round(ESTUDIO_LIBROS.reduce((s, b) => s + (prog[b.n] || 0), 0) / ESTUDIO_LIBROS.length);
  const frase = fraseDelDia(todayISO());
  const fraseLibro = frase ? ESTUDIO_LIBROS.find((l) => l.n === frase.libro) : undefined;
  const cycle = (n: number) => setProg((prev) => {
    const next = { ...prev, [n]: cyclePct(prev[n] || 0) };
    saveBooks(next);
    return next;
  });

  return (
    <View style={st.wrap}>
      <View style={st.head}>
        <Text style={st.title}>📚 BIBLIOTECA DEL FUNDADOR</Text>
        <Text style={[st.totalPct, { color: GOLD }]}>{total}%</Text>
        <TouchableOpacity activeOpacity={0.8} style={st.goBtn}
          onPress={() => { setNavIntent('estudio-pulso'); onGo?.('Empresa'); }}>
          <Text style={st.goBtnTxt}>Plan 96 días →</Text>
        </TouchableOpacity>
      </View>

      {/* Frase-ancla del día (real, de los libros) */}
      {frase && fraseLibro && (
        <View style={[st.quoteCard, { borderLeftColor: CAT_COLOR[fraseLibro.categoria] || GOLD }]}>
          <Text style={st.quoteTxt}>“{frase.frase}”</Text>
          <Text style={st.quoteSrc}>— {fraseLibro.libro} · {fraseLibro.autor}</Text>
        </View>
      )}

      <View style={st.grid}>
        {cats.map((cat, i) => (
          <View key={cat} style={st.gridItem}>
            <CatCard cat={cat} books={ESTUDIO_LIBROS.filter((l) => l.categoria === cat)} prog={prog} onCycle={cycle} delay={i * 60} />
          </View>
        ))}
      </View>
      <Text style={st.nota}>% leído REAL (empieza en 0) · toca el % de un libro = +25 · toca el título = resumen en YouTube · 28 libros del plan Pulso</Text>
    </View>
  );
}

const st = StyleSheet.create({
  wrap: { marginBottom: 12 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  title: { fontSize: 12, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.2 },
  totalPct: { fontSize: 16, fontWeight: '900' },
  goBtn: { marginLeft: 'auto', borderWidth: 1, borderColor: GOLD + '88', backgroundColor: GOLD + '14', borderRadius: BorderRadius.full, paddingVertical: 4, paddingHorizontal: 12 },
  goBtnTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: GOLD },

  quoteCard: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder, borderLeftWidth: 3, padding: Spacing.md, marginBottom: 8 },
  quoteTxt: { fontSize: FontSize.bodyMd, color: Colors.onSurface, fontStyle: 'italic', lineHeight: 20 },
  quoteSrc: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  gridItem: { flexGrow: 1, flexBasis: 280, minWidth: 260 },

  catCard: { backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: DesktopColors.glassBorder, borderLeftWidth: 3, padding: Spacing.md },
  catHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 7 },
  catName: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.onSurface, flex: 1 },
  catCount: { fontSize: 9, color: Colors.muted },
  catPct: { fontSize: FontSize.labelLg, fontWeight: '900' },
  barTrack: { height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  barFill: { height: 6, borderRadius: 3 },

  libRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', marginTop: 6 },
  pctChip: { borderWidth: 1, borderRadius: BorderRadius.md, paddingVertical: 3, width: 46, alignItems: 'center' },
  pctTxt: { fontSize: 10, fontWeight: '800' },
  libName: { fontSize: FontSize.labelMd, fontWeight: '600', color: Colors.onSurface },
  libAutor: { fontSize: 10, color: Colors.muted, fontWeight: '400' },
  libOut: { fontSize: 9, color: Colors.muted, marginTop: 1 },
  libGo: { fontSize: 11, width: 14, textAlign: 'center' },

  nota: { fontSize: 9, color: Colors.muted, marginTop: 6 },
});
