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
 * v6.07e (jue 12-nov-2026): semana 1 corrida SOLO en la consulta (corridaS1De / fechaPlanDe) — sin sesión lun 19-oct · mar 20-oct · mié 21-oct · jue 22-oct · vie 23-oct · sáb 24-oct · dom 25-oct · lun 26-oct · mar 27-oct · mié 28-oct · jue 29-oct · vie 30-oct · sáb 31-oct · dom 1-nov · lun 2-nov · mar 3-nov · mié 4-nov · jue 5-nov · vie 6-nov · sáb 7-nov · dom 8-nov · lun 9-nov · mar 10-nov · mié 11-nov · jue 12-nov · vie 13-nov = plan del lun 9-nov · lun 16-nov = plan del mié 11-nov · mar 17-nov = plan del jue 12-nov · mié 18-nov = plan del vie 13-nov · jue 19-nov = plan del lun 16-nov · vie 20-nov = plan del mar 17-nov · lun 23-nov = plan del jue 19-nov · mar 24-nov = plan del vie 20-nov · mié 25-nov = plan del lun 23-nov · jue 26-nov = plan del mar 24-nov · vie 27-nov = plan del mié 25-nov · lun 30-nov = plan del vie 27-nov · mar 1-dic = plan del lun 30-nov · mié 2-dic = plan del mar 1-dic · jue 3-dic = plan del mié 2-dic · vie 4-dic = plan del jue 3-dic · lun 7-dic = plan del vie 4-dic · mar 8-dic = plan del lun 7-dic · mié 9-dic = plan del mar 8-dic · jue 10-dic = plan del mié 9-dic · vie 11-dic = plan del jue 10-dic · lun 14-dic = plan del vie 11-dic · mar 15-dic = plan del lun 14-dic · mié 16-dic = plan del mar 15-dic · jue 17-dic = plan del mié 16-dic · vie 18-dic = plan del jue 17-dic · lun 21-dic = plan del vie 18-dic · mar 22-dic = plan del lun 21-dic · mié 23-dic = plan del mar 22-dic · jue 24-dic = plan del mié 23-dic · lun 28-dic = plan del jue 24-dic · mar 29-dic = plan del lun 28-dic · mié 30-dic = plan del mar 29-dic · jue 31-dic = plan del mié 30-dic · sáb 14-nov = parte del mar 10-nov · dom 15-nov = parte del mar 10-nov · sáb 21-nov = parte del mié 18-nov · dom 22-nov = parte del mié 18-nov · sáb 28-nov = parte del jue 26-nov · dom 29-nov = parte del jue 26-nov · sáb 5-dic = parte del sáb 28-nov · dom 6-dic = parte del dom 15-nov · sáb 12-dic = parte del sáb 5-dic · dom 13-dic = parte del dom 29-nov · sáb 19-dic = parte del sáb 12-dic · dom 20-dic = parte del dom 13-dic · sáb 26-dic = parte del sáb 19-dic · dom 27-dic = parte del dom 20-dic · sáb 2-ene = parte del sáb 26-dic; ningún plan cambia de fecha.
 * Versión vigente del JSON: v6.07.
 * Módulo HOJA: no importa nada de src/ (r2 · I7: corta el ciclo usmleStep1Daily ↔ homeBriefing; STEP1_SEMANAS, semanaStep1 y
 * Turno viven aquí y homeBriefing los re-exporta).
 *
 * Fases (tabla A1 resuelta):
 *   F1                lun 9-nov-2026 → mié 30-dic-2026 · 37 días de plan L-V (último mié 30-dic)
 *   TRANSICION        jue 31-dic-2026 → dom 3-ene-2027
 *   F2                lun 4-ene-2027 → dom 14-mar-2027 · 50 días de plan L-V (último vie 12-mar) · PROVISIONAL
 *   LIBRE_POST_ENCAPS lun 15-mar-2027 → lun 15-mar-2027 · PROVISIONAL
 *   F3                mar 16-mar-2027 → dom 2-may-2027 · 32 días de plan L-V (último vie 30-abr) · PROVISIONAL
 *   F4                lun 3-may-2027 → sáb 4-dic-2027 · 186 días de plan L-S (último sáb 4-dic) · PROVISIONAL
 *   EXAMEN            dom 5-dic-2027 → lun 6-dic-2027 · PROVISIONAL
 *   F5                mar 7-dic-2027 → abierta · PROVISIONAL
 * ENCAPS dom 14-mar-2027 PROVISIONAL (sin convocatoria al mié 17-feb → descartado) · reinicio Step 1 mar 16-mar-2027
 * SERUMS lun 3-may-2027 [supuesto] (inducción → dom 16-may) · GO/NO-GO lun 18-oct-2027 (E-49) · ritual sáb 4-dic · viaje dom 5-dic
 * EXAMEN Step 1 lun 6-dic-2027 PROVISIONAL · fecha a RESERVAR con ENCAPS dom 14-mar = lun 6-dic-2027 (DJ-1) · STEP1_SEMANAS = 46
 * Protegidos: vie 12-mar (D-1 hábil ENCAPS) · sáb 13-mar (D-1 ENCAPS) · dom 14-mar (ENCAPS (provisional)) · lun 15-mar (lunes libre post-ENCAPS) · sáb 4-dic (ritual test-day) · dom 5-dic (viaje D-1) · lun 6-dic (EXAMEN Step 1) · la adjudicación SERUMS se añadirá al conocerse (motivo «adjudicación …»).
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
    /** v6.04: bitácora de cambios de la fecha del examen (el último = examen vigente) */
    cambios: { fecha: string; version: string; examen_previo: string; examen: string; motivo: string }[];
    /** v6.07: días de la semana con mañana de Step 1 en F1 (1 = lun … 5 = vie; v6.07: [2, 4] = mar · jue) */
    f1_dias_semana: number[];
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
  };
}
export const FECHAS_V6: FechasV6 = {
  "version": "v6.07",
  "decidido": "2026-10-06",
  "f1": {
    "inicio": "2026-11-09",
    "fin": "2026-12-30",
    "dias": 37
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
    "examen": "2027-12-06",
    "adelanto": "2027-12-06",
    "planB": "2027-12-06",
    "gonogo": "2027-10-18",
    "eligibility": "2027-10..2027-12",
    "viaje_d1": "2027-12-05",
    "ritual": "2027-12-04",
    "provisional": true,
    "reserva_por_encaps": {
      "2027-03-14": "2027-12-06",
      "2027-03-21": "2027-12-06",
      "2027-04-04": "2027-12-06",
      "2027-04-11": "2027-12-06",
      "2027-04-18": "2027-12-06",
      "2027-04-25": "2027-12-06"
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
      }
    ],
    "f1_dias_semana": [
      2,
      4
    ]
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
      "fecha": "2027-12-04",
      "motivo": "ritual test-day"
    },
    {
      "fecha": "2027-12-05",
      "motivo": "viaje D-1"
    },
    {
      "fecha": "2027-12-06",
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
    }
  ],
  "corrida_s1": {
    "decidido": "2026-11-12",
    "version": "v6.07e",
    "motivo": "v6.07e (jue 12-nov-2026, orden de Joseph): «Última modificación. Todo inicia mañana. Puedes hacer, por ejemplo, la clásica de correr un día todo para que la fecha se alargue un día en todo, para así no tener que meter más eventos entre ellos o concatenar temas o reducir tiempos … considera la manera más adecuada». Sustituye a la v6.07d (que arrancaba el jue 12): se pierde también el jue 12 → D1 = vie 13. Se conservan los fines de semana de recuperación de la v6.07d (14-15, 21-22, 28-29) y el día que falta se recupera CORRIENDO UN DÍA el resto de F1: su último día pasa al jue 31-dic.",
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
      "2026-11-12"
    ],
    "alias": {
      "2026-11-13": "2026-11-09",
      "2026-11-16": "2026-11-11",
      "2026-11-17": "2026-11-12",
      "2026-11-18": "2026-11-13",
      "2026-11-19": "2026-11-16",
      "2026-11-20": "2026-11-17",
      "2026-11-23": "2026-11-19",
      "2026-11-24": "2026-11-20",
      "2026-11-25": "2026-11-23",
      "2026-11-26": "2026-11-24",
      "2026-11-27": "2026-11-25",
      "2026-11-30": "2026-11-27",
      "2026-12-01": "2026-11-30",
      "2026-12-02": "2026-12-01",
      "2026-12-03": "2026-12-02",
      "2026-12-04": "2026-12-03",
      "2026-12-07": "2026-12-04",
      "2026-12-08": "2026-12-07",
      "2026-12-09": "2026-12-08",
      "2026-12-10": "2026-12-09",
      "2026-12-11": "2026-12-10",
      "2026-12-14": "2026-12-11",
      "2026-12-15": "2026-12-14",
      "2026-12-16": "2026-12-15",
      "2026-12-17": "2026-12-16",
      "2026-12-18": "2026-12-17",
      "2026-12-21": "2026-12-18",
      "2026-12-22": "2026-12-21",
      "2026-12-23": "2026-12-22",
      "2026-12-24": "2026-12-23",
      "2026-12-28": "2026-12-24",
      "2026-12-29": "2026-12-28",
      "2026-12-30": "2026-12-29",
      "2026-12-31": "2026-12-30"
    },
    "reparto": {
      "2026-11-14": {
        "de": "2026-11-10",
        "partes": [
          {
            "de": "2026-11-10",
            "bloques": {
              "vibe": 0,
              "syn": -145,
              "biz": -345,
              "liv": -575
            }
          },
          {
            "de": "2026-11-14",
            "bloques": {
              "theomed-prep": 0,
              "theomed-vivo": 0,
              "syn": 0,
              "anki-sab": 0
            }
          }
        ],
        "titulo": "Sábado · 4 bloques del mar 10 antes del gimnasio + Theomed en vivo 15:00 (corrido)",
        "nota": "Antes del gimnasio van 4 bloques del plan del mar 10: 04:15 vibecoding · 05:00 SYNAPSE · 07:15 Business · 07:40 LIVIANO. 14:00-14:45 la preparación del UWSA1 de mañana: Palmerton «The ONLY Video You Need to Pass the USMLE Step 1 in 2026» de 0:00 a 26:00 (1,0× con subtítulos; pausa y anota 5 ideas) + el peor escenario por escrito y el 🧯 kit anti-pánico (Palmerton §7.6; Readiness → «Plan B / peor escenario»). 14:45 preparar la clase · 15:00-17:00 Theomed en vivo · baile 17:00-20:00 (suave, y cena ligera) · 21:00 SYNAPSE del sábado · 21:30 Anki → a la cama a las 22:00: mañana a las 05:00 la configuración de Anki (mazos + preset), a las 07:15 la preparación y a las 07:40 el UWSA1. La revisión S01 y el cierre del OUTPUT S1 van el sábado 21 (el viernes de plan se hace el miércoles 18)."
      },
      "2026-11-15": {
        "de": "2026-11-10",
        "partes": [
          {
            "de": "2026-11-10",
            "bloques": {
              "anki": 0,
              "usmle": 0,
              "eval": -330,
              "rd": -15,
              "aurum": -15,
              "mir": -15,
              "encaps": -15
            }
          }
        ],
        "titulo": "Domingo · día de plan: el del mar 10 (UWSA1) (corrido)",
        "nota": "Hoy (baile 17:00-20:00) toca el resto del plan del mar 10, el del UWSA1: 05:00 Anki (configuración del mazo) · 07:15-07:40 preparación (localizar el sim, el final del vídeo de Anki y el Ziploc; el vídeo largo y el peor escenario fueron ayer a las 14:00) · 07:40-11:50 UWSA1 (4 bloques de 40Q) · 11:50 almuerzo · 12:30 Day-After 1/6 · 13:15 Derma · 14:00 AURUM · 15:00 MIR · 16:00-17:00 ENCAPS (pre-test de arranque 2/2). Sin ENCAPS opcional (no cabe) y el SHIP S1 va el domingo 6-dic."
      },
      "2026-11-21": {
        "de": "2026-11-18",
        "partes": [
          {
            "de": "2026-11-18",
            "bloques": {
              "vibe": 0,
              "syn": -450,
              "biz": -345,
              "liv": -575
            }
          },
          {
            "de": "2026-11-14",
            "bloques": {
              "revision": 0,
              "biz": 0
            }
          },
          {
            "de": "2026-11-21",
            "bloques": {
              "theomed-prep": 0,
              "theomed-vivo": 0,
              "syn": 0,
              "anki-sab": 0
            }
          }
        ],
        "titulo": "Sábado · 4 bloques del mié 18 + revisión S01 y cierre del OUTPUT S1 + Theomed en vivo 15:00 (corrido)",
        "nota": "Antes del gimnasio, 4 bloques del plan del mié 18: 04:15 vibecoding · 05:00 SYNAPSE · 07:15 Business · 07:40 LIVIANO. 14:00 revisión S01 · 14:30 cierre del OUTPUT S1 · 14:45 preparar la clase · 15:00-17:00 Theomed en vivo · 21:00 SYNAPSE del sábado · 21:30 Anki (la revisión y el cierre son los del sábado 14). Los de esta semana van el sábado 28."
      },
      "2026-11-22": {
        "de": "2026-11-18",
        "partes": [
          {
            "de": "2026-11-18",
            "bloques": {
              "anki": 0,
              "encaps-am": 0,
              "encaps-pm": -330,
              "rd": -15,
              "aurum": -15,
              "mir": -15,
              "encaps": -15
            }
          }
        ],
        "titulo": "Domingo · día de plan: el del mié 18 (ENCAPS mañana 5/22) (corrido)",
        "nota": "Hoy (baile 17:00-20:00) toca el plan del mié 18: 05:00 Anki · 07:15-12:00 ENCAPS mañana 5/22 · 12:30 la franja de las 18:00 · 13:15 Research/Derma · 14:00 AURUM · 15:00 MIR · 16:00-17:00 ENCAPS (el bloque de las 16:15). Sin ENCAPS opcional y sin SHIP (el S2 va el domingo 6-dic)."
      },
      "2026-11-28": {
        "de": "2026-11-26",
        "partes": [
          {
            "de": "2026-11-26",
            "bloques": {
              "vibe": 0,
              "syn": -450,
              "biz": -345,
              "liv": -575
            }
          },
          {
            "de": "2026-11-21",
            "bloques": {
              "revision": 0,
              "biz": 0
            }
          },
          {
            "de": "2026-11-28",
            "bloques": {
              "theomed-prep": 0,
              "theomed-vivo": 0,
              "syn": 0,
              "anki-sab": 0
            }
          }
        ],
        "titulo": "Sábado · 4 bloques del jue 26 + revisión S02 y cierre del OUTPUT S2 + Theomed en vivo 15:00 (corrido)",
        "nota": "Antes del gimnasio, 4 bloques del plan del jue 26: 04:15 vibecoding · 05:00 SYNAPSE · 07:15 Business · 07:40 LIVIANO. 14:00 revisión S02 · 14:30 cierre del OUTPUT S2 · 14:45 preparar la clase · 15:00-17:00 Theomed en vivo · 21:00 SYNAPSE del sábado · 21:30 Anki (la revisión y el cierre son los del sábado 21). Los de esta semana van el sábado 5-dic."
      },
      "2026-11-29": {
        "de": "2026-11-26",
        "partes": [
          {
            "de": "2026-11-26",
            "bloques": {
              "anki": 0,
              "usmle": 0,
              "rd": 45,
              "encaps": -75,
              "eval": -120
            }
          }
        ],
        "titulo": "Domingo · día de plan: el del jue 26 (Step 1) (corrido)",
        "nota": "Hoy (compromiso personal 12:30-14:00 · baile 17:00-20:00) toca el plan del jue 26: 05:00 Anki · 07:15-12:00 Step 1 · 14:15 Derma · 15:00-16:00 ENCAPS (el bloque de las 16:15) · 16:00-16:45 la evaluación de las 18:00. AURUM y MIR del jue 26 no caben: van el domingo 6-dic (12:15 y 13:15). Sin ENCAPS opcional; el SHIP S3 va el domingo 13-dic."
      },
      "2026-12-05": {
        "de": "2026-11-28",
        "partes": [
          {
            "de": "2026-11-28",
            "bloques": {
              "revision": 0,
              "biz": 0
            }
          },
          {
            "de": "2026-12-05",
            "bloques": {
              "theomed-prep": 0,
              "theomed-vivo": 0,
              "syn": 0,
              "anki-sab": 0
            }
          }
        ],
        "titulo": "Sábado · revisión S03 y cierre del OUTPUT S3 (los del sábado 28) + Theomed en vivo 15:00",
        "nota": "14:00 revisión S03 · 14:30 cierre del OUTPUT S3 · 14:45 preparar la clase · 15:00-17:00 Theomed en vivo · 21:00 SYNAPSE del sábado · 21:30 Anki (la revisión y el cierre son los del sábado 28: el viernes de plan se hizo el lunes 30). Los de esta semana van el sábado 12 (el viernes 4 de plan se hace el lunes 7)."
      },
      "2026-12-06": {
        "de": "2026-11-15",
        "partes": [
          {
            "de": "2026-11-15",
            "bloques": {
              "pc": 0,
              "feynman": 0
            }
          },
          {
            "de": "2026-11-22",
            "bloques": {
              "pc": 0,
              "feynman": 0
            }
          },
          {
            "de": "2026-11-26",
            "bloques": {
              "aurum": -120,
              "mir": -120
            }
          },
          {
            "de": "2026-12-06",
            "bloques": {
              "anki-dom": 0,
              "encaps-dom": 0
            }
          }
        ],
        "titulo": "Domingo · SHIP S1 y S2 pendientes · AURUM y MIR del jue 26 · banqueos N°08-N°09",
        "nota": "Hoy van los SHIP S1 y S2 del vibecoding, pendientes por la semana corrida (2 h cada uno, en orden; de ejemplo 07:15-11:40, con su Feynman opcional). 12:15 AURUM y 13:15 MIR: los del jueves 26, que no cupieron el domingo 29. 14:15-14:45 compromiso fijo. 14:45-16:45 ENCAPS: los banqueos grabados N°08 y N°09 de Theomed, en activo (hoy no cabe simulacro). 16:45 Anki · baile 17:00-20:00. El SHIP S4 va el domingo 13."
      },
      "2026-12-12": {
        "de": "2026-12-05",
        "partes": [
          {
            "de": "2026-12-05",
            "bloques": {
              "revision": 0,
              "biz": 0
            }
          },
          {
            "de": "2026-12-12",
            "bloques": {
              "theomed-prep": 0,
              "theomed-vivo": 0,
              "syn": 0,
              "anki-sab": 0
            }
          }
        ],
        "titulo": "Sábado · revisión S04 y cierre del OUTPUT S4 (los del sábado 5) + Theomed en vivo 15:00",
        "nota": "14:00 revisión S04 · 14:30 cierre del OUTPUT S4 · 14:45 preparar la clase · 15:00-17:00 Theomed en vivo · 21:00 SYNAPSE del sábado · 21:30 Anki (la revisión y el cierre son los del sábado 5). Los de esta semana van el sábado 19."
      },
      "2026-12-13": {
        "de": "2026-11-29",
        "partes": [
          {
            "de": "2026-11-29",
            "bloques": {
              "pc": 0,
              "feynman": 0
            }
          },
          {
            "de": "2026-12-06",
            "bloques": {
              "pc": 0,
              "feynman": 0
            }
          },
          {
            "de": "2026-12-13",
            "bloques": {
              "anki-dom": 0,
              "encaps-dom": 0
            }
          }
        ],
        "titulo": "Domingo · SHIP S3 y S4 · simulacro con RANKING (2 h)",
        "nota": "Hoy van los SHIP S3 y S4 del vibecoding (2 h cada uno, en orden; de ejemplo 07:15-11:40, con su Feynman opcional). 12:30-14:00 compromiso personal · 14:15-14:45 compromiso fijo. 14:45-16:45 ENCAPS: el simulacro con RANKING de Theomed del viernes 11, de un tirón (cuenta el primer intento dentro de 89 h, hasta ≈ el martes 15 a las 09:00); anota la nota al terminar: la usa el GATE del CHECKPOINT del lunes 21. La corrección y el % por área, el domingo 20 de 14:45 a 16:20. 16:45 Anki · baile 17:00-20:00. El SHIP S5 va el domingo 20."
      },
      "2026-12-19": {
        "de": "2026-12-12",
        "partes": [
          {
            "de": "2026-12-12",
            "bloques": {
              "revision": 0,
              "biz": 0
            }
          },
          {
            "de": "2026-12-19",
            "bloques": {
              "theomed-prep": 0,
              "theomed-vivo": 0,
              "syn": 0,
              "anki-sab": 0
            }
          }
        ],
        "titulo": "Sábado · revisión S05 y cierre del OUTPUT S5 (los del sábado 12) + Theomed en vivo 15:00",
        "nota": "14:00 revisión S05 · 14:30 cierre del OUTPUT S5 · 14:45 preparar la clase · 15:00-17:00 Theomed en vivo · 21:00 SYNAPSE del sábado · 21:30 Anki (la revisión y el cierre son los del sábado 12). Los de esta semana van el sábado 26."
      },
      "2026-12-20": {
        "de": "2026-12-13",
        "partes": [
          {
            "de": "2026-12-13",
            "bloques": {
              "pc": 0,
              "feynman": 0
            }
          },
          {
            "de": "2026-12-20",
            "bloques": {
              "anki-dom": 0,
              "encaps-dom": 0
            }
          }
        ],
        "titulo": "Domingo · SHIP S5 · banqueos N°10-N°11 + corrección del simulacro",
        "nota": "Hoy va el SHIP S5 del vibecoding (2 h; de ejemplo 07:15-09:25, con su Feynman opcional). ENCAPS: 12:15-14:15 los banqueos grabados N°10 y N°11 de Theomed, en activo · 14:15-14:45 compromiso fijo · 14:45-16:20 la corrección y el % por área del simulacro con RANKING del domingo 13. 16:45 Anki · baile 17:00-20:00. El SHIP S6 va el domingo 27."
      },
      "2026-12-26": {
        "de": "2026-12-19",
        "partes": [
          {
            "de": "2026-12-19",
            "bloques": {
              "revision": 0,
              "biz": 0
            }
          },
          {
            "de": "2026-12-26",
            "bloques": {
              "syn": 0,
              "anki-sab": 0
            }
          }
        ],
        "titulo": "Sábado · revisión S06 (la del sábado 19)",
        "nota": "Hoy no hay clase en vivo. 14:00 revisión S06 · 14:30 cierre del OUTPUT S6 · 21:00 SYNAPSE del sábado · 21:30 Anki (la revisión y el cierre son los del sábado 19: el CHECKPOINT del viernes 18 de plan se hizo el lunes 21). La revisión de esta semana va el sábado 2-ene."
      },
      "2026-12-27": {
        "de": "2026-12-20",
        "partes": [
          {
            "de": "2026-12-20",
            "bloques": {
              "pc": 0,
              "feynman": 0
            }
          },
          {
            "de": "2026-12-27",
            "bloques": {
              "anki-dom": 0,
              "encaps-dom": 0,
              "pc": 0,
              "feynman": 0
            }
          }
        ],
        "titulo": "Domingo · SHIP S6 + AVANCE S7",
        "nota": "Hoy (compromiso personal 12:00-14:45 · baile 17:00-20:00) van el SHIP S6 (el de la semana del 14, pendiente por el corrimiento) y el AVANCE S7 del vibecoding (2 h cada uno; de ejemplo 07:15-11:40). El ENCAPS opcional, solo si te sobra energía (el hueco libre es de 14:45 a 16:45). 16:45 Anki."
      },
      "2027-01-02": {
        "de": "2026-12-26",
        "partes": [
          {
            "de": "2026-12-26",
            "bloques": {
              "revision": 0
            }
          },
          {
            "de": "2027-01-02",
            "bloques": {
              "syn": 0,
              "revision": 60
            }
          }
        ],
        "titulo": "Sábado · revisión S07 (la del sábado 26) + revisión de esta semana",
        "nota": "Hoy no hay clase en vivo. 14:00 revisión S07 (la del sábado 26: su semana terminó el lunes 28) · 15:00 la revisión de esta semana (la del 29 al 31: el último día de F1 fue el jueves 31) · 21:00 SYNAPSE. Mañana domingo, el SHIP S7; el lunes 4 arranca la intensiva en su fecha."
      }
    },
    "resumen": "SEMANA CORRIDA v6.07e (orden del jue 12: «última modificación: todo inicia mañana; corre un día todo»): lun 9 → jue 12 sin estudio → TODO ARRANCA EL VIE 13 (D1 = plan del lun 9) · fines de semana de recuperación (los de la v6.07d): sáb 14 + dom 15 = plan del mar 10 (UWSA1 el dom 15) · sáb 21 + dom 22 = plan del mié 18 · sáb 28 + dom 29 = plan del jue 26 (AURUM y MIR → dom 6-dic por un compromiso personal) · el resto de F1 CORRE UN DÍA: cada día hábil hace el plan del hábil anterior y el último día de F1 (mié 30-dic) va el JUE 31-DIC · la revisión y el cierre del OUTPUT de cada sábado van el sábado siguiente · SHIP S1+S2 → dom 6-dic, S3+S4 → dom 13, S5 → dom 20, S6 → dom 27 · desde el lun 4-ene todo en su fecha: ninguna fecha posterior cambia (ENCAPS dom 14-mar, Step 1 lun 6-dic-2027).",
    "reemplazos": {
      "2026-11-09": [
        {
          "frente": "usmle",
          "a": "el Step 1 arranca mañana (D1 mar 10-nov, UWSA1) y en F1 tiene mañana solo los mar · jue.",
          "por": "el Step 1 arranca el domingo 15 (D1, UWSA1) y en F1 tiene mañana los mar · jue de plan (con la semana corrida caen el domingo 15, el martes 17, el viernes 20, el lunes 23, el jueves 26 y el domingo 29)."
        },
        {
          "frente": "usmle",
          "a": "→ mañana CONFIGURACIÓN (D1)",
          "por": "→ CONFIGURACIÓN el domingo 15 (D1)"
        },
        {
          "frente": "usmle",
          "a": "Los mazos y el preset «APEX USMLE» se hacen mañana con el vídeo de Palmerton (no se adelanta).",
          "por": "Los mazos y el preset «APEX USMLE» se hacen el domingo 15 a las 05:00 con el vídeo de Palmerton (no se adelanta)."
        },
        {
          "frente": "encaps",
          "a": "Hoy 19:30 en vivo INV 1/4 (en diferido: audio en tiempos muertos; el PPT el domingo).",
          "por": "El en vivo INV 1/4 fue el lunes 9 a las 19:30 (va en diferido: audio en tiempos muertos; el PPT, en un hueco de la semana: el domingo 15 es el del UWSA1)."
        },
        {
          "frente": "encaps",
          "a": "lo usa la revisión del sábado 14:00.",
          "por": "lo usa la revisión del sábado 21 a las 14:00 (este sábado 14 no hay revisión)."
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override del miércoles 18, tras el mini-sim #5"
        },
        {
          "frente": "encaps",
          "a": "★ para mañana a las 05:30.",
          "por": "★ para el lunes 16 a las 05:30 (el sábado no hay repaso ENCAPS y el domingo 15, día del UWSA1, la configuración de Anki ocupa de 05:00 a 05:45)."
        }
      ],
      "2026-11-10": [
        {
          "frente": "usmle",
          "a": "El final del vídeo se ve a las 07:55:",
          "por": "El final del vídeo se ve a las 07:25, en la preparación 2/2:"
        },
        {
          "frente": "usmle",
          "a": "Hoy el bloque USMLE va de 07:15 a 13:00: el UWSA1 son 4 h netas (4 × 40Q × 90 s) y con la pausa no cabe en 09:00-13:00 → empieza a las 08:50. 07:25-07:55 = SYNAPSE (su propia tarjeta del Home; no se repite aquí) · 07:55-08:50 = 2/2 de la preparación · ALMUERZO 13:00-13:30 (en vez del libro + holgura) · Research ↔ Derma 13:30 sin cambio.",
          "por": "Hoy domingo (el plan del martes 10): 07:15-07:25 esta tarjeta · 07:25-07:40 la 2/2 (el final del vídeo de Anki + Ziploc) · 07:40-11:50 el UWSA1 (4 h netas: 4 × 40Q × 90 s, con la pausa) · 11:50-12:30 almuerzo · 12:30 Day-After 1/6 · 13:15 Derma. El vídeo «The ONLY Video…» y el peor escenario fueron ayer sábado, de 14:00 a 14:45; el SYNAPSE de este plan, ayer a las 05:00."
        },
        {
          "frente": "usmle",
          "a": "07:55–08:50",
          "por": "07:25–07:40"
        },
        {
          "frente": "usmle",
          "a": "PREPARACIÓN DEL HITO 2/2 · vídeo de método + peor escenario",
          "por": "PREPARACIÓN DEL HITO 2/2 · final del vídeo de Anki + Ziploc (el otro vídeo y el peor escenario fueron ayer sábado, 14:00-14:45)"
        },
        {
          "frente": "usmle",
          "a": "Palmerton · «The ONLY Video You Need to Pass the USMLE Step 1 in 2026» de 0:00 a 26:00 (dura 38:13)",
          "por": "YA HECHO AYER (sábado 14, 14:00): Palmerton · «The ONLY Video You Need to Pass the USMLE Step 1 in 2026» de 0:00 a 26:00 — hoy no va"
        },
        {
          "frente": "usmle",
          "a": "Worst-Case Scenario Planning por escrito + kit anti-pánico",
          "por": "YA HECHO AYER (sábado 14, ≈14:32): Worst-Case Scenario Planning por escrito + kit anti-pánico — hoy, solo relee la hoja"
        },
        {
          "frente": "usmle",
          "a": "A las 08:49: New Test",
          "por": "A las 07:39: New Test"
        },
        {
          "frente": "usmle",
          "a": "08:50–13:00",
          "por": "07:40–11:50"
        },
        {
          "frente": "usmle",
          "a": "A las 13:00, almuerzo.",
          "por": "A las 11:50, almuerzo; a las 12:30, el Day-After 1/6."
        },
        {
          "frente": "usmle",
          "a": "se adelanta al D1 (mar 10-nov)",
          "por": "se adelantó a la víspera del D1 (sábado 14, 14:00)"
        },
        {
          "frente": "vibecoding",
          "a": "05:00 = Anki sin excepción.",
          "por": "05:00 = SYNAPSE (hoy sábado el Anki es a las 21:30)."
        },
        {
          "frente": "vibecoding",
          "a": "nunca el Anki de las 05:00.",
          "por": "nunca el SYNAPSE de las 05:00 ni el Anki de las 21:30."
        },
        {
          "frente": "synapse",
          "a": "Hoy UWSA1 (08:50-13:00): el SYNAPSE se hace a las 07:25, entre las 2 partes de la preparación del hito (USMLE 07:15-07:25 y 07:55-08:50; esta es la única tarjeta SYNAPSE de hoy); a las 12:30 no hay SYNAPSE. El Calendar ya está en 07:25.",
          "por": "Esta es la única tarjeta SYNAPSE del plan del martes 10 (el del UWSA1): va hoy sábado a las 05:00, antes del gimnasio; el UWSA1 es mañana domingo por la mañana."
        },
        {
          "frente": "synapse",
          "a": "deja A para mañana.",
          "por": "deja A para el lunes 16 (mañana domingo no hay SYNAPSE)."
        },
        {
          "frente": "business",
          "a": "Hoy UWSA1: Business se ESCUCHA durante el almuerzo (13:00-13:30); la nota, al terminar.",
          "por": "Hoy sábado Business va de 07:15 a 07:40, antes del gimnasio de las 08:30 (el UWSA1 es mañana domingo): escúchalo y escribe la nota al terminar."
        },
        {
          "frente": "business",
          "a": "el tramo pasa al de mañana",
          "por": "el tramo pasa al del lunes 16, porque mañana domingo no hay Business"
        },
        {
          "frente": "liviano",
          "a": "la lectura pasa a mañana.",
          "por": "la lectura pasa al lunes 16 (mañana domingo no hay LIVIANO)."
        },
        {
          "frente": "usmle",
          "a": "los bloques que falten van a las 18:00",
          "por": "los bloques que falten van a las 12:30, en lugar del Day-After 1/6 (a las 17:00 hay baile),"
        },
        {
          "frente": "usmle",
          "a": "Del D1 al D4 la franja de las 18:00 es la revisión del UWSA1 (Day-After ~4 h repartido mar 10 18:00 → jue 19 18:00, con los días sin Step en medio)",
          "por": "Del D1 al D4 la franja de la eval es la revisión del UWSA1 (Day-After ~4 h repartido del domingo 15, hoy a las 12:30, al lunes 23 a las 18 h, con los días sin Step en medio)"
        },
        {
          "frente": "aurum",
          "a": "Hoy UWSA1 (08:50-13:00) por la mañana: AURUM no se mueve, va a su hora (14:15–15:15), tras el hito y el almuerzo.",
          "por": "Hoy UWSA1 por la mañana (07:40-11:50): AURUM va a las 14:00, tras el hito, el Day-After de las 12:30 y Derma."
        },
        {
          "frente": "mir",
          "a": "sin repasos: revisa las tarjetas de ayer.",
          "por": "sin repasos: revisa las tarjetas del viernes 13 (tu última sesión MIR)."
        },
        {
          "frente": "encaps",
          "a": "5Q del código de AYER II-3",
          "por": "5Q del código del VIERNES 13, II-3"
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override del miércoles 18, tras el mini-sim #5"
        }
      ],
      "2026-11-11": [
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue de plan (con la semana corrida: mañana martes 17, el viernes 20, el lunes 23, el jueves 26 y el domingo 29);"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del lunes",
          "por": "10 tarjetas del viernes 13"
        },
        {
          "frente": "encaps",
          "a": "errores del lunes",
          "por": "errores del viernes 13"
        },
        {
          "frente": "encaps",
          "a": "ENCAPS::Cifras · vencidas",
          "por": "ENCAPS::Cifras · vencidas (y las ★ del viernes 13)"
        },
        {
          "frente": "encaps",
          "a": "★ para mañana a las 05:30.",
          "por": "★ para el miércoles 18 a las 05:30 (mañana martes, de 05:00 a 05:45, va el Day-After 2/6 del UWSA1)."
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override del miércoles 18, tras el mini-sim #5"
        }
      ],
      "2026-11-12": [
        {
          "frente": "usmle",
          "a": "Con las 10 de el mar 10-nov",
          "por": "Con las 10 del mar 10-nov"
        },
        {
          "frente": "usmle",
          "a": "(mar 10 18:00 · jue 12 05:00 · jue 12 07:15 · jue 12 18:00 · mar 17 18:00 · jue 19 18:00 = 253′)",
          "por": "(el domingo 15 a las 12:30 · hoy a las 05:00, a las 07:15 y a las 18:00 · el viernes 20 a las 18:00 · el lunes 23 a las 18:00 = 253′)"
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override del miércoles 18 (mañana), tras el mini-sim #5"
        }
      ],
      "2026-11-13": [
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue de plan (con la semana corrida: el viernes 20, el lunes 23, el jueves 26 y el domingo 29);"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del miércoles",
          "por": "10 tarjetas del lunes 16"
        },
        {
          "frente": "encaps",
          "a": "errores del miércoles",
          "por": "errores del lunes 16"
        },
        {
          "frente": "encaps",
          "a": "Hoy 16:00 Theomed abre simulacro (si se publica): se rinde el DOMINGO 15 (cuenta el primer intento dentro de 89 h).",
          "por": "El viernes 13 a las 16:00 Theomed abrió su simulacro: para el ranking contaba el primer intento dentro de 89 h, hasta ayer martes 17 a las 09:00 (esa semana no hubo hueco fijo: el domingo 15 fue el del UWSA1); si no lo hiciste, ya no cuenta para el ranking."
        },
        {
          "frente": "encaps",
          "a": "ENCAPS::Cifras · vencidas",
          "por": "ENCAPS::Cifras · vencidas (y las ★ del lunes 16)"
        },
        {
          "frente": "encaps",
          "a": "★ para el lunes a las 05:30.",
          "por": "★ para mañana a las 05:30."
        },
        {
          "frente": "encaps",
          "a": "alerta si <15/25 dos viernes seguidos",
          "por": "alerta si <15/25 en dos mini-sims seguidos"
        },
        {
          "frente": "encaps",
          "a": "manda la regla de dos viernes seguidos",
          "por": "manda la regla de dos mini-sims seguidos"
        },
        {
          "frente": "liviano",
          "a": "FISIOLOGÍA — VIERNES CASO 1/16",
          "por": "FISIOLOGÍA — CASO 1/16 (el del viernes de plan)"
        }
      ],
      "2026-11-14": [
        {
          "frente": "usmle",
          "a": "El motor APEX crea los submazos al vuelo con el preset Default (sin tus ajustes): Deck Options del padre APEX::USMLE › Save ▾ «Save to All Subdecks».",
          "por": "Hoy no aplica: el preset «APEX USMLE» se crea mañana domingo a las 05:00 (D1) y ahí se guarda en todos los submazos (Save to All Subdecks), también en el que el motor APEX creó al vuelo con el APEX de prueba del vibecoding de esta mañana."
        },
        {
          "frente": "usmle",
          "a": "(las del viernes esperan al lunes)",
          "por": "(hoy no hay ninguna: aparte de la tarjeta de prueba del vibecoding de esta mañana, el mazo APEX::USMLE está vacío hasta la configuración de mañana domingo a las 05:00)"
        },
        {
          "frente": "usmle",
          "a": "Sábado sin vídeo ni preguntas (descanso).",
          "por": "Sábado sin preguntas (el único vídeo del Step 1 de hoy fue el de la preparación del UWSA1, a las 14:00)."
        },
        {
          "frente": "usmle",
          "a": ", el preset al día en todos los submazos y la telemetría registrada",
          "por": " y la telemetría registrada (el preset «APEX USMLE» se crea mañana domingo a las 05:00)"
        },
        {
          "frente": "encaps",
          "a": "(el domingo o al empezar el banqueo del lunes 09:45)",
          "por": "(al empezar el banqueo del lunes 16 a las 09:45: el domingo 15 es el día del UWSA1)"
        },
        {
          "frente": "encaps",
          "a": "la grabación en el ENCAPS del domingo (tramos que el PPT no explica, a 1,75-2×) y el resto en audio.",
          "por": "la grabación en un hueco de la semana, porque este domingo 15 es el día del UWSA1 y no hay ENCAPS opcional (los tramos que el PPT no explica, a 1,75-2×, y el resto en audio)."
        },
        {
          "frente": "synapse",
          "a": "Retoma donde paraste el lunes.",
          "por": "Retoma donde paraste el viernes 13."
        },
        {
          "frente": "synapse",
          "a": "(gimnasio 08:30-14:00 · 14:00 revisión · 15:00-17:00 Theomed en vivo · baile 17:00-20:00)",
          "por": "(gimnasio 08:30-14:00 · 15:00-17:00 Theomed en vivo · baile 17:00-20:00; hoy no hay revisión: la S01 va el sábado 21 a las 14:00)"
        },
        {
          "frente": "synapse",
          "a": "El SHIP del vibecoding es el domingo.",
          "por": "El SHIP S1 del vibecoding pasa al domingo 6 de diciembre (mañana domingo es el día del UWSA1)."
        },
        {
          "frente": "synapse",
          "a": "deja A para mañana.",
          "por": "deja A para el lunes 16 (mañana domingo no hay SYNAPSE)."
        },
        {
          "frente": "usmle",
          "a": "Comprueba que la revisión semanal de las 14:00 recogió: % del UWSA1, gates de la semana (📏 Medición) y la cola de vídeo: ≈101′ de B&B + 12′ de Palmerton que se ven el mar 17-nov y el jue 19-nov (05:00, 07:15 y hueco del deep prime).",
          "por": "Hoy no hay revisión semanal: la S01 va el sábado 21 a las 14:00 y recoge el % del UWSA1 (que es mañana domingo), los gates de la semana (📏 Medición) y la cola de vídeo: ≈101′ de B&B + 12′ de Palmerton que se ven el viernes 20 y el lunes 23 (05:00, 07:15 y hueco del deep prime)."
        },
        {
          "frente": "revision",
          "a": "mini-sim /25 del viernes",
          "por": "mini-sim #5 /25 (el del miércoles 18)"
        },
        {
          "frente": "revision",
          "a": "simulacro del domingo",
          "por": "simulacro de Theomed del viernes 13 (si lo hiciste en algún hueco: el domingo 15 fue el del UWSA1)"
        },
        {
          "frente": "revision",
          "a": "Nivel de la semana que entra (VERDE / ÁMBAR / DELOAD)",
          "por": "Nivel de lo que queda de la S02 (VERDE / ÁMBAR / DELOAD; con la semana corrida empezó el jueves 19 y acaba el martes 24)"
        },
        {
          "frente": "revision",
          "a": "velocidad de vídeo USMLE de la S2 = 1,25× solo si tu free recall recogió ≥ 3 ideas",
          "por": "velocidad de vídeo USMLE de la S2 = 1,25× solo si tu free recall recogió ≥ 3 ideas (con la semana corrida el D3 ya fue el viernes 20: confírmala para el D4 del lunes 23)"
        },
        {
          "frente": "revision",
          "a": "el journal 2026-W47 lo crea el lunes journal_hoy.js.",
          "por": "el journal 2026-W47 ya lo creó journal_hoy.js el jueves 19 (vibecoding S2 1/5)."
        }
      ],
      "2026-11-15": [
        {
          "frente": "vibecoding",
          "a": "journal de la semana",
          "por": "journal de la S1 (2026-W46)"
        },
        {
          "frente": "vibecoding",
          "a": "`node DATA/_scripts/journal_hoy.js --abrir` → cabecera «Criterios de aceptación» (4).",
          "por": "Abre D:/synapse-journal/journal/2026-W46.md, el de la S1 (hoy `journal_hoy.js --abrir` abre el de la S2) → cabecera «Criterios de aceptación» (4)."
        },
        {
          "frente": "vibecoding",
          "a": "(la franja 15:00-17:00 es solo un ejemplo)",
          "por": "(hoy 07:25-09:25 es solo un ejemplo: es el SHIP S1, pendiente por la semana corrida, y va antes del S2)"
        },
        {
          "frente": "vibecoding",
          "a": "(14:50-15:00 es solo un ejemplo)",
          "por": "(hoy 07:15-07:25 es solo un ejemplo)"
        },
        {
          "frente": "vibecoding",
          "a": "Sección «Cierre de semana» del journal.",
          "por": "Sección «Cierre de semana» del journal de la S1 (2026-W46)."
        },
        {
          "frente": "vibecoding",
          "a": "Si todo está verde, el tiempo que sobra es libre (o haces el Feynman).",
          "por": "Si todo está verde, el tiempo que sobra lo adelantas al Feynman y al SHIP S2, que van a continuación."
        }
      ],
      "2026-11-16": [
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue de plan (con la semana corrida: mañana viernes 20, el lunes 23, el jueves 26 y el domingo 29);"
        },
        {
          "frente": "encaps",
          "a": "(y las ★ del viernes)",
          "por": "(y las ★ de ayer)"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del viernes",
          "por": "10 tarjetas de ayer (miércoles 18)"
        },
        {
          "frente": "encaps",
          "a": "errores del viernes",
          "por": "errores de ayer (miércoles 18)"
        },
        {
          "frente": "encaps",
          "a": "(y las del simulacro del domingo, si lo hiciste)",
          "por": "(y las del simulacro de Theomed del viernes 13, si lo hiciste en algún hueco)"
        },
        {
          "frente": "encaps",
          "a": "lo usa la revisión del sábado 14:00.",
          "por": "lo usa la revisión del sábado 28 a las 14:00 (la del sábado 21 es la de la semana anterior)."
        },
        {
          "frente": "encaps",
          "a": "fallé en el mini-sim del viernes (te pego los enunciados)",
          "por": "fallé en el mini-sim #5 de ayer, miércoles 18 (te pego los enunciados)"
        },
        {
          "frente": "encaps",
          "a": "de los fallos del mini-sim del viernes",
          "por": "de los fallos del mini-sim #5 de ayer (miércoles 18)"
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override del martes 24, tras el mini-sim #10"
        },
        {
          "frente": "encaps",
          "a": "Eval del lunes sin runner",
          "por": "Eval de hoy sin runner"
        },
        {
          "frente": "encaps",
          "a": "la eval del lunes (5Q de fallos previos del registro, P2)",
          "por": "la eval de hoy (5Q de fallos previos del registro, P2)"
        },
        {
          "frente": "encaps",
          "a": "★ para mañana a las 05:30.",
          "por": "★ para el domingo 22 a las 05:30 (mañana viernes, de 05:00 a 05:45, va el Anki del Step 1 con el vídeo pendiente, y el sábado no hay repaso ENCAPS)."
        }
      ],
      "2026-11-17": [
        {
          "frente": "usmle",
          "a": "se adelanta al D1 (mar 10-nov)",
          "por": "se adelantó a la víspera del D1 (sábado 14, 14:00)"
        },
        {
          "frente": "usmle",
          "a": "(D2) a las 120 h (tras los días sin Step)",
          "por": "(D2) a las 72 h (tras los días sin Step)"
        },
        {
          "frente": "usmle",
          "a": "(validación a las 120 h, tras los días sin Step",
          "por": "(validación a las 72 h, tras los días sin Step"
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override del martes 24, tras el mini-sim #10"
        },
        {
          "frente": "research-derma",
          "a": "18-sep → 17-nov-2026",
          "por": "21-sep → 20-nov-2026 (los 60 días hasta hoy; los enlaces de Crossref cortan el 17-nov: amplía la fecha final a hoy)"
        }
      ],
      "2026-11-18": [
        {
          "frente": "vibecoding",
          "a": "05:00 = Anki sin excepción.",
          "por": "05:00 = SYNAPSE (hoy sábado el Anki es a las 21:30)."
        },
        {
          "frente": "vibecoding",
          "a": "nunca el Anki de las 05:00.",
          "por": "nunca el SYNAPSE de las 05:00 ni el Anki de las 21:30."
        },
        {
          "frente": "synapse",
          "a": "deja A para mañana.",
          "por": "deja A para el lunes 23 (mañana domingo no hay SYNAPSE)."
        },
        {
          "frente": "business",
          "a": "Business ocupa 13:00-13:25 = «LECTURA DE LIBRO» del Calendar (13:00-13:15) + 10′ del hueco 13:15-13:30; en ÁMBAR baja a 13:00-13:15 y la siesta manda.",
          "por": "Hoy sábado Business va de 07:15 a 07:40, antes del gimnasio de las 08:30; en ÁMBAR, solo 07:15-07:30."
        },
        {
          "frente": "business",
          "a": "el tramo pasa al de mañana",
          "por": "el tramo pasa al del lunes 23, porque mañana domingo no hay Business"
        },
        {
          "frente": "liviano",
          "a": "la lectura pasa a mañana.",
          "por": "la lectura pasa al lunes 23 (mañana domingo no hay LIVIANO)."
        },
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue; hoy la mañana 07:15-12:00 y las 18:00 son de ENCAPS.",
          "por": "en F1 el Step 1 tiene mañana los mar · jue de plan (con la semana corrida: mañana lunes 23, el jueves 26 y el domingo 29); hoy la mañana 07:15-12:00 y las 12:30 son de ENCAPS."
        },
        {
          "frente": "encaps",
          "a": "Hoy la mañana 07:15-12:00 y las 18:00 son de ENCAPS.",
          "por": "Hoy la mañana 07:15-12:00 y las 12:30 son de ENCAPS."
        },
        {
          "frente": "encaps",
          "a": "ENCAPS::Cifras · vencidas",
          "por": "ENCAPS::Cifras · vencidas (y las ★ del jueves 19)"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del lunes",
          "por": "10 tarjetas del jueves 19"
        },
        {
          "frente": "encaps",
          "a": "errores del lunes",
          "por": "errores del jueves 19"
        },
        {
          "frente": "encaps",
          "a": "Lo que no veas hoy va a las 18:00.",
          "por": "Lo que no veas hoy va a las 12:30."
        },
        {
          "frente": "encaps",
          "a": "★ para mañana a las 05:30.",
          "por": "★ para el martes 24 a las 05:30 (mañana lunes, de 05:00 a 05:45, va el Anki del Step 1)."
        },
        {
          "frente": "encaps",
          "a": "5Q del código de AYER I-4",
          "por": "5Q del código del VIERNES 20, I-4"
        },
        {
          "frente": "encaps",
          "a": "la eval (I-4, código de ayer)",
          "por": "la eval (I-4, código del viernes 20)"
        },
        {
          "frente": "encaps",
          "a": "rehechas desde tus fallos de ayer",
          "por": "rehechas desde tus fallos del viernes 20"
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override del martes 24, tras el mini-sim #10"
        },
        {
          "frente": "mir",
          "a": "sin repasos: revisa las tarjetas de ayer.",
          "por": "sin repasos: revisa las tarjetas del viernes 20 (tu última sesión MIR)."
        },
        {
          "frente": "aurum",
          "a": "VER (14:15 de vídeo)",
          "por": "VER (14 min 15 s de vídeo)"
        },
        {
          "frente": "aurum",
          "a": "· Grant Cardone · 14:15",
          "por": "· Grant Cardone · 14 min 15 s"
        },
        {
          "frente": "aurum",
          "a": "El vídeo elegido dura 14:15:",
          "por": "El vídeo elegido dura 14 min 15 s:"
        }
      ],
      "2026-11-19": [
        {
          "frente": "synapse",
          "a": "El número de esta semana (sale los jueves)",
          "por": "El número más reciente (sale los jueves: hoy, el del jueves 19)"
        },
        {
          "frente": "usmle",
          "a": "a las 48 h",
          "por": "a las 72 h"
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del martes 24"
        },
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S2 (domingo 6 de diciembre)."
        }
      ],
      "2026-11-20": [
        {
          "frente": "encaps",
          "a": "ENCAPS::Cifras · vencidas",
          "por": "ENCAPS::Cifras · vencidas (y las ★ del domingo 22)"
        },
        {
          "frente": "liviano",
          "a": "FISIOLOGÍA — VIERNES CASO 2/16",
          "por": "FISIOLOGÍA — CASO 2/16 (el del viernes de plan)"
        },
        {
          "frente": "vibecoding",
          "a": "Lo que falle va al SHIP del domingo.",
          "por": "Lo que falle va al SHIP S2, que pasa al domingo 6 de diciembre."
        },
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, esta semana: el lunes 23, el jueves 26 y el domingo 29);"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del miércoles",
          "por": "10 tarjetas del domingo 22"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del miércoles",
          "por": "Reglas de los errores del domingo 22"
        },
        {
          "frente": "encaps",
          "a": "dos viernes seguidos",
          "por": "dos mini-sims seguidos"
        },
        {
          "frente": "encaps",
          "a": "★ para el lunes a las 05:30.",
          "por": "★ para mañana a las 05:30."
        },
        {
          "frente": "synapse",
          "a": "— tramo 2 (termínalo)",
          "por": "— el siguiente tramo de 10′ desde donde quedaste (el comodín de audio del sábado 21 ya siguió con este vídeo)"
        },
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S2 (domingo 6 de diciembre)."
        }
      ],
      "2026-11-21": [
        {
          "frente": "revision",
          "a": "simulacro del domingo",
          "por": "simulacro antiguo de 100Q del domingo 22 (si lo hiciste en algún hueco: ese domingo fue día de plan)"
        },
        {
          "frente": "revision",
          "a": "Nivel de la semana que entra (VERDE / ÁMBAR / DELOAD)",
          "por": "Nivel de lo que queda de la S03 (VERDE / ÁMBAR / DELOAD; con la semana corrida empezó el miércoles 25 y acaba el lunes 30)"
        },
        {
          "frente": "encaps",
          "a": "(el domingo o al empezar el banqueo del lunes 09:45)",
          "por": "(al empezar el banqueo de mañana domingo 22 a las 09:45 si ya está publicado; si no, en el del martes 24 a las 09:45: el lunes 23 es día de Step)"
        },
        {
          "frente": "encaps",
          "a": "la grabación en el ENCAPS del domingo (tramos que el PPT no explica, a 1,75-2×) y el resto en audio.",
          "por": "la grabación en un hueco de la semana, porque este domingo 22 es día de plan y no hay ENCAPS opcional (los tramos que el PPT no explica, a 1,75-2×, y el resto en audio)."
        },
        {
          "frente": "synapse",
          "a": "«AI prompt engineering: A deep dive» (canal Anthropic) → minutos 20:00-30:00",
          "por": "«AI prompt engineering: A deep dive» (canal Anthropic) → minutos 10:00-20:00"
        },
        {
          "frente": "synapse",
          "a": "Retoma donde paraste el viernes (2 tramos de 10′ ya vistos)",
          "por": "Retoma donde paraste el miércoles 18 (1 tramo de 10′ ya visto; el B del martes 24 seguirá desde donde pares hoy)"
        },
        {
          "frente": "synapse",
          "a": "Quedan ≈47′ del vídeo: van a los próximos comodines de audio (marca el minuto).",
          "por": "Quedan ≈57′ del vídeo: el martes 24 sigues desde donde pares y el resto va a los próximos comodines de audio (marca el minuto)."
        },
        {
          "frente": "synapse",
          "a": "El SHIP del vibecoding es el domingo.",
          "por": "El SHIP S2 del vibecoding pasa al domingo 6 de diciembre, con el S1 (mañana domingo es día de plan)."
        },
        {
          "frente": "synapse",
          "a": "deja A para mañana.",
          "por": "deja A para el lunes 23 (mañana domingo no hay SYNAPSE)."
        },
        {
          "frente": "usmle",
          "a": "(las del viernes esperan al lunes)",
          "por": "(las del viernes 20 van mañana domingo, en el Anki de las 05:00)"
        },
        {
          "frente": "revision",
          "a": "mini-sim /25 del viernes",
          "por": "mini-sim /25 del martes 24"
        }
      ],
      "2026-11-22": [
        {
          "frente": "vibecoding",
          "a": "journal de la semana",
          "por": "journal de la S2 (2026-W47)"
        },
        {
          "frente": "vibecoding",
          "a": "(la franja 15:00-17:00 es solo un ejemplo)",
          "por": "(hoy 09:40-11:40 es solo un ejemplo: va después del SHIP S1, también pendiente)"
        },
        {
          "frente": "vibecoding",
          "a": "(14:50-15:00 es solo un ejemplo)",
          "por": "(hoy 09:30-09:40 es solo un ejemplo)"
        },
        {
          "frente": "vibecoding",
          "a": "Sección «Cierre de semana» del journal.",
          "por": "Sección «Cierre de semana» del journal de la S2 (2026-W47)."
        }
      ],
      "2026-11-23": [
        {
          "frente": "encaps",
          "a": "★ para mañana a las 05:30.",
          "por": "★ para el viernes 27 a las 05:30 (mañana jueves, de 05:00 a 05:45, va el Anki del Step 1 con el vídeo pendiente)."
        },
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, esta semana: el lunes 23, el jueves 26 y el domingo 29);"
        },
        {
          "frente": "encaps",
          "a": "(y las ★ del viernes)",
          "por": "(y las ★ de ayer)"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del viernes",
          "por": "10 tarjetas de ayer (martes 24)"
        },
        {
          "frente": "encaps",
          "a": "(y las del simulacro del domingo, si lo hiciste)",
          "por": "(y las del simulacro antiguo, si lo hiciste en algún hueco: el domingo 22 fue día de plan)"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del viernes",
          "por": "Reglas de los errores de ayer (martes 24)"
        },
        {
          "frente": "encaps",
          "a": "lo usa la revisión del sábado 14:00.",
          "por": "lo usa la revisión del sábado 5 de diciembre a las 14:00 (la del sábado 28 cierra la semana anterior)."
        },
        {
          "frente": "encaps",
          "a": "de los fallos del mini-sim del viernes",
          "por": "de los fallos del mini-sim de ayer (martes 24)"
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 30"
        },
        {
          "frente": "encaps",
          "a": "Eval del lunes sin runner",
          "por": "Eval de hoy sin runner"
        },
        {
          "frente": "encaps",
          "a": "fallé en el mini-sim del viernes (te pego los enunciados)",
          "por": "fallé en el mini-sim de ayer, martes 24 (te pego los enunciados)"
        },
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S3 (domingo 13 de diciembre)."
        }
      ],
      "2026-11-24": [
        {
          "frente": "usmle",
          "a": "a las 120 h",
          "por": "a las 72 h"
        },
        {
          "frente": "usmle",
          "a": "revisión semanal del sáb 28-nov",
          "por": "revisión semanal del sábado 5 de diciembre (la del sábado 28 cierra la semana anterior)"
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 30"
        },
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S3 (domingo 13 de diciembre)."
        }
      ],
      "2026-11-25": [
        {
          "frente": "encaps",
          "a": "ENCAPS::Cifras · vencidas",
          "por": "ENCAPS::Cifras · vencidas (y las ★ del miércoles 25)"
        },
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, esta semana: el lunes 23, el jueves 26 y el domingo 29);"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del lunes",
          "por": "10 tarjetas del miércoles 25"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del lunes",
          "por": "Reglas de los errores del miércoles 25"
        },
        {
          "frente": "encaps",
          "a": "lo usa la revisión del sábado 14:00.",
          "por": "lo usa la revisión del sábado 5 de diciembre a las 14:00 (la de mañana, sábado 28, cierra la semana anterior)."
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 30"
        },
        {
          "frente": "encaps",
          "a": "★ para mañana a las 05:30.",
          "por": "★ para el domingo 29 a las 05:30 (mañana sábado no hay repaso ENCAPS)."
        },
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S3 (domingo 13 de diciembre)."
        }
      ],
      "2026-11-26": [
        {
          "frente": "vibecoding",
          "a": "05:00 = Anki sin excepción.",
          "por": "05:00 = SYNAPSE (hoy sábado el Anki es a las 21:30)."
        },
        {
          "frente": "vibecoding",
          "a": "nunca el Anki de las 05:00.",
          "por": "nunca el SYNAPSE de las 05:00 ni el Anki de las 21:30."
        },
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S3 (domingo 13 de diciembre)."
        },
        {
          "frente": "synapse",
          "a": "deja A para mañana.",
          "por": "deja A para el lunes 30 (mañana domingo no hay SYNAPSE)."
        },
        {
          "frente": "business",
          "a": "Business ocupa 13:00-13:25 = «LECTURA DE LIBRO» del Calendar (13:00-13:15) + 10′ del hueco 13:15-13:30; en ÁMBAR baja a 13:00-13:15 y la siesta manda.",
          "por": "Hoy sábado Business va de 07:15 a 07:40, antes del gimnasio de las 08:30; en ÁMBAR, solo 07:15-07:30."
        },
        {
          "frente": "business",
          "a": "el tramo pasa al de mañana",
          "por": "el tramo pasa al del lunes 30, porque mañana domingo no hay Business"
        },
        {
          "frente": "liviano",
          "a": "la lectura pasa a mañana.",
          "por": "la lectura pasa al lunes 30 (mañana domingo no hay LIVIANO)."
        },
        {
          "frente": "usmle",
          "a": "(validación a los 2 días ·",
          "por": "(validación a los 3 días ·"
        },
        {
          "frente": "encaps",
          "a": "vencidas (y las ★ de ayer)",
          "por": "vencidas (y las ★ del viernes 27)"
        },
        {
          "frente": "encaps",
          "a": "5Q del código de AYER V-2",
          "por": "5Q del código del VIERNES 27, V-2"
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim de mañana, lunes 30"
        },
        {
          "frente": "encaps",
          "a": "rehechas desde tus fallos de ayer",
          "por": "rehechas desde tus fallos del viernes 27"
        },
        {
          "frente": "mir",
          "a": "sin repasos: revisa las tarjetas de ayer.",
          "por": "sin repasos: revisa las tarjetas del viernes 4 (tu última sesión MIR)."
        }
      ],
      "2026-11-27": [
        {
          "frente": "liviano",
          "a": "FISIOLOGÍA — VIERNES CASO 3/16",
          "por": "FISIOLOGÍA — CASO 3/16 (el del viernes de plan)"
        },
        {
          "frente": "vibecoding",
          "a": "Lo que falle va al SHIP del domingo.",
          "por": "Lo que falle va al SHIP S3, que pasa al domingo 13 de diciembre."
        },
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S3 (domingo 13 de diciembre)."
        },
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, esta semana: el miércoles 2 y el viernes 4);"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del miércoles",
          "por": "10 tarjetas del viernes 27"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del miércoles",
          "por": "Reglas de los errores del viernes 27"
        },
        {
          "frente": "encaps",
          "a": "Hoy 16:00 Theomed abre simulacro → domingo 29. Con esto queda al día el atraso de Theomed.",
          "por": "El viernes 27 a las 16:00 Theomed abría su simulacro (fecha proyectada por la cadencia quincenal: confírmala en el campus). Para el ranking cuenta el primer intento hasta ≈ mañana martes 1 a las 09:00, y el domingo 29 fue día de plan: el hueco lo decides tú. Atraso de Theomed que sigue pendiente: los banqueos grabados N°08-N°09 (domingo 6 de diciembre) y N°10-N°11 (domingo 20 de diciembre)."
        },
        {
          "frente": "encaps",
          "a": "dos viernes seguidos",
          "por": "dos mini-sims seguidos"
        },
        {
          "frente": "mir",
          "a": "2Q D-1 (D14 Enfermedades de la pleura, mediastino y diafragma)",
          "por": "2Q D-1 (D14 Enfermedades de la pleura, mediastino y diafragma: aún no lo leíste —va el domingo 6 de diciembre—, así que hoy cuentan como pre-test ciego)"
        },
        {
          "frente": "mir",
          "a": "sin repasos: revisa las tarjetas de ayer.",
          "por": "sin repasos: revisa las tarjetas del viernes 27 (tu última sesión MIR)."
        }
      ],
      "2026-11-28": [
        {
          "frente": "encaps",
          "a": "(el domingo o al empezar el banqueo del lunes 09:45)",
          "por": "(al empezar el banqueo del lunes 30 a las 09:45: mañana domingo es día de plan)"
        },
        {
          "frente": "encaps",
          "a": "la grabación en el ENCAPS del domingo (tramos que el PPT no explica, a 1,75-2×) y el resto en audio.",
          "por": "la grabación en un hueco de la semana, porque mañana domingo es día de plan y no hay ENCAPS opcional (los tramos que el PPT no explica, a 1,75-2×, y el resto en audio)."
        },
        {
          "frente": "synapse",
          "a": "El SHIP del vibecoding es el domingo.",
          "por": "El SHIP S3 del vibecoding pasa al domingo 13 de diciembre (mañana domingo es día de plan)."
        },
        {
          "frente": "synapse",
          "a": "deja A para mañana.",
          "por": "deja A para el lunes 30 (mañana domingo no hay SYNAPSE)."
        },
        {
          "frente": "usmle",
          "a": "(las del viernes esperan al lunes)",
          "por": "(las que queden en la cola van mañana domingo, en el Anki de las 05:00)"
        },
        {
          "frente": "usmle",
          "a": "→ el lunes, protocolo de backlog",
          "por": "→ mañana domingo a las 05:00 (día de plan), protocolo de backlog"
        },
        {
          "frente": "revision",
          "a": "mini-sim /25 del viernes",
          "por": "mini-sim /25 del lunes 30"
        },
        {
          "frente": "revision",
          "a": "simulacro del domingo",
          "por": "simulacro de Theomed del viernes 27 (si lo hiciste en algún hueco: el domingo 29 fue día de plan)"
        }
      ],
      "2026-11-29": [
        {
          "frente": "vibecoding",
          "a": "journal de la semana",
          "por": "journal de la S3 (2026-W48)"
        },
        {
          "frente": "vibecoding",
          "a": "`node DATA/_scripts/journal_hoy.js --abrir` → cabecera «Criterios de aceptación» (4).",
          "por": "Abre D:/synapse-journal/journal/2026-W48.md, el de la S3 (hoy `journal_hoy.js --abrir` abre el de la S4) → cabecera «Criterios de aceptación» (4)."
        },
        {
          "frente": "vibecoding",
          "a": "Si todo está verde, el tiempo que sobra es libre (o haces el Feynman).",
          "por": "Si todo está verde, el tiempo que sobra lo adelantas al Feynman y al SHIP S4, que van a continuación."
        },
        {
          "frente": "vibecoding",
          "a": "(la franja 15:00-17:00 es solo un ejemplo)",
          "por": "(hoy 07:25-09:25 es solo un ejemplo: es el SHIP S3, pendiente por la semana corrida, y va antes del S4)"
        },
        {
          "frente": "vibecoding",
          "a": "(14:50-15:00 es solo un ejemplo)",
          "por": "(hoy 07:15-07:25 es solo un ejemplo)"
        },
        {
          "frente": "vibecoding",
          "a": "Sección «Cierre de semana» del journal.",
          "por": "Sección «Cierre de semana» del journal de la S3 (2026-W48)."
        }
      ],
      "2026-11-30": [
        {
          "frente": "vibecoding",
          "a": "correr node DATA/_scripts/verify_vibecoding.js 1, 2 y 3 y leer _vibecoding_ship.json.",
          "por": "correr node DATA/_scripts/verify_vibecoding.js 1, 2 y 3 (los SHIP S1 y S2 van el domingo 6 y el S3 el domingo 13 de diciembre: sus ✗ de hoy son esperables) y leer _vibecoding_ship.json."
        },
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S4 (domingo 13 de diciembre)."
        },
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, esta semana: el miércoles 2 y el viernes 4);"
        },
        {
          "frente": "encaps",
          "a": "(y las ★ del viernes)",
          "por": "(y las ★ de ayer)"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del viernes",
          "por": "10 tarjetas de ayer (lunes 30)"
        },
        {
          "frente": "encaps",
          "a": "(y las del simulacro del domingo, si lo hiciste)",
          "por": "(y las del simulacro de Theomed del viernes 27, si ya lo hiciste)"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del viernes",
          "por": "Reglas de los errores de ayer (lunes 30)"
        },
        {
          "frente": "encaps",
          "a": "lo usa la revisión del sábado 14:00.",
          "por": "lo usa la revisión del sábado 12 a las 14:00 (la del sábado 5 cierra la semana anterior)."
        },
        {
          "frente": "encaps",
          "a": "de los fallos del mini-sim del viernes",
          "por": "de los fallos del mini-sim de ayer (lunes 30)"
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 7"
        },
        {
          "frente": "encaps",
          "a": "Eval del lunes sin runner",
          "por": "Eval de hoy sin runner"
        },
        {
          "frente": "encaps",
          "a": "fallé en el mini-sim del viernes (te pego los enunciados)",
          "por": "fallé en el mini-sim de ayer, lunes 30 (te pego los enunciados)"
        },
        {
          "frente": "mir",
          "a": "AL TERMINAR Neumología (2.ª pasada de la vuelta)",
          "por": "AL TERMINAR Neumología (2.ª pasada de la vuelta; falta el D14 pleura, que va el domingo 6 de diciembre)"
        }
      ],
      "2026-12-01": [
        {
          "frente": "usmle",
          "a": "(validación a los 5 días ·",
          "por": "(validación a los 3 días ·"
        },
        {
          "frente": "mir",
          "a": "(bloque D12-D16 cerrado)",
          "por": "(bloque D12-D16 salvo el D14 pleura, que va el domingo 6 de diciembre: no uses ninguna de sus 5 preguntas del pool, son su pre-test)"
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 7"
        },
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S4 (domingo 13 de diciembre)."
        }
      ],
      "2026-12-02": [
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, esta semana: el miércoles 2 y el viernes 4);"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del lunes",
          "por": "10 tarjetas del martes 1"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del lunes",
          "por": "Reglas de los errores del martes 1"
        },
        {
          "frente": "encaps",
          "a": "lo usa la revisión del sábado 14:00.",
          "por": "lo usa la revisión del sábado 12 a las 14:00 (la del sábado 5 cierra la semana anterior)."
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 7"
        },
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S4 (domingo 13 de diciembre)."
        }
      ],
      "2026-12-03": [
        {
          "frente": "usmle",
          "a": "o mañana a las 05:00",
          "por": "o mañana sábado en el Anki de las 21:30"
        },
        {
          "frente": "business",
          "a": "el tramo pasa al de mañana",
          "por": "el tramo pasa al del lunes 7, porque mañana sábado solo va el cierre del OUTPUT S3"
        },
        {
          "frente": "liviano",
          "a": "la lectura pasa a mañana.",
          "por": "la lectura pasa al lunes 7 (mañana sábado no hay LIVIANO)."
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 7"
        },
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S4 (domingo 13 de diciembre)."
        }
      ],
      "2026-12-04": [
        {
          "frente": "vibecoding",
          "a": "Lo que falle va al SHIP del domingo.",
          "por": "Lo que falle va al SHIP S4, que pasa al domingo 13 de diciembre."
        },
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S4 (domingo 13 de diciembre)."
        },
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, esta semana: el miércoles 9 y el viernes 11);"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del miércoles",
          "por": "10 tarjetas del jueves 3"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del miércoles",
          "por": "Reglas de los errores del jueves 3"
        },
        {
          "frente": "encaps",
          "a": "dos viernes seguidos",
          "por": "dos mini-sims seguidos"
        },
        {
          "frente": "encaps",
          "a": "★ para el lunes a las 05:30.",
          "por": "★ para mañana a las 05:30."
        },
        {
          "frente": "liviano",
          "a": "FISIOLOGÍA — VIERNES CASO 4/16",
          "por": "FISIOLOGÍA — CASO 4/16 (el del viernes de plan)"
        }
      ],
      "2026-12-05": [
        {
          "frente": "encaps",
          "a": "(el domingo o al empezar el banqueo del lunes 09:45)",
          "por": "(al empezar el banqueo del lunes 7 a las 09:45: mañana domingo el ENCAPS lo llenan los banqueos N°08 y N°09)"
        },
        {
          "frente": "encaps",
          "a": "la grabación en el ENCAPS del domingo (tramos que el PPT no explica, a 1,75-2×) y el resto en audio.",
          "por": "la grabación en un hueco de la semana, porque mañana domingo el ENCAPS lo llenan los banqueos N°08 y N°09 (los tramos que el PPT no explica, a 1,75-2×, y el resto en audio)."
        },
        {
          "frente": "synapse",
          "a": "El SHIP del vibecoding es el domingo.",
          "por": "Mañana domingo van los SHIP S1 y S2 del vibecoding, pendientes por la semana corrida (el S3 y el S4, el domingo 13)."
        },
        {
          "frente": "revision",
          "a": "mini-sim /25 del viernes",
          "por": "mini-sim /25 del lunes 7"
        },
        {
          "frente": "revision",
          "a": "simulacro del domingo",
          "por": "banqueos N°08 y N°09 del domingo 6 (fallos y reglas; ese domingo no hubo simulacro)"
        }
      ],
      "2026-12-06": [
        {
          "frente": "vibecoding",
          "a": "journal de la semana",
          "por": "journal de la S4 (2026-W49)"
        },
        {
          "frente": "vibecoding",
          "a": "(la franja 15:00-17:00 es solo un ejemplo)",
          "por": "(hoy 09:40-11:40 es solo un ejemplo: va después del SHIP S3, también pendiente)"
        },
        {
          "frente": "vibecoding",
          "a": "(14:50-15:00 es solo un ejemplo)",
          "por": "(hoy 09:30-09:40 es solo un ejemplo)"
        },
        {
          "frente": "vibecoding",
          "a": "Sección «Cierre de semana» del journal.",
          "por": "Sección «Cierre de semana» del journal de la S4 (2026-W49)."
        }
      ],
      "2026-12-07": [
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S5 (domingo 20 de diciembre)."
        },
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, esta semana: el miércoles 9 y el viernes 11);"
        },
        {
          "frente": "encaps",
          "a": "(y las ★ del viernes)",
          "por": "(y las ★ de ayer)"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del viernes",
          "por": "10 tarjetas de ayer (lunes 7)"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del viernes",
          "por": "Reglas de los errores de ayer (lunes 7)"
        },
        {
          "frente": "encaps",
          "a": "(y las del simulacro del domingo, si lo hiciste)",
          "por": "(y las de los banqueos N°08 y N°09 del domingo 6, si los hiciste)"
        },
        {
          "frente": "encaps",
          "a": "Feriado nacional mañana y el miércoles: el plan sigue.",
          "por": "Feriado nacional hoy (martes 8) y mañana (miércoles 9): el plan sigue."
        },
        {
          "frente": "encaps",
          "a": "lo usa la revisión del sábado 14:00.",
          "por": "lo usa la revisión del sábado 19 a las 14:00 (la del sábado 12 cierra la semana anterior)."
        },
        {
          "frente": "encaps",
          "a": "de los fallos del mini-sim del viernes",
          "por": "de los fallos del mini-sim de ayer (lunes 7)"
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 14"
        },
        {
          "frente": "encaps",
          "a": "Eval del lunes sin runner",
          "por": "Eval de hoy sin runner"
        },
        {
          "frente": "encaps",
          "a": "fallé en el mini-sim del viernes (te pego los enunciados)",
          "por": "fallé en el mini-sim de ayer, lunes 7 (te pego los enunciados)"
        }
      ],
      "2026-12-08": [
        {
          "frente": "usmle",
          "a": "≥80 % → el jue 10-dic sube el subtema · <80 % → el jue 10-dic a las 07:15 repites 5Q del subtema fallado.",
          "por": "≥80 % → el mar 15-dic sube el subtema · <80 % → el mar 15-dic, en el 1.er bloque de la consolidación de las 11:00, repites 5Q del subtema fallado (el jue 10-dic es el NBME 25)."
        },
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S5 (domingo 20 de diciembre)."
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 14"
        }
      ],
      "2026-12-09": [
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S5 (domingo 20 de diciembre)."
        },
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, esta semana: el miércoles 9 y el viernes 11);"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del lunes",
          "por": "10 tarjetas del martes 8"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del lunes",
          "por": "Reglas de los errores del martes 8"
        },
        {
          "frente": "encaps",
          "a": "lo usa la revisión del sábado 14:00.",
          "por": "lo usa la revisión del sábado 19 a las 14:00 (la del sábado 12 cierra la semana anterior)."
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 14"
        }
      ],
      "2026-12-10": [
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S5 (domingo 20 de diciembre)."
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 14"
        },
        {
          "frente": "business",
          "a": "el tramo pasa al de mañana",
          "por": "el tramo pasa al del lunes 14, porque mañana sábado solo va el cierre del OUTPUT S4"
        },
        {
          "frente": "liviano",
          "a": "la lectura pasa a mañana.",
          "por": "la lectura pasa al lunes 14 (mañana sábado no hay LIVIANO)."
        }
      ],
      "2026-12-11": [
        {
          "frente": "vibecoding",
          "a": "Lo que falle va al SHIP del domingo.",
          "por": "Lo que falle va al SHIP S5, que pasa al domingo 20 de diciembre."
        },
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S5 (domingo 20 de diciembre)."
        },
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, esta semana: el miércoles 16 y el viernes 18);"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del miércoles",
          "por": "10 tarjetas del jueves 10"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del miércoles",
          "por": "Reglas de los errores del jueves 10"
        },
        {
          "frente": "encaps",
          "a": "Hoy 16:00 Theomed abre simulacro → domingo 13 (ranking).",
          "por": "El simulacro con RANKING de Theomed abrió el viernes 11 a las 16:00 (fecha proyectada: confírmala en el campus) e iba ayer, domingo 13; si no lo hiciste, para el ranking cuenta el primer intento hasta ≈ mañana martes 15 a las 09:00 (anota la nota: la usa el GATE del lunes 21)."
        },
        {
          "frente": "encaps",
          "a": "dos viernes seguidos",
          "por": "dos mini-sims seguidos"
        },
        {
          "frente": "encaps",
          "a": "★ para el lunes a las 05:30.",
          "por": "★ para mañana a las 05:30."
        },
        {
          "frente": "mir",
          "a": "sin repasos: revisa las tarjetas de ayer.",
          "por": "sin repasos: revisa las tarjetas del viernes 11 (tu última sesión MIR)."
        },
        {
          "frente": "liviano",
          "a": "GLP-1 — VIERNES CASO 5/16",
          "por": "GLP-1 — CASO 5/16 (el del viernes de plan)"
        },
        {
          "frente": "research-derma",
          "a": "(⏸ v6.06: lun 7 / mié 9-dic, d13/d14 · v6.05: vie 27-nov / mar 1-dic, d13/d14 · v6.03: mismas fechas, d14/d15 · v6.02: mié 25-nov / vie 27-nov · v6.01: jue 19-nov / lun 23-nov ·",
          "por": "(⏸ v6.06: lunes 7 / miércoles 9-dic, d13/d14 · v6.05: viernes 27-nov / martes 1-dic, d13/d14 · v6.03: mismas fechas, d14/d15 · v6.02: miércoles 25-nov / viernes 27-nov · v6.01: jueves 19-nov / lunes 23-nov ·"
        }
      ],
      "2026-12-12": [
        {
          "frente": "encaps",
          "a": "(el domingo o al empezar el banqueo del lunes 09:45)",
          "por": "(al empezar el banqueo del lunes 14 a las 09:45: mañana domingo el ENCAPS lo llena el simulacro con RANKING)"
        },
        {
          "frente": "encaps",
          "a": "la grabación en el ENCAPS del domingo (tramos que el PPT no explica, a 1,75-2×) y el resto en audio.",
          "por": "la grabación en un hueco de la semana, porque mañana domingo el ENCAPS lo llena el simulacro con RANKING (los tramos que el PPT no explica, a 1,75-2×, y el resto en audio)."
        },
        {
          "frente": "synapse",
          "a": "El SHIP del vibecoding es el domingo.",
          "por": "Mañana domingo van los SHIP S3 y S4 del vibecoding, pendientes por la semana corrida (el S5, el domingo 20)."
        },
        {
          "frente": "revision",
          "a": "mini-sim /25 del viernes",
          "por": "mini-sim /25 del lunes 14"
        },
        {
          "frente": "revision",
          "a": "simulacro del domingo",
          "por": "nota del simulacro con RANKING del domingo 13 (la corrección y el % por área van mañana, domingo 20)"
        }
      ],
      "2026-12-13": [
        {
          "frente": "encaps",
          "a": "› el del vie 11-dic)",
          "por": "› el que abrió el viernes 11 de diciembre)"
        },
        {
          "frente": "vibecoding",
          "a": "journal de la semana",
          "por": "journal de la S5 (2026-W50)"
        },
        {
          "frente": "vibecoding",
          "a": "sáb 12-dic, víspera del SHIP S5",
          "por": "hecha el sábado 19, víspera del SHIP S5"
        },
        {
          "frente": "vibecoding",
          "a": "(la franja 15:00-17:00 es solo un ejemplo)",
          "por": "(hoy 07:25-09:25 es solo un ejemplo)"
        },
        {
          "frente": "vibecoding",
          "a": "(14:50-15:00 es solo un ejemplo)",
          "por": "(hoy 07:15-07:25 es solo un ejemplo)"
        }
      ],
      "2026-12-14": [
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S6 (domingo 27 de diciembre)."
        },
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, esta semana: el miércoles 16 y el viernes 18);"
        },
        {
          "frente": "encaps",
          "a": "(y las ★ del viernes)",
          "por": "(y las ★ de ayer)"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del viernes",
          "por": "10 tarjetas de ayer (lunes 14)"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del viernes",
          "por": "Reglas de los errores de ayer (lunes 14)"
        },
        {
          "frente": "encaps",
          "a": "(y las del simulacro del domingo, si lo hiciste)",
          "por": "(las del simulacro del domingo 13 aún no: salen de su corrección, el domingo 20)"
        },
        {
          "frente": "encaps",
          "a": "lo usa la revisión del sábado 14:00.",
          "por": "lo usa la revisión del sábado 26 a las 14:00 (la del sábado 19 cierra la semana anterior)."
        },
        {
          "frente": "encaps",
          "a": "de los fallos del mini-sim del viernes",
          "por": "de los fallos del mini-sim de ayer (lunes 14)"
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 21 (el CHECKPOINT)"
        },
        {
          "frente": "encaps",
          "a": "Eval del lunes sin runner",
          "por": "Eval de hoy sin runner"
        },
        {
          "frente": "encaps",
          "a": "fallé en el mini-sim del viernes (te pego los enunciados)",
          "por": "fallé en el mini-sim de ayer, lunes 14 (te pego los enunciados)"
        }
      ],
      "2026-12-15": [
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S6 (domingo 27 de diciembre)."
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 21 (el CHECKPOINT)"
        }
      ],
      "2026-12-16": [
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S6 (domingo 27 de diciembre)."
        },
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, esta semana: el miércoles 16 y el viernes 18);"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del lunes",
          "por": "10 tarjetas del martes 15"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del lunes",
          "por": "Reglas de los errores del martes 15"
        },
        {
          "frente": "encaps",
          "a": "lo usa la revisión del sábado 14:00.",
          "por": "lo usa la revisión del sábado 26 a las 14:00 (la del sábado 19 cierra la semana anterior)."
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 21 (el CHECKPOINT)"
        }
      ],
      "2026-12-17": [
        {
          "frente": "vibecoding",
          "a": "el paso pasa al bloque PC de la semana.",
          "por": "el paso pasa al SHIP S6 (domingo 27 de diciembre)."
        },
        {
          "frente": "usmle",
          "a": "o mañana a las 05:00",
          "por": "o mañana sábado en el Anki de las 21:30"
        },
        {
          "frente": "encaps",
          "a": "override del viernes",
          "por": "override que sale del mini-sim del lunes 21 (el CHECKPOINT)"
        },
        {
          "frente": "business",
          "a": "el tramo pasa al de mañana",
          "por": "el tramo pasa al del lunes 21, porque mañana sábado solo va el cierre del OUTPUT S5"
        },
        {
          "frente": "liviano",
          "a": "la lectura pasa a mañana.",
          "por": "la lectura pasa al lunes 21 (mañana sábado no hay LIVIANO)."
        }
      ],
      "2026-12-18": [
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, lo que queda de F1: el miércoles 23, el lunes 28 y el miércoles 30);"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del miércoles",
          "por": "10 tarjetas del jueves 17"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del miércoles",
          "por": "Reglas de los errores del jueves 17"
        },
        {
          "frente": "encaps",
          "a": "Normas de la semana (CI): TBC, ITS/VIH, ECNT (DM 2024, HTA) · 1 h 45′",
          "por": "Normas de la semana (CI): TBC, ITS/VIH (con la revisión normativa N°2 de Theomed «Prevención y control de las ITS», 30:39 + PDF: Campus › curso 116), ECNT (DM 2024, HTA) · 1 h 45′"
        },
        {
          "frente": "encaps",
          "a": "alerta si <15/25 dos viernes seguidos",
          "por": "alerta si <15/25 en dos mini-sims seguidos"
        },
        {
          "frente": "encaps",
          "a": "manda la regla de dos viernes seguidos",
          "por": "manda la regla de dos mini-sims seguidos"
        },
        {
          "frente": "encaps",
          "a": "★ para el lunes a las 05:30.",
          "por": "★ para mañana a las 05:30."
        },
        {
          "frente": "liviano",
          "a": "GLP-1 — VIERNES CASO 6/16",
          "por": "GLP-1 — CASO 6/16 (el del viernes de plan)"
        },
        {
          "frente": "mir",
          "a": "sin repasos: revisa las tarjetas de ayer.",
          "por": "sin repasos: revisa las tarjetas del viernes 18 (tu última sesión MIR)."
        }
      ],
      "2026-12-19": [
        {
          "frente": "revision",
          "a": "mini-sim /25 del viernes",
          "por": "mini-sim /25 del CHECKPOINT (el #30, del lunes 21)"
        },
        {
          "frente": "revision",
          "a": "simulacro del domingo",
          "por": "corrección del simulacro con RANKING del domingo 13 (la del domingo 20: % por área y errores repetidos) + banqueos N°10 y N°11 del domingo 20"
        },
        {
          "frente": "encaps",
          "a": "(el domingo o al empezar el banqueo del lunes 09:45)",
          "por": "(al empezar el banqueo del lunes 21 a las 09:45: mañana domingo el ENCAPS lo llenan los banqueos N°10 y N°11 y la corrección del simulacro)"
        },
        {
          "frente": "encaps",
          "a": "la grabación en el ENCAPS del domingo (tramos que el PPT no explica, a 1,75-2×) y el resto en audio.",
          "por": "la grabación en un hueco de la semana, porque mañana domingo el ENCAPS lo llenan los banqueos N°10 y N°11 y la corrección del simulacro (los tramos que el PPT no explica, a 1,75-2×, y el resto en audio)."
        },
        {
          "frente": "synapse",
          "a": "El SHIP del vibecoding es el domingo.",
          "por": "Mañana domingo va el SHIP S5 del vibecoding, pendiente por la semana corrida (el S6, el domingo 27)."
        }
      ],
      "2026-12-20": [
        {
          "frente": "vibecoding",
          "a": "journal de la semana",
          "por": "journal de la S6 (2026-W51)"
        },
        {
          "frente": "vibecoding",
          "a": "`node DATA/_scripts/journal_hoy.js --abrir` → cabecera «Criterios de aceptación» (4).",
          "por": "Abre D:/synapse-journal/journal/2026-W51.md, el de la S6 (hoy `journal_hoy.js --abrir` abre el de la S7) → cabecera «Criterios de aceptación» (4)."
        },
        {
          "frente": "vibecoding",
          "a": "Si todo está verde, el tiempo que sobra es libre (o haces el Feynman).",
          "por": "Si todo está verde, el tiempo que sobra lo adelantas al Feynman y al AVANCE S7, que van a continuación."
        },
        {
          "frente": "vibecoding",
          "a": "(la franja 15:00-17:00 es solo un ejemplo)",
          "por": "(hoy 07:25-09:25 es solo un ejemplo: es el SHIP S6, pendiente por la semana corrida, y va antes del AVANCE S7)"
        },
        {
          "frente": "vibecoding",
          "a": "(14:50-15:00 es solo un ejemplo)",
          "por": "(hoy 07:15-07:25 es solo un ejemplo)"
        },
        {
          "frente": "vibecoding",
          "a": "Sección «Cierre de semana» del journal.",
          "por": "Sección «Cierre de semana» del journal de la S6 (2026-W51)."
        },
        {
          "frente": "encaps",
          "a": "Va a la revisión del sábado 14:00.",
          "por": "Va a la revisión del sábado 26 a las 14:00."
        }
      ],
      "2026-12-21": [
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, lo que queda de F1: mañana miércoles 23, el lunes 28 y el miércoles 30);"
        },
        {
          "frente": "encaps",
          "a": "(y las ★ del viernes)",
          "por": "(y las ★ de ayer)"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del viernes",
          "por": "10 tarjetas de ayer (lunes 21)"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del viernes",
          "por": "Reglas de los errores de ayer (lunes 21)"
        },
        {
          "frente": "encaps",
          "a": "(y las del simulacro del domingo, si lo hiciste)",
          "por": "(y las de los banqueos N°10 y N°11 y de la corrección del simulacro con RANKING, del domingo 20)"
        },
        {
          "frente": "encaps",
          "a": "lo usa la revisión del sábado 14:00.",
          "por": "lo usa la revisión del sábado 2 de enero a las 14:00 (la del sábado 26 cierra la semana anterior)."
        },
        {
          "frente": "encaps",
          "a": "de los fallos del mini-sim del viernes",
          "por": "de los fallos del mini-sim #30 de ayer (lunes 21, el CHECKPOINT)"
        },
        {
          "frente": "encaps",
          "a": "Eval del lunes sin runner",
          "por": "Eval de hoy sin runner"
        },
        {
          "frente": "encaps",
          "a": "fallé en el mini-sim del viernes (te pego los enunciados)",
          "por": "fallé en el mini-sim #30 de ayer, lunes 21 (te pego los enunciados)"
        }
      ],
      "2026-12-23": [
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, lo que queda de F1: el lunes 28 y el miércoles 30);"
        },
        {
          "frente": "encaps",
          "a": "10 tarjetas del lunes",
          "por": "10 tarjetas del martes 22"
        },
        {
          "frente": "encaps",
          "a": "Reglas de los errores del lunes",
          "por": "Reglas de los errores del martes 22"
        },
        {
          "frente": "encaps",
          "a": "lo usa la revisión del sábado 14:00.",
          "por": "lo usa la revisión del sábado 2 de enero a las 14:00 (la del sábado 26 cierra la semana anterior)."
        },
        {
          "frente": "encaps",
          "a": "★ para mañana a las 05:30.",
          "por": "★ para el lunes 28 a las 05:30 (mañana viernes 25 es feriado)."
        },
        {
          "frente": "synapse",
          "a": "deja A para mañana.",
          "por": "deja A para el sábado 26 a las 21:00 (mañana viernes 25 es feriado)."
        },
        {
          "frente": "business",
          "a": "el tramo pasa al de mañana",
          "por": "el tramo pasa al del lunes 28, porque mañana viernes 25 es feriado y el sábado 26 solo va el cierre del OUTPUT S6"
        },
        {
          "frente": "liviano",
          "a": "la lectura pasa a mañana.",
          "por": "la lectura pasa al lunes 28 (mañana viernes 25 es feriado)."
        },
        {
          "frente": "mir",
          "a": "slot ✗ → tema caliente mañana.",
          "por": "slot ✗ → tema caliente el lunes 28 (mañana viernes 25 es feriado)."
        },
        {
          "frente": "mir",
          "a": "<60 % = tema caliente mañana",
          "por": "<60 % = tema caliente el lunes 28"
        }
      ],
      "2026-12-24": [
        {
          "frente": "usmle",
          "a": "(validación a los 2 días ·",
          "por": "(validación a los 5 días ·"
        },
        {
          "frente": "encaps",
          "a": "(y las ★ de ayer)",
          "por": "(y las ★ del jueves 24)"
        },
        {
          "frente": "encaps",
          "a": "5Q del código de AYER V-2",
          "por": "5Q del código del jueves 24 (V-2)"
        },
        {
          "frente": "encaps",
          "a": "rehechas desde tus fallos de ayer",
          "por": "rehechas desde tus fallos del jueves 24"
        },
        {
          "frente": "mir",
          "a": "sin repasos: revisa las tarjetas de ayer.",
          "por": "sin repasos: revisa las tarjetas del jueves 24 (tu última sesión MIR)."
        },
        {
          "frente": "synapse",
          "a": "El número de esta semana (sale los jueves)",
          "por": "El número más reciente (sale los jueves: hoy lunes, el de la semana pasada)"
        }
      ],
      "2026-12-26": [
        {
          "frente": "synapse",
          "a": "(gimnasio 08:30-14:00 · 14:00 revisión · 15:00-17:00 Theomed en vivo · baile 17:00-20:00)",
          "por": "(gimnasio 08:30-14:00 · 14:00 revisión · 14:30 cierre del OUTPUT · baile 17:00-20:00; hoy no hay clase en vivo)"
        },
        {
          "frente": "revision",
          "a": "mini-sim /25 del viernes",
          "por": "mini-sim /25: esta semana no hubo (el viernes 25 fue feriado; el #30 del CHECKPOINT ya entró en la S06)"
        },
        {
          "frente": "revision",
          "a": "simulacro del domingo",
          "por": "simulacro opcional del domingo 27 (si lo hiciste)"
        }
      ],
      "2026-12-27": [
        {
          "frente": "vibecoding",
          "a": "el proyecto termina el 2026-12-28 y su SHIP es el 2027-01-03.",
          "por": "el proyecto termina el martes 29 (con la semana corrida) y su SHIP es el domingo 3 de enero."
        },
        {
          "frente": "vibecoding",
          "a": "(la franja 15:00-17:00 es solo un ejemplo)",
          "por": "(hoy 09:40-11:40 es solo un ejemplo: va después del SHIP S6, pendiente)"
        },
        {
          "frente": "vibecoding",
          "a": "(14:50-15:00 es solo un ejemplo)",
          "por": "(hoy 09:30-09:40 es solo un ejemplo)"
        },
        {
          "frente": "encaps",
          "a": "(08:00-12:00 es solo un ejemplo)",
          "por": "(hoy, de 07:15 a 11:40, van el SHIP S6 y el AVANCE S7 y de 12:00 a 14:45 hay un compromiso personal: si te sobra energía, el hueco libre es de 14:45 a 16:45)"
        }
      ],
      "2026-12-28": [
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tiene mañana los mar · jue (con la semana corrida, lo que queda de F1: mañana miércoles 30, el último);"
        },
        {
          "frente": "encaps",
          "a": "lo usa la revisión del sábado 14:00.",
          "por": "lo usa la revisión del sábado 2 de enero a las 15:00 (la de las 14:00 cierra la semana anterior)."
        },
        {
          "frente": "encaps",
          "a": "= código de la sesión anterior (jue 24-dic; el vie 25-dic fue SKIP)",
          "por": "= código de ayer (lunes 28)"
        },
        {
          "frente": "encaps",
          "a": "Eval del lunes sin runner: en el mismo proyecto pide «5 preguntas nuevas sobre los conceptos que fallé en el mini-sim del viernes (te pego los enunciados), con otro escenario, sin repetir la pregunta».",
          "por": "Eval sin runner: 5Q de III-8 rehechas desde tus fallos de ayer, lunes 28 (mismo proyecto, otro escenario)."
        }
      ],
      "2026-12-29": [
        {
          "frente": "usmle",
          "a": "(validación a los 5 días ·",
          "por": "(validación a los 2 días ·"
        }
      ],
      "2026-12-30": [
        {
          "frente": "synapse",
          "a": "deja A para mañana.",
          "por": "deja A para el sábado 2 a las 21:00 (mañana viernes 1 es feriado)."
        },
        {
          "frente": "business",
          "a": "el tramo pasa al de mañana",
          "por": "el tramo pasa al del lunes 4 (mañana viernes 1 es feriado)"
        },
        {
          "frente": "liviano",
          "a": "la lectura pasa a mañana.",
          "por": "la lectura pasa al lunes 4 (mañana viernes 1 es feriado)."
        },
        {
          "frente": "usmle",
          "a": "en F1 el Step 1 tiene mañana solo los mar · jue;",
          "por": "en F1 el Step 1 tuvo mañana los mar · jue (con la semana corrida, esta semana el lunes 28 y el miércoles 30, el último);"
        },
        {
          "frente": "usmle",
          "a": "desde el jue 31-dic el Step 1 está en PAUSA con 0 nuevas (jue 31-dic y vie 1-ene SKIP;",
          "por": "desde mañana el Step 1 está en PAUSA con 0 nuevas (mañana, viernes 1 de enero, es feriado;"
        },
        {
          "frente": "encaps",
          "a": "SP 6/11 (lun 28) queda para la intensiva. Mañana jue 31 empieza la transición.",
          "por": "SP 6/11 (la clase en vivo del lunes 28) queda para la intensiva. Hoy cierras F1: mañana, viernes 1 de enero (feriado), empieza la transición."
        },
        {
          "frente": "encaps",
          "a": "lo usa la revisión del sábado 14:00.",
          "por": "lo usa la revisión del sábado 2 de enero a las 15:00."
        }
      ],
      "2027-01-02": [
        {
          "frente": "synapse",
          "a": "(gimnasio 08:30-14:00 · 14:00 revisión · 15:00-17:00 Theomed en vivo · baile 17:00-20:00); después, el Anki de las 21:30.",
          "por": "(gimnasio 08:30-14:00 · 14:00 y 15:00 revisiones · baile 17:00-20:00; hoy no hay clase en vivo)."
        },
        {
          "frente": "revision",
          "a": "mini-sim /25 del viernes",
          "por": "mini-sim /25: esta semana no hubo (el viernes 1 es feriado; el cierre fue el SIMULACRO del jueves 31)"
        },
        {
          "frente": "revision",
          "a": "simulacro del domingo",
          "por": "SIMULACRO DE CIERRE DE AÑO del jueves 31 (nota y errores repetidos)"
        }
      ]
    },
    "notas": {
      "2026-11-12": [
        "Hoy LIBRE (orden de hoy, jue 12: «última modificación: todo inicia mañana»). Mañana VIE 13 es el D1 COMPLETO (el plan del lun 9) desde las 04:15. Todo se corre un día: cada día hábil hace el plan del día hábil anterior, los fines de semana 14-15, 21-22 y 28-29 recuperan un día cada uno, y el último día de F1 (el simulacro de cierre de año) pasa del miércoles 30 al jueves 31-dic. Desde el lunes 4-ene, todo en su fecha."
      ],
      "2026-11-13": [
        "Hoy es el D1 de todo (el plan del lun 9, completo). Mañana sábado, antes del gimnasio, 4 bloques del plan del mar 10; el domingo 15, el UWSA1 (07:15 la preparación · 07:40-11:50 los 4 bloques; el vídeo largo y el peor escenario, el sábado a las 14:00).",
        "Hoy a las 16:00 Theomed abre su simulacro (ranking: cuenta el primer intento dentro de 89 h, hasta ≈ el martes 17 a las 09:00). Esta semana no tiene hueco fijo (el domingo 15 es el del UWSA1): si lo quieres para el ranking, el hueco lo decides tú.",
        "Theomed en vivo de hoy: 19:00 Banqueo 4/19 y 20:00 Gestión en Salud 1/6. Lo de las 19:30 o las 20:00 choca con el sueño de las 21:00: va en diferido (audio en tiempos muertos; el post-test, al terminar). El Banqueo de las 19:00, en vivo solo si te sobra energía tras la franja de las 18:00; si no, también en diferido."
      ],
      "2026-11-16": [
        "Theomed en vivo de hoy: 19:30 Investigación 2/4. Lo de las 19:30 o las 20:00 choca con el sueño de las 21:00: va en diferido (audio en tiempos muertos; el post-test, al terminar)."
      ],
      "2026-11-20": [
        "Theomed en vivo de hoy: 19:00 Banqueo 5/19 y 20:00 Gestión en Salud 2/6. Lo de las 19:30 o las 20:00 choca con el sueño de las 21:00: va en diferido (audio en tiempos muertos; el post-test, al terminar). El Banqueo de las 19:00, en vivo solo si te sobra energía tras la franja de las 18:00; si no, también en diferido.",
        "Esta semana Theomed no abre simulacro (son quincenales: el siguiente, el viernes 27)."
      ],
      "2026-11-23": [
        "Theomed en vivo de hoy: 19:30 Salud Pública 2/11. Lo de las 19:30 o las 20:00 choca con el sueño de las 21:00: va en diferido (audio en tiempos muertos; el post-test, al terminar)."
      ],
      "2026-11-27": [
        "Hoy a las 16:00 Theomed abre su simulacro (fecha proyectada por la cadencia quincenal: confírmala en el campus · ranking: cuenta el primer intento dentro de 89 h, hasta ≈ el martes 1 de diciembre a las 09:00). Esta semana no tiene hueco fijo (el domingo 29 es día de plan): si lo quieres para el ranking, el hueco lo decides tú.",
        "Theomed en vivo de hoy: 19:00 Banqueo 6/19 y 20:00 Investigación 3/4. Lo de las 19:30 o las 20:00 choca con el sueño de las 21:00: va en diferido (audio en tiempos muertos; el post-test, al terminar). El Banqueo de las 19:00, en vivo solo si te sobra energía tras la franja de las 18:00; si no, también en diferido."
      ],
      "2026-11-30": [
        "Theomed en vivo de hoy: 19:30 Investigación 4/4. Lo de las 19:30 o las 20:00 choca con el sueño de las 21:00: va en diferido (audio en tiempos muertos; el post-test, al terminar).",
        "AURUM: hoy va el D15, cierre de la Fase 1 (manifiesto + PITCH v1 final). El D14 (ritual diario del operador) no cupo el domingo 29: va el domingo 6-dic a las 12:15."
      ],
      "2026-12-04": [
        "Theomed en vivo de hoy: 19:00 Banqueo 7/19 y 20:00 Salud Pública 3/11. Lo de las 19:30 o las 20:00 choca con el sueño de las 21:00: va en diferido (audio en tiempos muertos; el post-test, al terminar). El Banqueo de las 19:00, en vivo solo si te sobra energía tras la franja de las 18:00; si no, también en diferido."
      ],
      "2026-12-07": [
        "Theomed en vivo de hoy: 19:30 Gestión en Salud 5/6. Lo de las 19:30 o las 20:00 choca con el sueño de las 21:00: va en diferido (audio en tiempos muertos; el post-test, al terminar)."
      ],
      "2026-12-11": [
        "Hoy a las 16:00 Theomed abre su simulacro (fecha proyectada por la cadencia quincenal: confírmala en el campus · ranking: cuenta el primer intento dentro de 89 h, hasta ≈ el martes 15 a las 09:00). Lo haces el domingo 13, de 14:45 a 16:45, de un tirón.",
        "Theomed en vivo de hoy: 19:00 Banqueo 8/19 y 20:00 Salud Pública 4/11. Lo de las 19:30 o las 20:00 choca con el sueño de las 21:00: va en diferido (audio en tiempos muertos; el post-test, al terminar). El Banqueo de las 19:00, en vivo solo si te sobra energía tras la franja de las 18:00; si no, también en diferido."
      ],
      "2026-12-14": [
        "Theomed en vivo de hoy: 19:30 Salud Pública 5/11. Lo de las 19:30 o las 20:00 choca con el sueño de las 21:00: va en diferido (audio en tiempos muertos; el post-test, al terminar)."
      ],
      "2026-12-18": [
        "Theomed en vivo de hoy: 19:00 Banqueo 9/19 y 20:00 Gestión en Salud 6/6. Lo de las 19:30 o las 20:00 choca con el sueño de las 21:00: va en diferido (audio en tiempos muertos; el post-test, al terminar). El Banqueo de las 19:00, en vivo solo si te sobra energía tras la franja de las 18:00; si no, también en diferido."
      ],
      "2026-12-21": [
        "Theomed en vivo de hoy: 19:30 Cuidado Integral 4/8. Lo de las 19:30 o las 20:00 choca con el sueño de las 21:00: va en diferido (audio en tiempos muertos; el post-test, al terminar).",
        "Hoy, a las 16:15, el CHECKPOINT del año (el del viernes 18 de plan): el GATE lo decides HOY al cerrarlo, con la nota del simulacro del domingo 13 y el % ciego de los críticos."
      ],
      "2026-12-28": [
        "Theomed en vivo de hoy: 19:30 Salud Pública 6/11. Lo de las 19:30 o las 20:00 choca con el sueño de las 21:00: va en diferido (audio en tiempos muertos; el post-test, al terminar)."
      ],
      "2026-12-31": [
        "Hoy va el último día de F1 (el plan del miércoles 30): la mañana ENCAPS 22/22 es el SIMULACRO DE CIERRE DE AÑO. El 31, que en el plan era día sin sesión, pasa a ser día de estudio por el corrimiento de un día; termina a las 18:45 y la noche es libre. El 1-ene sigue libre y el lunes 4 arranca la intensiva en su fecha."
      ]
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
  ultimoDiaEstudio: "2027-12-03",
  /** ritual de test-day = último día de plan < E−1 */
  ritual: "2027-12-04",
  viajeD1: "2027-12-05",
  gonogo: "2027-10-18",
  convocatoriaTope: "2027-02-17",
  /** fecha a RESERVAR (FSMB/Prometric) con el ENCAPS vigente — DJ-1 */
  reserva: "2027-12-06",
  semanasF1: 8,
  step1Semanas: 46,
  diasF1: 37, diasF2: 50, diasF3: 32, diasF4: 186,
  /** v6.07: filas del tramo 1 del Step 1 = hábiles de F1 en step1.f1_dias_semana (mar · jue) */
  diasStepF1: 15,
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
  {"id":"F1","nombre":"Step 1 tramo 1 los mar · jue (07:15-12:00 + 18:00; Anki 05:00 todos los días) + ENCAPS las demás mañanas y la 16:15","etiqueta":"F1 · STEP 1 TRAMO 1 (D1-D15, mar · jue)","desde":"2026-11-09","hasta":"2026-12-30","ultimoDiaPlan":"2026-12-30","diasPlan":37,"diasSemana":"L-V","provisional":false},
  {"id":"TRANSICION","nombre":"Transición sin sesión (Anki opcional)","etiqueta":"TRANSICIÓN","desde":"2026-12-31","hasta":"2027-01-03","ultimoDiaPlan":null,"diasPlan":0,"diasSemana":null,"provisional":false},
  {"id":"F2","nombre":"ENCAPS intensiva (≈32 h/sem) + Step 1 en mantenimiento (Anki 30' L-V + sáb 07:45 20Q)","etiqueta":"F2 · ENCAPS INTENSIVA (examen dom 14-mar PROVISIONAL)","desde":"2027-01-04","hasta":"2027-03-14","ultimoDiaPlan":"2027-03-12","diasPlan":50,"diasSemana":"L-V","provisional":true},
  {"id":"LIBRE_POST_ENCAPS","nombre":"Lunes libre post-ENCAPS (protegido, DJ-2)","etiqueta":"LIBRE post-ENCAPS","desde":"2027-03-15","hasta":"2027-03-15","ultimoDiaPlan":null,"diasPlan":0,"diasSemana":null,"provisional":true},
  {"id":"F3","nombre":"Step 1 tiempo completo 7h15 (F1 + 16:15 REENTRADA)","etiqueta":"F3 · STEP 1 TIEMPO COMPLETO","desde":"2027-03-16","hasta":"2027-05-02","ultimoDiaPlan":"2027-04-30","diasPlan":32,"diasSemana":"L-V","provisional":true},
  {"id":"F4","nombre":"SERUMS 6 h (turno M/T variable) + Step 1 por plantilla de turno · L-S, domingo libre","etiqueta":"F4 · STEP 1 + SERUMS","desde":"2027-05-03","hasta":"2027-12-04","ultimoDiaPlan":"2027-12-04","diasPlan":186,"diasSemana":"L-S","provisional":true},
  {"id":"EXAMEN","nombre":"D-1 viaje a Lima + EXAMEN Step 1","etiqueta":"EXAMEN STEP 1","desde":"2027-12-05","hasta":"2027-12-06","ultimoDiaPlan":null,"diasPlan":0,"diasSemana":null,"provisional":true},
  {"id":"F5","nombre":"Post-Step 1 (esbozo): MIR principal hasta el fin del SERUMS (~abr-2028)","etiqueta":"F5 · post-Step 1","desde":"2027-12-07","hasta":null,"ultimoDiaPlan":null,"diasPlan":0,"diasSemana":null,"provisional":true},
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
/** DJ-1 (Joseph): fecha a RESERVAR por fecha del ENCAPS — todos los escenarios ENCAPS → lun 6-dic-2027 (DJ-1 v6.04: examen lun 6-dic por decisión de Joseph; v6.00-v6.03: ≤ 21-mar → mar 31-ago · ≤ 11-abr → lun 27-sep · después → lun 25-oct). */
export const DJ1_V6: { encapsHasta: string | null; examen: string }[] = [{"encapsHasta":null,"examen":"2027-12-06"}];
export function reservaDJ1(encaps: string = FECHAS_V6.encaps.examen): string {
  for (const x of DJ1_V6) if (x.encapsHasta === null || encaps <= x.encapsHasta) return x.examen;
  return FECHAS_V6.step1.planB; // inalcanzable: la última fila de DJ-1 no tiene tope
}
/** Fecha a RESERVAR guardada en el JSON (validada = DJ-1, o la regla de cálculo si fue más tardía) o, si el escenario no está, DJ-1. */
export function reservaStep1(encaps: string = FECHAS_V6.encaps.examen): string { return FECHAS_V6.step1.reserva_por_encaps[encaps] ?? reservaDJ1(encaps); }
/** STEP1_SEMANAS de un escenario = SEMANAS_F1 (8, derivado de f1.inicio → f1.fin; v6.00: 13) + semanas(lunes del reinicio → lunes del examen). */
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
  // v6.07: en F1 el Step 1 solo tiene fila los días de step1.f1_dias_semana (mar · jue)
  if (plan === 'usmle') return !enPausaStep1(iso) && iso <= FECHAS_V6.step1.ritual && (iso > FECHAS_V6.f1.fin || FECHAS_V6.step1.f1_dias_semana.includes(_wd(iso)));
  if (plan === 'encaps') return iso < FECHAS_V6.encaps.examen;
  return true;
}
/** v6.07 · ¿tiene el Step 1 mañana de plan en F1 este día de la semana? (step1.f1_dias_semana; fuera de F1, siempre true) */
export function esDiaStepF1(iso: string): boolean { return iso < FECHAS_V6.f1.inicio || iso > FECHAS_V6.f1.fin || FECHAS_V6.step1.f1_dias_semana.includes(_wd(iso)); }
/** Fase v6 de una fecha. Antes del D1 (≤ dom 8-nov-2026) devuelve 'F1' (la app ya muestra F1 la víspera). */
export function faseV6(iso: string): FaseV6 {
  if (iso < FECHAS_V6.f1.inicio) return 'F1';
  for (const x of FASES_V6) if (iso >= x.desde && (x.hasta === null || iso <= x.hasta)) return x.id;
  return 'F5';
}
export function faseV6Info(iso: string): FaseV6Info { const id = faseV6(iso); return FASES_V6.find((x) => x.id === id) ?? (FASES_V6[0] as FaseV6Info); }

// ── semana del Step 1 (definición única; antes en homeBriefing — §F, r2 · I7) ──
/** Semanas de F1 (S1 = semana del lun 9-nov → S8 = semana del lun 28-dic). */
export const SEMANAS_F1 = 8;
/** 46 = 8 (F1) + semanas(lunes del reinicio lun 15-mar → lunes del examen lun 6-dic); la semana del examen queda fuera (etiqueta 'examen'). */
export const STEP1_SEMANAS = 46;
export interface SemanaStep1 {
  /** 0 = antes del D1 · 1-8 = F1 · 8 durante la PAUSA (no avanza) · 9-STEP1_SEMANAS = tramo 2 · STEP1_SEMANAS + 1 = semana del examen */
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
 * Semana del Step 1 (lunes→domingo; determinista, sin reloj): S1-S8 = F1 · pausa (lun 4-ene → semana del ENCAPS) →
 * { pausa: true } · desde la semana del reinicio 8 + k · semana del examen → { examen: true }.
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

// ── v6.07e: semana 1 corrida (orden de Joseph del jue 12-nov-2026) ──
/** Parte de un día de reparto: bloques de la plantilla de la fecha de plan «de» (id de bloque de plantillasV6 → desfase en minutos). */
export interface ParteCorridaS1 { de: string; bloques: Record<string, number> }
export type CorridaS1 =
  | { tipo: 'sin_sesion' }
  | { tipo: 'alias'; de: string }
  | { tipo: 'reparto'; de: string; partes: ParteCorridaS1[]; titulo?: string; nota?: string };
/**
 * Semana corrida: lun 19-oct · mar 20-oct · mié 21-oct · jue 22-oct · vie 23-oct · sáb 24-oct · dom 25-oct · lun 26-oct · mar 27-oct · mié 28-oct · jue 29-oct · vie 30-oct · sáb 31-oct · dom 1-nov · lun 2-nov · mar 3-nov · mié 4-nov · jue 5-nov · vie 6-nov · sáb 7-nov · dom 8-nov · lun 9-nov · mar 10-nov · mié 11-nov · jue 12-nov sin sesión · vie 13-nov = plan del lun 9-nov · lun 16-nov = plan del mié 11-nov · mar 17-nov = plan del jue 12-nov · mié 18-nov = plan del vie 13-nov · jue 19-nov = plan del lun 16-nov · vie 20-nov = plan del mar 17-nov · lun 23-nov = plan del jue 19-nov · mar 24-nov = plan del vie 20-nov · mié 25-nov = plan del lun 23-nov · jue 26-nov = plan del mar 24-nov · vie 27-nov = plan del mié 25-nov · lun 30-nov = plan del vie 27-nov · mar 1-dic = plan del lun 30-nov · mié 2-dic = plan del mar 1-dic · jue 3-dic = plan del mié 2-dic · vie 4-dic = plan del jue 3-dic · lun 7-dic = plan del vie 4-dic · mar 8-dic = plan del lun 7-dic · mié 9-dic = plan del mar 8-dic · jue 10-dic = plan del mié 9-dic · vie 11-dic = plan del jue 10-dic · lun 14-dic = plan del vie 11-dic · mar 15-dic = plan del lun 14-dic · mié 16-dic = plan del mar 15-dic · jue 17-dic = plan del mié 16-dic · vie 18-dic = plan del jue 17-dic · lun 21-dic = plan del vie 18-dic · mar 22-dic = plan del lun 21-dic · mié 23-dic = plan del mar 22-dic · jue 24-dic = plan del mié 23-dic · lun 28-dic = plan del jue 24-dic · mar 29-dic = plan del lun 28-dic · mié 30-dic = plan del mar 29-dic · jue 31-dic = plan del mié 30-dic · sáb 14-nov = vibe+syn+biz+liv del mar 10-nov / theomed-prep+theomed-vivo+syn+anki-sab del sáb 14-nov · dom 15-nov = anki+usmle+eval+rd+aurum+mir+encaps del mar 10-nov · sáb 21-nov = vibe+syn+biz+liv del mié 18-nov / revision+biz del sáb 14-nov / theomed-prep+theomed-vivo+syn+anki-sab del sáb 21-nov · dom 22-nov = anki+encaps-am+encaps-pm+rd+aurum+mir+encaps del mié 18-nov · sáb 28-nov = vibe+syn+biz+liv del jue 26-nov / revision+biz del sáb 21-nov / theomed-prep+theomed-vivo+syn+anki-sab del sáb 28-nov · dom 29-nov = anki+usmle+rd+encaps+eval del jue 26-nov · sáb 5-dic = revision+biz del sáb 28-nov / theomed-prep+theomed-vivo+syn+anki-sab del sáb 5-dic · dom 6-dic = pc+feynman del dom 15-nov / pc+feynman del dom 22-nov / aurum+mir del jue 26-nov / anki-dom+encaps-dom del dom 6-dic · sáb 12-dic = revision+biz del sáb 5-dic / theomed-prep+theomed-vivo+syn+anki-sab del sáb 12-dic · dom 13-dic = pc+feynman del dom 29-nov / pc+feynman del dom 6-dic / anki-dom+encaps-dom del dom 13-dic · sáb 19-dic = revision+biz del sáb 12-dic / theomed-prep+theomed-vivo+syn+anki-sab del sáb 19-dic · dom 20-dic = pc+feynman del dom 13-dic / anki-dom+encaps-dom del dom 20-dic · sáb 26-dic = revision+biz del sáb 19-dic / syn+anki-sab del sáb 26-dic · dom 27-dic = pc+feynman del dom 20-dic / anki-dom+encaps-dom+pc+feynman del dom 27-dic · sáb 2-ene = revision del sáb 26-dic / syn+revision del sáb 2-ene.
 * null fuera de esos días: el resto del calendario es idéntico (los planes, Supabase, runners y guías conservan su fecha de plan).
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
  usmle: ['anki', 'usmle', 'eval', 'anki-sab', 'anki-dom'], mir: ['mir'], encaps: ['encaps', 'encaps-am', 'encaps-pm', 'encaps-dom', 'theomed-prep', 'theomed-vivo'], 'research-derma': ['rd'], aurum: ['aurum'],
  liviano: ['liv'], synapse: ['syn', 'pc', 'feynman'], vibecoding: ['vibe', 'pc', 'feynman'], business: ['biz'], revision: ['revision'],
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
  for (const [r, de] of Object.entries(c.alias)) if (de === plan) return r;
  const ids = frente ? (BLOQUES_POR_FRENTE[frente] ?? []) : null;
  // v6.07a: primero la parte que lleva el bloque PRINCIPAL del frente (vie 13 ENCAPS → el dom 15 de la sesión de las 16:15, no el sáb 14 de la mañana)
  const pri = frente ? (PRINCIPAL_POR_FRENTE[frente] ?? []) : [];
  if (pri.length) for (const [r, x] of Object.entries(c.reparto)) for (const p of x.partes) if (p.de === plan && Object.keys(p.bloques).some((id) => pri.includes(id))) return r;
  for (const [r, x] of Object.entries(c.reparto)) for (const p of x.partes) if (p.de === plan && (!ids || Object.keys(p.bloques).some((id) => ids.includes(id)))) return r;
  // v6.06e: la guía de un frente que cita un sábado cuyo bloque es de otro frente (p. ej. la revisión desde USMLE): vale cualquier parte de esa fecha
  if (ids) for (const [r, x] of Object.entries(c.reparto)) if (x.partes.some((p) => p.de === plan)) return r;
  return plan;
}
