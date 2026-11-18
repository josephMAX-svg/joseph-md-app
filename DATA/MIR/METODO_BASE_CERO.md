# MIR · Método BASE CERO de la 1.ª vuelta (v6.10 · mié 18-nov-2026)

> **Orden de Joseph (18-nov):** «todos estamos partiendo de CERO … las preguntas tienen que ser preguntas REALES … estructura planes bien
> estructurados, verifica todo; empezamos mañana 19». Este documento es la **síntesis propia** del método MIR para quien empieza de cero, con la
> fuente de cada afirmación. Manda sobre §3 y §9.2 de [`METODO_RAVIMEDTEST.md`](METODO_RAVIMEDTEST.md) donde se contradigan; todo lo demás de
> ese documento (Anki de dos mazos, repasos relacionales, simulacro, corrección) sigue vigente.
>
> **Qué cambia:** el CONTENIDO de los pasos de la hora MIR (15:15-16:15): nivel del comentario de cada pregunta por **fases**, pre-test como
> línea base en F1, lectura en el orden del capítulo **sin saltar secciones** por acertar el pre-test, criterio de APEX por fase y respaldo de
> preguntas **solo MIR oficial**. **Qué NO cambia:** franjas, minutos de cada paso, fechas, D#, capítulos, Calendar y Supabase; las preguntas asignadas
> tampoco, salvo el reparto de F1 que sigue a la lectura de base sin PARCIAL (fix del 18-nov, §4b).
>
> **Dónde vive:** datos en [`metodo_ravimedtest.json`](metodo_ravimedtest.json) › `fases` → `gen_mir_guia.js` → `MIR_METODO.fases`
> (`src/lib/mirGuiaDatos.ts`) → `src/lib/mirGuia.ts` (`mirFaseDe`, `metodoRavi`, D77/D78, banqueo) · pre-test y lectura en
> [`guia_lectura/gen_guia_lectura.js`](guia_lectura/gen_guia_lectura.js) · UI en `src/components/study/MirTodayPlan.tsx`.
> `node DATA/MIR/guia_lectura/gen_mir_guia.js --check` falla si un día pierde su fase, su nivel, su criterio APEX o si algún paso pide preguntas
> que no sean MIR oficiales.

---

## 1. Fuentes (cada dato de abajo lleva la suya)

| Marca | Fuente | Qué aporta |
|---|---|---|
| **NLM-1** | NotebookLM «MIR · RaviMedTest Engine (método + Anki + vueltas)» (39 fuentes: vídeos de @ravimedtest), consulta del 18-nov-2026 · «primera vuelta de una asignatura nueva desde cero» | estudiar primero y preguntar después, desgloses desde el día 1, Anki no desde cero, vueltas y criterio de paso, prioridades |
| **NLM-2** | mismo cuaderno, consulta del 18-nov-2026 · «cómo responder y corregir una pregunta; los 3 niveles» | proceso de respuesta, 3 niveles de aprovechamiento, subida de nivel progresiva, cuadernito de fallos, qué merece tarjeta |
| NLM-0 | mismo cuaderno, consultas del 20-oct-2026 (resumidas en `METODO_RAVIMEDTEST.md` §2) | Anki de dos mazos, relacionales, simulacro, percentiles, 3 errores |
| AST | Google Drive de Joseph (solo nombre, repo público): carta «Digestivo 1 vuelta» del Curso Intensivo MIR Asturias (sep-2023), leída el 18-nov-2026 | cómo plantea una academia la 1.ª vuelta |
| RM | Redacción Médica, «Cómo empezar a estudiar el MIR 2027: el examen de este año tiene la clave» (24-feb-2026; consejo de José Curbelo) | hacer el último MIR antes de estudiar = línea base |
| POOL | `src/lib/mirPreguntasOficiales.ts` (cuadernillos y plantillas definitivas del Ministerio, MIR 2022-2026; ver [`POOL_USO.md`](POOL_USO.md)) | peso real de cada asignatura · preguntas oficiales con año-número |
| MED | [`guia_lectura_semana1-2.json`](guia_lectura_semana1-2.json) (medición de los 76 capítulos ProMIR, 18 y 20-oct-2026) | secciones, minutos y preguntas MIR citadas por sección |
| CIENCIA | Richland, Kornell y Kao (2009) *J Exp Psychol Appl* 15:243 · Kornell, Hays y Bjork (2009) *JEP:LMC* 35:989 · Roediger y Karpicke (2006) *Psychol Sci* 17:249 · Cepeda et al. (2006) *Psychol Bull* 132:354 · Dunlosky et al. (2013) *Psychol Sci Public Interest* 14:4 | efecto del pre-test, efecto test, espaciado (ya recogidos en la memoria del proyecto: no se re-investiga) |

Las frases son resumen propio; ninguna cita literal pasa de 15 palabras. NotebookLM resume los vídeos: lo que no está en ellos se marca «no consta».

---

## 2. Empezar de cero según Ravi (NLM-1)

1. **Primero se estudia el tema y después se hacen sus preguntas**, con el manual al lado al corregir. Leer los desgloses ANTES para recortar
   qué estudiar es lo que él llama «hacerse el harakiri»: cierra la puerta a lo nuevo y a lo no preguntado de forma directa.
2. En 1.ª vuelta, **máxima amplitud** sobre la base fisiopatológica; las preguntas de años anteriores se trabajan **desde el primer día**, en
   paralelo al tema del día, exprimiendo cada una (3 niveles, §3).
3. **Anki no es para aprender desde cero:** sus tarjetas son conceptos de nivel 3/5-4/5; primero la base y los desgloses básicos, y Anki como
   complemento acotado.
4. **Vueltas:** la 1.ª es de trabajo profundo (dejar el material trabajado, esquemas y temas conflictivos detectados); la 2.ª consolida con
   repetición activa, Anki y simulacros; la 3.ª y la 4.ª fijan. **Se pasa de una a otra por calendario**, no por sensación de dominio: cerrar cada
   bloque en su fecha asegura las repeticiones espaciadas.
5. **Prioridades** (NLM-1): las asignaturas densas con algoritmos (Infecciosas, Hematología, Endocrinología, Ginecología) y la base acumulativa de
   Estadística/Epidemiología; y no dejar sin trabajar los últimos temas de cada manual (en Cardiología: valvulopatías, HTA/aorta, vascular
   periférica, congénitas).

**Coincide con la academia (AST):** la carta de 1.ª vuelta de Digestivo pide centrarse en lo más importante y en los conceptos que han caído
2 o más veces (las repetidas son ≈ la mitad del examen), con tres tareas (manual · test · minisimulacros), unas 2 h/día y días comodín; lo que no
entra se profundiza en las vueltas siguientes.

**Y con la línea base (RM):** hacer el último examen MIR antes de estudiar nada da el punto de partida, sin que una explicación previa condicione
la respuesta. En una hora diaria no cabe un MIR entero: el **pre-test de 5Q del capítulo** es esa línea base a escala de tema, y además el
intento fallido antes de estudiar mejora lo que se aprende después (CIENCIA: efecto del pre-test).

---

## 3. Cómo se responde y se corrige una pregunta (NLM-2)

**Responder (proceso de Ravi):**
1. En casos largos y con imagen, lee primero el **principio del enunciado y la última frase** (qué te piden).
2. Con imagen, ten el diagnóstico (o las dos sospechas) **por el texto antes de mirarla**; la imagen confirma, no busca.
3. **Descarta** lo incoherente con el enunciado, lo que no prioriza lo que salva la vida primero y lo inverosímil.
4. **Con 2 opciones vivas, arriesga** (con −1/3 la esperanza es positiva). En el plan: en blanco solo si no descartas 2.

**Los 3 niveles de aprovechamiento** (Ravi exprime la pregunta «hasta el tuétano»):

| Nivel | Qué es | Ejemplo que da (resumido) |
|---|---|---|
| **1 · literal** | el concepto exacto que ya cayó; lo acierta cualquiera por encima del percentil 60 | qué enzima inhibe un IECA · el antídoto de los betabloqueantes |
| **2 · permutaciones** | cómo el Ministerio gira la misma base: al revés, desde otro ángulo, con un fármaco vecino | angioedema por IECA → ¿y con sacubitrilo/valsartán? |
| **3 · cara B** | cada opción incorrecta desgranada y el concepto contiguo de nivel 3-4/5: ¿cómo me podrían pillar mañana aunque hoy acierte? | por qué mecanismo revierte el glucagón al betabloqueo · estenosis renal bilateral e IECA |

**Para quien parte de cero se sube de nivel, no se aplican los 3 desde la primera pregunta:** primero la base y los conceptos repetidos (nivel 1);
el material discriminativo de nivel 3-4 renta cuando lo básico está controlado (NLM-2, vídeos «PREGUNTAS DISCRIMINATIVAS · La clave del MIR» y
«HAY FECHA: MIR 2021»). Tiempo de corrección por pregunta: **no consta** (corrige un simulacro en una jornada intensiva); el plan usa 30 s de
comentario por pregunta (MED, `mirGuia`).

**Qué merece tarjeta (NLM-2):** solo los «fallos tontos» propios (mazo personal pequeño, prioridad absoluta) y los conceptos discriminativos de
nivel 3-4/5; Anki no es un vertedero ni una copia del manual. **Cuadernito de fallos** de 1.ª vuelta: escueto, por asignatura, solo lo fallado
que el manual no deja claro → en el plan es el **Shopping List** del día + el log `mir_eval_log`.

---

## 4. Las 3 fases de la 1.ª vuelta (decisión de diseño sobre §2-§3)

| Fase | Días · fechas | Pre-test | Lectura | Comentario del quiz (y de la eval) | APEX | Puerta para pasar |
|---|---|---|---|---|---|---|
| **1 · BASE · nivel 1** | D1-D32 · **jue 19-nov → sáb 2-ene** (fechas de plan mié 18-nov → sáb 2-ene; alias de corrida_s1) | **línea base**: contesta las 5 aunque adivines; la regla del blanco va en la eval y el quiz | **LECTURA DE BASE** (§4b): las secciones que pregunta el MIR, **cada una entera** (nunca PARCIAL), en el orden del capítulo; ninguna de la lista se salta aunque aciertes su pregunta; el «cómo» declara la cobertura del día y manda el resto a la 2.ª vuelta | nivel 1 + proceso de respuesta de §3 | solo fallos de hoy (conceptos de nivel 1) | el **lun 4-ene (D33)** por calendario, si la media del neto de los 6 cierres de F1 (D4 Epidemiología · D5 Bioética · D12 Cardiología · D17 Neumología · D23 Nefrología · D31 Gastroenterología) es **≥ 55 %**; si no, el quiz sigue en nivel 1 hasta 2 cierres seguidos ≥ 55 % |
| **2 · CONSOLIDACIÓN · niveles 1-2** | D33-D76 · lun 4-ene → jue 4-mar-2027 (Endocrinología → Psiquiatría) | con la **regla del blanco** | LECTURA DIRIGIDA a las secciones más citadas, en orden y sin saltar ninguna | + 1 línea de permutación · en los fallos, por qué es falsa cada opción | fallos + fallos tontos | el **vie 5-mar-2027 (D77)**: neto del mini-MIR **≥ 50 %** (mínimo on-track del hito); si no, el banqueo sigue en niveles 1-2 hasta 2 semanas seguidas ≥ 50 % |
| **3 · DISCRIMINATIVA · nivel 3** | D77-D78 (vie 5 y lun 8-mar-2027) + banqueo (mar 9-mar-2027 → Step 1) | — | corrección Whole-Page del apartado | cara B: cada opción incorrecta, también en las acertadas con duda | + conceptos discriminativos de nivel 3-4/5 | 2.ª vuelta (fase principal, oct-2027) por calendario |

Por qué así: el paso es **por calendario** (Ravi, §2.4) y la **puerta** se mide con instrumentos que el plan ya registra (cierres y mini-MIR, mismos
umbrales del log: ≥ 70 % consolidada · 55-69 % intermedia · < 55 % a las anclas D-7; 50 % = hito on-track). Una puerta no cumplida **no mueve
fechas ni minutos**: solo mantiene el nivel del comentario.

### 4b. Lectura de base de F1: qué es y qué no (fix del 18-nov, revisión de los frentes)

**Qué es:** en 16′ (14′ de secciones a 180 palabras/min + 1′ de recuadro; 14,4-18,1′ a 150, regla fija 0,85-1,15) no cabe un capítulo ProMIR de F1
(**63′ de media**; Cardiología básica 96,5′, Hígado 215,5′). La lectura de base es una **selección**: las secciones con más preguntas MIR citadas
(MED), **cada una entera**, leídas en el orden del capítulo. Es el criterio de la academia para la 1.ª vuelta (AST: lo que ha caído 2 o más veces) y
**no** es «sin saltar ninguno» del capítulo: se leen de media **13,7′ de 63′ (≈ 22 %)** al día; el resto queda medido para la 2.ª vuelta (fase principal
MIR, tras el handoff del vie 3-dic-2027).

**Qué cambió (antes → después):** la versión anterior leía en 12 días una sección «PARCIAL: solo los párrafos con chip MIR ≥2015» bajo un paso que
prometía «cada apartado entero», y la reserva iba por peso bajo «sigue en orden». Ahora: (1) **ninguna sección PARCIAL en F1**: la que no cabe se salta
y entra la siguiente entera que quepa; (2) la **reserva** va en el orden del capítulo (los 76 días); (3) el «cómo» **empieza** con la cobertura del día y
el destino del resto («Hoy lees X′ de los Y′ del capítulo (P %) … el resto → 2.ª vuelta (tras el handoff del vie 3-dic-2027)»; antes «oct-2027», que
ya no era la fecha); (4) el quiz de esos días se reparte con lo leído hoy delante (mismo conjunto de preguntas del capítulo; 2027 aislado con el
pase 1 + veto de `gen_guia_lectura.js`); (5) `--check` (`gen_guia_lectura.js` y `gen_mir_guia.js`) exige 0 PARCIAL, el orden y la cobertura.

| D | Fecha de plan → real | Antes | Después (enteras, en orden) | Cobertura |
|---|---|---|---|---|
| D6 | mié 25-nov → jue 26-nov | 3.2 (PARCIAL 14′ de 35′) | 2.1 · 2.5 · 2.6 · 5.1 · 5.2 | 13,5′ de 103′ (13 %) |
| D7 | jue 26-nov → vie 27-nov | 3.6 (PARCIAL 14′ de 16′) | 1 · 2.1 · 3 · 3.1 · 3.2 · 3.4 · 3.5 | 14′ de 69′ (20 %) |
| D8 | vie 27-nov → lun 30-nov | 6.2 (PARCIAL 14′ de 40′) | 2 · 4.1 · 5 · 6 | 12,5′ de 164,5′ (8 %) |
| D14 | lun 7-dic → mar 8-dic | 1.1 (PARCIAL 14′ de 15,5′) | 1 · 1.2 · 1.3 · 2 · 2.1 · 2.2 · 3 · 3.1 | 13′ de 32,5′ (40 %) |
| D15 | mar 8-dic → mié 9-dic | 7 · 8 (PARCIAL 5,5′ de 6′) · 8.9 | 3 · 4 · 7 · 8.5 · 8.6 · 8.8 · 8.9 · 9 | 13′ de 41,5′ (31 %) |
| D18 | vie 11-dic → lun 14-dic | 4 (PARCIAL 5,5′ de 6′) · 4.2 · 7.2 | 1 · 3.2 · 4.1 · 4.2 · 7.1 · 7.2 | 12′ de 34′ (35 %) |
| D20 | mar 15-dic → mié 16-dic | 1.1 (PARCIAL 9′ de 13,5′) · 1.2 · 2 | 1.2 · 2 · 3 · 5 | 12′ de 47,5′ (25 %) |
| D23 | vie 18-dic → lun 21-dic | 10.2 (PARCIAL 14′ de 16′) | 9.1 · 9.8 · 11.2 | 14′ de 215,5′ (6 %) |
| D25 | mar 22-dic → mié 23-dic | 2.1 (PARCIAL 14′ de 18,5′) | 3.1 · 7.1 | 14′ de 97,5′ (14 %) |
| D29 | mar 29-dic → mié 30-dic | 3.1 (PARCIAL 14′ de 26′) | 2.2 · 3.2 · 3.4 · 5 | 13′ de 68,5′ (19 %) |
| D30 | mié 30-dic → jue 31-dic | 4.3 (PARCIAL 8,5′ de 11,5′) · 4.4 | 2 · 3 · 4.4 · 4.5 · 5.1 | 13,5′ de 48′ (28 %) |
| D32 | sáb 2-ene (07:15) | 5.4 (PARCIAL 9′ de 10,5′) · 6.1 · 8.2 | 6.1 · 8.1 · 8.2 (5.4 Graves-Basedow pasa a la reserva) | 13,5′ de 67,5′ (20 %) |

Los otros 20 días de F1 leen las mismas secciones (cambia el orden de la reserva y la cobertura al principio del «cómo»). El D1 conserva su lista
(decidida con Joseph el 17-nov) y gana la cobertura: 22′ de 49,5′ (44 %).

**Tensión que queda (decide Joseph, §10):** Ravi (NLM-1 §2.1) desaconseja recortar el temario por los desgloses; la lectura de base recorta por las
preguntas citadas porque la hora es fija. Alternativa: priorizar en F1 los **fundamentos** (anatomía y fisiología de cada capítulo cimiento) aunque
bajen las citas cubiertas.

---

## 5. La hora MIR en F1 (sin cambio de minutos)

| Tipo de día | Reparto (min) |
|---|---|
| D1 (jue 19-nov) | pre-test línea base 8 · Orientación + títulos 3 · LECTURA DE BASE 26 · quiz 6-8Q (máx. 10) 13 · ≤4 APEX 7 · repaso en blanco + 4 tarjetas de Ravi 3 (decidido con Joseph el 17-nov) |
| normal (eval de 4Q) | eval 6 · Anki 6 · log 3 · pre-test 7 · LECTURA DE BASE 16 · quiz 6Q (máx. 8) 12 · APEX 10 |
| eval de 2-3Q (D2, D3, D6, D7) | eval 4Q comentadas (ancladas + cola del quiz del D-1) 7 · Anki 5 · log 3 · pre-test 7 · lectura 16 · quiz 12 · APEX 10 |
| inicio de asignatura (cierre) | test de cierre 10Q 15 · relacional ANTES 3 · pre-test 7 · lectura 16 · quiz 12 · APEX 7 |
| fin de asignatura | … · APEX 7 · relacional AL TERMINAR 3 |

Tiempo ↔ material (regla fija 0,85-1,15, auditada en el lote 1-ter y re-verificada con `gen_guia_lectura.js --check`): pre-test 5 × 77 s = 6,4′ en 7′ ·
lectura = las mismas secciones medidas a 150 palabras/min (15,5-18,1′ en 16′) · quiz 6 × 107 s = 10,7′ en 12′ · eval 4 × 77 s = 5,1′ en 6′.
Esta revisión **no cambia ningún minuto** (comprobado: 0 de 81 bloques con minutos distintos antes → después).

---

## 6. F1 día a día (lo que ve Joseph del jue 19-nov al sáb 2-ene)

Hora: **15:15-16:15** (el sáb 2-ene, D32, a hora fija **07:15-08:15**). Todos en **FASE 1 · BASE · nivel 1**.

| D | Fecha de plan | **Día real** | Asignatura — tema | Cómo empieza la hora · relacional | Lectura |
|---|---|---|---|---|---|
| D1 | mié 18-nov | **jue 19-nov** | Epidemiología — Estudios experimentales: Ensayo clínico | pre-test (línea base) | 26′ |
| D2 | jue 19-nov | **vie 20-nov** | Epidemiología — Clasificación de los estudios de investigación | eval 2Q + 2Q de la cola del quiz del D1 | 16′ |
| D3 | vie 20-nov | **lun 23-nov** | Epidemiología — Evaluación de pruebas diagnósticas | eval 2Q + 2Q de la cola del D2 · rel. AL TERMINAR | 16′ |
| D4 | lun 23-nov | **mar 24-nov** | Medicina Legal y Bioética — Principios de bioética y relación médico-paciente | cierre Epidemiología · rel. ANTES + AL TERMINAR | 16′ |
| D5 | mar 24-nov | **mié 25-nov** | Cardiología — Cardiología básica | cierre Bioética · rel. ANTES | 16′ |
| D6 | mié 25-nov | **jue 26-nov** | Cardiología — Trastornos del ritmo | eval 3Q + 1Q de la cola del D5 | 16′ |
| D7 | jue 26-nov | **vie 27-nov** | Cardiología — Cardiopatía isquémica | eval 3Q + 1Q de la cola del D6 | 16′ |
| D8 | vie 27-nov | **lun 30-nov** | Cardiología — Insuficiencia cardíaca | eval 4Q | 16′ |
| D9 | lun 30-nov | **mar 1-dic** | Cardiología — Valvulopatías | eval 4Q | 16′ |
| D10 | mar 1-dic | **mié 2-dic** | Cardiología — Riesgo cardiovascular | eval 4Q | 16′ |
| D11 | mié 2-dic | **jue 3-dic** | Cardiología — Enfermedades del miocardio | eval 4Q · rel. AL TERMINAR | 16′ |
| D12 | jue 3-dic | **vie 4-dic** | Neumología — Fisiología y fisiopatología respiratoria | cierre Cardiología · rel. ANTES | 16′ |
| D13 | vie 4-dic | **lun 7-dic** | Neumología — Cáncer de pulmón | eval 4Q | 16′ |
| D14 | lun 7-dic | **mar 8-dic** | Neumología — Pleura, mediastino y diafragma | eval 4Q | 16′ |
| D15 | mar 8-dic | **mié 9-dic** | Neumología — EPOC | eval 4Q | 16′ |
| D16 | mié 9-dic | **jue 10-dic** | Neumología — Enfermedades intersticiales | eval 4Q · rel. AL TERMINAR | 16′ |
| D17 | jue 10-dic | **vie 11-dic** | Nefrología — Fisiología renal e hidroelectrolítico | cierre Neumología · rel. ANTES | 16′ |
| D18 | vie 11-dic | **lun 14-dic** | Nefrología — Fracaso renal agudo | eval 4Q | 16′ |
| D19 | lun 14-dic | **mar 15-dic** | Nefrología — Glomerulonefritis primarias | eval 4Q | 16′ |
| D20 | mar 15-dic | **mié 16-dic** | Nefrología — Riñón y enfermedades sistémicas | eval 4Q | 16′ |
| D21 | mié 16-dic | **jue 17-dic** | Nefrología — Insuficiencia renal crónica | eval 4Q | 16′ |
| D22 | jue 17-dic | **vie 18-dic** | Nefrología — Síndromes clínicos en nefrología | eval 4Q · rel. AL TERMINAR | 16′ |
| D23 | vie 18-dic | **lun 21-dic** | Gastroenterología — Enfermedades del hígado | cierre Nefrología · rel. ANTES | 16′ |
| D24 | lun 21-dic | **mar 22-dic** | Gastroenterología — Enfermedades del colon | eval 4Q | 16′ |
| D25 | mar 22-dic | **mié 23-dic** | Gastroenterología — Intestino delgado | eval 4Q | 16′ |
| D26 | mié 23-dic | **jue 24-dic** | Gastroenterología — Estómago | eval 4Q | 16′ |
| D27 | jue 24-dic | **lun 28-dic** | Gastroenterología — Miscelánea de temas quirúrgicos | eval 4Q | 16′ |
| D28 | lun 28-dic | **mar 29-dic** | Gastroenterología — Páncreas | eval 4Q | 16′ |
| D29 | mar 29-dic | **mié 30-dic** | Gastroenterología — Esófago | eval 4Q | 16′ |
| D30 | mié 30-dic | **jue 31-dic** | Gastroenterología — Vía biliar | eval 4Q · rel. AL TERMINAR | 16′ |
| D31 | jue 31-dic | **vie 1-ene** | Endocrinología y Nutrición — Diabetes mellitus | cierre Gastroenterología · rel. ANTES | 16′ |
| D32 | sáb 2-ene | **sáb 2-ene (07:15)** | Endocrinología y Nutrición — Glándula tiroides | eval 4Q | 16′ |

**Progresión dentro de F1** (por qué es base cero y no un nivel avanzado): los 4 primeros días son las dos asignaturas transversales y acumulativas
(Epidemiología y Bioética, NLM-1 §2.5); desde el D5 cada asignatura empieza por su capítulo **cimiento** (fisiología/semiología: Cardiología básica,
Fisiología respiratoria, Fisiología renal) antes que la patología (regla CIMIENTO de `gen_mir_daily.js`); cada día se lee la base **antes** de
comentar sus preguntas; la eval del día siguiente (D-1) y las anclas D-3/D-7 traen de vuelta lo leído (espaciado, CIENCIA); y los 6 cierres de
asignatura de F1 son la puerta medida para subir de nivel en enero.

---

## 7. Preguntas: SOLO MIR oficiales, con su año-número

| Paso | De dónde salen | Id |
|---|---|---|
| pre-test · quiz · cierre · mini-MIR | pool oficial de la app (POOL: cuadernillo + plantilla definitiva del Ministerio, MIR 2022-2026) | `AAAA-NNN` (año del examen) |
| quiz · eval anclada (resto) | preguntas MIR que el propio capítulo ProMIR cita en cada sección (MED) | `/pregunta/MIR/AAAA-NNN` = «MIR AAAA-AAAA+1, Pnnn» |
| respaldo (si el pool no llega) | **antes:** «test por asignatura ProMIR» / «test del capítulo ProMIR» (sin filtro: no verificado como solo-MIR) → **ahora:** MIR oficiales citadas en el capítulo/asignatura ProMIR o cuadernillos oficiales (examenesmir) | año-número |

En el frente MIR **no hay ni hubo preguntas generadas por IA** (barrido del 18-nov de «Proyecto Claude», «viñetas», «espejo», «propias», «genera N
preguntas»: 0 en la guía y la app MIR; las «viñetas APEX» son tarjetas de los fallos propios, no preguntas de evaluación). El `--check` lo vigila en
los 78 días del plan y en las 220 sesiones del banqueo.

---

## 8. Rentabilidad por asignatura (peso real en el MIR)

Fuente: POOL, MIR 2022-2026 sin anuladas ni reservas (977 preguntas; ≈ 195/año). «Rent. ProMIR» = color de rentabilidad de ProMIR
(`mirTemarioData.ts`); «Σ peso cap.» = suma del Peso MIR % de los capítulos elegidos de esa asignatura (`MIR_COBERTURA`).

| # | Asignatura | Preguntas 2022-26 | % | /año | Rent. ProMIR | En la 1.ª vuelta | Σ peso cap. |
|---|---|---|---|---|---|---|---|
| 1 | Cardiología | 79 | 8,1 % | 15,8 | naranja | D5-D11 (7 d) | 71,8 |
| 2 | Gastroenterología | 73 | 7,5 % | 14,6 | oculta | D23-D30 (8 d) | 100 |
| 3 | Enfermedades Infecciosas | 64 | 6,6 % | 12,8 | amarilla | D49-D56 (8 d) | 62,9 |
| 4 | Neurología | 57 | 5,8 % | 11,4 | amarilla | D37-D43 (7 d) | 76,6 |
| 5 | Endocrinología y Nutrición | 54 | 5,5 % | 10,8 | amarilla | D31-D36 (6 d) | 78,0 |
| 6 | **Traumatología** | 50 | 5,1 % | 10,0 | verde | **— (fuera)** | — |
| 7 | Ginecología y Obstetricia | 49 | 5,0 % | 9,8 | amarilla | D57-D62 (6 d) | 46,7 |
| 8 | Neumología | 46 | 4,7 % | 9,2 | verde | D12-D16 (5 d) | 61,2 |
| 9 | Pediatría | 39 | 4,0 % | 7,8 | roja | D69-D73 (5 d) | 78,1 |
| 10 | Psiquiatría | 39 | 4,0 % | 7,8 | oculta | D74-D76 (3 d) | 61,5 |
| 11 | Reumatología | 39 | 4,0 % | 7,8 | amarilla | D63-D68 (6 d) | 65,1 |
| 12 | Nefrología | 37 | 3,8 % | 7,4 | verde | D17-D22 (6 d) | 80,5 |
| 13 | **Geriatría** | 35 | 3,6 % | 7,0 | verde | **— (fuera)** | — |
| 14 | Hematología | 34 | 3,5 % | 6,8 | verde | D44-D48 (5 d) | 65,0 |
| 15 | ORL | 29 | 3,0 % | 5,8 | verde oscuro | — | — |
| 16 | Dermatología | 28 | 2,9 % | 5,6 | verde | — (frente Derma) | — |
| 17 | Epidemiología | 24 | 2,5 % | 4,8 | amarilla | D1-D3 (3 d) | 70,1 |
| 18 | Oncología Médica | 24 | 2,5 % | 4,8 | verde | — | — |
| 19 | Inmunología | 22 | 2,3 % | 4,4 | verde oscuro | — | — |
| 20 | Medicina Legal y Bioética | 21 | 2,1 % | 4,2 | amarilla | D4 (1 d) | 39,8 |
| 21-30 | Urología 18 · Oftalmología 17 · Radiología-Urgencias 17 · Paliativos 15 · Genética 13 · Gestión 12 · Farmacología 9 · Anestesia 7 · Alergología 6 · sin asignatura 20 | 134 | 13,7 % | — | — | — | — |

Lectura: las 14 asignaturas de la 1.ª vuelta suman **655 de 977 preguntas (67 %)** del MIR reciente. Los días por asignatura siguen el peso
(Cardiología, Gastro e Infecciosas 7-8 días; Bioética 1). **Huecos de rentabilidad** (decisión de Joseph, §10): Traumatología (5,1 %) y Geriatría
(3,6 %) pesan más que Hematología, Epidemiología o Bioética y no están en la 1.ª vuelta; Psiquiatría (4 %) tiene 3 días frente a los 6 de
Nefrología (3,8 %).

---

## 9. 2027: la fase de cada tramo y lo que se ajustó

| Tramo | Fase | Ajuste (solo texto; minutos y preguntas iguales) |
|---|---|---|
| D33-D76 · lun 4-ene → jue 4-mar | 2 · CONSOLIDACIÓN | aviso de fase · pre-test con la regla del blanco · lectura sin saltar secciones (antes: «las secciones cuyas preguntas acertaste se saltan») · comentario de niveles 1-2 (antes, en los 76 días: «por qué es falsa cada incorrecta + detalles de nivel 3-4/5») · APEX sin nivel 3-4/5 · **fix 18-nov:** reserva en el orden del capítulo; «cada apartado de la lista entero, salvo el marcado PARCIAL» cuando lo hay (antes «cada apartado entero»); evals de **D33, D35, D36 y D39**: las anclas D-1/D-3/D-7 que vienen de D29, D30 y D32 son ahora de lo que se lee ese día (6 preguntas MIR citadas cambian; el resto de 2027, idéntico) |
| D77 · vie 5-mar (mini-MIR) | puerta 2 → 3 | aviso de fase (el neto ≥ 50 % abre la fase 3) |
| D78 · lun 8-mar (corrección) | 3 | aviso de fase |
| banqueo · mar 9-mar → Step 1 (220 sesiones) | 3 · DISCRIMINATIVA | aviso de fase · respaldo de preguntas solo MIR oficial con año-número (antes «test por asignatura ProMIR») · **fix 18-nov:** Anki «0,90 en la fase principal MIR, tras el handoff del vie 3-dic-2027» (antes «oct-2027») |

---

## 10. Pendientes y decisiones de Joseph

- [ ] **Lectura de base de F1 (§4b):** seguir con la selección por preguntas citadas (≈ 22 % del capítulo al día, cada sección entera) o priorizar los
      **fundamentos** (anatomía y fisiología del capítulo cimiento) aunque bajen las citas cubiertas. Sin su decisión no se cambia.
- [ ] **Puerta F1 → F2** (lun 4-ene): mirar la media del neto de los 6 cierres de F1 en el log; si < 55 %, avisar para que el quiz siga en nivel 1.
- [ ] **Traumatología y Geriatría fuera de la 1.ª vuelta** (8,7 % del MIR reciente juntas): ¿entran como Tier C del banqueo o en la 2.ª vuelta? (no se
      tocan fechas sin su decisión).
- [ ] Ravi pone primero las asignaturas densas (Infecciosas, Hemato, Endocrino, Gine); el plan las tiene en ene-feb-2027 porque cada asignatura MIR
      precede ~1 semana a su sistema del Step 1. Mantener (recomendado: no mover fechas) o reordenar en la 2.ª vuelta.
- [ ] Contar las tarjetas de «1º VUELTA» de cada subtema el día que toca (de momento solo están contadas las 3 de Epidemiología).

## 11. Verificación (18-nov-2026)

`node STUDY_HUB/_scrape/gen_mir_daily.js --check` · `node DATA/MIR/guia_lectura/gen_guia_lectura.js --check` ·
`node DATA/MIR/guia_lectura/gen_mir_guia.js --check` (958 bloques; 78 días con su fase; 0 preguntas no oficiales; fix 18-nov: lectura de base de F1
sin PARCIAL, en orden y con su cobertura declarada en los 32 días) · comparación antes → después de los 81 bloques: 0 minutos cambiados.
