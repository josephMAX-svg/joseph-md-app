import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Motion, LineHeight } from '../../theme/tokens';
import { DermaAtlas, SkinTone } from '../../lib/dermaData';
import { DiaDerma } from '../../lib/dermaDailyPlan';
import DermaLineIcon from './DermaLineIcons';

/**
 * DermaClinicalPlate — LÁMINA CLÍNICA, componente-firma que reemplaza el temaCard de texto.
 * Imagen primero: marco 4:3 con placeholder-atlas (retícula dermatoscópica tenue) y deep-link
 * legal a DermNet/AccessDerma (NO re-hostea bitmaps — cumple CC BY-NC-ND). Caption clínico en
 * cursiva bajo la lámina, chips de morfología + sitio + fototipo. Texto DEBAJO de la imagen.
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;
const open = (u: string) => Linking.openURL(u).catch(() => {});

function PlateFrame({ accent, caseNo, hasImg, onOpen }: { accent: string; caseNo: number; hasImg: boolean; onOpen?: () => void }) {
  // Retícula dermatoscópica tenue como textura de fondo (web SVG).
  const grid = Platform.OS === 'web'
    ? `<svg width="100%" height="100%" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice">
         <defs>
           <pattern id="dermGrid" width="26" height="26" patternUnits="userSpaceOnUse">
             <path d="M26 0H0V26" fill="none" stroke="${accent}" stroke-opacity="0.10" stroke-width="0.6"/>
           </pattern>
           <radialGradient id="lens" cx="50%" cy="42%" r="62%">
             <stop offset="0%" stop-color="${accent}" stop-opacity="0.14"/>
             <stop offset="100%" stop-color="#0A0F1C" stop-opacity="0"/>
           </radialGradient>
         </defs>
         <rect width="320" height="240" fill="url(#dermGrid)"/>
         <rect width="320" height="240" fill="url(#lens)"/>
         <circle cx="160" cy="108" r="52" fill="none" stroke="${accent}" stroke-opacity="0.30" stroke-width="1"/>
         <circle cx="160" cy="108" r="22" fill="none" stroke="${accent}" stroke-opacity="0.18" stroke-width="0.8"/>
       </svg>`
    : '';
  return (
    <TouchableOpacity activeOpacity={hasImg ? 0.9 : 1} onPress={onOpen} style={[st.frame, Platform.OS === 'web' && hasImg ? WEB : null]}>
      {Platform.OS === 'web' ? (
        <View style={StyleSheet.absoluteFill as any} {...({ dangerouslySetInnerHTML: { __html: grid } } as any)} />
      ) : null}
      <View style={st.frameCenter}>
        <DermaLineIcon name={hasImg ? 'loupe' : 'atlas'} size={30} color={accent} />
        <Text style={[st.frameTxt, { color: accent }]}>{hasImg ? 'Abrir lámina en atlas ↗' : 'Lámina clínica'}</Text>
        <Text style={st.frameSub}>{hasImg ? 'DermNet / AccessDerma · deep-link (no re-host)' : 'sin bitmap local · usa el enlace del material'}</Text>
      </View>
      <View style={[st.caseTag, { borderColor: accent + '55' }]}>
        <Text style={[st.caseTxt, { color: accent }]}>CASO Nº{String(caseNo).padStart(2, '0')}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function DermaClinicalPlate({
  dia, accent, tone, children,
}: { dia: DiaDerma; accent: string; tone: SkinTone; children?: React.ReactNode }) {
  const plateUrl = dia.atlasUrl || dia.access.url;
  return (
    <View style={[st.card, { borderColor: accent + '3A' }]}>
      <PlateFrame accent={accent} caseNo={dia.d} hasImg={!!dia.atlasUrl} onOpen={() => open(plateUrl)} />

      {/* Caption clínico (pie de figura de atlas, cursiva fina) */}
      <Text style={st.caption}>
        <Text style={st.captionCase}>Fig. {dia.d}. </Text>
        {dia.sub}
      </Text>

      {/* Chips clínicos: morfología · sitio · fototipo */}
      <View style={st.chipRow}>
        {dia.morfologia ? <Chip label={dia.morfologia} c={accent} /> : null}
        {dia.sitio ? <Chip label={dia.sitio} c={DermaAtlas.periwinkle} /> : null}
        <Chip label={`Fitzpatrick ${tone.id}`} c={DermaAtlas.gold} swatch={tone.hex} />
        {dia.fototipo ? <Chip label="piel de color" c={DermaAtlas.gold} /> : null}
      </View>
      {dia.fototipo ? <Text style={st.socNote}>▸ {dia.fototipo}</Text> : null}

      {children}
    </View>
  );
}

function Chip({ label, c, swatch }: { label: string; c: string; swatch?: string }) {
  return (
    <View style={[st.chip, { borderColor: c + '55', backgroundColor: c + '14' }]}>
      {swatch ? <View style={[st.swatch, { backgroundColor: swatch }]} /> : null}
      <Text style={[st.chipTxt, { color: c }]}>{label}</Text>
    </View>
  );
}

const st = StyleSheet.create({
  card: { backgroundColor: DermaAtlas.plateFrame, borderRadius: BorderRadius.xl, borderWidth: 1, padding: Spacing.md, marginBottom: Spacing.sm, ...Elevation.md },
  frame: { width: '100%', aspectRatio: 4 / 3, maxHeight: 300, borderRadius: BorderRadius.lg, overflow: 'hidden', backgroundColor: DermaAtlas.ink, borderWidth: 1, borderColor: 'rgba(231,234,242,0.06)', alignItems: 'center', justifyContent: 'center' },
  frameCenter: { alignItems: 'center', gap: 6, paddingHorizontal: Spacing.lg },
  frameTxt: { fontSize: FontSize.labelMd, fontWeight: '800', letterSpacing: 0.3, marginTop: 4 },
  frameSub: { fontSize: 9, color: Colors.muted, textAlign: 'center', lineHeight: 13 },
  caseTag: { position: 'absolute', top: 10, left: 10, borderWidth: 1, borderRadius: BorderRadius.sm, paddingVertical: 2, paddingHorizontal: 7, backgroundColor: 'rgba(10,15,28,0.7)' },
  caseTxt: { fontSize: 9, fontWeight: '900', letterSpacing: 0.8, ...(Platform.OS === 'web' ? ({ fontVariantNumeric: 'tabular-nums' } as any) : {}) },
  caption: { fontSize: FontSize.bodyMd, color: Colors.onSurface, marginTop: Spacing.md, lineHeight: 21, fontStyle: 'italic', letterSpacing: -0.1 },
  captionCase: { fontStyle: 'normal', fontWeight: '800', color: Colors.onSurfaceVariant },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: Spacing.md },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1, borderRadius: BorderRadius.full, paddingVertical: 3, paddingHorizontal: 9 },
  swatch: { width: 9, height: 9, borderRadius: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  chipTxt: { fontSize: 10, fontWeight: '800', letterSpacing: 0.3 },
  socNote: { fontSize: FontSize.labelSm, color: DermaAtlas.gold, marginTop: 7, lineHeight: LineHeight.labelSm, fontWeight: '600' },
});
