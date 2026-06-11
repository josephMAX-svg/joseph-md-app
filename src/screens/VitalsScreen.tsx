import React from 'react';
import { View, Text, TouchableOpacity, Linking, Platform, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing, BorderRadius } from '../theme/tokens';
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
  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1, position: 'relative', backgroundColor: Colors.surface } as any}>
        {React.createElement('iframe', {
          src: VITALS_URL,
          title: 'VITALS',
          allow:
            'camera; microphone; clipboard-read; clipboard-write; fullscreen; autoplay; encrypted-media; accelerometer; gyroscope',
          allowFullScreen: true,
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
        {/* ◆ nota VITALS en el vault (split, pisos de seguridad, retención) */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Linking.openURL(obsUrl(OBS_VITALS.mapa)).catch(() => {})}
          style={{
            position: 'absolute', right: 14, bottom: 14, zIndex: 5,
            paddingVertical: 6, paddingHorizontal: 12, borderRadius: BorderRadius.full,
            borderWidth: 1, borderColor: OBS_VIOLET + '66', backgroundColor: '#0B1628EE',
          } as any}
        >
          <Text style={{ fontSize: FontSize.labelSm, fontWeight: '700', color: OBS_VIOLET, letterSpacing: 0.4 }}>◆ Obsidian</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Native fallback — open VITALS in the browser (camera/mic need a real browser context).
  return (
    <View style={styles.fallback}>
      <Text style={styles.emoji}>🫀</Text>
      <Text style={styles.title}>VITALS</Text>
      <Text style={styles.body}>Body composition, AI nutrition & coach.</Text>
      <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL(VITALS_URL)} activeOpacity={0.8}>
        <Text style={styles.btnText}>Open VITALS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['3xl'],
    gap: Spacing.md,
  },
  emoji: { fontSize: 48, marginBottom: Spacing.sm },
  title: { fontSize: FontSize.headlineSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: 0.5 },
  body: { fontSize: FontSize.bodyMd, color: Colors.onSurfaceVariant, textAlign: 'center' },
  btn: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.green,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing['3xl'],
  },
  btnText: { color: '#0B1628', fontSize: FontSize.labelLg, fontWeight: '800', letterSpacing: 1 },
});
