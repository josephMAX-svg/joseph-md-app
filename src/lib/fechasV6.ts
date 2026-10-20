/**
 * fechasV6.ts — FUENTE ÚNICA DE FECHAS v6.00 · GENERADO por DATA/_scripts/gen_fechas_v6.js desde DATA/_scripts/_fechas_v6.json
 * — NO editar a mano (V6_ESPEC §A4/§F). Para mover una fecha: editar el JSON (disparadores de §I) y volver a correr
 * `node DATA/_scripts/gen_fechas_v6.js` (aborta si un valor guardado ≠ derivado) y después los generadores de cada plan.
 *
 * v6.00 (decidido mar 6-oct-2026): reestructuración anual (DJ-1…DJ-5) — sustituye a v5.20 (Step 1 lun 22-feb · ENCAPS mié 10-mar).
 * v6.01 (sáb 10-oct-2026): corrimiento rígido del D1 mié 7-oct-2026 → lun 12-oct-2026 (perdidos: mié 7-oct · jue 8-oct · vie 9-oct).
 * v6.02 (sáb 17-oct-2026): corrimiento rígido del D1 lun 12-oct-2026 → lun 19-oct-2026 (perdidos: lun 12-oct · mar 13-oct · mié 14-oct · jue 15-oct · vie 16-oct).
 * v6.02d (lun 19-oct-2026): semana 1 corrida SOLO en la consulta (corridaS1De / fechaPlanDe) — sin sesión lun 19-oct · mar 20-oct = plan del lun 19-oct · mié 21-oct = plan del mar 20-oct · jue 22-oct = plan del mié 21-oct · vie 23-oct = plan del jue 22-oct · sáb 24-oct = parte del vie 23-oct · dom 25-oct = parte del vie 23-oct; ningún plan cambia de fecha.
 * Versión vigente del JSON: v6.02.
 * Módulo HOJA: no importa nada de src/ (r2 · I7: corta el ciclo usmleStep1Daily ↔ homeBriefing; STEP1_SEMANAS, semanaStep1 y
 * Turno viven aquí y homeBriefing los re-exporta).
 *
 * Fases (tabla A1 resuelta):
 *   F1                lun 19-oct-2026 → mié 30-dic-2026 · 52 días de plan L-V (último mié 30-dic)
 *   TRANSICION        jue 31-dic-2026 → dom 3-ene-2027
 *   F2                lun 4-ene-2027 → dom 14-mar-2027 · 50 días de plan L-V (último vie 12-mar) · PROVISIONAL
 *   LIBRE_POST_ENCAPS lun 15-mar-2027 → lun 15-mar-2027 · PROVISIONAL
 *   F3                mar 16-mar-2027 → dom 2-may-2027 · 32 días de plan L-V (último vie 30-abr) · PROVISIONAL
 *   F4                lun 3-may-2027 → sáb 25-sep-2027 · 126 días de plan L-S (último sáb 25-sep) · PROVISIONAL
 *   EXAMEN            dom 26-sep-2027 → lun 27-sep-2027 · PROVISIONAL
 *   F5                mar 28-sep-2027 → abierta · PROVISIONAL
 * ENCAPS dom 14-mar-2027 PROVISIONAL (sin convocatoria al mié 17-feb → descartado) · reinicio Step 1 mar 16-mar-2027
 * SERUMS lun 3-may-2027 [supuesto] (inducción → dom 16-may) · GO/NO-GO lun 9-ago-2027 (E-49) · ritual sáb 25-sep · viaje dom 26-sep
 * EXAMEN Step 1 lun 27-sep-2027 PROVISIONAL · fecha a RESERVAR con ENCAPS dom 14-mar = mar 31-ago-2027 (DJ-1) · STEP1_SEMANAS = 39
 * Protegidos: vie 12-mar (D-1 hábil ENCAPS) · sáb 13-mar (D-1 ENCAPS) · dom 14-mar (ENCAPS (provisional)) · lun 15-mar (lunes libre post-ENCAPS) · sáb 25-sep (ritual test-day) · dom 26-sep (viaje D-1) · lun 27-sep (EXAMEN Step 1) · la adjudicación SERUMS se añadirá al conocerse (motivo «adjudicación …»).
 * SKIP (sin sesión de ningún plan): vie 25-dic · jue 31-dic · vie 1-ene · jue 25-mar · vie 26-mar.
 */

// ── el JSON (tal cual) ──
export interface ProtegidoV6 { fecha: string; motivo: string }
export interface FechasV6 {
  version: string; decidido: string;
  f1: { inicio: string; fin: string; dias: number };
  transicion: { desde: string; hasta: string };
  encaps: { examen: string; provisional: boolean; intensiva_desde: string; pretest: string; nucleo_hasta: string; convocatoria_tope: string; escenarios: string[] };
  step1: {
    reinicio: string; examen: string; adelanto: string; planB: string; gonogo: string; eligibility: string;
    viaje_d1: string; ritual: string; provisional: boolean; reserva_por_encaps: Record<string, string>;
  };
  serums: { inicio: string; supuesto: boolean; dias_plan: string; domingo: string; adaptacion_hasta: string };
  skip: string[];
  protegidos: ProtegidoV6[];
  feriados: string[];
  /** v6.01: bitácora de corrimientos del D1 (informativa) */
  corrimientos: { fecha: string; version: string; d1_previo: string; d1: string; perdidos: string[]; regla: string }[];
  /** v6.02d: semana 1 corrida (alias en la consulta; ver corridaS1De / fechaPlanDe) */
  corrida_s1: {
    decidido: string; version: string; motivo: string;
    sin_sesion: string[];
    alias: Record<string, string>;
    reparto: Record<string, { de: string; partes: { de: string; bloques: Record<string, number> }[] }>;
  };
}
export const FECHAS_V6: FechasV6 = {
  "version": "v6.02",
  "decidido": "2026-10-06",
  "f1": {
    "inicio": "2026-10-19",
    "fin": "2026-12-30",
    "dias": 52
  },
  "transicion": {
    "desde": "2026-12-31",
    "hasta": "2027-01-03"
  },
  "encaps": {
    "examen": "2027-03-14",
    "provisional": true,
    "intensiva_desde": "2027-01-04",
    "pretest": "2027-01-08",
    "nucleo_hasta": "2027-03-05",
    "convocatoria_tope": "2027-02-17",
    "escenarios": [
      "2027-03-14",
      "2027-03-21",
      "2027-04-04",
      "2027-04-11",
      "2027-04-18",
      "2027-04-25"
    ]
  },
  "step1": {
    "reinicio": "2027-03-16",
    "examen": "2027-09-27",
    "adelanto": "2027-08-31",
    "planB": "2027-10-25",
    "gonogo": "2027-08-09",
    "eligibility": "2027-08..2027-10",
    "viaje_d1": "2027-09-26",
    "ritual": "2027-09-25",
    "provisional": true,
    "reserva_por_encaps": {
      "2027-03-14": "2027-08-31",
      "2027-03-21": "2027-08-31",
      "2027-04-04": "2027-09-27",
      "2027-04-11": "2027-09-27",
      "2027-04-18": "2027-10-25",
      "2027-04-25": "2027-10-25"
    }
  },
  "serums": {
    "inicio": "2027-05-03",
    "supuesto": true,
    "dias_plan": "L-S",
    "domingo": "libre",
    "adaptacion_hasta": "2027-05-16"
  },
  "skip": [
    "2026-12-25",
    "2026-12-31",
    "2027-01-01",
    "2027-03-25",
    "2027-03-26"
  ],
  "protegidos": [
    {
      "fecha": "2027-03-12",
      "motivo": "D-1 hábil ENCAPS"
    },
    {
      "fecha": "2027-03-13",
      "motivo": "D-1 ENCAPS"
    },
    {
      "fecha": "2027-03-14",
      "motivo": "ENCAPS (provisional)"
    },
    {
      "fecha": "2027-03-15",
      "motivo": "lunes libre post-ENCAPS"
    },
    {
      "fecha": "2027-09-25",
      "motivo": "ritual test-day"
    },
    {
      "fecha": "2027-09-26",
      "motivo": "viaje D-1"
    },
    {
      "fecha": "2027-09-27",
      "motivo": "EXAMEN Step 1"
    }
  ],
  "feriados": [
    "2026-10-08",
    "2026-11-01",
    "2026-12-08",
    "2026-12-09",
    "2026-12-25",
    "2027-01-01",
    "2027-03-25",
    "2027-03-26",
    "2027-05-01",
    "2027-06-07",
    "2027-06-29",
    "2027-07-23",
    "2027-07-28",
    "2027-07-29",
    "2027-08-06",
    "2027-08-30",
    "2027-10-08"
  ],
  "corrimientos": [
    {
      "fecha": "2026-10-10",
      "version": "v6.01",
      "d1_previo": "2026-10-07",
      "d1": "2026-10-12",
      "perdidos": [
        "2026-10-07",
        "2026-10-08",
        "2026-10-09"
      ],
      "regla": "F1 no se alarga (la intensiva ENCAPS empieza el 4-ene): D1-D57 corren rígidos con su D#, C1/C2 consumidos, D58 (bioestadística, ex-D79) pasa al tramo 2 como fila desplazada (uid C79, dOrig 79, T3 jue 18-mar) vía --f1-filas 57 (no como recuperación --pendientes-f1); examen Step 1 sin cambio"
    },
    {
      "fecha": "2026-10-17",
      "version": "v6.02",
      "d1_previo": "2026-10-12",
      "d1": "2026-10-19",
      "perdidos": [
        "2026-10-12",
        "2026-10-13",
        "2026-10-14",
        "2026-10-15",
        "2026-10-16"
      ],
      "regla": "F1 anclada (la intensiva ENCAPS empieza el 4-ene): 52 hábiles; los hitos F1 NO se desplazan (UWSA1 D1 · NBME 25 D10 · 26 D25 · 27 D40 · NBME 28 = última sesión de F1, mié 30-dic); las 6 filas de temario que no caben (v5.20 D52-D54, D56, D57 Heme/Onco + D79 bioestadística) pasan al tramo 2 como filas desplazadas con su dOrig; examen Step 1 sin cambio"
    }
  ],
  "corrida_s1": {
    "decidido": "2026-10-19",
    "version": "v6.02d",
    "motivo": "Orden de Joseph (lun 19-oct-2026, sin estudio ese día): «lo que no hicimos hoy, córrelo para mañana; lo del 20 para el 21, lo del 21 para el 22, lo del 22 para el 23, lo del 23 para el 24 y 25 (repártelo); el 26 ya iniciamos siguiendo el mismo ritmo: no modifiques los demás días». Alias en la CONSULTA (los planes, Supabase, runners y guías conservan su fecha de plan): sáb 24 = la mañana del vie 23 (04:15 · 05:00 · 07:15-12:00 · 12:30 · 13:00) + la eval USMLE a las 13:30 (18:00 choca con el YouTube del sábado); dom 25 = la tarde del vie 23 desde las 07:15 (13:30 → 17:15 corrido −6 h 15′; el baile del domingo 17:15 no se toca) + revisión semanal 11:45 y cierre del OUTPUT de Business 12:15 (del sáb 07:15/07:45, +4 h 30′). Desde el lun 26-oct nada cambia.",
    "sin_sesion": [
      "2026-10-19"
    ],
    "alias": {
      "2026-10-20": "2026-10-19",
      "2026-10-21": "2026-10-20",
      "2026-10-22": "2026-10-21",
      "2026-10-23": "2026-10-22"
    },
    "reparto": {
      "2026-10-24": {
        "de": "2026-10-23",
        "partes": [
          {
            "de": "2026-10-23",
            "bloques": {
              "vibe": 0,
              "anki": 0,
              "usmle": 0,
              "syn": 0,
              "biz": 0,
              "eval": -270
            }
          },
          {
            "de": "2026-10-24",
            "bloques": {
              "pc": 0,
              "anki-sab": 0
            }
          }
        ]
      },
      "2026-10-25": {
        "de": "2026-10-23",
        "partes": [
          {
            "de": "2026-10-23",
            "bloques": {
              "rd": -375,
              "aurum": -375,
              "mir": -375,
              "encaps": -375,
              "liv": -375
            }
          },
          {
            "de": "2026-10-24",
            "bloques": {
              "revision": 270,
              "biz": 270
            }
          },
          {
            "de": "2026-10-25",
            "bloques": {
              "feynman": 0,
              "anki-dom": 0
            }
          }
        ]
      }
    }
  }
};

/** Valores derivados por gen_fechas_v6.js (los mismos que dan las funciones de abajo con FECHAS_V6). */
export const DERIVADOS_V6 = {
  /** último hábil antes del ENCAPS (medio día ENCAPS · protegido para los demás planes) */
  d1HabilEncaps: "2027-03-12",
  /** lunes libre post-ENCAPS (protegido, DJ-2) */
  lunesLibre: "2027-03-15",
  /** reinicio del Step 1 = primer martes > ENCAPS */
  reinicio: "2027-03-16",
  /** fin de F3 = día hábil anterior al SERUMS */
  f3Fin: "2027-04-30",
  /** fin de la inducción SERUMS (inicio + 13 d) */
  adaptacionHasta: "2027-05-16",
  /** último día con estudio (D95: sesión mínima) = día de plan anterior al ritual */
  ultimoDiaEstudio: "2027-09-24",
  /** ritual de test-day = último día de plan < E−1 */
  ritual: "2027-09-25",
  viajeD1: "2027-09-26",
  gonogo: "2027-08-09",
  convocatoriaTope: "2027-02-17",
  /** fecha a RESERVAR (FSMB/Prometric) con el ENCAPS vigente — DJ-1 */
  reserva: "2027-08-31",
  semanasF1: 11,
  step1Semanas: 39,
  diasF1: 52, diasF2: 50, diasF3: 32, diasF4: 126,
} as const;

// ── fases (tabla A1 resuelta) ──
export type FaseV6 = 'F1' | 'TRANSICION' | 'F2' | 'LIBRE_POST_ENCAPS' | 'F3' | 'F4' | 'EXAMEN' | 'F5';
export interface FaseV6Info {
  id: FaseV6;
  /** qué se hace (tabla A1) */
  nombre: string;
  /** etiqueta corta para el Home (TodayMission.faseActual, §F) */
  etiqueta: string;
  /** rango de CALENDARIO (inclusive; contiguo con la fase siguiente) · hasta null = abierta */
  desde: string; hasta: string | null;
  /** último día de plan de la fase (F2: medio día del D-1 hábil · F4: ritual) */
  ultimoDiaPlan: string | null;
  diasPlan: number;
  diasSemana: 'L-V' | 'L-S' | null;
  /** depende del ENCAPS / SERUMS / examen provisionales */
  provisional: boolean;
}
export const FASES_V6: FaseV6Info[] = [
  {"id":"F1","nombre":"Step 1 tramo 1 (6h15: 05:00 · 07:15-12:00 · 18:00) + ENCAPS lento 1 h (16:15)","etiqueta":"F1 · STEP 1 TRAMO 1 (D1-D52)","desde":"2026-10-19","hasta":"2026-12-30","ultimoDiaPlan":"2026-12-30","diasPlan":52,"diasSemana":"L-V","provisional":false},
  {"id":"TRANSICION","nombre":"Transición sin sesión (Anki opcional)","etiqueta":"TRANSICIÓN","desde":"2026-12-31","hasta":"2027-01-03","ultimoDiaPlan":null,"diasPlan":0,"diasSemana":null,"provisional":false},
  {"id":"F2","nombre":"ENCAPS intensiva (≈32 h/sem) + Step 1 en mantenimiento (Anki 30' L-V + sáb 07:45 20Q)","etiqueta":"F2 · ENCAPS INTENSIVA (examen dom 14-mar PROVISIONAL)","desde":"2027-01-04","hasta":"2027-03-14","ultimoDiaPlan":"2027-03-12","diasPlan":50,"diasSemana":"L-V","provisional":true},
  {"id":"LIBRE_POST_ENCAPS","nombre":"Lunes libre post-ENCAPS (protegido, DJ-2)","etiqueta":"LIBRE post-ENCAPS","desde":"2027-03-15","hasta":"2027-03-15","ultimoDiaPlan":null,"diasPlan":0,"diasSemana":null,"provisional":true},
  {"id":"F3","nombre":"Step 1 tiempo completo 7h15 (F1 + 16:15 REENTRADA)","etiqueta":"F3 · STEP 1 TIEMPO COMPLETO","desde":"2027-03-16","hasta":"2027-05-02","ultimoDiaPlan":"2027-04-30","diasPlan":32,"diasSemana":"L-V","provisional":true},
  {"id":"F4","nombre":"SERUMS 6 h (turno M/T variable) + Step 1 por plantilla de turno · L-S, domingo libre","etiqueta":"F4 · STEP 1 + SERUMS","desde":"2027-05-03","hasta":"2027-09-25","ultimoDiaPlan":"2027-09-25","diasPlan":126,"diasSemana":"L-S","provisional":true},
  {"id":"EXAMEN","nombre":"D-1 viaje a Lima + EXAMEN Step 1","etiqueta":"EXAMEN STEP 1","desde":"2027-09-26","hasta":"2027-09-27","ultimoDiaPlan":null,"diasPlan":0,"diasSemana":null,"provisional":true},
  {"id":"F5","nombre":"Post-Step 1 (esbozo): MIR principal hasta el fin del SERUMS (~abr-2028)","etiqueta":"F5 · post-Step 1","desde":"2027-09-28","hasta":null,"ultimoDiaPlan":null,"diasPlan":0,"diasSemana":null,"provisional":true},
];

// ── conjuntos de días ──
/** Días SIN SESIÓN de ningún plan (25-dic, 31-dic, 1-ene, Jueves y Viernes Santo 2027). */
export const SKIP_V6: Set<string> = new Set(FECHAS_V6.skip);
/** Feriados nacionales (gob.pe). En F1 son sesión; en F4, si la posta no programa turno → plantilla L (día doble). */
export const FERIADOS_V6: Set<string> = new Set(FECHAS_V6.feriados);
/** Días protegidos (A3): sin MIR, Research, Derma ni AURUM; solo el ritual (USMLE) y el medio día (ENCAPS) tienen fila. */
export const DIAS_PROTEGIDOS: Set<string> = new Set(FECHAS_V6.protegidos.map((p) => p.fecha));

/** Turno de la posta SERUMS (§B4.1): M mañana 07-13 · T tarde 13-19 · L feriado/sin turno · G guardia. */
export type Turno = 'M' | 'T' | 'L' | 'G';
export const TURNOS: Turno[] = ['M', 'T', 'L', 'G'];
/** Planes con excepciones en esDiaPlan (V3); el resto usa la regla genérica. */
export type PlanV6 = 'usmle' | 'encaps' | 'mir' | 'research' | 'derma' | 'aurum';

// ── calendario (UTC-noon, sin zonas horarias; mismo criterio que los generadores node) ──
const MAX_PASOS = 400; // guarda anti-bucle (fecha inválida)
const _D = (s: string): Date => new Date(s + 'T12:00:00Z');
const _add = (s: string, n: number): string => { const d = _D(s); if (isNaN(d.getTime())) return s; d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const _wd = (s: string): number => _D(s).getUTCDay();
const _diff = (a: string, b: string): number => Math.round((_D(b).getTime() - _D(a).getTime()) / 864e5);
const _lunesDe = (s: string): string => { const w = _wd(s); return _add(s, w === 0 ? -6 : 1 - w); };
const _esHabil = (s: string, skip: Set<string>): boolean => { const w = _wd(s); return w >= 1 && w <= 5 && !skip.has(s); };
const _primerDowTras = (s: string, dow: number): string => {
  let x = _add(s, 1);
  for (let i = 0; i < MAX_PASOS; i++, x = _add(x, 1)) if (_wd(x) === dow) return x;
  throw new Error('fecha inválida: ' + s);
};
const ADJUDICACION_V6: ProtegidoV6[] = FECHAS_V6.protegidos.filter((p) => /adjudicaci|inducci|documentos/i.test(p.motivo));

/** Día de plan «de calendario» (sin protegidos): L-V; L-S desde el inicio del SERUMS (DJ-3); nunca domingo ni SKIP. */
export function esDiaPlanBase(iso: string, serumsInicio: string = FECHAS_V6.serums.inicio, skip: Set<string> = SKIP_V6): boolean {
  const w = _wd(iso);
  if (!(w >= 0) || w === 0 || skip.has(iso)) return false;
  return w <= 5 || iso >= serumsInicio;
}

// ── derivaciones §A4 (mismas reglas y firmas que DATA/_scripts/gen_fechas_v6.js) ──
/** Reinicio del Step 1 = primer MARTES posterior al ENCAPS (DJ-2; vale para examen en sábado o domingo). */
export function reinicioDe(encaps: string = FECHAS_V6.encaps.examen): string { return _primerDowTras(encaps, 2); }
/** Lunes libre post-ENCAPS = primer lunes posterior al ENCAPS. */
export function lunesLibreDe(encaps: string = FECHAS_V6.encaps.examen): string { return _primerDowTras(encaps, 1); }
/** Último día hábil (L-V sin SKIP) estrictamente anterior a `iso`. */
export function ultimoHabilAntes(iso: string, skip: Set<string> = SKIP_V6): string {
  let x = _add(iso, -1);
  for (let i = 0; i < MAX_PASOS; i++, x = _add(x, -1)) if (_esHabil(x, skip)) return x;
  throw new Error('fecha inválida: ' + iso);
}
/** Fin de F3 = día hábil anterior al inicio del SERUMS. */
export function f3FinDe(serumsInicio: string = FECHAS_V6.serums.inicio, skip: Set<string> = SKIP_V6): string { return ultimoHabilAntes(serumsInicio, skip); }
/** Fin de la inducción = serums.inicio + 13 d (dos semanas naturales). */
export function adaptacionHastaDe(serumsInicio: string = FECHAS_V6.serums.inicio): string { return _add(serumsInicio, 13); }
/** GO/NO-GO = examen − 49 d (E-49). */
export function gonogoDe(examen: string = FECHAS_V6.step1.examen): string { return _add(examen, -49); }
/** Sin convocatoria a esta fecha, ese ENCAPS queda descartado (regla de los 25 días). */
export function convocatoriaTopeDe(encaps: string = FECHAS_V6.encaps.examen): string { return _add(encaps, -25); }
/** D-1 = viaje a Lima. */
export function viajeD1De(examen: string = FECHAS_V6.step1.examen): string { return _add(examen, -1); }
/** Ritual de test-day = último día de plan anterior a E−1 (nunca la fórmula {E−2}). `extra` = protegidos de entrada (adjudicación). */
export function ritualDe(examen: string = FECHAS_V6.step1.examen, serumsInicio: string = FECHAS_V6.serums.inicio, skip: Set<string> = SKIP_V6,
  extra: string[] = ADJUDICACION_V6.map((p) => p.fecha)): string {
  let x = _add(examen, -2);
  for (let i = 0; i < MAX_PASOS; i++, x = _add(x, -1)) if (esDiaPlanBase(x, serumsInicio, skip) && !extra.includes(x)) return x;
  throw new Error('fecha inválida: ' + examen);
}
/** Días protegidos (A3) para un escenario: {último hábil antes del ENCAPS, D-1, ENCAPS, lunes siguiente} ∪ {ritual, E−1, E} ∪ {adjudicación}. */
export function protegidosDe(p: { encaps?: string; encapsProvisional?: boolean; examen?: string; serumsInicio?: string; skip?: Set<string>; adjudicacion?: ProtegidoV6[] } = {}): ProtegidoV6[] {
  const encaps = p.encaps ?? FECHAS_V6.encaps.examen, examen = p.examen ?? FECHAS_V6.step1.examen;
  const serumsInicio = p.serumsInicio ?? FECHAS_V6.serums.inicio, skip = p.skip ?? SKIP_V6, adjudicacion = p.adjudicacion ?? ADJUDICACION_V6;
  const provisional = p.encapsProvisional ?? FECHAS_V6.encaps.provisional;
  const lista: ProtegidoV6[] = [
    { fecha: ultimoHabilAntes(encaps, skip), motivo: 'D-1 hábil ENCAPS' },
    { fecha: _add(encaps, -1), motivo: 'D-1 ENCAPS' },
    { fecha: encaps, motivo: provisional ? 'ENCAPS (provisional)' : 'ENCAPS' },
    { fecha: lunesLibreDe(encaps), motivo: 'lunes libre post-ENCAPS' },
    { fecha: ritualDe(examen, serumsInicio, skip, adjudicacion.map((a) => a.fecha)), motivo: 'ritual test-day' },
    { fecha: viajeD1De(examen), motivo: 'viaje D-1' },
    { fecha: examen, motivo: 'EXAMEN Step 1' },
    ...adjudicacion.map((a) => ({ fecha: a.fecha, motivo: a.motivo })),
  ];
  const vistos = new Set<string>();
  return lista.filter((x) => !vistos.has(x.fecha) && !!vistos.add(x.fecha)).sort((a, b) => (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0));
}
/** DJ-1 (Joseph, 6-oct-2026): fecha a RESERVAR por fecha del ENCAPS — ≤ 21-mar → 31-ago · ≤ 11-abr → 27-sep · después → 25-oct. */
export const DJ1_V6: { encapsHasta: string | null; examen: string }[] = [{"encapsHasta":"2027-03-21","examen":"2027-08-31"},{"encapsHasta":"2027-04-11","examen":"2027-09-27"},{"encapsHasta":null,"examen":"2027-10-25"}];
export function reservaDJ1(encaps: string = FECHAS_V6.encaps.examen): string {
  for (const x of DJ1_V6) if (x.encapsHasta === null || encaps <= x.encapsHasta) return x.examen;
  return FECHAS_V6.step1.planB; // inalcanzable: la última fila de DJ-1 no tiene tope
}
/** Fecha a RESERVAR guardada en el JSON (validada = DJ-1, o la regla de cálculo si fue más tardía) o, si el escenario no está, DJ-1. */
export function reservaStep1(encaps: string = FECHAS_V6.encaps.examen): string { return FECHAS_V6.step1.reserva_por_encaps[encaps] ?? reservaDJ1(encaps); }
/** STEP1_SEMANAS de un escenario = SEMANAS_F1 (11, derivado de f1.inicio → f1.fin; v6.00: 13) + semanas(lunes del reinicio → lunes del examen). */
export function step1SemanasDe(reinicio: string = FECHAS_V6.step1.reinicio, examen: string = FECHAS_V6.step1.examen): number {
  return SEMANAS_F1 + _diff(_lunesDe(reinicio), _lunesDe(examen)) / 7;
}
/** Reinicio vigente del Step 1 (martes tras el lunes libre post-ENCAPS). */
export function reinicioStep1(): string { return FECHAS_V6.step1.reinicio; }

// ── predicados por fecha ──
export function esProtegido(iso: string): boolean { return DIAS_PROTEGIDOS.has(iso); }
export function motivoProtegido(iso: string): string | null { return FECHAS_V6.protegidos.find((p) => p.fecha === iso)?.motivo ?? null; }
export function esFeriado(iso: string): boolean { return FERIADOS_V6.has(iso); }
/** Step 1 en PAUSA (transición + F2 ENCAPS + lunes libre): estado PAUSA en la app, sin fila «hoy» (§B2, §F). */
export function enPausaStep1(iso: string): boolean { return iso > FECHAS_V6.f1.fin && iso < FECHAS_V6.step1.reinicio; }
/**
 * ¿Es `iso` día de plan? Sin `plan`: L-V (L-S desde serums.inicio), desde el D1, sin SKIP ni protegidos.
 * Con `plan`: 'usmle' añade el ritual (fila T final) y quita la PAUSA y lo posterior al ritual; 'encaps' añade el D-1 hábil
 * (medio día) y quita lo posterior al ENCAPS (excepciones de V3, §H). Los demás planes usan la regla genérica.
 */
export function esDiaPlan(iso: string, plan?: PlanV6): boolean {
  if (iso < FECHAS_V6.f1.inicio) return false;
  if (!esDiaPlanBase(iso)) return false;
  if (DIAS_PROTEGIDOS.has(iso)) {
    if (plan === 'usmle') return iso === FECHAS_V6.step1.ritual;
    if (plan === 'encaps') return iso === DERIVADOS_V6.d1HabilEncaps;
    return false;
  }
  if (plan === 'usmle') return !enPausaStep1(iso) && iso <= FECHAS_V6.step1.ritual;
  if (plan === 'encaps') return iso < FECHAS_V6.encaps.examen;
  return true;
}
/** Fase v6 de una fecha. Antes del D1 (≤ dom 18-oct-2026) devuelve 'F1' (la app ya muestra F1 la víspera). */
export function faseV6(iso: string): FaseV6 {
  if (iso < FECHAS_V6.f1.inicio) return 'F1';
  for (const x of FASES_V6) if (iso >= x.desde && (x.hasta === null || iso <= x.hasta)) return x.id;
  return 'F5';
}
export function faseV6Info(iso: string): FaseV6Info { const id = faseV6(iso); return FASES_V6.find((x) => x.id === id) ?? (FASES_V6[0] as FaseV6Info); }

// ── semana del Step 1 (definición única; antes en homeBriefing — §F, r2 · I7) ──
/** Semanas de F1 (S1 = semana del lun 19-oct → S11 = semana del lun 28-dic). */
export const SEMANAS_F1 = 11;
/** 39 = 11 (F1) + semanas(lunes del reinicio lun 15-mar → lunes del examen lun 27-sep); la semana del examen queda fuera (etiqueta 'examen'). */
export const STEP1_SEMANAS = 39;
export interface SemanaStep1 {
  /** 0 = antes del D1 · 1-11 = F1 · 11 durante la PAUSA (no avanza) · 12-STEP1_SEMANAS = tramo 2 · STEP1_SEMANAS + 1 = semana del examen */
  n: number;
  /** STEP1_SEMANAS */
  total: number;
  lunes: string; viernes: string; sabado: string;
  /** semanas de la pausa (lun 4-ene → semana del ENCAPS): semanaLabel = 'PAUSA · ENCAPS' */
  pausa: boolean;
  /** semana del examen Step 1: semanaLabel = 'examen' */
  examen: boolean;
  deload: boolean; deloadMotivo?: string | undefined;
  /** hito(s) del plan en esa semana (si se pasan en `extras.hitos`) */
  hito?: string | undefined;
  /** n < 1 o n > total, salvo en la pausa (el chip PAUSA se muestra) */
  fueraDeRango: boolean;
}
/** Datos del plan que la hoja no puede importar (hitosStep1(), DELOAD_SEMANAS de homeBriefing): se pasan aquí. */
export interface SemanaStep1Extras {
  hitos?: { fecha: string; nombre: string }[];
  deloads?: { lunes: string; motivo: string }[];
}
/**
 * Semana del Step 1 (lunes→domingo; determinista, sin reloj): S1-S11 = F1 · pausa (lun 4-ene → semana del ENCAPS) →
 * { pausa: true } · desde la semana del reinicio 11 + k · semana del examen → { examen: true }.
 */
export function semanaStep1(iso: string, extras: SemanaStep1Extras = {}): SemanaStep1 {
  const lunes = _lunesDe(iso), lunRein = _lunesDe(FECHAS_V6.step1.reinicio);
  let n: number, pausa = false;
  if (iso < FECHAS_V6.f1.inicio) n = 0;                                   // pre-D1 (días de la semana 1 anteriores al D1)
  else if (lunes <= _lunesDe(FECHAS_V6.f1.fin)) n = 1 + _diff(_lunesDe(FECHAS_V6.f1.inicio), lunes) / 7;
  else if (lunes < lunRein) { n = SEMANAS_F1; pausa = true; }              // PAUSA · ENCAPS
  else n = SEMANAS_F1 + 1 + _diff(lunRein, lunes) / 7;                    // tramo 2
  const examen = lunes === _lunesDe(FECHAS_V6.step1.examen);
  const domingo = _add(lunes, 6);
  const dl = (extras.deloads ?? []).find((x) => x.lunes === lunes);
  const hito = (extras.hitos ?? []).filter((h) => h.fecha >= lunes && h.fecha <= domingo).map((h) => h.nombre).join(' + ') || undefined;
  return {
    n, total: STEP1_SEMANAS, lunes, viernes: _add(lunes, 4), sabado: _add(lunes, 5), pausa, examen,
    deload: !!dl, deloadMotivo: dl ? dl.motivo : undefined, hito, fueraDeRango: !pausa && (n < 1 || n > STEP1_SEMANAS),
  };
}

// ── v6.02d: semana 1 corrida (orden de Joseph del lun 19-oct-2026) ──
/** Parte de un día de reparto: bloques de la plantilla de la fecha de plan «de» (id de bloque de plantillasV6 → desfase en minutos). */
export interface ParteCorridaS1 { de: string; bloques: Record<string, number> }
export type CorridaS1 =
  | { tipo: 'sin_sesion' }
  | { tipo: 'alias'; de: string }
  | { tipo: 'reparto'; de: string; partes: ParteCorridaS1[] };
/**
 * Semana corrida: lun 19-oct sin sesión · mar 20-oct = plan del lun 19-oct · mié 21-oct = plan del mar 20-oct · jue 22-oct = plan del mié 21-oct · vie 23-oct = plan del jue 22-oct ·
 * sáb 24-oct = vibe+anki+usmle+syn+biz+eval del vie 23-oct / pc+anki-sab del sáb 24-oct · dom 25-oct = rd+aurum+mir+encaps+liv del vie 23-oct / revision+biz del sáb 24-oct / feynman+anki-dom del dom 25-oct.
 * null fuera de esos días: el resto del calendario es idéntico (los planes, Supabase, runners y guías conservan su fecha de plan).
 */
export function corridaS1De(iso: string): CorridaS1 | null {
  const c = FECHAS_V6.corrida_s1;
  if (c.sin_sesion.includes(iso)) return { tipo: 'sin_sesion' };
  const a = c.alias[iso];
  if (a) return { tipo: 'alias', de: a };
  const r = c.reparto[iso];
  return r ? { tipo: 'reparto', de: r.de, partes: r.partes } : null;
}
/** Ids de bloque de plantillasV6 de cada frente (en un día de reparto, la vista de un frente sigue a la parte que tiene su bloque). */
export const BLOQUES_POR_FRENTE: Record<string, string[]> = {
  usmle: ['anki', 'usmle', 'eval', 'anki-sab', 'anki-dom'], mir: ['mir'], encaps: ['encaps'], 'research-derma': ['rd'], aurum: ['aurum'],
  liviano: ['liv'], synapse: ['syn', 'pc', 'feynman'], vibecoding: ['vibe', 'pc', 'feynman'], business: ['biz'], revision: ['revision'],
};
/**
 * Fecha de PLAN que toca un día real (vistas por frente): alias → el plan del día anterior · reparto (sáb/dom) → con `frente`, la fecha
 * de plan de la parte que lleva un bloque de ese frente ese día (p. ej. dom 25 USMLE → el Anki del propio domingo; sáb 24 USMLE → vie 23);
 * si ese día no tiene bloque del frente, el día repartido (su sesión es el otro día del fin de semana) · resto → la propia.
 */
export function fechaPlanDe(iso: string, frente?: string): string {
  const c = corridaS1De(iso);
  if (!c || c.tipo === 'sin_sesion') return iso;
  if (c.tipo === 'alias' || !frente) return c.de;
  const ids = BLOQUES_POR_FRENTE[frente] ?? [];
  const parte = c.partes.find((p) => Object.keys(p.bloques).some((id) => ids.includes(id)));
  return parte ? parte.de : c.de;
}
/**
 * Inversa de fechaPlanDe para MOSTRAR fechas (mar 20-oct-2026, a pedido de Joseph: «dice que empieza el 19 y estamos empezando el 20»):
 * día REAL en que se hace la fila cuya fecha de plan es `plan` (19 → mar 20 … 22 → vie 23; 23 → sáb 24 o dom 25 según el `frente`;
 * sábado nativo 24 → sáb 24 o dom 25 según el frente). Fuera de la semana corrida = la propia. Solo para etiquetas: las filas, el
 * progreso y Supabase siguen con la fecha de plan.
 */
export function fechaRealDe(plan: string, frente?: string): string {
  const c = FECHAS_V6.corrida_s1;
  for (const [r, de] of Object.entries(c.alias)) if (de === plan) return r;
  const ids = frente ? (BLOQUES_POR_FRENTE[frente] ?? []) : null;
  for (const [r, x] of Object.entries(c.reparto)) for (const p of x.partes) if (p.de === plan && (!ids || Object.keys(p.bloques).some((id) => ids.includes(id)))) return r;
  return plan;
}
