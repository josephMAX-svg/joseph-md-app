/**
 * fechasV6.ts — FUENTE ÚNICA DE FECHAS v6.00 · GENERADO por DATA/_scripts/gen_fechas_v6.js desde DATA/_scripts/_fechas_v6.json
 * — NO editar a mano (V6_ESPEC §A4/§F). Para mover una fecha: editar el JSON (disparadores de §I) y volver a correr
 * `node DATA/_scripts/gen_fechas_v6.js` (aborta si un valor guardado ≠ derivado) y después los generadores de cada plan.
 *
 * v6.00 (decidido mar 6-oct-2026): reestructuración anual (DJ-1…DJ-5) — sustituye a v5.20 (Step 1 lun 22-feb · ENCAPS mié 10-mar).
 * v6.01 (sáb 10-oct-2026): corrimiento rígido del D1 mié 7-oct-2026 → lun 12-oct-2026 (perdidos: mié 7-oct · jue 8-oct · vie 9-oct).
 * v6.02 (sáb 17-oct-2026): corrimiento rígido del D1 lun 12-oct-2026 → lun 19-oct-2026 (perdidos: lun 12-oct · mar 13-oct · mié 14-oct · jue 15-oct · vie 16-oct).
 * v6.03 (mar 20-oct-2026): corrimiento rígido del D1 lun 19-oct-2026 → mié 21-oct-2026 (perdidos: lun 19-oct · mar 20-oct).
 * v6.04 (mié 21-oct-2026): examen Step 1 lun 27-sep-2027 → lun 25-oct-2027 (decisión de Joseph; step1.cambios).
 * v6.05 (sáb 24-oct-2026): corrimiento rígido del D1 mié 21-oct-2026 → lun 26-oct-2026 (perdidos: mié 21-oct · jue 22-oct · vie 23-oct).
 * v6.06 (sáb 31-oct-2026): corrimiento rígido del D1 lun 26-oct-2026 → lun 2-nov-2026 (perdidos: lun 26-oct · mar 27-oct · mié 28-oct · jue 29-oct · vie 30-oct).
 * v6.07 (dom 8-nov-2026): corrimiento rígido del D1 lun 2-nov-2026 → lun 9-nov-2026 (perdidos: lun 2-nov · mar 3-nov · mié 4-nov · jue 5-nov · vie 6-nov).
 * v6.07 (dom 8-nov-2026): examen Step 1 lun 25-oct-2027 → lun 6-dic-2027 (decisión de Joseph; step1.cambios).
 * v6.08 (sáb 14-nov-2026): corrimiento rígido del D1 lun 9-nov-2026 → lun 16-nov-2026 (perdidos: lun 9-nov · mar 10-nov · mié 11-nov · jue 12-nov · vie 13-nov).
 * v6.09 (lun 16-nov-2026): corrimiento rígido del D1 lun 16-nov-2026 → mar 17-nov-2026 (perdidos: lun 16-nov).
 * v6.10 (mar 17-nov-2026): corrimiento rígido del D1 mar 17-nov-2026 → mié 18-nov-2026 (perdidos: mar 17-nov).
 * v6.10d (mié 18-nov-2026): corrimiento rígido del D1 mié 18-nov-2026 → jue 19-nov-2026 (perdidos: mié 18-nov).
 * v7.00 (sáb 28-nov-2026): corrimiento rígido del D1 jue 19-nov-2026 → lun 30-nov-2026 (perdidos: jue 19-nov · vie 20-nov · lun 23-nov · mar 24-nov · mié 25-nov · jue 26-nov · vie 27-nov).
 * v7.00 (sáb 28-nov-2026): examen Step 1 lun 6-dic-2027 → lun 20-dic-2027 (decisión de Joseph; step1.cambios).
 * v7.00 (sáb 28-nov-2026): corrida_s1 sin alias ni reparto (corridaS1De / fechaPlanDe dan la propia fecha) — sin sesión lun 19-oct → dom 29-nov (solo días sin sesión: los planes ya están re-fechados por el corrimiento).
 * Versión vigente del JSON: v7.00 (decidida el sáb 28-nov-2026).
 * Step 1 en PAUSA desde el lun 30-nov-2026 (step1.pausa_desde; 0 mañanas de Step en F1) hasta el reinicio · mantenimiento: 18 sesiones USMLE (mar · jue 18:00-18:45 de F1 y la transición · sáb 04:15-05:45 de la intensiva hasta el sáb 27-feb).
 * Módulo HOJA: no importa nada de src/ (r2 · I7: corta el ciclo usmleStep1Daily ↔ homeBriefing; STEP1_SEMANAS, semanaStep1 y
 * Turno viven aquí y homeBriefing los re-exporta).
 *
 * Fases (tabla A1 resuelta):
 *   F1                lun 30-nov-2026 → mié 30-dic-2026 · 22 días de plan L-V (último mié 30-dic)
 *   TRANSICION        jue 31-dic-2026 → dom 3-ene-2027 · 1 días de plan null (último jue 31-dic)
 *   F2                lun 4-ene-2027 → dom 14-mar-2027 · 50 días de plan L-V (último vie 12-mar) · PROVISIONAL
 *   LIBRE_POST_ENCAPS lun 15-mar-2027 → lun 15-mar-2027 · PROVISIONAL
 *   F3                mar 16-mar-2027 → dom 2-may-2027 · 32 días de plan L-V (último vie 30-abr) · PROVISIONAL
 *   F4                lun 3-may-2027 → sáb 18-dic-2027 · 198 días de plan L-S (último sáb 18-dic) · PROVISIONAL
 *   EXAMEN            dom 19-dic-2027 → lun 20-dic-2027 · PROVISIONAL
 *   F5                mar 21-dic-2027 → abierta · PROVISIONAL
 * ENCAPS dom 14-mar-2027 PROVISIONAL (sin convocatoria al mié 17-feb → descartado) · reinicio Step 1 mar 16-mar-2027
 * SERUMS lun 3-may-2027 [supuesto] (inducción → dom 16-may) · GO/NO-GO lun 1-nov-2027 (E-49) · ritual sáb 18-dic · viaje dom 19-dic
 * EXAMEN Step 1 lun 20-dic-2027 PROVISIONAL · fecha a RESERVAR con ENCAPS dom 14-mar = lun 20-dic-2027 (DJ-1) · STEP1_SEMANAS = 40
 * Protegidos: vie 12-mar (D-1 hábil ENCAPS) · sáb 13-mar (D-1 ENCAPS) · dom 14-mar (ENCAPS (provisional)) · lun 15-mar (lunes libre post-ENCAPS) · sáb 18-dic (ritual test-day) · dom 19-dic (viaje D-1) · lun 20-dic (EXAMEN Step 1) · la adjudicación SERUMS se añadirá al conocerse (motivo «adjudicación …»).
 * SKIP (sin sesión de ningún plan): vie 25-dic · vie 1-ene · jue 25-mar · vie 26-mar.
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
    /** v6.04: bitácora de cambios de la fecha del examen (el último = examen vigente) */
    cambios: { fecha: string; version: string; examen_previo: string; examen: string; motivo: string }[];
    /** v6.07: días de la semana con mañana de Step 1 en F1 (1 = lun … 5 = vie; v6.07: [2, 4] = mar · jue) · v7.00: solo cuenta antes de pausa_desde */
    f1_dias_semana: number[];
    /** v7.00: primer día de la PAUSA del Step 1 (sin mañanas de Step; mantenimiento) — v7.00: el D1 (F1 sin mañanas de Step); hasta la v6.12, el día siguiente a f1.fin */
    pausa_desde: string;
    /** v7.00: sesiones USMLE de MANTENIMIENTO durante la pausa (usmleMantDe / USMLE_MANT_SESIONES): f1 = hábiles de pausa_desde → transicion.hasta en esos días ·
     *  f2 = días de la intensiva (encaps.intensiva_desde → hasta) en esos días; 1 = lun … 6 = sáb */
    mantenimiento: { f1: { dias_semana: number[]; hora: string }; f2: { dias_semana: number[]; hora: string; hasta: string } };
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
    reparto: Record<string, { de: string; partes: { de: string; bloques: Record<string, number> }[]; titulo?: string; nota?: string }>;
    /** v6.06a: texto de la nota de la semana corrida (opcional; si falta, plantillasV6 la arma con los datos) */
    resumen?: string;
    /** v6.07a: textos de la guía de un día de PLAN que no valen el día real en que se pinta (corridaTexto.reemplazosCorrida) */
    reemplazos?: Record<string, { frente?: string; a: string; por: string }[]>;
    /** v6.07a ronda 4: notas del Home por día real (las pinta plantillaDelDia arriba de las demás) */
    notas?: Record<string, string[]>;
    /** v6.10: día de fin de semana → { frente (clave de BLOQUES_POR_FRENTE): 'HH:MM-HH:MM' } = el bloque L-V de ese frente que recupera, a hora fija,
     *  el día perdido (plantillasV6 lo pinta con bloqueCorrido; cada generador tiene su fila ese día) */
    extra?: Record<string, Record<string, string | { hora: string; plan?: string }>>;
    /** v6.10q · v6.10y: alias PROPIO de un frente que manda sobre el global en su consulta (fechaPlanDe / fechaRealDe con `frente`): alias = día real L-V →
     *  plan · en_ship = domingo → fecha(s) de plan de los pasos que su SHIP absorbe (primero, en ese orden) · sin_sesion = días reales del alias global sin
     *  sesión de ese frente */
    alias_frente?: Record<string, { decidido: string; motivo: string; alias: Record<string, string>; en_ship?: Record<string, string | string[]>; sin_sesion?: string[] }>;
    /** v6.12 (mar 24-nov): sábados que pasan a ser un día de estudio completo (sin gimnasio ni baile): sus extras, de 04:15 a 20:30 */
    sabado_habil?: string[];
  };
}
export const FECHAS_V6: FechasV6 = {
  "version": "v7.00",
  "decidido": "2026-11-28",
  "f1": {
    "inicio": "2026-11-30",
    "fin": "2026-12-30",
    "dias": 22
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
    "nucleo_hasta": "2027-02-26",
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
    "examen": "2027-12-20",
    "adelanto": "2027-12-20",
    "planB": "2027-12-27",
    "gonogo": "2027-11-01",
    "eligibility": "2027-10..2027-12",
    "viaje_d1": "2027-12-19",
    "ritual": "2027-12-18",
    "provisional": true,
    "reserva_por_encaps": {
      "2027-03-14": "2027-12-20",
      "2027-03-21": "2027-12-27",
      "2027-04-04": "2027-12-27",
      "2027-04-11": "2027-12-27",
      "2027-04-18": "2027-12-27",
      "2027-04-25": "2027-12-27"
    },
    "cambios": [
      {
        "fecha": "2026-10-21",
        "version": "v6.04",
        "examen_previo": "2027-09-27",
        "examen": "2027-10-25",
        "motivo": "Orden de Joseph (mié 21-oct-2026): «con respecto a los días que dices que llevo perdido 37 días hábiles, ¿por qué solamente no alargas la fecha del examen del Step 1? … si es que iba a ser en agosto para septiembre, o si iba a ser septiembre para octubre … simplemente en lo que nos falta, alargar las fechas». Examen lun 27-sep → LUN 25-OCT-2027 (dentro de la elegibilidad ago-sep-oct). Nada antes del reinicio (mar 16-mar-2027) cambia; el tramo 2 se regenera con E = 25-oct y las semanas extra van al COLCHÓN (no se comprime nada). DJ-1 v6.04: 25-oct en todos los escenarios ENCAPS (sin adelanto; el plan B coincide con la base: un NO-GO del lun 6-sep ya no tiene fecha posterior dentro de la elegibilidad → extensión, §B5)."
      },
      {
        "fecha": "2026-11-08",
        "version": "v6.07",
        "examen_previo": "2027-10-25",
        "examen": "2027-12-06",
        "motivo": "Orden de Joseph (dom 8-nov-2026): «la mitad (o más) del tiempo del Step 1 hasta fin de año pasa al ENCAPS … el Step 1 puede correrse, pero no más allá de 2027» (meta ENCAPS: primer puesto). Con el Step solo los martes y jueves de F1 (15 mañanas) el tramo 2 con el 25-oct deja un DÉFICIT de 11 unidades (R1: nada se recorta) → primera fecha sin déficit lun 22-nov (colchón 2 filas ≈ 5 h). Elegido LUN 6-DIC-2027: colchón 14 filas ≈ 37 h + 3 lunes (13, 20 y 27-dic) de margen dentro de 2027. Hitos 2027: NBME 30 (24-may) y UWSA3 (29-jun) fijos; NBME 31 (4-oct), NBME 32 (11-oct) y UWSA2 (19-oct) + 6 semanas; NBME 33 + 3 bloques (ensayo de 7 bloques) en el feriado lun 1-nov (sin turno) y Free 120 lun 22-nov (E-14), como en la tabla del 27-sep. GO/NO-GO lun 18-oct (E-49, ≥ 294 h). La elegibilidad (aún sin inscribir) pasa a oct-nov-dic 2027."
      },
      {
        "fecha": "2026-11-28",
        "version": "v7.00",
        "examen_previo": "2027-12-06",
        "examen": "2027-12-20",
        "motivo": "Orden de Joseph (sáb 28-nov-2026): «del mar 24 al dom 29-nov no estudié; todo arranca el lun 30-nov; reestructura, corre días, modifica fechas» con el OBJETIVO ABSOLUTO del 1.er puesto ENCAPS (dom 14-mar-2027) → las mañanas de F1 son todas ENCAPS y el Step 1 queda en PAUSA hasta el mar 16-mar (mantenimiento: Anki ≤10′ L-V + sesión USMLE mar · jue 18:00 en dic y sáb 04:15 hasta el 27-feb, Mehlman en Tutor). Las 12 mañanas de Step de F1 pasan al tramo 2 y el lun 6-dic-2027 ya no cabe (déficit; R1: nada se recorta). Examen PROVISIONAL LUN 20-DIC-2027 con D2-D4 (Fundamentos + Inmunología) hechos en el mantenimiento: colchón 6 filas ≈ 16 h. Plan B LUN 27-DIC-2027 (ENCAPS posterior, NO-GO del lun 1-nov o D2-D4 sin cerrar el sáb 27-feb): colchón 6 filas ≈ 16 h con D2-D4 en la cola (el ritual caería el sáb 25-dic y no está comprobado el cupo de Prometric esa semana). Partiendo de cero: sin REENTRADA en T1, NBME 25 = línea base y NBME en orden 25 → 30; UWSA1 en el hueco del UWSA3 (mar 29-jun). Hitos 2027 = los del 6-dic + 2 semanas (NBME 30 y UWSA3 fijos): NBME 31 18-oct · NBME 32 25-oct · GO/NO-GO lun 1-nov (E-49) · UWSA2 mar 2-nov · NBME 33 solo lun 22-nov (E-28) · Free 120 + 4 bloques (ensayo de 7 bloques, que solo cabe en un día sin turno) en el feriado mié 8-dic (E-12), como en el patrón de la v6.04. La elegibilidad (aún sin inscribir) sigue en oct-nov-dic 2027."
      }
    ],
    "f1_dias_semana": [
      2,
      4
    ],
    "pausa_desde": "2026-11-30",
    "mantenimiento": {
      "f1": {
        "dias_semana": [
          2,
          4
        ],
        "hora": "18:00-18:45"
      },
      "f2": {
        "dias_semana": [
          6
        ],
        "hora": "04:15-05:45",
        "hasta": "2027-02-27"
      }
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
      "fecha": "2027-12-18",
      "motivo": "ritual test-day"
    },
    {
      "fecha": "2027-12-19",
      "motivo": "viaje D-1"
    },
    {
      "fecha": "2027-12-20",
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
    "2027-10-08",
    "2027-11-01",
    "2027-12-08",
    "2027-12-09",
    "2027-12-25"
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
    },
    {
      "fecha": "2026-10-20",
      "version": "v6.03",
      "d1_previo": "2026-10-19",
      "d1": "2026-10-21",
      "perdidos": [
        "2026-10-19",
        "2026-10-20"
      ],
      "regla": "Orden de Joseph (mar 20-oct): «todo comienza mañana miércoles 21, corre dos días; deja libres sáb 24 y dom 25; simplemente corre, no modifiques ni comprimas temas ni exámenes, alarga las fechas límite (también ENCAPS) en todos los segmentos». Patrón v6.02: F1 anclada (50 hábiles mié 21-oct → mié 30-dic) con los HITOS F1 anclados (UWSA1 D1 mié 21-oct · NBME 25/26/27 en su D# · NBME 28 = último slot); las 2 filas de temario no-hito que ya no caben pasan al tramo 2 con su dOrig (alargan el Step 1, examen sin cambio); ENCAPS: las 2 filas F1 que no caben se reponen explícitas en el carril B; secundarios +2 hábiles con el contenido intacto (alargan su fin). Sustituye a v6.02d (semana 1 corrida por alias, mar 20 = plan del lun 19)."
    },
    {
      "fecha": "2026-10-24",
      "version": "v6.05",
      "d1_previo": "2026-10-21",
      "d1": "2026-10-26",
      "perdidos": [
        "2026-10-21",
        "2026-10-22",
        "2026-10-23"
      ],
      "regla": "Orden de Joseph (sáb 24-oct): «todo inicia el lunes 26; puedes correr los horarios y alargar los plazos, pero no quites temas especiales, solo corre lo que está faltando». La semana del 19 no se estudió (la corrida por alias v6.04a queda sin efecto). Patrón v6.02/v6.03: F1 anclada (47 hábiles lun 26-oct → mié 30-dic) con HITOS F1 anclados (UWSA1 D1 lun 26 · NBME 25/26/27 en su D# · NBME 28 = último slot); las filas de temario no-hito que ya no caben pasan al tramo 2 con su dOrig (nada se quita); ENCAPS: las filas F1 que no caben se reponen en el carril B; secundarios +3 hábiles con el contenido intacto. Examen Step 1 lun 25-oct-2027 sin cambio (v6.04b)."
    },
    {
      "fecha": "2026-10-31",
      "version": "v6.06",
      "d1_previo": "2026-10-26",
      "d1": "2026-11-02",
      "perdidos": [
        "2026-10-26",
        "2026-10-27",
        "2026-10-28",
        "2026-10-29",
        "2026-10-30"
      ],
      "regla": "Orden de Joseph (sáb 31-oct): «reestructura todo a partir del 2 de noviembre … corre nada más, corre también las fechas límite, corre con una semana nada más: lo que era la semana anterior, esta semana; para no perder materias, tan solamente corre». La semana del 26-oct no se estudió. Mismo patrón que v6.05: F1 anclada (42 hábiles lun 2-nov → mié 30-dic) con hitos F1 (UWSA1 D1 lun 2-nov · NBME 28 = último slot; NBME 25-27 en su D# salvo que el Day-After no quepa antes del siguiente hito); las filas de temario que no caben pasan al tramo 2 con fecha (nada se quita); ENCAPS: las filas F1 que no caben se reponen con fecha; secundarios +5 hábiles con el contenido intacto y sus fechas límite corridas. Examen Step 1 lun 25-oct-2027 y ENCAPS dom 14-mar-2027 sin cambio (fechas externas)."
    },
    {
      "fecha": "2026-11-08",
      "version": "v6.07",
      "d1_previo": "2026-11-02",
      "d1": "2026-11-09",
      "perdidos": [
        "2026-11-02",
        "2026-11-03",
        "2026-11-04",
        "2026-11-05",
        "2026-11-06"
      ],
      "regla": "Orden de Joseph (dom 8-nov): «la mitad (o más) del tiempo del Step 1 hasta fin de año pasa al ENCAPS; meta primer puesto (> 17,5, ideal 19); empezamos mañana 9; sábados 14-17 libres para el en vivo de Theomed; domingos 4 h opcionales; el Step 1 puede correrse, pero no más allá de 2027». La semana del lun 2-nov no se estudió (la corrida v6.06a-e queda sin efecto). D1 de todo = lun 9-nov (F1 37 hábiles → mié 30-dic). Mañana 07:15-12:00: ENCAPS lun · mié · vie y Step 1 mar · jue (≈ 2/3 ENCAPS); el tramo 1 del Step se reduce a las mañanas de martes y jueves y lo que no cabe (hitos incluidos) pasa al tramo 2 con fecha; ENCAPS: la rotación F1 de las 16:15 corre +5 hábiles y lo que no cabe pasa a la intensiva con fecha; secundarios +5 hábiles. Plan: DATA/ENCAPS/PLAN_PRIMER_PUESTO_2027-I.md."
    },
    {
      "fecha": "2026-11-14",
      "version": "v6.08",
      "d1_previo": "2026-11-09",
      "d1": "2026-11-16",
      "perdidos": [
        "2026-11-09",
        "2026-11-10",
        "2026-11-11",
        "2026-11-12",
        "2026-11-13"
      ],
      "regla": "Orden de Joseph (sáb 14-nov): «todo inicia a partir del lunes 16; reestructura todo; si hace falta mueve tiempos; quizá basta con alargar las fechas límite 2-3 días o lo que amerite, para que no sea tan fastidioso». La semana del lun 9-nov no se estudió (las semanas corridas v6.07a-e quedan sin efecto). Patrón v6.05/v6.06/v6.07: F1 anclada (32 hábiles lun 16-nov → mié 30-dic; la intensiva ENCAPS sigue el lun 4-ene y el examen ENCAPS el dom 14-mar, que el campus de Theomed también marca); Step 1 los mar · jue (13 filas: UWSA1 D1 mar 17-nov · NBME 25 D8 jue 10-dic, la misma fecha; SEMANA_PLAN = nº de días de Step de la semana), lo que no cabe pasa al tramo 2 con fecha (colchón 14 → 10 filas; examen lun 6-dic-2027 sin cambio); ENCAPS: las mañanas corren una semana con el SIMULACRO DE CIERRE anclado al mié 30-dic, 2 mañanas en un día solo-ENCAPS el jue 31-dic, la hoja de reglas el mar 5-ene, y las 16:15 que no caben, con fecha en la intensiva (viernes del núcleo tras el SIM; el carril sábado pasa a 14:00-15:00, fuera del gimnasio); secundarios +5 hábiles con su contenido intacto y sus fechas límite corridas (nada se quita)."
    },
    {
      "fecha": "2026-11-16",
      "version": "v6.09",
      "d1_previo": "2026-11-16",
      "d1": "2026-11-17",
      "perdidos": [
        "2026-11-16"
      ],
      "regla": "Orden de Joseph (lun 16-nov): «el día de hoy no avancé, así que todo empieza a partir de mañana; el sábado y el domingo viajaré, déjalos libres; reestructura de la manera más simple, tal vez alargando días». D1 = mar 17-nov. El Step 1 NO cambia (el lunes no era día de Step: UWSA1 mar 17-nov, NBME 25 jue 10-dic, 13 filas mar · jue). ENCAPS y planes secundarios corren UN día hábil dentro de F1 y el jue 31-dic deja de ser SKIP: recupera el día perdido (mañana ENCAPS doble + 16:15 + secundarios + 18:00) → desde el lun 4-ene todo cae en la misma fecha que en la v6.08. Sáb 21 y dom 22-nov libres (viaje): lo de ese fin de semana va al siguiente o se recupera en los fines de semana de Navidad; la mañana ENCAPS que ya no cabe entre semana va el dom 27-dic. Examen ENCAPS dom 14-mar y Step 1 lun 6-dic-2027 sin cambio."
    },
    {
      "fecha": "2026-11-17",
      "version": "v6.10",
      "d1_previo": "2026-11-17",
      "d1": "2026-11-18",
      "perdidos": [
        "2026-11-17"
      ],
      "regla": "Orden de Joseph (mar 17-nov): «todo inicia mañana, el 18 es el primer día; corre nomás un día para que no sea tanto trabajo; respeta el 21 y el 22». El mar 17 tampoco se estudió → D1 = mié 18-nov (mañana ENCAPS 1/21, quieta). Step 1 (v6.10b, decisión de Joseph del mar 17-nov 17:05): el jue 19 es NIVEL 0 (D2, lesión celular), no UWSA1; el UWSA1 sale de F1 y va al tramo 2 (T82 mar 29-jun-2027, el hueco del UWSA3 opcional) como prueba de resistencia; D2-D13 en sus fechas v6.09 (D2 jue 19-nov · NBME 25 = D8 jue 10-dic · D13 mar 29-dic), en nivel 0-1 hasta el gate del 80 %; la pausa del Step empieza el jue 31-dic, como en la v6.09. ENCAPS 16:15 y planes secundarios (v6.10c, decisión de Joseph del mar 17-nov 17:20: corrimiento LITERAL, sin recuperación por partes): cada uno corre UN hábil del mié 18-nov al jue 31-dic y su ÚLTIMA sesión de F1 va el SÁB 2-ENE, a hora fija en las ventanas del sábado (corrida_s1.extra: 04:15 vibecoding · 04:30 ENCAPS 16:15 · 07:15 MIR · 14:30 AURUM · 15:30 Research · 16:15 LIVIANO · 21:30 Business; gimnasio 08:30-14:00, baile 17:00-20:00, rutina 05:45-07:15, revisión 14:00 y SYNAPSE 21:00, intactos); el SYNAPSE de recuperación (30′) no cabe ese día y va el dom 3-ene 05:00-05:30 (hueco real antes de la rutina). Anclados: mini-sims de las 16:15 en sus viernes y CHECKPOINT vie 18-dic, SHIP de los domingos, revisión y cierre de Business del sábado, clases en vivo de Theomed. Sáb 28-nov, dom 29-nov y dom 6-dic, sin bloques de recuperación. Mañanas ENCAPS, sus 18:00, sábados Theomed, domingos ENCAPS, Derma, revisión semanal, sáb 21 y dom 22: quietos; el jue 31-dic sigue siendo día de plan. Vie 1-ene sigue feriado. Desde el lun 4-ene todo idéntico (Supabase dia 33-82, Calendar de 2027). Examen ENCAPS dom 14-mar y Step 1 lun 6-dic-2027 sin cambio."
    },
    {
      "fecha": "2026-11-18",
      "version": "v6.10d",
      "d1_previo": "2026-11-18",
      "d1": "2026-11-19",
      "perdidos": [
        "2026-11-18"
      ],
      "regla": "Orden de Joseph (mié 18-nov): «todo restablece a partir del jueves 19; corre un día todo lo que puedas, los hitos, todo corre un día; en las vacías que encuentres». Sobre la v6.10c (todo arranca el mié 18; Step 1 en nivel 0 con el UWSA1 en el tramo 2; los secundarios corridos un hábil con su última sesión de F1 el sáb 2-ene): ALIAS de corrida_s1 — cada día hábil con plan del jue 19-nov al vie 1-ene hace el plan del día hábil anterior (mañanas ENCAPS, Step 1, 16:15, 18:00, secundarios y sus hitos: NBME 25 vie 11-dic, CHECKPOINT lun 21-dic…); el vie 1-ene (feriado vacío) hace el del jue 31-dic. Los fines de semana, el sáb 2-ene y todo desde el lun 4-ene no cambian; Supabase conserva la FECHA DE PLAN (dia 1 = mié 18-nov … dia 31 = jue 31-dic · dia 32 = sáb 2-ene); la app (fechaPlanDe/fechaRealDe) y el daemon traducen con el alias. Es un ALIAS, no un corrimiento rígido: los generadores (gen_fechas_v6.corrimientoRefecha, plantillasV6, gen_encaps_intensivo_2027 y gen_encaps_mantenimiento_2027) no cuentan el mié 18 como perdido."
    },
    {
      "fecha": "2026-11-28",
      "version": "v7.00",
      "d1_previo": "2026-11-19",
      "d1": "2026-11-30",
      "perdidos": [
        "2026-11-19",
        "2026-11-20",
        "2026-11-23",
        "2026-11-24",
        "2026-11-25",
        "2026-11-26",
        "2026-11-27"
      ],
      "regla": "Orden de Joseph (sáb 28-nov-2026, 06:58): del mar 24 al dom 29-nov no estudió y TODO arranca el LUN 30-NOV («reestructura, corre días, modifica fechas; ya tenemos toda la data»); objetivo absoluto, el 1.er puesto del ENCAPS (examen dom 14-mar-2027, fijo); es la ÚLTIMA reorganización. REBASE NATIVO, sin alias: D1 de todo = lun 30-nov (F1 22 hábiles → mié 30-dic; el 8 y el 9-dic son sesión y el vie 25-dic, SKIP); transición jue 31-dic (hábil, con mañana ENCAPS) → dom 3-ene; F2 lun 4-ene → dom 14-mar con las MISMAS fechas reales. corrida_s1 queda vacía (sin alias, alias por frente, días extra, sábado hábil, reparto, reemplazos ni notas): el v6.10d (mié 18-nov, que hacía otro día real por el alias) pasa a ser un día perdido más; este corrimiento cuenta los del jue 19 al vie 27-nov sin repetir el mié 18. Mañanas de lunes a viernes 07:15-12:00 = ENCAPS; el Step 1 sin mañanas en F1 (step1.pausa_desde = lun 30-nov) y en mantenimiento hasta el reinicio del mar 16-mar (Anki 05:00 L-V; sesión USMLE de los mar · jue 18:00-18:45 en F1 y la transición y del sábado 04:15-05:45 en F2 hasta el sáb 27-feb: step1.mantenimiento). El sáb 26-dic vuelve a ser un sábado normal; sáb 28 y dom 29-nov, sin sesión de nada. Los planes de la tarde arrancan su D1 el lun 30-nov (corren, no se comprimen)."
    }
  ],
  "corrida_s1": {
    "decidido": "2026-11-28",
    "version": "v7.00",
    "motivo": "v7.00 (sáb 28-nov-2026, orden de Joseph, reorganización final): REBASE NATIVO. El plan entero se re-fecha con D1 = lun 30-nov (f1.inicio) y esta capa solo marca los días sin sesión, del lun 19-oct al dom 29-nov. Sin alias, sin reparto, sin días extra a hora fija, sin alias por frente ni sábados hábiles: las capas de la v6.02d a la v6.12 se retiran (su historia queda en git y en la bitácora corrimientos).",
    "sin_sesion": [
      "2026-10-19",
      "2026-10-20",
      "2026-10-21",
      "2026-10-22",
      "2026-10-23",
      "2026-10-24",
      "2026-10-25",
      "2026-10-26",
      "2026-10-27",
      "2026-10-28",
      "2026-10-29",
      "2026-10-30",
      "2026-10-31",
      "2026-11-01",
      "2026-11-02",
      "2026-11-03",
      "2026-11-04",
      "2026-11-05",
      "2026-11-06",
      "2026-11-07",
      "2026-11-08",
      "2026-11-09",
      "2026-11-10",
      "2026-11-11",
      "2026-11-12",
      "2026-11-13",
      "2026-11-14",
      "2026-11-15",
      "2026-11-16",
      "2026-11-17",
      "2026-11-18",
      "2026-11-19",
      "2026-11-20",
      "2026-11-21",
      "2026-11-22",
      "2026-11-23",
      "2026-11-24",
      "2026-11-25",
      "2026-11-26",
      "2026-11-27",
      "2026-11-28",
      "2026-11-29"
    ],
    "alias": {},
    "reparto": {},
    "resumen": "Reorganización final (v7.00, orden del sáb 28-nov): del lun 16 al dom 29-nov no hubo sesión. TODO arranca el lun 30-nov con el D1 de cada plan, sin días de recuperación: de lunes a viernes, mañana ENCAPS 07:15-12:00, ENCAPS 16:15 y los planes de la tarde; a las 18:00, ENCAPS los lun · mié · vie y la sesión USMLE de mantenimiento los mar · jue (el Step 1 vuelve a las mañanas el mar 16-mar). El fin de semana, el horario fijo de siempre. Examen ENCAPS dom 14-mar-2027."
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
  ultimoDiaEstudio: "2027-12-17",
  /** ritual de test-day = último día de plan < E−1 */
  ritual: "2027-12-18",
  viajeD1: "2027-12-19",
  gonogo: "2027-11-01",
  convocatoriaTope: "2027-02-17",
  /** fecha a RESERVAR (FSMB/Prometric) con el ENCAPS vigente — DJ-1 */
  reserva: "2027-12-20",
  semanasF1: 5,
  /** v7.00: semanas del Step 1 DENTRO de F1 (antes de step1.pausa_desde; v7.00: 0 → la semana del reinicio es la S1) */
  semanasStepF1: 0,
  step1Semanas: 40,
  diasF1: 22, diasF2: 50, diasF3: 32, diasF4: 198,
  /** v6.07: filas del tramo 1 del Step 1 = hábiles de F1 en step1.f1_dias_semana (mar · jue) */
  diasStepF1: 0,
  /** v6.10: última mañana de Step 1 de F1 (= f1.fin desde la v6.10b); la pausa del Step empieza al día siguiente · v7.00: el día anterior a step1.pausa_desde */
  ultimoStepF1: "2026-11-29",
  /** v7.00: nº de sesiones USMLE de mantenimiento (USMLE_MANT_SESIONES) */
  sesionesMant: 18,
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
  {"id":"F1","nombre":"ENCAPS: mañana L-V 07:15-12:00 + 16:15 + 18:00 · Step 1 en PAUSA desde el D1 (mantenimiento: Anki 05:00 + sesión USMLE los mar · jue 18:00-18:45; reinicio mar 16-mar)","etiqueta":"F1 · MAÑANAS ENCAPS L-V (Step 1 en mantenimiento)","desde":"2026-11-30","hasta":"2026-12-30","ultimoDiaPlan":"2026-12-30","diasPlan":22,"diasSemana":"L-V","provisional":false},
  {"id":"TRANSICION","nombre":"Transición: jue 31-dic día de plan sin Step 1; el resto sin sesión (Anki opcional)","etiqueta":"TRANSICIÓN","desde":"2026-12-31","hasta":"2027-01-03","ultimoDiaPlan":"2026-12-31","diasPlan":1,"diasSemana":null,"provisional":false},
  {"id":"F2","nombre":"ENCAPS intensiva (≈32 h/sem) + Step 1 en mantenimiento (Anki ≤10′ L-V + sesión USMLE sáb 04:15-05:45 hasta el sáb 27-feb)","etiqueta":"F2 · ENCAPS INTENSIVA (examen dom 14-mar PROVISIONAL)","desde":"2027-01-04","hasta":"2027-03-14","ultimoDiaPlan":"2027-03-12","diasPlan":50,"diasSemana":"L-V","provisional":true},
  {"id":"LIBRE_POST_ENCAPS","nombre":"Lunes libre post-ENCAPS (protegido, DJ-2)","etiqueta":"LIBRE post-ENCAPS","desde":"2027-03-15","hasta":"2027-03-15","ultimoDiaPlan":null,"diasPlan":0,"diasSemana":null,"provisional":true},
  {"id":"F3","nombre":"Step 1 tiempo completo 7h15 (F1 + 16:15 REENTRADA)","etiqueta":"F3 · STEP 1 TIEMPO COMPLETO","desde":"2027-03-16","hasta":"2027-05-02","ultimoDiaPlan":"2027-04-30","diasPlan":32,"diasSemana":"L-V","provisional":true},
  {"id":"F4","nombre":"SERUMS 6 h (turno M/T variable) + Step 1 por plantilla de turno · L-S, domingo libre","etiqueta":"F4 · STEP 1 + SERUMS","desde":"2027-05-03","hasta":"2027-12-18","ultimoDiaPlan":"2027-12-18","diasPlan":198,"diasSemana":"L-S","provisional":true},
  {"id":"EXAMEN","nombre":"D-1 viaje a Lima + EXAMEN Step 1","etiqueta":"EXAMEN STEP 1","desde":"2027-12-19","hasta":"2027-12-20","ultimoDiaPlan":null,"diasPlan":0,"diasSemana":null,"provisional":true},
  {"id":"F5","nombre":"Post-Step 1 (esbozo): MIR principal hasta el fin del SERUMS (~abr-2028)","etiqueta":"F5 · post-Step 1","desde":"2027-12-21","hasta":null,"ultimoDiaPlan":null,"diasPlan":0,"diasSemana":null,"provisional":true},
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
/** DJ-1 (Joseph): fecha a RESERVAR por fecha del ENCAPS — ≤ 14-mar → lun 20-dic · después → lun 27-dic. */
export const DJ1_V6: { encapsHasta: string | null; examen: string }[] = [{"encapsHasta":"2027-03-14","examen":"2027-12-20"},{"encapsHasta":null,"examen":"2027-12-27"}];
export function reservaDJ1(encaps: string = FECHAS_V6.encaps.examen): string {
  for (const x of DJ1_V6) if (x.encapsHasta === null || encaps <= x.encapsHasta) return x.examen;
  return FECHAS_V6.step1.planB; // inalcanzable: la última fila de DJ-1 no tiene tope
}
/** Fecha a RESERVAR guardada en el JSON (validada = DJ-1, o la regla de cálculo si fue más tardía) o, si el escenario no está, DJ-1. */
export function reservaStep1(encaps: string = FECHAS_V6.encaps.examen): string { return FECHAS_V6.step1.reserva_por_encaps[encaps] ?? reservaDJ1(encaps); }
/** STEP1_SEMANAS de un escenario = SEMANAS_STEP_F1 (0: las semanas de F1 antes de step1.pausa_desde; hasta la v6.12, las de F1) + semanas(lunes del reinicio → lunes del examen). */
export function step1SemanasDe(reinicio: string = FECHAS_V6.step1.reinicio, examen: string = FECHAS_V6.step1.examen): number {
  return SEMANAS_STEP_F1 + _diff(_lunesDe(reinicio), _lunesDe(examen)) / 7;
}
/** Reinicio vigente del Step 1 (martes tras el lunes libre post-ENCAPS). */
export function reinicioStep1(): string { return FECHAS_V6.step1.reinicio; }

// ── predicados por fecha ──
export function esProtegido(iso: string): boolean { return DIAS_PROTEGIDOS.has(iso); }
export function motivoProtegido(iso: string): string | null { return FECHAS_V6.protegidos.find((p) => p.fecha === iso)?.motivo ?? null; }
export function esFeriado(iso: string): boolean { return FERIADOS_V6.has(iso); }
/** Step 1 en PAUSA (v7.00: desde step1.pausa_desde = lun 30-nov —F1, transición, F2 ENCAPS y lunes libre— hasta la víspera del reinicio): estado PAUSA en la app,
 *  sin fila «hoy» (§B2, §F); solo mantenimiento (Anki + usmleMantDe). Hasta la v6.12 empezaba el día siguiente a f1.fin. */
export function enPausaStep1(iso: string): boolean { return iso >= FECHAS_V6.step1.pausa_desde && iso < FECHAS_V6.step1.reinicio; }
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
  // v6.07: en F1 el Step 1 solo tiene fila los días de step1.f1_dias_semana (mar · jue)
  if (plan === 'usmle') return !enPausaStep1(iso) && iso <= FECHAS_V6.step1.ritual && (iso > FECHAS_V6.f1.fin || FECHAS_V6.step1.f1_dias_semana.includes(_wd(iso)));
  if (plan === 'encaps') return iso < FECHAS_V6.encaps.examen;
  return true;
}
/** v6.07 · ¿tiene el Step 1 mañana de plan en F1 este día de la semana? (step1.f1_dias_semana; fuera de F1, siempre true) · v7.00: solo antes de
 *  step1.pausa_desde (v7.00: false en toda F1, la mañana L-V es ENCAPS) */
export function esDiaStepF1(iso: string): boolean { return iso < FECHAS_V6.f1.inicio || iso > FECHAS_V6.f1.fin || (iso < FECHAS_V6.step1.pausa_desde && FECHAS_V6.step1.f1_dias_semana.includes(_wd(iso))); }
/** v7.00 · sesión USMLE de MANTENIMIENTO durante la pausa del Step 1 (step1.mantenimiento): fecha, franja, tramo ('f1' = F1 y la transición · 'f2' = la intensiva),
 *  n (1… en el conjunto) y nTramo (1… dentro de su tramo). HOOK de la guía USMLE: plantillasV6 pinta el bloque «usmle-mant» con esta franja y TodayMission le pide
 *  la guía a usmleGuia (guiaUsmleEnRango) en ella. 18 sesiones: 10 de F1 y la transición (mar 1-dic → jue 31-dic) · 8 de la intensiva (sáb 9-ene → sáb 27-feb). */
export interface SesionUsmleMant { fecha: string; tramo: 'f1' | 'f2'; ini: string; fin: string; n: number; nTramo: number }
export const USMLE_MANT_SESIONES: SesionUsmleMant[] = [{"fecha":"2026-12-01","tramo":"f1","ini":"18:00","fin":"18:45","n":1,"nTramo":1},{"fecha":"2026-12-03","tramo":"f1","ini":"18:00","fin":"18:45","n":2,"nTramo":2},{"fecha":"2026-12-08","tramo":"f1","ini":"18:00","fin":"18:45","n":3,"nTramo":3},{"fecha":"2026-12-10","tramo":"f1","ini":"18:00","fin":"18:45","n":4,"nTramo":4},{"fecha":"2026-12-15","tramo":"f1","ini":"18:00","fin":"18:45","n":5,"nTramo":5},{"fecha":"2026-12-17","tramo":"f1","ini":"18:00","fin":"18:45","n":6,"nTramo":6},{"fecha":"2026-12-22","tramo":"f1","ini":"18:00","fin":"18:45","n":7,"nTramo":7},{"fecha":"2026-12-24","tramo":"f1","ini":"18:00","fin":"18:45","n":8,"nTramo":8},{"fecha":"2026-12-29","tramo":"f1","ini":"18:00","fin":"18:45","n":9,"nTramo":9},{"fecha":"2026-12-31","tramo":"f1","ini":"18:00","fin":"18:45","n":10,"nTramo":10},{"fecha":"2027-01-09","tramo":"f2","ini":"04:15","fin":"05:45","n":11,"nTramo":1},{"fecha":"2027-01-16","tramo":"f2","ini":"04:15","fin":"05:45","n":12,"nTramo":2},{"fecha":"2027-01-23","tramo":"f2","ini":"04:15","fin":"05:45","n":13,"nTramo":3},{"fecha":"2027-01-30","tramo":"f2","ini":"04:15","fin":"05:45","n":14,"nTramo":4},{"fecha":"2027-02-06","tramo":"f2","ini":"04:15","fin":"05:45","n":15,"nTramo":5},{"fecha":"2027-02-13","tramo":"f2","ini":"04:15","fin":"05:45","n":16,"nTramo":6},{"fecha":"2027-02-20","tramo":"f2","ini":"04:15","fin":"05:45","n":17,"nTramo":7},{"fecha":"2027-02-27","tramo":"f2","ini":"04:15","fin":"05:45","n":18,"nTramo":8}];
const _MANT = new Map<string, SesionUsmleMant>(USMLE_MANT_SESIONES.map((x) => [x.fecha, x]));
/** v7.00 · la sesión USMLE de mantenimiento de `iso` o null (gemelo de gen_fechas_v6.usmleMantDe). */
export function usmleMantDe(iso: string): SesionUsmleMant | null { return _MANT.get(iso) ?? null; }
/** Fase v6 de una fecha. Antes del D1 (≤ dom 29-nov-2026) devuelve 'F1' (la app ya muestra F1 la víspera). */
export function faseV6(iso: string): FaseV6 {
  if (iso < FECHAS_V6.f1.inicio) return 'F1';
  for (const x of FASES_V6) if (iso >= x.desde && (x.hasta === null || iso <= x.hasta)) return x.id;
  return 'F5';
}
export function faseV6Info(iso: string): FaseV6Info { const id = faseV6(iso); return FASES_V6.find((x) => x.id === id) ?? (FASES_V6[0] as FaseV6Info); }

// ── semana del Step 1 (definición única; antes en homeBriefing — §F, r2 · I7) ──
/** Semanas de F1 (calendario: la del lun 30-nov → la del lun 28-dic). */
export const SEMANAS_F1 = 5;
/** v7.00 · semanas del Step 1 DENTRO de F1 (las de antes de step1.pausa_desde; v7.00: ninguna, F1 es pausa → la semana del reinicio es la S1). */
export const SEMANAS_STEP_F1 = 0;
/** 40 = 0 (Step en F1) + semanas(lunes del reinicio lun 15-mar → lunes del examen lun 20-dic); la semana del examen queda fuera (etiqueta 'examen'). */
export const STEP1_SEMANAS = 40;
export interface SemanaStep1 {
  /** 0 = antes del D1 · 0 durante la PAUSA (no avanza) · 1-STEP1_SEMANAS = tramo 2 · STEP1_SEMANAS + 1 = semana del examen */
  n: number;
  /** STEP1_SEMANAS */
  total: number;
  lunes: string; viernes: string; sabado: string;
  /** semanas de la pausa (el D1, lun 30-nov → la semana anterior al reinicio): semanaLabel = 'PAUSA · ENCAPS' */
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
 * Semana del Step 1 (lunes→domingo; determinista, sin reloj): pausa desde el D1 (lun 30-nov; v7.00: F1 sin mañanas de Step) hasta la semana anterior al reinicio →
 * { pausa: true } · desde la semana del reinicio 0 + k · semana del examen → { examen: true }.
 */
export function semanaStep1(iso: string, extras: SemanaStep1Extras = {}): SemanaStep1 {
  const lunes = _lunesDe(iso), lunRein = _lunesDe(FECHAS_V6.step1.reinicio);
  // v7.00: semanas del Step dentro de F1 = las de antes de step1.pausa_desde (SEMANAS_STEP_F1; v7.00: 0)
  const p = FECHAS_V6.step1.pausa_desde, lunFinStep = SEMANAS_STEP_F1 > 0 ? _lunesDe(p > FECHAS_V6.f1.fin ? FECHAS_V6.f1.fin : _add(p, -1)) : null;
  let n: number, pausa = false;
  if (iso < FECHAS_V6.f1.inicio) n = 0;                                   // pre-D1 (días de la semana 1 anteriores al D1)
  else if (lunFinStep && lunes <= lunFinStep) n = 1 + _diff(_lunesDe(FECHAS_V6.f1.inicio), lunes) / 7;
  else if (lunes < lunRein) { n = SEMANAS_STEP_F1; pausa = true; }         // PAUSA · ENCAPS
  else n = SEMANAS_STEP_F1 + 1 + _diff(lunRein, lunes) / 7;               // tramo 2
  const examen = lunes === _lunesDe(FECHAS_V6.step1.examen);
  const domingo = _add(lunes, 6);
  const dl = (extras.deloads ?? []).find((x) => x.lunes === lunes);
  const hito = (extras.hitos ?? []).filter((h) => h.fecha >= lunes && h.fecha <= domingo).map((h) => h.nombre).join(' + ') || undefined;
  return {
    n, total: STEP1_SEMANAS, lunes, viernes: _add(lunes, 4), sabado: _add(lunes, 5), pausa, examen,
    deload: !!dl, deloadMotivo: dl ? dl.motivo : undefined, hito, fueraDeRango: !pausa && (n < 1 || n > STEP1_SEMANAS),
  };
}

// ── v7.00: semana 1 corrida (orden de Joseph del sáb 28-nov-2026) ──
/** Parte de un día de reparto: bloques de la plantilla de la fecha de plan «de» (id de bloque de plantillasV6 → desfase en minutos). */
export interface ParteCorridaS1 { de: string; bloques: Record<string, number> }
export type CorridaS1 =
  | { tipo: 'sin_sesion' }
  | { tipo: 'alias'; de: string }
  | { tipo: 'reparto'; de: string; partes: ParteCorridaS1[]; titulo?: string; nota?: string };
/**
 * Semana corrida: lun 19-oct · mar 20-oct · mié 21-oct · jue 22-oct · vie 23-oct · sáb 24-oct · dom 25-oct · lun 26-oct · mar 27-oct · mié 28-oct · jue 29-oct · vie 30-oct · sáb 31-oct · dom 1-nov · lun 2-nov · mar 3-nov · mié 4-nov · jue 5-nov · vie 6-nov · sáb 7-nov · dom 8-nov · lun 9-nov · mar 10-nov · mié 11-nov · jue 12-nov · vie 13-nov · sáb 14-nov · dom 15-nov · lun 16-nov · mar 17-nov · mié 18-nov · jue 19-nov · vie 20-nov · sáb 21-nov · dom 22-nov · lun 23-nov · mar 24-nov · mié 25-nov · jue 26-nov · vie 27-nov · sáb 28-nov · dom 29-nov sin sesión.
 * null fuera de esos días (sin alias ni reparto: los planes, Supabase, runners y guías ya están re-fechados por el corrimiento).
 */
export function corridaS1De(iso: string): CorridaS1 | null {
  const c = FECHAS_V6.corrida_s1;
  if (c.sin_sesion.includes(iso)) return { tipo: 'sin_sesion' };
  const a = c.alias[iso];
  if (a) return { tipo: 'alias', de: a };
  const r = c.reparto[iso];
  return r ? { tipo: 'reparto', de: r.de, partes: r.partes, ...(r.titulo ? { titulo: r.titulo } : {}), ...(r.nota ? { nota: r.nota } : {}) } : null;
}
/** Ids de bloque de plantillasV6 de cada frente (en un día de reparto, la vista de un frente sigue a la parte que tiene su bloque). */
export const BLOQUES_POR_FRENTE: Record<string, string[]> = {
  usmle: ['anki', 'usmle', 'eval', 'anki-sab', 'anki-dom', 'usmle-mant'], mir: ['mir'], encaps: ['encaps', 'encaps-am', 'encaps-am2', 'encaps-pm', 'encaps-dom', 'encaps-rec', 'theomed-prep', 'theomed-vivo'], 'research-derma': ['rd'], aurum: ['aurum'],
  liviano: ['liv'], synapse: ['syn', 'syn-rec', 'syn-rec2', 'pc', 'feynman'], vibecoding: ['vibe', 'pc', 'feynman'], business: ['biz'], revision: ['revision'],
};
/** v6.07a: bloque PRINCIPAL de cada frente (en un reparto con varias partes del mismo frente, manda la que lo lleva). */
export const PRINCIPAL_POR_FRENTE: Record<string, string[]> = {
  encaps: ['encaps'], synapse: ['syn'], vibecoding: ['vibe'], business: ['biz'], 'research-derma': ['rd'], mir: ['mir'], aurum: ['aurum'], liviano: ['liv'], revision: ['revision'],
};
/**
 * Fecha de PLAN que toca un día real (vistas por frente): alias → el plan del día anterior · reparto (sáb/dom) → con `frente`, la fecha
 * de plan de la parte que lleva un bloque de ese frente ese día (p. ej. dom 25 USMLE → el Anki del propio domingo; sáb 24 USMLE → vie 23);
 * si ese día no tiene bloque del frente, la propia fecha (v6.06d) · día sin sesión → la fila del próximo día con sesión (v6.06e) · resto → la propia.
 */
export function fechaPlanDe(iso: string, frente?: string): string {
  // v6.10y: el alias propio del frente manda sobre el global (corrida_s1.alias_frente)
  const af = frente ? FECHAS_V6.corrida_s1.alias_frente?.[frente] : undefined;
  if (af && af.alias[iso]) return af.alias[iso] as string;
  // v6.11 (mar 24-nov): día real sin sesión de ESE frente (alias_frente.sin_sesion) → la fila del próximo día real con sesión de ese frente
  if (af && (af.sin_sesion ?? []).includes(iso)) {
    const s1 = FECHAS_V6.corrida_s1, sinF = new Set(af.sin_sesion);
    const sig = [...new Set([...Object.keys(af.alias), ...Object.keys(s1.alias), ...Object.keys(s1.reparto)])].filter((r) => r > iso && !sinF.has(r)).sort()[0];
    return sig ? fechaPlanDe(sig, frente) : iso;
  }
  // v6.10w: el día extra que hace la fila de otra fecha de plan de ese frente (sáb 2-ene → jue 31-dic · dom 3-ene → sáb 2-ene · lun 4-ene ENCAPS → sáb 2-ene)
  //   solo en fin de semana: el lun 4-ene (RE-SCAN) tiene su propia fila ENCAPS (dia 33) y el D32 del sáb 2-ene es un bloque más de ese día
  if (frente && [0, 6].includes(new Date(iso + 'T12:00:00Z').getUTCDay())) { const x = extraCorridaDe(iso).find((y) => y.frente === frente); if (x && x.plan !== iso) return x.plan; }
  const c = corridaS1De(iso);
  if (!c) return iso;
  // v6.06e: día sin sesión → la fila del próximo día con sesión (sin esto los hubs marcaban como «hoy» una fila ya repartida a otro día)
  if (c.tipo === 'sin_sesion') {
    const s1 = FECHAS_V6.corrida_s1;
    const sig = [...Object.keys(s1.alias), ...Object.keys(s1.reparto)].filter((r) => r > iso).sort()[0];
    return sig ? fechaPlanDe(sig, frente) : iso;
  }
  if (c.tipo === 'alias' || !frente) return c.de;
  // v6.07a: la parte con el bloque PRINCIPAL del frente; entre varias vigentes, la más antigua (lo que se recupera ese día: sáb 14 SYNAPSE/Business =
  //   el d5 del vie 13; dom 15 ENCAPS = la sesión de las 16:15 del vie 13)
  const pri = PRINCIPAL_POR_FRENTE[frente] ?? [];
  const dp = c.partes.filter((p) => Object.keys(p.bloques).some((id) => pri.includes(id))).map((p) => p.de).filter((d) => d >= c.de).sort();
  if (dp.length) return dp[0] as string;
  const ids = BLOQUES_POR_FRENTE[frente] ?? [];
  const ds = c.partes.filter((p) => Object.keys(p.bloques).some((id) => ids.includes(id))).map((p) => p.de).sort();
  // v6.06e: entre varias partes del frente, la vigente; lo atrasado (SHIP de semanas pasadas) no mueve la posición del frente, salvo la revisión
  const vig = ds.filter((d) => d >= c.de);
  if (vig.length) return vig[vig.length - 1] as string;
  return frente === 'revision' && ds.length ? ds[ds.length - 1] as string : iso;
}
/**
 * Inversa de fechaPlanDe para MOSTRAR fechas (mar 20-oct-2026, a pedido de Joseph: «dice que empieza el 19 y estamos empezando el 20»):
 * día REAL en que se hace la fila cuya fecha de plan es `plan` (19 → mar 20 … 22 → vie 23; 23 → sáb 24 o dom 25 según el `frente`;
 * sábado nativo 24 → sáb 24 o dom 25 según el frente). Fuera de la semana corrida = la propia. Solo para etiquetas: las filas, el
 * progreso y Supabase siguen con la fecha de plan.
 */
export function fechaRealDe(plan: string, frente?: string): string {
  const c = FECHAS_V6.corrida_s1;
  // v6.10y: el alias propio del frente (y el domingo cuyo SHIP absorbe ese paso) manda sobre el global
  const af = frente ? c.alias_frente?.[frente] : undefined;
  if (af) {
    for (const [r, de] of Object.entries(af.alias)) if (de === plan) return r;
    for (const [r, v] of Object.entries(af.en_ship ?? {})) if ((Array.isArray(v) ? v : [v]).includes(plan)) return r;
  }
  // v6.10w: con `frente`, la fecha de plan que un día extra hace de ese frente (corrida_s1.extra { hora, plan })
  if (frente) { const x = extraDePlan(plan, frente); if (x && x.real !== plan) return x.real; }
  for (const [r, de] of Object.entries(c.alias)) if (de === plan) return r;
  // v6.12: el plan que el alias global deja sin día y hace un SÁBADO HÁBIL (corrida_s1.sabado_habil: sáb 26-dic = el plan del lun 21-dic)
  for (const s of c.sabado_habil ?? []) if (planSabadoHabilDe(s) === plan) return s;
  const ids = frente ? (BLOQUES_POR_FRENTE[frente] ?? []) : null;
  // v6.07a: primero la parte que lleva el bloque PRINCIPAL del frente (vie 13 ENCAPS → el dom 15 de la sesión de las 16:15, no el sáb 14 de la mañana)
  const pri = frente ? (PRINCIPAL_POR_FRENTE[frente] ?? []) : [];
  if (pri.length) for (const [r, x] of Object.entries(c.reparto)) for (const p of x.partes) if (p.de === plan && Object.keys(p.bloques).some((id) => pri.includes(id))) return r;
  for (const [r, x] of Object.entries(c.reparto)) for (const p of x.partes) if (p.de === plan && (!ids || Object.keys(p.bloques).some((id) => ids.includes(id)))) return r;
  // v6.06e: la guía de un frente que cita un sábado cuyo bloque es de otro frente (p. ej. la revisión desde USMLE): vale cualquier parte de esa fecha
  if (ids) for (const [r, x] of Object.entries(c.reparto)) if (x.partes.some((p) => p.de === plan)) return r;
  return plan;
}
/** v6.12 (mar 24-nov-2026) · ¿es `iso` un SÁBADO HÁBIL (corrida_s1.sabado_habil: un día de estudio completo, sin gimnasio ni baile)? */
export function esSabadoHabil(iso: string): boolean { return (FECHAS_V6.corrida_s1.sabado_habil ?? []).includes(iso); }
/** v6.12 · fecha de PLAN que hace un SÁBADO HÁBIL (gemelo de gen_fechas_v6.planSabadoHabilDe): el 1.er hábil de plan (L-V, sin SKIP ni feriado) que el alias
 *  GLOBAL deja sin día entre el hábil real anterior al sábado y el siguiente (sáb 26-dic: vie 25 = plan del vie 18 y lun 28 = plan del mar 22 → el lun 21-dic).
 *  null si `iso` no es sábado hábil. Sus frentes con alias propio (corrida_s1.alias_frente) hacen ese día lo que diga corrida_s1.extra. */
export function planSabadoHabilDe(iso: string): string | null {
  const c = FECHAS_V6.corrida_s1;
  if (!esSabadoHabil(iso)) return null;
  const ks = Object.keys(c.alias).sort();
  const prev = ks.filter((r) => r < iso).pop(), next = ks.find((r) => r > iso);
  if (!prev || !next) return null;
  for (let d = _add(c.alias[prev] as string, 1); d < (c.alias[next] as string); d = _add(d, 1)) { const w = _wd(d); if (w >= 1 && w <= 5 && !SKIP_V6.has(d) && !FERIADOS_V6.has(d)) return d; }
  return null;
}
/** v6.10 · bloques que un día de fin de semana recupera a hora fija (corrida_s1.extra): [{ frente, ini, fin, plan }] por hora; [] si ninguno.
 *  v6.10w: `plan` = la fecha de PLAN cuya fila de ese frente se hace a esa hora (la propia fecha si la entrada es solo la franja). */
export function extraCorridaDe(iso: string): { frente: string; ini: string; fin: string; plan: string }[] {
  const x = FECHAS_V6.corrida_s1.extra?.[iso];
  if (!x) return [];
  return Object.entries(x).map(([frente, v]) => {
    const hora = typeof v === 'string' ? v : v.hora, plan = typeof v === 'string' ? iso : (v.plan ?? iso);
    const [ini, fin] = hora.split('-') as [string, string]; return { frente, ini, fin, plan };
  }).sort((a, b) => (a.ini < b.ini ? -1 : a.ini > b.ini ? 1 : 0));
}
/** v6.10w · día REAL y franja en que se hace la fila de `frente` con fecha de plan `plan` por corrida_s1.extra (o null): sáb 2-ene 07:15 = MIR del jue
 *  31-dic · dom 3-ene 07:15 = MIR del sáb 2-ene. Las guías lo usan para decir «hoy sábado / domingo, a hora fija» con el día de verdad. */
export function extraDePlan(plan: string, frente: string): { real: string; ini: string; fin: string } | null {
  for (const r of Object.keys(FECHAS_V6.corrida_s1.extra ?? {}).sort()) {
    const x = extraCorridaDe(r).find((y) => y.frente === frente && y.plan === plan);
    if (x) return { real: r, ini: x.ini, fin: x.fin };
  }
  return null;
}
/** v6.10q · v6.10y: fechas de PLAN de los pasos del `frente` que el SHIP del domingo `dom` absorbe y hace PRIMERO, en ese orden (corrida_s1.alias_frente[frente].en_ship);
 *  [] si ninguno. v6.11 (mar 24-nov): lista (dom 29-nov = los pasos 4 y 5 de S1, y después el SHIP). */
export function enShipDe(dom: string, frente: string = 'vibecoding'): string[] {
  const v = FECHAS_V6.corrida_s1.alias_frente?.[frente]?.en_ship?.[dom];
  return v == null ? [] : Array.isArray(v) ? [...v] : [v];
}
/** v6.11 (lun 23-nov-2026) · fechas de PLAN que se quedan SIN DÍA REAL con el alias (gen_fechas_v6.planesSinDia, calculado al generar; v6.11 fase 2: por frente y unidos): ninguna (el plan del mié 30-dic tiene día en cada frente).
 *  corridaTexto las pinta «(día por fijar)» (no un día real que hace otro plan) y los repartos por día real las ordenan tras el último día del alias. */
export const PLANES_SIN_DIA: string[] = [];
/** v6.11 · clave de ORDEN por día real de una fecha de plan (gemelo de gen_fechas_v6.ordenRealDe, con el `frente` de fechaRealDe): su día real o, si se quedó
 *  sin día (PLANES_SIN_DIA) y ningún día extra la hace para ese frente, justo detrás del último día real del alias («AAAA-MM-DD~»). Solo para ordenar; nunca se pinta. */
export function ordenRealDe(plan: string, frente?: string): string {
  const r = fechaRealDe(plan, frente);
  if (r !== plan || !PLANES_SIN_DIA.includes(plan)) return r;
  const ks = Object.keys(FECHAS_V6.corrida_s1.alias).sort();
  return ks.length ? `${ks[ks.length - 1]}~` : plan;
}
