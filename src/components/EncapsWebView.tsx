// EncapsWebView — Opción A (rápida) del PROMPT_ULTRAMAESTRO_APP.
// Web: embebe el dashboard ENCAPS en un <iframe> (react-native-web → ReactDOM).
// Nativo: no hay react-native-webview instalado → botón que abre el dashboard
//         en el navegador vía Linking (fallback claro, sin dependencias nuevas).
import React from 'react';
import { View, Text, TouchableOpacity, Linking, Platform, Dimensions } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme/tokens';

export const ENCAPS_DASHBOARD_URL = 'https://encaps-v9-joseph.vercel.app';

export default function EncapsWebView({
  url = ENCAPS_DASHBOARD_URL,
  title = '📊 Dashboard ENCAPS v9',
  subtitle = 'Vista rica (HOY · Camino a 17/20 · Simulacros · Calendario), re-deploy diario 04:00.',
  height,
}: { url?: string; title?: string; subtitle?: string; height?: number }) {
  if (Platform.OS === 'web') {
    const h = height ?? Math.max(560, Math.round(Dimensions.get('window').height - 240));
    // En web, react-native-web usa ReactDOM: createElement('iframe', …) → iframe real.
    return (
      <View
        style={{
          borderRadius: BorderRadius.lg,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: Colors.surfaceContainerHighest,
          backgroundColor: '#fff',
        }}
      >
        {React.createElement('iframe', {
          src: url,
          title: 'ENCAPS Dashboard',
          style: { width: '100%', height: h, border: '0', display: 'block' },
          loading: 'lazy',
          referrerPolicy: 'no-referrer',
        })}
      </View>
    );
  }

  // Nativo (iOS/Android)
  return (
    <View
      style={{
        backgroundColor: Colors.surfaceContainerLow,
        borderRadius: BorderRadius.lg,
        padding: Spacing.xl,
        alignItems: 'center',
        borderLeftWidth: 3,
        borderLeftColor: Colors.coral,
      }}
    >
      <Text style={{ fontSize: FontSize.titleMd, fontWeight: '700', color: Colors.onSurface, marginBottom: 4 }}>
        {title}
      </Text>
      <Text style={{ fontSize: FontSize.labelSm, color: Colors.muted, textAlign: 'center', marginBottom: Spacing.lg }}>
        {subtitle}
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openURL(url)}
        style={{
          backgroundColor: Colors.coral,
          paddingVertical: Spacing.md,
          paddingHorizontal: Spacing.xl,
          borderRadius: BorderRadius.md,
        }}
      >
        <Text style={{ fontSize: FontSize.labelMd, fontWeight: '800', color: '#0B1628' }}>
          Abrir ↗
        </Text>
      </TouchableOpacity>
    </View>
  );
}
