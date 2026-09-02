# 📊 SISTEMA DE TRACKING DE RESPUESTAS — ENCAPS 2026-II
> Cómo se guarda CADA respuesta de Joseph, por qué falló, y qué se rutea a Anki/Obsidian. Regla de Joseph (24-jul-2026): *"toda esta data la vas guardando... respondido mal, respondido bien, ¿pero por qué respondió mal? ¿o respondió bien por casualidad?"*. Alimenta el **pronóstico de nota** y las **re-preguntas con otro enfoque**.

## Estructura de carpetas
```
TRACKING_ERRORES/
├── _registro_resoluciones.json   ← APPEND-ONLY. Toda ronda, toda pregunta.
├── PERFIL_CONOCIMIENTO.md        ← estado por sub-ángulo (se re-escribe cada ronda)
├── RONDAS/                       ← 1 archivo por ronda: <codigo>_<bloque>_<fecha>.json
├── ANKI_COLA/                    ← tarjetas pendientes de enviar a Anki
└── OBSIDIAN_COLA/                ← notas conceptuales pendientes de enviar al vault
```

## Esquema por pregunta (lo que se guarda SIEMPRE)
```json
{
  "n": 7, "codigo": "I-3", "subangulo": "Indicadores de frecuencia",
  "fecha": "2026-07-24", "bloque": "pretest_dia", "dif": "alta",
  "tu": "C", "correcta": "B", "ok": false,
  "confianza": "adivinada|dudosa|segura",
  "error": "CONCEPTO|CONTEXTO|CRONOLOGIA|CCSN|OLVIDO|null",
  "causa": "Confundió el DENOMINADOR: usó población (mortalidad) en vez de casos (letalidad)",
  "acierto_por_suerte": false,
  "ruta": "ANKI|OBSIDIAN|AMBOS|null"
}
```

### Taxonomía de error (Palmerton)
| Código | Significa |
|---|---|
| **CONCEPTO** | No entiende la idea (inversión de modelo mental). El más caro. |
| **CONTEXTO** | Sabe el concepto pero no leyó bien el escenario/la palabra clave. |
| **CRONOLOGÍA** | Error de secuencia o de tiempo (qué va primero, qué plazo). |
| **CCSN** | Cambió una respuesta correcta por una incorrecta. |
| **OLVIDO** | Lo supo antes y se le fue (dato puro, cifra, plazo). |

### ⚠ Acierto por suerte (`acierto_por_suerte: true`)
Acertar marcado como **adivinada/dudosa** NO cuenta como dominio. Se trata como **fallo encubierto**: entra igual a la cola de re-pregunta. Con 4 opciones, el azar da 25% — sin este campo el % ciego queda inflado y el pronóstico de nota miente.

## Reglas de ruteo Anki / Obsidian
- **→ ANKI** (repetición espaciada, dato puntual): fallos de **OLVIDO** y de **CONCEPTO por definición cerrada** en temas **CRÍTICOS**. Ej.: periodicidad de notificación por evento, denominadores de indicadores, categorías de vigilancia. **Prioridad: lo que Joseph falla MUCHO en los temas más rentables.**
- **→ OBSIDIAN** (nota conceptual, entender el porqué): fallos de **CONCEPTO** que exigen modelo mental, y todo lo que se repite en ≥2 rondas. Ej.: activa vs pasiva vs centinela, letalidad vs mortalidad, incidencia vs prevalencia.
- **→ AMBOS**: sub-ángulo crítico fallado 2+ veces (nota que explica + tarjeta que fija).
- **Nada se rutea si fue acierto seguro.** No saturar las colas.

## Métrica que manda
**% CIEGO REAL** = correctas *seguras* / total. Es la única que se usa para el **pronóstico de nota**. Se recalcula cada ronda y se compara contra la meta (**≥17/20 → 85%**). Los aciertos por suerte se descuentan.

## Loop operativo
1. Antes de generar: mirar hora → segmento del Calendar → formato (ver `PROTOCOLO_GENERACION_PREGUNTAS.md`).
2. Joseph responde a ciegas.
3. Calificar → **APENDAR** a `_registro_resoluciones.json` + volcar la ronda a `RONDAS/`.
4. Clasificar error + marcar aciertos por suerte.
5. Rutear a `ANKI_COLA/` y `OBSIDIAN_COLA/`.
6. Actualizar `PERFIL_CONOCIMIENTO.md` y recalcular el % ciego + pronóstico de nota.
7. Los fallados vuelven **con OTRO enfoque** (no la misma pregunta) en D+1, D+3, D+7.
