# TESIS L0 — Ética, consentimientos y datos: lo que hay que archivar ANTES de someter

> **Por qué este fichero**: la tesis (IGA × CADI, adolescentes mujeres, I.E. Nuestra Señora de Cocharcas,
> Huancayo, 2026; n analítico = 316) es el **único dataset original** de Joseph y el ítem de mayor peso posible
> en el CV (first-author original). Pero es un estudio en **menores** en un colegio: JAAD International, IJD y
> el resto de la cascada rechazan de entrada un manuscrito sin (1) nº y fecha de aprobación de un comité de ética
> (CEI/IRB) y (2) declaración de consentimiento parental + asentimiento. **Actualización 12-sep-2026:** el punto (2) YA
> consta — la portada y la hoja "FLUJO PARTICIPANTES" de `D:\motor_apex\datos_tesis_acne.xlsx` registran un censo **solo con
> consentimiento** (291 excluidas por no consentir: 271 padres + 20 alumnas) — ver 1.4-1.5 y §4. **Lo que sigue sin constar es
> el nº y la fecha del CEI (1.1)**: por eso T-1 pasa a d7 (mié 30-sep-2026 en v5.10b; vie 2-oct-2026 en v5.11 y v5.12; mar 6-oct-2026 en v5.13; jue 8-oct-2026 en v5.14; **lun 12-oct-2026 en v5.15** — 🔴 12 días después del límite interno ≤ 30-sep) con la solicitud de revisión expedita presentada ese día
> y T-7/T-8 llevan el gate "sin nº de CEI o exención NO se envía" (MD_MAESTRO L0 y MANUAL §10.1 solo dicen "envío a JAAD
> International jun-jul 2026", que no ocurrió).
> Todo lo marcado **A VERIFICAR (5-sep)** lo tiene que responder Joseph con el documento en la mano; no se
> escribe en el manuscrito hasta tenerlo.

## 1. Checklist de documentos (rellenar con nº, fecha y dónde está el PDF)

| # | Documento | Estado | Dato exacto (nº / fecha / emisor) | Dónde está el PDF |
|---|-----------|--------|-----------------------------------|-------------------|
| 1 | **Aprobación del Comité de Ética en Investigación (CEI)** — ¿de la FMH-UNCP, del Hospital Regional Docente Clínico Quirúrgico Daniel Alcides Carrión, de otro CEI registrado ante el INS? | A VERIFICAR (5-sep) | Nº de acta/resolución: ______ · fecha: ______ · comité: ______ | |
| 2 | **Resolución/dictamen de aprobación del proyecto de tesis** por la FMH-UNCP (unidad de investigación; Dir. Investigación Dra. Ana Cecilia Ho Palma según MD_MAESTRO §10) | A VERIFICAR (5-sep) | Nº resolución: ______ · fecha: ______ | |
| 3 | **Autorización de la I.E. Nuestra Señora de Cocharcas** (dirección / UGEL Huancayo) para el tamizaje en el colegio | A VERIFICAR (5-sep) | Oficio nº: ______ · fecha: ______ | |
| 4 | **Consentimiento informado de padres/tutores** (menores de 18) — modelo usado + nº de firmados | **Consta (12-sep-2026)**: censo "con consentimiento" (portada: *"se evaluó a todas las presentes con consentimiento"*); **291 excluidas por consentimiento** de 1.256 matriculadas — 271 padres (120 no devolvieron el formato · 80 formato no entregado · 40 rechazaron · 31 formato extraviado) + 20 alumnas → 965 elegibles; las **865 evaluadas** tenían consentimiento parental. Falta: el **modelo** (PDF) y el nº exacto de formatos firmados (865 ≤ n ≤ 965) | Modelo: A VERIFICAR (12-sep) · firmados: ≥ 865 (evaluadas) / ≤ 965 (elegibles) | hoja "FLUJO PARTICIPANTES" del xlsx (fuera del repo) · PDF del modelo: ______ |
| 5 | **Asentimiento informado de las adolescentes** — modelo + nº | **Consta (12-sep-2026)**: el flujo registra **20 alumnas que rechazaron** (asentimiento negativo) dentro de las 291 excluidas → hubo asentimiento individual. Falta el **modelo** (PDF) y si fue escrito u oral | Modelo: A VERIFICAR (12-sep) · asentimientos: ≥ 865 · rechazos: 20 | idem |
| 6 | **Acta de sustentación** (20-abr-2026) con título exacto y jurados (para la sección "this work is based on the thesis…" y para el repositorio UNCP/SUNEDU) | Existe (defendida 20-abr-2026) — copia A VERIFICAR (5-sep) | | |
| 7 | **Permiso de uso del CADI** (Cardiff University; Prof. Finlay) y versión en español utilizada (¿traducción propia? ¿versión validada previa? ¿cuál?) | A VERIFICAR (5-sep) — enlazado con el mensaje 3 de `../MENTORES.md` | Versión usada: ______ · permiso: ______ | |
| 8 | **Base de datos anonimizada** (sin nombres/DNI/aula) + diccionario de variables + script de análisis (Spearman, bootstrap, κ ponderado) — para "data availability statement" y reproducibilidad | **Localizada (12-sep-2026)**: `D:\motor_apex\datos_tesis_acne.xlsx` — hojas PORTADA · BASE DATOS (1.256 filas, ID P-001…, sin nombres) · KAPPA PILOTO (15 casos, κw quadratic = 0,8125) · DASHBOARD · ESTADÍSTICA APA · FLUJO PARTICIPANTES. Pendiente (gap 11, otro lote): diccionario de variables, script de análisis y versión de depósito sin cuasi-identificadores (sección/fecha) | Ruta: `D:\motor_apex\datos_tesis_acne.xlsx` (fuera del repo) | — |
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
- Participant flow (EN, STROBE 13 — cifras verificadas el 12-sep-2026 en la hoja FLUJO PARTICIPANTES): "Of 1,256 enrolled
  girls, 291 were excluded for lack of consent (271 parents, 20 students) and 100 were absent; 865 were assessed between
  23 March and 1 April 2026, 785 had complete records, and the 316 with acne (IGA ≥ 1) formed the analytic sample."

## 4. Datos del estudio que ya constan en el repo (fuente: MD_MAESTRO §L0 y researchProgram.ts L0)
- Diseño: censal con criterio de inclusión (acné IGA ≥ 1); adolescentes mujeres; I.E. Nuestra Señora de
  Cocharcas, Huancayo, 2026. Tesis defendida el 20-abr-2026; primer autor Joseph; asesor Dr. Ciro Rodríguez.
- Flujo (verificado 12-sep-2026 en `datos_tesis_acne.xlsx`, portada + FLUJO PARTICIPANTES): **1.256** matriculadas (3.º 375 ·
  4.º 449 · 5.º 432) → 291 excluidas por consentimiento → 965 elegibles → 100 ausentes → **865 evaluadas** (23-mar → 1-abr-2026,
  8 días hábiles) → 80 registros incompletos → 785 completos → 469 IGA 0 → **316** analizadas (IGA ≥ 1).
- ⚠ La "prevalencia de acné **39.8 %**" del repo NO cuadra con ese flujo (316/785 = 40,3 % sobre registros completos;
  316/865 = 36,5 % sobre evaluadas) → **A VERIFICAR (12-sep)** en la tesis defendida qué denominador se reportó antes de
  citar la cifra en el manuscrito.
- IGA (ordinal 0-4) × CADI (ordinal 0-15): **Spearman rs = 0.637**, p < .001, IC95 % bootstrap [0.563, 0.699];
  **κ ponderado = 0.8125** (concordancia interobservador en el IGA; el "gold standard" fue el Dr. Ciro);
  **70.6 %** con impacto moderado-severo en calidad de vida.
- Estos son los únicos números que se usan en el outline; cualquier cifra adicional (edad media, distribución
  por grado IGA, dominios del CADI) sale de la base de datos del punto 1.8, no de memoria.

## 5. Calendario mínimo (paralelo a la carta al editor; 45' interdiarios)
| Cuándo | Qué |
|---|---|
| mié 30-sep-2026 (M1 · v5.15) | Pedir al Dr. Ciro, en la misma reunión de las 3 coautorías, la vía CEI (2.1 expedita/retrospectiva o 2.2 exención) y reunir los 10 documentos de la tabla |
| **lun 12-oct-2026 (T-1 · d7 · v5.15; 🔴 el interno ≤ 30-sep queda 12 días atrás: presentar la solicitud el mié 30-sep —día de M1— fuera del átomo si se quiere respetar)** | Nº de CEI archivado **o solicitud de revisión expedita PRESENTADA ese día** (nº de cargo + fecha en 1.1); párrafo de ética listo |
| mié 14-oct-2026 (M3) | Permiso CADI (mensaje 3 de MENTORES.md) — necesita la versión del CADI de 1.7 |
| nov 2026 | T-3/T-4 (lun 9-nov / mié 11-nov) → T-2 STROBE (vie 13-nov) → T-5 (mar 17-nov) → T-6 revisión Dr. Ciro (lun 23-nov) → T-7 formateo + gates (vie 27-nov) — v5.15 |
| jue 3-dic-2026 (T-8) | SUBMIT a JAAD International **solo si** hay nº de CEI/exención (gate 1) e inglés revisado (gate 2); si no, cascada a feb-2027 |
| ene-2027 | PAUSA (Step 1) |
| feb-2027 | Plan B del SUBMIT (si falló un gate): edición de inglés (Rising Scholars o editor) → envío JAAD International |

