# Playbook de Revisión Sistemática paso a paso (2026)

> **Estándar de oro 2026.** Una RS publicable se apoya en 4 pilares verificados: **reporte** (PRISMA 2020), **registro** (PROSPERO), **conducción** (Cochrane Handbook v6.5, ago-2024) y **evaluación** (GRADE + RoB 2 / ROBINS-I / AMSTAR-2). Sigue las fases en orden: cada una bloquea la siguiente.

---

## Fase 0 — Pregunta PICO y protocolo

- **Formula la pregunta en formato PICO**: Población, Intervención, Comparador, Outcome (desenlace). Define un único desenlace primario relacionado con salud (requisito de elegibilidad para registrar después en PROSPERO).
- **Define criterios de elegibilidad** (inclusión/exclusión) y diseños de estudio admitidos *antes* de buscar.
- **Escribe el protocolo** siguiendo PRISMA-P (la extensión de PRISMA para protocolos). El protocolo congela el método y previene cambios oportunistas (data dredging).

## Fase 1 — Registro prospectivo en PROSPERO

- **Plataforma**: PROSPERO (CRD, Universidad de York) — **gratuito**.
  URL: https://www.crd.york.ac.uk/PROSPERO/help/register
- **Cuándo**: idealmente **antes de iniciar el cribado formal**; sigues siendo elegible mientras **no hayas superado la finalización de la extracción de datos**.
- **Restricción de elegibilidad**: solo RS con un **desenlace relacionado con salud**.
  - **NO admite** scoping reviews ni reviews of reviews (decisión revisable a futuro).
  - Alternativas si tu revisión no encaja: **OSF Registries** (gratis, sin restricción de tipo) o **INPLASY** (de pago, rápido).
- PROSPERO detecta RS similares ya registradas y te pide justificar la nueva. Registros sin finalizar a >2 años se marcan.
- ⚠️ **No verificable**: no hay una cifra oficial de tiempo de procesamiento ("X semanas"); trátalo como no confirmado.

## Fase 2 — Búsqueda en N bases (reproducible · motor multi-fuente)

> **Metodología real de este programa:** la búsqueda **no se limita a PubMed** ni se hace a mano — corre
> el **motor de descubrimiento** automático (5 fuentes async, OpenAlex troncal). Spec verificada:
> [`discovery-engine.md`](discovery-engine.md).

**Mínimo metodológico:** Bramer et al. 2017 (verificado) recomienda **≥4 bases** (Embase + MEDLINE +
Web of Science Core + primeros 200 de Google Scholar) → **98.3% de recall** (95% en el 93% de las SR).
Cochrane exige al menos MEDLINE + Embase + CENTRAL.

**Las 5 fuentes del motor (cobertura abierta, ≈97% sensibilidad):**
1. **OpenAlex** ⭐ troncal — 250M+ (CC0). Validado 98% de cobertura para SR (Stansfield 2025, DOI 10.1002/cesm.70038). ⚠️ **API key gratis obligatoria desde 13-feb-2026** (el polite pool/`mailto` está muerto).
2. **PubMed/MEDLINE** (E-utilities, MeSH).
3. **Europe PMC** (sin key; texto completo OA; preprints). *No indexa Embase — corrección al manual.*
4. **LILACS / BVS** (descriptores DeCS) — **ventaja diferencial peruana/LATAM**.
5. **Semantic Scholar** (bulk + TLDR; `externalIds` para dedup por DOI).
+ Registros de ensayos: **ClinicalTrials.gov + ICTRP**. Embase completo / Web of Science / Scopus si la
institución da acceso (verificación complementaria).

**Reglas de oro de la búsqueda:**
- Reporta cada componente con **PRISMA-S** (16 ítems) para que la estrategia sea totalmente reproducible — incluye listar los registros de ensayos.
  URL: https://www.prisma-statement.org/prisma-search · Paper: https://pmc.ncbi.nlm.nih.gov/articles/PMC7839230/
- Guarda **fecha de búsqueda, base, interfaz, líneas de la sintaxis y nº de resultados** por base; el motor lo registra automáticamente en Supabase.
- **Citation-chasing** (referencias + citas vía OpenAlex `referenced_works`/`cited_by`) para cerrar el ~4% que la booleana no recupera.
- Idealmente, que un bibliotecólogo/information specialist revise o ejecute la estrategia (peer review tipo PRESS).
- **Texto completo:** cascada legal **Unpaywall → Europe PMC/PMC OA → preprints → ALICIA-CONCYTEC → autor** (ver [`discovery-engine.md §4`](discovery-engine.md)).

## Fase 3 — Screening (cribado) con herramienta

Cribado en dos niveles: **título/abstract** → **texto completo**, idealmente por **2 revisores independientes** con resolución de conflictos.

| Herramienta | Modelo | Costo (verificado) |
|---|---|---|
| **Rayyan** | Web colaborativa | **Free** hasta 3 revisiones activas; de pago **desde 4.99 USD/mes** |
| **ASReview** | Open source, *active learning* | **Gratis** |
| **Covidence** | Plataforma de pago | **240–450 USD/año**; **gratis para autores Cochrane** |

- Registra el conteo exacto de excluidos **con razones** en el texto completo (alimenta el diagrama de flujo).

## Fase 4 — Extracción de datos

- Usa un **formulario de extracción piloteado**; doble extracción cuando sea factible.
- Herramienta asistida por IA: **Elicit** — **free hasta 20 extracciones/mes**.
- Extrae: características del estudio (diseño, n, población), intervención/comparador, desenlaces (medidas, tiempos), datos para meta-análisis (medias, DE, eventos, n por brazo) y **dominios para riesgo de sesgo**.

## Fase 5 — Riesgo de sesgo y certeza (GRADE)

**Riesgo de sesgo (por estudio):**
- **RoB 2** — para **ECA** (ensayos clínicos aleatorizados). **5 dominios**.
- **ROBINS-I** — para estudios **no aleatorizados** de intervención. **7 dominios**.
- **AMSTAR-2** — **16 ítems (7 críticos)**; sirve para **apreciar RS existentes**, no para estudios primarios.

**Certeza de la evidencia (por desenlace):**
- **GRADE** — **4 niveles** de certeza (alta, moderada, baja, muy baja) evaluados sobre **5 dominios** (riesgo de sesgo, inconsistencia, indirectness, imprecisión, sesgo de publicación). Resume en una **Summary of Findings table**.

## Fase 6 — Meta-análisis con herramienta

Solo si los estudios son suficientemente homogéneos clínica y metodológicamente.

| Herramienta | Notas | Costo (verificado) |
|---|---|---|
| **R** (paquetes `metafor` / `meta`) | Estándar *de facto* | **Gratis** |
| **RevMan Web** | Flujo Cochrane oficial | **Gratis para autores Cochrane**; suscripción para otros |
| **Python** (`PythonMeta`, `statsmodels`) | Alternativa | **Gratis** |

- Decide **modelo de efectos fijos vs aleatorios**, calcula la medida de efecto pooled, evalúa **heterogeneidad (I², τ²)**, y haz **forest plot** + análisis de **sesgo de publicación** (funnel plot, Egger) y **sensibilidad/subgrupos**.
- ⚠️ **No verificable**: el precio exacto de RevMan para autores **no-Cochrane** (detrás de login) y el numeral "RevMan 8" — la versión vigente verificada es **"RevMan Web"**.

## Fase 7 — Diagrama de flujo y manuscrito (PRISMA 2020)

- **Diagrama de flujo PRISMA 2020**: 4 fases (Identification → Screening → Included) con **vías SEPARADAS** "Databases and registers" vs "other sources" (la diferencia clave frente a PRISMA 2009). Hay **4 plantillas Word** (nuevas vs actualizadas, licencia CC BY 4.0) y un **generador Shiny** (eshackathon/PRISMA2020).
  URL plantilla: https://www.prisma-statement.org/prisma-2020-flow-diagram · App: https://www.eshackathon.org/software/PRISMA2020.html
- **Manuscrito**: cumple el **checklist PRISMA 2020 de 27 ítems** (7 secciones: título, abstract, introducción, métodos, resultados, discusión, financiamiento), incluyendo registro del protocolo, herramientas de automatización usadas y certeza de la evidencia.
  Documento canónico (gratis): https://pmc.ncbi.nlm.nih.gov/articles/PMC8008539/ · Web oficial: https://www.prisma-statement.org/

---

## Checklist rápido de los 4 pilares

- [ ] **Reporte** → PRISMA 2020 (27 ítems + flujo 4 fases) + PRISMA-S (búsqueda)
- [ ] **Registro** → PROSPERO antes de cerrar la extracción (o OSF si es scoping)
- [ ] **Conducción** → Cochrane Handbook v6.5 (ago-2024)
- [ ] **Evaluación** → GRADE + RoB 2 / ROBINS-I (+ AMSTAR-2 para apreciar RS)

---

## Recursos de YouTube y cursos para aprender a hacer RS (reales y verificados)

**Canales de YouTube**
- **Cochrane Training** (canal oficial; tutoriales de RevMan y metodología paso a paso)
  https://www.youtube.com/channel/UCoWzvKR8RPHG07PPeqBiibA
- **JBI** (Joanna Briggs Institute) — videos de síntesis de evidencia y metodología
  https://www.youtube.com/channel/UCEWhJYFQityaRhV-BGCklCQ
- **Learn Meta-Analysis** (@LearnMetaAnalysis) — recurso orientado a principiantes en meta-análisis

**Cursos / programas formales**
- **Cochrane Interactive Learning** — "Conducting an intervention review": ~17 h en 12 módulos (pregunta, búsqueda, riesgo de sesgo, meta-análisis, GRADE). **Módulo 1 gratis** para usuarios registrados; libre para autores Cochrane; descuento para miembros.
  https://www.cochrane.org/learn/courses-and-resources/interactive-learning/module-1-introduction-conducting-systematic-reviews
- **JBI — Comprehensive Systematic Review Training Program (CSRTP)** — evidencia cuantitativa, cualitativa y narrativa.
  https://jbi.global/education/systematic-review-training
- **RevMan (Cochrane Training)** — guía oficial "Get started using RevMan".
  https://training.cochrane.org/online-learning/core-software/revman

**Recursos para la parte estadística en R**
- **Serie `metafor`** (Wolfgang Viechtbauer) — el paquete de referencia para meta-análisis en R.
- **Libro online gratuito "Doing Meta-Analysis with R"** (Harrer, Cuijpers et al.) — tutorial completo y reproducible.

**Webs oficiales de referencia**
- PRISMA: https://www.prisma-statement.org/
- PROSPERO: https://www.crd.york.ac.uk/PROSPERO/help/register

> **Nota de verificación**: las URLs de los canales de YouTube están corroboradas por múltiples resultados de búsqueda independientes (las páginas "About" de YouTube no se renderizan vía fetch); confianza alta en la identidad de cada canal. Toda cifra de costo proviene de las fuentes citadas en los informes. No se inventó ninguna URL.

---

## Referentes de método: el *walkthrough* canónico paso a paso (verificado, jun-2026)

> Encargo #1 del chat de Research: **revisar cómo construyen los referentes una revisión sistemática paso a
> paso** y guardar recursos con URLs reales. Aquí está el recorrido de punta a punta que siguen los
> referentes (Cochrane, JBI, PRISMA, autores metodológicos), **mapeado a un recurso concreto por paso** y a
> los átomos del plan día-a-día ([`daily-plan.md`](daily-plan.md)). No es teoría suelta: es la secuencia que
> el plan ejecuta sobre una SR real.

### El recorrido que enseñan los referentes (8 pasos)

| Paso | Lo que hacen los referentes | Recurso de referencia (real) | Átomo `daily-plan` |
|---|---|---|---|
| **1. Pregunta PICO + protocolo** | Congelar la pregunta y el método *antes* de buscar (PRISMA-P). | Cochrane Interactive Learning Módulo 1 (gratis) · *step-by-step guide* Ahn & Kang | R2, R6–R8 |
| **2. Registro** | Registrar en PROSPERO antes de cerrar la extracción (o OSF si es scoping). | PROSPERO · OSF Registries | R9–R11 |
| **3. Búsqueda reproducible** | Estrategia MeSH+booleana en ≥3–5 bases, documentada con **PRISMA-S**; idealmente revisada por bibliotecólogo (PRESS). | NLM PubMed training · PRISMA-S | R12–R16 |
| **4. Screening 2 revisores** | Cribado T/A → texto completo con herramienta; medir **Kappa**; resolver conflictos. | **Rayyan** (canal oficial + help center) · ASReview | R17–R21 |
| **5. Extracción piloteada** | Formulario piloteado, doble extracción; IA como segundo par de ojos. | Cochrane Handbook · Elicit | R22–R25 |
| **6. Sesgo + GRADE** | RoB 2 / ROBINS-I por estudio; **GRADE** por desenlace en una Summary of Findings. | riskofbias.info · GRADEpro | R26–R28 |
| **7. Meta-análisis (si procede)** | Effect size, modelo fijo/aleatorio, **forest plot**, I²/τ², funnel/Egger, subgrupos. | **"Doing Meta-Analysis in R"** (libro online gratis) · metafor · Cochrane Training YouTube | R29–R33 |
| **8. Reporte PRISMA 2020** | Manuscrito con checklist de 27 ítems + diagrama de flujo de 4 fases. | PRISMA 2020 (checklist PMC + flow Shiny) · EQUATOR | R34–R40 |

### Recursos verificados en esta ronda (añadidos)

- **"A step-by-step guide for conducting a systematic review and meta-analysis with simulation data"**
  (Ahn EJ & Kang H, *Tropical Medicine and Health* 2019) — paper open-access que recorre las 18 sub-etapas
  de una SR+MA con datos de ejemplo; el mejor "mapa de una página" para ver el flujo completo.
  https://pmc.ncbi.nlm.nih.gov/articles/PMC6670166/
- **Rayyan — canal oficial de YouTube** (tutoriales hands-on de cribado, p. ej. *"Rayyan for Systematic
  Reviews: A Hands-On Intro"*). https://www.youtube.com/@Rayyanapp
- **Rayyan — Help Center: "How to Create a Systematic Review in Rayyan"** (guía escrita paso a paso).
  https://help.rayyan.ai/hc/en-us/articles/22088155760017-How-to-Create-a-Systematic-Review-in-Rayyan
- **"Doing Meta-Analysis in R: A Hands-On Guide"** (Harrer, Cuijpers, Furukawa & Ebert) — **libro online
  gratuito**, el tutorial reproducible de referencia para la parte estadística (incluye `dmetar`, forest,
  heterogeneidad, funnel, subgrupos, meta-regresión). https://bookdown.org/MathiasHarrer/Doing_Meta_Analysis_in_R/
- **metafor project** (Wolfgang Viechtbauer) — sitio oficial del paquete de meta-análisis en R.
  https://www.metafor-project.org/

> **Nota de verificación de esta ronda:** las URLs de arriba se corroboraron por búsqueda independiente
> (jun-2026). El libro *Doing Meta-Analysis in R* es la versión bookdown gratuita (existe también edición
> de pago en CRC Press, misma autoría). El paper Ahn & Kang es open-access en PMC. Los canales de YouTube
> se citan por identidad de canal, no por una URL de vídeo individual perecedera.
