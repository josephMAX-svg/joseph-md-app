# DERMA · Recursos verificados (gratis + suscripción del usuario)

> Consolidado el 10-jun-2026. Dos orígenes: (a) extracción en vivo de AccessDermatologyDxRx
> (sesión UF del usuario, ver [`temario.md`](./temario.md)), (b) dossier verificado previo
> (`STUDY_HUB/02_DERMA_curriculo.md`, investigación web con fuentes) + verificación nueva de
> referentes ([`referentes.md`](./referentes.md)). Sin URLs inventadas.

## 0. Cuaderno NotebookLM «DERMA · Élite Engine» (creado 05-sep-2026 · vacío nº 9 Palmerton v3 · releído 12-sep-2026)
- **ID** `0e9fac5c-01f3-406e-96f2-6230bd66a29c` · **URL** <https://notebooklm.google.com/notebook/0e9fac5c-01f3-406e-96f2-6230bd66a29c>
  · constante `DERMA_NOTEBOOKLM` en `src/lib/dermaData.ts` (para la pestaña Fuentes del Hub) · Dashboard Obsidian
  `10_DERMATOLOGIA/00_DASHBOARD_DERMA` lo enlaza.
- **86 fuentes** — conteo REAL con `notebook_get` el 12-sep-2026 (`source_count: 86`, título «DERMA · Élite Engine (Palmerton derma · fuentes verificadas)»; constante `DERMA_NOTEBOOKLM.fuentes` en `dermaData.ts`): **79 útiles + 7 fallidas** («Checking your browser – reCAPTCHA»: PMC y NCBI Bookshelf
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

- **REGLA: motor de VERIFICACIÓN, no fuente.** El cuaderno comprueba una tarjeta contra las fuentes cargadas; nunca
  sustituye al caso ciego, a la lectura del capítulo ni a la fuente primaria. Toda dosis, concentración o cifra que no
  esté **literal** en una fuente cargada sale como `A VERIFICAR (dd-mmm)` y no entra en Anki, en NÍTIDA ni en la app.
- **Los 2 prompts de uso** (los mismos que copia la pestaña Fuentes del Hub, `NBLM_PROMPTS` en `DermaHub.tsx`; el cierre
  14:13 de HOY copia el primero ya relleno con los casos del día):
  1. **Cierre 14:13 · cada sesión → Tarjeta de MECANISMO verificada**
     > Con las fuentes del cuaderno, dame la tarjeta de MECANISMO verificada del caso de hoy [dx / átomo dNN]. Formato:
     > FRENTE "¿por qué…?" → POR QUÉ (cascada tejido/fisiología) · CCSN (con qué se confunde + el rasgo discriminador)
     > · FUENTE (cita exacta del cuaderno). Marca "A VERIFICAR" toda dosis, concentración o cifra que no esté
     > literalmente en las fuentes.
  2. **Checkpoints (v3 taper: cp1 d51 jue 4-feb-2027 · repaso1 d72 lun 5-abr-2027 · ciclo 2 d85 / d94 / d103) → Qué no sé del módulo X**
     > Con las fuentes del cuaderno y esta lista de mis fallos del ledger [pegar export JSON: por_modulo + tipos de
     > error], dime qué NO sé del módulo CORE [Med/Path/Peds/Surg]: los 10 conceptos/mecanismos con más probabilidad
     > de fallo, cada uno con su rasgo discriminador y la fuente exacta. Sin adular; ordena por impacto en el examen CORE.
- Usos secundarios (mismo cuaderno):
  - Módulo X (d19/d20 y los drills de d52/d73) → «Recita el protocolo HDPH (DeLorenzi 2017) y el manejo inmediato de
    pérdida visual (Goodman 2020) y corrígeme paso a paso».
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
- `[pendiente]` TOC con `sectionid` de Fitzpatrick 9e (`2570`), Barnhill 4e (`2802`), Weinberg 5e (`1913`), Guidebook (`2960`) y
  Dermoscopy (`2804`/`2929`) — estado real 12-sep-2026: **43/73 átomos con sectionid verificado, 20/73 a portada** (cabecera de
  `src/lib/dermaSourcesData.ts`):
  requiere la sesión UF en tu Chrome → método CDP exacto en
  [`_scrape/README_TOC_PENDIENTE.md`](./_scrape/README_TOC_PENDIENTE.md) (vacío nº 8 Palmerton v3).
