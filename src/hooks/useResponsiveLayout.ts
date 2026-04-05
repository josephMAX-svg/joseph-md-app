import { useWindowDimensions } from 'react-native';

export type LayoutMode = 'mobile' | 'tablet' | 'desktop';

/**
 * Responsive layout hook for Joseph MD.
 * - mobile:  width < 768
 * - tablet:  768 ≤ width ≤ 1024
 * - desktop: width > 1024
 *
 * Also exposes `showRightPanel` for extra-wide screens (>1200px).
 */
export function useResponsiveLayout() {
  const { width, height } = useWindowDimensions();

  let layout: LayoutMode = 'mobile';
  if (width > 1024) {
    layout = 'desktop';
  } else if (width >= 768) {
    layout = 'tablet';
  }

  return {
    layout,
    width,
    height,
    isDesktop: layout === 'desktop',
    isTablet: layout === 'tablet',
    isMobile: layout === 'mobile',
    showRightPanel: width > 1200,
    // Inline right panel at 1400px+, else right content renders below main
    showInlineRightPanel: width > 1400,
  };
}
