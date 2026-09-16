# RUTA DE PUBLICACIÓN 2027 — Dermatología · IMG peruano → Mayo Clinic

Del agente macro:research-publicaciones (27-ago-2026). Progresión de 12 meses
(case report → carta → revisión sistemática), revistas con datos verificados en DOAJ,
estándares CARE/PRISMA, y cómo se conecta con las líneas **L0-L8** de
[`src/lib/researchProgram.ts`](../../src/lib/researchProgram.ts) — este doc NO reemplaza el
programa de líneas: le pone el calendario editorial encima.

> **⚠ v5.13 (16-sep-2026) — Research VUELVE A CORRER +2 días hábiles (+1 slot interdiario), mismo orden y mismos d#: ciclo 1 = 42 átomos vie 18-sep-2026 → lun 15-feb-2027 · ciclo 2 = 67 átomos mié 17-feb → vie 20-ago-2027.** El mié 16 de septiembre tampoco se estudió y el D1 del régimen pasa al **jue 17-sep-2026** (duodécimo corrimiento, 31-ago→17-sep), que es día **Derma** en la alternancia (Derma NO se mueve: d1 jue 17-sep → d73 vie 9-abr-2027), así que el ciclo 1 de Research arranca el primer día-Research ≥ D1: el **vie 18-sep**. Los 10 hitos anteriores a la pausa corren 2 hábiles (M1 jue 24-sep · C-2 vie 2-oct · T-1 mar 6-oct · C-6 jue 22-oct · CR-1 mié 28-oct · CR-2 vie 30-oct · T-8 vie 27-nov · X-1 jue 3-dic · CR-8 mar 15-dic); X-7 sigue anclado al mar 29-dic (d36) y **CR-9 sigue el lun 1-feb-2027 (d37)**; el ciclo 2 corre con él (X-9 mar 23-feb · R10 lun 1-mar · R43 vie 9-jul). Releído con node el 16-sep de `RESEARCH_HITOS` y de los dos `.ts`; los 12 overlays 🔬 del Calendar ya están re-fechados (`_calendar_overlays.json`). **⚠ Lo que cambia de contexto: el Step 1 termina el lun 1-feb-2027 (D95 = D-1 DENTRO del plan) y su examen pasa al MAR 2-FEB-2027 — CR-9 (SUBMIT del case report #1) cae en la víspera del examen**: el generador ancla CR-9 al primer día-Research tras la pausa del Step 1 (4→29-ene), no al examen, y **no lo mueve solo**; moverlo al mié 3-feb (o hacer el SUBMIT la mañana del lunes, ≤30 min, dentro de la sesión mínima D-1) es **decisión de Joseph** (`DATA/PENDIENTES_JOSEPH.md`). La pausa de research sigue siendo 4→29-ene = 0 átomos.
> *(Histórico v5.12, 15-sep-2026 — Research NO SE MOVÍA: ciclo 1 = 42 átomos mié 16-sep-2026 → jue 11-feb-2027 · ciclo 2 = 67 átomos lun 15-feb → mié 18-ago-2027, idéntico a v5.11.)* El mar 15 de septiembre tampoco se estudió y el D1 del régimen pasa al **mié 16-sep-2026** (undécimo corrimiento, 31-ago→16-sep), que ya era el d1 de Research: los 12 hitos conservan fecha y D# (re-verificado con node el 15-sep contra `RESEARCH_HITOS` y los dos `.ts`; `gen_research_calendar.js --check` = 0 overlays 🔬 cambiados). Esta vez la que corre es **Derma** (+1 slot: d1 jue 17-sep → d73 vie 9-abr-2027). **⚠ Lo que sí cambia de contexto: el Step 1 llena la ventana 25-29 ene (D95 = vie 29-ene) y su examen pasa al LUN 1-FEB-2027 — el mismo día del átomo CR-9 (SUBMIT del case report #1)**: el generador ancla CR-9 al primer día-Research tras la pausa del Step 1 (4→29-ene), no al examen, y **no lo mueve solo**; moverlo al mar 2-feb (o hacer el SUBMIT en la tarde del lunes, después del examen) es **decisión de Joseph** (`DATA/PENDIENTES_JOSEPH.md`). La pausa de research sigue siendo 4→29-ene = 0 átomos.
>
> *(Histórico v5.11, 14-sep — Research CORRÍA +2 días de calendario (+1 slot interdiario) hasta las fechas vigentes: ciclo 1 = 42 átomos mié 16-sep-2026 → jue 11-feb-2027 · ciclo 2 = 67 átomos lun 15-feb → mié 18-ago-2027.)* El lun 14 de septiembre tampoco se estudió y el D1 del régimen pasa al **mar 15-sep-2026** (décimo corrimiento, 31-ago→15-sep). Ese martes es día **Derma** en la alternancia (paridad anclada al mié 10-jun-2026), así que Derma no se mueve y el ciclo 1 de Research arranca el primer día-Research ≥ D1: el **mié 16-sep**. Cada hito corre exactamente **2 días hábiles** (un slot interdiario) y conserva su D#; la pausa del Step 1 (4→29-ene = 0 átomos) y los dos átomos anclados a ella (X-7 mar 29-dic · CR-9 lun 1-feb) no se mueven. Fechas releídas con `node` de `researchDailyPlan.ts` / `researchDailyPlan2027.ts` el 14-sep-2026 (`RESEARCH_HITOS`), no estimadas: M1 mar 22-sep · C-2 mié 30-sep · T-1 vie 2-oct · **C-6 mar 20-oct** · CR-1 lun 26-oct · T-8 mié 25-nov · X-1 mar 1-dic · CR-8 vie 11-dic · CR-9 lun 1-feb · X-9 vie 19-feb · R10 jue 25-feb · R43 mié 7-jul-2027. `DATA/RESEARCH/daily-plan.md` ya está regenerado por `gen_research_plan.js` (14-sep) con estas fechas.
>
> **🔴 Consecuencia editorial (v5.13):** el deadline interno de la carta (≤15-oct) ya estaba roto desde v5.9 y ahora **C-6 cae el jue 22-oct-2026 (7 días tarde)**; el paquete queda listo en C-5 (mar 20-oct), así que el SUBMIT hay que hacerlo fuera del átomo (jue 15-oct, adelantando C-3/C-4/C-5) o elegir en C-2 (vie 2-oct) una diana con ventana más larga. **CR-1 (mié 28-oct) y CR-2 (vie 30-oct) siguen ANTES del 31-oct, pero ya sin holgura** (el re-orden v5.10b aguanta este corrimiento con 3 y 1 día de margen: un corrimiento más y CR-2 se sale del plazo). Los deadlines NO se mueven, los átomos sí: **decisión de Joseph, no de la app** (§9.1).
>
> *(Histórico v5.10, 12-sep: Research no se movía — ciclo 1 lun 14-sep → mar 9-feb-2027, ciclo 2 jue 11-feb → lun 16-ago-2027; C-6 vie 16-oct, 1 día tarde.)*

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
| M1-2 (sep-oct 2026) | ORCID + Zotero · leer CARE + 10 case reports de JAADCR/DOJ · escribir **1 carta al editor** (respuesta a artículo 2026 de JAAD/IJD) · identificar 1-2 casos peruanos con consentimiento — **v5.13: R0 vie 18-sep · C-6 SUBMIT jue 22-oct ⚠ · CR-1 caso mié 28-oct ✅** | transversal |
| M3-4 (nov-dic 2026) | **Tesis L0 → research letter SUBMIT (T-8 vie 27-nov)** · **Case report #1** con mentor local: borrador, fotos, CARE y **paquete CONGELADO (CR-8 mar 15-dic)** — el SUBMIT a DOJ se ejecuta el 1-feb-2027, no en diciembre · revisor #2 nombrado (X-1 jue 3-dic) | L4 si es complicación estética; si no, el mejor caso disponible |
| M5 (ene-2027) | **PAUSA TOTAL — examen Step 1** (4-ene → 29-ene-2027 = 0 átomos de research; v5.13: el lun 1-feb es el D-1 del Step 1 y el examen se rinde el mar 2-feb, fuera de la ventana 25-29 ene) | — |
| M6-7 (feb-mar 2027) | **SUBMIT case report #1 (CR-9 lun 1-feb = víspera del examen Step 1)** · protocolo de **revisión sistemática** en derm estética y **registro PROSPERO (R10 lun 1-mar)** · reclutar 2-3 coautores IMG · campaña de cold emails (K1 mié 3-mar · K2 mar 9-mar) | **SR-1 (L4)** o **SR-2 (L5)** — las líneas ACTIVAS del programa |
| M8-10 (abr-jun 2027) | Ejecutar SR (extracción R22-R25 14→28-abr · MA en R may-2027) · case report #2 · 1 estudio bibliométrico · abstracts a AAD/CILAD/RADLA | L4/L5 + transversal |
| M11-12 (jul-ago 2027) | **SUBMIT SR-1 (R43 vie 9-jul)** · SR-2 abierta (PROSPERO R46 jue 12-ago) · **balance (X-12 lun 16-ago)** | — |

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
- ~~**Actas Dermo-Sifiliográficas**: ¿Diamond $0 (AEDV) o APC US$1.870/1.900 EUR (DOAJ)?~~ **RESUELTO 12-sep-2026**: la página
  Open Access de la revista lista APC EUR 1.710 / USD 1.870 y declara que la AEDV lo cubre para todos los aceptados → **$0**.
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
| `carta-1` | Carta al editor #1 | Letter / Notes & Comments (≤500 palabras) · `agentic/prompts_claude_code/letter_to_editor.md` | JAAD o JCD (elegir en C-2; candidatos en `CARTA_1/candidatos.md`) → plan B misma familia | Dr. Ciro (coautor) | **elegir artículo: ≤ 2ª sem. sep-2026 · enviar: ≤ 15-oct-2026** (fecha límite interna de la fila elegida) · *plan v5.13: diana C-2 = vie 2-oct-2026 · SUBMIT C-6 = jue 22-oct-2026 🔴 7 días tarde vs el ≤15-oct (§9.1)* | — | **idea** → candidatos con DOI verificado (C-1 hecho) | $0 | — |
| `tesis-L0` | Tesis IGA×CADI → research letter | Research letter STROBE (≈500-600 palabras · ≤5 refs · 1 tabla o 1 figura + apéndice «versión larga» 800/3/10) · `TESIS_L0/` · `research_letter_STROBE.md` | JAAD International → IJD → Actas Dermo-Sifiliográficas → Anais Brasileiros | Dr. Ciro (último autor) · Rising Scholars (inglés) · Finlay (permiso CADI) | ética/CEI: oct-2026 · borrador: dic-2026 · **enviar: ≤ 15-feb-2027** · *plan v5.10b re-fechado a v5.13 (16-sep): ética T-1 = **mar 6-oct-2026** (solicitud CEI expedita presentada ese día) · SUBMIT T-8 = vie 27-nov-2026 (80 días de margen) — **GATES en T-7/T-8: sin nº de CEI o exención, o sin inglés revisado, NO se envía → feb-2027*** | — | **borrador** (outline + checklists; bloqueado por CEI/consentimientos A VERIFICAR) | $0-1.288 | — |
| `case-report-1` | Case report #1 | CARE 2013 (13 ítems) · `CASE_REPORT_1/` · `case_report_CARE.md` | Dermatology Online Journal → IJD (correspondence) → JAAD Case Reports | Dr. Ciro o colega SPD (senior author) | caso + consentimiento: **31-oct-2026** · borrador: dic-2026 · **enviar: ≤ 28-feb-2027** · *plan v5.10b re-fechado a v5.13 (16-sep): CR-1 (caso) = **mié 28-oct-2026** · CR-2 (consentimiento) = **vie 30-oct-2026** ✅ antes del 31-oct, sin holgura (en v5.9 caían el 3-nov / 9-nov) · seguimiento con el Dr. Ciro el mar 6-oct (d7) y el mié 14-oct (d10, ~3 semanas desde M1; sin caso el 14-oct → fuente B) · paquete congelado CR-8 = mar 15-dic-2026 · SUBMIT CR-9 = lun 1-feb-2027 (sin mover; víspera del examen Step 1)* | — | **idea** (sin caso; plantillas listas) | ≤ $300 | — |
| `prospero-SR-1` | Registro PROSPERO de SR-1 (L4) | Protocolo PRISMA-P · equipo de revisión (revisor #2 humano) | PROSPERO | Dr. Ciro (revisor #2 / validación clínica) + colaborador IMG | **≤ 31-mar-2027** · *plan v5.13: revisor #2 nombrado X-1 = jue 3-dic-2026 (la invitación declara la carga real ≈ 40-70 h fuera del bloque y exige aceptación escrita · L4 §9.4) · equipo confirmado X-9 = mar 23-feb-2027 · REGISTRO R10 = lun 1-mar-2027 (30 días de margen); las fechas previstas que se copian a PROSPERO son las de L4 §9.4 (con margen), no las de los átomos* | — | **idea** (corpus de 200 papers descubierto 11-jun-2026, 0 cribados; export Rayyan listo: `exportResearchCorpus`) | $0 | — |
| `SR-1` | Revisión sistemática L4 (complicaciones de inyectables, fototipos IV-VI) | PRISMA 2020 + GRADE · `agentic/` (pipeline SR) | Dermatologic Surgery → JAAD → JAAD International | Cotofana (contacto feb-mar 2027) · coautores IMG | ejecución abr-jun 2027 · **enviar: ≤ 31-ago-2027** · *plan v5.13: extracción R22-R25 = vie 16-abr → vie 30-abr-2027 · SUBMIT R43 = vie 9-jul-2027 (53 días de margen)* | — | **idea** | $0 (techo $1.288) | — |

### 9.1 Calendario editorial v5.10b (re-orden del 12-sep-2026) → v5.11 (14-sep) = v5.12 (15-sep) → **v5.13 (re-fechado el 16-sep-2026: Research corre +2 hábiles)** (fechas leídas con `node` de `researchDailyPlan.ts` / `researchDailyPlan2027.ts`)

Ningún deadline externo se movió. En v5.9 **todo el ciclo 1 de Research corrió +2 días hábiles**
(su d1 pasó de jue 10-sep a lun 14-sep); en v5.10 Research no se movió; **en v5.11 vuelve a correr +2 días hábiles** (su d1 pasa
del lun 14 al **mié 16-sep**, porque el mar 15-sep es día Derma) y el ciclo 2 corre con él (d43 = lun 15-feb-2027); en v5.12 (D1 del régimen = mié 16-sep, ya día Research) no cambió nada; **en v5.13 vuelve a correr +2 días hábiles** (su d1 pasa del mié 16 al **vie 18-sep**, porque el jue 17-sep es día Derma) y el ciclo 2 corre con él (d43 = mié 17-feb-2027). La columna **v5.13** es la fecha REAL del
átomo que ejecuta el hito (parseada de los `.ts` el 16-sep-2026), no una estimación. El **orden v5.10b (12-sep-2026, gaps v3b 1-3)** se mantiene: mismos 42
átomos; T-1 en d7, M3 en d8, R9 en d9 (antes de R6, d14), CR-1 en d15, CR-2 en d16, T-2 en d19, R7 en d21 y R2 en d35.

| Hito | Átomo | v5.9 = v5.10 (v5.10b) | v5.11 = v5.12 | **v5.13 (vigente)** | Deadline externo | Margen |
|------|-------|--------------------|---------------|--------------------|------------------|--------|
| Infra académica (10 cuentas) | R0 | lun 14-sep-2026 | mié 16-sep-2026 | **vie 18-sep-2026** | — | — |
| Mentor: email al Dr. Ciro (3 coautorías) | M1 | vie 18-sep-2026 | mar 22-sep-2026 | **jue 24-sep-2026** | — | — |
| Artículo DIANA de la carta + deadline calculado | C-2 | lun 28-sep-2026 | mié 30-sep-2026 | **vie 2-oct-2026** | ventana del journal | según fila elegida |
| ¿Existe ya la SR? AMSTAR-2 de 5 SR vecinas + decisión a/b/c (L4 §6) | R9 | mar 6-oct-2026 (v5.10b · antes de R6) | jue 8-oct-2026 | **lun 12-oct-2026** | — | gate del PICO |
| PICO de SR-1 fijado | R6 | mar 20-oct-2026 (v5.10b · tras la decisión de R9) | jue 22-oct-2026 | **lun 26-oct-2026** | — | — |
| **SUBMIT carta al editor #1** | C-6 | vie 16-oct-2026 | mar 20-oct-2026 | **jue 22-oct-2026** | ≤ 15-oct-2026 | 🔴 **−7 días (VENCIDO)** |
| Ética / CEI de la tesis: nº archivado o **solicitud expedita PRESENTADA ese día** | T-1 | mié 30-sep-2026 (v5.10b) | vie 2-oct-2026 | **mar 6-oct-2026** | solicitud ≤ 30-sep | 🔴 −6 días (la aprobación tarda semanas → gate en T-7/T-8; presentar la solicitud el mié 30-sep —día de M2— fuera del átomo si se quiere respetar el ≤ 30-sep) |
| **Caso + senior author del case report** | CR-1 | jue 22-oct-2026 (v5.10b) | lun 26-oct-2026 | **mié 28-oct-2026** | 31-oct-2026 | ✅ +3 días |
| Consentimiento de publicación firmado | CR-2 | lun 26-oct-2026 (v5.10b) | mié 28-oct-2026 | **vie 30-oct-2026** | 31-oct-2026 | ✅ +1 día (sin holgura) |
| **SUBMIT research letter de la tesis (L0)** | T-8 | lun 23-nov-2026 | mié 25-nov-2026 | **vie 27-nov-2026** (gates: nº CEI/exención + inglés revisado; si fallan → feb-2027) | ≤ 15-feb-2027 | 80 días |
| Revisor humano #2 nombrado (pre-PROSPERO) | X-1 | vie 27-nov-2026 | mar 1-dic-2026 | **jue 3-dic-2026** | antes de PROSPERO | 88 días |
| **Paquete del case report CONGELADO** | CR-8 | mié 9-dic-2026 | vie 11-dic-2026 | **mar 15-dic-2026** | antes del submit | 48 días |
| Cierre antes de la pausa de enero | X-7 | mar 29-dic-2026 | mar 29-dic-2026 | **mar 29-dic-2026** *(no se movió: anclado a la pausa; d36)* | — | — |
| *(pausa Step 1: 4-ene → 29-ene-2027 = 0 átomos)* | — | igual | igual | **igual** | — | — |
| **SUBMIT case report #1 (DOJ)** | CR-9 | lun 1-feb-2027 | lun 1-feb-2027 | **lun 1-feb-2027** *(no se movió: primer día-Research tras la pausa; d37)* — ⚠ **v5.13: es el D95 = D-1 del Step 1, la VÍSPERA del examen (mar 2-feb)**; mover el átomo al mié 3-feb o submitear la mañana del lunes (≤30 min) = decisión de Joseph | ≤ 28-feb-2027 | 27 días |
| Equipo de revisión CONFIRMADO | X-9 | mié 17-feb-2027 | vie 19-feb-2027 | **mar 23-feb-2027** | antes de PROSPERO | 6 días |
| **REGISTRO PROSPERO de SR-1** | R10 | mar 23-feb-2027 | jue 25-feb-2027 | **lun 1-mar-2027** | ≤ 31-mar-2027 | 30 días |
| Extracción doble de SR-1 | R22-R25 | 12-abr → 26-abr-2027 | mié 14-abr → mié 28-abr-2027 | **vie 16-abr → vie 30-abr-2027** | — | — |
| **SUBMIT SR-1** | R43 | lun 5-jul-2027 | mié 7-jul-2027 | **vie 9-jul-2027** | ≤ 31-ago-2027 | 53 días |
| Balance 12 meses | X-12 | mar 10-ago-2027 | jue 12-ago-2027 | **lun 16-ago-2027** | — | — |

> **🔴 DEADLINES ROTOS tras el corrimiento de v5.13 — decisión de Joseph, no de la app:**
> - **C-6 = jue 22-oct-2026** contra el ≤ 15-oct. En v5.8 quedaba 1 día de margen; desde v5.9 el átomo
>   cae tarde (1 día en v5.9/v5.10, 5 días en v5.11/v5.12, **7 días en v5.13**). Opciones: (a) hacer el SUBMIT el jue 15-oct fuera del átomo (el paquete ya
>   está listo en C-5, mar 20-oct → en v5.13 habría que adelantar también C-3/C-4/C-5 o cerrar el paquete el mié 14-oct, día de C-3), (b) elegir en C-2 (vie 2-oct) una fila de candidatos cuya ventana
>   cierre más tarde. **Lo que NO vale es dejarlo correr:** la ventana del journal no se negocia.
> - **T-1 = mar 6-oct-2026** contra la solicitud ≤ 30-sep (interno): 6 días tarde; si importa, presentar la solicitud CEI el mié 30-sep (día Research: M2) fuera del átomo.
> - **CR-1 = mié 28-oct y CR-2 = vie 30-oct** siguen ANTES del 31-oct, pero ya sin holgura (el intercambio v5.10b con T-2 y R7 aguanta este corrimiento por 3 y 1 día; uno más y CR-2 se sale). Regla operativa: seguimiento con el Dr. Ciro
>   el mar 6-oct (d7) y el mié 14-oct (d10, ~3 semanas desde M1 jue 24-sep); sin caso el 14-oct → fuente B (colega SPD) con el mensaje único de
>   `CASE_REPORT_1/caso_candidatos.md` §2 (MENTORES fila 6).
> - **X-9 = mar 23-feb-2027 → R10 = lun 1-mar-2027**: 6 días entre confirmar el equipo y registrar (igual que en v5.10-v5.12). El revisor #2 debe estar comprometido desde X-1 (jue 3-dic-2026); X-9 solo confirma.
>
> **Dos átomos que NO se movieron** (el generador los ancla a la pausa del Step 1, no a D1):
> **X-7** (cierre antes de la pausa, mar 29-dic-2026) y **CR-9** (SUBMIT del case report, lun
> 1-feb-2027 = primer día-Research tras la pausa). Por eso el ciclo 1 absorbe el corrimiento en el
> tramo dic-2026 mientras puede (en v5.11 X-3 pasó del lun 21 al mié 23-dic y el hueco entre X-3 y X-7 se cerró); **en v5.13 el tramo dic-2026 ya no absorbe más: X-3 salta al otro lado de la pausa (d39, vie 5-feb) y el ciclo 1 termina el lun 15-feb (X-6, d42) en vez del jue 11-feb**, empujando el ciclo 2 un slot (d43 = mié 17-feb).
> **⚠ v5.13:** el examen Step 1 es el **mar 2-feb-2027** y el lun 1-feb (día de CR-9) es su **D-1 dentro del plan** (sesión mínima por la mañana, nada de pantallas después de las 17:00). El generador no lo sabe (ancla a la pausa 4→29-ene, no a `DAILY_META.examenTarget`): el átomo NO se mueve solo. Opciones para Joseph: (a) SUBMIT el mié 3-feb (mover CR-9 un slot y correr el ciclo 2 +1 slot: `gen_research_plan.js` + overlays), (b) SUBMIT la mañana del 1-feb dentro de la sesión mínima (el paquete está congelado desde CR-8, mar 15-dic: son 20-30 min), (c) dejarlo y aceptar que ese día no se hace nada de research. Registrado en `DATA/PENDIENTES_JOSEPH.md`.

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
