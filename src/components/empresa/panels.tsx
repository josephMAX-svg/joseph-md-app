import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Linking, ScrollView, TextInput } from 'react-native';
import BrandHorario from './BrandHorario';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import {
  AMBER, BRASS, GlassPanel, SectionLabel, Chip, MetricCard, StatCell, SemaforoDot,
  useHover, semaforoColor, accentColor, estadoCreativoColor, estadoEmpresaColor,
  gridStyle, gridItemStyle, monoText,
} from './primitives';
import {
  LIVIANO_KPIS, KPI_GRUPOS, LIVIANO_OFERTA, ESTUDIO_MERCADO, MARKETING_REGLAS,
  COMPETIDORES, LIVIANO_VENTAS, LIVIANO_LOGISTICA, LIVIANO_PENDIENTES,
  LIVIANO_DIRECTRICES, PULSO_LINKS, PULSO_LINK_GRUPOS, PIRQA_DATA, PULSO_MATRIZ,
  BRANDS, EMPRESAS,
  LIVIANO_ACCESO_PERU, LIVIANO_ACCESO_PERU_REGLAS, LIVIANO_REVISION_TRIMESTRAL, LIVIANO_PROTOCOLO,
  LIVIANO_KPI_SEMANAL, LIVIANO_KPI_REGLA, kpiSemanalSemaforo, kpiSemanalAlertas,
} from '../../lib/empresaData';
import type { KpiSemanalKey } from '../../lib/empresaData';

/**
 * Paneles del Hub de Empresa. Presentacionales y data-driven (todo viene de
 * empresaData.ts). Se reutilizan tal cual en mobile y desktop; el grid se adapta
 * solo (CSS grid auto-fill en web, flexWrap en native).
 */

function openUrl(url: string) {
  Linking.openURL(url).catch(() => {});
}

// ── PanelChrome: ventana de terminal (barra de título + código F# + hairline oro) ─
// Re-encuadra cada panel de LIVIANO como una "ventana" del trading desk.
export function PanelChrome({
  fkey, title, accent = BRASS, children,
}: { fkey: string; title: string; accent?: string; children: React.ReactNode }) {
  return (
    <View style={[s.chromeWrap, { borderLeftColor: accent }]}>
      <View pointerEvents="none" style={s.chromeHairline} />
      <View style={s.chromeBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
          <View style={[s.chromeFkey, { borderColor: accent + '66', backgroundColor: accent + '14' }]}>
            <Text style={[s.chromeFkeyTxt, { color: accent }]}>{fkey}</Text>
          </View>
          <Text style={s.chromeTitle} numberOfLines={1}>{title.toUpperCase()}</Text>
        </View>
        <View style={s.chromeDots}>
          <View style={[s.chromeDot, { backgroundColor: Colors.green }]} />
          <View style={[s.chromeDot, { backgroundColor: BRASS }]} />
          <View style={[s.chromeDot, { backgroundColor: Colors.coral }]} />
        </View>
      </View>
      <View style={s.chromeBody}>{children}</View>
    </View>
  );
}

// ── helpers de layout ────────────────────────────────────────────
function Block({ title, children, accent, style }: { title?: string; children: React.ReactNode; accent?: string; style?: any }) {
  return (
    <View style={[{ marginBottom: Spacing['2xl'] }, style]}>
      {title ? <SectionLabel>{title}</SectionLabel> : null}
      {children}
    </View>
  );
}

function TipLine({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <View style={s.tipLine}>
      <View style={[s.bullet, { backgroundColor: accent ?? AMBER }]} />
      <Text style={s.tipLineLabel}>{label}</Text>
      <Text style={s.tipLineValue}>{value}</Text>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// 1 · COCKPIT / KPIs
// ════════════════════════════════════════════════════════════════

// ── KPI LOG SEMANAL (entrada manual por semana ISO) ──────────────
// Puente honesto: los 18 KPIs del Cockpit son constantes; este log guarda números REALES por
// semana ISO (leads · consultas · altas · MRR · churn · COGS), calcula el semáforo contra la meta
// de LIVIANO_KPI_SEMANAL y aplica la regla "< 80 % dos semanas seguidas → ajustar".
// Persistencia: localStorage 'jmd-liviano-kpi' (este dispositivo). Export JSON descargable para
// archivarlo en DATA/BUSINESS/_kpi/ (hasta que el CRM exponga un endpoint read-only).
const KPI_LOG_KEY = 'jmd-liviano-kpi';
const isWebEnv = Platform.OS === 'web' && typeof window !== 'undefined';
interface KpiSemana { key: string; lunes: string; valores: Partial<Record<KpiSemanalKey, number>>; nota?: string; guardado: string }
interface KpiStore { v: 1; semanas: KpiSemana[] }
const KPI_EMPTY: KpiStore = { v: 1, semanas: [] };

function loadKpiStore(): KpiStore {
  if (!isWebEnv) return KPI_EMPTY;
  try {
    const raw = window.localStorage.getItem(KPI_LOG_KEY);
    if (!raw) return KPI_EMPTY;
    const p = JSON.parse(raw);
    const semanas: KpiSemana[] = Array.isArray(p?.semanas) ? p.semanas.filter((x: any) => x && typeof x.key === 'string') : [];
    semanas.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
    return { v: 1, semanas };
  } catch { return KPI_EMPTY; }
}
function saveKpiStore(st: KpiStore) {
  if (!isWebEnv) return;
  try { window.localStorage.setItem(KPI_LOG_KEY, JSON.stringify(st)); } catch {}
}
const isoDate = (d: Date) => { const z = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; };
/** Lunes de la semana (local) de una fecha. */
function lunesDe(d: Date): Date {
  const m = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  m.setDate(m.getDate() - ((m.getDay() + 6) % 7));
  return m;
}
/** Clave de semana ISO 8601 ('2026-W37'): el jueves de la semana decide el año. */
function isoWeekKey(d: Date): string {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = t.getUTCFullYear();
  const yStart = Date.UTC(y, 0, 1);
  const w = Math.ceil((((t.getTime() - yStart) / 86400000) + 1) / 7);
  return `${y}-W${String(w).padStart(2, '0')}`;
}
const parseNum = (s: string): number | undefined => {
  const t = (s || '').replace(/\s/g, '').replace(',', '.');
  if (!t) return undefined;
  const n = Number(t);
  return Number.isFinite(n) ? n : undefined;
};
const fmtVal = (def: { unidad: string }, v: number | undefined) => (v === undefined ? '—' : def.unidad === 'S/' ? `S/ ${v.toLocaleString('es-PE')}` : def.unidad === '%' ? `${v} %` : String(v));

export function LivianoKpiLog() {
  const [store, setStore] = useState<KpiStore>(loadKpiStore);
  const [offset, setOffset] = useState(0); // 0 = semana actual · −1 = anterior …
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [nota, setNota] = useState('');
  const [msg, setMsg] = useState('');

  const semanaDate = useMemo(() => { const d = new Date(); d.setDate(d.getDate() + offset * 7); return d; }, [offset]);
  const key = isoWeekKey(semanaDate);
  const lunes = isoDate(lunesDe(semanaDate));
  const existente = store.semanas.find(x => x.key === key);

  useEffect(() => {
    const d: Record<string, string> = {};
    for (const def of LIVIANO_KPI_SEMANAL) { const v = existente?.valores[def.key]; d[def.key] = v === undefined ? '' : String(v); }
    setDraft(d); setNota(existente?.nota || ''); setMsg('');
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const persist = (next: KpiStore) => { setStore(next); saveKpiStore(next); };
  const guardar = () => {
    const valores: Partial<Record<KpiSemanalKey, number>> = {};
    for (const def of LIVIANO_KPI_SEMANAL) { const n = parseNum(draft[def.key]); if (n !== undefined) valores[def.key] = n; }
    if (!Object.keys(valores).length) { setMsg('Escribe al menos un número.'); return; }
    const fila: KpiSemana = { key, lunes, valores, nota: nota.trim() || undefined, guardado: isoDate(new Date()) };
    const semanas = store.semanas.filter(x => x.key !== key).concat(fila).sort((a, b) => (a.key < b.key ? -1 : 1));
    persist({ v: 1, semanas });
    setMsg(`Semana ${key} guardada (${Object.keys(valores).length}/${LIVIANO_KPI_SEMANAL.length} KPIs).`);
  };
  const borrar = () => { persist({ v: 1, semanas: store.semanas.filter(x => x.key !== key) }); setMsg(`Semana ${key} borrada.`); };
  const exportar = () => {
    const payload = {
      exportado: isoDate(new Date()), origen: KPI_LOG_KEY, destino: 'DATA/BUSINESS/_kpi/',
      metas: LIVIANO_KPI_SEMANAL.map(d => ({ key: d.key, label: d.label, unidad: d.unidad, meta: d.meta, direccion: d.direccion })),
      regla: LIVIANO_KPI_REGLA.texto, semanas: store.semanas,
    };
    const json = JSON.stringify(payload, null, 2);
    if (isWebEnv && typeof document !== 'undefined') {
      try {
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `liviano_kpi_${isoWeekKey(new Date())}.json`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        setMsg(`JSON descargado (liviano_kpi_${isoWeekKey(new Date())}.json) → guárdalo en DATA/BUSINESS/_kpi/.`);
        return;
      } catch {}
      try { (navigator as any)?.clipboard?.writeText(json); setMsg('JSON copiado al portapapeles → pégalo en DATA/BUSINESS/_kpi/.'); return; } catch {}
    }
    setMsg('Export solo disponible en web.');
  };

  const alertas = kpiSemanalAlertas(store.semanas);
  const historial = store.semanas.slice(-8).reverse();
  const web = Platform.OS === 'web';

  return (
    <Block title="KPI log semanal · entrada manual (semana ISO)">
      <GlassPanel accent={AMBER} style={{ padding: Spacing.lg }}>
        <Text style={s.h3}>Números reales de la semana</Text>
        <Text style={s.smallNote}>
          Los 18 KPIs de arriba son constantes hasta que el CRM exponga un endpoint read-only. Aquí van los números REALES
          por semana ISO; el semáforo se calcula contra la meta. {LIVIANO_KPI_REGLA.texto}
        </Text>

        {/* navegación de semana */}
        <View style={s.kpiWeekRow}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setOffset(o => o - 1)} style={s.kpiNavBtn}><Text style={s.kpiNavTxt}>◀ anterior</Text></TouchableOpacity>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={[s.kpiWeekKey, monoText]}>{key}</Text>
            <Text style={s.kpiWeekSub}>lunes {lunes}{offset === 0 ? ' · semana actual' : ''}{existente ? ` · guardada ${existente.guardado}` : ' · sin datos'}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} disabled={offset >= 0} onPress={() => setOffset(o => Math.min(0, o + 1))} style={[s.kpiNavBtn, offset >= 0 && { opacity: 0.35 }]}><Text style={s.kpiNavTxt}>siguiente ▶</Text></TouchableOpacity>
        </View>

        {/* inputs */}
        <View style={gridStyle(150)}>
          {LIVIANO_KPI_SEMANAL.map(def => {
            const n = parseNum(draft[def.key] || '');
            const sem = kpiSemanalSemaforo(def, n);
            return (
              <View key={def.key} style={[gridItemStyle(150), s.kpiCell, { borderColor: semaforoColor(sem) + '55' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={s.kpiLabel} numberOfLines={1}>{def.label.toUpperCase()}</Text>
                  <SemaforoDot s={sem} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={s.kpiUnidad}>{def.unidad}</Text>
                  <TextInput
                    value={draft[def.key] || ''}
                    onChangeText={t => setDraft(d => ({ ...d, [def.key]: t }))}
                    keyboardType="numeric" placeholder="—" placeholderTextColor={Colors.muted}
                    style={[s.kpiInput, { color: semaforoColor(sem) }, web ? ({ outlineStyle: 'none' } as any) : null]}
                  />
                </View>
                <Text style={s.kpiMeta} numberOfLines={1}>meta {def.direccion === 'menor' ? '≤' : '≥'} {fmtVal(def, def.meta)}</Text>
                <Text style={s.kpiHint} numberOfLines={2}>{def.hint}</Text>
              </View>
            );
          })}
        </View>
        <TextInput
          value={nota} onChangeText={setNota} placeholder="Nota de la semana (qué pasó, qué ajusto) — opcional" placeholderTextColor={Colors.muted}
          style={[s.kpiNota, web ? ({ outlineStyle: 'none' } as any) : null]}
        />
        <View style={s.kpiBtnRow}>
          <TouchableOpacity activeOpacity={0.85} onPress={guardar} style={s.ctaBtn}><Text style={s.ctaBtnText}>Guardar semana {key}</Text></TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} onPress={exportar} style={s.kpiGhostBtn}><Text style={s.kpiGhostTxt}>⤓ Exportar JSON</Text></TouchableOpacity>
          {existente ? <TouchableOpacity activeOpacity={0.85} onPress={borrar} style={[s.kpiGhostBtn, { borderColor: Colors.coral + '66' }]}><Text style={[s.kpiGhostTxt, { color: Colors.coral }]}>borrar semana</Text></TouchableOpacity> : null}
        </View>
        {msg ? <Text style={[s.smallNote, { marginTop: Spacing.sm, color: AMBER }]}>{msg}</Text> : null}

        {/* alerta de la regla */}
        {alertas.length ? (
          <View style={s.kpiAlert}>
            <Text style={s.kpiAlertTitle}>⚠ Regla &lt; {LIVIANO_KPI_REGLA.umbralPct} % · {LIVIANO_KPI_REGLA.semanas} semanas seguidas</Text>
            <Text style={s.kpiAlertTxt}>
              {alertas.map(k => LIVIANO_KPI_SEMANAL.find(d => d.key === k)?.label || k).join(' · ')} → ajustar oferta, canal o proceso esta semana; no esperar.
            </Text>
          </View>
        ) : store.semanas.length >= LIVIANO_KPI_REGLA.semanas ? (
          <Text style={[s.smallNote, { marginTop: Spacing.sm, color: Colors.green }]}>Sin KPI en rojo dos semanas seguidas.</Text>
        ) : null}

        {/* historial */}
        {historial.length ? (
          <View style={{ marginTop: Spacing.lg }}>
            <Text style={s.kpiHistTitle}>ÚLTIMAS {historial.length} SEMANAS</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <View style={s.tHeadRow}>
                  <Text style={[s.tHead, s.kpiHistKey]}>semana</Text>
                  {LIVIANO_KPI_SEMANAL.map(d => <Text key={d.key} style={[s.tHead, s.kpiHistCol]}>{d.label}</Text>)}
                </View>
                {historial.map(w => (
                  <View key={w.key} style={s.tRow}>
                    <View style={s.kpiHistKey}>
                      <Text style={[s.tCell, monoText, { color: Colors.onSurface, fontWeight: '700' }]}>{w.key}</Text>
                      <Text style={s.kpiHistSub}>{w.lunes}</Text>
                    </View>
                    {LIVIANO_KPI_SEMANAL.map(d => {
                      const v = w.valores[d.key];
                      const sem = kpiSemanalSemaforo(d, v);
                      return (
                        <View key={d.key} style={[s.kpiHistCol, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }]}>
                          <SemaforoDot s={sem} size={7} />
                          <Text style={[s.tCell, monoText, { color: semaforoColor(sem) }]}>{fmtVal(d, v)}</Text>
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        ) : null}
        <Text style={[s.smallNote, { marginTop: Spacing.md }]}>
          Persistido en este dispositivo ('{KPI_LOG_KEY}'). Exporta el JSON al cierre de cada mes a DATA/BUSINESS/_kpi/ (carpeta a crear al guardar el primer fichero).
          Metas provisionales: ver origen en cada KPI de LIVIANO_KPI_SEMANAL.
        </Text>
      </GlassPanel>
    </Block>
  );
}

export function CockpitPanel() {
  return (
    <View>
      <GlassPanel accent={AMBER} style={{ marginBottom: Spacing['2xl'], padding: Spacing.lg }}>
        <Text style={s.h2}>Tablero del dueño</Text>
        <Text style={s.body}>
          18 métricas de un vistazo con su semáforo. Revisa cada semana: actúa sobre lo
          <Text style={{ color: Colors.coral, fontWeight: '700' }}> rojo</Text> antes de mirar lo
          <Text style={{ color: Colors.green, fontWeight: '700' }}> verde</Text>.
        </Text>
        <View style={s.legendRow}>
          {([['verde', 'meta'], ['ambar', 'vigilar'], ['rojo', 'actuar'], ['neutro', 'sin dato']] as const).map(([sem, txt]) => (
            <View key={sem} style={s.legendItem}>
              <SemaforoDot s={sem as any} />
              <Text style={s.legendText}>{txt}</Text>
            </View>
          ))}
        </View>
      </GlassPanel>

      <LivianoKpiLog />

      {KPI_GRUPOS.map(g => {
        const items = LIVIANO_KPIS.filter(k => k.grupo === g.id);
        if (!items.length) return null;
        return (
          <Block key={g.id} title={g.label}>
            <View style={gridStyle(150)}>
              {items.map(k => (
                <View key={k.key} style={gridItemStyle(150)}>
                  <MetricCard label={k.label} value={k.valor} meta={k.meta} semaforo={k.semaforo} hint={k.hint} />
                </View>
              ))}
            </View>
          </Block>
        );
      })}
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// 2 · OFERTA (Grand Slam)
// ════════════════════════════════════════════════════════════════
export function OfertaPanel() {
  const o = LIVIANO_OFERTA;
  const totalBonos = o.bonos.anunciados.length + o.bonos.reserva.length + o.bonos.sorpresa.length;

  const renderBonos = (titulo: string, arr: { nombre: string; mata: string; valor: string }[], accent: string) => (
    <View style={{ flex: 1, minWidth: 240 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm }}>
        <Text style={[s.h3, { marginBottom: 0 }]}>{titulo}</Text>
        <Chip label={`${arr.length}`} color={accent} small />
      </View>
      {arr.map((b, i) => (
        <View key={i} style={s.bonoRow}>
          <View style={{ flex: 1 }}>
            <Text style={s.bonoName}>{b.nombre}</Text>
            <Text style={s.bonoMata}>↳ mata: {b.mata}</Text>
          </View>
          <Text style={[s.bonoValor, { color: accent }]}>{b.valor}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View>
      {/* Tesis + ancla */}
      <GlassPanel accent={AMBER} style={{ marginBottom: Spacing['2xl'] }}>
        <Text style={s.h2}>La tesis</Text>
        <Text style={[s.body, { marginBottom: Spacing.lg }]}>{o.tesis}</Text>
        <View style={s.anclaRow}>
          <View style={[s.anclaCard, { borderColor: Colors.coral + '40' }]}>
            <Text style={s.anclaLabel}>ANCLA</Text>
            <Text style={s.anclaName}>{o.ancla.nombre}</Text>
            <Text style={[s.anclaCost, { color: Colors.coral }]}>{o.ancla.costo}</Text>
          </View>
          <View style={[s.anclaCard, { borderColor: AMBER + '55' }]}>
            <Text style={s.anclaLabel}>LIVIANO</Text>
            <Text style={s.anclaName}>3 meses de programa</Text>
            <Text style={[s.anclaCost, { color: AMBER }]}>{o.ancla.vs.replace('LIVIANO: ', '')}</Text>
          </View>
        </View>
      </GlassPanel>

      {/* Value stack hero */}
      <Block title="Value Stack">
        <GlassPanel>
          <View style={s.valueHeroRow}>
            <View style={s.valueHero}>
              <Text style={s.valueHeroLabel}>VALOR PERCIBIDO</Text>
              <Text style={[s.valueHeroNum, { color: Colors.green }]}>{o.valueStack.valorTotalPercibido}</Text>
            </View>
            <Text style={s.valueVs}>vs</Text>
            <View style={s.valueHero}>
              <Text style={s.valueHeroLabel}>PRECIO (3M)</Text>
              <Text style={[s.valueHeroNum, { color: AMBER }]}>{o.valueStack.precio3m}</Text>
            </View>
          </View>
          <View style={s.valueBreak}>
            <TipLine label="Medicamento (3m)" value={o.valueStack.medicamento3m} accent={Colors.blue} />
            <TipLine label="Bonos recurrentes (3m)" value={o.valueStack.bonosRecurrentes3m} accent={Colors.teal} />
            <TipLine label="Bonos de inicio" value={o.valueStack.bonosInicio} accent={Colors.teal} />
            <TipLine label="Subtotal en bonos" value={o.valueStack.subtotalBonos} accent={Colors.green} />
          </View>
          <Text style={s.cierre}>{o.valueStack.cierre}</Text>
        </GlassPanel>
      </Block>

      {/* Escalera de precios */}
      <Block title="Escalera de precios">
        <GlassPanel>
          {o.escaleraPrecios.map((e, i) => (
            <View key={i} style={[s.ladderRow, i === 0 && { borderTopWidth: 0 }]}>
              <View style={{ flex: 1.3 }}>
                <Text style={s.ladderFase}>{e.fase}</Text>
                <Text style={s.ladderMeses}>meses {e.meses}</Text>
              </View>
              <Text style={[s.ladderPrecio, { color: AMBER }]}>{e.precioMes}</Text>
              <Text style={s.ladderAcomp}>{e.acompanamiento}</Text>
              <Chip label={e.margen} color={Colors.green} small />
            </View>
          ))}
        </GlassPanel>
      </Block>

      {/* Tiers */}
      <Block title="Tiers de precio">
        <View style={gridStyle(220)}>
          {o.tiers.map((t, i) => (
            <View key={i} style={[gridItemStyle(220), s.tierCard]}>
              <Text style={s.tierName}>{t.nombre}</Text>
              <Text style={[s.tierPrecio, { color: AMBER }]}>{t.precio}</Text>
              <Text style={s.tierNota}>{t.nota}</Text>
            </View>
          ))}
        </View>
      </Block>

      {/* Bonos */}
      <Block title={`Value stack de bonos · ${totalBonos}+ bonos`}>
        <GlassPanel>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing['2xl'] }}>
            {renderBonos('Anunciados', o.bonos.anunciados, Colors.amber)}
            {renderBonos('De reserva', o.bonos.reserva, Colors.blue)}
            {renderBonos('Sorpresa', o.bonos.sorpresa, Colors.purple)}
          </View>
        </GlassPanel>
      </Block>

      {/* Garantías */}
      <Block title="Las 4 garantías">
        <View style={gridStyle(240)}>
          {o.garantias.map((g, i) => (
            <View key={i} style={[gridItemStyle(240), s.guaranteeCard]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <Text style={s.guaranteeName}>🛡️ {g.nombre}</Text>
              </View>
              <Chip label={g.tipo} color={Colors.teal} small />
              <Text style={[s.body, { marginTop: Spacing.sm }]}>{g.promesa}</Text>
            </View>
          ))}
        </View>
      </Block>

      {/* Objeciones */}
      <Block title="Mapa de objeciones">
        <GlassPanel>
          {o.objeciones.map((ob, i) => (
            <View key={i} style={[s.objRow, i === 0 && { borderTopWidth: 0 }]}>
              <View style={s.objDice}>
                <Text style={s.objDiceText}>“{ob.dice}”</Text>
              </View>
              <Text style={s.objArrow}>→</Text>
              <Text style={s.objDesact}>{ob.desactiva}</Text>
            </View>
          ))}
        </GlassPanel>
      </Block>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// 3 · MARKETING & ESTUDIO DE MERCADO
// ════════════════════════════════════════════════════════════════
export function MarketingPanel() {
  return (
    <View>
      {/* Reglas kill / scale */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing['2xl'] }}>
        <View style={[s.ruleCard, { flex: 1, minWidth: 240, borderColor: Colors.coral + '40' }]}>
          <Text style={[s.ruleTag, { color: Colors.coral }]}>☠ MATAR</Text>
          <Text style={s.body}>{MARKETING_REGLAS.kill}</Text>
        </View>
        <View style={[s.ruleCard, { flex: 1, minWidth: 240, borderColor: Colors.green + '40' }]}>
          <Text style={[s.ruleTag, { color: Colors.green }]}>🚀 ESCALAR</Text>
          <Text style={s.body}>{MARKETING_REGLAS.scale}</Text>
        </View>
      </View>

      {/* Cascada de evaluación */}
      <Block title="Cascada del creativo (un mal número arriba mata lo de abajo)">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm }}>
          {MARKETING_REGLAS.cascada.map((c, i) => (
            <View key={i} style={s.cascadaChip}>
              <Text style={s.cascadaNum}>{i + 1}</Text>
              <View>
                <Text style={s.cascadaPaso}>{c.paso}</Text>
                <Text style={s.cascadaMeta}>{c.meta}</Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={[s.smallNote, { marginTop: Spacing.sm }]}>{MARKETING_REGLAS.minimo}</Text>
      </Block>

      {/* Tabla de creativos */}
      <Block title="Qué afiche funciona">
        <GlassPanel>
          {/* 8 columnas (~384px): en móvil ~380px desbordaba → scroll horizontal */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View style={s.tHeadRow}>
                <Text style={[s.tHead, { width: 130 }]}>Creativo</Text>
                <Text style={[s.tHead, s.tCol]}>Canal</Text>
                <Text style={[s.tHead, s.tCol]}>Impr.</Text>
                <Text style={[s.tHead, s.tCol]}>CTR</Text>
                <Text style={[s.tHead, s.tCol]}>Hook</Text>
                <Text style={[s.tHead, s.tCol]}>CPL</Text>
                <Text style={[s.tHead, s.tCol]}>CAC</Text>
                <Text style={[s.tHead, s.tColWide]}>Estado</Text>
              </View>
              {ESTUDIO_MERCADO.map((c, i) => (
                <View key={i} style={s.tRow}>
                  <Text style={[s.tCell, { width: 130, color: Colors.onSurface }]} numberOfLines={1}>{c.nombre}</Text>
                  <Text style={[s.tCell, s.tCol]}>{c.canal}</Text>
                  <Text style={[s.tCell, s.tCol]}>{c.impresiones}</Text>
                  <Text style={[s.tCell, s.tCol]}>{c.ctr}</Text>
                  <Text style={[s.tCell, s.tCol]}>{c.hookRate}</Text>
                  <Text style={[s.tCell, s.tCol]}>{c.cpl}</Text>
                  <Text style={[s.tCell, s.tCol]}>{c.cac}</Text>
                  <View style={s.tColWide}>
                    <Chip label={c.estado} color={estadoCreativoColor(c.estado)} small />
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </GlassPanel>
      </Block>

      {/* Benchmarks competidores */}
      <Block title="Benchmarks · telesalud GLP-1 de élite">
        <View style={gridStyle(240)}>
          {COMPETIDORES.map((c, i) => (
            <View key={i} style={[gridItemStyle(240), s.compCard]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={s.compName}>{c.emoji} {c.nombre}</Text>
              </View>
              <Text style={[s.compPrecio, { color: AMBER }]}>{c.precio}</Text>
              <Text style={s.compModelo}>{c.modelo}</Text>
              <Text style={s.compDif}>{c.dif}</Text>
              <Text style={s.compEscala}>{c.escala}</Text>
            </View>
          ))}
        </View>
      </Block>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// 4 · VENTAS & ADQUISICIÓN
// ════════════════════════════════════════════════════════════════
export function VentasPanel() {
  const v = LIVIANO_VENTAS;
  return (
    <View>
      <GlassPanel accent={AMBER} style={{ marginBottom: Spacing['2xl'], padding: Spacing.lg }}>
        <Text style={s.h2}>El motor</Text>
        <Text style={s.body}>{v.motor}</Text>
      </GlassPanel>

      {/* Core Four */}
      <Block title="Los Core Four (las 4 formas de conseguir leads)">
        <View style={gridStyle(240)}>
          {v.coreFour.map(c => {
            const arranque = c.orden === 'arranque';
            const accent = arranque ? Colors.green : Colors.blue;
            return (
              <View key={c.n} style={[gridItemStyle(240), s.coreCard, { borderLeftColor: accent }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={s.coreName}>{c.n}. {c.nombre}</Text>
                  <Chip label={c.regla} color={accent} small />
                </View>
                <Text style={s.coreTipo}>{c.tipo}</Text>
                <Text style={[s.body, { marginTop: 6 }]}>{c.detalle}</Text>
                <Text style={[s.coreOrden, { color: accent }]}>
                  {arranque ? '● Empieza aquí (gratis)' : '○ Después (con oferta validada)'}
                </Text>
              </View>
            );
          })}
        </View>
        <Text style={[s.smallNote, { marginTop: Spacing.sm }]}>{v.rule100}</Text>
      </Block>

      {/* Lead magnets */}
      <Block title="Lead magnets (imanes de leads)">
        <GlassPanel>
          {v.leadMagnets.map((m, i) => (
            <View key={i} style={[s.lmRow, i === 0 && { borderTopWidth: 0 }]}>
              <Text style={s.lmStar}>{m.estrella ? '⭐' : '•'}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.lmName}>{m.nombre}</Text>
                <Text style={s.lmRol}>{m.rol}</Text>
              </View>
            </View>
          ))}
        </GlassPanel>
      </Block>

      {/* Embudo */}
      <Block title="Embudo consulta → programa">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, alignItems: 'stretch' }}>
          {v.embudo.map((e, i) => {
            const last = i === v.embudo.length - 1;
            return (
              <React.Fragment key={i}>
                <View style={[s.funnelCard, last && { borderColor: AMBER + '66', backgroundColor: AMBER + '12' }]}>
                  <Text style={s.funnelStep}>{i + 1}</Text>
                  <Text style={s.funnelEtapa}>{e.etapa}</Text>
                  <Text style={s.funnelDesc}>{e.desc}</Text>
                  <Chip label={e.meta} color={last ? AMBER : Colors.muted} small />
                </View>
                {!last ? <Text style={s.funnelArrow}>›</Text> : null}
              </React.Fragment>
            );
          })}
        </View>
      </Block>

      {/* Money model */}
      <Block title="Money model (secuencia de ofertas)">
        <View style={gridStyle(220)}>
          {v.moneyModel.map((m, i) => (
            <View key={i} style={[gridItemStyle(220), s.mmCard]}>
              <Text style={[s.mmEtapa, { color: AMBER }]}>{m.etapa}</Text>
              <Text style={s.mmOferta}>{m.oferta}</Text>
              <Text style={s.mmObj}>{m.objetivo}</Text>
            </View>
          ))}
        </View>
      </Block>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// 5 · LOGÍSTICA & GLP-1
// ════════════════════════════════════════════════════════════════
export function LogisticaPanel() {
  const l = LIVIANO_LOGISTICA;
  return (
    <View>
      {/* Modelos de abastecimiento */}
      <Block title="Modelo de abastecimiento">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md }}>
          {l.modelos.map((m, i) => (
            <View key={i} style={[s.modeloCard, { flex: 1, minWidth: 260 }]}>
              <Text style={s.modeloName}>{m.nombre}</Text>
              <View style={{ flexDirection: 'row', gap: 6, marginVertical: Spacing.sm, flexWrap: 'wrap' }}>
                <Chip label={`Costo: ${m.costo}`} color={Colors.blue} small />
                <Chip label={`Margen: ${m.margen}`} color={Colors.green} small />
                <Chip label={`Riesgo: ${m.riesgo}`} color={m.riesgo.startsWith('Alto') ? Colors.coral : Colors.muted} small />
              </View>
              <Text style={s.body}>{m.nota}</Text>
            </View>
          ))}
        </View>
      </Block>

      {/* Estructura de costos por orden */}
      <Block title="Estructura de costos por orden">
        <GlassPanel>
          {l.estructuraCostos.map((c, i) => (
            <View key={i} style={[s.costRow, i === 0 && { borderTopWidth: 0 }]}>
              <Text style={s.costComp}>{c.componente}</Text>
              <Text style={[s.costPct, { color: AMBER }]}>{c.pct}</Text>
              <Text style={s.costNota}>{c.nota}</Text>
            </View>
          ))}
          <View style={s.costTotalRow}>
            <StatCell label="COGS total" value={l.cogsTotal} accent={Colors.coral} />
            <StatCell label="Margen bruto" value={l.margenBruto} accent={Colors.green} />
          </View>
        </GlassPanel>
      </Block>

      {/* Cadena de frío */}
      <Block title="Cadena de frío & inventario">
        <GlassPanel accent={Colors.blue}>
          {l.cadenaFrio.map((c, i) => (
            <View key={i} style={s.bulletRow}>
              <Text style={s.bulletIcon}>❄️</Text>
              <Text style={[s.body, { flex: 1 }]}>{c}</Text>
            </View>
          ))}
        </GlassPanel>
      </Block>

      {/* Pendientes críticos → tareas con dueño, día del plan y salida verificable */}
      <Block title="Pendientes críticos (riesgos) → tareas con dueño y fecha">
        <GlassPanel>
          {LIVIANO_PENDIENTES.map((p, i) => (
            <View key={i} style={[s.pendRow, i === 0 && { borderTopWidth: 0 }]}>
              <SemaforoDot s={p.nivel} size={10} />
              <View style={{ flex: 1, marginLeft: Spacing.md }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <Text style={s.pendTitle}>{p.titulo}</Text>
                  {p.planDia ? <Chip label={`Academia D${p.planDia}`} color={Colors.blue} small /> : null}
                  {p.dueno ? <Chip label={`dueño: ${p.dueno}`} color={AMBER} small /> : null}
                </View>
                <Text style={s.pendDetail}>{p.detalle}</Text>
                {p.fecha ? <Text style={[s.pendDetail, { color: Colors.onSurfaceVariant }]}>📅 {p.fecha}</Text> : null}
                {p.salida ? <Text style={[s.pendDetail, { color: Colors.teal }]}>✔ cierra con: {p.salida}</Text> : null}
              </View>
            </View>
          ))}
        </GlassPanel>
      </Block>

      <LivianoProtocoloSection />

      {/* Filosofía del margen */}
      <GlassPanel accent={AMBER} style={{ padding: Spacing.lg }}>
        <Text style={s.h3}>💡 El verdadero uso del margen</Text>
        <Text style={s.body}>{l.filosofia}</Text>
      </GlassPanel>
    </View>
  );
}

// ── ACCESO EN PERÚ · REVISIÓN TRIMESTRAL · PROTOCOLO CLÍNICO (capstone de la Academia) ──
// Sección "Protocolo": lo que la Academia PRODUCE (no solo lo que estudia). Todo dato regulatorio o
// de precio nace como "PENDIENTE DE VERIFICACIÓN" y solo cambia con fuente primaria fechada.
const estadoColor = (e: string): string => (e === 'VERIFICADO' ? Colors.green : e === 'SIN REGISTRO HALLADO' ? Colors.coral : BRASS);
const ACC_COLS: { k: 'registro' | 'condicion' | 'precioFarmacia' | 'costoLiviano' | 'fechaVerificacion'; l: string }[] = [
  { k: 'registro', l: 'Registro DIGEMID' }, { k: 'condicion', l: 'Condición de venta' },
  { k: 'precioFarmacia', l: 'Precio farmacia' }, { k: 'costoLiviano', l: 'Costo LIVIANO' }, { k: 'fechaVerificacion', l: 'Verificado' },
];

export function LivianoProtocoloSection() {
  const [abierta, setAbierta] = useState<string | null>(null);
  const reglas = LIVIANO_ACCESO_PERU_REGLAS;
  const rev = LIVIANO_REVISION_TRIMESTRAL;
  const pr = LIVIANO_PROTOCOLO;
  const verificadas = LIVIANO_ACCESO_PERU.filter(f => f.estado === 'VERIFICADO').length;
  const secBorrador = pr.secciones.filter(x => x.estado === 'borrador').length;
  return (
    <View>
      {/* Acceso en Perú */}
      <Block title="Acceso en Perú · Módulo 7 de la Academia (tabla de verificación)">
        <GlassPanel accent={Colors.coral} style={{ padding: Spacing.lg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Text style={[s.h3, { marginBottom: 0, flexShrink: 1 }]}>{reglas.titulo}</Text>
            <Chip label={`${verificadas}/${LIVIANO_ACCESO_PERU.length} verificadas`} color={verificadas ? Colors.green : Colors.coral} small />
          </View>
          <Text style={[s.smallNote, { marginTop: 6 }]}>{reglas.ventana} · dueño: {reglas.dueno}</Text>
          <Text style={[s.smallNote, { marginTop: 4, color: Colors.tertiary }]}>{reglas.regla}</Text>

          {LIVIANO_ACCESO_PERU.map((f, i) => (
            <View key={i} style={[s.accCard, { borderLeftColor: semaforoColor(f.semaforo) }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <SemaforoDot s={f.semaforo} size={9} />
                <Text style={s.accMol}>{f.molecula}</Text>
                <Chip label={f.estado} color={estadoColor(f.estado)} small />
              </View>
              <Text style={s.accPres}>{f.presentacion}</Text>
              {ACC_COLS.map(c => (
                <View key={c.k} style={s.accLine}>
                  <Text style={s.accKey}>{c.l}</Text>
                  <Text style={[s.accVal, f[c.k].startsWith('PENDIENTE') ? { color: BRASS } : null]}>{f[c.k]}</Text>
                </View>
              ))}
              <Text style={s.accFuente}>fuente: {f.fuente}</Text>
              {f.nota ? <Text style={[s.accFuente, { color: Colors.onSurfaceVariant }]}>{f.nota}</Text> : null}
            </View>
          ))}

          <Text style={[s.kpiHistTitle, { marginTop: Spacing.lg }]}>PASOS (un día de la Academia cada uno)</Text>
          {reglas.pasos.map((p, i) => (
            <View key={i} style={s.bulletRow}>
              <Text style={[s.bulletIcon, { color: AMBER, fontWeight: '800' }]}>{i + 1}.</Text>
              <Text style={[s.body, { flex: 1 }]}>{p}</Text>
            </View>
          ))}
        </GlassPanel>
      </Block>

      {/* Revisión trimestral */}
      <Block title="Revisión trimestral de farmacoterapia (regla 3 del programa)">
        <GlassPanel accent={Colors.blue} style={{ padding: Spacing.lg }}>
          <Text style={s.body}>{rev.regla}</Text>
          <View style={{ flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap', marginTop: Spacing.md }}>
            {rev.filas.map(f => (
              <View key={f.n} style={s.revCard}>
                <Text style={[s.revDia, monoText]}>D{f.planDia} · {f.fechaPlan}</Text>
                <Text style={s.revTitulo}>{f.titulo}</Text>
              </View>
            ))}
          </View>
          <Text style={[s.kpiHistTitle, { marginTop: Spacing.md }]}>CHECKLIST · dueño: {rev.dueno}</Text>
          {rev.checklist.map((c, i) => (
            <View key={i} style={s.bulletRow}>
              <Text style={s.bulletIcon}>☐</Text>
              <Text style={[s.body, { flex: 1 }]}>{c}</Text>
            </View>
          ))}
        </GlassPanel>
      </Block>

      {/* Protocolo clínico */}
      <Block title="Protocolo clínico LIVIANO · capstone de la Academia">
        <GlassPanel accent={Colors.green} style={{ padding: Spacing.lg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Text style={[s.h3, { marginBottom: 0, flexShrink: 1 }]}>{pr.version}</Text>
            <Chip label={`${secBorrador}/${pr.secciones.length} secciones en borrador`} color={BRASS} small />
          </View>
          <Text style={[s.smallNote, { marginTop: 6 }]}>Doc: {pr.doc}</Text>
          <Text style={[s.smallNote, { marginTop: 4, color: Colors.teal }]}>Criterio de éxito: {pr.criterioExito}</Text>

          {pr.secciones.map(sec => {
            const open = abierta === sec.id;
            const col = sec.estado === 'borrador' ? BRASS : Colors.coral;
            return (
              <View key={sec.id} style={[s.protoCard, { borderLeftColor: col }]}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setAbierta(open ? null : sec.id)} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={s.protoTitulo}>{sec.titulo}</Text>
                    <Text style={s.protoSub}>{sec.produceEn} · {sec.planDias.map(d => 'D' + d).join(' · ')}</Text>
                  </View>
                  <Chip label={sec.estado} color={col} small />
                  <Text style={{ color: Colors.muted, fontSize: 12 }}>{open ? '▲' : '▼'}</Text>
                </TouchableOpacity>
                {open ? (
                  <View style={{ marginTop: Spacing.sm }}>
                    <Text style={s.kpiHistTitle}>YA AFIRMABLE (con fuente del currículo)</Text>
                    {sec.contenido.map((c, i) => (
                      <View key={i} style={s.bulletRow}><Text style={[s.bulletIcon, { color: Colors.green }]}>•</Text><Text style={[s.body, { flex: 1 }]}>{c}</Text></View>
                    ))}
                    {sec.pendientes.length ? (
                      <>
                        <Text style={[s.kpiHistTitle, { marginTop: Spacing.sm, color: Colors.coral }]}>A VERIFICAR</Text>
                        {sec.pendientes.map((c, i) => (
                          <View key={i} style={s.bulletRow}><Text style={[s.bulletIcon, { color: Colors.coral }]}>⚠</Text><Text style={[s.body, { flex: 1, color: Colors.tertiary }]}>{c}</Text></View>
                        ))}
                      </>
                    ) : null}
                  </View>
                ) : null}
              </View>
            );
          })}
        </GlassPanel>
      </Block>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// 6 · WEB & LINKS
// ════════════════════════════════════════════════════════════════
function LinkChip({ route, base }: { route: string; base: string }) {
  const isTemplate = route.includes('[');
  const { hovered, hoverProps } = useHover();
  if (isTemplate) {
    return (
      <View style={[s.linkChip, { opacity: 0.6 }]}>
        <Text style={s.linkChipText}>{route}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => openUrl(base + route)}
      style={[
        s.linkChip,
        hovered && Platform.OS === 'web' ? { borderColor: AMBER + '88', backgroundColor: AMBER + '14' } as any : null,
        Platform.OS === 'web' ? ({ cursor: 'pointer', transition: 'all 0.15s ease' } as any) : null,
      ]}
      {...hoverProps}
    >
      <Text style={[s.linkChipText, hovered && Platform.OS === 'web' ? { color: AMBER } as any : null]}>{route}</Text>
    </TouchableOpacity>
  );
}

export function WebPanel() {
  return (
    <View>
      <GlassPanel accent={AMBER} style={{ marginBottom: Spacing['2xl'], padding: Spacing.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.sm }}>
          <View style={{ flex: 1, minWidth: 200 }}>
            <Text style={s.h3}>Mapa de la web Pulso / Liviano</Text>
            <Text style={s.smallNote}>{PULSO_LINKS.base}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => openUrl(PULSO_LINKS.base)} style={s.ctaBtn}>
            <Text style={s.ctaBtnText}>Abrir CRM ↗</Text>
          </TouchableOpacity>
        </View>
      </GlassPanel>

      {PULSO_LINK_GRUPOS.map(g => (
        <Block key={g.id} title={`${g.icon} ${g.titulo}`}>
          <GlassPanel>
            <Text style={[s.smallNote, { marginBottom: Spacing.md }]}>{g.desc}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm }}>
              {g.rutas.map((r, i) => <LinkChip key={i} route={r} base={PULSO_LINKS.base} />)}
            </View>
          </GlassPanel>
        </Block>
      ))}

      <Block title="📲 PIRQA">
        <TouchableOpacity activeOpacity={0.8} onPress={() => openUrl(PULSO_LINKS.whatsappPirqa)} style={[s.linkChip, { borderColor: Colors.green + '55' }]}>
          <Text style={[s.linkChipText, { color: Colors.green }]}>WhatsApp reservas · {PULSO_LINKS.whatsappPirqa} ↗</Text>
        </TouchableOpacity>
      </Block>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// 7 · DIRECTRICES & TIPS
// ════════════════════════════════════════════════════════════════
export function DirectricesPanel() {
  return (
    <View>
      <GlassPanel accent={AMBER} style={{ marginBottom: Spacing['2xl'], padding: Spacing.lg }}>
        <Text style={s.h2}>Reglas accionables</Text>
        <Text style={s.body}>
          Metodología de Alex Hormozi ($100M Offers / Leads / Money Models) + mejores prácticas de los
          líderes globales de telesalud GLP-1, destiladas para LIVIANO.
        </Text>
      </GlassPanel>

      <View style={gridStyle(300)}>
        {LIVIANO_DIRECTRICES.map((grp, gi) => {
          const accent = accentColor(grp.accent);
          return (
            <View key={gi} style={gridItemStyle(300)}>
              <GlassPanel accent={accent} style={{ padding: Spacing.lg }}>
                <Text style={[s.h3, { color: Colors.onSurface }]}>{grp.icon} {grp.grupo}</Text>
                {grp.tips.map((t, ti) => (
                  <View key={ti} style={s.dirTip}>
                    <View style={[s.bullet, { backgroundColor: accent, marginTop: 6 }]} />
                    <View style={{ flex: 1 }}>
                      <Text style={s.dirTipT}>{t.t}</Text>
                      <Text style={s.dirTipD}>{t.d}</Text>
                    </View>
                  </View>
                ))}
              </GlassPanel>
            </View>
          );
        })}
      </View>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// PIRQA — vista resumida
// ════════════════════════════════════════════════════════════════
export function PirqaView() {
  const p = PIRQA_DATA;
  const brand = BRANDS.pirqa;
  const [tab, setTab] = useState<'info' | 'horario'>('info');
  return (
    <View>
      <GlassPanel accent={brand.bright} style={{ marginBottom: Spacing['2xl'] }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm }}>
          <Text style={{ fontSize: 28, marginRight: Spacing.sm }}>{brand.emoji}</Text>
          <View>
            <Text style={s.h2}>PIRQA · Pachamanca</Text>
            <Chip label={p.estado} color={Colors.green} small />
          </View>
        </View>
        <Text style={s.body}>{p.resumen}</Text>
      </GlassPanel>

      {/* sub-tabs: info / horario de contenido */}
      <View style={{ flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg }}>
        {([['info', '📊 Operación'], ['horario', '🗓️ Horario']] as const).map(([k, lbl]) => (
          <TouchableOpacity key={k} activeOpacity={0.8} onPress={() => setTab(k)}
            style={{ paddingVertical: 7, paddingHorizontal: 14, borderRadius: BorderRadius.full, borderWidth: 1,
              borderColor: tab === k ? brand.bright + '88' : 'rgba(255,255,255,0.1)',
              backgroundColor: tab === k ? brand.bright + '1A' : 'transparent' }}>
            <Text style={{ fontSize: FontSize.labelMd, fontWeight: '700', color: tab === k ? brand.bright : Colors.muted }}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'horario' && <BrandHorario brand="pirqa" />}

      {tab === 'info' && (<>
      <Block title="KPIs">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm }}>
          {p.kpis.map((k, i) => <StatCell key={i} label={k.label} value={k.valor} accent={brand.bright} />)}
        </View>
      </Block>

      <Block title="Reservas">
        <GlassPanel>
          <TipLine label="Turnos" value={p.reservas.turnos} accent={brand.bright} />
          <TipLine label="Días / horario" value={p.reservas.dias} accent={brand.bright} />
          <TipLine label="Capacidad" value={p.reservas.capacidad} accent={brand.bright} />
        </GlassPanel>
      </Block>

      <Block title="Web & Links">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm }}>
          {p.links.map((lk, i) => (
            <TouchableOpacity key={i} activeOpacity={0.8} onPress={() => openUrl(lk.url)} style={[s.linkChip, { borderColor: brand.bright + '55' }]}>
              <Text style={[s.linkChipText, { color: brand.bright }]}>{lk.label} ↗</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Block>
      </>)}
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// PULSO — vista matriz
// ════════════════════════════════════════════════════════════════
export function PulsoView() {
  const m = PULSO_MATRIZ;
  const brand = BRANDS.pulso;
  return (
    <View>
      <GlassPanel accent={brand.bright} style={{ marginBottom: Spacing['2xl'] }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm }}>
          <Text style={{ fontSize: 28, marginRight: Spacing.sm }}>{brand.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.h2}>{m.nombre}</Text>
            <Text style={s.smallNote}>{m.founder} · {m.base}</Text>
          </View>
        </View>
        <Text style={s.body}>{m.tesis}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => openUrl(m.crmUrl)} style={[s.ctaBtn, { marginTop: Spacing.lg, alignSelf: 'flex-start' }]}>
          <Text style={s.ctaBtnText}>Abrir CRM Pulso ↗</Text>
        </TouchableOpacity>
      </GlassPanel>

      <Block title="KPIs consolidados">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm }}>
          {m.kpisConsolidados.map((k, i) => <StatCell key={i} label={k.label} value={k.valor} accent={brand.bright} />)}
        </View>
      </Block>

      <Block title="Marcas del grupo">
        <View style={gridStyle(220)}>
          {m.marcas.map((mk, i) => (
            <View key={i} style={[gridItemStyle(220), s.tierCard]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={s.tierName}>{mk.nombre}</Text>
                <SemaforoDot s={mk.estado === 'activa' ? 'verde' : mk.estado === 'en_desarrollo' ? 'ambar' : 'neutro'} />
              </View>
              <Text style={[s.body, { marginTop: 4 }]}>{mk.desc}</Text>
            </View>
          ))}
        </View>
      </Block>

      <Block title="Pilares">
        <GlassPanel>
          {m.pilares.map((p, i) => (
            <View key={i} style={[s.pendRow, i === 0 && { borderTopWidth: 0 }]}>
              <View style={[s.bullet, { backgroundColor: brand.bright, marginTop: 6 }]} />
              <View style={{ flex: 1, marginLeft: Spacing.md }}>
                <Text style={s.pendTitle}>{p.titulo}</Text>
                <Text style={s.pendDetail}>{p.desc}</Text>
              </View>
            </View>
          ))}
        </GlassPanel>
      </Block>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// FRANQUICIAS — placeholders
// ════════════════════════════════════════════════════════════════
export function FranquiciasView() {
  const franquicias = EMPRESAS.filter(e => e.estado === 'planeada');
  return (
    <View>
      <GlassPanel accent={Colors.muted} style={{ marginBottom: Spacing['2xl'], padding: Spacing.lg }}>
        <Text style={s.h2}>Franquicias / líneas futuras</Text>
        <Text style={s.body}>Nombres reservados, listos para estructurar cuando se definan. Cada línea reutilizará la plataforma, el CRM y el motor de IA de Pulso.</Text>
      </GlassPanel>

      <View style={gridStyle(220)}>
        {franquicias.map((f, i) => (
          <View key={f.id} style={[gridItemStyle(220), s.franqCard]}>
            <Text style={{ fontSize: 26, marginBottom: Spacing.sm }}>{f.icon}</Text>
            <Text style={s.franqName}>{f.nombre}</Text>
            <Text style={s.franqDesc}>{f.descCorta}</Text>
            <View style={{ marginTop: Spacing.md }}>
              <Chip label="Próximamente" color={Colors.muted} small />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// ────────────────────────────────────────────────────────────────
// Estilos
// ────────────────────────────────────────────────────────────────
const cardBase = {
  backgroundColor: DesktopColors.glass,
  borderRadius: BorderRadius.lg,
  borderWidth: 1,
  borderColor: Hairline.soft,
  padding: Spacing.lg,
  ...Elevation.sm,
};

const s = StyleSheet.create({
  // panel chrome (terminal window)
  chromeWrap: {
    backgroundColor: '#0B1424',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Hairline.medium,
    borderLeftWidth: 3,
    overflow: 'hidden',
    marginBottom: Spacing['2xl'],
    ...Elevation.md,
  },
  chromeHairline: { position: 'absolute', top: 0, left: 0, right: 0, height: 1, backgroundColor: Colors.gold, opacity: 0.35 },
  chromeBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 9, paddingHorizontal: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Hairline.soft,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  chromeFkey: { borderWidth: 1, borderRadius: BorderRadius.sm, paddingVertical: 1, paddingHorizontal: 6 },
  chromeFkeyTxt: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5, ...monoText },
  chromeTitle: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: 1 },
  chromeDots: { flexDirection: 'row', gap: 5, alignItems: 'center' },
  chromeDot: { width: 7, height: 7, borderRadius: 4, opacity: 0.7 },
  chromeBody: { padding: Spacing.lg },

  h2: { fontSize: FontSize.titleMd, lineHeight: LineHeight.titleMd, fontWeight: '800', color: Colors.onSurface, marginBottom: 6, letterSpacing: -0.3 },
  h3: { fontSize: FontSize.bodyLg, lineHeight: LineHeight.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: Spacing.sm, letterSpacing: -0.2 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.bodyMd },
  smallNote: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: LineHeight.labelMd + 1 },

  // legend
  legendRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.lg, marginTop: Spacing.md },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendText: { fontSize: FontSize.labelMd, color: Colors.muted },

  // tip line (label + value)
  tipLine: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginRight: Spacing.sm },
  tipLineLabel: { flex: 1, fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant },
  tipLineValue: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },

  // ancla
  anclaRow: { flexDirection: 'row', gap: Spacing.md, flexWrap: 'wrap' },
  anclaCard: { flex: 1, minWidth: 150, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: BorderRadius.lg, borderWidth: 1, padding: Spacing.lg, alignItems: 'center', ...Elevation.sm },
  anclaLabel: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.2 },
  anclaName: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginVertical: 5, textAlign: 'center', lineHeight: LineHeight.labelMd },
  anclaCost: { fontSize: FontSize.titleMd, lineHeight: LineHeight.titleMd, fontWeight: '800', textAlign: 'center', letterSpacing: -0.4 },

  // value stack
  valueHeroRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.lg, marginBottom: Spacing.lg, flexWrap: 'wrap' },
  valueHero: { alignItems: 'center' },
  valueHeroLabel: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.2, marginBottom: 5 },
  valueHeroNum: { fontSize: FontSize.headlineSm, lineHeight: LineHeight.headlineSm, fontWeight: '800', letterSpacing: -0.6 },
  valueVs: { fontSize: FontSize.bodyMd, color: Colors.muted, fontWeight: '700' },
  valueBreak: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', paddingTop: Spacing.md, marginTop: Spacing.xs },
  cierre: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, fontStyle: 'italic', marginTop: Spacing.md, lineHeight: 18 },

  // ladder
  ladderRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  ladderFase: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  ladderMeses: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1 },
  ladderPrecio: { flex: 1, fontSize: FontSize.bodyLg, fontWeight: '800', textAlign: 'center' },
  ladderAcomp: { flex: 1.2, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, textAlign: 'center' },

  // tiers
  tierCard: { ...cardBase },
  tierName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  tierPrecio: { fontSize: FontSize.titleMd, fontWeight: '800', marginVertical: 4 },
  tierNota: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: 16 },

  // bonos
  bonoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 7, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  bonoName: { fontSize: FontSize.labelLg, color: Colors.onSurface, fontWeight: '500' },
  bonoMata: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 1 },
  bonoValor: { fontSize: FontSize.labelLg, fontWeight: '800', marginLeft: Spacing.sm },

  // guarantees
  guaranteeCard: { ...cardBase },
  guaranteeName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },

  // objeciones
  objRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', gap: Spacing.sm },
  objDice: { backgroundColor: Colors.coral + '18', borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.coral + '22', paddingVertical: 6, paddingHorizontal: 11, minWidth: 130 },
  objDiceText: { fontSize: FontSize.labelLg, color: Colors.tertiary, fontWeight: '600', lineHeight: LineHeight.labelLg },
  objArrow: { color: Colors.muted, fontSize: 16, fontWeight: '700' },
  objDesact: { flex: 1, fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.bodyMd - 2 },

  // marketing rules
  ruleCard: { ...cardBase, borderWidth: 1 },
  ruleTag: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.5, marginBottom: 6 },

  // cascada
  cascadaChip: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, paddingVertical: 8, paddingHorizontal: 12, ...Elevation.sm },
  cascadaNum: { fontSize: FontSize.titleMd, fontWeight: '800', color: AMBER, opacity: 0.55 },
  cascadaPaso: { fontSize: FontSize.labelLg, fontWeight: '700', color: Colors.onSurface },
  cascadaMeta: { fontSize: FontSize.labelSm, color: Colors.muted },

  // table
  tHeadRow: { flexDirection: 'row', alignItems: 'center', paddingBottom: Spacing.sm, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  tHead: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.5, textTransform: 'uppercase' },
  tRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  tCell: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant },
  tCol: { width: 52, textAlign: 'center' },
  tColWide: { width: 72, alignItems: 'center' },

  // competidores
  compCard: { ...cardBase },
  compName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  compPrecio: { fontSize: FontSize.bodyLg, fontWeight: '800', marginTop: 4 },
  compModelo: { fontSize: FontSize.labelMd, color: Colors.muted, marginTop: 2 },
  compDif: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 6, lineHeight: 17 },
  compEscala: { fontSize: FontSize.labelSm, color: Colors.teal, marginTop: 6, fontWeight: '600' },

  // core four
  coreCard: { ...cardBase, borderLeftWidth: 3 },
  coreName: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface },
  coreTipo: { fontSize: FontSize.labelSm, color: Colors.muted, letterSpacing: 0.3 },
  coreOrden: { fontSize: FontSize.labelSm, fontWeight: '700', marginTop: Spacing.sm },

  // lead magnets
  lmRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: Spacing.sm, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', gap: Spacing.sm },
  lmStar: { fontSize: 14 },
  lmName: { fontSize: FontSize.bodyMd, fontWeight: '600', color: Colors.onSurface },
  lmRol: { fontSize: FontSize.labelMd, color: Colors.muted, marginTop: 1 },

  // funnel
  funnelCard: { flex: 1, minWidth: 130, backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Hairline.soft, padding: Spacing.md, alignItems: 'center', ...Elevation.sm },
  funnelStep: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel },
  funnelEtapa: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, marginTop: 4, textAlign: 'center' },
  funnelDesc: { fontSize: FontSize.labelSm, color: Colors.muted, marginVertical: 6, textAlign: 'center', lineHeight: 15 },
  funnelArrow: { alignSelf: 'center', color: Colors.muted, fontSize: 22, fontWeight: '700' },

  // money model
  mmCard: { ...cardBase },
  mmEtapa: { fontSize: FontSize.bodyMd, fontWeight: '800' },
  mmOferta: { fontSize: FontSize.labelLg, color: Colors.onSurface, marginTop: 4, lineHeight: 18 },
  mmObj: { fontSize: FontSize.labelMd, color: Colors.muted, marginTop: 6, fontStyle: 'italic' },

  // logística
  modeloCard: { ...cardBase },
  modeloName: { fontSize: FontSize.bodyLg, fontWeight: '800', color: Colors.onSurface },
  costRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', gap: Spacing.sm },
  costComp: { flex: 1.4, fontSize: FontSize.bodyMd, color: Colors.onSurface, fontWeight: '500' },
  costPct: { width: 70, fontSize: FontSize.bodyMd, fontWeight: '800' },
  costNota: { flex: 1.6, fontSize: FontSize.labelMd, color: Colors.muted },
  costTotalRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.lg },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 6, gap: Spacing.sm },
  bulletIcon: { fontSize: 13 },

  // pendientes
  pendRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  pendTitle: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  pendDetail: { fontSize: FontSize.labelMd, color: Colors.muted, marginTop: 2, lineHeight: 17 },

  // KPI log semanal
  kpiWeekRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.md, marginBottom: Spacing.md },
  kpiNavBtn: { borderWidth: 1, borderColor: Hairline.medium, borderRadius: BorderRadius.md, paddingVertical: 6, paddingHorizontal: 10, backgroundColor: 'rgba(255,255,255,0.03)' },
  kpiNavTxt: { fontSize: FontSize.labelSm, fontWeight: '700', color: Colors.onSurfaceVariant, letterSpacing: 0.3 },
  kpiWeekKey: { fontSize: FontSize.titleMd, lineHeight: LineHeight.titleMd, fontWeight: '800', color: AMBER, letterSpacing: 0.5 },
  kpiWeekSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2 },
  kpiCell: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: BorderRadius.lg, borderWidth: 1, padding: Spacing.md, ...Elevation.sm },
  kpiLabel: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1, flexShrink: 1 },
  kpiUnidad: { fontSize: FontSize.labelMd, color: Colors.muted, fontWeight: '700' },
  kpiInput: { flex: 1, fontSize: FontSize.titleMd, fontWeight: '800', paddingVertical: 4, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.12)', ...monoText },
  kpiMeta: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4 },
  kpiHint: { fontSize: 9, color: Colors.smallLabel, marginTop: 2, lineHeight: 12 },
  kpiNota: { marginTop: Spacing.md, fontSize: FontSize.labelMd, color: Colors.onSurface, paddingVertical: 8, paddingHorizontal: 10, borderWidth: 1, borderColor: Hairline.soft, borderRadius: BorderRadius.md, backgroundColor: 'rgba(255,255,255,0.03)' },
  kpiBtnRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flexWrap: 'wrap', marginTop: Spacing.md },
  kpiGhostBtn: { borderWidth: 1, borderColor: AMBER + '66', borderRadius: BorderRadius.lg, paddingVertical: 8, paddingHorizontal: 14 },
  kpiGhostTxt: { fontSize: FontSize.labelMd, fontWeight: '700', color: AMBER, letterSpacing: 0.2 },
  kpiAlert: { marginTop: Spacing.md, padding: Spacing.md, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.coral + '66', backgroundColor: Colors.coral + '14' },
  kpiAlertTitle: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.coral, letterSpacing: 0.3 },
  kpiAlertTxt: { fontSize: FontSize.labelMd, color: Colors.tertiary, marginTop: 3, lineHeight: 17 },
  kpiHistTitle: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1, marginBottom: 6 },
  kpiHistKey: { width: 92 },
  kpiHistCol: { width: 96, textAlign: 'center' },
  kpiHistSub: { fontSize: 9, color: Colors.muted, marginTop: 1 },

  // acceso en Perú
  accCard: { marginTop: Spacing.md, padding: Spacing.md, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.soft, borderLeftWidth: 3, backgroundColor: 'rgba(255,255,255,0.03)' },
  accMol: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, flexShrink: 1 },
  accPres: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2, marginBottom: 4 },
  accLine: { flexDirection: 'row', gap: Spacing.sm, paddingVertical: 3, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.04)' },
  accKey: { width: 118, fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 2 },
  accVal: { flex: 1, fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, lineHeight: 16 },
  accFuente: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 4, lineHeight: 15 },

  // revisión trimestral
  revCard: { flex: 1, minWidth: 200, padding: Spacing.md, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.blue + '55', backgroundColor: Colors.blue + '12' },
  revDia: { fontSize: FontSize.labelMd, fontWeight: '800', color: Colors.blue, letterSpacing: 0.5 },
  revTitulo: { fontSize: FontSize.labelMd, color: Colors.onSurface, marginTop: 3, lineHeight: 17 },

  // protocolo clínico
  protoCard: { marginTop: Spacing.md, padding: Spacing.md, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.soft, borderLeftWidth: 3, backgroundColor: 'rgba(255,255,255,0.03)' },
  protoTitulo: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  protoSub: { fontSize: FontSize.labelSm, color: Colors.muted, marginTop: 2 },

  // links
  linkChip: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Hairline.soft, paddingVertical: 7, paddingHorizontal: 11 },
  linkChipText: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, fontWeight: '500', letterSpacing: 0.2 },
  ctaBtn: { backgroundColor: AMBER, borderRadius: BorderRadius.lg, paddingVertical: 9, paddingHorizontal: 16, ...Elevation.glow(AMBER) },
  ctaBtnText: { fontSize: FontSize.labelLg, fontWeight: '800', color: '#0B1628', letterSpacing: 0.2 },

  // directrices
  dirTip: { flexDirection: 'row', alignItems: 'flex-start', marginTop: Spacing.md, gap: Spacing.sm },
  dirTipT: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface },
  dirTipD: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: 17 },

  // franquicias
  franqCard: { ...cardBase, alignItems: 'center', borderStyle: 'dashed' },
  franqName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, textAlign: 'center' },
  franqDesc: { fontSize: FontSize.labelMd, color: Colors.muted, marginTop: 4, textAlign: 'center', lineHeight: 16 },
});
