# Step 1 desde nivel cero — estructura por FASES y método por SISTEMA (Palmerton) · 18-nov-2026

> **Qué es.** La estructura con la que se estudia el USMLE Step 1 partiendo de cero: las fases de Palmerton y su criterio de paso, cómo
> arranca un principiante, el método de cada sistema, la rentabilidad de cada tema y qué hace cada día del plan (F1 2026 y tramo 2 de 2027).
> Es **síntesis propia**: no transcribe vídeos ni material de academias; solo títulos, conteos, porcentajes y citas de ≤15 palabras.
>
> **Dónde vive en la app.** Datos: `DATA/USMLE/_palmerton_estructura_v610.json` (fuente única) → `src/lib/usmlePalmertonFases.ts`
> (generado por `DATA/_scripts/usmle/gen_palmerton_fases.js`: fase + método + ajustes de cada fila) y el texto de la guía de F1 y de F3
> (`gen_usmle_guia.js`). En la pantalla del día (Step 1 › HOY) sale la tarjeta «🧭 FASE … · método Palmerton».
>
> **Marcas de fuente.**
> - **⚠NLM i-iv** = respuestas del cuaderno NotebookLM «STEP 1 · Palmerton Engine (método + sistemas)» del 18-nov-2026 (299 fuentes):
>   (i) fases · (ii) arranque desde cero · (iii-a/b/c) método por sistema · (iv) rentabilidad. Son síntesis del modelo: el cuaderno etiqueta
>   como «literal» frases que en revisiones anteriores no lo eran (ARRANQUE §9.1), así que aquí NADA se da por cita literal salvo que lo diga.
> - **METODO / POR_MATERIA / ARRANQUE** = `PALMERTON_METODO_COMPLETO.md` / `PALMERTON_POR_MATERIA.md` / `PALMERTON_NIVEL0_ARRANQUE.md`.
> - **USMLE** = *Step 1 Content Outline and Specifications* (usmle.org, leído el 18-nov-2026; «percentages are subject to change»).
> - **UW** = uWorld Step 1 en Qbankly, `qbankly_uworld_step1_filtros.tsv` (API del Test Composer, 18-oct-2026).
> - **[SÍNTESIS]** = decisión de este documento · **A VERIFICAR** = dato dudoso o contradictorio.

---

## 1. Resumen en 10 líneas

1. **Cuatro fases y una medición.** Fase 1 SUBTEMA (niveles 0-2) → Fase 2 SISTEMA (nivel 3) → Fase 3 MULTISISTEMA (nivel 4) → Fase 4 RANDOM (nivel 5). Los NBME/UWSA/Free 120 son MEDICIÓN, no progresión (METODO §3.1, §9.1; ⚠NLM i).
2. **Se pasa de fase por un número, no por la fecha:** 80 % en 10 consecutivas del subtema (fase 1) · 80 % en 20 timed del sistema (fase 2) · 80 % en un mixto de 20 con ≥3 sistemas (fase 3) · NBME ≥65 % ≈ 95 % de pase (fase 4) (METODO §3.1, §9.1).
3. **Un principiante empieza en el nivel 0:** 3-4 preguntas a fondo por mañana, en Tutor y sin reloj, de UN solo subtema; nada de bloques grandes (ARRANQUE §3; METODO §3.3: principiante 5-10 Q/día; ⚠NLM ii).
4. **Preguntas primero, libro después:** pre-test ciego de 3-5 Q → First Aid (la página completa) → tarjetas de mecanismo → 5-10 Q nuevas de validación (⚠NLM ii, «UWorld + First Aid: 4 Keys to Mastery»).
5. **Cada pregunta:** tapar opciones → CCSN → SAQ → juez, no abogado → Educational Objective → shopping list → clasificar el fallo: knowledge / transfer / unforced (METODO §3.5, §5-6; ⚠NLM ii «Tracking Method»).
6. **Nada cronometrado antes del gate.** El reloj entra en el nivel 2 y solo en subtemas ya al 80 % (METODO §3.1, §11.4). Desde hoy, F1 no tiene ni un paso cronometrado fuera del NBME 25 (control en `verificar_v6.js`).
7. **Mezclar sí, cronometrar no:** intercalar subtemas ya vistos ayuda a retener (⚠NLM i, «USMLE Step 1 Study Plan From a Learning Scientist» [NUEVO]); en nivel 0-1 se mezcla en Tutor.
8. **Rentabilidad:** Pathology 45-55 % y Physiology 30-40 % de las preguntas (USMLE) → mecanismo antes que dato. Por sistema pesan más Reproductor + Endocrino (12-16 %), Respiratorio + Renal (11-15 %), Neuro + Psiquiatría (10-14 %) y Sangre + Inmuno (9-13 %); en uWorld, Cardio (413 Q) y Neuro (399) son los dos primeros (USMLE; UW).
9. **Mayor retorno por hora:** subir un sistema débil de mucho peso (30 → 70 % en un 10 % del examen = +4 puntos) y los principios de patología general, que según el cuaderno sostienen ~la mitad de las preguntas de patología (⚠NLM iv, A VERIFICAR).
10. **F1 (2026) = Fase 1 entera:** patología general → inmuno → cardio en nivel 0 → 1; el tramo 2 (2027) recorre fase 1 por sistema, fase 2 en la reactivación y fase 4 en el banco intensivo, con 72 filas ajustadas de MODO (sin mover fechas, hitos, examen ni preguntas).

---

## 2. Fases, criterio de paso y calendario

| Fase · nivel | Tipo de preguntas | Modo | Volumen | Pasa con | Si no llega | Cuándo | Fuente |
|---|---|---|---|---|---|---|---|
| **Fase 1 · nivel 0** [SÍNTESIS] | UN subtema; 3-4 preguntas a fondo (≤45′ cada una) | Tutor, sin reloj | 3-4 + 5 de validación | ≥1 subtema al 80 % en 10 consecutivas y el análisis de una pregunta en ≤20-25′ dos sesiones seguidas | mismo subtema; vuelve a la página completa y rehaz las tarjetas como cronologías; **nunca** un recurso nuevo | F1 D2-D4 | ARRANQUE §3.0-3.4; METODO §3.3; ⚠NLM ii |
| **Fase 1 · nivel 1** (subtopic mastery, untimed) | UN subtema en bloques de 5 | Tutor, sin reloj | 10-20 Q/día (20-30 si la revisión cabe) | 80 % en 10 consecutivas, validadas en ≤24-48 h | *Four Critical Adjustments*: recursos → comprensión → aplicación → memoria; si en 1-2 días de Step no llega, el método está roto | F1 D5-D13 · cada subtema nuevo de 2027 | METODO §3.1-3.3, §2 fase 3; ⚠NLM i |
| **Fase 1 · nivel 2** (subtopic, timed) | bloques de 5 de subtemas YA al 80 % | Timed (90 s/Q, tope 2′) | 20-30 Q/día | 80 % en ≥3 subtemas, ≥1 validado en <48 h | si cae por contenido, vuelve a Tutor; si cae por tiempo, regla de los 2′ | 2027: 3.er día de cada sistema y «PARTE 2» de F4 | METODO §3.1; ⚠NLM i |
| **Fase 2 · SISTEMA** (nivel 3) | 10-20 Q de todo el sistema | Timed | 30-50 Q/día | 80 % en 20 timed consecutivas | bloque correctivo de 5 del subtema débil antes de repetir el del sistema | entrada: 3-5 subtemas al 80 % · 2027: 16:15 REENTRADA (F3, condicionada) y REACTIVACIÓN T121-T156 | METODO §3.1; ⚠NLM i («First Aid Ultimate Guide: 5 Phases», fase 2) |
| **Fase 3 · MULTISISTEMA** (nivel 4) | 20-30 Q de ≥3 sistemas dominados + el nuevo | Timed | 40-70 Q/día | 80 % en un mixto de 20 timed con ≥3 sistemas | deja de mezclar y vuelve al sistema que falla (nivel 3) | entrada: ≥3 sistemas en nivel 3 · 2027: viernes N4 y colchones (condicionados) | METODO §3.1; ⚠NLM i |
| **Fase 4 · RANDOM** (nivel 5) | 40 Q al azar | Timed (60′/bloque) | 40-80 Q/día | 80 % sostenido y NBME ≥65 % (≈95 % de pase) / ≥70 % (≈99 %) | vuelve al nivel 4 con los sistemas débiles del NBME; no examinarse sin margen | últimas 2-8 semanas · 2027: uw_random T157-T175, incorrectas, consolidación, taper | METODO §3.1, §9.1, §11.4; ⚠NLM i |
| **MEDICIÓN** | formulario oficial completo | Timed, Standard-Paced | — | no es progresión: es el mapa | el Day-After decide los sistemas débiles | NBME 25 (D8) = 1.ª línea base; tramo 2: NBME 29, 26, 27, 30, 28, UWSA1, 31, 32, UWSA2, 33, Free 120 | METODO §9.1-9.2; ⚠NLM ii («Tracking Method»: 2-3 NBME seguidos en ascenso) |

**Contradicciones del corpus (se resuelven así).**
- *¿Cuándo entra el reloj?* Un vídeo atribuye «hacia el día 10 todo cronometrado»; esa cita ya resultó NO literal (ARRANQUE §9.1) y contradice el nivel 2 condicionado al 80 % → manda el gate [SÍNTESIS].
- *¿Cuántas preguntas?* «How Many UWorld Questions…» permite 40-80 en el período dedicado; «Stop Studying for Step 1. Pass It Anyway.» [NUEVO] pide 10-20 analizadas a fondo para quien tiene bases débiles (⚠NLM i) → en nivel 0-1, la cifra del día es un **techo**: si la revisión de un bloque de 5 pasa de 30′, se para ahí [SÍNTESIS].
- *¿Validar en 24-48 h con 2 días de Step por semana?* Al final de la misma sesión con preguntas NUEVAS + revalidación el siguiente día de Step (⚠NLM ii; ARRANQUE §3.3).

## 3. Arranque de un principiante (semanas 1-2)

| Paso | Qué | Fuente |
|---|---|---|
| Línea base | Un NBME pronto aunque salga bajo («take an NBME before you feel ready», cita confirmada en ARRANQUE §2). En el plan: NBME 25 en el D8, no el día 1 (decisión del 17-nov) | ⚠NLM ii; ARRANQUE §8.1 |
| Subtema limpio | Palmerton empieza por la enfermedad coronaria (CAD) porque no exige saber mucho de otros temas | ⚠NLM ii, iii-a, iv («8 Signs That You're Studying Wrong…») |
| Preguntas primero | Pre-test ciego de 3-5 Q en Tutor → First Aid trata lo que el pre-test diagnosticó; leer el libro entero antes de preguntar = error | ⚠NLM ii («UWorld + First Aid: 4 Keys», «Beyond UFAP») |
| Volumen | Bloques de 5; 10-20 Q/día como máximo al empezar; con gaps profundos 5-10 | METODO §3.3; ⚠NLM ii |
| Por pregunta | tapar opciones · CCSN (contexto, cronología, severidad, ruido) · SAQ · juez, no abogado · Educational Objective · solo la explicación de la opción que dudaste · página completa del subtema · 5 preguntas de verificación · tarjetas | METODO §3.4-3.5, §5.1-5.6; ARRANQUE §3.1 (tabla con minutos) |
| Tiempo | Respuesta: tope de 2′ (regla de los 2 minutos; en nivel 0-1 sin reloj). Revisión: un bloque de 10 + su revisión ≈ 60′; nivel 0: ≤45′ por pregunta [SÍNTESIS] | METODO §3.4; ARRANQUE §3.1 |
| Registro (*Tracking Method* [NUEVO]) | % por subtema + causa de cada fallo: knowledge / transfer-interpretación / unforced + shopping list; si el % se queda plano 2 semanas, para de añadir preguntas y audita el registro | ⚠NLM i-ii |
| Tarjetas | De mecanismo / PC / imagen, frente `Subject - question`; nunca listas (las que más se olvidan). Plan: ≤20 nuevas/día (2-4 por pregunta) | APEX §1; ⚠NLM ii («I Analyzed 28,655 Anki Cards…»); ARRANQUE §6 |
| Qué NO hacer | bloques de 40-100 Q · una «primera pasada» pasiva · mazos prehechos masivos · >2′ en una pregunta · resetear y repetir preguntas · posponer el NBME | ⚠NLM ii |
| Inglés no nativo | viñeta siempre en inglés; la palabra que bloquea → shopping list como *vocabulary gap*; contar relecturas, no velocidad | ARRANQUE §5 |

## 4. Método por sistema

Pasos comunes a todo subtema (⚠NLM iii-a/b/c, idénticos en los 16): **pre-test 3-5 Q Tutor → página completa de First Aid (2-4 págs.) → tarjetas de mecanismo → 5-10 Q nuevas hasta 80 % en 10 consecutivas**. Costanzo como consulta de fisiología (curvas, túbulo, ejes, mecánica). Lo propio de cada sistema:

| Sistema | Ancla (pregunta guía) | Orden interno | Trampas típicas | Lo más preguntado | Fuente |
|---|---|---|---|---|---|
| **Patología general** | aguda = neutrófilos → crónica = macrófagos → fibrosis; la cronología vale en cualquier órgano | inflamación → lesión reversible (Na/K-ATPasa) → marcadores → necrosis/apoptosis → neoplasia → amiloide | LDH «específica» · absceso sin drenaje · hiperplasia (señal) vs neoplasia (autónoma) | lesión reversible/irreversible, troponina, cronología celular, Warburg, amiloide | POR_MATERIA §1; ⚠NLM iii-c |
| **Inmunología** | el MHC solo presenta péptidos → T solo contra proteínas; cambio de isotipo exige T helper | innata/adaptativa → MHC → citocinas → granuloma → hipersensibilidad → vacunas → inmunodeficiencias | la célula gigante no define el granuloma · tipo II lineal vs III granular | vacuna conjugada, Rh vs ABO, IL-1/IL-6/TNF, Bruton | POR_MATERIA §2; ⚠NLM iii-c («How the Immune System Works» como mapa) |
| **Cardiovascular** | PAM = GC × RPT · ΔP = Q × R · isquemia = demanda > oferta | **CAD → IC → arritmias → valvulopatías → congénitas/shock** (único sistema con orden explícito) | nitratos en IAM de VD · fase 0 nodal por Ca (no Na) · fallo derecho aislado | SCA y complicaciones, potenciales y antiarrítmicos, soplos, Swan-Ganz | POR_MATERIA §3; ⚠NLM iii-a |
| **Respiratorio** | «¿llega el O2 adonde debe y, si no, por qué?» | gas alveolar → A-a → V/Q → shunt/espacio muerto → gasometría → PFT | FiO2 21 % en la altitud · O2 al 100 % en retenedor · solo el shunt no corrige | gas alveolar, mecanismos de hipoxemia, HPV, PFT/DLCO | POR_MATERIA §4; ⚠NLM iii-a |
| **Renal** | «¿en qué punto del túbulo está el problema?» · nefrótico = barrera vs nefrítico = inflamación | creatinina → TCP → Na/agua → diuréticos → K → NTA → glomérulo → ácido-base (va justo tras Cardio) | creatinina como toxina · edema en SIADH · fase poliúrica de la NTA | nefrótico/nefrítico, NTA, SIADH, AINE vs IECA | POR_MATERIA §5; ⚠NLM iii-a |
| **GI e hígado** | localizar el dolor + leer LFTs + entender la náusea · PT/INR (agudo) vs albúmina (crónico) | bilirrubina → LFTs → VHB → vía biliar → páncreas → luminal (NOT IN SOURCES) | albúmina en falla aguda · anti-HBs aislado vs + anti-HBc | patrones de LFT, VHB, cirrosis, 5-HT3 | POR_MATERIA §6; ⚠NLM iii-a |
| **Endocrino** | retroalimentación en voz alta (1.º/2.º = hipófisis/3.º): piden flechas | ejes → hipófisis → tiroides → suprarrenal → DM → Ca/PTH (NOT IN SOURCES) | calcio sin corregir Mg · calcificación distrófica vs metastásica | tablas por eje, RAIU, CAD, PTH/Ca, PTHrP | POR_MATERIA §7; ⚠NLM iii-a |
| **Neurología** | dónde está la lesión · decusaciones · hallazgos cruzados de tronco | vías → médula → tronco → MNS/MNI → territorios → hemorragias → UNM (NOT IN SOURCES) | buscar déficit bilateral en tronco · MNS vs MNI · succinilcolina en denervación | ictus por territorio, tronco, PPC = PAM − PIC, miastenia vs botulismo | POR_MATERIA §8; ⚠NLM iii-b (Wallenberg/Weber: A VERIFICAR) |
| **Hemato-onco** | «¿los hematíes se crean o se destruyen?» · hepcidina · trombo arterial vs venoso | anemias por VCM → hierro → hemólisis → coagulación → anticoagulantes → neoplasias | warfarina sin puente · ferritina normal ≠ sin anemia · heparina se revierte con protamina | panel de hierro, electroforesis, PT/PTT, HIT, Coombs | POR_MATERIA §9; ⚠NLM iii-b |
| **Micro / ID** | sin columna en el corpus: cápsula → IgM, hierro, absceso se drena, +RNA vs −RNA | bacteriología → Gram+ → Gram− → micobacterias → virus → hongos/parásitos → antimicrobianos (app) | listas de microbios sin virulencia → cuadro | Bacterial infections (112 Q, la mayor subcategoría del banco) | POR_MATERIA §10; ⚠NLM iii-c (Sketchy/CMMRS + mazo aparte a 20/día) |
| **Reproductor** | qué estructura produce qué hormona en cada fase · dos células · GnRH pulsátil vs continua | ciclo → embarazo → preeclampsia → anovulación → anticoncepción → onco → masculino (NOT IN SOURCES) | ABO tan grave como Rh · hiperplasia endometrial vs neoplasia | Rh vs ABO, Klinefelter, VPH E6/E7, fármacos en el embarazo | POR_MATERIA §11; ⚠NLM iii-b (atribuciones a verificar) |
| **MSK / reuma / derma** | reuma = inmuno aplicada: busca el macrófago · masa ósea vs mineralización | hueso → contracción → artritis → autoinmunidad/vasculitis → piel (NOT IN SOURCES) | IMC bajo como 1.er factor de osteoporosis · Kawasaki sin todos los criterios | osteoporosis/osteomalacia, HLA-B27, vasculitis | POR_MATERIA §12; ⚠NLM iii-b (casi todo VACÍO) |
| **Psiquiatría** | la duración decide el diagnóstico (la C de CCSN) | ánimo/psicóticos → ansiedad/personalidad → sustancias → psicofármacos (app) | diagnosticar sin cronología | ánimo, psicóticos, ansiedad, sustancias | POR_MATERIA §13; ⚠NLM iii-b (clínica: NOT IN SOURCES) |
| **Bioestadística y ética** | «¿son diferentes los grupos?» · ética: obtener más información antes de actuar | diseños → OR/RR → 2×2 y prevalencia → p/α/β/poder → sesgos | VPP como propiedad fija · respuestas punitivas en ética | 2×2, diseños y sesgos, comunicación abierta | POR_MATERIA §14; ⚠NLM iii-b/c |
| **Bioquímica y genética** | solo se pregunta el paso regulado · enzima ausente → recesivo, canal hiperactivo → dominante | membranas → metabolismo HY → lípidos → vitaminas → molecular → genética | la ruta entera en vez del paso regulado · inhibidores vs desacopladores | von Gierke, cianuro, desacopladores, HbS/HbC | POR_MATERIA §15; ⚠NLM iii-c |
| **Farmacología (transversal)** | «likes dissolve likes» · mecanismo ↔ nombre ↔ toxicidad | con cada sistema; PK/PD y SNA primero | toxicidades sin receptor · todas las tarjetas de fármacos en el mazo general | barreras por carga, SNA, anticoagulantes, antídotos | POR_MATERIA §15; ⚠NLM iii-c |

## 5. Rentabilidad: qué pesa más

**Por sistema** (USMLE = % oficial · UW = preguntas del System en uWorld Step 1, 3.641 en total):

| Categoría oficial | % USMLE | Systems de uWorld | Q UW | Prioridad [SÍNTESIS] |
|---|---|---|---|---|
| Reproductive & Endocrine | 12-16 | Endocrine 199 · Female 79 · Male 52 · Pregnancy 59 | 389 | A |
| Respiratory & Renal/Urinary | 11-15 | Pulmonary 265 · Renal 224 | 489 | A |
| Behavioral Health & Nervous/Special Senses | 10-14 | Nervous 399 · Psychiatric 179 · ENT 40 · Ophthalmology 30 | 648 | A |
| Blood & Lymphoreticular/Immune | 9-13 | Hematology & Oncology 229 · Allergy & Immunology 108 | 337 | A |
| Musculoskeletal, Skin & Subcutaneous | 8-12 | Rheumatology/Ortho 165 · Dermatology 99 | 264 | B |
| Multisystem Processes & Disorders | 8-12 | Infectious 271 + General Principles (Micro 30, Path 39, Biochem 65, Genetics 61, Pharm 45) + Poisoning 32 + Misc 24 (asignación A VERIFICAR) | 567 | A (micro) / B |
| Cardiovascular | 7-11 | Cardiovascular 413 (1.º del banco) | 413 | A (y es el 1.er sistema de Palmerton) |
| Gastrointestinal | 6-10 | Gastrointestinal & Nutrition 306 | 306 | B |
| Social Sciences: Communication | 6-9 | Social Sciences 108 | 108 | A por hora |
| Biostatistics & Epidemiology | 4-6 | Biostatistics 120 | 120 | A por hora («puntos gratis», POR_MATERIA §14) |
| Human Development | 1-3 | — | — | C |

**Por disciplina** (USMLE): Pathology 45-55 · Physiology 30-40 · Nutrition 15-20 (así lo escribe la web; A VERIFICAR en el PDF) · Gross Anatomy & Embryology 10-20 · Microbiology 10-20 · Pharmacology 10-20 · Behavioral Sciences 10-15 · Biochemistry 5-15 · Histology & Cell Biology 5-15 · Immunology 5-15 · Genetics 5-10. **Competencias:** aplicar ciencia básica 60-70 % · diagnóstico 20-25 % · comunicación 6-9 % · práctica basada en el aprendizaje 4-6 %. En uWorld, los Subjects más grandes son Pathology 819 · Pharmacology 550 · Pathophysiology 487 · Microbiology 348 (UW).

**Retorno por hora (Palmerton).**
- Subir un tema débil de mucho peso rinde más que pulir uno fuerte: de 30 a 70 % en un 10 % del examen son +4 puntos; de 70 a 80 % en uno fuerte, +1 (⚠NLM iv, «How to Add 40% to Your Step 1 Score»).
- Los principios de patología general se transfieren a todos los órganos (el cuaderno dice «~50 % de las preguntas de patología», atribuido a un redactor del USMLE: A VERIFICAR) (⚠NLM iv).
- Dominar ~50 % del núcleo al 80 % lleva el global a ~65 % (≈95 % de pase) (⚠NLM i, iv; METODO §2).

**Orden de sistemas para quien empieza de cero (Palmerton):** Cardio (por la CAD) → Renal y Respiratorio → GI → Endocrino; bioquímica, genética e inmunología **no** al principio (⚠NLM iv, iii-c). El plan hace patología general → inmuno → cardio en F1 y Cardio → Resp → Renal → GI → Endo → Neuro → Heme → … en 2027: coincide desde el tramo 2; la diferencia de F1 (inmuno antes que cardio, CAD al final de cardio) queda como **decisión pendiente** (§9).

## 6. F1 (2026): las 12 mañanas de Step 1 (mar · jue)

Fecha = la del plan. Con el alias de la v6.10d (otro flujo) cada mañana se hace el hábil siguiente: la 1.ª mañana real es el vie 20-nov con el plan del D2.

| D# | Fecha plan | Fase · nivel | Preguntas (sin reloj) | Método del día (ancla → lectura → tarjeta) |
|---|---|---|---|---|
| D2 | jue 19-nov | Fase 1 · nivel 0 | 3 a fondo (uWorld Cellular) + 5 de validación (Mehlman) | lesión hipóxica: ATP↓ → Na/K-ATPasa → tumefacción (reversible) → membranas + Ca²⁺ → necrosis (irreversible) → adaptaciones → calcificación distrófica vs metastásica · PC de la lesión hipóxica (el material del día: uWorld Cellular pathology, FA Cellular injury, B&B 01-02, PassMedicine adaptaciones y calcificación) |
| D3 | mar 24-nov | Fase 1 · nivel 0 | 5 revalidación + 4 a fondo + 5 validación | hiperplasia (señal) vs neoplasia (autónoma) · Warburg/PET · compare & contrast |
| D4 | jue 26-nov | Fase 1 · nivel 0 | 5 validación 48 h + 4 a fondo + 5 validación | MHC solo péptidos → vacuna conjugada · Rh vs ABO |
| D5 | mar 1-dic | Fase 1 · nivel 1 | 5 + bloque 1 de 5 + bloque 2 de 5 + 5 validación | hipersensibilidad con 2 preguntas (fijo/soluble · con/sin anticuerpo) · citocinas · + **ancla de la cola del D2** en los vídeos B&B 06-07 (inflamación: aguda = neutrófilos 24 h → crónica = macrófagos 3-5 d → fibrosis; LDH no específica), que se ven este día a las 07:15, 09:00 y 18:00 |
| D6 | jue 3-dic | Fase 1 · nivel 1 | ídem | PAM = GC × RPT con la CAD como ejemplo · mareo = hipotensión |
| D7 | mar 8-dic | Fase 1 · nivel 1 | ídem | ΔP = Q × R · barorreflejo · flechas |
| D8 | jue 10-dic | MEDICIÓN | NBME 25 (200 Q, Standard-Paced) | 1.ª línea base + Day-After (1/6) |
| D9 | mar 15-dic | Fase 1 · nivel 1 | bloque 1 + revalidación + validación | bucle PV / Wiggers / Starling (VACÍO de Palmerton → First Aid + Costanzo) · PCWP vs PTDVI |
| D10 | jue 17-dic | Fase 1 · nivel 1 | ídem nivel 1 | canales iónicos ↔ ECG · fase 0 nodal = Ca tipo L |
| D11 | mar 22-dic | Fase 1 · nivel 1 | ídem | mecanismo → ECG → severidad (CCSN) → tratamiento |
| D12 | jue 24-dic | Fase 1 · nivel 1 | ídem + 18:00 = 10 Q mezcladas **en Tutor** + ≤2 tarjetas APEX (techo 12: el re-test de 2 incorrectas solo si sobra; si no, a la REENTRADA del mar 16-mar) → 30 Q en el día | antiarrítmico por fase · farmaco: mecanismo ↔ nombre ↔ toxicidad |
| D13 | mar 29-dic | Fase 1 · nivel 1 | ídem | isquemia = demanda > oferta: integra D2 + D6-D12 (el 1.er subtema de Palmerton) · + la tarjeta PC post-IAM (era la del D2) y la troponina como marcador del daño de membrana del D2 |

Lo que cambió hoy en la guía de F1 (mismos bloques y mismas horas): el **método del día** en el paso de lectura (pregunta a fondo, página completa y deep prime), el **método al responder** (con sus trampas) **después** de responder —en el paso del Educational Objective de cada pregunta a fondo (nivel 0) y en la bitácora del bloque 1 (nivel 1), con un recordatorio en el bloque 2; nunca antes del pre-test ciego («preguntas primero, libro después»)—, la **tarjeta del día** en el paso de tarjetas y en el control de la 1.ª pasada de Anki de las 18:00, la fase en el bloque 1, y el 6/6 del Day-After del NBME 25 (D12 18:00), que pasa de 12 Q timed a 10 Q en Tutor + ≤2 tarjetas APEX (12 = techo; único bloque de F1 que reparte minutos: 2 + 27 + 1 → 2 + 23 + 4 + 1, mismos 30′). **Fix de la revisión del 18-nov:** el método del D2 era la cronología de la inflamación, que no casaba con el material del día (lesión celular); ahora el ancla del D2 es la lesión hipóxica y la de la inflamación viaja con sus vídeos (B&B 06-07, cola del D2 → D5). La cola de vídeo no cambia (cierre de F1: el Palmerton «High Yield Cardiology Part 2» va entero al tramo 2, como antes).

## 7. Tramo 2 (2027) fase a fase

| Filas | Fechas | Qué | Fase Palmerton | Ajuste (mismas Q y minutos) |
|---|---|---|---|---|
| T1 | mar 16-mar | REENTRADA 2×20 mixtas | Fase 1 · nivel 2 | era N4 timed → mezcla en bloques de 5; timed solo los subtemas con gate |
| T3-T32 (F3) | 18-mar → 30-abr | contenido Cardio → Resp → Renal → GI → Endo → Neuro (N1/N2/N4) | Fase 1 por subtema (N1-N2) | 16:15 REENTRADA (28 filas) condicionada al gate, con la rama Tutor en el paso de armar y el reparto de sus minutos (13 Q en los 30′ + 7 Q y el log en los 25′) · 18:00 EVALUACIÓN condicionada en **19 filas con guía** (17 evaluaciones acumulativas T7-T13 y T19-T28 + el 6/6 comprimido de T6 y T18) **+ la T1** (sin guía: su 18:00 es la «Evaluación acumulativa» de la plantilla) = 20 en la capa; las 9 filas cuyas 18:00 son solo el drill del Day-After (T3-T5, T15-T17, T30-T32) no llevan ese ajuste · viernes N4 (T17, T22) condicionados |
| T33-T116 (F4) | 3-may → 7-ago | contenido Neuro → Heme → Bioestadística → Micro → Repro → MSK → Psiq → Bioq (partido 1/2…4/4) | Fase 1 (N1-N2) | 15 filas «CONSOLIDACIÓN 20Q timed» en nivel 1 → Tutor hasta el gate; viernes N4 T43/T61/T67/T97 condicionados |
| T117-T120 | 9-ago → 12-ago | REFUERZO ética + bioestadística | Fase 1 · nivel 2 | — |
| T121-T156 | 13-ago → 23-sep | REACTIVACIÓN de los sistemas de F1/F3 | **Fase 2 · SISTEMA** | — |
| colchones (10) | — | fila atrasada o sistema débil | Fase 3 condicionada | mixto solo con ≥3 sistemas en nivel 3 |
| T157-T175 | 24-sep → 15-oct | uw_random 2×40 | **Fase 4 · RANDOM** | 40 al azar solo con 80 % en mixtos de ≥3 sistemas; si no, mixtos de sistemas dominados |
| T177-T212 | 18-oct → 27-nov | incorrectas · consolidación | Fase 4 | — |
| T213-T218 | 29-nov → 4-dic | taper · ritual | Fase 4 / — | — |
| hitos y Day-After (20) | — | NBME/UWSA/Free 120 | MEDICIÓN | — |

Total: 230 filas anotadas (F1 12 · tramo 2 218), **72 con ajuste de modo**; fechas, horas, hitos, examen (lun 6-dic-2027), `qDia`, `nivelUW` y presupuesto de uWorld **sin cambio** (`usmleStep1Daily.ts` idéntico).

## 8. Fuentes nuevas y consultas

- **Añadidas hoy al cuaderno [NUEVO]** (canal @alec.palmerton_md, títulos comprobados por oEmbed): *USMLE Step 1 Study Plan From a Learning Scientist* (NkvG7EPXHIY) · *The Tracking Method That Guarantees a Step 1/NBME Pass* (mEc5UsUCVY8) · *Stop Studying for Step 1. Pass It Anyway.* (Wy4QN7Fnck8). El cuaderno queda en 299/300 fuentes.
- **Consultas del 18-nov** (cuaderno «STEP 1 · Palmerton Engine»): (i) fases y criterios · (ii) arranque desde cero · (iii-a) Cardio, GI, Endo, Renal, Resp · (iii-b) Neuro, Hemato, MSK/Derma, Repro, Psiq · (iii-c) Bioq/Genética, Micro, Inmuno, Patología general, Farmaco, Bioestadística/Ética + (iv) rentabilidad y orden.
- **Qbankly (18-nov, 2.º intento, sin éxito):** la pestaña «Dashboard | Qbankly» SÍ estaba abierta en el mismo Chrome, pero al leerla con Chrome DevTools (solo lectura) el guard anti-bot de Qbankly la dejó en `about:blank` al instante (lo mismo que registra la memoria del 10-jun: Cloudflare detecta la sesión de depuración remota en todo el navegador). No se intentó esquivarlo. La otra vía (la extensión Claude in Chrome) ya no tenía su grupo de pestañas y obliga a abrir una ventana nueva, que la orden de Joseph de hoy excluye. Se siguen usando los conteos del Test Composer del 18-oct (`qbankly_uworld_step1_filtros.tsv`, 13 Subjects + 169 Systems). **% propio por sistema:** aún no existe (las primeras preguntas de uWorld Step 1 del plan son las del D2); la 1.ª lectura por sistema será el informe del NBME 25 (D8, «Informe por sistema» del Day-After 1/6).
- **USMLE Content Outline:** tablas de System, Discipline y Competency de usmle.org (18-nov-2026).

## 9. Vacíos, dudas y decisiones pendientes

1. **Orden de F1** (decisión): Palmerton empieza por Cardio/CAD y deja inmuno, bioquímica y genética para después (⚠NLM iv); F1 hace patología general → inmuno → cardio con la CAD al final (D13). A favor de lo actual: la patología general se transfiere a todo (⚠NLM iv). Opción: adelantar «Aterosclerosis + isquemia» al D6 y/o pasar inmuno detrás de cardio (ARRANQUE A7). No aplicado: cambia el contenido de filas de F1 y la cola de vídeo.
2. **Atribuciones dudosas del cuaderno:** Burkitt y VPH atribuidos a *Biostatistics SUMMARY*; Kawasaki a *High Yield Endocrinology*; Wallenberg/Weber (dado como presente y luego como NOT IN SOURCES); cita de «sistema-respiratorio-yousmle.md» (artefacto del Studio, no fuente). No se usan como de Palmerton.
3. **«~50 % de patología = principios generales»** y los porcentajes de uWorld que da el cuaderno (rangos 830-858, etc.): A VERIFICAR; aquí mandan los conteos de Qbankly.
4. **«Nutrition 15-20 %»** de la tabla de disciplinas de usmle.org: atípico → A VERIFICAR en el PDF del outline.
5. **Vacíos de contenido** (sin Palmerton: First Aid + recursos de la app): bucle PV/Starling/soplos/Jones, FQ/Light, Cushing/MEN/HSC, leucemias, casi toda Micro, MSK/Derma y Psiquiatría clínica, ROC/NNT (ARRANQUE §9.10; ⚠NLM iii).
6. **Qbankly en vivo (DECISIÓN DE JOSEPH):** releer Subjects/Systems con sus conteos y el % por sistema necesita (a) que Joseph recargue a mano la pestaña de Qbankly (quedó en `about:blank`) y (b) su OK para abrir la ventana de Claude in Chrome (la que Qbankly no bloquea), o que Joseph copie la tabla de Performance › Systems. Hasta entonces mandan los conteos del 18-oct.
