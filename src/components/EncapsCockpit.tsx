// EncapsCockpit — componentes-firma del segmento ENCAPS: "sala de guerra / cockpit de examen".
// HUD superior con cuenta regresiva al 20-ago, altímetro Go/No-Go >17/20, strip de telemetría
// de rentabilidad por área (Bloomberg) y radar de repasos por prioridad.
//
// REGLAS: presentacional puro. NO recalcula fechas (recibe días de metrics), NO toca el motor
// ni Supabase ni item_key. Numerales monoespaciados/tabulares (motivo Bloomberg/cockpit).
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline } from '../theme/tokens';
import {
  ENCAPS_AREA_FORECAST, ENCAPS_CRITICAL_TOPICS, ENCAPS_VUELTAS_POR_PRIORIDAD,
  ENCAPS_META_NOTA, ENCAPS_META_PCT, encapsGoZone, encapsGoColor, ENCAPS_TELEMETRY_META,
} from '../lib/encapsRentabilidad';

// Fuente monoespaciada táctica (numerales tabulares) — motivo terminal/cockpit.
const MONO = Platform.select({ web: "'SF Mono','JetBrains Mono','Roboto Mono',ui-monospace,monospace", default: 'monospace' }) as string;
const tabular = Platform.OS === 'web' ? ({ fontVariant: ['tabular-nums'] as any, fontFamily: MONO } as any) : { fontFamily: MONO };

// Deriva la FASE del plan desde el estado actual (no recalcula fechas).
// deep_prime → COBERTURA · repaso → VUELTAS+Q · últimos ≤7 días → RECTA FINAL.
export function encapsFase(tipo: string | undefined, diasAExamen: number | null | undefined): { label: string; sub: string } {
  if (diasAExamen != null && diasAExamen <= 7) return { label: 'RECTA FINAL', sub: 'consolidación · modo examen' };
  if (tipo === 'repaso') return { label: 'VUELTAS + Q', sub: 'repaso espaciado · banco' };
  if (tipo === 'deep_prime') return { label: 'COBERTURA', sub: 'deep-prime · primera pasada' };
  return { label: 'OPERACIÓN', sub: 'plan ENCAPS activo' };
}

// ─────────────────────────────────────────────────────────────────────────────
// HUD de cuenta regresiva (Countdown Cockpit) — banda superior táctica.
// ─────────────────────────────────────────────────────────────────────────────
export function CountdownCockpit({
  diasAExamen, tipo, promSim, coberturaPct, qxPct, notasCount, compact,
}: {
  diasAExamen: number | null | undefined;
  tipo: string | undefined;
  promSim: number | null | undefined;
  coberturaPct: number | null | undefined;
  qxPct: number | null | undefined;
  notasCount: number;
  compact?: boolean;
}) {
  const fase = encapsFase(tipo, diasAExamen);
  const zone = encapsGoZone(promSim);
  const goColor = encapsGoColor(zone);
  const dd = diasAExamen != null ? String(diasAExamen) : '––';

  return (
    <View style={[styles.hud, compact && styles.hudCompact]}>
      {/* líneas de escaneo tenues (grid de telemetría) */}
      <View style={styles.scanline} pointerEvents="none" />
      <View style={styles.hudTop}>
        <Text style={styles.hudEyebrow}>ENCAPS · MANTENIMIENTO 2027-I</Text>
        <View style={styles.hudObjChip}>
          <Text style={styles.hudObjChipText}>EXAMEN FIN-MAR 2027</Text>
        </View>
      </View>

      <View style={styles.hudRow}>
        {/* Cuenta regresiva — numeral gigante oro */}
        <View style={styles.hudCountdown}>
          <Text style={[styles.hudDD, tabular]}>{dd}</Text>
          <View>
            <Text style={styles.hudDDUnit}>DÍAS</Text>
            <Text style={styles.hudDDSub}>al examen</Text>
          </View>
        </View>

        {/* Fase actual */}
        <View style={styles.hudFase}>
          <Text style={styles.hudFaseLabel}>{fase.label}</Text>
          <Text style={styles.hudFaseSub} numberOfLines={1}>{fase.sub}</Text>
        </View>
      </View>

      {/* Altímetro Go/No-Go >17/20 */}
      <GoNoGoAltimeter promSim={promSim} notasCount={notasCount} />

      {/* mini-telemetría inferior */}
      {!compact && (
        <View style={styles.hudMini}>
          <MiniStat label="COBERTURA" value={coberturaPct != null ? `${coberturaPct}%` : '––'} accent={Colors.blue} />
          <MiniStat label="QX VISTOS" value={qxPct != null ? `${qxPct}%` : '––'} accent={Colors.blue} />
          <MiniStat label="GO/NO-GO" value={zone === 'go' ? 'GO' : zone === 'none' ? '––' : 'NO-GO'} accent={goColor} />
        </View>
      )}
    </View>
  );
}

function MiniStat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <View style={styles.miniStat}>
      <Text style={[styles.miniStatValue, tabular, { color: accent }]}>{value}</Text>
      <Text style={styles.miniStatLabel}>{label}</Text>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Altímetro >17/20 (Go/No-Go gauge) — barra-instrumento con zona objetivo al 85%.
// ─────────────────────────────────────────────────────────────────────────────
export function GoNoGoAltimeter({ promSim, notasCount }: { promSim: number | null | undefined; notasCount: number }) {
  const zone = encapsGoZone(promSim);
  const color = encapsGoColor(zone);
  const pct = promSim != null ? Math.max(0, Math.min(100, (promSim / 20) * 100)) : 0;

  return (
    <View style={styles.altWrap}>
      <View style={styles.altHeader}>
        <Text style={styles.altLabel}>ALTÍMETRO · PROM. SIMULACROS</Text>
        <Text style={[styles.altReading, tabular, { color }]}>
          {promSim != null ? promSim.toFixed(1) : '––'}<Text style={styles.altReadingSub}>/20</Text>
        </Text>
      </View>
      <View style={styles.altTrack}>
        {/* zona objetivo (≥85%) marcada tenue */}
        <View style={styles.altTargetZone} pointerEvents="none" />
        <View style={[styles.altFill, { width: `${pct}%`, backgroundColor: color }]} />
        {/* línea oro = 17/20 (85%) */}
        <View style={styles.altMarker} pointerEvents="none" />
      </View>
      <View style={styles.altFooter}>
        <Text style={styles.altFootHint}>
          zona GO ≥ <Text style={[tabular, { color: Colors.gold, fontWeight: '800' }]}>{ENCAPS_META_NOTA}/20</Text> · marca {ENCAPS_META_PCT}%
        </Text>
        <Text style={styles.altFootHint}>{notasCount} sim{notasCount === 1 ? '' : 's'} con nota</Text>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Telemetría de rentabilidad por área (Bloomberg strip) — filas densas monoespaciadas.
// ─────────────────────────────────────────────────────────────────────────────
export function RentabilidadStrip({ compact }: { compact?: boolean }) {
  const max = Math.max(...ENCAPS_AREA_FORECAST.map(a => a.pct));
  return (
    <View style={styles.telBox}>
      <View style={styles.telHeader}>
        <Text style={styles.telTitle}>■ TELEMETRÍA DE RENTABILIDAD</Text>
        <Text style={styles.telEst}>{ENCAPS_TELEMETRY_META.confianza}</Text>
      </View>
      <Text style={styles.telDisclaimer}>{ENCAPS_TELEMETRY_META.disclaimer} · {ENCAPS_TELEMETRY_META.formato}</Text>

      {ENCAPS_AREA_FORECAST.map(a => {
        const w = max > 0 ? (a.pct / max) * 100 : 0;
        return (
          <View key={a.code} style={styles.telRow}>
            <Text style={[styles.telCode, tabular, { color: a.accent }]}>{a.code}</Text>
            <Text style={styles.telShort}>{a.short}</Text>
            <View style={styles.telBarTrack}>
              <View style={[styles.telBarFill, { width: `${w}%`, backgroundColor: a.accent }]} />
            </View>
            <Text style={[styles.telPct, tabular, { color: a.accent }]}>{a.pct}%</Text>
            <Text style={[styles.telBand, tabular]}>±{a.bandLo}-{a.bandHi}</Text>
          </View>
        );
      })}

      {!compact && (
        <>
          <Text style={styles.telSubhead}>▲ TICKERS CRÍTICOS · dominar o cae fuera de rango</Text>
          <View style={styles.telTickers}>
            {ENCAPS_CRITICAL_TOPICS.map(t => (
              <View key={t.code} style={[styles.ticker, { borderColor: t.accent + '55' }]}>
                <Text style={[styles.tickerCode, tabular, { color: t.accent }]}>{t.code}</Text>
                <Text style={styles.tickerLabel} numberOfLines={1}>{t.label}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Leyenda del radar de repasos por prioridad — vueltas CRÍT6/ALTA5/MEDIA4/BAJA3.
// (El listado interactivo de repasos sigue en HoyView; esto es la escala de mando.)
// ─────────────────────────────────────────────────────────────────────────────
export function RetrievalRadarLegend() {
  return (
    <View style={styles.radarLegend}>
      {ENCAPS_VUELTAS_POR_PRIORIDAD.map(v => (
        <View key={v.key} style={styles.radarChip}>
          <View style={[styles.radarDot, { backgroundColor: v.accent }]} />
          <Text style={styles.radarChipLabel}>{v.label}</Text>
          <Text style={[styles.radarChipN, tabular, { color: v.accent }]}>×{v.vueltas}</Text>
        </View>
      ))}
    </View>
  );
}

const CARD = '#0F1626'; // surfaceContainerLow
const styles = StyleSheet.create({
  // ── HUD Cockpit
  hud: {
    backgroundColor: '#0B1220',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Hairline.accentSoft,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Elevation.md,
  },
  hudCompact: { paddingVertical: Spacing.md },
  scanline: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
    backgroundColor: Colors.gold + '55',
  },
  hudTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  hudEyebrow: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.muted, letterSpacing: 1.4, textTransform: 'uppercase' },
  hudObjChip: { borderWidth: 1, borderColor: Hairline.accentSoft, backgroundColor: Colors.gold + '14', borderRadius: BorderRadius.full, paddingVertical: 2, paddingHorizontal: 9 },
  hudObjChipText: { fontSize: 9, fontWeight: '800', color: Colors.gold, letterSpacing: 0.8 },

  hudRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  hudCountdown: { flexDirection: 'row', alignItems: 'baseline', gap: Spacing.sm },
  hudDD: { fontSize: 52, fontWeight: '900', color: Colors.gold, letterSpacing: -2, lineHeight: 54 },
  hudDDUnit: { fontSize: FontSize.labelMd, fontWeight: '900', color: Colors.champagne, letterSpacing: 2 },
  hudDDSub: { fontSize: FontSize.labelSm, color: Colors.muted, letterSpacing: 0.4 },
  hudFase: { alignItems: 'flex-end', flex: 1, marginLeft: Spacing.md },
  hudFaseLabel: { fontSize: FontSize.titleMd, fontWeight: '900', color: Colors.onSurface, letterSpacing: 1, textTransform: 'uppercase' },
  hudFaseSub: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2, letterSpacing: 0.3 },

  hudMini: { flexDirection: 'row', marginTop: Spacing.md, borderTopWidth: 1, borderTopColor: Hairline.soft, paddingTop: Spacing.sm },
  miniStat: { flex: 1, alignItems: 'center', borderRightWidth: 1, borderRightColor: Hairline.soft },
  miniStatValue: { fontSize: FontSize.titleMd, fontWeight: '900', letterSpacing: 0.5 },
  miniStatLabel: { fontSize: 9, color: Colors.muted, fontWeight: '700', letterSpacing: 1, marginTop: 2 },

  // ── Altímetro
  altWrap: { marginTop: Spacing.md },
  altHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 5 },
  altLabel: { fontSize: 9, fontWeight: '800', color: Colors.muted, letterSpacing: 1.2, textTransform: 'uppercase' },
  altReading: { fontSize: FontSize.titleLg, fontWeight: '900', letterSpacing: 0.5 },
  altReadingSub: { fontSize: FontSize.labelMd, color: Colors.muted, fontWeight: '700' },
  altTrack: { height: 10, backgroundColor: '#060A14', borderRadius: 5, overflow: 'hidden', borderWidth: 1, borderColor: Hairline.soft, position: 'relative' },
  altTargetZone: { position: 'absolute', left: '85%', right: 0, top: 0, bottom: 0, backgroundColor: Colors.green + '1A' },
  altFill: { height: '100%', borderRadius: 5 },
  altMarker: { position: 'absolute', left: '85%', top: -2, bottom: -2, width: 2, backgroundColor: Colors.gold },
  altFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  altFootHint: { fontSize: FontSize.labelSm, color: Colors.muted, letterSpacing: 0.2 },

  // ── Telemetría rentabilidad (Bloomberg)
  telBox: {
    backgroundColor: CARD, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft,
    padding: Spacing.md, marginBottom: Spacing.md, ...Elevation.sm,
  },
  telHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  telTitle: { fontSize: FontSize.labelMd, fontWeight: '900', color: Colors.gold, letterSpacing: 0.8 },
  telEst: { fontSize: 9, fontWeight: '800', color: Colors.brass, letterSpacing: 1, borderWidth: 1, borderColor: Colors.brass + '55', borderRadius: BorderRadius.full, paddingVertical: 1, paddingHorizontal: 7, overflow: 'hidden' },
  telDisclaimer: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 3, marginBottom: Spacing.sm, lineHeight: 15, fontStyle: 'italic' },
  telRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, borderTopWidth: 1, borderTopColor: Hairline.soft },
  telCode: { width: 34, fontSize: FontSize.labelMd, fontWeight: '900', letterSpacing: 0.3 },
  telShort: { width: 34, fontSize: 9, fontWeight: '700', color: Colors.muted, letterSpacing: 0.5 },
  telBarTrack: { flex: 1, height: 7, backgroundColor: '#060A14', borderRadius: 4, overflow: 'hidden', marginHorizontal: Spacing.sm },
  telBarFill: { height: 7, borderRadius: 4 },
  telPct: { width: 40, textAlign: 'right', fontSize: FontSize.bodyMd, fontWeight: '900', letterSpacing: 0.3 },
  telBand: { width: 52, textAlign: 'right', fontSize: 9, color: Colors.muted, fontWeight: '700' },

  telSubhead: { fontSize: 9, fontWeight: '900', color: Colors.brass, letterSpacing: 1, marginTop: Spacing.md, marginBottom: Spacing.sm },
  telTickers: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  ticker: { flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1, borderRadius: BorderRadius.sm, paddingVertical: 3, paddingHorizontal: 7, backgroundColor: '#060A14' },
  tickerCode: { fontSize: FontSize.labelSm, fontWeight: '900', letterSpacing: 0.3 },
  tickerLabel: { fontSize: 9, color: Colors.onSurfaceVariant, maxWidth: 130 },

  // ── Radar leyenda
  radarLegend: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: Spacing.sm },
  radarChip: { flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1, borderColor: Hairline.soft, borderRadius: BorderRadius.full, paddingVertical: 3, paddingHorizontal: 9, backgroundColor: '#060A14' },
  radarDot: { width: 7, height: 7, borderRadius: 4 },
  radarChipLabel: { fontSize: 9, fontWeight: '800', color: Colors.onSurfaceVariant, letterSpacing: 0.6 },
  radarChipN: { fontSize: FontSize.labelSm, fontWeight: '900' },
});
