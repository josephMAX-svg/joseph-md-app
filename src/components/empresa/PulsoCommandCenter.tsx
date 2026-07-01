import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { SectionLabel, Chip, gridStyle, gridItemStyle } from './primitives';
import { GradientHero, KpiTicker, RingStat, TrendArea, BrandTile, CommandBackdrop, MegaStat } from './visuals';
import {
  PULSO_MATRIZ, PULSO_CONSOLIDADO, CARTERA_PULSO, PIRQA_DATA, BRANDS,
} from '../../lib/empresaData';

/**
 * PulsoCommandCenter — la vista dominante (99%) del Hub: centro de control del
 * conglomerado Pulso. Hero animado + anillos + roadmap + cartera de marcas.
 * LIVIANO es el ancla (tile hero), las 6 líneas futuras son tiles placeholder,
 * PIRQA es deliberadamente pequeño (1%).
 */

const GOLD = BRANDS.pulso.bright;       // #D9BE8A
const GOLD_DEEP = BRANDS.pulso.color;   // #C6A56B
const AURUM_GOLD = '#C9A227';           // oro AURUM (sección Closer de ventas)

function openUrl(url: string) { Linking.openURL(url).catch(() => {}); }

// Sparkline proyectado de LIVIANO (altas/mes objetivo — ilustrativo)
const LIVIANO_SPARK = [{ v: 2 }, { v: 3 }, { v: 3 }, { v: 4 }, { v: 5 }, { v: 6 }, { v: 8 }];

export default function PulsoCommandCenter({ onOpenBrand }: { onOpenBrand: (id: string) => void }) {
  const m = PULSO_MATRIZ;
  const c = PULSO_CONSOLIDADO;
  const liviano = CARTERA_PULSO.find(b => b.id === 'liviano')!;
  const futuras = CARTERA_PULSO.filter(b => b.id !== 'liviano');

  return (
    <View style={{ position: 'relative' }}>
      <CommandBackdrop />

      {/* ── HERO animado ── */}
      <GradientHero from="#2A2517" to="#0A1424" style={{ marginBottom: Spacing.lg, borderColor: GOLD + '33' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.md }}>
          <View style={{ flex: 1, minWidth: 240 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Text style={{ fontSize: 30 }}>{BRANDS.pulso.emoji}</Text>
              <Text style={st.heroTitle}>Pulso Health Group</Text>
            </View>
            <Text style={st.heroSub}>{m.founder} · {m.base}</Text>
            <Text style={st.heroTesis}>{m.tesis}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.85} onPress={() => openUrl(m.crmUrl)} style={[st.cta, { backgroundColor: GOLD }]}>
            <Text style={st.ctaText}>Abrir CRM Pulso ↗</Text>
          </TouchableOpacity>
        </View>
      </GradientHero>

      {/* ── Mega-stat: el golpe de drama ── */}
      <MegaStat value={c.lineasSalud} label="Líneas de salud · una sola plataforma" accent={GOLD} footnote="1 activa · 6 en desarrollo · + PIRQA (no clínico)" />

      {/* ── Ticker de stats en movimiento ── */}
      <View style={st.tickerWrap}>
        <KpiTicker items={c.ticker} accent={GOLD} />
      </View>

      {/* ── Anillos + stats consolidados (estilo VITALS) ── */}
      <View style={st.ringRow}>
        <View style={st.ringCard}>
          <RingStat value={c.readinessGrupo} label="Madurez grupo" sub="cartera promedio" accent={GOLD} suffix="%" />
        </View>
        <View style={st.ringCard}>
          <RingStat value={liviano.progreso} label="LIVIANO listo" sub="hacia el lanzamiento" accent={BRANDS.liviano.bright} suffix="%" />
        </View>
        <View style={st.ringCard}>
          <RingStat value={c.lineasActivas} max={c.lineasSalud} label="Líneas activas" sub={`de ${c.lineasSalud} en cartera`} accent={Colors.teal} />
        </View>
        <View style={st.ringCard}>
          <RingStat value={c.tenantsProduccion} max={1} label="En producción" sub="PIRQA · no clínico" accent={BRANDS.pirqa.bright} />
        </View>
      </View>

      {/* ── Roadmap de líneas (gráfico animado) ── */}
      <View style={st.chartCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.sm }}>
          <SectionLabel style={{ marginBottom: 0 }}>Roadmap de líneas activas</SectionLabel>
          <Chip label="proyección" color={Colors.muted} small />
        </View>
        <TrendArea data={c.roadmap} dataKey="activas" labelKey="t" accent={GOLD} height={140} />
      </View>

      {/* ── CARTERA DE MARCAS ── */}
      <SectionLabel style={{ marginTop: Spacing.lg }}>Cartera de marcas · LIVIANO es el ancla</SectionLabel>

      {/* LIVIANO hero tile */}
      <View style={{ marginBottom: Spacing.md }}>
        <BrandTile
          variant="hero"
          emoji={liviano.emoji}
          nombre={liviano.nombre}
          categoria={liviano.categoria}
          accent={liviano.accent}
          estado={liviano.estado}
          tagline={liviano.tagline}
          metricaClave={liviano.metricaClave}
          sparkData={LIVIANO_SPARK}
          onPress={() => onOpenBrand('liviano')}
        />
      </View>

      {/* 6 líneas futuras (placeholders) */}
      <View style={gridStyle(180)}>
        {futuras.map(b => (
          <View key={b.id} style={gridItemStyle(180)}>
            <BrandTile
              variant="placeholder"
              emoji={b.emoji}
              nombre={b.nombre}
              categoria={b.categoria}
              accent={b.accent}
              estado={b.estado}
              tagline={b.tagline}
              progreso={b.progreso}
              onPress={() => onOpenBrand(b.id)}
            />
          </View>
        ))}
      </View>

      {/* PIRQA — deliberadamente pequeño (1%) */}
      <SectionLabel style={{ marginTop: Spacing.xl }}>No clínico · 1%</SectionLabel>
      <BrandTile
        variant="tiny"
        emoji={BRANDS.pirqa.emoji}
        nombre="PIRQA"
        categoria="Gastronomía andina · en producción"
        accent={BRANDS.pirqa.bright}
        estado="activa"
        onPress={() => onOpenBrand('pirqa')}
      />

      {/* ── Estudio del fundador (plan 96d) ── */}
      <SectionLabel style={{ marginTop: Spacing.xl }}>Estudio del fundador</SectionLabel>
      <TouchableOpacity activeOpacity={0.9} onPress={() => onOpenBrand('estudio')}
        style={[st.estudioTile, Platform.OS === 'web' ? ({ backgroundImage: `linear-gradient(120deg, ${GOLD}1F 0%, rgba(11,22,40,0.2) 70%)`, cursor: 'pointer', transition: 'all .2s ease' } as any) : { backgroundColor: GOLD + '14' }]}>
        <Text style={{ fontSize: 28, marginRight: Spacing.md }}>📚</Text>
        <View style={{ flex: 1 }}>
          <Text style={st.estudioTitle}>Estudio Pulso · plan 96 días</Text>
          <Text style={st.estudioSub}>28 libros · 2 ramas (clínico 60% + marketing 40%) · la autoridad que vende Pulso</Text>
        </View>
        <View style={[st.estudioCta, { borderColor: GOLD + '88' }]}><Text style={[st.estudioCtaText, { color: GOLD }]}>Abrir ›</Text></View>
      </TouchableOpacity>

      {/* ── AURUM · Closer de ventas de élite (programa 6 meses) ── */}
      <TouchableOpacity activeOpacity={0.9} onPress={() => onOpenBrand('aurum')}
        style={[st.estudioTile, { marginTop: Spacing.md }, Platform.OS === 'web' ? ({ backgroundImage: `linear-gradient(120deg, ${AURUM_GOLD}26 0%, rgba(11,22,40,0.2) 70%)`, cursor: 'pointer', transition: 'all .2s ease' } as any) : { backgroundColor: AURUM_GOLD + '18' }, { borderColor: AURUM_GOLD + '55' }]}>
        <Text style={{ fontSize: 28, marginRight: Spacing.md }}>🪙</Text>
        <View style={{ flex: 1 }}>
          <Text style={st.estudioTitle}>AURUM · Closer de ventas</Text>
          <Text style={st.estudioSub}>Programa de 6 meses · 26 sem · 130 misiones L-V — convertir conversaciones en oro (Hormozi · Voss · Cardone · Cialdini · Rackham)</Text>
        </View>
        <View style={[st.estudioCta, { borderColor: AURUM_GOLD + '88' }]}><Text style={[st.estudioCtaText, { color: AURUM_GOLD }]}>Abrir ›</Text></View>
      </TouchableOpacity>

      {/* ── Pilares ── */}
      <SectionLabel style={{ marginTop: Spacing.xl }}>Por qué un solo grupo</SectionLabel>
      <View style={gridStyle(240)}>
        {m.pilares.map((p, i) => (
          <View key={i} style={[gridItemStyle(240), st.pilar]}>
            <View style={[st.pilarBar, { backgroundColor: GOLD }]} />
            <Text style={st.pilarTitle}>{p.titulo}</Text>
            <Text style={st.pilarDesc}>{p.desc}</Text>
          </View>
        ))}
      </View>

      {/* ── Links (compactos, de-emphasized) ── */}
      <SectionLabel style={{ marginTop: Spacing.xl }}>Accesos rápidos</SectionLabel>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm }}>
        {[
          { label: 'CRM Pulso', url: 'https://pulso-crm.vercel.app/hoy' },
          { label: 'Liviano (panel)', url: 'https://pulso-crm.vercel.app/liviano' },
          { label: 'PIRQA · WhatsApp', url: PIRQA_DATA.links[0].url },
          { label: 'Marketing', url: 'https://pulso-crm.vercel.app/marketing' },
        ].map((lk, i) => (
          <TouchableOpacity key={i} activeOpacity={0.8} onPress={() => openUrl(lk.url)} style={st.quickLink}>
            <Text style={st.quickLinkText}>{lk.label} ↗</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  heroTitle: { fontSize: FontSize.headlineSm, lineHeight: LineHeight.headlineSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5 },
  heroSub: { fontSize: FontSize.labelLg, color: GOLD, marginTop: 6, fontWeight: '600', letterSpacing: 0.2 },
  heroTesis: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: Spacing.md, lineHeight: LineHeight.bodyMd, maxWidth: 620 },
  cta: { borderRadius: BorderRadius.lg, paddingVertical: 10, paddingHorizontal: 16, alignSelf: 'flex-start', ...Elevation.glow(GOLD) },
  ctaText: { fontSize: FontSize.labelLg, fontWeight: '800', color: '#0B1628', letterSpacing: 0.2 },

  tickerWrap: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Hairline.soft,
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.lg,
  },

  ringRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  ringCard: {
    flex: 1, minWidth: 140,
    backgroundColor: DesktopColors.glass,
    borderRadius: BorderRadius.xl,
    borderWidth: 1, borderColor: Hairline.soft,
    paddingVertical: Spacing.lg, paddingHorizontal: Spacing.md,
    alignItems: 'center',
    ...Elevation.sm,
  },

  chartCard: {
    backgroundColor: DesktopColors.glass,
    borderRadius: BorderRadius.xl,
    borderWidth: 1, borderColor: Hairline.soft,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Elevation.sm,
  },

  pilar: {
    backgroundColor: DesktopColors.glass,
    borderRadius: BorderRadius.lg,
    borderWidth: 1, borderColor: Hairline.soft,
    paddingVertical: Spacing.lg, paddingRight: Spacing.lg, paddingLeft: Spacing.lg + 4,
    overflow: 'hidden',
    ...Elevation.sm,
  },
  pilarBar: { position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, borderTopLeftRadius: BorderRadius.lg, borderBottomLeftRadius: BorderRadius.lg },
  pilarTitle: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, marginBottom: 5, letterSpacing: -0.1 },
  pilarDesc: { fontSize: FontSize.labelMd, color: Colors.muted, lineHeight: LineHeight.labelMd + 1 },

  quickLink: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Hairline.soft,
    paddingVertical: 7, paddingHorizontal: 12,
  },
  quickLinkText: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, fontWeight: '600', letterSpacing: 0.2 },

  estudioTile: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl,
    borderWidth: 1, borderColor: GOLD + '3A', padding: Spacing.lg, overflow: 'hidden',
    ...Elevation.sm,
  },
  estudioTitle: { fontSize: FontSize.bodyLg, lineHeight: LineHeight.bodyLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  estudioSub: { fontSize: FontSize.labelMd, color: Colors.onSurfaceVariant, marginTop: 3, lineHeight: LineHeight.labelMd + 1 },
  estudioCta: { borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 6, paddingHorizontal: 13, marginLeft: Spacing.sm },
  estudioCtaText: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.2 },
});
