# 📊 SISTEMA DE TRACKING DE RESPUESTAS — multi-examen (ENCAPS · USMLE · MIR · DERMA) · v3 (05-sep-2026)
> Cómo se guarda CADA ronda que Joseph resuelve, por qué falló, y qué se rutea a Anki/Obsidian. Regla de Joseph (24-jul-2026): *"toda esta data la vas guardando... respondido mal, respondido bien, ¿pero por qué respondió mal? ¿o respondió bien por casualidad?"*. Alimenta el **% CIEGO REAL**, los **temas calientes**, el **override semanal del CICLO** ENCAPS y el **pronóstico de nota**.
>
> v3 = esquema **multi-examen** + **formato mínimo de cierre de sesión (1 línea)** + pipeline `gen_encaps_semana.js`. Compatible hacia atrás con las 2 rondas de julio (v1/v2): el script las normaliza.

## Estructura de carpetas
```
TRACKING_ERRORES/
├── _registro_resoluciones.json   ← APPEND-ONLY. Toda ronda (rondas[]), _meta v3 (vector, críticos, esquema), resumen_por_subtema (recalculado)
├── README_SISTEMA_TRACKING.md    ← este doc
├── PERFIL_CONOCIMIENTO.md        ← estado por sub-ángulo (histórico jul-2026; desde sep el estado vive en resumen_por_subtema + SEMANAS/)
├── SEMANAS/                      ← 1 informe por semana (semana_<lunes>.md) + override propuesto (override_<lunes siguiente>.json)
├── RONDAS/                       ← detalle por ronda cuando se guarda pregunta a pregunta: <codigo>_<bloque>_<fecha>.json
├── ANKI_COLA/                    ← tarjetas pendientes de enviar a Anki
└── OBSIDIAN_COLA/                ← notas conceptuales pendientes de enviar al vault
```

## La métrica que manda
**% CIEGO REAL = correctas SEGURAS / total.** Las correctas dudosas o adivinadas NO cuentan (con 4 opciones el azar da 25%: sin esta regla el % queda inflado y el pronóstico miente). Metas ENCAPS 2027-I: **≥85%** (≈17/20) · crucero **≥75%** en bancos del día · mini-sim de viernes **≥18/25** (alerta si **<15/25 dos viernes seguidos**).

## Esquema de RONDA v3 (lo que se guarda SIEMPRE, cualquier examen)
```json
{
  "examen": "ENCAPS",                    // ENCAPS | USMLE | MIR | DERMA
  "tipoRonda": "banco_dia",              // banco_dia | eval_anclada | mini_sim | pretest | simulacro | repaso | warmup
  "fecha": "2026-09-07",
  "codigo": "II-3",                      // ENCAPS: código del temario (I-3, V-2, II-EMG…) · USMLE/MIR/DERMA: sistema o materia
  "tema": "Inmunizaciones · esquema + intervalos",   // opcional (sub-eje del día)
  "n": 22,
  "correctas_seguras": 15,
  "correctas_dudosas": 3,
  "fallos_por_tipo": {
    "knowledge": { "CONCEPTO": 1, "OLVIDO": 2, "CRONOLOGIA": 0 },
    "transfer":  { "CCSN": 1, "CONTEXTO": 0 },
    "proceso":   { "CAMBIO": 0, "TIEMPO": 0, "LECTURA": 0 }
  },
  "delta_es": null,                      // opcional: variación del % ciego vs la ronda anterior del mismo código (pp)
  "tiempo_medio_seg": 68,                // opcional
  "pct_ciego": 68.2,                     // derivado = correctas_seguras / n × 100
  "nota": 19,                            // solo mini_sim / simulacro: nota bruta (/25 en el mini-sim)
  "preguntas": []                        // opcional: detalle por ítem (esquema de abajo) → también a RONDAS/
}
```
`n − correctas_seguras − correctas_dudosas` debe coincidir con la suma de `fallos_por_tipo` (el script avisa si no).

### Esquema por PREGUNTA (opcional, cuando se guarda ítem a ítem)
```json
{
  "n": 7, "codigo": "I-3", "subangulo": "Indicadores de frecuencia",
  "fecha": "2026-07-24", "bloque": "pretest_dia", "dif": "alta",
  "tu": "C", "correcta": "B", "ok": false,
  "confianza": "adivinada|dudosa|segura",
  "error": "CONCEPTO|OLVIDO|CRONOLOGIA|CCSN|CONTEXTO|CAMBIO|TIEMPO|LECTURA|null",
  "causa": "Confundió el DENOMINADOR: usó población (mortalidad) en vez de casos (letalidad)",
  "acierto_por_suerte": false,
  "ruta": "ANKI|OBSIDIAN|AMBOS|null"
}
```

### Taxonomía de error v3 (Palmerton: knowledge / transfer / proceso)
| Tipo | Subtipo | Significa | Cura |
|---|---|---|---|
| **knowledge** | **CONCEPTO** | No entiende la idea (modelo mental invertido). El más caro. | nota Obsidian (porqué) + re-pregunta con otro enfoque |
| knowledge | **OLVIDO** | Lo supo y se le fue (cifra, dosis, plazo, semana). Es lo que el comité 2026-II preguntó. | tarjeta Anki esa misma tarde |
| knowledge | **CRONOLOGIA** | Secuencia o plazo mal aprendido (qué va primero, cuántos días). | tabla de secuencia + Anki |
| **transfer** | **CCSN** | *Confusión entre Conceptos Similares/Near*: sabe ambos pero no discrimina en el escenario (activa↔pasiva, letalidad↔mortalidad). | tabla comparativa + imagen mnemónica |
| transfer | **CONTEXTO** | Sabe el concepto pero no leyó la palabra clave del escenario. | subrayar gatillo antes de responder |
| **proceso** | **CAMBIO** | Cambió una respuesta correcta por una incorrecta. | regla: no cambiar sin evidencia nueva en el enunciado |
| proceso | **TIEMPO** | Se pasó de 72 s/Q (mini-sim / simulacro). | ritmo: marcar y seguir |
| proceso | **LECTURA** | Leyó mal el enunciado u opciones (negaciones, "excepto"). | releer la pregunta antes de las opciones |

⚠ Hasta julio "CCSN" se usó con dos sentidos (confusión entre conceptos parecidos / cambió la correcta). Desde v3: **CCSN = confusión entre conceptos vecinos (transfer)**; el cambio de respuesta es **proceso.CAMBIO**.

### ⚠ Acierto por suerte
Acertar marcado como **adivinada/dudosa** NO cuenta como dominio: va a `correctas_dudosas` y entra igual a la cola de re-pregunta.

## Formato mínimo de CIERRE DE SESIÓN (1 línea) — lo único obligatorio cada día
Al final de cada sesión (17:10-17:15 lun-jue · 16:45-17:15 viernes) se escribe UNA línea y se apenda con el script:
```
EXAMEN|tipoRonda|fecha|codigo|n=NN|seg=NN|dud=NN|SUBTIPO:k,SUBTIPO:k,…|t=SS[|sub=clave_sub_eje][|tema=texto][|delta=±x][|nota=NN]
```
Ejemplos:
```
node DATA/_scripts/gen_encaps_semana.js --cerrar "ENCAPS|banco_dia|2026-09-07|II-3|n=22|seg=15|dud=3|CONCEPTO:1,OLVIDO:2,CCSN:1|t=68|sub=esquema_intervalos"
node DATA/_scripts/gen_encaps_semana.js --cerrar "ENCAPS|eval_anclada|2026-09-08|II-3|n=5|seg=3|dud=0|OLVIDO:2|t=55"
node DATA/_scripts/gen_encaps_semana.js --cerrar "ENCAPS|mini_sim|2026-09-11|MIX|n=25|seg=16|dud=3|CONCEPTO:2,OLVIDO:2,CCSN:1,TIEMPO:1|t=70|nota=19" --sql
node DATA/_scripts/gen_encaps_semana.js --cerrar "USMLE|banco_dia|2026-09-07|Cardio|n=30|seg=21|dud=4|CONCEPTO:3,CONTEXTO:2|t=85"
```
- `seg` = correctas seguras · `dud` = correctas dudosas/adivinadas · los subtipos suman los fallos (`n − seg − dud`).
- `--sql` además escribe `DATA/_scripts/_encaps_progress_upsert.sql` (INSERT idempotente en `study_progress`: `porcentaje` = % ciego, `especialidad` = código, `preguntas_resueltas` = n, `errores_por_tipo` = fallos, `tiempo_promedio_pregunta` = t). Se aplica por MCP `execute_sql` (proyecto `qacynpqdrorpuegsmtcy`) — la app lee esa tabla y pinta el **% ciego semanal** en el Cockpit (17/20 → "% CIEGO SEMANAL").
- La **nota del mini-sim (/25)** se carga además en la app (▲ SIM → `study_sim_scores`, `sim_n` = día): es la serie que el Cockpit grafica contra 18/25.

## Cierre SEMANAL (viernes, 2 minutos)
```
node DATA/_scripts/gen_encaps_semana.js            # semana actual (lunes ISO de hoy) · --semana YYYY-MM-DD para otra
node DATA/_scripts/gen_encaps_semana.js --sql      # + SQL de study_progress con las rondas v3 de la semana
```
Produce `SEMANAS/semana_<lunes>.md` (% ciego por área vs vector v3 II30·I27·V21·III13·IV9, tabla por código con knowledge/transfer/proceso, mini-sims, temas calientes) y `SEMANAS/override_<lunes siguiente>.json` con la **re-ponderación propuesta** del CICLO:
- temas calientes = % ciego < 75% (n ≥ 5) · eval anclada con ≥ 2 fallos · ≥ 3 fallos knowledge, ordenados por `peso del área v3 × brecha a 85` (×1.5 críticos, ×1.2 rebote);
- máximo 2 sustituciones por semana; **I-3 y V-2 nunca se ceden**; un crítico solo se cede si ya está ≥ 85% con n ≥ 5;
- secundarios: los códigos de cola larga con fallos pasan primero.
Aplicar: `node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-09-07 --override DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/override_<lunes>.json` → revisar el SQL → `execute_sql`. El checkpoint de fin de enero (v3 §6 regla 3) sale de esta misma serie: no se reconstruye a mano.

## Reglas de ruteo Anki / Obsidian
- **→ ANKI** (repetición espaciada, dato puntual): **OLVIDO** y **CRONOLOGIA**, y **CONCEPTO por definición cerrada** en temas **CRÍTICOS**. Prioridad: lo que Joseph falla MUCHO en los temas más rentables (críticos v3).
- **→ OBSIDIAN** (nota conceptual, entender el porqué): **CONCEPTO** y **CCSN** que exigen modelo mental, y todo lo que se repite en ≥2 rondas.
- **→ AMBOS**: sub-ángulo crítico fallado 2+ veces.
- **Nada se rutea si fue acierto seguro.** Los fallos de **proceso** no generan tarjeta: generan regla de examen.

## Loop operativo
1. Antes de generar: mirar hora → segmento del Calendar → mapa del examen (ENCAPS: vector v3 + sub-eje del día en la app) → formato (`PROTOCOLO_GENERACION_PREGUNTAS.md`). ⚠ Examen 2026-II = LISTA NEGRA hasta el pre-test de febrero.
2. Joseph responde a ciegas (confianza por ítem: segura / dudosa / adivinada).
3. Calificar → clasificar fallos (knowledge / transfer / proceso) → **línea de cierre** → `--cerrar`.
4. Rutear a `ANKI_COLA/` y `OBSIDIAN_COLA/` (solo knowledge/transfer).
5. Viernes: nota del mini-sim en ▲ SIM + `gen_encaps_semana.js` → override de la semana siguiente si hay calientes.
6. Los fallados vuelven **con OTRO enfoque** (no la misma pregunta) en D+1 (eval anclada), D+3, D+7 y en los ≥5Q de "fallos previos" del mini-sim.
