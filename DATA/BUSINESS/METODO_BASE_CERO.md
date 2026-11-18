# LIVIANO Academia + Business (Estudio Pulso) · método BASE CERO

> v6.10e · mié 18-nov-2026 · orden de Joseph: «todos partimos de CERO; las preguntas tienen que ser REALES; planes bien estructurados; empezamos el 19».
> Síntesis propia con fuentes; nada copiado de academias ni de bancos de pago (solo ids, títulos y conteos).
> Código: `DATA/_scripts/gen_liviano_plan.js` (→ `src/lib/livianoStudyPlan.ts`, `src/lib/livianoCasos.ts`) · `DATA/_scripts/gen_business_plan.py`
> (→ `src/lib/businessStudyPlan.ts`, sin cambios de contenido) · guías en `src/lib/rutinaGuia.ts` (guiaLivianoDe, guiaBusinessDe, bizBaseCeroDe).
> Mismas horas, mismas fechas y mismos minutos: cambia el contenido de dos evaluaciones de LIVIANO y se añade la fase en el aviso de F1.

---

## A. LIVIANO (medicina de la obesidad)

### A.1 Principio

Fisiología → farmacología → casos. Primero el *porqué* del peso (sistema que defiende un nivel de adiposidad, leptina, núcleo arcuato, adaptación metabólica que persiste años: Schwartz MW et al., *Obesity Pathogenesis: An Endocrine Society Scientific Statement*, Endocr Rev 2017, PMC5546881); después qué hacen los fármacos y con qué cifra de ensayo real (STEP 1, SELECT, SURMOUNT-1/-5, fichas FDA); por último los casos integrados (acceso en Perú, nutrición, ejercicio, conducta, límites de competencia). Es la regla Palmerton del repo: entender el mecanismo antes de memorizar datos (`DATA/USMLE/PALMERTON_METODO_COMPLETO.md`). El currículo ya iba en ese orden; lo que faltaba era decirlo y fijar el criterio de paso.

### A.2 Fases y criterios de paso

| Fase | Filas (D) | Fechas reales (alias) | Qué | Pasas cuando |
|---|---|---|---|---|
| **1/3 FISIOLOGÍA** | D1-D20 (casos 1-4) | jue 19-nov → mié 16-dic | homeostasis, set point, leptina, arcuato, grelina, saciedad, adaptación metabólica | recall de los lunes ≥ 80 % y casos 1-4 ≥ 6/8 en la rúbrica (≥ 1 en «mecanismo») |
| **2/3 FARMACOLOGÍA GLP-1** | D21-D36 (caso 5) | jue 17-dic → jue 7-ene | incretinas, STEP 1, suspensión, SELECT, SURMOUNT-1/-5, efectos adversos, seguridad, masa magra, vía oral | tabla de cifras del D35 (mié 6-ene) ≥ 80 % y caso 5 ≥ 6/8 |
| **3/3 CASOS INTEGRADOS** | D37-D90 (2027) | ene → vie 2-abr-2027 | acceso en Perú, nutrición, ejercicio, fármacos no GLP-1 y cirugía, conducta, síntesis, capstone | casos 6-16 ≥ 6/8 de media ≥ 80 % (meta Palmerton del plan, sin cambio) |

En F1 cada sesión lleva al final del aviso «BASE CERO · fase n/3 …: qué. Pasas a … con …».

### A.3 Preguntas reales: qué había y qué hay ahora

| Evaluación | Antes | Por qué no valía | Ahora |
|---|---|---|---|
| **Lunes · «pre-test ciego 5Q»** (6′) | `livPretest` = 5 tarjetas de mecanismo del JSON (preguntas y respuestas escritas por Claude) con % ciego | no son preguntas reales | **RECALL EN BLANCO** de la semana anterior (`LIV_RECALL`): 1 ítem por fila de D-5…D-1, con **solo el título de la lección** como pista; se escribe el mecanismo en 1 línea (o mecanismo · metáfora · plan del caso en 3) y se corrige contra la tarjeta del día y **su fuente primaria**. Mismos 6′ y mismo registro x/n. No es un test |
| **Drill de cifras ancla** (2027: D35 · D56 · D75 · D87) | preguntas de cifra escritas por Claude, sin fuente | sin trazabilidad | **TABLA EN BLANCO** de cifras de ensayos y guías reales: cada respuesta trae su fuente (PubMed / PMC / ficha FDA) o «A VERIFICAR» si el plan no la fija (`FUENTES_DRILL`) |
| **Casos (rúbrica 0-2 × 4)** | role-play sobre un caso escrito con datos de las fuentes | — | sin cambio (es aplicación, no pregunta) |

**Por qué no hay banco real en LIVIANO (comprobado el 18-nov):**
- Pool oficial MIR 2022-2026 del repo (`DATA/MIR/pool`, 1.050 preguntas): **0** preguntas de leptina, grelina, arcuato, POMC/AgRP o saciedad → nada para la fase 1.
- Sí hay **7 preguntas MIR oficiales** de fármacos y cirugía de la obesidad: 2023-159, 2024-190, 2025-184, 2025-188, 2026-093, 2026-112, 2026-186. Son del **plan MIR**, que sirve cada pregunta oficial **una sola vez** (`DATA/MIR/POOL_USO.md`, log `qIds`): usarlas en LIVIANO las quemaría para el MIR → decisión de Joseph.
- Bancos específicos de medicina de la obesidad: OMA «Practice Questions for the Board Exam» (Obesity Medicine Academy), StatPearls (preguntas tipo board por capítulo; banco de pago), Rosh Review Obesity Qbank (de pago, con prueba) → ninguno libre → decisión de Joseph.

**Respaldo del cambio:** la práctica de recuperación (escribir de memoria y luego corregir) mejora el recuerdo a largo plazo más que releer (Roediger & Karpicke, *Psychological Science* 2006) y más que estudiar elaborando mapas conceptuales (Karpicke & Blunt, *Science* 2011). El recall en blanco conserva ese efecto sin inventar preguntas.

---

## B. Business (Estudio Pulso · lecturas)

### B.1 Principio

Business no tiene examen ni banco de preguntas: es lectura aplicada en 25′ (L-J) + un OUTPUT de 1 página. Base cero = **un ciclo que se repite en cada bloque**: escuchar al propio autor (charla o entrevista medida) → nota de 3 líneas o 1 tarjeta de mecanismo (¿por qué?) → OUTPUT terminado. El criterio de paso de bloque es el del tracker del plan (hoja Metricas_v2): OUTPUT terminado y lecturas marcadas; < 80 % dos semanas seguidas → se ajusta el plan.

### B.2 F1 por bloques (fechas de plan → real con el alias)

| Bloque | Lecturas | OUTPUT | Materia |
|---|---|---|---|
| S1 | D3-D8 (mié 18 → lun 23-nov) | D9 mar 24-nov | BIOLOGÍA (Spark, In Defense of Food) |
| S2 | D10-D15 | D16 mar 1-dic | SUEÑO (Why We Sleep) |
| S3 | D17-D22 | D23 mar 8-dic | SUEÑO (Circadian Code + lectura crítica) |
| S4 | D24-D29 | D30 mar 15-dic | MENTAL (Burns, Hari) |
| S5 | D31-D36 | D37 mar 22-dic | MENTAL (Hari, Barrett) |
| S6 | D38-D53 (cruza a 2027; las 3 últimas ya son de PAREJA) | D54 vie 8-ene | FOCO (ADHD 2.0, Driven to Distraction, Smart but Scattered) |

El aviso de F1 lo dice en la 1.ª lectura de cada bloque («BASE CERO · empieza el bloque del OUTPUT Sk…») y en su OUTPUT («… cierra su bloque: pasas al siguiente con…»). Ninguna otra fila cambia.

### B.3 Preguntas

No hay pasos con preguntas de evaluación en Business (comprobado en `DATA/BUSINESS/plan_pulso_v3_L.json`: 84 filas; las «preguntas» que aparecen son preguntas para pacientes o para la consulta, es decir, producción propia del OUTPUT). Nada que sustituir.

---

## C. 2027 (anotado; sin cambios de fecha)

- LIVIANO: fase 2 termina el D36 (jue 7-ene); fase 3 desde el D37. Los 12 lunes de 2027 con recall en blanco (4-ene … 29-mar) y las 4 tablas de cifras (6-ene, 4-feb, 3-mar, 24-mar) cambian su texto como en F1.
- Business: el ciclo base cero sigue igual; no se añade texto en 2027.

## D. Pendiente (decisión de Joseph)

1. ¿Compartir con LIVIANO las 7 preguntas MIR oficiales de obesidad (registrando su id en el log del MIR para que no se repitan) o dejarlas solo al plan MIR?
2. ¿Contratar un banco real de medicina de la obesidad (OMA / StatPearls / Rosh Review) para sustituir el recall en blanco por preguntas reales con id?
3. Fijar la fuente de las 7 cifras marcadas «A VERIFICAR» en las tablas de 2027 antes de su fecha: cuota proteica (D56, jue 4-feb) · pérdida sostenida sleeve/bypass, minutos ACSM, kg del ejercicio sin dieta y frecuencia de fuerza con GLP-1 (D75, mié 3-mar) · proteína y fuerza, orforglipron ACHIEVE-1 (D87, mié 24-mar).
