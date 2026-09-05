// EncapsCockpit — componentes-firma del segmento ENCAPS: "sala de guerra / cockpit de examen".
// HUD superior con cuenta regresiva al examen 2027-I, altímetro Go/No-Go, strip de telemetría v3
// de rentabilidad por área (Bloomberg), radar de repasos por prioridad, serie de MINI-SIMS de viernes
// contra la línea 18/25 y % CIEGO semanal (study_progress) contra la meta 85%.
//
// REGLAS: presentacional puro. NO recalcula fechas (recibe días de metrics), NO toca el motor
// ni Supabase ni item_key. Numerales monoespaciados/tabulares (motivo Bloomberg/cockpit).
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline } from '../theme/tokens';
import {
  ENCAPS_AREA_FORECAST, ENCAPS_CRITICAL_TOPICS, ENCAPS_REBOTE_TOPICS, ENCAPS_VUELTAS_POR_PRIORIDAD,
  ENCAPS_META_NOTA, ENCAPS_META_PCT, encapsGoZone, encapsGoColor, ENCAPS_TELEMETRY_META,
  ENCAPS_MINISIM_META, encapsMiniSimZone, ENCAPS_CIEGO_META_PCT, ENCAPS_CIEGO_CRUCERO_PCT, encapsCiegoZone,
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
          <Text style={styles.telSubhead}>▲ 8 TICKERS CRÍTICOS v3 (~49% del examen) · dominar o cae fuera de rango</Text>
          <View style={styles.telTickers}>
            {ENCAPS_CRITICAL_TOPICS.map(t => (
              <View key={t.code} style={[styles.ticker, { borderColor: t.accent + '55' }]}>
                <Text style={[styles.tickerCode, tabular, { color: t.accent }]}>{t.code}</Text>
                {t.pct != null && <Text style={[styles.tickerPct, tabular]}>{t.pct}%</Text>}
                <Text style={styles.tickerLabel} numberOfLines={1}>{t.label}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.telSubhead}>↩ ALTA CON FLAG DE REBOTE · aplastados en 2026-II, no enterrar</Text>
          <View style={styles.telTickers}>
            {ENCAPS_REBOTE_TOPICS.map(t => (
              <View key={t.code} style={[styles.ticker, { borderColor: Colors.brass + '55', borderStyle: 'dashed' }]}>
                <Text style={[styles.tickerCode, tabular, { color: Colors.brass }]}>{t.code}</Text>
                {t.pct != null && <Text style={[styles.tickerPct, tabular]}>{t.pct}%</Text>}
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
// Serie de MINI-SIMS de viernes (25Q · 72 s/Q) contra la línea 18/25 (umbral) y 15/25 (alerta).
// Recibe la serie ya derivada (encapsPlan.miniSimSerie): {semana, fecha, nota|null}.
// ─────────────────────────────────────────────────────────────────────────────
export interface MiniSimPuntoView { semana: number; fecha: string; nota: number | null; dia?: number }
export function MiniSimTrend({ serie, compact }: { serie: MiniSimPuntoView[]; compact?: boolean }) {
  const H = 72;
  const total = ENCAPS_MINISIM_META.totalQ;
  const conNota = serie.filter(s => s.nota != null);
  const notas = conNota.map(s => s.nota as number);
  const prom = notas.length ? notas.reduce((a, b) => a + b, 0) / notas.length : null;
  const ult = notas.length ? notas[notas.length - 1] : null;
  const prev3 = notas.slice(-6, -3), last3 = notas.slice(-3);
  const avg = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : null);
  const tA = avg(prev3), tB = avg(last3);
  const tendencia = tA != null && tB != null ? (tB - tA >= 1 ? '▲' : tB - tA <= -1 ? '▼' : '►') : '–';
  const alerta = notas.length >= 2 && notas[notas.length - 1] < ENCAPS_MINISIM_META.alerta && notas[notas.length - 2] < ENCAPS_MINISIM_META.alerta;
  const zone = encapsMiniSimZone(ult);
  const zoneColor = encapsGoColor(zone);
  const yPct = (v: number): `${number}%` => `${Math.round((v / total) * 100)}%`;
  return (
    <View style={styles.telBox}>
      <View style={styles.telHeader}>
        <Text style={styles.telTitle}>■ MINI-SIMS DE VIERNES · /{total}</Text>
        <Text style={[styles.telEst, { color: zoneColor, borderColor: zoneColor + '55' }]}>
          {ult != null ? `ÚLT ${ult}/${total}` : 'SIN NOTA'}
        </Text>
      </View>
      <Text style={styles.telDisclaimer}>
        umbral ≥{ENCAPS_MINISIM_META.umbral}/{total} hacia diciembre (línea oro) · alerta &lt;{ENCAPS_MINISIM_META.alerta}/{total} dos viernes seguidos (línea coral) → re-ponderar la semana siguiente
      </Text>
      <View style={[styles.msChart, { height: H }]}>
        <View style={[styles.msLine, { bottom: yPct(ENCAPS_MINISIM_META.umbral), backgroundColor: Colors.gold }]} pointerEvents="none" />
        <View style={[styles.msLine, { bottom: yPct(ENCAPS_MINISIM_META.alerta), backgroundColor: Colors.coral + '99' }]} pointerEvents="none" />
        {serie.map(s => {
          const z = encapsMiniSimZone(s.nota);
          const h = s.nota == null ? 3 : Math.max(3, Math.round((s.nota / total) * H));
          return (
            <View key={s.semana} style={styles.msBarCol}>
              <View style={[styles.msBar, { height: h, backgroundColor: s.nota == null ? Colors.muted + '66' : encapsGoColor(z) }]} />
            </View>
          );
        })}
      </View>
      <View style={styles.msAxis}>
        {serie.map(s => (
          <Text key={s.semana} style={[styles.msAxisLabel, tabular]} numberOfLines={1}>
            {compact ? '' : (s.semana % 2 === 1 ? String(s.fecha).slice(5).replace('-', '/') : '')}
          </Text>
        ))}
      </View>
      <View style={styles.altFooter}>
        <Text style={styles.altFootHint}>
          {conNota.length}/{serie.length} con nota · prom <Text style={[tabular, { color: Colors.champagne, fontWeight: '800' }]}>{prom != null ? prom.toFixed(1) : '––'}</Text> · tendencia {tendencia}
        </Text>
        <Text style={[styles.altFootHint, { color: alerta ? Colors.coral : Colors.muted, fontWeight: alerta ? '800' : '400' }]}>
          {alerta ? '⚠ 2 viernes <15 → re-ponderar' : `nota en ▲ SIM (sim_n = día)`}
        </Text>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// % CIEGO SEMANAL (correctas seguras / total) desde study_progress, contra la meta 85% (≥17/20)
// y el crucero 75%. La última semana se desglosa por área contra el vector v3.
// ─────────────────────────────────────────────────────────────────────────────
export interface CiegoSemanaView { lunes: string; pct: number; n: number; rondas: number; porArea: Record<string, { pct: number; n: number }> }
export function CiegoSemanalStrip({ semanas }: { semanas: CiegoSemanaView[] }) {
  const H = 64;
  const last = semanas.length ? semanas[semanas.length - 1] : null;
  const zone = encapsCiegoZone(last?.pct);
  const zoneColor = encapsGoColor(zone);
  const vis = semanas.slice(-12);
  return (
    <View style={styles.telBox}>
      <View style={styles.telHeader}>
        <Text style={styles.telTitle}>■ % CIEGO SEMANAL · seguras / total</Text>
        <Text style={[styles.telEst, { color: zoneColor, borderColor: zoneColor + '55' }]}>
          {last ? `${last.pct}%` : 'SIN DATOS'}
        </Text>
      </View>
      <Text style={styles.telDisclaimer}>
        meta {ENCAPS_CIEGO_META_PCT}% (≥17/20, línea oro) · crucero {ENCAPS_CIEGO_CRUCERO_PCT}% en bancos del día · fuente: study_progress (cierre de 1 línea → gen_encaps_semana.js --sql)
      </Text>
      {vis.length === 0 ? (
        <Text style={styles.msEmpty}>Sin cierres registrados todavía. Cada sesión termina con la línea de cierre (17:10) y el viernes se corre gen_encaps_semana.js: ahí nace esta serie.</Text>
      ) : (
        <>
          <View style={[styles.msChart, { height: H }]}>
            <View style={[styles.msLine, { bottom: `${ENCAPS_CIEGO_META_PCT}%`, backgroundColor: Colors.gold }]} pointerEvents="none" />
            <View style={[styles.msLine, { bottom: `${ENCAPS_CIEGO_CRUCERO_PCT}%`, backgroundColor: Colors.brass + '88' }]} pointerEvents="none" />
            {vis.map(s => (
              <View key={s.lunes} style={styles.msBarCol}>
                <View style={[styles.msBar, { height: Math.max(3, Math.round((s.pct / 100) * H)), backgroundColor: encapsGoColor(encapsCiegoZone(s.pct)) }]} />
              </View>
            ))}
          </View>
          <View style={styles.msAxis}>
            {vis.map(s => (
              <Text key={s.lunes} style={[styles.msAxisLabel, tabular]} numberOfLines={1}>{s.lunes.slice(5).replace('-', '/')}</Text>
            ))}
          </View>
          {last && (
            <View style={styles.ciegoAreas}>
              {ENCAPS_AREA_FORECAST.map(a => {
                const v = last.porArea[a.code];
                const c = v ? encapsGoColor(encapsCiegoZone(v.pct)) : Colors.muted;
                return (
                  <View key={a.code} style={styles.ciegoArea}>
                    <Text style={[styles.ciegoAreaCode, tabular, { color: a.accent }]}>{a.code}</Text>
                    <Text style={[styles.ciegoAreaPct, tabular, { color: c }]}>{v ? `${v.pct}%` : '––'}</Text>
                    <Text style={styles.ciegoAreaSub}>{v ? `${v.n}Q` : 'sin Q'} · v3 {a.pct}%</Text>
                  </View>
                );
              })}
            </View>
          )}
          <Text style={styles.altFootHint}>semana del {last?.lunes.slice(5)} · {last?.rondas} rondas · {last?.n}Q · brecha a 85%: {last ? `${Math.max(0, ENCAPS_CIEGO_META_PCT - last.pct)} pp` : '––'}</Text>
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
  tickerPct: { fontSize: 9, fontWeight: '800', color: Colors.champagne },
  tickerLabel: { fontSize: 9, color: Colors.onSurfaceVariant, maxWidth: 130 },

  // ── Mini-sims / % ciego (barras verticales sobre líneas de umbral)
  msChart: { flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#060A14', borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Hairline.soft, paddingHorizontal: 4, paddingTop: 4, position: 'relative', overflow: 'hidden' },
  msLine: { position: 'absolute', left: 0, right: 0, height: 1 },
  msBarCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 1 },
  msBar: { width: '70%', borderTopLeftRadius: 2, borderTopRightRadius: 2 },
  msAxis: { flexDirection: 'row', marginTop: 3 },
  msAxisLabel: { flex: 1, fontSize: 8, color: Colors.muted, textAlign: 'center' },
  msEmpty: { fontSize: FontSize.labelSm, color: Colors.muted, fontStyle: 'italic', lineHeight: 16, paddingVertical: Spacing.sm },
  ciegoAreas: { flexDirection: 'row', marginTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Hairline.soft, paddingTop: Spacing.sm },
  ciegoArea: { flex: 1, alignItems: 'center' },
  ciegoAreaCode: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  ciegoAreaPct: { fontSize: FontSize.bodyMd, fontWeight: '900', marginTop: 1 },
  ciegoAreaSub: { fontSize: 8, color: Colors.muted, marginTop: 1 },

  // ── Radar leyenda
  radarLegend: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: Spacing.sm },
  radarChip: { flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1, borderColor: Hairline.soft, borderRadius: BorderRadius.full, paddingVertical: 3, paddingHorizontal: 9, backgroundColor: '#060A14' },
  radarDot: { width: 7, height: 7, borderRadius: 4 },
  radarChipLabel: { fontSize: 9, fontWeight: '800', color: Colors.onSurfaceVariant, letterSpacing: 0.6 },
  radarChipN: { fontSize: FontSize.labelSm, fontWeight: '900' },
});
