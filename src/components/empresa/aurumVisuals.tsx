import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, ViewStyle, TextStyle, StyleProp, TextInput } from 'react-native';
import CircularProgress from '../CircularProgress';
import AnimatedCounter from '../AnimatedCounter';
import {
  AurumColors as C, AurumRadius as R, AurumSpacing as S, AurumType as T,
  AurumShadow, aurumGradCss, withAlpha,
} from '../../theme/aurumTheme';
import { Elevation, Motion, Hairline } from '../../theme/tokens';
import {
  AURUM_RUBRICA_PITCH, AURUM_RUBRICA_MAX, aurumRubricaSemaforo, AurumRubricaScore, AurumRubricaStore, aurumRubricaKey,
  AurumScoreKey, AurumScoreSemana, AURUM_SCOREBOARD_METAS, aurumScoreSemaforo,
} from '../../lib/aurumData';

/**
 * aurumVisuals — capa visual PREMIUM de la sección AURUM (Hormozi / acquisition.com).
 * Todo referencia los tokens de src/theme/aurumTheme.ts: cero colores hardcodeados.
 * El movimiento (sweep, glow) va detrás de Platform.OS === 'web'; en native degrada
 * a estático. Sin dependencias nuevas: gradientes vía CSS en web + fallback de View.
 */

const isWeb = Platform.OS === 'web';
const web = (s: any) => (isWeb ? s : {});

// Inyección única de keyframes (web) — vive bajo el id 'aurum-anims'.
if (isWeb && typeof document !== 'undefined') {
  const id = 'aurum-anims';
  if (!document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = `
      @keyframes aurumSweep { 0%{transform:translateX(-60%)} 100%{transform:translateX(220%)} }
      @keyframes aurumRise { 0%{opacity:0;transform:translateY(14px)} 100%{opacity:1;transform:translateY(0)} }
      @keyframes aurumGlow { 0%{opacity:.45} 50%{opacity:.9} 100%{opacity:.45} }
      @media (prefers-reduced-motion: reduce){ [data-aurum-anim]{ animation:none !important } }
    `;
    document.head.appendChild(el);
  }
}

// ── AurumHero: cabecera con gradiente + barrido de luz oro ──────────────────
export function AurumHero({ children, gradient = 'hero', style }: {
  children: React.ReactNode; gradient?: Parameters<typeof aurumGradCss>[0]; style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[
      v.hero,
      isWeb ? ({ backgroundImage: aurumGradCss(gradient) } as any) : { backgroundColor: C.bgElevated },
      style,
    ]}>
      {isWeb ? (
        <>
          {/* hairline superior de luz — remate premium del borde */}
          <View pointerEvents="none" style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            backgroundImage: `linear-gradient(90deg, transparent, ${withAlpha(C.goldSoft, 0.5)}, transparent)`,
          } as any} />
          <View pointerEvents="none" {...({ 'data-aurum-anim': '' } as any)} style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, width: '38%',
            backgroundImage: 'linear-gradient(100deg, transparent, rgba(230,200,104,0.12), transparent)',
            animationName: 'aurumSweep', animationDuration: '6.5s',
            animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out',
          } as any} />
        </>
      ) : null}
      <View style={{ position: 'relative' }}>{children}</View>
    </View>
  );
}

// ── AurumWordmark: "AURUM" con tracking grande + brillo metálico (web) ──────
export function AurumWordmark({ size = T.size.mega }: { size?: number }) {
  const base: TextStyle = {
    fontSize: size, fontWeight: T.weight.black, letterSpacing: T.tracking.wordmark,
    color: C.goldSoft, fontFamily: T.family.display as any,
  };
  if (isWeb) {
    return (
      <Text style={[base, {
        // brillo metálico: degradado oro recortado al texto
        backgroundImage: 'linear-gradient(180deg, #F3E2A1 0%, #E6C868 38%, #C9A227 70%, #8A6D14 100%)',
        WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
      } as any]}>AURUM</Text>
    );
  }
  return <Text style={base}>AURUM</Text>;
}

// ── AurumChip: badge premium (relleno suave o sólido) ───────────────────────
export function AurumChip({ label, color = C.gold, solid = false, size = 'md' }: {
  label: string; color?: string; solid?: boolean; size?: 'sm' | 'md';
}) {
  const sm = size === 'sm';
  return (
    <View style={[
      v.chip,
      { borderColor: withAlpha(color, solid ? 1 : 0.32) },
      solid ? { backgroundColor: color } : { backgroundColor: withAlpha(color, 0.13) },
      sm && { paddingVertical: 1, paddingHorizontal: 7 },
    ]}>
      <Text style={[v.chipTxt, sm && { fontSize: T.size.nano }, { color: solid ? C.onGold : color }]}>{label}</Text>
    </View>
  );
}

// ── AurumLabel: rótulo de sección en mayúsculas con tracking ────────────────
export function AurumLabel({ children, color = C.textMute, style }: {
  children: React.ReactNode; color?: string; style?: TextStyle;
}) {
  return <Text style={[v.label, { color }, style]}>{children}</Text>;
}

// ── AurumPanel: contenedor glass premium (borde oro opcional a la izquierda) ─
export function AurumPanel({ children, accent, glow = false, style }: {
  children: React.ReactNode; accent?: string; glow?: boolean; style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[
      v.panel,
      AurumShadow.card,
      glow ? AurumShadow.gold : null,
      accent ? { borderLeftWidth: 3, borderLeftColor: accent } : null,
      style,
    ]}>
      {children}
    </View>
  );
}

// ── AurumButton: CTA primario satisfactorio (oro sólido) o ghost ────────────
export function AurumButton({ label, onPress, variant = 'primary', accent = C.gold, full = false, style }: {
  label: string; onPress: () => void; variant?: 'primary' | 'ghost'; accent?: string; full?: boolean; style?: ViewStyle;
}) {
  const [hover, setHover] = useState(false);
  const hoverProps = isWeb ? { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } : {};
  const primary = variant === 'primary';
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      {...(hoverProps as any)}
      style={[
        v.btn,
        full && { alignSelf: 'stretch' },
        primary
          ? { backgroundColor: accent, borderColor: accent }
          : { backgroundColor: withAlpha(accent, 0.12), borderColor: withAlpha(accent, 0.5) },
        hover && primary ? { backgroundColor: C.goldSoft } : null,
        hover && !primary ? { borderColor: accent, backgroundColor: withAlpha(accent, 0.18) } : null,
        hover && isWeb ? ({ transform: [{ translateY: -1 }] } as any) : null,
        web({ transition: `all ${Motion.base}`, cursor: 'pointer' }),
        primary ? AurumShadow.gold : null,
        style,
      ]}>
      <Text style={[v.btnTxt, { color: primary ? C.onGold : accent }]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── AurumProgressBar: barra de progreso real ────────────────────────────────
export function AurumProgressBar({ pct, color = C.gold, height = 8 }: { pct: number; color?: string; height?: number }) {
  const w = Math.max(0, Math.min(100, pct));
  return (
    <View style={[v.barTrack, { height, borderRadius: height / 2 }]}>
      <View style={[
        { height, borderRadius: height / 2, width: `${w}%` as any, backgroundColor: color },
        isWeb ? ({ backgroundImage: `linear-gradient(90deg, ${C.goldDeep}, ${color}, ${C.goldSoft})`, transition: `width ${Motion.spring}` } as any) : null,
      ]} />
    </View>
  );
}

// ── AurumRing: anillo de progreso + contador (reusa CircularProgress) ───────
export function AurumRing({ value, max = 100, label, sub, accent = C.gold, size = 96, suffix = '' }: {
  value: number; max?: number; label: string; sub?: string; accent?: string; size?: number; suffix?: string;
}) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setPct(Math.max(0, Math.min(100, (value / Math.max(1, max)) * 100))), 140);
    return () => clearTimeout(id);
  }, [value, max]);
  return (
    <View style={{ alignItems: 'center', minWidth: 92 }}>
      <CircularProgress progress={pct} size={size} strokeWidth={7} color={accent} trackColor={withAlpha('#FFFFFF', 0.07)}>
        <AnimatedCounter value={value} suffix={suffix} style={{ fontSize: size * 0.27, fontWeight: T.weight.extrabold, color: accent } as any} />
      </CircularProgress>
      <Text style={v.ringLabel}>{label.toUpperCase()}</Text>
      {sub ? <Text style={v.ringSub}>{sub}</Text> : null}
    </View>
  );
}

// ── AurumCloserDesk: scoreboard del closer (KPIs high-ticket, glifos de terminal) ─
// Tablero-firma del "closer desk" negro-oro. Data curada (empieza en 0, manual):
// alimenta de AURUM_CLOSER_SCOREBOARD. NO reemplaza los anillos Día/Semana/Fase/Racha.
export type AurumSemaforo = 'verde' | 'ambar' | 'rojo' | 'gris';
export function aurumSemaforoColor(s: AurumSemaforo): string {
  return s === 'verde' ? C.success : s === 'ambar' ? C.warn : s === 'rojo' ? C.danger : C.textMute;
}
export type CloserCell = { key: string; label: string; glyph: string; valor: string; meta: string; unidad: string; estado?: AurumSemaforo };
export function AurumCloserDesk({ metrics, nota, hint, onEdit }: { metrics: CloserCell[]; nota?: string; hint?: string; onEdit?: () => void }) {
  const mono: any = isWeb
    ? { fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace', fontVariantNumeric: 'tabular-nums' }
    : { fontVariant: ['tabular-nums'] };
  return (
    <View style={[cd.wrap, AurumShadow.card]}>
      {isWeb ? <View pointerEvents="none" style={cd.hairline} /> : null}
      <View style={cd.head}>
        <Text style={cd.title}>◆ CLOSER SCOREBOARD</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {hint ? <Text style={cd.hint}>{hint}</Text> : null}
          {onEdit ? (
            <TouchableOpacity activeOpacity={0.8} onPress={onEdit} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
              <AurumChip label="✎ registrar semana" color={C.gold} size="sm" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={cd.grid}>
        {metrics.map((m) => {
          const acc = m.estado ? aurumSemaforoColor(m.estado) : C.goldSoft;
          return (
            <View key={m.key} style={[cd.cell, m.estado && m.estado !== 'gris' ? { borderColor: withAlpha(acc, 0.45) } : null]}>
              <View style={cd.cellTop}>
                <Text style={[cd.glyph, mono]}>{m.glyph}</Text>
                <Text style={cd.cellLabel} numberOfLines={1}>{m.label.toUpperCase()}</Text>
                {m.estado ? <View style={[cd.dot, { backgroundColor: acc }]} /> : null}
              </View>
              <Text style={[cd.value, mono, m.estado && m.estado !== 'gris' ? { color: acc } : null]} numberOfLines={1}>{m.valor}</Text>
              <Text style={[cd.meta, mono]} numberOfLines={1}>meta {m.meta}</Text>
              <Text style={cd.unit} numberOfLines={2}>{m.unidad}</Text>
            </View>
          );
        })}
      </View>
      {nota ? <Text style={cd.nota}>{nota}</Text> : null}
    </View>
  );
}

// ── AurumScoreboardEditor: registro SEMANAL editable (dials/sets/show/close/cash/q2c) ──
// Persistencia la hace el padre (localStorage 'jmd-aurum-scoreboard-v1'); aquí solo inputs + semáforo.
const SCORE_FIELDS: { key: AurumScoreKey; label: string; glyph: string; hint: string }[] = [
  { key: 'dials', label: 'Dials', glyph: '◇', hint: 'contactos iniciados (llamada/DM) en la semana' },
  { key: 'sets',  label: 'Sets', glyph: '◆', hint: 'citas agendadas en la semana' },
  { key: 'show',  label: 'Show-rate %', glyph: '►', hint: 'citas que sí asistieron ÷ agendadas' },
  { key: 'close', label: 'Close-rate %', glyph: '▲', hint: 'cierres ÷ presentaciones' },
  { key: 'cash',  label: 'Cash collected S/', glyph: '⬆', hint: 'caja cobrada (no facturada)' },
  { key: 'q2c',   label: 'Quote-to-close %', glyph: '●', hint: 'cotizaciones que cerraron ÷ cotizaciones' },
];
export function AurumScoreboardEditor({ semana, values, prev, onChange, onPrevSemana, onNextSemana, esActual }: {
  semana: string; values: AurumScoreSemana; prev?: AurumScoreSemana;
  onChange: (key: AurumScoreKey, valor: number | undefined) => void;
  onPrevSemana: () => void; onNextSemana: () => void; esActual: boolean;
}) {
  const mono: any = isWeb ? { fontVariantNumeric: 'tabular-nums' } : { fontVariant: ['tabular-nums'] };
  return (
    <View style={[se.wrap, AurumShadow.card]}>
      <View style={se.head}>
        <TouchableOpacity activeOpacity={0.7} onPress={onPrevSemana} style={se.navBtn}><Text style={se.navTxt}>◄</Text></TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={se.title}>SEMANA {semana}{esActual ? ' · ACTUAL' : ''}</Text>
          <Text style={se.sub}>registro manual real · se guarda en este dispositivo</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={onNextSemana} style={se.navBtn}><Text style={se.navTxt}>►</Text></TouchableOpacity>
      </View>
      <View style={se.grid}>
        {SCORE_FIELDS.map((f) => {
          const v = values[f.key];
          const estado = aurumScoreSemaforo(f.key, v, prev ? prev[f.key] : undefined);
          const acc = aurumSemaforoColor(estado);
          const meta = AURUM_SCOREBOARD_METAS[f.key];
          return (
            <View key={f.key} style={[se.cell, { borderColor: withAlpha(acc, estado === 'gris' ? 0.25 : 0.55) }]}>
              <View style={se.cellTop}>
                <Text style={se.glyph}>{f.glyph}</Text>
                <Text style={se.cellLabel} numberOfLines={1}>{f.label.toUpperCase()}</Text>
                <View style={[se.dot, { backgroundColor: acc }]} />
              </View>
              <TextInput
                value={v == null ? '' : String(v)}
                onChangeText={(t) => { const n = parseFloat(t.replace(',', '.')); onChange(f.key, t.trim() === '' || Number.isNaN(n) ? undefined : n); }}
                keyboardType="numeric"
                placeholder="—"
                placeholderTextColor={C.textMute}
                style={[se.input, mono, { color: estado === 'gris' ? C.text : acc }, isWeb ? ({ outlineStyle: 'none' } as any) : null]}
              />
              <Text style={se.meta} numberOfLines={1}>meta {meta.label}</Text>
              <Text style={se.hint} numberOfLines={2}>{f.hint}</Text>
            </View>
          );
        })}
      </View>
      <Text style={se.legend}>● verde = meta cumplida · ● ámbar ≥ 70% de la meta · ● rojo · ● gris = sin dato. Cash: verde si crece vs la semana previa.</Text>
    </View>
  );
}

// ── AurumRubricaPitch: 6 ítems 0-2 (AURUM_RUBRICA_PITCH) → score /12 persistido por grabación ──
export function AurumRubricaPitch({ pitch, variante, titulo, initial, onSave }: {
  pitch: number; variante: 'base' | 'liviano'; titulo?: string; initial?: AurumRubricaScore;
  onSave: (score: AurumRubricaScore) => void;
}) {
  const [puntos, setPuntos] = useState<number[]>(() => initial?.puntos && initial.puntos.length === AURUM_RUBRICA_PITCH.length ? [...initial.puntos] : AURUM_RUBRICA_PITCH.map(() => -1));
  const [nota, setNota] = useState(initial?.nota || '');
  const [saved, setSaved] = useState<string | null>(initial?.fecha || null);
  useEffect(() => {
    if (initial?.puntos && initial.puntos.length === AURUM_RUBRICA_PITCH.length) { setPuntos([...initial.puntos]); setNota(initial.nota || ''); setSaved(initial.fecha); }
  }, [initial?.fecha, initial?.total]); // eslint-disable-line react-hooks/exhaustive-deps
  const completo = puntos.every((p) => p >= 0);
  const total = puntos.reduce((s, p) => s + Math.max(0, p), 0);
  const sem = aurumRubricaSemaforo(total);
  const acc = completo ? aurumSemaforoColor(sem) : C.textMute;
  const liv = variante === 'liviano';
  const guardar = () => {
    if (!completo) return;
    const fecha = new Date().toISOString().slice(0, 10);
    onSave({ pitch, variante, puntos: [...puntos], total, fecha, nota: nota.trim() || undefined });
    setSaved(fecha);
  };
  return (
    <View style={[rb.wrap, { borderColor: withAlpha(liv ? C.lecturaAccent : C.gold, 0.4) }]}>
      <View style={rb.head}>
        <View style={{ flex: 1 }}>
          <Text style={rb.kicker}>{liv ? '◆ RÚBRICA · PITCH v' + pitch + ' LIVIANO' : '◆ RÚBRICA · PITCH v' + pitch}</Text>
          {titulo ? <Text style={rb.titulo} numberOfLines={3}>{titulo}</Text> : null}
        </View>
        <View style={[rb.scoreBox, { borderColor: withAlpha(acc, 0.6), backgroundColor: withAlpha(acc, 0.12) }]}>
          <Text style={[rb.scoreVal, { color: acc }]}>{completo ? total : '—'}<Text style={rb.scoreMax}>/{AURUM_RUBRICA_MAX}</Text></Text>
          <Text style={rb.scoreLbl}>{completo ? (sem === 'verde' ? 'nivel closer' : sem === 'ambar' ? 'en camino' : 'repetir toma') : 'puntúa los 6'}</Text>
        </View>
      </View>
      {AURUM_RUBRICA_PITCH.map((it, i) => {
        const v = puntos[i];
        const desc = v === 0 ? it.n0 : v === 1 ? it.n1 : v === 2 ? it.n2 : `0 = ${it.n0} · 1 = ${it.n1} · 2 = ${it.n2}`;
        return (
          <View key={it.key} style={rb.row}>
            <View style={{ flex: 1 }}>
              <Text style={rb.itemLabel}>{i + 1}. {it.label}</Text>
              <Text style={[rb.itemDesc, v >= 0 ? { color: v === 2 ? C.success : v === 1 ? C.warn : C.danger } : null]} numberOfLines={3}>{desc}</Text>
            </View>
            <View style={rb.btns}>
              {[0, 1, 2].map((n) => {
                const on = v === n;
                const col = n === 2 ? C.success : n === 1 ? C.warn : C.danger;
                return (
                  <TouchableOpacity key={n} activeOpacity={0.8} onPress={() => setPuntos((p) => p.map((x, j) => (j === i ? n : x)))}
                    style={[rb.btn, on ? { backgroundColor: withAlpha(col, 0.22), borderColor: col } : null, isWeb ? ({ cursor: 'pointer' } as any) : null]}>
                    <Text style={[rb.btnTxt, on && { color: col }]}>{n}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}
      <TextInput
        value={nota}
        onChangeText={setNota}
        placeholder="Nota de la grabación (qué corregir en la próxima toma)…"
        placeholderTextColor={C.textMute}
        multiline
        style={[rb.nota, isWeb ? ({ outlineStyle: 'none' } as any) : null]}
      />
      <View style={rb.foot}>
        <AurumButton label={saved ? '✓ Guardar de nuevo' : 'Guardar score'} onPress={guardar} accent={completo ? (liv ? C.lecturaAccent : C.gold) : C.textMute} />
        {saved ? <Text style={rb.savedTxt}>guardado {saved} · clave {aurumRubricaKey(pitch, variante)}</Text> : <Text style={rb.savedTxt}>se guarda en 'jmd-aurum-rubrica' (este dispositivo)</Text>}
      </View>
    </View>
  );
}

// ── AurumPitchChart: gráfica v1→v7 (barras) desde el store de rúbrica; LIVIANO en zafiro ──
export function AurumPitchChart({ store, pitches = [1, 2, 3, 4, 5, 6, 7] }: { store: AurumRubricaStore; pitches?: number[] }) {
  const H = 96;
  const vals = pitches.map((p) => ({ p, base: store[aurumRubricaKey(p, 'base')], liv: store[aurumRubricaKey(p, 'liviano')] }));
  const conDato = vals.filter((v) => v.base || v.liv).length;
  const primero = vals.find((v) => v.base)?.base?.total; const ultimo = [...vals].reverse().find((v) => v.base)?.base?.total;
  return (
    <View style={[pc.wrap, AurumShadow.card]}>
      <View style={pc.head}>
        <Text style={pc.title}>◆ PITCH v1 → v7 · score de rúbrica /{AURUM_RUBRICA_MAX}</Text>
        <Text style={pc.sub}>{conDato ? `${conDato}/${pitches.length} grabaciones puntuadas${primero != null && ultimo != null && primero !== ultimo ? ` · v${vals.find((v) => v.base)!.p} ${primero} → último ${ultimo}` : ''}` : 'sin grabaciones puntuadas aún · empieza en el cierre de F1 (PITCH v1)'}</Text>
      </View>
      <View style={[pc.plot, { height: H + 34 }]}>
        {vals.map((v) => {
          const hb = v.base ? Math.max(4, Math.round((v.base.total / AURUM_RUBRICA_MAX) * H)) : 0;
          const hl = v.liv ? Math.max(4, Math.round((v.liv.total / AURUM_RUBRICA_MAX) * H)) : 0;
          const cb = v.base ? aurumSemaforoColor(aurumRubricaSemaforo(v.base.total)) : C.textMute;
          return (
            <View key={v.p} style={pc.col}>
              <View style={[pc.bars, { height: H }]}>
                <View style={[pc.bar, v.base ? { height: hb, backgroundColor: cb } : { height: H, borderWidth: 1, borderStyle: 'dashed', borderColor: withAlpha('#FFFFFF', 0.12), backgroundColor: 'transparent' }]}>
                  {v.base ? <Text style={pc.barVal}>{v.base.total}</Text> : null}
                </View>
                {v.liv ? <View style={[pc.bar, pc.barLiv, { height: hl }]}><Text style={pc.barVal}>{v.liv.total}</Text></View> : null}
              </View>
              <Text style={pc.x}>v{v.p}</Text>
            </View>
          );
        })}
      </View>
      <View style={pc.legend}>
        <View style={[pc.dot, { backgroundColor: C.gold }]} /><Text style={pc.legendTxt}>ALLPA / Qori (color = semáforo)</Text>
        <View style={[pc.dot, { backgroundColor: C.lecturaAccent, marginLeft: 10 }]} /><Text style={pc.legendTxt}>versión LIVIANO (v3-v6)</Text>
      </View>
    </View>
  );
}

const se = StyleSheet.create({
  wrap: { backgroundColor: C.bg, borderRadius: R.lg, borderWidth: 1, borderColor: withAlpha(C.gold, 0.28), padding: S.lg, marginBottom: S.lg },
  head: { flexDirection: 'row', alignItems: 'center', gap: S.sm, marginBottom: S.md },
  navBtn: { width: 36, height: 36, borderRadius: R.sm, backgroundColor: withAlpha('#FFFFFF', 0.05), borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
  navTxt: { fontSize: 14, color: C.gold, fontWeight: T.weight.extrabold },
  title: { fontSize: T.size.caption, fontWeight: T.weight.extrabold, color: C.goldSoft, letterSpacing: 1.1 },
  sub: { fontSize: T.size.nano, color: C.textMute, marginTop: 2 },
  grid: isWeb
    ? ({ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 } as any)
    : { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  cell: { minWidth: 140, flexGrow: 1, flexBasis: 140, backgroundColor: C.surface, borderRadius: R.sm, borderWidth: 1, paddingVertical: S.md, paddingHorizontal: S.md },
  cellTop: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5 },
  glyph: { fontSize: T.size.caption, color: C.gold, fontWeight: T.weight.black },
  cellLabel: { fontSize: T.size.nano, fontWeight: T.weight.extrabold, color: C.textMute, letterSpacing: 0.8, flex: 1 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  input: { fontSize: T.size.title, fontWeight: T.weight.bold, paddingVertical: 4, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: withAlpha('#FFFFFF', 0.12) },
  meta: { fontSize: T.size.nano, color: C.success, marginTop: 4, letterSpacing: 0.3, fontWeight: T.weight.bold },
  hint: { fontSize: T.size.nano, color: C.textMute, marginTop: 3, lineHeight: 13 },
  legend: { fontSize: T.size.nano, color: C.textMute, marginTop: S.md, lineHeight: 15 },
});

const rb = StyleSheet.create({
  wrap: { backgroundColor: C.surface, borderRadius: R.md, borderWidth: 1, padding: S.lg, marginTop: S.md },
  head: { flexDirection: 'row', alignItems: 'flex-start', gap: S.md, marginBottom: S.sm },
  kicker: { fontSize: T.size.micro, fontWeight: T.weight.black, color: C.goldSoft, letterSpacing: 0.9 },
  titulo: { fontSize: T.size.caption, color: C.textDim, marginTop: 4, lineHeight: 17 },
  scoreBox: { borderWidth: 1, borderRadius: R.sm, paddingVertical: 6, paddingHorizontal: 12, alignItems: 'center', minWidth: 84 },
  scoreVal: { fontSize: T.size.title, fontWeight: T.weight.black },
  scoreMax: { fontSize: T.size.caption, color: C.textMute, fontWeight: T.weight.regular },
  scoreLbl: { fontSize: T.size.nano, color: C.textMute, marginTop: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: S.md, paddingVertical: 8, borderTopWidth: 1, borderTopColor: Hairline.soft },
  itemLabel: { fontSize: T.size.bodySm, fontWeight: T.weight.bold, color: C.text },
  itemDesc: { fontSize: T.size.nano, color: C.textMute, marginTop: 2, lineHeight: 14 },
  btns: { flexDirection: 'row', gap: 5 },
  btn: { width: 32, height: 32, borderRadius: R.xs, borderWidth: 1, borderColor: C.border, backgroundColor: withAlpha('#FFFFFF', 0.03), alignItems: 'center', justifyContent: 'center' },
  btnTxt: { fontSize: T.size.body, fontWeight: T.weight.extrabold, color: C.textMute },
  nota: { marginTop: S.sm, minHeight: 44, borderWidth: 1, borderColor: C.border, borderRadius: R.sm, padding: S.sm, color: C.text, fontSize: T.size.caption, backgroundColor: withAlpha('#FFFFFF', 0.03), textAlignVertical: 'top' },
  foot: { flexDirection: 'row', alignItems: 'center', gap: S.md, marginTop: S.sm, flexWrap: 'wrap' },
  savedTxt: { fontSize: T.size.nano, color: C.textMute, flex: 1 },
});

const pc = StyleSheet.create({
  wrap: { backgroundColor: C.bg, borderRadius: R.lg, borderWidth: 1, borderColor: withAlpha(C.gold, 0.28), padding: S.lg, marginBottom: S.lg },
  head: { marginBottom: S.md },
  title: { fontSize: T.size.caption, fontWeight: T.weight.extrabold, color: C.goldSoft, letterSpacing: 1.1 },
  sub: { fontSize: T.size.nano, color: C.textMute, marginTop: 3 },
  plot: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  col: { flex: 1, alignItems: 'center' },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, width: '100%', justifyContent: 'center' },
  bar: { flex: 1, maxWidth: 34, borderRadius: 4, backgroundColor: C.gold, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 2 },
  barLiv: { backgroundColor: C.lecturaAccent },
  barVal: { fontSize: T.size.nano, fontWeight: T.weight.black, color: C.onGold },
  x: { fontSize: T.size.micro, color: C.textMute, marginTop: 6, fontWeight: T.weight.bold },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: S.md, flexWrap: 'wrap' },
  dot: { width: 9, height: 9, borderRadius: 5 },
  legendTxt: { fontSize: T.size.nano, color: C.textMute },
});

const cd = StyleSheet.create({
  wrap: {
    backgroundColor: C.bg,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: withAlpha(C.gold, 0.28),
    borderLeftWidth: 3,
    borderLeftColor: C.gold,
    padding: S.lg,
    overflow: 'hidden',
    marginBottom: S.lg,
  },
  hairline: { position: 'absolute', top: 0, left: 0, right: 0, height: 1, backgroundColor: C.gold, opacity: 0.5 } as any,
  head: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: S.md, flexWrap: 'wrap', gap: 6 },
  title: { fontSize: T.size.caption, fontWeight: T.weight.extrabold, color: C.goldSoft, letterSpacing: 1.2 },
  hint: { fontSize: T.size.nano, color: C.textMute, letterSpacing: 0.3 },
  grid: isWeb
    ? ({ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 } as any)
    : { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  cell: {
    minWidth: 130, flexGrow: 1, flexBasis: 130,
    backgroundColor: C.surface,
    borderRadius: R.sm,
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: S.md,
    paddingHorizontal: S.md,
  },
  cellTop: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5 },
  glyph: { fontSize: T.size.caption, color: C.gold, fontWeight: T.weight.black },
  cellLabel: { fontSize: T.size.nano, fontWeight: T.weight.extrabold, color: C.textMute, letterSpacing: 0.8, flex: 1 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  value: { fontSize: T.size.titleXl, fontWeight: T.weight.light, color: C.goldSoft, letterSpacing: T.tracking.tight },
  meta: { fontSize: T.size.nano, color: C.success, marginTop: 2, letterSpacing: 0.3, fontWeight: T.weight.bold },
  unit: { fontSize: T.size.nano, color: C.textMute, marginTop: 4, lineHeight: 13 },
  nota: { fontSize: T.size.caption, color: C.textDim, marginTop: S.md, lineHeight: 18 },
});

// ── AurumRise: entrada escalonada (cascada de boot, web) ────────────────────
export function AurumRise({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: ViewStyle }) {
  const anim = isWeb
    ? ({ animationName: 'aurumRise', animationDuration: '0.6s', animationFillMode: 'both', animationDelay: `${delay}ms`, animationTimingFunction: 'cubic-bezier(.16,1,.3,1)' } as any)
    : {};
  return <View {...(isWeb ? ({ 'data-aurum-anim': '' } as any) : {})} style={[anim, style]}>{children}</View>;
}

// ── Hover helper para tarjetas (lift + borde oro en web) ────────────────────
export function useAurumHover() {
  const [hovered, setHovered] = useState(false);
  const hoverProps = isWeb ? { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) } : {};
  return { hovered, hoverProps };
}

const v = StyleSheet.create({
  hero: {
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: withAlpha(C.gold, 0.24),
    padding: S['2xl'],
    overflow: 'hidden',
    ...AurumShadow.card,
    ...Elevation.lg,
  },
  chip: {
    borderRadius: R.pill,
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 11,
    alignSelf: 'flex-start',
  },
  chipTxt: { fontSize: T.size.micro, fontWeight: T.weight.extrabold, letterSpacing: 0.6 },
  label: {
    fontSize: T.size.caption,
    fontWeight: T.weight.bold,
    letterSpacing: T.tracking.label,
    lineHeight: 17,
    textTransform: 'uppercase',
    marginBottom: S.md,
  },
  panel: {
    backgroundColor: C.surface,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    padding: S.xl,
    ...Elevation.sm,
    ...web({ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }),
  },
  btn: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: R.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: { fontSize: T.size.body, fontWeight: T.weight.extrabold, letterSpacing: 0.4 },
  barTrack: { backgroundColor: withAlpha('#FFFFFF', 0.08), overflow: 'hidden', borderWidth: 1, borderColor: Hairline.soft },
  ringLabel: { fontSize: T.size.micro, fontWeight: T.weight.extrabold, color: C.textDim, letterSpacing: 0.8, marginTop: 9, textAlign: 'center' },
  ringSub: { fontSize: T.size.nano, color: C.textMute, marginTop: 2, textAlign: 'center', letterSpacing: 0.2 },
});
