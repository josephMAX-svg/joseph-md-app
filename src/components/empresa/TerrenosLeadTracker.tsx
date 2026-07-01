import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Linking, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Elevation, Hairline, LineHeight, Motion } from '../../theme/tokens';
import { DesktopColors } from '../../theme/desktopStyles';
import { AMBER, Chip } from './primitives';
import {
  PREDIOS, LEADS_SEED, ETAPAS, SCRIPTS, CADENCIA_SEMANA, TERRENOS_LINKS,
  Lead, LeadEtapa, LeadTemp,
} from '../../lib/terrenosData';

/**
 * TerrenosLeadTracker — pipeline de leads de Marketplace/WhatsApp (estilo seguimiento
 * PIRQA). Semilla: los 21 leads reales gestionados el 11-jun-2026; desde ahí el avance
 * es MANUAL (regla: progreso real, nada inventado). Persistencia: localStorage.
 * OMTM (Lean Analytics): visitas realizadas por fin de semana.
 */

const LS_KEY = 'jmd-terrenos-leads-v1';
const isWeb = Platform.OS === 'web' && typeof window !== 'undefined';

function loadLeads(): Lead[] {
  if (isWeb) {
    try {
      const raw = window.localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
  }
  return LEADS_SEED;
}
function saveLeads(leads: Lead[]) {
  if (isWeb) { try { window.localStorage.setItem(LS_KEY, JSON.stringify(leads)); } catch {} }
}

const TEMP_EMOJI: Record<LeadTemp, string> = { caliente: '🔥', tibio: '🌤️', frio: '❄️' };
const ETAPA_IDX = (e: LeadEtapa) => ETAPAS.findIndex(x => x.id === e);
const TERR_BLUE = '#8FB6E8'; // acento de la operación de terrenos (azul frío)
const webPress = Platform.OS === 'web' ? ({ cursor: 'pointer', transition: `all ${Motion.fast}` } as any) : null;

export default function TerrenosLeadTracker() {
  const [leads, setLeads] = useState<Lead[]>(loadLeads);
  const [openScripts, setOpenScripts] = useState(false);
  const [openLinks, setOpenLinks] = useState(false);
  const [copiado, setCopiado] = useState<string | null>(null);

  useEffect(() => { saveLeads(leads); }, [leads]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    ETAPAS.forEach(e => { c[e.id] = leads.filter(l => l.etapa === e.id).length; });
    return c;
  }, [leads]);

  const mover = (id: string, dir: 1 | -1) => {
    setLeads(prev => prev.map(l => {
      if (l.id !== id) return l;
      const idx = Math.min(Math.max(ETAPA_IDX(l.etapa) + dir, 0), ETAPAS.length - 1);
      return { ...l, etapa: ETAPAS[idx].id };
    }));
  };

  const copiar = (label: string, texto: string) => {
    if (isWeb && (navigator as any)?.clipboard?.writeText) {
      (navigator as any).clipboard.writeText(texto).catch(() => {});
      setCopiado(label);
      setTimeout(() => setCopiado(null), 1800);
    }
  };

  const visitasFinde = counts.cita_confirmada + counts.visita_hecha;

  return (
    <View style={st.container}>
      <View style={st.headRow}>
        <Text style={st.title}>📋 Seguimiento de leads</Text>
        <Chip label={`${leads.length} leads`} color={TERR_BLUE} small />
        <Chip label={`OMTM: ${visitasFinde} citas/visitas`} color={visitasFinde > 0 ? Colors.green : AMBER} small />
      </View>
      <Text style={st.intro}>
        La métrica que importa (Lean Analytics): VISITAS realizadas por finde. Responder todo en &lt;5 min (21× más calificación — MIT/InsideSales). Avance manual: ‹ › mueve de etapa.
      </Text>

      {/* Resumen por etapa */}
      <View style={st.etapaSummary}>
        {ETAPAS.map(e => (
          <Chip key={e.id} label={`${e.emoji} ${e.label}: ${counts[e.id]}`} color={counts[e.id] > 0 ? TERR_BLUE : Colors.muted} small />
        ))}
      </View>

      {/* Leads */}
      {leads.map(l => {
        const p = PREDIOS.find(x => x.id === l.predioId);
        const et = ETAPAS[ETAPA_IDX(l.etapa)];
        return (
          <View key={l.id} style={st.leadRow}>
            <Text style={st.leadTemp}>{TEMP_EMOJI[l.temp]}</Text>
            <View style={{ flex: 1, minWidth: 120 }}>
              <Text style={st.leadName}>
                {l.nombre} <Text style={st.leadMeta}>· #{l.predioId} {p?.nombre} · {p?.area} m²</Text>
              </Text>
              {l.nota ? <Text style={st.leadNota} numberOfLines={2}>{l.nota}</Text> : null}
            </View>
            <Chip label={`${et.emoji} ${et.label}`} color={l.etapa === 'cita_confirmada' || l.etapa === 'sena' || l.etapa === 'cerrado' ? Colors.green : TERR_BLUE} small />
            <TouchableOpacity onPress={() => mover(l.id, -1)} hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }} style={webPress}>
              <Text style={st.moverBack}>‹</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => mover(l.id, 1)} hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }} style={webPress}>
              <Text style={st.moverFwd}>›</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      {/* Cadencia de la semana */}
      <Text style={[st.sectionH, st.cadHead]}>
        🗓️ Cadencia de seguimiento (Hormozi · Keller 8x8 · Blount)
      </Text>
      {CADENCIA_SEMANA.map(c => (
        <View key={c.dia} style={st.cadRow}>
          <Text style={st.cadDia}>{c.dia}</Text>
          <Text style={st.cadAccion}>{c.accion}</Text>
        </View>
      ))}

      {/* Scripts */}
      <TouchableOpacity onPress={() => setOpenScripts(o => !o)} activeOpacity={0.8} style={[st.toggleRow, webPress]}>
        <Text style={st.sectionH}>
          {openScripts ? '▾' : '▸'} 💬 Scripts listos (tap = copiar) {copiado ? `— ✓ copiado: ${copiado}` : ''}
        </Text>
      </TouchableOpacity>
      {openScripts && SCRIPTS.map(s => (
        <TouchableOpacity key={s.label} activeOpacity={0.75} onPress={() => copiar(s.label, s.texto)}
          style={[st.scriptCard, webPress]}>
          <Text style={st.scriptLabel}>{s.label}</Text>
          <Text style={st.scriptTexto}>{s.texto}</Text>
        </TouchableOpacity>
      ))}

      {/* Links */}
      <TouchableOpacity onPress={() => setOpenLinks(o => !o)} activeOpacity={0.8} style={[st.toggleRow, webPress]}>
        <Text style={st.sectionH}>
          {openLinks ? '▾' : '▸'} 🔗 Links de la operación
        </Text>
      </TouchableOpacity>
      {openLinks && TERRENOS_LINKS.map(l => (
        <TouchableOpacity key={l.url} activeOpacity={0.75} onPress={() => Linking.openURL(l.url).catch(() => {})}
          style={[st.linkRow, webPress]}>
          <Text style={st.linkTxt}>{l.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const st = StyleSheet.create({
  container: {
    backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.xl, borderWidth: 1,
    borderColor: DesktopColors.glassBorder, padding: Spacing.xl, marginBottom: Spacing.lg,
    ...Elevation.md,
  },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 },
  title: { fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.2 },
  intro: { fontSize: FontSize.labelSm, color: Colors.muted, marginBottom: Spacing.md, lineHeight: LineHeight.labelSm },
  etapaSummary: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: Spacing.md },

  leadRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 9,
    borderBottomWidth: 1, borderBottomColor: Hairline.soft,
  },
  leadTemp: { fontSize: 13 },
  leadName: { fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface, lineHeight: LineHeight.bodyMd },
  leadMeta: { color: Colors.muted, fontWeight: '400' },
  leadNota: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, marginTop: 2, lineHeight: LineHeight.labelSm },
  moverBack: { color: Colors.muted, fontSize: 18, fontWeight: '700', paddingHorizontal: 5 },
  moverFwd: { color: TERR_BLUE, fontSize: 18, fontWeight: '800', paddingHorizontal: 5 },

  sectionH: { fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, letterSpacing: -0.1 },
  cadHead: { marginTop: Spacing.lg, marginBottom: 7 },
  cadRow: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  cadDia: { width: 34, fontSize: FontSize.labelSm, fontWeight: '800', color: TERR_BLUE, letterSpacing: 0.3 },
  cadAccion: { flex: 1, fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, lineHeight: LineHeight.labelSm },

  toggleRow: { marginTop: Spacing.md },
  scriptCard: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Hairline.soft, padding: Spacing.md, marginTop: 7,
  },
  scriptLabel: { fontSize: FontSize.labelSm, fontWeight: '700', color: TERR_BLUE, marginBottom: 4, letterSpacing: 0.2 },
  scriptTexto: { fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant, lineHeight: LineHeight.labelSm },

  linkRow: { paddingVertical: 6 },
  linkTxt: { fontSize: FontSize.labelSm, color: TERR_BLUE, fontWeight: '600' },
});
