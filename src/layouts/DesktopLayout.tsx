import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import { Hairline } from '../theme/tokens';
import { VITALS_URL } from '../config';
import { desktopStyles, DesktopColors } from '../theme/desktopStyles';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import { useSupabaseQuery } from '../hooks/useSupabaseQuery';
import {
  getApexQueueCount,
  getStreak,
  getLatestCZI,
  getTodayDeepWorkHours,
} from '../lib/supabase';
import DesktopSidebar from './DesktopSidebar';
import DesktopRightPanel from './DesktopRightPanel';
import DesktopHomeContent from './desktop/DesktopHomeContent';
import DesktopEstudioContent from './desktop/DesktopEstudioContent';
import DesktopInvestigacionContent from './desktop/DesktopInvestigacionContent';
import DesktopEmpresaHubContent from './desktop/DesktopEmpresaHubContent';
import ApexSubmitModal from '../components/ApexSubmitModal';
import AgentChatModal from '../components/AgentChatModal';
import DictarErrorModal from '../components/DictarErrorModal';
import type { ScreenName } from './DesktopSidebar';

// Derma screen stays the same — just re-render it in the center
import DermaScreen from '../screens/DermaScreen';
// VITALS — fitness/nutrition app embedded as a full-bleed iframe
import VitalsScreen from '../screens/VitalsScreen';
// SYNAPSE — formación élite en IA (ruta Anthropic-level)
import SynapseScreen from '../screens/SynapseScreen';

// Inject custom scrollbar + smooth scroll styles for web once
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const styleId = 'desktop-scrollbar-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* Global dark-theme scrollbar (all scrollable containers) */
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb {
        background: rgba(231,234,242,0.10);
        border-radius: 999px;
        border: 2px solid transparent;
        background-clip: padding-box;
        transition: background-color 200ms ease;
      }
      ::-webkit-scrollbar-thumb:hover { background: rgba(200,169,106,0.42); background-clip: padding-box; }
      ::-webkit-scrollbar-corner { background: transparent; }
      * { scrollbar-width: thin; scrollbar-color: rgba(231,234,242,0.10) transparent; }
      html, body { scroll-behavior: smooth; }
      .desktop-scroll { scroll-behavior: smooth; }
    `;
    document.head.appendChild(style);
  }

  // Preconnect al origen de VITALS (iframe cross-origin en otro deploy Vercel):
  // adelanta DNS + TLS + TCP para que su carga sea mucho más rápida al abrir la pestaña.
  const preId = 'vitals-preconnect';
  if (!document.getElementById(preId)) {
    (['preconnect', 'dns-prefetch'] as const).forEach((rel) => {
      const l = document.createElement('link');
      l.rel = rel;
      l.href = VITALS_URL;
      (l as any).crossOrigin = 'anonymous';
      document.head.appendChild(l);
    });
    const marker = document.createElement('meta');
    marker.id = preId;
    document.head.appendChild(marker);
  }
}

const webScrollClass: any = Platform.OS === 'web' ? { className: 'desktop-scroll' } : {};

/**
 * DesktopLayout — Adaptive layout (Platzi / Shadcn Admin inspired).
 * - [Sidebar 240px fixed] [Content area flex:1]
 * - Right panel renders INSIDE the content area:
 *     width > 1400px → sticky sidebar on the right (inline)
 *     1200-1400px    → right panel still fixed to right, non-sticky
 *     < 1200px       → no right panel
 * - Content max-width 1200px, centered, 32px padding.
 * - No visible borders between columns; uses background layers.
 */
export default function DesktopLayout() {
  const [activeScreen, setActiveScreen] = useState<ScreenName>('Home');
  const [apexModalVisible, setApexModalVisible] = useState(false);
  const [apexModalTipo, setApexModalTipo] = useState<'manual' | 'dictar_error'>('manual');
  const [chatVisible, setChatVisible] = useState(false);
  const [dictarVisible, setDictarVisible] = useState(false);
  const { showRightPanel, showInlineRightPanel } = useResponsiveLayout();
  // Precalienta VITALS (iframe pesado en otro origen) en segundo plano cuando el
  // navegador está ocioso, y lo mantiene montado/oculto → abrir la pestaña es instantáneo.
  const [warmVitals, setWarmVitals] = useState(false);
  React.useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const w: any = window;
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(() => setWarmVitals(true), { timeout: 4000 })
      : w.setTimeout(() => setWarmVitals(true), 2500);
    return () => {
      if (w.requestIdleCallback && w.cancelIdleCallback) w.cancelIdleCallback(id);
      else w.clearTimeout(id);
    };
  }, []);

  // Sidebar data
  const { data: queueCount, refetch: refetchQueue } = useSupabaseQuery(getApexQueueCount, 0);
  const { data: streak } = useSupabaseQuery(getStreak, 0);
  const { data: cziValue } = useSupabaseQuery(getLatestCZI, null);
  const { data: deepWorkHours } = useSupabaseQuery(getTodayDeepWorkHours, 0);

  const renderCenterContent = () => {
    switch (activeScreen) {
      case 'Home':
        return <DesktopHomeContent onNavigate={setActiveScreen} />;
      case 'Estudio':
        return <DesktopEstudioContent />;
      case 'Derma':
        return <DermaScreen />;
      case 'Empresa':
        return <DesktopEmpresaHubContent />;
      case 'Investigación':
        return <DesktopInvestigacionContent />;
      case 'Vitals':
        return null; // VITALS se monta de forma persistente (capa cálida) más abajo
      case 'Synapse':
        return <SynapseScreen variant="desktop" />;
      default:
        return <DesktopHomeContent />;
    }
  };

  // Full-bleed segments own their entire content area (no shared right panel),
  // each with its own app-shell — VITALS (iframe) and Derma (clinical atlas).
  const FULLBLEED_SCREENS = new Set<ScreenName>(['Vitals', 'Derma']);
  const isFullBleed = FULLBLEED_SCREENS.has(activeScreen);
  const isVitals = activeScreen === 'Vitals'; // capa VITALS persistente (iframe caliente)

  return (
    <View style={desktopStyles.rootContainer}>
      {/* Left Sidebar */}
      <DesktopSidebar
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        queueCount={queueCount}
        streak={streak}
        cziValue={cziValue}
        deepWorkHours={deepWorkHours}
        onApexPress={() => {
          setApexModalTipo('manual');
          setApexModalVisible(true);
        }}
        onDictarPress={() => setDictarVisible(true)}
        onChatPress={() => setChatVisible(true)}
      />

      {/* Content Area: main + (optional) right panel side by side */}
      <View style={desktopStyles.contentGridWrapper}>
        <View style={desktopStyles.contentGridMain}>
          {renderCenterContent()}
          {/* VITALS persistente: se monta al estar ocioso y queda oculto hasta abrir la
              pestaña (iframe caliente = apertura instantánea, sin recargar). */}
          {(warmVitals || isVitals) && (
            <View
              style={[
                { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as any,
                { display: isVitals ? 'flex' : 'none' } as any,
              ]}
              pointerEvents={isVitals ? 'auto' : 'none'}
            >
              <VitalsScreen />
            </View>
          )}
        </View>
        {showRightPanel && !isFullBleed && (
          <View
            style={[
              desktopStyles.contentGridAside,
              // Hairline sutil que define la columna del panel derecho (no borde duro)
              Platform.OS === 'web' ? ({ borderLeftWidth: 1, borderLeftColor: Hairline.soft } as any) : {},
              !showInlineRightPanel ? { position: 'relative' as any } : {},
            ]}
            {...webScrollClass}
          >
            <DesktopRightPanel activeScreen={activeScreen} />
          </View>
        )}
      </View>

      {/* APEX Submit Modal */}
      <ApexSubmitModal
        visible={apexModalVisible}
        onClose={() => {
          setApexModalVisible(false);
          refetchQueue();
        }}
        initialTipo={apexModalTipo}
      />

      {/* Agent Chat Modal */}
      <AgentChatModal
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
        initialAgent="method"
      />

      {/* Dictar Error Modal */}
      <DictarErrorModal
        visible={dictarVisible}
        onClose={() => { setDictarVisible(false); refetchQueue(); }}
      />
    </View>
  );
}
