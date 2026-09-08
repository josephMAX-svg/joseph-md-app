# PALMERTON v3 · CARDIOLOGÍA + RESPIRATORIO
### Extracto de método del cuaderno NotebookLM "STEP 1 · Palmerton Engine" (295 fuentes) — versión FINAL 08-sep-2026

> **Qué es esto.** Reconstrucción del método de Alec Palmerton (Yousmle) para cardio y respiratorio, hecha
> a partir de las **transcripciones y artículos crudos en disco** (`scratchpad/palmerton_v3/src/`) y
> completada con 3 consultas dirigidas a NotebookLM (08-sep-2026). No es un resumen de patología: es el
> **mecanismo ancla + el disfraz de examen + el error del estudiante** de cada tema.
>
> **Convención de cada bloque:**
> · **ANCLA** = cadena causal como la explica Palmerton (siempre en flechas)
> · **EXAMEN** = pregunta típica y su disfraz
> · **ERROR** = confusión concreta que él señala
> · **FRASE / ANALOGÍA** = literal o mnemónico
> · **VIÑETA** = ejemplo con cifras
>
> **Marcas de fiabilidad (regla anti-alucinación):**
> · ✅ **verificado** contra fuente primaria en disco (transcripción o artículo completo leído)
> · ⚠ **síntesis NotebookLM** (secundaria; plausible pero no verificada línea a línea)
> · ❌ **NO ESTÁ EN EL CORPUS** — NotebookLM lo declaró ausente el 08-sep; no estudiarlo "según Palmerton"

---

## LEYENDA DE FUENTES

| Etiqueta | Fuente real |
|---|---|
| **HY-Cardio1** | *High Yield Cardiology for Shelf Exam & Step 1 + Step 2 CK* (vídeo, 22.900 palabras) ✅ leído íntegro |
| **HY-Cardio2** | *High Yield Cardiology Part 2 \| Shelf Exam, Step 1 & Step 2 CK* (vídeo, 17.750 palabras) ✅ leído íntegro |
| **260-Cardio** | *How 260+ Scorers Master Cardio on the USMLE* (vídeo, 10.250 palabras) ✅ leído |
| **HY-Resp** | *High Yield Respiratory for Shelf Exams & Step 1 + Step 2 CK* (vídeo, 15.600 palabras) ✅ leído íntegro |
| **NucMed-VQ** | *High Yield Nuclear Medicine: PET, SPECT, VQ Scans* (vídeo) ✅ leído (secciones VQ + estrés) |
| **Art-Nernst** | *Equilibrium/Nernst Potential for the USMLE* ✅ artículo completo |
| **Art-IonEKG** | *The USMLE Step 1 Will Require You to Connect Ion Channel Physiology with EKG Findings* ✅ |
| **Art-Antiarr** | *USMLE Step 1 Cheat Sheet: The Ultimate Guide to Antiarrhythmics* ✅ |
| **Art-Digoxina** | *The Secret Connection Between Digoxin, Reversible Cell Damage, and Trousseau's Sign* ✅ |
| **Art-SwanGanz** | *USMLE Step 1 Cheat Sheet: Swan-Ganz catheters, wedge pressure, mitral stenosis, LVEDP* ✅ |
| **Art-MONA** | *MONA (and THROMBINS2) for the USMLEs* ✅ |
| **Art-Eq1** | *The #1 USMLE Cardiology Equation* ✅ |
| **Art-DeltaP** | *The Most Useful USMLE Equation Ever* ✅ |
| **Art-GasAlveolar** | *Alveolar Gas Equation for the USMLE Step 1? Diuretics? You Probably Won't Guess the Connection* ✅ |
| **HY-Surgery** | *High Yield Surgery Review for Step 2 CK & Shelf Exam* ⚠ (citado por NotebookLM, no leído en crudo) |
| **UWorld-Harder** | *Is UWorld Really Harder Than Step 1? A Deep Dive!* ⚠ |
| **ONLY-2026** | *The ONLY Video You Need to Pass the USMLE Step 1 in 2026* ⚠ |
| **Step2-Trap** | *The Step 2 Trap Between Him and an Ophtho Match* ⚠ |
| **Flashcards-GPT** | *ChatGPT Flashcards: Study More, Score Less* ⚠ |
| **NLM-Q1/Q2/Q3** | Consultas dirigidas a NotebookLM el 08-sep-2026 (mecánica ventricular · respiratorio · valvulopatías) |

---

## 0. EL MARCO QUE ATRAVIESA TODO (instalar ANTES de la patología)

**El tatuaje.** Lo repite en los tres vídeos de cardio como núcleo del sistema:

> *"If I were to tattoo anything to my wrist, it would be preload, afterload, contractility, and the equation
> MAP = CO × TPR = HR × SV × TPR."* ✅ (HY-Cardio1, HY-Cardio2, 260-Cardio)

Definiciones suyas, deliberadamente simples: **precarga = "how full the heart is"** · **poscarga = "the
resistance the heart is pumping against"** · **contractilidad = "how much strength does the heart have to
pump"**. ✅ (HY-Cardio2; NLM-Q1)

**Las tres presiones de perfusión** (todas la misma idea: *presión de donde viene − presión de a dónde va*): ✅ (HY-Cardio1)

```
Perfusión (genérica) = P(sistema de origen) − P(sistema de destino)
PPC cerebral   = PAM − PIC
PPC coronaria  = PA diastólica aórtica − LVEDP
```

> *"You don't have to memorize this. You can actually make sense of it. The perfusion pressure on your brain
> is what's the pressure of the blood going to your brain minus the pressure inside your brain. Pretty much it."* ✅ (HY-Cardio1)

**Concepto automático nº 1 de cardio.** *Mareo / presíncope / síncope ⇒ HIPOTENSIÓN, no ictus.*
> *"When you see syncope or presyncope you should be thinking hypotension… in virtually 95–100% of the time.
> That will guide you in the right way."* ✅ (HY-Cardio1)
> **ERROR que describe:** *"lightheadedness is a brain thing → brain pathology → stroke"*. Error del sistema 1.
> El ictus es **déficit neurológico focal súbito**. Regla: *trust but verify*. ✅ (HY-Cardio1)

**Cronología patofisiológica (PC), no análisis frase a frase.**
> *"Your system one is unaware of time."* Hay que **reordenar la viñeta en orden cronológico real**, porque
> el H&P se escribe al revés (motivo de consulta primero, historia social al final). ✅ (HY-Cardio1)
> Ejemplo suyo: la viñeta dice *mareo → dolor de pierna → dolor dorsal → 20 paquetes-año*; el orden real es
> **tabaquismo → cáncer de páncreas + dolor dorsal → TVP → TEP → mareo**. ✅ (HY-Cardio1)

**Juez, no abogado.** El abogado busca el dato que no encaja para descartar la respuesta correcta; el juez
decide por **preponderancia de la evidencia**.
> *"You have to be comfortable emotionally with choosing an answer that doesn't feel perfect… It's actually
> expected that you choose an imperfect answer."* ⚠ (Step2-Trap, vía NLM-Q3)
> Caso citado: el alumno descartó insuficiencia cardíaca **porque había un S4** ("no es clásico de la
> dilatada") ignorando JVD + crepitantes; la respuesta era amiloidosis cardíaca. ⚠ (Step2-Trap)

**Los valores normales SÍ se memorizan.**
> *"The problem with looking at the lab values is that it takes time. Every second you spend looking at lab
> values is another second you're not spending interpreting a sentence."* Exige de memoria:
> **PCO2 = 40 · HCO3 = 24 · pH 7,35–7,45**. ✅ (HY-Resp)

---

# PARTE I · CARDIOLOGÍA

## 1. Potenciales de equilibrio (Nernst) — el cimiento

### ANCLA ✅ (Art-Nernst)

```
Vm = voltaje INTRA − voltaje EXTRA   (este signo es la fuente de casi toda la confusión)
Mayoría de K+  = INTRAcelular  (el K+ "normal" 4,0 mEq del CHEM-7 mide el EXTRAcelular)
Mayoría de Na+ = EXTRAcelular  (Na+ "normal" 140 mEq)
Abro canales de K+ → K+ sale a favor de gradiente → deja carga NEGATIVA dentro
   → esa negatividad tira del K+ hacia dentro (gradiente eléctrico)
   → el flujo PARA cuando gradiente químico (sale) = gradiente eléctrico (entra)
   → ese voltaje = potencial de equilibrio = potencial de NERNST
```

El reposo de una célula típica ≈ Nernst del K+ **porque en reposo la mayoría de canales abiertos son de K+**. ✅

**Regla que se deduce, no se memoriza** ✅ (Art-Nernst): Nernst positivo (Na+, Ca++) ⇒ el ion está
mayoritariamente **fuera**. Nernst negativo (K+) ⇒ está mayoritariamente **dentro**.
**Excepción conceptual del Cl−:** su Nernst es negativo y sin embargo está mayoritariamente **fuera** — porque
al entrar (es anión) genera negatividad interna.

### EXAMEN ✅
"Si abro los 4 tipos de canal a la vez, ¿qué iones ENTRAN?" → **Na+, Ca++ y Cl− entran; K+ sale.**
Trampa: el estudiante agrupa por carga (cationes dentro, aniones fuera) en vez de por gradiente.

### ERROR ✅
No fijar primero **Vm = dentro − fuera**. Comentario real bajo el artículo: *"It would be helpful to remind us
of this initially since I thought it was the opposite and was very confused"* — y Palmerton lo acepta.

### FRASE ✅
> *"It does NOT stop when the K+ concentrations are equal on both sides (it will stop much sooner than this)."*

---

## 2. Potenciales de acción cardíacos: miocito vs nodo — "REMOVE INACTIVATION"

### ANCLA ✅ (Art-IonEKG, Art-Antiarr)

```
Tejido NO nodal tiene el rectificador de entrada I_K1
   → muchos canales de K+ abiertos en reposo → Vm ≈ −90 mV (cerca del Nernst del K+)
   → a −90 mV se RETIRA la inactivación de los canales rápidos de Na+ → quedan disponibles
   → fase 0 rápida dependiente de Na+ → QRS estrecho, conducción veloz
Tejido NODAL (SA/AV) CARECE de I_K1
   → reposo ≈ −60 mV → los canales de Na+ quedan PERMANENTEMENTE inactivados
   → el nodo TIENE canales de Na+ pero NO PUEDE USARLOS
   → fase 0 lenta por canales de Ca++ tipo L (el Ca++ no tiene esa regulación) → PR, filtro AV
```

**Fases del miocito ventricular (5) y el fármaco de cada una** ✅ (Art-Antiarr):

| Fase | Canal | ECG | Fármaco |
|---|---|---|---|
| 0 | Na+ rápidos abren | QRS | **Clase I** aplana la pendiente |
| 1 | Na+ cierran + K+ transitorio (Ito) | — | — |
| 2 (meseta) | Ca++ tipo L entra ≈ K+ sale → cambio neto ≈ 0 | **segmento ST (plano)** | Clase IV / II bajan el Ca++ |
| 3 | K+ lentos abren, Ca++ cierra | **onda T** | **Clase III / IA** bloquean K+ |
| 4 | I_K1 domina, reposo estable −90 mV | — | — |

**Fases del nodo (solo 3: 0, 3, 4)** ✅ (Art-Antiarr): fase 0 = Ca++ tipo L · fase 3 = inactivación del Ca++ +
apertura de K+ · fase 4 = canales "leaky" de Na+/Ca++ → despolarización espontánea = **automatismo**.

- **La FRECUENCIA la fija la PENDIENTE de la fase 4 del nodo SA.**
- **La VELOCIDAD DE CONDUCCIÓN AV la fija la fase 0 del nodo AV** — porque el nodo AV no se despolariza
  espontáneamente: lo dispara la aurícula. ✅ (Art-Antiarr)

**Canal exclusivo del nodo: I_K,ACh (IKG).** ACh se une → eflujo de K+ → hiperpolarización → hace falta más
entrada de cationes para llegar al umbral → **conducción AV más lenta y FC más baja**. ✅ (Art-Antiarr)

### EXAMEN ✅
Miocito ventricular y célula del nodo SA + bloqueador selectivo de Na+ rápido: la fase 0 del miocito se aplana,
la del nodo SA no cambia. Preguntan por qué.

### ERROR ✅
Decir en absoluto que "el nodo no tiene canales de sodio". Los tiene; a −60 mV no puede des-inactivarlos.

### FRASE ✅
> *"In order to activate Na+ channels generally in the heart, you must first REMOVE INACTIVATION from them
> (double-negative, I'm sorry)."* (Art-IonEKG · Art-Antiarr)

Tarjeta Anki que el propio Palmerton aplaudió en comentarios ✅ (Art-IonEKG):
*Front:* "Na⁺ vs Ca²⁺ — usa los voltajes de repolarización para explicar cuál conduce por el nodo AV."
*Back:* Ca²⁺ — el nodo AV carece de I_K1 → Vm ≈ −60 mV; los canales de Na⁺ necesitan ≈ −90 mV para recuperarse
de la inactivación; los de Ca²⁺ se recuperan a −50/−60 mV → siguen operativos.

### VIÑETA ✅
Registro intracelular: miocito ventricular con reposo estable **−90 mV** y fase 0 de pendiente pronunciada; al
pasar el microelectrodo al nodo SA, reposo **−58 mV** y fase 0 lenta. Un bloqueador de Na+ rápido abole la
primera y no altera la segunda.

---

## 3. ECG: velocidades, QRS ancho/estrecho, WPW, FA vs FV

### ANCLA · velocidades de conducción ✅ (Art-IonEKG)

```
Purkinje 2,2 m/s  >  aurícula 1,1 m/s  >  ventrículo 0,3 m/s  >  nodo AV 0,03 m/s
Orden: SA → aurícula → nodo AV → His-Purkinje → ambos ventrículos a la vez
Las aurículas despolarizan el nodo AV por UNIONES GAP (citoplasma conectado, paso directo de iones)
```

**Por qué el nodo AV es lento (diseño, no defecto)** ✅ (HY-Cardio1):
> *"It's really slow through that AV node in order to allow time for the ventricles to fill after the atria
> have contracted."*

**QRS ancho vs estrecho** ✅ (Art-IonEKG): el QRS mide *cuánto tarda* en despolarizarse todo el ventrículo.
Por His-Purkinje (2,2 m/s) → **estrecho**. Miocito a miocito por uniones gap (0,3 m/s) → **ancho** (bloqueo de
rama, foco ectópico ventricular, WPW).

**WPW** ✅ (Art-IonEKG): haz de Kent = puente muscular que **salta el retraso del nodo AV**.

```
Pre-excitación por vía accesoria (miocito a miocito, LENTA)
   → PR CORTO (< 120 ms; la figura del artículo usa 0,1 s = 100 ms)
   → ONDA DELTA = ascenso empastado inicial del QRS (esa parte va lenta)
   → QRS ANCHO (160 ms en la figura) porque hay DOS frentes: el accesorio lento + el His-Purkinje rápido
```

**FA vs ritmo sinusal — la analogía del estanque** ✅ (Art-IonEKG):
> *"During normal cardiac depolarization, it is like having a still pond, and having a single stream of drops,
> dropping into the same place at a regular rate… Atrial fibrillation is like having a rainstorm, whereby LOTS
> of drops are falling all over the pond, causing mini ripples throughout the pond, but NOT a single ripple
> that will move through the entire pond."*

**Control de frecuencia — la analogía del castillo de arena** ✅ (Art-IonEKG):
El nodo AV es un **castillo de arena en la playa**; cada onda (despolarización auricular) que lo alcanza puede
lanzar un latido. En FA llegan cientos. Un BCC / β-bloqueante / digoxina es **levantar un muro delante del
castillo**: solo pasan las olas más grandes → menos QRS → FC más baja.
Para que una onda "pase" hacen falta 2 cosas: (1) alcanzar el umbral del nodo AV y (2) que el nodo **no** esté
en refractario absoluto. ✅

**¿Qué es peor, FA o FV?** ✅ (Art-IonEKG, HY-Cardio2)
> *"In atrial fibrillation, once you get an action potential in the AV node, conduction progresses normally and
> you will have full, synchronous depolarization of your ventricle."*
Cuantificado en HY-Cardio2: **la patada auricular es ~20 % de la precarga ventricular; la contracción
ventricular es el 100 % del volumen sistólico** → el ventrículo se llena pasivamente sin aurícula; si el
ventrículo fibrila, estás muerto. ✅

### ERROR ✅
Confundir **despolarización** con **contracción**: *"it is technically depolarization, NOT contraction,
although contraction happens as a result of this depolarization"* (Art-IonEKG).

---

## 4. Antiarrítmicos: mapa clase → fase → intervalo

### ANCLA ✅ (Art-Antiarr)

| Clase | Diana | Efecto | Intervalo del ECG |
|---|---|---|---|
| **I** (IB lidocaína, IC flecainida) | Na+ | aplana fase 0 **solo en tejido NO nodal** | **QRS ancho** |
| **IA** | Na+ **y K+** | aplana fase 0 + retrasa fase 3 | QRS ancho **+ QT largo** |
| **II** β-bloq | receptor β | ↓ AMPc → ↓ pendiente fase 4 nodal y ↓ fase 0 nodal | **PR largo** |
| **III** | K+ | retrasa fase 3 | **QT largo → torsades** |
| **IV** BCC no-DHP | Ca++ tipo L | ↓ fase 4 y fase 0 nodal | **PR largo** |

### EXAMEN ✅
"Clase III: efecto principal sobre los intervalos y qué riesgo aumenta" → **QT prolongado → TORSADES DE
POINTES** (*"you MUST know this for Step 1"*).
Segunda clásica: "los BCC afectan qué intervalo y por qué" → **PR**, porque enlentecen la fase 0 del nodo AV →
tarda más entre P (aurícula) y QRS (ventrículo).

### ERROR ✅
Aplicar la clase I al nodo. **Los antiarrítmicos de clase I casi no hacen nada en el nodo** porque el nodo no
usa Na+ en la fase 0. Ese es literalmente el sentido de la pregunta.

### ANCLA · ACh sobre el nodo AV ✅ (Art-Antiarr)

```
ACh → receptor M2 (Gi) → ↓ adenilato ciclasa → ↓ AMPc → ↓ PKA
   + apertura de canales I_K,ACh → ↑ eflujo de K+ → HIPERPOLARIZACIÓN
   → hace falta más influjo de cationes para el mismo grado de despolarización
   → conducción AV más lenta + FC más baja → PR PROLONGADO
```

### Nota clínica ⚠
Corazón trasplantado = **denervado**: las maniobras vagales no funcionan; si los receptores postsinápticos
están intactos, el tono autonómico aún se puede manipular farmacológicamente.

---

## 5. Digoxina, Na+/K+ ATPasa, K+, Ca++ y el signo de Trousseau

### ANCLA · inotropismo ✅ (Art-Digoxina)

```
Na+/K+ ATPasa: 3 Na+ FUERA / 2 K+ DENTRO, con ATP (mueve ambos CONTRA gradiente)
Digoxina bloquea la ATPasa uniéndose AL SITIO DE UNIÓN DEL K+ (compiten por el mismo sitio)
   → ↑ Na+ intracelular → cae el gradiente de Na+
   → el intercambiador Na+/Ca++ (que usa la entrada de Na+ como energía) saca menos Ca++
   → ↑ Ca++ intracelular → ↑ CONTRACTILIDAD
```

### ANCLA · hipopotasemia ✅ (Art-Digoxina)

```
K+ ↓ → menos competidor en el sitio → la digoxina se une con más fuerza
   → POTENCIACIÓN de sus efectos = TOXICIDAD
"BEWARE DIGOXIN TOXICITY IN HYPOKALEMIA"   ← inhibición competitiva, no un hecho suelto
```

### ANCLA · la cadena membrana ↔ clínica (la joya del artículo) ✅ (Art-Digoxina)

```
Hiperpotasemia → menos gradiente de K+ → Vm MENOS negativo → más CERCA del umbral → dispara más fácil
   → riesgo de arritmia VENTRICULAR (FV/TV: "las arritmias que te matan empiezan en el ventrículo")
   → se da Ca++ porque el Ca++ SUBE EL UMBRAL de despolarización (no es "para el nodo")
Hipercalcemia → umbral más alto → cuesta despolarizar → fatiga, letargo, debilidad, arreflexia, coma
Hipocalcemia  → umbral más bajo → hiperexcitabilidad neuromuscular → Chvostek y Trousseau

TROUSSEAU explicado por física de membrana:
Manguito de PA inflado → isquemia transitoria → ↓ ATP → ↓ Na+/K+ ATPasa → despolarización de la membrana
   → en un hipocalcémico la célula YA estaba cerca del umbral → se dispara el PA → ESPASMO CARPAL
```

**Bonus de la misma cadena** ✅: la histología de la isquemia **reversible** es **tumefacción celular**, porque
la ATPasa saca 3 iones y mete 2; si se para, se acumulan iones dentro → entra agua.

### EXAMEN / VIÑETA ⚠
Paciente en digoxina + diurético, con xantopsia (halos amarillo-verdosos), náuseas, confusión y extrasístoles;
**K+ 2,8–3,1 mEq/L**; preguntan el mecanismo íntimo → **inhibición competitiva en el sitio del K+**.
ECG: bigeminismo ventricular, **PR 0,24 s** (normal < 0,20 s). *(viñeta de síntesis, no literal del artículo)*

---

## 6. Ecuación nº 1: PAM = GC × RPT, barorreceptores y preguntas de flechas

### ANCLA ✅ (Art-Eq1)

```
PAM = GC × RPT ,  GC = FC × VS
↓PA → ↓disparo de barorreceptores → ↑simpático
        β1: ↑FC y ↑contractilidad → ↑GC
        α1: vasoconstricción      → ↑RPT
↑PA → ↑disparo → ↓simpático → ↓FC + vasodilatación
```

**Regla de oro para las preguntas de flechas** ✅ (Art-Eq1):
> *"Reflexes never overcompensate. If blood pressure drops, the reflex will bring it back toward normal —
> but it won't overshoot."*
Procedimiento en 3 pasos: (1) identificar el cambio inicial, (2) deducir la respuesta refleja, (3) responder
por el **cambio NETO** (la PAM sigue baja aunque FC y RPT hayan subido).

### ANCLA · síncope ortostático (lo que hace repetir "cada vez que te levantas") ✅ (HY-Cardio1)

```
Ponerse de pie → acumulación venosa en piernas → ↓ retorno venoso
   → ↓ LVEDV (precarga) → ↓ VS → ↓ GC → ↓ PAM
   → ↓ PPC (= PAM − PIC) → hipoperfusión cerebral → mareo / síncope
   → normalmente el barorreflejo lo compensa… salvo que esté roto (neuropatía autonómica diabética)
```

> *"The time to practice this is when you're NOT in a timed setting — when you're exercising, when you get up
> from a seated position, when you get up from bed."* ✅ (HY-Cardio1, 260-Cardio)

### EXAMEN ✅ (HY-Cardio1)
Diabético de **20 años de evolución**, insuficiencia renal, hormigueo en manos y pies, mareo al levantarse.
Preguntan el mecanismo → **neuropatía autonómica → disfunción del barorreflejo**.
**Disfraz:** "insuficiencia renal" y "hormigueo" parecen distractores; en realidad solo dicen *"esta diabetes
es muy mala"* → si hay nefropatía y neuropatía periférica, es razonable que haya autonómica.

### ERROR ✅
Recitar la fisiología normal completa del barorreflejo en un examen cronometrado. Nivel correcto en el test:
*"diabetes → neuropatía autonómica → disfunción barorreceptora → hipotensión ortostática"*. Punto.

---

## 7. La ecuación más útil de todas: ΔP = Flujo × Resistencia

### ANCLA ✅ (Art-DeltaP, Art-SwanGanz)

```
P1 − P2 = Flujo × Resistencia        (P1 = aguas arriba, P2 = aguas abajo)
Si SUBE la resistencia y hay que mantener el flujo:
   → la presión se ACUMULA detrás (P1 ↑) y CAE delante (P2 ↓) → y el flujo total cae igualmente
```

### FRASE / ANALOGÍA ✅ (Art-DeltaP)
> *"If you're watering your garden… What happens if you kink the hose? You're increasing resistance. The
> pressure builds up behind the kink (increased P1), drops beyond it (decreased P2), and ultimately reduces
> flow."*

### APLICACIONES QUE ÉL MISMO ENUMERA ✅ (Art-DeltaP)

| Cuadro | Qué es el "flujo" | Cómo se lee |
|---|---|---|
| **ERGE** | contenido gástrico hacia el esófago | hernia hiatal = ↓ resistencia · obesidad = ↑ P1 · comida copiosa / gastroparesia = ↑ volumen → ↑ P1 · elevar cabecera = ↑ resistencia (cuesta arriba) · perder peso = ↓ P1 |
| **Estenosis mitral** | flujo AI→VI | ↑ resistencia valvular → ↑ presión en AI (P1) → disnea y fatiga por ↓ GC en esfuerzo |
| **Úlcera por presión / isquemia traqueal por neumotaponamiento** | flujo capilar | presión externa → ↑ resistencia local → ↓ flujo → necrosis |
| **Síndrome compartimental** | flujo tisular | edema en compartimento cerrado → ↑ presión tisular → ↑ R **o** ↑ P2 → ↓ flujo → más edema (círculo) → **fasciotomía** |

### ERROR ✅ (Art-SwanGanz)
> *"Many students believe that an increase in Left Atrial pressure is the CAUSE of mitral stenosis. No! The
> primary parameter affected is RESISTANCE. The elevated Left Atrial pressure is merely an EFFECT of having
> that resistance increased to maintain flow."*

### Isquemia por presión — el modelo cuantificado ✅ (HY-Cardio2)

```
Presión externa AL VASO (no necesariamente externa al cuerpo)
   → comprime capilares y flujo arterial → isquemia → necrosis
Presión capilar media ≈ 16 mmHg (extremo arterial 20-30)
Presión del neumotaponamiento del tubo endotraqueal ≈ 20 mmHg o más → puede superar la capilar
"No hay UN número": isquemia = f(presión × tiempo).
   Poca isquemia mucho tiempo ≈ mucha isquemia poco tiempo.
2 semanas de intubación = umbral de preocupación; 3 semanas = estenosis traqueal / traqueomalacia.
```

**Viñeta literal que él lee "a la velocidad real de examen"** ✅ (HY-Cardio2):
> Mujer de **45 años**, 4 meses de disnea progresiva y sibilancias intermitentes. Hace **8 meses** estuvo
> intubada y ventilada **2 semanas** por síndrome de Guillain-Barré. No toma medicación. SatO2 **97 %** en aire
> ambiente. **Estridor espiratorio agudo** sobre el tórax anterior. Sin crepitantes.
> → Cadena: intubación prolongada → cuff → isquemia por presión → daño del cartílago → traqueomalacia /
> estenosis traqueal → como el cuff queda **intratorácico** (≈3 cm de la carina) → colapso **espiratorio**.

---

## 8. Resistores en serie vs en paralelo — el concepto que "da ojos nuevos"

### ANCLA ✅ (HY-Cardio1, 260-Cardio)

```
SERIE   : R_total = R1 + R2 + R3       → QUITAR un resistor ⇒ R_total BAJA
PARALELO: 1/R_total = 1/R1 + 1/R2 + …  → QUITAR un resistor ⇒ R_total SUBE  ← contraintuitivo, es la clave

Demostración numérica que hace en clase: 3 resistores de 2 en paralelo → R_total = 2/3
Quito uno → 1/R = 1/2 + 1/2 → R_total = 1.   (De 0,67 a 1: SUBIÓ.)
```

> *"Everyone remembers this side of the equation. No one remembers this side. It's actually 1/R_total. And
> I've made this mistake multiple times."* ✅ (HY-Cardio1)

### Tabla de aplicaciones que recorre una por una ✅ (HY-Cardio1)

| Escenario | Serie/paralelo | RPT / poscarga | GC |
|---|---|---|---|
| **PDA** (aorta→AP) | añade paralelo | ↓ | **↑** |
| **Fístula AV** (diálisis, traumática) | añade paralelo | ↓ | **↑** (IC de alto gasto) |
| **Cierre de CIV con parche** | quita paralelo | **↑** | **↓** (caída aguda de FE/GC post-op) |
| **Nefrectomía (quitar un riñón)** | quita paralelo | **↑** | **↓** |
| **TEP en la arteria pulmonar derecha** | quita paralelo (circuito pulmonar) | **RVP ↑↑** | ↓ |
| **Aorta torácica → abdominal** | serie | — | — |
| **Coartación aórtica** | resistor en serie en el arco | ↑ P1 arriba (HTA en brazos), ↓ P2 abajo (femorales débiles) | — |

### EXAMEN ✅ (HY-Cardio1)
Niño post-cirugía de cierre de CIV con caída transitoria de FE/GC. **ERROR que describe:** el estudiante entra
en pánico *"porque ese escenario exacto no estaba en el First Aid"*. No es memoria: es **un solo concepto con
10 disfraces**.
> *"I don't care that you get the right answer. I care that you understand how to apply the concept."* ✅

### FRASE ✅
> *"The true voyage of discovery is not in seeking new lands, but in having new eyes"* — cita de Proust que usa
> literalmente para explicar por qué modelar vasos como resistores cambia el examen. (HY-Cardio1)

### Calibrado TEP grande vs pequeño ✅ (HY-Cardio1)
> *"A small PE is likely only to remove a very small resistor… A large PE — if you knocked out the right
> pulmonary artery, that's a huge resistor."*
TEP pequeño → dolor pleurítico e hipoxemia. TEP grande → cambio hemodinámico, mareo, síncope.
**Corolario metodológico que sale aquí:** *"the lack of a symptom doesn't necessarily mean that it's not
there"* — si no te dan la frecuencia respiratoria, **no tienes un negativo pertinente**; no descartes por eso. ✅

---

## 9. Bloqueos AV, jerarquía de marcapasos y la RCA

### ANCLA · jerarquía de marcapasos ✅ (HY-Cardio1)

```
Quito el nodo SA → ¿el corazón se para? NO: hay marcapasos de respaldo.
Orden de relevo: AURÍCULA → nodo AV → ventrículo
¿Por qué la aurícula primero? Porque MANDA quien tiene la PENDIENTE DE FASE 4 MÁS EMPINADA:
   llega antes al umbral → dispara antes → despolariza al resto antes de que los demás lleguen al suyo.
Ritmo de escape ventricular = 20-40 lpm → catastrófico para el GC.
```

### ANCLA · bloqueo AV completo ✅ (HY-Cardio1)

```
Ateroesclerosis de la RCA → ruptura de placa → trombo
   → isquemia del NODO AV (la RCA lo irriga en ~90 % de la gente)
   → aurículas y ventrículos laten INDEPENDIENTES (bloqueo de 3.er grado)
   → el pulso lo marca el VENTRÍCULO (30-42 lpm)
   → ↓ FC → ↓ GC → ↓ PAM → ↓ PPC = PAM − PIC → SÍNCOPE
```

Anatomía que exige automática ✅: **derivaciones inferiores = II, III, aVF** · pared inferior irrigada por la
**descendente posterior**, rama de la **RCA en los dominantes derechos** (~2/3 de la gente; para el examen,
"casi siempre RCA"). La RCA también da ramas al **nodo SA (~60 %)** y al **nodo AV (~90 %)**.

**Tres complicaciones para las que hay que "encender la antena" en todo IAM inferior** ✅ (HY-Cardio1):
1. **Fallo del VD** → insuficiencia cardíaca derecha aislada (→ **PCWP BAJA**);
2. **Isquemia del nodo SA** → bradicardia sinusal;
3. **Isquemia del nodo AV** → bloqueo AV, hasta 3.er grado.

### Cómo se lee el trazado ✅ (HY-Cardio1)
FC = **300 / nº de cuadros grandes entre latidos**. En su ejemplo: **P a ~100 lpm** (3 cuadros grandes) y
**QRS a ~42 lpm** (≈7 cuadros grandes), disociados.
> *"It's like one of those magic eye puzzles. Once you see it, you can't unsee it."*
Truco visual: hay **ondas P enterradas dentro de las T y de los QRS** — hay que ir a buscarlas.
Detalle fino: la frecuencia auricular está **alta (100)** porque el paciente está hipotenso y con tono
simpático disparado. ✅

### ERROR ✅ (HY-Cardio1) — el capítulo entero es una lección sobre sesgos
**Anclaje + sesgo de confirmación.** El alumno lee "HTA mal controlada + diabetes" y ancla en *neuropatía
autonómica* o *hipertrofia ventricular izquierda*; ambas explicarían el síncope, pero **ninguna explica la
bradicardia ni el ECG** — y el alumno **se salta el ECG**.
> *"You ignore the evidence that goes against what you're thinking and you only look for the evidence that
> shows it."*
Solución que propone: no es "leer distinto el día del examen", es **haber generado más cronologías
patofisiológicas antes**, para tener 5-6 hipótesis disponibles en vez de una.
> *"If you get to an exam question and you're like 'gosh, I don't understand what they're telling me' — that's
> not a problem on the day of your test, that's a problem in your preparation."* ✅ (HY-Cardio2)

### EXAMEN ✅
Anciano diabético con síncope; muestran el trazado y preguntan **la arteria ocluida** → **RCA**.
Segunda pregunta clásica: **PCWP en un IAM inferior con afectación del VD** → **BAJA** (fallo derecho → menos
flujo pulmonar → menos presión en AI → menos wedge).
Tercera: **¿tratamiento del bloqueo de 3.er grado?** → marcapasos **VENTRICULAR**.
*ERROR clásico:* responder "marcapasos del nodo SA" — no resuelve nada, porque el problema es la
**conducción**, no el origen del impulso. ✅

### VIÑETA ✅
Varón de **63 años**, HTA y DM2 mal controladas, 2 meses de episodios de desmayo y fatigabilidad. ECG: P
regulares a **100 lpm**, QRS regulares e independientes a **~42 lpm**, R-R constante de **7 cuadros grandes**.
→ IAM de RCA → isquemia del nodo AV → bloqueo completo → bradicardia sintomática → síncope **sin pródromo**
("unheralded syncope", frente al vasovagal, que avisa con diaforesis y mareo previos). ✅

---

## 10. Isquemia y síndrome coronario agudo

### ANCLA · el núcleo ✅ (Art-MONA)
> *"The Core Concept behind ACS is: **Ischemia = Demand > Supply**."*

```
↑ Demanda (dolor + descarga simpática → ↑FC, ↑contractilidad)   Y/O
↓ Oferta  (ruptura de placa → trombo → ↓ flujo coronario)
```

### ANCLA · estable vs inestable ✅ (HY-Cardio2)

```
ANGINA ESTABLE      : estenosis coronaria FIJA. En reposo la oferta basta.
                      Esfuerzo/enfado → ↑demanda > oferta → dolor. Reposo o nitroglicerina → cede.
ANGINA INESTABLE/IAM: RUPTURA DE PLACA → trombo → oferta insuficiente INCLUSO EN REPOSO → dolor en reposo.
```

> *"This is probably the most valuable thing I learned in internal medicine: when someone comes in with chest
> pain and it's cardiac, you have to ask yourself — **did a plaque rupture or not?** That's really the
> stratification scheme you need to use."* ✅ (HY-Cardio2)

### ERROR ✅ (HY-Cardio2, HY-Cardio1)
Creer que el IAM es el crecimiento lento de la placa hasta el 100 %:
> *"That's not how it works. You have a plaque rupture… maybe it wasn't narrowed in the first place and you had
> a plaque rupture in a previously non-stenotic artery."*
Segundo error, terminológico, que corrige en directo: **arteriosclerosis** = arterias duras; **ateroesclerosis**
= la placa grasa → esa es la que infarta.
Tercero: creer que el trombo "viaja" como un émbolo. *"It ruptures and then boom — immediately there's a clot",*
justo ahí, no viaja. ✅

### MONA (Hep B) y THROMBINS2 — todo se deduce de oferta/demanda ✅ (Art-MONA)

| | Efecto | Mecanismo |
|---|---|---|
| **M**orfina | Demanda ↓ | analgesia → ↓ dolor/ansiedad → ↓ tono simpático → ↓ demanda |
| **O**xígeno | Oferta ↑ | ↑ contenido de O2 de la sangre |
| **N**itroglicerina | Demanda ↓ | venodilatación (piernas) → pooling → ↓ retorno venoso → ↓ precarga → ↓ estiramiento → **↓ tensión de pared** → ↓ demanda |
| **A**spirina | Oferta ↑ | frena la extensión del trombo coronario |
| **Hep**arina | Oferta ↑ | ídem |
| **B**eta-bloqueante | Demanda ↓ | ↓ FC y contractilidad |

**THROMBINS2** ✅ (Art-MONA): **T**ienopiridinas (clopidogrel, prasugrel) · **H**eparina/enoxaparina ·
**R**AAS (IECA/ARA-II: ↓AT-II → ↓poscarga → ↓demanda) · **O**xígeno · **M**orfina · **B**eta-bloqueante ·
**I**ntervención (stent/CABG = revascularización → oferta ↑) · **N**itroglicerina · **S**tatina/**S**alicilato.
Dato del artículo: *cardiología = hasta **9 % del Step 1** y **10 % del Step 2 CK***. ✅

### La controversia que él sí discute ✅ (HY-Cardio2)
MONA fue estándar en los 80. Hoy: el **oxígeno** en el no hipoxémico no ha demostrado beneficio (el aumento
marginal del contenido de O2 es despreciable); con **morfina** hubo señales de peores desenlaces; nitratos y
β-bloqueantes: **mucho cuidado en el hipotenso**.

### ANCLA · el "death spiral" izquierdo — el concepto de élite ✅ (HY-Cardio2)

```
PPC coronaria = PA diastólica aórtica − LVEDP
   (las coronarias llenan en DIÁSTOLE porque se hunden en el miocardio y se comprimen en sístole)

Doy un hipotensor en un IAM izquierdo:
   ↓ PA diastólica (↓P1)   Y   ↑ LVEDP por fallo de bomba (↑P2)
   → ↓↓ PPC coronaria → MÁS isquemia → ↓ contractilidad → ↓ VS → ↓ GC → ↓ PAM
   → ↓ PA diastólica otra vez … → FIBRILACIÓN VENTRICULAR
```

> *"This is what terrifies anesthesiologists. If you have a left main stenosis and it's really bad, you worry
> about getting a little bit of hypotension because they can die — the death spiral."* ✅ (HY-Cardio2)
Salida terapéutica que menciona: **fenilefrina** (α1) para subir la diastólica y recuperar la PPC. ✅
**La taquicardia es el otro asesino de la PPC** ⚠ (NLM-Q1): al subir la FC el ciclo se acorta **a expensas de
la diástole** → menos tiempo de perfusión y más demanda. Por eso en isquemia se **frena** el corazón, al revés
que en casi cualquier otro órgano ✅ (NucMed-VQ: *"you want to slow down the heart in ischemia — you'll decrease
demand but you'll also increase supply, as long as you maintain the blood pressure"*).

### VIÑETA ✅ (HY-Cardio2)
Varón con enfermedad coronaria y angina estable → ruptura de placa en la **DA** → **STEMI anterior** → le
administran **metoprolol** → cae la PA diastólica → cae la PPC → más isquemia → **FV** → hipotenso e
inconsciente.

### La contraindicación estrella ✅ (HY-Cardio1, HY-Cardio2)

```
ST elevado en II, III, aVF  →  sospecha de IAM del VD  →  NO NITRATOS
El VD infartado es ESTRICTAMENTE dependiente de precarga: sin precarga no empuja sangre por el pulmón
   → nitrato → venodilatación → ↓precarga → colapso
Manejo correcto en el examen: pedir un ECG de derivaciones DERECHAS antes de decidir.
Matiz que añade el alumno y él valida: II-III-aVF no es exclusivo de la RCA; puede ser circunfleja.
```

**VIÑETA** ⚠ (NLM-Q1): varón de **56 años**, dolor opresivo de **3 h** paleando nieve, diaforesis, **JVD**,
**pulmones limpios**, FC **42 lpm**, PA **90/50**, ST **+1,5 mm en II, III, aVF** → nitroglicerina = catástrofe.

### Prueba de esfuerzo — para qué existe ✅ (NucMed-VQ)

```
En angina ESTABLE, en reposo NO se ve isquemia (la oferta basta) → ECG y gammagrafía en reposo pueden ser normales
   → hay que PROVOCAR la demanda: cinta (si puede moverse) o DOBUTAMINA (β1: ↑FC + ↑contractilidad)
   → solo entonces aparece el defecto
Química (dobutamina) si: artrosis, cadera rota, IC avanzada, incapacidad de ejercicio.
Gammagrafía de perfusión miocárdica = SPECT (cortes) con tecnecio (el más común) o talio.
```

### Complicaciones mecánicas por tiempo ⚠

| Ventana | Histología | Complicación temida |
|---|---|---|
| **0-24 h** | necrosis de coagulación, bandas de contracción; a las 24 h llegan **neutrófilos** | **arritmias ventriculares letales (FV/TV)** |
| **1-3 días** | infiltrado neutrofílico pleno | pericarditis fibrinosa |
| **3-7 días** | **macrófagos** fagocitan → miocardio blando y débil | **rupturas**: pared libre → hemopericardio/taponamiento · músculo papilar (**póstero-medial**, RCA) → IM aguda + edema pulmonar → **PCWP muy alta** · septo → CIV con **salto oximétrico en el VD** |
| **semanas** | fibroblastos → colágeno → cicatriz fibrosa | aneurisma, IC crónica |

**EXAMEN** ⚠: IAM inferior de hace **4 días** + disnea brusca + esputo asalmonado + **soplo holosistólico
apical 4/6 irradiado a axila** → ruptura de músculo papilar → **PCWP muy elevada**.
*ERROR:* confundirlo con ruptura septal — el soplo **apical** con crepitantes orienta a papilar; el salto
oximétrico en el VD orienta a septal.

---

## 11. Insuficiencia cardíaca: izquierda vs derecha y "pulmones limpios"

### ANCLA · qué es "fallo" ✅ (HY-Cardio1)
> *"It's if you can't meet the body's blood demand, **and/or** you need excessive volume or pressure to do it
> adequately."*
El paciente con JVD hasta el lóbulo de la oreja **sí** perfunde… al precio de una congestión brutal. Sigue
siendo fallo.

### ANCLA · concepto automático nº 2 ✅ (HY-Cardio1)

```
CASI TODOS los "signos de insuficiencia cardíaca" son signos de fallo DERECHO:
   JVD · hepatomegalia · esplenomegalia · ascitis · edema en MMII
El único signo de fallo IZQUIERDO que la viñeta puede darte es el PULMÓN (crepitantes) — o la PCWP.
   ⇒ Signos derechos + PULMONES LIMPIOS = FALLO DERECHO AISLADO
   ⇒ "A veces esa es literalmente la única pista que te van a dar, y así se responde la pregunta."
```

> *"Anytime that they give you signs of heart failure you want to listen to the lungs — both in real life and
> especially in the vignette."* ✅ (HY-Cardio1)

### ANCLA · edema de MMII ✅ (HY-Cardio1)

```
Fallo derecho → la sangre no avanza → se acumula ventrículo → aurícula → sistema venoso
   → ↑ presión venosa → ↑ presión HIDROSTÁTICA CAPILAR (el capilar es la pared fina, no la vena)
   → filtración → EDEMA con fóvea en zonas declives
```

Corrección fina que hace en directo: no se dice "aumento de poscarga" a secas, hay que decir **"poscarga del
corazón derecho"**. ✅

### ERROR ✅
Ver "pulmones limpios" y traducirlo como *"no hay neumonía"* (irrelevante) en vez de *"no hay fallo izquierdo"*.

### EXAMEN ⚠
EPOC de larga evolución, edema bilateral, hepatomegalia dolorosa, PVY **16 cm H2O**, **pulmones limpios**:
¿PCWP? → **normal o baja** (cor pulmonale aislado). El estudiante marca "elevada" porque asume ICC global.

### Fármacos que reducen mortalidad ⚠
IECA / ARA-II / espironolactona (↓ poscarga y frenan el remodelado) y **β-bloqueantes** (carvedilol, metoprolol
succinato). El argumento: la compensación neurohormonal crónica **destruye** el corazón; bloquearla salva
vidas. Solo parece contraintuitivo si se piensa "un corazón débil necesita simpático".

---

## 12. Swan-Ganz, PCWP y LVEDP

### ANCLA · qué mide y por qué ✅ (Art-SwanGanz, HY-Resp)

```
Catéter de arteria pulmonar con BALÓN en la punta y sensor DISTAL al balón.
Vena → AD → VD → arteria pulmonar → rama pequeña.
Balón DESINFLADO → mide presión de arteria pulmonar (PULSÁTIL).
Balón INFLADO    → ocluye la rama → el sensor distal ya no ve el pulso del VD
                 → mide presión capilar pulmonar ≈ presión de vena pulmonar ≈ PRESIÓN DE LA AI
                 → NO PULSÁTIL   ← pregunta fina: ¿pulsátil? No, porque el balón aisló el pulso.
```

**La PCWP estima la LVEDP** porque en condiciones normales la resistencia de la mitral es despreciable → basta
una diferencia mínima de presión AI-VI para llenar en diástole. ✅

### La tabla que hay que poder DEDUCIR (no memorizar) ✅ (Art-SwanGanz)

| Cuadro | PA pulmonar | PCWP | Razonamiento |
|---|---|---|---|
| **HTP primaria** | ↑ | **normal** | el problema es la resistencia ARTERIAL pulmonar; a la vena pulmonar llega igual o menos sangre |
| **Fallo izquierdo** | ↑ | **↑** | sin flujo anterógrado → remanso AI → vena → capilar → arteria |
| **Estenosis mitral severa** | ↑ | **↑** | mismo remanso, pero la PCWP **sobreestima** la LVEDP |
| **IAM del VD / TEP** | — | **↓** | no llega sangre a la izquierda |

### EXAMEN ✅
"¿En qué condición la PCWP es mal estimador de la LVEDP?" → **estenosis mitral** (R alta → P1 sube para
mantener el flujo; la LVEDP puede estar normal o baja).
"¿Puedo diagnosticar estenosis mitral solo con una PCWP alta?" → **No**: solo mides presión de AI, y hay otras
causas de presión auricular izquierda elevada.

### VIÑETA ⚠
Mujer de **34 años** inmigrante, fiebre reumática en la infancia, disnea progresiva en el embarazo, NYHA III:
**PCWP 24-25 mmHg**, PAP 45/20, **LVEDP 6-8 mmHg** → estenosis mitral.

### Rangos hemodinámicos normales (para cuando dan números y no flechas) ⚠
PVC 2-6 mmHg · PCWP 6-12 mmHg · GC 4-8 L/min · IC 2,5-4,2 · RVS 800-1200 dyn·s/cm⁵ · SvO2 60-80 %.

---

## 13. Taponamiento cardíaco y pulso paradójico

### ANCLA · interdependencia ventricular ✅ (HY-Cardio2; el mismo pasaje aparece en HY-Surgery)

```
Líquido en el saco pericárdico → presión intrapericárdica > presiones de llenado
   → COMPRESIÓN EXTERNA de los ventrículos → ↓ precarga → ↓ VS → ↓ presión de pulso → ↓ GC → ↓ PAM

Pulso paradójico (mecanismo exacto, en inspiración):
   ↓ presión intratorácica → ↑ retorno venoso → ↑ llenado del VD
   → el VD NO puede expandirse hacia fuera (el pericardio está lleno de sangre)
   → ABOMBA EL SEPTO HACIA LA IZQUIERDA → comprime el VI
   → ↓ precarga del VI → ↓ VS → ↓ GC → ↓ PAM  → caída exagerada de la PAS
```

**Definición numérica** ✅: pulso paradójico = **caída > 10 mmHg de la PAS en inspiración**. La caída pequeña
es normal; lo patológico es la **exageración**.
> *"Pulsus paradoxus means that you have a drop of 10 mm of mercury on inspiration… it's an exaggeration of the
> normal response."* ✅ (HY-Cardio2)

**Clasificación** ✅: el taponamiento es shock **obstructivo** — *"sometimes tamponade is considered
extracardiac obstructive"*.
**Tríada de Beck** ⚠: hipotensión + ruidos apagados (el sonido se disipa en el líquido) + JVD.
ECG: **alternancia eléctrica** (el corazón oscila dentro del líquido). ⚠

### ERROR ✅ (HY-Cardio2, corrección en directo)
Confundir el mecanismo del pulso paradójico con "obstrucción del tracto de salida del VI" — eso es la
**miocardiopatía hipertrófica obstructiva**, no el taponamiento. (Un alumno propuso además que el septo
comprime el TSVI; Palmerton lo acepta como añadido plausible pero aclara: *"I don't think you need to invoke
it"*.)

---

## 14. Disección aórtica

### ANCLA ✅ (HY-Cardio2)

```
HTA crónica → la sangre rompe la ÍNTIMA → se mete entre íntima y media → LUZ FALSA
   (en la imagen que usa, la luz falsa es MÁS GRANDE que la verdadera en la aorta descendente)
La luz falsa puede EXTENDERSE anterógrada o retrógradamente → no es fija
Dos categorías de muerte, y solo dos:
   (1) RUPTURA → a tórax/abdomen (shock hemorrágico) o AL PERICARDIO (hemopericardio → TAPONAMIENTO)
                 o a la válvula aórtica → insuficiencia aórtica aguda
   (2) COMPRESIÓN de cualquier vaso que salga de la aorta → isquemia del órgano correspondiente
```

**Clasificación de Stanford** ✅: **A = compromete la aorta ASCENDENTE** · **B = solo la descendente**.
Tipo A es la emergencia: más propensa a rotura y afecta a vasos críticos (carótidas comunes; *"your brain has
almost no reserve"*) → **cirugía casi siempre**. Tipo B: a menudo **vigilancia** + control de PA.
Honestidad intelectual que conviene copiar: *"why is the ascending more prone to rupture? I honestly don't
know. If you find the answer, please let me know."* ✅

**Tratamiento del tipo B** ✅: **β-bloqueantes** — no solo para bajar la PA, sino para **reducir el flujo
turbulento**, que también propaga la disección. Y la vigilancia se hace **de la cabeza a los pies, vaso por
vaso**: ¿está alerta y orientado (carótidas)? ¿diuresis y creatinina (renales)? ¿náuseas/vómitos (mesentéricas)?
¿pulsos y dolor en piernas (ilíacas)?

**Detalle de imagen que él explica desde la física** ✅ (HY-Cardio2): el TC **con contraste** se reconoce porque
la luz aórtica está **brillante**. Los rayos X atraviesan elementos ligeros (H, C, N, O → negro) y rebotan en
los pesados (**yodo, bario, calcio, hierro → blanco**).

### VIÑETA ✅ (HY-Cardio2 — el caso que él resuelve)
Disección **tipo A** → extensión retrógrada al pericardio → **hemopericardio** → **taponamiento** → shock
obstructivo con **pulso paradójico**, presión de pulso estrecha, mareo/pérdida de conciencia por caída de la
PPC cerebral.
**Resumen que él daría en el examen (nivel exacto de detalle):** *"disección tipo A → hemopericardio →
taponamiento → shock."* Nada más.

---

## 15. Valvulopatías, soplos y maniobras

> ⚠⚠ **AVISO DE FIABILIDAD (08-sep-2026).** NotebookLM declaró explícitamente que **las maniobras (Valsalva,
> bipedestación, cuclillas, handgrip, nitrito de amilo), el desdoblamiento de S2 y los criterios de Jones NO
> aparecen desarrollados en las fuentes del cuaderno**. Lo que sigue procede de una síntesis previa
> (`q_cardio2_A/B_answer.md`, también generada por NotebookLM) y es fisiología estándar correcta, pero **no es
> "método Palmerton verificado"**. Estudiarlo por First Aid/UWorld, no atribuírselo a él. → `pendiente_usuario`.

### Lo que SÍ está verificado

**Estenosis aórtica — deconstrucción literal de por qué el pulso es débil y tardío** ✅ (UWorld-Harder, vía NLM-Q3):
> *"With aortic stenosis you have both a weak pulse that's late and you have a small pulse pressure. If you
> spent time pre-processing that information… because of the increase in resistance from the stenotic aortic
> valve, every time the heart pumps blood it's going to be able to pump LESS blood into the system; because
> you're pumping less blood into the system the blood pressure is going to go up less — so the pulse pressure is
> going to be less, and you're going to have a weaker pulse."*

```
Válvula aórtica estenótica → ↑ RESISTENCIA de salida (ΔP = Flujo × R)
   → menos volumen eyectado por latido → la PAS sube menos → PRESIÓN DE PULSO ESTRECHA
   → y el pico llega tarde → PULSUS PARVUS ET TARDUS
   → el VI genera presiones enormes para vencer la R → hipertrofia concéntrica
```

**Disfraz del examen** ⚠: ya no es "clic de eyección" (métrica simplista del First Aid); es un paciente de
**75 años con síncope de esfuerzo + pulsus parvus et tardus + presión de pulso estrecha (p. ej. 100/80)**.
**Cifra de referencia**: gradiente transvalvular sistólico **50 mmHg** ✅ (Flashcards-GPT: la tarjeta buena es
*"a cath shows a 50 mm gradient across the aortic valve — what is the significance, what complications would
you expect?"*, no *"explain why a high gradient causes LVH and heart failure"*, que ya regala la respuesta).

**Estenosis mitral** ✅ (Art-SwanGanz) — ya desarrollada en §7 y §12: es un problema de **resistencia**;
PCWP alta con LVEDP normal/baja.

### Lo NO verificado (⚠ usar como recordatorio, no como cita)

| Maniobra | Qué hace | Soplos que ↑ | Soplos que ↓ |
|---|---|---|---|
| **Inspiración (Rivero-Carvallo)** | ↑ retorno venoso → ↑ precarga VD | derechos (IT, ET) | izquierdos (transitorio) |
| **Valsalva / bipedestación** | ↓ retorno venoso → ↓ precarga | **MCHO** y **PVM** (excepciones) | EA, IM, casi todos |
| **Cuclillas / elevación de piernas** | ↑ precarga (+ ↑ poscarga en cuclillas) | casi todos | **MCHO**, PVM |
| **Handgrip** | ↑↑ poscarga (RVS) | **IM, IA, CIV** | EA, MCHO |
| **Nitrito de amilo** | ↓ poscarga | EA, **MCHO** | IM, IA |

**Por qué MCHO y PVM son la excepción** ⚠: menos volumen en el VI → el septo hipertrófico se acerca a la valva
mitral anterior → más obstrucción del TSVI (MCHO); y menos tensión sobre las cuerdas → el prolapso ocurre antes
(clic y soplo **más precoces y más largos**).

**S3 vs S4** ⚠: **S3** = inicio de diástole, llenado rápido contra un ventrículo dilatado/flácido con sangre
residual → dilatada / sobrecarga de volumen. **S4** = final de diástole, contracción auricular contra un
ventrículo rígido → MCH, restrictiva, hipertrofia concéntrica por HTA.
**S2** ⚠: fisiológico (inspiración → VD más lleno → P2 tardío) · **fijo** en CIA (VD siempre sobrecargado) ·
**paradójico** en EA severa/BRI (A2 después de P2; en inspiración P2 se acerca a A2 y el desdoblamiento se
cierra).

---

## 16. Cardiopatías congénitas — todo con resistores

### ANCLA ✅ (HY-Cardio1) + ⚠ (detalles)

```
PDA  = conexión paralela aorta→AP  → ↓ poscarga del VI → para mantener la PAM, ↑ GC
CIV  = paralelo intracardíaco      → cerrarlo QUITA un paralelo → ↑ poscarga → ↓ GC agudo
Coartación = resistor EN SERIE     → ↑ P1 arriba (HTA en MMSS/cabeza), ↓ P2 abajo (femorales débiles)
                                      colaterales intercostales → muescas costales
Eisenmenger: flujo crónico → daño endotelial pulmonar → ↑ RVP hasta INVERTIR el shunt → cianosis tardía
```

**Tetralogía / "tet spells"** ⚠: estenosis infundibular + CIV con aorta cabalgante. Esfuerzo → ↓ RVS → la
sangre desoxigenada del VD toma **el camino de menor resistencia** (D→I por la CIV) → cianosis. Las **cuclillas**
comprimen las femorales → ↑ RVS → la presión izquierda supera a la derecha → el shunt se **invierte a I→D** →
la sangre vuelve a pasar por la AP estenótica → se oxigena.

**Saturaciones por cámara** ⚠: derecha ~70-75 % · izquierda ~95-100 %.
Salto oximétrico: **CIA → en la AD** (75→85 %) · **CIV → en el VD** · **PDA → en la AP**.

### VIÑETAS ⚠
· Coartación: **16 años**, cefalea y pies fríos con el ejercicio; brazo derecho **165/95**, pierna derecha
**85/50**, retraso radio-femoral.
· Fístula AV traumática: varón de **45 años**, herida por arma de fuego en el muslo hace 2 años, disnea y
fatiga, soplo continuo con frémito en la fosa poplítea; eco **GC 8,2 L/min** (normal ≈ 5), RVS baja, PVC alta.

---

## 17. Hipertensión y sus fármacos

### ANCLA ⚠ (con el esqueleto verificado de Art-Eq1)

```
Vasodilatador arteriolar puro (hidralazina, minoxidil)
   → ↓ RPT → ↓ PAM → los barorreceptores dejan de disparar → desinhibición del centro vasomotor
   → NE sobre β1 → TAQUICARDIA REFLEJA (+ ↑ MVO2)  y  renina → RAAS → retención de Na+/agua → EDEMA
"An afterload reducer will ALWAYS lead to reflex sympathetic effects because you are not blocking the
 sympathetic receptors themselves."
```

**Disfraz** ⚠: a las **2 semanas** de iniciar el tratamiento, palpitaciones + edema bimaleolar; preguntan el
mecanismo.
**Tos por IECA** ⚠: la ECA degrada bradicinina → al bloquearla, la bradicinina se acumula en el endotelio
bronquial → prostaglandinas/mediadores → sensibilización de aferentes vagales → tos seca.
**HTA secundaria** ⚠: estenosis de arteria renal (↓ perfusión aferente → renina ↑↑; viñeta: **28 años**,
cefalea pulsátil, **178/105**, FC 82, **Cr 1,9**, renina muy alta) · Conn (HTA + alcalosis hipopotasémica, **sin
edema** por escape de aldosterona vía ANP) · feocromocitoma (α1 → RPT ↑↑ + β1 taquicardia).
**Trampa del S4** ⚠ (Step2-Trap): **60 años** con HTA crónica y S4 → pérdida de distensibilidad por hipertrofia
concéntrica secundaria a poscarga crónica; **no** sirve para descartar insuficiencia cardíaca.

---

## 18. Shock — la tabla y sus disfraces

### ANCLA ⚠ (marco PAM = GC × RVS ✅)
Shock = incapacidad de perfundir órganos vitales → **cerebro (confusión)** y **riñón (oliguria < 0,5 cc/kg/h)**.

| Tipo | PCWP | GC | RVS | PVC | SvO2 | Piel |
|---|---|---|---|---|---|---|
| **Hipovolémico** | ↓↓ | ↓ | ↑↑ | ↓ | ↓ | fría |
| **Cardiogénico** | ↑↑ | ↓↓ | ↑↑ | ↑ | ↓↓ | fría |
| **Distributivo (séptico)** | ↓–N | **↑** | **↓↓** | ↓ | ↑–N | caliente (fase precoz) |
| **Obstructivo · TEP** | **↓ o N** | ↓ | ↑↑ | **↑↑** | ↓↓ | fría |
| **Obstructivo · taponamiento** | **↑↑** | ↓↓ | ↑↑ | ↑↑ | ↓↓ | fría |

**Por qué el TEP tiene la PCWP BAJA y el taponamiento ALTA** ✅ (razonamiento de HY-Cardio1 aplicado): en el TEP
el coágulo está **antes** del corazón izquierdo → no llega sangre a la AI. En el taponamiento se **igualan** las
presiones diastólicas: PVC(AD) = PDVD = PDAP = PCWP(AI) = LVEDP.

**Disfraz de números absolutos (sin flechas)** ⚠: post-quirúrgico con PA **88/44**, FC **118**, PVC **18**,
PCWP **24**, GC **2,1**, RVS **1950**, SvO2 **45 %** → cardiogénico (o taponamiento agudo). Se descarta
hipovolémico (PCWP baja) y séptico (RVS baja).

**El error del "abogado" más citado** ⚠ (vía síntesis previa): estudiante ante fiebre + PA 80/40 + taquicardia
+ oliguria + **"extremidades frías y pálidas"** descarta sepsis (esperaba piel caliente) y elige taponamiento.
La sepsis tardía/hipodinámica con disfunción miocárdica cursa con α1 intenso → extremidades frías.
> *"Choose the imperfect answer that aligns with the majority of the case."*

**Disfraz post-quirúrgico** ⚠: 2.º día post-op de prótesis de rodilla/cadera, disnea súbita, FC 112, PA 85/50 →
**TEP**. *ERROR:* descartarlo porque recibió enoxaparina profiláctica — **ninguna profilaxis es 100 %**.
(Coincide con el principio verificado de HY-Cardio1: la ausencia de un dato no es un negativo pertinente. ✅)

---

## 19. Endocarditis infecciosa y fiebre reumática

### ANCLA · la tarjeta PC que él usa como ejemplo maestro ✅ (ONLY-2026, vía NLM-Q3)
> *"A 46-year-old man presents with several weeks of fatigue, low-grade fever and unintentional weight loss.
> He now has new left-sided weakness. Exam reveals a new holosystolic murmur, splinter hemorrhages and
> petechiae over the lower extremities. Labs show normocytic anemia and elevated creatinine with hematuria.
> At first glance this looks like maybe five different problems… but if you've made a PC card on infective
> endocarditis you can see that there's actually ONE process that connects all of these."*

```
Bacteriemia + endotelio dañado → depósito de fibrina/plaquetas → VEGETACIÓN
   ├─ EMBOLIZACIÓN SÉPTICA → ictus embólico (debilidad izquierda), Janeway, hemorragias en astilla
   ├─ INMUNOCOMPLEJOS      → nódulos de Osler, manchas de Roth, GN (hematuria, cilindros eritrocitarios,
   │                          creatinina alta)
   ├─ DESTRUCCIÓN VALVULAR → soplo NUEVO (holosistólico)
   └─ INFLAMACIÓN CRÓNICA  → fiebre, pérdida de peso, anemia normocítica de proceso crónico
```

**Lección de método** ✅: la potencia de la tarjeta PC es que convierte **cinco problemas aparentes en uno**.
Ese es exactamente el criterio para decidir sobre qué hacer tarjeta.

### Microbiología ⚠
**S. aureus** → válvulas **sanas**, curso hiperagudo; UDIV → **tricúspide** → émbolos sépticos pulmonares
(nódulos cavitados múltiples). **S. viridans** → necesita válvula **dañada** (PVM, congénita, FR previa),
post-dental, subagudo (semanas de febrícula). **S. gallolyticus (bovis)** → **colonoscopia obligatoria**
(cáncer/adenomas de colon). **Enterococo** → manipulación genitourinaria.

### Fiebre reumática ⚠ (NotebookLM: los criterios de Jones **no están en el corpus**)
2-3 semanas tras faringitis por *S. pyogenes* → IgG anti-proteína M → **mimetismo molecular** con la miosina
cardíaca → hipersensibilidad tipo II. Jones: **J**oints · **O** (carditis; cuerpos de Aschoff, células de
Anitschkow "en oruga") · **N**odules · **E**rythema marginatum · **S**ydenham.
**Secuela**: 10-20 años después → fusión comisural → **estenosis mitral** (causa principal en el mundo).

---

## 20. Miocardiopatías y muerte súbita

### ANCLA · MCH y muerte súbita del atleta ✅ (HY-Cardio2)

```
Miocardiopatía hipertrófica: masa muscular enorme → DEMANDA basal ya elevada
   → ejercicio intenso → ↑↑ demanda + ↑FC → menos tiempo diastólico → menos perfusión coronaria
   → ISQUEMIA subendocárdica → inestabilidad eléctrica → FIBRILACIÓN VENTRICULAR → muerte súbita
```

> *"About 25 % of sudden death in athletes is due to hypertrophic cardiomyopathy… their heart has an increase
> in demand in the first place, and when they have an increase in exertion, that increases that demand."* ✅
Anécdota que usa: el atleta que anota el tiro ganador del campeonato estatal y se desploma. ✅

**Causa más frecuente de FV en general** ✅ (HY-Cardio2): **isquemia**, reciente o antigua.
**Genética** ⚠: autosómica dominante; β-miosina de cadena pesada / proteína C de unión a miosina; hipertrofia
septal asimétrica → obstrucción **dinámica** del TSVI.

### Pericarditis, constrictiva y restrictiva ⚠
· **Pericarditis aguda**: Coxsackie B, uremia, IAM transmural, idiopática → irritación del frénico → dolor
pleurítico irradiado al **trapecio izquierdo** (C3-C5); roce; peor en decúbito, mejora inclinado hacia delante;
ECG: **ST elevado cóncavo difuso + descenso del PR**.
· **Constrictiva** (TB, radiación, cirugía): coraza rígida → **signo de Kussmaul** (la PVY sube
paradójicamente en inspiración porque el corazón derecho no puede aceptar el volumen extra).
· **Restrictiva** (amiloidosis, sarcoidosis, hemocromatosis): amiloidosis → paredes gruesas con patrón
moteado ("speckled") en el eco **pero QRS de BAJO VOLTAJE** — el amiloide no conduce. Esa disonancia es la
pregunta. ⚠ (Step2-Trap)

---

## 21. ❌ VACÍOS CONFIRMADOS DEL CORPUS PALMERTON (cardio)

NotebookLM lo declaró explícitamente el 08-sep-2026 (NLM-Q1 y NLM-Q3). **No existen** en las 295 fuentes:

| Tema | Estado | Qué hacer |
|---|---|---|
| **Bucle presión-volumen del VI** (4 fases, apertura/cierre valvular, lectura de EDV/ESV/VS/FE, efecto de precarga/poscarga/contractilidad sobre el bucle) | ❌ NO ESTÁ | Estudiar por First Aid/Costanzo. Lo único de Palmerton aquí son las definiciones verbales de precarga/poscarga/contractilidad |
| **Ley de Frank-Starling** (curva, ejes, desplazamiento en IC sistólica y con inotrópicos, intersección con la curva de retorno venoso) | ❌ NO ESTÁ | Ídem. Ojo: "Starling" en el corpus se refiere solo a las **fuerzas de Starling capilares** (edema), no a la mecánica del miocito |
| **Fórmula de Laplace** (T = P·r/2h) e **hipertrofia concéntrica vs excéntrica** | ❌ NO ESTÁ la fórmula | Sí está el concepto de **tensión de pared** vía nitratos (Art-MONA); la geometría de la hipertrofia hay que traerla de fuera |
| **Maniobras de soplos**, **desdoblamiento de S2**, **criterios de Jones** | ❌ NO ESTÁN | Ver aviso de §15 |

**Regla operativa para Joseph:** en el bloque USMLE, estos cuatro puntos **no** se estudian "con el método
Palmerton" (no hay material). Se estudian con la fuente estándar y se les aplica **el método** (cadena de
flechas + tarjeta PC + concepto automático). → `pendiente_usuario`.

---

# PARTE II · RESPIRATORIO

> Frase de apertura del vídeo, que fija la tesis de todo el bloque ✅ (HY-Resp):
> *"Respiratory is the most logical system in medicine, and that's exactly why so many students overthink it…
> V/Q mismatch, shunt, dead space, the alveolar gas equation — students treat these like separate topics to
> memorize, but they're not. They're all answering ONE question: **is oxygen getting where it needs to go, and
> if not, why?**"*

**Las 3 preguntas-examen con las que estructura la clase entera** ✅ (HY-Resp) — si las sabes explicar, dominas
el bloque:
1. ¿Por qué la **acetazolamida** trata el mal de altura? (exige gas alveolar + ácido-base + compensación)
2. En una **neumonía izquierda**, ¿en qué posición (decúbito izquierdo, derecho o supino) está más alta la
   SatO2? (exige V/Q + shunt)
3. Si **clampo la arteria pulmonar izquierda**, ¿qué le pasa a la saturación? (exige las dos anteriores)

---

## 22. Ecuación del gas alveolar y mal de altura

### ANCLA ✅ (Art-GasAlveolar, HY-Resp)

```
PAO2 = PIO2 − PACO2/R
PIO2 = (Patm − 47) × FiO2        47 mmHg = presión de vapor de agua (el aire se humidifica y el vapor
                                            OCUPA ESPACIO que ya no pueden ocupar los gases)
A nivel del mar: PIO2 = (760 − 47) × 0,21 = 150      →      PAO2 = 150 − PACO2/R
```

**Ley de Dalton** ✅: las presiones parciales de todos los gases deben sumar la presión atmosférica total → por
eso el O2 inspirado **no puede** superar 760 − 47.
**Aviso que él subraya** ✅: la forma "150 − PACO2/R" **solo vale a 1 atmósfera**. *"It would be different on a
mountain. It would be different on the moon."*

### ANALOGÍA · las canicas ✅ (Art-GasAlveolar, HY-Resp)
> *"There is a fixed number of air particles you can fit into your alveolus. If I have more CO2, there is LESS
> ROOM for O2, and vice-versa. Thus, if I decrease CO2, I will increase PAO2."*
En el vídeo lo dice como **un frasco de canicas**: cuantas más canicas sean CO2, menos serán O2.

### ANCLA · altitud ✅ (HY-Resp, Art-GasAlveolar)

```
Altitud ↑ → PRESIÓN ATMOSFÉRICA ↓  (el PORCENTAJE de O2 NO cambia: sigue siendo 21 %)
   → PIO2 ↓ → PAO2 ↓ → PaO2 ↓ → HIPOXEMIA → (consecuencia, no causa) SatO2 ↓
   → el cuerpo compensa HIPERVENTILANDO → PACO2 ↓ → queda más sitio para O2 → PAO2 ↑
Cálculos que hace en clase:
   0,5 atm (380 mmHg): PIO2 = (380 − 47) × 0,21 = 70 mmHg
   447 mmHg          : PIO2 = (447 − 47) × 0,21 ≈ 84 mmHg   ("un quinto de 400")
```

> *"It's a common misconception that the percentage of O2 is lower at higher altitudes."* ✅
Analogía suya para zanjarlo: *si cojo una bolsa de aire en Cusco y otra en San Diego, en Cusco hay MENOS
moléculas de oxígeno, pero el PORCENTAJE de moléculas que son oxígeno es idéntico.* ✅
**(Detalle personal citado por él: fue a Cusco, no llegó a Machu Picchu, y estuvo 24 h con la peor cefalea de
su vida; el mate de coca no le sirvió. Anclaje memorable para Joseph.)** ✅

### ANCLA · acetazolamida (la pregunta insignia) ✅ (Art-GasAlveolar, HY-Resp)

```
Acetazolamida = inhibidor de la anhidrasa carbónica
   → bloquea la reabsorción renal de HCO3− → se pierde HCO3− → ACIDOSIS METABÓLICA
   → el cuerpo compensa con ALCALOSIS RESPIRATORIA = HIPERVENTILA
   → PACO2 ↓ → (gas alveolar) PAO2 ↑ → alivia la hipoxemia de la baja presión atmosférica
```

**Por qué es LA pregunta**: obliga a integrar gas alveolar + acidosis metabólica + compensación respiratoria +
farmacología renal en un solo paso. *"If you understand why acetazolamide is used for altitude sickness, you
have to understand the alveolar gas equation… there are so many things you have to put together."* ✅

### Otros cálculos que da resueltos ✅ (Art-GasAlveolar)
· 100 % O2 a **1 atm** con PACO2 40: PAO2 = (760 − 47) − 40/0,8 = 713 − 50 = **663 mmHg**
· 100 % O2 a **2 atm** con PACO2 40: PAO2 = (1520 − 47) − 40/0,8 = 1473 − 50 = **1423 mmHg**
  → base racional del **oxígeno hiperbárico en la intoxicación por CO**.

### Vocabulario que exige separar ✅
**PAO2** = alveolar · **PaO2** = arterial · **hipoxemia** = PaO2 baja (*-emia* = en sangre) · **hipoxia** = poco
O2 en el **tejido**. *"People will say 'they're hypoxic' when they just mean the saturation is low — really
they should say hypoxemic."*
Y el orden causal correcto ✅: **la saturación baja es una CONSECUENCIA, no la causa**: *"you have a low oxygen
saturation because you have less oxygen in your alveoli. It's not the other way around."*

---

## 23. Retenedor crónico de CO2 y la paradoja del oxígeno en EPOC

### ANCLA ✅ (Art-GasAlveolar)

```
Normal: el impulso respiratorio automático depende SOBRE TODO del drive HIPERCÁPNICO
        (quimiorreceptores centrales detectan el pH del LCR). El drive hipóxico es un respaldo.
EPOC "retenedor crónico": PACO2 basal 60 mmHg o más
        → el drive hipercápnico se DESENSIBILIZA → el paciente pasa a depender del DRIVE HIPÓXICO
        → "respira automáticamente cuando está hipóxico, y DEJA de respirar cuando ya no lo está"
        → muchos viven con SatO2 ~90 % en aire ambiente (el sano, ~100 %)
Le doy O2 a chorro en una exacerbación:
        → PaO2 sube → el cuerpo carotídeo deja de censar hipoxia → HIPOVENTILA → RETIENE MÁS CO2
```

**Los otros dos mecanismos (los tres suman)** ✅/⚠:
2. **Reversión de la vasoconstricción pulmonar hipóxica (HPV)** ✅ — respondido por el propio Palmerton en los
   comentarios del artículo: *"You have hypoxic pulmonary vasoconstriction which helps to avoid [dead space];
   however when you give someone supplemental oxygen, you cause an increase in blood going to poorly
   ventilated areas → physiologic dead-space ↑."*
3. **Efecto Haldane** ⚠: la Hb oxigenada tiene menos afinidad por el CO2 → lo desplaza al plasma → ↑ PaCO2.

### Aplicación inversa (anestesia) ✅ (Art-GasAlveolar)
Para **despertar** el impulso respiratorio propio al salir de la anestesia, el anestesiólogo **baja el soporte**
(menos FR o menos presión) → sube la PaCO2 del paciente → se dispara su propio drive.

### EXAMEN ✅
"Paciente EPOC con exacerbación al que se le pone O2 alto: ¿qué efecto negativo y por qué?" → **hipercapnia
por hipoventilación** (+ espacio muerto + Haldane).

---

## 24. Gradiente A-a (⚠ derivado, no literal)

> ⚠ **Fiabilidad.** El **gradiente A-a como tal no aparece explicado** en las fuentes leídas; lo que sí está,
> literal y completo, es la **ecuación del gas alveolar** con la que se calcula. Lo de abajo es derivación
> legítima del material de Palmerton + estándar. Marcado como "A VERIFICAR (08-sep)".

### ANCLA ⚠

```
Gradiente A-a = PAO2 − PaO2 = (150 − PACO2/0,8) − PaO2
Normal joven ≈ 5-15 mmHg; sube con la edad.

A-a NORMAL   ⇒ el pulmón está SANO; el problema es el aire que llega o el fuelle:
                · ALTITUD (PIO2 baja)
                · HIPOVENTILACIÓN (opiáceos, Guillain-Barré, obesidad-hipoventilación)
A-a AUMENTADO ⇒ el problema está DENTRO del pulmón:
                · SHUNT · DESAJUSTE V/Q · DEFECTO DE DIFUSIÓN
```

**Enlace verificado que hace el propio Palmerton** ✅ (Art-GasAlveolar, respuesta en comentarios): *"There should
not be a gradient between PACO2 and PaCO2 unless there is a perfusion defect"* → por eso en la fórmula se puede
usar la PaCO2 del gasometría como si fuera la alveolar.

### VIÑETA ⚠ (NLM-Q2)
Varón de **24 años** encontrado inconsciente con una jeringa al lado. FC 58, PA 105/65, **FR 6/min**, SatO2
**82 %**. Gasometría: pH **7,22**, PaCO2 **80**, PaO2 **45**.
→ PAO2 = 150 − 80/0,8 = 150 − 100 = **50** → A-a = 50 − 45 = **5 mmHg** = NORMAL
→ pulmones sanos; la hipoxemia es **puramente por hipoventilación central** por opiáceos.

---

## 25. V/Q: por qué el ápex y la base no se comportan igual

### ANCLA ✅ (HY-Resp)

```
Al ir del ÁPEX a la BASE (de pie), SUBEN las dos: ventilación Y perfusión.
Pero la PERFUSIÓN sube MUCHO MÁS que la ventilación → el COCIENTE V/Q BAJA hacia la base.
   ⇒ V/Q más ALTO en el ÁPEX · V/Q más BAJO en la BASE
```

**El ejemplo numérico "tonto" que usa a propósito** ✅: ápex V=1, Q=1 → V/Q = 1. Base V=2, Q=200 → V/Q = 0,01.
*"I always find it much easier if I put numbers to it."*

### ANALOGÍA · el muelle (slinky) y el globo — por qué la ventilación es mayor abajo ✅ (HY-Resp)
El alumno lo aporta y Palmerton lo adopta:
> *"It's like you take a slinky and you hold it with your hand and put the bottom on a table, so it's bunched
> up at the bottom but stretched out at the top."*
Traducido a globos, con las cifras que él inventa en clase:
```
ÁPEX  : el alvéolo ya está bastante distendido. Capacidad 100 cc, ya tiene 50 → solo puede ventilar 50 cc
BASE  : el alvéolo está comprimido. Capacidad 100 cc, tiene 25          → puede ventilar 75 cc
⇒ Ventilación NO es "cuánto aire tiene", es "cuánto aire puedo METER Y SACAR"
```
**El matiz que él considera clave** ✅:
> *"Yes it's gravity, but it's NOT gravity's effect on the air molecules themselves — which is what I think most
> people think. It's actually the effect of gravity on the LUNGS themselves."*
Para la perfusión usa la **torre de agua**: una manguera que baja hasta el fondo de la torre lleva más flujo que
la que se queda arriba. ✅

### Generalización que exige (y que es la pregunta real) ✅
```
No hay NADA especial en el ápex ni en la base: solo importa QUÉ PARTE ESTÁ MÁS ABAJO (zona declive).
De pie / sentado : máximo V/Q en el ápex
SUPINO           : perfusión máxima POSTERIOR → V/Q máximo ANTERIOR
Cabeza abajo     : todo se invierte → V/Q máximo en la BASE
```
> *"They should say 'in someone who is sitting up or standing up' — but they usually don't."* ✅

---

## 26. Shunt pulmonar vs espacio muerto alveolar — la simplificación que él confiesa

### ANCLA ✅ (HY-Resp)

```
Para intercambiar gas hacen falta DOS cosas: SANGRE en el capilar y AIRE en el alvéolo.
   SHUNT pulmonar        = llega SANGRE, no llega AIRE     (V = 0, Q normal)
   ESPACIO MUERTO alveolar = llega AIRE, no llega SANGRE   (V normal, Q = 0)
   Todo lo intermedio     = DESAJUSTE V/Q (cuestión de grado)

TEP                       → ESPACIO MUERTO (aire sí, sangre no)
Neumonía consolidativa    → SHUNT           (sangre sí, aire no)
Ventilación unipulmonar   → SHUNT
```

**Confesión metodológica que vale oro** ✅:
> *"This is something that I didn't really understand until I was a resident, and it wasn't until I was studying
> for my anesthesia boards that I was like — oh, this is a LOT more simple than I was making it out to be."*

**La distinción que casi nadie hace** ✅: el **shunt pulmonar** (intrapulmonar, sangre que pasa por alvéolos no
ventilados) NO es lo mismo que un **shunt extrapulmonar** (CIV). *"That's what confused me so much when I was
studying for Step 1, 2 and 3."*

### La pregunta de auscultación que remata el concepto ✅ (HY-Resp)
"¿Qué se ausculta en un TEP?" → **PULMONES LIMPIOS**.
```
¿Qué escucho con el fonendo? AIRE moviéndose por vías grandes y pequeñas. NADA MÁS.
No escucho vasos sanguíneos. Un TEP no toca las vías aéreas → no cambia el sonido.
⇒ "Pulmones limpios" NO significa "el pulmón está bien": significa "el aire circula igual".
```
> *"As a med student the lung exam was this kind of mystical thing… 'if the lungs are clear it means there's no
> problem with the lungs.' Obviously that's not true."* ✅

---

## 27. Ventilación unipulmonar, HPV, posición y clampaje — el bloque de aplicación

### ANCLA ✅ (HY-Resp)

```
Ventilo solo el pulmón DERECHO, el izquierdo colapsado:
   sangre sigue llegando al izquierdo pero no hay aire → SHUNT → PaO2 ↓

¿Quién recibe más flujo? EL DERECHO (el ventilado), por DOS razones:
   (1) VASOCONSTRICCIÓN PULMONAR HIPÓXICA (HPV): el pulmón es el ÚNICO órgano que vasoconstriñe
       cuando baja el O2 → ↑ resistencia en el pulmón colapsado → menos flujo hacia él
   (2) COMPRESIÓN MECÁNICA: al colapsar el pulmón, comprimo también sus vasos → ↑ resistencia

¿Cómo mejoro la PaO2 sin tocar el respirador? DECÚBITO SOBRE EL PULMÓN VENTILADO
   → la gravedad manda más perfusión a la zona declive = el pulmón bueno → menos shunt → PaO2 ↑
```

> *"There are two reasons. One is hypoxic pulmonary vasoconstriction. The other is that the blood vessels in
> that lung are being compressed."* ✅
Chiste que usa para que no se olvide: **HPV** = *"like the virus but completely unrelated — not human papilloma
virus"*. ✅

### El experimento real que lo demuestra ✅ (HY-Resp) — el mejor anclaje del bloque

```
NEUMONECTOMÍA en quirófano, paciente con FiO2 100 %:
   pulmón colapsado + perfundido = SHUNT PURO → SatO2 estancada en 93 %
      ("la descripción clásica del shunt: doy 100 % de O2 y la oxigenación NO mejora")
   el cirujano CLAMPA la arteria pulmonar de ese lado
      → desaparece el shunt (ya no pasa sangre por el pulmón no ventilado)
      → la saturación SUBE de inmediato
```
> *"It went up, it went up, it went up — which is so amazing when you see this. The surgeon was pimping the med
> student: 'why did the saturation go up?' And the med student had zero idea."* ✅

### EXAMEN ✅ — la pregunta 2 de la clase
**Neumonía del lóbulo izquierdo: ¿en qué posición la SatO2 es máxima?** → **decúbito lateral DERECHO** (pulmón
sano abajo).
```
Decúbito IZQUIERDO (pulmón enfermo abajo) → la gravedad manda más sangre al pulmón consolidado
   → más sangre por alvéolos sin ventilar → ↑ fracción de shunt → SatO2 SE DESPLOMA
Decúbito DERECHO (pulmón sano abajo)      → más sangre al pulmón ventilado → ↓ shunt → SatO2 MÁXIMA
```
**ERROR que señala** ⚠ (NLM-Q2): asumir que la gravedad afecta igual a V y a Q. Afecta **mucho más a la
perfusión** → acostarse sobre el pulmón malo lo inunda de sangre que no se puede oxigenar.
**VIÑETA** ⚠: mujer de **72 años**, fiebre **38,9 °C**, consolidación en LII; en decúbito izquierdo SatO2
**87 %**; se la gira a decúbito derecho → **94 %** sin tocar el oxígeno.

### La prueba del 100 % de O2 (el corolario diagnóstico) ✅/⚠
```
DESAJUSTE V/Q (V bajo pero > 0) → con FiO2 100 % la PaO2 CORRIGE
SHUNT PURO   (V = 0)            → con FiO2 100 % la PaO2 NO CORRIGE (refractaria)
```
Disfraz clásico ⚠: SDRA por sepsis con SatO2 congelada pese a FiO2 100 % en el ventilador.

---

## 28. Gasometría arterial: el método de 3 pasos

### ANCLA ✅ (HY-Resp)

```
PASO 1 · Mira el pH: ¿acidemia o alcalemia?  → eso te dice cuál es el proceso PRIMARIO
PASO 2 · Mira PCO2 y HCO3−: ¿cuál de los dos EXPLICA ese pH?  → ése es el primario
PASO 3 · El otro es la COMPENSACIÓN
Normales que hay que tener memorizados: pH 7,35-7,45 · PCO2 40 · HCO3− 24
   PCO2 > 40 = acidosis respiratoria   ·   PCO2 < 40 = alcalosis respiratoria
   HCO3 > 24 = alcalosis metabólica    ·   HCO3 < 24 = acidosis metabólica
Regla del alumno que él valida: pH y PCO2 en DIRECCIONES OPUESTAS ⇒ primario RESPIRATORIO;
                                pH y PCO2 en la MISMA dirección   ⇒ primario METABÓLICO
```

**Por qué el CO2 acidifica** ✅: CO2 + H2O ⇄ **ácido carbónico** ⇄ H+ + HCO3−.

### ERROR ✅
Tener que ir a mirar la tabla de valores normales durante el examen.
> *"Every second that you're spending looking at the lab values is another second that you're not spending
> interpreting a sentence on the test."*

---

## 29. SDRA — la viñeta que él desmonta frase a frase

### VIÑETA ✅ (HY-Resp, literal)
> Mujer de **82 años** en una residencia, **confusión** y **fiebre alta**. Antecedente de **ITU de repetición**;
> lleva **varios días usando pañal de adulto**. Al ingreso, disnea que **no mejora con soporte no invasivo** →
> se intuba. Rx: **opacidades algodonosas bilaterales**. Catéter de arteria pulmonar: **PCWP = 8**.
> Gasometría con FiO2 70 %: pH en el límite alto, PaO2 baja, **PCO2 baja**, **HCO3− = 21**.

### ANCLA — la cadena completa ✅

```
Anciana + residencia + confusión + fiebre → INFECCIÓN (el delirio del anciano es a menudo el único signo)
ITU → urgencia/frecuencia → no llega al baño → PAÑAL   (así se "conecta" esa frase, no se lee suelta)
Cistitis NO da fiebre; pielonefritis SÍ → puede evolucionar a SEPSIS
Sepsis → ↑ permeabilidad vascular → fuga de líquido al alvéolo → SDRA
SDRA → edema pulmonar NO cardiogénico → hipoxemia
     → hiperventilación compensadora → PCO2 ↓ (blowing off CO2) → PAO2 ↑ (gas alveolar) → PaO2 ↑ parcial
     → ALCALOSIS RESPIRATORIA PRIMARIA con compensación metabólica (HCO3 21)
```

**La frase que decide el diagnóstico** ✅: **PCWP = 8 (normal)**.
```
PCWP alta  → edema pulmonar CARDIOGÉNICO (fallo del VI empujando líquido a los pulmones)
PCWP normal→ NO es cardiogénico → con opacidades bilaterales + sepsis ⇒ SDRA
```
> *"If someone just showed me a chest X-ray that looked like this I would think heart failure — but because the
> wedge is normal, in the setting of sepsis, I think ARDS."* ✅

**El mecanismo de la hiperventilación es el MISMO que en la altitud** ✅: hiperventilar sube el O2 alveolar
soplando CO2. *"It's the exact same mechanism as altitude."*

### ERROR ✅ (varios en la misma viñeta)
· Leer la frase del pañal aislada, sin conectarla con la ITU y con la primera frase.
· Dar un **mecanismo sin diagnóstico** ("aumentó la permeabilidad vascular") o un **diagnóstico sin mecanismo**
  ("sepsis"). Palmerton exige las dos cosas: *"you gave me a mechanism but you haven't given me a diagnosis."*
· Explicar la alcalosis respiratoria por "está intubada" (no).
· *"You can't just say 'she magically developed pulmonary edema because of the infection'. **You've got to give
  me some arrows.**"* ← la frase que resume todo su método. ✅

---

## 30. TEP: Virchow, resistencias y "pulmones limpios"

### ANCLA ✅ (HY-Cardio1) + ⚠ (tratamiento)

```
Tríada de Virchow: HIPERCOAGULABILIDAD · ESTASIS VENOSA · DAÑO ENDOTELIAL
   → en las viñetas suelen bastar DOS de los tres para justificar la sospecha
   Tabaco = daño endotelial · Cáncer (páncreas, mucina→factor tisular) y ACO = hipercoagulabilidad
   Vuelo largo / inmovilidad / postoperatorio = estasis

TVP → embolia → TEP grande en una arteria pulmonar principal
   → QUITO UN RESISTOR EN PARALELO → RVP ↑↑ → poscarga del VD ↑↑
   → el VD (pared fina, hecho para baja resistencia) se DILATA agudamente
   → el septo abomba hacia el VI → ↓ precarga del VI → ↓ VS → ↓ GC → ↓ PAM
   → ↓ PPC (= PAM − PIC) → SÍNCOPE / MAREO
   → y la congestión se acumula HACIA ATRÁS: JVD, hepatomegalia, edema — con PULMONES LIMPIOS y PCWP baja
```

**Las dos viñetas literales que usa** ✅ (HY-Cardio1):
1. Varón de **67 años**, **20 paquetes-año**, un mes de dolor dorsal medio-alto, masa pancreática, dolor en la
   pierna, mareo → **2 de 3** factores de Virchow.
2. Mujer de **36 años** que fuma y toma **anticonceptivos orales** y hace un **vuelo largo de Corea del Sur a
   Los Ángeles** → **3 de 3** → TVP masiva → TEP grande → fallo derecho → JVD **sin crepitantes** → hipotensión
   → hipoperfusión cerebral.
   *"The fact that it's right-sided heart failure is critical, because that's why she doesn't have crackles."* ✅

**Provocada vs no provocada** ✅: provocada = precipitante claro y corregible; **no provocada = más
preocupante** (genética o causa oculta — el caso del profesor de Stanford con TVP jugando al tenis que resultó
tener **factor V Leiden**).

**Tratamiento** ⚠: anticoagulación **terapéutica** inmediata (HBPM/enoxaparina o HNF); la dosis profiláctica
(5.000 U sc dos veces al día) es inútil para tratar un TEP ya establecido. **Trombolíticos solo si TEP masivo
con inestabilidad hemodinámica**; contraindicados en el TEP hemodinámicamente estable por riesgo de sangrado.

### Gammagrafía V/Q — cómo se hace y cómo se lee ✅ (NucMed-VQ)
```
VENTILACIÓN: el paciente INHALA un radiotrazador → se distribuye por vía aérea → emite gamma
PERFUSIÓN  : se INYECTA el radiotrazador → llega por los vasos → emite gamma
Modalidad: CENTELLOGRAFÍA (2 dimensiones, radiación gamma) — no es SPECT ni PET
LECTURA   : zona que se ve CLARA en perfusión y NORMAL en ventilación = defecto de perfusión = TEP
```
**VIÑETA** ✅: puérpera inmediata con disnea súbita y mareo leve → **embolia de líquido amniótico**; el defecto
está en la base izquierda de la imagen de perfusión, con ventilación normal.

---

## 31. Vía aérea intratorácica vs extratorácica: estridor, sibilancias y gravedad

### ANCLA ✅ (HY-Cardio2, HY-Resp)

```
El calibre lo decide la DIFERENCIA de presión (fuera del tubo vs dentro del tubo).
INSPIRACIÓN: ↓ presión INTRATORÁCICA (vacío) →
      · vías INTRAtorácicas (alvéolos, bronquiolos, tráquea baja) → SE ABREN
      · vía EXTRAtorácica (laringe, epiglotis, tráquea alta) → la presión DENTRO cae por debajo de la
        atmosférica (que no puedo cambiar) → SE COLAPSA
ESPIRACIÓN: al revés.
   ⇒ Lesión INTRAtorácica  → obstrucción y ruido en ESPIRACIÓN
   ⇒ Lesión EXTRAtorácica → obstrucción y ruido en INSPIRACIÓN
```

**El error conceptual exacto que él diagnostica en directo** ✅:
> *"The problem is that you're conflating intrathoracic and extrathoracic. You're expecting that your
> extrathoracic — your epiglottis — should respond the exact same way that your alveoli do. That's not true.
> It's actually the opposite."*
Y el orden causal, que también corrige: *"narrowing happens BECAUSE of the pressure differences — not pressure
differences because of narrowing."* ✅

### ANALOGÍA · la flauta dulce (recorder) — estridor vs sibilancia ✅ (HY-Cardio2)
```
ESTRIDOR   = UN solo tubo obstruido (tráquea) → UNA flauta → UN solo tono (monofónico), fuerte
SIBILANCIA = MILES de bronquiolos, todos de calibres distintos → miles de flautas → MUCHOS tonos (polifónico)
```
> *"If you ever played recorder in elementary school — a flute gives you one pitch. Now imagine 100 recorders
> all slightly different in size: they're going to give you different pitches."* ✅
(Nota de honestidad que él añade: técnicamente el estridor es un tipo de sibilancia.)

### Tabla de aplicación ✅ (HY-Cardio2)
| Cuadro | Localización | Ruido | Fase |
|---|---|---|---|
| **Asma** | bronquiolos (intratorácicos) | sibilancias | **espiratoria** |
| **Epiglotitis, laringomalacia** | extratorácica | estridor | **inspiratoria** |
| **Tumor traqueal alto (cervical)** | extratorácica | estridor | **inspiratoria** |
| **Tumor traqueal bajo / estenosis por cuff** | intratorácica | estridor | **espiratoria** |
| **Traqueomalacia post-intubación** | intratorácica (el cuff queda ≈3 cm de la carina) | estridor | **espiratoria** |
| **Bronquiectasias** | intratorácica | — | obstrucción **espiratoria** (vía dilatada pero **flácida**: pierde la rigidez y colapsa) |

### La escala de gravedad del asma deducida de la física ✅ (HY-Cardio2)
```
Sibilancias solo en ESPIRACIÓN          → obstrucción "normal" (la vía ya es más estrecha ahí)
Sibilancias en INSPIRACIÓN Y ESPIRACIÓN → GRAVE: si incluso cuando la vía está MÁXIMAMENTE abierta
                                          sigue siendo lo bastante estrecha como para sonar, es muy malo
NO se oye NADA de movimiento de aire    → PEOR TODAVÍA (tórax silente)
```
> *"If on inspiration it's small enough to do that, that's a bad sign. If you don't hear any air movement,
> that's really bad."* ✅

### Las 3 razones para intubar ✅ (HY-Cardio2)
1. **Fallo ventilatorio** (CO2 demasiado alto) · 2. **Fallo de oxigenación** (O2 demasiado bajo) ·
3. **Protección de la vía aérea** — y esta tercera es la razón de ser del **cuff**: impedir que las secreciones
de la boca bajen a los pulmones.

---

## 32. Pruebas de función respiratoria (PFT) y DLCO ⚠

> ⚠ Síntesis (`q_resp_v3_answer.md`); coherente con el marco físico de Palmerton, no verificada línea a línea.

### ANCLA ⚠
```
OBSTRUCTIVO = problema de SALIDA (espiración)
   La espiración sube la presión intratorácica y tiende a COLAPSAR las vías pequeñas intratorácicas.
   Si además falta soporte elástico (enfisema) o sobra moco/inflamación (bronquitis, asma) → colapso precoz
   → ATRAPAMIENTO AÉREO
   FEV1 ↓↓ desproporcionadamente más que FVC → FEV1/FVC < 70 % · TLC ↑ (hiperinsuflación)
RESTRICTIVO = problema de ENTRADA (inspiración): el pulmón o la caja no se expanden
   FVC ↓↓ ; FEV1 ↓ en la misma proporción o menos (el retroceso elástico del pulmón fibrótico es enorme)
   → FEV1/FVC NORMAL o ALTO (> 80 %) · TLC ↓
```

### DLCO — el discriminador ⚠
| Patrón | DLCO | Por qué |
|---|---|---|
| Restrictivo **intraparenquimatoso** (FPI, sarcoidosis) | **↓** (p. ej. 55 %) | la fibrosis destruye/engruesa la membrana alvéolo-capilar |
| Restrictivo **extraparenquimatoso** (obesidad IMC 42, escoliosis) | **normal** | la mecánica está restringida, la membrana está intacta |
| **Enfisema** | **↓** | destrucción de septos → menos superficie de intercambio |
| **Asma / bronquitis crónica** | **normal** | la membrana está intacta; el problema es broncoespasmo o moco |

**VIÑETA FPI** ⚠: varón > 60 años, no fumador, tos seca de un año, disnea de esfuerzo, Rx con **opacidades
lineales finas bibasales**. FEV1 **80 %**, FVC **48 %**, FEV1/FVC **> 80 %** (restrictivo), **DLCO 55 %**
(intraparenquimatoso).

### ERROR de "abogado" en PFT ⚠
Un alumno falló una pregunta de enfisema porque la opción correcta decía *"alveolar destruction **and
fibrosis**"* y él razonó: "la fibrosis es restrictiva, luego el enfisema obstructivo no puede tener fibrosis" →
eligió cáncer de pulmón. **Juez, no abogado**: la destrucción alveolar es incuestionable y la opción sigue
siendo infinitamente mejor que las demás.

---

## 33. Curva de disociación de la hemoglobina, CO, cianuro y contenido de O2 ⚠

### ANCLA ⚠
```
Curva sigmoidea por COOPERATIVIDAD (unir el 1.º O2 facilita los 3 siguientes)
P50 = PaO2 a la que la Hb está 50 % saturada ≈ 25-27 mmHg
IZQUIERDA (↑ afinidad, P50 ↓ p. ej. 17): ↓ temperatura, ↓ H+ (pH alto), ↓ PaCO2, ↓ 2,3-BPG, HbF, CO, metaHb
   → capta bien en el alvéolo pero NO SUELTA en el tejido → empeora la hipoxia tisular
DERECHA (↓ afinidad): ↑ temperatura, ↑ H+ (efecto Bohr), ↑ PaCO2, ↑ 2,3-BPG
   → entrega mejor a los tejidos con alta demanda
HbF: cadenas γ en vez de β → no une 2,3-BPG (le faltan los residuos positivos) → desviada a la izquierda
```

**CO** ⚠: doble golpe — (1) afinidad **200×** la del O2 por el Fe²⁺, lo desplaza; (2) induce cooperatividad →
**desvía la curva a la izquierda** → el poco O2 que queda tampoco se suelta.
**Cianuro** ⚠: además de lo anterior, bloquea el **complejo IV (citocromo c oxidasa)** → la mitocondria no puede
usar el O2 → **sangre venosa hiperoxigenada** → piel **rojo cereza**.

### Contenido de O2 — el cálculo que hace en clase ⚠
```
CaO2 = (1,34 × Hb × SatO2) + (PaO2 × 0,003)
Sano: Hb 12, Sat 1,00, PaO2 100 → (1,34×12×1) = 16,08  +  (100×0,003) = 0,3   →  16,38 mL O2/dL
Anemia grave (Hb 6,5): el término unido a Hb CAE A LA MITAD (−8 mL/dL)
   Aunque suba la PaO2 a 600 con mascarilla de no reinhalación: 600 × 0,003 = 1,8 mL/dL
   ⇒ 1,8 NO COMPENSA una pérdida de 8. Inundar de oxígeno a un anémico es FÚTIL.
   ⇒ La compensación obligatoria es HEMODINÁMICA: DO2 = GC × CaO2 → el GASTO CARDÍACO DEBE DUPLICARSE
     → taquicardia e hiperventilación (estado hiperdinámico), SIN alteración barorreceptora ni de precarga
```
Esto conecta con lo que sí está verificado en HY-Cardio2 sobre el O2 en el SCA: *"el aumento marginal de la
capacidad de transporte es tan pequeño que no cambia gran cosa"*. ✅

---

## 34. Neumotórax, derrame y atelectasia ⚠

**Neumotórax simple** ⚠: entra aire al espacio pleural → se pierde la presión intrapleural negativa que
mantenía el pulmón pegado a la pared → colapso ipsilateral.
**Neumotórax a tensión** ⚠: válvula unidireccional → la presión sube → desplaza el mediastino →
**comprime las cavas** (venas de baja presión) → ↓ retorno venoso → ↓ precarga del VD → **shock obstructivo**.
(El mecanismo mortal es hemodinámico, no respiratorio.)

**Criterios de Light** ⚠ — con el matiz que Palmerton subraya:
```
EXUDADO si cumple AL MENOS UNO:
   proteína pleural / proteína sérica  > 0,5
   LDH pleural / LDH sérica            > 0,6
   LDH pleural > 2/3 del LÍMITE SUPERIOR NORMAL (ULN) de la LDH sérica
El examen NO espera que memorices un valor fijo de LDH: el ULN varía por laboratorio, así que TE LO DAN
   en la viñeta. Trasudado = fuerzas de Starling (IC, cirrosis); exudado = daño endotelial/inflamación.
```

**Atelectasia y la "inmunidad" del asmático** ⚠: un alumno preguntó si el asmático tiene más riesgo de
atelectasia por la obstrucción. Respuesta: **rara vez**. El atrapamiento aéreo genera **auto-PEEP**, que actúa
como andamio neumático y mantiene los alvéolos abiertos.

---

## 35. Fibrosis, sarcoidosis, neumonías y cáncer ⚠

**Neumonía lobar = shunt puro** ✅ (concepto verificado en HY-Resp): el exudado ocupa el alvéolo → llega sangre
pero no aire.

**Por qué el esputo bacteriano es verde/amarillo** ⚠ (la química que él desarrolla):
```
Infección alveolar → reclutamiento masivo de NEUTRÓFILOS → mueren y se lisan
   → liberan MIELOPEROXIDASA (MPO) → la MPO lleva un grupo HEMO
   → anillo de porfirina con dobles enlaces CONJUGADOS → absorbe en el visible
   → refleja VERDE/AMARILLO
Esputo claro = infección viral (no hay reclutamiento ni lisis masiva de neutrófilos)
```

**Sarcoidosis** ⚠: activación sistémica de macrófagos → **granulomas no caseificantes**; comparte síntomas
constitucionales (fiebre, sudores nocturnos, pérdida de peso) con cáncer y TB porque comparten la cascada
inflamatoria mediada por macrófagos.

**Cáncer microcítico (SCLC)** ⚠: linaje **neuroendocrino**, ligado a tabaquismo pesado (p. ej. 50 paquetes-año).
Paraneoplásicos: **ACTH** (Cushing ectópico) y **ADH → SIADH**.
```
SIADH: ↑ reabsorción de agua libre en el colector → hiponatremia HIPOTÓNICA
   Na 115 mEq/L · osmolaridad sérica 260 mOsm/L · densidad urinaria 1,041 · osm urinaria > 300
   Clínica: agua libre al cerebro → edema cerebral → confusión
   EUVOLÉMICO porque el estiramiento auricular libera ANP/BNP → natriuresis compensadora
   Tratamiento agudo si sintomático: SALINO HIPERTÓNICO 3 %
```
**Epidermoide (SCC)** ⚠: **PTHrP** → hipercalcemia con **PTH intacta suprimida**.

**Apnea obstructiva del sueño** ⚠ — trampa de manejo de UWorld: obeso con somnolencia diurna; muchos eligen
"estudio del sueño" como paso indispensable; la regla de manejo prioriza la **pérdida de peso** si no hay
criterios de inestabilidad o desaturación severa. → marcar como **A VERIFICAR (08-sep)**, es la afirmación más
frágil de todo el documento.

---

## 36. Surfactante y SDR neonatal ⚠⚠

> ⚠⚠ La cita que NotebookLM atribuyó aquí apunta a un fichero (`sistema-respiratorio-yousmle.md`) que **no
> figura en el inventario de fuentes del cuaderno**. Trátese como fisiología estándar, **no** como material
> Palmerton. → `pendiente_usuario`.

```
Prematuro (< 35 sem) → neumocitos tipo II inmaduros → relación L/S < 2,0
   → déficit de dipalmitoilfosfatidilcolina (lecitina)
   → ↑ tensión superficial → ↑ presión de colapso (P = 2T/r; el alvéolo PEQUEÑO colapsa antes)
   → atelectasia espiratoria masiva → ↓ compliance
   → hay que generar presiones intrapleurales muy negativas → trabajo respiratorio brutal → fatiga → shunt
VIÑETA: RN de 29 semanas, distrés a los 10 min, retracciones, FR 88 rpm, PaCO2 68, PaO2 42, L/S 1,2
```

---

## 37. LOS ERRORES DE MÉTODO EN RESPIRATORIO (los que él enumera)

1. **Leer la última línea primero.** Ir directo a *"¿cuál es el siguiente paso?"* no sirve si no has
   deconstruido el enunciado: la lista de opciones (TC, eco…) te hace adivinar entre distractores. ⚠
2. **Ser abogado ante las PFT.** El caso del enfisema con "fibrosis" en la opción correcta (§32). ⚠
3. **Confundir vía intratorácica y extratorácica.** El error más extendido del banco. ✅ (§31)
4. **Explicar sin flechas.** *"You've got to give me some arrows."* ✅ (§29)
5. **Explicar de forma que solo se entienda si el otro ya lo sabía.** Es el estándar que impone todo el vídeo:
   > *"If I didn't already understand what you were saying, I would have had a hard time following. The
   > standards we have to hold ourselves to have to be exceedingly high to do well on Step 1."* ✅
   Y el corolario que aplica a sí mismo: *"If you can't [explain it], it means that I messed up and I didn't
   teach you effectively. It also means that I probably don't understand the topic particularly well."* ✅
6. **Descartar por un negativo que no te han dado.** *"The lack of a symptom doesn't necessarily mean that it's
   not there."* ✅ (HY-Cardio1, aplicable a todo respiratorio)

---

## 38. CÓMO CONVERTIR ESTE MATERIAL EN TARJETAS (regla de Palmerton)

**Dos tipos de tarjeta, y solo dos** ✅ (HY-Cardio1):
1. **Concepto automático** (lo que él pone en negrita en sus diapositivas): *"presíncope ⇒ hipotensión"*,
   *"signos de IC + pulmones limpios ⇒ fallo derecho aislado"*, *"quitar un resistor en paralelo ⇒ ↑ R total"*,
   *"ST en II-III-aVF ⇒ ojo con nitratos"*.
2. **Tarjeta PC (cronología patofisiológica)**: delante la **viñeta**, detrás la **cadena de flechas completa**.
   Al repasarla fuera del examen se recita la versión **detallada**, no el resumen — *"muscle memory for your
   brain"*. ✅

**Regla del reverso** ✅ (Flashcards-GPT, vía NLM-Q3): la tarjeta mala te regala la respuesta en el enunciado
(*"en la estenosis aórtica, explica por qué un gradiente alto produce HVI y luego insuficiencia cardíaca"* — ya
te dijo el diagnóstico, el gradiente, la HVI y el desenlace). La tarjeta buena es **deliberadamente vaga por
delante**: *"un cateterismo muestra un gradiente de 50 mmHg a través de la válvula aórtica: ¿qué significa y qué
complicaciones esperarías?"*

**Nivel de detalle según contexto** ✅ (HY-Cardio1, repetido en los tres vídeos):
```
EN EL EXAMEN (cronometrado): "IAM de la RCA → isquemia del nodo AV → bloqueo de 3.er grado → bradicardia
                              sintomática → síncope". Punto.
FUERA DEL EXAMEN            : TODO el detalle posible — es lo que hace que en el examen salga automático.
```
**Dónde poner el esfuerzo** ✅: *"focus on the parts that are slowest"* — los tramos de la cadena donde titubeas
al recitarla son exactamente el material de estudio del día siguiente.

---

## 39. RESUMEN OPERATIVO PARA EL BLOQUE USMLE DE JOSEPH

| Prioridad | Qué instalar como automático | Fuente |
|---|---|---|
| 1 | PAM = GC × RPT = FC × VS × RPT; precarga/poscarga/contractilidad | ✅ los 3 vídeos de cardio |
| 2 | PPC cerebral = PAM − PIC · PPC coronaria = PAdiast − LVEDP | ✅ HY-Cardio1/2 |
| 3 | ΔP = Flujo × R (la manguera doblada) | ✅ Art-DeltaP |
| 4 | Resistores en **paralelo**: quitar uno SUBE la R total | ✅ HY-Cardio1 |
| 5 | "Remove inactivation": por qué el nodo usa Ca++ | ✅ Art-IonEKG |
| 6 | Isquemia = Demanda > Oferta (y de ahí MONA/THROMBINS2 entero) | ✅ Art-MONA |
| 7 | Signos de IC + pulmones limpios = fallo derecho aislado (PCWP baja) | ✅ HY-Cardio1 |
| 8 | PAO2 = 150 − PACO2/R y las canicas | ✅ Art-GasAlveolar |
| 9 | Shunt = sangre sin aire · Espacio muerto = aire sin sangre | ✅ HY-Resp |
| 10 | Intratorácico colapsa en espiración · extratorácico en inspiración | ✅ HY-Cardio2 |

**A VERIFICAR (08-sep-2026) → `pendiente_usuario`:**
1. **Bucles presión-volumen, Frank-Starling y fórmula de Laplace**: ❌ confirmados ausentes del corpus. Decidir
   con qué fuente se cubren en el plan (¿Costanzo? ¿BnB?) y en qué día del `usmleStep1Daily.ts`.
2. **Maniobras de soplos, desdoblamiento de S2, criterios de Jones**: ❌ ausentes. Mismo tratamiento.
3. **La regla de manejo de la apnea del sueño** ("pérdida de peso antes que polisomnografía"): afirmación
   frágil de una síntesis secundaria; contrastar contra UWorld antes de fijarla como regla.
4. **La cita del surfactante** atribuida a `sistema-respiratorio-yousmle.md`: fichero no presente en el
   inventario de 295 fuentes → posible confabulación de la síntesis. No citar como Palmerton.
5. Las secciones marcadas ⚠ que proceden de `q_cardio2_A/B_answer.md` (valvulopatías, congénitas, HTA, shock,
   endocarditis, miocardiopatías) son **NotebookLM sobre NotebookLM**: fisiología correcta, atribución no
   verificada. Si en algún momento se quiere blindar, el camino es abrir en crudo *High Yield Surgery Review*,
   *High Yield Family Medicine Review Part 2* y *The ONLY Video You Need to Pass the USMLE Step 1 in 2026*, que
   sí están en el cuaderno pero **no** se han descargado a `src/`.
