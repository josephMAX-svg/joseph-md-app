/**
 * gen_guia_lectura.js — genera DATA/MIR/guia_lectura_semana1-2.json (nombre histórico: desde v6.03 cubre D1-D76): QUÉ leer, CUÁNTO y CÓMO
 * en el bloque MIR 15:15–16:15 de los 76 días-tema del plan (v6.08: lun 16-nov-2026 → jue 4-mar-2027; v6.07: lun 9-nov → jue 25-feb; v6.06: lun 2-nov → jue 18-feb; v6.05: lun 26-oct → jue 11-feb; v6.03: mié 21-oct → lun 8-feb) y en el slot ProMIR de Derma (d3)
 * + plan B de lectura Derma d1-d3, a partir de la
 * MEDICIÓN REAL de los capítulos ProMIR (medicion_promir_2026-10-18/<capId>.json, hecha con analiza_cap.js en el Chrome de Joseph,
 * solo lectura, sin iniciar tests) y de los planes de la app (mirDailyPlan · mirPreguntasOficiales · dermaDailyPlan · ankiLinks).
 *
 *   Uso:  node DATA/MIR/guia_lectura/gen_guia_lectura.js            (escribe el JSON)
 *         node DATA/MIR/guia_lectura/gen_guia_lectura.js --check    (comprueba que el JSON del repo está al día y que cada bloque suma 60′)
 *
 * Bitácora
 *  · v6.02c (18-oct-2026 · Joseph: «QUÉ leer, CUÁNTO leer, CÓMO leer — no puede estar al azar»): primera versión. Método en `_meta.metodo`.
 *    Formato de cada bloque = GuiaBloque (src/lib/guia.ts, lo crea E1): { franja, plan, titulo, totalMin, pasos[{min, que, como, enlace?}],
 *    recursos[{t, url, min?, cantidad?}], hecho, planB? } + campos extra de datos (`preguntas`, `secciones`) que la UI puede ignorar.
 *    Nada inventado: palabras, secciones, figuras, tablas, vídeos y citas MIR salen de la medición; las páginas no se dan (ProMIR no
 *    pagina); el texto de «Orientación MIR» de ProMIR NO se copia (repo público): `enfasis` es un resumen propio de 1-2 líneas.
 *  · v6.02c F2 (18-oct-2026, hallazgos E6): D1 15:23 «5Q CIEGAS extra» con enlace directo (la 1.ª en el paso + las 5 en los recursos) ·
 *    test ProMIR del d3 de Derma: «(2Q más solo si te sobra tiempo)» en vez de «(10Q solo si el caso de 13:36 terminó antes)» (el plan B
 *    no tiene caso y en el plan A el caso no es a las 13:36).
 *  · v6.03 (20-oct-2026 · corrimiento D1 = mié 21-oct + MEDICIÓN COMPLETA): la medición ProMIR cubre ya los 76 capítulos del plan (66 medidos
 *    el 20-oct con la sesión de Joseph y el mismo analiza_cap.js; el texto del recuadro «Orientación MIR» se retiró de los JSON al versionar:
 *    repo público) → la guía MEDIDA pasa de D1-D10 a D1-D76 (D77 mini-MIR y D78 corrección no leen capítulo: siguen en mirGuia.ts). Método:
 *    (1) se reserva el pool de la app de los 76 capítulos ANTES de repartir (ningún quiz usa la versión ProMIR de un pre-test futuro);
 *    (2) TEST DE CIERRE = pool de la app sin usar y, si no llega a 10 (con los 76 capítulos reservados: Gastroenterología 0 · Hematología 5 ·
 *    Reumatología 8 · Endocrino, Nefro y Pediatría 9), se completa con preguntas MIR citadas en los capítulos del bloque recién cerrado y no
 *    usadas (≥2015 primero, más recientes primero); (3) quiz corto (capítulo con pocas citadas): se completa con citadas no usadas de los
 *    capítulos YA leídos de la misma asignatura (interleaving del bloque), y si aun así no llega, del bloque anterior; (4) `enfasis`: los 11
 *    resúmenes propios se conservan y el resto se DERIVA de la medición (las 3 secciones con más preguntas citadas; ningún texto de ProMIR);
 *    (5) Derma: las sesiones de las semanas 1-2 se toman por d (d1-d5), no por fechas cableadas (19-30 oct). Fechas = mirDailyPlan (v6.03).
 *  · v6.05 (24-oct-2026 · corrimiento D1 = lun 26-oct; del 19 al 25-oct sin estudio): solo cambian las FECHAS (mirDailyPlan D1 lun 26-oct → D76 jue
 *    11-feb · dermaDailyPlan d1-d5 mar 27-oct → vie 6-nov); medición, reparto de preguntas y bloques idénticos (mismos 76 capítulos, mismo orden).
 *  · v6.06 (31-oct-2026 · corrimiento D1 = lun 2-nov; la semana lun 26 → vie 30-oct sin estudio): solo cambian las FECHAS (mirDailyPlan D1 lun 2-nov →
 *    D76 jue 18-feb · dermaDailyPlan d1-d5 lun 2 → jue 12-nov); medición, reparto de preguntas y bloques idénticos (mismos 76 capítulos, mismo orden).
 *  · v6.08 (14-nov-2026 · re-fecha D1 = lun 16-nov; la semana del lun 9-nov sin estudio): solo cambian las FECHAS (mirDailyPlan D1 lun 16-nov →
 *    D76 jue 4-mar · dermaDailyPlan d1-d5 lun 16 → jue 26-nov); medición, reparto de preguntas y bloques idénticos (mismos 76 capítulos, mismo orden).
 *  · v6.09 (16-nov-2026 · D1 = mar 17-nov; el lun 16 no se estudió y el jue 31-dic pasa a hábil): solo cambian las FECHAS de F1 (mirDailyPlan D1 mar
 *    17-nov → D32 jue 31-dic, desde D33 lun 4-ene igual que la v6.08: D76 jue 4-mar · dermaDailyPlan d1-d5 mié 18-nov → lun 30-nov); medición, reparto de
 *    preguntas y bloques idénticos (mismos 76 capítulos, mismo orden).
 *  · v6.09 · lote 1 (17-nov-2026 · auditoría tiempo ↔ material a2-7): el paso de las 15:53 pasa de «8Q comentadas (máx. 10)» a «6Q comentadas (máx. 8)»
 *    (77 s + 30 s de comentario = 107 s/Q: 6Q ≈ 10,7′ en 12′; 8Q eran 14,3′). Solo cambia el TEXTO del paso y del «hecho» (QUIZ_HACER): la lista del quiz
 *    (8-10Q), su reparto con las anclas y las preguntas de todos los días quedan idénticos; las de la lista que no entran siguen en la cola del capítulo.
 *    Aplica a los 76 días-tema (también los de 2027: es el mismo texto).
 *  · v6.09b · lote 1-ter (17-nov-2026 · revisión R del lote 1-bis: 53 pasos MIR de F1 fuera de 0,85-1,15): SOLO F1 desde el D2 (mié 18-nov → jue 31-dic; el D1
 *    —en curso— y 2027 quedan idénticos): eval anclada de 4Q 7′ → 6′ (su cronómetro; 4 × 77 s = 5,1′ → 0,86) con el minuto al Anki (5′ → 6′) · pre-test 5Q
 *    8′ → 7′ (6,4′ → 0,92) con el minuto a la LECTURA DIRIGIDA (15′ → 16′, las mismas secciones): a 150 palabras/min —la regla fija de lectura en español—
 *    suman 15,5-18,1′ con el recuadro (a 15′, 5 días quedaban por encima de 1,15; a 16′, todos en 0,97-1,13) y el paso lo declara «(N′ medidos a 150
 *    palabras/min; M′ a 180)». --check valida esas razones en F1 y que fuera de F1 no cambia nada. Preguntas, secciones y reparto: idénticos.
 *  · v6.09b · lote 1-quater (17-nov-2026 · revisión R2 del lote 1-ter): las evals de 2-3Q de F1 (D2 mié 18 · D3 jue 19 · D6 mar 24 · D7 mié 25-nov) dejaban
 *    «los N′ que sobran, adelanta el Anki» (la eval sola a 0,37-0,55): sus 7′ son ahora 4Q COMENTADAS (77 s + 30 s = 107 s/Q → 7,1′ → 1,02) = las ancladas
 *    + (4 − nQ) de la cola del quiz del D-1 (la 7.ª-10.ª de su lista, ya en el plan; en preguntas.eval como slot «cola D-1»); el quiz que cede (D2, D5, D6;
 *    el D1 —en curso— no se toca) lo anuncia al principio de su «cómo» con la fecha. Anki 5′ y log 3′ (aciertos/4) sin cambio. Derma: el plan B de lectura
 *    d1-d3 lleva además `min150` (los mismos apartados a 150 palabras/min, la regla fija en español). --check exige la cola en toda eval de < 4Q de F1 y
 *    que ningún paso de F1 deje minutos «que sobran». 2027 idéntico (no tiene evals de < 4Q).
 *  · v6.10 · tanda C (17-nov-2026 · DECIDIDO CON JOSEPH en el chat MIR, 06:25 y 08:15): (C) el D1 (mié 18-nov) sale de pasosD1 con su reloj — pre-test 8′ ·
 *    orientación 3′ · lectura de base 26′ en orden y entera (+ el §9 con lo que sobra) · quiz 6-8Q (máx. 10) 13′ · ≤4 APEX 7′ · repaso en blanco + las 4
 *    tarjetas de Ravi del ensayo clínico 3′ —, sin ARRANQUE de Anki y con las «5Q ciegas extra» como RESERVA opcional (la eval del D2 las usa si la cola
 *    del quiz se agota); (D) el pre-test de TODOS los días dice que la sección de cada pregunta se mira DESPUÉS de contestar (antes, «la guía dice en qué
 *    sección cae»: con la lista de lectura delataba la clave). Derma d1 (corrección de hecho, ProMIR en vivo): §2.1-2.2 = 24 figuras, no 11 (FIGS_VERIFICADAS).
 *  · v6.10 · base cero (18-nov-2026 · Joseph: «todos estamos partiendo de CERO»): fases de metodo_ravimedtest.json (faseDe). Mismas secciones, preguntas y
 *    minutos; cambia el texto: (1) F1 (D2-D32) pre-test = LÍNEA BASE como el D1 («contesta las 5 aunque adivines»; la regla del blanco va en la eval y el
 *    quiz) y la lectura = LECTURA DE BASE «en orden y entera»; (2) en toda la 1.ª vuelta (D2-D76) ninguna sección se salta por acertar el pre-test (antes
 *    «las secciones cuyas preguntas acertaste se saltan y entra la reserva»; la reserva solo si sobra tiempo); (3) fase 2 (D33-D76): el pre-test ya lleva
 *    la regla del blanco. El nivel del comentario del quiz y el criterio APEX por fase los mete mirGuia.metodoRavi.
 *  · v6.10 · base cero · fix 18-nov (revisión de los frentes: 12 de 32 días de F1 leían «PARCIAL: solo los párrafos con chip MIR ≥2015» bajo un paso que
 *    prometía «cada apartado entero» y la reserva iba por peso bajo «sigue en orden»): (1) F1 D2-D32 = elegirLecturaBase: solo secciones ENTERAS (la que no
 *    cabe se salta y entra la siguiente entera que quepa), mismo presupuesto de 14′ a 180 palabras/min y el paso de 16′ en 0,85-1,15 a 150; (2) reserva en el
 *    orden del capítulo en los 76 días (mismas 3 secciones); (3) el «cómo» de la lectura de base EMPIEZA con la cobertura del día («Hoy lees X′ de los Y′
 *    del capítulo (P %)») y el destino del resto con fecha (2.ª vuelta, tras el handoff del vie 3-dic-2027 = MIR_MANT_META.fin; antes «oct-2027», que ya
 *    no era), y dice que la lista es una selección por preguntas citadas (tensión con Ravi declarada); (4) el reparto de F1 se REHACE con la lectura nueva
 *    (corregido en la v6.10e: aquí se decía «el mismo conjunto de preguntas», y no lo era: cambiaron ids en 24 días de F1 —D6-D11, D13-D16, D18, D20-D32—,
 *    incluidos los cierres del D23 y del D31) y, para que 2027 no cambie en cascada, hay un PASE 1 (--pase1, reparto de siempre) cuyo consumo veta: F1 no
 *    toma lo que usa 2027 y 2027 no toma lo que usaba F1 → en 2027 solo cambian las anclas D-1/D-3/D-7 que vienen de días de F1 (evals de D33, D35, D36 y
 *    D39); (5) --check exige 0 PARCIAL en F1, secciones y reserva en orden y la cobertura declarada. El D1 conserva su lista (decidida con Joseph) y gana
 *    la cobertura al principio del «cómo». Fase 2: el «cómo» ya no dice «cada apartado entero» cuando hay un PARCIAL.
 *  · v6.10e (18-nov-2026 · revisión adversarial del fix de base cero; mismas horas, fechas y minutos): (1) mir-1: ninguna citada ProMIR cuyo equivalente
 *    del pool oficial esté ANULADO o con la clave en duda (noServible) entra en ningún reparto, también en el pase 1 (salen la 2025-208 del cierre del D31,
 *    la 2024-208 del quiz del D7 y la 2025-013 y la 2025-050 de los pre-tests del D46 y del D57; --check: 0 no servibles en el plan); (2) regresiones-1: en la
 *    lectura de base de F1 las 6 primeras del quiz son de lo leído (pool oficial o citadas de las secciones de hoy y, si faltan, repaso de capítulos ya
 *    leídos) y lo del pool de secciones que hoy no se leen va al final (la lista pasa de 10 a 11-13 en D6, D17, D19, D21, D24, D27, D29, D31 y D32; las
 *    que no se hacen siguen en la cola del capítulo); (3) mir-7 / dias-1920-2: la cobertura va a 150 palabras/min (la unidad del paso: el mismo número que
 *    el «qué»), el resto se nombra (sus secciones; los clips del capítulo aparte: D31 «+ 19,9′ de vídeos») y el D1 separa lo fijo (19′) del §9 opcional
 *    (6,5′), que si no entra va con el resto; (4) regresiones-3: «resto → 2.ª vuelta MIR (tras el vie 3-dic-2027)» antes del carácter 100 del «cómo» (el
 *    Calendar lo corta a 110) y la descripción de la lista detrás de la lista en el «qué»; (5) mir-6: con lo que sobra, solo lo de la reserva que cabe
 *    ENTERO (en F1 no cabe nada: repaso en blanco de lo leído); (6) mir-3: los textos dicen lo que hace el código («las secciones más citadas que caben
 *    ENTERAS en 14′»). Respecto a 3bc2773 cambian ids u orden en 37 días (D6-D15, D17-D25, D27-D36, D38, D39, D46, D47, D57, D58, D60 y D64);
 *    respecto a 9294884 (antes del fix de base cero), en 38: D6-D36, D38, D46, D47, D57, D58, D60 y D64 (ver METODO_BASE_CERO.md §4b).
 *  · v6.10i (18-nov-2026 · auditoría del volcado c12 del Calendar, hallazgo 14): el «qué» de la lectura (D1-D76) empieza por la lista de apartados de hoy
 *    y cabe ENTERO en el corte del Calendar (150 con la hora delante: queLectura / CORTE_QUE); si la lista con todo su detalle no cabe, se compacta
 *    (título + minutos → título → los primeros por título y el resto por «§número») y el detalle va al «cómo» («Lista de hoy, en detalle: …»). Los
 *    minutos medidos a 150/180 y «en orden, cada apartado entero» pasan al «cómo» (el D1 conserva «en orden, cada apartado entero» en el «qué»: con su lista cabe). Mismas secciones,
 *    preguntas, minutos y horas. --check: el «qué» cabe y nombra todos los apartados en orden; si va compacto, el «cómo» lleva el detalle.
 *  · v6.10j (18-nov-2026 · auditoría c14 del Calendar, área MIR; solo TEXTO: mismas secciones, preguntas, minutos y horas): (1) LECTURA DE BASE de F1 (D2-D32):
 *    los minutos de cada apartado del «qué» van a 150 palabras/min (min150Lista: 1 decimal, resto mayor) y con el recuadro suman EXACTAMENTE los «Hoy lees X′»
 *    del «cómo» (a 180 sumaban 14-15′ en un paso de 16′); detrás del destino del resto, la regla «hoy, enteros y en orden (Whole Page Rule)» dentro de los 110
 *    caracteres del Calendar, y la lista de secciones del resto detrás (cortada dejaba «(1. 2. …»); (2) LECTURA DIRIGIDA con PARCIAL: «PARCIAL = … (el resto, a
 *    la 2.ª vuelta) · los demás, enteros y en orden»; (3) TEST DE CIERRE: «13′ (77 s/Q) · en blanco si no descartas 2 · Fuente: N del pool oficial + M MIR
 *    citadas en el bloque Dx-Dy» abre el «cómo»; (4) EVAL ANCLADA: la regla del blanco y «las listadas: citadas ProMIR de lo que leíste ese día, no usadas»
 *    abren el «cómo», sin paréntesis; (5) D1: los temas del repaso en blanco fuera del paréntesis y, en el quiz, «en blanco si no descartas 2» antes de «(la
 *    regla del blanco empieza aquí)». --check exige (1)-(4) en los 109 primeros caracteres.
 *  · v6.10l (19-nov-2026 · auditoría c15 del Calendar, área MIR; solo TEXTO: mismas secciones, preguntas, minutos y horas): (1) quiz del D1: la regla del
 *    blanco ENTERA abre el «cómo» («Desde aquí, en blanco si no descartas 2; con 2, marca») y detrás la cola de mañana; pre-test de F1: la regla del blanco
 *    («empieza en el quiz» / «va en la eval y el quiz») cabe entera en los 110; (2) «cronómetro N′ (77 s/Q…)» abre el «cómo» de la EVAL ANCLADA y el TEST DE
 *    CIERRE dice «10Q reales MIR cronometradas» en el «qué»; (3) LECTURA DE BASE: «(+X′)» en la cabecera siempre que el «cómo» diga «X′ más que el paso»
 *    (EXCESO_VISIBLE 0.1; D3, D4, D11, D13, D17, D21, D26, D32); (4) quiz D2-D76: «Tapa las opciones · Rule-In → Rule-Out · 6Q ≈ 10,7′ (77 s/Q + 30 s de
 *    comentario = 107 s/Q)» (la cuenta con su resultado, en un solo tramo) y, fuera de F1, el «qué» en corto («N del pool oficial + MIR citadas en lo leído»)
 *    para que el nivel del comentario se vea y los días de 5 pasos de 2027 no pasen del máximo del evento; pre-test «(N del pool oficial + M citadas en
 *    ProMIR)». --check exige (1)-(4).
 *  · v6.10m (19-nov-2026 · ronda c16 del Calendar, área MIR; solo TEXTO: mismas secciones, preguntas, minutos y horas): (1) pre-test de F1 (D1-D32): el
 *    ritmo «77 s/Q (5Q ≈ 6,4′)» cierra el «qué» (en el «cómo» quedaba tras el corte de 110); (2) quiz del D1: «7Q ≈ 12,5′ (77 s/Q + 30 s de comentario =
 *    107 s/Q)» detrás de la regla del blanco y delante de la cola de mañana; (3) quiz con cola de mañana larga («Las 2 primeras …», el D2): el ritmo justo
 *    detrás de la cola. --check exige (1)-(3) (el ritmo del quiz EMPIEZA dentro de los 110; la cola del D1, antes del carácter 160).
 *  · v6.10o (19-nov-2026 · ronda c17 del Calendar, área MIR; solo TEXTO: mismas secciones, preguntas, minutos y horas): quiz del D1 = «Desde aquí, en blanco
 *    si no descartas 2; con 2, marca · tapa las opciones · Rule-In → Rule-Out · 7Q ≈ 12,5′ (…) · las 2 primeras que no entren abren la eval de mañana (…)»
 *    (era el único quiz MIR sin «tapa las opciones» a la vista en el Calendar). --check: el ritmo del D1 EMPIEZA dentro de los 110 y su cola, antes del
 *    carácter 200 y como única fecha del «cómo».
 *  · v6.10p (19-nov-2026 · ronda c18 del Calendar, área usmle-mir · #2; solo TEXTO): el quiz cuya cola de mañana no deja sitio delante al par y al ritmo (el
 *    D2) abre como el del D1: «Tapa las opciones · Rule-In → Rule-Out · 6Q ≈ 10,7′ (…) · las 2 primeras que no entren abren la eval de mañana (…)» (antes
 *    «… · tapa las opciones · 6Q ≈ … · Rule-In → Rule-Out», y el corte se llevaba «Rule-In → Rule-Out»). --check: en los 76 quizzes el par va junto, justo
 *    delante del ritmo y dentro de los 110; la cola del D2, antes del carácter 200 y como única fecha del «cómo» (como la del D1).
 *  · v6.10r (19-nov-2026 · chat MIR, hallazgo 9; decisión del chat de plan; solo TEXTO del plan B: mismas preguntas, secciones, minutos y horas): el plan B
 *    con ProMIR caído decía «pre-test y quiz con el pool oficial de la app (pestaña MIR → registro: 5Q del capítulo + 25 de Epidemiología) y lectura en la
 *    nota madre de Obsidian»: el pool de la ASIGNATURA son los pre-tests ciegos, quizzes, evals y cierres de otros días (D1: 18 de las 25 ya repartidas: los
 *    pre-tests del D2 y del D3, el cierre del D4…) y la nota madre del tema está vacía hasta que se escribe. Ahora (planBMir): la eval anclada o el test de
 *    cierre y el pre-test, con SUS MISMAS preguntas de hoy (el pre-test con sus 5 por año-número), por el chat MIR · lectura en el resumen de Ravi del Drive ·
 *    el quiz se APLAZA hasta que ProMIR vuelva, con su misma lista (no se sustituye) · modo mínimo de los días de cierre = el test de cierre (antes «4Q
 *    ancladas», que ese día no hay). --check: cada plan B nombra solo ids de su propio pre-test, ninguno de otro día, y no remite al pool ni a la nota madre.
 *  · v6.07 (8-nov-2026 · corrimiento D1 = lun 9-nov; la semana del lun 2-nov sin estudio): solo cambian las FECHAS (mirDailyPlan D1 lun 9-nov →
 *    D76 jue 25-feb · dermaDailyPlan d1-d5 mar 10 → vie 20-nov); medición, reparto de preguntas y bloques idénticos (mismos 76 capítulos, mismo orden).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..', '..');
const OUT = path.join(ROOT, 'DATA/MIR/guia_lectura_semana1-2.json');
const MED = path.join(__dirname, 'medicion_promir_2026-10-18');
const CHECK = process.argv.includes('--check');

// ── carga de src/lib/*.ts transpilado en memoria (solo lectura; mismo patrón que los verificadores) ──
const ts = require(path.join(ROOT, 'node_modules', 'typescript'));
const cache = new Map();
function load(rel) {
  let file = path.isAbsolute(rel) ? rel : path.join(ROOT, rel);
  if (!fs.existsSync(file)) for (const ext of ['.ts', '.tsx']) if (fs.existsSync(file + ext)) { file += ext; break; }
  if (cache.has(file)) return cache.get(file).exports;
  const m = { exports: {} }; cache.set(file, m);
  const src = fs.readFileSync(file, 'utf8').replace(/import\.meta\.env/g, '({})');
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  const req = (spec) => (spec.startsWith('.') ? load(path.resolve(path.dirname(file), spec)) : {});
  new Function('exports', 'module', 'require', js)(m.exports, m, req);
  return m.exports;
}
const MD = load('src/lib/mirDailyPlan.ts');
// v6.10 · tanda C: nombre real del mazo de Ravi («1º VUELTA», ya en Anki) y tarjetas por subtema contadas con Joseph (DATA/MIR/metodo_ravimedtest.json)
const METODO = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/MIR/metodo_ravimedtest.json'), 'utf8'));
// v6.10 · base cero (18-nov-2026): fase de la 1.ª vuelta de cada día (metodo_ravimedtest.json › fases; F1 BASE D1-D32 · F2 CONSOLIDACIÓN D33-D76 · F3 D77+)
const faseDe = (d) => { const f = (METODO.fases || []).find((z) => d >= z.dDesde && d <= z.dHasta); if (!f) throw new Error(`metodo_ravimedtest.json: el D${d} no tiene fase`); return f; };
const POOL = load('src/lib/mirPreguntasOficiales.ts');
const DERMA = load('src/lib/dermaDailyPlan.ts');
const ANKI = load('src/lib/ankiLinks.ts');
// v6.10 · base cero (fix 18-nov): destino con fecha de lo que no se lee en la 1.ª vuelta = 2.ª vuelta en la fase principal MIR, que empieza tras el handoff
//   del banqueo (MIR_MANT_META.fin = último día con estudio antes del Step 1). Antes «oct-2027» escrito (handoff de la v6.00; desde la v6.07, dic-2027).
const MANT = load('src/lib/mirMantenimiento.ts');
const HANDOFF = MANT.MIR_MANT_META.fin;

// ── método (declarado) ──
const RITMO = { prosaPpm: 180, tablaPpm: 90, figuraMin: 0.5 };
const LECTURA_MIN = 15;          // franja 15:38–15:53 (MIR_FRANJAS)
const ORIENT_MIN = 1;            // recuadro «Orientación MIR» al empezar la lectura
const CLIP_MAX_SEG = 12 * 60;    // regla MIR_FRANJAS: «vídeo solo si el clip es ≤12 min verificado»
const SEG_POR_Q = 77;            // MIR_SEG_POR_Q (210Q / 270 min)
const QUIZ_N = 8, QUIZ_MAX = 10; // LISTA del quiz: 8-10Q (selección y reparto con las anclas, sin cambio)
// v6.09 · lote 1 (17-nov-2026, auditoría tiempo ↔ material a2-7): lo que se HACE en los 12′ = 6Q comentadas (máx. 8): 77 s + 30 s de comentario = 107 s/Q →
//   6Q ≈ 10,7′ (8Q = 14,3′ no cabían); la lista sigue siendo de 8-10 y las que no entran quedan en la cola del capítulo (esta lista, en orden)
const QUIZ_HACER = 6, QUIZ_HACER_MAX = 8, SEG_COMENTARIO = 30;
// v6.09b · lote 1-ter (17-nov-2026, revisión R del lote 1-bis: 53 pasos MIR de F1 fuera de 0,85-1,15 —pre-test 5Q en 8′ = 0,80 y eval anclada 4Q en 7′ = 0,73—):
//   SOLO F1 desde el D2 (mié 18-nov → jue 31-dic; el D1 —mar 17-nov, en curso— y 2027 no cambian), dentro de las mismas franjas y sin material nuevo:
//   · 15:15-15:30: la eval anclada de 4Q dura su cronómetro (6′; 4 × 77 s = 5,1′) y el minuto pasa al Anki (6′; deuda a cero + mazo de Ravi, paso elástico);
//     las evals de 2-3Q (D2, D3, D6, D7) siguen con 7′ (lote 1-quater: 4Q comentadas con la cola del quiz del D-1, ver colaEvalDe).
//   · 15:30-16:15: el pre-test 5Q pasa a 7′ (5 × 77 s = 6,4′) y el minuto pasa a la LECTURA DIRIGIDA (16′) con las MISMAS secciones: a 150 palabras/min
//     —la regla fija de lectura en español— suman 15,5-18,1′ con el recuadro (a 180, 13,5-15′): a 15′ había 5 días por encima de 1,15; a 16′, todos en 0,97-1,13.
// v6.10 (17-nov-2026 · D1 = mié 18-nov): la ventana pasa de «fecha ≥ 18-nov» a «D ≥ 2 y fecha ≤ 3-ene» → los mismos días de plan (D2-D32) que en la
//   v6.09b aunque sus fechas corran un día; el D1 (ARRANQUE, ahora mié 18) sigue con su estructura propia, auditada aparte (ver colaEvalDe y el quiz).
const LOTE1T_HASTA = '2027-01-03', PPM_REGLA = 150;
const enLote1t = (x) => !!x && x.d >= 2 && x.fecha <= LOTE1T_HASTA;
/** v6.10: el D1 (ARRANQUE, mié 18-nov) ya no está «en curso»: auditado con la regla fija, su pre-test 5Q (8′ = 0,80) pasa a 7′ y el minuto va a la
 *  LECTURA DIRIGIDA (16′, las mismas secciones medidas a 150 palabras/min), igual que el lote 1-ter en D2-D32; ARRANQUE, recuadro, 5Q ciegas extra
 *  (5 × 77 s = 6,4′ en 7′), quiz (6Q comentadas ≈ 10,7′ en 12′) y APEX no cambian. Sin material nuevo. */
const lectF1 = (x) => enLote1t(x) || (!!x && x.d === 1 && x.fecha <= LOTE1T_HASTA);
// v6.09b · lote 1-quater (17-nov-2026, revisión R2 del lote 1-ter, hallazgo de las evals de 2-3Q): en F1 (D2, D3, D6, D7 = mié 18 · jue 19 · mar 24 ·
//   mié 25-nov) la eval de 2-3Q ya no deja «los N′ que sobran, adelanta el Anki»: los 7′ son 4Q COMENTADAS (77 s + 30 s = 107 s/Q → 4 × 107 s = 7,1′) =
//   las nQ ancladas + (4 − nQ) de la COLA del quiz del D-1 (la 7.ª-10.ª de su lista: material del plan que ya existe, sin tocar ningún otro día). El Anki
//   (5′) y el log (3′, aciertos/4) no cambian; 2027 no tiene evals de < 4Q.
const SEG_EVAL_COMENTADA = SEG_POR_Q + SEG_COMENTARIO, EVAL_Q_F1 = 4;
/** Cola del quiz del D-1 que entra en la eval del día d (solo F1 con < 4Q ancladas): { dC = día cuyo quiz cede, n = cuántas, fecha del día d } o null. */
function colaEvalDe(d) {
  const x = MD.mirDiaN(d); if (!x || !enLote1t(x) || MD.mirCierreDe(d)) return null;
  const a = MD.mirAnclas(d); if (!a.d1) return null;
  const nQ = (a.d1 ? 2 : 0) + (a.d3 ? 1 : 0) + (a.d7 ? 1 : 0);
  return nQ < EVAL_Q_F1 ? { dC: a.d1.d, n: EVAL_Q_F1 - nQ, nQ, fecha: x.fecha } : null;
}
const dec1 = (x) => String(Math.round(x * 10) / 10).replace('.', ',');
/** Minutos de la lectura elegida (recuadro + secciones) a 150 palabras/min en la prosa (tablas a 90, figuras 0,5′ y clips, como el generador); una sección
 *  PARCIAL cuenta la misma fracción que a 180. */
const min150 = (sel) => ORIENT_MIN + sel.reduce((s, u) => {
  const clip = u.clips.reduce((a, v) => a + v.seg, 0) / 60;
  const r150 = u.palabras / PPM_REGLA + u.palabrasTabla / RITMO.tablaPpm + u.figs * RITMO.figuraMin + clip;
  const r180 = u.palabras / RITMO.prosaPpm + u.palabrasTabla / RITMO.tablaPpm + u.figs * RITMO.figuraMin + clip;
  return s + (u.parcial ? (u.minLeer * r150) / Math.max(r180, 0.01) : r150);
}, 0);
/** v6.10 · base cero (fix 18-nov): minutos de UNA sección entera a 150 palabras/min (tablas a 90, 0,5′ por figura, clips ≤12′ por su duración). */
const m150de = (u) => u.palabras / PPM_REGLA + u.palabrasTabla / RITMO.tablaPpm + u.figs * RITMO.figuraMin + u.clips.reduce((a, v) => a + v.seg, 0) / 60;
/** v6.10 · base cero (fix 18-nov): paso de lectura de F1 (D2-D32) = 15′ + el minuto que cede el pre-test (lote 1-ter) = 16′. */
const LEC_F1 = LECTURA_MIN + 1;
/** v6.10 · base cero (fix 18-nov): LECTURA DE BASE sin PARCIAL en la fase 1 (D2-D32; el D1 tiene su lista decidida con Joseph). */
const PASE1 = process.argv.includes('--pase1'); // reparto original (sin la lectura de base) → consumo por día, para aislar 2027 (ver VETO)
const baseF1 = (x) => !PASE1 && !!x && x.d >= 2 && faseDe(x.d).n === 1;
const PROMIR = 'https://promir.medicapanamericana.com';
const capUrl = (id) => `${PROMIR}/capitulo/${id}`;
const preguntaUrl = (pid) => `${PROMIR}/pregunta/MIR/${pid}`;
/** id del pool de la app (año del EXAMEN, p. ej. 2024-050) → id ProMIR (año de la convocatoria, 2023-050 = «MIR 2023-2024, P050»).
 *  Verificado el 18-oct con 3 casos: pool 2024-050 = ProMIR 2023-050 (Fase II) · 2024-049 = 2023-049 (Fase IV) · 2023-052 = 2022-052. */
const poolAProMIR = (id) => `${+id.slice(0, 4) - 1}-${id.slice(5)}`;
const proMIRAPool = (pid) => `${+pid.slice(0, 4) + 1}-${pid.slice(5)}`;
/** v6.10e (revisión del 18-nov · mir-1): una citada ProMIR NO se sirve si su equivalente del pool oficial está ANULADO (clave null) o con la clave en
 *  duda (`nota`): la misma regla que mirPreguntasOficiales.usable («las anuladas y las dudosas NO se sirven por defecto»). Antes solo se filtraba el pool
 *  y por la vía de las citadas entraban la 2025-208 (anulada) en el cierre del D31, la 2024-208 (clave a verificar) en el quiz del D7 y la 2025-013 y la
 *  2025-050 (anuladas) en los pre-tests del D46 y del D57. Se aplica en TODOS los repartos (pre-test, extra, quiz, repaso, anclas, cierres) y también en
 *  el pase 1, para que el VETO siga cuadrando. */
const noServible = (pid) => { const q = POOL.preguntaPorId(proMIRAPool(pid)); return !!q && (q.anulada || q.clave == null || !!q.nota); };
const r05 = (x) => Math.round(x * 2) / 2;
const fmtSeg = (s) => (s >= 3600 ? `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`);
const WD = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fmtF = (iso) => `${WD[new Date(iso + 'T12:00:00Z').getUTCDay()]} ${+iso.slice(8)}-${MES[+iso.slice(5, 7) - 1]}`;
/** v6.10 · base cero (fix 18-nov): «2.ª vuelta MIR (fase principal, tras el handoff del vie 3-dic-2027)» (derivado de MIR_MANT_META.fin). */
const VUELTA2 = `2.ª vuelta MIR (fase principal, tras el handoff del ${fmtF(HANDOFF)}-${HANDOFF.slice(0, 4)})`;
/** v6.10e (revisión del 18-nov · regresiones-3): forma corta para el principio del «cómo» (el Calendar corta el «cómo» a 110 caracteres: la fecha va antes
 *  del carácter 100, CORTE_DEST); la forma larga (VUELTA2) sigue en paraElRepaso y en el método. */
const VUELTA2C = `2.ª vuelta MIR (tras el ${fmtF(HANDOFF)}-${HANDOFF.slice(0, 4)})`;
const CORTE_DEST = 100;
/** v6.10j (auditoría c14, diffs #2): la regla de la lectura en corto, visible en el corte del Calendar (Whole Page Rule: cada apartado entero, en el orden del
 *  capítulo); en la LECTURA DE BASE de F1 va detrás del destino del resto y en la LECTURA DIRIGIDA con un PARCIAL, detrás del criterio del PARCIAL. */
const REGLA_BASE = 'hoy, enteros y en orden';
const REGLA_PARCIAL = 'los demás, enteros y en orden';
/** v6.10e (revisión del 18-nov · mir-7, dias-1920-2): COBERTURA del día medida a 150 palabras/min (la regla fija; antes a 180, otra unidad que la del paso)
 *  y con el resto NOMBRADO: `leidos` = unidades que se leen hoy; `conRecuadro` = el paso incluye el recuadro «Orientación MIR» (el H2 del capítulo, ≈1′:
 *  D2-D32; en el D1 va en el paso anterior y no cuenta). El resto = las secciones no leídas (sin el H2, que es el recuadro) + los clips del H2 aparte
 *  («+ N′ de vídeos del capítulo»: el D31 tiene 2 clips de 8:38 y 11:13 que antes sumaban al resto sin estar en la lista). */
function cobertura150(us, leidos, conRecuadro) {
  const ids = new Set(leidos.map((u) => u.i));
  const resto = us.filter((u) => u.nivel !== 'H2' && !ids.has(u.i));
  const vids = us.filter((u) => u.nivel === 'H2').flatMap((u) => u.clips);
  const minLeidos = Math.round(((conRecuadro ? ORIENT_MIN : 0) + leidos.reduce((a, u) => a + m150de(u), 0)) * 10) / 10;
  const minResto = Math.round(resto.reduce((a, u) => a + m150de(u), 0) * 10) / 10;
  const minVideos = Math.round(vids.reduce((a, v) => a + v.seg, 0) / 6) / 10;
  const minCapitulo = Math.round((minLeidos + minResto + minVideos) * 10) / 10;
  return { a: PPM_REGLA, minLeidos, minCapitulo, pct: Math.round((100 * minLeidos) / minCapitulo), minResto, nResto: resto.length, minVideos,
    resto: resto.map((u) => u.titulo.split(' ')[0]), videos: vids.map((v) => `${v.leyenda ? v.leyenda.replace(/^(Vídeo [\d-]+).*$/, '$1') : 'vídeo'} ${v.dur}`) };
}
/** v6.10e (revisión del 18-nov · dias-1920-11): dónde están las preguntas con su enlace (la tarjeta del Home solo pinta el texto del paso) */
const DONDE_IDS = 'enlaces en Estudio › 🇪🇸 España › Cola de hoy';
/** v6.10r (19-nov-2026 · chat MIR, hallazgo 9): PLAN B con ProMIR caído = las MISMAS preguntas de HOY (nunca el pool de la asignatura: son los pre-tests,
 *  quizzes, evals y cierres de otros días) · lectura en el resumen de Ravi del Drive (la nota madre del tema está vacía hasta que se escribe) · el quiz se
 *  aplaza con su misma lista. `modo` = el modo mínimo del día roto (los primeros 15′: en el D1, pre-test + §2-§3; con cierre, el cierre; si no, Anki + eval). */
function planBMir(preguntas, pasos, modoD1) {
  const ids = preguntas.pretest.map((q) => q.promir);
  if (ids.length !== 5) throw new Error(`plan B: el pre-test tiene ${ids.length} preguntas (se esperaban 5)`);
  const ev = pasos.find((p) => /^EVAL ANCLADA/.test(p.que));
  const nEv = ev ? (/^EVAL ANCLADA (\d+)Q(?: \+ (\d+)Q de la cola)?/.exec(ev.que) || []).slice(1, 3).reduce((a, n) => a + (+n || 0), 0) : 0;
  const nCi = (preguntas.cierre || []).length;
  if (ev && !nEv) throw new Error('plan B: no se pudo leer cuántas preguntas tiene la eval anclada');
  const previas = nCi ? `el test de cierre con sus ${nCi}Q de hoy y ` : nEv ? `la eval anclada con sus ${nEv}Q de hoy y ` : '';
  const modo = modoD1 || (nCi ? `el test de cierre de hoy (sus ${nCi}Q, 15′).` : `Anki a cero + las ${nEv}Q de la eval de hoy (15′).`);
  // numeración de ProMIR (año de la convocatoria): sin ProMIR, el chat las busca en el cuadernillo oficial del año SIGUIENTE (pool 2022-046 = ProMIR 2021-046)
  const [a0, n0] = ids[0].split('-');
  return `Si ProMIR no abre: ${previas}el pre-test con SUS MISMAS 5Q (${ids.join(' · ')}; numeración de ProMIR: ${ids[0]} = MIR ${a0}-${+a0 + 1}, P${n0}), por el chat MIR · lectura: el resumen de Ravi del tema (rabi_94, Drive) · el quiz se aplaza hasta que ProMIR vuelva, con su misma lista (no lo sustituyas por otras preguntas del pool oficial: son los pre-tests, quizzes y cierres de otros días). Día roto (modo mínimo): ${modo}`;
}
/** El Calendar copia el «qué» de cada paso cortado a 150 caracteres CON la hora del paso delante («15:37–15:53 · », 14): el «qué» de la lectura cabe
 *  ENTERO en lo que queda (136) y empieza por la lista de apartados de hoy. Si la lista con todo su detalle no cabe, se compacta (título + minutos →
 *  título → los primeros por título y el resto por su número «§n») y el detalle de cada apartado va al «cómo» (la app lo muestra entero). */
const CORTE_QUE = 150 - '00:00–00:00 · '.length;
/** El Calendar corta el «cómo» a 110: lo que tiene que verse acaba antes del carácter 109 (el corte va al último espacio del tramo). */
const CORTE_COMO = 109;
/** v6.10j (auditoría c14, diffs #2): minutos de cada apartado de la LECTURA DE BASE (F1) a 150 palabras/min —la unidad del paso de 16′ y de «Hoy lees X′»—,
 *  con 1 decimal y repartidos por resto mayor para que recuadro (1′) + apartados sumen EXACTAMENTE los minutos leídos del «cómo» (antes iban a 180: 1 + 10 + 3
 *  = 14′ en un paso de 16′ con «Hoy lees 16,2′», sin explicación visible en el Calendar). Sirve con las unidades de la medición y con las secciones del JSON. */
function min150Lista(sel) {
  const ex = sel.map((u) => m150de(u));
  const tot = Math.round((ORIENT_MIN + ex.reduce((a, b) => a + b, 0)) * 10); // décimas, como cobertura150 › minLeidos
  const fl = ex.map((v) => Math.floor(v * 10 + 1e-9));
  let falta = tot - ORIENT_MIN * 10 - fl.reduce((a, b) => a + b, 0);
  for (const [, k] of ex.map((v, k) => [v * 10 - fl[k], k]).sort((a, b) => b[0] - a[0] || a[1] - b[1])) { if (falta <= 0) break; fl[k]++; falta--; }
  return fl.map((v) => v / 10);
}
/** minutos de un apartado: los de la medición (180 palabras/min, «1.5′») o, con `m`, los de la LECTURA DE BASE a 150 («11,6′») */
const minSec = (u, m) => (m == null ? `${u.min}′` : `${dec1(m)}′`);
/** Apartado con todo su detalle (minutos —a 180, o a 150 en la LECTURA DE BASE—, PARCIAL, preguntas MIR citadas, contexto, clips). */
const lineaSec = (u, m = null) => `${u.titulo} (${u.parcial ? `PARCIAL ${u.minLeer}′ de ${u.min}′: solo los párrafos con chip MIR ≥2015` : minSec(u, m)}${u.citasMIR ? ` · ${u.citasMIR} ${u.citasMIR === 1 ? 'pregunta MIR citada' : 'preguntas MIR citadas'}` : ''}${u.contexto ? ' · contexto, sin preguntas citadas' : ''}${u.clips.length ? ` · clip ${u.clips.map((c) => c.dur).join(' + ')}` : ''})`;
const numSec = (u) => { const m = /^(\d+(?:\.\d+)*)\.?\s/.exec(u.titulo); if (!m) throw new Error(`sección sin número: «${u.titulo}»`); return m[1]; };
const FMT_SEC = {
  completo: lineaSec,
  corto: (u, m) => `${u.titulo} (${u.parcial ? `PARCIAL ${u.minLeer}′ de ${u.min}′` : minSec(u, m)}${u.clips.length ? ` · clip ${u.clips.map((c) => c.dur).join(' + ')}` : ''})`,
  titulo: (u) => `${u.titulo}${u.parcial ? ' (PARCIAL)' : ''}`,
  num: (u) => `§${numSec(u)}${u.parcial ? ' (PARCIAL)' : ''}`,
};
/** «qué» de la lectura: `cab` + recuadro + la lista de hoy en el formato más rico que quepa entero en CORTE_QUE → { que, detalle: el «cómo» lleva el
 *  detalle, ms: minutos de cada apartado (a 150 si `a150`: LECTURA DE BASE de F1; si no, null = los de la medición a 180) } */
/** remate v6.10l: días cuya cabecera va sin «(+X′)» para que la lista quepa con sus minutos (el «cómo» dice el exceso) */
const EXCESO_OMITIDO = new Set();
function queLectura(cab, sel, a150 = false) {
  const ms = a150 ? min150Lista(sel) : sel.map(() => null);
  const mk = (f) => `${cab} · Orientación MIR (1′) + ${sel.map((u, i) => f(i)(u, ms[i])).join(' · ')}`;
  // nivel (remate v6.10l): 0 completo · 1 corto (con minutos) · 2 títulos · 3+ con números de sección (más alto = más pobre)
  for (const [nv, k] of ['completo', 'corto', 'titulo'].entries()) { const q = mk(() => FMT_SEC[k]); if (q.length <= CORTE_QUE) return { que: q, detalle: k !== 'completo', ms, nivel: nv }; }
  for (let n = sel.length - 1; n >= 0; n--) for (const k of ['corto', 'titulo']) { const q = mk((i) => (i < n ? FMT_SEC[k] : FMT_SEC.num)); if (q.length <= CORTE_QUE) return { que: q, detalle: true, ms, nivel: 3 + 2 * (sel.length - 1 - n) + (k === 'corto' ? 0 : 1) }; }
  throw new Error(`${cab}: la lista de apartados no cabe ni por número en ${CORTE_QUE} caracteres`);
}
const restoTxt = (c) => `${dec1(c.minResto)}′ en ${c.nResto} ${c.nResto === 1 ? 'sección' : 'secciones'}${c.nResto ? ` (${c.resto.join(' ')})` : ''}${c.minVideos ? ` + ${dec1(c.minVideos)}′ de vídeos del capítulo (${c.videos.join(' · ')})` : ''}`;

/** Resumen PROPIO (no copia) del recuadro «Orientación MIR» de cada capítulo: qué pide ProMIR priorizar. */
const ENFASIS = { // 11 resúmenes propios (v6.02c); el resto lo deriva enfasisMedido() de la medición (v6.03)
  '570779c9f4d68bf008dbc7b1': 'El capítulo de Epidemiología más preguntado de forma constante: dominarlo entero. Foco: definición y características del ECA, aleatorización, análisis (NNT; por protocolo vs por intención de tratar), tipos (pragmático vs explicativo) y fases.',
  '570779c9f4d68bf008dbc80d': 'Muy preguntado: los diseños (transversal, casos y controles, cohortes, ecológico, ensayo) con sus ventajas, limitaciones y para qué sirve cada uno.',
  '570779c9f4d68bf008dbc80f': 'Preguntas en todas las convocatorias; cálculos sencillos de exactitud diagnóstica (S, E, VPP, VPN, cocientes de probabilidad); la curva ROC usa los mismos conceptos.',
  '64a3be863f62ec1dbb3e665b': 'Preguntas en aumento; casi todas salen con sentido común + pocos conceptos teóricos (principios, relación médico-paciente, consentimiento, rechazo de tratamiento).',
  '570779c9f4d68bf008dbc7e9': '≈3 preguntas/año; recurrentes: shock, pulso venoso yugular y ruidos/soplos; es la base del resto de Cardiología.',
  '570779c9f4d68bf008dbc78d': 'Preguntas todos los años: ECG básico, manejo de la FA, diagnóstico diferencial de las taquicardias supraventriculares, bloqueos AV e indicaciones de marcapasos.',
  '570779c9f4d68bf008dbc731': 'El tema más preguntado del MIR en los últimos años: separar enfermedad coronaria estable de SCA; lo esencial es diagnóstico y tratamiento del SCA y sus complicaciones (sobre todo mecánicas).',
  '64588d5ef704295c924d9289': '3-4 preguntas/año (directas o indirectas): obligado y muy rentable.',
  '570779c8f4d68bf008dbc65a': 'Importancia intermedia (≈2 preguntas/examen); ProMIR lo expone por entidades, con caso clínico en cada una.',
  '570779c8f4d68bf008dbc658': 'En auge por los fármacos con impacto pronóstico (iSGLT2 y arGLP-1 en diabetes; nuevos hipolipemiantes en dislipemia).',
  '570779c8f4d68bf008dbc646': 'Poco preguntado de forma directa, pero es el vocabulario de toda la Dermatología (estructura, lesiones elementales, tratamientos): volver a él las veces que haga falta.',
};

/** v6.03: énfasis DERIVADO de la medición (sin texto de ProMIR): las 3 secciones con más preguntas MIR citadas, ponderadas por recencia. */
function enfasisMedido(us) {
  const top = us.filter((u) => u.nivel !== 'H2' && u.score > 0).sort((a, b) => b.score - a.score || a.i - b.i).slice(0, 3);
  return top.length ? `Medido (preguntas MIR que cita el capítulo, ponderadas por recencia): el peso está en ${top.map((u) => `${u.titulo} (${u.citasMIR} citadas${u.citasDesde2015 ? `, ${u.citasDesde2015} ≥2015` : ''})`).join(' · ')}.` : null;
}

// ── medición → unidades de lectura ──
function cargarMedicion(capId) {
  const f = path.join(MED, capId + '.json');
  if (!fs.existsSync(f)) throw new Error('falta la medición de ' + capId);
  return JSON.parse(fs.readFileSync(f, 'utf8'));
}
function unidades(med) {
  return med.secciones.map((s, i) => {
    const clips = s.videos.filter((v) => v.seg > 0 && v.seg <= CLIP_MAX_SEG);
    const largos = s.videos.filter((v) => v.seg > CLIP_MAX_SEG);
    const min = s.palabras / RITMO.prosaPpm + s.palabrasTabla / RITMO.tablaPpm + s.figs * RITMO.figuraMin + clips.reduce((x, v) => x + v.seg, 0) / 60;
    const c15 = s.citasMIRdesde2015, c20 = s.citasMIRdesde2020;
    return {
      i, nivel: s.nivel, titulo: s.titulo, palabras: s.palabras, palabrasTabla: s.palabrasTabla, figs: s.figs, tablas: s.tablas.length,
      citasMIR: s.citasMIR, citasDesde2015: c15, citasDesde2020: c20, citas: s.citas.slice().sort().reverse(),
      clips: clips.map((v) => ({ seg: v.seg, dur: fmtSeg(v.seg), leyenda: v.leyenda })), largos: largos.map((v) => ({ seg: v.seg, dur: fmtSeg(v.seg), leyenda: v.leyenda })),
      min: Math.max(0.5, r05(min)),
      /** peso de la sección DENTRO del capítulo = sus preguntas MIR citadas, ponderadas por recencia: ≥2020 ×3 · 2015-2019 ×2 · <2015 ×1 */
      score: c20 * 3 + (c15 - c20) * 2 + (s.citasMIR - c15),
    };
  });
}

/** Lectura dirigida de 15′: recuadro de orientación (1′) + secciones por peso hasta llenar 14′; la sección top que no cabe entera
 *  se lee PARCIAL (solo los párrafos con chip MIR reciente). Reserva = las 3 siguientes por peso (para cuando aciertas el pre-test). */
function elegirLectura(us, pretestSecs) {
  const cand = us.filter((u) => u.nivel !== 'H2' && (u.palabras > 0 || u.palabrasTabla > 0)).map((u) => ({ ...u, s: u.score + (pretestSecs.has(u.i) ? 5 : 0) }))
    .sort((a, b) => b.s - a.s || a.min - b.min || a.i - b.i);
  let resto = LECTURA_MIN - ORIENT_MIN; const sel = []; let parcial = null;
  for (const u of cand) {
    if (resto < 1) break;
    if (u.s <= 0) break; // sin preguntas MIR citadas → no entra en los 15′
    if (u.min <= resto) { sel.push({ ...u, minLeer: u.min, parcial: false }); resto -= u.min; }
    else if (!sel.length || (!parcial && resto >= 4 && u.s >= cand[0].s * 0.5)) { parcial = { ...u, minLeer: r05(resto), parcial: true }; sel.push(parcial); resto = 0; }
  }
  // v6.03: capítulo con pocas secciones citadas (D22 se quedaba en 7,5′ de 15′) → si sobran ≥3′, se completa con las secciones SIN preguntas
  // citadas que caben enteras, en el orden del capítulo (contexto: dan sentido a las citadas); con ≥14′ de citadas no cambia nada.
  if (resto >= 3) {
    for (const u of cand.filter((x) => x.s <= 0).sort((a, b) => a.i - b.i)) {
      if (resto < 1) break;
      if (u.min <= resto) { sel.push({ ...u, minLeer: u.min, parcial: false, contexto: true }); resto -= u.min; }
    }
  }
  const elegidos = new Set(sel.map((x) => x.i));
  // v6.10 · base cero (fix 18-nov): la reserva se lee «en orden» → va en el orden del capítulo (antes, por peso: D5 «4.1 · 2.2 · 4.3»); mismas 3 secciones
  const reserva = cand.filter((u) => !elegidos.has(u.i) && u.s > 0).slice(0, 3).sort((a, b) => a.i - b.i);
  return { sel: sel.sort((a, b) => a.i - b.i), reserva, minUsados: r05(LECTURA_MIN - resto) };
}

/** v6.10 · base cero (fix 18-nov-2026, revisión de los frentes: 12 de 32 días de F1 leían una sección «PARCIAL: solo los párrafos con chip MIR ≥2015»
 *  bajo un paso que prometía «cada apartado entero»): LECTURA DE BASE de la fase 1 (D2-D32) = las secciones que pregunta el MIR (más citadas primero, +5 si
 *  cae una pregunta del pre-test), CADA UNA ENTERA y con el mismo presupuesto que elegirLectura (14′ a 180 palabras/min + 1′ de recuadro): la que no cabe
 *  no se recorta, se salta y entra la siguiente entera que quepa; con ≥ 3′ libres (como elegirLectura), secciones de contexto (sin citas) enteras en el orden del capítulo. Se
 *  leen en el orden del capítulo; reserva = las 3 siguientes por peso, también en el orden del capítulo. Nunca PARCIAL. El paso (16′) se comprueba a 150
 *  palabras/min con la regla fija 0,85-1,15 (abajo, en las comprobaciones). */
function elegirLecturaBase(us, pretestSecs) {
  const cand = us.filter((u) => u.nivel !== 'H2' && (u.palabras > 0 || u.palabrasTabla > 0)).map((u) => ({ ...u, s: u.score + (pretestSecs.has(u.i) ? 5 : 0) }))
    .sort((a, b) => b.s - a.s || a.min - b.min || a.i - b.i);
  let resto = LECTURA_MIN - ORIENT_MIN; const sel = [];
  for (const u of cand) {
    if (resto < 1) break;
    if (u.s <= 0) break; // sin preguntas MIR citadas → solo como contexto (abajo)
    if (u.min <= resto) { sel.push({ ...u, minLeer: u.min, parcial: false }); resto -= u.min; }
  }
  if (resto >= 3) for (const u of cand.filter((y) => y.s <= 0).sort((a, b) => a.i - b.i)) { if (resto < 1) break; if (u.min <= resto) { sel.push({ ...u, minLeer: u.min, parcial: false, contexto: true }); resto -= u.min; } }
  const elegidos = new Set(sel.map((y) => y.i));
  const reserva = cand.filter((u) => !elegidos.has(u.i) && u.s > 0).slice(0, 3).sort((a, b) => a.i - b.i);
  return { sel: sel.sort((a, b) => a.i - b.i), reserva, minUsados: r05(LECTURA_MIN - resto) };
}

// ── días MIR D1-D10 ──
const DIAS = MD.MIR_DIAS.filter((x) => x.d >= 1 && x.d <= MD.MIR_TEMAS_TOTAL); // v6.03: D1-D76 (antes D1-D10); D77/D78 no leen capítulo
const usadosPool = new Set();      // ids del pool de la app ya asignados (pre-tests, cierres)
const usadosProMIR = new Set();    // ids ProMIR ya asignados
const ANCLAS = {};                 // d → { d1: [2 ids], d3: [1], d7: [1] } (para las evals de los días siguientes)
const CAP = {};                    // d → datos del capítulo
// v6.10 · base cero (fix 18-nov): la lectura de base de F1 REHACE el reparto de F1 (quiz, anclas, repasos y cierres de F1: cambian ids en la mayoría de
//   días de F1; la U propia —quiz + anclas— cambia en 13 días). Para que el reparto de
//   2027 (D33-D78 + sus cierres) no se mueva en cascada, se hace un PASE 1 con la selección de siempre (proceso hijo, --pase1) que dice qué día consumió cada
//   pregunta; en el pase real, las decisiones de F1 (D ≤ F1_FIN, también sus cierres) no pueden tomar las que consumió 2027 y las de 2027 no pueden tomar
//   las que consumió F1 en el pase 1 → 2027 ve el mismo conjunto libre y repite su reparto (solo cambian sus evals ancladas a días de F1: anclas de lo leído).
const F1_FIN = METODO.fases[0].dHasta; // D32 (sáb 2-ene)
const CONSUMO = new Map(); let D_ACTUAL = 0; // pid → día cuya decisión lo consumió (0 = reserva inicial del pool)
const usar = (pid) => { usadosProMIR.add(pid); if (!CONSUMO.has(pid)) CONSUMO.set(pid, D_ACTUAL); };
const VETO = (() => {
  if (PASE1 || !DIAS_BASE_F1()) return null;
  const r = require('child_process').spawnSync(process.execPath, [__filename, '--pase1'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0) throw new Error('pase 1 (reparto original) falló: ' + (r.stderr || '').slice(0, 400));
  const c = JSON.parse(r.stdout).consumo; const f1 = new Set(), tarde = new Set();
  for (const [pid, d] of c) if (d >= 1 && d <= F1_FIN) f1.add(pid); else if (d > F1_FIN) tarde.add(pid);
  return { f1, tarde };
})();
function DIAS_BASE_F1() { return DIAS.some((x) => baseF1(x)); }
/** ¿pregunta vetada para la decisión del día en curso? (F1 no toma lo de 2027 · 2027 no toma lo que F1 consumía en el pase 1) */
const vetada = (pid) => !!VETO && (D_ACTUAL <= F1_FIN ? VETO.tarde.has(pid) : VETO.f1.has(pid));
// TODO el pool de la app de los 10 capítulos (pre-test + resto, que va al quiz) se reserva ANTES de repartir quiz/anclas: así ningún quiz usa la versión ProMIR
// de una pregunta que otro día va a salir en su pre-test (p. ej. pool 2022-122 = ProMIR 2021-122)
for (const x of DIAS) for (const id of POOL.preguntasDeCapitulo(x.capId).map((q) => q.id)) { usadosPool.add(id); usar(poolAProMIR(id)); }
for (const x of DIAS) {
  D_ACTUAL = x.d;
  const med = cargarMedicion(x.capId);
  const us = unidades(med);
  const pool = POOL.preguntasDeCapitulo(x.capId).map((q) => q.id).sort();
  const secDeProMIR = (pid) => us.find((u) => u.citas.includes(pid));
  // pre-test: las del pool de la app (hasta 5); si faltan, se completa con citadas ≥2015 de las secciones de más peso
  const pre = pool.slice(0, 5).map((id) => { const pid = poolAProMIR(id); const u = secDeProMIR(pid); return { id, fuente: 'pool app', promir: pid, url: preguntaUrl(pid), seccion: u ? u.titulo : null }; });
  pre.forEach((p) => { usadosPool.add(p.id); usar(p.promir); });
  const pretestSecs = new Set(pre.map((p) => us.findIndex((u) => u.titulo === p.seccion)).filter((i) => i >= 0));
  // v6.10 · base cero (fix 18-nov): lecQ = la selección por peso de siempre (elegirLectura); en F1 (D2-D32) se LEE la lectura de base sin PARCIAL y el
  //   reparto se rehace con ella (v6.10e: lecQ solo dice si el día cambió y es la selección fuera de F1; el aislamiento de 2027 lo da el pase 1 + VETO)
  const lecQ = elegirLectura(us, pretestSecs);
  const { sel, reserva, minUsados } = baseF1(x) ? elegirLecturaBase(us, pretestSecs) : lecQ;
  const porPeso = us.slice().sort((a, b) => b.score - a.score || a.i - b.i);
  const ordenCitas = (secs) => secs.flatMap((u) => u.citas.map((pid) => ({ pid, u }))).sort((a, b) => b.pid.localeCompare(a.pid));
  if (pre.length < 5) {
    for (const { pid, u } of ordenCitas(porPeso.filter((u) => u.citasDesde2015 > 0)).filter((c) => +c.pid.slice(0, 4) >= 2015)) {
      if (pre.length >= 5) break; if (usadosProMIR.has(pid) || vetada(pid) || noServible(pid)) continue;
      pre.push({ id: null, fuente: 'citada ProMIR', promir: pid, url: preguntaUrl(pid), seccion: u.titulo }); usar(pid);
    }
  }
  if (pre.length < 5) { // v6.03: capítulo con pocas citadas ≥2015 libres (D22 · D48 · D60) → se completa con las anteriores del MISMO capítulo, más recientes primero
    for (const { pid, u } of ordenCitas(porPeso)) {
      if (pre.length >= 5) break; if (usadosProMIR.has(pid) || usadosPool.has(proMIRAPool(pid)) || vetada(pid) || noServible(pid) || pre.some((p) => p.promir === pid)) continue;
      pre.push({ id: null, fuente: 'citada ProMIR', promir: pid, url: preguntaUrl(pid), seccion: u.titulo }); usar(pid);
    }
  }
  // D1 (sin anclas ni cierre): 5Q ciegas EXTRA = citadas ≥2015 de las secciones de más peso, reservadas ANTES del quiz
  const sinEval = !MD.mirCierreDe(x.d) && !MD.mirAnclas(x.d).d1;
  const extra = [];
  if (sinEval) {
    for (const { pid, u } of ordenCitas(porPeso).filter((c) => +c.pid.slice(0, 4) >= 2015)) {
      if (extra.length >= 5) break; if (usadosProMIR.has(pid) || usadosPool.has(proMIRAPool(pid)) || vetada(pid) || noServible(pid)) continue;
      extra.push({ promir: pid, url: preguntaUrl(pid), seccion: u.titulo }); usar(pid);
    }
  }
  // quiz 8-10Q + anclas futuras: citadas de las secciones LEÍDAS (más recientes primero); si no llegan, del resto por peso
  const fuenteQuiz = ordenCitas(sel).concat(ordenCitas(porPeso.filter((u) => !sel.some((s) => s.i === u.i))));
  const libres = fuenteQuiz.filter((c) => !usadosProMIR.has(c.pid) && !usadosPool.has(proMIRAPool(c.pid)) && !vetada(c.pid) && !noServible(c.pid));
  const vistos = new Set(); const dedup = libres.filter((c) => !vistos.has(c.pid) && vistos.add(c.pid));
  // el pool de la app que no cabe en el pre-test (capítulos con >5) abre el quiz: se responde en la app, con clave oficial y qIds
  const quizPool = pool.slice(5).slice(0, QUIZ_MAX).map((id) => { const pid = poolAProMIR(id); const u = secDeProMIR(pid); return { id, fuente: 'pool app', promir: pid, url: preguntaUrl(pid), seccion: u ? u.titulo : null, leida: !!u && sel.some((s) => s.i === u.i) }; });
  // v6.03: con los 76 capítulos, los de pocas preguntas citadas se quedaban sin anclas (D-1/D-3/D-7 sin pregunta) → el quiz cede hasta 4
  // citadas a las anclas futuras (2Q D-1 + 1Q D-3 + 1Q D-7) sin bajar de QUIZ_N (8); con ≥14 libres sigue siendo de 10.
  const ANCLAS_N = 4;
  const nCit = Math.max(0, Math.min(QUIZ_MAX - quizPool.length, Math.max(QUIZ_N - quizPool.length, dedup.length - ANCLAS_N)));
  // v6.10 · base cero (fix 18-nov) · v6.10e (revisión del 18-nov · mir-3, regresiones-1): en F1 (D2-D32) el reparto se REHACE con la lectura de base (no
  //   es «el mismo conjunto» de la selección por peso: lecQ solo decide si el día cambió): `dedup` ya trae primero las citadas de las secciones leídas hoy
  //   (más recientes primero) y cada pregunta lleva la sección leída que la cita (si la hay). Fuera de F1, reparto = dedup (sin cambio).
  let reparto = dedup;
  const leidaDe = (pid) => sel.find((s) => s.citas.includes(pid));
  if (sel !== lecQ.sel) {
    const U = dedup.map((c) => ({ pid: c.pid, u: leidaDe(c.pid) || c.u }));
    reparto = U.filter((c) => !!leidaDe(c.pid)).concat(U.filter((c) => !leidaDe(c.pid)));
  }
  // v6.10e (regresiones-1): en la LECTURA DE BASE de F1 las 6 primeras del quiz (las que se hacen) son de lo que se LEE hoy: si el pool oficial que no
  //   entró en el pre-test ocupa la lista con secciones que hoy no se leen, entran citadas de lo leído hasta tener 6 leídas (QUIZ_HACER; sin quitar las 4 anclas)
  //   y, si aun así faltan, citadas de repaso de capítulos ya leídos (abajo). La lista puede pasar de 10: lo que no se hace sigue en la cola del capítulo.
  let nCitQ = nCit;
  if (baseF1(x)) {
    let citL = 0; while (citL < reparto.length && leidaDe(reparto[citL].pid)) citL++;
    nCitQ = Math.max(nCit, Math.min(QUIZ_HACER - quizPool.filter((q) => q.leida).length, citL, reparto.length - ANCLAS_N));
  }
  const quiz = quizPool.concat(reparto.slice(0, nCitQ).map((c) => ({ id: null, fuente: 'citada ProMIR', promir: c.pid, url: preguntaUrl(c.pid), seccion: c.u.titulo, leida: sel.some((s) => s.i === c.u.i) })));
  quiz.forEach((q) => usar(q.promir));
  // v6.03: capítulo con pocas preguntas citadas → el quiz se completa hasta QUIZ_N con citadas no usadas de capítulos YA leídos (misma
  // asignatura primero —interleaving del bloque—, luego el resto de días previos), más recientes primero; quedan marcadas `deDia`.
  // v6.10e (regresiones-1): en la lectura de base de F1, también hasta tener 6 (QUIZ_HACER) preguntas de lo leído (hoy o en días previos)
  const faltanLeidas = () => baseF1(x) && quiz.filter((q) => q.leida).length < QUIZ_HACER;
  const basta = () => quiz.length >= QUIZ_N && !faltanLeidas();
  if (!basta()) {
    const previos = Object.values(CAP).filter((c) => c.x.d < x.d).sort((a, b) => (b.x.num === x.num) - (a.x.num === x.num) || b.x.d - a.x.d);
    for (const c of previos) {
      for (const { pid, u } of c.us.flatMap((u) => u.citas.map((pid) => ({ pid, u }))).sort((a, b) => b.pid.localeCompare(a.pid))) {
        if (basta()) break;
        if (usadosProMIR.has(pid) || usadosPool.has(proMIRAPool(pid)) || vetada(pid) || noServible(pid)) continue;
        quiz.push({ id: null, fuente: 'citada ProMIR · repaso', promir: pid, url: preguntaUrl(pid), seccion: u.titulo, leida: true, deDia: c.x.d, tema: c.x.tema });
        usar(pid);
      }
      if (basta()) break;
    }
  }
  // v6.10e (revisión del 18-nov · regresiones-1): en la LECTURA DE BASE de F1 el quiz ABRE con las preguntas de lo que se lee hoy (del pool oficial o
  //   citadas, más las de repaso de capítulos ya leídos) y las del pool de secciones que hoy no se leen pasan al final de la lista (= la cola del capítulo:
  //   2.ª vuelta y eval de mañana cuando le faltan anclas). Antes el pool abría siempre el quiz aunque preguntara secciones fuera de la lectura (D6: 1 de las
  //   6 primeras era de lo leído).
  if (baseF1(x)) { const leidas = quiz.filter((q) => q.leida), noLeidas = quiz.filter((q) => !q.leida); quiz.splice(0, quiz.length, ...leidas, ...noLeidas); }
  const sigue = reparto.slice(nCitQ);
  ANCLAS[x.d] = { d1: sigue.slice(0, 2), d3: sigue.slice(2, 3), d7: sigue.slice(3, 4) };
  for (const a of [].concat(ANCLAS[x.d].d1, ANCLAS[x.d].d3, ANCLAS[x.d].d7)) usar(a.pid);
  const minCompleta = r05(us.reduce((s, u) => s + u.min, 0));
  CAP[x.d] = { x, med, us, pool, pre, sel, reserva, minUsados, quiz, minCompleta, extra };
}

// ── v6.10 · tanda C: D1 con el reloj decidido con Joseph (chat MIR, 17-nov) ──────────────────────────────────────────────────────────────
const D1_RELOJ = ['15:15', '15:23', '15:26', '15:52', '16:05', '16:12', '16:15'];
const D1_LECTURA_BASE = ['2.', '3.', '3.1.', '3.2.', '3.3.', '3.4.', '4.', '6.1.', '6.2.', '8.4.']; // §2 → §3 (cabecera + 3.1-3.4) → §4 → §6.1 → §6.2 → §8.4
const D1_LECTURA_SOBRA = ['9.', '9.1.']; // «el §9 solo si sobra tiempo»: sobra (la base mide ≈19′) → entra en orden lo que cabe; 9.2-9.3, 2.ª vuelta
const D1_QUIZ = { obj: 7, min: 6, max: 8, tope: 10 }; // «quiz de 6-8 comentadas (máx. 10)»: el paso se mide con el objetivo (7)
const D1_SEG_TITULO = 4; // recorrer cada título del índice ≈ 4 s
const D1_MIN_REGISTRO = 1; // registrar las 5 del pre-test en la app (A/F) ≈ 1′
const m150u = (u) => u.palabras / PPM_REGLA + u.palabrasTabla / RITMO.tablaPpm + u.figs * RITMO.figuraMin + u.clips.reduce((a, v) => a + v.seg, 0) / 60;
const porPref = (us, prefs) => prefs.map((pr) => { const u = us.find((y) => y.titulo.startsWith(pr + ' ')); if (!u) throw new Error(`D1: no existe la sección «${pr}» del capítulo`); return u; });
function pasosD1(d) {
  const { x, med, us, pool, pre, quiz, minCompleta, extra } = CAP[d];
  const deck = ANKI.mirAnkiDeck(x.asignatura);
  const H = (i) => `${D1_RELOJ[i]}–${D1_RELOJ[i + 1]}`;
  const mins = D1_RELOJ.slice(1).map((h, i) => { const a = D1_RELOJ[i].split(':').map(Number), b = h.split(':').map(Number); return b[0] * 60 + b[1] - a[0] * 60 - a[1]; });
  const base = porPref(us, D1_LECTURA_BASE), sobra = porPref(us, D1_LECTURA_SOBRA);
  const mBase = base.reduce((a, u) => a + m150u(u), 0), mSobra = sobra.reduce((a, u) => a + m150u(u), 0), mLect = mBase + mSobra;
  const nSec = us.filter((u) => u.nivel !== 'H2').length;
  const rv = (METODO.anki.raviPorCap || {})[x.capId]; const mazo = METODO.anki.mazoBase;
  if (!rv) throw new Error(`D1: falta el conteo de tarjetas de Ravi del capítulo ${x.capId} en metodo_ravimedtest.json`);
  const colaMan = colaEvalDe(d + 1);
  const aMan = colaMan && colaMan.dC === d ? `${colaMan.n === 1 ? 'La primera que no entre abre' : `Las ${colaMan.n} primeras que no entren abren`} la eval de mañana (${fmtF(colaMan.fecha)} 15:15) · ` : '';
  const qS = (n) => dec1((n * (SEG_POR_Q + SEG_COMENTARIO)) / 60);
  const lst = (xs) => xs.map((u) => `${u.titulo.split(' ')[0]} ${dec1(m150u(u))}′`).join(' · ');
  // v6.10 · base cero (fix 18-nov): la cobertura del día y el destino del resto, al principio del «cómo» (como en D2-D32); la lista no cambia
  // v6.10 · base cero (fix 18-nov) · v6.10e (revisión del 18-nov · dias-1920-2): la cobertura del día y el destino del resto, al principio del «cómo» y a
  //   150 palabras/min (la unidad del paso): lo FIJO (la base) y lo opcional (el §9) por separado, y si el §9 o el 9.1 no entran, van con el resto a la 2.ª vuelta
  const cob = cobertura150(us, base, false), cobSobra = Math.round(mSobra * 10) / 10, pctMax = Math.round((100 * (cob.minLeidos + cobSobra)) / cob.minCapitulo);
  const restoD1 = cobertura150(us, [...base, ...sobra], false);
  const cobD1 = `Hoy lees ${dec1(cob.minLeidos)}′ (+ ${dec1(cobSobra)}′ del §9) de ${dec1(cob.minCapitulo)}′ (${cob.pct}-${pctMax} %) · resto → ${VUELTA2C}: ${restoTxt(restoD1)} y, si hoy no entran, el §${sobra.map((u) => u.titulo.split(' ')[0].replace(/\.$/, '')).join(' y el §')} · todo a ${PPM_REGLA} palabras/min`;
  const pasos = [
    // v6.10l (auditoría c15): «es la línea base, no la nota» ya lo dice el «qué»; sin repetirlo, la regla del blanco entra entera en los 110 del Calendar
    //   (antes el corte dejaba «…; la regla del blanco …»)
    // v6.10m (ronda c16, área MIR): el ritmo («77 s/Q (5Q ≈ 6,4′)») pasa al final del «qué» (cabe en los 150 del Calendar con la hora); en el «cómo» quedaba
    //   detrás de la regla del blanco y el corte de 110 lo escondía. La cuenta del paso sigue en el «cómo» (6,4′ + 1′ de registro = 7,4′)
    { min: mins[0], hora: H(0), que: `PRE-TEST 5Q ciegas del capítulo nuevo (${pre.filter((p) => p.fuente === 'pool app').length} del pool oficial) · línea base, no nota · ${SEG_POR_Q} s/Q (5Q ≈ ${dec1((5 * SEG_POR_Q) / 60)}′)`,
      como: `Contesta las 5 aunque adivines (si no sabes, marca A); la regla del blanco empieza en el quiz · sin leer nada · las 5Q (≈ ${dec1((5 * SEG_POR_Q) / 60)}′) + registrarlas en la app (kind pretest, ≈${D1_MIN_REGISTRO}′) = ${dec1((5 * SEG_POR_Q) / 60 + D1_MIN_REGISTRO)}′ · la sección de cada pregunta la miras DESPUÉS de contestar las 5 (antes no: con la lista de lectura delataría la clave).` },
    { min: mins[1], hora: H(1), que: `Orientación MIR + títulos de las ${nSec} secciones (sin leer el texto)`,
      como: `Lee el recuadro «Orientación MIR» (≈${ORIENT_MIN}′) y recorre en orden los ${nSec} títulos del capítulo (≈${D1_SEG_TITULO} s cada uno ≈ ${dec1((nSec * D1_SEG_TITULO) / 60)}′): solo títulos, sin leer el texto.`, enlace: { t: 'Capítulo ProMIR', url: capUrl(x.capId) } },
    // la lista entera dentro de los 150 caracteres del «qué» del Calendar (con la hora delante); los minutos medidos, en el «cómo»
    { min: mins[2], hora: H(2), que: `LECTURA DE BASE ${mins[2]}′ en orden, cada apartado entero · §2 → §3 (cabecera + 3.1-3.4) → §4 → §6.1 → §6.2 → §8.4; el §9 solo si sobra tiempo`,
      como: `${cobD1} · Desde cero, en el orden del capítulo y cada apartado entero (Whole Page Rule): ${lst(base)} = ${dec1(mBase)}′ a ${PPM_REGLA} palabras/min (la regla fija en español; tablas a ${RITMO.tablaPpm}, ${String(RITMO.figuraMin).replace('.', ',')}′ por figura) → sobran ${dec1(mins[2] - mBase)}′ y entra el §9 en orden: ${lst(sobra)} = ${dec1(mSobra)}′ (total ${dec1(mLect)}′ medidos a ${PPM_REGLA} palabras/min); 9.2-9.3 quedan para la 2.ª vuelta. Por cada duda o fallo del pre-test, la regla en el Shopping List.`, enlace: { t: `ProMIR · ${x.tema}`, url: capUrl(x.capId) } },
    { min: mins[3], hora: H(3), que: `${D1_QUIZ.min}-${D1_QUIZ.max}Q comentadas (máx. ${D1_QUIZ.tope}) — objetivo ${D1_QUIZ.obj} — de la lista de ${quiz.length} · preguntas MIR citadas en las secciones que acabas de leer`,
      // v6.10j (auditoría c14): la regla misma antes que su presentación (el Calendar cortaba en «La regla del blanco empieza aquí: …» y la escondía)
      // v6.10l (auditoría c15, vetadas #22): la regla entera ABRE el «cómo» («Desde aquí, en blanco si no descartas 2; con 2, marca»: también cuándo SÍ se
      //   marca) y detrás la cola de la eval de mañana, con su fecha (el Calendar alarga el corte hasta el final de esa cláusula); antes el corte dejaba
      //   «… en blanco si no descartas 2 …», con la cifra sola al final
      // v6.10m (ronda c16, área MIR): el ritmo con su resultado («7Q ≈ 12,5′ (77 s/Q + 30 s de comentario = 107 s/Q)») va detrás de la regla y delante de la
      //   cola de mañana: el Calendar alarga el corte hasta la fecha de la cola y así se ven los tres (antes el ritmo iba tras «tapa las opciones» y se perdía)
      // v6.10o (ronda c17, área MIR · cambios-c17 #8): «tapa las opciones · Rule-In → Rule-Out» va detrás de la regla y delante del ritmo, como en el D3/D4
      //   (con el ritmo delante de la cola, el D1 era el único quiz MIR sin «tapa las opciones» a la vista); el ritmo sigue empezando dentro de los 110 y la
      //   cola de mañana, a la vista porque el Calendar alarga el corte hasta el final de la cláusula de su fecha
      como: `Desde aquí, en blanco si no descartas 2; con 2, marca · tapa las opciones · Rule-In → Rule-Out · ${D1_QUIZ.obj}Q ≈ ${qS(D1_QUIZ.obj)}′ (${SEG_POR_Q} s/Q + ${SEG_COMENTARIO} s de comentario = ${SEG_POR_Q + SEG_COMENTARIO} s/Q) · ${aMan ? aMan.charAt(0).toLowerCase() + aMan.slice(1) : ''}${D1_QUIZ.min}Q ≈ ${qS(D1_QUIZ.min)}′ y ${D1_QUIZ.max}Q ≈ ${qS(D1_QUIZ.max)}′; la ${D1_QUIZ.max + 1}.ª y la ${D1_QUIZ.tope}.ª solo si vas rápido · registra en la app (kind quiz): <60 % = tema caliente en la próxima sesión · orden: el de la lista; a las ${D1_RELOJ[4]} paras donde estés: las de la lista que no entren siguen en la cola del capítulo (y abren la eval de mañana). Pool oficial de la app para este capítulo: ${pool.length}Q (todas en el pre-test) → el quiz sale de las ${med.totCitas} preguntas MIR citadas en el capítulo. Lista, en orden: ${quiz.map((q) => q.promir).join(' · ')} (${DONDE_IDS}).` },
    { min: mins[4], hora: H(4), que: `≤4 APEX en ${deck}`, como: 'Solo de los fallos de hoy (pre-test y quiz), ≈2′ por tarjeta: pregunta SAQ + por qué + 🇪🇸 delta si aplica + tag sys:: del sistema USMLE · creados directamente en Anki.' },
    { min: mins[5], hora: H(5), que: `REPASO EN BLANCO + reactivar las ${rv.n} tarjetas de Ravi del ${rv.tema} («${mazo}»)`,
      // v6.10j (auditoría c14, vetadas #6): los temas del repaso, fuera del paréntesis y antes del carácter 109 (el Calendar cortaba en «intención de tratar vs …»)
      como: `2′ en blanco, sin mirar: fases · aleatorización · intención de tratar vs por protocolo · no inferioridad (todo lo que recuerdes del capítulo). 1′ en Anki: Navegador → mazo «${mazo}» → busca el ${rv.tema} → sus ${rv.n} tarjetas → Reactivar (Ctrl+J); entran en el repaso desde la próxima sesión (Anki solo repasa lo ya estudiado).` },
  ];
  const totalMin = pasos.reduce((a, p) => a + p.min, 0);
  const preguntas = { pretest: pre, quiz, extraD1: extra };
  const recursos = [
    { t: `ProMIR · ${x.tema} (capítulo completo)`, url: capUrl(x.capId), min: minCompleta, cantidad: `${med.totPalabras.toLocaleString('es-ES')} palabras de texto + ${med.totPalabrasTabla} en tablas · ${nSec} secciones · ${med.totFigs} figuras · ${med.totTablas} tablas · audio «escuchar todo el tema» (duración no medida)` },
    { t: 'Preguntas MIR citadas en el capítulo (chips «MIR AAAA-AAAA, Pnnn» → /pregunta/MIR/…)', url: capUrl(x.capId), cantidad: `${med.totCitas} (≥2015: ${us.reduce((a, u) => a + u.citasDesde2015, 0)} · ≥2020: ${us.reduce((a, u) => a + u.citasDesde2020, 0)})` },
    { t: 'Pool oficial de la app (MIR 2022-2026) de este capítulo', url: capUrl(x.capId), cantidad: `${pool.length}Q (${pool.join(' · ')})` },
    ...extra.map((c, i) => ({ t: `Reserva opcional (fuera de la hora) · 5Q ciegas ${i + 1}/5 · MIR ${c.promir}`, url: c.url })),
  ];
  return {
    bloque: {
      franja: `${D1_RELOJ[0]}–${D1_RELOJ[D1_RELOJ.length - 1]}`, plan: 'MIR', titulo: `MIR D${d}/78 · ${x.asignatura} — ${x.tema}`, totalMin, pasos, recursos,
      hecho: `Pre-test 5Q registrado (línea base) + lectura de base en orden (+ el §9 con lo que sobre) + ${D1_QUIZ.min}-${D1_QUIZ.max}Q del quiz registradas + ≤4 APEX de los fallos + repaso en blanco + las ${rv.n} tarjetas de Ravi del ${rv.tema} reactivadas.`,
      // v6.10r (chat MIR, hallazgo 9): las MISMAS preguntas de hoy (antes «pool oficial de la app … 5Q del capítulo + 25 de Epidemiología» y la nota madre)
      planB: planBMir(preguntas, pasos, 'pre-test 5Q + §2 y §3 de la lectura de base (15′).'),
    },
    preguntas,
    lectura: {
      minUsados: r05([...base, ...sobra].reduce((a, u) => a + u.min, 0)), ritmo: RITMO, min150: Math.round(mLect * 10) / 10, minPaso: mins[2], d1: { base: Math.round(mBase * 10) / 10, sobra: Math.round(mSobra * 10) / 10 },
      cobertura: { ...cob, minOpcional: cobSobra, pctMax }, // v6.10 · base cero (fix 18-nov) · v6.10e: a 150 palabras/min, con lo opcional aparte
      secciones: [...base, ...sobra].map((u) => ({ titulo: u.titulo, min: u.min, minLeer: u.min, parcial: false, palabras: u.palabras, palabrasTabla: u.palabrasTabla, figs: u.figs, citasMIR: u.citasMIR, citasDesde2015: u.citasDesde2015, citasDesde2020: u.citasDesde2020, clips: u.clips })),
      reserva: us.filter((u) => u.titulo.startsWith('9.2. ') || u.titulo.startsWith('9.3. ')).map((u) => ({ titulo: u.titulo, min: u.min, citasMIR: u.citasMIR })),
      paraElRepaso: { min: r05(minCompleta - [...base, ...sobra].reduce((a, u) => a + u.min, 0)), donde: `${VUELTA2} · el audio «escuchar todo el tema» de ProMIR es opcional en tiempos muertos (no está en el plan)`, secciones: us.filter((u) => u.nivel !== 'H2' && !base.some((b) => b.i === u.i)).map((u) => `${u.titulo} ${u.min}′${sobra.some((b) => b.i === u.i) ? ' (si hoy no entra)' : ''}`) }, // v6.10e (dias-1920-2): el §9 y el 9.1, si no entran
    },
  };
}

function pasosDia(d) {
  if (d === 1 && !MD.mirCierreDe(d) && !MD.mirAnclas(d).d1) return pasosD1(d); // v6.10 · tanda C
  const { x, med, us, pool, pre, sel, reserva, minUsados, quiz, minCompleta } = CAP[d];
  const L1 = enLote1t(x); // v6.09b · lote 1-ter: F1 desde el D2 (v6.10: por D, no por fecha)
  const LP = lectF1(x); // v6.10: pre-test 7′ + lectura 16′ también en el D1
  const deck = ANKI.mirAnkiDeck(x.asignatura);
  const cierre = MD.mirCierreDe(d);
  const anc = MD.mirAnclas(d);
  const pasos = []; const preguntas = {};
  D_ACTUAL = d; // v6.10 · base cero (fix 18-nov): el cierre es una decisión de este día (VETO)
  if (cierre) {
    const num = cierre.num;
    const sinUsar = POOL.preguntasDeAsignatura(num).map((q) => q.id).filter((id) => !usadosPool.has(id) && !usadosProMIR.has(poolAProMIR(id)) && !vetada(poolAProMIR(id))).sort().reverse();
    const ids = sinUsar.slice(0, 10); ids.forEach((id) => { usadosPool.add(id); usar(poolAProMIR(id)); });
    preguntas.cierre = ids.map((id) => ({ id, fuente: 'pool app', promir: poolAProMIR(id), url: preguntaUrl(poolAProMIR(id)) }));
    // v6.03: si el pool de la asignatura no llega a 10 (sus capítulos del plan ya lo consumieron), se completa con preguntas MIR citadas en los
    // capítulos del bloque recién cerrado que no salieron en ningún paso (≥2015 primero; dentro, más recientes primero)
    const citBloque = Object.values(CAP).filter((c) => c.x.d >= cierre.dIni && c.x.d <= cierre.dFin).flatMap((c) => c.us.flatMap((u) => u.citas.map((pid) => ({ pid, u, c }))))
      .filter((y) => !usadosProMIR.has(y.pid) && !usadosPool.has(proMIRAPool(y.pid)) && !vetada(y.pid) && !noServible(y.pid))
      .sort((a, b) => (+b.pid.slice(0, 4) >= 2015) - (+a.pid.slice(0, 4) >= 2015) || b.pid.localeCompare(a.pid));
    const vistosCierre = new Set();
    for (const y of citBloque) {
      if (preguntas.cierre.length >= 10) break;
      if (vistosCierre.has(y.pid)) continue; vistosCierre.add(y.pid);
      preguntas.cierre.push({ id: null, fuente: 'citada ProMIR', promir: y.pid, url: preguntaUrl(y.pid), seccion: y.u.titulo, deDia: y.c.x.d });
      usar(y.pid);
    }
    const nCitCierre = preguntas.cierre.length - ids.length;
    // v6.10i (remate, revisión adversarial del 18-nov): la FUENTE abre el «cómo» y dice primero cuántas salen de cada sitio (el Calendar lo corta a 110: con
    //   el pool agotado se leía «(0 de Gastroenterología …» como si no hubiera preguntas para un test de 10Q)
    // v6.10j (auditoría c14, diffs #3): el «cómo» ABRE con el reloj y la regla del blanco y sigue con la fuente en corto («N del pool oficial + M MIR
    //   citadas en el bloque Dx-Dy»): todo en los 110 caracteres del Calendar (antes la fuente larga iba primero y escondía el blanco en los 13 cierres y el
    //   cronómetro en 6). El detalle de la fuente y lo que quedaba del pool van detrás.
    const fuenteCierre = nCitCierre
      ? `${ids.length ? `${ids.length} del pool oficial + ` : ''}${nCitCierre} MIR citadas en el bloque D${cierre.dIni}-D${cierre.dFin} · todas sin usar (las citadas: en los capítulos del bloque y en ningún paso, ≥2015 primero; ${ids.length ? `el resto del pool de ${cierre.asignatura}` : `el pool oficial de ${cierre.asignatura}`} ya lo consumieron sus capítulos del plan)`
      : `${ids.length} del pool oficial de la app sin usar`;
    const quedaban = nCitCierre ? '' : ` Quedaban ${sinUsar.length} de ${cierre.asignatura} sin usar tras los pre-tests.`;
    // v6.10l (auditoría c15, diffs #39): «cronometradas» vuelve al «qué» (el «cómo» ya no tiene sitio en sus 110: reloj, blanco y fuente)
    pasos.push({ min: 15, hora: '15:15–15:30', que: `TEST DE CIERRE · 10Q reales MIR cronometradas de ${cierre.asignatura} (bloque D${cierre.dIni}-D${cierre.dFin} cerrado)`, como: `${String(MD.mirMinutos(10)).replace('.', ',')}′ (${SEG_POR_Q} s/Q) · en blanco si no descartas 2 · Fuente: ${fuenteCierre} · neto = A − F/3 → ≥70 % consolidada · 55-69 % intermedia · <55 % la asignatura entra en las anclas D-7 · 2′ para registrar (kind cierre). Hoy no hay eval anclada ni Anki en esta franja (los sustituye el cierre).${quedaban}` });
  } else if (!anc.d1) { // D1: sin anclas (el primer día del plan)
    pasos.push({ min: 5, hora: '15:15–15:20', que: `ARRANQUE (D1 no tiene anclas) · Anki: crear el mazo ${deck}`, como: 'Preset FSRS de APEX::MIR (retention 0,85; DATA/MIR/README.md §5). Sin tarjetas nuevas todavía: las crean los APEX de las 16:05.' });
    // 5Q ciegas extra (citadas ≥2015 de las secciones de más peso, distintas del pre-test; reservadas en el primer pase)
    const extra = CAP[d].extra;
    if (extra.length !== 5) throw new Error('D' + d + ': 5Q ciegas extra → ' + extra.length);
    preguntas.extraD1 = extra;
    pasos.push({ min: 3, hora: '15:20–15:23', que: 'Recuadro «Orientación MIR» del capítulo + mapa de secciones (sin leer el texto)', como: 'Lee solo el recuadro y recorre los títulos: las secciones marcadas en la «Lectura dirigida» son las que concentran las preguntas MIR citadas.', enlace: { t: 'Capítulo ProMIR', url: capUrl(x.capId) } });
    pasos.push({ min: 7, hora: '15:23–15:30', que: `5Q CIEGAS extra · preguntas MIR ≥2015 citadas en el capítulo (${extra.map((c) => c.promir).join(' · ')})`, como: 'Abre cada enlace (ProMIR → pregunta: el botón de este paso = la 1.ª; las 5 están en los recursos de la tarjeta), responde SIN leer, 77 s/Q, en blanco si no descartas 2 · apunta acierto/fallo: cada fallo marca la sección a leer en la lectura dirigida.', enlace: { t: `1.ª de 5 · MIR ${extra[0].promir}`, url: extra[0].url } }); // v6.02c F2 (E6): enlace directo
  } else {
    const slots = [];
    if (anc.d1) slots.push({ k: 'D-1', d: anc.d1.d, n: 2, ids: ANCLAS[anc.d1.d].d1 });
    if (anc.d3) slots.push({ k: 'D-3', d: anc.d3.d, n: 1, ids: ANCLAS[anc.d3.d].d3 });
    if (anc.d7) slots.push({ k: 'D-7', d: anc.d7.d, n: 1, ids: ANCLAS[anc.d7.d].d7 });
    const nQ = slots.reduce((s, y) => s + y.n, 0);
    const cortos = slots.filter((y) => y.ids.length < y.n); // v6.03: capítulos de pocas citadas → la eval repite un fallo de ese día
    preguntas.eval = slots.map((y) => ({ slot: y.k, dia: y.d, tema: CAP[y.d].x.tema, preguntas: y.ids.map((c) => ({ promir: c.pid, url: preguntaUrl(c.pid), seccion: c.u.titulo })) }));
    // v6.10e (dias-1920-11): los ids de las ancladas, al final del propio paso («las listadas» no estaban en la tarjeta del Home; al final, para no mover el corte del Calendar)
    const idsEval = slots.filter((y) => y.ids.length).map((y) => `${y.k} ${y.ids.map((c) => c.pid).join(' · ')}`).join(' + ') || 'las de los días anclados';
    const minQ = Math.ceil((nQ * SEG_POR_Q) / 60);
    const nListadas = slots.reduce((s0, y) => s0 + y.ids.length, 0); // v6.10l: las ancladas LISTADAS (un slot corto repite un fallo: lo dice el texto)
    // v6.09b · lote 1-ter: en F1 (D2-D32) la eval de 4Q dura su cronómetro (6′) y el minuto pasa al Anki
    const evalMin = L1 && nQ === 4 ? minQ : 7; const hEval = `15:${15 + evalMin}`;
    const cola = colaEvalDe(d); // v6.09b · lote 1-quater: F1 con 2-3Q ancladas → 4Q comentadas con la cola del quiz del D-1
    const nomD = (dd) => `D${dd} ${CAP[dd].x.tema.split(' (')[0]}`;
    if (cola) {
      const qc = CAP[cola.dC].quiz.slice(QUIZ_HACER); // la 7.ª-10.ª de la lista del quiz del D-1 (las que su paso no pide: 6Q, máx. 8)
      // aunque ayer llegara a la 8.ª (máx.), quedan ≥ n en la cola
      if (qc.length - (QUIZ_HACER_MAX - QUIZ_HACER) < cola.n) throw new Error(`D${d}: la cola del quiz del D${cola.dC} no llega a ${cola.n}Q aunque ayer pararas en la ${QUIZ_HACER_MAX}.ª`);
      const pos = `la ${QUIZ_HACER + 1}.ª-${QUIZ_HACER + qc.length}.ª de su lista`;
      preguntas.eval.push({ slot: 'cola D-1', dia: cola.dC, tema: CAP[cola.dC].x.tema, posiciones: pos, n: cola.n, preguntas: qc.map((q) => ({ promir: q.promir, url: q.url, seccion: q.seccion })) });
      const tot = nQ + cola.n;
      const lasN = `${cola.n === 1 ? 'la primera' : `las ${cola.n} primeras`} de su lista que no hiciste ayer (${cola.n === 1 ? `la ${QUIZ_HACER + 1}.ª` : `la ${QUIZ_HACER + 1}.ª y la ${QUIZ_HACER + 2}.ª`} si paraste en la ${QUIZ_HACER}.ª)`;
      const faltan = !anc.d3 ? 'no existen D-3/D-7 todavía' : 'no existe D-7 todavía';
      pasos.push({
        min: evalMin, hora: `15:15–${hEval}`,
        que: `EVAL ANCLADA ${nQ}Q + ${cola.n}Q de la cola del quiz del D${cola.dC} · ${tot}Q comentadas (${tot} × ${SEG_EVAL_COMENTADA} s = ${dec1((tot * SEG_EVAL_COMENTADA) / 60)}′) · ${slots.map((y) => `${y.n}Q ${y.k} (${nomD(y.d)})`).join(' + ')} · cola del quiz del D${cola.dC}: ${pos} (${qc.map((q) => q.promir).join(' · ')})`,
        // v6.10j (auditoría c14, vetadas #1): la regla del blanco y la FUENTE de las ancladas abren el «cómo» (los 110 caracteres del Calendar); el reloj, detrás
        // remate v6.10j (revisión adversarial, visibilidad #5): el ritmo (77 s/Q + 30 s de comentario) también dentro de los 110: con la fuente delante, el
        //   corte escondía el cronómetro
        // v6.10l (auditoría c15, diffs #39): «cronómetro» vuelve al principio («cronómetro 7′ (77 s/Q + 30 s)»), dentro de los 110 con el blanco y la fuente
        como: `cronómetro ${evalMin}′ (${SEG_POR_Q} s/Q + ${SEG_COMENTARIO} s) · en blanco si no descartas 2 · 1.º las ${nQ} ancladas: citadas ProMIR y no usadas. Son de lo que leíste ese día. Después ${lasN}: hoy solo hay ${nQ}Q ancladas (${faltan}) y el hueco lo llena material del plan, no el Anki · reparto de los ${evalMin}′: ${tot}Q a ${SEG_POR_Q} s + ${SEG_COMENTARIO} s de comentario (${SEG_EVAL_COMENTADA} s/Q): ${nQ} ancladas ≈ ${dec1((nQ * SEG_EVAL_COMENTADA) / 60)}′ + ${cola.n} de la cola ≈ ${dec1((cola.n * SEG_EVAL_COMENTADA) / 60)}′ · registra las ${tot} juntas en el log de las 15:27 (aciertos/${tot})${cola.dC === 1 && CAP[1].extra.length ? ` · si ayer llegaste a la ${D1_QUIZ.max + 1}.ª o la ${D1_QUIZ.tope}.ª, completa con la reserva del D1 (5Q ciegas: ${CAP[1].extra.map((c) => c.promir).join(' · ')})` : ''}${cortos.length ? ` · ${cortos.map((y) => `${y.k} (D${y.d}) ${y.ids.length ? `solo trae ${y.ids.length} de ${y.n}` : 'no trae pregunta nueva'}`).join(' · ')}: su capítulo ya no tiene preguntas citadas sin usar → repite la que FALLASTE ese día (pre-test o quiz; si acertaste todo, la más difícil)` : ''} · si la app te propone un tema 🔥 caliente (gate), manda la app. Ancladas: ${idsEval} (${DONDE_IDS}).`,
      });
      // v6.10j (auditoría c14, vetadas #1): sin cola (las 4Q de F1 y las 37 evals de 2027), el «cómo» abre con reloj + regla del blanco + la fuente de las
      //   listadas, sin paréntesis («(citadas ProMIR de lo que …» se cortaba con el paréntesis abierto en los 37 eventos de 2027); el cálculo del reloj, detrás
      // v6.10l (auditoría c15, diffs #39): «cronómetro 6′ (77 s/Q)» abre el «cómo» (la palabra se había perdido en las 66 evals) y la fuente de las ancladas
      //   sigue dentro de los 110 («4Q citadas ProMIR de lo que leíste ese día, no usadas»: las LISTADAS; si un slot no trae pregunta nueva, el texto
      //   de detrás dice cuál repite)
    } else pasos.push({ min: evalMin, hora: `15:15–${hEval}`, que: `EVAL ANCLADA ${nQ}Q · ${slots.map((y) => `${y.n}Q ${y.k} (D${y.d} ${CAP[y.d].x.tema.split(' (')[0]})`).join(' + ')}`, como: `cronómetro ${minQ}′ (${SEG_POR_Q} s/Q) · en blanco si no descartas 2 · ${cortos.length
      // remate v6.10l (revisión adversarial · visibilidad): si algún slot repite un fallo, el reparto entero dentro de los 110 («3Q citadas ProMIR + 1 que
      //   fallaste (D-7)»); de dónde son las citadas y la cuenta del reloj, detrás (antes se veía «4 × 77 s = 5,1′ …» y no qué hacer con la 4.ª)
      ? `${nListadas ? `${nListadas}Q ${nListadas === 1 ? 'citada' : 'citadas'} ProMIR + ` : ''}${nQ - nListadas} que fallaste (${cortos.map((y) => y.k).join(', ')}).${nListadas ? ` ${nListadas === 1 ? 'La citada, de lo que leíste ese día, no usada' : 'Las citadas, de lo que leíste ese día, no usadas'}.` : ''}`
      : `${nListadas}Q ${nListadas === 1 ? 'citada' : 'citadas'} ProMIR de lo que leíste ese día, ${nListadas === 1 ? 'no usada' : 'no usadas'}.`}${evalMin !== 7 ? ` ${nQ} × ${SEG_POR_Q} s = ${dec1((nQ * SEG_POR_Q) / 60)}′ en el paso de ${evalMin}′.` : ''}${nQ < 4 ? ` Hoy solo hay ${nQ}Q (no existen D-3/D-7 todavía): los ${7 - minQ}′ que sobran, adelanta el Anki.` : ''}${cortos.length ? ` ${cortos.map((y) => `${y.k} (D${y.d}) ${y.ids.length ? `solo trae ${y.ids.length} de ${y.n}` : 'no trae pregunta nueva'}`).join(' · ')}: su capítulo ya no tiene preguntas citadas sin usar → repite la que FALLASTE ese día (pre-test o quiz; si acertaste todo, la más difícil).` : ''} Si la app te propone un tema 🔥 caliente (gate), manda la app. Ancladas: ${idsEval} (${DONDE_IDS}).` });
    pasos.push({ min: 12 - evalMin, hora: `${hEval}–15:27`, que: `Anki ${deck}`, como: 'FSRS · solo Good/Again · deuda a cero; si no hay repasos, revisa las tarjetas de tu última sesión MIR.' });
    // v6.10h · c12 (auditoría c10): «aciertos/4» pasa al «qué» para que el destino del slot fallado quepa en los 110 caracteres del «cómo» (Calendar)
    pasos.push({ min: 3, hora: '15:27–15:30', que: 'Log de la eval en la app · aciertos/4', como: 'brecha knowledge / transfer / proceso · fallo D-7 → cola D+14 · slot ✗ → tema caliente en la próxima sesión.' });
  }
  // pre-test (v6.09b · lote 1-ter: en F1, 7′ = 5 × 77 s ≈ 6,4′; el minuto pasa a la lectura)
  const preMin = LP ? 7 : 8; const hPre = `15:${30 + preMin}`;
  // v6.10 · base cero (18-nov-2026): fase 1 (F1, D2-D32) = pre-test como LÍNEA BASE (igual que el D1 decidido con Joseph: contesta las 5 aunque adivines; la
  //   regla del blanco va en la eval y el quiz) · fase 2 (2027) = con la regla del blanco; ningún fallo «recorta» la lectura (todas las secciones se leen)
  const fz = faseDe(d);
  // v6.10l (auditoría c15, vetadas #31): «del pool oficial» sin «de la app» y el singular «1 citada»: los días de 5 pasos de 2027 pasaban del máximo del
  //   evento del Calendar y el constructor recortaba el «cómo» del quiz
  const nPreCit = pre.filter((p) => p.fuente !== 'pool app').length;
  // v6.10m (ronda c16, área MIR): en la fase 1 el ritmo («77 s/Q (5Q ≈ 6,4′)») va al final del «qué» (cabe en los 150 del Calendar con la hora); en el
  //   «cómo» iba detrás de la regla del blanco y el corte de 110 lo escondía (en la fase 2 el «cómo» ya abre con él)
  const preQue = `PRE-TEST 5Q ciegas del capítulo nuevo (${pre.filter((p) => p.fuente === 'pool app').length} del pool oficial${nPreCit ? ` + ${nPreCit} ${nPreCit === 1 ? 'citada' : 'citadas'} en ProMIR` : ''})${fz.n === 1 ? ` · línea base, no nota · ${SEG_POR_Q} s/Q (5Q ≈ ${dec1((5 * SEG_POR_Q) / 60)}′)` : ''}`;
  const preComo = fz.n === 1
    // v6.10l (auditoría c15): sin repetir «es la línea base, no la nota» (lo dice el «qué»), la regla del blanco cabe entera en los 110 del Calendar (antes
    //   el corte dejaba «…; la regla …»)
    ? `Base cero: contesta las 5 aunque adivines (si no sabes, marca A); la regla del blanco va en la eval y el quiz · sin leer nada · registra en la app (kind pretest) · la sección de cada pregunta la miras DESPUÉS de contestar las 5 (antes no: con la lista de lectura delataría la clave).`
    : `${LP ? 'Sin leer nada · 77 s/Q (5Q ≈ 6,4′)' : 'Sin leer nada · 77 s/Q'} · fase 2: en blanco si no descartas 2 (la táctica −1/3 ya se entrena desde la primera pregunta) · registra en la app (kind pretest) · cada fallo marca la sección que lees con más atención (no se salta ninguna): la sección de cada pregunta la miras DESPUÉS de contestar las 5 (antes no: con la lista de lectura delataría la clave).`;
  pasos.push({ min: preMin, hora: `15:30–${hPre}`, que: preQue, como: preComo }); // v6.10 · tanda C (regla D) · base cero (fases)
  preguntas.pretest = pre;
  // lectura
  // v6.09b · lote 1-ter: en F1 la lectura es de 16′ con las MISMAS secciones (a 150 palabras/min suman m150′ con el recuadro)
  const m150 = Math.round(min150(sel) * 10) / 10; const lecMin = LP ? LECTURA_MIN + (8 - preMin) : LECTURA_MIN;
  // la lista de apartados de hoy abre el «qué» y cabe entera en el corte del Calendar; los minutos medidos y «en orden, cada apartado entero» van al «cómo»
  // v6.10j (auditoría c14, diffs #2): en la LECTURA DE BASE de F1 los minutos de cada apartado van a 150 palabras/min (suman el «Hoy lees X′» del «cómo»)
  const base = baseF1(x);
  // remate v6.10j (revisión adversarial, verdad #5): si a 150 la lista pasa de los minutos del paso (se elige a 180), la cabecera lo dice en corto («16′
  //   (+2,1′)», para no compactar la lista): los minutos visibles suman los «Hoy lees X′» y ya no contradicen al paso; qué hacer con el
  //   exceso va en el «cómo» (minTxt)
  // v6.10l (auditoría c15, cambios #16): una sola regla para el exceso — la cabecera lo anota siempre que el «cómo» lo diga («16′ (+0,3′)» si la lista suma
  //   16,3′); antes, con 0,1-0,4′, la cabecera decía «16′» y el «cómo» «0,3′ más que el paso» (y el Calendar enseñaba «Hoy lees 16,3′» bajo un «16′»)
  const exceso = base ? Math.round((m150 - lecMin) * 10) / 10 : 0, EXCESO_VISIBLE = 0.1;
  // remate v6.10l (revisión adversarial · visibilidad): si con «(+X′)» la lista ya no cabe con sus minutos (se compacta a títulos) y sin él sí, la cabecera va
  //   sin «(+X′)»: los minutos de cada apartado dicen cómo repartir el paso y el «cómo» ya dice «Hoy lees X′» (D17, D21, D32)
  const cabL = `${fz.n === 1 ? 'LECTURA DE BASE' : 'LECTURA DIRIGIDA'} ${lecMin}′`;
  let qL = queLectura(`${cabL}${exceso >= EXCESO_VISIBLE ? ` (+${dec1(exceso)}′)` : ''}`, sel, base);
  if (exceso >= EXCESO_VISIBLE && qL.nivel > 0) { const q0 = queLectura(cabL, sel, base); if (q0.nivel < qL.nivel) { qL = q0; EXCESO_OMITIDO.add(x.d); } }
  // v6.10 · base cero (18-nov-2026): las MISMAS secciones y minutos; cambia el cómo. Antes «las secciones cuyas preguntas acertaste se saltan y entra la
  //   reserva» (recortaba el temario por el pre-test: Ravi lo desaconseja en 1.ª vuelta y, partiendo de cero, un acierto puede ser suerte) → en el orden
  //   del capítulo, sin saltar ninguna; la reserva solo si sobra tiempo. F1 (fase 1) se llama LECTURA DE BASE, como el D1 decidido con Joseph.
  // si sobra tiempo: la reserva en orden; sin reserva (la lista ya cubre todas las secciones citadas), repaso en blanco de lo leído
  // v6.10e (revisión del 18-nov · mir-6): en la lectura de base de F1 «ninguna a medias» vale también para lo que sobra: de la reserva solo se sigue con lo
  //   que cabe ENTERO en los minutos que sobran a 150 palabras/min (en orden); si no cabe nada (los 28 días de F1 con reserva: sobran de −2,1′ a +1,6′),
  //   repaso en blanco de lo leído y la reserva va a la 2.ª vuelta. Antes «sigue en orden con la reserva»: una lectura a medias cortada a las 15:53.
  const sobra150 = lecMin - min150(sel); const cabeEntera = [];
  if (base) { let r = sobra150; for (const u of reserva) { if (m150de(u) <= r) { cabeEntera.push(u); r -= m150de(u); } } }
  const sobraTxt = base
    ? (cabeEntera.length ? `sigue con lo de la reserva que cabe ENTERO en lo que sobra (${cabeEntera.map((u) => `${u.titulo} ${dec1(m150de(u))}′ a ${PPM_REGLA}`).join(' · ')}); si no, repasa en blanco lo leído`
      : `repasa en blanco lo leído${reserva.length ? ` (la reserva —${reserva.map((u) => u.titulo.split(' ')[0]).join(' · ')}— no cabe entera en lo que sobra: va a la 2.ª vuelta)` : ' (la lista ya cubre todas las secciones con preguntas citadas)'}`)
    : reserva.length ? `sigue en orden con la reserva (${reserva.map((u) => `${u.titulo} ${u.min}′`).join(' · ')})` : 'repasa en blanco lo leído (la lista ya cubre todas las secciones con preguntas citadas)';
  // el detalle de cada apartado (preguntas citadas, contexto, PARCIAL, clips) va aquí cuando el «qué» lleva la lista compacta
  const detTxt = qL.detalle ? `Lista de hoy, en detalle: ${sel.map((u, i) => lineaSec(u, qL.ms[i])).join(' · ')}. ` : '';
  // v6.10j (auditoría c14, diffs #2): en la LECTURA DE BASE los minutos de la lista son a 150 (los del paso); la selección se sigue haciendo a 180
  const minTxt = base ? `${detTxt}Minutos de cada apartado a ${PPM_REGLA} palabras/min (la regla de lectura en español; tablas a ${RITMO.tablaPpm}, ${String(RITMO.figuraMin).replace('.', ',')}′ por figura): con el recuadro, la lista suma ${dec1(m150)}′ medidos, ${exceso > 0 ? `${dec1(exceso)}′ más que el paso de ${lecMin}′: acaba el apartado en curso (Whole Page Rule) y entra en el quiz con ese retraso` : `por eso el paso es de ${lecMin}′`}; la selección se hace a ${RITMO.prosaPpm} palabras/min (ritmo de referencia del método: con el recuadro, ${dec1(minUsados)}′)`
    : LP ? `${detTxt}Minutos de cada sección a ${RITMO.prosaPpm} palabras/min (ritmo de referencia del método: con el recuadro, ${dec1(minUsados)}′); a ${PPM_REGLA} —la regla de lectura en español— la lista suma ${dec1(m150)}′ medidos con el recuadro: por eso el paso es de ${lecMin}′` : `${detTxt}Ritmo de referencia ${RITMO.prosaPpm} palabras/min`;
  // v6.10 · base cero (fix 18-nov, revisión de los frentes): en F1 (D2-D32) la lectura de base dice la verdad: es la selección de las secciones que pregunta
  //   el MIR (ninguna PARCIAL, cada una entera, en el orden del capítulo) y declara al principio del «cómo» cuánto del capítulo se lee hoy y adónde va el resto
  // v6.10e (revisión del 18-nov · mir-3, mir-7, regresiones-3): la cobertura va a 150 palabras/min (la unidad del paso: el mismo número que el «qué»), el
  //   resto se nombra (sus secciones, y los clips del capítulo aparte) y la fecha de la 2.ª vuelta queda antes del carácter 100 (el Calendar corta a 110);
  //   la lista se describe como lo que es: las secciones más citadas que caben ENTERAS en 14′ (no «las que tienen más preguntas»)
  if (base && (sel.some((u) => u.parcial) || lecMin !== LEC_F1)) throw new Error(`D${d}: la lectura de base de F1 no puede llevar secciones PARCIAL y dura ${LEC_F1}′`);
  const nCitSel = sel.filter((u) => !u.contexto).length, nCtxSel = sel.length - nCitSel;
  const cobB = base ? cobertura150(us, sel, true) : null;
  // v6.10j (auditoría c14, diffs #2 y vetadas #10): detrás del destino del resto, la regla corta de la lectura («hoy, enteros y en orden» = Whole Page Rule)
  //   antes del carácter 109 del «cómo» (el Calendar lo corta a 110: se había perdido); la lista de secciones del resto va detrás (cortada dejaba «(1. 2. …»)
  const destinoBase = base ? `Hoy lees ${dec1(cobB.minLeidos)}′ de ${dec1(cobB.minCapitulo)}′ (${cobB.pct} %) · resto → ${VUELTA2C} · ${REGLA_BASE} (Whole Page Rule) · lo que no lees hoy: ${restoTxt(cobB)} · todo a ${PPM_REGLA} palabras/min` : '';
  const lecComo = base
    ? `${destinoBase} · Base cero: estas ${sel.length} secciones${nCtxSel ? ` (${nCitSel} que pregunta el MIR + ${nCtxSel} de contexto, sin preguntas citadas)` : ' que pregunta el MIR'}, en el orden del capítulo, cada una entera (Whole Page Rule): ninguna a medias y ninguna de la lista se salta aunque aciertes su pregunta del pre-test (partiendo de cero un acierto puede ser suerte) · la lista son las secciones más citadas por el MIR que caben ENTERAS en 14′ (a ${RITMO.prosaPpm} palabras/min; la que no cabe se salta y entra la siguiente entera: criterio de la academia para la 1.ª vuelta, lo que ya cayó); Ravi pide más amplitud desde el principio: tensión declarada en DATA/MIR/METODO_BASE_CERO.md §10, decide Joseph · por cada fallo del pre-test, la regla que lo habría resuelto al Shopping List · si acabas antes de las 15:53, ${sobraTxt}. ${minTxt}. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.`
    : fz.n === 1
      ? `Base cero: en el orden del capítulo, cada apartado entero (Whole Page Rule) y sin saltar ninguno aunque aciertes su pregunta del pre-test (partiendo de cero un acierto puede ser suerte; Ravi: en 1.ª vuelta no se recorta el temario por las preguntas) · por cada fallo del pre-test, la regla que lo habría resuelto al Shopping List · si acabas antes de las 15:53, ${sobraTxt}. ${minTxt}. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.`
      // v6.10i (remate, revisión adversarial del 18-nov): con un apartado PARCIAL, su criterio ABRE el «cómo» (el «qué» solo dice «PARCIAL 14′ de 17.5′» y el
      //   Calendar corta el «cómo» a 110: detrás del preámbulo se perdía qué párrafos leer)
      // v6.10j (auditoría c14, diffs #2): y detrás, en los 110 caracteres, la regla de los demás apartados («los demás, enteros y en orden»: se había perdido)
      : `${sel.some((u) => u.parcial) ? `PARCIAL = solo sus párrafos con chip MIR ≥2015 (el resto, a la 2.ª vuelta) · ${REGLA_PARCIAL} (Whole Page Rule),` : 'En el orden del capítulo, cada apartado de la lista entero (Whole Page Rule) y'} sin saltar ninguno por acertar el pre-test (1.ª vuelta: el pre-test no recorta la lista); los de las preguntas FALLADAS, con más atención y su regla al Shopping List · si acabas antes de las 15:53, ${sobraTxt}. ${minTxt}. Vídeos largos (Masterclass/Videoclase) NO entran en la franja.`;
  // el «qué» = la lista de hoy (queLectura: cabe entera en el corte del Calendar); minutos medidos, «en orden, cada apartado entero» y cuántas pregunta el MIR, en el «cómo»
  pasos.push({ min: lecMin, hora: `${hPre}–15:53`, que: qL.que, como: lecComo, enlace: { t: `ProMIR · ${x.tema}`, url: capUrl(x.capId) } });
  // quiz
  preguntas.quiz = quiz;
  const nRepaso = quiz.filter((q) => q.deDia).length; // v6.03: complemento con capítulos ya leídos
  // v6.09b · lote 1-quater: si la eval de mañana (F1, < 4Q ancladas) toma la cola de este quiz, el paso lo dice al principio del «cómo» (con su fecha)
  // v6.10: el D1 (mié 18-nov, ya no «en curso») también lo anuncia: la eval del D2 (jue 19) abre con la cola de su quiz
  const colaMan = colaEvalDe(d + 1); const aMan = (L1 || x.d === 1) && colaMan && colaMan.dC === d
    ? `${colaMan.n === 1 ? 'La primera que no entre abre' : `Las ${colaMan.n} primeras que no entren abren`} la eval de mañana (${fmtF(colaMan.fecha)} 15:15) · ` : '';
  // v6.10e (revisión del 18-nov · regresiones-1): en la lectura de base de F1 el «qué» y el «cómo» del quiz dicen el orden real (lo leído hoy delante)
  const nL = quiz.filter((q) => q.leida).length, nPL = quiz.filter((q) => q.leida && q.fuente === 'pool app').length, nCL = quiz.filter((q) => q.leida && q.fuente === 'citada ProMIR').length;
  const nNL = quiz.length - nL, nPQ = quiz.filter((q) => q.fuente === 'pool app').length;
  const diasRep = [...new Set(quiz.filter((q) => q.deDia).map((q) => 'D' + q.deDia))].join(' · ');
  const queQuiz = base
    ? `${QUIZ_HACER}Q comentadas (máx. ${QUIZ_HACER_MAX}) de la lista de ${quiz.length} · ${nNL ? (nL === 1 ? 'la primera' : `las ${nL} primeras`) : 'todas'}, de lo que acabas de leer (${[nPL && `${nPL} del pool oficial`, nCL && `${nCL} citadas en esas secciones`, nRepaso && `${nRepaso} de repaso de ${diasRep}`].filter(Boolean).join(' + ')})${nNL ? (nNL === 1 ? ' · la última, de una sección que hoy no lees' : ` · las ${nNL} últimas, de secciones que hoy no lees`) : ''}`
    // v6.10l (auditoría c15, vetadas #31): en corto, para que el nivel del comentario (lo añade metodoRavi al final) se vea en los 136 del Calendar y los
    //   días de 5 pasos de 2027 no pasen del máximo del evento (antes «… del pool oficial que no entraron en el pre-test + preguntas MIR citadas en las
    //   secciones que acabas de leer»: el corte caía en «… en las secciones …»)
    : `${QUIZ_HACER}Q comentadas (máx. ${QUIZ_HACER_MAX}) de la lista de ${quiz.length} · ${pool.length > 5 ? `${Math.min(pool.length - 5, QUIZ_MAX)} del pool oficial + ` : ''}MIR citadas en lo leído${nRepaso ? ` + ${nRepaso} de repaso (${diasRep})` : ''}`;
  const ordenTxt = base
    ? 'orden: el de la lista (primero lo que acabas de leer: pool de la app, citadas —más recientes primero— y repaso; las de secciones que hoy no lees, al final)'
    : 'orden: el de la lista (pool de la app primero, luego las citadas, más recientes primero)';
  const poolTxt = pool.length > 5
    ? `Pool oficial de la app para este capítulo: ${pool.length}Q → 5 en el pre-test y ${nPQ} ${base ? `en esta lista (en la app; ${nPL} de lo que lees hoy, delante${nPQ - nPL ? `, y ${nPQ - nPL} de secciones que hoy no lees, al final` : ''})` : 'abren el quiz (en la app)'}${quiz.length > nPQ ? `; el resto, preguntas MIR citadas en el capítulo (${med.totCitas})` : ''}.`
    : `Pool oficial de la app para este capítulo: ${pool.length}Q (todas en el pre-test) → el quiz sale de las ${med.totCitas} preguntas MIR citadas en el capítulo.`;
  // v6.10l (auditoría c15, vetadas #31): el ritmo, con su resultado delante y en un solo tramo («6Q ≈ 10,7′ (77 s/Q + 30 s de comentario = 107 s/Q)»): si
  //   el Calendar tiene que acortar el «cómo» (2027, días de 5 pasos), corta ANTES de la cuenta, nunca en «77 s/Q + 30 s …»; «Tapa las opciones · Rule-In →
  //   Rule-Out» (= «tapa las opciones y contesta antes de verlas») deja sitio para que la cuenta entera quepa en los 110 y, detrás de la cola de mañana,
  //   el corte deje «tapa las opciones» entero
  const tapaO = `${aMan ? 't' : 'T'}apa las opciones`, ruleIO = 'Rule-In → Rule-Out';
  const tapa = `${tapaO} · ${ruleIO}`;
  const ritmoQ = `${QUIZ_HACER}Q ≈ ${String(Math.round((QUIZ_HACER * (SEG_POR_Q + SEG_COMENTARIO)) / 6) / 10).replace(".", ",")}′ (${SEG_POR_Q} s/Q + ${SEG_COMENTARIO} s de comentario = ${SEG_POR_Q + SEG_COMENTARIO} s/Q)`;
  // v6.10m (ronda c16, área MIR): si la cola de mañana + «tapa las opciones …» no dejan que el ritmo empiece dentro de los 110 del Calendar («Las 2 primeras
  //   que no entren abren …», el D2), el ritmo va justo detrás de la cola (antes el corte lo escondía); con «La primera que no entre …» cabe todo como antes
  // remate v6.10m (rev. c16 · visibilidad #2): con el ritmo delante, «tapa las opciones» va antes que él si así el ritmo sigue empezando dentro de los 110 (el D2
  //   perdía «tapa las opciones»); «Rule-In → Rule-Out», detrás del ritmo
  // v6.10p (ronda c18, área usmle-mir · #2): si la cola de mañana no deja sitio delante a «tapa las opciones · Rule-In → Rule-Out» + el ritmo (el D2: «Las 2
  //   primeras que no entren …», y en el día real «… de la próxima sesión (lun 23-nov 15:15)»), el quiz abre como el D1: «Tapa las opciones · Rule-In →
  //   Rule-Out · 6Q ≈ 10,7′ (…) · las 2 primeras que no entren abren la eval de mañana (…)»; la cola sigue a la vista porque el Calendar alarga el corte del
  //   «cómo» hasta el final de la cláusula de su fecha (cortarDest, ≤ 450), que es la ÚNICA del «cómo» (lo exige --check). Antes «Rule-In → Rule-Out» iba
  //   detrás del ritmo y el corte se lo llevaba
  const colaDetras = aMan && (aMan + tapa + ' · ').length > CORTE_COMO;
  pasos.push({ min: 12, hora: '15:53–16:05', que: queQuiz, como: `${colaDetras ? `T${tapa.slice(1)} · ${ritmoQ} · ${aMan.charAt(0).toLowerCase()}${aMan.slice(1)}` : `${aMan}${tapa} · ${ritmoQ} · `}registra en la app (kind quiz): <60 % = tema caliente en la próxima sesión · la ${QUIZ_HACER + 1}.ª y la ${QUIZ_HACER_MAX}.ª, solo si vas rápido · ${ordenTxt}; a las 16:05 paras donde estés: las de la lista que no entren no se pierden, siguen en la cola del capítulo (esta lista, en este orden) para la 2.ª vuelta y como reserva de su EVAL anclada D-3/D-7. ${poolTxt} Lista, en orden: ${quiz.map((q) => q.promir).join(' · ')} (${DONDE_IDS}).` });
  pasos.push({ min: 10, hora: '16:05–16:15', que: `≤4 APEX en ${deck}`, como: 'Desde el Shopping List: pregunta SAQ + por qué + 🇪🇸 delta si aplica + tag sys:: del sistema USMLE · 1 de cada 4 con imagen · creados directamente en Anki.' });
  const totalMin = pasos.reduce((s, p) => s + p.min, 0);
  const vidLargos = us.flatMap((u) => u.largos.map((v) => `${v.leyenda ? v.leyenda.replace(/^(Vídeo [\d-]+)/, '$1 · ') : 'vídeo'} (${v.dur})`));
  const recursos = [
    { t: `ProMIR · ${x.tema} (capítulo completo)`, url: capUrl(x.capId), min: minCompleta, cantidad: `${med.totPalabras.toLocaleString('es-ES')} palabras de texto + ${med.totPalabrasTabla} en tablas · ${us.filter((u) => u.nivel !== 'H2').length} secciones · ${med.totFigs} figuras · ${med.totTablas} tablas · audio «escuchar todo el tema» (duración no medida)` },
    { t: 'Preguntas MIR citadas en el capítulo (chips «MIR AAAA-AAAA, Pnnn» → /pregunta/MIR/…)', url: capUrl(x.capId), cantidad: `${med.totCitas} (≥2015: ${us.reduce((s, u) => s + u.citasDesde2015, 0)} · ≥2020: ${us.reduce((s, u) => s + u.citasDesde2020, 0)})` },
    { t: 'Pool oficial de la app (MIR 2022-2026) de este capítulo', url: capUrl(x.capId), cantidad: `${pool.length}Q (${pool.join(' · ')})` },
  ];
  // v6.02c F2 (E6): las 5Q ciegas extra del D1 con su enlace directo (antes el paso decía «abre cada enlace» sin enlaces)
  if (preguntas.extraD1) preguntas.extraD1.forEach((c, i) => recursos.push({ t: `5Q ciegas extra ${i + 1}/5 · MIR ${c.promir}`, url: c.url }));
  if (x.resumenVid) recursos.push({ t: `Vídeo resumen de ${x.asignatura} (asignatura entera) — NO entra en la franja (>12 min)`, url: capUrl(x.capId), min: Math.round(x.resumenVid.split(':').reverse().reduce((s, v, i) => s + (+v) * 60 ** i, 0) / 60) });
  for (const v of vidLargos) recursos.push({ t: `Opcional fuera de la franja: ${v}`, url: capUrl(x.capId) });
  return {
    bloque: {
      franja: '15:15–16:15', plan: 'MIR', titulo: `MIR D${d}/78 · ${x.asignatura} — ${x.tema}`, totalMin, pasos, recursos,
      hecho: `${cierre ? 'Cierre 10Q registrado + ' : !anc.d1 ? 'Mazo creado + 5Q ciegas extra + ' : 'Eval registrada + Anki a cero + '}pre-test 5Q registrado${fz.n === 1 ? ' (línea base)' : ''} + lectura de ${fz.n === 1 ? 'base' : 'la lista'} en orden, sin saltar secciones + ≥${QUIZ_HACER}Q del quiz registradas + ≤4 APEX creados.`,
      // v6.10r (chat MIR, hallazgo 9): las MISMAS preguntas de hoy (antes «pool oficial de la app … NQ del capítulo + M de <asignatura>» y la nota madre)
      planB: planBMir(preguntas, pasos),
    },
    preguntas,
    lectura: {
      minUsados, ritmo: RITMO, ...(lectF1(x) ? { min150: Math.round(min150(sel) * 10) / 10, minPaso: pasos.find((p) => /^LECTURA (DIRIGIDA|DE BASE)/.test(p.que)).min } : {}),
      ...(base ? { cobertura: cobB } : {}), // v6.10 · base cero (fix 18-nov) · v6.10e: a 150 palabras/min, con el resto nombrado
      secciones: sel.map((u) => ({ titulo: u.titulo, min: u.min, minLeer: u.minLeer, parcial: u.parcial, palabras: u.palabras, palabrasTabla: u.palabrasTabla, figs: u.figs, citasMIR: u.citasMIR, citasDesde2015: u.citasDesde2015, citasDesde2020: u.citasDesde2020, clips: u.clips, ...(u.contexto ? { contexto: true } : {}) })),
      reserva: reserva.map((u) => ({ titulo: u.titulo, min: u.min, citasMIR: u.citasMIR })),
      paraElRepaso: { min: r05(minCompleta - sel.reduce((s, u) => s + u.minLeer, 0)), donde: `${VUELTA2} · el audio «escuchar todo el tema» de ProMIR es opcional en tiempos muertos (no está en el plan)`, secciones: us.filter((u) => u.nivel !== 'H2' && !sel.some((s) => s.i === u.i && !s.parcial)).map((u) => `${u.titulo} ${u.min}′`) },
    },
  };
}

const salida = [];
for (const x of DIAS) {
  const c = CAP[x.d];
  const p = pasosDia(x.d);
  salida.push({
    d: x.d, fecha: x.fecha, dia: fmtF(x.fecha), asignatura: x.asignatura, tema: x.tema, capId: x.capId, url: capUrl(x.capId), pesoMIRcap: x.peso, delta: !!x.delta,
    cierre: MD.mirCierreDe(x.d) ? MD.mirCierreDe(x.d).asignatura : null,
    capitulo: {
      titulo: c.med.titulo, palabras: c.med.totPalabras, palabrasTabla: c.med.totPalabrasTabla, figs: c.med.totFigs, tablas: c.med.totTablas, citasMIR: c.med.totCitas,
      minLecturaCompleta: c.minCompleta, audio: c.med.audioTema, enfasis: ENFASIS[x.capId] || enfasisMedido(c.us),
      secciones: c.us.map((u) => ({ nivel: u.nivel, titulo: u.titulo, palabras: u.palabras, palabrasTabla: u.palabrasTabla, figs: u.figs, tablas: u.tablas, min: u.min, citasMIR: u.citasMIR, citasDesde2015: u.citasDesde2015, citasDesde2020: u.citasDesde2020, clips: u.clips, videosLargos: u.largos })),
      resumenVidAsignatura: x.resumenVid || null,
    },
    ...p,
  });
}

// v6.10 · base cero (fix 18-nov): el pase 1 solo devuelve qué día consumió cada pregunta (ver VETO) y termina
if (PASE1) { process.stdout.write(JSON.stringify({ consumo: [...CONSUMO] })); process.exit(0); }

// ── Derma (bloque R↔D 13:30–14:15): slot ProMIR del d3 + plan B de lectura d1-d3 desde ProMIR Derma cap 1 ──
const D1CAP = DERMA.PROMIR_DERMA_CAPS[0];
const medD = cargarMedicion(D1CAP.capId);
const usD = unidades(medD);
const secD = (pref) => usD.filter((u) => pref.some((p) => u.titulo.startsWith(p)));
const sumMin = (arr) => r05(arr.reduce((s, u) => s + u.min, 0));
const DERMA_DIAS = DERMA.DERMA_DIAS.filter((x) => x.d >= 1 && x.d <= 5); // v6.03: las 5 sesiones de las semanas 1-2 por d (v6.02c: fechas cableadas 19 → 30-oct)
const PLANB_DERMA = {
  1: { secs: ['2.1.', '2.2.'], por: 'lesiones primarias y secundarias = el tema del d1' },
  2: { secs: ['2.3.'], por: 'exploración dermatológica (descripción, color, distribución) = el tema del d2' },
  3: { secs: ['1.1.', '1.2.', '1.3.', '3.'], por: 'epidermis → dermis → hipodermis + nociones de anatomía patológica = el tema del d3' },
};
const citasD = usD.flatMap((u) => u.citas.map((pid) => ({ pid, u }))).sort((a, b) => b.pid.localeCompare(a.pid));
// v6.10 · tanda C (17-nov-2026 · CORRECCIÓN DE HECHO del chat Derma, ProMIR en vivo): §2.1-2.2 del cap. 1 tienen 24 figuras (Fig. 1-2 «Máculas» → Fig. 1-25
//   «Telangiectasias»), no 11 (la medición del 18-oct contó 4 + 7). Regla del chat para estas figuras: 0,25′ por figura (fotos de lesiones elementales:
//   se nombra la lesión, no se estudia la figura). Con 24 figuras la lectura del plan B del d1 pasa de 9′ a 10′ y la variable de ajuste es el dictado del
//   proyecto Claude (guia_catalogo_derma.js). `figsMedidas` = lo que contó la medición, para que se vea la corrección.
const FIGS_VERIFICADAS = { 1: { figs: 24, minFig: 0.25, fuente: 'ProMIR en vivo (chat Derma, 17-nov-2026): Fig. 1-2 «Máculas» → Fig. 1-25 «Telangiectasias»' } };
const derma = DERMA_DIAS.map((x) => {
  const cap = DERMA.promirDermaCapDe(x.d);
  const pb = PLANB_DERMA[x.d];
  const pbSecs = pb ? secD(pb.secs) : [];
  const out = {
    d: x.d, fecha: x.fecha, dia: fmtF(x.fecha), sub: x.sub, franja: '13:30–14:15',
    lectura10: {
      hora: '14:03–14:13', planA: x.extra ? { t: x.extra.t, url: x.extra.url, nota: 'AccessDermatology: «remote access expired» → 403 hasta que Joseph renueve el acceso desde la red institucional' } : null,
      // v6.09b · lote 1-quater: `min150` = los mismos apartados a la regla fija de lectura en español (prosa a 150 palabras/min; tablas a 90, 0,5′ por figura)
      planB: pbSecs.length ? (() => {
        const fv = FIGS_VERIFICADAS[x.d]; // v6.10 · tanda C: figuras contadas en vivo (y su regla por figura) mandan sobre la medición
        const figsMed = pbSecs.reduce((s, u) => s + u.figs, 0);
        const pal = pbSecs.reduce((s, u) => s + u.palabras, 0), tab = pbSecs.reduce((s, u) => s + u.palabrasTabla, 0);
        const base = { t: `ProMIR Dermatología · cap. 1 «${medD.titulo.replace(/^\d+\.-\s*/, '')}» → ${pbSecs.map((u) => u.titulo).join(' + ')}`, url: capUrl(D1CAP.capId), min: sumMin(pbSecs), min150: Math.round((min150(pbSecs.map((u) => ({ ...u, parcial: false }))) - ORIENT_MIN) * 10) / 10, palabras: pal + tab, figs: figsMed, por: pb.por };
        if (!fv) return base;
        return { ...base, min: r05(pal / RITMO.prosaPpm + tab / RITMO.tablaPpm + fv.figs * fv.minFig), min150: Math.round((pal / PPM_REGLA + tab / RITMO.tablaPpm + fv.figs * fv.minFig) * 10) / 10, figs: fv.figs, figsMedidas: figsMed, minFig: fv.minFig, figsFuente: fv.fuente };
      })() : null,
    },
  };
  if (cap) {
    const n = Math.floor((11 * 60) / SEG_POR_Q); // 13:52–14:03 = 11′ → 8Q a 77 s/Q
    out.testProMIR = {
      hora: '13:52–14:03', cap: cap.n, capitulo: cap.t, capId: cap.capId, url: capUrl(cap.capId), pesoMIR: cap.peso,
      poolApp: { capitulo: POOL.preguntasDeCapitulo(cap.capId).length, asignatura: POOL.preguntasDeAsignatura(5).length },
      citadasProMIR: citasD.length, nQ: n,
      preguntas: citasD.slice(0, 11).map((c) => ({ promir: c.pid, url: preguntaUrl(c.pid), seccion: c.u.titulo })),
      como: `En modo estudio, SIN cronómetro (fase 1 de Derma): 11′ = ${n}Q a 77 s/Q, solo el presupuesto de la franja (2Q más solo si te sobra tiempo) · el pool de la app no tiene preguntas de este capítulo (0; ${POOL.preguntasDeAsignatura(5).length} de Dermatología en total) → se usan las ${citasD.length} preguntas MIR citadas en el capítulo (más recientes primero) · registro en la app: kind derma10Q, asignatura «Dermatología» (neto A − F/3).`,
    };
  }
  return out;
});

const json = {
  _meta: {
    version: 'v6.09', generado: '2026-11-16', generador: 'DATA/MIR/guia_lectura/gen_guia_lectura.js',
    medicion: 'DATA/MIR/guia_lectura/medicion_promir_2026-10-18/<capId>.json (analiza_cap.js con la sesión ProMIR de Joseph · solo lectura: no se inició ni creó ningún test · dom 18-oct-2026: los 10 capítulos de D1-D10 v6.02 + Dermatología cap. 1 · mar 20-oct-2026: los 66 restantes del plan; carpeta con el nombre histórico del 18-oct · el texto del recuadro «Orientación MIR» no se versiona)',
    metodo: {
      palabras: 'Texto propio de cada sección (bloques p · li · div.ul-item · figcaption), sin guiones blandos (U+00AD) y DEDUPLICADO: la maquetación en columnas de ProMIR repite el párrafo entero cuando cruza de columna (medido en el cap. 6 Epidemiología: 10.134 palabras con duplicados y texto de las figuras SVG → 7.411 reales + 343 en tablas). Por eso las cifras son menores que un conteo bruto del innerText (≈9.950).',
      ritmo: `${RITMO.prosaPpm} palabras/min el texto (lectura de estudio en español, comprensiva) · ${RITMO.tablaPpm} palabras/min las tablas · ${RITMO.figuraMin}′ por figura · clips ≤12 min por su duración. A 150 palabras/min multiplica los minutos por 1,2.`,
      pesoSeccion: 'Preguntas MIR que el propio capítulo cita en cada sección (chips «MIR AAAA-AAAA, Pnnn» = /pregunta/MIR/AAAA-nnn), ponderadas por recencia: ≥2020 ×3 · 2015-2019 ×2 · <2015 ×1; +5 si una pregunta del pre-test cae en esa sección.',
      lectura15: `Franja 15:38–15:53: ${ORIENT_MIN}′ de recuadro «Orientación MIR» + secciones por peso hasta llenar ${LECTURA_MIN - ORIENT_MIN}′ a ${RITMO.prosaPpm} palabras/min. Fase 1 (D2-D32, v6.10 · base cero, fix 18-nov): LECTURA DE BASE de ${LEC_F1}′ = solo secciones ENTERAS (la que no cabe se salta y entra la siguiente entera que quepa; nunca PARCIAL), leídas en el orden del capítulo, con la cobertura del día declarada a 150 palabras/min (minutos leídos / capítulo, con el resto nombrado y los clips aparte; v6.10e) y, si sobra tiempo, repaso en blanco de lo leído salvo que una sección de la reserva quepa entera. Fase 2 (D33-D76): si la de más peso no cabe, se lee PARCIAL (solo los párrafos con chip MIR ≥2015). En toda la 1.ª vuelta ninguna sección de la lista se salta por acertar el pre-test (v6.10); la reserva (3 siguientes por peso) va en el orden del capítulo. Lo que no entra queda para la ${VUELTA2}. El reparto de preguntas de 2027 no depende de la lectura de base (pase 1 + VETO).`,
      preguntas: 'Pre-test = pool oficial de la app (mirPreguntasOficiales, MIR 2022-2026, ids = año del EXAMEN); si hay menos de 5, se completa con citadas ProMIR ≥2015. Quiz = lista de 8-10Q (se hacen 6, máx. 8, a 77 s + 30 s de comentario; v6.09 lote 1; v6.10e: en la lectura de base de F1 las 6 primeras son de lo leído y la lista llega a 11-13 cuando el pool de secciones no leídas va al final), evals ancladas de los días siguientes = preguntas citadas en las secciones LEÍDAS (más recientes primero), sin repetir ninguna y sin ninguna NO servible (v6.10e: anulada o con la clave en duda en el pool oficial, también por la vía de las citadas). Equivalencia de ids: pool 2024-050 = ProMIR /pregunta/MIR/2023-050 («MIR 2023-2024, P050»), verificada el 18-oct en 3 preguntas. Cierres de asignatura = pool de la app sin usar.',
      videos: 'Los vídeos de cada capítulo se midieron (duración real del <video>). Regla MIR_FRANJAS: solo entran en la franja los clips ≤12 min (auscultación, ecografía…); Masterclass/Videoclase/Imperdible y el vídeo resumen de la asignatura (resumenVid de mirDailyPlan) quedan como opcionales fuera de la franja.',
      anclas: 'mirDailyPlan.mirAnclas(d) (sin log): D-1 2Q + D-3 1Q + D-7 1Q; D2 solo tiene D-1 (2Q), D3 tiene D-1 + D-3=—; los días de cierre (D4 Epidemiología, D5 Bioética) no hay eval. La app puede cambiar un slot por un tema 🔥 caliente (mirAnclasDinamicas): manda la app.',
      capitulosPequenos: 'v6.03 (76 capítulos): (1) pool de la app de los 76 capítulos reservado antes de repartir; (2) cierre = pool sin usar + citadas no usadas del bloque cerrado si no llega a 10 (≥2015 primero); (3) pre-test: si faltan citadas ≥2015 libres, las anteriores del mismo capítulo; (4) el quiz cede hasta 4 citadas a las anclas sin bajar de 8 y, si aun así no llega a 8, se completa con citadas de capítulos ya leídos (misma asignatura primero, «repaso»); (5) lectura con ≥3′ libres → secciones sin citas del capítulo que caben enteras («contexto»); (6) ancla sin pregunta libre → el paso dice «repite la que FALLASTE ese día».',
      noVerificado: ['Duración del audio «escuchar todo el tema» (no se reprodujo).', 'Nº de preguntas de los tests de «Entrenar» por capítulo: ver ese recuento exige abrir el creador de tests; no se tocó. La guía usa el pool de la app + las citadas en el capítulo, que sí están contadas.', 'Comentario de cada pregunta: la página /pregunta/MIR/… muestra enunciado y opciones; el comentario aparece al responder (no se respondió ninguna).'],
    },
    franjasApp: MD.MIR_FRANJAS.map((f) => f.hora + ' ' + f.tipo),
  },
  mir: salida,
  derma,
};

// ── comprobaciones ──
const errs = [];
/** v6.10e (regresiones-3): posición del FINAL de la fecha de la 2.ª vuelta en un «cómo» (∞ si no está) */
const finDest = (como) => { const i = como.indexOf(VUELTA2C); return i < 0 ? Infinity : i + VUELTA2C.length; };
for (const x of salida) {
  if (x.bloque.totalMin !== 60) errs.push(`D${x.d}: los pasos suman ${x.bloque.totalMin}′ ≠ 60′`);
  if (x.preguntas.pretest.length !== 5) errs.push(`D${x.d}: pre-test con ${x.preguntas.pretest.length}Q`);
  if (x.preguntas.quiz.length < QUIZ_N) errs.push(`D${x.d}: quiz con ${x.preguntas.quiz.length}Q < ${QUIZ_N}`);
  if (x.lectura.minUsados > LECTURA_MIN && !x.lectura.d1) errs.push(`D${x.d}: lectura ${x.lectura.minUsados}′ > ${LECTURA_MIN}′`);
  // v6.10 · tanda C: el D1 con el reloj decidido con Joseph (pasosD1): Σ 60′, empieza con el pre-test, ratios del pre-test (5 × 77 s + registro), la
  //   orientación (recuadro + títulos), la lectura de base (+ §9) a 150 palabras/min y el quiz (objetivo × 107 s), y termina reactivando las tarjetas de Ravi
  if (x.lectura.d1) {
    const ok = (n, m) => m > 0 && n / m >= 0.85 && n / m <= 1.15;
    const [pr, orn, le, qz] = x.bloque.pasos;
    if (!/^PRE-TEST 5Q/.test(pr.que) || !ok((5 * SEG_POR_Q) / 60 + D1_MIN_REGISTRO, pr.min)) errs.push(`D${x.d}: pre-test del reloj D1 fuera de 0,85-1,15`);
    if (!ok(ORIENT_MIN + (x.capitulo.secciones.filter((u) => u.nivel !== 'H2').length * D1_SEG_TITULO) / 60, orn.min)) errs.push(`D${x.d}: orientación fuera de 0,85-1,15`);
    if (!/^LECTURA DE BASE/.test(le.que) || !ok(x.lectura.min150, le.min)) errs.push(`D${x.d}: lectura de base ${x.lectura.min150}′ en ${le.min}′`);
    if (!/Q comentadas \(máx\./.test(qz.que) || !ok((D1_QUIZ.obj * (SEG_POR_Q + SEG_COMENTARIO)) / 60, qz.min)) errs.push(`D${x.d}: quiz del D1 fuera de 0,85-1,15`);
    if (!/[Rr]eactivar/.test(x.bloque.pasos[x.bloque.pasos.length - 1].que)) errs.push(`D${x.d}: no termina reactivando las tarjetas de Ravi del subtema`);
    const cob = x.lectura.cobertura; // v6.10 · base cero (fix 18-nov): cobertura y destino del resto al principio del «cómo» · v6.10e: a 150, lo opcional aparte
    if (!cob || cob.a !== PPM_REGLA || !le.como.startsWith(`Hoy lees ${dec1(cob.minLeidos)}′ (+ ${dec1(cob.minOpcional)}′ del §9) de ${dec1(cob.minCapitulo)}′ (${cob.pct}-${cob.pctMax} %) · resto → ${VUELTA2C}`) || finDest(le.como) > CORTE_DEST || Math.abs(cob.minLeidos - x.lectura.d1.base) > 0.05 || x.lectura.secciones.some((u) => u.parcial)) errs.push(`D${x.d}: la lectura de base del D1 no declara su cobertura a ${PPM_REGLA} (fijo + §9) y el destino del resto con fecha antes del carácter ${CORTE_DEST}`);
    if (!/si hoy no entran, el §9 y el §9\.1/.test(le.como)) errs.push(`D${x.d}: el «cómo» no dice adónde van el §9 y el 9.1 si no entran`);
    if (x.bloque.pasos.some((p) => /ARRANQUE|importa/i.test(p.que))) errs.push(`D${x.d}: el D1 conserva el ARRANQUE de Anki o importa el mazo`);
  }
  // v6.09b · lote 1-ter: en F1 (D2-D32) cada paso medible cuadra a la regla fija (razón necesario/asignado 0,85-1,15): eval 4Q × 77 s · pre-test 5Q × 77 s ·
  //   lectura a 150 palabras/min; fuera de F1, los pasos siguen como estaban (2027 idéntico)
  if (lectF1(x) && !x.lectura.d1) { // v6.10: + el D1 (pre-test y lectura; no tiene eval) · tanda C: el D1 tiene su comprobación propia (arriba)
    const P = (re) => x.bloque.pasos.find((p) => re.test(p.que));
    const ok = (n, m) => m > 0 && n / m >= 0.85 && n / m <= 1.15;
    const ev = P(/^EVAL ANCLADA (\d+)Q/); const pr = P(/^PRE-TEST 5Q/); const le = P(/^LECTURA (DIRIGIDA|DE BASE)/);
    // v6.10 · base cero: en F1 (fase 1) la lectura es LECTURA DE BASE en orden y el pre-test es línea base; en toda la 1.ª vuelta ninguna sección se salta
    if (faseDe(x.d).n === 1 && (!le || !/^LECTURA DE BASE/.test(le.que) || !pr || !/línea base/.test(pr.que))) errs.push(`D${x.d}: fase 1 sin LECTURA DE BASE o sin pre-test de línea base`);
    if (ev) {
      const n = +/^EVAL ANCLADA (\d+)Q/.exec(ev.que)[1];
      // v6.09b · lote 1-quater: eval de 2-3Q ancladas + la cola del quiz del D-1 = 4Q comentadas (107 s/Q) en sus 7′; nada de «adelanta el Anki»
      const c = /^EVAL ANCLADA \d+Q \+ (\d+)Q de la cola del quiz del D(\d+) · (\d+)Q comentadas/.exec(ev.que);
      if (c) {
        const tot = n + +c[1]; const slot = (x.preguntas.eval || []).find((s) => s.slot === 'cola D-1'); const qD = salida.find((y) => y.d === +c[2]);
        if (tot !== +c[3] || tot !== EVAL_Q_F1 || !ok((tot * SEG_EVAL_COMENTADA) / 60, ev.min)) errs.push(`D${x.d}: eval ${n}Q + ${c[1]}Q de cola = ${c[3]}Q comentadas en ${ev.min}′ (fuera de 0,85-1,15 o ≠ ${EVAL_Q_F1}Q)`);
        if (!slot || slot.dia !== +c[2] || slot.preguntas.length - (QUIZ_HACER_MAX - QUIZ_HACER) < +c[1]) errs.push(`D${x.d}: la cola del quiz del D${c[2]} no está en preguntas.eval o no llega a ${c[1]}Q aunque ayer pararas en la ${QUIZ_HACER_MAX}.ª`);
        else if (!qD || JSON.stringify(qD.preguntas.quiz.slice(QUIZ_HACER).map((q) => q.promir)) !== JSON.stringify(slot.preguntas.map((q) => q.promir))) errs.push(`D${x.d}: la cola no es la ${QUIZ_HACER + 1}.ª-10.ª del quiz del D${c[2]}`);
        // v6.10m (ronda c16, área MIR): en el D1 la regla del blanco y el ritmo van delante; la cola sigue a la vista porque el Calendar alarga el corte del
        //   «cómo» hasta el final de la cláusula de su fecha (cortarDest): basta con que empiece antes del carácter 160
        // v6.10o (ronda c17, área MIR · #8): con «tapa las opciones · Rule-In → Rule-Out» delante del ritmo, la cola del D1 empieza antes del carácter 200 (el
        //   Calendar la sigue enseñando entera: el corte llega al final de la cláusula de su fecha, ≤ 450) y es la ÚNICA fecha del «cómo» (si hubiera otra
        //   detrás, el corte se alargaría hasta ella)
        // v6.10p (ronda c18, área usmle-mir · #2): el D2 abre como el D1 («Tapa las opciones · Rule-In → Rule-Out · <ritmo> · las 2 primeras …»): su cola, igual,
        //   antes del carácter 200 y como única fecha del «cómo»
        if (qD && (enLote1t(qD) || qD.d === 1)) { const qz = qD.bloque.pasos.find((p) => /Q comentadas \(máx\./.test(p.que)); const i = qz ? qz.como.indexOf(`la eval de mañana (${x.dia} 15:15)`) : -1; const tras = qD.d === 1 || /^Tapa las opciones · Rule-In → Rule-Out · /.test(qz ? qz.como : ''); const lim = tras ? 200 : 100; if (i < 0 || i > lim || (tras && (qz.como.match(/(?:lun|mar|mié|jue|vie|sáb|dom) \d{1,2}-(?:ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/g) || []).length !== 1)) errs.push(`D${c[2]}: su quiz no anuncia en los primeros ${lim} caracteres que la cola abre la eval del ${x.dia}`); }
      } else if (n === 4) { if (!ok((n * SEG_POR_Q) / 60, ev.min)) errs.push(`D${x.d}: eval ${n}Q en ${ev.min}′`); }
      else errs.push(`D${x.d}: eval de ${n}Q en F1 sin la cola del quiz del D-1 (los minutos que sobran quedarían sin material)`);
    }
    if (x.bloque.pasos.some((p) => /adelanta el Anki|que sobran/.test(`${p.que} ${p.como}`))) errs.push(`D${x.d}: en F1 un paso deja minutos «que sobran» sin material`);
    if (!pr || !ok((5 * SEG_POR_Q) / 60, pr.min)) errs.push(`D${x.d}: pre-test 5Q en ${pr ? pr.min : '—'}′`);
    if (!le || !ok(x.lectura.min150, le.min) || !le.como.includes(`la lista suma ${dec1(x.lectura.min150)}′ medidos`)) errs.push(`D${x.d}: lectura ${x.lectura.min150}′ (a 150) en ${le ? le.min : '—'}′`);
    // v6.10 · base cero (fix 18-nov): la lectura de base de F1 (D2-D32) = 0 PARCIAL, secciones y reserva en el orden del capítulo, cobertura declarada al
    //   principio del «cómo» (minutos leídos / lectura completa) con el destino del resto (2.ª vuelta con fecha) y el quiz abre con lo leído hoy
    if (baseF1(x)) {
      const idx = (t) => x.capitulo.secciones.findIndex((u) => u.titulo === t);
      const enOrden = (arr) => arr.every((u, i) => i === 0 || idx(arr[i - 1].titulo) < idx(u.titulo));
      const cob = x.lectura.cobertura;
      if (x.lectura.secciones.some((u) => u.parcial) || /PARCIAL/.test(`${le ? le.que : ''} ${le ? le.como : ''}`)) errs.push(`D${x.d}: lectura de base con una sección PARCIAL`);
      if (!enOrden(x.lectura.secciones) || !enOrden(x.lectura.reserva)) errs.push(`D${x.d}: secciones o reserva fuera del orden del capítulo`);
      // v6.10e (revisión del 18-nov · mir-7, regresiones-3): cobertura a 150 palabras/min = el número del «qué»; capítulo = leído + resto + vídeos; el «cómo»
      //   empieza con ella y la fecha de la 2.ª vuelta queda antes del carácter 100 (el Calendar corta el «cómo» a 110)
      if (!cob || cob.a !== PPM_REGLA || cob.minLeidos !== x.lectura.min150 || Math.abs(cob.minCapitulo - (cob.minLeidos + cob.minResto + cob.minVideos)) > 0.11 || cob.nResto !== cob.resto.length) errs.push(`D${x.d}: cobertura de la lectura de base sin declarar, no a ${PPM_REGLA} o distinta del «qué»`);
      else if (!le || !le.como.startsWith(`Hoy lees ${dec1(cob.minLeidos)}′ de ${dec1(cob.minCapitulo)}′ (${cob.pct} %) · resto → ${VUELTA2C}`) || finDest(le.como) > CORTE_DEST) errs.push(`D${x.d}: el «cómo» de la lectura de base no empieza con la cobertura y el destino del resto (${VUELTA2C}) antes del carácter ${CORTE_DEST}`);
      // v6.10j (auditoría c14, diffs #2): la regla corta va justo detrás del destino y acaba antes del carácter 109 (visible en el Calendar); los minutos de la
      //   lista del «qué» son a 150 y, con el recuadro, suman EXACTAMENTE los «Hoy lees X′»
      else if (!le.como.startsWith(`Hoy lees ${dec1(cob.minLeidos)}′ de ${dec1(cob.minCapitulo)}′ (${cob.pct} %) · resto → ${VUELTA2C} · ${REGLA_BASE} (Whole Page Rule) · `) || finDest(le.como) + 3 + REGLA_BASE.length > CORTE_COMO) errs.push(`D${x.d}: la regla «${REGLA_BASE}» no va detrás del destino del resto o no cabe en los ${CORTE_COMO} caracteres del «cómo»`);
      if (Math.abs(ORIENT_MIN + min150Lista(x.lectura.secciones).reduce((a, b) => a + b, 0) - cob.minLeidos) > 0.001) errs.push(`D${x.d}: los minutos a ${PPM_REGLA} de la lista no suman los «Hoy lees ${dec1(cob.minLeidos)}′»`);
      // v6.10e (mir-6): nada «a medias» con lo que sobra: la reserva solo si cabe entera (si no, repaso en blanco)
      if (le && /sigue en orden con la reserva/.test(le.como)) errs.push(`D${x.d}: la lectura de base manda a leer la reserva a medias con lo que sobra`);
      // v6.10e (regresiones-1): las ${QUIZ_HACER} primeras del quiz (las que se hacen) son de lo leído (hoy o en días previos, repaso) y ninguna no leída va delante de una leída
      const qz = x.preguntas.quiz; const iNL = qz.findIndex((q) => !q.leida);
      if (qz.slice(0, QUIZ_HACER).some((q) => !q.leida) || (iNL >= 0 && qz.slice(iNL).some((q) => q.leida))) errs.push(`D${x.d}: las ${QUIZ_HACER} primeras del quiz no son todas de lo leído (o una no leída va delante de una leída)`);
    }
  } else if (x.lectura.min150 != null && !x.lectura.d1) errs.push(`D${x.d}: fuera de F1 con la lectura del lote 1-ter`);
  // el «qué» de la lectura cabe ENTERO en el corte del Calendar (150 con la hora delante) y nombra TODOS los apartados de hoy, en orden (por título o
  //   «§número»); si va compacto, el «cómo» lleva el detalle de cada uno
  {
    const le = x.bloque.pasos.find((p) => /^LECTURA (DIRIGIDA|DE BASE)/.test(p.que));
    if (!le || le.que.length > CORTE_QUE) errs.push(`D${x.d}: el «qué» de la lectura (${le ? le.que.length : '—'}) no cabe en los ${CORTE_QUE} caracteres que deja el Calendar tras la hora`);
    else if (!x.lectura.d1) {
      let i = le.que.indexOf(' + ');
      for (const u of x.lectura.secciones) {
        const en = (t) => { for (let k = le.que.indexOf(t, i); k >= 0; k = le.que.indexOf(t, k + 1)) if ([' + ', ' · '].includes(le.que.slice(k - 3, k)) && /^($| \(| ·)/.test(le.que.slice(k + t.length, k + t.length + 2))) return k; return -1; };
        const js = [en(u.titulo), en(`§${numSec(u)}`)].filter((k) => k >= 0);
        if (!js.length) { errs.push(`D${x.d}: el «qué» de la lectura no nombra «${u.titulo}» (o no en el orden de la lista)`); break; }
        i = Math.min(...js) + 1;
      }
      const qL = queLectura(le.que.split(' · Orientación MIR')[0], x.lectura.secciones, baseF1(x)); // v6.10j: a 150 en la LECTURA DE BASE de F1
      if (le.que !== qL.que) errs.push(`D${x.d}: el «qué» de la lectura no sale de queLectura`);
      else if (qL.detalle && !x.lectura.secciones.every((u, k) => le.como.includes(lineaSec(u, qL.ms[k])))) errs.push(`D${x.d}: la lista va compacta en el «qué» y el «cómo» no lleva el detalle de cada apartado`);
      // v6.10j (auditoría c14, diffs #2): con un PARCIAL, su criterio y la regla de los demás apartados caben en los 110 caracteres del «cómo»
      if (x.lectura.secciones.some((u) => u.parcial)) { const k = le.como.indexOf(REGLA_PARCIAL); if (!le.como.startsWith('PARCIAL = ') || k < 0 || k + REGLA_PARCIAL.length > CORTE_COMO) errs.push(`D${x.d}: con un PARCIAL, el «cómo» no abre con su criterio y «${REGLA_PARCIAL}» en ${CORTE_COMO} caracteres`); }
    }
  }
  // v6.10j (auditoría c14, diffs #3 y vetadas #1): lo que tiene que verse en los 110 caracteres del «cómo»: en el TEST DE CIERRE, el reloj, la regla del blanco y
  //   la fuente en corto («N del pool oficial + M MIR citadas en el bloque Dx-Dy»); en la EVAL ANCLADA, la regla del blanco y la fuente de las ancladas
  for (const p of x.bloque.pasos) {
    if (/^TEST DE CIERRE/.test(p.que)) {
      const m = /^\d+′ \(77 s\/Q\) · en blanco si no descartas 2 · Fuente: (?:\d+ del pool oficial \+ \d+ MIR citadas en el bloque D\d+-D\d+|\d+ MIR citadas en el bloque D\d+-D\d+|10 del pool oficial de la app sin usar)/.exec(p.como);
      if (!m || m[0].length > CORTE_COMO) errs.push(`D${x.d}: el «cómo» del TEST DE CIERRE no deja ver en ${CORTE_COMO} caracteres el reloj, el blanco y la fuente («${p.como.slice(0, 120)}»)`);
    }
    if (/^EVAL ANCLADA/.test(p.que)) {
      // remate v6.10j: con la cola del quiz, el ritmo (77 s/Q) también; la fuente en corto («citadas ProMIR y no usadas»: los días anclados van en el «qué»)
      // remate v6.10l: con un slot que repite un fallo, la fuente visible es el reparto («… + N que fallaste (D-7)»)
      const repite = /\d+ que fallaste \([^()]*\)/.exec(p.como);
      const fr = /cola del quiz/.test(p.que) ? 'citadas ProMIR y no usadas' : repite ? repite[0] : /\b1Q citada ProMIR/.test(p.como) ? 'citada ProMIR de lo que leíste ese día, no usada' : 'citadas ProMIR de lo que leíste ese día, no usadas'; const k = p.como.indexOf(fr);
      if (k < 0 || k + fr.length > CORTE_COMO || p.como.slice(0, k).indexOf('en blanco si no descartas 2') < 0 && p.como.slice(0, k).indexOf('En blanco si no descartas 2') < 0 || /cola del quiz/.test(p.que) && p.como.slice(0, k).indexOf(`${SEG_POR_Q} s/Q`) < 0) errs.push(`D${x.d}: el «cómo» de la EVAL ANCLADA no deja ver en ${CORTE_COMO} caracteres la regla del blanco y la fuente de las ancladas («${p.como.slice(0, 140)}»)`);
      // v6.10l (auditoría c15, diffs #39): el «cómo» abre con el cronómetro y sus minutos
      if (!new RegExp(`^cronómetro ${p.min === 7 && !/cola del quiz/.test(p.que) ? '\\d+' : p.min}′ \\(${SEG_POR_Q} s/Q`).test(p.como)) errs.push(`D${x.d}: el «cómo» de la EVAL ANCLADA no abre con «cronómetro N′ (${SEG_POR_Q} s/Q…)»`);
    }
    // v6.10l (auditoría c15, diffs #39): el TEST DE CIERRE dice en el «qué» que va con cronómetro (el «cómo» lleva el reloj, el blanco y la fuente)
    if (/^TEST DE CIERRE/.test(p.que) && !/^TEST DE CIERRE · 10Q reales MIR cronometradas de /.test(p.que)) errs.push(`D${x.d}: el «qué» del TEST DE CIERRE no dice «cronometradas»`);
    // v6.10l (auditoría c15, vetadas #31): en el quiz, el ritmo va con su resultado delante, en un solo tramo y dentro de los 110 del Calendar (sin la cola
    //   de mañana delante); el D1 abre con la regla del blanco ENTERA (cuándo en blanco y cuándo marcar)
    if (/Q comentadas \(máx\./.test(p.que)) {
      const rq = `${QUIZ_HACER}Q ≈ 10,7′ (${SEG_POR_Q} s/Q + ${SEG_COMENTARIO} s de comentario = ${SEG_POR_Q + SEG_COMENTARIO} s/Q)`;
      // v6.10m (ronda c16, área MIR): el D1 sigue con su ritmo («7Q ≈ 12,5′ (77 s/Q + 30 s de comentario = 107 s/Q)») delante de la cola de mañana
      const rq1 = `${D1_QUIZ.obj}Q ≈ ${dec1((D1_QUIZ.obj * (SEG_POR_Q + SEG_COMENTARIO)) / 60)}′ (${SEG_POR_Q} s/Q + ${SEG_COMENTARIO} s de comentario = ${SEG_POR_Q + SEG_COMENTARIO} s/Q)`;
      // v6.10o (ronda c17, área MIR · #8): el D1 abre con la regla del blanco, «tapa las opciones · Rule-In → Rule-Out» y el ritmo, que EMPIEZA dentro de los 110
      if (x.lectura.d1) { const ab = `Desde aquí, en blanco si no descartas 2; con 2, marca · tapa las opciones · Rule-In → Rule-Out · `; if (!p.como.startsWith(`${ab}${rq1} · `) || ab.length > CORTE_COMO + 1) errs.push(`D${x.d}: el quiz del D1 no abre con la regla del blanco entera, «tapa las opciones · Rule-In → Rule-Out» y su ritmo («${rq1}») dentro de los ${CORTE_COMO} caracteres del Calendar`); }
      // v6.10m (ronda c16, área MIR): también con la cola de mañana delante, el ritmo EMPIEZA dentro de los 110 del Calendar (el corte se alarga hasta su final:
      //   tramo «expr»); antes la cola lo dejaba fuera (D2)
      else { const i = p.como.indexOf(rq); if (i < 0 || i > CORTE_COMO + 1) errs.push(`D${x.d}: el «cómo» del quiz no deja empezar «${rq}» dentro de los ${CORTE_COMO} caracteres del Calendar`); }
      // v6.10p (ronda c18, área usmle-mir · #2): en TODOS los quizzes (D1-D76), «tapa las opciones · Rule-In → Rule-Out» va JUNTO, justo delante del ritmo, y
      //   acaba dentro de los 110 del Calendar (antes el D2 lo tenía partido: «tapa las opciones · <ritmo> · Rule-In → Rule-Out», y el corte se llevaba el par)
      { const par = /[Tt]apa las opciones · Rule-In → Rule-Out · /.exec(p.como); const r = x.lectura.d1 ? rq1 : rq; if (!par || p.como.indexOf(r) !== par.index + par[0].length || par.index + par[0].length > CORTE_COMO + 1) errs.push(`D${x.d}: el «cómo» del quiz no lleva «tapa las opciones · Rule-In → Rule-Out» junto, delante del ritmo y dentro de los ${CORTE_COMO} caracteres del Calendar`); }
    }
    // v6.10l (auditoría c15): en la fase 1 el pre-test dice ENTERA, en los 110 del Calendar, dónde empieza la regla del blanco
    if (/^PRE-TEST 5Q/.test(p.que) && faseDe(x.d).n === 1) { const k = p.como.search(/la regla del blanco (?:empieza en el quiz|va en la eval y el quiz)/); if (k < 0 || p.como.indexOf(' · ', k) > CORTE_COMO + 1) errs.push(`D${x.d}: el pre-test de la fase 1 no deja ver entera dónde empieza la regla del blanco`); }
    // v6.10m (ronda c16, área MIR): y su ritmo cierra el «qué», que cabe entero en el corte del Calendar
    if (/^PRE-TEST 5Q/.test(p.que) && faseDe(x.d).n === 1 && (!p.que.endsWith(` · ${SEG_POR_Q} s/Q (5Q ≈ ${dec1((5 * SEG_POR_Q) / 60)}′)`) || p.que.length > CORTE_QUE)) errs.push(`D${x.d}: el «qué» del pre-test de la fase 1 no acaba con su ritmo o no cabe en ${CORTE_QUE} caracteres`);
  }
  // v6.10l (auditoría c15, cambios #16): una sola regla para el exceso de la LECTURA DE BASE: la cabecera lleva «(+X′)» si y solo si el «cómo» dice «X′ más que el paso»
  { const le = x.bloque.pasos.find((p) => /^LECTURA DE BASE \d+′/.test(p.que)); if (le && !x.lectura.d1) { const cab = /^LECTURA DE BASE \d+′ \(\+(\d+,\d|\d+)′\)/.exec(le.que), co = /la lista suma [\d,]+′ medidos, ([\d,]+)′ más que el paso/.exec(le.como); if ((!!cab !== !!co && !(co && !cab && EXCESO_OMITIDO.has(x.d))) || (cab && co && cab[1] !== co[1])) errs.push(`D${x.d}: la cabecera de la LECTURA DE BASE y su «cómo» no dicen el mismo exceso`); } }
}
const todas = salida.flatMap((x) => [].concat(x.preguntas.pretest.map((p) => p.promir), (x.preguntas.extraD1 || []).map((p) => p.promir), x.preguntas.quiz.map((p) => p.promir), (x.preguntas.cierre || []).map((p) => p.promir)));
const rep = todas.filter((p, i) => todas.indexOf(p) !== i);
if (rep.length) errs.push('preguntas repetidas entre pasos: ' + [...new Set(rep)].join(', '));
// v6.10e (revisión del 18-nov · mir-1): 0 preguntas no servibles en el plan (anuladas o con la clave en duda en el pool oficial), en NINGÚN paso: pre-test,
//   extra del D1, quiz, eval (anclas y cola) y cierres
const noServ = salida.flatMap((x) => [].concat(x.preguntas.pretest, x.preguntas.extraD1 || [], x.preguntas.quiz, (x.preguntas.eval || []).flatMap((e) => e.preguntas), x.preguntas.cierre || []).filter((q) => noServible(q.promir)).map((q) => `D${x.d} ${q.promir} (pool ${proMIRAPool(q.promir)})`));
if (noServ.length) errs.push('preguntas NO servibles (anuladas o con la clave en duda en el pool oficial): ' + noServ.join(', '));
// v6.10r (chat MIR, hallazgo 9): el plan B con ProMIR caído usa solo preguntas de HOY: los ids que nombra son los 5 de su propio pre-test, en orden, y ninguno
//   está repartido a otro día (pre-test, extra, quiz, eval o cierre); no remite al pool oficial de la app ni a la nota madre de Obsidian; el quiz se aplaza;
//   el modo mínimo de un día de cierre no pide «4Q ancladas» (ese día no hay)
{
  const dueno = new Map(); const pon = (pid, d, k) => { if (!dueno.has(pid)) dueno.set(pid, []); dueno.get(pid).push(`D${d} ${k}`); };
  for (const x of salida) {
    x.preguntas.pretest.forEach((q) => pon(q.promir, x.d, 'pre-test')); (x.preguntas.extraD1 || []).forEach((q) => pon(q.promir, x.d, 'extra'));
    x.preguntas.quiz.forEach((q) => pon(q.promir, x.d, 'quiz')); (x.preguntas.cierre || []).forEach((q) => pon(q.promir, x.d, 'cierre'));
    (x.preguntas.eval || []).forEach((e) => e.preguntas.forEach((q) => pon(q.promir, x.d, `eval ${e.slot}`)));
  }
  for (const x of salida) {
    const pb = String(x.bloque.planB || ''); const ids = [...new Set(pb.match(/\b(?:19|20)\d{2}-\d{3}\b/g) || [])]; // sin repetir el ejemplo de la numeración
    const ajenos = ids.flatMap((pid) => (dueno.get(pid) || []).filter((k) => !k.startsWith(`D${x.d} `)).map((k) => `${pid} (${k})`));
    if (!/SUS MISMAS 5Q/.test(pb) || JSON.stringify(ids) !== JSON.stringify(x.preguntas.pretest.map((q) => q.promir))) errs.push(`D${x.d}: el plan B no da el pre-test con sus MISMAS 5Q (ids: ${ids.join(' · ') || '—'})`);
    if (ajenos.length) errs.push(`D${x.d}: el plan B usa preguntas de otro día: ${ajenos.join(', ')}`);
    if (/pool oficial de la app|nota madre|◆ Obsidian/i.test(pb) || !/el quiz se aplaza hasta que ProMIR vuelva/.test(pb) || (x.preguntas.cierre && /ancladas/.test(pb))) errs.push(`D${x.d}: el plan B remite al pool de la app o a la nota madre, no aplaza el quiz o pide ancladas un día de cierre`);
  }
}
if (errs.length) { console.error('ERRORES:', errs); process.exit(1); }
const txt = JSON.stringify(json, null, 1) + '\n';
if (CHECK) {
  const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8').replace(/\r\n/g, '\n') : '';
  if (cur !== txt) { console.error('✗ ' + path.relative(ROOT, OUT) + ' desactualizado: node DATA/MIR/guia_lectura/gen_guia_lectura.js'); process.exit(1); }
  console.log('✓ guía al día · ' + salida.length + ' días MIR · ' + derma.length + ' sesiones Derma');
} else {
  fs.writeFileSync(OUT, txt, 'utf8');
  console.log('Wrote ' + path.relative(ROOT, OUT));
  for (const x of salida) console.log(`  D${x.d} ${x.dia} ${x.tema.slice(0, 38).padEnd(38)} cap ${String(x.capitulo.palabras).padStart(5)} pal ≈${String(x.capitulo.minLecturaCompleta).padStart(5)}′ · lectura15 ${x.lectura.minUsados}′: ${x.lectura.secciones.map((s) => s.titulo.split(' ')[0] + (s.parcial ? '(p)' : '')).join(' ')} · pre ${x.preguntas.pretest.length} · quiz ${x.preguntas.quiz.length} · repaso ≈${x.lectura.paraElRepaso.min}′`);
  for (const x of derma) console.log(`  Derma d${x.d} ${x.dia} · planB ${x.lectura10.planB ? x.lectura10.planB.min + '′' : '—'}${x.testProMIR ? ` · test cap ${x.testProMIR.cap} ${x.testProMIR.nQ}Q de ${x.testProMIR.citadasProMIR} citadas` : ''}`);
}
