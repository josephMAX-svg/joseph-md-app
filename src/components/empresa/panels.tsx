import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Linking, ScrollView } from 'react-native';
import BrandHorario from './BrandHorario';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import {
  AMBER, GlassPanel, SectionLabel, Chip, MetricCard, StatCell, SemaforoDot,
  useHover, semaforoColor, accentColor, estadoCreativoColor, estadoEmpresaColor,
  gridStyle, gridItemStyle,
} from './primitives';
import {
  LIVIANO_KPIS, KPI_GRUPOS, LIVIANO_OFERTA, ESTUDIO_MERCADO, MARKETING_REGLAS,
  COMPETIDORES, LIVIANO_VENTAS, LIVIANO_LOGISTICA, LIVIANO_PENDIENTES,
  LIVIANO_DIRECTRICES, PULSO_LINKS, PULSO_LINK_GRUPOS, PIRQA_DATA, PULSO_MATRIZ,
  BRANDS, EMPRESAS,
} from '../../lib/empresaData';

/**
 * Paneles del Hub de Empresa. Presentacionales y data-driven (todo viene de
 * empresaData.ts). Se reutilizan tal cual en mobile y desktop; el grid se adapta
 * solo (CSS grid auto-fill en web, flexWrap en native).
 */

function openUrl(url: string) {
  Linking.openURL(url).catch(() => {});
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

      {/* Pendientes críticos */}
      <Block title="Pendientes críticos (riesgos)">
        <GlassPanel>
          {LIVIANO_PENDIENTES.map((p, i) => (
            <View key={i} style={[s.pendRow, i === 0 && { borderTopWidth: 0 }]}>
              <SemaforoDot s={p.nivel} size={10} />
              <View style={{ flex: 1, marginLeft: Spacing.md }}>
                <Text style={s.pendTitle}>{p.titulo}</Text>
                <Text style={s.pendDetail}>{p.detalle}</Text>
              </View>
            </View>
          ))}
        </GlassPanel>
      </Block>

      {/* Filosofía del margen */}
      <GlassPanel accent={AMBER} style={{ padding: Spacing.lg }}>
        <Text style={s.h3}>💡 El verdadero uso del margen</Text>
        <Text style={s.body}>{l.filosofia}</Text>
      </GlassPanel>
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
