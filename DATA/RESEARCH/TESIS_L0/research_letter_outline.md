# TESIS L0 → Research Letter (≈500-600 palabras · ≤5 refs · 1 tabla O 1 figura + apéndice «versión larga») — outline y cascada

> **Decisión de formato**: la tesis no se reescribe como original completo (3.000-4.000 palabras, 4-6 tablas)
> porque no cabe en 45' interdiarios hasta enero. Se reescribe como **research letter** — el formato que JAAD
> International, IJD y las revistas de la cascada aceptan para datos originales breves — con los números que ya
> constan en el repo. Lo que se debe verificar en el documento de tesis está marcado **A VERIFICAR (5-sep)**.
> **Regla de límites (12-sep-2026 · gap 4):** T-3 → T-5 redactan al **límite más estricto conocido de la cascada** (≈500-600
> palabras, ≤5 refs, 1 tabla O 1 figura, sin abstract) para que ningún escalón obligue a recortar 3 átomos de redacción; el
> material sobrante vive en un **apéndice «versión larga»** (800 palabras / 3 tablas-figuras / 10 refs = Actas, que también cubre
> Anais 1.000 / 4 / 10). Los límites reales de cada escalón están en §1 con su fecha de verificación; los de JAAD Intl e IJD se
> leen con Chrome el día de T-7 (ambas guías devuelven 403 a las herramientas automáticas).
> Cada cita se marca `[CIT:id]` y **solo** entra en el manuscrito cuando `agentic/citation_verifier.py` la devuelve
> `verified` (DOI real). Este outline es la entrada de `agentic/prompts_claude_code/research_letter_STROBE.md`.

## 1. Cascada de revistas (en este orden; una a la vez, nunca envío simultáneo)

| Paso | Revista | Formato para datos originales breves | Límites (verificados / A VERIFICAR) | Coste para Joseph (Perú) | Fuente del dato |
|---|---|---|---|---|---|
| 1 | **JAAD International** (Elsevier, fully OA, Q1, JIF 5.2 JCR 2024) | Research Letter | **A VERIFICAR (12-sep) — abrir con Chrome**: 403 el 5-sep y el 12-sep en <https://www.jaadinternational.org/content/authorinfo> y en <https://www.sciencedirect.com/science/journal/26663287/publish/guide-for-authors> (elsevier.com redirige ahí). Único fragmento previo, no verificado: Notes & Comments ≤375 palabras / 2 refs (`../journals.md`). Hasta leerla, se redacta al límite de la fila 5 | APC listado en DOAJ **US$2.575** (1-sep-2026); Perú = **Grupo B Research4Life → 50 %** ó 65 % del precio de lista si aplica el piloto GPOA → **US$1.288-1.674** | `../journals.md` · `../RUTA_PUBLICACION_2027.md` §3 |
| 2 | **International Journal of Dermatology** (Wiley/ISD, híbrida, Q2, JIF ~3.2) | Correspondence / Clinical Correspondence | Dato de WebSearch del 5-sep, **no verificado**: 600 palabras, ≤5 refs, ≤2 figuras/tablas, sin abstract → **A VERIFICAR (12-sep) — abrir con Chrome** (Wiley `forauthors.html` y `author-guidelines` devolvieron 403 el 12-sep) | **$0** por la vía suscripción (híbrida; no elegir OA) | `../journals.md` |
| 3 | **Actas Dermo-Sifiliográficas** (AEDV/Elsevier, bilingüe ES/EN) | Carta científico-clínica | **VERIFICADO 12-sep-2026** (<https://www.actasdermo.org/es-guia-autores>): **800 palabras · ≤6 autores · ≤10 refs · 3 figuras/tablas combinadas · sin resumen** (Cartas al Director: 800 / ≤4 autores / 10 / 3) | **VERIFICADO 12-sep-2026** (<https://www.actasdermo.org/es-open-access>): APC EUR 1.710 / USD 1.870 (artículo corto EUR 710 / USD 775) **cubierto por la AEDV para todos los artículos aceptados → $0 para el autor**; además aplica waiver Research4Life. Discrepancia con DOAJ resuelta | guía de autores + página Open Access de la revista |
| 4 | **Anais Brasileiros de Dermatologia** (SBD) | Cartas – Investigação | **VERIFICADO 12-sep-2026** (instrucciones en SciELO, <https://www.scielo.br/journal/abd/about/#instructions>): **1.000 palabras · 10 refs · 4 figuras · sin resumen** (Correspondência: 400 palabras · ≤4 autores · 5 refs · 2 figuras; Cartas – Caso clínico: 700 / ≤6 / 10 / 4) | **$0** — la SBD paga el APC de todos los aceptados (verificado 5-sep-2026 en anaisdedermatologia.org.br) | SciELO + journals.md |
| 5 | **LÍMITE DE REDACCIÓN (T-3 → T-5)** | Versión corta = manuscrito | **≈500-600 palabras · ≤5 refs · 1 tabla O 1 figura · sin abstract** = el más estricto conocido (IJD 600/5/2 no verificado; JAAD Intl desconocido). **Apéndice «versión larga»**: 800 palabras / 3 tablas-figuras / 10 refs (Actas; cubre Anais). Antes de cada envío se relee la guía ESE DÍA y se elige la versión | — | esta tabla |

Regla de cascada (MANUAL §9.3): cada rechazo → incorporar TODOS los comentarios → siguiente revista en ≤2 semanas.
Antes de cada envío: releer la guía de esa revista **ese día** y adaptar límites (no hay dos iguales): JAAD Intl / IJD → versión corta
(fila 5); Actas / Anais → puede ir la versión larga (apéndice) si la guía lo permite ese día.

## 2. Estructura del research letter (versión corta: objetivo ≈ 550 palabras [500-600] sin refs/tabla/figura · versión larga [apéndice]: 800)

**Título (≤ 15 palabras, con el diseño):**
"Acne severity and quality of life in Peruvian adolescent girls: a school-based cross-sectional study"
(alternativa con gancho de dato: "…: 70% report moderate-to-severe impairment").

**Autores:** Joseph Max Soto Tocas¹ (primer autor, correspondencia), [coautor(es) A VERIFICAR (5-sep)], Ciro Jesús
Rodríguez Aliaga² (senior/último autor). ¹Facultad de Medicina Humana, Universidad Nacional del Centro del Perú,
Huancayo. ²Servicio de Dermatología, Hospital Regional Docente Clínico Quirúrgico Daniel Alcides Carrión, Huancayo.
ORCID de ambos (A VERIFICAR). Palabras clave: acne vulgaris; quality of life; adolescent; Peru; CADI; IGA.

**To the Editor / Párrafo 1 — contexto y gap (≈90 palabras · versión larga ≈120)**
- Acné = dermatosis más frecuente en adolescentes; el impacto psicosocial no siempre sigue a la severidad clínica
  [CIT:global-burden-acne] [CIT:cadi-original-finlay].
- Casi toda la evidencia con instrumentos específicos (CADI) viene de Europa/Asia; en Latinoamérica los datos
  son escasos y en población escolar andina inexistentes (afirmación que hay que respaldar con búsqueda
  documentada: OpenAlex/PubMed, fecha, términos → si aparece algún estudio peruano, se cita y se reformula el gap).
- Objetivo: estimar la asociación entre severidad (IGA) y calidad de vida (CADI) en adolescentes mujeres de un
  colegio público de Huancayo (3.250 m s. n. m. — A VERIFICAR).

**Párrafo 2 — métodos (≈130 palabras · versión larga ≈180; STROBE 4-12 en una pasada)**
- Diseño transversal, censal: **1.256 matriculadas** (3.º 375 · 4.º 449 · 5.º 432), evaluación **23-mar → 1-abr-2026** (8 días
  hábiles) — verificado 12-sep-2026 en la portada de `datos_tesis_acne.xlsx`; incluidas con acné IGA ≥ 1 (n = 316).
- IGA (0-4) por examen clínico estandarizado; concordancia con dermatólogo (gold standard) en [n] pacientes:
  κ ponderado 0.81.
- CADI (0-15, 5 ítems) autoadministrado, versión en español [cuál/permiso — A VERIFICAR]; cortes leve/moderado/
  severo (A VERIFICAR).
- Análisis: Spearman con IC95 % bootstrap ([B] remuestreos — A VERIFICAR); Python (scipy/statsmodels).
- Ética: una frase de `etica.md` §3 (aprobación CEI nº/fecha o exención) + consentimiento parental y asentimiento.

**Párrafo 3 — resultados (≈150 palabras · versión larga ≈200; STROBE 13-16)**
- Flujo STROBE 13 (**verificado 12-sep-2026**, hoja FLUJO PARTICIPANTES): 1.256 matriculadas → 291 excluidas por consentimiento
  (271 padres · 20 alumnas) → 965 elegibles → 100 ausentes → **865 evaluadas** → 80 registros incompletos → 785 completos →
  469 con IGA 0 → **316 con acné (IGA ≥ 1) = muestra analítica** (CADI completo en las 316). ⚠ La "prevalencia 39,8 %" del
  repo no cuadra con este flujo (316/785 = 40,3 %; 316/865 = 36,5 %) → **A VERIFICAR (12-sep)** el denominador en la tesis antes
  de escribir la cifra; en la versión corta basta con el flujo en números absolutos.
- Tabla 1: distribución por grado IGA (n, %), edad, CADI mediana [RIC] y % moderado-severo por grado.
- Resultado principal: rs = 0.637 (IC95 % 0.563-0.699; p < .001) — correlación **fuerte** para un instrumento
  de QoL (interpretación de magnitud según convención citada [CIT:cohen-o-equivalente]).
- 70.6 % con impacto moderado-severo; **dato absoluto citable**: % moderado-severo en IGA 1 vs IGA 3-4
  (calcular desde la base — A VERIFICAR) → es la frase que los lectores citarán.
- Figura 1: diagrama de cajas (o violín) del CADI por grado IGA con puntos individuales (jitter) y rs en el panel;
  alternativa: barras apiladas % leve/moderado/severo por IGA. Una sola figura, una idea.

**Párrafo 4 — discusión (≈160 palabras · versión larga ≈240; STROBE 18-21)**
- Hallazgo clave en 1 frase; comparación con 2-3 series previas con CADI en adolescentes (rs típicos — buscar y
  **verificar** [CIT:cadi-series-1] [CIT:cadi-series-2]); posible razón de un rs más alto (colegio femenino,
  contexto cultural, altitud/clima seco → A VERIFICAR si hay literatura; si no, no especular).
- Implicación práctica: en atención primaria peruana el IGA solo no basta; un CADI de 2 minutos identifica a
  las adolescentes con impacto severo aunque el acné sea leve (si el dato absoluto de IGA 1 lo respalda).
- Limitaciones (STROBE 19): transversal; un colegio, solo mujeres; autoinforme; evaluador no ciego al CADI
  (A VERIFICAR); versión del CADI sin validación psicométrica peruana (→ enlaza con L6 y el mensaje a Finlay).
- Generalizabilidad (21): adolescentes escolarizadas andinas; no clínica.
- Cierre: 1 frase de siguiente paso (validación del CADI en Perú = Línea 6; programa PERU-ACNE multicéntrico).

**Declaraciones (no cuentan palabras):** Funding: none. Conflicts of interest: none declared. Ethics + consent
(frase exacta de `etica.md` §3). Data availability (Zenodo/OSF DOI o "on reasonable request"). Author contributions
(CRediT: JMST — conceptualization, investigation, formal analysis, writing – original draft; CJRA — supervision,
validation, writing – review & editing). Statement: "This work is based on the first author's medical thesis
(Universidad Nacional del Centro del Perú, defended 20 April 2026)". Referencias: **≤ 5 en la versión corta** (≤ 10 en la
larga: Actas/Anais), Vancouver, todas `verified`.

## 3. Tabla 1 (plantilla — rellenar desde la base anonimizada)

| Grado IGA | n (%) — verificado 12-sep | Edad, media (DE) | CADI total, media (DE) — verificado 12-sep | CADI, mediana [RIC] | CADI moderado-severo, n (%) |
|---|---|---|---|---|---|
| 1 (casi limpio) | 112 (35,4) | A VERIFICAR → calcular en T-4 | 4,11 (1,97) | A VERIFICAR → T-4 | A VERIFICAR → T-4 |
| 2 (leve) | 110 (34,8) | A VERIFICAR → T-4 | 7,18 (2,54) | A VERIFICAR → T-4 | A VERIFICAR → T-4 |
| 3 (moderado) | 60 (19,0) | A VERIFICAR → T-4 | 8,07 (2,69) | A VERIFICAR → T-4 | A VERIFICAR → T-4 |
| 4 (severo) | 34 (10,8) | A VERIFICAR → T-4 | 9,68 (2,16) | A VERIFICAR → T-4 | A VERIFICAR → T-4 |
| **Total** | **316 (100)** | **15,41 (0,99)** · rango 13-18 (verificado 12-sep) | **6,53 (3,03)** · mediana 6 · rango 1-14 (verificado 12-sep) | 6 [RIC A VERIFICAR] | **[223] (70,6)** ← 0,706 × 316 = 223,1 ✓ aritmética; el conteo real sale de la base en T-4 (el DASHBOARD del xlsx categoriza sobre las 865, no sobre las 316) |

Fuente de las celdas verificadas: hoja "ESTADÍSTICA APA" de `D:\motor_apex\datos_tesis_acne.xlsx` (Tablas 1 y 4; n = 316; Shapiro-Wilk
p < .001 en todas las variables → Spearman; rs por dominio CADI 0,34-0,39). Las celdas "A VERIFICAR → T-4" se calculan desde la hoja
BASE DATOS en T-4 (vie 30-oct-2026), nunca se estiman.

Nota al pie: n con datos faltantes por variable (STROBE 14b); cortes del CADI; IGA según escala FDA.

## 4. Plan de trabajo (átomos de 45', interdiarios · fechas v5.10b del 12-sep-2026; ver `etica.md` §5)
1. **T-1 · mié 30-sep-2026** — ética: nº de CEI archivado o solicitud expedita PRESENTADA ese día (gate de T-7/T-8).
2. **T-3 · mié 28-oct** — Intro + Methods (≤250 palabras) al límite estricto. **T-4 · vie 30-oct** — abrir la base → Tabla 1 + Figura 1
   (matplotlib/seaborn, 300 dpi, sobria); UNA va al texto, la otra al apéndice.
3. **T-2 · mar 3-nov** — STROBE 22 ítems sobre el borrador v1: lo que no cabe en 500-600 palabras pasa al apéndice «versión larga».
4. **T-5 · jue 5-nov** — Discussion (≤150 palabras) + apéndice largo (800 / 3 / 10) + cascada con APC verificado (§1).
5. Búsqueda de ≤5 referencias (OpenAlex/PubMed) → `citation_verifier.py` → solo `verified` (las 6-10 restantes solo en el apéndice).
6. **T-6 · mié 11-nov** — revisión Dr. Ciro (coautoría, ICMJE/CRediT). **T-7 · mar 17-nov** — Guide for Authors de JAAD Intl leída
   con Chrome ese día + formateo + **gate 1** (nº CEI / exención) + **gate 2** (inglés revisado por Rising Scholars o editor).
7. **T-8 · lun 23-nov** — SUBMIT a JAAD International si pasan los dos gates; si no, seguimiento del CEI y envío en feb-2027 (cascada).

## 5. Apéndice «versión larga» (solo para Actas / Anais o si JAAD Intl acepta más)
- Fichero: `TESIS_L0/research_letter_v1_larga.md` (se crea en T-5). Contiene lo que NO cabe en la versión corta: la pieza sobrante
  (tabla o figura), 5 referencias adicionales (hasta 10), el detalle de dominios del CADI (rs por ítem 0,34-0,39, hoja ESTADÍSTICA
  APA) y el flujo completo de participantes en párrafo.
- Límites: 800 palabras / 3 tablas-figuras / 10 refs (Actas, verificado 12-sep) — también cabe en Anais (1.000 / 4 / 10, verificado
  12-sep). Se convierte con el mismo prompt (`research_letter_STROBE.md`, `<<VERSION>>` = long).
