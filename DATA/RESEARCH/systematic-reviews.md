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

## Fase 2 — Búsqueda en N bases (reproducible)

**Bases mínimas (estándar Cochrane):**
1. MEDLINE
2. Embase
3. CENTRAL (Cochrane Central Register of Controlled Trials)

**Recomendación robusta (añadir):**
4. Web of Science y/o Scopus
5. **LILACS / BVS** — literatura latinoamericana, recomendada por Cochrane
6. **Registros de ensayos**: ClinicalTrials.gov + **ICTRP** (OMS)

**Reglas de oro de la búsqueda:**
- Reporta cada componente con **PRISMA-S** (16 ítems) para que la estrategia sea totalmente reproducible — incluye listar los registros de ensayos.
  URL: https://www.prisma-statement.org/prisma-search · Paper: https://pmc.ncbi.nlm.nih.gov/articles/PMC7839230/
- Guarda **fecha de búsqueda, base, interfaz, líneas de la sintaxis y nº de resultados** por base.
- Idealmente, que un bibliotecólogo/information specialist revise o ejecute la estrategia (peer review tipo PRESS).

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
