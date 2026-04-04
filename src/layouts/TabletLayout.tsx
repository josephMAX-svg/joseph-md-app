import React from 'react';
import AppNavigator from '../navigation/AppNavigator';

/**
 * TabletLayout — For screens 768–1024px.
 * Keeps the bottom tab navigation from mobile but renders content
 * with wider padding and responsive grid adjustments.
 *
 * The actual tablet-specific grid adjustments (2-column metrics, etc.)
 * are handled within each screen via useResponsiveLayout().
 * This wrapper is a pass-through that preserves the bottom-tab navigation.
 */
export default function TabletLayout() {
  // Tablet keeps the same bottom-tab navigation as mobile,
  // but individual screens can detect tablet mode via useResponsiveLayout()
  // to use wider grids (4-column metrics, 2-column specialty bars, etc.)
  return <AppNavigator />;
}
