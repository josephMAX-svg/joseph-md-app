# PALMERTON v3 · EXTRACTO FINAL — HEMATOLOGÍA · INMUNOLOGÍA · MICROBIOLOGÍA/ID

Cuaderno NotebookLM "STEP 1 · Palmerton Engine" (`6b39b85e-1450-49aa-a5ca-c31f9d659f86`, **295 fuentes**: ~146 vídeos + 149 artículos de yousmle.com). Versión final consolidada el **8-sep-2026** a partir de: (1) las **transcripciones y artículos íntegros guardados en local** (`clean_heme/`: High Yield Hematology, High Yield Immunology, Coagulación Parte 1 y 2, Panel de hierro, Vacunas conjugadas/ABO, Electroforesis de Hb, +RNA/-RNA, MONA/THROMBINS2), leídos línea a línea en esta sesión; (2) la respuesta NotebookLM previa de vacíos de hematología (`nlm_gaps_heme_answer.md`); (3) el framework de lectura CCSN (`ua_q1_lectura_answer.md`) y el resumen del método (`ua_q2_casos_answer.md`); (4) **tres consultas NotebookLM nuevas** lanzadas hoy (inmunología, microbiología/ID, hematología-complemento), cotejadas contra lo leído en local. Cada punto lleva su fuente entre paréntesis.

## AVISO DE COBERTURA (lo primero que hay que saber)

- El cuaderno tiene **un vídeo dedicado de Hematología y uno de Inmunología**, y **CUATRO artículos** que sostienen casi todo lo demás de este bloque (Coagulación 1 y 2, Panel de hierro, Vacunas conjugadas/ABO, Electroforesis de Hb, +RNA/-RNA).
- **NO existe ningún vídeo ni artículo dedicado de MICROBIOLOGÍA/ID.** Rastreados los 295 títulos, los únicos con contenido microbiológico son: *Why Does the USMLE Step 1 Care if a Virus Has +RNA or -RNA?*, *Could You Connect Conjugate Vaccines and ABO Incompatibility*, y **digresiones** dentro de High Yield Immunology (Proteus/XGP, absceso, hepcidina/Listeria, TB/granuloma, VIH/IRIS), High Yield GI (E. coli/SUH, serología de hepatitis) y los artículos de farmacología (metronidazol, fluoroquinolonas, vancomicina). **Hongos, parásitos, betalactámicos, aminoglucósidos, macrólidos y antivirales NO están** (declarado explícitamente por NotebookLM en la consulta de hoy).
- El **vídeo de Inmunología NO es un vídeo de inmunología clásica**: es un vídeo sobre **inflamación crónica, citocinas y granulomas**, que termina con la disección de una viñeta NBME completa (pielonefritis xantogranulomatosa). MHC, hipersensibilidades e inmunodeficiencias aparecen dispersos en el artículo de vacunas conjugadas y en Family Medicine.
- El **vídeo de Hematología** cubre: marcadores de muerte celular → clasificación de anemias por VCM → ejemplos aplicados. **No** cubre leucemias con detalle (Alec lo anuncia como "la próxima sesión" y esa sesión **no está** en el cuaderno).

## CONVENCIÓN

Sin marca = **leído íntegro en la transcripción/artículo local** (fiabilidad máxima) · `[NLM-inm]`, `[NLM-mic]`, `[NLM-hem]` = respuesta NotebookLM de esta sesión (8-sep) · `[NLM-gaps]` = respuesta NotebookLM previa (`nlm_gaps_heme_answer.md`) · `[A VERIFICAR (08-sep)]` = afirmado sin poder cotejarlo contra la fuente en local · `⚠ CORRECCIÓN` = NotebookLM dijo "no está en las fuentes" pero **sí está**, verificado por mí en el texto local.

**Estructura de cada subtema**: **ANCLA** = mecanismo causal como lo explica Palmerton · **EXAMEN** = pregunta típica y disfraz · **ERROR** = confusión que él señala · **FRASE/ANALOGÍA** = literal o mnemónico · **VIÑETA** = ejemplo con cifras.

## LEYENDA DE FUENTES

(HY Heme) = *High Yield Hematology for Shelf Exams & Step 1 + Step 2 CK* · (HY Immuno) = *High Yield Immunology for Shelf Exams & Step 1 + Step 2 CK* · (Coag 1) / (Coag 2) = *How Can You Master Coagulation for the USMLE Step 1?* Part 1 / Part 2 · (Panel Fe) = *Can You Connect the Mechanism of Anemia with the Iron Panel Results on the USMLE Step 1?* · (ABO/Vacunas) = *Could You Connect Conjugate Vaccines and ABO Incompatibility for the USMLE Step 1?* · (Electroforesis) = *Gel electrophoresis (Southern, Northern, Western Blot), Hemoglobin Electrophoresis (HbC, Sickle cell disease) for USMLE Step 1* · (±RNA) = *Why Does the USMLE Step 1 Care if a Virus Has +RNA or -RNA?* · (MONA) = *MONA / THROMBINS2* · (Memory Hack) = *USMLE Step 1 Pharmacology: The Ultimate Memory Hack* · (Glass of Wine) = *How to Master Step 1 Pharmacology Over a Glass of Wine* · (HY FM 1 / FM 2) = *High Yield Family Medicine Review* Part 1 / Part 2 · (HY GI 1 / GI 2) = *High Yield GI for Shelf Exam* · (HY Cardio 1 / 2) = *High Yield Cardiology* · (HY Biochem) = *High Yield Biochemistry* · (HY Endo) = *High Yield Endocrinology* · (HY Peds) = *High Yield Pediatrics Review* · (HY Surgery) = *High Yield Surgery Review* · (CCSN) = *The ONLY Video You Need to Pass the USMLE Step 1 in 2026* + *The Secret to Scoring 250/260+: Question Interpretation* · (UW+FA) = *UWorld + First Aid: 4 Keys to Mastery*.

---

## 0. MAPA DE COBERTURA

| Subtema del temario | Cobertura | Dónde |
|---|---|---|
| Anemias por VCM, panel de hierro, hepcidina | **COMPLETA** (cifras exactas, analogía del globo, 3 perfiles de hierro) | §1-§5 |
| Frotis (bite cells, esquistocitos, cuerpos de Heinz) | PARCIAL: G6PD sí; **esferocitosis, Howell-Jolly, esplenectomía NO están** | §8, §9, §17-bis |
| Hemólisis intra vs extravascular | COMPLETA vía `[NLM-gaps]`; ⚠ conflicto sobre haptoglobina | §7 |
| Coagulación PT/PTT, warfarina, heparina, HIT | **COMPLETA y literal** (artículos íntegros) | §11-§13 |
| Plaquetas: PTI / PTT / SUH / CID | COMPLETA vía `[NLM-gaps]`; **ADAMTS13 sí aparece** (plasmaféresis) | §14 |
| Hipercoagulabilidad: Virchow, F V Leiden, ACO | COMPLETA (artículo + caso CCSN) | §12, §15 |
| Leucemias / linfomas / mieloma | **PARCIAL**: solo Burkitt t(8;14) desarrollado + mieloma CRAB/riñón; el resto NO | §17 |
| Transfusión: ABO/Rh, Coombs, TRALI/TACO | COMPLETA; reacciones febril/alérgica/IgA **NO están** | §16 |
| Inmunidad innata/adaptativa, citocinas, granuloma | **COMPLETA y literal** (vídeo íntegro) | §18-§20 |
| MHC, cambio de isotipo, vacunas conjugadas | **COMPLETA y literal** (artículo íntegro) | §21-§22 |
| Hipersensibilidades I-IV | PARCIAL: IV completa y literal; I-III vía `[NLM-inm]` con ejemplos | §23 |
| Inmunodeficiencias por patrón | **CASI VACÍO**: solo BTK a los 6 meses (⚠ sí está) y fiebre ausente con CD4 bajo / IRIS | §24 |
| Autoinmunidad | PARCIAL: LES (hipótesis menstruación/estrógeno), plasmaféresis en miastenia y PTT | §25 |
| Bacterias, virus, hongos, parásitos | **VIRUS: completa por concepto** (±RNA). **Bacterias: fragmentos.** **Hongos y parásitos: VACÍO** | §27-§31, §33 |
| Antimicrobianos | **CASI VACÍO**: solo química físico-farmacológica (metronidazol, FQ, vancomicina) | §32 |

---

# PARTE I · HEMATOLOGÍA

## 1. El marco maestro: "¿se están CREANDO o DESTRUYENDO los glóbulos rojos?"

### ANCLA
Palmerton abre el vídeo diciendo que la hematología parece difícil porque **se estudia a trozos** —anemia, hemólisis, fallo medular— como si fueran problemas distintos, **y no lo son** (HY Heme). El error concreto: *tratar el recuento de reticulocitos y el VCM como herramientas de clasificación en lugar de como señales fisiológicas* (HY Heme).

Cadena causal única:
1. **El eritrocito = un globo lleno de hemoglobina.** Su único trabajo es transportar O₂ vía el hemo (HY Heme; Panel Fe).
2. **Si el problema está en fabricar hemoglobina** → el globo se llena menos → **microcítico** (VCM **< 80 fL**) (Panel Fe).
3. **Si el problema está en sintetizar ADN** → la mitosis se retrasa mientras el globo se sigue llenando → se "sobre-llena" → **macrocítico** (VCM **> 100 fL**) (Panel Fe; HY Heme).
4. **Si el problema es de NÚMERO** (hemólisis, sangrado, falta de estímulo/EPO) → los que quedan son de tamaño normal → **normocítico** (VCM **80-100 fL**) (Panel Fe; HY Heme).
5. **Reticulocitos** = el único indicador de si la médula está respondiendo. Anemia + reticulocitos bajos = **fallo de producción**, y entonces se deconstruye en tres variables: cofactores de replicación del ADN (folato/B12), estímulo hormonal (EPO) o sustrato de hemoglobina (hierro) `[NLM-gaps]`.

### EXAMEN
La pregunta nunca es "¿qué es la anemia sideroblástica?": describen un escenario y la única forma de acertar es **aplicar** la vía de síntesis del hemo (CCSN). El disfraz típico es dar VCM + panel de hierro + reticulocitos sin nombrar la enfermedad.

### ERROR
- Usar VCM y reticulocitos como **casillas de clasificación** en vez de como señales fisiológicas (HY Heme).
- Confundir **volumen** (VCM, tamaño de cada hematíe) con **número** (cuántos hay). Alec dedica un intercambio entero a desenredar esto con una alumna: *"anemia just means low hemoglobin… you can either not have enough hemoglobin, or just not have enough red blood cells"* (HY Heme).
- Olvidar que en la fase de recuperación una respuesta reticulocitaria vigorosa **sube el VCM** (los reticulocitos son grandes), por lo que una hemorragia puede leerse transitoriamente como macrocítica (HY Heme).

### FRASE / ANALOGÍA
> *"Think of RBC as a big balloon full of hemoglobin. If there is less hemoglobin, the balloon will be less full."* (Panel Fe)
> *"The questions come down to one question: are red blood cells being created or destroyed?"* (HY Heme)

### VIÑETA
Anemia + VCM 72 fL + reticulocitos inadecuadamente bajos → problema de **producción de hemoglobina** (hierro o globina), no de destrucción. Anemia + VCM 88 fL + reticulocitos altos → **destrucción o pérdida** con médula sana.

---

## 2. Marcadores de muerte celular: por qué la LDH sirve (y por qué engaña)

### ANCLA
Palmerton construye el concepto desde la troponina, no desde la LDH (HY Heme):
1. Un marcador celular se mide **en suero**, y solo aparece ahí si la **membrana se rompió** y las proteínas intracelulares se fugaron.
2. La troponina (T e I) es **específica** de miocito cardíaco; la **CK es inespecífica** (sube en IAM y en rabdomiólisis).
3. **La LDH cataliza piruvato + NADH ⇄ lactato + NAD⁺.** Su función real es **regenerar NAD⁺** cuando la cadena de transporte de electrones no puede hacerlo (sin O₂ o **sin mitocondrias**), para que la glucólisis siga produciendo ATP.
4. **El hematíe maduro no tiene mitocondrias** → depende exclusivamente de la glucólisis anaerobia → **siempre está fabricando LDH** → cuando se lisa, la vuelca a la sangre.
5. Pero como la LDH está en casi toda célula del cuerpo, es un marcador **muy inespecífico**: *"one of the few markers that you can use for red blood cells"*, no un marcador exclusivo (HY Heme).
6. **Bilirrubina indirecta**: producto final de la degradación del hemo tras destrucción esplénica; al saturarse la conjugación hepática se acumula en suero, es **lipofílica, insoluble y unida a albúmina → NO se filtra → NO hay coluria en la hemólisis extravascular pura** `[NLM-gaps]`.

### EXAMEN
Preguntan qué marcador confirma destrucción eritrocitaria y ponen LDH junto a troponina/CK: hay que razonar que LDH sube porque el hematíe la tiene en abundancia **por carecer de mitocondrias**, no porque sea específica.

### ERROR
- Decir que la LDH es "específica porque está en todas las células" — inversión exacta del término que Alec corrige en directo: *"when I say specific I mean it's only found in one particular kind of cell"* (HY Heme).
- Contestar que el hematíe **no** genera LDH porque no tiene mitocondrias: es al revés, **precisamente por eso** la genera sin parar (HY Heme).

### FRASE / ANALOGÍA
> *"If you think of the cell as sort of like a balloon and these special proteins are like marbles — if the balloon pops and the marbles leak out, you should only see the marbles if there's been damage to the balloon."* (HY Heme)
> Digresión de primer principio que él marca como "concepto de Step 1": la mitocondria fue **una bacteria fagocitada** por una célula eucariota en una simbiosis — *"hey, you make my ATP for me and I'll provide you with glucose"* (HY Heme).

### VIÑETA
LDH ↑↑ + bilirrubina indirecta ↑ + haptoglobina indetectable + esquistocitos → hemólisis intravascular. LDH ↑ aislada, sin anemia → inespecífico: puede ser músculo, leucocitos o tumor.

---

## 3. Anemias microcíticas y el PANEL DE HIERRO (el corazón del bloque)

### ANCLA (definiciones que hay que tener antes)
- **Hemo** ≠ **hemoglobina**: el hemo es una **molécula** porfirínica que contiene hierro; **el hierro es el que une el O₂**. La hemoglobina es una **proteína** de 4 subunidades de globina, cada una con 1 molécula de hemo (Panel Fe).
- **Metahemoglobina** = hemoglobina con **Fe³⁺** en vez de Fe²⁺; el Fe³⁺ **une O₂ muy mal** (Panel Fe).
- **Ferritina** = forma de almacenamiento del hierro (en macrófagos de médula ósea); la ferritina sérica correlaciona con el hierro total almacenado (Panel Fe).
- **Transferrina** = transportador de hierro en sangre. **Saturación de transferrina** = % de transferrina unida a hierro — *"analogous to hemoglobin saturation, which is the % of total hemoglobin bound to O₂"* (Panel Fe).
- **TIBC** = refleja la **cantidad total de transferrina**. **Correlación NEGATIVA TIBC ↔ ferritina.**
- **Ferroportina** = saca hierro a la sangre desde (a) enterocitos y (b) macrófagos de médula ósea (Panel Fe).
- **Hepcidina** = regulador mayor: **internaliza y degrada la ferroportina** (mayúsculas en el original) (Panel Fe).

### ANCLA (los tres perfiles, deducidos, no memorizados)
| | Hierro sérico | Sat. transferrina | Ferritina | TIBC |
|---|---|---|---|---|
| **Ferropenia** | ↓ | ↓ | **↓** | **↑** |
| **Enfermedad crónica** | ↓ | ↓ | **↑** | **↓** |
| **Sideroblástica** | ↑ | ↑ | **↑** | **↓** |

Razonamiento (Panel Fe):
- **Ferropenia**: falta hierro → hierro sérico y saturación bajan; los depósitos se vacían → ferritina ↓ → **y como ferritina y TIBC son inversos, TIBC ↑** ("mi cuerpo está *buscando* hierro").
- **Enfermedad crónica**: inflamación → **IL-6** → **hepcidina** → degrada ferroportina → el hierro queda **atrapado** en enterocitos y macrófagos → hierro sérico y saturación ↓ (igual que la ferropenia hasta aquí) **pero ferritina ↑ → TIBC ↓**. Ese es el punto exacto de discriminación.
- **Sideroblástica**: defecto en la **síntesis del hemo**. La absorción de hierro está intacta → hierro sérico y saturación **↑**, ferritina ↑ → TIBC ↓, y el VCM baja porque falta hemo.

### EXAMEN
Dan los cuatro valores del panel sin decir el diagnóstico y piden el mecanismo. La discriminación ferropenia vs enfermedad crónica **se juega en ferritina y TIBC**, nunca en hierro sérico.

### ERROR
Memorizar la tabla de los tres perfiles como una lista. Alec insiste en que **basta con dos reglas** (ferritina = depósitos; TIBC inversamente proporcional a ferritina) para regenerar la tabla entera (Panel Fe).

### FRASE / ANALOGÍA
> *"High TIBC indicates your body is 'looking for iron'."* (Panel Fe)

### VIÑETA
Varón de 62 años, Hb 9,8 g/dL, VCM 74 fL, ferritina 8 ng/mL, TIBC alto → ferropenia → siguiente pregunta obligada: **colonoscopia** (ver §4).

---

## 4. Anemia de enfermedad crónica: hepcidina como arma nutricional

### ANCLA
La cadena completa: inflamación crónica → **IL-6** (macrófagos) → **hepcidina** hepática (reactante de fase aguda) → **degrada la ferroportina** → (a) ↓ absorción intestinal de hierro y (b) ↓ liberación desde los macrófagos de médula → hierro insuficiente para el hemo → hemoglobina ↓ (Panel Fe).

**El "por qué" teleológico** —que Alec desarrolla en directo en el vídeo de inmunología— es lo que hace que no se olvide: **hay bacterias que prosperan en ambientes ricos en hierro** (menciona **Listeria** y el riesgo aumentado en **cirrosis y hemocromatosis**), así que el cuerpo **le quita el hierro de la sangre a la bacteria** (HY Immuno; Panel Fe).

### EXAMEN
Paciente con AR o EII de años + anemia normo/microcítica: piden el mecanismo → IL-6/hepcidina/ferroportina, con ferritina ALTA.

### ERROR
Suponer que ferritina alta descarta anemia: en la enfermedad crónica la ferritina alta es **el hallazgo**, no la exclusión.

### FRASE / ANALOGÍA
> *"If I have high hepcidin levels (e.g. in infection) → want to sequester iron from iron-loving bacteria, which need iron for their growth."* (Panel Fe)
> *"You are starving the bacteria."* (HY Immuno)

Alec admite que es una **hipótesis teleológica no demostrable** y la usa igualmente porque *"it's much better to have a story where all the facts fit together than to memorize disparate things"* (HY Immuno).

---

## 5. Anemias macrocíticas: la trampa del metilfolato

### ANCLA
- **Folato**: el tetrahidrofolato (THF) es el transportador de carbonos (CH, CH₂, CH₃) del cuerpo; se usa en **síntesis de purinas y de dTMP**. Sin él, no hay ADN → macrocitosis (HY Heme).
- **B12**: solo hay **DOS enzimas dependientes de B12 en todo el cuerpo** (HY Heme):
  1. **Homocisteína metiltransferasa / metionina sintasa** (homocisteína → metionina) — **usa además metil-THF**.
  2. **Metilmalonil-CoA mutasa** (metilmalonil-CoA → succinil-CoA).
- **La trampa**: la conversión de metil-THF a otras formas de THF es **irreversible**; el metil-THF *solo* se libera **gastándose** en la reacción de la metionina sintasa. Sin B12 esa reacción se detiene → **todo el folato queda atrapado como metil-THF** y no puede entrar en la síntesis de ADN. De ahí la macrocitosis de la deficiencia de B12 (HY Heme).
- **Hidroxiurea**: inhibe la **ribonucleótido reductasa** (ribonucleótidos → desoxirribonucleótidos) → bloquea síntesis de ADN → **macrocitosis** (Panel Fe).

### EXAMEN
Piden el mecanismo de la macrocitosis en el déficit de B12 (no el diagnóstico). La respuesta es la trampa del metilfolato, no "B12 hace falta para el ADN".

### ERROR
- Decir que el déficit de B12 causa macrocitosis "porque se acumulan nucleótidos": Alec corta esa respuesta en directo — *"if I'm not making DNA it doesn't really make sense that it would accumulate"* (HY Heme).
- Intentar conectar la vía metilmalonil-CoA → succinil-CoA con la síntesis de hemo (una alumna lo propone). Alec responde que **no**: hay muchísimas vías para hacer succinil-CoA (es parte del ciclo de Krebs) y la mutasa es una vía menor; *"I know of no biochemically relevant way in which heme synthesis is affected by a B12 deficiency"* (HY Heme). **Es un error que él marca explícitamente y elogia como buena pregunta.**

### FRASE / ANALOGÍA
> *"They call it the methylfolate trap because the THF is trapped as methylfolate. It cannot become the other forms of tetrahydrofolate that you could use in DNA synthesis."* (HY Heme)

Dos explicaciones válidas de por qué el fallo de síntesis de ADN agranda la célula, y Alec dice explícitamente que **nunca se lo van a preguntar** porque no hay una respuesta demostrada por experimento — pero que hay que tener una para uno mismo: (a) mecanicista: sin ADN no hay mitosis; (b) teleológica: si no puedo hacer muchas células, que cada una lleve más hemoglobina (HY Heme).

---

## 6. Anemias normocíticas: el problema es de NÚMERO

### ANCLA
Tres causas canónicas, todas por número y no por contenido (HY Heme):
1. **Hemorragia** (aguda).
2. **Hemólisis** (los hematíes eran normales; se destruyen).
3. **Déficit de EPO** (enfermedad renal): el hematíe se fabrica bien, simplemente **no hay estímulo** para fabricar suficientes. Alec corrige en directo a una alumna que lo clasifica como microcítico: *"is it a problem with hemoglobin synthesis? No. Is it a problem with DNA synthesis? No. I'm just not producing enough normal red blood cells"* (HY Heme).

**Conexión CID → normocítica** (HY Heme): la CID no da pancitopenia (no toca los leucocitos), no es un problema de producción ni de hemoglobina: *"they're getting sheared… you had 100 red blood cells and half of them are now torn up"*.

### EXAMEN
"Nefropatía diabética avanzada + anemia + reticulocitos bajos + VCM 90" → EPO, no hierro ni B12.

### ERROR
Clasificar el déficit de EPO como microcítico por asociarlo con "problema de producción" — la producción **por hematíe** es normal.

---

## 7. Hemólisis intravascular vs extravascular

### ANCLA `[NLM-gaps]`
- **Extravascular (bazo)**: los macrófagos del sistema fagocítico mononuclear reconocen y fagocitan hematíes rígidos, deformados o **recubiertos de inmunoglobulinas**. El hemo → biliverdina → **bilirrubina indirecta** liberada al plasma → al saturarse la conjugación hepática, **bilirrubina indirecta ↑**. Como es lipofílica, insoluble y va unida a albúmina, **NO se filtra → NO hay coluria**. La depuración esplénica mantenida hipertrofia los cordones de Billroth → **esplenomegalia**.
- **Intravascular (en el vaso)**: rotura directa por cizallamiento mecánico (esquistocitos), complemento o toxinas → **hemoglobina libre en plasma** → captada por la **haptoglobina** → al saturarse, **haptoglobina indetectable**; el exceso (≈64 kD) **filtra por el glomérulo → hemoglobinuria** (orina roja/marrón); dentro del túbulo el hierro libre daña las células tubulares (NTA) y las células descamadas dan **hemosiderinuria**. **LDH ↑↑**.

### ⚠ CORRECCIÓN / CONFLICTO INTERNO
En la consulta de hoy, NotebookLM afirmó que **"haptoglobina, hemoglobinuria y hemosiderinuria NO ESTÁN EN LAS FUENTES"** `[NLM-hem]`, mientras que la respuesta previa `[NLM-gaps]` las desarrolló citando *High Yield Family Medicine Review: Part 2 / High Yield Surgery Review / High Yield Hematology*. **NO están en la transcripción local de HY Hematology** (verificado hoy palabra por palabra). → **[A VERIFICAR (08-sep)]**: el mecanismo es correcto de libro, pero **no lo uses como "lo dice Palmerton"** hasta cotejar contra FM 2 / Surgery.

### EXAMEN
Diferenciar por laboratorio sin nombrar la enfermedad: bilirrubina indirecta ↑ + esplenomegalia + orina clara → extravascular; hemoglobinuria + haptoglobina 0 + LDH ↑↑ + esquistocitos → intravascular.

---

## 8. Déficit de G6PD: cuerpos de Heinz y bite cells

### ANCLA `[NLM-gaps]` (fuentes: HY Biochem, HY Peds)
Recesivo ligado al X. G6PD es la enzima reguladora de la fase oxidativa de la **vía de las pentosas fosfato**, única fuente de **NADPH**. El NADPH es el cofactor de la **glutatión reductasa** que regenera el **glutatión reducido** (antioxidante). Ante un estresor oxidativo (infecciones, sulfonamidas, antipalúdicos, **habas**), sin glutatión reducido los radicales libres **desnaturalizan los puentes sulfhidrilo de la hemoglobina**, que precipita en la membrana como **cuerpos de Heinz**. En los cordones esplénicos los macrófagos **"muerden"** esos agregados y dejan **bite cells** (células en mordida), que luego se destruyen extravascularmente.

**Portadoras heterocigotas sintomáticas**: por un patrón **sesgado / "desafortunado" de inactivación del X** (*skewed / unfortunate pattern of X-inactivation*) en la embriogénesis temprana, en el que los precursores medulares inactivan preferentemente el X sano `[NLM-gaps]`.

### ERROR
Asumir que una mujer heterocigota nunca puede tener clínica: la X-inactivación sesgada es exactamente el disfraz que el NBME usa.

---

## 9. Falciforme, HbC y ELECTROFORESIS (Southern / Northern / Western)

### ANCLA (artículo íntegro, Electroforesis)
1. **Objetivo de la electroforesis en gel**: separar macromoléculas por **TAMAÑO / CARGA**.
2. **SDS** (dodecilsulfato sódico) **desnaturaliza** (desenrolla) las proteínas al unirse a ellas **y es muy negativo**. Desenrollarlas es crítico para que su longitud sea proporcional a su tamaño (analogía del artículo: clips en posición nativa vs desenrollados).
3. Al ser el SDS aniónico, las moléculas unidas a él migran **hacia el electrodo positivo**. Migran **más lento** hacia el positivo: (a) las más grandes (más difícil atravesar la matriz del gel) y (b) las **menos negativas**.
4. **Southern = DNA · Northern = RNA · Western = proteína.** La **electroforesis de hemoglobina es un Western**, porque la hemoglobina **es una proteína**.
5. **HbS**: mutación **missense glutamato → valina**. Glutamato = **anión**; valina = **neutra** → **menos carga negativa** → migra **menos** hacia el ánodo que la HbA control.
6. **HbC**: **glutamato → lisina**. Lisina = **catión** → **más carga positiva** → es la que **menos** migra hacia el positivo (la más retrasada de las tres).

**Orden en el gel (de más a menos migración hacia el +): HbA (control) → HbS → HbC.**

### EXAMEN
Dan un gel con tres carriles y piden identificar cuál es HbS y cuál HbC **razonando desde la mutación**, no memorizando el orden.

### ERROR
Memorizar el orden del gel sin la carga. Si te dan una variante nueva (inventada), solo la carga del aminoácido sustituido te salva.

### FRASE / ANALOGÍA
La analogía de los **clips** (paperclips) en forma nativa vs desenrollada para el efecto del SDS (Electroforesis).

### NOTA DE COBERTURA
De la anemia falciforme, el cuaderno **solo** desarrolla la mutación y su comportamiento electroforético, más una mención de **necrosis papilar renal** (microinfartos falciformes en la médula renal hiperosmolar y de bajo O₂). **Crisis vasooclusivas, autoesplenectomía, hidroxiurea como inductor de HbF: NO están** `[NLM-gaps]`. **PNH / CD55-CD59: NO están.**

---

## 10. Talasemias

### ANCLA
Defecto **cuantitativo de síntesis de cadena de globina** (α-talasemia = cadena α; β-talasemia = cadena β) → menos globina → **menos hemoglobina** → el globo se llena menos → **microcítica** (HY Heme; Panel Fe).

### ERROR
Clasificarla como normocítica "porque suele haber hemólisis" — Alec corrige exactamente esa respuesta en el vídeo: *"So what's the fundamental problem? …it's a problem with making hemoglobin. So it would make sense if it was micro"* (HY Heme).

---

## 11. Hemostasia primaria vs secundaria · PT vs PTT

### ANCLA (Coag 1 y 2, íntegros)
- **Coagulación = hacer un coágulo**, en dos componentes: **hemostasia primaria** (tapón plaquetario) y **hemostasia secundaria** (cascada).
- **Propósito de la cascada**: las plaquetas se adhieren entre sí **muy débilmente**; si el tapón se deshace, vuelve el sangrado. La cascada genera **entrecruzamientos de fibrina** que refuerzan el tapón.
- **Por qué se llama "cascada"**: los factores son **zimógenos** (proteínas inactivas) que se activan por escisión secuencial: XII corta XI, XI corta IX, etc.
- **Vía intrínseca**: factores **XII, XI, IX, VIII** → medida por **PTT**.
- **Vía extrínseca**: endotelio dañado → liberación de **factor tisular** → activación del **factor VII** → vía común. Medida por **PT**.
- **Vía común**: **X → V → II (trombina) → fibrinógeno → fibrina**, que une plaquetas con más fuerza.
- **Proteína C** inactiva al **factor V activado**; **proteína S** inactiva al **factor VIII**. Lo que determina si hay coágulo es **el balance procoagulante ↔ anticoagulante**.

**Presentación clínica**:
- **Defecto primario (plaquetario)** → **sangrado mucocutáneo**. *Truco clínico literal que él enseña*: preguntar **"¿te sangran mucho las encías al cepillarte los dientes?"**
- **Defecto secundario (cascada)** → **sangrado profundo** (hemartrosis) o **sangrado prolongado tras extracción dentaria**.
- **¿Cuál resangra más desde el mismo sitio?** El **secundario**. Razón: en el defecto primario, si logras formar el tapón, la cascada intacta lo refuerza y queda **fuerte**; en el secundario formas el tapón sin problema, pero **se queda débil** por falta de fibrina.

### EXAMEN
Preguntan cuál de los dos vuelve a sangrar horas después del mismo punto. Es una pregunta de razonamiento puro, no de memoria.

### FRASE / MNEMÓNICO
> **"The EX(trinsic)-PresidenT went to WAR(farin)."** — EXtrínseca → **PT** → **WARfarina** (Coag 2).
> Corolario: intrínseca → **PTT** → **heparina**.

---

## 12. Warfarina: necrosis cutánea, factor V Leiden y el paradójico estado protrombótico

### ANCLA (Coag 1, íntegro)
1. **Warfarina** inhibe la acción de la **vitamina K**, que γ-carboxila residuos de glutamato de los factores **II, VII, IX, X** **y también de las proteínas C y S**.
2. De todos ellos, los de **vida media más corta son la proteína C y el factor VII (~1 día)**.
3. **Efecto paradójico**: al dar warfarina sola, la **proteína C (anticoagulante) cae de inmediato** mientras II, IX y X (procoagulantes, vidas medias largas) siguen presentes → **hipercoagulabilidad transitoria**.
4. **Prevención**: empezar **ANTES con heparina/HBPM**, que baja las fuerzas procoagulantes transitoriamente hasta que caigan los demás factores.
5. **Necrosis cutánea por warfarina**: se ve típicamente en **déficit de proteína C o S** — quien ya está bajo de anticoagulantes es **aún más** vulnerable. Cadena: warfarina → procoagulantes > anticoagulantes → trombosis → ↓ circulación → **muerte celular / necrosis**.
6. **Factor V Leiden**: el factor V (procoagulante) es **resistente a la inactivación por la proteína C activada** → más propensión a coágulos.

**Aplicación hepática (misma lógica de vidas medias)**:
- **Fallo hepático AGUDO**: **albúmina NORMAL** (vida media ~20 días, aún circula) pero **PT ↑** (factor VII, vida media corta).
- **Fallo hepático CRÓNICO**: **albúmina baja** y **PT ↑**.

### EXAMEN
- Presentación clásica de **factor V Leiden** (literal del artículo): *"Young woman in her 20s started birth control pill, and develops DVT with or without PE."*
- Pregunta de por qué se "puentea" con heparina al iniciar warfarina.
- Pregunta de albúmina/PT para separar fallo hepático agudo de crónico.

### ERROR
Pensar que la warfarina solo baja procoagulantes. **También baja proteína C y S** — ese es el nudo entero.

---

## 13. Heparina: química, HIT, reversión y embarazo

### ANCLA (Coag 2, íntegro)
- **Warfarina = NO polar** → **atraviesa membranas** (bicapa lipídica) → **se absorbe por vía oral** → **y también atraviesa la placenta**.
- **Heparina = muy polar (cargada negativamente)** → **NO se puede dar oral** (no cruza el tracto GI) → **y NO cruza la placenta**.
- **→ En embarazadas: HEPARINA SÍ; WARFARINA NO.** Todo deducido de la estructura química, sin memorizar.
- **Monitorización**: warfarina con **PT** (a dosis clínicamente relevantes **solo el factor VII se afecta de forma significativa → PTT normal**); heparina con **PTT**.
- **Reversión de warfarina**: **vitamina K IV** (sobredosis) + **plasma fresco congelado** (reversión rápida de sobredosis grave, porque el PFC contiene todos los factores depletados).
- **Reversión de heparina**: **sulfato de protamina** — la heparina es muy **negativa**, la protamina es muy **positiva** → se unen y la neutralizan.
- **HIT (trombocitopenia inducida por heparina)**: anticuerpos **IgG** contra **heparina unida al factor plaquetario 4 (PF4)**. El complejo anticuerpo-heparina-PF4 se elimina (→ **trombocitopenia**) **y activa las plaquetas** (→ **trombosis**).
- **Tratamiento de la HIT**: **inhibidores directos de la trombina** (**argatrobán, bivalirudina** — derivados de **SANGUIJUELAS**).

### EXAMEN
Preguntar qué anticoagulante dar en el embarazo **razonando desde la polaridad**; o por qué la protamina revierte heparina y no warfarina.

### FRASE / ANALOGÍA
La regla general de Alec para todo fármaco, la misma que usa en farmacología: **"likes dissolve likes"** — pequeño, lipofílico y sin carga = atraviesa membranas (Memory Hack) `[NLM-mic]`.

---

## 14. Trombocitopenias: PTI vs PTT vs SUH vs CID

### ANCLA `[NLM-gaps]`
- **PTI (púrpura trombocitopénica inmune)**: autoanticuerpos contra antígenos de superficie plaquetaria → destrucción esplénica. **Trombocitopenia grave AISLADA** + sangrado mucocutáneo sutil, con **PT/PTT y fibrinógeno normales**. Es diagnóstico de exclusión: **sin MAHA, sin fallo renal, sin fiebre alta** (una febrícula de 100,4 °F **no** la descarta). Caso citado: adolescente de **15 años** con sangrado vaginal abundante.
- **PTT (púrpura trombocitopénica trombótica)**: **péntada** — trombocitopenia grave, **MAHA con esquistocitos abundantes**, fallo renal agudo, fiebre y síntomas neurológicos fluctuantes. **Tratamiento: plasmaféresis para retirar los autoanticuerpos anti-ADAMTS13** `[NLM-inm]`.
- **SUH**: microangiopatía trombótica infantil por **toxina Shiga** tras infección GI por **E. coli O157:H7**. La toxina lesiona el endotelio de la microvasculatura renal → factores protrombóticos locales → microtrombos de fibrina → **tríada**: MAHA (esquistocitos) + trombocitopenia de consumo + **fallo renal agudo oligúrico grave**. Se separa de un Gilbert por el **estado tóxico sistémico** del paciente.
- **CID**: activación sistémica descontrolada de la cascada por **liberación masiva de factor tisular** (sepsis, trauma, neoplasia) → consumo de plaquetas y factores → hemorragia secundaria. Laboratorio: **PT ↑, PTT ↑, fibrinógeno ↓↓, D-dímero ↑↑**, y **esquistocitos** por cizallamiento sobre los microtrombos de fibrina.

### ⚠ NOTA
`[NLM-gaps]` afirmaba que **ADAMTS13 y plasmaféresis "no están en las fuentes"**; la consulta de hoy `[NLM-inm]` **sí** las recupera (plasmaféresis para PTT y para miastenia gravis). Prevalece la de hoy, pero márcalo como **[A VERIFICAR (08-sep)]** si lo vas a usar como cifra de examen.
**von Willebrand vs hemofilia A/B, tiempo de sangría y estudio de mezclas 1:1: NO ESTÁN en el cuaderno** `[NLM-hem]` (vWD solo se nombra como causa de sangrado uterino abundante en adolescentes).

---

## 15. Trombosis venosa: tríada de Virchow, TEP y filtro de VCI

### ANCLA `[NLM-gaps]` (fuentes: HY Cardio 1, *How 260+ Scorers Master Cardio*)
El equilibrio hemostático se rige por el balance procoagulante (cascada) ↔ anticoagulante (proteína C/S, antitrombina III). La **tríada de Virchow** define las tres condiciones que lo desvían:
1. **Estasis venosa** — disfraz prototípico: **vuelo transcontinental largo sin escalas** (p. ej. Seúl → Los Ángeles).
2. **Daño endotelial** — disfraz clásico: **tabaquismo intenso crónico**.
3. **Hipercoagulabilidad** — disfraces: **anticonceptivos orales** (aumentan la síntesis hepática de factores) o **cáncer activo**, clásicamente **adenocarcinoma de páncreas**, que secreta mucina ácida que actúa como factor tisular ectópico activando el factor VII.

**Regla de Palmerton**: en la viñeta suele hacer falta la **coexistencia de al menos DOS de las tres** variables para desencadenar la TVP/TEP.

**Fisiopatología del TEP como circuito eléctrico**: ocluir arterias pulmonares equivale a **retirar un resistor de un circuito de resistores en PARALELO** → la resistencia total **sube** bruscamente → ↑ poscarga del VD → **dilatación aguda del VD** → el septo se desplaza a la izquierda → **↓ llenado del VI** → ↓ gasto cardíaco → ↓ PAM → ↓ presión de perfusión cerebral → **síncope o mareo súbito sin pródromos**.

**Filtro de vena cava inferior**: dispositivo endovascular en rejilla/paraguas que captura y fragmenta los coágulos antes de que lleguen al corazón derecho. **Es SIEMPRE segunda línea.** Solo dos indicaciones: (a) **contraindicación absoluta** para anticoagular (sangrado intracraneal activo, HDA grave activa) o (b) **nuevo evento embólico a pesar de anticoagulación a dosis plenas**.

### EXAMEN (viñeta literal del NBME, reordenada con CCSN)
> *"Mujer de 25 años traída a urgencias por disnea aguda y dolor torácico hace 3 horas. Refiere que hace 5 días regresó de un vuelo transcontinental de 12 horas. Su historial revela que inició anticonceptivos orales hace 2 meses."* (CCSN)

**Reordenamiento cronológico obligatorio** (el System 1 es ciego a la cronología):
1. Hace **2 meses**: inicia ACO → **hipercoagulabilidad farmacológica**.
2. Hace **5 días**: vuelo de 12 h → **estasis venosa**.
3. Hace **3 horas**: disnea + dolor torácico → **desprendimiento del trombo al árbol pulmonar**.
→ El diagnóstico de **TEP** emerge de forma inevitable (CCSN).

### ERROR (regla del "juez vs abogado")
Ante la opción "filtro de VCI" en un TEP: el **Rule-In** del filtro exige contraindicación demostrada o fallo de la anticoagulación. Si la viñeta no da ni una ni otra, **la anticoagulación estándar es la respuesta** y el filtro se descarta con fundamento (CCSN).
Regla hermana: **"La ausencia de evidencia NO es evidencia de ausencia"** — solo se descarta una opción si hay **un dato positivo que la contradiga** (ejemplo literal del propio Alec: descartar B12 si el VCM es de **82 fL**, porque una microcitosis contradice físicamente la macrocitosis obligatoria de la cobalamina) (CCSN).

---

## 16. Transfusión: ABO/Rh, Coombs, TRALI vs TACO

### ANCLA (ABO/Vacunas, íntegro — este es el artículo bisagra entre heme e inmuno)
1. **Antígenos A y B = CARBOHIDRATOS (azúcares).** **Antígeno Rh = PROTEÍNA.**
2. Contra azúcares solo se puede hacer **IgM** (no hay cambio de isotipo sin ayuda T). Contra proteínas se puede hacer **IgG** (activación T-dependiente).
3. **Solo la IgG cruza la placenta.**
4. → **La eritroblastosis fetal es un problema de Rh, NO de ABO**: contra ABO solo hay IgM, que no cruza.
5. **Peligroso**: madre **Rh-negativa** con feto **Rh-positivo** (la madre monta anticuerpos). Lo inverso no, porque el feto tiene un sistema inmune inmaduro y no pasa anticuerpos a la madre.
6. **Momento de sensibilización**: **el parto**, que es muy traumático y rompe muchos vasos, volcando antígeno Rh fetal a la sangre materna.
7. **RhoGAM** = **inmunización pasiva**: anticuerpos anti-Rh inyectados a la madre que **eliminan el antígeno Rh de su circulación ANTES de que ella desarrolle los propios**.
8. **Autotolerancia**: paciente **A+** produce **anti-B** y nada más (no hace anticuerpos contra sus propios antígenos A ni Rh).

**Coombs (base física)**: si añades a hematíes recubiertos de anticuerpo un **anticuerpo anti-anticuerpo** (*antihuman globulin*, reactivo de Coombs), este entrecruza y **aglutina** los hematíes.
- **DIRECTO**: reactivo de Coombs + **hematíes DEL PACIENTE** → aglutinan si los hematíes ya están recubiertos de Ig **in vivo**. Responde: **¿ya ocurrió la hemólisis inmune?** `[NLM-gaps]`
- **INDIRECTO**: **suero del paciente** + hematíes de prueba con antígenos conocidos (Kell, Duffy, Kidd) + reactivo de Coombs → aglutinan si el suero lleva anticuerpos anti-eritrocito preformados. Responde: **¿atacará a los hematíes que le transfunda?** Es la base del **Type and Screen** prenatal y pretransfusional `[NLM-gaps]`.

**TRALI vs TACO** `[NLM-gaps]` (fuentes: *Stuck Below 220 on Step 2*, HY Cardio 2): ambos = disnea aguda + opacidades difusas post-transfusión.
- **TACO** = **hidrostático**: volumen infundido rápido en paciente con reserva cardíaca justa (anciano, ICC) → ↑ LVEDP y **PCWP ↑** → edema pulmonar **cardiogénico** → **hipertensión, ingurgitación yugular (JVD) y S3**.
- **TRALI** = **inmunológico**: anticuerpos anti-HLA/anti-neutrófilo del **donante** activan los neutrófilos del receptor secuestrados en la microvasculatura pulmonar → radicales libres y proteasas → hiperpermeabilidad → edema **NO cardiogénico** (SDRA), con **PCWP normal y SIN signos de sobrecarga**. Infiltrados **en las primeras 6 horas** post-transfusión `[NLM-hem]`.

### NOTA DE COBERTURA
**Reacción febril no hemolítica, reacción alérgica/urticaria, anafilaxia por déficit de IgA y contaminación bacteriana del hemoderivado: NO ESTÁN EN LAS FUENTES** `[NLM-hem]`. Cubrir con UWorld.

---

## 17. Leucemias, linfomas y mieloma (lo poco que hay, y es bueno)

### ANCLA — Burkitt t(8;14) `[NLM-gaps]` (fuente: UW+FA)
La t(8;14) traslada el oncogén **c-myc** (cromosoma 8) al locus de la **cadena pesada de inmunoglobulina** (cromosoma 14). Como el promotor de la cadena pesada de Ig está **constitutivamente activo en las células B**, la vecindad produce **sobreexpresión masiva de myc**. Como myc es un factor de transcripción que estimula crecimiento y mitosis, eso explica que Burkitt sea **extremadamente agresivo y de crecimiento rapidísimo**.
**Pero ese es también su talón de Aquiles (*Achilles' heel*)**: la quimioterapia convencional mata selectivamente a las células que se dividen más rápido → **Burkitt es exquisitamente sensible y altamente curable con quimioterapia tradicional**.

### ANCLA — Mieloma múltiple `[NLM-gaps]` (fuentes: *How to Review USMLE Questions for 20-30+ Points*, HY Endo)
Neoplasia clonal de células plasmáticas en médula ósea de ancianos que sintetiza inmunoglobulina monoclonal y fragmentos (**proteína M** y **cadenas ligeras**). La infiltración medular **estimula los osteoclastos** → **lesiones óseas líticas** → ↑ resorción → **hipercalcemia**. De ahí se deriva **CRAB** (**C**alcio ↑, insuficiencia **R**enal, **A**nemia, lesiones óseas / **B**one).
**Riñón del mieloma**: las **cadenas ligeras libres monoclonales (Bence-Jones)** saturan la reabsorción del túbulo proximal; al llegar a los túbulos colectores distales precipitan y se conjugan con la **glicoproteína de Tamm-Horsfall** en pH ácido, formando **cilindros eosinófilos intratubulares** que obstruyen el flujo y desatan una reacción inflamatoria de cuerpo extraño que destruye el epitelio tubular (necrosis tubular) → fallo renal.

### NOTA DE COBERTURA (importante)
En el vídeo de Hematología, Alec **anuncia** que la sesión siguiente tratará las lesiones genéticas de las leucemias *"so that it's not just like memorizing 'follicular lymphoma, 8;14 translocation, BCL' — actually understand why these things are"* (HY Heme). **Esa sesión NO está en el cuaderno.**
**NO ESTÁN**: t(9;22) BCR-ABL / imatinib, t(15;17) PML-RARA / ATRA / CID, t(14;18) BCL-2 folicular (solo se nombra), t(11;14) ciclina D1 del manto, LLA infantil, LLC, células de Reed-Sternberg, cuerpos de Russell, **policitemia vera y JAK2 V617F** `[NLM-gaps]` `[NLM-hem]`.

---

## 17-bis. Esplenomegalia (lo que sí hay)

En la **anemia hemolítica autoinmune por anticuerpos calientes (IgG)**, los autoanticuerpos recubren los hematíes; al pasar por la pulpa roja, los macrófagos esplénicos reconocen las porciones **Fc** y fagocitan parcial o totalmente la membrana. La hiperactividad e hiperplasia de macrófagos **agranda físicamente el bazo** → **esplenomegalia palpable** `[NLM-hem]`.
**Hiperesplenismo y hematopoyesis extramedular: NO ESTÁN** `[NLM-hem]`.

---

# PARTE II · INMUNOLOGÍA

## 18. Inflamación aguda vs crónica y el IAM como MODELO de los redactores

### ANCLA (HY Immuno, íntegro)
- **Inflamación aguda = NEUTRÓFILOS.** **Inflamación crónica = MACRÓFAGOS + LINFOCITOS.**
- **Cronología post-IAM** (el patrón que el NBME reutiliza para toda respuesta a la lesión):
  - **24 horas → neutrófilos.**
  - **3-5 días → macrófagos** (limpieza del tejido necrótico).
  - **Semanas → fibroblastos → fibrosis y cicatriz de colágeno** `[NLM-inm]`.
- **Por qué el IAM y no el ictus**: Alec cuenta que se lo oyó **a un redactor real de preguntas del Step 1**. Un comité de expertos tiene que poder ver la pregunta y saber la respuesta **sin ver las opciones**; el IAM sirve porque la respuesta del miocardio a la isquemia es **idéntica y constante en cualquier persona a las 24 h**, mientras que el ictus es histológicamente mucho más variable. *"There's only one right answer."* (HY Immuno)
- Corolario del propio Alec: **el IAM se pregunta porque es un vehículo excelente para testar el concepto de inflamación**, no por el IAM en sí.

### EXAMEN
Cualquier "¿qué célula predomina a las X horas/días?" es la misma pregunta, la ponga en el corazón, el riñón o la piel.

### ERROR
Estudiar la cronología del IAM como una tabla de cardiología en vez de como el **modelo genérico de respuesta a la lesión**.

### FRASE
> *"If you see lymphocytes and macrophages on your test and you don't think 'chronic inflammation', I will shed tears."* (HY Immuno)

---

## 19. Citocinas: "one hot T-bone stEAK" + TNF + IFN-γ

### ANCLA (HY Immuno, íntegro)
Mnemónico completo, con lo que cada letra significa:
| | Letra | Función |
|---|---|---|
| **IL-1** | **hot** | **Fiebre** |
| **IL-2** | **T** (de T-bone) | Estimula **linfocitos T** |
| **IL-3** | **bone** | Estimula la **médula ósea** |
| **IL-4** | **E** | Producción de **IgE** |
| **IL-5** | **A** | Producción de **IgA** |
| **IL-6** | **K** | Reactantes de fase aguda ("a-**K**-ute phase reactants": *"they were clever and said 'acute' even though we all know it's not spelled with a K"*) |

Mecanismos que hay que poder recitar:
- **IL-1** → producida sobre todo por **MACRÓFAGOS** → induce **prostaglandinas** vía **COX** en el hipotálamo → **fiebre**. **Bloqueada por inhibidores de COX (aspirina, AINE).**
- **IL-6** → **macrófagos** → reactantes de fase aguda → **VSG (ESR) elevada**.
- **TNF-α** → **macrófagos** → **caquexia y pérdida de peso**. Se llamaba literalmente **"cachectina"** porque al inyectarla a ratones producía un estado de desgaste. Regula el balance energético: **↑ degradación de lípidos, movilización de proteína muscular (destrucción de músculo) y supresión del apetito**. Frase de Alec: *"if there's one molecule you need to know for Step 1, it is TNF-alpha."*
- **IFN-γ** → producido por **linfocitos T CD4+ (Th1)** → **activa el macrófago y lo transforma en CÉLULA EPITELIOIDE** → granuloma.

**VSG (ESR)**: Alec da dos explicaciones y dice cuál usar. La "correcta" (cambio de fuerzas repulsivas / constante dieléctrica que permite agregación) la cita y luego la descarta: *"I don't even know what that means"*. La que recomienda: **los hematíes se vuelven más pesados por los reactantes de fase aguda y caen más rápido** — *"I prefer that as it's easier to remember"*. Uso clínico: inflamación en general, autoinmunes, y **osteomielitis** en pediatría (junto a PCR).

### EXAMEN
Explicar por qué TB, cáncer, sarcoidosis, linfoma, arteritis de células gigantes, lupus y AR **comparten** fiebre, sudores nocturnos, pérdida de peso y VSG alta. La respuesta no es cada enfermedad: es **inflamación crónica → macrófago activado → sus citocinas**.

### ERROR
- Memorizar los síntomas constitucionales enfermedad por enfermedad. Alec confiesa que ese fue **su** gran error: dependía tanto de First Aid que, si First Aid no decía "fiebre en el cáncer", él no la aceptaba en una pregunta.
- No conectar sudores nocturnos con fiebre: **el sudor nocturno es el mecanismo compensador de disipación de calor** de la fiebre (te sobrecalientas bajo las mantas → sudas → te enfrías).
- No conectar los escalofríos: **su función fisiológica es GENERAR calor** por contracción muscular.

### FRASE / ANALOGÍA
> *"Shivering is just a very, very mild form of this"* — de la **hipertermia maligna**, donde la liberación de Ca²⁺ del retículo sarcoplásmico (receptor de rianodina) provoca **tetania sistémica** y una **explosión metabólica** que genera calor. Fármaco asociado: **succinilcolina** (paradójico: das un relajante muscular y todos los músculos se contraen) (HY Immuno).
> *"Look for the macrophages on your test and you will see them. And right next to the macrophage you will see a little bouncing happy face, because you will get so many [points]."* — palabras de un redactor real del Step 1, patólogo, cuya célula favorita era el macrófago (HY Immuno).
> *"You need to be able to take what you understand and apply it in novel contexts. That's the only way to get better than a 240. Only way."* (HY Immuno)

### DIGRESIONES DEL VÍDEO (que son puntos de examen)
- **Aspirina y niños**: contraindicada por **síndrome de Reye**, que afecta **cerebro e hígado** (hallazgo histológico hepático característico: esteatosis microvesicular). Caso real que Alec presenció en Stanford: un superviviente de Reye que desarrolló **maldición de Ondina** (pérdida del automatismo respiratorio del tronco cerebral → dependiente de ventilador por la noche, con traqueostomía).
- **Aspirina a dosis muy altas actúa como DESACOPLANTE mitocondrial** → ↑ actividad metabólica → **fiebre** (conexión con bioquímica).

---

## 20. Granuloma: la célula epitelioide (la pregunta trampa clásica)

### ANCLA (HY Immuno, íntegro)
1. El granuloma es una **hipersensibilidad tipo IV**.
2. **¿Por qué lo forma el cuerpo?** Para **amurallar** lo que no puede matar. Alec lo contrasta con Robbins ("la Biblia de la patología") que dice lo mismo: *"if you can't kill it, you've got to at least contain it."*
3. **La célula DEFINITORIA del granuloma es la CÉLULA EPITELIOIDE.** **NO es la célula gigante.**
4. **¿De qué deriva la célula epitelioide?** Del **MACRÓFAGO**.
5. **¿Qué la activa?** El **IFN-γ**, producido por el **linfocito T CD4+**.

### EXAMEN — pregunta literal anticipada por Alec
> *"They'll ask: 'what is the defining cell of a granuloma?' and they're going to have 'giant cell' as an option. **That is not the correct answer. The answer is epithelioid cell** — even though it's the most important cell that people have never heard of."* (HY Immuno)

### ERROR
Responder "célula gigante multinucleada". Es **el distractor diseñado**.

### VIÑETA
Enfermedades que comparten granulomas + síntomas constitucionales, listadas en el vídeo: **sarcoidosis, TB, lepra, cáncer, vasculitis, lupus, artritis reumatoide** (HY Immuno).

---

## 21. MHC, activación T vs B y cambio de isotipo

### ANCLA (ABO/Vacunas, íntegro)
1. **Función de la célula B**: producir anticuerpos. **Función del T helper (CD4+)**: coordinar la respuesta — es **"el quarterback del sistema inmune"**.
2. **Los linfocitos T SOLO se pueden activar contra PROTEÍNAS**, nunca contra carbohidratos ni lípidos. **¿Por qué?** Porque **el MHC exhibe péptidos** — su hendidura solo acopla fragmentos lineales de proteína `[NLM-inm]`.
3. **Los linfocitos B se pueden activar contra proteínas, carbohidratos Y grasas.**
4. **Cambio de isotipo (isotype switching)**: la célula B produce **IgM** de origen; el cambio modifica la región **Fc** (conservando la porción de reconocimiento del antígeno) → IgG, IgA, IgE o IgD. **Requiere OBLIGATORIAMENTE que un T helper esté activado y coactive a la B.**
5. → **Si activo una B contra un carbohidrato, solo puedo hacer IgM**: sin proteína no hay activación T → **sin cambio de isotipo, sin hipermutación somática, sin células B de memoria**.

### EXAMEN
Es la maquinaria que resuelve **tres** preguntas distintas: (a) eritroblastosis fetal Rh vs ABO, (b) por qué las vacunas de polisacárido puro fallan, (c) por qué un paciente A+ hace anti-B.

### ERROR
Estudiar ABO, vacunas conjugadas e inmunología básica como tres bloques distintos. **Son la misma cadena** — ese es literalmente el título del artículo.

---

## 22. Vacunas conjugadas, inmunización pasiva/activa y BTK a los 6 meses

### ANCLA (ABO/Vacunas, íntegro)
- **La cápsula bacteriana es de POLISACÁRIDO (azúcares).** **Excepción: *Bacillus anthracis*, cuya cápsula es de aminoácido (GLUTAMATO).**
- El antígeno vacunal contra organismos encapsulados es el **antígeno capsular (carbohidrato)**.
- **Problema de una vacuna de polisacárido puro**: al ser solo carbohidrato **NO activa T** → **sin cambio de isotipo, sin hipermutación somática, sin memoria B**.
- **Vacuna conjugada** = antígeno capsular (carbohidrato) **conjugado con una proteína muy inmunogénica** (p. ej. toxina/toxoide de pertussis o tetánico). La B reconoce el azúcar, internaliza el complejo y presenta **la porción proteica en su MHC II** al CD4+, que la coactiva → **IgG de alta afinidad, maduración de afinidad y memoria de larga duración** `[NLM-inm]`.
- **Inmunización PASIVA** = dar **anticuerpos ya formados**. **ACTIVA** = dar un **antígeno** para que el paciente los fabrique.
- **Papel del bazo**: el aclaramiento de las bacterias encapsuladas depende de la opsonización por anticuerpos y de la retirada física por macrófagos y células B de zona marginal **del bazo** `[NLM-mic]`.

### ⚠ CORRECCIÓN IMPORTANTE — inmunodeficiencia de células B a los 6 meses
NotebookLM contestó hoy **"NO ESTÁ EN LAS FUENTES"** `[NLM-inm]`. **ES FALSO: SÍ ESTÁ, literal, en el artículo ABO/Vacunas** (verificado por mí en el texto local):
> *"Recall that babies rely on maternal antibodies FOR THE FIRST 6 MONTHS OF LIFE. Thus, if they are B-cell deficient (i.e. **btk deficiency**) immunodeficient, IT WILL OFTEN PRESENT AROUND **6 MONTHS OF AGE** (this is a key Step 1 fact)."* (ABO/Vacunas)

### EXAMEN
Lactante de ~6 meses con infecciones bacterianas de repetición justo cuando desaparecen los anticuerpos maternos → **agammaglobulinemia de Bruton (BTK)**.

---

## 23. Hipersensibilidades I-IV

### ANCLA `[NLM-inm]` (fuentes: HY FM 1, HY Immuno)
- **Tipo I (inmediata, IgE)**: el alérgeno induce IgE que se acopla a la superficie del **mastocito**; en una segunda exposición el antígeno entrecruza IgE adyacentes → **degranulación masiva**. *Ejemplo literal*: **crisis asmática** (broncoconstricción y flujo turbulento).
- **Tipo II (citotóxica)**: anticuerpo contra un antígeno **estructuralmente FIJO** en una célula o tejido. *Ejemplos literales*: **Goodpasture** (anti-membrana basal glomerular, inmunofluorescencia estrictamente **LINEAL**) y **anemia hemolítica autoinmune por anticuerpos calientes (IgG)**.
- **Tipo III (inmunocomplejos)**: anticuerpo contra antígeno **SOLUBLE y libre** en sangre → los complejos viajan y se depositan de forma caótica en paredes vasculares y membranas basales. *Ejemplos literales*: **glomerulonefritis postestreptocócica** (depósitos subepiteliales, patrón granular **"lumpy bumpy"**) y **granulomatosis con poliangeítis (Wegener)**, que es **pauci-inmune** (inmunofluorescencia negativa) porque los **ANCA activan directamente a los neutrófilos como "granadas activadas"**, dañando el riñón de forma indirecta y sin depósito masivo de complejos.
- **Tipo IV (celular, retardada)**: mediada **exclusivamente por linfocitos T y macrófagos, sin anticuerpos**. *Ejemplos literales*: **PPD** (la biopsia de la pápula reactiva muestra infiltrado de **células T y macrófagos**) y **granuloma** (macrófago → célula epitelioide por IFN-γ).

### EXAMEN — la regla de oro que las separa
**Tipo II = antígeno FIJO** (lineal en inmunofluorescencia). **Tipo III = antígeno SOLUBLE** (granular / lumpy-bumpy). El patrón de inmunofluorescencia **se deduce** de si el antígeno estaba anclado o flotando.

### ERROR
Memorizar listas de enfermedades por tipo. Con "fijo vs soluble" y "con anticuerpo vs sin anticuerpo" se regeneran las cuatro.

---

## 24. Inmunodeficiencia: la fiebre que NO aparece, e IRIS

### ANCLA (HY Immuno, íntegro + `[NLM-inm]`)
Montar fiebre requiere una **cascada inmunológica intacta** (macrófago → IL-1 → COX → prostaglandinas → hipotálamo). Si esa maquinaria falta, **no hay fiebre aunque la infección sea devastadora**:
- **Ancianos**: presentación clásica de meningitis **sin fiebre**, solo con un estado casi catatónico o no respondedor — *"you can mistake it for depression because they have a raging infection in their brain."*
- **VIH/SIDA con CD4 muy bajos**: infección oportunista grave del SNC con **temperatura de 37 °C** y como único signo un **estado mental alterado / confusión** `[NLM-inm]`.
- **IRIS (síndrome inflamatorio de reconstitución inmune)**: al iniciar TARGA y recuperarse el CD4, el sistema inmune "despierta" y monta bruscamente una respuesta agresiva contra patógenos latentes previamente tolerados → **fiebre intensa y empeoramiento clínico paradójico**.

### EXAMEN
Anciano institucionalizado o paciente con SIDA, afebril, con confusión aguda: **la ausencia de fiebre NO descarta sepsis ni meningitis**; es el hallazgo esperable.

### NOTA DE COBERTURA
El resto de las **inmunodeficiencias por patrón** (SCID, DiGeorge, CGD/NBT, déficit de complemento y Neisseria, Chédiak-Higashi, hiper-IgE, hiper-IgM, ataxia-telangiectasia, Wiskott-Aldrich) **NO ESTÁ EN EL CUADERNO**. Único punto disponible: BTK a los 6 meses (§22).

---

## 25. Autoinmunidad: LES y plasmaféresis

### ANCLA `[NLM-inm]` (fuente: HY FM 1)
- **¿Por qué el LES afecta a mujeres en edad fértil?** Hipótesis que Alec desarrolla: la **menstruación** produce descamación endometrial con **NECROSIS** masiva (no apoptosis limpia), volcando componentes nucleares (**ADN de doble cadena**) al torrente sanguíneo. En predispuestas genéticamente, el sistema inmune los reconoce como extraños → **anti-dsDNA**.
- **Papel del estrógeno**: **reduce la apoptosis fisiológica de los linfocitos B autorreactivos**, permitiendo que sobrevivan y ataquen tejido sano.
- **Caso real citado**: una médica con esclerosis sistémica y **CREST** con Raynaud grave que quedó embarazada accidentalmente a los **42 años** y cuyos síntomas **remitieron por completo** durante la gestación y mucho tiempo después.
- **Plasmaféresis** — indicación conceptual: **retirar autoanticuerpos circulantes de inmediato**. Dos casos explícitos: **miastenia gravis** (anti-receptor nicotínico de ACh) y **PTT** (anti-ADAMTS13).

### FRASE (tarjeta Anki literal que Alec propone, en `ua_q1_lectura_answer.md`)
> *"Fundamentally it is an autoantibody disease – and a relatively severe one – so it would make sense that you would use a technique to remove those antibodies as soon as possible to prevent further damage, like plasmapheresis."*

---

## 26. CASO MAESTRO: pielonefritis xantogranulomatosa (la viñeta NBME frase a frase)

Este caso ocupa el último tercio del vídeo de Inmunología y es **el ejemplo canónico de cómo Palmerton lee una viñeta**. Cada frase, con lo que hay que extraer de ella (HY Immuno, íntegro; cifras confirmadas por `[NLM-inm]` y `[NLM-mic]`):

| Frase del enunciado | Qué hay que extraer |
|---|---|
| *"Mujer de 52 años, 2 días de fiebre y dolor en flanco izquierdo"* | **Pielonefritis**, no cistitis: la infección ALTA es la que da síntomas sistémicos; el dolor en flanco es bastante específico |
| *"Tratada por múltiples episodios de pielonefritis en los últimos 3 años"* | **ITU complicada** = algo la predispone a repetir la MISMA infección |
| *"Temperatura 37,8 °C"* | Fiebre **baja**: infección **"smoldering"** (crónica, latente, lenta), no un proceso hiperagudo |
| *"12-18 leucocitos/campo con linfocitos y células mononucleares con rasgos de macrófagos"* | **INFLAMACIÓN CRÓNICA** (linfocitos + macrófagos), no solo infección. Es la clave del caso |
| *"Urocultivo: 80 000 colonias/mL de Proteus mirabilis"* | El umbral de bacteriuria significativa es **≥ 100 000/mL** → **80 000 es BAJO** → pista de que la infección está **amurallada (walled off)** en un bolsillo, no libre en la vía urinaria |
| *"Rx de abdomen: masa de 3 cm en polo INFERIOR del riñón izquierdo"* | **Polo inferior** porque una ITU **ascendente** por reflujo vesicoureteral impacta primero abajo. Y todo el mundo pensaría **cáncer** ante una masa así |
| *"Masa amarilla de 3,2 cm, con cicatriz CENTRAL y no marginal"* | **Amarillo = grasa/lípidos** (en los macrófagos histiocitarios). *Xantho-* = amarillo/grasa. Cicatriz central = necrosis y reparación fibrosa, **encapsulado** |
| *"Predominio de células EPITELIOIDES con citoplasma parcialmente claro y granular a espumoso"* | **Célula epitelioide → GRANULOMA, inmediatamente.** El citoplasma se ve claro porque **los solventes del procesamiento histológico DISUELVEN Y LAVAN la grasa** — estás viendo la *ausencia* de grasa |
| *"Núcleos excéntricos, normocrómicos, simétricos, sin pleomorfismo significativo"* | **NO es malignidad**: un cáncer sería **hipercrómico** (↑ relación núcleo/citoplasma), asimétrico y **pleomórfico** (*pleo* = muchos, *morfismo* = formas) |
| *"Linfocitos y células plasmáticas dispersas entremezcladas"* | Otra vez: **inflamación crónica** |
| **Diagnóstico** | **Pielonefritis xantogranulomatosa** por *Proteus mirabilis* |

**Por qué los antibióticos solos no bastan (control del foco)**: la lesión es una cavidad **avascular** rodeada de colágeno denso. **Dentro de un absceso no hay vasos sanguíneos** → el antibiótico no llega. Alec lo enseña con el MRSA: *"You have an MRSA abscess. What do you treat it with? You physically drain it… it's not vancomycin."* → **incisión y drenaje / extirpación**.

### EXAMEN — la regla de lectura
> *"I want you to be like Sherlock Holmes when he looks at the wedding ring… Everyone knows that she's married. That's the obvious thing. I want you to go deeper."* — cuando dan un urocultivo positivo, la conclusión obvia ("es la causa de la infección") **no es la respuesta**; la cifra baja es la pista real (HY Immuno).

### DIGRESIÓN DE ORO (patología renal, del mismo caso)
**¿Por qué el carcinoma renal de células claras es AMARILLO en macroscopía y CLARO en histología?** Porque nace de las células del **túbulo contorneado proximal**, que es el sitio de máxima reabsorción → necesita muchísimo ATP → está lleno de **glucógeno y grasa**. En macroscopía la grasa es **amarilla**; en la lámina histológica los **solventes de fijación disuelven la grasa** y dejan un hueco → *"you're not seeing fat, you're seeing the ABSENCE of fat"* (HY Immuno).

---

# PARTE III · MICROBIOLOGÍA / ENFERMEDADES INFECCIOSAS

> **Advertencia de cobertura**: esta parte es el vacío estructural más grande del cuaderno. Lo que sigue es TODO lo que existe.

## 27. Bacterias: cápsula, bazo y guerra por el hierro

### ANCLA
- **Cápsula bacteriana = POLISACÁRIDO. Excepción: *Bacillus anthracis* = ácido D-glutámico (proteína/aminoácido)** (ABO/Vacunas).
- Como el azúcar no se presenta en MHC → activación B T-independiente → **solo IgM, sin memoria** → de ahí que los encapsulados exijan **vacunas conjugadas** (§22).
- **Bazo**: el aclaramiento de encapsulados depende de opsonización + retirada física por macrófagos y células B de zona marginal esplénicas `[NLM-mic]`.
- **Guerra por el hierro (defensa nutricional)**: IL-6 → hepcidina → degrada ferroportina → hierro secuestrado en ferritina → **se priva de hierro a las bacterias que lo necesitan**. **Listeria monocytogenes** es el patógeno citado; en **hemocromatosis o cirrosis** el mecanismo está saturado → hierro libre alto → riesgo disparado de sepsis por Listeria (HY Immuno; `[NLM-mic]`).
- ***Proteus mirabilis*** → **pielonefritis xantogranulomatosa** (§26). Ver también **malacoplaquia**, que Alec menciona como distractor del caso "porque tanto xantogranulomatosa como malacoplaquia son de Proteus" (HY Immuno).
- ***E. coli* O157:H7 / toxina Shiga** → **SUH** (§14). `[NLM-mic]` avisa: **el mecanismo molecular fino de la toxina Shiga NO está en las fuentes**.
- **TB**: granuloma (§20) + **PPD como hipersensibilidad tipo IV** (biopsia con T y macrófagos) + sudores nocturnos por citocinas. `[NLM-mic]`: **el mecanismo biofísico exacto del sudor nocturno no está detallado**.
- **Lepra**: solo se nombra en la lista de patologías granulomatosas. Sin microbiología ni clínica.

## 28. Umbral de bacteriuria y control del foco

- **Bacteriuria significativa = ≥ 100 000 colonias/mL** — literal: *"UTI, the technical definition of significant bacteria, is 100,000"* (HY Immuno).
- **Absceso**: cavidad de necrosis licuefactiva **avascular** rodeada de cápsula de colágeno. **Sin vasos dentro → el antibiótico sistémico no penetra → tratamiento = drenaje físico / incisión** (HY Immuno). **Vancomicina** es además un polímero grande y polar, incapaz de penetrar pasivamente `[NLM-mic]`.

## 29. Virus: +RNA vs -RNA e infectividad del genoma desnudo

### ANCLA (±RNA, íntegro)
1. **"Infectividad del genoma desnudo"** = si inyecto **SOLO el material genético** (sin cápside ni envoltura) en una célula, ¿produce progenie viral?
2. **+RNA** = su genoma **ES esencialmente mRNA**: se puede traducir directamente a proteína. → **Tu subunidad ribosómica pequeña lo reconoce, encuentra el AUG y empieza a traducir COMO SI FUERA TU PROPIO mRNA.** → **TODOS los +RNA desnudos son infectivos.**
3. **-RNA** = su genoma es **la hebra complementaria**, NO es mRNA. Necesita una **RNA polimerasa dependiente de RNA** (que la célula humana **no tiene** en el citoplasma) para fabricar la hebra +. → **NO infectivo.**
4. **dsDNA**: normalmente **SÍ infectivo**, porque nuestras propias DNA/RNA polimerasas lo reconocen. **Excepciones: POX** (requiere su propia polimerasa, replica en citoplasma) y **HEPADNA** (presumiblemente porque **solo es parcialmente bicatenario**).
5. **ssDNA: NO infectivo** — también requiere su propia polimerasa.

### Nomenclatura que hay que poder invertir (fichas reversibles del propio artículo)
- **RNA polimerasa** = **DNA-dependiente, RNA polimerasa** (lee DNA, produce RNA).
- **Transcriptasa inversa** = **RNA-dependiente, DNA polimerasa** (lee RNA, produce DNA).
- **DNA polimerasa** = **DNA-dependiente, DNA polimerasa**.
- La enzima que convierte **-RNA → +RNA** = **RNA polimerasa dependiente de RNA**. *Nota del propio artículo*: aunque técnicamente sigue siendo una "RNA polimerasa", **NO es lo que se llama "RNA polimerasa" en el lenguaje corriente** (ese término reserva el sentido DNA-dependiente).

### ⚠ CORRECCIÓN
`[NLM-mic]` respondió que **transcriptasa inversa como "RNA-dependent DNA polymerase" NO ESTÁ EN LAS FUENTES**. **ES FALSO: está literal en el artículo ±RNA** (verificado hoy en el texto local).

### ⚠ MATIZ DE PROCEDENCIA — parvovirus B19
`[NLM-mic]` presenta como contenido del artículo la excepción del **parvovirus B19** (horquillas terminales que actúan de cebador para la DNA polimerasa del huésped → dependencia de **fase S** → tropismo por **eritroblastos** → **crisis aplásica transitoria**). **Verificado: esto NO lo escribe Alec en el cuerpo del artículo; lo aporta un lector llamado "Chris" en la sección de COMENTARIOS** (12-dic-2014), y **Alec responde endosándolo**: *"I had never thought about that before about parvovirus, but it makes complete sense!"* → El contenido es correcto y está en la fuente, pero **no es doctrina de Palmerton**: úsalo, sabiendo su procedencia.

## 30. Biología molecular de soporte (dentro del mismo artículo)

- **Transcripción** = DNA → RNA (mRNA). **Traducción** = mRNA → proteína; señal de inicio = **AUG**.
- **El RNA se sintetiza y se lee 5' → 3'.**
- **Procesamiento del RNA en eucariotas (3 pasos)**: **cap 5'** (7-metilguanosina), **poliadenilación 3'** (~**200 A**), **splicing** de intrones.
- **Función del cap 5'**: el RNA se degrada facilísimo → hay que **protegerlo de las exonucleasas** ("exo" porque cortan desde los extremos, frente a las "endo" que cortan por el medio).
- **Función de la cola poli-A**: el extremo 5' ya está protegido por el cap; las exonucleasas atacan por el 3', así que **una cola más larga = más tiempo hasta la degradación**. Es decir: **la cola poli-A fija la VIDA MEDIA del mRNA** y por tanto **limita cuánta proteína se fabrica a partir de un mRNA**.
- **Iniciación de la traducción**: la subunidad pequeña se une al cap 5' y avanza hasta el **AUG**; se le une la grande, los factores de iniciación y el tRNA iniciador (**Met** o **fMet**) que entra en el **sitio P**. **Procariota: 30S + 50S. Eucariota: 40S + 60S.** **El tRNA iniciador es el único que entra al sitio P; todos los demás entran por el sitio A.**

## 31. VIH, hepatitis y oncogénesis viral

- **VIH**: CD4 bajo → **ausencia de fiebre** ante infección grave (§24) e **IRIS** tras TARGA (§24). **Candidiasis oral** (parches blanquecinos con erosiones) como marcador de inmunosupresión `[NLM-mic]`.
- **VHB (DNA)**: fuerza a la célula a entrar en **fase S** para disponer de dNTP libres y expresa proteínas que **inactivan p53 y RB** → hepatocarcinoma **directo**, a tasas altas **incluso sin cirrosis**. **VHC (RNA)**: no necesita inducir división (el citoplasma ya tiene ribonucleótidos) → el hepatocarcinoma es **indirecto y lento**, por años de **inflamación crónica, cirrosis y regeneración** `[NLM-mic]`.
- **Vacuna VHB**: contiene **HBsAg** pero **NO** el antígeno core → vacunado = **anti-HBs positivo, anti-HBc NEGATIVO** `[NLM-mic]`.

## 32. Antimicrobianos: lo único que hay es química (y es potente)

### ANCLA (Memory Hack; `[NLM-mic]`)
La regla única: **"likes dissolve likes"** — pequeño + lipofílico + **sin carga** ⇒ cruza membranas pasivamente ⇒ buena biodisponibilidad oral, buena penetración tisular y a LCR.
- **Metronidazol**: pequeño, muy lipofílico, **sin carga** → altísima biodisponibilidad oral, excelente penetración pulmonar y **al LCR**.
- **Fluoroquinolonas**: pequeñas, lipofílicas, sin carga → excelente biodisponibilidad oral y penetración al parénquima pulmonar.
- **Vancomicina**: polímero **grande y polar** → no penetra pasivamente membranas ni tejidos avasculares (**abscesos no drenados**).
- **Lidocaína en tejido infectado**: el **pH ácido del absceso protona la amina terciaria** → la carga positiva le impide cruzar la membrana neuronal para bloquear los canales de Na⁺ **desde dentro** → **la anestesia local FALLA en tejido infectado**.
- **Lactulosa en encefalopatía hepática**: las bacterias intestinales la fermentan y acidifican el lumen → el **NH₃ no polar y absorbible** se protona a **NH₄⁺ polar** → **atrapamiento iónico** → se elimina por heces.

### Método de fichas de farmacología (Glass of Wine; `[NLM-mic]`)
> *"USMLE pharmacology is typically worth 40+ points on Step 1. With pathology, physiology, and **immuno/micro**, it is one of the most important subjects."* (Glass of Wine — literal, y la única vez que el corpus reconoce el peso de micro)

Los pasos: (1) copiar/pegar de un recurso electrónico; (2) tarjetas simples (mecanismo, uso, toxicidad); (3) usar **"add reverse"** de forma prioritaria porque el examen pregunta en las dos direcciones; (4) equilibrar la dificultad de las dos direcciones puntuándolas mentalmente 1-10; (5) en listas de efectos adversos difíciles, **incluir el número exacto de elementos** en la pregunta; (6) explicar siempre el **"por qué"** en el reverso. Ejemplo literal de tarjeta: *Front: "Hydralazine – mechanism" / Back: "↑ cGMP → smooth muscle relaxation (specifically arteriole > vein)"*.

Formato canónico de tarjeta (Palmerton Engine): **sujeto primero, luego guion** — *"Caffeine - connect its use to the different ways it is administered"* — ahorra hasta **5 segundos por tarjeta** al preparar el contexto antes de leer (`ua_q2_casos_answer.md`).

### NOTA DE COBERTURA
**Mecanismos de betalactámicos, cefalosporinas, aminoglucósidos, macrólidos, tetraciclinas, antifúngicos y antivirales: NO ESTÁN** `[NLM-mic]`.

## 33. Hongos y parásitos: VACÍO ESTRUCTURAL

`[NLM-mic]` (literal): **"Aspergillus, Cryptococcus, Pneumocystis, Toxoplasma, Malaria (falciforme/G6PD) y Giardia: NO ESTÁ EN LAS FUENTES."** Única mención micológica: **Candida oral** en el VIH. **No insistir con más consultas.**

---

## 34. CÓMO ESTUDIAR ESTE BLOQUE (método aplicado a heme/inmuno/micro)

1. **Regla del 80 %**: antes de escalar volumen, prueba el sistema en **un solo subtema aislado** (p. ej. "panel de hierro"): estudia las páginas de First Aid, construye tus tarjetas PC y **demuestra ≥ 80 % en 10 preguntas consecutivas de ese subtema en un día** (`ua_q2_casos_answer.md`).
2. **Tarjetas PC (Pathophysiological Connection)**: nunca preguntes "¿qué hace el fármaco X?". Cada tarjeta debe forzar el **por qué** y conectar los tres vértices: *(a) ¿cuál es la patogenia? (b) ¿cuál es la presentación clínica? (c) ¿cómo conecto una con la otra?* (`ua_q2_casos_answer.md`).
3. **Lectura CCSN** obligatoria en toda viñeta hematológica: **C**ontexto (¿qué significa este dato con los anteriores?), **C**ronología (reordenar en presente y en orden real — es lo que resuelve el caso de la TVP/TEP de §15), **S**everidad, **N**oise (`ua_q1_lectura_answer.md`).
4. **Tapa las opciones**: formula tu impresión diagnóstica **antes** de descubrirlas, para no contaminarte con distractores plausibles.
5. **Sé juez, no abogado**: pesa la preponderancia de evidencia imperfecta; **rule-in antes que rule-out**; la ausencia de un dato no descarta (§15).
6. **Ecuación del cubo agujereado**: `Conocimiento máximo retenido = Aprendido por día ÷ % olvidado por día` — la ganancia grande está en **bajar la tasa de olvido**, no en estudiar más horas (`ua_q2_casos_answer.md`).
7. **Botones de Anki**: solo **"Again"** (~10 %) y **"Good"** (~90 %); "Hard"/"Easy" meten ruido y disparan el volumen diario. FSRS puede bajar las revisiones a la mitad (ejemplo: de 159 a 73/día) sin perder retención (`ua_q2_casos_answer.md`).

---

## 35. PUNTOS CLAVE (resumen ejecutivo)

1. **Una sola pregunta gobierna toda la hematología**: ¿se están creando o destruyendo hematíes? VCM y reticulocitos son **señales**, no casillas (HY Heme).
2. **Hematíe = globo lleno de hemoglobina.** Menos hemoglobina → globo menos lleno → **microcítico (<80 fL)**; fallo de ADN → sobre-llenado → **macrocítico (>100 fL)**; problema de número → **normocítico (80-100 fL)** (Panel Fe).
3. **Panel de hierro con solo dos reglas**: ferritina = depósitos; **TIBC inversamente proporcional a ferritina** ("mi cuerpo busca hierro"). De ahí salen los tres perfiles (ferropenia / crónica / sideroblástica) sin memorizar la tabla (Panel Fe).
4. **IL-6 → hepcidina → degrada ferroportina** = anemia de enfermedad crónica, y su razón de ser es **matar de hambre a las bacterias ávidas de hierro** (Listeria) (Panel Fe; HY Immuno).
5. **LDH sube en la hemólisis porque el hematíe no tiene mitocondrias** y vive de la glucólisis anaerobia — pero es **inespecífica** (HY Heme).
6. **Trampa del metilfolato**: solo 2 enzimas usan B12; sin B12 la metionina sintasa se para y **todo el folato queda atrapado como metil-THF** (reacción irreversible) → sin ADN → macrocitosis (HY Heme).
7. **"Varón (o posmenopáusica) con anemia ferropénica = cáncer de colon hasta que se demuestre lo contrario"**, porque no menstrúan y no hay otra fuente regular de pérdida (HY Heme).
8. **"The EX-PresidenT went to WARfarin"**: extrínseca → PT → warfarina; intrínseca → PTT → heparina (Coag 2).
9. **Warfarina también baja proteína C** (vida media ~1 día, igual que el factor VII) → **hipercoagulabilidad transitoria** → necrosis cutánea en déficit de proteína C/S → por eso se **puentea con heparina** (Coag 1).
10. **Química = clínica**: heparina polar → ni oral ni placenta (**embarazo: heparina**); warfarina apolar → oral y cruza placenta. Protamina (+) neutraliza heparina (−) (Coag 2).
11. **HIT** = IgG contra heparina-PF4 → trombocitopenia **y** trombosis → tratar con inhibidores directos de trombina (argatrobán, bivalirudina, **de sanguijuelas**) (Coag 2).
12. **Defecto primario → sangrado mucocutáneo; secundario → profundo y RESANGRA**, porque el tapón se forma pero no se refuerza con fibrina (Coag 2).
13. **Electroforesis de Hb = Western blot** (la Hb es proteína). **HbS: glu→val (menos negativa)**; **HbC: glu→lys (positiva, la que menos migra al +)** (Electroforesis).
14. **ABO = carbohidrato → solo IgM → no cruza placenta. Rh = proteína → IgG → cruza** → la eritroblastosis fetal es de Rh. **RhoGAM = inmunización pasiva** (ABO/Vacunas).
15. **Los linfocitos T solo se activan contra PROTEÍNAS** porque el MHC solo presenta péptidos → sin proteína no hay cambio de isotipo, ni hipermutación somática, ni memoria → **esa es toda la lógica de la vacuna conjugada** (ABO/Vacunas).
16. **BTK debuta a los ~6 MESES** porque hasta ahí el lactante vive de los anticuerpos maternos — "key Step 1 fact" literal (ABO/Vacunas). ⚠ NotebookLM lo negó por error.
17. **"one hot T-bone stEAK"**: IL-1 fiebre (COX/prostaglandinas), IL-2 T, IL-3 médula, IL-4 IgE, IL-5 IgA, IL-6 fase aguda/VSG. **TNF-α = "cachectina"** = caquexia. **IFN-γ = macrófago → célula epitelioide** (HY Immuno).
18. **La célula definitoria del granuloma es la CÉLULA EPITELIOIDE, NO la célula gigante** — Alec anticipa la pregunta y el distractor (HY Immuno).
19. **Inflamación crónica = macrófagos + linfocitos**, y explica el solapamiento de TB, cáncer, sarcoidosis, arteritis de células gigantes, lupus y AR (HY Immuno).
20. **IAM = modelo de respuesta a la lesión** (24 h neutrófilos, 3-5 días macrófagos, semanas fibrosis) porque es reproducible entre personas y admite "una sola respuesta correcta" (HY Immuno).
21. **Tipo II = antígeno FIJO (IF lineal); tipo III = antígeno SOLUBLE (IF granular/lumpy-bumpy)**; Wegener es **pauci-inmune** porque los ANCA activan neutrófilos como "granadas" `[NLM-inm]`.
22. **La ausencia de fiebre no descarta infección grave** en ancianos y en CD4 bajo; **IRIS** es el rebote febril al recuperar el CD4 (HY Immuno).
23. **Bacteriuria significativa ≥ 100 000 colonias/mL**; **80 000 con inflamación crónica = infección amurallada** → control del foco, porque **dentro del absceso no hay vasos** (HY Immuno).
24. **+RNA desnudo = infectivo (es mRNA); -RNA no** (falta la RNA-pol dependiente de RNA). dsDNA sí, **salvo Pox y Hepadna**; **ssDNA no** (±RNA).
25. **"Likes dissolve likes"**: metronidazol y fluoroquinolonas penetran; vancomicina no; **la lidocaína falla en tejido infectado** porque el pH ácido la protona (Memory Hack).
26. **Vacío estructural del cuaderno**: micología, parasitología, la mayoría de antimicrobianos, inmunodeficiencias por patrón, esferocitosis/Howell-Jolly, hemofilia/vWD, y casi todas las leucemias y linfomas. **Cubrirlos con UWorld (5 niveles) + First Aid aplicando el método de §34.**

---

## 36. FUENTES USADAS EN ESTE FICHERO

**Transcripciones y artículos leídos ÍNTEGROS en local** (`scratchpad/palmerton_v3/clean_heme/`): High Yield Hematology for Shelf Exams & Step 1 + Step 2 CK; High Yield Immunology for Shelf Exams & Step 1 + Step 2 CK; How Can You Master Coagulation for the USMLE Step 1? (Part 1); (Part 2); Can You Connect the Mechanism of Anemia with the Iron Panel Results on the USMLE Step 1?; Could You Connect Conjugate Vaccines and ABO Incompatibility for the USMLE Step 1?; Gel electrophoresis (Southern, Northern, Western Blot), Hemoglobin Electrophoresis (HbC, Sickle cell disease); Why Does the USMLE Step 1 Care if a Virus Has +RNA or -RNA?; MONA and THROMBINS2 (solo la parte de antiagregación/anticoagulación). Extracto local de How to Master Step 1 Pharmacology Over a Glass of Wine (`raw/art_pharm_glass_wine.txt`).

**Respuestas NotebookLM previas reutilizadas**: `nlm_gaps_heme_answer.md` (hemólisis intra/extravascular, G6PD, falciforme, PTI/PTT/SUH/CID, Virchow/TEP/filtro VCI, Coombs, TRALI/TACO, Burkitt, mieloma, reticulocitos); `ua_q1_lectura_answer.md` (framework CCSN, caso ACO→vuelo→TEP, juez vs abogado, filtro de VCI como rule-in); `ua_q2_casos_answer.md` (método: 80 %, tarjetas PC, formato sujeto-guion, FSRS, botones).

**Consultas NotebookLM nuevas de esta sesión (8-sep-2026)**, `conversation_id 6ca8c62f-6a1d-43ab-8d1f-23a4c913c5ce`: (1) inmunología completa — respuesta de 16 846 caracteres, guardada en `tool-results/q_immuno_answer.md`; (2) microbiología/ID completa — respuesta inline (~17 000 caracteres), con múltiples "NO ESTÁ EN LAS FUENTES" explícitos; (3) hematología-complemento — respuesta de 18 411 caracteres, guardada en `tool-results/q_heme3_answer.md`. Fuentes que NotebookLM declara haber usado: HY Immuno, HY Heme, HY FM 1 y 2, HY GI 1 y 2, HY Endo, HY Biochem, HY Peds, HY Surgery, HY Cardio 1 y 2, HY Pharm 2, ABO/Vacunas, Coag 1 y 2, Panel Fe, ±RNA, Memory Hack, Glass of Wine, UW+FA, *8 Signs That You're Studying Wrong*, *How to Score 260+ on USMLEs in 2026*, *The 8 Most Important Study Techniques*, *Stuck Below 220 on Step 2*, *The Thoughtful Step 1 Pass-Fail Study Plan*, *Anki Was Hurting This Med Student's Score*, *How a Caribbean IMG Gained 30 Points*.

---

## 37. PENDIENTE_USUARIO (instrucción precisa)

1. **⚠ TRES ERRORES DE NOTEBOOKLM CORREGIDOS POR LECTURA DIRECTA — no reintroducirlos**:
   a. **BTK a los 6 meses**: NotebookLM dijo "NO ESTÁ"; **SÍ está**, literal, en *Could You Connect Conjugate Vaccines and ABO Incompatibility* ("this is a key Step 1 fact"). Ver §22.
   b. **Transcriptasa inversa = "RNA-dependent DNA polymerase"**: NotebookLM dijo "NO ESTÁ"; **SÍ está**, literal, en *Why Does the USMLE Step 1 Care if a Virus Has +RNA or -RNA?*. Ver §29.
   c. **Parvovirus B19 / horquillas / fase S / crisis aplásica**: NotebookLM lo presenta como doctrina del artículo; **está en la SECCIÓN DE COMENTARIOS** (lector "Chris", 12-dic-2014), endosado por Alec en su respuesta. Correcto, pero no es doctrina de Palmerton. Ver §29.
2. **[A VERIFICAR (08-sep)] — haptoglobina / hemoglobinuria / hemosiderinuria**: `nlm_gaps_heme_answer.md` las desarrolla citando HY Family Medicine 2 / HY Surgery / HY Hematology, pero la consulta de hoy respondió **"NO ESTÁ EN LAS FUENTES"** y **no aparecen en la transcripción local de HY Hematology** (verificado). Antes de usarlas como "lo dice Palmerton", relanzar una consulta con `source_ids` limitado a HY Family Medicine Part 2 (`3aad0c3f-e6cd-4c57-9f09-04801ba5c4a0`) y HY Surgery Review (`9ee1614b-25db-4a20-8ede-33af3d2bf6cf`).
3. **[A VERIFICAR (08-sep)] — ADAMTS13 y plasmaféresis en PTT**: `[NLM-gaps]` dijo que no estaban; `[NLM-inm]` de hoy sí las recupera (fuente citada: *The ONLY Video You Need to Pass the USMLE Step 1 in 2026*). Cotejar antes de fijarlo como dato de examen.
4. **[A VERIFICAR (08-sep)] — anemia sideroblástica y vitamina B6**: `[NLM-hem]` añade "a menudo por deficiencia de vitamina B6, cofactor de la síntesis de porfirinas" citando un fichero llamado `guia-estudio-usmle.md`, que **es una fuente DERIVADA añadida al cuaderno, no material original de Palmerton**. El artículo del panel de hierro solo dice "defecto en la síntesis del hemo". No atribuir el detalle de B6 a Palmerton.
5. **NO insistir con más consultas a NotebookLM sobre** (vacíos declarados explícitamente): hongos (Aspergillus, Cryptococcus, Pneumocystis), parásitos (Toxoplasma, malaria, Giardia), mecanismo molecular de betalactámicos/aminoglucósidos/macrólidos/tetraciclinas/antifúngicos/antivirales, esferocitosis hereditaria, cuerpos de Howell-Jolly, esplenectomía, hemofilia A/B, enfermedad de von Willebrand, tiempo de sangría, estudio de mezclas 1:1, reacción transfusional febril no hemolítica / alérgica / anafilaxia por IgA / contaminación bacteriana, PNH (CD55/CD59), policitemia vera y JAK2 V617F, t(9;22)/imatinib, t(15;17)/ATRA, t(11;14), LLA, LLC, Reed-Sternberg, cuerpos de Russell, crisis vasooclusivas/autoesplenectomía/hidroxiurea en HbF, hiperesplenismo, hematopoyesis extramedular, shock index, SCID/DiGeorge/CGD/complemento-Neisseria/Chédiak-Higashi/hiper-IgE/hiper-IgM/Wiskott-Aldrich. **Todo esto se cubre con UWorld (5 niveles) + First Aid aplicando el método de §34.**
6. **Alta prioridad de cara al plan v5.7**: el bloque **MICROBIOLOGÍA/ID no tiene columna vertebral Palmerton**. En los días de micro del `usmleStep1Daily.ts` no se puede anclar en el cuaderno; hay que apoyarse en First Aid + UWorld y aplicar el marco de §34 (tarjetas PC + CCSN + regla del 80 %). Conviene reflejarlo en `PALMERTON_DIVERGENCIAS_PLAN.md`.
7. **Posible fuente adicional no explotada**: `[NLM-mic]` cita *"Anki Was Hurting This Med Student's Score. Now She Uses It Right"* como la fuente del dato de la cápsula de *Bacillus anthracis*. Ese vídeo no está descargado en local; si hace falta más micro incidental, empezar por ahí.
