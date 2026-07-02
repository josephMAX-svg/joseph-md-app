import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Svg, { Path, Ellipse, Circle, G } from 'react-native-svg';
import { Colors, FontSize, BorderRadius, Motion } from '../../theme/tokens';
import { DermaAtlas } from '../../lib/dermaData';

/**
 * DermaBodyMap — silueta anterior interactiva (firma VisualDx/DermNet traída al shell).
 * Render REAL con react-native-svg (antes usaba dangerouslySetInnerHTML sobre un <View>, que
 * RN-web ignora → salía en blanco). Resalta la región activa y filtra el atlas por sitio.
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;
const OUTLINE = '#5A6478';
const SKIN = 'rgba(154,123,200,0.07)';

// Regiones → coordenadas en el viewBox 0 0 120 300.
const REGIONS: { sitio: string; cx: number; cy: number; r: number }[] = [
  { sitio: 'Cuero cabelludo', cx: 60, cy: 20, r: 13 },
  { sitio: 'Cara', cx: 60, cy: 40, r: 10 },
  { sitio: 'Tronco', cx: 60, cy: 108, r: 24 },
  { sitio: 'Pliegues', cx: 40, cy: 90, r: 8 },
  { sitio: 'Manos', cx: 20, cy: 168, r: 9 },
  { sitio: 'Genital', cx: 60, cy: 156, r: 8 },
  { sitio: 'Pies', cx: 52, cy: 288, r: 9 },
];

const BODY_D =
  'M52 46 Q60 52 68 46 L74 60 Q82 64 82 90 L78 140 Q76 150 72 150 L70 96 L70 150 Q66 240 60 296 Q54 240 50 150 L50 96 L48 150 Q44 150 42 140 L38 90 Q38 64 46 60 Z';

export default function DermaBodyMap({
  active, onPick,
}: { active: string | null; onPick: (sitio: string | null) => void }) {
  return (
    <View style={st.wrap}>
      <View style={st.svgBox}>
        <Svg width="100%" height="100%" viewBox="0 0 120 300">
          {/* Silueta */}
          <Ellipse cx={60} cy={30} rx={14} ry={17} fill={SKIN} stroke={OUTLINE} strokeWidth={1.3} />
          <Path d={BODY_D} fill={SKIN} stroke={OUTLINE} strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" />
          <Path d="M46 62 Q28 90 20 166" stroke={OUTLINE} strokeWidth={1.3} fill="none" strokeLinecap="round" />
          <Path d="M74 62 Q92 90 100 166" stroke={OUTLINE} strokeWidth={1.3} fill="none" strokeLinecap="round" />
          {/* Marcadores de región */}
          {REGIONS.map((r) => {
            const on = r.sitio === active;
            return (
              <G key={r.sitio}>
                {on && (
                  <Circle cx={r.cx} cy={r.cy} r={r.r + 3} fill="none" stroke={DermaAtlas.gold} strokeWidth={1.2} strokeOpacity={0.75} />
                )}
                <Circle
                  cx={r.cx}
                  cy={r.cy}
                  r={r.r}
                  fill={on ? DermaAtlas.gold : DermaAtlas.amethyst}
                  fillOpacity={on ? 0.85 : 0.24}
                  stroke={on ? DermaAtlas.gold : DermaAtlas.amethyst}
                  strokeWidth={0.8}
                  strokeOpacity={0.5}
                />
              </G>
            );
          })}
        </Svg>

        {/* Capa de zonas tocables (RN-web-friendly, encima del SVG) */}
        <View style={StyleSheet.absoluteFill as any} pointerEvents="box-none">
          {REGIONS.map((r) => {
            const left = `${(r.cx / 120) * 100}%`;
            const top = `${(r.cy / 300) * 100}%`;
            const sz = (r.r / 120) * 100 * 2;
            return (
              <TouchableOpacity
                key={r.sitio}
                activeOpacity={0.6}
                onPress={() => onPick(r.sitio === active ? null : r.sitio)}
                style={[
                  st.hit,
                  { left, top, width: `${sz}%`, aspectRatio: 1, transform: [{ translateX: '-50%' as any }, { translateY: '-50%' as any }] } as any,
                  WEB,
                ]}
              />
            );
          })}
        </View>
      </View>

      {/* Caption: región activa o hint */}
      <View style={st.caption}>
        {active ? (
          <>
            <View style={st.capDot} />
            <Text style={st.capActive}>{active}</Text>
            <TouchableOpacity onPress={() => onPick(null)} style={WEB}>
              <Text style={st.capClear}>· limpiar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={st.capHint}>Toca una región para filtrar el atlas</Text>
        )}
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  wrap: { alignItems: 'center', width: '100%', gap: 10 },
  svgBox: { width: '100%', maxWidth: 150, height: 340, alignSelf: 'center', position: 'relative' },
  hit: { position: 'absolute', borderRadius: 999 },
  caption: { flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 16 },
  capDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: DermaAtlas.gold },
  capActive: { fontSize: FontSize.labelSm, fontWeight: '800', color: Colors.onSurface, letterSpacing: 0.3 },
  capClear: { fontSize: FontSize.labelSm, fontWeight: '600', color: Colors.muted },
  capHint: { fontSize: FontSize.labelSm, color: Colors.muted, fontStyle: 'italic', textAlign: 'center' },
});
