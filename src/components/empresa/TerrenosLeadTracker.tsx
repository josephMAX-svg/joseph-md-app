import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Linking } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../theme/tokens';
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
    <View style={{
      backgroundColor: DesktopColors.glass, borderRadius: BorderRadius.lg, borderWidth: 1,
      borderColor: DesktopColors.glassBorder, padding: Spacing.lg, marginBottom: Spacing.lg,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
        <Text style={{ fontSize: FontSize.titleMd, fontWeight: '800', color: Colors.onSurface }}>📋 Seguimiento de leads</Text>
        <Chip label={`${leads.length} leads`} color="#8FB6E8" small />
        <Chip label={`OMTM: ${visitasFinde} citas/visitas`} color={visitasFinde > 0 ? Colors.green : AMBER} small />
      </View>
      <Text style={{ fontSize: FontSize.labelSm, color: Colors.muted, marginBottom: 10 }}>
        La métrica que importa (Lean Analytics): VISITAS realizadas por finde. Responder todo en &lt;5 min (21× más calificación — MIT/InsideSales). Avance manual: ‹ › mueve de etapa.
      </Text>

      {/* Resumen por etapa */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {ETAPAS.map(e => (
          <Chip key={e.id} label={`${e.emoji} ${e.label}: ${counts[e.id]}`} color={counts[e.id] > 0 ? '#8FB6E8' : Colors.muted} small />
        ))}
      </View>

      {/* Leads */}
      {leads.map(l => {
        const p = PREDIOS.find(x => x.id === l.predioId);
        const et = ETAPAS[ETAPA_IDX(l.etapa)];
        return (
          <View key={l.id} style={{
            flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 7,
            borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)',
          }}>
            <Text style={{ fontSize: 13 }}>{TEMP_EMOJI[l.temp]}</Text>
            <View style={{ flex: 1, minWidth: 120 }}>
              <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '700', color: Colors.onSurface }}>
                {l.nombre} <Text style={{ color: Colors.muted, fontWeight: '400' }}>· #{l.predioId} {p?.nombre} · {p?.area} m²</Text>
              </Text>
              {l.nota ? <Text style={{ fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant }} numberOfLines={2}>{l.nota}</Text> : null}
            </View>
            <Chip label={`${et.emoji} ${et.label}`} color={l.etapa === 'cita_confirmada' || l.etapa === 'sena' || l.etapa === 'cerrado' ? Colors.green : '#8FB6E8'} small />
            <TouchableOpacity onPress={() => mover(l.id, -1)} hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}>
              <Text style={{ color: Colors.muted, fontSize: 16, paddingHorizontal: 4 }}>‹</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => mover(l.id, 1)} hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}>
              <Text style={{ color: '#8FB6E8', fontSize: 16, fontWeight: '800', paddingHorizontal: 4 }}>›</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      {/* Cadencia de la semana */}
      <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface, marginTop: 14, marginBottom: 6 }}>
        🗓️ Cadencia de seguimiento (Hormozi · Keller 8x8 · Blount)
      </Text>
      {CADENCIA_SEMANA.map(c => (
        <View key={c.dia} style={{ flexDirection: 'row', gap: 8, marginBottom: 3 }}>
          <Text style={{ width: 34, fontSize: FontSize.labelSm, fontWeight: '800', color: '#8FB6E8' }}>{c.dia}</Text>
          <Text style={{ flex: 1, fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant }}>{c.accion}</Text>
        </View>
      ))}

      {/* Scripts */}
      <TouchableOpacity onPress={() => setOpenScripts(o => !o)} activeOpacity={0.8} style={{ marginTop: 12 }}>
        <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface }}>
          {openScripts ? '▾' : '▸'} 💬 Scripts listos (tap = copiar) {copiado ? `— ✓ copiado: ${copiado}` : ''}
        </Text>
      </TouchableOpacity>
      {openScripts && SCRIPTS.map(s => (
        <TouchableOpacity key={s.label} activeOpacity={0.75} onPress={() => copiar(s.label, s.texto)}
          style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: BorderRadius.md, padding: 10, marginTop: 6 }}>
          <Text style={{ fontSize: FontSize.labelSm, fontWeight: '700', color: '#8FB6E8', marginBottom: 3 }}>{s.label}</Text>
          <Text style={{ fontSize: FontSize.labelSm, color: Colors.onSurfaceVariant }}>{s.texto}</Text>
        </TouchableOpacity>
      ))}

      {/* Links */}
      <TouchableOpacity onPress={() => setOpenLinks(o => !o)} activeOpacity={0.8} style={{ marginTop: 10 }}>
        <Text style={{ fontSize: FontSize.bodyMd, fontWeight: '800', color: Colors.onSurface }}>
          {openLinks ? '▾' : '▸'} 🔗 Links de la operación
        </Text>
      </TouchableOpacity>
      {openLinks && TERRENOS_LINKS.map(l => (
        <TouchableOpacity key={l.url} activeOpacity={0.75} onPress={() => Linking.openURL(l.url).catch(() => {})}
          style={{ paddingVertical: 5 }}>
          <Text style={{ fontSize: FontSize.labelSm, color: '#8FB6E8' }}>{l.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
