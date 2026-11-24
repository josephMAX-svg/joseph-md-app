/**
 * gen_usmle_guia.js — genera src/lib/usmleGuia.ts: la GUÍA «qué · cuánto · cómo» de CADA franja del Step 1 en F1 (D1-D42 en la v6.06 + fines de
 * semana) y, v6.05b, de las filas de F1 DESPLAZADAS al tramo 2 (v6.06: T3-T18 + el NBME 29 de T2 y los días de cola de vídeo T19-T23, plantilla F3),
 * en el formato común `GuiaBloque` de src/lib/guia.ts.
 *   node DATA/_scripts/usmle/gen_usmle_guia.js            → escribe src/lib/usmleGuia.ts (aborta si un bloque no cuadra)
 *   node DATA/_scripts/usmle/gen_usmle_guia.js --check    → regenera en memoria y compara con el fichero (exit 1 si difiere)
 *   node DATA/_scripts/usmle/gen_usmle_guia.js --informe <ruta.md>  → además escribe la tabla de la semana 1 + el reparto F1
 * Entradas (nada a mano en el .ts):
 *   · las filas REALES de F1 (src/lib/usmleStep1Daily.ts vía cargar_ts.js: fechas, D#, sub, nivelUW, qDia, palm) — este script NO
 *     cambia fechas, D#, hitos ni niveles (el plan vigente de _fechas_v6.json, hoy v6.06, intacto);
 *   · catálogos verificados el 18-oct-2026: DATA/USMLE/qbankly_bb_step1_videos.tsv (491 vídeos B&B con duración) ·
 *     qbankly_uworld_step1_filtros.tsv (13 Subjects + 169 Systems con nº de preguntas) · qbankly_uworld_step1_matriz.tsv (Subject × System) ·
 *     qbankly_mehlman_step1_sistemas.tsv (respaldo) · qbankly_hitos_step1.tsv (UWSA/NBME: bloques reales) · STUDY_HUB/_scrape/qbankly_libs_full.json;
 *   · el mapeo D# → recursos de guia_catalogo_f1.js (con AVISO visible cuando no es exacto).
 * Reglas de carga (decisión E1 del 18-oct, «vamos despacio, desde cero con el inglés»):
 *   · VELOCIDAD de vídeo: D1-D2 1,0× con subtítulos en inglés · desde el D3 (v6.09; antes desde el D6) hasta el D15 1,25× · desde S4 (D16)
 *     1,5× — se sube SOLO si el free recall de 90 s del último vídeo recoge ≥3 ideas; si no, te quedas en la velocidad anterior (el reparto
 *     de abajo usa la nominal). Minutos reales = duración ÷ velocidad × 1,2 (D1-D2) / × 1,15 (desde el D3) por las pausas para anotar.
 *   · El vídeo del TEMA NUEVO solo se ve DESPUÉS del pre-test ciego de las 08:15 (deep prime 09:00, máx. 70′ de vídeo real; el resto de la
 *     franja = lectura ≥25′ + ≤10 tarjetas 20′ + free recall 5′). Lo que no cabe NO se recorta: pasa a la COLA y se ve en el «vídeo
 *     pendiente» de las 07:15 del día siguiente (≤30′; v6.09: nunca a las 05:00, antes del D3 al D5 también ahí) o en el
 *     hueco libre de un deep prime posterior. Los vídeos Palmerton «High Yield <sistema>» (visión del sistema, 40′-2 h 45′) entran a la
 *     cola detrás de los B&B y se ven por tramos con su minuto de inicio y fin.
 *   · Nivel 1 (S1): ≤30 preguntas NUEVAS al día sumando todas las franjas; todo en Tutor sin reloj salvo los hitos. Cada subtema: 10Q
 *     el día que se estudia (2 bloques de 5, 11:00) + 5Q a las 07:15 del día siguiente (validación 24 h); gate ≥8/10 y ≥4/5; si falla,
 *     1 bloque extra de 5Q (dentro del tope). Desde S2 rigen nivelUW/qDia del plan (N1 30Q · N2 40Q · N3 40Q).
 *   · Si el System de uWorld no tiene las preguntas pedidas: (1) todas las Unused del System; (2) los Systems hermanos del catálogo;
 *     (3) el mismo subtema en «Mehlman - Step 1 QBank - 2026» (qbankly_mehlman_step1_sistemas.tsv); nunca preguntas fuera del tema.
 *   · Day-After de cada hito (~4 h, Palmerton §9.2): repartido en franjas existentes (18:00 del hito, 07:15 del día siguiente y las 18:00
 *     de los 3-4 días siguientes), sin tocar el subtema de esos días.
 * v6.02c (18-oct-2026, E1): nuevo.
 * v6.02c F2 (18-oct-2026, hallazgos E6): lun 19 · los 2 Palmerton de método (FSRS · «The ONLY video») con la regla de minutos de la semana 1
 *   (duración × 1,2 a 1,0×) y repartidos sin recortar (lo que no cabe → cabeza de la cola: D3 05:00) · la preparación del UWSA1 se parte en
 *   07:15-07:25 y 07:55-08:50 (el SYNAPSE de las 07:25 sale una sola vez, en su tarjeta) · capítulos B&B exactamente como en el catálogo (sin «(NEW)»).
 * v6.03 (20-oct-2026): corrimiento del D1 lun 19-oct → mié 21-oct (lun 19 y mar 20 sin estudio; F1 = 50 filas, mié 21-oct → mié 30-dic).
 *   El guion NO cambia (mismo D#, mismos bloques, mismos minutos): D1 UWSA1 + Day-After 1/6 · D2 Day-After 2/6-4/6 · D3 5/6 · D4 6/6 + eval
 *   reducida · D5 eval de cierre D1-D5; lo que cambia es la FECHA de cada D#, que ahora se DERIVA de las filas: nada de «lun 19», «martes»,
 *   «2026-10-24» ni «52 filas» escrito a mano (guarda contra _fechas_v6.json; «ayer»/«mañana» → la fecha real cuando hay fin de semana en
 *   medio: D3 vie 23 → D4 lun 26). El catálogo se lee por el ORIGEN v5.20 de cada d (colocarF1): las filas v5.20 D50 (Neuro) y D51
 *   (Heme/Onco) ya no son de F1 → sus recursos quedan en guia_catalogo_f1.js y se listan en META.bbDesplazadasTramo2 (T3/T4). Sáb 24 y
 *   dom 25-oct = solo lo nativo del fin de semana (Anki sáb 19:00 · dom 17:00 opcional).
 * v6.05 (24-oct-2026): corrimiento del D1 mié 21-oct → lun 26-oct (la semana del 19 sin estudio; F1 = 47 filas, lun 26-oct → mié 30-dic).
 *   Mismo guion por D# (sin cambio de bloques ni minutos): D1 lun 26 UWSA1 08:50-13:00 (07:15 localizar · 07:25 SYNAPSE · 07:55 vídeo de
 *   método + peor escenario · Day-After 1/6 a las 18:00) · D2 mar 27 · D3 mié 28 · D4 jue 29 · D5 vie 30 (ya sin fin de semana en medio:
 *   el aviso del Day-After lo dice solo si hay sábado/domingo entre el D1 y el D4) · sáb 31-oct / dom 1-nov = solo Anki. Las filas v5.20
 *   D47-D50 (Neuro) y D51 (Heme/Onco) ya no son de F1 → META.bbDesplazadasTramo2 (T3-T7). Lo que no cabe en el último día de contenido
 *   (D46: vídeos B&B de fármacos autonómicos + el resto del Palmerton Neuro Part 2) NO se recorta: queda en META.colaAlCierreF1 y su aviso
 *   lo manda al tramo 2 (T3, con Neuro).
 * v6.05b (24-oct-2026, verificación adversarial): (1) la cola al cierre de F1 (≈82′ de B&B de fármacos autonómicos del D46 + 61′ del Palmerton
 *   Neuro Part 2 del D45) ya NO se queda sin día: el reparto sigue en el tramo 2 (SEQ = F1 + DIAS_T2 hasta la última desplazada) con las MISMAS
 *   capacidades por franja (07:15 «vídeo pendiente» ≤30′ salvo el día siguiente a un hito · hueco del deep prime 09:00) → T4 vie 19-mar 07:15 +
 *   09:00 · T5 lun 22-mar 07:15 + 09:00 · T6 mar 23-mar 07:15; lo que deja la última desplazada va al «vídeo pendiente» 07:15-07:45 de las
 *   filas siguientes del tramo 2 (días de cola, F3) hasta vaciarla; si no se vacía, ABORTA (META.colaAlCierreTramo2 siempre []) y destinoDe()
 *   sin franja es un error. (2) GUÍA de las 11 desplazadas (v5.20 D47-D54, D56, D57, D79) en su fecha T con el MISMO guion por D# (anki0500 ·
 *   repaso0715/dayAfter0715 · pretest · deepPrime · consolidacion · eval18) + 16:15 REENTRADA (reentrada1615, F3) y la del NBME 29 (T2, hitoNBME:
 *   su Day-After 1/6-6/6 cae en T2-T6 como en F1); franjas leídas de plantillasV6.ts › bloquesF3 + FRANJA_F3_REENTRADA (aborta si un bloque cae
 *   fuera) · catálogo: guia_catalogo_f1.js + D52-D54, D56, D57, D79 (nuevos) · SUBTEMA APEX del tramo 2 con el D# v5.20 (47_…, 65_nbme29) · la
 *   bioestadística a ::Biostatistics · consolidación de nivel 4 (viernes N4 del tramo 2; F1 no tiene). F1: solo cambian los avisos del D45/D46
 *   (destino explícito T4-T6 en vez de «→ TRAMO 2»). Controles: verificar_v6.js «guía USMLE».
 * v6.06 (31-oct-2026): corrimiento del D1 lun 26-oct → lun 2-nov (la semana del 26-oct sin estudio; F1 = 42 filas, lun 2-nov → mié 30-dic).
 *   Sin cambio de lógica: mismo guion por D# (D1 lun 2-nov UWSA1 08:50-13:00 · 07:15 localizar · 07:25 SYNAPSE · 07:55 vídeo de método +
 *   peor escenario · Day-After 1/6 a las 18:00 · D2 mar 3 · D3 mié 4 · D4 jue 5 · D5 vie 6-nov · sáb 7 / dom 8-nov = solo Anki). El NBME 27
 *   pasa al D35 vie 18-dic (gen_tramo2.slotsHitosF1: Day-After completo antes del NBME 28) y su Day-After 2/6-6/6 cae en D36-D39 (lun 21 → jue
 *   24-dic) por la misma regla trasHito (n ≤ 4). Las 16 desplazadas (v5.20 D42 Endocrino, D43-D50 Neuro, D51-D54, D56, D57 Heme/Onco, D79)
 *   llevan su guía en T3-T18; la cola al cierre de F1 (Endocrino del D38-D41: B&B suprarrenal/DM + Palmerton High Yield Endocrinology) se ve
 *   en T4-T5 y lo que deja T18 en los días de cola T19-T23 (07:15-07:45). Nada a mano: todo sale de las filas y de colocarF1.
 * v6.07 (8-nov-2026): F1 del Step = solo las mañanas de step1.f1_dias_semana (mar · jue): D1 = UWSA1 mar 10-nov 08:50-13:00 (07:15 localizar ·
 *   07:25 SYNAPSE · 07:55 vídeo de método + peor escenario · almuerzo 13:00) · D2 jue 12 · D3 mar 17 · D4 jue 19 · D5 mar 24-nov · NBME 25 = D10
 *   jue 10-dic con su Day-After en D11-D14 (mar 15 → jue 24-dic) · D15 mar 29-dic. Mismo guion por D# (los textos «ayer»/«mañana» ya salían de
 *   la distancia real entre fechas: entre dos días de Step hay 2 o 5 días → «el jue 12-nov», «a las 48 h»; lo que decía «tras el fin de
 *   semana» ahora dice «tras los días sin Step»). F1 compara con DERIVADOS diasStepF1 (no con f1.dias, que es la fase L-V de todos los
 *   planes). Los días de F1 SIN Step (lun · mié · vie: mañana ENCAPS) llevan solo el ANKI AM USMLE 05:00-05:30 (vencidas; 15′ de repasos
 *   ENCAPS van detrás, en su plan) y la revisión semanal del sábado pasa a las 14:00. Tramo 2: la guía por franja cubre las desplazadas que caen
 *   en F3 (plantilla F3) y los hitos de F1 desplazados con su Day-After repartido (NBME 26/27, como el NBME 29); las desplazadas que caen en
 *   F4 (partidas, plantilla por turno M/T/L/G) no llevan guía por franja: van en META.desplazadasF4SinGuia.
 * v6.08 (14-nov-2026): re-fecha real, D1 de todo = lun 16-nov: D1 = UWSA1 mar 17-nov (mismo guion: 07:15 localizar · 07:25 SYNAPSE · 07:55 vídeo
 *   de método + peor escenario · 08:50-13:00 · almuerzo 13:00) · D2 jue 19 · D3 mar 24 · D4 jue 26-nov · D5 mar 1-dic · NBME 25 = D8 jue 10-dic
 *   (adelantado una semana de plan de 2 filas) con su Day-After en D9-D12 (mar 15 → jue 24-dic) · D13 mar 29-dic. Desplazadas con guía en F3 =
 *   T3-T32 (v5.20 D14-D43 + NBME 26 T14 / NBME 27 T29 con su Day-After en franjas). NUEVO: el NBME 27 cae en T29 (mar 27-abr) y la 4.ª fila
 *   tras él (T33, lun 3-may) ya es F4 (SERUMS, plantilla por turno, sin 18:00) → el 6/6 de su Day-After no tiene franja: el hito y el 5/6 lo
 *   avisan (⚠ DECISIÓN DE JOSEPH) y META.dayAfterSinFranja lo lista (verificar_v6.js lo comprueba: nada desaparece sin aviso).
 * v6.09 · lote 1 (mar 17-nov-2026, auditoría tiempo ↔ material a1-11 · a1-13 · a1-15; SOLO F1 — todo lo ≥ 4-ene-2027 sale idéntico):
 *   (1) CONTRATO del Anki 05:00 con encapsManana (gen_encaps_manana.js lee esta guía): USMLE 05:00-05:30 los mar · jue y 05:00-05:20 los lun · mié · vie y
 *       el jue 31-dic (nueva guía: Step 1 en pausa, solo vencidas); el resto hasta las 05:45 es de ENCAPS. Excepciones: mar 17 (D1) = configuración
 *       05:00-05:45 · mié 18 = mazo aún vacío + 15 incorrectas del triaje del UWSA1 (el D2 hace 28: su franja ya es de 30′).
 *   (2) la cola de vídeo NUNCA a las 05:00 (antes del D3 al D5) → 07:15 · 1,25× × 1,15 desde el D3 (la regla de S2; absorbe esos 90′: la cola al cierre
 *       de F1 sigue siendo el Palmerton «High Yield Cardiology Part 2» entero) · un vídeo no se parte si el resto sería < 3′ (NO_PARTIR).
 *   (3) consolidación de F1: N1 = 15Q Tutor a 3′ + revisión 12′ + gate 3′ · N2 = 25Q TIMED + revisión 21′ + gate 2′; las 5Q que faltan → la EVALUACIÓN
 *       ACUMULATIVA de las 18:00 (15Q) o, si las 18:00 son Day-After, las 07:15 del siguiente día de Step (cincoDe). La contabilidad de uWorld no cambia.
 * v6.09b · lote 1-bis (mar 17-nov-2026, pasos de F1 fuera de 0,85-1,15 con las reglas de la auditoría; SOLO F1 — todo lo ≥ 4-ene-2027 sale idéntico; la
 *   contabilidad de uWorld (QS), el tope de 30 nuevas/día de la semana 1 y el presupuesto de tarjetas no cambian; el re-test de Status Incorrect no gasta
 *   preguntas nuevas):
 *   (1) D2 pre-test: 8Q uWorld (todas las que tiene) + 2Q ciegas de Mehlman «Inflammation and repair» (uWorld solo tiene 2 de inflamación) = 10Q en 30′.
 *   (2) D4 18:00: eval reducida = 5Q nuevas + 5 re-test de Status Incorrect (10Q TIMED 15′ + corrección 9′); antes 5Q con 16′ de corrección (0,27).
 *   (3) D5 18:00: cierre de la semana 1 = 5Q nuevas + 10 re-test de Status Incorrect (15Q TIMED 23′ + corrección 13′); antes 10Q con 17′ (0,50).
 *   (4) 6/6 del Day-After de un NBME de F1 (D12): 10Q mixtas + 2 re-test (12Q TIMED 18′ + corrección 9′); antes 10Q con 12′ de corrección (0,71).
 *   (5) 07:15: la validación de 5Q TIMED lleva su revisión (11′ = 5 × 90 s + 5 × 0,85′; antes 10′ sin revisión explícita) y la shopping list 1′ menos:
 *       el vídeo pendiente y el reparto de la cola no cambian.
 *   (6) Palmerton «High Yield» de F1: el texto dice las pausas para anotar que ya llevaban sus minutos (× 1,15); antes «escucha y anota» (0,82-0,87).
 * v6.03b (20-oct-2026): MÉTODO ANKI · APEX dentro de los pasos existentes (mismas franjas, mismos minutos por bloque), según
 *   DATA/USMLE/METODO_ANKI_APEX_USMLE.md (Palmerton vía NotebookLM con citas + Tutorías MI + PALMERTON_*.md): D1 05:00 = configuración
 *   EXACTA (preset «APEX USMLE» en el padre + «Save to All Subdecks»: FSRS 90 % · 20 nuevas/día · 9999 repasos/día · repasos antes que
 *   nuevas · steps por defecto · día nuevo a las 4 h; antes decía 200 repasos/día, que oculta vencidas) · Anki AM = vencidas primero sin
 *   tope + Good/Again + nuevas solo con vencidas a 0 + telemetría (% Again) · tope de CREACIÓN 20 tarjetas/día repartido por bloque
 *   (deep prime ≤10 · consolidación ≤4/3/2 según nivel · eval ≤5 · comprimida ≤3 · PC cards del Day-After primero) con la cabecera APEX
 *   del día (ESPECIALIDAD/SUBTEMA/FUENTE/MODO válidos para el parser v2.3.2: «General» no existe en el motor → Pathology) · sábado =
 *   vencidas + «Save to All Subdecks» (+ FSRS Optimize a las 4 semanas) + Stats · domingo opcional con la postura de Palmerton.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { ROOT, cargarUsmleDaily, cargarModuloTS } = require('./cargar_ts');
const { MAPA, PALM, PATHOMA } = require('./guia_catalogo_f1');

const argv = process.argv.slice(2);
const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
const CHECK = argv.includes('--check');
const INFORME = opt('--informe');
const OUT = path.join(ROOT, 'src', 'lib', 'usmleGuia.ts');
const DU = path.join(ROOT, 'DATA', 'USMLE');
const aborta = (m) => { console.error('✗ ' + m + ' — ABORTO, no se escribe src/lib/usmleGuia.ts'); process.exit(1); };

// ── catálogos ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const tsv = (f) => fs.readFileSync(path.join(DU, f), 'utf8').split(/\r?\n/).filter((l) => l && !l.startsWith('#')).map((l) => l.split('|'));
const BB = new Map(); // id → { cap, sec, nombre, s }
for (const [cs, id, nombre, s] of tsv('qbankly_bb_step1_videos.tsv')) { const [cap, sec] = cs.split(' > '); BB.set(Number(id), { cap, sec, nombre, s: Number(s) }); }
const UWS = new Map(); const UWY = new Map();
for (const [t, id, nombre, q] of tsv('qbankly_uworld_step1_filtros.tsv')) (t === 'S' ? UWS : UWY).set(Number(id), { nombre, q: Number(q) });
const MAT = new Map(); // `${s}:${y}` → n
for (const [s, , y, , n] of tsv('qbankly_uworld_step1_matriz.tsv')) MAT.set(`${s}:${y}`, Number(n));
const MH = new Map();
for (const [id, nombre, q] of tsv('qbankly_mehlman_step1_sistemas.tsv')) MH.set(Number(id), { nombre, q: Number(q) });
const LIBJ = JSON.parse(fs.readFileSync(path.join(ROOT, 'STUDY_HUB', '_scrape', 'qbankly_libs_full.json'), 'utf8'));
const HITOS = new Map(); // nombre del QBank → { id, q, bloques: [n por bloque] } (qbankly_hitos_step1.tsv)
for (const [id, nombre, , q, subj] of tsv('qbankly_hitos_step1.tsv')) HITOS.set(nombre, { id: Number(id), q: Number(q), bloques: subj.split(' · ').map((x) => Number(x.trim().split(' ').pop())) });
const LIB = new Map(); // `${e}:${doc}` → nombre
for (const [k, e] of [['epub1', 1], ['epub2', 2], ['epub3', 3]]) for (const s of LIBJ.libs[k] || []) for (const t of s.topics || []) if (t.doc) LIB.set(`${e}:${t.doc}`, t.name.replace(/\s+/g, ' ').trim());

const U = cargarUsmleDaily();
const F1 = U.DIAS; // v6.03: 50 filas (mié 21-oct → mié 30-dic) · v6.02: 52 (lun 19-oct → mié 30-dic)
// v6.03: la F1 esperada sale de _fechas_v6.json (antes: 52 filas y '2026-10-19' fijos)
const FV6 = require('../gen_fechas_v6').cargarFechasV6();
// v6.09 (16-nov-2026): la etiqueta de versión de los textos es la del PLAN del Step 1 que describe la guía (DAILY_META.version de usmleStep1Daily.ts):
//   la v6.09 no cambia el Step 1 (el lun 16 no era día de Step), así que sigue diciendo «v6.08» y la guía de 2027 queda idéntica. Lo único que cambia
//   al regenerar con el _fechas_v6.json v6.09 es que el lun 16-nov ya no está en F1 (f1.inicio = mar 17) y pierde su Anki AM («F1 empieza hoy…»).
const VER = (U.DAILY_META && U.DAILY_META.version) || FV6.version;
// v6.10h (18-nov-2026 · regla de Joseph: los textos que lee no llevan bitácora): el aviso del NBME ya no cita «plan v6.08 / v6.10» (antes VER_T2 = 'v6.08'
//   en las filas del tramo 2) ni los avisos del Anki AM «v6.10: …»; VER queda solo en los metadatos y en los mensajes de aborto.
// v6.09 (fix revisión 16-nov, joseph 1): la 1.ª mañana ENCAPS (1.ª fila de DATA/ENCAPS/_encaps_manana_v607.json; v6.09: mié 18-nov): hasta ese día
//   incluido no hay tarjetas ENCAPS (las primeras nacen a las 11:40 de esa mañana) → el Anki AM de ese día no pide repasos de ENCAPS
const PRIMERA_ENCAPS = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA', 'ENCAPS', '_encaps_manana_v607.json'), 'utf8')).mananas[0] || null; } catch (e) { return null; } })();
// v6.07: el tramo 1 del Step = las mañanas de step1.f1_dias_semana dentro de F1 (V6.diasStepF1De; con L-V = los f1.dias hábiles)
const V6 = require('../gen_fechas_v6');
const STEP_F1 = V6.diasStepF1De(FV6), DSEM = V6.diasSemanaTxt(FV6.step1.f1_dias_semana);
if (F1.length !== STEP_F1.length || F1[0].fecha !== STEP_F1[0] || F1[F1.length - 1].fecha !== STEP_F1[STEP_F1.length - 1]) aborta(`F1 de usmleStep1Daily.ts (${F1.length} filas, ${F1[0] && F1[0].fecha} → ${F1.length ? F1[F1.length - 1].fecha : '—'}) ≠ _fechas_v6.json ${VER} (${STEP_F1.length} mañanas de Step ${DSEM}, ${STEP_F1[0]} → ${STEP_F1[STEP_F1.length - 1]}): corre antes gen_usmle_v5.js + assemble_usmle_ts.js`);
// v6.10b (17-nov-2026, decisión 4 de Joseph): el UWSA1 salió de F1 (→ tramo 2, T82) y F1 empieza en el D2 (jue 19-nov, nivel 0). El guion del nivel 0
//   (D2-D4) y los filtros de A5 presuponen ESTE contenido por D#: si un corrimiento lo cambiara, aborta en vez de escribir textos falsos
{ const ESP = [[2, /lesión celular/], [3, /neoplasia/], [4, /Inmunidad innata/], [5, /Hipersensibilidades/]];
  const mal = ESP.filter(([d, re]) => { const x = F1.find((y) => y.d === d); return !x || !re.test(x.sub); }).map(([d]) => `D${d}`);
  if (mal.length || F1[0].d !== 2 || F1.some((x) => /UWSA1/.test(x.sub))) aborta(`el guion del nivel 0-1 (D2 lesión celular · D3 neoplasia · D4 inmunidad · D5 hipersensibilidad, sin UWSA1 en F1) no corresponde a las filas ${mal.join(', ') || '(1.ª fila D' + F1[0].d + ')'}`); }
const ANKI = (() => { try { return cargarModuloTS(path.join('src', 'lib', 'ankiLinks.ts')); } catch { return null; } })();
const deckDe = (row) => (ANKI ? ANKI.usmleAnkiDeck(row.system, row.matType) : 'APEX::USMLE::Pathology'); // v6.03: sin ankiLinks = Pathology (el parser APEX no acepta «General»)

// ── v6.03b · MÉTODO ANKI · APEX (DATA/USMLE/METODO_ANKI_APEX_USMLE.md) ───────────────────────────────────────────────────────────
// Ajustes y cuotas: Palmerton (NotebookLM «STEP 1 · Palmerton Engine», transcripción de «Give Me 30 Minutes and I'll 5X Your Anki
// Efficiency»: ≤50 nuevas/día —30-40 al empezar—, 9.999 repasos/día, retención 90 %, Good ≈90 % / Again ≈10 %, sin Hard/Easy) ajustado a
// la franja FIJA de 45′ del Anki AM (su calibración: ~1 h por 100 repasos y 1-2′ por tarjeta nueva) → tope de creación 20/día.
const AK = {
  nuevasDia: 20, maxRev: 9999, ret: '90 %', topeDia: 20, // v6.10u-b: desde Anki 25.02 «Desired retention» se escribe en % (70-99): «0,90» tecleado la deja en 70 %
  deepPrime: 10, consol: { 1: 4, 2: 3, 3: 2 }, eval: 5, evalComp: 3, evalRed: 3, exp: 3,
};
const METODO_MD = 'DATA/USMLE/METODO_ANKI_APEX_USMLE.md';
/** Los 44 tags USMLE que acepta el parser APEX v2.3.2 (agente_estudio · subtema_mapping.json › USMLE.tags_clinicos_a_crear, leído el
 *  20-oct-2026). ESPECIALIDAD fuera de esta lista = el motor RECHAZA el bloque («USMLE especialidad invalida»): no existe «General». */
const APEX_USMLE_TAGS = ['Aging', 'Anatomy', 'Anesthesiology', 'Behavioral_Science', 'Biochemistry', 'Biostatistics', 'Cardiology', 'Cell_Biology',
  'Critical_Care', 'Dermatology', 'Embryology', 'Emergency_Medicine', 'Endocrinology', 'Environmental_Medicine', 'Ethics', 'Family_Medicine',
  'Gastroenterology', 'Genetics', 'Geriatrics', 'Gynecology', 'Hematology_Oncology', 'Histology', 'Immunology', 'Infectious_Diseases',
  'Laboratory_Medicine', 'Microbiology', 'Neonatology', 'Nephrology', 'Neurology', 'Obstetrics', 'Occupational_Medicine', 'Oncology',
  'Orthopedics', 'Otolaryngology', 'Pain_Medicine', 'Pathology', 'Pathophysiology', 'Pediatrics', 'Pharmacology', 'Physiology', 'Psychiatry',
  'Pulmonology', 'Rheumatology', 'Surgery'];
/** v6.10r (jue 19-nov-2026, verificación EN VIVO del chat USMLE en el Anki de Joseph): APEX::USMLE YA EXISTE, vacío, con estos submazos (desde mayo): el
 *  preset «APEX USMLE» se crea desde sus propias Deck Options y Save to All Subdecks los cubre a todos. */
const APEX_USMLE_SUBMAZOS = ['Cardiology', 'Pulmonology', 'Gastroenterology', 'Pathology', 'Microbiology', 'Pharmacology', 'Biostatistics', 'Immunology'];
/** ESPECIALIDAD APEX del día: el tag del deck de ankiLinks salvo «General» (Fundamentos = patología general → Pathology). */
const espApex = (row) => { const t = deckDe(row).split('::').pop(); return t === 'General' ? 'Pathology' : /Biostatistics/i.test(row.uw || '') ? 'Biostatistics' : t; }; // v6.05: la bioestadística (v5.20 D79, T13) → ::Biostatistics (ankiLinks la manda a Psychiatry)
const deckApex = (row) => `APEX::USMLE::${espApex(row)}`;
const nn = (d) => String(d).padStart(2, '0');

// validación del catálogo contra los TSV/índices
for (const [d, m] of Object.entries(MAPA)) {
  for (const id of m.bb) if (!BB.has(id)) aborta(`D${d}: vídeo B&B ${id} no está en el catálogo`);
  for (const id of m.uw) if (!UWY.has(id)) aborta(`D${d}: System uWorld ${id} no existe`);
  for (const id of m.mh || []) if (!MH.has(id)) aborta(`D${d}: System Mehlman ${id} no existe`);
  for (const [e, doc] of m.lib) if (!LIB.has(`${e}:${doc}`)) aborta(`D${d}: Library e=${e} doc=${doc} no existe en el índice`);
  if (m.uwSub) for (const y of m.uwSub[1]) if (!MAT.has(`${m.uwSub[0]}:${y}`)) aborta(`D${d}: celda Subject ${m.uwSub[0]} ∩ System ${y} vacía`);
}

// ── utilidades ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// QBQ: verificado en vivo (lun 23-nov-2026): abre «Question Bank Library» (cada banco con su «Select»); el test, en su Dashboard › «+ New Test» (composer: 20Q ·
//   Unused · Tutor por defecto)
const QBQ = 'https://qbankly.app/qbanks', QBV = 'https://qbankly.app/videos';
const lib = (e, doc) => `https://qbankly.app/library?e=${e}&doc=${doc}`;
const yt = (id, t0) => `https://www.youtube.com/watch?v=${id}${t0 ? `&t=${t0}s` : ''}`;
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
const hms = (s) => (s >= 3600 ? `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` : mmss(s));
const DOW = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fd = (iso) => { const d = new Date(iso + 'T12:00:00Z'); return `${DOW[d.getUTCDay()]} ${d.getUTCDate()}-${MES[d.getUTCMonth()]}`; };
const esHito = (r) => /🎯/.test(r.sub);
// v6.02c F2 (E6): el capítulo se escribe EXACTAMENTE como en el catálogo (qbankly_bb_step1_videos.tsv, sin «(NEW)»)
const bbRuta = (id) => { const v = BB.get(id); return `B&B Step 1 › ${v.cap} › ${v.sec} › ${v.nombre}`; };
const uwNom = (id) => `«${UWY.get(id).nombre}» (${UWY.get(id).q})`;
const mhNom = (id) => `«${MH.get(id).nombre}» (${MH.get(id).q})`;
const libNom = (e, doc) => `${e === 1 ? 'uWorld Medical Library' : e === 3 ? 'PassMedicine' : 'AMBOSS'} · «${LIB.get(`${e}:${doc}`)}»`;
/** velocidad nominal y factor de pausas por D#
 *  v6.09 · lote 1 (17-nov-2026, auditoría tiempo ↔ material a1-15): desde el D3 (antes desde el D6) 1,25× si el free recall de 90 s del último vídeo
 *  recoge ≥3 ideas (la regla de subida que ya regía para S2 y S4) — absorbe la cola que antes se veía a las 05:00 (el Anki AM ya no lleva vídeo).
 *  Es la regla de S2 (1,25× × 1,15 por las pausas) adelantada al D3. Si el free recall no llega a 3 ideas: 1,0× (× 1,2) y lo que no quepa en la
 *  franja pasa a la cola (el «vídeo pendiente» de las 07:15 del siguiente día de Step).
 *  v6.10m (rev. c16, cambios #8 · diffs #20): sin segundos en la condición («si el free recall del último vídeo dio ≥3 ideas»): el paso de free recall da 60 o
 *  90 s por vídeo según sus minutos reales (frVideoTxt); «si no, 1,0×» queda dentro del corte de 110 del Calendar.
 *  v6.10p (ronda c18, área usmle-mir · #12): la regla de la velocidad sale del paréntesis y se cierra en «(si no, 1,0×)»; lo que no quepa a 1,0× va en su
 *  propia cláusula detrás. El Calendar corta el «cómo» a 110 justo tras «(si no, 1,0×)»: se ve la regla entera y nunca «si no, 1,0× …» a medias (antes el
 *  corte caía dentro del paréntesis y se perdía qué hacer con el vídeo que no cabe; el texto entero sigue en la app). */
const vel = (d) => (d <= 2 ? { v: 1.0, f: 1.2, txt: '1,0× con subtítulos en inglés (CC)' } : d <= 5 ? { v: 1.25, f: 1.15, txt: '1,25× con subtítulos en inglés (CC) si el free recall del último vídeo dio ≥3 ideas (si no, 1,0×) · lo que no quepa a 1,0× pasa a la cola: «vídeo pendiente» de las 07:15 del siguiente día de Step' } : d <= 15 ? { v: 1.25, f: 1.15, txt: '1,25× con subtítulos EN' } : { v: 1.5, f: 1.15, txt: '1,5× con subtítulos EN (solo si el free recall del último vídeo recogió ≥3 ideas; si no, 1,25×)' });
// v6.09b lote 1-quater FX1 (revisión V1 · mar 22-dic, «03 - Antihypertensives I de 22:00 a 25:25» en 4′ = 0,82): en F1 (d < 100), si el redondeo hacia arriba deja
//   el tramo por debajo de 0,85, se redondea al minuto más cercano (3,28′ → 3′ = 1,09); el tramo 2 (2027) sigue igual
const realMinV = (s, d, { v, f }) => { const x = (s / 60 / v) * f, c = Math.ceil(x); return d < 100 && x / c < 0.85 ? Math.max(1, Math.round(x)) : c; };
const realMin = (s, d) => realMinV(s, d, vel(d));
/** v6.10r (19-nov-2026, regla de la ronda: «vídeos de Palmerton a 1,0× con CC»): los Palmerton de MÉTODO van a 1,0× (× 1,2 por las pausas) en cualquier día,
 *  también su resto en la cola (D3 10:45: antes iba a la velocidad del día, 1,25×). Los B&B y los Palmerton High Yield siguen la velocidad del día (vel). */
const VEL_METODO = { v: 1.0, f: 1.2, txt: '1,0× con subtítulos en inglés (CC)' };
/** v6.10r (verificación EN VIVO del chat USMLE, 19-nov): YouTube puede arrancar un vídeo con doblaje automático; así se vuelve al audio original */
const AUDIO_EN = 'Settings › Audio track › Inglés (US) original';
const velDe = (it, d) => (METODO[it.id] ? VEL_METODO : vel(d));
/** v6.09b lote 1-quater FX1 (revisión V1 · modo Tutor): la regla fija del Tutor = pregunta 90 s + su explicación 0,85′ = 2,35′ por pregunta (antes «~3′»: 10Q en 30′ = 0,78) */
const TUTOR_Q = 2.35, tutMin = (n) => Math.round(n * TUTOR_Q), TUTOR_TXT = '90 s + 0,85′ de explicación = 2,35′ por pregunta';
/** FX1: los minutos que libera el Tutor (franja fija) van a First Aid, ACOTADO (no medible sin el libro: «acotado a N′», el texto lo dice) */
const faAcotado = (min, fa, que, destino) => P(min, `First Aid 2026 › ${fa}: ${que} (acotado a ${min}′)`, `No medible sin el libro abierto: acotado a ${min}′; marca dónde paras. Solo la página de cada duda, no la sección entera; lo que no llegue → ${destino}.`);


// ── índices de filas ─────────────────────────────────────────────────────────────────────────────────────────────────────────────
// v6.05 (24-oct): las filas de F1 DESPLAZADAS al tramo 2 (sub «DE F1 → TRAMO 2 …») llevan la MISMA guía por D# en su fecha T (plantilla F3)
//   → «ayer», D-3/D-7, el Day-After de un hito y el reparto de vídeo corren sobre SEQ = F1 + el tramo 2 hasta la última desplazada (con la
//   reentrada T1 y el NBME 29 T2 en medio: la reentrada no es «día de contenido» y el NBME reparte su Day-After en las desplazadas).
// v6.07: solo las desplazadas que caen ENTERAS en F3 (plantilla F3); las de F4 (partidas, plantilla por turno) no llevan guía por franja
const T2_DESPL_TODAS = U.DIAS_T2.filter((x) => x.tipo === 'contenido' && /^DE F1 → TRAMO 2/.test(x.sub));
const T2_DESPL = T2_DESPL_TODAS.filter((x) => x.fase === 'F3' && !x.parte);
const DESPL_F4 = T2_DESPL_TODAS.filter((x) => !T2_DESPL.includes(x));
if (T2_DESPL.length && DESPL_F4.length && DESPL_F4.some((x) => x.t < T2_DESPL[T2_DESPL.length - 1].t)) aborta('una desplazada de F4 queda entre desplazadas de F3: la guía del tramo 2 no puede saltarla');
const SEQ = [...F1, ...(T2_DESPL.length ? U.DIAS_T2.filter((x) => x.t <= T2_DESPL[T2_DESPL.length - 1].t) : [])];
const IDX = new Map(SEQ.map((r, i) => [r.d, i]));
const filaD = (d) => SEQ[IDX.get(d)];
/** v6.05: fila con guía de CONTENIDO (F1 no-hito · desplazada del tramo 2): la reentrada T1 no cuenta como «ayer» */
const esCont = (r) => !!MF1[r.d];
/** k-ésima fila de CONTENIDO anterior (salta hitos y, en el tramo 2, la reentrada) · k = 1 → ayer de contenido */
function contAtras(r, k) { let c = 0; for (let i = IDX.get(r.d) - 1; i >= 0; i--) { if (esCont(SEQ[i])) { c++; if (c === k) return SEQ[i]; } } return null; }
/** ¿r es el n-ésimo día de plan tras un hito NBME (de F1 o, v6.05, el NBME 29 antes de las desplazadas) (n = 1..4)? */
function trasHito(r) { for (let n = 1, i = IDX.get(r.d) - 1; i >= 0 && n <= 4; i--, n++) if (esHito(SEQ[i])) return SEQ[i].d === 1 ? null : { hito: SEQ[i], n }; return null; }
/** v6.09 · lote 1 (17-nov-2026, auditoría tiempo ↔ material a1-13): en F1 la consolidación de las 11:00 baja a 15Q Tutor (N1) / 25Q TIMED (N2) para
 *  que su revisión quepa (0,85′/Q); las 5Q que faltan para el qDia del nivel NO se pierden: van a la EVALUACIÓN ACUMULATIVA de las 18:00 del mismo día
 *  (si las 18:00 son esa eval) o, si las 18:00 son Day-After de un NBME, a las 07:15 del siguiente día de Step («5Q TIMED que quedaron de la
 *  consolidación»). Solo F1 (r.t == null); el tramo 2 (2027) va en otro lote y queda igual. La contabilidad de uWorld (QS) no cambia: esas 5Q ya se
 *  descontaban del pool en la consolidación. Devuelve null (sin cambio) · { donde: 'eval18' } · { donde: '0715', sig }. */
function cincoDe(r) {
  if (!r || r.t || esHito(r) || r.d <= 5 || !MF1[r.d] || ![1, 2].includes(r.nivelUW)) return null;
  const th = trasHito(r);
  if (!(th && th.n <= 4)) return { donde: 'eval18' };
  const sig = SEQ[IDX.get(r.d) + 1];
  if (!sig || sig.t || esHito(sig) || !MF1[sig.d] || (trasHito(sig) && trasHito(sig).n === 1)) aborta(`${etq(r)} ${r.fecha}: las 5Q que no entran en la consolidación (18:00 = Day-After) no tienen unas 07:15 de repaso en el siguiente día de Step de F1`);
  return { donde: '0715', sig };
}
/** v6.09 · lote 1: la fila de la VÍSPERA cuyas 5Q de consolidación caen en las 07:15 de x (o null). */
function cinco0715De(x) {
  if (!x || x.t || !IDX.has(x.d)) return null;
  const i = IDX.get(x.d); const prev = i > 0 ? SEQ[i - 1] : null; const c = cincoDe(prev);
  return c && c.donde === '0715' && c.sig === x ? prev : null;
}
/** v6.08 · trozos del Day-After de un hito del tramo 2 en F3 que caen en filas de F4 (SERUMS: plantilla por turno, sin franja de 18:00) —
 *  n-ésima fila tras el hito: n = 1 → 2/6 (07:15) y 3/6 (18:00) · n = 2-3 → 4/6-5/6 (drill) · n = 4 → 6/6 (drill + eval 10Q). Sin franja en la guía:
 *  el hito y el último trozo con franja lo avisan (DECISIÓN DE JOSEPH) y META.dayAfterSinFranja lo lista. */
function daEnF4(h) {
  if (!h || !h.t || h.fase !== 'F3') return [];
  return U.DIAS_T2.filter((x) => x.t > h.t).slice(0, 4).map((x, i) => ({ n: i + 1, x })).filter((o) => o.x.fase === 'F4')
    .map((o) => ({ ...o, partes: o.n === 1 ? '2/6 (triaje + gráficos, 60′) y 3/6 (drill de cronología, 45′)' : o.n === 4 ? '6/6 (drill de la 10.ª incorrecta + eval 10Q, 45′)' : `${o.n + 2}/6 (drill de cronología, 45′)` }));
}
const daEnF4Txt = (h) => { const xs = daEnF4(h); return xs.length ? `⚠ ${xs.map((o) => `El ${o.partes} del Day-After del ${nomHito(h)} cae el ${fd(o.x.fecha)} (T${o.x.t}), que ya es F4 (SERUMS: plantilla por turno, sin franja de 18:00)`).join(' · ')}: no tiene franja en esta guía → DECISIÓN DE JOSEPH (propuesta: el BLOQUE B de ese día, el de carga baja —incorrectas—, según el turno; nada se quita).` : ''; };
/** v6.05: etiqueta de una fila en los textos (F1 «D7» · tramo 2 «T4», d = 100 + t) */
const etqD = (d) => (d > 100 ? `T${d - 100}` : `D${d}`);
const etq = (r) => etqD(r.d);
/** v6.05: texto del subtema sin el prefijo «DE F1 → TRAMO 2 (…) · » de las desplazadas (subV520 = texto v5.20 exacto) */
// v6.10g (revisión 18-nov): sin la pieza «· setup Anki FSRS» del D3 (dato de usmleStep1Daily.ts): ese vídeo (Te5RnxeG_Gg) va con la CONFIGURACIÓN de Anki del
//   1.er día de F1 y el final, con el D2; el bloque del D3 no trata de Anki (antes el título de PÁGINA COMPLETA del D3 lo anunciaba entero, ya sin cortar)
const txtSub = (r) => (r.subV520 || r.sub).replace(/ · setup Anki FSRS$/, '');
/** v6.10g (18-nov · títulos sin palabras partidas): `n` es el largo OBJETIVO del subtema, con CORTO_MARGEN caracteres de margen para no partir una pieza.
 *  Si no cabe, se corta en la última PIEZA entera («a + b + c», «a · b», «a, b», «a / b», «a — b») o, si la pieza deja menos del 60 % de lo que cabe, en la
 *  última PALABRA entera; un paréntesis que quedaría abierto sale entero («neoplasia (principios + carcinogé…» → «neoplasia…»). Antes cortaba a n − 1
 *  caracteres en medio de una palabra («NIVEL 0 · PREGUNTA 1/3 a fondo · Pathoma 1-2: lesión celular + muerte celular + in…»). */
const CORTO_MARGEN = 10;
// v6.10g (revisión 18-nov): `margen` opcional (0 en el «qué» doble del free recall D-3 / D-7: con +10 por subtema pasaba de los 150 del corte del Calendar)
const corto = (s, n = 70, margen = CORTO_MARGEN) => {
  if (s.length <= n + margen) return s;
  const lim = n + margen - 1; // sitio para «…»
  const abierto = (t) => { let k = 0; for (const ch of t) k += ch === '(' ? 1 : ch === ')' ? -1 : 0; return k > 0; };
  const COLA = /(?:[\s+·,;:/—–(-]+|\s(?:de|del|la|las|el|los|y|e|o|u|en|con|a|al|por|para|sin|tras|vs))+$/iu; // sin conectores colgando («… de…»)
  const limpio = (i) => { let t = s.slice(0, i); while (abierto(t) && t.includes('(')) t = t.slice(0, t.lastIndexOf('(')); return t.replace(COLA, ''); };
  const corte = (re) => { let best = ''; for (const m of s.matchAll(re)) { if (m.index > lim) break; const t = limpio(m.index); if (t.length > best.length) best = t; } return best; };
  const pieza = corte(/ \+ | · |, | \/ | — | – /g), palabra = corte(/\s/g);
  return (pieza && pieza.length >= 0.6 * palabra.length ? pieza : palabra || s.slice(0, lim)) + '…';
};
/** v6.10h (revisión 18-nov · c10 títulos): título de una franja que el Calendar usa ENTERO como resumen («🇺🇸 USMLE D# · » + cortar(título, 85)): `pre` +
 *  `tema` + `suf` si cabe en 85; si no, sin el sufijo (dato que ya dicen los pasos: «Tutor, sin reloj»); si tampoco, el tema acortado por piezas (corto) hasta
 *  caber. Así el Calendar no corta (antes: «… lesión celular + muerte celular + …», «… (Tutor, sin …»). */
const T85 = 85;
// v6.10i (remate de la revisión del 18-nov): la APP lleva el título ENTERO (es la fuente completa: el Home perdía «+ inflamación» en el D2); el que acorta es
//   el constructor del Calendar (c12/build_ops.js · tituloCal: sin el sufijo entre paréntesis y, si no cabe, por piezas), con la misma regla que tenía esto.
const tit85 = (pre, tema, suf = '') => pre + tema + suf;
const S1 = (d) => d <= 5;
// v6.03 (20-oct): fechas DERIVADAS de las filas (D# → fecha) para los textos de la semana 1 y los avisos
const DD = (d) => filaD(d).fecha;
const fdc = (iso) => `${DOW[new Date(iso + 'T12:00:00Z').getUTCDay()]} ${new Date(iso + 'T12:00:00Z').getUTCDate()}`; // «mié 21»
const diasEntre = (a, b) => Math.round((new Date(b + 'T12:00:00Z') - new Date(a + 'T12:00:00Z')) / 864e5);
// v6.10h (revisión 18-nov · c10 D11-D13): el hueco REAL entre dos sesiones de Step (fechas de PLAN → su día real con el alias de corrida_s1, frente usmle).
//   Con el alias y el SKIP del vie 25-dic, D11 (plan mar 22) → D12 (plan jue 24) son 5 días reales (mié 23 → lun 28) y D12 → D13 (plan mar 29) son 2
//   (lun 28 → mié 30): «validación de 48 h» / «revalidación a los N días» se rotulan con el hueco que de verdad vive Joseph. Sin alias = diasEntre.
const diasReales = (a, b) => diasEntre(V6.fechaRealDe(a, FV6, 'usmle'), V6.fechaRealDe(b, FV6, 'usmle'));
// v6.10w (remate · revisiones cobertura/textos): una fecha de PLAN tiene día real si el alias de corrida_s1 la lleva a un día (es un valor) o si ningún día real
//   la sustituye (no es una clave). El plan del jue 31-dic no tiene: el jue 31 y el vie 1 reales hacen los del mar 29 y el mié 30 (su Anki va a la cola FSRS del
//   lun 4-ene) → el Anki del vie 1-ene ya no anuncia «jue 31-dic día de plan» y la pausa del Step 1 empieza el día real siguiente al del último día de F1
const _ALIAS_U = (FV6.corrida_s1 && FV6.corrida_s1.alias) || {};
const conDiaReal = (x) => Object.values(_ALIAS_U).includes(x) || !(x in _ALIAS_U);
// v6.11 fase 2 (remate, revisión «textos» MEDIA): el plan de f1.fin (mié 30-dic) se quedó SIN día real y fechaRealDe lo devolvía tal cual (la pausa salía «desde
//   el jue 31-dic»): la pausa empieza el día siguiente al ÚLTIMO día real de F1 (el mayor día real del alias cuya fecha de plan ≤ f1.fin), como plantillasV6.ultimoRealF1
const ULTIMO_REAL_F1 = (() => { const fin = FV6.f1.fin; const rs = Object.entries(_ALIAS_U).filter(([, de]) => de <= fin).map(([r]) => r).sort(); const r = rs[rs.length - 1]; return r && r > fin ? r : V6.fechaRealDe(fin, FV6, 'usmle'); })();
const PAUSA_REAL = V6.add(ULTIMO_REAL_F1, 1);
/** «ayer» si a es el día natural anterior a b; si no (fin de semana en medio), «el vie 23-oct» */
const antesTxt = (a, b) => (diasEntre(a, b) === 1 ? 'ayer' : `el ${fd(a)}`);
/** «mañana» si b es el día natural siguiente a a; si no, «el lun 26-oct» */
const despuesTxt = (a, b) => (diasEntre(a, b) === 1 ? 'mañana' : `el ${fd(b)}`);
const mayus = (t) => t.charAt(0).toUpperCase() + t.slice(1);
/** v6.07: «mañana» si la siguiente fila del plan (F1 → tramo 2) es el día natural siguiente; si no, «el jue 12-nov» (F1 con Step solo mar · jue) */
const proxTxt = (r) => { const sig = U.DIAS_TODOS.find((x) => x.fecha > r.fecha); return sig ? despuesTxt(r.fecha, sig.fecha) : 'el próximo día de Step'; };
/** v6.10f (revisión 18-nov · relativos): el próximo ANKI AM de las 05:00 tras `f` = el siguiente L-V hábil (sin SKIP; sábado y domingo no tienen Anki a
 *  las 05:00) → «mañana a las 05:00» solo si es el día natural siguiente; si no, «el lun 28-dic a las 05:00» (antes «mañana» también el jue 24-dic, con el vie
 *  25 SKIP, y los viernes del tramo 2). Si cae en el SERUMS (F4: el Anki va con el turno, no a las 05:00), «el Anki USMLE del lun 3-may (con el turno)». */
/** v6.10r: la fecha (de plan) del próximo ANKI AM de las 05:00 tras `f` (el siguiente L-V hábil, sin SKIP) */
// v6.11 fase 2 (lun 23-nov): salta también las fechas de plan SIN día real (conDiaReal: el mié 30-dic y el jue 31-dic, cuyo Anki es la cola FSRS) → del vie 1-ene
//   (plan del mar 29-dic) las vencidas que falten van al lun 4-ene a las 05:00
const ankiAmSig = (f) => {
  let t = new Date(f + 'T12:00:00Z');
  do { t = new Date(t.getTime() + 864e5); } while (t.getUTCDay() === 0 || t.getUTCDay() === 6 || FV6.skip.includes(t.toISOString().slice(0, 10)) || !conDiaReal(t.toISOString().slice(0, 10)));
  return t.toISOString().slice(0, 10);
};
const ankiAmSigTxt = (f) => {
  const n = ankiAmSig(f);
  return n >= FV6.serums.inicio ? `el Anki USMLE del ${fd(n)} (con el turno del SERUMS)` : `${despuesTxt(f, n)} a las 05:00`;
};
/** v6.07: «de ayer» / «del jue 12-nov» según la distancia real a la sesión anterior de contenido */
const delPrevTxt = (prev, f) => (antesTxt(prev.fecha, f) === 'ayer' ? 'de ayer' : `del ${fd(prev.fecha)}`);
const sabadoTras = (iso) => { let t = new Date(iso + 'T12:00:00Z'); do { t = new Date(t.getTime() + 864e5); } while (t.getUTCDay() !== 6); return t.toISOString().slice(0, 10); };
// v6.03: el catálogo (MAPA, por D# v5.20) se lee por el ORIGEN de cada d de F1 (colocarF1: hitos anclados) → MF1[d]
// v6.10b: el UWSA1 dejó su ranura 1 sin fecha → la colocación es la de 13 ranuras (= d de la última fila de F1), no la del nº de filas
const ORIGEN_F1 = require('./gen_tramo2').colocarF1(F1[F1.length - 1].d).enF1;
const MF1 = {};
for (const r of F1) {
  if (esHito(r)) continue;
  const o = ORIGEN_F1[r.d - 1];
  if (typeof o !== 'number' || !MAPA[o]) aborta(`D${r.d} (${r.fecha}): sin mapeo en guia_catalogo_f1.js (origen v5.20 ${o})`);
  MF1[r.d] = MAPA[o];
}
// v6.03: filas de F1 DESPLAZADAS al tramo 2 (T2_DESPL, arriba) · v6.05: su catálogo por su dOrig (= D# v5.20) y su guía en su fecha T con
//   la plantilla de F3 → solo F3 y sin partir (en F4 la plantilla es por turno): si no, aborta en vez de escribir una guía que no cuadra
for (const r of T2_DESPL) {
  if (!MAPA[r.dOrig]) aborta(`T${r.t} (${r.fecha}, v5.20 D${r.dOrig}): fila desplazada sin mapeo en guia_catalogo_f1.js`);
  if (r.fase !== 'F3' || r.parte) aborta(`T${r.t} (${r.fecha}): fila desplazada en ${r.fase}${r.parte ? ' parte ' + r.parte : ''} — la guía del tramo 2 solo tiene la plantilla de F3`);
  MF1[r.d] = MAPA[r.dOrig];
}
/** v6.08 (fix revisión 14-nov, dia8): {D<n>} de las notas del catálogo (n = D# v5.20) → la fila y la fecha VIGENTES: «D2 · jue 19-nov-2026» si
 *  está en F1 · «T12 del tramo 2 · vie 2-abr-2027» o «T41-T44 del tramo 2 · mié 12-may → sáb 15-may-2027» (partida en F4). Antes el catálogo
 *  decía «(D46)» a mano y el Home no tiene D46 (F1 = D1-D13; el tramo 2 = T1-T218). Sin resolver → aborta. */
const fdA = (iso) => `${fd(iso)}-${iso.slice(0, 4)}`;
function filaV520Txt(n) {
  const r = F1.find((x) => ORIGEN_F1[x.d - 1] === n);
  if (r) return `D${r.d} · ${fdA(r.fecha)}`;
  const ts = U.DIAS_TODOS.filter((x) => x.t && x.dOrig === n).sort((a, b) => a.t - b.t);
  if (!ts.length) aborta(`nota del catálogo: {D${n}} no está ni en F1 ni en el tramo 2`);
  const a = ts[0], z = ts[ts.length - 1];
  return ts.length === 1 ? `T${a.t} del tramo 2 · ${fdA(a.fecha)}` : `T${a.t}-T${z.t} del tramo 2 · ${fd(a.fecha)} → ${fdA(z.fecha)}`;
}
/** v6.10y (revisión «textos»): {COLA_HOY} de una nota del catálogo = los vídeos de la cola que el día d ve DE VERDAD, con su hora (antes el texto fijo «los de
 *  Pathology › General Topics que vienen del D2», falso: el D3 ve también el resto de «The ONLY Video…»); sin vídeo de la cola ese día, nada */
const PALM_CORTO = { Te5RnxeG_Gg: 'Anki Almost Broke Me…', BOtQJeFE_rc: 'The ONLY Video…' };
function colaHoyTxt(d) {
  const xs = DONDE.filter((x) => x.d === d && x.it.dOrig !== d && x.slot !== 's0500');
  if (!xs.length) return '';
  const nom = (it) => (it.tipo === 'bb' ? bbRuta(it.id) : `«${PALM_CORTO[it.id] || PALM[it.id].t}»`);
  const orig = [...new Set(xs.map((x) => x.it.dOrig))].map((o) => `${etqD(o)} · ${fdA(FECHA_D(o))}`).join(' y del ');
  return ` El resto del vídeo del día es la cola del ${orig}: ${xs.map((x) => `${nom(x.it)} (${slotHora(x.d, x.slot)})`).join(' y ')}.`;
}
const notaTxt = (nota, d) => {
  const t = nota.replace(/\{D(\d+)\}/g, (_, n) => filaV520Txt(Number(n))).replace('{COLA_HOY}', () => (d != null ? colaHoyTxt(d) : ''));
  if (/\{[^}]*\}/.test(t)) aborta(`nota del catálogo con un marcador sin resolver: ${t}`);
  return t;
};
/** v6.05: filas del tramo 2 con guía = las desplazadas + el hito cuyo Day-After (Palmerton §9.2) cae en ellas (NBME 29, T2) */
const TG = [...new Set([...T2_DESPL.map((r) => trasHito(r)).filter(Boolean).map((th) => th.hito), ...T2_DESPL])].sort((a, b) => a.t - b.t);
for (const r of TG) if (esHito(r) && (r.fase !== 'F3' || !/\(07:00-12:30\)/.test(r.sub) || !/Form \d+/.test(r.uw))) aborta(`T${r.t} (${r.fecha}): hito con Day-After en las desplazadas fuera del formato NBME de F3 (07:00-12:30)`);
const CORTO_T2 = { 'Nervous System': 'Neuro', 'Hematology & Oncology': 'Heme/Onco', 'Psychiatry & Behavioral': 'bioestadística' };
// v6.03b · cabecera APEX del día (SUBTEMA = D# de 2 cifras + subtema uWorld en inglés; hitos: D# + forma) y presupuesto de tarjetas
const slugUW = (id) => {
  let s = (/\(([^()]*)\)\s*$/.exec(UWY.get(id).nombre) || [])[1] || UWY.get(id).nombre;
  s = s.replace(/^Normal (pulmonary )?structure and function(?: of the)? ?/i, (x, p) => `normal ${p || ''}`);
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40).replace(/_+$/, '');
};
const hitoSlug = (r) => (/UWSA1/.test(r.sub) ? 'uwsa1' : `nbme${(/NBME (\d+)/.exec(r.sub) || /Form (\d+)/.exec(r.uw || '') || [])[1]}`);
/** v6.05: número del SUBTEMA APEX = D# del plan en F1 · en el tramo 2, el D# v5.20 (dOrig: 47…79, NBME 29 = 65) — 2 cifras y único */
const dApex = (r) => (r.t ? r.dOrig : r.d);
const subApex = (r) => (esHito(r) ? `${nn(dApex(r))}_${hitoSlug(r)}` : `${nn(dApex(r))}_${slugUW(MF1[r.d].uw[0])}`);
const fuenteHito = (h) => (/UWSA/.test(h.sub) ? 'UWorld' : 'NBME');
const cabApex = (esp, sub, fuente, modo) => `EXAMEN: USMLE · ESPECIALIDAD: ${esp} · SUBTEMA: ${sub} · FUENTE: ${fuente} · MODO: ${modo} · IMAGEN: no`;
const ESP_PREG = '<sistema de la pregunta: Cardiology, Nephrology, Microbiology…>';
for (const r of [...F1, ...TG]) {
  if (esHito(r)) { if (!/^\d{2}_(uwsa1|nbme\d+)$/.test(subApex(r))) aborta(`${etq(r)}: SUBTEMA APEX del hito no derivable (${subApex(r)})`); continue; }
  if (!APEX_USMLE_TAGS.includes(espApex(r))) aborta(`${etq(r)}: ESPECIALIDAD APEX «${espApex(r)}» no está en los 44 tags del parser`);
  if (!/^\d{2}_[a-z][a-z0-9_]*$/.test(subApex(r))) aborta(`${etq(r)}: SUBTEMA APEX «${subApex(r)}» no cumple NN_lowercase`);
}
/** Reglas de redacción (Palmerton: frente «Subject - question», tuyo y exigente; resumen arriba si el reverso es largo; sin cloze). */
const R_FRENTE = 'FRENTE en inglés «Subject - question», escrito por ti, exigente y sin pistas; REVERSO «Summary:» 1 frase con el porqué (+ ≤2 líneas); CCSN = con qué no confundirlo; 1 idea por tarjeta, sin cloze';
// v6.11 (lun 23-nov-2026 · chat USMLE): sin «(o ⚡ APEX 1-TAP)»: el 1-TAP solo encola («APEX Encolado») y su lista de UWorld no trae Pathology
const R_ENVIO = 'copia el BLOQUE APEX → Ctrl+Shift+A → el toast ✓ = tarjeta en Anki + nota en Obsidian';
// v6.11 (chat USMLE): una tarjeta ya enviada se corrige en Anki, no reenviándola (el motor APEX hace addNote con allowDuplicate: saldría duplicada)
// ronda c38 (chat USMLE, ítem 31b): y también su nota de Obsidian (el motor la escribe en 01_USMLE\UWorld\<Especialidad>\APEX_creados\FECHA_HHMM_<subtema>.md
//   con FUENTE UWorld, la de las preguntas a fondo que lo usan), o se dicta al chat USMLE, que corrige las dos (como el D2 antes del redeploy)
const R_CORRIGE = 'Si hay que corregir una, edita la tarjeta en Anki › Browse; nunca la reenvíes (saldría duplicada), y corrige también su nota en Obsidian (01_USMLE › UWorld › <Especialidad> › APEX_creados › fecha_HHMM_subtema.md), o díctale la corrección al chat USMLE, que corrige las dos';
// ronda c38 (revisión): con la carpeta del día (Pathology el D2), no el marcador «<Especialidad>»
const rCorrige = (r) => R_CORRIGE.replace('<Especialidad>', espApex(r));
// ronda c38 (revisión, misma regla que R_CORRIGE): la 1.ª pasada de las 18:00 corrige la tarjeta en Anki Y su nota de Obsidian (reescribirla solo en Anki
//   desincroniza la nota)
const R_PASADA = 'si una tarjeta no se entiende, corrígela ahora en Anki › Browse y en su nota de Obsidian, o díctale la corrección al chat USMLE (Anki es para retener, no para aprender)';
/** Ruta de cada error (Palmerton: Educational Objective como filtro; PC card si fallaste el diagnóstico; los errores de lectura no son de tarjeta). */
const R_ERROR = 'por cada incorrecta y cada acierto con duda, lee el Educational Objective y clasifica: K (no lo sabías) → 1 concept card del PRINCIPIO (abstraído: sin edad ni sexo del paciente) · no reconociste el diagnóstico → 1 PC card (cronología en presente, 4-6 pasos) · QI (lo sabías y leíste o interpretaste mal) → sin tarjeta: la micro-destreza al log de 📏 Medición. Filtro: «¿vale repasarlo a diario 6 meses?»; agotado el tope, el resto va a la shopping list';
/** Presupuesto de tarjetas NUEVAS del día (tope 20): primero las PC cards / tarjetas de experimento del Day-After, luego deep prime ≤10,
 *  luego consolidación (≤4/3/2 por nivel), luego la eval (≤5; comprimida ≤3; reducida del D4 ≤3). */
function presupuesto(r) {
  if (!r.t) return presupuestoF1(r); // v6.10b: F1 en nivel 0-1
  const d = r.d; const th = trasHito(r);
  const b0715 = d === 2 ? AK.exp + 3 : th && th.n === 1 ? AK.exp : 0;
  const da18 = d === 2 || d === 3 ? 3 : d === 4 ? 1 : th && th.n <= 4 ? DRILL[th.n].length : 0;
  const dp = AK.deepPrime; let resto = AK.topeDia - b0715 - da18 - dp;
  const nivel = S1(d) ? 1 : r.nivelUW;
  const con = Math.max(0, Math.min(AK.consol[nivel] ?? 2, resto)); resto -= con;
  const hayEval = d === 4 || d === 5 || (!S1(d) && !(th && th.n <= 3));
  const nomEval = d === 4 ? AK.evalRed : th && th.n === 4 ? AK.evalComp : AK.eval;
  const ev = hayEval ? Math.max(0, Math.min(nomEval, resto)) : 0;
  return { b0715, da18, dp, con, ev, total: b0715 + da18 + dp + con + ev };
}
/** v6.10b · presupuesto de tarjetas nuevas de un día de F1 (nivel 0-1; tope 20): a fondo (D2 3 × ≤4 · D3-D4 4 × ≤3, §3.1 «2-4 por pregunta») · validación
 *  de la misma sesión (D2 ≤3 · resto ≤1) · revalidación ≤2 · nivel 1: deep prime ≤10 + bloque 2 ≤2 · Day-After del NBME 25 (tarjetas de experimento +
 *  PC cards del drill, como estaba) · la eval comprimida del 6/6 (D12) ≤3. Las de VOCABULARIO van a su mazo, fuera de este tope. */
function presupuestoF1(r) {
  const d = r.d, th = trasHito(r), prev = contAtras(r, 1);
  const o = { b0715: 0, da18: 0, dp: 0, con: 0, ev: 0, aFondo: 0, val: 1, reval: prev ? 2 : 0 };
  if (nivel0(r)) { o.aFondo = F1_N0[d].q * (F1_N0[d].hora === 60 ? 4 : 3); o.val = F1_N0[d].hora === 60 ? 3 : 1; }
  else { o.dp = AK.deepPrime; o.con = th && th.n === 1 ? 0 : 2; if (th && th.n === 1) o.b0715 = AK.exp; }
  if (th && th.n <= 4) { o.da18 = DRILL[th.n].length; if (th.n === 4) o.ev = Math.min(AK.evalComp, 2); } // v6.10 (fix revisión 18-nov): en Tutor, ≤2 tarjetas en 4′ (D12 18:00)
  o.total = o.b0715 + o.da18 + o.dp + o.con + o.ev + o.aFondo + o.val + o.reval;
  return o;
}
/** Textos de tarjeta por bloque (v6.03b): PC card y tarjeta de experimento del Day-After (h = fila del hito), revisión de la consolidación
 *  y corrección de la eval (k = cuántas tarjetas caben hoy según `presupuesto`). Lo que cambia por día (la cabecera) va en el «qué»; el
 *  «cómo» es fijo para que el .ts generado lo guarde una sola vez. */
const cabCorta = (esp, sub, fuente, modo) => `ESPECIALIDAD ${esp} · SUBTEMA ${sub} · FUENTE ${fuente} · MODO ${modo}`;
const pcCardTxt = (h) => `→ 1 PC card por pregunta, por APEX (${cabApex(ESP_PREG, subApex(h), fuenteHito(h), 'simulacro_step1')}): FRENTE «<diagnosis> - pathophysiologic chronology from the root cause to the presenting finding?» · REVERSO = la cadena en presente, 4-6 pasos unidos con «→» · ${R_ENVIO}.`;
const expCardTxt = (h) => `por APEX (${cabApex(ESP_PREG, subApex(h), fuenteHito(h), 'simulacro_step1')}): FRENTE «<experiment or graph> - what was manipulated, what was measured and what does the result predict?» · REVERSO «Summary:» con el principio que lo explica · ${R_ENVIO}.`;
const nTarj = (k) => `${k} tarjeta${k === 1 ? '' : 's'}`;
const COMO_ERR = `${mayus(R_ERROR)}. ${mayus(R_FRENTE)} · ${R_ENVIO} (cabecera: EXAMEN: USMLE + los campos del título del paso + IMAGEN: no).`;
function revCon(r, min, k, fuente) {
  if (k <= 0) return P(min, `Revisión: Educational Objective + log de errores (hoy 0 tarjetas: el tope de ${AK.topeDia} ya lo cubren el Day-After y el deep prime)`, 'Cada fallo: knowledge / transfer / proceso → 📏 Medición (consolidación %); lo que merecería tarjeta va a la shopping list.');
  return P(min, `Revisión: Educational Objective → ≤${nTarj(k)} APEX + log de errores (tope del día ${AK.topeDia}) · ${cabCorta(espApex(r), subApex(r), fuente, 'estudio')}`, `${COMO_ERR}${fuente === 'UWorld' ? ' Si la pregunta es de Mehlman: FUENTE mix_examen_usmle.' : ''} Consolidación % y tipo de error (knowledge / transfer / proceso) → 📏 Medición.`);
}
function corrEval(r, min, k) {
  return P(min, `Corrección: Educational Objective + tipo de error + ≤${nTarj(k)} APEX · ${cabCorta('= sistema de la pregunta', `${nn(dApex(r))}_eval`, 'UWorld', 'estudio')}`, COMO_ERR);
}
/** Submazos APEX que usa el F1 (orden de aparición) y el sábado del «Optimize» FSRS del preset (1.er sábado ≥ 28 días tras el D1). */
const F1_DECKS = [...new Set(F1.filter((r) => !esHito(r)).map(espApex))];
const SAB_OPT = (() => { let t = new Date(F1[0].fecha + 'T12:00:00Z'); t = new Date(t.getTime() + 28 * 864e5); while (t.getUTCDay() !== 6) t = new Date(t.getTime() + 864e5); return t.toISOString().slice(0, 10); })();
const TRAMO2_TXT = T2_DESPL.length ? `TRAMO 2 (T${T2_DESPL[0].t} ${fd(T2_DESPL[0].fecha)}, cuando siguen las filas desplazadas de F1: ${[...new Set(T2_DESPL.map((x) => CORTO_T2[x.system] || x.system))].join(' → ')})` : 'TRAMO 2';

// ── 1) REPARTO DE VÍDEO (cola) ────────────────────────────────────────────────────────────────────────────────────────────────────
// Capacidad de vídeo real por franja: 05:00 solo del D3 al D5 (mazo casi vacío) · 07:15 «vídeo pendiente» ≤30′ (no el día siguiente a
// un hito: Day-After) · deep prime 09:00 ≤70′. El tema NUEVO solo entra a partir del deep prime (después del pre-test ciego).
// v6.09 · lote 1 (17-nov-2026, auditoría a1-11/a1-15 · CONTRATO del Anki 05:00 con encapsManana): la cola de vídeo NUNCA va a las 05:00 (antes
//   del D3 al D5 ocupaba 05:00-05:45 y se comía los repasos ENCAPS): el Anki AM USMLE es 05:00-05:30 los mar · jue y 05:00-05:20 los lun · mié · vie
//   (y el jue 31-dic); lo que iba a las 05:00 pasa al «vídeo pendiente» de las 07:15 (la subida a 1,25× desde el D3 lo absorbe). Los días cuyas 07:15
//   reciben las 5Q que no entran en la consolidación N2 de la víspera (F1) tienen 2′ menos de vídeo pendiente (ver cinco0715De).
const CAP = { s0500: () => 0, s0715: (d) => (d === 2 ? 0 : trasHito(filaD(d))?.n === 1 ? 0 : cinco0715De(filaD(d)) ? 28 : 30), s0900: () => 70 };
/** v6.09 · lote 1: «no partir un vídeo si el resto es < 3′: se termina el mismo día» (antes el 17-dic «Antihypertensives I» de 0:00 a 25:00 y el
 *  22-dic un tramo de 1′ «de 25:00 a 25:25»). Solo en F1 (d < 100): el tramo 2 (2027) va en otro lote y queda idéntico. La franja se pasa ≤2′ y la
 *  absorbe su paso flexible (07:15: free recall D-3/D-7 + Anki restante · 09:00: lectura). No se aplica donde la franja no tiene holgura (07:15 con
 *  las 5Q de la consolidación de la víspera). */
const NO_PARTIR = 2;
const colaBB = []; const colaPalm = []; // ítems: { tipo, id, ini, fin, dOrig } (ini/fin en segundos del vídeo)
/** v6.02c F2 (E6): Palmerton de MÉTODO — FSRS (era del D3) y «The ONLY video» (era del D2) — con la MISMA regla de minutos que los B&B (duración ÷ 1,0 ×
 *  1,2 por las pausas para anotar). v6.10b (decisión 4 de Joseph, sin UWSA1 en F1): el FSRS va en la CONFIGURACIÓN de Anki (CONF_DIA, mié 18-nov 05:00,
 *  1.er día de F1) y lo que falta de él + «The ONLY video» van al Anki del D2 (jue 19, 05:00-05:30: el mazo aún está vacío; regla del chat USMLE «Anki y
 *  vídeos de método»); lo que no cabe va a la cabeza de la cola (delante de los B&B: es lo pendiente más antiguo). */
const colaMetodo = [];
// v6.10g (18-nov): sin la bitácora en el texto visible («(era el vídeo del D3, «setup Anki FSRS»)» · «(era del D2)»: el D2 de hoy ya ES el día de ese vídeo)
const METODO = {
  Te5RnxeG_Gg: { dPlan: 3, como: 'va con la configuración porque FSRS se ajusta ANTES de la primera tarjeta: pausa y anota los 8 cambios' },
  BOtQJeFE_rc: { dPlan: 2, como: 'el vídeo de MÉTODO del arranque: cómo plantea Palmerton el Step 1 · pausa y anota 5 ideas' },
};
const REP = {}; // d → { s0500: [], s0715: [], s0900: [], desborde: [] }
const item = (tipo, id, dOrig) => ({ tipo, id, ini: 0, fin: tipo === 'bb' ? BB.get(id).s : PALM[id].s, dOrig });
const realDe = (it, d) => realMinV(it.fin - it.ini, d, velDe(it, d));
const MIN_TRAMO = 8; // minutos reales mínimos para abrir un tramo (si queda menos, el hueco pasa a lectura/Anki)
/** Coloca `it` (o un tramo desde it.ini) en `libre` minutos reales. Devuelve { puesto, resto } (resto = null si entró entero). */
function colocar(it, d, libre, dest, holgura = 0) {
  const m = realDe(it, d);
  if (m <= libre) { dest.push({ ...it, min: m }); return { usado: m, resto: null }; }
  if (libre < MIN_TRAMO) return { usado: 0, resto: it };
  // v6.09 · lote 1: si partirlo dejaría un resto < 3′ (≤ holgura), se termina hoy (la franja se pasa ≤ holgura y la absorbe su paso flexible)
  if (holgura > 0 && m <= libre + holgura) { dest.push({ ...it, min: m }); return { usado: m, resto: null }; }
  const { v, f } = velDe(it, d);
  const toma = Math.floor(((libre / f) * v * 60) / 60) * 60; // segundos de vídeo, a minuto entero
  if (toma < 60) return { usado: 0, resto: it };
  const mm = realMinV(toma, d, velDe(it, d));
  dest.push({ ...it, fin: it.ini + toma, min: mm });
  return { usado: mm, resto: { ...it, ini: it.ini + toma } };
}
/** Vacía la cola en orden estricto (Palmerton de método pendientes del D1 → B&B pendientes → Palmerton High Yield), partiendo el
 *  vídeo por minutos si no cabe entero. */
function llenarDesdeCola(d, cap, dest, excluirD, holgura = 0, colas = [colaMetodo, colaBB, colaPalm]) {
  let libre = cap;
  for (const cola of colas) {
    while (cola.length && libre >= MIN_TRAMO) {
      if (excluirD != null && cola[0].dOrig === excluirD) break; // el desborde de HOY no se ve hoy fuera de orden
      const r = colocar(cola[0], d, libre, dest, holgura); libre -= r.usado;
      if (r.resto) { if (r.usado === 0) break; cola[0] = r.resto; } else cola.shift();
    }
  }
  return libre;
}
// v6.10b · CONFIGURACIÓN de Anki = el 1.er día de F1 si es anterior al D2 (mié 18-nov 05:00-05:45, antes de que nazcan las tarjetas ENCAPS a las 11:40):
//   mazos 4′ + vídeo FSRS + preset ≥10′ → ≤31′ de vídeo real (del minuto 0). Sin ese día (F1 empezando el mismo día que el D2) el guion no vale: aborta.
const D2 = F1[0];
const CONF_DIA = (() => { const s0 = FV6.f1.inicio; const w = new Date(s0 + 'T12:00:00Z').getUTCDay(); return s0 < D2.fecha && w >= 1 && w <= 5 && !FV6.skip.includes(s0) ? s0 : null; })();
if (!CONF_DIA) aborta(`v6.10b: F1 (${FV6.f1.inicio}) no tiene un día hábil antes del D2 (${D2.fecha}) para la CONFIGURACIÓN de Anki`);
// v6.10h (revisión 18-nov · c10 Anki ↔ vibecoding): la [TEST S1] del vibecoding (S1, paso 2: redeploy + 1 APEX de prueba de USMLE, ESPECIALIDAD Cardiology,
//   04:15) es la PRIMERA tarjeta que llega a APEX::USMLE: crea el mazo raíz y ::Cardiology (suspendida) antes de las 07:15 del D2 si se envía ese día. Los textos
//   del Anki (configuración, 05:00 del D2 y la 1.ª tarjeta del plan) lo dicen: el mazo raíz nace con la PRIMERA tarjeta, sea la [TEST S1] o la de las 07:15, y
//   el preset se aplica al cerrar el bloque de las 07:15 (Save to All Subdecks incluye ::Cardiology si la prueba lo creó). Si el plan del vibecoding mueve la
//   prueba a otro día, el texto la nombra con su fecha (TEST_S1_MISMO_DIA = false).
const TEST_S1 = (() => { try { const v = cargarModuloTS(path.join('src', 'lib', 'vibecodingPlan.ts')).VIBE_DIAS.find((x) => x.semana === 1 && x.k === 2); return v ? v.fecha : null; } catch { return null; } })();
if (!TEST_S1) aborta('vibecodingPlan.ts: sin el paso 2 de S1 (la [TEST S1] del vibecoding)');
// v6.10y (lun 23-nov-2026): con el alias PROPIO del vibecoding (_fechas_v6.json › corrida_s1.alias_frente.vibecoding: S1 corre una sesión) la [TEST S1] (paso 2,
//   plan del jue 19 = la fecha de plan del D2) va el mié 25 REAL y el D2 el mar 24 → se compara por día REAL. Su fecha se escribe como la fecha de PLAN global de
//   ese día real (corridaTexto la pinta con su día real en la guía USMLE: vie 20-nov de plan → mié 25-nov). Un día USMLE cuyo día real va ANTES del redeploy del
//   parser (antesRedeploy: el D2) no manda tarjetas por el motor APEX (corre aún el parser viejo, que trunca los campos de varias líneas): se dictan al chat USMLE
//   v6.11 (lun 23-nov-2026 · «a partir del día 24 iniciamos todo»): el lun 23 queda sin sesión y el alias global corre un hábil → la CONFIGURACIÓN (plan del mié 18)
//   va el mar 24 y el D2 (plan del jue 19) el mié 25, el mismo día real que la [TEST S1] del vibecoding (paso 2, mié 25 04:15): TEST_S1_MISMO_DIA vuelve a ser cierto
const TEST_S1_REAL = V6.fechaRealDe(TEST_S1, FV6, 'vibecoding');
const TEST_S1_MISMO_DIA = TEST_S1_REAL === V6.fechaRealDe(D2.fecha, FV6, 'usmle');
const fdTestS1 = () => fd(V6.fechaPlanDe(TEST_S1_REAL, FV6));
// v6.12 (mar 24-nov-2026, «solo corre un día»): el D2 vuelve a caer el MISMO día real que el redeploy del parser (jue 26-nov, 04:15) y el 1-TAP no es fiable (solo
//   encola; un toast ✓ no prueba que corra el código nuevo): ese día también se DICTAN las tarjetas al chat USMLE → antesRedeploy incluye el día del redeploy
//   (DICTA_DIA_REDEPLOY) y el texto dice «su redeploy es hoy a las 04:15» (no «es el <día>», que se leía como otro día)
const DICTA_DIA_REDEPLOY = true;
const antesRedeploy = (r) => (DICTA_DIA_REDEPLOY ? V6.fechaRealDe(r.fecha, FV6, 'usmle') <= TEST_S1_REAL : V6.fechaRealDe(r.fecha, FV6, 'usmle') < TEST_S1_REAL);
const redeployTxt = (r) => (V6.fechaRealDe(r.fecha, FV6, 'usmle') === TEST_S1_REAL ? 'su redeploy es hoy a las 04:15, aún sin comprobar' : `su redeploy es el ${fdTestS1()}`);
// v6.10u (jue 19-nov-2026 · orden de Joseph «todo inicia el 20»): con el alias global la CONFIGURACIÓN (plan del mié 18) va el vie 20 y el D2 (plan del jue 19)
//   el lun 23, con la [TEST S1] del vibecoding a las 04:15 del mismo día (TEST_S1_MISMO_DIA). Vuelve el diseño de la v6.10b con lo verificado EN VIVO por el chat
//   USMLE (19-nov): APEX::USMLE ya existe, vacío, con sus 8 submazos (APEX_USMLE_SUBMAZOS), así que la CONFIGURACIÓN (45′) = Sync 1′ · preset «APEX USMLE» desde
//   sus propias Deck Options + Save to All Subdecks y comprobación 9′ · el manual FSRS 3′ · «Anki Almost Broke Me…» desde 0:00 hasta el último límite de capítulo
//   que quepa en lo que queda (CONF_REP; 1,0× × 1,2, VEL_METODO). El D2 05:00-05:30 = Sync 1′ · el resto de ese vídeo desde su límite de capítulo (el FAQ,
//   opcional) · «The ONLY Video…» de 0:00 a 15:04 (corteD2; su resto, en la cola: D2 11:00 + D3 10:45) · free recall con lo que sobre. Sin «Anki Almost Broke
//   Me…» en la holgura de los Anki AM siguientes (la v6.10r lo repartía ahí: HOLGURA_ANKI, retirado).
// v6.11 (lun 23-nov-2026): sin efecto el reparto de la v6.10y-b (preset delante en el D2 y manual + vídeo FSRS el sáb 28): con el lun 23 sin sesión la
//   CONFIGURACIÓN (CONF_DIA, plan del mié 18) se hace ENTERA el mar 24 05:00-05:45 y el D2 (mié 25) vuelve a su Anki de vídeos de método.
const CONF_MIN = { sync: 1, preset: 9, comprob: 2, manual: 3 }; // v6.10u-b (chat USMLE, verificado en vivo): la comprobación es un paso propio de 2′ → el vídeo queda en 30′ y corta en 23:50 («Change 8»)
const CONF_REP = [];
{ const p = PALM.Te5RnxeG_Gg, libre = 45 - CONF_MIN.sync - CONF_MIN.preset - CONF_MIN.comprob - CONF_MIN.manual;
  const lim = [...p.caps.slice(1), p.faq].filter((x) => realMinV(x, D2.d, VEL_METODO) <= libre).pop();
  if (!lim) aborta('CONFIGURACIÓN 05:00: ni el 1.er capítulo de «Anki Almost Broke Me…» cabe en ' + libre + '′');
  CONF_REP.push({ ...item('palm', 'Te5RnxeG_Gg', D2.d), fin: lim, min: libre }); }
// mar 24-nov-2026 (chat USMLE): la CONFIGURACIÓN (CONF_DIA) no se hizo su día real (_fechas_v6.json › corrida_s1.config_anki) → vuelve el reparto de la v6.10y-b
//   como regla general: lo que bloquea (Sync + preset y su comprobación) va DELANTE en el Anki del D2, con «The ONLY Video…» de 0:00 a corteD2 y sus minutos de
//   siempre (realMinV); «Anki Almost Broke Me…» ENTERO (sus tramos de la configuración y del D2, con los mismos minutos) + el manual FSRS van al fin de semana de
//   config_anki.fsrs, a hora fija (USMLE_FIJO → bloque anki-fsrs de plantillasV6); el 05:00-05:45 del CONF_DIA solo dice adónde fue cada parte.
const CONF_MOV = (() => {
  const x = (FV6.corrida_s1 || {}).config_anki; if (!x) return null;
  const real = V6.fechaRealDe(CONF_DIA, FV6, 'usmle');
  if (x.no_hecha !== real) aborta(`corrida_s1.config_anki.no_hecha (${x.no_hecha}) no es el día real de la CONFIGURACIÓN (${real})`);
  const [ini, fin] = x.fsrs.hora.split('-'); const hm = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
  if (!(x.fsrs.fecha > D2.fecha && x.fsrs.fecha <= FV6.f1.fin)) aborta(`corrida_s1.config_anki.fsrs.fecha (${x.fsrs.fecha}): tiene que ir después del D2 y dentro de F1`);
  return { fecha: x.fsrs.fecha, ini, fin, min: hm(fin) - hm(ini) };
})();
const recPalm = (id) => ({ t: `Palmerton · ${id === 'Te5RnxeG_Gg' ? 'Anki + FSRS' : 'The ONLY video (Step 1 2026)'} (YouTube)`, url: yt(id), min: Math.round(PALM[id].s / 60) });
const DOC_FSRS = { t: 'Manual de Anki › Deck Options (FSRS)', url: 'https://docs.ankiweb.net/deck-options.html' };
colaMetodo.push(item('palm', 'BOtQJeFE_rc', D2.d));
/** v6.10u: el Anki del D2 · Sync 1′ + los 2 vídeos de método (resto del FSRS + «The ONLY Video…» hasta corteD2) + free recall (lo que sobre de 30′) */
const D2_0500 = { sync: 1, total: 30 };
// ══ v6.10b (17-nov-2026, 17:05 · DECISIÓN 4 de Joseph — DATA/USMLE/PALMERTON_NIVEL0_ARRANQUE.md §3 y §8.2 A1-A6) ══════════════════════════════════
// F1 = D2-D13 en NIVEL 0-1 hasta el gate del 80 %: todo en Tutor, sin reloj (el nivel 0 es un nivel 1 con menos preguntas, §3.0).
//   · D2 (jue 19-nov, lesión celular · regla EXACTA del chat USMLE): 05:00-05:30 Anki (mazo vacío) + vídeos de método · 07:15 / 08:15 / 09:15 una pregunta
//     uWorld por hora (System «Pathology (General Principles) (Cellular pathology)», Tutor, sin reloj, ≤45′, con sus tarjetas al final) · 10:15-11:00 página
//     completa (B&B Pathology › General Topics + PassMedicine) · 11:00 validación con 5Q NUEVAS de Mehlman, mismo System, en Tutor (+ vídeo pendiente) ·
//     18:00 1.ª pasada de Anki + vocabulario + nota del día.
//   · D3-D4 (nivel 0, A3): 07:15 revalidación (D3: el subtema del jueves, a los 5 días) / validación de 48 h (D4: el del martes) · 4 preguntas a fondo de
//     45′ (sin los 15′ de pulido, §3.2) · página completa 45′ · validación de la misma sesión con un filtro DISTINTO (A5/A6) · 18:00 como el D2 + vídeo.
//   · D5-D7 y D9-D13 (nivel 1, A3/A4): 07:15 revalidación / validación de 48 h + vídeo pendiente · 08:15 bloque 1 de 5Q (pre-test ciego) · 09:00 DEEP PRIME
//     · 11:00 bloque 2 de 5Q · 11:30 validación con 5Q NUEVAS de Mehlman · 18:00 Anki + vocabulario + nota + vídeo pendiente (D9-D12: el Day-After del
//     NBME 25, como estaba; el D9 hace la revalidación del D7 a las 11:00, porque sus 07:15 son el Day-After 2/6). N2 (cronometrado) solo en subtemas ya
//     al 80 %, fuera del guion fijo.
// v6.10 · ESTRUCTURA BASE CERO (18-nov-2026, orden de Joseph: «el método Palmerton por fases y por curso»): el MÉTODO DEL DÍA de F1 (D2-D13) y el MÉTODO DEL
//   SISTEMA de las desplazadas con guía (F3) salen de DATA/USMLE/_palmerton_estructura_v610.json (síntesis: PALMERTON_ESTRUCTURA_BASE_CERO.md); solo TEXTO
//   dentro de pasos existentes (mismos minutos). Los ajustes de fase de F3 (16:15 REENTRADA, 18:00 EVALUACIÓN, viernes N4, consolidación «timed» en nivel 1)
//   se dicen en su paso: mismas Q y mismos minutos (Tutor = 90 s + 0,85′/Q = timed + revisión). La capa por fila: src/lib/usmlePalmertonFases.ts.
const PE = JSON.parse(fs.readFileSync(path.join(DU, '_palmerton_estructura_v610.json'), 'utf8'));
const metDia = (r) => (!r.t ? PE.f1[String(r.d)] || null : null);
const metSis = (r) => PE.sistemas[/bioestad|biostat|ética|ethic|comunicaci/i.test(r.sub) && /Psychiatry|Behavioral/.test(r.system) ? 'Biostat & Ethics' : r.system] || null;
const faseTxtDe = (r) => { const m = metDia(r); return m ? (m.fase === 'N0' ? 'Fase 1 · SUBTEMA, nivel 0' : 'Fase 1 · SUBTEMA, nivel 1') : r.nivelUW === 1 ? 'Fase 1 · SUBTEMA, nivel 1' : r.nivelUW === 2 ? 'Fase 1 · SUBTEMA, nivel 2' : r.nivelUW === 3 ? 'Fase 2 · SISTEMA' : 'Fase 3 · MULTISISTEMA'; };
/** «MÉTODO DEL DÍA / DEL SISTEMA (Palmerton): ancla · orden» para el paso de lectura */
// v6.10j (rev. c14, vetadas #8): el ancla va PRIMERO y con el rótulo corto («Ancla «…»») y el método/fase detrás: el Calendar corta el «cómo» a 110 y con
//   «MÉTODO DEL DÍA (Palmerton · Fase 1 · SUBTEMA, nivel 0): ancla «» delante (64 caracteres) el corte caía dentro del ancla; así caben enteras las de ≤ 100
//   (D3, D5-D13) y las largas quedan para la regla de comillas del constructor
// remate v6.10j (revisión adversarial): «MÉTODO DEL DÍA — Palmerton · Fase 1 · …:» sin paréntesis (el corte del Calendar, tras un ancla larga, caía dentro de
//   «(Palmerton · Fase 1 …» y lo dejaba abierto)
// v6.10l (rev. c15, dias-clave #1 · diffs #34): un ancla del DÍA que no cabe en el corte del Calendar (110 + los 60 que el constructor alarga hasta la » de
//   cierre) se parte en su «; »: la cadena causal entera en la 1.ª comilla y lo que sigue en una 2.ª (D2: «hipoxia → … → necrosis (irreversible)»; «la adaptación
//   es la respuesta a un estrés sostenido»); antes el corte caía en «… entrada de Ca²⁺ …»» y se perdía la necrosis irreversible. Mismo texto, solo comillas.
const anclaDiaTxt = (a) => { const i = a.indexOf('; '); return a.length > 150 && i > 0 && i <= 140 ? `«${a.slice(0, i)}»; «${a.slice(i + 2)}»` : `«${a}»`; };
const metodoLeerTxt = (r) => { const m = metDia(r); if (m) return `Ancla ${anclaDiaTxt(m.ancla)} · MÉTODO DEL DÍA — Palmerton · ${faseTxtDe(r)}: lee en este orden: ${m.leer}. `; const x = metSis(r); return x ? `Ancla «${x.ancla}» · MÉTODO DEL SISTEMA — Palmerton · ${x.nombre}: trampas: ${x.trampas}. ` : ''; };
// v6.10 (fix revisión 18-nov · «preguntas primero, libro después»): el MÉTODO AL RESPONDER del día (trampas incluidas) ya no va en el paso de responder de las
//   preguntas a fondo del nivel 0 ni del pre-test ciego: se lee DESPUÉS de responder (paso del Educational Objective · bitácora del bloque 1) y vale para el
//   bloque 2 y la validación. Sin la etiqueta doble «Trampa del día: trampas:» (la etiqueta es «MÉTODO AL RESPONDER»; el texto ya dice «trampa: …»).
const trampaTrasTxt = (r, porque) => { const m = metDia(r); return m ? ` Ya respondida, no antes (${porque}): contrasta con el MÉTODO AL RESPONDER del día (Palmerton) — ${m.pregunta}.` : ''; };
/** v6.10 (fix revisión 18-nov): el ancla de un vídeo de la COLA cuyo método es de su día de origen (B&B 06-07 de inflamación, pendientes del D2 → se ven el D5):
 *  PE.f1[dOrig].anclaCola viaja con esos vídeos, en el paso del vídeo. */
const anclaColaTxt = (it) => { const a = it.tipo === 'bb' && PE.f1[String(it.dOrig)] && PE.f1[String(it.dOrig)].anclaCola; return a && a.bb.includes(it.id) ? ` · ANCLA de este vídeo (método del ${etqD(it.dOrig)}, Palmerton): «${a.ancla}» · al verlo: ${a.pregunta}` : ''; };
for (const [d, m] of Object.entries(PE.f1)) if (m.anclaCola) for (const id of m.anclaCola.bb || []) if (!BB.has(id) || !(MF1[d] && MF1[d].bb.includes(id))) aborta(`_palmerton_estructura_v610.json › f1.${d}.anclaCola: el vídeo B&B ${id} no es del D${d}`);
const tarjetaDiaTxt = (r) => { const m = metDia(r); if (m) return ` Tarjeta del día: ${m.tarjetas}.`; const x = metSis(r); return x ? ` Tarjetas del sistema: ${x.tarjetas}.` : ''; };
const AJ = (k) => (PE.reglasT2[k] && PE.reglasT2[k].ajuste) || aborta('ajuste Palmerton desconocido: ' + k);
/** nivel 0 (A3): preguntas a fondo por mañana y minutos de cada una (60 = 45 de pregunta + 10 de pulir tarjetas + 5 de bitácora, §3.2 modo A; 45 = sin pulido) */
const F1_N0 = { 2: { q: 3, hora: 60 }, 3: { q: 4, hora: 45 }, 4: { q: 4, hora: 45 } };
const nivel0 = (r) => !r.t && !!F1_N0[r.d];
/** filtros (A5): preguntas a fondo / bloques = uWorld (el D2 solo «Cellular pathology», regla del chat) · validación de la misma sesión = Mehlman (D2 Cellular
 *  pathology · D3 Neoplasia, A5; desde el D4, el respaldo del catálogo) · revalidación de 48 h / 5 días = uWorld Unused del subtema anterior (el D2 →
 *  las 5 que quedan de Cellular pathology + Inflammation and repair). */
const UW_AFONDO = { 2: [1110] };
const MH_VAL = { 2: [48], 3: [46] };
const uwAFondo = (d) => UW_AFONDO[d] || MF1[d].uw;
const mhVal = (d) => MH_VAL[d] || MF1[d].mh || [];
const uwReval = (prev) => (prev.d === 2 ? [1110, 1111] : MF1[prev.d].uw);
/** franjas fijas del nivel 0: inicio de la página completa por D# (D2 10:15 · D3-D4 10:45) */
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const PC_INI = Object.fromEntries(Object.entries(F1_N0).map(([d, x]) => [d, hhmm(7 * 60 + 15 + (Number(d) === 2 ? 0 : 30) + x.q * x.hora)]));
/** v6.10b: capacidad de vídeo real por franja de F1 (nivel 0-1) · s0500 solo el D2 (vídeos de MÉTODO, mazo vacío) · s0715 «vídeo pendiente» de las 07:15
 *  (nivel 1, no tras un hito) · spc = la página completa del nivel 0 (vídeo del día primero) · s0900 = deep prime del nivel 1 (vídeo del día primero) ·
 *  s1100 = el resto de la validación de 60′ del D2 · s1800 = las 18:00 sin Day-After (no el D2: regla del chat). */
const CAP_F1 = {
  s0500: (r) => (r.d === D2.d ? D2_0500.total - D2_0500.sync : 0), // v6.10u: 05:01-05:30 = el resto del vídeo FSRS + «The ONLY Video…» 0:00-15:04 + free recall
  s0715: (r) => (nivel0(r) || (trasHito(r) && trasHito(r).n === 1) ? 0 : 28),
  spc: (r) => (nivel0(r) ? 34 : 0),
  s0900: (r) => (nivel0(r) ? 0 : 77),
  s1100: (r) => (r.d === D2.d ? 22 : 0),
  s1800: (r) => (r.d === D2.d || (trasHito(r) && trasHito(r).n <= 4) ? 0 : 15),
};
/** v6.10b: el Palmerton «High Yield Cardiology Part 2» (D11) va ENTERO al tramo 2 (T3-T9), como en la v6.09: así la cola al cierre de F1 y 2027 quedan idénticos. */
const PALM_AL_T2 = new Set(['nFfdaHLtxag']);
const minCola = (c) => c.reduce((a, it) => a + Math.round((it.fin - it.ini) / 60), 0);
/** Reparto de vídeo de un día de contenido (F1 o, v6.05, una desplazada del tramo 2: mismas capacidades por franja). */
function repartoDia(r) {
  const d = r.d; const m = MF1[d]; const rep = { s0500: [], s0715: [], s0900: [], desborde: [] }; REP[d] = rep;
  // v6.09 · lote 1: «no partir si el resto < 3′» solo en F1 (r.t == null) y nunca en unas 07:15 sin holgura (las que reciben las 5Q de la víspera)
  const hg = r.t ? 0 : NO_PARTIR; const hg0715 = cinco0715De(r) ? 0 : hg;
  if (CAP.s0500(d)) llenarDesdeCola(d, CAP.s0500(d), rep.s0500);
  if (CAP.s0715(d)) llenarDesdeCola(d, CAP.s0715(d), rep.s0715, undefined, hg0715);
  let libre = CAP.s0900(d); const hoy = m.bb.map((id) => item('bb', id, d)); const pend = [];
  for (const it of hoy) {
    if (pend.length) { pend.push(it); continue; }
    const r2 = colocar(it, d, libre, rep.s0900, hg); libre -= r2.usado;
    if (r2.resto) pend.push(r2.resto);
  }
  rep.desborde = pend.map((x) => ({ ...x })); colaBB.push(...pend);
  if (r.palm && d > 3 && PALM[r.palm.id]) colaPalm.push(item('palm', r.palm.id, d)); // D2/D3: sus Palmerton se adelantan al D1 (día del UWSA1)
  if (libre >= MIN_TRAMO) llenarDesdeCola(d, libre, rep.s0900, d, hg);
  rep.colaTras = { bbMin: minCola(colaBB), palmMin: minCola(colaMetodo) + minCola(colaPalm) };
}
/** v6.10b · reparto de vídeo de un día de F1 (nivel 0-1): en el orden del día (05:00 · 07:15 · página completa / deep prime con el vídeo de HOY primero · 11:00 ·
 *  18:00), cola estricta (método → B&B → Palmerton High Yield) y partida por minutos; lo de hoy que no cabe va al final de la cola de B&B. */
function repartoF1(r) {
  const d = r.d; const m = MF1[d]; const rep = { s0500: [], s0715: [], spc: [], s0900: [], s1100: [], s1800: [], desborde: [] }; REP[d] = rep;
  const hg = NO_PARTIR;
  // v6.10u: el D2 a las 05:01 ve el resto de «Anki Almost Broke Me…» (desde el límite de capítulo donde paró la configuración: el FAQ, opcional) y «The ONLY
  //   Video…» de 0:00 a 15:04 (corteD2: un límite de capítulo, no un minuto entero); el resto de este, en la cola. Lo que sobre de los 29′, free recall (anki0500D2)
  if (CAP_F1.s0500(r)) {
    const pF = PALM.Te5RnxeG_Gg, ini = CONF_REP[0].fin;
    const fsRest = { ...item('palm', 'Te5RnxeG_Gg', D2.d), ini, min: realMinV(pF.s - ini, d, VEL_METODO) };
    const it = colaMetodo[0], fin = PALM.BOtQJeFE_rc.corteD2;
    if (!it || it.id !== 'BOtQJeFE_rc' || it.ini !== 0) aborta(`${etq(r)}: el Anki de las 05:00 espera «The ONLY Video…» desde 0:00 a la cabeza de la cola`);
    const mO = realMinV(fin, d, VEL_METODO);
    // config_anki: delante va el preset (≥ CONF_MIN.preset) y el resto del vídeo FSRS sale de aquí (va entero al fin de semana, CONF_MOV)
    if (CONF_MOV ? CONF_MIN.preset + mO > CAP_F1.s0500(r) : fsRest.min + mO > CAP_F1.s0500(r)) aborta(`${etq(r)}: ${CONF_MOV ? `el preset (≥${CONF_MIN.preset}′)` : `el resto de «Anki Almost Broke Me…» (${fsRest.min}′)`} + «The ONLY Video…» de 0:00 a ${hms(fin)} (${mO}′) no caben en ${CAP_F1.s0500(r)}′`);
    if (ini < pF.s && !CONF_MOV) rep.s0500.push(fsRest);
    rep.s0500.push({ ...it, fin, min: mO }); colaMetodo[0] = { ...it, ini: fin };
  }
  if (CAP_F1.s0715(r)) llenarDesdeCola(d, CAP_F1.s0715(r), rep.s0715, undefined, hg);
  const slot = nivel0(r) ? 'spc' : 's0900';
  let libre = CAP_F1[slot](r); const hoy = m.bb.map((id) => item('bb', id, d)); const pend = [];
  for (const it of hoy) {
    if (pend.length) { pend.push(it); continue; }
    const r2 = colocar(it, d, libre, rep[slot], hg); libre -= r2.usado;
    if (r2.resto) pend.push(r2.resto);
  }
  rep.desborde = pend.map((x) => ({ ...x })); colaBB.push(...pend);
  if (r.palm && d > 3 && PALM[r.palm.id]) (PALM_AL_T2.has(r.palm.id) ? PALM_RETENIDO : colaPalm).push(item('palm', r.palm.id, d)); // D2/D3: sus Palmerton van a la configuración y al D2 05:00
  if (libre >= MIN_TRAMO) llenarDesdeCola(d, libre, rep[slot], d, hg);
  if (CAP_F1.s1100(r)) llenarDesdeCola(d, CAP_F1.s1100(r), rep.s1100, undefined, hg);
  if (CAP_F1.s1800(r)) llenarDesdeCola(d, CAP_F1.s1800(r), rep.s1800, undefined, hg);
  rep.colaTras = { bbMin: minCola(colaBB), palmMin: minCola(colaMetodo) + minCola(colaPalm) + minCola(PALM_RETENIDO) };
}
const PALM_RETENIDO = [];
for (const r of F1) if (!esHito(r)) repartoF1(r);
// v6.10b: lo que F1 no ve (ni la retención) sería un cambio en 2027 → aborta; el Palmerton retenido vuelve a la cola, como en la v6.09
if (colaMetodo.length || colaBB.length || colaPalm.length) aborta(`v6.10b: la cola de vídeo de F1 no se vacía en F1 (quedan ${minCola(colaMetodo) + minCola(colaBB) + minCola(colaPalm)}′): sube la capacidad de las franjas del nivel 1 (CAP_F1) en vez de pasar más vídeo al tramo 2`);
colaPalm.push(...PALM_RETENIDO);
/** Cola de vídeo al cierre de F1 (META.colaAlCierreF1): v6.05 → se ve en el tramo 2 (abajo); su destino exacto sale de DONDE. */
const COLA_F1 = { bb: colaBB.map((it) => ({ ...it })), palm: [...colaMetodo, ...colaPalm].map((it) => ({ ...it })) };
// v6.05 (24-oct, verificación adversarial): la cola NO se queda sin día. Sigue, en orden y partida por minutos, en las desplazadas del tramo 2
//   (07:15 «vídeo pendiente» ≤30′ salvo el día siguiente a un hito · hueco del deep prime 09:00), con su vídeo propio delante, como en F1…
for (const r of SEQ.slice(F1.length)) if (esCont(r)) repartoDia(r);
//   … y lo que quede tras la última desplazada, en el «vídeo pendiente» 07:15-07:45 de las filas siguientes del tramo 2 (F3; nunca el día de un
//   hito ni el siguiente) hasta vaciarla. Si no se vacía en F3, ABORTA (nada se recorta ni se queda sin fecha).
//   v6.07: con las desplazadas llenando TODO F3, lo que queda al cierre de F3 sigue en las primeras filas de F4 que no son hito, Day-After,
//   taper ni ritual, al principio del BLOQUE A (04:05-04:35, común a los turnos M/T/L; con GUARDIA pasa a la fila siguiente). Si no se vacía
//   antes del primer hito anclado de F4, ABORTA.
const CAP_COLA = 25; // minutos reales de vídeo en la franja 07:15-07:45 de un día de cola (+ ≥5′ de free recall)
const COLA_DIAS = [];
{
  const quedan = () => colaMetodo.length + colaBB.length + colaPalm.length;
  const ultT = SEQ.length > F1.length ? SEQ[SEQ.length - 1].t : 0;
  for (const r of U.DIAS_T2.filter((x) => x.t > ultT)) {
    if (!quedan()) break;
    const prevT = U.DIAS_T2[r.t - 2];
    // v6.07: en F4, solo hasta el primer hito anclado (con ventana); más allá, la cola no se ha vaciado a tiempo → aborta
    if (r.fase !== 'F3' && (DSEM === 'L-V' || (r.tipo === 'hito' && r.ventana))) aborta(`la cola de vídeo de las desplazadas no se vacía ${DSEM === 'L-V' ? 'en F3' : 'antes del primer hito anclado de F4'} (quedan ${minCola(colaBB)}′ de B&B + ${minCola(colaMetodo) + minCola(colaPalm)}′ de Palmerton al llegar a T${r.t} ${r.fecha}, ${r.fase})`);
    if (['hito', 'day_after', 'taper', 'ritual'].includes(r.tipo) || (prevT && prevT.tipo === 'hito')) continue;
    const rep = { s0500: [], s0715: [], s0900: [], desborde: [], colaDia: true }; REP[r.d] = rep;
    llenarDesdeCola(r.d, CAP_COLA, rep.s0715);
    if (!rep.s0715.length) aborta(`T${r.t} ${r.fecha}: el día de cola no admite ni un tramo de vídeo`);
    rep.colaTras = { bbMin: minCola(colaBB), palmMin: minCola(colaMetodo) + minCola(colaPalm) };
    COLA_DIAS.push(r);
  }
  if (quedan()) aborta('la cola de vídeo no se vacía en el tramo 2');
}
/** Cola al cierre de la guía (F1 + desplazadas + días de cola): SIEMPRE vacía (si no, arriba se abortó). */
const COLA_FINAL = { bb: colaBB.map((it) => ({ ...it })), palm: [...colaMetodo, ...colaPalm].map((it) => ({ ...it })) };
/** Dónde cae cada tramo de vídeo (para avisar «pasa a …»). */
const DONDE = []; // { d, slot, it }
for (const [d, rep] of Object.entries(REP)) for (const slot of ['s0500', 's0715', 'spc', 's0900', 's1100', 's1800']) for (const it of rep[slot] || []) DONDE.push({ d: Number(d), slot, it });
const SLOT_TXT = { s0500: '05:00', s0715: '07:15', s0900: '09:00', s1100: '11:00', s1800: '18:00' };
/** v6.10b: hora de una franja de vídeo (la página completa del nivel 0 empieza a las 10:15 el D2 y a las 10:45 el D3-D4) */
const slotHora = (d, slot) => (slot === 'spc' ? PC_INI[d] : SLOT_TXT[slot]);
/** fecha de un d con reparto (F1, desplazada o día de cola del tramo 2) */
const FECHA_D = (d) => (filaD(d) || U.DIAS_T2.find((x) => x.d === d)).fecha;
function destinoDe(it) {
  const xs = DONDE.filter((x) => x.it.tipo === it.tipo && x.it.id === it.id && x.it.dOrig === it.dOrig && x.it.fin > it.ini && x.it.ini < it.fin);
  // v6.05: con la cola vaciada en el tramo 2 todo tramo tiene franja; si no, es un error del reparto (antes: «→ TRAMO 2 (…)» sin día)
  if (!xs.length) { ERR.push(`vídeo sin franja: ${it.tipo === 'bb' ? bbRuta(it.id) : PALM[it.id].t} ${it.ini}-${it.fin}s (${etqD(it.dOrig)})`); return TRAMO2_TXT; }
  // v6.05 (24-oct): si una parte del vídeo sigue en la cola al cierre de F1 (COLA_FINAL), el aviso lo dice con su tramo (antes solo se
  //   nombraban las franjas donde SÍ cabía: con F1 = 47 el Palmerton Neuro Part 2 del D45 se ve 0:00-39:00 el D46 y el resto va al tramo 2)
  const resto = [...COLA_FINAL.bb, ...COLA_FINAL.palm].find((x) => x.tipo === it.tipo && x.id === it.id && x.dOrig === it.dOrig && x.fin > it.ini && x.ini < it.fin);
  const fmt = it.tipo === 'bb' ? mmss : hms;
  return xs.map((x) => `${etqD(x.d)} ${fd(FECHA_D(x.d))} ${slotHora(x.d, x.slot)}`).join(' + ') + (resto ? ` + el resto (${fmt(resto.ini)}→${fmt(resto.fin)}) → ${TRAMO2_TXT}` : '');
}

// ── 2) PREGUNTAS uWorld (estimación: lo que este plan consume de cada System) ───────────────────────────────────────────────────────
const POOL = new Map([...UWY].map(([id, v]) => [id, v.q]));
const organoDe = (id) => UWY.get(id).nombre.replace(/ \([^()]*\)$/, '');
const sistemasOrgano = (id) => [...UWY.keys()].filter((x) => organoDe(x) === organoDe(id));
const disp = (ids) => ids.reduce((a, id) => a + (POOL.get(id) || 0), 0);
function tomar(ids, n) { let falta = n; for (const id of ids) { if (falta <= 0) break; const t = Math.min(POOL.get(id) || 0, falta); POOL.set(id, (POOL.get(id) || 0) - t); falta -= t; } return n - falta; }
const vistos = []; // Systems de uWorld de los días de contenido ya hechos (orden de aparición)
const VISTOS_ANTES = {}; // d → Systems vistos ANTES de ese día (para la eval de las 18:00, que incluye el de hoy)
const QS = {}; // d → { val, pre, con, ev, dispAntes, deficit }
const uwDe = (d) => (MF1[d] ? MF1[d].uw : []);
function sistemasSoFar(r) { // Systems del mismo sistema del plan hasta hoy (hoy primero, luego hacia atrás)
  const out = [...uwDe(r.d)];
  for (let i = IDX.get(r.d) - 1; i >= 0; i--) { const x = SEQ[i]; if (esHito(x)) continue; if (x.system !== r.system) break; for (const id of uwDe(x.d)) if (!out.includes(id)) out.push(id); }
  return out;
}
for (const r of SEQ) { // v6.05: F1 y después las desplazadas del tramo 2 (el pool de uWorld sigue gastándose en orden)
  if (esHito(r) || !esCont(r)) continue;
  const d = r.d; const hoy = uwDe(d); const q = { val: 0, pre: 0, con: 0, ev: 0, dispAntes: disp(hoy), deficit: 0 };
  const th = trasHito(r); const prev = contAtras(r, 1);
  VISTOS_ANTES[d] = [...vistos];
  // v6.10b · F1 en nivel 0-1: revalidación del subtema anterior (uWorld, 5) · a fondo (nivel 0: 3-4) o bloques 1 y 2 (nivel 1: 5 + 5; tras un hito, solo el 1) ·
  //   la validación de la misma sesión es de Mehlman (no gasta uWorld) · la eval de 10Q del 6/6 del Day-After del NBME 25 (D12), como estaba
  if (!r.t) {
    if (prev) q.val = tomar(uwReval(prev), 5);
    const pide = nivel0(r) ? F1_N0[d].q : th && th.n === 1 ? 5 : 10;
    q.deficit = Math.max(0, pide - disp(nivel0(r) ? uwAFondo(d) : hoy));
    if (nivel0(r)) q.pre = tomar(uwAFondo(d), F1_N0[d].q);
    else { q.pre = tomar(hoy, 5); q.con = th && th.n === 1 ? 0 : tomar(hoy, 5); }
    if (th && th.n === 4) q.ev = tomar([...vistos, ...hoy.filter((x) => !vistos.includes(x))].sort((a, b) => POOL.get(b) - POOL.get(a)), 10);
    q.quedanReval = disp(uwReval(r)); // v6.10r: Unused de uWorld que le quedan al subtema para su revalidación (el plan B de la validación no las toca)
  }
  else if (d === 2) { q.pre = tomar(hoy, 8); }
  else if (d === 3) { q.pre = tomar(hoy, 10); }
  else if (d === 4) { q.pre = tomar(hoy, 10); q.con = tomar(hoy, 10); q.ev = tomar([1112, 1072, 1004], 5); }
  else if (d === 5) { q.val = tomar([1004], 5); q.pre = tomar(hoy, 10); q.con = tomar(hoy, 10); q.ev = tomar([...vistos].sort((a, b) => POOL.get(b) - POOL.get(a)), 5); }
  else {
    if (prev && !(th && th.n === 1)) q.val = tomar(uwDe(prev.d), 5);
    const necesita = 10 + (r.nivelUW === 1 ? 20 : r.nivelUW === 3 || r.nivelUW === 4 ? 10 : 0);
    q.deficit = Math.max(0, necesita - q.dispAntes);
    q.pre = tomar(hoy, 10);
    if (r.nivelUW === 1) q.con = tomar(hoy, 20);
    else if (r.nivelUW === 2) q.con = tomar(prev ? uwDe(prev.d) : [], 5) + tomar(sistemasSoFar(r), 25);
    else if (r.nivelUW === 4) q.con = tomar([...vistos].filter((x) => !hoy.includes(x)).sort((a, b) => POOL.get(b) - POOL.get(a)), 20) + tomar(hoy, 10); // v6.05: viernes N4 (mixtos)
    else q.con = tomar(sistemasOrgano(hoy[0]).filter((x) => !hoy.includes(x)).concat(hoy), 20) + tomar(hoy, 10);
    const evN = th && th.n <= 3 ? 0 : 10;
    if (evN) q.ev = tomar([...vistos, ...hoy.filter((x) => !vistos.includes(x))].sort((a, b) => POOL.get(b) - POOL.get(a)), evN);
  }
  QS[d] = q;
  for (const id of hoy) if (!vistos.includes(id)) vistos.push(id);
}

// ── 3) CONSTRUCTORES de bloques ─────────────────────────────────────────────────────────────────────────────────────────────────
const aMin = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
const minF = (fr) => { const m = /^(\d{2}:\d{2})–(\d{2}:\d{2})$/.exec(fr); return m ? aMin(m[2]) - aMin(m[1]) : NaN; };
const ERR = [];
function dedupe(rs) { const seen = new Set(); return rs.filter((r) => { const k = r.t + '|' + r.url; if (seen.has(k)) return false; seen.add(k); return true; }); }
function B(fecha, franja, titulo, pasos, recursos, hecho, extra = {}) {
  const total = minF(franja); const suma = pasos.reduce((a, p) => a + p.min, 0);
  if (suma !== total) ERR.push(`${fecha} ${franja} «${titulo}»: Σ pasos ${suma} ≠ ${total}`);
  for (const p of pasos) if (!Number.isInteger(p.min) || p.min < 1) ERR.push(`${fecha} ${franja}: paso con min ${p.min}`);
  const g = { franja, plan: 'usmle', titulo, totalMin: total, pasos, recursos: dedupe(recursos), hecho };
  if (extra.planB) g.planB = extra.planB;
  if (extra.aviso) g.aviso = extra.aviso;
  return g;
}
const P = (min, que, como, enlace) => (enlace ? { min, que, como, enlace } : { min, que, como });
const TUTOR = 'Tutor (sin reloj)', TIMED = 'Timed (90 s/Q · tope 2 min)';
// v6.10j (rev. c14, vetadas #8): el modo (Tutor sin reloj / Timed), el nº de preguntas y Status: Unused van DELANTE de los Systems (el «qué» ya los nombra):
//   el Calendar corta el «cómo» a 110 y antes caía dentro de «System «…»» y se perdía «Tutor (sin reloj)» · «1 pregunta» en singular
const nPreg = (n) => `${n} pregunta${n === 1 ? '' : 's'}`;
// v6.11 (lun 23-nov-2026 · chat USMLE, verificado EN VIVO en Qbankly): el menú «QBanks» se llama ahora «Question Bank Library»; el banco se abre con su «Select»
//   (pasa a ser el banco ACTIVO: hoy lo es el UWSA1, así que cada sesión empieza por el Select de su banco) y el test se arma en su Dashboard › «+ New Test».
//   ÚNICA fuente de las rutas de Qbankly de esta guía (F1 y tramo 2): antes «QBanks › … › Select (QBank)», «(ACTIVE QBANK) › New Test» y «Test Composer».
const QBK = { menu: 'Question Bank Library', boton: '«+ New Test»' };
const qbSel = (banco) => `${QBK.menu} › ${banco} › Select`;
const QB_NT = `Dashboard › ${QBK.boton}`;
const QB_UW = qbSel('uWorld - USMLE Step 1'), QB_MH = qbSel('Mehlman - Step 1 QBank - 2026');
const tcUW = (ids, n, modo) => `${QB_UW} → ${QB_NT} → ${modo} · ${nPreg(n)} · Status: Unused · Subjects: todos · Order: por defecto · System${ids.length > 1 ? 's' : ''} ${ids.map(uwNom).join(' + ')} → BEGIN TEST`;
const tcMH = (ids, n, modo) => `${QB_MH} → ${QB_NT} → ${modo} · ${nPreg(n)} · Status: Unused · System${ids.length > 1 ? 's' : ''} ${ids.map(mhNom).join(' + ')} → BEGIN TEST`;
// v6.10r (jue 19-nov-2026 · hallazgos 1-2 del chat USMLE, verificación EN VIVO en Qbankly): New Test arma SOLO desde el banco ACTIVO (hoy lo es el UWSA1, no
//   «uWorld - USMLE Step 1»: el «(ACTIVE QBANK)» de los textos era falso) y «Number of Questions» viene en 20; Tutor es la opción por defecto y no hay casilla
//   «sin reloj» → en F1 cada sesión de Qbankly empieza seleccionando su banco (uWorld 07:15-10:15 y bloques · Mehlman en la validación) y dice el número de
//   preguntas; «Tutor (sin tiempo por pregunta)» en vez de «sin reloj». (v6.11: la ruta, QBK / qbSel / QB_NT, es ya la misma en F1 y en el tramo 2.)
const TUTOR1 = 'Tutor (sin tiempo por pregunta)';
const nQ1 = (n) => `Number of Questions: ${n} (no 20)`;
// remate v6.10r (revisión «verdad-calendar» MEDIA #2): «Status: Unused» DELANTE del número de preguntas: con el Select del banco delante, el corte de 110 del
//   Calendar lo dejaba fuera en los 48 pasos de armar (y desde el mié 25 los Systems ya tienen preguntas usadas: sin el filtro puede salir una repetida)
// v6.10t (auditoría c19 · cambios-c19 #9): «Tutor» junto a «New Test» y lo que va por defecto, detrás del número de preguntas: el corte de 110 del Calendar
//   caía tras la palabra suelta «Tutor» («… (no 20) · Tutor …»).
// v6.11 (remate, revisión USMLE MEDIA): con la ruta real («Question Bank Library › <banco> › Select»), banco + Select + botón + Status + N ya no caben en los 110
//   del Calendar → el NÚMERO de preguntas justo tras el botón (viene en 20: es el error caro; Status: Unused, detrás, y en el «qué» ya van el nº y el modo) y sin
//   «Dashboard ›» (el Select ya lleva al Dashboard; lo dice el recurso R_UW). uWorld corta en «… Number of Questions: 1 (no 20) …»; Mehlman, en «… Questions: 5 …»
const tcUW1 = (ids, n) => `${QB_UW} → ${QBK.boton} → ${nQ1(n)} · Status: Unused · Tutor (por defecto) · Subjects: todos · Order: por defecto · System${ids.length > 1 ? 's' : ''} ${ids.map(uwNom).join(' + ')} → BEGIN TEST`;
const tcMH1 = (ids, n) => `${QB_MH} → ${QBK.boton} → ${nQ1(n)} · Status: Unused · Tutor (por defecto) · System${ids.length > 1 ? 's' : ''} ${ids.map(mhNom).join(' + ')} → BEGIN TEST`;
const L_UW = { t: `Qbankly › ${QBK.menu}`, url: QBQ };
const R_UW = { t: `Qbankly › ${QBK.menu} (Select → Dashboard › ${QBK.boton})`, url: QBQ };
const R_VID = { t: 'Qbankly › Video Library (B&B Step 1)', url: QBV };
const R_ANKI = { t: 'AnkiWeb (solo si el escritorio falla)', url: 'https://ankiweb.net/decks' };
const respaldo = (d, n) => (MF1[d] && MF1[d].mh && MF1[d].mh.length
  ? `Si ${QBK.boton} muestra < ${n} Unused en esos Systems: haz las que haya y completa con Mehlman (${QB_MH}) → ${MF1[d].mh.map(mhNom).join(' + ')}, mismo modo; después vuelve a uWorld (${QB_UW}). Nunca preguntas de otro tema.`
  : 'Si no hay Unused suficientes: las que haya + Status Incorrect del mismo System; nunca preguntas de otro tema.');
/** v6.10r: el respaldo de F1 con la ruta verificada (Select del banco) y el número de preguntas */
const respaldo1 = (d, n) => (MF1[d] && MF1[d].mh && MF1[d].mh.length
  ? `Si ${QBK.boton} muestra < ${n} Unused en esos Systems: haz las que haya y completa con Mehlman (${QB_MH} → ${QB_NT} → Number of Questions: las que falten · Tutor) → ${MF1[d].mh.map(mhNom).join(' + ')}; después vuelve a uWorld (${QB_UW}). Nunca preguntas de otro tema.`
  : 'Si no hay Unused suficientes: las que haya + Status Incorrect del mismo System; nunca preguntas de otro tema.');

function pasosVideo(d, arr) {
  return arr.map((it) => {
    const vv = velDe(it, d); // v6.10r: los Palmerton de MÉTODO, a 1,0× (× 1,2) en cualquier día
    if (it.tipo === 'bb') {
      const v = BB.get(it.id); const entero = it.ini === 0 && it.fin === v.s;
      const tramo = entero ? `(${mmss(v.s)})` : `de ${mmss(it.ini)} a ${mmss(it.fin)} (dura ${mmss(v.s)}; Qbankly guarda el minuto)`;
      return P(it.min, `${bbRuta(it.id)} ${tramo}`, `${vv.txt}${it.dOrig !== d ? ` · PENDIENTE del ${etqD(it.dOrig)}` : ''} · pausa y anota cada idea en 1 línea (patogenia → presentación)${anclaColaTxt(it)}`, { t: 'Video Library (B&B Step 1)', url: QBV });
    }
    const p = PALM[it.id];
    const entero = it.ini === 0 && it.fin === p.s;
    const tramo = entero ? `(${hms(p.s)})` : `de ${hms(it.ini)} a ${hms(it.fin)} (dura ${hms(p.s)})`;
    const coma = (x) => (Number.isInteger(x) ? `${x},0` : String(x).replace('.', ','));
    // v6.10r: un tramo con minutos de más (el del D2 a las 05:10: 20′ para 15:04 de vídeo) dice para qué son
    const extra = it.min - realMinV(it.fin - it.ini, d, vv);
    // remate v6.10r (revisión BAJA #4): con minutos de más, la cuenta con los segundos reales («15:04 de vídeo ÷ 1,0 × 1,2 = 19′ + 1′»; antes «15 min … + 1′» = 19 ≠ 20)
    const minTxt = extra > 0 ? `${it.min}′ = ${hms(it.fin - it.ini)} de vídeo ÷ ${coma(vv.v)} × ${coma(vv.f)} por las pausas (${it.min - extra}′) + ${extra}′ para cerrar las notas`
      : `${it.min}′ = ${Math.round((it.fin - it.ini) / 60)} min de vídeo ÷ ${coma(vv.v)} × ${coma(vv.f)} por las pausas`;
    const sigue = it.ini ? (it.dOrig !== d ? ` · PENDIENTE del ${etqD(it.dOrig)}: sigue desde el minuto ${hms(it.ini)}` : ` · sigue desde el minuto ${hms(it.ini)} (lo empezaste antes, hoy)`) : '';
    // v6.10i (auditoría c12): entre comillas SOLO el título real de YouTube; el nombre con el que lo lista la app (PALM.app), fuera de ellas
    const enApp = p.app ? ` (en la app: «${p.app}»)` : '';
    // v6.10r (verificación en vivo, 19-nov): el que arranca DOBLADO dice cómo volver al audio original, delante (dentro del corte de 110 del Calendar)
    // v6.10u: el FSRS (sin doblaje) también con «CC: inglés (automáticos)» —sus subtítulos en inglés son solo automáticos (catálogo, verificado en vivo)
    const audio = p.doblado ? `${AUDIO_EN} (arranca doblado) · CC: inglés (automáticos) · 1,0×` : METODO[it.id] ? '1,0× · CC: inglés (automáticos)' : vv.txt;
    if (METODO[it.id]) return P(it.min, `Palmerton · «${p.t}»${enApp} ${tramo}`, `YouTube · ${audio}${sigue} · ${METODO[it.id].como} · ${minTxt}`, { t: it.ini ? 'YouTube (desde ese minuto)' : 'YouTube', url: yt(it.id, it.ini) });
    // v6.09b · lote 1-bis: en F1 (d < 100) el texto dice las pausas que ya llevan los minutos (÷ velocidad × 1,15); el tramo 2 (2027) queda igual (otro lote)
    return P(it.min, `Palmerton · «${p.t}»${enApp} de ${hms(it.ini)} a ${hms(it.fin)} (dura ${hms(p.s)})`, `YouTube a ${String(vv.v).replace('.', ',')}× con subtítulos · visión del sistema (${etqD(it.dOrig)}): ${d < 100 ? `escucha, pausa y anota 3 ideas (${minTxt}); sin tarjetas` : 'escucha y anota 3 ideas; sin tarjetas'}`, { t: 'YouTube (desde ese minuto)', url: yt(it.id, it.ini) });
  });
}
const recVideo = (arr) => arr.map((it) => (it.tipo === 'bb' ? { t: bbRuta(it.id), url: QBV, min: Math.round(BB.get(it.id).s / 60) } : { t: `Palmerton · ${PALM[it.id].t}`, url: yt(it.id, it.ini), min: Math.round(PALM[it.id].s / 60) }));
const libTxt = (d, n) => MF1[d].lib.slice(0, n).map(([e, doc]) => libNom(e, doc)).join(' + ');
const recLib = (d) => MF1[d].lib.map(([e, doc], i) => ({ t: `${libNom(e, doc)}${i < 2 ? '' : ' (si sobra tiempo)'}`, url: lib(e, doc) }));
const pathomaTxt = (d) => (MF1[d].pathoma ? ` · Pathoma ${MF1[d].pathoma.map((c) => `cap. ${c} (${PATHOMA[c]})`).join(' + ')} SOLO si tienes cuenta` : '');

// ANKI 05:00
// v6.10j (rev. c14, dias-clave #3): `restante` = el 07:15 de ese día tiene el paso «… + Anki restante» (el repaso del nivel 1 sin vídeo pendiente y el del
//   tramo 2). Si no lo tiene (nivel 0 —D2-D4—, repaso con vídeo pendiente, Day-After), las vencidas que no caben van al próximo Anki AM y no a un «Anki
//   restante (07:15)» que ese día no existe (vie 27-nov · mié 25-nov · mié 2-dic · vie 4-dic · mié 9-dic en el Calendar). Lo decide quien arma el día.
const tieneAnkiRestante = (gs) => gs.some((g) => g && g.pasos.some((p) => /Anki restante/.test(p.que)));
function anki0500(r, restante = true) {
  const d = r.d; const f = r.fecha; const rep = REP[d];
  const i = IDX.get(d); const prevPlan = i > 0 ? SEQ[i - 1] : null;
  const creadas = prevPlan ? (antesTxt(prevPlan.fecha, f) === 'ayer' ? 'ayer' : `el ${fd(prevPlan.fecha)}`) : 'ayer';
  // v6.09 · lote 1 (17-nov-2026, auditoría a1-11/a1-15): la cola de vídeo ya no entra a las 05:00 (antes, del D3 al D5, «ANKI AM (mazo casi vacío) +
  //   vídeo pendiente» 05:00-05:45 sin repasos ENCAPS): esos días el Anki AM es el de siempre (05:00-05:30) y el vídeo pendiente va a las 07:15
  if (rep && rep.s0500.length) aborta(`${etq(r)} ${f}: vídeo en la franja de las 05:00 (el contrato del Anki AM no lo admite)`);
  const hito = esHito(r);
  // v6.07: en F1 (tramo 1) el Anki de las 05:00 es USMLE 30′ + repasos ENCAPS 15′ (05:30-05:45, guía ENCAPS) también los días de Step
  const f1 = r.t == null;
  return B(f, f1 ? '05:00–05:30' : '05:00–05:45', `ANKI AM · cola FSRS de APEX::USMLE${hito ? ' (antes del hito)' : ''}${f1 ? ' · 05:30 repasos ENCAPS' : ''}`, [
    P(2, 'Sync + APEX::USMLE (mazo PADRE) › Study Now', `Anki escritorio · un solo clic en el padre: Anki junta todos los submazos (Pharm incluido). Si la telemetría de ayer dio ALARMA G (backlog > 100 o retención < 85 %) → hoy PROTOCOLO DE BACKLOG (${METODO_MD} §7): New cards/day 0 · Maximum reviews/day 200.`),
    P(f1 ? 20 : 33, 'VENCIDAS primero (reviews first) · sin tope (Maximum reviews/day 9999)', 'Lee el frente, responde EN VOZ ALTA y gira: Good si recordaste la lógica central (≈90 %, no palabra por palabra) · Again solo si la olvidaste (≈10 %) · nunca Hard/Easy · lee primero la línea «Summary:» (20-30 s por tarjeta).'),
    P(f1 ? 6 : 8, `NUEVAS: las APEX que creaste ${creadas} (preset ${AK.nuevasDia}/día)`, hito
      ? 'Solo si las vencidas llegaron a 0; si no, nuevas = 0 hoy (esperan en la cola). Hoy NO se crean tarjetas: el NBME se corrige desde las 18:00 (Day-After).'
      : `Solo si las vencidas llegaron a 0. Si a las ${f1 ? '05:22' : '05:37'} aún quedan vencidas: nuevas = 0 hoy (esperan en la cola) y las vencidas que falten van ${restante ? `al «Anki restante» de las 07:15 de hoy o ${ankiAmSigTxt(f)}` : ankiAmSigTxt(f)}, siempre antes que nuevas.${f1 ? ' A las 05:30 pasas a los repasos ENCAPS (15′): no los recortes por el USMLE.' : ''}`),
    P(2, 'Sync final + telemetría', 'Sync · node DATA/_scripts/anki_telemetria.js → due · backlog · retención 30 d · % Again (sano ≈10 %; > 20 % = tarjetas largas o perfeccionismo → divídelas; ≈0 % = no te estás examinando).'),
  ], [R_ANKI], '0 vencidas en APEX::USMLE (las nuevas solo después) y la telemetría registrada', { ...(ultimoAnkiRealF1(f) ? { aviso: `Nuevas de hoy que no entren → reinicio del ${fd(FV6.step1.reinicio)}. Último Anki AM de F1 con nuevas. Pausa del Step 1: finde sin Anki · mantenimiento desde el ${fd(FV6.encaps.intensiva_desde)} (las vencidas, primero).` } : {}), planB: 'Anki escritorio no abre → AnkiWeb/AnkiDroid solo para repasar; nunca «Forget» ni resetear el mazo (borra el historial del algoritmo).' });
}
/** v6.11 fase 2: ¿la fila de Step `f` (fecha de plan) es el ÚLTIMO Anki AM real de F1? = ninguna fecha de plan posterior de F1 tiene día real (las del mié 30 y el jue
 *  31-dic son cola FSRS) y es la última fila de Step de F1. */
function ultimoAnkiRealF1(f) {
  if (f !== F1[F1.length - 1].fecha) return false;
  for (let t = V6.add(f, 1); t <= FV6.transicion.hasta; t = V6.add(t, 1)) { const w = new Date(t + 'T12:00:00Z').getUTCDay(); if (w >= 1 && w <= 5 && !FV6.skip.includes(t) && conDiaReal(t)) return false; }
  return true;
}

// REPASO 07:15 (genérico D6+)
function repaso0715(r) {
  const d = r.d; const f = r.fecha; const prev = contAtras(r, 1); const rep = REP[d]; const d3 = contAtras(r, 3); const d7 = contAtras(r, 7);
  const vids = pasosVideo(d, rep.s0715); const V = vids.reduce((a, p) => a + p.min, 0);
  // v6.05: en el tramo 2, «ayer» solo si la última sesión de contenido fue el día natural anterior (p. ej. Semana Santa: T7 mié 24 → T8 lun 29-mar)
  // v6.07: también en F1 (Step solo mar · jue: la sesión anterior es de hace 2 o 5 días)
  const lejos = antesTxt(prev.fecha, f) !== 'ayer';
  // v6.09 · lote 1 (auditoría a1-13): si la consolidación N2 de la víspera (F1, 18:00 = Day-After) bajó a 25Q, sus 5Q que faltan van aquí (11′ =
  //   5 × 90 s + revisión 5 × 0,85′), con 2′ menos de shopping list y ≤28′ de vídeo pendiente (CAP.s0715) → el paso flexible queda ≥ 3′
  const v5 = cinco0715De(r);
  // v6.09b · lote 1-bis (F1): la validación de 5Q TIMED lleva su revisión (11′ = 5 × 90 s + 5 × 0,85′; antes 10′ sin revisión) y la shopping list da 1′:
  //   la franja de vídeo pendiente (CAP.s0715) y el paso flexible no cambian → el reparto de la cola es el mismo. El tramo 2 (2027) queda igual.
  const f1v = !r.t; const val = f1v ? 11 : 10;
  const sh = (v5 ? 8 : 10) - (f1v ? 1 : 0);
  const pasos = [
    P(sh, `Shopping list + free recall de ${lejos ? `la ÚLTIMA SESIÓN (${fd(prev.fecha)})` : 'AYER'}: «${corto(txtSub(prev), 80)}» (${etq(prev)})`, `Lee tus notas de 📏 Medición ${lejos ? `del ${fd(prev.fecha)}` : 'de ayer'}; después, SIN mirar, escribe en 90 s la cadena causal del subtema y marca lo que no salió.`),
    P(val, lejos ? `5Q TIMED del subtema del ${fd(prev.fecha)} (validación a los ${diasEntre(prev.fecha, f)} días · 1.ª mitad del gate de 10Q)` : '5Q TIMED del subtema de ayer (validación 24-48 h · 1.ª mitad del gate de 10Q)', f1v ? `${tcUW(uwDe(prev.d), 5, TIMED)} · 90 s/Q (7,5′) + revisión del Educational Objective de cada fallo y cada duda (≈0,85′/Q) → tipo de error en 📏 Medición.` : tcUW(uwDe(prev.d), 5, TIMED), L_UW),
    ...(v5 ? [P(11, `5Q TIMED que quedaron de la consolidación del ${fd(v5.fecha)} (${etq(v5)}: 25Q a las 11:00 + estas 5 = las 30 del nivel 2)`, `${tcUW(sistemasSoFar(v5), 5, TIMED)} · 90 s/Q (7,5′) + revisión del Educational Objective de cada fallo (≈0,85′/Q) → tipo de error en 📏 Medición; cuentan para el % de la consolidación de ese día.`, L_UW)] : []),
    ...vids,
  ];
  const resto = 60 - val - sh - (v5 ? 11 : 0) - V;
  const dd = [d3 && ['D-3', d3], d7 && ['D-7', d7]].filter(Boolean);
  // v6.09 · lote 1: con ≤ 5′ (días con las 5Q de la víspera) el paso es solo el free recall; las vencidas que quedaran a las 05:00 → mañana 05:00
  // v6.10g (revisión 18-nov · corte del Calendar a 150): el «qué» con los dos subtemas cabe entero (etiquetas T# y «+ Anki restante» visibles): si se pasa, se
  //   acorta el subtema más largo (de 5 en 5, mínimo 25); antes cada subtema llevaba +10 de margen y el corte se comía la etiqueta del 2.º
  const recallQue = (cola) => {
    const n = dd.map(() => 50);
    const sub = (x, k) => corto(txtSub(x[1]), n[k], 0);
    const txt = () => `${dd.map((x) => x[0]).join(' / ')}: free recall de ${dd.map((x, k) => `«${sub(x, k)}» (${etq(x[1])})`).join(' y ')}${cola}`;
    for (let t = txt(); t.length > 150 && Math.max(...n) > 25; t = txt()) { const L = dd.map((x, k) => sub(x, k).length); n[L.indexOf(Math.max(...L))] -= 5; }
    return txt();
  };
  if (resto > 0 && v5 && resto <= 5) pasos.push(P(resto, recallQue(''), 'Sin mirar: 3 ideas de cada uno (≈1′ por subtema); lo que salga < 60 % → busca sus tarjetas y márcalas Again. Hoy no hay «Anki restante»: si quedaron vencidas a las 05:00, van primero en el próximo Anki AM (antes que las nuevas).'));
  else if (resto > 0) pasos.push(P(resto, recallQue(' + Anki restante'), 'Sin mirar: 3 ideas de cada uno; lo que salga < 60 % → busca sus tarjetas y márcalas Again. Si quedaron vencidas a las 05:00, termínalas aquí.'));
  return B(f, '07:15–08:15', `REPASO ANCLADO · validación del ${etq(prev)}${v5 ? ` + 5Q de la consolidación del ${etq(v5)}` : ''}${V ? ' + vídeo pendiente' : ''}`, pasos, [R_UW, ...recVideo(rep.s0715)], `${v5 ? '5Q de validación + las 5Q de la consolidación hechas' : '5Q hechas'} (≥4/5 → subtema ${delPrevTxt(prev, f)} validado; <4/5 → 5Q más de ese System en la consolidación) y el free recall escrito`, { planB: respaldo(prev.d, 5) });
}

// PRE-TEST 08:15 (genérico D6+)
function pretest(r) {
  const d = r.d; const q = QS[d]; const hoy = uwDe(d);
  return B(r.fecha, '08:15–09:00', `PRE-TEST · 10Q ciegas · ${corto(txtSub(r), 60)}`, [
    P(3, `Armar: ${hoy.map(uwNom).join(' + ')}`, tcUW(hoy, 10, TUTOR), L_UW),
    ...(!r.t ? [
      P(tutMin(10), '10Q ciegas del tema NUEVO (sin haber visto nada de hoy)', `SAQ (pregunta autónoma) antes de mirar las opciones + CCSN; después lee la explicación entera (Tutor: ${TUTOR_TXT}).`),
      P(12, 'Free recall 90 s + shopping list', 'Escribe sin mirar lo que ya sabes del tema; cada duda, también en los aciertos, a la shopping list de 📏 Medición (pre-test /10).'),
      faAcotado(30 - tutMin(10), MF1[d].fa, 'la respuesta de las dudas de la shopping list', 'la Lectura activa del DEEP PRIME de las 09:00 (misma sección)'),
    ] : [
      P(30, '10Q ciegas del tema NUEVO (sin haber visto nada de hoy)', 'SAQ (pregunta autónoma) antes de mirar las opciones + CCSN; después lee la explicación entera (~3′ por pregunta).'),
      P(12, 'Free recall 90 s + shopping list', 'Escribe sin mirar lo que ya sabes del tema; cada duda, también en los aciertos, a la shopping list de 📏 Medición (pre-test /10).'),
    ]),
  ], [R_UW], 'nota /10 en 📏 Medición (40-60 % es normal: es diagnóstico, no gate)', { planB: respaldo(d, 10), aviso: q.deficit ? `Según este plan, a estos Systems de uWorld les quedan ~${q.dispAntes} Unused antes de hoy y el día pide ${q.dispAntes + q.deficit} (pre-test + consolidación): cuando ${QBK.boton} se quede corto, usa el respaldo de abajo (Mehlman).` : undefined });
}

// DEEP PRIME 09:00
function deepPrime(r) {
  const d = r.d; const m = MF1[d]; const rep = REP[d];
  const vids = pasosVideo(d, rep.s0900); const V = vids.reduce((a, p) => a + p.min, 0);
  const L = 95 - V; const nDocs = Math.min(m.lib.length, L >= 45 ? 4 : L >= 35 ? 3 : 2);
  const pasos = [
    ...vids,
    // v6.09b lote 1-quater FX1 (revisión V1 · Lectura activa): PassMedicine / uWorld Medical Library piden sesión y First Aid va sin páginas → material NO MEDIBLE: en F1
    //   la lectura se ACOTA a sus minutos (orden fijo, «marca dónde paras») y es lectura de VERIFICACIÓN de la sección (no promete leerla entera); antes «Whole Page Rule:
    //   la sección completa» sin acotar. El tramo 2 (2027) sigue igual (otro lote).
    !r.t
      ? P(L, `no medible (pide sesión): acotado a ${L}′ — Lectura activa: First Aid 2026 › ${m.fa} → ${libTxt(d, nDocs)}${pathomaTxt(d)}`, `${metodoLeerTxt(r)}Acotada a ${L}′ en ese orden; marca dónde paras. Es lectura de VERIFICACIÓN de la sección: no promete leerla entera (lo que no entre no vuelve; lo que falles en la consolidación de las 11:00 sí, por sus tarjetas). Whole Page Rule en lo que leas: el concepto entero, no solo el dato; 3-5 puntos high-yield a mano + 1 esquema.${m.lib.length > nDocs ? ` Si te sobra tiempo dentro de los ${L}′: ${m.lib.slice(nDocs).map(([e, doc]) => libNom(e, doc)).join(' · ')}.` : ''}`, { t: libNom(m.lib[0][0], m.lib[0][1]).replace(/^[^·]*· /, ''), url: lib(m.lib[0][0], m.lib[0][1]) })
      : P(L, `Lectura activa: ${libTxt(d, nDocs)} + First Aid 2026 › ${m.fa}${pathomaTxt(d)}`, `${metodoLeerTxt(r)}Whole Page Rule: la sección completa, no solo el dato; 3-5 puntos high-yield a mano + 1 esquema.${m.lib.length > nDocs ? ` Si sobra tiempo: ${m.lib.slice(nDocs).map(([e, doc]) => libNom(e, doc)).join(' · ')}.` : ''}`, { t: libNom(m.lib[0][0], m.lib[0][1]).replace(/^[^·]*· /, ''), url: lib(m.lib[0][0], m.lib[0][1]) }),
    // v6.10o (rev. c17, vetadas #10 · cambios #5): el «cómo» (110) se cortaba en «Antes de cada una, EN …» tras la tarjeta del día y se perdía la consigna oral
    //   → la consigna va ENTERA en el «qué» (≤ 150 con el mazo más largo, Gastroenterology); el «cómo» empieza por la tarjeta del día y la Whole Page Rule (antes en
    //   el «qué») pasa detrás de los tipos (mismo contenido, mismos minutos)
    //   Remate v6.10o (revisión «visibilidad» #2): «(Whole Page Rule)» vuelve al «qué» en lugar de «de lo leído/visto» (≤ 145 con Gastroenterology): en el «cómo»
    //   quedaba detrás del corte y el Calendar ya no la enseñaba en ningún bloque del día; «lo leído/visto» sigue en el «cómo» (toda la sección que acabas de leer/ver)
    // v6.10p (ronda c18, área usmle-mir · #7): los 4 tipos, sin ejemplos y entre comillas (un solo tramo: el Calendar los enseña enteros o ninguno; antes «Tipos:
    //   concept («use the pathophysiology to explain…») …», lista a medias en el DEEP PRIME del 4, 9, 16, 18, 23 y 28-dic); los ejemplos de concept y transfer,
    //   detrás de la Whole Page Rule (mismo contenido)
    P(18,`≤${AK.deepPrime} tarjetas APEX (Whole Page Rule) → ${deckApex(r)} · antes de cada una, EN VOZ ALTA: patogenia → presentación → cómo se conectan`, `${tarjetaDiaTxt(r).trim() ? tarjetaDiaTxt(r).trim() + ' ' : ''}Tipos: «concept · P-to-P · compare & contrast · transfer». Whole Page Rule: toda la sección que acabas de leer/ver, no solo el dato. Ejemplos: concept («use the pathophysiology to explain…») · transfer (dato o lab → estado fisiopatológico).${r.matType === 'pharm' ? ' Día Pharm: 1 tarjeta por CLASE con el mecanismo que explica uso y toxicidad (Palmerton agrupa los efectos adversos por mecanismo); la pregunta inversa (efecto → fármaco) solo si se evalúa, como 2.º bloque.' : ''} ${mayus(R_FRENTE)}.`),
    // ronda c38 (chat USMLE, ítem 31a): si el toast falla, las tarjetas se DICTAN al chat USMLE (como el D2), no «la cola de ⚡ APEX 1-TAP» (solo encola y su
    //   lista de especialidades no es la del parser)
    P(2, `Envío APEX · cabecera: EXAMEN: USMLE · ${cabCorta(espApex(r), subApex(r), 'First_Aid', 'estudio')} · IMAGEN: no${deckDe(r) !== deckApex(r) ? ` (la app muestra ${deckDe(r)}; ${/::General$/.test(deckDe(r)) ? 'el motor APEX no acepta «General»' : `la bioestadística va a ::${espApex(r)}, su tag APEX`})` : ''}`, `${mayus(R_ENVIO)}. Si el toast falla, díctaselas al chat USMLE (las escribe en Anki y en Obsidian): nunca las pases a mano a otro mazo. Las tarjetas de IMAGEN (ECG, histología, TC) no van por APEX (el motor pone la imagen en el reverso): créalas en Anki escritorio en el submazo del día, con la imagen en el frente.`),
    P(5, 'Free recall final (sin mirar)', 'Dibuja la cadena causal del día en 1 hoja; compárala con tus notas y corrige en rojo.'),
  ];
  const avisos = [];
  if (m.nota) avisos.push(notaTxt(m.nota, r.d));
  // v6.09b lote 1-quater FX1 (revisión V2): en F1, el resumen «nº de vídeo → destino» va PRIMERO (≤ 240 caracteres); el detalle con los títulos, detrás
  const vidCorto = (it) => (it.tipo === 'bb' ? `${(/^(\d+)/.exec(BB.get(it.id).nombre) || [])[1] || BB.get(it.id).nombre}${it.ini ? ` (desde ${mmss(it.ini)})` : ''}` : 'Palmerton');
  const resumenCola = (its) => { const g = new Map(); for (const it of its) { const k = destinoDe(it); g.set(k, [...(g.get(k) || []), vidCorto(it)]); } return [...g].map(([k, v]) => `${v.join(' y ')} → ${k}`).join(' · '); };
  if (!r.t && (rep.desborde.length || (r.palm && d > 3))) avisos.unshift(`Vídeo que no cabe hoy (no se recorta): ${resumenCola([...rep.desborde, ...(r.palm && d > 3 ? [{ tipo: 'palm', id: r.palm.id, ini: 0, fin: PALM[r.palm.id].s, dOrig: d }] : [])])}.`);
  if (rep.desborde.length) avisos.push(`A ${vel(d).txt.split(' (')[0]} no cabe todo en 70′ de vídeo: ${rep.desborde.map((it) => `${it.tipo === 'bb' ? BB.get(it.id).nombre : PALM[it.id].t}${it.ini ? ` (desde ${mmss(it.ini)})` : ''} → ${destinoDe(it)}`).join(' · ')}. No se recorta: se ve en esas franjas.`);
  if (r.palm && d > 3) { const it = { tipo: 'palm', id: r.palm.id, ini: 0, fin: PALM[r.palm.id].s, dOrig: d }; avisos.push(`Palmerton «${PALM[r.palm.id].t}» (${hms(PALM[r.palm.id].s)}, visión del sistema) entra a la cola detrás de los B&B → ${destinoDe(it)}.`); }
  if (r.t) avisos.unshift(`Fila DESPLAZADA de F1: la misma guía que tenía en F1, con las franjas de F3 (07:15-12:00 · 16:15 REENTRADA · 18:00).`); // v6.05 · v6.10i: sin «(era v5.20 D#)» (bitácora)
  return B(r.fecha, '09:00–11:00', `DEEP PRIME · ${corto(txtSub(r), 70)}`, pasos, [R_VID, ...recVideo(rep.s0900), ...recLib(d)], `vídeo(s) de arriba vistos, lectura con 3-5 puntos a mano y ≤${AK.deepPrime} tarjetas APEX confirmadas (toast ✓) en ${deckApex(r)}`, { planB: 'Qbankly caído → misma sección en First Aid (libro) y la lectura de la Library cuando vuelva. Pathoma: sin cuenta en el repo (pathoma.com: Free = 6 vídeos de prueba 1 mes; Pro desde US$84,95 con libro en papel, sin PDF) → la Library lo cubre.', aviso: avisos.join(' ') || undefined });
}

// CONSOLIDACIÓN 11:00 por nivel (genérico D6+)
function consolidacion(r) {
  const d = r.d; const hoy = uwDe(d); const prev = contAtras(r, 1); const n = r.nivelUW; const m = MF1[d];
  const sub = m.uwSub ? ` · si se acaban: Subject «${UWS.get(m.uwSub[0]).nombre}» ∩ ${m.uwSub[1].map(uwNom).join(' + ')} = ${m.uwSub[1].reduce((a, y) => a + MAT.get(`${m.uwSub[0]}:${y}`), 0)}Q (matriz real de uWorld, catálogo del 18-oct)` : '';
  let pasos; let titulo;
  // v6.09 · lote 1 (17-nov-2026, auditoría a1-13): en F1, N1 = 15Q Tutor a 3′ + revisión 12′ + gate 3′ · N2 = 25Q TIMED + revisión 21′ + gate 2′ (antes
  //   20Q a 2′/Q y 30Q con 11′ de revisión: no cabían a 0,85′/Q); las 5Q que faltan → cincoDe(r). El tramo 2 (2027) sigue igual (otro lote).
  const c5 = cincoDe(r);
  const aviso5 = c5 ? `Las 5Q que faltan para las ${n === 1 ? 20 : 30} del nivel ${n} no se pierden: ${c5.donde === 'eval18' ? 'van a la EVALUACIÓN ACUMULATIVA de las 18:00 de hoy (10Q mixtas + esas 5Q del subtema, timed)' : `van a las 07:15 del ${fd(c5.sig.fecha)} (${etq(c5.sig)}), detrás de la validación (hoy las 18:00 son el Day-After del ${nomHito(trasHito(r).hito)})`}; ya cuentan en el pool de uWorld de este plan.` : undefined;
  if (n === 1 && c5) {
    titulo = 'CONSOLIDACIÓN · nivel 1 · 15Q Tutor del subtema';
    pasos = [
      P(3 + tutMin(15), 'Armar + 3 bloques de 5Q en Tutor (15Q)', `${tcUW(hoy, 5, TUTOR)}${sub} · ${TUTOR_TXT} (armar, 3′); corrige cada bloque antes de armar el siguiente.`, L_UW),
      faAcotado(45 - 3 - tutMin(15), m.fa, 'la página de cada fallo de los 3 bloques', 'la revisión del Educational Objective, el paso siguiente'),
      revCon(r, 12, presupuesto(r).con, 'UWorld'),
      P(3, 'Gate del día', `≥80 % en 10 consecutivas → validado (${proxTxt(r)} 07:15: 5Q timed) · <80 % → ${proxTxt(r)} a las 07:15 repites 5Q del subtema; NO avances de nivel.`),
    ];
  } else if (n === 2 && c5) {
    titulo = 'CONSOLIDACIÓN · nivel 2 · 25Q TIMED en bloques de 5';
    const sf = sistemasSoFar(r);
    pasos = [
      P(37, 'Armar + 5 bloques de 5Q TIMED (25Q)', `${tcUW(sf, 5, TIMED)} · el 1.er bloque = 5Q ${delPrevTxt(prev, r.fecha)} (${uwDe(prev.d).map(uwNom).join(' + ')}) = 2.ª mitad del gate${sub} · cronómetro 90 s por pregunta, tope 2:00 (si suena: adivina, flag, sigue) · cover-the-options · juez, no abogado.`, L_UW),
      revCon(r, 21, presupuesto(r).con, 'UWorld'),
      P(2, 'Gate del subtema (marca ✓/✗ en 📏 Medición)', `≥80 % → ${proxTxt(r)} sube el subtema · <80 % → ${proxTxt(r)} a las 07:15 repites 5Q del subtema fallado.`),
    ];
  } else if (n === 1) {
    titulo = 'CONSOLIDACIÓN · nivel 1 · 20Q Tutor del subtema';
    pasos = [
      P(2, 'Armar bloques de 5Q', tcUW(hoy, 5, TUTOR) + sub, L_UW),
      P(40, '4 bloques de 5Q en Tutor (20Q)', '≈2′ por pregunta + su explicación; corrige cada bloque antes del siguiente.'),
      revCon(r, 15, presupuesto(r).con, 'UWorld'),
      P(3, 'Gate del día', `≥80 % en 10 consecutivas → validado (${proxTxt(r)} 07:15: 5Q timed) · <80 % → ${proxTxt(r)} a las 07:15 repites 5Q del subtema; NO avances de nivel.`),
    ];
  } else if (n === 2) {
    titulo = 'CONSOLIDACIÓN · nivel 2 · 30Q TIMED en bloques de 5';
    const sf = sistemasSoFar(r);
    pasos = [
      P(2, 'Armar bloques de 5Q TIMED', `${tcUW(sf, 5, TIMED)} · el 1.er bloque = 5Q ${delPrevTxt(prev, r.fecha)} (${uwDe(prev.d).map(uwNom).join(' + ')}) = 2.ª mitad del gate${sub}`, L_UW),
      P(45, '6 bloques de 5Q TIMED (30Q)', 'Cronómetro 2:00 por pregunta (si suena: adivina, flag, sigue) · cover-the-options · juez, no abogado. ' + PE.reglasT2['contenido-N2'].nota),
      revCon(r, 11, presupuesto(r).con, 'UWorld'),
      P(2, 'Gate del subtema (marca ✓/✗ en 📏 Medición)', `≥80 % → ${proxTxt(r)} sube el subtema · <80 % → ${proxTxt(r)} a las 07:15 repites 5Q del subtema fallado.`),
    ];
  } else if (n === 4) { // v6.05: viernes N4 del tramo 2 (franjaNota «VIERNES NIVEL 4»; en F1 no hay: viernesN4DesdeSemana = 11)
    titulo = 'CONSOLIDACIÓN · nivel 4 (viernes) · 20Q MIXTOS timed + 10Q Tutor del subtema';
    const mix = (VISTOS_ANTES[d] || []).filter((x) => !hoy.includes(x));
    pasos = [
      P(2, `Armar los 2 tests en ${QBK.boton}`, `20Q: ${QB_UW} → ${QB_NT} → Systems: los ${mix.length} ya vistos de los sistemas dominados (no el de hoy) · Subjects todos · Status Unused · 20 · Timed → BEGIN · luego 10Q: ${hoy.map(uwNom).join(' + ')} · Tutor`, L_UW),
      P(30, '20Q MIXTOS TIMED (≥3 sistemas ya dominados)', 'Cronómetro 2:00 por pregunta; saltar entre especialidades sin aviso (eso es el nivel 4); flag y sigue. ' + AJ('contenido-N4')),
      P(20, '10Q Tutor del subtema de hoy', 'Con explicación; cada fallo a la shopping list.'),
      revCon(r, 6, presupuesto(r).con, 'UWorld'),
      P(2, 'Gate N4', '≥80 % en los 20Q mixtos timed → listo para mezclar sistemas · <80 % → el sistema más flojo del bloque, al colchón más próximo.'),
    ];
  } else {
    titulo = 'CONSOLIDACIÓN · nivel 3 · 20Q del SISTEMA timed + 10Q Tutor';
    const org = sistemasOrgano(hoy[0]);
    pasos = [
      P(2, `Armar el test en ${QBK.boton}`, `20Q: ${QB_UW} → ${QB_NT} → Systems: TODOS los de «${organoDe(hoy[0])}» (${org.length} Systems) · Subjects todos · Status Unused · 20 · Timed → BEGIN · luego 10Q: ${hoy.map(uwNom).join(' + ')} · Tutor`, L_UW),
      P(30, '20Q del sistema completo TIMED (sin saber el subtema)', 'Cronómetro 2:00 por pregunta; flag y sigue.'),
      P(20, '10Q Tutor del subtema de hoy', 'Con explicación; cada fallo a la shopping list.'),
      revCon(r, 6, presupuesto(r).con, 'UWorld'),
      P(2, 'Gate N3', '≥80 % en las 20Q timed del sistema → el sistema queda «vivo» · <80 % → al colchón del tramo 2 (sistema débil).'),
    ];
  }
  const nCon = c5 ? (n === 1 ? 15 : 25) : n === 1 ? 20 : 30;
  return B(r.fecha, '11:00–12:00', titulo, pasos, [R_UW], `${n === 1 ? `${nCon}Q` : n === 2 ? `${nCon}Q timed` : n === 4 ? '30Q (20 mixtas timed + 10 tutor)' : '30Q (20 timed + 10 tutor)'} hechas, % y tipo de error en 📏 Medición y el gate marcado ✓/✗`, { planB: respaldo(d, nCon), aviso: aviso5 });
}

// EVAL 18:00 (genérico)
function pasosEval(r, comprimido) {
  const ids = [...(VISTOS_ANTES[r.d] || []), ...uwDe(r.d).filter((x) => !(VISTOS_ANTES[r.d] || []).includes(x))];
  const txtSis = `los ${ids.length} Systems ya vistos (los de hoy: ${uwDe(r.d).map((id) => `«${UWY.get(id).nombre}»`).join(', ')}; más los de ${r.t ? 'F1 y de las filas desplazadas anteriores' : 'los días anteriores de F1'})`;
  // v6.09b · lote 1-bis: en F1 (6/6 del Day-After del NBME 25) la corrección de 10Q en 12′ era 0,71 → + 2 re-test de Status Incorrect (12Q TIMED 18′ +
  //   corrección 9′ = 12 × 0,85′): no gasta preguntas nuevas (QS igual). El tramo 2 (2027) queda igual (otro lote).
  // v6.10 · estructura base cero (18-nov-2026): en F1 (nivel 0-1) NO hay bloques cronometrados ni mixtos timed antes del gate (Palmerton: niveles 1-2
  //   antes del 3-5; PALMERTON_ESTRUCTURA_BASE_CERO.md §2): el 6/6 del Day-After del NBME 25 (D12) pasa de «12Q TIMED + corrección 9′» a 12Q en TUTOR
  //   mezcladas (interleaving de lo ya visto, «Study Plan From a Learning Scientist») con la misma cuenta de preguntas y los mismos 30′ (12 × 2,35′ = 28′ en 27′).
  // v6.10 (fix revisión 18-nov · D12): en Tutor, 12Q (28′) no dejaban minutos a las tarjetas (que se quedaban sin cabecera APEX) y el día sumaba 32Q (banda
  //   del nivel 1: 10-20, 20-30 si la revisión cabe) → 12Q = TECHO: las 10 nuevas en 23′ (10 × 2,35′) + ≤2 tarjetas APEX con su cabecera en 4′ · el re-test
  //   de 2 incorrectas, solo si sobra; si no, a la REENTRADA del tramo 2 (incorrectas de uWorld). Mismos 30′ (2 + 23 + 4 + 1); el día queda en 30Q.
  if (comprimido && !r.t) return [
    P(2, 'Armar 2 tests en TUTOR: 10Q mixtas de lo ya visto + 2 re-test de tus incorrectas (12Q = TECHO, no meta)', `${QB_UW} → ${QB_NT} ×2: (a) Status Unused · 10Q · (b) Status Incorrect · 2Q → en cada uno, Number of Questions: esa cifra (no 20) · Tutor (por defecto) · Systems: ${txtSis} (las incorrectas = las que fallaste en F1: el re-test no gasta preguntas nuevas)`, L_UW),
    P(23, `10Q nuevas en ${TUTOR1}, mezcladas (de lo ya visto)`, `Nivel 1 (Palmerton): aún no hay subtemas en nivel 3, así que se mezcla sin tiempo por pregunta (interleaving). Cada una: cover-the-options + SAQ + CCSN → la explicación entera (Tutor: ${TUTOR_TXT}; 10 × 2,35′ ≈ 23′); cada fallo: knowledge / transfer / unforced.`),
    corrEval(r, 4, presupuesto(r).ev),
    P(1, 'Registrar el % (las 10 nuevas) + horas netas del día · el re-test, solo si sobra', `📏 Medición. TECHO: las 2 del re-test (Status Incorrect) solo si las 10 nuevas y las tarjetas te dejaron minutos; si no, se re-testean en la REENTRADA del ${fd(FV6.step1.reinicio)} (2×20Q mixtas + incorrectas de uWorld): no gastan preguntas nuevas.`),
  ];
  // v6.10 (fix revisión 18-nov): en F3 el 6/6 comprimido (T6, T18) lleva el MISMO ajuste de fase que la evaluación de las 18:00 (eval18F3) y su rama Tutor
  //   en el paso de armar: 10Q en Tutor = 23,5′ = los 15′ del paso de responder + los primeros ≈9′ de la corrección (mismas Q, mismos 27′)
  const f3 = r.t && r.fase === 'F3';
  if (comprimido) return [
    P(1, f3 ? 'Armar 10Q mixtas (timed solo con gate; si no, Tutor)' : 'Armar 10Q mixtas TIMED', `${QB_UW} → ${QB_NT} → Systems: ${txtSis} · Status Unused · 10 · ${f3 ? 'Timed si esos subtemas ya tienen el gate del 80 % en 📏 Medición; si no, Tutor' : 'Timed'}`, L_UW),
    P(15, f3 ? '10Q mixtas — TIMED solo con gate (90 s/Q · tope 2 min)' : '10Q TIMED (90 s/Q · tope 2 min)', 'Modo examen: cover-the-options · sin cambiar respuestas salvo error de lectura.' + (f3 ? ' ' + AJ('eval18F3') + ' Rama Tutor: 10 × 2,35′ ≈ 23,5′ = este paso + los primeros ≈9′ de la corrección; en lo que queda de la corrección, las tarjetas.' : '')),
    corrEval(r, 12, presupuesto(r).ev),
    P(2, 'Registrar eval % + horas netas del día', '📏 Medición.'),
  ];
  // v6.09 · lote 1 (auditoría a1-13): F1 con consolidación reducida y 18:00 = esta eval → + las 5Q del subtema que no entraron a las 11:00 (15Q TIMED =
  //   22,5′ → 23′ · corrección 15 × 0,85′ ≈ 12,8′ → 14′); antes 10Q en 15′ + 23′ de corrección (ratio 0,68)
  const c5 = cincoDe(r);
  if (c5 && c5.donde === 'eval18') return [
    P(2, 'Armar 2 tests TIMED: 10Q mixtas de lo ya visto + 5Q del subtema de hoy', `(a) ${QB_UW} → ${QB_NT} → Systems: ${txtSis} · Subjects todos · Status Unused · 10 · Timed · (b) ${tcUW(r.nivelUW === 2 ? sistemasSoFar(r) : uwDe(r.d), 5, TIMED)} = las 5Q que no entraron en la consolidación de las 11:00 (${r.nivelUW === 1 ? '15 + 5 = las 20 del nivel 1' : '25 + 5 = las 30 del nivel 2'})`, L_UW),
    P(23, '15Q TIMED (90 s/Q · tope 2 min): las 10 mixtas y después las 5 del subtema', 'Modo examen: cover-the-options · juez, no abogado · cuenta las respuestas cambiadas y las relecturas.'),
    corrEval(r, 14, presupuesto(r).ev),
    P(6, 'Registrar en 📏 Medición', 'eval % (las 10 mixtas) · las 5 del subtema suman al % de la consolidación de hoy · horas netas de Step 1 del día (GO/NO-GO por horas) · cambiadas · relecturas.'),
  ];
  return [
    P(2, f3 ? 'Armar 10Q mixtas de lo ya visto (timed solo con gate; si no, Tutor)' : 'Armar 10Q mixtas TIMED de lo ya visto', `${QB_UW} → ${QB_NT} → Systems: ${txtSis} · Subjects todos · Status Unused · 10 · ${f3 ? 'Timed si esos subtemas ya tienen el gate del 80 % en 📏 Medición; si no, Tutor' : 'Timed'}`, L_UW),
    P(15, f3 ? '10Q mixtas — TIMED solo con gate (90 s/Q · tope 2 min)' : '10Q TIMED (90 s/Q · tope 2 min)', 'Modo examen: cover-the-options · juez, no abogado · cuenta las respuestas cambiadas y las relecturas.' + (f3 ? ' ' + AJ('eval18F3') + ' Rama Tutor: 10 × 2,35′ ≈ 23,5′ = este paso + los primeros ≈9′ de la corrección; el resto de la corrección, tarjetas y log.' : '')),
    corrEval(r, 23, presupuesto(r).ev),
    P(5, 'Registrar en 📏 Medición', 'eval % · horas netas de Step 1 del día (GO/NO-GO por horas) · cambiadas · relecturas.'),
  ];
}
function eval18(r) {
  const th = trasHito(r);
  if (th && th.n <= 4) return dayAfter18(r, th);
  const c5 = cincoDe(r); const con5 = !!(c5 && c5.donde === 'eval18'); // v6.09 · lote 1: + las 5Q de la consolidación de hoy
  return B(r.fecha, '18:00–18:45', `EVALUACIÓN ACUMULATIVA · 10Q mixtas ${r.t && r.fase === 'F3' ? '(subtemas validados; timed solo con gate)' : 'timed (dosis de nivel 4)'}${con5 ? ' + 5Q del subtema (de la consolidación)' : ''}`, pasosEval(r), [R_UW], `eval % + horas netas del día en 📏 Medición${con5 ? ' + las 5Q del subtema sumadas a la consolidación' : ''}`, { planB: 'Si no quedan Unused en esos Systems: Status Incorrect de los mismos (re-test).' });
}
// DAY-AFTER de los NBME de F1 (D10 · D25 · D40): hito 18:00 + n=1 07:15 + n=1..4 18:00
const DRILL = { 1: [1, 2, 3], 2: [4, 5, 6], 3: [7, 8, 9], 4: [10] };
const nomHito = (h) => h.uw.replace('NBME CBS Form', 'NBME');
function dayAfter18(r, th) {
  const nom = nomHito(th.hito); const dr = DRILL[th.n];
  const pasos = [P(dr.length * 15, `Drill de cronología del ${nom}: pregunta${dr.length > 1 ? 's' : ''} ${dr.join(', ')} de 10 (las falladas más largas y con más labs)`, `15′ cada una: reescribe A MANO el caso en orden cronológico estricto y en presente ${pcCardTxt(th.hito)}`)];
  if (th.n === 4) pasos.push(...pasosEval(r, true));
  return B(r.fecha, '18:00–18:45', `DAY-AFTER ${nom} · ${th.n + 2}/6 — drill de cronología${th.n === 4 ? (r.t ? ' + eval 10Q' : ' + eval 10Q Tutor (+ 2 re-test si sobra)') /* v6.10h: ≤ 85, el resumen del Calendar */ : ''}`, pasos, [R_UW], th.n === 4 ? `10/10 PC cards del drill y la eval de 10Q registrada${r.t ? '' : ' con sus ≤2 tarjetas APEX (+ las 2 del re-test, si cupieron)'}` : `${dr.length} PC cards más`, { aviso: [th.n === 1 ? `Day-After del ${nom} (Palmerton §9.2, ~4 h) repartido: 18:00 del hito (registro + trayectoria + auditoría) · 07:15 de hoy (triaje + gráficos) · 18:00 de hoy y de los 3 días ${DSEM === 'L-V' || r.t ? 'siguientes' : 'de Step siguientes'} (10 drills). La eval de 10Q vuelve el 4.º día${DSEM === 'L-V' || r.t ? '' : ' de Step'}; el subtema de cada día NO cambia.` : '',
    // v6.08: si el trozo siguiente del Day-After cae en F4 (sin franja de 18:00), el último trozo con franja lo avisa
    daEnF4(th.hito).some((o) => o.n === th.n + 1) ? daEnF4Txt(th.hito) : ''].filter(Boolean).join(' ') || undefined });
}
function dayAfter0715(r, th) {
  const nom = nomHito(th.hito);
  return B(r.fecha, '07:15–08:15', `DAY-AFTER ${nom} · 2/6 — triaje + gráficos`, [
    // remate v6.10r (revisión BAJA #10): en F1, con qué banco activo (Qbankly trabaja sobre el activo: desde las 08:15 vuelve uWorld); el tramo 2, igual
    P(45, `Triaje de las incorrectas del ${nom} (bloques 1-4 en orden)${r.t ? '' : `; Qbankly con el ${nom} como banco activo, el del hito`}`, '1′ por pregunta: Educational Objective → K (no lo sabía) o QI (lo sabía y leí/interpreté mal). Lo que no entre en 45′ se queda sin triar: el NBME es un mapa (regla de oro).'),
    P(15, `Ítems experimentales / gráficos → ${AK.exp - 1}-${AK.exp} tarjetas de «diseño del experimento»`, `Qué se manipuló, qué se midió, qué predice el resultado; ${expCardTxt(th.hito)}`),
  ], [R_UW], 'incorrectas etiquetadas K/QI y 2-3 tarjetas de experimento', { aviso: 'Hoy a las 07:15 no hay validación de 5Q ni vídeo pendiente (Day-After). El subtema de hoy sigue igual desde las 08:15.' });
}

// HITOS NBME (D10 · D25 · D40 · D52)
function hitoNBME(r) {
  const f = r.fecha; const form = Number((/Form (\d+)/.exec(r.uw) || [])[1]);
  const fila = HITOS.get(`Self-Assessment - Form ${form}`); const bloques = fila ? fila.bloques : null;
  if (!bloques) aborta(`D${r.d}: forma NBME desconocida (${r.uw})`);
  const nom = `Self-Assessment - Form ${form}`;
  return [anki0500(r),
    B(f, '07:00–12:30', `HITO · NBME ${form} — 4 bloques de ${bloques.join('/')}Q (Timed)`, [
      // v6.10j (rev. c14, vetadas #5): la ruta de menús va en el «qué» (≤ 150, entero en el Calendar) y el «cómo» EMPIEZA por cómo se crea el bloque 1 (antes
      //   el corte de 110 caía dentro de la ruta: «… › Select QBank › …» y se perdía «New Test → Subject «Block 1» (50) · … · Timed → BEGIN TEST»)
      P(3, `Armar el bloque 1 · ${qbSel(`NBME - Comprehensive Basic Science (Step 1) › «${nom}» (${bloques.reduce((a, b) => a + b, 0)}Q)`)}`, `${QB_NT} → Subject «Block 1» (${bloques[0]}) · Timed · System All Systems · Status Unused · ${bloques[0]} → BEGIN TEST`, L_UW),
      P(75, `Bloque 1 · ${bloques[0]}Q · 75′ (ritmo NBME: 90 s/Q)`, 'Kit anti-pánico: tope 2 min · flag y sigue · sin cambiar respuestas salvo error de lectura.'),
      P(75, `Bloque 2 · ${bloques[1]}Q · 75′ (seguido)`, `Sit-in 10-15 s en la silla → ${QBK.boton} «Block 2».`),
      P(12, 'Pausa fuera de la silla', 'Ziploc BREAK 1, agua, baño; no revises nada.'),
      P(75, `Bloque 3 · ${bloques[2]}Q · 75′`, `${QBK.boton} «Block 3».`),
      P(15, 'Pausa fuera de la silla', 'Ziploc BREAK 2.'),
      P(75, `Bloque 4 · ${bloques[3]}Q · 75′`, `${QBK.boton} «Block 4». Al terminar: % total y por bloque.`),
    ], [{ t: `Qbankly › ${QBK.menu} › NBME › ${nom}`, url: QBQ, cantidad: `${bloques.reduce((a, b) => a + b, 0)}Q` }], '4 bloques terminados y el % total + por bloque en 📏 Medición', { aviso: `El NBME (07:00-12:30) sustituye a las franjas 07:15 · 08:15 · 09:00 · 11:00 de hoy y pisa el almuerzo 12:00-12:30: ${r.fase === 'F3' ? `almuerzo 12:30-13:00 (F3: no hay SYNAPSE; R↔D 13:30 sin cambio). Su Day-After (~4 h) se reparte como en F1: 18:00 de hoy (1/6) + las 4 filas siguientes (07:15 de la fila siguiente y 18:00).${daEnF4(r).length ? ' ' + daEnF4Txt(r) : ''}` : 'almuerzo 12:30-13:00 y SYNAPSE 13:00-13:30 (en el hueco del libro + holgura).'}${r.d === F1[F1.length - 1].d ? ' Es la última sesión de F1: su Day-After (~4 h) no tiene franja en F1 (jue 31-dic = SKIP) → ⚠ DECISIÓN DE JOSEPH (propuesta: sáb 2-ene 07:00-11:00, o repartido en los «STEP 1 VIVO» de los sábados de enero).' : ''}`, planB: 'Qbankly caído: espera 10 min (un bloque no empezado no se pierde); si sigue, el NBME pasa a la tarde por bloques y lo decide Joseph (el hito no cambia de día sin su OK).' }),
    B(f, '18:00–18:45', `DAY-AFTER NBME ${form} · 1/6 — registro + trayectoria + auditoría`, [
      P(5, 'Registrar en 📏 Medición: % total, % de los 4 bloques, horas netas', 'Step 1 → 📋 HOY → 📏 Medición.'),
      P(15, 'Trayectoria: curva del % frente a los hitos previos y al mínimo on-track', '¿Subieron los sistemas estudiados en las últimas 2 semanas?'),
      P(15, 'Auditoría de honestidad por escrito', '«Si sigo haciendo lo mismo 6 meses, ¿qué resultado tendría?» + 3 decisiones concretas.'),
      P(10, 'Informe por sistema (Palmerton §9.1)', r.t ? 'Copia el % por sistema (Qbankly › Test History / Reports); exige ≥80 % en lo ya estudiado.'
        : `Qbankly › Test History / Reports (con el NBME ${form} aún como banco activo, el de esta mañana) → copia el % por sistema; exige ≥80 % en lo ya estudiado.`), // remate v6.10r (BAJA #10): solo F1
    ], [R_UW], 'medición, trayectoria, auditoría e informe por sistema escritos')];
}

// ── v6.05 (24-oct) · TRAMO 2: 16:15 REENTRADA de las desplazadas, días de cola de vídeo y encaje en la plantilla F3 ─────────────────
/** Sistema de la rotación de F3 (gen_tramo2 sistemaRot → franjaNota «16:15 REENTRADA: 20Q timed de X + revisión») → órgano de uWorld. */
const ORGANO_ROT = { Cardiovascular: 'Cardiovascular System', Respiratory: 'Pulmonary & Critical Care', Renal: 'Renal, Urinary Systems & Electrolytes', Gastrointestinal: 'Gastrointestinal & Nutrition',
  Endocrine: 'Endocrine, Diabetes & Metabolism', 'Nervous System': 'Nervous System', 'Hematology & Oncology': 'Hematology & Oncology', Fundamentos: 'Pathology (General Principles)', Immunology: 'Allergy & Immunology' };
/** 16:15-17:15 REENTRADA (solo F3, FRANJA_F3_REENTRADA): 20Q timed del sistema de la rotación SIN uWorld fresco (V2b: la reentrada no lo gasta). */
function reentrada1615(r) {
  const m = /16:15 REENTRADA: 20Q timed de (.+?) \+ revisión/.exec(r.franjaNota || '');
  const org = m && ORGANO_ROT[m[1]]; const ids = org ? [...UWY.keys()].filter((id) => organoDe(id) === org) : [];
  if (!ids.length) { ERR.push(`${etq(r)} ${r.fecha}: 16:15 REENTRADA sin sistema de la rotación reconocible («${r.franjaNota || ''}»)`); return null; }
  return B(r.fecha, U.FRANJA_F3_REENTRADA.hora, `16:15 REENTRADA · 20Q de ${m[1]} (timed solo con gate; rotación de F3)`, [
    P(2, `Armar: los ${ids.length} Systems de «${org}»`, `${QB_UW} → ${QB_NT} → Systems: TODOS los de «${org}» (${ids.length}) · Subjects todos · Status Incorrect (NO Unused: el uWorld fresco se reserva para el contenido) · 20 · Timed si el sistema ya tiene 3-5 subtemas al 80 % sin reloj (📏 Medición); si no, Tutor → BEGIN TEST · si salen < 20, completa con AMBOSS (bloque del mismo sistema, mismo modo)`, L_UW),
    P(30, '20Q del sistema — TIMED solo con gate (90 s/Q · tope 2 min)', 'Sin saber el subtema: cover-the-options · flag y sigue · cuenta las respuestas cambiadas. ' + AJ('reentrada1615') + ' Rama Tutor (sin gate): en este paso, las primeras 13Q (13 × 2,35′ ≈ 31′); las 7 restantes, al empezar el paso de revisión.'),
    P(25, 'Revisión: Educational Objective + log de errores (0 tarjetas nuevas: el tope del día ya lo reparten deep prime, consolidación y eval)', 'Cada fallo: knowledge / transfer / proceso → 📏 Medición; lo que merecería tarjeta va a la shopping list. Timed: 20 × 0,85′ ≈ 17′ de Educational Objective + ≈8′ de log. Rama Tutor: primero las 7Q que faltan (≈16′, su explicación ya es la revisión) y en los ≈9′ que quedan, el log de las 20.'),
    P(3, 'Gate de la reentrada (marca ✓/✗ en 📏 Medición)', U.FRANJA_F3_REENTRADA.gate),
  ], [R_UW], '20Q timed del sistema de la rotación, % en 📏 Medición y el gate marcado', { planB: 'Sin incorrectas suficientes en uWorld: AMBOSS (bloque timed del mismo sistema); nunca uWorld Unused (fresco).' });
}
/** remate v6.10l (revisión adversarial · verdad): el free recall de vídeo dice los segundos que le tocan a cada vídeo con los minutos REALES del paso (antes
 *  «90 s por vídeo» fijo: 2 vídeos en un paso de 2′ no daban 90 s cada uno; mié 2, vie 4 y mié 9-dic a las 07:15) */
function frVideoTxt(min, vids) {
  const n = new Set((vids || []).map((p) => p.que.replace(/\s*\(.*$/, '').replace(/\s+de \d+:\d+ a \d+:\d+.*$/, ''))).size || 1;
  const seg = Math.min(90, Math.floor((min * 60) / n / 10) * 10);
  return `${seg} s por vídeo: la cadena causal en 3 ideas; lo que no salga, a la shopping list.`;
}
/** Día de COLA (tras la última desplazada): «vídeo pendiente» 07:15-07:45 con lo que no cupo en sus deep prime (regla de F1, ≤30′). */
function colaVideo0715(r) {
  const rep = REP[r.d]; const vids = pasosVideo(r.d, rep.s0715); const V = vids.reduce((a, p) => a + p.min, 0);
  const origen = [...new Set(rep.s0715.map((it) => etqD(it.dOrig)))].join(' · ');
  // v6.07: en F4 la cola va al principio del bloque A (04:05-04:35), antes de la fila del día
  if (r.fase === 'F4') return B(r.fecha, '04:05–04:35', `VÍDEO PENDIENTE · cola de las filas desplazadas de F1 (${origen}) · inicio del bloque A`, [
    ...vids,
    P(30 - V, 'Free recall del vídeo (sin mirar)', frVideoTxt(30 - V, vids)),
  ], recVideo(rep.s0715), 'tramo(s) de vídeo vistos y resumidos', { aviso: `Nada se recorta: lo que no cupo en F3 se ve aquí, al principio del BLOQUE A (turnos M, T y L; con GUARDIA pasa a la fila siguiente). Después, la fila del día (${etq(r)}) con lo que quede del bloque A y el bloque B de tu turno (FRANJAS_F4).` });
  return B(r.fecha, '07:15–07:45', `VÍDEO PENDIENTE · cola de las filas desplazadas de F1 (${origen})`, [
    ...vids,
    P(30 - V, 'Free recall del vídeo (sin mirar)', frVideoTxt(30 - V, vids)),
  ], recVideo(rep.s0715), 'tramo(s) de vídeo vistos y resumidos', { aviso: `Nada se recorta: lo que no cupo en los deep prime de las filas desplazadas de F1 (${etq(T2_DESPL[0])}-${etq(T2_DESPL[T2_DESPL.length - 1])}) se ve en el «vídeo pendiente» de las 07:15 (≤30′), en orden y partido por minutos. El resto de la franja 07:15-08:15 (repaso anclado + validación de 5Q) y el día siguen como dice la fila ${etq(r)}.` });
}
/** Franjas USMLE de la plantilla F3 leídas de src/lib/plantillasV6.ts › bloquesF3 (anki · bloque principal · eval; en un hito, el de su sub)
 *  + FRANJA_F3_REENTRADA: todo bloque de la guía del tramo 2 tiene que caer dentro de una (si no, aborta). */
const F3_USMLE = (() => {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'lib', 'plantillasV6.ts'), 'utf8');
  const cuerpo = (/function bloquesF3\([\s\S]*?\r?\n\}\r?\n/.exec(src) || [''])[0];
  const fr = [...cuerpo.matchAll(/bloque\('([\w-]+)', '(\d\d:\d\d)', '(\d\d:\d\d)', [^\n]*?'usmle', 'usmle-[a-z]+'\)/g)].map((x) => ({ id: x[1], ini: x[2], fin: x[3] }));
  const [ri, rf] = U.FRANJA_F3_REENTRADA.hora.split('–'); fr.push({ id: 'reentrada', ini: ri, fin: rf });
  if (!['anki', 'usmle', 'eval'].every((id) => fr.some((x) => x.id === id))) aborta('plantillasV6.ts › bloquesF3: no encuentro las franjas USMLE de F3 (anki · usmle · eval) para encajar la guía del tramo 2');
  return fr;
})();
function dentroF3(r, g) {
  const m = /^(\d{2}:\d{2})–(\d{2}:\d{2})$/.exec(g.franja); if (!m) return false;
  if (r.fase === 'F4') return aMin(m[1]) >= aMin('04:05') && aMin(m[2]) <= aMin('05:55'); // v6.07: días de cola de F4 = bloque A común a M/T/L
  const h = esHito(r) ? /\((\d{2}:\d{2})-(\d{2}:\d{2})\)/.exec(r.sub) : null;
  const fr = F3_USMLE.filter((x) => !(h && (x.id === 'usmle' || x.id === 'reentrada'))).concat(h ? [{ id: 'hito', ini: h[1], fin: h[2] }] : []);
  return fr.some((x) => aMin(m[1]) >= aMin(x.ini) && aMin(m[2]) <= aMin(x.fin));
}

/** v6.10b · franja «HH:MM–HH:MM» desde el minuto `t` (minutos desde las 00:00) con `m` minutos */
const frDe = (t, m) => `${hhmm(t)}–${hhmm(t + m)}`;
/** v6.10b · CONFIGURACIÓN de Anki (CONF_DIA, mié 18-nov de plan 05:00-05:45, 1.er día de F1 · v6.11: mar 24-nov real): preset «APEX USMLE» + manual FSRS + vídeo FSRS.
 *  v6.10u (verificación EN VIVO del chat USMLE, 19-nov): APEX::USMLE YA EXISTE, vacío, con sus submazos (APEX_USMLE_SUBMAZOS, desde mayo) → el preset se crea desde
 *  sus propias Deck Options y Save to All Subdecks los cubre a todos (ningún otro mazo cambia de preset); nada se crea vacío. Orden de la decisión: Sync · preset y
 *  comprobación · manual FSRS · «Anki Almost Broke Me…» desde 0:00 hasta un límite de capítulo (CONF_REP); lo que falte del vídeo, el D2 a las 05:00. */
function bloqueConfigAnki(f) {
  const it = CONF_REP[0], pF = PALM.Te5RnxeG_Gg;
  const capsTxt = pF.caps.map((x, i) => (i === pF.caps.length - 1 ? `${hms(x)} Change 8` : hms(x))).concat(`${hms(pF.faq)} FAQ`).join(' · ');
  // v6.11 (lun 23-nov-2026 · chat USMLE): el tramo 0:00 → it.fin recoge solo los cambios que EMPIEZAN antes de it.fin (con 23:50, los 7 primeros: el «Change 8»
  //   empieza justo ahí y va al D2). El replace buscaba « · pausa y anota…», pero el texto de METODO lo lleva tras «:» → nunca se aplicaba (sin «para en 23:50 ·
  //   corta solo en un fin de capítulo»); ahora busca la frase sin el separador y, si no la encuentra, aborta.
  const totC = pF.caps.length - 1, nC = pF.caps.slice(1).filter((x) => x < it.fin).length;
  const cambiosTxt = nC >= totC ? `los ${totC} cambios` : `los ${nC} primeros cambios (${nC === totC - 1 ? `el ${totC}.º` : `del ${nC + 1}.º al ${totC}.º`}, en el D2)`;
  const ANOTA = `pausa y anota los ${totC} cambios`;
  const v05 = pasosVideo(D2.d, CONF_REP).map((p) => {
    if (!p.como.includes(ANOTA)) aborta(`CONFIGURACIÓN 05:00: el «cómo» del vídeo FSRS ya no dice «${ANOTA}» (METODO.Te5RnxeG_Gg): no puedo añadir dónde parar`);
    return { ...p, como: p.como.replace(ANOTA, `pausa y anota ${cambiosTxt} · para en ${hms(it.fin)}${it.fin === pF.faq ? ', donde empieza el FAQ' : ', un fin de capítulo'} (lo que falta, el ${fd(D2.fecha)} a las 05:00${it.fin === pF.faq ? ': el FAQ, opcional' : ''}) · corta solo en un fin de capítulo, nunca a mitad (capítulos: ${capsTxt})`) };
  });
  const V05 = v05.reduce((a, p) => a + p.min, 0);
  if (CONF_MIN.sync + CONF_MIN.preset + CONF_MIN.comprob + CONF_MIN.manual + V05 !== 45) aborta(`CONFIGURACIÓN 05:00: no suma 45′ (Sync ${CONF_MIN.sync} + preset ${CONF_MIN.preset} + comprobación ${CONF_MIN.comprob} + manual ${CONF_MIN.manual} + vídeo ${V05})`);
  const recPalm = (id) => ({ t: `Palmerton · ${id === 'Te5RnxeG_Gg' ? 'Anki + FSRS' : 'The ONLY video (Step 1 2026)'} (YouTube)`, url: yt(id), min: Math.round(PALM[id].s / 60) });
  const DOC_FSRS = { t: 'Manual de Anki › Deck Options (FSRS)', url: 'https://docs.ankiweb.net/deck-options.html' };
  const dp = espApex(D2);
  return B(f, '05:00–05:45', 'ANKI · CONFIGURACIÓN: preset «APEX USMLE» en APEX::USMLE (FSRS) + manual + vídeo FSRS', [
    P(CONF_MIN.sync, 'Sync (Anki escritorio)', `APEX::USMLE ya existe (vacío, con sus submazos desde mayo): hoy recibe el preset. Las primeras tarjetas USMLE nacen el ${fd(D2.fecha)} (${TEST_S1_MISMO_DIA ? 'la [TEST S1] del vibecoding a las 04:15, si el redeploy sale verde, y ' : ''}las del plan desde las 07:15${TEST_S1_MISMO_DIA ? '' : `; la [TEST S1] del vibecoding, el ${fdTestS1()} a las 04:15`}).`),
    P(CONF_MIN.preset, `Preset «APEX USMLE» en APEX::USMLE (ya existe, vacío): ${AK.ret} · ${AK.nuevasDia} nuevas · ${AK.maxRev} repasos · repasos antes que nuevas → Save to All Subdecks y compruébalo`,
      // v6.11: lo ya verificado (FSRS activado · «Next day starts at 4» puesto) va PRIMERO (el Calendar corta el «cómo»); retención en % (no se teclea 0,90)
      `FSRS ya activado (vale para toda la colección): no lo toques · Preferences › Review › Next day starts at 4: ya puesto, solo compruébalo · Deck Options de APEX::USMLE › Save ▾ «Add Preset» → «APEX USMLE» · Desired retention ${AK.ret} (en un preset nuevo ya viene así; NO teclees 0,90, que la deja en 70 %) · New cards/day ${AK.nuevasDia} · Maximum reviews/day ${AK.maxRev} (nunca 200: oculta vencidas) · Display order › New/review order: «Show after reviews» · learning y relearning steps por defecto (no tocar) · Save ▾ «Save to All Subdecks»: el preset queda en APEX::USMLE y en sus submazos (${APEX_USMLE_SUBMAZOS.map((x) => '::' + x).join(', ')}) y ningún otro mazo cambia de preset. Si vieras FSRS apagado: actívalo y pulsa «Optimize all presets» (ya tienes historial en tus mazos MIR/ENCAPS). El «Optimize» FSRS de este preset, el ${fd(SAB_OPT)} (4 semanas de repasos).`),
    P(CONF_MIN.comprob, 'Comprobación del preset', `Reabre las Deck Options de APEX::USMLE y de ::${dp} → «APEX USMLE» con retención ${AK.ret} · ${AK.nuevasDia} nuevas/día · ${AK.maxRev} repasos/día.`),
    P(CONF_MIN.manual, 'Manual de Anki › Deck Options › FSRS: «Desired Retention» y «FSRS Parameters › Optimize FSRS Parameters» (Ctrl+F Optimize; acotado a 3′)', `Lee en el manual oficial qué hacen los dos ajustes FSRS del preset: la retención deseada (la que acabas de fijar en ${AK.ret}) y la optimización de parámetros con tu historial (la del ${fd(SAB_OPT)}); marca dónde paras. Lo que no entre, el día del «Optimize».`, DOC_FSRS),
    ...v05,
  ], [recPalm('Te5RnxeG_Gg'), DOC_FSRS, { t: 'AnkiWeb', url: 'https://ankiweb.net/decks' }], `preset «APEX USMLE» en APEX::USMLE y sus submazos (Save to All Subdecks, comprobado) y «Anki Almost Broke Me…» hasta ${hms(it.fin)} con los cambios anotados`,
    { planB: `Si Anki escritorio no abre: el preset va el ${fd(D2.fecha)} a las 05:00, antes de las preguntas de las 07:15 (AnkiWeb no edita presets); el vídeo, en el móvil. Si APEX::USMLE no existe: no lo crees vacío; el preset, desde las Deck Options de otro mazo y sin asignar (antes de Save, vuelve a elegir el preset de ese mazo); APEX::USMLE nace con la 1.ª tarjeta del ${fd(D2.fecha)} y, al cerrar ese bloque, Save to All Subdecks.`,
      aviso: `La configuración va hoy, 1.er día de F1, antes de que nazcan las primeras tarjetas ENCAPS (11:40): hoy no hay repasos ENCAPS a las 05:20 y el bloque entero (05:00-05:45) es la configuración. El ${fd(D2.fecha)} (D2) empieza el Step 1 en NIVEL 0 (sin simulacro: el UWSA1 pasó al tramo 2) y cada tarjeta nace por APEX con la cabecera del día (ESPECIALIDAD · SUBTEMA · FUENTE · MODO) y un tope de ${AK.topeDia} tarjetas nuevas/día. Método completo (ajustes, tipos de tarjeta, cuotas, backlog, telemetría): ${METODO_MD}.` });
}
/** v6.10b · D2 (jue 19-nov de plan · v6.10u: lun 23-nov real) 05:00-05:30 = «Anki y vídeos de método» (regla exacta del chat USMLE): el mazo USMLE está vacío (las
 *  tarjetas nacen hoy: la [TEST S1] de las 04:15 y las del plan desde las 07:15) → Sync + el resto de «Anki Almost Broke Me…» desde su límite de capítulo (el FAQ,
 *  opcional) + «The ONLY Video…» de 0:00 a 15:04 (lo que sigue, en la cola) + free recall. 05:30-05:45 = repasos ENCAPS (su guía). */
/** config_anki (CONF_MOV) · el D2 05:00-05:30 con la configuración que no se hizo: DELANTE Sync + el preset y su comprobación (lo que bloquea: tiene que existir antes
 *  de la 1.ª tarjeta USMLE) y detrás «The ONLY Video…» de 0:00 a corteD2, con sus minutos de siempre; el preset se lleva lo que queda de los 30′. 05:30-05:45 =
 *  repasos ENCAPS (su guía). «Anki Almost Broke Me…» entero y el manual FSRS, en el bloque del fin de semana (bloqueFsrsFinde). */
function presetD2(r) {
  const f = r.fecha; const rep = REP[r.d];
  const iO = rep.s0500.find((it) => it.id === 'BOtQJeFE_rc');
  if (!iO || rep.s0500.length !== 1) aborta(`${etq(r)}: el Anki de las 05:00 espera solo «The ONLY Video…» detrás del preset (corrida_s1.config_anki)`);
  const vids = pasosVideo(r.d, rep.s0500).map((p) => ({ ...p, como: p.como.replace(' · pausa y anota 5 ideas', ` · pausa y anota 5 ideas · para en ${hms(iO.fin)}, donde empieza «Reading test writer intent» (lo siguiente, en la cola)`) }));
  if (!vids.every((p) => p.como.includes(`para en ${hms(iO.fin)}`))) aborta(`${etq(r)}: el paso de «The ONLY Video…» no dice dónde parar (texto de METODO.BOtQJeFE_rc.como cambiado)`);
  const mP = D2_0500.total - D2_0500.sync - vids.reduce((a, p) => a + p.min, 0);
  if (mP < CONF_MIN.preset) aborta(`${etq(r)}: el preset de las 05:00 se queda con ${mP}′ (mínimo ${CONF_MIN.preset}′)`);
  const dp = espApex(r), dicta = antesRedeploy(r);
  const pend = [...colaPendienteTras(r.d, 's0500')].filter((it) => it.id === 'BOtQJeFE_rc').map((it) => `«${PALM[it.id].t.split(' You Need')[0]}…» de ${hms(it.ini)} a ${hms(it.fin)} → ${destinoDe(it)}`);
  return B(f, '05:00–05:30', `ANKI · PRESET «APEX USMLE» (el de la configuración del ${fd(CONF_DIA)}, que no se hizo) + VÍDEO DE MÉTODO`, [
    P(D2_0500.sync, 'Sync (Anki escritorio)', `La configuración del ${fd(CONF_DIA)} no se hizo: hoy el preset va PRIMERO, antes de la 1.ª tarjeta USMLE (las del plan nacen desde las 07:15${dicta ? ' y se dictan al chat USMLE' : ''}). APEX::USMLE ya existe, vacío, con sus submazos.`),
    P(mP, `Preset «APEX USMLE» en APEX::USMLE: ${AK.ret} · ${AK.nuevasDia} nuevas · ${AK.maxRev} repasos · repasos antes que nuevas → Save to All Subdecks y compruébalo`,
      `FSRS ya activado (vale para toda la colección): no lo toques · Preferences › Review › Next day starts at 4: ya puesto, solo compruébalo · Deck Options de APEX::USMLE › Save ▾ «Add Preset» → «APEX USMLE» · Desired retention ${AK.ret} (en un preset nuevo ya viene así; NO teclees 0,90, que la deja en 70 %) · New cards/day ${AK.nuevasDia} · Maximum reviews/day ${AK.maxRev} (nunca 200: oculta vencidas) · Display order › New/review order: «Show after reviews» · learning y relearning steps por defecto (no tocar) · Save ▾ «Save to All Subdecks»: el preset queda en APEX::USMLE y en sus submazos (${APEX_USMLE_SUBMAZOS.map((x) => '::' + x).join(', ')}) y ningún otro mazo cambia de preset · comprobación: reabre las Deck Options de APEX::USMLE y de ::${dp} → «APEX USMLE» con retención ${AK.ret} · ${AK.nuevasDia} nuevas/día · ${AK.maxRev} repasos/día. Si vieras FSRS apagado: actívalo y pulsa «Optimize all presets». El «Optimize» FSRS de este preset, el ${fd(SAB_OPT)} (4 semanas de repasos).`),
    ...vids,
  ], [R_ANKI, ...recVideo(rep.s0500)], `preset «APEX USMLE» en APEX::USMLE y sus submazos (Save to All Subdecks, comprobado) y «The ONLY Video…» hasta ${hms(iO.fin)} con sus notas`,
    { planB: dicta
      ? `Anki escritorio no abre: el preset, en cuanto abra (antes de que el chat USMLE escriba la 1.ª tarjeta; AnkiWeb no edita presets); mientras no abra, el chat USMLE guarda las tarjetas que le dictes y las escribe en Anki al abrirlo (AnkiConnect necesita Anki escritorio abierto); el vídeo, en el móvil (YouTube; «The ONLY Video…» con ${AUDIO_EN}).`
      : `Anki escritorio no abre: el vídeo, en el móvil (YouTube; «The ONLY Video…» con ${AUDIO_EN}); el preset, en cuanto abra, antes de la 1.ª tarjeta de las 07:15 (AnkiWeb no edita presets).`,
      aviso: `«Anki Almost Broke Me…» entero y el manual FSRS (${CONF_MOV.min}′) → ${fd(CONF_MOV.fecha)} ${CONF_MOV.ini}-${CONF_MOV.fin}.${pend.length ? ` ${pend.join(' · ')} (no se recorta).` : ''} A las 05:30, los 15′ de repasos ENCAPS (su guía). Cada tarjeta USMLE lleva la cabecera del día (ESPECIALIDAD · SUBTEMA · FUENTE · MODO), con un tope de ${AK.topeDia} tarjetas nuevas/día. Método completo (ajustes, tipos de tarjeta, cuotas, backlog, telemetría): ${METODO_MD}.` });
}
/** config_anki (CONF_MOV) · el 05:00-05:45 del día de la configuración: no se hizo y este bloque solo dice adónde fue cada parte (se queda en su franja: la cadena del
 *  Anki ENCAPS de las 05:20/05:30, gen_encaps_manana › usmleOcupaGA, no cambia). */
function bloqueConfigMovida(f) {
  return B(f, '05:00–05:45', `ANKI · CONFIGURACIÓN no hecha: preset → ${fd(D2.fecha)} 05:00 · vídeo FSRS + manual → ${fd(CONF_MOV.fecha)} ${CONF_MOV.ini}`, [
    P(45, `Nada en este bloque: la CONFIGURACIÓN de Anki va repartida → el preset «APEX USMLE» (Sync, preset y comprobación), el ${fd(D2.fecha)} a las 05:00, delante del vídeo de método · «Anki Almost Broke Me…» entero y el manual FSRS (${CONF_MOV.min}′), el ${fd(CONF_MOV.fecha)} ${CONF_MOV.ini}-${CONF_MOV.fin}`,
      `Hoy no hay tarjetas USMLE que repasar: nacen el ${fd(D2.fecha)} desde las 07:15, con el preset ya puesto a las 05:00.`),
  ], [], 'nada que marcar: el preset va con el D2 y el vídeo FSRS + el manual, el fin de semana');
}
/** config_anki (CONF_MOV) · el bloque del fin de semana a hora fija: «Anki Almost Broke Me…» ENTERO, en los dos tramos que tenía (configuración: 0:00 → CONF_REP[0].fin;
 *  D2: de ahí al final, Change 8 + FAQ), con sus mismos minutos, + el manual FSRS (3′) = la franja de config_anki.fsrs (si no, aborta). El preset ya lo puso el D2. */
function bloqueFsrsFinde() {
  const pF = PALM.Te5RnxeG_Gg, it = CONF_REP[0], s = CONF_MOV;
  const capsTxt = pF.caps.map((x, i) => (i === pF.caps.length - 1 ? `${hms(x)} Change 8` : hms(x))).concat(`${hms(pF.faq)} FAQ`).join(' · ');
  const totC = pF.caps.length - 1, nC = pF.caps.slice(1).filter((x) => x < it.fin).length;
  const m2 = realMinV(pF.s - it.fin, D2.d, VEL_METODO);
  const hm = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
  const aManual = hhmm(hm(s.ini) + it.min + m2);
  const pasos = [
    P(it.min, `Palmerton · «${pF.t}» de 0:00 a ${hms(it.fin)} (intro + cambios 1-${nC})`, `YouTube · 1,0× · CC: inglés (automáticos) · el vídeo de la configuración (Anki + FSRS) · 1 línea por cambio: qué cambia y si aplica a tu Anki (preset «APEX USMLE», ya puesto) · capítulos: ${capsTxt}`, { t: 'YouTube', url: yt('Te5RnxeG_Gg') }),
    P(m2, `… de ${hms(it.fin)} a ${hms(pF.s)}: ${nC + 1 === totC ? `Change ${totC}` : `cambios ${nC + 1}-${totC}`} + FAQ`, `Sigue desde ${hms(it.fin)} · 1 línea por cambio; del FAQ, solo lo que aplique · a las ${aManual} para el vídeo donde esté y pasa al manual.`, { t: 'YouTube', url: yt('Te5RnxeG_Gg', it.fin) }),
    P(CONF_MIN.manual, 'Manual de Anki › Deck Options › FSRS: «Desired Retention» y «FSRS Parameters › Optimize FSRS Parameters» (acotado a 3′)', `Lee qué hacen los dos ajustes FSRS del preset «APEX USMLE»: la retención deseada (${AK.ret}) y la optimización con tu historial (la del ${fd(SAB_OPT)}); 1 línea de cada uno. No se cambia ningún ajuste.`, DOC_FSRS),
  ];
  if (pasos.reduce((a, p) => a + p.min, 0) !== s.min) aborta(`config_anki.fsrs ${s.ini}-${s.fin}: los pasos suman ${pasos.reduce((a, p) => a + p.min, 0)}′ y la franja tiene ${s.min}′`);
  return B(s.fecha, `${s.ini}–${s.fin}`, `ANKI · vídeo FSRS + manual (de la configuración del ${fd(CONF_DIA)})`, pasos,
    [recPalm('Te5RnxeG_Gg'), DOC_FSRS], `«Anki Almost Broke Me…» entero (0:00-${hms(pF.s)}) con los ${totC} cambios y el FAQ anotados y las 2 líneas del manual`,
    { planB: 'Sin PC: el vídeo y el manual, en el móvil (YouTube y docs.ankiweb.net); las notas, en papel o en el móvil.',
      aviso: `Lo que quedó de la configuración del ${fd(CONF_DIA)} (el preset ya se puso el ${fd(D2.fecha)} a las 05:00): no se cambia ningún ajuste.` });
}
function anki0500D2(r) {
  if (CONF_MOV) return presetD2(r);
  const f = r.fecha; const rep = REP[r.d];
  const iF = rep.s0500.find((it) => it.id === 'Te5RnxeG_Gg'), iO = rep.s0500.find((it) => it.id === 'BOtQJeFE_rc'), pF = PALM.Te5RnxeG_Gg;
  if (!iO || rep.s0500.some((it) => it.id !== 'Te5RnxeG_Gg' && it.id !== 'BOtQJeFE_rc')) aborta(`${etq(r)}: el Anki de las 05:00 espera el resto del vídeo FSRS y «The ONLY Video…» (v6.10u)`);
  const vids = pasosVideo(r.d, rep.s0500).map((p, i) => {
    const it = rep.s0500[i];
    // v6.11 (remate, revisión USMLE BAJA): el resto del vídeo FSRS dice qué cambios quedan, con la misma cuenta que la configuración (los que EMPIEZAN desde
    //   it.ini); antes repetía «pausa y anota los 8 cambios» aunque la configuración ya anotó los primeros. Aborta si el texto base cambia
    if (it.id === 'Te5RnxeG_Gg') {
      const totC = pF.caps.length - 1, nYa = pF.caps.slice(1).filter((x) => x < it.ini).length, ANOTA = `pausa y anota los ${totC} cambios`;
      if (!p.como.includes(ANOTA)) aborta(`${etq(r)} 05:00: el «cómo» del resto del vídeo FSRS ya no dice «${ANOTA}» (METODO.Te5RnxeG_Gg)`);
      const quedan = nYa >= totC ? 'ya anotaste los cambios en la configuración: hoy solo completa la lista' : nYa === totC - 1 ? `pausa y anota el ${totC}.º cambio (los ${nYa} primeros, en la configuración)` : nYa ? `pausa y anota del ${nYa + 1}.º al ${totC}.º cambio (los ${nYa} primeros, en la configuración)` : ANOTA;
      return { ...p, que: `${p.que}${it.ini === pF.faq ? ' · el FAQ, opcional' : ''}`, como: p.como.replace(ANOTA, quedan).replace(` · sigue desde el minuto ${hms(it.ini)} (lo empezaste antes, hoy)`, ` · sigue desde el minuto ${hms(it.ini)}, donde paraste en la configuración del ${fd(CONF_DIA)} (si paraste antes, desde ahí)${it.ini === pF.faq ? ': es el FAQ, opcional; si no lo ves, esos minutos van al free recall' : ''}`) };
    }
    return { ...p, como: p.como.replace(' · pausa y anota 5 ideas', ` · pausa y anota 5 ideas · para en ${hms(iO.fin)}, donde empieza «Reading test writer intent» (lo siguiente, en la cola)`) };
  });
  const V = vids.reduce((a, p) => a + p.min, 0); const resto = D2_0500.total - D2_0500.sync - V;
  if (resto < 0) aborta(`${etq(r)}: el Anki de las 05:00 no cabe en 30′ (Sync ${D2_0500.sync} + vídeos ${V})`);
  const pend = [...colaPendienteTras(r.d, 's0500')].filter((it) => it.id === 'BOtQJeFE_rc').map((it) => `«${PALM[it.id].t.split(' You Need')[0]}…» de ${hms(it.ini)} a ${hms(it.fin)} → ${destinoDe(it)}`);
  return B(f, '05:00–05:30', 'ANKI (aún sin tarjetas USMLE que repasar: nacen hoy) + VÍDEOS DE MÉTODO', [
    P(D2_0500.sync, 'Sync (Anki escritorio)', `Aún no hay tarjetas USMLE que repasar: APEX::USMLE y sus submazos tienen el preset desde la configuración del ${fd(CONF_DIA)}${TEST_S1_MISMO_DIA ? '; las primeras tarjetas nacen hoy (la [TEST S1] de las 04:15 en ::Cardiology, suspendida, y las del plan desde las 07:15)' : ''}. Si a la configuración le faltó algo (el preset o su comprobación), complétalo aquí.`),
    ...vids,
    ...(resto > 0 ? [P(resto, 'Free recall de los vídeos (sin mirar)', '3 ideas de cada vídeo en 1 línea; lo que no salga, a la shopping list.')] : []),
  ], [R_ANKI, ...recVideo(rep.s0500)], `sync hecho y los vídeos de método vistos con sus notas («The ONLY Video…» hasta ${hms(iO.fin)})`,
    { planB: `Anki escritorio no abre: los vídeos, en el móvil (YouTube; «The ONLY Video…» con ${AUDIO_EN}); el preset, si faltaba, en cuanto abra, antes de la 1.ª tarjeta de las 07:15 (AnkiWeb no edita presets).`,
      ...(pend.length ? { aviso: `${pend.join(' · ')} (no se recorta).` } : {}) });
}
/** v6.10b: los tramos de la cola que siguen pendientes tras la franja `slot` del día d (para el aviso «lo que no cabe → …») */
function colaPendienteTras(d, slot) {
  const vistos0 = DONDE.filter((x) => x.d === d && x.slot === slot).map((x) => x.it);
  return vistos0.filter((it) => it.tipo === 'palm' && it.fin < PALM[it.id].s).map((it) => ({ ...it, ini: it.fin, fin: PALM[it.id].s }));
}
/** v6.10b · una PREGUNTA A FONDO del nivel 0 (§3.1 del arranque: los pasos y sus minutos de la tabla, con tope duro de 45′) + (D2) 10′ de pulir tarjetas y
 *  shopping list + 5′ de bitácora (§3.2 modo A). */
function preguntaAFondo(r, k, n, franja) {
  const d = r.d, m = MF1[d], ids = uwAFondo(d), conPulido = F1_N0[d].hora === 60, tj = conPulido ? '2-4' : '2-3';
  const pasos = [
    P(1, `Armar la pregunta ${k}/${n} (1Q, Tutor): ${ids.map(uwNom).join(' + ')}`, // v6.10j (rev. c14, vetadas #7): el modo delante (con 2 Systems el «qué» pasaba de 150 y se cortaba en «(Tutor, sin …»)
      `${tcUW1(ids, 1)} · el cronómetro solo MIDE (no es para ir rápido): tope duro de 45′ desde aquí.`, L_UW),
    // v6.10m (rev. c16, vetadas #15): «UNA vez, despacio y en orden» pasa al «qué» para que el «cómo» enseñe en sus 110 QUÉ se busca («solo la que bloquee la
    //   frase»; antes el corte dejaba «y busca solo …» con el paréntesis abierto). El «qué» sigue empezando por «Leer con las opciones tapadas» (verificar_v6)
    P(13, 'Leer con las opciones tapadas (la viñeta UNA vez, despacio y en orden) + CCSN + SAQ + responder como juez', 'Lee la viñeta (5′): marca sin traducir cada palabra que no entiendas y busca solo la que bloquee la frase · CCSN por oración: Contexto, Cronología, Severidad y Noise (4′; la cronología en presente, frases cortas) · SAQ: la pregunta que respondería un panel sin opciones + tu respuesta (2′) · destapa y elige: rule-in ≈10 s por opción y luego rule-out; anota tu seguridad: seguro / dudo / adivino (2′).'),
    // v6.10o (rev. c17, vetadas #9): el «cómo» se cortaba en «· vuelve al enunciado: …» y escondía QUÉ se audita (4′ de los 7′) → los 2 sub-pasos con sus
    //   minutos van en el «qué» (≤ 150, entero); el «cómo» empieza por «vuelve al enunciado» y la shopping list (mismo contenido, mismos minutos)
    P(7, 'Educational Objective: sus 1-3 frases, solo contra tu opción (3′) + auditar la viñeta: ¿para qué cada oración, cada vital y cada laboratorio? (4′)', 'Tras el Educational Objective, vuelve al enunciado. Cada término nuevo, a la shopping list (vocabulary gap).' + trampaTrasTxt(r, k === 1 ? 'la 1.ª pregunta a fondo es un pre-test' : 'cada pregunta a fondo se responde a ciegas')),
    P(12, `Shopping list → First Aid 2026 › ${m.fa}: la sección completa (Whole Page Rule), acotado a 12′`, `${metodoLeerTxt(r)}No medible sin el libro abierto: acotado a 12′; marca dónde paras. La sección completa del subtema, no solo el dato que fallaste; lo que no llegue → la PÁGINA COMPLETA de las ${PC_INI[d]}.`),
    P(5, '5 preguntas de verificación, en voz alta y en inglés sencillo', '¿Cuál es la SAQ? · ¿por qué es correcta la correcta? · ¿por qué cada incorrecta no lo es AQUÍ? · ¿en qué escenario sería correcta cada incorrecta? · ¿qué dato cambiaría la respuesta?'),
    P(7, `Clasificar el error + SAQ y PC por escrito + ${tj} tarjetas APEX · ${cabCorta(espApex(r), subApex(r), 'UWorld', 'estudio')}`, `Clasifica: knowledge / transfer / unforced («no conocía la palabra» = knowledge de vocabulario) · escribe solo la SAQ y la cronología fisiopatológica (PC: 4-6 pasos en presente) · ${tj} tarjetas de MECANISMO o PC: ${R_FRENTE} · ${R_ENVIO}.${tarjetaDiaTxt(r)}`),
  ];
  if (conPulido) pasos.push(
    P(10, 'Pulir las tarjetas de esta pregunta y la shopping list', `Relee cada tarjeta: ¿se entiende sola dentro de 6 meses?, ¿la respuesta es un porqué y no un dato suelto? ${rCorrige(r)}. La shopping list, con la palabra o el concepto exacto que faltó.`),
    P(5, 'Bitácora de la pregunta (📏 Medición)', 'Minutos usados · relecturas de la viñeta · seguridad (seguro / dudo / adivino) · tipo de error. Si llegaste a los 45′, lo que falte pasa a la shopping list de la próxima sesión.'));
  const aviso = k === 1 ? `NIVEL 0 (decisión de Joseph del 17-nov, DATA/USMLE/PALMERTON_NIVEL0_ARRANQUE.md §3): sin simulacro ni reloj; ${n} preguntas a fondo, una ${conPulido ? 'por hora (≤45′ cada una + 10′ de tarjetas y shopping list + 5′ de bitácora)' : 'cada 45′ (tope duro: sin los 15′ de pulido, §3.2)'}, del mismo subtema y con su análisis completo. Funcionan como PRE-TEST: 40-60 % es normal. ${conPulido ? `Al final de la mañana, la validación con 5Q NUEVAS de Mehlman (11:00).` : 'Al final, la validación con 5Q NUEVAS de otro banco (A5/A6).'}` : undefined;
  return B(r.fecha, franja, tit85(`PREGUNTA ${k}/${n} a fondo · NIVEL 0 · `, txtSub(r), ' (Tutor, sin tiempo por pregunta, ≤45′)'), pasos, [R_UW], `pregunta ${k} respondida y analizada en ≤45′, su SAQ + PC escritas y ${tj} tarjetas APEX confirmadas (toast ✓)`, { planB: respaldo1(d, 1), aviso });
}
/** v6.10b · PÁGINA COMPLETA del nivel 0 (45′): el vídeo del día (B&B) + la lectura de la página completa (First Aid + PassMedicine/Library), acotada. */
function paginaCompleta(r, franja) {
  const d = r.d, m = MF1[d], rep = REP[d];
  const vids = pasosVideo(d, rep.spc); const V = vids.reduce((a, p) => a + p.min, 0); const L = minF(franja) - V;
  const nDocs = Math.min(m.lib.length, L >= 25 ? 3 : 2);
  const avisos = [];
  const vidCorto = (it) => (it.tipo === 'bb' ? `${(/^(\d+)/.exec(BB.get(it.id).nombre) || [])[1] || BB.get(it.id).nombre}${it.ini ? ` (desde ${mmss(it.ini)})` : ''}` : 'Palmerton');
  // compacto (el Calendar corta el aviso a 240): cada vídeo con el DÍA en que empieza a verse; la franja exacta va en la guía de ese día
  const diaDe0 = (it) => { const xs = DONDE.filter((x) => x.it.tipo === it.tipo && x.it.id === it.id && x.it.dOrig === it.dOrig && x.it.fin > it.ini && x.it.ini < it.fin).sort((a, b) => (FECHA_D(a.d) < FECHA_D(b.d) ? -1 : 1)); return xs.length ? fd(FECHA_D(xs[0].d)) : '—'; };
  if (rep.desborde.length) { const g = new Map(); for (const it of rep.desborde) { const k = diaDe0(it); g.set(k, [...(g.get(k) || []), vidCorto(it)]); } avisos.push(`Vídeo de hoy que no cabe (no se recorta; la franja, en la guía de ese día): ${[...g].map(([k, v]) => `${v.join(', ')} → ${k}`).join(' · ')}.`); }
  if (m.nota) avisos.push(notaTxt(m.nota, r.d));
  return B(r.fecha, franja, `PÁGINA COMPLETA · ${corto(txtSub(r), 60)} · Whole Page Rule`, [
    ...vids,
    P(L, `no medible (pide sesión): acotado a ${L}′ — Lectura de la página completa: First Aid 2026 › ${m.fa} → ${libTxt(d, nDocs)}`, `${metodoLeerTxt(r)}Acotada a ${L}′ en ese orden; marca dónde paras. Es la página COMPLETA del subtema de las preguntas de hoy (Whole Page Rule, §3.1 paso 8): el concepto entero, no solo el dato; 3-5 puntos a mano. Lo que no llegue: sus dudas, a la shopping list.`, { t: libNom(m.lib[0][0], m.lib[0][1]).replace(/^[^·]*· /, ''), url: lib(m.lib[0][0], m.lib[0][1]) }),
  ], [R_VID, ...recVideo(rep.spc), ...recLib(d)], 'vídeo(s) de hoy vistos con sus notas y la página completa leída (3-5 puntos a mano)', { planB: 'Qbankly caído → misma sección en First Aid (libro) y la lectura de la Library cuando vuelva.', aviso: avisos.join(' ') || undefined });
}
/** v6.10b · REVALIDACIÓN (5 días) / VALIDACIÓN DE 48 H del subtema anterior (A6): 5Q NUEVAS de uWorld (Tutor) + la página de cada fallo + el gate de 10
 *  consecutivas (las 5 de la validación de su día + estas 5). 30′ (§3.2 «sesión de 30′»). */
function pasosRevalidacion(r, prev) {
  const ids = uwReval(prev); const dd = diasReales(prev.fecha, r.fecha); const tipo = dd <= 2 ? 'validación de 48 h' : `revalidación a los ${dd} días`;
  return { tipo, pasos: [
    P(1, `Armar 5Q NUEVAS del subtema del ${fd(prev.fecha)} (${etq(prev)}): ${ids.map(uwNom).join(' + ')}`, tcUW1(ids, 5), L_UW),
    P(tutMin(5), `5Q en ${TUTOR1} · ${tipo} de «${corto(txtSub(prev), 70)}» (${etq(prev)})`, `SAQ + CCSN antes de mirar las opciones; después, la explicación entera (Tutor: ${TUTOR_TXT}).`),
    faAcotado(12, MF1[prev.d].fa, 'la página de cada fallo y de cada acierto con duda', 'la shopping list'),
    P(5, `Gate de 10 consecutivas + ≤2 tarjetas APEX de los fallos · ${cabCorta(espApex(prev), subApex(prev), 'UWorld', 'estudio')}`, `📏 Medición: las 5 de la validación del ${fd(prev.fecha)} + estas 5 = 10 consecutivas · ≥8/10 (80 %) → subtema VALIDADO (ya puede ir a nivel 2, cronometrado) · <8/10 → sigue en nivel ${nivel0(prev) ? 0 : 1} y se revalida en la próxima sesión (Four Critical Adjustments, §3.4: recursos → comprensión → aplicación → memoria). ${mayus(R_ENVIO)}.`),
  ] };
}
function revalidacion(r, prev, franja) {
  const { tipo, pasos } = pasosRevalidacion(r, prev);
  return B(r.fecha, franja, `${tipo.startsWith('validación') ? 'VALIDACIÓN 48 H' : 'REVALIDACIÓN'} · 5Q del ${etq(prev)} (Tutor, sin tiempo por pregunta)`, pasos, [R_UW], '5Q hechas y el gate de 10 consecutivas registrado en 📏 Medición', { planB: respaldo1(prev.d, 5) });
}
/** v6.10b · 07:15-08:15 del nivel 1: la revalidación / validación de 48 h (30′) + el vídeo pendiente de la cola (≤28′) + free recall. */
function repasoN1(r, prev) {
  const d = r.d, rep = REP[d]; const { tipo, pasos } = pasosRevalidacion(r, prev);
  const vids = pasosVideo(d, rep.s0715); const V = vids.reduce((a, p) => a + p.min, 0); const resto = 30 - V;
  const d3 = contAtras(r, 3), d7 = contAtras(r, 7); const dd = [d3 && ['D-3', d3], d7 && ['D-7', d7]].filter(Boolean);
  if (resto > 0) pasos.push(...vids, P(resto, V ? `Free recall del vídeo (sin mirar)${resto > 5 && dd.length ? ` + ${dd.map((x) => x[0]).join(' / ')}` : ''}` : `${dd.map((x) => x[0]).join(' / ') || 'Repaso'}: free recall${dd.length ? ` de ${dd.map((x) => `«${corto(txtSub(x[1]), 50)}» (${etq(x[1])})`).join(' y ')}` : ''} + Anki restante`, V ? frVideoTxt(resto, vids) : 'Sin mirar: 3 ideas de cada subtema; lo que salga < 60 % → busca sus tarjetas y márcalas Again. Si quedaron vencidas a las 05:00, termínalas aquí.'));
  else pasos.push(...vids);
  return B(r.fecha, '07:15–08:15', `REPASO ANCLADO · ${tipo} del ${etq(prev)} (5Q Tutor)${V ? ' + vídeo pendiente' : ''}`, pasos, [R_UW, ...recVideo(rep.s0715)], '5Q hechas, el gate de 10 consecutivas registrado y el vídeo pendiente visto', { planB: respaldo1(prev.d, 5) });
}
/** v6.10b · 08:15-09:00 del nivel 1: BLOQUE 1 = PRE-TEST ciego de 5Q en Tutor (sin gate) + revisión a fondo de las incorrectas (§3.2 modo B) + bitácora. */
function pretestN1(r) {
  const d = r.d, m = MF1[d], hoy = uwDe(d), q = QS[d];
  return B(r.fecha, '08:15–09:00', tit85('BLOQUE 1 · PRE-TEST · 5Q ciegas · ', txtSub(r), ' (Tutor, sin tiempo por pregunta)'), [
    P(1, `Armar: ${hoy.map(uwNom).join(' + ')}`, tcUW1(hoy, 5), L_UW),
    // v6.10t (auditoría c19 · cambios-c19 #6): la regla SAQ DELANTE del «cómo» (el Calendar lo corta a 110 y, con «sin tiempo por pregunta», caía detrás de «SAQ»)
    //   (remate v6.10t, revisión BAJA/MEDIA: el paréntesis de Palmerton, corto —«1 subtema, Tutor, sin reloj»—, para que el corte no lo deje abierto)
    P(tutMin(5), '5Q ciegas del tema NUEVO (sin haber visto nada de hoy)', `SAQ (pregunta autónoma) antes de mirar las opciones + CCSN · ${faseTxtDe(r)} (Palmerton: 1 subtema, Tutor, sin reloj); después, la explicación entera (Tutor: ${TUTOR_TXT}).`),
    faAcotado(27, m.fa, 'revisión a fondo de cada incorrecta y de cada duda: Educational Objective → la página completa (Whole Page Rule)', 'el DEEP PRIME de las 09:00 (misma sección)'),
    P(5, 'Bitácora + shopping list (pre-test /5 en 📏 Medición)', `Cada duda, también en los aciertos, a la shopping list; 40-60 % es normal: es diagnóstico, no gate.${trampaTrasTxt(r, 'el bloque 1 es ciego')}${metDia(r) ? ' Lo aplicas en el bloque 2 y en la validación.' : ''}`),
  ], [R_UW], 'nota /5 en 📏 Medición y la shopping list escrita', { planB: respaldo1(d, 5), aviso: q && q.deficit ? `Según este plan, a estos Systems de uWorld les quedan ~${q.dispAntes} Unused antes de hoy: cuando ${QBK.boton} se quede corto, usa el respaldo de abajo (Mehlman).` : undefined });
}
/** v6.10b · 11:00-11:30 del nivel 1: BLOQUE 2 = 5Q Tutor del subtema (tras el deep prime) + la página de cada fallo + ≤2 tarjetas + bitácora (§3.2 modo B). */
function bloque2N1(r) {
  const d = r.d, m = MF1[d], hoy = uwDe(d);
  return B(r.fecha, '11:00–11:30', `BLOQUE 2 · 5Q Tutor del subtema · ${corto(txtSub(r), 55)} (sin tiempo por pregunta)`, [
    P(1, `Armar: ${hoy.map(uwNom).join(' + ')}`, tcUW1(hoy, 5), L_UW),
    P(tutMin(5), '5Q en Tutor del subtema de hoy (bloque 2 de 5)', `SAQ + CCSN; la explicación entera (Tutor: ${TUTOR_TXT}). Correctas seguras: 30-60 s; incorrectas y dudosas: a fondo.${metDia(r) ? ' Aplica el método al responder del día (lo leíste en la bitácora del bloque 1).' : ''}`),
    faAcotado(12, m.fa, 'la página de cada fallo del bloque', 'la shopping list'),
    P(5, `≤2 tarjetas APEX de los fallos + bitácora · ${cabCorta(espApex(r), subApex(r), 'UWorld', 'estudio')}`, `${mayus(R_ERROR)}. ${mayus(R_ENVIO)}. Bloques 1 + 2 = las 10Q del subtema (A3: 5-10Q en bloques de 5).`),
  ], [R_UW], '5Q hechas, % en 📏 Medición y ≤2 tarjetas APEX', { planB: respaldo1(d, 5) });
}
/** v6.10b · VALIDACIÓN de la misma sesión (A6) con 5Q NUEVAS de otro banco (A5: Mehlman) + la página de cada fallo + tarjetas + gate. 30′ · el D2, 60′
 *  (regla del chat: «11:00 validación con 5Q nuevas de Mehlman, mismo System, en Tutor») con el vídeo pendiente de la cola en lo que queda. */
function validacion(r, franja) {
  const d = r.d, m = MF1[d], ids = mhVal(d), total = minF(franja), largo = total >= 60, rep = REP[d];
  const tj = largo ? 3 : 1; const prox = F1.find((x) => x.fecha > r.fecha && !esHito(x));
  const pasos = [
    P(1, `Cambiar a Mehlman y armar 5Q NUEVAS: ${ids.map(mhNom).join(' + ')}`, tcMH1(ids, 5), L_UW),
    P(tutMin(5), `5Q NUEVAS en ${TUTOR1} · validación de la misma sesión (filtro distinto: Mehlman)`, `SAQ + CCSN antes de mirar las opciones; después, la explicación entera (Tutor: ${TUTOR_TXT}).`),
    faAcotado(largo ? 15 : 12, m.fa, 'la página de cada fallo y de cada acierto con duda', 'la shopping list'),
    P(largo ? 8 : 3, `≤${tj} tarjeta${tj > 1 ? 's' : ''} APEX de los fallos · ${cabCorta(espApex(r), subApex(r), 'mix_examen_usmle', 'estudio')}`, `${mayus(R_ERROR)}. ${mayus(R_ENVIO)}.`),
    P(2, 'Gate (1.ª mitad) en 📏 Medición', `≥4/5 → 1.ª mitad del gate de 10 consecutivas; la 2.ª mitad${prox ? ', ' : ': '}${prox ? `${diasReales(r.fecha, prox.fecha) <= 2 ? 'la validación de 48 h' : 'la revalidación'} del ${fd(prox.fecha)} a las ${nivel0(prox) ? '07:15' : prox && trasHito(prox) && trasHito(prox).n === 1 ? '11:00' : '07:15'} (5Q nuevas de uWorld)` : `sin mañana de Step antes de la pausa (desde el ${fd(PAUSA_REAL)}): el subtema vuelve a medirse en la REENTRADA mixta del ${fd(FV6.step1.reinicio)}`} · <4/5 → el subtema sigue en nivel ${nivel0(r) ? 0 : 1}: la página de cada fallo vuelve a la shopping list.`),
  ];
  const vids = largo ? pasosVideo(d, rep.s1100) : []; const V = vids.reduce((a, p) => a + p.min, 0);
  const usado = pasos.reduce((a, p) => a + p.min, 0) + V;
  if (vids.length) pasos.push(...vids);
  if (total - usado > 0) pasos.push(P(total - usado, V ? 'Free recall del vídeo (sin mirar)' : 'Free recall en blanco del subtema (sin mirar)', V ? frVideoTxt(total - usado, vids) : 'La cadena causal del subtema en 1 hoja; compárala con tus notas y corrige en rojo.'));
  return B(r.fecha, franja, V ? tit85('VALIDACIÓN · 5Q NUEVAS de Mehlman · ', txtSub(r), ' + vídeo pendiente') : `VALIDACIÓN · 5Q NUEVAS de Mehlman (Tutor) · ${txtSub(r)}`, pasos, [R_UW, ...recVideo(vids.length ? rep.s1100 : [])], '5Q hechas, el % y la 1.ª mitad del gate en 📏 Medición', { planB: planBValidacion(r, ids, prox) });
}
/** v6.10r (19-nov · hallazgo 3 del chat USMLE, decisión del chat de plan): el plan B de la validación NUNCA usa uWorld (la validación es con otro banco, A5, y sus
 *  Unused de este subtema son de la revalidación de la próxima sesión: el D2 deja exactamente 5 —Cellular pathology 3 + Inflammation and repair 2—, las de la 2.ª
 *  mitad del gate). Usa Mehlman: el mismo subtema en otro System suyo del catálogo (MF1[d].mh) o, si no hay, las que tenga. Antes: «las que queden de uWorld». */
function planBValidacion(r, ids, prox) {
  const d = r.d, sib = (MF1[d].mh || []).filter((x) => !ids.includes(x)), n = QS[d] ? QS[d].quedanReval : null;
  const uwN = uwReval(r).map((id) => `«${UWY.get(id).nombre}»`).join(' + ');
  const reserva = prox ? `son de la ${diasReales(r.fecha, prox.fecha) <= 2 ? 'validación de 48 h' : 'revalidación'} del ${fd(prox.fecha)} (2.ª mitad del gate)` : 'quedan para el tramo 2';
  return `Mehlman sin 5 Unused en ${ids.map(mhNom).join(' + ')}: ${sib.length ? `completa con el mismo subtema en Mehlman, ${sib.map(mhNom).join(' + ')} (${QB_MH}), mismo modo` : 'haz las que tenga (el gate se cuenta con las que hagas)'}. Nunca uWorld en esta validación: ${n != null && n <= 5 ? `las ${n} Unused que le quedan a este subtema en uWorld (${uwN})` : `las Unused de uWorld de este subtema (${uwN})`} ${reserva}. Nunca preguntas de otro tema.`;
}
/** v6.10b · 18:00-18:45 de un día de Step sin Day-After (nivel 0-1; regla del chat para el D2): 1.ª pasada de Anki de las tarjetas de hoy + vocabulario +
 *  nota del día; los demás días, + el vídeo pendiente de la cola (≤15′); el resto, free recall en blanco. Sin eval cronometrada (A4: sin reloj hasta el 80 %). */
function anki18(r) {
  const d = r.d, rep = REP[d], esD2 = d === D2.d, b = presupuestoF1(r);
  const nA = b.total, minA = Math.max(5, Math.ceil((nA * 50) / 60)); let nV = esD2 ? 10 : 5;
  const vids = esD2 ? [] : pasosVideo(d, rep.s1800); const V = vids.reduce((a, p) => a + p.min, 0);
  // v6.10l (rev. c15, dias-clave #5): con vídeo, el free recall necesita sus 90 s por vídeo (vie 27-nov: 13 + 10 + 6 + 15 dejaban 1′) → lo que falte sale de la
  //   nota del día (6′ → ≥ 4′), dentro de los mismos 45′
  const nVid = new Set(vids.map((p) => p.que.replace(/\s*\(.*$/, ''))).size;
  // remate v6.10r (revisión BAJA #7): si el vídeo (entero por la holgura de NO_PARTIR) deja < 6′, la nota (≥ 4′) y el free recall con sus 90 s por vídeo
  //   (regla v6.10l) salen del VOCABULARIO, 1 palabra (≈2′) cada vez (mié 25-nov real: ≤5 → ≤4 palabras; antes el free recall se quedaba en 1′ = 60 s)
  if (V && 45 - (minA + nV * 2 + V) < 6) { const falta = 4 + Math.ceil(1.5 * nVid) - (45 - (minA + nV * 2 + V)); if (falta > 0) nV = Math.max(1, nV - Math.ceil(falta / 2)); }
  const sinNota = 45 - (minA + nV * 2 + V);
  // v6.10r: un vídeo que se termina con los ≤2′ de holgura de NO_PARTIR (mié 25-nov real: «03 - Free Radicals» entero, 17′ en la franja de 15′) deja menos de 6′
  //   para la nota → la nota baja a ≥ 4′ y el free recall se queda con lo que sobre (antes: Σ 46 ≠ 45)
  const notaMin = V && sinNota < 6 ? Math.max(4, sinNota - Math.ceil(1.5 * nVid)) : V && sinNota - 6 > 0 && sinNota - 6 < Math.ceil(1.5 * nVid) ? Math.max(4, sinNota - Math.ceil(1.5 * nVid)) : 6; // sin paso de free recall (el vídeo llena la franja), como antes
  const pasos = [
    P(minA, `1.ª pasada de Anki: las ≤${nA} tarjetas APEX de hoy (APEX::USMLE › Study Now)`, 'Con sus pasos de aprendizaje (≈50 s por tarjeta nueva): responde EN VOZ ALTA antes de girar · Good / Again, nunca Hard ni Easy · lee primero la línea «Summary:» · ' + R_PASADA + '.' + (metDia(r) ? ` Control del método: ¿hay al menos una del tipo del día? (${metDia(r).tarjetas}); si es una lista o un dato suelto, conviértela en mecanismo.` : '')),
    P(nV * 2, `Vocabulario: ≤${nV} palabras de la shopping list → tarjetas de vocabulario (≈2′ cada una)`, `Anki escritorio, mazo propio «USMLE::Vocabulario» (fuera de APEX: no cuenta en el tope de ${AK.topeDia} tarjetas de mecanismo${esD2 ? '; se crea hoy, con las primeras palabras' : ''}): frente = la palabra en inglés con su etimología (adeno + -oma) · reverso = el significado en 1 línea + audio de pronunciación en fármacos y microbios (§5.6 del arranque).`),
    P(notaMin, 'Nota del día (bitácora) en 📏 Medición', `Minutos por pregunta · relecturas · seguridad (seguro / dudo / adivino) · tipo de error (knowledge / transfer / unforced) · % de la validación y qué falta para el gate del 80 % · horas netas de Step 1 del día (GO/NO-GO por horas).`),
    ...vids,
  ];
  const resto = 45 - pasos.reduce((a, p) => a + p.min, 0);
  if (resto > 0) pasos.push(P(resto, V ? 'Free recall del vídeo (sin mirar)' : esD2 ? 'Free recall en blanco: la cadena PC de cada pregunta de hoy (sin mirar)' : 'Free recall en blanco del subtema de hoy (sin mirar)', V ? frVideoTxt(resto, vids) : 'En 1 hoja, sin mirar: la cronología fisiopatológica (4-6 pasos en presente) de cada pregunta / del subtema; compárala con tus notas y corrige en rojo.'));
  return B(r.fecha, '18:00–18:45', `ANKI 1.ª pasada + VOCABULARIO + NOTA DEL DÍA${V ? ' + vídeo pendiente' : ''}`, pasos, [R_ANKI, ...recVideo(vids.length ? rep.s1800 : [])], `las tarjetas de hoy con su 1.ª pasada, las palabras nuevas en su mazo y la nota del día en 📏 Medición`, { aviso: esD2 ? `La 1.ª medición completa es el NBME 25 del ${fd(F1.find(esHito).fecha)}: en nivel 0-1 no hay eval cronometrada a las 18:00 (A4: sin reloj hasta dominar el subtema). Regla del chat USMLE para el D2: 1.ª pasada de Anki + vocabulario + nota del día.` : undefined });
}
/** v6.10b · el día de Step de F1 (no hito) en nivel 0-1. */
function diaF1(r) {
  const d = r.d, th = trasHito(r), prev = contAtras(r, 1), out = [];
  if (nivel0(r)) {
    const { q: n, hora } = F1_N0[d]; let t = aMin('07:15');
    if (prev) { out.push(revalidacion(r, prev, frDe(t, 30))); t += 30; }
    for (let k = 1; k <= n; k++) { out.push(preguntaAFondo(r, k, n, frDe(t, hora))); t += hora; }
    if (hhmm(t) !== PC_INI[d]) aborta(`${etq(r)}: la página completa empieza a las ${hhmm(t)} y PC_INI dice ${PC_INI[d]}`);
    out.push(paginaCompleta(r, frDe(t, 45))); t += 45;
    out.push(validacion(r, frDe(t, aMin('12:00') - t)));
  } else {
    out.push(th && th.n === 1 ? dayAfter0715(r, th) : repasoN1(r, prev));
    out.push(pretestN1(r), deepPrime(r));
    out.push(th && th.n === 1 ? revalidacion(r, prev, '11:00–11:30') : bloque2N1(r));
    out.push(validacion(r, '11:30–12:00'));
  }
  out.push(th && th.n <= 4 ? dayAfter18(r, th) : anki18(r));
  out.unshift(d === D2.d ? anki0500D2(r) : anki0500(r, tieneAnkiRestante(out))); // v6.10j: el Anki AM sabe si hoy hay «Anki restante» a las 07:15
  return out;
}

// ── fines de semana de F1 (Anki del Calendar: sáb 21:30-22:00 · dom 16:45-17:00) + los L-V sin Step + la transición ─────────────────────────────
function findes() {
  // v6.03: los fines de semana DENTRO de F1 y el aviso del 1.er sábado tras el D2: la cola es la del último día de plan antes de ese sábado
  const out = {}; const SAB1 = sabadoTras(D2.fecha);
  const antesSab = [...F1].reverse().find((r) => r.fecha < SAB1 && REP[r.d]); const q5 = antesSab ? REP[antesSab.d].colaTras : { bbMin: 0, palmMin: 0 };
  const trasSab = F1.filter((r) => r.fecha > SAB1).slice(0, 2);
  const franjasCola = '07:15, la página completa o el deep prime y las 18:00'; // v6.10b: el nivel 0-1 ve la cola también a las 18:00
  // v6.07 (fix lote 1b del Calendar): el recorrido va de f1.inicio a f1.fin (_fechas_v6.json), no del D2 a la última fila de Step. Sábados y domingos, solo
  //   desde el D2 (antes el mazo está vacío). v6.10b: el 1.er día de F1 (CONF_DIA, mié 18-nov) lleva la CONFIGURACIÓN de Anki entera (05:00-05:45).
  const ULT_F1 = FV6.f1.fin; const ultStep = F1[F1.length - 1].fecha;
  for (let t = new Date(FV6.f1.inicio + 'T12:00:00Z'); t <= new Date(ULT_F1 + 'T12:00:00Z'); t = new Date(t.getTime() + 86400000)) {
    const iso = t.toISOString().slice(0, 10); const w = t.getUTCDay();
    if ((w === 0 || w === 6) && iso < D2.fecha) continue;
    if (w === 6) out[iso] = [B(iso, '21:30–22:00', /* v6.07b: sáb gimnasio 08:30-14:00 + baile 17:00-20:00 → al volver, tras el SYNAPSE de las 21:00 */ `ANKI del sábado · cola FSRS + preset${iso === SAB_OPT ? ' + FSRS Optimize' : ''} + Stats`, [
      P(22, 'TODAS las vencidas de APEX::USMLE (padre › Study Now)', 'Solo vencidas · Good ≈90 % / Again solo olvido real · nunca Hard/Easy · cuando el contador de repasos llegue a 0, cierra: el sábado no se crean ni se estudian nuevas (las del viernes esperan al lunes).'),
      P(3, iso === SAB_OPT ? 'Preset en los submazos nuevos + FSRS › Optimize del preset' : 'Preset en los submazos nuevos', `Deck Options del padre APEX::USMLE › Save ▾ «Save to All Subdecks» (el motor APEX crea los submazos al vuelo con el preset Default, sin tus ajustes).${iso === SAB_OPT ? ` Hoy además, con 4 semanas de repasos del preset: FSRS › «Optimize» y deja Desired retention en ${AK.ret}.` : ''}`),
      P(5, 'Telemetría + Stats de la semana', `node DATA/_scripts/anki_telemetria.js · Anki › Stats del padre: % Again (≈10 % sano; > 20 % → tarjetas largas o perfeccionismo: divídelas; ≈0 % → no te estás examinando) · ALARMA G (backlog > 100 o retención < 85 %) → el lunes, protocolo de backlog (${METODO_MD} §7).`),
    ], [R_ANKI], '0 vencidas (o 22′ cumplidos), el preset al día en todos los submazos y la telemetría registrada', { aviso: iso === SAB1 ? `Cola de vídeo (≈${q5.bbMin}′ de B&B + ${q5.palmMin}′ de Palmerton) → ${trasSab.map((r) => fd(r.fecha)).join(' y ')} (${franjasCola}). Sábado sin vídeo ni preguntas (descanso). ${DSEM === 'L-V' ? 'A la revisión semanal de las 07:15 lleva' : 'Comprueba que la revisión semanal de las 14:00 recogió'}: los gates de la semana (📏 Medición: preguntas a fondo, validación y revalidación) y la cola de vídeo: ≈${q5.bbMin}′ de B&B + ${q5.palmMin}′ de Palmerton que se ven el ${trasSab.map((r) => fd(r.fecha)).join(' y el ')} (${franjasCola}).` : undefined })];
    if (iso === CONF_DIA) { out[iso] = [CONF_MOV ? bloqueConfigMovida(iso) : bloqueConfigAnki(iso)]; continue; } // config_anki: solo dice adónde fue cada parte
    if (w >= 1 && w <= 5 && !F1.some((r) => r.fecha === iso) && !FV6.skip.includes(iso)) out[iso] = [ankiDiaSinStep(iso)];
    if (w === 0) out[iso] = [B(iso, '16:45–17:00', /* v6.07b: dom baile 17:00-20:00 → antes */ 'ANKI del domingo · OPCIONAL (≤15′)', [
      P(15, 'Solo vencidas de APEX::USMLE (si hay)', 'Opcional en el plan (domingo libre) y no se registra. Postura de Palmerton: repasos a cero TODOS los días (saltarse 1-2 días le costó caro) → si hay vencidas, hazlas y el lunes empieza limpio. Nuevas no.'),
    ], [R_ANKI], 'opcional: vencidas a 0 o descanso')];
    // config_anki: «Anki Almost Broke Me…» entero + el manual FSRS, a hora fija en su fin de semana (antes del Anki del sábado o del domingo)
    if (CONF_MOV && iso === CONF_MOV.fecha) { if ((w !== 0 && w !== 6) || !out[iso]) aborta(`config_anki.fsrs: ${iso} no es un sábado ni un domingo de F1 con Anki`); out[iso].unshift(bloqueFsrsFinde()); }
  }
  // v6.09 · lote 1 (17-nov-2026, CONTRATO del Anki 05:00): los L-V hábiles de la TRANSICIÓN (jue 31-dic, día de plan que recupera un día perdido)
  //   llevan su Anki AM USMLE 05:00-05:20 (Step 1 en PAUSA: solo vencidas, 0 nuevas); 05:20-05:45 = repasos ENCAPS (su guía).
  for (const iso of diasHabTransicion()) {
    out[iso] = [B(iso, '05:00–05:20', 'ANKI AM USMLE · Step 1 en PAUSA: solo vencidas (0 nuevas · opcional)', [
      P(2, 'Sync + APEX::USMLE (mazo PADRE) › Study Now', 'Anki escritorio · un solo clic en el padre.'),
      P(16, 'VENCIDAS, sin tope · 0 nuevas desde hoy', `Nuevas pendientes del ${fd(ultStep)} → reinicio del ${fd(FV6.step1.reinicio)} (en la pausa no se estudian nuevas). Opcional en la transición (no se registra), pero Palmerton pide repasos a cero cada día: si hay vencidas, hazlas · responde en voz alta y gira · Good ≈90 % / Again solo si la olvidaste · nunca Hard/Easy · lee primero la línea «Summary:».`),
      P(2, 'Sync final + telemetría', 'Sync · node DATA/_scripts/anki_telemetria.js → due · backlog · retención 30 d · % Again: la pausa empieza con el backlog a 0. A las 05:20, los repasos ENCAPS (su guía).'),
    ], [R_ANKI], 'opcional: 0 vencidas en APEX::USMLE y la telemetría registrada', { aviso: `Día de plan de la transición (recupera un día perdido de F1). Step 1 en PAUSA desde hoy (${transicionTxt(iso)}). La mañana 07:15-12:00 y las 18:00 son de ENCAPS.` })];
  }
  return out;
}
/** Anki AM USMLE de un L-V SIN mañana de Step (mañana ENCAPS): 05:00-05:20 = vencidas + las nuevas del último día de Step; 05:20-05:45 = repasos ENCAPS (su guía). */
function ankiDiaSinStep(iso) {
  const ULT_F1 = FV6.f1.fin; const ultStep = F1[F1.length - 1].fecha;
  const prevStep = [...F1].reverse().find((r) => r.fecha < iso);
  const finF1 = iso === ULT_F1 && iso > ultStep; // v6.07 (fix): último día de F1, sin Step (mié 30-dic, tras el D13 del mar 29-dic)
  return B(iso, '05:00–05:20', `ANKI AM USMLE · día de ENCAPS (sin mañana de Step)`, [
    P(2, 'Sync + APEX::USMLE (mazo PADRE) › Study Now', 'Anki escritorio · un solo clic en el padre.'),
    P(15, 'VENCIDAS primero, sin tope', 'Responde en voz alta y gira · Good ≈90 % / Again solo si la olvidaste · nunca Hard/Easy · lee primero la línea «Summary:» · el mazo de F1 tiene ≤ 210 tarjetas (≤ 20 nuevas por día de Step): las vencidas de un día sin Step caben en 15′.'),
    P(2, `NUEVAS: solo las del ${prevStep ? fd(prevStep.fecha) : 'último día de Step'} que queden en la cola y solo con las vencidas a 0`, 'Hoy no se crean tarjetas USMLE: la mañana es de ENCAPS.'),
    P(1, 'Sync final', 'Sync y cierra: a las 05:20 siguen los 25′ de repasos ENCAPS (su guía).'),
  ], [R_ANKI], '0 vencidas en APEX::USMLE', { aviso: `${finF1 ? `Nuevas del ${prevStep ? fd(prevStep.fecha) : 'último día de Step'} que no entren hoy → reinicio del ${fd(FV6.step1.reinicio)}. Último Anki AM de F1 con nuevas. Pausa del Step 1: ${[...diasHabTransicion().filter((x) => x > iso && conDiaReal(x)).map((x) => `${fd(x)} día de plan (Anki USMLE solo vencidas)`), ...skipReal().filter((x) => x > iso && x < FV6.encaps.intensiva_desde).map((x) => `${fd(x)} SKIP`), 'finde opcional', `mantenimiento desde el ${fd(FV6.encaps.intensiva_desde)}`].join(' · ')}. ` : ''}Día sin Step: en F1 el Step 1 tiene mañana solo los ${DSEM}; hoy la mañana 07:15-12:00 y las 18:00 son de ENCAPS. El Anki USMLE sigue TODOS los días (Palmerton: repasos a cero cada día): 20′ los días sin Step y 30′ los de Step; el resto del Anki 05:00-05:45 es de ENCAPS.` });
}
/** v6.10f (revisión 18-nov · Anki de la transición): los SKIP que de verdad no tienen sesión. Con el alias de corrida_s1 (v6.10d) un SKIP puede ser el día REAL
 *  de un día de plan (vie 1-ene = el plan del jue 31-dic: día de plan completo, Anki USMLE en pausa): ese no se anuncia como «SKIP» (antes «vie 1-ene solo
 *  vencidas · vie 1-ene SKIP», contradictorio, y corrida_s1.reemplazos lo tapaba a mano solo en el 31-dic). */
const skipReal = () => FV6.skip.filter((x) => !((FV6.corrida_s1 && FV6.corrida_s1.alias) || {})[x]);
/** v6.09 · lote 1: L-V hábiles (sin SKIP) de la transición F1 → intensiva ENCAPS (v6.09: jue 31-dic). */
function diasHabTransicion() {
  const out = [];
  if (!FV6.transicion || !FV6.transicion.desde) return out;
  for (let t = new Date(FV6.transicion.desde + 'T12:00:00Z'); t <= new Date(FV6.transicion.hasta + 'T12:00:00Z'); t = new Date(t.getTime() + 864e5)) {
    const iso = t.toISOString().slice(0, 10); const w = t.getUTCDay();
    if (w >= 1 && w <= 5 && !FV6.skip.includes(iso) && iso < FV6.encaps.intensiva_desde) out.push(iso);
  }
  return out;
}
/** v6.09 · lote 1: la pausa del Step 1 en la transición, día a día desde `iso` (exclusive): «jue 31-dic Anki AM USMLE 05:00-05:20, solo vencidas ·
 *  vie 1-ene SKIP · fin de semana, Anki opcional · mantenimiento USMLE en el Anki 05:00 desde el lun 4-ene». */
function transicionTxt(iso) {
  const hab = diasHabTransicion().filter((x) => x > iso);
  const sk = skipReal().filter((x) => x > iso && x < FV6.encaps.intensiva_desde);
  return [hab.length ? `${hab.map(fd).join(' y ')}: Anki AM USMLE 05:00-05:20, solo vencidas` : '', sk.length ? `${sk.map(fd).join(' y ')} SKIP` : '', 'el fin de semana, Anki opcional', `mantenimiento USMLE en el Anki 05:00 desde el ${fd(FV6.encaps.intensiva_desde)}`].filter(Boolean).join(' · ');
}

// ── 4) ENSAMBLADO ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const GUIA = {};
for (const r of F1) GUIA[r.fecha] = esHito(r) ? hitoNBME(r) : diaF1(r); // v6.10b: F1 en nivel 0-1 (diaF1) · el NBME 25 con su Day-After, como estaba
Object.assign(GUIA, findes());
// v6.05 (24-oct): TRAMO 2 — las desplazadas con el guion de F1 por D# (07:15 · 08:15 · 09:00 · 11:00 · 16:15 REENTRADA · 18:00) + el hito cuyo
//   Day-After cae en ellas (NBME 29: 05:00 · hito 07:00-12:30 · 18:00 Day-After 1/6) + los días de cola de vídeo (07:15-07:45); todo dentro
//   de las franjas USMLE de la plantilla F3
for (const r of TG) {
  const th = trasHito(r);
  if (esHito(r)) { GUIA[r.fecha] = hitoNBME(r); continue; }
  const resto = [th && th.n === 1 ? dayAfter0715(r, th) : repaso0715(r), pretest(r), deepPrime(r), consolidacion(r), reentrada1615(r), eval18(r)].filter(Boolean);
  GUIA[r.fecha] = [anki0500(r, tieneAnkiRestante(resto)), ...resto]; // v6.10j: el Anki AM sabe si hoy hay «Anki restante» a las 07:15
}
for (const r of COLA_DIAS) GUIA[r.fecha] = [colaVideo0715(r)];
// v6.10f (revisión 18-nov · regla de Joseph del 17-nov: la estructura nace el día que aprende algo que va ahí): la CONFIGURACIÓN ya no crea submazos vacíos →
//   el PRIMER paso que manda tarjetas a cada submazo del plan (::Pathology el D2…) dice que ese submazo puede nacer ahí (el motor APEX lo crea con el
//   preset Default) y que, si es nuevo, recibe el preset del padre. Solo texto: franjas, pasos y minutos intactos. Condicional («si nace»): otro plan pudo
//   crearlo antes (la [TEST S1] del vibecoding va a ::Cardiology) y el Day-After de un NBME crea los de cada sistema (el sábado de F1 los repasa).
// v6.10i (auditoría del volcado c12 · submazos): la orden va al PRINCIPIO del «cómo» y corta («Si nace ::X: Deck Options de APEX::USMLE › Save to All
//   Subdecks · …»), dentro del corte de 110 del Calendar (en la v6.10h iba al final y el corte la quitaba: ::Pharmacology nacía el lun 28-dic sin preset y sin
//   sábado de F1 que lo arreglara) · también los submazos que nacen en el tramo 2 con las filas desplazadas (::Pulmonology, ::Nephrology…), que no tienen
//   sábado de Anki. El 1.er día con tarjetas del plan (D2) el preset de APEX::USMLE va además en el «Hecho» del bloque, y el detalle (APEX::USMLE nace con la
//   1.ª tarjeta si la [TEST S1] no lo creó; Save to All Subdecks incluye ::Cardiology) al final del «cómo», solo en la app.
{
  const filas = [...F1, ...TG].filter((r) => !esHito(r)).sort((x, y) => (x.fecha < y.fecha ? -1 : x.fecha > y.fecha ? 1 : 0));
  const decks = [...new Set(filas.map(espApex))];
  const pasoDe = (rx) => { for (const r of filas) { const g = (GUIA[r.fecha] || []).find((x) => x.pasos.some((p) => rx.test(p.que))); if (g) return { fe: r.fecha, g, p: g.pasos.find((y) => rx.test(y.que)) }; } return null; };
  const PRIMER_DIA_TARJETA = (pasoDe(/ESPECIALIDAD \w/) || {}).fe;
  for (const deck of decks) {
    const hit = pasoDe(new RegExp(`ESPECIALIDAD ${deck}\\b`));
    if (!hit) { if (F1_DECKS.includes(deck)) aborta(`submazo ::${deck}: ningún paso del F1 le manda tarjetas (F1_DECKS sin día)`); continue; }
    const { fe, g, p } = hit; const primero = fe === PRIMER_DIA_TARJETA;
    // v6.10i (remate, revisión adversarial del 18-nov): la orden dice CUÁNDO («Al cerrar»: Save to All Subdecks solo alcanza a los submazos que ya existen y el
    //   submazo nace con el envío de este paso); el 1.er día no es condicional (ese submazo nace hoy seguro: lo dice la frase final)
    // v6.10l (rev. c15, vetadas #26): si el paso es «Clasificar el error» (preguntas a fondo del nivel 0: D2, D4), «Clasifica: knowledge / transfer / unforced»
    //   va PRIMERO y la orden del preset detrás, corta («al cerrar: … Save to All Subdecks (Deck Options de APEX::USMLE)»): los dos dentro del corte de 110 del
    //   Calendar (antes la orden llenaba los 110 y quedaba «Clasifica: knowledge / …»); el «no conocía la palabra» sigue después. Los demás pasos, como antes.
    // v6.10m (rev. c16, diffs #19): la ruta «Deck Options de APEX::USMLE» vuelve a verse en el Calendar (en la v6.10l iba detrás, entre paréntesis, y el corte de
    //   110 la quitaba): el 1.er día (D2) «Clasifica: … · al cerrar: Deck Options de APEX::USMLE › preset «APEX USMLE» › Save to All Subdecks» (el corte deja ver
    //   hasta el preset y el «Hecho» del bloque dice «(Save to All Subdecks)»); los demás (D4), la lista sin el rótulo (el «qué» ya dice «Clasificar el error»)
    //   y «si nació ::X: Deck Options de APEX::USMLE › Save to All Subdecks», todo dentro de los 110
    const cl = /^(Clasifica: (knowledge \/ transfer \/ unforced)) \((«no conocía la palabra» = knowledge de vocabulario)\) · /.exec(p.como);
    // v6.10r (19-nov, verificación EN VIVO del chat USMLE): APEX::USMLE y sus submazos (APEX_USMLE_SUBMAZOS) YA EXISTEN, vacíos → el 1.er día ya no dice «Hoy nacen
    //   APEX::USMLE y ::X» ni que ::Cardiology nace con la [TEST S1] (antes, falso). v6.10u · v6.11: el preset lo pusieron en la CONFIGURACIÓN (CONF_DIA), no a las 05:00 del D2
    const finPrimero = !primero ? '' : APEX_USMLE_SUBMAZOS.includes(deck)
      ? ` APEX::USMLE y ::${deck} ya existen (vacíos) y tienen el preset desde ${CONF_MOV ? `las 05:00${fe === D2.fecha ? ' de hoy' : ` del ${fd(D2.fecha)}`}` : `la configuración del ${fd(CONF_DIA)}`}: la 1.ª tarjeta del plan va a ::${deck}; al cerrar, Save to All Subdecks lo repite en todos los submazos.`
      : ` Hoy nace ::${deck} con la 1.ª tarjeta del plan; al cerrar, Save to All Subdecks le pone el preset.`;
    p.como = cl
      ? `${primero ? `${cl[1]} · al cerrar: Deck Options de APEX::USMLE › preset «APEX USMLE» › ` : `${cl[2]} · si nació ::${deck}: Deck Options de APEX::USMLE › `}Save to All Subdecks · ${cl[3]} · ${p.como.slice(cl[0].length)}${finPrimero}`
      : `${primero ? 'Al cerrar' : `Al cerrar, si nació ::${deck}`}: Deck Options de APEX::USMLE › ${primero ? 'preset «APEX USMLE» › ' : ''}Save to All Subdecks · ${p.como}${finPrimero}`;
    if (primero) g.hecho = `${g.hecho} y el preset «APEX USMLE» en APEX::USMLE (Save to All Subdecks)`;
  }
}
// v6.10u (jue 19-nov-2026): con la [TEST S1] del vibecoding (paso 2 de S1: redeploy del parser n8n + 1 APEX de prueba) a las 04:15 del D2 (TEST_S1_MISMO_DIA)
//   → las tarjetas del D2 van por Ctrl+Shift+A (R_ENVIO) si el Publish salió verde; si no (o si el parser no da el toast ✓), DICTADAS al chat USMLE, que las escribe
//   en Anki (AnkiConnect) y en Obsidian. Lo dice el aviso del 1.er bloque que crea tarjetas APEX del D2 y de los 2 días de Step siguientes (D3 y D4: dependen del
//   arreglo del paso 3 si el redeploy salió rojo), delante de lo que ya dijera.
// v6.10y (lun 23-nov-2026): con el alias propio del vibecoding la [TEST S1] va el mié 25 REAL y el D2 el mar 24 → vuelve la ruta de la v6.10r para los días
//   ANTES del redeploy (antesRedeploy: el D2): cada tarjeta se DICTA al chat USMLE (Anki + Obsidian), sin Ctrl+Shift+A ni parser (el motor APEX corre aún el
//   parser viejo, que trunca los campos de varias líneas); los 2 primeros días de Step tras el redeploy (D3 y D4) llevan el aviso «si Ctrl+Shift+A no da el toast ✓».
{
  const dictar = 'díctale cada tarjeta al chat USMLE, que la escribe en Anki (AnkiConnect) y en Obsidian';
  const conRuta = (r) => GUIA[r.fecha].find((x) => x.pasos.some((p) => p.como.includes(R_ENVIO) || p.como.includes(mayus(R_ENVIO))));
  if (TEST_S1_MISMO_DIA && !DICTA_DIA_REDEPLOY) { // v6.12: con DICTA_DIA_REDEPLOY el día del redeploy también dicta (rama de abajo)
    const conTarjetas = F1.filter((r) => !esHito(r) && GUIA[r.fecha] && r.fecha >= D2.fecha).slice(0, 3);
    if (!conTarjetas.length || conTarjetas[0].fecha !== D2.fecha) aborta(`la [TEST S1] (${TEST_S1}) no es el día del D2 (${D2.fecha}): revisa la ruta de las tarjetas del D2`);
    for (const r of conTarjetas) {
      const g = conRuta(r);
      if (!g) aborta(`${etq(r)}: ningún bloque con tarjetas APEX para el aviso del redeploy`);
      g.aviso = (r.fecha === D2.fecha
        ? `Si el Publish de las 04:15 no salió verde (o Ctrl+Shift+A no da el toast ✓): ${dictar}.`
        : `Si Ctrl+Shift+A no da el toast ✓ (el redeploy del parser fue el ${fdTestS1()}): ${dictar}, como el ${fd(D2.fecha)}.`) + (g.aviso ? ` ${g.aviso}` : '');
    }
  } else {
    const dir = (r) => `dictada al chat USMLE: él la escribe en Anki (AnkiConnect → APEX::USMLE::${espApex(r)}) y en Obsidian; sin Ctrl+Shift+A ni parser (${redeployTxt(r)})`;
    const antes = [...F1, ...TG].filter((r) => !esHito(r) && antesRedeploy(r) && GUIA[r.fecha]);
    // c47 (mar 24-nov · vibecoding opción A: el redeploy pasa al jue 26 real y el D2 es el mié 25): regla general, TODO día de Step anterior al día real del
    //   redeploy (paso 2 de S1 por el alias propio del vibecoding) dicta sus tarjetas; el primero tiene que ser el D2 (antes: «solo el D2»)
    if (!antes.length || antes[0].fecha !== D2.fecha) aborta(`v6.10y: antes del redeploy del parser (${TEST_S1_REAL}) el primer día de Step tiene que ser el D2 (${D2.fecha}); van ${antes.map((x) => x.fecha).join(', ') || 'ninguno'}`);
    for (const r of antes) {
      for (const g of GUIA[r.fecha]) {
        let toca = false;
        for (const p of g.pasos) {
          const c0 = p.como;
          p.como = p.como.split(mayus(R_ENVIO)).join(`Cada tarjeta, ${dir(r)}`).split(R_ENVIO).join(`cada tarjeta, ${dir(r)}`)
            .replace(rCorrige(r), 'Si hay que corregir una, díctale el cambio al chat (lo aplica en Anki y en Obsidian)');
          if (p.como !== c0) toca = true;
        }
        // la 1.ª pasada de las 18:00 tampoco reescribe en Anki (desincronizaría la nota de Obsidian): la corrección se dicta. Fuera de `toca`: ese bloque no crea
        //   tarjetas APEX (el vocabulario, en su mazo propio, sigue en Anki escritorio) y no lleva el aviso de la ruta
        for (const p of g.pasos) p.como = p.como.replace(R_PASADA,
          'si una tarjeta no se entiende, díctale la corrección al chat USMLE (la aplica en Anki y en Obsidian; Anki es para retener, no para aprender)')
          .replace('si es una lista o un dato suelto, conviértela en mecanismo.', 'si es una lista o un dato suelto, díctale al chat la versión de mecanismo.');
        if (!toca) continue;
        // c47 (mar 24-nov, chats vibe y USMLE): el «Hecho» no pide el toast ✓ (hoy no hay parser): las confirma el chat USMLE, que las escribe. El Calendar corta
        //   el «Hecho» a 180: si no cabe, sale el «(Save to All Subdecks)» del preset (el paso lo dice entero)
        g.hecho = g.hecho.replace(/ confirmadas \(toast ✓\)/g, ' confirmadas por el chat USMLE (dictadas)');
        if (g.hecho.length > 180) g.hecho = g.hecho.replace(' (Save to All Subdecks)', '');
        if (g.hecho.length > 180) aborta(`${etq(r)} ${g.franja}: el «Hecho» dictado no cabe en los 180 del Calendar (${g.hecho.length})`);
        g.aviso = `Hoy cada tarjeta la DICTAS al chat USMLE y él la escribe en Anki (AnkiConnect) y en Obsidian: sin Ctrl+Shift+A, 1-TAP ni parser (${redeployTxt(r)}).${g.aviso ? ` ${g.aviso}` : ''}`;
      }
    }
    const tras = F1.filter((r) => !esHito(r) && !antesRedeploy(r) && GUIA[r.fecha]).slice(0, 2);
    for (const r of tras) {
      const g = conRuta(r);
      if (!g) aborta(`${etq(r)}: ningún bloque con tarjetas APEX para el aviso del redeploy`);
      g.aviso = `Si Ctrl+Shift+A no da el toast ✓ (el redeploy del parser fue el ${fdTestS1()}): ${dictar}, como el ${fd(D2.fecha)}.${g.aviso ? ` ${g.aviso}` : ''}`;
    }
  }
}
for (const r of [...TG, ...COLA_DIAS]) for (const g of GUIA[r.fecha]) if (!dentroF3(r, g)) ERR.push(`${etq(r)} ${r.fecha} ${g.franja} «${g.titulo}»: fuera de las franjas USMLE de la plantilla F3 (plantillasV6.ts › bloquesF3)`);
// v6.03b: el presupuesto de tarjetas nuevas de cada día de contenido no pasa del tope (Palmerton: la única palanca es crear menos)
for (const r of [...F1, ...TG]) if (!esHito(r) && presupuesto(r).total > AK.topeDia) ERR.push(`${etq(r)} ${r.fecha}: presupuesto de tarjetas ${presupuesto(r).total} > ${AK.topeDia}`);
if (ERR.length) aborta('bloques que no cuadran:\n  ' + ERR.join('\n  '));
const FECHAS = Object.keys(GUIA).sort();

// vídeos B&B de los capítulos de F1 sin día en F1 (constancia)
const CAPS_F1 = ['Pathology', 'Immunology', 'Cardiology', 'Pulmonary', 'Renal', 'Gastroenterology', 'Neurology'];
const usados = new Set(Object.values(MAPA).flatMap((m) => m.bb));
// v6.03: vídeos B&B de las filas de F1 DESPLAZADAS al tramo 2 que tienen mapeo en el catálogo (se ven en su fila T; no cuentan como «sin día»)
const DESPL_BB = T2_DESPL.filter((x) => MAPA[x.dOrig]).map((x) => `v5.20 D${x.dOrig} → T${x.t} ${fd(x.fecha)}: ${MAPA[x.dOrig].bb.map((id) => `${BB.get(id).cap} › ${BB.get(id).sec} › ${BB.get(id).nombre} (${mmss(BB.get(id).s)})`).join(' · ')}`);
const SIN_DIA = [...BB.entries()].filter(([id, v]) => (CAPS_F1.includes(v.cap) || (v.cap === 'Endocrinology' && v.sec !== 'Reproductive') || (v.cap === 'Hematology' && v.sec === 'Red Blood Cells')) && !usados.has(id)).map(([id, v]) => `${v.cap} › ${v.sec} › ${v.nombre} (${mmss(v.s)})`);
// escenario: si la velocidad se queda en 1,25× desde S4 (no sube a 1,5×), ¿cuánto vídeo queda al cerrar F1? · v6.10b: F1 acaba en el D13 (< D16, donde
//   empezaría el 1,5×) → en F1 la velocidad nunca pasa de 1,25×: el escenario es el reparto real (la cola al cierre de F1)
if (F1.some((r) => r.d >= 16)) aborta('v6.10b: F1 con filas desde el D16 (1,5×): recupera el cálculo del escenario 1,25× (residuo) antes de regenerar');
const ESC125 = { bbMin: minCola(COLA_F1.bb), palmMin: minCola(COLA_F1.palm) };
// v6.05: la cola al cierre de F1 (COLA_F1) y, para cada tramo, su destino en el tramo 2 (DONDE); la cola al cierre de la guía es siempre []
const fmtIt = (it) => (it.tipo === 'bb' ? `${bbRuta(it.id)} ${mmss(it.ini)}→${mmss(it.fin)} (${etqD(it.dOrig)})` : `Palmerton «${PALM[it.id].t}» ${hms(it.ini)}→${hms(it.fin)} (${etqD(it.dOrig)})`);
const finalPalm = COLA_F1.palm.map(fmtIt);
/** v6.10y (revisión): lo que la cola deja al cierre de F1 y adónde va, para reglaVideo (antes, fijo: «… va entero al tramo 2, como en la v6.09 … la cola al
 *  cierre de F1 es la misma», con bitácora) */
const colaF1Txt = (() => {
  const xs = [...COLA_F1.bb, ...COLA_F1.palm];
  if (!xs.length) return 'la cola se vacía en F1';
  const nom = (it) => (it.tipo === 'bb' ? bbRuta(it.id) : `«${PALM[it.id].t.split(/ (?:for|\|) /)[0]}»`) + (it.ini ? ` desde ${(it.tipo === 'bb' ? mmss : hms)(it.ini)}` : ' entero');
  const fs2 = DONDE.filter((x) => xs.some((it) => it.tipo === x.it.tipo && it.id === x.it.id && it.dOrig === x.it.dOrig && x.it.fin > it.ini && x.it.ini < it.fin)).map((x) => FECHA_D(x.d)).sort();
  return `lo que no cabe en F1 (${xs.map(nom).join(' y ')}) va al tramo 2 (${fd(fs2[0])} → ${fdA(fs2[fs2.length - 1])})`;
})();
const finalBB = COLA_F1.bb.map(fmtIt);

const META = {
  version: VER,
  generado: '2026-10-24',
  fuente: 'DATA/_scripts/usmle/gen_usmle_guia.js + guia_catalogo_f1.js · catálogos Qbankly del 18-oct-2026 (DATA/USMLE/qbankly_*.tsv)',
  dias: FECHAS.length,
  bloques: FECHAS.reduce((a, f) => a + GUIA[f].length, 0),
  velocidad: 'D2 1,0× con subtítulos EN · desde el D3 1,25× si el free recall del último vídeo recoge ≥3 ideas (si no, 1,0×) · desde S4 (D16) 1,5× con la misma condición (si no, 1,25×) · minutos reales = duración ÷ velocidad × 1,2 (D2, la configuración y los Palmerton de MÉTODO, siempre a 1,0×) / 1,15 (desde el D3) · F1: un vídeo no se parte si el resto sería < 3′ (se termina el mismo día)',
  reglaPreguntasS1: `F1 ${VER} en NIVEL 0-1 hasta el gate del 80 % (decisión de Joseph del 17-nov · DATA/USMLE/PALMERTON_NIVEL0_ARRANQUE.md §3 y §8.2 A1-A6): todo en Tutor y sin reloj. D2 (${fd(D2.fecha)}): 3 preguntas uWorld a fondo (una por hora, ≤45′ cada una con sus tarjetas) + validación con 5Q NUEVAS de Mehlman · D3-D4: 4 a fondo (45′) + validación (otro banco) + revalidación del subtema anterior · D5-D13: 2 bloques de 5Q del subtema (pre-test ciego y tras el deep prime) + validación de la misma sesión (Mehlman) + revalidación de 48 h / 5 días (uWorld) del anterior; gate = 80 % en 10 consecutivas (validación + revalidación). Sin eval cronometrada a las 18:00 (A4); N2 cronometrado solo en subtemas ya al 80 %. El NBME 25 (D8) es la primera línea base completa (con su Day-After) y el UWSA1 pasó al tramo 2 (T82, prueba de resistencia).`,
  reglaRespaldo: 'System con menos preguntas de las pedidas → (1) todas las Unused del System, (2) los Systems hermanos del catálogo, (3) el mismo subtema en «Mehlman - Step 1 QBank - 2026»; nunca preguntas fuera del tema.',
  reglaVideo: 'El vídeo del tema nuevo solo después de las preguntas ciegas (nivel 0: la página completa de las 10:15-10:45, ≤34′ reales; nivel 1: el deep prime, ≤70′ reales); lo que no cabe pasa a la cola y se ve, en orden y partido por minutos, en el «vídeo pendiente» de las 07:15 (≤28′), en la validación de 60′ del D2 (≤22′) o a las 18:00 (≤15′; no el D2 ni con Day-After); la cola no va al Anki de las 05:00. Palmerton de MÉTODO, a 1,0× con CC: ' + (CONF_MOV ? '«Anki Almost Broke Me…» (Anki + FSRS) entero con el manual FSRS el ' + fd(CONF_MOV.fecha) + ' ' + CONF_MOV.ini + '-' + CONF_MOV.fin + ' (el preset «APEX USMLE», delante en el Anki del D2, ' + fd(D2.fecha) + ' 05:00, porque la configuración del ' + fd(CONF_DIA) + ' no se hizo)' : '«Anki Almost Broke Me…» (Anki + FSRS) en la configuración (' + fd(CONF_DIA) + ', de 0:00 a ' + hms(CONF_REP[0].fin) + ') y su resto en el Anki del D2 (' + fd(D2.fecha) + ' 05:00; el FAQ, opcional)') + '; «The ONLY Video…» en el Anki del D2 (de 0:00 a ' + hms(PALM.BOtQJeFE_rc.corteD2) + ') y su resto en la cola; Palmerton High Yield entra a la cola detrás de los B&B; ' + colaF1Txt + ': nada se queda sin día.',
  reglaAnki: `Anki (método Palmerton + flujo APEX, ${METODO_MD}): preset «APEX USMLE» en APEX::USMLE y en todos sus submazos — FSRS ${AK.ret} · ${AK.nuevasDia} nuevas/día · ${AK.maxRev} repasos/día · repasos antes que nuevas · learning steps por defecto · día nuevo a las 4 h; Good ≈90 % / Again ≈10 %, sin Hard/Easy; tope de CREACIÓN ${AK.topeDia} tarjetas/día (deep prime ≤${AK.deepPrime} + errores de la consolidación y de la eval, o PC cards del Day-After) por APEX (Ctrl+Shift+A), frente «Subject - question» en inglés, «Summary:» con el porqué, sin cloze; ALARMA G (backlog > 100 o retención < 85 %) → 0 nuevas + 200 repasos/día hasta backlog < 20; «Optimize» FSRS del preset el ${fd(SAB_OPT)}.`,
  tarjetasPorDia: Object.fromEntries([...F1, ...TG].filter((r) => !esHito(r)).map((r) => { const b = presupuesto(r); return [etq(r), !r.t ? `${b.total} (a fondo ${b.aFondo} · validación ${b.val} · revalidación ${b.reval} · Day-After ${b.b0715 + b.da18} · deep prime ${b.dp} · bloque 2 ${b.con} · eval ${b.ev}; + vocabulario, en su mazo)` : `${b.total} (Day-After ${b.b0715 + b.da18} · deep prime ${b.dp} · consolidación ${b.con} · eval ${b.ev})`]; })),
  colaAlCierreF1: [...finalBB, ...finalPalm],
  /** v6.05: destino EXPLÍCITO (fecha + franja) de cada tramo de colaAlCierreF1 en el tramo 2 (verificar_v6.js lo comprueba contra los pasos) */
  colaAlCierreF1Destino: [...COLA_F1.bb, ...COLA_F1.palm].map((it) => `${fmtIt(it)} → ${destinoDe(it)}`),
  /** v6.05: filas del tramo 2 con guía (desplazadas de F1 + el hito cuyo Day-After cae en ellas), plantilla F3 */
  guiaTramo2: TG.map((r) => `${etq(r)} ${fd(r.fecha)}: ${esHito(r) ? `${nomHito(r)} + Day-After 1/6 (18:00)` : `v5.20 D${r.dOrig} · ${corto(txtSub(r), 60)}`} · ${GUIA[r.fecha].length} franjas`),
  /** v6.05: días de cola tras la última desplazada (vídeo pendiente 07:15-07:45) */
  // v6.08: la franja real del día de cola (F3: 07:15-07:45 · F4: inicio del bloque A 04:05-04:35; antes decía siempre 07:15-07:45)
  colaTramo2: COLA_DIAS.map((r) => `${etq(r)} ${fd(r.fecha)} ${r.fase === 'F4' ? '04:05–04:35' : '07:15–07:45'}: ${REP[r.d].s0715.map(fmtIt).join(' + ')}`),
  /** v6.05: lo que queda en la cola al cierre de la guía — SIEMPRE vacío (el generador aborta si no) */
  colaAlCierreTramo2: [...COLA_FINAL.bb, ...COLA_FINAL.palm].map(fmtIt),
  escenario125: `Si la velocidad se queda en 1,25× desde el D16: al cierre de F1 quedarían ≈${ESC125.bbMin}′ de B&B + ${ESC125.palmMin}′ de Palmerton en la cola (con 1,5×: ${COLA_F1.bb.reduce((a, it) => a + Math.round((it.fin - it.ini) / 60), 0)}′ + ${COLA_F1.palm.reduce((a, it) => a + Math.round((it.fin - it.ini) / 60), 0)}′), que se ven en el tramo 2: 07:15 y deep prime de las filas desplazadas y, si sobra, el «vídeo pendiente» 07:15-07:45 de las filas siguientes.`,
  diasConAviso: F1.filter((r) => MF1[r.d] && MF1[r.d].nota).map((r) => r.d),
  diasConAvisoTramo2: TG.filter((r) => MF1[r.d] && MF1[r.d].nota).map(etq),
  bbSinDiaF1: SIN_DIA,
  bbDesplazadasTramo2: DESPL_BB,
  /** v6.08: trozos del Day-After de un hito de F3 que caen en una fila de F4 (sin franja de 18:00): sin guía → DECISIÓN DE JOSEPH (avisado en el
   *  hito y en el último trozo con franja). verificar_v6.js comprueba que cada trozo tiene franja o está aquí. */
  dayAfterSinFranja: TG.filter(esHito).flatMap((h) => daEnF4(h).map((o) => `${nomHito(h)} ${o.partes.split(' (')[0]} → ${etq(o.x)} ${fd(o.x.fecha)} (F4)`)),
};
if (ERR.length) aborta('destinos de vídeo que no cuadran:\n  ' + ERR.join('\n  ')); // v6.05: destinoDe() de colaAlCierreF1Destino
if (META.colaAlCierreTramo2.length) aborta('la cola de vídeo no queda vacía: ' + META.colaAlCierreTramo2.join(' · '));

// ── 5) SALIDA (cadenas internadas: cada texto repetido se guarda una vez en S[]; los bloques son tuplas de índices) ─────────────
const S_ = []; const SIX = new Map();
const si = (s) => { if (s == null) return -1; if (!SIX.has(s)) { SIX.set(s, S_.length); S_.push(s); } return SIX.get(s); };
// tupla: [franja, titulo, totalMin, pasos[[min, que, como, enlaceT, enlaceUrl]], recursos[[t, url, min, cantidad]], hecho, planB, aviso]
const tupla = (g) => [si(g.franja), si(g.titulo), g.totalMin,
  g.pasos.map((p) => (p.enlace ? [p.min, si(p.que), si(p.como), si(p.enlace.t), si(p.enlace.url)] : [p.min, si(p.que), si(p.como)])),
  g.recursos.map((r) => (r.cantidad != null ? [si(r.t), si(r.url), r.min ?? -1, si(r.cantidad)] : r.min != null ? [si(r.t), si(r.url), r.min] : [si(r.t), si(r.url)])),
  si(g.hecho), si(g.planB), si(g.aviso)];
const DATOS = FECHAS.map((f) => [f, GUIA[f].map(tupla)]);
const cab = `/**
 * usmleGuia.ts — GUÍA «qué · cuánto · cómo» de CADA franja del Step 1 en F1 (${fd(CONF_DIA)} configuración${CONF_MOV ? ` (no hecha: preset en el D2 · vídeo FSRS + manual el ${fd(CONF_MOV.fecha)})` : ''} · ${fd(D2.fecha)} → ${fd(F1[F1.length - 1].fecha)}-${F1[F1.length - 1].fecha.slice(0, 4)} + los fines de semana) y de las
 * filas de F1 desplazadas al tramo 2 (${TG.length ? `${etq(TG[0])} ${fd(TG[0].fecha)} → ${etq(TG[TG.length - 1])} ${fd(TG[TG.length - 1].fecha)}` : '—'}${COLA_DIAS.length ? ` + cola de vídeo ${etq(COLA_DIAS[0])}-${etq(COLA_DIAS[COLA_DIAS.length - 1])}${COLA_DIAS.some((r) => r.fase === 'F4') ? ' en el bloque A de F4' : ''}` : ''}, plantilla F3), en el
 * formato común \`GuiaBloque\` (src/lib/guia.ts). Lo pintan UsmleTodayPlan (📋 HOY → 🧭 Guía del día) y la tarjeta USMLE del Home.
 * GENERADO por DATA/_scripts/usmle/gen_usmle_guia.js (mapeo: guia_catalogo_f1.js) — NO editar a mano:
 *   node DATA/_scripts/usmle/gen_usmle_guia.js            (escribe) · --check (compara) · --informe <ruta.md>
 * Lee las filas REALES de usmleStep1Daily.ts (no cambia fechas, D#, hitos ni niveles de la ${VER}) y los catálogos verificados el
 * 18-oct-2026: B&B Step 1 (491 vídeos con duración), Test Composer de uWorld (13 Subjects · 169 Systems · matriz Subject × System),
 * Mehlman (respaldo), UWSA/NBME (bloques reales) y la Library de Qbankly (uWorld Medical Library · PassMedicine).
 * Reglas: ${META.velocidad}.
 *   ${META.reglaPreguntasS1}
 *   ${META.reglaRespaldo}
 *   ${META.reglaVideo}
 *   ${META.reglaAnki}
 * Avisos visibles (mapeo plan → catálogo no exacto): D${META.diasConAviso.join(', D')}${META.diasConAvisoTramo2.length ? ` · tramo 2: ${META.diasConAvisoTramo2.join(', ')}` : ''}.
 * v6.02c (18-oct-2026, E1): nuevo.
 * v6.02c F2 (18-oct-2026, hallazgos E6): lun 19 · los 2 Palmerton de método (FSRS · «The ONLY video») con la regla de minutos de la semana 1
 *   (duración × 1,2 a 1,0×) y repartidos sin recortar (lo que no cabe → cabeza de la cola: D3 05:00) · la preparación del UWSA1 se parte en
 *   07:15-07:25 y 07:55-08:50 (el SYNAPSE de las 07:25 sale una sola vez, en su tarjeta) · capítulos B&B exactamente como en el catálogo (sin «(NEW)»).
 * v6.03 (20-oct-2026): D1 = mié 21-oct (lun 19 y mar 20 sin estudio) · F1 = 50 filas · mismo guion por D# con las fechas derivadas de las
 *   filas (D1 UWSA1 mié 21 · D2 jue 22 · D3 vie 23 · sáb 24 / dom 25 solo Anki · D4 lun 26 · D5 mar 27) · catálogo por el origen v5.20 de cada d.
 * v6.03b (20-oct-2026): método Anki · APEX dentro de los pasos (mismas franjas y minutos): D1 05:00 con los ajustes exactos (9999 repasos/día,
 *   no 200) · Anki AM con vencidas sin tope + Good/Again + telemetría · tope de creación ${AK.topeDia}/día repartido por bloque con la cabecera APEX
 *   del día · sábado con «Save to All Subdecks» (+ Optimize FSRS el ${fd(SAB_OPT)}) · ${METODO_MD}.
 * v6.05 (24-oct-2026): D1 = lun 26-oct (la semana del 19 sin estudio) · F1 = 47 filas · mismo guion por D# (D1 UWSA1 lun 26 · D2 mar 27 ·
 *   D3 mié 28 · D4 jue 29 · D5 vie 30 · sáb 31-oct / dom 1-nov solo Anki) · v5.20 D47-D51 → bbDesplazadasTramo2 · lo que no cabe en el D46
 *   (último día de contenido) queda en colaAlCierreF1 y su aviso lo manda al tramo 2: nada se recorta.
 * v6.05b (24-oct-2026): la cola al cierre de F1 con destino explícito en el tramo 2 (colaAlCierreF1Destino) · guía de las filas desplazadas de
 *   F1 en su fecha T con el mismo guion por D# + 16:15 REENTRADA y el NBME 29 con su Day-After (guiaTramo2) · días de cola de vídeo 07:15-07:45
 *   (colaTramo2) · colaAlCierreTramo2 = [] siempre.
 * v6.06 (31-oct-2026): D1 = lun 2-nov (la semana del 26-oct sin estudio) · F1 = 42 filas · mismo guion por D# (D1 UWSA1 lun 2 · D2 mar 3 ·
 *   D3 mié 4 · D4 jue 5 · D5 vie 6-nov · sáb 7 / dom 8-nov solo Anki) · NBME 27 = D35 vie 18-dic (Day-After D36-D39, antes del NBME 28) ·
 *   16 desplazadas con guía en T3-T18 · cola de vídeo del cierre de F1 → T4-T5 · días de cola T19-T23 · nada se recorta.
 * v6.07 (8-nov-2026): F1 del Step = solo las mañanas de mar · jue (D1-D15, UWSA1 mar 10-nov · NBME 25 D10 jue 10-dic) · días de F1 sin Step =
 *   ANKI AM 05:00-05:30 · desplazadas de F3 con guía por franja; las de F4, sin guía (plantilla por turno).
 * v6.08 (14-nov-2026): D1 de todo = lun 16-nov · F1 del Step = ${F1.length} filas (${fd(F1[0].fecha)} → ${fd(F1[F1.length - 1].fecha)}) · mismo guion por D# · Day-After de un hito
 *   de F3 que llega a F4 (sin franja de 18:00): avisado como DECISIÓN DE JOSEPH (META.dayAfterSinFranja: ${META.dayAfterSinFranja.join(' · ') || '—'}).
 * v6.09 · lote 1 (17-nov-2026, auditoría tiempo ↔ material; solo F1, el tramo 2 queda igual): Anki AM USMLE 05:00-05:30 mar · jue y 05:00-05:20 lun · mié ·
 *   vie + jue 31-dic (contrato con encapsManana: el resto de 05:00-05:45 es ENCAPS) · la cola de vídeo nunca a las 05:00 · 1,25× desde el D3 · un vídeo
 *   no se parte si el resto sería < 3′ · consolidación N1 15Q Tutor / N2 25Q TIMED (las 5Q que faltan → eval de las 18:00 o 07:15 del siguiente día de
 *   Step) · triaje del UWSA1: 15 incorrectas el mié 18-nov 05:00 + 28 el D2.
 * v6.10b (17-nov-2026, decisión 4 de Joseph — PALMERTON_NIVEL0_ARRANQUE §3 y §8.2 A1-A6): el UWSA1 sale de F1 (→ tramo 2, T82) y su Day-After desaparece de
 *   F1 · F1 = D2-D13 en NIVEL 0-1 (Tutor, sin reloj, hasta el gate del 80 %): D2 ${fd(D2.fecha)} = 3 preguntas uWorld a fondo (una por hora) + página
 *   completa + validación con 5Q de Mehlman + 18:00 Anki/vocabulario/nota · D3-D4 = 4 a fondo + revalidación + validación · D5-D13 = 2 bloques de 5Q +
 *   deep prime + validación (Mehlman) + revalidación de 48 h / 5 días (uWorld) · la configuración de Anki, el ${fd(CONF_DIA)}${CONF_MOV ? ` (no hecha: el preset, delante en el Anki del D2; el vídeo FSRS + el manual, el ${fd(CONF_MOV.fecha)} ${CONF_MOV.ini})` : ''} · el NBME 25 (D8) con su
 *   Day-After como estaba · el tramo 2 (2027) con la misma guía.
 */
import type { GuiaBloque } from './guia';
import { franjaDentro } from './guia';

export const GUIA_USMLE_META = ${JSON.stringify(META, null, 2)} as const;

/** Textos internados (cada cadena repetida se guarda una vez). */
const S: string[] = ${JSON.stringify(S_)};
/** [franja, titulo, totalMin, pasos [min, que, como, enlaceT?, enlaceUrl?][], recursos [t, url, min?(-1 = sin dato), cantidad?][], hecho, planB, aviso] (-1 = no hay) */
type BloqueT = [number, number, number, number[][], number[][], number, number, number];
/** fecha (AAAA-MM-DD) → bloques del día (tuplas de índices de S) en orden de franja. */
const D: Record<string, BloqueT[]> = {
${DATOS.map(([f, bs]) => `  ${JSON.stringify(f)}: ${JSON.stringify(bs)},`).join('\n')}
};
const s = (i: number | undefined): string => (i == null || i < 0 ? '' : S[i] ?? '');
const n = (i: number | undefined): number => (i == null ? -1 : i);
function decodificar(b: BloqueT): GuiaBloque {
  const g: GuiaBloque = {
    franja: s(b[0]), plan: 'usmle', titulo: s(b[1]), totalMin: b[2],
    pasos: b[3].map((p) => (p.length >= 5 ? { min: n(p[0]), que: s(p[1]), como: s(p[2]), enlace: { t: s(p[3]), url: s(p[4]) } } : { min: n(p[0]), que: s(p[1]), como: s(p[2]) })),
    recursos: b[4].map((r) => ({ t: s(r[0]), url: s(r[1]), ...(n(r[2]) >= 0 ? { min: n(r[2]) } : {}), ...(n(r[3]) >= 0 ? { cantidad: s(r[3]) } : {}) })),
    hecho: s(b[5]),
  };
  if (b[6] >= 0) g.planB = s(b[6]);
  if (b[7] >= 0) g.aviso = s(b[7]);
  return g;
}
const CACHE = new Map<string, GuiaBloque[]>();
/** Fechas con guía (orden). */
export const GUIA_USMLE_FECHAS: string[] = Object.keys(D);
/** Bloques de la guía USMLE de esa fecha ([] si no hay). */
export function guiaUsmleDe(fecha: string): GuiaBloque[] {
  const c = CACHE.get(fecha); if (c) return c;
  const bs = D[fecha]; if (!bs) return [];
  const out = bs.map(decodificar); CACHE.set(fecha, out); return out;
}
/** Bloques cuya franja EMPIEZA en [ini, fin) — p. ej. el bloque principal del Home 07:00–12:00 agrupa 07:15 · 08:15 · 09:00 · 11:00. */
export function guiaUsmleEnRango(fecha: string, ini: string, fin: string): GuiaBloque[] {
  return guiaUsmleDe(fecha).filter((g) => franjaDentro(g.franja, ini, fin));
}
/** Bloque USMLE a HORA FIJA de un sábado o domingo de F1 (fecha → ini, fin, nombre y detalle; las fechas del texto son de PLAN: plantillasV6 las pasa a su día
 *  real; lo pinta como bloque propio anki-fsrs y su guía es la de esa franja): «Anki Almost Broke Me…» entero + el manual FSRS de una configuración que no se
 *  hizo (_fechas_v6.json › corrida_s1.config_anki). Sin entradas si la configuración se hizo. */
export const USMLE_FIJO: Record<string, { ini: string; fin: string; nombre: string; detalle: string }> = ${JSON.stringify(CONF_MOV ? { [CONF_MOV.fecha]: { ini: CONF_MOV.ini, fin: CONF_MOV.fin, nombre: `USMLE · ANKI: vídeo FSRS + manual (${CONF_MOV.min}′, de la configuración del ${fd(CONF_DIA)})`, detalle: `«Anki Almost Broke Me…» entero (${hms(PALM.Te5RnxeG_Gg.s)}) + el manual FSRS · el preset, puesto el ${fd(D2.fecha)} a las 05:00` } } : {})};
`;
if (CHECK) {
  const act = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (act !== cab) { console.error('✗ src/lib/usmleGuia.ts NO coincide con el generador (node DATA/_scripts/usmle/gen_usmle_guia.js)'); process.exit(1); }
  console.log(`✓ usmleGuia.ts al día · ${META.dias} fechas · ${META.bloques} bloques · todos cuadran (Σ pasos = franja)`);
} else {
  fs.writeFileSync(OUT, cab);
  console.log(`✓ escrito ${path.relative(ROOT, OUT)} · ${META.dias} fechas · ${META.bloques} bloques · ${(cab.length / 1024).toFixed(0)} KB · cola al cierre de F1: ${META.colaAlCierreF1.join(' · ') || 'vacía'}`);
  console.log('  ' + META.escenario125);
}

// ── 6) INFORME (tabla de la semana 1 + reparto de F1) ───────────────────────────────────────────────────────────────────────────
if (INFORME) {
  const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
  const L = [];
  const D5F = (F1.find((x) => x.d === 5) || F1[F1.length - 1]).fecha;
  L.push(`## Tabla final · arranque USMLE en nivel 0-1 (configuración ${fd(CONF_DIA)} · D2-D5: ${fd(D2.fecha)} → ${fd(D5F)}-${D5F.slice(0, 4)})`, '', '| Día | Franja | Bloque | Qué · cuánto (pasos con minutos) | Cómo (resumen) | Enlace |', '|---|---|---|---|---|---|');
  for (const f of FECHAS.filter((x) => x <= D5F)) for (const g of GUIA[f]) {
    L.push(`| ${fd(f)} | ${g.franja} (${g.totalMin}′) | ${esc(g.titulo)} | ${g.pasos.map((p) => `**${p.min}′** ${esc(p.que)}`).join('<br>')} | ${g.pasos.map((p) => esc(p.como)).join('<br>')} | ${[...new Set(g.pasos.filter((p) => p.enlace).map((p) => `[${esc(p.enlace.t)}](${p.enlace.url})`))].join('<br>') || '—'} |`);
    if (g.aviso) L.push(`| | | ⚠ aviso | ${esc(g.aviso)} | | |`);
  }
  L.push('', '## Reparto de vídeo F1 (minutos reales por franja; P = Palmerton)', '', '| D | Fecha | v | 05:00 | 07:15 | pág. completa / 09:00 | 11:00 | 18:00 | cola tras el día |', '|---|---|---|---|---|---|---|---|---|');
  const fx = (a) => a.map((x) => `${x.tipo === 'bb' ? BB.get(x.id).nombre.replace(/^\d+ - /, '') : 'P·' + PALM[x.id].t.slice(0, 22)}${x.ini || x.fin !== (x.tipo === 'bb' ? BB.get(x.id).s : PALM[x.id].s) ? ` [${mmss(x.ini)}-${mmss(x.fin)}]` : ''} ${x.min}′`).join(' · ') || '—';
  for (const r of F1) { const p = REP[r.d]; L.push(p ? `| D${r.d} | ${fd(r.fecha)} | ${vel(r.d).v} | ${esc(fx(p.s0500))} | ${esc(fx(p.s0715))} | ${esc(fx([...(p.spc || []), ...p.s0900]))} | ${esc(fx(p.s1100 || []))} | ${esc(fx(p.s1800 || []))} | ${p.colaTras.bbMin}′ B&B + ${p.colaTras.palmMin}′ P |` : `| D${r.d} | ${fd(r.fecha)} | — | HITO | ${esc(r.sub)} | | |`); }
  L.push('', `Cola al cierre de F1: ${META.colaAlCierreF1.join(' · ') || 'vacía'}. ${META.escenario125}`);
  L.push('', '## uWorld: días con preguntas previsiblemente justas (aviso en el pre-test)', '');
  for (const r of F1) { const q = QS[r.d]; if (q && q.deficit) L.push(`- D${r.d} ${fd(r.fecha)} · ${MF1[r.d].uw.map(uwNom).join(' + ')}: ~${q.dispAntes} Unused antes del día para ${q.dispAntes + q.deficit} → respaldo Mehlman ${(MF1[r.d].mh || []).map(mhNom).join(' + ')}`); }
  L.push('', '## Vídeos B&B de los capítulos de F1 que no caen en ningún día de F1', '', ...SIN_DIA.map((x) => `- ${x}`));
  fs.writeFileSync(INFORME, L.join('\n') + '\n');
  console.log('✓ informe → ' + INFORME);
}
