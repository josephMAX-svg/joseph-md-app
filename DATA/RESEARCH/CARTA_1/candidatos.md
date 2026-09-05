# CARTA AL EDITOR #1 — artículos diana candidatos (ventana jul-sep 2026)

> **Objetivo del entregable** (RUTA §2.1 y §6 M1-2): 1 carta al editor / Notes & Comments sobre un artículo de
> 2026 de JAAD / JAAD International / IJD / JCD / Dermatologic Surgery en derma estética · fototipos IV-VI ·
> complicaciones de rellenos, con **ángulo latino/peruano**, sometida en **oct-2026** (antes de la pausa Step 1).
> Modo de fallo #1 (análisis Palmerton v3, vacío 6): elegir el artículo tarde y descubrir que la **ventana de
> cartas** cerró. Por eso este fichero fija la lista, la ventana y la fecha límite **hoy**, y el átomo C-2 solo elige.
>
> **Método (5-sep-2026, reproducible)**: consulta Crossref filtrada por ISSN de las 5 revistas y fecha de publicación
> 7-jul → 5-sep-2026 (últimos 60 días) — [query A "filler / hyaluronic acid / complication"](https://api.crossref.org/works?filter=issn:0190-9622,issn:2666-3287,issn:0011-9059,issn:1473-2130,issn:1076-0512,from-pub-date:2026-07-07,until-pub-date:2026-09-05&query.bibliographic=filler%20hyaluronic%20acid%20complication&rows=30&select=DOI,title,container-title,issued,published-online,type)
> (19 resultados) y [query B "skin of color / Fitzpatrick / laser / cosmetic"](https://api.crossref.org/works?filter=issn:0190-9622,issn:2666-3287,issn:0011-9059,issn:1473-2130,issn:1076-0512,from-pub-date:2026-07-07,until-pub-date:2026-09-05&query.bibliographic=skin%20of%20color%20Fitzpatrick%20laser%20cosmetic&rows=30&select=DOI,title,container-title,issued,published-online,type)
> (151 resultados; se revisaron los 30 primeros) + consultas por ISSN para IJD y JAAD International. **Cada DOI de abajo
> se verificó el 5-sep-2026 con `agentic/citation_verifier.py`** (resuelve en Crossref; título/autores/fechas copiados
> del CSL-JSON, no de memoria). Para re-correr en C-2: abrir las dos URLs (cambiar las fechas) y pasar los DOIs nuevos
> por el verificador. Europe PMC no devolvió resultados para el mismo rango (índice atrasado) — Crossref es la fuente.
>
> **Regla de ventana** (mientras la ventana oficial de cada revista siga "A VERIFICAR"): someter **≤ 8 semanas** desde
> la fecha de publicación online; si la guía de la revista fija una ventana mayor, se relaja hasta esa. Las guías de
> autor de Elsevier (ScienceDirect/jaad.org), Wiley y Wolters Kluwer devolvieron 403/402 a la verificación automática
> el 5-sep → los límites que constan abajo vienen de fragmentos indexados de esas páginas (buscador) y se re-leen
> **en la página** el día de C-2 (URL guardada en cada fila).

## 1. Candidatos principales (elegir 1 en C-2)

| # | Revista · sección | Publicado | DOI (verificado 5-sep) | Artículo (autores) | Ventana de cartas · límites (fuente) | Coste | Ángulo de la carta (dato latino/peruano) | Fecha límite interna de envío |
|---|---|---|---|---|---|---|---|---|
| 1 | **Journal of Cosmetic Dermatology** (Wiley, híbrida) · Letter to the Editor | online **5-ago-2026** (vol. 25, nº 8) | [10.1111/jocd.71104](https://doi.org/10.1111/jocd.71104) | *Complications of Hyaluronic Acid and Calcium Hydroxylapatite Fillers — A Comprehensive Narrative Review of Clinical Presentation and Current Management Strategies* (Sukmanskaya, **Cotofana**, Alfertshofer) | Ventana y límites (palabras/refs/figuras): **A VERIFICAR (5-sep)** en la guía Wiley: <https://onlinelibrary.wiley.com/page/journal/14732165/homepage/forauthors.html> (403 a la verificación automática; el buscador no indexa el apartado de cartas) | **$0** (híbrida: la carta va por la vía de suscripción; no elegir OA) | El review no trata (a) el uso de rellenos **no degradables/PMMA y silicona** ni de inyectores sin formación médica, frecuentes en Latinoamérica, donde la hialuronidasa no rescata; (b) la **hiperpigmentación postinflamatoria** tras nódulos/inflamación en fototipos IV-V (mayoría en Perú); (c) la ausencia de registro regional de complicaciones → propuesta PERÚ-SAFE (L4). Cada afirmación con cita verificada (buscar 2-3 series latinoamericanas de complicaciones por PMMA/silicona en OpenAlex y pasar por el verificador; si no hay, la carta se limita a lo que sí se puede citar). **Valor extra**: coautor Cotofana = presentación natural para el contacto de feb-mar 2027 (`../MENTORES.md` #4) | **30-sep-2026** (8 sem.) — si la guía Wiley da más margen, hasta el 31-oct |
| 2 | **JAAD** (Elsevier, híbrida) · Notes & Comments | número de **ago-2026** (fecha online exacta: A VERIFICAR en jaad.org) | [10.1016/j.jaad.2026.08.077](https://doi.org/10.1016/j.jaad.2026.08.077) | *Laser and Energy-Based Device Use in Skin of Color: A Clinical Review of Safety, Efficacy, and Best Practices* (Dreifus, Burke, Alexis et al.) | JAAD Notes & Comments: **≤500 palabras, ≤2 imágenes, ≤5 referencias** (fragmento indexado de <https://www.jaad.org/content/authorinfo>, 5-sep-2026; la guía completa está en <https://www.sciencedirect.com/journal/journal-of-the-american-academy-of-dermatology/publish/guide-for-authors>). **Ventana temporal tras la publicación: A VERIFICAR (5-sep)** (no consta en el fragmento) | **$0** (Notes & Comments por suscripción; JAAD no cobra APC en la vía no-OA) | Fototipos IV-V **andinos/mestizos** con exposición UV de altura (Huancayo ≈3.250 m — A VERIFICAR la cifra antes de citarla) ausentes de la literatura de "skin of color", que es casi toda afroamericana/asiática; parámetros conservadores y test spots; enlaza con L5 (SR-2 energía en fototipos IV-VI). Requiere 2-3 citas verificadas sobre fototipo/pigmentación en población andina (buscar en OpenAlex/LILACS; si no hay, reformular como "no hay datos") | **15-oct-2026** (asumiendo online ≈ mediados de ago; recalcular en C-2 con la fecha real) |
| 3 | **Journal of Cosmetic Dermatology** · Letter to the Editor | online **3-ago-2026** (vol. 25, nº 8) | [10.1111/jocd.71097](https://doi.org/10.1111/jocd.71097) | *Indocyanine Green Angiography for Objective Perfusion Monitoring After Hyaluronic Acid Filler-Induced Facial Vascular Occlusion* (Li, Zhou, Wang et al.) | Igual que #1 (misma revista) | **$0** | Monitorización de perfusión **sin ICG** en entornos de recursos limitados (relleno capilar, Doppler de mano, foto seriada con smartphone bajo protocolo) y disponibilidad/coste de la hialuronidasa en Perú (dato a verificar con DIGEMID/farmacias antes de escribirlo — si no se verifica, no se afirma); protocolo de dosis altas (DeLorenzi 2014, DOI 10.1177/1090820X14525035 — verificado en los tests de `citation_verifier.py`). Enlaza con L4 | **28-sep-2026** (8 sem.) |
| 4 | **JAAD** · Notes & Comments | número de **sep-2026** (online: A VERIFICAR) | [10.1016/j.jaad.2026.08.115](https://doi.org/10.1016/j.jaad.2026.08.115) | *Race and Ethnicity Reporting in U.S. Acne Clinical Trials: Hispanic/Latino Representation in Phase II-IV Studies, 2017-2025* (Keelin, Baboun, Keri) | Igual que #2 | **$0** | "Hispanic/Latino" de EE.UU. ≠ población latinoamericana residente: el acné en adolescentes andinos casi no tiene datos; la tesis L0 (n=316, Huancayo; rs 0,637 IGA×CADI; 70,6 % impacto moderado-severo) es exactamente el dato que falta → la carta puede citar los resultados como "unpublished data" **si JAAD lo admite (A VERIFICAR en la guía)**; si no, citar solo el gap y mencionar el estudio en curso. Es la carta que **más conecta con el CV** (tesis + Perú) y no exige búsqueda de citas latinoamericanas | **31-oct-2026** (asumiendo online ≈ fin de ago/inicio de sep; recalcular) |
| 5 | **Dermatologic Surgery** (Wolters Kluwer/ASDS, híbrida) · Letter to the Editor | online **28-jul-2026** | [10.1097/dss.0000000000005293](https://doi.org/10.1097/dss.0000000000005293) | *Late-Onset Granuloma Following Hyaluronic Acid Filler Injection Associated With Entamoeba histolytica Infection* (Albuquerque, Yarak — Brasil) | Ventana y límites: **A VERIFICAR (5-sep)** en <https://journals.lww.com/dermatologicsurgery> → "Information for Authors" (402/403 a la verificación automática) | **$0** (híbrida) | Parasitosis intestinal endémica en la sierra peruana como **gatillo infeccioso de nódulos tardíos**: el diferencial de reacción tardía a relleno en Latinoamérica debe incluir infecciones endémicas (amebiasis, otras) — requiere 1-2 citas verificadas de prevalencia de amebiasis en Perú (PubMed/LILACS) y la serie de reacciones tardías por gatillo infeccioso. Ventana **muy justa** (publicado 28-jul) → solo si la guía admite ≥ 10 semanas | **22-sep-2026** (8 sem.) → probablemente **descartar** por ventana; queda como modelo de "carta clínica" |

**Recomendación para C-2 (2ª semana de sep)**: elegir **#4 (JAAD, Hispanic/Latino)** si la guía de JAAD admite mencionar datos
propios no publicados o al menos "study in progress"; si no, **#1 (JCD, review de Cotofana)**, que además abre la puerta al
mentor internacional. #2 es el plan B natural de #4 (misma revista, mismos límites). Se escribe **una** carta; las demás
candidatas se archivan en §2.

## 2. Reserva (mismo rango de fechas; DOIs verificados 5-sep-2026)

| Revista | Publicado | DOI | Artículo | Ángulo posible | Por qué no es principal |
|---|---|---|---|---|---|
| JAAD (95(2):555-557) | ago-2026 | [10.1016/j.jaad.2026.04.1930](https://doi.org/10.1016/j.jaad.2026.04.1930) | *A systematic review of efficacy and adverse events of various laser treatments for acne vulgaris in diverse skin types* (Trinh, Petit, Najmi et al.) | Ausencia de ensayos latinoamericanos; PIH en fototipo IV; puente con L0/L5 | Solapa con #2 y #4; si #4 se descarta, sube |
| JAAD (95(3):918-919) | sep-2026 | [10.1016/j.jaad.2026.04.017](https://doi.org/10.1016/j.jaad.2026.04.017) | *Informed or influenced: Ethical challenges of adolescent lip filler procedures* (Uche, Kwan, Minokadeh) | Regulación peruana de procedimientos estéticos en menores (**A VERIFICAR**: norma vigente antes de afirmar nada) | Exige verificación legal que hoy no se tiene |
| JCD (25(8)) | 4-ago-2026 | [10.1111/jocd.71116](https://doi.org/10.1111/jocd.71116) | *Management of Polycaprolactone Filler-Induced Ischemia With "THIS and FAT" Protocol: A Case Series* (Nazari, Pourani, Bayatparidary et al.) | Rellenos no-HA (PCL/PMMA) sin antídoto: relevancia latinoamericana; enlaza con #1 | Redundante con #1 (mejor una sola carta a JCD) |
| Dermatologic Surgery | 9-jul-2026 | [10.1097/dss.0000000000005264](https://doi.org/10.1097/dss.0000000000005264) | *Poly-l-Lactic Acid Safety Over the Past 5-years: Analysis of US FDA Database Reports (2020-2025)* (Myers, Chou, Do et al.) | Sin sistema de farmacovigilancia estética en Perú → PERÚ-SAFE | Ventana cerrada con la regla de 8 semanas (3-sep) |
| JCD (25(8)) | 7-ago-2026 | [10.1111/jocd.70997](https://doi.org/10.1111/jocd.70997) | *Delayed Inflammatory Reactions to Hyaluronic Acid Fillers in a Patient Undergoing Dupilumab Therapy: A Case Report* (Alkhuzaim, Almeziny) | Reacciones tardías + inmunomoduladores | Ángulo latino débil |
| International Journal of Dermatology | 24-ago-2026 | [10.1111/ijd.70620](https://doi.org/10.1111/ijd.70620) | *Cosmetic Dermatology in Pregnancy and Lactation: A Risk-Benefit Framework for Clinical Practice* (Kovacs, Nadir, Goldenberg et al.) | Único artículo de IJD en el rango con scope estético; ángulo LatAm débil | IJD: Correspondence **≤600 palabras, ≤5 refs, ≤2 figuras/tablas, sin abstract** (fragmento indexado de <https://onlinelibrary.wiley.com/page/journal/13654632/homepage/forauthors.html>, 5-sep-2026; **A VERIFICAR** en la página + política de cartas sobre artículos publicados → correo §4) |
| JAAD International | ago-2026 | [10.1016/j.jdin.2026.05.015](https://doi.org/10.1016/j.jdin.2026.05.015) | *Global burden of skin and subcutaneous disease across childhood and adolescence in 204 countries and territories, 1990-2021* (Wei, Wang, Chen et al.) | Carga de acné adolescente en Perú (GBD) + tesis L0 | JAAD Intl no publicó nada estético/fototipo en el rango; Notes & Comments de JAAD Intl: **≤375 palabras, ≤2 figuras, ≤2 referencias** (fragmento indexado de la guía, 5-sep; A VERIFICAR) y, al ser fully-OA, **posible APC para cartas — A VERIFICAR** antes de elegirla |

## 3. Flujo C-1 → C-7 (franja Research 13:30-14:15, interdiaria)

| Átomo | Qué | Salida |
|---|---|---|
| C-1 (hecho 5-sep, Claude) | Lista de candidatos con DOI verificado, ventana, límites y ángulo | este fichero |
| C-2 (2ª sem. sep) | Elegir 1 candidato; **leer ese día la guía de autores en la página** (URL de la fila) y fijar la fecha límite real; anotar la decisión en §5 | fila elegida + fecha límite |
| C-3 | Leer 5 cartas modelo de esa revista de 2025-26 (misma sección) → anotar estructura: 1 párrafo de cita del artículo → 1 aporte/objeción con 1 dato verificable → 1 implicación/petición | notas en `CARTA_1/modelos.md` (crear) |
| C-4 | Borrador ≤ 500 palabras con `agentic/prompts_claude_code/letter_to_editor.md` (citas como `[CIT:id]`) | `CARTA_1/borrador_v1.md` |
| C-5 | `citation_verifier.py` sobre las ≤5 referencias → solo `verified`; `docx_assembler.py --template letter --in CARTA_1/carta.json --out CARTA_1/carta_v1.docx` | .docx |
| C-6 | Revisión Dr. Ciro (30 min; coautor) + mentor Rising Scholars si ya está asignado (`../MENTORES.md`) | v2 |
| C-7 (oct) | Cuenta en Editorial Manager (JAAD/JAAD Intl) o ScholarOne (JCD/IJD) + ORCID; cover letter de 5 líneas; declarar "no conflicts"; **SUBMIT** y registrar en la Mesa editorial (RUTA §9) | carta enviada |

## 4. Correo a la Editorial Office del International Journal of Dermatology (política de correspondencia) — NO ENVIADO

Pendiente desde el 27-ago (RUTA §8). Dirección de la Editorial Office: **A VERIFICAR (5-sep)** en la página de la revista
en Wiley (apartado "Contact" / "Editorial Office") — la verificación automática devolvió 403; no se inventa.

> **Subject:** Query on Correspondence policy — letters on recently published IJD articles and case reports
>
> Dear Editorial Office,
>
> I am an early-career physician-researcher in Peru preparing submissions to the International Journal of Dermatology
> and would be grateful for clarification on four points of the Correspondence section, so that I can comply from the
> first submission:
>
> 1. Does the journal consider letters that comment on a specific recently published IJD article, and is there a
>    time limit after online publication for such letters to be received?
> 2. Could you confirm the current limits for Correspondence (my reading of the author guidelines: up to 600 words,
>    5 references and 2 figures/tables, no abstract) and whether a structured "Research Letter" format with original
>    data (one table, one figure) is accepted under Correspondence or under another article type?
> 3. Are case reports considered only as Correspondence / clinical letters, and is the CARE checklist required?
> 4. For an author based in Peru submitting under the subscription (non-open-access) route, are there any submission
>    or publication charges for Correspondence?
>
> Thank you very much for your time.
> Kind regards,
> Joseph Max Soto Tocas, MD — Facultad de Medicina Humana, Universidad Nacional del Centro del Perú (Huancayo, Peru)
> ORCID: [rellenar] · e-mail: [rellenar]

Al recibir respuesta: pegarla en §5 y actualizar `../journals.md` (fila IJD) y la RUTA §3.

## 5. Registro de decisiones y respuestas

| Fecha | Qué | Quién |
|---|---|---|
| 5-sep-2026 | C-1: 5 candidatos + 7 reserva con DOI verificado; regla de 8 semanas; recomendación #4 → #1 → #2. Correo IJD redactado, no enviado | Claude (Palmerton v3) — pendiente de confirmación de Joseph |
