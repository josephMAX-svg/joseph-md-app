# 🔁 SISTEMA LOOP DIARIO ENCAPS — mapa de segmentos (Google Calendar) + reglas de generación

> ⚠️ **SUPERSEDIDO el 27-ago-2026 por la REESTRUCTURACIÓN 31-AGO** (`DATA/REESTRUCTURACION_31AGO_2026.md`):
> los segmentos de la mañana (repaso multi-temporal · pre-test · deep prime · 30Q · eval 18:00) ahora son
> del **USMLE Step 1** (mismo esqueleto, en inglés, con uWorld). Para ENCAPS solo queda **16:15-17:15**:
> eval anclada 5Q + banco 20-25Q del tema del día (rotación v3) · viernes mini-simulacro 25Q.
> El protocolo de generación de preguntas y el registro en `_registro_resoluciones.json` SIGUEN VIGENTES
> (aplicados al segmento que corresponda). Lo de abajo queda como referencia del diseño original.

> Verificado leyendo las descripciones reales de cada evento del Calendar (02-jul-2026). Rige cómo genero preguntas según la HORA/segmento en que esté Joseph. Zona: America/Lima. Repite L-V hasta ~30-ago. Data de resoluciones en `TRACKING_ERRORES/_registro_resoluciones.json`.

## Protocolo cada vez que Joseph pide preguntas
1. **Mirar hora + día** → ubicar en qué SEGMENTO está (o cuál sigue; puede ir corrido, ej. 11:10 → recién Consolidación).
2. **Identificar fase** del segmento (pretest/warm-up/consolidación/evaluación) → define formato y mix.
3. **Guardar la data** de la ronda en `_registro_resoluciones.json` (no re-buscar; se acumula).
4. Generar en el formato del segmento. Nivel SIEMPRE ≥ examen real, con trampa (distractor = concepto vecino).

## Los 8 segmentos (L-V)
| Hora | Segmento | ¿Genero preguntas? | Formato / regla |
|---|---|---|---|
| 04:15–04:45 | **Anclaje Post-Sueño** | ❌ | Mapa Notability en blanco (tema de AYER, free recall) + validación Obsidian + Anki SRS. Yo no genero; si pide, apoyo el free recall. |
| 04:45–05:45 | **Warm-up 20 Preguntas 1×1** | ✅ **20Q** | **Pregunta → solución inmediata** (una por una, se cierra antes de seguir). Mix Sem1-2: 70% temas vistos + **30% CRÍTICOS no vistos**. APEX 0-3 (sweet 1-2). |
| 07:15–08:15 | **Repaso Multi-Temporal D-1/D-3/D-7** | ✅ **preguntas D-1/D-3/D-7** | Retrieval ESPACIADO (Cepeda: los 3 picos de la curva del olvido). Además de los 3 mapas free recall + Anki interleaved, **genero preguntas de los temas de D-1 (ayer), D-3 (hace 3 días) y D-7 (hace 7 días)**. Pregunta → solución inmediata. Mix repartido entre los 3 buckets temporales. ⚠ En **Semana 1** solo existe D-1 (aún no hay temas de hace 3/7 días); D-3 y D-7 se llenan conforme avanza el plan. Temas de cada día = del registro/plan diario. |
| 08:15–09:00 | **PRE-TEST tema del día** | ✅ **10Q CIEGAS** | **10 preguntas a CIEGAS del tema NUEVO del día** (sin clave hasta que responda; método Palmerton) + free recall. Marcar gaps para el deep prime. |
| 09:00–11:00 | **Núcleo Deep Prime** | ❌ | Estudio profundo (compendio Tío López/TheoMed + 1 NTS), crea 8-12 APEX. No genero preguntas; apoyo con fuentes/APEX. |
| 11:00–12:00 | **Consolidación 30 Preguntas** | ✅ **30Q** | Pregunta → solución inmediata. **100% temas YA VISTOS** (60% tema de HOY + 40% previos, interleaving). Cazar gaps post-encoding. APEX 0-4 (sweet 2-3). |
| 17:15–18:00 | **Anclaje Vespertino** | ❌ (Viernes ✅ 15Q) | Mapa tema de HOY + validación + Anki. **Viernes**: repaso integrador semanal + **15 preguntas mixtas en voz alta** de los 5 temas de la semana. |
| 18:00–18:45 | **Evaluación Diaria MODO EXAMEN** | ✅ **~15-20Q** | ⚠ **ÚNICO bloque con solución AL FINAL** (no pregunta-por-pregunta). Modo examen estricto, **72 seg/Q**, sin consultar nada. Banco = tema de AYER + interleaving acumulado. Corrección al terminar. |

### ⚠ Regla de oro del formato
- **Todos los bloques de preguntas** = pregunta → solución **inmediata** (interactiva, el formato que Joseph aprobó), EXCEPTO…
- **18:00 Evaluación Diaria** = **modo examen**: responde las 15-20 SIN ver solución; la **corrección va TODA al final**.

### Escalado de interleaving (según la semana; hoy = Semana 1, D1=02-jul)
- **Warm-up:** Sem1-2 → 70% vistos + 30% críticos no vistos · Sem3-6 → 80% + 20% preview · Sem7+ → 100% interleaving.
- **Consolidación:** 60% tema de hoy + 40% previos.
- **Evaluación:** Sem1 → 100% tema de ayer · Sem2-3 → 60/40 · Sem4+ → 40/60.

## 🧪 SIMULACRO (Sábado/Domingo — cuando Joseph lo pida)
Genero un simulacro tipo examen real (Joseph hará OTRO de las academias para contrastar). Reglas:
- **100 preguntas**, **modo examen** (72 s/Q, solución AL FINAL).
- **Balance por ÁREA** (pronóstico walk-forward v2): **II ≈34 · I ≈27 · V ≈23 · III ≈13 · IV ≈3**.
- **Sobre-peso a subtemas críticos**: I-3, II-1, II-3, V-2, II-11, III-5, II-8 (+ I-5, III-8 según auditoría reciente).
- **Ajuste por MI data de errores** (`_registro_resoluciones.json`): subir ligeramente los subtemas donde Joseph falla (cerrar ángulos), sin romper las proporciones reales del examen.
- Fuentes: claves SERUMS (2024-2A/2B, 2025-1A/1B, 2025-2) + Theomed + QX + compendios verificados. Nunca aceptar dosis/criterios/NTS sin verificar.
- Guardar los resultados del simulacro en la base de datos (aprendo qué falla).

## Fuente y notas
- Cada bloque tiene su justificación científica en la descripción del evento (Cepeda 2008, Karpicke, Bjork, Walker, etc.).
- Bancos permitidos por orden de calidad: claves SERUMS → Theomed → QX → Claude/GPT con compendio verificado.
- Regla dura del sistema: **verificar toda NTS/dosis contra el PDF oficial antes de fijar un APEX.**
