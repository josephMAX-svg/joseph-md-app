/**
 * plantillasV6.ts — BLOQUES DEL DÍA por fase v6.00 (V6_ESPEC §A1 · §B2 · §B4.1 · §B5 · §C3 · §E · §F). Lo pinta el Home (TodayMission).
 *
 * v6.00 (6-oct-2026): nuevo. `bloquesDelDia(iso, turno?)` / `plantillaDelDia(iso, turno?)` devuelven la línea de tiempo del día:
 *  · F1 (lun 2-nov → mié 30-dic en v6.06; v6.05: lun 26-oct → mié 30-dic · v6.03: mié 21-oct → mié 30-dic · v6.02: lun 19-oct → mié 30-dic · v6.01: lun 12-oct → mié 30-dic · v6.00: mié 7-oct → mié 30-dic) = los bloques de hoy (v5.20): 04:15 vibecoding · 05:00 Anki USMLE · 07:15-12:00 Step 1 ·
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
 * v6.03 (20-oct-2026 · corrimiento D1 = mié 21-oct; lun 19 y mar 20 sin estudio): F1 = MIÉ 21-OCT → MIÉ 30-DIC (50 hábiles); F2, F3, F4 y el
 *  examen sin cambio. Fines de los frentes de rutina/Business (de sus metas, +2 hábiles): LIVIANO → vie 26-feb · AURUM → jue 29-abr · SYNAPSE →
 *  lun 1-mar · vibecoding → vie 5-mar · Business → jue 18-feb. Sáb 24 / dom 25-oct = fin de semana normal (revisión S01, Business 07:45, PC =
 *  AVANCE de S1 —su SHIP es el sáb 31-oct—, Feynman); `plantillaDelDia` solo marca CORRIDO el lun 19 y el mar 20 (corrida_s1 sin alias).
 * v6.05 (24-oct-2026 · corrimiento D1 = lun 26-oct; del lun 19 al dom 25-oct sin estudio, la semana corrida por alias v6.04a queda sin efecto):
 *  F1 = LUN 26-OCT → MIÉ 30-DIC (47 hábiles); F2, F3, F4 y el examen (lun 25-oct-2027, v6.04b) sin cambio. Fines de los frentes de rutina/Business
 *  (de sus metas, +3 hábiles sobre v6.03): LIVIANO → mié 3-mar · AURUM → mar 4-may · SYNAPSE → vie 5-mar · vibecoding → mié 10-mar · Business →
 *  mar 23-feb. `plantillaDelDia` marca CORRIDO del lun 19 al dom 25-oct (corrida_s1 solo con sin_sesion; alias y reparto vacíos: la capa
 *  v6.02d/v6.04a queda inerte, sin borrar) con la nota «… sin estudio · todo arranca el lun 26-oct» y el título que nombra el lun 26 como
 *  próximo día de plan. Desde el lun 26 = plantillaBase. Los NBME de F1 vuelven a caer en viernes (vie 6-nov · 27-nov · 18-dic): SYNAPSE 13:00
 *  y el OUTPUT de Business de ese viernes pasa entero al sábado 07:45-08:25 (rutinaGuia.bizFranjaDe).
 * v6.06 (31-oct-2026 · corrimiento D1 = lun 2-nov; la semana del lun 26-oct tampoco se estudió): F1 = LUN 2-NOV → MIÉ 30-DIC (42 hábiles); F2, F3,
 *  F4 y el examen (lun 25-oct-2027) sin cambio. Fines de los frentes de rutina/Business (de sus metas, +5 hábiles sobre v6.05): LIVIANO → mié 10-mar ·
 *  AURUM → mar 11-may (D124-D130 = lun 3 → mar 11-may, ya en el SERUMS: 30′ en tiempo muerto, conAurumF4) · SYNAPSE → mar 16-mar · vibecoding →
 *  vie 19-mar · Business → mar 2-mar. SYNAPSE y vibecoding ya no caben antes del ENCAPS ni en los PROTEGIDOS (vie 12 → lun 15-mar): lo que falta va
 *  DESPUÉS, en F3 (bloquesF3 pinta 04:15 vibecoding y 12:30 SYNAPSE mientras duren sus planes; nada se comprime). `plantillaDelDia` marca CORRIDO
 *  del lun 19-oct al dom 1-nov (corrida_s1 solo con sin_sesion; la capa de alias sigue inerte, sin borrar). NBME de F1 en viernes: vie 13-nov ·
 *  vie 4-dic · vie 18-dic → SYNAPSE 13:00 y el OUTPUT de Business de ese viernes entero el sábado 07:45-08:25; en F2 el SIM 100Q #7 de las 11:00
 *  (vie 26-feb) cae en viernes de OUTPUT → mismo trato: OUTPUT entero el sábado 09:15-09:55 (rutinaGuia.bizFranjaDe). Carril sábado ENCAPS
 *  09:30-10:30 (sáb 9, 16, 23, 30-ene y 6-feb): tras el cierre Business 09:15-09:30 de esos sábados, sin solape.
 * v6.05 (fix 24-oct, verificación adversarial · control: DATA/_scripts/check_rutina_guia.js, «simulación del día»): (a) F2: el SYNAPSE sale de
 *  rutinaGuia.synFranjaDe también en F2 → los días con el ENCAPS 11:00-13:00 (SIM 100Q #7/#8, vie 26-feb y vie 5-mar-2027 · D-2) va a 13:00-13:30
 *  (antes 12:30, solapado con el SIM); SIM_11 / D2_ENCAPS = rutinaGuia.SIM_F2_11 / D2_ENCAPS (fuente única). (b) F4: AURUM (lun 3 / mar 4-may-2027)
 *  ya no es «tiempo muerto» sin hora con la guía a 14:15: va en la ventana de tiempo muerto del turno tras los 30′ de R↔D (conAurumF4 ·
 *  rutinaGuia.ventanaAurumF4), también en día de hito. (f) Hitos largos (Free 120 + 4 bloques, vie 8-oct-2027 07:00-16:30): el R↔D fijo del día L
 *  pasa a 10′ después del hito (16:40-17:10) y el almuerzo a sus descansos (trasHito). (g) F5: el MIR 15:15 solo con sesión (mirSesionDe; sin ella
 *  desde el sáb 6-nov-2027 en v6.06, tras la última repuesta del vie 5-nov · v6.05: desde el sáb 30-oct-2027). + R↔D de F4 con su ciclo cerrado
 *  (v6.06: Derma c2 → mié 4-ago · Research c2 → sáb 11-sep-2027; v6.05: vie 30-jul · sáb 4-sep) con contenido de mantenimiento definido en vez de
 *  vacío (rdCicloCerrado).
 * v6.06 (fix 31-oct-2026 · control: check_rutina_guia.js, simulación del día hasta la última repuesta MIR): (1) F5 — la nota «el banqueo MIR … ya
 *  cerró» solo si no quedan filas de MIR_MANT_DIAS después de hoy (el sáb 30-oct-2027, sin fila, la daba con 5 repuestas pendientes del 1 al 5-nov);
 *  si quedan, dice cuándo sigue, y el bloque de una sesión repuesta se llama «MIR · banqueo 1 h (sesión repuesta…)», no «fase principal». (2) F3 —
 *  «SYNAPSE · 30' (cierre F2)» (la F2 de su currículo, leída como la F2 del régimen) → «(cierre del plan, tras el ENCAPS)». (3) Fechas v6.06 en los
 *  comentarios v6.05 de F4/F5 (Derma c2 · Research c2 · fin del MIR).
 * v6.02c (18-oct-2026, E5 · «todo estructurado y definido»): + PlanBloque 'business' (Estudio Pulso, que no tenía franja ni salía en el Home):
 *  L-V 13:00-13:25 en F1 y F2 hasta su fin (= «LECTURA DE LIBRO 13:00-13:15» del Calendar + 10′ del hueco 13:15-13:30; NBME → 12:30-12:55 en el
 *  almuerzo; el OUTPUT del viernes sigue el sábado tras la revisión) · sábado: + PC 15:00 = SHIP del vibecoding + SYNAPSE A/B/C (F1/F2, mientras
 *  haya PC o A/B/C) + Anki 19:00-19:30 (F1) · domingo (F1/F2): FEYNMAN 15:00-15:10 opcional + Anki 17:00-17:15 opcional (F1). La revisión del
 *  sábado lleva frente 'revision' (el Home la pinta con guía y botón). Franjas y textos de cada bloque = src/lib/rutinaGuia.ts.
 * v6.02d (lun 19-oct-2026 · SEMANA 1 CORRIDA, orden de Joseph): `plantillaDelDia` envuelve a `plantillaBase` con fechasV6.corridaS1De:
 *  lun 19 = CORRIDO (sin bloques) · mar 20 → vie 23 = la plantilla del día anterior a las mismas horas (cada bloque con `fechaPlan`) ·
 *  sáb 24 / dom 25 = REPARTO del vie 23 (bloques elegidos por id, con `desfaseMin` y su `fechaPlan`) + lo propio del fin de semana. Desde el
 *  lun 26 la salida es idéntica a la de antes (no hay corrida). Ningún plan cambia de fecha: el Home consulta cada frente con `fechaPlan`.
 * v6.01 (10-oct-2026 · corrimiento D1 = lun 12-oct): F1 = LUN 12-OCT → MIÉ 30-DIC (57 hábiles; v6.00: mié 7-oct → mié 30-dic); F2, F3,
 *  F4 y el examen sin cambio. Las fechas de fin de cada frente salen de sus metas (no de este texto): LIVIANO → mié 17-feb (LIV_META.fin;
 *  v6.00: vie 12-feb) · AURUM → mar 20-abr (AURUM_PLAN_META.fin; v6.00: jue 15-abr) · SYNAPSE → vie 19-feb · vibecoding → mié 24-feb.
 */
import { FECHAS_V6, DERIVADOS_V6, SKIP_V6, faseV6, motivoProtegido, esFeriado, corridaS1De, fechaRealDe } from './fechasV6';
import type { FaseV6, Turno, CorridaS1 } from './fechasV6';
import { FRANJAS_F4, FRANJA_F3_REENTRADA, estadoUSMLE, esHito, esFilaT2 } from './usmleStep1Daily';
import type { DiaUSMLEPlan, DiaUSMLE_T2, FranjaF4, PlantillaF4 } from './usmleStep1Daily';
import { infoTurno, ordenSemanaDe, filaT2DelDia, filasEmpujadas, dowCorto } from './serumsTurnos';
import type { HitoAsignado } from './serumsTurnos';
import { diaEstudioTipo } from './researchData';
import { DAILY_META as RESEARCH_META } from './researchDailyPlan';
import { DAILY_META_2027 as RESEARCH_META_2027 } from './researchDailyPlan2027'; // v6.05 (fix): fin del ciclo 2 de Research (R↔D sin ciclo en F4)
import { DERMA_CICLO2_META } from './dermaCiclo2';                                 // v6.05 (fix): fin del ciclo 2 de Derma
import { AURUM_PLAN_META, aurumDiaDe } from './aurumDailyPlan';
import { LIV_META } from './livianoStudyPlan';
import { SYN_PLAN_META } from './synapseDailyPlan';
import { VIBE_META } from './vibecodingPlan';
import type { Frente } from './homeBriefing';
import { bizFranjaDe, guiaShipDe, guiaFeynmanDe, synFranjaDe, SIM_F2_11, D2_ENCAPS, ventanaAurumF4 } from './rutinaGuia'; // v6.02c (E5): Business en el día + PC del sábado + Feynman del domingo · v6.05 (fix): SIM 11:00 y AURUM en F4
import { mirSesionDe } from './mirDailyPlan'; // v6.05 (fix): F5 solo pinta el MIR si hay sesión
import { MIR_MANT_DIAS } from './mirMantenimiento'; // v6.06 (fix): F5 — «el banqueo ya cerró» solo sin filas posteriores (repuestas hasta el vie 5-nov-2027)
import { encapsSabadoDe } from './encapsGuia'; // v6.06: carril SÁBADO 09:30 de la intensiva ENCAPS (pendientes F1 que no caben en el carril B lun-jue)

export type PlanBloque = 'usmle' | 'encaps' | 'mir' | 'research-derma' | 'aurum' | 'liviano' | 'synapse' | 'vibecoding'
  | 'serums' | 'gimnasio' | 'vida' | 'revision' | 'business';
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
  /** v6.02d (semana 1 corrida): fecha de PLAN cuyo contenido toca en este bloque · ausente = la del propio día */
  fechaPlan?: string;
  /** v6.02d: minutos que el bloque se movió respecto a su hora en la plantilla de su fecha de plan (sus guías se desplazan igual) */
  desfaseMin?: number;
}
export type PlantillaId = 'F1' | 'F1-sáb' | 'TRANSICION' | 'F2' | 'F2-vie' | 'F2-sáb' | 'F2-D2' | 'F3' | 'F3-sáb'
  | 'M' | 'T' | 'L' | 'G' | 'H' | 'H-sáb' | 'TAPER' | 'RITUAL' | 'VIAJE' | 'EXAMEN' | 'PROTEGIDO' | 'DOMINGO' | 'SKIP' | 'F5'
  | 'CORRIDO' | 'REPARTO'; // v6.02d: semana 1 corrida (lun 19 sin sesión · sáb 24 / dom 25 = reparto del vie 23)
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
  /** v6.02d: tipo de día de la semana 1 corrida ('sin_sesion' · 'alias' · 'reparto'); ausente fuera de ella */
  corrida?: CorridaS1['tipo'];
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
    // v6.02c (E5): en días de hito el SYNAPSE va donde lo pone la guía USMLE (UWSA1 → 07:25: v6.05 lun 26-oct · v6.03 mié 21-oct · v6.02 lun 19-oct · NBME → 13:00, en v6.05 los viernes 6-nov / 27-nov / 18-dic y el mié 30-dic · v6.03: martes 3-nov / 24-nov / 15-dic); Calendar alineado el 18-oct (CAL_V6 §12, re-fechar a v6.05)
    (() => { const [si, sf] = synFranjaDe(iso).franja.split('–'); return bloque('syn', si ?? '12:30', sf ?? '13:00', "SYNAPSE · 30' (A pantalla · B audio · C lectura)", 'synapse', 'synapse'); })(),
    bloqueRD(iso, '13:30', 45),
    bloque('aurum', '14:15', '15:15', "AURUM · closer de ventas (60')", 'aurum', 'aurum'),
    bloque('mir', '15:15', '16:15', 'MIR · Eval D-1 + Deep Work (1 h)', 'mir', 'mir'),
    bloque('encaps', '16:15', '17:15', 'ENCAPS · 1h banqueo (mantenimiento 2027-I)', 'encaps', 'encaps'),
    bloque('liv', '17:15', '18:00', 'LIVIANO · Academia (obesidad/GLP-1/nutrición)', 'liviano', 'liviano'),
    bloque('eval', '18:00', '18:45', 'USMLE · Evaluación acumulativa (modo examen)', 'usmle', 'usmle-eval'),
  ];
  const biz = bloqueBiz(iso);
  if (biz) bs.push(biz);
  return bs;
}
/** v6.02c (E5): Business del día (null si hoy no toca) — franja de rutinaGuia.bizFranjaDe. */
function bloqueBiz(iso: string): BloqueV6 | null {
  const f = bizFranjaDe(iso);
  if (!f) return null;
  const nombre = f.sabado ? 'BUSINESS · tracker semanal + cierre del OUTPUT (Estudio Pulso)' : f.ini === '12:30' ? 'BUSINESS · Estudio Pulso (audio en el almuerzo: hoy hay NBME)' : 'BUSINESS · Estudio Pulso (1 tramo del libro + acción)';
  return bloque('biz', f.ini, f.fin, nombre, 'business', 'business');
}
/** v6.02c (E5): PC del sábado (SHIP del vibecoding + SYNAPSE A/B/C) con la franja de rutinaGuia.guiaShipDe. */
function bloquePCSabado(iso: string): BloqueV6 | null {
  const g = guiaShipDe(iso);
  const m = g ? /^(\d{2}:\d{2})–(\d{2}:\d{2})$/.exec(g.franja) : null;
  if (!g || !m) return null;
  return bloque('pc', m[1] as string, m[2] as string, `IA · ${g.titulo} (PC sábado)`, 'vibecoding', 'vibecoding');
}
/** D-2 del ENCAPS (jue antes del D-1 hábil): dress rehearsal 11:00-13:00, sin loop, sin eval, sin carril B (§C3). v6.05 (fix): D2_ENCAPS sale de
 *  rutinaGuia (fuente única con el SYNAPSE de 13:00). */
/** Viernes del núcleo con SIM a las 11:00 (#7 y #8 = los dos últimos viernes del núcleo, §C3); el resto 07:15. v6.05 (fix): = rutinaGuia.SIM_F2_11. */
const SIM_11 = SIM_F2_11;
function bloquesF2(iso: string): { id: PlantillaId; bs: BloqueV6[] } {
  const w = dow(iso);
  const comunes = (): BloqueV6[] => {
    const bs: BloqueV6[] = [];
    if (enRango(iso, VIBE_META.finTaper)) bs.push(bloque('vibe', '04:15', '05:00', 'IA · VIBECODING (taper por el ENCAPS)', 'vibecoding', 'vibecoding'));
    bs.push(bloque('anki', '05:00', '05:45', "ANKI · ENCAPS::Cifras (15') + USMLE mantenimiento (30', 0 nuevas, FSRS 0,85)", 'usmle', 'usmle-anki', 'Step 1 en PAUSA (§B2): solo Anki · el sábado 07:45 «STEP 1 VIVO» 20Q mezcladas'));
    // v6.05 (fix 24-oct): la franja del SYNAPSE sale de rutinaGuia.synFranjaDe, como en F1 — los días con el ENCAPS a 11:00-13:00 (SIM 100Q #7/#8:
    //   vie 26-feb y vie 5-mar-2027 · D-2) va a 13:00-13:30; antes quedaba fija a 12:30-13:00, solapada 30′ con el SIM
    if (enRango(iso, SYN_PLAN_META.fin)) { const [si, sf] = synFranjaDe(iso).franja.split('–'); bs.push(bloque('syn', si ?? '12:30', sf ?? '13:00', "SYNAPSE · 30'", 'synapse', 'synapse')); }
    bs.push(bloqueRD(iso, '13:30', 45));
    if (enRango(iso, AURUM_PLAN_META.fin)) bs.push(bloque('aurum', '14:15', '14:45', "AURUM · 30' (núcleo · DJ-4)", 'aurum', 'aurum'));
    bs.push(bloque('mir', '15:15', '16:15', 'MIR · 1 h (DJ-4)', 'mir', 'mir'));
    if (enRango(iso, LIV_META.fin)) bs.push(bloque('liv', '17:15', '18:00', 'LIVIANO · Academia', 'liviano', 'liviano'));
    const biz = bloqueBiz(iso); // v6.02c (E5): Business hasta su fin (v6.05: mar 23-feb · v6.03: jue 18-feb · v6.02: mar 16-feb)
    if (biz) bs.push(biz);
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
    // v6.06 (31-oct-2026): con el D1 en el lun 2-nov el vibecoding (taper S19-S20, deload 5′) y el SYNAPSE (última A-unit) ya no caben antes del
    //   ENCAPS ni en los PROTEGIDOS (vie 12 → lun 15-mar) → siguen en F3 hasta su fin (vibecoding vie 19-mar · SYNAPSE mar 16-mar), a su hora de F1
    //   (04:15 · 12:30, entre el bloque principal y el R↔D); sin plan, la franja queda libre como antes.
    // v6.06 (fix): el bloque se titulaba «SYNAPSE · 30' (cierre F2)» —la F2 de SU currículo— y en F3 se leía como la fase F2 del régimen (la intensiva
    //   ENCAPS, ya cerrada) → «(cierre del plan, tras el ENCAPS)», como el vibecoding de al lado (check_rutina_guia: ningún bloque nombra otra fase)
    ...(enRango(iso, VIBE_META.finTaper) ? [bloque('vibe', '04:15', '05:00', 'IA · VIBECODING (taper: cierre del plan)', 'vibecoding', 'vibecoding')] : []),
    ...(enRango(iso, SYN_PLAN_META.fin) ? (() => { const [si, sf] = synFranjaDe(iso).franja.split('–'); return [bloque('syn', si ?? '12:30', sf ?? '13:00', "SYNAPSE · 30' (cierre del plan, tras el ENCAPS)", 'synapse', 'synapse')]; })() : []),
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
const SABADO_REVISION = (): BloqueV6 => bloque('revision', '07:15', '07:45', 'REVISIÓN SEMANAL (DATA/REVISION_SEMANAL.md)', 'revision', 'revision');
/**
 * v6.06 (31-oct-2026): CARRIL SÁBADO de la intensiva ENCAPS (09:30-10:30, gen_encaps_intensivo_2027.js → encapsGuia.encapsSabadoDe): los
 * pendientes F1 que ya no caben en los días de reposición lun-jue del carril B (v6.06: sáb 9, 16, 23, 30-ene y 6-feb). Va tras la revisión
 * 07:15, el STEP 1 VIVO 07:45-09:15 y el cierre Business 09:15; si ese sábado Business termina más tarde, el bloque empieza al terminar Business
 * (misma duración). Los ítems (claves D{dia del viernes}:s_*) los pinta ENCAPS → Plan desde la fila viva del viernes host.
 */
function bloqueEncapsSabado(iso: string): BloqueV6[] {
  const s = encapsSabadoDe(iso);
  if (!s) return [];
  const biz = bizFranjaDe(iso);
  const dur = aMin(s.fin) - aMin(s.ini);
  const ini = biz && aMin(biz.fin) > aMin(s.ini) ? biz.fin : s.ini;
  const que = s.tipo === 'mini_sim' ? `MINI-SIMULACRO 25Q (72 s/Q) + corrección · cola larga ${s.colaLarga.join(' + ')} · nota /25 sim_n ${s.simN ?? s.host.dia}`
    : `banco ${s.codigo}${s.subEje ? ` · ${s.subEje}` : ''} (eval 5Q + 16-20Q + secundario ${s.secundarios.join(' + ') || '—'} + registro)`;
  return [bloque('encaps-sab', ini, aHHMM(aMin(ini) + dur), `ENCAPS · CARRIL SÁBADO · REPOSICIÓN F1 (${s.tipo === 'mini_sim' ? 'mini-sim 25Q' : s.codigo})`, 'encaps', 'encaps',
    `REPOSICIÓN F1 (${s.corrimiento}) · ${que} — fila mant. ${s.diaMant} de la ${s.origen} (${s.fechaOriginal}) que no cupo en la F1 ni en el carril B lun-jue · ítems en ENCAPS → Plan (D${s.host.dia}, claves s_*)`)];
}
/** v6.02c (E5): extras del sábado (Business tras la revisión · PC 15:00 · Anki 19:00 en F1) y del domingo (Feynman · Anki opcional en F1). */
function extrasSabado(iso: string, conAnki: boolean): BloqueV6[] {
  const bs: BloqueV6[] = [];
  const biz = bloqueBiz(iso); if (biz) bs.push(biz);
  const pc = bloquePCSabado(iso); if (pc) bs.push(pc);
  if (conAnki) bs.push(bloque('anki-sab', '19:00', '19:30', 'USMLE · ANKI del sábado (cola FSRS)', 'usmle', 'usmle-anki', 'Solo vencidas de APEX::USMLE (nuevas = 0 el sábado) · telemetría al terminar'));
  return bs;
}
function extrasDomingo(iso: string): BloqueV6[] {
  const fase = faseV6(iso);
  if (fase !== 'F1' && fase !== 'F2' && fase !== 'TRANSICION') return [];
  const bs: BloqueV6[] = [];
  const g = guiaFeynmanDe(iso);
  const m = g ? /^(\d{2}:\d{2})–(\d{2}:\d{2})$/.exec(g.franja) : null;
  if (g && m) bs.push(bloque('feynman', m[1] as string, m[2] as string, 'IA · FEYNMAN del proyecto (opcional, 10′)', 'vibecoding', 'vibecoding'));
  if (fase === 'F1') bs.push(bloque('anki-dom', '17:00', '17:15', "USMLE · ANKI del domingo (opcional, ≤15')", 'usmle', 'usmle-anki', 'Opcional y no se registra: solo vencidas (el lunes 05:00 lo absorbe)'));
  return bs;
}

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
/** v6.05 (fix 24-oct): AURUM en F4 (sus 2 últimas sesiones, lun 3 / mar 4-may-2027 con el D1 en el lun 26-oct; v6.06: las 7 últimas, D124-D130 = lun 3 → mar 11-may, con el D1 en el lun 2-nov) = 30′ en el tiempo muerto del
 *  turno tras los 30′ de R↔D (rutinaGuia.ventanaAurumF4): M → 07:30–13:00 (tiempo muerto) · T → 13:30–19:00 · L → 16:50–17:20 · G → sin hora.
 *  Solo si ese día hay sesión de AURUM (aurumDiaDe); también en los días de hito (plantilla H). Nada se recorta. */
function conAurumF4(iso: string, bs: BloqueV6[], notas: string[]): BloqueV6[] {
  if (!enRango(iso, AURUM_PLAN_META.fin) || !aurumDiaDe(iso)) return bs;
  const rd = bs.find((b) => b.plan === 'research-derma') ?? null;
  const v = ventanaAurumF4(rd);
  const b = v
    ? { ...bloque('aurum', v.ini, v.fin, `AURUM · 30' ${v.tm ? 'en tiempo muerto de la posta, tras el R↔D' : 'tras el R↔D'} (cierre del plan · DJ-4)`, 'aurum', 'aurum', undefined, 30, v.tm ? `${v.ini}–${v.fin} (tiempo muerto)` : undefined), min: 30 }
    : bloque('aurum', null, null, "AURUM · 30' en tiempo muerto de la guardia (cierre del plan · DJ-4)", 'aurum', 'aurum', undefined, 30, 'tiempo muerto');
  notas.push(`AURUM cierra el ${fCorta(AURUM_PLAN_META.fin)}: sus últimas sesiones van a 30′ ${v ? `desde las ${v.ini}` : 'en tiempo muerto'}, justo después del R↔D (corrimientos v6.05-v6.06, nada se recorta).`);
  return [...bs, b];
}
/** v6.05 (fix 24-oct): R↔D de F4 en un día cuyo ciclo ya CERRÓ (v6.06: Derma c2 → mié 4-ago-2027 · Research c2 → sáb 11-sep-2027; v6.05: vie 30-jul ·
 *  sáb 4-sep; el examen pasó al lun 25-oct en la v6.04b y F4 llega al 22-oct; las fechas salen de DERMA_CICLO2_META / DAILY_META_2027, no de este
 *  texto): antes el bloque salía vacío («sin átomo hoy») ~50 días-plan. Ahora lleva un contenido DEFINIDO de
 *  mantenimiento, sin material nuevo (DJ-4: R↔D ≥ 30′): Derma = la «segunda pasada FSRS de fallos» con la que cierra su ciclo 2 (APEX::DERMA);
 *  Research = inbox editorial de lo enviado (SR-1, carta, tesis, case report). El ciclo 3 se planifica tras el Step 1 (decisión de Joseph). */
function rdCicloCerrado(iso: string, bs: BloqueV6[]): BloqueV6[] {
  const tipo = diaEstudioTipo(isoADate(iso));
  const fin = tipo === 'research' ? RESEARCH_META_2027.fin : tipo === 'derma' ? DERMA_CICLO2_META.fin : null;
  if (!fin || iso <= fin) return bs;
  const det = tipo === 'derma'
    ? `Derma: el ciclo 2 cerró el ${fCorta(fin)} → 30′ de mantenimiento sin material nuevo: vencidas de APEX::DERMA en Anki (2.ª pasada FSRS de los fallos, como el cierre del ciclo 2). El ciclo 3 se planifica tras el Step 1.`
    : `Research: el ciclo 2 cerró el ${fCorta(fin)} → 30′ de mantenimiento sin átomo nuevo: inbox de revisores/editorial de lo enviado (SR-1 · carta · research letter · case report: rebuttal o revisión en ≤ 7 días con la plantilla de X-2) + Mesa editorial al día. El ciclo 3 (SR-2) se planifica tras el Step 1.`;
  return bs.map((b) => (b.plan === 'research-derma' ? { ...b, nombre: `${tipo === 'derma' ? 'DERMA' : 'RESEARCH'} · 30' (DJ-4) — ciclo cerrado, mantenimiento`, detalle: det } : b));
}
/** v6.05 (fix 24-oct): en un hito largo (Free 120 + 4 bloques ≥ 280Q, vie 8-oct-2027 07:00–16:30) el R↔D fijo 16:20–16:50 del día L se solapaba
 *  con el hito → pasa a 10′ después de que termine (16:40–17:10); el de tiempo muerto (turno T) no cambia. Los bloques de vida que caen
 *  DENTRO del hito (almuerzo) pasan a «en los descansos del hito» (sin hora propia). */
function trasHito(bs: BloqueV6[], hitoFin: string | null, notas: string[]): BloqueV6[] {
  if (!hitoFin) return bs;
  const f = aMin(hitoFin);
  return bs.map((b) => {
    if (!b.ini || !b.fin || b.ini === b.fin || /tiempo muerto/i.test(b.hora) || (b.plan === 'usmle' && b.frente === 'usmle-principal')) return b;
    if (aMin(b.ini) >= f) return b;
    if (b.plan === 'research-derma') {
      const ini = aHHMM(f + 10), fin = aHHMM(f + 10 + (aMin(b.fin) - aMin(b.ini)));
      notas.push(`R↔D después del hito: ${ini}–${fin} (el hito termina a las ${hitoFin}).`);
      return { ...b, ini, fin, hora: `${ini}–${fin}` };
    }
    if (b.plan === 'vida' && aMin(b.ini) >= aMin('07:00')) return { ...b, ini: null, fin: null, hora: 'en los descansos del hito', min: null };
    return b;
  });
}

// ── API ──
/** Plantilla del día SIN la semana corrida (= la de siempre). La usa `plantillaDelDia`, que aplica la corrida del 19 al 25-oct. */
function plantillaBase(iso: string, turno?: Turno): PlantillaDia {
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
  if (w === 0) return out('DOMINGO', 'DOMINGO · libre', extrasDomingo(iso), { notas: ["Anki ≤15' opcional (no se registra)."] });

  switch (fase) {
    case 'TRANSICION':
      // v6.02c (E5): el sáb 2-ene sí tiene revisión semanal (S11) y PC (SHIP S10; también en v6.03 · v6.05: revisión S10 y SHIP S9) en el Calendar y en los planes → se muestran
      return out('TRANSICION', 'TRANSICIÓN · sin sesión (Anki opcional)', w === 6 ? [SABADO_REVISION(), ...extrasSabado(iso, false)] : [], { notas: ['Step 1 en PAUSA desde hoy: 0 tarjetas nuevas; la intensiva ENCAPS arranca el lun 4-ene.'] });
    case 'LIBRE_POST_ENCAPS':
      return out('PROTEGIDO', 'LIBRE post-ENCAPS', []);
    case 'EXAMEN':
      return out('EXAMEN', 'EXAMEN Step 1', []);
    case 'F5': {
      // v6.05 (fix 24-oct): el bloque MIR 15:15 solo si ese día hay sesión MIR (mirSesionDe); antes salía también sin sesión y el Home lo pintaba
      //   vacío (v6.06: sin sesión desde el sáb 6-nov-2027, tras la última repuesta del vie 5-nov · v6.05: desde el sáb 30-oct-2027)
      // v6.06 (fix 31-oct): la nota «el banqueo MIR … ya cerró» solo si NO quedan filas de MIR_MANT_DIAS después de hoy — el sáb 30-oct-2027 (sin fila)
      //   la daba aunque quedaban 5 repuestas del lun 1 al vie 5-nov; ahora dice cuándo sigue. El bloque de una sesión del banqueo (repuestas 26-oct →
      //   5-nov) se nombra como tal, no «fase principal» (que se planifica tras el handoff de mirMantenimiento).
      const ses = mirSesionDe(iso);
      const sigMir = ses ? null : (MIR_MANT_DIAS.map((x) => x.fecha).filter((f) => f > iso).sort()[0] ?? null);
      const finMir = MIR_MANT_DIAS.map((x) => x.fecha).sort().pop() ?? iso;
      const nomMir = ses?.tipo === 'mantenimiento' ? `MIR · banqueo 1 h (${ses.dia.repuesta ? 'sesión repuesta tras el Step 1' : 'mantenimiento'})` : 'MIR · fase principal (oct-2027)';
      return out('F5', 'F5 · post-Step 1 (esbozo)', ses ? [bloque('mir', '15:15', '16:15', nomMir, 'mir', 'mir')] : [],
        { notas: [iso === addDias(FECHAS_V6.step1.examen, 1) ? 'Regreso a la posta (permiso 1 día; 2 si hoy tienes turno M).' : 'F5 es un esbozo: MIR principal hasta el fin del SERUMS; CURVA/DENSA y Derma c2+ se planifican después del Step 1.',
          ...(ses ? [] : sigMir
            ? [`Sin sesión MIR hoy (el banqueo no tiene fila este día): sigue el ${fCorta(sigMir)} y cierra el ${fCorta(finMir)} (sesiones repuestas tras el Step 1).`]
            : ['Sin sesión MIR hoy: el banqueo MIR (mantenimiento + extensión + repuestas) ya cerró; la fase principal MIR se planifica tras el Step 1 (handoff de mirMantenimiento).'])] });
    }
    case 'F1':
      if (w === 6) return out('F1-sáb', 'Sábado · libre (revisión semanal)', [SABADO_REVISION(), ...extrasSabado(iso, true)]);
      return out('F1', 'F1 · Step 1 tramo 1 + ENCAPS lento', bloquesF1(iso));
    case 'F2': {
      if (w === 6) return out('F2-sáb', 'Sábado · revisión semanal + STEP 1 VIVO', [SABADO_REVISION(),
        bloque('vivo', '07:45', '09:15', 'STEP 1 VIVO · 20Q timed MEZCLADAS (10 incorrectas UWorld + 10 nuevas AMBOSS) + revisión', 'usmle', 'usmle-principal', 'mantenimiento del Step 1 en PAUSA (§B2): no gastar uWorld fresco'),
        ...extrasSabado(iso, false), ...bloqueEncapsSabado(iso)]); // v6.06: + carril SÁBADO ENCAPS 09:30 (pendientes F1)
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
          const bs = rdCicloCerrado(iso, bloquesDePlantilla('H-sáb', null)); // v6.05 (fix): R↔D con contenido si su ciclo ya cerró
          notas.push(hitoHoy.motivo);
          return out('H-sáb', `HITO · ${hitoHoy.fila.nombre ?? 'hito'} · CONDICIÓN DEGRADADA`, bs, { usmle, hito: hitoHoy, extra, notas, turno: 'M' });
        }
        const turnoH: 'T' | 'L' = it.marcado || turno != null ? (t === 'L' ? 'L' : 'T') : feriado ? 'L' : 'T';
        const bsH = bloquesDePlantilla('H', turnoH).map((b) => (b.plan === 'usmle' && b.frente === 'usmle-principal' && b.ini === '07:00' && r ? { ...b, fin: r[2] as string, hora: `07:00–${r[2]}`, min: aMin(r[2] as string) - aMin('07:00') } : b));
        // v6.05 (fix): hitos largos (Free 120 + 4 bloques, 07:00–16:30) → el R↔D del día L va después del hito y el almuerzo a sus descansos
        //   (antes R↔D 16:20–16:50 solapaba 10′ con el hito) · AURUM en F4 también en día de hito (si ese día hay sesión)
        const bs = rdCicloCerrado(iso, conAurumF4(iso, trasHito(bsH, r ? (r[2] as string) : null, notas), notas));
        notas.push(hitoHoy.motivo);
        if (hitoHoy.pendienteMarcar) notas.push('Marca el turno de hoy: si es M o guardia, el hito se mueve al primer día T/L de su ventana.');
        if (hitoHoy.ensayoPartido) notas.push(hitoHoy.ensayoPartido);
        if (t === 'T' && it.horaInicio === '12:00') notas.push('Turno T 12:00 → el hito empieza a las 06:00 (§B5).');
        return out('H', `HITO · ${hitoHoy.fila.nombre ?? 'hito'} · plantilla H (${turnoH === 'L' ? 'sin turno' : 'turno T'})`, bs, { usmle, hito: hitoHoy, extra, notas });
      }
      let bs = bloquesDePlantilla(t, null);
      let pl: PlantillaId = t;
      if (t === 'T') { const v = varianteT(bs, it.horaInicio); bs = v.bs; if (v.nota) notas.push(v.nota); }
      // v6.05 (24-oct-2026): con el D1 en el lun 26-oct AURUM termina el mar 4-may-2027 → D129 (lun 3-may) y D130 (mar 4-may, PITCH v7) caen en los
      //   2 primeros días del SERUMS: nada se recorta → 30' en tiempo muerto de la posta (DJ-4, como el R↔D); la guía (rutinaGuia) da el contenido.
      // v6.06 (31-oct-2026): con el D1 en el lun 2-nov AURUM termina el mar 11-may-2027 → D124-D130 (lun 3 → mar 11-may, PITCH v7 el mar 11) en el
      //   SERUMS: la misma solución (30' en tiempo muerto tras el R↔D), sin cambio de código.
      // v6.05 (fix): el bloque ya no es «tiempo muerto» sin hora con la guía a 14:15 (chocaba con el almuerzo y el bloque B del turno M): lleva la
      //   ventana del tiempo muerto del turno tras los 30′ de R↔D (rutinaGuia.ventanaAurumF4) y su guía arranca ahí.
      bs = conAurumF4(iso, bs, notas);
      const taper = !!usmle && esFilaT2(usmle) && usmle.tipo === 'taper';
      if (taper) {
        const d95 = (usmle as DiaUSMLE_T2).dOrig === 95;
        bs = bs.filter((b) => b.plan !== 'usmle' || !/BLOQUE (B|LARGO)/.test(b.nombre))
          .map((b) => (b.plan === 'usmle' && /BLOQUE A/.test(b.nombre) ? { ...b, nombre: d95 ? 'TAPER · sesión MÍNIMA ≤1 h (solo bloque A)' : 'TAPER · solo bloque A (≤2 h): 20Q flagged + Anki maduro + FA esquemas', ...(d95 && b.ini ? { fin: aHHMM(aMin(b.ini) + 60), hora: `${b.ini}–${aHHMM(aMin(b.ini) + 60)}`, min: 60 } : {}) } : b));
        pl = 'TAPER';
        notas.push('Semana de taper (§B6): MIR sigue 1 h · cero preguntas y tarjetas nuevas.');
      }
      bs = rdCicloCerrado(iso, bs); // v6.05 (fix): R↔D con contenido definido cuando su ciclo ya cerró (ago-oct 2027)
      if (w === 6) notas.push("Revisión semanal: 20' dentro del bloque de Step 1 de hoy.");
      if (iso <= FECHAS_V6.serums.adaptacion_hasta) notas.push('Inducción del SERUMS (2 primeras semanas): carga al 50 %.');
      const titulo = `F4 · SERUMS turno ${t}${it.horaInicio && t === 'T' ? ` ${it.horaInicio}` : ''}${it.marcado || turno != null ? '' : ' (sin marcar → M)'}`;
      return out(pl, titulo, bs, { usmle, extra, notas });
    }
  }
  return out('F1', 'F1', bloquesF1(iso));
}

// ── v6.02d · SEMANA 1 CORRIDA (lun 19-oct-2026, orden de Joseph) ──
const MES_CORTO = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fCorta = (iso: string): string => `${dowCorto(iso)} ${Number(iso.slice(8))}-${MES_CORTO[Number(iso.slice(5, 7)) - 1] ?? ''}`;
/** Bloque de la plantilla de `de` llevado a otro día: hora + `desfase` minutos, con su fecha de plan (las guías se mueven igual en el Home). */
function bloqueCorrido(b: BloqueV6, de: string, desfase: number): BloqueV6 {
  if (!desfase) return { ...b, fechaPlan: de };
  return {
    ...b, ini: desplazar(b.ini, desfase), fin: desplazar(b.fin, desfase), fechaPlan: de, desfaseMin: desfase,
    hora: b.ini ? b.hora.replace(/\d{2}:\d{2}/g, (h) => aHHMM(aMin(h) + desfase)) : b.hora,
  };
}
// v6.03 (mar 20-oct): la corrida ya no es por alias: el plan entero se re-fechó con D1 = mié 21-oct; corrida_s1 solo marca los días sin sesión.
// v6.04 (mié 21-oct): la nota se arma con los datos de corrida_s1 (días sin sesión · alias · reparto); sin corrida activa no se muestra.
// v6.05 (sáb 24-oct): corrida_s1 solo trae sin_sesion (lun 19 → dom 25-oct; alias y reparto vacíos) → la nota ya no deja «… sin estudio · .»:
//   sin alias ni reparto dice «… sin estudio · todo arranca el <D1>» y una racha de ≥ 3 días seguidos se resume «lun 19-oct … dom 25-oct».
//   Con alias o reparto (v6.02d / v6.04a) la nota sale EXACTAMENTE como antes (lista de días, alias, reparto, «Lo demás… no cambia»).
const _C1 = FECHAS_V6.corrida_s1;
const _C1_ALIAS = Object.entries(_C1.alias);
const _C1_REPARTO = Object.keys(_C1.reparto);
const _C1_SIN = [..._C1.sin_sesion].sort();
const _C1_RACHA = _C1_SIN.length >= 3 && _C1_SIN.every((x, i) => i === 0 || addDias(_C1_SIN[i - 1], 1) === x);
const NOTA_CORRIDA = _C1_ALIAS.length || _C1_REPARTO.length
  ? `SEMANA CORRIDA ${_C1.version} (orden del ${fCorta(_C1.decidido)}): ${_C1.sin_sesion.map(fCorta).join(', ')} sin estudio · `
    + _C1_ALIAS.map(([r, de]) => `${fCorta(r)} = plan del ${fCorta(de)}`).join(' · ')
    + (_C1_REPARTO.length ? ` · el ${fCorta(Object.values(_C1.reparto)[0]?.de ?? '')} se reparte entre ${_C1_REPARTO.map(fCorta).join(' (mañana) y ')} (tarde, desde las 07:15)` : '')
    + '. Lo demás, desde el lunes siguiente, no cambia.'
  : `SEMANA CORRIDA ${_C1.version} (orden del ${fCorta(_C1.decidido)}): ${_C1_RACHA ? `${fCorta(_C1_SIN[0])} … ${fCorta(_C1_SIN[_C1_SIN.length - 1])}` : _C1_SIN.map(fCorta).join(', ')} sin estudio · todo arranca el ${fCorta(fechaRealDe(FECHAS_V6.f1.inicio))}.`;
/**
 * Plantilla completa del día (bloques + contexto). `turno` = el del selector; si falta, el marcado (o 'M' por defecto).
 * v6.02d: aplica la semana 1 corrida (fechasV6.corridaS1De): lun 19 sin sesión · mar 20 → vie 23 = plantilla del día anterior ·
 * sáb 24 / dom 25 = reparto del vie 23 + lo propio del fin de semana. Fuera de esos días = plantillaBase (idéntica a la de antes).
 * v6.05: corrida_s1 solo con sin_sesion (lun 19 → dom 25-oct) → esos 7 días = CORRIDO (sin bloques); desde el lun 26-oct = plantillaBase.
 */
export function plantillaDelDia(iso: string, turno?: Turno): PlantillaDia {
  const c = corridaS1De(iso);
  if (!c) return plantillaBase(iso, turno);
  const base = plantillaBase(iso, turno);
  if (c.tipo === 'sin_sesion') {
    const alias = Object.entries(FECHAS_V6.corrida_s1.alias).find(([, de]) => de === iso)?.[0];
    const sig = alias ?? (iso <= FECHAS_V6.f1.inicio ? fechaRealDe(FECHAS_V6.f1.inicio) : undefined); // v6.04: el día real en que arranca el plan (D1 corrido)
    // v6.05: corrida_s1 sin alias ni reparto (solo sin_sesion) → el título nombra el D1 como próximo día de plan, no «tu plan de hoy»;
    //   con alias o reparto (v6.02d / v6.04a) el título sale exactamente como antes
    const titulo = _C1_ALIAS.length || _C1_REPARTO.length || !sig ? `Día corrido · tu plan de hoy se hace el ${sig ? fCorta(sig) : 'próximo día de plan'}` : `Día corrido · sin sesión · próximo día de plan: ${fCorta(sig)} (todo arranca ese día)`;
    return {
      ...base, plantilla: 'CORRIDO', titulo,
      usmle: null, bloques: [], corrida: 'sin_sesion', notas: [NOTA_CORRIDA, 'Hoy sin sesión de ningún plan: no hay nada atrasado que recuperar.'],
    };
  }
  if (c.tipo === 'alias') {
    const p = plantillaBase(c.de, turno);
    return {
      ...p, fecha: iso, corrida: 'alias', bloques: p.bloques.map((b) => bloqueCorrido(b, c.de, 0)),
      notas: [`Hoy toca el plan del ${fCorta(c.de)}, a sus mismas horas (las guías conservan el día del plan en sus textos).`, NOTA_CORRIDA, ...p.notas],
    };
  }
  const bs: BloqueV6[] = [];
  for (const parte of c.partes) {
    for (const b of plantillaBase(parte.de).bloques) {
      const d = parte.bloques[b.id];
      if (d !== undefined) bs.push(bloqueCorrido(b, parte.de, d));
    }
  }
  const pDe = plantillaBase(c.de, turno);
  const sab = dow(iso) === 6;
  return {
    ...base, plantilla: 'REPARTO', usmle: pDe.usmle, corrida: 'reparto', bloques: ordenar(bs),
    titulo: sab ? `Sábado · MAÑANA del ${fCorta(c.de)} (semana corrida)` : `Domingo · TARDE del ${fCorta(c.de)} desde las 07:15 (semana corrida)`,
    notas: [sab
      ? `Hoy: la mañana del ${fCorta(c.de)} a sus horas (04:15 · 05:00 · 07:15-12:00 · 12:30 · 13:00) + su evaluación USMLE a las 13:30 (a las 18:00 está el YouTube). Lo del sábado sigue igual (PC 15:00 · Anki 19:00); la revisión semanal pasa a mañana 11:45.`
      : `Hoy: la tarde del ${fCorta(c.de)} adelantada 6 h 15′ (R↔D 07:15 · AURUM 08:00 · MIR 09:00 · ENCAPS 10:00 · LIVIANO 11:00) + la revisión semanal 11:45 y el cierre del OUTPUT 12:15 (del sábado). Lo del domingo sigue igual.`,
    NOTA_CORRIDA],
  };
}
/** Bloques del día (V6_ESPEC §F): F1 · F2 · F3 · F4 por turno M/T/L/G · H / H-sáb en día de hito. */
export function bloquesDelDia(iso: string, turno?: Turno): BloqueV6[] { return plantillaDelDia(iso, turno).bloques; }
/** DJ-4: ¿la plantilla trae MIR ≥ 60' y R↔D ≥ 30'? (lo usa la verificación; días sin plan → true). */
export function cumpleDJ4(p: PlantillaDia): { mir: boolean; rd: boolean } {
  const suma = (plan: PlanBloque) => p.bloques.filter((b) => b.plan === plan).reduce((a, b) => a + (b.min ?? 0), 0);
  return { mir: suma('mir') >= 60, rd: suma('research-derma') >= 30 };
}
export { dowCorto };
