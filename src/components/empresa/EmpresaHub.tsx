import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { consumeNavIntent } from '../../lib/navIntent';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight } from '../../theme/tokens';
import { desktopStyles, DesktopColors } from '../../theme/desktopStyles';
import { AMBER, BRASS, PillTab, Chip } from './primitives';
import { GradientHero, RingStat, TerminalHeader, KpiTapeStrip, BrandWatchlist, CommandBackdrop } from './visuals';
import type { TapeItem } from './visuals';
import PulsoCommandCenter from './PulsoCommandCenter';
import StudyPulsoHub from '../study/StudyPulsoHub';
import AurumHub from './AurumHub';
import AIFirstPanel from '../study/AIFirstPanel';
import BrandHorario from './BrandHorario';
import LivianoTodayPlan from './LivianoTodayPlan';
import TerrenosLeadTracker from './TerrenosLeadTracker';
import {
  CockpitPanel, OfertaPanel, MarketingPanel, VentasPanel,
  LogisticaPanel, WebPanel, DirectricesPanel, PirqaView, PanelChrome,
} from './panels';
import { EMPRESAS, BRANDS, CARTERA_PULSO, HOLDING_WATCHLIST, PULSO_CONSOLIDADO } from '../../lib/empresaData';
import { Linking } from 'react-native';
import { obsUrl } from '../../lib/obsidianMap';
import { OBS_EMPRESA } from '../../lib/obsidianVaultMap';

const OBS_VIOLET = '#A78BFA';
/** ◆ nota de la marca activa en el vault (02_EMPRESA FINANZAS) — 'estudio' → biblioteca. */
function ObsMarcaLink({ company }: { company: string }) {
  const key = company === 'estudio' ? 'biblioteca' : company;
  const file = OBS_EMPRESA[key] ?? OBS_EMPRESA.mapa;
  const label = company === 'estudio' ? '◆ Obsidian — biblioteca (28 libros)' : `◆ Obsidian — nota de ${company}`;
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={() => Linking.openURL(obsUrl(file)).catch(() => {})}
      style={[{ alignSelf: 'flex-start', marginBottom: Spacing.md, paddingVertical: 5, paddingHorizontal: 12, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: OBS_VIOLET + '44', backgroundColor: OBS_VIOLET + '14' }, Platform.OS === 'web' ? ({ cursor: 'pointer', transition: 'all .15s ease' } as any) : null]}>
      <Text style={{ fontSize: FontSize.labelSm, fontWeight: '700', color: OBS_VIOLET, letterSpacing: 0.3 }}>{label}</Text>
    </TouchableOpacity>
  );
}

/**
 * EmpresaHub — shell del Hub de Empresa (Business). Pulso es el padre y el 99%
 * del foco: abre por defecto en el Pulso Command Center. Desde ahí se entra a las
 * marcas: LIVIANO (ancla, 9 paneles detallados), PIRQA (1%) y las 6 líneas futuras
 * (placeholders). Reutilizado por mobile y desktop vía `variant`.
 */

const LIVIANO_PANELS: { id: string; label: string; icon: string; fkey: string; render: () => React.ReactNode }[] = [
  { id: 'cockpit',     label: 'Cockpit',     icon: '📊', fkey: 'F1', render: () => <CockpitPanel /> },
  { id: 'oferta',      label: 'Oferta',      icon: '🎯', fkey: 'F2', render: () => <OfertaPanel /> },
  { id: 'marketing',   label: 'Marketing',   icon: '📣', fkey: 'F3', render: () => <MarketingPanel /> },
  { id: 'ventas',      label: 'Ventas',      icon: '💰', fkey: 'F4', render: () => <VentasPanel /> },
  { id: 'logistica',   label: 'Logística',   icon: '📦', fkey: 'F5', render: () => <LogisticaPanel /> },
  { id: 'web',         label: 'Web & Links', icon: '🌐', fkey: 'F6', render: () => <WebPanel /> },
  { id: 'directrices', label: 'Directrices', icon: '🧠', fkey: 'F7', render: () => <DirectricesPanel /> },
  { id: 'horario',     label: 'Horario',     icon: '🗓️', fkey: 'F8', render: () => <BrandHorario brand="pulso" /> },
  { id: 'academia',    label: 'Academia',    icon: '📚', fkey: 'F9', render: () => <LivianoTodayPlan /> },
];

const MAIN_IDS = ['pulso', 'liviano', 'pirqa'];

export default function EmpresaHub({ variant = 'mobile' }: { variant?: 'mobile' | 'desktop' }) {
  const [company, setCompany] = useState<string>('pulso');
  const [panel, setPanel] = useState<string>('cockpit');
  const isDesktop = variant === 'desktop';

  // intención de navegación desde Home (p. ej. "Plan 96 días →" → Pulso/Estudio).
  // Desktop: el switch de DesktopLayout REMONTA este componente en cada cambio de pantalla,
  // así que el useEffect([]) lo cubre. Móvil/tablet: el bottom-tab mantiene la pantalla montada,
  // por eso hace falta reaccionar a cada FOCO (si no, el botón solo funciona la 1ª vez).
  useEffect(() => {
    if (consumeNavIntent() === 'estudio-pulso') setCompany('estudio');
  }, []);
  if (!isDesktop) {
    // variant es estable durante la vida del componente → este hook condicional es seguro.
    // useFocusEffect solo existe bajo NavigationContainer (móvil/tablet vía AppNavigator); en
    // desktop NO hay navigator, por eso se gatea con !isDesktop para no lanzar.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFocusEffect(useCallback(() => {
      if (consumeNavIntent() === 'estudio-pulso') setCompany('estudio');
    }, []));
  }

  const openBrand = (id: string) => {
    if (id === 'liviano') setPanel('cockpit');
    setCompany(id);
  };

  const contentStyle = isDesktop
    ? desktopStyles.centerScrollContent
    : { paddingHorizontal: Spacing.lg, paddingTop: 56, paddingBottom: 110 };

  // Cinta de teletipo del holding (mono + deltas) — derivada de PULSO_CONSOLIDADO.
  const c = PULSO_CONSOLIDADO;
  const tape: TapeItem[] = [
    { label: 'Madurez grupo', value: `${c.readinessGrupo}%`, delta: { dir: 'up', label: '+' } },
    { label: 'Líneas', value: `${c.lineasActivas}/${c.lineasSalud}`, delta: { dir: 'up', label: 'activas' } },
    { label: 'MRR LVN', value: 'S/ 0', delta: { dir: 'flat', label: 'pre-lanza' } },
    { label: 'Altas/mes', value: '0', delta: { dir: 'flat', label: 'meta 4' } },
    { label: 'Leads TERR', value: '21', delta: { dir: 'up', label: 'seguimiento' } },
    { label: 'En producción', value: `${c.tenantsProduccion}`, delta: { dir: 'up', label: 'PIRQA' } },
    { label: 'Terminal', value: 'CURADO', delta: { dir: 'flat', label: 'no live CRM' } },
  ];

  // Workspace: contenido central por marca activa.
  const workspace = (
    <>
      {/* Contenido por empresa */}
      {company === 'pulso' && <AIFirstPanel segmento="ops" />}
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

      {company === 'aurum' && (
        <AurumHub onBack={() => setCompany('pulso')} variant={variant} />
      )}

      {company === 'terrenos' && (
        <View>
          <BackToPulso onBack={() => setCompany('pulso')} />
          <SimpleBrandView
            id="terrenos" titulo="Casa Soto Tocas" estado="Venta activa"
            desc="Patrimonios del Mantaro — 13 predios en Huáchac, venta directa de la familia. Web viva + Marketplace (cuenta Flor): 21 compradores en seguimiento (23 conversaciones). Visitas guiadas: sáb/dom desde 4:00 p.m. WhatsApp 934 173 914."
            chips={[['casasototocas.vercel.app ✓', Colors.green], ['Marketplace: 21 compradores activos', Colors.green], ['Ads: NO aún (gate Lean Analytics)', BRASS]]}
            links={[
              ['🌐 Web', 'https://casasototocas.vercel.app'],
              ['📥 Bandeja Marketplace', 'https://www.facebook.com/marketplace/inbox/'],
              ['👥 Grupo FB Hyo-Chupaca', 'https://www.facebook.com/groups/3763516290632831'],
            ]}
          />
          <TerrenosLeadTracker />
          <BrandHorario brand="terrenos" />
        </View>
      )}

      {company === 'golden' && (
        <View>
          <BackToPulso onBack={() => setCompany('pulso')} />
          <SimpleBrandView
            id="golden" titulo="Qori Golden" estado="Pre-lanzamiento"
            desc="Criadero familiar Golden Retriever (qori = oro en quechua, familia de marcas con PIRQA). Madre inseminada ~8-jun → camada nace ~ago, entrega ~oct-2026. Estrategia verificada (criadores élite EE.UU. tipo Recherche $14,500+): web viva con video-hero y barra de gestación, lista de espera con seña S/ 500 Yape (elección por orden de seña), pupdates en video, precio objetivo S/ 2,500-3,000. Carpeta nativa: D:\qori-golden."
            chips={[['Nombre: Qori Golden ✓', Colors.green], ['FB: página creada ✓', Colors.green], ['Camada: nace ~ago · entrega ~oct', BRASS], ['Pendiente: ficha real de la madre + precio', BRASS]]}
            links={[
              ['🌐 qori-golden.vercel.app', 'https://qori-golden.vercel.app'],
              ['📘 Página de Facebook', 'https://www.facebook.com/profile.php?id=61590843116336'],
              ['▶️ YouTube @qorigolden', 'https://www.youtube.com/channel/UCn4FpQVJshktm9FTGMTjF7g'],
              ['💬 WhatsApp lista de espera', 'https://wa.me/51934173914'],
            ]}
          />
          <BrandHorario brand="golden" />
        </View>
      )}

      {!MAIN_IDS.includes(company) && !['estudio', 'aurum', 'terrenos', 'golden'].includes(company) && (
        <PlaceholderBrandView id={company} onBack={() => setCompany('pulso')} />
      )}
    </>
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.surface }}
      contentContainerStyle={contentStyle as any}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ position: 'relative' }}>
        <CommandBackdrop />

        {/* ── TERMINAL MASTHEAD ── */}
        <TerminalHeader
          wordmark="PULSO HEALTH GROUP"
          mercado="● MERCADO ABIERTO"
          madurez={c.readinessGrupo}
          lineas={`${c.lineasActivas}/${c.lineasSalud}`}
        />

        {/* ── CINTA DE TELETIPO ── */}
        <View style={st.tapeWrap}>
          <KpiTapeStrip items={tape} />
        </View>

        <ObsMarcaLink company={company} />

        {/* ── WATCHLIST móvil: fila horizontal scrollable de tickers ── */}
        {!isDesktop ? (
          <View style={{ marginBottom: Spacing.lg }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 2, paddingHorizontal: 2 }}>
              <BrandWatchlist items={HOLDING_WATCHLIST} active={company} onSelect={setCompany} horizontal />
            </ScrollView>
            <Text style={st.selectorHint}>70% Pulso/LIVIANO · 10% PIRQA · 10% Terrenos · 10% Golden — click en el ticker abre la línea</Text>
          </View>
        ) : null}

        {/* ── LAYOUT: workspace + raíl de watchlist (desktop) / apilado (móvil) ── */}
        {isDesktop ? (
          <View style={st.deskGrid}>
            <View style={st.deskWorkspace}>{workspace}</View>
            <View style={st.deskAside}>
              <BrandWatchlist items={HOLDING_WATCHLIST} active={company} onSelect={setCompany} />
              <Text style={st.asideHint}>Pulso = índice · 70/10/10/10. Data curada (no feed CRM en vivo).</Text>
            </View>
          </View>
        ) : (
          workspace
        )}
      </View>
    </ScrollView>
  );
}

// ── Hero simple para líneas paralelas (Terrenos, Golden) ─────────
function SimpleBrandView({ id, titulo, estado, desc, chips, links }: {
  id: string; titulo: string; estado: string; desc: string; chips: [string, string][];
  links?: [string, string][];
}) {
  const c = (BRANDS as any)[id]?.bright || '#B7B8BD';
  return (
    <View style={{
      backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, borderWidth: 1,
      borderColor: Hairline.soft, borderLeftWidth: 3, borderLeftColor: c,
      padding: Spacing.xl, marginBottom: Spacing.lg, ...Elevation.sm,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
        <Text style={{ fontSize: 26 }}>{(BRANDS as any)[id]?.emoji}</Text>
        <Text style={{ fontSize: FontSize.titleLg, lineHeight: LineHeight.titleLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.3 }}>{titulo}</Text>
        <Chip label={estado} color={c} small />
        <Chip label="10% del tiempo" color={Colors.muted} small />
      </View>
      <Text style={{ fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.bodyMd }}>{desc}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
        {chips.map(([lbl, color], i) => <Chip key={i} label={lbl} color={color} small />)}
      </View>
      {links && links.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
          {links.map(([lbl, url]) => (
            <TouchableOpacity key={url} activeOpacity={0.8} onPress={() => Linking.openURL(url).catch(() => {})}
              style={[{ paddingVertical: 7, paddingHorizontal: 13, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: c + '55', backgroundColor: c + '14' }, Platform.OS === 'web' ? ({ cursor: 'pointer', transition: 'all .15s ease' } as any) : null]}>
              <Text style={{ fontSize: FontSize.labelSm, fontWeight: '700', color: c, letterSpacing: 0.2 }}>{lbl}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </View>
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

// ── Vista LIVIANO (ancla, 9 paneles) con hero visual ─────────────
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
              <Chip label="En desarrollo" color={BRASS} small />
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

      {/* Sub-nav de paneles (function keys del terminal) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: Spacing.lg, marginHorizontal: isDesktop ? 0 : -2 }}
        contentContainerStyle={{ gap: Spacing.sm, paddingVertical: 2, paddingHorizontal: 2 }}
      >
        {LIVIANO_PANELS.map(p => (
          <PillTab key={p.id} label={`${p.fkey} · ${p.label}`} icon={p.icon} active={panel === p.id} accent={salvia} onPress={() => setPanel(p.id)} />
        ))}
      </ScrollView>

      {/* Ventana de terminal del panel activo */}
      <PanelChrome fkey={active.fkey} title={active.label} accent={salvia}>
        {active.render()}
      </PanelChrome>
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
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 8 },
  eyebrowDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: AMBER },
  eyebrow: { fontSize: FontSize.labelSm, fontWeight: '800', color: AMBER, letterSpacing: 1.6 },
  title: { fontSize: FontSize.headlineLg, lineHeight: LineHeight.headlineLg, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.6 },
  subtitle: { fontSize: FontSize.labelLg, color: Colors.muted, marginTop: 6, lineHeight: LineHeight.bodyMd },
  selectorHint: { fontSize: FontSize.labelSm, color: Colors.smallLabel, fontStyle: 'italic', marginBottom: Spacing.xl, marginTop: 6, lineHeight: LineHeight.labelSm },

  // terminal shell
  tapeWrap: { marginTop: Spacing.md, marginBottom: Spacing.md },
  deskGrid: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.xl },
  deskWorkspace: { flex: 1, minWidth: 0 } as any,
  deskAside: Platform.OS === 'web'
    ? ({ width: 268, flexShrink: 0, position: 'sticky', top: 12, alignSelf: 'flex-start' } as any)
    : { width: 268, flexShrink: 0 } as any,
  asideHint: { fontSize: 9, color: Colors.smallLabel, marginTop: Spacing.sm, lineHeight: 14, letterSpacing: 0.2, paddingHorizontal: 4 },

  breadcrumb: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Spacing.md, alignSelf: 'flex-start', paddingVertical: 4, paddingRight: 8 },
  breadcrumbText: { fontSize: FontSize.labelLg, color: BRANDS.pulso.bright, fontWeight: '700', letterSpacing: 0.2 },
  breadcrumbSep: { fontSize: FontSize.labelLg, color: Colors.muted },

  livianoTitle: { fontSize: FontSize.headlineSm, lineHeight: LineHeight.headlineSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.4 },
  livianoDesc: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, marginTop: Spacing.md, lineHeight: LineHeight.bodyMd, maxWidth: 560 },
  livianoLoc: { fontSize: FontSize.labelMd, color: Colors.muted, marginTop: 8 },
  brandCat: { fontSize: FontSize.labelLg, fontWeight: '700', marginTop: 3, letterSpacing: 0.2 },

  placeBody: {
    backgroundColor: DesktopColors.glass,
    borderRadius: BorderRadius.xl,
    borderWidth: 1, borderColor: Hairline.soft,
    padding: Spacing.xl,
    ...Elevation.sm,
  },
  placeBodyTitle: { fontSize: FontSize.bodyLg, lineHeight: LineHeight.bodyLg, fontWeight: '700', color: Colors.onSurface, marginBottom: Spacing.sm },
  placeBodyText: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, lineHeight: LineHeight.bodyMd },
  progTrack: { height: 6, borderRadius: BorderRadius.full, backgroundColor: 'rgba(255,255,255,0.06)', marginTop: Spacing.lg, overflow: 'hidden' },
  progFill: { height: 6, borderRadius: BorderRadius.full },
});
