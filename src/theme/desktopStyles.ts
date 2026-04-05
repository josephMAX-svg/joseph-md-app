import { StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from './tokens';

/**
 * Desktop-specific styles for the 3-column layout.
 * Premium Design v2.0 — Glassmorphism + Platzi-inspired sidebar
 * Sidebar: #0F1D32 | Center: #081325 | Right Panel: #0F1D32
 */

export const DesktopColors = {
  sidebar: '#0A1628',
  contentBase: '#0B1628',
  rightPanel: '#0B1628',
  sidebarHover: '#162640',
  activeBorder: Colors.teal,
  navItemActive: 'rgba(14,212,160,0.1)',
  glass: 'rgba(15,25,45,0.6)',
  glassBorder: 'rgba(255,255,255,0.08)',
  glassBorderHover: 'rgba(255,255,255,0.15)',
} as const;

export const desktopStyles = StyleSheet.create({
  // ─── Root 2-Column Layout (sidebar + content area) ───
  rootContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: DesktopColors.contentBase,
  },

  // ─── Left Sidebar ───
  sidebar: {
    width: 240,
    backgroundColor: DesktopColors.sidebar,
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 0,
  },
  sidebarLogo: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    marginBottom: 8,
  },
  sidebarLogoText: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.onSurface,
    letterSpacing: -0.3,
  },
  sidebarLogoSub: {
    fontSize: FontSize.labelSm,
    color: Colors.muted,
    marginTop: 2,
    lineHeight: 16,
  },

  // Sidebar Section spacer (no visible line — just margin)
  sidebarDivider: {
    height: 24,
  },

  sidebarSectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.smallLabel,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 6,
  },

  // Nav Items — Platzi-inspired
  navSection: {
    paddingTop: 4,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingLeft: 16,
    marginHorizontal: 8,
    marginVertical: 1,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: 'rgba(14,212,160,0.1)',
    borderLeftColor: '#0FD4A0',
  },
  navItemIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 28,
    textAlign: 'center',
  },
  navItemTextContainer: {
    flex: 1,
  },
  navItemLabel: {
    fontSize: FontSize.bodyMd,
    fontWeight: '500',
    color: Colors.muted,
  },
  navItemLabelActive: {
    color: Colors.onSurface,
    fontWeight: '700',
  },
  navItemSublabel: {
    fontSize: 10,
    color: Colors.smallLabel,
    marginTop: 1,
    letterSpacing: 0.2,
  },
  navItemSublabelActive: {
    color: Colors.muted,
  },

  // Sidebar Quick Stats
  sidebarStats: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  sidebarStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
  },
  sidebarStatLabel: {
    fontSize: FontSize.labelSm,
    color: Colors.smallLabel,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  sidebarStatValue: {
    fontSize: FontSize.bodyMd,
    fontWeight: '700',
  },

  // Sidebar Action Buttons
  sidebarActions: {
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 6,
  },
  sidebarActionBtn: {
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  sidebarActionBtnText: {
    fontSize: FontSize.labelSm,
    fontWeight: '700',
    color: '#0B1628',
    letterSpacing: 0.5,
  },

  // ─── Center Content ───
  centerContent: {
    flex: 1,
    backgroundColor: DesktopColors.contentBase,
    ...(Platform.OS === 'web' ? {
      scrollBehavior: 'smooth',
    } as any : {}),
  },
  centerScrollContent: {
    padding: 32,
    paddingBottom: 60,
    ...(Platform.OS === 'web' ? {
      maxWidth: 1200,
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    } as any : {}),
  },
  // Content grid wrapper (used when right panel is inline >1400px)
  contentGridWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: DesktopColors.contentBase,
  },
  contentGridMain: {
    flex: 1,
    minWidth: 0,
  },
  contentGridAside: {
    width: 320,
    ...(Platform.OS === 'web' ? {
      position: 'sticky',
      top: 24,
      maxHeight: 'calc(100vh - 48px)',
      overflowY: 'auto',
    } as any : {}),
  },

  // ─── Premium Typography Hierarchy ───
  pageTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.onSurface,
    letterSpacing: -0.64, // -0.02em
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.96, // 0.08em at 12px
    color: '#6B7C93',
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bodyText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.bodyText,
  },
  smallLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.smallLabel,
  },
  metricNumber: {
    fontSize: 36,
    fontWeight: '700',
  },

  // ─── Glassmorphism Cards ───
  glassCard: {
    backgroundColor: DesktopColors.glass,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DesktopColors.glassBorder,
    padding: 24,
    marginBottom: Spacing.section,
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    } as any : {}),
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  glassCardInteractive: {
    // Web-only styles applied inline
  },

  // ─── Right Panel ───
  rightPanel: {
    width: 320,
    backgroundColor: DesktopColors.rightPanel,
    paddingTop: 32,
    paddingHorizontal: 20,
  },
  // Right panel rendered BELOW content (1024-1400px): horizontal card row
  rightPanelBelow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    padding: 32,
    paddingTop: 0,
    backgroundColor: DesktopColors.contentBase,
  },
  rightPanelTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.sectionHeader,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: Colors.teal,
  },
  rightPanelTitleSeparated: {
    marginTop: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  rightPanelSectionDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: Spacing.md,
  },
  rightPanelTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  rightPanelTitleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  rightPanelCard: {
    backgroundColor: DesktopColors.glass,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DesktopColors.glassBorder,
    padding: 24,
    marginBottom: Spacing.md,
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    } as any : {}),
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  rightPanelCardTitle: {
    fontSize: FontSize.bodyMd,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: Spacing.sm,
  },

  // ─── Desktop Grid Variants ───
  // Auto-fit grid — cards reflow based on available space
  autoFitGrid: {
    ...(Platform.OS === 'web' ? {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 16,
    } as any : {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    }),
    marginBottom: Spacing.section,
  },
  // Metrics row: 4 cards in single row, wraps at narrow widths
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: Spacing.section,
  },
  metricsRowItem: {
    flex: 1,
    minWidth: 200,
  },
  // Milestones row
  milestonesRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: Spacing.section,
  },
  milestoneItem: {
    flex: 1,
  },
  // Legacy aliases
  metricsGrid4: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: Spacing.section,
  },
  metricGridItem4: {
    flex: 1,
    minWidth: 200,
  },

  // Specialty Grid — auto-fit
  specialtyGrid: {
    ...(Platform.OS === 'web' ? {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 16,
    } as any : {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    }),
  },
  specialtyCell: {
    ...(Platform.OS === 'web' ? {} as any : {
      flex: 1,
      minWidth: 280,
    }),
  },
  specialtyCellInner: {
    backgroundColor: DesktopColors.glass,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DesktopColors.glassBorder,
    borderLeftWidth: 4,
    borderLeftColor: '#0FD4A0',
    padding: 24,
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    } as any : {}),
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  specialtyCellName: {
    fontSize: FontSize.bodyMd,
    fontWeight: '600',
    color: Colors.onSurface,
    marginBottom: 4,
  },
  specialtyCellPercent: {
    fontSize: FontSize.labelSm,
    fontWeight: '700',
    marginBottom: 6,
  },

  // Kanban — auto-fit columns
  kanbanContainer: {
    ...(Platform.OS === 'web' ? {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 16,
    } as any : {
      flexDirection: 'row',
      gap: 16,
    }),
  },
  kanbanColumn: {
    flex: 1,
    backgroundColor: DesktopColors.glass,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DesktopColors.glassBorder,
    padding: 24,
    minHeight: 300,
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    } as any : {}),
  },
  kanbanColumnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  kanbanColumnBadge: {
    borderRadius: 999,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  kanbanColumnBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  kanbanColumnCount: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.muted,
    marginLeft: 6,
  },
  kanbanColumnTitle: {
    fontSize: FontSize.labelMd,
    fontWeight: '700',
    color: Colors.muted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  kanbanCard: {
    backgroundColor: 'rgba(21, 32, 50, 0.8)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  kanbanCardTitle: {
    fontSize: FontSize.bodyMd,
    fontWeight: '600',
    color: Colors.onSurface,
    marginBottom: 4,
    lineHeight: 18,
  },
  kanbanCardMeta: {
    fontSize: FontSize.labelSm,
    color: Colors.muted,
    marginBottom: 2,
  },
  kanbanCardBottleneck: {
    fontSize: FontSize.labelSm,
    color: Colors.coral,
    fontStyle: 'italic',
    marginTop: 4,
  },

  // Enterprise 2-Column
  enterprise2Col: {
    flexDirection: 'row',
    gap: 20,
  },
  enterpriseColLeft: {
    flex: 3,
  },
  enterpriseColRight: {
    flex: 2,
  },

  // Topic Grid (Derma) — auto-fit
  topicGrid: {
    ...(Platform.OS === 'web' ? {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 16,
    } as any : {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    }),
  },
  topicGridItem: {
    ...(Platform.OS === 'web' ? {} as any : {
      flex: 1,
      minWidth: 280,
    }),
  },

  // Chart containers
  chartContainer: {
    backgroundColor: DesktopColors.glass,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DesktopColors.glassBorder,
    padding: 24,
    marginBottom: Spacing.md,
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    } as any : {}),
  },
  chartTitle: {
    fontSize: FontSize.bodyMd,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: Spacing.md,
  },

  // Report feed in right panel
  reportFeedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  reportFeedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  reportFeedInfo: {
    flex: 1,
  },
  reportFeedAgent: {
    fontSize: FontSize.bodyMd,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  reportFeedTime: {
    fontSize: FontSize.labelSm,
    color: Colors.muted,
    marginTop: 1,
  },
  reportFeedPreview: {
    fontSize: FontSize.labelSm,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  reportFeedUnread: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.blue,
    marginLeft: 8,
  },
});

// Web-only styles (applied inline on Platform.OS === 'web')
export const webStyles = {
  glassCardHover: {
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  sidebarNavHover: {
    transition: 'background-color 0.15s ease',
    cursor: 'pointer',
  },
  cardHoverEffect: {
    borderColor: DesktopColors.glassBorderHover,
    transform: 'scale(1.01)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  },
  backdropBlur: {
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
};
