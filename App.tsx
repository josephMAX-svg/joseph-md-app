import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useResponsiveLayout } from './src/hooks/useResponsiveLayout';
import AppNavigator from './src/navigation/AppNavigator';
import DesktopLayout from './src/layouts/DesktopLayout';
import TabletLayout from './src/layouts/TabletLayout';

/**
 * Joseph MD — Responsive Layout Router
 *
 * - width > 1024:  DesktopLayout (3-column: sidebar + center + right panel)
 * - width 768–1024: TabletLayout (2-column content, bottom tabs)
 * - width < 768:   MobileLayout (current mobile layout, ZERO changes)
 */
export default function App() {
  const { layout } = useResponsiveLayout();

  const renderLayout = () => {
    switch (layout) {
      case 'desktop':
        return <DesktopLayout />;
      case 'tablet':
        return <TabletLayout />;
      case 'mobile':
      default:
        return <AppNavigator />;
    }
  };

  return (
    <>
      <StatusBar style="light" />
      {renderLayout()}
    </>
  );
}
