# TESIS L0 — Ética, consentimientos y datos: lo que hay que archivar ANTES de someter

> **Por qué este fichero**: la tesis (IGA × CADI, adolescentes mujeres, I.E. Nuestra Señora de Cocharcas,
> Huancayo, 2026; n analítico = 316) es el **único dataset original** de Joseph y el ítem de mayor peso posible
> en el CV (first-author original). Pero es un estudio en **menores** en un colegio: JAAD International, IJD y
> el resto de la cascada rechazan de entrada un manuscrito sin (1) nº y fecha de aprobación de un comité de ética
> (CEI/IRB) y (2) declaración de consentimiento parental + asentimiento. **En el repo no consta ninguna de las
> dos cosas** (MD_MAESTRO L0 y MANUAL §10.1 solo dicen "envío a JAAD International jun-jul 2026", que no ocurrió).
> Todo lo marcado **A VERIFICAR (5-sep)** lo tiene que responder Joseph con el documento en la mano; no se
> escribe en el manuscrito hasta tenerlo.

## 1. Checklist de documentos (rellenar con nº, fecha y dónde está el PDF)

| # | Documento | Estado | Dato exacto (nº / fecha / emisor) | Dónde está el PDF |
|---|-----------|--------|-----------------------------------|-------------------|
| 1 | **Aprobación del Comité de Ética en Investigación (CEI)** — ¿de la FMH-UNCP, del Hospital Regional Docente Clínico Quirúrgico Daniel Alcides Carrión, de otro CEI registrado ante el INS? | A VERIFICAR (5-sep) | Nº de acta/resolución: ______ · fecha: ______ · comité: ______ | |
| 2 | **Resolución/dictamen de aprobación del proyecto de tesis** por la FMH-UNCP (unidad de investigación; Dir. Investigación Dra. Ana Cecilia Ho Palma según MD_MAESTRO §10) | A VERIFICAR (5-sep) | Nº resolución: ______ · fecha: ______ | |
| 3 | **Autorización de la I.E. Nuestra Señora de Cocharcas** (dirección / UGEL Huancayo) para el tamizaje en el colegio | A VERIFICAR (5-sep) | Oficio nº: ______ · fecha: ______ | |
| 4 | **Consentimiento informado de padres/tutores** (menores de 18) — modelo usado + nº de firmados | A VERIFICAR (5-sep) | Modelo: ______ · firmados: ____ / 865 tamizadas | |
| 5 | **Asentimiento informado de las adolescentes** — modelo + nº | A VERIFICAR (5-sep) | Modelo: ______ · firmados: ____ | |
| 6 | **Acta de sustentación** (20-abr-2026) con título exacto y jurados (para la sección "this work is based on the thesis…" y para el repositorio UNCP/SUNEDU) | Existe (defendida 20-abr-2026) — copia A VERIFICAR (5-sep) | | |
| 7 | **Permiso de uso del CADI** (Cardiff University; Prof. Finlay) y versión en español utilizada (¿traducción propia? ¿versión validada previa? ¿cuál?) | A VERIFICAR (5-sep) — enlazado con el mensaje 3 de `../MENTORES.md` | Versión usada: ______ · permiso: ______ | |
| 8 | **Base de datos anonimizada** (sin nombres/DNI/aula) + diccionario de variables + script de análisis (Spearman, bootstrap, κ ponderado) — para "data availability statement" y reproducibilidad | A VERIFICAR (5-sep) — MD_MAESTRO §10 dice scripts en `D:\motor_apex\` | Ruta: ______ | |
| 9 | **Declaración de conflicto de intereses y financiación** (autofinanciado / sin financiación externa) | Redactar (2 líneas) | | |
| 10 | **Nº ORCID** de Joseph y del Dr. Ciro (Editorial Manager exige el del autor de correspondencia) | A VERIFICAR (5-sep) — checklist "research-infra" de la app | Joseph: ______ · Dr. Ciro: ______ | |

## 2. Si NO hubo aprobación formal de un CEI (escenario probable si solo hubo permiso de la I.E.)

Las opciones, en orden de preferencia — **consultarlo con el asesor (Dr. Ciro) y con la unidad de investigación
de la FMH-UNCP en la primera semana de octubre**, no en el momento del envío:

1. **Aprobación retrospectiva / expedita por el CEI de la FMH-UNCP o del hospital.** Muchos CEI peruanos emiten
   una constancia de revisión expedita para estudios observacionales de riesgo mínimo ya ejecutados con
   consentimiento parental documentado; la carta suele decir "revisado y aprobado en modalidad expedita" con nº
   y fecha. Es lo que las revistas aceptan sin discusión. Pasos: solicitud formal + protocolo + modelos de
   consentimiento/asentimiento + oficio de la I.E. + resumen de resultados. Tiempo típico: semanas → por eso va
   en octubre.
2. **Constancia de exención** (si el CEI considera que un tamizaje educativo con cuestionario anónimo no
   requería aprobación previa según normativa local). Se declara en el manuscrito literalmente: "The [name]
   Ethics Committee reviewed the study and confirmed that formal approval was not required under local
   regulations (letter no. X, date)". Varias revistas la aceptan; JAAD Intl e IJD la suelen aceptar si va
   acompañada de consentimiento parental documentado (**A VERIFICAR (5-sep)** en la guía de cada revista el día
   que se elija).
3. **Cambiar el primer target de la cascada** a una revista que acepte declaración de conformidad con
   Helsinki + consentimiento parental sin nº de CEI (más frecuente en revistas de sociedad latinoamericanas /
   Diamond). Esto **no** elimina el problema para JAAD Intl/IJD; solo lo esquiva. Es el último recurso.
4. Lo que **no** se hace: inventar un nº de aprobación, "omitir" la sección de ética, o presentar el permiso de
   la I.E. como si fuera un CEI. Un retraction por ética destruye el CV que se intenta construir.

Marco normativo peruano a citar si hace falta (A VERIFICAR (5-sep) el texto vigente antes de citarlo): Reglamento
de Ensayos Clínicos del INS no aplica (estudio observacional); Ley 29733 de Protección de Datos Personales (datos
de salud de menores = datos sensibles → consentimiento del titular/representante); Código de Ética del CMP.

## 3. Frases modelo para la sección "Ethics" del research letter (rellenar con los datos del punto 1)
- EN, con CEI: "The study protocol was approved by the Research Ethics Committee of [institución] (approval no.
  ___, dated ___). Written informed consent was obtained from a parent or legal guardian of each participant and
  written assent from each adolescent. The study was conducted in accordance with the Declaration of Helsinki
  and the Peruvian Personal Data Protection Law (Law 29733)."
- EN, con exención: "The [institución] Research Ethics Committee reviewed the protocol and determined that
  formal approval was not required under local regulations (letter no. ___, dated ___); written parental consent
  and adolescent assent were obtained for all participants."
- Data availability: "The de-identified dataset and the analysis code (Python/scipy) are available from the
  corresponding author on reasonable request" — o depositarlos en Zenodo/OSF con DOI (mejor; cuenta como ítem
  de ciencia abierta y evita el "on request" que los editores ya miran con recelo).

## 4. Datos del estudio que ya constan en el repo (fuente: MD_MAESTRO §L0 y researchProgram.ts L0)
- Diseño: censal con criterio de inclusión (acné IGA ≥ 1); adolescentes mujeres; I.E. Nuestra Señora de
  Cocharcas, Huancayo, 2026. Tesis defendida el 20-abr-2026; primer autor Joseph; asesor Dr. Ciro Rodríguez.
- n censal = 865 tamizadas; n analítico = **316** casos confirmados; prevalencia de acné **39.8 %**.
- IGA (ordinal 0-4) × CADI (ordinal 0-15): **Spearman rs = 0.637**, p < .001, IC95 % bootstrap [0.563, 0.699];
  **κ ponderado = 0.8125** (concordancia interobservador en el IGA; el "gold standard" fue el Dr. Ciro);
  **70.6 %** con impacto moderado-severo en calidad de vida.
- Estos son los únicos números que se usan en el outline; cualquier cifra adicional (edad media, distribución
  por grado IGA, dominios del CADI) sale de la base de datos del punto 1.8, no de memoria.

## 5. Calendario mínimo (paralelo a la carta al editor; 45' interdiarios)
| Cuándo | Qué |
|---|---|
| 1ª semana oct-2026 | Reunir los 10 documentos de la tabla; preguntar al Dr. Ciro/FMH-UNCP por la vía 2.1 o 2.2 |
| oct-2026 | Solicitud al CEI (si aplica) + permiso CADI (mensaje 3 de MENTORES.md) |
| nov-2026 | `strobe_checklist.md` rellenado con los datos reales + tabla 1 + figura 1 |
| dic-2026 | Borrador research letter (`research_letter_outline.md`) → revisión Dr. Ciro |
| ene-2027 | PAUSA (Step 1) |
| feb-2027 | Edición de inglés (AuthorAID o servicio pagado, ver RUTA §3) → envío JAAD International |
