I have enough verified material to build the dossier with accurate, real resources and honest gating caveats. I'll now write the structured markdown dossier directly as my response, mirroring the app's exact priority/interval model.

---

# DOSSIER: Currículo de Dermatología Clínica de Élite — Dr. Joseph Soto Tocas

**Objetivo doble:** (1) dermatólogo de élite con ROI clínico máximo; (2) track de research nivel Mayo Clinic. **Cadencia:** ~1 h/día, días alternos con Research (L-X-V Derma / M-J Research, o el patrón que prefieras). **Modelo de repaso:** idéntico a tu motor ENCAPS — `CRÍTICA=6 vueltas`, `ALTA=5`, `MEDIA=4`, `BAJA=3`, intervalos en días desde la 1ª exposición.

> **Cómo leer esto:** está ordenado por ROI ("lo más rentable primero"). Cada bloque trae sub-temas con prioridad lista para volcar a `dermaData.ts` (mismo esquema `code / subtema / prioridad / url` que `encapsPlan.ts`). Donde un recurso es de pago o login-only, lo digo explícito (marca 🔒).

---

## 0. Modelo de datos (espejo de tu motor ENCAPS)

Tu `encapsPlan.ts` ya define `REPASO_POR_PRIORIDAD`. Reúsalo tal cual para Derma. Recomiendo este perfil de intervalos (ligeramente más largo que ENCAPS porque Derma es maratón, no examen con fecha):

```ts
// dermaData.ts — espejo de REPASO_POR_PRIORIDAD
export const DERMA_REPASO: Record<string, number[]> = {
  CRITICA: [1, 3, 7, 21, 60],   // 5 repasos → 6 vueltas
  ALTA:    [2, 10, 30, 75],     //            5 vueltas
  MEDIA:   [4, 25, 70],         //            4 vueltas
  BAJA:    [10, 70],            //            3 vueltas
};
// totalVueltas = intervalos.length + 1 (igual que tu helper)
```

**Regla de oro de ROI:** lo CRÍTICO es lo que (a) ves a diario en clínica peruana, (b) cae en MIR/USMLE/ENCAPS, y (c) "no puedes errar" (melanoma, anafilaxia por fármaco, SJS/TEN). Lo cosmético/Mohs avanzado es ALTA→MEDIA al inicio: alto valor económico futuro, pero ROI bajo *hoy* porque aún no operas.

---

## 1. MAPA DE CONOCIMIENTO POR DOMINIO (orden high-yield global)

Aprende en este orden. Cada dominio compone sobre el anterior.

| # | Dominio | Por qué este orden (ROI) | Peso inicial |
|---|---|---|---|
| **A** | **Fundamentos: lesiones elementales + morfología + estructura/función de la piel** | Es el "alfabeto". Sin describir una lesión no puedes diagnosticar nada ni leer un paper. Máximo ROI: desbloquea todo lo demás. | 🔴 CRÍTICA |
| **B** | **Dermatología médica general (las 80/20)** | Acné, eczemas, psoriasis, infecciones, urticaria, reacciones a fármacos, ITS. Es el 80% de tu consulta y de las preguntas de examen. | 🔴 CRÍTICA |
| **C** | **Oncología cutánea + dermatoscopia** | Melanoma/CBC/CEC: lo que "no puedes errar"; la dermatoscopia es la habilidad de mayor ROI diagnóstico de la última década. | 🔴 CRÍTICA |
| **D** | **Dermatopatología (correlación clínico-patológica)** | Te separa del médico general. Pilar del CORE exam y de un perfil Mayo. Empieza pronto pero en dosis pequeñas y sostenidas. | 🟠 ALTA |
| **E** | **Cirugía dermatológica básica + Mohs (anatomía, excisiones, sutura, instrumentos/"pinzas", colgajos/injertos)** | Habilidad manual = ingresos y prestigio. Empieza por teoría (anatomía de zonas de seguridad, instrumental, suturas) ya; la práctica llega con residencia. | 🟠 ALTA |
| **F** | **Estética/cosmética (toxina botulínica, rellenos, láseres, peelings)** | El mayor ROI *económico* a largo plazo, pero requiere base anatómica de D/E primero para ser seguro. Hoy: teoría + anatomía facial. | 🟡 MEDIA |
| **G** | **Tricología, ungueal, mucosas, pediátrica, dermatología de piel de color** | Sub-especialidades de alto valor diferencial (piel de color es vital en Perú). | 🟡 MEDIA |

---

## 2. BLOQUES, SUB-TEMAS Y PRIORIDADES (para `dermaData.ts`)

### BLOQUE A — Fundamentos / Lenguaje dermatológico 🔴
*Primeras 2 semanas. Sin esto nada compone.*

| code | Sub-tema | Prioridad |
|---|---|---|
| A-1 | Lesiones elementales primarias (mácula, pápula, placa, nódulo, vesícula, pústula, ampolla, roncha, tumor) | CRÍTICA |
| A-2 | Lesiones secundarias (escama, costra, erosión, úlcera, fisura, liquenificación, atrofia, cicatriz) | CRÍTICA |
| A-3 | Descripción semiológica: configuración, distribución, color, palpación (cómo dictar una lesión) | CRÍTICA |
| A-4 | Estructura y función de la piel (epidermis, dermis, anexos, barrera, melanocitos) | ALTA |
| A-5 | Inmunología cutánea básica + tipos de hipersensibilidad | ALTA |
| A-6 | Fototipos de Fitzpatrick + dermatología en piel de color (cómo cambia la morfología) | CRÍTICA |
| A-7 | Vehículos y principios de terapéutica tópica (corticoides por potencia, "FTU/regla del dedo") | ALTA |

### BLOQUE B — Dermatología médica general 🔴
*El 80% de tu consulta. Núcleo del cronograma.*

| code | Sub-tema | Prioridad |
|---|---|---|
| B-1 | Acné y rosácea (patogenia, gradación, isotretinoína) | CRÍTICA |
| B-2 | Dermatitis atópica / eczemas (contacto, dishidrótico, numular, seborreico) | CRÍTICA |
| B-3 | Psoriasis (placas, formas, artropatía, biológicos — visión general) | CRÍTICA |
| B-4 | Urticaria y angioedema (agudo/crónico, manejo) | CRÍTICA |
| B-5 | Reacciones cutáneas a fármacos + emergencias: SJS/TEN, DRESS, AGEP | CRÍTICA |
| B-6 | Infecciones bacterianas (impétigo, celulitis, erisipela, foliculitis, abscesos) | CRÍTICA |
| B-7 | Micosis superficiales (dermatofitos, candidiasis, pitiriasis versicolor) — KOH | CRÍTICA |
| B-8 | Virales (HSV, VZV/herpes zóster, verrugas/VPH, molusco) | ALTA |
| B-9 | Infestaciones (escabiosis, pediculosis) — alta prevalencia Perú | CRÍTICA |
| B-10 | ITS con manifestación cutánea (sífilis, gonorrea, VPH genital) | ALTA |
| B-11 | Enfermedades ampollares autoinmunes (pénfigo, penfigoide, DH) | ALTA |
| B-12 | Trastornos de pigmentación (vitíligo, melasma, hiper/hipopigmentación) | ALTA |
| B-13 | Manifestaciones cutáneas de enfermedad sistémica (LES, dermatomiositis, sarcoidosis, diabetes) | ALTA |
| B-14 | Dermatosis por fotosensibilidad + fotoprotección | MEDIA |
| B-15 | Prurito y eczema craquelé del anciano; dermatosis del embarazo | MEDIA |
| B-16 | Granulomatosas e inflamatorias (liquen plano, granuloma anular, pitiriasis rosada) | MEDIA |
| B-17 | Dermatología tropical/regional (leishmaniasis, lepra, larva migrans) — **clave Perú** | ALTA |

### BLOQUE C — Oncología cutánea + Dermatoscopia 🔴
*"Lo que no puedes errar." Dermatoscopia = mayor ROI de skill diagnóstica.*

| code | Sub-tema | Prioridad |
|---|---|---|
| C-1 | Queratosis actínica + campo de cancerización | CRÍTICA |
| C-2 | Carcinoma basocelular (subtipos, manejo) | CRÍTICA |
| C-3 | Carcinoma espinocelular + Bowen | CRÍTICA |
| C-4 | Melanoma: ABCDE, subtipos, estadiaje, Breslow, ganglio centinela | CRÍTICA |
| C-5 | Nevus melanocíticos: benignos vs displásicos vs señales de alarma | CRÍTICA |
| C-6 | Dermatoscopia I: patrones de lesiones melanocíticas (red pigmentada, glóbulos, estrías) | CRÍTICA |
| C-7 | Dermatoscopia II: lesiones no melanocíticas (CBC, queratosis seborreica, vascular) | ALTA |
| C-8 | Dermatoscopia III: 2-step algorithm, "chaos & clues", piel de color/acral | ALTA |
| C-9 | Linfomas cutáneos (micosis fungoide) — reconocer y derivar | MEDIA |
| C-10 | Tumores anexiales y benignos frecuentes (dermatofibroma, QS, angioma) | MEDIA |

### BLOQUE D — Dermatopatología 🟠
*Empieza pronto, dosis pequeñas sostenidas. Diferenciador Mayo.*

| code | Sub-tema | Prioridad |
|---|---|---|
| D-1 | Cómo se lee una biopsia: planos, tinciones (H&E, PAS, IHQ básicas), términos descriptivos | ALTA |
| D-2 | Patrones de reacción inflamatoria (perivascular, liquenoide, espongiótico, psoriasiforme, vesiculobuloso, granulomatoso) | ALTA |
| D-3 | Correlación clínico-patológica de las dermatosis del Bloque B | ALTA |
| D-4 | Histología de tumores melanocíticos (nevus vs melanoma) | ALTA |
| D-5 | Histología de tumores epiteliales (CBC, CEC, QA) + márgenes | ALTA |
| D-6 | Tumores anexiales y de tejidos blandos básicos | MEDIA |
| D-7 | Depósitos, infecciones en histología, panniculitis | BAJA |
| D-8 | "Pearls" para el CORE exam / patrones de alto rendimiento | MEDIA |

### BLOQUE E — Cirugía dermatológica y Mohs 🟠
*Teoría ya; práctica con residencia. Incluye instrumental ("pinzas") y suturas.*

| code | Sub-tema | Prioridad |
|---|---|---|
| E-1 | Anatomía quirúrgica facial: zonas de peligro (n. facial, a. temporal), líneas de tensión (RSTL), unidades estéticas | CRÍTICA |
| E-2 | Instrumental: porta-agujas, **pinzas** (Adson con/sin dientes, de relojero), tijeras (Iris, undermining), bisturí (hoja 15/15c) | ALTA |
| E-3 | Anestesia local: lidocaína ± epi, dosis máximas, bloqueos de campo y nerviosos faciales | CRÍTICA |
| E-4 | Material de sutura: absorbible vs no, calibres, tipos de aguja; asepsia y campo estéril | ALTA |
| E-5 | Técnicas de sutura: punto simple, colchonero vertical/horizontal, subcutáneo enterrado, sutura continua | ALTA |
| E-6 | Cierre primario, elipse/huso, manejo del **"dog-ear"**, regla 3:1 | ALTA |
| E-7 | Biopsias: punch, shave, incisional/excisional — cuándo cada una | CRÍTICA |
| E-8 | Electrocirugía, curetaje, crioterapia | MEDIA |
| E-9 | Mohs: principios, indicaciones, mapeo, procesamiento de tejido, lectura de márgenes | ALTA |
| E-10 | Colgajos (avance, rotación, transposición/romboidal, bilobulado) | MEDIA |
| E-11 | Injertos (FTSG, STSG) y cicatrización por segunda intención | MEDIA |
| E-12 | Complicaciones quirúrgicas: hematoma, necrosis, infección, dehiscencia | ALTA |

### BLOQUE F — Estética / Cosmética 🟡
*Mayor ROI económico futuro; hoy = teoría + anatomía. No inyectes sin base de E-1.*

| code | Sub-tema | Prioridad |
|---|---|---|
| F-1 | Anatomía facial para inyectables: músculos de expresión, compartimentos grasos, **arterias peligrosas** (angular, supratroclear) | ALTA |
| F-2 | Toxina botulínica I: mecanismo, unidades, dilución, tercio superior (glabela, frontal, periocular) | MEDIA |
| F-3 | Toxina botulínica II: tercio inferior, complicaciones (ptosis), manejo | MEDIA |
| F-4 | Rellenos I: tipos (ácido hialurónico, CaHA), planos, técnicas, reología | MEDIA |
| F-5 | Rellenos II: complicaciones vasculares, oclusión, hialuronidasa (rescate) | ALTA |
| F-6 | Peelings químicos: superficial/medio/profundo (glicólico, salicílico, TCA), por fototipo | MEDIA |
| F-7 | Láseres y luz I: principios (fototermólisis selectiva), cromóforos, tipos de láser | MEDIA |
| F-8 | Láseres II: aplicaciones (vascular, pigmento, resurfacing, depilación) y seguridad por fototipo | MEDIA |
| F-9 | Cosmecéuticos y rutina basada en evidencia (retinoides, vit C, niacinamida) | BAJA |
| F-10 | Consulta estética, fotografía clínica, consentimiento, manejo de expectativas | BAJA |

### BLOQUE G — Sub-especialidades de alto valor 🟡

| code | Sub-tema | Prioridad |
|---|---|---|
| G-1 | Tricología: alopecia androgenética, areata, efluvios, tricoscopia | MEDIA |
| G-2 | Patología ungueal: onicomicosis, melanoniquia (¡vs melanoma!), psoriasis ungueal | MEDIA |
| G-3 | Dermatología pediátrica: hemangiomas, dermatitis del pañal, genodermatosis frecuentes | MEDIA |
| G-4 | Mucosas oral/genital (líquen, aftas, leucoplasia) | BAJA |
| G-5 | Dermatología de piel de color (cicatrices queloides, PIH, pseudofoliculitis) — **alto ROI Perú** | ALTA |

---

## 3. TEXTOS DE REFERENCIA (qué sirve para qué)

> AccessMedicine/AccessDermatology son **🔒 de suscripción** (institucional). Verifica acceso vía tu universidad/hospital; si no, los equivalentes abiertos están en §4.

| Texto | Acceso | Para qué es bueno (ROI) |
|---|---|---|
| **Fitzpatrick's Color Atlas and Synopsis of Clinical Dermatology, 9e** (Wolff/Johnson) — AccessMedicine `bookid=3309` | 🔒 Suscripción | **Tu caballo de batalla diario.** >1000 fotos, formato atlas+sinopsis: dx, manejo, terapia. 9e añadió dermatoscopia, biológicos, IA, más piel de color y **videos** en mhprofessional.com/FitzpatricksColorAtlas9e (Downloads). Ideal para Bloques A–C. |
| **Fitzpatrick's Dermatology in General Medicine, 9e** (Kang et al.) | 🔒 Suscripción | **La biblia de referencia/profundidad.** Para entender patogenia, condiciones raras y para escribir/leer research. No es de lectura lineal: úsalo como enciclopedia cuando un tema lo merezca. |
| **Bolognia, *Dermatology* (4e)** | 🔒 (compra/inst.) | El **texto de residencia por excelencia**: estructura pedagógica superior, esquemas. Si compras uno físico, este. |
| **Weedon's / *McKee's Pathology of the Skin*** | 🔒 | Referencia de **dermatopatología** (Bloque D). Profundidad para correlación. |
| **Andrews' *Diseases of the Skin*** | 🔒 | Clínico, conciso, muy usado para repaso rápido. |
| **Robinson, *Surgery of the Skin*** | 🔒 | Referencia de **cirugía dermatológica** (Bloque E): técnicas, colgajos, sutura. |

**AccessDermatology / AccessMedicine** (`accessmedicine.mhmedical.com`): plataforma McGraw-Hill que aloja los Fitzpatrick + bancos de imágenes + casos + Q&A. **Si tu institución la tiene, es el centro de gravedad de Bloques A–C.** Confírmalo antes de planificar todo alrededor de ella.

---

## 4. RECURSOS GRATIS (con enlaces) — el núcleo de tu protocolo

### 4.1 Atlas e imágenes abiertas (Bloques A–C, G)
- **DermNet (NZ)** — `https://dermnetnz.org/` · **el mejor recurso gratuito del mundo**, 23,000+ imágenes, basado en evidencia, con catálogo de imágenes (`/image-catalogue`) y guía de recursos para profesionales (`/topics/useful-resources-for-a-dermatologist`). **Tu atlas de cabecera gratuito.**
- **Inclusive/Skin-of-color atlases** (vital para Perú):
  - "Full Spectrum of Dermatology" (uso no comercial libre).
  - **Global Skin Atlas** — espectro en todos los tonos de piel.
  - **UNM Inclusive Dermatology Photo Gallery** (U. New Mexico).
  - Wayne State photo atlas; DermWeb photo atlas (`http://www.dermweb.com/photo_atlas/`).
- **VisualDx** — 🔒 de pago, pero **muchas bibliotecas médicas dan acceso**; ~1/3 de imágenes en piel IV–VI. Pregunta por acceso institucional antes de pagar.

### 4.2 Currículos y cursos estructurados gratuitos
- **AAD Basic Dermatology Curriculum** — `https://www.aad.org/education/basic-derm-curriculum` (también `learning.aad.org`, módulos en video). Creado por educadores AAD; módulos auto-guiados (basic science, terapias, etc.). **Empieza aquí el Bloque A–B.** Requiere crear cuenta gratis.
- **Next Steps in Dermatology** — `https://nextstepsinderm.com/` · webinars archivados gratis, cheat sheets, guía del CORE de dermatopatología.

### 4.3 Video / lecturas clínicas (Bloques B–C)
- **Krazy Kodachromes** (GW / Dr. Adam Friedman) — series de kodachrome Q&A de alto rendimiento, gratis vía **Derm In-Review** (`https://dermatologyinreview.com/krazy_kodachromes/`) y `https://dermatology.smhs.gwu.edu/krazy-kodachromes`. Entrenan el ojo para preguntas con imagen.
- **Derm In-Review** — `https://dermatologyinreview.com/` · **gratis** (registro): 3,100+ preguntas estilo board, 4,200 imágenes, exámenes cronometrados, flashcards, lecturas (incl. sesiones ODAC board review). **Tu banco de preguntas principal.**
- **Dermatology Made Simple** (YouTube) — `https://www.youtube.com/channel/UC3kltYhXWW7FTL7dXjF3s1w` · explicaciones clínicas claras (revisa calidad por tema).
- **AAD Learning Center** — Basic Derm Curriculum **Videos** (`learning.aad.org`, listing 5520).

### 4.4 Dermatopatología (Bloque D) — fortaleza de recursos gratis
- **Dr. Jerad Gardner — "Dermpath MEGA Index"** — `https://kikoxp.com/posts/5084/public` (y canal YouTube `https://www.youtube.com/channel/UCfW2GM4Yqqg1pScI-2clhYQ`). **Curso de nivel fellowship, gratis**: video-lecturas, board review, slides digitales, reportes modelo. **El mejor recurso dermpath gratuito que existe.**
- **PathElective — Dermatopathology** — `https://www.pathelective.com/derm-path-home` · curso introductorio gratuito y ordenado.
- **PathPresenter — "Dermpath 100"** — `https://www.pathpresenter.com/dermpath100/` · 100 casos curados para auto-evaluación (cuenta gratis en `pathpresenter.net`).
- **ASDP Educational Videos** — `https://www.asdp.org/...Education/ASDP-Educational-Videos.aspx` (verifica cuáles son abiertos).
- **#DERMPATH YouTube playlist** — `https://www.youtube.com/playlist?list=PL4GDLmrdXtfQUtRHaSFqy42dY0o7nWS86`.
- Revisión de recursos abiertos dermpath (PMC, 2023): `https://pmc.ncbi.nlm.nih.gov/articles/PMC10203758/`.

### 4.5 Cirugía / Mohs / sutura (Bloque E)
- **ACMS (American College of Mohs Surgery) — Webinars** — `https://www.mohscollege.org/for-physicians/education/webinars` · anatomía facial (danger/safe zones), Mohs IHC, anatomía regional. **Algunos son members-only** 🔒 — varía; revisa los abiertos.
- **ASDS Learn (asds.pathlms.com)** — `https://asds.pathlms.com/courses` · Advanced Surgical Flap Reconstruction, "Hard Procedures" en cadáver, **Chemical Peel Video Series** (17 peelings), Resident Cosmetic & Surgical Essentials. **Mayoría 🔒/membresía**, pero es el catálogo de referencia para saber qué dominar.
- **YouTube (calidad variable — filtra)**: busca canales de programas de residencia y cirujanos Mohs para *primary closure, vertical mattress, buried suture, dog-ear repair, rhombic/bilobed flap*. **Caveat honesto:** YouTube tiene mucho contenido quirúrgico gratis pero la calidad es heterogénea (PMC confirma que cualquiera publica); valida contra ASDS/Robinson. No cito un canal único "definitivo" gratuito de sutura porque no encontré uno verificablemente canónico y abierto — usa búsquedas por técnica + cross-check con texto.
- **Suturing técnica (práctica en casa):** kits de práctica + guías de Robinson; entrena el knot-tying antes de la residencia.

### 4.6 Estética (Bloque F)
- **ASDS Chemical Peel Video Series** (arriba) para peelings.
- **IMCAS Academy** (`imcas.com`) — gran biblioteca de inyectables/anatomía, pero **mayoría 🔒 de pago/membresía**. Algunos webinars abiertos puntuales.
- **Caveat honesto:** el grueso de formación de calidad en toxina/rellenos/láser es **de pago** (Empire, AAFE, Dr. Tim Pearce, etc.) o presencial con cadáver. Gratis y confiable: **anatomía facial** (de Bloque E/F-1 vía recursos quirúrgicos abiertos) + papers de complicaciones vasculares en PubMed. No inventes seguridad: lo inyectable se aprende supervisado.

### 4.7 Research (para el track Mayo) — alternar M-J
- **PubMed** — `https://pubmed.ncbi.nlm.nih.gov/` · arma alertas con queries de tus temas (p. ej. *dermoscopy melanoma acral*, *Mohs flap reconstruction outcomes*).
- **JAAD / JAMA Dermatology / Dermatologic Surgery** — sigue tablas de contenido; muchos *review* y *CME* son la mejor síntesis high-yield.
- **Mayo Clinic Dermatology library guide** — `https://libraryguides.mayo.edu/derm` (referencia de qué consultan ellos).
- Estrategia Mayo: 1 *case report* + 1 *systematic review/meta* por trimestre, con un mentor; prioriza dermatoscopia/derm-surg donde Perú tiene casuística (leishmaniasis, piel de color).

---

## 5. PROTOCOLO STARTER DE 12 SEMANAS

**Supuestos:** ~1 h/día Derma en días alternos (L-X-V), Research M-J. → ~3 sesiones Derma/semana ≈ **36 sesiones** en 12 semanas. Cada sesión: **40 min material nuevo + 20 min repaso espaciado** (cola de vueltas del motor). "Vueltas" = pases del tema, según prioridad.

> **Deadlines = fin de cada fase.** "1ª vuelta" significa primera exposición; las vueltas 2-6 las agenda automáticamente tu motor (intervalos §0). Marca el `code` el día que lo tocas → el engine calcula los repasos.

### FASE 1 — Cimientos (Semanas 1-3) · Deadline: fin Sem 3
*Recurso base: AAD Basic Curriculum + DermNet + Fitzpatrick Color Atlas (si tienes acceso).*
- **Sem 1:** A-1, A-2, A-3 (lesiones + semiología) → 1ª vuelta. **No avances sin dominar el "alfabeto".**
- **Sem 2:** A-6 (Fitzpatrick/piel de color), A-4, A-7. + repasos vuelta-2 de A-1/2/3.
- **Sem 3:** A-5 + arranque B-1 (acné), B-2 (eczemas). Primera dermatoscopia teórica (C-6 intro).
- **Vueltas meta fin Fase 1:** CRÍTICAS de A → vuelta 3; B-1/B-2 → vuelta 1.

### FASE 2 — Las 80/20 de clínica (Semanas 4-7) · Deadline: fin Sem 7
*Recurso base: Krazy Kodachromes + Derm In-Review (preguntas) + DermNet.*
- **Sem 4:** B-3 (psoriasis), B-4 (urticaria), B-5 (**emergencias por fármacos — CRÍTICA, no errar**).
- **Sem 5:** B-6, B-7 (KOH), B-9 (escabiosis) — alta prevalencia Perú. **+ empieza D-1/D-2 (dermpath, 15 min/sesión, Gardner).**
- **Sem 6:** B-8, B-11, B-17 (tropical: leishmaniasis/lepra — **ROI Perú**). G-5 (piel de color).
- **Sem 7:** B-12, B-13 + **bloque de 50 preguntas Derm In-Review** para consolidar Bloque B. Repasos vuelta-2/3 acumulados.
- **Vueltas meta:** todas las CRÍTICAS de B → ≥ vuelta 3; empieza el goteo dermpath.

### FASE 3 — Oncología + Dermatoscopia (Semanas 8-10) · Deadline: fin Sem 10
*El bloque de mayor ROI "no errar". Recurso: DermNet dermoscopy + Fitzpatrick + dermpath Gardner.*
- **Sem 8:** C-1, C-2, C-3 (QA/CBC/CEC) + correlación dermpath D-5.
- **Sem 9:** C-4 (melanoma — Breslow, centinela), C-5 (nevus) + D-4 (histo melanocítica). **La semana más densa: melanoma clínico + dermatoscópico + histológico el mismo tema = correlación que distingue al élite.**
- **Sem 10:** C-6, C-7, C-8 (dermatoscopia I-III, incl. acral/piel de color) + 50 preguntas C.
- **Vueltas meta:** C-1..C-6 → vuelta 2-3; melanoma (C-4) tocado en clínica+dermpath+dermatoscopia.

### FASE 4 — Manos: Cirugía/Mohs + entrada a Estética (Semanas 11-12) · Deadline: fin Sem 12
*Recurso: ACMS/ASDS webinars abiertos + Robinson (teoría) + práctica de nudos en casa.*
- **Sem 11:** E-1 (anatomía/zonas peligro — **CRÍTICA**), E-3 (anestesia), E-7 (biopsias), E-2 (instrumental/pinzas). + práctica de knot-tying.
- **Sem 12:** E-4, E-5, E-6 (suturas + dog-ear), E-9 (Mohs principios) + F-1 (anatomía facial para inyectables — puente a estética). **Revisión global + simulacro de 100 preguntas mixtas (Derm In-Review).**
- **Vueltas meta:** E-1/E-3/E-7 → vuelta 2; resto sembrado para Fase siguiente.

### Tabla de cobertura por fase

| Fase | Semanas | Bloques | CRÍTICAS nuevas | Deadline |
|---|---|---|---|---|
| 1 Cimientos | 1-3 | A (+B inicio) | A-1,2,3,6 | Fin Sem 3 |
| 2 80/20 clínica | 4-7 | B (+D goteo) | B-1..B-9, B-17 | Fin Sem 7 |
| 3 Oncología/dermatoscopia | 8-10 | C (+D corr.) | C-1..C-6 | Fin Sem 10 |
| 4 Manos + estética | 11-12 | E (+F-1) | E-1,E-3,E-7 | Fin Sem 12 |

**Tras 12 semanas:** reinicia el ciclo en modo mantenimiento — las vueltas tardías (días 60-75) de Fase 1 caen ahora, y abres Bloque F completo + G + dermpath D-3..D-8 a ritmo sostenido. El motor de repaso ya tiene toda la cola sembrada.

---

## 6. Micro-horario sugerido (sesión de 60 min, espejo de tu "NÚCLEO DEEP PRIME")

| Franja | Min | Actividad |
|---|---|---|
| 0:00–0:05 | 5 | Cola de repaso de HOY (el engine lista `code`s cuyo intervalo cae hoy) — flash, solo recall activo |
| 0:05–0:45 | 40 | Material nuevo del día (video/atlas/texto) + nota de 3 viñetas + 1 imagen al banco |
| 0:45–0:55 | 10 | 10-15 preguntas Derm In-Review del tema |
| 0:55–1:00 | 5 | Marcar `code` como visto (siembra los repasos) + 1 línea de "por qué importa clínicamente" |

---

## NOTAS DE HONESTIDAD (gating / incertidumbre)
- **🔒 De pago/login:** AccessMedicine/AccessDermatology y todos los Fitzpatrick/Bolognia/Robinson (verifica acceso institucional primero); IMCAS, Empire/AAFE (estética); buena parte de ACMS y ASDS Learn (membresía). **VisualDx** suele estar gratis vía biblioteca médica — pregunta antes de pagar.
- **Gratis y verificado fuerte:** DermNet, AAD Basic Curriculum, Derm In-Review, Krazy Kodachromes, Gardner Dermpath MEGA Index, PathElective, PathPresenter Dermpath100.
- **Donde no inventé:** no afirmo un canal de YouTube *único canónico y gratuito* de sutura/Mohs porque la evidencia (PMC) dice que la calidad en YouTube es heterogénea; te di las instituciones (ASDS/ACMS/Robinson) como ancla de calidad y la estrategia de búsqueda por técnica. La formación segura de inyectables es presencial/supervisada — lo gratis cubre anatomía y complicaciones, no la práctica.
- **Excluido a propósito:** "Dr. Pimple Popper" (entretenimiento, no formación quirúrgica rigurosa).

---

**Archivos relevantes del repo para volcar esto a datos:**
- `D:\joseph-md-app\src\lib\encapsPlan.ts` — `REPASO_POR_PRIORIDAD`, `normPrio`, `totalVueltas`, `repasosDeHoy` (reusar tal cual para Derma).
- `D:\joseph-md-app\src\lib\encapsBlocks.ts` — patrón de `EncapsBlock`/`subtemas_detalle` para modelar `DermaBlock`.
- `D:\joseph-md-app\src\screens\DermaScreen.tsx` y `D:\joseph-md-app\src\layouts\desktop\DesktopEstudioContent.tsx` — pantallas donde renderizar el currículo Derma con el mismo design system.

Guarda este dossier (p. ej. `D:\joseph-md-app\BUSINESS_HUB_LIVIANO\01_INVESTIGACION\curriculo-dermatologia-elite.md`) y conviértelo a `dermaData.ts` con el esquema `{ code, subtema, prioridad, url }` por sub-tema.

**Sources:** [DermNet](https://dermnetnz.org/) · [AAD Basic Derm Curriculum](https://www.aad.org/education/basic-derm-curriculum) · [Derm In-Review / Krazy Kodachromes](https://dermatologyinreview.com/krazy_kodachromes/) · [GW Krazy Kodachromes](https://dermatology.smhs.gwu.edu/krazy-kodachromes) · [Jerad Gardner Dermpath MEGA Index](https://kikoxp.com/posts/5084/public) · [Gardner YouTube](https://www.youtube.com/channel/UCfW2GM4Yqqg1pScI-2clhYQ) · [PathElective Dermpath](https://www.pathelective.com/derm-path-home) · [PathPresenter Dermpath100](https://www.pathpresenter.com/dermpath100/) · [#DERMPATH playlist](https://www.youtube.com/playlist?list=PL4GDLmrdXtfQUtRHaSFqy42dY0o7nWS86) · [Online dermpath resources review (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10203758/) · [ACMS Webinars](https://www.mohscollege.org/for-physicians/education/webinars) · [ASDS Learn courses](https://asds.pathlms.com/courses) · [Fitzpatrick Color Atlas 9e (AccessMedicine)](https://accessmedicine.mhmedical.com/book.aspx?bookid=3309) · [Next Steps in Derm](https://nextstepsinderm.com/) · [PubMed](https://pubmed.ncbi.nlm.nih.gov/) · [Mayo Derm library guide](https://libraryguides.mayo.edu/derm)