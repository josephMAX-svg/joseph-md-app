# LIVIANO ↔ VITALS · puente Academia → app del paciente

> Fecha: 5-sep-2026 (Palmerton "cero puntos ciegos", vacío 10). Lectura del engine REAL en producción
> (`VITALS/web/src/lib/engine/{domain,plan,ai,index,dispatch}.ts` + `VITALS/supabase/migrations/0001_movimiento_schema.sql`
> + `engine/knowledge.json`). **No se modifica código de VITALS** (vitals-pulso.vercel.app está en producción): este
> documento fija QUÉ enseña la Academia → QUÉ impone/mide la app → qué existe y qué falta, y deja 3 tareas
> concretas listas para un chat de VITALS. Estándar de la Academia: `DATA/BUSINESS/LIVIANO_ACADEMIA.md` (M2-M5) y
> `LIVIANO_PROTOCOLO` (§3-4, §5) en `src/lib/empresaData.ts`.

## 1 · Tabla: estándar de la Academia → regla/campo de VITALS → estado

| # | Estándar que enseña la Academia (módulo) | Dónde debería vivir en VITALS | Qué hay hoy (engine real) | Estado |
|---|------------------------------------------|-------------------------------|---------------------------|--------|
| 1 | **Proteína 1,2-1,6 g/kg/día** junto a todo GLP-1 (M3-M4, §3-4 del protocolo) | `domain.ts` `objetivoCalorico()` / `plan.ts` `safetyValidate()` | `PROTEINA_PISO = 1.6` (mantenimiento/recomposición) y `PROTEINA_DEFICIT = 2.0` (déficit); `safetyValidate` viola si < 1,55 g/kg | **existe, desalineado hacia arriba** (ver §3) |
| 2 | **Fuerza 2×/semana innegociable** con GLP-1 (M4) | `plan.ts` split del plan (`entrenamiento.dias_fuerza`) | Solo `SPLIT_JOSEPH` (4 días de fuerza + baile): pensado para Joseph, no para un paciente con obesidad que empieza | **falta** split GLP-1 (tarea A) |
| 3 | **Caminata / actividad para mantenimiento** (~1 h/día NWCR; M4) | `scoreDay()` pilar `cardio` (`dias_cardio` + caminata cualquier día con peso 0,6) | Caminata puntúa cualquier día (`mv_activity_proofs` tipo caminata) pero sin objetivo de minutos/pasos progresivo | **parcial** (tarea A añade la progresión) |
| 4 | **Escalada lenta y manejo GI** (náusea, vómito, estreñimiento) como parte del tratamiento (M2) | `ai.ts` `RED_FLAGS` + `CLINICOS` → `mv_clinician_tasks` | Banderas rojas reactivas: vómito persistente, dolor abdominal severo (pancreatitis), alergia, deshidratación; palabras clínicas escalan al médico | **existe solo si el paciente escribe**; no hay check-in proactivo (tarea B) |
| 5 | **Automonitoreo = predictor #1** (M5, 5As) | pilares `comida`, `medicion`, `hidratacion`, `sueno` de `scoreDay()`; racha semanal + freeze | Existe: score diario 0-100, racha SEMANAL (Peloton) con 1 freeze/mes, reporte de lunes (`weeklyReport`) | **existe** |
| 6 | **Composición corporal, no balanza** (M4) | `mv_body_composition.metrics` (peso, grasa_pct, masa_magra_kg, cintura…) + `weeklyReport()` | El reporte de lunes solo usa `delta_peso_14d`; `metrics` admite cualquier clave pero la UI/extracción Renpho no piden cintura ni fotos; PRs de fuerza sí existen (`progresionPorEjercicio`) | **parcial** (tarea C) |
| 7 | **Pérdida de masa magra → proteína + fuerza** (M2) | `reestructurarPlan()` | Sube kcal si pérdida > 1 %/semana y escala al médico (`VEL_MAX_PCT_SEM = 1.0`); deload si la fuerza baja | **existe** (velocidad y fuerza), **falta** usar masa magra/cintura como señal |
| 8 | **`bajo_glp1`** como condición del paciente | `mv_profiles.bajo_glp1` (boolean) | Existe; se usa en el prompt del coach (`reasonCoach`) y en un aviso de `perfil/page.tsx` ("prioriza proteína y vigila náuseas"); **no cambia el plan ni el split** | **existe, subutilizado** |
| 9 | **Hidratación** (manejo GI, M2) | pilar `hidratacion` (`meta_agua_ml` 3000 por defecto) | Existe (vasos o ml); no se ajusta con `bajo_glp1` ni con vómito | **existe** |
| 10 | **Sin culpa / people-first** (M5) | `ai.ts` `PERSONA` (adherence-neutral, MacroFactor) | Existe: prohíbe regañar, "nunca diagnostica, nunca cambia dosis" | **existe** |
| 11 | **Límites: MEN2, pancreatitis, embarazo/lactancia** (M2, §2 del protocolo) | cribado en consulta (no en la app) + `CLINICOS` ("embarazo", "lactancia" escalan) | La app escala si el paciente menciona embarazo/lactancia; el cribado de MEN2 es de consulta | **existe lo que corresponde a la app** |
| 12 | **Garantía "Acompañamiento" (InBody sin cambio a 90 días)** (LIVIANO_OFERTA) | `guaranteeFlags()` 90/95 % + `reportGuarantee()` | Existe para adherencia; la "evidencia" cuenta mediciones de composición pero no compara InBody inicial vs 90 días | **parcial** (tarea C lo habilita) |
| 13 | **Base de conocimiento GLP-1 del coach** | `knowledge.json` (32 chunks, namespace `movimiento`) | Hay 1 chunk GLP-1 (Sowa: comer bajo GLP-1, proteína), 1 hidratación bajo GLP-1, Phillips 1,6 g/kg, Attia | **parcial**: faltan chunks de la Academia (escalada GI, 67 % de recuperación, fuerza 2×, "termostato") — se pueden añadir como filas en `mv_knowledge_base` sin tocar código |

## 2 · Las 3 tareas concretas (para un chat de VITALS; ninguna toca pisos de seguridad)

### Tarea A · `SPLIT_GLP1` — split del paciente LIVIANO (fuerza 2×/sem + caminata progresiva)
- **Dónde**: `VITALS/web/src/lib/engine/plan.ts` (nuevo `export const SPLIT_GLP1`) y `generarPlan()` elige
  `profile.bajo_glp1 ? SPLIT_GLP1 : SPLIT_JOSEPH`. Distinto de `SPLIT_JOSEPH` (4 fuerza + baile, 30-60').
- **Contenido propuesto** (ejercicios ya cubiertos por el catálogo de videos verificados de VITALS; los que no,
  marcarlos y buscarlos con oEmbed como en `videos-verificados.md`):
  - Día 0 (lun) **Fuerza A · cuerpo completo 25-30'**: sentadilla a cajón/silla 3×8-12 · press de pecho con mancuernas 3×8-12 · remo con mancuerna 3×8-12 · plancha 3×20-30 s (RIR 2-3).
  - Día 2 (mié) **Caminata zona 2** 20' → +5'/semana hasta 45-60' (progresión escrita en el plan, no en la UI).
  - Día 3 (jue) **Fuerza B · cuerpo completo 25-30'**: peso muerto rumano con mancuernas 3×8-10 · jalón/remo 3×8-12 · press militar sentado 3×8-12 · zancadas o step-up 2×10 (RIR 2-3).
  - Días 1, 4, 5, 6: caminata libre (pilar `cardio` puntúa 0,6 cualquier día — ya existe).
  - `dias_fuerza: [0, 3]`, `dias_cardio: [2]` → la racha semanal (`weeklyStreak`: meta = días del plan − 1) exige 2 de 3 sesiones: coherente con "fuerza 2×/sem innegociable".
- **Criterio de éxito**: `scoreDay()` de un paciente `bajo_glp1` solo pide fuerza lunes y jueves; `weeklyStreak().semana_actual.meta === 2`.

### Tarea B · Check-in semanal de efectos adversos GLP-1 condicionado a `bajo_glp1`
- **Dónde**: nueva ruta `enginePost('/wellness/glp1checkin')` en `dispatch.ts` + función en `index.ts`; almacenar
  en `mv_wellness_logs` **requiere ampliar el `check (tipo in ('agua','sueno'))`** → migración nueva
  `0002_glp1_checkin.sql` (añadir tipos `nausea`, `vomito`, `estrenimiento`, `hipoglucemia`, `deshidratacion`,
  escala 0-3) o una tabla `mv_glp1_checkins` (fecha, 5 ítems 0-3, dosis_actual_mg — A VERIFICAR si se guarda dosis: el
  coach "nunca cambia dosis", así que solo lectura).
- **UI**: tarjeta en el home SOLO si `profile.bajo_glp1` y es el día de check-in (p. ej. domingo o el día de la
  inyección — decisión de Joseph): 5 sliders 0-3 + 1 botón (Hormozi: una sola siguiente acción).
- **Reglas** (mismo estilo que `RED_FLAGS`): vómito ≥ 2 o deshidratación ≥ 2 → `escalateTask(... 'bandera_roja', 'urgente')`
  con la misma respuesta de `RED_FLAGS.vomito_severo`; náusea ≥ 2 dos semanas seguidas → tarea `revisar`
  ("valorar frenar la escalada"); estreñimiento ≥ 2 → chunk de conocimiento (fibra, agua, caminata) sin escalar;
  hipoglucemia ≥ 1 en paciente con sulfonilurea/insulina (campo A VERIFICAR en perfil) → `revisar`.
- **Criterio de éxito**: un paciente `bajo_glp1` con vómito 3 genera una `mv_clinician_tasks` urgente sin haber
  escrito al coach; el paciente sin `bajo_glp1` nunca ve la tarjeta.

### Tarea C · Métricas de composición en el reporte de lunes (cintura · fotos · fuerza)
- **Dónde**: `index.ts` `weeklyReport()` (añadir `delta_cintura_28d`, `delta_masa_magra_28d`, `prs` ya existe,
  `foto_pendiente` si no hay foto del mes) y `bodyManual()` / `visionBody()` (aceptar `cintura_cm` y `foto_url`
  en `metrics`, que ya es `jsonb`; el extractor Renpho `analizarRenpho()` no lo devuelve → entrada manual).
- **Home (lunes)**: la tarjeta "Reporte de lunes" muestra **cintura / masa magra / PRs** antes que el peso
  ("composición, no balanza"), y el insight del coach recibe esos deltas en el prompt.
- **Garantía**: `reportGuarantee()` compara la primera y la última `mv_body_composition` del periodo (peso,
  grasa_pct, masa_magra_kg, cintura) → habilita la garantía "Acompañamiento" (InBody a 90 días) con datos.
- **Criterio de éxito**: con 2 mediciones separadas ≥ 28 días, el reporte muestra Δ cintura y Δ masa magra; sin
  ellas muestra "pendiente: mide cintura este lunes" (una acción).

### Tarea D · Actividad AM no modelada — `actividad_am` en el plan y en el TDEE (12-sep-2026, vacío 11 de gaps_v3b_synapse.json)

**El problema (leído del engine real, sin tocarlo):** `SPLIT_JOSEPH` (`plan.ts`) solo modela la tarde — 4 días de fuerza
30-60' (lun torso empuje · mar pierna posterior · jue torso jalón · vie pierna anterior) + baile mié 45' — y `estimarTdee()`
(`domain.ts`) usa un `factor` genérico (1.5 por defecto) o el método adaptativo pesos×ingesta. Pero el Calendar de Joseph tiene
además **CORRER 06:00-06:30 + CALISTENIA 06:30-06:45 todos los L-V** (en ayunas, tras 2 h de cognición) y **caminata 30' sáb/dom**
+ baile 90' sáb/dom: **≈4-5 h/semana de cardio matinal que no entran en `generarPlan()` ni en el TDEE**. El pilar `cardio` de
`scoreDay()` marca "hecho" con *cualquier* `mv_activity_proofs` (peso 0,6 fuera de `dias_cardio`, 1,0 en ellos), sin objetivo de
minutos, y hasta el 12-sep los eventos CORRER/CALISTENIA (a diferencia de GYM) no pedían registrar nada en VITALS. En un déficit con
front-loading ~20 % y 6 h 15 de carga cognitiva diaria, un gasto no contabilizado de ese tamaño empuja el déficit real por encima
del planificado sin que los pisos (`PISO_KCAL`, `PROTEINA_PISO 1,6 g/kg`, `VEL_MAX_PCT_SEM 1 %`) lo vean.

**Ya hecho (12-sep, fuera del código de VITALS):** descripciones de CORRER `5mrm4ru08go9k70408jm8vcjku` y CALISTENIA
`2lpvftrc3fp64e0om6qg0mcs34` en el Calendar → "📲 AL VOLVER (06:45): registrar en VITALS — correr/caminata 30' (o una sola
entrada 'cardio' 45' = carrera + calistenia) — 20 s". Los tipos existen ya en `activity_proofs.tipo` (`caminata`,`correr`,`baile`,`cardio`).
Con eso los datos empiezan a acumularse desde el lun 14-sep aunque el engine aún no los use.

**Qué hacer en el chat de VITALS (sin tocar pisos de seguridad):**
1. **`plan.ts`** — nuevo bloque en el plan generado: `actividad_am: { lv: { tipo: 'correr', min: 30 } + { tipo: 'calistenia', min: 15 },
   finde: { tipo: 'caminata', min: 30 } }` (o un array por día 0-6 con `tipo` y `min`), dentro de `entrenamiento` junto a `split`,
   `dias_fuerza`, `dias_cardio`. Solo para el perfil de Joseph (`role === 'joseph'`) o para todo perfil con `actividad_am` en `mv_profiles`
   (campo nuevo opcional, jsonb; migración `0003_actividad_am.sql` — A VERIFICAR (12-sep) el número libre de migración).
2. **`domain.ts`** — `estimarTdee()`: cuando el método es `formula`, sustituir el `factor` genérico por un **factor explícito**
   = base (1.2 sedentario por la carga de escritorio) + Σ(min/semana de cada actividad × coste) / 7 / TMB, o más simple: sumar al
   TDEE un `kcal_actividad_am` diario estimado por MET × peso × horas (MET de referencia a confirmar en el compendio de Ainsworth —
   **A VERIFICAR (12-sep)**, no fijar cifras sin fuente). Cuando el método es `adaptativo` (pesos × ingesta) el gasto ya está
   implícito: **no sumar dos veces**; solo dejar el desglose informativo en `tdee.detalle`.
3. **`objetivoCalorico()`** no cambia: recibe el TDEE ya corregido. `safetyValidate()` sigue igual (pisos intactos).
4. **`scoreDay()`** — pilar `cardio`: si el plan trae `actividad_am` para ese weekday, "hecho" = existe `mv_activity_proofs` de tipo
   `correr|caminata|cardio` ese día con `duracion_min ≥ 0,7 × min planificados`; si no, sigue la regla actual (cualquier actividad).
5. **`index.ts` `weeklyReport()`** — añadir `cardio_am: { hechos: n, plan: 5 }` (L-V con proof matinal) y que la tarjeta del lunes
   muestre **"cardio AM cumplido x/5"** junto al split de tarde; el insight del coach recibe ese dato en el prompt (`reasonCoach`).
6. **Criterio de éxito:** con 5 proofs `correr` L-V y 2 `caminata` el finde, el reporte del lunes muestra "cardio AM 5/5" y el TDEE
   `formula` sube respecto al mismo perfil sin `actividad_am` (diferencia visible en `tdee.detalle`); un perfil sin `actividad_am`
   no cambia en nada. Datos de referencia ya en `research/RESEARCH_REFERENTES.md` (Helms/Israetel) y `DATA/VITALS/retencion-research.md`.

## 3 · Alineación del piso de proteína (decisión propuesta, sin cambiar código todavía)

- Academia: **1,2-1,6 g/kg/día** (rango; el extremo alto con GLP-1 y fuerza). VITALS: **piso 1,6 g/kg** y
  **2,0 g/kg en déficit**, calculados sobre `peso_inicial`.
- En un paciente con obesidad (p. ej. 105 kg), 2,0 g/kg = 210 g/día — poco realista con el apetito suprimido por
  GLP-1 y potencialmente por encima de lo que enseña la Academia. Propuesta: cuando `bajo_glp1 === true`,
  calcular la proteína sobre **peso ajustado o peso objetivo** (fórmula A VERIFICAR: peso ideal + 0,4×(actual −
  ideal) es la convención habitual en obesidad — confirmar en Obesity Algorithm 2026 / OMA) con objetivo
  **1,6 g/kg** (techo del rango de la Academia) y **piso de seguridad 1,2 g/kg** para `safetyValidate`.
- Hasta que Joseph lo decida, la Academia enseña el rango y la app impone el piso 1,6: **no hay contradicción
  clínica** (1,6 está dentro del rango), solo el riesgo de un objetivo inalcanzable en pacientes muy pesados.
  Registrar la decisión en `LIVIANO_PROTOCOLO §3-4` cuando se produzca (Síntesis M3-M4).

## 4 · Lo que NO se duplica

- El plan Business v3 L ya no tiene "plan de ejercicio 12 semanas casa→gimnasio": lo hace VITALS (49 videos
  verificados, split + progresión + PRs). El OUTPUT S14 del plan Business es el plan PERSONAL de Joseph (encarnar
  el resultado), no el del paciente.
- La Academia no enseña "qué app usar": enseña el estándar; VITALS lo impone y lo mide. Este documento es el
  contrato entre ambos.

## Pendiente para Joseph (decisiones, no código)
1. Día del check-in GLP-1 (fijo semanal vs día de la inyección) y si la app guarda la dosis actual (solo lectura).
2. Peso de cálculo de la proteína en `bajo_glp1` (actual / ajustado / objetivo) y piso 1,2 vs 1,6.
3. Si la foto mensual se guarda en VITALS (consentimiento Ley 29733 ya existe en `mv_profiles.consentimiento`) o
   solo se registra "hecha/no hecha".
