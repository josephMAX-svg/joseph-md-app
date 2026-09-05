# Case Report #1 — candidatos de caso (registro vivo)

> **Estado 5-sep-2026: NO HAY CASO.** Joseph no tiene plaza SERUMS ni consulta propia (el examen 2026-II no se
> rindió; SERUMS aparece en el ROADMAP recién en la fase MIR), así que el "caso propio (hospital/SERUMS)" que
> asumía la RUTA §2 no existe. El case report de feb-mar 2027 (→ Dermatology Online Journal) solo ocurre si el
> caso se identifica **antes del 31-oct-2026** (fecha límite para tener consentimiento + fotos + senior author
> y redactar en nov-dic con el CARE). Este fichero es la tabla que se rellena en el átomo CR-1 y el punto de
> partida de la conversación con el Dr. Ciro (ver `../MENTORES.md`, mensaje 1).

## 1. Tabla de candidatos (vacía — rellenar una fila por caso propuesto)

| # | Diagnóstico / evento | Fuente (quién lo atiende) | Por qué es publicable (novedad documentada: base + fecha + nº casos previos) | Fotos disponibles (D0 / evolución / calidad) | Consentimiento de publicación (☐ pendiente ☐ firmado dd-mmm) | Senior author | Línea del programa (L4 complicación estética / L5 energía-fototipo / otra) | Revista objetivo | Estado (idea · en evaluación · aceptado · descartado) | Siguiente paso + fecha |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | ☐ | | | | idea | |
| 2 | | | | | ☐ | | | | idea | |
| 3 | | | | | ☐ | | | | idea | |

**Regla de corte**: se elige el caso que tenga **las 4 cosas** a la vez: (a) fotos D0 y de evolución de calidad
o posibilidad de tomarlas ahora (`protocolo_fotos.md`), (b) paciente localizable y dispuesto a firmar
(`consentimiento_publicacion_ES_EN.md`), (c) senior author dermatólogo que atendió el caso, (d) una novedad que
se puede escribir en una frase con búsqueda documentada ("PubMed, 5-sep-2026, términos X: 3 casos previos, ninguno
en fototipo IV-V / ninguno en Perú"). Un caso "interesante" sin (a) o (b) se descarta sin discutir.

## 2. Fuentes candidatas (decidir en septiembre)

### Fuente A — Dr. Ciro Jesús Rodríguez Aliaga (Hospital Regional Docente Clínico Quirúrgico Daniel Alcides Carrión, Huancayo)
- Ya es el **co-autor ancla nacional** del programa (researchProgram.ts L0; MD_MAESTRO §10) y asesor de la tesis
  → la relación existe, no hay que "abrirla".
- Qué pedirle (mensaje redactado en `../MENTORES.md`): **1-2 casos de su consulta** de los últimos 6-12 meses,
  con prioridad: (1) **complicación de inyectable** (oclusión vascular, nódulo tardío, granuloma, PIH tras
  procedimiento) = Línea 4 y el nicho Mayo; (2) reacción adversa a láser/RF en fototipo IV-V = Línea 5;
  (3) si no hay estético: dermatosis rara con buenas fotos y evolución documentada (vale igual para el CV, aunque
  suma menos al perfil estético).
- Él como **senior author (último autor)**, Joseph primer autor redactor; se le ofrece hacer el 100 % de la
  redacción, CARE, consentimiento, fotos y envío — su trabajo es elegir el caso, validar la clínica y firmar.
- Ventaja: acceso inmediato a caso + fotos + paciente; el consentimiento lo puede obtener él en la siguiente
  cita del paciente.
- Riesgo: que el caso no sea estético → aceptar igual (el objetivo de feb-mar 2027 es el **primer** case report,
  no el mejor).

### Fuente B (plan B) — colega dermatólogo/a de la Sociedad Peruana de Dermatología
- Perfil: dermatólogo/a con consulta estética (Lima/Huancayo/Arequipa) que tenga complicaciones de rellenos o
  láser documentadas y **sin tiempo para escribir**. Joseph ofrece exactamente eso: escribir, formatear, someter
  y gestionar la revisión; él/ella es senior author y dueño/a del caso.
- Cómo llegar: (1) preguntarle al Dr. Ciro por un nombre concreto (la vía más corta); (2) contactos de la
  facultad UNCP / rotación de dermatología; (3) A VERIFICAR (5-sep): directorio de socios de la Sociedad
  Peruana de Dermatología — comprobar si es público antes de contar con él.
- Regla: **un solo mensaje concreto** ("busco 1 caso de complicación de relleno con fotos para un case report
  CARE en Dermatology Online Journal; yo redacto, usted es senior author; tiempo suyo estimado: 2 h en 3 meses").

### Fuente C (oportunista, no planificar sobre ella)
- Casos que Joseph vea en la rotación/derma clínica de la app (sección Derma) o consultas informales de
  conocidos: sin médico tratante que firme como senior author **no** son publicables → solo sirven si se
  redirigen a A o B.

## 3. Flujo desde que aparece un candidato (encaja en la franja Research 13:30-14:15 interdiaria)
1. **CR-1** Rellenar la fila; búsqueda de novedad en PubMed/OpenAlex documentada (base, fecha, términos, n) → si
   hay >10 casos similares publicados, el ángulo debe ser otro (fototipo, contexto peruano, manejo con recursos
   limitados) o se descarta.
2. **CR-2** Consentimiento de publicación firmado (ES) en la siguiente cita del paciente; escanear y guardar en
   `_privado/` (fuera de git) — ver `consentimiento_publicacion_ES_EN.md`.
3. **CR-3** Fotos según `protocolo_fotos.md` (o auditar las existentes: fondo, luz, escala, EXIF).
4. **CR-4** Timeline del caso (tabla CARE ítem 7) + perspectiva del paciente (ítem 12) recogida en la misma cita.
5. **CR-5** Borrador con `agentic/prompts_claude_code/case_report_CARE.md` (13 secciones) → citas por
   `citation_verifier.py` → `docx_assembler.py --template care`.
6. **CR-6** Revisión del senior author (2 h de su tiempo, máximo) + mentor AuthorAID para el inglés si ya está
   asignado (`../MENTORES.md`).
7. **CR-7** Checklist `CARE_checklist_13.md` con página/línea + formato de la revista (DOJ 600-1.200 palabras).
8. **CR-8** Envío **después del Step 1** (feb-2027): cuenta en el sistema de envío de la revista creada con
   antelación (eScholarship/DOJ) + ORCID; cover letter; declarar consentimiento y "no conflict".

## 4. Registro de decisiones
| Fecha | Decisión | Quién |
|---|---|---|
| 5-sep-2026 | Se crea la carpeta y se fija el 31-oct-2026 como fecha límite para tener caso + consentimiento + senior author. Fuente A primero; B solo si A no tiene caso en 3 semanas. | Claude (análisis Palmerton v3) — pendiente de que Joseph lo confirme |
