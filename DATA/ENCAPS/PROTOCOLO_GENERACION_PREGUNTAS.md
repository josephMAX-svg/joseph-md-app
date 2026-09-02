# 🏭 PROTOCOLO MAESTRO — Generación de preguntas ENCAPS (rige TODAS, desde 02-jul-2026)
> Fuente única de cómo genero cada pregunta. Consolida y NO se re-discute. Sobrevive a compactación: si esto se comprime, lo esencial está también en memoria ([[encaps-motor-preguntas]]). Complementos: `SISTEMA_LOOP_DIARIO.md` (segmentos), `MASTER_MOTOR_PREGUNTAS.md`, `PRONOSTICO_WALKFORWARD_2026-2_v2.md`, `_registro_resoluciones.json` (errores), `CONOCIMIENTO/METODO_PALMERTON_Y_MEMORIA.md`, formato en [[encaps-formato-solucionario]].
> ⚠ Las 20 preguntas de I-3 D1 YA están generadas y guardadas — NO regenerar.

## Los 4 FACTORES que definen CADA pregunta (en este orden)

### 1. ESTRUCTURA — según hora/segmento del Google Calendar
Al pedir preguntas: mirar **hora + día** → ubicar el segmento (o el siguiente si va corrido). Cada segmento fija formato y mix (detalle en `SISTEMA_LOOP_DIARIO.md`):
- **Warm-up 20Q (04:45)** — pregunta→solución; 70% temas vistos + 30% críticos no vistos (Sem 1-2).
- **Repaso Multi-Temporal (07:15)** — preguntas de D-1/D-3/D-7 (retrieval espaciado).
- **Pre-test tema del día 10Q (08:15)** — CIEGAS del tema nuevo (Palmerton, sin clave hasta responder).
- **Consolidación 30Q (11:00)** — 100% temas vistos (60% hoy + 40% previos).
- **Evaluación Diaria (18:00)** — MODO EXAMEN, 72s/Q, **solución SOLO AL FINAL** (único).
- Simulacro sáb/dom — 100Q balanceado por área (**II33·I28·V22·III13·IV4** ← vector unificado 20-jul, ver §3).

### 2. DATA DE ERRORES (mi perfil de conocimiento)
Leer `TRACKING_ERRORES/_registro_resoluciones.json` + `PERFIL_CONOCIMIENTO.md`: sub-ángulos débiles, inversiones, aciertos-por-suerte (no asumir dominio). **Sobre-pesar lo que Joseph falla** para cerrar ángulos. Esta data CRECE cada ronda: al terminar CUALQUIER ronda, **APENDAR** el resultado al registro (por tema, respuesta, error, eval acierto).

### 3. DATA DE EXÁMENES (lo más importante — la realidad del examen)
Base para peso y tipo de pregunta:
- **Pronóstico walk-forward v2** (`PRONOSTICO_WALKFORWARD_2026-2_v2.md` **§7 = canónico**): áreas **II33·I28·V22·III13·IV4** (vector unificado 20-jul-2026; supersede II34·I27·V23·III13·IV3); **7 críticos** I-3/II-1/II-3/V-2/II-11/III-5/II-8; temas recalibrados **I-3 12 · V-2 9 · II-1 5 · V-1 3 · II-9 3**; **I-6 EXTINTA** (~0.5%, ya NO crítica), **V-MED = pseudo-código** (no está en el temario). Formato: viñeta ~90% global, pero **en I-3 el modal es viñeta CORTA de campo** (ver §5).
- **6 exámenes reales** (`exams_txt/`) + **claves SERUMS** 2024-2A/2B, 2025-1A/1B, 2025-2 → nivel, estilo, trampas reales. **Nivel de mis preguntas SIEMPRE ≥ examen real.**

### 3-bis. ⛔ GATE DE CLAVE OFICIAL — OBLIGATORIO ANTES DE ENTREGAR (regla de Joseph, 05-ago-2026)

**Ninguna pregunta sale sin que su clave haya sido contrastada contra el PDF de claves oficiales MINSA.** No es un paso opcional ni "si hay tiempo": es un gate. Si no se pasó, la pregunta NO se entrega.

**Dónde están las claves reales:** `D:\agente_estudio\ENCAPS\ENCAPS\TIO LOPEZ\CLAVE DE RESPUESTA <proceso>.pdf` — 2024-2A · 2024-2B · 2025-1A · 2025-1B · 2025-2. Es el examen íntegro con **la alternativa correcta resaltada en amarillo**. Se abren con la herramienta Read sobre el PDF completo (⚠ el parámetro `pages` NO funciona en este equipo: falta poppler/pdftoppm → hay que leer el PDF entero). `exams_txt/` **solo tiene enunciados, SIN clave** — no sirve para verificar.

**Procedimiento por ronda:**
1. Antes de redactar, listar de qué examen/pregunta sale el molde de cada ítem.
2. Abrir los PDF de claves de esos procesos y **leer el resaltado**, ítem por ítem.
3. Si la clave que iba a poner ≠ la resaltada → **manda el PDF**. Corregir la pregunta y, además, corregir el documento del repo que indujo el error.
4. Si el molde es de **2026-1** (no hay PDF de claves de ese proceso en disco): marcar el ítem como **"molde no verificable contra clave oficial"** y decírselo a Joseph explícitamente. No presentarlo como verificado.
5. Registrar en el JSON de claves de la ronda, por ítem, **qué se verificó y contra qué**.

**Jerarquía de verificación (manda de arriba hacia abajo):**
`PDF de claves oficiales` > `compendio local extraído` > `normativa citada con número y año` > `MAPA_COBERTURA` > `GUIA_POR_TEMA`.

⚠ **`GUIA_POR_TEMA_2026-2.md` NO es fuente de claves.** La generaron agentes leyendo solo enunciados y **tiene claves inventadas**. Errores probados el 05-ago-2026 contra los PDF oficiales:

| Tema | La guía decía | Clave oficial real | Dónde |
|---|---|---|---|
| III-5 pertinencia cultural, 4ª dimensión | "atención intercultural" | **participación ciudadana** | 2025-1A Q76 · 2025-1B Q13 |
| I-1 definición de Ottawa | "controlar o mantener" | **atenuar o eliminar** | 2025-1A Q41 · 2025-1B Q10 |
| II-8 glicemia 120 en ayunas | "repetir el examen de glicemia" | **test de tolerancia a la glucosa** | 2025-2 Q89 |
| II-3 lactante 6 meses con esquema al día | "1.ª dosis de influenza" | **2.ª dosis de influenza** | 2025-2 Q97 |
| I-5 violencia familiar, determinante | "intermedio" | **estructural** | 2025-1A Q98 · 2025-1B Q42 |
| V-1 EESS con médico+enfermería+obstetricia+técnicos | "I-3" | **I-2** | 2025-1A Q38 · 2025-1B Q40 |
| V-2 horizonte del PEI | 5 años (CEPLAN 2024) | el examen redactó **"plazo de tres años"** en el enunciado | 2025-2 Q52 |

**Patrón detectado que vale como regla de contenido:** ante un valor en zona gris el examen premia la **prueba confirmatoria definitiva**, no repetir la misma medición — glicemia 100-125 → **TTOG** (no repetir glicemia); PA 140/90 → **MAPA** (no nueva toma de PA, 2025-1A Q88 / 2025-1B Q52).

Extracción de texto de compendios locales para verificar (node, en el scratchpad): `new (require('pdf-parse').PDFParse)({data: fs.readFileSync(ruta)}).getText()`. Sirve con los compendios (tienen capa de texto); **no** con los PDF de normas escaneados (solo imagen → hay que leerlos con Read o buscar la norma en la web).

### 4. ANTI-ALUCINACIÓN — verificación exhaustiva contra fuentes reales ⚠ (el más crítico)
**NINGUNA pregunta/clave/dato se inventa.** Todo (dosis, criterios, plazos, NTS, definiciones) se **verifica contra fuente real** antes de presentar. Análisis exhaustivo por estas vías:
- **Google Drive** (Drive MCP): compendios QX ENAM (`14dSCm…`), OPS MOPECE 5 Villamedic (`1i-4ETi…`), Dr López, Theomed manuales, 105 fichas MINSA, normativas.
- **Plataformas EN VIVO vía Chrome** (Joseph logueado): **QX Medic** (qxmedic-aulavirtual.com) y **Theomed** (campus.academiatheomed.com) — banco oficial, videoclases.
- **Data local ENCAPS** — `D:\agente_estudio\ENCAPS\ENCAPS\`: `EXAMENES` (claves reales), `TIO LOPEZ`, `THEOMED`, `QXMEDIC PPT SALUD PUBLICA`, `RECURSOS A USAR`, diapositivas FT. Y `D:\joseph-md-app\DATA\ENCAPS\` (estrategia/scrapes).
- **Normativas** (GoodNotes ENCAPS›ÁREA›Normativas + Drive): Dir 046/041/065, CDC Vigilancia, RENACE 341-2023, etc.
- **GoodNotes** — Joseph sube material del día ahí; revisarlo.
- Regla dura: **NUNCA aceptar un dato NTS/dosis/criterio sin verlo en la fuente.** Si no se puede verificar, marcarlo como "por confirmar", no afirmarlo.

## 5. CALIBRACIÓN AL EXAMEN REAL ⚠ (regla de Joseph, 20-jul-2026 — rige TODA pregunta)
**"Compórtate como el que ELABORA el examen, no como uno que quiere lucirse."** Nivel = el del examen, NO más difícil por adorno. Verificado contra el conteo real de 26 preguntas de I-3 en los 6 exámenes (`exams_txt/`):

- **4 opciones (A-D)**, clave única. NO 5 opciones. (En el .txt real aparecen A/C/B/D por maquetación a dos columnas; presentar siempre A/B/C/D.)
- **Viñeta CORTA DE CAMPO**, 25-60 palabras, nunca >85. El modal (~60%) es una escena operativa del serumista. ~20% viñeta con datos numéricos (solo para indicadores), ~20% directa corta / completar-espacio.
- **LABORATORIO / SIGNOS VITALES / IMAGEN — regla CORROBORADA contra los 4 exámenes reales (20-jul), NO por suposición:**
  - Frecuencia medida por examen (~101 preguntas): **lab 4-7 · signos vitales 2-11 · imagen 0-3 · gráficos 0-2**. O sea, **SÍ existen** — prohibirlos de plano era un error.
  - **Dónde caen**: los labs *con valor a interpretar* (Hb 11.9 g, glicemia 120 mg/dL, Hb 9 g/dL + FC/FR/T°) están **todos en preguntas CLÍNICAS de área II** (anemia, DM, CRED, HEARTS, TB). Ahí sí van signos vitales completos.
  - **En preguntas de EPIDEMIOLOGÍA (I-3) el lab aparece solo como CONTEXTO CONFIRMATORIO, nunca como valor a interpretar.** Evidencia literal, 2026-1 P79: *"…dos niños fallecieron de un total de 50 pacientes (4%) **confirmados con gota gruesa y PCR**. ¿Cuál es la medida epidemiológica de frecuencia referida?"*
  - **Regla operativa**: en I-3 → menciona el método confirmatorio ("confirmados por gota gruesa", "baciloscopía positiva") pero NO pongas valores de laboratorio ni signos vitales para interpretar. En área II clínica → sí van valores y signos vitales.
  - Sigue PROHIBIDO: relleno demográfico irrelevante y formato USMLE largo. **Es examen de PRIMER NIVEL DE ATENCIÓN.**
- **Contexto peruano OBLIGATORIO**: categoría del EESS (I-1…I-4, II-2) + región real (Loreto, Pasco, Lamas, Huamanguilla, comunidad ashaninka/amazónica) + normativa MINSA implícita.
- **Distractores**: (1) taxonomía hermana del mismo set cerrado; (2) medida plausible pero de otro tiempo; (3) bundle de 3 acciones donde una está mal.
- **Ponderar por FRECUENCIA REAL medida**, no por intuición ni por lo que "suena importante". Ejemplo I-3: tipo de vigilancia 5 · indicadores 4 · notificación 3 · brote/epizootia 2 · etapas 2 · def. caso 1 · cadena epi 1 · sala situacional 1 · medidas control 1 · **canal endémico 0**.
- ⚠ **CANAL ENDÉMICO = FALSO POSITIVO**: 0 apariciones en 4 exámenes únicos (grep negativo), pese a que la memoria lo trataba como caliente. NO gastar preguntas ciegas ahí.
- **Loop**: antes de generar, mirar la HORA en Google Calendar → ubicar el segmento → aplicar su formato. Al terminar, **APENDAR las respuestas de Joseph** al registro.

## 6. JERARQUÍA DE FUENTES ⚠ (regla de Joseph, 24-jul-2026 — obligatoria por pregunta)
**Ninguna clave puede venir de "información al azar de Internet".** Para CADA pregunta, buscar la fundamentación en este orden:

1. **Compendios / links / videos de QX Medic y Theomed** (mapas conceptuales, videoclases, PDFs). Es la primera parada porque es lo que Joseph efectivamente estudia.
2. **Si NO está en los compendios** → ir a la **NORMATIVA ESPECÍFICA**. No todo lo que cae en el examen está en el compendio; mucho sale directo de la norma.
3. **Fuentes técnicas primarias** (MOPECE/OPS, CDC) solo para conceptos universales de método epidemiológico que ninguna norma peruana define.
4. **NUNCA**: búsqueda genérica en Internet, memoria del modelo sin verificar, ni inferencia "suena lógico".

### ⚠ Qué son (y qué NO son) los compendios — regla de Joseph, 24-jul-2026
**Los compendios de QX/López y Theomed son resúmenes de academia, NO fuentes oficiales ni exhaustivas.** De ahí se derivan tres reglas:
1. **Un tema NO tiene que estar en ambos compendios.** Puede estar en uno, en el otro, **o en ninguno de los dos**. Eso es normal y esperable — no es un defecto del material ni del temario.
2. **Que un concepto solo esté en la normativa es una situación VÁLIDA y suficiente.** Hay preguntas del examen real que **no se pueden responder con los compendios**; la norma es la fuente legítima y única en esos casos.
3. **El objetivo es cubrir la mayor ÁREA posible, no tener redundancia entre compendios.** La cobertura se mide por *cuánto del temario queda respaldado por alguna fuente*, no por *cuántas fuentes respaldan cada punto*.

**Consecuencia operativa (corrige un error previo):** NO reportar "esto solo está en Theomed y no en López" como laguna o riesgo. Eso es cobertura normal. **Solo es laguna real cuando NI los compendios NI la normativa respaldan el punto** → ahí sí se marca POR CONFIRMAR y no se afirma.

### Requisitos de la cita normativa
- **Con NÚMERO y año**: *"Directiva Sanitaria 046-MINSA/DGE-V.01, RM 506-2012"*, no *"la norma de vigilancia"*. Cita vaga = cita inválida.
- **VERIFICAR VIGENCIA**: que no esté derogada/sustituida. Precedente real: I-3 citaba *Dir 067 / RM 506-2020* (valor derivado, inexistente) cuando lo correcto era **046 / RM 506-2012**.
- **Decir QUÉ dice**: "la Dir. 046 clasifica la notificación en inmediata / semanal / mensual y lista los eventos de cada grupo".
- Si tras buscar no se puede verificar → marcar **"POR CONFIRMAR"** y NO presentarlo como hecho.

### ✅ Conflicto normativo I-3 — CERRADO (24-jul-2026, contra texto primario)
Los PDFs primarios **sí estaban en disco**: `D:\agente_estudio\ENCAPS\ENCAPS\TIO LOPEZ\SALUD PUBLICA\DIA 5 VIGILANCIA EPIDEMIOLOGICA\`. Leídos íntegros. **No son rivales: son complementarias.**

| Aspecto | Norma que rige | Evidencia |
|---|---|---|
| **PERIODICIDAD y modalidad de notificación** | **Dir. Sanitaria 046-MINSA/DGE-V.01 (RM 506-2012)**, **Anexo 01** (64 eventos: enfermedad·CIE-10·tipo·periodicidad) y **Anexo 02** (agrupado) | La 341-2023 §6.5.1 **remite** a ella: *"…plazos (inmediato, semanal, mensual), según lo establecido en las normativas vigentes"*. La 341 NO trae tabla de periodicidades y cita la RM 506-2012 como vigente en su base legal. |
| **Definición de BROTE** (incl. "1 caso en eliminación = brote") | **Dir. Adm. 341-MINSA/CDC-2023, 5.1.a** | Texto nativo del PDF |
| **NOTIFICACIÓN NEGATIVA** | **Dir. 341-2023, 5.1.h** ⚠ **NO está en la 046** (0 menciones en el texto íntegro) | Verificado por lectura completa |
| **Niveles / arquitectura RENACE** | **Dir. 341-2023** (4 niveles) | — |
| **Brotes / EVISAP** | **Dir. Sanitaria 047-MINSA/DGE-V.01 (RM 545-2012)** | ⚠ **El "Dir. 041" del repo era un ERROR DE OCR**; la base legal de la 341-2023 la nombra 047/RM 545-2012 |
| **Vigilancia sindrómica** | **Dir. 065-MINSA/OGE-V.01 (RM 581-2005)** | ⚠ NO son "los 12 pasos de investigación de brote" |
| **Muerte materna** | **Dir. Sanitaria 036-MINSA/DGE-V.01 (RM 634-2010)** | — |

**Siglas que NO son lo mismo:** **EVISAP** = Evento de Importancia para la Salud Pública (Dir. 047 5.1.6 / 341-2023 5.1.f) · **ESAVI** = Evento Severo Supuestamente Atribuido a la Vacunación e Inmunización (Dir. 046, Anexo 01 N.39, T88.1, inmediata). ⚠ **"VEA" no existe en la norma**: los instrumentos son el registro semanal individual (Anexo 03) y el consolidado (Anexo 04); el software es **NOTISP**.

**Modalidad (dato de alta trampa):** casi todo es notificación **INDIVIDUAL**. Solo son **CONSOLIDADAS**: EDAS, IRAS/neumonías/SOB-asma e **IIH** (Anexo 01 N.47 → consolidada + **mensual**).

## 7. MODO TUTORA — el sistema aprende de Joseph (regla de Joseph, 05-ago-2026)

No soy un generador de sets: soy su tutora. Cada ronda **alimenta** a la siguiente.

- **Guardar SIEMPRE.** Al cerrar cualquier ronda, apendar a `TRACKING_ERRORES/_registro_resoluciones.json`: por ítem → código, sub-ángulo, su letra, la correcta, ok, **confianza declarada**, acierto-por-suerte, tipo de error (CCSN/CONCEPTO/CRONOLOGÍA/CONTEXTO/OLVIDO), **causa en una línea** (qué razonamiento lo llevó ahí) y ruta (ANKI/OBSIDIAN/AMBOS).
- **Diagnosticar, no solo puntuar.** Actualizar `PERFIL_CONOCIMIENTO.md` con el patrón acumulado: qué sub-ángulos repite mal, qué inversiones tiene fijadas, dónde acierta por suerte (≠ dominio), qué códigos siguen sin una sola medición ciega.
- **Sobre-pesar el hueco.** La ronda siguiente carga hacia lo que falló y hacia los códigos sin data, **sin romper** las proporciones reales del examen (vector canónico).
- **Medir por % en ciego, no por % bruto.** Un acierto marcado "adivinada" no cuenta como conocimiento.
- **Decírselo.** Al cerrar, informe corto: qué mejoró, qué sigue roto, qué toca atacar con el tiempo que queda. Sin adular (ver `RUTINA_EXTREMA_MILITARIZADA.md`).

## 8. ENTREGA (regla de Joseph, 05-ago-2026)

- **En CHAT.** No generar ni enviar Word/PDF/archivos **salvo pedido explícito** ("dame un Word"). Los ficheros de DATA son respaldo interno, no entregable.
- **El pronóstico NO se re-deriva.** Ya está en la data: vector canónico **II 33 · I 28 · V 22 · III 13 · IV 4**, los 7 críticos, los puntos por tema de §7 del walk-forward, las vueltas por prioridad (CRÍTICA 6 · ALTA 5 · MEDIA 4 · BAJA 3) y los referenciales. Se aplica, no se vuelve a calcular ni se le vuelve a preguntar.
- **El gate de §3-bis se pasa ANTES de mostrar la pregunta**, nunca después.

## Flujo operativo por cada pedido de "genera preguntas"
1. **Hora/día → segmento** (Factor 1). Determinar formato (pregunta→solución vs modo-examen) y mix.
2. **Fase**: ¿PRE-TEST (ciego) o POST-TEST/consolidación? El pre-test = sin clave hasta que responda.
3. **Tema(s)**: del plan/registro del día (I-3 hoy; D-1/D-3/D-7 en repaso; interleaving según semana).
4. **Peso**: Factor 3 (áreas/críticos) + Factor 2 (sobre-peso mis débiles).
5. **CONTENIDO**: Factor 4 — construir/verificar cada ítem contra Drive/QX/Theomed/normativas/data local. Nivel ≥ examen real, con trampa (distractor = concepto vecino).
6. **Formato**: solucionario según [[encaps-formato-solucionario]] (detallado, por qué causal, siglas expandidas, anti-repetición). Modo examen → solución al final.
7. **GUARDAR**: apendar la ronda a `_registro_resoluciones.json` + actualizar `PERFIL_CONOCIMIENTO.md`.

## Recordatorio de persistencia
Todo este sistema (protocolo + segmentos + registro + formato + método) está en DATA/ENCAPS y en memoria para **conservar la idea tras compactar** los mensajes. Si algo se pierde, este doc + [[encaps-motor-preguntas]] lo reconstruyen.
