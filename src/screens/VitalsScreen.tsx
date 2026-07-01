import React from 'react';
import { View, Text, TouchableOpacity, Linking, Platform, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing, BorderRadius, Elevation, Hairline, Motion, LineHeight } from '../theme/tokens';
import { VITALS_URL } from '../config';
import { obsUrl } from '../lib/obsidianMap';
import { OBS_VITALS } from '../lib/obsidianVaultMap';

const OBS_VIOLET = '#A78BFA';

/**
 * VITALS — fitness + nutrition app, embedded as a cross-origin iframe.
 *
 * On web (the production target) we render a real <iframe> via React.createElement so it
 * loads VITALS from its own origin — preserving camera capture, the Gemini coach, the
 * adherence ring, the "Your value"/Hormozi page and Supabase, exactly as the standalone
 * app. The `allow` list grants camera + mic for photo/voice capture inside the frame.
 *
 * On native (iOS/Android, no react-native-webview here) we degrade gracefully to a button
 * that opens VITALS in the system browser.
 */
export default function VitalsScreen() {
  // Loading state only gates the visual overlay chrome — never the iframe itself.
  const [loaded, setLoaded] = React.useState(false);

  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1, position: 'relative', backgroundColor: Colors.surface } as any}>
        {React.createElement('iframe', {
          src: VITALS_URL,
          title: 'VITALS',
          allow:
            'camera; microphone; clipboard-read; clipboard-write; fullscreen; autoplay; encrypted-media; accelerometer; gyroscope',
          allowFullScreen: true,
          onLoad: () => setLoaded(true),
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            background: Colors.surface,
          },
        })}

        {/* ── Marco/encabezado élite flotante (solo chrome; no toca el iframe) ── */}
        <View pointerEvents="none" style={styles.brandBar as any}>
          <View style={styles.brandDot} />
          <Text style={styles.brandTitle}>VITALS</Text>
          <Text style={styles.brandDivider}>·</Text>
          <Text style={styles.brandTagline}>Body · Nutrition · Coach</Text>
        </View>

        {/* ── Overlay de carga sutil: se desvanece cuando el iframe emite onLoad ── */}
        {!loaded && (
          <View pointerEvents="none" style={styles.loadingOverlay as any}>
            <View style={styles.loadingCard}>
              <View style={styles.loadingPulse} />
              <Text style={styles.loadingTitle}>VITALS</Text>
              <Text style={styles.loadingSub}>Cargando tu panel de salud…</Text>
            </View>
          </View>
        )}

        {/* ◆ nota VITALS en el vault (split, pisos de seguridad, retención) */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Linking.openURL(obsUrl(OBS_VITALS.mapa)).catch(() => {})}
          style={styles.obsChip as any}
        >
          <Text style={styles.obsChipText}>◆ Obsidian</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Native fallback — open VITALS in the browser (camera/mic need a real browser context).
  return (
    <View style={styles.fallback}>
      <View style={styles.fallbackCard}>
        <Text style={styles.emoji}>🫀</Text>
        <Text style={styles.title}>VITALS</Text>
        <Text style={styles.body}>Body composition, AI nutrition & coach.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL(VITALS_URL)} activeOpacity={0.85}>
          <Text style={styles.btnText}>Open VITALS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ── Web chrome ──
  brandBar: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    zIndex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs + 2,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(8,19,37,0.72)',
    borderWidth: 1,
    borderColor: Hairline.medium,
    ...(Platform.OS === 'web'
      ? ({ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' } as any)
      : {}),
    ...Elevation.md,
  },
  brandDot: {
    width: 7,
    height: 7,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.green,
    ...(Platform.OS === 'web' ? { boxShadow: `0 0 10px ${Colors.green}` } as any : Elevation.glow(Colors.green)),
  },
  brandTitle: {
    fontSize: FontSize.labelMd,
    fontWeight: '800',
    color: Colors.onSurface,
    letterSpacing: 1.6,
  },
  brandDivider: { fontSize: FontSize.labelMd, color: Colors.smallLabel, marginHorizontal: -2 },
  brandTagline: {
    fontSize: FontSize.labelSm,
    fontWeight: '600',
    color: Colors.sectionHeader,
    letterSpacing: 0.4,
  },

  loadingOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    ...(Platform.OS === 'web' ? { transition: `opacity ${Motion.base}` } as any : {}),
  },
  loadingCard: {
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing['3xl'],
    paddingHorizontal: Spacing['4xl'],
  },
  loadingPulse: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(16,185,129,0.14)',
    borderWidth: 2,
    borderColor: Colors.green,
    ...(Platform.OS === 'web' ? { boxShadow: `0 0 24px ${Colors.green}55` } as any : Elevation.glow(Colors.green)),
  },
  loadingTitle: {
    fontSize: FontSize.titleMd,
    fontWeight: '800',
    color: Colors.onSurface,
    letterSpacing: 2,
    marginTop: Spacing.xs,
  },
  loadingSub: {
    fontSize: FontSize.bodyMd,
    color: Colors.smallLabel,
    letterSpacing: 0.2,
  },

  obsChip: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    zIndex: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: OBS_VIOLET + '55',
    backgroundColor: 'rgba(11,22,40,0.92)',
    ...(Platform.OS === 'web'
      ? ({ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', cursor: 'pointer', transition: Motion.base } as any)
      : {}),
    ...Elevation.md,
  },
  obsChipText: { fontSize: FontSize.labelSm, fontWeight: '700', color: OBS_VIOLET, letterSpacing: 0.4 },

  // ── Native fallback ──
  fallback: {
    flex: 1,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['3xl'],
  },
  fallbackCard: {
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing['4xl'],
    paddingHorizontal: Spacing['3xl'],
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: Hairline.soft,
    ...Elevation.md,
  },
  emoji: { fontSize: 48, marginBottom: Spacing.xs },
  title: {
    fontSize: FontSize.headlineSm,
    lineHeight: LineHeight.headlineSm,
    fontWeight: '800',
    color: Colors.onSurface,
    letterSpacing: 1,
  },
  body: {
    fontSize: FontSize.bodyMd,
    lineHeight: LineHeight.bodyMd,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
  },
  btn: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.green,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing['3xl'],
    ...Elevation.glow(Colors.green),
  },
  btnText: { color: '#0B1628', fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: 1 },
});
