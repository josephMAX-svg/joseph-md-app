# PALMERTON v3 · Extracción CARDIOLOGÍA + RESPIRATORIO (cuaderno "STEP 1 · Palmerton Engine", ~140 fuentes)

> Data cruda para síntesis (no la ve el usuario). Cada punto lleva su fuente entre paréntesis tal como la
> devuelve NotebookLM. Fuentes clave: *High Yield Cardiology* (parte 1), *High Yield Cardiology Part 2 |
> Shelf Exam, Step 1 & Step 2 CK*, *How 260+ Scorers Master Cardio on the USMLE*, *High Yield Respiratory*,
> artículos yousmle.com (Ion Channel Physiology ↔ EKG · Antiarrhythmics Cheat Sheet · Swan-Ganz/wedge
> pressure/mitral stenosis/LVEDP · Digoxin/Reversible Cell Damage/Trousseau · MONA and THROMBINS2 · The Most
> Useful USMLE Equation Ever · Alveolar Gas Equation ↔ Diuretics · etc.).
>
> Convención: **ANCLA** = mecanismo causal como lo explica Palmerton · **EXAMEN** = pregunta típica y disfraz ·
> **ERROR** = confusión que él señala · **FRASE/ANALOGÍA** = literal o mnemónico · **VIÑETA** = ejemplo con cifras.

---

# PARTE I · CARDIOLOGÍA

## 1. Potenciales de acción cardíacos (miocito contráctil vs tejido nodal)

### ANCLA (cadena causal)
Primer principio: **la presencia o ausencia del canal de potasio rectificador de entrada I_K1 en reposo fija el
potencial de membrana en reposo y, por tanto, el ion que despolariza la célula** (artículo *The USMLE Step 1 Will
Require You to Connect Ion Channel Physiology with EKG Findings. How Well Can You?*).

1. Miocito contráctil (auricular/ventricular) **tiene I_K1** abierto en reposo → gran permeabilidad a K+ → Vm ≈ −90 mV
   (≈ potencial de equilibrio del K+). (Ion Channel Physiology ↔ EKG)
2. Regla de la "remoción de la inactivación": los canales rápidos de Na+ (fase 0) tienen compuerta de inactivación
   lenta; **solo se "des-inactivan" si la célula está previamente hiperpolarizada (~−90 mV)**. (Ion Channel Physiology ↔ EKG)
3. Como el miocito reposa a −90 mV, sus canales de Na+ están completamente disponibles → estímulo → apertura masiva
   → **fase 0 rápida dependiente de Na+**. (Ion Channel Physiology ↔ EKG)
4. Tejido nodal (SA/AV) **carece de I_K1** → reposo mucho menos negativo (≈ −60 mV). (Ion Channel Physiology ↔ EKG)
5. A −60 mV los canales de Na+ nodales **permanecen inactivados de forma permanente**: el nodo SÍ tiene canales de Na+
   pero **no puede usarlos**. (Ion Channel Physiology ↔ EKG)
6. Por eso el nodo despolariza con **canales de Ca2+ tipo L (lentos)** → fase 0 lenta. (Ion Channel Physiology ↔ EKG)

**Fases del miocito ventricular y fármaco que actúa en cada una** (*USMLE Step 1 Cheat Sheet: The Ultimate Guide to
Antiarrhythmics*):
- Fase 0: apertura de Na+ rápidos → **Clase I** aplana la pendiente.
- Fase 1: cierre de Na+ + apertura de K+ transitorio (Ito).
- Fase 2 (meseta): entrada de Ca2+ tipo L equilibrada con salida de K+ → cambio neto ≈ 0 → **Clase IV (BCC) y Clase II
  (β-bloq)** reducen la entrada de Ca2+ aquí. La meseta = **segmento ST** del ECG.
- Fase 3: cierre de Ca2+ + apertura de K+ rectificadores lentos → **Clase III** bloquea K+ → retrasa fase 3, prolonga el
  PA y el QT.
- Fase 4: I_K1 domina, reposo estable −90 mV.

**Fases del tejido nodal (3 fases)** (Antiarrhythmics Cheat Sheet):
- Fase 0: Ca2+ tipo L.
- Fase 3: cierre de Ca2+ + apertura de K+.
- Fase 4: despolarización espontánea por corriente "funny" I_f (Na+/Ca2+ "leaky") = automatismo. **Clase II** baja el
  AMPc → reduce la pendiente de fase 4 → ↓ FC.

### EXAMEN
Experimento in vitro: miocito ventricular y célula del nodo SA expuestos a lidocaína (IB) o flecainida (IC); preguntan
por qué la fase 0 del miocito se aplana y la del nodo SA no cambia → el nodo no usa Na+ en fase 0 porque su reposo de
−60 mV mantiene los canales inactivados. (Ion Channel Physiology ↔ EKG)

### ERROR
- Pensar de forma absolutista que el nodo "no tiene canales de sodio": los tiene, pero no los usa. (Ion Channel Physiology ↔ EKG)
- No correlacionar la meseta (fase 2) con el segmento ST: no hay cambio neto de carga ventricular en ese tramo. (Antiarrhythmics Cheat Sheet)

### FRASE / ANALOGÍA
- Literal: *"In order to activate Na+ channels generally in the heart, you must first REMOVE INACTIVATION from them."* (Ion Channel Physiology ↔ EKG)
- Analogía del cerrojo de resorte: la compuerta de inactivación se bloquea tras la fase 0; la única forma de
  "reiniciarla" para el siguiente latido es empujar la célula a un estado muy negativo (hiperpolarización profunda),
  algo que el nodo nunca consigue por su falta de "anclaje" de potasio (I_K1). (Ion Channel Physiology ↔ EKG)

### VIÑETA
Investigador con agente experimental: registro intracelular de miocito ventricular con reposo estable **−90 mV** y fase 0
de pendiente pronunciada; al pasar el microelectrodo a célula del nodo SA, reposo de **−58 mV**. Un bloqueador
selectivo de Na+ rápido abolirá la fase 0 del primero y no alterará el segundo. (Ion Channel Physiology ↔ EKG)

---

## 2. ECG: intervalos, velocidades de conducción y bloqueos

### ANCLA
Velocidades de conducción como diseño de "retraso hidráulico" estratégico: **Purkinje 2.2 m/s > aurícula 1.1 m/s >
ventrículo 0.3 m/s > nodo AV 0.03 m/s**. (Ion Channel Physiology ↔ EKG)

Cadena del bloqueo AV completo por infarto inferior (*How 260+ Scorers Master Cardio on the USMLE*):
```
Isquemia de la RCA (infarto inferior)
  → isquemia/necrosis del nodo AV (disociación eléctrica)
  → aurículas a ritmo del nodo SA (P regulares ~100 lpm) / ventrículos a ritmo de escape (QRS regulares ~20-40 lpm)
  → GC = FC × VS cae masivamente (FC ≈ 30)
  → PAM = GC × RPT cae
  → PPC = PAM − PIC cae
  → isquemia cerebral aguda → SÍNCOPE SIN PRÓDROMO ("unheralded syncope")
```

Fisiología del retraso AV, literal: *"The AV node slow conduction is there to allow time for the ventricles to fill after
the atria have contracted."* (Ion Channel Physiology ↔ EKG)

Correlación ECG ↔ canales (Antiarrhythmics Cheat Sheet): PR ↔ conducción nodal (Ca2+, tono vagal) · QRS ↔ fase 0 de
Na+ ventricular (Clase I lo ensancha) · QT ↔ fase 3 de K+ (Clase IA/III lo prolongan → torsades) · ST ↔ meseta (fase 2).

### EXAMEN
Diabético anciano con fatiga y desmayos súbitos; muestran un trazo y preguntan la **arteria obstruida**. Las P marchan
regulares a 100 lpm y los QRS independientes y lentos a 35 lpm (bloqueo de 3er grado) → RCA. Disfraz: entierran las P
dentro de las T o de los QRS para que parezca normal a primera vista. (How 260+ Scorers Master Cardio)

### ERROR
- **Sesgo de confirmación**: leer "diabetes de larga evolución" y concluir "neuropatía autonómica" ignorando la
  disociación AV del trazo. (How 260+ Scorers Master Cardio)
- Confundir despolarización eléctrica con contracción: el QRS mide **despolarización** de los miocitos, no la
  contracción mecánica (evento posterior dependiente del acoplamiento excitación-contracción por Ca2+). (Ion Channel Physiology ↔ EKG)

### FRASE / ANALOGÍA
- Analogía del estanque y la tormenta (ritmo sinusal vs FA): ritmo sinusal = una sola gota cayendo rítmicamente en un
  estanque en calma → ondas concéntricas perfectas (despolarización auricular coordinada, onda P). Fibrilación
  auricular = tormenta torrencial, miles de gotas a la vez → mini-ondas caóticas que chocan → no hay onda coordinada
  (**pérdida de la onda P**). (Ion Channel Physiology ↔ EKG)

### VIÑETA
Hombre de **63 años**, HTA grave y DM2 mal controlada, desmayo súbito sin pródromo caminando. PA **90/50**, FC **42
lpm**, ingurgitación yugular pulsátil (ondas "a" cañón), pulmones limpios. ECG: P a **100 lpm**, QRS anchos a **42 lpm**,
R-R constante de **7 cuadros grandes**, disociación AV completa. (How 260+ Scorers Master Cardio)

---

## 3. Antiarrítmicos y fármacos de ritmo/contractilidad (digoxina)

### ANCLA
**Digoxina → inotropismo positivo** (*The Secret Connection Between Digoxin, Reversible Cell Damage, and Trousseau's
Sign That USMLE Step 1 Bosses Know*):
```
Bloqueo de Na+/K+ ATPasa (compite con K+ en el sitio EXTRACELULAR)
  → ↑ Na+ intracelular → ↓ gradiente de Na+
  → el intercambiador Na+/Ca2+ reduce su actividad (necesita el gradiente de Na+ para sacar Ca2+)
  → ↑ Ca2+ intracelular → más recaptación por SERCA al RS
  → más Ca2+ liberado en el siguiente latido → ↑ fuerza de contracción
```

**Control de frecuencia (cronotropismo negativo por digoxina/ACh en el nodo AV)** (Antiarrhythmics Cheat Sheet):
```
Tono vagal (ACh) → receptores M2 acoplados a Gi
  → inhibe adenilato ciclasa → ↓ AMPc → ↓ PKA
  → apertura de canales I_K,ACh → ↑ eflujo de K+
  → hiperpolarización del nodo AV → hace falta más entrada de cationes para llegar al umbral
  → conducción retrasada → PR PROLONGADO
```

Clases (Antiarrhythmics Cheat Sheet): I = Na+ (fase 0; IB lidocaína, IC flecainida) · II = β-bloq (fase 4 nodal, ↓AMPc)
· III = K+ (fase 3, prolonga QT) · IV = BCC (fase 0 nodal / fase 2 ventricular). **IA y III bloquean K+ → retrasan fase
3 → prolongan QT → torsades.**

### EXAMEN
Paciente con IC + HTA en digoxina ingresa con **xantopsia** (halos amarillo-verdosos), náuseas, confusión y extrasístoles
ventriculares frecuentes; K+ sérico **2.8 mEq/L** por furosemida concomitante; preguntan el mecanismo íntimo → K+ y
digoxina **compiten por el mismo sitio extracelular** de la Na+/K+ ATPasa; con menos K+ la digoxina se une con más
afinidad y persistencia → toxicidad. (Digoxin/Reversible Cell Damage/Trousseau)

### ERROR
- Memorizar "hipopotasemia ↑ toxicidad por digoxina" como hecho plano sin ver que es **inhibición competitiva** en el
  sitio de unión. (Digoxin/Reversible Cell Damage/Trousseau)
- Confundir para qué se da calcio en hiperpotasemia: no es "para el nodo", es para **estabilizar la membrana del
  miocardio ventricular** (eleva el umbral de despolarización) y prevenir FV. (Digoxin/Reversible Cell Damage/Trousseau)

### FRASE / ANALOGÍA
- Analogía del castillo de arena (filtro del nodo AV): el nodo AV es un castillo de arena en la orilla; las
  despolarizaciones auriculares son olas. En FA hay una tormenta que lanza cientos de olas por minuto. Clases II y IV
  = **construir un rompeolas de piedra delante del castillo**: solo pasan las olas más grandes → el ventrículo se
  despolariza menos veces (control de frecuencia). (Ion Channel Physiology ↔ EKG)
- Literal: *"Class IA and Class III antiarrhythmics block potassium channels, delay Phase 3 repolarization, and prolong
  the QT interval, which increases the risk of TORSADES DE POINTES."* (Antiarrhythmics Cheat Sheet)

### VIÑETA
Mujer de **72 años** con digoxina crónica por ICFEr; la hija la trae por anorexia, náuseas y "las luces se ven rodeadas
por círculos amarillos". K+ **3.1 mEq/L** tras automedicarse HCTZ **25 mg/día** hace 3 semanas. ECG: bigeminismo
ventricular y PR **0.24 s** (normal < 0.20 s). (Digoxin/Reversible Cell Damage/Trousseau)

---

## 4. Isquemia miocárdica y síndromes coronarios agudos

### ANCLA
Balanza: **Isquemia = Demanda > Suministro**; *"All ACS treatments are designed to either decrease myocardial oxygen
demand or restore and maintain blood supply."* (*MONA (and THROMBINS2) for the USMLEs*)

```
Estilo de vida / HTA / DM → placa ateromatosa INESTABLE
  → RUPTURA AGUDA de placa (exposición del núcleo lipídico / factor tisular)
  → activación plaquetaria → trombo ARTERIAL agudo
  → oclusión súbita (LAD / RCA / CX)
  → necrosis de miocitos por isquemia de suministro
  → daño de membrana → fuga de troponina I/T y CK-MB
```
(High Yield Cardiology Part 2)

**Evolución histológica + complicación por tiempo** (High Yield Cardiology Part 2; fibrosis en *How to Score 260+ on
USMLEs in 2026*):
1. **0-24 h**: necrosis de coagulación, bandas de contracción; hacia las 24 h influjo de **neutrófilos**. Riesgo:
   **arritmias ventriculares letales (FV/TV)** por inestabilidad eléctrica.
2. **Días 3-5**: **macrófagos** reemplazan a neutrófilos y fagocitan el tejido necrótico → miocardio blando, débil, sin
   soporte. Riesgo: **rupturas mecánicas**:
   - pared libre del VI → hemopericardio → **taponamiento** (shock obstructivo agudo);
   - músculo papilar (**póstero-medial**, infarto de RCA) → insuficiencia mitral aguda masiva + edema pulmonar hiperagudo;
   - septo IV → CIV con **"step-up" de saturación de O2 en el VD**.
3. **Semanas-meses**: fibroblastos → colágeno → cicatriz fibrosa permanente.

Regla de precarga en infarto del VD: en infarto inferior con sospecha de afectación del VD **evitar nitroglicerina**
(dependencia de precarga). (High Yield Cardiology Part 2)

### EXAMEN
Infarto inferior (II, III, aVF) hace **4 días**; súbita disnea extrema, esputo asalmonado, **nuevo soplo holosistólico
apical áspero 4/6 irradiado a axila**; preguntan cambios en PCWP y presión del atrio izquierdo → ruptura de músculo papilar
→ IM aguda masiva → **PCWP muy elevada** (flujo retrógrado al AI). El estudiante lo confunde con ruptura septal; el soplo
apical + crepitantes orientan a papilar. (*USMLE Step 1 Cheat Sheet: Swan-Ganz catheters, wedge pressure, mitral
stenosis, LVEDP*)

### ERROR
- Creer que el IAM ocurre por crecimiento lento de la placa hasta ocluir el 100 %: es **siempre un evento súbito de
  ruptura + inflamación + trombosis**, incluso en estenosis previas < 50 %. (High Yield Cardiology Part 2)
- No distinguir trombo arterial (flujo rápido, **plaquetas** → antiagregantes: AAS, clopidogrel) de trombo venoso (flujo
  lento, **cascada de coagulación** → anticoagulantes: heparina, warfarina). (*The Secrets to Excelling in USMLE Step 1:
  Expert Advice*)

### FRASE / ANALOGÍA
- Globo con canicas (fuga enzimática): el miocito es un globo lleno de agua con canicas de colores (troponinas, CK-MB);
  solo si el globo se pincha (daño de membrana por isquemia) las canicas aparecen en el suelo (sangre). (*High Yield
  Hematology for Shelf Exams & Step 1 + Step 2 CK*)
- Literal: *"Ischemia is simply a mismatch of demand and supply."* (MONA and THROMBINS2)

### VIÑETA
Hombre de **58 años**, dolor opresivo retroesternal de **3 h** irradiado a hombro izquierdo paleando nieve. PA **150/90**,
FC **92**. ECG: elevación del ST de **2.5 mm** en II, III, aVF. Troponina I **4.8 ng/mL**. Recibe AAS **325 mg**; se
**evita nitroglicerina** por sospecha de infarto del VD (comprometería la precarga). (High Yield Cardiology Part 2)

---

## 5. Insuficiencia cardíaca: compensación neurohormonal, fármacos, edema

### ANCLA
Círculo vicioso de sobrecompensación (*How Your Step 1 Prep Influences the Rest of Your Career*):
```
Pérdida de masa contráctil (IAM) o sobrecarga crónica de presión (HTA)
  → ↓ contractilidad o rigidez ventricular → ↓↓ GC
  → ↓ PAM (= GC × RPT)
  → barorreceptores disparan menos → el cerebro lo lee como HIPOVOLEMIA
  → activación masiva de SNS + RAAS
  → vasoconstricción (↑ poscarga) + retención de Na+/agua (↑ precarga)
  → el ventrículo débil bombea contra más resistencia → ↑ estrés de pared, ↑ demanda de O2
  → muerte acelerada de miocitos, remodelación excéntrica → "death spiral"
```

**Fármacos que reducen mortalidad**: IECA/ARA-II/espironolactona (bloquean retención de agua por aldosterona y
vasoconstricción por AT-II → ↓ poscarga, frenan remodelación) · β-bloqueantes (carvedilol, metoprolol succinato:
bloquean la estimulación simpática crónica destructiva sobre β1 → ↓ FC, protegen del apoptosis por catecolaminas).
(How Your Step 1 Prep Influences the Rest of Your Career)

**Izquierda vs derecha**: disnea, ortopnea, crepitantes basales, S3 = congestión pulmonar (izquierda) · edema de MMII,
hepatomegalia, ascitis, PVY ↑ = congestión venosa sistémica (derecha). (How 260+ Scorers Master Cardio)

**Escape de aldosterona** (aplicable al edema): en hiperaldosteronismo primario (Conn) no hay edema generalizado pese a
retener Na+/agua porque el estiramiento auricular libera **ANP** → natriuresis → nuevo equilibrio. (*High Yield Family
Medicine Review for Step 2 CK & Shelf Exam*)

### EXAMEN
EPOC de larga evolución con edema bilateral hasta rodillas, hepatomegalia dolorosa y PVY **16 cm H2O**; Rx y
auscultación con **pulmones limpios**; preguntan la PCWP → el estudiante marca "elevada" (asume ICC global); la
respuesta es **normal o baja**: pulmones limpios descartan fallo izquierdo → cor pulmonale aislado → PCWP (≈ presión de
AI) normal/baja por falta de flujo hacia la izquierda. (How 260+ Scorers Master Cardio)

### ERROR
- Asumir que el edema de MMII implica fallo izquierdo; tratar la ICC como entidad única sin disecar izquierda/derecha.
  (How 260+ Scorers Master Cardio)
- Creer que dar β-bloqueantes en IC es contradictorio ("un corazón débil necesita simpático"): la estimulación simpática
  crónica lo destruye. (How Your Step 1 Prep Influences the Rest of Your Career)

### FRASE
- Literal: *"In heart failure, the body's compensatory mechanisms of sympathetic tone and RAAS activation are highly
  dysfunctional and actually worsen the disease. That is why blocking them with beta-blockers and ACE inhibitors
  improves patient survival."* (How Your Step 1 Prep Influences the Rest of Your Career)

### VIÑETA
Mujer de **68 años** post-IAM, disnea de esfuerzo progresiva, duerme con **3 almohadas**. PA **135/88**, FC **84**, FR
**20**. Crepitantes húmedos bibasales, **S3** apical. Se inicia IECA para ↓ poscarga y ↓ mortalidad. (How 260+ Scorers
Master Cardio)

---

## 6. Curvas presión-volumen, Frank-Starling, retorno venoso y hemodinámica (ley de Ohm)

### ANCLA
Primer principio físico: **ΔP = Flujo × Resistencia**, es decir **PAM = GC × RPT** (*The Most Useful USMLE Equation
Ever*). Literal (High Yield Cardiology Part 2): *"If I were to tattoo anything to my wrist, it would be preload,
afterload, contractility, and the equation MAP = CO x TPR."*

**Vasos como resistores en paralelo** (*High Yield Family Medicine: Part 2 - Step 2 CK & Shelf Exam*):
1. Los lechos de órganos (renal, fístula AV, ductus persistente) están en **paralelo**.
2. 1/R_total = 1/R1 + 1/R2 + … + 1/Rn.
3. Añadir un conducto en paralelo (fístula AV, PDA) **baja obligatoriamente la RPT**.
4. ↓ RPT → ↓ poscarga → para sostener la PAM el **GC debe subir** (IC de alto gasto).
5. Cerrar el shunt (cirugía de fístula, cierre de PDA o CIV) = quitar un resistor en paralelo → **↑ RPT, ↑ poscarga, ↓ GC
   compensatorio**.

**Estenosis valvular = problema de RESISTENCIA, no de presión**: la presión retrógrada en el AI (estenosis mitral) es
consecuencia tardía de ΔP = Flujo × R para vencer la válvula estrecha y sostener el llenado. (Swan-Ganz/wedge
pressure/mitral stenosis/LVEDP)

### EXAMEN
Paciente con ERC al que se le crea una fístula AV para hemodiálisis; preguntan flechas de GC y RPT inmediatas → fístula =
resistor en paralelo añadido → **RPT ↓, GC ↑**. (High Yield Family Medicine Part 2)

### ERROR
- Confundir presión con resistencia (ver estenosis mitral/aórtica como "presión alta"). (Swan-Ganz/wedge/mitral stenosis)
- Resolver fístulas y shunts "por intuición" (sistema 1) en vez de modelar resistores en paralelo + Ohm hemodinámico.
  (High Yield Family Medicine Part 2)

### FRASE / ANALOGÍA
- **Manguera de jardín**: grifo = P1 (aorta), boquilla = P2 (AI/venas), agua expulsada = flujo (GC), diámetro = resistencia
  (RPT). Si doblas la manguera ("kink") ↑ resistencia → **la presión se acumula detrás del doblez (P1 ↑), cae después
  (P2 ↓) y el flujo total cae**. Esa física explica estenosis mitral, coartación aórtica y síndrome compartimental.
  (The Most Useful USMLE Equation Ever)

### VIÑETA
Hombre de **45 años**, herida por arma de fuego en muslo derecho hace 2 años, disnea y fatiga; soplo continuo con frémito
en fosa poplítea. Eco: GC **8.2 L/min** (normal ≈ 5.0), RPT baja, PVC alta → fístula AV traumática; su cierre normaliza
el GC y eleva la RPT. (High Yield Family Medicine Part 2)

