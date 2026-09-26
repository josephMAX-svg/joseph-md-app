# 🗺️ ROADMAP MAESTRO 2026 → 2034 — la ruta completa a Mayo Clinic

> Definido con Joseph el 27-ago-2026. Cada fase tiene UN examen/entregable "rey" que se lleva el
> bloque principal del día; todo lo demás orbita en mantenimiento. Regla de oro: **nunca dos reyes
> a la vez**. Sáb/dom libres en todas las fases (el descanso consolida — no es negociable).
>
> **Actualizado a v5.16 (26-sep-2026) · 2.º CORRIMIENTO RÍGIDO.** Ni el mié 23, ni el jue 24 ni el vie 25 de septiembre se estudiaron → **D1 de la Fase 1 = LUN
> 28-sep-2026** (regla del sistema: cada día sin estudiar = +1 hábil; es el **decimoquinto corrimiento**,
> 31-ago→28-sep, **20 días hábiles perdidos**). Instrucción literal de Joseph: *«TODO A PARTIR DEL LUNES 28 … todo inicia el 28, corre los días que tengas que
> correr al final ya sea MIR, USMLE o ENCAPS y el resto también; lo que haga falta, apertura días si falta más simulacros»*. Sigue vigente la **regla RÍGIDA de v5.15**: se desplaza el plan ENTERO (contenido
> **y** los 12 hitos) en bloque, **no se toca ningún tema** y, donde un plan tenía un final clavado, **se AMPLÍAN días** en vez de perder
> sesiones — y su instrucción permanente: **ni un tema ni un subtema se deja atrás — no se fusiona ni se recorta nada** (multiset del Step 1 vs v5.15 = dif 0).
> **⚠ CONSECUENCIA: el Step 1 termina el MIÉ 10-FEB-2027 (D95 = D-1 REAL: sesión mínima AM + ritual de test-day) → examen target
> JUE 11-FEB-2027** (`DAILY_META.examenTarget = 2027-02-11`, `descansoD1 = 2027-02-10`); el mar 9-feb (D94) es la última sesión de banco y **ya NO hay fin de
> semana libre entre el D95 y el examen** (el sáb 6 y el dom 7-feb son un finde normal dentro del plan). Joseph debe **agendar/reprogramar el Prometric al jue 11-feb y confirmar que su eligibility
> period lo cubre** (si no: extenderlo, o decidir recortar temario — decisión suya, `DATA/PENDIENTES_JOSEPH.md`). Las **franjas y las
> metas NO se movieron**; los 12 hitos NBME/UWSA/Free 120 siguen sin estar anclados por fecha: corren con el plan y **conservan su D#**
> (así ningún NBME pierde días de contenido por delante) y, con el D1 en lunes, **vuelven a caer en viernes** — 8 de los 12; NBME 29 cae en lunes (28-dic, por el
> salto del 25-dic), NBME 32 en lunes (25-ene) y NBME 33 en miércoles (27-ene). El **NBME 31 sigue cayendo el día siguiente al cierre de contenido** (D82 vie 22-ene tras el D81 jue 21-ene: herencia de
> la v5.14). **Desde aquí cada día no estudiado mueve el examen un día hábil más (o exige recortar).** Detalle de la Fase 1 abajo, leído de los `.ts` con node el 26-sep (no estimado).
> *(Histórico v5.15, 22-sep: D1 mié 23-sep, D95 vie 5-feb = D-1 dentro del plan, D94 jue 4-feb última sesión de banco, sáb 6/dom 7-feb libres, examen lun 8-feb, 9 hitos en martes. v5.14, 19-sep: D1 lun 21-sep, D95 mié 3-feb = D-1 dentro del plan, D94 mar 2-feb última sesión de banco, examen jue 4-feb, hitos aún anclados por fecha. v5.13, 16-sep: D1 jue 17-sep, D95 lun 1-feb = D-1 dentro del plan, D94 vie 29-ene última sesión de banco, examen mar 2-feb. v5.12, 15-sep: D1 mié 16-sep, D95 vie 29-ene = última sesión llenando la ventana, examen lun 1-feb, sáb 30/dom 31 descanso fuera del plan. v5.11, 14-sep: D1 mar 15-sep, D95 jue 28-ene = D-1 dentro del plan, examen vie 29-ene = último día de la ventana. v5.10, 12-sep: D1 lun 14-sep, D95 mié 27-ene con el jue 28 de descanso fuera del plan.)*

## Las fases

| Fase | Ventana | REY (bloque principal) | Mantenimiento | Hito de salida |
|---|---|---|---|---|
| **1 · STEP 1** | **D1 lun 28-sep-2026** → 11-feb-2027 (serie del Calendar desde 31-ago) | 🇺🇸 Step 1 (6h15/día: Anki AM 05:00 + mañana completa + eval 18:00) · **95 días D1-D95 · lun 28-sep-2026 → mié 10-feb-2027** (Fase A contenido D1-D81 28-sep→jue 21-ene · B banco D82-D86 vie 22→jue 28-ene · C sprint D87-D95 vie 29-ene→mié 10-feb; el **D1 ES el UWSA1** —movido del mié 23-sep, baseline en el primer día como prescribe Palmerton— y el contenido arranca el mar 29-sep; D94 mar 9-feb = última sesión de banco, D95 mié 10-feb = D-1 REAL, examen al día siguiente sin finde en medio) | ENCAPS 1h (92 días → **vie 5-feb**, ampliado) · MIR 1h (78 días → lun 18-ene) · Derma↔Research 45' · LIVIANO 45' (90 días → mié 3-feb) · IA 45' | **STEP 1 PASS** (**examen target JUE 11-FEB-2027**, fuera de la ventana 25-29 ene — Prometric y eligibility a confirmar por Joseph; gate: **GO/NO-GO vie 22-ene-2027 = NBME 31 (D82)**, 2 NBME ≥68% + UWSA2 vie 15-ene (D77)) |
| **2 · ENCAPS** | feb → fin-mar-2027 | 🇵🇪 ENCAPS intensivo (hereda la mañana; pre-test = examen 2026-II reservado para el primer día de la intensiva; el mantenimiento ENCAPS llega al **vie 5-feb**, el Step 1 acaba el mié 10-feb y el examen es el jue 11-feb → propuesta v5.16: arrancar la intensiva el **vie 12-feb** (día 97, con el pre-test 2026-II ese mismo viernes) o el **lun 15-feb** (día 98), decisión de Joseph) | MIR mantenimiento 57 días (**mar 19-ene → mié 7-abr-2027**, fin ampliado; modo reducido hasta el **jue 11-feb inclusive = día del examen** → decisión: reducido o vacío ese día; normal desde el vie 12-feb; handoff 7-abr, fase principal desde el jue 8-abr) · Derma↔Research (Derma ciclo 1 hasta d73 mié 21-abr-2027; ciclo 2 d74 vie 23-abr → mié 14-jul) · academias CURVA+DENSA arrancan | **ENCAPS ≥17/20** (fines de marzo, percentil 1%) |
| **3 · MIR** | abr-2027 → ene-2030 (~2 años de prep + SERUMS) | 🇪🇸 MIR sube a principal progresivamente (CTO/AMIR/ProMIR, vueltas completas) | Step 2 CK secundario creciente (bancos ya inventariados) · research pipeline a régimen | **MIR ene-2030 · Top 50** → Dermatología (Clínic) |
| **4 · Residencia + Step 2 CK** | 2030 → 2033 | Residencia derma + 🇺🇸 Step 2 CK (el score SÍ cuenta: mediana IMG match derma ≈ 253) | Publicaciones en serie (la residencia da casos) · estética desde derma quirúrgica | Step 2 CK 250+ · CV de fellowship |
| **5 · MAYO CLINIC** | 2033-2034 | Aplicación fellowship dermatología estética (ERAS/ECFMG completo) | — | **Mayo Clinic ~2034** |

## Research — el hilo que cruza todas las fases (¿alcanza el 45' interdiario? SÍ, así:)

El slot Research (13:30-14:15, interdiario con Derma) + el pipeline agéntico (research_runner /
discovery / Edge Functions) hacen el trabajo pesado; el humano decide y redacta. Calendario de
publicación (de `DATA/RESEARCH/RUTA_PUBLICACION_2027.md`, revistas y APCs verificados):

| Cuándo | Entregable | Nota |
|---|---|---|
| **vie 30-oct-2026** (C-6, v5.16) | **Carta al editor #1** (respuesta a paper de derma estética) | Esfuerzo mínimo, rompe el hielo, cita real. ⚠ cae 15 días después del deadline interno ≤15-oct (`RUTA_PUBLICACION_2027.md` §9.1): SUBMIT fuera del átomo o diana con ventana más larga |
| **lun 7-dic-2026** (T-8, v5.16) | **Tesis L0 → research letter** a JAAD International | Añadido en v3; el deadline externo era feb-2027 |
| **vie 5-feb-2027** (CR-9) | **Case report #1** → Dermatology Online Journal (MEDLINE, APC ≤$300) | Redacción CARE; el pipeline arma referencias. Paquete congelado en dic-2026 (CR-8, mié 23-dic). v5.16: cae en el **D92 del Step 1 (vie 5-feb; el examen es el jue 11-feb)** — SUBMIT en el átomo (≤30 min) = decisión de Joseph. ⚠ El átomo siguiente tras la pausa, R8 (d38), cae el **jue 11-feb = día del examen** (saltar o mover al lun 15-feb, `DATA/PENDIENTES_JOSEPH.md`) |
| **mar 9-mar-2027** (R10, v5.16) | **Protocolo SR-1 en PROSPERO** (línea L4: complicaciones vasculares de fillers — ya viva en la app) | El registro es gratis y sella prioridad |
| **lun 19-jul-2027** (R43, v5.16) | **SR-1 sometida** (Rayyan screening + RoB2 + GRADE con el pipeline) | Primera publicación "de peso" |
| 2027-2029 | +1 case report/año + 1 SR/año + cartas oportunistas | Ritmo sostenible con 45' interdiario |
| **Meta pre-aplicación (2033)** | **8-12 ítems totales**, ≥2 SR, ≥1 primer autor/año | Dato NRMP: IMGs no-match en derma tenían mediana 12 pubs SIN scores — el volumen solo NO basta: **los Steps van primero** (por eso Research no roba horas a Fase 1) |
| ⚠ Cureus | máximo 1-2 ítems en todo el CV | Deslistada de Web of Science (oct-2025) |

## LIVIANO y las academias — suficiencia

- **LIVIANO 45'/día** cubre el currículo académico completo (90 días, **lun 28-sep-2026 → mié 3-feb-2027**; v5.16: el caso integral 16/16 = **D87 vie 29-ene**, ANTES del capstone (D89 mar 2-feb) y de la trimestral II (D90 mié 3-feb) — la inversión de v5.15 desapareció sola; drills D37/D58/D75/D88, trimestral I D46 lun 30-nov, Acceso Perú D39 + D41-D44:
  fisiología → GLP-1 → acceso Perú → nutrición → ejercicio → fármacos/bariátrica → conducta → síntesis).
  En enero Joseph explica obesidad al
  nivel de un obesity-medicine fellow — suficiente para ser EL referente del programa. La
  ejecución comercial va aparte (Pulso hub, no roba esta franja).
- **CURVA y DENSA**: febrero 2027 (Fase 2), con currículo tipo LIVIANO_ACADEMIA. NÍTIDA = Derma.
- **IA (vibecoding 45' + misión 30' + PC finde)**: cada proyecto semanal automatiza un pedazo del
  sistema → devuelve MÁS horas de las que consume. Es el único slot cuya rentabilidad es compuesta.
  v5.16: **vibecoding START lun 28-sep-2026 · S1-S12 hasta el vie 18-dic-2026** (bloques de 5 hábiles lun→vie que vuelven a coincidir con las semanas de calendario; SHIP los sábados 3-oct … 19-dic; la semana deload post-NBME 26 es S6 = lun 2 → vie 6-nov pero el flag `deload` está en S7 = lun 9 → vie 13-nov — A DECIDIR) **+ taper S13-S20 hasta el mié 10-feb-2027** (95 días = D# del Step 1) · **SYNAPSE 131 días
  lun 28-sep-2026 → vie 5-feb-2027** (19 semanas; la última A-unit cae el vie 5-feb = D92; adelantarla sigue A DECIDIR) · **AURUM 130 días lun 28-sep-2026 → mié 31-mar-2027** (26 semanas; pitch v5 = D95 mié 10-feb; el D96 cae el jue 11-feb = día del examen → lección opcional).

## Reglas de transición entre fases

1. La reestructuración de cada fase se hace la SEMANA PREVIA (la de Fase 2 → la semana del examen,
   lun 8 → vie 12-feb, alrededor del examen del jue 11-feb): el rey saliente libera la mañana, el entrante la hereda; Calendar + app +
   Supabase + memoria se actualizan en bloque (como se hizo el 27-ago).
2. Un examen NO se rinde sin su gate: Step 1 (NBMEs), ENCAPS (sims de viernes ≥18/25 en feb-mar),
   MIR (netas de simulacros al nivel Top 50 antes de inscribir).
3. Cada fase cierra con post-mortem de datos (como el ANALISIS_EXAMEN_2026-2_REAL) → el modelo
   de pronóstico del siguiente examen SIEMPRE se re-entrena con el examen recién rendido.

## Fase 1 en fechas v5.16 (leídas de los `.ts` con node el 26-sep-2026)

| Plan | D1 | Dfin | Nº días | Fichero |
|---|---|---|---|---|
| 🇺🇸 USMLE Step 1 | lun 28-sep-2026 (UWSA1) | mié 10-feb-2027 (D95 = D-1 REAL dentro del plan; D94 mar 9-feb = última sesión de banco; examen jue 11-feb, sin finde en medio) | 95 | `src/lib/usmleStep1Daily.ts` |
| 🇵🇪 ENCAPS mantenimiento | lun 28-sep-2026 | **vie 5-feb-2027** (fin AMPLIADO, antes mar 2-feb) | **92** | `src/lib/encapsPlan.ts` + Supabase (régimen `MANTENIMIENTO_2027-1 v6.14`, backup `study_schedule_bk_0926`; 75 banqueo1h + 17 mini-sims, todos los viernes desde el vie 2-oct) |
| 🇪🇸 MIR 1ª vuelta | lun 28-sep-2026 | lun 18-ene-2027 | 78 | `src/lib/mirDailyPlan.ts` (D77 vie 15-ene mini-MIR 40Q · D78 lun 18-ene corrección) |
| 🇪🇸 MIR mantenimiento | mar 19-ene-2027 | **mié 7-abr-2027** (fin AMPLIADO, antes vie 2-abr) | **57** | `src/lib/mirMantenimiento.ts` (modo reducido hasta el **jue 11-feb inclusive = día del examen** → decisión: reducido o vacío; normal desde el vie 12-feb; handoff 7-abr, fase principal desde el jue 8-abr) |
| 🔬 Research ciclo 1 | lun 28-sep-2026 | mar 23-feb-2027 | 42 | `src/lib/researchDailyPlan.ts` (**+3 hábiles**; PAUSA jue 7-ene → mié 3-feb; CR-9 vie 5-feb = D92 del Step 1; **R8 jue 11-feb = día del examen** → decisión) |
| 🔬 Research ciclo 2 | jue 25-feb-2027 | lun 30-ago-2027 | 67 | `src/lib/researchDailyPlan2027.ts` (**+3 hábiles**) |
| 🩺 Derma élite | mar 29-sep-2026 | mié 21-abr-2027 | 73 | `src/lib/dermaDailyPlan.ts` (**+3 hábiles**; taper d44-d49 vie 29-ene → vie 12-feb: **d48 mié 10-feb = D95** y **d49 vie 12-feb = día SIGUIENTE al examen** (sesión opcional); d50 mar 16-feb; ciclo 2 d74 vie 23-abr → mié 14-jul en `dermaCiclo2.ts`) |
| ⚖️ LIVIANO Academia | lun 28-sep-2026 | mié 3-feb-2027 | 90 | `src/lib/livianoStudyPlan.ts` (caso 16 = D87 vie 29-ene, ANTES del capstone D89 mar 2-feb y de la trimestral II D90 mié 3-feb) |
| 💼 Business formato L | lun 28-sep-2026 | mar 26-ene-2027 | **121** | `src/lib/businessStudyPlan.ts` |
| 💰 AURUM | lun 28-sep-2026 | mié 31-mar-2027 | 130 | `src/lib/aurumDailyPlan.ts` (26 semanas; pitch v5 D95 mié 10-feb · D96 jue 11-feb = día del examen) |
| 🧠 SYNAPSE | lun 28-sep-2026 | vie 5-feb-2027 | **131** | `src/lib/synapseDailyPlan.ts` (19 semanas) |
| 🛠 Vibecoding 04:15 | lun 28-sep-2026 | mié 10-feb-2027 (S1-S12 hasta el vie 18-dic-2026) | 95 | `src/lib/vibecodingPlan.ts` |

*(🆕 En la v5.16 **nadie pierde sesiones**: **Research abre el lun 28-sep** (d1) y **Derma el mar 29-sep** (d1) — la paridad interdiaria se invierte respecto a v5.15 —, y los dos planes con final clavado se AMPLÍAN otra vez en vez de recortarse — **ENCAPS sigue en 92 días pero llega al vie 5-feb** (antes mar 2-feb) y **MIR mantenimiento sigue en 57 pero llega al mié 7-abr** (antes vie 2-abr). Business sigue en 121 filas (84 de trabajo) y LIVIANO en 90. El temario no pierde nada en ninguno.)*

🆕 **En la v5.16 los 12 hitos de la Fase 1 cambiaron de fecha (+3 hábiles) y NINGUNO cambió de D#** (corrimiento rígido: corren con el plan, así que
conservan íntegros sus días de contenido por delante): **UWSA1 lun 28-sep (D1)** · NBME 25 vie 9-oct (D10) ·
NBME 26 vie 30-oct (D25) · NBME 27 vie 20-nov (D40) · NBME 28 vie 11-dic (D55) · NBME 29 lun 28-dic (D65) · NBME 30 vie 8-ene (D72) ·
UWSA2 vie 15-ene (D77, dentro de la Fase A; el cierre de contenido es D81 jue 21-ene) · **NBME 31 vie 22-ene (D82) = GO/NO-GO, el día siguiente al cierre de contenido** · NBME 32 lun 25-ene (D83) · NBME 33 mié 27-ene (D85) ·
Free 120 vie 29-ene (D87) · **D94 mar 9-feb (D-2, última sesión de banco)** repaso FA 6-10 + Anki maduro + 20Q flagged · **D95 mié 10-feb (D-1 REAL, DENTRO del plan)** sesión mínima AM + rapid review + logística Prometric ·
**examen JUE 11-FEB-2027 (target v5.16; fuera de la ventana 25-29 ene → agendar/reprogramar Prometric + confirmar eligibility period)**. Con el D1 en lunes **8 de los 12 vuelven a caer en viernes**; NBME 29 (lun 28-dic) y NBME 32 (lun 25-ene) en lunes y NBME 33 (mié 27-ene) en miércoles. Viernes de nivel 4: **solo D60 vie 18-dic** (Micro; los viernes de las semanas del 25-dic y del 1-ene no son hábiles); viernes de nivel 3: **D15 16-oct · D20 23-oct · D35 13-nov · D45 27-nov · D50 4-dic**; viernes de nivel 1 que abren sistema: D5 2-oct (Inmuno) · D30 6-nov (GI). Mínimos on-track: NBME 25 ≥51 · 26 ≥54 · 27 ≥57 ·
28 ≥61 · 29 ≥63 · 30 ≥65 · 31/32/33 ≥68 · Free 120 ≥70 (`src/lib/usmleScores.ts` → `HITOS_ONTRACK`).
