import React, { useState } from 'react';
import { View } from 'react-native';
import { desktopStyles } from '../theme/desktopStyles';
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
import type { ScreenName } from './DesktopSidebar';

// Derma screen stays the same — just re-render it in the center
import DermaScreen from '../screens/DermaScreen';

/**
 * DesktopLayout — 3-column layout for screens wider than 1024px.
 * [Left Sidebar 240px] [Center Content flex] [Right Panel 320px (>1200px)]
 */
export default function DesktopLayout() {
  const [activeScreen, setActiveScreen] = useState<ScreenName>('Home');
  const [apexModalVisible, setApexModalVisible] = useState(false);
  const [apexModalTipo, setApexModalTipo] = useState<'manual' | 'dictar_error'>('manual');
  const { showRightPanel } = useResponsiveLayout();

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
        onDictarPress={() => {
          setApexModalTipo('dictar_error');
          setApexModalVisible(true);
        }}
      />

      {/* Center Content */}
      <View style={desktopStyles.centerContent}>
        {renderCenterContent()}
      </View>

      {/* Right Panel (only on extra-wide screens >1200px) */}
      {showRightPanel && (
        <DesktopRightPanel activeScreen={activeScreen} />
      )}

      {/* APEX Submit Modal */}
      <ApexSubmitModal
        visible={apexModalVisible}
        onClose={() => {
          setApexModalVisible(false);
          refetchQueue();
        }}
        initialTipo={apexModalTipo}
      />
    </View>
  );
}
