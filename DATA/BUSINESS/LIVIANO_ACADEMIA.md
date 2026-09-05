# LIVIANO ACADEMIA — Currículo de medicina de la obesidad

> **Franja: 17:15-18:00 L-V · D1 = lun 7-sep-2026 (v5.6)** — 90 días L-V → mié 13-ene-2027 (salta 25-dic, 31-dic y 1-ene);
> bloque del Calendar v5 (serie desde 31-ago). Formato de 45 min: **25' estudio del módulo + 20'
> aplicación** (explicárselo a un paciente: metáforas, role-play, caso).
>
> **v2 · Palmerton v3 (5-sep-2026).** El plan día-a-día se GENERA: `DATA/BUSINESS/liviano_curriculum.json`
> (fuente única: módulos → temas → estudio/aplicación/fuente/min · tarjetas Anki · drills · 16 casos · rúbrica)
> → `node DATA/_scripts/gen_liviano_plan.js 2026-09-07` → `src/lib/livianoStudyPlan.ts` + `src/lib/livianoCasos.ts`
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
| 1 · "Repaso Anki" sin deck; solo 2 drills ciegos; progreso = ✓ binario | Deck `APEX::LIVIANO::<módulo>` con **216 tarjetas de MECANISMO** (10-15/semana) generadas del campo `estudio` + CSV importable · **pre-test ciego 5Q cada lunes** sobre la semana D-7 · **drills de cifras ancla** D37 · D58 · D77 · D88 · el ✓ pasa a **SCORE** (% ciego + rúbrica) persistido en `jmd-liviano-score` |
| 2 · 16 viernes con 6 viñetas repetidas, sin datos ni rúbrica | **`LIV_CASOS`: 16 casos únicos** con progresión por competencia, datos clínicos, red flags, 3 decisiones esperadas, frase de cierre y **rúbrica 0-2 × 4** |
| 3 · Sin generador; JSON de 85 KB a mano | `gen_liviano_plan.js <fecha>` (L-V, feriados fuera, casos en viernes reales, pre-tests en lunes); `liviano_reslot_viernes.js` delega en el generador (remap_inicio.js bloque 7/7b sigue igual) |
| 4 · 0 días sobre acceso/regulación en Perú; pendientes rojos sin dueño | **Módulo 7 · Acceso en Perú** (5 días, D39-D44) con tarea de verificación anti-alucinación → tabla `LIVIANO_ACCESO_PERU` · 2 filas fijas `LIVIANO_REVISION_TRIMESTRAL` (D46 y D90) · pendientes rojos con dueño, día y salida |
| 5 · Sin protocolo clínico; la Academia terminaba sin entregable | Cada "Síntesis de módulo" produce UNA sección del **protocolo clínico** (capstone D89) → `DATA/BUSINESS/LIVIANO_PROTOCOLO_CLINICO_v1.md` + `LIVIANO_PROTOCOLO` en la app |
| 9 · 18 KPIs constantes sin captura | **`LivianoKpiLog`** semanal (semana ISO: leads · consultas · altas · MRR · churn · COGS) con semáforo contra meta, regla "< 80 % dos semanas → ajustar", persistido en `jmd-liviano-kpi` + export JSON |

**Redistribución de días** (90 en total, sin tocar la franja): FISIOLOGÍA 16 + 4 casos · GLP-1 15 + 5 casos ·
**ACCESO PERÚ 5 + 1 caso** · NUTRICIÓN 10 + 2 casos · EJERCICIO 8 + 1 caso · FARMACO+QX 7 + 2 casos ·
CONDUCTA 9 · SÍNTESIS 4 + 1 caso integral. El Módulo 7 sustituye 2 días de síntesis genérica y 3 días de
FARMACO+QX de menor valor (fármacos sin registro verificado en Perú se estudian en 2 días, no en 5).

---

## Módulo 1 · Fisiología del peso (D1-D20 · empezar aquí, a fondo)

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

**Produce para el protocolo**: §1 Fundamento (Síntesis D19). Casos de viernes 1-4 (mecanismo sin culpa).

## Módulo 2 · GLP-1 y tirzepatida (D21-D38 · la evidencia, con cifras ancla)

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
filas FIJAS en el plan: D46 y D90).

**Fuentes**: [Semaglutide (STEP 1, SELECT, oral)](https://en.wikipedia.org/wiki/Semaglutide) ·
[Tirzepatide (SURMOUNT)](https://en.wikipedia.org/wiki/Tirzepatide) ·
[Orforglipron](https://en.wikipedia.org/wiki/Orforglipron)

**Cómo explicárselo al paciente**: "Este medicamento **baja el volumen del ruido de comida**:
la comida deja de gritarte. Copia una hormona que tu intestino ya produce cuando comes, y le
dice a tu cerebro 'ya estamos satisfechos'. Si lo suspendes sin cambiar nada más, el termostato
sigue donde estaba — por eso lo acompañamos de proteína, fuerza y hábitos."

**Drill de cifras ancla (ciego)**: D37. **Produce para el protocolo**: §2 Elegibilidad + titulación
(Síntesis D38; dosis solo desde ficha técnica, si no "A VERIFICAR"). Casos 5-8 (elegir fármaco y titular).

## Módulo 7 · Acceso en Perú (D39-D45 · NUEVO en v2 — tarea de verificación)

**Por qué existe**: toda la oferta (S/ 1,290/mes, margen ~57 %) descansa sobre un COGS "PENDIENTE" y
los dos pendientes rojos ("Legalidad DIGEMID", "Cotización Sterilelabs") llevaban abiertos desde
jun-2026 sin dueño ni fecha. Este módulo no enseña "datos de Perú" (no se afirman aquí): **asigna 5
días para VERIFICARLOS con regla anti-alucinación** y deja el resultado en una tabla fechada.

| Día | Fecha (v5.6) | Tarea | Salida |
|---|---|---|---|
| D39 | jue 29-oct | Registro sanitario DIGEMID de semaglutida (inyectable y oral) y tirzepatida: ¿existen, titular, presentación, vigencia? Portal público de DIGEMID (URL A VERIFICAR), captura con fecha. Si no aparece: "SIN REGISTRO HALLADO (fecha)". | Columnas *registro* de `LIVIANO_ACCESO_PERU` |
| D41 | lun 2-nov | Condición de venta (con receta / receta retenida — A VERIFICAR por molécula) y flujo receta → farmacia → paciente en el CRM | Columna *condición* |
| D42 | mar 3-nov | Precio real en farmacia: 2 cotizaciones escritas y fechadas (cadena + independiente) por presentación/dosis; recalcular "medicamento 3 m = S/ 3,600" del value stack | Columna *precio farmacia* |
| D43 | mié 4-nov | Magistral: legalidad del preparado de molécula comercial (dictamen QF + abogado de salud, cita normativa exacta — A VERIFICAR) + 1 cotización Sterilelabs con certificado de análisis por lote → **cierra los 2 pendientes rojos** | Columna *costo LIVIANO* + KPI COGS |
| D44 | jue 5-nov | Cadena de frío doméstica 2–8 °C: transporte, almacenamiento, tiempo fuera de frío según ficha técnica (A VERIFICAR), excursiones; guion de 8 líneas del kit de bienvenida | Anexo A del protocolo |
| D45 | vie 6-nov | **Caso 9**: "Lo consigo más barato en una web" (registro, condición de venta, cadena de frío) | Rúbrica |
| D46 | lun 9-nov | **REVISIÓN TRIMESTRAL I** de farmacoterapia y precios (fila fija) | `LIVIANO_REVISION_TRIMESTRAL` |

**Regla anti-alucinación del módulo**: ninguna celda de la tabla se rellena sin fuente primaria
fechada (captura del portal DIGEMID, cotización escrita, dictamen). Ningún precio se publica sin
cotización. Nunca mercado gris. Hasta la verificación, cada celda dice `PENDIENTE DE VERIFICACIÓN`
(así está hoy en `src/lib/empresaData.ts` → `LIVIANO_ACCESO_PERU`, visible en Logística F5).

**Cómo explicárselo al paciente**: "Tu ahorro es legítimo; lo que no puedo es cuidarte con un
producto que no sé qué contiene ni a qué temperatura viajó."

**Pendientes rojos con dueño (cierre con fecha)**:
- Legalidad DIGEMID → Joseph + QF y abogado de salud (nombres A VERIFICAR) · D39-D43 (29-oct → 4-nov) · salida: columnas registro/condición con captura fechada + dictamen escrito sobre el magistral.
- Cotización Sterilelabs → Joseph · D43 (4-nov) · salida: cotización escrita y fechada → "costo LIVIANO" + KPI COGS del Cockpit.

## Módulo 3 · Nutrición (D47-D58)

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

**Drill de cifras (ciego)**: D58 (módulos 2-3-7). **Produce para el protocolo**: §3 política nutricional
(Síntesis D58). Casos 10-11 (proteína/masa magra · adherencia).

## Módulo 4 · Ejercicio (D59-D68)

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

**Produce para el protocolo**: §4 estándar proteína/fuerza + qué medir y con qué cadencia (Síntesis D68).
Caso 12 (estancamiento).

## Módulo 6 · Farmacología no-GLP1 + cirugía (D69-D77 · límites de competencia)

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

**Drill de cifras (ciego)**: D77 (módulos 4-6). **Produce para el protocolo**: §6 derivación y límites +
escalera terapéutica (Síntesis D77). Casos 13-15 (límite de competencia y derivación).

## Módulo 5 · Conducta (D78-D86 · se estudia al final para que el caso integral lo use)

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
en Despegue) · check-in de EA (Síntesis D86).

## Síntesis final (D87-D90)

- **D87 (vie 8-ene)** · **Caso 16 integral**: 6 meses en LIVIANO, −16 %, "¿ya puedo dejar todo?" (con la esposa
  presente). Criterio de éxito de la Academia: **se resuelve SOLO con el protocolo v1**; lo que falte es una sección que falta.
- **D88 (lun 11-ene)** · Repaso integral: drill ciego de cifras + 20 tarjetas de mecanismo de los 7 módulos + pre-test.
- **D89 (mar 12-ene)** · **Capstone**: ensamblaje de `LIVIANO_PROTOCOLO_CLINICO_v1.md` (§1-§6 + Anexo A) + ruta de credencial.
- **D90 (mié 13-ene)** · **REVISIÓN TRIMESTRAL II** + cierre: charla completa LIVIANO de 10 min grabada.

---

## Sistema de medición (Palmerton: medir por % ciego, no por días tachados)

| Instrumento | Cuándo | Qué mide | Meta | Dónde se guarda |
|---|---|---|---|---|
| **Pre-test ciego 5Q** | cada LUNES desde la semana 2 (18 en total), primeros 5-7' de los 25' de estudio | 5 tarjetas de mecanismo de la semana D-7 (selección determinista, `livPretest(d)`) | ≥ 80 % | `jmd-liviano-score.pretests[d]` |
| **Drill de cifras ancla** | D37 (M2) · D58 (M2-3-7) · D77 (M4-6) · D88 (integral) | cifras de memoria, sin notas (`LIV_DRILLS`) | ≥ 80 % | `jmd-liviano-score.drills[d]` |
| **Caso de viernes + rúbrica** | 16 viernes reales | 4 ítems 0-2: mecanismo correcto · metáfora de paciente · people-first/sin estigma · plan pactado y medible | ≥ 6/8 por caso · media ≥ 80 % | `jmd-liviano-score.rubricas[casoId]` |
| **Score global** | panel Academia (F9) | media de % ciego y % rúbrica | ≥ 80 % | calculado |

El ✓ de `studyProgress('liviano')` se sigue escribiendo para el progreso global de la app, pero lo que
muestra el panel es el **% real** (cabecera: % ciego · rúbrica media · score). Los días de contenido sin
instrumento conservan un "marcar hecho" explícitamente etiquetado como no-medido.

**Nota sobre los días de drill**: el análisis pedía D38/D58/D75; en el plan generado son D37 (el D38 es la
Síntesis del módulo 2), D58 y D77 (el D75 es viernes = caso 15). Cambiarlos = mover `drill: true` en el JSON.

## Banco de casos (`LIV_CASOS`, 16 únicos · progresión por competencia)

Cada caso trae: paciente, 4 datos clínicos (labs/comorbilidades reales del caso, con "A VERIFICAR" donde el
dato depende de una fuente que no está en este currículo), red flags (MEN2 · embarazo · pancreatitis ·
cardiología · psiquiatría · producto sin registro), consigna de 20 min, 3 decisiones esperadas, frase de
cierre, pistas por ítem de la rúbrica y fuente.

| # | D (fecha) | Bloque | Caso |
|---|---|---|---|
| 1 | D5 (11-sep) | mecanismo sin culpa | La que se culpa: tres dietas, tres rebotes |
| 2 | D10 (18-sep) | mecanismo sin culpa | El que come de noche: hambre hormonal vs hambre real |
| 3 | D15 (25-sep) | mecanismo sin culpa | "Quemo menos que antes": adaptación metabólica que persiste |
| 4 | D20 (2-oct) | mecanismo sin culpa | El escéptico: "es disciplina, mi hermano bajó solo" |
| 5 | D25 (9-oct) | elegir fármaco y titular | "Quiero la inyección ya": candidatura y consentimiento hablado |
| 6 | D30 (16-oct) | elegir fármaco y titular | Prediabetes con historia familiar: ¿semaglutida o tirzepatida? |
| 7 | D35 (23-oct) | elegir fármaco y titular | Semana 3 de titulación: náusea diaria y un vómito — ¿sigo? |
| 8 | D40 (30-oct) | elegir fármaco y titular | Post-infarto que "solo quiere verse mejor": SELECT y límite de competencia |
| 9 | D45 (6-nov) | EA · estancamiento · proteína (+ acceso) | "Lo consigo más barato en una web": acceso, registro y cadena de frío |
| 10 | D50 (13-nov) | EA · estancamiento · proteína | Casi sin apetito, come una vez al día: proteína y masa magra |
| 11 | D55 (20-nov) | EA · estancamiento · proteína | El fan del 16/8 y del keto que abandona a las 6 semanas |
| 12 | D60 (27-nov) | EA · estancamiento · proteína | −12 kg y estancado 3 semanas: quiere dejar todo |
| 13 | D65 (4-dic) | límite de competencia y derivación | Dolor abdominal intenso + vómitos… y está buscando embarazo |
| 14 | D70 (11-dic) | límite de competencia y derivación | No puede pagar el GLP-1 y pide "pastillas": opciones no-GLP1 y límite |
| 15 | D75 (18-dic) | límite de competencia y derivación | IMC 41 con diabetes mal controlada y falla a semaglutida: "no quiero que me corten" |
| 16 | D87 (8-ene) | integral con cierre de programa | 6 meses en LIVIANO, −16 %: "¿ya puedo dejar todo?" (con la esposa presente) |

**Rúbrica (0-2 × 4)**: mecanismo correcto (encadena causa→efecto, sin cifras inventadas) · metáfora de
paciente (de la biblioteca, en ≤ 60 s, el paciente la repite) · people-first / sin estigma (valida, pide
permiso, no sermonea) · plan pactado y medible (meta elegida por el paciente + UNA métrica + fecha + criterio
de escalada/derivación). Las 3 decisiones y el cierre se revelan **después** del role-play.

## Anki de MECANISMO (deck `APEX::LIVIANO::<módulo>`)

- **216 tarjetas** generadas del campo `estudio` de cada tema (10-15 por semana; 0 en viernes de caso), en
  `LIV_ANKI_CARDS` (app: bloque "Anki del día") y en `DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv`.
- Sub-decks: `fisiologia` · `glp1` · `acceso_peru` · `nutricion` · `ejercicio` · `farmaco_qx` · `conducta` · `sintesis`.
- **Importar en Anki** (una vez, D16 "Palmerton: 10 tarjetas…" y cada vez que se regenere): Archivo → Importar →
  `LIVIANO_mecanismo.csv` (separador tabulador, cabeceras `#deck column:3` / `#tags column:4` ya en el fichero; tipo
  Básico; permitir HTML desactivado). Etiquetas: `liviano::<modulo> dNN mecanismo`. Programador FSRS (mismo criterio
  que el resto del sistema APEX). Sin mapeo en `ankiLinks.ts` (fuera de la lista de ficheros de esta tarea — pendiente).
- Formato Palmerton: pregunta "¿por qué / cómo?" → respuesta que encadena causa → efecto → consecuencia clínica.
  Lo fallado en pre-tests y drills vuelve al deck el mismo día.

## Capstone: el protocolo clínico LIVIANO se produce dentro de la Academia (sin añadir minutos)

| Sección | Módulo → Síntesis que la redacta | Día (v5.6) | Estado 5-sep |
|---|---|---|---|
| §1 Fundamento: por qué tratamiento crónico | M1 | D19 (1-oct) | borrador (desde el currículo) |
| §2 Elegibilidad + titulación | M2 | D38 (28-oct) | borrador (dosis A VERIFICAR) |
| §3 Política nutricional · §4 estándar proteína/fuerza + qué medir | M3 · M4 | D58 (25-nov) · D68 (9-dic) | borrador |
| §5 5As · automonitoreo · cadencia de check-in · check-in de EA | M5 | D86 (7-ene) | borrador |
| §6 Derivación y límites de competencia | M6 | D77 (22-dic) | borrador |
| Anexo A · Acceso en Perú (tabla + cadena de frío + regla) | M7 | D39-D44 + D46 + D90 | pendiente (verificación) |
| Ensamblaje v1 + ruta de credencial | Capstone | D89 (12-ene) | pendiente |

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
como referente con certificación internacional real. Se anota en el capstone (D89).

## Pipeline de regeneración y corrimiento (cada día sin estudiar = +1 hábil)

1. Editar **solo** `DATA/BUSINESS/liviano_curriculum.json` (temas, tarjetas, casos, drills, colores).
2. `node DATA/_scripts/gen_liviano_plan.js <YYYY-MM-DD>` → reescribe `livianoStudyPlan.ts`, `livianoCasos.ts` y el CSV.
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
3. Revisión **trimestral** de farmacoterapia (aprobaciones y precios se mueven rápido): filas fijas D46 y D90,
   luego cada trimestre (`LIVIANO_REVISION_TRIMESTRAL`).
4. Todo dato clínico, regulatorio o de precio que se publique en contenido LIVIANO se verifica contra la fuente
   primaria (misma regla anti-alucinación del motor de preguntas ENCAPS). Lo no verificado se escribe
   "A VERIFICAR (dd-mmm)".
5. La Academia produce entregables, no solo repaso: tabla de acceso fechada, protocolo clínico v1, KPI log con
   números reales.
