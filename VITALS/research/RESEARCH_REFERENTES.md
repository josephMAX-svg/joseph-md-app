# RESEARCH · Referentes de Nutrición y Ejercicio (Fase 0)

> Base de conocimiento que alimenta el **Coach IA (RAG)** y el **generador de plan adaptativo** de Pulso Movimiento.
> Cada referente trae: tesis central, obra/evidencia clave y **aplicabilidad concreta** al producto.
> Los `chunks` listos para RAG están en `research/rag_chunks/knowledge.json` (se siembran en `knowledge_base`).
>
> **Nota de honestidad científica:** este documento sintetiza la postura pública y publicada de cada autor a
> la fecha de corte (ene-2026). El contenido clínico es **referencial**; el Dr. Joseph (Director Científico,
> médico colegiado) lo valida antes de usarse con pacientes. La IA **propone**, el médico **aprueba**.

---

## 0. Cómo se usa esta investigación en el producto

1. **RAG del Coach** — cada bloque "Aplicabilidad" se convierte en un chunk citado. Cuando el usuario pregunta
   "¿cuánta proteína necesito?" el coach recupera el chunk de Phillips/Aragon y responde **citando la fuente**.
2. **Generador de plan** — los rangos basados en evidencia (proteína 1.6–2.2 g/kg, volumen 10–20 series/grupo/semana,
   RIR 1–3, déficit 0.5–1 %/semana) son los **parámetros por defecto** y los **pisos de seguridad** del motor.
3. **Pisos de seguridad** — los umbrales "nunca bajar de" (proteína, kcal, velocidad de pérdida) vienen
   directamente de la literatura aquí citada.

---

## 1. Referentes de NUTRICIÓN

### 1.1 Stuart Phillips, PhD — McMaster University
- **Tesis central:** la **proteína** es el macronutriente palanca para preservar/ganar masa muscular, sobre todo
  en déficit calórico y en el envejecimiento. La síntesis proteica muscular (MPS) responde a dosis por comida y
  a la calidad/leucina de la proteína.
- **Evidencia/obra:** meta-análisis Morton, Murphy & Phillips (2018, *Br J Sports Med*) → la ingesta proteica que
  maximiza ganancias con entrenamiento de fuerza ronda **1.6 g/kg/día** (IC hasta ~2.2 g/kg). Trabajo sobre
  "muscle full" y dosis de ~0.4 g/kg por comida (~20–40 g de proteína de alta calidad por toma).
- **Aplicabilidad Pulso Movimiento:**
  - Piso de proteína del plan: **≥1.6 g/kg** en recomposición/superávit; en déficit subir a **1.8–2.2 g/kg**
    para proteger masa magra (clave bajo GLP-1, que reduce apetito).
  - Distribuir en **3–4 tomas** de ~30–40 g. El analizador de foto evalúa proteína por comida, no solo el total.

### 1.2 Alan Aragon — *Alan Aragon's Research Review (AARR)*
- **Tesis central:** **árbitro de mitos**; lo que importa es el balance energético total y la proteína; el "timing"
  y la "ventana anabólica" están muy sobrevalorados. Defensor del *flexible dieting* (IIFYM) con base de comida real.
- **Evidencia/obra:** Aragon & Schoenfeld (2013, *JISSN*) "Nutrient timing revisited" — la ventana anabólica es
  mucho más amplia de lo que se creía. Co-autor de revisiones de proteína y de pérdida de grasa.
- **Aplicabilidad:**
  - El motor de plan prioriza **adherencia y total diario** sobre micro-optimizaciones de timing.
  - Mensaje anti-perfeccionismo del coach: "no arruinaste nada por comer 1h tarde; lo que cuenta es el total y la
    constancia" (apoya la lógica 80/20 de la garantía).

### 1.3 Layne Norton, PhD — nutrición + fuerza
- **Tesis central:** *flexible dieting* + entrenamiento de fuerza; la **adherencia** es el predictor #1 del éxito;
  rechaza demonizar alimentos. "El mejor plan es el que puedes sostener."
- **Evidencia/obra:** PhD en nutrición (metabolismo de proteína/leucina); divulgador de *reverse dieting* y de
  la importancia de la fuerza para la composición corporal.
- **Aplicabilidad:**
  - La app **mide adherencia** como métrica central (no solo peso). El coach no prohíbe alimentos: sustituye y ajusta.
  - Tras un déficit prolongado, el plan puede proponer una fase de **mantenimiento/recuperación metabólica** antes de
    otro déficit (concepto de diet breaks).

### 1.4 Jason Fung, MD — *The Obesity Code*
- **Tesis central:** la obesidad es un problema **hormonal** (insulina) más que de "calorías puras"; el **ayuno
  intermitente** y reducir azúcares/refinados ayudan a bajar insulina. Ya forma parte de la base clínica de Pulso.
- **Evidencia/obra:** *The Obesity Code* (2016), *The Complete Guide to Fasting*. Postura debatida en la academia
  (la termodinámica sigue mandando), pero útil en el manejo práctico de resistencia a la insulina.
- **Aplicabilidad:**
  - Soporte para **ventanas de alimentación** (ver Panda) y reducción de ultraprocesados.
  - **Piso de seguridad:** la app **no** promueve ayunos extremos ni prolongados sin supervisión. Bajo GLP-1, el
    apetito ya está reducido; ayunar de más + comer poco = riesgo de pérdida de músculo → escala al médico.

### 1.5 Peter Attia, MD — *Outlive* (Medicina 3.0)
- **Tesis central:** longevidad = preservar **masa muscular, fuerza y VO₂max**; vigilar **ApoB**, glucosa y sueño.
  La proteína y el entrenamiento de fuerza son "medicina" para la vejez. Marbles: estabilidad, fuerza, aeróbico, zona 2/5.
- **Evidencia/obra:** *Outlive* (2023); énfasis en proteína ~1.6–2.2 g/kg, entrenamiento de fuerza + zona 2 + VO₂max.
- **Aplicabilidad:**
  - Justifica el **pilar de cardio/caminata (zona 2)** y la fuerza en el scoring de adherencia.
  - Métricas de composición (músculo, masa magra) como objetivo de salud, no solo "peso en la balanza".

### 1.6 Satchin Panda, PhD — *The Circadian Code*
- **Tesis central:** **alimentación con restricción horaria (TRE)** — comer dentro de una ventana de 8–12 h alinea
  el metabolismo con el ritmo circadiano y mejora marcadores metabólicos.
- **Evidencia/obra:** *The Circadian Code* (2018); estudios de TRE en humanos y modelos animales.
- **Aplicabilidad:**
  - El plan puede sugerir una **ventana de 10–12 h** (suave, sostenible) en vez de ayunos extremos.
  - El `treatment_schedule` registra horarios de comida; el coach recuerda cerrar la ventana en la noche.

### 1.7 Michael Pollan — *In Defense of Food*
- **Tesis central:** "Come comida de verdad, no demasiada, sobre todo plantas." Anti-ultraprocesados, pro comida real.
- **Evidencia/obra:** *In Defense of Food* (2008), *Food Rules*. Base filosófica de la cocina andina de Pulso.
- **Aplicabilidad:**
  - El analizador de foto premia **comida real** (pollo, pescado, huevo, papa, arroz, ensalada) y marca ultraprocesados.
  - Coherente con `regional_products` (catálogo andino) del CRM.

### 1.8 Max Lugavere — *Genius Foods*
- **Tesis central:** nutrición ↔ **cognición**; grasas saludables, polifenoles, evitar picos de glucosa para
  proteger el cerebro.
- **Aplicabilidad:** chunks sobre alimentos "para la mente" y estabilidad de glucosa (útil para el pilar mental).

### 1.9 Alexandra Sowa, MD — *The Ozempic Revolution*
- **Tesis central:** cómo comer **bajo GLP-1**: el fármaco reduce apetito, así que el riesgo es **comer muy poco y
  perder músculo**; hay que **priorizar proteína y fuerza** y vigilar náuseas/hidratación.
- **Aplicabilidad (crítica para LIVIANO):**
  - Bajo GLP-1 el plan **sube el piso de proteína** y **baja el volumen** si hay náuseas (comidas suaves).
  - Banderas rojas (náusea severa, vómito, deshidratación) ya están en el agente Klotho → reusar.

### 1.10 Examine.com — base de datos de suplementos (verificador sin conflicto)
- **Rol:** fuente **neutral** para suplementos (creatina, proteína, cafeína, etc.). Sin venta de productos.
- **Aplicabilidad:** cuando el usuario pregunta por un suplemento, el coach cita Examine y **deriva al médico** si
  hay interacción posible con su medicación. Nunca recomienda dosis nuevas por su cuenta.

---

## 2. Referentes de EJERCICIO / FÍSICO

### 2.1 Brad Schoenfeld, PhD — hipertrofia (autoridad #1)
- **Tesis central:** la **hipertrofia** depende sobre todo del **volumen** (series efectivas/semana) y de llevar las
  series cerca del fallo; la frecuencia importa como vehículo del volumen.
- **Evidencia/obra:** Schoenfeld, Ogborn & Krieger (2017, *J Sports Sci*) dosis-respuesta de volumen → **≥10 series
  por grupo muscular/semana** mejor que <10; Schoenfeld et al. sobre frecuencia y rango de repeticiones (la
  hipertrofia ocurre en un amplio rango de reps si hay esfuerzo).
- **Aplicabilidad:**
  - Default del motor: **10–20 series por grupo/semana**, repartidas en ≥2 sesiones.
  - El tracker calcula **volumen = Σ(series × reps × carga)** y vigila que esté en rango.

### 2.2 Eric Helms, PhD — *The Muscle & Strength Pyramids*, RIR
- **Tesis central:** **jerarquía de prioridades** (adherencia > volumen/intensidad > frecuencia > timing > suplementos)
  y autorregulación con **RIR (reps in reserve)**.
- **Evidencia/obra:** *The Muscle and Strength Training Pyramids* (2ª ed.); papers de RPE/RIR en fuerza.
- **Aplicabilidad:**
  - El log de ejercicio captura **RIR** por serie; el plan apunta a **RIR 1–3** en trabajo de hipertrofia.
  - La "pirámide" es el **orden de prioridades** del generador de plan (primero adherencia, luego volumen…).

### 2.3 Mike Israetel, PhD — Renaissance Periodization (MEV/MAV/MRV)
- **Tesis central:** **landmarks de volumen** por grupo muscular: **MV** (mantenimiento) < **MEV** (mínimo efectivo)
  < **MAV** (máximo adaptativo) < **MRV** (máximo recuperable). Periodizar subiendo volumen hasta MRV y luego deload.
- **Evidencia/obra:** RP volume landmarks; *Scientific Principles of Hypertrophy Training*.
- **Aplicabilidad:**
  - El plan **progresa el volumen** semana a semana dentro de MEV→MAV y programa **deload** al detectar estancamiento
    o caída de rendimiento (sobre-alcance).
  - Encaja con el "front-loading" Hormozi: empezar cerca de MEV y subir.

### 2.4 Greg Nuckols — Stronger by Science
- **Tesis central:** el mejor **divulgador de evidencia cruda**; matiza modas, enseña a leer estudios; fuerza y
  tamaño con principios simples y sostenibles.
- **Aplicabilidad:** tono del coach = honesto, sin promesas mágicas; cuando la evidencia es incierta, lo dice.

### 2.5 Milo Wolf, PhD — rango de movimiento (ROM)
- **Tesis central:** entrenar en **rango completo / estiramiento bajo carga** tiende a dar más hipertrofia que rango
  parcial corto; el "lengthened partials" es una herramienta útil.
- **Aplicabilidad:** las indicaciones de técnica del coach enfatizan **ROM completo** y estiramiento bajo carga.

### 2.6 Dr. Pak (Patroklos Korakakis) — entrenamiento minimalista
- **Tesis central:** se puede ganar/mantener músculo con **muy poco tiempo** si la intensidad (cercanía al fallo) es
  alta; "dosis mínima efectiva". Clave para horarios de 30 min.
- **Aplicabilidad (encaja con el split de Joseph):**
  - Sesiones de **30 min** (Lun/Jue empuje-jalón) bien diseñadas son válidas: pocos ejercicios, cerca del fallo,
    RIR 0–2. El motor optimiza para tiempo cuando el usuario marca "días cortos".

### 2.7 Jeff Nippard — culturista natural + BSc bioquímica
- **Tesis central:** **traduce ciencia a práctica**; programas basados en evidencia, técnica, progresión por
  sobrecarga. (Asociado a la app MacroFactor.)
- **Aplicabilidad:** formato de los videos/explicaciones de ejercicio; "cómo progresar" en lenguaje simple.

### 2.8 Menno Henselmans — coach basado en evidencia (adherencia/autocontrol)
- **Tesis central:** **recomposición** es posible (sobre todo en principiantes, con sobrepeso o que recomienzan);
  el **autocontrol y la psicología** de la adherencia son entrenables; volumen moderado bien ejecutado.
- **Aplicabilidad:**
  - Justifica que Joseph (ya entrenado) puede **recomponer** (ganar músculo / perder grasa) con proteína alta + fuerza.
  - Estrategias de adherencia (implementación de intenciones, fricción baja) → diseño de la app y del coach.

---

## 3. Benchmark de APPS (UX de baja fricción + algoritmo adaptativo)

### 3.1 Fitia (LATAM) — foto/búsqueda → análisis
- **Patrón:** base de alimentos **regional** (incl. peruanos), registro rápido, planes con metas de macros, foto y
  código de barras. Mercado natural de Joseph.
- **Reuso:** la tabla `foods` del CRM ya nace "estilo Fitia" con alimentos peruanos → la reutilizamos.

### 3.2 MacroFactor — algoritmo adaptativo de calorías (lo más relevante)
- **Patrón clave:** **no usa fórmulas fijas**; estima tu **gasto energético total (TDEE) de forma dinámica** a partir
  de tu peso (tendencia suavizada) y tus calorías registradas, y **ajusta el objetivo** semanalmente para que pierdas
  a la velocidad elegida. Separa "expenditure" de "objetivo". Sin culpa, sin castigo.
- **Reuso (núcleo del motor adaptativo):**
  - Implementamos un **estimador de TDEE por balance**: `TDEE ≈ media(kcal_ingeridas) − Δpeso×7700/días`.
  - El objetivo de kcal se **recalcula** según la tendencia real de peso vs la meta de velocidad → "el plan se
    reestructura solo" (criterio de aceptación #5).

### 3.3 MyFitnessPal — base de datos enorme + hábito de logging
- **Patrón:** la fricción del logging manual es el enemigo. Lección: **minimizar tipeo** (de ahí foto+voz).

### 3.4 Cal AI — foto → macros
- **Patrón:** cámara como entrada principal; IA de visión estima porciones y macros; edición en 1 toque.
- **Reuso:** es exactamente nuestro flujo `/vision/meal` con **confianza visible** y corrección rápida.

### 3.5 Noom — psicología / adherencia
- **Patrón:** **una próxima acción** clara por día, micro-lecciones, refuerzo positivo, anti-todo-o-nada.
- **Reuso:** tarjeta "Próxima mejor acción" (ya existe en la app del paciente) + mensajes 80/20 del coach.

### 3.6 Hims & Hers / Eucalyptus — clínico DTC
- **Patrón:** experiencia **clínica** de marca (médico en el bucle, consentimiento, seguimiento), no "wellness suelto".
- **Reuso:** disclaimer médico, humano en el bucle para garantía/clínica, evidencia para la devolución.

---

## 4. SÍNTESIS → Reglas del motor de plan + Pisos de seguridad

> Estos números son los **defaults** del generador y los **límites duros** (no negociables) del validador de seguridad.

### 4.1 Nutrición (defaults basados en evidencia)
| Parámetro | Default | Rango evidencia | Fuente |
|---|---|---|---|
| Proteína (mantenimiento/superávit) | 1.6 g/kg | 1.6–2.2 | Morton/Phillips 2018 |
| Proteína (en déficit / GLP-1) | 2.0 g/kg | 1.8–2.4 | Phillips; Sowa |
| Proteína por comida | 30–40 g | 0.4 g/kg | Phillips ("muscle full") |
| Déficit para perder grasa | 15–20 % del TDEE | 10–25 % | Helms; práctica clínica |
| Velocidad de pérdida | 0.5–0.75 %/sem del peso | 0.25–1.0 % | Helms; Aragon |
| Ventana de alimentación | 10–12 h | 8–12 | Panda |

### 4.2 Entrenamiento (defaults basados en evidencia)
| Parámetro | Default | Rango | Fuente |
|---|---|---|---|
| Volumen por grupo/semana | 12–16 series | 10–20 | Schoenfeld 2017; Israetel |
| Frecuencia por grupo | 2×/sem | ≥2 | Schoenfeld |
| RIR (hipertrofia) | 1–3 | 0–4 | Helms |
| Rango de reps | 6–15 | 5–30 con esfuerzo | Schoenfeld |
| Progresión | +carga o +reps al alcanzar tope de RIR | — | Nippard; sobrecarga progresiva |
| Deload | cada 4–8 sem o por bajón de rendimiento | — | Israetel (MRV) |

### 4.3 PISOS DE SEGURIDAD (el validador BLOQUEA y ESCALA si se violan)
1. **Calorías nunca por debajo de** ~**1200 kcal (mujer)** / ~**1500 kcal (hombre)** sin supervisión médica explícita,
   y **nunca < TMB×0.8**. (TMB de Joseph = 1476 → piso ≈ 1180; en hombres usamos el mayor de los dos.)
2. **Proteína nunca por debajo de 1.6 g/kg** (sube el piso, no lo baja).
3. **Velocidad de pérdida > 1 %/semana sostenida** → señal de alarma (posible pérdida de músculo / déficit excesivo)
   → **no refuerza, escala al médico**.
4. **Sin ayunos extremos** (>16 h sin indicación), sin "detox", sin restringir grupos enteros sin razón clínica.
5. **Señales de relación poco sana con la comida** (lenguaje de culpa extrema, restricción/atracón, sobre-ejercicio)
   → el coach **no** refuerza la conducta, responde con calidez y **escala** (crea `clinician_task`).
6. **Bajo GLP-1:** vómito/náusea severa/deshidratación → banderas rojas urgentes (reusa Klotho) → emergencia + médico.

### 4.4 Front-loading (Hormozi) con seguridad
- Semanas 1–3: déficit en el extremo **alto seguro** (≈20 %) + más caminata (zona 2) para un **resultado temprano
  visible** → motiva. Nunca cruza los pisos de §4.3.
- Semana 4+: transición a déficit sostenible (≈15 %) + foco en fuerza para **preservar masa magra**.

---

## 5. CITAS (selección verificable)
- Morton RW, Murphy KT, **Phillips SM**, et al. *A systematic review, meta-analysis... protein supplementation on resistance training.* Br J Sports Med. 2018;52(6):376-384.
- **Aragon AA**, Schoenfeld BJ. *Nutrient timing revisited: is there a post-exercise anabolic window?* J Int Soc Sports Nutr. 2013;10:5.
- **Schoenfeld BJ**, Ogborn D, Krieger JW. *Dose-response relationship between weekly resistance training volume and increases in muscle mass.* J Sports Sci. 2017;35(11):1073-1082.
- **Helms ER**, Aragon AA, Fitschen PJ. *Evidence-based recommendations for natural bodybuilding contest preparation.* J Int Soc Sports Nutr. 2014;11:20.  ·  *The Muscle and Strength Pyramids* (Helms, Morgan, Valdez), 2ª ed.
- **Israetel M** et al. *Scientific Principles of Hypertrophy Training* (Renaissance Periodization). Volume landmarks MEV/MAV/MRV.
- **Attia P.** *Outlive: The Science and Art of Longevity.* 2023.
- **Fung J.** *The Obesity Code.* 2016.
- **Panda S.** *The Circadian Code.* 2018.
- **Pollan M.** *In Defense of Food.* 2008.
- **Sowa A.** *The Ozempic Revolution.* 2024.
- **Examine.com** — Supplement & nutrition evidence database.
- Divulgadores/coaches: **Greg Nuckols** (Stronger by Science), **Milo Wolf, PhD**, **Dr. Pak**, **Jeff Nippard**, **Menno Henselmans**, **Layne Norton, PhD**, **Max Lugavere**.
- Apps de referencia (UX/algoritmo): **MacroFactor** (TDEE dinámico), **Fitia** (LATAM/peruano), **Cal AI** (foto→macros), **MyFitnessPal**, **Noom** (adherencia), **Hims & Hers / Eucalyptus** (DTC clínico).

> Verificación pendiente (no bloqueante) en `CHECKLIST_HUMANO.md`: enriquecer con búsquedas web y validación clínica
> del Dr. Joseph antes del uso con pacientes.
