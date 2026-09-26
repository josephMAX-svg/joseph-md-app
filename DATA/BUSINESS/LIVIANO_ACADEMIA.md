# LIVIANO ACADEMIA — Currículo de medicina de la obesidad

> **Franja: 17:15-18:00 L-V · D1 = LUN 28-SEP-2026 (v5.16)** — 90 días L-V → **mié 3-feb-2027** (salta 25-dic, 31-dic y 1-ene);
> bloque del Calendar v5 (serie desde 31-ago). Formato de 45 min: **25' estudio del módulo + 20'
> aplicación** (explicárselo a un paciente: metáforas, role-play, caso).
>
> **v5.16 (26-sep-2026) · CORRIMIENTO RÍGIDO.** Ni el mié 23, ni el jue 24 ni el vie 25 de septiembre se estudiaron → +3 días hábiles sobre v5.15
> (decimoquinto corrimiento del ciclo 31-ago→28-sep, 20 hábiles perdidos): el plan se regeneró con
> `node DATA/_scripts/gen_liviano_plan.js 2026-09-28`. **Regla del corrimiento rígido: no se toca NINGÚN tema ni contenido — solo corren los días, y donde había un fin clavado se AMPLÍAN días en vez de perder sesiones.** Sigue teniendo
> **90 días, 16 casos y 4 drills** con el currículo entero, y el desfase se absorbe alargando
> el final (fin: vie 29-ene → **mié 3-feb-2027**). Los pre-tests siguen siendo **18** (`LIV_META.pretests`; con D1 en lunes el plan tiene 19 lunes, 28-sep → 1-feb, y el primero (D1) no tiene semana D-7 detrás → 18 pre-tests, lun 5-oct → lun 1-feb). La franja y las metas no cambian.
> ✅ **Con D1 en lunes el plan tiene exactamente 16 viernes = 16 casos** (ningún viernes se salta): caso 1 = **vie 2-oct (D5)** · … · caso 16 integral = **vie 29-ene (D87)** — las 16 FECHAS de los casos son las mismas que en v5.15, solo baja su D# en 3. Con eso el **caso 16 integral vuelve a caer ANTES del repaso integral (D88 lun 1-feb), del capstone (D89 mar 2-feb) y de la revisión trimestral II (D90 mié 3-feb)**: la inversión de v5.15 DESAPARECE y la decisión D de `DATA/PENDIENTES_JOSEPH.md` queda resuelta sola (el orden natural síntesis M5 → caso 16 → repaso → capstone → trimestral II). Los drills corren y cambian de D#: **D37 mar 17-nov · D58 mié 16-dic · D75 mié 13-ene · D88 lun 1-feb** (v5.15: D36 mié 11-nov · D57 jue 10-dic · D74 jue 7-ene · D87 mar 26-ene); la trimestral I pasa al lun 30-nov (D46). Todas las tablas de abajo usan los D y las fechas
> REALES de `src/lib/livianoStudyPlan.ts` / `livianoCasos.ts` (parseados el 26-sep, no estimados).
> *(v5.15, 22-sep: D1 mié 23-sep → vie 29-ene; 17 viernes con el vie 25-sep = D3 sin caso, caso 1 = D8 vie 2-oct, caso 16 = D90 vie 29-ene DESPUÉS del repaso D87, del capstone D88 y de la trimestral II D89 — inversión ABIERTA; drills D36 · D57 · D74 · D87; 18 pre-tests. Texto original de v5.15:)* Ni el lun 21 ni el mar 22 de septiembre se estudiaron → +2 días hábiles sobre v5.14
> (decimocuarto corrimiento del ciclo 31-ago→23-sep, 17 hábiles perdidos): el plan se regeneró con
> `node DATA/_scripts/gen_liviano_plan.js 2026-09-23`. **Regla del corrimiento rígido: no se toca NINGÚN tema ni contenido — solo corren los días, y donde había un fin clavado se AMPLÍAN días en vez de perder sesiones.** Sigue teniendo
> **90 días, 16 casos y 4 drills** con el currículo entero, y el desfase se absorbe alargando
> el final (fin: mié 27-ene → **vie 29-ene-2027**). Los pre-tests siguen siendo **18** (`LIV_META.pretests`; todos los lunes del plan: con D1 en miércoles hay 18 lunes, 28-sep → 25-ene, y el primero ya tiene semana D-7 detrás — los 3 días D1-D3). La franja y las metas no cambian.
> ⚠ **Los 16 casos corren una semana** respecto a v5.12-v5.14: el plan vuelve a tener **17 viernes** (25-sep → 29-ene) y el generador salta el primero (**vie 25-sep = D3, sin caso**), así que caso 1 = **vie 2-oct (D8)** · … · caso 16 integral = **vie 29-ene (D90)**. Con eso el **caso 16 integral vuelve a caer DESPUÉS del repaso integral (D87 mar 26-ene), del capstone (D88 mié 27-ene) y de la revisión trimestral II (D89 jue 28-ene)**: la inversión reaparece y la decisión D de `DATA/PENDIENTES_JOSEPH.md` vuelve a quedar **ABIERTA** (aceptarla o intercambiar a mano D88 ↔ D90 — la decide Joseph, no Claude). Los drills corren y cambian de D#: **D36 mié 11-nov · D57 jue 10-dic · D74 jue 7-ene · D87 mar 26-ene** (v5.14: D37 mar 10-nov · D58 mié 9-dic · D75 mié 6-ene · D88 lun 25-ene); la trimestral I pasa al mar 24-nov (D45). Todas las tablas de abajo usan los D y las fechas
> REALES de `src/lib/livianoStudyPlan.ts` / `livianoCasos.ts` (parseados el 22-sep, no estimados).
> *(v5.14, 19-sep: D1 lun 21-sep → mié 27-ene; 16 viernes = 16 casos, caso 1 = D5 vie 25-sep, caso 16 = D87 vie 22-ene ANTES del repaso D88, del capstone D89 y de la trimestral II D90; drills D37 · D58 · D75 · D88; 18 pre-tests.)*
> *(v5.13, 16-sep: D1 jue 17-sep → lun 25-ene; 17 viernes con el vie 18-sep = D2 sin caso, caso 1 = D7 vie 25-sep, caso 16 = D89 vie 22-ene DESPUÉS del capstone D88 y ANTES de la trimestral II D90; drills D36 · D58 · D75 · D87; 19 pre-tests.)*
> *(v5.12, 15-sep: D1 mié 16-sep → vie 22-ene; 17 viernes, caso 1 = D8 vie 25-sep, caso 16 = D90 vie 22-ene detrás del capstone D88 y la trimestral II D89; drills D36 · D57 · D75 · D87; 18 pre-tests.)*
> *(v5.11, 14-sep: D1 mar 15-sep → jue 21-ene; 16 viernes = 16 casos, caso 1 = D4 vie 18-sep, caso 16 = D86 vie 15-ene; drills D37 · D58 · D76 · D88; Síntesis M5 D87 detrás del caso 16 → repaso D88 → capstone D89 → trimestral II D90.)*
> *(v5.10, 12-sep: D1 lun 14-sep → mié 20-ene; caso 1 = D5; drills D37 mar 3-nov · D58 mié 2-dic · D76 mar 29-dic · D88 lun 18-ene.)*
>
> **v2 · Palmerton v3 (5-sep-2026).** El plan día-a-día se GENERA: `DATA/BUSINESS/liviano_curriculum.json`
> (fuente única: módulos → temas → estudio/aplicación/fuente/min · tarjetas Anki · drills · 16 casos · rúbrica)
> → `node DATA/_scripts/gen_liviano_plan.js 2026-09-28` (v5.16) → `src/lib/livianoStudyPlan.ts` + `src/lib/livianoCasos.ts`
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
| 1 · "Repaso Anki" sin deck; solo 2 drills ciegos; progreso = ✓ binario | Deck `APEX::LIVIANO::<módulo>` con **216 tarjetas de MECANISMO** (10-15/semana) generadas del campo `estudio` + CSV importable · **pre-test ciego 5Q cada lunes** sobre la semana D-7 · **drills de cifras ancla** D37 (mar 17-nov) · D58 (mié 16-dic) · D75 (mié 13-ene) · D88 (lun 1-feb) (v5.16) · el ✓ pasa a **SCORE** (% ciego + rúbrica) persistido en `jmd-liviano-score` |
| 2 · 16 viernes con 6 viñetas repetidas, sin datos ni rúbrica | **`LIV_CASOS`: 16 casos únicos** con progresión por competencia, datos clínicos, red flags, 3 decisiones esperadas, frase de cierre y **rúbrica 0-2 × 4** |
| 3 · Sin generador; JSON de 85 KB a mano | `gen_liviano_plan.js <fecha>` (L-V, feriados fuera, casos en viernes reales, pre-tests en lunes); `liviano_reslot_viernes.js` delega en el generador (remap_inicio.js bloque 7/7b sigue igual) |
| 4 · 0 días sobre acceso/regulación en Perú; pendientes rojos sin dueño | **Módulo 7 · Acceso en Perú** (6 días: D39 · D41-D44 · D45-caso) con tarea de verificación anti-alucinación → tabla `LIVIANO_ACCESO_PERU` · 2 filas fijas `LIVIANO_REVISION_TRIMESTRAL` (**D46 lun 30-nov** y **D90 mié 3-feb**, v5.16) · pendientes rojos con dueño, día y salida |
| 5 · Sin protocolo clínico; la Academia terminaba sin entregable | Cada "Síntesis de módulo" produce UNA sección del **protocolo clínico** (capstone **D89 mar 2-feb**, v5.16) → `DATA/BUSINESS/LIVIANO_PROTOCOLO_CLINICO_v1.md` + `LIVIANO_PROTOCOLO` en la app |
| 9 · 18 KPIs constantes sin captura | **`LivianoKpiLog`** semanal (semana ISO: leads · consultas · altas · MRR · churn · COGS) con semáforo contra meta, regla "< 80 % dos semanas → ajustar", persistido en `jmd-liviano-kpi` + export JSON |

**Redistribución de días** (90 en total, sin tocar la franja; recuento REAL de `LIV_DIAS` v5.16, idéntico al de v5.9-v5.15):
FISIOLOGÍA 20 (16 + 4 casos) · GLP-1 20 (15 + 5 casos) · **ACCESO PERÚ 6 (5 + 1 caso)** · NUTRICIÓN 12
(10 + 2 casos) · EJERCICIO 9 (8 + 1 caso) · FARMACO+QX 9 (7 + 2 casos) · CONDUCTA 9 · SÍNTESIS 5
(4 + 1 caso integral). El Módulo 7 sustituye 2 días de síntesis genérica y 3 días de
FARMACO+QX de menor valor (fármacos sin registro verificado en Perú se estudian en 2 días, no en 5).

---

## Módulo 1 · Fisiología del peso (20 días: D1-D20 · lun 28-sep → vie 23-oct-2026 · empezar aquí, a fondo)

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

**Produce para el protocolo**: §1 Fundamento (**Síntesis D19 = jue 22-oct-2026**; v5.15: lun 19-oct). Casos de viernes 1-4 (mecanismo sin culpa; mismas fechas que v5.15: vie 2-oct · 9-oct · 16-oct · 23-oct = D5 · D10 · D15 · D20).

## Módulo 2 · GLP-1 y tirzepatida (20 días: D21-D38 · D40 · D72 · lun 26-oct-2026 → vie 8-ene-2027 · la evidencia, con cifras ancla)

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
filas FIJAS en el plan: **D46 = lun 30-nov-2026** y **D90 = mié 3-feb-2027**; v5.15: D45 mar 24-nov · D89 jue 28-ene).

**Fuentes**: [Semaglutide (STEP 1, SELECT, oral)](https://en.wikipedia.org/wiki/Semaglutide) ·
[Tirzepatide (SURMOUNT)](https://en.wikipedia.org/wiki/Tirzepatide) ·
[Orforglipron](https://en.wikipedia.org/wiki/Orforglipron)

**Cómo explicárselo al paciente**: "Este medicamento **baja el volumen del ruido de comida**:
la comida deja de gritarte. Copia una hormona que tu intestino ya produce cuando comes, y le
dice a tu cerebro 'ya estamos satisfechos'. Si lo suspendes sin cambiar nada más, el termostato
sigue donde estaba — por eso lo acompañamos de proteína, fuerza y hábitos."

**Drill de cifras ancla (ciego)**: **D37 = mar 17-nov-2026** (v5.15: D36 mié 11-nov). **Produce para el protocolo**: §2 Elegibilidad + titulación
(**Síntesis D38 = mié 18-nov-2026**; v5.15: D37 jue 12-nov; dosis solo desde ficha técnica, si no "A VERIFICAR"). Casos 5-8 (elegir fármaco y titular: D25 vie 30-oct · D30 vie 6-nov · D35 vie 13-nov · D40 vie 20-nov).

## Módulo 7 · Acceso en Perú (6 días: D39 · D41-D44 · D45 · jue 19-nov → jue 26-nov-2026 + caso 9 el vie 27-nov · NUEVO en v2 — tarea de verificación)

**Por qué existe**: toda la oferta (S/ 1,290/mes, margen ~57 %) descansa sobre un COGS "PENDIENTE" y
los dos pendientes rojos ("Legalidad DIGEMID", "Cotización Sterilelabs") llevaban abiertos desde
jun-2026 sin dueño ni fecha. Este módulo no enseña "datos de Perú" (no se afirman aquí): **asigna 5
días para VERIFICARLOS con regla anti-alucinación** (+ el caso 9 del viernes) y deja el resultado en
una tabla fechada.

| Día | **Fecha v5.16** (v5.15: D39-D42 lun 16 → jue 19-nov · D44 lun 23-nov · D45 mar 24-nov · D48 vie 27-nov) | Tarea | Salida |
|---|---|---|---|
| D39 | **jue 19-nov** | Registro sanitario DIGEMID de semaglutida (inyectable y oral) y tirzepatida: ¿existen, titular, presentación, vigencia? Portal público de DIGEMID (URL A VERIFICAR), captura con fecha. Si no aparece: "SIN REGISTRO HALLADO (fecha)". | Columnas *registro* de `LIVIANO_ACCESO_PERU` |
| D41 | **lun 23-nov** | Condición de venta (con receta / receta retenida — A VERIFICAR por molécula) y flujo receta → farmacia → paciente en el CRM | Columna *condición* |
| D42 | **mar 24-nov** | Precio real en farmacia: 2 cotizaciones escritas y fechadas (cadena + independiente) por presentación/dosis; recalcular "medicamento 3 m = S/ 3,600" del value stack | Columna *precio farmacia* |
| D43 | **mié 25-nov** | Magistral: legalidad del preparado de molécula comercial (dictamen QF + abogado de salud, cita normativa exacta — A VERIFICAR) + 1 cotización Sterilelabs con certificado de análisis por lote → **cierra los 2 pendientes rojos** | Columna *costo LIVIANO* + KPI COGS |
| D44 | **jue 26-nov** | Cadena de frío doméstica 2–8 °C: transporte, almacenamiento, tiempo fuera de frío según ficha técnica (A VERIFICAR), excursiones; guion de 8 líneas del kit de bienvenida | Anexo A del protocolo |
| D45 | **vie 27-nov** (el vie 20-nov = D40 es el caso 8) | **Caso 9**: "Lo consigo más barato en una web" (registro, condición de venta, cadena de frío) | Rúbrica |
| D46 | **lun 30-nov** (módulo SÍNTESIS) | **REVISIÓN TRIMESTRAL I** de farmacoterapia y precios (fila fija) | `LIVIANO_REVISION_TRIMESTRAL` |

**Regla anti-alucinación del módulo**: ninguna celda de la tabla se rellena sin fuente primaria
fechada (captura del portal DIGEMID, cotización escrita, dictamen). Ningún precio se publica sin
cotización. Nunca mercado gris. Hasta la verificación, cada celda dice `PENDIENTE DE VERIFICACIÓN`
(así está hoy en `src/lib/empresaData.ts` → `LIVIANO_ACCESO_PERU`, visible en Logística F5).

**Cómo explicárselo al paciente**: "Tu ahorro es legítimo; lo que no puedo es cuidarte con un
producto que no sé qué contiene ni a qué temperatura viajó."

**Pendientes rojos con dueño (cierre con fecha)**:
- Legalidad DIGEMID → Joseph + QF y abogado de salud (nombres A VERIFICAR) · **D39 · D41-D43 (jue 19-nov · lun 23-nov → mié 25-nov-2026)** · salida: columnas registro/condición con captura fechada + dictamen escrito sobre el magistral.
- Cotización Sterilelabs → Joseph · **D43 (mié 25-nov-2026)** · salida: cotización escrita y fechada → "costo LIVIANO" + KPI COGS del Cockpit.

## Módulo 3 · Nutrición (12 días: D46-D47 · D49-D58 · mié 25-nov → vie 11-dic-2026)

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

**Drill de cifras (ciego)**: **D58 = mié 16-dic-2026** (módulos 2-3-7; la misma sesión es Síntesis del módulo 3; v5.15: D57 jue 10-dic).
**Produce para el protocolo**: §3 política nutricional. Casos 10-11 (proteína/masa magra · adherencia).

## Módulo 4 · Ejercicio (9 días: D59-D67 · jue 17-dic → mié 30-dic-2026)

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

**Produce para el protocolo**: §4 estándar proteína/fuerza + qué medir y con qué cadencia (**Síntesis D67 = mié 30-dic-2026**; v5.15: jue 24-dic).
Caso 12 (estancamiento, D60 vie 18-dic; v5.16).

## Módulo 6 · Farmacología no-GLP1 + cirugía (9 días: D68-D71 · D73-D75 · D77 · D82 · lun 4-ene → vie 22-ene-2027 · límites de competencia)

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

**Drill de cifras (ciego)**: **D75 = mié 13-ene-2027** (módulos 4-6; la misma sesión es Síntesis del módulo 6; v5.15: D74 jue 7-ene).
**Produce para el protocolo**: §6 derivación y límites + escalera terapéutica. Casos 13-15 (límite de competencia
y derivación: D72 vie 8-ene · D77 vie 15-ene · D82 vie 22-ene).

## Módulo 5 · Conducta (9 días: D76 · D78-D81 · D83-D86 · jue 14-ene → jue 28-ene-2027 · se estudia al final para que el caso integral lo use)

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
en Despegue) · check-in de EA (**Síntesis D86 = jue 28-ene-2027**; en v5.16 vuelve a ser la víspera del caso 16 integral, vie 29-ene = D87; v5.15: lun 25-ene, con repaso, capstone y trimestral II entre medio).

## Síntesis final (D86-D90 · jue 28-ene → mié 3-feb-2027)

- **D86 (jue 28-ene)** · Síntesis módulo 5 → sección M5 del protocolo (5As · automonitoreo · cadencia de check-in).
- **D87 (vie 29-ene)** · **Caso 16 integral**: 6 meses en LIVIANO, −16 %, "¿ya puedo dejar todo?" (con la esposa
  presente). Criterio de éxito de la Academia: **se resuelve SOLO con el protocolo v1**; lo que falte es una sección que falta.
  Cierra el temario ese viernes (= día del Free 120 del Step 1, D87): charla completa LIVIANO de 10 min grabada.
- **D88 (lun 1-feb)** · Repaso integral I: **drill ciego de cifras** + mecanismos de los 7 módulos.
- **D89 (mar 2-feb)** · **Capstone**: ensamblaje de `LIVIANO_PROTOCOLO_CLINICO_v1.md` (§1-§6 + Anexo A) + ruta de credencial.
- **D90 (mié 3-feb)** · **REVISIÓN TRIMESTRAL II** + cierre administrativo de la Academia (fila fija) — cierra el plan (= D90 del Step 1, semana de banco intensivo; la Academia termina 6 hábiles antes del examen del jue 11-feb).
  ✅ **Cambio v5.15 → v5.16 (la inversión desaparece):** con D1 en lunes el plan tiene 16 viernes = 16 casos (ningún viernes se salta), así que el caso 16 integral se queda en el **vie 29-ene** pero baja a D87 y el contenido de cierre queda DETRÁS: **D86 Síntesis M5 (jue 28-ene) → D87 caso 16 (vie 29-ene) → D88 repaso (lun 1-feb) → D89 capstone (mar 2-feb) → D90 trimestral II (mié 3-feb)**. La decisión D de `DATA/PENDIENTES_JOSEPH.md` queda resuelta sola (orden natural, sin intercambio manual). *(v5.15: D86 Síntesis M5 lun 25-ene → D87 repaso mar 26-ene → D88 capstone mié 27-ene → D89 trimestral II jue 28-ene → D90 caso 16 vie 29-ene — inversión ABIERTA.)* Secuencia por versión: v5.9 D87 repaso → D88 caso → D89 capstone; v5.10 D87 caso → D88 repaso → D89 capstone → D90 trimestral; v5.11 D86 caso (vie 15-ene) → D87 Síntesis M5 → D88 repaso → D89 capstone → D90 trimestral (jue 21-ene); v5.12: D86 Síntesis M5 (lun 18-ene) → D87 repaso → D88 capstone → D89 trimestral II → D90 caso 16 (vie 22-ene); v5.13: D86 Síntesis M5 (mar 19-ene) → D87 repaso → D88 capstone (jue 21-ene) → D89 caso 16 (vie 22-ene) → D90 trimestral II (lun 25-ene); v5.14: D86 Síntesis M5 (jue 21-ene) → D87 caso 16 (vie 22-ene) → D88 repaso → D89 capstone (mar 26-ene) → D90 trimestral II (mié 27-ene). El caso sigue cayendo en VIERNES (regla dura del generador).

---

## Sistema de medición (Palmerton: medir por % ciego, no por días tachados)

| Instrumento | Cuándo | Qué mide | Meta | Dónde se guarda |
|---|---|---|---|---|
| **Pre-test ciego 5Q** | cada LUNES (18 en total en v5.16: el plan arranca en lunes y tiene 19 lunes, 28-sep → 1-feb; el primero (D1) no tiene semana D-7 detrás → 18, lun 5-oct → lun 1-feb; en v5.15 eran 18 de 18 lunes, en v5.14 18 de 19, en v5.13 19, en v5.11 y v5.12 18), primeros 5-7' de los 25' de estudio | 5 tarjetas de mecanismo de la semana D-7 (selección determinista, `livPretest(d)`) | ≥ 80 % | `jmd-liviano-score.pretests[d]` |
| **Drill de cifras ancla** | **D37 mar 17-nov (M2) · D58 mié 16-dic (M2-3-7) · D75 mié 13-ene (M4-6) · D88 lun 1-feb (integral)** (v5.16; v5.15: D36 · D57 · D74 · D87) | cifras de memoria, sin notas (`LIV_DRILLS`) | ≥ 80 % | `jmd-liviano-score.drills[d]` |
| **Caso de viernes + rúbrica** | los 16 viernes del plan (v5.16: 16 viernes = 16 casos; en v5.15 eran 16 de 17, con el vie 25-sep sin caso) | 4 ítems 0-2: mecanismo correcto · metáfora de paciente · people-first/sin estigma · plan pactado y medible | ≥ 6/8 por caso · media ≥ 80 % | `jmd-liviano-score.rubricas[casoId]` |
| **Score global** | panel Academia (F9) | media de % ciego y % rúbrica | ≥ 80 % | calculado |

El ✓ de `studyProgress('liviano')` se sigue escribiendo para el progreso global de la app, pero lo que
muestra el panel es el **% real** (cabecera: % ciego · rúbrica media · score). Los días de contenido sin
instrumento conservan un "marcar hecho" explícitamente etiquetado como no-medido.

**Nota sobre los días de drill (v5.10)**: el análisis original pedía D38/D58/D75; en v5.7 salieron D36/D57/D76/D87, en v5.8
D36/D58/D76/D87, en v5.9 D37/D58/D76/D87, en los planes generados el 12-sep (v5.10) y el 14-sep (v5.11) D37 · D58 · D76 · D88, en el generado el 15-sep (v5.12) D36 · D57 · D75 · D87 (mié 4-nov · jue 3-dic · mié 30-dic · mar 19-ene) y en el generado el 16-sep (v5.13) son **D36 · D58 · D75 · D87** (leídos de `LIV_DRILLS`: jue 5-nov · lun 7-dic · lun 4-ene · mié 20-ene — un hábil después que en v5.12; D58 y D75 coinciden por fin con el análisis original), en el generado el 19-sep (v5.14) **D37 · D58 · D75 · D88** (mar 10-nov · mié 9-dic · mié 6-ene · lun 25-ene) y en el generado el 22-sep (v5.15) son **D36 · D57 · D74 · D87** (leídos de `LIV_DRILLS`: mié 11-nov · jue 10-dic · jue 7-ene · mar 26-ene — los D# bajan uno porque el generador vuelve a saltar el primer viernes; el drill M2 sigue siendo la víspera de la Síntesis M2, ahora D37 jue 12-nov). El generador re-numera al
re-slotear los casos a viernes reales, así que **el número de día NO es estable entre versiones — la fecha sí**.
Cambiarlos = mover `drill: true` en `liviano_curriculum.json` y regenerar.

## Banco de casos (`LIV_CASOS`, 16 únicos · progresión por competencia)

Cada caso trae: paciente, 4 datos clínicos (labs/comorbilidades reales del caso, con "A VERIFICAR" donde el
dato depende de una fuente que no está en este currículo), red flags (MEN2 · embarazo · pancreatitis ·
cardiología · psiquiatría · producto sin registro), consigna de 20 min, 3 decisiones esperadas, frase de
cierre, pistas por ítem de la rúbrica y fuente.

Los 16 casos caen **todos en VIERNES** (verificado sobre `LIV_DIAS` el 26-sep: 16/16 con `wd = Vie`). ✅ En v5.16 las 16 FECHAS son las mismas que en v5.15 (el plan tiene exactamente **16 viernes, 2-oct → 29-ene**, y con D1 en lunes ninguno se salta), pero cada caso baja 3 D#: el caso 1 es el D5 (vie 2-oct) y el caso 16 el D87 (vie 29-ene).

| # | D · **fecha v5.16** (= fecha v5.15; D# − 3) | Bloque | Caso |
|---|---|---|---|
| 1 | D5 · **vie 2-oct-2026** | mecanismo sin culpa | La que se culpa: tres dietas, tres rebotes |
| 2 | D10 · **vie 9-oct** | mecanismo sin culpa | El que come de noche: hambre hormonal vs hambre real |
| 3 | D15 · **vie 16-oct** | mecanismo sin culpa | "Quemo menos que antes": adaptación metabólica que persiste |
| 4 | D20 · **vie 23-oct** | mecanismo sin culpa | El escéptico: "es disciplina, mi hermano bajó solo" |
| 5 | D25 · **vie 30-oct** | elegir fármaco y titular | "Quiero la inyección ya": candidatura y consentimiento hablado |
| 6 | D30 · **vie 6-nov** | elegir fármaco y titular | Prediabetes con historia familiar: ¿semaglutida o tirzepatida? |
| 7 | D35 · **vie 13-nov** | elegir fármaco y titular | Semana 3 de titulación: náusea diaria y un vómito — ¿sigo? |
| 8 | D40 · **vie 20-nov** | elegir fármaco y titular | Post-infarto que "solo quiere verse mejor": SELECT y límite de competencia |
| 9 | D45 · **vie 27-nov** | EA · estancamiento · proteína (+ acceso) | "Lo consigo más barato en una web": acceso, registro y cadena de frío |
| 10 | D50 · **vie 4-dic** | EA · estancamiento · proteína | Casi sin apetito, come una vez al día: proteína y masa magra |
| 11 | D55 · **vie 11-dic** | EA · estancamiento · proteína | El fan del 16/8 y del keto que abandona a las 6 semanas |
| 12 | D60 · **vie 18-dic** | EA · estancamiento · proteína | −12 kg y estancado 3 semanas: quiere dejar todo |
| 13 | D72 · **vie 8-ene-2027** | límite de competencia y derivación | Dolor abdominal intenso + vómitos… y está buscando embarazo |
| 14 | D77 · **vie 15-ene-2027** | límite de competencia y derivación | No puede pagar el GLP-1 y pide "pastillas": opciones no-GLP1 y límite |
| 15 | D82 · **vie 22-ene-2027** | límite de competencia y derivación | IMC 41 con diabetes mal controlada y falla a semaglutida: "no quiero que me corten" |
| 16 | D87 · **vie 29-ene-2027** | integral con cierre de programa | 6 meses en LIVIANO, −16 %: "¿ya puedo dejar todo?" (con la esposa presente) |

> El plan tiene **16 viernes** y 16 casos (v5.16: con D1 en lunes no se salta ninguno — igual que en v5.14; en v5.15 eran 17 viernes con el vie 25-sep = D3 sin caso). El primer caso llega tras cuatro días de contenido (D1-D4, lun 28-sep → jue 1-oct; caso 1 = D5 vie 2-oct). El salto entre el caso 12 (vie 18-dic) y el 13
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
- **Importar en Anki** (una vez, **D16 · lun 19-oct-2026** (v5.16; v5.15: D15 mar 13-oct) "Palmerton: 10 tarjetas…" y cada vez que se regenere): Archivo → Importar →
  `LIVIANO_mecanismo.csv` (separador tabulador, cabeceras `#deck column:3` / `#tags column:4` ya en el fichero; tipo
  Básico; permitir HTML desactivado). Etiquetas: `liviano::<modulo> dNN mecanismo`. Programador FSRS (mismo criterio
  que el resto del sistema APEX). Sin mapeo en `ankiLinks.ts` (fuera de la lista de ficheros de esta tarea — pendiente).
- Formato Palmerton: pregunta "¿por qué / cómo?" → respuesta que encadena causa → efecto → consecuencia clínica.
  Lo fallado en pre-tests y drills vuelve al deck el mismo día.

## Capstone: el protocolo clínico LIVIANO se produce dentro de la Academia (sin añadir minutos)

| Sección | Módulo → Síntesis que la redacta | **Día · fecha v5.16** (leídos de `LIV_DIAS` el 26-sep; v5.15 entre paréntesis) | Estado 5-sep |
|---|---|---|---|
| §1 Fundamento: por qué tratamiento crónico | M1 | **D19 · jue 22-oct-2026** (v5.15: lun 19-oct) | borrador (desde el currículo) |
| §2 Elegibilidad + titulación | M2 | **D38 · mié 18-nov-2026** (Síntesis módulo 2; el drill de cifras M2 es el D37 mar 17-nov; v5.15: D37 jue 12-nov / D36) | borrador (dosis A VERIFICAR) |
| §3 Política nutricional · §4 estándar proteína/fuerza + qué medir | M3 · M4 | **D58 · mié 16-dic** · **D67 · mié 30-dic** (v5.15: D57 jue 10-dic · D67 jue 24-dic) | borrador |
| §5 5As · automonitoreo · cadencia de check-in · check-in de EA | M5 | **D86 · jue 28-ene-2027** (v5.15: lun 25-ene) | borrador |
| §6 Derivación y límites de competencia | M6 | **D75 · mié 13-ene-2027** (v5.15: D74 jue 7-ene) | borrador |
| Anexo A · Acceso en Perú (tabla + cadena de frío + regla) | M7 | **D39 (jue 19-nov) · D41-D44 (lun 23 → jue 26-nov)** + **D45 (vie 27-nov, caso 9)** + **D46 (lun 30-nov, revisión trimestral I)** + **D89 (mar 2-feb, capstone)** | pendiente (verificación) |
| Ensamblaje v1 + ruta de credencial | Capstone | **D89 · mar 2-feb-2027** (✅ v5.16: 2 días hábiles DESPUÉS del caso 16 integral, vie 29-ene = D87 — la inversión de v5.15 desaparece; la trimestral II D90 mié 3-feb cierra el plan) | pendiente |

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
como referente con certificación internacional real. Se anota en el **capstone (D89 · mar 2-feb-2027, v5.16)**.

## Pipeline de regeneración y corrimiento (cada día sin estudiar = +1 hábil)

1. Editar **solo** `DATA/BUSINESS/liviano_curriculum.json` (temas, tarjetas, casos, drills, colores).
2. `node DATA/_scripts/gen_liviano_plan.js <YYYY-MM-DD>` (v5.16: `2026-09-28`) → reescribe `livianoStudyPlan.ts`, `livianoCasos.ts` y el CSV.
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
3. Revisión **trimestral** de farmacoterapia (aprobaciones y precios se mueven rápido): filas fijas **D46
   (lun 30-nov-2026)** y **D90 (mié 3-feb-2027)** (v5.16; v5.15: D45 mar 24-nov · D89 jue 28-ene), luego cada trimestre (`LIVIANO_REVISION_TRIMESTRAL`).
4. Todo dato clínico, regulatorio o de precio que se publique en contenido LIVIANO se verifica contra la fuente
   primaria (misma regla anti-alucinación del motor de preguntas ENCAPS). Lo no verificado se escribe
   "A VERIFICAR (dd-mmm)".
5. La Academia produce entregables, no solo repaso: tabla de acceso fechada, protocolo clínico v1, KPI log con
   números reales.

---

## Índice v5.16 (26-sep-2026) — D → fecha de los 90 días

Leído de `src/lib/livianoStudyPlan.ts` → `LIV_DIAS` (parseado, no estimado). **D1 = lun 28-sep-2026 ·
D90 = mié 3-feb-2027 · 90 días L-V · 25-dic, 31-dic y 1-ene fuera · franja 17:15-18:00 intacta ·
0 fechas en fin de semana o feriado (verificado).** *(v5.15: D1 mié 23-sep → D90 vie 29-ene; M1 D1-D19 · D23 · M2 D20-D22 · D24-D38 · D43 · D75 · M7 D39-D42 · D44 · D48 · SÍNTESIS D45 · D87-D90 · M3 D46-D47 · D49-D58 · M4 D59-D67 · M6 D68-D74 · D80 · D85 · M5 D76-D79 · D81-D84 · D86.)*

| Módulo | Días (D) | Nº | Rango de fechas |
|---|---|---|---|
| M1 · FISIOLOGÍA | D1-D20 | 20 | lun 28-sep → vie 23-oct-2026 |
| M2 · GLP-1 | D21-D38 · D40 · D72 | 20 | lun 26-oct-2026 → vie 8-ene-2027 |
| M7 · ACCESO PERÚ | D39 · D41-D45 | 6 | jue 19-nov → vie 27-nov-2026 |
| SÍNTESIS (trimestral I + caso 16 + cierre) | D46 · D87-D90 | 5 | lun 30-nov-2026 · vie 29-ene → mié 3-feb-2027 |
| M3 · NUTRICIÓN | D47-D58 | 12 | mar 1-dic → mié 16-dic-2026 |
| M4 · EJERCICIO | D59-D67 | 9 | jue 17-dic → mié 30-dic-2026 |
| M6 · FARMACO+QX | D68-D71 · D73-D75 · D77 · D82 | 9 | lun 4-ene → vie 22-ene-2027 |
| M5 · CONDUCTA | D76 · D78-D81 · D83-D86 | 9 | jue 14-ene → jue 28-ene-2027 |

*(Los módulos se solapan en el calendario porque el generador coloca cada caso en su VIERNES real; por eso
un día de un módulo puede caer dentro del rango de otro.)*

**Hitos v5.7 → … → v5.14 → v5.15 → v5.16** (columnas leídas de los `.ts` de cada versión; el Dn cambia porque el
generador re-sloteó los casos a viernes reales — **la fecha es lo estable, el D# no**)

| Hito | v5.10 | v5.11 | v5.12 | v5.13 | v5.14 | v5.15 | **v5.16 (vigente)** |
|---|---|---|---|---|---|---|---|
| D1 · arranque | lun 14-sep-2026 (D1) | mar 15-sep-2026 (D1) | mié 16-sep-2026 (D1) | jue 17-sep-2026 (D1) | lun 21-sep-2026 (D1) | mié 23-sep-2026 (D1) | **lun 28-sep-2026** (D1) |
| Caso 1 | vie 18-sep-2026 (D5) | vie 18-sep-2026 (D4) *(fecha intacta)* | vie 25-sep-2026 (D8) *(⚠ +1 semana: el vie 18-sep queda sin caso)* | vie 25-sep-2026 (D7) *(fecha intacta)* | vie 25-sep-2026 (D5) *(fecha intacta; con D1 en lunes ya no se salta ningún viernes)* | vie 2-oct-2026 (D8) *(⚠ +1 semana: el vie 25-sep = D3 queda sin caso)* | **vie 2-oct-2026** (D5) *(fecha intacta; con D1 en lunes ya no se salta ningún viernes)* |
| Importar el CSV de Anki | jue 1-oct-2026 (D15) | lun 5-oct-2026 (D16) | mar 6-oct-2026 (D16) | mar 6-oct-2026 (D15) | lun 12-oct-2026 (D16) | mar 13-oct-2026 (D15) | **lun 19-oct-2026** (D16) |
| Síntesis M1 (§1 del protocolo) | mié 7-oct-2026 (D19) | jue 8-oct-2026 (D19) | lun 12-oct-2026 (D20) *(el vie 9-oct es el caso 4)* | lun 12-oct-2026 (D19) | jue 15-oct-2026 (D19) | lun 19-oct-2026 (D19) | **jue 22-oct-2026** (D19) *(el vie 23-oct es el caso 4)* |
| Drill de cifras M2 | mar 3-nov-2026 (D37) | mié 4-nov-2026 (D37) | mié 4-nov-2026 (D36) | jue 5-nov-2026 (D36) | mar 10-nov-2026 (D37) | mié 11-nov-2026 (D36) | **mar 17-nov-2026** (D37) |
| Síntesis M2 | mié 4-nov-2026 (D38) | jue 5-nov-2026 (D38) | jue 5-nov-2026 (D37) | lun 9-nov-2026 (D38) *(el vie 6-nov es el caso 7)* | mié 11-nov-2026 (D38) | jue 12-nov-2026 (D37) *(el vie 13-nov es el caso 7)* | **mié 18-nov-2026** (D38) |
| Módulo 7 · Acceso en Perú | jue 5-nov → vie 13-nov-2026 | lun 9-nov → lun 16-nov-2026 (D40-D45) | lun 9-nov → lun 16-nov-2026 (D39-D42 · D44) + caso 9 vie 20-nov (D48) | mar 10-nov → mar 17-nov-2026 (D39-D41 · D43-D44) + caso 9 vie 20-nov (D47) | jue 12-nov → jue 19-nov-2026 (D39 · D41-D44) + caso 9 vie 20-nov (D45) | lun 16-nov → lun 23-nov-2026 (D39-D42 · D44) + caso 9 vie 27-nov (D48) | **jue 19-nov → jue 26-nov-2026** (D39 · D41-D44) + caso 9 vie 27-nov (D45) |
| REVISIÓN TRIMESTRAL I | lun 16-nov-2026 (D46) | mar 17-nov-2026 (D46) | mar 17-nov-2026 (D45) | mié 18-nov-2026 (D45) | lun 23-nov-2026 (D46) | mar 24-nov-2026 (D45) | **lun 30-nov-2026** (D46) |
| Drill M2-3-7 + Síntesis M3 | mié 2-dic-2026 (D58) | jue 3-dic-2026 (D58) | jue 3-dic-2026 (D57) | lun 7-dic-2026 (D58) *(el vie 4-dic es el caso 11)* | mié 9-dic-2026 (D58) | jue 10-dic-2026 (D57) *(el vie 11-dic es el caso 11)* | **mié 16-dic-2026** (D58) |
| Síntesis M4 | mié 16-dic-2026 (D68) | jue 17-dic-2026 (D68) | jue 17-dic-2026 (D67) | lun 21-dic-2026 (D68) *(el vie 18-dic es el caso 13)* | mié 23-dic-2026 (D68) | jue 24-dic-2026 (D67) *(el vie 18-dic es el caso 12)* | **mié 30-dic-2026** (D67) |
| Drill M4-6 + Síntesis M6 | mar 29-dic-2026 (D76) | mié 30-dic-2026 (D76) | mié 30-dic-2026 (D75) | lun 4-ene-2027 (D75) *(31-dic y 1-ene fuera)* | mié 6-ene-2027 (D75) | jue 7-ene-2027 (D74) *(31-dic y 1-ene fuera)* | **mié 13-ene-2027** (D75) |
| Síntesis M5 | jue 14-ene-2027 (D86) | lun 18-ene-2027 (D87) *(pasa detrás del caso 16)* | lun 18-ene-2027 (D86) *(vuelve a ir antes del caso 16)* | mar 19-ene-2027 (D86) | jue 21-ene-2027 (D86) | lun 25-ene-2027 (D86) *(no es la víspera del caso 16)* | **jue 28-ene-2027** (D86) *(víspera del caso 16)* |
| Caso 16 integral · fin del temario | vie 15-ene-2027 (D87) | vie 15-ene-2027 (D86) *(fecha intacta)* | vie 22-ene-2027 (D90) *(⚠ +1 semana; detrás del capstone y de la trimestral II)* | vie 22-ene-2027 (D89) *(fecha intacta; DESPUÉS del capstone, ANTES de la trimestral II)* | vie 22-ene-2027 (D87) *(ANTES del repaso, del capstone y de la trimestral II)* | vie 29-ene-2027 (D90) *(⚠ +1 semana; DESPUÉS del repaso, del capstone y de la trimestral II — cerraba el plan)* | **vie 29-ene-2027** (D87) *(fecha intacta; ANTES del repaso, del capstone y de la trimestral II — la inversión desaparece)* |
| Repaso integral + drill final | lun 18-ene-2027 (D88) | mar 19-ene-2027 (D88) | mar 19-ene-2027 (D87) | mié 20-ene-2027 (D87) | lun 25-ene-2027 (D88) | mar 26-ene-2027 (D87) | **lun 1-feb-2027** (D88) |
| Capstone (protocolo v1) | mar 19-ene-2027 (D89) | mié 20-ene-2027 (D89) | mié 20-ene-2027 (D88) | jue 21-ene-2027 (D88) | mar 26-ene-2027 (D89) | mié 27-ene-2027 (D88) | **mar 2-feb-2027** (D89) |
| REVISIÓN TRIMESTRAL II + cierre | mié 20-ene-2027 (D90) | jue 21-ene-2027 (D90) | jue 21-ene-2027 (D89) *(no cerraba el plan)* | lun 25-ene-2027 (D90) *(vuelve a cerrar el plan)* | mié 27-ene-2027 (D90) *(cerraba el plan)* | jue 28-ene-2027 (D89) *(no cerraba el plan: lo cerraba el caso 16)* | **mié 3-feb-2027** (D90) *(vuelve a cerrar el plan)* |

*(Columna v5.9, histórica: D1 vie 11-sep-2026 · caso 1 vie 18-sep (D6) · CSV mié 30-sep (D15) · Síntesis M1 mar 6-oct (D19) · drill M2 lun 2-nov (D37) · Síntesis M2 mar 3-nov (D38) · M7 mié 4-nov → vie 13-nov · trimestral I jue 12-nov (D45) · drill M2-3-7 mar 1-dic (D58) · Síntesis M4 mar 15-dic (D68) · drill M4-6 lun 28-dic (D76) · Síntesis M5 mié 13-ene-2027 (D86) · caso 16 vie 15-ene (D88) · repaso jue 14-ene (D87) · capstone lun 18-ene (D89) · trimestral II mar 19-ene (D90).)*
