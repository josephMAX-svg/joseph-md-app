import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors, FontSize, BorderRadius, Motion } from '../../theme/tokens';
import { DermaAtlas, DERMA_SITIOS } from '../../lib/dermaData';

/**
 * DermaBodyMap — silueta anterior SVG interactiva (firma VisualDx/DermNet traída al shell).
 * Resalta la región del CASO del día y permite filtrar temas por sitio corporal.
 * Web = SVG con zonas clicables; native = lista de chips de región (degrada, no rompe).
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;

// Regiones del cuerpo → coordenadas aproximadas en el viewBox 0 0 120 300.
const REGIONS: { sitio: string; cx: number; cy: number; r: number }[] = [
  { sitio: 'Cuero cabelludo', cx: 60, cy: 22, r: 15 },
  { sitio: 'Cara', cx: 60, cy: 40, r: 11 },
  { sitio: 'Tronco', cx: 60, cy: 110, r: 26 },
  { sitio: 'Pliegues', cx: 40, cy: 92, r: 9 },
  { sitio: 'Manos', cx: 22, cy: 170, r: 10 },
  { sitio: 'Genital', cx: 60, cy: 158, r: 9 },
  { sitio: 'Pies', cx: 48, cy: 285, r: 10 },
];

function bodySvg(active: string | null): string {
  const outline = '#5A6478';
  const skin = 'rgba(154,123,200,0.05)';
  const dots = REGIONS.map((r) => {
    const on = r.sitio === active;
    const fill = on ? DermaAtlas.gold : DermaAtlas.amethyst;
    const op = on ? '0.9' : '0.28';
    const ring = on ? `<circle cx="${r.cx}" cy="${r.cy}" r="${r.r + 3}" fill="none" stroke="${DermaAtlas.gold}" stroke-width="1.2" stroke-opacity="0.7"/>` : '';
    return `${ring}<circle cx="${r.cx}" cy="${r.cy}" r="${r.r}" fill="${fill}" fill-opacity="${op}"/>`;
  }).join('');
  return `
    <svg width="100%" height="100%" viewBox="0 0 120 300" fill="none" stroke="${outline}" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">
      <ellipse cx="60" cy="30" rx="15" ry="18" fill="${skin}"/>
      <path d="M52 46 Q60 52 68 46 L74 60 Q82 64 82 90 L78 140 Q76 150 72 150 L70 96 L70 150 Q66 240 60 296 Q54 240 50 150 L50 96 L48 150 Q44 150 42 140 L38 90 Q38 64 46 60 Z" fill="${skin}"/>
      <path d="M46 62 Q28 90 20 168" /><path d="M74 62 Q92 90 100 168" />
      ${dots}
    </svg>`;
}

export default function DermaBodyMap({
  active, onPick,
}: { active: string | null; onPick: (sitio: string | null) => void }) {
  if (Platform.OS === 'web') {
    // SVG estático + capa de zonas clicables absolutas encima (RN-web-friendly).
    return (
      <View style={st.wrap}>
        <View style={st.svgBox} {...({ dangerouslySetInnerHTML: { __html: bodySvg(active) } } as any)} />
        <View style={StyleSheet.absoluteFill as any} pointerEvents="box-none">
          {REGIONS.map((r) => {
            const left = `${(r.cx / 120) * 100}%`;
            const top = `${(r.cy / 300) * 100}%`;
            const sz = (r.r / 120) * 100 * 2;
            return (
              <TouchableOpacity
                key={r.sitio}
                activeOpacity={0.7}
                onPress={() => onPick(r.sitio === active ? null : r.sitio)}
                style={[st.hit, { left, top, width: `${sz}%`, aspectRatio: 1, transform: [{ translateX: '-50%' as any }, { translateY: '-50%' as any }] } as any, WEB]}
              />
            );
          })}
        </View>
      </View>
    );
  }
  // native fallback: chips de región
  return (
    <View style={st.chips}>
      {DERMA_SITIOS.map((s) => {
        const on = s === active;
        return (
          <TouchableOpacity key={s} activeOpacity={0.8} onPress={() => onPick(on ? null : s)} style={[st.chip, on && st.chipOn]}>
            <Text style={[st.chipTxt, on && { color: DermaAtlas.gold }]}>{s}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const st = StyleSheet.create({
  wrap: { alignItems: 'center', width: '100%' },
  svgBox: { width: '100%', maxWidth: 180, aspectRatio: 120 / 300, alignSelf: 'center' },
  hit: { position: 'absolute', borderRadius: 999 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
  chipOn: { borderColor: DermaAtlas.gold, backgroundColor: 'rgba(200,169,106,0.12)' },
  chipTxt: { fontSize: FontSize.labelSm, color: Colors.muted, fontWeight: '700' },
});
