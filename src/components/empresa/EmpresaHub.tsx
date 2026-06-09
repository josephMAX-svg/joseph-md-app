import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { desktopStyles, DesktopColors } from '../../theme/desktopStyles';
import { AMBER, PillTab, Chip, SectionLabel } from './primitives';
import { GradientHero, RingStat, BrandTile } from './visuals';
import PulsoCommandCenter from './PulsoCommandCenter';
import {
  CockpitPanel, OfertaPanel, MarketingPanel, VentasPanel,
  LogisticaPanel, WebPanel, DirectricesPanel, PirqaView,
} from './panels';
import { EMPRESAS, BRANDS, CARTERA_PULSO } from '../../lib/empresaData';

/**
 * EmpresaHub — shell del Hub de Empresa (Business). Pulso es el padre y el 99%
 * del foco: abre por defecto en el Pulso Command Center. Desde ahí se entra a las
 * marcas: LIVIANO (ancla, 7 paneles detallados), PIRQA (1%) y las 6 líneas futuras
 * (placeholders). Reutilizado por mobile y desktop vía `variant`.
 */

const MAIN_TABS: { id: string; label: string }[] = [
  { id: 'pulso',   label: 'Pulso' },
  { id: 'liviano', label: 'LIVIANO' },
  { id: 'pirqa',   label: 'PIRQA' },
];

const LIVIANO_PANELS: { id: string; label: string; icon: string; render: () => React.ReactNode }[] = [
  { id: 'cockpit',     label: 'Cockpit',     icon: '📊', render: () => <CockpitPanel /> },
  { id: 'oferta',      label: 'Oferta',      icon: '🎯', render: () => <OfertaPanel /> },
  { id: 'marketing',   label: 'Marketing',   icon: '📣', render: () => <MarketingPanel /> },
  { id: 'ventas',      label: 'Ventas',      icon: '💰', render: () => <VentasPanel /> },
  { id: 'logistica',   label: 'Logística',   icon: '📦', render: () => <LogisticaPanel /> },
  { id: 'web',         label: 'Web & Links', icon: '🌐', render: () => <WebPanel /> },
  { id: 'directrices', label: 'Directrices', icon: '🧠', render: () => <DirectricesPanel /> },
];

const MAIN_IDS = ['pulso', 'liviano', 'pirqa'];

export default function EmpresaHub({ variant = 'mobile' }: { variant?: 'mobile' | 'desktop' }) {
  const [company, setCompany] = useState<string>('pulso');
  const [panel, setPanel] = useState<string>('cockpit');
  const isDesktop = variant === 'desktop';

  const openBrand = (id: string) => {
    if (id === 'liviano') setPanel('cockpit');
    setCompany(id);
  };

  const contentStyle = isDesktop
    ? desktopStyles.centerScrollContent
    : { paddingHorizontal: Spacing.lg, paddingTop: 56, paddingBottom: 110 };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.surface }}
      contentContainerStyle={contentStyle as any}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={{ marginBottom: Spacing.lg }}>
        <Text style={isDesktop ? desktopStyles.pageTitle : st.title}>Business · Centro de control</Text>
        <Text style={st.subtitle}>Pulso Health Group — el conglomerado de salud DTC y sus líneas.</Text>
      </View>

      {/* Selector principal */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: Spacing.xl, marginHorizontal: isDesktop ? 0 : -2 }}
        contentContainerStyle={{ gap: Spacing.sm, paddingVertical: 2, paddingHorizontal: 2 }}
      >
        {MAIN_TABS.map(t => (
          <PillTab
            key={t.id}
            label={t.label}
            icon={BRANDS[t.id]?.emoji}
            dot={BRANDS[t.id]?.bright}
            active={company === t.id}
            onPress={() => setCompany(t.id)}
          />
        ))}
      </ScrollView>

      {/* Contenido por empresa */}
      {company === 'pulso' && <PulsoCommandCenter onOpenBrand={openBrand} />}

      {company === 'liviano' && (
        <LivianoView panel={panel} setPanel={setPanel} isDesktop={isDesktop} onBack={() => setCompany('pulso')} />
      )}

      {company === 'pirqa' && (
        <View>
          <BackToPulso onBack={() => setCompany('pulso')} />
          <PirqaView />
        </View>
      )}

      {!MAIN_IDS.includes(company) && (
        <PlaceholderBrandView id={company} onBack={() => setCompany('pulso')} />
      )}
    </ScrollView>
  );
}

// ── Breadcrumb / volver a Pulso ──────────────────────────────────
function BackToPulso({ onBack }: { onBack: () => void }) {
  return (
    <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={st.breadcrumb}>
      <Text style={st.breadcrumbText}>‹ Pulso</Text>
      <Text style={st.breadcrumbSep}>/</Text>
    </TouchableOpacity>
  );
}

// ── Vista LIVIANO (ancla, 7 paneles) con hero visual ─────────────
function LivianoView({
  panel, setPanel, isDesktop, onBack,
}: { panel: string; setPanel: (p: string) => void; isDesktop: boolean; onBack: () => void }) {
  const liviano = EMPRESAS.find(e => e.id === 'liviano')!;
  const salvia = BRANDS.liviano.bright;
  const active = LIVIANO_PANELS.find(p => p.id === panel) ?? LIVIANO_PANELS[0];

  return (
    <View>
      <BackToPulso onBack={onBack} />

      {/* Hero visual de LIVIANO */}
      <GradientHero from="#26301F" to="#0A1424" style={{ marginBottom: Spacing.lg, borderColor: salvia + '33' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.lg }}>
          <View style={{ flex: 1, minWidth: 220 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <Text style={{ fontSize: 28 }}>{liviano.icon}</Text>
              <Text style={st.livianoTitle}>LIVIANO</Text>
              <Chip label="Ancla de Pulso" color={salvia} small />
              <Chip label="En desarrollo" color={AMBER} small />
            </View>
            <Text style={st.livianoDesc}>{liviano.descCorta}</Text>
            <Text style={st.livianoLoc}>📍 {liviano.ubicacion}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: Spacing.lg }}>
            <RingStat value={57} label="Margen Despegue" sub="meta > 55%" accent={Colors.green} suffix="%" size={84} />
            <RingStat value={65} label="Listo p/ lanzar" sub="readiness" accent={salvia} suffix="%" size={84} />
          </View>
        </View>
      </GradientHero>

      {/* Sub-nav de paneles */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: Spacing.xl, marginHorizontal: isDesktop ? 0 : -2 }}
        contentContainerStyle={{ gap: Spacing.sm, paddingVertical: 2, paddingHorizontal: 2 }}
      >
        {LIVIANO_PANELS.map(p => (
          <PillTab key={p.id} label={p.label} icon={p.icon} active={panel === p.id} onPress={() => setPanel(p.id)} />
        ))}
      </ScrollView>

      {active.render()}
    </View>
  );
}

// ── Vista de marca futura (placeholder) ──────────────────────────
function PlaceholderBrandView({ id, onBack }: { id: string; onBack: () => void }) {
  const b = CARTERA_PULSO.find(x => x.id === id);
  if (!b) { return <View><BackToPulso onBack={onBack} /><Text style={st.subtitle}>Marca no encontrada.</Text></View>; }
  return (
    <View>
      <BackToPulso onBack={onBack} />
      <GradientHero from="#1A2133" to="#0A1424" style={{ marginBottom: Spacing.lg, borderColor: b.accent + '33' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Text style={{ fontSize: 34 }}>{b.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={st.livianoTitle}>{b.nombre}</Text>
            <Text style={[st.brandCat, { color: b.accent }]}>{b.categoria}</Text>
          </View>
          <Chip label="Próximamente" color={b.accent} small />
        </View>
        <Text style={st.livianoDesc}>{b.tagline}</Text>
      </GradientHero>

      <View style={st.placeBody}>
        <Text style={st.placeBodyTitle}>Línea reservada de la cartera Pulso</Text>
        <Text style={st.placeBodyText}>
          Aún no estructurada. Cuando se defina, reutilizará la misma plataforma, el CRM multi-tenant
          y el motor de IA de Pulso — igual que LIVIANO. Madurez actual: {b.progreso}%.
        </Text>
        <View style={st.progTrack}>
          <View style={[st.progFill, { width: `${Math.max(4, b.progreso)}%`, backgroundColor: b.accent }]} />
        </View>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  title: { fontSize: FontSize.headlineLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.5 },
  subtitle: { fontSize: FontSize.labelLg, color: Colors.muted, marginTop: 4, lineHeight: 19 },

  breadcrumb: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Spacing.md, alignSelf: 'flex-start' },
  breadcrumbText: { fontSize: FontSize.labelLg, color: BRANDS.pulso.bright, fontWeight: '700' },
  breadcrumbSep: { fontSize: FontSize.labelLg, color: Colors.muted },

  livianoTitle: { fontSize: FontSize.headlineSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.3 },
  livianoDesc: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: Spacing.md, lineHeight: 20, maxWidth: 560 },
  livianoLoc: { fontSize: FontSize.labelMd, color: Colors.muted, marginTop: 6 },
  brandCat: { fontSize: FontSize.labelLg, fontWeight: '700', marginTop: 2 },

  placeBody: {
    backgroundColor: DesktopColors.glass,
    borderRadius: BorderRadius.xl,
    borderWidth: 1, borderColor: DesktopColors.glassBorder,
    padding: Spacing.xl,
  },
  placeBodyTitle: { fontSize: FontSize.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: Spacing.sm },
  placeBodyText: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 20 },
  progTrack: { height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.06)', marginTop: Spacing.lg, overflow: 'hidden' },
  progFill: { height: 6, borderRadius: 3 },
});
