# PALMERTON v3 · EXTRACTO FINAL — FARMACOLOGÍA · BIOQUÍMICA · BIOESTADÍSTICA (+ MEDICINA NUCLEAR)

Cuaderno NotebookLM "STEP 1 · Palmerton Engine" (6b39b85e-1450-49aa-a5ca-c31f9d659f86, 295 fuentes). Versión final v4 consolidada el 5-sep-2026 (noche) a partir de (1) transcripciones íntegras guardadas en local, (2) artículos yousmle.com guardados en local o leídos en la web (cheat sheets de digoxina, antiarrítmicos, Nernst, gas alveolar/diuréticos, panel de hierro), (3) tres respuestas NotebookLM: la de vitaminas/genética/bioestadística de la tarde (verificada cita por cita), la de esta noche sobre antídotos/autonómicos/PK/cheat sheets (con el nombre de la fuente inline en cada punto) y la de esta noche sobre bioestadística/vitaminas/errores innatos/genética (133 citas cotejadas contra `references`; guardada como `q_biochem_biostats3_answer.md` + `q_biochem_biostats3_citmap.txt`). Cada punto lleva su fuente entre paréntesis.

**Convención de fiabilidad**
- Sin marca = leído directamente en la transcripción o artículo (verificado).
- `[NLM ✔]` = respuesta NotebookLM cuya cita apunta a la fuente indicada (verificada contra `references`).
- `[NLM v4]` = respuesta NotebookLM de esta sesión (5-sep noche) que nombra la fuente y da la cita textual en inglés; coherente con las transcripciones locales donde se pudo cotejar (cianuro, aspirina, M1/M2/M3, heparina/warfarina, metanol). Fiabilidad alta pero no verificada contra `references` (la API devolvió `references: []`).
- `[A VERIFICAR (5-sep)]` = NotebookLM lo afirmó pero la cita NO respalda el dato (probablemente proviene de una nota generada por el propio NotebookLM, "Guía de Estudio de Bioquímica, Metabolismo, Vitaminas y Genética", que no es una fuente de Palmerton). No usar como cifra de examen hasta verificar.
- "**No está en las fuentes**" = confirmado que el cuaderno no lo cubre (NotebookLM lo declaró explícitamente o el barrido de transcripciones no lo encontró).

**Leyenda de fuentes (título completo en el cuaderno)**
- (HY Pharm 1) = High Yield Pharmacology for Shelf Exams & Step 1 + Step 2 CK — gases anestésicos [transcripción local]
- (HY Pharm 2) = High Yield Pharmacology Part 2: Shelf Exams & Step 1 + Step 2 CK — autonómicos, bloqueo neuromuscular, hipertermia maligna, genética [transcripción local]
- (Memory Hack) = USMLE Step 1 Pharmacology: The Ultimate Memory Hack [extractos citados]
- (Glass of Wine) = How to Master Step 1 Pharmacology Over a Glass of Wine [artículo local]
- (HY Biochem) = High Yield Biochemistry for Shelf Exam & Step 1 + Step 2 CK [transcripción local]
- (HY Biostats) = Biostatistics SUMMARY STEP 1 + 2 - The Basics USMLE [transcripción local]
- (HY Nuclear) = High Yield Nuclear Medicine: PET, SPECT, VQ Scans [transcripción local]
- (HY Immuno) = High Yield Immunology for Shelf Exams & Step 1 + Step 2 CK [transcripción local]
- (HY Heme) = High Yield Hematology for Shelf Exams & Step 1 + Step 2 CK [transcripción local]
- (Coag 1 / Coag 2) = How Can You Master Coagulation for the USMLE Step 1? (Part 1 / Part 2) [artículos locales]
- (FSRS 30 min) = Give Me 30 Minutes and I'll 5X Your Anki Efficiency (FSRS, Settings, Strategy)
- (Memorize Step 1/2CK) = How to Memorize for the USMLE Step 1 and Step 2 CK
- (28.655 cards) = I Reviewed 28,655 Flashcards Every Day for 17 Years. I Barely Had to Study.
- (8 Techniques) = The 8 Most Important Study Techniques I Used in Medical School
- (Pass-Fail Plan) = The Thoughtful Step 1 Pass-Fail Study Plan
- (5 Tips) = Step 1 Study Plan: 5 Tips to Boost USMLE Scores Fast
- (5 Keys Anki) = 5 Keys To Rock USMLE Step 1 With Anki/Spaced Repetition
- (HY GI / HY Surgery / HY Renal 1-2 / HY FM 1-2 / HY Endo / HY Neuro 2 / HY Peds 2 / Peds Shelf / HY Cardio 1) = videos High Yield correspondientes
- (Electroforesis) = Gel electrophoresis (Southern, Northern, Western Blot), Hemoglobin Electrophoresis (HbC, Sickle cell disease) for USMLE Step 1
- (Dedicated Plans) = Dedicated Study Plans Are Often Wrong. Why, and What to Do?
- (Score 260+ 2025 / 2026) = How to Score 260+ on USMLE Step 1 & Step 2 in 2025 / How to Score 260+ on USMLEs in 2026 (Evidence-Based)
- (Digoxina) = The Secret Connection Between Digoxin, Reversible Cell Damage, and Trousseau's Sign That USMLE Step 1 Bosses Know [artículo leído en web + NLM v4]
- (Antiarrítmicos) = USMLE Step 1 Cheat Sheet: The Ultimate Guide to Antiarrhythmics for the USMLE Step 1 [artículo leído en web + NLM v4]
- (Nernst) = Equilibrium/Nernst Potential for the USMLE [artículo leído en web + NLM v4]
- (Gas alveolar) = Alveolar Gas Equation for the USMLE Step 1? Diuretics? You Probably Won't Guess the Connection [artículo leído en web + NLM v4]
- (Panel de hierro) = Can You Connect the Mechanism of Anemia with the Iron Panel Results on the USMLE Step 1? [artículo leído en web]
- (#1 Cardio Equation) = The #1 USMLE Cardiology Equation [NLM v4]
- (UW+FA 4 Keys) = UWorld + First Aid: 4 Keys to Mastery [NLM v4]
- (258 en 6 semanas) = I Scored 258 on Step 1 in 6 Weeks… [NLM v4]
- (HY Cardio / HY Renal 2 / HY FM / HY GI / HY Endo) = videos High Yield correspondientes [NLM v4]

---

## 0. QUÉ CUBRE Y QUÉ NO CUBRE EL CUADERNO EN ESTA CLAVE (resumen ejecutivo)

| Subtema del temario | Cobertura real en las fuentes | Dónde |
|---|---|---|
| "Ultimate memory hack" (likes dissolve likes) | COMPLETA, con ~20 ejemplos literales | §1 |
| Cómo memorizar fármacos (mazo pharm, tarjetas forward/reverse) | COMPLETA (artículo "Glass of Wine" íntegro) | §2 |
| PK/PD: Vd, vida media, 5 vidas medias, Km/P50, antagonismo competitivo, up/down-regulation | PARCIAL (lo que hay es rico) | §3 |
| PK/PD: orden cero/uno, dosis de carga/mantenimiento, CYP450, índice terapéutico, agonista parcial | **No está en las fuentes** (búsqueda NotebookLM previa + barrido local) | §3 |
| Gases anestésicos (solubilidad, MAC, Meyer-Overton) | COMPLETA con cifras | §4 |
| Bloqueo neuromuscular, miastenia, hipertermia maligna, acoplamiento excitación-contracción | COMPLETA | §5 |
| Autonómicos (receptores, M2/Gi/I_KG, baroreflejo MAP = CO × TPR, neuropatía autonómica diabética) | PARCIAL pero verificada; segundos mensajeros α/β (salvo Gs) y curvas de PA con epi/NE/iso/fenilefrina **no están en las fuentes** | §6 |
| Toxicidades/antídotos: cianuro, desacopladores/aspirina, warfarina/heparina, botulismo/SNARE, digoxina (artículo íntegro), betabloqueantes/glucagón, metanol/etanol, yodo radiactivo/KI, metahemoglobina, Reye | COMPLETA en lo que hay (cianuro, aspirina, anticoagulantes y digoxina a fondo) | §7 |
| Antídotos: NAC, pralidoxima, naloxona, flumazenil, deferoxamina, fomepizol, azul de metileno | **No están en las fuentes** (NotebookLM lo declaró explícitamente en esta sesión; solo hay menciones de hepatotoxicidad por paracetamol, atropina como antimuscarínico clásico y vitamina C en metahemoglobinemia) | §7 |
| Cheat sheets cardio-renales con carga farmacológica: antiarrítmicos (fases del PA, tejido nodal, clases I-IV), Nernst, gas alveolar/acetazolamida, asa vs tiazidas e hiponatremia, panel de hierro | COMPLETA (artículos leídos) | §12b |
| Bioquímica: TCA/ETC, cianuro, desacopladores, gluconeogénesis, glucogenosis I, MCAD/VLCAD, colesterol/estatinas, HMP, purinas, G6PD | COMPLETA con preguntas literales | §8 |
| Vitaminas | B12/folato, B6 (ALA sintasa), D, K, E (imita B12) y C (pregunta de metahemoglobinemia) verificadas; **B1, niacina, B6-isoniazida: NotebookLM declaró esta noche que NO están** (la respuesta de la tarde los inventó desde una nota propia); escorbuto sin cita válida; A **no está** | §9 |
| Errores innatos adicionales (PKU, homocistinuria, galactosemia, lisosomales, porfirias, Lesch-Nyhan) | **No están en las fuentes** (confirmado dos veces) | §9 |
| Genética: dominante/recesivo/haploinsuficiencia, X-inactivación sesgada (Duchenne 26 años, 60-70 % de fibras), anticipación, penetrancia vs expresividad, dosis génica/trisomías, Turner (talla, LH/FSH), Klinefelter (talla), blots/Hb electroforesis (missense) | COMPLETA en lo que hay; imprinting, Hardy-Weinberg, PCR, ELISA **no están** (confirmado dos veces) | §10 |
| Bioestadística: diseños, OR vs RR, p, alfa/beta/poder, sesgos de recuerdo/selección/anclaje, significancia clínica | COMPLETA | §11 |
| Bioestadística: sens/esp/VPP/VPN, ROC, NNT, IC, lead-time/length-time, pruebas estadísticas | **No están en las fuentes** (NotebookLM lo confirmó; en el cuaderno "ROC" solo aparece dentro de "pROCrastinación") | §11 |
| Medicina nuclear (PET/SPECT/gammagrafía/VQ/tiroides/estrés) | COMPLETA | §12 |

---

## 1. EL "ULTIMATE MEMORY HACK": UN PRINCIPIO QUÍMICO EN LUGAR DE MILES DE HECHOS

### 1.1 El principio
- Origen: en química, en vez de memorizar qué solvente disuelve qué compuesto ("cientos si no miles de combinaciones"), basta un principio: **likes dissolve likes** — lo polar disuelve lo polar, lo no polar disuelve lo no polar (FSRS 30 min; 8 Techniques).
- Traslado a medicina: la membrana lipídica "es prácticamente la misma en el cerebro, la placenta, el estómago, el tracto GI, la piel" → si un fármaco tiene las propiedades químicas para cruzar UNA membrana, cruzará prácticamente CUALQUIER membrana (FSRS 30 min; 28.655 cards).
- Aforismo literal: **"a plasma membrane is a plasma membrane is a plasma membrane — be it in your GI tract, your skin, your placenta, your lungs, your prostate, diseased tissue"** (Memory Hack).
- Regla operativa: las moléculas que cruzan membranas de forma PASIVA (no las transportadas activamente como el sodio por canal, ni las de transporte facilitado como la glucosa) son **pequeñas, lipofílicas y sin carga** ("small, lipophilic, uncharged"); "prácticamente todas son pequeñas, casi todas lipofílicas y todas sin carga" (Memory Hack; Pass-Fail Plan).
- Cómo se usa en el examen: "no tienes que saber si algo es pequeño, sin carga y lipofílico: si conoces UN hecho (p. ej. que la lidocaína da convulsiones) infieres que cruza la BHE → cumple los tres criterios → cruza las demás membranas" (Pass-Fail Plan).
- Matiz honesto de Palmerton: la regla "no funciona siempre" porque el tracto GI tiene muchos transportadores específicos; "a menudo, no siempre, los fármacos orales cruzan algo la placenta y la BHE". Menciona que investigó logP y umbrales de 500-600 daltons y que la regla "no es tan común como parece" en su forma estricta (Memory Hack).
- Aforismo asociado: **"It's the wizard, not the wand"** (recogido en la guía maestra generada a partir de Memory Hack): el experto razona el mecanismo; la herramienta (lista/mnemotecnia) por sí sola no salva.

### 1.2 Ejemplos literales de inferencia ("¿es un detalle o es un concepto?") — formato de la clase
El video se dicta preguntando a cada alumno "is this a detail to be memorized or a concept you can understand?" (Memory Hack). Lista de casos:
1. **Cafeína**: actúa en el cerebro → cruza la BHE → es pequeña/no polar/sin carga → se puede dar oral → "y también en parche, que yo no sabía, pero al buscarlo resulta cierto" → cruza la placenta → alto volumen de distribución. Igual para nicotina, opioides y "casi todo fármaco neuroactivo" (FSRS 30 min; Memorize Step 1/2CK; 28.655 cards).
2. **Antiepilépticos (carbamazepina, fenitoína, ácido valproico)**: por definición actúan en el cerebro → cruzan la BHE → "adivino que su absorción oral será alta" → cruzan la placenta → "no me sorprende que cualquier fármaco que actúe en el cerebro sea teratógeno" (Memory Hack).
3. **Fluoroquinolonas**: ~100 % de biodisponibilidad oral por su lipofilia → "no sorprende que también penetren excelentemente LCR, pulmón y otros órganos" (Memorize Step 1/2CK).
4. **Metronidazol**: "alta biodisponibilidad oral, buena penetración en LCR/pulmón/placenta: hecho verdadero que puedes memorizar… o deducir" (Memory Hack).
5. **Protectores solares químicos**: "artículo reciente (cree que JAMA) citado en el Wall Street Journal: se absorben mucho por la piel" → son pequeños, lipofílicos, sin carga (Memory Hack).
6. **Estrógeno en parche anticonceptivo**: "es un concepto: es lipofílico, difunde entre membranas, por eso funciona como parche"; testosterona/progesterona con receptor intracelular por la misma razón (Memory Hack; Pass-Fail Plan).
7. **Metilnaltrexona**: antagonista opioide para el estreñimiento por opioides que NO precipita abstinencia. Razonamiento guiado: la abstinencia ocurre en el SNC → para causarla tendría que cruzar la BHE → si no la causa es porque no cruza → luego es polar/lipofóbica: amina cuaternaria con carga permanente. "Con un solo hecho (que es antagonista) adivinaste su estructura química" (Memory Hack).
8. **Lidocaína en abscesos**: "no funciona bien en tejido infectado" → el alto contenido de H+ protona la amina → queda cargada → no cruza la membrana del axón (Memory Hack; Pass-Fail Plan).
9. **Lactulosa en encefalopatía hepática**: azúcar que las bacterias del colon fermentan a ácido → NH3 (no polar, difunde) pasa a NH4+ (cargado) → queda atrapado en el lumen y se excreta: "ion trapping" (Memory Hack).
10. **Heparina vs warfarina**: heparina = polímero grande y muy cargado negativamente → no cruza placenta (segura en embarazo) ni se absorbe oral (IV/SC); warfarina = pequeña, sin carga, lipofílica → oral pero teratógena (Memory Hack; Coag 2).
11. **Fisostigmina vs neostigmina**: fisostigmina = amina terciaria (3 sustituyentes, sin carga) → cruza la BHE (mnemotecnia del alumno: "phys-, for the eyes"); neostigmina = amina cuaternaria (4 sustituyentes, carga permanente) → solo periférica. "Lo memoricé años en anestesia hasta que miré las fórmulas: era exactamente lo esperable" (Memory Hack).
12. **Alcohol de los desinfectantes de manos**: con concentraciones altas "se puede medir alcohol en sangre después" porque la piel es, en el fondo, una membrana lipídica (28.655 cards; 8 Techniques).
13. **Consejo a la embarazada**: en vez de memorizar listas de teratógenos, "si el fármaco actúa en el cerebro, o se da oral, o existe en transdérmico, hay altísima probabilidad de que cruce la placenta" (8 Techniques).
14. **Fentanilo y Vd**: Vd = dosis / concentración sérica; el fentanilo es muy liposoluble → se distribuye a la grasa → concentración sérica bajísima → Vd enorme; "por eso existe en parche" (Memory Hack).
15. **Colestasis y orina oscura** ("¿hecho o concepto?" — "concepto"): la bilirrubina **conjugada/directa es polar** → no va unida a albúmina → se filtra libremente en el glomérulo → aparece en la orina y la oscurece; la **no conjugada/indirecta es no polar** → viaja unida a albúmina → no se filtra → no oscurece la orina. Misma regla de membranas aplicada a un metabolito (Memory Hack, planteamiento; desarrollo en HY GI) [NLM v4].
16. **Neuropatía autonómica diabética** como "concepto": sin reflejo simpático al ponerse de pie, el CO no sube → la MAP no sube → cae la presión de perfusión cerebral → síncope; y la pérdida de tono simpático en el tubo digestivo deja al parasimpático sin oposición → **diarrea crónica** sin causa aparente (HY Cardio; guía maestra derivada de Memory Hack) [NLM v4].

### 1.3 Cómo convertirlo en tarjeta (el formato que Palmerton pide)
- Antes de hacer una tarjeta: "¿hay un principio que explique esto? Si sí, haz la tarjeta sobre el principio y úsala para aplicarlo". Ejemplo literal: anverso "Caffeine — connect its use to the different ways you can administer it"; reverso "tiene efectos neurológicos → cruza la BHE → cruza otras membranas (GI → oral; piel → parche, 'literalmente existen parches de cafeína'); igual para casi todo fármaco neurológicamente activo (nicotina, opioides…)" (FSRS 30 min).
- Consecuencia: "si aprendes el principio no tendrás que hacer ni de lejos tantas tarjetas" (FSRS 30 min).

---

## 2. CÓMO APRENDER LOS FÁRMACOS: "PHARMACOLOGY OVER A GLASS OF WINE" (artículo íntegro)

### 2.1 Marco
- Farmacología "vale típicamente 40+ puntos en Step 1"; con patología, fisiología e inmuno/micro es de las materias más importantes (Glass of Wine).
- A diferencia del resto del examen, "mucha farmacología USMLE gira en torno a saber la información básica (mecanismos y efectos adversos): cuanto más sabes, más puntos" → la herramienta es repetición espaciada con Anki (Glass of Wine).
- Dos puntos: (1) gran volumen de conocimiento, (2) se adquiere con repetición espaciada. Nota: el artículo cubre los FÁRMACOS; los PRINCIPIOS (inhibidores competitivos, curvas cinéticas) van en el mazo Step 1 general (Glass of Wine).
- Empezar YA: "el mayor arrepentimiento de los estudiantes es no haber empezado farmacología pronto"; "el mejor momento para plantar un árbol fue hace diez años; el segundo mejor, ahora"; "¿cómo te comes un elefante? Bocado a bocado" (Glass of Wine).
- Cifras del mazo: el Pharm Deck de Yousmle tiene ~1.800 tarjetas; "con 90 días y solo 20 tarjetas nuevas/día lo terminas" (Glass of Wine).

### 2.2 Los pasos (el artículo los titula "5 Steps", el índice dice "six steps")
1. **Copia de First Aid electrónica** para copiar/pegar; "First Aid pharm es suficiente para acertar la mayoría"; elegir los fármacos del bloque de órgano que estés cursando (la sección "Pharmacology" al final de cada sistema en FA) (Glass of Wine).
2. **Tarjetas simples y separadas**: "(Fármaco) – mechanism", "(Fármaco) – use", "(Fármaco) – toxicity", cada una con su reversa → "al menos 6 tarjetas por fármaco". Usar aText (u otro text-expander) para reponer símbolos (↑, →) que Anki pierde al pegar desde PDF (Glass of Wine).
3. **Marcar "Add Reverse"** (escribe "y"): forward = "Hydralazine – mechanism" → "↑ cGMP → smooth muscle relaxation…"; reverse = te dan el mecanismo y debes decir el fármaco. "Tu examen pregunta en ambas direcciones: unos ítems dan el mecanismo y piden el nombre; otros dan el nombre y piden la toxicidad" (Glass of Wine).
4. **Equilibrar la dificultad forward/reverse** puntuándola de 1 a 10 ("1 = lo recordaría sin Anki; 10 = como memorizar el arranque de los Cuentos de Canterbury"). Ejemplo: "Hydralazine – uses" forward ≈ 7 (HTA, ICC, HTA del embarazo, coadministrar β-bloqueante para la taquicardia refleja = 4 hechos) vs reverse ≈ 2. Reescribir para que el forward tenga 3 cosas y avisar el número "(3)": "de una lista de tres recuerdas dos y olvidas la última; si sabes que son tres, las sacas". Añadir siempre el "por qué": hidralazina → hipotensión → ↑ tono simpático → taquicardia refleja → β-bloqueante (Glass of Wine).
   - Regla: **"no más de 2-3 hechos no relacionados por tarjeta"** (Glass of Wine).
5. **Toxicidades agrupadas por mecanismo**: reductor de poscarga → activación simpática refleja → taquicardia (→ ↑ demanda → angina; por eso contraindicación en angina/CAD) + retención de líquidos; el "lupus-like syndrome" se pasa a otra tarjeta porque no encaja en la cadena; NO poner en negrita "náusea" porque es inespecífica: "muchos fármacos dan náusea; nunca será el rasgo definitorio" (Glass of Wine).
   - Regla "cover the responses": el USMLE debe dar información suficiente para que un grupo de expertos acuerde la respuesta sin ver las opciones. "47 años, HTA hace 3 meses, náusea → ¿qué fármaco? Imposible. Rash fotosensible malar → ya puedes identificarlo". Aprende los efectos adversos ESPECÍFICOS (Glass of Wine).
6. **Nombres, no solo clases**: "rara vez te dan la clase; tienes que reconocer azitromicina/claritromicina/eritromicina e inferir 'macrólido'". Hacer una tarjeta para la clase (mecanismo/uso/toxicidad) y otra para los nombres de la clase ("Macrolide – names (3)"); respuesta literal de Alec en comentarios: "Yep, I'd make one card for the class, and another for the names" (Glass of Wine).
- Por qué NO una tarjeta grande por fármaco: ejemplo de tarjeta "macrólidos" con mecanismo + uso + toxicidad + mecanismo de resistencia: si fallas 1 de 4 hechos "re-revisas ~80 % de lo que ya sabías"; cuantos más hechos no relacionados por tarjeta, más probable olvidar alguno y más se "enreda" el orden al recuperar (Glass of Wine).
- **Cuándo**: hacer tarjetas de fármacos es "casi mecánico" → hazlas por la tarde/noche cuando estás cansado ("sentado en el sofá con la familia, la TV y una copa de vino, copiando de First Aid"); las REVISIONES, que sí exigen esfuerzo, por la mañana (Glass of Wine).
- Meta de Alec en 1º-2º año: hacer todas las tarjetas de lo aprendido **el mismo día** (comentarios, Glass of Wine).
- Filtro de contenido: meter en Anki solo lo que está en los "educational objectives" de UWorld, salvo una explicación que conecte algo que antes solo memorizabas (ej. ACTH alto en hiperplasia suprarrenal congénita ← cortisol bajo → ↓ feedback → ↑ ACTH). "Prácticamente todo alumno que metió información fuera de los objetivos hizo demasiadas tarjetas, se atrasó y se arrepintió" (comentarios, Glass of Wine).
- Recursos citados por Alec: Rapid Review Biochemistry; para stats/behavioral "el paquete de stats de UWorld" (comentarios, Glass of Wine). ":re" en sus tarjetas = "regarding".

### 2.3 PC cards y el mazo de farmacología separado
- Metodología PC (Pathophysiological Chronology) para fármacos: no preguntar "¿qué hace X?" sino "a partir del mecanismo de X explica sus efectos adversos" (5 Keys Anki; resumido en la guía maestra generada por NotebookLM a partir de Memory Hack).
- "Separa farmacología en su propio mazo y limita las tarjetas nuevas para evitar el burnout" (5 Keys Anki).
- Ejemplo de tarjeta mala → buena (5 Tips): mala: "¿qué causa la necrosis cutánea por warfarina? → deficiencia de proteína C" ("recitaba la asociación y seguía fallando la pregunta"); buena: añadir "explica por qué" → warfarina inhibe los factores K-dependientes II, VII, IX, X y proteínas C/S; la proteína C tiene la vida media más corta → estado procoagulante transitorio.

### 2.4 Preguntas de integración = primera diapositiva de cada clase
- En todas las clases High Yield, la diapositiva 2 son "integration and application questions": "si puedes explicarlas entiendes la mayoría del PowerPoint; en vez de 50-60 tarjetas te bastan una docena" (HY Biostats; HY Pharm 1; HY Pharm 2; HY Biochem).
- Instrucción literal: "haz tarjetas de las preguntas de integración INMEDIATAMENTE después de la clase; si no, nunca lo harás" (HY Pharm 2). Se puede ver el video a 2x concentrándose solo en esas preguntas (HY Pharm 2).

---

## 3. FARMACOCINÉTICA / FARMACODINAMIA (lo que sí está)

- **Vd = dosis / concentración sérica**; fentanilo → Vd enorme por lipofilia (Memory Hack).
- **5 vidas medias** para alcanzar estado estacionario o para eliminar "casi por completo" un fármaco: "pregunta semi-común de farmacología en Step 1" (HY GI; HY Surgery).
- Aplicación a la síntesis hepática: **factor VII t½ 3-6 h** → mitad a las 5 h, un cuarto a las 10 h, "≈15 h para llegar a casi cero" → PT se altera primero; **albúmina t½ ≈ 20 días** → 5 vidas medias ≈ 100 días ("casi tres meses y medio") → normal en fallo agudo, baja en crónico. Por eso PT (no PTT) mide síntesis (HY GI; HY Surgery; Coag 1).
- **Proteína C y factor VII: t½ más corta (~1 día)** de los factores K-dependientes → warfarina sola es transitoriamente procoagulante → puente con heparina/HBPM; necrosis cutánea por warfarina en deficientes de proteína C/S (Coag 1).
- **Factor V Leiden**: factor V resistente a la proteína C activada → trombofilia; presentación clásica: mujer de 20 años que inicia anticonceptivos y hace TVP ± TEP (Coag 1).
- **Monitorización**: PT ← vía extrínseca ("The EX-PresidenT went to WAR-farin"); a dosis clínicas solo el VII cae significativamente → PTT normal; PTT ← intrínseca (XII, XI, IX, VIII) y heparina (Coag 2).
- **Reversión**: warfarina → vitamina K IV + PFC ("contiene todos los factores depletados"); heparina → protamina (heparina muy negativa, protamina muy positiva); **HIT**: IgG contra heparina-PF4 → complejos eliminados (trombocitopenia) y activación plaquetaria (trombosis) → tratar con inhibidores directos de trombina (argatroban, bivalirudina "derivada de sanguijuelas") (Coag 2).
- Hemostasia 1ª vs 2ª: defecto 1º = sangrado mucoso ("¿te sangran las encías al cepillarte?"); 2º = sangrado profundo (hemartrosis, prolongado tras extracción dental); el defecto 2º re-sangra más porque el tapón plaquetario queda sin refuerzo de fibrina (Coag 2).
- **Km vs P50**: "el error más común es creer que Km es ½ Vmax; Km NO es una velocidad, es la CONCENTRACIÓN de sustrato a la que la reacción va a ½ Vmax"; P50 = pO2 disuelta a la que el 50 % del hemo está saturado; "Km es a cinética lo que P50 es a unión" (HY Biochem).
- **Antagonismo competitivo reversible por exceso de agonista**: los bloqueantes no despolarizantes se revierten subiendo la ACh con un anticolinesterásico (HY Pharm 2). Misma lógica: yoduro de potasio compite con el yodo radiactivo por el transportador tiroideo; etanol satura la alcohol-deshidrogenasa para que el metanol no se metabolice a ácido fórmico ("el metabolito es el problema") (HY Nuclear).
- **Regulación de receptores**: mucho ligando ↓ receptores (insulina alta ↓ receptores de insulina); denervación/ictus ↑ receptores nicotínicos extrasinápticos ("lo inverso de la resistencia") (HY Pharm 2).
- **Regla general de vías**: "cuando inhibes el paso final de algo, todos los intermediarios previos suben" (HY Biochem) — aplicable a bloqueos enzimáticos por fármacos.
- **Potencia** (única definición formal en el cuaderno): "el número de moléculas de gas que necesitaría para obtener el mismo efecto anestésico"; cuanto más liposoluble, más potente (HY Pharm 2) [NLM v4]. **Eficacia** como concepto: no está en las fuentes.
- **Biodisponibilidad oral** solo como consecuencia del principio de membranas: heparina (polímero grande y cargado) = biodisponibilidad oral nula → IV/SC; warfarina (pequeña, sin carga, lipofílica) = absorción oral completa; fluoroquinolonas y metronidazol ≈ 100 % (Coag 2; Memory Hack) [NLM v4].
- **Aclaramiento**: solo aparece el de creatinina como marcador de filtración ("en fallo renal baja la filtración y sube la creatinina") (HY Renal) [NLM v4]; ecuaciones de aclaramiento farmacológico no están.
- **No está en las fuentes** (confirmado dos veces, sesión anterior y esta): cinética de orden cero vs primer orden, dosis de carga y de mantenimiento, inductores/inhibidores de CYP450, índice terapéutico, agonista parcial, eficacia vs potencia como par formal [NLM v4].

---

## 4. GASES ANESTÉSICOS (HY Pharm 1, íntegro)

### 4.1 Los dos temas de la clase
1. Los anestésicos IV e inhalados actúan en el SNC → lo relevante no es que lleguen a la sangre sino que pasen de la sangre al sistema nervioso (HY Pharm 1).
2. **"La presión parcial del gas en el cerebro es lo que importa para el inicio de la anestesia"**: a mayor presión parcial cerebral, más efecto (repetido varias veces) (HY Pharm 1).

### 4.2 Presión parcial de un gas disuelto (el concepto que "me llevó 5-6 años")
- Definición: la presión parcial en la fase gaseosa a la que no hay transferencia neta entre líquido y gas; en un sistema cerrado, presión parcial en el líquido = presión parcial en el gas en equilibrio (HY Pharm 1).
- Modelo de la **lata de refresco** (aportado por un alumno, Zach): mides la pCO2 del hueco de aire y esa es la pCO2 del líquido (HY Pharm 1).
- Consecuencia clave: si disuelves 100 moléculas de un gas MUY soluble (CO2) la presión parcial es BAJA en ambas fases; si es POCO soluble (nitrógeno) la presión parcial es ALTA en ambas fases. "Si solo te llevas una cosa: gas poco soluble en sangre → presión parcial alta" (HY Pharm 1).
- No es propiedad intrínseca: depende de cuánto gas disuelves (aguas con gas más o menos "fizzy") (HY Pharm 1).
- Simplificación definitiva (alumna Jolon, recogida en HY Pharm 2): "cuanto menos soluble en sangre, antes se SATURA la sangre y antes el gas que sigues añadiendo puede irse al cerebro; un gas muy soluble se queda todo disuelto en sangre y no sobra nada para el cerebro. No va de cuán rápido cruza la BHE". "Si entiendes eso, entiendes tanto como la mayoría de anestesiólogos" (HY Pharm 2).

### 4.3 Velocidad de inducción vs potencia (dos conceptos distintos)
- **Velocidad (onset)** ∝ 1/solubilidad en sangre = coeficiente de partición sangre-gas (moléculas disueltas en sangre / moléculas en gas, en una lata mitad sangre mitad aire). Coeficiente alto → onset lento (HY Pharm 1).
- **Potencia** ∝ solubilidad en lípidos = coeficiente de partición aceite-gas; **correlación de Meyer-Overton** ("estudio landmark de hace décadas": a más liposolubilidad, más potencia) porque el SNC y la BHE son membranas lipídicas (HY Pharm 1; HY Pharm 2).
- Ambas propiedades NO son mutuamente excluyentes: "como químico pensaba que si era soluble en sangre no podía ser liposoluble; falso: el isoflurano es más liposoluble Y más hidrosoluble en sangre que el sevoflurano; el óxido nitroso es poco soluble en AMBOS" (HY Pharm 1).

### 4.4 MAC y cifras
- **MAC** = concentración alveolar a la que el 50 % de los pacientes NO se mueve ante un estímulo quirúrgico = ED50 del gas; "minimum" es un nombre engañoso. Estudios originales en UCSF: 100 personas respiran el gas y se les hace una incisión de ~1 pulgada en el abdomen; 1 MAC = 50 se mueven, 50 no (HY Pharm 1).
- ↑ liposolubilidad → ↑ potencia → ↓ MAC (HY Pharm 1).
- **Isoflurano MAC 1,2 %** (en 40 años), muy liposoluble (potente) pero muy soluble en sangre (inducción lenta); **sevoflurano 1,8 %** (≈ "casi el doble" para el mismo efecto), poco soluble en sangre (rápido), huele mejor → de elección para inducción inhalatoria con mascarilla en niños sin vía IV; **desflurano 6,6 %**, el menos liposoluble, aún menos soluble en sangre (rapidísimo) pero muy caro; **N2O: MAC ≈ 100 % ("no puedes alcanzar 1 MAC en un adulto de 40 años")**, poco soluble en sangre (rápido) y en lípidos (poco potente) (HY Pharm 1).
- Coste: el isoflurano se usa por precio; según la transcripción "el sevoflurano es 10 veces más caro" [cifra tal como se dijo en la clase] (HY Pharm 1).
- Analogías de los alumnos: neumáticos con nitrógeno (no difunde por la goma, retiene presión); enfermedad por descompresión (el nitrógeno, poco soluble, es lo primero que sale de solución al ascender) (HY Pharm 1).

### 4.5 Preguntas literales de la clase
1. "Niño de 5 años, anestesia general para fractura de antebrazo, no quiere vía IV → inducción inhalatoria. ¿Qué propiedad da inducción rápida?" Standalone: "¿qué propiedad aumenta la velocidad de inicio?" → **D: bajo coeficiente de partición sangre-gas** (no C "liposolubilidad" = potencia; la opción "solubilidad en LCR" el propio Alec reconoce que debería eliminarse porque LCR y sangre son líquidos similares) (HY Pharm 1).
2. "Grupos A y B emparejados por IMC/edad/sexo; A recibe isoflurano hasta end-tidal 1,2 %, B sevoflurano hasta 1,2 %; tras estímulo quirúrgico se mueven significativamente más en B" → ya en equilibrio, no es velocidad sino POTENCIA → **coeficiente de partición aceite-gas** más alto = más potente (HY Pharm 1).
- Lección metodológica: "en el examen no dirán 'solubilidad en sangre'; lo disfrazan como coeficientes de partición: entiende el concepto para reconocerlo con otras palabras" (HY Pharm 1).

---

## 5. UNIÓN NEUROMUSCULAR, BLOQUEANTES, MIASTENIA, HIPERTERMIA MALIGNA (HY Pharm 2, íntegro)

### 5.1 Receptores de acetilcolina
- Solo dos tipos para Step 1: **muscarínicos (acoplados a proteína G)** y **nicotínicos (canal iónico)**. Pre/posganglionar son localizaciones, no tipos (HY Pharm 2).
- Regla anti-lista: "memorizas M1/M2/M3 y en el examen la lista te abandona": **M1 = cerebro, M2 = corazón, M3 = todo lo demás** ("vas bajando: 1 arriba, 2 corazón, 3 el resto"); muscarínicos = parasimpático + glándulas sudoríparas; nicotínicos = ganglios autonómicos + unión neuromuscular (HY Pharm 2).
- Nicotínico activado: **entra Na+ Y sale K+** (a veces Ca2+): "todos creen que solo es sodio" → despolarización; el K+ intracelular sale por gradiente → **↑ K+ sérico** (HY Pharm 2).

### 5.2 Bradicardia por M2 (cadena completa)
- Anticolinesterásico → ↑ ACh → M2 → **Gi** → ↓ AMPc → ↓ PKA → ↓ Ca2+ intracelular → **↓ pendiente de la fase 4** en nodo SA → tarda más en alcanzar umbral → bradicardia; "me cayó exactamente esa pregunta en mi Step 1: ¿qué receptor media la bradicardia? — con la lista de N/M1/M2 agonista/antagonista" (HY Pharm 2). Prevención: antagonista muscarínico (atropina clásica; en quirófano glicopirrolato) (HY Pharm 2).
- Caso real MGH: trasplantado cardíaco (corazón denervado que se reinerva impredeciblemente en ~10 años) que codificó tras neostigmina pese a glicopirrolato adecuado, por predominio parasimpático (HY Pharm 2).
- Niños: fuerte tono vagal; CO depende de la FC (no pueden aumentar mucho el volumen sistólico; FC 150 normal en neonato); la causa más común de parada en niños para anestesia es la HIPOXIA (desaturan mucho más rápido que un adulto joven, que con preoxigenación aguanta ~10 min) y la hipoxia en niños da bradicardia (HY Pharm 2).

### 5.3 Bloqueo neuromuscular
- Para qué: que el paciente no se mueva; relajar musculatura abdominal (cierre de fascias, laparoscopia con CO2); intubar sin laringoespasmo (las cuerdas se cierran reflejamente ante cualquier irritante = mecanismo del "dry drowning": inspirar contra glotis cerrada → edema pulmonar) (HY Pharm 2).
- **Despolarizante = succinilcolina** ("prácticamente el único en uso"): agonista nicotínico → despolarización → **fasciculaciones** (ojos, todo el cuerpo "parece una convulsión"; "búscalo en YouTube") → canal queda en estado **inactivo** (tres estados: abierto, cerrado, inactivado; inactivado = no responde a estímulo) → parálisis. Se intuba cuando aparecen las fasciculaciones (HY Pharm 2).
- **No despolarizante = curare, vecuronio**: antagonista competitivo, sin fasciculaciones (HY Pharm 2).
- **Reversión**: solo el no despolarizante, con **neostigmina** (↑ ACh desplaza al competidor); "el momento en que me enamoré de la anestesia" (fellow de Stanford preguntándole exactamente esto). Bloqueo de fase 2 de la succinilcolina: "nunca lo he visto preguntado ni en mis boards de anestesia"; además la neostigmina inhibe la pseudocolinesterasa → prolonga paradójicamente la succinilcolina (HY Pharm 2).

### 5.4 Miastenia gravis (pregunta patogénesis → manejo)
- Autoanticuerpos contra el receptor nicotínico → menos receptores disponibles → para DESPOLARIZAR hace falta **MÁS succinilcolina**; para BLOQUEAR competitivamente hacen falta **MENOS** no despolarizante ("exquisitamente sensibles; efecto muy prolongado; evita el no despolarizante") (HY Pharm 2).
- Caso real: paciente miasténica en OB con azatioprina (inmunosupresor) + piridostigmina (anticolinesterásico) y plasmaféresis previa; "el adjunto no recordaba si más o menos: definitivamente más" (HY Pharm 2).

### 5.5 Ictus / quemados / denervación
- Menos input → **up-regulation** de receptores nicotínicos extrasinápticos → succinilcolina → salida masiva de K+ → **hiperpotasemia → arritmia fatal** → evitar succinilcolina (HY Pharm 2; también en la guía maestra a partir de Memory Hack).
- Lado parético: **resistente** al no despolarizante (más receptores que bloquear) → monitorizar el bloqueo (estímulo del nervio cubital, movimiento del pulgar) en el lado NO parético; "casi cometí ese error" (HY Pharm 2).

### 5.6 Acoplamiento excitación-contracción y bloqueantes de calcio
- Músculo esquelético: el canal de Ca2+ voltaje-dependiente (dihidropiridínico, DHPR) está **acoplado mecánicamente** al receptor de rianodina del retículo sarcoplásmico; "NO entra calcio: es el cambio conformacional el que abre la rianodina". Cardíaco y liso: **liberación de Ca2+ inducida por Ca2+** (sí entra Ca2+) (HY Pharm 2).
- Por eso los **bloqueantes de canales de calcio dan vasodilatación y depresión miocárdica pero NO debilidad esquelética** ("mismos canales en los tres tejidos, solo dos afectados") (HY Pharm 2).
- Calcio extracelular fija el umbral de despolarización: hipocalcemia → umbral bajo → hiperreflexia, Chvostek/Trousseau; hipercalcemia → estupor, hiporreflexia, lentitud ("experimento de los años 60 sobre calcio y umbral de canales de sodio"; detalle en la clase de electrolitos, sección renal) (HY Pharm 2).

### 5.7 Hipertermia maligna
- Mutación en el **receptor de rianodina** (canal, no enzima) con **ganancia de función** → **autosómica dominante** ("si el 50 % de mis canales están hiperactivados basta; contrasta con fibrosis quística, pérdida de función de CFTR, recesiva; Duchenne, falta de distrofina, recesiva ligada al X; haploinsuficiencia como excepción") (HY Pharm 2).
- Desencadenante clásico: **succinilcolina** (activa los mismos canales de rianodina de forma sistémica) (HY Pharm 2); descrita como "tetania sistémica: calcio liberado del retículo → contracción de todos los músculos → calor" (HY Immuno).
- **Primer signo: el CO2 espirado se dispara** ("hiperventilas al paciente y sigue subiendo") mucho antes de la hipertermia; "no lo sabía a vuestra edad" (HY Pharm 2).
- **Hipertermia ≠ fiebre**: la fiebre es central e intencional (el tronco decide subir la temperatura; hipótesis: desplaza la curva de Hb a la derecha para dar más O2 al estallido oxidativo de los neutrófilos); la hipertermia es un subproducto del calor muscular (HY Pharm 2). Escalofríos = forma leve del mismo mecanismo de generar calor (HY Immuno).

---

## 6. SISTEMA NERVIOSO AUTÓNOMO Y CARDIOVASCULAR (parcial, verificado)

- **Receptores**: nicotínico = canal iónico ("sodium flows in, potassium flows out… net effect is depolarization"); muscarínico = acoplado a proteína G, con la regla **M1 cerebro / M2 corazón / M3 todo lo demás** (HY Pharm 2) [NLM v4].
- **M2 cardíaco vía Gi**: ↓ adenilato ciclasa/AMPc Y abre los canales **I_KG (I_K(ACh)) de las células nodales SA/AV** → eflujo de K+ → hiperpolarización → "hace falta más entrada de cationes para la misma despolarización" → ↓ pendiente de fase 4 → ↓ FC y conducción AV más lenta (Antiarrítmicos; HY Pharm 2) [NLM v4]. Es la misma cadena Gi → ↓AMPc → ↓Ca → ↓ pendiente de fase 4 de §5.2.
- **Gs**: el receptor β y el receptor de glucagón usan Gs → adenilato ciclasa → ↑ AMPc; por eso el glucagón revierte la sobredosis de β-bloqueantes ("β blockers and glucagon have the opposite downstream signaling") (UW+FA 4 Keys) [NLM v4].
- **Segundos mensajeros de M1/M3, α1, α2, β2 (IP3/DAG, Gq, Gi)**: no están en las fuentes más allá de lo anterior [NLM v4].
- **Baroreflejo — "la ecuación nº 1 de cardiología": MAP = CO × TPR, con CO = FC × VS**. De pie: la gravedad acumula sangre en las venas → ↓ precarga → ↓ VS → ↓ CO → ↓ MAP → menos estiramiento del seno carotídeo → menos disparo de barorreceptores → descarga simpática: **β1** (↑ FC y contractilidad → ↑ CO) y **α1** (vasoconstricción → ↑ TPR). Regla: **"los reflejos nunca sobrecompensan"** (#1 Cardio Equation) [NLM v4].
- **Neuropatía autonómica** (diabetes mal controlada crónica daña fibras autonómicas): el reflejo falla → la MAP no sube → ↓ presión de perfusión cerebral (**CPP = MAP − ICP**) → síncope postural; en el tubo digestivo, parasimpático sin oposición → diarrea (HY Cardio; guía maestra derivada de Memory Hack; la fórmula CPP también la cita un alumno en HY Pharm 1) [NLM v4].
- Trampa de anclaje relacionada: diabético con síncope → el clínico asume neuropatía autonómica e ignora un bloqueo AV de 3º grado a 42 lpm en el ECG (sesgo de anclaje/confirmación) [NLM ✔ HY FM 2 / HY Cardio 1].
- Fármacos: atropina (antagonista muscarínico) previene la bradicardia por anticolinesterásicos; glicopirrolato (amina cuaternaria, no cruza BHE) es lo que se usa en quirófano (HY Pharm 2). Fisostigmina para toxicidad anticolinérgica central / "glaucoma o sobredosis de atropina" (alumno en HY Pharm 2; Memory Hack).
- Dobutamina = agonista β1 → ↑ contractilidad y FC → prueba de esfuerzo química cuando el paciente no puede hacer ejercicio (HY Nuclear).
- Isquemia y frecuencia: "en isquemia quieres FRENAR el corazón: baja la demanda y sube la oferta porque el corazón se llena en diástole, siempre que mantengas la presión" (HY Nuclear).
- **No está en las fuentes** (confirmado por NotebookLM en dos sesiones): curvas de PA/FC con epinefrina, norepinefrina, isoproterenol, fenilefrina; pruebas con atropina/fentolamina [NLM v4].

---

## 7. TOXICIDADES, SOBREDOSIS Y ANTÍDOTOS

### 7.1 Cianuro (HY Biochem, desarrollo completo)
- CN− (carbono triple enlace nitrógeno, carga negativa, electrones desapareados) se une al hierro; **prefiere Fe3+**. El hemo del **complejo IV** alterna Fe2+/Fe3+ según lleve o no electrón → el cianuro se une al Fe3+ del complejo IV y **apaga la cadena de transporte** (HY Biochem).
- "¿Por qué la piel se pone roja brillante?": el O2 es el aceptor final; si no se usa, se queda unido a la Hb (Fe2+ oxigenado = rojo brillante; desoxigenado = rojo oscuro/azul a través de la piel) → **venas rojas / hiperoxia venosa** (HY Biochem).
- **"Triple screwed"** (apodo de un amigo, "no lo busques en First Aid"): (1) el cianuro desplaza O2 de la Hb; (2) por cooperatividad, el O2 restante se une MÁS fuerte y no se libera (**P50 ↓**, desviación a la izquierda: de ~25 a ~17 mmHg para saturar el 50 %); (3) aunque se libere no se puede usar en la fosforilación oxidativa (HY Biochem).
- Lactato ↑: sin ETC no se regenera NAD+ ("cubo vacío") → la única forma de seguir haciendo ATP por glucólisis es convertir piruvato en lactato, que regenera NAD+: **"el único propósito del lactato es regenerar NAD+"** (HY Biochem; repetido en HY Heme).
- **Tratamiento en dos pasos**: (1) oxidante (nitrito de amilo) → Hb a **metahemoglobina** (Fe3+) en sangre → el cianuro abandona el complejo IV y se une a la metaHb; (2) **tiosulfato** → tiocianato → se orina. "Los nitritos del agua de pozo y otros oxidantes producen metahemoglobina" (HY Biochem).

### 7.2 Desacopladores y aspirina
- Desacoplador = ↑ permeabilidad de la membrana mitocondrial interna a protones → el gradiente se disipa sin pasar por ATP sintasa → se consumen NADH y O2 "corriendo en círculos" sin ATP → calor. Los tres para Step 1: **2,4-DNP** ("el fármaco perfecto para adelgazar: obliga a quemar todo lo que forma acetil-CoA"), **aspirina en sobredosis** (fiebre/hipertermia), **termogenina** (grasa parda) (HY Biochem; recordado en HY Immuno).
- Sobredosis de aspirina: **alcalosis respiratoria** (hiperventilación; "el mecanismo no me queda del todo claro") + **acidosis metabólica** (lactato por el desacoplamiento) (HY Biochem). Con anion gap elevado (guía maestra derivada de Memory Hack).
- **Síndrome de Reye**: aspirina en niños con cuadro viral → afecta **cerebro e hígado** (vómitos en proyectil, "actúan como locos"; hallazgo histológico hepático característico que la clase da por conocido); anécdota de paciente con Reye que desarrolló maldición de Ondina (pierde el automatismo respiratorio al dormir; "con narcolepsia sería letal"). "Baby aspirin" era la dosis pediátrica antes de conocer el Reye (HY Immuno).

### 7.3 Anticoagulantes (ver §3): warfarina ↔ vitamina K IV + PFC; heparina ↔ protamina; HIT ↔ argatroban/bivalirudina (Coag 2).

### 7.4 Otros tóxicos y antídotos presentes
- **Botulismo**: la toxina cliva las proteínas **SNARE (SNAP-25)** del terminal presináptico → no se fusionan las vesículas de ACh (dependiente de Ca2+) → no se libera ACh → parálisis flácida (HY Endo) [NLM v4; verificado el origen].
- **Digoxina**: ver §7.5 (artículo íntegro). Resumen: bloquea la Na+/K+ ATPasa → ↑ Na+ intracelular → menos gradiente para el intercambiador Na+/Ca2+ → ↑ Ca2+ intracelular → ↑ contractilidad; **K+ y digoxina compiten por el mismo sitio de la bomba → "BEWARE DIGOXIN TOXICITY IN HYPOKALEMIA"** (Digoxina). Corrección a la guía maestra: el artículo NO dice que la digoxina cause hipocalcemia; lo que conecta es la bomba Na/K (digoxina, isquemia) con el umbral de despolarización (calcio) y el signo de Trousseau.
- **Betabloqueantes → glucagón**: "glucagon can be used for a β-blocker overdose" porque el receptor de glucagón usa **Gs** igual que el β → ↑ AMPc por una vía paralela (UW+FA 4 Keys) [NLM v4; resuelto el A VERIFICAR].
- **Metanol**: antes se trataba con **etanol** para saturar la alcohol/aldehído-deshidrogenasa ("el problema es el metabolito, el ácido fórmico") (HY Nuclear). Fomepizol: no está en las fuentes [NLM v4].
- **Yodo radiactivo (Fukushima 2011)**: **yoduro de potasio** satura el transportador tiroideo para que el yodo radiactivo no entre ("¿bastaría con tragar sal yodada? probablemente demasiada sal") (HY Nuclear).
- **Metahemoglobinemia** por nitritos (agua de pozo) u otros oxidantes: Fe3+ no une O2 → piel azul; útil terapéuticamente en cianuro (HY Biochem). **Azul de metileno: no está en las fuentes**; sí aparece la pregunta "¿cómo explica la función natural de la vitamina C que la usemos en metahemoglobinemia?" (258 en 6 semanas) [NLM v4] — respuesta esperable: la vitamina C es agente reductor (Fe3+ → Fe2+), coherente con su papel en prolil/lisil hidroxilasa (§9).
- **Acetaminofén**: solo como causa clásica de necrosis hepatocelular masiva ("really bad Tylenol toxicity to the liver") (HY GI) [NLM v4]; **N-acetilcisteína no está**.
- **Atropina**: "el fármaco clásico" antagonista muscarínico (HY Pharm 2); **organofosforados y pralidoxima no están** [NLM v4].
- **Opioides**: fentanilo liposoluble → Vd enorme; metilnaltrexona (cargada, no cruza la BHE) para estreñimiento sin precipitar abstinencia (Memory Hack); **naloxona no está** [NLM v4].
- **Succinilcolina en quemados/ictus** → hiperpotasemia letal (HY Pharm 2; guía maestra).
- **Fármacos que "no funcionan" por pH**: lidocaína en absceso (Memory Hack).
- **No están en las fuentes** (NotebookLM lo declaró explícitamente en esta sesión): N-acetilcisteína, organofosforados/pralidoxima, naloxona, benzodiacepinas/flumazenil, hierro/deferoxamina, fomepizol, azul de metileno [NLM v4].

### 7.5 El artículo de digoxina, daño celular reversible y Trousseau (leído íntegro; siete preguntas "patogénesis → presentación")
1. **¿Qué hace la Na+/K+ ATPasa?** Hidroliza ATP para sacar **3 Na+** y meter **2 K+** contra gradiente (Digoxina).
2. **¿Cómo aumenta la digoxina la contractilidad?** Bloquea la bomba → ↑ Na+ intracelular → menos Na+ extracelular disponible para intercambiar con Ca2+ → ↓ expulsión de Ca2+ → ↑ Ca2+ intracelular → ↑ contractilidad (Digoxina).
3. **¿Por qué la hipopotasemia potencia la toxicidad?** K+ y digoxina compiten por el mismo sitio de unión: con menos K+ la digoxina se une con más fuerza → potenciación → "BEWARE DIGOXIN TOXICITY IN HYPOKALEMIA" (Digoxina).
4. **¿Qué pasa en la isquemia transitoria (daño reversible)?** Sin O2 cae el ATP → la bomba se para → se acumulan Na+ (y solutos) dentro → entra agua → **edema celular** (hinchazón reversible) (Digoxina; HY Renal) [NLM v4].
5. **¿Cómo se presenta la hipercalcemia?** El Ca2+ extracelular **eleva el umbral** de despolarización → cuesta más disparar un potencial de acción → fatigabilidad, letargia, debilidad generalizada, hasta coma (Digoxina).
6. **¿Cómo se presenta la hipocalcemia?** Umbral bajo → hiperexcitabilidad: **Chvostek** ("tapping of facial nerve → contraction of facial muscles") y **Trousseau** ("occlusion of brachial artery with BP cuff → carpal spasm") (Digoxina).
7. **¿Por qué el manguito provoca el espasmo?** Inflar el manguito → isquemia transitoria → ↓ ATP → ↓ actividad de la Na+/K+ ATPasa → la membrana se despolariza parcialmente → queda "CLOSER to threshold of depolarization" → en una hipocalcemia previa (umbral ya bajo) esa despolarización extra dispara el espasmo carpal (Digoxina).
- Instrucción de estudio del artículo: copiar cada pregunta al anverso y la cadena al reverso, añadir tarjetas inversas y **poner en negrita** los términos clave (Digoxina). Conecta con §5.6 (calcio y umbral, HY Pharm 2) y con §12b (Nernst).

---

## 8. BIOQUÍMICA HIGH YIELD (HY Biochem, tres clases: TCA/ETC · rutas integradas · preguntas)

### 8.1 Filosofía de la clase
- "Bioquímica es el cheat code para garantizar el aprobado: está debajo de la mitad del examen; apréndela como un sistema conectado" (HY Biochem).
- "Los libros con todos los intermediarios os hacen un flaco favor: en el examen casi solo se pregunta el paso regulado clave, el primer paso o algo con relevancia clínica; el resto de pasos no se pregunta" (HY Biochem).
- "¿Dónde ocurre X? Si dices 'hígado' aciertas el 90 % de las veces" (glucogénesis, gluconeogénesis, glucogenólisis, síntesis de ácidos grasos…) (HY Biochem).

### 8.2 Ciclo de Krebs y cadena de transporte
- Acetil-CoA (2C) + oxalacetato (4C) → citrato (6C); **isocitrato deshidrogenasa = paso regulado clave** (pierde CO2, irreversible: "no puedes volver a añadir CO2"); pierde otro CO2 en α-cetoglutarato DH (NADH); succinil-CoA → succinato da GTP (menos energético); succinato → fumarato FADH2; malato → OAA NADH. Balance por acetil-CoA: **3 NADH, 1 FADH2, 1 GTP; NO produce ATP directamente** (HY Biochem).
- Mnemotecnia "un poco sucia" de los intermediarios: "Kathy Is Kinky So She Fornicates More Often" (citrato, isocitrato, α-KG, succinil-CoA, succinato, fumarato, malato, OAA) (HY Biochem).
- **Acetil-CoA es la molécula central**: piruvato (PDH), ácidos grasos ("muchos acetil-CoA encadenados: 10 acetil-CoA → ácido graso → al degradarlo recuperas 10"), cuerpos cetónicos (= 2 acetil-CoA), aminoácidos cetogénicos (HY Biochem).
- ETC en la membrana interna; NADH/FADH2 ceden electrones → se bombean H+ al espacio intermembrana → vuelven por el **complejo V (ATP sintasa)**; **O2 = aceptor final** ("una de las razones por las que respiras") → agua (HY Biochem).
- Dos membranas: origen endosimbiótico ("una bacteria engullida; la membrana externa es el fagosoma de la célula que la engulló"; tiene DNA propio) — "pregunta ocasional de Step 1" (HY Biochem; HY Heme).
- Hb: hemo con Fe2+ une O2 (rojo brillante); Fe3+ = metahemoglobina, no une O2 (azul); 4 hemos por Hb; **cooperatividad** (HY Biochem).

### 8.3 Gluconeogénesis, glucogenólisis, aminoácidos
- Gluconeogénesis (hígado): intermediarios de **≥ 3 carbonos** → glucosa; paso final **glucosa-6-fosfatasa**, el MISMO paso final de la glucogenólisis ("no es coincidencia: fosforilar la glucosa la atrapa en la célula porque el fosfato es grande y cargado; quitar el fosfato la libera por GLUT") (HY Biochem).
- Sustratos: piruvato sí (3C), glicerol sí (3C), oxalacetato sí (4C), **acetil-CoA NO (2C)**: "la confusión más común"; excepción: ácidos grasos de número impar (de plantas) → propionil-CoA (3C) → succinil-CoA → glucosa (HY Biochem).
- Glucogénico = se degrada a ≥ 3C; cetogénico = se degrada a acetil-CoA; **solo leucina y lisina son puramente cetogénicos**; muchos son ambos (HY Biochem).
- **Deficiencia de piruvato deshidrogenasa**: "último paso de la glucólisis" defectuoso → no mandes nada por glucólisis → **dieta cetogénica** rica en leucina/lisina para no acumular precursores (HY Biochem).
- Corolario clínico: en hipoglucemia sintomática se da zumo de naranja ("de lo más denso en azúcar; 'veneno' para algunos") (HY Biochem).

### 8.4 Von Gierke (GSD I) — caso completo
- Déficit de **glucosa-6-fosfatasa** → ↑ G6P → ↓ glucogenólisis Y ↓ gluconeogénesis (mismo paso final) → hipoglucemia a las **3-4 h** de ayuno (= lo que dura la glucosa de la dieta; "por eso un neonato come cada 3-4 h: no tiene reservas de glucógeno; los padres lo recordarán para siempre") (HY Biochem).
- G6P sobrante fluye a: **glucólisis ↑** → piruvato ↑ → **lactato ↑** (y alanina ↑) y acetil-CoA ↑ → **colesterol ↑** (18 acetil-CoA por colesterol; HMG-CoA reductasa) y **triglicéridos ↑** (triacilglicerol = glicerol + 3 acil; además hipoglucemia → ↓ insulina → lipasa hormono-sensible desinhibida → ↑ ácidos grasos libres); **HMP shunt ↑** → ribosa-5-P → PRPP → purinas → xantina oxidasa → **ácido úrico ↑**; glucógeno no degradado → **hepatomegalia**; el ciclo de Cori se atasca (el hígado no convierte lactato en glucosa) → lactato sérico aún mayor (HY Biochem).
- Pregunta literal: "niña de 2 meses, convulsiones 3-4 h tras lactar; más irritable con hambre que su hermano mayor (→ metabólico/genético); hepatomegalia y mejillas redondas (depósito de grasa por ↑ acetil-CoA); tras 4 h de ayuno: hipoglucemia, acidosis láctica, hipercolesterolemia, hiperuricemia. Standalone: ¿qué enzima falta en von Gierke? → G6Pasa". Descartes: fructoquinasa (fructosuria benigna, se presentaría tras comer fruta, no en ayuno); **G6PD** (hemólisis oxidativa tras primaquina/habas: la G6PD regenera glutatión, "es un antioxidante"; ligada al X; una niña solo la presentaría por **inactivación del X sesgada** — "la respuesta es siempre 'unfortunate pattern of X-inactivation', ej. madre de un niño con Duchenne que presenta síntomas tardíos") (HY Biochem).

### 8.5 Ácidos grasos: MCAD / VLCAD / carnitina — caso completo
- Ácidos grasos humanos: número **par** de carbonos (se sintetizan añadiendo acetil-CoA de 2 en 2); VLCAD/LCAD/MCAD = acil-CoA deshidrogenasas de cadena muy larga/larga/media; en el laboratorio se distinguen por la longitud de los ácidos grasos acumulados (MCAD "≈ C12-16" según la clase; peroxisomal/Zellweger aún más largos). "En el examen no os harán elegir entre LCAD/VLCAD/MCAD: la presentación es casi idéntica" (HY Biochem).
- Cronología: la glucosa de la dieta dura 3-4 h; el glucógeno **24-28 h** en reposo; con fiebre/ejercicio se agota antes → los déficits de β-oxidación se presentan a las **12-16 h** típicamente tras infección viral (menos ingesta + más demanda) o ejercicio; "no te obsesiones con la cifra: lo importante es que es mucho más tarde que von Gierke". Cuanto más pequeño el niño, antes presenta; hay recomendaciones de tiempo máximo de ayuno por edad (HY Biochem).
- Pregunta literal: "chico de 15 años perdido en el bosque, encontrado convulsionando a las 22 h; antecedentes de letargia en infecciones virales que mejoraba con zumo de frutas; hepatomegalia; labs antes de suero glucosado: hipoglucemia, **cetonas bajas**, ↑ especies acil-CoA **C6-C10**" → MCAD: sin β-oxidación no hay acetil-CoA → ni cetonas ni energía alternativa → sobre-dependencia de glucosa → hipoglucemia. Descartes: von Gierke (habría presentado en los primeros meses: "todos hemos ayunado 4 h esta noche"); McArdle (fosforilasa muscular: mioglobinuria, sin hipoglucemia, sin acil-CoA, cetonas normales) (HY Biochem).
- **Carnitina aciltransferasa = paso regulado de la β-oxidación** → déficit de carnitina: ácidos grasos "atascados en sangre" porque no entran en la mitocondria; hiperamonemia atribuida por un alumno (leído en un libro) a disfunción hepática asociada — Alec: "no lo esperaba; si es por fallo hepático, dilo así y conecta los puntos" (HY Biochem). [NLM ✔ lo reformula como esteatosis → fallo hepático → ciclo de la urea comprometido.]
- Refuerzos de la respuesta NotebookLM nocturna [NLM ✔]: la misma lógica en HY Peds 2 ("si no puedo usar la grasa para obtener energía, gasto toda mi glucosa → hipoglucemia"); **hipoglucemia hipocetósica** = la firma (sin acetil-CoA de la β-oxidación no hay cetonas); el artículo "USMLE Step 1 Score of 270: Is Memorization Enough?" usa la viñeta "niño de 5 años con convulsión tras ayuno prolongado y somnolencia en ayunos previos" como ejemplo de razonar vs memorizar. La afirmación "hiperamonemia en MCAD porque el ciclo de la urea no tiene ATP" y "acetil-CoA activa la piruvato carboxilasa" NO tienen cita válida → [A VERIFICAR (5-sep)].
- Diferenciar de **Zellweger** (peroxisomas): pregunta de alumno; se diferencia por los ácidos grasos de cadena muy larga (HY Biochem).

### 8.6 Colesterol y estatinas
- Sustrato: **18 acetil-CoA**; paso regulado **HMG-CoA reductasa**; estatinas la inhiben (HY Biochem).
- "Pregunta muy popular de Step 1 con variantes": el LDL baja **porque el hepatocito, privado de colesterol (necesario para esteroides, sales biliares, membranas), aumenta los receptores de LDL** — no simplemente por sintetizar menos. Historia: se diseñaron pensando que "colesterol = malo" (modelo de hiperlipidemia IIa); bajar colesterol total no reduce mortalidad, bajar LDL sí; "tuvieron suerte". Estatinas ↑ HDL. En hipercolesterolemia familiar con receptor LDL defectuoso "esperaría que ayudaran poco; son los que hacen coronariopatía muy precoz" (HY Biochem).

### 8.7 HMP shunt y purinas
- Fase oxidativa → **NADPH (G6PD)**; fase no oxidativa → **ribosa-5-P → PRPP** → DNA/RNA ("el 'ribo' de ribonucleico es esta ribosa") (HY Biochem).
- Purinas (adenina, guanina) → **xantina oxidasa** → ácido úrico (HY Biochem).

### 8.8 Lactato, marcadores y marco de anemias (HY Heme, útil para bioquímica aplicada)
- LDH cataliza lactato ⇄ piruvato en ambos sentidos; los eritrocitos no tienen mitocondrias → viven de glucólisis + LDH → LDH es marcador (inespecífico) de hemólisis; troponina I/T específica cardíaca; CK inespecífica de músculo (rabdomiólisis) (HY Heme).
- Marcadores celulares = "canicas dentro de un globo: solo las ves fuera si el globo se rompe" (HY Heme).
- MCV como señal fisiológica: **microcítica = problema de síntesis de Hb** (hierro, talasemia); **normocítica = problema de número** (sangrado agudo, hemólisis, DIC "cizallamiento", falta de EPO en ERC); **macrocítica = problema de síntesis de DNA** (folato/B12: "no se dividen lo suficiente"). Sangrado GI crónico → depleción de hierro → microcítica; "varón con anemia ferropénica = cáncer de colon hasta demostrar lo contrario" (también posmenopáusicas) (HY Heme).

### 8.9 Panel de hierro por mecanismo (artículo "Can You Connect the Mechanism of Anemia with the Iron Panel Results", leído íntegro)
- Definiciones: hemo = molécula porfirínica con hierro; hemoglobina = 4 globinas con 1 hemo cada una; el O2 se une al **Fe2+**; metahemoglobina = Fe3+ (une mal el O2); anemia = "insufficient RBC number, or hemoglobin quantity". Umbrales: microcítica MCV < 80 ("todo lo que baja la hemoglobina"), normocítica 80-100 ("todo lo que afecta al NÚMERO"), macrocítica > 100 ("todo lo que reduce la síntesis de DNA"). Analogía: el hematíe es "un globo grande lleno de hemoglobina": menos Hb → menos volumen (Panel de hierro).
- Los cuatro parámetros: **ferritina** = forma de depósito (macrófagos de médula; la sérica correlaciona con la corporal); **transferrina** = transportador en sangre; **saturación** = % de transferrina unida a hierro; **TIBC** ("el cuerpo está buscando hierro") con **correlación NEGATIVA con la ferritina** (Panel de hierro).
- **Hepcidina** = regulador principal de la absorción y de la liberación desde los macrófagos: hace que la **ferroportina** (exporta hierro desde enterocito y macrófago a la sangre) se internalice/degrade; se dispara por **IL-6** (reactante de fase aguda). Propósito teleológico: "secuestrar hierro de las bacterias que lo necesitan para crecer" (Panel de hierro; coincide con HY Immuno).
- **Ferropenia**: hierro ↓, saturación ↓, ferritina ↓, **TIBC ↑**. **Enfermedad crónica**: inflamación crónica → IL-6 crónica → hepcidina crónica → ↓ absorción y ↓ liberación → hierro ↓, saturación ↓, **ferritina ↑ (hierro atrapado en el macrófago), TIBC ↓** — la diferencia clave con la ferropenia. **Sideroblástica** (defecto de síntesis de hemo, absorción intacta): hierro/saturación ↑, ferritina ↑, TIBC ↓. **Talasemia**: defecto de cadenas de globina → ↓ Hb → microcítica. **Hidroxiurea**: inhibe ribonucleótido reductasa (ribonucleótidos → desoxirribonucleótidos) → ↓ síntesis de DNA → macrocítica. **B12**: "tarda más en hacer DNA, así que la célula crece más tiempo" → macrocítica (Panel de hierro).
- Método: convertir cada pregunta "patogénesis → presentación" en tarjeta (anverso/reverso), inversas cuando proceda, reformular y poner en negrita; "el examen mide tu capacidad de hacer conexiones en el momento" (Panel de hierro).

---

## 9. VITAMINAS Y ERRORES INNATOS: LO VERIFICADO Y LO PENDIENTE

### 9.1 Verificado
- **Folato**: tetrahidrofolato transfiere carbonos (CH, CH2, CH3) para purinas y dTMP → sin folato falla la síntesis de DNA → macrocítica. La investigación universitaria de Alec fue diseñar inhibidores de dihidrofolato reductasa (HY Heme).
- **B12**: solo **dos enzimas** la usan: homocisteína metiltransferasa (metionina sintasa) y **metilmalonil-CoA mutasa**. **Trampa del metilfolato**: sin B12 no se consume el N5-metil-THF, y esa conversión es irreversible ("una vez metil-THF, se queda así hasta usarse") → el folato queda atrapado → misma macrocitosis (HY Heme). Consecuencia analítica: B12 ↓ → **homocisteína ↑ y ácido metilmalónico ↑**; folato ↓ → homocisteína ↑ con MMA normal [NLM ✔ HY Heme]. Neuropatía: degeneración combinada subaguda (cordones posteriores, corticoespinal, espinocerebeloso); vitamina E imita la clínica pero cursa con anemia hemolítica y MMA normal [NLM ✔ HY Neuro 2].
- ¿Déficit de glicina y hemo por la vía metilmalonil → succinil-CoA? "No conozco vía relevante: hay muchas formas de hacer succinil-CoA; es parte del TCA. Sí conviene saber que succinil-CoA alimenta la síntesis de hemo" (HY Heme).
- **B6 (piridoxal fosfato)**: cofactor de ALA sintasa (succinil-CoA + glicina, paso limitante del hemo); isoniazida la inactiva → sideroblastos en anillo, anemia microcítica; profilaxis con B6 [NLM parcialmente ✔: la cita de HY Heme respalda succinil-CoA + glicina; la relación isoniazida-B6 A VERIFICAR (5-sep)].
- **Vitamina D / PTH** [NLM ✔ HY Endo]: colecalciferol (piel, UV) → 25-OH (hígado) → **1-α-hidroxilasa en túbulo proximal** (estimulada por PTH) → calcitriol ↑ Ca y ↑ P intestinales. **ERC**: ↓ 1-α-hidroxilasa → ↓ calcitriol → hipocalcemia + fosfato ↑ por falta de filtración → **hiperparatiroidismo secundario** (cuadrante "Ca bajo / PTH alta" del mapa Ca-PTH de la clase). **Sarcoidosis**: macrófagos epitelioides del granuloma expresan 1-α-hidroxilasa autónoma → hipercalcemia, hipercalciuria, litiasis. Anécdota: los niveles de vitamina D de Alec durante Step 1 en la soleada California eran "muy bajos" (HY Endo).
- **Vitamina K**: γ-carboxila glutamatos de II, VII, IX, X, proteínas C y S; warfarina la inhibe; ver §3 (Coag 1; Coag 2).
- **Vitamina E**: antioxidante lipofílico de membranas; su déficit imita la clínica neurológica de la B12 (degeneración combinada subaguda: cordones posteriores, corticoespinal; "lo que más verás es ataxia de Friedreich como otro ejemplo de la misma vía") pero con **anemia hemolítica** (la respuesta nocturna dice "microcítica o hemolítica") y MMA normal, no macrocítica (HY Neuro 2) [NLM ✔ en dos respuestas].
- **Vitamina C**: única presencia verificada = pregunta del artículo "I Scored 258 on Step 1 in 6 Weeks": "¿cómo explica la función natural de la vitamina C que la usemos en metahemoglobinemia?" → agente reductor que devuelve el Fe3+ de la metaHb a Fe2+ (el mismo artículo la pone junto a "¿qué fármaco de ERGE…?" como ejemplo de "cuestiona todo") (258 en 6 semanas) [NLM ✔]. Conecta con §7.1/§7.4 (metaHb como diana del cianuro; azul de metileno no está).

### 9.2 Lo que NotebookLM afirmó por la tarde SIN cita válida y por la noche declaró "no está en las fuentes"
- **B1/tiamina** (PDH/α-KG DH/transcetolasa, Wernicke-Korsakoff, beriberi, "glucosa sin tiamina precipita Wernicke"), **niacina** (pelagra, Hartnup) y **B6-isoniazida** (sideroblastos): la respuesta de la tarde los detalló citando fuentes que no los contienen (HY Biochem/HY Endo/videos de cardio) y admitió como "fuente" una nota generada por el propio NotebookLM ("Guía de Estudio de Bioquímica, Metabolismo, Vitaminas y Genética") y "USMLE Step 1 Cheat Sheets"; la respuesta de la noche (133 citas) dice literalmente: "las deficiencias o vías detalladas de Tiamina (B1), Niacina (B3), Piridoxina (B6) e Isoniazida **no están cubiertas en las fuentes**". Conclusión: **tratar como NO presentes en el cuaderno** (lo único verificado de la B6 es que el PLP es cofactor de la ALA sintasa, succinil-CoA + glicina, HY Heme). Cubrir con UWorld/First Aid.
- **Escorbuto** (prolil/lisil hidroxilasa, encías, hemorragia perifolicular, "marineros con fruta"): ambas respuestas lo citan a la anécdota de vitamina D de HY Endo → [A VERIFICAR (5-sep)]; probablemente tampoco está.
- **Vitamina A**: **no está en las fuentes** (NotebookLM lo declaró).

### 9.3 Errores innatos: cobertura
- Cubiertos: von Gierke, MCAD/VLCAD, déficit de carnitina, déficit de PDH, McArdle (solo como descarte: sin hepatomegalia ni hipoglucemia, mioglobinuria), fructoquinasa (benigna), G6PD, Zellweger (mención) (HY Biochem) [NLM ✔].
- **No están en las fuentes** (NotebookLM lo confirmó): PKU, homocistinuria, galactosemia, intolerancia hereditaria a la fructosa (solo la mención de fructoquinasa), Pompe/Cori (McArdle solo breve), enfermedades lisosomales (Gaucher, Tay-Sachs, Fabry, Niemann-Pick), porfirias (solo genérica como "defecto de síntesis de hemo"), Lesch-Nyhan.

---

## 10. GENÉTICA

- **Dominante vs recesivo por fisiopatología**: "si es un enzima y falta, el 50 % suele bastar → recesivo; si es un canal hiperactivo, con el 50 % malo ya hay fenotipo → dominante; haploinsuficiencia = cuando el 50 % no basta (ver la clase de genética)". Ejemplos: hipertermia maligna (RyR ganancia de función, AD), fibrosis quística (CFTR pérdida de función, AR), Duchenne (sin distrofina, recesiva ligada al X) (HY Pharm 2).
- **Inactivación del X sesgada** ("unfortunate pattern of X-inactivation"): explica G6PD sintomática en niña o Duchenne tardío en la madre portadora (HY Biochem); las células germinales femeninas NO inactivan el X (necesitan ambos para migrar/desarrollarse) → en **Turner (45,X)** los ovocitos mueren → **streak ovaries** [NLM ✔ Peds Shelf]. Caso: "mujer de 26 años con dificultad para levantarse de la silla, portadora conocida de Duchenne (hijo afectado)" [NLM ✔ Peds Shelf].
- **Anticipación**: repeticiones de trinucleótidos (Huntington, X frágil, distrofia miotónica) se expanden en la gametogénesis → inicio más precoz y grave en cada generación; ejemplo abuelo 70 / hijo 48 / nieto 25 [NLM ✔ Peds Shelf].
- **Electroforesis** (artículo Electroforesis): separa por tamaño/carga; SDS desnaturaliza y da carga negativa uniforme (migran solo por tamaño); Southern = DNA, Northern = RNA, Western = proteína; **electroforesis de Hb es un Western** (la Hb es proteína); HbA (glutamato −, posición 6 de β) corre más al ánodo; **HbS (Glu → Val, neutra; mutación missense)** intermedia; **HbC (Glu → Lys, +; missense)** la que menos ("A acelera, S se desliza, C gatea"). Pregunta: paciente 1 migración intermedia = HbS; paciente 2 la menor = HbC [NLM ✔].
- **Portadora de Duchenne con síntomas — "una de las preguntas de genética más comunes que te van a caer, y es sorprendente cuánta gente la falla"** (Peds Shelf) [NLM ✔]: Duchenne = recesiva ligada al X, distrofina (proteína citoplasmática que conecta el citoesqueleto; la gravedad depende de qué parte del gen falta); inicio típico en niños **2-5 años**; la portadora suele ser asintomática porque la inactivación del X es aleatoria (≈ 50 % de fibras con el X sano bastan); si "por pura suerte" **el 60-70 % de las fibras musculares inactivaron el X bueno**, aparece la miopatía ("it's just all about luck"); viñeta: mujer de 26 años, dificultad para levantarse de la silla, hijo con Duchenne (Peds Shelf).
- **Penetrancia vs expresividad variable** (Peds Shelf) [NLM ✔]: penetrancia = **binaria (sí/no)**: % de portadores del genotipo que muestran ALGÚN fenotipo ("80 % de penetrancia: el 80 % tiene algo, el 20 % nada"); expresividad variable = **grado/severidad** del fenotipo entre quienes lo muestran (ejemplo de Marfan: solo aracnodactilia vs dilatación aórtica) [≈: el ejemplo de Marfan no aparece en el texto citado].
- **Dosis génica y trisomías** (Peds Shelf) [NLM ✔]: "tener demasiado o demasiado poco de un gen respecto a lo que la célula debería tener es malo" → si la mujer no inactivara un X tendría el doble de proteína de los genes X; una trisomía 3 altera tanto la dosis que es incompatible con la vida (aborto precoz); solo 13, 18 y 21 llegan a nacer [≈: el razonamiento "cromosomas pequeños con pocos genes" es plausible pero no está en el texto citado].
- **Turner y talla baja**: "esperarías que las mujeres con Turner fueran altas (sin estrógeno no se cierran las epífisis) pero no lo son: la explicación viene de un artículo de los años 60" (Peds Shelf) [NLM ✔]; NotebookLM lo atribuye al gen **SHOX** (Xp, escapa a la inactivación, necesita dos copias: haploinsuficiencia) [≈: el nombre SHOX no aparece en el texto citado]. Sin folículos → sin estrógeno ni inhibina → **LH y FSH altas** (hipogonadismo hipergonadotrópico) (Peds Shelf) [NLM ✔].
- **Klinefelter**: X extra → apoptosis de células germinales → atrofia testicular → ↓ testosterona → LH/FSH altas; sin testosterona/estrógeno las epífisis no se cierran → talla alta en el adulto, pero **no en el adolescente** ("clásico salvo que eran adolescentes y no eran altos": error real de una alumna centrada en pediatría que descartó Klinefelter por eso) (Peds Shelf; Why 230 Scorers Plateau; Boost Your UWorld Score) [NLM ✔]. Detalle en el fichero repro-msk-psych-path §1.9.
- **No están en las fuentes** (confirmado por dos respuestas): imprinting (Prader-Willi/Angelman), Hardy-Weinberg, PCR, ELISA, mosaicismo como concepto, herencia mitocondrial, Down-leucemia/Alzheimer, X frágil, frameshift/nonsense (solo "missense" en el artículo de electroforesis).

---

## 11. BIOESTADÍSTICA (HY Biostats, dos sesiones íntegras)

### 11.1 Los temas de fondo
- Apertura literal del video: "las preguntas de bioestadística son puntos gratis del USMLE: examinan los mismos conceptos centrales cada vez, pero la mayoría **memoriza las fórmulas de sensibilidad, especificidad y VPP, y eso es pensar al revés** ('backwards thinking'): pierde tiempo y crea errores. El problema no es la matemática: es que no tienes un mapa mental, todo se difumina y no sabes qué pregunta realmente el ítem; con el marco correcto reconoces el patrón al instante" (HY Biostats). Nota: tras esa apertura, el video NO desarrolla sensibilidad/especificidad/VPP (ver §11.5); el "marco" que enseña es exposición-desenlace-relación + diseño + medida + error.
- Todo estudio mira tres cosas: **exposición, desenlace (outcome) y la relación entre ambos**; y en el fondo pregunta una sola cosa: **"¿son diferentes dos (o más) grupos?"** (HY Biostats).
- "Bioestadística son puntos gratis: siempre preguntan los mismos conceptos; el problema no es la matemática sino no tener un mapa mental"; "no soy experto (ni PhD ni máster); llegué a entenderlo al tener que enseñarlo" (HY Biostats).
- Táctica de aprendizaje: explicar cada definición "en inglés llano" ("si suenas técnico pero no puedes dar un ejemplo, no lo entiendes"), repetirla "cinco veces frente al espejo", diseñar tú mismo los cuatro estudios para tabaco/cáncer de pulmón y hacer preguntas de QBank de estadística (HY Biostats).

### 11.2 Diseños
- Retrospectivo = mira atrás; prospectivo = mira adelante; **observacional = el investigador NO controla la exposición**; **intervencional = SÍ la controla** (HY Biostats).
- **Casos y controles**: retrospectivo observacional; se parte del DESENLACE (enfermos vs controles emparejados por edad/sexo/etc.) y se mira atrás la exposición. Es "el estudio más confuso de todos". Medida: **odds ratio**. Sesgo típico: **recuerdo** — quien tiene cáncer cerebral "ha pensado docenas de veces qué lo causó" y recordará más su uso de móvil; ejemplo anestésico: "cero evidencia de que la epidural cause lumbalgia, pero quien tiene lumbalgia recuerda la epidural" (HY Biostats).
- **Cohortes**: prospectivo observacional (retrospectivo existe pero "nunca lo he visto en un examen"); se parte de la EXPOSICIÓN (mucho móvil vs poco) y se sigue la incidencia; "controlas todo excepto la exposición". Medida: **riesgo relativo** (HY Biostats).
- **ECA**: el único intervencional relevante; "tu diseño donde asignas quién usa móvil es un ECA, no una cohorte"; para tabaco sería asignar 50 a fumar — "ningún comité ético lo aprobaría; los ECA son para tratar, no causar" (HY Biostats).
- **Transversal**: foto en un momento; en el ejemplo tabaco sería mirar en el hospital cuántos con cáncer fuman AHORA (malo: ya habrán dejado de fumar); mejor para exposiciones geográficas ("mujeres de 40 en Escocia vs EE. UU. y tasa de EM") (HY Biostats).

### 11.3 OR vs RR (la pregunta de integración estrella)
- **OR**: "si TENGO cáncer cerebral, ¿cuántas veces más probable es que en el PASADO usara mucho el móvil?" (parte del desenlace, mira atrás). **RR**: "si uso mucho el móvil, ¿cuántas veces más riesgo tengo de DESARROLLAR cáncer?" (parte de la exposición, mira adelante). "Suenan iguales, son muy distintas; con una sola tarjeta repasas casos-controles, cohortes, OR y RR" (HY Biostats).
- OR = 2 → los enfermos tienen el doble de odds de haber estado expuestos; RR = 2 → los expuestos tienen el doble de riesgo. RR = 1 → mismo riesgo en ambos grupos; OR = 1 → misma probabilidad de exposición pasada (HY Biostats).
- Pregunta literal: "¿Qué diferencia hay entre un OR de 2 y un RR de 2?" (diapositiva de integración) (HY Biostats).

### 11.4 Hipótesis, p, alfa, beta, poder
- **H0**: no hay diferencia; **H1**: sí la hay ("no dicen 'iguales': dicen 'no diferentes'") (HY Biostats).
- **p** = probabilidad de que la diferencia observada entre los grupos se deba al azar. **p = 0,05 es arbitrario** ("1 de cada 20 veces aceptamos creer que hay diferencia cuando no la hay"). p = 0,1 → 10 % de probabilidad de que sea azar. NO significa "el 3 % de la diferencia es azar" (error típico de estudiante). Reformulación útil de una alumna: "si repito el experimento 100 veces, en 3 la diferencia sería azar y en 97 real" (HY Biostats).
- Truco para no confundir el umbral: piensa en el extremo (p = 0,8 → 80 % azar → nadie lo llamaría significativo); "si lo entiendes nunca dudarás si es por encima o por debajo; el día del examen dudas de todo lo que no entiendes y por eso se acaba el tiempo" (HY Biostats).
- **Tamaño muestral**: ↑ n → ↓ p; RR = 3 con p = 0,03 "parece p alta para tanta diferencia → muestra pequeña"; "pregunta típica: ¿qué cambiarías para bajar la p? → aumentar la muestra" (HY Biostats).
- **Error tipo I** = rechazar H0 cuando es verdadera ("caímos en ese 5 %"); **alfa** = la tasa de error tipo I que fijamos (5 %; en big data mucho menor); por eso los libros dicen "p = alfa". **Error tipo II** = no rechazar H0 cuando es falsa ("triple negativo: no rechazas que no hay diferencia cuando sí la hay"); **beta** = su probabilidad; **poder = 1 − beta**; ↑ n → ↓ beta. Rechazar H0 = aceptar H1 ("lo comprobé anoche: es lo mismo"). Ejemplos: RR 1,2 y p 0,04 → se rechaza H0; RR 1,2 y p 0,06 → no se rechaza (HY Biostats).
- **Significancia estadística ≠ clínica**: té de diente de león que baja la sistólica 2 mmHg con p < 0,05 gracias a 20.000 sujetos; quitar el 90 % de la sal bajaría 5 mmHg "¿lo harías?" (HY Biostats). [NLM ✔ ejemplo reformulado con 50.000 pacientes y 1,5 mmHg.]
- Crisis de replicación: "artículo en PLOS: la mayoría de los estudios publicados son falsos"; nadie repite estudios; la aprobación de ISRS exigía dos ensayos positivos y no se publican los negativos: "con p 10 % en 100 estudios, 10 salen positivos" (HY Biostats).
- Anécdota: una alumna recibió una pregunta de poder en su examen dos semanas después de la clase (HY Biostats).

### 11.5 Sesgos y razonamiento
- **Recuerdo** (casos y controles) — §11.2 (HY Biostats).
- **Selección / "evidencia silenciosa"** (Taleb): 100 ratas irradiadas, sobreviven las 3 más fuertes; concluir que "la radiación fortalece" ignora a las que murieron [NLM ✔ Dedicated Plans].
- **Anclaje y confirmación** clínicos: fijarse en el primer dato y buscar solo lo que lo confirma (ej. síncope en diabético → "neuropatía autonómica" ignorando el bloqueo AV completo a 42 lpm) [NLM ✔ HY FM 2 / HY Cardio 1].
- **Confusión**: solo mencionada como algo que se "controla" emparejando (edad, sexo) (HY Biostats).
- **"Ausencia de evidencia no es evidencia de ausencia"**: "si fuera esto esperaría todos estos síntomas — no necesariamente: clínicamente las enfermedades no se presentan con todos los síntomas" (sensibilidad imperfecta de los signos clínicos; el mismo lema resuelve la viñeta de incontinencia) (HY FM 1; HY FM 2) [NLM ✔]. Es lo más cercano a "sensibilidad" que hay en el cuaderno.
- **Intervalo de confianza**: solo como comentario de alumna ("p = 0,05 es un IC del 95 %, dos desviaciones estándar") que Alec no desarrolla; "t-test" aparece solo como juego de palabras en el artículo de la estrategia STRESS (HY Biostats; STRESS) [NLM ✔].
- **No están en las fuentes** (confirmado por dos respuestas NotebookLM): sensibilidad, especificidad, VPP, VPN, prevalencia, curva ROC (toda mención de "ROC" es "pROCrastinación"), likelihood ratios, SnNout/SpPin, NNT/NNH/ARR/RRR, intervalos de confianza como concepto, lead-time, length-time, observador, Hawthorne, confusión formal, t-test/chi²/ANOVA/correlación, precisión vs exactitud, niveles de prevención, incidencia vs prevalencia cuantitativa. Palmerton remite para stats al "paquete de UWorld" (comentarios, Glass of Wine).

---

## 12. MEDICINA NUCLEAR (HY Nuclear, íntegro)

- **Principio**: se inyecta (normalmente IV) una sustancia con núcleo inestable; se distribuye; al decaer emite radiación que se detecta desde fuera y se localiza en 2D o 3D. **Diferencia con Rx/TC**: en Rx/TC la fuente está FUERA y ves el negativo de lo que atraviesa (2D Rx, 3D TC); en nuclear la fuente está DENTRO del órgano de interés ("la luz brilla desde dentro") → estudio fisiológico ("hot" = captación/perfusión, "cold" = no) (HY Nuclear).
- **Tomografía** = imagen por secciones con una onda penetrante ("la T de TC y de SPECT"). **Gammagrafía (scintigraphy)** = 2D, radiación gamma (tiroides, VQ, HIDA); **SPECT** = 3D, gamma ("scintigraphy es a Rx lo que SPECT es a TC"); **PET** = 3D, positrones (HY Nuclear).
- Cómo llega al órgano: yodo radiactivo va solo a la tiroides ("único órgano que usa yodo": es el propio yodo el que decae, no está 'marcado'); corazón: **tecnecio-99 + sestamibi** ("sexta-MIBI: seis ligandos MIBI alrededor del tecnecio; impresionarás a cualquiera") o **tetrofosmina**; también talio-201; PET: **glucosa marcada (FDG)**; HIDA: ácido hepatobiliar iminodiacético → vesícula (si el cístico está obstruido, la vesícula no se rellena) (HY Nuclear).
- **PET y cáncer (Warburg)**: el tumor capta más glucosa porque suprime la mitocondria (la mitocondria libera citocromo c para apoptosis → suprimirla evade la apoptosis pero pierde la fosforilación oxidativa) → depende de glucólisis anaeróbica, ineficiente → "brilla". Corazón y **vejiga** brillan (glucosa > 200 mg/dL supera la reabsorción renal); ayuno previo para que el tumor esté "hambriento"; PET-TC = dos escáneres superpuestos; el TC se hace en apnea y el PET no (dura minutos) → un nódulo pulmonar se desplaza entre ambos y uno pleural no (dato de un radioncólogo) (HY Nuclear).
- **Gammagrafía tiroidea**: días antes evitar yodo (sal yodada, amiodarona…) porque compite por el transportador; misma lógica que el KI en Fukushima 2011 (HY Nuclear).
- **Nódulo frío vs caliente**: el cáncer "por lo general no produce hormona" (cuanto más maligno, menos se parece a la célula original) → frío = sospechoso, caliente = tranquilizador; los tumores que secretan suelen ser adenomas (prolactinoma); excepción: paraneoplásicos (microcítico). La hipótesis de "necrosis central por falta de riego" es parcial ("si todas las células necrosaran no habría cáncer") (HY Nuclear).
- **VQ**: ventilación = inhalador con radiofármaco; perfusión = inyección IV; ambas gammagrafías; defecto de perfusión con ventilación normal = TEP (ejemplo: puérpera con disnea súbita → embolia de líquido amniótico) (HY Nuclear).
- **Perfusión miocárdica con estrés**: angina estable = estenosis fija (> 70 % de la luz) → isquemia SOLO cuando la demanda supera la oferta → en reposo la gammagrafía puede ser normal → el estrés (cinta 5 min hasta FC objetivo; o **dobutamina** β1 si no puede: cadera rota, ICC grave) reproduce la demanda → "isquemia reversible" (defecto en estrés, normal en reposo); cortes de eje corto/largo con territorios DA/CD/Cx (HY Nuclear).
- **Cronología fisiopatológica** del caso: "55 años, DM2, anemia normocítica, ERC, disnea de esfuerzo, PA 141/93, IMC 35, SPECT reposo/esfuerzo con Tc-99" → nace sano → malos hábitos → DM2/obesidad → ateroesclerosis coronaria → estenosis > 70 % → angina estable → isquemia con el esfuerzo; ERC → ↓ EPO → anemia normocítica (rama paralela, no causal de la coronariopatía); la disnea de esfuerzo es inespecífica (corazón, pulmón, anemia) → el test de esfuerzo sirve para saber si es coronariopatía (HY Nuclear).
- Método de lectura: Alec lee la viñeta "tan despacio como en el examen real, pensando mientras leo, y terminaba con tiempo de sobra; el problema del tiempo es leer dos veces" (HY Nuclear).
- Juego "¿es medicina nuclear?": ecografía no (sonido), PET sí, tiroides con I-123 sí, Rx no, HIDA sí, talio sí, RM no (HY Nuclear).

---

## 12b. CHEAT SHEETS CARDIO-RENALES CON CARGA FARMACOLÓGICA (artículos yousmle leídos íntegros)

### 12b.1 Potencial de equilibrio / Nernst (Nernst)
- Definiciones: potencial de membrana Vm = "voltage inside − outside"; **potencial de equilibrio = potencial de membrana al que NO hay flujo neto del ion** (= potencial de Nernst para un ion individual). Los iones fluyen "de alta a baja concentración" cuando el canal está abierto (Nernst).
- Distribución: **K+ intracelular** (en el panel metabólico, extracelular, ≈ **4,0 mEq**); **Na+ extracelular** (≈ **140 mEq**); Cl− y Ca2+ extracelulares. En reposo la mayoría de canales abiertos son de K+ → el potencial de reposo se aproxima al Nernst del K+ (Nernst).
- Mecánica con el K+: el gradiente de concentración lo EMPUJA fuera; al salir deja negatividad dentro y el gradiente eléctrico lo ATRAE dentro; el flujo se detiene cuando "forces pushing it OUTSIDE (concentration) = forces pulling it INSIDE (electrical)" (Nernst).
- Preguntas literales: ¿dónde tiene que estar el Na+ para que su Nernst sea positivo? → fuera (entra → carga positiva dentro). ¿El Cl− para Nernst negativo? → fuera (entra → negativo dentro). ¿El Ca2+ para **+125 mV**? → fuera. Si abres los cuatro canales a la vez: Na+, Ca2+ y Cl− entran; **solo el K+ sale** (Nernst).
- "Hay acumulación de partículas (normalmente) negativas dentro y positivas fuera"; el artículo no da cifras de hiper/hipopotasemia (Nernst). Enlace: el Ca2+ extracelular fija el UMBRAL (§5.6, §7.5), no el potencial de reposo.
- Método: "the USMLE is a test of **understanding**"; tarjetas patogénesis → presentación, inversas, negritas (Nernst).

### 12b.2 Antiarrítmicos y potencial de acción (Antiarrítmicos)
- Regla base: abrir canales de **Na+ o Ca2+ = despolariza**; abrir **K+ = repolariza** (Antiarrítmicos).
- **Miocito ventricular (5 fases)**: fase 0 = entrada de Na+ (QRS); fase 1 = se cierra Na+, se abre K+ (repolarización inicial); fase 2 = **meseta**: K+ sale y Ca2+ entra por canales L ("minimal change in net membrane potential" = segmento ST plano); fase 3 = más K+ (onda T); fase 4 = reposo mantenido por **I_K1** (Antiarrítmicos) [NLM v4].
- **Tejido nodal (3 fases: 0, 3, 4)**: carece de I_K1 → el potencial diastólico máximo solo llega a ≈ **−60 mV** → a ese voltaje los canales de Na+ siguen INACTIVADOS ("para activar un canal de Na+ primero hay que quitarle la inactivación") → **la fase 0 nodal usa Ca2+, no Na+**; fase 3 = inactivación de Ca2+ + apertura de K+; fase 4 = despolarización diastólica lenta por canales "leaky"/funny de Na+/Ca2+; no hay fases 1 ni 2. Canales **I_KG** que responden a ACh → eflujo de K+ → hiperpolarización → bradicardia (Antiarrítmicos) [NLM v4].
- Conducción: SA → aurícula → AV → His-Purkinje → ventrículos por uniones gap (Antiarrítmicos).
- **Clase I** (bloqueo de Na+): enlentece la fase 0 solo en tejido NO nodal; **IA además bloquea K+** → retrasa la fase 3 → **QT largo → torsades**; IB "efectos opuestos sobre el K+"; IC = máximo enlentecimiento de la fase 0. **Clase II** (β-bloqueantes): ↓ pendiente de fase 4 en el nodo SA → ↓ FC; enlentecen el AV → **PR largo** (Antiarrítmicos) [NLM v4].
- **Clase III** (bloqueo de K+): retrasa la fase 3 → QT largo → **torsades de pointes** ("crítico para Step 1"). **Clase IV** (bloqueo de Ca2+): ↓ pendiente de fase 4/fase 0 nodal → ↓ FC y **PR largo** ("tarda más la señal de la P al ventrículo") (Antiarrítmicos) [NLM v4].
- Método: pasar las preguntas a tarjetas con términos en negrita y crear inversas (Antiarrítmicos).

### 12b.3 Ecuación del gas alveolar, acetazolamida y mal de altura (Gas alveolar)
- **PAO2 = PIO2 − PACO2/R**; a nivel del mar **PIO2 = (760 − 47) × 0,21 = 150** (el vapor de agua, 47 mmHg, desplaza gas). Ejemplo extremo: O2 al 100 % a 2 atm → PAO2 = (1520 − 47) − 40/0,8 = **1423 mmHg** (Gas alveolar).
- Terminología: PAO2 alveolar vs PaO2 arterial; hipoxemia = PaO2 bajo; hipoxia = O2 tisular bajo. Ácido-base: respiratorio = PACO2 (bajo → alcalosis; alto → acidosis); metabólico = HCO3− (alto → alcalosis; bajo → acidosis); cada uno compensa al otro (Gas alveolar).
- **La conexión con diuréticos**: mal de altura = hipoxemia por PAO2 bajo de la presión atmosférica baja → **acetazolamida** (inhibidor de anhidrasa carbónica → bloquea la reabsorción de HCO3− → acidosis metabólica) → compensación con hiperventilación → ↓ PACO2 → por la ecuación, ↑ PAO2 → alivia la hipoxemia (Gas alveolar) [NLM v4].
- Otras preguntas literales: al despertar de la anestesia, reducir el soporte ventilatorio deja subir la PaCO2 y estimula el impulso respiratorio propio; el EPOC "retenedor crónico de CO2" depende del **impulso hipóxico** → dar O2 a un paciente con saturación basal ≈ 90 % "puede paradójicamente parar la respiración" e hipercapnia; intoxicación por CO → O2 al 100 % y, si se puede, presión atmosférica mayor (hiperbárica) para subir la PAO2 (Gas alveolar).

### 12b.4 Diuréticos de asa vs tiazidas e hiponatremia (HY Renal 2; HY FM; guía maestra) [NLM v4]
- **Furosemida** bloquea el cotransportador Na+/K+/2Cl− de la rama ascendente gruesa → desaparece el gradiente hipertónico de la médula → aunque haya ADH y acuaporinas en el colector, no hay fuerza osmótica que saque agua → la orina queda **isotónica (≈ 300) en toda la nefrona**, "no puede concentrar ni diluir" → **los diuréticos de asa rara vez dan hiponatremia**.
- **Tiazidas** bloquean el cotransportador Na+/Cl− del túbulo contorneado distal sin tocar la médula → el multiplicador contracorriente sigue intacto → la ADH sigue reabsorbiendo agua libre → **hiponatremia severa** más probable.

---

## 13. PUNTOS CLAVE DE ESTA CLAVE (resumen)
1. Un principio ("likes dissolve likes": pequeño, lipofílico, sin carga cruza CUALQUIER membrana) sustituye miles de hechos: cafeína, antiepilépticos/teratógenos, metilnaltrexona, lidocaína en absceso, lactulosa, heparina vs warfarina, fisostigmina vs neostigmina, bilirrubina directa/orina oscura (Memory Hack; HY GI).
2. Mazo de farmacología aparte: tarjetas simples "fármaco – mecanismo/uso/toxicidad" con inversa, ≤ 2-3 hechos por tarjeta, toxicidades agrupadas por mecanismo y efectos adversos ESPECÍFICOS; hacerlas por la noche, revisarlas por la mañana; ~1.800 tarjetas a 20/día = 90 días (Glass of Wine).
3. PK que sí está: Vd = dosis/concentración; 5 vidas medias (factor VII 3-6 h → PT primero; albúmina 20 días); proteína C ~1 día → puente con heparina; Km ≠ ½ Vmax; potencia = moléculas para el mismo efecto. Orden cero/uno, CYP, índice terapéutico NO están (HY Biochem; HY GI; Coag 1-2; HY Pharm 2).
4. Gases: onset ∝ 1/solubilidad en sangre (coef. sangre-gas); potencia ∝ liposolubilidad (Meyer-Overton, coef. aceite-gas); MAC iso 1,2 / sevo 1,8 / des 6,6 / N2O ≈ 100 % (HY Pharm 1).
5. Unión neuromuscular: M1 cerebro/M2 corazón/M3 resto; M2-Gi-I_KG → bradicardia; succinilcolina (fasciculaciones, estado inactivado, hiperpotasemia en quemados/ictus, hipertermia maligna con ↑CO2 como primer signo) vs no despolarizantes (reversión con neostigmina; miastenia = más succinilcolina, menos curare) (HY Pharm 2; Antiarrítmicos).
6. Baroreflejo = MAP = CO × TPR (β1 ↑ CO, α1 ↑ TPR; "los reflejos nunca sobrecompensan"); neuropatía autonómica → CPP = MAP − ICP cae → síncope; diarrea por parasimpático sin oposición (#1 Cardio Equation; HY Cardio).
7. Tóxicos por mecanismo: cianuro (Fe3+ del complejo IV, "triple screwed", nitrito → metaHb + tiosulfato), aspirina/2,4-DNP/termogenina (desacopladores; alcalosis respiratoria + acidosis láctica), digoxina (bomba Na/K; toxicidad en hipopotasemia), botulismo (SNARE), β-bloqueantes (glucagón por Gs), metanol (etanol), yodo radiactivo (KI). NAC, pralidoxima, naloxona, flumazenil, deferoxamina, fomepizol, azul de metileno NO están (HY Biochem; Digoxina; HY Endo; UW+FA 4 Keys; HY Nuclear).
8. Bioquímica = "cheat code": solo se pregunta el paso regulado/primer paso/clínico; acetil-CoA central (no hace glucosa); von Gierke (G6Pasa: 3-4 h, lactato, colesterol/TG, urato, hepatomegalia) vs MCAD (12-16 h, sin cetonas, C6-C10) vs McArdle; estatinas bajan LDL por ↑ receptores de LDL (HY Biochem).
9. Vitaminas verificadas: folato/B12 (trampa del metilfolato; MMA), B6/ALA sintasa, D (1-α-hidroxilasa: ERC vs sarcoidosis), K (γ-carboxilación); B1, niacina, C sin cita válida; A no está (HY Heme; HY Endo; Coag).
10. Genética: enzima que falta → recesivo; canal hiperactivo → dominante; haploinsuficiencia; X-inactivación sesgada; anticipación; Southern/Northern/Western y electroforesis de Hb ("A acelera, S se desliza, C gatea") (HY Pharm 2; HY Biochem; Peds Shelf; Electroforesis).
11. Bioestadística = exposición-desenlace-relación; casos-controles (OR, mira atrás, sesgo de recuerdo) vs cohortes (RR, mira adelante) vs ECA; p = probabilidad de que la diferencia sea azar (0,05 arbitrario); α/β/poder/n; significancia ≠ relevancia clínica. Sens/esp/VPP/ROC/NNT/IC NO están pese a mencionarse en la apertura (HY Biostats).
12. Nuclear: fuente DENTRO del órgano; gammagrafía 2D / SPECT 3D / PET positrones; Warburg-FDG; nódulo frío = sospechoso; VQ; estrés con dobutamina β1; cronología fisiopatológica del caso (HY Nuclear).
13. Cheat sheets: Nernst (K+ 4,0 / Na+ 140 / Ca2+ +125 mV; reposo ≈ Nernst del K+); antiarrítmicos (fase 0 nodal por Ca2+ a −60 mV; IA/III → QT/torsades; II/IV → PR); gas alveolar PAO2 = PIO2 − PACO2/R (150 a nivel del mar; acetazolamida en altura); asa (orina isotónica, poca hiponatremia) vs tiazidas (hiponatremia); panel de hierro (ferropenia TIBC ↑ vs enfermedad crónica ferritina ↑/TIBC ↓ por hepcidina-IL-6) (Nernst; Antiarrítmicos; Gas alveolar; HY Renal 2; Panel de hierro).

---

## 14. PENDIENTES / VACÍOS DECLARADOS (para pendiente_usuario)

1. **Las cuatro consultas NotebookLM de esta sesión respondieron** (8-40 min cada una, lanzadas en paralelo con `notebook_query_start`); no queda ninguna en curso para esta clave. Respuestas crudas en el scratchpad `palmerton_v3/`: `q_biochem_biostats3_answer.md` (+ `_citmap.txt`, `_srccount.txt`) y la de antídotos/autonómicos (volcada íntegra en §3, §6, §7, §12b; la API devolvió `references: []`).
2. **A VERIFICAR (5-sep)** (afirmado por NotebookLM sin cita válida en una fuente Palmerton): escorbuto/vitamina C-colágeno; hiperamonemia en MCAD por falta de ATP en el ciclo de la urea; acetil-CoA como activador de la piruvato carboxilasa; nombre del gen SHOX; ejemplo de Marfan para expresividad. **Descartados** (NotebookLM declaró de noche que NO están): B1/Wernicke-beriberi, niacina/pelagra/Hartnup, isoniazida-B6. **Resueltos** en esta sesión: botulismo/SNARE (HY Endo), digoxina/Trousseau (artículo leído), glucagón/β-bloqueantes (UW+FA 4 Keys), colestasis/orina oscura (HY GI), vitamina C-metahemoglobinemia (258 en 6 semanas), vitamina E (HY Neuro 2).
3. **Studio**: existe un fichero `farmacologia-y-metodo-palmerton.md` (artifact `8746012c-8ff0-4539-a013-feb726ebe71d`, tipo "unknown") generado hoy en el cuaderno; `download_artifact` falló. Abrirlo desde la web (panel Studio) por si contiene algo no volcado aquí.
4. **Confirmado que NO está en el cuaderno** (dos sesiones; no buscar más ahí; cubrir con UWorld/First Aid): PK de orden cero/uno, dosis de carga/mantenimiento, CYP450, índice terapéutico, agonista parcial, eficacia; segundos mensajeros α/β/M1/M3 (salvo Gs), curvas autonómicas con epi/NE/iso/fenilefrina; antídotos NAC, pralidoxima, naloxona, flumazenil, deferoxamina, fomepizol, azul de metileno; vitaminas A, B1, B3, B6-isoniazida; PKU, homocistinuria, galactosemia, intolerancia a la fructosa, Pompe/Cori, lisosomales, porfirias, Lesch-Nyhan, ciclo de la urea/alcaptonuria; imprinting, Hardy-Weinberg, PCR, ELISA, mitocondrial, X frágil, Down-leucemia; sensibilidad/especificidad/VPP/VPN, ROC, likelihood ratios, NNT/ARR/RRR, IC, lead-time/length-time, Hawthorne, pruebas estadísticas, precisión/exactitud, prevención, incidencia/prevalencia.
