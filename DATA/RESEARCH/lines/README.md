# `lines/` — fichas de revisión sistemática por línea de investigación

> Cada línea 0–8 del [`MD maestro §5`](../../MD_MAESTRO_BIOCLINIC_RESEARCH.md) tiene una **SR derivable**:
> una revisión sistemática que se puede ejecutar **$0, sin comité de ética, con datos públicos**. Aquí cada
> SR se convierte en algo **registrable**: PICO + criterios + semilla de búsqueda + papers ancla con
> DOI/PMID real + journal target. El plan día-a-día ([`../daily-plan.md`](../daily-plan.md)) ejecuta estas
> fichas una a una (SR-1 = L4, SR-2 = L5, …).
>
> **Regla:** ninguna cita sin DOI/PMID real. Lo no verificado aún se marca `(verificar)` y lo resuelve el
> agente QA antes de enviar.

## Orden de prioridad de las SR (por Mayo score y "arranque sin datos clínicos")

| # | Línea | SR derivable | Mayo score | Estado | Ficha |
|---|---|---|---|---|---|
| **SR-1** | **L4 · Complicaciones / PERÚ-SAFE** | Complicaciones vasculares de fillers + tiempo-a-tratamiento con hialuronidasa | **38/40** | **activa (en `daily-plan`)** | [`L4-complicaciones.md`](L4-complicaciones.md) |
| **SR-2** | **L5 · Energía en fototipos IV–VI** | RF fraccional / CO₂ en piel de color: eficacia y seguridad, subgrupo por fototipo | (alta) | siguiente | [`L5-energia-fototipos.md`](L5-energia-fototipos.md) |
| SR-3 | L1 · Vascular facial | Variabilidad de la arteria facial y zonas de peligro para fillers | 33/40 | backlog | _(pendiente)_ |
| SR-4 | L6 · Acné & QoL | Instrumentos de QoL en acné (CADI/DLQI) en LMIC | 35/40 | backlog | _(pendiente)_ |
| SR-5 | L2 · Envejecimiento | Patrones de envejecimiento facial en poblaciones no caucásicas | 33/40 | backlog | _(pendiente)_ |
| SR-6 | L3 · Reología fillers | Reología (G-Prime) y outcomes por zona | 34/40 | backlog | _(pendiente)_ |
| SR-7 | L7 · Toxina botulínica | BTX en masetero: dosis, técnica ecoguiada y outcomes | 34/40 | backlog | _(pendiente)_ |
| SR-8 | L8 · IA en derma | Deep learning para clasificación de lesiones en piel de color | — | backlog | _(pendiente)_ |

> Las fichas de SR-3…SR-8 se generan **con la misma plantilla** de L4/L5 cuando el plan llegue a ellas
> (cada SR ≈ 1 ciclo R1→R8 del `daily-plan`). No se inventan papers ancla por adelantado: se buscan en su
> átomo R12–R16.

## Plantilla de una ficha (estructura común)

1. **Por qué esta SR** (gap + ángulo Mayo, 2–3 líneas).
2. **PICO** (Población, Intervención, Comparador, Outcome) + **desenlace primario único**.
3. **Criterios de elegibilidad** (inclusión / exclusión / diseños admitidos).
4. **Semilla de búsqueda** (términos MeSH + libres; bases objetivo).
5. **Papers ancla verificados** (DOI/PMID reales — punto de partida del snowballing).
6. **SR/MA previas** (qué existe ya → cómo nos diferenciamos / acotamos el gap).
7. **Journal target** (de [`../journals.md`](../journals.md)) + ruta de coste APC.
8. **Riesgos/notas de honestidad.**
