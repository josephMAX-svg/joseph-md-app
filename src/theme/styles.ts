import { StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from './tokens';

/**
 * Shared styles following Clinical Precision design system.
 * "No-Line Philosophy" — no 1px borders for sectioning.
 * Elevation via tonal layering, not drop shadows.
 */
export const SharedStyles = StyleSheet.create({
  // Containers
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100,
  },

  // Cards (No-Line: tonal separation only)
  card: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.section,
  },
  cardElevated: {
    backgroundColor: Colors.surfaceContainer,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.section,
  },
  cardHighest: {
    backgroundColor: Colors.surfaceContainerHighest,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.section,
  },

  // Typography
  displaySm: {
    fontSize: FontSize.displaySm,
    fontWeight: '800',
    color: Colors.onSurface,
    letterSpacing: -0.5,
  },
  headlineLg: {
    fontSize: FontSize.headlineLg,
    fontWeight: '700',
    color: Colors.onSurface,
    letterSpacing: -0.3,
  },
  headlineSm: {
    fontSize: FontSize.headlineSm,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  titleLg: {
    fontSize: FontSize.titleLg,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  titleMd: {
    fontSize: FontSize.titleMd,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  bodyLg: {
    fontSize: FontSize.bodyLg,
    color: Colors.onSurface,
  },
  bodyMd: {
    fontSize: FontSize.bodyMd,
    color: Colors.onSurface,
    lineHeight: 20,
  },
  labelLg: {
    fontSize: FontSize.labelLg,
    fontWeight: '500',
    color: Colors.onSurfaceVariant,
  },
  labelMd: {
    fontSize: FontSize.labelMd,
    fontWeight: '500',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  labelSm: {
    fontSize: FontSize.labelSm,
    fontWeight: '500',
    color: Colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Buttons
  buttonPrimary: {
    backgroundColor: Colors.blue,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: FontSize.labelLg,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonSecondary: {
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1,
    borderColor: 'rgba(143, 144, 151, 0.3)',
  },
  buttonSecondaryText: {
    color: Colors.onSurface,
    fontSize: FontSize.labelLg,
    fontWeight: '600',
  },

  // Progress Bar
  progressTrack: {
    height: 4,
    backgroundColor: Colors.surfaceContainerHighest,
    borderRadius: 2,
    overflow: 'hidden' as const,
  },
  progressValue: {
    height: 4,
    borderRadius: 2,
  },

  // Badge / Chip
  chip: {
    backgroundColor: Colors.surfaceContainerHighest,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  chipText: {
    fontSize: FontSize.labelSm,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
  },

  // Row layouts
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  rowSpaceBetween: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },

  // Grid
  grid2x2: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    marginHorizontal: -Spacing.xs,
  },
  gridItem2x2: {
    width: '50%' as any,
    paddingHorizontal: Spacing.xs,
    marginBottom: Spacing.sm,
  },
});
