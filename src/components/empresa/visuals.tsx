import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import CircularProgress from '../CircularProgress';
import AnimatedCounter from '../AnimatedCounter';
import { useHover, monoText, MonoNumeral, DeltaValue } from './primitives';
import type { HoldingTicker } from '../../lib/empresaData';

/**
 * Visuals del Hub de Empresa — capa de movimiento y dramatismo (estilo VITALS /
 * Hims): hero con gradiente animado, ticker marquee, anillos, charts recharts
 * animados, tiles de marca con shimmer. Todo el movimiento va detrás de
 * Platform.OS === 'web'; en native degrada a estático.
 */

// ── recharts (web-only, require lazy con fallback) ───────────────
let RC: any = null;
try { RC = require('recharts'); } catch {}

// ── Inyección única de keyframes (web) ───────────────────────────
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const id = 'empresa-hub-anims';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
      @keyframes hubSweep { 0%{transform:translateX(-40%)} 100%{transform:translateX(140%)} }
      @keyframes hubShimmer { 0%{opacity:.3} 50%{opacity:.75} 100%{opacity:.3} }
      @keyframes hubMarquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      @keyframes hubFloat { 0%{transform:translateY(0)} 50%{transform:translateY(-3px)} 100%{transform:translateY(0)} }
      @keyframes hubPulse { 0%{box-shadow:0 0 0 0 var(--hub-pulse,rgba(198,165,107,.30))} 70%{box-shadow:0 0 0 14px rgba(198,165,107,0)} 100%{box-shadow:0 0 0 0 rgba(198,165,107,0)} }
      @keyframes hubFadeUp { 0%{opacity:0;transform:translateY(12px)} 100%{opacity:1;transform:translateY(0)} }
      @keyframes hubSpinSlow { 0%{transform:rotate(0)} 100%{transform:rotate(360deg)} }
      @keyframes hubAurora { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(6%,-4%) scale(1.15)} 100%{transform:translate(0,0) scale(1)} }
      @keyframes hubScan { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
      @keyframes hubBreath { 0%{opacity:.5;transform:scale(.95)} 50%{opacity:1;transform:scale(1.05)} 100%{opacity:.5;transform:scale(.95)} }
      @media (prefers-reduced-motion: reduce) {
        [data-hub-anim] { animation: none !important; }
      }
    `;
    document.head.appendChild(s);
  }
}

const isWeb = Platform.OS === 'web';
function webOnly(style: any) { return isWeb ? style : {}; }

// ── Hook: progreso que crece de 0 → target tras montar (draw-in) ──
export function useMountProgress(target: number, delay = 150) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setV(target), delay);
    return () => clearTimeout(id);
  }, [target, delay]);
  return v;
}

// ── GradientHero: hero full-width con barrido animado ────────────
export function GradientHero({
  children, from, to, style,
}: { children: React.ReactNode; from: string; to: string; style?: any }) {
  return (
    <View
      style={[
        styles.hero,
        isWeb
          ? ({ backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` } as any)
          : { backgroundColor: from },
        style,
      ]}
    >
      {/* Barrido de luz animado (web) */}
      {isWeb ? (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, width: '45%',
            backgroundImage: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.10), transparent)',
            animationName: 'hubSweep', animationDuration: '5.5s',
            animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out',
          } as any}
        />
      ) : null}
      <View style={{ position: 'relative' }}>{children}</View>
    </View>
  );
}

// ── KpiTicker: franja marquee de stats (movimiento) ──────────────
export function KpiTicker({ items, accent = Colors.amber }: { items: string[]; accent?: string }) {
  const row = (
    <View style={styles.tickerRow}>
      {items.map((it, i) => (
        <View key={i} style={styles.tickerItem}>
          <View style={[styles.tickerDot, { backgroundColor: accent }]} />
          <Text style={styles.tickerText} numberOfLines={1}>{it}</Text>
        </View>
      ))}
    </View>
  );
  if (!isWeb) {
    return <View style={styles.tickerClip}>{row}</View>;
  }
  return (
    <View style={styles.tickerClip}>
      <View
        style={{ flexDirection: 'row', animationName: 'hubMarquee', animationDuration: '28s', animationIterationCount: 'infinite', animationTimingFunction: 'linear' } as any}
      >
        {row}
        {row}
      </View>
    </View>
  );
}

// ── useHoldingClock: reloj mono (web setInterval 1s; native estático) ────────
function useHoldingClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (!isWeb) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}
function fmtClock(d: Date) {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}
const WK = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
const MO = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
function fmtDate(d: Date) { return `${WK[d.getDay()]} ${String(d.getDate()).padStart(2, '0')} ${MO[d.getMonth()]}`; }

// ── TerminalHeader: masthead denso estilo Bloomberg (wordmark + reloj + estado) ─
export function TerminalHeader({
  wordmark, mercado, madurez, lineas, onCmd,
}: { wordmark: string; mercado: string; madurez: number; lineas: string; onCmd?: () => void }) {
  const now = useHoldingClock();
  const gold = Colors.gold;
  return (
    <View style={styles.mast}>
      {/* hairline oro superior — línea de rejilla del terminal */}
      <View pointerEvents="none" style={styles.mastHairline} />
      <View style={styles.mastRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, minWidth: 220 }}>
          <View style={[styles.mastDot, { backgroundColor: gold }, isWeb ? ({ animationName: 'hubShimmer', animationDuration: '2.6s', animationIterationCount: 'infinite' } as any) : null]} />
          <Text style={styles.mastWord} numberOfLines={1}>{wordmark}</Text>
          <View style={styles.mastMercado}><Text style={styles.mastMercadoTxt}>{mercado}</Text></View>
        </View>
        {/* estado del grupo + reloj mono */}
        <View style={styles.mastMetaRow}>
          <View style={styles.mastMetaCell}>
            <Text style={styles.mastMetaLabel}>MADUREZ GRUPO</Text>
            <MonoNumeral color={gold} size={FontSize.bodyMd} weight="800">{madurez}%</MonoNumeral>
          </View>
          <View style={styles.mastSep} />
          <View style={styles.mastMetaCell}>
            <Text style={styles.mastMetaLabel}>LÍNEAS</Text>
            <MonoNumeral color={Colors.onSurface} size={FontSize.bodyMd} weight="800">{lineas}</MonoNumeral>
          </View>
          <View style={styles.mastSep} />
          <View style={styles.mastMetaCell}>
            <Text style={styles.mastMetaLabel}>{fmtDate(now)}</Text>
            <MonoNumeral color={Colors.onSurfaceVariant} size={FontSize.bodyMd} weight="700">{fmtClock(now)}</MonoNumeral>
          </View>
          {onCmd ? (
            <TouchableOpacity activeOpacity={0.8} onPress={onCmd} style={[styles.cmdHint, isWeb ? ({ cursor: 'pointer' } as any) : null]}>
              <Text style={styles.cmdHintTxt}>⌘K</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}

// ── KpiTapeStrip: cinta de teletipo mono con deltas (verde/coral) ────────────
export type TapeItem = { label: string; value: string; delta?: { dir: 'up' | 'down' | 'flat'; label: string } };
export function KpiTapeStrip({ items }: { items: TapeItem[] }) {
  const row = (
    <View style={styles.tapeRow}>
      {items.map((it, i) => (
        <View key={i} style={styles.tapeItem}>
          <Text style={styles.tapeLabel}>{it.label.toUpperCase()}</Text>
          <Text style={[styles.tapeValue, monoText]}>{it.value}</Text>
          {it.delta ? <DeltaValue dir={it.delta.dir} label={it.delta.label} size={FontSize.labelSm} /> : null}
          <Text style={styles.tapeSep}>·</Text>
        </View>
      ))}
    </View>
  );
  if (!isWeb) return <View style={styles.tapeClip}>{row}</View>;
  return (
    <View style={styles.tapeClip}>
      <View style={{ flexDirection: 'row', animationName: 'hubMarquee', animationDuration: '34s', animationIterationCount: 'infinite', animationTimingFunction: 'linear' } as any}>
        {row}
        {row}
      </View>
    </View>
  );
}

// ── TickerSpark: micro-sparkline de una fila de watchlist (SVG-less, barras) ──
function TickerSpark({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  return (
    <View style={styles.tSpark}>
      {data.map((v, i) => (
        <View key={i} style={{ width: 3, height: Math.max(2, (v / max) * 20), borderRadius: 1, backgroundColor: color, opacity: 0.35 + (i / data.length) * 0.6 }} />
      ))}
    </View>
  );
}

// ── BrandWatchlist: raíl de estado del holding — marcas como tickers ─────────
export function BrandWatchlist({
  items, active, onSelect, horizontal = false,
}: { items: HoldingTicker[]; active: string; onSelect: (id: string) => void; horizontal?: boolean }) {
  return (
    <View style={horizontal ? styles.wlWrapH : styles.wlWrap}>
      {!horizontal ? (
        <View style={styles.wlHead}>
          <Text style={styles.wlHeadTxt}>WATCHLIST · HOLDING</Text>
          <Text style={styles.wlHeadSub}>madurez ▲▼</Text>
        </View>
      ) : null}
      <View style={horizontal ? styles.wlRowsH : undefined}>
        {items.map((t) => (
          <TickerRow key={t.id} t={t} active={active === t.id} onPress={() => onSelect(t.id)} horizontal={horizontal} />
        ))}
      </View>
    </View>
  );
}

function TickerRow({ t, active, onPress, horizontal }: { t: HoldingTicker; active: boolean; onPress: () => void; horizontal: boolean }) {
  const { hovered, hoverProps } = useHover();
  const dir = t.trend;
  const glyph = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '●';
  const trendColor = dir === 'up' ? Colors.green : dir === 'down' ? Colors.coral : Colors.muted;
  return (
    <TouchableOpacity
      activeOpacity={0.85} onPress={onPress} {...hoverProps}
      style={[
        horizontal ? styles.tRowH : styles.tRow,
        { borderLeftColor: t.color },
        active ? { backgroundColor: t.color + '18', borderColor: t.color + '66' } : null,
        !active && hovered && isWeb ? ({ backgroundColor: 'rgba(255,255,255,0.04)', borderColor: t.color + '44' } as any) : null,
        isWeb ? ({ transition: 'all .15s ease', cursor: 'pointer' } as any) : null,
      ]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
        <Text style={{ fontSize: 15 }}>{t.emoji}</Text>
        <Text style={[styles.tSym, monoText, active && { color: t.color }]}>{t.ticker}</Text>
      </View>
      {!horizontal ? <Text style={styles.tName} numberOfLines={1}>{t.nombre}</Text> : null}
      <View style={styles.tRight}>
        {!horizontal ? <TickerSpark data={t.spark} color={t.color} /> : null}
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[styles.tQuote, monoText, { color: t.color }]}>{t.madurez}%</Text>
          <Text style={[styles.tTrend, monoText, { color: trendColor }]}>{glyph} {t.estado}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ── RingStat: anillo + contador (estilo VITALS) ──────────────────
export function RingStat({
  value, max = 100, label, sub, accent, size = 92, suffix = '', decimals = 0,
}: {
  value: number; max?: number; label: string; sub?: string;
  accent: string; size?: number; suffix?: string; decimals?: number;
}) {
  const pct = useMountProgress(Math.max(0, Math.min(100, (value / max) * 100)));
  return (
    <View style={styles.ringStat}>
      <CircularProgress progress={pct} size={size} strokeWidth={7} color={accent} trackColor="rgba(255,255,255,0.07)">
        <AnimatedCounter value={value} decimals={decimals} suffix={suffix} style={{ fontSize: size * 0.26, fontWeight: '800', color: accent } as any} />
      </CircularProgress>
      <Text style={styles.ringLabel}>{label.toUpperCase()}</Text>
      {sub ? <Text style={styles.ringSub}>{sub}</Text> : null}
    </View>
  );
}

// ── TrendArea: área animada con gradiente (recharts, web) ────────
export function TrendArea({
  data, dataKey = 'v', accent, height = 120, labelKey,
}: { data: any[]; dataKey?: string; accent: string; height?: number; labelKey?: string }) {
  if (!isWeb || !RC || !RC.ResponsiveContainer) {
    return <View style={{ height, borderRadius: BorderRadius.lg, backgroundColor: accent + '12' }} />;
  }
  const { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, defs } = RC;
  const gradId = `grad-${dataKey}-${accent.replace('#', '')}`;
  return (
    <View style={{ height }}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 6, right: 6, bottom: 0, left: 6 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity={0.45} />
              <stop offset="100%" stopColor={accent} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          {labelKey ? (
            <XAxis dataKey={labelKey} tick={{ fill: Colors.smallLabel, fontSize: 9 }} axisLine={false} tickLine={false} interval={0} />
          ) : null}
          <Tooltip
            contentStyle={{ background: '#0B1628', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 11, color: '#D8E3FC' }}
            labelStyle={{ color: '#8F9097' }}
            cursor={{ stroke: accent, strokeOpacity: 0.3 }}
          />
          <Area
            type="monotone" dataKey={dataKey} stroke={accent} strokeWidth={2.5}
            fill={`url(#${gradId})`} isAnimationActive animationDuration={1400} animationEasing="ease-out"
            dot={{ r: 2.5, fill: accent, strokeWidth: 0 }} activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </View>
  );
}

// ── Sparkline mini (recharts, web) ───────────────────────────────
export function Sparkline({ data, accent, height = 34 }: { data: any[]; accent: string; height?: number }) {
  if (!isWeb || !RC || !RC.ResponsiveContainer) {
    return <View style={{ height, opacity: 0.4 }} />;
  }
  const { ResponsiveContainer, AreaChart, Area } = RC;
  const gradId = `spark-${accent.replace('#', '')}`;
  return (
    <View style={{ height }}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity={0.5} />
              <stop offset="100%" stopColor={accent} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={accent} strokeWidth={2} fill={`url(#${gradId})`} isAnimationActive animationDuration={1100} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </View>
  );
}

// ── BrandTile: tile de la cartera de marcas ──────────────────────
export function BrandTile({
  emoji, nombre, categoria, accent, estado, tagline, progreso = 0, variant = 'placeholder',
  metricaClave, onPress, sparkData,
}: {
  emoji: string; nombre: string; categoria: string; accent: string;
  estado: string; tagline?: string; progreso?: number;
  variant?: 'hero' | 'placeholder' | 'tiny';
  metricaClave?: { label: string; valor: string };
  onPress?: () => void; sparkData?: any[];
}) {
  const { hovered, hoverProps } = useHover();
  const planeada = estado === 'planeada';
  const lift = hovered && isWeb ? ({ transform: [{ translateY: -3 }], borderColor: accent + '99' } as any) : null;

  if (variant === 'hero') {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} {...hoverProps}
        style={[
          styles.heroTile,
          isWeb ? ({ backgroundImage: `linear-gradient(150deg, ${accent}26 0%, rgba(11,22,40,0.2) 60%)`, transition: 'all .2s ease', cursor: 'pointer' } as any) : { backgroundColor: accent + '1A' },
          { borderColor: accent + '55' }, lift,
        ]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ fontSize: 30 }}>{emoji}</Text>
            <View>
              <Text style={styles.heroTileName}>{nombre}</Text>
              <Text style={[styles.tileCat, { color: accent }]}>{categoria}</Text>
            </View>
          </View>
          <View style={[styles.anclaBadge, { backgroundColor: accent + '26', borderColor: accent + '66' }]}>
            <Text style={[styles.anclaBadgeText, { color: accent }]}>★ ANCLA</Text>
          </View>
        </View>
        {tagline ? <Text style={styles.heroTileTagline}>{tagline}</Text> : null}
        {sparkData ? <View style={{ marginTop: 8 }}><Sparkline data={sparkData} accent={accent} height={40} /></View> : null}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 10 }}>
          {metricaClave ? (
            <View>
              <Text style={styles.tileMetricLabel}>{metricaClave.label.toUpperCase()}</Text>
              <Text style={[styles.tileMetricVal, { color: accent }]}>{metricaClave.valor}</Text>
            </View>
          ) : <View />}
          <View style={[styles.tileCta, { borderColor: accent + '88' }]}>
            <Text style={[styles.tileCtaText, { color: accent }]}>Abrir ›</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === 'tiny') {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={onPress} {...hoverProps}
        style={[styles.tinyTile, { borderLeftColor: accent }, isWeb ? ({ transition: 'all .15s ease', cursor: onPress ? 'pointer' : 'default' } as any) : null, lift]}>
        <Text style={{ fontSize: 18, marginRight: 8 }}>{emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.tinyName}>{nombre}</Text>
          <Text style={styles.tinyCat}>{categoria}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  // placeholder
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} {...hoverProps}
      style={[styles.placeTile, { borderColor: DesktopColors.glassBorder }, isWeb ? ({ transition: 'all .2s ease', cursor: 'pointer' } as any) : null, lift]}>
      <View style={[styles.placeAccentBar, { backgroundColor: accent }, isWeb ? ({ animationName: 'hubShimmer', animationDuration: '2.8s', animationIterationCount: 'infinite' } as any) : null]} />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 22 }}>{emoji}</Text>
        <View style={[styles.dotPing, { backgroundColor: accent }, isWeb ? ({ animationName: 'hubShimmer', animationDuration: '2.2s', animationIterationCount: 'infinite' } as any) : null]} />
      </View>
      <Text style={styles.placeName}>{nombre}</Text>
      <Text style={[styles.tileCat, { color: accent }]}>{categoria}</Text>
      {tagline ? <Text style={styles.placeTagline} numberOfLines={2}>{tagline}</Text> : null}
      {/* mini barra de progreso de madurez */}
      <View style={styles.progTrack}>
        <View style={[styles.progFill, { width: `${Math.max(4, progreso)}%`, backgroundColor: accent }]} />
      </View>
      <View style={[styles.proxBadge, { backgroundColor: accent + '1A' }]}>
        <Text style={[styles.proxText, { color: accent }]}>{planeada ? 'PRÓXIMAMENTE' : estado.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ── CommandBackdrop: aurora + scanline (canvas vivo, web) ────────
export function CommandBackdrop() {
  if (!isWeb) return null;
  const anim = { dataSet: { hubAnim: '' } } as any;
  return (
    <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' } as any}>
      <View {...anim} style={{
        position: 'absolute', top: '-12%', left: '-6%', width: 460, height: 460, borderRadius: 230,
        backgroundImage: 'radial-gradient(circle, rgba(198,165,107,0.16), transparent 70%)',
        animationName: 'hubAurora', animationDuration: '34s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out',
      } as any} />
      <View {...anim} style={{
        position: 'absolute', bottom: '-16%', right: '-10%', width: 560, height: 560, borderRadius: 280,
        backgroundImage: 'radial-gradient(circle, rgba(245,166,35,0.10), transparent 70%)',
        animationName: 'hubAurora', animationDuration: '46s', animationDelay: '-9s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out',
      } as any} />
      <View {...anim} style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '42%', opacity: 0.5,
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.022), transparent)',
        animationName: 'hubScan', animationDuration: '9s', animationIterationCount: 'infinite', animationTimingFunction: 'linear',
      } as any} />
    </View>
  );
}

// ── MegaStat: número gigante que respira (el golpe de drama) ─────
export function MegaStat({
  value, label, footnote, accent, suffix = '', decimals = 0,
}: { value: number; label: string; footnote?: string; accent: string; suffix?: string; decimals?: number }) {
  return (
    <View style={{ alignItems: 'center', paddingVertical: Spacing.lg, position: 'relative' }}>
      {isWeb ? (
        <View
          pointerEvents="none"
          {...({ dataSet: { hubAnim: '' } } as any)}
          style={{
            position: 'absolute', width: 280, height: 280, borderRadius: 140, top: -40,
            backgroundImage: `radial-gradient(circle, ${accent}33, transparent 66%)`,
            animationName: 'hubBreath', animationDuration: '4.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out',
          } as any}
        />
      ) : null}
      <Text style={{ fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.6 }}>{label.toUpperCase()}</Text>
      <AnimatedCounter
        value={value} suffix={suffix} decimals={decimals} duration={1900}
        style={{ fontSize: 84, fontWeight: '200', color: accent, letterSpacing: -2, lineHeight: 92 } as any}
      />
      {footnote ? <Text style={{ fontSize: 10, color: Colors.muted, marginTop: 2 }}>{footnote}</Text> : null}
    </View>
  );
}

// ── FadeUp: entrada escalonada (cascada de boot, web) ────────────
export function FadeUp({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: any }) {
  const webAnim = isWeb
    ? ({ animationName: 'hubFadeUp', animationDuration: '0.6s', animationFillMode: 'both', animationDelay: `${delay}ms`, animationTimingFunction: 'cubic-bezier(.16,1,.3,1)' } as any)
    : {};
  return (
    <View {...(isWeb ? ({ dataSet: { hubAnim: '' } } as any) : {})} style={[webAnim, style]}>
      {children}
    </View>
  );
}

const card = {
  backgroundColor: DesktopColors.glass,
  borderRadius: BorderRadius.xl,
  borderWidth: 1,
  borderColor: Hairline.medium,
  ...Elevation.sm,
};

const styles = StyleSheet.create({
  hero: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Hairline.medium,
    padding: Spacing['2xl'],
    overflow: 'hidden',
    ...Elevation.md,
  },
  // ticker
  tickerClip: { overflow: 'hidden', borderRadius: BorderRadius.full },
  tickerRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 7 },
  tickerItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 },
  tickerDot: { width: 5, height: 5, borderRadius: 3, marginRight: 8 },
  tickerText: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, fontWeight: '600', letterSpacing: 0.3 },
  // ring
  ringStat: { alignItems: 'center', minWidth: 100 },
  ringLabel: { fontSize: 10, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.9, marginTop: 10, textAlign: 'center' },
  ringSub: { fontSize: 9, color: Colors.muted, marginTop: 3, textAlign: 'center', letterSpacing: 0.2 },
  // hero tile
  heroTile: { ...card, padding: Spacing.xl, borderRadius: BorderRadius.xl, overflow: 'hidden' },
  heroTileName: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.3 },
  heroTileTagline: { fontSize: FontSize.labelLg, color: Colors.onSurfaceVariant, marginTop: 10, lineHeight: 19 },
  tileCat: { fontSize: FontSize.labelSm, fontWeight: '700', letterSpacing: 0.6, marginTop: 2, textTransform: 'uppercase' },
  anclaBadge: { borderRadius: BorderRadius.full, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 9 },
  anclaBadgeText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
  tileMetricLabel: { fontSize: 9, fontWeight: '700', color: Colors.smallLabel, letterSpacing: 0.8 },
  tileMetricVal: { fontSize: FontSize.titleMd, fontWeight: '800', marginTop: 1, letterSpacing: -0.2, ...monoText },
  tileCta: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 5, paddingHorizontal: 12 },
  tileCtaText: { fontSize: FontSize.labelMd, fontWeight: '800' },
  // placeholder tile
  placeTile: { ...card, padding: Spacing.lg, overflow: 'hidden', minHeight: 150 },
  placeAccentBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 3 },
  placeName: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, marginTop: 8, letterSpacing: -0.2 },
  placeTagline: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 6, lineHeight: 16 },
  dotPing: { width: 8, height: 8, borderRadius: 4 },
  progTrack: { height: 4, borderRadius: BorderRadius.full, backgroundColor: Hairline.soft, marginTop: 12, overflow: 'hidden' },
  progFill: { height: 4, borderRadius: BorderRadius.full },
  proxBadge: { alignSelf: 'flex-start', borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 8, marginTop: 10 },
  proxText: { fontSize: 8, fontWeight: '800', letterSpacing: 0.9 },
  // tiny (PIRQA)
  tinyTile: { ...card, flexDirection: 'row', alignItems: 'center', padding: Spacing.md, borderLeftWidth: 3, borderRadius: BorderRadius.lg },
  tinyName: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface, letterSpacing: -0.1 },
  tinyCat: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2 },

  // ── TerminalHeader (masthead) ──
  mast: {
    backgroundColor: '#0B1424',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Hairline.accentSoft,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    overflow: 'hidden',
    ...Elevation.md,
  },
  mastHairline: { position: 'absolute', top: 0, left: 0, right: 0, height: 2, backgroundColor: Colors.gold, opacity: 0.55 },
  mastRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.md },
  mastDot: { width: 8, height: 8, borderRadius: 4 },
  mastWord: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: 1.4 },
  mastMercado: { borderWidth: 1, borderColor: Colors.green + '55', backgroundColor: Colors.green + '18', borderRadius: BorderRadius.sm, paddingVertical: 2, paddingHorizontal: 7 },
  mastMercadoTxt: { fontSize: 8, fontWeight: '800', color: Colors.green, letterSpacing: 0.8, ...monoText },
  mastMetaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flexWrap: 'wrap' },
  mastMetaCell: { alignItems: 'flex-start' },
  mastMetaLabel: { fontSize: 8, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1, ...monoText },
  mastSep: { width: 1, height: 22, backgroundColor: Hairline.medium },
  cmdHint: { borderWidth: 1, borderColor: Hairline.accentSoft, backgroundColor: Colors.gold + '12', borderRadius: BorderRadius.sm, paddingVertical: 4, paddingHorizontal: 9, marginLeft: 2 },
  cmdHintTxt: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.gold, letterSpacing: 0.5, ...monoText },

  // ── KpiTapeStrip ──
  tapeClip: { overflow: 'hidden', borderRadius: BorderRadius.md, backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 1, borderColor: Hairline.soft },
  tapeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 7 },
  tapeItem: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12 },
  tapeLabel: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.8 },
  tapeValue: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: 0.2 },
  tapeSep: { fontSize: FontSize.labelMd, color: Hairline.strong, marginLeft: 4 },

  // ── BrandWatchlist ──
  wlWrap: { backgroundColor: '#0B1424', borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.medium, padding: Spacing.sm, ...Elevation.sm },
  wlWrapH: {},
  wlHead: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingHorizontal: 6, paddingTop: 4, paddingBottom: 8 },
  wlHeadTxt: { fontSize: 9, fontWeight: '800', color: Colors.gold, letterSpacing: 1.2, ...monoText },
  wlHeadSub: { fontSize: 8, color: Colors.smallLabel, letterSpacing: 0.4, ...monoText },
  wlRowsH: { flexDirection: 'row', gap: Spacing.sm },
  tRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 8, paddingHorizontal: 9, marginBottom: 5,
    borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.soft,
    borderLeftWidth: 3, gap: 8,
  },
  tRowH: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 8, paddingHorizontal: 11,
    borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.soft, borderLeftWidth: 3,
    minWidth: 150,
  },
  tSym: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurfaceVariant, letterSpacing: 0.5 },
  tName: { flex: 1, fontSize: FontSize.labelSm, color: Colors.muted, marginLeft: 4 } as any,
  tRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tSpark: { flexDirection: 'row', alignItems: 'flex-end', gap: 1.5, height: 20 },
  tQuote: { fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: 0.2 },
  tTrend: { fontSize: 8, fontWeight: '700', letterSpacing: 0.4, marginTop: 1 },
});
