import React, { useState } from 'react';
import { View, Text, ScrollView, Platform, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { desktopStyles } from '../../theme/desktopStyles';
import { AMBER, PillTab, Chip } from './primitives';
import {
  CockpitPanel, OfertaPanel, MarketingPanel, VentasPanel,
  LogisticaPanel, WebPanel, DirectricesPanel,
  PirqaView, PulsoView, FranquiciasView,
} from './panels';
import { EMPRESAS, BRANDS } from '../../lib/empresaData';

/**
 * EmpresaHub — shell del Hub de Empresa (sección Business).
 * Selector Pulso · LIVIANO · PIRQA · Franquicias (default LIVIANO).
 * LIVIANO abre con 7 sub-paneles. Reutilizado por mobile y desktop vía `variant`.
 */

type CompanyId = 'pulso' | 'liviano' | 'pirqa' | 'franquicias';

const COMPANIES: { id: CompanyId; label: string }[] = [
  { id: 'pulso',       label: 'Pulso' },
  { id: 'liviano',     label: 'LIVIANO' },
  { id: 'pirqa',       label: 'PIRQA' },
  { id: 'franquicias', label: 'Franquicias' },
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

export default function EmpresaHub({ variant = 'mobile' }: { variant?: 'mobile' | 'desktop' }) {
  const [company, setCompany] = useState<CompanyId>('liviano');
  const [panel, setPanel] = useState<string>('cockpit');

  const isDesktop = variant === 'desktop';
  const liviano = EMPRESAS.find(e => e.id === 'liviano')!;
  const activePanel = LIVIANO_PANELS.find(p => p.id === panel) ?? LIVIANO_PANELS[0];

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
        <Text style={st.subtitle}>Pulso Health Group — métricas, oferta, marketing, logística y directrices.</Text>
      </View>

      {/* Selector de empresas */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: Spacing.xl, marginHorizontal: isDesktop ? 0 : -2 }}
        contentContainerStyle={{ gap: Spacing.sm, paddingVertical: 2, paddingHorizontal: 2 }}
      >
        {COMPANIES.map(c => (
          <PillTab
            key={c.id}
            label={c.label}
            icon={BRANDS[c.id]?.emoji}
            dot={BRANDS[c.id]?.bright}
            active={company === c.id}
            onPress={() => setCompany(c.id)}
          />
        ))}
      </ScrollView>

      {/* Contenido por empresa */}
      {company === 'liviano' && (
        <View>
          {/* Identity strip */}
          <View style={st.identityRow}>
            <Text style={st.identityEmoji}>{liviano.icon}</Text>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flexWrap: 'wrap' }}>
                <Text style={st.identityName}>{liviano.nombre}</Text>
                <Chip label="En desarrollo" color={AMBER} small />
              </View>
              <Text style={st.identityDesc}>{liviano.descCorta}</Text>
              <Text style={st.identityLoc}>📍 {liviano.ubicacion}</Text>
            </View>
          </View>

          {/* Sub-nav de paneles */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: Spacing.xl, marginHorizontal: isDesktop ? 0 : -2 }}
            contentContainerStyle={{ gap: Spacing.sm, paddingVertical: 2, paddingHorizontal: 2 }}
          >
            {LIVIANO_PANELS.map(p => (
              <PillTab
                key={p.id}
                label={p.label}
                icon={p.icon}
                active={panel === p.id}
                onPress={() => setPanel(p.id)}
              />
            ))}
          </ScrollView>

          {/* Panel activo */}
          {activePanel.render()}
        </View>
      )}

      {company === 'pulso' && <PulsoView />}
      {company === 'pirqa' && <PirqaView />}
      {company === 'franquicias' && <FranquiciasView />}
    </ScrollView>
  );
}

const st = StyleSheet.create({
  title: {
    fontSize: FontSize.headlineLg,
    fontWeight: '800',
    color: Colors.onSurface,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.labelLg,
    color: Colors.muted,
    marginTop: 4,
    lineHeight: 19,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  identityEmoji: {
    fontSize: 30,
  },
  identityName: {
    fontSize: FontSize.titleLg,
    fontWeight: '800',
    color: Colors.onSurface,
    letterSpacing: -0.3,
  },
  identityDesc: {
    fontSize: FontSize.bodyMd,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
    lineHeight: 19,
  },
  identityLoc: {
    fontSize: FontSize.labelMd,
    color: Colors.muted,
    marginTop: 4,
  },
});
