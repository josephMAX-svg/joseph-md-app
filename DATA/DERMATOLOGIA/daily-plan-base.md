# Plan de estudio de Dermatología tema-a-tema (estilo USMLE) con 3 fuentes

> **Ritmo:** INTERDIARIO. El bloque de boards 13:30–14:15 del Google Calendar **alterna Research↔Derma por día hábil** (par = Research, impar = Derma). Esto significa **~1 tema-átomo de Derma cada 2 días hábiles** (≈ 3 temas/semana de Derma). El plan de abajo es la *cola ordenada de temas-átomo*: avanzas un átomo cada día-Derma, no cada día natural.
>
> **Regla de oro:** solo data verificada. Lo no confirmable está marcado `(no verificado)`.

---

## 1. Las 3 fuentes y cuándo usar cada una

| Fuente | Qué es (verificado) | Navegador / acceso | Rol en el átomo del día |
|---|---|---|---|
| **AccessDermatologyDxRx** (`dermatology.mhmedical.com`) | Colección "Access" de McGraw Hill por suscripción: 20+ textos núcleo (Fitzpatrick's Dermatology 9e, Color Atlas & Synopsis 8e, Taylor & Kelly's Dermatology for Skin of Color, Barnhill's Dermatopathology 4e, Weinberg's Pediatric, LANGE Clinical Dermatology, libros de cirugía/suturas de Kantor) + multimedia (20.000+ imágenes/flashcards, 400+ videos de procedimientos) + Q&A de board review | **Logueado en Chrome.** Nota técnica: el dominio `mhmedical.com` devuelve **403 a fetch directo** → no scrapeable por API; se navega a mano | **Material primario de lectura** del átomo (texto + atlas de imágenes) |
| **Qbankly — Dermatología** (`qbankly.app`) | Plataforma con bancos de preguntas (uWorld/Amboss/PassMedicine/Mehlman/USMLERx) y video-libraries (B&B, Sketchy). Su contenido de Derma se distribuye dentro de los subjects de cada banco, **no** es un banco "solo-Derma" aislado `(no verificado que exista un módulo Derma independiente)` | **SOLO abre en Microsoft Edge.** Chrome con remote-debugging lo bloquea (Cloudflare). En la app los links Qbankly llevan botón **◆ Edge** (`microsoft-edge:<url>`) | **Capa de práctica (preguntas)** del átomo: pre-test 3Q + evaluación anclada 2Q |
| **ProMIR — Dermatología** (`promir.medicapanamericana.com`) | SPA de Médica Panamericana (carga por WebSocket/sockjs). Temario de 30 asignaturas con capítulos `/capitulo/<id>`; cada intro trae Peso MIR %, páginas, horas, Enfoque, subtemas top y videoclase-resumen | **Logueado en Chrome.** `(no verificado)` el peso MIR exacto de Dermatología ni sus capId — ProMIR-Derma aún **no** estaba en la tanda extraída (solo se verificaron Cardio/Digestivo con duraciones) | **Anclaje España / 2º pase en español**: estructura del capítulo + videoclase-resumen + enfoque de alto rendimiento |

**Cómo se reparten dentro de un mismo átomo (estilo Step 1 del usuario):**
- **Leer/entender el concepto →** AccessDermatology (Fitzpatrick texto + atlas de imágenes; Barnhill's si el átomo es dermatopatología).
- **Ver el patrón clínico/derm-path en imagen →** AccessDermatology (atlas, 20.000+ imágenes; es su mayor ventaja).
- **Practicar preguntas →** Qbankly (**en Edge**): pre-test 3Q al abrir el átomo + 2Q de evaluación anclada del átomo PREVIO.
- **Consolidar en español + ver qué prioriza el board europeo →** ProMIR (Enfoque + videoclase-resumen del capítulo equivalente).

---

## 2. Orden de temario (cola de temas-átomo, alto rendimiento primero)

Orden canónico tomado del best-seller **"Dermatology: Illustrated Study Guide and Comprehensive Board Review"** (Sima Jain, 2e, Springer 2017) — 11 capítulos, cada uno subdividido en sub-secciones atómicas (1.1, 1.2, …), que es exactamente el grano "1 tema/día". Reordenado para rendimiento: **basic science/inmuno primero** (base para BMZ, queratinas y bullosas), **medical dermatology amplio al final** por su solapamiento con el examen APPLIED.

> **Ponderación de referencia (verificada, ABD APPLIED, abderm.org):** Medical **55%** · Pediatric **15%** · Surgical **15%** · Dermatopathology **15%**. Esto justifica el peso de cada bloque abajo.

### Bloque A — Basic Science / Inmunología *(arranque, alto rendimiento)*
Base estructural que se reutiliza en todo lo demás (bullosas, genodermatosis, dermatopatología).
- A1 Embriología de la piel
- A2 Epidermis y queratinocitos
- A3 Membrana basal (BMZ) — anclaje para autoinmunes ampollares
- A4 Dermis, anejos y unión dermo-epidérmica
- A5 Melanocito y pigmentación
- A6 Inmunología cutánea (Th1/Th2, citoquinas, hipersensibilidades)
- A7 Biología molecular / genética básica (queratinas, colágenos)

**Fuentes:** lectura → AccessDermatology (Fitzpatrick, cap. de ciencia básica) · práctica → Qbankly (Edge) · ancla ES → ProMIR (intro de la asignatura).

### Bloque B — Genodermatosis / Pediátrica *(15% APPLIED)*
Se encadena con A3/A7 (BMZ + queratinas) mientras está fresco.
- B1 Ictiosis y trastornos de cornificación
- B2 Epidermólisis bullosa
- B3 Facomatosis (NF1, esclerosis tuberosa, Sturge-Weber)
- B4 Genodermatosis con riesgo tumoral (Gorlin, xeroderma pigmentoso, etc.)
- B5 Exantemas y dermatosis neonatales/pediátricas

**Fuentes:** lectura → AccessDermatology (**Weinberg's Pediatric** + Fitzpatrick) · imágenes → atlas Access · práctica → Qbankly (Edge).

### Bloque C — Enfermedades infecciosas
Alto rendimiento por volumen de preguntas y patrones visuales claros.
- C1 Infecciones bacterianas (impétigo, erisipela, SSSS, etc.)
- C2 Micobacterias (TB cutánea, lepra)
- C3 ITS con manifestación cutánea (sífilis y sus estadios)
- C4 Virales (HSV/VZV, verrugas/VPH, molusco, exantemas virales)
- C5 Micosis superficiales y profundas
- C6 Infestaciones / parasitosis (escabiosis, leishmaniasis)

**Fuentes:** lectura+imagen → AccessDermatology · práctica → Qbankly (Edge) · ancla ES → ProMIR (Enfoque infecciosas, muy rentable en MIR).

### Bloque D — Neoplasias / Tumores cutáneos *(núcleo del Medical + cruza Surgical y Path)*
- D1 Lesiones melanocíticas benignas y nevus
- D2 Melanoma (estadiaje, Breslow, factores pronósticos)
- D3 Carcinoma basocelular
- D4 Carcinoma espinocelular y precursores (queratosis actínica)
- D5 Tumores anexiales
- D6 Linfomas cutáneos (micosis fungoide, Sézary)
- D7 Tumores vasculares y de partes blandas

**Fuentes:** lectura → AccessDermatology (Fitzpatrick + Color Atlas) · dermatoscopia/derm-path → **Barnhill's Dermatopathology 4e** · práctica → Qbankly (Edge).

### Bloque E — Dermatopatología *(15% APPLIED — bloque transversal)*
- E1 Patrones de inflamación (liquenoide, espongiótico, psoriasiforme, vacuolar)
- E2 Enfermedades ampollares en biopsia (inmunofluorescencia)
- E3 Tumores en histología (correlación con Bloque D)
- E4 Depósitos e infiltrados

**Fuentes:** **Barnhill's Dermatopathology 4e** (texto) + **Barnhill's Dermatopathology Challenge: Self-Assessment & Review** (verificado: **400+ vignettes ilustradas tipo board**, con quizzes random/custom) → es tu **Q&A nativo de Access** para este bloque. Cifra agregada "700+ Q&As" aparece en fuentes secundarias `(no verificada en página oficial)`.

### Bloque F — Cirugía dermatológica *(15% APPLIED)*
- F1 Anatomía quirúrgica y zonas de peligro
- F2 Técnicas de cierre, colgajos e injertos
- F3 Suturas (tipos y manejo)
- F4 Cirugía de Mohs y márgenes
- F5 Complicaciones y manejo de heridas

**Fuentes:** AccessDermatology (libros de **cirugía dermatológica y Atlas of Suturing Techniques de Kantor** + **400+ videos de procedimientos** — aquí el video manda) · práctica → Qbankly (Edge).

### Bloque G — Farmacología dermatológica
- G1 Corticoides tópicos y sistémicos
- G2 Retinoides
- G3 Inmunosupresores / inmunomoduladores
- G4 Biológicos (anti-TNF, anti-IL-17/23, dupilumab)
- G5 Antifúngicos y antivirales sistémicos

**Fuentes:** AccessDermatology (Fitzpatrick + **Dermatologic Therapeutics: A Pocket Guide**) · práctica → Qbankly (Edge).

### Bloque H — Medical Dermatology amplio *(55% APPLIED — se deja para el final por solapamiento con el examen real)*
Es el bloque más grande; por eso va al cierre, cuando ya tienes base, imágenes y derm-path.
- H1 Eccemas y dermatitis (atópica, de contacto, seborreica)
- H2 Psoriasis y dermatosis papuloescamosas
- H3 Enfermedades ampollares autoinmunes (pénfigo, penfigoide) — apóyate en A3/E2
- H4 Conectivopatías (lupus, dermatomiositis, esclerodermia)
- H5 Vasculitis y paniculitis
- H6 Trastornos de pigmentación (vitíligo, melasma)
- H7 Pelo y uñas (alopecias)
- H8 Reacciones medicamentosas graves (SJS/TEN, DRESS)
- H9 Manifestaciones cutáneas de enfermedad sistémica
- H10 Dermatosis en piel de color (cruza con **Taylor & Kelly's Dermatology for Skin of Color**)

**Fuentes:** AccessDermatology (Fitzpatrick + **Taylor & Kelly's** para H10) · práctica intensiva → Qbankly (Edge) · 2º pase ES → ProMIR.

### Cierre — High-Yield / Buzz Words *(repaso final)*
- Capítulo "High-Yield Buzz Words" de Sima Jain → repaso de asociaciones clásicas antes del examen.
**Fuente:** AccessDermatology flashcards + tus propias APEX acumuladas.

---

## 3. Estructura del átomo diario (réplica del protocolo Step 1 ya en la app)

Mismo molde que `usmleStep1Daily.ts` / `UsmleTodayPlan`, adaptado a Derma. Cada **día-Derma** (recuerda: interdiario, alternando con Research):

1. **Evaluación Anclada del átomo PREVIO (~5 min)**
   - 2Q de Qbankly (**en Edge**) del tema anterior + repaso Anki/APEX (AGAIN/GOOD).
   - Log de errores: gap básico / razonamiento / vocabulario.
   - Umbral de repetición espaciada (estilo ENCAPS): 2/2 → tema nuevo · 1/2 → repaso fin de semana · 0/2 → repetir.

2. **Mini Deep Work — 1 átomo nuevo (~40 min)**
   - **Pre-test:** 3Q de Qbankly (Edge) en modo tutor + free recall 60 s.
   - **Lectura activa (jerarquía de material):**
     - Texto/concepto → **AccessDermatology** (Fitzpatrick / Color Atlas).
     - Si el átomo es **dermatopatología** → **Barnhill's 4e** + Barnhill's Challenge.
     - Si es **pediátrico** → **Weinberg's**; si es **piel de color** → **Taylor & Kelly's**; si es **quirúrgico** → libros/videos de **Kantor**.
     - Imagen clínica → atlas de Access (20.000+ imágenes).
   - **2º pase español + enfoque board europeo →** **ProMIR** (Enfoque + videoclase-resumen del capítulo).
   - **Free recall** del átomo.
   - **Crear ≤3 APEX** (formato Palmerton: FRENTE/REVERSO/CCSN/FISIOPATOLOGÍA/RELACIONES/EXAMEN).

3. **Vueltas (repetición espaciada por prioridad, igual que ENCAPS):**
   CRÍTICA [1,3,7,28,63] · ALTA [1,7,28,63] · MEDIA [3,28,63] · BAJA [7,63].
   Asigna CRÍTICA/ALTA a Bloques A, D, E, H (los de mayor peso APPLIED).

---

## 4. Notas de verificación

- **Verificado:** existencia y contenido de AccessDermatologyDxRx (20+ textos, 20.000+ imágenes, 400+ videos de procedimientos, Barnhill's Challenge con **400+ vignettes**); ponderación ABD APPLIED **55/15/15/15** (abderm.org); orden de 11 capítulos de Sima Jain 2e; Qbankly **solo abre en Edge**; ProMIR es SPA por WebSocket con intros que traen Peso/horas/Enfoque.
- **No verificado / pendiente:** existencia de un módulo "Derma" aislado en Qbankly (su Derma vive dentro de los subjects de cada banco); peso MIR exacto y capId de **Dermatología en ProMIR** (no estaba en la tanda extraída — pendiente de scrape, solo Cardio/Digestivo tienen duraciones confirmadas); la cifra "700+ Q&As" agregada de Access (solo en fuentes secundarias). Fetch directo a `mhmedical.com` da **403** → toda extracción de Access es navegada a mano, no por API.
