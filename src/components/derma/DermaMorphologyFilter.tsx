import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Motion } from '../../theme/tokens';
import { DermaAtlas, DERMA_MORFOLOGIAS, DERMA_SITIOS, DERMA_CATEGORIAS } from '../../lib/dermaData';

/**
 * DermaMorphologyFilter — barra de filtros clínicos estilo DermNet Image Library
 * (morfología · sitio · categoría). Índice para explorar el temario como ATLAS
 * (no como lista). Estado controlado por el shell; reutiliza el temario existente.
 */
const WEB = { cursor: 'pointer', transition: Motion.base } as any;

export interface DermaFilters { morfologia: string | null; sitio: string | null; categoria: string | null }

function Group({ label, options, value, onPick }: { label: string; options: readonly string[]; value: string | null; onPick: (v: string | null) => void }) {
  return (
    <View style={st.group}>
      <Text style={st.grpLbl}>{label}</Text>
      <View style={st.chipRow}>
        {options.map((o) => {
          const on = o === value;
          return (
            <TouchableOpacity key={o} activeOpacity={0.8} onPress={() => onPick(on ? null : o)} style={[st.chip, on && st.chipOn, Platform.OS === 'web' ? WEB : null]}>
              <Text style={[st.chipTxt, on && st.chipTxtOn]}>{o}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function DermaMorphologyFilter({
  filters, onChange,
}: { filters: DermaFilters; onChange: (f: DermaFilters) => void }) {
  const any = filters.morfologia || filters.sitio || filters.categoria;
  return (
    <View>
      <View style={st.head}>
        <Text style={st.title}>FILTRAR EL ATLAS</Text>
        {any ? (
          <TouchableOpacity activeOpacity={0.8} onPress={() => onChange({ morfologia: null, sitio: null, categoria: null })} style={Platform.OS === 'web' ? WEB : null}>
            <Text style={st.clear}>limpiar ✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <Group label="Morfología" options={DERMA_MORFOLOGIAS} value={filters.morfologia} onPick={(v) => onChange({ ...filters, morfologia: v })} />
      <Group label="Sitio" options={DERMA_SITIOS} value={filters.sitio} onPick={(v) => onChange({ ...filters, sitio: v })} />
      <Group label="Categoría" options={DERMA_CATEGORIAS} value={filters.categoria} onPick={(v) => onChange({ ...filters, categoria: v })} />
    </View>
  );
}

const st = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.sm },
  title: { fontSize: 9, fontWeight: '800', color: Colors.smallLabel, letterSpacing: 1.4 },
  clear: { fontSize: FontSize.labelSm, color: DermaAtlas.gold, fontWeight: '700' },
  group: { marginBottom: Spacing.md },
  grpLbl: { fontSize: 9, fontWeight: '700', color: Colors.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  chip: { paddingVertical: 4, paddingHorizontal: 9, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: 'rgba(231,234,242,0.10)', backgroundColor: 'rgba(255,255,255,0.02)' },
  chipOn: { borderColor: DermaAtlas.amethyst, backgroundColor: 'rgba(154,123,200,0.14)' },
  chipTxt: { fontSize: FontSize.labelSm, color: Colors.muted, fontWeight: '600' },
  chipTxtOn: { color: '#E7EAF2' },
});
