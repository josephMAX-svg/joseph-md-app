# AURUM · método BASE CERO (closer de ventas que empieza de cero)

> v6.10e · mié 18-nov-2026 · orden de Joseph: «todos partimos de CERO; las preguntas tienen que ser REALES; planes bien estructurados; empezamos el 19».
> Síntesis propia con fuentes. No copia material de academias: solo títulos, ids, minutos y síntesis.
> Código: `src/lib/rutinaGuia.ts › AURUM_BASE_CERO` (etapa + criterio de paso en la guía) · plan sin cambios (`DATA/_scripts/gen_aurum_plan.js`, ahora con `--check`).

## 1. Qué cambia y qué no

| | Antes (v6.10d) | Después (v6.10e) |
|---|---|---|
| Lecciones, fechas, minutos | 130 lecciones, D1 mié 18-nov (plan) → mar 25-may-2027 | **igual** (el alias de corrida_s1 las hace un hábil después: el jue 19 hace el D1) |
| Progresión | 7 fases del currículo, sin decir en qué etapa de aprendiz está Joseph ni cuándo «pasa» | cada sesión de F1 dice su **etapa** (A1 juego interno · A2 escucha) y el **criterio observable** para pasar de fase |
| PITCH de cierre de fase | «puntúalo con la rúbrica (/12); vale el score» → el v1 sale rojo siempre (los ítems de oferta, objeciones y cierre aún no se han enseñado) | el paso de fase lo deciden **los ítems de la etapa**; el total /12 solo manda desde el PITCH v6. La guía lo dice en el drill del PITCH y la tarjeta de la rúbrica (`aurumVisuals.AurumRubricaPitch`) pinta el semáforo del paso de fase (`aurumData.AURUM_PASO_FASE` / `aurumPasoFase`: v1 = «línea base», verde = «pasa de fase») |
| Role-plays | «lead-simulacro» sin decir de dónde sale lo que dice el lead | regla F1: el «lead» dice una frase **real** (chat guardado o literal del vídeo del día); nunca un cliente inventado |
| Preguntas de evaluación | AURUM no tiene quizzes ni pre-tests (solo drills, role-plays y rúbrica) | nada que sustituir; ventas no tiene banco real de preguntas → la evaluación es la **rúbrica sobre una grabación** |

## 2. El orden de un closer que empieza (NLM + fuentes)

Cuaderno NotebookLM **«AURUM · ventas desde cero (escucha → objeciones → cierre)»** (creado el 18-nov-2026 en la cuenta de Joseph; 7 fuentes cargadas, 1 rechazada por falta de transcripción). Pregunta hecha: *«parto de cero: ¿en qué orden aprender y practicar escucha/preguntas → objeciones → cierre; qué practicar, cómo hacer el role-play con material real y qué criterio observable indica que paso de fase?»*. Respuesta (NLM, resumida con mis palabras):

1. **Escucha y diagnóstico con preguntas primero.** La fase de investigación (preguntas SPIN) precede a demostrar capacidad y a obtener el compromiso, y reduce las objeciones posteriores [Huthwaite · SPIN Methodology]. En el marco CLOSER, aclarar por qué vino, etiquetar su problema y repasar su dolor van antes de vender la solución [Hormozi · «I Taught 116+ Salesmen My Closing Framework»]. **NLM**
   - Qué se practica: preguntas de Situación → Problema → Implicación → Necesidad/beneficio [Huthwaite]; solo 3 cosas salen de tu boca: preguntas, reformulaciones e historias cortas [Hormozi]; labels («parece que…», sin «pero» detrás) y mirroring [Voss en Huberman Lab; Troy Smith, Black Swan]; pausa de 2 s antes de responder y parafrasear para confirmar [Gong Labs]. **NLM**
   - Práctica con material real: ensayar labels y preguntas en conversaciones cotidianas de bajo riesgo antes de las llamadas que importan [Voss]; escuchar grabaciones propias y anotar qué falló [Hormozi]. **NLM**
   - Criterio de paso: el comprador habla la mayor parte del tiempo y nombra él su problema antes de que menciones la solución [Hormozi; Gong]. Cifra de referencia: 43:57 (habla:escucha) en llamadas ganadoras del estudio original de Gong; ⚠ la actualización 2025 de Gong Labs ya no lo sostiene como objetivo (media ~60/40 y los buenos vendedores mantienen el mismo ratio ganen o pierdan) → en AURUM el corte es el ítem «Hablaste < 40 %» de la rúbrica, no una cifra de Gong. **NLM + verificación propia (búsqueda web 18-nov)**
2. **Objeciones después.** Auditoría de acusación (nombrar antes sus miedos), voz de «DJ nocturno», label + pregunta calibrada; los 3 obstáculos de Hormozi (dinero, pareja/socio, «lo tengo que pensar» → «¿cuál es tu principal preocupación?»). Práctica: drills diarios cortos de las objeciones reales de tus productos. Criterio: el prospecto pasa de defenderse a pensar en cómo lo implementaría. **NLM** [Voss; Hormozi; Troy Smith]
3. **Cierre al final.** Obtener un compromiso concreto (señal, fecha, firma) [Huthwaite]; presentar el resultado en < 3 min («vende el destino, no el vuelo») y reforzar la decisión en las 48 h siguientes [Hormozi]; pedir y callar. Criterio: la conversación termina con un compromiso ejecutable y sin sobreexplicar. **NLM**

## 3. Etapas de AURUM (las 7 fases del currículo no se mueven)

| Etapa base cero | Fase AURUM (D) | Qué se entrena | Criterio observable para pasar (rúbrica `AURUM_RUBRICA_PITCH`) |
|---|---|---|---|
| **A1 · juego interno** | F1 (D1-D15) | tolerar el «no», contar contactos, transferir certeza (Tracy, Pink, Bettger) | Manifiesto escrito + PITCH v1 grabado con 3 mejoras frente a la 1.ª toma + ≥ 5 días reales en el tablero de actividad (los 6 ítems salen 0 por diseño) |
| **A2 · escucha** | F2 (D16-D35) | tono, mirror, label, resumen hasta el «así es» (Voss), rapport y seguimiento (Girard) | PITCH v2: «Empatía táctica» = 2 y «Hablaste < 40 %» ≥ 1 |
| **A3 · preguntas** | F3 (D36-D55) | SPIN + preguntas calibradas + calificación (MEDDIC) | PITCH v3: «Hablaste < 40 %» = 2 y «SPIN en orden» = 2 |
| **B1 · oferta** | F4 (D56-D75) | ecuación de valor, stack, garantía, ancla (Hormozi, Cialdini) | PITCH v4: «Oferta» = 2 sin bajar de 1 en los ítems de la etapa A |
| **B2 · objeciones** | F5 (D76-D95) | label + prueba + pregunta calibrada, nunca discutir | PITCH v5: «Objeciones sin discutir» = 2 |
| **C1 · cierre** | F6 (D96-D115) | compromiso concreto con fecha (CLOSER, Huthwaite) | PITCH v6: «Cierre / compromiso» = 2 y total ≥ 10/12 |
| **C2 · integración** | F7 (D116-D130) | cierre por DM + presentación maestra | PITCH v7 ≥ 10/12 |

La secuencia del currículo (mentalidad → tono/escucha → preguntas → oferta → objeciones → cierre) ya coincide con la de las fuentes: **no se reordena nada**. Lo único que contradecía la progresión era juzgar los PITCH v1-v5 por el total /12 (semáforo verde ≥ 10) → corregido en la guía.

## 4. F1 (jue 19-nov → sáb 2-ene, fechas reales con el alias)

- D1-D15 = etapa A1 (plan mié 18-nov → mar 8-dic; real jue 19-nov → mié 9-dic). PITCH v1 = D15.
- D16-D32 = etapa A2 (plan mié 9-dic → sáb 2-ene; real jue 10-dic → sáb 2-ene). Su PITCH v2 es el D35 (mié 6-ene-2027).
- Cada sesión de F1 lleva al final del aviso: «BASE CERO · fase AURUM n/7 (etapa, D…-D…): qué se entrena. Pasas a la fase AURUM n+1 con … Si no llegas,
  las fechas no se mueven: lo que falte es la corrección única de tus próximos DRILL y se vuelve a puntuar en el PITCH siguiente; anota el gap en la nota ◆».
  No cambia ni una hora ni un minuto.
- **Fix del 18-nov (revisión de los frentes):** (1) el aviso decía «(F2, D16-D35) … Pasas a la F3», y F1/F2/F3 son las fases del RÉGIMEN (F2 = intensiva
  ENCAPS desde el 4-ene): ahora «fase AURUM n/7»; (2) el D15 (PITCH v1; plan mar 8-dic → real mié 9-dic) daba dos criterios distintos: el del aviso y el
  del drill («certeza sin presión y tono que baja al final»; el tono que baja es la voz de DJ de la fase AURUM 2) → el drill pide ahora el mismo que el
  aviso; (3) cada aviso de F1 dice qué pasa si no se llega al criterio.
- Plan B de F1: «Sin un lead real hoy: el "lead" del role-play dice una frase REAL —de tus chats guardados o literal del vídeo de hoy—; nunca un cliente inventado».

## 5. Evaluación sin preguntas inventadas

Ventas no tiene un banco público de preguntas «oficiales» como el MIR o el USMLE. La evaluación de AURUM es, y sigue siendo:
1. **grabación** del drill o del PITCH (audio o vídeo),
2. **rúbrica** de 6 ítems × 0-2 (`src/lib/aurumData.ts › AURUM_RUBRICA_PITCH`), puntuada sobre esa grabación,
3. **tarjetas de mecanismo** (≤ 3 por día) escritas por Joseph del vídeo del día (material real), no por Claude.

## 6. Fuentes

- Huthwaite International · «The SPIN Methodology» (huthwaiteinternational.com/spin-methodology) y «Neil Rackham – How should sellers apply SPIN® Selling questions» (YouTube 9IXcrP46BDk).
- Huberman Lab · «How to Succeed at Hard Conversations | Chris Voss» (YouTube q8CHXefn7B4; ya medido por capítulos en rutinaGuia › AURUM_F1_A).
- The Black Swan Group · «Using Labels To Find Out The Why Behind Their Behavior | Troy Smith» (YouTube qdIA-QxCX_4).
- Alex Hormozi · «I Taught 116+ Salesmen My Closing Framework» (YouTube q32-l3Yoqg4).
- Gong Labs · «Mastering the talk-to-listen ratio in sales calls» (gong.io/resources/labs/talk-to-listen-conversion-ratio) — con la salvedad de la actualización 2025 (sección 2).
- HubSpot · «A 10-Minute Summary of The Psychology of Selling» (Brian Tracy).
- Rechazada por NotebookLM (sin transcripción): Black Swan · mirrors (YouTube wIBc2T2RKSA).

## 7. Pendiente (decisión de Joseph)

- ¿Hay leads reales activos hoy (ALLPA / Qori)? Los drills de F1 los asumen; si no, el plan B de F1 usa chats guardados o frases literales de los vídeos.
- Umbral de paso de A1 (≥ 5 días de línea base en el tablero) y de A2 (Empatía 2 + Hablaste ≥ 1): propuesta; confirmar o subir.
