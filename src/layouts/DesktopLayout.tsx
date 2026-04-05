import React, { useState } from 'react';
import { View, Platform } from 'react-native';
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
import DesktopEmpresaContent from './desktop/DesktopEmpresaContent';
import ApexSubmitModal from '../components/ApexSubmitModal';
import AgentChatModal from '../components/AgentChatModal';
import DictarErrorModal from '../components/DictarErrorModal';
import type { ScreenName } from './DesktopSidebar';

// Derma screen stays the same — just re-render it in the center
import DermaScreen from '../screens/DermaScreen';

// Inject custom scrollbar + smooth scroll styles for web once
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const styleId = 'desktop-scrollbar-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* Global dark-theme scrollbar (all scrollable containers) */
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      ::-webkit-scrollbar-corner { background: transparent; }
      * { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }
      html, body { scroll-behavior: smooth; }
      .desktop-scroll { scroll-behavior: smooth; }
    `;
    document.head.appendChild(style);
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

  // Sidebar data
  const { data: queueCount, refetch: refetchQueue } = useSupabaseQuery(getApexQueueCount, 0);
  const { data: streak } = useSupabaseQuery(getStreak, 0);
  const { data: cziValue } = useSupabaseQuery(getLatestCZI, null);
  const { data: deepWorkHours } = useSupabaseQuery(getTodayDeepWorkHours, 0);

  const renderCenterContent = () => {
    switch (activeScreen) {
      case 'Home':
        return <DesktopHomeContent />;
      case 'Estudio':
        return <DesktopEstudioContent />;
      case 'Derma':
        return <DermaScreen />;
      case 'Empresa':
        return <DesktopEmpresaContent />;
      case 'Investigación':
        return <DesktopInvestigacionContent />;
      default:
        return <DesktopHomeContent />;
    }
  };

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
        </View>
        {showRightPanel && (
          <View
            style={[
              desktopStyles.contentGridAside,
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
