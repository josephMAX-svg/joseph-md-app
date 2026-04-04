import { StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from './tokens';

/**
 * Desktop-specific styles for the 3-column layout.
 * Sidebar: #0F1D32 | Center: #081325 | Right Panel: #0F1D32
 */

export const DesktopColors = {
  sidebar: '#0F1D32',
  rightPanel: '#0F1D32',
  sidebarHover: '#162640',
  activeBorder: Colors.teal,
  navItemActive: '#152A42',
} as const;

export const desktopStyles = StyleSheet.create({
  // ─── Root 3-Column Layout ───
  rootContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.surface,
  },

  // ─── Left Sidebar ───
  sidebar: {
    width: 240,
    backgroundColor: DesktopColors.sidebar,
    paddingTop: 32,
    paddingBottom: 20,
    paddingHorizontal: 0,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.04)',
  },
  sidebarLogo: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
    marginBottom: 8,
  },
  sidebarLogoText: {
    fontSize: FontSize.titleLg,
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

  // Nav Items
  navSection: {
    flex: 1,
    paddingTop: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 1,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  navItemActive: {
    backgroundColor: DesktopColors.navItemActive,
    borderLeftColor: DesktopColors.activeBorder,
  },
  navItemIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  navItemLabel: {
    fontSize: FontSize.bodyMd,
    fontWeight: '500',
    color: Colors.muted,
  },
  navItemLabelActive: {
    color: Colors.onSurface,
    fontWeight: '600',
  },

  // Sidebar Quick Stats
  sidebarStats: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.04)',
  },
  sidebarStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  sidebarStatLabel: {
    fontSize: FontSize.labelSm,
    color: Colors.muted,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  sidebarStatValue: {
    fontSize: FontSize.bodyMd,
    fontWeight: '700',
  },

  // Sidebar Action Buttons
  sidebarActions: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8,
  },
  sidebarActionBtn: {
    borderRadius: BorderRadius.md,
    paddingVertical: 10,
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
    backgroundColor: Colors.surface,
  },
  centerScrollContent: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 60,
  },

  // ─── Right Panel ───
  rightPanel: {
    width: 320,
    backgroundColor: DesktopColors.rightPanel,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.04)',
    paddingTop: 32,
    paddingHorizontal: 20,
  },
  rightPanelTitle: {
    fontSize: FontSize.labelMd,
    fontWeight: '600',
    color: Colors.muted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
  },
  rightPanelCard: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  rightPanelCardTitle: {
    fontSize: FontSize.bodyMd,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: Spacing.sm,
  },

  // ─── Desktop Grid Variants ───
  metricsGrid4: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: Spacing.section,
  },
  metricGridItem4: {
    width: '25%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },

  // Specialty Grid (3-4 columns)
  specialtyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  specialtyCell: {
    width: '33.33%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  specialtyCellInner: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
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

  // Kanban
  kanbanContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  kanbanColumn: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    minHeight: 300,
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
    backgroundColor: Colors.surfaceContainer,
    borderRadius: BorderRadius.md,
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

  // Topic Grid (Derma)
  topicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  topicGridItem: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },

  // Chart containers
  chartContainer: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
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
