# LIVIANO ACADEMIA — Currículo de medicina de la obesidad

> **Franja: 17:15-18:00 L-V · D1 = VIE 11-SEP-2026 (v5.9)** — 90 días L-V → **mar 19-ene-2027** (salta 25-dic, 31-dic y 1-ene);
> bloque del Calendar v5 (serie desde 31-ago). Formato de 45 min: **25' estudio del módulo + 20'
> aplicación** (explicárselo a un paciente: metáforas, role-play, caso).
>
> **v5.9 (10-sep-2026).** El 10 de septiembre tampoco se estudió → +1 día hábil sobre v5.8 (octavo
> corrimiento del ciclo 31-ago→11-sep): el plan se regeneró con
> `node DATA/_scripts/gen_liviano_plan.js 2026-09-11`. **No se fusionó ni se recortó nada**: sigue teniendo
> **90 días, 16 casos, 19 pre-tests y 4 drills** con el currículo entero, y el desfase se absorbe alargando
> el final (fin: lun 18-ene → **mar 19-ene-2027**). La franja y las metas no cambian. Como el generador
> re-slotea los casos a los VIERNES reales, los números de día se re-acomodan (**la fecha es lo estable, el
> D# no**): los 16 casos conservan EXACTAMENTE sus 16 viernes y solo bajan un D# (el caso 1 pasa de D7 a D6),
> mientras el contenido de entre semana corre un día hábil. Todas las tablas de abajo usan los D y las fechas
> REALES de `src/lib/livianoStudyPlan.ts` / `livianoCasos.ts` (parseados con node el 10-sep, no estimados).
>
> **v2 · Palmerton v3 (5-sep-2026).** El plan día-a-día se GENERA: `DATA/BUSINESS/liviano_curriculum.json`
> (fuente única: módulos → temas → estudio/aplicación/fuente/min · tarjetas Anki · drills · 16 casos · rúbrica)
> → `node DATA/_scripts/gen_liviano_plan.js 2026-09-11` → `src/lib/livianoStudyPlan.ts` + `src/lib/livianoCasos.ts`
> + `DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv`. **No se editan los .ts a mano.** Fuente del currículo:
> agente macro:liviano-obesidad (27-ago-2026) + vacíos 1-5 y 9 del análisis Palmerton v3 (5-sep-2026).

**Esqueletos curriculares de referencia** (los tres, verificados): (1) **Obesity Algorithm 2026**
de la OMA — texto base, 4 secciones: evaluación/fisiopatología, nutrición-actividad-conducta,
fármacos/bariátrica, profesionalismo (incluye reducción de estigma); (2) **blueprint del examen
ABOM** (certificación vía 60 créditos CME o fellowship — mapear los módulos al blueprint desde
el día 1 deja abierta una credencial internacional real); (3) **Obesity Canada**: 19 capítulos
de acceso libre (farmacoterapia actualizada 2025) — su capítulo 1 es reducción del sesgo de
peso: la comunicación sin estigma es contenido nuclear, no accesorio.

---

## Qué cambió en la v2 (Palmerton v3) — resumen ejecutivo

| Vacío detectado (5-sep) | Solución implementada |
|---|---|
| 1 · "Repaso Anki" sin deck; solo 2 drills ciegos; progreso = ✓ binario | Deck `APEX::LIVIANO::<módulo>` con **216 tarjetas de MECANISMO** (10-15/semana) generadas del campo `estudio` + CSV importable · **pre-test ciego 5Q cada lunes** sobre la semana D-7 · **drills de cifras ancla** D37 (lun 2-nov) · D58 (mar 1-dic) · D76 (lun 28-dic) · D87 (jue 14-ene) · el ✓ pasa a **SCORE** (% ciego + rúbrica) persistido en `jmd-liviano-score` |
| 2 · 16 viernes con 6 viñetas repetidas, sin datos ni rúbrica | **`LIV_CASOS`: 16 casos únicos** con progresión por competencia, datos clínicos, red flags, 3 decisiones esperadas, frase de cierre y **rúbrica 0-2 × 4** |
| 3 · Sin generador; JSON de 85 KB a mano | `gen_liviano_plan.js <fecha>` (L-V, feriados fuera, casos en viernes reales, pre-tests en lunes); `liviano_reslot_viernes.js` delega en el generador (remap_inicio.js bloque 7/7b sigue igual) |
| 4 · 0 días sobre acceso/regulación en Perú; pendientes rojos sin dueño | **Módulo 7 · Acceso en Perú** (6 días: D39-D40 · D42-D44 · D46-caso) con tarea de verificación anti-alucinación → tabla `LIVIANO_ACCESO_PERU` · 2 filas fijas `LIVIANO_REVISION_TRIMESTRAL` (**D45 jue 12-nov** y **D90 mar 19-ene**) · pendientes rojos con dueño, día y salida |
| 5 · Sin protocolo clínico; la Academia terminaba sin entregable | Cada "Síntesis de módulo" produce UNA sección del **protocolo clínico** (capstone **D89 lun 18-ene**) → `DATA/BUSINESS/LIVIANO_PROTOCOLO_CLINICO_v1.md` + `LIVIANO_PROTOCOLO` en la app |
| 9 · 18 KPIs constantes sin captura | **`LivianoKpiLog`** semanal (semana ISO: leads · consultas · altas · MRR · churn · COGS) con semáforo contra meta, regla "< 80 % dos semanas → ajustar", persistido en `jmd-liviano-kpi` + export JSON |

**Redistribución de días** (90 en total, sin tocar la franja; recuento REAL de `LIV_DIAS` v5.9):
FISIOLOGÍA 20 (16 + 4 casos) · GLP-1 20 (15 + 5 casos) · **ACCESO PERÚ 6 (5 + 1 caso)** · NUTRICIÓN 12
(10 + 2 casos) · EJERCICIO 9 (8 + 1 caso) · FARMACO+QX 9 (7 + 2 casos) · CONDUCTA 9 · SÍNTESIS 5
(4 + 1 caso integral). El Módulo 7 sustituye 2 días de síntesis genérica y 3 días de
FARMACO+QX de menor valor (fármacos sin registro verificado en Perú se estudian en 2 días, no en 5).

---

## Módulo 1 · Fisiología del peso (20 días: D1-D19 + D21 · vie 11-sep → vie 9-oct · empezar aquí, a fondo)

**Temas**: la obesidad como disfunción del sistema de homeostasis energética (no acumulación
pasiva) · el cerebro "defiende" un nivel de adiposidad (set point elevado) · leptina y
resistencia leptínica · circuito arcuato AgRP (hambre) vs POMC/α-MSH (saciedad) · señales
intestinales (grelina orexigénica; GLP-1/PYY/CCK saciantes vía tronco encefálico) ·
**adaptación metabólica** tras perder peso (menor gasto + más hambre, persiste años) — el
argumento científico del tratamiento crónico.

**Fuentes**: [Endocrine Society Scientific Statement (Schwartz 2017)](https://pmc.ncbi.nlm.nih.gov/articles/PMC5546881/) ·
[Obesity Algorithm 2026 — OMA](https://obesitymedicine.org/obesity-algorithm/) ·
[Obesity Canada — Guidelines](https://obesitycanada.ca/guidelines/)

**Cómo explicárselo al paciente**: "Tu cuerpo tiene un **termostato del peso**. Cuando bajas
de peso a pura dieta, el termostato no se resetea: baja tu gasto y sube tu hambre para volver
al peso anterior. No es falta de voluntad — es biología. Por eso el tratamiento es crónico,
como la hipertensión."

**Método de estudio**: estilo Palmerton — tarjetas Anki de MECANISMO (¿por qué sube la grelina
tras la dieta?, ¿por qué persiste la adaptación metabólica?), no datos sueltos.

**Produce para el protocolo**: §1 Fundamento (**Síntesis D19 = mié 7-oct-2026**). Casos de viernes 1-4 (mecanismo sin culpa).

## Módulo 2 · GLP-1 y tirzepatida (20 días: D20 · D22-D38 · D41 · D66 · jue 8-oct → vie 11-dic · la evidencia, con cifras ancla)

**Cifras ancla verificadas (memorizarlas para consulta y contenido)**:
- **STEP 1** (semaglutida 2.4 mg): **−14,9%** vs −2,4% placebo a 68 semanas.
- Al suspender: se recupera **~67% del peso en 1 año** → base de la cronicidad.
- **SELECT**: −~20% de eventos cardiovasculares mayores en obesidad+ECV sin diabetes.
- **SURMOUNT-1** (tirzepatida, dual GIP/GLP-1): −15% / −19,5% / **−20,9%** (5/10/15 mg) vs −3,1%; **94% de reducción de progresión a diabetes** en prediabetes.
- **SURMOUNT-5** (cabeza a cabeza): tirzepatida ~20% > semaglutida ~14%.

**Efectos adversos y seguridad**: GI dominantes (náusea, vómito, estreñimiento) → escalada
lenta como manejo · colelitiasis · pancreatitis rara · gastroparesia rara · contraindicación
MEN2/carcinoma medular de tiroides · **pérdida de masa magra → exige proteína + fuerza**
(conexión directa con módulos 3-4).

**Novedades 2026**: semaglutida oral (Wegovy tabletas, FDA dic-2025) · orforglipron (GLP-1 oral
no peptídico, FDA abr-2026, ~8% en diabéticos ACHIEVE-1, GI 44-70%) · pipeline: retatrutide,
CagriSema · **genéricos de semaglutida en Brasil/India desde mar-2026** → el costo en Perú va a
cambiar rápido; revisión trimestral de farmacoterapia obligatoria para LIVIANO (ahora con dos
filas FIJAS en el plan: **D45 = mié 11-nov-2026** y **D90 = lun 18-ene-2027**).

**Fuentes**: [Semaglutide (STEP 1, SELECT, oral)](https://en.wikipedia.org/wiki/Semaglutide) ·
[Tirzepatide (SURMOUNT)](https://en.wikipedia.org/wiki/Tirzepatide) ·
[Orforglipron](https://en.wikipedia.org/wiki/Orforglipron)

**Cómo explicárselo al paciente**: "Este medicamento **baja el volumen del ruido de comida**:
la comida deja de gritarte. Copia una hormona que tu intestino ya produce cuando comes, y le
dice a tu cerebro 'ya estamos satisfechos'. Si lo suspendes sin cambiar nada más, el termostato
sigue donde estaba — por eso lo acompañamos de proteína, fuerza y hábitos."

**Drill de cifras ancla (ciego)**: **D37 = lun 2-nov-2026**. **Produce para el protocolo**: §2 Elegibilidad + titulación
(**Síntesis D38 = mar 3-nov-2026**; dosis solo desde ficha técnica, si no "A VERIFICAR"). Casos 5-8 (elegir fármaco y titular).

## Módulo 7 · Acceso en Perú (6 días: D39-D40 · D42-D44 · D46 · mié 4-nov → vie 13-nov-2026 · NUEVO en v2 — tarea de verificación)

**Por qué existe**: toda la oferta (S/ 1,290/mes, margen ~57 %) descansa sobre un COGS "PENDIENTE" y
los dos pendientes rojos ("Legalidad DIGEMID", "Cotización Sterilelabs") llevaban abiertos desde
jun-2026 sin dueño ni fecha. Este módulo no enseña "datos de Perú" (no se afirman aquí): **asigna 5
días para VERIFICARLOS con regla anti-alucinación** (+ el caso 9 del viernes) y deja el resultado en
una tabla fechada.

| Día | **Fecha v5.9** | Tarea | Salida |
|---|---|---|---|
| D39 | **mié 4-nov** | Registro sanitario DIGEMID de semaglutida (inyectable y oral) y tirzepatida: ¿existen, titular, presentación, vigencia? Portal público de DIGEMID (URL A VERIFICAR), captura con fecha. Si no aparece: "SIN REGISTRO HALLADO (fecha)". | Columnas *registro* de `LIVIANO_ACCESO_PERU` |
| D40 | **jue 5-nov** | Condición de venta (con receta / receta retenida — A VERIFICAR por molécula) y flujo receta → farmacia → paciente en el CRM | Columna *condición* |
| *(D41)* | *vie 6-nov* | *(caso 8 del módulo GLP-1 — el viernes no es de Acceso)* | Rúbrica |
| D42 | **lun 9-nov** | Precio real en farmacia: 2 cotizaciones escritas y fechadas (cadena + independiente) por presentación/dosis; recalcular "medicamento 3 m = S/ 3,600" del value stack | Columna *precio farmacia* |
| D43 | **mar 10-nov** | Magistral: legalidad del preparado de molécula comercial (dictamen QF + abogado de salud, cita normativa exacta — A VERIFICAR) + 1 cotización Sterilelabs con certificado de análisis por lote → **cierra los 2 pendientes rojos** | Columna *costo LIVIANO* + KPI COGS |
| D44 | **mié 11-nov** | Cadena de frío doméstica 2–8 °C: transporte, almacenamiento, tiempo fuera de frío según ficha técnica (A VERIFICAR), excursiones; guion de 8 líneas del kit de bienvenida | Anexo A del protocolo |
| D45 | **jue 12-nov** | **REVISIÓN TRIMESTRAL I** de farmacoterapia y precios (fila fija) | `LIVIANO_REVISION_TRIMESTRAL` |
| D46 | **vie 13-nov** | **Caso 9**: "Lo consigo más barato en una web" (registro, condición de venta, cadena de frío) | Rúbrica |

**Regla anti-alucinación del módulo**: ninguna celda de la tabla se rellena sin fuente primaria
fechada (captura del portal DIGEMID, cotización escrita, dictamen). Ningún precio se publica sin
cotización. Nunca mercado gris. Hasta la verificación, cada celda dice `PENDIENTE DE VERIFICACIÓN`
(así está hoy en `src/lib/empresaData.ts` → `LIVIANO_ACCESO_PERU`, visible en Logística F5).

**Cómo explicárselo al paciente**: "Tu ahorro es legítimo; lo que no puedo es cuidarte con un
producto que no sé qué contiene ni a qué temperatura viajó."

**Pendientes rojos con dueño (cierre con fecha)**:
- Legalidad DIGEMID → Joseph + QF y abogado de salud (nombres A VERIFICAR) · **D39-D40 + D42-D43 (4-nov → 10-nov-2026)** · salida: columnas registro/condición con captura fechada + dictamen escrito sobre el magistral.
- Cotización Sterilelabs → Joseph · **D43 (lun 9-nov-2026)** · salida: cotización escrita y fechada → "costo LIVIANO" + KPI COGS del Cockpit.

## Módulo 3 · Nutrición (12 días: D47-D58 · lun 16-nov → mar 1-dic-2026)

**Temas**: el déficit calórico como mecanismo común · **DIETFITS**: low-fat vs low-carb no
difieren si la calidad es alta — **la adherencia predice el resultado, no el nombre de la
dieta** · ayuno intermitente = restricción continua (meta-análisis 24 RCTs, n=1.768, dif.
0,26 kg NS; adherencia >80% solo en estudios <3 meses) · **proteína 1,2-1,6 g/kg** para
saciedad y masa magra (imprescindible con GLP-1) · traducción local (plato de Huancayo) ·
contra-argumentario de mitos.

**Fuentes**: [Meta-análisis ayuno intermitente vs restricción continua](https://pmc.ncbi.nlm.nih.gov/articles/PMC10098946/) ·
[Obesity Canada — capítulo de nutrición médica](https://obesitycanada.ca/guidelines/)

**Cómo explicárselo al paciente**: "No existe LA dieta. Existe la dieta que TÚ puedes sostener.
Lo que no se negocia es la proteína: es el ladrillo que protege tu músculo mientras bajas grasa."

**Drill de cifras (ciego)**: **D58 = mar 1-dic-2026** (módulos 2-3-7; la misma sesión es Síntesis del módulo 3).
**Produce para el protocolo**: §3 política nutricional. Casos 10-11 (proteína/masa magra · adherencia).

## Módulo 4 · Ejercicio (9 días: D59-D65 · D67-D68 · mié 2-dic → mar 15-dic-2026)

**Temas**: el ejercicio solo baja poco peso (~2-3 kg) pero es **el mejor predictor de
mantenimiento** (National Weight Control Registry: ~1 h/día ≈ 2.800 kcal/sem; el umbral 200-300 min/sem
es de las guías clínicas/ACSM, no del NWCR) · **fuerza 2x/semana**
preserva masa magra durante farmacoterapia · beneficio cardiometabólico independiente del peso
("fitness vs fatness") · medir **composición corporal, no solo balanza** · prescripción en consulta
(empezar ridículamente fácil, progresar cada 2 semanas).

**Estándar LIVIANO no negociable junto a GLP-1**: proteína 1,2-1,6 g/kg + fuerza 2x/semana.

**Cómo explicárselo al paciente**: "El ejercicio no es para bajar de peso — es para **no
volver a subirlo** y para que lo que pierdas sea grasa y no músculo. La balanza no distingue;
nosotros sí."

**Produce para el protocolo**: §4 estándar proteína/fuerza + qué medir y con qué cadencia (**Síntesis D68 = mar 15-dic-2026**).
Caso 12 (estancamiento, D62 vie 4-dic).

## Módulo 6 · Farmacología no-GLP1 + cirugía (9 días: D69-D76 · D83 · mié 16-dic-2026 → vie 8-ene-2027 · límites de competencia)

**Fármacos**: fentermina · fentermina/topiramato · naltrexona/bupropión · orlistat ·
setmelanotida (obesidad monogénica) · metformina off-label. **Disponibilidad y registro en Perú:
A VERIFICAR** (filas ámbar de `LIVIANO_ACCESO_PERU`); no se prescribe lo que no tiene registro verificado.

**Cirugía — criterios ASMBS/IFSO 2022** (reemplazan NIH 1991): IMC ≥35 sin exigir
comorbilidades · IMC 30-34,9 con enfermedad metabólica refractaria · asiáticos ≥27,5 (criterio
étnico discutible en población peruana mestiza — juicio clínico) · sleeve y bypass Y-Roux:
pérdida sostenida 25-30% y remisión de diabetes. **El médico LIVIANO debe saber cuándo derivar**
— es límite de competencia y gatillo de derivación, no derrota.

**Fuentes**: [ASMBS/IFSO 2022 Guidelines](https://pmc.ncbi.nlm.nih.gov/articles/PMC9834364/) ·
[Obesity Algorithm 2026](https://obesitymedicine.org/obesity-algorithm/)

**Cómo explicárselo al paciente**: "La cirugía no es rendirse: es la herramienta más potente
que tenemos para casos concretos, con criterios claros. Si es tu caso, te acompaño antes,
durante y después."

**Drill de cifras (ciego)**: **D76 = lun 28-dic-2026** (módulos 4-6; la misma sesión es Síntesis del módulo 6).
**Produce para el protocolo**: §6 derivación y límites + escalera terapéutica. Casos 13-15 (límite de competencia
y derivación: D67 vie 11-dic · D72 vie 18-dic · D84 vie 8-ene).

## Módulo 5 · Conducta (9 días: D77-D82 · D84-D86 · mar 29-dic-2026 → mié 13-ene-2027 · se estudia al final para que el caso integral lo use)

**Temas**: marco **5As** (Ask-Assess-Advise-Agree-Assist, Obesity Canada) · entrevista
motivacional · **automonitoreo como predictor #1 de éxito** · DPP (−58% incidencia de diabetes
con estilo de vida) como evidencia de intervención conductual estructurada · lenguaje
**people-first** ("persona con obesidad") · manejo del estigma como competencia clínica
EVALUABLE del protocolo de consulta (ítem 3 de la rúbrica de todos los casos).

**Fuentes**: [Obesity Canada — 5As](https://obesitycanada.ca/guidelines/) ·
[OMA — recursos educativos](https://obesitymedicine.org/)

**Cómo explicárselo al paciente**: "Registrar lo que comes no es un castigo: es el GPS. Los
estudios muestran que la gente que se monitorea es la que llega. Y aquí nadie te va a juzgar
por el peso — vamos a tratar una condición médica, juntos."

**Produce para el protocolo**: §5 guion 5As · automonitoreo · cadencia de check-in por fase (4 sesiones/mes
en Despegue) · check-in de EA (**Síntesis D86 = mar 12-ene-2027**).

## Síntesis final (D87-D90 · jue 14-ene → mar 19-ene-2027)

- **D86 (mié 13-ene)** · Síntesis módulo 5 → sección M5 del protocolo (5As · automonitoreo · cadencia de check-in).
- **D87 (jue 14-ene)** · Repaso integral I: **drill ciego de cifras** + mecanismos de los 7 módulos.
- **D88 (vie 15-ene)** · **Caso 16 integral**: 6 meses en LIVIANO, −16 %, "¿ya puedo dejar todo?" (con la esposa
  presente). Criterio de éxito de la Academia: **se resuelve SOLO con el protocolo v1**; lo que falte es una sección que falta.
  Cierra el temario el mismo viernes: charla completa LIVIANO de 10 min grabada.
- **D89 (lun 18-ene)** · **Capstone**: ensamblaje de `LIVIANO_PROTOCOLO_CLINICO_v1.md` (§1-§6 + Anexo A) + ruta de credencial.
- **D90 (mar 19-ene)** · **REVISIÓN TRIMESTRAL II** + cierre administrativo de la Academia (fila fija).
  ⚠ **Cambio v5.9:** el caso integral vuelve a ir ANTES del capstone (v5.8 los tenía como D88 capstone → D89 caso →
  D90 trimestral). El caso 16 sigue cayendo en VIERNES —regla dura del generador— y la trimestral II sigue cerrando el plan.

---

## Sistema de medición (Palmerton: medir por % ciego, no por días tachados)

| Instrumento | Cuándo | Qué mide | Meta | Dónde se guarda |
|---|---|---|---|---|
| **Pre-test ciego 5Q** | cada LUNES desde la semana 2 (19 en total), primeros 5-7' de los 25' de estudio | 5 tarjetas de mecanismo de la semana D-7 (selección determinista, `livPretest(d)`) | ≥ 80 % | `jmd-liviano-score.pretests[d]` |
| **Drill de cifras ancla** | **D37 lun 2-nov (M2) · D58 mar 1-dic (M2-3-7) · D76 lun 28-dic (M4-6) · D87 jue 14-ene (integral)** | cifras de memoria, sin notas (`LIV_DRILLS`) | ≥ 80 % | `jmd-liviano-score.drills[d]` |
| **Caso de viernes + rúbrica** | 16 viernes reales | 4 ítems 0-2: mecanismo correcto · metáfora de paciente · people-first/sin estigma · plan pactado y medible | ≥ 6/8 por caso · media ≥ 80 % | `jmd-liviano-score.rubricas[casoId]` |
| **Score global** | panel Academia (F9) | media de % ciego y % rúbrica | ≥ 80 % | calculado |

El ✓ de `studyProgress('liviano')` se sigue escribiendo para el progreso global de la app, pero lo que
muestra el panel es el **% real** (cabecera: % ciego · rúbrica media · score). Los días de contenido sin
instrumento conservan un "marcar hecho" explícitamente etiquetado como no-medido.

**Nota sobre los días de drill (v5.9)**: el análisis original pedía D38/D58/D75; en v5.7 salieron D36/D57/D76/D87, en v5.8
D36/D58/D76/D87 y en el plan generado el 10-sep son **D37 · D58 · D76 · D87** (leídos de `LIV_DRILLS`). El generador re-numera al
re-slotear los casos a viernes reales, así que **el número de día NO es estable entre versiones — la fecha sí**.
Cambiarlos = mover `drill: true` en `liviano_curriculum.json` y regenerar.

## Banco de casos (`LIV_CASOS`, 16 únicos · progresión por competencia)

Cada caso trae: paciente, 4 datos clínicos (labs/comorbilidades reales del caso, con "A VERIFICAR" donde el
dato depende de una fuente que no está en este currículo), red flags (MEN2 · embarazo · pancreatitis ·
cardiología · psiquiatría · producto sin registro), consigna de 20 min, 3 decisiones esperadas, frase de
cierre, pistas por ítem de la rúbrica y fuente.

Los 16 casos caen **todos en VIERNES** (verificado sobre `LIV_DIAS` el 10-sep: 16/16 con `wd = Vie`, y con las MISMAS 16 fechas que en v5.8).

| # | D · **fecha v5.9** | Bloque | Caso |
|---|---|---|---|
| 1 | D6 · **vie 18-sep-2026** | mecanismo sin culpa | La que se culpa: tres dietas, tres rebotes |
| 2 | D11 · **vie 25-sep** | mecanismo sin culpa | El que come de noche: hambre hormonal vs hambre real |
| 3 | D16 · **vie 2-oct** | mecanismo sin culpa | "Quemo menos que antes": adaptación metabólica que persiste |
| 4 | D21 · **vie 9-oct** | mecanismo sin culpa | El escéptico: "es disciplina, mi hermano bajó solo" |
| 5 | D26 · **vie 16-oct** | elegir fármaco y titular | "Quiero la inyección ya": candidatura y consentimiento hablado |
| 6 | D31 · **vie 23-oct** | elegir fármaco y titular | Prediabetes con historia familiar: ¿semaglutida o tirzepatida? |
| 7 | D36 · **vie 30-oct** | elegir fármaco y titular | Semana 3 de titulación: náusea diaria y un vómito — ¿sigo? |
| 8 | D41 · **vie 6-nov** | elegir fármaco y titular | Post-infarto que "solo quiere verse mejor": SELECT y límite de competencia |
| 9 | D46 · **vie 13-nov** | EA · estancamiento · proteína (+ acceso) | "Lo consigo más barato en una web": acceso, registro y cadena de frío |
| 10 | D51 · **vie 20-nov** | EA · estancamiento · proteína | Casi sin apetito, come una vez al día: proteína y masa magra |
| 11 | D56 · **vie 27-nov** | EA · estancamiento · proteína | El fan del 16/8 y del keto que abandona a las 6 semanas |
| 12 | D61 · **vie 4-dic** | EA · estancamiento · proteína | −12 kg y estancado 3 semanas: quiere dejar todo |
| 13 | D66 · **vie 11-dic** | límite de competencia y derivación | Dolor abdominal intenso + vómitos… y está buscando embarazo |
| 14 | D71 · **vie 18-dic** | límite de competencia y derivación | No puede pagar el GLP-1 y pide "pastillas": opciones no-GLP1 y límite |
| 15 | D83 · **vie 8-ene-2027** | límite de competencia y derivación | IMC 41 con diabetes mal controlada y falla a semaglutida: "no quiero que me corten" |
| 16 | D88 · **vie 15-ene-2027** | integral con cierre de programa | 6 meses en LIVIANO, −16 %: "¿ya puedo dejar todo?" (con la esposa presente) |

> El plan tiene **17 viernes** y 16 casos: el único viernes sin caso es **D2 (vie 11-sep-2026)** — el
> primer caso necesita una semana de contenido detrás. El salto entre el caso 14 (vie 18-dic) y el 15
> (vie 8-ene) es de tres semanas porque el **25-dic y el 1-ene no son días del plan** (feriados fijos que
> el generador excluye), así que esos dos viernes no existen como día LIVIANO.

**Rúbrica (0-2 × 4)**: mecanismo correcto (encadena causa→efecto, sin cifras inventadas) · metáfora de
paciente (de la biblioteca, en ≤ 60 s, el paciente la repite) · people-first / sin estigma (valida, pide
permiso, no sermonea) · plan pactado y medible (meta elegida por el paciente + UNA métrica + fecha + criterio
de escalada/derivación). Las 3 decisiones y el cierre se revelan **después** del role-play.

## Anki de MECANISMO (deck `APEX::LIVIANO::<módulo>`)

- **216 tarjetas** generadas del campo `estudio` de cada tema (10-15 por semana; 0 en viernes de caso), en
  `LIV_ANKI_CARDS` (app: bloque "Anki del día") y en `DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv`.
- Sub-decks: `fisiologia` · `glp1` · `acceso_peru` · `nutricion` · `ejercicio` · `farmaco_qx` · `conducta` · `sintesis`.
- **Importar en Anki** (una vez, **D15 · mié 30-sep-2026** "Palmerton: 10 tarjetas…" y cada vez que se regenere): Archivo → Importar →
  `LIVIANO_mecanismo.csv` (separador tabulador, cabeceras `#deck column:3` / `#tags column:4` ya en el fichero; tipo
  Básico; permitir HTML desactivado). Etiquetas: `liviano::<modulo> dNN mecanismo`. Programador FSRS (mismo criterio
  que el resto del sistema APEX). Sin mapeo en `ankiLinks.ts` (fuera de la lista de ficheros de esta tarea — pendiente).
- Formato Palmerton: pregunta "¿por qué / cómo?" → respuesta que encadena causa → efecto → consecuencia clínica.
  Lo fallado en pre-tests y drills vuelve al deck el mismo día.

## Capstone: el protocolo clínico LIVIANO se produce dentro de la Academia (sin añadir minutos)

| Sección | Módulo → Síntesis que la redacta | **Día · fecha v5.9** | Estado 5-sep |
|---|---|---|---|
| §1 Fundamento: por qué tratamiento crónico | M1 | **D19 · mié 7-oct-2026** | borrador (desde el currículo) |
| §2 Elegibilidad + titulación | M2 | **D38 · mar 3-nov-2026** | borrador (dosis A VERIFICAR) |
| §3 Política nutricional · §4 estándar proteína/fuerza + qué medir | M3 · M4 | **D58 · mar 1-dic** · **D68 · mar 15-dic** | borrador |
| §5 5As · automonitoreo · cadencia de check-in · check-in de EA | M5 | **D86 · mié 13-ene-2027** | borrador |
| §6 Derivación y límites de competencia | M6 | **D76 · lun 28-dic-2026** | borrador |
| Anexo A · Acceso en Perú (tabla + cadena de frío + regla) | M7 | **D39-D40 · D42-D44 (4→11-nov)** + **D45 (12-nov)** + **D90 (19-ene)** | pendiente (verificación) |
| Ensamblaje v1 + ruta de credencial | Capstone | **D89 · lun 18-ene-2027** | pendiente |

Documento: `DATA/BUSINESS/LIVIANO_PROTOCOLO_CLINICO_v1.md` (esqueleto con todo lo que ya se puede afirmar desde el
currículo, con fuente; ninguna dosis sin ficha técnica). En la app: `LIVIANO_PROTOCOLO` (Logística F5 → sección
"Protocolo clínico"). **Criterio de éxito**: el caso 16 se resuelve solo con el protocolo.

## KPI log semanal (Cockpit F1)

Entrada manual por semana ISO: leads · consultas · altas · MRR · churn · COGS por paciente-mes. Semáforo contra la
meta (verde ≥ 100 % · ámbar ≥ 80 % · rojo < 80 %; churn y COGS "menos es mejor"), regla del tracker
**"< 80 % dos semanas seguidas → ajustar oferta, canal o proceso"**, historial de 8 semanas, nota semanal.
Persistido en `jmd-liviano-kpi`; botón **Exportar JSON** (descarga `liviano_kpi_<semana>.json` → archivar en
`DATA/BUSINESS/_kpi/`). Es el puente honesto hasta que el CRM exponga un endpoint read-only.

---

## Referentes fijos (suscribirse a 3, monitorear el resto)

- **OMA Podcast** (línea oficial) · **The Obesity Guide** (Matthea Rentea MD, ABOM) ·
  **Spencer Nadolsky** ("Docs Who Lift" — el mejor en comunicación simple).
- Marco de **fenotipos de obesidad de Andrés Acosta (Mayo)** — hungry brain / hungry gut:
  diferenciador comercial para personalizar LIVIANO.
- Otros: Yoni Freedhoff (Weighty Matters) · Fatima Cody Stanford (Harvard) · Peter Attia
  (The Drive, episodios GLP-1/composición corporal) · Layne Norton (nutrición por evidencia).

## Ruta de credencial

Curso **"Fundamentals of Obesity Treatment"** (OMA, ~9.75 CME) → micro-credentials OMA →
vía CME (60 créditos) hacia el examen **ABOM** ([abom.org](https://www.abom.org/) ·
[blueprint](https://www.abom.org/content-outline-and-exam-blueprint/)). Posiciona a LIVIANO
como referente con certificación internacional real. Se anota en el **capstone (D88 · jue 14-ene-2027)**.

## Pipeline de regeneración y corrimiento (cada día sin estudiar = +1 hábil)

1. Editar **solo** `DATA/BUSINESS/liviano_curriculum.json` (temas, tarjetas, casos, drills, colores).
2. `node DATA/_scripts/gen_liviano_plan.js <YYYY-MM-DD>` (v5.9: `2026-09-11`) → reescribe `livianoStudyPlan.ts`, `livianoCasos.ts` y el CSV.
   Determinista; verifica 90 filas L-V, feriados fuera, 16 casos en viernes, pre-tests en lunes.
3. Corrimiento global: `node DATA/_scripts/remap_inicio.js <fecha>` re-fecha las 90 filas (bloque 7, regex
   `"fecha":"…","wd":"…"` y `inicio/fin/totalDias: 90` de `LIV_META` — formato conservado) y llama a
   `liviano_reslot_viernes.js` (bloque 7b), que ahora **delega en el generador** con `LIV_META.inicio` → casos en
   viernes reales aunque el START no sea lunes.
4. Re-importar el CSV en Anki solo si cambiaron tarjetas (las etiquetas `dNN` se recalculan con el calendario).

## Reglas del programa

1. Biblioteca de **metáforas de paciente por módulo** (termostato, timbre, acelerador/freno, ruido de comida,
   ladrillo, GPS) — se ensayan en los 20' de aplicación y se puntúan en la rúbrica.
2. Tarjetas de mecanismo (mismo formato Palmerton del resto del sistema de estudio); recall medido en ciego.
3. Revisión **trimestral** de farmacoterapia (aprobaciones y precios se mueven rápido): filas fijas **D45
   (mié 11-nov-2026)** y **D90 (lun 18-ene-2027)**, luego cada trimestre (`LIVIANO_REVISION_TRIMESTRAL`).
4. Todo dato clínico, regulatorio o de precio que se publique en contenido LIVIANO se verifica contra la fuente
   primaria (misma regla anti-alucinación del motor de preguntas ENCAPS). Lo no verificado se escribe
   "A VERIFICAR (dd-mmm)".
5. La Academia produce entregables, no solo repaso: tabla de acceso fechada, protocolo clínico v1, KPI log con
   números reales.

---

## Índice v5.9 (10-sep-2026) — D → fecha de los 90 días

Leído de `src/lib/livianoStudyPlan.ts` → `LIV_DIAS` (parseado con node, no estimado). **D1 = vie 11-sep-2026 ·
D90 = mar 19-ene-2027 · 90 días L-V · 25-dic, 31-dic y 1-ene fuera · franja 17:15-18:00 intacta ·
0 fechas en fin de semana o feriado (verificado).**

| Módulo | Días (D) | Nº | Rango de fechas |
|---|---|---|---|
| M1 · FISIOLOGÍA | D1-D19 · D21 | 20 | vie 11-sep → vie 9-oct-2026 |
| M2 · GLP-1 | D20 · D22-D38 · D41 · D66 | 20 | jue 8-oct → vie 11-dic-2026 |
| M7 · ACCESO PERÚ | D39-D40 · D42-D44 · D46 | 6 | mié 4-nov → vie 13-nov-2026 |
| SÍNTESIS (trimestral I + cierre) | D45 · D87-D90 | 5 | jue 12-nov-2026 · jue 14-ene → mar 19-ene-2027 |
| M3 · NUTRICIÓN | D47-D58 | 12 | lun 16-nov → mar 1-dic-2026 |
| M4 · EJERCICIO | D59-D65 · D67-D68 | 9 | mié 2-dic → mar 15-dic-2026 |
| M6 · FARMACO+QX | D69-D76 · D83 | 9 | mié 16-dic-2026 → vie 8-ene-2027 |
| M5 · CONDUCTA | D77-D82 · D84-D86 | 9 | mar 29-dic-2026 → mié 13-ene-2027 |

*(Los módulos se solapan en el calendario porque el generador coloca cada caso en su VIERNES real; por eso
un día de un módulo puede caer dentro del rango de otro.)*

**Hitos v5.7 → v5.8 → v5.9** (columnas leídas de los `.ts` de cada versión; el Dn cambia porque el
generador re-sloteó los casos a viernes reales — **la fecha es lo estable, el D# no**)

| Hito | v5.7 | v5.8 | **v5.9 (vigente)** |
|---|---|---|---|
| D1 · arranque | mié 9-sep-2026 | jue 10-sep-2026 | **vie 11-sep-2026** (D1) |
| Caso 1 | vie 18-sep-2026 (D8) | vie 18-sep-2026 (D7) | **vie 18-sep-2026** (D6) *(fecha intacta)* |
| Importar el CSV de Anki | 29-sep-2026 (D16) | mié 30-sep-2026 (D15) | **jue 1-oct-2026** (D15) |
| Síntesis M1 (§1 del protocolo) | lun 5-oct-2026 (D19) | mar 6-oct-2026 (D19) | **mié 7-oct-2026** (D19) |
| Drill de cifras M2 | mié 28-oct-2026 (D36) | jue 29-oct-2026 (D36) | **lun 2-nov-2026** (D37) |
| Síntesis M2 | jue 29-oct-2026 (D37) | lun 2-nov-2026 (D38) | **mar 3-nov-2026** (D38) |
| Módulo 7 · Acceso en Perú | lun 2-nov → vie 13-nov-2026 | mar 3-nov → vie 13-nov-2026 | **mié 4-nov → vie 13-nov-2026** |
| REVISIÓN TRIMESTRAL I | mar 10-nov-2026 (D45) | mié 11-nov-2026 (D45) | **jue 12-nov-2026** (D45) |
| Drill M2-3-7 + Síntesis M3 | jue 26-nov-2026 (D57) | lun 30-nov-2026 (D58) | **mar 1-dic-2026** (D58) |
| Síntesis M4 | jue 10-dic-2026 (D67) | lun 14-dic-2026 (D68) | **mar 15-dic-2026** (D68) |
| Drill M4-6 + Síntesis M6 | mié 23-dic-2026 (D76) | jue 24-dic-2026 (D76) | **lun 28-dic-2026** (D76) |
| Síntesis M5 | lun 11-ene-2027 (D86) | mar 12-ene-2027 (D86) | **mié 13-ene-2027** (D86) |
| Repaso integral + drill final | mar 12-ene-2027 (D87) | mié 13-ene-2027 (D87) | **jue 14-ene-2027** (D87) |
| Caso 16 integral · fin del temario | vie 15-ene-2027 (D90) | vie 15-ene-2027 (D89) | **vie 15-ene-2027** (D88) *(fecha intacta)* |
| Capstone (protocolo v1) | mié 13-ene-2027 (D88) | jue 14-ene-2027 (D88) | **lun 18-ene-2027** (D89) |
| REVISIÓN TRIMESTRAL II + cierre | jue 14-ene-2027 (D89) | lun 18-ene-2027 (D90) | **mar 19-ene-2027** (D90) |
