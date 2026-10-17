/**
 * plantillasV6.ts — BLOQUES DEL DÍA por fase v6.00 (V6_ESPEC §A1 · §B2 · §B4.1 · §B5 · §C3 · §E · §F). Lo pinta el Home (TodayMission).
 *
 * v6.00 (6-oct-2026): nuevo. `bloquesDelDia(iso, turno?)` / `plantillaDelDia(iso, turno?)` devuelven la línea de tiempo del día:
 *  · F1 (lun 19-oct → mié 30-dic en v6.02; v6.01: lun 12-oct → mié 30-dic · v6.00: mié 7-oct → mié 30-dic) = los bloques de hoy (v5.20): 04:15 vibecoding · 05:00 Anki USMLE · 07:15-12:00 Step 1 ·
 *    12:30 SYNAPSE · 13:30 R↔D 45' · 14:15 AURUM 60' · 15:15 MIR · 16:15 ENCAPS 1 h · 17:15 LIVIANO · 18:00 eval; sábado 07:15 revisión.
 *  · F2 (lun 4-ene → D-1 hábil del ENCAPS) = intensiva ENCAPS + Step 1 en PAUSA (mantenimiento): 05:00-05:45 Anki ENCAPS+USMLE ·
 *    07:15-12:00 loop · 13:30 R↔D (30' «Research mínimo» en los días-Research de la pausa de átomos) · 14:15-14:45 AURUM 30' ·
 *    15:15 MIR · 16:15 carril B (L-J hasta el D-3) · 17:15 LIVIANO (→ 12-feb) · 18:00 eval 20Q; viernes SIM 100Q; sábado 07:15
 *    revisión + 07:45 STEP 1 VIVO; jue D-2 dress rehearsal 11:00-13:00.
 *  · F3 (martes tras el ENCAPS → víspera del SERUMS) = F1 + 16:15 REENTRADA (7h15) con R↔D 45' · AURUM 30' (→ 15-abr) · MIR.
 *  · F4 (SERUMS, L-S) = plantilla por TURNO M/T/L/G (FRANJAS_F4 de usmleStep1Daily, §B4.1; variantes de hora del T) y, si ese día cae
 *    un hito tras ordenSemana (serumsTurnos), plantilla H (turno T o feriado sin turno) o H-sáb (fallback, condición degradada).
 *    Taper: solo bloque A (≤2 h; D95 ≤1 h). Domingo LIBRE.
 *  · Días protegidos / SKIP / transición / ritual / viaje / examen: plantillas propias.
 * Cada bloque lleva `frente` (para homeBriefing.minimoPorFrente) y `min` (minutos planificados). MIR siempre 1 h y R↔D siempre
 * ≥ 30' en toda plantilla de día de plan (DJ-4). Determinista salvo el turno (caché local de serumsTurnos).
 *
 * v6.02 (17-oct-2026 · corrimiento D1 = lun 19-oct): F1 = LUN 19-OCT → MIÉ 30-DIC (52 hábiles); F2, F3, F4 y el examen sin cambio. Fines de
 *  cada frente (de sus metas): LIVIANO → mié 24-feb · AURUM → mar 27-abr · SYNAPSE → vie 26-feb · vibecoding → mié 3-mar · MIR 1.ª vuelta → lun 8-feb.
 * v6.01 (10-oct-2026 · corrimiento D1 = lun 12-oct): F1 = LUN 12-OCT → MIÉ 30-DIC (57 hábiles; v6.00: mié 7-oct → mié 30-dic); F2, F3,
 *  F4 y el examen sin cambio. Las fechas de fin de cada frente salen de sus metas (no de este texto): LIVIANO → mié 17-feb (LIV_META.fin;
 *  v6.00: vie 12-feb) · AURUM → mar 20-abr (AURUM_PLAN_META.fin; v6.00: jue 15-abr) · SYNAPSE → vie 19-feb · vibecoding → mié 24-feb.
 */
import { FECHAS_V6, DERIVADOS_V6, SKIP_V6, faseV6, motivoProtegido, esFeriado, ultimoHabilAntes } from './fechasV6';
import type { FaseV6, Turno } from './fechasV6';
import { FRANJAS_F4, FRANJA_F3_REENTRADA, estadoUSMLE, esHito, esFilaT2 } from './usmleStep1Daily';
import type { DiaUSMLEPlan, DiaUSMLE_T2, FranjaF4, PlantillaF4 } from './usmleStep1Daily';
import { infoTurno, ordenSemanaDe, filaT2DelDia, filasEmpujadas, dowCorto } from './serumsTurnos';
import type { HitoAsignado } from './serumsTurnos';
import { diaEstudioTipo } from './researchData';
import { DAILY_META as RESEARCH_META } from './researchDailyPlan';
import { AURUM_PLAN_META } from './aurumDailyPlan';
import { LIV_META } from './livianoStudyPlan';
import { SYN_PLAN_META } from './synapseDailyPlan';
import { VIBE_META } from './vibecodingPlan';
import type { Frente } from './homeBriefing';

export type PlanBloque = 'usmle' | 'encaps' | 'mir' | 'research-derma' | 'aurum' | 'liviano' | 'synapse' | 'vibecoding'
  | 'serums' | 'gimnasio' | 'vida' | 'revision';
export interface BloqueV6 {
  /** clave estable (React) */
  id: string;
  /** 'HH:MM' · null = sin hora fija (tiempo muerto de la posta / guardia) */
  ini: string | null; fin: string | null;
  /** texto de la hora tal cual se muestra */
  hora: string;
  nombre: string;
  detalle?: string;
  plan: PlanBloque;
  /** frente del modo mínimo (VERDE/ÁMBAR/ROJO) · null = SERUMS, gimnasio, vida */
  frente: Frente | null;
  /** minutos planificados (de ini/fin o declarados en los bloques de tiempo muerto) */
  min: number | null;
}
export type PlantillaId = 'F1' | 'F1-sáb' | 'TRANSICION' | 'F2' | 'F2-vie' | 'F2-sáb' | 'F2-D2' | 'F3' | 'F3-sáb'
  | 'M' | 'T' | 'L' | 'G' | 'H' | 'H-sáb' | 'TAPER' | 'RITUAL' | 'VIAJE' | 'EXAMEN' | 'PROTEGIDO' | 'DOMINGO' | 'SKIP' | 'F5';
export interface PlantillaDia {
  fecha: string;
  fase: FaseV6;
  plantilla: PlantillaId;
  titulo: string;
  /** F4: turno efectivo (marcado o default 'M') · null fuera del SERUMS */
  turno: Turno | null;
  turnoMarcado: boolean;
  horaInicio: string | null;
  protegido: string | null;
  feriado: boolean;
  /** fila del Step 1 que toca hoy (F4: tras el reorden de ordenSemana) · null en PAUSA / sin fila */
  usmle: DiaUSMLEPlan | null;
  /** F4: hito asignado HOY (ventana, plantilla H/H-sáb, motivo) */
  hito: HitoAsignado | null;
  /** F4: day-after empujado desde la semana anterior (se hace hoy además de la fila del día) */
  extra: DiaUSMLE_T2[];
  bloques: BloqueV6[];
  notas: string[];
}

// ── utilidades de hora ──
const RANGO = /(\d{2}:\d{2})\s*[–-]\s*(\d{2}:\d{2})/;
const PUNTO = /^(\d{2}:\d{2})$/;
const aMin = (h: string): number => { const [a, b] = h.split(':'); return Number(a) * 60 + Number(b); };
const aHHMM = (m: number): string => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
const desplazar = (h: string | null, off: number): string | null => (h ? aHHMM(aMin(h) + off) : h);
function bloque(id: string, ini: string | null, fin: string | null, nombre: string, plan: PlanBloque, frente: Frente | null, detalle?: string, minDeclarado?: number, hora?: string): BloqueV6 {
  const min = ini && fin ? Math.max(0, aMin(fin) - aMin(ini)) : (minDeclarado ?? null);
  return { id, ini, fin, hora: hora ?? (ini && fin && ini !== fin ? `${ini}–${fin}` : ini ?? 'tiempo muerto'), nombre, plan, frente, min, ...(detalle ? { detalle } : {}) };
}
const ordenar = (bs: BloqueV6[]): BloqueV6[] => bs.slice().sort((a, b) => (a.ini == null ? 1 : 0) - (b.ini == null ? 1 : 0) || (a.ini && b.ini ? aMin(a.ini) - aMin(b.ini) : 0));
const isoADate = (iso: string): Date => { const [y, m, d] = iso.split('-').map(Number); return new Date(y as number, (m as number) - 1, d as number); };
const _D = (s: string): Date => new Date(s + 'T12:00:00Z');
const dow = (iso: string): number => _D(iso).getUTCDay();
const addDias = (s: string, n: number): string => { const d = _D(s); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

/** Pausa de átomos de Research (texto «AAAA-MM-DD → AAAA-MM-DD · …» de researchDailyPlan.DAILY_META.pausa). */
const PAUSA_RESEARCH = (() => { const m = /^(20\d\d-\d\d-\d\d) → (20\d\d-\d\d-\d\d)/.exec(String(RESEARCH_META.pausa || '')); return m ? { desde: m[1] as string, hasta: m[2] as string } : null; })();
/** ¿Día-Research dentro de la pausa de átomos (15-ene → 10-feb)? → 30' «Research mínimo (DJ-4)» sin átomo (§E). */
export function esResearchMinimo(iso: string): boolean {
  return !!PAUSA_RESEARCH && iso >= PAUSA_RESEARCH.desde && iso <= PAUSA_RESEARCH.hasta && diaEstudioTipo(isoADate(iso)) === 'research';
}
/** Bloque Research ↔ Derma del día (interdiario; 45' en F1-F3, 30' en la pausa de Research y en F4). */
function bloqueRD(iso: string, ini: string, minutos: number): BloqueV6 {
  const tipo = diaEstudioTipo(isoADate(iso));
  if (esResearchMinimo(iso)) return bloque('rd', ini, aHHMM(aMin(ini) + 30), "RESEARCH · mínimo 30' (DJ-4) — pausa de átomos", 'research-derma', 'research-derma', 'inbox de revisores/editorial + 1 lectura de la cola del ciclo 2 + repaso del paquete congelado del case report (sin átomo nuevo)');
  const quien = tipo === 'research' ? 'RESEARCH (hoy)' : tipo === 'derma' ? 'DERMA (hoy)' : 'Research ↔ Derma';
  return bloque('rd', ini, aHHMM(aMin(ini) + minutos), `${quien} · interdiario ${minutos}'`, 'research-derma', 'research-derma');
}

// ── F1 / F2 / F3 (L-V) ──
const enRango = (iso: string, hasta: string): boolean => iso <= hasta;
function bloquesF1(iso: string): BloqueV6[] {
  const bs: BloqueV6[] = [
    bloque('vibe', '04:15', '05:00', 'IA · VIBECODING con Claude Code (1 proyecto real/semana)', 'vibecoding', 'vibecoding'),
    bloque('anki', '05:00', '05:45', 'USMLE · ANKI AM (madrugada fresca · Palmerton 2x)', 'usmle', 'usmle-anki'),
    bloque('usmle', '07:15', '12:00', 'USMLE · BLOQUE PRINCIPAL (Anki → Pre-test → Deep Prime → 30Q)', 'usmle', 'usmle-principal'),
    bloque('syn', '12:30', '13:00', "SYNAPSE · 30' (A pantalla · B audio · C lectura)", 'synapse', 'synapse'),
    bloqueRD(iso, '13:30', 45),
    bloque('aurum', '14:15', '15:15', "AURUM · closer de ventas (60')", 'aurum', 'aurum'),
    bloque('mir', '15:15', '16:15', 'MIR · Eval D-1 + Deep Work (1 h)', 'mir', 'mir'),
    bloque('encaps', '16:15', '17:15', 'ENCAPS · 1h banqueo (mantenimiento 2027-I)', 'encaps', 'encaps'),
    bloque('liv', '17:15', '18:00', 'LIVIANO · Academia (obesidad/GLP-1/nutrición)', 'liviano', 'liviano'),
    bloque('eval', '18:00', '18:45', 'USMLE · Evaluación acumulativa (modo examen)', 'usmle', 'usmle-eval'),
  ];
  return bs;
}
/** D-2 del ENCAPS (jue antes del D-1 hábil): dress rehearsal 11:00-13:00, sin loop, sin eval, sin carril B (§C3). */
const D2_ENCAPS = ultimoHabilAntes(DERIVADOS_V6.d1HabilEncaps);
/** Viernes del núcleo con SIM a las 11:00 (#7 y #8 = los dos últimos viernes del núcleo, §C3); el resto 07:15. */
const SIM_11 = new Set<string>([FECHAS_V6.encaps.nucleo_hasta, addDias(FECHAS_V6.encaps.nucleo_hasta, -7)]);
function bloquesF2(iso: string): { id: PlantillaId; bs: BloqueV6[] } {
  const w = dow(iso);
  const comunes = (): BloqueV6[] => {
    const bs: BloqueV6[] = [];
    if (enRango(iso, VIBE_META.finTaper)) bs.push(bloque('vibe', '04:15', '05:00', 'IA · VIBECODING (taper por el ENCAPS)', 'vibecoding', 'vibecoding'));
    bs.push(bloque('anki', '05:00', '05:45', "ANKI · ENCAPS::Cifras (15') + USMLE mantenimiento (30', 0 nuevas, FSRS 0,85)", 'usmle', 'usmle-anki', 'Step 1 en PAUSA (§B2): solo Anki · el sábado 07:45 «STEP 1 VIVO» 20Q mezcladas'));
    if (enRango(iso, SYN_PLAN_META.fin)) bs.push(bloque('syn', '12:30', '13:00', "SYNAPSE · 30'", 'synapse', 'synapse'));
    bs.push(bloqueRD(iso, '13:30', 45));
    if (enRango(iso, AURUM_PLAN_META.fin)) bs.push(bloque('aurum', '14:15', '14:45', "AURUM · 30' (núcleo · DJ-4)", 'aurum', 'aurum'));
    bs.push(bloque('mir', '15:15', '16:15', 'MIR · 1 h (DJ-4)', 'mir', 'mir'));
    if (enRango(iso, LIV_META.fin)) bs.push(bloque('liv', '17:15', '18:00', 'LIVIANO · Academia', 'liviano', 'liviano'));
    return bs;
  };
  if (iso === D2_ENCAPS) {
    const bs = comunes().filter((b) => b.id !== 'liv');
    bs.push(bloque('encaps', '11:00', '13:00', 'ENCAPS · DRESS REHEARSAL (D-2) 11:00-13:00 · examen completo a la hora real', 'encaps', 'encaps', 'sin loop, sin eval 18:00 y sin carril B (§C3)'));
    return { id: 'F2-D2', bs };
  }
  if (w === 5) {
    const pretest = iso === FECHAS_V6.encaps.pretest;
    const once = SIM_11.has(iso);
    const bs = comunes();
    bs.push(pretest
      ? bloque('encaps', '07:15', '09:15', 'ENCAPS · PRE-TEST 2026-II 100Q (clave oficial)', 'encaps', 'encaps', 'reordena el núcleo por índice de brecha (--pretest)')
      : once
        ? bloque('encaps', '11:00', '13:00', 'ENCAPS · SIM 100Q (11:00-13:00, hora del 2026-I)', 'encaps', 'encaps', 'corrección después del SIM + 2 códigos peores')
        : bloque('encaps', '07:15', '09:15', 'ENCAPS · SIM 100Q (07:15-09:15)', 'encaps', 'encaps'));
    if (!pretest && !once) bs.push(bloque('encaps-corr', '09:30', '12:00', 'ENCAPS · corrección 09:30-11:00 + 2 códigos peores 11:00-12:00', 'encaps', 'encaps'));
    bs.push(bloque('eval', '18:00', '18:45', 'ENCAPS · EVAL 20Q (10 + 10) · cierre semanal (--pull)', 'encaps', 'encaps', 'viernes: sin carril B (16:15 libre tras el SIM)'));
    return { id: 'F2-vie', bs };
  }
  const bs = comunes();
  bs.push(bloque('encaps', '07:15', '12:00', 'ENCAPS · LOOP (repaso D-1/D-7/D-21 · pre-test 10Q · deep prime · 30Q)', 'encaps', 'encaps', '05:00 Anki cifras · 07:15 repaso espaciado (60\') · 08:15 PRE-TEST 10Q ciegas (45\') · 09:00 DEEP PRIME norma/NTS + cifras (120\') · 11:00 CONSOLIDACIÓN 30Q + cierre (60\') · 12:00 registro (15\') — el tipo del día (señales, calentamiento, barrido, repaso final…) está en ENCAPS → Plan'));
  if (iso < D2_ENCAPS) bs.push(bloque('carrilb', '16:15', '17:15', 'ENCAPS · CARRIL B (fila de mantenimiento 61-92 o reposición)', 'encaps', 'encaps', 'claves b_ · cierre APP_CARRIL_B_<fecha>_<código>'));
  bs.push(bloque('eval', '18:00', '18:45', 'ENCAPS · EVAL modo examen 20Q a 72 s (10 del sub-eje + 10 de hace 7-21 días)', 'encaps', 'encaps'));
  return { id: 'F2', bs };
}
function bloquesF3(iso: string, usmle: DiaUSMLEPlan | null): BloqueV6[] {
  const hito = !!usmle && esHito(usmle);
  const r = /\((\d{2}:\d{2})-(\d{2}:\d{2})\)/.exec(usmle?.sub ?? '');
  const [ri, rf] = FRANJA_F3_REENTRADA.hora.split('–');
  const bs: BloqueV6[] = [
    bloque('anki', '05:00', '05:45', 'USMLE · ANKI AM', 'usmle', 'usmle-anki'),
    hito
      ? bloque('usmle', r ? (r[1] as string) : '07:00', r ? (r[2] as string) : '12:30', 'USMLE · HITO (sustituye al bloque de la mañana)', 'usmle', 'usmle-principal')
      : bloque('usmle', '07:15', '12:00', 'USMLE · BLOQUE PRINCIPAL (Anki → Pre-test → Deep Prime → 30Q)', 'usmle', 'usmle-principal'),
    bloqueRD(iso, '13:30', 45),
  ];
  if (enRango(iso, AURUM_PLAN_META.fin)) bs.push(bloque('aurum', '14:15', '14:45', "AURUM · 30' (núcleo · DJ-4)", 'aurum', 'aurum'));
  bs.push(bloque('mir', '15:15', '16:15', 'MIR · 1 h (DJ-4)', 'mir', 'mir'));
  bs.push(bloque('reentrada', ri ?? '16:15', rf ?? '17:15', 'USMLE · 16:15 REENTRADA (20Q timed del sistema de la rotación)', 'usmle', 'usmle-principal', usmle?.franjaNota));
  bs.push(bloque('eval', '18:00', '18:45', hito ? 'USMLE · registrar el % del hito + corrección' : 'USMLE · Evaluación acumulativa (modo examen)', 'usmle', 'usmle-eval'));
  return bs;
}
const SABADO_REVISION = (): BloqueV6 => bloque('revision', '07:15', '07:45', 'REVISIÓN SEMANAL (DATA/REVISION_SEMANAL.md)', 'revision', null);

// ── F4 (SERUMS): FRANJAS_F4 por turno ──
const FRENTE_F4: Record<string, PlanBloque> = { step1: 'usmle', hito: 'usmle', mir: 'mir', 'research-derma': 'research-derma', serums: 'serums', gimnasio: 'gimnasio', vida: 'vida' };
/** De una franja §B4.1 a bloque. `turnoH` elige la variante de las entradas mixtas de la plantilla H («(turno T)» / «(día L)»). */
function franjaABloque(f: FranjaF4, i: number, turnoH: 'T' | 'L' | null): BloqueV6 | null {
  let hora = f.hora;
  if (turnoH) {
    const marcaT = /\(turno T\)|\(T\)/, marcaL = /\(día L\)|\(L\)/;
    if (hora.includes(' · ') && marcaT.test(hora) && marcaL.test(hora)) {
      const seg = hora.split(' · ').find((s) => (turnoH === 'T' ? marcaT : marcaL).test(s));
      hora = (seg ?? hora).replace(/\s*\((turno T|día L|T|L)\)/, '').trim();
    } else if (marcaT.test(hora) && turnoH !== 'T') return null;
    else if (marcaL.test(hora) && turnoH !== 'L') return null;
    else hora = hora.replace(/\s*\((turno T|día L|T|L)\)/, '').trim();
  }
  const plan = FRENTE_F4[f.frente] ?? 'vida';
  const frente: Frente | null = f.frente === 'mir' ? 'mir' : f.frente === 'research-derma' ? 'research-derma'
    : f.frente === 'step1' || f.frente === 'hito' ? (/BLOQUE|HITO/.test(f.fase) || !/anki/i.test(f.fase) ? 'usmle-principal' : 'usmle-anki') : null;
  const r = RANGO.exec(hora), p = PUNTO.exec(hora);
  const ini = r ? (r[1] as string) : p ? (p[1] as string) : null;
  const fin = r ? (r[2] as string) : p ? (p[1] as string) : null;
  const tm = /tiempo muerto|guardia|cuando se pueda/i.test(hora);
  const minDecl = f.frente === 'mir' && !ini ? 60 : f.frente === 'research-derma' && (!ini || tm) ? 30 : /Anki USMLE 25'/.test(f.fase) && !ini ? 25 : undefined;
  const b = bloque(`f4-${i}`, ini, fin, f.fase, plan, frente, undefined, minDecl, hora);
  // franjas «07:00–13:00 (tiempo muerto)»: el R↔D va DENTRO del turno → 30' declarados, no las 6 h del rango
  if (tm && ini && f.frente === 'research-derma') return { ...b, min: 30 };
  return b;
}
/** Variante del turno T según la hora de inicio de la posta (§B4.1): 12:00-18:00 explícita · 14:00-20:00 = todo +30'. */
function varianteT(bs: BloqueV6[], horaInicio: string | null): { bs: BloqueV6[]; nota: string | null } {
  if (horaInicio === '14:00') {
    return { bs: bs.map((b) => ({ ...b, ini: desplazar(b.ini, 30), fin: desplazar(b.fin, 30), hora: b.ini ? b.hora.replace(/\d{2}:\d{2}/g, (h) => aHHMM(aMin(h) + 30)) : b.hora })), nota: "turno T 14:00-20:00 → todo +30' y dormir 21:30-04:30 (§B4.1)" };
  }
  if (horaInicio === '12:00') {
    const v: BloqueV6[] = [
      bloque('f4-v0', '04:00', '04:00', 'Despertar', 'vida', null),
      bloque('f4-v1', '04:05', '06:05', 'STEP 1 · BLOQUE A (2 h): contenido nuevo (la fila del día)', 'usmle', 'usmle-principal'),
      bloque('f4-v2', '06:10', '07:00', 'Ducha + desayuno (el gimnasio pasa a las 19:00)', 'vida', null),
      bloque('f4-v3', '07:00', '09:30', 'STEP 1 · BLOQUE B: 40Q timed + revisión (qDiaT: AMBOSS / incorrectas uWorld)', 'usmle', 'usmle-principal'),
      bloque('f4-v4', '09:30', '09:55', 'Anki USMLE', 'usmle', 'usmle-anki'),
      bloque('f4-v5', '09:55', '10:55', 'MIR 1 h (DJ-4)', 'mir', 'mir'),
      bloque('f4-v6', '10:55', '11:20', 'Almuerzo · salida 11:20', 'vida', null),
      bloque('f4-v7', '12:00', '18:00', 'SERUMS · turno TARDE (12:00-18:00)', 'serums', null),
      bloque('f4-v8', '12:00', '18:00', "Research ↔ Derma 30' en tiempo muerto de la posta (DJ-4)", 'research-derma', 'research-derma', undefined, 30, '12:00–18:00 (tiempo muerto)'),
      bloque('f4-v9', '19:00', '20:00', 'Gimnasio', 'gimnasio', null),
      bloque('f4-v10', '21:00', '21:00', 'Dormir', 'vida', null),
    ];
    v[8] = { ...(v[8] as BloqueV6), min: 30 };
    return { bs: v, nota: 'turno T 12:00-18:00 → bloque B 07:00-09:30 · Anki 09:30 · MIR 09:55-10:55 · salida 11:20 · gimnasio 19:00-20:00 (§B4.1)' };
  }
  return { bs, nota: null };
}
function bloquesDePlantilla(p: PlantillaF4, turnoH: 'T' | 'L' | null): BloqueV6[] {
  return (FRANJAS_F4[p] ?? []).map((f, i) => franjaABloque(f, i, turnoH)).filter((b): b is BloqueV6 => !!b);
}

// ── API ──
/** Plantilla completa del día (bloques + contexto). `turno` = el del selector; si falta, el marcado (o 'M' por defecto). */
export function plantillaDelDia(iso: string, turno?: Turno): PlantillaDia {
  const fase = faseV6(iso);
  const prot = motivoProtegido(iso);
  const feriado = esFeriado(iso);
  const enSerums = iso >= FECHAS_V6.serums.inicio;
  const it = infoTurno(iso);
  const turnoEf: Turno | null = enSerums ? (turno ?? it.turno) : null;
  const est = estadoUSMLE(iso);
  const usmleExacto = est.estado === 'PLAN' && est.exacto ? est.dia : null;
  const base: PlantillaDia = {
    fecha: iso, fase, plantilla: 'F1', titulo: '', turno: turnoEf, turnoMarcado: enSerums ? (turno != null || it.marcado) : false,
    horaInicio: enSerums ? it.horaInicio : null, protegido: prot, feriado, usmle: usmleExacto, hito: null, extra: [], bloques: [], notas: [],
  };
  const out = (plantilla: PlantillaId, titulo: string, bloques: BloqueV6[], extra: Partial<PlantillaDia> = {}): PlantillaDia =>
    ({ ...base, plantilla, titulo, bloques: ordenar(bloques), ...extra });
  const w = dow(iso);

  // 1) días protegidos (A3): solo lo indicado
  if (prot) {
    if (iso === FECHAS_V6.step1.ritual) {
      const t = turnoEf ?? 'M';
      const posta = t === 'T' ? bloque('serums', '13:00', '19:00', 'SERUMS · turno TARDE', 'serums', null) : t === 'M' ? bloque('serums', '07:00', '13:00', 'SERUMS · turno MAÑANA', 'serums', null)
        : t === 'G' ? bloque('serums', null, null, 'SERUMS · GUARDIA', 'serums', null, undefined, undefined, 'guardia') : bloque('serums', null, null, 'sin posta hoy', 'vida', null, undefined, undefined, '—');
      return out('RITUAL', `RITUAL de test-day · ${prot}`, [posta, bloque('ritual', null, null, 'SIN ESTUDIO · ritual de test-day: permiso impreso + digital, 2 ID idénticas, Ziploc por break, pasaje, ruta y dormir', 'usmle', null, undefined, undefined, 'todo el día')],
        { notas: ['Día protegido: sin MIR, Research, Derma ni AURUM (§A3).'] });
    }
    if (iso === FECHAS_V6.step1.viaje_d1) return out('VIAJE', `D-1 · ${prot}`, [bloque('viaje', null, null, 'VIAJE Huancayo → Lima · sin estudio · dormir ≥7 h cerca del Prometric', 'vida', null, undefined, undefined, 'todo el día')]);
    if (iso === FECHAS_V6.step1.examen) return out('EXAMEN', `EXAMEN Step 1${FECHAS_V6.step1.provisional ? ' (PROVISIONAL)' : ''}`, [bloque('examen', '07:00', '16:00', 'EXAMEN USMLE STEP 1 · Prometric', 'usmle', null)]);
    if (iso === DERIVADOS_V6.d1HabilEncaps) {
      return out('PROTEGIDO', `${prot} · ENCAPS medio día`, [
        bloque('anki', '05:00', '05:45', 'ANKI · ENCAPS::Cifras + USMLE mantenimiento', 'usmle', 'usmle-anki'),
        bloque('encaps', '07:15', '12:00', 'ENCAPS · MEDIO DÍA (D-1 hábil): repaso ligero + logística · nada nuevo · tarde libre', 'encaps', 'encaps'),
      ], { notas: ['Día protegido: sin MIR, Research, Derma ni AURUM (§A3; si prefieres tu hora de MIR esta tarde, es decisión tuya, §I).'] });
    }
    if (iso === FECHAS_V6.encaps.examen) return out('PROTEGIDO', `EXAMEN ENCAPS${FECHAS_V6.encaps.provisional ? ' (PROVISIONAL)' : ''}`, [bloque('encaps', '11:00', '13:00', `EXAMEN ENCAPS / SERUMS 2027-I${FECHAS_V6.encaps.provisional ? ' · PROVISIONAL (se fija con la convocatoria)' : ''}`, 'encaps', null)]);
    return out('PROTEGIDO', `DÍA PROTEGIDO · ${prot}`, [], { notas: ['Sin sesión de ningún plan (§A3). Descanso.'] });
  }
  // 2) SKIP (sin sesión de ningún plan)
  if (SKIP_V6.has(iso)) return out('SKIP', 'Sin sesión (feriado / SKIP v6)', [], { notas: ['Ningún plan tiene sesión hoy (25-dic · 31-dic · 1-ene · Jueves y Viernes Santo).'] });
  // 3) domingo
  if (w === 0) return out('DOMINGO', 'DOMINGO · libre', [], { notas: ["Anki ≤15' opcional (no se registra)."] });

  switch (fase) {
    case 'TRANSICION':
      return out('TRANSICION', 'TRANSICIÓN · sin sesión (Anki opcional)', [], { notas: ['Step 1 en PAUSA desde hoy: 0 tarjetas nuevas; la intensiva ENCAPS arranca el lun 4-ene.'] });
    case 'LIBRE_POST_ENCAPS':
      return out('PROTEGIDO', 'LIBRE post-ENCAPS', []);
    case 'EXAMEN':
      return out('EXAMEN', 'EXAMEN Step 1', []);
    case 'F5':
      return out('F5', 'F5 · post-Step 1 (esbozo)', [bloque('mir', '15:15', '16:15', 'MIR · fase principal (oct-2027)', 'mir', 'mir')],
        { notas: [iso === addDias(FECHAS_V6.step1.examen, 1) ? 'Regreso a la posta (permiso 1 día; 2 si hoy tienes turno M).' : 'F5 es un esbozo: MIR principal hasta el fin del SERUMS; CURVA/DENSA y Derma c2+ se planifican después del Step 1.'] });
    case 'F1':
      if (w === 6) return out('F1-sáb', 'Sábado · libre (revisión semanal)', [SABADO_REVISION()]);
      return out('F1', 'F1 · Step 1 tramo 1 + ENCAPS lento', bloquesF1(iso));
    case 'F2': {
      if (w === 6) return out('F2-sáb', 'Sábado · revisión semanal + STEP 1 VIVO', [SABADO_REVISION(),
        bloque('vivo', '07:45', '09:15', 'STEP 1 VIVO · 20Q timed MEZCLADAS (10 incorrectas UWorld + 10 nuevas AMBOSS) + revisión', 'usmle', 'usmle-principal', 'mantenimiento del Step 1 en PAUSA (§B2): no gastar uWorld fresco')]);
      const { id, bs } = bloquesF2(iso);
      return out(id, 'F2 · ENCAPS intensiva (Step 1 en PAUSA)', bs, { usmle: null });
    }
    case 'F3':
      if (w === 6) return out('F3-sáb', 'Sábado · libre (revisión semanal)', [SABADO_REVISION()]);
      return out('F3', 'F3 · Step 1 tiempo completo (7h15)', bloquesF3(iso, usmleExacto));
    case 'F4': {
      const t = turnoEf ?? 'M';
      const forzado = turno != null ? { [iso]: turno } : undefined;   // el turno del selector cuenta para el reorden del hito
      const orden = ordenSemanaDe(iso, forzado);
      const fila = filaT2DelDia(iso, forzado);
      const extra = filasEmpujadas(iso);
      const hitoHoy = orden.hitos.find((h) => h.real === iso) ?? null;
      const usmle: DiaUSMLEPlan | null = fila ?? null;
      const notas: string[] = [];
      if (!it.marcado && turno == null && !hitoHoy) notas.push('Turno sin marcar → se asume M (PISO). Marca tu turno (M · T · L · G).');
      if (feriado && !it.marcado) notas.push('Feriado: si la posta no programa turno → marca L (día doble).');
      if (fila === null) notas.push('Hueco liberado por el reorden del hito → haz una fila atrasada (o la del colchón).');
      if (extra.length) notas.push(`Además hoy: ${extra.map((x) => x.sub.split(':')[0]).join(' · ')} (empujado por el hito del sábado).`);
      if (orden.reordenada && !hitoHoy && fila) notas.push('Semana reordenada por el turno del hito (§B5): la fila de hoy no es la del plan original.');
      if (hitoHoy) {
        const sub = hitoHoy.fila.sub;
        const r = /\((\d{2}:\d{2})-(\d{2}:\d{2})\)/.exec(sub);
        if (hitoHoy.plantilla === 'H-sáb') {
          const bs = bloquesDePlantilla('H-sáb', null);
          notas.push(hitoHoy.motivo);
          return out('H-sáb', `HITO · ${hitoHoy.fila.nombre ?? 'hito'} · CONDICIÓN DEGRADADA`, bs, { usmle, hito: hitoHoy, extra, notas, turno: 'M' });
        }
        const turnoH: 'T' | 'L' = it.marcado || turno != null ? (t === 'L' ? 'L' : 'T') : feriado ? 'L' : 'T';
        const bs = bloquesDePlantilla('H', turnoH).map((b) => (b.plan === 'usmle' && b.frente === 'usmle-principal' && b.ini === '07:00' && r ? { ...b, fin: r[2] as string, hora: `07:00–${r[2]}`, min: aMin(r[2] as string) - aMin('07:00') } : b));
        notas.push(hitoHoy.motivo);
        if (hitoHoy.pendienteMarcar) notas.push('Marca el turno de hoy: si es M o guardia, el hito se mueve al primer día T/L de su ventana.');
        if (hitoHoy.ensayoPartido) notas.push(hitoHoy.ensayoPartido);
        if (t === 'T' && it.horaInicio === '12:00') notas.push('Turno T 12:00 → el hito empieza a las 06:00 (§B5).');
        return out('H', `HITO · ${hitoHoy.fila.nombre ?? 'hito'} · plantilla H (${turnoH === 'L' ? 'sin turno' : 'turno T'})`, bs, { usmle, hito: hitoHoy, extra, notas });
      }
      let bs = bloquesDePlantilla(t, null);
      let pl: PlantillaId = t;
      if (t === 'T') { const v = varianteT(bs, it.horaInicio); bs = v.bs; if (v.nota) notas.push(v.nota); }
      const taper = !!usmle && esFilaT2(usmle) && usmle.tipo === 'taper';
      if (taper) {
        const d95 = (usmle as DiaUSMLE_T2).dOrig === 95;
        bs = bs.filter((b) => b.plan !== 'usmle' || !/BLOQUE (B|LARGO)/.test(b.nombre))
          .map((b) => (b.plan === 'usmle' && /BLOQUE A/.test(b.nombre) ? { ...b, nombre: d95 ? 'TAPER · sesión MÍNIMA ≤1 h (solo bloque A)' : 'TAPER · solo bloque A (≤2 h): 20Q flagged + Anki maduro + FA esquemas', ...(d95 && b.ini ? { fin: aHHMM(aMin(b.ini) + 60), hora: `${b.ini}–${aHHMM(aMin(b.ini) + 60)}`, min: 60 } : {}) } : b));
        pl = 'TAPER';
        notas.push('Semana de taper (§B6): MIR sigue 1 h · cero preguntas y tarjetas nuevas.');
      }
      if (w === 6) notas.push("Revisión semanal: 20' dentro del bloque de Step 1 de hoy.");
      if (iso <= FECHAS_V6.serums.adaptacion_hasta) notas.push('Inducción del SERUMS (2 primeras semanas): carga al 50 %.');
      const titulo = `F4 · SERUMS turno ${t}${it.horaInicio && t === 'T' ? ` ${it.horaInicio}` : ''}${it.marcado || turno != null ? '' : ' (sin marcar → M)'}`;
      return out(pl, titulo, bs, { usmle, extra, notas });
    }
  }
  return out('F1', 'F1', bloquesF1(iso));
}
/** Bloques del día (V6_ESPEC §F): F1 · F2 · F3 · F4 por turno M/T/L/G · H / H-sáb en día de hito. */
export function bloquesDelDia(iso: string, turno?: Turno): BloqueV6[] { return plantillaDelDia(iso, turno).bloques; }
/** DJ-4: ¿la plantilla trae MIR ≥ 60' y R↔D ≥ 30'? (lo usa la verificación; días sin plan → true). */
export function cumpleDJ4(p: PlantillaDia): { mir: boolean; rd: boolean } {
  const suma = (plan: PlanBloque) => p.bloques.filter((b) => b.plan === plan).reduce((a, b) => a + (b.min ?? 0), 0);
  return { mir: suma('mir') >= 60, rd: suma('research-derma') >= 30 };
}
export { dowCorto };
