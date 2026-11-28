# SYNAPSE + VIBECODING · método BASE CERO (v6.10 · mié 18-nov-2026)

> Síntesis propia del método con el que se cursan la formación en IA (SYNAPSE: A pantalla · B audio · C lectura, 12:30 L-V y sábados 21:00) y la
> programación con agentes (VIBECODING: 04:15 L-V + SHIP / Feynman del domingo). Cada afirmación lleva su fuente; lo que sale del cuaderno NotebookLM
> lleva la marca **NLM**. No reproduce material de ningún curso: solo títulos, conteos, ids y síntesis propia.
> Fuente de datos: `src/lib/synapseDailyPlan.ts` (`SYN_FASES_BC`, generado por `DATA/_scripts/gen_synapse_plan.js`) y `src/lib/vibecodingPlan.ts`
> (`VIBE_FASES_BC`, generado por `DATA/_scripts/gen_vibecoding_plan.js` desde `DATA/SYNAPSE/vibecoding_proyectos.json › _meta.fases_base_cero`).

## 0. La orden y lo que cambia

Orden de Joseph del 18-nov-2026, en lo esencial: todos los cursos parten de **cero**; planes bien estructurados y verificados; las preguntas tienen que ser
**reales**; NotebookLM para las metodologías; empieza el jueves 19.

| Cambia | No cambia |
|---|---|
| Qué lección cae en cada bloque A de F1 (orden real, §1.3), los textos de las guías (fase, gate, cierre por recall, base cero), el andamiaje de S2 y S3, la skill de S7 (solo preguntas reales) y el repaso CCA-F del sáb 27-mar-2027 | Horas, fechas, bloques y minutos de cada día; la regla tiempo ↔ material [0,85; 1,15] (la recalcula el generador); el texto de la auditoría F0 de 3′ (decidido con Joseph); la regla «Anki · Obsidian · GoodNotes: hoy nada fijo…»; los textos de S1 del vibecoding (corrección de hecho del 17-nov); los SHIP de los domingos |

## 1. Principios del método

1. **Base cero: lo cursado antes no exime.** F0 se cursó en jun-ago de 2026 con el progreso solo en el navegador; hasta la v6.10 cada lección decía «si
   ya la cursaste, márcala ✓ y adelanta la siguiente pendiente». Desde hoy cada lección se cursa entera y el ✓ es de hoy (`rutinaGuia.pasoSyn`,
   `synapse_f1_tramos.js`). La auditoría F0 de 3′ del primer día se queda tal cual: sirve para saber qué insignias existen, no para saltar lecciones.
2. **Fluidez antes que herramientas.** La primera fase es el marco 4D de *AI Fluency: Framework & Foundations* (Rick Dakan y Joseph Feller con
   Anthropic): Delegation · Description · Discernment · Diligence. Para un principiante, Discernment es evaluar con criterio lo que devuelve el modelo
   dentro del bucle descripción ↔ discernimiento, y Diligence es asumir la responsabilidad de lo creado (creación, transparencia y despliegue)
   (**NLM**; curso: https://academy.claude.com/courses/ai-fluency-framework-foundations).
3. **Recuperar, no releer.** El cierre de cada bloque A de F1 pasa de «anota 1 idea» a **recall en blanco**: sin mirar, escribe en el journal lo que
   recuerdas. La práctica de recuperación es la técnica de estudio con más evidencia (Roediger y Karpicke, *Psychological Science* 2006;17:249-255;
   Dunlosky et al., *Psychological Science in the Public Interest* 2013;14:4-58). Cabe en el mismo minuto que antes ocupaba «anota 1 idea».
4. **Preguntas solo reales.** La única evaluación con preguntas es el **«Course quiz» oficial** de cada curso de la Academy (verificado el 18-nov en
   las páginas de los cursos: AI Fluency, Claude 101 y Claude Code 101 tienen «Course quiz»; Platform 101, «Claude Platform 101 quiz»; los cuatro dan
   una *completion badge*, no un certificado). Donde no hay quiz oficial (el ensayo *Building effective agents*, Karpathy, 3Blue1Brown) no se inventa
   ninguna: recall en blanco contra el propio material y explicación en voz alta (Feynman). El vibecoding no se evalúa con preguntas: su gate es la
   evidencia real de `verify_vibecoding.js` (test, commit, fichero, dato).
5. **PRIMM para programar con agentes.** *Predict → Run → Investigate → Modify → Make* (Sentance, Waite y Kallia, *Computer Science Education*
   2019;29:136-176; resumen de la Raspberry Pi Foundation:
   https://static.raspberrypi.org/files/curriculum/quickreads/11-Pedagogy_Summary_PRIMM_V4_2023.pdf). Empezar por código que ya existe y saber
   explicar qué hace da al novato la confianza para escribir el suyo después. Aplicado a Claude Code (**NLM**): predecir antes de ejecutar (leer el
   plan o el bloque y escribir qué saldrá), correr y contrastar con la predicción, investigar preguntándole a Claude por la línea que no entiendes sin
   cambiar nada, modificar con cambios pequeños sobre código que ya entiendes y, al final, crear desde una SPEC.
6. **Flujos de trabajo antes que agentes.** Primero el LLM aumentado y los *workflows* predecibles (encadenar prompts, enrutar, evaluador-optimizador);
   los agentes autónomos, solo cuando el número de pasos no se puede prever, y con verificación automática (Anthropic, *Building effective agents*,
   https://www.anthropic.com/engineering/building-effective-agents; **NLM**).
7. **Verificar siempre.** Darle a Claude una forma de comprobar su trabajo (un test o un comando) y trabajar en el orden explorar → planificar →
   codificar → commit (*Best practices for Claude Code*, https://code.claude.com/docs/en/best-practices; Claude Code 101).
8. **Vibe coding solo donde no importa.** Vibe coding = no leer el código que escribe la IA; vale para prototipos de usar y tirar. Si el código se
   revisa, se prueba y se sabe explicar, ya es desarrollo asistido. Regla para un novato: **no se hace commit de código que no sabes explicar**
   (Simon Willison, 19-mar-2025, https://simonwillison.net/2025/Mar/19/vibe-coding/). Karpathy pide llevar a la IA «con correa», en pasos pequeños
   (*Software Is Changing (Again)*, YC AI Startup School, 2025; **NLM**). Con datos sensibles (tesis, pacientes) o claves, nunca vibe coding.

### 1.3 El orden real con el alias de la v6.10c/d

Con el alias de `_fechas_v6.json › corrida_s1` (jue 19-nov → vie 1-ene) cada día hábil hace el plan del hábil anterior: el **viernes de plan se hace el
lunes** y el sábado / domingo de plan no se mueven. Con las A-units repartidas por fecha de plan, cada semana la lección del sábado (unidad k+1) se veía
antes que la del viernes (unidad k): seis inversiones en F1 (Claude 101 módulo 2 antes que el 1; «Customizing + quiz» de Claude Code 101 antes que
«Daily workflows»; Karpathy tramo 4/11 antes que el 3/11; etc.). Desde la v6.10 base cero `gen_synapse_plan.js` reparte **las mismas A-units de F1 por
fecha real**: mismas fechas, bloques y minutos, solo cambia qué lección cae en cada bloque (12 días de F1). B y C no se tocan.

## 2. SYNAPSE: 6 fases

Fechas = el día en que Joseph lo hace (real, con el alias). El generador las calcula; la guía de cada sesión de F1 dice la fase al final del aviso y,
el día del gate, qué se aprueba. La app lo muestra en un chip («fase n/6 · …»).

| Fase | Qué (contenido) | Días reales | Gate (preguntas reales) | Criterio de avance |
|---|---|---|---|---|
| 1 · Fluidez con la IA | Auditoría F0 de 3′ + AI Fluency entero (14 lecciones): qué es la IA generativa, qué puede y qué no, las 4D | jue 19 → vie 27-nov | «Course quiz» oficial de AI Fluency (vie 27-nov) → insignia | Quiz aprobado. Si no sale: se repite en el PC del domingo siguiente solo con lo fallado; la fase 2 empieza en su fecha |
| 2 · Usar Claude y Claude Code (sin programar) | Claude 101 (13 lecciones) y Claude Code 101 (12: instalar, primer prompt, explorar → planificar → codificar → commit, CLAUDE.md, subagentes, skills, MCP, hooks) | sáb 28-nov → lun 7-dic | «Course quiz» de Claude 101 (mié 2-dic) y de Claude Code 101 (lun 7-dic) | Las 2 insignias (misma regla si no sale) |
| 3 · La API y los agentes (concepto) | Claude Platform 101 (13: primera llamada a la API, modelos, bucle del agente, tool use, skills, MCP, managed agents) + *Building effective agents* | mar 8 → sáb 12-dic | «Claude Platform 101 quiz» (jue 10-dic) + los 5 workflows de memoria en el journal (sáb 12-dic; el ensayo no trae quiz) | Quiz aprobado y los 5 workflows con su cuándo-usar escritos sin mirar |
| 4 · Cómo funciona un LLM por dentro | Karpathy *Intro to LLMs* (3 partes) + *Deep Dive into LLMs* (11 tramos) + 3Blue1Brown (redes, gradiente, retropropagación, transformers, atención, hechos) | lun 14-dic → lun 11-ene-2027 | Sin quiz oficial: recall en blanco del pipeline del LLM contra el «grand summary» de Karpathy (mié 30-dic) y, al cierre de F0, explicarlo en voz alta (lun 11-ene) | Pipeline completo (datos → tokens → preentrenamiento → SFT → RL/RLHF → alucinaciones y herramientas) sin huecos frente al vídeo |
| 5 · Stack del vibecoding (2027) | Docs de Claude Code (memoria, skills, hooks, subagentes, MCP, headless), Supabase (RLS, select, triggers, webhooks, Edge Functions) y n8n | mar 12-ene → sáb 6-feb | «Course quiz» final de *Claude Code in Action* (sáb 6-feb) + SHIP S9-S11 4/4 | Quiz aprobado |
| 6 · Academy restante + CCA-F (2027) | *Building with the Claude API*, MCP (intro y avanzado), agent skills, subagentes, *AI Capabilities and Limitations*, Cowork, 3 ensayos de contexto | lun 8-feb → jue 1-abr | Simulacro con los quizzes oficiales (Final assessment de *Building with the Claude API* + quiz de *Claude Code in Action*), mié 31-mar | % por dominio en el journal; decisión de fecha CCA-F post-Step 1 |

**El GATE es una condición, no una fecha (v7.00, ítem 46, decidido por el chat de plan el 24-nov).** Manda sobre la columna «Criterio de avance» y sobre
las fechas de gate de la tabla, que eran de la v6.10. El quiz oficial de cada curso, o su recall en blanco si no hay quiz, se hace al terminar la última
lección del curso. La A sigue donde paró la última A, en el orden del plan, y lo siguiente corre: el curso siguiente empieza cuando el anterior se cierra
con su quiz. Si el quiz no sale, la A siguiente repasa solo lo fallado y lo repite; ya no va al PC del domingo. Sin PC, ese día no hay A y la próxima A
sigue donde paraste. La fecha de gate del plan (`SYN_FASES_BC.gateFechas`) es solo el día en que el plan lo espera. Código: `rutinaGuia.ts` (`pasoSyn` y
`synFaseAvisoDe`) y `SYN_AVANCE_BC`.

**Carriles B y C.** B (audio: No Priors, Dwarkesh, Lex #452, The Batch, canal de Anthropic) es exposición: vocabulario y criterio, no se evalúa. C
(lectura) es la base técnica desde el capítulo 1 (The Python Tutorial, *Automate the Boring Stuff* 3.ª ed., Pro Git) más seguridad de agentes
(Willison) e investigación de Anthropic; en F1 no lleva preguntas (5′ medidos por sesión). *Automate the Boring Stuff* trae al final de cada capítulo
una sección «Practice Questions» real (10 en el capítulo 1, verificado el 18-nov): queda como banco real disponible cuando un capítulo se termine.

## 3. VIBECODING: 3 fases PRIMM

| Fase | Proyectos | Días reales | Qué se hace | Gate |
|---|---|---|---|---|
| 1 · Guiado: predice → corre → investiga | S1 APEX end-to-end · S2 telemetría Anki · S3 espejo `plan_checks` | jue 19-nov → SHIP S3 dom 13-dic | Lo que piden ya está escrito (S1: los 2 nodos del redeploy; S2: `anki_telemetria.js` v2 y el KPI de la 1.ª review en `CockpitStatusBar`; S3: `plan_checks` aplicada el 12-sep-2026, `studyProgressSync.ts` y el panel «Exportar / Importar progreso»). Cada paso de 35′ = PREDICE (lo escribes antes) · CORRE (comando exacto) · INVESTIGA (Claude Code te explica la línea; hoy no se cambia código) | SHIP S3 con `verify_vibecoding.js 3` → 4/4 y las predicciones escritas en el journal |
| 2 · Modificar | S4 revisión semanal · S5 puente VITALS · S6 RLS de la tesis | jue 10-dic → SHIP S6 dom 3-ene | Cambios acotados en ficheros que ya existen, en modo plan; cada diff explicado en 2 líneas antes del commit | SHIP S6 4/4 y «% del código que entiendo» ≥ 70 % en el journal |
| 3 · Crear | S7-S12 (2027) | vie 1-ene → SHIP S12 dom 14-feb | Proyectos nuevos: Claude te entrevista → SPEC.md → construir con un test que Claude pueda correr | SHIP S12 4/4 y la demo de 5′ explicada sin mirar el código |

S1 conserva sus textos (corregidos con el chat de vibecoding el 17-nov); S2 y S3 reciben sub-pasos guiados de 10/10/15′ o 10/15/10′ (mismos 35′; el
último sub-paso del paso 4 se salta si el plan B del domingo manda allí el verify). Las fases 2 y 3 siguen con la guía genérica (explorar → planificar →
codificar → commit), que ya es la de *Best practices*.

## 4. Preguntas reales: inventario y sustituciones

| Frente | Banco real | Qué se sustituyó |
|---|---|---|
| SYNAPSE F1 | «Course quiz» oficial de AI Fluency, Claude 101, Claude Code 101 y «Claude Platform 101 quiz» | Nada inventado había en F1; se nombran los quizzes como gate (antes «evaluación final → CERTIFICADO»: la Academy da insignia) |
| SYNAPSE 2027 | Quizzes de módulo y finales de *Building with the Claude API*, *Introduction to MCP*, *Claude Code in Action*, *AI Capabilities and Limitations* | sáb 27-mar-2027 «10 preguntas propias por dominio» → recall en blanco por dominio + las preguntas reales del simulacro de esa semana |
| CCA-F | No hay banco oficial público verificado (las preguntas que circulan son de terceros, no de Anthropic) | No se usan |
| VIBECODING S7 (jue 31-dic → mié 6-ene) | Exámenes ENCAPS reales con clave oficial (`DATA/ENCAPS/BANCO_PROPIO/_examenes_reales_2024-2A_2026-1.json` + `_etiquetas_examenes_reales_v3.json`; nunca el examen reservado como pre-test) | La skill ya no «genera nuevas si no hay stock»: sin stock real del subtema lo dice y sirve del más cercano; ningún ítem espejo ni generado |

## 5. Síntesis NLM

Cuaderno NotebookLM **«IA · desde cero (SYNAPSE + vibecoding · método)»**, creado el 18-nov-2026 con 10 fuentes: Karpathy *[1hr Talk] Intro to Large
Language Models* y *Deep Dive into LLMs like ChatGPT*; canal de Anthropic *AI prompt engineering: A deep dive*; Karpathy *Software Is Changing (Again)*;
las páginas de *AI Fluency* y *Claude Code 101* de la Academy; *Best practices for Claude Code*; *Building effective agents*; Willison *Not all
AI-assisted programming is vibe coding*; el resumen PRIMM de la Raspberry Pi Foundation. La respuesta quedó guardada como nota en el cuaderno.

- **NLM · fases para pasar de cero a construir con agentes:** (1) LLM aumentado y prompts directos, tareas de una iteración; pasar cuando sabes
  especificar ficheros, síntomas y «hecho» y evaluar lo que sale; (2) *workflows* predecibles y el ritmo explorar → planificar → codificar → commit
  con un CLAUDE.md corto; pasar cuando un flujo fijo no alcanza y una evaluación lo demuestra; (3) agentes con herramientas, subagentes con permisos
  limitados y MCP, solo con entorno aislado, reglas de parada y tests de pasa / no pasa.
- **NLM · PRIMM con Claude Code:** predecir en modo plan antes de ejecutar; correr y contrastar con la predicción; investigar preguntando por la línea
  que no entiendes sin modificar; modificar en cambios pequeños sobre lo ya entendido (el código pasa de «no es mío» a «parcialmente mío»); crear desde
  una SPEC que Claude te ayuda a escribir entrevistándote.
- **NLM · vibe coding y verificación:** vibe coding = aceptar todo sin leer los diffs; válido solo en prototipos de bajo riesgo. Desarrollo asistido =
  código que funciona de forma demostrable y que sabes explicar. Regla del novato: no hacer commit de lo que no puedes explicar; con datos sensibles o
  claves, nunca sin revisión.
- **NLM · 4D para quien empieza:** Discernment = evaluar con criterio salida, proceso y comportamiento del modelo (inteligencia «dentada»: siempre
  verificar contra datos o pruebas); Diligence = responsabilidad final del humano en creación, transparencia y despliegue.

## 6. Correcciones de hecho (18-nov-2026)

- Los 4 cursos de F0 dan *completion badge* (insignia), no certificado, y cada uno cierra con su quiz oficial (páginas de academy.claude.com).
- **2027 (fix del 18-nov, verificado con WebFetch en academy.claude.com):** Claude Code in Action («Course quiz»), Introduction to MCP («Final assessment
  on MCP»), Building with the Claude API («Final Assessment»), MCP Advanced Topics («Assessment on MCP concepts»), AI Capabilities and Limitations
  («Course Quiz») y Introduction to Claude Cowork («Quiz on Claude Cowork») dan *completion badge*; Introduction to Agent Skills e Introduction to
  Subagents dicen «No completion badge» y no traen quiz (se cierran con recall en blanco). Los textos de 2027 (6-feb, 11-feb, 1-mar, 6-mar, 9-mar,
  17-mar, 23-mar y 24-mar) decían «CERTIFICADO»: ahora «INSIGNIA» con el nombre de su quiz.
- S3 (vibecoding): el texto de la fila del plan del d11 (plan mié 2-dic → real jue 3-dic) ya no dice «aplicar la migración CON Joseph» (está aplicada
  desde el 12-sep: comprobarla en solo lectura) y el del d14 (plan lun 7-dic → real mar 8-dic) ya no pide «botón Exportar/Importar si aún no está
  expuesto» (existe: probarlo en 2 navegadores). S7 k2 (sáb 2-ene 04:15): «1 pregunta REAL del banco (su id)» en vez de «1 viñeta».
- El SHIP del domingo siguiente a un GATE con quiz oficial (dom 29-nov, 6-dic y 13-dic) empieza su paso de cerrar lo rojo por la repetición del quiz
  suspendido (solo lo fallado, a cuenta de sus minutos flexibles): el aviso del gate lo mandaba allí y la guía del SHIP no lo nombraba.
- `plan_checks` ya está aplicada (12-sep-2026, cabecera de `DATA/_scripts/_migrations/plan_checks.sql`): el paso 1 de S3 ya no «aplica la migración»,
  la comprueba en solo lectura.
- El panel «Exportar / Importar progreso» ya existe en `CockpitStatusBar.tsx` y `anki_telemetria.js` ya es la v2 (sync + 1.ª review): S2 y S3 son
  proyectos de verificación guiada, la fase 1 de PRIMM.

## 7. Pendientes (decisiones de Joseph)

1. Carriles B y C del alias: el comodín de audio / lectura del sábado retoma piezas del viernes de plan, que con el alias se hacen el lunes siguiente
   (orden de exposición, no de dificultad). Se deja como está.
2. Usar las «Practice Questions» de *Automate the Boring Stuff* cuando el carril C termine un capítulo (hoy no cabe en los 5′ medidos de F1).
3. Fecha y formato reales del examen CCA-F (sin página oficial verificada).
4. Guardar los PDF / insignias de Skilljar antes de su cierre a principios de diciembre (ya avisado en la 1.ª sesión).
