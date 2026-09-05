# RUTA DE PUBLICACIÓN 2027 — Dermatología · IMG peruano → Mayo Clinic

Del agente macro:research-publicaciones (27-ago-2026). Progresión de 12 meses
(case report → carta → revisión sistemática), revistas con datos verificados en DOAJ,
estándares CARE/PRISMA, y cómo se conecta con las líneas **L0-L8** de
[`src/lib/researchProgram.ts`](../../src/lib/researchProgram.ts) — este doc NO reemplaza el
programa de líneas: le pone el calendario editorial encima.

## 1. La realidad del Match en derma (datos NRMP 2026, PDF oficial)

- 602 plazas · 1.099 aplicantes que la prefirieron · **solo 30 IMGs no-US aplicaron y
  matchearon 5 (~17%)**.
- Los IMGs no-US que NO matchearon tenían mediana de **Step 2 CK 253, 12 publicaciones,
  8.5 presentaciones** — el volumen sin scores NO compensa → **proteger el bloque Step 1
  hasta ene-2027 es la decisión correcta**.
- Matiz bibliométrico: entre 1.152 matched (Cureus 2020), mediana de solo **2 publicaciones
  VERIFICADAS y h-index 0** (24% sin ninguna) — lo autoreportado en ERAS infla con
  abstracts/posters. Texas STAR: matched ~7.77 publicaciones (2023) → 5.55 (2024).
- Predictores para IMG en derm (Dermatol Online J 2019): USMLE alto + volumen de
  investigación + cartas de dermatólogos + rotaciones en EE.UU. NY/MA/CA concentran IMGs.
- **Mayo Clinic (MN)**: 8 plazas/año, ingreso PGY-2 (exige año preliminar), deadline ERAS
  ~24-sep, 3 cartas (una obligatoria de un dermatólogo con quien trabajaste), ~60
  entrevistados; énfasis explícito en **scholarly activity**; facultad con aesthetic derm.
- El peaje real para Mayo-tier: **research fellowship presencial 1-2 años en EE.UU.**
  (Mayo, MGH/BWH, NYU, Northwestern, Cleveland Clinic), mayormente NO pagado
  (presupuestar US$30-50k/año) — planificarlo para **2028**.

## 2. Orden de artículos desde cero (escalera de dificultad)

1. **Carta al editor / comentario** — sin paciente ni datos, 500-1.000 palabras, cuenta como
   peer-reviewed en ERAS, enseña el ciclo editorial completo. Primera victoria en 1-2 meses.
2. **Case report** — alcanzable desde Perú con caso propio (hospital/SERUMS), fotos de calidad
   y consentimiento escrito; requiere mentor dermatólogo local como senior author. **Realidad 5-sep-2026**: no hay
   consulta propia ni SERUMS → el caso sale del Dr. Ciro (fuente A) o de un colega SPD (fuente B); carpeta operativa
   [`CASE_REPORT_1/`](CASE_REPORT_1/) (candidatos · consentimiento ES/EN · protocolo de fotos · CARE 13); fecha límite
   para tener caso + consentimiento + senior author: **31-oct-2026**.
3. **Revisión sistemática / scoping** — el mejor vehículo REMOTO: sin pacientes, colaborativa,
   6-12 meses. Elegir un gap que apunte a la meta: **derm estética en fototipos IV-VI /
   población latina** (complicaciones de rellenos, láser en piel oscura) → alinea el CV con la
   facultad de aesthetic derm de Mayo **y es exactamente el territorio de L4 (PERÚ-SAFE,
   activa) y L5 (energía en fototipos IV-VI)**.
4. **Estudios bibliométricos / bases públicas** (Texas STAR, NRMP, Google Trends, GBD) —
   rápidos, sin IRB complejo.

## 3. Revistas concretas (verificadas en DOAJ)

| Revista | APC | Indexación | Tiempo | Rol |
|---------|-----|------------|--------|-----|
| **Dermatology Online Journal** (eScholarship/UC) | ≤ US$300 | MEDLINE | ~6 semanas | **La más costo-eficiente para arrancar** — case report #1 va aquí |
| **JAAD Case Reports** (Elsevier, OA, CC BY) | US$850 (DOAJ, act. 1-sep-2026 — re-verificado 5-sep-2026; Grupo B → ≈ $425) | PubMed/Scopus | ~24 semanas | La marca más valiosa en derm — reservar para el MEJOR caso |
| **Cureus** | US$0 (si cumples guías; puede imponer "Preferred Editing" pagado) | PubMed Central | días | ⚠ Deslistada de Web of Science oct-2025 (sin IF, retractaciones) → **solo táctica: máximo 1-2 ítems del CV, nunca la mayoría** |
| International Journal of Dermatology (Wiley/ISD) | vía suscripción, sin costo | MEDLINE, IF ~3-4 | — | Amistosa con autores internacionales; case reports suelen entrar como correspondencia. ⚠ Verificación directa bloqueada (403) — **confirmar políticas por correo antes de someter** |
| Alternativas | — | — | — | JAAD International · Case Reports in Dermatology (Karger) · revistas CILAD/latinoamericanas para primeros intentos |

### 3.1 Presupuesto research 2026-27 (verificado 5-sep-2026; re-verificar cada 1-jul)

> Reconciliación de cifras (Palmerton v3, vacío 11): **JAAD Case Reports = US$850** (DOAJ, registro actualizado
> 1-sep-2026, consultado vía API el 5-sep-2026; el "$750" de `journals.md` estaba desactualizado y se corrigió);
> **JAAD International = US$2.575** de lista (DOAJ, 1-sep-2026). La página de precios de Elsevier
> (<https://www.elsevier.com/about/policies-and-standards/pricing>, leída 5-sep-2026) confirma la política:
> *"When publishing in fully open access journals, we fully waive all APCs for authors from 69 countries (Group A) and
> give a 50% discount for authors from 57 countries (Group B)"* y *"Our waiving policy does not apply to hybrid
> journals. Authors publishing in hybrid journals can publish under the subscription model at no cost"*. Perú = Grupo B
> (Research4Life; `journals.md`). El Excel oficial de APC de Elsevier
> (<https://legacyfileshare.elsevier.com/els_com_pricing/article-publishing-charge.xlsx>) no se pudo leer con las
> herramientas → **A VERIFICAR (5-sep)** el importe exacto de JAAD Intl/JAAD CR en ese fichero el día del envío.
> Elsevier aplica además la tabla **GPOA** ("Geographical Pricing for Open Access", basada en Banco Mundial 1-jul-2026):
> upper-middle-income grupo 1 = 45 % del precio de lista, grupo 2 = 65 %; el grupo de Perú **A VERIFICAR (5-sep)** —
> en "rights & access" el sistema muestra el precio final; si difiere del 50 % de Grupo B, pedir el menor.

| Entregable (fecha objetivo) | Journal primario | APC verificado (fecha · fuente) | Descuento aplicable (Perú, Grupo B) | Plan B a $0 | Edición en inglés | Total estimado |
|---|---|---|---|---|---|---|
| **1. Carta al editor** (envío oct-2026) | JCD o JAAD (híbridas; elección en `CARTA_1/candidatos.md` C-2) | **$0** — Notes & Comments / Letters por la vía de suscripción (Elsevier: "no cost" en híbridas, 5-sep-2026; Wiley híbrida = solo paga quien elige OA, `journals.md`) | n/a | JAAD International N&C (fully OA → posible APC para cartas: **A VERIFICAR**) | $0 (mentor Rising Scholars / revisión propia) | **$0** |
| **2. Tesis L0 → research letter** (envío feb-2027) | **JAAD International** (fully OA) | **US$2.575** (DOAJ, act. 1-sep-2026) | 50 % Research4Life Grupo B → **≈ US$1.288** (o 45-65 % del precio de lista si aplica GPOA — A VERIFICAR) | **IJD** (híbrida Wiley, suscripción = $0) → **Actas Dermo-Sifiliográficas** (`journals.md` dice Diamond $0 cubierto por la AEDV, pero DOAJ (1-sep-2026) lista **US$1.870** y la guía de autores no cita importe → **discrepancia A VERIFICAR (5-sep)** en la página "Open Access" de la revista antes de contar con $0) → **Anais Brasileiros de Dermatologia** (**$0 verificado 5-sep-2026**: "The Brazilian Society of Dermatology currently funds the APC for all articles accepted", <https://www.anaisdedermatologia.org.br/en-open-access>, CC BY) | $0 con mentor Rising Scholars (`MENTORES.md`); si no hay mentor a tiempo, servicio de edición **US$200-400** (MANUAL §10.1) | **$0** por la cascada sin APC · **≈ US$1.288 (+$0-400)** si se paga JAAD Intl |
| **3. Case report #1** (envío feb-mar 2027) | **Dermatology Online Journal** (eScholarship/UC, MEDLINE) | **US$300** (DOAJ, act. 1-sep-2026: "has APC true, max $300 USD", sin waiver); sin tasa de envío ni de revisión (guía DOJ, 5-sep-2026) | ninguno | IJD Correspondence (suscripción, $0) · JAAD Case Reports **$850 → 50 % = $425** (no es $0; solo para el MEJOR caso) | $0 | **≤ US$300** |
| **4. Registro PROSPERO SR-1** (mar-abr 2027) | PROSPERO (NIHR) | registro **gratuito** (A VERIFICAR (5-sep) en la web el día del registro) · Rayyan: cribado básico gratis (`DATA/CALIDAD/Research.md`) | n/a | — | — | **$0** |
| **5. SR-1** (envío jul-sep 2027) | **Dermatologic Surgery** (híbrida, Wolters Kluwer) | **$0** por suscripción (híbrida) | n/a | JAAD (híbrida, $0) → JAAD International (≈ $1.288 con Grupo B) | $0 (coautores IMG / mentor) o $200-400 | **$0** (techo $1.288 si termina en JAAD Intl) |
| **TOTAL 2026-27** | | | | | | **Base US$300 · techo ≈ US$1.988** (300 + 1.288 + 400). Se pone por escrito para que ningún envío se bloquee en "rights & access". |

Recordatorio en Google Calendar creado el 5-sep-2026: **1-jul-2027 09:00-09:15 (Lima) "Re-verificar Grupo Research4Life
Perú (APC)"** (con las 4 URLs a comprobar en la descripción). La clasificación del Banco Mundial cambia cada 1 de julio.

## 4. Estándares metodológicos (los reviewers los exigen)

- **CARE** (13 ítems + CARE-writer online) en TODO case report: [care-statement.org](https://www.care-statement.org/)
- **PRISMA 2020** (27 ítems + flow diagram; PRISMA-ScR para scoping) + registro en **PROSPERO**
  en toda revisión sistemática: [prisma-statement.org](https://www.prisma-statement.org/)
- Herramientas: **Rayyan** (screening gratis) · **Zotero** · EQUATOR Network · **ORCID desde el día 1**.
- Verificar cada afirmación clínica contra fuente primaria antes de someter (misma regla
  anti-alucinación del motor de preguntas ENCAPS).

## 5. Cómo conseguir colaboraciones y mentores

1. **Senior author local PRIMERO**: dermatólogo peruano vía Sociedad Peruana de Dermatología /
   CILAD — imprescindible para el case report. **Registro de contactos y mensajes**: [`MENTORES.md`](MENTORES.md)
   (Dr. Ciro: 3 coautorías · Rising Scholars/AuthorAID: mentor · Finlay: 6 líneas CADI — redactados el 5-sep-2026,
   pendientes de envío por Joseph en septiembre).
2. **Cold emails hiperpersonalizados** a autores de papers recientes ofreciendo trabajo
   concreto y verificable (screening PRISMA, extracción de datos, draft) — nunca "quiero
   experiencia". Campaña de 20-30 correos en feb-mar 2027.
3. **DIGA** (Dermatology Interest Group Association — tiene comité IMG y mentoría) ·
   **Skin of Color Society** · Women's Dermatologic Society · #DermTwitter/X + ResearchGate.
4. Sumarse como colaborador a revisiones sistemáticas multicéntricas de otros IMGs.
5. Congresos con abstract alcanzable: **AAD, CILAD, RADLA** (las presentaciones cuentan como
   ítems separados en ERAS).

## 6. Progresión 12 meses (sep-2026 → ago-2027)¹

| Meses | Qué | Línea del repo |
|-------|-----|----------------|
| M1-2 (sep-oct 2026) | ORCID + Zotero · leer CARE + 10 case reports de JAADCR/DOJ · escribir **1 carta al editor** (respuesta a artículo 2026 de JAAD/IJD) · identificar 1-2 casos peruanos con consentimiento | transversal |
| M3-4 (nov-dic 2026) | **Case report #1** con mentor local → someter a DOJ | L4 si es complicación estética; si no, el mejor caso disponible |
| M5 (ene-2027) | **PAUSA TOTAL — examen Step 1** | — |
| M6-7 (feb-mar 2027) | Protocolo de **revisión sistemática** en derm estética (registrar en PROSPERO) · reclutar 2-3 coautores IMG · campaña de cold emails | **SR-1 (L4)** o **SR-2 (L5)** — las líneas ACTIVAS del programa |
| M8-10 (abr-jun 2027) | Ejecutar SR · case report #2 · 1 estudio bibliométrico · abstracts a AAD/CILAD/RADLA | L4/L5 + transversal |
| M11-12 (jul-ago 2027) | Someter SR · balance | — |

**Balance realista a ago-2027**: 4-5 publicaciones + 2-3 abstracts + red de 1-2 mentores US +
decisión informada sobre research fellowship presencial 2028.

## 7. Conexión con las líneas L0-L8 (sin contradecirlas)

- **L0** (Acné & QoL, tesis, completada) → su SR derivable (instrumentos CADI/DLQI en LMIC,
  SR-4) es el plan B si la SR estética se atasca: la data ya existe.
- **L4 PERÚ-SAFE (activa)** → candidata #1 para la SR del M6-7: complicaciones de inyectables
  en fototipos IV-VI = el nicho exacto que el agente recomienda para diferenciarse ante Mayo.
- **L5 (energía RF/CO₂ en fototipos IV-VI)** → candidata #2 (SR-2); mismo argumento.
- **L1/L2/L3/L7** (topografía, análisis facial, reología, toxina) → cantera de cartas al editor
  y case reports estéticos conforme avancen a protocolo.
- **L8 (telederma & IA)** → los estudios bibliométricos/bases públicas del M8-10 pueden
  colgarse aquí sin IRB.
- El **mayoScore** del programa ya prioriza por afinidad Mayo — esta ruta no lo cambia; le
  añade el vehículo editorial y las fechas.

## 8. Pendientes de verificación manual

- Confirmar por correo las políticas de case report y de correspondencia del **International Journal of
  Dermatology** — correo **redactado (no enviado)** en [`CARTA_1/candidatos.md`](CARTA_1/candidatos.md) §4; falta la
  dirección de la Editorial Office (A VERIFICAR en la página de Wiley).
- Confirmar requisitos IMG/visa del programa de Mayo (**mayo.derm@mayo.edu**) — la página
  bloqueó la verificación automática.
- Leer **en la página** (no en fragmentos de buscador) la ventana temporal y los límites de cartas de JAAD, JCD y
  Dermatologic Surgery el día de C-2 (URLs en `CARTA_1/candidatos.md`); las guías devolvieron 403/402 el 5-sep.
- **Actas Dermo-Sifiliográficas**: ¿Diamond $0 (AEDV) o APC US$1.870/1.900 EUR (DOAJ)? — resolver antes de contar con
  ese escalón a $0 en la cascada de la tesis.
- Importe exacto de JAAD Intl / JAAD CR en el Excel de APC de Elsevier y grupo GPOA de Perú (§3.1).
- Dr. Ciro: aceptación de las 3 coautorías + vía CEI de la tesis (`MENTORES.md`, `TESIS_L0/etica.md`).

## 9. Mesa editorial (5 entregables · estado vivo)

> Un solo sitio para ver qué entregable está atrasado. Vocabulario de estado: `idea · borrador · revisión-mentor ·
> enviado · en-revisión · revisión-mayor · aceptado · publicado` (el mismo que usará `RESEARCH_ENTREGABLES` en la app).
> `remap_inicio.js` mueve átomos, **no** estos hitos: las fechas objetivo se cambian aquí a mano y, cuando haya fecha
> de envío fijada, se añade el overlay naranja en el Calendar (como los hitos NBME). Actualizar la fila cada vez que
> cambie el estado (mismo día).

| id | Entregable | Tipo / guía | Cascada de revistas | Senior author · mentor (`MENTORES.md`) | Fecha objetivo | Fecha real | Estado (5-sep-2026) | Coste (§3.1) | DOI |
|---|---|---|---|---|---|---|---|---|---|
| `carta-1` | Carta al editor #1 | Letter / Notes & Comments (≤500 palabras) · `agentic/prompts_claude_code/letter_to_editor.md` | JAAD o JCD (elegir en C-2; candidatos en `CARTA_1/candidatos.md`) → plan B misma familia | Dr. Ciro (coautor) | **elegir artículo: 2ª sem. sep-2026 · enviar: ≤ 15-oct-2026** (fecha límite interna de la fila elegida) | — | **idea** → candidatos con DOI verificado (C-1 hecho) | $0 | — |
| `tesis-L0` | Tesis IGA×CADI → research letter | Research letter STROBE (600-1.000 palabras, 1 tabla, 1 figura) · `TESIS_L0/` · `research_letter_STROBE.md` | JAAD International → IJD → Actas Dermo-Sifiliográficas → Anais Brasileiros | Dr. Ciro (último autor) · Rising Scholars (inglés) · Finlay (permiso CADI) | ética/CEI: oct-2026 · borrador: dic-2026 · **enviar: 15-feb-2027** | — | **borrador** (outline + checklists; bloqueado por CEI/consentimientos A VERIFICAR) | $0-1.288 | — |
| `case-report-1` | Case report #1 | CARE 2013 (13 ítems) · `CASE_REPORT_1/` · `case_report_CARE.md` | Dermatology Online Journal → IJD (correspondence) → JAAD Case Reports | Dr. Ciro o colega SPD (senior author) | caso + consentimiento: **31-oct-2026** · borrador: dic-2026 · **enviar: 28-feb-2027** | — | **idea** (sin caso; plantillas listas) | ≤ $300 | — |
| `prospero-SR-1` | Registro PROSPERO de SR-1 (L4) | Protocolo PRISMA-P · equipo de revisión (revisor #2 humano) | PROSPERO | Dr. Ciro (revisor #2 / validación clínica) + colaborador IMG | **31-mar-2027** | — | **idea** (corpus de 200 papers descubierto 11-jun-2026, 0 cribados; export Rayyan listo: `exportResearchCorpus`) | $0 | — |
| `SR-1` | Revisión sistemática L4 (complicaciones de inyectables, fototipos IV-VI) | PRISMA 2020 + GRADE · `agentic/` (pipeline SR) | Dermatologic Surgery → JAAD → JAAD International | Cotofana (contacto feb-mar 2027) · coautores IMG | ejecución abr-jun 2027 · **enviar: 31-ago-2027** | — | **idea** | $0 (techo $1.288) | — |

**Fuentes**:
[NRMP Charting Outcomes Non-US IMGs 2026 (PDF)](https://www.nrmp.org/wp-content/uploads/2026/07/Non-US-IMG_Charting-Outcomes_FINAL.pdf) ·
[NRMP Residency Data Reports](https://www.nrmp.org/match-data-analytics/residency-data-reports/) ·
[Framework IMGs derm — Dermatol Online J 2019 (PMID 31553861)](https://pubmed.ncbi.nlm.nih.gov/31553861/) ·
[Credenciales matched — Cureus 2020 (PMID 33659103)](https://pubmed.ncbi.nlm.nih.gov/33659103/) ·
[Texas STAR trends — Cureus 2026 (PMID 42205642)](https://pubmed.ncbi.nlm.nih.gov/42205642/) ·
[Research gap year outcomes — JAAD 2024](https://doi.org/10.1016/j.jaad.2024.05.054) ·
[Carga financiera gap years (PMID 37547567)](https://pubmed.ncbi.nlm.nih.gov/37547567/) ·
[DOAJ — JAAD Case Reports](https://doaj.org/toc/2352-5126) ·
[DOAJ — Dermatology Online Journal](https://doaj.org/toc/1087-2108) ·
[Cureus (deslistado WoS)](https://en.wikipedia.org/wiki/Cureus) ·
[CARE Statement](https://www.care-statement.org/) ·
[PRISMA 2020](https://www.prisma-statement.org/) ·
[Mayo Clinic Dermatology Residency (MN)](https://college.mayo.edu/academics/residencies-and-fellowships/dermatology-residency-minnesota/) ·
[Mayo — Application Process](https://college.mayo.edu/academics/residencies-and-fellowships/dermatology-residency-minnesota/application-process/)

---

### Nota de divergencia

¹ El agente presupuestó research en "~5-7h/semana escalando después de enero". El diseño v5
decidido asigna la franja alternante RESEARCH↔DERMA de **13:30-14:15 interdiaria** (~2h/sem
netas de research) hasta fines de enero. Se respeta el diseño: los hitos M1-M4 caben (carta +
case report son de bajo volumen semanal); la SR arranca recién en feb-2027 cuando Step 1
libera la agenda — que es exactamente lo que el agente recomienda proteger ("no sacrificar el
Step: el volumen sin scores no compensa").
