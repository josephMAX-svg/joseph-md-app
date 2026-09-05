# MENTORES — mini-CRM de mentores, senior authors y colaboradores (Research)

> **Por qué existe**: todos los docs coinciden en que el cuello de botella #1 es el mentor/senior author
> (`researchData.RESEARCH_META.cuelloBotella`, MD_MAESTRO §11.5 y §13.4, RUTA §5) y ninguno lo convertía en
> una acción con fecha. Este fichero es el registro único: **una fila por persona/organización**, qué se le pide
> exactamente, cuándo se contactó y cuál es el siguiente paso. Se actualiza cada vez que hay un contacto (átomo
> "M" del plan Research o el día que llegue la respuesta). **NADA de lo que hay aquí se ha enviado** (5-sep-2026):
> los tres mensajes de septiembre están redactados para que Joseph los revise, los personalice y los envíe él.
>
> Regla de estilo (RUTA §5.2): mensajes **cortos, hiperpersonalizados y con una petición concreta y verificable**
> (coautoría con reparto de trabajo, permiso de instrumento, revisión de un manuscrito) — nunca "quiero experiencia".

## 1. Tabla CRM

| # | Nombre | Rol para el programa | Qué le pido exactamente | Canal | Fecha contacto | Estado | Siguiente paso (fecha) |
|---|--------|----------------------|-------------------------|-------|----------------|--------|------------------------|
| 1 | **Dr. Ciro Jesús Rodríguez Aliaga** — dermatólogo, Hospital Regional Docente Clínico Quirúrgico Daniel Alcides Carrión (Huancayo); asesor de la tesis; "co-autor ancla nacional" (MD_MAESTRO §10; researchProgram.ts L0) | Senior author local (el único con acceso a casos hoy) | **3 coautorías con reparto explícito**: (a) tesis L0 → research letter (él último autor; Joseph redacta, `TESIS_L0/`); (b) carta al editor (él coautor; revisión clínica de 30 min); (c) **case report #1 de su consulta** (él senior author; Joseph hace CARE, consentimiento, fotos, envío — `CASE_REPORT_1/`). Además: preguntar por la vía de aprobación retrospectiva/expedita del CEI para la tesis (`TESIS_L0/etica.md` §2) | WhatsApp para pedir 20 min en persona/llamada; la propuesta se entrega en persona | — (mensaje 1 redactado, no enviado) | 🔴 no contactado para esto | Enviar mensaje 1 en la **2ª semana de sep-2026**; reunión antes del 30-sep; decisión sobre el caso antes del **31-oct** (`CASE_REPORT_1/caso_candidatos.md`) |
| 2 | **AuthorAID → hoy "Rising Scholars"** (INASP; risingscholars.net — la URL authoraid.info redirige ahí; red gratuita de mentoría para investigadores del Sur Global, verificado 5-sep-2026) | Mentor de escritura en inglés / revisión del primer manuscrito (gratis) | **Mentor 1-a-1** para revisar en inglés el primer manuscrito (research letter de la tesis, dic-2026/feb-2027) y la carta al editor (oct). Tarda semanas en emparejar → pedirlo ya | Registro en <https://risingscholars.net/accounts/register/> → sección Mentoring (<https://risingscholars.net/en/mentoring/>) → perfil + solicitud (texto = mensaje 2) | — (mensaje 2 redactado, no enviado) | 🔴 no registrado | Registrarse y publicar la solicitud en la **2ª semana de sep-2026**; si no hay mentor en 4 semanas, ampliar a "professional editor" de la misma red |
| 3 | **Prof. Andrew Y. Finlay** — Cardiff University; creador del CADI (Motley & Finlay 1992) y del DLQI | Multiplicador internacional (L6 = validación CADI Perú; coautoría potencial; Tier 1) | (a) **Permiso/licencia** para usar el CADI en publicación y en L6 (Cardiff exige licencia; copyright "© R J Motley, A Y Finlay 1992"; solicitud vía Technology Transfer, `technologytransfer@cardiff.ac.uk` — dato de la página de Cardiff según búsqueda del 5-sep-2026, **A VERIFICAR (5-sep)** en la propia página antes de escribir); (b) confirmar qué **versión en español** está autorizada (existe una validación en español uruguayo — A VERIFICAR cuál usó la tesis); (c) ofrecer los datos de la tesis (n=316) como validación peruana → coautoría en L6 | Email institucional (6 líneas = mensaje 3). Dirección de Finlay: **A VERIFICAR (5-sep)** en la web de Cardiff (no inventar); si no aparece, enviar a Technology Transfer con copia a la secretaría del departamento | — (mensaje 3 redactado, no enviado; "no iniciado" desde jun-2026 según MD_MAESTRO L6) | 🔴 no contactado | Enviar en la **3ª semana de sep-2026** (después de tener claro qué versión del CADI usó la tesis — `TESIS_L0/etica.md` 1.7); recordatorio a los 21 días si no responde |
| 4 | **Prof. Sebastian Cotofana** — anatomía facial; vínculo Mayo (MD_MAESTRO §6.1) | Puente académico de mayor valor doble (Mayo + L1/L4) | Colaboración concreta en SR-1 (L4) cuando exista protocolo PROSPERO; **no** antes. Dato útil: es coautor del narrative review de complicaciones de rellenos en JCD (ago-2026, DOI 10.1111/jocd.71104, verificado) que es candidato #1 de la carta al editor (`CARTA_1/candidatos.md`) → una carta bien hecha sobre su paper es la mejor "presentación" | Email tras la carta publicada / campaña de cold emails (RUTA §5.2) | — | ⚪ diferido | **feb-mar 2027** (campaña de 20-30 cold emails, con SR-1 registrada) |
| 5 | **DIGA** (Dermatology Interest Group Association) — comité IMG y mentoría (RUTA §5.3) | Red IMG en EE.UU.; mentor derm para el Match | Inscripción + solicitud de mentor IMG. Páginas de mentoría/IMG: **A VERIFICAR (5-sep)** (derminterest.org no respondió a la verificación automática) | Web/formulario DIGA | — | ⚪ diferido | **feb-mar 2027** (post Step 1) |
| 6 | Colega dermatólogo/a de la Sociedad Peruana de Dermatología (plan B del caso) | Senior author alternativo para el case report | 1 caso de complicación de relleno/láser con fotos (Joseph redacta) | Vía Dr. Ciro (nombre concreto) | — | ⚪ solo si #1 no tiene caso en 3 semanas | Activar la **1ª semana de oct-2026** si #1 no dio caso |

Leyenda de estado: 🔴 no contactado · 🟡 contactado, sin respuesta · 🟢 respondió / en marcha · ⚫ rechazó · ⚪ diferido.

## 2. Registro de contactos (append; una línea por interacción)

| Fecha | Con quién | Canal | Resumen (1 línea) | Resultado / siguiente paso |
|---|---|---|---|---|
| 5-sep-2026 | — | — | Se crea el CRM y se redactan los 3 mensajes de septiembre (no enviados) | Joseph revisa y envía (mensajes 1-3) |

## 3. Borradores de los 3 mensajes de septiembre (NO ENVIADOS — revisar, personalizar y enviar)

### Mensaje 1 — Dr. Ciro (WhatsApp para pedir la reunión + guion de la propuesta)

**WhatsApp (pedir 20 minutos):**
> Dr. Ciro, buenos días. Le escribo por dos cosas concretas de investigación que quiero proponerle como coautor:
> publicar la tesis como research letter (ya tengo el borrador armado con los datos que analizamos) y un reporte de
> caso de su consulta, del que yo haría todo el trabajo de redacción y envío. ¿Tendría 20 minutos esta semana o la
> próxima, en persona o por llamada? Le llevo la propuesta en una hoja. Gracias.

**Guion de la reunión (una hoja; dejar impresa):**
1. **Tesis → research letter** (600-1.000 palabras, 1 tabla, 1 figura). Datos ya analizados: n=316, rs=0,637
   (IC95 % 0,563-0,699), κw=0,81, 70,6 % con impacto moderado-severo. Cascada: JAAD International → International
   Journal of Dermatology → Actas Dermo-Sifiliográficas → Anais Brasileiros. Él: **último autor**; yo: primer autor
   y correspondencia; redacto, verifico citas, formateo y envío; él revisa 1 vez (≈1 h) y firma. Necesito de él:
   (a) confirmar si hubo aprobación formal de un CEI o solo permiso de la I.E. y, si no la hubo, la vía de
   aprobación expedita/retrospectiva (CEI del hospital o de la FMH-UNCP); (b) la versión del CADI que se usó y su
   permiso; (c) su ORCID (o crearlo en 10 minutos).
2. **Carta al editor** (≤500 palabras) sobre un artículo de 2026 de JCD/JAAD sobre complicaciones de rellenos o
   láser en fototipos IV-VI, con ángulo peruano. Él: coautor; 30 minutos de revisión clínica. Fecha objetivo de
   envío: oct-2026.
3. **Reporte de caso** de su consulta (últimos 6-12 meses): prioridad complicación de inyectable o reacción a
   láser/RF en fototipo IV-V; si no, dermatosis rara con buenas fotos. Él: senior author. Yo: consentimiento de
   publicación (plantilla bilingüe lista), protocolo de fotos, CARE 13 ítems, borrador, envío a Dermatology Online
   Journal (feb-2027, tras el Step 1). Su tiempo total estimado: 2 h en 4 meses. Fecha límite para elegir el caso:
   **31-oct-2026**.
4. Cierre: "¿Cuál de los tres le interesa más empezar? Con el que diga, le mando el documento esta semana."

### Mensaje 2 — AuthorAID / Rising Scholars (solicitud de mentor; en inglés; se pega en el perfil/solicitud)

> **Subject: Mentoring request — early-career physician from Peru, first English-language manuscript (dermatology)**
>
> I am a medical graduate from Universidad Nacional del Centro del Perú (Huancayo, Peru), first author of a completed
> cross-sectional thesis on acne severity and quality of life in 316 adolescent girls (Spearman rs = 0.64; weighted
> kappa 0.81), which I am rewriting as an 800-word research letter for JAAD International / International Journal of
> Dermatology. I am looking for a mentor with experience in dermatology or clinical epidemiology publishing who could
> (1) review one draft of the research letter for clarity and English usage (December 2026) and (2) briefly comment
> on a 500-word letter to the editor (October 2026). Total time requested: about 2-3 hours over four months, by email
> or shared document; I will send clean, STROBE-checked drafts with verified references. I use Spanish as my first
> language and can work in English. Thank you for considering this request.

Datos que pide el registro (rellenar Joseph): país (Perú), institución (FMH-UNCP), disciplina (dermatología /
salud pública), nivel (early-career), idiomas (ES/EN). Verificado 5-sep-2026: la red es **gratuita** y abierta a
investigadores del Sur Global; la mecánica exacta de la solicitud (búsqueda de mentor vs. solicitud publicada) se
confirma dentro de la plataforma tras registrarse (**A VERIFICAR (5-sep)**: la página de búsqueda no respondió).

### Mensaje 3 — Prof. Finlay (6 líneas; en inglés)

> **Subject: Permission to use the CADI (Spanish) in a Peruvian adolescent cohort — data offered for validation**
>
> Dear Professor Finlay,
> I am a medical graduate from Universidad Nacional del Centro del Perú. In my thesis (n = 316 adolescent girls,
> school-based, Huancayo, 2026) the CADI correlated with IGA-graded acne severity (Spearman rs = 0.64, 95% CI
> 0.56-0.70; 70.6% moderate-to-severe impairment). I would like to (1) request permission to publish these results
> using the Spanish CADI version [indicar cuál — A VERIFICAR], and (2) ask whether you would be interested in a
> Peruvian-Spanish validation study of the CADI (n ≈ 130, Cronbach's alpha, ICC, convergent validity vs DLQI),
> for which our group can collect the data and would welcome your guidance and co-authorship.
> Thank you for your time. Sincerely, Joseph Max Soto Tocas, MD — ORCID [rellenar] — Huancayo, Peru.

Antes de enviar: (a) comprobar en la página del CADI de Cardiff (<https://www.cardiff.ac.uk/medicine/resources/quality-of-life-questionnaires/cardiff-acne-disability-index>)
el procedimiento vigente de licencia (según búsqueda del 5-sep-2026 se tramita con Technology Transfer y el copyright
debe reproducirse al pie del cuestionario; la página no respondió a la verificación automática → **A VERIFICAR (5-sep)**);
(b) si la licencia es administrativa, enviar la solicitud formal a Technology Transfer **y** el email personal a
Finlay (el segundo es el que abre la coautoría); (c) adjuntar 1 página con la tabla 1 de `TESIS_L0/research_letter_outline.md`.

## 4. Campo "mentor / senior author" por entregable (se copia en la Mesa editorial de la RUTA §9)

| Entregable | Senior author / mentor | Estado 5-sep-2026 |
|---|---|---|
| Tesis L0 → research letter | Dr. Ciro (último autor) · AuthorAID/Rising Scholars (inglés) · Finlay (permiso CADI; coautoría L6 futura) | ninguno confirmado |
| Carta al editor (CARTA_1) | Dr. Ciro (coautor) | no propuesto |
| Case report #1 | Dr. Ciro o colega SPD (senior author) | sin caso |
| PROSPERO SR-1 | Dr. Ciro (revisor #2 / validación clínica) + colaborador IMG (2º cribado) | sin revisor #2 |
| SR-1 | Cotofana (feb-mar 2027, tras protocolo) | diferido |
