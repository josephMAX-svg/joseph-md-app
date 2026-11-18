# PALMERTON · BIBLIOTECA — ÍNDICE (canal completo → estado en los cuadernos) · 18-nov-2026

> **Qué es.** El inventario completo del canal de YouTube de Alec Palmerton, MD (`@alec.palmerton_md`, marca Yousmle) a fecha **18-nov-2026**, cruzado con los dos cuadernos de Gemini Notebook (NotebookLM) que lo contienen. Es la puerta de entrada de la carpeta `DATA/USMLE/palmerton/` (biblioteca de **investigación y documentación**: no toca la app ni el plan; el plan del Step 1 lo implementa otro flujo).
>
> **Repo público.** Aquí solo hay títulos, ids, duraciones, capítulos (metadatos públicos de YouTube) y **síntesis propia**. No se copia material de pago ni transcripciones.

## Carpeta

| Fichero | Qué contiene |
|---|---|
| `METODO_BASE_CERO.md` | **Leer primero**: el método desde cero en 12 líneas, cada una remitida a su fichero. |
| `INDICE.md` | Este inventario: 235 vídeos del canal, su categoría y si están en el cuaderno A, en el B, en ambos o en ninguno. Al final, el resumen de los 27 vídeos nuevos. |
| `FASES.md` | Las fases del método desde cero (First Aid 5 fases · UWorld 5 niveles · Anki · NBME/Free 120), con el criterio para pasar de una a otra. |
| `PROCESO_PREGUNTA.md` | Cómo se responde UNA pregunta (8 pasos) y cómo se revisa después (clasificar el error → tarjeta → registro). |
| `SINTESIS.md` | Qué es el «conocimiento de síntesis» para Palmerton: principios, cronología fisiopatológica, derivar, modelos mentales, ecuaciones que cruzan sistemas. |
| `CARDIO.md`, `RESPIRATORIO.md`, `RENAL.md`, `GI.md`, `ENDOCRINO.md`, `NEURO.md`, `HEMATO_ONCO.md`, `INMUNO.md`, `MICRO.md`, `FARMACO.md`, `BIOQUIMICA_GENETICA.md`, `BIOESTADISTICA_ETICA.md`, `REPRO.md`, `MSK_DERMA.md`, `PSIQUIATRIA.md`, `PATOLOGIA_GENERAL.md`, `IMAGEN_RADIOLOGIA.md` | Un fichero por sistema: vídeos con capítulos y minuto, cómo lo enseña Palmerton, cómo estudiarlo desde cero, artículos de yousmle.com, vacíos. |

## Los dos cuadernos

| Cuaderno | Id | Fuentes (18-nov) | Uso |
|---|---|---|---|
| **A · «STEP 1 · Palmerton Engine (método + sistemas)»** | (id privado; no va en el repo público) | **299** = 150 vídeos + 149 artículos/páginas de yousmle.com | Cuaderno histórico (27-ago). **Está a 1 fuente del tope de 300 del plan Pro**: no admite la ampliación. Lo usa además el flujo del Step 1 (no se chateó en él para no mezclar su historial). |
| **B · «STEP 1 · Palmerton Biblioteca II (sistemas · proceso · fases)»** | (id privado; no va en el repo público) | **87** vídeos (84 con transcripción + 3 importaciones fallidas) | Creado el 18-nov por este frente: todas las clases por sistema + todo el proceso de pregunta, Anki, fases y los pódcast/casos de Step 1 que faltaban en A. Todas las consultas «NLM» de esta carpeta salen de aquí. |

- **Cómo se cruzó.** (1) `yt-dlp --flat-playlist` de la pestaña Vídeos del canal (227) y de sus 12 listas (240 entradas) → **235 ids únicos** (8 solo en listas: 4 sin título «NA», que no son públicos, y 4 de tutorías). (2) Títulos de las 150 fuentes de vídeo de A leídos en la página del cuaderno; casados por título exacto (137) y, para 13 títulos que Palmerton cambió después de la importación, por el registro de ids del 31-ago (`palmerton_channel.txt` / `palmerton_playlists.txt`, scratchpad) y `src/lib/usmlePalmertonData.ts`: **150/150 casados**, ninguno huérfano. (3) Los capítulos (minutos) son metadatos públicos de cada vídeo (`yt-dlp --skip-download`), no transcripciones: NotebookLM **no** da minutos (lo dice él mismo: «las transcripciones no incluyen marcas de tiempo»).
- **Fallidas en B (sin transcripción en NotebookLM):** `PZh_5o-rRGI` *How to Solve ANY Hard USMLE Question for 260+*, `Uvyy5fL0oMg` *How to Boost USMLE Scores by 12 points in 1 Week*, `4x3V98aZ3s0` *Failed Step 1 to 73% NBME*. Los dos primeros ya fallaron en A en septiembre: son vídeos de lista (no aparecen en la pestaña Vídeos). De ellos solo se usan sus **capítulos** (título + minuto) como índice, nunca contenido.
- **Títulos cambiados** (A conserva el antiguo): p. ej. *How to Guarantee a Step 1 Pass (Proven System)* = hoy *How to (Virtually) Guarantee a Step 1 Pass (Step-by-Step Guide)* (`ruFfBeg05ZM`); *The One Clue Top Step 2 Scorers Never Miss* = hoy *Stuck Between Two Answers? This Is How Top Scorers Choose* (`5CT6bZIY7p4`); *I Haven't Had to Re-Learn Anything in 17 Years* = hoy *Why Anki Gets Worse Before It Works* (`XNW-NxBA2Fw`). La columna «A» lo indica.
- **Artículos de yousmle.com (149, solo en A):** catalogados uno a uno en `../PALMERTON_INDICE_FUENTES.md` (12-sep). Los que tratan un sistema se citan en el `.md` de ese sistema.
- **No se añadieron (55):** carrera/residencia/match (21), otros exámenes ABIM/ABEM/CBSE (8), método Step 2/shelf (13), Step 3 (1), 4 no públicos y 8 pódcast de mentalidad general. Ninguno trata un sistema del Step 1 ni el proceso de pregunta; quedan listados abajo para la fase Step 2 (2027).
- **Qué NO tiene el canal:** no hay clase *High Yield* de **Reproductor, MSK/Reuma/Derma, Psiquiatría ni Microbiología**. Esos sistemas se trabajan con el método general (`SINTESIS.md`, `PROCESO_PREGUNTA.md`), los artículos de yousmle.com y los recursos del plan (First Aid, B&B, UWorld). Su `.md` lo dice y no inventa contenido.

## Resumen por categoría

| Categoría | Vídeos | Solo en A | Solo en B | En A y B | En ninguno |
|---|---|---|---|---|---|
| 1 · Contenido por sistema (High Yield / ecuaciones / imagen) | 22 | 0 | 3 | 19 | 0 |
| 2 · Proceso de pregunta (interpretación, revisión) | 13 | 4 | 2 | 7 | 0 |
| 3 · Anki y retención | 21 | 6 | 4 | 11 | 0 |
| 4 · Fases, plan, recursos (First Aid, UWorld, NBME, Free 120) y casos Step 1 | 60 | 25 | 18 | 13 | 4 |
| 5 · Test day, tiempo y ansiedad | 6 | 3 | 0 | 3 | 0 |
| 6 · Mentalidad, aprendizaje y productividad | 25 | 16 | 1 | 4 | 4 |
| 7 · Contenido Step 2 CK / shelf (fuera de foco Step 1) | 10 | 8 | 0 | 0 | 2 |
| 8 · Método Step 2 CK / shelf / clerkships (fuera de foco) | 30 | 19 | 0 | 0 | 11 |
| 9 · Step 3 / COMLEX | 6 | 5 | 0 | 0 | 1 |
| 10 · Otros exámenes (ABIM, ABEM, CBSE, anestesia) | 12 | 2 | 2 | 0 | 8 |
| 11 · Carrera, residencia, match, admisiones | 26 | 5 | 0 | 0 | 21 |
| 12 · Vídeos no públicos (título «NA») | 4 | 0 | 0 | 0 | 4 |
| **TOTAL** | **235** | **93** | **30** | **57** | **55** |

### 1 · Contenido por sistema (High Yield / ecuaciones / imagen) (22)

| Vídeo (título actual en YouTube) | id | min | caps. | Lista del canal | A · Engine | B · Biblioteca II |
|---|---|---|---|---|---|---|
| Biostatistics SUMMARY STEP 1 + 2 - The Basics USMLE | [k_8lG8K65MM](https://www.youtube.com/watch?v=k_8lG8K65MM) | 144 | 14 | High Yield Lectures | ✅ | ✅ |
| High Yield Biochemistry for Shelf Exam & Step 1 + Step 2 CK | [FcXG3ux0a1I](https://www.youtube.com/watch?v=FcXG3ux0a1I) | 104 | 10 | High Yield Lectures | ✅ | ✅ |
| High Yield Cardiology for Shelf Exam & Step 1 + Step 2 CK | [hOGhcie47nM](https://www.youtube.com/watch?v=hOGhcie47nM) | 112 | 29 | High Yield Lectures | ✅ | ✅ |
| High Yield Cardiology Part 2  | [nFfdaHLtxag](https://www.youtube.com/watch?v=nFfdaHLtxag) | — | 0 | High Yield Lectures | ✅ (como «High Yield Cardiology Part 2 | Shelf Exam, Step 1 & Step 2 CK») | ✅ |
| High Yield Endocrinology for Shelf Exams & Step 1 + Step 2 CK | [oQ8PSvInTgM](https://www.youtube.com/watch?v=oQ8PSvInTgM) | 125 | 0 | High Yield Lectures | ✅ | ✅ |
| High Yield GI for Shelf Exam & Step 1 + Step 2 CK | [8gfhX1aR9-A](https://www.youtube.com/watch?v=8gfhX1aR9-A) | 165 | 8 | High Yield Lectures | ✅ | ✅ |
| High Yield GI for Shelf Exam & Step 1 + Step 2 CK (Part 2) | [E2sE4E6s9B8](https://www.youtube.com/watch?v=E2sE4E6s9B8) | 111 | 0 | High Yield Lectures | ✅ | ✅ |
| High Yield Hematology for Shelf Exams & Step 1 + Step 2 CK | [zFGfP4d_aOc](https://www.youtube.com/watch?v=zFGfP4d_aOc) | 40 | 6 | High Yield Lectures | ✅ | ✅ |
| High Yield Immunology for Shelf Exams & Step 1 + Step 2 CK | [Nfp3hs490wM](https://www.youtube.com/watch?v=Nfp3hs490wM) | 41 | 8 | High Yield Lectures | ✅ | ✅ |
| High Yield Neuro for Shelf Exams & Step 1 + Step 2 CK | [YIwfdc7E8TU](https://www.youtube.com/watch?v=YIwfdc7E8TU) | 74 | 18 | High Yield Lectures | ✅ | ✅ |
| High Yield Neuro Part 2 - Shelf Exams & Step 1 + Step 2 CK | [52xHDZJy2sw](https://www.youtube.com/watch?v=52xHDZJy2sw) | 100 | 0 | High Yield Lectures | ✅ | ✅ |
| High Yield Nuclear Medicine: PET, SPECT, VQ Scans | [M8z-AG9TN4I](https://www.youtube.com/watch?v=M8z-AG9TN4I) | 52 | 8 | High Yield Lectures | ✅ | ✅ |
| High Yield Pharmacology for Shelf Exams & Step 1 + Step 2 CK | [J2KWVQ67H2U](https://www.youtube.com/watch?v=J2KWVQ67H2U) | 71 | 0 | High Yield Lectures | ✅ | ✅ |
| High Yield Pharmacology Part 2: Shelf Exams & Step 1 + Step 2 CK | [PvKp25ku0po](https://www.youtube.com/watch?v=PvKp25ku0po) | 70 | 8 | High Yield Lectures | ✅ | ✅ |
| High Yield Renal for Shelf Exams & Step 1 + Step 2 CK | [zeM8dMiRsJQ](https://www.youtube.com/watch?v=zeM8dMiRsJQ) | 95 | 28 | High Yield Lectures | ✅ | ✅ |
| High Yield Renal for Shelf Exams & Step 1 + Step 2 CK (Part 2) | [CIIMMIvrRso](https://www.youtube.com/watch?v=CIIMMIvrRso) | 110 | 0 | High Yield Lectures | ✅ | ✅ |
| High Yield Respiratory for Shelf Exams & Step 1 + Step 2 CK | [HU3V0kftcqY](https://www.youtube.com/watch?v=HU3V0kftcqY) | 91 | 10 | High Yield Lectures | ✅ | ✅ |
| How 260+ Scorers Master Cardio on the USMLE | [TYe-wrDuFqg](https://www.youtube.com/watch?v=TYe-wrDuFqg) | 58 | 10 | High Yield Lectures | ✅ | ✅ |
| The #1 USMLE Cardiology Equation: Question of the Day | [-cYQuv5YsBg](https://www.youtube.com/watch?v=-cYQuv5YsBg) | 11 | 6 | — | — | ✅ |
| The Most Useful USMLE Equation EVER | [cwW3Qef7Pa0](https://www.youtube.com/watch?v=cwW3Qef7Pa0) | 9 | 7 | — | — | ✅ |
| USMLE Step 1 Pharmacology: The Ultimate Memory Hack | [BFeUPKQyjsM](https://www.youtube.com/watch?v=BFeUPKQyjsM) | 30 | 9 | USMLE Content | ✅ | ✅ |
| X-Rays + CTs Explained: The Beginner-Friendly Secret Most Radiologists Don't Know | [jXBqafalGRI](https://www.youtube.com/watch?v=jXBqafalGRI) | 11 | 7 | — | — | ✅ |

### 2 · Proceso de pregunta (interpretación, revisión) (13)

| Vídeo (título actual en YouTube) | id | min | caps. | Lista del canal | A · Engine | B · Biblioteca II |
|---|---|---|---|---|---|---|
| "Bad Test-Taker" Is a Lie You Tell Yourself | [JPAB81mEf-E](https://www.youtube.com/watch?v=JPAB81mEf-E) | 27 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Failed Step 1 to 73% NBME: Why Right Answers Feel Wrong | [4x3V98aZ3s0](https://www.youtube.com/watch?v=4x3V98aZ3s0) | 10 | 0 | USMLE Private Coaching Calls | — | ⚠ importación fallida (sin transcripción) |
| How I Went from "Bad Test Taker" to Top 0.1% at Stanford + Harvard | [7JllqJ1P4eM](https://www.youtube.com/watch?v=7JllqJ1P4eM) | 25 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| How to Make Hard USMLE Questions Easy (Without Knowing More) - USMLE Tutoring | [gPyvLclx6Mc](https://www.youtube.com/watch?v=gPyvLclx6Mc) | 9 | 0 | USMLE Private Coaching Calls | ✅ | ✅ |
| How to Review USMLE Questions for 20�30+ Points (NBME, UWorld, AMBOSS) | [faCaXnY1c9U](https://www.youtube.com/watch?v=faCaXnY1c9U) | 34 | 13 | USMLE Private Coaching Calls; USMLE Test-Taking Strategies & Study Techniques | ✅ (como «How to Review USMLE Questions for 20–30+ Points (NBME, UWorld, AMBOSS)») | ✅ |
| How to Solve ANY Hard USMLE Question for 260+ (USMLE Tutoring) | [PZh_5o-rRGI](https://www.youtube.com/watch?v=PZh_5o-rRGI) | 35 | 10 | USMLE Private Coaching Calls; USMLE Test-Taking Strategies & Study Techniques | — | ⚠ importación fallida (sin transcripción) |
| How USMLE Questions Are Written: Strategy to Boost Scores | [S_p4sFGHsUE](https://www.youtube.com/watch?v=S_p4sFGHsUE) | 9 | 9 | — | ✅ | ✅ |
| Stuck Between Two Answers? This Is How Top Scorers Choose | [5CT6bZIY7p4](https://www.youtube.com/watch?v=5CT6bZIY7p4) | 10 | 0 | USMLE Private Coaching Calls | ✅ (como «The One Clue Top Step 2 Scorers Never Miss (USMLE Tutoring)») | ✅ |
| The Test-Taking Strategy That Got Me Into Stanford Med | [UNErP004CJ0](https://www.youtube.com/watch?v=UNErP004CJ0) | 15 | — | Study Motivation & Productivity | ✅ | — |
| The USMLE Question Reading Habit Destroying Your Score (USMLE Tutoring) | [rANwpm6Jgh4](https://www.youtube.com/watch?v=rANwpm6Jgh4) | 12 | 6 | USMLE Private Coaching Calls | ✅ | ✅ |
| USMLE Test-Taking Tips: From �Stuck Between 2 Answers� to 260+ | [wISalwL5EgQ](https://www.youtube.com/watch?v=wISalwL5EgQ) | 13 | 5 | USMLE Test-Taking Strategies & Study Techniques | ✅ (como «USMLE Test-Taking Tips: From “Stuck Between 2 Answers” to 260+») | ✅ |
| Why "I'm a Bad Test Taker" Is Costing You 30+ USMLE Points (USMLE Tutoring) | [1fdx7tls6Hg](https://www.youtube.com/watch?v=1fdx7tls6Hg) | 15 | — | USMLE Private Coaching Calls | ✅ | — |
| Why You Know the Answer But Still Get It Wrong (USMLE) | [a_KTEnzgj2I](https://www.youtube.com/watch?v=a_KTEnzgj2I) | 18 | 6 | USMLE Test-Taking Strategies & Study Techniques | ✅ | ✅ |

### 3 · Anki y retención (21)

| Vídeo (título actual en YouTube) | id | min | caps. | Lista del canal | A · Engine | B · Biblioteca II |
|---|---|---|---|---|---|---|
| Anki for Medical School: How to Actually Use It | [yuVVU1dnUhI](https://www.youtube.com/watch?v=yuVVU1dnUhI) | 6 | 6 | — | ✅ | ✅ |
| Anki Medical School: Tricks and Settings | [puLNMfAhmxs](https://www.youtube.com/watch?v=puLNMfAhmxs) | 13 | 4 | — | — | ✅ |
| Anki Was Hurting This Med Student�s Score. Now She Uses It Right (USMLE Tutoring) | [kByOslqhEYI](https://www.youtube.com/watch?v=kByOslqhEYI) | 16 | — | USMLE Private Coaching Calls | ✅ (como «Anki Was Hurting This Med Student’s Score. Now She Uses It Right (USMLE Tutoring)») | — |
| ChatGPT Flashcards: Study More, Score Less | [zKnFMNjE4jw](https://www.youtube.com/watch?v=zKnFMNjE4jw) | 19 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Doing Anki, Still 57% on Step 1 NBMEs. What Gets Her a Pass? | [bPzECCzI42E](https://www.youtube.com/watch?v=bPzECCzI42E) | 12 | 7 | USMLE Private Coaching Calls | ✅ | ✅ |
| Give Me 30 Minutes and I'll 5X Your Anki Efficiency (FSRS, Settings, Strategy) | [Te5RnxeG_Gg](https://www.youtube.com/watch?v=Te5RnxeG_Gg) | 31 | 10 | USMLE Test-Taking Strategies & Study Techniques | ✅ | ✅ |
| How to Study Anki Efficiently for Steady Step 1 Gains (USMLE Tutoring) | [KLvyhGPQSrM](https://www.youtube.com/watch?v=KLvyhGPQSrM) | 11 | 8 | USMLE Test-Taking Strategies & Study Techniques | ✅ | ✅ |
| How to Use Anki for Beginners! | [XObh26rnMXM](https://www.youtube.com/watch?v=XObh26rnMXM) | 17 | 8 | Anki Strategy; USMLE Test-Taking Strategies & Study Techniques | ✅ | ✅ |
| How To Use Anki Like A Pro: Full Step-by-Step Walkthrough | [kg6iqqPPSG0](https://www.youtube.com/watch?v=kg6iqqPPSG0) | 33 | 7 | USMLE Test-Taking Strategies & Study Techniques | ✅ | ✅ |
| I Analyzed 28,655 Anki Cards. Only 2 Kinds Wasted My Time | [tHw1Ztv5lv8](https://www.youtube.com/watch?v=tHw1Ztv5lv8) | 19 | 8 | USMLE Test-Taking Strategies & Study Techniques | ✅ | ✅ |
| I Did 913,701 Anki Reviews. Here's What Actually Works. | [QFq_Pm8GB5s](https://www.youtube.com/watch?v=QFq_Pm8GB5s) | 20 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| I Reviewed 28,655 Flashcards Every Day for 17 Years. I Barely Had to Study. | [7WtznlsP6M8](https://www.youtube.com/watch?v=7WtznlsP6M8) | 23 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Overwhelmed with Anki? Watch This | [S8Vc5mIv5Gs](https://www.youtube.com/watch?v=S8Vc5mIv5Gs) | 15 | 8 | — | — | ✅ |
| Step 1 While Working: 40 Cards Took 2 Hours. What Changed? | [uky6aN_m8ys](https://www.youtube.com/watch?v=uky6aN_m8ys) | 11 | 0 | USMLE Private Coaching Calls | ✅ | ✅ |
| The 5 Anki Mistakes That Cost Me 6 Months | [obIvjAFdnsY](https://www.youtube.com/watch?v=obIvjAFdnsY) | 35 | 11 | — | — | ✅ |
| The Anki Mistake That Turns Daily Studying Into Cramming (USMLE Tutoring) | [yTsETx4D7nU](https://www.youtube.com/watch?v=yTsETx4D7nU) | 7 | — | USMLE Private Coaching Calls | ✅ | — |
| The Step 1 Anki Strategy Used by 260+ Scorers | [-PEw7x5LyXc](https://www.youtube.com/watch?v=-PEw7x5LyXc) | 19 | 10 | USMLE Private Coaching Calls | ✅ | ✅ |
| What 260+ scorers do with Anki that others don't | [RsqRa_SiQAI](https://www.youtube.com/watch?v=RsqRa_SiQAI) | 20 | 8 | — | — | ✅ |
| Why Anki and UWorld Aren�t Enough for Step 1 | [u5CidwHoVBg](https://www.youtube.com/watch?v=u5CidwHoVBg) | 44 | 10 | Podcasts | ✅ (como «Why Anki and UWorld Aren’t Enough for Step 1») | ✅ |
| Why Anki Gets Worse Before It Works | [XNW-NxBA2Fw](https://www.youtube.com/watch?v=XNW-NxBA2Fw) | 11 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ (como «I Haven't Had to Re-Learn Anything in 17 Years. Here's the System.») | ✅ |
| Why USMLE Scores Stay Stuck (Anki Strategy Fix) | [mwxEoGBmaRA](https://www.youtube.com/watch?v=mwxEoGBmaRA) | 12 | — | USMLE Private Coaching Calls | ✅ | — |

### 4 · Fases, plan, recursos (First Aid, UWorld, NBME, Free 120) y casos Step 1 (60)

| Vídeo (título actual en YouTube) | id | min | caps. | Lista del canal | A · Engine | B · Biblioteca II |
|---|---|---|---|---|---|---|
| 10 USMLE Study Strategies to Instantly Boost Your Score | [xSJBdojsqNk](https://www.youtube.com/watch?v=xSJBdojsqNk) | 19 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| 4 USMLE Fails. 3 Days. 1 Mental Switch. (USMLE Tutoring) | [MKj-9oDzL1c](https://www.youtube.com/watch?v=MKj-9oDzL1c) | 13 | — | USMLE Private Coaching Calls | ✅ | — |
| 48% NBME. Should She Move Her Step 1? (USMLE Tutoring) | [mK28jDhl3Mo](https://www.youtube.com/watch?v=mK28jDhl3Mo) | 12 | — | USMLE Private Coaching Calls | ✅ | — |
| 72% on the Free 120. Can He Pass His Step 1 Retake? | [5g5qt1Cs-o8](https://www.youtube.com/watch?v=5g5qt1Cs-o8) | 11 | 9 | USMLE Private Coaching Calls | — | ✅ |
| ChatGPT Test Prep: Top 10 Mistakes Killing Your Scores (2025 Guide) | [OzTBwpausmQ](https://www.youtube.com/watch?v=OzTBwpausmQ) | 12 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Fail Step 1? How to Score 90%+ (260+) on Next Attempt | [Wygl1znnuiY](https://www.youtube.com/watch?v=Wygl1znnuiY) | 12 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Failed Step 1  250. What's Between Her and 260? | [xsa06nssDbU](https://www.youtube.com/watch?v=xsa06nssDbU) | 11 | 11 | USMLE Private Coaching Calls | — | ✅ |
| First Aid for Step 1: Top Mistakes | [itJJpOWY9Aw](https://www.youtube.com/watch?v=itJJpOWY9Aw) | 6 | 4 | — | — | ✅ |
| First Aid Ultimate Guide: 5 Phases to USMLE Mastery | [fSAbdlygPNE](https://www.youtube.com/watch?v=fSAbdlygPNE) | 8 | 6 | UWorld & Step 1 vs Step 2 Preparation | ✅ | ✅ |
| From Failing Step 1 to 260s: UWorld Fix for Higher Scores | [Gm8ytdNPjzo](https://www.youtube.com/watch?v=Gm8ytdNPjzo) | 14 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| From Failure to 260+: Two USMLE Case Study Roadmaps | [WaQ4zMWTFk0](https://www.youtube.com/watch?v=WaQ4zMWTFk0) | 10 | 5 | — | — | ✅ |
| High NBMEs? Take This Official Practice Test Before Step 1 | [6Ueu95EfjKQ](https://www.youtube.com/watch?v=6Ueu95EfjKQ) | 18 | 8 | — | — | ✅ |
| Honor Shelfs AND Score 260+ on Step 2 (+ Pass Step 1) | [6hdySid4QEA](https://www.youtube.com/watch?v=6hdySid4QEA) | 19 | — | UWorld & Step 1 vs Step 2 Preparation; USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| How I Scored in the Top 1% on the "Hardest Exams in the World" | [Sw6WHD-3MHI](https://www.youtube.com/watch?v=Sw6WHD-3MHI) | 17 | — | Personal Journey & Success Lessons | — | — |
| How to (Virtually) Guarantee a Step 1 Pass (Step-by-Step Guide) | [ruFfBeg05ZM](https://www.youtube.com/watch?v=ruFfBeg05ZM) | 30 | 11 | UWorld & Step 1 vs Step 2 Preparation; USMLE Test-Taking Strategies & Study Techniques | ✅ (como «How to Guarantee a Step 1 Pass (Proven System)») | ✅ |
| How to Add 40% to Your Step 1 Score | [AFETMFxLCgo](https://www.youtube.com/watch?v=AFETMFxLCgo) | 31 | — | — | ✅ | — |
| How to Avoid the Biggest USMLE Mistake and Crush Step 1 | [a3iZ3lxHm08](https://www.youtube.com/watch?v=a3iZ3lxHm08) | 45 | 10 | Podcasts | — | ✅ |
| How to Beat Imposter Syndrome for Step 1 and Step 2 CK | [ggExBRIkt6Q](https://www.youtube.com/watch?v=ggExBRIkt6Q) | 44 | — | Podcasts | — | — |
| How to Boost USMLE Scores by 12 points in 1 Week (USMLE�Tutoring) | [Uvyy5fL0oMg](https://www.youtube.com/watch?v=Uvyy5fL0oMg) | 31 | 19 | USMLE Private Coaching Calls; USMLE Test-Taking Strategies & Study Techniques | — | ⚠ importación fallida (sin transcripción) |
| How to Boost Your USMLE Score Instantly (Step 1, 2 and 3) | [6Uzg0l7zCP0](https://www.youtube.com/watch?v=6Uzg0l7zCP0) | 23 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| How to Get More From Every Hour You Study (Step 1) - USMLE Tutoring | [hxWFqkn4wa0](https://www.youtube.com/watch?v=hxWFqkn4wa0) | 12 | 0 | USMLE Private Coaching Calls | ✅ | ✅ |
| How to Raise Your USMLE Score Without Studying More | [7kUnTlhXLHc](https://www.youtube.com/watch?v=7kUnTlhXLHc) | 33 | 12 | Podcasts | — | ✅ |
| How to Score 260+ on USMLE Step 1 & Step 2 in 2025 | [PGlLTDdX1ig](https://www.youtube.com/watch?v=PGlLTDdX1ig) | 13 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| How to Score 260+ on USMLEs in 2026 (Evidence-Based) | [7sS9ASCzPU8](https://www.youtube.com/watch?v=7sS9ASCzPU8) | 30 | 13 | USMLE Test-Taking Strategies & Study Techniques | ✅ | ✅ |
| How to Score USMLE 260+ (Even If You're Failing) | [buenR3-n2TQ](https://www.youtube.com/watch?v=buenR3-n2TQ) | 12 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| I Failed the SAT in 2002. I've Spent 24 Years Figuring Out Why | [FcbZ7R_gea0](https://www.youtube.com/watch?v=FcbZ7R_gea0) | 16 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| IMG Neurosurgeon Passed His NBMEs, Then Failed Step 1 (USMLE Tutoring) | [tUZPKvEJt8w](https://www.youtube.com/watch?v=tUZPKvEJt8w) | 11 | — | USMLE Private Coaching Calls | ✅ | — |
| Is UWorld Really Harder Than Step 1? A Deep Dive! | [iXp-clEPAYY](https://www.youtube.com/watch?v=iXp-clEPAYY) | 11 | 7 | UWorld & Step 1 vs Step 2 Preparation | ✅ | ✅ |
| Mastering the USMLE Free 120: Tips and Tricks for Success! | [plZcDDxGhjM](https://www.youtube.com/watch?v=plZcDDxGhjM) | 8 | 5 | USMLE Test-Taking Strategies & Study Techniques | ✅ | ✅ |
| NBME 230s to 256 by Filling Gaps. Is Every Miss Still a Gap? | [AFeCwtFg0tw](https://www.youtube.com/watch?v=AFeCwtFg0tw) | 12 | 0 | USMLE Private Coaching Calls | — | ✅ |
| Pass Any Board: How Top Students Remember Everything | [XLc8aE2C2Iw](https://www.youtube.com/watch?v=XLc8aE2C2Iw) | 41 | 7 | Podcasts; Podcasts | — | ✅ |
| Pass Step 1: The One Metric That Predicts USMLE Success | [96V7XnvzNpI](https://www.youtube.com/watch?v=96V7XnvzNpI) | 43 | 7 | Podcasts | — | ✅ |
| She Needs a 260 for Ophtho. She's Stuck at 236. (USMLE Tutoring) | [MNgHLbOeFDU](https://www.youtube.com/watch?v=MNgHLbOeFDU) | 13 | — | USMLE Private Coaching Calls | ✅ | — |
| Step 1 Study Plan: 5 Tips to Boost USMLE Scores Fast | [yr-mHwAjx30](https://www.youtube.com/watch?v=yr-mHwAjx30) | 18 | — | Study Motivation & Productivity; USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Step 1 vs Step 2: Study Strategy Differences for 270+ | [NaQ9dCh5FeY](https://www.youtube.com/watch?v=NaQ9dCh5FeY) | 15 | — | UWorld & Step 1 vs Step 2 Preparation | ✅ | — |
| Step 1 vs. Step 2 First: The Best Order in the Pass-Fail Era | [Ps67Xt5G5kI](https://www.youtube.com/watch?v=Ps67Xt5G5kI) | 14 | 5 | UWorld & Step 1 vs Step 2 Preparation | ✅ | ✅ |
| Step 1, Burnout, and Belonging: Dr. Lisa Medoff�s Guide to Med School | [s70BD2DauP4](https://www.youtube.com/watch?v=s70BD2DauP4) | 61 | — | Podcasts | — | — |
| STOP Doing This for 20+ Points on Step 1 + 2 | [-RSh9mTeAcg](https://www.youtube.com/watch?v=-RSh9mTeAcg) | 30 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Stop Studying for Step 1. Pass It Anyway. | [Wy4QN7Fnck8](https://www.youtube.com/watch?v=Wy4QN7Fnck8) | 11 | 0 | USMLE Private Coaching Calls | ✅ | ✅ |
| The #1 Reason Med Students Fail Step 1 After Pass/Fail | [8D8U7Tfija4](https://www.youtube.com/watch?v=8D8U7Tfija4) | 43 | 8 | Podcasts | — | ✅ |
| The 10 Behaviors that Guarantee a USMLE Fail | [Kj7tAyooE3o](https://www.youtube.com/watch?v=Kj7tAyooE3o) | 23 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| The Biggest Mistake Students Make Before Step 1 | [1TGfgL0qUh8](https://www.youtube.com/watch?v=1TGfgL0qUh8) | 47 | 11 | Podcasts; Podcasts | — | ✅ |
| The Common Trap Causing Step 1 Failures | [OqNmGO9_Rk4](https://www.youtube.com/watch?v=OqNmGO9_Rk4) | 42 | 10 | Podcasts | — | ✅ |
| The First Aid Mistakes That Cost You 30+ Points | [K6wlds9vz4I](https://www.youtube.com/watch?v=K6wlds9vz4I) | 6 | 4 | USMLE Test-Taking Strategies & Study Techniques | ✅ (como «First Aid for Step 1: The 5 Mistakes Costing 30+ Points») | ✅ |
| The ONLY Video You Need to Pass the USMLE Step 1 in 2026 | [BOtQJeFE_rc](https://www.youtube.com/watch?v=BOtQJeFE_rc) | 38 | 12 | USMLE Test-Taking Strategies & Study Techniques | ✅ | ✅ |
| The Pattern Keeping Your USMLE Score Frozen (USMLE Tutoring) | [hJWjlquzxQ8](https://www.youtube.com/watch?v=hJWjlquzxQ8) | 11 | — | USMLE Private Coaching Calls | ✅ | — |
| The Secrets to Excelling in USMLE Step 1: Expert Advice | [rm3vuN-oxJU](https://www.youtube.com/watch?v=rm3vuN-oxJU) | 8 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| The Tracking Method That Guarantees a Step 1/NBME Pass | [mEc5UsUCVY8](https://www.youtube.com/watch?v=mEc5UsUCVY8) | 56 | 7 | Podcasts; Podcasts | ✅ | ✅ |
| The USMLE Mindset That Guarantees a 260+ (USMLE Tutoring) | [7latZXXZtPI](https://www.youtube.com/watch?v=7latZXXZtPI) | 36 | — | USMLE Private Coaching Calls; USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| USMLE Step 1 Strategy: The Difference Between 230 and 260+ | [yvchLee9Ql0](https://www.youtube.com/watch?v=yvchLee9Ql0) | 50 | 0 | Podcasts | — | ✅ |
| USMLE Step 1 Study Plan From a Learning Scientist | [NkvG7EPXHIY](https://www.youtube.com/watch?v=NkvG7EPXHIY) | 49 | 0 | Podcasts | ✅ | ✅ |
| USMLE Step 1: Why Hard Work Isn�t Improving Your Scores | [0y4ehU84KAg](https://www.youtube.com/watch?v=0y4ehU84KAg) | 47 | 13 | Podcasts | — | ✅ |
| UWorld Complete Guide: The Five Levels of Mastery to 260+ | [FT_sjXwvncY](https://www.youtube.com/watch?v=FT_sjXwvncY) | 14 | 10 | UWorld & Step 1 vs Step 2 Preparation | ✅ | ✅ |
| What Med Students Get Wrong with Step 1 � Dr. Iliou Explains | [pupudbr-DnQ](https://www.youtube.com/watch?v=pupudbr-DnQ) | 58 | 14 | Podcasts | — | ✅ |
| Why "Just Passing" Backfires on Your USMLE Retake | [kl5hYmLvbrY](https://www.youtube.com/watch?v=kl5hYmLvbrY) | 16 | — | USMLE Private Coaching Calls | ✅ (como «"I Just Need to Pass" Fails USMLE Retakes (USMLE Tutoring)») | — |
| Why Good Students Fail (Dean's Warning) - Dr. Nadege Dady | [lEewIsisO0M](https://www.youtube.com/watch?v=lEewIsisO0M) | 65 | — | Podcasts; Podcasts | — | — |
| Why Hard Workers Score the Lowest | [TSZCSumhP3g](https://www.youtube.com/watch?v=TSZCSumhP3g) | 13 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ (como «Why Studying Harder Is Making Your Scores WORSE») | — |
| Why Studying Harder Won't Fix Your USMLE Score | [IhdtNYejkNY](https://www.youtube.com/watch?v=IhdtNYejkNY) | 14 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Why Tutoring Doesn't Move Your USMLE Score (And What Does) | [STW_BYwy9mw](https://www.youtube.com/watch?v=STW_BYwy9mw) | 17 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Why Your USMLE Score Isn�t Improving (And How to Fix It) | [bBLKienIobc](https://www.youtube.com/watch?v=bBLKienIobc) | 39 | 13 | Podcasts | — | ✅ |

### 5 · Test day, tiempo y ansiedad (6)

| Vídeo (título actual en YouTube) | id | min | caps. | Lista del canal | A · Engine | B · Biblioteca II |
|---|---|---|---|---|---|---|
| Before you take your USMLE, watch this (USMLE Tutoring) | [lrm99It6YtY](https://www.youtube.com/watch?v=lrm99It6YtY) | 17 | — | USMLE Private Coaching Calls; USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Final 1-2 Weeks Before USMLE: Top 8 Strategies to Improve Your Score! | [miEwPrf9Jd8](https://www.youtube.com/watch?v=miEwPrf9Jd8) | 13 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Fixing USMLE Test-Day Mistakes: The STRESS Strategy | [xCiUcrs8UgQ](https://www.youtube.com/watch?v=xCiUcrs8UgQ) | 43 | 0 | Podcasts | ✅ | ✅ |
| The 2-Minute Fix for USMLE Timing Anxiety | [QivwASIn_G4](https://www.youtube.com/watch?v=QivwASIn_G4) | 9 | 8 | USMLE Private Coaching Calls | ✅ | ✅ |
| USMLE Test Day Strategies: Step 1 + 2, Shelf | [198F40HYmE4](https://www.youtube.com/watch?v=198F40HYmE4) | 12 | 8 | USMLE Test-Taking Strategies & Study Techniques | ✅ | ✅ |
| Why USMLE Panic Is Worth 30+ Points (USMLE Tutoring) | [GQ4x3kKVHDE](https://www.youtube.com/watch?v=GQ4x3kKVHDE) | 15 | — | USMLE Private Coaching Calls | ✅ (como «The USMLE Panic Trap Costing You 30+ Points (USMLE Tutoring)») | — |

### 6 · Mentalidad, aprendizaje y productividad (25)

| Vídeo (título actual en YouTube) | id | min | caps. | Lista del canal | A · Engine | B · Biblioteca II |
|---|---|---|---|---|---|---|
| 3 Signs You�ll Be a Great Doctor (From a Vice Dean) | [jU7Zcdizo4U](https://www.youtube.com/watch?v=jU7Zcdizo4U) | 60 | — | Podcasts | — | — |
| 6 Signs of ADHD I Missed as a High Achiever | [uxRiIkbSQH0](https://www.youtube.com/watch?v=uxRiIkbSQH0) | 13 | — | Study Motivation & Productivity | ✅ | — |
| 8 Signs That You�re Studying Wrong for USMLE and Don�t Know It | [KsIWwvCzgso](https://www.youtube.com/watch?v=KsIWwvCzgso) | 43 | — | Clerkship & Shelf Exam Strategies; Study Motivation & Productivity; USMLE Test-Taking Strategies & Study Techniques | ✅ (como «8 Signs That You’re Studying Wrong for USMLE and Don’t Know It») | — |
| ADHD Superpowers: 5 Weaknesses That Drove My Success | [MMTZRgOvVF4](https://www.youtube.com/watch?v=MMTZRgOvVF4) | 12 | — | Personal Journey & Success Lessons; Study Motivation & Productivity | ✅ | — |
| He Sold Ortho Implants. Now He Needs a 265 for Ortho. (USMLE Tutoring) | [Oe-OrQfgMXE](https://www.youtube.com/watch?v=Oe-OrQfgMXE) | 13 | — | USMLE Private Coaching Calls | ✅ | — |
| How I Brainwashed Myself Into Scoring in the Top 0.1% at Stanford Med | [sLA0PDDZ4Yk](https://www.youtube.com/watch?v=sLA0PDDZ4Yk) | 19 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| How I Learned to Love and Enjoy Studying + Train at Stanford / Harvard | [Be41edrz7ns](https://www.youtube.com/watch?v=Be41edrz7ns) | 10 | — | Study Motivation & Productivity | ✅ | — |
| How I Took 0 Notes in Medical School | [2yYXseLwRlI](https://www.youtube.com/watch?v=2yYXseLwRlI) | 26 | 14 | Clerkship & Shelf Exam Strategies; USMLE Test-Taking Strategies & Study Techniques | ✅ (como «I Took 0 Notes in Med School. I Still Scored Top 0.1%.») | ✅ |
| How to Make the GREATEST Academic Comeback | [bbE174-SMyA](https://www.youtube.com/watch?v=bbE174-SMyA) | 32 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| How to Study So Fast for the USMLE It Feels Like Cheating | [OwsxvQPL8oc](https://www.youtube.com/watch?v=OwsxvQPL8oc) | 15 | 5 | USMLE Test-Taking Strategies & Study Techniques | ✅ | ✅ |
| How to Study When You're Too Busy to Study (It's Not Discipline) | [OHS35xSq-hQ](https://www.youtube.com/watch?v=OHS35xSq-hQ) | 20 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| I Looked Stupid for 16 Years (and Became Stanford's Top 0.1%) | [9JNjTVZ6NGs](https://www.youtube.com/watch?v=9JNjTVZ6NGs) | 20 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| I Studied 30,660 Hours of Medicine. I Only Needed 6,000. | [txFaCwqpuK0](https://www.youtube.com/watch?v=txFaCwqpuK0) | 18 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Mastering the Hardest Subjects in Med School with Dr. Jagadeesh | [skQYVxo4K24](https://www.youtube.com/watch?v=skQYVxo4K24) | 45 | 19 | Podcasts | — | ✅ |
| Procrastinate With Me: Stanford/Harvard MD Finally Responds to MEAN Comments | [-aiIyzIB-Aw](https://www.youtube.com/watch?v=-aiIyzIB-Aw) | 43 | — | — | — | — |
| She Went From Bottom 1% to Top 3% in 2 Months | [2q1roxhFqyM](https://www.youtube.com/watch?v=2q1roxhFqyM) | 12 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Struggling with Med School? Top USMLE Tutor Reveals All | [WPVqwKuyOfE](https://www.youtube.com/watch?v=WPVqwKuyOfE) | 66 | — | Study Motivation & Productivity | ✅ | — |
| The 6 Things Successful IMGs Do Differently on the USMLE | [lmDDHRtP9iU](https://www.youtube.com/watch?v=lmDDHRtP9iU) | 7 | — | — | ✅ | — |
| The 8 Most Important Study Techniques I Used in Medical School | [DGreFK183ow](https://www.youtube.com/watch?v=DGreFK183ow) | 32 | 11 | USMLE Test-Taking Strategies & Study Techniques | ✅ | ✅ |
| The Danger of Active Recall | [hK76nuhkKDI](https://www.youtube.com/watch?v=hK76nuhkKDI) | 24 | 8 | USMLE Test-Taking Strategies & Study Techniques | ✅ | ✅ |
| Top USMLE Mistakes to Avoid: Common Pitfalls and How to Overcome Them | [jG4nynUY0Lw](https://www.youtube.com/watch?v=jG4nynUY0Lw) | 8 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Unlocking Success: 9 Lessons from Average to Top 0.1% on the Hardest Exam in the World | [qMjwWkVQxC4](https://www.youtube.com/watch?v=qMjwWkVQxC4) | 19 | — | Personal Journey & Success Lessons | — | — |
| Why Bright Students Struggle: Insights from Dr. Praveen | [Kgo-ZPjKS3k](https://www.youtube.com/watch?v=Kgo-ZPjKS3k) | 62 | — | Podcasts | — | — |
| Why Successful People Struggle in Med School (and How to Fix It) | [37Ek8MwZl-U](https://www.youtube.com/watch?v=37Ek8MwZl-U) | 14 | — | Study Motivation & Productivity | ✅ | — |
| Your USMLE Blocks Just Doubled. Your Time Didn't. | [Tprphg5tB38](https://www.youtube.com/watch?v=Tprphg5tB38) | 9 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |

### 7 · Contenido Step 2 CK / shelf (fuera de foco Step 1) (10)

| Vídeo (título actual en YouTube) | id | min | caps. | Lista del canal | A · Engine | B · Biblioteca II |
|---|---|---|---|---|---|---|
| High Yield Family Medicine Review for Step 2 CK & Shelf Exam | [7_XnYOfrKzQ](https://www.youtube.com/watch?v=7_XnYOfrKzQ) | 219 | — | High Yield Lectures | ✅ | — |
| High Yield Family Medicine Review: Part 2 - Step 2 CK & Shelf Exam | [2SeEFy27iTI](https://www.youtube.com/watch?v=2SeEFy27iTI) | 167 | — | High Yield Lectures | ✅ | — |
| High Yield Internal Medicine Review  | [U336m3i7Qys](https://www.youtube.com/watch?v=U336m3i7Qys) | — | — | — | — | — |
| High Yield Internal Medicine Review for Step 2 CK & Shelf Exam (Part 2) | [MQ8DaEAUfpE](https://www.youtube.com/watch?v=MQ8DaEAUfpE) | 160 | — | — | — | — |
| High Yield OB/GYN Review for Step 2 CK & Shelf Exam | [4D7MO0TR2fY](https://www.youtube.com/watch?v=4D7MO0TR2fY) | 104 | — | High Yield Lectures | ✅ | — |
| High Yield OB/GYN Review for Step 2 CK & Shelf Exam (Part 2) | [nYtSNyXh_Ww](https://www.youtube.com/watch?v=nYtSNyXh_Ww) | 91 | — | High Yield Lectures | ✅ | — |
| High Yield Pediatrics Review for Step 2 CK & Shelf Exam - Part 2 | [wdT2E9Agcsc](https://www.youtube.com/watch?v=wdT2E9Agcsc) | 184 | — | High Yield Lectures | ✅ | — |
| High Yield Surgery for Shelf & Step 2 CK: LFTs & Renal | [qM37ivfjrGs](https://www.youtube.com/watch?v=qM37ivfjrGs) | 155 | — | High Yield Lectures | ✅ | — |
| High Yield Surgery Review for Step 2 CK & Shelf Exam | [XwvpxXyNZvs](https://www.youtube.com/watch?v=XwvpxXyNZvs) | 140 | — | High Yield Lectures | ✅ | — |
| Pediatrics Shelf Review: High Yield USMLE Step 2 CK | [h1gPmWX6-AY](https://www.youtube.com/watch?v=h1gPmWX6-AY) | 211 | — | High Yield Lectures | ✅ | — |

### 8 · Método Step 2 CK / shelf / clerkships (fuera de foco) (30)

| Vídeo (título actual en YouTube) | id | min | caps. | Lista del canal | A · Engine | B · Biblioteca II |
|---|---|---|---|---|---|---|
| 10 Step 2 Score Killers You�re Probably Overlooking | [miIvzNA6arE](https://www.youtube.com/watch?v=miIvzNA6arE) | 22 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ (como «10 Step 2 Score Killers You’re Probably Overlooking») | — |
| Answer ANY Step 2 Management Questions (Without Guessing) - USMLE Tutoring | [5HJKQGMzniI](https://www.youtube.com/watch?v=5HJKQGMzniI) | 8 | — | USMLE Private Coaching Calls | ✅ | — |
| Behind With 5 Weeks to Her IM Shelf. Go Deep or Cover It All? | [M1CDyh7_jjk](https://www.youtube.com/watch?v=M1CDyh7_jjk) | 12 | — | USMLE Private Coaching Calls | — | — |
| Failed Step 2 by 4 Points. Now 240s. What Gets Him to 260? | [b1k5MDMDl2o](https://www.youtube.com/watch?v=b1k5MDMDl2o) | 11 | — | — | — | — |
| How 230 Scorers Jump to 260+ on Step 2 by Fixing One Mindset | [8lEuqSDhVfc](https://www.youtube.com/watch?v=8lEuqSDhVfc) | 25 | — | USMLE Private Coaching Calls | ✅ (como «Why 230 Scorers Plateau on Step 2 (It's Not Studying)») | — |
| How 5 Students Scored 260+ on Step 2 Despite Being �Bad Test Takers� | [zDl969PdDdI](https://www.youtube.com/watch?v=zDl969PdDdI) | 13 | — | — | — | — |
| How a Caribbean IMG Gained 30 Points on USMLE Step 2 in 2 Weeks | [Rh_dpcZ5cxI](https://www.youtube.com/watch?v=Rh_dpcZ5cxI) | 20 | — | USMLE Private Coaching Calls; USMLE Test-Taking Strategies & Study Techniques | ✅ (como «How a Caribbean IMG Gained 30 Points on USMLE Step 2 WITHOUT Studying») | — |
| How Exam Anxiety Costs You 30+ Points on Step 2 (USMLE Tutoring) | [lbaUHaj_rMw](https://www.youtube.com/watch?v=lbaUHaj_rMw) | 11 | — | USMLE Private Coaching Calls | ✅ | — |
| How to (Virtually) Guarantee 260+ on Step 2 : Comprehensive Guide | [dp3r7XeZEs0](https://www.youtube.com/watch?v=dp3r7XeZEs0) | 23 | — | UWorld & Step 1 vs Step 2 Preparation; USMLE Test-Taking Strategies & Study Techniques | ✅ (como «Step 2 Study Plan: How to Guarantee 260+») | — |
| How to Honor Clerkships + Present Like a Harvard-MGH Grad | [A3cpkADKs6g](https://www.youtube.com/watch?v=A3cpkADKs6g) | 16 | — | Clerkship & Shelf Exam Strategies | ✅ | — |
| How to Honor Your Shelf Exams (+ Not Hate Your Life) | [2ZFV_xVJV5I](https://www.youtube.com/watch?v=2ZFV_xVJV5I) | 12 | — | Clerkship & Shelf Exam Strategies | ✅ | — |
| How to Present a Patient to Attendings (USMLE Tutoring) | [su6o6G6cVTg](https://www.youtube.com/watch?v=su6o6G6cVTg) | 23 | — | USMLE Private Coaching Calls; Clerkship & Shelf Exam Strategies | ✅ | — |
| How to Score 280+ on Step 2 | [5ib0tWtOMQg](https://www.youtube.com/watch?v=5ib0tWtOMQg) | 31 | — | — | — | — |
| Military Mom Needs a 260 on Step 2. More Cards Won't Help. (USMLE Tutoring) | [TdZBTsmyPK4](https://www.youtube.com/watch?v=TdZBTsmyPK4) | 11 | — | USMLE Private Coaching Calls | ✅ | — |
| NBME Down 19 Points in 4 Days. Step 2 CK Is in 3. | [k_IEoWQE8vE](https://www.youtube.com/watch?v=k_IEoWQE8vE) | 12 | — | USMLE Private Coaching Calls | — | — |
| NBME Up 5 in a Month. Is Her Step 2 Prep Working? | [cXIW6X4eKG0](https://www.youtube.com/watch?v=cXIW6X4eKG0) | 11 | — | USMLE Private Coaching Calls | — | — |
| Step 2 CK: Good on UWorld, Worse on the NBME. Why? | [EzzE4npsUTk](https://www.youtube.com/watch?v=EzzE4npsUTk) | 10 | — | USMLE Private Coaching Calls | — | — |
| Step 2 NBME 216 to 228 in 1 Week. Why the Last Blocks Slip | [3nxl76Rwazw](https://www.youtube.com/watch?v=3nxl76Rwazw) | 10 | — | USMLE Private Coaching Calls | — | — |
| Step 2 NBME 219 to 232. Is Anki Holding Him Back? | [AESTF4wajSc](https://www.youtube.com/watch?v=AESTF4wajSc) | 10 | — | USMLE Private Coaching Calls | — | — |
| Step 2 on Rotations at 3 Questions a Day. What Would a 245 Take? | [GxV7XnU7p2s](https://www.youtube.com/watch?v=GxV7XnU7p2s) | 12 | — | USMLE Private Coaching Calls | — | — |
| Step 2 to 260+ in WEEKS (Guess Her Initial Score) | [oM2dX7MaEZw](https://www.youtube.com/watch?v=oM2dX7MaEZw) | 18 | — | USMLE Private Coaching Calls; USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| Stuck Below 220 on Step 2: She Can't Stop Procrastinating (USMLE Tutoring) | [h81GVRl1MPQ](https://www.youtube.com/watch?v=h81GVRl1MPQ) | 12 | — | USMLE Private Coaching Calls | ✅ | — |
| The 5% Rule That Adds 10+ Points on Step 2 CK | [V-2bbMyuFyo](https://www.youtube.com/watch?v=V-2bbMyuFyo) | 12 | — | USMLE Private Coaching Calls | ✅ | — |
| The Step 2 Anki Strategy That Fixes Stuck Scores | [UI82JtpAcPI](https://www.youtube.com/watch?v=UI82JtpAcPI) | 13 | — | USMLE Private Coaching Calls | ✅ | — |
| The Step 2 Score Boost Without Studying More | [GHcMSVB-jAQ](https://www.youtube.com/watch?v=GHcMSVB-jAQ) | 12 | — | USMLE Private Coaching Calls | ✅ | — |
| The Step 2 Secret to a 260 Without Knowing Everything (USMLE Tutoring) | [_QdjuWaYL1I](https://www.youtube.com/watch?v=_QdjuWaYL1I) | 12 | — | USMLE Private Coaching Calls | ✅ | — |
| This Student Got 260s in Weeks (Step 2 Quick Jump) | [oXhh8TiBrD0](https://www.youtube.com/watch?v=oXhh8TiBrD0) | 34 | — | USMLE Private Coaching Calls; USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| USMLE Step 2 CK Going Pass/Fail? What You Need to Know! | [kG1REGSco00](https://www.youtube.com/watch?v=kG1REGSco00) | 11 | — | — | — | — |
| USMLE Step 2: How Two Students Gained 30+ Points in WEEKS (USMLE Tutoring) | [aje41DAOqB4](https://www.youtube.com/watch?v=aje41DAOqB4) | 12 | — | USMLE Private Coaching Calls; USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| USMLE Step 2: The 30+ Point Jump Without More Studying | [ke2xT07JF4I](https://www.youtube.com/watch?v=ke2xT07JF4I) | 33 | — | USMLE Private Coaching Calls; USMLE Test-Taking Strategies & Study Techniques | ✅ | — |

### 9 · Step 3 / COMLEX (6)

| Vídeo (título actual en YouTube) | id | min | caps. | Lista del canal | A · Engine | B · Biblioteca II |
|---|---|---|---|---|---|---|
| Step 3 Study Plan: How to Stop Scrolling and Start Studying | [v-PnBkBKPhQ](https://www.youtube.com/watch?v=v-PnBkBKPhQ) | 11 | — | USMLE Private Coaching Calls | — | — |
| The 5 Blockers Keeping You From a Step 3 Pass | [UQD8KHy6ILg](https://www.youtube.com/watch?v=UQD8KHy6ILg) | 31 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| The Daily Habit That Saves Her Fellowship (Step 3) - USMLE Tutoring | [IE_zuHYfU0I](https://www.youtube.com/watch?v=IE_zuHYfU0I) | 10 | — | USMLE Private Coaching Calls | ✅ | — |
| The Shohei Ohtani Study Method for COMLEX | [kVEpfywuNkA](https://www.youtube.com/watch?v=kVEpfywuNkA) | 10 | — | USMLE Private Coaching Calls | ✅ | — |
| USMLE Step 3 Fail: Save Your Career AND Match Fellowship (USMLE Tutoring) | [ZpdFf5yoXG0](https://www.youtube.com/watch?v=ZpdFf5yoXG0) | 15 | — | USMLE Private Coaching Calls | ✅ (como «The USMLE Plan to Pass a Retake and Match») | — |
| USMLE Step 3: How to Virtually Guarantee 250+ (Full Guide) | [bX3qEtyiNQQ](https://www.youtube.com/watch?v=bX3qEtyiNQQ) | 43 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |

### 10 · Otros exámenes (ABIM, ABEM, CBSE, anestesia) (12)

| Vídeo (título actual en YouTube) | id | min | caps. | Lista del canal | A · Engine | B · Biblioteca II |
|---|---|---|---|---|---|---|
| 2 Weeks to ABEM. Can He Pass Without Knowing It All? | [8xvooB4EUwM](https://www.youtube.com/watch?v=8xvooB4EUwM) | 12 | — | USMLE Private Coaching Calls | — | — |
| ABIM Boards: Why Smart Doctors Still Fail (And How to Fix It) | [XaDDA45peso](https://www.youtube.com/watch?v=XaDDA45peso) | 31 | — | ABIM Strategy | — | — |
| ABIM: The Way Attendings Prep Is Why They Fail | [YHRZ5wRTkxc](https://www.youtube.com/watch?v=YHRZ5wRTkxc) | 16 | — | ABIM Strategy; USMLE Test-Taking Strategies & Study Techniques | — | — |
| How a Busy Dentist Makes Time to Study for the USMLE | [kf11sden7IM](https://www.youtube.com/watch?v=kf11sden7IM) | 11 | — | USMLE Private Coaching Calls | ✅ | — |
| How Dentists Go From the 40s to the 80s on the CBSE | [OBTn1UguzmI](https://www.youtube.com/watch?v=OBTn1UguzmI) | 28 | — | USMLE Test-Taking Strategies & Study Techniques | — | — |
| How to Catch Up 2,000 Anki Cards in 3 Days (ABIM/USMLE Tutoring) | [KfYZZrTyDfk](https://www.youtube.com/watch?v=KfYZZrTyDfk) | 15 | — | USMLE Private Coaching Calls | ✅ | — |
| How to Pass the ABIM Working Full-Time (30 Minutes a Day) | [LaCClfUhdBY](https://www.youtube.com/watch?v=LaCClfUhdBY) | 15 | — | — | — | — |
| I Scored Top 10% on Anesthesia Boards Without Studying | [Tyvf5AlSsJs](https://www.youtube.com/watch?v=Tyvf5AlSsJs) | 16 | — | ABIM Strategy; USMLE Test-Taking Strategies & Study Techniques | — | — |
| The ABIM Mistake That Makes Everything You Read Disappear | [UQNy_mWG-r4](https://www.youtube.com/watch?v=UQNy_mWG-r4) | 15 | 5 | ABIM Strategy | — | ✅ |
| The MKSAP Reading Trap (Why Studying More Is Making You Worse) | [z3A5z5sgqao](https://www.youtube.com/watch?v=z3A5z5sgqao) | 13 | 5 | ABIM Strategy | — | ✅ |
| Why ABIM Pass Rates Are Crashing (It's Not the Exam) | [lEKLATbnzCU](https://www.youtube.com/watch?v=lEKLATbnzCU) | 14 | — | ABIM Strategy | — | — |
| Why Smart OMFS Applicants Fail the CBSE (and What to Do) | [Z-VVBtrducU](https://www.youtube.com/watch?v=Z-VVBtrducU) | 20 | — | USMLE Test-Taking Strategies & Study Techniques | — | — |

### 11 · Carrera, residencia, match, admisiones (26)

| Vídeo (título actual en YouTube) | id | min | caps. | Lista del canal | A · Engine | B · Biblioteca II |
|---|---|---|---|---|---|---|
| 5 Secrets That Helped Me Match at Harvard | [MoV3Nf_ciy8](https://www.youtube.com/watch?v=MoV3Nf_ciy8) | 14 | — | Personal Journey & Success Lessons | — | — |
| 9 Habits to Quit for USMLE 260+ (2025 Edition) | [SfVMYZXXSaA](https://www.youtube.com/watch?v=SfVMYZXXSaA) | 13 | — | USMLE Test-Taking Strategies & Study Techniques | ✅ | — |
| DO Match: How to (Virtually) Guarantee Matching in Any Specialty | [tySRnrcuAns](https://www.youtube.com/watch?v=tySRnrcuAns) | 32 | — | Residency Applications & Specialty Selection | — | — |
| DO vs MD: What DO Students Learn That MDs Don�t | [esOx6ws1tTA](https://www.youtube.com/watch?v=esOx6ws1tTA) | 49 | — | Podcasts; Podcasts | — | — |
| Give Me 40 Minutes and I�ll Help You Treat Addiction | [BPIz53XVas0](https://www.youtube.com/watch?v=BPIz53XVas0) | 45 | — | Podcasts | — | — |
| Harvard-Trained Radiologist Dishes on AI, Salary, and Career-Killing Mistakes | [zLOXyZ7ruAw](https://www.youtube.com/watch?v=zLOXyZ7ruAw) | 36 | — | — | — | — |
| How a Billionaire Helped Me Become a Stanford-/Harvard-Trained MD | [XCLORvyjiVs](https://www.youtube.com/watch?v=XCLORvyjiVs) | 13 | — | Personal Journey & Success Lessons | — | — |
| How ERAS Signals Change Match Outcomes (Harvard PD Explains) | [bIL4fZjpG-w](https://www.youtube.com/watch?v=bIL4fZjpG-w) | 25 | — | Residency Applications & Specialty Selection | — | — |
| How Many Publications Are Needed for Residency in 2025? (Impact of Step 1 Pass/Fail) | [vH1tQpnD2SY](https://www.youtube.com/watch?v=vH1tQpnD2SY) | 12 | — | Residency Applications & Specialty Selection | — | — |
| How Residency Signals Work, Explained by a Harvard PD | [LpRuQ0l7DsM](https://www.youtube.com/watch?v=LpRuQ0l7DsM) | 50 | — | Residency Applications & Specialty Selection | — | — |
| How to Honor Clerkships and Match Your Dream Residency | [tgXLyJJWGO8](https://www.youtube.com/watch?v=tgXLyJJWGO8) | 30 | — | USMLE Private Coaching Calls; Clerkship & Shelf Exam Strategies | ✅ | — |
| How to Practice Medicine in the US WITHOUT Residency (IMG Guide 2025) | [jtnn3bf0hds](https://www.youtube.com/watch?v=jtnn3bf0hds) | 31 | — | Residency Applications & Specialty Selection | — | — |
| How to Retain What You Study, From USMLE to Residency (USMLE Tutoring) | [eUYs00Im8ug](https://www.youtube.com/watch?v=eUYs00Im8ug) | 11 | — | USMLE Private Coaching Calls | ✅ | — |
| How to Rock Your Medical Residency Interview | [a7yhLL6X_Z0](https://www.youtube.com/watch?v=a7yhLL6X_Z0) | 29 | — | Residency Applications & Specialty Selection | — | — |
| I Was a Stanford and Harvard Trained Anesthesiologist. This Is Why I Quit | [VirRpeyjTfg](https://www.youtube.com/watch?v=VirRpeyjTfg) | 13 | — | Personal Journey & Success Lessons | — | — |
| Inside Med School Admissions with Marsha Williams, Admissions Executive | [HSP45CjUJIk](https://www.youtube.com/watch?v=HSP45CjUJIk) | 61 | — | Podcasts | — | — |
| Med School + Residency Interview Advice You Need to Hear | [N2xSU4t9X5Q](https://www.youtube.com/watch?v=N2xSU4t9X5Q) | 16 | — | — | — | — |
| Plastic Surgery Residency: How to Match (Harvard PD) | [wCadIQX2wqg](https://www.youtube.com/watch?v=wCadIQX2wqg) | 41 | — | Residency Applications & Specialty Selection | — | — |
| Resident Unionization: How $100K Is Reshaping Training | [46qH-zwNcrs](https://www.youtube.com/watch?v=46qH-zwNcrs) | 14 | — | Residency Applications & Specialty Selection | — | — |
| Resilience, Study Strategy, and Residency Advice from Dr. Sateesh Arja | [j95l85qASmk](https://www.youtube.com/watch?v=j95l85qASmk) | 74 | — | Podcasts | — | — |
| The $100,000 Resident: Hidden Money Secrets Elite Programs Don't Share | [csbGeXws2Ro](https://www.youtube.com/watch?v=csbGeXws2Ro) | 19 | — | Residency Applications & Specialty Selection | — | — |
| The 2 Things That Decide Your Residency Match (It�s Not Step 2) | [NiZNsX4O8Ck](https://www.youtube.com/watch?v=NiZNsX4O8Ck) | 45 | — | Podcasts | — | — |
| The Step 2 Trap Between Him and an Ophtho Match | [AAwUvjxbdJo](https://www.youtube.com/watch?v=AAwUvjxbdJo) | 14 | — | USMLE Private Coaching Calls | ✅ | — |
| Top 10 Paying Medical Specialties PER HOUR | [5VQ4EmPtfIs](https://www.youtube.com/watch?v=5VQ4EmPtfIs) | 15 | — | — | — | — |
| USMLE Step 1 and Specialty Demand from a Med School Dean | [Fu_-i51mCnY](https://www.youtube.com/watch?v=Fu_-i51mCnY) | 51 | — | Podcasts | — | — |
| Why This Top 1% Premed Was Rejected by 14 Med Schools | [n05KtYw1xW8](https://www.youtube.com/watch?v=n05KtYw1xW8) | 27 | — | Study Motivation & Productivity; Residency Applications & Specialty Selection | ✅ | — |

### 12 · Vídeos no públicos (título «NA») (4)

| Vídeo (título actual en YouTube) | id | min | caps. | Lista del canal | A · Engine | B · Biblioteca II |
|---|---|---|---|---|---|---|
| NA | [T_yuJufCTmU](https://www.youtube.com/watch?v=T_yuJufCTmU) | — | — | USMLE Private Coaching Calls | — | — |
| NA | [NuAdS--SHXI](https://www.youtube.com/watch?v=NuAdS--SHXI) | — | — | USMLE Private Coaching Calls; USMLE Test-Taking Strategies & Study Techniques | — | — |
| NA | [21P5vEcz5kA](https://www.youtube.com/watch?v=21P5vEcz5kA) | — | — | USMLE Private Coaching Calls | — | — |
| NA | [XyKSXjil4j0](https://www.youtube.com/watch?v=XyKSXjil4j0) | — | — | USMLE Test-Taking Strategies & Study Techniques | — | — |


---

Fuente de este índice: canal `@alec.palmerton_md` (pestaña Vídeos + 12 listas, leídos con yt-dlp el 18-nov-2026), página del cuaderno A (títulos de sus 299 fuentes, 18-nov), cuaderno B (creado el 18-nov). Cifras de esta tabla generadas, no a mano.

## Resumen de los 27 vídeos nuevos (solo en el cuaderno B, con transcripción)

Consulta NLM-B del 18-nov restringida a estas 27 fuentes: «2 ideas accionables por vídeo para quien prepara el Step 1 desde cero». Síntesis propia, una línea por vídeo. ⚑ = idea de un **invitado** que choca con el método propio de Palmerton (prevalece `PROCESO_PREGUNTA.md` / `FASES.md`).

| Vídeo | id | 2 ideas (síntesis) |
|---|---|---|
| Overwhelmed with Anki? Watch This | `S8Vc5mIv5Gs` | Máximo 50 nuevas al día. Suspender de entrada los mazos hechos y desbloquear solo lo que ataca tus lagunas. |
| What 260+ scorers do with Anki that others don't | `RsqRa_SiQAI` | Entrenar cada día el descarte a favor y en contra para elegir la opción más probable, no la perfecta. No abandonar las tarjetas ni el plan por la ansiedad. |
| The MKSAP Reading Trap | `z3A5z5sgqao` | Un subtema pequeño (coronaria) → tarjetas → validar el mismo día con un 80 % en 10. Clasificar cada fallo: laguna de contenido o sesgo (anclaje). |
| 72% on the Free 120. Can He Pass His Step 1 Retake? | `5g5qt1Cs-o8` | Ensayar antes la logística del examen (bloques, pausas, comida). El real se sentirá más difícil: no cambiar la técnica de lectura a última hora. |
| USMLE Step 1 Strategy: The Difference Between 230 and 260+ (pódcast) | `yvchLee9Ql0` | Pasar de «completar material» a «producir impacto». Misma rutina de lectura de la primera a la última pregunta. ⚑ El invitado desaconseja el modo tutor; en Palmerton, el tutor es el nivel 1 desde cero (`FASES.md`). |
| Failed Step 1 → 250. What's Between Her and 260? | `xsa06nssDbU` | Parar tras cada frase y preguntarse qué significa en el contexto. Instalar el hábito en bloques cortos sin reloj y pasar pronto al modo con tiempo. |
| X-Rays + CTs Explained | `jXBqafalGRI` | Brillo = densidad nuclear (tabla periódica). No dar contraste si lo buscado ya es denso (sangre fresca, litiasis). |
| High NBMEs? Take This Official Practice Test Before Step 1 | `6Ueu95EfjKQ` | Una prueba oficial en el mismo centro Prometric quita la ansiedad del entorno. Ante el agotamiento: menos estudio pasivo y actividades «de flujo». |
| The #1 Reason Med Students Fail Step 1 After Pass/Fail (pódcast) | `8D8U7Tfija4` | No subestimar el aprobado ni desviar el tiempo a investigación. Comprobar la comprensión explicándose en voz alta (grabándose). |
| What Med Students Get Wrong with Step 1 – Dr. Iliou (pódcast) | `pupudbr-DnQ` | Prelectura antes de cada clase o tema. Distinguir las materias de concepto (se deducen) de las de detalle puro (se repasan con tablas). |
| NBME 230s to 256 by Filling Gaps | `AFeCwtFg0tw` | Quitar el ruido y reformular como pregunta independiente simple. No tratar cada fallo como falta de memoria: diagnosticar el error de contexto o de gravedad. |
| Mastering the Hardest Subjects with Dr. Jagadeesh (pódcast) | `skQYVxo4K24` | Conceptos troncales (ciclo cardiaco, serologías) antes del volumen de preguntas. Atacar primero lo que más incomoda (bioestadística, gráficos). |
| Why Your USMLE Score Isn't Improving (pódcast) | `bBLKienIobc` | Metas semanales con plazo para la primera pasada y días enteros de aplicación. Método acumulativo: cada semana, preguntas de semanas anteriores. |
| How to Avoid the Biggest USMLE Mistake (pódcast) | `a3iZ3lxHm08` | No arreglarlo con más horas de un método que no funciona: auditarlo. Jornada fija, como un trabajo, con ejercicio y descanso. |
| The 5 Anki Mistakes That Cost Me 6 Months | `obIvjAFdnsY` | Nada de cloze (memoriza la posición, no la medicina). Tarjetas de concepto que obliguen a explicar con el principio (isquemia de demanda → troponina normal). |
| The Common Trap Causing Step 1 Failures (pódcast) | `OqNmGO9_Rk4` | Cuatro pilares innegociables: sueño, comida, ejercicio y vida social. Ocuparse solo de lo controlable (horario, actitud, constancia). |
| How to Raise Your USMLE Score Without Studying More (pódcast) | `7kUnTlhXLHc` | Aceptar porcentajes bajos en los primeros bloques como diagnóstico. ⚑ El invitado lee primero la última línea; el método propio de Palmerton es leer una vez de arriba abajo (`PROCESO_PREGUNTA.md` paso 1). |
| Pass Step 1: The One Metric That Predicts USMLE Success (pódcast) | `96V7XnvzNpI` | Hacer 800-1000 preguntas tipo NBME antes del periodo dedicado. Bloques de tiempo rígidos por sesión para no procrastinar la práctica. |
| The Biggest Mistake Students Make Before Step 1 (pódcast) | `1TGfgL0qUh8` | Conservar aficiones e identidad fuera de la medicina. Honestidad para ver cuándo el método dejó de servir y apoyarse en mentores. |
| Anki Medical School: Tricks and Settings | `puLNMfAhmxs` | Una tarjeta que une varios hechos por un principio (epidural arterial y rápido frente a subdural venoso). Repasar todos los días sin excepción. |
| From Failure to 260+: Two USMLE Case Study Roadmaps | `WaQ4zMWTFk0` | Bajar el ritmo y desmontar cada pregunta fallada hasta entender cada hallazgo. Mentalidad de «ningún día en cero». |
| USMLE Step 1: Why Hard Work Isn't Improving Your Scores (pódcast) | `0y4ehU84KAg` | Bloques en condiciones reales (con reloj), no solo lectura pasiva. Revisión metacognitiva estructurada tras cada examen («exam wrapper»). |
| The Most Useful USMLE Equation EVER | `cwW3Qef7Pa0` | ΔP = Q × R para deducir cualquier proceso (ERGE, estenosis). El mismo principio explica la úlcera por presión, la estenosis traqueal y el síndrome compartimental. |
| The #1 USMLE Cardiology Equation | `-cYQuv5YsBg` | MAP = CO × TPR con precarga, poscarga y contractilidad para cualquier pregunta de flechas o constantes. Síncope = hipotensión → ↓PPC. |
| The ABIM Mistake That Makes Everything You Read Disappear | `UQNy_mWG-r4` | Cambiar la lectura pasiva por la «lista de la compra» de lo que faltó en cada pregunta. Decir las respuestas en voz alta para comprobar que se recuperan. |
| First Aid for Step 1: Top Mistakes | `itJJpOWY9Aw` | First Aid como guía de objetivos, no como libro para memorizar. Un NBME oficial desde el principio como línea base. |
| Pass Any Board: How Top Students Remember Everything (pódcast) | `XLc8aE2C2Iw` | Trocear el temario; estudiar en grupo enseñando un tema difícil en la pizarra. ⚑ El invitado propone redactar preguntas propias para autoevaluarse: en este plan **no** sustituyen a las preguntas reales de evaluación (UWorld, NBME); como mucho son recuerdo activo. |

Sin transcripción en NotebookLM (solo hay capítulos): `PZh_5o-rRGI`, `Uvyy5fL0oMg`, `4x3V98aZ3s0`. Sus capítulos (minuto y título) se usan como índice en `PROCESO_PREGUNTA.md`.
