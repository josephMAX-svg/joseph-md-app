// encapsRentabilidad.ts — TELEMETRÍA de rentabilidad ENCAPS (READ-ONLY, estático).
// Fuente: DATA/ENCAPS/PRONOSTICO_WALKFORWARD_2027-1_v3.md (walk-forward v3, 27-ago-2026, 7 exámenes
// reales 2024-II A/B → 2026-II clasificado pregunta a pregunta). Supersede al v2 (II33·I28·V22·III13·IV4).
//
// Vector CANÓNICO v3: II 30 · I 27 · V 21 · III 13 · IV 9 (bandas 27-34 / 24-29 / 18-25 / 11-15 / 5-14).
// Lección L1 del backtest 2026-II: IV saltó 4→12 (es BIMODAL por comité) → nunca más banda <6% para IV.
// Lección L2: la viñeta cayó de 92%→49% → formato esperado 2027-I = 45-70% viñeta; entrenar los DOS modos
// (conducta clínica en viñeta + recall de cifras/definiciones normativas).
// Es una ESTIMACIÓN data-driven (MAE 3.2 pp en el último fold, ranking de áreas 5/5), NO un peso oficial
// del MINSA (el blueprint no publica pesos por área). n = 7 exámenes → bandas, no puntos.
//
// NO reprograma nada: no toca fechas, item_key, motor ni Supabase. Solo alimenta el HUD / el strip
// Bloomberg de telemetría del cockpit ENCAPS. La misma fuente alimenta el re-tier de encapsCobertura.ts
// (gen_encaps_cobertura.js) y el ciclo de siembra (DATA/_scripts/_encaps_ciclo_v3.js).

import { Colors } from '../theme/tokens';

export interface AreaForecast {
  code: string;          // 'II'
  label: string;         // 'Cuidado Integral'
  short: string;         // 'CI'
  pct: number;           // forecast central (%)
  bandLo: number;        // banda baja (%)
  bandHi: number;        // banda alta (%)
  accent: string;        // acento-joya para lectura instantánea
  note?: string;         // matiz táctico (rey / bimodal…)
}

// Área CANÓNICO v3: II 30 · I 27 · V 21 · III 13 · IV 9 (v3 §2). Acento por área (cada área = su joya apagada).
export const ENCAPS_AREA_FORECAST: AreaForecast[] = [
  { code: 'II',  label: 'Cuidado Integral', short: 'CI',  pct: 30, bandLo: 27, bandHi: 34, accent: Colors.blue,   note: 'ÁREA REY estable · ya no en máximos (36 fue el pico)' },
  { code: 'I',   label: 'Salud Pública',    short: 'SP',  pct: 27, bandLo: 24, bandHi: 29, accent: Colors.purple, note: 'estable-alta · I-3 + I-4 la sostienen · coyuntura DGE la empuja' },
  { code: 'V',   label: 'Gestión',          short: 'GES', pct: 21, bandLo: 18, bandHi: 25, accent: Colors.gold,   note: 'estable-baja (20, 19) · V-2 = más de la mitad del área' },
  { code: 'III', label: 'Ética / Interculturalidad', short: 'ÉTI', pct: 13, bandLo: 11, bandHi: 15, accent: '#7C83D6', note: 'la más predecible (0 pp de error en 2026-II)' },
  { code: 'IV',  label: 'Investigación',    short: 'INV', pct: 9,  bandLo: 5,  bandHi: 14, accent: Colors.brass,  note: 'BIMODAL por comité (viñeta 2-3 · teoría 11-14) · NUNCA <6% · no apostar al piso' },
];

// Temas CRÍTICOS v3 (fuera de rango si no se dominan). Estado de dominio derivable en runtime;
// aquí solo el ranking data-driven + su área. Los "tickers" del strip Bloomberg.
// CANÓNICO v3 = OCHO: I-3 · V-2 · II-3 · III-5 · I-4 · II-5 · II-4 · IV-1+IV-2 (~49% del examen).
// Entran I-4 (3→6), II-5 (0→5 emergente), II-4 (cifras preguntables), IV-1+IV-2 (7 en 2026-II; CONDICIONAL al comité).
// Salen a ALTA con flag de rebote: II-1 · II-11 · II-8 (anti-persistentes; no enterrarlos — lección V-2).
// V-MED = pseudo-código agregado (V-7+V-10: farmacovigilancia/URM/DIGEMID/SISMED), ~3% estable.
export interface CriticalTopic { code: string; label: string; area: string; accent: string; pct?: number; band?: string; rebote?: boolean }
export const ENCAPS_CRITICAL_TOPICS: CriticalTopic[] = [
  { code: 'I-3',   label: 'Vigilancia epi · 8 sub-ejes (tipos, notificación, Hill, brote, TLP…)', area: 'I',   accent: Colors.purple, pct: 11, band: '9–14' },
  { code: 'V-2',   label: 'Planeamiento · clima+calidad · residuos/bioseguridad', area: 'V',   accent: Colors.gold,   pct: 10, band: '8–14' },
  { code: 'IV-1/2', label: 'Método científico · tipos de estudio · muestreo · instrumentos', area: 'IV', accent: Colors.brass, pct: 5, band: '2–8' },
  { code: 'I-4',   label: 'Dengue completo · rabia · EPP por patógeno · zoonosis', area: 'I',   accent: Colors.purple, pct: 5, band: '3–8' },
  { code: 'II-3',  label: 'Esquema + novedades gestante (VRS/Tdap) · ESAVI + kit · cadena de frío', area: 'II', accent: Colors.blue, pct: 5, band: '3–7' },
  { code: 'III-5', label: 'Interculturalidad / pertinencia cultural', area: 'III', accent: '#7C83D6', pct: 5, band: '4–6' },
  { code: 'II-5',  label: 'NTS adolescente + MCI/curso de vida (emergente 0→5)', area: 'II', accent: Colors.blue, pct: 4, band: '2–6' },
  { code: 'II-4',  label: 'Anemia/CRED · cifras de suplementación', area: 'II', accent: Colors.blue, pct: 4, band: '2–5' },
];
// ALTA con flag de REBOTE (anti-persistentes: aplastados en 2026-II, sesgo de rebote en 2027-I).
export const ENCAPS_REBOTE_TOPICS: CriticalTopic[] = [
  { code: 'II-1',  label: 'Gestante: parto/emergencias obstétricas + lactancia', area: 'II', accent: Colors.blue, pct: 2, band: '1–5', rebote: true },
  { code: 'II-11', label: 'ITS · VIH-sífilis dual (PrEP/PTMI · PGB 2.4 M UI)', area: 'II', accent: Colors.blue, pct: 2, band: '1–5', rebote: true },
  { code: 'II-8',  label: 'HEARTS: HTA/DM · ECNT (150 min OMS, HbA1c)', area: 'II', accent: Colors.blue, pct: 2, band: '1–4', rebote: true },
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

// ── MINI-SIMULACRO de viernes (régimen MANTENIMIENTO 2027-I): 25Q · 72 s/Q · receta fija por vector v3 ──
// Espejo de RECETA_MINISIM en DATA/_scripts/_encaps_ciclo_v3.js (la siembra la escribe en study_schedule.extra).
export const ENCAPS_MINISIM_META = {
  totalQ: 25,
  receta: { II: 8, I: 7, V: 5, III: 3, IV: 2 } as Record<string, number>,
  vinetaPct: 50,            // 50/50 viñeta-directa
  criticosMin: 10,          // ≥10Q de los 8 críticos v3
  fallosPreviosMin: 5,      // ≥5Q rehechas con otro enfoque (registro de errores)
  colaLargaQ: '5-6',        // 5-6Q para los 2 códigos de cola larga del viernes
  segPorQ: 72,
  umbral: 18,               // ≥18/25 hacia diciembre (línea oro del gráfico)
  alerta: 15,               // <15/25 dos viernes seguidos → re-ponderar la semana siguiente
} as const;
// nota /25 → zona: verde ≥18 (umbral) · ámbar 15-17 · rojo <15 (alerta)
export function encapsMiniSimZone(nota: number | null | undefined): 'go' | 'warn' | 'nogo' | 'none' {
  if (nota == null) return 'none';
  if (nota >= ENCAPS_MINISIM_META.umbral) return 'go';
  if (nota >= ENCAPS_MINISIM_META.alerta) return 'warn';
  return 'nogo';
}

// ── % CIEGO REAL (correctas SEGURAS / total): la única métrica que manda (README_SISTEMA_TRACKING). ──
export const ENCAPS_CIEGO_META_PCT = 85;     // ≥17/20 → 85% (meta del régimen)
export const ENCAPS_CIEGO_CRUCERO_PCT = 75;  // umbral de crucero en bancos del día
export function encapsCiegoZone(pct: number | null | undefined): 'go' | 'warn' | 'nogo' | 'none' {
  if (pct == null) return 'none';
  if (pct >= ENCAPS_CIEGO_META_PCT) return 'go';
  if (pct >= ENCAPS_CIEGO_CRUCERO_PCT) return 'warn';
  return 'nogo';
}

export const ENCAPS_TELEMETRY_META = {
  disclaimer: 'estimación walk-forward v3 (7 exámenes) · MAE 3.2 pp en el último fold, ranking 5/5 · bandas, no puntos · el MINSA no publica pesos por área',
  formato: 'formato 2027-I: viñeta 45-70% (2026-II bajó a 49%) → entrenar viñeta + recall de cifras',
  confianza: 'MEDIA-ALTA',
  fuente: 'PRONOSTICO_WALKFORWARD_2027-1_v3 §2-§3 (27-ago-2026) · vector II30·I27·V21·III13·IV9 · 8 críticos + 3 rebote',
} as const;
