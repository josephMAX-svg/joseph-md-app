/**
 * mirGuiaDatos.ts — DATOS de la guía MIR «qué · cuánto · cómo» (la lógica y la regla D11+ / banqueo están en src/lib/mirGuia.ts).
 * GENERADO por DATA/MIR/guia_lectura/gen_mir_guia.js — NO editar a mano:
 *   node DATA/MIR/guia_lectura/gen_mir_guia.js            (escribe) · --check (compara + valida todos los días)
 * Fuente: DATA/MIR/guia_lectura_semana1-2.json (E2, medición real de cada capítulo ProMIR el 18-oct-2026: palabras deduplicadas, secciones,
 * figuras, clips y preguntas MIR citadas) · nº de preguntas del pool oficial por capítulo/asignatura (mirPreguntasOficiales).
 * D1-D10 medidos (lun 19-oct → vie 30-oct-2026). Las ids de pregunta son las de ProMIR (/pregunta/MIR/AAAA-NNN = «MIR AAAA-AAAA+1, Pnnn»);
 * `pool` = id del pool de la app (año del examen = ProMIR + 1) cuando la pregunta viene de ahí (manda la lista del pool de la app si difiere).
 * v6.02c (18-oct-2026, E3): nuevo.
 */
import type { GuiaBloque } from './guia';

export interface MirGuiaQ { id: string; url: string; seccion?: string | null; pool?: string }
export interface MirGuiaEvalSlot { slot: string; d: number; tema: string; qs: MirGuiaQ[] }
export interface MirGuiaPreguntas { extra?: MirGuiaQ[]; eval?: MirGuiaEvalSlot[]; cierre?: MirGuiaQ[]; pretest: MirGuiaQ[]; quiz: MirGuiaQ[] }
export interface MirGuiaMedida {
  d: number; fecha: string; capId: string; bloque: GuiaBloque; preguntas: MirGuiaPreguntas;
  /** minutos de la lectura 15′ usados · lectura completa del capítulo · lo que queda para la 2.ª vuelta (medido) */
  lectura: { minUsados: number | null; minCapitulo: number | null; paraLa2aVuelta: number | null };
}

export const MIR_GUIA_DATOS_META = {
 "version": "v6.02c",
 "generado": "2026-10-18",
 "fuente": "DATA/MIR/guia_lectura_semana1-2.json (E2 · medición ProMIR 18-oct-2026) + mirDailyPlan + mirPreguntasOficiales",
 "medidos": [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10
 ],
 "ritmo": "180 palabras/min el texto (lectura de estudio en español, comprensiva) · 90 palabras/min las tablas · 0.5′ por figura · clips ≤12 min por su duración. A 150 palabras/min multiplica los minutos por 1,2.",
 "lectura15": "Franja 15:38–15:53: 1′ de recuadro «Orientación MIR» + secciones por peso hasta llenar 14′ (enteras; si la de más peso no cabe, se lee PARCIAL: solo los párrafos con chip MIR ≥2015). Las secciones de las preguntas FALLADAS en el pre-test van primero; las de las acertadas se saltan y entra la reserva. Lo que no entra queda para la 2.ª vuelta (fase principal, oct-2027).",
 "preguntas": "Pre-test = pool oficial de la app (mirPreguntasOficiales, MIR 2022-2026, ids = año del EXAMEN); si hay menos de 5, se completa con citadas ProMIR ≥2015. Quiz 8-10Q, evals ancladas de los días siguientes = preguntas citadas en las secciones LEÍDAS (más recientes primero), sin repetir ninguna. Equivalencia de ids: pool 2024-050 = ProMIR /pregunta/MIR/2023-050 («MIR 2023-2024, P050»), verificada el 18-oct en 3 preguntas. Cierres de asignatura = pool de la app sin usar.",
 "noVerificado": [
  "Duración del audio «escuchar todo el tema» (no se reprodujo).",
  "Nº de preguntas de los tests de «Entrenar» por capítulo: ver ese recuento exige abrir el creador de tests; no se tocó. La guía usa el pool de la app + las citadas en el capítulo, que sí están contadas.",
  "Comentario de cada pregunta: la página /pregunta/MIR/… muestra enunciado y opciones; el comentario aparece al responder (no se respondió ninguna)."
 ]
};

export const MIR_GUIA_MEDIDA: Record<number, MirGuiaMedida> = {
 "1": {
  "d": 1,
  "fecha": "2026-10-19",
  "capId": "570779c9f4d68bf008dbc7b1",
  "bloque": {
   "franja": "15:15–16:15",
   "plan": "mir",
   "titulo": "MIR D1/78 · Epidemiología — Estudios experimentales: Ensayo clínico",
   "totalMin": 60,
   "pasos": [
    {
     "min": 5,
     "que": "15:15–15:20 · ARRANQUE (D1 no tiene anclas) · Anki: crear el mazo APEX::MIR::epidemiologia",
     "como": "Preset FSRS de APEX::MIR (retention 0,85; DATA/MIR/README.md §5). Sin tarjetas nuevas todavía: las crean los APEX de las 16:05."
    },
    {
     "min": 3,
     "que": "15:20–15:23 · Recuadro «Orientación MIR» del capítulo + mapa de secciones (sin leer el texto)",
     "como": "Lee solo el recuadro y recorre los títulos: las secciones marcadas en «Lectura 15′» son las que concentran las preguntas MIR citadas.",
     "enlace": {
      "t": "Capítulo ProMIR",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc7b1"
     }
    },
    {
     "min": 7,
     "que": "15:23–15:30 · 5Q CIEGAS extra · preguntas MIR ≥2015 citadas en el capítulo (2021-045 · 2020-048 · 2019-053 · 2018-116 · 2017-228)",
     "como": "Abre cada enlace (ProMIR → pregunta: el botón de este paso = la 1.ª; las 5 están en los recursos de la tarjeta), responde SIN leer, 77 s/Q, en blanco si no descartas 2 · apunta acierto/fallo: cada fallo marca la sección a leer en la lectura dirigida.",
     "enlace": {
      "t": "1.ª de 5 · MIR 2021-045",
      "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-045"
     }
    },
    {
     "min": 8,
     "que": "15:30–15:38 · PRE-TEST 5Q ciegas del capítulo nuevo (5 del pool oficial de la app)",
     "como": "Sin leer nada · 77 s/Q · registra en la app (kind pretest) · cada fallo = una sección «gap» (la guía dice en qué sección cae cada pregunta)."
    },
    {
     "min": 15,
     "que": "15:38–15:53 · LECTURA DIRIGIDA 15′ · Orientación MIR (1′) + 2. Definición de ensayo clínico (1.5′ · 8 preguntas MIR citadas) · 3.2. Fase II (1′ · 7 preguntas MIR citadas) · 3.4. Fase IV (1.5′ · 3 preguntas MIR citadas) · 4. Tipos de ensayos clínicos (1.5′ · 6 preguntas MIR citadas) · 6.1. Aleatorización (3.5′ · 15 preguntas MIR citadas) · 6.2. Análisis por intención de tratar. Análisis por protocolo (2.5′ · 4 preguntas MIR citadas) · 8.4. Ensayo de no inferioridad (2′ · 6 preguntas MIR citadas)",
     "como": "Orden: primero la sección de cada pregunta FALLADA en el pre-test; las secciones cuyas preguntas acertaste se saltan y entra la reserva (3.1. Fase I 0.5′ · 3.3. Fase III 1.5′ · 9.3. Selección de los sujetos 2′). Whole Page Rule: lee el apartado entero, no frases sueltas; por cada fallo escribe en el Shopping List la regla que lo habría resuelto. Ritmo de referencia 180 palabras/min. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.",
     "enlace": {
      "t": "ProMIR · Estudios experimentales: Ensayo clínico",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc7b1"
     }
    },
    {
     "min": 12,
     "que": "15:53–16:05 · 8Q comentadas (máx. 10) · preguntas MIR citadas en las secciones que acabas de leer",
     "como": "Rule-In → Rule-Out · tapa las opciones y contesta antes de verlas · 77 s/Q + lee el comentario · registra en la app (kind quiz): <60 % = tema caliente mañana · orden: el de la lista (pool de la app primero, luego las citadas, más recientes primero); a las 16:05 paras donde estés. Pool oficial de la app para este capítulo: 5Q (todas en el pre-test) → el quiz sale de las 97 preguntas MIR citadas en el capítulo."
    },
    {
     "min": 10,
     "que": "16:05–16:15 · ≤4 APEX en APEX::MIR::epidemiologia",
     "como": "Desde el Shopping List: pregunta SAQ + por qué + 🇪🇸 delta si aplica + tag sys:: del sistema USMLE · 1 de cada 4 con imagen · creados directamente en Anki."
    }
   ],
   "recursos": [
    {
     "t": "ProMIR · Estudios experimentales: Ensayo clínico (capítulo completo)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc7b1",
     "min": 49.5,
     "cantidad": "7411 palabras de texto + 343 en tablas · 31 secciones · 7 figuras · 4 tablas · audio «escuchar todo el tema» (duración no medida)"
    },
    {
     "t": "Preguntas MIR citadas en el capítulo (chips «MIR AAAA-AAAA, Pnnn» → /pregunta/MIR/…)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc7b1",
     "cantidad": "97 (≥2015: 19 · ≥2020: 6)"
    },
    {
     "t": "Pool oficial de la app (MIR 2022-2026) de este capítulo",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc7b1",
     "cantidad": "5Q (2022-046 · 2023-052 · 2024-049 · 2024-050 · 2025-041)"
    },
    {
     "t": "5Q ciegas extra 1/5 · MIR 2021-045",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-045"
    },
    {
     "t": "5Q ciegas extra 2/5 · MIR 2020-048",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2020-048"
    },
    {
     "t": "5Q ciegas extra 3/5 · MIR 2019-053",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2019-053"
    },
    {
     "t": "5Q ciegas extra 4/5 · MIR 2018-116",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2018-116"
    },
    {
     "t": "5Q ciegas extra 5/5 · MIR 2017-228",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2017-228"
    },
    {
     "t": "Vídeo resumen de Epidemiología (asignatura entera) — NO entra en la franja (>12 min)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc7b1",
     "min": 36
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 6-1 · Masterclass: Tipo de ensayos clínicos. (1:12:21)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc7b1"
    }
   ],
   "hecho": "Mazo creado + 5Q ciegas extra + pre-test 5Q registrado + lectura de las secciones gap (o de la lista) + ≥8Q del quiz registradas + ≤4 APEX creados.",
   "planB": "Si ProMIR no abre: pre-test y quiz con el pool oficial de la app (pestaña MIR → registro: 5Q del capítulo + 25 de Epidemiología) y lectura en la nota madre de Obsidian (◆ Obsidian) o en el resumen de rabi_94 (Drive). Día roto (modo mínimo): Anki a cero + 4Q ancladas (15′)."
  },
  "preguntas": {
   "pretest": [
    {
     "id": "2021-046",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-046",
     "seccion": null,
     "pool": "2022-046"
    },
    {
     "id": "2022-052",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-052",
     "seccion": "2. Definición de ensayo clínico",
     "pool": "2023-052"
    },
    {
     "id": "2023-049",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-049",
     "seccion": "3.4. Fase IV",
     "pool": "2024-049"
    },
    {
     "id": "2023-050",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-050",
     "seccion": "3.2. Fase II",
     "pool": "2024-050"
    },
    {
     "id": "2024-041",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-041",
     "seccion": null,
     "pool": "2025-041"
    }
   ],
   "quiz": [
    {
     "id": "2017-210",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2017-210",
     "seccion": "6.1. Aleatorización"
    },
    {
     "id": "2017-209",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2017-209",
     "seccion": "2. Definición de ensayo clínico"
    },
    {
     "id": "2017-025",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2017-025",
     "seccion": "8.4. Ensayo de no inferioridad"
    },
    {
     "id": "2016-119",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2016-119",
     "seccion": "3.4. Fase IV"
    },
    {
     "id": "2016-117",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2016-117",
     "seccion": "6.1. Aleatorización"
    },
    {
     "id": "2015-190",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2015-190",
     "seccion": "8.4. Ensayo de no inferioridad"
    },
    {
     "id": "2015-038",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2015-038",
     "seccion": "4. Tipos de ensayos clínicos"
    },
    {
     "id": "2015-029",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2015-029",
     "seccion": "8.4. Ensayo de no inferioridad"
    },
    {
     "id": "2014-208",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2014-208",
     "seccion": "4. Tipos de ensayos clínicos"
    },
    {
     "id": "2014-196",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2014-196",
     "seccion": "6.1. Aleatorización"
    }
   ],
   "extra": [
    {
     "id": "2021-045",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-045",
     "seccion": "6.2. Análisis por intención de tratar. Análisis por protocolo"
    },
    {
     "id": "2020-048",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2020-048",
     "seccion": "3.2. Fase II"
    },
    {
     "id": "2019-053",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2019-053",
     "seccion": "9. Aspectos legales y éticos de los ensayos clínicos en España"
    },
    {
     "id": "2018-116",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2018-116",
     "seccion": "6.1. Aleatorización"
    },
    {
     "id": "2017-228",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2017-228",
     "seccion": "6.1. Aleatorización"
    }
   ]
  },
  "lectura": {
   "minUsados": 14.5,
   "minCapitulo": 49.5,
   "paraLa2aVuelta": 36
  }
 },
 "2": {
  "d": 2,
  "fecha": "2026-10-20",
  "capId": "570779c9f4d68bf008dbc80d",
  "bloque": {
   "franja": "15:15–16:15",
   "plan": "mir",
   "titulo": "MIR D2/78 · Epidemiología — Clasificación de los estudios de investigación (Tipos de estudios epidemiológicos)",
   "totalMin": 60,
   "pasos": [
    {
     "min": 7,
     "que": "15:15–15:22 · EVAL ANCLADA 2Q · 2Q D-1 (D1 Estudios experimentales: Ensayo clínico)",
     "como": "Cronómetro 3′ (77 s/Q), en blanco si no descartas 2 · preguntas: las listadas (citadas ProMIR de lo que leíste ese día, no usadas) · hoy solo hay 2Q (no existen D-3/D-7 todavía): los 4′ que sobran, adelanta el Anki · si la app te propone un tema 🔥 caliente (gate), manda la app."
    },
    {
     "min": 5,
     "que": "15:22–15:27 · Anki APEX::MIR::epidemiologia",
     "como": "FSRS · solo Good/Again · deuda a cero; si no hay repasos, revisa las tarjetas de ayer."
    },
    {
     "min": 3,
     "que": "15:27–15:30 · Log de la eval en la app",
     "como": "aciertos/4 · brecha knowledge / transfer / proceso · fallo D-7 → cola D+14 · slot ✗ → tema caliente mañana."
    },
    {
     "min": 8,
     "que": "15:30–15:38 · PRE-TEST 5Q ciegas del capítulo nuevo (5 del pool oficial de la app)",
     "como": "Sin leer nada · 77 s/Q · registra en la app (kind pretest) · cada fallo = una sección «gap» (la guía dice en qué sección cae cada pregunta)."
    },
    {
     "min": 15,
     "que": "15:38–15:53 · LECTURA DIRIGIDA 15′ · Orientación MIR (1′) + 1.1. Descripción de un caso o series de casos (1′ · 1 preguntas MIR citadas) · 1.2. Estudios descriptivos de prevalencia (0.5′ · 3 preguntas MIR citadas) · 1.3. Estudios ecológicos (1.5′ · 8 preguntas MIR citadas) · 2.1. Estudios de corte transversal o de prevalencia (1.5′ · 5 preguntas MIR citadas) · 2.2. Estudios de casos y controles (3.5′ · 22 preguntas MIR citadas) · 2.3. Estudios de cohortes (3′ · 19 preguntas MIR citadas) · 2.4. Estudios de casos y controles anidados en una cohorte (1.5′ · 4 preguntas MIR citadas)",
     "como": "Orden: primero la sección de cada pregunta FALLADA en el pre-test; las secciones cuyas preguntas acertaste se saltan y entra la reserva (—). Whole Page Rule: lee el apartado entero, no frases sueltas; por cada fallo escribe en el Shopping List la regla que lo habría resuelto. Ritmo de referencia 180 palabras/min. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.",
     "enlace": {
      "t": "ProMIR · Clasificación de los estudios de investigación (Tipos de estudios epidemiológicos)",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc80d"
     }
    },
    {
     "min": 12,
     "que": "15:53–16:05 · 8Q comentadas (máx. 10) · preguntas MIR citadas en las secciones que acabas de leer",
     "como": "Rule-In → Rule-Out · tapa las opciones y contesta antes de verlas · 77 s/Q + lee el comentario · registra en la app (kind quiz): <60 % = tema caliente mañana · orden: el de la lista (pool de la app primero, luego las citadas, más recientes primero); a las 16:05 paras donde estés. Pool oficial de la app para este capítulo: 5Q (todas en el pre-test) → el quiz sale de las 63 preguntas MIR citadas en el capítulo."
    },
    {
     "min": 10,
     "que": "16:05–16:15 · ≤4 APEX en APEX::MIR::epidemiologia",
     "como": "Desde el Shopping List: pregunta SAQ + por qué + 🇪🇸 delta si aplica + tag sys:: del sistema USMLE · 1 de cada 4 con imagen · creados directamente en Anki."
    }
   ],
   "recursos": [
    {
     "t": "ProMIR · Clasificación de los estudios de investigación (Tipos de estudios epidemiológicos) (capítulo completo)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc80d",
     "min": 14.5,
     "cantidad": "2039 palabras de texto + 0 en tablas · 9 secciones · 5 figuras · 0 tablas · audio «escuchar todo el tema» (duración no medida)"
    },
    {
     "t": "Preguntas MIR citadas en el capítulo (chips «MIR AAAA-AAAA, Pnnn» → /pregunta/MIR/…)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc80d",
     "cantidad": "63 (≥2015: 22 · ≥2020: 8)"
    },
    {
     "t": "Pool oficial de la app (MIR 2022-2026) de este capítulo",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc80d",
     "cantidad": "5Q (2022-041 · 2022-048 · 2023-043 · 2024-044 · 2024-047)"
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 2-1 · Imperdible: Estudios epidemiológicos. (15:27)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc80d"
    }
   ],
   "hecho": "Eval registrada + Anki a cero + pre-test 5Q registrado + lectura de las secciones gap (o de la lista) + ≥8Q del quiz registradas + ≤4 APEX creados.",
   "planB": "Si ProMIR no abre: pre-test y quiz con el pool oficial de la app (pestaña MIR → registro: 5Q del capítulo + 25 de Epidemiología) y lectura en la nota madre de Obsidian (◆ Obsidian) o en el resumen de rabi_94 (Drive). Día roto (modo mínimo): Anki a cero + 4Q ancladas (15′)."
  },
  "preguntas": {
   "pretest": [
    {
     "id": "2021-041",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-041",
     "seccion": "1.3. Estudios ecológicos",
     "pool": "2022-041"
    },
    {
     "id": "2021-048",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-048",
     "seccion": "2.3. Estudios de cohortes",
     "pool": "2022-048"
    },
    {
     "id": "2022-043",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-043",
     "seccion": "2.3. Estudios de cohortes",
     "pool": "2023-043"
    },
    {
     "id": "2023-044",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-044",
     "seccion": "2.3. Estudios de cohortes",
     "pool": "2024-044"
    },
    {
     "id": "2023-047",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-047",
     "seccion": "2.3. Estudios de cohortes",
     "pool": "2024-047"
    }
   ],
   "quiz": [
    {
     "id": "2020-045",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2020-045",
     "seccion": "1.3. Estudios ecológicos"
    },
    {
     "id": "2019-030",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2019-030",
     "seccion": "2.3. Estudios de cohortes"
    },
    {
     "id": "2018-121",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2018-121",
     "seccion": "2.3. Estudios de cohortes"
    },
    {
     "id": "2018-120",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2018-120",
     "seccion": "2.4. Estudios de casos y controles anidados en una cohorte"
    },
    {
     "id": "2017-224",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2017-224",
     "seccion": "2.2. Estudios de casos y controles"
    },
    {
     "id": "2017-213",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2017-213",
     "seccion": "1.1. Descripción de un caso o series de casos"
    },
    {
     "id": "2017-212",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2017-212",
     "seccion": "2.3. Estudios de cohortes"
    },
    {
     "id": "2017-211",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2017-211",
     "seccion": "2.3. Estudios de cohortes"
    },
    {
     "id": "2016-133",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2016-133",
     "seccion": "2.2. Estudios de casos y controles"
    },
    {
     "id": "2016-132",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2016-132",
     "seccion": "2.4. Estudios de casos y controles anidados en una cohorte"
    }
   ],
   "eval": [
    {
     "slot": "D-1",
     "d": 1,
     "tema": "Estudios experimentales: Ensayo clínico",
     "qs": [
      {
       "id": "2014-190",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2014-190",
       "seccion": "8.4. Ensayo de no inferioridad"
      },
      {
       "id": "2013-203",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2013-203",
       "seccion": "3.2. Fase II"
      }
     ]
    }
   ]
  },
  "lectura": {
   "minUsados": 13.5,
   "minCapitulo": 14.5,
   "paraLa2aVuelta": 2
  }
 },
 "3": {
  "d": 3,
  "fecha": "2026-10-21",
  "capId": "570779c9f4d68bf008dbc80f",
  "bloque": {
   "franja": "15:15–16:15",
   "plan": "mir",
   "titulo": "MIR D3/78 · Epidemiología — Evaluación de pruebas diagnósticas",
   "totalMin": 60,
   "pasos": [
    {
     "min": 7,
     "que": "15:15–15:22 · EVAL ANCLADA 2Q · 2Q D-1 (D2 Clasificación de los estudios de investigación)",
     "como": "Cronómetro 3′ (77 s/Q), en blanco si no descartas 2 · preguntas: las listadas (citadas ProMIR de lo que leíste ese día, no usadas) · hoy solo hay 2Q (no existen D-3/D-7 todavía): los 4′ que sobran, adelanta el Anki · si la app te propone un tema 🔥 caliente (gate), manda la app."
    },
    {
     "min": 5,
     "que": "15:22–15:27 · Anki APEX::MIR::epidemiologia",
     "como": "FSRS · solo Good/Again · deuda a cero; si no hay repasos, revisa las tarjetas de ayer."
    },
    {
     "min": 3,
     "que": "15:27–15:30 · Log de la eval en la app",
     "como": "aciertos/4 · brecha knowledge / transfer / proceso · fallo D-7 → cola D+14 · slot ✗ → tema caliente mañana."
    },
    {
     "min": 8,
     "que": "15:30–15:38 · PRE-TEST 5Q ciegas del capítulo nuevo (3 del pool oficial de la app + 2 citadas en ProMIR)",
     "como": "Sin leer nada · 77 s/Q · registra en la app (kind pretest) · cada fallo = una sección «gap» (la guía dice en qué sección cae cada pregunta)."
    },
    {
     "min": 15,
     "que": "15:38–15:53 · LECTURA DIRIGIDA 15′ · Orientación MIR (1′) + 3.2. Índices de validez diagnóstica (10′ · 34 preguntas MIR citadas) · 3.3. Curvas ROC (3′ · 2 preguntas MIR citadas)",
     "como": "Orden: primero la sección de cada pregunta FALLADA en el pre-test; las secciones cuyas preguntas acertaste se saltan y entra la reserva (2. Diagnóstico y cribado 2.5′ · 3.1. Diseño básico de evaluación de la validez 5.5′ · 4.3. Coeficiente de correlación intraclase 1.5′). Whole Page Rule: lee el apartado entero, no frases sueltas; por cada fallo escribe en el Shopping List la regla que lo habría resuelto. Ritmo de referencia 180 palabras/min. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.",
     "enlace": {
      "t": "ProMIR · Evaluación de pruebas diagnósticas",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc80f"
     }
    },
    {
     "min": 12,
     "que": "15:53–16:05 · 8Q comentadas (máx. 10) · preguntas MIR citadas en las secciones que acabas de leer",
     "como": "Rule-In → Rule-Out · tapa las opciones y contesta antes de verlas · 77 s/Q + lee el comentario · registra en la app (kind quiz): <60 % = tema caliente mañana · orden: el de la lista (pool de la app primero, luego las citadas, más recientes primero); a las 16:05 paras donde estés. Pool oficial de la app para este capítulo: 3Q (todas en el pre-test) → el quiz sale de las 44 preguntas MIR citadas en el capítulo."
    },
    {
     "min": 10,
     "que": "16:05–16:15 · ≤4 APEX en APEX::MIR::epidemiologia",
     "como": "Desde el Shopping List: pregunta SAQ + por qué + 🇪🇸 delta si aplica + tag sys:: del sistema USMLE · 1 de cada 4 con imagen · creados directamente en Anki."
    }
   ],
   "recursos": [
    {
     "t": "ProMIR · Evaluación de pruebas diagnósticas (capítulo completo)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc80f",
     "min": 32,
     "cantidad": "4904 palabras de texto + 94 en tablas · 11 secciones · 5 figuras · 2 tablas · audio «escuchar todo el tema» (duración no medida)"
    },
    {
     "t": "Preguntas MIR citadas en el capítulo (chips «MIR AAAA-AAAA, Pnnn» → /pregunta/MIR/…)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc80f",
     "cantidad": "44 (≥2015: 13 · ≥2020: 6)"
    },
    {
     "t": "Pool oficial de la app (MIR 2022-2026) de este capítulo",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc80f",
     "cantidad": "3Q (2022-044 · 2023-045 · 2024-046)"
    }
   ],
   "hecho": "Eval registrada + Anki a cero + pre-test 5Q registrado + lectura de las secciones gap (o de la lista) + ≥8Q del quiz registradas + ≤4 APEX creados.",
   "planB": "Si ProMIR no abre: pre-test y quiz con el pool oficial de la app (pestaña MIR → registro: 3Q del capítulo + 25 de Epidemiología) y lectura en la nota madre de Obsidian (◆ Obsidian) o en el resumen de rabi_94 (Drive). Día roto (modo mínimo): Anki a cero + 4Q ancladas (15′)."
  },
  "preguntas": {
   "pretest": [
    {
     "id": "2021-044",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-044",
     "seccion": "3.2. Índices de validez diagnóstica",
     "pool": "2022-044"
    },
    {
     "id": "2022-045",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-045",
     "seccion": "3.2. Índices de validez diagnóstica",
     "pool": "2023-045"
    },
    {
     "id": "2023-046",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-046",
     "seccion": "3.3. Curvas ROC",
     "pool": "2024-046"
    },
    {
     "id": "2023-043",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-043",
     "seccion": "2. Diagnóstico y cribado"
    },
    {
     "id": "2020-052",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2020-052",
     "seccion": "3.2. Índices de validez diagnóstica"
    }
   ],
   "quiz": [
    {
     "id": "2020-050",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2020-050",
     "seccion": "3.2. Índices de validez diagnóstica"
    },
    {
     "id": "2019-177",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2019-177",
     "seccion": "3.2. Índices de validez diagnóstica"
    },
    {
     "id": "2018-131",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2018-131",
     "seccion": "3.2. Índices de validez diagnóstica"
    },
    {
     "id": "2018-129",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2018-129",
     "seccion": "3.2. Índices de validez diagnóstica"
    },
    {
     "id": "2016-129",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2016-129",
     "seccion": "3.2. Índices de validez diagnóstica"
    },
    {
     "id": "2015-206",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2015-206",
     "seccion": "3.2. Índices de validez diagnóstica"
    },
    {
     "id": "2014-235",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2014-235",
     "seccion": "3.2. Índices de validez diagnóstica"
    },
    {
     "id": "2014-195",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2014-195",
     "seccion": "3.2. Índices de validez diagnóstica"
    },
    {
     "id": "2014-131",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2014-131",
     "seccion": "3.2. Índices de validez diagnóstica"
    },
    {
     "id": "2013-207",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2013-207",
     "seccion": "3.2. Índices de validez diagnóstica"
    }
   ],
   "eval": [
    {
     "slot": "D-1",
     "d": 2,
     "tema": "Clasificación de los estudios de investigación (Tipos de estudios epidemiológicos)",
     "qs": [
      {
       "id": "2016-131",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2016-131",
       "seccion": "2.1. Estudios de corte transversal o de prevalencia"
      },
      {
       "id": "2016-120",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2016-120",
       "seccion": "2.2. Estudios de casos y controles"
      }
     ]
    }
   ]
  },
  "lectura": {
   "minUsados": 14,
   "minCapitulo": 32,
   "paraLa2aVuelta": 19
  }
 },
 "4": {
  "d": 4,
  "fecha": "2026-10-22",
  "capId": "64a3be863f62ec1dbb3e665b",
  "bloque": {
   "franja": "15:15–16:15",
   "plan": "mir",
   "titulo": "MIR D4/78 · Medicina Legal y Bioética — Principios de bioética y relación médico-paciente",
   "totalMin": 60,
   "pasos": [
    {
     "min": 15,
     "que": "15:15–15:30 · TEST DE CIERRE · 10Q reales MIR de Epidemiología (bloque D1-D3 cerrado)",
     "como": "Cronómetro 13 min (77 s/Q), en blanco si no descartas 2 · fuente: pool oficial de la app sin usar (11 de Epidemiología tras los pre-tests) · neto = A − F/3 → ≥70 % consolidada · 55-69 % intermedia · <55 % la asignatura entra en las anclas D-7 · 2′ para registrar (kind cierre). Hoy no hay eval anclada ni Anki en esta franja (los sustituye el cierre)."
    },
    {
     "min": 8,
     "que": "15:30–15:38 · PRE-TEST 5Q ciegas del capítulo nuevo (2 del pool oficial de la app + 3 citadas en ProMIR)",
     "como": "Sin leer nada · 77 s/Q · registra en la app (kind pretest) · cada fallo = una sección «gap» (la guía dice en qué sección cae cada pregunta)."
    },
    {
     "min": 15,
     "que": "15:38–15:53 · LECTURA DIRIGIDA 15′ · Orientación MIR (1′) + 1. Principios de bioética (2′ · 7 preguntas MIR citadas) · 2. Relación médico-paciente. Atención al paciente en situaciones especiales (1.5′ · 11 preguntas MIR citadas) · 3. Normativa en la investigación biomédica (2.5′ · 1 preguntas MIR citadas) · 4. Comités de ética asistencial (1.5′ · 1 preguntas MIR citadas) · 6. Transfusiones de hemoderivados en situaciones especiales. Consentimientos prestados con limitaciones (1.5′ · 1 preguntas MIR citadas) · 7. Rechazo de tratamiento o denegación de consentimiento (4′ · 1 preguntas MIR citadas)",
     "como": "Orden: primero la sección de cada pregunta FALLADA en el pre-test; las secciones cuyas preguntas acertaste se saltan y entra la reserva (—). Whole Page Rule: lee el apartado entero, no frases sueltas; por cada fallo escribe en el Shopping List la regla que lo habría resuelto. Ritmo de referencia 180 palabras/min. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.",
     "enlace": {
      "t": "ProMIR · Principios de bioética y relación médico-paciente",
      "url": "https://promir.medicapanamericana.com/capitulo/64a3be863f62ec1dbb3e665b"
     }
    },
    {
     "min": 12,
     "que": "15:53–16:05 · 8Q comentadas (máx. 10) · preguntas MIR citadas en las secciones que acabas de leer",
     "como": "Rule-In → Rule-Out · tapa las opciones y contesta antes de verlas · 77 s/Q + lee el comentario · registra en la app (kind quiz): <60 % = tema caliente mañana · orden: el de la lista (pool de la app primero, luego las citadas, más recientes primero); a las 16:05 paras donde estés. Pool oficial de la app para este capítulo: 2Q (todas en el pre-test) → el quiz sale de las 22 preguntas MIR citadas en el capítulo."
    },
    {
     "min": 10,
     "que": "16:05–16:15 · ≤4 APEX en APEX::MIR::bioetica",
     "como": "Desde el Shopping List: pregunta SAQ + por qué + 🇪🇸 delta si aplica + tag sys:: del sistema USMLE · 1 de cada 4 con imagen · creados directamente en Anki."
    }
   ],
   "recursos": [
    {
     "t": "ProMIR · Principios de bioética y relación médico-paciente (capítulo completo)",
     "url": "https://promir.medicapanamericana.com/capitulo/64a3be863f62ec1dbb3e665b",
     "min": 16,
     "cantidad": "2793 palabras de texto + 0 en tablas · 7 secciones · 0 figuras · 0 tablas · audio «escuchar todo el tema» (duración no medida)"
    },
    {
     "t": "Preguntas MIR citadas en el capítulo (chips «MIR AAAA-AAAA, Pnnn» → /pregunta/MIR/…)",
     "url": "https://promir.medicapanamericana.com/capitulo/64a3be863f62ec1dbb3e665b",
     "cantidad": "22 (≥2015: 16 · ≥2020: 3)"
    },
    {
     "t": "Pool oficial de la app (MIR 2022-2026) de este capítulo",
     "url": "https://promir.medicapanamericana.com/capitulo/64a3be863f62ec1dbb3e665b",
     "cantidad": "2Q (2022-186 · 2026-074)"
    },
    {
     "t": "Vídeo resumen de Medicina Legal y Bioética (asignatura entera) — NO entra en la franja (>12 min)",
     "url": "https://promir.medicapanamericana.com/capitulo/64a3be863f62ec1dbb3e665b",
     "min": 50
    }
   ],
   "hecho": "Cierre 10Q registrado + pre-test 5Q registrado + lectura de las secciones gap (o de la lista) + ≥8Q del quiz registradas + ≤4 APEX creados.",
   "planB": "Si ProMIR no abre: pre-test y quiz con el pool oficial de la app (pestaña MIR → registro: 2Q del capítulo + 23 de Medicina Legal y Bioética) y lectura en la nota madre de Obsidian (◆ Obsidian) o en el resumen de rabi_94 (Drive). Día roto (modo mínimo): Anki a cero + 4Q ancladas (15′)."
  },
  "preguntas": {
   "pretest": [
    {
     "id": "2021-186",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-186",
     "seccion": null,
     "pool": "2022-186"
    },
    {
     "id": "2025-074",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-074",
     "seccion": null,
     "pool": "2026-074"
    },
    {
     "id": "2024-177",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-177",
     "seccion": "2. Relación médico-paciente. Atención al paciente en situaciones especiales"
    },
    {
     "id": "2022-182",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-182",
     "seccion": "7. Rechazo de tratamiento o denegación de consentimiento"
    },
    {
     "id": "2022-180",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-180",
     "seccion": "1. Principios de bioética"
    }
   ],
   "quiz": [
    {
     "id": "2018-205",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2018-205",
     "seccion": "1. Principios de bioética"
    },
    {
     "id": "2016-224",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2016-224",
     "seccion": "2. Relación médico-paciente. Atención al paciente en situaciones especiales"
    },
    {
     "id": "2016-223",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2016-223",
     "seccion": "2. Relación médico-paciente. Atención al paciente en situaciones especiales"
    },
    {
     "id": "2016-222",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2016-222",
     "seccion": "1. Principios de bioética"
    },
    {
     "id": "2016-218",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2016-218",
     "seccion": "2. Relación médico-paciente. Atención al paciente en situaciones especiales"
    },
    {
     "id": "2015-187",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2015-187",
     "seccion": "2. Relación médico-paciente. Atención al paciente en situaciones especiales"
    },
    {
     "id": "2015-183",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2015-183",
     "seccion": "2. Relación médico-paciente. Atención al paciente en situaciones especiales"
    },
    {
     "id": "2015-182",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2015-182",
     "seccion": "2. Relación médico-paciente. Atención al paciente en situaciones especiales"
    },
    {
     "id": "2015-181",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2015-181",
     "seccion": "2. Relación médico-paciente. Atención al paciente en situaciones especiales"
    },
    {
     "id": "2015-180",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2015-180",
     "seccion": "2. Relación médico-paciente. Atención al paciente en situaciones especiales"
    }
   ],
   "cierre": [
    {
     "id": "2025-033",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-033",
     "pool": "2026-033"
    },
    {
     "id": "2025-029",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-029",
     "pool": "2026-029"
    },
    {
     "id": "2024-207",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-207",
     "pool": "2025-207"
    },
    {
     "id": "2024-045",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-045",
     "pool": "2025-045"
    },
    {
     "id": "2024-040",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-040",
     "pool": "2025-040"
    },
    {
     "id": "2023-045",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-045",
     "pool": "2024-045"
    },
    {
     "id": "2022-049",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-049",
     "pool": "2023-049"
    },
    {
     "id": "2022-048",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-048",
     "pool": "2023-048"
    },
    {
     "id": "2022-046",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-046",
     "pool": "2023-046"
    },
    {
     "id": "2022-044",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-044",
     "pool": "2023-044"
    }
   ]
  },
  "lectura": {
   "minUsados": 14,
   "minCapitulo": 16,
   "paraLa2aVuelta": 3
  }
 },
 "5": {
  "d": 5,
  "fecha": "2026-10-23",
  "capId": "570779c9f4d68bf008dbc7e9",
  "bloque": {
   "franja": "15:15–16:15",
   "plan": "mir",
   "titulo": "MIR D5/78 · Cardiología — Cardiología básica",
   "totalMin": 60,
   "pasos": [
    {
     "min": 15,
     "que": "15:15–15:30 · TEST DE CIERRE · 10Q reales MIR de Medicina Legal y Bioética (bloque D4-D4 cerrado)",
     "como": "Cronómetro 13 min (77 s/Q), en blanco si no descartas 2 · fuente: pool oficial de la app sin usar (18 de Medicina Legal y Bioética tras los pre-tests) · neto = A − F/3 → ≥70 % consolidada · 55-69 % intermedia · <55 % la asignatura entra en las anclas D-7 · 2′ para registrar (kind cierre). Hoy no hay eval anclada ni Anki en esta franja (los sustituye el cierre)."
    },
    {
     "min": 8,
     "que": "15:30–15:38 · PRE-TEST 5Q ciegas del capítulo nuevo (4 del pool oficial de la app + 1 citadas en ProMIR)",
     "como": "Sin leer nada · 77 s/Q · registra en la app (kind pretest) · cada fallo = una sección «gap» (la guía dice en qué sección cae cada pregunta)."
    },
    {
     "min": 15,
     "que": "15:38–15:53 · LECTURA DIRIGIDA 15′ · Orientación MIR (1′) + 2.3. Shock (2.5′ · 6 preguntas MIR citadas) · 3.3. Auscultación cardíaca (11.5′ · 12 preguntas MIR citadas · clip 0:34)",
     "como": "Orden: primero la sección de cada pregunta FALLADA en el pre-test; las secciones cuyas preguntas acertaste se saltan y entra la reserva (4.1. Insuficiencia cardíaca 4.5′ · 2.2. Potencial de acción 16′ · 4.3. Trastornos del ritmo 5.5′). Whole Page Rule: lee el apartado entero, no frases sueltas; por cada fallo escribe en el Shopping List la regla que lo habría resuelto. Ritmo de referencia 180 palabras/min. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.",
     "enlace": {
      "t": "ProMIR · Cardiología básica",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc7e9"
     }
    },
    {
     "min": 12,
     "que": "15:53–16:05 · 8Q comentadas (máx. 10) · preguntas MIR citadas en las secciones que acabas de leer",
     "como": "Rule-In → Rule-Out · tapa las opciones y contesta antes de verlas · 77 s/Q + lee el comentario · registra en la app (kind quiz): <60 % = tema caliente mañana · orden: el de la lista (pool de la app primero, luego las citadas, más recientes primero); a las 16:05 paras donde estés. Pool oficial de la app para este capítulo: 4Q (todas en el pre-test) → el quiz sale de las 68 preguntas MIR citadas en el capítulo."
    },
    {
     "min": 10,
     "que": "16:05–16:15 · ≤4 APEX en APEX::MIR::cardiologia",
     "como": "Desde el Shopping List: pregunta SAQ + por qué + 🇪🇸 delta si aplica + tag sys:: del sistema USMLE · 1 de cada 4 con imagen · creados directamente en Anki."
    }
   ],
   "recursos": [
    {
     "t": "ProMIR · Cardiología básica (capítulo completo)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc7e9",
     "min": 96.5,
     "cantidad": "14.944 palabras de texto + 138 en tablas · 20 secciones · 19 figuras · 1 tablas · audio «escuchar todo el tema» (duración no medida)"
    },
    {
     "t": "Preguntas MIR citadas en el capítulo (chips «MIR AAAA-AAAA, Pnnn» → /pregunta/MIR/…)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc7e9",
     "cantidad": "68 (≥2015: 36 · ≥2020: 20)"
    },
    {
     "t": "Pool oficial de la app (MIR 2022-2026) de este capítulo",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc7e9",
     "cantidad": "4Q (2023-030 · 2024-032 · 2025-100 · 2026-067)"
    },
    {
     "t": "Vídeo resumen de Cardiología (asignatura entera) — NO entra en la franja (>12 min)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc7e9",
     "min": 148
    }
   ],
   "hecho": "Cierre 10Q registrado + pre-test 5Q registrado + lectura de las secciones gap (o de la lista) + ≥8Q del quiz registradas + ≤4 APEX creados.",
   "planB": "Si ProMIR no abre: pre-test y quiz con el pool oficial de la app (pestaña MIR → registro: 4Q del capítulo + 83 de Cardiología) y lectura en la nota madre de Obsidian (◆ Obsidian) o en el resumen de rabi_94 (Drive). Día roto (modo mínimo): Anki a cero + 4Q ancladas (15′)."
  },
  "preguntas": {
   "pretest": [
    {
     "id": "2022-030",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-030",
     "seccion": "2.4. Vasos sanguíneos y fisiología vascular",
     "pool": "2023-030"
    },
    {
     "id": "2023-032",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-032",
     "seccion": "2.2. Potencial de acción",
     "pool": "2024-032"
    },
    {
     "id": "2024-100",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-100",
     "seccion": null,
     "pool": "2025-100"
    },
    {
     "id": "2025-067",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-067",
     "seccion": "2.1. Ciclo cardíaco",
     "pool": "2026-067"
    },
    {
     "id": "2025-068",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-068",
     "seccion": "2.2. Potencial de acción"
    }
   ],
   "quiz": [
    {
     "id": "2019-156",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2019-156",
     "seccion": "3.3. Auscultación cardíaca"
    },
    {
     "id": "2019-093",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2019-093",
     "seccion": "3.3. Auscultación cardíaca"
    },
    {
     "id": "2018-071",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2018-071",
     "seccion": "2.3. Shock"
    },
    {
     "id": "2018-070",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2018-070",
     "seccion": "3.3. Auscultación cardíaca"
    },
    {
     "id": "2014-134",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2014-134",
     "seccion": "2.3. Shock"
    },
    {
     "id": "2013-073",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2013-073",
     "seccion": "3.3. Auscultación cardíaca"
    },
    {
     "id": "2008-224",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2008-224",
     "seccion": "2.3. Shock"
    },
    {
     "id": "2006-140",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2006-140",
     "seccion": "3.3. Auscultación cardíaca"
    },
    {
     "id": "2006-023",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2006-023",
     "seccion": "3.3. Auscultación cardíaca"
    },
    {
     "id": "2005-248",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2005-248",
     "seccion": "3.3. Auscultación cardíaca"
    }
   ],
   "cierre": [
    {
     "id": "2025-200",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-200",
     "pool": "2026-200"
    },
    {
     "id": "2025-145",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-145",
     "pool": "2026-145"
    },
    {
     "id": "2025-075",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-075",
     "pool": "2026-075"
    },
    {
     "id": "2025-073",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-073",
     "pool": "2026-073"
    },
    {
     "id": "2025-072",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-072",
     "pool": "2026-072"
    },
    {
     "id": "2025-046",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-046",
     "pool": "2026-046"
    },
    {
     "id": "2025-041",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-041",
     "pool": "2026-041"
    },
    {
     "id": "2024-181",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-181",
     "pool": "2025-181"
    },
    {
     "id": "2024-180",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-180",
     "pool": "2025-180"
    },
    {
     "id": "2024-178",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-178",
     "pool": "2025-178"
    }
   ]
  },
  "lectura": {
   "minUsados": 15,
   "minCapitulo": 96.5,
   "paraLa2aVuelta": 82.5
  }
 },
 "6": {
  "d": 6,
  "fecha": "2026-10-26",
  "capId": "570779c9f4d68bf008dbc78d",
  "bloque": {
   "franja": "15:15–16:15",
   "plan": "mir",
   "titulo": "MIR D6/78 · Cardiología — Trastornos del ritmo",
   "totalMin": 60,
   "pasos": [
    {
     "min": 7,
     "que": "15:15–15:22 · EVAL ANCLADA 3Q · 2Q D-1 (D5 Cardiología básica) + 1Q D-3 (D3 Evaluación de pruebas diagnósticas)",
     "como": "Cronómetro 4′ (77 s/Q), en blanco si no descartas 2 · preguntas: las listadas (citadas ProMIR de lo que leíste ese día, no usadas) · hoy solo hay 3Q (no existen D-3/D-7 todavía): los 3′ que sobran, adelanta el Anki · si la app te propone un tema 🔥 caliente (gate), manda la app."
    },
    {
     "min": 5,
     "que": "15:22–15:27 · Anki APEX::MIR::cardiologia",
     "como": "FSRS · solo Good/Again · deuda a cero; si no hay repasos, revisa las tarjetas de ayer."
    },
    {
     "min": 3,
     "que": "15:27–15:30 · Log de la eval en la app",
     "como": "aciertos/4 · brecha knowledge / transfer / proceso · fallo D-7 → cola D+14 · slot ✗ → tema caliente mañana."
    },
    {
     "min": 8,
     "que": "15:30–15:38 · PRE-TEST 5Q ciegas del capítulo nuevo (5 del pool oficial de la app)",
     "como": "Sin leer nada · 77 s/Q · registra en la app (kind pretest) · cada fallo = una sección «gap» (la guía dice en qué sección cae cada pregunta)."
    },
    {
     "min": 15,
     "que": "15:38–15:53 · LECTURA DIRIGIDA 15′ · Orientación MIR (1′) + 3.2. Taquicardias de complejo QRS estrecho (PARCIAL 14′ de 35′: solo los párrafos con chip MIR ≥2015 · 20 preguntas MIR citadas · clip 0:10)",
     "como": "Orden: primero la sección de cada pregunta FALLADA en el pre-test; las secciones cuyas preguntas acertaste se saltan y entra la reserva (1.3. Electrocardiograma normal 14.5′ · 5.2. Síndrome de intervalo QT 8′ · 2.6. Tipos de marcapasos 3′). Whole Page Rule: lee el apartado entero, no frases sueltas; por cada fallo escribe en el Shopping List la regla que lo habría resuelto. Ritmo de referencia 180 palabras/min. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.",
     "enlace": {
      "t": "ProMIR · Trastornos del ritmo",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc78d"
     }
    },
    {
     "min": 12,
     "que": "15:53–16:05 · 8Q comentadas (máx. 10) · 7 del pool oficial que no entraron en el pre-test + preguntas MIR citadas en las secciones que acabas de leer",
     "como": "Rule-In → Rule-Out · tapa las opciones y contesta antes de verlas · 77 s/Q + lee el comentario · registra en la app (kind quiz): <60 % = tema caliente mañana · orden: el de la lista (pool de la app primero, luego las citadas, más recientes primero); a las 16:05 paras donde estés. Pool oficial de la app para este capítulo: 12Q → 5 en el pre-test y 7 abren el quiz (en la app); el resto, preguntas MIR citadas en el capítulo (45)."
    },
    {
     "min": 10,
     "que": "16:05–16:15 · ≤4 APEX en APEX::MIR::cardiologia",
     "como": "Desde el Shopping List: pregunta SAQ + por qué + 🇪🇸 delta si aplica + tag sys:: del sistema USMLE · 1 de cada 4 con imagen · creados directamente en Anki."
    }
   ],
   "recursos": [
    {
     "t": "ProMIR · Trastornos del ritmo (capítulo completo)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc78d",
     "min": 103,
     "cantidad": "13.201 palabras de texto + 248 en tablas · 23 secciones · 50 figuras · 2 tablas · audio «escuchar todo el tema» (duración no medida)"
    },
    {
     "t": "Preguntas MIR citadas en el capítulo (chips «MIR AAAA-AAAA, Pnnn» → /pregunta/MIR/…)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc78d",
     "cantidad": "45 (≥2015: 27 · ≥2020: 18)"
    },
    {
     "t": "Pool oficial de la app (MIR 2022-2026) de este capítulo",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc78d",
     "cantidad": "12Q (2022-123 · 2022-124 · 2022-125 · 2023-120 · 2024-013 · 2024-118 · 2025-012 · 2025-013 · 2026-011 · 2026-025 · 2026-116 · 2026-117)"
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 6-1 · Masterclass: ¿Quieres aprender a leer un electrocardiograma? (1:15:46)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc78d"
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 6-2 · Masterclass: Bradiarritmias: tipos, diagnóstico y manejo práctico. (1:39:24)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc78d"
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 6-3 · Masterclass: Aproximación diagnóstica y terapéutica a las taquicardias. (1:09:28)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc78d"
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 6-4 · Videoclase: Aproximación diagnóstica y terapéutica a las taquicardias supraventriculares (14:13)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc78d"
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 6-5 · Videoclase: Fibrilación auricular y flúter auricular (50:04)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc78d"
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 6-7 · Videoclase: Aproximación diagnóstica a las taquicardias de QRS ancho (15:01)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc78d"
    }
   ],
   "hecho": "Eval registrada + Anki a cero + pre-test 5Q registrado + lectura de las secciones gap (o de la lista) + ≥8Q del quiz registradas + ≤4 APEX creados.",
   "planB": "Si ProMIR no abre: pre-test y quiz con el pool oficial de la app (pestaña MIR → registro: 12Q del capítulo + 83 de Cardiología) y lectura en la nota madre de Obsidian (◆ Obsidian) o en el resumen de rabi_94 (Drive). Día roto (modo mínimo): Anki a cero + 4Q ancladas (15′)."
  },
  "preguntas": {
   "pretest": [
    {
     "id": "2021-123",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-123",
     "seccion": "5.2. Síndrome de intervalo QT",
     "pool": "2022-123"
    },
    {
     "id": "2021-124",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-124",
     "seccion": "2.6. Tipos de marcapasos",
     "pool": "2022-124"
    },
    {
     "id": "2021-125",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-125",
     "seccion": "3.2. Taquicardias de complejo QRS estrecho",
     "pool": "2022-125"
    },
    {
     "id": "2022-120",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-120",
     "seccion": "3.1. Definición de taquicardia y clasificación",
     "pool": "2023-120"
    },
    {
     "id": "2023-013",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-013",
     "seccion": "1.3. Electrocardiograma normal",
     "pool": "2024-013"
    }
   ],
   "quiz": [
    {
     "id": "2023-118",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-118",
     "seccion": "3.3. Taquicardias de complejo QRS ancho",
     "pool": "2024-118"
    },
    {
     "id": "2024-012",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-012",
     "seccion": "2.3. Tipos de bradicardias",
     "pool": "2025-012"
    },
    {
     "id": "2024-013",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-013",
     "seccion": "3.2. Taquicardias de complejo QRS estrecho",
     "pool": "2025-013"
    },
    {
     "id": "2025-011",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-011",
     "seccion": "3.2. Taquicardias de complejo QRS estrecho",
     "pool": "2026-011"
    },
    {
     "id": "2025-025",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-025",
     "seccion": "3.3. Taquicardias de complejo QRS ancho",
     "pool": "2026-025"
    },
    {
     "id": "2025-116",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-116",
     "seccion": "5.1. Síndrome de Brugada",
     "pool": "2026-116"
    },
    {
     "id": "2025-117",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-117",
     "seccion": "3.2. Taquicardias de complejo QRS estrecho",
     "pool": "2026-117"
    },
    {
     "id": "2023-178",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-178",
     "seccion": "3.2. Taquicardias de complejo QRS estrecho"
    },
    {
     "id": "2020-057",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2020-057",
     "seccion": "3.2. Taquicardias de complejo QRS estrecho"
    },
    {
     "id": "2020-022",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2020-022",
     "seccion": "3.2. Taquicardias de complejo QRS estrecho"
    }
   ],
   "eval": [
    {
     "slot": "D-1",
     "d": 5,
     "tema": "Cardiología básica",
     "qs": [
      {
       "id": "2005-034",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2005-034",
       "seccion": "2.3. Shock"
      },
      {
       "id": "2005-029",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2005-029",
       "seccion": "3.3. Auscultación cardíaca"
      }
     ]
    },
    {
     "slot": "D-3",
     "d": 3,
     "tema": "Evaluación de pruebas diagnósticas",
     "qs": [
      {
       "id": "2012-196",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2012-196",
       "seccion": "3.2. Índices de validez diagnóstica"
      }
     ]
    }
   ]
  },
  "lectura": {
   "minUsados": 15,
   "minCapitulo": 103,
   "paraLa2aVuelta": 89
  }
 },
 "7": {
  "d": 7,
  "fecha": "2026-10-27",
  "capId": "570779c9f4d68bf008dbc731",
  "bloque": {
   "franja": "15:15–16:15",
   "plan": "mir",
   "titulo": "MIR D7/78 · Cardiología — Cardiopatía isquémica",
   "totalMin": 60,
   "pasos": [
    {
     "min": 7,
     "que": "15:15–15:22 · EVAL ANCLADA 3Q · 2Q D-1 (D6 Trastornos del ritmo) + 1Q D-3 (D4 Principios de bioética y relación médico-paciente)",
     "como": "Cronómetro 4′ (77 s/Q), en blanco si no descartas 2 · preguntas: las listadas (citadas ProMIR de lo que leíste ese día, no usadas) · hoy solo hay 3Q (no existen D-3/D-7 todavía): los 3′ que sobran, adelanta el Anki · si la app te propone un tema 🔥 caliente (gate), manda la app."
    },
    {
     "min": 5,
     "que": "15:22–15:27 · Anki APEX::MIR::cardiologia",
     "como": "FSRS · solo Good/Again · deuda a cero; si no hay repasos, revisa las tarjetas de ayer."
    },
    {
     "min": 3,
     "que": "15:27–15:30 · Log de la eval en la app",
     "como": "aciertos/4 · brecha knowledge / transfer / proceso · fallo D-7 → cola D+14 · slot ✗ → tema caliente mañana."
    },
    {
     "min": 8,
     "que": "15:30–15:38 · PRE-TEST 5Q ciegas del capítulo nuevo (5 del pool oficial de la app)",
     "como": "Sin leer nada · 77 s/Q · registra en la app (kind pretest) · cada fallo = una sección «gap» (la guía dice en qué sección cae cada pregunta)."
    },
    {
     "min": 15,
     "que": "15:38–15:53 · LECTURA DIRIGIDA 15′ · Orientación MIR (1′) + 3.6. Complicaciones del infarto agudo de miocardio (PARCIAL 14′ de 16′: solo los párrafos con chip MIR ≥2015 · 15 preguntas MIR citadas)",
     "como": "Orden: primero la sección de cada pregunta FALLADA en el pre-test; las secciones cuyas preguntas acertaste se saltan y entra la reserva (3.5. Tratamiento del SCACEST 5.5′ · 3.3. Diagnóstico 14.5′ · 2.4. Tratamiento 10.5′). Whole Page Rule: lee el apartado entero, no frases sueltas; por cada fallo escribe en el Shopping List la regla que lo habría resuelto. Ritmo de referencia 180 palabras/min. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.",
     "enlace": {
      "t": "ProMIR · Cardiopatía isquémica",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc731"
     }
    },
    {
     "min": 12,
     "que": "15:53–16:05 · 8Q comentadas (máx. 10) · 1 del pool oficial que no entraron en el pre-test + preguntas MIR citadas en las secciones que acabas de leer",
     "como": "Rule-In → Rule-Out · tapa las opciones y contesta antes de verlas · 77 s/Q + lee el comentario · registra en la app (kind quiz): <60 % = tema caliente mañana · orden: el de la lista (pool de la app primero, luego las citadas, más recientes primero); a las 16:05 paras donde estés. Pool oficial de la app para este capítulo: 6Q → 5 en el pre-test y 1 abren el quiz (en la app); el resto, preguntas MIR citadas en el capítulo (49)."
    },
    {
     "min": 10,
     "que": "16:05–16:15 · ≤4 APEX en APEX::MIR::cardiologia",
     "como": "Desde el Shopping List: pregunta SAQ + por qué + 🇪🇸 delta si aplica + tag sys:: del sistema USMLE · 1 de cada 4 con imagen · creados directamente en Anki."
    }
   ],
   "recursos": [
    {
     "t": "ProMIR · Cardiopatía isquémica (capítulo completo)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc731",
     "min": 69,
     "cantidad": "9721 palabras de texto + 312 en tablas · 13 secciones · 23 figuras · 3 tablas · audio «escuchar todo el tema» (duración no medida)"
    },
    {
     "t": "Preguntas MIR citadas en el capítulo (chips «MIR AAAA-AAAA, Pnnn» → /pregunta/MIR/…)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc731",
     "cantidad": "49 (≥2015: 16 · ≥2020: 11)"
    },
    {
     "t": "Pool oficial de la app (MIR 2022-2026) de este capítulo",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc731",
     "cantidad": "6Q (2022-022 · 2023-004 · 2024-111 · 2026-065 · 2026-115 · 2026-121)"
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 5-1 · Videoclase: Cardiopatía isquémica. (26:30)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c9f4d68bf008dbc731"
    }
   ],
   "hecho": "Eval registrada + Anki a cero + pre-test 5Q registrado + lectura de las secciones gap (o de la lista) + ≥8Q del quiz registradas + ≤4 APEX creados.",
   "planB": "Si ProMIR no abre: pre-test y quiz con el pool oficial de la app (pestaña MIR → registro: 6Q del capítulo + 83 de Cardiología) y lectura en la nota madre de Obsidian (◆ Obsidian) o en el resumen de rabi_94 (Drive). Día roto (modo mínimo): Anki a cero + 4Q ancladas (15′)."
  },
  "preguntas": {
   "pretest": [
    {
     "id": "2021-022",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-022",
     "seccion": "3.6. Complicaciones del infarto agudo de miocardio",
     "pool": "2022-022"
    },
    {
     "id": "2022-004",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-004",
     "seccion": "3.3. Diagnóstico",
     "pool": "2023-004"
    },
    {
     "id": "2023-111",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-111",
     "seccion": "3.5. Tratamiento del SCACEST",
     "pool": "2024-111"
    },
    {
     "id": "2025-065",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-065",
     "seccion": "2.4. Tratamiento",
     "pool": "2026-065"
    },
    {
     "id": "2025-115",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-115",
     "seccion": "3.5. Tratamiento del SCACEST",
     "pool": "2026-115"
    }
   ],
   "quiz": [
    {
     "id": "2025-121",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-121",
     "seccion": "3.6. Complicaciones del infarto agudo de miocardio",
     "pool": "2026-121"
    },
    {
     "id": "2025-122",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-122",
     "seccion": "3.6. Complicaciones del infarto agudo de miocardio"
    },
    {
     "id": "2020-138",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2020-138",
     "seccion": "3.6. Complicaciones del infarto agudo de miocardio"
    },
    {
     "id": "2017-068",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2017-068",
     "seccion": "3.6. Complicaciones del infarto agudo de miocardio"
    },
    {
     "id": "2012-133",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2012-133",
     "seccion": "3.6. Complicaciones del infarto agudo de miocardio"
    },
    {
     "id": "2012-089",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2012-089",
     "seccion": "3.6. Complicaciones del infarto agudo de miocardio"
    },
    {
     "id": "2012-080",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2012-080",
     "seccion": "3.6. Complicaciones del infarto agudo de miocardio"
    },
    {
     "id": "2011-049",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2011-049",
     "seccion": "3.6. Complicaciones del infarto agudo de miocardio"
    },
    {
     "id": "2010-054",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2010-054",
     "seccion": "3.6. Complicaciones del infarto agudo de miocardio"
    },
    {
     "id": "2006-034",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2006-034",
     "seccion": "3.6. Complicaciones del infarto agudo de miocardio"
    }
   ],
   "eval": [
    {
     "slot": "D-1",
     "d": 6,
     "tema": "Trastornos del ritmo",
     "qs": [
      {
       "id": "2017-066",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2017-066",
       "seccion": "3.2. Taquicardias de complejo QRS estrecho"
      },
      {
       "id": "2017-031",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2017-031",
       "seccion": "3.2. Taquicardias de complejo QRS estrecho"
      }
     ]
    },
    {
     "slot": "D-3",
     "d": 4,
     "tema": "Principios de bioética y relación médico-paciente",
     "qs": [
      {
       "id": "2014-133",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2014-133",
       "seccion": "2. Relación médico-paciente. Atención al paciente en situaciones especiales"
      }
     ]
    }
   ]
  },
  "lectura": {
   "minUsados": 15,
   "minCapitulo": 69,
   "paraLa2aVuelta": 55
  }
 },
 "8": {
  "d": 8,
  "fecha": "2026-10-28",
  "capId": "64588d5ef704295c924d9289",
  "bloque": {
   "franja": "15:15–16:15",
   "plan": "mir",
   "titulo": "MIR D8/78 · Cardiología — Insuficiencia cardíaca",
   "totalMin": 60,
   "pasos": [
    {
     "min": 7,
     "que": "15:15–15:22 · EVAL ANCLADA 4Q · 2Q D-1 (D7 Cardiopatía isquémica) + 1Q D-3 (D5 Cardiología básica) + 1Q D-7 (D1 Estudios experimentales: Ensayo clínico)",
     "como": "Cronómetro 6′ (77 s/Q), en blanco si no descartas 2 · preguntas: las listadas (citadas ProMIR de lo que leíste ese día, no usadas) · si la app te propone un tema 🔥 caliente (gate), manda la app."
    },
    {
     "min": 5,
     "que": "15:22–15:27 · Anki APEX::MIR::cardiologia",
     "como": "FSRS · solo Good/Again · deuda a cero; si no hay repasos, revisa las tarjetas de ayer."
    },
    {
     "min": 3,
     "que": "15:27–15:30 · Log de la eval en la app",
     "como": "aciertos/4 · brecha knowledge / transfer / proceso · fallo D-7 → cola D+14 · slot ✗ → tema caliente mañana."
    },
    {
     "min": 8,
     "que": "15:30–15:38 · PRE-TEST 5Q ciegas del capítulo nuevo (5 del pool oficial de la app)",
     "como": "Sin leer nada · 77 s/Q · registra en la app (kind pretest) · cada fallo = una sección «gap» (la guía dice en qué sección cae cada pregunta)."
    },
    {
     "min": 15,
     "que": "15:38–15:53 · LECTURA DIRIGIDA 15′ · Orientación MIR (1′) + 6.2. Insuficiencia cardíaca estabilizada (PARCIAL 14′ de 40′: solo los párrafos con chip MIR ≥2015 · 40 preguntas MIR citadas)",
     "como": "Orden: primero la sección de cada pregunta FALLADA en el pre-test; las secciones cuyas preguntas acertaste se saltan y entra la reserva (6.1. Insuficiencia cardíaca aguda 30′ · 3.1. Historia clínica. Síntomas y signos de la insuficiencia cardíaca 22′ · 4.1. Clasificación de la insuficiencia cardíaca según la fracción de eyección del ventrículo izquierdo 5.5′). Whole Page Rule: lee el apartado entero, no frases sueltas; por cada fallo escribe en el Shopping List la regla que lo habría resuelto. Ritmo de referencia 180 palabras/min. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.",
     "enlace": {
      "t": "ProMIR · Insuficiencia cardíaca",
      "url": "https://promir.medicapanamericana.com/capitulo/64588d5ef704295c924d9289"
     }
    },
    {
     "min": 12,
     "que": "15:53–16:05 · 8Q comentadas (máx. 10) · 4 del pool oficial que no entraron en el pre-test + preguntas MIR citadas en las secciones que acabas de leer",
     "como": "Rule-In → Rule-Out · tapa las opciones y contesta antes de verlas · 77 s/Q + lee el comentario · registra en la app (kind quiz): <60 % = tema caliente mañana · orden: el de la lista (pool de la app primero, luego las citadas, más recientes primero); a las 16:05 paras donde estés. Pool oficial de la app para este capítulo: 9Q → 5 en el pre-test y 4 abren el quiz (en la app); el resto, preguntas MIR citadas en el capítulo (83)."
    },
    {
     "min": 10,
     "que": "16:05–16:15 · ≤4 APEX en APEX::MIR::cardiologia",
     "como": "Desde el Shopping List: pregunta SAQ + por qué + 🇪🇸 delta si aplica + tag sys:: del sistema USMLE · 1 de cada 4 con imagen · creados directamente en Anki."
    }
   ],
   "recursos": [
    {
     "t": "ProMIR · Insuficiencia cardíaca (capítulo completo)",
     "url": "https://promir.medicapanamericana.com/capitulo/64588d5ef704295c924d9289",
     "min": 164.5,
     "cantidad": "21.920 palabras de texto + 1778 en tablas · 22 secciones · 40 figuras · 15 tablas · audio «escuchar todo el tema» (duración no medida)"
    },
    {
     "t": "Preguntas MIR citadas en el capítulo (chips «MIR AAAA-AAAA, Pnnn» → /pregunta/MIR/…)",
     "url": "https://promir.medicapanamericana.com/capitulo/64588d5ef704295c924d9289",
     "cantidad": "83 (≥2015: 39 · ≥2020: 20)"
    },
    {
     "t": "Pool oficial de la app (MIR 2022-2026) de este capítulo",
     "url": "https://promir.medicapanamericana.com/capitulo/64588d5ef704295c924d9289",
     "cantidad": "9Q (2022-128 · 2022-200 · 2023-192 · 2024-117 · 2025-099 · 2025-104 · 2025-183 · 2026-010 · 2026-197)"
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 4-1 · Masterclass: Diagnóstico y tratamiento de la insuficiencia cardíaca aguda y crónica. (2:04:08)",
     "url": "https://promir.medicapanamericana.com/capitulo/64588d5ef704295c924d9289"
    }
   ],
   "hecho": "Eval registrada + Anki a cero + pre-test 5Q registrado + lectura de las secciones gap (o de la lista) + ≥8Q del quiz registradas + ≤4 APEX creados.",
   "planB": "Si ProMIR no abre: pre-test y quiz con el pool oficial de la app (pestaña MIR → registro: 9Q del capítulo + 83 de Cardiología) y lectura en la nota madre de Obsidian (◆ Obsidian) o en el resumen de rabi_94 (Drive). Día roto (modo mínimo): Anki a cero + 4Q ancladas (15′)."
  },
  "preguntas": {
   "pretest": [
    {
     "id": "2021-128",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-128",
     "seccion": "6.2. Insuficiencia cardíaca estabilizada",
     "pool": "2022-128"
    },
    {
     "id": "2021-200",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-200",
     "seccion": "6.1. Insuficiencia cardíaca aguda",
     "pool": "2022-200"
    },
    {
     "id": "2022-192",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-192",
     "seccion": "6.2. Insuficiencia cardíaca estabilizada",
     "pool": "2023-192"
    },
    {
     "id": "2023-117",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-117",
     "seccion": "6.2. Insuficiencia cardíaca estabilizada",
     "pool": "2024-117"
    },
    {
     "id": "2024-099",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-099",
     "seccion": "6.2. Insuficiencia cardíaca estabilizada",
     "pool": "2025-099"
    }
   ],
   "quiz": [
    {
     "id": "2024-104",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-104",
     "seccion": "6.2. Insuficiencia cardíaca estabilizada",
     "pool": "2025-104"
    },
    {
     "id": "2024-183",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-183",
     "seccion": "3.1. Historia clínica. Síntomas y signos de la insuficiencia cardíaca",
     "pool": "2025-183"
    },
    {
     "id": "2025-010",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-010",
     "seccion": "6.1. Insuficiencia cardíaca aguda",
     "pool": "2026-010"
    },
    {
     "id": "2025-197",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-197",
     "seccion": "6.1. Insuficiencia cardíaca aguda",
     "pool": "2026-197"
    },
    {
     "id": "2022-055",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-055",
     "seccion": "6.2. Insuficiencia cardíaca estabilizada"
    },
    {
     "id": "2020-137",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2020-137",
     "seccion": "6.2. Insuficiencia cardíaca estabilizada"
    },
    {
     "id": "2020-130",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2020-130",
     "seccion": "6.2. Insuficiencia cardíaca estabilizada"
    },
    {
     "id": "2020-126",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2020-126",
     "seccion": "6.2. Insuficiencia cardíaca estabilizada"
    },
    {
     "id": "2020-038",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2020-038",
     "seccion": "6.2. Insuficiencia cardíaca estabilizada"
    },
    {
     "id": "2019-179",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2019-179",
     "seccion": "6.2. Insuficiencia cardíaca estabilizada"
    }
   ],
   "eval": [
    {
     "slot": "D-1",
     "d": 7,
     "tema": "Cardiopatía isquémica",
     "qs": [
      {
       "id": "2006-029",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2006-029",
       "seccion": "3.6. Complicaciones del infarto agudo de miocardio"
      },
      {
       "id": "2006-024",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2006-024",
       "seccion": "3.6. Complicaciones del infarto agudo de miocardio"
      }
     ]
    },
    {
     "slot": "D-3",
     "d": 5,
     "tema": "Cardiología básica",
     "qs": [
      {
       "id": "2004-252",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2004-252",
       "seccion": "3.3. Auscultación cardíaca"
      }
     ]
    },
    {
     "slot": "D-7",
     "d": 1,
     "tema": "Estudios experimentales: Ensayo clínico",
     "qs": [
      {
       "id": "2012-189",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2012-189",
       "seccion": "6.1. Aleatorización"
      }
     ]
    }
   ]
  },
  "lectura": {
   "minUsados": 15,
   "minCapitulo": 164.5,
   "paraLa2aVuelta": 150.5
  }
 },
 "9": {
  "d": 9,
  "fecha": "2026-10-29",
  "capId": "570779c8f4d68bf008dbc65a",
  "bloque": {
   "franja": "15:15–16:15",
   "plan": "mir",
   "titulo": "MIR D9/78 · Cardiología — Valvulopatías",
   "totalMin": 60,
   "pasos": [
    {
     "min": 7,
     "que": "15:15–15:22 · EVAL ANCLADA 4Q · 2Q D-1 (D8 Insuficiencia cardíaca) + 1Q D-3 (D6 Trastornos del ritmo) + 1Q D-7 (D2 Clasificación de los estudios de investigación)",
     "como": "Cronómetro 6′ (77 s/Q), en blanco si no descartas 2 · preguntas: las listadas (citadas ProMIR de lo que leíste ese día, no usadas) · si la app te propone un tema 🔥 caliente (gate), manda la app."
    },
    {
     "min": 5,
     "que": "15:22–15:27 · Anki APEX::MIR::cardiologia",
     "como": "FSRS · solo Good/Again · deuda a cero; si no hay repasos, revisa las tarjetas de ayer."
    },
    {
     "min": 3,
     "que": "15:27–15:30 · Log de la eval en la app",
     "como": "aciertos/4 · brecha knowledge / transfer / proceso · fallo D-7 → cola D+14 · slot ✗ → tema caliente mañana."
    },
    {
     "min": 8,
     "que": "15:30–15:38 · PRE-TEST 5Q ciegas del capítulo nuevo (5 del pool oficial de la app)",
     "como": "Sin leer nada · 77 s/Q · registra en la app (kind pretest) · cada fallo = una sección «gap» (la guía dice en qué sección cae cada pregunta)."
    },
    {
     "min": 15,
     "que": "15:38–15:53 · LECTURA DIRIGIDA 15′ · Orientación MIR (1′) + 2.5. Tratamiento (11′ · 10 preguntas MIR citadas · clip 0:05) · 5.4. Enfoque diagnóstico (1.5′ · 3 preguntas MIR citadas) · 6.1. Definición, etiología y fisiopatogenia (0.5′ · 1 preguntas MIR citadas) · 8. Elección del tipo de prótesis (1′ · 4 preguntas MIR citadas)",
     "como": "Orden: primero la sección de cada pregunta FALLADA en el pre-test; las secciones cuyas preguntas acertaste se saltan y entra la reserva (2.4. Enfoque diagnóstico 3.5′ · 7.1. Insuficiencia tricúspide 2′ · 2.2. Definición, etiología y fisiopatogenia 2.5′). Whole Page Rule: lee el apartado entero, no frases sueltas; por cada fallo escribe en el Shopping List la regla que lo habría resuelto. Ritmo de referencia 180 palabras/min. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.",
     "enlace": {
      "t": "ProMIR · Valvulopatías",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc65a"
     }
    },
    {
     "min": 12,
     "que": "15:53–16:05 · 8Q comentadas (máx. 10) · 5 del pool oficial que no entraron en el pre-test + preguntas MIR citadas en las secciones que acabas de leer",
     "como": "Rule-In → Rule-Out · tapa las opciones y contesta antes de verlas · 77 s/Q + lee el comentario · registra en la app (kind quiz): <60 % = tema caliente mañana · orden: el de la lista (pool de la app primero, luego las citadas, más recientes primero); a las 16:05 paras donde estés. Pool oficial de la app para este capítulo: 10Q → 5 en el pre-test y 5 abren el quiz (en la app); el resto, preguntas MIR citadas en el capítulo (39)."
    },
    {
     "min": 10,
     "que": "16:05–16:15 · ≤4 APEX en APEX::MIR::cardiologia",
     "como": "Desde el Shopping List: pregunta SAQ + por qué + 🇪🇸 delta si aplica + tag sys:: del sistema USMLE · 1 de cada 4 con imagen · creados directamente en Anki."
    }
   ],
   "recursos": [
    {
     "t": "ProMIR · Valvulopatías (capítulo completo)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc65a",
     "min": 61,
     "cantidad": "8425 palabras de texto + 300 en tablas · 43 secciones · 10 figuras · 3 tablas · audio «escuchar todo el tema» (duración no medida)"
    },
    {
     "t": "Preguntas MIR citadas en el capítulo (chips «MIR AAAA-AAAA, Pnnn» → /pregunta/MIR/…)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc65a",
     "cantidad": "39 (≥2015: 17 · ≥2020: 10)"
    },
    {
     "t": "Pool oficial de la app (MIR 2022-2026) de este capítulo",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc65a",
     "cantidad": "10Q (2022-122 · 2023-123 · 2023-124 · 2024-012 · 2024-116 · 2025-101 · 2025-108 · 2026-083 · 2026-118 · 2026-120)"
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 8-1 · Videoclase: Generalidades sobre valvulopatías (30:00)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc65a"
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 8-2 · Imperdible: Valvulopatías. (20:48)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc65a"
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 8-3 · Videoclase: Estenosis aórtica (26:54)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc65a"
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 8-9 · Videoclase: Insuficiencia aórtica (28:17)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc65a"
    },
    {
     "t": "Opcional fuera de la franja: Vídeo 8-12 · Videoclase: Estenosis mitral (26:18)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc65a"
    }
   ],
   "hecho": "Eval registrada + Anki a cero + pre-test 5Q registrado + lectura de las secciones gap (o de la lista) + ≥8Q del quiz registradas + ≤4 APEX creados.",
   "planB": "Si ProMIR no abre: pre-test y quiz con el pool oficial de la app (pestaña MIR → registro: 10Q del capítulo + 83 de Cardiología) y lectura en la nota madre de Obsidian (◆ Obsidian) o en el resumen de rabi_94 (Drive). Día roto (modo mínimo): Anki a cero + 4Q ancladas (15′)."
  },
  "preguntas": {
   "pretest": [
    {
     "id": "2021-122",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-122",
     "seccion": "2.4. Enfoque diagnóstico",
     "pool": "2022-122"
    },
    {
     "id": "2022-123",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-123",
     "seccion": "2.5. Tratamiento",
     "pool": "2023-123"
    },
    {
     "id": "2022-124",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-124",
     "seccion": "2.5. Tratamiento",
     "pool": "2023-124"
    },
    {
     "id": "2023-012",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-012",
     "seccion": "2.5. Tratamiento",
     "pool": "2024-012"
    },
    {
     "id": "2023-116",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-116",
     "seccion": "6.1. Definición, etiología y fisiopatogenia",
     "pool": "2024-116"
    }
   ],
   "quiz": [
    {
     "id": "2024-101",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-101",
     "seccion": "2.5. Tratamiento",
     "pool": "2025-101"
    },
    {
     "id": "2024-108",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2024-108",
     "seccion": "2.5. Tratamiento",
     "pool": "2025-108"
    },
    {
     "id": "2025-083",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-083",
     "seccion": "2.5. Tratamiento",
     "pool": "2026-083"
    },
    {
     "id": "2025-118",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-118",
     "seccion": null,
     "pool": "2026-118"
    },
    {
     "id": "2025-120",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-120",
     "seccion": "1.6. Prueba de esfuerzo",
     "pool": "2026-120"
    },
    {
     "id": "2018-072",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2018-072",
     "seccion": "8. Elección del tipo de prótesis"
    },
    {
     "id": "2017-004",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2017-004",
     "seccion": "5.4. Enfoque diagnóstico"
    },
    {
     "id": "2013-074",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2013-074",
     "seccion": "8. Elección del tipo de prótesis"
    },
    {
     "id": "2010-049",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2010-049",
     "seccion": "2.5. Tratamiento"
    },
    {
     "id": "2010-047",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2010-047",
     "seccion": "2.5. Tratamiento"
    }
   ],
   "eval": [
    {
     "slot": "D-1",
     "d": 8,
     "tema": "Insuficiencia cardíaca",
     "qs": [
      {
       "id": "2019-094",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2019-094",
       "seccion": "6.2. Insuficiencia cardíaca estabilizada"
      },
      {
       "id": "2018-228",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2018-228",
       "seccion": "6.2. Insuficiencia cardíaca estabilizada"
      }
     ]
    },
    {
     "slot": "D-3",
     "d": 6,
     "tema": "Trastornos del ritmo",
     "qs": [
      {
       "id": "2013-063",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2013-063",
       "seccion": "3.2. Taquicardias de complejo QRS estrecho"
      }
     ]
    },
    {
     "slot": "D-7",
     "d": 2,
     "tema": "Clasificación de los estudios de investigación (Tipos de estudios epidemiológicos)",
     "qs": [
      {
       "id": "2015-192",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2015-192",
       "seccion": "1.3. Estudios ecológicos"
      }
     ]
    }
   ]
  },
  "lectura": {
   "minUsados": 15,
   "minCapitulo": 61,
   "paraLa2aVuelta": 47
  }
 },
 "10": {
  "d": 10,
  "fecha": "2026-10-30",
  "capId": "570779c8f4d68bf008dbc658",
  "bloque": {
   "franja": "15:15–16:15",
   "plan": "mir",
   "titulo": "MIR D10/78 · Cardiología — Riesgo cardiovascular. Prevención de las ECVA a través del control de los FRCV",
   "totalMin": 60,
   "pasos": [
    {
     "min": 7,
     "que": "15:15–15:22 · EVAL ANCLADA 4Q · 2Q D-1 (D9 Valvulopatías) + 1Q D-3 (D7 Cardiopatía isquémica) + 1Q D-7 (D3 Evaluación de pruebas diagnósticas)",
     "como": "Cronómetro 6′ (77 s/Q), en blanco si no descartas 2 · preguntas: las listadas (citadas ProMIR de lo que leíste ese día, no usadas) · si la app te propone un tema 🔥 caliente (gate), manda la app."
    },
    {
     "min": 5,
     "que": "15:22–15:27 · Anki APEX::MIR::cardiologia",
     "como": "FSRS · solo Good/Again · deuda a cero; si no hay repasos, revisa las tarjetas de ayer."
    },
    {
     "min": 3,
     "que": "15:27–15:30 · Log de la eval en la app",
     "como": "aciertos/4 · brecha knowledge / transfer / proceso · fallo D-7 → cola D+14 · slot ✗ → tema caliente mañana."
    },
    {
     "min": 8,
     "que": "15:30–15:38 · PRE-TEST 5Q ciegas del capítulo nuevo (5 del pool oficial de la app)",
     "como": "Sin leer nada · 77 s/Q · registra en la app (kind pretest) · cada fallo = una sección «gap» (la guía dice en qué sección cae cada pregunta)."
    },
    {
     "min": 15,
     "que": "15:38–15:53 · LECTURA DIRIGIDA 15′ · Orientación MIR (1′) + 4.1. Pacientes de muy alto riesgo cardiovascular (1′ · 5 preguntas MIR citadas) · 6.4. Prevención de la enfermedad cardiovascular en el diabético y prediabético (12′ · 12 preguntas MIR citadas)",
     "como": "Orden: primero la sección de cada pregunta FALLADA en el pre-test; las secciones cuyas preguntas acertaste se saltan y entra la reserva (5.1. Abandono del tabaco 2′ · 7.7. Dislipemia en poblaciones especiales 13.5′ · 7.5. Fármacos para el tratamiento de las dislipemias 8.5′). Whole Page Rule: lee el apartado entero, no frases sueltas; por cada fallo escribe en el Shopping List la regla que lo habría resuelto. Ritmo de referencia 180 palabras/min. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.",
     "enlace": {
      "t": "ProMIR · Riesgo cardiovascular. Prevención de las ECVA a través del control de los FRCV",
      "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc658"
     }
    },
    {
     "min": 12,
     "que": "15:53–16:05 · 8Q comentadas (máx. 10) · preguntas MIR citadas en las secciones que acabas de leer",
     "como": "Rule-In → Rule-Out · tapa las opciones y contesta antes de verlas · 77 s/Q + lee el comentario · registra en la app (kind quiz): <60 % = tema caliente mañana · orden: el de la lista (pool de la app primero, luego las citadas, más recientes primero); a las 16:05 paras donde estés. Pool oficial de la app para este capítulo: 5Q (todas en el pre-test) → el quiz sale de las 44 preguntas MIR citadas en el capítulo."
    },
    {
     "min": 10,
     "que": "16:05–16:15 · ≤4 APEX en APEX::MIR::cardiologia",
     "como": "Desde el Shopping List: pregunta SAQ + por qué + 🇪🇸 delta si aplica + tag sys:: del sistema USMLE · 1 de cada 4 con imagen · creados directamente en Anki."
    }
   ],
   "recursos": [
    {
     "t": "ProMIR · Riesgo cardiovascular. Prevención de las ECVA a través del control de los FRCV (capítulo completo)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc658",
     "min": 75.5,
     "cantidad": "10.829 palabras de texto + 419 en tablas · 24 secciones · 16 figuras · 5 tablas · audio «escuchar todo el tema» (duración no medida)"
    },
    {
     "t": "Preguntas MIR citadas en el capítulo (chips «MIR AAAA-AAAA, Pnnn» → /pregunta/MIR/…)",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc658",
     "cantidad": "44 (≥2015: 25 · ≥2020: 22)"
    },
    {
     "t": "Pool oficial de la app (MIR 2022-2026) de este capítulo",
     "url": "https://promir.medicapanamericana.com/capitulo/570779c8f4d68bf008dbc658",
     "cantidad": "5Q (2022-127 · 2023-210 · 2024-175 · 2026-110 · 2026-140)"
    }
   ],
   "hecho": "Eval registrada + Anki a cero + pre-test 5Q registrado + lectura de las secciones gap (o de la lista) + ≥8Q del quiz registradas + ≤4 APEX creados.",
   "planB": "Si ProMIR no abre: pre-test y quiz con el pool oficial de la app (pestaña MIR → registro: 5Q del capítulo + 83 de Cardiología) y lectura en la nota madre de Obsidian (◆ Obsidian) o en el resumen de rabi_94 (Drive). Día roto (modo mínimo): Anki a cero + 4Q ancladas (15′)."
  },
  "preguntas": {
   "pretest": [
    {
     "id": "2021-127",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-127",
     "seccion": "5.1. Abandono del tabaco",
     "pool": "2022-127"
    },
    {
     "id": "2022-210",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-210",
     "seccion": "5.1. Abandono del tabaco",
     "pool": "2023-210"
    },
    {
     "id": "2023-175",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-175",
     "seccion": "4.1. Pacientes de muy alto riesgo cardiovascular",
     "pool": "2024-175"
    },
    {
     "id": "2025-110",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-110",
     "seccion": "3. Cálculo de riesgo cardiovascular total",
     "pool": "2026-110"
    },
    {
     "id": "2025-140",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-140",
     "seccion": "4.1. Pacientes de muy alto riesgo cardiovascular",
     "pool": "2026-140"
    }
   ],
   "quiz": [
    {
     "id": "2025-187",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2025-187",
     "seccion": "6.4. Prevención de la enfermedad cardiovascular en el diabético y prediabético"
    },
    {
     "id": "2023-190",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2023-190",
     "seccion": "6.4. Prevención de la enfermedad cardiovascular en el diabético y prediabético"
    },
    {
     "id": "2022-194",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-194",
     "seccion": "6.4. Prevención de la enfermedad cardiovascular en el diabético y prediabético"
    },
    {
     "id": "2022-159",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-159",
     "seccion": "6.4. Prevención de la enfermedad cardiovascular en el diabético y prediabético"
    },
    {
     "id": "2022-057",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2022-057",
     "seccion": "6.4. Prevención de la enfermedad cardiovascular en el diabético y prediabético"
    },
    {
     "id": "2021-050",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2021-050",
     "seccion": "6.4. Prevención de la enfermedad cardiovascular en el diabético y prediabético"
    },
    {
     "id": "2020-165",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2020-165",
     "seccion": "6.4. Prevención de la enfermedad cardiovascular en el diabético y prediabético"
    },
    {
     "id": "2020-164",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2020-164",
     "seccion": "6.4. Prevención de la enfermedad cardiovascular en el diabético y prediabético"
    },
    {
     "id": "2015-084",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2015-084",
     "seccion": "4.1. Pacientes de muy alto riesgo cardiovascular"
    },
    {
     "id": "2014-088",
     "url": "https://promir.medicapanamericana.com/pregunta/MIR/2014-088",
     "seccion": "6.4. Prevención de la enfermedad cardiovascular en el diabético y prediabético"
    }
   ],
   "eval": [
    {
     "slot": "D-1",
     "d": 9,
     "tema": "Valvulopatías",
     "qs": [
      {
       "id": "2010-046",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2010-046",
       "seccion": "5.4. Enfoque diagnóstico"
      },
      {
       "id": "2009-050",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2009-050",
       "seccion": "2.5. Tratamiento"
      }
     ]
    },
    {
     "slot": "D-3",
     "d": 7,
     "tema": "Cardiopatía isquémica",
     "qs": [
      {
       "id": "2005-027",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2005-027",
       "seccion": "3.6. Complicaciones del infarto agudo de miocardio"
      }
     ]
    },
    {
     "slot": "D-7",
     "d": 3,
     "tema": "Evaluación de pruebas diagnósticas",
     "qs": [
      {
       "id": "2012-195",
       "url": "https://promir.medicapanamericana.com/pregunta/MIR/2012-195",
       "seccion": "3.2. Índices de validez diagnóstica"
      }
     ]
    }
   ]
  },
  "lectura": {
   "minUsados": 14,
   "minCapitulo": 75.5,
   "paraLa2aVuelta": 62.5
  }
 }
};

/** Nº de preguntas del pool oficial (MIR 2022-2026, no anuladas) por capítulo del plan (capId) — regla del pre-test/quiz D11+. */
export const MIR_POOL_POR_CAP: Record<string, number> = {"570779c9f4d68bf008dbc7b1":5,"570779c9f4d68bf008dbc80d":5,"570779c9f4d68bf008dbc80f":3,"64a3be863f62ec1dbb3e665b":2,"570779c9f4d68bf008dbc7e9":4,"570779c9f4d68bf008dbc78d":12,"570779c9f4d68bf008dbc731":6,"64588d5ef704295c924d9289":9,"570779c8f4d68bf008dbc65a":10,"570779c8f4d68bf008dbc658":5,"570779c8f4d68bf008dbc6b6":7,"570779c9f4d68bf008dbc825":7,"570779c9f4d68bf008dbc861":3,"570779c9f4d68bf008dbc773":5,"570779c9f4d68bf008dbc883":7,"570779c9f4d68bf008dbc7cd":5,"570779c8f4d68bf008dbc608":12,"570779c8f4d68bf008dbc6b0":3,"570779c9f4d68bf008dbc789":4,"570779c8f4d68bf008dbc60a":3,"570779c9f4d68bf008dbc72d":6,"570779c8f4d68bf008dbc654":1,"570779c9f4d68bf008dbc723":10,"570779c8f4d68bf008dbc64c":14,"570779c8f4d68bf008dbc6a6":4,"570779c8f4d68bf008dbc64a":4,"570779c8f4d68bf008dbc6a8":17,"570779c8f4d68bf008dbc600":9,"570779c8f4d68bf008dbc5fe":10,"570779c9f4d68bf008dbc77f":8,"570779c9f4d68bf008dbc737":17,"570779c8f4d68bf008dbc65e":12,"570779c9f4d68bf008dbc7ef":2,"570779c8f4d68bf008dbc6ba":4,"570779c9f4d68bf008dbc793":5,"570779c9f4d68bf008dbc7f1":8,"570779c9f4d68bf008dbc871":7,"570779c9f4d68bf008dbc895":11,"570779c9f4d68bf008dbc8a9":8,"570779c9f4d68bf008dbc873":7,"570779c9f4d68bf008dbc7dd":5,"570779c9f4d68bf008dbc897":4,"570779c9f4d68bf008dbc8ab":7,"57ed1550e68c512d007426d1":14,"570779c8f4d68bf008dbc6e0":4,"570779c9f4d68bf008dbc7b3":3,"570779c9f4d68bf008dbc759":6,"570779c9f4d68bf008dbc7b5":2,"570779c8f4d68bf008dbc6ec":5,"570779c9f4d68bf008dbc7c1":5,"570779c9f4d68bf008dbc765":3,"570779c8f4d68bf008dbc6e8":2,"570779c8f4d68bf008dbc6e6":2,"570779c9f4d68bf008dbc81b":3,"570779c9f4d68bf008dbc81f":2,"570779c9f4d68bf008dbc763":6,"570779c9f4d68bf008dbc73f":1,"570779c8f4d68bf008dbc66a":2,"570779c9f4d68bf008dbc743":7,"570779c9f4d68bf008dbc745":1,"570779c8f4d68bf008dbc6c6":5,"570779c9f4d68bf008dbc741":2,"570779c9f4d68bf008dbc8af":10,"570779c9f4d68bf008dbc83f":6,"570779c9f4d68bf008dbc89d":11,"570779c9f4d68bf008dbc7e3":1,"570779c9f4d68bf008dbc89b":3,"570779c9f4d68bf008dbc879":3,"570779c8f4d68bf008dbc6e2":5,"570779c9f4d68bf008dbc815":7,"570779c9f4d68bf008dbc84f":3,"570779c9f4d68bf008dbc7b9":13,"570779c9f4d68bf008dbc817":3,"570779c9f4d68bf008dbc889":14,"570779c9f4d68bf008dbc865":4,"570779c9f4d68bf008dbc777":7};
/** Nº de preguntas del pool oficial por asignatura (num) — tests de cierre. */
export const MIR_POOL_POR_ASIG: Record<number, number> = {"3":83,"6":57,"7":66,"8":25,"11":76,"14":50,"15":34,"17":23,"18":38,"19":50,"20":61,"24":40,"26":40,"28":42};
