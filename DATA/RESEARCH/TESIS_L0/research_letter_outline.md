# TESIS L0 → Research Letter (600-1.000 palabras · 1 tabla · 1 figura) — outline y cascada

> **Decisión de formato**: la tesis no se reescribe como original completo (3.000-4.000 palabras, 4-6 tablas)
> porque no cabe en 45' interdiarios hasta enero. Se reescribe como **research letter** — el formato que JAAD
> International, IJD y las revistas de la cascada aceptan para datos originales breves — con los números que ya
> constan en el repo. Lo que se debe verificar en el documento de tesis está marcado **A VERIFICAR (5-sep)**.
> Cada cita se marca `[CIT:id]` y **solo** entra en el manuscrito cuando `agentic/citation_verifier.py` la devuelve
> `verified` (DOI real). Este outline es la entrada de `agentic/prompts_claude_code/research_letter_STROBE.md`.

## 1. Cascada de revistas (en este orden; una a la vez, nunca envío simultáneo)

| Paso | Revista | Formato para datos originales breves | Límites (verificados / A VERIFICAR) | Coste para Joseph (Perú) | Fuente del dato |
|---|---|---|---|---|---|
| 1 | **JAAD International** (Elsevier, fully OA, Q1, JIF 5.2 JCR 2024) | Research Letter | Límite de palabras/refs/figuras: **A VERIFICAR (5-sep)** en la Guide for Authors (ScienceDirect devolvió 403 a las herramientas automáticas: <https://www.sciencedirect.com/journal/jaad-international/publish/guide-for-authors>) | APC listado en DOAJ **US$2.575** (DOAJ, actualizado 1-sep-2026); Perú = **Grupo B Research4Life → 50 %** (política Elsevier) ó **65 % del precio de lista** si el título entra en el piloto GPOA (Elsevier pricing, tabla "Based on World Bank 01 July 2026") → **US$1.288-1.674** | `../journals.md` · `../RUTA_PUBLICACION_2027.md` §3 |
| 2 | **International Journal of Dermatology** (Wiley/ISD, híbrida, Q2, JIF ~3.2) | "Clinical Correspondence" (600 palabras, ≤5 refs, ≤2 figuras/tablas, sin abstract — dato de WebSearch 5-sep sobre la guía Wiley: **A VERIFICAR (5-sep)**, la página devolvió 403) | Ver celda anterior | **$0** por la vía suscripción (híbrida; no elegir OA) | `../journals.md` |
| 3 | **Actas Dermo-Sifiliográficas** (AEDV/Elsevier, bilingüe ES/EN) | Carta científico-clínica / original breve | **A VERIFICAR (5-sep)** | journals.md dice Diamond ($0, la AEDV cubre el APC); **pero DOAJ (1-sep-2026) lista APC US$1.870 con waiver Elsevier** → **discrepancia: A VERIFICAR (5-sep)** en la página de la revista antes de contar con $0 | DOAJ API + journals.md |
| 4 | **Anais Brasileiros de Dermatologia** (SBD) | Carta / comunicação breve | **A VERIFICAR (5-sep)** (sin registro DOAJ por ISSN 1806-4841 en la consulta del 5-sep) | journals.md: Diamond **$0** (la SBD paga) — A VERIFICAR (5-sep) | journals.md |

Regla de cascada (MANUAL §9.3): cada rechazo → incorporar TODOS los comentarios → siguiente revista en ≤2 semanas.
Antes de cada envío: releer la guía de esa revista **ese día** y adaptar límites (no hay dos iguales).

## 2. Estructura del research letter (objetivo 750 ± 150 palabras sin refs/tabla/figura)

**Título (≤ 15 palabras, con el diseño):**
"Acne severity and quality of life in Peruvian adolescent girls: a school-based cross-sectional study"
(alternativa con gancho de dato: "…: 70% report moderate-to-severe impairment").

**Autores:** Joseph Max Soto Tocas¹ (primer autor, correspondencia), [coautor(es) A VERIFICAR (5-sep)], Ciro Jesús
Rodríguez Aliaga² (senior/último autor). ¹Facultad de Medicina Humana, Universidad Nacional del Centro del Perú,
Huancayo. ²Servicio de Dermatología, Hospital Regional Docente Clínico Quirúrgico Daniel Alcides Carrión, Huancayo.
ORCID de ambos (A VERIFICAR). Palabras clave: acne vulgaris; quality of life; adolescent; Peru; CADI; IGA.

**To the Editor / Párrafo 1 — contexto y gap (≈120 palabras)**
- Acné = dermatosis más frecuente en adolescentes; el impacto psicosocial no siempre sigue a la severidad clínica
  [CIT:global-burden-acne] [CIT:cadi-original-finlay].
- Casi toda la evidencia con instrumentos específicos (CADI) viene de Europa/Asia; en Latinoamérica los datos
  son escasos y en población escolar andina inexistentes (afirmación que hay que respaldar con búsqueda
  documentada: OpenAlex/PubMed, fecha, términos → si aparece algún estudio peruano, se cita y se reformula el gap).
- Objetivo: estimar la asociación entre severidad (IGA) y calidad de vida (CADI) en adolescentes mujeres de un
  colegio público de Huancayo (3.250 m s. n. m. — A VERIFICAR).

**Párrafo 2 — métodos (≈150 palabras; STROBE 4-12 en una pasada)**
- Diseño transversal, censal (todas las estudiantes matriculadas, n = 865, [meses] 2026 — A VERIFICAR); incluidas
  con acné IGA ≥ 1 (n = 316).
- IGA (0-4) por examen clínico estandarizado; concordancia con dermatólogo (gold standard) en [n] pacientes:
  κ ponderado 0.81.
- CADI (0-15, 5 ítems) autoadministrado, versión en español [cuál/permiso — A VERIFICAR]; cortes leve/moderado/
  severo (A VERIFICAR).
- Análisis: Spearman con IC95 % bootstrap ([B] remuestreos — A VERIFICAR); Python (scipy/statsmodels).
- Ética: una frase de `etica.md` §3 (aprobación CEI nº/fecha o exención) + consentimiento parental y asentimiento.

**Párrafo 3 — resultados (≈180 palabras; STROBE 13-16)**
- Flujo: 865 tamizadas → 316 con acné (prevalencia 39.8 %) → [n] analizadas con CADI completo (A VERIFICAR).
- Tabla 1: distribución por grado IGA (n, %), edad, CADI mediana [RIC] y % moderado-severo por grado.
- Resultado principal: rs = 0.637 (IC95 % 0.563-0.699; p < .001) — correlación **fuerte** para un instrumento
  de QoL (interpretación de magnitud según convención citada [CIT:cohen-o-equivalente]).
- 70.6 % con impacto moderado-severo; **dato absoluto citable**: % moderado-severo en IGA 1 vs IGA 3-4
  (calcular desde la base — A VERIFICAR) → es la frase que los lectores citarán.
- Figura 1: diagrama de cajas (o violín) del CADI por grado IGA con puntos individuales (jitter) y rs en el panel;
  alternativa: barras apiladas % leve/moderado/severo por IGA. Una sola figura, una idea.

**Párrafo 4 — discusión (≈220 palabras; STROBE 18-21)**
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
(Universidad Nacional del Centro del Perú, defended 20 April 2026)". Referencias: ≤ 5-10 según revista, Vancouver,
todas `verified`.

## 3. Tabla 1 (plantilla — rellenar desde la base anonimizada)

| Grado IGA | n (%) | Edad, media (DE) | CADI, mediana [RIC] | CADI moderado-severo, n (%) |
|---|---|---|---|---|
| 1 (casi limpio) | | | | |
| 2 (leve) | | | | |
| 3 (moderado) | | | | |
| 4 (severo) | | | | |
| **Total** | **316 (100)** | | | **[223] (70.6)** ← comprobar que 70.6 % de 316 ≈ 223 (A VERIFICAR) |

Nota al pie: n con datos faltantes por variable (STROBE 14b); cortes del CADI; IGA según escala FDA.

## 4. Plan de trabajo (átomos de 45', interdiarios; ver `etica.md` §5)
1. Reunir documentos de ética (oct) — bloquea todo lo demás en JAAD Intl/IJD.
2. Abrir la base anonimizada → Tabla 1 + figura 1 (matplotlib/seaborn; 300 dpi; misma paleta que la app no hace
   falta — sobria, escala de grises + un acento).
3. Búsqueda de 5-8 referencias (OpenAlex/PubMed) → `citation_verifier.py` → solo `verified`.
4. Redactar párrafos 1-4 en inglés con el prompt `research_letter_STROBE.md`; pasar `strobe_checklist.md`.
5. Revisión Dr. Ciro (coautoría) → AuthorAID/edición → formato de la revista 1 → envío (feb-2027).
