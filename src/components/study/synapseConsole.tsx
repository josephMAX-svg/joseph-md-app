import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Colors, FontSize, BorderRadius, Elevation, Hairline } from '../../theme/tokens';
import { monoText } from '../empresa/primitives';

/**
 * synapseConsole — capa visual PROPIA del segmento Synapse (CONSOLA NEURAL).
 * Metáfora: observabilidad de un modelo en entrenamiento (Anthropic Console /
 * Warp / W&B). Cada día = "run", cada fase = "checkpoint", progreso = "training
 * loss bajando". Tipografía MONO para labels/métricas, grafo de fases (attribution
 * graph), StatusBar tipo IDE. Acento firma PERIWINKLE + oro reservado a HITOS/META.
 *
 * NO edita empresa/*; sólo importa monoText (voz mono web-safe) y los tokens.
 * Todo el movimiento va tras Platform.OS === 'web'; en native degrada a estático.
 */

export const isWeb = Platform.OS === 'web';

// Paleta de la consola (deriva de tokens; periwinkle = acento canónico Synapse).
export const PERIWINKLE = '#7C83D6';
export const PW_GLOW = '#8E96DE';           // Gradients.indigo[0] — glow del nodo activo
export const PW_DEEP = '#5A63B0';           // Gradients.indigo[1]
export const CONSOLE = {
  periwinkle: PERIWINKLE,
  passed: Colors.green,        // ✓ jade — checkpoint completado
  queued: Colors.muted,        // ○ muted — pendiente / queued
  running: PERIWINKLE,         // ▷ periwinkle — run activo
  keyboard: Colors.coral,      // ✗ terracota — "requiere teclado" / bloqueado en huecos
  milestone: Colors.gold,      // ★ oro — hito verificado / META / Fellows
} as const;

// Voz monoespaciada de la consola (web: familia mono; native: tabular-nums).
export const mono: any = monoText;
export const monoLabel: any = { ...monoText, letterSpacing: 0.4, textTransform: 'uppercase' };

// Exit-status glyph por tag de bloque (○ queued · ▷ running/lección · ✓ passed).
export function statusGlyph(tag: string, done?: boolean): { glyph: string; color: string } {
  if (done) return { glyph: '✓', color: CONSOLE.passed };
  switch (tag) {
    case 'A': return { glyph: '▷', color: CONSOLE.periwinkle };
    case 'PC': return { glyph: '◆', color: CONSOLE.keyboard };
    case 'R': return { glyph: '↻', color: CONSOLE.passed };
    default: return { glyph: '○', color: CONSOLE.queued };
  }
}

// Color de barra-de-status lateral por tag (data-plane del RunBlock).
export function tagBar(tag: string): string {
  switch (tag) {
    case 'A': return CONSOLE.periwinkle;
    case 'PC': return CONSOLE.keyboard;
    case 'R': return CONSOLE.passed;
    default: return CONSOLE.queued;
  }
}

// ── Inyección única de keyframes de la consola (web) ──────────────
if (isWeb && typeof document !== 'undefined') {
  const id = 'synapse-console-anims';
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
      @keyframes synScan { 0%{transform:translateY(-100%)} 100%{transform:translateY(120%)} }
      @keyframes synPulse { 0%{opacity:.55;box-shadow:0 0 0 0 rgba(124,131,214,.45)} 70%{opacity:1;box-shadow:0 0 0 9px rgba(124,131,214,0)} 100%{opacity:.55;box-shadow:0 0 0 0 rgba(124,131,214,0)} }
      @keyframes synBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
      @keyframes synFlow { 0%{background-position:0 0} 100%{background-position:26px 0} }
      @media (prefers-reduced-motion: reduce) {
        [data-syn-anim]{animation:none !important}
      }
    `;
    document.head.appendChild(s);
  }
}

// ── ConsoleGrid: data-plane dotted grid + scanline periwinkle (web) ──
export function ConsoleGrid() {
  if (!isWeb) return null;
  return (
    <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' } as any}>
      {/* dotted data-plane */}
      <View style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5,
        backgroundImage: 'radial-gradient(rgba(124,131,214,0.10) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
      } as any} />
      {/* scanline periwinkle */}
      <View {...({ dataSet: { synAnim: '' } } as any)} style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '40%', opacity: 0.6,
        backgroundImage: 'linear-gradient(180deg, rgba(124,131,214,0.10), transparent)',
        animationName: 'synScan', animationDuration: '7.5s', animationIterationCount: 'infinite', animationTimingFunction: 'linear',
      } as any} />
    </View>
  );
}

// ── PromptGlyph: bullet de consola (› / $) ────────────────────────
export function PromptGlyph({ char = '›', color = PERIWINKLE, size = FontSize.labelMd }: { char?: string; color?: string; size?: number }) {
  return <Text style={[{ color, fontSize: size, fontWeight: '800' }, mono]}>{char}</Text>;
}

// ── Caret: cursor parpadeante mono (web) ──────────────────────────
export function Caret({ color = PERIWINKLE }: { color?: string }) {
  if (!isWeb) return <Text style={[{ color }, mono]}>▍</Text>;
  return <Text {...({ dataSet: { synAnim: '' } } as any)} style={[{ color, animationName: 'synBlink', animationDuration: '1.1s', animationIterationCount: 'infinite' } as any, mono]}>▍</Text>;
}

// ── TelemetryStrip: franja IDE de métricas mono en vivo (loss↓ / run / streak) ──
export type Telemetry = { label: string; value: string; color?: string; accent?: boolean };
export function TelemetryStrip({ items }: { items: Telemetry[] }) {
  return (
    <View style={sc.stripWrap}>
      <View style={sc.stripInner}>
        {items.map((it, i) => (
          <React.Fragment key={i}>
            {i > 0 ? <View style={sc.stripSep} /> : null}
            <View style={sc.stripCell}>
              <Text style={sc.stripLabel} numberOfLines={1}>{it.label}</Text>
              <Text style={[sc.stripValue, { color: it.color ?? (it.accent ? PERIWINKLE : Colors.onSurface) }]} numberOfLines={1}>{it.value}</Text>
            </View>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

// ── PhaseNode: un nodo del grafo de fases ─────────────────────────
type PhaseState = 'activa' | 'pendiente' | 'meta';
function nodeColor(state: PhaseState, isDone: boolean): string {
  if (state === 'meta') return CONSOLE.milestone;
  if (state === 'activa') return CONSOLE.periwinkle;
  if (isDone) return CONSOLE.passed;
  return CONSOLE.queued;
}

// ── PhaseGraph: grafo horizontal de checkpoints F0→…→F6(META) ─────
// En mobile / narrow colapsa a rail vertical. Nodo activo "encendido" (glow).
export type PhaseGraphItem = { id: string; fase: string; titulo: string; estado: PhaseState };
export function PhaseGraph({ items, vertical = false, compact = false }: { items: PhaseGraphItem[]; vertical?: boolean; compact?: boolean }) {
  const activeIdx = items.findIndex((p) => p.estado === 'activa');

  const Node = ({ p, i }: { p: PhaseGraphItem; i: number }) => {
    const isDone = activeIdx >= 0 ? i < activeIdx : false;
    const c = nodeColor(p.estado, isDone);
    const active = p.estado === 'activa';
    const meta = p.estado === 'meta';
    const dotGlyph = meta ? '★' : isDone ? '✓' : active ? '▶' : '○';
    return (
      <View style={vertical ? sc.pgNodeRowV : sc.pgNodeCol}>
        <View
          {...(isWeb && active ? ({ dataSet: { synAnim: '' } } as any) : {})}
          style={[
            sc.pgDot,
            { borderColor: c, backgroundColor: c + (active ? '26' : '14') },
            active && isWeb ? ({ animationName: 'synPulse', animationDuration: '2.4s', animationIterationCount: 'infinite' } as any) : null,
            active ? Elevation.glow(c) : null,
          ]}
        >
          <Text style={[sc.pgDotGlyph, { color: c }]}>{dotGlyph}</Text>
        </View>
        <View style={vertical ? { flex: 1, marginLeft: 10 } : { alignItems: 'center', marginTop: 6, maxWidth: 96 }}>
          <Text style={[sc.pgFase, { color: c }]} numberOfLines={1}>{p.fase}</Text>
          {!compact ? <Text style={sc.pgTitulo} numberOfLines={2}>{p.titulo}</Text> : null}
        </View>
      </View>
    );
  };

  if (vertical) {
    return (
      <View style={sc.pgRailV}>
        {items.map((p, i) => (
          <View key={p.id} style={{ position: 'relative' }}>
            {i < items.length - 1 ? <View style={[sc.pgLineV, { backgroundColor: i < activeIdx ? CONSOLE.passed + '99' : Hairline.strong }]} /> : null}
            <Node p={p} i={i} />
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={sc.pgRailH}>
      {items.map((p, i) => {
        // conexión "encendida" (jade) hasta el nodo activo; muted más allá
        const leftDone = activeIdx >= 0 && i <= activeIdx;
        const rightDone = activeIdx >= 0 && i < activeIdx;
        return (
          <View key={p.id} style={sc.pgSegment}>
            <View style={sc.pgConnRow}>
              <View style={[sc.pgLineH, i === 0 ? { opacity: 0 } : { backgroundColor: leftDone ? CONSOLE.passed + 'AA' : Hairline.strong }]} />
              <View style={sc.pgDotHolder}><Node p={p} i={i} /></View>
              <View style={[sc.pgLineH, i === items.length - 1 ? { opacity: 0 } : { backgroundColor: rightDone ? CONSOLE.passed + 'AA' : Hairline.strong }]} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const sc = StyleSheet.create({
  // TelemetryStrip
  stripWrap: {
    backgroundColor: '#0B1220',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: PERIWINKLE + '33',
    overflow: 'hidden',
    ...Elevation.sm,
  },
  stripInner: { flexDirection: 'row', alignItems: 'stretch', flexWrap: 'wrap' },
  stripCell: { flexGrow: 1, flexBasis: 96, paddingVertical: 9, paddingHorizontal: 12, minWidth: 84 },
  stripSep: { width: 1, backgroundColor: Hairline.medium },
  stripLabel: { fontSize: 8, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.9, textTransform: 'uppercase', ...monoText },
  stripValue: { fontSize: FontSize.bodyMd, fontWeight: '800', marginTop: 3, letterSpacing: 0.2, ...monoText },

  // PhaseGraph — horizontal
  pgRailH: { flexDirection: 'row', alignItems: 'flex-start', width: '100%' },
  pgSegment: { flex: 1, alignItems: 'center' },
  pgConnRow: { flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' },
  pgLineH: { flex: 1, height: 2, borderRadius: 1 },
  pgDotHolder: { alignItems: 'center' },
  pgNodeCol: { alignItems: 'center' },
  pgDot: { width: 34, height: 34, borderRadius: 17, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  pgDotGlyph: { fontSize: 14, fontWeight: '800' },
  pgFase: { fontSize: FontSize.labelSm, fontWeight: '800', letterSpacing: 0.8, ...monoText },
  pgTitulo: { fontSize: 9, color: Colors.onSurfaceVariant, marginTop: 2, textAlign: 'center', lineHeight: 12 },

  // PhaseGraph — vertical rail (mobile)
  pgRailV: { paddingLeft: 2 },
  pgNodeRowV: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5 },
  pgLineV: { position: 'absolute', left: 16, top: 22, width: 2, bottom: -10, borderRadius: 1 },
});
