# LIVIANO · Protocolo clínico v1 (esqueleto → se completa en la Academia)

> **Estado (5-sep-2026): ESQUELETO.** Cada sección la redacta una "Síntesis de módulo" de LIVIANO Academia
> (D1 = lun 7-sep-2026, v5.6) y el capstone D89 (mar 12-ene-2027) las ensambla. Aquí está todo lo que **ya se
> puede afirmar desde el currículo, con fuente**; lo que exige ficha técnica, guía específica, QF/abogado o
> dato de Perú va como **A VERIFICAR (dueño · día)**. **Ninguna dosis se escribe de memoria.**
> Espejo en la app: `LIVIANO_PROTOCOLO` (`src/lib/empresaData.ts`) → Logística F5 → "Protocolo clínico".
>
> **Regla de uso**: este documento NO se usa con pacientes reales hasta (a) completar todos los "A VERIFICAR" de
> §2 y Anexo A y (b) revisión por par (médico con experiencia en obesidad — A VERIFICAR nombre). Límite ético
> transversal: CMP Art. 73 — no prometer cifras de pérdida de peso; los datos de ensayos se presentan como
> promedios de estudio, no como resultado individual.

**Criterio de éxito de la v1**: el caso integral del viernes 16 (D87 · 8-ene-2027: varón 48 a, −16 % en 6 meses,
"¿ya puedo dejar todo?", esposa presente) **se resuelve solo con este protocolo**. Lo que falte es una sección que falta.

| Sección | La redacta | Día | Estado |
|---|---|---|---|
| §1 Fundamento | Síntesis M1 | D19 · jue 1-oct | borrador |
| §2 Elegibilidad + titulación | Síntesis M2 | D38 · mié 28-oct | borrador (dosis A VERIFICAR) |
| §3 Política nutricional | Síntesis M3 | D58 · mié 25-nov | borrador |
| §4 Estándar proteína/fuerza + qué medir | Síntesis M4 | D68 · mié 9-dic | borrador |
| §5 Consulta 5As · automonitoreo · cadencia de check-in | Síntesis M5 | D86 · jue 7-ene | borrador |
| §6 Derivación y límites de competencia | Síntesis M6 | D77 · mar 22-dic | borrador |
| Anexo A · Acceso en Perú | Módulo 7 | D39-D44 · 29-oct → 5-nov (+ D46, D90) | pendiente |
| Anexo B · Validación con casos | viernes 1-16 | D5 → D87 | en curso |
| Ensamblaje v1 + ruta de credencial | Capstone | D89 · mar 12-ene | pendiente |

---

## §0 · Definiciones y alcance

- **Población**: adultos con obesidad (o sobrepeso con enfermedad metabólica) que consultan en LIVIANO (Pulso ·
  Huancayo / telesalud). Criterio numérico de elegibilidad: **A VERIFICAR** contra Obesity Algorithm 2026 (D38).
- **Fuera de alcance de la v1** (derivar): embarazo/lactancia, < 18 años, obesidad monogénica sospechada, trastorno
  de la conducta alimentaria activo, enfermedad psiquiátrica descompensada, cirugía bariátrica previa con
  complicaciones (ver §6).
- **Fuentes base del protocolo** (las mismas de `LIVIANO_ACADEMIA.md`): Endocrine Society Scientific Statement
  (Schwartz 2017) · Obesity Algorithm 2026 (OMA) · Obesity Canada Guidelines (5As, nutrición, cap. 1 sesgo de peso) ·
  STEP 1 / SELECT (semaglutida) · SURMOUNT-1 / SURMOUNT-5 (tirzepatida) · meta-análisis AI vs restricción continua
  (PMC10098946) · DIETFITS · National Weight Control Registry · DPP · ASMBS/IFSO 2022 (PMC9834364).
- **Lenguaje**: people-first ("persona con obesidad"), sin culpa, con permiso. Es ítem evaluable (Anexo B).

## §1 · Fundamento: por qué tratamiento crónico (M1 → D19)

**Ya afirmable (Schwartz 2017; Obesity Algorithm 2026):**
1. La obesidad es una enfermedad del **sistema de homeostasis energética** (tejido adiposo–intestino–hipotálamo),
   no acumulación pasiva de calorías ni falta de voluntad.
2. El cerebro **defiende un nivel de adiposidad** (set point elevado): al perder peso caen la leptina y el gasto y
   sube la grelina/el hambre; el sistema lee el nuevo peso como déficit.
3. La **adaptación metabólica** persiste años → el manejo es **crónico**, como la hipertensión: al retirar el
   tratamiento sin más, la presión biológica vuelve.
4. Consecuencia para el programa: se mide **adherencia y composición corporal**, no voluntad ni solo balanza; la
   suspensión del fármaco es una decisión compartida con datos (§2.6).

**Metáforas oficiales** (biblioteca M1): termostato del peso · timbre (grelina) · acelerador/freno (AgRP/POMC).
**Frase de apertura del programa**: "No fallaste tú: falló el método, porque peleaba contra tu biología. Ahora
vamos a tratar la biología."

**Pendiente D19**: redactar las 10 líneas finales para el kit de bienvenida (versión paciente).

## §2 · Elegibilidad, screening, consentimiento y titulación (M2 → D38)

### 2.1 Candidatura
- Candidato a farmacoterapia GLP-1/GIP-GLP-1: IMC/comorbilidad según **Obesity Algorithm 2026 — criterio numérico
  A VERIFICAR (Joseph · D38)**; intentos previos documentados; disposición al cambio evaluada (5As, §5).
- Ambas moléculas "mueven la aguja": semaglutida (STEP 1 −14,9 % vs −2,4 % a 68 sem) y tirzepatida (SURMOUNT-1
  −15/−19,5/−20,9 % vs −3,1 %; SURMOUNT-5 ~20 % vs ~14 %). Se elige con el paciente por **costo (tier), tolerancia
  y disponibilidad verificada en Perú (Anexo A)** — "la mejor molécula es la que no se abandona".

### 2.2 Screening obligatorio antes de la primera dosis (contraindicaciones y precauciones)
| Pregunta / dato | Por qué | Acción si positivo |
|---|---|---|
| Antecedente personal o familiar de **carcinoma medular de tiroides / MEN2** | contraindicación dura de los GLP-1 | no prescribir |
| **Pancreatitis** previa, alcohol, triglicéridos muy altos | evento raro pero grave | valorar alternativa / derivar |
| Enfermedad **biliar** sintomática | colelitiasis descrita con la pérdida rápida | valorar; educar signos |
| **Embarazo, lactancia o búsqueda de embarazo** | no indicado; periodo de lavado A VERIFICAR (ficha técnica) | no iniciar; anticoncepción pactada |
| Enfermedad cardiovascular establecida | SELECT (beneficio) pero coordinación con cardiología | iniciar tras visto bueno escrito (§6) |
| Tratamiento psiquiátrico / TCA | interacciones (no-GLP1) y riesgo conductual | interconsulta antes de fármaco (§6) |
| Otros fármacos (insulina, sulfonilureas, anticoagulantes…) | ajustes — **A VERIFICAR** por ficha técnica | coordinar con médico tratante |

- **Labs basales**: panel y cadencia — **A VERIFICAR (Joseph · D38, guía OMA/Obesity Canada)**. En el currículo ya
  aparecen como parte de la Evaluación Integral: HbA1c/glucosa, perfil lipídico, función hepática/renal, TSH según
  clínica (lista provisional, confirmar).

### 2.3 Consentimiento hablado (guion mínimo)
1. Qué hace el fármaco (copia una hormona intestinal → "baja el volumen del ruido de comida"; vaciamiento gástrico lento).
2. Beneficio esperado **como promedio de estudio**, traducido a sus kilos sin promesa individual (CMP Art. 73).
3. EA GI dominantes (náusea, vómito, estreñimiento) y **la escalada lenta como manejo**; eventos raros
   (colelitiasis, pancreatitis, gastroparesia) y sus **señales de alarma** por escrito.
4. **Pérdida de masa magra** → el paquete es indivisible: fármaco + proteína 1,2-1,6 g/kg + fuerza 2x/sem (§3-§4).
5. Cronicidad: ~67 % del peso se recupera en 1 año si se suspende sin cambiar nada más (STEP 1 ext.).
6. Costo real y fuente del producto (Anexo A): registro sanitario, farmacia licenciada, cadena de frío.

### 2.4 Inicio y titulación
- **Esquema de dosis e intervalos por molécula: SOLO desde la ficha técnica del producto con registro en Perú —
  A VERIFICAR (Joseph · D38 / Anexo A D39)**. No se transcribe aquí ninguna dosis hasta entonces.
- Reglas ya afirmables: escalada **lenta**; **no escalar mientras haya EA GI activos** (mantener la dosis hasta
  tolerar); **check-in semanal de EA durante toda la titulación** (§5.4); medidas anti-náusea (porciones pequeñas,
  menos grasa, comer lento, hidratación, proteína primero).

### 2.5 Seguimiento
- Despegue: 4 sesiones/mes (contenido §5.3) · Progreso: 2 · Consolidación: 1 · Mantenimiento: control trimestral
  (cadencia de la oferta LIVIANO).
- Métricas y cadencia de medición: §4.3. Labs de control: **A VERIFICAR** (bono "labs trimestrales").

### 2.6 Criterios de suspensión, reducción y reinicio
- **Suspender y derivar de urgencia**: dolor abdominal intenso irradiado a espalda + vómitos (sospecha de
  pancreatitis) · vómitos persistentes / deshidratación · embarazo o búsqueda de embarazo (obstetricia).
- **Suspender / cambiar**: EA intolerables pese a mantener dosis; falla a farmacoterapia (definición operativa
  **A VERIFICAR**, p. ej., respuesta insuficiente a dosis tolerada máxima) → escalera §6.
- **Reducción o salida gradual** (decisión compartida, con el 67 % explicado): opciones mantener / reducir
  (esquema **A VERIFICAR** ficha técnica) / salida gradual con **criterios de reinicio escritos** (recuperación de
  X % del peso perdido, pérdida de control del apetito, empeoramiento metabólico — umbral a fijar en D38).

## §3 · Política nutricional (M3 → D58)

**Ya afirmable:**
1. **Adherencia primero**: la dieta que el paciente puede sostener (DIETFITS: low-fat vs low-carb no difieren si la
   calidad es alta; AI = restricción continua, dif. 0,26 kg NS; adherencia > 80 % solo en estudios < 3 meses → el
   plan se diseña para el mes 6, no para la semana 1).
2. **Proteína innegociable: 1,2-1,6 g/kg/día**, repartida en 3-4 tomas, **proteína primero** en cada comida cuando
   el fármaco quita el hambre.
3. **Comida real local**: método del plato (½ vegetales · ¼ proteína · ¼ carbohidrato de calidad; agua) con insumos
   andinos (trucha, huevo, pollo, cuy, lácteos, quinua, habas); la papa como carbohidrato controlado.
4. Señal de alarma nutricional con GLP-1: "come una vez al día", proteína muy por debajo de 1,2 g/kg, poca agua,
   pérdida de fuerza → **no escalar dosis**, rediseñar el día (caso 10).
5. Mitos que se corrigen sin humillar: detox, fajas, "metabolismo lento" (mito de origen / verdad tras la pérdida), quemadores.

**A VERIFICAR (D58)**: ingesta de líquidos objetivo y señales de deshidratación (fuente); suplementación en
ingestas muy bajas (fuente); manejo del alcohol.

## §4 · Estándar proteína/fuerza + qué medir (M4 → D68)

**Ya afirmable:**
1. **Estándar innegociable junto a todo GLP-1**: proteína 1,2-1,6 g/kg + **fuerza 2x/semana** (grandes grupos
   musculares, progresiva; pesas, bandas o peso corporal; plan mínimo en casa 20-30 min si no hay gimnasio).
2. El ejercicio solo baja poco peso (~2-3 kg): se prescribe para **mantenimiento y composición**, no para la balanza;
   NWCR: ~1 h/día de actividad (≈ 2.800 kcal/sem) en quienes mantienen; guías clínicas 200-300 min/sem.
3. Prescripción: **empezar ridículamente fácil** (10 min / 1 serie), progresar cada 2 semanas (frecuencia y duración
   antes que intensidad); "fitness vs fatness": el ejercicio cuenta aunque el IMC no cambie.
4. **Qué medir (§4.3)** — siempre en las mismas condiciones:
   | Métrica | Cadencia | Nota |
   |---|---|---|
   | Peso | semanal (balanza privada) | se lee junto a las demás, nunca sola |
   | Cintura | cada 2-4 semanas | estima grasa visceral |
   | Fuerza (agarre, sentarse-levantarse, series) | cada 4 semanas | delata pérdida de masa magra |
   | Fotos estandarizadas | mensual | consentimiento y almacenamiento seguro |
   | Composición (bioimpedancia) | si disponible | complementaria |
   | Labs de control | **A VERIFICAR** | bono "labs trimestrales" |
5. **Estancamiento** (caso 12): mostrar lo que la balanza no ve (cintura, fuerza, PA); no escalar dosis por impulso;
   redefinir metas de mantenimiento activo.

**A VERIFICAR (D68)**: contraindicaciones de ejercicio en paciente cardiológico (con cardiología); umbrales de
progresión de carga (fuente).

## §5 · Consulta LIVIANO: 5As, automonitoreo, cadencia de check-in (M5 → D86)

**Ya afirmable (Obesity Canada 5As; DPP; cap. 1 Obesity Canada):**
1. **Guion 5As**: *Ask* (pedir permiso: "¿te parece si hablamos hoy de tu peso?") → *Assess* (historia del peso,
   intentos, comorbilidades, contexto, disposición, qué le importa) → *Advise* (informar con datos, sin sermón) →
   *Agree* (**UNA** meta elegida por el paciente, con métrica y fecha) → *Assist* (quitar barreras: receta, plan de
   proteína, rutina mínima, automonitoreo, canal de contacto).
2. **Entrevista motivacional**: no discutir, rodar con la resistencia, reflejar antes de aconsejar, provocar el
   "cambio hablado" (caso 4).
3. **Automonitoreo = predictor #1**: comidas (foto/texto), peso semanal, actividad/pasos y, en titulación, náusea
   0-3 y agua — en la app del paciente (VITALS, puente **A VERIFICAR**: `bajo_glp1`, check-in de EA) o en papel.
4. **DPP** (−58 % de incidencia de diabetes) = el programa conductual estructurado funciona por sí mismo → tier de
   solo seguimiento para quien no puede pagar el fármaco (caso 14).
5. **Protocolo sin estigma**: balanza en espacio privado, sillas y brazaletes adecuados, lenguaje people-first,
   apertura con permiso, cierre con meta + métrica + fecha + "no estás sola/o en esto". Es **ítem evaluable** de
   cada caso (Anexo B).

### 5.3 Cadencia de acompañamiento por fase (oferta LIVIANO) y contenido de las 4 sesiones/mes del Despegue
| Fase | Sesiones/mes | Contenido (estructura propuesta; detalle se redacta en D86) |
|---|---|---|
| Despegue (meses 1-3) | 4 | S1 titulación y EA · S2 proteína y método del plato · S3 fuerza y actividad · S4 automonitoreo y revisión de métricas — cada una con 5As |
| Progreso | 2 | métricas §4.3 + ajuste de plan + adherencia |
| Consolidación | 1 | mantenimiento activo (NWCR), prevención de recaída |
| Mantenimiento | control trimestral | labs (A VERIFICAR), composición, decisión sobre fármaco (§2.6) |

### 5.4 Check-in de EA durante la titulación (semanal)
Náusea (0-3) · vómitos · estreñimiento · hidratación · mareo · **dolor abdominal (red flag)** · adherencia a la
dosis → decisión: mantener / escalar / suspender (§2.4, §2.6). Canal: WhatsApp del programa; red flags → consulta
presencial o emergencia, nunca manejo por chat.

## §6 · Derivación y límites de competencia (M6 → D77)

**Ya afirmable:**
1. **Gatillos de derivación a cirugía bariátrica (ASMBS/IFSO 2022)**: IMC ≥ 35 sin exigir comorbilidades · IMC
   30-34,9 con enfermedad metabólica refractaria · (asiáticos ≥ 27,5: alerta de riesgo, juicio clínico en
   población peruana) · **falla a farmacoterapia** (definición operativa **A VERIFICAR**, §2.6). Qué logra: pérdida
   sostenida 25-30 % y remisión de diabetes; "la cirugía también es hormonal". Derivar es fortaleza: LIVIANO acompaña
   antes, durante y después (caso 15).
2. **Otros límites (interconsulta antes de actuar)**: cardiología (ECV antes de fármaco y de prescribir ejercicio —
   caso 8) · psiquiatría (no-GLP1 con tratamiento psiquiátrico — caso 14) · endocrinología (diabetes mal controlada)
   · obstetricia (embarazo/búsqueda — caso 13) · emergencia (pancreatitis sospechada — caso 13).
3. **Escalera terapéutica**: estilo de vida estructurado (DPP) → farmacoterapia (GLP-1 / dual; no-GLP1 solo con
   registro verificado en Perú: fentermina/topiramato, naltrexona/bupropión, orlistat, metformina off-label —
   papel modesto) → cirugía. Cada peldaño con criterio de escalada escrito; no se sube por ansiedad ni se baja por
   costo sin decirlo.
4. **Obesidad monogénica** (inicio muy temprano + hiperfagia): derivar a estudio genético; setmelanotida solo para
   variantes concretas (**A VERIFICAR** criterios).
5. **Rol LIVIANO pre y post bariátrica**: preparación (proteína, fuerza, automonitoreo, estudio de apnea), seguimiento
   y manejo de la recidiva (GLP-1 post-cirugía: esquema **A VERIFICAR**).

## Anexo A · Acceso en Perú (M7 → D39-D44; re-verificación D46 y D90)

**Regla**: ninguna celda se rellena sin fuente primaria fechada (captura del portal público de DIGEMID — URL A
VERIFICAR —, cotización escrita, dictamen QF/abogado). Ningún precio se publica sin cotización. **Nunca mercado gris**:
solo farmacia licenciada con certificado de análisis por lote.

| Molécula | Registro DIGEMID | Condición de venta | Precio farmacia (2 cotizaciones) | Costo LIVIANO | Verificado |
|---|---|---|---|---|---|
| Semaglutida 2,4 mg SC (ref. Wegovy) | PENDIENTE DE VERIFICACIÓN | PENDIENTE | PENDIENTE | PENDIENTE | — |
| Semaglutida oral (ref. Wegovy tabletas) | PENDIENTE (puede no existir → "SIN REGISTRO HALLADO (fecha)") | PENDIENTE | PENDIENTE | PENDIENTE | — |
| Tirzepatida (ref. Mounjaro/Zepbound) | PENDIENTE DE VERIFICACIÓN | PENDIENTE | PENDIENTE | PENDIENTE | — |
| Semaglutida MAGISTRAL (Sterilelabs) | no aplica registro de producto: **dictamen de legalidad A VERIFICAR** | PENDIENTE | n/a | PENDIENTE (cotización + CoA por lote) | — |
| Naltrexona/bupropión | PENDIENTE | PENDIENTE | PENDIENTE | PENDIENTE | — |
| Fentermina/topiramato | PENDIENTE | PENDIENTE | PENDIENTE | PENDIENTE | — |

(Espejo vivo: `LIVIANO_ACCESO_PERU` en `empresaData.ts`; se actualiza con fecha en cada verificación.)

**Cadena de frío doméstica (kit de bienvenida — guion de 8 líneas, se redacta en D44)**: 2–8 °C extremo a extremo ·
transporte desde la farmacia con gel frío · en casa en estante interior del refrigerador, **no en la puerta**, nunca
congelar · tiempo permitido fuera de refrigeración **según ficha técnica del producto (A VERIFICAR)** · ante
excursión de temperatura: no usar ni desechar por su cuenta, anotar tiempo/temperatura y consultar · viaje en bus:
gel frío + registro de horas.

**Tareas con dueño**: Legalidad DIGEMID → Joseph + QF y abogado de salud (A VERIFICAR nombres), D39-D43 · Cotización
Sterilelabs → Joseph, D43 · Cadena de frío / ficha técnica → Joseph, D44 · Re-verificación → D46 (9-nov) y D90 (13-ene).

## Anexo B · Validación con los 16 casos (rúbrica 0-2 × 4)

Cada viernes el caso se resuelve en voz alta **solo con lo que el protocolo ya dice**; se puntúa: mecanismo correcto ·
metáfora de paciente · people-first/sin estigma · plan pactado y medible (meta ≥ 6/8; media ≥ 80 %). Un ítem en 0
señala una sección del protocolo a completar. Casos → sección que validan: 1-4 → §1 · 5-8 → §2 · 9 → Anexo A ·
10-11 → §3 · 12 → §4 · 13-15 → §6 · 16 → todo (capstone). Score persistido en `jmd-liviano-score` (panel Academia).

## Anexo C · Lista consolidada de "A VERIFICAR" (dueño · día)

| Ítem | Fuente esperada | Dueño · día |
|---|---|---|
| Criterio numérico de elegibilidad (IMC/comorbilidad) | Obesity Algorithm 2026 | Joseph · D38 |
| Panel de labs basales y cadencia de control | OMA / Obesity Canada | Joseph · D38 (y D68) |
| Esquema de dosis, intervalos y periodo de lavado por molécula | ficha técnica del producto registrado | Joseph · D38 + Anexo A D39 |
| Definición operativa de "falla a farmacoterapia" y criterios de reinicio | guía OMA / decisión clínica documentada | Joseph · D38 |
| Interacciones relevantes (insulina, sulfonilureas, psicofármacos) | ficha técnica / interconsulta | Joseph · D38, D69 |
| Registro DIGEMID, condición de venta, precios, magistral, tiempo fuera de frío | portal DIGEMID · cotizaciones · QF/abogado · ficha técnica | Joseph (+ QF, abogado) · D39-D44 |
| Líquidos objetivo / suplementación en ingestas muy bajas | fuente nutricional | Joseph · D58 |
| Contraindicaciones de ejercicio en ECV | cardiología | Joseph · D68 |
| Criterios de setmelanotida / estudio genético · GLP-1 post-bariátrica | guía específica | Joseph · D71, D76 |
| Puente con VITALS (`bajo_glp1`, check-in EA, piso de proteína 1,6 vs rango 1,2-1,6) | `DATA/VITALS/LIVIANO_VITALS_BRIDGE.md` (otra tarea) | Joseph · fuera de esta Academia |
| Revisión por par antes de uso clínico | médico con experiencia en obesidad | Joseph · post-D89 |
