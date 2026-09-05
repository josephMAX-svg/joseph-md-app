# CARE checklist (2013) — 13 ítems · rellenable para el Case Report #1

> Fuente verificada el **5-sep-2026** en la página oficial: <https://www.care-statement.org/checklist>
> (PDF oficial: <https://www.care-statement.org/s/CARE-checklist-English-2013.pdf>). Los 13 ítems de abajo
> son los del CARE 2013 tal como los publica care-statement.org; el texto entre comillas es traducción fiel
> del original en inglés. La mayoría de revistas (DOJ, JAAD Case Reports, IJD, JCD) piden adjuntar este
> checklist con nº de página/línea al someter — se rellena la columna "Dónde está" al final, no al principio.

**Cómo usarlo**: 1) copiar este fichero a `CARE_checklist_13_<caso>.md` cuando el caso exista; 2) escribir el
borrador siguiendo las secciones en este orden (CARE = estructura del manuscrito); 3) marcar ☑ solo cuando el
ítem esté en el texto y anotar página/línea; 4) exportar como tabla a Word para el envío (docx_assembler.py
`--template care` la genera con las 13 secciones vacías).

| Nº | Ítem CARE | Qué exige (traducción del original) | Dónde está (pág./línea) | ☐ |
|----|-----------|-------------------------------------|-------------------------|---|
| 1 | **Título** | "El diagnóstico o la intervención de interés principal seguido de las palabras 'case report'." | | ☐ |
| 2 | **Palabras clave** | "2 a 5 palabras clave que identifiquen los diagnósticos o intervenciones de este reporte de caso (incluyendo 'case report')." | | ☐ |
| 3 | **Resumen** | Estructurado o no estructurado: (a) introducción — qué hace único al caso; (b) "las preocupaciones principales del paciente y los hallazgos clínicos importantes"; (c) diagnósticos principales, intervenciones y desenlaces; (d) conclusión — lecciones clave. | | ☐ |
| 4 | **Introducción** | "Resume brevemente por qué este caso es único y puede incluir referencias de la literatura médica." | | ☐ |
| 5 | **Información del paciente** | Datos desidentificados; preocupaciones y síntomas principales; "antecedentes médicos, familiares y psicosociales incluyendo información genética relevante"; intervenciones previas relevantes y sus resultados. | | ☐ |
| 6 | **Hallazgos clínicos** | "Describir el examen físico (EF) significativo y los hallazgos clínicos importantes." | | ☐ |
| 7 | **Línea de tiempo** | "Información histórica y actual de este episodio de atención organizada como línea de tiempo (figura o tabla)." → tabla obligatoria en nuestro formato (ver plantilla `agentic/prompts_claude_code/case_report_CARE.md`). | | ☐ |
| 8 | **Evaluación diagnóstica** | Métodos diagnósticos; dificultades diagnósticas; diagnóstico con las consideraciones del diferencial; características pronósticas cuando apliquen. | | ☐ |
| 9 | **Intervención terapéutica** | Tipos de intervención; "administración de la intervención terapéutica (dosis, concentración, duración)"; cambios en la intervención con su explicación. | | ☐ |
| 10 | **Seguimiento y desenlaces** | "Desenlaces evaluados por el clínico y por el paciente si están disponibles"; resultados de pruebas de seguimiento; adherencia y tolerabilidad; eventos adversos o inesperados. | | ☐ |
| 11 | **Discusión** | "Fortalezas y limitaciones de su abordaje de este caso"; discusión de la literatura relevante; justificación de las conclusiones; lecciones principales en la conclusión. | | ☐ |
| 12 | **Perspectiva del paciente** | "El paciente debe compartir su perspectiva sobre el/los tratamiento(s) que recibió." (1-2 párrafos, en sus palabras, recogidos ANTES de redactar — CARE "writing a case report"). | | ☐ |
| 13 | **Consentimiento informado** | "El paciente debe dar consentimiento informado. (Proporcionarlo si se solicita.)" → usar `consentimiento_publicacion_ES_EN.md`; declarar en el texto: "Written informed consent for publication of clinical details and images was obtained from the patient" (o "from the parent/legal guardian" si menor). | | ☐ |

## Requisitos adicionales que las revistas objetivo suman al CARE (verificado 5-sep-2026)
- **Dermatology Online Journal** (<https://doj.dermsquared.com/index.php/doj/about/submissions>): case report
  **600-1.200 palabras** (sin referencias/tablas/leyendas); "a signed statement of informed consent must be
  obtained and kept in the possession of the author/institution"; **no** enviar fotos con tiras negras en los
  ojos ("do not submit masked photographs"); iniciales, joyas y tatuajes fuera de la imagen; solo detalles
  esenciales del paciente. No cobra envío ni revisión; APC listado en DOAJ: US$300 (ver RUTA §3).
- **Elsevier (JAAD Case Reports / JAAD Intl)** (<https://www.elsevier.com/about/policies-and-standards/patient-consent>):
  consentimiento **escrito, explícito e informado** del paciente o su representante legal para "case details,
  videos, recordings, images, photographs, and illustrations"; lo **conserva el autor** y solo se envía si la
  revista lo pide por escrito; si los dos padres/tutores de un menor no coinciden, "consent should be deemed
  not to have been given". Elsevier **no** provee formulario estándar (por eso existe la plantilla propia).
- **CARE "Writing a case report"** (<https://www.care-statement.org/writing-a-case-report>): desidentificar y
  obtener el consentimiento **antes** de someter; "some journals have consent forms which must be used
  regardless of informed consents you have obtained" → comprobar en la revista elegida si exige SU formulario.

## Errores que hacen que un reviewer devuelva un case report (para el checkpoint pre-envío)
1. Sin ítem 7 (timeline) — el más olvidado; 2. sin ítem 12 (perspectiva del paciente) — casi ningún
autor novato lo incluye; 3. consentimiento asistencial en vez de consentimiento **de publicación**;
4. fotos con datos identificables o con barras negras; 5. "único en la literatura" sin búsqueda documentada
(anotar en la Introducción la búsqueda: base, fecha, términos, nº de casos previos); 6. dosis sin unidades
(ítem 9); 7. discusión sin limitaciones (ítem 11).
