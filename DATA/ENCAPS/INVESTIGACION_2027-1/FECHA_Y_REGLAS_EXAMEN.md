# ENCAPS / Evaluación para el SERUMS 2027-I: fecha y reglas del examen (Medicina)

> Investigación web del **dom 8-nov-2026**. Solo lectura: no se descargaron ficheros, no se enviaron formularios ni se abrió el examen real 2026-II (sigue reservado como pre-test ciego hasta el 8-ene-2027).
> Estados: **OFICIAL** = norma o nota oficial (El Peruano, Andina, MINSA citado por prensa) · **PRENSA** = medio o universidad que cita al MINSA · **AGREGADOR** = web de academia o de resultados que reprocesa los PDF del MINSA · **INFERIDO** = deducción propia a partir de datos · **A VERIFICAR** = no confirmado.
> Límite técnico: las páginas de gob.pe y cdn.www.gob.pe devuelven HTTP 418/403 a la herramienta de lectura. Los datos oficiales salen de El Peruano (busquedas.elperuano.pe), Andina y prensa que cita gob.pe. Los PDF oficiales de resultados quedan pendientes de revisar a mano.

---

## 0) Resumen ejecutivo

| Punto | Respuesta | Estado |
|---|---|---|
| ¿Hay fecha oficial 2027-I? | **No.** Al 8-nov-2026 no hay convocatoria ni anuncio del MINSA | OFICIAL (ausencia comprobada en búsqueda) |
| Fecha tentativa de academia | Theomed: «14 o 21 de marzo de 2027»; su campus marca el **dom 14-mar-2027** (`THEOMED_Y_DRIVE.md` §1) | AGREGADOR (campus privado) |
| **Fecha de referencia para planificar** | **dom 14-mar-2027**: es la más temprana plausible y la del plan (`_fechas_v6.json → encaps.examen`) | INFERIDO |
| Fecha más probable según el historial | entre el **dom 21-mar** y el **dom 18-abr-2027** (ver §1.5) | INFERIDO |
| **Fecha objetivo «listo»** | **dom 28-feb-2027** (2 semanas antes del 14-mar). Tope: **dom 7-mar-2027** (1 semana) | Recomendación |
| Disparador de la convocatoria | La antelación mínima observada es de 25 días. Si el **mié 17-feb-2027** no hay convocatoria, el 14-mar es improbable → 21-mar (tope mié 24-feb) | INFERIDO (coincide con la regla del repo) |
| Nº de preguntas · duración | **100 preguntas · 2 h** (72 s por pregunta) · 4 alternativas A-D · ficha óptica | OFICIAL / PRENSA |
| Nota | escala 0-20. Todas las notas publicadas son múltiplos de 0,2 → **nota = aciertos × 0,2, sin descuento por error** | INFERIDO (falta la norma) |
| Nota mínima | **Ninguna en la norma hallada.** El MINSA dijo en 2024 que la prueba «no busca aprobar o desaprobar» | OFICIAL (por ausencia) · A VERIFICAR en el instructivo 2027-I |
| Adjudicación | **Puntaje final = 0,70 × nota de la evaluación + 0,30 × promedio ponderado promocional (con internado)**, con 4 decimales y orden de mérito estricto | OFICIAL (RM 617-2026/MINSA) |
| 17,5 en aciertos | 87 aciertos = 17,4 (no llega) · **88 aciertos = 17,6** | INFERIDO (regla de 0,2) |
| Nota del 1.er puesto en Medicina | 2024-II ≤15,6 · 2025-I 17,2 · 2025-II ¿? (3.º = 16,2) · 2026-I **17,8** · 2026-II **19,0** | PRENSA / AGREGADOR |

---

## 1) Fecha del ENCAPS 2027-I

### 1.1 Terminología
- **ENCAPS** es el sistema informático de inscripción del MINSA. El examen se llama oficialmente **«Evaluación para el SERUMS»**.
- El **DS 013-2024-SA** (12-jul-2024) la creó como evaluación obligatoria. Desde el proceso 2024-II reemplaza al ENAM como nota de mérito para el SERUMS.
- Antes (2023-I, 2023-II, 2024-I) **no hubo examen del MINSA**: en Medicina se adjudicaba con 70 % ENAM (ASPEFAM) + 30 % PPP.
- El ENAM sigue existiendo para otros fines, pero ya no cuenta para el SERUMS. ASPEFAM no ha publicado fechas 2027 (sus últimas bases son de abril de 2026).

### 1.2 Estado al 8-nov-2026
- No hay convocatoria, cronograma ni resolución del MINSA para el 2027-I.
- No se encontró ningún anuncio público de academias con fecha 2027-I. Lo único es el campus de Theomed (privado): «fecha tentativa: 14 o 21 de marzo», con calendario hasta el 14-mar-2027.
- Restricción dura del calendario: el SERUMS **2026-I termina el 30-abr-2027** (RM 379-2026/MINSA). El Reglamento (art. 39, citado en esa RM) fija que el primer proceso del año suele empezar el **1 de mayo** y el segundo el **1 de octubre**.

### 1.3 Historial de procesos (anuncio → examen)

| Proceso | ¿Examen MINSA? | Anuncio / convocatoria | Fecha anunciada | Fecha real | Desfase | Antelación anuncio → examen | Inscripción |
|---|---|---|---|---|---|---|---|
| 2023-I | No (ENAM + PPP) | cronograma del Comité Central 12-abr-2023 (actualizado 2-jun) | — | — | — | — | inicio del servicio movido al 12-jun-2023 (RM 444-2023) |
| 2023-II | No (ENAM + PPP) | — | — | — | — | — | — |
| 2024-I | No (ENAM + PPP) | inscripción 1→29-mar-2024, ampliada al 12-abr | — | — | — | — | la adjudicación se suspendió y luego se reanudó |
| **2024-II** | **Sí (la primera)** | DS 013-2024-SA, 12-jul-2024 · cronograma publicado ≤ 15-ago | dom 1-sep-2024 | **dom 1-sep-2024** | 0 | 51 d desde el DS · 17 d desde el inicio de la inscripción | 15→24-ago |
| **2025-I** | Sí | 19-feb-2025 («Minsa anuncia fecha oficial») | dom 6-abr-2025 | **dom 6-abr-2025** | 0 | **46 d** | 21→30-mar |
| **2025-II** | Sí | cronograma difundido ≤ 2-ago-2025 (fecha exacta A VERIFICAR) | dom 24-ago-2025 | **dom 24-ago-2025** | 0 | ≥ 22 d | 4→13-ago |
| **2026-I** | Sí | **convocatoria 24-feb-2026** | **dom 22-mar-2026** | **dom 19-abr-2026** | **+28 d (reprogramado)** | 26 d al plan · 54 d a la fecha real | plan: desde 2-mar · real: 27-mar→10-abr |
| **2026-II** | Sí | **convocatoria 15-jul-2026** | dom 9-ago-2026 | **dom 9-ago-2026** | 0 | **25 d** | 16→23-jul |

Fuentes en §5 (bloques F1-F14).

### 1.4 Patrones
1. **5 de 5 evaluaciones fueron en domingo.** Ingreso de 7:00 a 9:30 y examen a las 11:00 (en 2024-II fue de 10:00 a 12:00).
2. **Nunca se adelantó una fecha anunciada.** 4 de 5 se mantuvieron y 1 de 5 (2026-I) se **retrasó 4 semanas**. El MINSA lo justificó por «mayor acceso y participación».
3. **Antelación del anuncio: de 25 a 54 días** (mínimo 25 d en 2026-II y 26 d en el plan original de 2026-I). La inscripción dura de 8 a 15 días y cierra entre 7 y 17 días antes del examen.
4. **Procesos «I»:** 6-abr-2025 y 22-mar-2026 (plan), que acabó el 19-abr-2026. Del examen al inicio del servicio pasaron 17-25 días (1-may-2025 y 6-may-2026).
5. **Resultados:** los preliminares salen de 1 a 4 días después y los finales de 5 a 9 días después.

### 1.5 Estimación 2027-I
- Si el servicio 2027-I debe empezar hacia el **1-may-2027**, con el desfase de 17-25 días de los procesos «I» el examen cae entre mediados de marzo y mediados de abril.
- **Semana Santa 2027 = jue 25 → dom 28-mar** (Pascua el 28). El dom 28-mar queda prácticamente descartado.
- Domingos candidatos: **14-mar · 21-mar · 4-abr · 11-abr · 18-abr**.
- Reparto subjetivo (juicio, no dato):
  - ≤ 21-mar: ~50 %. Theomed lo sugiere y el plan original de 2026-I fue el 22-mar.
  - Abril (4-18): ~45 %. 2025-I fue el 6-abr y 2026-I acabó el 19-abr.
  - Otra fecha: ~5 %.
- **Escenario de retraso tipo 2026-I:** se anuncia el 14 o el 21-mar y se mueve 4 semanas (11 o 18-abr). Un retraso cuesta poco al alumno. El riesgo real es **llegar tarde a una fecha temprana**.

### 1.6 Fecha de referencia y fecha objetivo
- **Referencia de planificación: dom 14-mar-2027** (la más temprana plausible; ya es la del plan).
- **Estar listo: dom 28-feb-2027.** Contenido cerrado; las 2 semanas finales quedan para simulacros 100Q en 2 h y repaso de cifras. **Tope: dom 7-mar-2027.**
- Si la convocatoria fija el 21-mar, el colchón sube a 3 semanas. Si fija abril, se reabre el plan con la fecha real.
- **Vigilancia:** la «Guía completa de la Evaluación para el SERUMS 2027-I» en gob.pe/minsa, más Andina y El Peruano. Regla de tope:
  - convocatoria ≥ 25 d antes → mié 17-feb para el 14-mar · mié 24-feb para el 21-mar · mié 10-mar para el 4-abr.

---

## 2) Reglas del examen

### 2.1 Marco normativo

| Norma | Qué fija | Estado |
|---|---|---|
| DS 013-2024-SA (12-jul-2024) | Crea la Evaluación para el SERUMS, obligatoria para todas las profesiones | OFICIAL (prensa) |
| RM 514-2024/MINSA (jul-ago 2024) | Lineamientos: **«hasta 100 preguntas»**, 5 bloques, casos clínicos, presencial, descentralizada y gratuita | PRENSA (cita la RM) |
| RM 544-2024/MINSA | Plan de implementación y bloques temáticos | PRENSA regional · A VERIFICAR |
| RM 428-2025/MINSA (28-jun-2025) | Modifica el Reglamento: **se considera la nota de la ÚLTIMA Evaluación para el SERUMS** (art. 23) | OFICIAL (El Peruano) |
| RM 155-2026/MINSA → Directiva Adm. 386-MINSA/DIGEP-2026 (feb-2026) | Regula la gestión de la evaluación: fases, responsables, procesamiento y publicación de resultados | OFICIAL (El Peruano). **Texto completo no leído: aquí debería estar la regla de calificación** |
| **RM 617-2026/MINSA (pub. 14-jul-2026)** | Modifica los arts. 25-26 del Reglamento (DS 005-97-SA): requisitos de inscripción y **puntaje final 70/30**, 4 decimales, desempate según el instructivo, 2 procesos al año más extraordinarios por RM | OFICIAL (El Peruano) |
| RM 379-2026/MINSA (13-abr-2026) | SERUMS 2026-I: plazas remuneradas del 6-may-2026 al 30-abr-2027 · equivalentes del 26-may-2026 al 30-abr-2027 | OFICIAL (El Peruano) |

### 2.2 Formato

| Regla | Valor | Estado |
|---|---|---|
| Nº de preguntas | **100**. La norma dice «hasta 100»; el balance del MINSA 2024-II y la prensa de 2025-II dicen 100. Además, la clasificación por área de los exámenes reales del repo suma 100 en 2025-I, 2025-II y 2026-I | OFICIAL / PRENSA / repo |
| Duración | **2 h** (11:00-13:00 en 2026-I y 2026-II) → **72 s por pregunta** | OFICIAL (Andina, El Peruano) |
| Ingreso | 7:00-9:30; después se cierra la puerta sin excepción | OFICIAL (Andina) |
| Alternativas | 4 (A-D) en ficha óptica con lápiz 2B. **Si se marcan 2 o más, la pregunta se invalida** | OFICIAL (guía de gob.pe, vía buscador) |
| Prohibido | celular, reloj inteligente, audífonos, calculadora, apuntes | OFICIAL (Andina) |
| Versiones | Hubo versiones A y B en 2024-II y en 2025-I | repo (`PRONOSTICO_WALKFORWARD_2027-1_v3.md`) |
| Sedes | 27 (2024-II) → 29 (2026-I y 2026-II) | PRENSA |
| Carreras | 6 (2024-II) → **12** (desde 2025-I). Medicina hace la misma evaluación con contenido «general + específico de la carrera» | PRENSA |

### 2.3 Áreas (temario MINSA) y pesos
- **5 bloques oficiales:**
  - I Salud Pública
  - II Cuidado Integral de Salud
  - III Ética e Interculturalidad
  - IV Investigación
  - V Gestión de Servicios de Salud
- La bibliografía oficial se publica por proceso: «Bibliografía de la Evaluación para el SERUMS 2026» en gob.pe.
- **El MINSA no publica pesos oficiales por bloque.** No se hallaron en la RM 514-2024 citada, en la prensa ni en el Congreso. La guía de una academia lo confirma: «no se publican pesos».
- **Distribución empírica** (nº de preguntas por área en exámenes reales; clasificación propia del repo, `PRONOSTICO_WALKFORWARD_2027-1_v3.md` §1). No se muestra el 2026-II, que está reservado:

| Área | 2024-II | 2025-I | 2025-II | 2026-I | Vector v3 para 2027-I |
|---|---|---|---|---|---|
| II Cuidado Integral | 23 | 21 | 28 | 36 | **30** |
| I Salud Pública | 24 | 28 | 23 | 30 | **27** |
| V Gestión | 31 | 23 | 31 | 20 | **21** |
| III Ética e Interculturalidad | 9 | 17 | 16 | 11 | **13** |
| IV Investigación | 14 | 11 | 2 | 3 | **9** (bimodal según el comité) |

### 2.4 Cómo se calcula la nota vigesimal
- **Escala 0-20.** Los agregadores la indican así («notas en escala 0-20») y todas las notas publicadas caen en ese rango.
- **Regla inferida: nota = aciertos × 0,2, sin penalización.** Todas las notas observadas son múltiplos exactos de 0,2:
  - mínimos de 2,40 (2024-II) y 4,0 (2026-II)
  - 14,80 · 15,60 · 16,20 · 16,6 · 16,8 · 17,0 · 17,2 · 17,4 · 17,6 · 17,8 · 18,0 · 18,2 · 18,6 · 18,8 · 19,0
  - Con un descuento fraccional por error aparecerían notas que no son múltiplos de 0,2, y no aparecen.
  - **Estado: INFERIDO.** Ninguna norma leída lo dice expresamente; debe estar en la Directiva 386-MINSA/DIGEP-2026 o en el instructivo → **A VERIFICAR**.
- **Consecuencia práctica:** no hay incentivo para dejar preguntas en blanco. **Hay que marcar las 100**, y una sola alternativa por pregunta.
- **Preguntas anuladas:** no se halló cómo se tratan (recalculo o punto para todos) → A VERIFICAR.
- Los resultados se publican en lista por profesión y región. Los estados sin nota son «NSP» (no se presentó) y «NULO».

### 2.5 Nota mínima
- **No hay nota mínima aprobatoria en las normas halladas** (RM 617-2026, RM 428-2025, DS 013-2024-SA vía prensa).
- En 2024-II el MINSA dijo que la evaluación «no busca aprobar o desaprobar»: solo fija el orden de prioridad.
- La prensa (Panamericana, La República, Caretas) habla de «aprobados» y «desaprobados» con un corte de 10,5. Un agregador cuenta «aprobados» en Medicina (88,4 % en 2026-I) sin decir el umbral. **Ese 10,5 no tiene respaldo normativo hallado** → A VERIFICAR en el instructivo 2027-I.

### 2.6 Uso para la adjudicación de plazas
- **Puntaje final (PF) = 0,70 × nota de la Evaluación para el SERUMS + 0,30 × promedio ponderado promocional (PPP, con la nota del internado si corresponde)**, con hasta 4 decimales (RM 617-2026/MINSA, arts. 25-26).
- Antes regía la misma proporción 70/30, pero con la nota del ENAM.
- **Orden de mérito estricto por profesión.** Desempate según el instructivo de cada proceso. La adjudicación fue virtual (Zoom) en 2026-II, con programa por fecha, hora y sala.
- **Cuenta la nota de la última evaluación rendida** (RM 428-2025), no la mejor.
- **Bonificaciones (discapacidad +15 %, licenciados FF. AA. +10 %):** los agregadores las aplican, pero la RM 617-2026 recoge la opinión de SERVIR de que **no aplican al SERUMS** porque no crea vínculo laboral → A VERIFICAR en el instructivo 2027-I.
- **Discrepancia:** un blog de academia afirma PF = 0,6 × nota + 0,4 × PPP. **Se descarta** frente al texto de la RM 617-2026.
- Ejemplo: con nota 17,6 y PPP 15,0 → PF = 12,32 + 4,50 = **16,82**. Un punto de PPP vale 0,3 de PF; un acierto más (0,2 de nota) vale 0,14 de PF. El examen domina, pero el PPP no es despreciable para el primer puesto.

---

## 3) Benchmarks de puntaje (Medicina)

### 3.1 Primeros puestos y distribución por proceso

| Proceso | Evaluados en Medicina | 1.er puesto nacional (Medicina) | Otros datos | Fuente · estado |
|---|---|---|---|---|
| 2024-II | ¿? (11 776 en las 6 carreras) | **≤ 15,60** (máximo global de todas las carreras) | 3.er puesto en Medicina = **14,80** · promedio nacional de Medicina = **10,39** · solo el 31 % de todas las carreras superó 10,5 (3 650 / 11 776) · universidad mejor rankeada en Medicina con promedio 12,61 | MINSA vía prensa · UPAO · Panamericana |
| 2025-I | ¿? (31 455 en todas las carreras) | **17,2** | ≥ 17: 2 · ≥ 16: al menos 15 (15 de las 20 mejores notas son de Medicina) | AGREGADOR (aulaserums) · A VERIFICAR con el PDF |
| 2025-II | ~3 267 postulantes | **no hallado** | 3.er puesto = **16,20** | PRENSA (La República / UPAO, Exitosa) |
| 2026-I | **6 719** | **17,80** | 2.º = 17,60 · **≥ 17,5: 2** · **≥ 17,0: 9** · promedio = **13,05** · «aprobados» 88,4 % · Lima Centro: promedio 13,13, máximo 17,60 | AGREGADOR (morganomedic; aulaserums coincide en 17,8) |
| 2026-II | **4 041** | **19,0** | mínimo 4,0 · las 22 mejores notas son de Medicina: ≥ 18,6: 6 · **≥ 18,0: 18** · ≥ 17,8: 22 · 2.º regional en La Libertad = 17,4 | AGREGADOR (Theomed, aulaserums) · UPAO |

**Lectura:** la nota del primer puesto osciló **de ≤ 15,6 a 19,0 en dos años**. La dificultad cambia mucho entre procesos y **el ranking es relativo dentro de cada proceso**.

### 3.2 Aciertos y nota (regla inferida de 0,2 por acierto)

| Aciertos | 80 | 83 | 85 | 86 | 87 | **88** | 89 | 90 | 92 | 93 | 95 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Nota | 16,0 | 16,6 | 17,0 | 17,2 | 17,4 | **17,6** | 17,8 | 18,0 | 18,4 | 18,6 | 19,0 |

- **17,5 no es una nota posible.** Superar 17,5 exige **88 aciertos (17,6)**: como máximo 12 errores en 100.

### 3.3 Qué habría valido 17,6 en cada proceso
- 2024-II: por encima del máximo global (15,6) → **1.º**.
- 2025-I: por encima del máximo de Medicina (17,2) → **1.º** (agregador).
- 2025-II: por encima del 3.er puesto (16,2) → probablemente **1.º** (A VERIFICAR: falta el 1.er puesto).
- 2026-I: igual al 2.º (17,6; máximo 17,8) → **top 2-3 de 6 719** (percentil ≈ 99,97).
- 2026-II: **fuera del top 22** (22 notas ≥ 17,8 y 18 notas ≥ 18,0 de 4 041). Sería aproximadamente el top 1 % (INFERIDO; falta la distribución completa).

### 3.4 Percentiles disponibles (Medicina)
- 2026-I: **17,0 = top 9 / 6 719 → percentil ≈ 99,87** · 17,6 = top 2 · el promedio 13,05 queda cerca de la mediana (sin dato exacto).
- 2026-II: 17,8 → ≥ 22 / 4 041 (percentil ≤ 99,46) · 18,0 → 18 / 4 041 (≈ 99,55).
- No se hallaron percentiles 50/90/99 oficiales de ningún proceso. Los PDF oficiales de resultados por profesión de gob.pe permitirían calcularlos (pendiente, lectura manual).

### 3.5 Implicación para la meta
- **> 17,5 (88 aciertos)** asegura un puesto de élite (≈ top 1 %) en cualquier proceso observado. **Solo garantiza el primer puesto en un examen «duro»** (2024-II, 2025-I, 2025-II, 2026-I).
- En un examen «fácil» como el 2026-II, el primer puesto pidió **19,0 (95 aciertos)** y el top 18 pidió ≥ 18,0.
- **Meta operativa para el primer puesto: ≥ 90 aciertos (18,0) en simulacros calibrados de 100 preguntas en 2 h, con suelo de 88.** Para competir por el puesto exacto, sumar el PPP al cálculo del puntaje final (§2.6).

---

## 4) Pendientes y qué vigilar
1. **Convocatoria 2027-I** (gob.pe/minsa, «Guía completa de la Evaluación para el SERUMS 2027-I»): fecha, hora, sede, nº de preguntas, cronograma de inscripción en ENCAPS (por inicial del apellido) y fecha de inicio del servicio.
2. **Texto de la Directiva 386-MINSA/DIGEP-2026 y del instructivo 2027-I:** regla de calificación (0,2 por acierto, sin descuento), tratamiento de preguntas anuladas, nota mínima, desempate y bonificaciones.
3. **PDF oficiales de resultados de Medicina** (2025-I, 2025-II, 2026-I, 2026-II) para el 1.er puesto de 2025-II y la distribución completa (percentiles 50/90/99). gob.pe no es legible con la herramienta de lectura; hay que hacerlo a mano.
4. El examen real 2026-II y su clave **no se abrieron** (reservados hasta el 8-ene-2027).

---

## 5) Fuentes

**Fecha y cronogramas**
- F1 · 2026-II, fecha 9-ago, 23 382 evaluados de 26 528, 29 sedes, 5 bloques, resultados el 14-ago: https://www.infobae.com/peru/2026/08/09/resultados-serums-2026-ii-cuando-y-donde-se-publicara-la-lista-de-aprobados-de-la-evaluacion-del-minsa/
- F2 · 2026-II, convocatoria 15-jul, inscripción 16-23 jul, inscritos 24-jul: https://www.infobae.com/peru/2026/08/14/link-para-ver-resultados-serums-2026-ii-minsa-publicara-hoy-la-lista-de-profesionales-que-aprobaron-la-evaluacion/ · https://www.infobae.com/peru/2026/07/18/serums-2026-ii-minsa-anuncia-cronograma-de-inscripcion-y-fecha-del-examen/
- F3 · 2026-II, ingreso 7:00-9:30, inicio 11:00, 2 h, material permitido y prohibido: https://andina.pe/agencia/noticia-serums-2026ii-debes-tener-cuenta-para-evaluacion-se-realiza-hoy-domingo--1086749.aspx
- F4 · 2026-I, reprogramación (plan: inscripción desde el 2-mar y examen el 22-mar → real: inscripción 27-mar a 10-abr y examen el 19-abr; resultados 23 y 28-abr): https://andina.pe/agencia/noticia-evaluacion-para-serums-2026i-hoy-inicio-inscripcion-postulantes-1064443.aspx
- F5 · 2026-I, convocatoria del 24-feb-2026 (ficha de gob.pe, vista en el buscador): https://www.gob.pe/institucion/minsa/informes-publicaciones/7778137-convocatoria-de-la-evaluacion-para-el-serums-2026-i
- F6 · 2026-I, 2 h desde las 11:00, 39 762 postulantes, 5 515 plazas: https://elperuano.pe/noticia/293886-serums-2026-cerca-de-40-mil-profesionales-compiten-por-5515-plazas-bajo-estrictas-medidas-de-transparencia · https://andina.pe/agencia/noticia-serums-2026i-profesionales-de-salud-rinden-evaluacion-hoy-domingo-19-1071455.aspx
- F7 · 2026-I, resultados finales 28-abr, 29 sedes: https://larepublica.pe/sociedad/2026/04/28/resultados-finales-del-serums-2026i-revisa-la-lista-oficial-y-conoce-las-notas-maximas-1724352
- F8 · 2025-I, anuncio del 19-feb-2025 con examen el 6-abr: https://larepublica.pe/sociedad/2025/02/19/serums-2025i-minsa-anuncia-fecha-oficial-de-evaluacion-y-detalles-clave-para-postulantes-219469 · inscripción 21-30 mar: https://andina.pe/agencia/noticia-serums-2025i-inscripciones-inician-21-marzo-aqui-cronograma-1020657.aspx · 31 455 evaluados: https://andina.pe/agencia/noticia-resultados-serums-2025i-aqui-link-para-ver-quienes-aprobaron-evaluacion-1025027.aspx
- F9 · 2025-II, cronograma (inscripción 4-13 ago, examen 24-ago, resultados finales 1-sep): https://libero.pe/tiempoextra/2025/08/02/examen-serums-2025ii-4-de-agosto-inicia-inscripcion-de-participantes-evaluacion-156566 · examen realizado el 24-ago: https://andina.pe/agencia/noticia-serums-2025ii-link-resultados-de-evaluacion-realizada-24-agosto-1042473.aspx · servicio del 1-oct-2025 al 30-sep-2026: https://libero.pe/tiempoextra/2025/08/31/resultados-finales-de-evaluacion-serums-2025ii-consulta-tu-nota-alcanzada-segun-carrera-de-salud-2507621
- F10 · 2024-II, cronograma (inscripción 15-24 ago, examen dom 1-sep): https://www.elperuano.pe/noticia/250414-serums-2024-ii-revisa-este-link-para-conocer-el-cronograma-e-inscripciones-establecido-por-el-minsa · 27 sedes: https://larepublica.pe/sociedad/2024/08/30/serums-minsa-habilita-27-sedes-para-el-nuevo-examen-del-domingo-1227831
- F11 · 2024-I, cronograma (sin examen del MINSA): https://cdn.www.gob.pe/uploads/document/file/6137472/5421211-cronograma-del-proceso-serums-2024-1.pdf (solo la ficha del buscador; no se abrió)
- F12 · 2023-I, cronogramas del Comité Central (12-abr y 2-jun-2023) e inicio del servicio el 12-jun (RM 444-2023): https://cdn.www.gob.pe/uploads/document/file/4427688/2%20Cronograma%20SERUMS%202023-I%2012.04.pdf · https://img.lpderecho.pe/wp-content/uploads/2023/05/Resolucion-ministerial-444-2023-Minsa-LPDerecho.pdf (fichas del buscador)
- F13 · Fechas de inicio y fin del SERUMS 2026-I (RM 379-2026/MINSA) y art. 39 del Reglamento (1-may / 1-oct): https://busquedas.elperuano.pe/dispositivo/NL/2505761-1 · https://www.infobae.com/peru/2026/04/15/atencion-estudiantes-de-medicina-minsa-oficializa-fechas-de-inicio-y-cierre-del-serums-2026-i/
- F14 · ENAM: bases ASPEFAM (la más reciente es de abril de 2026; no hay fecha 2027): https://www.aspefam.org.pe/enam/enam2026e/bases_enam_26.04.2026.pdf (ficha del buscador; no se abrió)

**Reglas**
- R1 · RM 617-2026/MINSA (pub. 14-jul-2026): arts. 25-26, 70/30, 4 decimales, bonificaciones según SERVIR: https://busquedas.elperuano.pe/dispositivo/NL/2534447-1
- R2 · RM 428-2025/MINSA (pub. 28-jun-2025): art. 23, cuenta la nota de la última evaluación: https://busquedas.elperuano.pe/dispositivo/NL/2413993-1
- R3 · RM 155-2026/MINSA, Directiva 386-MINSA/DIGEP-2026: https://www.elperuano.pe/noticia/289867-minsa-mejora-proceso-de-evaluacion-serums-conoce-las-nuevas-reglas · https://elperuano.pe/noticia/289923-ministerio-de-la-salud-mejora-la-evaluacion-del-serums
- R4 · RM 514-2024/MINSA (hasta 100 preguntas, 5 bloques, casos): https://consultorsalud.com/peru-refuerza-el-serums-profesionales-de-salud
- R5 · 70/30 con el ENAM en 2024-II (antecedente): https://gestion.pe/peru/proceso-serums-ii-2024-la-nota-que-se-considerara-y-otros-lineamientos-establecidos-por-el-minsa-gobierno-profesionales-de-la-salud-noticia/
- R6 · Ficha óptica: 4 alternativas y doble marca inválida (guía 2026-II, vista en el buscador): https://www.gob.pe/115935-guia-para-el-correcto-llenado-de-la-ficha-optica-en-la-evaluacion-nacional-del-serums
- R7 · RM 417-2025/MINSA, proceso excepcional sin examen (los extraordinarios existen): https://busquedas.elperuano.pe/dispositivo/NL/2411974-1
- R8 · Discrepancia 60/40 (descartada): https://www.morganomedic.com/blog/calculadora-promedio-serums-2026

**Benchmarks**
- B1 · 2024-II, balance del MINSA (11 776 evaluados, máx 15,60, mín 2,40, 3 650 > 10,5, 100 preguntas, «no busca aprobar o desaprobar»): https://consultorsalud.com/minsa-entrego-balance-evaluacion-serums-2024 · https://larepublica.pe/sociedad/2024/09/07/las-6-nuevas-carreras-de-medicina-que-seran-incluidas-en-el-proximo-examen-serums-2025-del-minsa-resultados-serums-2024-universidad-nacional-mayor-de-san-marcos-175938
- B2 · 2024-II, promedio nacional de Medicina 10,39: https://panamericana.pe/salud/421232-serums-2024-ii-alarma-peru-altos-porcentajes-desaprobados-carreras-salud
- B3 · 2024-II, 3.er puesto en Medicina 14,80: https://upao.edu.pe/noticia/Medico-de-UPAO-entre-los-tres-mejores-del-Peru/
- B4 · 2025-I, mejores notas (máx Medicina 17,2): https://aulaserums.com/resultados2025i
- B5 · 2025-II, 3.er puesto en Medicina 16,20 y ~3 267 postulantes: https://larepublica.pe/nota-de-prensa/2025/08/29/upao-top-3-del-pais-en-serums-2025-2267104 · https://www.exitosanoticias.pe/publirreportaje/egresada-medicina-humana-uss-ocupo-tercer-puesto-examen-nacional-serums-2025-2-n158700/amp
- B6 · 2026-I, Medicina nacional (6 719 evaluados, máx 17,80, promedio 13,05, top 10): https://www.morganomedic.com/resultados-serums-2026/carrera/medicina · Lima Centro: https://www.morganomedic.com/resultados-serums-2026/lima-centro · mejores notas: https://aulaserums.com/resultados2026i
- B7 · 2026-II, Medicina (4 041 registros, máx 19,0, mín 4,0): https://academiatheomed.com/resultados-serums · mejores notas (todas de Medicina, 17,8-19,0): https://aulaserums.com/resultados2026ii · La Libertad 17,4: https://upao.edu.pe/noticia/Medicos-de-UPAO-vuelven-a-destacar-en-La-Libertad

**Internas (repo)**
- `DATA/ENCAPS/INVESTIGACION_2027-1/THEOMED_Y_DRIVE.md` §1: fecha tentativa de Theomed 14 o 21-mar.
- `DATA/ENCAPS/PRONOSTICO_WALKFORWARD_2027-1_v3.md` §1-2: distribución por áreas y vector v3.
- `DATA/ENCAPS/SENALES_2027-I.md`: regla de convocatoria = examen − 25 d y escenarios 14-mar / 21-mar / abril.
