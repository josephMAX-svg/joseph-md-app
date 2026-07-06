// encapsRentabilidad.ts — TELEMETRÍA de rentabilidad ENCAPS (READ-ONLY, estático).
// Fuente: DATA/ENCAPS/PRONOSTICO_WALKFORWARD_2026-2_v2.md (walk-forward v2, 39 agentes,
// sin lookahead + auditoría adversarial) verificado contra QX "Tendencias".
// Es una ESTIMACIÓN data-driven (6 exámenes oficiales reales), NO un peso oficial del MINSA
// (el blueprint MINSA no publica pesos por área). Banda de confianza ±2-4pp.
//
// NO reprograma nada: no toca fechas, item_key, motor ni Supabase. Solo alimenta el HUD /
// el strip Bloomberg de telemetría del cockpit ENCAPS. Enriquecer contenido, no datos vivos.

import { Colors } from '../theme/tokens';

export interface AreaForecast {
  code: string;          // 'II'
  label: string;         // 'Cuidado Integral'
  short: string;         // 'CI'
  pct: number;           // forecast central (%)
  bandLo: number;        // banda baja (%)
  bandHi: number;        // banda alta (%)
  accent: string;        // acento-joya para lectura instantánea
  note?: string;         // matiz táctico (rey / contingencia mínima…)
}

// Área: II 34 · I 27 · V 23 · III 13 · IV 3 (post-auditoría v2). Banda ±2-4pp.
// Acento por área para escaneo tipo terminal (cada área = su joya apagada).
export const ENCAPS_AREA_FORECAST: AreaForecast[] = [
  { code: 'II', label: 'Cuidado Integral', short: 'CI',   pct: 34, bandLo: 30, bandHi: 38, accent: Colors.blue,   note: 'ÁREA REY · ~90% viñeta clínica' },
  { code: 'I',  label: 'Salud Pública', short: 'SP', pct: 27, bandLo: 24, bandHi: 30, accent: Colors.purple, note: 'estructural · I-3 crítico' },
  { code: 'V',  label: 'Gestión', short: 'GES', pct: 23, bandLo: 18, bandHi: 27, accent: Colors.gold,   note: 'V-2 volátil (banda 8-18)' },
  { code: 'III', label: 'Ética / Interculturalidad', short: 'ÉTI', pct: 13, bandLo: 11, bandHi: 15, accent: '#7C83D6', note: 'III-5 crítico · III-9 miss histórico' },
  { code: 'IV', label: 'Investigación', short: 'INV', pct: 3,  bandLo: 2,  bandHi: 5,  accent: Colors.brass,  note: 'CONTINGENCIA MÍNIMA · no sobre-invertir (banda 2-5)' },
];

// Temas CRÍTICOS (fuera de rango si no se dominan). Estado de dominio derivable en runtime;
// aquí solo el ranking data-driven + su área. Los "tickers" del strip Bloomberg.
export interface CriticalTopic { code: string; label: string; area: string; accent: string }
export const ENCAPS_CRITICAL_TOPICS: CriticalTopic[] = [
  { code: 'I-3',   label: 'Vigilancia epidemiológica / brotes (Dir. 046)', area: 'I',  accent: Colors.purple },
  { code: 'II-1',  label: 'Salud materna: prenatal / parto / emergencias', area: 'II', accent: Colors.blue },
  { code: 'II-3',  label: 'Vacunación / ESAVI · cadena de frío', area: 'II', accent: Colors.blue },
  { code: 'V-2',   label: 'Planeamiento (PEI/POI/FODA · CEPLAN)', area: 'V', accent: Colors.gold },
  { code: 'II-11', label: 'ITS · VIH-sífilis dual (PRD/PTMI)', area: 'II', accent: Colors.blue },
  { code: 'III-5', label: 'Interculturalidad / pertinencia cultural', area: 'III', accent: '#7C83D6' },
  { code: 'II-8',  label: 'HEARTS: HTA/DM · ECNT', area: 'II', accent: Colors.blue },
];

// Vueltas por prioridad (el motor ya lo aplica; aquí para el radar de repasos).
export const ENCAPS_VUELTAS_POR_PRIORIDAD: { key: string; label: string; vueltas: number; accent: string }[] = [
  { key: 'CRITICA', label: 'CRÍT', vueltas: 6, accent: Colors.gold },
  { key: 'ALTA',    label: 'ALTA', vueltas: 5, accent: Colors.blue },
  { key: 'MEDIA',   label: 'MEDIA', vueltas: 4, accent: Colors.green },
  { key: 'BAJA',    label: 'BAJA', vueltas: 3, accent: Colors.muted },
];

// Marca Go/No-Go: meta real de Joseph = >18/20 (90%). Zonas del altímetro (sobre 20).
export const ENCAPS_META_NOTA = 18;         // /20 — meta declarada >18
export const ENCAPS_META_PCT = 90;          // %
// nota → zona: verde ≥18 (meta) · ámbar 14-17.99 (bajo meta) · rojo <14
export function encapsGoZone(nota: number | null | undefined): 'go' | 'warn' | 'nogo' | 'none' {
  if (nota == null) return 'none';
  if (nota >= 18) return 'go';
  if (nota >= 14) return 'warn';
  return 'nogo';
}
export function encapsGoColor(zone: 'go' | 'warn' | 'nogo' | 'none'): string {
  switch (zone) {
    case 'go': return Colors.green;    // jade — en rango
    case 'warn': return Colors.brass;  // brass/ámbar — bajo meta
    case 'nogo': return Colors.coral;  // rojo-joya apagado — crítico fuera de rango
    default: return Colors.muted;
  }
}

export const ENCAPS_TELEMETRY_META = {
  disclaimer: 'estimación walk-forward · banda ±2-4pp nominal (MAE backtest real ~6pp en el último fold) · el MINSA no publica pesos por área',
  formato: '~90% viñeta clínica',
  confianza: 'MEDIA',
  fuente: 'PRONOSTICO_WALKFORWARD_2026-2_v2 · QX Tendencias',
} as const;
