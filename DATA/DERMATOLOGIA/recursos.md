# DERMA · Recursos verificados (gratis + suscripción del usuario)

> Consolidado el 10-jun-2026. Dos orígenes: (a) extracción en vivo de AccessDermatologyDxRx
> (sesión UF del usuario, ver [`temario.md`](./temario.md)), (b) dossier verificado previo
> (`STUDY_HUB/02_DERMA_curriculo.md`, investigación web con fuentes) + verificación nueva de
> referentes ([`referentes.md`](./referentes.md)). Sin URLs inventadas.

## 0. Cuaderno NotebookLM «DERMA · Élite Engine» (creado 05-sep-2026 · vacío nº 9 Palmerton v3)
- **ID** `0e9fac5c-01f3-406e-96f2-6230bd66a29c` · **URL** <https://notebooklm.google.com/notebook/0e9fac5c-01f3-406e-96f2-6230bd66a29c>
  · constante `DERMA_NOTEBOOKLM` en `src/lib/dermaData.ts` (para la pestaña Fuentes del Hub) · Dashboard Obsidian
  `10_DERMATOLOGIA/00_DASHBOARD_DERMA` lo enlaza.
- **86 fuentes** (05-sep-2026): **79 útiles + 7 fallidas** («Checking your browser – reCAPTCHA»: PMC y NCBI Bookshelf
  bloquean al crawler de NotebookLM → PMC8012343, PMC7427155, PMC7447619, PMC12737568, PMC12865869, PMC13172661,
  NBK430685). Sus equivalentes **PubMed sí están cargados** (MD Codes, Goodman 2020 PMID 31693068, myomodulation
  update, los 3 de toxina 2025-26). → **Borrar las 7 a mano en la UI** (el agente no borra datos). StatPearls no es
  cargable (Bookshelf): el gratuito de respaldo queda en DermNet + AAD Basic Curriculum.
- Todas las URL se verificaron **200 OK con WebFetch antes de cargarlas** (lotes de 10, `source_add` del MCP):

  | Grupo | Fuentes cargadas |
  |---|---|
  | Referentes estética (`referentes.md`) | Cotofana safe zones PAN 2022 + Freytag JDD 2019 · de Maio MD Codes (PubMed) + MD ASA + PRS 2017 upper/lower + myomodulation 2018/2020 · DeLorenzi 2013 / 2014 / 2017 (HDPH) · Goodman-Magnusson 2020 · Anderson-Parrish 1983 · Manstein 2004 · Global Alliance acné 2018 · Cotofana Anatomy · MD Codes Institute |
  | Toxina 2025-26 | Narrative review de complicaciones · NMJ distribution upper face · Dynamic forehead lines (PubMed) |
  | Dermatoscopia | DermNet Dermoscopy CME: contents + 17 módulos (introduction, features, pattern analysis, first step, three-point, other algorithms, benign melanocytic, atypical naevi, melanoma, BCC, SCC, seborrhoeic keratoses, other non-melanocytic, nail, report, dermatoscopic-histologic correlation, naevi new classification) · TADA (PubMed) · Dermoscopedia: Chaos and clues · Globules · Pigment network · Streaks · Vascular structures · Melanoma |
  | Morfología / piel de color | DermNet Terminology · Skin phototype · Mind the Gap · DermNet acné / DA / psoriasis / BCC / melanoma / celulitis / SJS-TEN |
  | Boards / currículo | ABD CORE exam · APPLIED content overview · CORE Study Guide (PDF) · AAD Basic Dermatology Curriculum · ISSVA classification · «Pearls for resident education in cosmetic and laser procedures» |
  | Ruta fellowship (`RUTA_FELLOWSHIP_ESTETICO.md`) | ASDS Cosmetic Fellowship + International Preceptorship · ACGME MSDO (overview + Program Requirements 2026 PDF) · ACMS residents + match policy · Mayo (admissions, derm residency application, fellowship opportunities, MSDO overview + application, Medical Dermatology fellowship) · ABD (MSDO fellowship training, prerrequisitos de subespecialidad, fin del practice pathway, MDS 2027) · IMCAS Academy · AMWC |

- **Uso Palmerton** (es el motor de verificación; NO sustituye a la fuente ni al caso ciego):
  - Cierre 14:13 de cada sesión → «Con las fuentes, redacta la tarjeta de MECANISMO del caso de hoy (frente: pregunta
    de mecanismo · reverso: por qué + CCSN) y cita la fuente exacta».
  - d45 / d69 → «Del módulo CORE X, lista lo que NO sé: los 10 conceptos que aparecen en las fuentes y no en mis notas».
  - Módulo X (d19/d20 y checkpoints) → «Recita el protocolo HDPH (DeLorenzi 2017) y el manejo inmediato de pérdida
    visual (Goodman 2020) y corrígeme paso a paso».
  - Antes de fijar una cifra/dosis en `NITIDA_PROTOCOLOS.md` → «¿Qué dice exactamente la fuente cargada sobre …?
    Si no está, dilo» (todo lo que no esté queda `A VERIFICAR`).
- Ampliar: `source_add` por lotes de 10 URL, siempre tras WebFetch 200; **no cargar PMC ni NCBI Bookshelf** (reCAPTCHA).

## 1. Suscripciones del usuario (núcleo del plan diario)
| Recurso | Qué aporta | Acceso |
|---|---|---|
| **AccessDermatologyDxRx** | 36 libros (Fitzpatrick 9e, Color Atlas 9e con TOC extraído, Barnhill's 4e, Taylor & Kelly 3e, Kantor…) · 1.301 preguntas board · 300 casos · ~176 vídeos contados (91 de sutura) | Chrome/Edge, sesión UF Remote Access |
| **Qbankly** | uWorld Library Dermatology 43 temas · 78 Q derma Step 1 · USMLERx 53 Q | ⚠ **SOLO Edge** (botón ◆ Edge en la app) |
| **ProMIR** | Asignatura 5: 11 capítulos, videoclase resumen 3:18:11, Masterclass melanoma 1:39:10, Peso MIR por tema | Chrome |

## 2. Gratis verificado fuerte (del dossier 02_DERMA_curriculo, cross-check)
- **DermNet NZ** — <https://dermnetnz.org/> · el mejor atlas gratuito (23.000+ imágenes).
- **AAD Basic Dermatology Curriculum** — <https://www.aad.org/education/basic-derm-curriculum>
  (~42 módulos peer-reviewed; portal: learning.aad.org). Re-verificado 10-jun-2026.
- **Derm In-Review** — <https://dermatologyinreview.com/> · 3.100+ preguntas estilo board gratis
  (registro) + **Krazy Kodachromes** <https://dermatologyinreview.com/krazy_kodachromes/>.
- **Dermpath (bloque E):** Jerad Gardner "Dermpath MEGA Index" <https://kikoxp.com/posts/5084/public>
  + canal <https://www.youtube.com/channel/UCfW2GM4Yqqg1pScI-2clhYQ> · PathElective
  <https://www.pathelective.com/derm-path-home> · PathPresenter Dermpath100
  <https://www.pathpresenter.com/dermpath100/>.
- **Cirugía/Mohs:** ACMS webinars <https://www.mohscollege.org/for-physicians/education/webinars>
  · ASDS Learn <https://asds.pathlms.com/courses> (mayoría con membresía; catálogo de referencia).
- **Research:** PubMed alerts · Mayo Derm library guide <https://libraryguides.mayo.edu/derm>.

## 3. Estética (bloque X) — referentes con URL real
Ver [`referentes.md`](./referentes.md): Cotofana Anatomy (curso) · MD Codes Institute
(mdcodes.com) · papers DeLorenzi/Goodman (rescate 🔴) · Anderson/Manstein (láser) ·
libros Carruthers 5e (Elsevier). En AccessDerma: Baumann's Cosmetic 3e (`3200`), Lasers
(`2818`), Dermatologic Surgery (`2811`), Facial Flap Surgery (`2829`), Cosmetic Dermatology
for Skin of Color (`2956`).
- **Ruta formal al fellowship estético (Norte 2034)**: [`RUTA_FELLOWSHIP_ESTETICO.md`](./RUTA_FELLOWSHIP_ESTETICO.md)
  — rutas A (EE.UU.: ECFMG → research fellowship → residencia → fellowship ASDS/MSDO por SF Match) y B (ENCAPS/MIR
  → IMCAS/AMWC/Cotofana/MD Codes + ASDS International Preceptorship), ventanas verificadas 05-sep-2026 y cronograma
  inverso 2034→2027.
- **NÍTIDA (derma médica por suscripción, fusionada con Derma 27-ago)**: [`NITIDA_PROTOCOLOS.md`](./NITIDA_PROTOCOLOS.md)
  — «consulta tipo» por diagnóstico del módulo B + cosmecéutica (tele-derma, foto estandarizada, rutina ≤3 pasos,
  revisión 6-8 sem, IGA, guiones, límites).

## 4. Caveats honestos
- La formación práctica de inyectables es presencial/supervisada; lo online cubre anatomía,
  método y complicaciones (no la mano).
- IMCAS/Empire/AMI = de pago; mdcodes.com tiene formación on-demand de pago.
- VisualDx: preguntar acceso institucional UF antes de pagar.
- `[pendiente]` conteo de vídeos de las categorías "Dermatologic Surgery" y "3D Modules"
  de AccessDerma (no cargaron por click programático).
- `[pendiente]` TOC con `sectionid` de Fitzpatrick 9e (`2570`), Barnhill 4e (`2802`) y Weinberg 5e (`1913`):
  requiere la sesión UF en tu Chrome → método CDP exacto en
  [`_scrape/README_TOC_PENDIENTE.md`](./_scrape/README_TOC_PENDIENTE.md) (vacío nº 8 Palmerton v3).
