# PLAN ÉLITE DERMATOLOGÍA 2026-27 — hacia dermatología estética

Del agente macro:derma-estetica-elite (27-ago-2026) + inventario AccessDermatology REAL.

> **Franja: RESEARCH↔DERMA alternante 13:30-14:15 (interdiario, SE MANTIENE en v5).**
> Ciclo REAL de 45' (v2.1 → v3, ver §3): **casos visuales CIEGOS fijos del banco de 200 (2/sesión · 1 en el taper ·
> 3 desde d50) + 1 imagen dermatoscópica ciega + ~10Q de review con presupuesto por banco y cursor + 10' de lectura
> Fitzpatrick/Baumann del módulo (o módulo DermNet CME) + ledger de cada caso.** Módulos semanales orientados a
> dermatología estética.
>
> **v5.13 (16-sep-2026) — DERMA NO SE MUEVE: d1 = JUE 17-SEP-2026 → d73 = VIE 9-ABR-2027 y ciclo 2 mar 13-abr → vie 2-jul-2027, idénticos a v5.12.** El mié 16-sep
> tampoco se estudió y el D1 del régimen pasa al **jue 17-sep-2026** (duodécimo corrimiento, 31-ago→17-sep), que ya era el d1 de Derma: los 73 + 30 átomos
> conservan fecha y d (releído con node el 16-sep: `DERMA_DAILY_META` 2026-09-17 → 2027-04-09, `taperStep1` 2027-01-19 → 2027-02-02, `DERMA_CICLO2_META` 2027-04-13 → 2027-07-02).
> Esta vez la que corre es **Research** (+2 hábiles: ciclo 1 vie 18-sep → lun 15-feb-2027, ciclo 2 mié 17-feb → vie 20-ago-2027). **Lo que cambia es el contexto del
> Step 1:** su plan termina el **lun 1-feb-2027 (D95 = D-1 DENTRO del plan)** y el examen pasa al **MAR 2-FEB-2027** → **d49 (mar 2-feb, segunda pasada parcial III) cae
> ahora EL DÍA DEL EXAMEN** (sesión opcional: hacerla al volver del Prometric o saltarla, no se pierde contenido); d48 vie 29-ene coincide con el D94 = última sesión
> de banco del Step 1; el vie 15-ene (NBME 31, GO/NO-GO) sigue siendo d43 = sesión NORMAL (Mohs). Alternativa registrada en `DATA/PENDIENTES_JOSEPH.md`: swap
> d43↔taper (Mohs al mar 2-feb, tras el examen, y el 15-ene en modo taper) — decisión de Joseph. Las menciones "día siguiente al examen" y "examen lun 1-feb"
> de más abajo son de v5.12.
>
> *(Histórico v5.12, 15-sep-2026 — DERMA CORRÍA +2 DÍAS DE CALENDARIO (+1 slot interdiario) hasta las fechas vigentes: d1 = jue 17-sep-2026 → d73 = vie 9-abr-2027.)* El mar 15-sep
> tampoco se estudió y el D1 del régimen pasa al **mié 16-sep-2026** (undécimo corrimiento, 31-ago→16-sep), que es día **Research** (su ciclo 1 ya
> arrancaba el mié 16-sep desde v5.11 y NO se mueve: 42 átomos 16-sep → 11-feb-2027, ciclo 2 lun 15-feb → mié 18-ago-2027), así que esta vez la que
> corre es Derma: los 73 átomos del ciclo 1 pasan de mar 15-sep → mié 7-abr a **jue 17-sep-2026 → vie 9-abr-2027** y los 30 del ciclo 2 de vie 9-abr → mié 30-jun
> a **mar 13-abr → vie 2-jul-2027** (`dermaCiclo2.ts` regenerado; leído con node el 15-sep: `DERMA_DAILY_META` 2026-09-17 → 2027-04-09, `DERMA_CICLO2_META`
> 2027-04-13 → 2027-07-02; 0 fechas en finde/feriado, 0 solapes con Research). Regla intacta: **no se fusiona ni se recorta nada** (73 + 30 átomos,
> mismo orden de casos). **El taper Step 1 es POSICIONAL (d44-d49)** y por eso también corre: ahora va del **mar 19-ene** (día tras el NBME 32) al **mar 2-feb-2027**
> (día tras el examen), y el **vie 15-ene (NBME 31, GO/NO-GO) es d43 = sesión NORMAL (Mohs, G)**. Contexto Step 1: su D95 = **vie 29-ene** llena la ventana
> 25-29 ene → **examen target LUN 1-FEB-2027** (sáb 30 y dom 31 descanso fuera del plan) *[superado en v5.13: examen mar 2-feb]*; d48 vie 29-ene coincide con la última sesión del Step 1 y d49
> mar 2-feb es el día siguiente al examen (sesión opcional). Alternativa registrada en `DATA/PENDIENTES_JOSEPH.md`: swap d43↔taper (mover Mohs al 2-feb y
> dejar el 15-ene en modo taper) — decisión de Joseph. Las menciones "vie 15-ene = d44" y "D95 = mié 27/jue 28-ene" de más abajo son de v5.10/v5.11.
>
> *(Histórico v5.11, 14-sep: Derma no se movía — d1 mar 15-sep → d73 mié 7-abr, ciclo 2 vie 9-abr → mié 30-jun; taper d44-d49 = 15→29-ene; Step 1 D95 = jue 28-ene = D-1, examen vie 29-ene.)*
>
> **v5.10 (12-sep-2026) — DERMA CORRE +2 DÍAS DE CALENDARIO: d1 = MAR 15-SEP-2026.** El 11 de
> septiembre tampoco se estudió (+1 día hábil sobre v5.9, noveno corrimiento del ciclo 31-ago→14-sep). Esta vez
> **se invierte lo de v5.9**: la alternancia Research↔Derma sigue anclada al mié 10-jun-2026 y hace del **lun 14-sep
> (D1 del régimen) un día Research**, así que Research no se mueve (ya arrancaba el lun 14-sep desde v5.9) y Derma
> pasa de vie 11-sep a **mar 15-sep** (+2 días de calendario, +1 slot interdiario). `src/lib/dermaDailyPlan.ts`
> se regeneró con las fechas nuevas (leídas con node el 12-sep: 0 en fin de semana, 0 en 25-dic/31-dic/1-ene).
> Regla de este corrimiento: **no se fusiona ni se recorta nada** — misma franja, mismo contenido, mismo orden de
> casos (`DERMA_CASO_ORDEN` congelada) y 0 solapes con Research.
>
> **v3 · TAPER DE EXAMEN (12-sep-2026, tarde) — el plan pasa de 70 a 73 átomos: d1 = MAR 15-SEP-2026 → d73 = MIÉ 7-ABR-2027 (fechas v5.10/v5.11; en v5.12: d1 jue 17-sep → d73 vie 9-abr, taper d44-d49 = mar 19-ene → mar 2-feb).**
> Las 6 sesiones que caían entre el NBME 31 (vie 15-ene, GO/NO-GO) y el examen Step 1 (vie 29-ene) — d44 15-ene · d45 19-ene ·
> d46 21-ene · d47 25-ene · d48 27-ene (D95 en v5.10; D94 = D-2 en v5.11) · d49 29-ene (día del examen) — pasan a **modo taper** (1 caso ciego + FSRS
> de fallos + 0 lectura nueva) por un **swap de contenido con fechas intactas** (§13): Cicatrización, los 2 checkpoints,
> Anatomía 3D, Arterias, Envejecimiento y todo lo que sigue se corren DESPUÉS del examen en el mismo orden, y en la ventana
> viven los 3 átomos ligeros MED (paciente agudo, pelo/uñas, contorno corporal) + 3 segundas pasadas parciales (nuevas).
> **0 átomos perdidos** (verificado con node contra HEAD: los 70 subtemas, lecturas y láminas siguen; CRIT 27 y ALTA 35 intactos);
> el desfase se absorbe alargando el plan (v5.12 = v5.13: d71 lun 5-abr · d72 mié 7-abr · d73 vie 9-abr). Desde d50 (v5.12 = v5.13: jue 4-feb, primera
> sesión con carga completa tras el examen del mar 2-feb) **3 casos/sesión** (§16) y desde d67 el Pictorial 4e se releva con el 3e (§14). El **CICLO 2**
> (d74-d103, v5.12 = v5.13: mar 13-abr → vie 2-jul-2027) vive en `src/lib/dermaCiclo2.ts`, generado por `DATA/_scripts/gen_derma_ciclo2.js` (§16).
> Índice completo de fechas en §12. **La fecha es lo estable, el nº de día puede moverse: comprobar
> siempre contra `dermaDailyPlan.ts`.**

## 1. Inventario AccessDermatology (REAL, extraído)

**Review Questions (1.301Q en total)**
| Banco | Q |
|-------|---|
| Barnhill's Challenge | 403 |
| Pictorial Review 4e | 381 |
| Pictorial Review 3e | 363 |
| CORE Exam Bank | 104 |
| Question of the Week | 50 |

**Cases**
- **Dermatology Cases for Board Review — 200 casos en 4 áreas** (el motor del plan).
- Differential Diagnosis Challenge.
- LANGE Clinical Cases.

**Libros clave**: Fitzpatrick's Dermatology 9e · Barnhill's Dermatopathology 4e ·
Baumann Cosmetic Dermatology 3e · Lasers · Procedural Dermatology · Color Atlas Cosmetic.

## 2. El mapa del conocimiento: examen CORE del ABD (verificado)

La certificación americana (ABD) tiene 2 etapas: **CORE** (en residencia; 4 módulos de 2h y
75-100Q c/u: Medical, Pediatric, Surgical, Dermatopathology; feb/jul/oct) y **APPLIED**
(post-residencia). Dato clave: **el módulo Surgical incluye explícitamente la cosmética** —
fillers, toxina, láser y luz no-láser, peelings, dermoabrasión, escleroterapia, liposucción,
física del láser, fotoenvejecimiento, cicatrización. **La ruta élite hacia estética pasa
formalmente por dominar surgical derm y su ciencia básica — no es un anexo.** La dermoscopía
la piden transversalmente 3 de los 4 módulos → introducirla temprano.

## 3. Método del caso visual (Palmerton aplicado a los 200 casos) — el ciclo REAL v2.1/v3

*(Actualizado el 12-sep-2026 al ciclo que ejecuta `dermaDailyPlan.ts` y `DermaTodayPlan`; el texto original
"1 caso + 10Q + 10' de lectura" era el diseño del 27-ago.)*

**La sesión de 45' (`DERMA_FRANJAS`)**

| Franja | Fase |
|---|---|
| 13:30-13:33 | **Repaso FSRS** de tarjetas de MECANISMO + fallos etiquetados de la sesión previa. Si el ledger dejó una **cura pendiente** (fallo CCSN → Differential Diagnosis Challenge, `dermaCuraPendiente`), se hace AQUÍ, antes del primer caso. |
| 13:33-13:36 | **CASOS CIEGOS ①②** — los `casoIds` fijos de la fila (permutación seeded `DERMA_CASO_ORDEN`, interleaving real): SOLO la imagen → **describir con los 8 ejes** (`DERMA_EJES_MORFOLOGIA`, dictado en `DermaMorphologyDictation`) + **diferencial de 3** sin leer nada · **①b 1 imagen dermatoscópica CIEGA** (`dermatoscopiaImg`: Self-Assessment 2e en las impares, Dermoscopedia por patrón en las pares). |
| 13:36-13:52 | **CASOS ③④** — viñeta y responder → discusión → **1-2 tarjetas de MECANISMO + 1 oclusión** (`DermaAnkiCola`, deck `APEX::DERMA::<bloque>`) → cada caso al **ledger** con la matriz confianza×acierto (Lo sabía / suerte / confundí / no sabía), tipo de error (CCSN / CONCEPTO / MORFOLOGÍA / DDX) y módulo CORE. El caso NUNCA se salta. |
| 13:52-14:03 | **~10Q de review** del banco rotante con **presupuesto** (§14: Pictorial 4e 38 sesiones → 3e desde d67 · CORE en cierres de módulo · Barnhill en dermpath · QOTW en checkpoints · LANGE en d71) **retomando en el Q# del cursor** (`dermaBancoCursor`). 1 de cada 3 sesiones (d ≡ 0 mod 3) = **10Q ProMIR-Dermatología** (§11). Variable de ajuste si los casos pidieron más. |
| 14:03-14:13 | **Lectura dirigida 10'** del módulo (Fitzpatrick / Baumann / Lasers / Dermatologic Surgery, nunca lineal) — en las sesiones **pares d6-d44 el slot lo ocupa el micro-track DermNet Dermoscopy CME** (18 módulos + quizzes + comparativas). |
| 14:13-14:15 | **Cierre**: free recall (7 pasos del cerebro clínico si el átomo tiene ficha en `dermaCerebro.ts`) + drill HDPH 90 s en d19/d20/d52/d73 + marcar progreso real + viernes: exportar el ledger (JSON → `TRACKING/_registro_derma.json`). |

**Cadencia de casos (v3)**: **2 casos/sesión** en d1-d43 · **1 caso** en las 6 sesiones del taper Step 1 (d44-d49) ·
**3 casos/sesión desde d50** (v5.12 = v5.13: jue 4-feb-2027, primera sesión con carga completa tras el examen del mar 2-feb; los 10Q son la variable de ajuste) →
**164 casos en la primera pasada** (hasta d73) y los **36 restantes** a 3/sesión en d74-d85 del ciclo 2 (§16).
`dermaCasosPorSesion(d)` / `dermaCasoOffset(d)` / `dermaCasosDeSesion(d)` reproducen exactamente el literal `casoIds` de cada fila.

Reglas: mantener el **orden aleatorio** del banco (interleaving, no agrupar por tema) ·
segunda pasada solo de fallos vía FSRS (d72 y d47-d49 parciales) · **etiquetar cada fallo con su módulo CORE**
(med/ped/surg/path) en el ledger → mapa de debilidades con la misma lógica de rentabilidad
de ENCAPS · las tarjetas usan el MISMO formato Palmerton del mazo Step 1 (un solo sistema FSRS; los 8 átomos
`step1: true` de §15 cuentan doble) · **swap v2.1**: la seguridad de fillers (oclusión vascular + HDPH · ceguera + kit)
se estudia en d19-d20 (nov-2026), antes que la técnica · **taper**: ningún átomo CRIT nuevo a ±3 días hábiles de un
examen mayor (§13).

**Ritmo**: ~2-3 sesiones DERMA/semana (interdiario con RESEARCH) → 73 sesiones del ciclo 1 (v5.12: 17-sep-2026 → 9-abr-2027)
+ 30 del ciclo 2 (13-abr → 2-jul-2027): primera pasada de los 200 casos completa en d85 (jue 13-may-2027)¹.

## 4. Módulos semanales (la lectura de 10' + sesión teórica)

| Semanas | Módulo | Lectura guía |
|---------|--------|--------------|
| 1-3 | Terminología morfológica + **anatomía facial y danger zones** (arterias facial/angular/supratroclear; glabela y nariz = mayor riesgo de oclusión) — sin esto nada de lo demás es seguro | Fitzpatrick 9e + Cotofana |
| 4-6 | **Toxina botulínica**: mecanismo (clivaje de SNAP-25), unidades NO intercambiables entre marcas, músculos del tercio superior, ptosis y su manejo | Baumann 3e + revisiones OA abajo |
| 7-10 | **Rellenos de HA**: reología (G'), planos de inyección, **oclusión vascular + protocolo de hialuronidasa** | Baumann 3e |
| 11-12 | **Peelings químicos**: profundidad (superficial/medio/profundo), agentes (glicólico, salicílico, TCA, fenol), frosting | Baumann 3e + Procedural Dermatology |
| 13-16 | **Física láser/EBD**: fototermólisis selectiva (Anderson-Parrish), cromóforos (melanina/Hb/agua), longitudes de onda — la MISMA física que exige el CORE surgical: doble rentabilidad | Lasers + Color Atlas Cosmetic |
| 17-20 | Integración + repaso de fallos + **ciencia cosmecéutica** | Baumann 3e |

**Regla de seguridad primero**: dominar el manejo de complicaciones (oclusión
vascular/hialuronidasa, ptosis por toxina, PIH por láser/peeling en fototipos altos) ANTES que
la técnica — es lo que separa élite de aficionado y es lo que pregunta el CORE surgical.
El ángulo fototipos IV-VI conecta directo con L4/L5 del programa de research.

## 5. Recursos de referencia

- **Fitzpatrick 9e** = el texto de consulta post-caso (10-15 min máx por diagnóstico fallado,
  NUNCA lectura lineal). El agente prefería Bolognia como referencia #1 de derm clínica, pero
  su propia regla lo resuelve: "Fitzpatrick solo si ya está en AccessDerma" — **lo está** → se
  usa Fitzpatrick, sin comprar Bolognia en esta fase.
- **DermNet** ([dermnetnz.org](https://dermnetnz.org/about-us)) — gratuito, >20.000 imágenes
  revisadas por dermatólogos, con quizzes: la referencia rápida diaria.
- **VisualDx** — ~28% de imágenes en piel de color (relevante para pacientes peruanos); solo
  si hay acceso institucional, no esencial en fase teórica.
- **Sinergia Step 1**: la derma de Step 1 (pénfigo/penfigoide, psoriasis, melanoma ABCDE,
  SJS-TEN, micro cutánea de Sketchy) cuenta doble — mismo mazo FSRS.

## 6. Referentes y fase práctica futura (2027+)

- **Académicos**: Sebastian Cotofana (EL educador mundial de anatomía para inyectables) ·
  Mauricio de Maio (MD Codes) · los Carruthers (pioneros de toxina; serie *Procedures in
  Cosmetic Dermatology* de Dover = estándar).
- **Canales** (huecos de tiempo, no cuentan como sesión): Doctorly · Shereene Idriss ·
  Davin Lim (láser, avanzado) · Tim Pearce (teoría de inyectables) · podcast Dermasphere.
- **Plataforma formal**: IMCAS Academy (verificado: 1.648+ vídeos de inyectables, 1.112+ de
  láser/EBD, 809+ de derm clínica) · cursos hands-on ASDS/ASLMS.
- **Journals**: Dermatologic Surgery · JCAD · Aesthetic Surgery Journal.

**Fuentes**:
[ABD CORE Exam](https://www.abderm.org/residents-and-fellows/abd-certification-pathway/core-exam-info/core-exam) ·
[ABD CORE Study Guide (PDF oficial)](https://dlpgnf31z4a6s.cloudfront.net/media/252836/core-study-guide-012021.pdf) ·
[ABD calendario](https://www.abderm.org/) ·
[ABD APPLIED](https://www.abderm.org/residents-and-fellows/abd-certification-pathway/applied-exam-info/applied-exam-content-overview) ·
[DermNet](https://dermnetnz.org/about-us) ·
[VisualDx](https://www.visualdx.com/why-visualdx/) ·
[IMCAS Academy](https://www.imcas.com/en/academy) ·
[Toxina en líneas frontales — Toxins 2025 (OA)](https://pmc.ncbi.nlm.nih.gov/articles/PMC12737568/) ·
[Unión neuromuscular tercio superior — J Cosmet Dermatol 2026](https://pmc.ncbi.nlm.nih.gov/articles/PMC13172661/) ·
[Complicaciones de toxina — Cureus 2026](https://pmc.ncbi.nlm.nih.gov/articles/PMC12865869/) ·
[Educación en cosmética/láser para residentes — DOJ 2025](https://pubmed.ncbi.nlm.nih.gov/40991491/)

---

### Nota de divergencia

¹ El agente propuso sesiones A/B/C separadas (5 casos/sesión A + sesión teórica B + sesión
Anki C) asumiendo 2-3 días × 45' exclusivos de derma. El diseño decidido usa UN ciclo único de
45' (1 caso + 10Q + 10' lectura) porque la franja alterna con RESEARCH. El ritmo baja (1 caso
vs 5 por sesión), así que la primera pasada completa de los 200 casos se extiende más allá de
enero; prioridad dentro del ciclo: el caso visual NUNCA se salta — los 10Q de review son la
variable de ajuste. Al liberar agenda post-Step 1 (feb-2027), evaluar volver al ritmo de
5 casos/sesión del agente.

**Resolución (v3, 12-sep-2026)**: la divergencia se cierra con **3 casos/sesión desde d50** (primera sesión
post-Step 1), no 5: en 45' con caso ciego completo (8 ejes + diferencial + discusión + tarjetas), 3 casos ocupan ~28'
y dejan ~5Q de review; 5 casos convertirían la sesión en lectura de respuestas, que es lo que el método prohíbe.
Codificado en `DERMA_CASO_META.porSesion = { base: 2, taper: 1, postStep1: 3 }`; los 36 casos que quedan tras d73 se hacen
en las 12 primeras sesiones del ciclo 2 (§16). `DERMA_CASO_META` ya no dice "5 casos/sesión desde feb".

---

## v2.1 (5-sep-2026) · casos, dermatoscopia, ledger, Anki, swap d19-20↔d57-58, Nítida, dermatoscopio de bolsillo

> Implementación de los 12 vacíos del análisis "Palmerton cero puntos ciegos" (gaps_derma.json) en la capa de
> DATOS del plan (`src/lib/dermaDailyPlan.ts` · `dermaLedger.ts` · `dermaCerebro.ts` · `ankiLinks.ts`).
> Horario, fechas de examen y Calendar intactos: franja 13:30-14:15 interdiaria, D1 = **jue 17-sep-2026**, d70 = **jue 1-abr-2027** (v5.12: +2 días de calendario respecto a v5.10/v5.11 — que tenían d1 mar 15-sep y d70 mar 30-mar).
> Los componentes (DermaClinicalPlate, DermaMorphologyDictation, DermaCerebroCard, DermaEmergencyDrill, widget del Hub)
> se construyen sobre estos campos en un paso posterior.

### 1. Los 200 casos en orden aleatorio FIJO (`casoIds`)
- `DERMA_CASOS` = ids 1-200 con área por el orden real del banco (Medical 110 · Dermpath 30 · Peds 30 · Surgical 30):
  Med 1-110 · Path 111-140 · Peds 141-170 · Surg 171-200 (`dermaCasoArea`). **A VERIFICAR (05-sep)** que el listado de
  `cases.aspx?groupid=1546` esté ordenado por área en ese orden; si no, se re-mapea `dermaCasoArea` sin tocar la permutación.
- `DERMA_CASO_ORDEN` = permutación seeded **congelada** (mulberry32 seed 20260907 + Fisher-Yates, reproducida y verificada
  el 5-sep: 200 ids únicos, suma 20.100). Cada sesión trae `casoIds` = las posiciones que le tocan en orden.
  *(v2.1: `[a, b]` = 2(d-1), 2(d-1)+1 · **v3**: las sesiones consumen 2 · 1 en el taper d44-d49 · 3 desde d50 → `casoIds: number[]`.)*
- Primera pasada *(v2.1)* = 140 casos en 70 sesiones → **v3 = 164 casos en 73 sesiones** (Med 88 · Path 21 · Peds 26 · Surg 29,
  leído de la permutación el 12-sep); los **36 restantes** (`dermaCasosPostStep1()` = `dermaCasosCiclo2()`; Med 22 · Path 9 ·
  Peds 4 · Surg 1) se hacen a 3/sesión en d74-d85 del ciclo 2 (§16).
- Ledger por caso (§4): el d72 (2ª pasada FSRS, antes d69) y el d73 (mapa final, antes d70) leen SOLO de ahí.

### 2. Micro-track de dermatoscopia (sin tocar el horario)
- `dermatoscopiaModulo` ocupa el slot de lectura de 10 min en las sesiones **pares d6→d40** = los 18 módulos del
  **DermNet Dermoscopy CME** (módulo n en d = 6 + 2(n-1); URLs bajo `dermnetnz.org/cme/dermoscopy-course/`, verificadas
  5-sep: introduction, dermoscopic-features, three-point-checklist, benign melanocytic, atypical naevi, melanoma, SK, BCC, SCC,
  other non-melanocytic, first-step algorithm, pattern analysis, other algorithms, report, naevi new classification, nail,
  dermatoscopic-histologic correlation, galería reticular). d42 = quizzes DermNet · d44 = imágenes comparativas. La lectura
  del módulo semanal queda en las impares.
- `dermatoscopiaImg` = **1 imagen dermatoscópica CIEGA por sesión** (paso ①b): *Dermoscopy: Illustrated Self-Assessment 2e*
  (AccessDerma book 2929) en las impares · página de Dermoscopedia por patrón/algoritmo en las pares (retículo, glóbulos,
  estrías, velo, vasos, chaos & clues, 2-step, 3 puntos, 7 puntos, Menzies, ABCD, tricoscopia, uña).
- `dermatoscopiaUrl` (panel de la lámina) poblado en 16 átomos (7/8 del módulo D).
- **Dermatoscopio de bolsillo para la fase práctica 2027** (DermLite o Heine de bolsillo; modelo y precio
  **A VERIFICAR (05-sep)** en las webs oficiales de DermLite y Heine antes de comprar; decisión de Joseph): sin él la
  dermatoscopia se queda en imágenes ajenas. Objetivo: adquirido antes del d45 (**jue 21-ene-2027**, v5.12; v5.10/v5.11: mar 19-ene) para usarlo en el
  checkpoint y en la fase post-Step 1.

### 3. Capa ATLAS completa (70/70) + los 22 X
- `morfologia · sitio · ddx · atlasUrl` en los 70 átomos (antes 10-12) y en los 22 X (antes 0): deep-links DermNet
  (`/topics/...`), Dermoscopedia, AccessDerma Animations/3D (#1457) y papers OA; ninguna imagen re-hosteada.
- `fototipo` en 7 átomos (eje piel de color) · `histoUrl` en 9 (dermpathatlas.com).

### 4. Ledger de casos y fallos (`src/lib/dermaLedger.ts`)
- localStorage `jmd-derma-casos` (todo) + `jmd-derma-fallos` (espejo: fallos + aciertos por suerte), esquema =
  `DATA/DERMATOLOGIA/TRACKING/_registro_derma.json` (`_meta` + `rondas[]`, 0 rondas al arrancar):
  `{ id, fecha, d, fuente caso|pictorial|core|barnhill|qotw|dermatoscopia|drill, acierto, moduloCORE, evalAcierto
  conocimiento|suerte|confusion|no-sabia, tipoError CCSN|CONCEPTO|MORFOLOGIA|DDX, descripcion8ejes 0-8, nota }`.
- Helpers: % fallo por módulo CORE y por bloque A-X, % ciego (solo aciertos seguros), tipo de error dominante,
  áreas flojas (→ re-drill d46), **gate del módulo A** (10 descripciones ≥6/8 con la rúbrica `DERMA_EJES_MORFOLOGIA`),
  `dermaCasosParaSegundaPasada()` (d69), export JSON (d70 → `_registro_derma.json`) e import/merge por uid.
- Regla Palmerton: la matriz confianza × acierto manda; "acerté por suerte" cuenta como fallo.

### 5. Anki (`src/lib/ankiLinks.ts`)
- `dermaAnkiDeck(bKey)` → `APEX::DERMA::<A..X>` (10 sub-decks, misma convención que ENCAPS/USMLE/MIR).
  **A VERIFICAR (05-sep): crear los 10 en Anki escritorio antes del d1.**
- Nota **Palmerton-Mecanismo** (FRENTE mecanismo → REVERSO `POR QUÉ · CCSN · FUENTE`) importable como Basic desde
  `DATA/DERMATOLOGIA/ANKI_COLA/PLANTILLA_SESION.txt` (cabecera TSV + 4 tarjetas reales de d19-d20); `dermaAnkiTsv()`
  genera el fichero de la sesión. **Image Occlusion nativo** (Anki ≥ 23.10) sobre captura personal de la lámina: uso
  privado, NO re-host (checklist `DERMA_OCLUSION_CHECKLIST`). Dermki queda como pista por bloque (`dermkiPista`).

### 6. Swap d19-20 ↔ d57-58 (contenido, no fechas de la franja) + puente Research
- **Fechas v5.12:** d19 = **vie 6-nov-2026** = **oclusión vascular + HDPH** · d20 = **mar 10-nov-2026** = **ceguera + kit de
  emergencia** (antes eran el contenido de d57/d58); "paciente agudo con fiebre y rash" y "pelo y uñas infecciosos" pasaron a
  d57 = mié 24-feb-2027 y d58 = vie 26-feb-2027 **y en v3 (taper, §13) viven en d44 = mar 19-ene-2027 y d45 = jue 21-ene-2027** (v5.12)
  como átomos ligeros de la ventana del examen. El swap es de CONTENIDO entre posiciones del plan: las posiciones y
  la cadencia interdiaria no se tocan, solo se re-fecharon con el corrimiento (v5.6: d19 27-oct · d20 29-oct · d57 12-feb ·
  d58 16-feb · v5.7: d19 29-oct · d20 2-nov · d57 16-feb · d58 18-feb · v5.8 = v5.9: d19 2-nov · d20 4-nov · d57 18-feb · d58 22-feb · v5.10 = v5.11: d19 4-nov · d20 6-nov · d57 22-feb · d58 24-feb).
- Motivo (revalidado contra los `.ts` el 16-sep; Research corre +2 hábiles en v5.13: ciclo 2 mié 17-feb → vie 20-ago-2027): SR-1 revalida su PICO de oclusión vascular / tiempo-a-hialuronidasa en
  **R6b = lun 15-feb-2027** (`researchDailyPlan2027.ts` d43), extrae datos en **R22-R25 = 14-abr → 28-abr-2027** (d64-d69) y
  hace los subgrupos tiempo-a-hialuronidasa en **R33 = 1-jun → 3-jun-2027** (d81-d82). La seguridad se estudia ANTES de
  revalidar y de extraer, con **>3 meses** de margen, y se cumple la regla "seguridad antes que técnica".
  *(Corrección v5.7, vigente en v5.10: la nota v2.1 citaba "R22-R25 (5-13 nov)" y "R33 (7-dic)" de una numeración de research anterior;
  esos códigos viven hoy en el CICLO 2 del plan de research, en 2027.)*
- `puenteResearch` en 8 átomos: L4/SR-1 en d19, d20, d48, d55 · L5/SR-2 en d4, d59, d61, d65 (chip "alimenta SR-1/SR-2").
  El chip inverso en R6/R22/R33 de `researchDailyPlan.ts` lo pone el agente de Research.

### 7. Cerebro clínico + simulador (`src/lib/dermaCerebro.ts`)
- **35 fichas** con los 7 pasos del SPEC §3 (causa → mecanismo → capa → decisión → no-errar → comunicación → hábito) +
  catástrofe/rescate + guion + fuentes verificadas + `verificar[]`: los 22 X (d19-20, d47-56, d59-68) y 13 CRIT clínicos
  (d5 danger zones · d7 psoriasis · d8 eccemas · d9 acné [plantilla §3.2] · d10 ampollosas · d12 farmacodermias ·
  d14 bacterianas · d16 virales · d18 parasitosis · d22 QA · d23 CBC/CEC · d24 melanoma · d44 cicatrización).
- **Drill "Oclusión vascular · 90 s"** (`DERMA_DRILL_HDPH`, 13 ítems; se ejecuta en d19/d20, d46 y d70): cada ítem marca su
  fuente y si está verificado. Verificado 5-sep contra el abstract de DeLorenzi 2017 (PMID 28333326: solo hialuronidasa en
  dosis altas repetidas **cada hora** hasta resolución por relleno capilar/color/sin dolor; sin pérdida de piel si <2 días)
  y el texto de Goodman 2020 (PMC7427155: grado 4 = glabela/nariz/frente; nariz 56,3 % · glabela 27,1 % · frente 18,8 %;
  **1500 UI en 2 mL de lidocaína 1 %** en el sitio + supratroclear a 14 mm de la línea media; retrobulbar solo con
  experiencia; no anticoagular; no aspirar; microbolos <0,1 mL; cánula no más segura en nariz; <25 G = aguja).
  **A VERIFICAR (05-sep)** en el texto completo de DeLorenzi 2017: las UI por área (~450/~900 del SPEC §2.4) y el
  criterio de parada; la "ventana de 90 min" NO aparece en Goodman 2020 (no se usa como cifra).

### 8. Nítida (`nitida` en 7 átomos B + d68)
- d7 psoriasis · d8 eccemas · d9 acné · d10 ampollosas (triaje) · d11 urticaria · d12 farmacodermias (derivación urgente) ·
  d13 conectivopatías (cribado) · d68 cosmecéutica: `{ protocolo, guion, seguimiento }` = consulta tipo tele-derma
  (foto estandarizada, rutina ≤3 pasos, revisión 6-8 sem, métrica IGA/PGA/UAS7/MASI). Doc de producto:
  `DATA/DERMATOLOGIA/NITIDA_PROTOCOLOS.md`. Toda dosis/concentración queda "A VERIFICAR" hasta cotejarla.

### 9. Qué queda fuera de esta versión (pendiente)
- TOC con `sectionid` de Fitzpatrick 9e (2570) / Barnhill 4e (2802) / Weinberg 5e (1913): 20 lecturas siguen apuntando a
  portada de libro → método CDP en `_scrape/README_TOC_PENDIENTE.md` (requiere la sesión UF en Chrome).
- ~~Componentes de UI (lámina con botón acierto/fallo, dictado de 8 ejes, tarjeta del cerebro en modo recitar, drill
  cronometrado, widget "Debilidades por módulo CORE" en el Hub)~~ → hecho, ver §10.

### 10. Cableado en la UI (5-sep-2026, tarde) — la capa Palmerton ya es visible el jueves 17-sep (d1 en v5.12 = v5.13; en v5.13 coincide con el D1 del régimen)
Cierra el vacío nº1 de la segunda pasada (gaps_v3b_derma: "toda la capa Palmerton es invisible para Joseph el lunes").
Nada de esto toca franjas, fechas, metas ni el Calendar; todo lee/escribe en `dermaLedger.ts` (localStorage `jmd-derma-*`).

**`src/components/study/DermaTodayPlan.tsx` (pestaña Caso de hoy)**
- Lámina: chips **"Caso #a · Medical" / "Caso #b · Peds…"** desde `casoIds` (área por `dermaCasoArea`, link al banco groupid 1546) con
  estado ✓/✗ del ledger y botón **registrar** → `DermaCasoRegistro` (matriz confianza×acierto → tipo de error CCSN/CONCEPTO/
  MORFOLOGIA/DDX → módulo CORE → 0-8 ejes → nota). Chips **"alimenta SR-1/SR-2"** (`puenteResearch`, despliega la nota),
  **"Nítida · protocolo"** (`nitida`: protocolo / guion / seguimiento) y **◆ Obsidian** (#A78BFA, `dermaObsUrlDay`).
- **① Dictado morfológico** (`DermaMorphologyDictation`, plegable, abierto por defecto): rúbrica de 8 ejes con chips + dictado +
  autoevaluación 0-8 → gate del módulo A (10 descripciones ≥6/8) visible con contador.
- **①b Imagen dermatoscópica ciega** (`dermatoscopiaImg`: Self-Assessment 2e impares · Dermoscopedia pares) con registro
  (fuente `dermatoscopia`).
- `DermaCerebroCard` (7 pasos, modo **recitar** oculto por paso + catástrofe/rescate + guion + mastery gate §6.3) cuando el átomo
  tiene ficha en `dermaCerebro.ts` (35: 22 X + 13 CRIT) · `DermaEmergencyDrill` (HDPH 90 s, resultado al ledger) en **d19/d20/
  d46/d70** · `DermaCheckpointPanel` en **d45/d46/d69/d70** (mapa de fallos, re-drill, 2ª pasada solo de fallos, plan post-Step 1).
- Cola de materiales: caso ciego (ids reales) → **review** (banco AccessDerma con registro de fallos por nº de pregunta, o
  **10Q MIR** en las sesiones d ≡ 0 mod 3, §11) → **lectura 10′** (módulo DermNet CME en las pares d6-d44; la lectura del módulo
  queda demotada "si sobra tiempo") → **ANKI** `APEX::DERMA::<bloque>` + pista Dermki + **cola de tarjetas de MECANISMO** de la
  sesión (`DermaAnkiCola`: FRENTE → POR QUÉ · CCSN · FUENTE, export TSV importable, checklist de oclusión) → **◆ Obsidian**
  (nota madre del átomo + índice del bloque, rama 10_DERMATOLOGIA) → **cierre 14:13** con NotebookLM (prompt "tarjeta de
  mecanismo verificada" copiado al portapapeles) y **⇩ Exportar ledger JSON** (resaltado los viernes).
- Anillo nuevo **% ciego** (solo aciertos "Lo sabía") junto a Global/Críticos/Board/Estética; 7 días y Temario marcan MIR/CME/
  drill/checkpoint/SR/Nítida y llevan ◆ Obsidian por átomo y por bloque.

**`src/components/study/DermaHub.tsx`**
- Pestaña nueva **Debilidades** = `DermaWeaknessWidget`: % ciego, % fallo Palmerton por módulo CORE (Med/Path/Peds/Surg) y por
  bloque A-X, tipo de error dominante + cura, gate A, drill HDPH, dermatoscopia ciega, casos de la 2ª pasada, **export JSON /
  import-merge por uid** (esquema de `TRACKING/_registro_derma.json`).
- Pestaña Fuentes: tarjeta **NotebookLM "DERMA · Élite Engine"** (`DERMA_NOTEBOOKLM`) + los 2 prompts de uso (tarjeta de
  mecanismo verificada · qué no sé del módulo X) con botón copiar. El anillo "Readiness 8 %" (hardcoded v1) pasa a **% ciego**
  real del ledger.

### 11. Segunda capa MIR: 10Q ProMIR-Dermatología en 1 de cada 3 sesiones (gaps_v3b_derma nº3 de MIR/Derma)
- En las sesiones **d ≡ 0 mod 3** (23: d3, d6 … d69) el slot "~10Q review" (13:52-14:03) pasa a las **10Q del test del capítulo
  ProMIR de Dermatología** (campo `promir` = `pm(PM_CAP.cN)`); el banco AccessDerma de ese día queda "si sobra tiempo".
- Rotación **por peso MIR histórico** (temario.md §2; slots ∝ peso, mínimo 1): cap 4 Oncología ×5 (d21, d24, d27, d60, d69) ·
  cap 2 Infecciosas ×4 (d15, d18, d48, d57) · cap 3 Sistémicas ×3 (d33, d51, d63) · cap 1 Conceptos ×3 (d3, d30, d54) ·
  cap 5 Eritematodescamativas ×2 (d39, d45) · cap 8 Toxicodermias ×2 (d12, d66) · cap 6 Ampollosas (d42) · cap 7 Glandular/
  urticaria (d9) · cap 9 Genodermatosis (d36) · cap 10 Dermatoscopia (d6) — cada uno en la sesión cuyo bloque más se acerca
  al capítulo (`PROMIR_DERMA_ROTACION`, `promirDermaCapDe`).
- Registro (`DermaMir10Q`) en **`mirEvalLog`** con kind nuevo compatible **`derma10Q`**, asignatura **'Dermatología'** (num 5),
  neto A − F/3, brecha knowledge/transfer/proceso + 🇪🇸 delta: cuenta en `mirStatsPorAsignatura` (la asignatura Dermatología del
  MIR se mide desde el bloque Derma) y NO en readiness, cierres ni cola D+14.
- Verificado por script (5-sep, re-verificado 12-sep sobre `DERMA_DIAS`): 70 átomos, fechas = slots derma interdiarios
  **d1 15-sep-2026 → d70 30-mar-2027** en v5.10/v5.11 (v5.12: d1 17-sep-2026 → d70 1-abr-2027; sáb/dom + 25-dic/31-dic/1-ene fuera; 0 fechas en finde, 0 en feriado),
  `remap_inicio.js` sigue casando (marker + 70 `fecha:` + META), casoIds = permutación, 23 `promir` alineados.
- **v3 (taper)**: la rotación es POSICIONAL (d ≡ 0 mod 3) y no se mueve con el contenido; al alargar el plan a 73 aparece
  un **24º slot en d72 (REPASO 1) = cap 4 Oncología** (×6: d21, d24, d27, d60, d69, d72). Los 2 slots que caen en el taper
  (d45 cap 5 · d48 cap 2) se mantienen: 10Q MIR no son lectura nueva y sostienen la señal MIR. En el ciclo 2 hay 10 slots
  más (d75…d102 = los 10 capítulos, uno cada uno, por peso). Re-verificado 12-sep: 73 átomos, 73 `fecha:`, META 73, 24 `promir`.

### 12. Índice de fechas v5.12 = v5.13 + taper v3 (re-fechado el 15-sep-2026; sin cambio el 16-sep) — los 73 átomos del ciclo 1

Leído de `src/lib/dermaDailyPlan.ts` → `DERMA_DIAS` (no estimado). d1 = **jue 17-sep-2026** ·
d73 = **vie 9-abr-2027** · 73 átomos · franja 13:30-14:15 · interdiario con Research (0 solapes, verificado
también contra `researchDailyPlan2027.ts`) · sáb+dom, 25-dic, 31-dic y 1-ene fuera. La numeración del módulo NO es
contigua porque el swap v2.1 (§6) y el taper v3 (§13) mueven CONTENIDO entre posiciones; en v5.12 todas las fechas
corren +1 slot interdiario respecto a v5.10/v5.11 (d1 mar 15-sep → jue 17-sep).

| Módulo | Átomos | Fechas (d = fecha real de `DERMA_DIAS`) |
|--------|--------|------------------------------------------|
| A · Fundamentos / morfología | 6 | d1 jue 17-sep · d2 lun 21-sep · d3 mié 23-sep · d4 vie 25-sep · d5 mar 29-sep · d6 jue 1-oct |
| B · Inflamatorias | 7 | d7 lun 5-oct · d8 mié 7-oct · d9 vie 9-oct · d10 mar 13-oct · d11 jue 15-oct · d12 lun 19-oct · d13 mié 21-oct |
| C · Infecciosas | 7 | d14 vie 23-oct · d15 mar 27-oct · d16 jue 29-oct · d17 lun 2-nov · d18 mié 4-nov · **d44 mar 19-ene-27 (taper)** · **d45 jue 21-ene-27 (taper)** |
| X · Estética (danger zones, toxina, rellenos, peelings, láser) | 22 | d19 vie 6-nov · d20 mar 10-nov · **d46 lun 25-ene-27 (contorno, taper)** · d53 vie 12-feb-27 · d54 mar 16-feb-27 · d55 jue 18-feb-27 · d56 lun 22-feb-27 · d57 mié 24-feb-27 · d58 vie 26-feb-27 · d59 mar 2-mar-27 · d60 jue 4-mar-27 · d61 lun 8-mar-27 · d62 mié 10-mar-27 · d63 vie 12-mar-27 · d64 mar 16-mar-27 · d65 jue 18-mar-27 · d66 lun 22-mar-27 · d67 mié 24-mar-27 · d68 vie 26-mar-27 · d69 mar 30-mar-27 · d70 jue 1-abr-27 · d71 lun 5-abr-27 |
| D · Tumores + dermatoscopia | 8 | d21 jue 12-nov · d22 lun 16-nov · d23 mié 18-nov · d24 vie 20-nov · d25 mar 24-nov · d26 jue 26-nov · d27 lun 30-nov · d28 mié 2-dic |
| E · Dermatopatología | 5 | d29 vie 4-dic · d30 mar 8-dic · d31 jue 10-dic · d32 lun 14-dic · d33 mié 16-dic |
| F · Pediátrica / genodermatosis | 5 | d34 vie 18-dic · d35 mar 22-dic · d36 jue 24-dic · d37 lun 28-dic · d38 mié 30-dic |
| G · Quirúrgica | 6 | d39 mar 5-ene-27 · d40 jue 7-ene-27 · d41 lun 11-ene-27 · d42 mié 13-ene-27 · **d43 vie 15-ene-27 (Mohs; día del NBME 31 — sesión normal)** · **d50 jue 4-feb-27 (cicatrización, post-examen)** |
| H · Checkpoints + segundas pasadas parciales (taper) | 5 | **d47 mié 27-ene-27 · d48 vie 29-ene-27 · d49 mar 2-feb-27 (parciales, taper)** · d51 lun 8-feb-27 (cp1) · d52 mié 10-feb-27 (cp2) |
| Z · Repaso final | 2 | d72 mié 7-abr-27 · d73 vie 9-abr-27 |

**Hitos re-fechados (v5.6 → v5.7 → v5.8 = v5.9 → v5.10 = v5.11 (v3 taper) → v5.12 = v5.13)** — desde v3 el hito se identifica por CONTENIDO, no por d.

| Hito (contenido) | v5.6 | v5.7 | v5.8 = v5.9 | v5.10 = v5.11 (v3 taper) | **v5.12 = v5.13 (vigente)** |
|------|------|------|-------------|--------------------------|---------------------|
| arranque (lesiones elementales) | d1 lun 7-sep-2026 | mié 9-sep | vie 11-sep | d1 mar 15-sep | **d1 · jue 17-sep-2026** |
| oclusión vascular + HDPH (drill) | d19 27-oct | jue 29-oct | lun 2-nov | d19 mié 4-nov | **d19 · vie 6-nov-2026** |
| ceguera por relleno + kit (drill) | d20 29-oct | lun 2-nov | mié 4-nov | d20 vie 6-nov | **d20 · mar 10-nov-2026** |
| Mohs + control de márgenes (último G antes del taper) | — | — | — | d43 mié 13-ene-2027 | **d43 · vie 15-ene-2027 (día del NBME 31; sesión normal — swap con el taper = decisión de Joseph)** |
| cicatrización + complicaciones qx (cierre G) | d44 | — | — | d50 mar 2-feb-2027 | **d50 · jue 4-feb-2027** |
| paciente agudo con fiebre y rash | d57 12-feb-2027 | mar 16-feb | jue 18-feb | d44 vie 15-ene-2027 (taper) | **d44 · mar 19-ene-2027 (taper)** |
| pelo y uñas infecciosos | d58 16-feb-2027 | jue 18-feb | lun 22-feb | d45 mar 19-ene-2027 (taper) | **d45 · jue 21-ene-2027 (taper)** |
| contorno corporal + escleroterapia | d66 | — | — | d46 jue 21-ene-2027 (taper) | **d46 · lun 25-ene-2027 (taper)** |
| segundas pasadas parciales I · II · III (nuevas) | — | — | — | d47 lun 25-ene · d48 mié 27-ene · d49 vie 29-ene-2027 | **d47 mié 27-ene · d48 vie 29-ene (D94 Step 1, última sesión de banco) · d49 mar 2-feb-2027 (v5.13: DÍA DEL EXAMEN Step 1, opcional)** |
| Checkpoint 1 (mapa de fallos por módulo CORE) | d45 11-ene-2027 | mié 13-ene | vie 15-ene | d51 jue 4-feb-2027 | **d51 · lun 8-feb-2027** |
| Checkpoint 2 (re-drill + HDPH) | d46 13-ene-2027 | vie 15-ene | mar 19-ene | d52 lun 8-feb-2027 | **d52 · mié 10-feb-2027** |
| Anatomía facial 3D (primer átomo X post-examen) | d47 | — | — | d53 mié 10-feb-2027 | **d53 · vie 12-feb-2027** |
| Toxina I | d50 | — | — | d56 jue 18-feb-2027 | **d56 · lun 22-feb-2027** |
| Ciencia cosmecéutica (cierre X, LANGE) | d68 | — | — | d71 jue 1-abr-2027 | **d71 · lun 5-abr-2027** |
| Repaso 1 · 2ª pasada FSRS solo de fallos | d69 18-mar-2027 | lun 22-mar | mié 24-mar | d72 lun 5-abr-2027 | **d72 · mié 7-abr-2027** |
| Repaso 2 · mapa final + arranque del ciclo 2 | d70 lun 22-mar-2027 | mié 24-mar | vie 26-mar | d73 mié 7-abr-2027 | **d73 · vie 9-abr-2027** |

Los 4 paneles de checkpoint (`DermaCheckpointPanel`) y los 4 drills HDPH (`DermaEmergencyDrill`) siguen en los MISMOS
átomos de CONTENIDO; sus d cambian: checkpoints **d51/d52/d72/d73** (`DERMA_CHECKPOINTS`, `DERMA_CHECKPOINT_DIAS_V3`) y
drills **d19/d20/d52/d73** (`DERMA_DRILL_DIAS_V3`). Mapa completo d(v2.1) → d(v3) en `DERMA_TAPER_REMAP_D` (`dermaDNuevo`).

### 13. Taper de examen (v3 · 12-sep-2026 · gaps_v3b_derma nº2)

**Regla (Palmerton, "taper antes del examen"):** *ningún átomo CRIT nuevo a ±3 días hábiles de un examen mayor*, y en la
semana del examen **solo repaso FSRS + 1 caso**. Con las fechas v5.10, entre el NBME 31 (vie 15-ene-2027, GO/NO-GO) y el
examen Step 1 (vie 29-ene-2027) caían — calculado con node, no estimado — **6 sesiones Derma**: d44 15-ene (Cicatrización,
CRIT, el mismo día del NBME 31), d45 19-ene y d46 21-ene (checkpoints, en la semana de NBME 32/33 + FREE 120), d47 25-ene
(Anatomía 3D, CRIT), d48 27-ene (Arterias, CRIT, D95 de Step 1 en v5.10 — D94 = D-2 en v5.11) y d49 29-ene (Envejecimiento, **el día del examen**).

> **v5.12 (15-sep) = v5.13 (16-sep):** el taper es **posicional** (d44-d49, `DERMA_DAILY_META.taperStep1` = 2027-01-19 → 2027-02-02) y Derma corrió +1 slot en v5.12 (en v5.13 no se mueve), así que la
> ventana taper queda **mar 19-ene · jue 21-ene · lun 25-ene · mié 27-ene · vie 29-ene (D94 = última sesión de banco del Step 1) · mar 2-feb (v5.13: DÍA DEL EXAMEN Step 1; el lun 1-feb = D95 = D-1 es día Research)**
> y el **vie 15-ene (NBME 31) es d43 = Mohs, sesión NORMAL de 2 casos** (queda fuera del taper: el NBME 31 no es "el examen"; la regla ±3 hábiles se aplica al
> examen mayor del 2-feb, y d47-d49 la cumplen). Alternativa registrada en `DATA/PENDIENTES_JOSEPH.md` (decisión de Joseph): swap d43↔taper
> (Mohs al mar 2-feb, y el 15-ene en modo taper). La tabla siguiente conserva las fechas v5.10/v5.11 con las que se diseñó el swap; las vigentes están en §12.

**Solución = swap de CONTENIDO con fechas intactas** (mismo precedente que el swap v2.1 d19/20↔d57/58):

| d · fecha | Antes (v2.1) | Ahora (v3, `taper: {modo:'step1'}`) |
|---|---|---|
| d44 vie 15-ene (NBME 31) | Cicatrización (G, CRIT) | **Paciente agudo con fiebre y rash** (C, MED; antes d57) — 1 caso + FSRS + lectura ligera |
| d45 mar 19-ene (NBME 32) | Checkpoint 1 | **Pelo y uñas infecciosos** (C, MED; antes d58) — 1 caso + FSRS + lectura ligera |
| d46 jue 21-ene (NBME 33) | Checkpoint 2 | **Contorno corporal + escleroterapia** (X, MED; antes d66) — 1 caso + FSRS + lectura ligera |
| d47 lun 25-ene (semana del examen) | Anatomía 3D (X, CRIT) | **Segunda pasada parcial I** (nueva, H): 1 caso + FSRS de fallos A-D · 0 lectura |
| d48 mié 27-ene (D94 Step 1 = D-2; D95 en v5.10) | Arterias (X, CRIT) | **Segunda pasada parcial II** (nueva, H): 1 caso + FSRS de fallos E-G + drill HDPH mental · 10Q MIR cap 2 |
| d49 vie 29-ene (EXAMEN) | Envejecimiento (X, ALTA) | **Segunda pasada parcial III** (nueva, H): **sesión OPCIONAL** — si se salta no se pierde nada |

Todo lo desplazado se corre DESPUÉS del examen **en el mismo orden**: d50 Cicatrización → d51/d52 Checkpoints → d53 Anatomía
3D → d54 Arterias → d55 Envejecimiento → d56-d59 Toxina I-IV → d60-d63 Rellenos I-IV → d64-d65 Peelings → d66-d69 Láser I-IV →
d70 Microneedling → d71 Cosmecéutica → d72/d73 Repasos. **0 átomos perdidos** (verificado con node contra el HEAD del 12-sep:
los 70 subtemas, las 70 lecturas y las 70 láminas siguen; CRIT 27 y ALTA 35 intactos; solo suben los MED de 8 a 11 por las 3
parciales nuevas) y el plan se alarga de 70 a **73** sesiones (fechas v5.10/v5.11: d71 jue 1-abr · d72 lun 5-abr · d73 mié 7-abr-2027; **v5.12: d71 lun 5-abr · d72 mié 7-abr · d73 vie 9-abr-2027**), con paridad
Research intacta. El "modo taper" en la fila = `taper` (motivo + nota), `casoIds` de 1, `qbankly: rFALLOS` (0 preguntas
nuevas) y `extra: null` en las parciales; la UI muestra "semana de examen: solo FSRS + 1 caso". Lo posicional (micro-track
DermNet en d44, rotación ProMIR d45/d48, alternancia impar/par de la imagen dermatoscópica) NO se movió con el contenido.

**ENCAPS 2027-I**: la fecha real del examen aún no está fijada ("fines de marzo"; **A VERIFICAR (12-sep)**, decisión de Joseph).
Cuando se fije, `DERMA_TAPER_ENCAPS_FECHA` en `dermaDailyPlan.ts` activa `modo:'encaps'` en las sesiones a ±3 días hábiles
(`dermaTaperEfectivo`, `dermaVentanaTaper`) sin tocar filas ni fechas; con d72/d73 ya en abril, hoy ningún átomo del ciclo 1
cae en "fines de marzo" salvo d67-d70 (láser II-IV, microneedling — ALTA/CRIT), que serían los candidatos si el examen
cae en la semana del 22-26 de marzo.

### 14. Presupuesto de preguntas por banco + cursor (v3 · gaps_v3b_derma nº5)

La rotación v2.1 sobreasignaba el Pictorial 4e (43 sesiones × ~10Q = 430 > 381Q) y dejaba sin uso el Pictorial 3e y LANGE.
Presupuesto real leído de `DERMA_DIAS` (`dermaPresupuestoBancos()`, 12-sep):

| Banco (`fuente` del ledger) | Q disponibles | Sesiones ciclo 1 | Q asignadas | Quedan para el ciclo 2 | Dónde |
|---|---|---|---|---|---|
| Pictorial Review 4e (`pictorial`, qa 3626) | 381 | **38** | 380 | 1 | d1…d66 (se agota en d66) |
| Pictorial Review 3e (`pictorial3`, qa 2948) | 363 | **4** | 40 | 323 | d67 · d69 · d70 · d72 (relevo) + ciclo 2 (14 sesiones) |
| CORE Exam Bank (`core`, qa 3479) | 104 | 8 | 80 | 24 | cierres de módulo (d6 d13 d20 d28 d33 d38 d50 d52) + cp2 del ciclo 2 |
| Barnhill's Challenge (`barnhill`, qa 2865) | 403 | 14 | 140 | 263 | dermpath D/E y alternancia en X + ciclo 2 (13 sesiones) |
| Question of the Week (`qotw`, qa 3562) | 50 | 2 | 20 | 30 | d51 (cp1) · d73 (repaso 2) + checkpoints del ciclo 2 |
| LANGE Clinical Dermatology Cases (`lange`, gboscontainerid 258) | 48 | 1 | 10 | 38 | d71 (cierre del módulo X) |
| — TAPER (`rFALLOS`, sin preguntas nuevas) | — | 6 | 0 | — | d44-d49 |

**Cursor**: cada link `qa.aspx` abre el banco desde el principio; `dermaBancoCursor(fuente)` = max(id)+1 de las entradas del
ledger de ese banco (`dermaBancoCursorDeUrl(url)` lo resuelve desde el link de la fila) → el ítem de review muestra
**"retoma en Q#"** y `agotado` cuando el cursor supera el total. `dermaBancoCursores()` alimenta el widget de Debilidades.

**Cura obligatoria**: si en la última sesión registrada hubo un fallo con `tipoError: 'CCSN'`, `dermaCuraPendiente()` devuelve
el **Differential Diagnosis Challenge (cases 1616)** como cura OBLIGATORIA de la siguiente sesión (3 pares del bloque + tabla
comparativa + oclusión del rasgo discriminador), con los ids de los casos/preguntas que la originan; otros tipos devuelven su
cura recomendada (`DERMA_CURA_LINK`: DDX → DD Challenge · MORFOLOGÍA → DermNet terminology · CONCEPTO → Fitzpatrick).
`dermaCuraAplicaA(dia)` dice si toca hoy (la sesión es posterior a la del fallo).

### 15. Sinergia Step 1 ↔ Derma (v3 · gaps_v3b_derma nº6)

"La derma de Step 1 cuenta doble" ahora es un mecanismo: `step1: true` en los **8 átomos** que el USMLE vuelve a preguntar —
**d7 psoriasis · d8 eccemas · d10 pénfigo/penfigoide · d12 SJS/TEN/DRESS · d14 bacterianas · d16 HSV/VZV/VPH · d23 BCC/SCC ·
d24 melanoma** (`DERMA_STEP1_DIAS`). Sus tarjetas van al MISMO mazo FSRS con el tag `step1` (lo añade `dermaAnkiTags` —
pendiente del agente de ankiLinks) y HOY muestra el chip "cuenta doble Step 1". En sentido inverso, **d12 y d24** llevan
`anclajeStep1` hacia el día "dermato Step 1" del plan USMLE (**D73, mar 29-dic-2026** en v5.13, bloque MSK/Reuma) y a la sección de
First Aid correspondiente — **página A VERIFICAR (12-sep)**: la sección de FA no consta en el repo. El lado USMLE (que D73
apunte a `APEX::DERMA tag:step1` + fallos del ledger de esos 8 átomos) lo cablea el agente de USMLE.

### 16. Ciclo 2 (v3 · gaps_v3b_derma nº8) — `src/lib/dermaCiclo2.ts`, generado por `DATA/_scripts/gen_derma_ciclo2.js`

Decisión codificada (cierra la contradicción "5 casos/sesión desde feb" de `DERMA_CASO_META` vs filas a 2):

- **Cadencia**: 2 casos/sesión (d1-d43) · 1 en el taper (d44-d49) · **3 desde d50** → 164 casos al d73; los **36 restantes**
  a 3/sesión en **d74-d85** (v5.12: mar 13-abr → jue 13-may-2027) → primera pasada de los 200 completa en d85.
- **Ciclo 2 = 30 sesiones, d74-d103, v5.12: mar 13-abr → vie 2-jul-2027** (regenerado el 15-sep; v5.10/v5.11: vie 9-abr → mié 30-jun), misma franja interdiaria (0 solapes con
  `researchDailyPlan2027.ts`, verificado por el generador), misma clave de progreso `derma` (numeración continua), mismas filas
  `DiaDerma` (+ `ciclo: 2`, `tipo: 'casos' | 'fsrs' | 'checkpoint'`, `gplus`).
  - d74-d85 `casos`: 3 casos ciegos nuevos + review · d86-d103 `fsrs`: SOLO fallos del ledger (0 casos nuevos).
  - **Review**: Pictorial 3e ⇄ Barnhill restante (14 + 13 sesiones, retomando en el Q# del cursor); QOTW en cp1/repaso2 y CORE en cp2.
  - **1 módulo G+ por semana** en el slot de lectura (`DERMA_GAP_MODULOS` de `dermaData.ts`, primera sesión Derma de cada semana):
    G+1 d74 · G+2 d75 · G+3 d77 · G+4 d80 · G+5 d82 · G+6 d87 · G+7 d90 · G+8 d92 · G+9 d95 (`DERMA_CICLO2_GPLUS_DIAS`).
  - **Checkpoints**: cp1 d85 (jue 13-may, fin de la primera pasada) · cp2 d94 (mar 8-jun, re-drill + drill HDPH) · repaso2 d103 (vie 2-jul,
    mapa final + drill + plan de la fase práctica) — fechas v5.12 = v5.13 leídas de `DERMA_DIAS_CICLO2` con node el 15-sep y re-verificadas el 16-sep. 10Q ProMIR en d ≡ 0 mod 3 (10 slots = 10 capítulos por peso).
- **Helpers**: `dermaDiaDeConCiclo2(fechaISO)` (fallback al ciclo 2), `dermaDiaPorD(d)`, `dermaCicloDe(d)`, `DERMA_DIAS_TODOS`,
  `dermaVentana7Todos`, `dermaGplusDe(dia)`, `DERMA_CICLO2_META` (`dOffset: 73`). Tras un corrimiento: `remap_inicio.js <fecha>`
  → `node DATA/_scripts/gen_derma_ciclo2.js` (sin fecha arranca en el primer día-Derma tras `DERMA_DAILY_META.fin`).
- Fuera del ciclo 2 (fase práctica 2027): dermatoscopio de bolsillo, Nítida y la ruta al fellowship (`RUTA_FELLOWSHIP_ESTETICO.md`).
