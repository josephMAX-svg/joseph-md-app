# MÉTODO ANKI · APEX — USMLE Step 1 (v6.03b · mar 20-oct-2026)

> **Qué es.** El método de repetición espaciada del Step 1, cerrado y operativo: cómo se configuran los mazos, cómo nace cada
> tarjeta en cada bloque del día (vía el flujo **APEX**: bloque → `Ctrl+Shift+A` / ⚡ APEX 1-TAP → parser n8n → tarjeta en Anki +
> nota en Obsidian), cuántas, con qué formato, cuándo se repasan, qué se hace con el backlog y qué se mide. Está metido **dentro de
> los pasos existentes** de la guía (`src/lib/usmleGuia.ts`, generada por `DATA/_scripts/usmle/gen_usmle_guia.js`): **no cambia
> ninguna franja ni los minutos de ningún bloque**.
>
> **De dónde sale (nada inventado).** Cada regla lleva su origen entre corchetes:
> **[P]** = Palmerton/Yousmle, consultado en NotebookLM *«STEP 1 · Palmerton Engine (método + sistemas)»* (289 fuentes) con citas y
> contrastado con la transcripción cruda de los vídeos clave (`source_get_content`, 20-oct-2026) · **[R]** = docs del repo
> (`PALMERTON_METODO_COMPLETO.md` §§, `PALMERTON_DIVERGENCIAS_PLAN.md`, `SYNC_ANKI_OBSIDIAN_APP.md`, `anki_telemetria.js`) ·
> **[T]** = Tutorías Medicina Interna (Santiago Acosta), NotebookLM *«STEP 1 · Tutorías Medicina Interna (método en español)»*
> (3 vídeos, transcripciones leídas enteras) · **[APEX]** = el motor real (parser v2.3.2/v2.4 de `agente_estudio`, leído el 20-oct) ·
> **[PLAN]** = decisión de este plan cuando la fuente no fija el número o cuando la carga horaria fija obliga a adaptarlo (siempre
> con su porqué). Redacción propia; las citas literales son mínimas y van entre comillas.
>
> Los números operativos (20 nuevas/día, 9999, 0,90, presupuesto por bloque) viven en el generador (`AK` en
> `gen_usmle_guia.js`); si cambian aquí, se cambian allí y se regenera (`node DATA/_scripts/usmle/gen_usmle_guia.js` → `--check`).

---

## 1. El método en 12 reglas

1. **Anki retiene lo que ya entendiste; no sirve para aprender.** Nunca hagas una tarjeta de algo que no sabrías explicar [P · R §4.1].
2. **Las tarjetas se hacen mientras aprendes, el mismo día**, no en lotes al final ni copiando apuntes [P: «Anki Was Hurting This Med Student's Score», «Give Me 30 Minutes…»].
3. **Tus tarjetas, tu frente.** El frente lo escribes tú siempre; una IA como mucho ayuda con el reverso y tú lo corriges [P · R §4.12]. Nada de mazos prehechos masivos [P · T].
4. **Un principio vale más que cien datos**: pregunta por el mecanismo («use the pathophysiology to explain…»), no por el hecho suelto [P «Give Me 30 Minutes…», cambio 1-2].
5. **Formato fijo**: frente `Subject - question` en inglés; reverso con **resumen de 1-2 frases arriba** (`Summary:`) y el porqué; **sin cloze**; una idea por tarjeta [P · R §4.5-4.6].
6. **Filtro de entrada**: el *Educational Objective* manda; antes de crear, pregúntate si vale repasarlo a diario durante 6 meses [P · R §3.5.F].
7. **Tope diario de creación: 20 tarjetas USMLE** (Palmerton pone el techo en 50 y 30-40 al empezar; este plan va por debajo porque la franja de Anki es fija de 45′) [P · PLAN §5].
8. **Vencidas primero, todas, cada día**, a primera hora; las nuevas solo con las vencidas a 0 [P · R §4.10, §4.13].
9. **Botones: Good ≈90 % / Again ≈10 %; nunca Hard ni Easy** [P «Give Me 30 Minutes…», cambio 6].
10. **FSRS con retención 0,90** y **Maximum reviews/day 9999** (nunca capar las vencidas) [P].
11. **Backlog → nuevas a 0 y tope visual de 200** hasta limpiarlo; **nunca Forget ni Reset** [P «How to Catch Up 2,000 Anki Cards in 3 Days» · R §4.10].
12. **Se mide**: telemetría diaria (due, backlog, retención, % Again) e informe APEX de las 18:00; la semana se audita el sábado [R · APEX].

---

## 2. Mazos y cómo se estudian

| Pieza | Valor | Origen |
|---|---|---|
| Mazo padre | `APEX::USMLE` | [APEX] `anki_subdeck_format` |
| Submazos | `APEX::USMLE::<Especialidad>` — uno de los **44 tags** del parser (`Cardiology`, `Pulmonology`, `Nephrology`, `Pathology`, `Pharmacology`…); los crea el motor al vuelo | [APEX] `subtema_mapping.json` › `USMLE.tags_clinicos_a_crear` |
| Submazos del F1 | `::Pathology` (D2-D3) · `::Immunology` (D4-D5) · `::Cardiology` (D6-D16) · `::Pharmacology` (D12 · D24 · D46 · D48) · `::Pulmonology` (D17-D22) · `::Nephrology` (D23-D29) · `::Gastroenterology` (D30-D36) · `::Endocrinology` (D37-D42) · `::Neurology` (D43-D49) | `ankiLinks.usmleAnkiDeck` + regla de abajo |
| Farmacología | submazo propio `::Pharmacology` con su propio tope diario | [P] «Med School Anki: FAQ…» (mazo aparte, «like 20 cards a day») · [R] `ankiLinks.USMLE_PHARM_DECK` |
| **Cómo se estudia** | **un solo clic en el padre** (`APEX::USMLE › Study Now`): Anki junta todos los submazos en una sesión | [PLAN] (ver la conciliación de abajo) |

**«General» no existe en el motor.** El parser APEX **rechaza** `ESPECIALIDAD: General` («USMLE especialidad invalida»). Regla del método:
patología general (D2-D3) → `Pathology`; tarjetas que salen de un hito (UWSA1/NBME) → la especialidad **de la pregunta** (`Cardiology`,
`Microbiology`…). Arreglado de raíz el 20-oct-2026 (§12): `ankiLinks.usmleAnkiDeck` ya no devuelve `APEX::USMLE::General` — los días
«Fundamentos», «Assessment», «Banco intensivo», «Sprint final», «Colchón» y «Reentrada» (y cualquier sistema desconocido) muestran
`APEX::USMLE::Pathology`, el mismo submazo que la guía; `ankiLinks.APEX_USMLE_TAGS` lleva los 44 tags del parser.

**Conciliación con Palmerton (no se contradice: se explica).** Palmerton prefiere **2 mazos (farmacología y el resto), 3 como máximo**,
porque muchos mazos obligan a entrar en cada uno a diario [R §4.2 · P «Med School Anki: FAQ…» preg. 13]; `ANKI_CONFIG_PALMERTON`
lo recoge con el check «nº de mazos ≤ 3». El flujo APEX, en cambio, crea **un submazo por especialidad**. Se cumplen los dos si los
submazos son solo **organización** (búsqueda, informes por sistema) y la **sesión es una sola**, sobre el padre. La fricción que
Palmerton quiere evitar no aparece; Pharm conserva su propio límite. El check «≤ 3 mazos» de `usmleData.ts` deja de aplicar tal cual (§12).

---

## 3. Ajustes exactos de Anki (D1 · mié 21-oct · 05:00)

Un único preset, **«APEX USMLE»**, en el padre y en **todos** los submazos (Deck Options del padre → `Save ▾` → **Save to All Subdecks**).

| Ajuste | Valor | Por qué / origen |
|---|---|---|
| **FSRS** | **Activado**. Si ya lo está (el interruptor vale para toda la colección), déjalo; si no, actívalo y pulsa **Optimize all presets** | [P «Give Me 30 Minutes…»]: con historial previo se activa y se optimiza; **solo quien es nuevo en Anki** usa el algoritmo por defecto ~1 mes antes de activarlo. Joseph ya tiene historial (mazos MIR/ENCAPS) → se activa desde el D1 |
| **Optimize del preset «APEX USMLE»** | **sáb 21-nov** (1.er sábado ≥ 28 días tras el D1), en la franja del sábado 19:00 | [P] FSRS necesita datos tuyos (~1 mes); el preset nuevo empieza sin repasos propios · [R] `SYNC_ANKI_OBSIDIAN_APP.md` («Optimize» cuando haya datos) |
| **Desired retention** | **0,90** | [P] pasar de 90 a 100 % cuesta ~5 veces más tiempo; rango sano 85-90 % |
| **New cards/day** | **20** | [P] techo 50, 30-40 al empezar · [PLAN] 20 = el tope de creación diario (§5): todo lo creado un día se estudia al siguiente sin cola |
| **Maximum reviews/day** | **9999** | [P] «You never want to cap» (las vencidas): un tope bajo esconde vencidas y crea backlog invisible. **Nunca 200** salvo en el protocolo de backlog (§7) |
| **Learning / relearning steps** | **por defecto** (no tocar) | [P · R §4.2] manipularlos deforma el algoritmo; FSRS calcula los intervalos |
| **Display order › New/review order** | **Show after reviews** | [P · R §4.2] «reviews first, new cards second» |
| **Preferences › Review › Next day starts at** | **4** (horas tras la medianoche) | [R §4.2] con el Anki a las 05:00, las tarjetas del día ya están listas |
| **Note type** | el motor APEX crea **Basic** (una cara: Front = FRENTE; Back = REVERSO + CCSN + imagen) | [APEX] `node_anki_obsidian_v2_3.js`. Palmerton usa *Basic (optional reversed)*: aquí la pregunta inversa se hace como **2.º bloque APEX** (§4.4) |
| **Sync** | AnkiWeb **al empezar y al terminar** cada sesión | [R §4.2] |
| **Bury siblings** | sin ajuste (no está en las fuentes) | [R §4.2] |
| **Submazos nuevos** | el motor los crea con el preset **Default** → cada sábado, `Save to All Subdecks` en el padre | [APEX] `createDeck` · [PLAN] |

Telemetría tras configurar: `node DATA/_scripts/anki_telemetria.js` (con Anki abierto) debe leer retención 0,90 y no avisar de
`rev.perDay < 9999`. Desde el 20-oct-2026 el script espera **20** nuevas/día (antes 10, el valor de la v5.7), acepta 0 dentro del
protocolo de backlog (§7) y avisa de los submazos que no tengan el preset «APEX USMLE».

---

## 4. Las tarjetas

### 4.1 Tipos (los que usa el plan)

| Tipo | Cuándo | Forma del frente (inglés) | Origen |
|---|---|---|---|
| **Concept** | deep prime; error K (no lo sabías) | `<Subject> - use the pathophysiology to explain <hallazgo/uso/vía>` | [P «Give Me 30 Minutes…» · R §4.4] |
| **P-to-P** (patogenia → presentación) | deep prime | antes de escribirla, en voz alta: ¿patogenia? ¿presentación? ¿cómo se conectan? | [P «UWorld + First Aid: 4 Keys» · R §4.4] |
| **PC card** (cronología fisiopatológica) | **siempre** que fallaste el diagnóstico; drill del Day-After | `<diagnosis> - pathophysiologic chronology from the root cause to the presenting finding?` · reverso = la cadena **en presente**, 4-6 pasos con `→` | [P «"I Just Need to Pass" Fails…» · R §4.4, §9.2] · forma del frente: [PLAN] |
| **Compare & contrast** | dos entidades con clínica parecida | `<A> versus <B> - use the pathophysiology to explain how to tell them apart by <dato>` | [P · R §4.4] |
| **Transfer** | no reconociste un dato duro (lab, gradiente, imagen) | `<dato concreto> - what is the significance? What follows over time?` | [P «Why You Know the Answer But Still Get It Wrong» · R §6.2] |
| **Diseño del experimento** | ítems experimentales/gráficos del UWSA/NBME (Day-After 2/6) | `<experiment or graph> - what was manipulated, what was measured and what does the result predict?` | [R] `PALMERTON_DIVERGENCIAS_PLAN.md` #24 (propuesta aplicada en la guía) |
| **Farmacología** | días `pharm` (D12 · D24 · D46 · D48) | **1 tarjeta por clase** con el mecanismo que explica uso y toxicidad; la inversa solo si se evalúa | [P] agrupa los efectos adversos por mecanismo; ~6 tarjetas por fármaco (mecanismo, uso y toxicidad en los dos sentidos) · [PLAN] con ≤10 tarjetas/día, por clase |
| **Imagen** (ECG, histología, TC, frotis) | fallaste por no reconocer la imagen | imagen **en el frente** («Identify…») | [P · R §4.4] — **no va por APEX** (el motor pone la imagen en el reverso): créala a mano en Anki escritorio, en el submazo del día |

### 4.2 Reglas de redacción

- Frente **`Subject - question`**: el sujeto primero activa el contexto y acelera el repaso [P «Give Me 30 Minutes…», cambio 7].
- Frente **exigente y sin pistas**: no regales el mecanismo ni el diagnóstico en la pregunta (*information leakage*) [P «ChatGPT Flashcards…» · R §4.6].
- Reverso: **`Summary:` 1-2 frases con el porqué** arriba; detalles debajo solo si hacen falta (el formato APEX limita el REVERSO a ~3 líneas) [P cambio 8 · APEX].
- **1-3 hechos conectados por tarjeta**; una sola respuesta inequívoca; si una lista importa, anota cuántos ítems son («uses (3)») [R §4.4-4.5].
- **Sin cloze** (entrena el reconocimiento de la forma, no el recuerdo) [P · R §4.6].
- Abstrae el *Educational Objective*: sin edad ni sexo del paciente, el principio desnudo [R §3.5.E, §4.6].
- En inglés y **sin tildes ni eñes** dentro del bloque (el parser marca `language_warning`) [APEX].

### 4.3 El bloque APEX del USMLE

```
═══════════ BLOQUE APEX ═══════════
FRENTE: <Subject> - <question>
REVERSO: Summary: <1-2 frases con el porqué>. <detalle opcional>
CCSN: Do not confuse with <X> because <diferencia clave>
FISIO: <mecanismo en 1-2 líneas>          (va a la nota de Obsidian, no a la tarjeta)
RELACIONES: <conexiones>                  (ídem)
EXAMEN: USMLE
ESPECIALIDAD: <uno de los 44 tags: Cardiology, Pathology, Pharmacology…>
SUBTEMA: <NN>_<slug>                      (NN = D# del plan con 2 cifras)
FUENTE: <UWorld | AMBOSS_en | First_Aid | Sketchy | mix_examen_usmle | NBME>
MODO: <estudio | simulacro_step1 | examen_real>
IMAGEN: no
════════════════════════════════════
```

| Campo | Regla del método |
|---|---|
| ESPECIALIDAD | la del submazo del día; en preguntas de hitos y de la eval mixta, **la del sistema de la pregunta**; nunca `General` |
| SUBTEMA | **`<D# de 2 cifras>_<subtema uWorld en inglés>`** — la guía lo da hecho en cada paso (p. ej. `06_normal_cardiovascular_system`, `13_coronary_heart_disease`) · eval de las 18:00: `<D#>_eval` · tarjetas de un hito: `<D# del hito>_uwsa1` / `_nbme25` / `_nbme26` / `_nbme27` / `_nbme28`. Cumple el patrón del parser (`NN_lowercase`) y deja trazar cada tarjeta a su día en Anki (`tag:Subtopic::13_*`) y en el informe APEX |
| FUENTE | lectura/vídeo del deep prime → `First_Aid` · preguntas de uWorld y el UWSA1 → `UWorld` · Mehlman (respaldo) → `mix_examen_usmle` · formas NBME → `NBME`. B&B, PassMedicine o Mehlman no están en la lista blanca del parser: se usa la más cercana y el recurso exacto va en RELACIONES |
| MODO | `estudio` en los días de contenido · `simulacro_step1` en todo lo que nace de un UWSA/NBME (Day-After) |
| Envío | copia el bloque → **`Ctrl+Shift+A`** (PC) o el botón **⚡ APEX 1-TAP** de la app (queda en cola si el PC no está) → *toast* ✓ = nota `Basic` en `APEX::USMLE::<Especialidad>` con etiquetas `apex-import`, `EXAMEN::USMLE`, `FUENTE::…`, `MODO::…`, `FECHA::…`, `Specialty::…`, `Subtopic::…` + nota en `01_USMLE\UWorld|AMBOSS\<Especialidad>\APEX_creados\` del vault. No etiquetes a mano: el motor ya lo hace |

> Rareza conocida del motor: con FUENTE `First_Aid` o `NBME` la nota de Obsidian cae en la carpeta `AMBOSS` (el parser solo separa
> `UWorld`/`mix_examen_usmle` del resto). No afecta a Anki. [APEX `node_parsear_tarjeta_v2_3.js`]

### 4.4 Dos ejemplos (redacción propia)

Concept card del D4 (inmunidad):

```
═══════════ BLOQUE APEX ═══════════
FRENTE: MHC class I vs class II - use the source of the antigen to explain which T cell each one activates
REVERSO: Summary: MHC I shows peptides made inside the cell (all nucleated cells) to CD8+ cytotoxic T cells; MHC II shows peptides taken up from outside (APCs) to CD4+ helper T cells.
CCSN: Do not confuse the loading sites: MHC I is loaded in the RER via TAP; MHC II in endosomes once the invariant chain is removed.
FISIO: Cytosolic protein → proteasome → TAP → RER → MHC I → CD8. Phagocytosed protein → endosome → MHC II → CD4.
RELACIONES: Bare lymphocyte syndrome (MHC deficiency); viral and tumor surveillance by CD8 cells.
EXAMEN: USMLE
ESPECIALIDAD: Immunology
SUBTEMA: 04_principles_of_immunology
FUENTE: First_Aid
MODO: estudio
IMAGEN: no
════════════════════════════════════
```

PC card de un Day-After (pregunta cardiológica del NBME 25):

```
═══════════ BLOQUE APEX ═══════════
FRENTE: Stable angina - pathophysiologic chronology from the root cause to the presenting finding?
REVERSO: Smoking, hypertension and high LDL injure the endothelium → plaque grows into a fixed stenosis (about 70% or more) → exertion raises myocardial O2 demand that the narrowed artery cannot meet → transient subendocardial ischemia → chest pain on exertion, relieved by rest
CCSN: Do not confuse with unstable angina: plaque rupture with a non-occlusive thrombus gives pain at rest.
FISIO: Fixed stenosis limits flow reserve; ischemia reverses before necrosis, so troponin stays normal.
RELACIONES: NBME 25, bloque y numero de la pregunta.
EXAMEN: USMLE
ESPECIALIDAD: Cardiology
SUBTEMA: 10_nbme25
FUENTE: NBME
MODO: simulacro_step1
IMAGEN: no
════════════════════════════════════
```

La inversa (cuando la dirección contraria también se evalúa, p. ej. fármaco ↔ mecanismo): **un 2.º bloque** con la pregunta al revés.
El motor crea notas *Basic* de una sola cara; reversar todo duplicaría el mazo [R §4.2].

---

## 5. Cuotas: el presupuesto de tarjetas del día

**Tope: 20 tarjetas USMLE nuevas al día** (todas las franjas). El preset introduce 20/día, así que lo creado un día se estudia entero al día
siguiente a las 05:00 y no se acumula cola de nuevas.

**Por qué 20 y no 30-50 [PLAN].** Palmerton fija un techo (≤ 50; 30-40 al empezar) y da su calibración: **~1 h por cada 100 repasos
viejos** (2-3 por minuto) y **1-2′ por tarjeta nueva**; cada nueva de hoy es un repaso más mañana, y por encima de 50/día los repasos
«explotan» hacia la semana 3-4 [P «Give Me 30 Minutes…», cambio 5]. Este plan tiene **45′ fijos de Anki entre semana** (05:00), 30′ el sábado
y 15′ opcionales el domingo, y no se tocan franjas: con esa calibración, 45′ dan para unos 75 repasos. 20 nuevas/día es lo que cabe
sin backlog; «la única palanca es crear menos» [R §4.7]. La limitación también obliga a elegir lo importante, que es justo lo que
Palmerton busca al poner un tope.

**Reparto (lo calcula `presupuesto()` en el generador y lo escribe en cada paso):** primero las PC cards y tarjetas de experimento del
Day-After (son obligatorias: diagnóstico fallado → PC card), luego el deep prime, luego la consolidación, luego la eval.

| Tipo de día | Day-After | Deep prime 09:00 | Consolidación 11:00 | Eval 18:00 | Total |
|---|---|---|---|---|---|
| Contenido nivel 1 (incl. D5) | — | ≤ 10 | ≤ 4 | ≤ 5 | ≤ 19 |
| Contenido nivel 2 | — | ≤ 10 | ≤ 3 | ≤ 5 | ≤ 18 |
| Contenido nivel 3 | — | ≤ 10 | ≤ 2 | ≤ 5 | ≤ 17 |
| D2 (UWSA1 3/6 y 4/6) | 2-3 de experimento + 3 PC (07:15) + 3 PC (18:00) | ≤ 10 | ≤ 1 | — | ≤ 20 |
| D3 · D4 (UWSA1 5/6 · 6/6) | 3 PC · 1 PC | ≤ 10 | ≤ 4 | — · ≤ 3 (eval reducida de 5Q) | ≤ 17 · ≤ 18 |
| 1.er día tras un NBME | 2-3 de experimento (07:15) + 3 PC (18:00) | ≤ 10 | ≤ 3 (N2) | — | ≤ 19 |
| 2.º y 3.er día tras un NBME | 3 PC (18:00) | ≤ 10 | según nivel | — | ≤ 16 |
| 4.º día tras un NBME | 1 PC + eval comprimida | ≤ 10 | según nivel | ≤ 3 | ≤ 17 |
| Día de hito (UWSA1/NBME) | — | — | — | — | **0** (el hito se corrige desde las 18:00) |
| Sábado / domingo | — | — | — | — | **0** |

Si se agota el tope, lo que merecería tarjeta va a la **shopping list** de 📏 Medición (se revisa a las 07:15 del día siguiente).

**Divergencia declarada con Palmerton:** en sus mentorías pide **50-60 tarjetas al día** de las 2-4 páginas de First Aid del subtema y
critica a quien hace tarjetas solo de lo que falló [P «How to Retain What You Study…», «The Shohei Ohtani Study Method…»]. El plan
hace ≤ 10 del subtema (Whole Page Rule aplicada a la lectura del deep prime, 20′) + las de errores. Es una consecuencia de la carga fija
(y de empezar desde cero con el inglés); el coste es menos cobertura del subtema en Anki. **Válvula (propuesta, decisión de Joseph):**
si durante 2 semanas las vencidas de las 05:00 caben en < 30′ y los gates del día salen ≥ 80 %, subir el tope a 30 (el rango de Palmerton
para principiantes) y el preset a 30/día.

---

## 6. Cómo nace una tarjeta en cada bloque del día

| Franja (L-V) | ¿Se crean? | De qué · cuántas · formato | Cabecera APEX |
|---|---|---|---|
| **05:00 Anki AM** | no | vencidas primero (sin tope) → nuevas de ayer solo con vencidas a 0 → telemetría. D3-D5: 10′ de Anki + vídeo pendiente (mazo casi vacío) | — |
| **07:15 Repaso anclado** | no | free recall + 5Q de validación; «Anki restante» si quedaron vencidas a las 05:00 | — |
| **07:15 Day-After 2/6** (día siguiente a un hito) | sí | **2-3 tarjetas de diseño del experimento** de los ítems experimentales/gráficos | `ESPECIALIDAD` de la pregunta · `SUBTEMA <D# hito>_nbmeNN` · `FUENTE NBME` (UWSA1: `UWorld`) · `MODO simulacro_step1` |
| **08:15 Pre-test ciego** | no | las dudas van a la shopping list: alimentan las tarjetas del deep prime | — |
| **09:00 Deep prime** | sí | **≤ 10** de la sección leída/vista (concept · P-to-P · compare & contrast · transfer; días pharm: por clase); en voz alta antes de escribir; envío y control con el *toast* | `ESPECIALIDAD` del día · `SUBTEMA <D#>_<subtema uWorld>` · `FUENTE First_Aid` · `MODO estudio` |
| **11:00 Consolidación** | sí | **≤ 4 / 3 / 2** (nivel 1/2/3): por cada incorrecta y cada acierto con duda, el *Educational Objective* → K = concept card del principio · diagnóstico fallado = PC card · QI (leíste/interpretaste mal) = sin tarjeta, micro-destreza al log | `ESPECIALIDAD` del día · `SUBTEMA <D#>_<subtema>` · `FUENTE UWorld` (Mehlman: `mix_examen_usmle`) · `MODO estudio` |
| **18:00 Eval acumulativa** | sí | **≤ 5** (comprimida ≤ 3; reducida del D4 ≤ 3), misma ruta del error | `ESPECIALIDAD` de la pregunta · `SUBTEMA <D#>_eval` · `FUENTE UWorld` · `MODO estudio` |
| **18:00 Day-After 3/6-6/6** | sí | **1 PC card por pregunta del drill** (3 · 3 · 3 · 1): el caso reescrito a mano en orden cronológico y en presente | como la fila del Day-After 2/6 |
| **Hito (UWSA1/NBME)** | no | 05:00 = repasos antes del hito (Palmerton los hacía incluso los días de examen) [R §4.8]; el hito no se corrige en caliente | — |
| **Sábado 19:00** | no | solo vencidas (nuevas = 0, como dice la plantilla del sábado) · `Save to All Subdecks` · telemetría + Stats · el **sáb 21-nov**: FSRS › Optimize | — |
| **Domingo 17:00** | no | opcional (≤ 15′): solo vencidas | — |

La ruta del error sale de Palmerton: *Educational Objective* como filtro y fuente de la tarjeta; PC card cuando el fallo fue no
reconocer el diagnóstico; los errores de interpretación (QI) se corrigen con el proceso (SAQ, CCSN, juez vs abogado), no con más
tarjetas [P «How to Review USMLE Questions…» · R §3.5, §6.1]. Palmerton trata los **aciertos por suerte o con duda** como fallos [R §3.5.B].

---

## 7. Protocolo de backlog

**Disparador:** la telemetría marca **ALARMA G** — **backlog > 100** (vencidas de días anteriores) **o retención 30 d < 85 %**
[R `anki_telemetria.js`]. También [PLAN] si dos días seguidos no llegas a 0 vencidas a las 05:45.

1. **New cards/day = 0** en el preset «APEX USMLE». Puedes seguir creando las tarjetas del día (deep prime, errores): esperan en la cola
   de nuevas; lo que no se hace es estudiar nuevas [P «I Reviewed 28,655 Flashcards…»: crear o no es opcional; estudiarlas, no].
2. **Maximum reviews/day = 200** (un número pequeño a propósito): llevarlo a 0 da sensación de avance; ver 1.800 paraliza [P «Give Me 30 Minutes…» · «How to Catch Up 2,000 Anki Cards in 3 Days»].
3. Al llegar a la pantalla de «Congratulations», si queda energía, **súbelo a 300** (100 más) y repite.
4. **Antes de dormir, vuelve a 200**, para que la mañana siguiente muestre un número abordable [R §4.10].
5. **Nunca** *Forget* en bloque ni *Reset* del mazo: borra el historial de intervalos [P · R §4.10].
6. **Salida:** backlog **< 20** → Maximum reviews/day **9999** y New cards/day **20** [R `anki_telemetria.js`].
7. **Freno extra:** si el % del QBank se estanca o baja, nuevas = 0 y días de limpieza [R §4.10].

Las franjas no cambian: el backlog se limpia dentro de las 05:00, el «Anki restante» de las 07:15 y el sábado.

---

## 8. Horario y fases

| Momento | Qué | Origen |
|---|---|---|
| **L-V 05:00-05:45** | Anki AM: vencidas (33′) → nuevas de ayer (8′) → sync + telemetría (2′); sync al empezar (2′). Primer repaso ≤ 05:10 = verde en la telemetría | [P] repasos a primera hora, con la mente fresca · [R §4.13] |
| **D1 mié 21-oct 05:00** | configuración (§3) + vídeo de Palmerton de Anki/FSRS (0:00-25:00; el final, a las 07:55) | guía D1 |
| **Sábado 19:00-19:30** | solo vencidas (22′) · preset en submazos nuevos (3′) · telemetría + Stats (5′) | plan (Calendar) · [PLAN] |
| **Domingo 17:00-17:15** | **opcional**: solo vencidas | plan (domingo libre). Palmerton haría los repasos también hoy («regla del 100 %»: le dolió saltarse 1-2 días) [R §4.8]; la guía lo dice |
| **Día de hito** | Anki AM normal antes del hito; 0 tarjetas nuevas creadas | [R §4.8] |
| **Pausa ENCAPS (jue 31-dic → lun 15-mar)** | Step 1 en pausa: **0 nuevas** y mantenimiento 30′ a las 05:00 con **retención 0,85** (+ sábado 07:45 «STEP 1 VIVO») | `plantillasV6.ts` (§B2) · [P] rango sano 85-90 %; en vacaciones, como mínimo los repasos viejos, sin excusa |
| **Tramo 2 (mar 16-mar → sep-2027)** | vuelve el preset 0,90 / 20 nuevas; mismo flujo | — |
| **Últimas 1-2 semanas antes del examen** | **nuevas = 0**, solo repasos de lo ya creado; preguntas mixtas y cronometradas (20-40/día) hasta el examen | [P «Before you take your USMLE, watch this» · R §8.3] |

---

## 9. Métricas, telemetría e informes APEX

| Métrica | Dónde | Umbral |
|---|---|---|
| due · backlog · nuevas · maduras | `anki_telemetria.js` → `DATA/USMLE/_anki_telemetria.json` + KPI ANKI del Home | backlog > 100 = ALARMA G |
| **retención 30 d** | ídem (1 − Again/repasos) | objetivo ≈ 0,90; < 0,85 = ALARMA G |
| **% Again** | telemetría (hoy) + Anki › Stats (sábado) | ≈ 10 % sano; **> 20 %** = tarjetas largas o perfeccionismo → divídelas; **≈ 0 %** = no te estás examinando [P «Give Me 30 Minutes…», cambio 6] |
| Hard/Easy | Anki › Stats (botones) | ≈ 0 % [P] |
| hora del 1.er repaso | telemetría (`primeraReview`) | ≤ 05:10 verde · > 05:10 ámbar · sin repaso en L-V = rojo [R] |
| minutos del finde | telemetría (`minFinde` = due × 20 s) | si > 90′, el problema es el backlog entre semana [R `SYNC_ANKI_OBSIDIAN_APP.md`] |
| **APEX USMLE de hoy / de la semana** | informe APEX de las **18:00** (Telegram, `/apex_today` · `/apex_week` · `/apex_exam USMLE`) | hoy ≤ 20 y cerca del presupuesto del día; semana ≤ 100 (5 días × ≤ 20) [APEX `apex_reports_daemon.py`] |
| tarjetas de hitos | Anki › Browse `deck:APEX::USMLE tag:MODO::simulacro_step1` | 10 PC por NBME (drill completo) |
| revisión semanal | `gen_revision_semanal.js` (métrica 3) | media de due, último backlog, retención, `minFinde` |

---

## 10. Tutorías Medicina Interna (Santiago Acosta) — qué dice y cómo encaja

Fuente: los 3 vídeos del cuaderno [T] — «Guía Completa de Preparación para el USMLE STEP 1», «¿Cómo obtener más de 260 en el STEP 1?» y
«El mejor momento para presentar el USMLE Step 1». Son de la época del Step 1 con nota numérica (2020-2021: hablan de las formas NBME
13-18 y de puntajes 230/260); el método vale, las cifras de formas y precios no.

**Su método, en corto:**
- **Preguntas como recurso principal** (dice que le dedicó el 90-99 % del tiempo; 14-15 mil preguntas en total con varios bancos). Recursos
  de aprendizaje activo: flashcards (Anki) y bancos; pasivos (B&B, Pathoma), al mínimo.
- **Flashcards hechas por uno mismo y muy selectivas**: solo lo que se te olvida una y otra vez o te cuesta; nada de lo fácil. Su error:
  pasar todos sus apuntes a Anki (más de 12 mil tarjetas) — imposible de repasar junto a las preguntas. Mazos prehechos: explican
  conceptos, pero el problema del examen es aplicarlos.
- **Entender antes de memorizar** (su ejemplo: segundos mensajeros de los receptores acoplados a proteína G).
- **First Aid**: no como texto de aprendizaje; como **lista de chequeo al final**, para cazar datos que los bancos no te preguntaron.
- **Teoría y preguntas mezcladas desde el día 1**, por sistemas al empezar (20-40 preguntas/día) y subiendo a medida que se acaban los
  vídeos; **por sistemas** = profundidad (principiante), **aleatorio** = retención (avanzado); **tutor** ahorra 1-1,5 h por bloque,
  **timed** entrena el examen.
- **Volumen con rendimientos decrecientes**: su punto óptimo fue **80 preguntas/día**; 200/día lo quemó. Picos de 160-200 solo en
  periodos cortos al final; en general no más de ~10 h/día.
- **Anti-burnout**: vida fuera del estudio, al menos **1 día libre cada 15**, plan que se pueda cumplir en el peor día; planificar por
  **metas** (recursos ÷ días), no por horas.
- **Evaluación**: un simulacro de base al inicio y luego cada 2 semanas o cada mes, anotando los temas débiles para atacarlos;
  agendar el examen cuando los simulacros entran en tu «zona de seguridad».

**Cruce con Palmerton y con este plan:**

| Tema | Tutorías [T] | Palmerton [P/R] | Este plan |
|---|---|---|---|
| Tarjetas propias y pocas | sí, muy selectivas | sí, propias; pero 30-50/día del subtema | **coincide** con ambos en lo esencial: propias, filtradas por el *Educational Objective*, tope 20/día |
| Mazos prehechos | poco útiles | aportan amplitud y retención, no profundidad ni aplicación | no se usan (AnKing queda como legado) |
| Entender antes de memorizar | sí | sí («Anki is for retaining») | regla 1 |
| First Aid | checklist al final | **objetivo de maestría** (Whole Page Rule) | se sigue a **Palmerton** (lectura del deep prime); el uso de checklist de Tutorías encaja en el cierre del tramo 2 |
| Preguntas/día | 80 (punto óptimo) | 5-10 lentas al empezar; calidad > cantidad; 80-100 solo en el final | se sigue el plan (`qDia` por nivel, 30-40Q/día en F1) |
| Tutor vs timed | casi todo tutor | progresión hacia timed y mixto | niveles 1→5 del plan (tutor al empezar; timed desde N2) |
| Bancos | 2 bancos a la vez | UWorld una sola pasada; otro banco solo como complemento | uWorld + Mehlman como respaldo |
| Simulacros | base + cada 2-4 semanas | base + cada 1-4 semanas; Day-After de ~4 h | UWSA1 + NBME 25-28 en F1 con Day-After |
| Descanso | ≥ 1 día libre cada 15 | burnout = frenar QBank, solo Anki viejo | sáb/dom libres (Anki corto) + protocolo de burnout |

**Lo que se adopta de Tutorías:** refuerza el filtro selectivo (§5), el «plan que se cumpla en el peor día» (modo mínimo) y la cadencia
de simulacros. **Lo que no:** First Aid solo al final y 80 preguntas/día en F1 (el plan sigue a Palmerton y a sus niveles).

---

## 11. Divergencias y decisiones (dichas, no escondidas)

| # | Fuente dice | El plan hace | Por qué |
|---|---|---|---|
| 1 | Palmerton: 50-60 tarjetas/día del subtema en mentorías; techo 50 | tope 20/día | franja fija de 45′ (§5); válvula propuesta a 30 |
| 2 | Palmerton: 2-3 mazos | submazos APEX por especialidad + sesión única en el padre | conciliación §2 |
| 3 | Palmerton: *Basic (optional reversed)* | APEX crea *Basic*; la inversa es un 2.º bloque | motor APEX |
| 4 | Palmerton: imagen en el frente | las de imagen se crean a mano (no por APEX) | el motor pone la imagen en el reverso |
| 5 | Palmerton: repasos todos los días | domingo opcional | decisión del calendario (domingo libre); la guía recomienda hacerlos |
| 6 | `SYNC_ANKI_OBSIDIAN_APP.md` y `anki_telemetria.js`: nuevas/día = 10 | 20/día | 10 dejaba sin estudiar parte de lo creado (deep prime ≤ 10 + errores + PC) |
| 7 | guía v6.02c (D1): Maximum reviews/day 200; «si > 200 vencidas, nuevas = 0» | 9999; el tope de 200 solo dentro del protocolo §7, con disparador ALARMA G | Palmerton: nunca capar vencidas |
| 8 | `PALMERTON_METODO_COMPLETO.md` §4.2: no activar FSRS el primer mes «si eres nuevo» | FSRS desde el D1 + Optimize del preset el sáb 21-nov | Joseph no es nuevo en Anki (historial MIR/ENCAPS); el mes de datos se respeta para el preset nuevo |
| 9 | `ankiLinks.usmleAnkiDeck`: Fundamentos/Assessment → `APEX::USMLE::General` | `Pathology` / especialidad de la pregunta | el parser rechaza `General` |
| 10 | sábado en la plantilla: «nuevas = 0» | se respeta (las del viernes esperan al lunes) | — |

---

## 12. Pendientes fuera de este ámbito (para el orquestador)

1. ~~**`src/lib/ankiLinks.ts`**: mapear `Fundamentos` → `Pathology` y `Assessment` → (sin deck propio) para no mostrar `APEX::USMLE::General`, que el motor APEX no acepta.~~ **HECHO 20-oct**: todos los sistemas no de órgano (y el fallback) → `Pathology` = el submazo de la guía; 0 filas USMLE con deck fuera de los 44 tags.
2. ~~**`DATA/_scripts/anki_telemetria.js`**: el aviso `nuevasPorDia !== 10` → 20 (y el texto de `_meta.config.nuevasPorDia` «esperado 10» en `DATA/USMLE/_anki_telemetria.json` al regenerarse)~~ **HECHO 20-oct** (+ protocolo §7, preset de los submazos, rev/día y rollover en los avisos); queda opcional el % de Hard/Easy.
3. ~~**`DATA/SYNC_ANKI_OBSIDIAN_APP.md`** (Verificación D1-D3): «nuevas/día = 10» → 20; «Optimize con ≥ 1.000 revisiones» → sáb 21-nov (4 semanas).~~ **HECHO 20-oct**.
4. **`src/lib/usmleData.ts` · `ANKI_CONFIG_PALMERTON`**: fila «Mazos» y su check «≤ 3» → la conciliación de §2 (submazos = organización, sesión única en el padre).
5. **Motor APEX** (fuera del repo): aceptar la imagen en el frente (o un campo `IMAGEN_FRENTE`) para las tarjetas de imagen; ampliar la lista blanca de FUENTE (B&B, PassMedicine, Mehlman).

---

## 13. Fuentes

**NotebookLM «STEP 1 · Palmerton Engine»** (consultas del 20-oct-2026 + transcripciones crudas): «Give Me 30 Minutes and I'll 5X Your
Anki Efficiency (FSRS, Settings, Strategy)» (leída entera) · «Before you take your USMLE, watch this» (leída entera) · «I Did 913,701 Anki
Reviews. Here's What Actually Works.» · «Med School Anki: FAQ for the USMLE Steps, Shelf Exams, and Clerkships» · «UWorld + Anki: 5 Ways to
Stop Wasting Time and Score Higher» · «How to Master Step 1 Pharmacology Over a Glass of Wine» · «Anki Was Hurting This Med Student's
Score» · «How to Retain What You Study, From USMLE to Residency» · «The Shohei Ohtani Study Method for COMLEX» · «The Step 2 Anki Strategy
That Fixes Stuck Scores» · «From Novice to Anki Expert: Avoid These Top Mistakes» · «First Aid Ultimate Guide: 5 Phases to USMLE Mastery» ·
«I Reviewed 28,655 Flashcards Every Day for 17 Years» · «IMG Neurosurgeon Passed His NBMEs, Then Failed Step 1» · «How to Catch Up 2,000
Anki Cards in 3 Days» · «UWorld: Overcoming 6 "Fails"». Respuesta previa sobre Anki con citas: scratchpad de la sesión
(`palmerton_anki_answer.md`). Una de las consultas devolvió afirmaciones **sin citas** (p. ej. «nuevas = 0 el día del NBME»): no se usaron
salvo que la transcripción o el repo las confirmaran.

**NotebookLM «STEP 1 · Tutorías Medicina Interna (método en español)»**: las 3 fuentes leídas enteras + una consulta de síntesis con citas.

**Repo**: `DATA/USMLE/PALMERTON_METODO_COMPLETO.md` §3.5, §4.1-§4.14, §6.1-§6.5, §8.3, §9.1-§9.2 · `PALMERTON_DIVERGENCIAS_PLAN.md` #16, #24 ·
`DATA/SYNC_ANKI_OBSIDIAN_APP.md` · `DATA/_scripts/anki_telemetria.js` · `src/lib/ankiLinks.ts` · `src/lib/usmleData.ts`
(`ANKI_CONFIG_PALMERTON`) · `src/lib/plantillasV6.ts` (F2: mantenimiento 0 nuevas, 0,85).

**Motor APEX** (fuera del repo, solo lectura): `agente_estudio/config/subtema_mapping.json` v2.3.2 · `scripts/node_parsear_tarjeta_v2_3.js` ·
`scripts/node_anki_obsidian_v2_3.js` · `scripts/apex_hotkey_listener.py` · `scripts/apex_reports_daemon.py`.
