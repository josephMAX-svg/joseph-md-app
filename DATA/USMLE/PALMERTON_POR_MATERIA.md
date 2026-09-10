# PALMERTON POR MATERIA — USMLE Step 1 · v3 (10-sep-2026 · régimen v5.9)

> **Qué es este documento.** La guía de estudio por materia del bloque USMLE, reconstruida desde el
> método real de **Alec Palmerton, MD** (yousmle.com · canal `@alec.palmerton_md`) tal como está
> recogido en el cuaderno NotebookLM **"STEP 1 · Palmerton Engine"** (295 fuentes: ~146 vídeos +
> 149 artículos).
> URL del cuaderno: <https://notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86>
>
> **Qué cambia respecto a la v2 (31-ago).** La v2 era un *catálogo* (qué vídeo existe por materia).
> La v3 es el **método**: por cada sistema, el **concepto ancla y su cadena causal**, el
> **subtema a subtema** (mecanismo → pregunta típica → error → frase/analogía literal → viñeta con
> cifras), los **high-yield**, las **fuentes** y el **anclaje al plan real** (D# + fecha + nivel
> UWorld del día). Se conservan íntegras de la v2: las **URLs verificadas**, la **Parte V** de
> mínimos on-track por hito y el **checklist §G** del patrón de los que fallan.
>
> **Fuente de la síntesis**: los 6 extractos de materia de `_palmerton_v3_extractos/`
> (cardio-resp · renal-gi · endo-neuro · heme-inmuno-micro · pharm-biochem-biostats ·
> repro-msk-psych-path), construidos leyendo transcripciones y artículos íntegros en local y
> completados con consultas dirigidas a NotebookLM (5 y 8-sep-2026).
>
> **Marcas de fiabilidad (regla anti-alucinación, se respetan en todo el documento):**
> · ✅ **verificado** contra fuente primaria (transcripción o artículo leído íntegro)
> · ⚠ **síntesis NotebookLM** — fisiología correcta, atribución a Palmerton **no** verificada
> · ❌ **NO ESTÁ EN EL CORPUS** — declarado ausente; **no** estudiarlo "según Palmerton"
> · 🔎 **A VERIFICAR (08-sep)** — afirmado sin cita que lo respalde → `pendiente_usuario`
>
> **Tesis central** (270 en Step 1, Stanford / Harvard-MGH): *mastery, not memorization*. El
> conocimiento lleva a ~220-230; de ahí en adelante el puntaje sube reduciendo errores de
> interpretación (~50 % de los fallos) y dominando mecanismo.
>
> **Plan de referencia (v5.9, NO tocar)**: D1 = **VIE 11-sep-2026** → D95 = **MAR 26-ene-2027** ·
> Fases **A contenido D1-D80** · **B banco D81-D88** · **C sprint D89-D95** · examen semana
> 25-29 ene 2027 · fuente de verdad `src/lib/usmleStep1Daily.ts` (95 días, cada uno con
> `nivelUW` 1-5 y `qDia`). Todas las fechas y D# de este documento están **leídos del .ts**,
> no estimados.
>
> **Corrimiento v5.8 → v5.9 (10-sep-2026)**: el 10 de septiembre tampoco se estudió → todo corre
> +1 día hábil. **No se fusiona ni se recorta NADA** (regla de Joseph): el temario sale 1:1 y el
> desfase se absorbe alargando el final del plan hasta el **mar 26-ene-2027**. El **D1 es ahora el
> UWSA1** (vie 11-sep: baseline en el primer día, como prescribe Palmerton) y el **contenido arranca
> el lun 14-sep (D2)**. Las 12 fechas de hito, las franjas, las metas y la ventana de examen no
> cambian; sí cambian los **D#** y **qué contenido cae en viernes** (los 6 días de nivel 3, §A-5).

---

## MAPA RÁPIDO: MATERIA → D# → FECHAS → NIVEL UWORLD

| # | Materia / sistema | D# | Fechas reales | Nivel UW de esos días |
|---|---|---|---|---|
| 0 | Marco transversal (instalar en D2-D5) | D2-D5 | lun 14-sep → jue 17-sep | 1 (D1 = UWSA1, nivel 5, vie 11-sep) |
| 1 | Fundamentos / Patología general | D2 · D3 | lun 14-sep · mar 15-sep | 1 · 30Q |
| 2 | Inmunología | D4 · D5 | mié 16-sep → jue 17-sep | 1 · 30Q |
| 3 | Cardiología | D6-D15 | vie 18-sep → jue 1-oct | 1→2, con **N3 en D11 (vie 25-sep)** |
| 4 | Respiratorio | D17-D22 | lun 5-oct → lun 12-oct | 1 (D17, D18) · 2 (D19, D20, D22) · **3 (D21, vie 9-oct)** |
| 5 | Renal | D23-D28 | mar 13-oct → mar 20-oct | 1 (D23-24) · 2 (D25, D27, D28) · **3 (D26, vie 16-oct)** |
| 6 | Gastroenterología e hígado | D29 · D30 · D32-D36 | mié 21-oct → jue 22-oct · lun 26-oct → vie 30-oct | 1 (D29-30) · 2 (D32-D35) · **3 (D36, vie 30-oct)** |
| 7 | Endocrinología | D37-D41 | lun 2-nov → vie 6-nov | 1 (D37-38) · 2 (D39-40) · **3 (D41, vie 6-nov)** |
| 8 | Neurología | D42-D45 · D47-D50 | lun 9-nov → jue 12-nov · lun 16-nov → jue 19-nov | 1 (D42-43) · 2 (resto) |
| 9 | Hematología y oncología | D51-D56 | vie 20-nov → vie 27-nov | 1 (D51-52) · 2 (D53-55) · **3 (D56, vie 27-nov)** — el otro viernes (D51, 20-nov) abre el sistema → N1 |
| 10 | Microbiología / ID | D57-D60 · D62-D64 | lun 30-nov → jue 3-dic · lun 7-dic → mié 9-dic | 1 (D57-58) · 2 (resto) |
| 11 | Reproductor / OB-GYN | D65-D69 | jue 10-dic → mié 16-dic | 1 (D65-66) · 2 (D67-69) — **sin viernes N3** (el vie 11-dic, D66, es el 2º día del sistema) |
| 12 | MSK / Reuma / Derma Step 1 | D70 · D72 · D73 | jue 17-dic · lun 21-dic → mar 22-dic | 1 (D70, D72) · 2 (D73) |
| 13 | Psiquiatría y conductual | D74-D76 | mié 23-dic → lun 28-dic | 1 (D74-75) · 2 (D76) |
| 14 | Bioestadística + epidemiología + ética | D77 | mar 29-dic | 2 · 40Q (AMBOSS HY 155Q) |
| 15 | Bioquímica + genética + farmacología general | D79 · D80 | lun 4-ene · mar 5-ene | 1 · 30Q (días dobles heredados de la v5.7) |
| — | **Fase B** banco (`faseDe` = B: D81-D88) | D81 · D82 · D84-D87 (+ D90 y D92, banco alojado en la semana del sprint) | 6-ene → 7-ene · 11-ene → 14-ene (+ 19-ene y 21-ene) | 4 (D81 · D82 · D84 · D85) → 5 (D86 · D87 · D90 · D92) · 80Q |
| — | **Fase C** sprint final (`faseDe` = C: D89-D95) | D89 · D91 · D93-D95 | 18-ene → 26-ene | 5 |

**Hitos (fechas INTACTAS, D# nuevos)**: UWSA1 **D1** 11-sep · NBME 25 **D16** 2-oct ·
NBME 26 **D31** 23-oct · NBME 27 **D46** 13-nov · NBME 28 **D61** 4-dic · NBME 29 **D71** 18-dic ·
NBME 30 **D78** 30-dic · UWSA2 **D83** 8-ene · NBME 31 **D88** 15-ene (GO/NO-GO) ·
NBME 32 **D89** 18-ene · NBME 33 **D91** 20-ene · Free 120 **D93** 22-ene. Todos a nivel UW 5.

**Farmacología transversal (no tiene bloque propio hasta D80, mar 5-ene)**: D11 antiarrítmicos + autonómicos CV
(25-sep) · D19 broncodilatadores (7-oct) · D24 diuréticos por segmento (14-oct) · D40 insulinas /
ADO / GLP-1 / SGLT2 (5-nov) · D45 SNA completo (12-nov) · D48 antiepilépticos (17-nov) ·
D56 quimioterápicos (27-nov) · D64 antimicrobianos (9-dic) · D69 anticoncepción (16-dic) ·
D76 psicofármacos (28-dic) · **D80 PK/PD + toxicología + antídotos (5-ene)**.

---

# PARTE 0 — EL MARCO QUE ATRAVIESA TODO (instalar ANTES de la patología)

*(Fuentes: HY Cardiology 1 y 2, How 260+ Scorers Master Cardio, HY Respiratory — leídos íntegros)*
**→ En tu plan: D2-D5 (14-sep → 17-sep, nivel UW 1); se re-audita en cada hito.** (El D1, vie 11-sep, es el UWSA1: baseline antes de instalar nada.)

**1. El tatuaje.** ✅ Lo repite en los tres vídeos de cardio como núcleo del sistema:
> *"If I were to tattoo anything to my wrist, it would be preload, afterload, contractility, and the
> equation MAP = CO × TPR = HR × SV × TPR."*

Definiciones suyas, deliberadamente simples ✅: **precarga = "how full the heart is"** ·
**poscarga = "the resistance the heart is pumping against"** · **contractilidad = "how much
strength does the heart have to pump"**.

**2. Las tres presiones de perfusión** ✅ (todas la misma idea: *presión de donde viene − presión de
a dónde va*):

```
Perfusión (genérica) = P(origen) − P(destino)
PPC cerebral   = PAM − PIC
PPC coronaria  = PA diastólica aórtica − LVEDP
```
> *"You don't have to memorize this. You can actually make sense of it."* ✅

**3. ΔP = Flujo × Resistencia — "la ecuación más útil de todas"** ✅ (Art. *The Most Useful USMLE
Equation Ever*). Si sube la resistencia y hay que mantener el flujo, **la presión se acumula detrás
(P1↑) y cae delante (P2↓)** y el flujo cae igualmente.
> *"If you're watering your garden… What happens if you kink the hose? The pressure builds up behind
> the kink, drops beyond it, and ultimately reduces flow."* ✅

Aplicaciones que él mismo enumera ✅: **ERGE** (hernia hiatal = ↓R; obesidad = ↑P1; elevar la cabecera
= ↑R "reflujo cuesta arriba") · **estenosis mitral** (↑R valvular → ↑presión en AI) · **úlcera por
presión / isquemia traqueal por neumotaponamiento** · **síndrome compartimental** (edema en
compartimento cerrado → ↑P tisular → ↓flujo → más edema → fasciotomía).

**4. Resistores en serie vs en paralelo** ✅ — el concepto que "da ojos nuevos":
`SERIE: R = R1+R2+R3` (quitar uno BAJA la R) · `PARALELO: 1/R = 1/R1+1/R2+…` (**quitar uno SUBE la
R total** ← contraintuitivo, es la clave). Demostración numérica de clase: 3 resistores de 2 en
paralelo → R = 0,67; quito uno → R = 1. **SUBIÓ.**
> *"Everyone remembers this side of the equation. No one remembers this side. And I've made this
> mistake multiple times."* ✅
> *"The true voyage of discovery is not in seeking new lands, but in having new eyes"* (Proust, que
> usa literalmente para justificar modelar los vasos como resistores). ✅

**5. Cronología patofisiológica (PC), no análisis frase a frase** ✅:
> *"Your system one is unaware of time."* Hay que **reordenar la viñeta en orden cronológico real**,
> porque el H&P se escribe al revés (motivo de consulta primero, historia social al final).
Ejemplo suyo ✅: la viñeta dice *mareo → dolor de pierna → dolor dorsal → 20 paquetes-año*; el orden
real es **tabaquismo → cáncer de páncreas + dolor dorsal → TVP → TEP → mareo**.

**6. Juez, no abogado** ⚠/✅: el abogado busca el dato que no encaja para descartar la respuesta
correcta; el juez decide por **preponderancia de la evidencia**.
> *"You have to be comfortable emotionally with choosing an answer that doesn't feel perfect… It's
> actually expected that you choose an imperfect answer."* ⚠
Caso citado ⚠: el alumno descartó insuficiencia cardíaca **porque había un S4** ignorando JVD +
crepitantes; la respuesta era **amiloidosis cardíaca**.
Corolario verificado ✅: *"the lack of a symptom doesn't necessarily mean that it's not there"* — si
no te dan un dato (p. ej. la frecuencia respiratoria), **no tienes un negativo pertinente**. Solo se
descarta una opción con **un dato positivo que la contradiga** (ejemplo suyo: descartar B12 si el
VCM es 82 fL, porque una microcitosis contradice físicamente la macrocitosis obligatoria).

**7. Los valores normales SÍ se memorizan** ✅ (HY Respiratory):
> *"Every second you spend looking at lab values is another second you're not spending interpreting
> a sentence."* Exige de memoria: **PCO2 = 40 · HCO3 = 24 · pH 7,35-7,45**.
Segundo tatuaje ✅ (HY Renal 2): *"Next to your tattoo MAP = CO × TPR, the second thing I'd add is
**specific gravity 1.010 = isostenuria = urine osm 300**."*

**8. "You've got to give me some arrows."** ✅ — la frase que resume el método entero. No se acepta
ni un **mecanismo sin diagnóstico** ("aumentó la permeabilidad vascular") ni un **diagnóstico sin
mecanismo** ("sepsis"): exige las dos cosas unidas por flechas.
Estándar de explicación que impone ✅:
> *"If I didn't already understand what you were saying, I would have had a hard time following. The
> standards we have to hold ourselves to have to be exceedingly high to do well on Step 1."*

**9. Los dos tipos de tarjeta, y solo dos** ✅ (HY Cardio 1):
1. **Concepto automático**: *"presíncope ⇒ hipotensión"*, *"signos de IC + pulmones limpios ⇒ fallo
   derecho aislado"*, *"quitar un resistor en paralelo ⇒ ↑R total"*, *"ST en II-III-aVF ⇒ ojo con
   nitratos"*.
2. **Tarjeta PC (cronología patofisiológica)**: delante la **viñeta**, detrás la **cadena de flechas
   completa**. Fuera del examen se recita la versión detallada — *"muscle memory for your brain"*.
**Regla del anverso** ✅: la tarjeta mala te regala la respuesta en el enunciado (*"en la estenosis
aórtica, explica por qué un gradiente alto produce HVI y luego insuficiencia cardíaca"*). La buena es
**deliberadamente vaga por delante**: *"un cateterismo muestra un gradiente de 50 mmHg a través de la
válvula aórtica: ¿qué significa y qué complicaciones esperarías?"*

**10. Nivel de detalle según contexto** ✅:
```
EN EL EXAMEN (cronometrado): "IAM de la RCA → isquemia del nodo AV → bloqueo de 3.er grado →
                              bradicardia sintomática → síncope". Punto.
FUERA DEL EXAMEN            : TODO el detalle posible — es lo que hace que en el examen salga automático.
```
**Dónde poner el esfuerzo** ✅: *"focus on the parts that are slowest"* — los tramos de la cadena
donde titubeas al recitarla son el material de estudio del día siguiente.

**11. Diagnóstico del fallo, no autoflagelación** ✅ (HY Cardio 2):
> *"If you get to an exam question and you're like 'gosh, I don't understand what they're telling me'
> — that's not a problem on the day of your test, that's a problem in your preparation."*

---

# PARTE I — POR MATERIA

## 1. Fundamentos y Patología general

**→ En tu plan: D2 (lun 14-sep-2026, nivel UW 1 · 30Q) y D3 (mar 15-sep-2026, nivel UW 1 · 30Q).**
D2 = Pathoma 1-2 (lesión celular + muerte celular + inflamación) · D3 = Pathoma 3 (neoplasia,
principios y carcinogénesis) + setup Anki FSRS. Vídeos anclados en el `.ts`: *The ONLY Video You Need
to Pass Step 1 in 2026* (`BOtQJeFE_rc`) y *5X Your Anki Efficiency (FSRS)* (`Te5RnxeG_Gg`).

### (a) Concepto ancla y cadena causal
**La respuesta a la lesión es un patrón único y reproducible, y el examen lo testa siempre igual**
✅ (HY Immunology, íntegro):
```
Inflamación AGUDA   = NEUTRÓFILOS
Inflamación CRÓNICA = MACRÓFAGOS + LINFOCITOS
Cronología post-IAM (= modelo genérico de respuesta a la lesión):
   24 h      → neutrófilos
   3-5 días  → macrófagos (limpieza del tejido necrótico)
   semanas   → fibroblastos → colágeno → cicatriz
"CHRONIC INFLAMMATION LEADS TO FIBROSIS"  ← una sola idea explica la cicatriz post-IAM, el rechazo
crónico de trasplante, el capuchón fibroso del ateroma y el remodelado de la insuficiencia cardíaca
```

### (b) Subtema a subtema

**1.1 Por qué el examen usa el IAM y no el ictus** ✅ — dice habérselo oído a **un redactor real de
preguntas del Step 1**: un comité de expertos debe poder ver la pregunta y saber la respuesta **sin
ver las opciones**; la respuesta del miocardio a la isquemia es *idéntica y constante* a las 24 h,
mientras que el cerebro a los 5 días de un ictus es histológicamente mucho más variable.
*"There's only one right answer."*
· **PREGUNTA TÍPICA**: cualquier "¿qué célula predomina a las X horas/días?" es la misma pregunta, la
pongan en el corazón, el riñón o la piel.
· **ERROR** ✅: estudiar la cronología del IAM como tabla de cardiología en vez de como el **modelo
genérico de respuesta a la lesión**.
· **FRASE** ✅: *"If you see lymphocytes and macrophages on your test and you don't think 'chronic
inflammation', I will shed tears."* Y la del patólogo redactor de preguntas: *"Look for the
macrophages on your test and you will see them. And right next to the macrophage you will see a
little bouncing happy face, because you will get so many points."*

**1.2 Lesión celular reversible: la bomba Na/K y el edema celular** ✅ (Art. *Digoxin, Reversible
Cell Damage and Trousseau's Sign*, leído íntegro):
```
Hipoxia → baja el ATP → se para la Na+/K+ ATPasa (saca 3 Na+ y mete 2 K+ = saca MÁS de lo que mete)
   → al pararse se acumulan iones DENTRO → entra agua → TUMEFACCIÓN CELULAR
   = el cambio histológico de la isquemia REVERSIBLE
```
La misma despolarización parcial explica el **signo de Trousseau** del hipocalcémico (→ §12.2).

**1.3 Marcadores de daño = "canicas dentro de un globo"** ✅ (HY Heme):
> *"If you think of the cell as a balloon and these special proteins are like marbles — if the
> balloon pops and the marbles leak out, you should only see the marbles if there's been damage."*
· Troponina I/T = **específica** de miocito cardíaco · CK = inespecífica (IAM y rabdomiólisis) ·
LDH = inespecífica pero útil en hemólisis (→ §9.2).
· **ERROR** ✅ corregido en directo: decir que la LDH "es específica porque está en todas las
células" — *"when I say specific I mean it's only found in one particular kind of cell"*.

**1.4 Necrosis, apoptosis y el absceso** ✅/⚠
· Necrosis coagulativa (renal) · la mitocondria libera **citocromo c** para la apoptosis y **el tumor
la suprime** para evadirla ✅ (HY Nuclear).
· **Dentro de un absceso NO hay vasos** → el antibiótico sistémico no llega → **drenaje físico** ✅:
> *"You have an MRSA abscess. What do you treat it with? You physically drain it — it's not
> vancomycin."*
· ❌ **NO están en el corpus**: caspasas y vía extrínseca (Fas/TNF), TGF-beta, radicales libres /
catalasa / SOD, y las adaptaciones celulares (atrofia, hipertrofia, hiperplasia, metaplasia,
displasia) como bloque → **First Aid + UWorld**.

**1.5 Neoplasia** ✅/⚠
· **Warburg / PET** ✅ (HY Nuclear): el tumor suprime la mitocondria (evita la liberación de citocromo
c → evade la apoptosis) → pierde la fosforilación oxidativa → depende de glucólisis anaerobia
ineficiente → *glucose avid* → **brilla en PET-FDG** (el elemento radiactivo es el **flúor-18**).
Corazón y **vejiga** brillan fisiológicamente (glucosa > 200 mg/dL supera la reabsorción tubular).
Ayuno previo "para que el tumor esté hambriento".
· **Nódulo frío vs caliente** ✅: el cáncer "por lo general no produce hormona" (cuanto más maligno,
menos se parece a la célula original) → **frío = sospechoso, caliente = tranquilizador**; los
secretores suelen ser **adenomas** (prolactinoma); excepción: **paraneoplásicos** del microcítico.
· **Criterios histológicos** ✅: normocromía + simetría + **ausencia de pleomorfismo** = benigno;
hipercromía (relación núcleo/citoplasma alta) + asimetría + **pleomorfismo** (*pleo* = muchos,
*morfismo* = formas) = maligno.
· **Sangrado indoloro como presentación** ✅: *"una de las presentaciones más comunes del cáncer en la
vida y en Step 1"* — **hematuria indolora** (renal, urotelial), **ictericia indolora** (páncreas),
**anemia ferropénica en varón (o posmenopáusica) = cáncer de colon hasta demostrar lo contrario**
("no es que los varones tengan más cáncer de colon: es que las mujeres tienen muchas otras causas de
ferropenia").
· **Hiperplasia vs neoplasia** ✅ (HY Endo): *la hiperplasia responde a señales de crecimiento; la
neoplasia crece con independencia de ellas*, aunque sea benigna (lipoma gigante).
· ❌ **NO están**: oncogenes y supresores (p53, Rb, HPV E6-E7), metástasis como mecanismo,
calcificación distrófica vs metastásica sistematizada (solo la mención de que la inflamación crónica
explica la distrófica).

**1.6 Amiloidosis — el mecanismo del proteasoma** ✅ (HY Cardio 1 + HY Endo, citas verificadas):
```
Siempre hay producción de fondo de proteínas mal plegadas → ubiquitinación → proteasoma
   → los fragmentos se cargan en MHC I para que el CD8 muestree el interior celular
   PERO las regiones HIDROFÓBICAS no son degradables → se acumulan, se pegan entre sí (insolubles)
   → polimerizan en LÁMINAS BETA PLEGADAS → depósito que "obstructs physiologic processes"
SOBREPRODUCIR la proteína multiplica el residuo:
   amilina en DM2 · calcitonina en carcinoma medular · AA en inflamación crónica
```
> *"For Step 1 they LOVE ubiquitin and the proteasome. There are a disproportionate number of
> questions about the proteasome."* ✅
· ⚠ **Amiloidosis cardíaca**: paredes gruesas con patrón moteado ("speckled") en el eco **pero QRS de
BAJO VOLTAJE** — el amiloide no conduce. **Esa disonancia es la pregunta.**
· ❌ AL / AA / ATTR / Alzheimer como entidades clasificadas: no están.

### (c) High-yield del bloque
Lesión reversible vs irreversible (bomba Na/K y edema celular) · marcadores de daño de membrana ·
necrosis por tipos · apoptosis y citocromo c · inflamación aguda vs crónica y su cronología ·
fibrosis como desenlace común · granuloma (→ §2.2) · principios de neoplasia (Warburg, frío/caliente,
criterios de malignidad, sangrado indoloro, paraneoplásicos) · amiloide vía proteasoma.

### (d) Fuentes
Vídeos: *The ONLY Video You Need to Pass the USMLE Step 1 in 2026* (`BOtQJeFE_rc`, ID verificado en
`src/lib/usmleStep1Daily.ts`) ⚠ · [High Yield Immunology](https://www.youtube.com/watch?v=Nfp3hs490wM) ✅ ·
*High Yield Nuclear Medicine: PET, SPECT, VQ Scans* ✅.
Artículos (URLs verificadas, conservadas de la v2): [Question Interpretation](https://www.yousmle.com/question-interpretation/) ·
[UWorld + First Aid: 4 Keys](https://www.yousmle.com/nail-fundamentals-usmle-step-1-nbme-practice-exams/) ·
[Resources](https://www.yousmle.com/resources/) ·
[Digoxin / Reversible Cell Damage / Trousseau](https://www.yousmle.com/usmle-step-1-bosses-digoxin-reversible-cell-damage-trousseaus-sign/).
Material del plan: **Pathoma 1-3 primero y re-verlo la última semana**; Goljan Rapid Review de respaldo.

### (e) → En tu plan
**D2 = lun 14-sep-2026 (nivel UW 1 · 30Q)** · **D3 = mar 15-sep-2026 (nivel UW 1 · 30Q)**.
Reaparece transversalmente en Heme (D51-D56, 20-nov → 27-nov), Micro (D57-D64, 30-nov → 9-dic) y como
marco de toda viñeta. El repaso rápido de First Aid/Pathoma vuelve en **Fase C: D94 (lun 25-ene) y
D95 (mar 26-ene)**, ambos a nivel UW 5.

---

## 2. Inmunología

**→ En tu plan: D4 (mié 16-sep-2026, nivel UW 1 · 30Q) y D5 (jue 17-sep-2026, nivel UW 1 · 30Q).**
D4 = inmunidad innata/adaptativa + MHC + linfocitos T/B · D5 = hipersensibilidades I-IV +
autoinmunidad + inmunodeficiencias. Vídeo: [High Yield Immunology](https://www.youtube.com/watch?v=Nfp3hs490wM).

> **Aviso de cobertura** ✅: el vídeo de Inmunología **no es un vídeo de inmunología clásica**: es un
> vídeo sobre **inflamación crónica, citocinas y granulomas** que termina disecando una viñeta NBME
> completa (pielonefritis xantogranulomatosa). MHC, hipersensibilidades y vacunas conjugadas viven en
> el **artículo de vacunas conjugadas/ABO** y en Family Medicine.

### (a) Concepto ancla y cadena causal
**Activación de células B dependiente de células T** ✅ (artículo ABO/Vacunas, íntegro):
```
El MHC solo exhibe PÉPTIDOS → los linfocitos T SOLO se activan contra PROTEÍNAS
   (nunca contra carbohidratos ni lípidos)
Los linfocitos B se activan contra proteína, carbohidrato Y grasa, pero nacen produciendo IgM
El CAMBIO DE ISOTIPO (IgM → IgG/IgA/IgE/IgD; cambia el Fc, no la zona de reconocimiento)
   EXIGE un T helper activado que coactive a la B
⇒ Antígeno de carbohidrato puro = SOLO IgM: sin cambio de isotipo, sin hipermutación somática,
   sin memoria B
```
Esa única cadena resuelve **tres** preguntas distintas: (a) por qué la eritroblastosis fetal es de
**Rh y no de ABO**, (b) por qué fallan las **vacunas de polisacárido puro**, (c) por qué un paciente
**A+ hace anti-B**. **ERROR** ✅: estudiar ABO, vacunas conjugadas e inmunología básica como tres
bloques distintos — *son la misma cadena*, y ese es literalmente el título del artículo.

### (b) Subtema a subtema

**2.1 Citocinas: "one hot T-bone stEAK" + TNF + IFN-gamma** ✅ (HY Immuno, íntegro)

| | Letra | Función | Mecanismo que hay que poder recitar |
|---|---|---|---|
| **IL-1** | **hot** | **Fiebre** | macrófagos → prostaglandinas vía **COX** en el hipotálamo → **bloqueada por AINE/aspirina** |
| **IL-2** | **T** | estimula linfocitos **T** | — |
| **IL-3** | **bone** | estimula la **médula ósea** | — |
| **IL-4** | **E** | producción de **IgE** | — |
| **IL-5** | **A** | producción de **IgA** | — |
| **IL-6** | **K** | reactantes de fase aguda | *"a-**K**-ute phase reactants"* → **VSG elevada** |

· **TNF-alfa** ✅ → macrófagos → **caquexia**. Se llamaba literalmente **"cachectina"**: al inyectarla
a ratones producía un estado de desgaste. Aumenta la lipólisis, moviliza proteína muscular y suprime
el apetito. > *"If there's one molecule you need to know for Step 1, it is TNF-alpha."* ✅
· **IFN-gamma** ✅ → linfocitos **T CD4+ (Th1)** → **activa el macrófago y lo transforma en CÉLULA
EPITELIOIDE** → granuloma.
· **VSG** ✅: da dos explicaciones y dice cuál usar. Descarta la "correcta" (cambio de fuerzas
repulsivas / constante dieléctrica): *"I don't even know what that means"*. Usa: **los hematíes se
vuelven más pesados por los reactantes de fase aguda y caen más rápido**. Uso clínico: autoinmunes y
**osteomielitis** pediátrica (junto a PCR).
· **PREGUNTA TÍPICA** ✅: explicar por qué **TB, cáncer, sarcoidosis, linfoma, arteritis de células
gigantes, lupus y AR comparten** fiebre, sudores nocturnos, pérdida de peso y VSG alta. La respuesta
no es cada enfermedad: es **inflamación crónica → macrófago activado → sus citocinas**.
· **ERROR** ✅ que él confiesa como suyo: memorizar los síntomas constitucionales enfermedad por
enfermedad — *"dependía tanto de First Aid que, si First Aid no decía 'fiebre en el cáncer', yo no la
aceptaba en una pregunta"*.
· Conexiones que exige ✅: **sudores nocturnos** = mecanismo compensador de disipación de calor de la
fiebre · **escalofríos** = generación de calor por contracción muscular (*"shivering is just a very
mild form"* de la hipertermia maligna).
· Digresiones del vídeo que son puntos de examen ✅: **aspirina en niños → síndrome de Reye**
(cerebro e hígado; caso real en Stanford de un superviviente que desarrolló **maldición de Ondina**);
**aspirina a dosis muy altas = DESACOPLANTE mitocondrial** → fiebre (→ §15.3).

**2.2 Granuloma: la célula epitelioide (la pregunta trampa clásica)** ✅
1. El granuloma es una **hipersensibilidad tipo IV**.
2. ¿Por qué lo forma el cuerpo? Para **amurallar** lo que no puede matar — coincide con Robbins:
   *"if you can't kill it, you've got to at least contain it."*
3. **La célula DEFINITORIA es la CÉLULA EPITELIOIDE. NO la célula gigante.**
4. Deriva del **MACRÓFAGO**; la activa el **IFN-gamma** del **CD4+**.
· **PREGUNTA LITERAL anticipada por él** ✅:
> *"They'll ask: 'what is the defining cell of a granuloma?' and they're going to have 'giant cell'
> as an option. **That is not the correct answer. The answer is epithelioid cell** — even though
> it's the most important cell that people have never heard of."*
· **ERROR**: responder "célula gigante multinucleada". Es **el distractor diseñado**.
· Enfermedades granulomatosas que lista ✅: sarcoidosis, TB, lepra, cáncer, vasculitis, lupus, AR.
· **Corolario endocrino** ✅: el macrófago epitelioide del granuloma expresa **1-alfa-hidroxilasa**
independiente de PTH → calcitriol → **hipercalcemia, hipercalciuria y litiasis cálcica** en la
sarcoidosis (→ §7.4 y §12.2). *"If you're studying for Step 1, tattoo this: the defining cell of a
granuloma is not the giant cell, it's the epithelioid macrophage."*

**2.3 Hipersensibilidades I-IV — la regla de oro** ⚠ (fuentes: HY FM 1, HY Immuno)
· **I (inmediata, IgE)**: alérgeno → IgE sobre el **mastocito**; en la 2ª exposición el antígeno
entrecruza IgE adyacentes → degranulación masiva. Ejemplo literal: **crisis asmática**.
· **II (citotóxica)**: anticuerpo contra antígeno **estructuralmente FIJO** → **inmunofluorescencia
LINEAL**. Ejemplos: **Goodpasture** (anti-membrana basal glomerular; *"nothing else looks like this
for Step 1"*) y **AHAI por anticuerpos calientes (IgG)**.
· **III (inmunocomplejos)**: anticuerpo contra antígeno **SOLUBLE y libre** → los complejos viajan y
se depositan al azar → patrón granular **"lumpy bumpy"**. Ejemplo: **GN postestreptocócica**.
· **IV (celular, retardada)**: **solo linfocitos T y macrófagos, sin anticuerpos**. Ejemplos: **PPD**
(la biopsia muestra T + macrófagos — *"they love macrophages on the test"*) y **granuloma**.
· **LA REGLA** ⚠: **tipo II = antígeno FIJO (IF lineal)** · **tipo III = antígeno SOLUBLE (IF
granular / lumpy-bumpy)**. El patrón de inmunofluorescencia **se deduce** de si el antígeno estaba
anclado o flotando; no se memoriza una lista de enfermedades.
· **Wegener / GPA es la excepción**: es **pauci-inmune** (IF negativa) porque el daño no es depósito:
> *"the neutrophils are like grenades and the ANCA antibodies pull the pin"* ✅ (HY Renal 1 / HY FM 1)
· **ERROR** ⚠: memorizar listas de enfermedades por tipo. Con "fijo vs soluble" y "con anticuerpo vs
sin anticuerpo" se regeneran las cuatro.

**2.4 Vacunas conjugadas, inmunización pasiva/activa y BTK a los 6 meses** ✅ (ABO/Vacunas, íntegro)
· **Cápsula bacteriana = POLISACÁRIDO. Excepción: *Bacillus anthracis*, cápsula de aminoácido
(ácido D-glutámico).**
· Vacuna de polisacárido puro → no activa T → **solo IgM, sin memoria** → ineficaz en niños pequeños.
· **Vacuna conjugada** = antígeno capsular **conjugado a una proteína muy inmunogénica** (toxoide
tetánico / de pertussis): la B reconoce el azúcar, internaliza el complejo y presenta **la porción
proteica en MHC II** al CD4+ → **IgG de alta afinidad, maduración de afinidad y memoria duradera**.
· **PASIVA** = dar anticuerpos ya formados (RhoGAM) · **ACTIVA** = dar antígeno.
· **Papel del bazo** ⚠: el aclaramiento de encapsulados depende de la opsonización por anticuerpos y
de la retirada física por macrófagos y células B de zona marginal esplénicas.
· ⚠ **CORRECCIÓN registrada en el extracto — no reintroducir el error**: NotebookLM afirmó que este
dato "no está en las fuentes" y **es falso, SÍ está literal** ✅:
> *"Babies rely on maternal antibodies FOR THE FIRST 6 MONTHS OF LIFE. Thus, if they are B-cell
> deficient (i.e. **btk deficiency**), IT WILL OFTEN PRESENT AROUND **6 MONTHS OF AGE** (this is a
> key Step 1 fact)."*
· **VIÑETA**: lactante de ~6 meses con infecciones bacterianas de repetición justo cuando desaparecen
los anticuerpos maternos → **agammaglobulinemia de Bruton (BTK)**.

**2.5 Inmunodeficiencia: la fiebre que NO aparece, e IRIS** ✅
Montar fiebre exige la cascada intacta (macrófago → IL-1 → COX → prostaglandinas → hipotálamo). Sin
ella **no hay fiebre aunque la infección sea devastadora**:
· **Ancianos** ✅: meningitis **sin fiebre**, solo estado casi catatónico — *"you can mistake it for
depression because they have a raging infection in their brain."*
· **VIH con CD4 muy bajos** ⚠: infección oportunista grave del SNC con **temperatura de 37 °C** y
como único signo un estado mental alterado.
· **IRIS** ⚠: al iniciar TARGA y recuperar el CD4, el sistema inmune "despierta" y monta bruscamente
una respuesta agresiva contra patógenos latentes → **fiebre intensa y empeoramiento paradójico**.
· **PREGUNTA TÍPICA**: la **ausencia de fiebre NO descarta** sepsis ni meningitis en el anciano o el
inmunodeprimido; es el hallazgo esperable.
· ❌ **NO están en el corpus** (vacío grande): SCID, DiGeorge, CGD/NBT, déficit de complemento y
Neisseria, Chédiak-Higashi, hiper-IgE, hiper-IgM, ataxia-telangiectasia, Wiskott-Aldrich.
**Cubrirlos con First Aid + UWorld aplicando el método** (tarjeta PC + CCSN + regla del 80 %).

**2.6 Autoinmunidad: LES y plasmaféresis** ⚠ (HY FM 1; la misma discusión se repite en HY Renal 1)
· **¿Por qué el LES afecta a mujeres en edad fértil?** Hipótesis que él desarrolla y **etiqueta como
hipótesis** ("por qué la gente hace autoinmunidad es una pregunta abierta en medicina"): la
**menstruación es necrosis, no apoptosis ordenada** → vierte componentes nucleares (**dsDNA**) al
torrente → en predispuestas genéticamente, autoanticuerpos. Segunda teoría, aportada por una alumna:
**el estrógeno reduce la apoptosis de las células B autorreactivas**, que sobreviven y atacan.
· Caso citado ⚠: médica con esclerosis sistémica / **CREST** y Raynaud grave, embarazo accidental a
los **42 años**, remisión completa durante la gestación y mucho después.
· **Plasmaféresis** ⚠ — indicación conceptual: **retirar autoanticuerpos circulantes de inmediato**.
Dos casos explícitos: **miastenia gravis** (anti-receptor nicotínico) y **PTT** (anti-ADAMTS13).
🔎 **A VERIFICAR (08-sep)**: ADAMTS13 y plasmaféresis en PTT — una respuesta de NotebookLM las negó y
otra las recuperó; cotejar antes de fijarlo como dato de examen.
· Tarjeta literal que él propone ✅:
> *"Fundamentally it is an autoantibody disease – and a relatively severe one – so it would make
> sense that you would use a technique to remove those antibodies as soon as possible to prevent
> further damage, like plasmapheresis."*

**2.7 CASO MAESTRO: pielonefritis xantogranulomatosa** ✅ — el ejemplo canónico de cómo lee una
viñeta (ocupa el último tercio del vídeo):

| Frase del enunciado | Qué hay que extraer |
|---|---|
| *"Mujer de 52 años, 2 días de fiebre y dolor en flanco izquierdo"* | **Pielonefritis**, no cistitis: la infección ALTA es la que da síntomas sistémicos |
| *"Tratada por múltiples episodios en los últimos 3 años"* | **ITU complicada** = algo la predispone a repetir la MISMA infección |
| *"Temperatura 37,8 °C"* | Fiebre baja = infección **"smoldering"** (crónica, lenta), no hiperaguda |
| *"12-18 leucocitos/campo con linfocitos y células mononucleares con rasgos de macrófagos"* | **INFLAMACIÓN CRÓNICA** — es la clave del caso |
| *"Urocultivo: **80 000** colonias/mL de Proteus mirabilis"* | El umbral de bacteriuria significativa es **≥ 100 000/mL** → 80 000 es BAJO → la infección está **amurallada** en un bolsillo, no libre en la vía |
| *"Masa de 3 cm en polo **INFERIOR** del riñón izquierdo"* | Polo inferior = ITU **ascendente** por reflujo vesicoureteral. Y todos pensarían **cáncer** |
| *"Masa **amarilla** de 3,2 cm con cicatriz CENTRAL"* | **Amarillo = grasa** en macrófagos histiocitarios. *Xantho-* = amarillo/grasa; cicatriz central = encapsulado |
| *"Predominio de células **EPITELIOIDES** con citoplasma claro a espumoso"* | **Célula epitelioide → GRANULOMA, inmediatamente.** El citoplasma se ve claro porque **los solventes del procesamiento LAVAN la grasa**: estás viendo la *ausencia* de grasa |
| *"Núcleos excéntricos, normocrómicos, simétricos, sin pleomorfismo"* | **NO es malignidad** |
| **Diagnóstico** | **Pielonefritis xantogranulomatosa** por *Proteus mirabilis* |

· **Regla de lectura que remata el caso** ✅:
> *"I want you to be like Sherlock Holmes when he looks at the wedding ring — everyone knows that
> she's married. That's the obvious thing. I want you to go deeper."*
· **Digresión de oro** ✅: el **carcinoma renal de células claras** es amarillo en macroscopía y claro
en histología porque nace del **túbulo contorneado proximal** (máxima reabsorción → mucho ATP → lleno
de glucógeno y grasa) y el solvente de fijación disuelve la grasa — *"you're not seeing fat, you're
seeing the ABSENCE of fat"*. **Oncocitoma** = caoba con cicatriz central (mitocondrias), encapsulado.
· **Distractor que él nombra** ✅: **malacoplaquia**, "porque tanto la xantogranulomatosa como la
malacoplaquia son de Proteus".

### (c) High-yield del bloque
MHC I vs II y activación T-dependiente · cambio de isotipo y sus 3 aplicaciones · vacunas conjugadas
vs polisacáridas · citocinas "one hot T-bone stEAK" + TNF-alfa + IFN-gamma · granuloma y célula
epitelioide · hipersensibilidades I-IV por antígeno fijo/soluble · inflamación aguda vs crónica ·
BTK a los 6 meses · ausencia de fiebre en el inmunodeprimido · IRIS · Coombs directo vs indirecto
(→ §9.7) · **inmunodeficiencias primarias por patrón** y **rechazo/GVHD**: vacío del corpus, cubrir
con First Aid + UWorld.
Recomendación conservada de la v1: leer *How the Immune System Works* (Sompayrac) **antes** de First Aid.

### (d) Fuentes
Vídeo ✅: [High Yield Immunology](https://www.youtube.com/watch?v=Nfp3hs490wM) ·
*High Yield Family Medicine Review* Parts 1-2 (inmuno aplicada) ⚠ (no descargado en crudo).
Artículos ✅ (URLs conservadas de la v2):
[Could You Connect Conjugate Vaccines and ABO Incompatibility](https://www.yousmle.com/can-you-connect-conjugate-vaccines-and-abo-incompatibility-for-the-usmle-step-1/) ·
[Why +RNA or -RNA?](https://www.yousmle.com/why-does-the-usmle-step-1-care-if-a-virus-has-rna-or-rna/) ·
[Is Memorization Enough? (270)](https://www.yousmle.com/usmle-step-1-score-of-270-is-memorization-enough/) ·
[Why I Stopped Using Zanki](https://www.yousmle.com/zanki-brosencephalon-review/) ·
[Resources (Sompayrac)](https://www.yousmle.com/resources/) ·
[Cheat Sheets (índice)](https://www.yousmle.com/usmle-step-1-cheat-sheets/).

### (e) → En tu plan
**D4 = mié 16-sep-2026 (nivel UW 1 · 30Q)** · **D5 = jue 17-sep-2026 (nivel UW 1 · 30Q)**.
Reaparece: **transversal en Micro D57-D64 (30-nov → 9-dic)** · **reuma = inmunología aplicada en
D70 · D72 · D73 (17-dic → 22-dic)** · glomerulopatías por tipo de hipersensibilidad en **D27 (lun 19-oct)** ·
transfusión y Coombs en **D56 (vie 27-nov)**.

---

## 3. Cardiología

**→ En tu plan: D6-D15 = vie 18-sep-2026 → jue 1-oct-2026.**
Niveles UW por día: D6 (vie 18-sep) N1 · **D7 (lun 21-sep) N1** — viernes con el sistema de <3 días:
el bloque de sistema completo se hace del sistema ANTERIOR · D8 (mar 22-sep) N2 · D9 (23-sep) N2 ·
D10 (jue 24-sep) N2 · **D11 (vie 25-sep) N3 — 20Q del sistema completo timed** · D12 (lun 28-sep) N2 ·
D13 (mar 29-sep) N2 · D14 (30-sep) N2 · D15 (jue 1-oct) N2. Contenido por día: anatomía+fisiología (D6) · hemodinámica y HTA
(D7) · curvas PV/Wiggers/Starling (D8) · electrofisiología y bloqueos (D9) · taquiarritmias (D10) ·
antiarrítmicos + autonómicos CV (D11) · ateroesclerosis e isquemia (D12) · SCA y complicaciones del
IAM (D13) · IC + shock (D14) · valvulopatías, endocarditis, miocardiopatías, pericardio y congénitas
(D15). Vídeos: [High Yield Cardiology](https://www.youtube.com/watch?v=hOGhcie47nM) (D6) ·
[High Yield Cardiology Part 2](https://www.youtube.com/watch?v=nFfdaHLtxag) (D10) ·
*How 260+ Scorers Master Cardio on the USMLE*.
Dato del corpus ✅: cardiología vale **hasta el 9 % del Step 1** y el 10 % del Step 2 CK.

### (a) Concepto ancla y cadena causal
`PAM = GC × RPT = FC × VS × RPT` (§Parte 0.1) + `ΔP = Flujo × R` (§Parte 0.3) + resistores en
serie/paralelo (§Parte 0.4). Las valvulopatías y los cortocircuitos se resuelven con **física de
resistores**, no con memoria.
**Concepto automático nº 1** ✅: *mareo / presíncope / síncope ⇒ **HIPOTENSIÓN**, no ictus.*
> *"When you see syncope or presyncope you should be thinking hypotension… in virtually 95-100 % of
> the time."* **ERROR** que describe: *"lightheadedness is a brain thing → brain pathology → stroke"*.
> El ictus es **déficit neurológico focal súbito**.
**Concepto automático nº 2** ✅: *casi todos los "signos de insuficiencia cardíaca" son de fallo
DERECHO* (JVD, hepatomegalia, esplenomegalia, ascitis, edema en MMII). **El único signo de fallo
izquierdo que la viñeta puede darte es el PULMÓN** (crepitantes) o la PCWP ⇒ **signos derechos +
PULMONES LIMPIOS = fallo derecho aislado**.

### (b) Subtema a subtema

**3.1 Potenciales de equilibrio (Nernst) — el cimiento** ✅ (Art. *Equilibrium/Nernst Potential*)
```
Vm = voltaje INTRA − voltaje EXTRA   (este signo es la fuente de casi toda la confusión)
Mayoría de K+  = INTRAcelular  (el K+ 4,0 mEq del CHEM-7 mide el EXTRAcelular)
Mayoría de Na+ = EXTRAcelular  (Na+ 140 mEq)
Abro canales de K+ → el K+ sale a favor de gradiente → deja carga NEGATIVA dentro
   → esa negatividad tira del K+ hacia dentro → el flujo PARA cuando gradiente químico = eléctrico
   → ese voltaje = potencial de equilibrio = potencial de NERNST
```
El reposo de una célula típica ≈ Nernst del K+ **porque en reposo la mayoría de canales abiertos son
de K+**. **Regla que se deduce**: Nernst positivo (Na+, Ca++) ⇒ el ion está mayoritariamente fuera;
Nernst negativo (K+) ⇒ dentro. **Excepción conceptual del Cl−**: Nernst negativo y sin embargo está
fuera, porque al entrar (es anión) genera negatividad interna.
· **PREGUNTA TÍPICA** ✅: "si abro los 4 tipos de canal a la vez, ¿qué iones ENTRAN?" → **Na+, Ca++ y
Cl− entran; solo el K+ sale**. Trampa: agrupar por carga en vez de por gradiente. (Ca++ para Nernst
de **+125 mV** → está fuera.)
· **ERROR** ✅: no fijar primero **Vm = dentro − fuera**. Comentario real bajo el artículo: *"It would
be helpful to remind us of this initially since I thought it was the opposite"* — y él lo acepta.
· **FRASE** ✅: *"It does NOT stop when the K+ concentrations are equal on both sides (it will stop
much sooner than this)."*

**3.2 Potenciales de acción: miocito vs nodo — "REMOVE INACTIVATION"** ✅ (Art. Ion Channel/EKG + Art.
Antiarrítmicos)
```
Tejido NO nodal tiene el rectificador de entrada I_K1
   → muchos canales de K+ abiertos en reposo → Vm ≈ −90 mV
   → a −90 mV se RETIRA la inactivación de los canales rápidos de Na+ → quedan disponibles
   → fase 0 rápida dependiente de Na+ → QRS estrecho, conducción veloz
Tejido NODAL (SA/AV) CARECE de I_K1
   → reposo ≈ −60 mV → los canales de Na+ quedan PERMANENTEMENTE inactivados
   → el nodo TIENE canales de Na+ pero NO PUEDE USARLOS
   → fase 0 lenta por canales de Ca++ tipo L → PR, filtro AV
```

| Fase (miocito ventricular) | Canal | ECG | Fármaco |
|---|---|---|---|
| 0 | Na+ rápidos abren | QRS | **Clase I** aplana la pendiente |
| 1 | Na+ cierran + K+ transitorio (Ito) | — | — |
| 2 (meseta) | Ca++ tipo L entra ≈ K+ sale → cambio neto ≈ 0 | **segmento ST plano** | Clase IV / II bajan el Ca++ |
| 3 | K+ lentos abren, Ca++ cierra | **onda T** | **Clase III / IA** bloquean K+ |
| 4 | I_K1 domina, reposo estable −90 mV | — | — |

**Nodo: solo 3 fases (0, 3, 4)** ✅ — fase 0 = Ca++ tipo L · fase 3 = inactivación del Ca++ + apertura
de K+ · fase 4 = canales "leaky" de Na+/Ca++ → despolarización espontánea = **automatismo**.
· **La FRECUENCIA la fija la PENDIENTE de la fase 4 del nodo SA.** **La VELOCIDAD DE CONDUCCIÓN AV la
fija la fase 0 del nodo AV** (el nodo AV no se despolariza solo: lo dispara la aurícula).
· Canal exclusivo del nodo: **I_K,ACh (IKG)** — ACh se une → eflujo de K+ → hiperpolarización → hace
falta más entrada de cationes para llegar al umbral → **conducción AV más lenta y FC más baja**.
· **PREGUNTA TÍPICA** ✅: miocito ventricular + célula del nodo SA + bloqueador selectivo de Na+
rápido: la fase 0 del miocito se aplana, la del nodo SA no cambia. Preguntan por qué.
· **ERROR** ✅: decir en absoluto que "el nodo no tiene canales de sodio". Los tiene; a −60 mV no
puede des-inactivarlos.
· **FRASE** ✅: *"In order to activate Na+ channels generally in the heart, you must first REMOVE
INACTIVATION from them (double-negative, I'm sorry)."*
· **Tarjeta Anki que el propio Palmerton aplaudió en comentarios** ✅ — *Front:* "Na+ vs Ca++ — usa los
voltajes de repolarización para explicar cuál conduce por el nodo AV." *Back:* Ca++ — el nodo AV
carece de I_K1 → Vm ≈ −60 mV; los canales de Na+ necesitan ≈ −90 mV para recuperarse de la
inactivación; los de Ca++ se recuperan a −50/−60 mV → siguen operativos.
· **VIÑETA** ✅: registro intracelular con miocito ventricular en reposo **−90 mV** y fase 0
pronunciada; al pasar al nodo SA, reposo **−58 mV** y fase 0 lenta; un bloqueador de Na+ rápido abole
la primera y no altera la segunda.

**3.3 ECG: velocidades, QRS ancho/estrecho, WPW, FA vs FV** ✅
```
Purkinje 2,2 m/s > aurícula 1,1 m/s > ventrículo 0,3 m/s > nodo AV 0,03 m/s
Orden: SA → aurícula → nodo AV → His-Purkinje → ambos ventrículos a la vez
Las aurículas despolarizan el nodo AV por UNIONES GAP (paso directo de iones)
```
· **Por qué el nodo AV es lento (diseño, no defecto)** ✅: *"It's really slow through that AV node in
order to allow time for the ventricles to fill after the atria have contracted."*
· **QRS ancho vs estrecho** ✅: el QRS mide *cuánto tarda* en despolarizarse todo el ventrículo. Por
His-Purkinje (2,2 m/s) → **estrecho**; miocito a miocito por uniones gap (0,3 m/s) → **ancho**
(bloqueo de rama, foco ectópico ventricular, WPW).
· **WPW** ✅: el haz de Kent es un puente muscular que **salta el retraso del nodo AV** →
**PR CORTO** (< 120 ms) + **ONDA DELTA** (ascenso empastado inicial: esa parte va lenta) + **QRS
ANCHO** (160 ms en su figura) porque hay DOS frentes, el accesorio lento y el His-Purkinje rápido.
· **FA vs ritmo sinusal — la analogía del estanque** ✅:
> *"During normal cardiac depolarization, it is like having a still pond, and having a single stream
> of drops, dropping into the same place at a regular rate… Atrial fibrillation is like having a
> rainstorm, whereby LOTS of drops are falling all over the pond, causing mini ripples, but NOT a
> single ripple that will move through the entire pond."*
· **Control de frecuencia — la analogía del castillo de arena** ✅: el nodo AV es un castillo de arena
en la playa; cada onda auricular que lo alcanza puede lanzar un latido; en FA llegan cientos. Un
BCC / beta-bloqueante / digoxina es **levantar un muro delante del castillo**: solo pasan las olas
más grandes → menos QRS → FC más baja. Para que una onda "pase" hacen falta 2 cosas: alcanzar el
umbral del nodo AV y que **no** esté en refractario absoluto.
· **¿Qué es peor, FA o FV?** ✅ *"In atrial fibrillation, once you get an action potential in the AV
node, conduction progresses normally and you will have full, synchronous depolarization."* Y la
cifra: **la patada auricular es ~20 % de la precarga ventricular; la contracción ventricular es el
100 % del volumen sistólico** → el ventrículo se llena pasivamente sin aurícula; si el ventrículo
fibrila, estás muerto.
· **ERROR** ✅: confundir **despolarización** con **contracción** — *"it is technically depolarization,
NOT contraction, although contraction happens as a result."*

**3.4 Antiarrítmicos: clase → fase → intervalo** ✅ (Art. Antiarrítmicos)

| Clase | Diana | Efecto | Intervalo del ECG |
|---|---|---|---|
| **I** (IB lidocaína, IC flecainida) | Na+ | aplana la fase 0 **solo en tejido NO nodal** | **QRS ancho** |
| **IA** | Na+ **y K+** | aplana fase 0 + retrasa fase 3 | QRS ancho **+ QT largo** |
| **II** beta-bloq | receptor beta | baja AMPc → baja la pendiente de fase 4 y la fase 0 nodal | **PR largo** |
| **III** | K+ | retrasa la fase 3 | **QT largo → torsades** |
| **IV** BCC no-DHP | Ca++ tipo L | baja fase 4 y fase 0 nodal | **PR largo** |

· **PREGUNTA TÍPICA** ✅: "Clase III: efecto sobre los intervalos y qué riesgo aumenta" → **QT
prolongado → TORSADES DE POINTES** (*"you MUST know this for Step 1"*). Segunda clásica: "los BCC
afectan qué intervalo y por qué" → **PR**, porque enlentecen la fase 0 del nodo AV.
· **ERROR** ✅: aplicar la clase I al nodo. **Los antiarrítmicos de clase I casi no hacen nada en el
nodo** porque el nodo no usa Na+ en la fase 0. *Ese es literalmente el sentido de la pregunta.*
· **ACh sobre el nodo AV, cadena completa** ✅:
```
ACh → receptor M2 (Gi) → baja adenilato ciclasa → baja AMPc → baja PKA
   + apertura de canales I_K,ACh → eflujo de K+ → HIPERPOLARIZACIÓN
   → hace falta más influjo de cationes para el mismo grado de despolarización
   → conducción AV más lenta + FC más baja → PR PROLONGADO
```
· Nota clínica ⚠: el corazón trasplantado está **denervado** → las maniobras vagales no funcionan.

**3.5 Digoxina, Na/K ATPasa, K+, Ca++ y Trousseau** ✅ (Art. Digoxina, íntegro)
```
Na+/K+ ATPasa: 3 Na+ FUERA / 2 K+ DENTRO con ATP
Digoxina bloquea la bomba uniéndose AL SITIO DE UNIÓN DEL K+ (compiten por el mismo sitio)
   → sube el Na+ intracelular → cae el gradiente de Na+
   → el intercambiador Na+/Ca++ saca menos Ca++ → sube el Ca++ intracelular → SUBE LA CONTRACTILIDAD

K+ bajo → menos competidor en el sitio → la digoxina se une con más fuerza
   → POTENCIACIÓN = TOXICIDAD:  "BEWARE DIGOXIN TOXICITY IN HYPOKALEMIA"  (inhibición competitiva)

Hiperpotasemia → menos gradiente de K+ → Vm MENOS negativo → más cerca del umbral → dispara fácil
   → arritmia VENTRICULAR → se da Ca++ porque el Ca++ SUBE EL UMBRAL (no es "para el nodo")
Hipercalcemia → umbral más alto → fatiga, letargo, debilidad, arreflexia, coma
Hipocalcemia  → umbral más bajo → hiperexcitabilidad → Chvostek y Trousseau

TROUSSEAU por física de membrana:
manguito inflado → isquemia transitoria → baja el ATP → se para la Na/K ATPasa → despolarización
   → en un hipocalcémico la célula YA estaba cerca del umbral → se dispara → ESPASMO CARPAL
```
· **VIÑETA** ⚠: paciente en digoxina + diurético con **xantopsia** (halos amarillo-verdosos), náuseas,
confusión y extrasístoles; **K+ 2,8-3,1 mEq/L** → preguntan el mecanismo íntimo → **inhibición
competitiva en el sitio del K+**. ECG: bigeminismo ventricular, PR 0,24 s.

**3.6 Barorreflejo y preguntas de flechas** ✅ (Art. *The #1 USMLE Cardiology Equation*)
```
PAM = GC × RPT ,  GC = FC × VS
Baja la PA → baja el disparo de barorreceptores → sube el simpático
        beta1: sube FC y contractilidad → sube GC
        alfa1: vasoconstricción       → sube RPT
```
· **Regla de oro** ✅: *"Reflexes never overcompensate. If blood pressure drops, the reflex will bring
it back toward normal — but it won't overshoot."* Procedimiento en 3 pasos: (1) identificar el cambio
inicial, (2) deducir la respuesta refleja, (3) responder por el **cambio NETO**.
· **Síncope ortostático** ✅: `de pie → pooling venoso → baja el retorno venoso → baja LVEDV
(precarga) → baja VS → baja GC → baja PAM → baja PPC (= PAM − PIC) → hipoperfusión cerebral`,
salvo que el barorreflejo esté roto (**neuropatía autonómica diabética**).
· **VIÑETA** ✅: diabético de **20 años de evolución**, insuficiencia renal, hormigueo en manos y pies,
mareo al levantarse → **neuropatía autonómica → disfunción del barorreflejo**. *Disfraz*: "IR" y
"hormigueo" parecen distractores; en realidad solo dicen *"esta diabetes es muy mala"*.
· **ERROR** ✅: recitar la fisiología completa del barorreflejo en un examen cronometrado. Nivel
correcto: *"diabetes → neuropatía autonómica → disfunción barorreceptora → hipotensión ortostática"*.
· Consejo de entrenamiento ✅: *"The time to practice this is when you're NOT in a timed setting —
when you're exercising, when you get up from a seated position, when you get up from bed."*

**3.7 Isquemia por presión — el modelo cuantificado** ✅ (HY Cardio 2)
```
Presión externa AL VASO → comprime capilares → isquemia → necrosis
Presión capilar media ≈ 16 mmHg (extremo arterial 20-30)
Neumotaponamiento del tubo endotraqueal ≈ 20 mmHg o más → puede superar la capilar
"No hay UN número": isquemia = f(presión × tiempo). 2 semanas de intubación = umbral de
preocupación; 3 semanas = estenosis traqueal / traqueomalacia
```
· **VIÑETA literal** ✅: mujer de **45 años**, 4 meses de disnea progresiva y sibilancias
intermitentes; hace **8 meses** intubada **2 semanas** por Guillain-Barré; SatO2 **97 %**;
**estridor espiratorio** sobre el tórax anterior; sin crepitantes → intubación prolongada → cuff →
isquemia por presión → daño del cartílago → traqueomalacia; como el cuff queda **intratorácico**
(≈3 cm de la carina) → colapso **espiratorio**.
· Otras aplicaciones ✅ (HY Surgery): úlceras por presión · **rabdomiólisis del intoxicado inmóvil** ·
alopecia posoperatoria · parálisis del peroneo común en litotomía · **síndrome compartimental**
(fascia = "yeso fino y duro"; 5 P; el pulso desaparece tarde porque la presión debe superar la
arterial).

**3.8 Resistores aplicados: shunts, coartación y TEP** ✅

| Escenario | Serie/paralelo | RPT / poscarga | GC |
|---|---|---|---|
| **PDA** (aorta→AP) | añade paralelo | baja | **sube** |
| **Fístula AV** (diálisis, traumática) | añade paralelo | baja | **sube** (IC de alto gasto) |
| **Cierre de CIV con parche** | quita paralelo | **sube** | **baja** (caída aguda de FE/GC post-op) |
| **Nefrectomía** | quita paralelo | **sube** | **baja** |
| **TEP en la arteria pulmonar derecha** | quita paralelo (circuito pulmonar) | **RVP sube mucho** | baja |
| **Coartación aórtica** | resistor EN SERIE en el arco | sube P1 arriba (HTA en brazos), baja P2 abajo (femorales débiles) | — |

· **PREGUNTA TÍPICA** ✅: niño post-cirugía de cierre de CIV con caída transitoria de FE/GC.
**ERROR que describe**: el estudiante entra en pánico *"porque ese escenario exacto no estaba en el
First Aid"*. No es memoria: es **un solo concepto con 10 disfraces**.
> *"I don't care that you get the right answer. I care that you understand how to apply the concept."* ✅
· **Calibrado TEP grande vs pequeño** ✅: *"A small PE is likely only to remove a very small resistor…
A large PE — if you knocked out the right pulmonary artery, that's a huge resistor."* TEP pequeño →
dolor pleurítico e hipoxemia; TEP grande → cambio hemodinámico, mareo, síncope.
· **Congénitas** ⚠: **Eisenmenger** = flujo crónico → daño endotelial pulmonar → sube la RVP hasta
INVERTIR el shunt → cianosis tardía. **Tetralogía / "tet spells"**: esfuerzo → baja la RVS → la
sangre desoxigenada toma **el camino de menor resistencia** (D→I) → cianosis; **cuclillas** comprimen
las femorales → sube la RVS → el shunt se invierte a I→D → se oxigena. Saturaciones: derecha
~70-75 %, izquierda ~95-100 %; salto oximétrico: **CIA en la AD · CIV en el VD · PDA en la AP**.
· **VIÑETAS** ⚠: coartación — **16 años**, cefalea y pies fríos con el ejercicio, brazo derecho
**165/95**, pierna derecha **85/50**, retraso radio-femoral. Fístula AV traumática — varón de **45
años**, herida por arma de fuego en el muslo hace 2 años, soplo continuo con frémito poplíteo, eco
con **GC 8,2 L/min** (normal ≈ 5), RVS baja, PVC alta.

**3.9 Bloqueos AV, jerarquía de marcapasos y la RCA** ✅
```
Quito el nodo SA → ¿el corazón se para? NO: hay marcapasos de respaldo.
Orden de relevo: AURÍCULA → nodo AV → ventrículo
¿Por qué la aurícula primero? MANDA quien tiene la PENDIENTE DE FASE 4 MÁS EMPINADA
Ritmo de escape ventricular = 20-40 lpm → catastrófico para el GC

Ateroesclerosis de la RCA → ruptura de placa → trombo → isquemia del NODO AV (RCA lo irriga ~90 %)
   → aurículas y ventrículos independientes (bloqueo de 3.er grado)
   → el pulso lo marca el VENTRÍCULO (30-42 lpm)
   → baja FC → baja GC → baja PAM → baja PPC → SÍNCOPE
```
· Anatomía automática ✅: **derivaciones inferiores = II, III, aVF**; pared inferior irrigada por la
**descendente posterior**, rama de la **RCA** en los dominantes derechos (~2/3; para el examen, "casi
siempre RCA"). La RCA da también ramas al **nodo SA (~60 %)** y al **nodo AV (~90 %)**.
· **Tres complicaciones para las que hay que encender la antena en TODO IAM inferior** ✅:
(1) **fallo del VD** → IC derecha aislada → **PCWP BAJA**; (2) isquemia del **nodo SA** → bradicardia
sinusal; (3) isquemia del **nodo AV** → bloqueo AV hasta 3.er grado.
· **Cómo se lee el trazado** ✅: `FC = 300 / nº de cuadros grandes entre latidos`. Su ejemplo: P a
~100 lpm (3 cuadros) y QRS a ~42 lpm (~7 cuadros), disociados. *"It's like one of those magic eye
puzzles. Once you see it, you can't unsee it."* Truco: hay **ondas P enterradas dentro de las T y de
los QRS**. Detalle fino: la frecuencia auricular está alta (100) porque el paciente está hipotenso
con el simpático disparado.
· **ERROR — el capítulo entero es una lección sobre sesgos** ✅: **anclaje + sesgo de confirmación**.
El alumno lee "HTA mal controlada + diabetes" y ancla en *neuropatía autonómica* o *HVI*; ambas
explicarían el síncope, pero **ninguna explica la bradicardia ni el ECG** — y **se salta el ECG**.
> *"You ignore the evidence that goes against what you're thinking and you only look for the evidence
> that shows it."* Solución que propone: **haber generado más cronologías patofisiológicas antes**,
> para tener 5-6 hipótesis disponibles en vez de una.
· **PREGUNTAS TÍPICAS** ✅: (1) anciano diabético con síncope + trazado → **¿arteria ocluida? RCA**;
(2) **PCWP en IAM inferior con VD** → **BAJA**; (3) **¿tratamiento del bloqueo de 3.er grado?** →
marcapasos **VENTRICULAR** (*ERROR clásico*: "marcapasos del nodo SA" — el problema es la
**conducción**, no el origen del impulso).
· **VIÑETA** ✅: varón de **63 años**, HTA y DM2 mal controladas, 2 meses de desmayos y fatigabilidad;
ECG con P regulares a **100 lpm** y QRS independientes a **~42 lpm**, R-R de 7 cuadros grandes →
IAM de RCA → bloqueo completo → síncope **sin pródromo** ("unheralded", frente al vasovagal, que
avisa con diaforesis y mareo).

**3.10 Isquemia y síndrome coronario agudo** ✅
> *"The Core Concept behind ACS is: **Ischemia = Demand > Supply**."* (Art. MONA)
```
ANGINA ESTABLE      : estenosis coronaria FIJA. En reposo la oferta basta.
                      Esfuerzo/enfado → demanda > oferta → dolor. Reposo o nitroglicerina → cede.
ANGINA INESTABLE/IAM: RUPTURA DE PLACA → trombo → oferta insuficiente INCLUSO EN REPOSO
```
> *"This is probably the most valuable thing I learned in internal medicine: when someone comes in
> with chest pain and it's cardiac, you have to ask yourself — **did a plaque rupture or not?**"* ✅
· **ERRORES** ✅ que corrige en directo: (1) creer que el IAM es el crecimiento lento de la placa
hasta el 100 % — *"maybe it wasn't narrowed in the first place and you had a plaque rupture in a
previously non-stenotic artery"*; (2) **arteriosclerosis** (arterias duras) ≠ **ateroesclerosis** (la
placa grasa: esa es la que infarta); (3) creer que el trombo "viaja" — *"it ruptures and then boom —
immediately there's a clot"*, justo ahí.
· **MONA y THROMBINS2 se deducen de oferta/demanda** ✅:

| | Efecto | Mecanismo |
|---|---|---|
| **M**orfina | Demanda baja | analgesia → menos dolor/ansiedad → menos tono simpático |
| **O**xígeno | Oferta sube | sube el contenido de O2 de la sangre |
| **N**itroglicerina | Demanda baja | venodilatación → pooling → menos retorno venoso → menos precarga → **menos tensión de pared** |
| **A**spirina | Oferta sube | frena la extensión del trombo coronario |
| **Hep**arina | Oferta sube | ídem |
| **B**eta-bloqueante | Demanda baja | bajan FC y contractilidad |

**THROMBINS2** ✅: **T**ienopiridinas · **H**eparina · **R**AAS (IECA/ARA-II: menos AT-II → menos
poscarga → menos demanda) · **O**xígeno · **M**orfina · **B**eta-bloqueante · **I**ntervención
(stent/CABG = oferta) · **N**itroglicerina · **S**tatina/**S**alicilato.
· **La controversia que él sí discute** ✅: MONA fue estándar en los 80. Hoy el **oxígeno** en el no
hipoxémico no ha demostrado beneficio; con **morfina** hubo señales de peores desenlaces; nitratos y
beta-bloqueantes: **mucho cuidado en el hipotenso**.
· **El "death spiral" izquierdo — el concepto de élite** ✅:
```
PPC coronaria = PA diastólica aórtica − LVEDP  (las coronarias llenan en DIÁSTOLE)
Doy un hipotensor en un IAM izquierdo:
   baja la PA diastólica (P1)  Y  sube la LVEDP por fallo de bomba (P2)
   → se desploma la PPC coronaria → MÁS isquemia → menos contractilidad → menos VS → menos GC
   → menos PAM → menos PA diastólica … → FIBRILACIÓN VENTRICULAR
```
> *"This is what terrifies anesthesiologists. If you have a left main stenosis and it's really bad,
> you worry about getting a little bit of hypotension because they can die — the death spiral."* ✅
Salida terapéutica que menciona ✅: **fenilefrina** (alfa1) para subir la diastólica y recuperar la
PPC. **La taquicardia es el otro asesino de la PPC** ⚠: al subir la FC el ciclo se acorta a expensas
de la diástole. Por eso en isquemia se **frena** el corazón ✅: *"you want to slow down the heart in
ischemia — you'll decrease demand but you'll also increase supply, as long as you maintain the blood
pressure."*
· **VIÑETA** ✅: varón con angina estable → ruptura de placa en la **DA** → **STEMI anterior** → le dan
**metoprolol** → cae la PA diastólica → cae la PPC → más isquemia → **FV**.
· **LA CONTRAINDICACIÓN ESTRELLA** ✅:
```
ST elevado en II, III, aVF → sospecha de IAM del VD → NO NITRATOS
El VD infartado es ESTRICTAMENTE dependiente de precarga
   → nitrato → venodilatación → menos precarga → colapso
Manejo correcto en el examen: pedir un ECG de derivaciones DERECHAS antes de decidir
Matiz que valida: II-III-aVF no es exclusivo de la RCA; puede ser circunfleja
```
**VIÑETA** ⚠: varón de **56 años**, dolor opresivo de **3 h** paleando nieve, diaforesis, **JVD**,
**pulmones limpios**, FC **42 lpm**, PA **90/50**, ST **+1,5 mm en II, III, aVF** → nitroglicerina =
catástrofe.
· **Prueba de esfuerzo — para qué existe** ✅ (HY Nuclear): en angina **estable** la oferta basta en
reposo → ECG y gammagrafía en reposo pueden ser normales → hay que **provocar la demanda**: cinta o
**dobutamina** (beta1). Química si artrosis, cadera rota, IC avanzada. Gammagrafía de perfusión
miocárdica = **SPECT** con **tecnecio-99 + sestamibi** ("sexta-MIBI") o talio-201.
· **Complicaciones mecánicas por tiempo** ⚠:

| Ventana | Histología | Complicación temida |
|---|---|---|
| **0-24 h** | necrosis de coagulación, bandas de contracción; a las 24 h **neutrófilos** | **arritmias ventriculares letales** |
| **1-3 días** | infiltrado neutrofílico pleno | pericarditis fibrinosa |
| **3-7 días** | **macrófagos** fagocitan → miocardio blando | **rupturas**: pared libre → taponamiento · músculo papilar (**póstero-medial**, RCA) → IM aguda + edema pulmonar → **PCWP muy alta** · septo → CIV con **salto oximétrico en el VD** |
| **semanas** | fibroblastos → colágeno → cicatriz | aneurisma, IC crónica |

**PREGUNTA** ⚠: IAM inferior de hace **4 días** + disnea brusca + esputo asalmonado + **soplo
holosistólico apical 4/6 irradiado a axila** → ruptura de músculo papilar → **PCWP muy elevada**.
*ERROR*: confundirlo con ruptura septal — el soplo **apical** con crepitantes orienta a papilar; el
**salto oximétrico en el VD** orienta a septal.

**3.11 Insuficiencia cardíaca: "pulmones limpios"** ✅
> Qué es "fallo": *"It's if you can't meet the body's blood demand, **and/or** you need excessive
> volume or pressure to do it adequately."* El paciente con JVD hasta el lóbulo de la oreja **sí**
> perfunde… al precio de una congestión brutal. Sigue siendo fallo.
· **Concepto automático nº 2 desarrollado** ✅:
> *"Anytime that they give you signs of heart failure you want to listen to the lungs — both in real
> life and especially in the vignette."* Signos derechos + pulmones limpios = **fallo derecho
> aislado**; *"a veces esa es literalmente la única pista que te van a dar"*.
· **Edema de MMII** ✅: `fallo derecho → la sangre no avanza → se acumula ventrículo → aurícula →
sistema venoso → sube la presión HIDROSTÁTICA CAPILAR (el capilar es la pared fina, no la vena) →
filtración → edema con fóvea en zonas declives`. Corrección fina en directo: no se dice "aumento de
poscarga" a secas, hay que decir **"poscarga del corazón derecho"**.
· **ERROR** ✅: leer "pulmones limpios" como *"no hay neumonía"* (irrelevante) en vez de *"no hay
fallo izquierdo"*.
· **PREGUNTA** ⚠: EPOC de larga evolución, edema bilateral, hepatomegalia dolorosa, PVY **16 cm H2O**,
**pulmones limpios** → ¿PCWP? **normal o baja** (cor pulmonale aislado). El estudiante marca
"elevada" porque asume ICC global.
· **Fármacos que reducen mortalidad** ⚠: IECA/ARA-II/espironolactona y **beta-bloqueantes**
(carvedilol, metoprolol succinato). El argumento: la compensación neurohormonal crónica **destruye**
el corazón; bloquearla salva vidas.

**3.12 Swan-Ganz, PCWP y LVEDP** ✅ (Art. Swan-Ganz)
```
Catéter de arteria pulmonar con BALÓN en la punta y sensor DISTAL al balón
Balón DESINFLADO → presión de arteria pulmonar (PULSÁTIL)
Balón INFLADO    → ocluye la rama → mide presión capilar pulmonar ≈ vena pulmonar ≈ PRESIÓN DE LA AI
                 → NO PULSÁTIL  ← pregunta fina: el balón aisló el pulso
La PCWP estima la LVEDP porque la resistencia de la mitral es despreciable en condiciones normales
```

| Cuadro | PA pulmonar | PCWP | Razonamiento |
|---|---|---|---|
| **HTP primaria** | sube | **normal** | el problema es la resistencia ARTERIAL pulmonar |
| **Fallo izquierdo** | sube | **sube** | sin flujo anterógrado → remanso AI → vena → capilar → arteria |
| **Estenosis mitral severa** | sube | **sube** | mismo remanso, pero la PCWP **sobreestima** la LVEDP |
| **IAM del VD / TEP** | — | **baja** | no llega sangre a la izquierda |

· **PREGUNTAS TÍPICAS** ✅: "¿en qué condición la PCWP es mal estimador de la LVEDP?" → **estenosis
mitral**. "¿Puedo diagnosticar estenosis mitral solo con una PCWP alta?" → **No**: solo mides presión
de AI, y hay otras causas.
· **ERROR** ✅: *"Many students believe that an increase in Left Atrial pressure is the CAUSE of mitral
stenosis. No! The primary parameter affected is RESISTANCE. The elevated Left Atrial pressure is
merely an EFFECT of having that resistance increased to maintain flow."*
· **VIÑETA** ⚠: mujer de **34 años** inmigrante, fiebre reumática en la infancia, disnea progresiva en
el embarazo, NYHA III: **PCWP 24-25 mmHg**, PAP 45/20, **LVEDP 6-8 mmHg** → estenosis mitral.
· Rangos normales ⚠ (para cuando dan números, no flechas): PVC 2-6 · PCWP 6-12 · GC 4-8 L/min ·
IC 2,5-4,2 · RVS 800-1200 · SvO2 60-80 %.

**3.13 Taponamiento y pulso paradójico** ✅
```
Líquido en el saco pericárdico → presión intrapericárdica > presiones de llenado
   → COMPRESIÓN EXTERNA → menos precarga → menos VS → menos presión de pulso → menos GC → menos PAM
Pulso paradójico (mecanismo exacto, en inspiración):
   baja la presión intratorácica → sube el retorno venoso → más llenado del VD
   → el VD NO puede expandirse hacia fuera (pericardio lleno)
   → ABOMBA EL SEPTO HACIA LA IZQUIERDA → comprime el VI
   → menos precarga del VI → menos VS → menos GC → caída exagerada de la PAS
```
· **Definición numérica** ✅: **caída > 10 mmHg de la PAS en inspiración**; *"it's an exaggeration of
the normal response"*. Clasificación ✅: shock **obstructivo** ("extracardiac obstructive").
Tríada de Beck ⚠ + **alternancia eléctrica** ⚠.
· **ERROR** ✅ corregido en directo: confundir el mecanismo con "obstrucción del tracto de salida del
VI" — eso es la **miocardiopatía hipertrófica obstructiva**, no el taponamiento.

**3.14 Disección aórtica** ✅
```
HTA crónica → la sangre rompe la ÍNTIMA → se mete entre íntima y media → LUZ FALSA
La luz falsa puede extenderse anterógrada o retrógradamente
Dos categorías de muerte, y solo dos:
   (1) RUPTURA → tórax/abdomen (shock hemorrágico), PERICARDIO (hemopericardio → TAPONAMIENTO),
       o la válvula aórtica → insuficiencia aórtica aguda
   (2) COMPRESIÓN de cualquier vaso que salga de la aorta → isquemia del órgano correspondiente
```
· **Stanford** ✅: **A = compromete la ASCENDENTE** (emergencia, cirugía casi siempre; *"your brain has
almost no reserve"*) · **B = solo la descendente** (a menudo vigilancia + control de PA).
Honestidad intelectual que conviene copiar ✅: *"why is the ascending more prone to rupture? I
honestly don't know. If you find the answer, please let me know."*
· **Tratamiento del tipo B** ✅: **beta-bloqueantes** — no solo para bajar la PA, sino para **reducir
el flujo turbulento**, que propaga la disección. Vigilancia **de la cabeza a los pies, vaso por
vaso**: ¿alerta y orientado (carótidas)? ¿diuresis y creatinina (renales)? ¿náuseas/vómitos
(mesentéricas)? ¿pulsos y dolor en piernas (ilíacas)?
· **Física de la imagen** ✅: el TC **con contraste** se reconoce porque la luz aórtica está
**brillante** — los rayos X atraviesan elementos ligeros (H, C, N, O → negro) y rebotan en los
pesados (**yodo, bario, calcio, hierro → blanco**).
· **VIÑETA** ✅: disección **tipo A** → extensión retrógrada al pericardio → **hemopericardio** →
**taponamiento** → shock obstructivo con pulso paradójico y presión de pulso estrecha. Resumen al
nivel exacto de examen: *"disección tipo A → hemopericardio → taponamiento → shock."* Nada más.

**3.15 Valvulopatías, soplos y maniobras**
> ⚠⚠ **AVISO DE FIABILIDAD (08-sep-2026)**: NotebookLM declaró explícitamente que **las maniobras
> (Valsalva, bipedestación, cuclillas, handgrip, nitrito de amilo), el desdoblamiento de S2 y los
> criterios de Jones NO aparecen desarrollados en las fuentes del cuaderno**. Lo de abajo es
> fisiología estándar correcta pero **no es "método Palmerton verificado"**: estudiarlo por
> First Aid/UWorld, no atribuírselo a él. → `pendiente_usuario`.

**Lo que SÍ está verificado** ✅ — **estenosis aórtica**, deconstrucción literal:
> *"With aortic stenosis you have both a weak pulse that's late and you have a small pulse pressure…
> because of the increase in resistance from the stenotic aortic valve, every time the heart pumps
> blood it's going to be able to pump LESS blood into the system; because you're pumping less blood
> the blood pressure is going to go up less — so the pulse pressure is going to be less."*
```
Válvula aórtica estenótica → sube la RESISTENCIA de salida (ΔP = Flujo × R)
   → menos volumen eyectado por latido → la PAS sube menos → PRESIÓN DE PULSO ESTRECHA
   → y el pico llega tarde → PULSUS PARVUS ET TARDUS
   → el VI genera presiones enormes para vencer la R → hipertrofia concéntrica
```
**Disfraz del examen** ⚠: ya no es "clic de eyección"; es un paciente de **75 años con síncope de
esfuerzo + pulsus parvus et tardus + presión de pulso estrecha (p. ej. 100/80)**. Cifra de
referencia: gradiente transvalvular sistólico **50 mmHg** ✅.
**Estenosis mitral** ✅: problema de **resistencia** (§3.7 y §3.12): PCWP alta con LVEDP normal/baja.

**Lo NO verificado** ⚠ (usar como recordatorio, no como cita):

| Maniobra | Qué hace | Soplos que suben | Soplos que bajan |
|---|---|---|---|
| **Inspiración (Rivero-Carvallo)** | sube la precarga del VD | derechos (IT, ET) | izquierdos |
| **Valsalva / bipedestación** | baja el retorno venoso | **MCHO** y **PVM** (excepciones) | EA, IM, casi todos |
| **Cuclillas / elevación de piernas** | sube precarga (+ poscarga) | casi todos | **MCHO**, PVM |
| **Handgrip** | sube mucho la poscarga | **IM, IA, CIV** | EA, MCHO |
| **Nitrito de amilo** | baja la poscarga | EA, **MCHO** | IM, IA |

**S3 vs S4** ⚠: **S3** = inicio de diástole, llenado rápido contra ventrículo dilatado/flácido →
dilatada / sobrecarga de volumen. **S4** = final de diástole, contracción auricular contra ventrículo
rígido → MCH, restrictiva, hipertrofia concéntrica por HTA. **Trampa del S4** ⚠: **60 años** con HTA
crónica y S4 → pérdida de distensibilidad; **no** sirve para descartar insuficiencia cardíaca.

**3.16 Hipertensión y sus fármacos** ⚠ (esqueleto verificado de Art. Eq.1)
```
Vasodilatador arteriolar puro (hidralazina, minoxidil)
   → baja la RPT → baja la PAM → los barorreceptores dejan de disparar → desinhibición
   → NE sobre beta1 → TAQUICARDIA REFLEJA (+ más MVO2)  y  renina → RAAS → retención → EDEMA
"An afterload reducer will ALWAYS lead to reflex sympathetic effects because you are not blocking
 the sympathetic receptors themselves."
```
· **Disfraz** ⚠: a las **2 semanas** de iniciar el tratamiento, palpitaciones + edema bimaleolar.
· **Tos por IECA** ⚠: la ECA degrada bradicinina → al bloquearla se acumula en el endotelio bronquial
→ sensibilización de aferentes vagales → tos seca.
· **HTA secundaria** ⚠: estenosis de arteria renal (viñeta: **28 años**, cefalea pulsátil,
**178/105**, FC 82, **Cr 1,9**, renina muy alta) · **Conn** (HTA + alcalosis hipopotasémica, **sin
edema** por escape de aldosterona vía ANP) · feocromocitoma (alfa1 → RPT + beta1 taquicardia).
· **Cocaína vs reflejo de Cushing** ✅ (útil también en neuro): PIC alta → **PA alta + pulso BAJO**;
**PA alta + pulso ALTO** apunta a algo "upstream" que sube ambos = **tono simpático (cocaína)**.

**3.17 Shock — la tabla y sus disfraces** ⚠ (marco `PAM = GC × RVS` ✅)
Shock = incapacidad de perfundir órganos vitales → **cerebro (confusión)** y **riñón (oliguria
< 0,5 cc/kg/h)**.

| Tipo | PCWP | GC | RVS | PVC | SvO2 | Piel |
|---|---|---|---|---|---|---|
| **Hipovolémico** | muy baja | baja | muy alta | baja | baja | fría |
| **Cardiogénico** | muy alta | muy baja | muy alta | alta | muy baja | fría |
| **Distributivo (séptico)** | baja-normal | **alta** | **muy baja** | baja | alta-normal | caliente (fase precoz) |
| **Obstructivo · TEP** | **baja o normal** | baja | muy alta | **muy alta** | muy baja | fría |
| **Obstructivo · taponamiento** | **muy alta** | muy baja | muy alta | muy alta | muy baja | fría |

· **Por qué el TEP tiene la PCWP BAJA y el taponamiento ALTA** ✅ (razonamiento de HY Cardio 1): en el
TEP el coágulo está **antes** del corazón izquierdo → no llega sangre a la AI. En el taponamiento se
**igualan** las presiones diastólicas: PVC(AD) = PDVD = PDAP = PCWP(AI) = LVEDP.
· **Disfraz de números absolutos** ⚠: post-quirúrgico con PA **88/44**, FC **118**, PVC **18**,
PCWP **24**, GC **2,1**, RVS **1950**, SvO2 **45 %** → cardiogénico (o taponamiento agudo).
· **El error del "abogado" más citado** ⚠: fiebre + PA 80/40 + taquicardia + oliguria + **"extremidades
frías"** → el alumno descarta sepsis (esperaba piel caliente) y elige taponamiento. La sepsis
tardía/hipodinámica cursa con alfa1 intenso → extremidades frías. *"Choose the imperfect answer that
aligns with the majority of the case."*
· **Disfraz post-quirúrgico** ⚠: 2.º día post-op de prótesis de rodilla/cadera, disnea súbita, FC 112,
PA 85/50 → **TEP**. *ERROR*: descartarlo porque recibió enoxaparina profiláctica — **ninguna
profilaxis es 100 %** (coincide con el principio verificado: la ausencia de un dato no es un negativo
pertinente).

**3.18 Endocarditis infecciosa y fiebre reumática**
· **La tarjeta PC que él usa como ejemplo maestro** ✅ (vía *The ONLY Video…*):
> *"A 46-year-old man presents with several weeks of fatigue, low-grade fever and unintentional
> weight loss. He now has new left-sided weakness. Exam reveals a new holosystolic murmur, splinter
> hemorrhages and petechiae. Labs show normocytic anemia and elevated creatinine with hematuria. At
> first glance this looks like maybe five different problems… but if you've made a PC card on
> infective endocarditis you can see that there's actually ONE process that connects all of these."*
```
Bacteriemia + endotelio dañado → depósito de fibrina/plaquetas → VEGETACIÓN
   ├─ EMBOLIZACIÓN SÉPTICA → ictus embólico, Janeway, hemorragias en astilla
   ├─ INMUNOCOMPLEJOS      → nódulos de Osler, manchas de Roth, GN (hematuria, cilindros, Cr alta)
   ├─ DESTRUCCIÓN VALVULAR → soplo NUEVO (holosistólico)
   └─ INFLAMACIÓN CRÓNICA  → fiebre, pérdida de peso, anemia normocítica de proceso crónico
```
**Lección de método** ✅: la potencia de la tarjeta PC es que convierte **cinco problemas aparentes en
uno**. Ese es exactamente el criterio para decidir sobre qué hacer tarjeta.
· **Microbiología** ⚠: **S. aureus** → válvulas **sanas**, hiperagudo; UDIV → **tricúspide** → émbolos
sépticos pulmonares. **S. viridans** → necesita válvula **dañada**, post-dental, subagudo.
**S. gallolyticus (bovis)** → **colonoscopia obligatoria**. **Enterococo** → manipulación genitourinaria.
· **Fiebre reumática** ⚠ (❌ los criterios de Jones **no están en el corpus**): 2-3 semanas tras
faringitis por *S. pyogenes* → IgG anti-proteína M → **mimetismo molecular** con la miosina cardíaca
→ hipersensibilidad tipo II. Secuela: 10-20 años después, fusión comisural → **estenosis mitral**.

**3.19 Miocardiopatías y muerte súbita** ✅/⚠
```
Miocardiopatía hipertrófica: masa muscular enorme → DEMANDA basal ya elevada
   → ejercicio intenso → más demanda + más FC → menos tiempo diastólico → menos perfusión coronaria
   → ISQUEMIA subendocárdica → inestabilidad eléctrica → FIBRILACIÓN VENTRICULAR → muerte súbita
```
> *"About 25 % of sudden death in athletes is due to hypertrophic cardiomyopathy."* ✅ (anécdota: el
> atleta que anota el tiro ganador del campeonato estatal y se desploma).
· **Causa más frecuente de FV en general** ✅: **isquemia**, reciente o antigua.
· **Pericarditis aguda** ⚠: Coxsackie B, uremia, IAM transmural, idiopática → irritación del frénico →
dolor pleurítico irradiado al **trapecio izquierdo** (C3-C5); peor en decúbito, mejor inclinado hacia
delante; ECG con **ST elevado cóncavo difuso + descenso del PR**.
· **Constrictiva** ⚠ (TB, radiación, cirugía): coraza rígida → **signo de Kussmaul**.
· **Restrictiva** ⚠ (amiloidosis, sarcoidosis, hemocromatosis): ver §1.6.

### (c) High-yield del bloque
Nernst y potenciales de acción ↔ ECG (PR, QRS, QT) · antiarrítmicos I-IV mapeados a fases ·
barorreflejo y "arrow questions" · resistores serie/paralelo (shunts, coartación, TEP, nefrectomía) ·
isquemia = demanda > oferta, MONA/THROMBINS2, IAM de VD y nitratos, death spiral, histología del
infarto por días · IC izquierda vs derecha y "pulmones limpios" · Swan-Ganz/PCWP vs LVEDP · shock
por perfil hemodinámico · taponamiento y pulso paradójico · disección aórtica y Stanford ·
valvulopatías con física de resistencias (maniobras y S2 desdoblado ⚠ por First Aid) · congénitas y
Eisenmenger · endocarditis como tarjeta PC modelo · MCH y muerte súbita del atleta ·
farmacología CV con reflejos (nitratos, BB, CCB, hidralazina, IECA, digoxina, glucagón).
**MONA está obsoleto como algoritmo, pero es el mejor vehículo para razonar oferta/demanda.**

### (d) Fuentes
Vídeos ✅: [High Yield Cardiology](https://www.youtube.com/watch?v=hOGhcie47nM) ·
[High Yield Cardiology Part 2](https://www.youtube.com/watch?v=nFfdaHLtxag) ·
*How 260+ Scorers Master Cardio on the USMLE* · *High Yield Nuclear Medicine* (prueba de esfuerzo).
Artículos ✅ (URLs conservadas de la v2):
[Ion Channel Physiology ↔ EKG](https://www.yousmle.com/usmle-step-1-ion-channel-physiology-ekg-findings/) ·
[Antiarrhythmics Cheat Sheet](https://www.yousmle.com/antiarrhythmics-guide-usmle-step-1-cheat-sheet/) ·
[MONA and THROMBINS2](https://www.yousmle.com/mona-and-thrombins2-for-the-usmle/) ·
[Digoxin / Reversible Cell Damage / Trousseau](https://www.yousmle.com/usmle-step-1-bosses-digoxin-reversible-cell-damage-trousseaus-sign/) ·
[Swan-Ganz, wedge pressure, mitral stenosis, LVEDP](https://www.yousmle.com/usmle-step-1-cheat-sheets/) ·
[Pharmacology Over a Glass of Wine](https://www.yousmle.com/how-to-master-pharmacology-for-the-usmle-step-1-over-a-glass-of-wine/) ·
[Categoría Cardiovascular (130+ flashcards)](https://www.yousmle.com/category/cardiovascular/) ·
[High-Yield CV — The Match Guy](https://thematchguy.com/usmle-step-1-high-yield-cardiovascular-cardiology-concepts/).
Sin URL en el corpus (solo título): *The #1 USMLE Cardiology Equation* · *The Most Useful USMLE
Equation Ever* · *Equilibrium/Nernst Potential for the USMLE*.

### (e) → En tu plan
**D6-D15 = vie 18-sep-2026 → jue 1-oct-2026.** El **viernes de nivel 3** del bloque es **D11
(vie 25-sep)**: 20Q timed del sistema completo, el gate real de Cardio. El otro viernes (D6, 18-sep) cae
con Cardio recién abierto (<3 días) → nivel 1, y el bloque de sistema se hace del sistema anterior.
Cardio reaparece: hemodinámica del TEP en **D22 (lun 12-oct)** · fármacos autonómicos en **D45
(jue 12-nov)** · Nernst/umbral aplicado a electrolitos en **D25 (jue 15-oct)** · PK/PD y digoxina en
**D80 (mar 5-ene)**.

### ❌ VACÍOS CONFIRMADOS DEL CORPUS (cardio) — `pendiente_usuario`

| Tema | Estado | Qué hacer |
|---|---|---|
| **Bucle presión-volumen del VI** (4 fases, EDV/ESV/VS/FE, efecto de precarga/poscarga/contractilidad) | ❌ NO ESTÁ | First Aid / Costanzo. Lo único de Palmerton aquí son las definiciones verbales de precarga/poscarga/contractilidad. **Cae en D8 (mar 22-sep)** |
| **Ley de Frank-Starling** (curva, desplazamiento en IC, intersección con retorno venoso) | ❌ NO ESTÁ | Ídem. Ojo: "Starling" en el corpus se refiere solo a las **fuerzas de Starling capilares** (edema). **Cae en D8** |
| **Fórmula de Laplace** (T = P·r/2h) e hipertrofia concéntrica vs excéntrica | ❌ NO ESTÁ la fórmula | Sí está el concepto de **tensión de pared** vía nitratos (Art. MONA); la geometría hay que traerla de fuera |
| **Maniobras de soplos**, **desdoblamiento de S2**, **criterios de Jones** | ❌ NO ESTÁN | Ver aviso de §3.15. **Cae en D15 (jue 1-oct)** |

---

## 4. Fisiología y patología Respiratoria

**→ En tu plan: D17 · D18 (lun 5-oct y mar 6-oct, nivel UW 1 · 30Q) + D19-D22 (mié 7-oct → lun 12-oct,
nivel UW 2 · 40Q, salvo **D21 = N3** por ser viernes con el sistema ≥3 días).** En medio,
**D16 = NBME 25 (vie 2-oct)**. Contenido: volúmenes/compliance/Hb
(D17) · V/Q + gradiente A-a + hipoxemia (D18) · obstructivas + PFTs + broncodilatadores (D19) ·
restrictivas e intersticiales (D20) · neumonía + TBC + absceso (D21) · TEP/TVP + HTP + SDRA + cáncer
de pulmón (D22). Vídeo: [High Yield Respiratory](https://www.youtube.com/watch?v=HU3V0kftcqY) (D17).

### (a) Concepto ancla y cadena causal
Frase de apertura del vídeo, que fija la tesis del bloque entero ✅:
> *"Respiratory is the most logical system in medicine, and that's exactly why so many students
> overthink it… V/Q mismatch, shunt, dead space, the alveolar gas equation — students treat these
> like separate topics to memorize, but they're not. They're all answering ONE question: **is oxygen
> getting where it needs to go, and if not, why?**"*

**Las 3 preguntas-examen con las que estructura la clase entera** ✅ — si las sabes explicar, dominas
el bloque:
1. ¿Por qué la **acetazolamida** trata el mal de altura? (gas alveolar + ácido-base + compensación)
2. En una **neumonía izquierda**, ¿en qué posición está más alta la SatO2? (V/Q + shunt)
3. Si **clampo la arteria pulmonar izquierda**, ¿qué le pasa a la saturación? (las dos anteriores)

### (b) Subtema a subtema

**4.1 Ecuación del gas alveolar y mal de altura** ✅ (Art. Gas alveolar + HY Resp)
```
PAO2 = PIO2 − PACO2/R
PIO2 = (Patm − 47) × FiO2   ← 47 mmHg = presión de vapor de agua: el vapor OCUPA ESPACIO
A nivel del mar: PIO2 = (760 − 47) × 0,21 = 150  →  PAO2 = 150 − PACO2/R
```
· **Ley de Dalton** ✅: las presiones parciales suman la atmosférica total → el O2 inspirado **no
puede** superar 760 − 47. Aviso que subraya ✅: la forma "150 − PACO2/R" **solo vale a 1 atmósfera** —
*"It would be different on a mountain. It would be different on the moon."*
· **ANALOGÍA · las canicas** ✅: *"There is a fixed number of air particles you can fit into your
alveolus. If I have more CO2, there is LESS ROOM for O2, and vice-versa. Thus, if I decrease CO2, I
will increase PAO2."* En el vídeo: **un frasco de canicas**.
· **Altitud** ✅:
```
Altitud sube → PRESIÓN ATMOSFÉRICA baja  (el PORCENTAJE de O2 NO cambia: sigue siendo 21 %)
   → PIO2 baja → PAO2 baja → PaO2 baja → HIPOXEMIA → (consecuencia, no causa) SatO2 baja
   → el cuerpo compensa HIPERVENTILANDO → PACO2 baja → queda más sitio para O2 → PAO2 sube
Cálculos que hace en clase: 0,5 atm (380 mmHg): PIO2 = (380 − 47) × 0,21 = 70 mmHg
                            447 mmHg          : PIO2 = (447 − 47) × 0,21 ≈ 84 mmHg
```
> *"It's a common misconception that the percentage of O2 is lower at higher altitudes."* ✅ Su
> analogía: una bolsa de aire en **Cusco** tiene MENOS moléculas de oxígeno, pero el **porcentaje** de
> moléculas que son oxígeno es idéntico al de San Diego. (Anclaje memorable para Joseph: cuenta que
> fue a Cusco, no llegó a Machu Picchu y estuvo 24 h con la peor cefalea de su vida.) ✅
· **La pregunta insignia: acetazolamida** ✅:
```
Acetazolamida = inhibidor de la anhidrasa carbónica
   → bloquea la reabsorción renal de HCO3− → se pierde HCO3− → ACIDOSIS METABÓLICA
   → el cuerpo compensa con ALCALOSIS RESPIRATORIA = HIPERVENTILA
   → PACO2 baja → (gas alveolar) PAO2 sube → alivia la hipoxemia de la baja presión atmosférica
```
> *"If you understand why acetazolamide is used for altitude sickness, you have to understand the
> alveolar gas equation… there are so many things you have to put together."* ✅
· Otros cálculos resueltos ✅: 100 % O2 a 1 atm con PACO2 40 → PAO2 = 713 − 50 = **663 mmHg**; a 2 atm
→ 1473 − 50 = **1423 mmHg** → base racional del **oxígeno hiperbárico en la intoxicación por CO**.
· **Vocabulario que exige separar** ✅: **PAO2** alveolar · **PaO2** arterial · **hipoxemia** = PaO2
baja (*-emia* = en sangre) · **hipoxia** = poco O2 en el **tejido**. Y el orden causal correcto:
*"you have a low oxygen saturation because you have less oxygen in your alveoli. It's not the other
way around."*

**4.2 Retenedor crónico de CO2 y la paradoja del oxígeno en EPOC** ✅
```
Normal: el impulso respiratorio depende SOBRE TODO del drive HIPERCÁPNICO (quimiorreceptores
        centrales, pH del LCR). El drive hipóxico es un respaldo.
EPOC retenedor: PACO2 basal 60 mmHg o más → el drive hipercápnico se DESENSIBILIZA
        → pasa a depender del DRIVE HIPÓXICO ("respira cuando está hipóxico y DEJA de respirar
          cuando ya no lo está"); muchos viven con SatO2 ~90 % en aire ambiente
Le doy O2 a chorro en una exacerbación:
        → sube la PaO2 → el cuerpo carotídeo deja de censar hipoxia → HIPOVENTILA → RETIENE MÁS CO2
```
· **Los otros dos mecanismos (los tres suman)** ✅/⚠: (2) **reversión de la vasoconstricción pulmonar
hipóxica** — respondido por el propio Palmerton en los comentarios: *"when you give someone
supplemental oxygen, you cause an increase in blood going to poorly ventilated areas → physiologic
dead-space increases"*; (3) **efecto Haldane** ⚠.
· **Aplicación inversa (anestesia)** ✅: para **despertar** el impulso respiratorio al salir de la
anestesia, el anestesiólogo **baja el soporte** → sube la PaCO2 → se dispara el drive propio.

**4.3 Gradiente A-a** ⚠ (derivado, no literal)
> ⚠ **Fiabilidad**: el gradiente A-a **como tal no aparece explicado** en las fuentes leídas; lo que
> sí está, literal y completo, es la **ecuación del gas alveolar** con la que se calcula. Lo de abajo
> es derivación legítima. 🔎 **A VERIFICAR (08-sep)**.
```
Gradiente A-a = PAO2 − PaO2 = (150 − PACO2/0,8) − PaO2 ;  normal joven ≈ 5-15 mmHg, sube con la edad
A-a NORMAL    ⇒ el pulmón está SANO: el problema es el aire que llega o el fuelle
                 · ALTITUD (PIO2 baja) · HIPOVENTILACIÓN (opiáceos, GBS, obesidad-hipoventilación)
A-a AUMENTADO ⇒ el problema está DENTRO del pulmón: SHUNT · DESAJUSTE V/Q · DEFECTO DE DIFUSIÓN
```
· **Enlace verificado que hace el propio Palmerton** ✅ (en comentarios): *"There should not be a
gradient between PACO2 and PaCO2 unless there is a perfusion defect"* → por eso en la fórmula se usa
la PaCO2 de la gasometría como si fuera la alveolar.
· **VIÑETA** ⚠: varón de **24 años** inconsciente con una jeringa al lado. FC 58, PA 105/65, **FR
6/min**, SatO2 **82 %**; pH **7,22**, PaCO2 **80**, PaO2 **45** → PAO2 = 150 − 100 = **50** →
A-a = **5 mmHg = NORMAL** → pulmones sanos; hipoxemia **puramente por hipoventilación central**.

**4.4 V/Q: por qué el ápex y la base no se comportan igual** ✅
```
Al ir del ÁPEX a la BASE (de pie) SUBEN las dos: ventilación Y perfusión.
Pero la PERFUSIÓN sube MUCHO MÁS → el COCIENTE V/Q BAJA hacia la base.
   ⇒ V/Q más ALTO en el ÁPEX · V/Q más BAJO en la BASE
```
· El ejemplo numérico "tonto" que usa a propósito ✅: ápex V=1, Q=1 → V/Q = 1. Base V=2, Q=200 →
V/Q = 0,01. *"I always find it much easier if I put numbers to it."*
· **ANALOGÍA · el muelle (slinky) y los globos** ✅ (la aporta un alumno y él la adopta):
> *"It's like you take a slinky and you hold it with your hand and put the bottom on a table, so it's
> bunched up at the bottom but stretched out at the top."*
```
ÁPEX : el alvéolo ya está distendido. Capacidad 100 cc, ya tiene 50 → solo puede ventilar 50 cc
BASE : el alvéolo está comprimido.   Capacidad 100 cc, tiene 25    → puede ventilar 75 cc
⇒ Ventilación NO es "cuánto aire tiene", es "cuánto aire puedo METER Y SACAR"
```
· **El matiz que él considera clave** ✅: *"Yes it's gravity, but it's NOT gravity's effect on the air
molecules themselves — it's the effect of gravity on the LUNGS themselves."* Para la perfusión usa la
**torre de agua**: la manguera que baja hasta el fondo lleva más flujo.
· **Generalización que exige (y que es la pregunta real)** ✅:
```
No hay NADA especial en el ápex ni en la base: solo importa QUÉ PARTE ESTÁ MÁS ABAJO (declive)
De pie / sentado : V/Q máximo en el ÁPEX
SUPINO           : perfusión máxima POSTERIOR → V/Q máximo ANTERIOR
Cabeza abajo     : todo se invierte → V/Q máximo en la BASE
```
> *"They should say 'in someone who is sitting up or standing up' — but they usually don't."* ✅

**4.5 Shunt vs espacio muerto — la simplificación que él confiesa** ✅
```
Para intercambiar gas hacen falta DOS cosas: SANGRE en el capilar y AIRE en el alvéolo
   SHUNT pulmonar          = llega SANGRE, no llega AIRE   (V = 0, Q normal)
   ESPACIO MUERTO alveolar = llega AIRE, no llega SANGRE   (V normal, Q = 0)
   Todo lo intermedio      = DESAJUSTE V/Q (cuestión de grado)
TEP                     → ESPACIO MUERTO      Neumonía consolidativa → SHUNT
Ventilación unipulmonar → SHUNT
```
· **Confesión metodológica que vale oro** ✅: *"This is something that I didn't really understand until
I was a resident, and it wasn't until I was studying for my anesthesia boards that I was like — oh,
this is a LOT more simple than I was making it out to be."*
· **La distinción que casi nadie hace** ✅: el **shunt pulmonar** (intrapulmonar) NO es lo mismo que un
**shunt extrapulmonar** (CIV). *"That's what confused me so much when I was studying for Step 1."*
· **La pregunta de auscultación que remata el concepto** ✅: "¿qué se ausculta en un TEP?" →
**PULMONES LIMPIOS**.
```
¿Qué escucho con el fonendo? AIRE moviéndose por vías grandes y pequeñas. NADA MÁS.
No escucho vasos sanguíneos. Un TEP no toca las vías aéreas → no cambia el sonido.
⇒ "Pulmones limpios" NO significa "el pulmón está bien": significa "el aire circula igual"
```

**4.6 Ventilación unipulmonar, HPV, posición y clampaje — el bloque de aplicación** ✅
```
Ventilo solo el pulmón DERECHO, el izquierdo colapsado:
   la sangre sigue llegando al izquierdo pero no hay aire → SHUNT → baja la PaO2
¿Quién recibe más flujo? EL DERECHO (el ventilado), por DOS razones:
   (1) VASOCONSTRICCIÓN PULMONAR HIPÓXICA (HPV): el pulmón es el ÚNICO órgano que vasoconstriñe
       cuando baja el O2 → más resistencia en el pulmón colapsado → menos flujo hacia él
   (2) COMPRESIÓN MECÁNICA: al colapsar el pulmón comprimo también sus vasos → más resistencia
¿Cómo mejoro la PaO2 sin tocar el respirador? DECÚBITO SOBRE EL PULMÓN VENTILADO
```
Chiste que usa para que no se olvide ✅: **HPV** = *"like the virus but completely unrelated — not
human papilloma virus"*.
· **El experimento real que lo demuestra** ✅ — el mejor anclaje del bloque:
```
NEUMONECTOMÍA en quirófano, paciente con FiO2 100 %:
   pulmón colapsado + perfundido = SHUNT PURO → SatO2 estancada en 93 %
      ("la descripción clásica del shunt: doy 100 % de O2 y la oxigenación NO mejora")
   el cirujano CLAMPA la arteria pulmonar de ese lado
      → desaparece el shunt → la saturación SUBE de inmediato
```
> *"It went up, it went up, it went up — which is so amazing when you see this. The surgeon was
> pimping the med student: 'why did the saturation go up?' And the med student had zero idea."* ✅
· **PREGUNTA 2 de la clase** ✅: **neumonía del lóbulo izquierdo, ¿en qué posición la SatO2 es
máxima?** → **decúbito lateral DERECHO** (pulmón sano abajo). Decúbito izquierdo (enfermo abajo) →
la gravedad manda más sangre al pulmón consolidado → sube la fracción de shunt → SatO2 se desploma.
· **ERROR** ⚠: asumir que la gravedad afecta igual a V y a Q. Afecta **mucho más a la perfusión**.
· **VIÑETA** ⚠: mujer de **72 años**, fiebre **38,9 °C**, consolidación en LII; en decúbito izquierdo
SatO2 **87 %**; se la gira a decúbito derecho → **94 %** sin tocar el oxígeno.
· **La prueba del 100 % de O2** ✅/⚠: `DESAJUSTE V/Q (V bajo pero > 0) → con FiO2 100 % la PaO2
CORRIGE` · `SHUNT PURO (V = 0) → NO corrige (refractaria)`. Disfraz clásico ⚠: SDRA por sepsis con
SatO2 congelada pese a FiO2 100 %.

**4.7 Gasometría arterial: el método de 3 pasos** ✅
```
PASO 1 · Mira el pH: ¿acidemia o alcalemia? → eso dice cuál es el proceso PRIMARIO
PASO 2 · Mira PCO2 y HCO3−: ¿cuál de los dos EXPLICA ese pH? → ése es el primario
PASO 3 · El otro es la COMPENSACIÓN
Normales memorizados: pH 7,35-7,45 · PCO2 40 · HCO3− 24
   PCO2 > 40 = acidosis respiratoria  ·  PCO2 < 40 = alcalosis respiratoria
   HCO3 > 24 = alcalosis metabólica   ·  HCO3 < 24 = acidosis metabólica
Regla del alumno que él valida: pH y PCO2 en DIRECCIONES OPUESTAS ⇒ primario RESPIRATORIO;
                                pH y PCO2 en la MISMA dirección  ⇒ primario METABÓLICO
```
· Por qué el CO2 acidifica ✅: CO2 + H2O ⇄ **ácido carbónico** ⇄ H+ + HCO3−.
· **ERROR** ✅: tener que ir a mirar la tabla de valores normales durante el examen.

**4.8 SDRA — la viñeta que él desmonta frase a frase** ✅ (literal)
> Mujer de **82 años** en una residencia, **confusión** y **fiebre alta**. Antecedente de **ITU de
> repetición**; lleva **varios días usando pañal de adulto**. Disnea que **no mejora con soporte no
> invasivo** → se intuba. Rx: **opacidades algodonosas bilaterales**. Catéter de arteria pulmonar:
> **PCWP = 8**. Gasometría con FiO2 70 %: pH en el límite alto, PaO2 baja, **PCO2 baja**, **HCO3 = 21**.
```
Anciana + residencia + confusión + fiebre → INFECCIÓN (el delirio del anciano es a veces el único signo)
ITU → urgencia/frecuencia → no llega al baño → PAÑAL   (así se CONECTA esa frase, no se lee suelta)
Cistitis NO da fiebre; pielonefritis SÍ → puede evolucionar a SEPSIS
Sepsis → sube la permeabilidad vascular → fuga de líquido al alvéolo → SDRA
SDRA → edema pulmonar NO cardiogénico → hipoxemia
     → hiperventilación compensadora → baja la PCO2 → (gas alveolar) sube la PAO2
     → ALCALOSIS RESPIRATORIA PRIMARIA con compensación metabólica (HCO3 21)
```
· **La frase que decide el diagnóstico** ✅: **PCWP = 8 (normal)**. `PCWP alta → edema CARDIOGÉNICO` ·
`PCWP normal → NO cardiogénico → con opacidades bilaterales + sepsis ⇒ SDRA`.
> *"If someone just showed me a chest X-ray that looked like this I would think heart failure — but
> because the wedge is normal, in the setting of sepsis, I think ARDS."* ✅
· El mecanismo de la hiperventilación **es el mismo que en la altitud** ✅: *"It's the exact same
mechanism as altitude."*
· **ERRORES en la misma viñeta** ✅: leer la frase del pañal aislada · dar **mecanismo sin
diagnóstico** o **diagnóstico sin mecanismo** (*"you gave me a mechanism but you haven't given me a
diagnosis"*) · explicar la alcalosis por "está intubada" · y la frase que resume el método:
*"You can't just say 'she magically developed pulmonary edema because of the infection'. **You've got
to give me some arrows.**"*

**4.9 TEP: Virchow, resistencias y "pulmones limpios"** ✅
```
Tríada de Virchow: HIPERCOAGULABILIDAD · ESTASIS VENOSA · DAÑO ENDOTELIAL
   → en las viñetas suelen bastar DOS de los tres para justificar la sospecha
   Tabaco = daño endotelial · Cáncer (páncreas: mucina → factor tisular) y ACO = hipercoagulabilidad
   Vuelo largo / inmovilidad / postoperatorio = estasis
TVP → embolia → TEP grande en una arteria pulmonar principal
   → QUITO UN RESISTOR EN PARALELO → sube la RVP → sube la poscarga del VD
   → el VD (pared fina) se DILATA agudamente → el septo abomba hacia el VI
   → baja la precarga del VI → baja el VS → baja el GC → baja la PAM → baja la PPC → SÍNCOPE
   → y la congestión se acumula HACIA ATRÁS: JVD, hepatomegalia, edema — con PULMONES LIMPIOS
     y PCWP baja
```
· **Las dos viñetas literales que usa** ✅: (1) varón de **67 años**, **20 paquetes-año**, un mes de
dolor dorsal, masa pancreática, dolor en la pierna, mareo → **2 de 3** de Virchow. (2) mujer de
**36 años** que fuma, toma **anticonceptivos orales** y hace un **vuelo largo de Corea del Sur a Los
Ángeles** → **3 de 3** → TVP masiva → TEP → fallo derecho → JVD **sin crepitantes** → hipotensión.
*"The fact that it's right-sided heart failure is critical, because that's why she doesn't have
crackles."*
· **Provocada vs no provocada** ✅: **no provocada = más preocupante** (genética o causa oculta — el
caso del profesor de Stanford con TVP jugando al tenis, que tenía **factor V Leiden**).
· **Tratamiento** ⚠: anticoagulación **terapéutica** inmediata; la dosis profiláctica es inútil para
tratar un TEP establecido. Trombolíticos solo si **TEP masivo con inestabilidad**.
· **Filtro de VCI** ⚠: **SIEMPRE segunda línea**; solo dos indicaciones: contraindicación absoluta
para anticoagular, o nuevo evento embólico **a pesar** de anticoagulación plena. El **rule-in** del
filtro exige demostrar una de las dos; si la viñeta no la da, la respuesta es anticoagular.
· **Gammagrafía V/Q** ✅ (HY Nuclear): ventilación = radiotrazador **inhalado**; perfusión =
**inyectado**; ambas son **centellografía 2D** (no SPECT ni PET). Lectura: zona **clara en perfusión y
normal en ventilación** = defecto de perfusión = TEP. **VIÑETA** ✅: puérpera inmediata con disnea
súbita → **embolia de líquido amniótico**.

**4.10 Vía aérea intratorácica vs extratorácica: EL error más extendido del banco** ✅
```
El calibre lo decide la DIFERENCIA de presión (fuera del tubo vs dentro del tubo)
INSPIRACIÓN: baja la presión INTRAtorácica →
      · vías INTRAtorácicas (alvéolos, bronquiolos, tráquea baja) → SE ABREN
      · vía EXTRAtorácica (laringe, epiglotis, tráquea alta) → la presión DENTRO cae por debajo de
        la atmosférica (que no puedo cambiar) → SE COLAPSA
ESPIRACIÓN: al revés
   ⇒ Lesión INTRAtorácica → obstrucción y ruido en ESPIRACIÓN
   ⇒ Lesión EXTRAtorácica → obstrucción y ruido en INSPIRACIÓN
```
· **El error conceptual exacto que él diagnostica en directo** ✅:
> *"The problem is that you're conflating intrathoracic and extrathoracic. You're expecting that your
> extrathoracic — your epiglottis — should respond the exact same way that your alveoli do. That's
> not true. It's actually the opposite."*
Y el orden causal, que también corrige ✅: *"narrowing happens BECAUSE of the pressure differences —
not pressure differences because of narrowing."*
· **ANALOGÍA · la flauta dulce** ✅: `ESTRIDOR = UN solo tubo obstruido (tráquea) → UNA flauta → UN
tono (monofónico)` · `SIBILANCIA = MILES de bronquiolos de calibres distintos → miles de flautas →
MUCHOS tonos (polifónico)`.

| Cuadro | Localización | Ruido | Fase |
|---|---|---|---|
| **Asma** | bronquiolos (intratorácicos) | sibilancias | **espiratoria** |
| **Epiglotitis, laringomalacia** | extratorácica | estridor | **inspiratoria** |
| **Tumor traqueal alto (cervical)** | extratorácica | estridor | **inspiratoria** |
| **Tumor traqueal bajo / estenosis por cuff** | intratorácica | estridor | **espiratoria** |
| **Traqueomalacia post-intubación** | intratorácica (cuff ≈3 cm de la carina) | estridor | **espiratoria** |
| **Bronquiectasias** | intratorácica | — | obstrucción **espiratoria** (vía dilatada pero **flácida**) |

· **La escala de gravedad del asma deducida de la física** ✅:
```
Sibilancias solo en ESPIRACIÓN          → obstrucción "normal"
Sibilancias en INSPIRACIÓN Y ESPIRACIÓN → GRAVE: si incluso con la vía MÁXIMAMENTE abierta suena,
                                          es muy malo
NO se oye NADA de movimiento de aire    → PEOR TODAVÍA (tórax silente)
```
· **Las 3 razones para intubar** ✅: (1) fallo ventilatorio (CO2 alto), (2) fallo de oxigenación,
(3) **protección de la vía aérea** — que es la razón de ser del **cuff**.

**4.11 Pruebas de función respiratoria y DLCO** ⚠ (síntesis; coherente con el marco físico, no
verificada línea a línea)
```
OBSTRUCTIVO = problema de SALIDA (espiración). La espiración sube la presión intratorácica y tiende
   a COLAPSAR las vías pequeñas; si falta soporte elástico (enfisema) o sobra moco (bronquitis,
   asma) → colapso precoz → ATRAPAMIENTO AÉREO
   FEV1 cae desproporcionadamente más que FVC → FEV1/FVC < 70 % · TLC alta (hiperinsuflación)
RESTRICTIVO = problema de ENTRADA: el pulmón o la caja no se expanden
   FVC cae mucho; FEV1 cae en proporción o menos → FEV1/FVC NORMAL o ALTO (> 80 %) · TLC baja
```

| Patrón | DLCO | Por qué |
|---|---|---|
| Restrictivo **intraparenquimatoso** (FPI, sarcoidosis) | **baja** (p. ej. 55 %) | la fibrosis destruye/engruesa la membrana alvéolo-capilar |
| Restrictivo **extraparenquimatoso** (obesidad, escoliosis) | **normal** | mecánica restringida, membrana intacta |
| **Enfisema** | **baja** | destrucción de septos → menos superficie |
| **Asma / bronquitis crónica** | **normal** | membrana intacta; el problema es broncoespasmo o moco |

· **VIÑETA FPI** ⚠: varón > 60 años, no fumador, tos seca de un año, disnea de esfuerzo, Rx con
**opacidades lineales finas bibasales**; FEV1 **80 %**, FVC **48 %**, FEV1/FVC **> 80 %**,
**DLCO 55 %**.
· **ERROR de "abogado" en PFT** ⚠: un alumno falló una pregunta de enfisema porque la opción correcta
decía *"alveolar destruction **and fibrosis**"* y razonó "la fibrosis es restrictiva, luego el
enfisema obstructivo no puede tener fibrosis" → eligió cáncer de pulmón. **Juez, no abogado**: la
destrucción alveolar es incuestionable y la opción sigue siendo infinitamente mejor que las demás.

**4.12 Curva de disociación de la hemoglobina, CO, cianuro y contenido de O2** ⚠
```
Curva sigmoidea por COOPERATIVIDAD ; P50 ≈ 25-27 mmHg
IZQUIERDA (más afinidad, P50 baja): menos temperatura, menos H+ (pH alto), menos PaCO2,
   menos 2,3-BPG, HbF, CO, metaHb → capta bien en el alvéolo pero NO SUELTA en el tejido
DERECHA (menos afinidad): más temperatura, más H+ (efecto Bohr), más PaCO2, más 2,3-BPG
HbF: cadenas gamma en vez de beta → no une 2,3-BPG → desviada a la izquierda
```
· **CO** ⚠: doble golpe — afinidad **200×** la del O2 por el Fe2+, y desvía la curva **a la izquierda**.
· **Cianuro** ✅ (HY Biochem, → §15.3): bloquea el **complejo IV** → la mitocondria no puede usar el
O2 → **sangre venosa hiperoxigenada** → piel **rojo cereza**.
· **Contenido de O2 — el cálculo que hace en clase** ⚠:
```
CaO2 = (1,34 × Hb × SatO2) + (PaO2 × 0,003)
Sano: Hb 12, Sat 1,00, PaO2 100 → 16,08 + 0,3 = 16,38 mL O2/dL
Anemia grave (Hb 6,5): el término unido a Hb CAE A LA MITAD (−8 mL/dL)
   Aunque suba la PaO2 a 600 con mascarilla: 600 × 0,003 = 1,8 mL/dL
   ⇒ 1,8 NO COMPENSA una pérdida de 8. Inundar de oxígeno a un anémico es FÚTIL.
   ⇒ La compensación obligatoria es HEMODINÁMICA: DO2 = GC × CaO2 → EL GASTO CARDÍACO DEBE DUPLICARSE
     → taquicardia e hiperventilación, SIN alteración barorreceptora ni de precarga
```
Conecta con lo verificado en HY Cardio 2 sobre el O2 en el SCA ✅: *"el aumento marginal de la
capacidad de transporte es tan pequeño que no cambia gran cosa"*.

**4.13 Neumotórax, derrame y atelectasia** ⚠
· **Neumotórax simple**: entra aire al espacio pleural → se pierde la presión intrapleural negativa →
colapso ipsilateral. **A tensión**: válvula unidireccional → desplaza el mediastino → **comprime las
cavas** → baja el retorno venoso → **shock obstructivo**. (El mecanismo mortal es hemodinámico.)
· **Criterios de Light** ⚠, con el matiz que él subraya:
```
EXUDADO si cumple AL MENOS UNO:
   proteína pleural / proteína sérica > 0,5 ; LDH pleural / LDH sérica > 0,6 ;
   LDH pleural > 2/3 del LÍMITE SUPERIOR NORMAL de la LDH sérica
El examen NO espera que memorices el valor fijo de LDH: el ULN varía por laboratorio, así que TE LO
DAN en la viñeta. Trasudado = fuerzas de Starling (IC, cirrosis); exudado = inflamación.
```
· **La "inmunidad" del asmático a la atelectasia** ⚠: el atrapamiento aéreo genera **auto-PEEP**, que
actúa como andamio neumático y mantiene los alvéolos abiertos.

**4.14 Neumonías, fibrosis, sarcoidosis y cáncer** ✅/⚠
· **Neumonía lobar = shunt puro** ✅ (verificado en HY Resp).
· **Por qué el esputo bacteriano es verde/amarillo** ⚠ (la química que él desarrolla):
```
Infección alveolar → reclutamiento masivo de NEUTRÓFILOS → mueren y se lisan
   → liberan MIELOPEROXIDASA → la MPO lleva un grupo HEMO → anillo de porfirina con dobles enlaces
   CONJUGADOS → absorbe en el visible → refleja VERDE/AMARILLO
Esputo claro = infección viral (no hay lisis masiva de neutrófilos)
```
· **Sarcoidosis** ⚠: activación sistémica de macrófagos → **granulomas no caseificantes**; comparte
síntomas constitucionales con cáncer y TB porque comparten la cascada de citocinas (→ §2.1).
· **Cáncer microcítico** ⚠: linaje **neuroendocrino**, tabaquismo pesado. Paraneoplásicos: **ACTH**
(Cushing ectópico) y **ADH → SIADH** (Na 115, osm sérica 260, densidad urinaria 1,041, osm urinaria
> 300; euvolémico por ANP; tratamiento agudo si sintomático = **salino hipertónico 3 %**) — ver §5.4.
· **Epidermoide** ⚠: **PTHrP** → hipercalcemia con **PTH intacta suprimida** (→ §7.4).
· **Apnea obstructiva del sueño** 🔎 **A VERIFICAR (08-sep)**: la afirmación de que la regla de manejo
prioriza la **pérdida de peso** antes que la polisomnografía es la más frágil del extracto de
respiratorio; contrastar con UWorld antes de fijarla.

**4.15 Surfactante y SDR neonatal** ⚠⚠ 🔎 la cita atribuida aquí apunta a un fichero que **no figura
en el inventario de fuentes del cuaderno** → tratar como fisiología estándar, **no** como material
Palmerton → `pendiente_usuario`.
```
Prematuro (< 35 sem) → neumocitos tipo II inmaduros → relación L/S < 2,0 → déficit de lecitina
   → más tensión superficial → más presión de colapso (P = 2T/r; el alvéolo PEQUEÑO colapsa antes)
   → atelectasia espiratoria masiva → menos compliance → trabajo brutal → fatiga → shunt
VIÑETA: RN de 29 semanas, distrés a los 10 min, retracciones, FR 88, PaCO2 68, PaO2 42, L/S 1,2
```

**4.16 Los errores de método en respiratorio (los que él enumera)**
1. **Leer la última línea primero** ⚠ — ir directo a "¿cuál es el siguiente paso?" te hace adivinar
   entre distractores.
2. **Ser abogado ante las PFT** ⚠ (§4.11).
3. **Confundir vía intratorácica y extratorácica** ✅ — *el error más extendido del banco*.
4. **Explicar sin flechas** ✅ — *"You've got to give me some arrows."*
5. **Explicar de forma que solo se entienda si el otro ya lo sabía** ✅ — y el corolario que se aplica
   a sí mismo: *"If you can't explain it, it means that I messed up and I didn't teach you
   effectively. It also means that I probably don't understand the topic particularly well."*
6. **Descartar por un negativo que no te han dado** ✅.

### (c) High-yield del bloque
Curva O2-Hb (Bohr, 2,3-BPG, CO, metaHb) · hipoxemia y gradiente A-a (5 mecanismos) · V/Q y zonas de
West · PFTs (obstructivo vs restrictivo, DLCO, curvas flujo-volumen) · compliance (enfisema vs
fibrosis), Laplace, surfactante/NRDS · ABG y compensaciones · quimiorreceptores y retención crónica
de CO2 · TEP · SDRA · asma/EPOC/alfa-1-AT · cáncer de pulmón y paraneoplásicos · neumonías y TB ·
neumotórax a tensión y criterios de Light · embriología pulmonar.

### (d) Fuentes
Vídeos ✅: [High Yield Respiratory](https://www.youtube.com/watch?v=HU3V0kftcqY) ·
*High Yield Nuclear Medicine: PET, SPECT, VQ Scans* (gammagrafía V/Q) ·
*High Yield Pediatrics Review Part 2* (traqueomalacia) · *High Yield Cardiology Part 2*
(intratorácico vs extratorácico, isquemia por presión del cuff).
Artículos ✅ (URLs conservadas de la v2):
[Alveolar Gas Equation ↔ Diuretics](https://www.yousmle.com/alveolar-gas-equation-for-the-usmle-step-1-diuretics-you-probably-wont-guess-the-connection/) ·
[Don't Read the Last Line First](https://www.yousmle.com/dont-read-the-question-first/) ·
[7 Reasons Your NBMEs Aren't Improving](https://www.yousmle.com/nbmes-not-improving/) ·
[How to Review UWorld](https://www.yousmle.com/how-to-review-uworld/) ·
[High-Yield Respiratory — The Match Guy](https://thematchguy.com/usmle-step-1-high-yield-pulmonology-respiratory-concepts/).

### (e) → En tu plan
**D16 = vie 2-oct → NBME 25 (N5 · 200Q)** · **D17 = lun 5-oct (N1 · 30Q)** · **D18 = mar 6-oct
(N1 · 30Q)** · **D19 = mié 7-oct** · **D20 = jue 8-oct** (los dos N2 · 40Q) · **D21 = vie 9-oct
(N3 · 40Q — 20Q del sistema completo timed)** · **D22 = lun 12-oct (N2 · 40Q)**. Ojo a la estructura: el NBME 25 **parte el bloque en dos**; la ecuación del gas
alveolar y el V/Q (D17 · D18) deben estar **validados al 80 %** antes del hito, porque son la base de
todo lo que viene después. El gas alveolar **vuelve** en Renal (acetazolamida, **D24 mié 14-oct** y
ácido-base **D26 vie 16-oct**).

---

## 5. Renal

**→ En tu plan: D23-D28 = mar 13-oct-2026 → mar 20-oct-2026.**
Niveles: D23 (mar 13-oct) N1 · D24 (mié 14-oct) N1 · D25 (jue 15-oct) N2 ·
**D26 (vie 16-oct) N3 · 40Q** · D27 (lun 19-oct) N2 · D28 (mar 20-oct) N2. Contenido: nefrona/filtración/clearance (D23) ·
transporte tubular + diuréticos por sitio (D24) · electrolitos completos + SIADH/DI (D25) ·
ácido-base paso a paso (D26) · glomerulares nefrítico vs nefrótico (D27) · AKI + ERC + litiasis +
poliquistosis (D28). Vídeos: [High Yield Renal](https://www.youtube.com/watch?v=zeM8dMiRsJQ) (D23) ·
[High Yield Renal Part 2](https://www.youtube.com/watch?v=CIIMMIvrRso) (D25).

### (a) Concepto ancla y cadena causal
> *"You learned creatinine wrong on day one and it's costing you points on every single renal
> question. You were taught that creatinine up means kidneys are failing, but that's not exactly what
> it measures. It tells you that filtration dropped, but not why."* ✅ (HY Renal 1)
> *"Every renal problem is hiding one question: **where in the kidney is the problem?** All those
> diagnoses you memorized are really just different locations along the same tube."* ✅ (HY Renal 2)

**Fallo de órgano = fallo de su función clave** ✅. La función que seguimos en el riñón es la
**FILTRACIÓN** (por eso medimos GFR y creatinina: *"GFR = glomerular FILTRATION rate, not
reabsorption rate"*); la ERC se estadifica por eGFR.
**Segundo tatuaje del curso** ✅: *"Next to your tattoo MAP = CO × TPR, the second thing I'd add is
**specific gravity 1.010 = isosthenuria = urine osm 300**."*

**Advertencia de lectura que sale de este bloque** ✅: una alumna respondió por la creatinina **en
orina** cuando se preguntaba **en suero**:
> *"20-25 % of the questions you're missing are because you don't actually understand what they're
> asking you; another 20-30 % because you read the vignette too quickly."*
Y el aviso de nivel: las preguntas "manipuladas" son las que separan 230-240+ — *"in nephrogenic DI /
with furosemide, what's the osmolarity in the PCT, the DCT and the collecting duct?"*: nunca vistas
en UWorld pero **fair game**.

### (b) Subtema a subtema

**5.1 Creatinina, BUN, urea y amonio: qué mide cada cosa** ✅
· **Creatina** = portador de un enlace fosfato de alta energía; la **creatina cinasa** la fosforila
para "montar" la cabeza de miosina. **Creatinina** = producto de descomposición espontánea →
sangre → filtrada → orina.
· **CK solo debe estar dentro del músculo**: si aparece en sangre = necrosis muscular.
· **Rabdomiólisis → K+ alto** ✅ (razonamiento integrado): Na+ 140 fuera, K+ 4 fuera; **98 % del K+ es
intracelular** (≈160 mEq/L, "40 veces el suero") y **el músculo contiene ~80 % del K+ intracelular**.
El Ca2+ NO sube (está fuera; diferencia ~400×). Un IAM no dispara el K+ (poca masa) sino CK-MB. La
creatinina sube después por daño renal de la **mioglobina** (precipita en los túbulos como cristales
en solución sobresaturada → **hidratación IV agresiva**).
· **El glomérulo es un colador** ✅ ("sieve"): pasa lo pequeño y no cargado, no la proteína (carga
negativa de la membrana). **Creatinina: filtrada, no reabsorbida ni secretada de forma significativa**
→ *"filtration is passive… it's like a constant in physics"* → **medida indirecta del GFR**.
· **Estado estacionario** ✅: producción = eliminación → nivel constante; si no filtro, se acumula.
· **Amonio y urea** ✅: aminoácido = amina + ácido + R; al degradarlo hay que eliminar el nitrógeno.
**El amonio es malo porque inhibe el TCA y baja el ATP**: NH3 + alfa-cetoglutarato → glutamato;
+ oxalacetato → aspartato; + piruvato → alanina → *"these are biochemistry questions you have to
know"* → el cerebro se queda sin energía → **encefalopatía hepática**. **Urea** = dos NH2 sobre un
carbono; filtrada (pequeña, neutra) y **reabsorbida cuando la ADH es alta**.
· **Lactulosa** ⚠: las bacterias la fermentan → pH ácido → NH3 → **NH4+ (cargado, no cruza membranas)**
= **ion trapping** → se excreta en heces.
· **VIÑETA literal** ✅: 58 años, 20 años sin médico, PA **160/95**, **Cr 3,5**, **BUN 40**, Na 140,
K 4,5 → ERC (HTA/DM; *"renal artery stenosis es más popular en QBank que en la vida"*) → baja la
filtración → se acumulan creatinina, BUN y **sodio con su agua → sube el volumen intravascular →
HTA**; **la concentración de Na es normal** porque el agua sigue a la sal.

**5.2 Glucosa, túbulo proximal, células claras y NTA** ✅
· **Glucosa**: pequeña y sin carga → filtrada; reabsorbida en el TCP hasta **saturar los
transportadores (Tm/splay; > 200 mg/dL)** → glucosuria (por eso la **vejiga brilla en el PET-FDG**) →
diabetes **mellitus** ("mel" = miel: probaban la orina) vs **insipidus** (insípida).
· **"Most of X is absorbed where? Proximal tubule: right 95 % of the time."** ✅ El TCP es el segmento
**más ATP-dependiente** (Na+/K+ ATPasas) → **más sensible a isquemia** → **NTA isquémica: los
cilindros nacen en el TCP**; y como está lleno de glucógeno y grasa, el **carcinoma de células
claras** (origen TCP) se ve "blanco" porque el solvente del corte lava glucógeno y grasa (→ §2.7).

**5.3 Sodio, compartimentos y volumen extracelular** ✅
· Agua = ~60 % del peso; **2/3 intracelular, 1/3 extracelular**; del ECF **1/4 plasma y 3/4
intersticio**. **Todo el cuerpo es isotónico salvo la médula renal.**
· **Dos razones por las que importa el sodio**: (1) su gradiente es la base de casi todos los
potenciales de acción; (2) **el sodio total fija el volumen del ECF** ("water follows salt") porque
la Na+/K+ ATPasa lo excluye de las células.
· **Na+ se filtra (pequeño aunque cargado) y se reabsorbe > 99 %** ("the opposite of FENa"): TCP, asa
(NKCC2), TCD y colector (aldosterona).

**5.4 Contracorriente, asa vs tiazidas, ADH y la regla del ×30** ✅ — el núcleo del bloque
```
REGLA Y EXCEPCIÓN: "All fluid in the body is isotonic except the renal medulla and the distal tubule"
Antes del asa el líquido tubular es SIEMPRE isotónico (300): en prerrenal, intrarrenal, posrrenal,
con litiasis, con furosemida, en DI nefrogénica…
   "You can eliminate two-thirds of the answers just by remembering the PCT is always isotonic"
```
· **Por qué el TCP es isotónico aunque reabsorba > 75 % de solutos** ✅: reabsorbe **agua y soluto a la
vez**. **El asa cambia la osmolaridad porque sus ramas son asimétricas**: descendente permeable
**solo a agua**, ascendente gruesa **solo a soluto (NKCC2)**:
> *"The thick ascending limb is basically salting the medulla, so water leaves from the descending
> limb."* (frase de un alumno que él adopta)
Ejemplo numérico paso a paso ✅: todo a 300 → la ascendente bombea → 200 en el tubo y 400 en el
intersticio → la descendente equilibra a 400 → entra líquido a 300 del TCP y desplaza → repetir →
gradiente creciente hasta **~1200**.
· **Fin del asa: líquido hipotónico (≈100) = "agua libre creada"; intersticio hipertónico** ✅.
> *"The point of counter-current multiplication is to create a gradient where you can absorb free
> water in the collecting tubule."*
En el colector eliges: **ADH alta → acuaporinas → el agua baja su gradiente** (proceso **pasivo**: el
ATP se gastó al crear el gradiente) → orina hasta 1200; **ADH baja → pierdes agua libre** → orina ~100.
· **Experimento mental** ✅: si el líquido llegara isotónico (300) al colector aún podrías reabsorber
agua libre, **pero no podrías perderla** → no podrías subir la osmolaridad sérica → por eso "quien
diseñó el asa se tomó tanto trabajo". (Y su chiste con Feynman: si lo entiendes lo explicas a un niño
de cuarto; la excepción en medicina sería la contracorriente.)
· **FUROSEMIDA** ✅: bloquea NKCC2 → no se sala la médula → sin gradiente el agua no sale de la
descendente → **isotónico (300) en TCP, TCD y colector** → aunque la ADH ponga acuaporinas **no hay
fuerza** para reabsorber agua libre:
> *"If you could perfectly block the NKCC channels you should not be able to become hyponatremic."*
> (en la práctica el bloqueo nunca es perfecto)
**ERROR del alumno** ✅: "hipertónico porque queda más soluto en el tubo" → *"the way you concentrate
urine isn't that you stop reabsorbing solute, it's that you reabsorb free water."*
· **TIAZIDAS** ✅: bloquean NaCl en el **TCD, después del asa** → el gradiente medular sigue **intacto**
→ con ADH alta (hipovolemia) se reabsorbe agua libre masiva → **hiponatremia**.
**Regla** ✅: *"hyponatremia is a problem of free water, not of sodium."*
· **Calcio y diuréticos** ⚠: el asa genera potencial luminal positivo que empuja Ca2+ paracelular →
**"loops lose calcium"**; las tiazidas bajan el Na intracelular → el intercambiador basolateral Na/Ca
trabaja más → **retienen Ca2+** (hipercalcemia / hipocalciuria: útil en litiasis cálcica).
· **ADH y osmolaridad** ✅: osmolaridad = "cantidad de cosas disueltas por volumen"; osm alta → ADH
alta → orina concentrada; osm baja → ADH baja → pierdo agua libre. ADH responde también a
**hipovolemia severa (~15-20 %)**.
· **Piensa en agua libre, no en "hipo/hipertónico"** ✅: si la osm urinaria < sérica pierdes más agua
que soluto → la sérica **SUBE** (10 Na/10 agua → pierde 1 Na y 2 agua → 9/8); si urinaria > sérica, la
sérica **BAJA**. *"It's like statistics: not intuitive, you have to walk yourself through it."*
· **Densidad específica y la regla lineal del ×30** ✅:
```
Densidad = densidad de la orina / densidad del agua (ADIMENSIONAL:
   "if you're hoping for 240+ always think about the units")
Plasma SIN proteínas = 1.010  →  orina 1.010 = ISOSTENURIA = ni concentra ni diluye = INTRARRENAL (NTA)
REGLA: últimos dos dígitos × 30 ≈ osm urinaria   (1.010 → 300 · 1.030 → 900 · 1.041 → ~1230)
```
La densidad está en TODO uroanálisis; la osmolaridad hay que pedirla aparte → **aprende a leer la
densidad**.

| Cuadro | Densidad / osm urinaria |
|---|---|
| **Prerrenal** (riñón sano, ADH alta) | > 1.010 · osm > 300 |
| **NTA (intrarrenal)** | **1.010 / 300 = isostenuria** |
| **Diabetes insípida** | "casi agua", **< 1.006** |
| **SIADH** | > 1.010 y osm ≫ 300, con sérica < 300 |
| **Deprivación de agua** | sérica alta y urinaria alta |

· **SIADH — viñeta literal** ✅: **65 años**, confusión de días, **15 lb** de pérdida, tos seca de 3
meses, **50 paquetes-año**; PA 115/75, mucosas húmedas, sin ingurgitación yugular, pulmones limpios
(**euvolémico**); **Na 115**, **osm sérica 260**, **densidad 1.041** → cáncer de células pequeñas
("neuro = responde a señales, endocrino = secreta hormonas") → ADH → reabsorbe agua libre →
hiponatremia hipotónica → el agua entra en las neuronas → edema → confusión → **salino hipertónico**
porque es *sintomático + euvolémico + hipotónico*. **Euvolemia** porque la hipervolemia inicial estira
la aurícula → **ANP/BNP → natriuresis**.
· **Las tres preguntas de la hiponatremia** ✅: (1) **¿es hipotónica?** (con glucosa o BUN altos puede
ser **hipertónica** y entonces "no importa"); (2) **¿volumen?** alto → diuresis/restricción, bajo →
volumen; (3) **euvolémico y sintomático → hipertónico**; asintomático → tratar la causa.
· **Mielinolisis pontina** ⚠: adaptación cerebral con osmolitos (inositol) → si corriges rápido una
hiponatremia **hipotónica crónica**. En la CAD la hiponatremia es **hipertónica** y corregir rápido
**no** da mielinolisis (→ §7.3).
· **Perder sodio no baja la natremia** ✅ porque se va con agua en proporción; el hiperaldosteronismo
da HTA, no hipernatremia (escape de aldosterona vía ANP → Conn **sin edema**).
· **Tarjeta Anki literal** ✅: *Front:* "SIADH versus heart failure hyponatremia – use the
pathophysiology to explain how you can differentiate between the two based on their lab findings."
*Back:* SIADH euvolémico (UNa > 40, Uosm > 100); IC hipervolémica (UNa < 20 por RAAS y reabsorción
proximal máxima).
· ❌ **No están en las fuentes**: hiper/hipopotasemia y ECG como bloque, hipomagnesemia,
hipernatremia, manitol.

**5.5 Potasio: rabdomiólisis por presión y CAD** ✅
· **Isquemia por presión** ✅ (HY Surgery): presión capilar ≈ 16-30 mmHg; una presión externa mayor y/o
prolongada evacúa los capilares → isquemia → necrosis. **No hay número mágico**: "más presión y/o más
tiempo"; el cerebro aguanta 5 min, el músculo horas. Ejemplos: úlceras por presión, **rabdomiólisis
por inmovilidad en intoxicados** (barbitúricos, opioides, alcohol: se suprime el reflejo de moverse
ante el dolor; GCS motor 3 = "diffuse movement to pain"), **alopecia posoperatoria**, parálisis del
peroneo común en litotomía, estenosis traqueal por cuff, síndrome compartimental.
**Por qué no todos los rabdo tienen úlcera** ✅: músculo y subcutáneo son más susceptibles; la úlcera
cutánea es "la punta del iceberg". Dormimos sin úlceras porque **nos movemos ante el malestar**.
Anécdota: un alumno con rabdo tras dormir 20 h, **CK 22 000** (ULN ~500), creatinina normal, oliguria.
· **VIÑETA literal** ✅: **29 años** hallado inconsciente junto a un frasco de barbitúricos, *"diffuse
movement to painful stimuli"*, intubado, **Cr 4,7** → GABA → hiperpolarización → coma → inmovilidad
sin retirada al dolor → presión externa → isquemia muscular → rabdo → mioglobina/K+ → daño tubular →
baja el GFR → sube la Cr. *"Now that I've pointed this out you're going to see it everywhere: the
rhabdo questions are an intoxicated patient."*
· **CAD** ⚠: **K total bajo** (diuresis osmótica, "solvent drag") pero **sérico normal/alto** (sin
insulina la bomba no mete K+; la hiperosmolaridad arrastra agua y K+ fuera); la insulina lo hunde →
reponer. (Viñeta con cifras: 🔎 **A VERIFICAR** — las cifras "glucosa 550 / pH 7,15 / K 4,9 / Na 125"
no aparecen en las citas.)
· **Hiperpotasemia → reposo más positivo → cerca del umbral → FV; el Ca2+ eleva el umbral** ✅ (§3.5).

**5.6 AKI: prerrenal vs intrarrenal vs posrrenal, FENa y NTA** ✅
```
PRERRENAL   = el GFR baja porque el FLUJO baja, pero el riñón funcionaría bien si le llegara sangre
INTRARRENAL = aunque restaures el flujo NO filtra
POSRRENAL   = presión retrógrada hasta el espacio de Bowman
FENa = fracción del Na filtrado que se pierde: < 1 % = reabsorbes el 99 % (prerrenal: RAAS y toda la
   nefrona reabsorbiendo Na para restaurar el ECF); intrarrenal: túbulo dañado → FENa y UNa suben
BUN:Cr > 20 en prerrenal: ambos filtran menos, pero la UREA ADEMÁS se reabsorbe con ADH alta
```
· **VIÑETA literal** ✅: **35 años** perdida 48 h en la montaña, bebe de un arroyo → náusea/vómito/
diarrea → **Cr 2,5 · BUN 50 · FENa 0,5 % · UNa 10 · Uosm 600** → hipovolemia → baja la precarga →
baja el VS → baja el GC → baja la perfusión renal → baja el GFR (Cr/BUN suben, ratio > 20) → sube la
reabsorción de Na en todos los segmentos (FENa/UNa bajos) → ADH alta → agua libre reabsorbida
(Uosm alta).
· **NTA** ✅: causa más frecuente = **prerrenal prolongado** (isquemia → muerte del TCP). Hallazgo
clave: **cilindros granulosos "muddy brown"** — *"tattoo this one on your wrist"*: las células muertas
se desprenden, taponan el túbulo y **toman su forma**. **Analogía de la lavandería**: metió toda la
ropa por el conducto, se atascó y salió con la forma del conducto.
**Fase oligúrica** (túbulos taponados; K+ alto, HTA por Na no excretado) → **fase poliúrica con K
bajo**: las células regeneradas son **inmaduras** y no reabsorben solutos (como el intestino tras una
gastroenteritis infantil).
· **ERROR** ✅: pensar que la poliuria de la NTA es "recuperación".
· **AINE vs IECA sobre el glomérulo** ⚠: **AINE** → constriñen la **aferente** (las PG la dilatan) →
bajan RPF y GFR; **IECA** → dilatan la **eferente** → baja la presión glomerular → **GFR baja y FF
baja**. Riñones **en paralelo** ✅: la nefrectomía sube la RVS y la poscarga (§3.8).
· ❌ **No están en las fuentes**: nefritis intersticial por fármacos, ADPKD y aneurismas saculares
(salvo la viñeta de neuro §8.9), aminoglucósidos/contraste/síndrome hepatorrenal.

**5.7 Glomerulopatías: hipersensibilidad, nefrótico vs nefrítico** ✅
· Los patrones de inmunofluorescencia **se deducen del tipo de hipersensibilidad** (→ §2.3):
**Goodpasture** = tipo II (antígeno **FIJO**) → **IF LINEAL** (*"nothing else looks like this for
Step 1"*; se distingue de Wegener por no tener afectación de vía aérea superior y no ser ANCA) ·
**PSGN** = tipo III → **"lumpy bumpy"** (bolas de inmunocomplejos depositadas al azar) ·
**Wegener/pauci-inmune** → **IF NEGATIVA** porque el daño lo hace el neutrófilo activado por ANCA, no
el depósito ("granadas").
· **ERROR** ✅: tratar "lumpy bumpy" o "lineal" como hechos sueltos y no como tipos II/III.
· **NEFRÓTICO = problema de EXCLUSIÓN** ✅: la barrera deja pasar proteínas → pierde **albúmina**
(anasarca), **antitrombina III** (hipercoagulable pese a PTT alto) e **inmunoglobulinas**
(inmunodeficiencia).
**NEFRÍTICO = "no puedes filtrar" = como fallo renal** ✅: azoemia, oliguria, **HTA** (el Na no
filtrado expande el ECF; recuerda: plasma = 1/4 del ECF).
· **Mujeres en edad fértil y autoinmunidad** ⚠: su teoría (la misma de §2.6) — la menstruación es
muerte celular no apoptótica que expone antígenos intracelulares (dsDNA).
· ⚠ 🔎 **A VERIFICAR (08-sep)** (lista que NotebookLM atribuye a un fichero que no es fuente
Palmerton): cambios mínimos, FSGS (VIH/heroína), membranosa (PLA2R, "spike and dome"), diabética
(Kimmelstiel-Wilson por hiperfiltración eferente), IgA sinfaringítica, PSGN con C3 bajo y "humps",
Alport (colágeno IV), MPGN "tram-track", trombosis de vena renal por pérdida de ATIII. **Nefropatía
lúpica no está.**

**5.8 Ácido-base y RTA** ⚠ (con el esqueleto verificado del método de 3 pasos, §4.7)
```
3 pasos: pH → causante (PCO2 > 40 = acidosis respiratoria; HCO3 < 24 = metabólica) → compensación
Winter: PCO2 esperada = 1,5 × HCO3 + 8 ± 2      Anion gap = Na − (Cl + HCO3) > 12 → MUDPILES
```
· **Salicilatos** ✅ (HY Biochem): **desacoplan la fosforilación oxidativa** (calor/fiebre, lactato →
gap alto) **+ estimulan el centro respiratorio** → alcalosis respiratoria primaria. *"An aspirin
overdose will cause two major effects… a respiratory alkalosis and a metabolic acidosis because it's
an uncoupler."*
· **Vómito** = alcalosis metabólica hipoclorémica · **diarrea** = acidosis hiperclorémica sin gap ⚠.
· **RTA 2** proximal (no reabsorbe HCO3, hipoK) · **RTA 1** distal (no secreta H+, pH urinario > 5,3,
hipoK, litiasis de fosfato cálcico) · **RTA 4** hipoaldosteronismo (acidosis + hiperK) ⚠.
· **Acetazolamida** ✅ (Art. gas alveolar): bloquea el HCO3 proximal → acidosis metabólica →
hiperventilación → baja la PACO2 → sube la PAO2 (mal de altura) — §4.1.

**5.9 Calcio, PTH, ERC y litiasis** ✅/⚠
· **Hipocalcemia y umbral** ✅ (Art. Digoxina): menos Ca2+ → umbral más bajo → tetania, Chvostek,
**Trousseau** (isquemia del manguito → baja el ATP → despolariza y dispara). **Hipercalcemia** →
letargia, debilidad, arreflexia (§3.5).
· **Hipercalcemia por sarcoidosis** ⚠: los macrófagos epitelioides del granuloma expresan
**1-alfa-hidroxilasa** independiente de PTH → calcitriol → absorción de Ca → hipercalciuria/litiasis.
· **ERC → hiperparatiroidismo secundario** ⚠: pérdida de 1-alfa-hidroxilasa (TCP) → sin calcitriol →
hipocalcemia; baja el GFR → no filtra fosfato → **hiperfosfatemia** → PTH alta → RANKL → osteítis
fibrosa quística; **anemia normocítica por falta de EPO**; hiperK y acidosis con gap.
· **Litiasis** ⚠ 🔎 (fuente .md no verificable): **oxalato cálcico 80 %** (sobre de carta;
hipercalciuria idiopática con Ca sérico normal; **hiperoxaluria entérica en Crohn/malabsorción** —
el Ca se saponifica con los ácidos grasos no absorbidos y deja libre el oxalato; etilenglicol → ácido
oxálico → cristales en aguja; **ERROR: restringir el calcio de la dieta empeora las piedras**;
tiazidas bajan la calciuria) · **fosfato cálcico** (cuña; pH > 6,5; RTA 1) · **estruvita** (tapa de
ataúd; ureasa de Proteus/Klebsiella → pH > 8; coraliformes) · **ácido úrico** (rombo; **radiolúcido:
KUB normal no descarta**; pH < 5,5; alcalinizar) · **cistina** (hexágonos; COLA; nitroprusiato).

### (c) High-yield del bloque
Nefrona por segmentos + clearance/GFR · RAAS completo · contracorriente y agua libre · diuréticos por
segmento y su efecto sobre Ca y Na · ácido-base con compensaciones, anion gap y RTA 1/2/4 ·
hipo/hipernatremia (SIADH, DI) y potasio · densidad urinaria y la regla del ×30 · AKI con índices
urinarios y cilindros · nefrótico vs nefrítico por hipersensibilidad · ERC y su hueso/anemia ·
cálculos · congénitas (Potter, PKD) · carcinoma renal y de vejiga.

### (d) Fuentes
Vídeos ✅: [High Yield Renal](https://www.youtube.com/watch?v=zeM8dMiRsJQ) ·
[High Yield Renal Part 2](https://www.youtube.com/watch?v=CIIMMIvrRso) ·
*High Yield Surgery: LFTs & Renal* (isquemia por presión, rabdomiólisis).
Artículos ✅ (URLs conservadas de la v2):
[Alveolar Gas Equation ↔ Diuretics](https://www.yousmle.com/alveolar-gas-equation-for-the-usmle-step-1-diuretics-you-probably-wont-guess-the-connection/) ·
[Top Physiology Textbooks (Costanzo)](https://www.yousmle.com/top-physiology-textbooks-for-medical-students/) ·
[How to Review USMLE Questions for 20-30+ Points](https://www.youtube.com/watch?v=faCaXnY1c9U) ·
[High-Yield Renal — The Match Guy](https://thematchguy.com/usmle-step-1-high-yield-renal-concepts/) ·
[Acid-Base — Blueprint](https://blog.blueprintprep.com/medical/now-thats-what-i-call-high-yield-acid-base-physiology/).

### (e) Tarjetas Anki modelo (literales del corpus)
· *"Furosemide – use countercurrent multiplication to explain the tubular osmolarity in the PCT, DCT
and collecting duct and why it rarely causes hyponatremia."*
· *"Urine specific gravity 1.010 – use protein-free plasma density to explain isosthenuria and
intrarenal AKI."*
· *"Barbiturate overdose with creatinine 4.7 – use pressure ischemia to explain the rhabdomyolysis."*
· *"Goodpasture vs PSGN vs Wegener – use hypersensitivity types to explain linear, lumpy-bumpy and
pauci-immune immunofluorescence."*

### (f) → En tu plan
**D23 = mar 13-oct (N1)** · **D24 = mié 14-oct (N1)** · **D25 = jue 15-oct (N2)** ·
**D26 = vie 16-oct (N3 · 20Q del sistema completo timed)** · **D27 = lun 19-oct (N2)** ·
**D28 = mar 20-oct (N2)**. El bloque **no está partido por ningún hito**: es la primera oportunidad
de hacer un sistema entero seguido y llegar al viernes con el gate de nivel 3 (que en v5.9 cae en
ácido-base, no en glomerulares ni en AKI). La contracorriente (D24) y la
densidad ×30 (D25) son los dos automatismos que hay que salir teniendo.

---

## 6. Gastroenterología e hígado

**→ En tu plan: D29 · D30 · D32 (mié 21-oct → lun 26-oct) + D33-D36 (mar 27-oct → vie 30-oct).**
En medio, **D31 = NBME 26 (vie 23-oct)**. Niveles: D29 N1 · D30 N1 · D32 N2 · D33 N2 · D34 N2 ·
D35 N2 · D36 N2. Contenido: fisiología GI (D29) · esófago y estómago (D30) · intestino delgado,
malabsorción y EII (D32) · colon, pólipos y CCR (D33) · hígado I: LFTs, bilirrubina, hepatitis (D34) ·
hígado II: cirrosis y hereditarias (D35) · biliar y páncreas (D36). Vídeos:
[High Yield GI](https://www.youtube.com/watch?v=8gfhX1aR9-A) (D29) ·
[High Yield GI Part 2](https://www.youtube.com/watch?v=E2sE4E6s9B8) (D32).

### (a) Concepto ancla y cadena causal
> *"GI is more predictable than any other Step 1 subject if you know what to look for. Most students
> memorize diseases instead of learning **where pain localizes, what LFT patterns mean, and what
> actually triggers nausea**."* ✅
**Tres habilidades y nada más**: (1) localizar el dolor, (2) leer las LFTs, (3) entender la náusea.
Y una instrucción de ritmo ✅: ***"Slow is fast"*** — leer la viñeta **una sola vez, despacio**.

**La náusea explicada por mecanismo** ✅:
```
Tubo intestinal + sus CUATRO YEMAS (páncreas, hígado, vesícula, apéndice):
   OBSTRUCCIÓN (presión sobre mecanorreceptores) · INFLAMACIÓN (las prostaglandinas sensibilizan
   nervios y receptores) · TOXINA
   → aferentes vagales / espinales → náusea
   (aporte de un alumno desde UWorld: distensión → serotonina mucosa → receptores 5-HT3 → centro
   del vómito)
⇒ Por eso apendicitis, hepatitis, esofagitis y pancreatitis dan náusea.
⇒ La ausencia de náusea NO descarta, y no toda náusea es GI.
```

### (b) Subtema a subtema

**6.1 Bilirrubina y anillos de porfirina ("chemistry for MDs")** ✅
· El **hemo** (4 por hemoglobina) se degrada en el **bazo** → **bilirrubina**, muy **NO POLAR**.
**"Likes dissolve likes"**: lo no polar no se disuelve en agua **pero cruza membranas y se absorbe en
el intestino** (por eso el urobilinógeno vuelve a la sangre; la morfina, polar, se absorbe mal por
vía oral; el fentanilo, no polar, sirve en parches).
· **Los anillos de porfirina absorben luz visible por sus dobles enlaces conjugados** ✅ →
hemo **rojo**, bilirrubina **amarilla**, **estercobilina marrón** (heces), **urobilina amarilla**
(orina), **mieloperoxidasa verde** (pus, esputo bacteriano), clorofila verde.
**Aplicación** ✅: preguntar el color del esputo — verde/amarillo = neutrófilos = **bacteriano**;
claro = **viral** (§4.14).
· **Edad de los moratones (maltrato)** ✅: hematomas de distinta edad = distinto color → **no pudieron
ocurrir en la misma caída**. En TC, la sangre fresca es más densa: **epidural (arterial, agudo) más
blanco** que **subdural (subagudo, hierro reabsorbido)** (→ §8.10).
· **Conjugación** ✅: la UDP-glucuronil-transferasa une **ácido glucurónico (polar)** → bilirrubina
directa, hidrosoluble, **para poder DEFECARLA, no orinarla**: ya no se reabsorbe en el intestino.
· **Directa vs indirecta** ✅: **directa** = medida directamente con reactivo diazo; **indirecta** =
total − directa (no se mide; de ahí el nombre).
· **La regla del color de la orina** ✅: la **indirecta NO oscurece la orina** (va unida a albúmina, no
se filtra); la **directa SÍ** (orina "té"). **Obstrucción completa del colédoco**: heces color arcilla
(sin estercobilina) + orina oscura. **Hemólisis** = orina roja **por hemo**, no por bilirrubina.
· **Vía biliar** ✅: intrahepática = conductos hepáticos derecho e izquierdo; extrahepática = el resto.
**PBC** (colangitis biliar primaria) = intrahepática, autoinmune, mujer de mediana edad; **PSC** =
intra **Y** extrahepática.
· **Gilbert** ✅: actividad basal baja de UDP-GT; el **estrés** (ayuno, examen, GI viral) la baja más →
**hiperbilirrubinemia indirecta AISLADA** (AST/ALT/ALP normales). Ictericia visible con bilirrubina
≥ ~2,5. **Crigler-Najjar** = ausencia casi total, neonatal.
· **VIÑETA literal** ✅: **15 años**, náusea/vómito 2 días tras un *potluck* escolar (compañeros con lo
mismo = alimentario), vitales normales, ictericia escleral leve; **T-bili 3,5 · D-bili 0,3 · ALP 40 ·
AST 20 · ALT 21** → **Gilbert desenmascarado por el estrés**. Él mismo admite que debió incluir la
hemoglobina para descartar hemólisis.

**6.2 "Liver function tests": un nombre equivocado** ✅ — la joya del bloque
· **Panel estándar**: bilirrubina (total/directa), AST, ALT, ALP (la GGT no es estándar).
· **AST/ALT viven DENTRO de las células** → en suero solo si la célula se rompe → "globo que se
pincha" → **marcador de DAÑO**, igual que troponina/CK/LDH. Niveles normales = recambio basal; muy
altos = hepatitis grave, shock liver, paracetamol.
· **ALP** ✅: **hígado** (hepatocitos que miran al canalículo, no el epitelio ductal), **hueso**
(formación: Paget, osteomalacia, fracturas, niños en crecimiento, **metástasis prostáticas
blásticas**), **placenta** (1er trimestre). Función: destruye **pirofosfato** (inhibidor de la
mineralización) — "un doble negativo"; en el hígado *"nadie sabe qué hace"*.
**En colestasis sube por AUMENTO DE SÍNTESIS, no por fuga** ✅ → por eso no sube en proporción con
AST/ALT en la hepatitis. **ALP alta → pedir GGT** para distinguir hígado de hueso/placenta.
· **ERROR** ✅: creer que la ALP sube por fuga celular. Y **ERROR** ✅: llamar "función hepática" a
AST/ALT.
· **La función sintética real = PT/INR y albúmina** ✅:
```
Factor VII: vida media 3-6 h → en ~1 día (5 vidas medias) casi cero → EL PT SUBE PRIMERO
Albúmina  : vida media ~18-20 días → 5 vidas medias ≈ 100 días
⇒ FALLO AGUDO  : PT alto, ALBÚMINA NORMAL
⇒ FALLO CRÓNICO: ambos alterados
```
(Corregido en directo en HY GI 2: **PT, no PTT**.)

**6.3 Patrones: prehepático / intrahepático / posthepático y el factor R** ✅
· Analogía con prerrenal/intra/posrrenal *"funciona el 90 % de las veces"* (Gilbert es un problema
hepático que parece prehepático).

| | pre | intra | post |
|---|---|---|---|
| **% directa** | < 20 % | ~50 % | > 50-80 % |
| **Orina oscura** | no | algo | **sí** |
| **AST/ALT** | ≈ 0 | **muy alta** | algo (por estasis) |
| **ALP** | ≈ 0 | intermedia | **muy alta** |

"Infiltrativo" = **solo ALP**.
· **Factor R** ✅ = (ALT/ULN_ALT)/(ALP/ULN_ALP); para el USMLE ULN ALT 20 y ALP 70 → **R ≈ (ALT/ALP) ×
3,5**; **> 5 hepatocelular · < 2 colestásico · 2-5 mixto**. Él no lo usa (*"I just eyeball it"*), lo
enseña porque es comunicable. Ej.: ALT 900 / ALP 300 → ~10 → hepatocelular.
· **VIÑETA hepatitis A (literal)** ✅: **25 años**, 1 semana de fatiga/náusea, 2 días de ictericia,
trabaja en un restaurante (fecal-oral), 37,8 °C, hígado grande **no doloroso**, sin arañas ni
ascitis; **T-bili 6,2 · D 2,8-3,8 · ALP 200 · AST 1221 · ALT 1349 · PT y albúmina NORMALES**;
**IgM anti-VHA +, IgG −; anti-HBs +, anti-HBc −, HBsAg −** → hepatitis A aguda con función sintética
intacta. **Serología** ✅: **anti-HBs sin anti-HBc = VACUNADO** (la vacuna es antígeno de superficie
sin core); anti-HBs **+** anti-HBc con HBsAg − = infección **aclarada**.
· **VIÑETA colangitis ascendente** ✅: ALP muy alta, AST/ALT leves, directa ~80 %, **leucocitos
22 000**, **colédoco dilatado** (si la piedra estuviera en el cístico no se dilata) → piedra en el
colédoco → sube la presión → **isquemia por presión** → translocación bacteriana → infección
ascendente → bacteriemia. **ERROR** ✅: **descartar colangitis por un PT normal**.
· **Prurito colestásico = SALES BILIARES** ✅ (emulsifican grasa en la piel), no la bilirrubina — igual
que la uremia no es "por el BUN".

**6.4 Colecistitis vs cólico biliar, imagen y criterios de Tokio** ✅
· **Etimología** ✅: chole = bilis, cyst = vejiga, -itis = inflamación; el cólico biliar no tiene
"-itis" (y no es un cólico verdadero: **dolor constante de 1-2 h**).
```
CÓLICO        = piedra que se atasca en el cístico y SE SUELTA
COLECISTITIS  = piedra que NO se suelta → la vesícula sigue contrayéndose → sube la presión
   → ISQUEMIA POR PRESIÓN (capilar ~20-30 mmHg) → primero se comprimen las VENAS
   → sube la presión hidrostática capilar → EDEMA (días 2-4) → luego NECROSIS (3-5)
   ⇒ por eso se opera en 72 h; la barrera epitelial dañada deja pasar bacterias de la bilis
Vesícula de porcelana = calcificación DISTRÓFICA por inflamación crónica (meses)
```
· **5 F** ✅: fat, female, fertile, family history, fair (*el "forty" ya no se sostiene: la obesidad
adelanta la edad*).
· **Dolor referido al hombro** ✅: el frénico C3-5 comparte dermatomas con el hombro.
· **Ecografía = sonar** ✅ (tiempo de ida y vuelta); **"el enemigo del ultrasonido es el aire"** (por
eso el gel y la vejiga llena, y por eso **el páncreas se ve por TC**: estómago e intestino tienen
aire). El obeso (IMC 42) se ve mal porque la grasa **aleja** el objetivo.
· **HIDA / colescintigrafía** ✅: trazador IV que el hígado excreta a la bilis; **a los 60 min debe
verse la vesícula**; **no se ve si el cístico está obstruido** (colecistitis calculosa > 90 %); sí se
vería en la acalculosa. *Mismo principio que el yodo tiroideo o el sestamibi: "un solo concepto".*
· **Criterios de Tokio** ✅: (A) inflamación local (**Murphy**: tu mano bajo el reborde, el paciente
inspira y la vesícula inflamada desciende), (B) sistémica (fiebre, PCR, leucocitosis), (C) imagen.
**A+B = sospecha; A+B+C = definitivo** (sensibilidad 91 %, especificidad 97 %). No se preguntan
literalmente, pero **los redactores deben "cubrir las respuestas"** dando datos suficientes.
· **VIÑETA literal** ✅: **36 años** G3P3, 8 h de dolor en CSD + náusea/vómito, episodios previos
post-grasa de 1-2 h, dolor de hombro derecho, antecedentes familiares, **38,2 °C**, 138/85, FC 95,
**IMC 42**, Murphy +; **T-bili 0,5 · ALP 65 · AST/ALT 25 · amilasa 75 · Hb 14,2 · leucocitos 12 700
(85 % neutrófilos) · PT 13/INR 1 · albúmina 4**; eco que no visualiza; **HIDA sin vesícula a 60 min**
→ colecistitis aguda definitiva. **Las LFTs son normales porque el problema es la vesícula, no el
hígado.**

**6.5 EII, IBS y tenesmo** ✅
· **EII**: inflamación crónica → **hipersensibilidad a la distensión** (la distensión es la señal de
peristalsis: fibra insoluble) → **tenesmo** (poco volumen se siente como mucho) y diarrea.
· **IBS**: el 90 % tiene **hipersensibilidad mecánica**; la sensibilización **persiste tras la
inflamación** — como la urgencia vesical tras una cistitis.
· **Diverticulitis por severidad** ✅ (HY Surgery): **mismo diagnóstico, distinto manejo** — estable →
NPO, fluidos, antibióticos; shock (PA baja tras 2 L, FC > PAS, oliguria, confusión) → quirófano.
**ERROR** ✅: memorizar "diverticulitis = antibióticos" sin mirar la severidad.

**6.6 ERGE con ΔP = Flujo × R** ✅ (Art. *The Most Useful USMLE Equation Ever*)
Hernia hiatal **baja la resistencia**; obesidad **sube P1** abdominal; hipersecreción, vaciamiento
lento y comidas copiosas **suben el volumen/P1**; tratamiento: **perder peso** (baja P1) y **elevar la
cabecera** (sube R: "reflujo cuesta arriba").

**6.7 GI adicional (fuentes reales citadas; no verificado línea a línea)** ⚠
· **Encefalopatía hepática**: NH3 colónico (pequeño, neutro) → porta → sin hígado cruza la BHE →
astrocitos → consume alfa-cetoglutarato → **el TCA se detiene** → edema, asterixis; **lactulosa = ion
trapping** (§5.1).
· **Pancreatitis crónica → diabetes con glucagón cero** (*"the pancreas ate itself"*).
· **Pancreatitis aguda → saponificación**: lipasa → ácidos grasos + Ca → jabones = **calcificación
distrófica** → **hipocalcemia de mal pronóstico**.
· **Cáncer de páncreas**: **mucina** que actúa como factor tisular → **Trousseau / TVP no provocada**
(+ tabaco = 2 de 3 de Virchow); invasión de vasos mesentéricos superiores = irresecable.
· **Celíaca con serología IgA negativa = déficit selectivo de IgA** → pedir **IgG anti-tTG/DGP**.
· **CCR**: el tumor crece más que su irrigación → necrosis → sangrado crónico → **varón o
posmenopáusica con ferropenia = cáncer de colon hasta demostrar lo contrario** (aunque digan que es
vegano).
· **Intususcepción en adulto**: *lead point* por adherencias/pólipo/tumor; "target sign".
· **Disfagia a sólidos Y líquidos → trastorno motor (acalasia)**.
· **Apendicitis**: obstrucción (fecalito/hiperplasia linfoide) → presión > capilar → isquemia →
aferentes → **vómito precoz antes de que el dolor migre**.

### (c) High-yield del bloque
Bilirrubina y síndromes hereditarios (Gilbert, Crigler-Najjar, Dubin-Johnson vs Rotor) · patrón de
LFTs y factor R · función sintética (PT y albúmina por vidas medias) · fisiología secretora
(Zollinger-Ellison, bomba H+/K+) · hígado alcohólico y cirrosis (AST>ALT 2:1, hipertensión portal) ·
depósito (hemocromatosis, Wilson) · PBC vs PSC · Crohn vs CU · vía adenoma-carcinoma (APC→KRAS→p53) ·
malabsorción · páncreas y vía biliar (lipasa >3x, Courvoisier, Charcot) · embriología GI pediátrica ·
diarreas infecciosas · farmacología GI · esófago · úlcera gástrica vs duodenal (*H. pylori* antral →
menos somatostatina → más gastrina → úlcera duodenal que **MEJORA con la comida**).

> ❌ **Vacío grande del corpus en GI**: gastrina/secretina/CCK/somatostatina, bomba de protones,
> úlcera/*H. pylori*/Zollinger-Ellison, acalasia en detalle, Barrett, Mallory-Weiss/Boerhaave,
> ascitis/SAAG, varices, síndrome hepatorrenal, hepatocarcinoma, hepatitis alcohólica (AST:ALT),
> NAFLD, hemocromatosis, Wilson, déficit de A1AT, Whipple, insuficiencia pancreática, lactosa,
> diarrea osmótica vs secretora, S. bovis/FAP/Lynch, isquemia mesentérica, obstrucción intestinal.
> **Todo eso va con First Aid + UWorld aplicando el método.** Lo que sí aporta Palmerton en GI es el
> **marco de LFTs, bilirrubina, náusea y presión/isquemia**, que es exactamente lo que más se falla.

### (d) Fuentes
Vídeos ✅: [High Yield GI](https://www.youtube.com/watch?v=8gfhX1aR9-A) ·
[High Yield GI Part 2](https://www.youtube.com/watch?v=E2sE4E6s9B8) ·
*High Yield Surgery: LFTs & Renal*.
Artículos ✅ (URLs conservadas de la v2): [UWorld + Anki: 5 Ways](https://www.yousmle.com/uworld-explanations-anki/) ·
[Digoxin / Trousseau cheat sheet](https://www.yousmle.com/usmle-step-1-bosses-digoxin-reversible-cell-damage-trousseaus-sign/) ·
[The Most Useful USMLE Equation Ever (ERGE)](https://www.yousmle.com/usmle-step-1-cheat-sheets/) ·
[High-Yield GI — The Match Guy](https://thematchguy.com/usmle-step-1-high-yield-gastrointestinal-concepts/).

### (e) Tarjetas Anki modelo (literales del corpus)
· *"Gilbert syndrome – use UDP-glucuronyl transferase and bilirubin polarity to explain the LFTs and
the urine color."*
· *"Acute vs chronic liver failure – use factor VII and albumin half-lives to explain PT and albumin."*
· *"HIDA scan – use cystic duct obstruction to explain why the gallbladder is not visualized in acute
cholecystitis."*

### (f) → En tu plan
**D29 = mié 21-oct (N1)** · **D30 = jue 22-oct (N1)** · **D32 = lun 26-oct (N2)** ·
**D31 = vie 23-oct → NBME 26 (N5 · 200Q)** · **D33 = mar 27-oct (N2)** · **D34 = mié 28-oct (N2)** ·
**D35 = jue 29-oct (N2)** · **D36 = vie 30-oct (N3 · 20Q del sistema completo timed — el gate real
de GI, sobre biliar/páncreas; en v5.9 GI estrena viernes de nivel 3)**.
El bloque de **hígado (D34-D36) cae DESPUÉS del NBME 26**: llega al hito con la fisiología y el
intestino validados, y usa los fallos de LFTs del NBME como shopping list para D34.

---

## 7. Endocrinología

**→ En tu plan: D37-D41 = lun 2-nov-2026 → vie 6-nov-2026.**
Niveles: D37 N1 · D38 N1 · D39 N2 · D40 N2 · **D41 N3** (viernes de sistema completo). Contenido: ejes hipotálamo-hipófisis y feedback
1º/2º/3º (D37) · tiroides completa (D38) · suprarrenal (D39) · DM 1 y 2 + CAD/HHS + tratamiento
(D40) · calcio/PTH + MEN + hipófisis (D41).
Vídeo: [High Yield Endocrinology](https://www.youtube.com/watch?v=oQ8PSvInTgM) (D37).

### (a) Concepto ancla y cadena causal
> *"There's really only one skill that you need to understand about endocrinology: **feedback
> inhibition**. The hormone is going to suppress the hypothalamus and the pituitary."* ✅
```
Hipotálamo → hormona liberadora (TRH) → hipófisis anterior → hormona estimulante (TSH)
   → órgano final (tiroides, corteza suprarrenal) → hormona activa, que INHIBE hacia arriba
Terminología ESPECÍFICA de endocrino (no es el "secundario a" del lenguaje clínico general):
   PRIMARIO = órgano final · SECUNDARIO = hipófisis · TERCIARIO = hipotálamo
```
· **El doble negativo que hay que decir en voz alta** ✅: en el hipotiroidismo primario hay menos T3/T4
→ *"suppressing the pituitary LESS, in other words **disinhibiting** it"* → TSH y TRH suben. **No es
"lo de arriba sube porque sí": hay que decir el mecanismo.**

| Cuadro | T3/T4 | TSH | TRH |
|---|---|---|---|
| Hipotiroidismo **primario** | baja | **sube** | sube |
| Hipotiroidismo **secundario** (hipófisis rota) | baja | **baja** | sube (se desinhibe pero la hipófisis no responde) |
| Hipotiroidismo **terciario** | baja | baja | **baja** — *"the TRH wins"* |
| Hipertiroidismo **primario** | sube | baja | baja |
| Hipertiroidismo **terciario** | sube | sube | sube (todo alto) |

· **PREGUNTA TÍPICA** ✅: *"They won't ask 'what is the definition of primary hypothyroidism', but they
DO ask what you'd expect for TSH and TRH in primary hypothyroidism."* — pregunta que *"a lot of people
get wrong… it's free points"*.
· **Trampa del gancho del vídeo** ✅: *"the exam shows a normal TSH in a patient who looks clearly
hypothyroid and the diagnosis somehow gets ruled out"* → **mirar el PAR de hormonas, no una sola**.
· **ERRORES** ✅: memorizar tablas de flechas (cuando el escenario es atípico, el memorizador se
bloquea) · confundir "secundario" endocrino con "secundario a X" del lenguaje clínico.
· **Y la excepción que rompe el eje** ✅: **la aldosterona NO depende de ACTH** — la regulan
angiotensina II y potasio. *"Aldosterone is not under the effect of pituitary hormones."*

### (b) Subtema a subtema

**7.1 VIÑETA MAESTRA — el panhipopituitarismo leído frase a frase** ✅ (Art. *USMLE 240+: How to
Improve Your Score Without Cramming More Facts*)
> Hombre de **39 años**, **6 meses** de fatiga y debilidad progresivas, menos apetito, menos libido,
> disfunción eréctil, intolerancia al frío; **cefalea sorda constante en aumento**. T 37 °C,
> **FC 55**, **PA 99/70**, FR 15. Piel seca y pálida. **Na 131**, **glucosa 56**. Leucocitos 6 000:
> neutrófilos 45 %, **linfocitos 40 %**, **eosinófilos 10 %**, Hb 12, plaquetas 150 000.
> *Pregunta: ¿cortisol, ACTH y aldosterona?*
```
Lectura oración por oración:
   anorexia/energía = inespecífico · libido y DE = hormonas sexuales bajas · intolerancia al frío =
   hipotiroidismo
   "a worsening dull headache… THIS IS THE SENTENCE BY WHICH YOU SHOULD HAVE KNOWN THE DIAGNOSIS"
   → masa hipofisaria (prolactinoma) que comprime la adenohipófisis → ACTH, TSH, FSH/LH bajos
   PA baja = insuficiencia suprarrenal · piel seca = hipotiroidismo · Na y glucosa bajos = ambos
   LINFOCITOS y EOSINÓFILOS ALTOS porque el cortisol normalmente induce su apoptosis
     → sin cortisol sobreviven más
RESPUESTA (insuficiencia suprarrenal SECUNDARIA): cortisol BAJO · ACTH BAJA · ALDOSTERONA NORMAL
```
> *"If you don't know the diagnosis by the third sentence, the rest of the vignette won't help."* ✅

**7.2 Tiroides** ✅
· **Síntesis**: *"What are the two major things you need to make thyroid hormone? **Tyrosine and
iodine.** That's essentially it."* La **tiroglobulina** es una proteína larguísima con **134
tirosinas** ("crazy") exocitada al coloide; se yodan (MIT, DIT) y se acoplan: **DIT + DIT = T4;
MIT + DIT = T3** (*"literally, one iodine plus two iodines makes three"*). La TSH estimula la
endocitosis del coloide y la proteólisis.
· **Extracto de First Aid que usa como "first-pass approximation"** ✅: *"Functions of thyroid
peroxidase include oxidation, organification of iodide and coupling of MIT and DIT. Inhibited by PTU
and methimazole."* → *"what could be an hour lecture is condensed to 4 lines"*.
· **Receptor INTRACELULAR (nuclear)** ✅ porque la tirosina yodada es **no polar** → cruza membranas.
**Regla general**: polares (insulina, catecolaminas) → receptor de superficie; **no polares
(esteroides, tiroidea) → receptor intracelular**.
**Analogía memorable** ✅: la grasa del tocino que la gente tira por el fregadero precipita y forma
*"fatbergs del tamaño de una persona"* en las cloacas → *"cholesterol is non-polar… crosses membranes
AND clogs your pipes"*.
· **T3 activa, T4 prohormona** ✅ (conversión periférica).
· **Hipertiroidismo vs tirotoxicosis — el error clásico** ✅:
```
HIPERTIROIDISMO = hormona alta por SOBREPRODUCCIÓN glandular
TIROTOXICOSIS   = hormona alta por CUALQUIER causa (exógena, tiroiditis)
"Hyperthyroidism is a type of thyrotoxicosis."
```
Anécdota ✅: un profesor senior de Stanford *"swore up and down"* que eran sinónimos y no supo
responder.
· **Tiroiditis bifásica** ✅: a diferencia de otros órganos, la tiroides **almacena** una cantidad
enorme de hormona en el coloide. La inflamación **depleta el coloide** (*"look at a histology of
Hashimoto's: the colloid looks raggedy, all gone"*) y libera hormona preformada.
```
FASE TEMPRANA: T3/T4 altos → TSH baja, TRH baja (tirotoxicosis)
FASE TARDÍA  : la hormona liberada se degradó y NO se repuso (la TSH estuvo baja)
               → T3/T4 bajos → desinhibición → TSH y TRH altas
"This is the kind of rationale you need to do on the spot on your test."
```
· **RAIU — la pregunta que "love to test on Step 1"** ✅: solo la tiroides usa yodo; si está
sintetizando, capta. Lámina de 5 paneles: **A normal · B Graves (captación difusa aumentada) ·
C bocio multinodular tóxico (nódulos calientes y el resto MÁS claro de lo normal, porque los nódulos
autónomos suprimen la TSH) · D adenoma tóxico (un nódulo caliente, resto apagado) · E tiroiditis
(captación mínima, "hazy outlines")**.
```
Graves vs tiroiditis subaguda vs hormona exógena: LABORATORIO INICIAL IDÉNTICO (T3/T4 altos, TSH y
TRH bajas). SOLO la RAIU separa: Graves ALTA (la TSI estimula síntesis); tiroiditis y exógena BAJAS
```
· **TSI** ✅ (duda de alumno resuelta): no estimula la TSH; es un anticuerpo contra el **receptor** de
TSH que lo activa — *"a weird antibody: normally antibodies block, this one makes the receptor work"*.
· **Proptosis en Graves** ✅ (Art. *How I Improved My USMLE Step 1 60 Points in 2 Months*): los
**fibroblastos retro-orbitarios expresan receptor de TSH** → glucosaminoglicanos → inflamación →
fibrosis + edema → **proptosis**.
· **Ablación con yodo radiactivo** ✅: mecanismo "Caballo de Troya" (entra por el simportador Na/I) →
después **levotiroxina de por vida**. Instrucción previa: **evitar sal yodada / yodo dietético**
porque **compite** por el NIS ("competitive inhibitors of each other") — misma lógica que el **KI en
Fukushima 2011**.
· ❌ **NO está**: tiroglobulina sérica para separar tiroiditis de tirotoxicosis facticia (NotebookLM
lo afirmó sin cita). Hipotiroidismo subclínico: él mismo admite que no lo domina y lo deja pendiente.

**7.3 Diabetes mellitus** ✅
· **Definición operacional**: *"it's just high blood sugar"* — ayunas > 126 ×2, no ayunas > 200 varias
veces, o A1c por encima del corte (**6,5 %** 🔎 la transcripción dice "615": A VERIFICAR el literal).
· **Patogenia** ✅: tipo 1 = destrucción autoinmune → deficiencia. Tipo 2 = **resistencia →
SOBREproducción de insulina** al inicio: *"you'd never think of type 2 as making MORE insulin than
normal, but that's what you see; **pre-diabetes is probably where insulin production is highest**"* →
**amilina** cosecretada → **amiloide** (§1.6) → disfunción de la célula beta → deficiencia relativa.
· **Fármacos razonados** ✅:
```
METFORMINA (1ª línea): baja la gluconeogénesis hepática. NO aumenta la insulina → no acelera el
   decaimiento de los islotes ("theoretically might even slow progression") y NO ENGORDA
SULFONILUREAS (2ª línea): cierran el canal K-ATP → la beta se DESPOLARIZA (no "se hace más negativa")
   → entra Ca2+ por canales dependientes de VOLTAJE (no por gradiente) → fusión vesicular vía
   SNARE/SNAP (las mismas proteínas que cliva la toxina botulínica) → insulina
   → fuerzan MÁS insulina Y MÁS amilina → MÁS amiloide
   FRASE: "like flogging a dying pancreas… beating a dying horse to make it go faster;
           it doesn't end well"
INSULINA EXÓGENA (3ª línea): "the horse is kind of dead by the time you're using insulin"
```
· **Por qué la insulina engorda** ✅: bloquea la **lipasa sensible a hormonas** y activa la
**acetil-CoA carboxilasa** → *"insulin causes you to not break down fat and to make fat"* (base de
las dietas keto/Atkins).
· **Cetoacidosis diabética** ✅ (HY Peds 2):
```
Por qué acidosis: LOS CUERPOS CETÓNICOS SON ÁCIDOS (acetoacetato = ácido acetoacético sin el protón)
Por qué casi exclusiva de DM1: sin insulina "your cells aren't seeing the glucose" → el glucagón
   "goes crazy" → lipólisis (HSL) → cetogénesis. En DM2 queda algo de insulina que la frena
POTASIO TOTAL BAJO por diuresis osmótica (la reabsorción de glucosa "tops out around 200-ish";
   por encima, la glucosa arrastra agua y otros solutos = "solvent drag")
POTASIO SÉRICO normal/alto: (1) hiperosmolaridad → sale agua de la célula y arrastra K+;
   (2) sin insulina la Na/K-ATPasa no mete K+; (3) acidosis
   "All of these things are just partial explanations"
```
· **La hiponatremia de la CAD es DILUCIONAL (pseudohiponatremia)** ✅: el agua libre sale de la célula
al plasma hipertónico y diluye el Na. **NO es hipotónica → se corrige tratando la CAD con insulina, no
con suero**; la regla "corregir a 1 mEq/h" no aplica y **no hay riesgo de mielinolisis** porque la
osmolaridad sérica calculada está ALTA.
> *"Someone comes in with DKA and sodium 120 → insulin; someone with SIADH and sodium 120 → you don't
> give insulin. You treat these things very differently depending on the mechanism."* ✅
· **Hipotensión ortostática del diabético** ✅ (explicación de alumno validada): glucosilación no
enzimática de los vasos + **neuropatía autonómica** que impide la respuesta simpática → síncope
(§3.6). En el tubo digestivo, el parasimpático sin oposición → **diarrea crónica** sin causa aparente.

**7.4 Calcio, PTH y vitamina D** ✅ — segunda mitad de HY Endo
· **PTH**: sube el Ca sérico y baja el fosfato, por **tres vías**: sube la reabsorción renal de calcio,
baja la reabsorción de fosfato (túbulo proximal) y activa la **1-alfa-hidroxilasa** renal (*"it's
called 1 because it adds the OH to carbon 1 of 25-OH-vitamina D"*). Resorción ósea: **NO actúa
directamente sobre osteoclastos** sino sobre los **osteoblastos, que liberan RANK-ligando**.
· **Magnesio** ✅: la hipomagnesemia leve sube la PTH, pero la **hipomagnesemia severa (alcohólicos)
BAJA la PTH** y mimetiza un hipoparatiroidismo — *"weird, I couldn't find the mechanism, but it does
show up in tests"*.
· **Vida media de minutos** ✅: el calcio fija el **umbral** de despolarización (§3.5) → control muy
fino → hormona de vida corta. Aplicación: **PTH intraoperatoria** en la paratiroidectomía (cae en
minutos si se extirpó el adenoma correcto). Tras tiroidectomía se pregunta por **parestesias
periorales**.
· **Continua vs pulsátil — "el patrón puede tener el efecto exactamente opuesto"** ✅:
```
PTH CONTINUA (hiperparatiroidismo) = pérdida ósea neta
PTH PULSÁTIL = crecimiento óseo neto → análogo de PTH para osteoporosis severa
   (de los pocos fármacos que FORMAN hueso; bifosfonatos y denosumab solo frenan osteoclastos)
Analogía con GnRH/LEUPROLIDE: continua suprime FSH/LH (cáncer de próstata testosterona-dependiente:
   apoptosis al quitar el factor de crecimiento); PULSÁTIL → se usa en infertilidad
```
· **Vitamina D** ✅: hormona esteroidea (afecta transcripción). Piel + UV → hígado **25-hidroxilasa** →
riñón (TCP) **1-alfa-hidroxilasa**, regulada por PTH. Efecto: **sube la absorción intestinal de Ca Y
de fosfato** (*"they like to test this"*). **Liposoluble** → se puede dar **50 000 UI/semana × 8
semanas** (≈50× la dosis habitual), a diferencia de la vitamina C hidrosoluble *"that you pee out"*.
**Se mide la 25-OH** (forma de depósito); la 1,25 solo tendría sentido para probar un déficit de
1-alfa-hidroxilasa. Para Step 1: **prevención de osteoporosis = vitamina D + ejercicio con carga**; el
cortisol es malo para el hueso.
· **Calcio alto con PTH baja** ✅: metástasis osteolíticas · **PTHrP** (activa el receptor de PTH; el
ensayo de PTH **no** lo detecta) del **carcinoma escamoso de pulmón** y del cáncer de mama · mieloma ·
sarcoidosis/hipervitaminosis D.
· **La gráfica PTH (Y) vs Ca (X), leyendo primero los ejes** ✅ — habilidad que *"schools are really bad
at teaching"*:

| Cuadrante | Significado |
|---|---|
| **Arriba-izquierda** (PTH alta, Ca bajo/normal) | hiperparatiroidismo **secundario**: ERC, déficit de vitamina D, baja ingesta de calcio |
| **Arriba-derecha** (PTH alta, Ca alto) | **primario**: adenoma, hiperplasia |
| **Abajo-izquierda** (PTH baja, Ca bajo) | hipoparatiroidismo primario: DiGeorge, extirpación quirúrgica |
| **Abajo-derecha** (PTH baja, Ca alto) | **PTHrP**, metástasis osteolíticas, mieloma, sarcoidosis, ingesta alta de calcio |

· **Kahneman aplicado** ✅: el cerebro asociativo rápido propone (PTHrP) pero **no verifica** →
obligarse a recorrer el mecanismo (PTHrP → Ca alto → PTH baja → cuadrante inferior derecho).
· **ERC → hiperparatiroidismo secundario, con el matiz del fosfato** ✅: baja la 1-alfa-hidroxilasa →
baja la vitamina D → baja el Ca → PTH alta; **fosfato ALTO** (normalmente la PTH lo baja, pero el
riñón que falla no puede excretarlo). *"That's the key to remember."*
· **Cinacalcet** ✅: aumenta la sensibilidad del sensor de calcio → la paratiroides "cree" que hay más
calcio → baja la PTH.
· **Pseudohipoparatiroidismo** ✅: el riñón no responde a la PTH → PTH alta con calcio bajo.
· **1-alfa-hidroxilasa extrarrenal en macrófagos EPITELIOIDES** ✅ (sarcoidosis, TB) → vitamina D
activa alta → hipercalcemia, hipercalciuria → **cálculos de calcio** (§2.2).

### (c) High-yield del bloque
DM1 vs DM2, CAD vs hiperosmolar · tiroides completo (síntesis, RAIU, tiroiditis bifásica, Graves) ·
1º vs 2º vs 3º en TODOS los ejes · suprarrenal (Cushing y su algoritmo, Addison, hiperaldosteronismo,
feocromocitoma, HSC) · calcio-PTH-vitamina D con el mapa de cuadrantes · hipófisis · ADH (DI central
vs nefrogénica vs SIADH) · MEN 1/2A/2B · farmacología endocrina.

> ❌ **Vacíos confirmados en endocrino**: **algoritmo de dexametasona** dosis baja/alta y Cushing
> hipofisario vs ectópico · hiperpigmentación por POMC/MSH en Addison · **feocromocitoma**
> (metanefrinas, alfa antes que beta) · **MEN 1/2A/2B y RET** · insulinoma/péptido C · acromegalia
> (GH-IGF-1) · **diabetes insípida central vs nefrogénica y prueba de restricción de agua** ·
> galactorrea por antipsicóticos · 17-alfa-hidroxilasa y la regla mnemotécnica de la HSC.
> **Todo con First Aid + UWorld.** (Sí está, como ejemplo de tarjeta cloze de AnKing ✅: *"11β-hydroxylase
> deficiency presents with hypokalemia and hypertension due to increased mineralocorticoids; there is
> no salt wasting, which is seen with 21β-hydroxylase deficiency"*.)

### (d) Fuentes
Vídeos ✅: [High Yield Endocrinology](https://www.youtube.com/watch?v=oQ8PSvInTgM) ·
*Pediatrics Shelf Review* (endocrino pediátrico, 1º/2º/3º) · *High Yield Family Medicine Review*
(repite el bloque tiroideo) · *High Yield Nuclear Medicine* (RAIU, nódulo frío/caliente).
Artículos ✅ (URLs conservadas de la v2):
[High Yield Study Mastery (tiroides/tirosina)](https://www.yousmle.com/step-1-usmle-high-yield-study/) ·
[Top Endocrinology Textbooks](https://www.yousmle.com/top-endocrinology-textbooks-for-medical-students/) ·
[Improve Without Cramming (viñeta maestra)](https://www.yousmle.com/improve-usmle-without-cramming/) ·
[How to Make Hard USMLE Questions Easy](https://www.youtube.com/watch?v=OwsxvQPL8oc) ·
[High-Yield Endocrine — The Match Guy](https://thematchguy.com/usmle-step-1-high-yield-endocrine-concepts/).

### (e) → En tu plan
**D37 = lun 2-nov (N1)** · **D38 = mar 3-nov (N1)** · **D39 = mié 4-nov (N2)** ·
**D40 = jue 5-nov (N2)** · **D41 = vie 6-nov (N3 · 20Q del sistema completo timed — en v5.9 Endo
estrena viernes de nivel 3, sobre calcio/PTH/MEN/hipófisis)**. Bloque **sin hito en medio**. Ojo: el día del
calcio (**D41**) es el que conecta con Renal (ERC, §5.9), Inmuno (sarcoidosis, §2.2), Cardio (umbral y
Trousseau, §3.5) y MSK (**D70 · D72 · D73**): es el mejor candidato del plan para una **tarjeta PC única** que
una los cinco.

---

## 8. Neurología

**→ En tu plan: D42-D45 · D47 (lun 9-nov → lun 16-nov) + D48-D50 (mar 17-nov → jue 19-nov).**
En medio, **D46 = NBME 27 (vie 13-nov)**. Niveles: D42 N1 · D43 N1 · D44 · D45 · D47 N2 · D48-D50 N2.
Contenido: neuroanatomía localizadora y vías (D42) · médula espinal y Brown-Séquard (D43) · tronco,
pares craneales y reflejos (D44) · **SNA + fármacos autonómicos completo (D45)** · ictus por
territorios + hemorrágico + HSA (D47) · convulsiones y antiepilépticos (D48) · demencias, Parkinson y
movimientos (D49) · EM, meningitis, unión neuromuscular y tumores del SNC (D50). Vídeos:
[High Yield Neuro](https://www.youtube.com/watch?v=YIwfdc7E8TU) (D42) ·
[High Yield Neuro Part 2](https://www.youtube.com/watch?v=52xHDZJy2sw) (D44).

### (a) Concepto ancla y cadena causal
> *"Neuro destroys students who memorize; it rewards students who can pinpoint **where** the damage
> is. Neuro questions aren't asking WHAT disease this is, they're asking **WHERE** in the brain or
> spinal cord the problem is."* ✅ (HY Neuro 1)
> *"One change to a detail in a vignette and everything you memorized falls apart… **map the pathway,
> know where it crosses, predict exactly what the symptoms should be**."* ✅ (HY Neuro 2)

**Regla de asombro que usa como estándar** ✅: *"there is literally a myelinated tract from your finger
to your cortex and you can follow it"* — si puedes **cortar en cualquier punto y predecir qué se
pierde**, entiendes neuro. Lesiones medulares e ictus están **desproporcionadamente preguntados**.
**Definiciones que "nobody teaches"** ✅: **ganglio** = colección de somas en el **SNP** (ganglio de la
raíz dorsal) · **núcleo** = colección de somas en el **SNC** (casi todos en el tronco). Tronco de abajo
a arriba: bulbo, puente, mesencéfalo; arriba se une al **tálamo = estación de relevo** (todo lo
sensitivo sube hacia el tálamo, todo lo motor baja desde él).

### (b) Subtema a subtema

**8.1 Big Four (columnas dorsales / DCML): presión, vibración, tacto fino, propiocepción** ✅
```
1.ª neurona: soma en el GANGLIO DE LA RAÍZ DORSAL, pero "super long": desde la yema del dedo sube
   por fascículo GRÁCIL (pierna) / CUNEIFORME (brazo) hasta el núcleo grácil/cuneiforme EN EL BULBO
2.ª neurona: DECUSA EN EL BULBO, justo después del núcleo → VPL del tálamo
3.ª neurona: corteza sensitiva, GIRO POSTCENTRAL
```
· **Topografía** ✅: **piernas mediales, brazos laterales** — de pie con los brazos a los lados, las
piernas están más cerca de la línea media. Se conserva en cordones posteriores, cortezas sensitiva y
motora y **cerebelo (vermis = piernas/centro; hemisferios = manos/brazos)**. Mnemónico de alumno:
*"legs stand on the grass (gracilis)"*.
· **Homúnculo** ✅: corte coronal; dedos del pie y genitales **mediales**; pulgar, dedos y labios
grandes por densidad sensitiva. Mnemónico suyo: **alguien haciendo abdominales colgado del borde
medial de la corteza — las piernas cuelgan mediales, cara y brazos laterales**.
· **Aplicación a ictus** ✅: **ACA = pierna (sensitivo + motor) contralateral · MCA = cara + brazo**.
El corte exacto no importa: *"upper extremity, lower extremity, face"* es lo que preguntan.
· **Lenguaje** ✅: diestro → hemisferio izquierdo; afasia de Broca en diestro ≈ *"almost certain left
MCA stroke"* (*"I can't tell you why God did it this way"*). Zurdos: más bilateralidad.
· **Contexto clínico que sube el valor de localizar** ✅: la tPA sistémica en 3-4,5 h no exige
localizar; **la trombectomía dirigida por catéter sí** → el examen clínico localizador importa cada
vez más.
· **Hemisección izquierda → pérdida IPSILATERAL del Big Four** ✅ *"the left-sided information is still
on the left side of the cord; it hasn't decussated yet"*.

**8.2 Little Three (anterolateral / espinotalámico): dolor, temperatura, tacto grosero** ✅
```
1.ª neurona en el ganglio dorsal; 2.ª neurona EN LA MÉDULA (zona marginal / sustancia gelatinosa)
   → CRUZA POR LA COMISURA BLANCA ANTERIOR 1-2 NIVELES ARRIBA, justo delante del canal central
   → VPL → giro postcentral
```
> *"You MUST know that the ALS decussates in the SPINAL CORD, not in the brainstem like DCML."* ✅
> Y el aviso: *"ALS here is NOT amyotrophic lateral sclerosis (Lou Gehrig), which is motor-only."* ✅
· Hemisección izquierda → pérdida **CONTRALATERAL** del Little Three.
· **Siringomielia** ✅: la dilatación del canal central **comprime primero la comisura anterior** →
pérdida **bilateral** de dolor y temperatura **"en capa" (cape-like)** — *"picked up a hot pan and it
didn't hurt"*; respeta cordones posteriores salvo progresión; luego el **asta anterior** (motoneurona
inferior). Predomina en la **columna cervical** (por eso los brazos).
> *"Of all the tracts, this is the one where the exact trajectory matters most."* ✅

**8.3 Tracto corticoespinal lateral (movimiento voluntario)** ✅
```
Motoneurona superior en el GIRO PRECENTRAL
   → DECUSA EN LA UNIÓN BULBO-MEDULAR, ANTES de la 2.ª neurona
   → 2.ª neurona = ASTA ANTERIOR = MOTONEURONA INFERIOR
     ("First Aid says the second-order neuron is the LMN — it's the same thing")
```
Hemisección izquierda → debilidad **IPSILATERAL**. Observación de alumno que él acepta: **todo lo que
decusa en el tronco da pérdida ipsilateral en una hemisección medular** (*"technically true; not how
I'd remember it"*).

**8.4 Brown-Séquard como examen de comprensión** ✅
Hemisección izquierda → **IPSILATERAL**: Big Four + movimiento voluntario · **CONTRALATERAL**:
Little Three.
> *"It's not common in medicine nor on the boards, but **if you can explain Brown-Séquard you
> understand all the tracts and where they decussate**."* Tarea que manda: sentarse con el diagrama y
> explicar cada lado.
· **Truco de un alumno que él llama "very clever"** ✅: dibujar un círculo donde está la hemisección y
otro donde el tracto **entra o sale** de la médula hacia el cuerpo; mismo lado → ipsilateral, lado
opuesto → contralateral. *"At the very least a good way to double-check."*
· **FRASE** ✅: *"Simple but not easy — like waking up at 5 a.m. or doing pomodoro."*

**8.5 Hallazgos motores CRUZADOS → lesión de tronco** ✅
Cara débil de un lado + cuerpo débil del otro: la decusación **corticobulbar** ocurre a nivel del
tronco y la **corticoespinal** en la unión bulbo-medular; una lesión de tronco derecho toma el
corticobulbar ya cruzado (cara ipsilateral) y el corticoespinal aún sin cruzar (cuerpo contralateral).
· **Utilidad de examen** ✅: ante una lista larga de arterias, **elimina ACA, MCA, PCA y también
médula** → tiene que ser una arteria del tronco. *"The harder ones to recognize are the brainstem
strokes."*
· ❌ **NO están en las fuentes**: los epónimos y estructuras de **Wallenberg, Weber y Horner**.

**8.6 Cara: motoneurona superior vs inferior** ✅
```
El núcleo facial: la porción SUPERIOR (frente) recibe inervación cortical BILATERAL;
la inferior solo contralateral
   ⇒ Ictus cortical / cápsula interna → FRENTE RESPETADA, sonrisa torcida
   ⇒ Parálisis del nervio o del núcleo (Bell) → TODA la hemicara
```
· **Anécdota de alumna** ✅: la paciente dice *"look, I can wrinkle my forehead, isn't that good?"* —
*"No, that's actually worse."* **Regla: es más preocupante si PUEDEN mover la frente.**
· **Protocolo real de urgencias (MGH)** ✅: ante asimetría facial súbita, levantar cejas y comparar
fuerza; si la frente está respetada → **TC de cráneo SIN contraste stat** ("door-to-scanner time").
**"Time is brain"**: el cerebro tolera ~5 min de isquemia frente a ~30 min del corazón.
· **Por qué SIN contraste** ✅: el contraste yodado es radiodenso y **oscurece la sangre** (que se ve
por el hierro, radiodenso como el calcio del hueso); si hay sangrado no se da tPA.

**8.7 Signos de motoneurona superior vs inferior** ✅

| Signo | UMN | LMN |
|---|---|---|
| Espasticidad / tono alto | **sí** | no (fláccida) |
| Hiperreflexia | **sí** | no |
| Atrofia | no (o lenta, por desuso) | **sí** (efecto neurotrófico perdido) |
| Fasciculaciones | no | **sí** |
| Debilidad | **inespecífica** | **inespecífica** |

· **Fasciculaciones = LMN** ✅, *"comes up not infrequently on the USMLE"* y **preguntan el mecanismo**:
siempre hay despolarizaciones espontáneas de unidades motoras, invisibles porque las unidades son
pequeñas; tras una lesión LMN las neuronas vecinas **reinervan** → **unidades motoras más grandes** →
la descarga espontánea se hace visible. **No** es liberación de neurotransmisor por muerte neuronal
ni conos de crecimiento.
· **Ictus puro motor = cápsula interna · puro sensitivo = tálamo** ✅ (ACA/MCA dan ambos).

**8.8 Síndromes medulares y esclerosis múltiple** ✅
· **EM** ✅: **"neurological deficits that can't be explained by a single lesion"** (una hemicara débil
+ hemicuerpo contrario sin sensibilidad + un hallazgo ocular raro; patrón "patchy" en los cortes).
**El calor empeora** porque la desmielinización enlentece la conducción (*"I don't really understand
why heat makes it worse, but tie it to the myelin"*).
· **Tabes dorsal** ✅ (sífilis terciaria): cordones posteriores → propiocepción → **marcha tabética**
(levantan mucho el pie y lo azotan contra el suelo para "sentir" dónde está). *"Tabes = emaciation."*
· **Friedreich** ✅: cordones posteriores + corticoespinal (+ espinocerebeloso); la ataxia ya se
explica con el DCML "sin invocar el espinocerebeloso".
· **Degeneración combinada subaguda = DCML + corticoespinal** ✅: **B12** (mielina), **vitamina E**
(antioxidante), Friedreich. **PREGUNTA REAL de Step 1 de un alumno**: cuadro clásico pero **anemia
MICROCÍTICA** → la respuesta era **vitamina E**, no B12 (*"if you read it carefully it's easy"*).
La epidemiología ("B12 stores last years, only vegans or pernicious anemia") es *"one of the weaker
ways of eliminating"*: hace falta **un dato positivo**.
· **ELA** ✅: corticoespinal lateral (UMN) + asta anterior (LMN), **sin déficit sensitivo**.
· **Polio / Werdnig-Hoffmann** ✅: solo asta anterior → parálisis fláccida (LMN puro).
· **Lectura de cortes** ✅: en esas láminas **el blanco se ve gris y el gris blanco** por la tinción;
primero definir qué tractos están afectados y **luego** qué enfermedad lo explica.

**8.9 VIÑETA MAESTRA: coma, PKD y hemorragia** ✅ (viñeta escrita por él mismo, HY Neuro 2)
> *"43-year-old man brought to the ED immediately after being found unconscious and unresponsive at
> home."*
· Exige una **cronología patofisiológica "desde que nació hasta hoy"** para **cada** hipótesis
(sobredosis, hipoglucemia, hipoperfusión, aneurisma roto). Y el filtro clave: **un IAM o un ictus NO
dan coma por sí solos** — *"a stroke is not enough to give you coma unless there's intracranial
hypertension"*.
```
"Long-standing polycystic kidney disease, several mini-strokes, two hospitalizations for lacunar
 infarcts" → PKD → HTA incontrolable a los 43 → lacunares (marca de la gravedad de la HTA)
   + aneurismas saculares → ROTURA → sangre → sube la PIC → "smooshing of brain" → COMA
"No drug, alcohol or tobacco use" → descarta intoxicación
T 37,2 · FC 48 · PA 172/96 · FR 6 laboriosa → TRÍADA DE CUSHING = hipertensión intracraneal
GCS 5 → INTUBACIÓN ("anything 8 or below you intubate": sin conciencia no hay reflejos protectores)
Pupila derecha 9 mm arreactiva vs izquierda 4 mm reactiva → compresión del III PAR DERECHO
   (herniación incipiente) — "You've got to put your nickel down"
Reflejos 4+ izquierda / 2+ derecha → lesión UMN DERECHA (hiperreflexia contralateral) → coherente
RESPUESTA: hemorragia de GANGLIOS BASALES derecha
```
> Cronología final literal: *"PKD (autosomal dominant) → uncontrolled hypertension → lacunar infarcts
> + aneurysm → rupture in basal ganglia → hemorrhage → ICP up → Cushing / early herniation → CN III
> compression on the right + corticospinal compression → blown pupil + UMN findings."*
**Todos los síntomas son de PIC, no isquémicos: no hace falta invocar hipoperfusión.** ✅
· Conexión útil ✅ (§3.16): **PIC alta = PA alta + pulso BAJO**; **PA alta + pulso ALTO** = tono
simpático (cocaína).

**8.10 Hematoma epidural vs subdural — razonamiento de primeros principios** ✅
> Las **arterias son un sistema de alta presión con pared muscular gruesa**: cuesta romperlas (trauma
> severo), pero al romperse el sangrado es rapidísimo, con síntomas en minutos, **sangre fresca
> hiperdensa/blanca** en TC y desplazamiento del cerebro → de ahí **deduces** la semiología del
> epidural (arteria meníngea media, forma de lente) sin memorizarla.
· **La regla del color** ✅: *"It's the AGE, not the size, that tells the color."* El **epidural es
arterial → se presenta rápido → sangre fresca con más hierro → más denso**; el **subdural es subagudo
→ el hemo se degradó y el hierro se reabsorbió → menos denso**. (Aplicación: TC con sangrados de
distinta densidad = **caídas repetidas**, igual que los moratones de distinta edad del §6.1.)
· ❌ **NO están en las fuentes**: HSA como entidad propia (solo la rotura de aneurisma sacular de la
viñeta PKD), cefaleas, vértigo, **tumores del SNC**, **convulsiones y antiepilépticos**, **demencias**
(solo dos menciones: cromosoma 21 y APP/amiloide en el Down, y *"si es Alzheimer lo trae otro"*).
**Cubrir D48 (antiepilépticos), D49 (demencias/Parkinson) y D50 (tumores) con First Aid + UWorld.**

**8.11 Unión neuromuscular y SNA** ✅ (HY Pharmacology Part 2, íntegro) — **cae en D45 (jue 12-nov)**
· **Solo dos receptores de ACh para Step 1** ✅: **muscarínico (GPCR)** y **nicotínico (canal iónico)**.
Pre/postganglionar son **localizaciones**, no tipos. Nicotínicos: **ganglios autonómicos y NMJ**;
muscarínicos: órganos parasimpáticos **y glándulas sudoríparas**.
· **Regla anti-lista** ✅: *"memorizas M1/M2/M3 y en el examen la lista te abandona"* → **M1 = cerebro
(arriba) · M2 = corazón · M3 = todo lo demás**. **M2 es Gi.**
· **Nicotínico abierto** ✅: **entra Na+ Y SALE K+** (a veces Ca2+) — *"everyone thinks it's just
sodium"*. Como casi todo el K+ es intracelular, abrir el canal **sube el K+ sérico**.
· **Bradicardia por M2, la cadena completa** ✅:
```
Anticolinesterásico → más ACh → M2 → Gi → baja el AMPc → baja la PKA → baja el Ca2+
   → BAJA LA PENDIENTE DE LA FASE 4 del nodo SA → tarda más en alcanzar el umbral → BRADICARDIA
Prevención: antagonista muscarínico (atropina clásica; en quirófano glicopirrolato)
```
*"Me cayó exactamente esa pregunta en mi Step 1: ¿qué receptor media la bradicardia?"* ✅
Caso real MGH ✅: trasplantado cardíaco (denervado, reinervación impredecible) que **codificó tras
neostigmina** pese a glicopirrolato adecuado.
· **Bloqueo neuromuscular** ✅:
```
DESPOLARIZANTE = SUCCINILCOLINA ("prácticamente el único en uso"): agonista → despolarización
   → FASCICULACIONES (la señal de que ya puedes intubar) → el canal queda INACTIVADO
   (tres estados: abierto, cerrado, inactivo) → parálisis
NO DESPOLARIZANTE = curare, vecuronio: antagonista competitivo, SIN fasciculaciones
   → REVERSIBLE con NEOSTIGMINA (más ACh desplaza al competidor)
Paradoja: las "-stigminas" además inhiben la pseudocolinesterasa que degrada la succinilcolina
```
· **Miastenia gravis** ✅ (anticuerpos anti-receptor nicotínico; piridostigmina + azatioprina,
plasmaféresis): **necesita MÁS succinilcolina** (hay que despolarizar receptores escasos) y **MENOS
no despolarizante** (*"exquisitely sensitive"*; evitarlo: *"embarrassing when the surgeon is done and
the patient is still paralyzed"*).
· **Denervación (ictus, quemados)** ✅: menos input → **up-regulation** de receptores nicotínicos
extrasinápticos → succinilcolina libera **más K+ → hiperpotasemia → arritmia fatal** → **no usarla**;
y ese lado es **resistente al no despolarizante** → **no monitorizar el bloqueo en la mano parética**
(*"I almost made that mistake"*).
· **Acoplamiento excitación-contracción** ✅: en el músculo **esquelético** el canal de Ca
dihidropiridínico está **acoplado MECÁNICAMENTE** al receptor de rianodina → **NO entra Ca
extracelular**; en corazón y liso hay **liberación de Ca inducida por Ca**. **Por eso los bloqueadores
de canales de calcio dan vasodilatación y depresión miocárdica pero NO debilidad esquelética** —
*"this to me is incredible"*.
· **Hipertermia maligna** ✅: mutación **activadora (ganancia de función)** del receptor de rianodina
→ **autosómica DOMINANTE** deducida (*"normally mutations mean less; this is more"*; contraste: CFTR y
distrofina = pérdida de función → recesivas). Succinilcolina activa esos canales → **tetania
sistémica** → calor como subproducto. **PRIMER SIGNO: el CO2 espirado que sube y sube** pese a
hiperventilar; la hipertermia viene después. **Fiebre ≠ hipertermia**: la fiebre es central e
intencional (desplaza la curva de Hb a la derecha para el estallido oxidativo de los neutrófilos); la
hipertermia es un subproducto. Escalofríos = forma leve de lo mismo.
· **Toxina botulínica** ✅: **cliva SNARE/SNAP** → no se libera ACh (mecanismo Ca-dependiente, el mismo
de la exocitosis de insulina de §7.3).
· **Fisostigmina (amina terciaria, cruza la BHE: toxicidad anticolinérgica central) vs neostigmina
(cuaternaria, periférica)** ✅ — *"likes dissolve likes"* (→ §15.1).
· ❌ **NO están**: Lambert-Eaton, Guillain-Barré, organofosforados/pralidoxima, dantroleno, edrofonio,
timoma.

### (c) High-yield del bloque
Ictus por territorio · regla de los 4 y síndromes cruzados · médula (Brown-Séquard, siringomielia,
B12, tabes, ELA, arteria espinal anterior) · NMS vs NMI y fasciculaciones · vía visual y campimetría;
pupila y MLF · afasias y homúnculo · hemorragias (epidural/subdural/HSA) y herniación ·
neurodegenerativas · EM y Guillain-Barré · tumores adulto vs niño · antiepilépticos · plexo braquial ·
defectos del tubo neural · NMJ y SNA farmacológico.

### (d) Fuentes
Vídeos ✅: [High Yield Neuro](https://www.youtube.com/watch?v=YIwfdc7E8TU) ·
[High Yield Neuro Part 2](https://www.youtube.com/watch?v=52xHDZJy2sw) ·
[High Yield Pharmacology Part 2](https://www.youtube.com/watch?v=PvKp25ku0po) (NMJ + SNA).
Artículos ✅ (URLs conservadas de la v2): [Question Interpretation](https://www.yousmle.com/question-interpretation/) ·
[Beyond UFAP](https://www.yousmle.com/ufap/) ·
[Five 5-Minute Anki Card Tips](https://www.yousmle.com/five-5-minute-or-less-anki-card-tips-to-supercharge-your-usmle-step-1-score-5-will-make-your-a-superstar-on-wards/).

### (e) → En tu plan
**D42 = lun 9-nov (N1)** · **D43 = mar 10-nov (N1)** · **D44 = mié 11-nov (N2)** · **D45 = jue 12-nov
(N2, SNA completo)** · **D47 = lun 16-nov (N2)** · **D46 = vie 13-nov → NBME 27 (N5 · 200Q)** ·
**D48 = mar 17-nov (N2)** · **D49 = mié 18-nov (N2)** · **D50 = jue 19-nov (N2)**.
El NBME 27 parte el bloque: los tractos y Brown-Séquard (**D42 · D43**) tienen que estar **validados al
80 %** antes del hito, porque son el 100 % del rendimiento en médula e ictus. D49 · D50 (demencias,
tumores, EM) son los días con **menos respaldo del corpus**: allí el método manda más que la fuente.

---

## 9. Hematología y Oncología

**→ En tu plan: D51-D56 = vie 20-nov-2026 → vie 27-nov-2026.**
Niveles: **D51 (vie 20-nov) N1** — viernes con el sistema de <3 días: el bloque de sistema completo
se hace del ANTERIOR (Neuro) · D52 N1 · D53 N2 · D54 N2 · D55 N2 · **D56 (vie 27-nov) N3 — 20Q del
sistema completo timed**. **En v5.9 el bloque recupera su viernes de nivel 3**, que cae en linfomas/
mieloma/transfusión (en la v5.8 se había quedado sin él; en la v5.7 lo tenía en coagulación). Contenido:
microcíticas (Fe, talasemias, frotis) (D51) · macro/normocíticas, hemólisis y drepanocitosis (D52) ·
coagulación: cascada, PT/PTT, hemofilias, vWD (D53) · plaquetas (PTI/PTT/SUH), hipercoagulabilidad y
CID (D54) · leucemias y mielodisplasia (D55) · linfomas, mieloma, transfusión y fármacos onco (D56).
Vídeo: [High Yield Hematology](https://www.youtube.com/watch?v=zFGfP4d_aOc) (D51).

> **Aviso de cobertura** ✅: el vídeo de Hematología cubre marcadores de muerte celular → clasificación
> de anemias por VCM → ejemplos aplicados. **No cubre leucemias con detalle**: él anuncia esa sesión
> como "la próxima" y **esa sesión NO está en el cuaderno**. Coagulación se sostiene en **dos
> artículos íntegros** (Coag 1 y 2), y el panel de hierro en otro.

### (a) Concepto ancla y cadena causal
> *"The questions come down to one question: **are red blood cells being created or destroyed?**"* ✅
El error concreto que señala: *tratar el recuento de reticulocitos y el VCM como herramientas de
clasificación en lugar de como **señales fisiológicas***.
```
1. El eritrocito = UN GLOBO LLENO DE HEMOGLOBINA. Su único trabajo es transportar O2 vía el hemo
2. Problema para FABRICAR HEMOGLOBINA → el globo se llena menos → MICROCÍTICO (VCM < 80 fL)
3. Problema para SINTETIZAR ADN → la mitosis se retrasa mientras el globo se sigue llenando
   → se "sobre-llena" → MACROCÍTICO (VCM > 100 fL)
4. Problema de NÚMERO (hemólisis, sangrado, falta de EPO) → los que quedan son normales
   → NORMOCÍTICO (80-100 fL)
5. RETICULOCITOS = el único indicador de si la médula responde. Anemia + reticulocitos bajos =
   fallo de PRODUCCIÓN → deconstruir en tres variables: cofactores de ADN (folato/B12), estímulo
   hormonal (EPO) o sustrato de hemoglobina (hierro)
```
> *"Think of RBC as a big balloon full of hemoglobin. If there is less hemoglobin, the balloon will be
> less full."* ✅
· **ERRORES** ✅: (1) usar VCM y reticulocitos como **casillas** en vez de señales; (2) confundir
**volumen** (VCM) con **número** — *"anemia just means low hemoglobin… you can either not have enough
hemoglobin, or just not have enough red blood cells"*; (3) olvidar que en la fase de recuperación una
respuesta reticulocitaria vigorosa **sube el VCM** (los reticulocitos son grandes) → una hemorragia
puede leerse transitoriamente como macrocítica.

### (b) Subtema a subtema

**9.1 Marcadores de muerte celular: por qué la LDH sirve (y por qué engaña)** ✅
```
1. Un marcador celular se mide EN SUERO y solo aparece si la MEMBRANA SE ROMPIÓ
2. Troponina T e I = ESPECÍFICAS de miocito cardíaco; la CK es INESPECÍFICA (IAM y rabdomiólisis)
3. La LDH cataliza piruvato + NADH ⇄ lactato + NAD+. Su función real es REGENERAR NAD+ cuando la
   cadena de transporte no puede (sin O2 o SIN MITOCONDRIAS)
4. EL HEMATÍE MADURO NO TIENE MITOCONDRIAS → vive de glucólisis anaerobia → SIEMPRE está fabricando
   LDH → cuando se lisa, la vuelca a la sangre
5. Pero la LDH está en casi toda célula → marcador MUY INESPECÍFICO
```
· **ERROR** ✅ que corta en directo: contestar que el hematíe **no** genera LDH porque no tiene
mitocondrias — **es al revés, precisamente por eso la genera sin parar**.
· **Bilirrubina indirecta** ⚠: producto final de la degradación del hemo tras destrucción esplénica;
lipofílica, insoluble y unida a albúmina → **NO se filtra → NO hay coluria en la hemólisis
extravascular pura**.
· Digresión que él marca como "concepto de Step 1" ✅: la mitocondria fue **una bacteria fagocitada**
en una simbiosis — *"hey, you make my ATP for me and I'll provide you with glucose"*.

**9.2 Anemias microcíticas y el PANEL DE HIERRO (el corazón del bloque)** ✅
**Definiciones previas** ✅: **hemo ≠ hemoglobina** (el hemo es una molécula porfirínica con hierro; el
**hierro** es el que une el O2; la hemoglobina es una proteína de 4 globinas con 1 hemo cada una) ·
**metahemoglobina** = Fe3+ en vez de Fe2+ (une **muy mal** el O2) · **ferritina** = forma de
almacenamiento · **transferrina** = transportador · **saturación** = % de transferrina unida a hierro
(*"analogous to hemoglobin saturation"*) · **TIBC** = cantidad total de transferrina, con
**correlación NEGATIVA con la ferritina** · **ferroportina** = saca hierro a la sangre desde enterocito
y macrófago · **hepcidina** = **internaliza y degrada la ferroportina**.

| | Hierro sérico | Sat. transferrina | Ferritina | TIBC |
|---|---|---|---|---|
| **Ferropenia** | baja | baja | **baja** | **alta** |
| **Enfermedad crónica** | baja | baja | **alta** | **baja** |
| **Sideroblástica** | alta | alta | **alta** | **baja** |

**Razonamiento, no memoria** ✅: ferropenia → falta hierro → sérico y saturación bajan, los depósitos
se vacían → **ferritina baja → y como ferritina y TIBC son inversas, TIBC alta** (*"my body is looking
for iron"*). Enfermedad crónica → **IL-6 → hepcidina → degrada ferroportina** → el hierro queda
**atrapado** en enterocitos y macrófagos → sérico y saturación bajan igual **pero ferritina ALTA →
TIBC baja**: **ese es el punto exacto de discriminación**. Sideroblástica → defecto de síntesis del
hemo con absorción intacta → hierro y saturación **altos**.
· **ERROR** ✅: memorizar la tabla. Bastan **dos reglas** (ferritina = depósitos; TIBC inversa a la
ferritina) para regenerarla entera.
· **VIÑETA** ⚠: varón de **62 años**, Hb **9,8**, VCM **74 fL**, ferritina **8 ng/mL**, TIBC alta →
ferropenia → **siguiente pregunta obligada: colonoscopia**.
· **El "por qué" teleológico de la hepcidina** ✅ (lo que hace que no se olvide): **hay bacterias que
prosperan en ambientes ricos en hierro** — menciona **Listeria** y el riesgo aumentado en **cirrosis
y hemocromatosis** — así que el cuerpo **le quita el hierro a la bacteria**: *"You are starving the
bacteria."* Él admite que es una hipótesis teleológica no demostrable y la usa igualmente porque
*"it's much better to have a story where all the facts fit together than to memorize disparate
things"*.
· **ERROR** ⚠: suponer que una ferritina alta descarta anemia — en la enfermedad crónica la ferritina
alta **es el hallazgo**, no la exclusión.

**9.3 Anemias macrocíticas: la trampa del metilfolato** ✅
· **Folato**: el tetrahidrofolato (THF) es el **transportador de carbonos** (CH, CH2, CH3) del cuerpo;
se usa en síntesis de **purinas y dTMP**.
· **B12**: **solo hay DOS enzimas dependientes de B12 en todo el cuerpo**: (1) **metionina sintasa /
homocisteína metiltransferasa** (que además usa metil-THF) y (2) **metilmalonil-CoA mutasa**.
```
LA TRAMPA: la conversión de metil-THF a otras formas de THF es IRREVERSIBLE; el metil-THF solo se
libera GASTÁNDOSE en la reacción de la metionina sintasa. Sin B12 esa reacción se detiene →
TODO EL FOLATO QUEDA ATRAPADO COMO METIL-THF y no puede entrar en la síntesis de ADN
```
> *"They call it the methylfolate trap because the THF is trapped as methylfolate."* ✅
· **Laboratorio** ✅: B12 baja → **homocisteína alta Y ácido metilmalónico alto**; folato bajo →
homocisteína alta con **MMA normal**.
· **ERRORES** ✅: (1) decir que la macrocitosis es "porque se acumulan nucleótidos" — corta esa
respuesta en directo: *"if I'm not making DNA it doesn't really make sense that it would accumulate"*;
(2) intentar conectar metilmalonil-CoA → succinil-CoA con la **síntesis de hemo**: *"I know of no
biochemically relevant way in which heme synthesis is affected by a B12 deficiency"* (hay muchísimas
vías para hacer succinil-CoA; es parte del ciclo de Krebs). **Es un error que él marca explícitamente
y elogia como buena pregunta.**
· **Hidroxiurea** ✅: inhibe la **ribonucleótido reductasa** → bloquea la síntesis de ADN →
**macrocitosis**.
· Honestidad metodológica ✅: da dos explicaciones de por qué el fallo de ADN agranda la célula
(mecanicista: sin ADN no hay mitosis; teleológica: si no puedo hacer muchas células, que cada una
lleve más hemoglobina) y dice que **nunca se lo van a preguntar** — pero que hay que tener una.

**9.4 Anemias normocíticas: el problema es de NÚMERO** ✅
Tres causas canónicas: **hemorragia aguda** · **hemólisis** · **déficit de EPO** (enfermedad renal:
el hematíe se fabrica bien, simplemente **no hay estímulo**).
· **ERROR** ✅ corregido en directo a una alumna que clasificó el déficit de EPO como microcítico:
*"is it a problem with hemoglobin synthesis? No. Is it a problem with DNA synthesis? No. I'm just not
producing enough normal red blood cells."*
· **CID → normocítica** ✅: no da pancitopenia (no toca los leucocitos), no es un problema de
producción ni de hemoglobina: *"they're getting sheared… you had 100 red blood cells and half of them
are now torn up."*
· **PREGUNTA TÍPICA**: "nefropatía diabética avanzada + anemia + reticulocitos bajos + VCM 90" →
**EPO**, no hierro ni B12.

**9.5 Hemólisis intravascular vs extravascular** ⚠ 🔎 **A VERIFICAR (08-sep)**
> ⚠ Conflicto interno registrado: una consulta afirmó que **haptoglobina, hemoglobinuria y
> hemosiderinuria NO están en las fuentes**, mientras otra las desarrolló citando HY Family Medicine 2
> / HY Surgery; **no aparecen en la transcripción local de HY Hematology**. El mecanismo es correcto
> de libro, pero **no lo uses como "lo dice Palmerton"**. → `pendiente_usuario`.
· **Extravascular (bazo)**: los macrófagos fagocitan hematíes rígidos, deformados o **recubiertos de
inmunoglobulinas** → hemo → biliverdina → **bilirrubina indirecta** → **NO se filtra → NO hay
coluria**; la depuración mantenida hipertrofia los cordones de Billroth → **esplenomegalia**.
· **Intravascular**: rotura por cizallamiento (esquistocitos), complemento o toxinas → **hemoglobina
libre** → captada por la **haptoglobina** → al saturarse, **haptoglobina indetectable**; el exceso
filtra → **hemoglobinuria**; el hierro libre daña el túbulo (NTA) y las células descamadas dan
**hemosiderinuria**. **LDH muy alta**.
· **PREGUNTA**: diferenciar **por laboratorio sin nombrar la enfermedad** — bilirrubina indirecta alta
+ esplenomegalia + orina clara → **extravascular**; hemoglobinuria + haptoglobina 0 + LDH muy alta +
esquistocitos → **intravascular**.

**9.6 G6PD, falciforme, HbC y ELECTROFORESIS** ✅/⚠
· **G6PD** ⚠: recesivo ligado al X. La G6PD regula la fase oxidativa de la **vía de las pentosas
fosfato**, única fuente de **NADPH**; el NADPH es el cofactor de la **glutatión reductasa** que
regenera el **glutatión reducido**. Ante un estresor oxidativo (infecciones, sulfonamidas,
antipalúdicos, **habas**) los radicales desnaturalizan los puentes sulfhidrilo de la hemoglobina →
precipita como **cuerpos de Heinz** → los macrófagos esplénicos "muerden" esos agregados → **bite
cells**.
**Portadoras heterocigotas sintomáticas** ✅: por un patrón **sesgado / "unfortunate" de inactivación
del X** — *"la respuesta es siempre 'unfortunate pattern of X-inactivation'"* (§15.6). **ERROR**:
asumir que una mujer heterocigota nunca puede tener clínica — **es exactamente el disfraz que el NBME
usa**.
· **ELECTROFORESIS — artículo íntegro** ✅:
```
1. Objetivo: separar macromoléculas por TAMAÑO / CARGA
2. SDS DESNATURALIZA (desenrolla) las proteínas y es MUY NEGATIVO. Desenrollarlas es crítico para
   que la longitud sea proporcional al tamaño (analogía: CLIPS en posición nativa vs desenrollados)
3. Al ser aniónico, todo migra HACIA EL ELECTRODO POSITIVO. Migran MÁS LENTO: (a) las más grandes,
   (b) las MENOS negativas
4. Southern = DNA · Northern = RNA · Western = PROTEÍNA
   ⇒ LA ELECTROFORESIS DE HEMOGLOBINA ES UN WESTERN, porque la hemoglobina ES una proteína
5. HbS: missense glutamato → VALINA. Glutamato = anión; valina = neutra → MENOS carga negativa
   → migra MENOS que la HbA
6. HbC: glutamato → LISINA = catión → MÁS carga positiva → LA QUE MENOS migra
ORDEN (de más a menos migración hacia el +): HbA (control) → HbS → HbC
   Mnemónico del extracto: "A acelera, S se desliza, C gatea"
```
**PREGUNTA TÍPICA** ✅: dan un gel con tres carriles y piden identificar HbS y HbC **razonando desde la
mutación**. **ERROR**: memorizar el orden sin la carga — si te dan una variante nueva (inventada),
**solo la carga del aminoácido sustituido te salva**.
· **NOTA DE COBERTURA** ⚠: de la anemia falciforme el cuaderno **solo** desarrolla la mutación, su
comportamiento electroforético y la **necrosis papilar renal** (microinfartos en la médula renal
hiperosmolar y de bajo O2). ❌ **Crisis vasooclusivas, autoesplenectomía e hidroxiurea como inductor de
HbF: no están.** ❌ **PNH / CD55-CD59: no está.**
· **Talasemias** ✅: defecto **cuantitativo** de síntesis de cadena de globina → menos hemoglobina → el
globo se llena menos → **microcítica**. **ERROR** ✅ corregido en el vídeo: clasificarla como
normocítica "porque suele haber hemólisis" — *"So what's the fundamental problem? …it's a problem with
making hemoglobin. So it would make sense if it was micro."*

**9.7 Hemostasia primaria vs secundaria · PT vs PTT** ✅ (Coag 1 y 2, íntegros) — **D53 (mar 24-nov), N2**
```
Hemostasia PRIMARIA   = tapón plaquetario     Hemostasia SECUNDARIA = cascada
Propósito de la cascada: las plaquetas se adhieren entre sí MUY DÉBILMENTE; si el tapón se deshace
   vuelve el sangrado. La cascada genera ENTRECRUZAMIENTOS DE FIBRINA que lo refuerzan
"Cascada" porque los factores son ZIMÓGENOS que se activan por escisión secuencial (XII corta XI…)
INTRÍNSECA: XII, XI, IX, VIII → medida por PTT
EXTRÍNSECA: endotelio dañado → FACTOR TISULAR → factor VII → vía común. Medida por PT
COMÚN: X → V → II (trombina) → fibrinógeno → fibrina
Proteína C inactiva al factor V activado; proteína S inactiva al factor VIII
   ⇒ lo que decide si hay coágulo es EL BALANCE procoagulante ↔ anticoagulante
```
· **MNEMÓNICO** ✅: **"The EX(trinsic)-PresidenT went to WAR(farin)"** — EXtrínseca → **PT** →
**WARfarina**. Corolario: intrínseca → **PTT** → **heparina**.
· **Presentación clínica** ✅: defecto **primario (plaquetario)** → **sangrado mucocutáneo** (*truco
clínico literal que enseña*: preguntar **"¿te sangran mucho las encías al cepillarte los dientes?"**);
defecto **secundario (cascada)** → **sangrado profundo** (hemartrosis) o prolongado tras extracción
dental.
· **PREGUNTA TÍPICA de razonamiento puro** ✅: **¿cuál resangra más desde el mismo sitio?** El
**SECUNDARIO** — en el primario, si logras formar el tapón, la cascada intacta lo refuerza y queda
**fuerte**; en el secundario formas el tapón sin problema pero **se queda débil** por falta de fibrina.
· ❌ **NO están**: **von Willebrand vs hemofilia A/B**, tiempo de sangría y estudio de mezclas 1:1
(la vWD solo se nombra como causa de sangrado uterino abundante en adolescentes) → **First Aid + UWorld**.

**9.8 Warfarina: necrosis cutánea, factor V Leiden y el estado protrombótico paradójico** ✅ (Coag 1)
```
1. La warfarina inhibe la acción de la VITAMINA K, que gamma-carboxila II, VII, IX, X
   Y TAMBIÉN LAS PROTEÍNAS C Y S
2. De todos, los de vida media MÁS CORTA son la PROTEÍNA C y el FACTOR VII (~1 día)
3. EFECTO PARADÓJICO: al dar warfarina sola, la proteína C (anticoagulante) cae de inmediato
   mientras II, IX y X (procoagulantes, vidas medias largas) siguen presentes
   → HIPERCOAGULABILIDAD TRANSITORIA
4. PREVENCIÓN: empezar ANTES con heparina/HBPM ("puente")
5. NECROSIS CUTÁNEA POR WARFARINA: típica en DÉFICIT DE PROTEÍNA C o S
6. FACTOR V LEIDEN: el factor V es RESISTENTE a la inactivación por la proteína C activada
```
· **ERROR** ✅: pensar que la warfarina solo baja procoagulantes. **También baja proteína C y S** — ese
es el nudo entero.
· **Presentación clásica del factor V Leiden (literal)** ✅: *"Young woman in her 20s started birth
control pill, and develops DVT with or without PE."*
· **Aplicación hepática con la misma lógica de vidas medias** ✅ (→ §6.2): fallo agudo = **albúmina
normal, PT alto**; fallo crónico = **ambos alterados**.
· **Ejemplo de tarjeta mala → buena** ✅: mala: *"¿qué causa la necrosis cutánea por warfarina? →
deficiencia de proteína C"* ("recitaba la asociación y seguía fallando la pregunta"); **buena**:
añadir **"explica por qué"** y la cadena completa.

**9.9 Heparina: química, HIT, reversión y embarazo** ✅ (Coag 2)
```
WARFARINA = NO POLAR → atraviesa membranas → SE ABSORBE ORAL → Y CRUZA LA PLACENTA (teratógena)
HEPARINA  = MUY POLAR (cargada negativamente) → NO se da oral → Y NO CRUZA LA PLACENTA
   ⇒ EN EMBARAZADAS: HEPARINA SÍ, WARFARINA NO.  Todo deducido de la estructura química
MONITORIZACIÓN: warfarina con PT (a dosis clínicas solo el VII se afecta significativamente →
   PTT normal); heparina con PTT
REVERSIÓN: warfarina → VITAMINA K IV + PLASMA FRESCO CONGELADO ("contiene todos los factores
   depletados"); heparina → SULFATO DE PROTAMINA (la heparina es muy negativa, la protamina muy
   positiva → se unen y la neutralizan)
HIT: anticuerpos IgG contra HEPARINA UNIDA AL FACTOR PLAQUETARIO 4 (PF4). El complejo se elimina
   (TROMBOCITOPENIA) y ACTIVA las plaquetas (TROMBOSIS)
   → tratamiento: INHIBIDORES DIRECTOS DE LA TROMBINA (argatrobán, bivalirudina — de SANGUIJUELAS)
```
· **PREGUNTA TÍPICA** ✅: qué anticoagulante dar en el embarazo **razonando desde la polaridad**; o por
qué la protamina revierte la heparina y no la warfarina.

**9.10 Trombocitopenias: PTI vs PTT vs SUH vs CID** ⚠
· **PTI**: autoanticuerpos contra antígenos plaquetarios → destrucción esplénica. **Trombocitopenia
grave AISLADA** + sangrado mucocutáneo, con **PT/PTT y fibrinógeno normales**. Diagnóstico de
exclusión: **sin MAHA, sin fallo renal, sin fiebre alta** (una febrícula **no** la descarta). Caso
citado: adolescente de **15 años** con sangrado vaginal abundante.
· **PTT**: **péntada** — trombocitopenia grave, **MAHA con esquistocitos**, fallo renal agudo, fiebre y
síntomas neurológicos fluctuantes. Tratamiento: **plasmaféresis** (anti-ADAMTS13) 🔎 A VERIFICAR.
· **SUH**: microangiopatía infantil por **toxina Shiga** tras infección por **E. coli O157:H7** → daño
endotelial renal → microtrombos de fibrina → **tríada**: MAHA + trombocitopenia de consumo + **fallo
renal oligúrico grave**. Se separa de un Gilbert por el **estado tóxico sistémico**.
· **CID**: activación sistémica por **liberación masiva de factor tisular** (sepsis, trauma,
neoplasia) → consumo → **PT alto, PTT alto, fibrinógeno muy bajo, dímero D muy alto**, esquistocitos.

**9.11 Trombosis venosa: Virchow, TEP y filtro de VCI** ⚠/✅ (→ §4.9 para la fisiología)
· **Los disfraces prototípicos** ⚠: **estasis** = vuelo transcontinental largo (Seúl → Los Ángeles) ·
**daño endotelial** = tabaquismo intenso · **hipercoagulabilidad** = ACO (suben la síntesis hepática
de factores) o **adenocarcinoma de páncreas** (mucina ácida como factor tisular ectópico).
**Regla de Palmerton**: suele hacer falta la **coexistencia de al menos DOS de las tres**.
· **VIÑETA NBME reordenada con CCSN** ✅:
> *"Mujer de 25 años traída a urgencias por disnea aguda y dolor torácico hace 3 horas. Refiere que
> hace 5 días regresó de un vuelo transcontinental de 12 horas. Su historial revela que inició
> anticonceptivos orales hace 2 meses."*
```
Reordenamiento cronológico obligatorio (el System 1 es ciego a la cronología):
   hace 2 MESES: inicia ACO   → hipercoagulabilidad farmacológica
   hace 5 DÍAS : vuelo 12 h   → estasis venosa
   hace 3 HORAS: disnea + dolor torácico → desprendimiento del trombo al árbol pulmonar
→ el diagnóstico de TEP emerge de forma inevitable
```
· **Filtro de VCI y la regla del juez** ⚠: **SIEMPRE segunda línea**; el **Rule-In** exige
contraindicación absoluta para anticoagular o fallo de la anticoagulación plena. Si la viñeta no da
ninguna de las dos, **la anticoagulación estándar es la respuesta**.

**9.12 Transfusión: ABO/Rh, Coombs, TRALI vs TACO** ✅/⚠ (artículo ABO/Vacunas, íntegro)
```
1. Antígenos A y B = CARBOHIDRATOS. Antígeno Rh = PROTEÍNA
2. Contra azúcares solo IgM (sin ayuda T). Contra proteínas, IgG
3. SOLO LA IgG CRUZA LA PLACENTA
   ⇒ LA ERITROBLASTOSIS FETAL ES UN PROBLEMA DE Rh, NO DE ABO
4. Peligroso: madre Rh-NEGATIVA con feto Rh-POSITIVO. Lo inverso no (el feto tiene un sistema
   inmune inmaduro)
5. Momento de sensibilización: EL PARTO (traumático, rompe vasos)
6. RhoGAM = INMUNIZACIÓN PASIVA: anticuerpos anti-Rh que eliminan el antígeno fetal de la
   circulación materna ANTES de que ella desarrolle los propios
7. Autotolerancia: un paciente A+ produce anti-B y nada más
```
· **Coombs (base física)** ✅: se añade un **anticuerpo anti-anticuerpo** (antiglobulina humana) que
entrecruza y **aglutina**.
**DIRECTO** = reactivo + **hematíes DEL PACIENTE** → ¿**ya ocurrió** la hemólisis inmune? (AIHA,
reacción transfusional). **INDIRECTO** = **suero del paciente** + hematíes de prueba con antígenos
conocidos (Kell, Duffy, Kidd) → ¿**podría ocurrir**? → base del **Type and Screen** y del anti-Rh en
la gestante. *"It took me years to understand the difference."* ✅
· **Aglutininas** ✅: **todo une mejor en frío** (menos energía cinética) → **caliente = IgG de tan alta
afinidad (maduración) que aglutina incluso a 37 °C**; **fría = IgM sin maduración** (Mycoplasma,
antígeno no proteico), se manifiesta en extremidades frías.
· **VIÑETA AIHA (literal)** ✅: **28 años**, 4 semanas de fatiga/disnea, FC 98, FR 18, palidez,
ictericia leve, esplenomegalia; **T-bili 6 · D 1 · Hb 6,5 · leucos 8 000 · plaquetas 210 000 ·
Coombs DIRECTO +** → AIHA caliente → hiperbilirrubinemia indirecta (hemólisis **extravascular** en el
bazo) → **el CaO2 cae a la mitad → el gasto cardíaco debe DOBLARSE** (taquicardia/taquipnea) sin
hipovolemia (§4.12).
· **TRALI vs TACO** ⚠: ambos = disnea aguda + opacidades difusas post-transfusión.
**TACO** = **hidrostático** (volumen rápido en reserva cardíaca justa) → **PCWP alta** → edema
**cardiogénico** → hipertensión, **JVD y S3**. **TRALI** = **inmunológico** (anticuerpos anti-HLA /
anti-neutrófilo **del donante** activan los neutrófilos del receptor en la microvasculatura pulmonar)
→ **PCWP normal y SIN sobrecarga**, infiltrados en las **primeras 6 h**.
· ❌ **NO están**: reacción febril no hemolítica, alérgica/urticaria, anafilaxia por déficit de IgA,
contaminación bacteriana del hemoderivado → **UWorld**.

**9.13 Leucemias, linfomas y mieloma — lo poco que hay, y es bueno** ⚠
· **Burkitt t(8;14)**: traslada **c-myc** (cr. 8) al locus de la **cadena pesada de Ig** (cr. 14); como
el promotor de la cadena pesada está **constitutivamente activo en las células B**, la vecindad
produce **sobreexpresión masiva de myc** → factor de transcripción que estimula crecimiento y mitosis
→ **extremadamente agresivo**. **Pero ese es su talón de Aquiles**: la quimioterapia convencional mata
selectivamente a las células que se dividen más rápido → **exquisitamente sensible y altamente
curable**.
· **Mieloma múltiple**: neoplasia clonal de células plasmáticas que sintetiza **proteína M** y
**cadenas ligeras**; la infiltración medular **estimula los osteoclastos** → **lesiones líticas** →
**hipercalcemia** → de ahí **CRAB**. **Riñón del mieloma**: las cadenas ligeras (Bence-Jones) saturan
la reabsorción proximal, precipitan en el colector con la **glicoproteína de Tamm-Horsfall** en pH
ácido → **cilindros eosinófilos** que obstruyen → reacción de cuerpo extraño → necrosis tubular.
· **NOTA DE COBERTURA** ✅ (importante): en el vídeo **anuncia** que la sesión siguiente trataría las
lesiones genéticas de las leucemias *"so that it's not just like memorizing 'follicular lymphoma,
8;14 translocation, BCL' — actually understand why these things are"*. **Esa sesión NO está.**
❌ **NO están**: t(9;22) BCR-ABL/imatinib, t(15;17) PML-RARA/ATRA/CID, t(14;18) BCL-2 folicular
(solo nombrada), t(11;14) ciclina D2, LLA infantil, LLC, Reed-Sternberg, cuerpos de Russell,
**policitemia vera y JAK2 V617F**. → **D55 y D56 se cubren con First Aid + UWorld aplicando el método.**
· **Esplenomegalia — lo que sí hay** ⚠: en la AHAI caliente los autoanticuerpos recubren los hematíes;
al pasar por la pulpa roja los macrófagos reconocen las porciones **Fc** y fagocitan parcial o
totalmente la membrana → hiperplasia de macrófagos → **esplenomegalia palpable**. ❌ Hiperesplenismo y
hematopoyesis extramedular: no están. ❌ Esferocitosis, Howell-Jolly y esplenectomía: no están.

### (c) High-yield del bloque
Panel de hierro (3 patrones vía hepcidina→ferroportina) · anemias por VCM y frotis · hemolíticas y
hemoglobinopatías (electroforesis por cargas: HbS Glu→Val, HbC Glu→Lys) · cascada (PT/PTT, vWF) ·
warfarina vs heparina, HIT · hipercoagulables · PTI/PTT/CID · leucemias y linfomas con sus
translocaciones · quimioterápicos (toxicidad firma) · marcadores tumorales · transfusión y Coombs.

### (d) Fuentes
Vídeo ✅: [High Yield Hematology](https://www.youtube.com/watch?v=zFGfP4d_aOc).
Artículos ✅ (URLs conservadas de la v2):
[Anemia Mechanism ↔ Iron Panel](https://www.yousmle.com/anemia-mechanism-iron-panel-usmle-step-1/) ·
[Master Coagulation Part 1](https://www.yousmle.com/master-coagulation-usmle-step-1-part-1/) ·
[Master Coagulation Part 2](https://www.yousmle.com/master-coagulation-usmle-step-1-part-2/) ·
[Gel + Hemoglobin Electrophoresis](https://www.yousmle.com/gel-electrophoresis-sickle-cell-disease-for-usmle-step-1/) ·
[Conjugate Vaccines + ABO](https://www.yousmle.com/can-you-connect-conjugate-vaccines-and-abo-incompatibility-for-the-usmle-step-1/) ·
[Tag Hematology](https://www.yousmle.com/tag/hematology/).

### (e) → En tu plan
**D51 = vie 20-nov (N1 — viernes con el sistema de <3 días: el bloque de sistema completo se hace de
Neuro)** · **D52 = lun 23-nov (N1)** · **D53 = mar 24-nov (N2, COAGULACIÓN: el subtema más
"razonable" del bloque — úsalo igual como gate propio aunque no sea el viernes de nivel 3)** ·
**D54 = mié 25-nov (N2)** · **D55 = jue 26-nov (N2)** · **D56 = vie 27-nov (N3 · 20Q del sistema
completo timed — el gate real de Heme/Onc, sobre linfomas/mieloma/transfusión)**.
El bloque **no está partido por hito**. Los tres artículos (panel de hierro + Coag 1 y 2) cubren
D51-D54 casi por completo; **D55 · D56 son el tramo con menos respaldo del corpus**: allí se aplica el
método sobre First Aid.

---

## 10. Microbiología / Enfermedades infecciosas

**→ En tu plan: D57-D60 · D62 (lun 30-nov → lun 7-dic) + D63 · D64 (mar 8-dic → mié 9-dic).**
En medio, **D61 = NBME 28 (vie 4-dic)**. Niveles: D57 N1 · D58 N1 · D59 · D60 · D62 N2 · D63 · D64 N2. Contenido:
bacteriología general + genética bacteriana + Gram+ cocos (D57) · Gram+ bacilos, anaerobios y Gram−
cocos (D58) · Gram− bacilos (D59) · micobacterias, espiroquetas y atípicas (D60) · virus DNA, herpes
y hepatitis (D62) · virus RNA, VIH y arbovirus (D63) · **hongos, parásitos y antimicrobianos (D64)**.

> ### ⚠⚠ ADVERTENCIA ESTRUCTURAL — LEER ANTES DE EMPEZAR EL BLOQUE
> **NO existe ningún vídeo ni artículo dedicado de MICROBIOLOGÍA/ID en las 295 fuentes** ✅. Los únicos
> títulos con contenido microbiológico son *Why Does the USMLE Step 1 Care if a Virus Has +RNA or
> -RNA?* y *Could You Connect Conjugate Vaccines and ABO Incompatibility*, más **digresiones** dentro
> de HY Immunology (Proteus/XGP, absceso, hepcidina/Listeria, TB/granuloma, VIH/IRIS), HY GI
> (E. coli/SUH, serología de hepatitis) y los artículos de farmacología (metronidazol,
> fluoroquinolonas, vancomicina).
> **Hongos, parásitos, betalactámicos, aminoglucósidos, macrólidos, tetraciclinas, antifúngicos y
> antivirales NO ESTÁN** (declarado explícitamente).
> **Consecuencia operativa para el plan v5.9**: en D57-D64 **no se puede anclar en el cuaderno**. Hay
> que apoyarse en **Sketchy Micro + First Aid + UWorld** y aplicar **el método** (tarjeta PC + CCSN +
> regla del 80 %). Esto ya está reflejado en `PALMERTON_DIVERGENCIAS_PLAN.md`. → `pendiente_usuario`.

### (a) Concepto ancla (lo que sí aporta el corpus)
**Tres ideas transversales sostienen todo lo que hay**: (1) la **cápsula de polisacárido** y la
activación B T-independiente (§2.4); (2) la **guerra por el hierro** (hepcidina, §9.2); (3) el
**control del foco** (dentro de un absceso no hay vasos, §1.4). Y una cuarta que es puramente
conceptual y muy rentable: **+RNA vs −RNA**.

### (b) Subtema a subtema

**10.1 Bacterias: cápsula, bazo y guerra por el hierro** ✅/⚠
· **Cápsula bacteriana = POLISACÁRIDO. Excepción: *Bacillus anthracis* = ácido D-glutámico** ✅.
Como el azúcar no se presenta en MHC → activación B **T-independiente** → **solo IgM, sin memoria** →
de ahí que los encapsulados exijan **vacunas conjugadas** (§2.4).
· **Bazo** ⚠: el aclaramiento de encapsulados depende de la opsonización + retirada física por
macrófagos y **células B de zona marginal** esplénicas.
· **Guerra por el hierro** ✅: IL-6 → hepcidina → degrada ferroportina → hierro secuestrado en
ferritina → **se priva de hierro a las bacterias que lo necesitan**. Patógeno citado: **Listeria
monocytogenes**; en **hemocromatosis o cirrosis** el mecanismo está saturado → hierro libre alto →
riesgo disparado de sepsis por Listeria.
· ***Proteus mirabilis*** ✅ → **pielonefritis xantogranulomatosa** (§2.7) y **malacoplaquia** como
distractor.
· ***E. coli* O157:H7 / toxina Shiga** ✅ → **SUH** (§9.10). ⚠ El mecanismo molecular fino de la toxina
Shiga **no está**.
· **TB** ✅: granuloma (§2.2) + **PPD como hipersensibilidad tipo IV** + sudores nocturnos por
citocinas (§2.1). ⚠ El mecanismo biofísico exacto del sudor nocturno no está detallado.
· **Lepra**: solo se nombra en la lista de patologías granulomatosas. Sin microbiología ni clínica.

**10.2 Umbral de bacteriuria y control del foco** ✅
· **Bacteriuria significativa = ≥ 100 000 colonias/mL** — literal: *"UTI, the technical definition of
significant bacteria, is 100,000."* Una cifra **por debajo** con inflamación crónica = **infección
amurallada** (§2.7).
· **Absceso**: cavidad de necrosis licuefactiva **avascular** rodeada de cápsula de colágeno.
**Sin vasos dentro → el antibiótico sistémico no penetra → tratamiento = drenaje físico.**
La **vancomicina** es además un polímero grande y polar, incapaz de penetrar pasivamente ⚠.

**10.3 Virus: +RNA vs −RNA e infectividad del genoma desnudo** ✅ (artículo íntegro) — **lo mejor del
bloque**
```
"INFECTIVIDAD DEL GENOMA DESNUDO" = si inyecto SOLO el material genético (sin cápside ni envoltura)
   en una célula, ¿produce progenie viral?

+RNA  = su genoma ES esencialmente mRNA → se traduce directamente
        "Tu subunidad ribosómica pequeña lo reconoce, encuentra el AUG y empieza a traducir COMO SI
         FUERA TU PROPIO mRNA"
        ⇒ TODOS LOS +RNA DESNUDOS SON INFECTIVOS
−RNA  = es la hebra COMPLEMENTARIA, NO es mRNA. Necesita una RNA POLIMERASA DEPENDIENTE DE RNA que
        la célula humana NO TIENE en el citoplasma
        ⇒ NO INFECTIVO
dsDNA = normalmente SÍ infectivo (nuestras propias polimerasas lo reconocen)
        EXCEPCIONES: POX (requiere su propia polimerasa, replica en citoplasma) y HEPADNA
        (presumiblemente porque solo es PARCIALMENTE bicatenario)
ssDNA = NO infectivo (requiere su propia polimerasa)
```
· **Nomenclatura que hay que poder invertir** ✅ (fichas reversibles del propio artículo):
**RNA polimerasa** = *DNA-dependiente, RNA polimerasa* · **Transcriptasa inversa** = *RNA-dependiente,
DNA polimerasa* · **DNA polimerasa** = *DNA-dependiente, DNA polimerasa* · la enzima −RNA → +RNA =
*RNA polimerasa dependiente de RNA* (que **no** es lo que se llama "RNA polimerasa" en el lenguaje
corriente).
· ⚠ **CORRECCIÓN registrada — no reintroducir el error**: NotebookLM afirmó que "transcriptasa inversa
= RNA-dependent DNA polymerase" **no está en las fuentes**. **Es falso: está literal en el artículo.**
· ⚠ **MATIZ DE PROCEDENCIA — parvovirus B19**: la excepción (horquillas terminales que actúan de
cebador para la DNA polimerasa del huésped → dependencia de **fase S** → tropismo por **eritroblastos**
→ **crisis aplásica transitoria**) **NO la escribe Palmerton en el cuerpo del artículo**: la aporta un
lector en la sección de **comentarios** (12-dic-2014) y **él responde endosándola** (*"I had never
thought about that before about parvovirus, but it makes complete sense!"*). El contenido es correcto,
pero **no es doctrina de Palmerton**.

**10.4 Biología molecular de soporte (dentro del mismo artículo)** ✅
· **Transcripción** = DNA → RNA · **traducción** = mRNA → proteína; señal de inicio = **AUG**.
· **El RNA se sintetiza y se lee 5' → 3'.**
· **Procesamiento del RNA en eucariotas (3 pasos)**: **cap 5'** (7-metilguanosina),
**poliadenilación 3'** (~200 A), **splicing** de intrones.
· **Función del cap 5'**: proteger de las **exonucleasas** ("exo" cortan desde los extremos; "endo"
por el medio).
· **Función de la cola poli-A**: el 5' ya está protegido; las exonucleasas atacan por el 3' → **una
cola más larga = más tiempo hasta la degradación** ⇒ **la cola poli-A fija la VIDA MEDIA del mRNA** y
por tanto limita cuánta proteína se fabrica.
· **Iniciación de la traducción**: la subunidad pequeña se une al cap 5' y avanza hasta el AUG; se le
une la grande, los factores de iniciación y el tRNA iniciador (Met o fMet) **que entra en el sitio P**
(**el único que entra por P; todos los demás por el sitio A**). **Procariota 30S + 50S · eucariota
40S + 60S.**

**10.5 VIH, hepatitis y oncogénesis viral** ✅/⚠
· **VIH** ✅/⚠: CD4 bajo → **ausencia de fiebre** ante infección grave e **IRIS** tras TARGA (§2.5).
**Candidiasis oral** como marcador de inmunosupresión ⚠.
· **VHB (DNA) vs VHC (RNA)** ⚠: el **VHB** fuerza a la célula a entrar en **fase S** para disponer de
dNTP y expresa proteínas que **inactivan p53 y Rb** → hepatocarcinoma **directo**, a tasas altas
**incluso sin cirrosis**. El **VHC** no necesita inducir división (el citoplasma ya tiene
ribonucleótidos) → el hepatocarcinoma es **indirecto y lento**, por años de inflamación crónica,
cirrosis y regeneración.
· **Serología de la vacuna VHB** ✅ (→ §6.3): contiene **HBsAg** pero **NO** el antígeno core →
vacunado = **anti-HBs positivo, anti-HBc NEGATIVO**.

**10.6 Antimicrobianos: lo único que hay es química (y es potente)** ✅ — **cae en D64 (mié 9-dic)**
La regla única: **"likes dissolve likes"** — pequeño + lipofílico + **sin carga** ⇒ cruza membranas
pasivamente ⇒ buena biodisponibilidad oral, buena penetración tisular y al LCR.
· **Metronidazol**: pequeño, muy lipofílico, **sin carga** → altísima biodisponibilidad oral, excelente
penetración pulmonar **y al LCR**.
· **Fluoroquinolonas**: pequeñas, lipofílicas, sin carga → ~100 % de biodisponibilidad oral y excelente
penetración al parénquima pulmonar.
· **Vancomicina**: polímero **grande y polar** → no penetra pasivamente membranas ni tejidos
avasculares (**abscesos no drenados**).
· **Lidocaína en tejido infectado**: el **pH ácido del absceso protona la amina terciaria** → la carga
positiva le impide cruzar la membrana neuronal para bloquear los canales de Na **desde dentro** →
**la anestesia local FALLA en tejido infectado**.
· **Lactulosa en encefalopatía hepática**: las bacterias la fermentan y acidifican el lumen → el NH3
no polar se protona a **NH4+ polar** → **atrapamiento iónico** → se elimina por heces.
· **La única vez que el corpus reconoce el peso de micro** ✅ (Glass of Wine, literal): *"USMLE
pharmacology is typically worth 40+ points on Step 1. With pathology, physiology, and **immuno/micro**,
it is one of the most important subjects."*
· ❌ **NO ESTÁN**: mecanismos de betalactámicos, cefalosporinas, aminoglucósidos, macrólidos,
tetraciclinas, antifúngicos y antivirales.

**10.7 Hongos y parásitos: VACÍO ESTRUCTURAL** ❌
Literal: *"Aspergillus, Cryptococcus, Pneumocystis, Toxoplasma, Malaria (falciforme/G6PD) y Giardia:
NO ESTÁ EN LAS FUENTES."* Única mención micológica: **Candida oral** en el VIH. **No insistir con más
consultas al cuaderno.** → **D64 se cubre íntegramente con Sketchy + First Aid + UWorld.**

### (c) High-yield del bloque (temario del plan, cubierto fuera del corpus salvo lo marcado)
Algoritmo de identificación bacteriana · exotoxinas · **genomas virales (+RNA infeccioso / −RNA no —
su demostración insignia ✅)** · serologías de VHB ✅ y VIH · TB ✅ (granuloma/PPD) · antimicrobianos
(⚠ solo química de membranas) · micosis ❌ · TORCH ❌ · **inmunodeficiencias primarias** ❌ ·
hipersensibilidades I-IV ✅ · rechazo y GVHD ❌ · MHC I vs II ✅ · citoquinas ✅ · vacunas vivas vs
inactivadas y **conjugadas** ✅.

### (d) Fuentes
Artículos ✅ (URLs conservadas de la v2):
[Why +RNA or -RNA?](https://www.yousmle.com/why-does-the-usmle-step-1-care-if-a-virus-has-rna-or-rna/) ·
[Could You Connect Conjugate Vaccines and ABO Incompatibility](https://www.yousmle.com/can-you-connect-conjugate-vaccines-and-abo-incompatibility-for-the-usmle-step-1/) ·
[Pharmacology Over a Glass of Wine](https://www.yousmle.com/how-to-master-pharmacology-for-the-usmle-step-1-over-a-glass-of-wine/) ·
[Cheat Sheets (índice)](https://www.yousmle.com/usmle-step-1-cheat-sheets/).
Vídeos con digresiones útiles ✅: [High Yield Immunology](https://www.youtube.com/watch?v=Nfp3hs490wM) ·
[High Yield GI](https://www.youtube.com/watch?v=8gfhX1aR9-A) (serología de hepatitis, SUH).
**Fuente principal real del bloque en el plan**: Sketchy Micro + First Aid + UWorld.

### (e) → En tu plan
**D57 = lun 30-nov (N1 — viernes con el sistema recién abierto: el bloque de sistema completo se hace
de Heme)** · **D58 = mar 1-dic (N1)** · **D59 = mié 2-dic (N2)** · **D60 = jue 3-dic (N2)** ·
**D62 = lun 7-dic (N2)** · **D61 = vie 4-dic → NBME 28 (N5 · 200Q)** · **D63 = mar 8-dic (N2)** ·
**D64 = mié 9-dic (N2)**.
Es el bloque donde **el porcentaje del día que depende de UWorld sube al máximo**: el pre-test de las
08:15 deja de ser "diagnóstico del tema" y pasa a ser **la fuente principal**. Aumenta el peso de la
shopping list y del log de errores.

---

## 11. Reproductor / OB-GYN

**→ En tu plan: D65-D69 = jue 10-dic-2026 → mié 16-dic-2026.**
Niveles: D65 N1 · D66 N1 (viernes con el sistema de <3 días) · **D67 (lun 14-dic) N2** · D68 N2 · D69 N2. Contenido: embriología
general + ciclo menstrual + hormonas (D65) · embarazo: fisiología, preeclampsia, TORCH (D66) ·
gineco-oncología: cérvix, endometrio, ovario (D67) · mama + aparato masculino + próstata (D68) ·
ITS + anticoncepción + amenorreas + SOP (D69). Vídeos:
[High Yield OB/GYN](https://www.youtube.com/watch?v=4D7MO0TR2fY) (D65) ·
[High Yield OB/GYN Part 2](https://www.youtube.com/watch?v=nYtSNyXh_Ww) (D66).

### (a) Concepto ancla y cadena causal
**Dos preguntas "estrella del norte" para no memorizar el ciclo** ✅:
**(1) ¿qué ESTRUCTURA produce las hormonas en esta fase? (2) ¿qué HORMONAS secreta esa estructura?**
```
FASE FOLICULAR (d1-14): folículo (granulosa) → ESTRÓGENO dominante, progesterona ≈ 0
   → hiperplasia endometrial (proliferación)
FASE LÚTEA (d14-28): cuerpo lúteo (restos de granulosa + teca, inducido y mantenido por el pico de
   LH) → estrógeno + PROGESTERONA (predominio masivo) → detiene la hiperplasia y decidualiza por
   TRES mecanismos: (a) ablanda el tejido ("pliable pillow" para el embrión), (b) vasculariza
   (arterias espirales dilatadas y tortuosas), (c) INMUNOTOLERANCIA local (el embrión lleva 50 % de
   genes paternos)
DOS CÉLULAS: teca interna (receptores de LH) sintetiza andrógenos desde colesterol → difunden a la
   granulosa (receptores de FSH) → AROMATASA → estrógenos
PICO DE LH: el estrógeno sostenido y muy alto al final de la fase folicular CAMBIA EL FEEDBACK de
   negativo a positivo → descarga de LH → rompe el folículo
MENSTRUACIÓN: sin hCG el cuerpo lúteo regresa (apoptosis) → caen ambas hormonas → descamación
GnRH PULSÁTIL estimula FSH/LH ; GnRH CONTINUA (leuprolide) → desensibiliza → SUPRIME el eje
```

### (b) Subtema a subtema

**11.1 Molimina menstrual — el dato que casi nadie sabe** ⚠
· **Molimina** = síntomas leves premenstruales (fatiga, cambios de humor, náusea y, casi
patognomónico, **mastalgia cíclica bilateral en cuadrante superoexterno**) que resuelven con el
sangrado; **mediados por la progesterona del cuerpo lúteo** → su presencia **indica ciclos ovulatorios**.
· **Regla del 93 %** ⚠: la **ausencia total de molimina tiene VPN 93 % para ovulación** → sin
molimina, 93 % de probabilidad de **sangrado anovulatorio**.
· **PREGUNTA TÍPICA** ⚠: "28 años, infertilidad de 2 años, ciclos cada 28-30 días de 4 días, **sin
ningún síntoma premenstrual**" → anovulación; confirmar con **progesterona sérica en mitad de fase
lútea (día 21)**: baja = no hay cuerpo lúteo.
· **ERROR canónico (literal)** ⚠: *"Just because a woman is bleeding doesn't mean she is ovulating…
regular bleeding can still be anovulatory breakthrough bleeding."*

**11.2 hCG y el trofoblasto** ⚠
Tras la implantación el **sincitiotrofoblasto** ("spiky fingers" del corion) secreta hCG; la hCG
comparte la subunidad **alfa** con la LH (la beta es muy similar) → se une a los **receptores de LH
del cuerpo lúteo** y lo mantiene en el **1er trimestre**; en el 2º-3er trimestre la placenta fabrica
sus propias hormonas → la hCG cae y el cuerpo lúteo degenera.
· **Tarjeta-modelo del artículo de Anki** ✅: *"Choriocarcinoma – use what cells it is derived from to
explain what hormone is elevated"* → deriva del trofoblasto → **hCG masivamente elevada**.

**11.3 Sangrado uterino anormal por isquemia — la cadena que unifica el bloque** ✅
```
Estrógeno SIN OPOSICIÓN (anovulación crónica, tumor secretor) → hiperplasia proliferativa
   → sin progesterona NO hay vascularización ni estabilización
   → "ISQUEMIA = DEMANDA MAYOR QUE OFERTA"  ← la misma ecuación de cardio (§3.10)
   → focos de NECROSIS y descamación irregular = SANGRADO UTERINO ANORMAL
   → crónicamente: hiperplasia → adenocarcinoma de endometrio en la posmenopáusica
```
· **PALM-COEIN** (marco de clasificación conservado de la v2): estructural — **P**ólipo,
**A**denomiosis, **L**eiomioma, **M**alignidad; no estructural — **C**oagulopatía, disfunción
**O**vulatoria, **E**ndometrial, **I**atrógena, **N**o clasificada.
· **ERROR** conservado de la v2: asumir que los períodos irregulares de la adolescente son "variación
normal" (casi siempre = **anovulación por inmadurez del eje HPO**) · sospechar adenomiosis o fibromas
en adolescentes (patología PALM de mujeres mayores/multíparas).

**11.4 Dismenorrea, endometriosis, adenomiosis y miomas** ✅
· **Dismenorrea primaria** = dolor menstrual **sin** enfermedad pélvica que lo explique (prostaglandinas
→ AINE) · **secundaria** = complicación de otra enfermedad.
· **Endometriosis**: *"el tejido endometrial normal, que solo debería estar dentro del útero"*, fuera
de él (trompas, ovarios, fondo de saco) → responde al ciclo y **sangra con la menstruación** → dolor
pélvico intenso.
· **Adenomiosis**: glándulas y estroma endometrial **dentro del miometrio** (*"literalmente menstrúas
dentro del músculo uterino: no me imagino el dolor"*) → hipertrofia/hiperplasia del miometrio → útero
**globular y SIMÉTRICO**, doloroso, con dismenorrea intensa y flujo abundante que no cede con
ibuprofeno; asociada a multiparidad y cirugía uterina previa.
· **Leiomioma**: *"leio = liso, mio = músculo, oma = benigno"* → neoplasia benigna monoclonal de
músculo liso → útero **agrandado, ASIMÉTRICO e irregular**; comprime el retorno venoso miometrial →
congestión → **menorragia** y dolor.
**⇒ La discriminación de examen es simétrico (adenomiosis) vs asimétrico (mioma).**

**11.5 Anovulación, amenorrea, prolactina y menopausia** ✅/⚠
· **Anovulación** ✅: *"hay una danza muy sincronizada entre hipotálamo, hipófisis y ovario; cualquier
fallo en cualquiera de esas categorías da anovulación."*
· **Hiperprolactinemia** ⚠: la prolactina alta **inhibe la GnRH pulsátil** → bajan LH/FSH → sin
maduración folicular → **amenorrea secundaria**. Y el prolactinoma **como masa** comprime el resto de
la hipófisis → **cefalea + panhipopituitarismo** (§7.1).
· **Menopausia** ✅: agotamiento folicular → menos estrógeno → atrofia endometrial y mucosa vaginal
fina → suelo pélvico débil → **prolapso de órganos pélvicos**; el estrógeno vaginal ayuda en prolapsos
leves pero *"no en los severos: hace falta algo físico que lo sostenga"* (pesario).
· **Infertilidad anovulatoria** ✅: **leuprolide PULSÁTIL** imita la GnRH fisiológica → sube LH/FSH
(infertilidad); **CONTINUO** → desensibiliza → suprime el eje (cánceres hormono-dependientes de
próstata y mama). Para el cáncer de mama ER+ se prefieren **SERM** (tamoxifeno, raloxifeno) porque el
leuprolide *"would essentially cause menopause"*.
· 🔎 **A VERIFICAR (05/08-sep)**: prueba de progesterona (medroxiprogesterona 10 días), definiciones
de amenorrea primaria a los 16/14 años, relación LH/FSH en el SOP, tamoxifeno como SERM en la clase de
leuprolide. **Contrastar con UWorld antes de usar como dato de examen.**

**11.6 Anticoncepción, trombosis y teratógenos** ✅
· **Anticonceptivos combinados** ⚠: suprimen la GnRH pulsátil y el pico de LH → sin ovulación; el
sangrado regular es **por deprivación** en los días de placebo.
· **Riesgo trombótico** ✅: el estrógeno **sube la síntesis hepática de factores** → completa la
**tríada de Virchow** en la fumadora que viaja → TVP → TEP (§9.11). Ejemplo canónico del
reordenamiento cronológico: *"empezó ACO hace 3 meses y fuma desde hace 5 años: la cronología real es
tabaco → ACO → dolor torácico."*
· **Factor V Leiden** ✅: presentación clásica = *"mujer de 20 años que empieza la píldora y desarrolla
TVP con o sin TEP"* (§9.8).
· **Anticoagulación en el embarazo** ✅: **heparina SÍ** (grande, cargada, polar: no cruza),
**warfarina NO** (*"apostaría muchos burritos a que cruza la placenta y a que no es bueno para el
bebé"*).
· **Teratógenos POR CONCEPTO** ✅: *"si el fármaco actúa en el cerebro, o se da oral, o existe en
transdérmico, hay altísima probabilidad de que cruce la placenta"* → antiepilépticos (carbamazepina,
fenitoína, valproato) por lipofilia. **Esto sustituye a memorizar la lista.**
· **Hormonas esteroideas** ✅: estrógeno, progesterona y testosterona derivan del colesterol → pequeñas,
lipofílicas, sin carga → **parche transdérmico** y **receptor intracelular/nuclear** (§7.2).

**11.7 Preeclampsia, eclampsia y HELLP** ⚠
```
PLACENTACIÓN ANORMAL: invasión inadecuada de las arterias espirales por el citotrofoblasto
   → vasos de alta resistencia y bajo flujo → ISQUEMIA PLACENTARIA CRÓNICA
   → factores antiangiogénicos sistémicos → DISFUNCIÓN ENDOTELIAL SISTÉMICA
   → riñón: endoteliosis glomerular → PROTEINURIA ; vasoconstricción → HTA
   → plaquetas se activan sobre el endotelio dañado → microtrombos → consumo plaquetario
     + hemólisis mecánica + enzimas hepáticas altas por congestión sinusoidal = HELLP
```
· **PREGUNTA TÍPICA** ⚠: primigesta de **34 semanas** con convulsión tónico-clónica en casa;
**PA 178/112**, proteinuria 3+ → **eclampsia** → vía aérea, control de PA (hidralazina/labetalol),
**sulfato de magnesio IV**, y **tratamiento definitivo = el parto** (feto y placenta).
· Enlace con el método ✅: la **hidralazina** es el fármaco-ejemplo del artículo de tarjetas (HTA del
embarazo; taquicardia refleja → beta-bloqueante; síndrome lupus-like) — §15.2.

**11.8 Incompatibilidad Rh vs ABO, RhoGAM y Coombs** ✅ → desarrollado en **§9.12** y **§2.4**.
Cae en **D66 (vie 11-dic)**; es el mismo artículo que sostiene inmunología y transfusión: **una sola
cadena, tres días del plan**.

**11.9 Gineco-oncología** ✅/⚠
· **Tumores de células germinales — por qué son raros en la mujer y suben en la pubertad en el varón**
✅: las células germinales femeninas **dejan de dividirse antes de nacer** (ovocitos detenidos en
profase I) → pocas mitosis → tumores germinales raros; las masculinas **empiezan a dividirse rápido y
sin parar desde la pubertad** → acumulan errores de replicación → los tumores germinales testiculares
**suben bruscamente en la pubertad/juventud** y luego bajan.
· **Cáncer de ovario** ✅: la mayoría de los malignos "ováricos" (cistadenocarcinoma seroso) **nacen en
la trompa** y se extienden a la superficie del ovario. ❌ CA-125, tipos histológicos y torsión: no están.
· **Mama** ✅: la mastalgia cíclica es molimina mediada por la progesterona lútea; se localiza en el
**cuadrante superoexterno porque es la zona de mayor densidad glandular** — **y por la misma razón ahí
son más frecuentes el fibroadenoma y el cáncer** (*"¿en qué cuadrante ocurre más el cáncer de mama y
por qué?"*). **Fibroadenoma** (*fibro* = estroma, *adeno* = glándula, *oma* = benigno): masa firme,
elástica, **móvil**, bien circunscrita, en < 30 años; **hormono-sensible** (crece con estrógeno y se
encoge tras la menstruación); conducta: observación y reaseguro. ❌ BRCA y ginecomastia: no están.
· ❌ **Cérvix/HPV**: E6/E7, p53/Rb y citología **no están en las fuentes** (la única mención a "HPV" del
corpus es probablemente un error de transcripción sobre la vacuna de hepatitis B: **no usarla**).
· ❌ **Mola hidatiforme, placenta previa/abruptio/acreta, diabetes gestacional, parto pretérmino,
hiperemesis, oxitocina**: no están.

**11.10 Desarrollo sexual y cromosomopatías** ✅
· **Turner (45,X)**: en las células somáticas femeninas un X se inactiva al azar (cuerpo de Barr), pero
**las células germinales NO lo inactivan** (necesitan ambos X para migrar/desarrollarse) → en Turner
los ovocitos sufren **apoptosis masiva** → **streak ovaries** → sin estrógeno → sin caracteres
sexuales secundarios → **amenorrea primaria**. Conserva útero y trompas porque **sin Y no hay Sertoli
ni hormona antimülleriana**. Sin folículos → sin estrógeno ni inhibina → **LH y FSH ALTAS**
(hipogonadismo hipergonadotrópico). **Talla baja** *"aunque esperarías que fueran altas sin estrógeno:
la explicación viene de un artículo de los años 60"* (🔎 el gen **SHOX** lo aporta NotebookLM, **no
aparece en la cita** → A VERIFICAR).
· **Klinefelter (47,XXY)** ✅: el X extra altera la meiosis en la pubertad → las germinales mueren →
atrofia testicular (testículos pequeños y duros, hialinización tubular) → menos testosterona →
**LH/FSH crónicamente altas** → sin testosterona ni estrógeno **no se cierran las epífisis** → siguen
creciendo con la GH → **talla alta en el ADULTO**.
**LA TRAMPA, con caso real** ✅: *"clásico salvo que eran adolescentes y no eran altos"* — una alumna
descartó Klinefelter por eso. Y el uso metodológico que le da: es el ejemplo canónico de **rule-in vs
rule-out** — *"Klinefelter is not the perfect answer (no lo describen alto) but it is a BETTER answer
than the alternative"*: comparar lado a lado en vez de eliminar por un detalle imperfecto.
· **HSC** ✅ (como ejemplo de tarjeta cloze de AnKing): *"11β-hydroxylase deficiency presents with
hypokalemia and hypertension due to increased mineralocorticoids; there is no salt wasting, which is
seen with 21β-hydroxylase deficiency (salt wasting, hypotension)."*
· ❌ **Síndrome de insensibilidad a andrógenos: no está.**

**11.11 Urología / andrología** ✅/❌
· **Próstata** ✅: solo está que **las metástasis óseas del cáncer de próstata son OSTEOBLÁSTICAS** →
más remodelado → **ALP alta** (§6.2). ❌ HPB, cáncer localizado, PSA, finasterida y alfa-bloqueantes:
no están.
· **Incontinencia urinaria — repaso completo de la clase** ✅ (HY FM 2):

| Tipo | Mecanismo | PVR |
|---|---|---|
| **Urgencia** | detrusor hiperactivo por pérdida de la inhibición de la **neurona motora superior** (lesión suprasacral) | normal/bajo |
| **Esfuerzo** | suelo pélvico / esfínter externo débiles (partos, obesidad, déficit estrogénico) → escape con tos/risa | normal |
| **Rebosamiento** | detrusor hipocontráctil u obstrucción → la vejiga se llena hasta vencer el esfínter → **goteo continuo que empeora con el esfuerzo** ("parece de esfuerzo pero no encaja") | **masivo (p. ej. 500 mL)** |
| **Funcional** | vejiga y sistema nervioso normales, limitación física o cognitiva para llegar al baño | — |

**VIÑETA literal** ✅: *"68 años, cinco meses de goteo urinario…"* — resuelta **por la calidad de los
descartes**, con la regla *"la ausencia de evidencia no es evidencia de ausencia"*.
· ❌ Hidrocele, varicocele, torsión, epididimitis, criptorquidia, hipospadias: no están.

### (c) High-yield del bloque
Ciclo menstrual y anovulación (eje HPG, SOP, amenorrea) · esteroidogénesis, hCG y fisiología del
embarazo · desarrollo sexual (insensibilidad androgénica, Turner, Klinefelter) · anticonceptivos,
SERM, leuprolide · mama y ovario · preeclampsia/HELLP · Rh vs ABO · incontinencia.

### (d) Fuentes
Vídeos ✅: [High Yield OB/GYN](https://www.youtube.com/watch?v=4D7MO0TR2fY) ·
[High Yield OB/GYN Part 2](https://www.youtube.com/watch?v=nYtSNyXh_Ww) ·
*High Yield Family Medicine Review Part 2* (preeclampsia, incontinencia, menopausia) ·
*Pediatrics Shelf Review* (Turner, Klinefelter).
Artículos ✅ (URLs conservadas de la v2):
[Curso Yousmle OB/GYN](https://course.yousmle.com/courses/ob-gyn/sexual-development-menstrual-cycleanovulation) ·
[Med School Anki (sincitiotrofoblasto / coriocarcinoma)](https://www.yousmle.com/med-school-anki/) ·
[Could You Connect Conjugate Vaccines and ABO Incompatibility](https://www.yousmle.com/can-you-connect-conjugate-vaccines-and-abo-incompatibility-for-the-usmle-step-1/).

### (e) → En tu plan
**D65 = jue 10-dic (N1)** · **D66 = vie 11-dic (N1 — viernes con el sistema de <3 días: el bloque de
sistema completo se hace del ANTERIOR, Micro/ID)** · **D67 = lun 14-dic (N2)** · **D68 = mar 15-dic
(N2)** · **D69 = mié 16-dic (N2)**.
Bloque sin hito en medio. **En v5.9 Repro se queda sin viernes de nivel 3** (en la v5.8 lo tenía en
D67, gineco-oncología; en la v5.7, en mama/masculino): su único viernes, D66, abre el sistema. Usa
igualmente **D67 (cérvix/endometrio/ovario) como gate propio de 20Q timed**, con las cadenas de
D65 · D66 (ciclo y placenta) ya automáticas.

---

## 12. Musculoesquelético / Reumatología / Derma Step 1

**→ En tu plan: D70 · D72 (jue 17-dic y lun 21-dic) + D73 (mar 22-dic-2026).** Niveles: D70 N1 · D72 N1 · D73 N2.
Contenido: artritis (AR/OA/gota/espondiloartropatías) + autoanticuerpos (D70) · LES,
conectivopatías y vasculitis (D72) · hueso (osteoporosis/Paget/tumores) + anatomía MSK high-yield
(plexos, nervios) + **dermatología Step 1** (D73). Inmediatamente después: **D71 = NBME 29 (vie 18-dic)**.

> **Aviso de cobertura** ✅: **no hay vídeo dedicado de MSK ni de reumatología** en las 295 fuentes. Lo
> que existe está disperso en HY Immunology (inflamación/granulomas), HY Pharmacology 2 (miastenia,
> hipertermia maligna, calcio), HY Family Medicine 1 (lupus y ANCA como digresiones) y en artículos
> (Paget como tarjeta canónica, digoxina/Trousseau). **Reuma = inmunología aplicada**: el marco de §2
> es lo que hay que traer aquí.

### (a) Concepto ancla
**Inflamación crónica → macrófago activado → sus citocinas** (§2.1) explica el solapamiento clínico de
**sarcoidosis, TB, lepra, cáncer, vasculitis, lupus y artritis reumatoide**: fiebre, sudores
nocturnos, pérdida de peso y VSG alta. **Buscar el macrófago** ✅ es la instrucción operativa.
Y el segundo eje: **calcio, umbral de despolarización y remodelado óseo** (PTH / vitamina D, §7.4).

### (b) Subtema a subtema

**12.1 Enfermedad de Paget: el ejemplo canónico de tarjeta (y la herida personal de Alec)** ✅
· **Tarjeta MALA** (hechos sueltos): *Front:* "Paget's Disease". *Back:* "↑ actividad osteoblástica y
osteoclástica; puede causar shunt; puede presentar hipoacusia; riesgo de osteosarcoma".
**Crítica**: si recuerdas tres y olvidas el osteosarcoma pulsas "Again" y **re-estudias el 80 % que ya
sabías**.
· **Tarjeta BUENA (patogénesis → presentación), texto literal** ✅:
> *Front:* **"Paget's Disease – pathogenesis? How can it lead to hearing loss?"**
> *Back:* "↑ actividad osteoblástica y osteoclástica → arquitectura anómala de **hueso trabecular
> 'woven'** → estrechamiento del **foramen auditivo** (comprime el nervio vestibulococlear) →
> hipoacusia progresiva."
· **El caso personal, que vale como lección de método** ✅: Stanford le enseñó poco de hueso → se
sentía inseguro en MSK → **cada vez que dudaba asumía "no sé suficiente"** (*"la fosfatasa alcalina
parece algo alta… no debe ser"*) → fallaba casi todas las de hueso. Se arregló **dominando Paget Y
desmontando la asunción**: aun cubierto el vacío de contenido, siguió fallando hasta gestionar la
creencia. **Modelo**: tras un fallo ≈ **20 % cognición negativa / 80 % brecha real**; *"and, not
either/or"*.

**12.2 Hueso, calcio, vitamina D y PTH** ✅ → desarrollado en **§7.4**. Lo que hay que traer a D73:
· Vitamina D: piel (UV) → 25-OH hepática → **1-alfa-hidroxilasa del túbulo proximal** (estimulada por
PTH) → calcitriol → sube Ca y P intestinales.
· **ERC** → menos 1-alfa-hidroxilasa + retención de fosfato → hipocalcemia → **hiperparatiroidismo
secundario** (dolor óseo, fracturas).
· **Sarcoidosis** → 1-alfa-hidroxilasa **autónoma** en los macrófagos epitelioides →
hipercalcemia/hipercalciuria/litiasis.
· **Calcio y excitabilidad** ✅ (Art. Digoxina, íntegro — las 7 preguntas "patogénesis → presentación"):
```
(1) La Na+/K+ ATPasa saca 3 Na+ y mete 2 K+ con ATP
(2) La digoxina la bloquea → sube el Na+ intracelular → menos intercambio Na+/Ca++ → sube el Ca++
    intracelular → sube la contractilidad
(3) K+ y digoxina COMPITEN por el mismo sitio → "BEWARE DIGOXIN TOXICITY IN HYPOKALEMIA"
(4) Isquemia transitoria → baja el ATP → la bomba se para → se acumulan iones dentro → entra agua
    → EDEMA CELULAR REVERSIBLE
(5) HIPERCALCEMIA eleva el umbral en todo el cuerpo → lentitud, fatigabilidad, debilidad,
    arreflexia, hasta coma
(6) HIPOCALCEMIA baja el umbral → CHVOSTEK ("tapping of facial nerve → contraction of facial
    muscles") y TROUSSEAU ("occlusion of brachial artery with BP cuff → carpal spasm")
(7) El manguito → isquemia transitoria → baja el ATP → la membrana se despolariza parcialmente →
    queda "CLOSER to threshold" → con el umbral ya bajo por la hipocalcemia, ESPASMO CARPAL
```
**Corrección expresa registrada** ✅: el artículo **NO** dice que la digoxina cause hipocalcemia; lo que
une los tres temas es **la bomba Na/K y el umbral**.
· **Osteomielitis** ✅: VSG/PCR se usan *"muchísimo en pediatría, sobre todo para osteomielitis"*; el
tema común es la inflamación.
· **Hiperuricemia/gota como consecuencia bioquímica** ✅: en von Gierke, sube el G6P → HMP → PRPP →
purinas → **xantina oxidasa** → ácido úrico (§15.4). ❌ **La gota como entidad clínica no está.**
· 🔎 **A VERIFICAR (05-sep)**: vitamina C y colágeno (escorbuto) — afirmado sin cita válida.

**12.3 Músculo esquelético: acoplamiento excitación-contracción** ✅ → §8.11.
En esquelético el canal dihidropiridínico está **acoplado mecánicamente** al receptor de rianodina
(**no entra calcio**); en cardíaco y liso hay **liberación de Ca inducida por Ca** → por eso los
**bloqueadores de canales de calcio no dan debilidad esquelética**. Contracción muscular = calor →
hipertermia maligna y escalofríos.

**12.4 Autoinmunidad, vasculitis y "la lista de la inflamación crónica"** ✅
· **Ejercicio literal de la clase**: *"usando la ciencia y los síntomas de la **arteritis de células
gigantes** (etiología idiopática), construye una patogénesis"*:
```
Antígeno desconocido en la pared vascular → estímulo inflamatorio crónico
   → activa células T → activan MACRÓFAGOS
   → IL-1 (fiebre) · IL-6 (VSG/reactantes) · TNF-alfa (pérdida de peso) · IFN-gamma (granulomas)
   → fiebre, sudores nocturnos, escalofríos, pérdida de peso, inflamación
"Aunque no puedas probarlo, es mejor una historia donde encajen los hechos que memorizar datos sueltos"
```
· **Granuloma = hipersensibilidad tipo IV**; célula definitoria = **epitelioide**, NO la gigante
(§2.2) — *"pregunta segura del examen con 'giant cell' como distractor"*.
· **LES: ¿por qué mujeres en edad fértil?** ⚠ → §2.6 (hipótesis de la menstruación como **necrosis** +
el estrógeno que reduce la apoptosis de las B autorreactivas). *"Hay agujeros en la teoría, pero lo
que quiero que recuerdes es que ocurre en mujeres en edad fértil."*
· **Wegener / GPA pauci-inmune** ✅: los **ANCA** se unen al neutrófilo y, con suficientes anticuerpos,
lo **activan** — *"como tener un montón de granadas"* → destruyen el tejido renal **sin depósito** →
inmunofluorescencia **negativa** (§2.3, §5.7).
· **Lupus inducido por fármacos** ✅: la **hidralazina** produce síndrome lupus-like; en la tarjeta se
**separa** del bloque cardiovascular porque no encaja en la cadena de poscarga; el **rash fotosensible
malar** es el efecto adverso **específico** que permite identificar el fármaco (regla "cover the
responses", §15.2). ❌ Mecanismo anti-histona: no está.
· **HIT como autoinmunidad inducida por fármaco** ✅ → §9.9.
· **Miastenia gravis** ✅ → §8.11 (más succinilcolina, menos no despolarizante; plasmaféresis).
· ❌ **NO ESTÁN** (declarado explícitamente; cubrir con First Aid + UWorld): LES como entidad de
laboratorio (anti-dsDNA como criterio, anti-Smith, complemento, nefritis lúpica) · AR vs artrosis
(rigidez matutina, FR, anti-CCP, pannus) · el resto del panel de autoanticuerpos (anti-centrómero,
Scl-70, Jo-1, anti-histona) · Takayasu, PAN, Kawasaki, Buerger, Henoch-Schönlein · esclerodermia ·
dermatomiositis/polimiositis · polimialgia reumática · gota y pseudogota como entidades ·
osteoporosis · osteomalacia/raquitismo · artritis séptica · tumores óseos · lesiones de nervios
periféricos · Lambert-Eaton · fibromialgia.
❌ **Dermatología Step 1 tampoco tiene fuente propia en el corpus.**

### (c) High-yield del bloque
Artritis por patrón (inflamatoria vs mecánica) y autoanticuerpos ❌corpus · LES y vasculitis ⚠ ·
vía IL-1/IL-6/TNF/IFN-gamma ✅ · granuloma ✅ · Paget ✅ y remodelado óseo ✅ · calcio, PTH y vitamina D ✅ ·
NMJ e hipertermia maligna ✅ · anatomía MSK high-yield (plexos, nervios) ❌corpus · derma Step 1 ❌corpus.

### (d) Fuentes
Vídeos ✅: [High Yield Immunology](https://www.youtube.com/watch?v=Nfp3hs490wM) ·
[High Yield Pharmacology Part 2](https://www.youtube.com/watch?v=PvKp25ku0po) ·
*High Yield Family Medicine Review Part 1* (LES, ANCA).
Artículos ✅ (URLs conservadas de la v2):
[How I Improved My USMLE Step 1 60 Points in 2 Months (tarjeta de Paget)](https://www.yousmle.com/step-1-usmle-high-yield-study/) ·
[5 Keys Anki/Spaced Repetition](https://www.yousmle.com/5-keys-rock-usmle-step-1-anki-spaced-repetition/) ·
[Digoxin / Reversible Cell Damage / Trousseau](https://www.yousmle.com/usmle-step-1-bosses-digoxin-reversible-cell-damage-trousseaus-sign/) ·
[UWorld Note-Taking](https://www.yousmle.com/uworld-notes/) ·
[Test Taking Anxiety](https://www.yousmle.com/test-anxiety/) ·
[High-Yield MSK — The Match Guy](https://thematchguy.com/usmle-step-1-high-yield-musculoskeletal-concepts/).

### (e) → En tu plan
**D70 = jue 17-dic (N1)** · **D72 = lun 21-dic (N1)** · **D71 = vie 18-dic → NBME 29 (N5 · 200Q)** ·
**D73 = mar 22-dic (N2)** — en v5.9, igual que en v5.8, el NBME 29 (D71, vie 18-dic) **parte** el bloque MSK en vez de cerrarlo. Es el bloque **peor cubierto por el corpus junto con
micro y psiquiatría**: aquí el rendimiento depende casi por completo de UWorld + First Aid con el
método. Trae de vuelta explícitamente §2.1 (citocinas), §2.2 (granuloma) y §7.4 (calcio-PTH).
**Aviso personal de Palmerton aplicable a Joseph**: si al fallar una de hueso aparece el pensamiento
*"es que no sé suficiente de esto"*, eso es **la cognición negativa del 20 %** — hay que anotarla en
el log de errores como *proceso*, no solo como *knowledge gap*.

---

## 13. Psiquiatría y ciencias del comportamiento

**→ En tu plan: D74-D76 = mié 23-dic-2026 → lun 28-dic-2026.** Niveles: D74 N1 · D75 N1 · D76 N2.
Contenido: trastornos del ánimo + psicóticos + esquema DSM (D74) · ansiedad, personalidad, infancia
(TDAH/autismo) y sustancias/toxidromes (D75) · **psicofármacos: antidepresivos, antipsicóticos, litio,
ansiolíticos (D76)**.

> ### ⚠⚠ ADVERTENCIA ESTRUCTURAL
> **No hay ningún vídeo ni artículo de psiquiatría clínica en las 295 fuentes** ✅. NotebookLM declaró
> explícitamente que faltan bipolar, esquizoafectivo, trastornos de personalidad, toxicidad por
> benzodiacepinas, tricíclicos, IMAO, litio, antipsicóticos, síndrome neuroléptico maligno y
> mecanismos de defensa. **Lo que sí hay es (a) UNA regla clínica, (b) el modelo de ADHD del propio
> Alec, y (c) toda la psicología del examen (que no es psiquiatría clínica pero sí es tuya).**
> → `pendiente_usuario`: **D74-D76 se cubren con First Aid + UWorld aplicando el método.**

### (a) Lo que SÍ está — verificado

**13.1 Esquizofrenia vs esquizofreniforme: solo la duración** ✅
Caso real de tutoría: *"una paciente con signos obvios de esquizofrenia, pero sus compañeras de piso
solo lo notaron en los últimos 3 meses → **NO es esquizofrenia (exige ≥ 6 meses) → esquizofreniforme
(≥ 1 mes y < 6 meses)**."* Lo usa como ejemplo de **leer la cronología de la viñeta antes de saltar al
diagnóstico** (es la **C de Cronología** del CCSN aplicada a psiquiatría).

**13.2 ADHD — el modelo de Alec (artículos propios, leídos íntegros)** ✅
Idea nuclear tomada de Russell Barkley: a diferencia de la esquizofrenia, que tiene **síntomas
positivos** (alucinaciones, delirios: *"algo que la gente normalmente no tiene"*), **el ADHD es
cuestión de GRADO** — "la parte alta de la campana": todos somos inatentos o impulsivos a veces.
Los seis signos que enumera:
1. **Impulsividad / hiperatención** más que inatención — *"ante una tarjeta de Anki difícil, abro el
   email reflexivamente: huyo de lo incómodo"*.
2. **Medidas extremas como adaptación** ("todo o nada"): sin smartphone en instituto, universidad y
   casi toda la residencia; vivir a 20-30 min por la línea naranja del metro de Boston para estudiar
   en el trayecto con un iPod sin internet; dietas restrictivas tipo keto.
3. **Hiperfoco / adicciones** (Starcraft cortado en seco; lo mismo canalizado en Anki).
4. **Procrastinación y evitación = respuesta de lucha-huida** ante una amenaza psicológica (tarjeta
   difícil, test) con fallo de función ejecutiva. Contramedidas: bloqueos de internet por la mañana y
   **plazos naturales** (*"estudiar a las 6:00 antes de la clase de las 9:00 porque por la noche mi
   autocontrol es más débil y no hay plazo"*).
5. **Fidgeting y tics motores** (parpadeo, mover la pierna) — "signos inespecíficos".
6. **Desregulación emocional.**
Complementos literales: *"block my access to e-mail from 6 PM to noon the next day"* · *"brick my
phone every night at 8:30"* · *"soy un procrastinador maestro y un perfeccionista en recuperación con
ADHD limítrofe"* · **"la procrastinación no es un defecto de carácter: es una respuesta evolutiva;
los organismos unicelulares huyen de las amenazas y el cerebro trata igual una amenaza psicológica
que una física"**.
**→ Uso directo para Joseph**: esto es doctrina aplicable a la franja 05:00-12:00 y a la ingeniería
del entorno (Parte V.C), no material de examen.

**13.3 Fragmentos dispersos utilizables** ⚠
· **ISRS y la aprobación de fármacos**: para aprobar los ISRS en depresión *"necesitabas dos estudios
positivos"*; los negativos no se publican; *"con p = 10 % en 100 estudios, 10 saldrían positivos"*
(→ §14, crisis de replicación).
· **Opioides**: cruzan la BHE (neuroactivos) → orales/parche/placenta; **metilnaltrexona** (amina
cuaternaria, no cruza) trata el estreñimiento **sin precipitar abstinencia** porque la abstinencia es
central (§15.1).
· **Cafeína y nicotina**: mismo razonamiento de membrana.
· **Alcohol/Wernicke** 🔎 **A VERIFICAR (05-sep)**: *"dar glucosa sin tiamina precipita Wernicke"* —
afirmado sin cita válida; **la B1 fue declarada ausente del corpus** → tratarlo como First Aid.
· **Delirium/demencia**: no como entidades; sí la observación de que los ancianos con meningitis
*"pueden no hacer fiebre y quedar casi catatónicos, confundiéndose con depresión"* ✅ (§2.5).
· **Anorexia de la enfermedad crónica** ✅: **TNF-alfa ("caquectina")** suprime el apetito y moviliza
lípidos y proteínas (§2.1).
· **Síndrome de Reye** ✅: aspirina en niños con virosis → **cerebro e hígado** (vómitos en proyectil,
*"actúan como locos"*); caso que desarrolló **maldición de Ondina**.
· 🔎 **A VERIFICAR (05-sep)**: los criterios DSM-5 de trastorno de ansiedad generalizada (3 de 6) —
NotebookLM los afirmó pero la cita apunta a un artículo sobre "flow" que no los contiene.

**13.4 Psicología del examen (extensa en el cuaderno; no es psiquiatría clínica pero es tuya)** ✅
"Bad test-taker" como **identidad vs habilidad** · **negative cognitions** ("I'm not good enough") ·
**affect labeling** (nombrar la emoción reduce su intensidad) en el drill *"Oh F#@& → OK"* ·
journaling de tres listas · **EMDR** para heridas antiguas · **regla de los 2 minutos** → todo
desarrollado en la **Parte IV**.

### (b) Cobertura a resolver con First Aid + UWorld
Criterios DSM (depresión, bipolar, esquizoafectivo, TOC, TEPT — **la duración esquizofrenia vs
esquizofreniforme sí está**), sustancias (alcohol, opioides, cocaína, benzodiacepinas), litio,
tricíclicos, IMAO, antipsicóticos, **síndrome serotoninérgico vs neuroléptico maligno**, mecanismos de
defensa, desarrollo, suicidio, conducta alimentaria.
**Método a aplicar** ✅: psicofármacos **por mecanismo → efecto → escenario**, con la regla de
**efecto adverso ESPECÍFICO > inespecífico** (rash malar sí, náusea no) para poder identificarlos
(§15.2).

### (c) Fuentes
Artículos del propio Alec ✅: *6 Signs of ADHD I Missed as a High Achiever* · *ADHD Superpowers: 5
Weaknesses That Drove My Success* · *How to Stop Med School Procrastination* ·
[Test Taking Anxiety](https://www.yousmle.com/test-anxiety/) ·
[9 Habits to Quit for USMLE 260+](https://www.youtube.com/watch?v=Kj7tAyooE3o).

### (d) → En tu plan
**D74 = mié 23-dic (N1)** · **D75 = jue 24-dic (N1)** · **D76 = lun 28-dic (N2)**.
Junto con Micro y MSK, es uno de los **tres bloques sin columna vertebral Palmerton**. Compensación:
psiquiatría es de los sistemas donde el **CCSN (cronología + severidad)** rinde más — el caso de la
esquizofrenia vs esquizofreniforme es exactamente eso.

---

## 14. Bioestadística, epidemiología y ética

**→ En tu plan: D77 = mar 29-dic-2026 (nivel UW 2 · 40Q) + AMBOSS HY Biostats 155Q.**
Vídeo: *Biostatistics SUMMARY STEP 1 + 2 — The Basics USMLE* (dos sesiones íntegras).

### (a) Concepto ancla
> Apertura literal ✅: *"las preguntas de bioestadística son **puntos gratis** del USMLE: examinan los
> mismos conceptos centrales cada vez, pero la mayoría **memoriza las fórmulas de sensibilidad,
> especificidad y VPP, y eso es pensar al revés** ('backwards thinking'): pierde tiempo y crea
> errores. El problema no es la matemática: es que no tienes un mapa mental."*
> **Nota crítica de cobertura** ✅: tras esa apertura, **el vídeo NO desarrolla sens/esp/VPP**. El
> "marco" que enseña es **exposición → desenlace → relación + diseño + medida + error**.
```
Todo estudio mira TRES cosas: EXPOSICIÓN, DESENLACE y LA RELACIÓN entre ambos
Y en el fondo pregunta UNA sola: "¿son diferentes dos (o más) grupos?"
```
· **Táctica de aprendizaje que manda** ✅: explicar cada definición **"en inglés llano"** (*"si suenas
técnico pero no puedes dar un ejemplo, no lo entiendes"*), **repetirla cinco veces frente al espejo**,
**diseñar tú mismo los cuatro estudios** para tabaco → cáncer de pulmón, y hacer preguntas de QBank de
estadística. (Honestidad: *"no soy experto — ni PhD ni máster; llegué a entenderlo al tener que
enseñarlo."*)

### (b) Subtema a subtema

**14.1 Diseños** ✅
`Retrospectivo = mira atrás · prospectivo = mira adelante · OBSERVACIONAL = el investigador NO
controla la exposición · INTERVENCIONAL = SÍ la controla.`
· **Casos y controles**: retrospectivo observacional; se parte del **DESENLACE** (enfermos vs
controles emparejados) y se mira atrás la exposición. *"El estudio más confuso de todos."* Medida:
**odds ratio**. Sesgo típico: **RECUERDO** — quien tiene cáncer cerebral *"ha pensado docenas de veces
qué lo causó"* y recordará más su uso del móvil; ejemplo anestésico: *"cero evidencia de que la
epidural cause lumbalgia, pero quien tiene lumbalgia recuerda la epidural"*.
· **Cohortes**: prospectivo observacional; se parte de la **EXPOSICIÓN** y se sigue la incidencia;
*"controlas todo excepto la exposición"*. Medida: **riesgo relativo**.
· **ECA**: el único intervencional relevante; *"tu diseño donde asignas quién usa móvil es un ECA, no
una cohorte"*; para tabaco sería asignar 50 personas a fumar — *"ningún comité ético lo aprobaría;
los ECA son para tratar, no causar"*.
· **Transversal**: foto en un momento; malo para tabaco (los enfermos ya habrán dejado de fumar);
mejor para exposiciones geográficas.

**14.2 OR vs RR — la pregunta de integración estrella** ✅
```
OR: "si TENGO cáncer cerebral, ¿cuántas veces más probable es que en el PASADO usara mucho el móvil?"
    (parte del DESENLACE, mira atrás)
RR: "si uso mucho el móvil, ¿cuántas veces más riesgo tengo de DESARROLLAR cáncer?"
    (parte de la EXPOSICIÓN, mira adelante)
OR = 2 → los enfermos tienen el doble de odds de haber estado expuestos
RR = 2 → los expuestos tienen el doble de riesgo. RR = 1 → mismo riesgo; OR = 1 → misma exposición previa
```
> *"Suenan iguales, son muy distintas; **con una sola tarjeta repasas casos-controles, cohortes, OR y
> RR**."* ✅ Pregunta literal de la diapositiva de integración: *"¿Qué diferencia hay entre un OR de 2
> y un RR de 2?"*

**14.3 Hipótesis, p, alfa, beta y poder** ✅
· **H0** = no hay diferencia; **H1** = sí la hay (*"no dicen 'iguales': dicen 'no diferentes'"*).
· **p** = **probabilidad de que la diferencia observada entre los grupos se deba al azar**. **p = 0,05
es arbitrario** (*"1 de cada 20 veces aceptamos creer que hay diferencia cuando no la hay"*).
**ERROR típico de estudiante** ✅: leer p = 0,03 como "el 3 % de la diferencia es azar". Reformulación
útil de una alumna que él valida: *"si repito el experimento 100 veces, en 3 la diferencia sería azar
y en 97 real"*.
· **Truco para no confundir el umbral** ✅: piensa en el extremo (p = 0,8 → 80 % azar → nadie lo
llamaría significativo). *"Si lo entiendes nunca dudarás si es por encima o por debajo; el día del
examen dudas de todo lo que no entiendes y **por eso se acaba el tiempo**."*
· **Tamaño muestral** ✅: **más n → menos p**. *"RR = 3 con p = 0,03 parece p alta para tanta
diferencia → muestra pequeña."* **Pregunta típica: ¿qué cambiarías para bajar la p? → aumentar la
muestra.**
· **Errores** ✅: **tipo I** = rechazar H0 cuando es verdadera ("caímos en ese 5 %"); **alfa** = la tasa
de error tipo I que fijamos → por eso los libros dicen "p = alfa". **Tipo II** = no rechazar H0 cuando
es falsa (*"triple negativo: no rechazas que no hay diferencia cuando sí la hay"*); **beta** = su
probabilidad; **poder = 1 − beta**; **más n → menos beta**.
· **Significancia estadística ≠ clínica** ✅: té de diente de león que baja la sistólica **2 mmHg** con
p < 0,05 gracias a **20 000 sujetos**; quitar el 90 % de la sal bajaría 5 mmHg — *"¿lo harías?"*.
· **Crisis de replicación** ✅: *"artículo en PLOS: la mayoría de los estudios publicados son falsos"*;
nadie repite estudios; la aprobación de los ISRS exigía **dos ensayos positivos** y los negativos no
se publican.

**14.4 Sesgos y razonamiento** ✅/⚠
· **Recuerdo** ✅ (casos y controles).
· **Selección / "evidencia silenciosa"** ⚠ (Taleb): 100 ratas irradiadas, sobreviven las 3 más
fuertes; concluir que *"la radiación fortalece"* **ignora a las que murieron**.
· **Anclaje y confirmación** ✅: el síncope del diabético con bloqueo AV completo a 42 lpm (§3.9).
· **Confusión** ✅: solo mencionada como algo que se **controla emparejando** (edad, sexo).
· **"Ausencia de evidencia no es evidencia de ausencia"** ✅: *"si fuera esto esperaría todos estos
síntomas — no necesariamente: clínicamente las enfermedades no se presentan con todos los síntomas"*.
**Es lo más cercano a "sensibilidad" que hay en todo el cuaderno.**
· **Intervalo de confianza** ⚠: solo como comentario de una alumna (*"p = 0,05 es un IC del 95 %, dos
desviaciones estándar"*) que **él no desarrolla**.

### (c) ❌ Vacíos confirmados (dos consultas independientes) — **cubrir con el paquete de stats de UWorld**
**Sensibilidad, especificidad, VPP, VPN, prevalencia, curva ROC** (toda mención de "ROC" en el corpus
es **"pROCrastinación"**), likelihood ratios, SnNout/SpPin, **NNT/NNH/ARR/RRR**, intervalos de
confianza como concepto, **lead-time y length-time bias**, sesgo del observador, Hawthorne, confusión
formal, t-test/chi²/ANOVA/correlación, precisión vs exactitud, niveles de prevención, incidencia vs
prevalencia cuantitativa.
**El propio Palmerton remite para stats al "paquete de UWorld"** ✅ (comentarios de Glass of Wine).

### (d) High-yield del bloque (conservado de la v2)
Tabla 2x2 (sens/esp, VPP/VPN y prevalencia) · RR/OR/ARR/RRR/NNT · tipos de estudio y jerarquía ·
sesgos · IC y poder · ROC · media/mediana en distribuciones sesgadas. **Es el mejor quick win del
examen (~4-10 % del total, dominable en 1-2 semanas)**; complemento comunitario: Randy Neil MD.

### (e) → En tu plan
**D77 = mar 29-dic-2026 (nivel UW 2 · 40Q)**, con **AMBOSS HY Biostats 155Q**. Un solo día: por eso
la mitad "que sí está" (diseños, OR/RR, p/alfa/beta/poder, sesgos) se resuelve con el vídeo y **la
otra mitad (sens/esp/VPP/ROC/NNT) exige el paquete de UWorld el mismo día**. Es el día con mayor
ratio puntos/hora del plan entero: **no negociarlo**.

---

## 15. Bioquímica, Genética y Farmacología general

**→ En tu plan: D79 (lun 4-ene-2027, N1 · 30Q) y D80 (mar 5-ene-2027, N1 · 30Q) — los dos son
DÍAS DOBLES** heredados del corrimiento v5.7 (allí los 4 días de cierre de Fase A se fusionaron en 2;
**ningún tema se perdió**). En **v5.9 no se fusionó nada más** (ni en v5.8): los dos días dobles siguen tal cual y
el NBME 30 (D78, mié 30-dic) queda **entre** ambos, con D80 ya en 2027:
· **D79 = Bioquímica HY**: metabolismo (glucólisis / TCA / cadena de transporte) + glucógeno + lípidos ·
aminoácidos + ciclo de la urea + errores innatos + vitaminas — **SOLO high-yield** (Palmerton: las
rutas completas son poco ROI).
· **D80 = cierre de Fase A**: biología molecular + genética (herencias, trinucleótidos) ·
**farmacología general transversal PK/PD + toxicología + antídotos**.
Vídeos: [High Yield Biochemistry](https://www.youtube.com/watch?v=FcXG3ux0a1I) (D79) ·
[High Yield Pharmacology](https://www.youtube.com/watch?v=J2KWVQ67H2U) +
[Part 2](https://www.youtube.com/watch?v=PvKp25ku0po) (D80).
Entre los dos: **D78 = NBME 30, cierre de Fase A (mié 30-dic)** — y el jue 31-dic y el vie 1-ene son
días de skip, por lo que D80 cae ya el **mar 5-ene-2027**.

### (a) Concepto ancla de farmacología: "el ultimate memory hack"
```
"LIKES DISSOLVE LIKES": lo polar disuelve lo polar, lo no polar disuelve lo no polar
La membrana lipídica "es prácticamente la misma en el cerebro, la placenta, el estómago, el tracto
GI, la piel" → si un fármaco tiene las propiedades para cruzar UNA membrana, cruzará CUALQUIERA
Regla operativa: las moléculas que cruzan de forma PASIVA son PEQUEÑAS, LIPOFÍLICAS Y SIN CARGA
```
> *"A plasma membrane is a plasma membrane is a plasma membrane — be it in your GI tract, your skin,
> your placenta, your lungs, your prostate, diseased tissue."* ✅
· **Cómo se usa en el examen** ✅: *"no tienes que saber si algo es pequeño, sin carga y lipofílico: si
conoces UN hecho (p. ej. que la lidocaína da convulsiones) infieres que cruza la BHE → cumple los tres
criterios → cruza las demás membranas."*
· **Matiz honesto suyo** ✅: la regla *"no funciona siempre"* porque el tracto GI tiene muchos
transportadores específicos. Investigó logP y umbrales de 500-600 daltons.
· **Aforismo asociado** ⚠: **"It's the wizard, not the wand"** — el experto razona el mecanismo; la
herramienta (lista, mnemotecnia) por sí sola no salva.

### (b) Subtema a subtema

**15.1 Los ejemplos literales de inferencia (formato de la clase: "¿es un detalle o es un
concepto?")** ✅
1. **Cafeína**: actúa en el cerebro → cruza la BHE → pequeña/no polar/sin carga → oral → **y también
   en parche** ("que yo no sabía, pero al buscarlo resulta cierto") → cruza la placenta → **Vd alto**.
   Igual para nicotina, opioides y *"casi todo fármaco neuroactivo"*.
2. **Antiepilépticos** (carbamazepina, fenitoína, valproato): por definición actúan en el cerebro →
   cruzan la BHE → alta absorción oral → cruzan la placenta → *"no me sorprende que cualquier fármaco
   que actúe en el cerebro sea teratógeno"*.
3. **Fluoroquinolonas**: ~100 % de biodisponibilidad oral por lipofilia → penetran LCR, pulmón, etc.
4. **Metronidazol**: *"hecho verdadero que puedes memorizar… o deducir"*.
5. **Protectores solares químicos**: se absorben mucho por la piel → pequeños, lipofílicos, sin carga.
6. **Estrógeno en parche**: *"es un concepto: es lipofílico, difunde entre membranas"*; testosterona y
   progesterona con **receptor intracelular** por la misma razón.
7. **Metilnaltrexona** — el razonamiento invertido, el mejor ejemplo: antagonista opioide para el
   estreñimiento **que NO precipita abstinencia**. La abstinencia ocurre en el SNC → para causarla
   tendría que cruzar la BHE → si no la causa, **no cruza** → luego es polar: **amina cuaternaria con
   carga permanente**. *"Con un solo hecho adivinaste su estructura química."*
8. **Lidocaína en abscesos**: el pH ácido **protona la amina** → queda cargada → no cruza la membrana
   del axón → **la anestesia falla en tejido infectado**.
9. **Lactulosa** en encefalopatía hepática: **ion trapping** (§5.1, §6.7).
10. **Heparina vs warfarina**: polaridad → embarazo y vía de administración (§9.9).
11. **Fisostigmina (terciaria, sin carga → cruza la BHE; mnemotecnia del alumno "phys-, for the eyes")
    vs neostigmina (cuaternaria, carga permanente → solo periférica)**: *"lo memoricé años en
    anestesia hasta que miré las fórmulas: era exactamente lo esperable."*
12. **Alcohol de los desinfectantes de manos**: con concentraciones altas *"se puede medir alcohol en
    sangre después"* — la piel es, en el fondo, una membrana lipídica.
13. **Consejo a la embarazada**: en vez de memorizar listas de teratógenos, *"si el fármaco actúa en el
    cerebro, o se da oral, o existe en transdérmico, hay altísima probabilidad de que cruce la
    placenta"*.
14. **Fentanilo y Vd**: `Vd = dosis / concentración sérica`; muy liposoluble → se distribuye a la grasa
    → concentración sérica bajísima → **Vd enorme** → *"por eso existe en parche"*.
15. **Colestasis y orina oscura**: la bilirrubina **conjugada es polar** → no va unida a albúmina → se
    filtra → oscurece la orina; la **no conjugada es no polar** → unida a albúmina → no se filtra
    (§6.1). **La misma regla de membranas aplicada a un metabolito.**
· **Cómo convertirlo en tarjeta** ✅: antes de hacerla, *"¿hay un principio que explique esto? Si sí,
haz la tarjeta sobre el principio"*. Ejemplo literal: *Front:* "Caffeine — connect its use to the
different ways you can administer it". *"Si aprendes el principio no tendrás que hacer ni de lejos
tantas tarjetas."*

**15.2 Cómo aprender los fármacos: "Pharmacology Over a Glass of Wine"** ✅ (artículo íntegro)
· **Marco**: la farmacología *"vale típicamente 40+ puntos en Step 1"*; con patología, fisiología e
inmuno/micro es de las materias más importantes. A diferencia del resto del examen, **mucha
farmacología gira en torno a saber la información básica** → la herramienta es **repetición espaciada**.
· **Empezar YA**: *"el mayor arrepentimiento de los estudiantes es no haber empezado farmacología
pronto"*; *"el mejor momento para plantar un árbol fue hace diez años; el segundo mejor, ahora"*;
*"¿cómo te comes un elefante? Bocado a bocado."* Cifras: el mazo de farmacología de Yousmle tiene
**~1.800 tarjetas**; *"con 90 días y solo 20 tarjetas nuevas/día lo terminas"*.
· **Los pasos**:
1. **Copia electrónica de First Aid** para copiar/pegar; *"First Aid pharm es suficiente para acertar
   la mayoría"*; elegir los fármacos del bloque de órgano que estés cursando.
2. **Tarjetas simples y separadas**: *"(Fármaco) – mechanism"*, *"– use"*, *"– toxicity"*, cada una con
   su reversa → **al menos 6 tarjetas por fármaco**.
3. **Marcar "Add Reverse"**: *"tu examen pregunta en ambas direcciones: unos ítems dan el mecanismo y
   piden el nombre; otros dan el nombre y piden la toxicidad"*.
4. **Equilibrar la dificultad forward/reverse** puntuándola **de 1 a 10** ("1 = lo recordaría sin Anki;
   10 = como memorizar el arranque de los Cuentos de Canterbury"). Ejemplo: *"Hydralazine – uses"*
   forward ≈ 7 (4 hechos) vs reverse ≈ 2 → reescribir para que el forward tenga 3 cosas y **avisar el
   número: "(3)"** — *"de una lista de tres recuerdas dos y olvidas la última; si sabes que son tres,
   las sacas"*. Y **añadir siempre el "por qué"**: hidralazina → hipotensión → tono simpático →
   taquicardia refleja → beta-bloqueante.
   **REGLA**: *"no más de 2-3 hechos no relacionados por tarjeta"*.
5. **Toxicidades agrupadas POR MECANISMO**: reductor de poscarga → activación simpática refleja →
   taquicardia (→ más demanda → angina; de ahí la contraindicación en CAD) + retención de líquidos; el
   *"lupus-like syndrome"* **se pasa a otra tarjeta** porque no encaja en la cadena. Y **NO poner en
   negrita "náusea"**: *"muchos fármacos dan náusea; nunca será el rasgo definitorio"*.
   **Regla "cover the responses"** ✅: el USMLE debe dar información suficiente para que un grupo de
   expertos acuerde la respuesta **sin ver las opciones** — *"47 años, HTA hace 3 meses, náusea → ¿qué
   fármaco? Imposible. Rash fotosensible malar → ya puedes identificarlo."* **Aprende los efectos
   adversos ESPECÍFICOS.**
6. **Nombres, no solo clases**: *"rara vez te dan la clase; tienes que reconocer azitromicina/
   claritromicina/eritromicina e inferir 'macrólido'"* → una tarjeta para la clase y **otra para los
   nombres** ("Macrolide – names (3)").
· **Por qué NO una tarjeta grande por fármaco** ✅: si fallas 1 de 4 hechos **re-revisas ~80 % de lo que
ya sabías**, y el orden se enreda al recuperar.
· **CUÁNDO** ✅: hacer tarjetas de fármacos es *"casi mecánico"* → **hazlas por la tarde/noche cuando
estás cansado**; **las REVISIONES, que sí exigen esfuerzo, por la mañana.**
· **Filtro de contenido** ✅: meter en Anki **solo lo que está en los "educational objectives" de
UWorld**, salvo una explicación que conecte algo que antes solo memorizabas. *"Prácticamente todo
alumno que metió información fuera de los objetivos hizo demasiadas tarjetas, se atrasó y se
arrepintió."*
· **Preguntas de integración = diapositiva 2 de cada clase** ✅: *"si puedes explicarlas entiendes la
mayoría del PowerPoint; en vez de 50-60 tarjetas te bastan una docena"*. Instrucción literal: **"haz
tarjetas de las preguntas de integración INMEDIATAMENTE después de la clase; si no, nunca lo harás."**

**15.3 Farmacocinética y farmacodinamia: lo que SÍ está (y lo que no)** ✅
· `Vd = dosis / concentración sérica` · **5 vidas medias** para estado estacionario o eliminación casi
completa ("pregunta semi-común de Step 1") → aplicación al **factor VII (3-6 h)** y a la **albúmina
(~20 días)** (§6.2, §9.8).
· **Km vs P50** ✅: *"el error más común es creer que Km es ½ Vmax; **Km NO es una velocidad, es la
CONCENTRACIÓN de sustrato a la que la reacción va a ½ Vmax**"*; P50 = pO2 a la que el 50 % del hemo
está saturado. **"Km es a cinética lo que P50 es a unión."**
· **Antagonismo competitivo reversible por exceso de agonista** ✅: los bloqueantes no despolarizantes
se revierten subiendo la ACh con un anticolinesterásico; **misma lógica**: el yoduro de potasio compite
con el yodo radiactivo por el transportador tiroideo; el etanol satura la alcohol-deshidrogenasa para
que el metanol no se metabolice a ácido fórmico (*"el metabolito es el problema"*).
· **Regulación de receptores** ✅: mucho ligando → **down-regulation** (insulina alta baja los receptores
de insulina); **denervación/ictus → UP-regulation** de receptores nicotínicos extrasinápticos.
· **Regla general de vías** ✅: *"cuando inhibes el paso final de algo, todos los intermediarios previos
suben"*.
· **Potencia** ✅ (única definición formal del corpus, de los gases): *"el número de moléculas de gas que
necesitaría para obtener el mismo efecto anestésico"*; a más liposolubilidad, más potente.
· ❌ **NO ESTÁN** (confirmado en dos sesiones): **cinética de orden cero vs primer orden, dosis de
carga y de mantenimiento, inductores/inhibidores del CYP450, índice terapéutico, agonista parcial,
eficacia vs potencia como par formal**; segundos mensajeros de M1/M3, alfa1, alfa2, beta2 (salvo Gs);
**curvas de PA/FC con epinefrina, norepinefrina, isoproterenol y fenilefrina**; pruebas con
atropina/fentolamina. → **First Aid + UWorld el mismo D80.**

**15.4 Gases anestésicos** ✅ (HY Pharm 1, íntegro)
· **Los dos temas de la clase**: los anestésicos actúan en el SNC → lo relevante no es que lleguen a la
sangre sino **que pasen de la sangre al SNC**; y *"la presión parcial del gas en el cerebro es lo que
importa para el inicio de la anestesia"*.
· **Presión parcial de un gas disuelto** ✅ (el concepto que *"me llevó 5-6 años"*): modelo de la **lata
de refresco** (aportado por un alumno): mides la pCO2 del hueco de aire y **esa es la del líquido**.
Consecuencia clave: **gas MUY soluble → presión parcial BAJA; gas POCO soluble → presión parcial ALTA**.
· **La simplificación definitiva** ✅ (aportada por una alumna y adoptada): *"cuanto menos soluble en
sangre, antes se SATURA la sangre y antes el gas que sigues añadiendo puede irse al cerebro; un gas muy
soluble se queda todo disuelto en sangre y no sobra nada para el cerebro. **No va de cuán rápido cruza
la BHE**."* Y su valoración: *"si entiendes eso, entiendes tanto como la mayoría de anestesiólogos"*.
· **Velocidad vs potencia — dos conceptos distintos** ✅:
```
VELOCIDAD (onset) ∝ 1/solubilidad en SANGRE = coeficiente de partición SANGRE-GAS (alto → lento)
POTENCIA          ∝ solubilidad en LÍPIDOS  = coeficiente de partición ACEITE-GAS
                    (correlación de MEYER-OVERTON)
NO son mutuamente excluyentes: "el isoflurano es más liposoluble Y más hidrosoluble en sangre que el
sevoflurano; el óxido nitroso es poco soluble en AMBOS"
```
· **MAC** ✅ = concentración alveolar a la que el **50 % de los pacientes NO se mueve** ante un estímulo
quirúrgico = **ED50 del gas** ("minimum" es un nombre engañoso). Estudios originales en UCSF: 100
personas respiran el gas y se les hace una incisión de ~1 pulgada. **Más liposolubilidad → más potencia
→ MENOR MAC.**
**Cifras** ✅: **isoflurano 1,2 %** (muy potente pero inducción lenta; barato) · **sevoflurano 1,8 %**
(poco soluble en sangre → rápido, huele mejor → **de elección para inducción con mascarilla en niños
sin vía IV**) · **desflurano 6,6 %** (el menos liposoluble, rapidísimo, caro) · **N2O ≈ 100 %**
(*"no puedes alcanzar 1 MAC en un adulto de 40 años"*).
· **Las dos preguntas literales de la clase** ✅: (1) niño de 5 años, inducción inhalatoria, *"¿qué
propiedad da inducción rápida?"* → **bajo coeficiente de partición sangre-gas** (no la liposolubilidad,
que es potencia); (2) dos grupos a end-tidal 1,2 % de iso vs sevo, se mueven más los de sevo → ya en
equilibrio, **no es velocidad sino POTENCIA** → coeficiente **aceite-gas**.
· **Lección metodológica** ✅: *"en el examen no dirán 'solubilidad en sangre'; lo disfrazan como
coeficientes de partición: entiende el concepto para reconocerlo con otras palabras."*

**15.5 Toxicología y antídotos: lo que hay** ✅/⚠ (→ el resto en §8.11 y §9.9)
· **Cianuro** ✅ (desarrollo completo en HY Biochem):
```
CN− se une al hierro; PREFIERE Fe3+. El hemo del COMPLEJO IV alterna Fe2+/Fe3+ → el cianuro se une
al Fe3+ del complejo IV y APAGA la cadena de transporte
Piel rojo cereza: el O2 no se usa → se queda unido a la Hb (Fe2+ oxigenado = rojo brillante)
   → VENAS ROJAS / hiperoxia venosa
"TRIPLE SCREWED": (1) el cianuro desplaza O2 de la Hb; (2) por cooperatividad el O2 restante se une
   MÁS fuerte y no se libera (P50 baja de ~25 a ~17); (3) aunque se libere, no se puede usar
Lactato alto: sin cadena no se regenera NAD+ → la única forma de seguir haciendo ATP por glucólisis
   es piruvato → lactato: "EL ÚNICO PROPÓSITO DEL LACTATO ES REGENERAR NAD+"
TRATAMIENTO EN DOS PASOS: (1) oxidante (nitrito de amilo) → Hb a METAHEMOGLOBINA (Fe3+) → el
   cianuro abandona el complejo IV y se une a la metaHb; (2) TIOSULFATO → tiocianato → se orina
```
· **Desacopladores** ✅: suben la permeabilidad de la membrana mitocondrial interna a protones → el
gradiente se disipa sin pasar por la ATP sintasa → se consumen NADH y O2 "corriendo en círculos" sin
ATP → **calor**. Los tres para Step 1: **2,4-DNP** (*"el fármaco perfecto para adelgazar"*),
**aspirina en sobredosis** y **termogenina** (grasa parda). **Sobredosis de aspirina** = **alcalosis
respiratoria + acidosis metabólica** con anion gap.
· **Botulismo** ✅: la toxina **cliva SNARE (SNAP-25)** → no se fusionan las vesículas de ACh
(Ca-dependiente) → **parálisis fláccida**.
· **Digoxina** ✅ → §3.5 y §12.2.
· **Beta-bloqueantes → GLUCAGÓN** ✅: el receptor de glucagón usa **Gs** igual que el beta → sube el
AMPc por una vía paralela.
· **Metanol → ETANOL** ✅ (saturar la alcohol/aldehído-deshidrogenasa: *"el problema es el metabolito,
el ácido fórmico"*). ❌ Fomepizol no está.
· **Yodo radiactivo → yoduro de potasio** ✅ (Fukushima 2011).
· **Metahemoglobinemia** ✅ por nitritos (agua de pozo): Fe3+ no une O2 → piel azul; útil
terapéuticamente en el cianuro. ❌ **Azul de metileno no está**; sí aparece la pregunta *"¿cómo explica
la función natural de la vitamina C que la usemos en metahemoglobinemia?"* → **agente reductor**
(Fe3+ → Fe2+).
· **Succinilcolina en quemados/ictus** ✅ → hiperpotasemia letal (§8.11).
· ❌ **NO ESTÁN** (declarado explícitamente): **N-acetilcisteína**, organofosforados/**pralidoxima**,
**naloxona**, benzodiacepinas/**flumazenil**, hierro/**deferoxamina**, **fomepizol**, **azul de
metileno**. Del paracetamol solo está *"really bad Tylenol toxicity to the liver"*. → **First Aid.**

**15.6 Bioquímica high-yield** ✅ (HY Biochem, tres clases)
· **Filosofía** ✅: *"Bioquímica es el cheat code para garantizar el aprobado: está debajo de la mitad
del examen; apréndela como un sistema conectado."* Y el filtro: *"los libros con todos los
intermediarios os hacen un flaco favor: en el examen casi solo se pregunta **el paso regulado clave,
el primer paso o algo con relevancia clínica**"*. Y el atajo geográfico: *"¿dónde ocurre X? Si dices
'hígado' aciertas el 90 % de las veces."*
· **Krebs y cadena de transporte** ✅: Acetil-CoA (2C) + oxalacetato (4C) → citrato (6C); **isocitrato
deshidrogenasa = paso regulado clave** (pierde CO2, **irreversible**); balance por acetil-CoA:
**3 NADH, 1 FADH2, 1 GTP; NO produce ATP directamente**. Mnemotecnia que usa: *"Kathy Is Kinky So She
Fornicates More Often"*. **O2 = aceptor final** en el complejo IV; **complejo V = ATP sintasa**. Las dos
membranas mitocondriales por el **origen endosimbiótico**.
· **Acetil-CoA es la molécula central** ✅: piruvato (PDH), ácidos grasos (*"10 acetil-CoA → ácido graso;
al degradarlo recuperas 10"*), cuerpos cetónicos (= 2 acetil-CoA), aminoácidos cetogénicos.
· **Gluconeogénesis** ✅: intermediarios de **≥ 3 carbonos**; paso final **glucosa-6-fosfatasa**, el
**MISMO paso final de la glucogenólisis** (*"no es coincidencia: fosforilar la glucosa la atrapa en la
célula porque el fosfato es grande y cargado; quitar el fosfato la libera por GLUT"*).
**Sustratos**: piruvato (3C) sí, glicerol (3C) sí, oxalacetato (4C) sí, **ACETIL-CoA NO (2C): "la
confusión más común"**. Excepción: ácidos grasos de número **impar** → propionil-CoA (3C) →
succinil-CoA → glucosa.
· **Cetogénicos** ✅: **solo LEUCINA y LISINA son puramente cetogénicos**. Aplicación: en el **déficit de
piruvato deshidrogenasa** se da **dieta cetogénica** rica en leucina/lisina para no acumular
precursores (energía vía acetil-CoA sin lactato).
· **VON GIERKE (GSD I) — caso completo** ✅:
```
Déficit de GLUCOSA-6-FOSFATASA → sube el G6P → CAEN glucogenólisis Y gluconeogénesis (mismo paso
final) → HIPOGLUCEMIA a las 3-4 h de ayuno (= lo que dura la glucosa de la dieta; "por eso un neonato
come cada 3-4 h: no tiene reservas de glucógeno")
El G6P sobrante fluye a:
   GLUCÓLISIS → piruvato → LACTATO (y alanina) y acetil-CoA → COLESTEROL (18 acetil-CoA por
      colesterol; HMG-CoA reductasa) y TRIGLICÉRIDOS
   HMP SHUNT → ribosa-5-P → PRPP → purinas → XANTINA OXIDASA → ÁCIDO ÚRICO
   glucógeno no degradado → HEPATOMEGALIA
   el ciclo de Cori se atasca → lactato sérico aún mayor
PREGUNTA LITERAL: "niña de 2 meses, convulsiones 3-4 h tras lactar; más irritable con hambre que su
hermano mayor (→ metabólico/genético); hepatomegalia y mejillas redondas; tras 4 h de ayuno:
hipoglucemia, acidosis láctica, hipercolesterolemia, hiperuricemia. Standalone: ¿qué enzima falta?"
   → G6Pasa. Descartes: fructoquinasa (se presentaría tras comer FRUTA, no en ayuno); G6PD (hemólisis
   oxidativa; en una NIÑA solo por inactivación del X sesgada)
```
· **MCAD / VLCAD / carnitina — caso completo** ✅:
```
Los ácidos grasos humanos tienen número PAR de carbonos. "En el examen no os harán elegir entre
LCAD/VLCAD/MCAD: la presentación es casi idéntica"
CRONOLOGÍA: la glucosa de la dieta dura 3-4 h; el GLUCÓGENO 24-28 h en reposo (menos con fiebre o
ejercicio) → los déficits de beta-oxidación se presentan a las 12-16 h, típicamente tras una
infección viral (menos ingesta + más demanda). "No te obsesiones con la cifra: lo importante es que
es MUCHO MÁS TARDE que von Gierke"
PREGUNTA LITERAL: "chico de 15 años perdido en el bosque, encontrado convulsionando a las 22 h;
antecedentes de letargia en infecciones virales que mejoraba con zumo; hepatomegalia; labs antes del
suero glucosado: hipoglucemia, CETONAS BAJAS, especies acil-CoA C6-C10" → MCAD: sin beta-oxidación no
hay acetil-CoA → ni cetonas ni energía alternativa → sobre-dependencia de glucosa → hipoglucemia
   FIRMA: HIPOGLUCEMIA HIPOCETÓSICA
Descartes: von Gierke (habría presentado en los primeros meses: "todos hemos ayunado 4 h esta noche");
   McArdle (fosforilasa muscular: mioglobinuria, SIN hipoglucemia, sin acil-CoA, cetonas normales)
CARNITINA ACILTRANSFERASA = paso regulado de la beta-oxidación
```
🔎 **A VERIFICAR (5-sep)**: "hiperamonemia en MCAD porque el ciclo de la urea no tiene ATP" y
"acetil-CoA activa la piruvato carboxilasa" — **no tienen cita válida**.
· **Colesterol y estatinas** ✅: sustrato = **18 acetil-CoA**; paso regulado **HMG-CoA reductasa**.
**"Pregunta muy popular de Step 1 con variantes"**: el LDL baja **porque el hepatocito, privado de
colesterol, AUMENTA LOS RECEPTORES DE LDL** — no simplemente por sintetizar menos. Historia: se
diseñaron pensando que "colesterol = malo"; bajar el colesterol total no reduce mortalidad, bajar el
LDL sí — *"tuvieron suerte"*. En la hipercolesterolemia familiar con receptor de LDL defectuoso
*"esperaría que ayudaran poco"*.
· **HMP shunt y purinas** ✅: fase oxidativa → **NADPH (G6PD)**; fase no oxidativa → **ribosa-5-P →
PRPP** → DNA/RNA. Purinas → **xantina oxidasa** → ácido úrico.

**15.7 Vitaminas: lo verificado y lo descartado** ✅/❌
· **Folato** ✅ y **B12** ✅ (trampa del metilfolato, MMA y homocisteína) → **§9.3**.
· **B6 (piridoxal fosfato)** ✅ parcial: cofactor de la **ALA sintasa** (succinil-CoA + glicina, paso
limitante del hemo). 🔎 **La relación isoniazida-B6 y los sideroblastos: A VERIFICAR.**
· **Vitamina D** ✅ → §7.4 (1-alfa-hidroxilasa; ERC vs sarcoidosis).
· **Vitamina K** ✅ → §9.8 (gamma-carboxilación de II, VII, IX, X, proteínas C y S).
· **Vitamina E** ✅: antioxidante lipofílico de membranas; su déficit **imita la clínica neurológica de
la B12** (degeneración combinada subaguda) **pero con anemia hemolítica y MMA normal** — es la trampa
de la pregunta real de Step 1 del §8.8.
· **Vitamina C** ✅: única presencia verificada = la pregunta *"¿cómo explica la función natural de la
vitamina C que la usemos en metahemoglobinemia?"* → **agente reductor** (Fe3+ → Fe2+).
· ❌ **DESCARTADAS del corpus** (una respuesta las inventó por la tarde y otra las negó por la noche —
**tratar como NO presentes**): **B1/tiamina** (PDH, transcetolasa, Wernicke-Korsakoff, beriberi,
"glucosa sin tiamina precipita Wernicke"), **niacina** (pelagra, Hartnup), **B6-isoniazida**.
🔎 **Escorbuto** (prolil/lisil hidroxilasa): sin cita válida. ❌ **Vitamina A: no está.**
· ❌ **Errores innatos que NO están** (confirmado dos veces): PKU, homocistinuria, galactosemia,
intolerancia hereditaria a la fructosa, Pompe/Cori, **lisosomales (Gaucher, Tay-Sachs, Fabry,
Niemann-Pick)**, **porfirias**, Lesch-Nyhan, ciclo de la urea como bloque, alcaptonuria.
**Cubiertos** ✅: von Gierke, MCAD/VLCAD, déficit de carnitina, déficit de PDH, McArdle (como descarte),
fructoquinasa (benigna), G6PD, Zellweger (mención).

**15.8 Genética** ✅ — **cae en D80 (mar 5-ene)**
· **Dominante vs recesivo POR FISIOPATOLOGÍA** ✅ (la regla que sustituye a la lista):
```
Si es una ENZIMA y falta, el 50 % suele bastar → RECESIVO
Si es un CANAL HIPERACTIVO, con el 50 % malo ya hay fenotipo → DOMINANTE
HAPLOINSUFICIENCIA = cuando el 50 % NO basta
Ejemplos: hipertermia maligna (RyR ganancia de función, AD) · fibrosis quística (CFTR pérdida de
función, AR) · Duchenne (sin distrofina, recesiva ligada al X)
```
· **Inactivación del X sesgada** ✅ — *"unfortunate pattern of X-inactivation"*: explica **G6PD
sintomática en una niña** y **Duchenne tardío en la madre portadora**. *"La respuesta es siempre esa."*
**Caso literal**: *"mujer de 26 años con dificultad para levantarse de la silla, portadora conocida de
Duchenne (hijo afectado)"* — Duchenne debuta en niños a los **2-5 años**; la portadora suele ser
asintomática porque ≈ 50 % de fibras con el X sano bastan; si **por pura suerte el 60-70 % de las
fibras inactivaron el X bueno**, aparece la miopatía — *"it's just all about luck"*.
> *"Una de las preguntas de genética más comunes que te van a caer, y es sorprendente cuánta gente la
> falla."* ✅
· **Las células germinales femeninas NO inactivan el X** ✅ (necesitan ambos para migrar/desarrollarse)
→ en **Turner (45,X)** los ovocitos mueren → **streak ovaries** (§11.10).
· **Anticipación** ✅: las repeticiones de trinucleótidos (Huntington, X frágil, distrofia miotónica)
**se expanden en la gametogénesis** → inicio más precoz y grave en cada generación (ejemplo: abuelo 70
/ hijo 48 / nieto 25).
· **Penetrancia vs expresividad** ✅: **penetrancia = BINARIA** (% de portadores del genotipo que
muestran ALGÚN fenotipo: *"80 % de penetrancia: el 80 % tiene algo, el 20 % nada"*); **expresividad
variable = GRADO/severidad** entre quienes lo muestran. (🔎 El ejemplo de Marfan lo añade NotebookLM,
no está en la cita.)
· **Dosis génica y trisomías** ✅: *"tener demasiado o demasiado poco de un gen respecto a lo que la
célula debería tener es malo"* → si la mujer no inactivara un X tendría el doble de proteína de los
genes X; una trisomía 3 altera tanto la dosis que es **incompatible con la vida**; solo **13, 18 y 21**
llegan a nacer.
· **Blots y electroforesis** ✅ → §9.6 (Southern DNA / Northern RNA / **Western = proteína = Hb**;
HbS y HbC como **missense**).
· ❌ **NO están** (confirmado dos veces): **imprinting (Prader-Willi/Angelman)**, **Hardy-Weinberg**,
**PCR**, **ELISA**, mosaicismo como concepto, **herencia mitocondrial**, Down-leucemia/Alzheimer,
X frágil, frameshift/nonsense (solo "missense"). → **First Aid + UWorld el mismo D80.**

**15.9 Medicina nuclear e imagen (transversal, no tiene día propio)** ✅
· **Principio** ✅: en Rx/TC la fuente está **FUERA** y ves el negativo de lo que atraviesa; en medicina
nuclear la fuente está **DENTRO** del órgano (*"la luz brilla desde dentro"*) → estudio **fisiológico**
("hot" = captación, "cold" = no).
· **Modalidades** ✅: **tomografía** = imagen por secciones ("la T de TC y de SPECT") ·
**gammagrafía (scintigraphy)** = 2D, radiación gamma (tiroides, V/Q, HIDA) · **SPECT** = 3D, gamma
(*"scintigraphy es a Rx lo que SPECT es a TC"*) · **PET** = 3D, positrones.
· **Cómo llega al órgano** ✅: yodo radiactivo → solo tiroides (**es el propio yodo el que decae**) ·
corazón → **tecnecio-99 + sestamibi** ("sexta-MIBI: seis ligandos MIBI alrededor del tecnecio") o
talio-201 · PET → **FDG (glucosa marcada con flúor-18)** · HIDA → ácido hepatobiliar iminodiacético.
· **Densidad radiológica** ✅ (aplicable a TC de cráneo y a disección aórtica): los rayos X atraviesan
elementos ligeros (H, C, N, O → **negro**) y rebotan en los pesados (**yodo, bario, calcio, hierro →
blanco**) — de ahí que el contraste **enmascare** la sangre en el ictus (§8.6) y que el epidural agudo
se vea más blanco que el subdural subagudo (§8.10).
· **Cronología patofisiológica del caso de nuclear** ✅: *"55 años, DM2, anemia normocítica, ERC, disnea
de esfuerzo, PA 141/93, IMC 35, SPECT reposo/esfuerzo con Tc-99"* → nace sano → malos hábitos →
DM2/obesidad → ateroesclerosis coronaria → estenosis > 70 % → angina estable → isquemia con el
esfuerzo; **la ERC → menos EPO → anemia normocítica es una RAMA PARALELA, no causal**; la disnea de
esfuerzo es inespecífica (corazón, pulmón, anemia).
· **Método de lectura que confiesa** ✅: *"leo la viñeta tan despacio como en el examen real, pensando
mientras leo, y terminaba con tiempo de sobra; **el problema del tiempo es leer dos veces**."*

### (c) High-yield del bloque
PK (Vd, clearance, vida media, 5 vidas medias) · fases I/II y CYP450 ❌corpus · PD (potencia vs
eficacia, antagonismos, agonistas parciales ❌corpus) · autonómicos completos y "arrow questions" ·
organofosforados ❌corpus · antídotos ⚠ · **atrapamiento iónico** ✅ · **hipertermia maligna** ✅ ·
~6 tarjetas simples por fármaco, solo toxicidades **DISTINTIVAS** ✅ · vitaminas con contextos de
malabsorción · glucogenosis · lisosomales ❌corpus · ayuno/posprandial ✅ · oxidación de AG + ciclo de
la urea · aminoacidopatías ❌corpus · biología molecular ✅ · herencia y Hardy-Weinberg ❌corpus ·
imprinting ❌corpus · colágeno/elastina.
**Hábito verbal que exige** ✅: **"…y por eso…"** en cada explicación.

### (d) Fuentes
Vídeos ✅: [High Yield Biochemistry](https://www.youtube.com/watch?v=FcXG3ux0a1I) ·
[High Yield Pharmacology](https://www.youtube.com/watch?v=J2KWVQ67H2U) ·
[High Yield Pharmacology Part 2](https://www.youtube.com/watch?v=PvKp25ku0po) ·
*High Yield Nuclear Medicine: PET, SPECT, VQ Scans* · *Biostatistics SUMMARY*.
Artículos ✅ (URLs conservadas de la v2):
[Pharmacology Over a Glass of Wine](https://www.yousmle.com/how-to-master-pharmacology-for-the-usmle-step-1-over-a-glass-of-wine/) ·
[How to Memorize for the USMLE](https://www.yousmle.com/how-to-memorize-usmle/) ·
[Yousmle Pharmacology Deck (1.700+ tarjetas)](https://go.yousmle.com/pharmacology-deck) ·
[Tag Pharmacology](https://www.yousmle.com/tag/pharmacology/) ·
[Is Memorization Enough? (caso VLCAD)](https://www.yousmle.com/usmle-step-1-score-of-270-is-memorization-enough/) ·
[Mastering Step 1 vs Step 2 (paga doble)](https://www.yousmle.com/how-to-score-270-by-mastering-step-1-vs-step-2/) ·
[10 Habits Step 1 Study Plan](https://www.yousmle.com/10-habit-step-1-study-plan-270-pass-fail/) ·
[Top Biochemistry Textbooks](https://www.yousmle.com/top-biochemistry-textbooks-for-medical-students/) ·
[High-Yield Pharm — The Match Guy](https://thematchguy.com/usmle-step-1-high-yield-pharmacology-concepts/).

### (e) → En tu plan
**D79 = lun 4-ene-2027 (N1 · 30Q)** · **D80 = mar 5-ene-2027 (N1 · 30Q)** ·
**D78 = mié 30-dic-2026 → NBME 30, cierre de Fase A (N5 · 200Q)** — el hito cae **entre** D79 y D80.
D79 y D80 son **días dobles**: la carga real es mayor que el `qDia` de 30Q. Prioriza lo que el corpus marca como
rentable (**von Gierke, MCAD, gluconeogénesis, colesterol/estatinas, folato/B12, la regla dominante vs
recesivo, likes dissolve likes**) y deja lo declarado ausente (CYP450, Hardy-Weinberg, imprinting,
lisosomales, aminoacidopatías, antídotos concretos) como **repaso rápido de First Aid**, no como
estudio profundo: no da tiempo y **no es donde está el rendimiento**.
La farmacología transversal ya se habrá tocado en **D11, D19, D24, D40, D45, D48, D56, D64, D69 y
D76** — D80 es la **consolidación**, no la primera pasada.

---

## 16. Materias sin día propio (catálogo Step 2 aprovechable)

*(Conservado de la v2 y ampliado con los extractos v3.)*
- **Medicina Familiar** ⚠ — ancla: **clasificar por modelos fisiológicos** (AKI pre/intra/post;
  ictericia pre/intra/post-hepática). Más preguntado: **incontinencia** (los 4 tipos con PVR, §11.11) ·
  tos crónica del no fumador (ERGE, asma, goteo posnasal). Error: perderse en demografía superficial
  en vez del concepto fisiológico. Fuente: *High Yield Family Medicine Review* (Parts 1-2). **También
  aporta LES, ANCA y preeclampsia.**
- **Pediatría** ⚠ — ancla: integrar **bioquímica metabólica con desarrollo**. Más preguntado:
  estenosis traqueal / traqueomalacia post-intubación (§4.10) · convulsiones + hipoglucemia neonatal
  (von Gierke, MCAD → **caen en tu D79**) · Turner y Klinefelter (§11.10) · anticipación y penetrancia
  (§15.8). Fuente: *Pediatrics Shelf Review* (Parts 1-2) y *High Yield Pediatrics Review Part 2*.
- **Cirugía** ⚠ — ancla: **la gravedad clínica determina la invasividad del tratamiento** (inestable
  o perforación → cirugía inmediata; estable → conservador: IV, ATB, NPO — ejemplo canónico:
  **diverticulitis**, §6.5). También: **isquemia por presión** en anestesiados (rabdomiólisis,
  parálisis de nervios, §5.5) · síndrome compartimental · patrones colestásicos. Error: memorizar
  algoritmos sin evaluar primero la estabilidad hemodinámica. Fuente: *High Yield Surgery Review*.
- **Aprovechamiento para Step 1**: los tres refuerzan el marco **"severidad → agresividad del manejo"**
  (la S del CCSN, Parte IV) y **no requieren días extra del plan**.

---

# PARTE II — MÉTODO DE PREGUNTAS: los 5 niveles de maestría UWorld

*(Fuente: "UWorld Complete Guide: The Five Levels of Mastery to 260+")*. El error típico es hacer 100Q
mezcladas y cronometradas desde el día 1: **destruye la confianza y ralentiza el aprendizaje**.
Sistema progresivo:

| Nivel | Formato | Enfoque | Meta diaria | Umbral para SUBIR de nivel |
|-------|---------|---------|-------------|----------------------------|
| **1** | Bloques de 5Q · tutor · SIN tiempo · subtema único | Aprender el proceso de lectura sin presión de reloj (empezar por un subtema autocontenido) | 20-30Q/día | **80 % en 10Q consecutivas SIN USAR del subtema estudiado** |
| **2** | Bloques de 5Q · CON tiempo · subtema único | Introducir el reloj de forma controlada | volumen creciente | 80 % consistente en los subtemas dominados |
| **3** | Bloques de 10-20Q · CON tiempo · sistema completo | Eliminar la "ventaja injusta" del subtema | 40-50Q/día | dominar 2+ sistemas consecutivos al 80 % |
| **4** | Bloques de 20-30Q · CON tiempo · sistemas mixtos | 2 sistemas dominados + 1 nuevo: saltar entre especialidades sin perder la técnica | 50-70Q/día | confianza integrando múltiples sistemas |
| **5** | Bloques de 40Q · CON tiempo · random completo | Simulación exacta del examen, sosteniendo 80 % | 80-100Q/día (máx. 2 bloques de 40) | — |

**Mapeo al plan v5.9** (el `.ts` ya lleva `nivelUW` por día y el gate en `USMLE_GATE`):

- **Fase A (D1-D80 · 11-sep → 5-ene · D1 = UWSA1, el contenido arranca en D2, lun 14-sep)** = Niveles 1→3. El **PRE-TEST 10Q** (08:15, tutor, subtema
  nuevo) es Nivel 1; la **CONSOLIDACIÓN** de las 11:00 es Nivel 1 los dos primeros días de cada sistema
  y Nivel 2 desde el tercero; los **viernes sin hito** son Nivel 3 (20Q del sistema completo timed):
  en el plan v5.9 son **6**: **D11 (vie 25-sep, Cardio), D21 (vie 9-oct, Resp), D26 (vie 16-oct,
  Renal), D36 (vie 30-oct, GI), D41 (vie 6-nov, Endo) y D56 (vie 27-nov, Heme/Onc)**. Los otros 3
  viernes sin hito (**D6 18-sep, D51 20-nov y D66 11-dic**) caen con su sistema recién abierto
  (<3 días) → Nivel 1, y ese día el bloque de sistema completo se hace del sistema ANTERIOR.
  (En v5.8 los N3 eran solo 4 — D12, D22, D27, D67 — y GI, Endo y Heme/Onc se quedaban sin gate de
  sistema: al correr +1 día hábil, el viernes de cada bloque cae sobre otro subtema y aparecen 2 más.)
  La **EVALUACIÓN ACUMULATIVA de las 18:00** (timed, mixta) introduce el **Nivel 4 en dosis diaria**.
  **Regla de validación en ciclos de 24-48 h**: si estudiaste un subtema hoy, mañana debes poder sacar
  **≥ 80 %** en un bloque de ese subtema; si no, **el método del día falló — ajustar YA**.
- **Fase B (`faseDe` = B: D81-D88 · 6-ene → 15-ene)** = Nivel **4 en D81 · D82 (6-7 ene), D84 (11-ene)
  y D85 (12-ene)** (random timed 2×40Q + sistema débil) → Nivel **5 en D86 · D87 (13-14 ene)**
  (incorrects) y en **D90 (mar 19-ene)** (AMBOSS 200 mitad 1, banco alojado ya en la semana del
  sprint), con **UWSA2 en D83 (vie 8-ene)** y **NBME 31 en D88 (vie 15-ene)**.
- **Fase C (`faseDe` = C: D89-D95 · 18-ene → 26-ene)** = Nivel 5 en formato simulacro completo
  (**NBME 32 D89**, **NBME 33 D91**, **Free 120 D93**), con **D90 (mar 19-ene)** y **D92 (jue 21-ene)**
  todavía de banco (AMBOSS 200 mitades 1 y 2, `system = Banco intensivo`) y **D94 (lun 25-ene)** +
  **D95 (mar 26-ene)** de rapid review ya dentro de la ventana de examen.

**El gate, literal** (`USMLE_GATE` en `usmleStep1Daily.ts`): *no subir de nivel sin **≥ 80 % en 10Q
consecutivas** del nivel actual, validadas **≤ 24-48 h** después de estudiar el subtema*. Si < 80 %:
**NO avanzar de tema**; repetir bloques de 5Q del subtema fallado y auditar en orden: (1) recursos,
(2) comprensión (*¿memoricé?*), (3) aplicación a caso nuevo, (4) memoria/Anki. **Si en 1-2 días no
llega al 80 %, el método está roto.**
Y el matiz que evita el pánico: **el % de UWorld es gate de PROCESO, no predicción — solo el NBME
predice.**

**Cómo REVISAR preguntas (vale 20-30 puntos)** — *How to Review USMLE Questions for 20-30+ Points* +
*The ONLY Video You Need to Pass Step 1 in 2026*:

1. **Whole Page Rule**: fallaste estenosis mitral → estudia la página **COMPLETA** de valvulopatías de
   First Aid y haz tarjetas de esa sección. **Anticipas** preguntas futuras en vez de reaccionar al
   pasado.
2. **Standalone Question (SAQ)**: reduce la viñeta de 15 líneas a la pregunta directa que un experto
   respondería sin ver el caso. La SAQ buena es **CONCEPTUAL** (*"¿tratamiento de una TVP aguda?"*) y
   no descriptiva (*"¿manejo de mujer de 62 años post-reemplazo de rodilla…?"*). Ejemplos reales del
   corpus: *"¿qué enzima falta en von Gierke?"* · *"¿granuloma en infección renal crónica?"* ·
   *"¿qué propiedad da inducción anestésica rápida?"*
3. **Rule In antes de Rule Out**: justificar **para qué escenario sería correcta CADA opción** antes de
   descartar nada (juez, no abogado — Parte IV).
4. **Shopping List**: auditar **cada oración del bloque, también las de las preguntas que acertaste**,
   y anotar todo dato/lab/imagen que te generó la mínima incomodidad → **esas son las lagunas reales**
   → Anki dirigido a ellas.
5. **Error tracking en 3 categorías**: *knowledge gap* (→ página de First Aid) · *transfer/skills gap*
   (sabías el concepto pero no lo transferiste → tarjetas drill) · *error de proceso* (omitir
   cronología o severidad → corregir el protocolo de lectura). **Compatible 1:1 con TRACKING_ERRORES.**
6. **La regla del 80 % aplicada a un solo subtema** ✅: antes de escalar volumen, prueba el sistema en
   **un subtema aislado** (p. ej. "panel de hierro"): estudia las páginas de First Aid, construye tus
   tarjetas PC y **demuestra ≥ 80 % en 10 preguntas consecutivas de ese subtema en un día**.
7. **Ecuación del cubo agujereado** ✅: `Conocimiento máximo retenido = Aprendido por día ÷ % olvidado
   por día` — **la ganancia grande está en bajar la tasa de olvido, no en estudiar más horas**.

---

# PARTE III — ANKI FINO

*(Fuentes: "Give Me 30 Minutes and I'll 5X Your Anki Efficiency", "I Reviewed 28,655 Flashcards Every
Day for 17 Years", "How To Use Anki Like A Pro", "How to Catch Up 2,000 Anki Cards in 3 Days",
"5 Keys To Rock USMLE Step 1 With Anki")*

> **En tu plan el bloque ANKI AM es 05:00-05:45** (madrugada fresca, pasada principal FSRS) + resto de
> repasos a las 07:15. Coincide con su "revolución de la mañana": Anki a primera hora con la mente
> fresca **duplica la velocidad de repaso** y mejora la retención. Y con su regla de reparto:
> **las tarjetas se HACEN por la noche (trabajo mecánico); las revisiones, por la mañana.**

**Configuración exacta**:

1. **FSRS activado** (Opciones del mazo → FSRS → Activar → *Optimize all presets*): **reduce las
   revisiones diarias a la mitad con la misma retención** (ejemplo del corpus: de **159 a 73/día**).
   Principiantes: 1 mes con el algoritmo por defecto para acumular datos, luego activar.
2. **Desired retention = 0.9 (90 %)** estricto — subir de 90 % a 100 % **multiplica el tiempo ×5**.
3. **Tarjetas nuevas: máximo 50/día** (más = avalancha insostenible semanas después). Tu plan opera por
   debajo: **≤ 10 tarjetas de mecanismo en DEEP PRIME** + las de gaps del log de errores.
4. **Revisiones máximas: 9.999** — **NUNCA capar**; se hace todo lo vencido del día.
5. **Botones: SOLO "Good" (~90 %) o "Again" (~10 %)**, con honestidad. **NO usar "Hard"/"Easy"**:
   abusar de Hard para no apretar Again confunde al algoritmo, acorta intervalos y multiplica las
   revisiones.

**Tipos de tarjeta ideales**:

- **Formateo con guion (sujeto primero)**: tema, guion, pregunta — *"Caffeine — connect its use to the
  different ways it is administered"*. El cerebro **entra en contexto** y se ahorran hasta **5 segundos
  por tarjeta**.
- **Tarjeta PC (patogénesis → presentación)**: la única forma buena. Debe forzar el **por qué** y
  conectar los tres vértices: *(a) ¿cuál es la patogenia? (b) ¿cuál es la presentación clínica?
  (c) ¿cómo conecto una con la otra?* **Nunca** "¿qué hace el fármaco X?".
- **Tarjetas drill / de transferencia**: en vez de "fisiopatología de X", poner un **ECG, una analítica
  o una tira de ritmo REAL** en el anverso y obligarte a interpretarla.
- **Anverso deliberadamente vago**: *"un cateterismo muestra un gradiente de 50 mmHg a través de la
  válvula aórtica: ¿qué significa y qué complicaciones esperarías?"* — **no** *"explica por qué un
  gradiente alto produce HVI"* (eso ya regala la respuesta).
- **Resumen en el reverso**: si la respuesta es larga, resumen de 1-2 líneas al inicio; leer solo el
  resumen el 90 % de las veces.
- **Máximo 2-3 hechos no relacionados por tarjeta**; si la lista es inevitable, **decir el número**
  ("Macrolide – names (3)").
- **"Add reverse" de forma prioritaria** en farmacología, equilibrando la dificultad de las dos
  direcciones (escala 1-10).
- **Cloze**: él lo rechaza — *"I hate cloze even for memorization"*.

**El error que convierte Anki en cramming**:

- Hacer Anki **sin comprender primero** — Anki **retiene, no enseña**; memorizar tarjetas sin la
  fisiopatología = fallar ante cualquier variación de la pregunta.
- **Mazos pre-creados (AnKing/Zanki)**: datos aislados en cloze, inconexos, no adaptados a TUS
  debilidades, y te entierran bajo miles de tarjetas ineficientes.
- **Externalizar las tarjetas a la IA**: te salta el paso cognitivo clave (sintetizar y entender);
  además la IA suele **incluir la respuesta dentro de la pregunta** (*ChatGPT Flashcards: Study More,
  Score Less*).
- **Perfeccionismo**: si una tarjeta exige recordar cada palabra de un reverso largo, **dividirla**.
- **Meter contenido fuera de los "educational objectives" de UWorld**: *"prácticamente todo alumno que
  lo hizo hizo demasiadas tarjetas, se atrasó y se arrepintió"*.

**Protocolo de recuperación de 2.000 tarjetas atrasadas (en 3 días)**:

1. Tarjetas nuevas → **0**.
2. Límite de revisiones temporal en un número **CÓMODO** (100-200/día).
3. Truco psicológico: llegar de 200 a 0 genera dopamina y momentum → subir el límite en incrementos de
   **+100** (300, 400…) hasta limpiar el backlog en ~3 días sin fatiga mental.
   **Si un día caótico rompe la racha, esta es la vía de vuelta — nunca el abandono.**

---

# PARTE IV — INTERPRETACIÓN DE PREGUNTAS + TEST DAY

## A. Método de lectura de viñeta: el marco CCSN

*(Fuentes: "10 Step 2 Score Killers", "How to Boost Your USMLE Score Instantly", "The ONLY Video You
Need to Pass the USMLE Step 1 in 2026", "Question Interpretation")*. Leer buscando buzzwords o leyendo
la última frase primero **es receta para el desastre**. Protocolo:

1. **Contexto (conexión)**: nada es patognomónico aislado; con cada frase preguntarse *¿cómo se conecta
   con lo ya leído?* (el ejemplo canónico: la frase del **pañal de adulto** del caso de SDRA, §4.8 —
   solo significa algo conectada con la ITU de la primera frase).
2. **Cronología (reordenar en presente)**: los redactores mezclan el orden temporal **a propósito**
   para saturar la memoria de trabajo → reordenar mentalmente la viñeta en orden cronológico real
   (*"inicia ACO hace 2 meses → vuelo de 12 h hace 5 días → dolor torácico hace 3 h"* = TVP→TEP obvio,
   §9.11). ***"Your system one is unaware of time."***
3. **Severidad**: define la agresividad del manejo (**a mayor severidad, más invasiva la
   intervención**). Marcadores: **¿lo trajo un familiar?** · ¿FC > PA sistólica (shock)? · ¿disfunción
   de órgano terminal (somnolencia, oliguria)? — regla literal: *"if it's Alzheimer's, someone else
   brings them in; if they're just worried about getting old, they bring themselves"*.
4. **Ruido**: el examen **reduce señal y aumenta ruido deliberadamente** (distractores plausibles tipo
   ERGE en un infarto). Saberlo te protege del pánico en preguntas confusas.

Complementos: **SAQ** (cubrir opciones y formular la pregunta de una línea) · **cronología
fisiopatológica completa** (cadena causa-efecto desde la salud hasta el desenlace: tabaquismo → Ca de
páncreas → hipercoagulabilidad → TVP → TEP → poscarga del VD → precarga del VI → PAM → síncope) ·
**cover-the-options** (el NBME diseña cada pregunta para responderse **sin ver las opciones**; por eso
el redactor está obligado a darte datos suficientes — es la razón de que los criterios de Tokio o de
Kawasaki aparezcan completos en la viñeta, §6.4).

## B. Entre 2 respuestas: sé el JUEZ, no el abogado

- **El abogado (pierde puntos)**: inclinado 80 % por A, busca certeza absoluta, encuentra un detalle
  que no encaja con su concepto idealizado de A (sepsis con extremidades frías; Klinefelter que no es
  alto; enfisema "con fibrosis") → descarta A → **elige B por defecto sin someterla al mismo juicio**.
- **El juez (gana puntos)**: asume que el examen da escenarios imperfectos con ruido; pone ambas
  opciones en la balanza y elige la de mayor **preponderancia de evidencia**.
  > *"Choose the imperfect answer that aligns with the majority of the case."*
- **Técnica Rule In → Rule Out**: (1) construir el caso **A FAVOR** de cada opción (*¿para qué
  escenario exacto sería esta la respuesta correcta? ¿qué datos objetivos la apoyan?*) y **recién
  después** (2) contrastar qué datos objetivos las hacen inviables. Ejemplo canónico: el **filtro de
  VCI** en un TEP (§9.11) — su rule-in exige contraindicación o fallo de la anticoagulación.
- **Regla de oro**: *la falta de evidencia no es evidencia de falta* — nunca descartar un diagnóstico
  razonable porque la viñeta "no mencionó" el buzzword. **Solo se descarta con un dato positivo que lo
  contradiga** (ejemplo suyo: descartar B12 con un VCM de 82 fL, porque la microcitosis contradice
  físicamente la macrocitosis obligatoria).

## C. Timing anxiety: el 2-minute fix + Stress Sets

- **Mito**: "me falta tiempo porque leo lento". **Realidad**: el tiempo se va **rumiando en 3-5
  preguntas difíciles por bloque**; la probabilidad de acertar tras > 2 min invertidos es **inferior al
  promedio** — gastar 4-5 min es "cambiar puntos fáciles por difíciles". Y el diagnóstico fino de
  Palmerton ✅: ***"el problema del tiempo es leer dos veces"*** — se lee **una sola vez, despacio,
  pensando mientras se lee** ("slow is fast").
- **Fix**: en práctica, temporizador físico de **2 minutos por pregunta**; al sonar → adivinar por
  instinto, marcar y avanzar.
- **STRESS SETS** — *cuándo*: últimas 2-3 semanas, con ≥ 60 % del contenido cubierto → **en tu plan =
  Fases B-C, desde el 6-ene (D81)**, ya integrados en la franja 05:00 ("Fases B-C: + STRESS SET
  10Q/12min"). *Formato*: abrir el día con **10Q random cronometradas a 12 minutos exactos**.
  *Objetivo*: el límite asfixiante impide racionalizar de más y entrena la confianza en el primer
  instinto (los scores de stress sets suelen igualar o superar los bloques normales — **prueba
  empírica de que tu primer instinto es tu aliado**).

## D. Psicología: romper la Panic Trap

1. **Worst-Case Scenario Planning**: abrir el miedo en detalle vívido y diseñar el plan de contingencia
   real ("si repruebo, ¿qué hago al día siguiente?") → constatar que la vida sigue **desactiva el
   pánico**.
2. **Affect labeling**: nombrar la emoción explícitamente ("siento pánico porque este examen importa,
   pero separo la emoción de mis acciones; sigo con mi sistema") — reduce la actividad de la amígdala
   de inmediato. Drill del corpus: **"Oh F#@& → OK"**.
3. **"Bad test-taker" es una identidad, no una habilidad**: el modelo que él usa tras un fallo es
   **≈ 20 % cognición negativa / 80 % brecha real** — *"and, not either/or"*: hay que cerrar el vacío
   **y** desmontar la creencia (el caso de Paget, §12.1).
4. **EMDR**: para traumas de exámenes previos; recomienda sesiones nocturnas de auto-EMDR de 1-1,5 h
   (ver Divergencias — **no está en el diseño del plan**; opcional si aparece bloqueo real de test-day).

## E. Últimas 1-2 semanas (= tu Fase C, D89-D95 · 18-ene → 26-ene)

- **Regla de retención 10x**: consolidar lo estudiado es **10 veces más eficiente** que meter contenido
  nuevo en un cerebro cansado → **cero temas nuevos**; solo Anki + bloques mixtos.
- **Overtraining**: al menos un simulacro-maratón de **8-9 h seguidas** (UWSA + NBME el mismo día) para
  aclimatar resistencia. En tu plan: usar un viernes de Fase B/C si el GO está sólido.
- **Familiarity breeds calm**: rendir el **Free 120 en el MISMO Prometric del examen** (ruta,
  seguridad, sillas) — disuelve la ansiedad logística. Tu **D93 (vie 22-ene)** es el Free 120:
  evaluarlo presencial en Prometric Lima si la logística lo permite.

## F. Test Day (semana 25-29 ene 2027 · target mié 27-ene)

> **v5.9**: el plan termina el **mar 26-ene** (D95, rapid review First Aid + Anki + 20Q flagged), que
> ya cae dentro de la ventana de examen y es además la **víspera del target (mié 27-ene)**. Con la v5.9
> ya **no queda ningún día libre entre el final del plan y el examen**: si Joseph mantiene el mié 27
> estudia el D-1; moviendo el examen al **jue 28** o **vie 29** (misma ventana) recupera 1 o 2 días de
> taper. El protocolo D-1/D-2 sigue siendo decisión abierta (ver `PALMERTON_DIVERGENCIAS_PLAN.md` §E-5).

- **Hack de +15 min**: saltar el tutorial (ya conoces la interfaz; solo verificar auriculares) → esos
  15 min pasan al banco de descansos = **60 min totales**.
- **Cronograma de descansos** (Step 1, 7 bloques): B1+B2 seguidos (máx. un sit-in break) → break activo
  10' (snack 1) → B3+B4 seguidos → break activo 10' (snack 2) → **B5 → ALMUERZO 20-30'** → B6 → break
  final 10' (snack 3) → **B7 a máxima concentración**.
- **Sit-in breaks**: "Take a break" pero quedándote sentado 1-2 min con ojos cerrados y respiración —
  salir de sala cuesta hasta 30 min si el escáner de huellas falla.
- **Alimentación cero-decisiones**: bolsas Ziploc etiquetadas "Break 1/2/3" con porciones listas ·
  proteína magra + grasas saludables, **NO carbohidratos simples** · granos de café cubiertos de
  chocolate = cafeína de absorción lenta sin volumen de líquido.

## G. EL PATRÓN DE LOS QUE FALLAN — checklist de alarmas *(conservado íntegro de la v2)*

*(Fuentes: "The 10 Behaviors that Guarantee a USMLE Fail", "IMG Neurosurgeon Passed His NBMEs, Then
Failed Step 1", "9 Habits to Quit for USMLE 260+", "Why Tutoring Doesn't Move Your USMLE Score")*.
El fracaso — sobre todo en retakes — es **de comportamiento y proceso, no de capacidad**. Revisar esta
lista **en cada hito NBME**; **una sola alarma activa = corregir esa semana**:

- [ ] **Evitar la validación rápida**: llevo > 1 semana sin un bloque riguroso que confirme ≥ 80 % en
  lo que estudié (el ciclo correcto es 24-48 h, no 30-45 días de lectura pasiva).
- [ ] **Procrastinación productiva**: coloreo apuntes, reorganizo el calendario, acumulo recursos que
  no leo — ilusión de trabajo que evita el esfuerzo doloroso real (preguntas con cronómetro +
  repetición espaciada activa).
- [ ] **Personalizar el fracaso**: "soy malo para los exámenes" en vez de aislar la brecha
  (knowledge / transfer / proceso) y atacarla quirúrgicamente.
- [ ] **"Solo necesito pasar"**: la prisa fija fechas por burocracia → recortar esquinas → volumen sin
  análisis → memorizar explicaciones en vez de principios. **Dominar el material lleva a rendir ANTES
  y mejor** que obsesionarse con la fecha.
- [ ] **Simulacros en condiciones de confort** (el caso del IMG neurocirujano que pasaba sus NBMEs en
  casa con 70-80 % y falló en Prometric): sin condiciones reales ni estrategia sistemática, la presión
  del centro activa traumas no procesados → pánico defensivo → rumiar, dudar y **cambiar decenas de
  respuestas correctas**. Antídotos: simulacros timed estrictos, stress sets, Free 120 en el Prometric
  real, protocolo de pánico (D).
- [ ] **Cambiar respuestas correctas** por intolerancia al ruido (modo abogado).
- [ ] **Mazos gigantes ajenos / tarjetas sin comprensión** (Anki como cramming).
- [ ] **Capar u omitir las revisiones vencidas de Anki** (deuda → avalancha → abandono).
- [ ] **Releer lo que ya sé** porque se siente productivo, en vez de auditar debilidades.
- [ ] **Estudiar de noche exhausto** y saltarse el Anki matinal.

---

# PARTE V — PLANIFICACIÓN, NBME Y EFICIENCIA

## A. Criterio EXACTO para mover o mantener la fecha

*(Fuente: "48% NBME. Should She Move Her Step 1?" + "Fail Step 1? How to Score 90%+ on Next Attempt")*.
**Un NBME bajo no mide capacidad: mide que la metodología actual no funciona.**

- **Métrica de seguridad**: NO agendar ni rendir hasta un **NBME ≥ 65 %** (≈ 95 % de probabilidad de
  aprobar); ideal **≥ 70 %** (≈ 99 %). **Nunca presentarse "con esperanza".**
- **Regla del 5 % mensual**: con estudio eficiente a tiempo completo se proyecta **~+5 % de NBME por
  mes**. Brecha de 20 puntos = ~4 meses reales; cerrarla en 2 semanas es **biológicamente imposible**.
- **Puntaje sobre deadline**: las fechas artificiales por pánico → recortar esquinas → peor resultado.
  Si el NBME no respalda, **aplazar sin drama**.

**Integración con tu GO/NO-GO** (2 NBME consecutivos ≥ 68 % + UWSA2 "low risk" — **se MANTIENE**; el
68 % queda dentro del rango Palmerton 65-70). Aplicando su regla del 5 %/mes hacia atrás desde el 68 %
del NBME 31 (15-ene), los mínimos "on-track" por hito quedan **exactamente iguales que en la v2 — las
fechas NO se han movido; solo cambia el D#**:

| Hito | Fecha | D# (v5.9) | Mínimo on-track (regla 5 %/mes) |
|------|-------|-----------|----------------------------------|
| UWSA1 | vie 11-sep | **D1** | baseline — cualquier valor sirve; ~48 % ya es trayectoria de GO |
| NBME 25 | vie 2-oct | **D16** | ≥ 51 % |
| NBME 26 | vie 23-oct | **D31** | ≥ 54 % |
| NBME 27 | vie 13-nov | **D46** | ≥ 57 % (gate 1 ECFMG pide ≥ 55 %: coherente) |
| NBME 28 | vie 4-dic | **D61** | ≥ 61 % |
| NBME 29 | vie 18-dic | **D71** | ≥ 63 % (gate 2 pide ≥ 60 %: coherente) |
| NBME 30 | mié 30-dic | **D78** | ≥ 65 % (umbral de seguridad Palmerton alcanzado) |
| UWSA2 | vie 8-ene | **D83** | "low risk" |
| NBME 31 | vie 15-ene | **D88** | **≥ 68 % → GO** |
| NBME 32 | lun 18-ene | **D89** | sprint (medición, no gate) |
| NBME 33 | mié 20-ene | **D91** | sprint (medición, no gate) |
| Free 120 | vie 22-ene | **D93** | familiarización + logística |

Si un hito cae **> 5 puntos bajo su mínimo** → la respuesta **NO es estudiar más horas**: es **auditar
el MÉTODO esa misma semana** (checklist §G) y, si **dos hitos seguidos** fallan, activar el plan B de
fecha (feb-mar, mismo *eligibility period*) **SIN tocar el proceso de maestría**.

## B. Estructura de día que él recomienda vs la tuya

| Elemento | Palmerton | Plan v5.9 | Veredicto |
|----------|-----------|-----------|-----------|
| Anki a primera hora, mente fresca | Sí — "duplica la velocidad" | **05:00-05:45 ANKI AM** + 07:15 repaso | ✅ coincide (aún más temprano) |
| Contenido: subtema de First Aid con el "por qué" + tarjetas propias | por la tarde | **DEEP PRIME 09:00-11:00** | ✅ mismo contenido; hora distinta (ver Divergencias) |
| Preguntas del tema EL MISMO DÍA | por la noche | PRE-TEST 10Q antes (08:15) + 30Q consolidación (11:00) + eval 18:00 | ✅ cubierto y ampliado: el pre-test ciego ANTES es el "preguntas como diagnóstico" |
| Tarjetas de fármacos por la noche (trabajo mecánico) | sí, explícito | franja de tarde/noche del plan | ✅ compatible |
| Máx. 50 tarjetas nuevas/día | límite duro | ≤ 10 de mecanismo + gaps | ✅ por debajo del límite |
| Una sola pasada profunda de UWorld | sí — repetir el banco entrena reconocimiento de texto, falsa maestría | Fase A = 1ª vuelta completa; **Fase B repasa solo INCORRECTS** | ✅ compatible |
| Empezar pequeño (one push-up rule) | mínimo minúsculo para el momentum | mínimo innegociable del día caótico = **Anki + 10Q pre-test** | ✅ coincide |
| Validación en ciclos 24-48 h | ≥ 80 % en el subtema de ayer | eval acumulativa diaria 18:00 + consolidación + **5Q del subtema de ayer a las 07:15** | ✅ coincide y está instrumentado en el `.ts` |

## C. Técnicas de eficiencia por hora

- **Dejar de estudiar lo que ya sabes**: auditar brutalmente y dedicar el tiempo **SOLO a debilidades y
  lagunas diagnósticas** (la relectura cómoda es falsa productividad).
- **Principios, no datos**: un principio (**lipofilia y membranas**) responde miles de preguntas sin
  listas. Es literalmente el "ultimate memory hack" (§15.1).
- **Cover-the-options** en cada viñeta de práctica.
- **Shopping List** al revisar cada bloque (**incluye las preguntas correctas**).
- **Preguntas de integración primero**: la diapositiva 2 de cada clase High Yield son las "integration
  and application questions" — *"si puedes explicarlas entiendes la mayoría del PowerPoint; en vez de
  50-60 tarjetas te bastan una docena"*. Se puede **ver el vídeo a 2× concentrándose solo en ellas**, y
  hacer esas tarjetas **INMEDIATAMENTE después; si no, nunca lo harás**.
- **Ingeniería del entorno**: bloqueadores de internet en horario fijo — *"block my access to e-mail
  from 6 PM to noon the next day"*, *"brick my phone every night at 8:30"*. **Lo que se elimina del
  entorno no gasta fuerza de voluntad.** Tiempos muertos (transporte, ventanas de 5-10 min) = repasos
  de Anki en el móvil.
- **Plazos naturales** (del modelo de ADHD, §13.2): estudiar temprano **porque la clase de después es
  un plazo real**; por la noche *"mi autocontrol es más débil y no hay plazo"*. Tu franja 05:00-12:00
  es exactamente eso.
- **Step 1 → Step 2**: solapamiento **80-90 %** del material; Step 1 pass/fail = "zona de entrenamiento"
  de las destrezas de lectura para el **Step 2 CK, que sí puntúa**. Dominar Step 1 + no olvidar (FSRS)
  es la estrategia más potente para el ≥ 260 en CK.

---

# FUENTES DEL MÉTODO GLOBAL *(v1-v2 — URLs verificadas, se conservan íntegras)*

[Question Interpretation](https://www.yousmle.com/question-interpretation/) ·
[UWorld + First Aid: 4 Keys](https://www.yousmle.com/nail-fundamentals-usmle-step-1-nbme-practice-exams/) ·
[UWorld FAQ (270)](https://www.yousmle.com/uworld-strategy/) ·
[How to Review UWorld](https://www.yousmle.com/how-to-review-uworld/) ·
[UWorld + Anki: 5 Ways](https://www.yousmle.com/uworld-explanations-anki/) ·
[UWorld Note-Taking](https://www.yousmle.com/uworld-notes/) ·
[5 Keys Anki/Spaced Repetition](https://www.yousmle.com/5-keys-rock-usmle-step-1-anki-spaced-repetition/) ·
[Med School Anki](https://www.yousmle.com/med-school-anki/) ·
[Anki FAQ](https://www.yousmle.com/med-school-anki-faq/) ·
[AnKing: Promise and Pitfalls](https://www.yousmle.com/anking/) ·
[Why I Stopped Using Zanki](https://www.yousmle.com/zanki-brosencephalon-review/) ·
[Five 5-Minute Anki Card Tips](https://www.yousmle.com/five-5-minute-or-less-anki-card-tips-to-supercharge-your-usmle-step-1-score-5-will-make-your-a-superstar-on-wards/) ·
[How Much Memorization Is Needed](https://www.yousmle.com/usmle-memorization-necessary/) ·
[How to Memorize for the USMLE](https://www.yousmle.com/how-to-memorize-usmle/) ·
[Is Memorization Enough? (270)](https://www.yousmle.com/usmle-step-1-score-of-270-is-memorization-enough/) ·
[Mastering Step 1 vs Step 2](https://www.yousmle.com/how-to-score-270-by-mastering-step-1-vs-step-2/) ·
[Step 1 Study Schedule](https://www.yousmle.com/step-1-study-schedule/) ·
[Study Schedule Detailed](https://www.yousmle.com/step-1-study-schedule-detailed/) ·
[Study Schedule 250+](https://www.yousmle.com/step-1-study-schedule-preclinical-250/) ·
[Summer Step 1 Study Plan](https://www.yousmle.com/summer-step-1-study-plan/) ·
[Study Plan Priorities (Bloom)](https://www.yousmle.com/step-1-study-plan-priorities/) ·
[10 Habits Step 1 Study Plan](https://www.yousmle.com/10-habit-step-1-study-plan-270-pass-fail/) ·
[USMLE Timing](https://www.yousmle.com/usmle-timing/) ·
[Improve Without Cramming](https://www.yousmle.com/improve-usmle-without-cramming/) ·
[Panic to Focus (Speed Drill)](https://www.yousmle.com/usmle-panic-to-focus/) ·
[Test Taking Anxiety](https://www.yousmle.com/test-anxiety/) ·
[9 Open Secrets NBME](https://www.yousmle.com/usmle-question-writing-open-secrets/) ·
[7 Reasons Your NBMEs Aren't Improving](https://www.yousmle.com/nbmes-not-improving/) ·
[1-2 Weeks Before Your USMLE](https://www.yousmle.com/1-2-weeks-before-your-usmle-step-1/) ·
[258 in 6 Weeks (caso)](https://www.yousmle.com/usmle-step-1-250s/) ·
[Beyond UFAP](https://www.yousmle.com/ufap/) ·
[Don't Read the Last Line First](https://www.yousmle.com/dont-read-the-question-first/) ·
[High Yield Study Mastery](https://www.yousmle.com/step-1-usmle-high-yield-study/) ·
[Cheat Sheets (índice)](https://www.yousmle.com/usmle-step-1-cheat-sheets/) ·
[Resources](https://www.yousmle.com/resources/) ·
[Yousmle home](https://www.yousmle.com/) ·
[Canal YouTube](https://www.youtube.com/@alec.palmerton_md)

**Vídeos (URLs verificadas de la v1-v2)**:
[8 Signs Studying Wrong](https://www.youtube.com/watch?v=KsIWwvCzgso) ·
[Difference 230 vs 260+](https://www.youtube.com/watch?v=yvchLee9Ql0) ·
[Biggest USMLE Mistake](https://www.youtube.com/watch?v=a3iZ3lxHm08) ·
[Score 260+ in 2025](https://www.youtube.com/watch?v=PGlLTDdX1ig) ·
[Score 260+ in 2026 (Evidence-Based)](https://www.youtube.com/watch?v=7sS9ASCzPU8) ·
[Anki Efficiently](https://www.youtube.com/watch?v=KLvyhGPQSrM) ·
[The Anki Mistake](https://www.youtube.com/watch?v=yTsETx4D7nU) ·
[Overwhelmed with Anki?](https://www.youtube.com/watch?v=S8Vc5mIv5Gs) ·
[How to Retain What You Study](https://www.youtube.com/watch?v=eUYs00Im8ug) ·
[How to Review USMLE Questions for 20-30+ Points](https://www.youtube.com/watch?v=faCaXnY1c9U) ·
[How to Make Hard USMLE Questions Easy / Study So Fast It Feels Like Cheating](https://www.youtube.com/watch?v=OwsxvQPL8oc) ·
[10 Behaviors that Guarantee a Fail](https://www.youtube.com/watch?v=Kj7tAyooE3o) ·
[30,660 Hours](https://www.youtube.com/watch?v=txFaCwqpuK0) ·
[From Failure to 260+](https://www.youtube.com/watch?v=WaQ4zMWTFk0) ·
[48% NBME. Should She Move Her Step 1?](https://www.youtube.com/watch?v=mK28jDhl3Mo) ·
[First Aid Ultimate Guide: 5 Phases](https://www.youtube.com/watch?v=fSAbdlygPNE) ·
[STRESS Strategy (test-day)](https://www.youtube.com/watch?v=xCiUcrs8UgQ) ·
[6 Things Successful IMGs Do](https://www.youtube.com/watch?v=lmDDHRtP9iU) ·
[More From Every Hour](https://www.youtube.com/watch?v=hxWFqkn4wa0)

**Vídeos High Yield por materia (IDs verificados en `src/lib/usmleStep1Daily.ts`, campo `palm`)**:
Cardiología [`hOGhcie47nM`](https://www.youtube.com/watch?v=hOGhcie47nM) · Cardiología Parte 2
[`nFfdaHLtxag`](https://www.youtube.com/watch?v=nFfdaHLtxag) · Respiratorio
[`HU3V0kftcqY`](https://www.youtube.com/watch?v=HU3V0kftcqY) · Renal
[`zeM8dMiRsJQ`](https://www.youtube.com/watch?v=zeM8dMiRsJQ) · Renal Parte 2
[`CIIMMIvrRso`](https://www.youtube.com/watch?v=CIIMMIvrRso) · GI
[`8gfhX1aR9-A`](https://www.youtube.com/watch?v=8gfhX1aR9-A) · GI Parte 2
[`E2sE4E6s9B8`](https://www.youtube.com/watch?v=E2sE4E6s9B8) · Endocrinología
[`oQ8PSvInTgM`](https://www.youtube.com/watch?v=oQ8PSvInTgM) · Neuro
[`YIwfdc7E8TU`](https://www.youtube.com/watch?v=YIwfdc7E8TU) · Neuro Parte 2
[`52xHDZJy2sw`](https://www.youtube.com/watch?v=52xHDZJy2sw) · Hematología
[`zFGfP4d_aOc`](https://www.youtube.com/watch?v=zFGfP4d_aOc) · Inmunología
[`Nfp3hs490wM`](https://www.youtube.com/watch?v=Nfp3hs490wM) · Farmacología
[`J2KWVQ67H2U`](https://www.youtube.com/watch?v=J2KWVQ67H2U) · Farmacología Parte 2
[`PvKp25ku0po`](https://www.youtube.com/watch?v=PvKp25ku0po) · Bioquímica
[`FcXG3ux0a1I`](https://www.youtube.com/watch?v=FcXG3ux0a1I) · OB/GYN
[`4D7MO0TR2fY`](https://www.youtube.com/watch?v=4D7MO0TR2fY) · OB/GYN Parte 2
[`nYtSNyXh_Ww`](https://www.youtube.com/watch?v=nYtSNyXh_Ww) · The ONLY Video 2026
[`BOtQJeFE_rc`](https://www.youtube.com/watch?v=BOtQJeFE_rc) · 5X Anki Efficiency (FSRS)
[`Te5RnxeG_Gg`](https://www.youtube.com/watch?v=Te5RnxeG_Gg).
**Sin URL en el corpus (solo título, no inventar enlace)**: *How 260+ Scorers Master Cardio on the
USMLE* · *High Yield Nuclear Medicine: PET, SPECT, VQ Scans* · *Biostatistics SUMMARY STEP 1 + 2* ·
*High Yield Surgery Review* · *High Yield Family Medicine Review* (Parts 1-2) ·
*Pediatrics Shelf Review* / *High Yield Pediatrics Review Part 2* · *The #1 USMLE Cardiology
Equation* · *The Most Useful USMLE Equation Ever* · *Equilibrium/Nernst Potential for the USMLE* ·
*USMLE Step 1 Pharmacology: The Ultimate Memory Hack* · *6 Signs of ADHD I Missed as a High Achiever* ·
*ADHD Superpowers* · *The Step 2 Trap* · *ChatGPT Flashcards: Study More, Score Less*.

**Complementos externos verificados (v2)**: [High-Yield CV — The Match Guy](https://thematchguy.com/usmle-step-1-high-yield-cardiovascular-cardiology-concepts/) ·
[Respiratorio](https://thematchguy.com/usmle-step-1-high-yield-pulmonology-respiratory-concepts/) ·
[Renal](https://thematchguy.com/usmle-step-1-high-yield-renal-concepts/) ·
[GI](https://thematchguy.com/usmle-step-1-high-yield-gastrointestinal-concepts/) ·
[Endocrino](https://thematchguy.com/usmle-step-1-high-yield-endocrine-concepts/) ·
[MSK](https://thematchguy.com/usmle-step-1-high-yield-musculoskeletal-concepts/) ·
[Farmacología](https://thematchguy.com/usmle-step-1-high-yield-pharmacology-concepts/) ·
[Acid-Base — Blueprint](https://blog.blueprintprep.com/medical/now-thats-what-i-call-high-yield-acid-base-physiology/) ·
[Curso Yousmle OB/GYN](https://course.yousmle.com/courses/ob-gyn/sexual-development-menstrual-cycleanovulation) ·
[Yousmle Pharmacology Deck](https://go.yousmle.com/pharmacology-deck).

---

# MAPA DE VACÍOS DEL CORPUS (qué NO se estudia "según Palmerton")

**Regla operativa**: lo que está en esta tabla **no tiene material de Palmerton**. Se estudia con la
fuente estándar del plan (First Aid, Pathoma, Sketchy, B&B, AMBOSS) y **se le aplica el MÉTODO**
(cadena de flechas + tarjeta PC + concepto automático + CCSN + regla del 80 %).

| Bloque | D# del plan | Vacío confirmado | Fuente sustituta |
|---|---|---|---|
| **Cardio** | D8 (22-sep), D15 (1-oct) | bucles presión-volumen · Frank-Starling · fórmula de Laplace · maniobras de soplos · desdoblamiento de S2 · criterios de Jones | First Aid + Costanzo |
| **Respiratorio** | D19-D22 (6-9 oct) | PFTs y DLCO ⚠ (síntesis, no verificado) · surfactante/NRDS ⚠⚠ | First Aid + B&B |
| **Renal** | D27 · D28 (16 y 20-oct) | glomerulopatías por entidad · nefritis intersticial · ADPKD · litiasis por tipo ⚠ | First Aid + UWorld |
| **GI** | D30-D36 (22-oct → 30-oct) | gastrina/CCK/somatostatina · IBP · H. pylori/ZE · Barrett · varices/SAAG · hemocromatosis · Wilson · A1AT · FAP/Lynch · isquemia mesentérica | First Aid + Pathoma |
| **Endocrino** | D39, D41 (3 y 6-nov) | dexametasona y Cushing · feocromocitoma · MEN 1/2A/2B · insulinoma · acromegalia · DI central vs nefrogénica | First Aid + UWorld |
| **Neuro** | D48, D49, D50 (16, 17 y 19-nov) | Wallenberg/Weber/Horner · HSA como entidad · cefaleas · vértigo · **convulsiones y antiepilépticos** · **demencias** · **tumores del SNC** · Guillain-Barré · Lambert-Eaton | First Aid + B&B |
| **Heme** | D53-D56 (23-26 nov) | vWD vs hemofilia · tiempo de sangría y mezclas 1:1 · esferocitosis/Howell-Jolly · PNH · **casi todas las translocaciones** · policitemia vera/JAK2 · reacciones transfusionales (febril, alérgica, IgA) | First Aid + Pathoma |
| **Micro/ID** | **D57-D64 (30-nov → 9-dic)** | **BLOQUE ENTERO sin columna vertebral**: hongos, parásitos, betalactámicos, aminoglucósidos, macrólidos, tetraciclinas, antifúngicos, antivirales | **Sketchy + First Aid + UWorld** |
| **Inmuno** | D5 (17-sep) | **inmunodeficiencias primarias por patrón** (SCID, DiGeorge, CGD, complemento/Neisseria, Chédiak-Higashi, hiper-IgE, hiper-IgM, Wiskott-Aldrich) · rechazo y GVHD | First Aid + UWorld |
| **Repro** | D66-D69 (10-15 dic) | HPV E6/E7 y citología · BRCA · mola · placenta previa/abruptio/acreta · DMG · parto pretérmino · oxitocina · HPB/PSA/finasterida · masas escrotales · insensibilidad a andrógenos | First Aid + UWorld |
| **MSK/Reuma** | **D70 · D72 · D73 (16-17 y 22-dic)** | **BLOQUE ENTERO**: AR vs artrosis, panel de autoanticuerpos, vasculitis por entidad, esclerodermia, miositis, polimialgia, gota, osteoporosis, tumores óseos, anatomía MSK, **derma Step 1** | First Aid + UWorld |
| **Psiquiatría** | **D74-D76 (22-24 dic)** | **BLOQUE ENTERO salvo la duración esquizofrenia/esquizofreniforme**: DSM, sustancias, litio, tricíclicos, IMAO, antipsicóticos, SNM vs serotoninérgico, defensas | First Aid + UWorld |
| **Biostats** | D77 (29-dic) | **sens/esp/VPP/VPN, ROC, LR, NNT/ARR/RRR, IC, lead-time/length-time, pruebas estadísticas** | **paquete de stats de UWorld** (el propio Palmerton remite ahí) |
| **Bioquímica** | D79 (4-ene) | PKU, homocistinuria, galactosemia, fructosa, Pompe/Cori, **lisosomales**, **porfirias**, Lesch-Nyhan, ciclo de la urea · **vitaminas A, B1, B3** | First Aid + Rapid Review Biochemistry |
| **Farma/genética** | D80 (5-ene) | orden cero/primer orden, dosis de carga, **CYP450**, índice terapéutico, agonista parcial · curvas autonómicas (epi/NE/iso/fenilefrina) · **NAC, pralidoxima, naloxona, flumazenil, deferoxamina, fomepizol, azul de metileno** · **imprinting, Hardy-Weinberg, PCR, ELISA**, herencia mitocondrial | First Aid + UWorld |

---

# DIVERGENCIAS DETECTADAS (corpus completo vs plan v5.9 — **el plan NO se cambia**)

1. **Nivel 1 UWorld = 20-30Q/día; el plan hace 30-40Q/día desde D2** (10 pre-test + 20-30
   consolidación). Mitigación ya instrumentada en el `.ts`: los días de **nivel 1 llevan `qDia: 30`**
   (10 + 20), justo dentro del rango de Palmerton, y solo suben a 40 cuando el día pasa a nivel 2-3.
   Si las primeras dos semanas la revisión profunda no cabe en la hora de consolidación, **bajar a 20Q
   y priorizar calidad de revisión sobre volumen** — es exactamente lo que él predica.
2. **Orden del día**: Palmerton pone contenido por la tarde y preguntas por la noche; el plan concentra
   todo en la mañana (05:00-12:00) + eval 18:00. **Decisión de diseño consciente** (la tarde está
   ocupada por ENCAPS/Research/Derma/AURUM/MIR/LIVIANO); se conserva su principio rector — **Anki AM
   con mente fresca y preguntas del tema el MISMO día** — y se adopta además su regla de reparto:
   **las tarjetas mecánicas de farmacología se hacen por la tarde/noche**.
3. **Progresión de niveles vs bloques por sistema**: la Fase A va de 1→3 y la Fase B **sí** tiene ahora
   una fase explícita de **Nivel 4 (D81 · D82 = 6-7 ene · D84 · D85 = 11-12 ene)** antes del Nivel 5 (D86 · D87 · D90 · D92), lo que resuelve
   la divergencia nº 3 de la v2. La **EVAL de las 18:00** sigue dando dosis diaria de nivel 4 durante
   toda la Fase A. **Vigilar en el NBME 30 (D78, 30-dic)** que la transición no duela.
4. **EMDR nocturno 1-1,5 h/día**: recomendación fuerte suya para traumas de examen; **NO cabe en el
   plan** (las noches protegen las 7 h de sueño). Se adopta solo el tier ligero (worst-case planning +
   affect labeling + el modelo 20/80 de cognición negativa). Si en Fase B aparece pánico real en
   simulacros, evaluar EMDR con profesional los **sábados** (día libre) — **nunca sacrificando sueño**.
5. **Umbral de seguridad**: Palmerton dice 65 % (95 % prob.) / ideal 70 % (99 %); el GO/NO-GO pide
   **2 × ≥ 68 % + UWSA2 low risk**. Sin conflicto — 68 está entre 65 y 70 y el requisito de **DOS
   consecutivos** lo hace más robusto que un 65 % aislado. **Se mantiene 68 %.**
6. **"Múltiples pasadas de UWorld" vs Fase B**: su prohibición aplica a **REPETIR el banco completo**
   (entrena reconocimiento de texto). La 2ª pasada de la Fase B (**D86 · D87 · D90 = 12-14 ene · D92 = 21-ene**) es **SOLO de
   incorrects + marked**, que él mismo exige revisar en profundidad. Sin conflicto real; **no convertir
   la Fase B en re-hacer preguntas ya acertadas**.
7. **Heredadas de la v1-v2 (siguen vigentes)**: (a) él sugiere bioquímica/micro/inmuno **temprano** —
   el plan pone inmuno muy temprano (D4 · D5) pero **bioquímica al final (D79)** por rentabilidad de los
   sistemas CORE (compensado: aparece transversal en UWorld desde la S1); (b) él sugiere **PK/PD y
   autonomics en las primeras 2-3 semanas** — el plan los cubre dentro de Cardio (**D11, 25-sep**) y el
   SNA completo en **D45 (12-nov)**, con el día dedicado al final (**D80, 5-ene**); (c) él **rechaza
   los calendarios hora-por-hora** — el plan usa franjas fijas por adherencia demostrada, adoptando su
   red de seguridad: **mínimo innegociable del día caótico = Anki al día + 10Q pre-test**.
8. **NUEVA (v3)**: **tres bloques del plan no tienen columna vertebral en el corpus** —
   **Micro/ID (D57-D64)**, **MSK/Reuma + derma (D70 · D72 · D73)** y **Psiquiatría (D74-D76)**. No es un
   problema del plan sino del cuaderno. **Acción**: en esos 13 días, subir explícitamente el peso del
   **pre-test de las 08:15 como fuente** (no solo como diagnóstico) y de la **shopping list**, y no
   perder tiempo buscando "el vídeo de Palmerton" que no existe. Reflejado en
   `PALMERTON_DIVERGENCIAS_PLAN.md`.
9. **NUEVA (v3)**: la **bioestadística del corpus cubre la mitad conceptual (diseños, OR/RR, p, alfa,
   beta, poder, sesgos) pero NO la mitad de cálculo (sens/esp/VPP/ROC/NNT/IC)**, y **el propio
   Palmerton remite al paquete de stats de UWorld**. Como el plan le da **un solo día (D77, 29-dic)**,
   ese día debe repartirse: vídeo + AMBOSS HY para la mitad conceptual, **paquete UWorld para la mitad
   de cálculo**.

---

# PENDIENTE_USUARIO (a resolver / verificar — 08-sep-2026)

**Errores de NotebookLM ya corregidos por lectura directa — NO reintroducirlos**:
1. **BTK a los 6 meses**: NotebookLM dijo "NO ESTÁ"; **SÍ está, literal** en *Could You Connect
   Conjugate Vaccines and ABO Incompatibility* ("this is a key Step 1 fact"). → §2.4.
2. **Transcriptasa inversa = "RNA-dependent DNA polymerase"**: dijo "NO ESTÁ"; **SÍ está, literal** en
   *Why Does the USMLE Step 1 Care if a Virus Has +RNA or -RNA?*. → §10.3.
3. **Parvovirus B19 / horquillas / fase S / crisis aplásica**: NotebookLM lo presenta como doctrina del
   artículo; **está en la sección de COMENTARIOS** (lector "Chris", 12-dic-2014), endosado por Alec en
   su respuesta. Correcto, **pero no es doctrina de Palmerton**. → §10.3.
4. **Digoxina e hipocalcemia**: el artículo **NO** afirma que la digoxina cause hipocalcemia; lo que une
   los tres temas es **la bomba Na/K y el umbral**. → §12.2.

**A VERIFICAR (contrastar con UWorld/First Aid antes de usar como dato de examen)**:
5. **Gradiente A-a**: no aparece explicado como tal en las fuentes leídas (sí la ecuación del gas
   alveolar con la que se calcula). → §4.3.
6. **Apnea obstructiva del sueño**: la regla "pérdida de peso antes que polisomnografía" es la
   afirmación más frágil del extracto de respiratorio. → §4.14.
7. **Surfactante / SDR neonatal**: la cita apunta a un fichero que **no figura en el inventario de 295
   fuentes** → posible confabulación. **No citar como Palmerton.** → §4.15.
8. **Haptoglobina / hemoglobinuria / hemosiderinuria**: una consulta las negó y otra las desarrolló;
   **no están en la transcripción local de HY Hematology**. → §9.5.
9. **ADAMTS13 y plasmaféresis en PTT**: idem, respuestas contradictorias. → §2.6, §9.10.
10. **Anemia sideroblástica y vitamina B6**: el detalle "deficiencia de B6, cofactor de la síntesis de
    porfirinas" procede de una **fuente derivada añadida al cuaderno**, no de material original de
    Palmerton. El artículo del panel de hierro solo dice "defecto en la síntesis del hemo". → §9.2.
11. **A1c 6,5 %**: la transcripción dice "615"; verificar el literal. → §7.3.
12. **Cifras de la viñeta de CAD** ("15 años, glucosa 550, pH 7,15, HCO3 12, K 4,9, Na 125"): no
    aparecen en las citas. → §5.5, §7.3.
13. **OB/GYN**: prueba de progesterona (medroxiprogesterona 10 días) · definiciones de amenorrea
    primaria 16/14 años · relación LH/FSH en el SOP · tamoxifeno como SERM · cifra β-hCG ≥ 1500 en el
    ectópico · cocaína como teratógeno · sífilis/RPR · ALP placentaria · gen **SHOX** en Turner.
    → §11.5, §11.10.
14. **Psiquiatría**: criterios DSM-5 de trastorno de ansiedad generalizada (3 de 6) — la cita apunta a
    un artículo sobre "flow" que no los contiene. → §13.3.
15. **Bioquímica**: hiperamonemia en MCAD por falta de ATP en el ciclo de la urea · acetil-CoA como
    activador de la piruvato carboxilasa · **escorbuto/vitamina C-colágeno** · relación isoniazida-B6.
    → §15.6, §15.7.
16. **Vitaminas B1 (Wernicke/beriberi), niacina (pelagra/Hartnup) y B6-isoniazida**: **declaradas
    ausentes** en la respuesta con 133 citas; una respuesta anterior las había inventado desde una nota
    generada por el propio NotebookLM. **Tratar como NO presentes.** → §15.7.

**Decisiones de plan pendientes**:
17. Decidir con qué fuente exacta se cubren **bucles PV, Frank-Starling y Laplace** en **D8 (mar 22-sep)** y **maniobras/S2/Jones** en **D15 (jue 1-oct)** — ¿Costanzo? ¿B&B? Anotarlo en el `.ts`
    o en el doc del día para no improvisar esa mañana.
18. **Fuentes no explotadas**: *High Yield Surgery Review*, *High Yield Family Medicine Review Part 2*,
    *The ONLY Video You Need to Pass the USMLE Step 1 in 2026* y *Anki Was Hurting This Med Student's
    Score* **están en el cuaderno pero NO se descargaron en crudo**. Si en algún momento se quiere
    blindar la atribución de valvulopatías, shock, endocarditis, miocardiopatías o micro incidental,
    ese es el camino.
19. **Artefactos del Studio de NotebookLM no descargables**: `usmle-step1-extraction-report.md`
    (MSK/psiquiatría/patología) y `farmacologia-y-metodo-palmerton.md`. Abrirlos desde el panel Studio
    de la web y, si aportan algo nuevo, guardarlos en `DATA/USMLE/_palmerton_v3_extractos/`.
20. **NO insistir con más consultas a NotebookLM** sobre los vacíos ya declarados (hongos, parásitos,
    mecanismos de antimicrobianos, inmunodeficiencias por patrón, hemofilia/vWD, leucemias por
    translocación, reacciones transfusionales, sens/esp/VPP/ROC, lisosomales, porfirias, imprinting,
    Hardy-Weinberg). **Todo eso se cubre con UWorld (5 niveles) + First Aid aplicando el método.**
