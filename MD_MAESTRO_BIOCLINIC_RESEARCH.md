# MD MAESTRO — SISTEMA DE INVESTIGACIÓN BIOCLINIC
### Programa PERU-ACNE → Mayo Clinic → Bioclinic Dermatología
**Joseph Max Soto Tocas (Joseph MD)** · Médico Cirujano (bachiller), UNCP — Huancayo, Perú
**Documento maestro v1.0 · 10 Junio 2026** · Idioma de planificación: Español · Idioma de manuscrito y prompts de agentes: Inglés

> **Propósito de este archivo.** Es la fuente única de verdad ("source of truth") que se pega en **Claude Code** para diseñar y mejorar la sección **`/research`** de la aplicación web (`joseph-md-app.vercel.app`). Contiene: (1) toda la data consolidada de los chats del programa, (2) investigación profunda y actualizada de referentes, técnicas y metodología, y (3) la especificación del **sistema agéntico** (un agente orquestador que controla subagentes que redactan secciones de un paper, de modo que el humano solo verifica el Word final). **No contiene la agenda día-a-día** — eso lo ejecuta el sistema; aquí está la *estructura*, el *conocimiento* y el *sistema*.

---

## 0. CÓMO USAR ESTE DOCUMENTO (instrucciones para Claude Code)

**Misión de Claude Code:** construir/mejorar la sección `/research` de la app de modo que sea simultáneamente:
1. **Panel de control (dashboard)** del programa de publicaciones (líneas, papers, métricas hacia Mayo).
2. **Consola del sistema agéntico** (estado de agentes, cola de tareas, papers en redacción, checkpoints pendientes de verificación humana).
3. **Base de conocimiento** navegable (líneas de investigación, referentes, revistas objetivo, requisitos).

**Reglas de construcción:**
- Stack sugerido: **Next.js + React + Tailwind** (la app ya está en Vercel), con datos en **Supabase (PostgreSQL)** — ya es parte del stack del usuario.
- Todo número que represente "publicaciones indexadas" debe venir de datos reales (PubMed/Scopus verificados), nunca de marketing. La aguja la mueven **PIPs = Publicaciones Indexadas Para competir**.
- El sistema agéntico es **orchestrator-worker con human-in-the-loop (HITL)**: el humano (Joseph) es siempre el verificador final. Nada se "publica" ni se da por terminado sin su aprobación en un checkpoint.
- Respetar el **silo por línea**: cada línea de investigación es un contexto aislado; un subagente de una línea no debe contaminar otra.
- Idioma de la UI: español. Idioma de los manuscritos y prompts internos de los agentes: inglés.

**Mapa de secciones de este documento:**
| § | Contenido |
|---|-----------|
| 1 | Visión, objetivo final y *reality check* de la vía Mayo |
| 2 | Principios del sistema (filtros y estándares no negociables) |
| 3 | Estado actual (línea base) |
| 4 | El motor de publicación (tipos de output, métricas, requisitos, RENACYT, revistas) |
| 5 | Las líneas de investigación 0–8 (énfasis en estética estructural) |
| 6 | Referentes, recursos, técnicas y literatura fundacional (investigado) |
| 7 | Arquitectura del sistema agéntico (orquestador + subagentes + infra) |
| 8 | Especificación de la web app `/research` (data model + componentes) |
| 9 | Roadmap temporal (fases A–D, hitos, métricas por año) |
| 10 | Identificadores, contactos y stack |
| 11 | Riesgos y decisiones abiertas (a confirmar por Joseph) |

---

## 1. VISIÓN Y OBJETIVO FINAL

### 1.1 La meta
Construir un **programa de investigación dermatológica indexado y citable** que sirva como motor para dos destinos encadenados:

- **Destino académico:** **Fellowship/posición en Mayo Clinic en Dermatología** (vía formación o investigación), con un CV competitivo internacional.
- **Destino clínico-empresarial:** **Bioclinic Dermatología** — clínica dermatológica/estética propia, con potencial de escalamiento (modelo replicable/franquicia), sustentada por la autoridad científica que da la investigación publicada.

La investigación es el **eje que conecta ambos**: cada paper de estética estructural (anatomía, reología de fillers, envejecimiento facial, seguridad de inyectables) construye a la vez (a) puntos para el CV académico y (b) protocolos y autoridad clínica para Bioclinic.

### 1.2 Métrica dura de la meta
- **Para competir (mínimo realista):** ~**3 PIPs** (publicaciones indexadas reales).
- **Nivel Mayo (stretch):** **8–15 PIPs**, con **≥2 de "original research" como primer autor**.
- **Componente de revisiones sistemáticas:** mínimo **3 SR/meta-análisis** (una por cada gran clúster temático: acné/QoL, estética estructural, seguridad de inyectables) — *cantidad exacta a confirmar por Joseph en §11*. Las SR son el camino más rápido a indexación porque **no requieren comité de ética** y se pueden ejecutar con datos públicos.
- **Línea base hoy (Junio 2026):** **0 publicaciones indexadas**; tesis (Línea 0) defendida (20 Abr 2026) y en pipeline administrativo de titulación.

### 1.3 *Reality check* de la vía Mayo (honesto — leer con cuidado)
Tras verificación directa de los requisitos actuales de Mayo Clinic (2026):

- Los **fellowships clínicos de dermatología de Mayo** exigen haber completado una **residencia de dermatología acreditada por ACGME (4 años en EE.UU.)** y ser **board-eligible/certified** en EE.UU. No basta una residencia europea (MIR español).
- La **residencia de dermatología en Mayo** se aplica por **ERAS** y se asigna por **NRMP (Match)**; requiere un año previo de *clinically-based training* en una institución ACGME. Una de las cartas de recomendación debe ser de un **dermatólogo con quien hayas trabajado**.
- Para un **IMG (international medical graduate)** la puerta es la **certificación ECFMG**, que exige **USMLE Step 1 y Step 2** aprobados.

**Implicación estratégica (forks reales):**
- **Fork A — Vía clínica ACGME (la "directa" a Mayo):** USMLE Step 1 + Step 2 + ECFMG → Match a residencia de dermatología en EE.UU. (extremadamente competitivo para IMG) → fellowship Mayo. Es la única vía que abre los fellowships *clínicos* de Mayo.
- **Fork B — Vía investigación/observership:** posiciones de **research fellow, postdoc, visiting scientist u observership** en Mayo (no requieren residencia ACGME) — construidas sobre el CV de publicaciones + colaboraciones (p. ej., con figuras con vínculo Mayo como **Sebastian Cotofana** y **Alexander Meves**). No otorgan board, pero sí presencia, cartas y co-autorías Mayo.
- **Fork C — Vía MIR (España) + investigación:** residencia de dermatología vía MIR (Barcelona/Clínic) da formación clínica europea de primer nivel y CV, pero **no** habilita directamente el fellowship clínico ACGME de Mayo. Sirve como base para el Fork B o para la carrera europea + Bioclinic.

> **Decisión a fijar (§11):** ¿el objetivo Mayo es *clínico* (Fork A, exige USMLE+Match) o *de investigación/prestigio* (Fork B, vía CV + colaboradores)? Esto cambia toda la priorización de USMLE vs. publicaciones.

---

## 2. PRINCIPIOS DEL SISTEMA (no negociables)

Estos principios son **reglas de validación** que el sistema agéntico y la app deben hacer cumplir.

### 2.1 Filtro Mayo Clinic (gate de toda decisión)
Toda línea, paper, diseño o revista se evalúa con: *"¿Esto fortalece el CV de quien aplica/colabora con Mayo Clinic en Dermatología?"* Se puntúa **/40** en 4 ejes (Novelty, Feasibility, Impact, CV-Mayo, cada uno /10). Umbral de aprobación: **≥32/40**.

### 2.2 Estándar de estructura de argumento
Cada afirmación científica debe citar: **diseño de estudio + tamaño muestral + país + institución + año + autor + revista**. Regla dura: **al menos un estudio nacional peruano por argumento**, o **declaración explícita de que no existe** (esto es, de hecho, el *gap* publicable).

### 2.3 Cadena estadística
Normalidad confirmada con **Shapiro-Wilk** → si no-normal, **Spearman Rho** (no Pearson). **IC por bootstrap** preferido. **Asociación ≠ causalidad** (criterios de Bradford Hill). Acuerdo interobservador con **Kappa ponderado** (umbral κ > 0.80, Landis & Koch "casi perfecto").

### 2.4 Minimización Turnitin
Toda inserción/redacción usa **paráfrasis original**, nunca texto de cita directa. El agente de QA verifica similitud antes del checkpoint humano.

### 2.5 Lección XML de Word (UNCP)
El campo TOC de la plantilla de tesis UNCP **borra contenido insertado al actualizar**. Las inserciones deben anclarse **después del límite del campo TOC más externo**, usando anclas de texto único *body-only*, no texto de encabezado de sección. (Relevante para el agente que genera Word.)

### 2.6 Muestras correctas
En comparaciones internacionales reportar **n analítico** (p. ej., n=316 casos confirmados), no el **n censal de tamizaje** (n=865).

### 2.7 BUILD vs. USE
Separar **tiempo de construcción del sistema** del **tiempo de uso sectorial**. El sistema agéntico debe correr en segundo plano (24/7) para que el "USE" del humano sea solo verificación.

### 2.8 Entregables
Joseph prefiere **archivos Word/PowerPoint listos para usar** al final de cada ciclo; las ediciones manuales puntuales (fotos, tildes, reposicionar secciones) las hace él. El sistema entrega **.docx**, no texto en chat.

---

## 3. ESTADO ACTUAL (línea base — Junio 2026)

| Indicador | Valor hoy | Meta |
|-----------|-----------|------|
| Publicaciones indexadas (PIPs) | **0** | 3 (competir) / 8–15 (Mayo) |
| Revisiones sistemáticas | 0 | ≥3 |
| Readiness perfil research | ~6% | 100% |
| Tesis (Línea 0) | Defendida 20-Abr-2026; en pipeline de titulación | Publicada en JAAD International |
| RENACYT | Sin registro (0 pts) | Nivel VII → VI → V |
| Próximo cuello de botella declarado | **PERU-ACNE — manuscript revision** (el más urgente) | — |
| ENCAPS (congreso) | Presentación 10-Ago-2026 | Pósters/charlas |

**Cuello de botella estructural #1 (de los chats):** *no es escribir* — es **conseguir un dermatólogo-mentor con quien co-publicar y acceso a casos**. Tarea de máxima prioridad desde la semana 1. (El Dr. Ciro Rodríguez es el ancla nacional; los internacionales — Finlay, Cotofana — son los multiplicadores.)

**Pipeline administrativo de titulación (Línea 0):** repositorio institucional (solicitud de URL + Ficha Metadato UNCP). Campos manuales pendientes: **DNI del asesor, ORCID del asesor, % de similitud Turnitin**. Verificar que el **título exacto** y los **jurados titulares** coincidan con el **Acta de Sustentación** para evitar demoras SUNEDU; confirmar estatus titular vs. alterno de **Aranda Huincho Edgar**.

---

## 4. EL MOTOR DE PUBLICACIÓN

### 4.1 Tipos de output (de más rápido/seguro a más lento/valioso)
1. **Letter to the editor / Clinical image / Case report** — bajo, PubMed-indexed, sin ética compleja. Mix realista: **4–8** estos primeros, "ALTA" prioridad inicial para arrancar el contador de PIPs.
2. **Revisión sistemática (SR) / meta-análisis** — **no requiere comité de ética**; ejecutable con datos públicos; ángulo latinoamericano = novedad real. **Camino más rápido a Tier 1–2.**
3. **Estudio de validación** (p. ej., CADI español peruano) — psicométrico, mediano esfuerzo, alto valor.
4. **Original research** (cohortes, transversales, registros) — el de mayor peso para el CV (primer autor), pero requiere ética + datos primarios + tiempo.

### 4.2 Requisitos editoriales no negociables para SR (checklist anti-desk-rejection)
1. **PROSPERO** registrado (número CRD) **antes** de la búsqueda (gratis, york.ac.uk/prospero, 2–4 semanas).
2. **PRISMA 2020** (checklist 27 ítems + diagrama de flujo identificación→screening→elegibilidad→inclusión) como *supplementary*.
3. **GRADE** (certeza de evidencia por outcome; GRADEpro online, gratis) — obligatorio Tier 1–2.
4. **Kappa interobservador** reportado (decisión incluir/excluir; dos revisores; con IC 95% en JEADV).
5. **≥3–5 bases de datos**: PubMed/MEDLINE (Entrez API) + Embase (Europe PMC) + Cochrane CENTRAL + **LILACS/BVS** (ventaja LATAM) + OpenAlex (API). 5 fuentes ≈ 97% sensibilidad = estándar JEADV.
6. **Forest plot + funnel plot** (si meta-análisis).
7. **Ethics statement:** "No ethical approval required for systematic review."
8. **Inglés académico pulido** (edición profesional si no nativo — aceptación 2× mayor).

### 4.3 Herramientas para SR (gratis / open-access, 2026)
- **Screening:** **Rayyan** (free; PRISMA diagrams, dedup, AI relevance ratings) o **ASReview** (open-source, gratis). Covidence si la institución lo provee.
- **Extracción/síntesis:** **Elicit** (resúmenes + extracción), Atlas (síntesis con cita a PDF).
- **Meta-análisis:** **R (metafor/meta)** o **Python (PythonMeta / statsmodels)**; RevMan para Cochrane.
- **Gestión de referencias:** **Zotero** (gratis).
- **Principio HITL:** estas herramientas aceleran screening/extracción pero **el juicio humano sigue siendo esencial** en diseño de protocolo, decisiones de inclusión, evaluación de calidad. Esto es exactamente el modelo de checkpoints del sistema agéntico (§7).

### 4.4 RENACYT (CONCYTEC — registro Carlos Monge Medrano, salud)
- Sistema por **acumulación de puntaje en ventana de 10 años**; premia **primer autor** mucho más que co-autor (1 Q1 primer autor ≈ co-autor en 8 Q1).
- Tesis publicada en JAAD International (primer autor, ~Q2–Q3) → entrada directa a **Nivel VII**; con 2–3 indexadas primer autor → **Nivel VI**.
- **Dato palanca:** dirección de tesis de maestría = 2 pts c/u (útil en residencia, co-dirigiendo TFM). 3 artículos Q2 (6 pts) + 2 direcciones de maestría (4 pts) → **Nivel V**.

### 4.5 Revistas objetivo (tiers) y regla APC/LMIC
| Tier | Revista | IF aprox. | Notas |
|------|---------|-----------|-------|
| **1** | **JAAD** | ~11.8 | Familia AAD, SR completas |
| **1** | **JAMA Dermatology** | ~10.9 | Alta selectividad |
| **1** | **British Journal of Dermatology (BJD)** | ~9.0 | |
| **2** | **JAAD International** | ~5.2 | **Objetivo tesis**; APC con waiver LMIC; Editorial Manager; decisión 3–5 sem |
| **2** | **Dermatologic Surgery** | ~4.5 | **Objetivo Línea 1 (anatomía/seguridad)** |
| **2** | **JEADV** | ~ alto | ScholarOne; decisión 8–12 sem; GRADE obligatorio; Kappa+IC95% |
| **2** | **Int. J. Dermatology** | ~4.5 | Más accesible |
| **2** | **J. Dermatological Treatment** | ~4.5 | Accesible |
| **3** | **Journal of Cosmetic Dermatology** | ~ | **Objetivo Líneas 2/3 Fase 1** |
| **3** | **Aesthetic Surgery Journal** | ~4.5 | **Objetivo Líneas 3/4 Fase 2** |
| **3** | **Skin Health & Disease** | ~3 | Diamond OA (sin APC), EADV |
| **3** | **Actas Dermosifiliográficas** | ~3 | Español/inglés — estratégica para MIR |
| — | **Value in Health** | — | **Objetivo Línea 6 Fase 3 (economía de salud)** |
| — | **Plastic & Reconstructive Surgery (PRS)** | alto | Anatomía vascular avanzada (Línea 1 Fase 2) |

**Regla APC:** Perú = LMIC (Banco Mundial) → tras aceptación, solicitar **waiver** a la editorial citando clasificación LMIC (reducción 50–100%). Alternativa: revistas Diamond OA sin APC (Skin Health & Disease).

---

## 5. LÍNEAS DE INVESTIGACIÓN (0–8)

> Cada línea es un **silo de contexto**. Énfasis del programa: **dermatología estética estructural** = Líneas 1, 2, 3, 4 y 7. Formato uniforme para que el sistema agéntico lo consuma.

### LÍNEA 0 — Tesis Acné & Calidad de Vida (COMPLETADA · fundación)
- **Título:** *Asociación entre severidad del acné vulgar (IGA) y calidad de vida (CADI) en estudiantes adolescentes mujeres, I.E. Nuestra Señora de Cocharcas, Huancayo, 2026.*
- **Variables:** IGA (ordinal 0–4) × CADI (ordinal 0–15).
- **Diseño:** censal con criterio de inclusión (acné IGA ≥1); mujeres adolescentes.
- **Resultados clave:** n censal = 865; n analítico = **316** casos confirmados; **Spearman rs = 0.637** (p<.001; IC95% bootstrap [0.563, 0.699]); **κ ponderado = 0.8125**; prevalencia **39.8%**; **70.6%** impacto moderado-severo en QoL.
- **Salida:** publicar en **JAAD International** (primer autor; envío Jun–Jul 2026; waiver LMIC).
- **Estado:** defendida; pipeline de titulación.
- **SR derivable:** "Instrumentos de QoL en acné (CADI/DLQI) en LMIC" → alimenta Línea 6.

### LÍNEA 1 — Topografía & Vascularización facial *(ESTÉTICA ESTRUCTURAL · núcleo de seguridad)*
- **Gap:** anatomía vascular facial casi 100% en especímenes caucásicos; **cero estudios indexados** de topografía de arteria facial en población peruana/latinoamericana.
- **Pregunta:** variaciones de la arteria facial (y vasos asociados) en peruanos vs. atlas internacionales, **enmarcado en seguridad de inyección** (esto lo lleva a *Dermatologic Surgery*, no a una revista de anatomía regional).
- **Método:** **Doppler ultrasound** ambulatorio; estandarización de landmarks; fiabilidad interobservador; clasificación por morfotipo.
- **Fases:** Protocolo + ética + piloto n=10 (May–Dic 2026) → colección n=60–80 + análisis (2027) → manuscrito (2028).
- **Revistas:** **Dermatologic Surgery / PRS**.
- **Literatura fundacional:** Cotofana et al. 2017 (PRS, baseline vascular) [KEY]; Pilsl & Anderhuber 2016 (Dermatol Surg, mapeo arteria facial); Rohrich & Pessa 2007 (PRS, compartimentos grasos); DeLorenzi 2014 (ASJ, racional de seguridad vascular).
- **Colaboradores:** **Sebastian Cotofana** (vínculo Mayo/Vanderbilt/Erasmus — *puente clave*), **Konstantin Frank** (LMU Munich); local: depto. de anatomía UNMSM/UPCH, radiología vascular/ecografía, medicina forense (Fase 2).
- **Mayo score:** 33/40. **Cuello de botella:** protocolo *publication-ready* aún no escrito (prerrequisito de ética + acceso a ecógrafo).
- **SR derivable:** "Variabilidad de la arteria facial y zonas de peligro para fillers — revisión sistemática" (alto valor, sin datos primarios).

### LÍNEA 2 — Análisis facial & Envejecimiento *(ESTÉTICA ESTRUCTURAL)*
- **Gap:** todo el marco de envejecimiento facial (deflación de compartimentos grasos, laxitud de ligamentos, resorción ósea) se construyó en poblaciones caucásicas; **adultos mestizos peruanos ausentes** de la literatura indexada; **MD Codes (de Maio) no validados** en morfotipos latinos.
- **Pregunta primaria:** patrones predominantes de deflación de compartimentos grasos y ptosis de tejidos blandos en peruanos 35–65 y diferencias vs. referencia caucásica. Secundarias: rasgos que más correlacionan con preocupación estética percibida; morfotipo (euri/lepto/mesoprosópico) → secuencia de envejecimiento.
- **Diseño:** **Fase 1 (2026–2028)** transversal fotográfico n=120 (40/década) — fotografía 5 vistas estandarizada + grading de compartimentos grasos de Rohrich (0–3) + escalas NLF/Marionette/Jowl + mapeo MD Codes + FACE-Q PRO; stats: descriptiva, χ², Kappa, Spearman, regresión logística. **Fase 2 (2029–2030)** TC esquelética retrospectiva n=80 (apertura orbitaria, ancho piriforme, ángulo maxilar anterior, altura mandibular) vs. valores de referencia Mendelson & Shaw.
- **Revistas:** **Journal of Cosmetic Dermatology / JAAD International**.
- **Literatura fundacional:** Rohrich & Pessa 2007 (compartimentos grasos); Furnas 1989 (ligamentos de retención/ptosis); Mendelson & Wong 2012 (atlas de resorción esquelética); de Maio 2021 (MD Codes); Shaw et al. 2011 (resorción ósea cuantitativa).
- **Colaboradores:** **Mauricio de Maio** (São Paulo, MD Codes — más cercano geográficamente), **André Braz** (São Paulo, perspectiva latina, autor Thieme Atlas), **Rod J. Rohrich** (UT Southwestern); local: cirujanos plásticos INEN/Rebagliati, antropología UNMSM.
- **Mayo score:** 33/40. **Cuello de botella:** institución de ética no definida; protocolo fotográfico no fijado.
- **SR derivable:** "Patrones de envejecimiento facial en poblaciones no caucásicas — revisión sistemática" (gap latino real).

### LÍNEA 3 — Inyectables & Reología *(ESTÉTICA ESTRUCTURAL)*
- **Pregunta núcleo:** *"¿Usamos el producto correcto en el plano correcto para pacientes latinoamericanos — o seguimos a ciegas protocolos diseñados para piel europea?"*
- **Primaria:** HA **alta G-Prime vs. baja G-Prime** en aumento malar → satisfacción, longevidad, complicaciones en adultos peruanos a 12 meses. Secundarias: longevidad de HA por zona vs. referencia caucásica; fototipo Fitzpatrick → longevidad; aguja vs. cánula (tasa de eventos adversos en entorno latino).
- **Diseño:** **Fase 1** cohorte prospectiva comparativa n=60 (30 alta / 30 baja G-Prime; p. ej., Voluma vs. Ultra), assessor-blinded, mismo inyector (Joseph). Outcomes: **GAIS** a 1/3/6/12 m (primario), FACE-Q, longevidad, log de eventos adversos, ecografía opcional. Stats: Mann-Whitney U, **Kaplan-Meier + log-rank** (longevidad), modelo mixto (GAIS repetido), χ² (eventos). Python (scipy + **lifelines**). **Fase 2** registro multicéntrico prospectivo n=200 (3–5 clínicas Lima+Huancayo, 6 zonas faciales, 18 m).
- **Revistas:** Fase 1 → **Journal of Cosmetic Dermatology**; Fase 2 → **Aesthetic Surgery Journal / JAAD**.
- **Mayo score:** 34/40. **Cuello de botella:** ausencia de datos reales de enrolamiento (requiere flujo clínico — sinergia con **Bioclinic**).
- **SR derivable:** "Reología de fillers (G-Prime) y outcomes por zona — meta-análisis."

### LÍNEA 4 — Complicaciones & Seguridad de inyectables · Registro PERÚ-SAFE *(ESTÉTICA ESTRUCTURAL · prioridad Mayo más alta — score 38/40)*
- **Gaps:** sin registro sistemático de complicaciones por inyectables en Perú/LATAM; protocolos de manejo no estandarizados; tiempo-a-tratamiento en oclusión vascular nunca documentado en la región; **disponibilidad de hialuronidasa** en clínicas peruanas desconocida; correlación nivel de entrenamiento vs. tasa de complicaciones sin datos.
- **Diseño:** **Fase 1 — PERÚ-SAFE Registry**: registro prospectivo multicéntrico, 5–10 clínicas, 24 meses; módulos (practicante, procedimiento, complicación, seguimiento); inicio Ago-2026. **Fase 2 — Survey** online n=500 practicantes (disponibilidad hialuronidasa, protocolos de emergencia, conocimiento de oclusión vascular); inicio Abr-2026 (puede arrancar ya).
- **Revistas:** **JAAD / BJD / Int. J. Dermatology / Aesthetic Surgery Journal**.
- **Literatura fundacional:** DeLorenzi 2014 (manejo de complicaciones vasculares); guías de manejo de oclusión vascular e hialuronidasa; literatura de ceguera por filler.
- **Mayo score:** **38/40** (la más alta) — seguridad del paciente es el ángulo de mayor impacto y el más "Mayo".
- **Cuello de botella:** la **Fase 2 (survey)** es lo accionable inmediato y no requiere datos clínicos primarios.
- **SR derivable:** "Complicaciones vasculares de rellenos faciales y su manejo — revisión sistemática + meta-análisis de tiempo-a-tratamiento."

### LÍNEA 5 — Dispositivos basados en energía en fototipos IV–V
- **Foco:** protocolos de **RF microneedling fraccional ± PRP** y **CO₂ fraccional** en fototipos IV–V (poco estudiados, alta heterogeneidad → ideal para SR con subgrupo por fototipo).
- **Fases:** **Fase 3 — Survey** puede empezar de inmediato; fases clínicas dependen de acceso a dispositivos (vía clínica en Lima).
- **Revistas:** Tier 2–3 dermatología/láser.
- **Cuello de botella:** acceso a dispositivos.
- **SR derivable (PRIORITARIA):** "RF fraccional/CO₂ en piel de color (Fitzpatrick IV–VI): eficacia y seguridad — revisión sistemática y meta-análisis con subgrupo por fototipo." (gap real, $0, alto valor.)

### LÍNEA 6 — Acné & Calidad de Vida (programa nacional · evolución de Línea 0)
- **Idioma:** 100% inglés. **Fase 1 — Validación CADI** (español peruano) n=130 (30 debriefing cognitivo + 100 psicométrico); métricas Cronbach α≥0.70, ICC≥0.75, validez convergente vs. DLQI; protocolo **Guillemin et al. 1993**; **acción crítica: email a Prof. Andrew Finlay** (Cardiff, creador CADI/DLQI) por permiso + co-autoría → acceso casi directo a Tier 1; revista **J. Dermatological Treatment / JEADV**; May–Ago 2026.
- **Fase 2 — Multicéntrico PERU-ACNE** (2027–2028) transversal n=800–1000, 8–10 escuelas (Lima, Arequipa, Trujillo, Cusco, Huancayo, Piura); IGA + CADI validado + PHQ-9 + GAD-7 + socioeconómica; Spearman + regresión múltiple + **SEM** (semopy) + subgrupos por sexo/región; **JAAD International / BJD**.
- **Fase 3 — Carga económica** (2028–2029) n=400 + EQ-5D-5L; costos de bolsillo, acceso, ausentismo, disposición a pagar; **Value in Health / J. Dermatological Treatment**.
- **Mayo score:** 35/40. **Cuello de botella:** **contacto con Finlay no iniciado** — bloquea toda la línea.
- **SR derivable:** la propia validación + SR de instrumentos QoL en acné LMIC.

### LÍNEA 7 — Toxina botulínica
- **Diseños:** masetero (bruxismo/contorno) y frontalis; ecografía; hiperhidrosis + QoL (ángulo latino vía Hexsel).
- **Literatura:** Carruthers & Carruthers 1992; Carruthers 2003 (JAAD RCT pivotal); Kim 2010 / Park 2021 (Derm Surg, masetero + ecografía); Choe 2005 (dosis-respuesta); Naumann 2013 (BJD, SR hiperhidrosis); Hexsel 2013 (JAAD, QoL hiperhidrosis brasileña); Cotofana 2021 (PRS, frontalis); de Maio 2017 (PRS, MD Codes BTX).
- **Colaboradores:** **Doris Hexsel** (Porto Alegre — más accesible en LATAM), **Ki-Young Park** (Seúl, masetero+ecografía), **Cotofana** (frontalis).
- **Mayo score:** 34/40.
- **SR derivable:** "BTX en masetero: dosis, técnica ecoguiada y outcomes — meta-análisis."

### LÍNEA 8 — Teledermatología & IA
- **Pipeline (2027–2030):** dataset **PERU-SKIN** (fotos estandarizadas) → modelos **CNN** (clasificación IGA/lesiones) → ensayo clínico → economía de salud.
- **Stack:** PyTorch + **Grad-CAM** + Google Colab.
- **Colaboradores:** **Roxana Daneshjou** (Stanford), **Veronica Rotemberg** (MSK).
- **Cuello de botella:** aprobación ética para colección estandarizada de imágenes.
- **SR derivable:** "Deep learning para clasificación de acné/lesiones cutáneas en piel de color — revisión sistemática."

### 5.bis Mapa de interconexiones (para el grafo de la app)
```
L0 (tesis) ──► L6 (programa nacional QoL)
L1 (vascular) ──► L3 (planos seguros) ──► L4 (complicaciones)
L2 (envejecimiento) ──► L3 (selección de producto por compartimento)
L7 (BTX) ──► L3 (combinación BTX+filler) ──► L4 (módulo de complicaciones BTX)
L1/L2/L3 (fotos+anatomía) ──► L8 (training data ML)
TODAS ──► registro de seguridad y autoridad clínica de BIOCLINIC
```

---

## 6. REFERENTES, RECURSOS Y TÉCNICAS (investigado)

### 6.1 Referentes humanos (autoridades y por qué importan)
| Persona | Dominio | Valor estratégico | Contacto/Vía |
|---------|---------|-------------------|--------------|
| **Prof. Andrew Finlay** (Cardiff) | CADI / DLQI | Creador del instrumento → permiso + co-autoría = Tier 1 casi garantizado | email institucional Cardiff (Línea 6) |
| **Sebastian Cotofana** | Anatomía facial / inyección | "Gold standard" mundial; **vínculo con Mayo Clinic**; puente académico ideal | LinkedIn; cursos Cotofana Anatomy |
| **Mauricio de Maio** (São Paulo) | MD Codes / fillers | Marco de tratamiento; geográficamente cercano | Instituto MD Codes |
| **André Braz** (São Paulo) | Estética latina / atlas | Perspectiva mestiza; autor Thieme | — |
| **Rod J. Rohrich** (UT Southwestern) | Compartimentos grasos | Marco fundacional de Línea 2 | — |
| **Doris Hexsel** (Porto Alegre) | BTX / QoL | La más accesible en LATAM | — |
| **Alexander Meves** (Mayo Clinic) | Dermatología/biomarcadores | Contacto directo en Mayo | — |
| **Alexa Kimball** (Harvard) | Carga psicosocial | Línea 6 | — |
| **Jerry Tan** (Western Univ.) | Epidemiología acné / IGA | Línea 6 | — |
| **Roxana Daneshjou** (Stanford) / **Veronica Rotemberg** (MSK) | IA en dermatología | Línea 8 | — |
| **Konstantin Frank** (LMU) | Anatomía vascular | Línea 1 | — |
| **Dr. Ciro Rodríguez** (Huancayo) | Dermatología clínica | **Co-autor ancla nacional**, Gold Standard IGA | local |
| **María Elena Morán** (Lima) | Dermatología | Red nacional | local |

### 6.2 Recursos de formación verificados (estética estructural / inyectables)
- **Cotofana Anatomy** (`cotofanaanatomy.com`) — cursos online por suscripción: *Foundational Knowledge for New Injectors*, *Upper Face*, *Aesthetic Principles*; disecciones en cadáver, anatomía por capas, vasos y zonas de riesgo, biomecánica de inyección. Considerado "gold standard" por dermatólogos y cirujanos oculoplásticos.
- **ASDS — Facial Anatomy for Cosmetic Injections** (`asds.pathlms.com`) — lecturas + disecciones grabadas (Cotofana, Biesman, Green, Mandy); técnica, seguridad y outcomes para filler/neuromodulador/biostimulador.
- **Cadaver workshops** (Empire Medical Training, N2 Aesthetics, etc.) — disección en cadáver fresco + ecografía + inyección en vivo; manejo de complicaciones.
- **YouTube / video educativo:** canales y recopilaciones de **Prof. Cotofana** (revisiones de anatomía del tercio medio: línea de ligamentos, movilidad activa/pasiva, "domino effect"); contenidos de **MD Codes / de Maio**; **Doris Day**, **Heidi Waldorf** (revisiones clínicas). *El sistema agéntico (§7) debe mantener una lista curada y verificable de URLs reales en la base de datos `resources`, no inventarlas.*
- **Atlas/libros:** Thieme *Atlas of Facial Anatomy* (Braz/colaboradores); textos de compartimentos grasos (Rohrich & Pessa) y resorción esquelética (Mendelson & Wong).

### 6.3 Técnicas y métodos clave (por clúster)
- **Anatomía/seguridad:** ecografía Doppler de alta frecuencia para mapeo vascular y planificación de planos; landmarks estandarizados; clasificación de morfotipo.
- **Fillers:** estratificación por **G-Prime** (alta para hueso/estructura profunda, baja para tejido superficial); aguja vs. cánula; aspiración; conocimiento de zonas de peligro (glabela, nariz, surco nasolabial) y protocolo de **hialuronidasa** ante oclusión.
- **Outcomes estéticos:** **GAIS**, **FACE-Q** (licencia académica gratis, face-q.com), escalas de Rohrich/NLF/Marionette/Jowl.
- **Estadística:** Spearman (ordinal), Mann-Whitney U, Kaplan-Meier/log-rank, modelos mixtos, SEM (semopy), Kappa ponderado, bootstrap; Python (scipy, statsmodels, lifelines, pandas, seaborn).
- **SR/MA:** PROSPERO, PRISMA 2020, GRADE, Rayyan/ASReview, R metafor / PythonMeta, forest/funnel plots TIFF 300 dpi.

---

## 7. ARQUITECTURA DEL SISTEMA AGÉNTICO

> **Patrón base: Orchestrator-Worker con Human-in-the-Loop (HITL).** Un **agente orquestador (Lead)** planifica y delega en **subagentes especializados** que corren en **contextos aislados**, cada uno produce una sección, y un **agente de QA/citación** verifica antes de que el resultado llegue al **checkpoint humano**. Joseph **solo verifica el Word final**. (Este patrón — un líder que planifica, 3–5 subagentes en paralelo con ventana de contexto propia, más un paso separado de citación — es el que usa el sistema de investigación multi-agente de Anthropic y rinde ~90% mejor que un agente único en tareas de amplitud; el costo es ~15× tokens, por eso se reserva para tareas que lo justifican.)

### 7.1 Capas del sistema
```
┌──────────────────────────────────────────────────────────────┐
│ CAPA 0 — DESCUBRIMIENTO 24/7 (sin costo de tokens premium)     │
│  n8n (cron) → APIs: OpenAlex + PubMed/Entrez + LILACS/BVS      │
│  → Ollama Phi-4 Mini (screening barato/local) → Supabase       │
│  → Telegram (@TesisAcneBot): "nuevo paper relevante? sí/no"    │
├──────────────────────────────────────────────────────────────┤
│ CAPA 1 — ORQUESTADOR (Lead Agent · Claude Opus)                │
│  Recibe: "Avanza Línea X, Fase Y, output Z (SR/original/letter)"│
│  Hace: plan → descompone en tareas → delega → integra → QA      │
│  Memoria persistente del plan en Supabase (evita context rot)   │
├──────────────────────────────────────────────────────────────┤
│ CAPA 2 — SUBAGENTES (Workers · Claude Sonnet, contexto aislado)│
│  • Intro/Background     • Methods       • Results/Stats         │
│  • Discussion           • References    • (Cover letter)        │
│  No se comunican entre sí; cada uno recibe tarea + formato +   │
│  fuentes y devuelve su sección condensada                       │
├──────────────────────────────────────────────────────────────┤
│ CAPA 3 — QA / CITACIÓN (Agent · Claude)                        │
│  Verifica: PRISMA/estructura-de-argumento, citas reales (no    │
│  alucinadas), Turnitin/paráfrasis, cadena estadística, formato │
│  → ensambla .docx (python-docx) respetando lección TOC §2.5    │
├──────────────────────────────────────────────────────────────┤
│ CAPA 4 — CHECKPOINT HUMANO (HITL · obligatorio)                │
│  Joseph abre el Word, verifica, aprueba/rechaza/edita.         │
│  Nada avanza sin su aprobación. La app marca el checkpoint.    │
└──────────────────────────────────────────────────────────────┘
```

### 7.2 Especificación de roles (prompts base — en inglés)
**Orquestador (Lead):**
> *You are the Lead Research Agent for the PERU-ACNE → Mayo program. You never write sections yourself. Given a task (Line, Phase, output type), you: (1) write an explicit plan to memory; (2) decompose it into independent subagent tasks, each with a self-contained brief, required sources, and output format; (3) dispatch workers; (4) integrate returns; (5) route to QA. Enforce the Mayo filter (≥32/40) and the argument-structure standard. Respect line silos. Set an explicit budget (max subagents, max tool calls).*

**Subagente Methods (ejemplo):**
> *Write ONLY the Methods section for [Line X / output Z]. Use PRISMA 2020 for SR. State design + sample + setting + instruments + statistical plan with the program's stat chain (Shapiro-Wilk → Spearman; weighted Kappa κ>0.80; bootstrap CI). Output in English, journal format [target]. Do not invent citations; flag any factual gap as [VERIFY].*

**Subagente References:**
> *Build the reference list ONLY from sources present in the shared `papers` store (Supabase). Every reference must be a real, retrievable record (DOI/PMID). Mark unverifiable items [UNVERIFIED] — never fabricate.*

**Agente QA/Citación:**
> *Verify before human checkpoint: (a) every claim follows design+n+country+institution+year+author+journal; (b) ≥1 Peruvian study per argument or explicit "none exists"; (c) all citations resolve to real DOIs/PMIDs; (d) paraphrase originality (Turnitin-safe); (e) statistical chain coherent; (f) assemble .docx anchoring inserts AFTER the outermost Word TOC field. Produce a checklist report for the human.*

### 7.3 Pipeline de una Revisión Sistemática (caso de uso completo)
1. **Orquestador** registra el plan + objetivo PICO.
2. **Discovery (Capa 0)** corre la búsqueda en 5 fuentes → dedup → Supabase.
3. **Screening:** Phi-4/Rayyan pre-filtra; **dos "revisores"** (puede ser agente + humano, o dos pases) → **Kappa** calculado en Python; conflictos → checkpoint humano.
4. **Subagentes** redactan Intro/Methods(PRISMA)/Results(forest plot)/Discussion/References.
5. **QA** verifica PRISMA 27 ítems + GRADE + citas reales + Turnitin.
6. **Ensamblado** .docx + supplementary (checklist PRISMA, PROSPERO CRD).
7. **Checkpoint humano:** Joseph verifica el Word → aprueba → envío a revista (acción humana).

### 7.4 Infraestructura (ya en el stack del usuario)
- **n8n** (orquestación de workflows, cron 24/7) — VPS Hetzner CX32 (~$8/mes).
- **Supabase (PostgreSQL)** — base de papers, decisiones, estado de agentes/tareas.
- **Ollama + Phi-4 Mini** — screening repetitivo sin costo de API (local/Mac Mini M4 16GB).
- **OpenClaw** — interfaz proactiva (recepcionista) vía **Telegram** (bot oficial, sin riesgo de ban). *No hace el trabajo intelectual profundo — eso es Claude.* Empezar sin OpenClaw; añadirlo cuando el motor base funcione.
- **Claude (Max / API)** — orquestador + subagentes + QA (el trabajo intelectual).
- **Telegram (@TesisAcneBot)** — notificaciones + aprobaciones con botones.
- **python-docx / pptxgenjs** — generación de Word/PPT entregables.

---

## 8. ESPECIFICACIÓN DE LA WEB APP — sección `/research`

### 8.1 Objetivo de la sección
Visualizar **el programa** (líneas/papers/métricas) **y** operar **el sistema agéntico** (estado, cola, checkpoints) en un solo lugar, alineado con el dashboard actual ("PUBLICACIONES INDEXADAS PARA COMPETIR", "MAYO CLINIC TRACKER", "NEXT ACTION", "TARGET JOURNALS", "RUTA POR FASES").

### 8.2 Modelo de datos (Supabase — esquema sugerido)
```sql
-- Líneas de investigación
research_lines (
  id smallint PK,                 -- 0..8
  code text,                      -- 'L4'
  name text,                      -- 'Complicaciones / PERÚ-SAFE'
  cluster text,                   -- 'estetica_estructural' | 'acne_qol' | 'ia' ...
  mayo_score int,                 -- /40
  status text,                    -- 'completada'|'activa'|'pre-protocolo'|'bloqueada'
  bottleneck text,
  target_journals text[],
  collaborators text[]
)

-- Papers / outputs
papers (
  id uuid PK,
  line_id smallint FK,
  type text,                      -- 'original'|'SR'|'validation'|'letter'|'case'|'registry'
  title text,
  phase text,
  stage text,                     -- 'idea'|'protocol'|'data'|'writing'|'qa'|'review_human'|'submitted'|'published'
  target_journal text,
  prospero_crd text,              -- SR
  is_indexed boolean,             -- cuenta como PIP solo si true
  first_author boolean,
  submitted_at date, published_at date
)

-- Sistema agéntico
agents (id, role, model, status)                       -- lead/methods/refs/qa...
agent_tasks (id, paper_id, agent_id, section, state, output_url, created_at)
checkpoints (id, paper_id, type, status, opened_at, resolved_at, human_note)  -- HITL

-- Conocimiento
references_db (id, doi, pmid, authors, year, journal, line_id, verified boolean)
resources (id, kind, title, url, author, verified boolean)   -- cursos/YouTube/atlas
milestones (id, phase, year, label, metric_target, metric_value, done boolean)
```

### 8.3 Componentes/vistas a construir
1. **PIP Counter** (hero): nº de papers `is_indexed=true`; meta 3 (competir) / 8–15 (Mayo); barra de progreso de *readiness*.
2. **Mapa de líneas** (grafo §5.bis): nodos = líneas (color por cluster, tamaño por mayo_score), aristas = interconexiones; click → detalle de línea.
3. **Detalle de línea:** pregunta, gap, diseño/fases, revistas, colaboradores, literatura, cuello de botella, SR derivable.
4. **Pipeline Kanban de papers:** columnas = `stage`; tarjetas = papers; badge si requiere checkpoint humano.
5. **Consola de agentes:** lista de `agents` + `agent_tasks` en vivo (qué sección está redactando cada subagente), cola de Capa 0 (papers descubiertos a aprobar).
6. **Checkpoints HITL:** bandeja "Pendiente de tu verificación" → abre el `.docx`, botones Aprobar/Rechazar/Comentar (espejo del Telegram).
7. **Target Journals (tiers):** tabla §4.5 con IF y estado de envío.
8. **Roadmap (fases A–D):** timeline §9 con hitos y métricas por año.
9. **Knowledge base:** referentes (§6.1), recursos verificados (§6.2), técnicas (§6.3).
10. **Requisitos SR:** checklist §4.2 reutilizable como plantilla por SR.

### 8.4 Reglas de UI/UX
- Distinguir visualmente **PIP real** (verde, indexado verificado) de **en pipeline** (ámbar) y **bloqueado** (rojo, con cuello de botella visible).
- Cada línea muestra su **SR derivable** como acción de un click ("iniciar SR").
- Los checkpoints HITL deben ser **imposibles de saltar**: ningún paper pasa a `submitted` sin `checkpoint.status='approved'`.

---

## 9. ROADMAP TEMPORAL (fases A–D · sin agenda día-a-día)

**Ruta por fases (del dashboard): MIR → Mayo**, con el motor de publicación corriendo en paralelo.

| Año | Hitos académicos | Métrica objetivo |
|-----|------------------|------------------|
| **2026** | Defensa tesis (✓ 20-Abr) → envío JAAD International · ENCAPS (10-Ago) · **email Finlay** · **survey Línea 4** · arrancar **1–2 SR** ($0): Línea 4 (complicaciones) y/o Línea 5 (RF fototipos IV–V) · protocolos Líneas 1–3 · iniciar **USMLE Step 1** (si Fork A) | 1 paper enviado · 1–2 SR registradas en PROSPERO · RENACYT VII en mira |
| **2027–2029** | Ejecutar SR + validación CADI (Línea 6 Fase 1) + cohortes piloto (L1/L2/L3) · MIR (si Fork C) · **RENACYT VI → V** | **2–3 SR publicadas** + 1–2 originales · primer autor |
| **2030** | (Fork A) Match residencia derm EE.UU. / (Fork C) residencia MIR Clínic · USMLE Step 2 | CV con 4–6 PIPs |
| **2030–2035** | Residencia + **6–8 publicaciones PubMed como primer autor** · research elective + LOR de dermatólogo · colaboraciones Mayo (Cotofana/Meves) | 8–15 PIPs (nivel Mayo) |
| **2035–2037** | **Fellowship Mayo** (clínico vía Fork A, o research vía Fork B) | — |
| **2037+** | Práctica académica + **Bioclinic Dermatología** (clínica propia, modelo replicable) | autoridad clínica + negocio |

**Secuencia de máxima palanca (ahora):** (1) mentor + acceso a casos; (2) email Finlay (desbloquea L6); (3) survey L4 (arranca sin datos clínicos); (4) 1–2 SR de gap latino (arranca PIPs sin ética); (5) publicar la tesis.

---

## 10. IDENTIFICADORES, CONTACTOS Y STACK

**Identidad académica:** Joseph Max Soto Tocas · Bachiller en Medicina, FMH-UNCP (Huancayo). Código 2017200739H · email institucional `e_2017200739H@uncp.edu.pe`.
**Asesor/ancla:** Dr. Ciro Jesús Rodríguez Aliaga (dermatólogo, Hospital Regional Daniel Alcides Carrión).
**FMH UNCP:** Decano Dr. Milton Antonio Tello Cruz · Dir. Investigación Dra. Ana Cecilia Ho Palma · Secretaría `medicinahumana@uncp.edu.pe`.
**Internacionales clave:** Finlay (Cardiff), Cotofana, de Maio, Braz, Rohrich, Hexsel, Meves (Mayo), Kimball (Harvard), Tan (Western), Daneshjou (Stanford), Rotemberg (MSK), Frank (LMU).
**Stack:** Python (scipy/pandas/seaborn/matplotlib/statsmodels/lifelines/semopy) en Cursor; scripts `D:\motor_apex\`; Supabase; n8n; OpenClaw; Ollama Phi-4 Mini; Claude Max/API; Telegram @TesisAcneBot; python-docx/pptxgenjs. Hardware objetivo: Mac Mini M4 16GB. Infra: VPS Hetzner CX32 (~$8/mes).

---

## 11. RIESGOS Y DECISIONES ABIERTAS (a confirmar por Joseph)

1. **Naturaleza del objetivo Mayo:** ¿Fork A (clínico, exige USMLE Step 1+2 + ECFMG + Match — vía costosa y muy competitiva para IMG) o Fork B (research/observership vía CV + colaboradores)? **Esto reordena la prioridad USMLE vs. publicaciones.**
2. **"Bioclinic Dermatología":** confirmar **año meta exacto** y si es clínica única o modelo de franquicia (sección Business de la app sugiere "Franquicias"). *No estaba fijado explícitamente en los chats; aquí se asumió ~2037+ como destino post-formación.*
3. **Número exacto de revisiones sistemáticas "establecidas":** este documento fija **mínimo 3** (una por clúster) con stretch 5–6. Confirmar el número objetivo real.
4. **MIR vs. USMLE como vía principal:** si el destino es el fellowship clínico de Mayo, MIR no lo habilita directamente; decidir si MIR es para carrera europea + Bioclinic (Fork C) o si se va por la vía ACGME (Fork A).
5. **Mentor dermatólogo internacional:** cuello de botella #1; sin co-autor con acceso a casos, las líneas clínicas (1–5, 7) se ralentizan. Cotofana (vínculo Mayo) es el objetivo de mayor valor doble.
6. **Costo del sistema agéntico full:** el patrón multi-agente cuesta ~15× tokens; reservarlo para SR/originales de alto valor; usar Phi-4 local para screening repetitivo.

---

### REFERENCIAS DE LA INVESTIGACIÓN (fuentes web consultadas, 10-Jun-2026)
- Mayo Clinic College of Medicine & Science — Dermatology Residency/Fellowship (MN/FL): requisitos ACGME, ERAS/NRMP, ECFMG/USMLE para IMG.
- Anthropic / análisis técnicos — patrón orchestrator-worker, subagentes en contexto aislado, paso de citación, ~90% mejora vs. agente único, ~15× tokens.
- Guías 2026 de herramientas de SR con IA — Rayyan, ASReview, Covidence, Elicit; checkpoints HITL (suspend/resume) en validación de protocolo, conflictos de screening, sesgo.
- Cotofana Anatomy (cotofanaanatomy.com), ASDS *Facial Anatomy for Cosmetic Injections* — referentes y cursos verificados de anatomía/inyección.

*Las citas científicas por línea (Cotofana 2017, Rohrich & Pessa 2007, Mendelson & Wong 2012, de Maio 2021, Guillemin 1993, DeLorenzi 2014, Carruthers 2003, Naumann 2013, Hexsel 2013, etc.) deben verificarse contra DOI/PMID por el agente de References antes de cualquier envío.*

---
---

## 12. APÉNDICE · DATA VERIFICADA (jun-2026) — corrige y amplía §1, §4, §7

> Investigación verificada (workflow de 16 agentes · 352 búsquedas web · fuentes con URL).
> Los bloques completos viven en `DATA/RESEARCH/`: [`journals.md`](DATA/RESEARCH/journals.md),
> [`benchmarks.md`](DATA/RESEARCH/benchmarks.md), [`systematic-reviews.md`](DATA/RESEARCH/systematic-reviews.md),
> [`agentic-system.md`](DATA/RESEARCH/agentic-system.md), fuentes en [`_raw_findings.json`](DATA/RESEARCH/_raw_findings.json).

### 12.1 CORRECCIÓN de revistas (§4.5 tenía IFs falsos de Scopus) — JCR 2024 Clarivate
Los "IF bajos" que circulan en agregadores (Resurchify/exaly) NO son el JIF de Clarivate. Reales:

| Revista | IF real (JCR 2024) | §4.5 decía | Acceso real |
|---------|--------------------|------------|-------------|
| JAAD | **11.8** (#1) | 11.8 ✓ | Híbrida → **$0 por vía suscripción** |
| JAMA Dermatology | **11.0** | 10.9 | Híbrida; Perú no califica a waiver 100% |
| British J. Dermatology | **9.6** | 9.0 | Híbrida |
| JEADV | **8.0** | "alto" | Híbrida |
| JID | **5.7** | — | Híbrida |
| JAAD International | **5.2** | 5.2 ✓ | Fully-OA → Perú **50%** (no waiver total) |
| Aesthetic Surgery Journal | **3.9** | 4.5 | es cirugía plástica, no derma |
| J. Cosmetic Dermatology | **2.5** | "~" | Q2; mejor encaje estético clínico |

### 12.2 CORRECCIÓN del modelo APC/LMIC (§4.5 "waiver 50–100%")
**Perú es upper-middle-income (Banco Mundial) y Grupo B de Research4Life → solo 50% de
descuento, NO waiver del 100%.** El descuento aplica **solo a revistas fully-OA, nunca a
híbridas**. Vías REALMENTE gratis ($0 al autor):
1. **Anais Brasileiros de Dermatologia** (Diamond OA, la SBD paga el APC de todos) — mejor opción gratis.
2. **Actas Dermo-Sifiliográficas** (Diamond OA, la AEDV paga el APC) — bilingüe ES/EN, estratégica para MIR.
3. **JAAD flagship por vía suscripción** ($0, máximo impacto sin pagar APC).
4. **JAAD Case Reports** ($750, o $0 vía suscripción del flagship).
5. **Dermatology Practical & Conceptual** (sin APC; solo 30 EUR de tasa de envío desde sep-2025).
> Re-verificar cada 1-jul (la clasificación Banco Mundial cambia anualmente).

### 12.3 CORRECCIÓN de la métrica meta (§1.2 "3 / 8–15 PIPs")
**No existe un "número de publicaciones requerido"** (ni Mayo ni el NRMP lo publican). Lo
real (NRMP *Charting Outcomes 2024*, verificado del PDF): los matcheados de derma promedian
**27.7 "abstracts/presentaciones/publicaciones"** (= pósters + charlas + manuscritos
agrupados, **NO 27 papers**). Para **IMG la N es diminuta**: Match 2026 → de **29 non-US-IMG
solo 4 matchearon** en derma (de 23 US-IMG, 9); la derma llena el **99.8%** de plazas.
- Requisitos IMG verificables: **ECFMG + USMLE Step 1 (pass/fail) + Step 2 CK (numérico, el que pesa)** + Step 3 para visa H-1B; ERAS + NRMP.
- **Vía realista:** **research fellow / observership en Mayo (NO requieren ACGME)** para construir el portfolio.
- **Objetivo estratégico honesto (no requisito):** **2–4 revisiones sistemáticas** dentro de un portfolio que apunte a ~15–28 abstracts/pubs. Las SR son el output más eficiente para un IMG (sin pacientes ni laboratorio).

### 12.4 Playbook SR + recursos y sistema agéntico (refinados)
- **Playbook de revisión sistemática paso a paso (PICO → PROSPERO → PRISMA 2020 → búsqueda
  N bases → screening → sesgo/GRADE → meta-análisis → manuscrito)** con herramientas 2026 y
  **lista de recursos YouTube/cursos reales** → [`DATA/RESEARCH/systematic-reviews.md`](DATA/RESEARCH/systematic-reviews.md).
- **Sistema agéntico refinado** (orquestador + subagentes por sección + QA de citas +
  ensamblado `.docx` con python-docx + checkpoints HITL), con prompts base por rol →
  [`DATA/RESEARCH/agentic-system.md`](DATA/RESEARCH/agentic-system.md).

---

*Fin del MD maestro v1.0 — Joseph MD · Bioclinic Research System. (Apéndice §12 verificado jun-2026.)*
