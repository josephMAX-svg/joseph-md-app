# RESEARCH · Método desde CERO (v6.10e · 18-nov-2026)

> Orden de Joseph (18-nov-2026): *«Todos estamos partiendo de CERO… las preguntas tienen que ser preguntas REALES… estructura planes bien
> estructurados, verifica todo»*. Este documento es una **síntesis propia** con sus fuentes. El orden de arranque lo decidió Joseph en el chat
> Research el 17-nov: **primero SR-1 (el protocolo del metaanálisis) en M1** y no la tesis; del M1 original solo queda el WhatsApp al asesor.
>
> Código: `DATA/_scripts/research_guia.js` (guías paso a paso, `FASES_RESEARCH` y controles) → `gen_research_plan.js` → `src/lib/researchGuia.ts`
> (generado). Comprobación: `node DATA/_scripts/gen_research_plan.js --check`.

## 1. Resumen en 6 líneas

1. **Se aprende haciendo un producto real y pequeño**: primero los fundamentos (qué es una revisión sistemática, PICO, diseño del estudio),
   después **una carta al editor**, luego un **reporte de caso** según CARE y, en 2027, la **revisión sistemática SR-1** completa.
2. **Research no tiene banco de preguntas real propio**, así que **no hay preguntas**. Las «2Q de auto-test» de las evaluaciones ancladas las
   escribía la IA; ahora son un **recall en blanco** de los 2 puntos clave del átomo anterior, que se **contrastan con su fuente real** (el recurso
   1 de ese átomo: checklist oficial, abstract, guía de la revista).
3. **La corrección nunca la hace un chat.** El pre-test de M1 se corrige con las checklists oficiales de PRISMA-P, PRISMA 2020 y AMSTAR-2 en la
   evaluación anclada de R0. La «clave» del abstract de M1 es el propio abstract: lo que no dice se apunta como «no consta».
4. **Seis fases con un criterio verificable para pasar de una a otra**, que figuran en el aviso de cada guía (`faseResearchAviso`).
5. **Mismas horas y fechas.** 13:30-14:15 en días alternos con Derma: los mismos átomos, en las mismas fechas, con los mismos minutos.
6. **Con el alias v6.10d, el día real es el hábil siguiente a la fecha del plan.** M1, con fecha de plan jue 19-nov, se hace el **vie 20-nov**.
   El jue 19 real corresponde al plan del mié 18, que es Derma d1.

## 2. Método (nombrado y referenciado)

| Pieza | Qué dice | Fuente |
|---|---|---|
| **Orden de una revisión sistemática** | Pregunta PICO explícita y predefinida → equipo con ≥ 2 revisores independientes → protocolo a priori, registrado (PROSPERO) ANTES de conocer los resultados → búsqueda exhaustiva sin restricción de idioma → cribado y extracción por duplicado → riesgo de sesgo → síntesis y GRADE | **NLM** · cuaderno «RESEARCH · Método base cero», fuente Cochrane Handbook cap. 1 «Starting a review» + vídeo de Cochrane «What are systematic reviews?» (YouTube egJlW4vkb1Y) |
| **Leer un artículo para clasificar su diseño** | El diseño y el valor del estudio se juzgan por los Métodos, nunca por lo atractiva que sea la hipótesis ni por la Discusión; se reconoce el formato IMRAD y se comprueba si el diseño era el adecuado para la pregunta | **NLM** · Greenhalgh, «How to read a paper: getting your bearings» (BMJ 1997) |
| **Carta al editor** | Leer el artículo índice y comprobar que la crítica no está ya en sus limitaciones → planificar: búsqueda para un ángulo nuevo, normas de la revista, cartas publicadas recientes y 3-5 coautores que cumplan ICMJE → escribir 3-4 puntos, uno por párrafo, con el título propio → aprobación de todos los coautores → envío dentro de los límites de la revista | **NLM** · Siau K & El-Omar E, «How to write a Letter to the Editor» (UEG Journal 2020, PMC7707868) |
| **Reporte de caso** | La checklist CARE (13 ítems): título con «case report», 2-5 palabras clave… y el consentimiento informado del paciente | **NLM** · CARE Checklist (care-statement.org) |
| **Errores del principiante** | Revisión en solitario · cambiar métodos o excluir estudios después de ver los resultados · restringir por idioma · subgrupos no predefinidos · en la carta: repetir datos del artículo, criticar sin aportar nada, tono descortés, demasiados puntos, autocitación, copiar el título original, enviar sin el visto bueno de los coautores | **NLM** · Cochrane Handbook cap. 1 + Siau 2020 |
| **Tarjetas** | ≤ 3 APEX-método por sesión, creadas el día que se aprende algo (nada de mazos vacíos) | Palmerton / regla del repo (memoria «Anki/Obsidian al aprender») |

**Lo que NO dicen las fuentes (NLM, 18-nov):** no traen un plan de 6 semanas con bloques de 45′. Los criterios de cada fase de la tabla de abajo
son **entregables verificables** (síntesis propia), cada uno con su checklist oficial.

## 3. Bancos de preguntas: lo que hay y lo que no

- **No hay banco de preguntas real propio de Research abierto en el plan.** Por eso las evaluaciones son **recall en blanco + contraste con la
  fuente** y aplicar **instrumentos reales** sobre artículos reales: Greenhalgh sobre el abstract de Taylor 2009 (R1), AMSTAR-2 sobre las 5 SR
  que solapan con SR-1 (R9) y CARE sobre el caso propio (CR-4).
- **Banco real disponible, por decidir (pendiente de Joseph):** los ejercicios del módulo 1 de **Cochrane Interactive Learning**, «Introduction to
  conducting systematic reviews» (gratis con cuenta Cochrane, 45-60′; act. ene-2025). La cuenta la crea Joseph; podría ir en los 15′ de lectura
  del «Research mínimo» de la pausa (21-ene → 10-feb) o al empezar la fase 4. No está metido en el plan.
- Las preguntas MIR (ProMIR) y USMLE sobre diseño de estudios son de los frentes MIR y Step 1: no se gastan aquí.

## 4. Fases (base cero)

| Fase | Átomos (fecha de plan) | Qué se hace | Criterio para pasar |
|---|---|---|---|
| **1 · Fundamentos e infraestructura** | M1 jue 19-nov · R0 lun 23 · R1 mié 25-nov | Qué es una SR (SR-1 primero), identidad de autor (ORCID…), PICO y diseño leído desde los Métodos | 3 PICO completos (P·I·C·O + tipo + diseño ideal) en 01_PICO.md + 1 abstract real clasificado por diseño y comprobado contra el abstract; infra ≥ 7/10 |
| **2 · Primer producto guiado: carta al editor** | C-1 vie 27-nov → C-6 lun 21-dic (con M2, T-1 y R9) | Diana → cartas modelo → borrador de 3-4 puntos → citas verificadas → formato → envío (Siau 2020) + ética de la tesis + mentor de inglés + AMSTAR-2 | Carta ENVIADA con nº de manuscrito, dentro del límite de la revista y con 0 referencias sin DOI/PMID verificado |
| **3 · Case report (CARE) + tesis → research letter** | CR-1 mié 23-dic · CR-2 mar 29-dic · T-3 sáb 2-ene → 2027 (T-*, CR-3…CR-9, X-7, X-8, M3) | Caso y consentimiento de publicación, fotos, CARE 13/13, borrador y revisión; research letter | CARE 13/13 + consentimiento firmado + research letter enviada |
| 4 · SR-1: protocolo y registro | 2027 (R2, R3, R6-R11, X-1…X-6, X-9, K1, K2) | Pregunta y equipo de 2 revisores, PRISMA-P y PROSPERO antes de ver resultados | Protocolo con los 17 ítems de PRISMA-P + registro PROSPERO enviado |
| 5 · SR-1: conducción | 2027 (R12-R33) | Búsqueda reproducible, cribado y extracción por duplicado, riesgo de sesgo, forest plot, GRADE | Cribado dual con kappa, extracción doble, riesgo de sesgo por estudio y diagrama PRISMA 2020 |
| 6 · Manuscritos y segunda línea | 2027 (B*, R34-R46, CR2-*, X-10…X-14) | Manuscrito SR-1, rebuttal, bibliométrico y case report 2 | Manuscrito SR-1 con PRISMA 2020 27/27 enviado |

## 5. F1, átomo a átomo: qué cambió (13:30-14:15, 45′)

Ninguna fecha, átomo, entregable ni minuto cambia.

| Átomo · fecha de plan → día real | Antes | Después |
|---|---|---|
| M1 · jue 19-nov → vie 20 | «Pre-test ciego… la corrección la da el chat Research» · abstract 41249530: «La clave la da el chat Research» | Pre-test = RECALL EN BLANCO que se corrige con las checklists oficiales (en la evaluación anclada de R0) · la clave del abstract es el propio abstract («no consta» si no lo dice) · aviso FASE 1 |
| R0 · lun 23 → mar 24 | Express de M1: «1Q: para qué sirve…» | Express de M1: recall en blanco (fuente: las checklists oficiales) · aviso FASE 1 |
| R1 · mié 25 → jue 26 | Evaluación de R0: «2Q: ¿qué identificador…? · ¿dónde NO se guarda una API key?» | Recall en blanco de 2 puntos clave (fuente: registro de PROSPERO y tu gestor) · FASE 1 |
| C-1 · vie 27-nov → lun 30 | Evaluación de R1: «2Q: terapia → ¿qué diseño? · Taylor 2009…» | Recall en blanco (fuente: 01_PICO.md + abstract PMID 19807760) · FASE 2 |
| M2 · mar 1-dic → mié 2 | Evaluación de C-1: «2Q: la regla de la ventana…» | Recall en blanco (fuente: candidatos.md) · FASE 2 |
| C-2, T-1, R9, C-3, C-4, C-5, C-6 (3 → 21-dic; real: hábil siguiente) | Guía genérica: «Eval anclada: 2Q de auto-test del método» | «Recall en blanco de los 2 puntos clave de su método (los contrastas con «recurso 1 del átomo previo»)» + pre-test = recall en blanco · FASE 2 |
| CR-1 mié 23 → jue 24 · CR-2 mar 29 → mié 30 · T-3 sáb 2-ene (15:30, fijo) | Igual que la fila anterior | Igual + FASE 3 |

Controles nuevos (el generador aborta si fallan): ninguna guía paso a paso pide «2Q de auto-test» ni deja la corrección o la clave a un chat.
Siguen los de antes: cada guía abre con la evaluación anclada de su átomo previo, y M1 no revela el número de ítems.

## 6. Fuentes

- **NLM** · cuaderno nuevo «RESEARCH · Método base cero (SR-1 + carta + case report)» (Gemini Notebook, creado el 18-nov-2026 en la cuenta de
  Joseph por Chrome). Fuentes cargadas: vídeo de Cochrane «What are systematic reviews?» (YouTube egJlW4vkb1Y) · Siau & El-Omar 2020
  (PMC7707868) · Greenhalgh 1997, «How to read a paper: getting your bearings» (BMJ 315:243) · CARE Checklist · Cochrane Handbook cap. 1. No
  cargaron: Ahn & Kang 2019 (PMC6670166) y PRISMA-P 2015 (BMC Syst Rev). Pregunta del 18-nov: fases, Greenhalgh, carta, CARE y errores.
- **Repo**: `DATA/RESEARCH/systematic-reviews.md` (recorrido de 8 pasos y recursos verificados) · `RUTA_PUBLICACION_2027.md` · `MENTORES.md` ·
  `CARTA_1/candidatos.md` · `TESIS_L0/etica.md`.
- **Web**: https://www.cochrane.org/learn/courses-and-resources/interactive-learning/module-1-introduction-conducting-systematic-reviews
  (módulo 1 gratis con cuenta, 45-60′, act. ene-2025).
