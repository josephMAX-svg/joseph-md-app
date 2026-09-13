# MÉTODO PALMERTON — DE LA A A LA Z (síntesis maestra · 8-sep-2026 · §12 remapeado al régimen v5.10 el 12-sep-2026)

> **Qué es este documento.** La síntesis completa del método de **Alec Palmerton, MD** (Stanford Med · anestesiología en Harvard-MGH · Step 1 = 270, top 0,1%) tal como está publicado en su canal de YouTube y en **yousmle.com**, ordenado para ejecutarse. Es el documento maestro del bloque USMLE Step 1 de Joseph: la doctrina (§1-§11) y su traducción exacta al plan **v5.10** día por día (§12).
>
> **De dónde sale.** Se construyó exclusivamente sobre los 6 extractos v3 del cuaderno NotebookLM *"STEP 1 · Palmerton Engine"* (295 fuentes: ~140 vídeos del canal + 149 artículos de yousmle.com), verificados en buena parte contra transcripciones crudas (`source_get_content`) el 4 y el 5-sep-2026: `metodo-global.md` · `anki.md` · `uworld-preguntas.md` · `interpretacion-testday.md` · `planificacion-nbme-img.md` · `mindset-productividad.md` (copia de trabajo en `DATA/USMLE/_palmerton_v3_extractos/`).
>
> **Convención.** Cada afirmación lleva **entre paréntesis su fuente** (título del vídeo o del artículo tal como lo devuelve el cuaderno). Las citas literales van en inglés. Cuando dos fuentes dan cifras distintas se anotan **ambas** con ⚠ y se resuelven en §11.4. Lo que el cuaderno no pudo verificar va marcado **A VERIFICAR (08-sep)** y está listado en §12.6 para `pendiente_usuario`. **No hay nada en este documento que no esté en los extractos.**
>
> **Documentos hermanos.** `PALMERTON_POR_MATERIA.md` (el método aplicado a cada materia) · `PALMERTON_DIVERGENCIAS_PLAN.md` (cruce técnica por técnica con el plan y decisiones pendientes de Joseph) · `CALENDARIO_5_MESES.md` · `README.md` (USMLE) · `src/lib/usmleStep1Daily.ts` (el plan ejecutable) · `src/lib/usmleScores.ts` (medición y gate).

---

## ÍNDICE

1. **Filosofía y learning science** — la tesis, los 4 problemas del estudio, la evidencia citada
2. **First Aid** — las 5 fases, cómo leerlo, los errores que cuestan 30+ puntos
3. **UWorld y preguntas** — los 5 niveles de maestría, umbrales, volúmenes, cómo revisar una pregunta, AMBOSS/Kaplan/NBME
4. **Anki** — ajustes exactos (FSRS), tipos de tarjeta con ejemplos literales, errores, backlog, ChatGPT
5. **Interpretación** — Standalone Question, CCSN, cronología fisiopatológica, juez vs abogado, "atascado entre 2"
6. **Taxonomía de errores y log** — las 3 categorías, la shopping list, la hoja de micro-destrezas
7. **Timing y ansiedad** — regla de los 2 minutos, stress sets, panic trap, cambiar respuestas
8. **Test day y las últimas 2 semanas** — Free 120, maratón de resistencia, descansos, protocolo del día
9. **Planificación, NBME, criterio de fecha, retakes, IMG** — umbrales, 5%/mes, Goldilocks, retake, IMG
10. **Mentalidad, productividad, TDAH, procrastinación** — identidad vs destrezas, ingeniería de entorno, motivación
11. **Patrones de los que fallan** — checklist de alarmas + discrepancias entre fuentes
12. **MAPEO AL PLAN v5.10 DE JOSEPH** — cada técnica en su bloque horario, fase, días y fechas reales + divergencias abiertas

---

# 1. FILOSOFÍA Y LEARNING SCIENCE

## 1.1 La tesis en una línea

**Mastery, not memorization.** El USMLE no evalúa recuerdo de hechos aislados sino **aplicación de principios**. Las dos reglas del *NBME Item-Writing Guide* ("Libro de Oro", un manual de ~100 páginas) que Palmerton cita literalmente son:

1. *"Each item should focus on an important concept or testing point."*
2. *"Each item should assess application of knowledge, not recall of an isolated fact."*

(First Aid Ultimate Guide: 5 Phases to USMLE Mastery; From 136 to Step 1 247: Conquer Memorization; The 8 Most Important Study Techniques I Used in Medical School)

Otras frases literales del NBME que usa como prueba: *"Questions should NOT focus on the direct assessment of isolated facts"*; *"Avoid asking about the leading cause of death in some subpopulation; instead, focus on the application of this knowledge"*; sobre ética, *"the goal became assessment of whether or not test-takers could apply ethical principles"* (7 Most Commons Reasons Your NBMEs Aren't Improving; How are UWorld, UWSA, Step 1, and Step 2 CK Different?).

**Corolario operativo** (el bucle que gobierna todo el método): todo se aprende como **cadena causal** (patogenia → presentación), se convierte en **tarjeta propia de mecanismo**, se **valida con preguntas** hasta un umbral numérico (**80%**) antes de avanzar, y se retiene con **repetición espaciada honesta**.

Dos frases que fijan la velocidad:

- *"The longest path isn't going slow; it's having to do everything twice because your first approach didn't work"* (First Aid Ultimate Guide).
- *"The best studying you can do is the studying you won't have to repeat again"* (Med School Anki: Make (or Find) USMLE-Crushing Flashcards).

## 1.2 Los cuatro problemas que todo sistema de estudio debe resolver

| Problema | Qué es | Quién lo resuelve |
|---|---|---|
| **Breadth** | elegir qué aprender de una masa infinita | First Aid como mapa · mazos pre-hechos |
| **Depth** | entenderlo de verdad (mecanismo) | comprensión activa (Costanzo / Pathoma / Goljan) |
| **Retention** | no olvidarlo | Anki / repetición espaciada |
| **Application / Transfer** | usarlo en la viñeta y en el paciente | QBank + entrenamiento de interpretación |

Los mazos pre-hechos y las flashcards resuelven **Breadth y Retention**; **NO resuelven Depth ni Application** (Zanki: The Promise, Pitfalls, and Best Uses; AnKing: The Promise, Pitfalls, and Best Uses). Esta es la raíz de casi todos los fracasos: se compra amplitud y retención y se da por supuesta la profundidad.

Corolario de recursos: **"It's the wizard, not the wand"** — el que saca 160 y el que saca 260 usan lo mismo; la diferencia es el operador (Beyond UFAP: Why a List of Resources Isn't a Good Step 1 Strategy). *"If the resources were the difference everyone would have the exact same score"*; Alec conoció a un alumno de Harvard que **nunca había oído hablar de un QBank** y quedó en el top 20% "just because when he learned things he learned them very very well" (The 10 Behaviors that Guarantee a USMLE Fail).

## 1.3 Por qué falla la memorización (con los ejemplos canónicos)

- **Analogía del concurso de repostería**: *"Cramming facts is the equivalent of memorizing recipes for a cake-baking contest"* — cuando cambia la cocina (hay que diferenciar miocarditis viral de miocardiopatía isquémica) fallas porque nunca entendiste el proceso (How Are USMLE Questions Written? 9 Open Secrets; High Yield Study Mastery: Identify Key Info).
- **Analogía de la maratón**: memorizar para el USMLE es *"doing pushups to train for a marathon. You'll work hard, but you'll never see any results"* (7 Most Commons Reasons Your NBMEs Aren't Improving).
- **Por qué funcionó en la facultad**: los profesores no están pagados ni entrenados para enseñar; redactan preguntas copiando sus PowerPoints. El USMLE juega con reglas radicalmente distintas (7 Most Commons Reasons; How are UWorld, UWSA, Step 1, and Step 2 CK Different?).
- **Fragilidad**: memorizas "neumonía = tos, disnea, fiebre, dolor pleurítico" y ante una mujer con anticonceptivos, dolor pleurítico súbito y disnea **sin fiebre ni tos**, anclas en "pleurítico → neumonía" y ni consideras TEP (Zanki/AnKing: The Promise, Pitfalls, and Best Uses; Boost Your UWorld Score: Top 5 Mistakes).
- **Analogía Ana de Armas**: memorizó fonéticamente sus líneas en inglés (*War Dogs*) sin entenderlas; funcionó hasta que reescribieron el guion; entonces aprendió inglés "because her life depended on it". Memorizar funciona **mientras no cambien las circunstancias**; en pacientes y en el USMLE siempre cambian (Anki for Med School: Why Is It So Hard to Do (and Why That's Good)).
- **Impacto en score**: memorizar translocaciones o clasificaciones de anemias sin fisiopatología impide deducir preguntas de 2-3 pasos y limita a rango de reprobación o <220 (7 Most Commons Reasons).

### El ejemplo canónico: epidural vs subdural

- Enfoque memorístico: "Epidural = arteria meníngea media, biconvexo, intervalo lúcido, rápido / Subdural = venas puente, semiluna, lento" → salen **8 tarjetas** (anverso y reverso de patogenia, presentación, curso temporal, radiología).
- Enfoque de principio: **las arterias manejan presiones mucho mayores que las venas** → sangrado arterial se expande rápido → deterioro súbito; venas puente = baja presión → expansión lenta, "if even noticeable at all". Bastan **2 tarjetas (−75%)**.
- Y **transfiere**: ¿por qué los subdurales son más frecuentes en ancianos? Atrofia → venas puente estiradas → vulnerables a cizallamiento leve. Se **deduce**, no se memoriza.

(STOP Doing This for 20+ Points on Step 1 + 2; 5 Keys To Rock USMLE Step 1 With Anki — key #1; How to Study So Fast for the USMLE It Feels Like Cheating)

Regla que se deriva: **"One principle can replace five or even 500 facts"**; *"when you study principles instead of facts, every hour of studying does three to five times more work. That's what makes it feel like cheating"* (How to Study So Fast…). Principios que Palmerton usa como columna vertebral: *chronic inflammation leads to fibrosis* (cicatriz post-IAM, rechazo crónico, capa fibrosa del ateroma, remodelado — "one concept explains four if not honestly 400 different diseases"); **isquemia = demanda > oferta** (angina estable, claudicación, angina mesentérica postprandial); **flujo = ΔP/R** (ley de Ohm en cardio, renal y respiratorio); **"likes dissolve likes"**; **coágulos arteriales = plaquetas → antiagregante / coágulos venosos = cascada → anticoagulante** (The 8 Most Important Study Techniques; Step 1 Study Plan: 5 Tips; The Most Useful USMLE Equation Ever; How to Study When You're Too Busy to Study).

### Dos ejemplos más de "abogado por memorización"

- **Klinefelter "que no era alto"**: una futura pediatra falló una viñeta inequívoca (cariotipo + ginecomastia + todo lo clásico) porque *"the patient wasn't tall"*; el NBME introduce **a propósito** desviaciones de lo clásico para penalizar el reconocimiento rápido (7 Most Commons Reasons; How to Study So Fast…).
- **SIADH memorizado vs entendido**: memorístico = "SIADH → osm urinaria alta y sérica baja por mucha ADH"; entendido = "ADH inapropiadamente alta → reabsorción excesiva de agua libre en el colector → orina concentrada → el agua pasa al suero y lo diluye" → **la misma lógica invertida responde diabetes insípida y polidipsia psicógena** (Boost Your UWorld Score: Top 6 Mistakes; Step 1 Study Plan: 10 Habits).

## 1.4 La ciencia del aprendizaje que cita (y la regla que saca de cada una)

| Fuente científica | Qué dice | Regla operativa de Palmerton |
|---|---|---|
| **Dunlosky et al. 2013** (*Psych Sci Public Interest* 14(1):4-58) | Baja utilidad: resumir, subrayar, mnemotecnia de palabra clave, imaginería, **releer**. Moderada: interrogación elaborativa, autoexplicación, interleaving. **Alta: practice testing + distributed practice** | Eliminar relectura y apuntes extensos; el día es **preguntas + repasos espaciados**. Las técnicas de baja utilidad son **más peligrosas que las inútiles** porque "dan algo" y te convencen de no cambiar |
| **R. & E. Bjork — desirable difficulties** | El cerebro consolida cuando el proceso cuesta | Si estudiar se siente cómodo, estás en modo pasivo; debe "doler" como levantar peso |
| **Ebbinghaus** (1880s) | El olvido es predecible; revisar justo antes de olvidar **duplica** el intervalo (1→2→4→8→16→32 días→meses→años) | Interceptar el olvido en su punto de máximo riesgo (Anki) |
| **K. A. Ericsson — deliberate practice** | Aislar la debilidad más específica + feedback inmediato | No preguntas por volumen: **log de errores granular y drills por micro-habilidad** |
| **Karpicke & Roediger — retrieval practice** | Recuperar consolida más que exponerse, **incluso antes** de aprender la teoría | **UWorld primero, First Aid después**: el "fracaso controlado" crea el gancho atencional |
| **Kahneman — System 1 / System 2** | La mente lanza la idea automática; si no la auditas, anclas (caso "tos nocturna → reflujo" que ciega al asma) | **Rule-in antes de rule-out**; CCSN con System 2 |
| **Csikszentmihalyi — flow** | Dificultad ≈ competencia + metas claras + feedback inmediato | Bloques cortos de 5 preguntas (feedback inmediato) y "1% experiments" |
| **Cal Newport — Deep Work** | Calidad = intensidad × tiempo | Eliminar físicamente las distracciones; resistir consume el lóbulo frontal |
| **Feynman** | *"you should be able to teach it to an intelligent fourth grader and if you can't do that it means you truly don't understand it well enough"* | Si no puedes explicar la fisiopatología en voz alta en cadena causa-efecto, no la dominas |
| **Mullainathan & Shafir — *Scarcity*** | La escasez produce "tunneling" y cuesta el equivalente a **8-9 puntos de IQ** | **Slow is Fast**: posponer si los NBME predicen riesgo, para eliminar la escasez |
| **Chi, Feltovich & Glaser 1981** | Novatos clasifican por rasgos superficiales (poleas vs rampas); expertos por principio (conservación de energía) | Ver la medicina como **pocos principios**, no como miles de hechos |
| **Self-Determination Theory** (Deci & Ryan, no nombrados) | Autonomía + significado + competencia | El "por qué", el lugar de estudio elegido y la victoria diaria del 80% |

(How to Score 260+ on USMLEs in 2026 (Evidence-Based); Med School Anki: Make (or Find); How to Study in Med School (and Keep Your Sanity); 10 USMLE Study Strategies to Instantly Boost Your Score; Slow is Fast; High Yield Family Medicine Review: Part 2; Fail Step 1? How to Score 90%+)

**Benjamin Bloom no aparece citado por nombre** en las fuentes; el argumento equivalente es que el USMLE evalúa la cúspide (aplicación/síntesis) y castiga la base (recuerdo) (consulta 05-sep).

**Expected value / "250+ Mentality"**: pensar como *card counter* — pasar de 1/5 a 1/4, 1/3, 1/2 en cada pregunta; eliminar **una opción extra por pregunta** llevaría un 64% (percentil 11) a un **83% (percentil 75)**; preguntas fáciles EV 80-90%, difíciles 20-30%; *"every percent is worth about two points"* (10 USMLE Study Strategies — strategy #1; 250+ Mentality: What Basketball Teaches Us About USMLE Timing; The USMLE Mindset That Guarantees a 260+).

**"Four Golden Hours"**: la concentración profunda real es de **3-4 h/día**; el número de horas es una *métrica de vanidad* (Do More in Less Time: Develop a Morning Routine).

## 1.5 La matemática del olvido (el argumento que justifica Anki)

**Máximo recordado = cantidad aprendida por día ÷ % olvidado por día.**

| Perfil | Ritmo | Olvido/día | Techo |
|---|---|---|---|
| Crammer | 10 páginas/día | 40% | **25 páginas** (desde el día ~10 olvidas por la mañana lo que memorizaste por la tarde) |
| "Estándar" (aprender bien, repasar cuando se puede) | 5 páginas/día | 15% | **33,3 páginas** |
| **Spaced repetition** | 3 páginas/día (70% menos que el crammer) | 2% | **150 páginas — 6×** |
| Alec con el sistema maduro | — | **<0,1%/día** | **>3.000 páginas** de alta densidad |

*"La velocidad de aprendizaje importa mucho menos que lo retenido"*; "podrías cubrir muchas menos preguntas de UWorld al día y aun así salir adelante por no olvidar nada" (How to Memorize Everything (Important) in Med School; Med School Anki: The Secret Weapon; From Novice to Anki Expert; How I Went from "Bad Test Taker" to Top 0.1%).

Metáfora dominante: **el balde con agujeros (*leaky bucket*)** — estudiar → memorizar → olvidar → reaprender. *"I didn't have a bad memory, I just had a leaky bucket"* (I Haven't Had to Re-Learn Anything in 17 Years; How I Went from "Bad Test Taker" to Top 0.1%). Y el aviso: la repetición espaciada es "dinamita" — **Garbage In, Garbage Out**: con tarjetas de datos no entendidos sólo refuerza conducta mecánica (How to Memorize Everything).

Las **tres creencias limitantes** que Alec tuvo que vencer: (1) "cubrir más temas al día = memorizar más"; (2) "memorizar en vez de entender = cubrir más" (saltó el ciclo celular por "no importante" y perdió una letra de nota; entender el dolor isquémico del IAM le sirvió después para TEP, EAP y colitis isquémica); (3) "hacer cramming los días previos ayuda" — en Step 1 **no estudió la semana previa** (How to Memorize Everything (Important) in Med School).

## 1.6 Las cifras del propio Alec (el caso de prueba)

- **913.701 revisiones de Anki en 17 años** de uso diario ininterrumpido desde 2009 = **225 días completos** pulsando botones (I Did 913,701 Anki Reviews. Here's What Actually Works).
- Mazo: **>28.000 tarjetas**; hoy **≤50 tarjetas/día ≈ 20-30 min**; intervalo promedio **4,66 años**; tarjetas con intervalos de **5.410-5.500 días y hasta ~9.000 días** (I Haven't Had to Re-Learn Anything; I Did 913,701).
- **Sin reaprender nada desde 2009**: no estudió de forma dedicada para Step 2 CK, Step 3 ni **3 de sus 4** exámenes escritos de anestesiología (otra fuente: **siete** exámenes de especialidad/subespecialidad sin un día completo de estudio); **top 10% nacional** consistente y **top 5% en Step 3** (I Looked Stupid for 16 Years; I Reviewed 28,655 Flashcards; Anki for Med School: Why Is It So Hard).
- **30.660 horas** de medicina entre Stanford y MGH; con el método óptimo desde el día 1 habrían bastado **~6.000** → **>24.000 h desperdiciadas** resolviendo el problema equivocado (I Studied 30,660 Hours of Medicine. I Only Needed 6,000).
- Comeback: SAT bajo a los 17 y rechazo de todas las Ivy → GPA 4.0 en ciencias, **MCAT percentil 99**, **NBME 236 dos meses antes → 270 en Step 1 (top 0,1%)**, reclutado por Harvard-MGH dos días después de la entrevista (I Failed the SAT in 2002; UWorld + First Aid: 4 Keys — "#4 Bumped Me to 270 from 236").
- **Interés compuesto**: *"By learning and remembering them well the first time, you will be able to gain even greater mastery faster when you see them again... It's like compound interest"*; aprender medicina es bajar una **escalera de caracol**: la misma estructura a distinta profundidad (Step 1 → Step 2 CK → shelf → boards) (How Your Step 1 Prep Influences the Rest of Your Career).

---

# 2. FIRST AID — LAS 5 FASES

Contexto: tras asesorar a **>1.000 estudiantes**, los que fracasan habían hecho **5, 6 o 7 pasadas pasivas** de First Aid; muchos de los que dominaron el examen **ni siquiera lo terminaron una vez**. Frase literal: *"I'd rather understand 60% of First Aid than have skimmed 100% of it"* (First Aid Ultimate Guide: 5 Phases to USMLE Mastery).

## Fase 1 — Entender qué son el USMLE y First Aid

- El USMLE evalúa aplicación de principios (las dos reglas del NBME, §1.1).
- **Origen real de First Aid**: nació en Yale; estudiantes con malos resultados encuestaron informalmente (pagando incentivos, **"$5"** al inicio) a quienes ya habían rendido, para saber qué se evaluaba; sin revelar preguntas, condensaron la información mínima necesaria para responderlas. Al principio bastaban los *buzzwords* (cloranfenicol → *gray baby syndrome*); la evolución del examen dejó obsoletas esas asociaciones (First Aid Ultimate Guide; First Aid for Step 1: The 5 Mistakes Costing 30+ Points; UWorld + First Aid: 4 Keys to Mastery).
- **First Aid es un FILTRO / "Target", no un libro de texto**: asume la base conceptual; la profundidad de mecanismos se rellena con **Costanzo** (fisiología), **Pathoma** y **Goljan** (First Aid for Step 1: The 5 Mistakes; 5 Keys To Rock USMLE Step 1 With Anki — *"target the material in First Aid as your priority... supplementing it with lecture material, Goljan pathology, Costanzo physiology"*).
- Cómo salir del error: dejar de verlo como enciclopedia de datos y tratarlo como **mapa de objetivos de aprendizaje a comprender en profundidad** (First Aid Ultimate Guide).

## Fase 2 — First Aid como OBJETIVO de maestría, no como lectura

- **Highlighting Method (resaltado honesto)**: no leer linealmente; **resaltar únicamente lo que sabes explicar con profundidad fisiopatológica**.
- Si un dato queda sin resaltar (ejemplo literal: sabes que la angina es dolor torácico pero no que *"there is no necrosis"*), **detenerse**: investigar el porqué (menciona Perplexity / ChatGPT Search) → resaltar → **tarjeta Anki conceptual**.
- Dejar de contar páginas leídas: estudiar a fondo **un subtema** (ej. *coronary artery disease*) antes de abarcar volumen.
- En pre-dedicated: tener la **copia electrónica de First Aid abierta durante la clase** y buscar la sección (ej. enfermedad granulomatosa crónica) para saber qué es prioritario e ignorar la paja.

(First Aid Ultimate Guide; First-Year Step 1 Study Plan: 6 Burning Questions Answered; 6 Simple Computer Tricks for Your Quest of USMLE Step 1 270+ — tip #6)

## Fase 3 — Verificar activamente con preguntas del subtema (Milestone 1)

- Tras estudiar un subtema → banco (UWorld o AMBOSS) en **bloques de 5 preguntas**, **modo tutor, sin tiempo, estrictamente del subtema** (si estudiaste angina y SCA → 5 de *coronary heart diseases*).
- **Umbral para avanzar: ≥80% en 10 preguntas consecutivas del subtema** (dos bloques de 5). Aquí "se rompe" la memorización superficial.
- **Criterio de validación diaria**: dominar UN subtema conceptual en **un día** y llegar al 80% **dentro de 2-4 bloques** untimed. Si se logra, el método está validado; si no, **el método está roto y no se avanza a ciegas**.
- **Qué hacer si NO se alcanza el 80%** → **Four Critical Adjustments**, en este orden: (1) **Recursos** (¿son los adecuados? First Aid + Costanzo/Pathoma), (2) **Comprensión** (si hiciste tarjetas de la página y sigues <80%, caíste en memorización pasiva → volver al porqué), (3) **Aplicación** (¿transfieres a problemas con detalles modificados?), (4) **Memoria** (¿usas la repetición espaciada de verdad?).
- Si hacen falta **≥10 bloques** para llegar al 80% de un subtema (caso Catherine con arritmias), hay una **falla grave** en la creación de tarjetas o en la *shopping list*: no se avanza hasta resolver ese cuello de botella.
- Si en **1-2 días** no se alcanza el 80%, se ajusta el método de inmediato.

(First Aid Ultimate Guide; UWorld Complete Guide: The Five Levels of Mastery to 260+; How to Guarantee a Step 1 Pass [Proven System]; Military Mom Needs a 260; 48% NBME. Should She Move Her Step 1?; Step 1 Study Plan: 5 Tips to Boost USMLE Scores Fast)

> Ancla de arranque recomendada: **enfermedad coronaria (CAD)** — "no requiere otros sistemas para entender flujo, isquemia y necrosis" (Step 1 Study Plan: 5 Tips).

## Fase 4 — Escalar el éxito (Milestones 2, 3 y 4)

- **Milestone 2 — subtema con tiempo**: bloques de 5 cronometrados; **80% en ≥3 subtemas distintos**, al menos uno validado en **<48 h**.
- **Milestone 3 — sistema completo**: **10-20 preguntas consecutivas cronometradas** de un sistema entero, meta **80% en 20 consecutivas**; elimina la *unfair advantage* de saber de qué va el bloque; **40-50 Q/día**.
- **Milestone 4 — sistemas mixtos**: **≥3 sistemas** dominados (ej. Cardio + Renal + GI) mezclados en bloques de **20-30 Q** cronometradas; **50-70 Q/día**; 80% en bloque mixto de 20 Q.
- Progresión: dominar **3-5 subtemas** (CAD, insuficiencia cardíaca, arritmias) antes de abrir el sistema completo.

(UWorld Complete Guide; How to Guarantee a Step 1 Pass)

## Fase 5 — Validar (Milestone 5)

- Bloques **mezclados de 40 Q cronometradas (90 s/Q)** con **80% consistente** (90% para élite 260+); validar con **NBME oficiales y Free 120**.
- Si persiste una debilidad de sistema, **volver temporalmente a Fase 3 o 4 para ese sistema** en vez de seguir haciendo bloques mixtos a ciegas.
- **Regla de lectura del NBME**: si acabas de estudiar Cardio y Renal, exige **≥80% en esas áreas** del reporte, no mires sólo el número global.

(UWorld Complete Guide; First Aid Ultimate Guide)

## ¿Por qué exactamente 80% (y no 70 ni 90)?

- **El cálculo**: baseline 50%. Si dominas **la mitad** del contenido al **80%** y en la otra mitad conservas **40%** → esperado = 0,5×80 + 0,5×40 = **60%**, y **60% en NBME ≈ umbral de aprobado seguro** de Step 1 (Step 1 Study Plan: 5 Tips; How to Guarantee a Step 1 Pass; The 10 Behaviors).
- **No 90%**: subir de 80 a 90 tiene retornos decrecientes drásticos; es más eficiente elevar el 2.º y 3.er sistema débil de 40% a 80% (The Danger of Active Recall).
- Cita: *"It's better to learn 60% of the material really really well where you can get at least 80% of it than to try to rush through and get 100% but still only score 40% on it"* (Honor Shelfs AND Score 260+ on Step 2).
- **El 80% es margen, no perfección**: "gives you a buffer so that if you forget stuff, if you have a bad day, if you've got test day nerves it still gives you that margin"; el que "skates by" cae bajo la línea cuando *life happens* (The ONLY Video You Need to Pass the USMLE Step 1 in 2026).
- **Ventaja de planificación**: si con la mitad a 80% no llegas, el siguiente paso es obvio (más materias a 80%). Si cubriste todo a 50-60%, *"do I just do it all again?... It doesn't leave you with a lot of options on the back end"* (The 10 Behaviors).
- Corroboración: cuando empezó Anki, Alec se dijo que si sabía **30-40% de la clase pero *exceedingly well***, más la mayor parte de First Aid, *"I would do just fine"* (5 Keys To Rock USMLE Step 1 With Anki — key #5).

## Los errores con First Aid que cuestan 30+ puntos

1. **Tratarlo como biblia de hechos aislados y buzzwords** (falacia de la acumulación) (First Aid for Step 1: The 5 Mistakes Costing 30+ Points).
2. **Leerlo linealmente y contar páginas** en vez de resaltar honestamente (First Aid Ultimate Guide).
3. **Anotarlo en los márgenes** con cada fallo de UWorld: First Aid menciona cada patología en varias secciones inconexas; se pierden minutos decidiendo dónde marginar y el libro queda ilegible (UWorld Note-Taking: Annotate First Aid vs. UWorld Journal? Do This Instead).
4. **Hacer 5-7 pasadas pasivas** creyendo que releer es aprender (First Aid Ultimate Guide).
5. **Ignorar que es un "target"**: no rellenar la profundidad con Costanzo/Pathoma/Goljan cuando el mecanismo no se entiende (UWorld + First Aid: 4 Keys to Mastery).
6. **Narrow Questions Review**: revisar sólo el detalle fallado y seguir. Fallas pancreatitis aguda por alcohol → no revises sólo el alcohol: ve a First Aid y domina **todas** las causas, la fisiopatología, las complicaciones y las conexiones con otros sistemas. Es la causa de la queja *"¡el examen real no se parecía en nada a UWorld!"* (Boost Your UWorld Score: Top 6 Mistakes).

**La regla que sustituye a todo eso — Whole Page Rule**: al fallar un detalle (ej. estenosis mitral) NO hagas una tarjeta de esa oración: abre First Aid y **domina la sección completa** (todas las valvulopatías: presiones, gráficos, soplos — suelen ser **2-4 páginas**), con Feynman, y crea un mazo cohesionado de **15-20** (una fuente) o **30-50** (otra) tarjetas de esa página, la anterior y la siguiente. *"The students that make cards on the entire First Aid page actually move faster through the material... because they're anticipating questions that they're going to miss, not just reacting"* (The ONLY Video You Need to Pass the USMLE Step 1 in 2026; The Step 1 Anki Strategy Used by 260+ Scorers; The Step 2 Anki Strategy That Fixes Stuck Scores).

Y la secuencia obligatoria: **UWorld primero para diagnosticar, First Aid después para tratar** — hacer el bloque **sin haber leído el tema ese día**; el "fracaso controlado" hace que la lectura posterior sea eficiente y estimulante (UWorld + First Aid: 4 Keys to Mastery — key #2; Karpicke & Roediger).

**Profundidad sobre amplitud superficial** (clave #3 de las 4 que llevaron a Alec de 236 a 270): al fallar un subtema (ej. embriología de la hendidura palatina), buscar con la **copia electrónica de First Aid todas las instancias** de esa patología y dominar el tema completo → inmunidad ante cualquier variación (UWorld + First Aid: 4 Keys to Mastery).

---

# 3. UWORLD Y PREGUNTAS

## 3.1 Los 5 niveles de maestría (el corazón operativo del método)

Principio rector: Palmerton **rechaza** que un estudiante haga bloques mixtos cronometrados de 40 preguntas desde el día 1. El estudio se organiza **como un videojuego**: no se avanza al siguiente nivel hasta demostrar maestría (**80%**) en el actual. Cada nivel elimina progresivamente una "ventaja injusta" (saber de qué va el bloque) y añade una presión (reloj, mezcla, volumen).

| Nivel | Nombre | Configuración | Volumen diario | Umbral para SUBIR |
|---|---|---|---|---|
| **1** | Subtopic Mastery — untimed | Tutor, sin reloj, bloques de **5Q** de UN subtema (ancla de arranque: *coronary artery disease*) | **20-30 Q/día** (⚠ otras fuentes: 5-10 Q/día al arrancar, §11.4) | **80% en 10 preguntas consecutivas** del subtema |
| **2** | Subtopic Mastery — timed | Bloques de **5Q** del subtema, cronometrados | volumen creciente | **80% en ≥3 subtemas distintos**, ≥1 evaluado en **<48 h** |
| **3** | System Mastery — timed | Bloques de **10-20Q** de un sistema completo (toda cardio, toda neumo…) | **40-50 Q/día** | **80% en 20 preguntas timed consecutivas** del sistema |
| **4** | Multiple System Mastery — timed | Bloques de **20-30Q** mezclando sistemas dominados + el nuevo (Cardio+Renal+GI) | **50-70 Q/día** | **80% en bloque mixto de 20Q timed** de ≥3 sistemas |
| **5** | Full Mixed Block Mastery — timed | Bloques de **40Q** random, timed (90 s/Q) = simulación exacta | **80-100 Q/día** | **80% sostenido** (90% para élite 260+) |

(UWorld Complete Guide: The Five Levels of Mastery to 260+; How to Guarantee a Step 1 Pass; Step 2 Study Plan: How to Guarantee 260+)

Detalle por nivel:

- **Nivel 1 — "aprender a aprender"**: el foco es dominar *cómo se leen* las preguntas y cómo se construyen tarjetas basadas en principios, **no el volumen**. Si en **1-2 días** no se alcanza el 80%, se ajusta el método de inmediato.
- **Nivel 2**: se añade el reloj a subtemas ya dominados para habituar al cerebro a la presión mientras se aísla la técnica de lectura.
- **Nivel 3**: elimina la **"unfair advantage"** de saber de antemano el tema del bloque (en un bloque de CAD descartas automáticamente todo lo que no sea isquemia). El 80% en 20Q de sistema demuestra "que tus tarjetas de Anki y tu retención están funcionando".
- **Nivel 4**: entrena "la capacidad de la mente de saltar entre especialidades bajo presión" (*rapid context switching*).
- **Nivel 5**: simulación exacta del examen, todas las materias al azar.
- **Cuántos antes de mezclar**: **3-5 subtemas** al 80% untimed antes de abrir el sistema; **≥3 sistemas** al 80% timed antes de mezclarlos; luego se van añadiendo sistemas hasta llegar a 40Q mixed/timed.
- **Tutor vs timed**: niveles 1-2 **exclusivamente tutor + untimed** (el cerebro necesita *immediate corrective feedback* para no repetir el vicio dentro del mismo bloque); migrar a timed/mixto al menos **4-8 semanas** antes del examen (⚠ "UWorld FAQ" dice mínimo 2-4 semanas; Melody: "por la 2.ª mitad del dedicated como muy tarde, todo timed a tamaño completo").
- Eco institucional independiente (Dr. Ben Shirley, UNC): a un alumno estancado le hacen **volver a un sistema y pasar 8 días en cardio en vez de 4**, mezclando random con preguntas dirigidas, antes de perseguir una cuota de 80 Q/día (Fixing USMLE Test-Day Mistakes: The STRESS Strategy).

## 3.2 El "80% Mastery Method" paso a paso

1. **Aislar un subtema** de alta representación (CAD, valvulopatías).
2. **Estudiarlo a profundidad en First Aid** buscando el mecanismo y la lógica de cada línea.
3. **Diseñar un mazo Anki** de alta calidad conectando patogenia → presentación.
4. **Bloques de validación de 5Q**, tutor + untimed, exclusivamente de ese subtema.
5. **Métrica**: **≥80% en 10 preguntas consecutivas**, dentro de **24-48 h** tras estudiarlo. Si falla la validación: **NO avanzar de tema**; el método está roto → ajustar y re-validar.
6. Milestones 2-5 según §3.1.

(Is "Just Do Lots of UWorld Questions" the Best Study Strategy?; How to Guarantee a Step 1 Pass; From Failing Step 1 to 260s; Step 1 Study Plan: 5 Tips)

Regla de Melody, literal: *"if you know a study technique is not working, just STOP IT, reevaluate, and figure out a new approach. Don't keep going because you have been doing it for so long"* (UWorld: Overcoming 6 "Fails" to a USMLE 260, Fail #4).

Y la lógica de reparto: *"if you spend equal time on all subjects including your strong ones, you are not going to get many more points on those strong sections. You will see a bigger jump in scores if you distribute more time to your weakest subjects"* (misma fuente, Fail #5).

## 3.3 Cuántas preguntas por día: el mito de las 100Q

- **El mito**: *"Top scorers do 100+ UWorld questions a day, so I should too"*.
- **Por qué falla — analogía NBA (literal)**: *"NBA players who take the most shots typically earn the highest salaries. Does this mean taking more shots leads to higher pay? Of course not."* Los que tiran más son los más hábiles. **El número de preguntas que puedes procesar al día es un marcador de tu nivel previo, no su causa.**
- Con bases débiles, 100Q/día = **espiral de la muerte por volumen** / *"procrastinación productiva"*: se leen explicaciones pasivamente para completar la cuota y el score se estanca. *"Quality beats quantity every time."*
- Frase de apertura de "How to Study So Fast…": *"most students study eight hours a day and gain five points; I've coached students who could study only half as much and they gain 50. They're not smarter, they just stop doing the things that feel like studying but aren't."* El **80%** del tiempo de estudio típico se va en material que no moverá el score (lo familiar, por ser menos amenazante).

**Volumen recomendado según nivel real** (How Many UWorld Questions Should You Do in a Day?; Step 1 Study Schedule: Make One You Actually Follow; The ONLY Video You Need):

| Perfil | Volumen |
|---|---|
| Principiante, failing o estancado en 40-50%, gaps profundos, pre-dedicated con clases | **5-10 Q/día tutor untimed**; a tiempo completo pero abrumado, máx. **20 Q/día** |
| Intermedio (60% estable) | **20-40 Q/día**, luego **40-80** timed y mixtas |
| Avanzado (70%+ consistente, método y Anki consolidados) | tope saludable **80-120 Q/día** |
| >120 Q/día | "casi siempre ha abandonado Anki y hace repaso superficial" |

**Señales de que haces demasiadas**: ansiedad/frustración al final del día por "no llegar a la cuota"; descansos de 5 min que se vuelven de 1 h; NBME congelados o en declive pese a >80 Q/día; revisar incorrectas leyendo pasivamente sin ir a la página completa de First Aid (8 Signs That You're Studying Wrong; Why USMLE Scores Stay Stuck).

**Casos**: **Jay** hacía 100 Q/día, todos los NBME y miles de tarjetas pre-hechas → conocimiento frágil → **reprobó**; con 5-10 Q/día untimed llegó a **92% en un NBME nuevo en 2 meses**. Un estudiante que pasó de *failing* a NBME 262 en <2 meses bajó a **5-10 Q/día** y sólo subió a 80-100 en las semanas finales, cuando la base ya era "impenetrable". **Melody** tardaba **3-4 h** en revisar un bloque ("I'm looking at you, cardiology"), se retrasaba, rehacía el calendario y acababa "rushing through other questions, just memorizing instead of trying to understand. Talk about a vicious cycle."

## 3.4 Tiempo por pregunta y por bloque

- **Bloque de 10Q + revisión metodológica completa = 60 minutos como máximo absoluto** (~6 min/pregunta: ~90 s responder + ~4,5 min auditar). Ratio resolver : asimilar ≈ **1 : 1**.
- **Incorrecta**: todo el tiempo que haga falta, **a menudo 10-15 min**, yendo a First Aid a dominar la sección completa.
- **Correcta con certeza y rapidez**: **30-60 s** de validación. **Correcta por eliminación vaga o suerte: tratar como incorrecta.**
- **Deep dive temático** (subtema + 1-2 páginas completas de First Aid): sesión de **2-3 h máximo**; más entra en rendimientos decrecientes.
- Presupuesto paralelo de Anki: **1 h por cada 100 tarjetas** de repaso.
- **Ritmo del banco**: a **40-50 Q/día** asimiladas en profundidad, el banco de Step 1 toma **~2,5-3 meses**. Con **3.643 preguntas** (abril 2024): 40/día = 91 días; 50/día = 73 días.

(How Many UWorld Questions…; The Danger of Active Recall; How to Review USMLE Questions for 20–30+ Points; UWorld Note-Taking; UWorld FAQ from a Harvard-Trained Tutor Who Scored 270)

## 3.5 Cómo REVISAR una pregunta (el protocolo que vale +20-30 puntos)

Premisa: el error más común es tratar el QBank como examen de evaluación en vez de herramienta de aprendizaje. **El incremento de score no viene de hacer más preguntas sino de la calidad del análisis de cada una.**

### A. Proceso exacto por pregunta (4 pasos)

1. **Auditar la viñeta, no sólo la explicación.** Antes de leer por qué fallaste, vuelve al enunciado y desglosa **qué propósito clínico tenía cada oración, cada signo vital y cada laboratorio**. Literal: *"go through the entire question stem itself, every single sentence, and ask yourself: okay, what actually made me feel uncomfortable? what would I need to know in order to make sense of every single word?"*
2. **Construir la "Shopping List".** Anota **cada término, hallazgo, imagen o palabra que generó la más mínima duda o incomodidad — también en las preguntas ACERTADAS**. Es "auditing every single piece of upstream knowledge or skills that a question would require". **El gap puede no estar donde crees**: entendías la enfermedad pero no una proteína concreta; sabes la fisiopatología del ECG pero *"can't read the rhythm strips to save your life"*. Analogía SAT: fallar una pregunta de lectura por no conocer **una palabra** es un problema de vocabulario, no de comprensión lectora. Resultado: un tema aterrador se convierte en **10-15 ítems concretos**, y se estudian **sólo esos**.
3. **Whole Page Rule** (§2): la sección completa de First Aid, no el dato fallado.
4. **Consolidar en Anki de inmediato**, con tarjetas basadas **exclusivamente** en la shopping list.

### B. Qué revisar: correctas E incorrectas

- **Correctas**: el promedio las salta; muchas se aciertan por descarte afortunado o *gut instinct*. Auditar buscando conceptos que no sabrías explicar con Feynman o palabras que incomodaron. Con certeza → 30-60 s; por suerte → tratar como incorrecta.
- **Incorrectas**: "desarmar la física del error" aislando si fue conocimiento o interpretación. Melody: *"When you correct each question, ask yourself why you got it wrong. Was it from misinterpretation or lack of knowledge?"*

### C. Las 5 preguntas de verificación de maestría (por cada pregunta)

1. ¿Cuál es la **SAQ** (pregunta directa de una línea que un experto respondería sin ver las opciones)?
2. ¿Por qué es **biológicamente** correcta la correcta? (cadena causa-efecto completa)
3. ¿Por qué las demás son incorrectas **AQUÍ**? (por vitales, labs, cronología; **no** por buzzwords)
4. ¿Para qué escenario exacto **SÍ sería correcta** cada opción incorrecta? (*"What scenario would this option make sense for?"* — cinco diagnósticos por el precio de uno)
5. ¿Qué dato tendría que cambiar el redactor para que otra opción fuera la correcta? (leer la mente del escritor)

Versión corta de la plantilla: causa raíz del fallo (dominio conceptual / reconocimiento / error no forzado) · ¿comprensión intuitiva o dato memorizado? · ¿cómo lo disfrazó el redactor con **Contexto, Cronología o Severidad**? · ¿qué SAQ destilo?

### D. Cómo usar la explicación de UWorld

- **NO** leer pasiva y robóticamente toda la explicación de cada distractor = "procrastinación productiva" (devora tiempo, agota, amnesia al día siguiente). Melody: *"I would end up thinking that every one of the wrong answer explanations was important, and get sucked into looking every unknown thing up."*
- **SÍ**: ir al **Educational Objective** (1-3 frases finales) y contrastarlo **sólo con el mecanismo de la opción incorrecta que elegiste**, para entender por qué caíste en ese distractor.
- Lo que se **escribe**: la **SAQ**, la **cronología fisiopatológica (PC)** y las **'why' cards**. Nada más.

(How to Review USMLE Questions for 20–30+ Points; How to Review UWorld or Other QBank Questions; How to Study So Fast…; 9 Open Secrets; UWorld: Overcoming 6 "Fails")

### E. Note-taking: ni márgenes de First Aid ni "UWorld journal"

Palmerton desaconseja **ambos** métodos tradicionales:

- **Anotar First Aid** → el libro se vuelve ilegible (§2). Melody (Fail #3): "I spent a lot of time taking detailed notes in First Aid, and drawing concepts or charts out from the answer explanations. It made me feel productive back then (I love color coded notes!) but took wayyy too long and I would forget the majority of it anyways!"
- **UWorld Journal** (resúmenes de cada fallo) → escribir resúmenes es técnica de **baja utilidad** (Dunlosky); horas transcribiendo → un documento de 100 páginas que **jamás se relee** ("cementerio de datos"). Melody (Fail #4) copió el "note log" semanal de una amiga: "it got overwhelming, and I barely even looked at this later on".
- **Protocolo correcto**: Anki **es** tu sistema de notas. Educational Objective → abstraer el principio (sin arrastrar edad/sexo del paciente) → **tú redactas el anverso con tus palabras** ("el verdadero acto de estudio") → buscador de Anki (Browse) devuelve en **5 segundos** todas las notas de meses sobre un tema.
- Sustituto del journal para "lo que quiero volver a ver": **flag** en UWorld + lista de IDs por sistema (Melody).

(UWorld Note-Taking: Annotate First Aid vs. UWorld Journal? Do This Instead)

### F. UWorld + Anki: las 5 reglas

1. **No crear más tarjetas de las que puedes revisar**: **≤50 nuevas/día** (Melody, con mazos pre-hechos: **15-25/día, "no more"**; "do NOT try to add a ton in the beginning to back-track and catch up, because you will burn out").
2. **El Educational Objective como filtro**: no preguntarse "¿podría ser útil este detalle?" (siempre sí) sino **"¿vale este detalle el costo de oportunidad de revisarlo todos los días durante los próximos 6 meses?"**
3. **Vincular patogenia → presentación**: nada de hechos aislados de síntomas.
4. **Tarjetas de comparar y contrastar** para patologías con clínica superpuesta (SIADH vs IC descompensada ante hiponatremia).
5. **Mazo de farmacología independiente** (~6 tarjetas por fármaco), con sesión corta y aislada, para no inundar los mazos conceptuales.

(UWorld + Anki: 5 Ways to Stop Wasting Time and Score Higher)

## 3.6 Una sola pasada. Nunca reset.

- **¿Segundo pase? NO — "Do UWorld Only Once."** Dos razones: (1) **costo de oportunidad** (el tiempo repitiendo preguntas vistas impide entrenar con preguntas nuevas; el USMLE evalúa responder ante lo desconocido); (2) **falsa seguridad** — el cerebro elige por **reconocimiento visual de la viñeta** ("recuerdo este caso, era X") saltándose el razonamiento. Literal: *"Master the topics once instead of going through UWorld three times."*
- **Única excepción aceptada**: repetir UWorld **Step 2 CK** tras los shelf, porque han pasado **6-12 meses**.
- **Reset = "Fail #6" de Melody** (literal): *"I reset UWorld and then redid it... I kept seeing ones that I automatically knew the answer to! This was a time waster at the expense of seeing new questions from another qbank. Also, I had flagged some questions that had great explanations... and now my entire past history was wiped."*
- **Qué hacer en su lugar**: una pasada exhaustiva, **flag** de las más retadoras y de las que traen buenos esquemas, y tarjetas Anki desde los Educational Objectives. Si sobra tiempo: **banco NUEVO** (AMBOSS o Kaplan), nunca reset.

(UWorld FAQ from a Harvard-Trained Tutor Who Scored 270; Boost Your UWorld Score: Top 5/6 Mistakes; UWorld: Overcoming 6 "Fails")

## 3.7 Cómo leer el % de UWorld (y por qué casi no importa)

- UWorld es **herramienta de diagnóstico y aprendizaje, NO examen de evaluación**. Promedio general ≈ **55%**; bloques de **40-60%** en fases iniciales son **normales**.
- El % de UWorld es una **vanity metric**: "no tiene ninguna importancia real"; las residencias nunca lo preguntan; sólo sirve para generar pánico. **Lo único que predice el pase son los NBME oficiales.**
- Melody: *"don't get disheartened at getting chunks of UWorld wrong... Your main goal is to LEARN off UWorld in two ways – to become a master question interpreter, and to learn important concepts."*
- Para 250+ no hay % mágico: el objetivo es **80-90% constante en la PRIMERA pasada de los bloques de validación** de subtema/sistema.
- Alec: *"no leo mucho los porcentajes de bloques; miro la mejora en los NBME"* (5 Keys To Rock USMLE Step 1 With Anki — respuesta a comentario).

(Is UWorld Really Harder Than Step 1?; UWorld FAQ; What 250+ on Step 1 or Step 2 CK Means)

## 3.8 ¿UWorld es más difícil que el Step 1 real?

La pregunta correcta no es cuál es más difícil, sino **en qué se diferencian** para entrenar deliberadamente:

- **The Familiarity Trap**: tras avanzar el banco te vuelves fluido en el estilo y el "sonido" de UWorld (mismos autores, patrones repetitivos) → *recognition illusion*: 80-90% en segundas pasadas que **no son maestría**.
- **Señal vs ruido — aquí UWorld SÍ es más difícil**: UWorld sobrecarga las viñetas de ruido para entrenar. **El Step 1 real es mucho más limpio** (*"almost all signal and minimal noise"*), con casos más clásicos. Error típico: el sobre-entrenado en ruido asume que el NBME "intenta engañarlo".
- **Preguntas experimentales / de mecanismo — aquí el Step 1 es más difícil**: el examen real incluye con frecuencia diseño experimental, knockouts, secuencias metabólicas, flujos de canales iónicos y gráficos. **UWorld es históricamente débil en ese formato** → intercalar **NBME oficiales temprano** para habituarse a la cadencia abstracta.
- **Longitud y wording**: UWorld es más largo (5+ pistas redundantes); el NBME redacta **vago y abstracto**, con sinónimos clínicos inusuales, mientras UWorld/UWSA usan un vocabulario pulido y predecible. Si dependes de que te den 5-6 pistas para adivinar por reconocimiento, **el real parecerá mucho más difícil**.
- El propio Palmerton reconoce la crítica de que parte de UWorld "seem too focused on fine details" desde la expansión del banco (2018 en adelante).

(Is UWorld Really Harder Than Step 1? A Deep Dive!; How are UWorld, UWSA, Step 1, and Step 2 CK Different?; How Many UWorld Step 1 or Step 2 CK Questions Are There in 2025?)

## 3.9 El tamaño real del banco y el peso por sistema (abril 2024)

Evolución de **UWorld Step 1**: ene-2014 **2.209** → ene-2019 2.519 → dic-2020 3.345 → oct-2022 **3.796 (pico)** → **abril-2024 = 3.643**. (Step 2 CK: ~2.300 en 2018 → 4.077 en 2022 → **3.996** en abril-2024.) AMBOSS entró en EE.UU. en **primavera de 2017** y UWorld expandió el catálogo "roughly a year after". Conclusiones literales: *"it is much harder to finish UWorld – let alone do multiple passes – now than it was in the past"* y *"you should still remember to focus on learning the material well rather than rushing through a QBank just to say that you did it"*.

**Peso por sistema en UWorld Step 1 (3.643 Q)** — útil para calibrar cuánto pesa cada sistema del plan:
Cardiovascular **413 (11,3%)** · Nervous **398 (10,9%)** · GI & Nutrition **307 (8,4%)** · Infectious Diseases 270 (7,4%) · Pulmonary & Critical Care 264 (7,2%) · Hematology & Oncology 230 (6,3%) · Renal/Urinary/Electrolytes 224 (6,1%) · Endocrine/Diabetes/Metabolism 199 (5,5%) · Psychiatric/Behavioral 179 (4,9%) · Rheumatology/Ortho 165 (4,5%) · Biostatistics & Epidemiology 120 (3,3%) · Social Sciences (ética/legal) 109 (3,0%) · Allergy & Immunology 108 (3,0%) · Dermatology 100 (2,7%) · Female Reproductive & Breast 79 (2,2%) · Biochemistry 65 (1,8%) · Genetics 62 (1,7%) · Pregnancy 59 (1,6%) · Male Reproductive 52 (1,4%) · Pharmacology (principios) 45 (1,2%) · ENT 40 (1,1%) · Pathology (principios) 39 (1,1%) · Poisoning 33 (0,9%) · Microbiology (principios) 30 (0,8%) · Ophthalmology 30 (0,8%) · Multisistema 23 (0,6%).

**Por materia**: Pathology **830 (23%)** · Pharmacology **546 (15%)** · Pathophysiology **474 (13%)** · Microbiology 347 (10%) · Anatomy 308 (8%) · Physiology 268 (7%) · Behavioral science 253 (7%) · Biochemistry 156 (4%) · Immunology 131 (4%) · Biostatistics 121 (3%) · Genetics 106 (3%) · Embryology 74 (2%) · Histology 29 (1%).

(How Many UWorld Step 1 or Step 2 CK Questions Are There in 2025?)

## 3.10 AMBOSS, Kaplan, NBME: roles y orden de uso

| Banco | Nota | Rol |
|---|---|---|
| **UWorld** | 4,5/5 | "el rey indiscutible de la aplicación y los conceptos"; explicaciones profundas de correctas e incorrectas. Su calidad ha caído "ligeramente" por añadir relleno para competir con AMBOSS |
| **AMBOSS** | 4,25/5 | su fuerte **no son las preguntas** sino la biblioteca de **>1.200 artículos** integrados y el **add-on de Anki**; dificultad por "martillos" 1-5. ⚠ **5 martillos = el 5% más extremo**, "cebras" que inducen *atrofia interpretativa*; el examen real se parece al rango **3-4 martillos**. Exam Mode idéntico a Prometric (1:30/pregunta) |
| **Kaplan** | 3,6/5 | herramienta de **fase inicial** (con las clases o el verano previo): habitúa al formato **sin "gastar" UWorld**. Fuerte en Behavioral Science, biología molecular, Micro y Anatomía/neuro; sus explicaciones traen **referencias cruzadas a páginas de First Aid**; 2 simulacros completos |
| **NBME (CBSSA)** | — | **estándar de oro** para medir progreso real (mismos escritores del examen) |

**Orden de uso ideal**: banco secundario (Kaplan/AMBOSS) en preclínico a volumen bajo (**un bloque de 5Q diarias** de la materia que cursas) → **UWorld exclusivo en dedicated**, una sola pasada profunda → **AMBOSS estrictamente complementario** (add-on Anki + artículos) → si terminas UWorld y sobra tiempo, **banco nuevo**, nunca reset. Melody: *"If you don't end up using two Qbanks and only have time to do one, just focus on UWorld."* Uso combinado (UNC): **UWorld random + AMBOSS dirigido** al sistema débil, "so you're not burning through that UWorld QBank".

**Cuándo empezar UWorld**: **antes de lo tradicional** — con ~3.600-3.800 preguntas ya no cabe en 6-8 semanas de dedicated; desde **M2** en paralelo a las clases con micro-validaciones de 5Q untimed por tema. **No en primer año** (foco en primeros principios + Anki). Lección de Melody (Fail #1): empezar UWorld en M2 **sin Anki** = "by the end of the year I had completely forgot what I had learned and those very same questions looked foreign to me".

(AMBOSS QBank for Step 1? 4 Criteria; Kaplan VS AMBOSS: Which is Better?; UWorld FAQ; Fixing USMLE Test-Day Mistakes: The STRESS Strategy)

## 3.11 Los 6 errores de UWorld

1. **Repetirlo sin estrategia** (2-3 pasadas): dogma nacido cuando el banco era pequeño. Corrección: **una pasada exhaustiva**, conceptos a Anki, preguntas nuevas de otros bancos.
2. **Perseguir vanity metrics** (100-120 Q/día robóticas): analogía NBA. Corrección: con cimiento débil, **5-10 Q/día ultra-lentas**.
3. **Creer que cada pregunta evalúa sólo conocimiento**: **hasta el 50% de las falladas en NBME son errores de interpretación**, no falta de datos (caso Klinefelter).
4. **The Last Sentence First Trap** (§5.6).
5. **Memorizar en lugar de comprender** (ejemplo SIADH, §1.3).
6. **Narrow Questions Review** (§2).

(Boost Your UWorld Score: Top 5 Mistakes to Avoid; Boost Your UWorld Score: Top 6 Mistakes to Avoid)

---

# 4. ANKI

## 4.1 Qué es Anki para Palmerton

- Definición: *"a spaced repetition program that happens to use flashcards"*; su uso previsto es el estudio **diligente y consistente en el tiempo**, NO el cramming (How to Cram for a Test Using Anki (Even if We Probably Shouldn't)).
- **Anki es para RETENER lo ya comprendido, no para aprender**: *"Anki is for retaining, not learning"*; **nunca** hacer una tarjeta de algo que no entiendes de raíz (The Step 2 Anki Strategy That Fixes Stuck Scores; Med School Anki: Make (or Find)).
- Por qué funciona (Dunlosky): las buenas tarjetas combinan **practice testing + distributed practice + elaborative interrogation + self-explanation** — las cuatro técnicas de mayor utilidad, mientras el día del estudiante típico está lleno de las de baja utilidad.
- **Es difícil, y eso es bueno**: pocos lo usan bien y menos persisten; el que sí, se diferencia (Anki for Med School: Why Is It So Hard to Do (and Why That's Good)).
- **Impacto medido de FSRS en el propio mazo de Alec**: mediana **159 → 73 repasos/día** (−>50%) con retención **90,3% → 90,4%**; de **472 h (mediana 72 min/día) en 2022** a **186 h (mediana 25 min/día) en 2025** = **286 h ahorradas = 12 días completos**. Cita: FSRS es *"as close to a free lunch as you're ever going to get with Anki"* (I Did 913,701 Anki Reviews).

## 4.2 Configuración exacta

| Ajuste | Valor | Justificación / fuente |
|---|---|---|
| **FSRS** | **Activado** — pero **NO** durante el primer mes o dos si eres nuevo: deja que SM-2 registre tus patrones (sin datos, FSRS da intervalos erráticos) | Give Me 30 Minutes and I'll 5X Your Anki Efficiency; How To Use Anki Like A Pro; I Did 913,701 |
| **Desired retention** | **0,90 (90%)**; rango saludable 85-90% | de 90 a 100% = **+500% de tiempo**; The Danger of Active Recall |
| **New cards/day** | **máximo 50**; principiantes **30-40**; si varias materias, dividir la cuota (25 medicina + 25 farmacología); **mazo de farmacología aparte con 20/día** | >50 → colisión de intervalos cortos **entre la semana 3 y la 6** → "avalancha" y burnout; Give Me 30 Minutes; Med School Anki: FAQ |
| **Maximum reviews/day** | **9.999** | el default (100) **oculta** tarjetas vencidas y crea un backlog invisible; Med School Anki: FAQ; Yousmle Anki FAQ |
| **Learning steps / intervalos** | **los de por defecto**; no manipularlos para "acelerar" | deforma la matemática del algoritmo |
| **Orden** | **Reviews first, new cards second** | "plugging the leaks" antes de añadir; Why I Stopped Using Zanki (Adam Nessim) |
| **Next day starts at (rollover)** | **4 h** (en vez de 9) si despiertas a las 05:00 | para que las tarjetas del día estén listas al abrir; How to change time of day when Anki cards show up |
| **Bury siblings** | **no está en las fuentes** | — |
| **Mazos** | **2 mazos: Pharmacology y no-pharm**; como máximo **3** (micro aparte). NUNCA 6 mazos por materia ni "mother of all decks" | fricción diaria; Med School Anki: FAQ preg. 13; UWorld + Anki: 5 Ways |
| **Sync** | cuenta AnkiWeb; sincronizar **al inicio y al final** de cada sesión; ante conflicto preguntar *"Where is the most up-to-date information?"* → Upload desde el dispositivo recién usado | elegir mal **borra los repasos del día**; How To Use Anki Like A Pro |
| **Note type** | **Basic (optional reversed card)**; "y" en *Add Reverse* **sólo** cuando la dirección inversa se evalúa | reversar todo **duplica** el mazo |
| **Dispositivos** | crear/editar en **desktop**; móvil sólo para repasar; en hospital **AnkiWeb en el PC**, nunca el celular | Med School Anki: FAQ preg. 12; 6 Simple Computer Tricks |

**Regla de arranque** para quien tiene pocos meses: sí se puede empezar; **30-40 tarjetas/día**, tarjetas simples (farmacología es la materia más fácil para "mojarse los pies"), sin listas, y **al mínimo las revisiones viejas todos los días** (Med School Anki: FAQ preg. 3).

## 4.3 Disciplina de botones

- **Good ≈ 90%** de las veces: si recordaste **la lógica general del concepto** (no palabra por palabra).
- **Again ≈ 10%**: sólo ante olvido absoluto de la lógica o error conceptual grave.
- **Evitar "Hard" y "Easy"**: alteran los cálculos de dificultad, comprimen intervalos e inundan el día de revisiones innecesarias.
- Perfeccionismo = tiempo perdido: *"some people try to learn every single word of every card. That's a mistake. Instead, make sure you understand the concept."*
- Las tarjetas largas invitan a mentirse ("sabía el 60%… Good") y a bajar el estándar. **La honestidad de calificación es la base del algoritmo.**

(Give Me 30 Minutes and I'll 5X Your Anki Efficiency; I Did 913,701; Med School Anki: FAQ preg. 8; Med School Anki: The Secret Weapon)

## 4.4 Tipos de tarjeta, con ejemplos literales

### Concept card (la tarjeta insignia)

No pide un término: pide **explicar la conexión lógica patogenia → clínica**. Fórmulas: *"Use the pathophysiology to explain..."* / *"Connect its use to..."*.

- **Front:** `Epidural versus subdural hematoma - Use the pathophysiology to explain which presents faster and why`
  **Back:** `Summary: Epidural hematoma is arterial (high pressure) -> presents in hours (rapid). Subdural hematoma is venous (low pressure) -> presents in days/weeks (gradual).`
- **Front:** `Epidural hematoma – Use the pathophysiology to explain the classic presentation.`
  **Back:** `Rupture of a (high-pressure) middle meningeal artery -> rapid (hours) progression, with signs of neurologic deterioration (e.g. headache/confusion/drowsiness/loss of consciousness)` — reemplaza dos tarjetas de hechos.
- **Front:** `Infective endocarditis - Use the pathophysiology to explain what you might see on an ophthalmologic exam`
  **Back:** `Roth spots (retinal hemorrhages with pale centers) secondary to embolization of vegetations and microvascular immune complex deposition`
- **Front:** `Caffeine - Connect its use to the different ways you can administer it.`
  **Back:** `Summary: Can be given by virtually any route (PO, IV, transdermal patches) because it crosses the blood-brain barrier, meaning it crosses all plasma membranes easily.` (mismo principio para nicotina y opioides)
- **Front:** `TTP – Use the pathophysiology and severity to explain the treatment.`
  **Back:** `Plasmapheresis (plasma exchange). Fundamentally it is an autoantibody-mediated disease (ADAMTS13 deficiency) – and a relatively severe one – so it makes sense that you must use a technique to physically filter out and remove those antibodies as soon as possible.` Alec: *"You COULD make a card that just said 'TTP – what is the treatment?' but it'd be harder to remember, and less likely to help you with other topics."*
- **Front:** `Warfarin skin necrosis - Use the mechanism of warfarin to explain why it can occur and how.`
  **Back:** `Warfarin inhibits Vitamin K epoxide reductase, decreasing clotting factors 2, 7, 9, 10 and anticoagulant proteins C and S. Since Protein C has the shortest half-life, it is depleted first within the first 24 hours, causing a transient hypercoagulable state with microvascular thrombosis and subsequent skin necrosis` — reemplaza la cloze `Warfarin skin necrosis is caused by a transient deficiency in {{c1::Protein C}}`.
- **Front:** `Paget's Disease – Pathogenesis? How can it lead to hearing loss?`
  **Back:** `Increased osteoblastic and osteoclastic activity that causes abnormal "woven bone" architecture. Auditory foramen narrowing as a result of abnormal bone architecture.`
- **Front:** `Osteosarcoma – use the general treatment of (not widely metastatic) cancer to explain the typical treatment.` **Back:** `Typically cancer is treated with surgical resection +/- chemotherapy. Osteosarcoma follows this general rule.` — un principio ahorra "docenas" de tarjetas.
- Ejemplo no médico (el que usa para enseñar el formato): **Front:** `Neoliberalism - Use the etymology to explain what this word means.`

### Pathogenesis-to-Presentation (P-to-P) — "las tres preguntas"

Antes de crear la tarjeta, contestar **en voz alta**: (1) ¿cuál es la patogenia? (2) ¿cuál es la presentación? (3) ¿cómo se conectan lógicamente? → tallar esa historia en la tarjeta. Esta es la **clave #4** que llevó a Alec "de 236 a 270" (UWorld + First Aid: 4 Keys to Mastery).

### Pathophysiologic Chronology (PC card)

Plantilla exclusiva Yousmle para **reordenar la viñeta** (que sigue el orden de H&P) en cadena lineal causa → mecanismo → efecto, **en tiempo presente**. Longitud típica **4-6 pasos**. Ejemplo literal:
`Born normal, then had bad habits (smoking) and took poor care of his vascular health (diabetes, HTN, HL) -> coronary artery disease -> plaque rupture -> thrombus in coronary artery -> myocardial ischemia -> chest pain`
Otro: `Lactotroph neoplasia -> anterior pituitary mass -> compression of other anterior pituitary cells -> ACTH/TSH/FSH/LH decrease`.
**Regla**: *"if you ever get a question wrong because you miss the diagnosis the answer is always make a PC card"* ("I Just Need to Pass" Fails USMLE Retakes).

### Compare & Contrast

- **Front:** `SIADH versus heart failure hyponatremia - Use the pathophysiology to explain how you can differentiate between the two based on their lab findings.`
  **Back:** `Summary: SIADH is euvolemic (urine Na > 40 mEq/L, urine Osm > 100 mOsm/L). Heart failure hyponatremia is hypervolemic (urine Na < 20 mEq/L due to low effective arterial blood volume triggering aldosterone/RAAS and maximum proximal sodium reabsorption)`

### Transfer cards (dato duro → estado fisiopatológico)

- **Front:** `A catheterization shows a 50 mm Hg gradient across the aortic valve. What is the significance? What complications would you expect over time?`
  **Back:** `Summary: It is severe aortic stenosis (normal is < 10). It causes chronic left ventricular afterload increase -> concentric LVH -> diastolic (and eventually systolic) heart failure`

### "Why" cards y conexiones

- Básica: `Syncytiotrophoblasts – what are they? Where are they located?`
- Con "why": `...Why?` → sincitio sin gaps intercelulares → **barrera hemato-placentaria** → las células inmunes maternas no cruzan.
- Con conexión: `Syncytiotrophoblasts – use what they are to explain their location. Specifically, explain how they would interact with the maternal immune system.` (+ "Recall that immune cells migrate BETWEEN cells in a process called diapedesis").
- Ácido-base: `Hyperventilation – has what effect on acid-base status? Why?` (la versión mala, `Hyperventilation would cause what kind of alkalosis?`, **regala** la respuesta).
- Genérica para fármacos: en lugar de *"¿qué hace el fármaco X?"*, **"basándote en el mecanismo del fármaco X, explica sus efectos secundarios"**.

### Imagen, audio, reverse, farmacología, micro

- **Imagen**: si fallas reconocimiento visual, crear **20 tarjetas de imagen** del tema de golpe (20 histopatologías digestivas, 20 placas de tórax) con *"Identify the following..."*; add-on **Image Occlusion** para anatomía, radiografías, frotis y vías metabólicas de First Aid. Capturas: Mac Cmd+Ctrl+Shift+3/4, PC PrtScn.
- **Audio**: **F3** para adjuntar un soplo (cada vez hay más audio en el USMLE) y el *"ninja method"*: adjuntar la pronunciación del fármaco o del bicho.
- **Reverse**: `Basic (optional reversed card)`; el Back puede acabar con una pregunta de anclaje (`Plasmodium – treatment (2)` / `chloroquine + primaquine… Organism?`). **Rating 1-10** de dificultad anticipada por dirección para equilibrarlas; y **anotar el número de ítems** ("uses (3)") porque el fallo típico es olvidar el último de una lista sin saber cuántos eran.
- **Farmacología**: forward + reverse de **mecanismo, uso clínico y toxicidad = ≥6 tarjetas por fármaco**; agrupar efectos adversos por mecanismo (reductor de poscarga → activación simpática refleja → taquicardia → se bloquea con β-bloqueador). Es la materia donde un mazo pre-hecho bien hecho **sí** ahorra tiempo.
- **Micro**: ejemplo real del mazo Yousmle — **Front:** `Most important cause of arbovirus-associated viral CNS infections? Virus family?` **Back:** `West Nile Virus. Flavivirus. MC what?`. Abreviaturas del mazo: **MC** = most common, **2/2** = secondary to.

(Give Me 30 Minutes; The Step 1 Anki Strategy Used by 260+ Scorers; From Novice to Anki Expert; Med School Anki: Make (or Find); Five "5-Minute or Less" Anki Card Tips; How to Master Step 1 Pharmacology Over a Glass of Wine; UWorld + Anki: 5 Ways; Why You Know the Answer But Still Get It Wrong; ChatGPT Flashcards: Study More, Score Less)

## 4.5 Las 5 reglas de la "Complete Guide" (y los 4 errores que corrigen)

1. **Minimizar información no relacionada (1-3 hechos conectados por tarjeta).** *Mistake #1 — tarjetas largas*: el ejemplo real de un alumno pedía diferenciar 5 exantemas en una sola tarjeta → si olvidas escarlatina repites el 80% que ya sabías, y tiendes a mentirte para no repetir. Solución: una tarjeta por entidad. **"Más tarjetas pero más cortas = menos tiempo total de repaso."**
2. **Cada pregunta con una sola respuesta inequívoca.** Analogía: tamborilear *Mary Had a Little Lamb* — para ti es obvio, para tu yo futuro no. *Mistake #2*: `Oral hairy leukoplakia` → mejor `Oral hairy leukoplakia – what is the infectious cause?`. *Mistake #3 — regalar la respuesta*.
3. **Evalúa explícitamente lo que quieras recordar.** *Mistake #4*: su propia tarjeta temprana `Parainfluenza virus vs. RSV – major syndromes? BONUS: surface proteins?` con un reverso de 8 líneas → no recordó nada: *"you will only remember what you ask yourself to recall."*
4. **Pregunta "¿por qué?"**
5. **Haz conexiones entre conceptos** (self-explanation).

**Conciliación de la aparente contradicción** (tarjetas cortas vs P-to-P largas): las P-to-P son **una sola idea conectada** con resumen arriba; lo prohibido es **varios hechos no conectados** en una tarjeta.

(Med School Anki: Make (or Find) USMLE-Crushing Flashcards)

## 4.6 Formato y redacción

- **Subject-first**: `Tema — pregunta` (`Caffeine - connect its use...`), para que el cerebro entre en "modo cafeína" antes de leer; ahorra **~5 s por tarjeta**.
- **Summary rule**: si el reverso supera **2-3 líneas**, poner un resumen de 1-2 líneas arriba; el **90%** de las veces basta el resumen para calificar.
- **Information leakage**: anversos que regalan la respuesta (*"¿Por qué el hematoma epidural presenta un deterioro rápido?"*) entrenan **reconocimiento**, no recuperación.
- **Cloze**: *"I hate cloze even for memorization"* — entrena reconocimiento de pistas visuales (posición, letras azules) → ilusión de reconocimiento que se congela ante la viñeta con ruido.
- **No copiar literal** el Educational Objective ni arrastrar edad/sexo del paciente: abstraer al principio.
- **Text expander** para símbolos (`,alp` → α, `,bet` → β, `,del` → Δ) y **tags** al crear (`Cardio`, `Pharm`) para filtrar en Browser y Custom Study.

(Give Me 30 Minutes; The Step 2 Anki Strategy; ChatGPT Flashcards; Use aText to Boost Your USMLE Anki Card-Making Efficiency; 6 Simple Computer Tricks — tip #2)

## 4.7 Cuántas tarjetas y de dónde salen

- **"Simple numbers game"**: 50 nuevas hoy → 50 viejas mañana + 50 nuevas; a los ~4 días las primeras vuelven → 100 viejas + 50 nuevas → 150… **La única palanca es crear menos.**
- **Educational Objective como filtro**: *"¿vale este detalle el costo de oportunidad de revisarlo todos los días durante los próximos 6 meses?"*
- **Whole Page Rule**: 15-20 o 30-50 tarjetas de la sección completa (⚠ discrepancia, §11.4).
- **No** una tarjeta por cada distractor ni por cada dato microscópico.
- Métrica de progreso: *"the more cards you make on a topic and the better cards... the faster you're going to get to mastery... more arrows at a target"*; **50 tarjetas por subtema amplio** y dominio al 80% "en un día".
- Los que hacen >120 preguntas/día productivamente **casi siempre han abandonado Anki**.
- **Permiso para no recordarlo todo**: *"perfect is the enemy of good"*.

**Presupuesto de tiempo** (calibración oficial): tarjetas viejas **≤1 h por 100 revisiones** (2-3/min, 20-30 s cada una); tarjetas nuevas **1-2 min** cada una. Ejemplos: 300 viejas + 45 nuevas ≈ **4 h**; 200 viejas + 35 nuevas ≈ **2,5-3 h**. Si tardas más de 1 h por 100 viejas, las cuatro causas son: **tarjetas demasiado largas** (la nº 1), **perfeccionismo**, **distracciones** y **repasar cansado/de noche** (+50% de tiempo por tarjeta).

(5 Keys — key #4; UWorld + Anki: 5 Ways; Med School Anki: FAQ preg. 8; The ONLY Video You Need; Military Mom Needs a 260)

## 4.8 Los errores de principiante y los hábitos del "Anki master"

**Errores** (From Novice to Anki Expert; Med School Anki: FAQ):

1. **Memorizar hechos.** Señales: no hay tiempo para QBank ni simulacros, te ahogas en tarjetas, la comprensión es superficial. Corrección: las **tres preguntas** (patogenia / presentación / conexión).
2. **Depender sólo de mazos pre-hechos.** Tres razones: son de hechos; *correlation ≠ causation* ("silent evidence": ves a los que triunfaron con Zanki/AnKing, no a los que no); **hacer tus tarjetas profundiza** — lo que cuesta no es escribir la tarjeta, es **aprender bien** para poder escribirla.
3. **No usar Anki todos los días.** **Regla del 100%**: *"It is easier to do something 100% of the time than 99%"* — elimina la decisión "¿hago Anki hoy?". *"Some of the most painful days of med school have been when I skipped 1-2 days."*

**Hábitos del master**: (a) **Educational Objectives** para priorizar; (b) **cada día sin excepción** — si cuesta, **baja las nuevas** y "keep the streak alive" (usa Stats para ver la racha); (c) **maximizar el tiempo muerto**: función **"study ahead"** en días ligeros para crear colchón antes de rotaciones duras o eventos, y bolsillos de 5-15 min durante el día.

**Regla de oro de consistencia absoluta**: revisiones a **cero todos los días sin excepción**. Alec las hizo **el día de su boda, en la luna de miel, los días de sus exámenes de junta y la noche después de rendir Step 1**; un solo día saltado inicia la bola de nieve (I Haven't Had to Re-Learn Anything; Step 1 Study Plan: 10 Habits).

## 4.9 Mazos pre-hechos: Zanki / AnKing / Brosencephalon / Yousmle

- Tamaños: Zanki **26.000+** tarjetas; críticas a mazos de **40.000-50.000** para un solo examen.
- Qué resuelven: **Breadth y Retention**. Qué **no**: **Depth y Application** → "flashcards may not be great to learn from".
- Riesgo: fragilidad y anclaje; los pre-hechos fueron **las tarjetas que Alec más olvidaba y repetía**, porque nunca las entendió.
- **Quién sí se beneficia**: quien ya tiene (o desarrolla rápido) Depth y Application y usa el QBank para aplicar; y quien es **muy, muy diligente**. Regla nº1: *"go BEYOND the words in them to develop genuine understanding"*.
- **Adam Nessim** (Einstein): Brosencephalon → "sabía la respuesta tras 3 palabras"; Zanki → **150-200 nuevas/día** en verano → **~4.000 sin revisar** ("goodbye, spaced repetition"); memoria fragmentada (sabía que la enfermedad de cambios mínimos es nefrótica pero no podía listar los 5 nefróticos). Tres cambios: **reviews first**, tarjetas de conexión (velocidad de repaso −33% pero comprensión ↑) y mazos que refuercen otros recursos + tarjetas propias.
- **Mazos Yousmle** como andamio: Step 1 (1.800+ tarjetas "on most frequently-misunderstood topics"), Step 2 CK y Pharm; usarlos primero para aprender **qué es una buena tarjeta** y luego añadir propias en los temas débiles.

(Zanki / AnKing: The Promise, Pitfalls, and Best Uses; Why I Stopped Using Zanki and Brosencephalon; Med School Anki: FAQ preg. 14)

## 4.10 El error que convierte el estudio diario en cramming — y el protocolo de backlog

**El error**: hacer sólo las **nuevas** (azul) e ignorar las **vencidas** (verde/rojo). Rompe la cadena del algoritmo; semanas después hay que **re-aprender de cero** → Anki degradado a cramming, sin *compounding*: "cinta de correr sin fin". **Solución: Reviews first cada mañana; si falta tiempo, nuevas = 0**; limpiar a diario hasta *"Congratulations, you have finished this deck for now"*.

**Protocolo "Catch Up 2.000 tarjetas en 3 días"** (nació en una rotación de 12 h en la UCI cardíaca del MGH, con ~2.000 atrasadas; la cifra activaba la amígdala y la evitación):

1. **Nuevas/día = 0.**
2. **Maximum reviews/day = 100 o 200** (un número psicológicamente pequeño).
3. Hacer las 200 hasta la pantalla verde: *"psychologically to go from 200 to zero is massive, whereas to go from 1,800 to 1,600 is not that big. We are all simple creatures."*
4. Si sobra energía, **subir temporalmente a 300** para 100 extra.
5. **Antes de dormir, volver a poner 200** para que la mañana muestre un número amigable.

Resultado: backlog de meses limpio en **3 días** sin romper la salud mental. **Nunca** resetear el mazo ni usar "Forget" en bloque: destruye el historial de intervalos. Y: *"don't try to learn a lot of new material while you're trying to catch up, just review... plug the leaks in your bucket."*

**Regla de frenado**: si el % del QBank está estancado o en declive → **nuevas = 0** y días dedicados a limpiar el backlog con honestidad.

**Pre-examen**: nuevas a **0** 1-2 semanas antes; repasos limitados a **200-300/día** (⚠ cifra del studio guide; A VERIFICAR (08-sep)).

(The Anki Mistake That Turns Daily Studying Into Cramming; How to Catch Up 2,000 Anki Cards in 3 Days; How to Study When You're Too Busy to Study; The Pattern Keeping Your USMLE Score Frozen)

## 4.11 Cramming legítimo sin dañar el mazo (Custom Study)

1. Decks → mazo → **Custom Study** → **"Study by card state or tag"**.
2. Elegir nº de tarjetas y estado: normalmente **"All cards in random order (don't reschedule)"**.
3. Seleccionar/excluir **tags** (incluir `Cardio`, excluir `Pharm`).
4. Estudiar.
5. **Options → dejar DESMARCADO "Reschedule cards based on my answers in this deck"** para que los fallos del cram no reseteen intervalos reales.
6. Al terminar, **borrar el Custom Study deck** (las tarjetas vuelven a su mazo original).

(How to Cram for a Test Using Anki (Even if We Probably Shouldn't))

Otras palancas operativas: **Set Due Date = 0** (Browse → seleccionar → *Set Due Date* → `0`) para estudiar hoy las tarjetas recién creadas; **Forget** sólo para un grupo selecto de tarjetas maduras memorizadas "por silueta", **nunca en bloque**; **Stats** para auditar racha y backlog (How to Force Anki to Review Particular Cards; How To Use Anki Like A Pro).

## 4.12 ChatGPT / IA: las 3 trampas y el uso correcto

1. **La IA se salta el proceso de aprendizaje**: *"The struggle of making the card is the learning. The card itself is just the byproduct."*
2. **La IA regala la respuesta en el anverso** (los modelos están optimizados para ser claros → *information leakage*). Comparativa literal (estenosis aórtica): IA → `In aortic stenosis, explain why a high pressure gradient across the aortic valve leads to left ventricular hypertrophy and eventually heart failure.` (ya lo dice todo) vs Yousmle → `A catheterization shows a 50 mm Hg gradient across the aortic valve. What is the significance?`
3. **Volume death spiral**: cientos de tarjetas fáciles/día → miles de revisiones → sin QBank ni sueño → score congelado.

**Uso correcto**: **tú redactas siempre el anverso** (amplio, sin pistas); la IA puede redactar o revisar el **reverso** una vez que ya entendiste, y generar **compare & contrast**. Para investigar el porqué de un dato sin resaltar en First Aid, Perplexity / ChatGPT Search. Literal: *"Which part of the card should you always make yourself? — The front."*

(ChatGPT Flashcards: Study More, Score Less; Why "I'm a Bad Test Taker" Is Costing You 30+ USMLE Points; First Aid Ultimate Guide)

## 4.13 Anki en el día y en la vida

- **Hora**: por la mañana con la mente fresca — **94 revisiones en 20 min a las 05:00-06:00**, frente a **2-4× más de noche** (+50% de tiempo por tarjeta). Todas las revisiones **antes de la primera obligación del día**.
- **Downtime**: bicicleta estática/elíptica a intensidad leve-moderada ("my daily review time literally went down by more than half"; **no** en la trotadora), fila del supermercado, entre clases, metro sin señal. *"If you add up all of the 5, 10, or 15 minute chunks... you would be surprised."*
- **Curva de esfuerzo**: al principio **3-4 h/día**; en clerkships **~1 h/día**; de residente **~45 min/día**; hoy **≤50 tarjetas ≈ 15-30 min**.
- **Deep Work en las revisiones**: bloques sin internet (Freedom), teléfono fuera — las tarjetas con explicación profunda exigen foco.

(Step 1 Study Plan: 10 Habits; Med School Anki: FAQ; The 8 Most Important Study Techniques; I Did 913,701; 5 Keys — key #3)

## 4.14 Casos que definen el uso correcto

- **Sarah (MIT)**: hasta **12 h/día** de Anki y preguntas buscando el 100% → *"Done is better than perfect"*, umbral 80% y EMDR → aprobó al 3.er intento.
- **Jay**: 100 Q/día, todos los NBME y mazos pre-hechos memorizados, NBME "in the 60s" y aun así **reprobó** (conocimiento frágil). Cambio: 5-10 Q/día untimed, tarjetas propias del porqué, **todos los due reviews a primera hora**, CCSN → **percentil 3 → 92% (≈262) en <2 meses** → Match en Urología.
- **Haley**: 60% en simulacros durante 6 semanas; hacía tarjetas de cada fallo pero acumulaba **miles de repasos atrasados** y tarjetas de detalle → lo de hoy se olvidaba en 2 semanas.
- **Alexis**: NBME **217 → 233 → 225** por acumulación de tarjetas de baja calidad sin sistema de limpieza del backlog.
- **Miriam** (dentista, >10 años sin ser estudiante): **49% → 83%** en ~2 meses. Uno de sus tres cerrojos era que **sólo podía responder en una dirección** (nombre→definición sí; definición→mecanismo no) → **tarjetas en ambas direcciones** y **no regalar la respuesta en el frente**.
- **Parth** (IMG caribeño, 3,5 semanas para no ser expulsado): **48% → 59% "in just over two weeks"**, pero Alec diagnostica *"you're essentially doing a more effective form of cramming"* porque hacía pocas tarjetas y no las repasaba a diario → *"the number one thing that would make the biggest difference is more consistently making 50 cards a day... you got to make all 50 of them count."*
- **La alumna que "odiaba Anki"**: pacto de 4 semanas; a las 2,5 semanas: *"I love Anki. I am actually remembering things."*

(The Danger of Active Recall; From Failing Step 1 to 260s; The Pattern Keeping Your USMLE Score Frozen; She Went From Bottom 1% to Top 3% in 2 Months; Why USMLE Scores Stay Stuck (Anki Strategy Fix); From Novice to Anki Expert)

---

# 5. INTERPRETACIÓN DE PREGUNTAS

## 5.0 Por qué esto vale más que estudiar más

**Scoring 250+ requires 3 things** (literal): (1) *Content mastery*; (2) *Question interpretation*; (3) *The right mentality* (What Basketball Can Teach You About USMLE Timing).

De 230-240 a 260+ el conocimiento nuevo aporta un beneficio marginal mínimo: el salto viene de **eliminar unforced errors** en temas que ya dominas. Literal de la tutoría con la alumna de KCU: *"typically when people get to about a 220 their knowledge is [there]… most of the jump comes from just not making unforced errors… this is how you can get more questions correct for the knowledge that you have. And that's the game to get a 260."* La pregunta correcta NO es *"What else can I learn?"* sino **"Where am I weakest and how can I fix it?"** (The USMLE Mindset That Guarantees a 260+; How to Make Hard USMLE Questions Easy).

Cifra recurrente: **hasta el 50% de las preguntas falladas** por estudiantes con buena base son errores de interpretación, no de conocimiento; *"in our analysis of students' practice tests we routinely find that 50% or more of missed questions are due to test taking errors not knowledge gaps"* (Boost Your UWorld Score: Top 6 Mistakes; Why You Know the Answer But Still Get It Wrong; 10 Step 2 Score Killers).

## 5.1 La Standalone Question (SAQ)

**Definición.** El NBME diseña cada ítem para que **un panel de expertos lo responda de forma unánime sólo con el enunciado, sin ver las opciones**. Formulación literal de Palmerton: *"If I had to answer this question without knowing anything about the vignette and if I didn't know any of the answer choices, what would the question be where I could unambiguously answer it?"*

**Protocolo (5 pasos)**: (1) analizar la viñeta con CCSN → (2) **tapar físicamente las opciones** → (3) formular la SAQ, desvistiendo la pregunta de todo detalle superficial → (4) dar una **respuesta autónoma y predictiva** → (5) destapar y elegir la que coincide.

**Acallar la mente asociativa** (literal, TDAH incluido): *"as someone with ADHD my brain will tell me lots of things, which is why I stop and I have to say: okay, no no no, what is the standalone question?… what are they actually asking me, not what is my brain telling me."*

**Las 4 reglas de una SAQ de calidad**:

1. **Rule of Expert Agreement**: cualquier panel de expertos la respondería igual sin viñeta ni opciones.
2. **Sin detalles en el enunciado**: *"The more details you're adding to your standalone question, the more likely it is that you're going to panic and think 'Oh my god, I don't know the answer to this question.' Instead… simplify it as much as is humanly possible."*
3. **Para preguntas de manejo, incluir diagnóstico Y severidad**: fórmula literal **"What is the management for [Severity] [Diagnosis]?"** — *"for management questions it's easy: what's the diagnosis and what's the severity?"*
4. **Reformular hasta que tu intuición pueda responder**: *"The trick is that you need to frame it in such a way that, with the knowledge that you have, you can use your intuition to solve it."*

**Ejemplos literales (mala SAQ → buena SAQ)**

| Caso | Mala SAQ (demasiado detalle → pánico) | Buena SAQ (conceptual) |
|---|---|---|
| Glucogenosis tipo I | "Deficiency of which of the following enzymes is most likely the cause of this patient's disorder?" | **"What enzyme is deficient in von Gierke?"** |
| STEMI (56 a, DM, HTA, 30 paq-año, dolor tras palear nieve) | "¿cuál es la fisiopatología en este hombre de 56 años con…?" | **"What is the pathophysiology of a STEMI?"** → ruptura de placa + trombosis oclusiva |
| Mujer 60 a, posmenopáusica, 40 paq-año | "fumadora → ¿cáncer de pulmón?" (asociación automática) | **"What is the number one killer of people in the United States, period?"** → infarto/ECV |
| Ascitis + cirrosis (alumno con NBME **262**) | cadena asociativa "ascites → SAAG → albúmina → un lab" → marcó **amonio sérico** | **"If you have portal hypertension, what should you be worried about / what test would you do?"** |
| TVP postoperatoria bajo heparina profiláctica | "What is the management for a DVT in a post-op patient on prophylactic heparin?" | **"What is the treatment for acute DVT?"** |
| EVP con dolor en reposo, atrofia, pérdida de vello | "¿cómo manejas el dolor en reposo en un paciente con EVP que…?" | **"What is the treatment for severe peripheral vascular disease?"** |
| Fiebre 102 °F, pulso 110, hipotensión, oliguria | "¿tratamiento para un paciente de 25 años con fiebre de 102 °F, pulso 110 y oliguria?" | **"What is the treatment for sepsis with shock?"** |

**Técnica de la Comparación Extrema** (*"take an extreme version"*), para cuando la SAQ sigue pareciendo enciclopédica: construir **dos pacientes hipotéticos con una sola variable extrema cada uno** y preguntarse *"who would you be more worried about?"*.

- **Páncreas** (cáncer de cabeza de 49 años que envuelve los vasos mesentéricos superiores; SAQ "¿qué empeora el pronóstico?" suena imposible): (A) masa de 5 cm en la **cabeza**, completamente aislada de los vasos vs (B) masa de 5 cm en la **cola** "all up in" la arteria y la vena mesentéricas superiores → **B** → el factor pronóstico es el **compromiso vascular** (irresecabilidad), no la localización.
- **Osteoporosis** (mujer de 66 años, IMC 17: ¿pesa la edad o el IMC?; "my favorite" de Alec): (A) 66 años con IMC 22 vs (B) **22 años** con IMC 17 → **A** → pesa la **edad**.

Literal: *"do you see how it's the same question, you have the same knowledge, but because of the way that you're framing it… your chances of getting the question correct are now dramatically better."* Diagnóstico de esa alumna (baseline 220 → 229, meta 260): de las 3 preguntas revisadas **ninguna** fue por falta de conocimiento.

**La SAQ va en el anverso de la tarjeta Anki**, nunca una cloze del caso. Y *"we've also seen people improve their scores by like 20 or 30 points just by getting better at asking standalone questions."*

(How to Study So Fast…; How to Guarantee a Step 1 Pass; How to Review USMLE Questions for 20–30+ Points; Step 1 Study Plan: 5 Tips; How to Make Hard USMLE Questions Easy — transcripción)

## 5.2 Cover-the-Options Rule y los 9 secretos del NBME

1. **Cada ítem evalúa aplicación**, no recuerdo de un hecho aislado.
2. **Conceptos importantes, no zebras**: diabetes, IAM, sepsis, asma.
3. **El número de preguntas es proporcional a la importancia del tema** (cardio, renal, GI, endocrino, pulmonar dominan).
4. **Las viñetas clínicas existen para eliminar a los memorizadores** (presentaciones atípicas, sin buzzwords).
5. **Un solo formato**: *Single Best Answer, Closed Responses*. Prohibidos "todas las anteriores", "A y B" y los enunciados negativos.
6. **Cover-the-Options Rule**: tapadas las opciones, el enunciado debe permitir que **un cuarto lleno de expertos** acuerde unánimemente. Si necesitas ver las opciones para saber qué preguntan, es una pregunta **mal escrita** (de un QBank de baja calidad), nunca del USMLE.
7. **"No one is trying to trick you"**: la dificultad viene de la aplicación o del ruido, nunca de dobles sentidos.
8. **Las viñetas siguen el formato H&P**: motivo + HPI → antecedentes → sociales → vitales → examen → labs/imagen. **Nunca** ponen los labs al inicio salvo que sean el motivo de consulta → lee sabiendo qué esperar en cada párrafo.
9. **El NBME audita psicométricamente cada ítem** (índice de discriminación, anomalías geográficas) para detectar "recalls".

Y el mecanismo del daño: los distractores *"are designed to be plausible"* y **contaminan el razonamiento** si los ves antes de formar tu impresión — **peor cuanto más sabes del tema**. Quien aplica cover-the-options de forma consistente **reporta menos tiempo por pregunta, más aciertos y más tiempo al final del bloque**.

(How Are USMLE Questions Written? 9 Open Secrets; How to Study So Fast…)

## 5.3 CCSN: Contexto · Cronología · Severidad · Ruido

Protocolo rígido para procesar **cada oración** antes de mirar las opciones. La alternativa (el *chaos approach*: escanear buzzwords, leer la última línea primero) es la principal fuente de unforced errors en estudiantes con buena base.

**C — Context.** Casi ningún síntoma o laboratorio es patognomónico por sí solo. Al final de **cada oración**: *"¿qué significa esto en el contexto de lo que ya leí?"* Ejemplo: (1) "dolor de pecho" → inespecífico; (2) "elevación del ST" → más específico pero no diagnóstico (pericarditis, aneurisma ventricular); (3) "troponina elevada" → daño miocárdico (miocarditis, IC severa). **Las tres juntas → STEMI inequívoco.**

**C — Chronology.** El NBME **desordena deliberadamente** la secuencia temporal para saturar la memoria de trabajo; el System 1 es ciego a la cronología. Protocolo: reordenar todo **en tiempo presente y en orden real**. Ejemplo literal — viñeta: mujer de 25 años con 3 h de dolor torácico; hace 7 días volvió de un vuelo largo; hace 8 semanas empezó anticonceptivos. Reordenada: *"A 25-year-old woman starts taking OCPs. 7 weeks later, she gets on a long flight. 5 days after that, she has 3 hours of chest pain."* → hipercoagulabilidad → estasis → TVP → **TEP**: obvio de inmediato.

**S — Severity.** Es la clave de las preguntas de manejo (hasta **40%** de Step 2/Shelf, cada vez más en Step 1). Regla de oro literal: **"The more severe the presentation, the more aggressive the management is going to be."** Claves: (1) **ubicación** (urgencias/UCI/ambulancia = severo; consulta ambulatoria = leve); (2) **signos de shock** — literal: *"if the heart rate is ever above the systolic blood pressure"* (índice de shock >1) descarta cualquier manejo ambulatorio; (3) **disfunción de órgano diana** (somnolencia/confusión, oliguria/creatinina ↑). Ejemplo diverticulitis: (A) ambulatorio, estable, dolor en FII → antibióticos + reposo intestinal; (B) letárgico, PA 85/50, FC 120, abdomen en tabla → laparotomía de emergencia. **Mismo diagnóstico: la severidad cambia la respuesta "de una pastilla a un bisturí".**

**N — Noise.** Información irrelevante o contradictoria añadida para sembrar duda. **Step 1: casi todo señal, poco ruido. Step 2 CK / Step 3 / shelf / boards: ruido "ensordecedor".** Ejemplos literales: IAM con ST↑ en II, III, aVF + "antecedente de ERGE" (para tentar con IBP) + "volvió de un vuelo largo" (para dudar TEP) + "su madre tuvo estenosis mitral a los 65" (irrelevante); "visitó el gimnasio por primera vez ayer" (distensión muscular); **shock séptico con extremidades frías** en vez de calientes (para que el perfeccionista descarte sepsis).

**Protocolo de aplicación**: 1.ª oración → diferencial por demografía + motivo · cada oración siguiente actualiza el diferencial (Contexto) · reordenar hitos en presente (Cronología) · evaluar vitales/estado mental/perfusión (Severidad) · filtrar distractores no respaldados (Ruido).

Versión de Melody (le costó **un año** de sesiones automatizarla): *"read each sentence of the question stem and figure out how it contributes to the overall presentation. Then order the events into the correct timeline, simplify the stem into a specific question, and answer it. Lastly, explain to yourself why the other options are wrong."*

(The ONLY Video You Need to Pass the USMLE Step 1 in 2026; 10 Step 2 Score Killers; How to Boost Your USMLE Score Instantly; How to Guarantee a Step 1 Pass; UWorld: Overcoming 6 "Fails")

## 5.4 Cronología fisiopatológica (PC): el protocolo de 5 pasos

Reconstrucción lineal causa → efecto desde el estado basal hasta la presentación actual. Herramienta contra el **anclaje**: regla **"Trust, but verify"** — el System 1 lanza la hipótesis ("es un infarto") y la PC obliga al System 2 a comprobar que es **mecánicamente posible**.

**Los 5 pasos**: (1) estado basal sano → (2) factores de riesgo / exposiciones / mutaciones → (3) fisiopatología celular o tisular inicial → (4) disfunción orgánica macroscópica → (5) cómo esa disfunción altera **cada** signo vital, síntoma, laboratorio e imagen de la viñeta.

**Ejemplos literales**

- **RCA STEMI con bradicardia**: *"Patient born healthy with right-heart dominant coronary circulation → poor lifestyle factors/hypertension → unstable atheromatous plaques → rupture of RCA plaque during exertion → RCA STEMI → SA node dysfunction → bradycardia → CO↓ → MAP↓ → cerebral perfusion↓ → lightheadedness."*
- **Prolactinoma → hipopituitarismo**: *"Lactotroph neoplasia → anterior pituitary mass → compression of other anterior pituitary cells → ACTH/TSH/FSH/LH↓"*; *"ACTH↓ → cortisol↓ → hypoglycemia + eosinophilia"*; *"LH/FSH↓ → testosterone↓ → libido↓"*; *"TSH↓ → cold intolerance, fatigue."*
- **Cáncer de páncreas → TEP → síncope**: tabaquismo → mutación oncogénica → adenocarcinoma → factores procoagulantes (Trousseau) → estasis + daño endotelial → TVP → embolia → poscarga VD↑ → precarga VI↓ → GC↓ → PAM↓ → hipoperfusión cerebral → síncope + taquicardia refleja.

**Uso para descartar opciones**: cualquier opción que **viole la física o la velocidad temporal del cuerpo** se elimina (un ACV cortical unilateral no causa síncope inmediato porque no colapsa el SARA; una hipoperfusión global por arritmia o TEP sí).

**Caso 200 → 245 en 2 semanas** (Step 2, "four standard deviation improvement"): *"all she did was she made tons of PC cards in every single condition so that nothing confused her; she just knew how everything presented and why it presented that way."* El argumento: o "hope and pray" que el día del examen entiendas las oraciones bajo presión, o **procesar de antemano las presentaciones clásicas y su porqué para el 90% de las condiciones** — quien ya mapeó la cronología **lee más rápido y acierta más**.

(NBME Self Assessments: Guide to Reviewing Your USMLE Practice Test; How to Review UWorld…; Why "I'm a Bad Test Taker" Is Costing You 30+ USMLE Points)

## 5.5 Juez vs Abogado

**El Abogado** está entrenado para hallar *"even just the tiniest flaw in the opposing argument"* y tirar del hilo. El estudiante lo hace **con su propia respuesta correcta**: encuentra un detalle atípico (ruido deliberado), litiga contra sí mismo, **descarta la correcta por imperfecta** y elige por defecto la opción restante **aunque no tenga sentido fisiológico**, sin someterla al mismo escrutinio. Es la desviación que más puntos cuesta a los estancados en **220-230**. Origen: en secundaria y universidad, eliminar "por no perfecto" funcionaba.

**El Juez** decide por **preponderancia de la evidencia**; asume que el USMLE presenta casos imperfectos y ruidosos. Pregunta operativa: *"Between A and B, which would make more sense in the context?"* Frase: **"Choose the answer that feels better, not perfect."** *"There are no perfect answers because there's going to be some degree of noise."*

**Casos literales**

- **Klinefelter**: cariotipo + ginecomastia + todo lo clásico, salvo que el paciente **no era alto** (adolescente en pleno crecimiento). Pensó *"Klinefelter patients are supposed to be tall, so this can't be Klinefelter"* y eligió otra donde **nada más encajaba**. Balanza del juez: a favor **≈80% de la viñeta**; en contra, sólo la estatura.
- **Sepsis**: descartó una sepsis obvia porque las extremidades estaban **frías** (no calientes como en el libro) y eligió taponamiento, que no explicaba ni la fiebre ni el foco. Razonamiento del juez: *"Sepsis encaja con el 85-90% de la viñeta; la alternativa no explica nada más."*
- **Hannah** (Rowan, NJ): NBME congelado en **225** pese a estudiar con dedicación absoluta. En **una sesión de 20 min** Palmerton vio que "abogaba" contra cada opción no perfecta. Corregida sólo esa distorsión: **225 → 257 en 2 semanas sin aprender un solo hecho nuevo**. *"Do you think it's possible to get 32 points worth of random facts in two weeks? No."* (Otra alumna: **230 → 263** en 2 semanas.)

**Cuantificación**: *"this one shift can flip **2 to 5 questions per exam block**… literally the difference of **15 to 30 points** on your final score from something that doesn't change your knowledge at all."*

**Cómo detectar que estás abogando**: si te oyes decir *"me encanta la A, pero este detallito no cuadra, así que marco la B"*, **detente**. Aceptar la incertidumbre → forzar el rule-in → balanza de preponderancia lado a lado. Antídoto físico: los **Stress Sets** "suck the oxygen out of their ability to do that" (§7.3).

(“Bad Test-Taker” Is a Lie You Tell Yourself; How to Study So Fast…; The USMLE Mindset That Guarantees a 260+; How to Boost Your USMLE Score Instantly; Fixing USMLE Test-Day Mistakes: The STRESS Strategy)

## 5.6 "Atascado entre 2": Rule-In antes de Rule-Out

Quedarse atrapado entre dos finalistas es **síntoma de fallo procesal, no de conocimiento**. Literal: *"how often do you get stuck between two answer choices… you go back and forth for minutes and then you pick one and then you get it wrong and then you realize that your first instinct was actually correct… this can happen multiple times per block and each time it burns through not only your time but also your score and confidence."*

**Protocolo exacto**

1. **Rule In (≈10 s por opción)**: construir el mejor caso **a favor** de cada finalista. Preguntas literales: *"What condition would this be the correct treatment for?"* · *"What in the vignette would make this a reasonable answer?"* · *"Why did the question writer include this option? Who were they trying to fool with this answer choice?"*
2. **Ausencia de evidencia ≠ evidencia de ausencia**: ¿la descartas sólo porque el enunciado "no mencionó" un rasgo clásico (esputo verde en neumonía, estatura en Klinefelter)? La omisión es **deliberada del redactor**, no una contraindicación biológica.
3. **Rule Out con rigor biológico**: descartar sólo si hay un dato **positivo físicamente incompatible** (ferropenia con VCM 115; déficit de B12 con VCM 82).
4. **Cotejar con la SAQ**: ¿cuál responde con más precisión la pregunta biológica pura?
5. **Límite de 2 minutos**: pasados 120 s el cerebro "ve fantasmas" → elegir la de mayor preponderancia, **marcar (flag) y avanzar**.

**Ejemplo literal completo (TVP postoperatoria en profilaxis)**: mujer de 62 años, 3 días post-prótesis de rodilla, TVP confirmada bajo heparina profiláctica 5.000 U SC c/12 h. (A) continuar profilaxis · (B) heparina IV terapéutica o enoxaparina · (C) filtro de VCI.
— **A**: *rule in* = correcta para **prevenir** TVP en postoperado estable; *rule out* = ya hay trombo, la dosis profiláctica es insuficiente.
— **B**: *rule in* = tratamiento estándar de primera línea de la TVP aguda en paciente estable; *rule out* del abogado = *"Wait, she is already on heparin, giving more heparin sounds like doubling up"* → el juez reconoce que **la profilaxis falló** y toca dosis terapéutica.
— **C**: *rule in* = sólo con contraindicación absoluta a anticoagulación o fallo de la anticoagulación **terapéutica**; *rule out* = no hay ninguna de las dos. → **Respuesta: B.**

**Lo que nunca hacer**: *matchmaking* (conectar palabras sueltas de la opción con palabras sueltas de la viñeta sin cadena fisiológica) · **inventar historias secundarias** (*"tal vez tenía una autoinmune que no mencionaron"*) · **seguir la cadena de asociaciones de tu propia mente** en vez de la pregunta (caso "ascitis → SAAG → albúmina → amonio").

**Answer identity** (versión para quien se queda sin tiempo): en vez de "¿podría ser B? ¿podría ser C?" (*"you are smart and you can make connections in your head that don't exist"*), preguntar **"¿de qué condición es hallazgo clásico esta opción?"** y predecir qué dirá la explicación — *"every answer is the right answer for something"*.

(USMLE Test-Taking Tips: From "Stuck Between 2 Answers" to 260+; How to Score 260+ on USMLEs in 2026; 4 USMLE Fails. 3 Days. 1 Mental Switch.)

## 5.7 El hábito que destruye el score: leer la última línea primero

**Por qué arruina el score:**

1. **Ineficiencia de tiempo residual**: leer la última frase (~5 s) + las opciones (~10 s) y luego subir a leer todo = lectura fragmentada; **5-10 s por pregunta ≈ 3,3-6,5 min por bloque de 40 ≈ más de 4 preguntas completas**. Equivale a presentarte a 40 preguntas con tiempo para **36**. **Break-even**: harían falta ≥3 preguntas por bloque en que la última línea te ahorre la viñeta; en realidad ocurre **1-2 veces por bloque, a menudo 0**.
2. **Induce apuro y unforced errors**: sabiendo qué preguntan, la mente lee en piloto automático, escaneando, y **omite sistemáticamente un dato crítico**. Y las opciones *"contaminate your reasoning"*.
3. **Two-step reasoning**: paso 1 = diagnosticar desde la historia; paso 2 = pregunta conceptual sobre esa patología. Saber de antemano que preguntan "qué sube o baja" **no ayuda nada** al paso 1 → misma incertidumbre, menos tiempo, más sesgo.

**Ejemplos literales de fallo**: (a) **flechas** — última línea "¿qué cambios en RVS, PCWP y GC?"; el que la lee primero entra en pánico recordando la tabla, busca datos para justificar shock séptico y **pasa por alto en la 2.ª línea** "cáncer de páncreas activo + antecedente de TVP" → era **TEP masivo**; (b) **siguiente paso de manejo** — el estudiante ve "pancreatitis" y elige lo más agresivo sin ver, a mitad del texto, "hemodinámicamente estable, asintomático, tolera vía oral" → **falló por no calibrar la severidad**.

**El hábito correcto**: leer **lineal, lento y cronológico desde la primera palabra**, reordenando la historia en tiempo presente. *"You have enough time on the USMLE to read every question slowly once. You do NOT have enough time to read every question twice quickly."* Alec, **lector lento declarado**, termina con **5-10 min de sobra** por hacerlo así.

(The USMLE Question Reading Habit Destroying Your Score; Read the Last Line First on the USMLE? Here's Why You Shouldn't; Boost Your UWorld Score: Top 6 Mistakes)

## 5.8 First-order vs higher-order, y "study the question, not the answer"

- ***First-order***: factual, un paso; te nombran el diagnóstico y piden un dato (embarazada de 14 semanas que consume cocaína → ¿complicación más probable?).
- ***Higher-order***: varios pasos; describen la patología **imperfectamente y sin nombrarla** y piden ciencia básica. Ejemplo: recién nacida a término con hipotonía de miembros inferiores y masa eritematosa carnosa sin piel en la región lumbosacra → paso 1: deducir **mielomeningocele**; paso 2: **fallo de fusión de los pliegues neurales en el neuroporo caudal**.
- **"Study the question, not the answer"**: el promedio memoriza por qué la correcta es correcta; el método exige estudiar **la viñeta**: ¿por qué el redactor incluyó este antecedente? ¿qué variable fisiológica altera este laboratorio? ¿qué distractor plausible construye con esta pista? = "leer la mente del escritor".
- Ejemplo de "ver el concepto dentro de la pregunta": IAM → el memorizador duda entre heparina/aspirina/estreptoquinasa/clopidogrel; el experto ve **"rotura de placa → agregación plaquetaria"** y la pregunta real es **"¿cuál es antiplaquetario?"** (heparina, bivalirudina y warfarina actúan sobre factores solubles).

(STOP Doing This for 20+ Points; AMBOSS QBank for Step 1? 4 Criteria; The Secrets to Excelling in USMLE Step 1)

## 5.9 Otros desarmados fisiológicos del corpus (mismo método)

- **TEP masivo → ¿qué muestra el ecocardiograma?**: coágulo ocluye arterias pulmonares → RVP↑↑ → poscarga del VD↑ → el VD de pared delgada se **dilata** agudamente → **septo desviado a la izquierda** → precarga del VI↓. SAQ: *"What is the echocardiogram finding in right heart strain?"* (⚠ atribución **A VERIFICAR (08-sep)**: el ejemplo se conserva, pero no aparece en la transcripción del vídeo al que el cuaderno lo asignó).
- **Acetazolamida en mal de montaña**: bloqueo de anhidrasa carbónica proximal → se pierde HCO3⁻ → acidosis metabólica → hiperventilación compensadora → PCO2 alveolar↓ → más espacio para O2 en la ecuación del gas alveolar → alivia la hipoxia (Before you take your USMLE, watch this).
- **Shunt derecha-izquierda**: *"Why doesn't O2 correct hypoxemia in a right-to-left shunt?"* → la sangre desviada nunca contacta alvéolos ventilados (High Yield Respiratory).
- **Gradiente aórtico de 50 mmHg**: >40-50 = estenosis **severa** → el VI genera presiones inmensas → manejo agresivo si sintomático (Why You Know the Answer But Still Get It Wrong).

---

# 6. TAXONOMÍA DE ERRORES Y LOG

## 6.1 Las 3 categorías (no superpuestas) y su fix

| Categoría | Qué es | Ejemplo literal | Fix |
|---|---|---|---|
| **1. Knowledge gap** | No sabías el hecho o el principio | no saber que la digoxina compite con el K+ en la Na+/K+ ATPasa | **Sección completa de First Aid** (Whole Page Rule) + tarjeta de mecanismo |
| **2. Reasoning / Transfer gap** | Sabías la medicina y fallaste al aplicarla | descartar sepsis por ausencia de fiebre ignorando el shock distributivo | **Juez vs Abogado** + rule-in + desarmar la viñeta cronológicamente (PC) |
| **3. Unforced error (proceso)** | Sabías y podías aplicarlo, pero leíste rápido y omitiste un dato | no ver que pedían la variable que "disminuía"; confundir izquierdo/derecho | **Una sola lectura lineal y lenta**, asimilando cada palabra una vez |

Cita que fija la prioridad emocional: *"If I get a question wrong because I didn't know the topic, I'm ok with that. If I spend hours mastering something, only to get it wrong because I didn't read a word, my soul burns."*

**La regla del tercio (disparador de cambio de régimen)**: (1) ante cada fallo, no leas sólo la explicación; (2) pregúntate *"¿no tenía el dato, o lo tenía y leí mal?"*; (3) **si >1/3 (33%) de tus fallos son en temas que ya conoces, estudiar más horas BAJARÁ tu score** → suspende adquisición y entrena sólo lectura/interpretación.

(How to Review USMLE Questions for 20–30+ Points; 8 Signs That You're Studying Wrong; Why Studying Harder Is Making Your Scores WORSE; 10 Step 2 Score Killers)

## 6.2 El transfer gap desglosado (los 3 subtipos)

Fenómeno literal: *"Oh, wait, I knew most of the facts that they just said! I just didn't realize that that's what they meant."*

1. **Skills Gap** — tienes el "qué" pero no el "cómo". Ejemplos: entender la fisiopatología de la FV pero **no reconocerla en la tira de ritmo** (y el alumno, en vez de practicar tiras, "fue a First Aid y transcribió notas teóricas sobre FV que no resolvían su brecha"); saber precarga/poscarga pero no modelar vasos en serie/paralelo. **Fix: transfer cards** (§4.4).
2. **Noise Gap** — sabes la patología en ambiente limpio, pero un rasgo atípico secuestra el simpático. **Fix: compare & contrast cards** + juez.
3. **Consistency Gap** — conoces CCSN/SAQ/rule-in pero **no los ejecutas en el 100%** de las preguntas; bajo fatiga (simulacro de 9 h) el cerebro ahorra glucosa y vuelve al piloto automático. Regla de oro: **"Don't practice until you can get it right; practice until you can't get it wrong."** El score no sube resolviendo imposibles sino asegurando **~95% en fáciles y medias**.

**Dos causas añadidas**: el **Rx effect / atrofia interpretativa** (bancos memorísticos de primer orden acostumbran a escanear buzzwords — testimonio literal: *"My scores went down when I used USMLE-Rx. They went up when I stopped"*) y las **tarjetas generadas por IA con information leakage**.

(Why You Know the Answer But Still Get It Wrong; I Scored 258 on Step 1 in 6 Weeks; ChatGPT Flashcards)

## 6.3 La bitácora: qué se escribe exactamente

**Por cada pregunta (correcta o incorrecta)**:

1. **Causa raíz**: dominio conceptual / reconocimiento / error no forzado.
2. ¿Comprensión intuitiva o dato memorizado?
3. ¿Cómo disfrazó el redactor la presentación con **Contexto, Cronología o Severidad**?
4. La **SAQ** destilada.

**Qué se escribe (y nada más)**: la **SAQ** · la **PC en presente** (ej. *"Mujer de 25 a inicia ACO (hipercoagulabilidad) → 7 semanas después vuelo de 12 h (estasis) → TVP → el trombo se desprende y ocluye la arteria pulmonar → dolor torácico pleurítico agudo"*) · las **'why' cards**.

**Tiempos**: bloque de 10Q + revisión ≤60 min · incorrecta 10-15 min · correcta segura 30-60 s · 1 h por 100 repasos de Anki · deep dive 2-3 h máximo.

## 6.4 La hoja de micro-destrezas

Contar, por bloque, **cuántos fallos** hubo por cada una de estas causas y atacar cada categoría con su ejercicio:

- no identificar el **contexto**
- no ordenar la **cronología**
- no estimar la **severidad**
- no plantear la **SAQ**
- fallar el **rule-in / rule-out** (abogado)
- **"seeing ghosts"**: atribuir hallazgos que no están, por exceso de conocimiento (literal en sesión: *"I was reading stuff into the question"*)
- **espirales emocionales**
- **gap real de conocimiento**

Se mide y se **re-mide**. Recomendación adicional: **compartir la hoja con alguien** ("si no hago esto antes de X hora, te invito un café").

**Caso Jay**: sus fallos se concentraban en **3 micro-habilidades** (no reordenar la cronología, lagunas de fisiología de 1.º, eliminación de la correcta por perfeccionismo) → ejercicios diarios específicos → **percentil 3 → 92% (p97, ≈262) en 2 meses** con los **mismos recursos**.

(The USMLE Mindset That Guarantees a 260+; How to Boost Your USMLE Score Instantly; From Failure to 260+: Two USMLE Case Studies)

## 6.5 La shopping list, en detalle

Es la técnica que Palmerton considera el mayor ahorro de tiempo del método: **el 80% del tiempo de estudio típico va a material que no moverá el score** porque nos atrae lo familiar (menos amenazante). Anécdota propia: siendo químico de carrera dedicaba horas a minucia bioquímica "esotérica" **que sí notaba que no sabía**, mientras evitaba Derm o MSK "because it was so scary".

**Cómo se hace**: al terminar un bloque, recorrer **cada oración del enunciado** (también en las acertadas) preguntando *"¿qué me incomodó? ¿qué necesitaría saber para entender cada palabra?"* → auditoría "upstream" de conocimiento **y de destrezas**. Cada ítem es conocimiento, destreza o hábito, y **"each of those things is actually not that hard on its own"**. Un tema aterrador se convierte en **10-15 ítems manejables**; se estudian sólo esos.

**Caso Miriam**: entendía la amiloidosis cardíaca "en grande" y fallaba por **una proteína específica** de una variante; en **10 días** con shopping list su ranking salió del bottom 1% — *"she didn't learn more and she didn't spend more time studying"*.

**Caso Georgia** (analogía de los 15): si una pregunta exige 15 conocimientos o destrezas y te faltan 2, la fallas igual; y a veces faltan 13. En ambos casos el tiempo debe ir **a lo que te hará fallar también en el futuro**. Y las tarjetas deben apuntar **al motivo exacto** del fallo: si fallaste histopatología intestinal, no una tarjeta — **20 tarjetas de imagen** de las 20 histopatologías GI de First Aid: *"I would not miss a single histopath question again."* Su criterio de progreso: *"I want to see 80%'s in three blocks or two blocks as opposed to six or seven or eight or nine."*

(How to Study So Fast for the USMLE It Feels Like Cheating; She Went From Bottom 1% to Top 3% in 2 Months; How to Get More From Every Hour You Study)

---

# 7. TIMING Y ANSIEDAD

## 7.1 El presupuesto y la regla del 30% (2 minutos)

- Step 1: **40 Q / 60 min = 90 s por pregunta**. En bloques cortos (20 Q / 30 min) el ritmo es igual pero **el colchón se reduce a la mitad**: 4 min atascado destruye el bloque.
- **Regla del 30% extra = tope de 2 minutos** (90 s + ~30 s). Literal: *"you should never spend more than 30% extra time per question… set your phone timer for 2 minutes and then reset it for every new question that you do; if the timer ever goes off just guess and move on."*
- **El dato que la justifica**: *"in a block where someone got 80% of the questions correct, for all the questions that they spent more than 2 minutes on they got maybe 50%"* — el tiempo extra **no mejora la precisión** (⚠ una ronda del cuaderno decía "<40%" sin cita; usar **~50% vs 80%**, §11.4).
- 4-5 min en una pregunta es "pésimo negocio de puntos": *"You are stealing time away from the easy questions at the end of the block that you probably could be getting right."*
- Si al final del bloque sobra tiempo, **volver a las marcadas está bien**; lo prohibido es excederse **en la primera pasada**.

## 7.2 "The 2-Minute Fix": el problema real no es leer lento

- **Es la perseveración.** Alec: *"I'm objectively a slow reader but I never struggled with timing… in virtually every single case… it's about perseverating on hard questions."* El estudiante se topa con **3-5 preguntas difíciles** (casi siempre en la **primera mitad** del bloque), les dedica 3-5+ min y luego "sprinta" en la segunda mitad, fallando fáciles que sí sabía. Detrás suele haber una **amenaza de identidad** ("debo saber esto, es mi área").
- **Datos reales de una alumna** (artículo *USMLE Timing*): las preguntas en las que gastó **120+ s** estaban **significativamente por debajo del promedio del bloque**, y casi todas en la **primera mitad**; casi todas las que tuvo que apurar (**<70 s**) estaban en la **segunda mitad**.
- **Protocolo**: temporizador físico a **2 minutos exactos** por pregunta durante la práctica; objetivo = **desarrollar el sentido intrínseco de cuánto duran 2 minutos**; al sonar: **adivinar por instinto, flag, siguiente**, reiniciar. *"You may not get the question right, but at least you won't hurt yourself for future items."*
- **Matemática del valor esperado**: todas las preguntas valen 1 punto nominal, pero su valor esperado = probabilidad de acertarla (como el tiro de Shaq: dunk 1,3 pts/tiro vs media distancia 0,8). Supuesto conservador (20% difíciles al 20%, 60% medias al 50%, 20% fáciles al 80%): gastar 300 s + 120 s en dos difíciles reduce el resto de 90 a 60 s/Q; si eso sube 10% las difíciles y baja 5% las demás → **score esperado −4% ≈ 8 ítems ≈ 10-11 puntos de NBME**. *"By not moving past hard questions, your score may be 10+ points lower!"*
- **Por qué cuesta soltar**: **orgullo** ("¡pero esto lo SÉ!") y **falacia del costo hundido** ("ya invertí tanto que DEBO acertarla") — justo las de menor retorno esperado.
- **Casos**: **Jonathan** (R2 de anestesia en Israel) — el "tic-tac" lo devolvía a "modo escuela"; límite de 2 min + exposición desensibilizante. **Laura** (residente en Harvard, fellowship condicionado a aprobar Step 3) — cambiaba opciones sin parar, se quedaba sin tiempo y marcaba "C" en las últimas 5 de cada bloque; protocolo de 2 min + EMDR.

## 7.3 Leer despacio, y la velocidad como subproducto

- **Causa nº 1 de lentitud**: no dominaste el material la primera vez ("flapping tremor" no cobrará sentido el día del examen si no lo procesaste en el QBank). Analogía Pixar: **el render se hace ANTES de la sala de cine**.
- **Métrica útil**: contar **cuántas veces tuviste que releer** una pregunta en el bloque. La ansiedad acelera la lectura hasta el *"white-out to the screen"*.
- **Velocidad = subproducto de la precisión**: con CCSN automático el diagnóstico es evidente en la primera lectura y se responde en **<60 s**; evitar la "lectura circular" de 3-4 relecturas.
- **Acomodaciones** (1,25×, 1,5×, descanso extra): si hay condición legítima, pedirlas sin vergüenza; "sólo iguala el campo".

(USMLE Timing; What Basketball Can Teach You About USMLE Timing; The 2-Minute Fix for USMLE Timing Anxiety; 10 USMLE Study Strategies; USMLE Test Day Strategies)

## 7.4 Cambiar respuestas: la regla única

- Cifras: ⚠ **60-70%** de las veces que se cambia una respuesta al final del bloque se cambia una **correcta por incorrecta**; en otra ronda el cuaderno da "~50% de los fallos de los estancados son correctas que cambiaron". **Misma dirección: cambiar cuesta puntos.**
- **Kate**: reprobó Step 1 **por una sola pregunta**. Literal: *"I have a problem where I switch my answers from right to wrong. I know I switched 14 questions, and if any of those I had just left and not switched, it would have been a pass."*
- **Shelby** (Caribe, a 3 días de su 5.º y último intento): **50% de sus fallos** eran preguntas donde **sabía la correcta y la cambió** — *"it's almost like a trauma response"*.
- **Regla única**: cambiar **sólo** con evidencia factual/lógica **innegable** de error de lectura (una unidad mal leída, "infante de 5 meses y no adulto", un signo vital omitido). **Nunca por sensación de duda**: bajo presión el cerebro inventa explicaciones rebuscadas para fallar lo que ya había resuelto bien.
- **Prueba empírica** (UNC): en alumnos que rumian, los **stress sets** (sin tiempo para cambiar) dan **80-90-100%** frente a **60%** en bloques normales; y "the last 10 questions of a block" a veces salen **mejor** que las 30 primeras "because they're just not in their head". **El instinto entrenado acierta más que la rumiación.**

("I Just Need to Pass" Fails USMLE Retakes; The USMLE Panic Trap; 10 Step 2 Score Killers; Fixing USMLE Test-Day Mistakes: The STRESS Strategy)

## 7.5 Stress Sets (STS): el protocolo exacto

Origen: entrevista de Alec con el **Dr. Ben Shirley**, *medical education learning specialist* de la **University of North Carolina** (pass rate de Step 1 en UNC: **95%** frente a ≈91% nacional; su oficina interactúa con el **81-85%** del alumnado). **"STRESS" no es un acrónimo**: la transcripción completa nunca desglosa letras; el término del protocolo es **"stress set"**.

**Qué corrige**: no confiar en la intuición clínica, **rumiación**, *second-guessing*, cambiar correctas por incorrectas, quedarse atascado entre dos, no terminar bloques por rumiar. Frase: *"don't let rumination / second-guessing be the thief of points."*

**Protocolo (literal)**

1. **10 preguntas de UWorld en 12 minutos** (= **72 s/Q**, por debajo de los 90 reglamentarios): *"we want you to stress and not give yourself time to ruminate, change your answers, and just go with your gut."*
2. **Todas las mañanas al arrancar** la jornada.
3. **Criterios de entrada (los 3 del Dr. Shirley)**: (a) **contenido** — haber cubierto "the bulk of your systems review", **≥60%** del content review, "nothing is seeming too shocking"; *"if they did it early before they're feeling comfortable with the material it won't work"*; suele encajar en las **últimas 2-3 semanas**; (b) **rumiación / second-guessing**; (c) **timing** (no termina bloques por rumiar).
4. **Revisión**: *"do 10, look at your score, move on, do your 80, then review all of them all together"* — se mira el % bruto, **no** se revisan de inmediato; se revisan **junto con el resto del día**.
5. **Resultados típicos**: alumnos con **60%** habitual sacan **80, 90, "maybe 50 but then 100"** → "if they're trusting their gut they're not talking themselves out of points"; *"eventually the stress sets will build the confidence… and then they'll start seeing their UWorld scores go up."*
6. **Escalado**: "and then if you can, add 10 on that".

**Trucos físicos para simular pánico** (colega de Shirley): poner el temporizador en **12 min**; o **arrancar el bloque de UWorld y empezar en el minuto 3** — durante esos 3 min **no mirar la pantalla** (ir por un café, hacer jumping jacks) y volver con el reloj corriendo, obligado a sprintar bajo pánico simulado.

**Por qué funciona contra el abogado** (reacción de Alec): *"you just suck the oxygen out of their ability to [be the lawyer]."*

## 7.6 El Panic Trap: definición, síntomas y salida

**Definición**: secuestro amigdalino de un estudiante **bien preparado** (80%+ en bloques temáticos en casa) que **se queda en blanco**. No es conocimiento: es **hiperactividad del sistema nervioso**. Literal: *"adding content to a panicked brain does not reduce the panic… the fix is anxiety regulation work; desensitization, structured exposure… EMDR therapy."*

**Síntomas**: *zoning out* (los ojos leen, el cerebro no registra); mente acelerada al dudar entre dos; hiperfijación en un detalle inconsistente perdiendo el panorama; opresión torácica, taquicardia, manos sudorosas, dolor de estómago.

**Anxiety cascade**: fallar una → dudar de uno mismo → seguir pensando en la anterior → fallar varias seguidas ("statistically unlikely" salvo que el examen "gets in our heads"). Alec vio caer a alguien de **250s predichos → 190s reales**. **Las dos únicas causas de desplomes: pánico y burnout.**

**La salida, paso a paso**

1. **Worst-Case Scenario Planning** (antes y durante): *"…imagine what exactly the worst case scenario would be in detail and then imagine exactly what I would do in that scenario… worst case scenario I fail this test again… would it be the end of the world? No, because people do match after failing multiple times…"* Al darle forma y plan, el miedo pierde su carácter de amenaza indefinida.
2. **"Oh F#@& to OK" Speed Drill** (Mark Goulston, *Just Listen*) — 10-15 s:
   - **Reaction / affect labeling**: nombrar la emoción con crudeza (*"I can't believe I just bombed that UWorld block. I am terrified…"*). **NO huir** (email, vídeo, hablar con otros) en los primeros segundos. fMRI: etiquetar sube la actividad del lóbulo frontal y **calma la amígdala**.
   - **Release**: respiraciones largas y profundas por la nariz, ojos cerrados, hasta destensar músculos y cara.
   - **Recenter**: seguir respirando hasta la calma completa.
   - **Refocus / Validate**: plan de control de daños + validar (*"tiene todo el sentido que me sienta así; he sacrificado años"*); en la variante de vídeo, **felicitar al redactor**: *"good question, you got me"*.
   - **Reengage**: abrir los ojos y dar el primer paso. Frases: *"I feel anxious and I'm going to do this anyway."* · **"Honor your commitment, not your comfort."**
   - **Practicarlo ANTES de necesitarlo** hasta que sea reflejo.
3. **AVP — Acknowledge · Validate · Permit** (el "block recovery protocol"): **Acknowledge** = *"oh my gosh, I feel really really anxious right now"*; **Validate** = *"of course you feel anxious: this test is really important for your career, you've prepared really long for this and you get only one shot"*; **Permit** = separar sentimiento de respuesta: *"it's okay to have these feelings, but I'm going to focus on the question ahead and I choose to look at this more as a puzzle rather than a judge of my character."* Momento ideal: **entre bloques** (sit-in break); en pánico, **10 segundos dentro del bloque**. La misma AVP sirve contra la procrastinación al sentarse a estudiar.
4. **EMDR**: el pánico desproporcionado es una respuesta traumática aprendida ("mini-PTSD") de fracasos previos. Palmerton lo prescribe en dosis altas a repeat-takers: **1-1,5 h cada noche** (Kate, Govind) o **2 h/día** (Chris, Shelby) — ⚠ ambas cifras vienen de la consulta de cierre. *"We've seen people who have gotten 80s and then failed and then did EMDR and then they passed and that was the only thing that they changed."* Alec relata su propio EMDR (adopción a los 4 meses, bullying infantil) y dice que **le curó también el insomnio de conciliación**.
5. **Ecuación de la ansiedad**: **Ansiedad = Importancia de la tarea ÷ Control percibido**. Se baja **reduciendo la importancia existencial** (planes B viables) o **subiendo el control** (micro-habilidades entrenadas, locus interno).
6. **Desapego del resultado**: el predictor nº 1 de un desplome respecto a los simulacros es el **exceso de apego a la cifra**. Alec, presionado por su asesor de Stanford a 260-270, no rezó por un número sino por *"the score that would allow me to fulfill God's plan for me"* → mentalidad lúdica *"game on, let's do this"*.

**Hard-question mindset**: nadie saca perfecto en el USMLE ("I don't think I've ever heard of anyone"); dicho deportivo: *"the other side gets paid to play too"* — los redactores son expertos pagados para escribir preguntas difíciles; *"if it's hard, it's hard for everyone else; plus every question is just worth one point"*. Reencuadre entrenado: ver la pregunta difícil y decir **"Oh heck yeah, this is going to be a good one, game on"**. Y la matriz de confianza (2×2): confiar y acertar refuerza; **desconfiar y acertar es lo peor**, porque refuerza que no debes confiar en ti.

**La ciencia citada**

- Estudio retrospectivo (Washington University, St. Louis), coeficientes β estandarizados sobre el score de Step 1: Honours 0,347 · MCAT 0,28 · nº de MCQ 0,298 · nº de reviews de Anki 0,195 · **Test anxiety −0,326 (p<0,001)**. Literal: *"The positive benefits of NOT being anxious are as much as having a high MCAT score."*
- Meta-análisis: prevalencia global de ansiedad en estudiantes de medicina **33,8%** (Asia 35,2%; Medio Oriente 42,4%; resto 27,5%); población general 3-25%. Hipótesis: **no nombrar la ansiedad la empeora** ("I'm not anxious, I just can't sleep"). Anécdota de Alec: ataque de pánico con hiperventilación y parestesias en semana de finales tras meses llamándolo "on edge".
- **Dato NBME**: *"one in four students see their scores swing by 20 points or more from the practice tests on exam day"*; con buena estrategia de test day, alumnos de Alec han sacado **15+ puntos por encima** de lo predicho.

(The USMLE Panic Trap Costing You 30+ Points; Transform USMLE Panic to Productive Focus; Before you take your USMLE, watch this; USMLE Test Day Strategies; The USMLE Mindset That Guarantees a 260+; Med School Test Anxiety)

## 7.7 Ansiedad de fondo: "negative cognitions" y journaling

- Toda creencia descansa en una **asunción** imposible de probar; el sobre-logrador ve los 4 fallos y no los 96 aciertos, minimiza cada éxito ("fue excepción") y toma cada fallo como prueba. La **Big Insecurity** de la mayoría en medicina: *"I'm not good enough."*
- **Negative cognitions** típicas: *"I'm not a good standardized test-taker"* · *"I just don't know the answer"* (asume que no sabes suficiente).
- **Caso TC/tricúspide**: en un NBME le pedían identificar la válvula tricúspide en un TC y la alumna se fue a *"¿es fase arterial? siempre me confundo con los angio-TC…"* — sólo necesitaba **"el VD es la cámara más anterior"**, que sabía. **Asumir que no sabía le impidió recuperar lo que sabía.**
- **Caso Paget (el propio Alec)**: Stanford enseñó poco de hueso → inseguro en MSK → cada vez que dudaba asumía "no sé suficiente" (*"la fosfatasa alcalina parece algo alta… no debe ser"*) → fallaba casi todas las de hueso. Se arregló **dominando Paget Y desmontando la asunción**: aun tras cubrir el vacío, el rendimiento siguió mal hasta que gestionó la premisa.
- **Reparto asunción/realidad**: tras reprobar Step 1 → quizá 20% cognición / 80% brecha real; inseguro tras lograr el score soñado → 99% cognición / 1% realidad. La solución es **"and", no "either/or"**.
- **Journaling diario de 3 listas**: (1) qué me estresa exactamente hoy; (2) 3 cosas por las que estoy agradecido; (3) 3 cosas microscópicas que quiero mejorar hoy. La ansiedad puede costar **hasta 50 puntos** en un Step.
- **Mindfulness / body scan 30-60 min cada noche**: no es "concentrarse más" sino **notar antes que la mente vagó y traerla de vuelta**; cura la relectura de párrafos. Lo recomienda a todos sus alumnos.

(Med School Test Anxiety; Step 1 Study Plan: 10 Habits — hábitos 5 y 8; 10 USMLE Study Strategies — strategy #4)

---

# 8. TEST DAY Y LAS ÚLTIMAS 2 SEMANAS

Tesis literal: *"your test day strategy is more powerful than your last month of studying… one in four students see their scores swing by 20 points or more… some of my students have scored 15 or more points higher than their practice tests predicted."* (Anécdota: Alec **se quedó dormido durante el MCAT** por no haber preparado el día en sí.)

## 8.1 Las 8 estrategias de las últimas 1-2 semanas

1. **Principios generales > memorización**: patología es la mayor sección del Step 1 y, según un redactor del NBME, **el 50% de las preguntas de patología evalúan aplicación de principios generales**; en el score report, "foundational science principles / application" es **60-70%** del examen. Habrá preguntas "what the beep" ("no sabía que tenía que saber las causas de cardiopatía en ratas de Gambia") → *"peel back the layers to see what core concept they're testing you on"*.
2. **Break time optimization** (§8.4).
3. **Evaluar la preparación real con NBME** + construir **buffer** para especialidades competitivas (§9).
4. **Maratón de resistencia (overtraining)**: Step 1 = 8 h, Step 2 = 9 h — *"you've likely never had such an extended test before"*. Alec se construyó un simulacro de **9 h**, más largo que el real. **Fórmula favorita: UWSA (4×40) primero + NBME (4×50) después = 9 bloques / 360 Q**; como el UWSA **sobreestima** y el NBME se hace ya cansado, *"your NBME score is probably going to be on the lower end of its predictive value, which is good: would you rather be pleasantly or unpleasantly surprised?"* ⚠ Variantes: **NBME + 3-4 bloques de UWorld** (320-360 Q, ~8,5 h) y **Free 120 + 4 bloques de UWorld** con ≤60 min de descanso. Practicar **con los mismos snacks, ID y permiso**, "as if it's the real thing".
5. **Essentials del día**: dos identificaciones con foto que coincidan **exactamente** con el permiso; permiso impreso y digital; **proteína > carbohidratos simples**; **bolsas Ziploc etiquetadas "Break #1, #2…"** ("it's surprising how nice it is to… make no decisions"); **granos de espresso cubiertos de chocolate: ~10 mg de cafeína cada uno** (un café ≈100 mg) → titulable, sin *jitters* ni bajón, y **sin líquido = menos baños**; Alec (que no toma cafeína) comía **uno por descanso**.
6. **Revisión activa > pasiva**: nada de vídeos ni lectura pasiva; sólo QBank y NBME oficiales, incluido el Free 120. Si estás saturado, **compañero con fortalezas complementarias**. Alec cenaba cada noche con su madre (sin formación científica) y le explicaba los conceptos = **técnica Feynman**.
7. **Maximizar la práctica de preguntas**: *"ideally you're doing at least 80 to 100 questions per day, timed, mixed and not in tutor mode"*, tratando cada ítem como real, para entrenar el ***rapid context switching*** (⚠ "Before you take your USMLE" dice **20-40** mixtas/timed hasta el día del examen; el principio común es **mixed + timed + nada en tutor**, §11.4).
8. **Prometric Center preparation**: NASA entrenaba a los pilotos repitiendo la rutina de lanzamiento *"until they could do it in their sleep"* — **familiarity breeds calm**. Rendir el **Free 120 en el mismo Prometric**; registrarse **≥7 días hábiles antes**, idealmente mucho más.

Complemento del artículo "1-2 Weeks Before Your USMLE? Read This": (1) **¿estoy contento con mi score actual?** — es extremadamente inusual sacar en el real algo muy distinto a los NBME de las **últimas 2 semanas**; (2) **no repetir NBME ya hechos** (la memoria inconsciente infla el % y destruye la predicción); (3) **enfoque SAQ** al repasar fallos; (4) **las difíciles son ruido esperado**, no un fallo de tu preparación.

## 8.2 Free 120: protocolo completo

1. **The Test Center Advantage**: se puede rendir el Free 120 **en el mismo Prometric del examen real** ("USMLE computer-based testing practice session"). Costo **$75 EE.UU./Canadá · $155 internacional** (A VERIFICAR (08-sep) para Lima). Dura **hasta 3,5 h**, incluye **todas** las preguntas del Free 120 online y da **% inmediato**. Lo valioso no son las preguntas: es el **check-in real**, el trayecto matutino exacto, los baños, los descansos, las huellas. *"Every minute you save figuring out logistics is a minute that you can use for the actual exam."* Llevar **todo** lo que llevarás el día real para saber qué dejan pasar. ⚠ Desde que te registras hasta poder agendar pueden pasar **hasta 7 días**.
2. **The Perfect Timing Plan**: *sweet spot* = **1-2 semanas antes**. Para resistencia: el Free 120 son sólo **3 bloques de 40Q** (4 menos que los 7 del Step 1) → **añadir 4 bloques de UWorld** después, con **≤60 min de descanso total**. **No hay explicaciones** (todos los intentos de publicarlas han sido retirados) → sirve para el **proceso**, no para la teoría.
3. **The Real Question Strategy**: es **el examen oficial que más se actualiza** → la redacción más actual del NBME. Formato: los NBME de pago son 4×50; el Free 120 ya es **3×40**, como el examen real.
4. **The USMLE Tutorial Hack**: la interfaz es la del día real (misma navegación que UWorld, misma calculadora; **valores de laboratorio virtualmente idénticos** — el Free 120 añade sólo **lipasa** y **troponina**). El día del examen te dan **15 min** de tutorial; lo no usado **pasa al descanso** → leer el tutorial en casa, ir a la pestaña **media** para comprobar los auriculares y terminar → **60 min de descanso en vez de 45**.

Extras verificados: si **olvidas pulsar "take a break"** al salir, el sistema descuenta descanso automáticamente; el siguiente bloque **no arranca** hasta que pulses "start next block" (Alec tenía "la pesadilla" de volver y encontrar 10 min menos: no ocurre); **nunca intentar salir a mitad de bloque** — el reloj sigue y **puede reportarse como irregularidad**.

**Cómo revisar los fallos sin explicaciones**: tapar opciones y escribir a mano la **cronología fisiopatológica** completa, corroborando con Costanzo/Pathoma (procedencia **A VERIFICAR (08-sep)**, aunque es coherente con §5.4).

⚠ **El % del Free 120 no tiene tabla de pase en las fuentes**: las cifras 65/70% **no** están en la transcripción del vídeo. Usar la tabla NBME de §9.1 para decidir.

(Mastering the USMLE Free 120: Tips and Tricks for Success!; 1-2 Weeks Before Your USMLE? Read This; Final 1-2 Weeks Before USMLE: Top 8 Strategies)

## 8.3 Cierre de contenido: D-14 a D-1

- **Cesar preguntas nuevas y tarjetas nuevas 1-2 semanas antes**: el costo de oportunidad de aprender ultra-detalle nuevo es pésimo; **proteger y consolidar** lo que ya tienes. Tarjetas nuevas a **cero**; repasos limitados a **200-300/día** (A VERIFICAR (08-sep)).
- **No repetir NBME ya hechos** en el cierre.
- **D-2**: última sesión ligera de tarjetas maduras; nada nuevo; revisar brevemente las **flagged** de UWorld con los mejores esquemas e imágenes.
- **D-1**: **prohibido** hacer bloques o temas densos; **nada nuevo después de las 17:00**; sólo **Anki vencido** (idealmente adelantado — *"it's pretty depressing to have to come home after the USMLE and have to do your Anki cards"*); journaling, ejercicio, visualización/meditación; empacar ID + permiso + bolsas numeradas; dormir temprano. Melody: *"Get a massage, eat some chocolate cake, get some rest! Know that you did everything you could."*
- **Somníferos**: Alec usó **difenhidramina**; regla: **nunca un somnífero por primera vez la noche del examen** — probarlo semanas antes en una noche de simulación.
- **La noche antes (reset)**: anécdota literal — la víspera de su Step 1 abrió First Aid "to check how much I know", vio muchos hechos que no sabía y se fue poniendo ansioso; **cerró el libro, lo apartó** y se dijo *"the knowledge that I have is the knowledge that I have; the more important thing is my ability to apply it"* → durmió → **top 0,1%**.

## 8.4 El día del examen, bloque a bloque

**Estructura Step 1**: 7 bloques × 60 min × ~40 Q = **7 h de preguntas**; **45 min de descanso + 15 min de tutorial = 60 min** si se salta el tutorial; **~8 h totales**. Los descansos sólo **entre** bloques. Si terminas antes, el sobrante se suma al descanso. **Si agotas el descanso, el siguiente bloque arranca solo y pierdes tiempo de examen.**

**Los 3 principios de los descansos**: (1) **el descanso vale más tarde** ("most people will be more tired at the end"); (2) **el check-in/out es impredecible** — un amigo de Alec planeó un descanso de **~7 min** y el escáner de huellas falló: tardó **~30 min** y "completely threw off his rhythm for the rest of the day"; (3) **"sit-in breaks"**: pulsar "take a break" pero **quedarse en la silla**, sin check-out, unos minutos para recomponerse.

**Plan literal de Alec para Step 1**:

| Momento | Acción |
|---|---|
| Tutorial | comprobar auriculares en la pestaña media y terminar → **+15 min de descanso** |
| Bloques **1 y 2 seguidos** | sit-in de 2-3 min entre ambos si hace falta ("running on adrenaline") |
| → | **descanso 10 min fuera** (snack de la bolsa #1; 1-2 granos de espresso si hace falta) |
| Bloques **3 y 4 seguidos** | → **descanso 10 min** (al llegar al 5 sólo has usado ~la mitad del descanso) |
| Bloque **5** | → **almuerzo 20-30 min** |
| Bloque **6** | → **descanso 10 min** |
| Bloque **7** | fin |

(Step 2 CK, 8 bloques con los mismos 60 min: 1-2 → 10 min → 3-4 → 10 min → 5 → 10 min → 6 → almuerzo ~20 min → 7 → 10 min → 8.)

**La mañana**: desayuno **alto en proteína y grasa** (huevos, aguacate, nueces), sin carbohidratos simples (para no crashear en el bloque 2-3); permiso e IDs listos desde la noche anterior; snacks en bolsas numeradas. *"The time to quit one's coffee habit would NOT be the day before your USMLE."* (⚠ El **warm-up de 5-10 preguntas** antes de entrar y el dato de "30-50% más unforced errors en los bloques 1-2 por entrar frío" **no aparecen en la transcripción** del vídeo → **A VERIFICAR (08-sep)**; lo mismo para "llegar 30-45 min antes" y "no hablar con otros examinados".)

**Entre bloques — block recovery protocol**: al pulsar "finalizar bloque", esas 40 preguntas **dejan de existir**; sit-in de 2-3 min con **AVP** o respiración; en pánico, **10 s dentro del bloque** con el drill "Oh F#@& to OK". **NUNCA revisar preguntas ni abrir First Aid en el casillero durante los descansos**: descubrir un fallo tonto dispara la espiral de los bloques siguientes. **Post-test: premiarte** para cerrar el ciclo.

**Prohibición absoluta**: *"you should never ever try to leave during blocks"* — el reloj no se detiene y puede reportarse como irregularidad.

(USMLE Test Day Strategies: Step 1 + 2, Shelf; USMLE Break Time Strategy for Test Day; What Should I Bring to My USMLE at Prometric?; Final 1-2 Weeks: Top 8; Mastering the USMLE Free 120)

## 8.5 Y la nota del propio Shirley sobre los nerviosos

**Los más nerviosos suelen ser los que mejores simulacros tienen** (260-270): validar que es normal, recordarles todos sus data points y **"execute your system"**; muchos sacan **5-10 puntos más** en el real por el "momentum" (ej. 245-250-255 en práctica → **262** real). Diagnóstico de la ansiedad en 3 tiempos: (1) ¿estás preparado? (data points); (2) ¿qué pasa **literalmente** durante el examen? — con la herramienta de *insights* de UWorld/NBME, bloque por bloque: a menudo "I struggle in block two" y **el bloque 2 fue el mejor** (la sensación de estar adivinando **no es** rendimiento); (3) ¿qué harás post-test?

(Fixing USMLE Test-Day Mistakes: The STRESS Strategy)

---

# 9. PLANIFICACIÓN, NBME, CRITERIO DE FECHA, RETAKES, IMG

## 9.1 Umbrales de seguridad del NBME (el criterio EXACTO para presentarse)

| NBME (% equated) | Probabilidad de aprobar Step 1 | Lectura de Palmerton |
|---|---|---|
| **≥ 60%** | ≈ **87%** | zona de riesgo residual (1 de cada 8 falla) |
| **≥ 65%** | ≈ **95%** | **métrica mínima de seguridad** |
| **≥ 70%** | ≈ **99%** | objetivo ideal / "consistentemente" |

Cifras publicadas idénticas en tres sitios; nota del artículo: "estimates based on large samples of predicted chances of passing across more than 100 individual datapoints" (Step 1 Fail: A Blessing in Disguise?; Failing Step 1? Here's How to Score 90%+; Fail Step 1? How to Score 90%+ on Next Attempt).

**Directiva**: si no estás **de forma consistente ≥65% (idealmente ≥70%)**, presentarse es irresponsable; nadie debe rendir "basándose en la esperanza de tener un buen día en Prometric". Literal del artículo: *"If your practice test scores are below passing, don't take your test."*

**El patrón de los que reprueban** (literal): *"Whenever I meet a student who failed a USMLE by more than 10 points, I ask them what their practice test scores were. In every case, their practice test scores predicted they would fail."* Las razones que dan: (a) su escuela los obligó ("shame on them"), (b) "hoping to have a good day", (c) un plazo autoimpuesto.

**Precisión de la predicción**: un NBME en la semana previa acierta a **±13 puntos en 2/3 de los casos** (Step 1; ±15 en Step 2 CK); en la experiencia de Alec **es raro ver el real a más de 5-10 puntos de los dos últimos NBME**. Datos que la NBME dejó de publicar: probabilidad de que el real sea **≥20 puntos MÁS ALTO** que el último NBME: **7% (Step 1) vs 23% (Step 2 CK)**; **≥11 puntos MÁS BAJO**: 9% / 8%. **Para Step 1 la predicción es ajustada** — por eso los umbrales 65/70% funcionan. Probabilidad de igualar o superar el último NBME: **68% (Step 1) / 77% (Step 2 CK)**. Y el dato NBME de la oscilación: **1 de cada 4 estudiantes** ve variaciones de **±20 puntos** el día del examen.

**Umbrales de pase seguro por forma** (NBME Practice Exams: Newest Changes; NBME Self Assessments: Ultimate Guide): Forma **25: 64%** · **26: 64%** · **27: 65%** · **28: 63%** · **29: 64%** · **30: 65%** (la más difícil de la serie). ⚠ El cuaderno describe **las formas 25-30**; si existe una forma 31 no la describe → **A VERIFICAR (08-sep)** en MyNBME qué formas están activas.

**Nunca NBME pirateados ni repetidos**: el valor de un NBME es su **curva de conversión por forma** (fallar 23 en la Forma 26 ≈ 250; en la Forma 30 ≈ 250 fallando 24, por ser más difícil); el cálculo "a mano" arruina la predicción, y repetir uno ya hecho infla el % por memoria inconsciente. **Cuál primero**: siempre **el número activo más bajo** (la NBME retira las formas en orden cronológico).

**UWSA sobreestima sistemáticamente** el score real, verificado "por más de una década": tras meses en UWorld te habitúas al estilo y vocabulario de sus autores (*author bias*) y el UWSA (mismos autores) infla el rendimiento — cifra de la consulta de cierre: **10-15+ puntos**. Uso inteligente: **UWSA primero y NBME después** en la maratón (§8.1).

**Consecuencia registral de un fallo**: queda "on your record. Forever." **≈1/3 de los directores de programa dicen que "never" considerarían a alguien con un fallo en Step 1 y ≈60% "seldom"**; los programas rechazan ≈50% de las solicitudes por filtros automáticos. Contexto: fail rate de Step 1 **8% (2020) → 18% (2022) → 21% (2023)**; desde julio-2021 el máximo de intentos por Step bajó de 6 a **4**.

**Cadencia de NBME**: baseline al inicio → luego cada **1-2 semanas** (Ultimate Guide, Melody) ⚠ vs **2-3 semanas** (remediación) ⚠ vs **2-4 semanas** (consulta de cierre). **Rango operativo: cada 1-4 semanas, más frecuente cuanto más cerca del examen**; menos de 2 semanas es inútil porque el cerebro necesita ≥14 días para traducir asimilación en puntos.

**Cómo leerlos**: por **sistema**, no sólo el número global — *"if I study something, can I make my score go up in that and make sure it stays high when I study the next thing?"* Con cautela: hay tan pocas preguntas por materia que **los intervalos de confianza por materia son enormes**.

## 9.2 El Day-After Protocol (medio día, ~4 h)

1. **Trayectoria (15 min)**: curva del score/% frente a los simulacros previos; ¿subieron los sistemas estudiados en las últimas 2 semanas?
2. **Auditoría de honestidad (15 min), por escrito**: *"If I continue to do the same thing I've been doing for the past 2 weeks for the next 6 months, what would my results look like?"*
3. **Triaje de errores (1 h)**: Knowledge Gaps vs QI Errors (interpretación/toma de examen), típicamente **50/50**; ¿abogado o juez?
4. **Drill de cronología fisiopatológica (2,5 h)**: **10 preguntas falladas** (las más largas y con más labs) **reescritas a mano** en orden cronológico estricto y en tiempo presente, deduciendo cómo la lesión primaria lleva a cada hallazgo.

**Regla de oro**: *"no dediques el 70% de tu semana a repasar cada explicación del NBME"* — el NBME escribe **los mejores enunciados y las peores explicaciones del mercado**; úsalo como **mapa de diagnóstico** y rellena con UWorld/Anki activos. Cuando la forma no trae explicaciones: **PC manuscrita + Costanzo/Pathoma**.

(NBME Self Assessments: Guide to Reviewing Your USMLE Practice Test; NBME Self Assessments: Ultimate Guide)

## 9.3 Cuánto se puede subir: la regla del 5% mensual

Con estudio **full-time, eficiente y orientado a maestría**: **+5% de NBME por mes** (Step 1) y **+10 puntos por mes** (Step 2 CK). Ejemplos literales de cálculo: *"if I'm at a 45% on step one and I want to get to... probably 70% to be safe I should probably give myself about 5 months"*; *"Let's say that you scored 55% on your NBME and you need at least 70%, I would plan on having at least 3 months of dedicated focused study."* Para 4 semanas: *"Realistically I like to aim for about 10 points… if I can just get 10 points in the next four weeks I would be happy."*

**Tabla de tiempo mínimo según baseline** (idéntica en artículo y vídeo):

| Baseline NBME | Tiempo full-time | Diagnóstico implícito |
|---|---|---|
| **≤ 50%** | **4-6 meses** | "deep re-think of the approach… a lot that you 'know' without truly understanding it. Memorization will be rampant" |
| **50-60%** | **2-4 meses** | "still dealing with memorization, rushing, anxiety, and/or burnout… specific areas you feel stronger on… springboard" |
| **> 60%** | **1-2 meses** | "HOW you get ready will be critical" |

¿Se puede subir más rápido? Sí, sobre todo si hiciste pocas preguntas antes ("low hanging fruit"); pero para quien ya estudió lo suficiente como para intentarlo una vez, *"most of the easy points have been taken… we wouldn't bet our next Step 1 attempt on our ability to do so."* Caso **Rosa**: falló, transformó su método y subió **28 puntos (~14%)** varios meses después.

**Aviso contra la compresión**: querer 40 puntos en 4 semanas produce una comprensión tan superficial que *"you're going to have to go back and redo it all again... from ground zero"*. **Parábola del maestro espadachín**: "¿cuánto tardaré en ser maestro?" — "10 años" — "¿y si entreno el doble?" — **"15 años… porque cuando tienes prisa cometes errores, tu técnica es deficiente y rehaces el trabajo."**

## 9.4 El escenario "Goldilocks" y el ciclo 1+1+1 ≠ 3

- Ni **demasiado lejos** (2 años → se pierde la urgencia, "people just stop studying, we've seen that happen") ni **demasiado cerca** (2 semanas → "you just feel overwhelmed... everything you do feels like 'Oh man I suck'"). **La fecha se decide por la puntuación objetivo**, no por permisos de Prometric ni plazos de la escuela.
- **"Knowledge gaps are not fixed in two weeks. You can't learn two years of medicine in two weeks."**
- Señal inequívoca de prisa: el calendario "1 mes de cramming → no listo → +1 mes → no listo → +1 mes". **"1 month + 1 month + 1 month ≠ 3 months studying planned in advance."**
- **"Presión productiva"**: lo bastante lejos para no recortar esquinas, lo bastante cerca para no procrastinar.
- **La trampa del permiso** (literal): *"my permit is going to expire, I've already extended by 3 months… I'm going to have to reregister and pay almost $1,000… I might as well just take my test and see how I do"* — *"some of the most tragic experiences"* son los que querían neurocirugía, derma, plástica u orto, rindieron sin estar listos y reprobaron. **"Just because my permit is expiring does not mean that I should take my test."**
- **Las 3 preguntas antes de fijar la fecha**: (1) ¿cuán importante es alcanzar mi meta? (competitivas: ≥250, idealmente 260+); (2) ¿qué score sería satisfactorio? (tablas NRMP); (3) ¿cuál es la fecha más tardía realista?
- **Mecánica para aplazar**: reprogramar en Prometric dentro del periodo de elegibilidad de 3 meses; **extender la elegibilidad una sola vez**, al trimestre adyacente, **$70**; si aún no, re-aplicar pagando de nuevo.
- Mindset: *"People either choose the deadline or they choose the score. Those who choose the score... do whatever it takes... and always score better."* Y: **>1/3 de su clase de Stanford aplazó**.

## 9.5 Validación en 24-48 h como criterio de PLANIFICACIÓN

El error de planificación más caro: **esperar al NBME (semanas) para saber si el método funciona** — *"it's like hitting a tennis ball and not knowing where it went"*. Literal: *"People will study for 30 days and then only after 30 days will they take an NBME and they realize 'Oh my god the way that I just studied for 30 days was not that good.' They feel crushed and then they end up repeating it."*

Y la métrica que lo sustituye: *"I would study a subject today and... get that subject to 80% today. If I can't, I know that something is wrong with my method... That's the entire task in one day"*; **"in the first 48 hours are you able to dramatically improve the score in the thing that you're studying — it's the biggest behavioral difference between people who turn it around and people who don't."**

El miedo detrás de aplazar el NBME: *"what if I check today and I find out that I really am as bad as I am worried that I am... **the score exists whether you look at it or not**."*

Regla de proyección: *"if the best that you can do when you study a topic is 50%, I can tell you right now even if you continue studying that way for a year or two or three years you're probably never going to get"* al objetivo.

## 9.6 Caso completo de planificación: Jamie (48% NBME)

**Situación**: 3.º año, aspira a radiología diagnóstica; **48%** en NBME (<percentil 1); reprobó el shelf de OB/GYN, pasó raspando neurología; leave of absence; "my goal is just to pass step one confidently".

**Diagnóstico — síntomas vs causa**: "pierdo confianza / me cuesta el Anki / no tengo tiempo" son **síntomas** de una causa más profunda: **"I am not seeing good results when I study"**. Cada sesión sin resultados refuerza "I'm just not good enough" → círculo vicioso: mal método → malos resultados → procrastinación productiva ("I should go clean my desk") → evitar la situación que recuerda lo lejos que está la meta. Su conocimiento estaba **plano**: un año estudiando con prisa, "most of the things that we learned we forgot".

**Decisión: aplazar de inmediato.** Razones: (a) 48% está por debajo del bottom 1% y radiología exige "at least in the 250s ideally 260s"; (b) **"step one is the single best predictor of your step two score"** — pasar raspando casi garantiza un Step 2 bajo; (c) *"your goal is not just to pass, your goal is to crush it"*.

**Plan concreto**: (1) **usar las rotaciones como vehículo** (neuro y psiquiatría en neuro-psych; GI/renal/cardio/pulmón en cirugía; "bugs and drugs" en medicina interna); (2) **2 h diarias, pero ANTES del hospital** — *"most people make the mistake of trying to study two hours after they come home which is just impossible"*; *"It's hard to go to bed at 7:30 and wake up at 3:30... but it's also very hard after 14 hours in the OR to come home and study for two hours. **Just choose your hard**"*; (3) **eliminar la opción de procrastinar** (Freedom); (4) **meta atómica**: *"you just have to make sure that you get really really good at coronary artery disease today"*; (5) **frontload + validación el mismo día**; (6) **métrica única**: *"I care that you know how to do a topic in a day: in three or four subtopic blocks (3-5 questions each) you can get to 80% within those two to four blocks"*; (7) cierre: *"it doesn't matter where you start, what matters is your trajectory and where you end."*

## 9.7 Variantes según la duración disponible

| Duración | Diseño |
|---|---|
| **4-5 semanas** | peligro de First Aid superficial con 80-100 Q/día; con baseline bajo, **postergar**: los que pospusieron subieron **+23,5 puntos de media** |
| **6-8 semanas ("Unorthodox Schedule")** | Semana 1 = sistema más débil (Cardio) · 2 = segundo · 3 = tercero + **NBME** al final de la semana 3; semanas 4-6 = **sólo bloques mixtos timed** + **3 temas microscópicos/día** para errores remanentes; 5-7 días ultraprofundos por sistema débil |
| **3-4 meses** | **1-2 semanas por sistema** de First Aid (100% de tarjetas nuevas y preguntas de ese sistema; 80% antes de avanzar); últimos **20-30 días** = Fase 5 (40Q mixtas timed) |
| **Retake** | **1 mes por cada 5%** (tabla §9.3) |

**El plan de 65 días de Melody** (útil como esqueleto): D2 **NBME** + revisión → D1-14 **un sistema débil por día** rotando de más débil a menos débil (mañana: mini-bloques de **10-25 Q** del sistema con foco en técnica + revisión hasta entender el concepto + Anki de lo clave; tarde: mixtos o seguir con el débil) → **D15 NBME** (si lo débil no mejora, "time to reassess your strategy… no shame in getting tutoring") → D17-29 débil en AM, mixto en PM → **~D30 UWSA1** → D32-49+ **bloques completos timed** → entre **D50-58 NBME + UWSA2 seguidos** (simulación de longitud real; anotar cuándo se fatiga el cerebro y qué descansos conviene hacer sentada vs saliendo) → última(s) semana(s) bloques completos timed mixtos → **D64** Anki/high-yield ligero, algo relajante, empacar → **D65 examen**.

## 9.8 Retakes

**Plan completo tras un fallo** (meta declarada: no sólo pasar, sino 90%+/260+):

1. **Procesar la catástrofe — affect labeling**: permitir el duelo; nombrar explícitamente miedo, ira, desilusión, vergüenza ("naming your feelings… shown to reduce amygdala activity"). Testimonio literal: *"failing step one was like the worst possible moment of my life, however it was also the best part of my medical career because it gave me the opportunity to really deal with issues… that I had just kind of swept under the rug."*
2. **Notificar a la administración de la facultad** (clerkships, graduación, remediación, NBME gratuitos).
3. **NBME oficial de inmediato (baseline)**: es normal que salga por debajo del score con que reprobaste; sirve para responder la única pregunta que importa (§9.5) y para **seguimiento por materia**.
4. **Tiempo suficiente, sin prisa**: 1 mes por cada 5%. *"Rushing usually leads to repeated failures."*
5. **Reconstruir el método**: fallar es la prueba de que el anterior no servía → **Feynman + 80% Mastery Method + Whole Page Rule + Anki con FSRS**.
6. **Bloques mezclados cronometrados** sólo cuando los subtemas están dominados, últimas 2-4 semanas.
7. **Agendar por datos**: NBME ≥65% (95%) / ≥70% (99%). Dos razones para esperar: el límite de **4 intentos** y "showing residency programs that you've transformed your approach".

**Datos duros del Match tras un fallo**: estudio a 10 años, **99% de los USMD que fallaron Step 1 entraron a residencia o práctica en 6 años**; estudio de una sola escuela: **92% hicieron Match**. *"Your residency chances will be impacted, but they're not devastated. The critical factor is how you perform on your retake."*

**La mentalidad "I just need to pass" es la causa nº1 de fallo en retakes.** *"Students who say it are the ones most likely to miss it again."* Mecanismo: *"when people make mistakes when they're close to their test, it's oftentimes because they start cutting corners… people start cutting corners when they know that they don't have enough time"*; y *"the people that are like 'if I needed, I could take a year' usually take the least amount of time to study, whereas the people that are like 'just give me one more point' either fail or they take more time."* Apuntar al umbral (bottom 3% histórico ≈196) te deja en "maybe 20% chance that they fail"; y quien pasa raspando **rinde peor** en clerkships y Step 2 por el solapamiento.

**Prescripción concreta a Kate** (2 semanas antes del retake): (1) **extender el plazo** — *"don't give yourself an artificial deadline… I promise that clerkship shelf scores everything else will become better"*; (2) **50 tarjetas/día** propias sobre el subtema — *"the more cards you make on a topic and the better cards... the faster you're going to get to mastery... more arrows at a target"*; (3) **PC cards siempre que falles por no reconocer el diagnóstico** — *"if you ever get a question wrong because you miss the diagnosis the answer is always make a PC card"* (analogía del voleibol: correr en el gimnasio —leer First Aid— no te hace jugar voleibol); (4) **self-EMDR ≥1-1,5 h cada noche**; (5) **tres palancas, cada una suficiente por sí sola**: no cambiar respuestas · 50+ tarjetas por subtema amplio con 80% en un día · más información estilo First Aid; (6) **criterio de validación**: *"when you study does your score go up immediately… can you get 80% in a day?"*; (7) el **"15-minute audit"** ("cada 15 minutos intentaba hacer algo") fue lo que "finally got me going".

**Contra-caso**: el estudiante que falló por ~1 punto y dijo *"if I need to take a year, I'll take a year… I don't want to pass, I want to crush it"* → **92% en NBME en 2 meses**, aprobó, Match en urología.

**Cuando no hay tiempo (Shelby, 4 fallos, 3 días)**: honestidad brutal — *"getting a 16-point improvement in three days is probably not gonna [happen]… you're not going to get 20 points worth of knowledge in three days."* Lo que **SÍ** puede cambiar en 3 días: (a) burnout, (b) algo de ansiedad/pánico, (c) **el problema abogado/juez** — *"if I had to put my money on the thing that would give you the greatest chance of increasing your score quickly... it would be just massive amounts of EMDR until your test"*; **"instead of one hour every other week you should do it two hours a day… if it works don't do it a little bit, just do it massive amounts."** ⚠ **El desenlace de Shelby NO está en las fuentes**: queda registrado como caso de "qué se puede cambiar en 72 h", **no** como caso de éxito.

**Tanya** (el caso extremo): caribeña, falló Step 1 **4 veces** (máximo legal), tuvo que **peticionar a una junta médica estatal** para un 5.º intento; había tomado "literalmente todos los cursos" y cada vez le decían "estudia más duro". Con el **80% mastery method + tarjetas de principios**: *"something clicked, almost right away… not in a month but literally in a day suddenly didn't feel like suffering anymore"* → **277 en practice test (top 0,1%)**, aprobó y **luego escribió contenidos para First Aid**.

(Fail Step 1? How to Score 90%+; Failing Step 1? Here's How to Score 90%+ on Your Retake; The USMLE Plan to Pass a Retake and Match; "I Just Need to Pass" Fails USMLE Retakes; 4 USMLE Fails. 3 Days. 1 Mental Switch.; Why Studying Harder Is Making Your Scores WORSE)

## 9.9 Aprobar los NBME y fallar el real: el caso Chris (IMG neurocirujano)

**Perfil**: se formó en Guatemala, residencia de neurocirugía en Alemania, attending en un hospital universitario alemán desde 2017. **"I sadly failed the step one three times already"** — y antes del 3.er intento tenía **NBME 73% y 66%** (ambos con >95% de probabilidad de pasar) e incluso **80% en un NBME sin usar**.

**Por qué falló pese a los NBME**: *"what that implies is that you may have underperformed on test day"*; con el 4.º y último intento en juego, la ansiedad se dispara. Presión "redentora" (Step 1 como "the redemptive thing") → pérdida de concentración, sobre-análisis, dudar de aciertos, **cambiar respuestas correctas**. Corroboración independiente: *"we've worked with a number of students who could score in the top 10 or 20% on their exams but then they would fail… just because they panicked on test day. In those situations your score is not a reflection of how much you know, it's literally a reflection on how you were feeling on the exam."*

**Sus señales de alarma (checklist de autodetección)**: (1) lectura en piloto automático por fatiga y "mentalidad de experto" — *"I believe I understand everything but I missed a word and because I missed a word I get the whole question wrong"*; (2) **mito del volumen** (terminar UWorld ≠ aprobar); (3) falsa confianza tras oír que el método era malo, **sin reconstruirlo de raíz**; (4) estudiar en medio de una **mudanza internacional**; (5) pedir "más consistencia / gestión del tiempo / organización" cuando la causa es el **sistema de estudio**; (6) **vivir el feedback como insulto** — *"thin skin is expensive"*.

**Prescripción**: **regular el sistema nervioso antes que estudiar más medicina** (EMDR masivo), **answer identity** (juez, no abogado), reencuadrar cada viñeta como principio, y una estrategia radical: **considerar rendir Step 2 CK primero** — *"the higher stakes test is step one because you only get one more attempt… it just like step two then kind of becomes like a practice for step one."* ⚠ **El desenlace de Chris NO está en las fuentes.**

## 9.10 IMG: errores típicos y lecciones específicas

- **Parsear micro-detalles** por formación memorística → conducta de abogado que descarta la correcta ("IMGs do this a lot because you're used to parsing out small details every time something felt a little off").
- **Ciencias básicas lejanas o débiles** (inmuno, bioquímica, micro molecular) → dolor y procrastinación → tentación de hacer Step 2 primero.
- **Peor tasa de fallo y promedio** que los USMD → Step 1 puede servir como **zona de entrenamiento de bajo riesgo** (en la era pass/fail) antes del Step 2 que sí puntúa.
- **Cambio de sistema educativo**: Miriam *"had gone from being one of the best students to now really struggling… and so she carried that belief for 5 years."*
- **Visa**: "it's much more difficult to get residency because the residency has to sponsor a visa".
- **Cómo lo ven los PD** (literal): *"if you fail your test beforehand or if you get a low score your chances of passing step three or your board exams afterwards are a lot lower… of the hundred people that are going to have problems in the next 10 years in our program a large majority are going to be people that have failed or struggled in their test beforehand."*
- **Calendario comprimido** Step 1 + Step 2 por la fecha del Match → tratarlo como **un solo estudio**.
- **Cutting corners** cuando el plazo no alcanza: *"cutting corners is what kills people."*
- **Compresión de expectativas** (Military Mom): *"we generally tell people expect about a 10 point improvement per month but you're looking for like a 30 point improvement per month… the risk is you make an even smaller jump because you're trying to cram so much."*

## 9.11 Step 1 vs Step 2 primero (era pass/fail)

- **Razones para Step 2 primero**: es el examen que **puntúa** (encuestas de PD citadas: 89,7% de ortopedia y 69,6% de IM creen que Step 1 perderá importancia; 86% de PD de dermatología aumentarán el énfasis en Step 2 CK; 87,8% de PD de IM dicen que será más importante); el **contexto clínico** ayuda con lo experimental de Step 1; y la **familiaridad** (IMG, graduados hace años, médicos en ejercicio).
- **Razones para Step 1 primero**: **training zone de bajo riesgo** para cometer los errores tácticos donde no afectan el 3 dígitos; **frescura** de las ciencias básicas; **solapamiento** ("the knowledge on step one actually isn't all that different than the knowledge on step two"; **Step 1 es de los mejores predictores del Step 2 CK "in every study I've seen"**, y el mejor modelo con 3 shelf explica el **67-69%** de la varianza).
- **Recomendación definitiva**: *"I don't think that the order matters as much as people think, what really matters is going to be the skills that you develop"* → **estudiar para ambos**: (1) Step 1 primero aprendiendo **conceptos fundamentales** (edema, inflamación, "likes dissolve likes", diferenciales de presión); (2) **Anki riguroso** ("fill the bucket and fix the leaks"); (3) **NBME periódicos**; (4) rendir Step 1 cuando estés **cómodamente ≥65%**.
- *"All overnight success takes about 10 years"*: el dedicated puede ser 1-2 meses, pero lo que decide son los meses o años previos de maestría.

## 9.12 Burnout: protocolo de emergencia

**Síntomas**: releer el mismo párrafo sin comprender, irritabilidad extrema, indiferencia o desprecio por el examen; descansos de 5 min que se vuelven de 1 h. **Test burnout vs depresión**: *"If your deepest desire came true (e.g., you got into your dream residency), burnout would disappear... A depressed person would still feel depressed."* Contexto: en las facultades de EE.UU. **≈50% de los estudiantes reportaron burnout en 12 meses; >11% habían contemplado el suicidio**.

**Protocolo**:

1. **Frenar el QBank** (seguir consolida malos hábitos de lectura bajo estrés).
2. **Parar la adquisición**: sin vídeos, temas ni tarjetas nuevas.
3. **Mantenimiento mínimo**: **30-45 min/día** de Anki viejo.
4. **Recuperación con flow**: **3-7 días** de descanso activo (correr, journaling, meditación, cenas familiares) → la inteligencia fluida vuelve y el score sube solo.

Y la advertencia sobre las horas: *"you can't study 12 or 14 hours a day"* — las horas 13-14 de un día de 14 son re-estudio garantizado; mejor **8-9 h eficientes con descansos** (Dr. Shirley, UNC). Anécdota: el alumno que a las 3 a.m. vio Sketchy durante 5 h — *"how did it go? — it didn't go well."*

(7 Most Commons Reasons Your NBMEs Aren't Improving; How to Stop Med School Procrastination; Slow is Fast; Fixing USMLE Test-Day Mistakes: The STRESS Strategy)

---

# 10. MENTALIDAD, PRODUCTIVIDAD, TDAH, PROCRASTINACIÓN

## 10.1 La tesis en 7 frases

1. **"Most academic struggle is method, not intelligence... virtually 100%"** (How to Make the GREATEST Academic Comeback).
2. **"You're not a bad test taker. Instead you have bad test taking skills"** ("Bad Test-Taker" Is a Lie You Tell Yourself).
3. **"It's not a discipline problem. It is a method problem that has the symptom of being a discipline problem"** (The 10 Behaviors that Guarantee a USMLE Fail).
4. **"What you eliminate, you don't have to resist"** / *"it's not discipline, it's environment engineering"* (How to Score 260+ on USMLEs in 2026; ADHD Superpowers).
5. **"Academic failure or failure of any kind is data, it is not destiny"** (How to Make the GREATEST Academic Comeback).
6. **"Studying more only works if the problem is actually knowledge, and frankly almost none of my problems after a certain point were about knowledge"** (I Studied 30,660 Hours).
7. **"This is an emotion regulation problem more than it is a problem of skill or knowledge or preparation"** (The USMLE Mindset That Guarantees a 260+).

## 10.2 Skills, not identity

- *"If you're a bad test taker there's literally nothing that you can do about it... But if you have bad test taking skills that's something that you can improve."*
- **Los 3 problemas reales** (diagnóstico en vez de identidad): **Learning** (memorizaste sin entender) · **Memory** (entendiste y olvidaste → repetición espaciada) · **Interpretation** (sabes y no lo transfieres a la viñeta).
- **Las 10 skills** del vídeo homónimo: (1) ser juez, no abogado; (2) **diagnosticar por qué fallas** (learning / memory / interpretation); (3) entender la intención de **cada palabra** de la viñeta; (4) saber **qué tipo de examen** rindes (la facultad evalúa *recall*, el USMLE **aplicación** — trampa especial para IMG de sistemas memorísticos); (5) **no olvidar nunca lo que aprendes**; (6) **dejar de arreglar 10 cosas a la vez** (elegir **una**, el cuello de botella); (7) **arreglar el timing** (temporizador de 2 min); (8) **tratar la procrastinación** en sus dos capas (hábito y **por qué** evitas); (9) **abordar el miedo profundo** (EMDR); (10) "it's not you, it's your skills".
- **Reencuadre literal de una identidad en skill gap**: la alumna dice *"I don't do well with the 'what's the best answer'"*; Alec: *"you're describing a symptom as if it's an identity flaw… I'd rather focus on the cause and the skill gap: 'I have not yet gotten good at the emotional discomfort of having a not-perfect answer that I have to choose as the correct answer'."*
- **Locus de control** (Kimal): no *"me deprimo cuando pienso en el examen y por eso no estudio"* (cierto pero incontrolable) sino *"I have not yet developed the coping skills to overcome my past disappointments."* Analogía del vuelo perdido: aunque "creíblemente no fue mi culpa", Alec prefiere *"it was my fault, I did not do a good enough job of estimating traffic"* → duele más, pero **te da algo que controlar**.
- **Process pain vs outcome pain**: admitir que no fuiste eficiente ni resiliente (dolor de proceso) vs. seguir rindiendo por debajo, retrasar, arriesgar la carrera (dolor de resultado). **"Choose your pain."** *"Neither way is going to be easy."*

## 10.3 Por qué los "exitosos" se estrellan en medicina

- **Peter Principle académico**: "what got you here will not necessarily get you there". *"In a hard undergrad science course, I might spend an hour on a single page of my textbook. In med school, spending an hour on one page would be suicide."*
- **"The Golden Child"** (Princeton → Harvard Med, memoria prodigiosa): *"I don't understand how UWorld can contradict itself"* — diverticulitis con antibióticos en una pregunta y cirugía en otra; **no entendía que la severidad cambia el manejo**.
- **El amigo admitido sin MCAT**: brillante, casi reprueba medicina; *"being smart wasn't enough"*; se salvó **acostándose y levantándose muy temprano** para estudiar antes de clase (Alec lo copió).
- **El MD/PhD** (campeón nacional de debate, Soros Fellow, primeras autorías en Nature): NBME **205-210** (3 DE por debajo del objetivo); *"he was really good at depth but he wasn't good at breadth"* — alternaba "PhD mode" (rabbit holes) con bloques masivos en piloto automático. Corrección: aprender bien, no olvidar, aplicar ("filling the bucket... fixed the leaks") → **255 en Step 2**, eligiendo entre Stanford y Harvard.
- **"Dina Do-Everything"** (Ivy League con honores → Harvard Med): memorizaba cada línea hasta la madrugada y **medía el éxito por lo cansada que estaba**; colapsó en Step 1 y en rotaciones.
- **Michael Jordan y su hija** (literal): estudió muchas horas y suspendió; él le dijo **"Good. Now you know the difference between preparation and work. You worked but you didn't prepare."** Contexto: Alec *"broke down and cried in front of a portion of my class"* porque conocía el material y no entendía cómo otros lo lograban.
- **La creencia "si es fácil, no está funcionando"**: la alumna que hacía cada tarjeta lo más difícil posible **y puntuaba mejor de noche, exhausta, porque no tenía energía para sobrepensar** — *"more effort was literally producing worse results"*. La misma creencia en el examen: *"wait, this can't be this easy, they must be trying to trick me"* → cambia la respuesta obvia y correcta.

## 10.4 TDAH: 6 señales y 5 superpoderes

**Contexto**: *"I was the valedictorian of my high school, graduated from Stanford Medical School and completed my anesthesiology residency at Harvard but yesterday I learned that I have ADHD"* (a los 39). En el artículo de procrastinación, un **test de función ejecutiva** lo situó **borderline ADHD, "in the 90%ile or above in a couple of measures of inattention or impulsivity"**. Dr. Russell Barkley: el TDAH es cuestión de **grado** (curva normal), no de síntomas "positivos" — por eso se le pasó por alto.

**Las 6 señales**: (1) **impulsividad / hiperatención** — *"whenever I get to a hard Anki flashcard I will impulsively, reflexively just check my email"* ("it's not really inattention but hyper attention... constantly switching"); (2) **medidas extremas todo-o-nada** (sin smartphone, iPod Touch, dietas por tipo: *"if I have a spoonful of ice cream I can eat the entire container"*); (3) **hiperfoco / adicción** (*StarCraft* en la era del dial-up con facturas enormes, cortado "cold turkey"); (4) **procrastinación como respuesta fisiológica de lucha o huida**; (5) **tics motores/inquietud**; (6) **desregulación emocional** que aflora al subir las exigencias — mantra: **"name it to tame it"**.

**Los 5 superpoderes** (rasgo → superpoder → técnica): (1) **personalidad adictiva** → *"positive addiction"* (adicto a aprender) → **eliminar, no moderar**; (2) **pensamiento disperso** → **pensamiento divergente**: en patología, ante linfocitos como primera señal de rechazo agudo, *"Well, duh!"* — el sistema inmune siempre responde con linfocitos → **una ley general**; (3) **impulsividad** → **coraje/decisión**: *"on a whim I applied for a Fulbright Grant to live in South Korea"*; fundó Yousmle "within like a weekend" → técnica: **no decidir nada importante cansado o con "big feelings"** y **filtrar impulsos con una persona de confianza**; (4) **alta energía** → **hiperfoco sostenido** → trocear en chunks donde se **vea** el éxito ("if I needed to learn everything about the heart I might choose only coronary artery disease and see myself get 90%"); (5) **ser malo en lo básico** → **diseñar sistemas** que sirven a todos.

## 10.5 Ingeniería de entorno (el protocolo consolidado)

1. **Eliminar, no reducir**: *"the psychology of absolutes is that it's easier to do something always or never than sometimes"*; **"What you eliminate you don't have to resist."** Versión social: *"in medical school I would always go to bed at 9:00 and wake up at 5, always... my friends just knew... if you just tell everyone a blanket no you'll hurt a lot fewer feelings than if you pick and choose."*
2. **Brick del teléfono a las 20:30** con Freedom (vídeo, redes, noticias, compras): *"if I let myself sometimes watch Netflix after 8:30 I will probably always watch Netflix after 8:30."* Y **Freedom bloqueando internet de 18:00 a 12:00 del día siguiente** en la facultad; Self-Control para listas negras específicas; una distracción cuesta **~25 min** para volver a la tarea.
3. **Teléfono fuera del dormitorio, Kindle en su lugar**.
4. **Deadlines naturales**: estudiar **antes** de la primera obligación del día — *"if it's before the day starts I can control that time; if it's after the day ends I have no idea when my day is going to end, there's always going to be some kind of emergency."*
5. **Trayecto forzado**: vivió deliberadamente en **Oak Grove**, "literally the farthest stop on the Orange Line from the hospital", con un **iPod Touch sin datos** → *"I knew that that commute would force me to study every single day... I had no choice."* Cuenta literal: *"even if it was only 20 minutes each way 5 days a week over 6 months that's like **80 hours** of extra studying that just happened automatically."*
6. **Cardio hack**: Anki en bicicleta estática o elíptica a intensidad leve-moderada, sin bajarse hasta ver el mazo en cero (no en la trotadora: casi se cae).
7. **Lugares**: el **food court de IKEA** ("free tea/coffee, plenty of space, and (at least at the time) no Wi-Fi") y **McDonald's** (contraste humano fuera de la burbuja universitaria); biblioteca, café, exterior.
8. **Social accountability**: grupo de estudio con **webcam y pantalla compartidas** — *"when someone can see my screen my Instagram feed suddenly becomes much less interesting"*.
9. **Accountability con costo**: el estudiante que había fallado Step 1 (baseline **42%**) pactó *"te compro un café si no te mando capturas de mis estadísticas de Anki/UWorld antes de las 18:00"*; ≈**$20 en gift cards** en meses; **NBME → 75%**. Principio: **aversión a la pérdida > fuerza de voluntad**.
10. La confesión de fondo: *"I'm actually not disciplined... tenacity was one of my weakest traits... what I do have is environment engineering. I know that I am weak."*

## 10.6 El día y la semana ideales

**Fisiología del día**: el lóbulo frontal tiene **3-4 h** de concentración profunda; estudiar tras clases u hospital es *"like trying to run a sprint after a marathon"*: **2-4× más lento** y sin retención. A las 07:00 es imposible distraerse con YouTube; a las 21:00 el cerebro agotado procrastina. **Sueño: 8 h fijas, cama 20:30-21:00** (apodo "grandpa" en Stanford), despertar natural **05:00-05:30**. **Desayuno alto en proteína y grasa.** **Siestas: no están en las fuentes.**

**Dedicated** (Step 1 Study Schedule: Make One You Actually Follow):

| Hora | Bloque |
|---|---|
| 05:30 | Despertar + desayuno (proteína/grasa) |
| 06:00-12:00 | **QBank 4-6 h**: 40-80 Q resueltas **y revisadas** (si aún aprendes a hacer buenas tarjetas: 20-40/día) |
| 12:00-13:00 | Almuerzo |
| 13:00-17:00 | **Anki 3-4 h**: todas las revisiones + 30-50 nuevas (cap 50) |
| 17:00-18:00 | Contenido 1-2,5 h: 2-3 vídeos para tapar los vacíos detectados por la mañana |
| 18:00-19:00 | Cena |
| 19:00-21:00 | Flex/cierre: terminar Anki, revisar errores, armar la **shopping list** de mañana |
| 21:00 | Dormir (≥8 h) |

**Con obligaciones (pre-dedicated / clases)**: 05:30 despertar · **06:00-08:30 Anki (2,5 h)** con la mente fresca — regla no negociable: **todas las revisiones antes de la primera clase de las 09:00** · 09:00-12:00 clases · 13:00-17:00 facultad (si hay hueco: dominar y hacer tarjetas de 3 temas de clase) · **18:00-21:30 ciencias básicas** · 22:00 dormir. Regla: **"do today's work today"**. Y **"chase one rabbit"**: *"Chase one rabbit, catch it. Chase two, catch neither."*

**Rotaciones / poco tiempo**: dormir **20:30**, despertar **04:30**, **2,5 h de calidad antes del hospital**. *"Study before work, not after."* Caso de la *fellow*: cama **21:00**, despertar **05:00** con turno a las **08:00** → **2,5 h antes de empezar el día**; *"this doesn't require more time, you're just literally moving the same hour or hours to a different slot in your day."* **Ninja mode**: AnkiWeb en el PC del hospital en huecos de 5-15 min → **llegar a casa con Anki en cero** (meta ≥80% de los días); nunca en el celular ("te ven en Facebook"); **Alt+Tab** para camuflarlo.

**La semana**: L-V maestría del tema diario; **sáb-dom = catch-up + gaps curriculares** (Alec estudió amiloidosis un fin de semana porque Stanford nunca la dio) + **medio domingo de desconexión**; **NBME al inicio del bloque semanal**, típicamente sábado o domingo, con la mente fresca.

**Métricas de tiempo**: tarjetas viejas ≤1 h/100 · nuevas 1-2 min · bloque de 10Q + revisión ≤1 h · deep dive 2-3 h.

## 10.7 Motivación: por qué el "por qué" importa

- **Extrínseca** (notas, prestigio) multiplica estrés y agotamiento; **intrínseca** = "studying itself is the reward". Alec: *"if the only thing you accomplish in med school is to still love learning at the end, it would have been a huge success. I stopped worrying about my test scores."*
- **Ejemplo del Cuerpo de Marines**: altísima satisfacción pese a paga baja y peligro real, porque en el peor momento se preguntan explícitamente **"why?"**.
- **Self-Determination Theory**: **Autonomía** (elegir método, ritmo y lugar — IKEA/McDonald's) · **Significado** (*"I'm doing this because I want to become the kind of person who uses science to help other people. I'm doing this because I want to be able to provide for my family"*; **Frankl**: *"Those who have a 'why' to live, can bear with almost any 'how'"*) · **Competencia** (los **"1% experiments"** y trocear hasta la victoria diaria: *"to go from 40% to 80% on 3 years worth of material takes a long time, but to go from 40% to 80% or 90% on just one topic should only take you a day"*).
- **Compararse consigo mismo**: *"I learned to compare myself... to previous versions of Alec. I started to ask myself, 'what can I do to get 1% better'."*
- **Los "1% experiments" (RCT personales), 5 pasos**: intervención · medida de resultado · propósito · resultados · interpretación. El experimento de Alec: bloquear internet con Freedom **de 22:00 a 10:30** → **1-2 h netas más** por mañana.
- Frase de método: *"I prefer games where if you wait, you win"* — buscar procesos que **garanticen** el éxito si se hacen consistentemente.

## 10.8 Procrastinación: modelo y protocolo

**Modelo**: la amenaza psicológica (un bloque difícil, un NBME bajo, una tarjeta incómoda, 2.000 tarjetas vencidas) activa **la misma respuesta de lucha o huida** que un león; "flight" = procrastinar / doom-scroll. *"Procrastination is more like living with a chronic illness we have to manage... The key is to remember that we are procrastinators and plan accordingly. If, instead, you blame yourself for your lack of self-discipline and vow to 'be better tomorrow,' you're inviting disappointment."*

**El test de Alec de que el método funciona**: *"when they tell themselves they're going to take a 5-minute break they actually take a 5-minute break as opposed to before where it might stretch to a couple hours"* — sin cambiar nada de la "motivación".

**Las 7 palancas del artículo**:

1. **Bloquear internet** (Freedom / RescueTime / Self-Control): *"instead of relying on self-discipline, I take the internet out of the equation"*. Dato: la estrategia de inversión no oficial de **Sequoia** es invertir sólo en empresas que permiten a los consumidores caer en uno de los siete pecados capitales — *"You don't want to be the site that people should use. You want to be the site they can't stop using."*
2. **The 1 Push-Up Rule**: su suegro, entrenador vocal en Corea, en gran forma, ante "no tengo tiempo": **"Do one push-up"** — *"the most challenging part of doing anything unpleasant is starting; lower the bar so much you can trip over it."* Traducción: **500 tarjetas → dite que harás 10; 80 preguntas → empieza con 5; una sola página**.
3. **Master, not memorize**: *"Mastery of information often takes no more time than memorizing it."*
4. **Cambiar de entorno** (§10.5).
5. **Recordarte tu "por qué"** (§10.7).
6. **Conócete**: cuestionario inicial + **test de función ejecutiva / screen de TDAH**.
7. **Identificar (y tratar) el burnout** (§9.12).

**Otras palancas**: **AVP** para arrancar bajo ansiedad · **No Zero Days** (*"if you've literally done nothing and it's 11:00 just tell yourself I'm going to do one question or one flashcard... you probably won't stop at just one"*) · **commitment > motivation** ("make a commitment to study every single day and follow through... build up your competence to get the right results to build that motivation") · **metas más pequeñas para ver mejoras** ("instead of a mixed block of 40 questions on every subject, just focus on one subject so that you can see yourself improve") · **shrink what you're looking at** (protocolo de backlog, §4.10) · **timer de 10 minutos** para cualquier preparación y la pregunta **"is this moving me toward my goal or am I just moving things around?"**.

**Perfeccionismo**: *"perfectionism isn't about high standards, it's about feeling not good enough"*; el ciclo (necesidad de perfección → amenaza → procrastinar → peores resultados → más perfeccionismo) → *"the goal isn't to lower your standards, it's to raise your self-worth"* → **EMDR**.

**Resource hoarding**: *"you're not one resource away from success, you're **one approach change away**"*; ante el impulso de comprar otro recurso, preguntarse *"am I doing this because I don't believe in myself?"*

## 10.9 Descomposición tipo Ohtani (cómo se convierte una meta en un sistema)

**Shohei Ohtani** en secundaria quiso ser el nº1 del draft japonés: *"the difference between a beginner and an expert is that a beginner is very non-specific with their goals; an expert takes a goal and is very very specific in breaking it down."* Dividió la meta en **8 componentes** (body, control, sharpness, mental toughness…) y **cada uno en 8 sub-metas**; el componente "**karma**" incluía "greetings, pick up trash, keep room clean, show respect, read books, be someone people want to support". *"If I do all of these goals it will be virtually inevitable that I accomplish my major goal."*

Aplicación literal: **"I want you to be the Shohei Ohtani of the USMLE"** — descomponer en mindset (reframe de sensaciones, esperar el desafío) y conocimiento; el diagnóstico de aquel alumno fue *"you're great on body, control, sharpness, speed; you're not great on mental toughness… **all of these things are necessary, none of them is sufficient**."*

Y el corolario: **"No silver bullet, only golden BBs"** — *"a silver bullet is one thing that changes everything; there's no one thing for these tests... golden BBs are lots of little things, each makes a moderate difference; put together you see dramatic changes."*

## 10.10 "Looking stupid on purpose"

- *"Trying to look smart is the dumbest thing you can do in medicine"*; la inteligencia es **trayectoria (learning rate)**, no una foto fija.
- Tres reglas: (1) **el umbral más bajo para equivocarse en voz alta** — *"the students that win are not the ones with the highest IQ but the ones with the lowest threshold for looking stupid in public"*; (2) **no tragarse las dudas**; (3) **exposición total al feedback** (llevar al mentor tus peores estadísticas).
- **Stanford Duck Syndrome**: calma en la superficie, pataleo debajo. Sus compañeros: *"just memorize First Aid, Alec"*.
- Hábito operativo: acercarse al profesor tras la clase y preguntar *"¿Puede explicarme por qué esto tiene sentido? Sé que podría memorizarlo, pero quiero entender el mecanismo"* — la explicación va **al reverso de la tarjeta**. Faltó **sólo a 2 clases presenciales en 2 años** y usaba los descansos de 10 min para preguntar mecanismos.
- Gema que salió de ahí: *"almost all viruses that cause cancer are DNA viruses because a DNA virus needs the host cell dividing to have free nucleotides; RNA viruses don't care"* → una tarjeta de principio que desarma docenas de preguntas.
- **Insulto vs feedback**: *"an insult attacks who you are and gives you nothing to improve on; feedback is specific and you can use it"* — **"thin skin is expensive"**.
- Caso espejo: la estudiante **210 → 268 en 3 meses** que cada semana pedía *"Just tell me what it is that I'm doing wrong. Don't worry about my feelings. Just watch me read questions"* → hoy residente de oftalmología.

## 10.11 Los 3 principios del comeback

1. **Reframe failure as fuel**: *"failure is not evidence that you're inadequate, it's evidence that you're human and you're trying."*
2. **There's always a better method**: *"you're not failing because you're not smart enough, you're failing because you haven't found the right method yet."*
3. **Your mess becomes your message**.

Y el manejo de la vergüenza: separar **shame** de **guilt** (*"guilt is I did something wrong; shame is I am wrong"*) → **AVP** → frase: *"I am enough. I just didn't show up the right way... I didn't control the controllables well enough today."* Cita que usa (*Memoirs of a Geisha*): *"adversity is like a strong wind... it tears away from us all but the things that cannot be torn, so that afterward we see ourselves as we really are."*

---

# 11. PATRONES DE LOS QUE FALLAN (CHECKLIST DE ALARMAS)

## 11.1 Las 10 conductas que garantizan un fallo

Principio de inversión: *"if you know what guarantees failure, don't do those things"*; el método de diagnóstico que Palmerton usa con sus alumnos es preguntarse **"¿qué garantizaría que fallara?"** y hacer lo contrario.

1. **Perseguir siempre el "qué" y nunca preguntar el "cómo"**: *"if you ask anyone who scored a 260 or 270 how they studied, 95% of the time they'll give you a list"* (recursos, preguntas/día, calendario). Así nace el **Frankenstein plan**: cada 2 semanas se grapa otro hack de Reddit y **el método nunca cambia**. Acción: *"stop asking top scorers what they used and instead push them on how they used those resources."*
2. **Memorizar todo y no entender nada**: el ciclo cram → dump → olvidar → agotamiento → procrastinar, "that medical school itself taught you and it works right up until it destroys you".
3. **Esperar un mes para descubrir que tu estudio no funciona**: "the most expensive one because it wastes the only thing that you can't buy back, which is your time".
4. **Decidir que el problema eres tú**: *"our method fails and then we blame our character: 'I'm just lazy', 'I'm just not good enough', 'maybe I've reached my limit'... then they start to study scared"*. **"It's not a discipline problem, it is a method problem that has the symptom of being a discipline problem."**
5. **Tomar consejo por conveniencia, no por track record** — **la escalera del consejo**: abajo, quien nunca lo hizo ("listen politely and weigh it not very high"); en medio, quien lo logró (útil, pero "most people aren't actually aware of what they did"); arriba, **quien lo logró Y ha enseñado a muchos**. *"Don't ask who's closest, ask who's done it"*; **"proximity doesn't equal expertise."**
6. **Confiar en la motivación y no tocar el entorno**: *"willpower is a terrible study plan."*
7. **Oír cada feedback como un insulto** ("thin skin is expensive"), especialmente en quienes fueron muy exitosos antes.
8. **Seguir tus sentimientos y fijar deadlines de fantasía** (la trampa del permiso, §9.4).
9. **Pennywise and pound foolish**: *"'If there were a document that could guarantee me a 260 I would never pay more than $100 for that document because it's only a document'"*; parábola del técnico (factura de $10.000 = "nail $1; the experience to know where to put the nail $9,999"). Alec: *"I paid $40,000 for basically a meeting with someone... if that can accelerate my growth by 10 times I would happily pay that."*
10. **Decidir no decidiendo**: *"'That sounds good, I don't know, I'll do it later'... they are actually making the decision in that moment by not deciding, and so a deadline ends up making the decision for them."* Remedio: **detenerte ahora** y decidir explícitamente si vas a hacerlo o no.

Cierre del vídeo: *"a video can show you the what, it can even describe the how; it's executing on the how, that's the whole game."*

(The 10 Behaviors that Guarantee a USMLE Fail)

## 11.2 Las 8 señales de que estudias mal (y no lo sabes)

1. **Enfocarse en el "qué" (recursos) en vez del "cómo"** — dos alumnas con UWorld 40-60%: una se quedó en 40% de NBME; la otra llegó a **71% en dos NBME consecutivos** tras cambiar el cómo.
2. **Esperar que suba en vez de verificar** — IMG de India, >1 año, 3 USMLE reprobados; con el 80% Mastery Method habría sabido **en 24 h** que el método estaba roto.
3. **Plan Frankenstein**: cambios por miedo (Reddit) en vez de por principios. Regla de asignación: **si olvidas → retención; si sabes y fallas → interpretación.**
4. **Una talla única para todos los errores**: ≥50% de los fallos son de proceso; hay que **clasificar** (§6.1).
5. **"Cuánto" en vez de "qué tan bien"**: mejor **10-20 Q/día a fondo** que 80 a la carrera (la IMG que pasó de reprobar dos veces a 71% lo hizo **bajando a 20-30 preguntas/día**).
6. **Sin metodología de lectura** (buzzwords, "última oración primero") → CCSN antes de ver las opciones.
7. **Abogado en vez de juez**.
8. **Confundir gestión del tiempo con leer rápido**: Alec, lector lento, termina con **5-10 min de sobra** leyendo **una vez** pausadamente, con tope de ~2 min por pregunta.

(8 Signs That You're Studying Wrong for USMLE and Don't Know It)

## 11.3 Los 9 hábitos a abandonar

1. **Falsa productividad / procrastinación productiva** (*"during finals week my apartment was the cleanest it's ever been"*): organizar apuntes en vez de repasarlos, hacer el calendario perfecto en vez de seguirlo, "color coding First Aid for the third time". Fix: **timer de 10 min** + *"is this moving me toward my goal or am I just moving things around?"*
2. **Procrastinación** → **AVP**.
3. **Distracciones digitales** → **social accountability** + **bloqueo de internet**.
4. **Estudio emocional** ("no me siento motivado") → *"of course you don't, studying sometimes sucks"* → **metas más pequeñas** + **commitment > motivation**.
5. **Todo o nada — la trampa del día perfecto**: dejar que **una mala mañana** arruine el día entero ("I'll just do better tomorrow") → **no zero days**.
6. **Aprendizaje pasivo**: *"some of the least effective study techniques are the most popular ones... they are passive"* → practice testing + distributed practice; *"the techniques that feel hard, that's your brain actually learning, it's like going to the gym."*
7. **Comparación**: positiva = **reverse-engineer** al que tiene éxito; destructiva = "when it feeds our feelings of inadequacy... can paralyze our progress".
8. **Perfeccionismo** (§10.8).
9. **Acaparar recursos** (§10.8).

(9 Habits to Quit for USMLE 260+ (2025 Edition))

## 11.4 Discrepancias entre fuentes (anotadas, no resueltas por decreto)

| Tema | Cifras en conflicto | Resolución operativa |
|---|---|---|
| **Volumen del nivel 1** | 20-30 Q/día (UWorld Complete Guide) vs **5-10 Q/día** (The ONLY Video; caso Jay; How Many UWorld Questions…) | El volumen es **marcador del nivel previo**: con base débil 5-10, con base sólida 20-30 |
| **Cuándo pasar a timed/mixto** | 4-8 semanas antes (UWorld Complete Guide) vs mínimo 2-4 semanas (UWorld FAQ) vs "2.ª mitad del dedicated" (Melody) | Rango 2-8 semanas; el principio es que **no se cronometra antes de dominar CCSN** |
| **Volumen en las últimas 1-2 semanas** | **80-100 Q/día** timed mixed (Final 1-2 Weeks) vs **20-40** (Before you take your USMLE) | Principio común: **mixed + timed + nada en tutor** |
| **Frecuencia de NBME** | cada 1-2 sem · 2-3 sem · 2-4 sem | Rango operativo **1-4 semanas**, más frecuente cerca del examen |
| **Precisión con >2 min** | "<40%" (sin cita) vs **~50% en un bloque al 80%** (transcripción) vs "well below average" | Usar **~50% vs 80%** |
| **Cambiar respuestas** | 60-70% de los cambios son correcta→incorrecta vs "~50% de los fallos de los estancados" | Misma dirección: **cambiar cuesta puntos** |
| **Tarjetas por sección de First Aid** | 15-20 vs 30-50 | Depende del tamaño de la sección; el principio es **la página completa**, no el dato |
| **Nuevas/día en Anki** | 30-40 al empezar · 45 (su 2.º año) · **50 máx** · pharm 20 | Cap **≤50**; 30-40 las primeras semanas |
| **Repasos/día en cierre o backlog** | 100-200 (+100) en backlog vs 200-300 pre-examen | Contextos distintos, ambos válidos |
| **Mazo y minutos de Alec** | 15.000+ → 19.000 → 20.000+ → >28.000; 15-20 · 20-30 · 30-60 min/día | **Evolución temporal**, no contradicción |
| **Formas NBME activas** | 25-31 (v1) vs 25-30 (cierre, con tabla) | **A VERIFICAR (08-sep)** en MyNBME |
| **Maratón de resistencia** | UWSA+NBME (360 Q, "la favorita") · NBME + 3-4 UWorld (320-360 Q) · Free 120 + 4 UWorld | Principio común: **más bloques que el examen real**, con snacks/ID/permiso reales |
| **EMDR** | 1-1,5 h/noche vs 2 h/día | Es terapia, no técnica de estudio; dosis según gravedad |
| **Ejemplo TEP → eco** | atribuido a un vídeo donde no aparece | Conservar el ejemplo, **atribución A VERIFICAR (08-sep)** |

## 11.5 CHECKLIST DE ALARMAS (para auditarse cada viernes)

Marcar cualquiera de estas **es una orden de parar y cambiar**, no una nota mental:

**Alarmas de método**

- [ ] Estudié un subtema y **no llegué al 80% en 10Q** dentro de 24-48 h → *Four Critical Adjustments*, no avanzar de tema.
- [ ] Necesité **≥5-6 bloques** (en vez de 2-3) para llegar al 80% de un subtema → falla en las tarjetas o en la shopping list.
- [ ] Estoy **avanzando de tema sin validar** ("ya lo cubrí").
- [ ] **>1/3 de mis fallos** son de temas que ya conozco → **parar adquisición**, entrenar sólo interpretación.
- [ ] Reviso las incorrectas **leyendo la explicación entera** en vez del Educational Objective + shopping list.
- [ ] Hago **tarjetas del dato fallado**, no de la sección completa.
- [ ] **Añadí un recurso nuevo** después de un bloque malo (Frankenstein plan).
- [ ] Estoy **anotando First Aid** o llevando un "journal" de UWorld.

**Alarmas de Anki**

- [ ] Tengo **revisiones vencidas** acumuladas (rompí la racha) → nuevas = 0, cap 200, protocolo de backlog.
- [ ] Hago las **nuevas antes que las vencidas**.
- [ ] Tardo **>1 h por 100 tarjetas viejas** → tarjetas largas / perfeccionismo / distracción / cansancio.
- [ ] Uso **Hard/Easy** con frecuencia, o pulso **Good sin poder explicar el mecanismo en voz alta**.
- [ ] Mis tarjetas son **cloze o de datos aislados** ("drug → side effect").
- [ ] Mis anversos **regalan la respuesta** (information leakage), o los generó la IA.

**Alarmas de volumen y timing**

- [ ] Hago **>80-100 Q/día** y el NBME está congelado o bajando.
- [ ] Hago **>120 Q/día** (entonces ya abandoné Anki).
- [ ] **No termino los bloques** o corro en las últimas 10 preguntas.
- [ ] Paso **>2 min** en preguntas de forma habitual.
- [ ] **Cambio respuestas** por sensación de duda.

**Alarmas de interpretación**

- [ ] Me oigo decir *"me encanta la A, pero este detallito no cuadra"* → estoy abogando.
- [ ] Leo la **última línea primero** o miro las opciones antes de formular la SAQ.
- [ ] Me quedo **atascado entre 2** varias veces por bloque.
- [ ] Descarto la correcta porque **no mencionan** un rasgo clásico.

**Alarmas de mente y cuerpo**

- [ ] Releo el mismo párrafo sin comprender · irritabilidad extrema · indiferencia por el examen → **burnout**: parar QBank y adquisición, 30-45 min de Anki viejo, 3-7 días de flow.
- [ ] Descansos de 5 min que se vuelven de 1 h.
- [ ] "Procrastinación productiva": limpiar, reorganizar el calendario, rehacer el plan.
- [ ] Duermo **<7-8 h** o estudio lo más demandante **después** de la jornada.
- [ ] **Zoning out** en simulacros, taquicardia, opresión torácica → panic trap: AVP, drill, worst-case planning, y si se repite, ayuda profesional.
- [ ] Digo **"sólo necesito aprobar"** → es la causa nº1 de fallo en retakes.

**Alarmas de planificación**

- [ ] Mi último NBME está **<65%** y la fecha se acerca → la fecha la decide el score, no el permiso.
- [ ] Estoy proyectando una mejora **>5%/mes** (o >10 puntos/4 semanas) → cálculo irreal.
- [ ] Mi calendario es "1 mes + 1 mes + 1 mes".
- [ ] Voy a repetir un NBME ya hecho, o a usar copias no oficiales.
- [ ] Estoy leyendo el **% de UWorld** como si predijera el resultado.

---

# 12. MAPEO AL PLAN v5.10 DE JOSEPH

> **Fuente de los datos de esta sección**: parseo directo de `src/lib/usmleStep1Daily.ts` con Node — versión original 8-sep-2026, **re-parseada el 10-sep-2026 para el corrimiento v5.9 y el 12-sep-2026 para el v5.10** (`DAILY_META`, `FRANJAS`, `USMLE_NIVELES`, `USMLE_GATE`, `DIAS`) y de `src/lib/usmleScores.ts` (`HITOS_ONTRACK`, `TIPO_ERROR_INFO`). **Ninguna fecha de esta sección está estimada de memoria.**
>
> **v5.10 (regla de Joseph): no se fusionó ni se recortó nada.** El temario salió 1:1 y el desfase se absorbió alargando el plan hasta el **mié 27-ene-2027**; 11 de los 12 hitos conservan su fecha y solo cambian de D#. **El UWSA1 es el primer hito que cambia de fecha** (vie 11-sep, ya pasada → **lun 14-sep**) y sigue siendo el D1. **El target de examen pasa al vie 29-ene** (el plan termina el mié 27; el jue 28 queda como descanso pre-examen).
>
> 🔴 **El D1 es ahora el UWSA1** (lun 14-sep: baseline antes de estudiar nada, como prescribe Palmerton) y el **contenido arranca el mar 15-sep = D2**.
>
> **Segunda pasada del 12-sep (tarde)**: se implementaron, sin tocar horario, temario ni fechas, tres divergencias de §12.6 — **viernes de nivel 4 desde S11** (D55: N3 → N4), **taper D94-D95 + D-1 fuera del plan + test day** (`USMLE_TAPER`) y el **protocolo de burnout como REGLA** (`gateHito` → 'ALERTA BURNOUT'). El total de Q pasa de 5.580 a **5.560** (−20 Q de volumen en D94; el multiconjunto de subtemas no cambia). Además, el repaso anclado de las 07:15 muestra "MIR precedió esta semana: <asignatura>" con el tag Anki compartido `sys::<sistema>` y el D73 (dermato Step 1) cuenta doble con los 8 átomos Derma `step1`.

## 12.1 El marco: qué dice el plan hoy

- **95 días hábiles · D1 = lunes 14-sep-2026 (UWSA1) → D95 = miércoles 27-ene-2027.** Examen en la ventana **25-29 ene 2027** (target **viernes 29-ene**; D95 cae dentro de la ventana y el **jue 28-ene queda como único día de descanso previo**). Sábados y domingos **libres**; skips extra: 25-dic, 31-dic, 1-ene.
- **Fases**: **A · Contenido por sistemas D1-D80** (14-sep → **6-ene**; el contenido empieza en D2, mar 15-sep) · **B · Banco intensivo D81-D87** (7-ene → 15-ene) · **C · Sprint final D88-D95** (18-ene → **27-ene**). D91 (jue 21-ene) y D93 (lun 25-ene) siguen siendo días de banco (AMBOSS 200 mitades 1 y 2) alojados dentro de la semana del sprint.
- **Carga de preguntas de Fase A** (suma de `qDia` D1-D80): **4.000 Q**, de las cuales **1.360** corresponden a los 7 hitos (UWSA1 160 + 6 NBME × 200) y **2.640** a los 73 días de contenido.
- **Distribución de niveles UWorld** (12-sep, tarde): Fase A → **28 días de nivel 1** (30 Q), **38 días de nivel 2** (40 Q), **6 días de nivel 3** (40 Q), **1 viernes de nivel 4** (D55, 40 Q: mixto de sistemas dominados desde S11) y 7 hitos en formato nivel 5 (4.000 Q); Fase B (D81-D87) → **4 días de nivel 4** (D81 · D83 · D84 · D85, 80 Q) y **3 de nivel 5** (D82 UWSA2 · D86 incorrects · D87 NBME 31) = 760 Q; Fase C (D88-D95) → **8 días de nivel 5** = 800 Q (**D94 y D95 = taper, 20 Q cada uno**). Total: **5.560 Q** (el corrimiento v5.10 de la mañana dejó 5.580 Q, idéntico a v5.7-v5.9 = prueba de que no se recortó nada; la segunda pasada resta 20 Q de **volumen** del taper de D94, no de contenido: el multiconjunto de subtemas es el mismo).
- **Gate** (`USMLE_GATE`): **80% en 10Q consecutivas del nivel actual, validadas ≤24-48 h**; si <80%, no se avanza de tema y se auditan recursos → comprensión → aplicación → memoria.

## 12.2 Cada técnica Palmerton, en su bloque horario

| Franja (L-V, fija) | Técnicas Palmerton que se ejecutan ahí | Nivel UW · gate |
|---|---|---|
| **05:00–05:45 · ANKI AM** | Repetición espaciada (§4): **FSRS con retención 0,90**, **Reviews first**, **Good ≈90% / Again ≈10%**, **sin Hard/Easy**, **≤50 nuevas/día** (30-40 al arrancar), **rollover 4 h**, 2 mazos (pharm aparte), sync inicio/fin. **Regla del 100%: cero pendientes cada día.** Madrugada = la ventana donde 94 revisiones caben en 20 min (§4.13). **Fases B-C: + STRESS SET 10Q/12 min** (§7.5), primer instinto, sin cambiar respuestas | B-C: nivel 5 |
| **07:15–08:15 · Repaso anclado** | Repaso multi-temporal D-1/D-3/D-7 + free recall + resto de Anki · **VALIDACIÓN 24-48 h: 5Q timed del subtema de AYER** = 1.ª mitad del gate de 10Q (§2 Fase 3) | nivel 2 · gate: ≥80% en las 10Q (5 aquí + 5 en la consolidación) |
| **08:15–09:00 · PRE-TEST** | **10Q ciegas del tema NUEVO, tutor, SIN reloj** = *UWorld primero para diagnosticar, First Aid después para tratar* (Karpicke-Roediger, §2) + free recall 90 s. **Cover-the-options** y **SAQ** en cada pregunta; **cada duda, incluso en los aciertos, va a la shopping list** (§6.5) | nivel 1 · **sin gate**: es diagnóstico (40-60% es normal) |
| **09:00–11:00 · DEEP PRIME** | Vídeo (B&B/Pathoma/Sketchy) + **First Aid active reading con Whole Page Rule** (la sección completa, no el dato fallado) + **highlighting honesto** + **tarjetas de MECANISMO** (≤10, patogenia→presentación, **dichas en voz alta antes de escribirlas** = las tres preguntas de §4.4) | — |
| **11:00–12:00 · CONSOLIDACIÓN** | El bloque que **materializa los 5 niveles**: nivel 1 = 20Q en bloques de 5Q tutor del subtema · nivel 2 = 30Q en bloques de 5Q timed de subtemas validados (incluye las 5Q del subtema de ayer) · nivel 3 = 20Q de sistema completo timed + 10Q tutor. Revisión = **Educational Objective + shopping list + log de errores** (knowledge / transfer / proceso) | nivel del día · **gate: ≥80% → sube; <80% → repetir 5Q del subtema, NO avanzar** |
| **18:00–18:45 · EVALUACIÓN** | **10Q mixta timed modo examen** (90 s/Q · **tope 2 min: adivinar, marcar, avanzar** · **cover-the-options** · **juez, no abogado**) + corrección + APEX. En Fase A es la **dosis diaria de nivel 4**; en día de hito, aquí se registra el % del NBME/UWSA/Free 120 | nivel 4 (Fase A) · 5 (B-C) · gate: ≥80% sostenido = listo para mezclar |

## 12.3 Fase A (D1-D80 · lun 14-sep → mié 6-ene): los niveles 1→3 y el gate del 80%

**Regla de generación de niveles** (determinista, ya aplicada en `DIAS[].nivelUW`): los **2 primeros días de cada sistema** = nivel 1 (30 Q) · **viernes sin hito con el sistema ≥3 días** = nivel 3 (40 Q) **hasta S10** y **nivel 4 desde S11** (40 Q = 10 pre-test + 20-30 Q timed mixtos de sistemas dominados + 10 tutor; flag `VIERNES_N4_DESDE_SEMANA = 11` en `gen_usmle_v5.js`, implementado el 12-sep por la tarde = divergencia #6) · **el resto** = nivel 2 (40 Q) · los **hitos** usan formato nivel 5 como **medición**, no como progresión.

**Calendario real de la Fase A por sistema** (parseado de `DIAS`):

| Sistema | Días | Fechas reales | Nivel(es) |
|---|---|---|---|
| **UWSA1 — baseline** | **D1** | **lun 14-sep** | 5 (160 Q) |
| Fundamentos (Pathoma 1-3) | D2 · D3 | mar 15-sep → mié 16-sep | 1 |
| Immunology | D4 · D5 | jue 17-sep → vie 18-sep | 1 (D5 es viernes con el sistema recién abierto: el bloque de sistema se hace del anterior) |
| **Cardiovascular (1.ª parte)** | D6-D14 | lun 21-sep → jue 1-oct | 1 → 2 → **3 (D10, vie 25-sep)** → 2 |
| **NBME 25** | **D15** | **vie 2-oct** | 5 (200 Q) |
| Cardiovascular (cierre) | D16 | lun 5-oct | 2 |
| **Respiratory** | D17-D22 | mar 6-oct → mar 13-oct | 1 → 2 → **3 (D20, vie 9-oct)** → 2 |
| **Renal** | D23-D28 | mié 14-oct → mié 21-oct | 1 → **3 (D25, vie 16-oct)** → 2 |
| Gastrointestinal (1.ª parte) | D29 | jue 22-oct | 1 |
| **NBME 26** | **D30** | **vie 23-oct** | 5 (200 Q) |
| **Gastrointestinal (2.ª parte)** | D31-D36 | lun 26-oct → lun 2-nov | 1 → 2 → **3 (D35, vie 30-oct)** → 2 |
| **Endocrine** | D37-D41 | mar 3-nov → lun 9-nov | 1 → 2 → **3 (D40, vie 6-nov)** → 2 |
| Nervous System (1.ª parte) | D42-D44 | mar 10-nov → jue 12-nov | 1 → 2 |
| **NBME 27** | **D45** | **vie 13-nov** | 5 (200 Q) |
| **Nervous System (2.ª parte)** | D46-D50 | lun 16-nov → vie 20-nov | 2 → **3 (D50, vie 20-nov)**: Neuro estrena viernes de nivel 3 en la v5.10 |
| **Hematology & Oncology** | D51-D56 | lun 23-nov → lun 30-nov | 1 → 2 → **4 (D55, vie 27-nov: primer viernes de nivel 4 — mixto de los 8 sistemas ya cerrados; desde el 12-sep tarde)** → 2 |
| Microbiology / ID (1.ª parte) | D57-D59 | mar 1-dic → jue 3-dic | 1 → 2 |
| **NBME 28** | **D60** | **vie 4-dic** | 5 (200 Q) |
| Microbiology / ID (2.ª parte) | D61-D64 | lun 7-dic → jue 10-dic | 2 |
| Reproductive | D65-D69 | vie 11-dic → jue 17-dic | 1 → 2 (sin viernes de nivel 3: D65 abre el sistema) |
| **NBME 29** | **D70** | **vie 18-dic** | 5 (200 Q) |
| Musculoskeletal / Rheum (+ derma Step 1) | D71-D73 | lun 21-dic → mié 23-dic | 1 → 2 (bloque íntegro detrás del hito) · **D73 = cuenta doble Derma ↔ Step 1**: el pre-test 08:15 y el repaso 07:15 apuntan a `deck:APEX::DERMA tag:step1` + fallos del ledger derma (8 átomos ya estudiados en sep-nov: psoriasis, eccemas, ampollosas, SJS/TEN/DRESS, bacterianas, HSV/VZV/VPH, BCC/SCC, melanoma); el contenido USMLE del día no cambia |
| Psychiatry & Behavioral | D74-D76 | jue 24-dic → mar 29-dic | 1 → 2 |
| **NBME 30 — cierre del contenido de 2026** | **D77** | **mié 30-dic** | 5 (200 Q) |
| Biostats / epi / ética (`system` = Psychiatry & Behavioral) | D78 | lun 4-ene | 2 |
| Biochemistry (2 días dobles de cierre) | D79 · D80 | mar 5-ene · mié 6-ene | 1 |

> En v5.10 el **NBME 30 (D77, mié 30-dic) va DELANTE de Biostats (D78, lun 4-ene) y de los dos días dobles de Bioquímica**, que quedan consecutivos: **D79 el mar 5-ene** y **D80 el mié 6-ene-2027** (jue 31-dic y vie 1-ene son skip). La Fase A muere el **6-ene**. El NBME 29 (D70, vie 18-dic) ya no parte el bloque MSK: D71-D73 van íntegros detrás.

**Dónde vive cada técnica en la Fase A:**

- **80% Mastery Method / Milestone 1** (§2 Fase 3): **todos los días**, repartido entre el pre-test de las 08:15 (10Q ciegas), la consolidación de las 11:00 y la validación de las 07:15 del día siguiente. El gate se registra en `usmleScores.gateDelDia`.
- **Milestone 2 (subtema timed)**: los **38 días de nivel 2**, es decir, desde el 3.er día de cada sistema.
- **Milestone 3 (sistema completo timed, 20Q)**: en v5.10 (12-sep tarde) son **6 días**, todos viernes sin hito y con el sistema ya ≥3 días abierto — **D10 (vie 25-sep, Cardio)**, **D20 (vie 9-oct, Respiratory)**, **D25 (vie 16-oct, Renal)**, **D35 (vie 30-oct, Gastrointestinal)**, **D40 (vie 6-nov, Endocrine)** y **D50 (vie 20-nov, Nervous System)**. **D55 (vie 27-nov, Hematology & Oncology) ya no es nivel 3 sino nivel 4** (ver Milestone 4). Los otros dos viernes sin hito (**D5 18-sep** Immunology, **D65 11-dic** Reproductive) caen con un sistema recién abierto → van a nivel 1 y el bloque de sistema se hace **del sistema anterior**. *(Cambio v5.9 → v5.10: al correr todo +1 día hábil, el viernes de cada bloque cae sobre otro subtema — Cardio pasa de antiarrítmicos a taquiarritmias, Resp de neumonía a restrictivas, Renal de ácido-base a electrolitos, GI de biliar a hígado II, Endo de calcio a DM, Heme de linfomas a leucemias — y Nervous System estrena su gate de sistema. Los 7 hitos de Fase A siguen usando formato nivel 5 como medición.)*
- **Milestone 4 (mixto de ≥3 sistemas)**: como **dosis diaria** en la eval de las 18:00 (10Q mixtas timed) durante toda la Fase A; **desde S11 también el viernes a las 11:00** (divergencia #6, implementada el 12-sep por la tarde con el flag `VIERNES_N4_DESDE_SEMANA = 11`): **D55 (vie 27-nov)** = 20-30Q timed mixtos de los sistemas ya cerrados (Fundamentos, Immuno, Cardio, Resp, Renal, GI, Endo, Neuro) + 10Q tutor del subtema de leucemias — el subtema no cambia, cambia el formato del bloque (`DIAS[55].franjaNota`); y como fase propia en D81 · D83 · D84 · D85. Los viernes 25-dic y 1-ene son skip y D65 abre Repro (nivel 1), así que en v5.10 el flag afecta solo a D55; es una regla, no una lista: un corrimiento futuro que mueva otro viernes ≥3º día a S11+ también lo convertiría.
- **Whole Page Rule + tarjetas de mecanismo**: 09:00-11:00, todos los días.
- **Shopping list**: 08:15 (pre-test), 11:00 (consolidación) y 18:00 (eval); es el insumo de las tarjetas del día siguiente.
- **Regla de los 2 minutos y "juez, no abogado"**: 18:00 desde **D2 (mar 15-sep)** — se pueden entrenar desde el primer día sin coste.
- **Ancla CAD**: el subtema de **enfermedad coronaria** que Palmerton recomienda como primera validación cae en **D12 (mar 29-sep, "aterosclerosis + isquemia + angina")** y **D13 (mié 30-sep, SCA)**; el sistema cardiovascular arranca el **lun 21-sep**.
- **Peso por sistema**: los sistemas más pesados del banco real (Cardio 11,3% · Neuro 10,9% · GI 8,4%, §3.9) son también los de más días en Fase A (Cardio 10 días; Neuro 8; GI 7), lo que es coherente con el "secreto 3" del NBME (§5.2).

## 12.4 Los hitos: fechas reales y mínimo on-track

| Hito | Día | Fecha real | Q | Mínimo on-track (`HITOS_ONTRACK`) | Lectura Palmerton |
|---|---|---|---|---|---|
| **UWSA1 (baseline)** | D1 | **lun 14-sep-2026** | 160 | — (cualquier valor sirve) | Baseline temprano: rompe el miedo a evaluarse y fija prioridades (§9.8). **Con la regla del 5%/mes, un baseline <45-48% haría matemáticamente inalcanzable el 70%** → es el "Goldilocks check" real, no el 15-ene |
| **NBME 25** | D15 | **vie 2-oct-2026** | 200 | **51%** | Pase seguro de la forma 25 = 64% |
| **NBME 26** | D30 | **vie 23-oct-2026** | 200 | **54%** | forma 26 = 64% |
| **NBME 27** | D45 | **vie 13-nov-2026** | 200 | **57%** (gate 1 ECFMG ≥55%) | forma 27 = 65% |
| **NBME 28** | D60 | **vie 4-dic-2026** | 200 | **61%** | forma 28 = 63% |
| **NBME 29** | D70 | **vie 18-dic-2026** | 200 | **63%** (gate 2 ≥60%) | forma 29 = 64% |
| **NBME 30 (cierre Fase A)** | D77 | **mié 30-dic-2026** | 200 | **65%** | **umbral de seguridad Palmerton ≈95% de pase**; forma 30 = la más difícil (65%) |
| **UWSA2** | D82 | **vie 8-ene-2027** | 160 | "low risk" | **El UWSA sobreestima 10-15+ puntos**: resistencia y señal secundaria; **la fecha la decide el NBME** |
| **NBME 31 — GO/NO-GO** | D87 | **vie 15-ene-2027** | 200 | **68%** | 68% está entre el 65% (≈95%) y el 70% (≈99%) de Palmerton; el criterio de **2 NBME consecutivos** es **más robusto** que su regla |
| **NBME 32** | D88 | **lun 18-ene-2027** | 200 | **68%** | confirma el GO |
| **NBME 33** | D90 | **mié 20-ene-2027** | 200 | **68%** | confirma el GO |
| **Free 120** | D92 | **vie 22-ene-2027** | 120 | **70%** (heurística comunitaria, **no** cifra Palmerton) | Sweet spot 1-2 semanas antes ✔ · **rendirlo en el Prometric real** = decisión pendiente (§12.6) |

**Cadencia**: los 7 hitos de Fase A caen cada ~3 semanas → dentro del rango operativo 1-4 semanas de Palmerton, en su extremo lento (justificado: las formas NBME son finitas, 25-33).

**Day-After Protocol** (§9.2): el NBME se rinde el viernes por la mañana; sus **4 h de auditoría** (trayectoria 15' · auditoría de honestidad 15' · triaje 1 h · **10 PC cards manuscritas 2,5 h**) caben en el **deep prime del lunes siguiente** (09:00-11:00 + el resto del bloque de mañana). **Leer cada NBME por sistema**, exigiendo ≥80% en lo ya estudiado.

## 12.5 Fases B y C: niveles 4-5, cierre y test day

| Día | Fecha | Contenido del plan | Técnica Palmerton |
|---|---|---|---|
| **D81 · D83 · D84 · D85** | jue 7-ene · lun 11-ene → mié 13-ene | Random timed **2×40Q (80 Q/día)** + revisión profunda + **sistemas débiles #1 y #2** según NBME | **Nivel 4** (mixto de sistemas dominados) + el reparto de Melody: *"distribute more time to your weakest subjects"* |
| **D82** | vie 8-ene | **UWSA2** (160 Q) | Resistencia + señal secundaria |
| **D86 · D89 · D91** | jue 14-ene · mar 19-ene · jue 21-ene | **uWorld incorrects + flagged** (nunca re-hacer acertadas) + **AMBOSS 200 Concepts (mitad 1)** + sistema débil #3 | **Nivel 5** · coherente con "una sola pasada, nunca reset": los incorrects/flagged sí, y AMBOSS = banco **nuevo** |
| **D87** | vie 15-ene | **NBME 31** + decisión **GO/NO-GO** | §9.1: nunca presentarse si los dos últimos NBME no respaldan |
| **D88** | lun 18-ene | **NBME 32** + repaso FA sistemas 1-5 | Nivel 5 |
| **D90** | mié 20-ene | **NBME 33** + repaso FA sistemas 11-14 | Nivel 5 · **candidato natural a la maratón de resistencia** (§12.6 #4) |
| **D92** | vie 22-ene | **FREE 120 oficial** + logística del examen + cierre | Free 120 en la ventana correcta (D-3 a D-7 del examen) |
| **D93** | lun 25-ene | **AMBOSS 200 Concepts (mitad 2)** + incorrects (80 Q) — sigue siendo `system = Banco intensivo` dentro de la semana del sprint | Nivel 5 |
| **D94** | mar 26-ene | Repaso FA sistemas 6-10 + **Anki marathon** + incorrects — **TAPER D-3 (20 Q, antes 40)** | §8.3: solo Anki **maduro** + 20 Q flagged/incorrects ya vistos, sin bloque timed ni AMBOSS; cero preguntas y cero tarjetas nuevas (`DIAS[94].franjaNota`, implementado 12-sep tarde) |
| **D95** | **mié 27-ene** | Rapid review de First Aid + Anki + laboratorio de dudas — **TAPER D-2 (20 Q)** | §8.3 D-2: última sesión ligera de tarjetas maduras + flagged con los mejores esquemas e imágenes · tarde: permiso impreso + digital, 2 ID con el nombre exacto, bolsas Ziploc numeradas, ruta al Prometric · **en v5.10 es el D-2 del target (vie 29-ene)** |
| **(fuera del plan)** | **jue 28-ene** | **D-1** — día de descanso pre-examen (decisión 12-sep; `DAILY_META.descansoD1`, `USMLE_TAPER.dMenos1`) | §8.3 D-1: **sólo Anki vencido** (idealmente adelantado), prohibido bloques/temas densos/abrir First Aid "para ver cuánto sé", nada nuevo después de las 17:00, journaling/ejercicio/visualización, somnífero nunca por primera vez, empacar y dormir temprano |
| **(examen)** | **vie 29-ene** | USMLE Step 1 — target (último día de la ventana 25-29 ene; `DAILY_META.examenTarget`, `USMLE_TAPER.examen`) | Test day (§8.4): desayuno proteína + grasa, café de siempre, tutorial → +15 min de descanso, bloques 1-2 → 10' · 3-4 → 10' · 5 → almuerzo 20-30' · 6 → 10' · 7; nunca revisar entre bloques ni salir a mitad de bloque; premio post-test |

**Stress sets** (§7.5): el plan los sitúa a las **05:00 en Fases B y C** (D81 en adelante, desde el **jue 7-ene**), lo que respeta el criterio de entrada de su autor (≥60% del contenido cubierto, últimas 2-3 semanas) — con la Fase A cerrada el **6-ene** (D80), el contenido está cubierto al 100% desde el primer stress set.

**Cese de contenido nuevo**: Palmerton pide parar preguntas y tarjetas nuevas **1-2 semanas antes**. Con examen el **vie 29-ene**, eso equivale a partir del **15-22 de enero** → coincide con **NBME 31 (D87, vie 15-ene) en adelante**, es decir, toda la Fase C. El plan trata **AMBOSS 200 Concepts como repaso** de conceptos ya vistos, no como banco nuevo, y la Fase C ya sólo usa flagged. **Desde el 12-sep (tarde) el taper es explícito**: D94 y D95 bajan a 20 Q (flagged + Anki maduro, `TAPER_ACTIVO` en el generador), el jue 28-ene queda como D-1 fuera del plan y el test day está escrito paso a paso en `USMLE_TAPER` (todo tomado de §8.3-§8.4; lo A VERIFICAR sigue marcado: repasos 200-300/día, costo del Free 120 en Lima).

**Burnout (§9.12) como REGLA del plan** (divergencia #29 → §E-7, 12-sep tarde): si **2 hitos consecutivos con mínimo** quedan bajo su mínimo on-track (§12.4) **y** hay síntomas → **3-5 días con sólo Anki AM (30-45 min de tarjetas viejas) + sueño**, frenar QBank y adquisición; el corrimiento determinista +1 día hábil absorbe la pausa (no se recorta temario) y se reanuda por el gate del 80%. En la app: `usmleScores.gateHito` → `'ALERTA BURNOUT'` (banner en `UsmleHub`); `BURNOUT_PROTOCOLO` lleva los pasos de §9.12.

## 12.6 Divergencias que quedan abiertas

> Estas son **exactamente** las de `PALMERTON_DIVERGENCIAS_PLAN.md` (§E). Este documento **no las contradice ni las resuelve**: las hereda. **Estado al 12-sep (tarde)**: las #2, #5 y #7 quedaron **implementadas** (no tocan horario, metas ni temario); las demás siguen a decisión de Joseph.

1. **Consolidación a 20Q permanente** si la revisión metodológica completa no cabe en los 60 min de las 11:00 (Palmerton: 10Q + revisión = 60 min máximo). No cambia horario. *(divergencia #3)* — ⏳ decisión Joseph (se decide tras S1-S2 con la medición real).
2. ✅ **Viernes de nivel 4** (mixto de 20-30Q de sistemas dominados) desde el **viernes D55 (27-nov)** — **implementado** con el flag `VIERNES_N4_DESDE_SEMANA = 11` en `gen_usmle_v5.js` (§12.3); contenido idéntico, sólo cambia el formato del bloque de las 11:00. *(divergencia #6)*
3. **Reformular el GO** para que el **UWSA2 sea sólo informativo** ("2 NBME ≥68%"), dado que el UWSA sobreestima 10-15+ puntos. Cambia el criterio de meta. *(divergencia #19)* — ⏳ decisión Joseph.
4. **Free 120 en el Prometric real de Lima + maratón de resistencia**: (a) reservar la sesión de práctica en Prometric (costo internacional citado por el cuaderno: **$155 — A VERIFICAR (12-sep)**; registro con hasta 7 días de espera); (b) la maratón de 7+ bloques **no cabe** en la tarde de un viernes de plan y los sábados son libres por régimen → única opción sin tocar franjas: **NBME 33 (D90, mié 20-ene) + 3 bloques de flagged** (≈5 h), cediendo Research/Derma/AURUM ese día. *(divergencia #21)* — ⏳ decisión Joseph.
5. ✅ **Protocolo D-3 / D-2 / D-1 / test day** — **implementado** (§12.5): D94 y D95 = taper de 20 Q (flagged + Anki maduro, nada nuevo), jue 28-ene = D-1 fuera del plan (sólo Anki vencido + ritual §8.3), vie 29-ene = examen con el plan de bloques de §8.4; código en `USMLE_TAPER`. ⚠ Lo que sigue siendo decisión de Joseph es qué hacer si hay **otro** corrimiento: ya no queda margen (recortar temario o rendir fuera de la ventana). *(divergencia #22)*
6. **Eval 18:00 → 12:00-12:45**: Palmerton desaconseja el trabajo analítico nocturno ("estudiar cansado = 2-4× más lento"; *"that same hour that was producing almost nothing at 9 p.m. was completely different at 6 a.m."*). Cambia una franja del Google Calendar (y se solaparía con SYNAPSE 12:30). *(divergencia #26)* — ⏳ decisión Joseph.
7. ✅ **Protocolo de burnout** — ya es **REGLA** (README §3b, CALENDARIO regla 6, `usmleScores.gateHito` → 'ALERTA BURNOUT' + `BURNOUT_PROTOCOLO`): 2 hitos consecutivos con mínimo bajo su mínimo **y** síntomas → 3-5 días con sólo Anki AM + sueño; el corrimiento determinista absorbe la pausa. *(divergencia #29)*
8. **Si el UWSA1 del lun 14-sep sale <40%**: bajar S1-S2 (semanas del 14 y del 21-sep) a **20 Q/día** al estilo Jay/Melody. *(divergencia #2)*
9. **Preguntas experimentales/de mecanismo** (knockouts, gráficos): UWorld es débil en ese formato → separar esos ítems en cada revisión de NBME y hacer 2-3 tarjetas de "diseño del experimento". *(divergencia #24)*
10. **"No zero days" vs el corrimiento +1**: el remap suma un día hábil por cada día no estudiado, mientras Palmerton exige un mínimo innegociable diario (1 pregunta / 10 tarjetas / ≥1 tarjeta buena). Falta definir qué cuenta como **día hábil parcial**.

**Pendientes de verificación (`A VERIFICAR (08-sep)` → `pendiente_usuario`)**

- Costo y disponibilidad del **Free 120 en el Prometric de Lima** ($75 EE.UU./Canadá · $155 internacional según el cuaderno).
- **Qué formas NBME están activas** en enero-2027 (el cuaderno describe 25-30; el plan asigna hasta la 33).
- El **% del Free 120 que predice pase** (las cifras 65/70% **no** están en la transcripción; el 70% del plan es heurística comunitaria).
- **Repasos 200-300/día** en el cierre (cifra del studio guide, no de transcripción).
- Cifras exactas de **EMDR** (1-1,5 h/noche vs 2 h/día) y procedencia del ejemplo **TEP → ecocardiograma**.
- El **warm-up de 5-10 preguntas** antes de entrar, el "30-50% más unforced errors en los bloques 1-2", la hora de llegada (30-45 min antes) y el "no hablar con otros examinados": **no** aparecen en las transcripciones.
- Procedencia del protocolo **"PC manuscrita + Costanzo/Pathoma"** para revisar el Free 120 sin explicaciones.
- Desenlace de los casos **Shelby** y **Chris**: **no están en las fuentes** (no inventar).

## 12.7 Los cinco no-negociables (si sólo se conserva una página de este documento)

1. **No avanzar de tema sin 80% en 10Q consecutivas del subtema, validadas en 24-48 h.** Si falla: Four Critical Adjustments (recursos → comprensión → aplicación → memoria). El % de UWorld es **gate de proceso**, nunca predicción.
2. **Anki a cero todos los días**, FSRS 0,90, reviews first, ≤50 nuevas, Good ≈90%, tarjetas propias de **mecanismo** dichas en voz alta antes de escribirse. Sin cloze, sin leakage, sin IA en el anverso.
3. **Cada pregunta se lee una sola vez, lenta y lineal**: CCSN → tapar opciones → SAQ → rule-in antes de rule-out → **juez, no abogado** → **tope 2 min** → **no cambiar respuestas** salvo error de lectura innegable.
4. **Cada fallo se clasifica** (knowledge / transfer / proceso), genera **shopping list** y se cierra con la **sección completa de First Aid** + tarjetas. Si >1/3 de los fallos son de temas ya conocidos, **se para la adquisición**.
5. **La fecha la deciden los NBME** (≥65% ≈ 95%, ≥70% ≈ 99%; aquí, 2 NBME ≥68%), no el permiso ni el calendario. **"It doesn't matter where you start, what matters is your trajectory and where you end."**

---

*Documento generado el 8-sep-2026 sobre los extractos v3 del cuaderno "STEP 1 · Palmerton Engine"; **§12 remapeado el 10-sep-2026 al régimen v5.9 y el 12-sep-2026 al v5.10**. Todas las fechas y los D# de §12 provienen del parseo de `src/lib/usmleStep1Daily.ts` (95 días, D1 = 2026-09-14 → D95 = 2027-01-27) y de `src/lib/usmleScores.ts`; no hay fechas estimadas.*
