# DERMA · Método desde CERO + preguntas REALES (v6.10e · 18-nov-2026)

> Orden de Joseph (18-nov-2026): *«Todos estamos partiendo de CERO… las preguntas tienen que ser preguntas REALES… estructura planes bien
> estructurados, verifica todo; empezamos mañana 19»*. Este documento es una **síntesis propia** con sus fuentes. No copia material de
> academias ni plataformas: solo títulos, ids, conteos y minutos.
>
> Código: `DATA/DERMATOLOGIA/guia/guia_catalogo_derma.js` (decisiones) → `gen_derma_guia.js` (genera y valida) → `src/lib/dermaGuiaDatos.ts`
> (generado) + `src/lib/dermaGuia.ts` (lógica: `DERMA_FASES`, `practicaReal`). Comprobación: `node DATA/DERMATOLOGIA/guia/gen_derma_guia.js --check`.

## 1. Resumen en 8 líneas

1. **Se empieza por el lenguaje.** Antes de diagnosticar se describe la lesión: lesión elemental, color, configuración y distribución
   (fase 1, d1-d6). Las enfermedades llegan después: inflamatorias (fase 2), infecciosas (fase 3) y, en 2027, el resto.
2. **Las preguntas son siempre de un banco real con su fuente**: uWorld Step 1 › Dermatology (Systems y nº de preguntas reales),
   ProMIR Dermatología (preguntas **MIR oficiales**, por capítulo), los casos de los **DermNet Quizzes** (imagen real y respuesta de DermNet)
   y, cuando vuelva el acceso, AccessDerma (Board Review cases, Pictorial Review 4e). **El proyecto Claude «AESTHETIC DERMATOLOGY» se quitó de
   las 103 sesiones** (viñetas, «dictado inverso», tabla y las «8 preguntas de verificación» las generaba una IA).
3. **Si un tema no tiene banco real abierto** (estética, dermatopatología, cirugía), el paso es **PRÁCTICA SIN PREGUNTAS**: recall en blanco
   a papel, contraste con la lectura del día, explicación en voz alta y tarjetas. Nunca preguntas inventadas.
4. **Pocas preguntas y en Tutor al principio**: 3-5 uWorld por sesión en modo Tutor (2,35′/Q), 4-8 casos DermNet de ~2′ y el test ProMIR del
   capítulo (8Q) una sesión de cada tres.
5. **Para pasar de fase se exige un dominio del 80 % en 10 casos o preguntas seguidos**, la regla de Palmerton (abajo, §2). Si no llegas, las
   fechas no se mueven: se ajusta el método en este orden: recursos → comprensión → aplicación → memoria.
6. **Mismas horas y fechas.** 13:30-14:15 en días alternos con Research. Solo cambia el contenido del paso que ocupaba el proyecto Claude, y
   con los mismos minutos.
7. **Tiempo ↔ material, en el intervalo [0,85; 1,15]**: casos DermNet a ~2′ por caso (lo dice el propio quiz) · lectura en inglés a 100 palabras/min
   + 0,25′ por figura · ProMIR a 77 s/Q · uWorld Tutor a 2,35′/Q. El `--check` lo comprueba.
8. **Con el alias v6.10d, el día real es el hábil siguiente a la fecha del plan**: d1 tiene fecha de plan mié 18-nov y se hace el jue 19-nov.
   Las fechas del plan no se tocan: el alias lo integra otro flujo.

## 2. Método (nombrado y referenciado)

| Pieza | Qué dice | Fuente |
|---|---|---|
| **Caso visual Palmerton-derma** | Imagen ciega → dictado de los 8 ejes → diferencial de 3 ANTES de leer → respuesta → tarjeta de MECANISMO + registro en el ledger | `PLAN_ELITE_2026-27.md` §3 (repo) |
| **Describir antes de etiquetar** | Primero distribución, morfología de la lesión (plana, elevada o deprimida; mácula, pápula, placa, nódulo…), consistencia y configuración; después el diagnóstico | **NLM** · cuaderno «DERMA · Élite Engine», fuente «Terminology in dermatology» (DermNet) |
| **Dermatoscopia: primero el triaje para no expertos** | La lista de 3 puntos y TADA, pensadas para no expertos, van ANTES del análisis de patrones | **NLM** · «Dermoscopy. Three-point checklist» · «Triage amalgamated dermoscopic algorithm (TADA) for skin cancer screening — PubMed» · «Dermoscopy. Other algorithms» / «First step algorithm» |
| **Error típico del principiante** | El principiante sobrediagnostica melanoma, y al empezar con la dermatoscopia hace más extirpaciones innecesarias | **NLM** · «Dermoscopy. Introduction to dermoscopy» |
| **Qué evalúa el examen** | El CORE (ABD) pide diagnosticar a partir de imágenes o descripciones escritas y dar un diferencial priorizado | **NLM** · ABD «CORE study guide» (PDF) |
| **Graduación por dominio** | Se sube de nivel con un 80 % en 10 preguntas seguidas, en Tutor y sin reloj al principio. Si no se llega, se aplican los Four Critical Adjustments en orden: recursos → comprensión → aplicación → memoria | `DATA/USMLE/PALMERTON_NIVEL0_ARRANQUE.md` §3.1, §3.4 y §4 (repo; Palmerton, *UWorld Complete Guide: The Five Levels of Mastery*) |
| **Seguridad antes que técnica** | Las complicaciones de los rellenos (oclusión vascular, ceguera) se dominan antes que la técnica | `PLAN_ELITE_2026-27.md` §4 (repo) |

**Lo que NO dicen las fuentes (NLM, 18-nov):** no traen un plan de 6 semanas en días alternos ni fijan porcentajes para pasar de un tema a
otro. Tampoco dicen cuántas preguntas hacer por sesión ni cuándo pasar del modo Tutor al cronometrado. Por eso esas cifras salen de la regla de
Palmerton del Step 1, aplicada aquí: es una **síntesis**, no una cita de las fuentes de dermatología.

## 3. Bancos REALES (y lo que se quitó)

| Banco | Qué hay (verificado) | Uso |
|---|---|---|
| uWorld Step 1 › Dermatology (Qbankly) | 6 Systems, 99 Q (`DATA/USMLE/qbankly_uworld_step1_filtros.tsv`) | Plan B: 3-5 Q en Tutor por sesión, sin pasarse del stock (validado) |
| ProMIR Dermatología | Preguntas **MIR oficiales** por capítulo (cap. 1-10) | Test de 8Q del capítulo una sesión de cada tres + las 2Q de la 2.ª pasada + d15 (4Q) |
| **DermNet Quizzes** (dermnetnz.org/quizzes) | 57 quizzes públicos y gratuitos de DermNet, con imagen real y la respuesta tras «Show Answers». Cada quiz declara su tiempo: ~2′ por caso (~5′ en «Mixed diagnoses» 3-11). Leídos el 18-nov-2026: título, nº de casos y minutos (`DERMNET_QUIZZES`) | **Sustituye al proyecto Claude**: F1 con un rango fijo de casos por sesión, sin repetir; 2027 con el quiz afín |
| DermNet «Three-point checklist» (curso CME) | 372 palabras + 44 imágenes = 14,72′ (medido el 18-nov) | d6: el algoritmo para no expertos antes de los casos |
| StatPearls «Anatomy, Head and Neck: Facial Artery» (NBK536932) | 852 palabras + Figura 1 = 8,77′ (leído en Chrome el 18-nov) | d5: base real de la tabla de arterias, que haces tú |
| AccessDermatology (plan A) | Dermatology Cases for Board Review (200), Pictorial Review 4e (381), CORE (104)… | Acceso remoto CADUCADO → plan A en reserva |
| Citados por NLM, sin acceso | AAD Board Prep Plus / Question of the Week / JAAD quizzes, ABD CertLink y Sample Items, ASDS ResQ | No se usan (de pago o con otra cuenta); quedan como referencia |

**Lo que se quitó (todas las sesiones, F1 y 2027):** el proyecto Claude «AESTHETIC DERMATOLOGY»: «dictado inverso» (d1), «viñetas en fototipo IV-VI»
(d4), «tabla de arterias + 8 preguntas de verificación» (d5) y «casos de texto del átomo · k viñetas» (por regla, en 13 sesiones de F1 y en las
86 sesiones de 2027). El generador **aborta** si cualquier guía vuelve a mencionarlo o a pedir viñetas o preguntas a una IA (`IA_RE`).

## 4. Fases (base cero)

Cada guía, tanto del plan A como del B, abre su aviso con la fase en curso, lo que se trabaja en ella y el criterio para pasar a la siguiente (`dermaFaseAviso`).

| Fase | Sesiones (fecha de plan) | Qué se hace | Criterio para pasar |
|---|---|---|---|
| **1 · Lenguaje y estructura** | d1-d6 (mié 18-nov → mié 2-dic) | Describir antes de diagnosticar: lesión elemental, color, configuración y distribución; estructura de la piel; fototipos; anatomía facial; dermatoscopia de triaje (lista de 3 puntos). Preguntas en Tutor o en modo estudio, sin cronómetro: los s/Q de cada paso (77 s ProMIR, ~60 s Pictorial) son el presupuesto de la franja, no un reloj (fix del 18-nov: los TEST ProMIR del d3 y el d6 lo dicen en su paso) | ≥ 80 % de lesiones elementales bien nombradas en 10 casos DermNet seguidos (ledger) |
| **2 · Patrones inflamatorios** | d7-d13 (vie 4 → mar 22-dic) | Psoriasis, eccemas, acné, ampollosas, urticaria, farmacodermias y conectivopatías: uWorld en Tutor, casos DermNet del tema y test ProMIR del capítulo | ≥ 80 % en 10 casos o preguntas seguidos de la fase |
| **3 · Infecciosas y parasitosis** | d14-d18 (jue 24-dic → mar 5-ene) | Bacterianas, sífilis e ITS, virales, micosis y parasitosis: de la lesión elemental al agente | ≥ 80 % en 10 seguidos + test ProMIR del cap. 2 corregido |
| 4 · Seguridad de rellenos | d19-d20 (ene-2027) | Oclusión vascular y ceguera, antes que cualquier técnica | Protocolo HDPH y kit de emergencia recitados de memoria sin error |
| 5 · Tumores y dermatoscopia | d21-d28 | Lesiones benignas, queratosis actínica, CBC y CEC, melanoma, dermatoscopia II-III, linfomas, fotoenvejecimiento | ≥ 80 % en 10 casos seguidos de tumores y lesiones pigmentadas |
| 6 · Dermatopatología | d29-d33 | Patrones de inflamación, vocabulario, ampollosas, tumores, depósitos | Los patrones dibujados y nombrados de memoria (no hay banco real abierto) |
| 7 · Pediatría y genodermatosis | d34-d38 | Dermatosis neonatales, hemangiomas, exantemas y Kawasaki, facomatosis, genodermatosis | ≥ 80 % en 10 casos seguidos |
| 8 · Cirugía dermatológica | d39-d43 | Anatomía quirúrgica, biopsias, suturas, colgajos, Mohs | Pasos y complicaciones recitados sin error (no hay banco real abierto) |
| 9 · Consolidación + checkpoints | d44-d52 | Alivio del Step 1, segunda pasada de fallos, cicatrización, mapa CORE | Cada módulo CORE con ≥ 80 % en sus 10 últimos casos |
| 10 · Estética (seguridad primero) | d53-d71 | Anatomía 3D → toxina → rellenos → peelings → láser → cosmecéutica | Indicación, complicación y manejo recitados sin error (no hay banco real abierto) |
| 11 · Repaso intercalado + ciclo 2 | d72-d103 | Casos restantes, segunda pasada FSRS y práctica MEZCLADA («Mixed diagnoses» de DermNet) | 80 % sostenido en bloques mixtos |

## 5. F1, sesión a sesión: qué cambió (plan B, 13:30-14:15, 45′; solo el paso del hueco)

El día real sale del alias v6.10d: cada fecha del plan se hace el hábil siguiente. Los demás pasos (Anki, uWorld, lecturas, B&B, atlas
DermNet y cierre) **no cambian**.

| d · fecha de plan → día real | Antes (proyecto Claude) | Después (REAL) |
|---|---|---|
| d1 · mié 18-nov → jue 19 | 10′ «dictado inverso»: 5 descripciones generadas por la IA | 10′ DermNet «Acne – 16 cases», casos 1-5 (lesiones PRIMARIAS: nombrarlas antes de «Show Answers») |
| d2 · vie 20 → lun 23 | — (sin proyecto) | — |
| d3 · mar 24 → mié 25 | — | — |
| d4 · jue 26 → vie 27 | 15′ «3 viñetas en fototipo IV-VI» | 15′ DermNet «Brown skin lesions – 12 cases», casos 4-11 (8 × 2′ = 16′; 1,07) |
| d5 · lun 30-nov → mar 1-dic | 20′ «tabla de arterias + 8 preguntas de verificación» | 9′ StatPearls «Facial Artery» (8,77′ medidos) + 11′ TABLA de las 6 arterias hecha por ti; el MAPA DE MEMORIA (5′) pasa a ser un recall en blanco |
| d6 · mié 2 → jue 3-dic | 23′ «≈5 viñetas» | 15′ DermNet «Three-point checklist» (14,72′ medidos) + 8′ «Dermoscopy local features quiz», casos 1-4 |
| d7 · vie 4 → lun 7 | — (el atlas llena la franja) | — |
| d8 · mar 8 → mié 9 | — | — |
| d9 · jue 10 → vie 11 | 9′ «≈2 viñetas» | 9′ «Acne – 16 cases», casos 12-16 (5 × 2′ = 10′; 1,11) |
| d10 · lun 14 → mar 15 | 15′ «≈3 viñetas» | 15′ «Blistering conditions affecting the feet», casos 1-8 (16′; 1,07) |
| d11 · mié 16 → jue 17 | 15′ «≈3 viñetas» | 15′ «Solitary red patches – 17 cases», casos 6-13: repaso INTERCALADO de la fase 2 (16′; 1,07) |
| d12 · vie 18 → lun 21 | 10′ «≈2 viñetas» | 10′ «Cutaneous adverse reactions – 10 cases», casos 1-5 |
| d13 · mar 22 → mié 23 | 10′ «≈2 viñetas» | 10′ «Different causes of purpura – 10 cases», casos 1-5 |
| d14 · jue 24 → lun 28 | 11′ «≈2 viñetas» | 11′ «Leg rashes and unwell – 10 cases», casos 1-6 (12′; 1,09): ¿es celulitis o no? |
| d15 · lun 28 → mar 29 | 5′ «≈1 viñeta» | 5′ ProMIR cap. 2: 4Q MIR oficiales más (5,13′; 1,03), porque 5′ no cuadra con casos de 2′ |
| d16 · mié 30 → jue 31 | 10′ «≈2 viñetas» | 10′ «Skin conditions due to fungi, bacteria and viruses», casos 1-5 |
| d17 · jue 31 → vie 1-ene | 10′ «≈2 viñetas» | 10′ «Fungal infections – 12 cases», casos 1-5 |

En F1 hay 64 casos reales de DermNet en 11 pasos, sin repetir ningún caso (validado) + 4Q de ProMIR. **La fase de cada sesión ya figura en el
aviso de su guía** (d1-d6: fase 1 · d7-d13: fase 2 · d14-d17: fase 3).

**Fix del 18-nov (revisión de los frentes):** el aviso de la fase 1 decía «preguntas en Tutor, sin reloj» y el TEST 8Q ProMIR del d3 (plan 24-nov →
real 25-nov) y del d6 (plan 2-dic → real 3-dic), planes A y B, decía «77 s/Q» a secas. Ahora esos pasos empiezan por «En modo estudio, SIN cronómetro
(fase 1)» y el aviso aclara que los s/Q son el presupuesto de la franja. Mismas preguntas y minutos.

## 6. 2027: fase por tramo y cambios (sin medir, como antes)

- **Fase de cada tramo**: tabla del §4 (`DERMA_FASES`, en el aviso de cada guía).
- **El hueco del plan B** (antes, el proyecto Claude) se llena así:
  - k casos del **quiz DermNet afín** (`DN_SUB`, con k = minutos/2 y ratio en 0,85-1,15), «desde el primer caso que F1 no usó». Si el quiz se
    acaba, se sigue en el siguiente de la lista.
  - Si el hueco es de 3-6′: **preguntas MIR oficiales** de ProMIR (77 s/Q).
  - Si el tema no tiene banco real abierto (estética d19-d20 y d53-d71, dermatopatología d29-d30, cirugía d39-d43 y d50): **PRÁCTICA SIN
    PREGUNTAS**.
  - Los repasos, checkpoints y el ciclo 2 usan los «Mixed diagnoses» (práctica intercalada).
  - Recuento en 2027: 55 sesiones con casos DermNet · 30 con práctica sin preguntas · 1 con ProMIR (d36).
- **Nada se quita y los minutos no cambian.** El reparto de uWorld y de los tests ProMIR es el mismo que antes.

## 7. Fuentes

- **NLM** · cuaderno «DERMA · Élite Engine (Palmerton derma · fuentes verificadas)», con 85 fuentes, consultado el 18-nov-2026 por Chrome en dos
  preguntas: fases, morfología, bancos y errores; y títulos exactos de las fuentes. Fuentes citadas por el cuaderno: «Terminology in dermatology»,
  «Dermoscopy. Three-point checklist», «Triage amalgamated dermoscopic algorithm (TADA) for skin cancer screening — PubMed», «Dermoscopy. Other
  algorithms», «Dermoscopy. First step algorithm», «Dermatoscopic-histologic correlation», «Dermoscopy. Pattern analysis», «Dermoscopy. Introduction
  to dermoscopy», ABD «CORE study guide», AAD «Basic Dermatology Curriculum», «Dermatoscopy. Dermoscopy. Contents page» (DermNet).
- **Web** (18-nov-2026): https://dermnetnz.org/quizzes (índice + páginas /case/N: título, nº de casos y el «Each case should take approximately
  2 minutes») · https://dermnetnz.org/cme/dermoscopy-course/three-point-checklist · https://www.ncbi.nlm.nih.gov/books/NBK536932/ (StatPearls,
  Fakoya AO, Nessel TA, Downs BW, act. 6-may-2024).
- **Repo**: `PLAN_ELITE_2026-27.md` §2-§4 y §14-§15 · `DATA/USMLE/PALMERTON_NIVEL0_ARRANQUE.md` §3-§4 · `guia/dermnet_medidas_f1.json` ·
  `_scrape/*` (AccessDerma, Qbankly, ProMIR).
