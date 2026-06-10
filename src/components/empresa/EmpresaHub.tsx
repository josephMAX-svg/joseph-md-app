import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { consumeNavIntent } from '../../lib/navIntent';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
import { desktopStyles, DesktopColors } from '../../theme/desktopStyles';
import { AMBER, PillTab, Chip, SectionLabel, useHover } from './primitives';
import { GradientHero, RingStat, BrandTile } from './visuals';
import PulsoCommandCenter from './PulsoCommandCenter';
import StudyPulsoHub from '../study/StudyPulsoHub';
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

  // intención de navegación desde Home (p. ej. "Plan 96 días →" → Pulso/Estudio)
  useEffect(() => {
    const intent = consumeNavIntent();
    if (intent === 'estudio-pulso') setCompany('estudio');
  }, []);

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

      {/* Selector proporcional a la importancia: Pulso domina, LIVIANO medio, PIRQA ícono */}
      <BrandSelector active={company} onSelect={setCompany} />
      <Text style={st.selectorHint}>El grupo lo es todo · LIVIANO y PIRQA viven dentro de Pulso</Text>

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

      {company === 'estudio' && (
        <StudyPulsoHub onBack={() => setCompany('pulso')} />
      )}

      {!MAIN_IDS.includes(company) && company !== 'estudio' && (
        <PlaceholderBrandView id={company} onBack={() => setCompany('pulso')} />
      )}
    </ScrollView>
  );
}

// ── Selector proporcional a la importancia ───────────────────────
function BrandSelector({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: Spacing.sm, alignItems: 'stretch', marginBottom: 6 }}>
      <PulsoTab active={active === 'pulso'} onPress={() => onSelect('pulso')} />
      <LivianoTab active={active === 'liviano'} onPress={() => onSelect('liviano')} />
      <PirqaTab active={active === 'pirqa'} onPress={() => onSelect('pirqa')} />
    </View>
  );
}

function PulsoTab({ active, onPress }: { active: boolean; onPress: () => void }) {
  const { hovered, hoverProps } = useHover();
  const gold = BRANDS.pulso.bright;
  const web = Platform.OS === 'web';
  return (
    <TouchableOpacity
      activeOpacity={0.92} onPress={onPress} {...hoverProps}
      style={[
        sel.pulso,
        { borderColor: active ? gold + 'AA' : gold + '3A' },
        web
          ? ({ backgroundImage: 'linear-gradient(120deg, #2E2817 0%, #0A1424 78%)', transition: 'all .2s ease', cursor: 'pointer', ...(hovered ? { transform: [{ translateY: -2 }], borderColor: gold + 'AA' } : {}) } as any)
          : { backgroundColor: '#23252E' },
      ]}
    >
      {web ? (
        <View pointerEvents="none" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '42%', backgroundImage: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.08), transparent)', animationName: 'hubSweep', animationDuration: '5.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' } as any} />
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, position: 'relative' }}>
        <Text style={{ fontSize: 30 }}>{BRANDS.pulso.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={sel.pulsoName}>Pulso</Text>
          <Text style={[sel.pulsoSub, { color: gold }]}>Health Group · el grupo lo es todo</Text>
        </View>
        {active ? <View style={[sel.liveDot, { backgroundColor: gold }]} /> : null}
      </View>
    </TouchableOpacity>
  );
}

function LivianoTab({ active, onPress }: { active: boolean; onPress: () => void }) {
  const { hovered, hoverProps } = useHover();
  const salvia = BRANDS.liviano.bright;
  const web = Platform.OS === 'web';
  return (
    <TouchableOpacity
      activeOpacity={0.9} onPress={onPress} {...hoverProps}
      style={[
        sel.liviano,
        { borderColor: active ? salvia + 'AA' : DesktopColors.glassBorder, backgroundColor: active ? salvia + '14' : 'rgba(255,255,255,0.03)' },
        web ? ({ transition: 'all .15s ease', cursor: 'pointer', ...(hovered && !active ? { borderColor: salvia + '66' } : {}) } as any) : null,
      ]}
    >
      <Text style={{ fontSize: 20 }}>{BRANDS.liviano.emoji}</Text>
      <Text style={[sel.livName, active && { color: Colors.onSurface }]}>LIVIANO</Text>
      <Text style={[sel.livSub, { color: salvia }]}>ancla</Text>
    </TouchableOpacity>
  );
}

function PirqaTab({ active, onPress }: { active: boolean; onPress: () => void }) {
  const { hovered, hoverProps } = useHover();
  const terra = BRANDS.pirqa.bright;
  const web = Platform.OS === 'web';
  return (
    <TouchableOpacity
      activeOpacity={0.85} onPress={onPress} {...hoverProps}
      style={[
        sel.pirqa,
        { borderColor: active ? terra + 'AA' : DesktopColors.glassBorder, backgroundColor: active ? terra + '18' : 'rgba(255,255,255,0.03)' },
        web ? ({ transition: 'all .15s ease', cursor: 'pointer', ...(hovered && !active ? { borderColor: terra + '66', transform: [{ translateY: -2 }] } : {}) } as any) : null,
      ]}
    >
      <Text style={{ fontSize: 18 }}>{BRANDS.pirqa.emoji}</Text>
      <Text style={[sel.pirqaLabel, { color: terra }]}>1%</Text>
    </TouchableOpacity>
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
  selectorHint: { fontSize: FontSize.labelSm, color: Colors.smallLabel, fontStyle: 'italic', marginBottom: Spacing.xl, marginTop: 2 },

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

// Selector proporcional: Pulso domina, LIVIANO medio, PIRQA ícono (1%)
const sel = StyleSheet.create({
  pulso: { flex: 5, borderRadius: BorderRadius.xl, borderWidth: 1, paddingVertical: 16, paddingHorizontal: 20, overflow: 'hidden', justifyContent: 'center', minHeight: 68 },
  pulsoName: { fontSize: FontSize.titleLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.4 },
  pulsoSub: { fontSize: FontSize.labelMd, fontWeight: '600', marginTop: 2 },
  liveDot: { width: 9, height: 9, borderRadius: 5 },
  liviano: { flex: 1.05, borderRadius: BorderRadius.lg, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', minHeight: 68 },
  livName: { fontSize: FontSize.labelLg, fontWeight: '800', color: Colors.muted, marginTop: 2, letterSpacing: 0.2 },
  livSub: { fontSize: 9, fontWeight: '700', marginTop: 1 },
  pirqa: { width: 52, borderRadius: BorderRadius.lg, borderWidth: 1, alignItems: 'center', justifyContent: 'center', minHeight: 68 },
  pirqaLabel: { fontSize: 9, fontWeight: '800', marginTop: 2 },
});
