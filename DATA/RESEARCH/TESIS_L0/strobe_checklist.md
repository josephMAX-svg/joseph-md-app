# STROBE — checklist para estudios transversales (22 ítems), rellenable para la tesis L0

> Fuente: STROBE Statement — "Checklist of items that should be included in reports of cross-sectional studies"
> (PDF oficial descargado y leído el **5-sep-2026** desde
> <https://www.strobe-statement.org/download/strobe-checklist-cross-sectional-studies-pdf>; índice de checklists:
> <https://www.strobe-statement.org/checklists/>). El texto de la columna "Recomendación" es traducción fiel; los
> ítems marcados con * piden la información por separado para expuestos y no expuestos (aquí: por grado IGA).
> **Formato research letter**: en 600-1.000 palabras no caben los 22 ítems desarrollados; la regla es que cada
> ítem esté **al menos en una frase, en la tabla, en la figura o en el material suplementario** (que casi todas
> las revistas admiten sin límite de palabras). La columna "Dónde" se rellena al final con página/línea.

| Sección | Nº | Recomendación (STROBE) | Cómo lo cubre la tesis (pre-relleno con lo que consta en el repo) | Dónde | ☐ |
|---|---|---|---|---|---|
| Título y resumen | 1a | Indicar el diseño del estudio con un término habitual en el título o el resumen | Título EN: "…a **cross-sectional** study" (o "school-based cross-sectional study") | | ☐ |
| | 1b | Ofrecer en el resumen un resumen informativo y equilibrado de lo hecho y lo hallado | Abstract 150-200 palabras si la revista lo pide; en research letter suele NO haber abstract → el primer párrafo lo cumple | | ☐ |
| Introducción | 2 | Explicar el contexto científico y la justificación | Acné en adolescentes + impacto en QoL; gap: sin datos peruanos/andinos con CADI; instrumentos validados en LMIC | | ☐ |
| | 3 | Objetivos específicos e hipótesis preespecificadas | Objetivo: asociación entre severidad (IGA) y QoL (CADI); hipótesis: correlación positiva | | ☐ |
| Métodos | 4 | Elementos clave del diseño al principio | Transversal, censal con criterio de inclusión (IGA ≥ 1) | | ☐ |
| | 5 | Lugar, localizaciones y fechas relevantes (reclutamiento, exposición, seguimiento, recogida de datos) | I.E. Nuestra Señora de Cocharcas, Huancayo (3.250 m s. n. m. — A VERIFICAR (5-sep) la altitud exacta si se cita), Perú; fechas de recogida: A VERIFICAR (5-sep) (mes-mes 2026) | | ☐ |
| | 6a | Criterios de elegibilidad, fuentes y métodos de selección | Todas las estudiantes mujeres matriculadas (censo, n = 865); incluidas si IGA ≥ 1 (n = 316); exclusiones: A VERIFICAR (5-sep) (p. ej. tratamiento sistémico activo, ausencia el día del examen) | | ☐ |
| | 7 | Definir claramente desenlaces, exposiciones, predictores, confusores y modificadores; criterios diagnósticos | Exposición: severidad IGA (0-4, escala FDA); desenlace: CADI (0-15; 5 ítems ×0-3; categorías leve 0-4 / moderado 5-9 / severo 10-15 — A VERIFICAR (5-sep) los cortes usados en la tesis); covariables: edad, grado escolar, (otras: A VERIFICAR) | | ☐ |
| | 8* | Para cada variable, fuentes de datos y métodos de evaluación; comparabilidad si hay >1 grupo | IGA por examen clínico (Joseph) con gold standard del dermatólogo (Dr. Ciro) → κ ponderado 0.8125; CADI autoadministrado (versión en español: A VERIFICAR (5-sep) cuál y con qué permiso — ver etica.md 1.7) | | ☐ |
| | 9 | Esfuerzos para abordar fuentes de sesgo | Doble evaluación IGA (κ); cuestionario anónimo (reduce deseabilidad social); censo (sin sesgo de selección por muestreo) | | ☐ |
| | 10 | Cómo se llegó al tamaño del estudio | Censal: no hubo cálculo muestral; se reporta n analítico 316 (no el n censal 865 como si fuera la muestra — MD_MAESTRO §2.6) | | ☐ |
| | 11 | Cómo se manejaron las variables cuantitativas; agrupaciones y por qué | IGA y CADI tratadas como ordinales (no se dicotomizan para el análisis principal); categorías CADI solo descriptivas | | ☐ |
| | 12a | Métodos estadísticos, incluidos los de control de confusión | Spearman rs con IC95 % bootstrap (nº de remuestreos: A VERIFICAR (5-sep)); κ ponderado (pesos: lineal/cuadrático — A VERIFICAR); software: Python (scipy/statsmodels) versión: A VERIFICAR | | ☐ |
| | 12b | Métodos para subgrupos e interacciones | Si se hizo por edad/grado: describir; si no: "no subgroup analyses were prespecified" | | ☐ |
| | 12c | Cómo se abordaron los datos faltantes | Nº de cuestionarios incompletos y manejo (análisis de casos completos): A VERIFICAR (5-sep) | | ☐ |
| | 12d | Métodos analíticos que tengan en cuenta la estrategia de muestreo | Censo → no aplica (decirlo) | | ☐ |
| | 12e | Análisis de sensibilidad | Si se hizo Kendall τ o exclusión de IGA=1: describir; si no, omitir | | ☐ |
| Resultados | 13a* | Nº de individuos en cada etapa (elegibles, examinados, confirmados, incluidos, analizados) | 865 tamizadas → ___ examinadas → 316 con IGA ≥ 1 incluidas → ___ con CADI completo analizadas (A VERIFICAR (5-sep) los dos huecos) | | ☐ |
| | 13b | Razones de no participación en cada etapa | A VERIFICAR (5-sep) | | ☐ |
| | 13c | Considerar un diagrama de flujo | En research letter: una frase; el diagrama va a suplementario si la revista lo admite | | ☐ |
| | 14a* | Características de los participantes y de exposiciones/confusores | **Tabla 1** del outline: n (%) por grado IGA; edad; CADI mediana [RIC] por grado | | ☐ |
| | 14b | Nº con datos faltantes por variable | Nota al pie de la Tabla 1 | | ☐ |
| | 15* | Nº de eventos de desenlace o medidas resumen | Prevalencia de acné 39.8 % (316/865 — A VERIFICAR (5-sep) el denominador exacto); 70.6 % impacto moderado-severo | | ☐ |
| | 16a | Estimaciones crudas y ajustadas con precisión (IC95 %); qué confusores y por qué | rs = 0.637 (IC95 % bootstrap 0.563-0.699), p < .001; κw = 0.8125 (IC95 %: A VERIFICAR (5-sep)) | | ☐ |
| | 16b | Límites de las categorías cuando se categorizan variables continuas | Cortes del CADI (ítem 7) en la Tabla 1 | | ☐ |
| | 16c | Traducir estimaciones relativas a absolutas si es relevante | No aplica (correlación); opcional: % con CADI moderado-severo en IGA 1 vs IGA 3-4 (dato absoluto muy citable) | | ☐ |
| | 17 | Otros análisis (subgrupos, interacciones, sensibilidad) | Solo si se hicieron | | ☐ |
| Discusión | 18 | Resumir resultados clave con referencia a los objetivos | Párrafo 1 de la discusión del outline | | ☐ |
| | 19 | Limitaciones, fuentes de sesgo/imprecisión, dirección y magnitud | Transversal (sin causalidad); un solo colegio (mujeres); autoinforme del CADI; evaluador no ciego al CADI (si fue así — A VERIFICAR (5-sep)); versión del CADI no validada en Perú (si aplica) | | ☐ |
| | 20 | Interpretación global cautelosa | Comparar rs con series previas (buscar 3-5 papers con CADI/DLQI en adolescentes vía OpenAlex y **verificar cada DOI con citation_verifier.py**) | | ☐ |
| | 21 | Generalizabilidad (validez externa) | Adolescentes mujeres andinas escolarizadas; no extrapolar a varones ni a población clínica | | ☐ |
| Otra información | 22 | Fuente de financiación y papel de los financiadores | "No external funding" (si es así) | | ☐ |

## Notas
- El STROBE **no** exige que un estudio "sea bueno", exige que se **reporte** todo: un ítem que la tesis no hizo
  se declara ("no sensitivity analyses were performed"), no se esconde.
- Adjuntar este checklist rellenado (con página/línea) como fichero suplementario en el envío: JAAD Intl e IJD
  lo piden para observacionales (A VERIFICAR (5-sep) en la guía de la revista el día del envío).
- Ítems 5-8 y 12 dependen del documento de tesis original: leerlo una vez con esta tabla al lado (átomo de
  nov-2026 en `etica.md` §5) y cerrar todos los "A VERIFICAR" de golpe.
