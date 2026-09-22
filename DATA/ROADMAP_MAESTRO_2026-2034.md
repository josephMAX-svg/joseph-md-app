# 🗺️ ROADMAP MAESTRO 2026 → 2034 — la ruta completa a Mayo Clinic

> Definido con Joseph el 27-ago-2026. Cada fase tiene UN examen/entregable "rey" que se lleva el
> bloque principal del día; todo lo demás orbita en mantenimiento. Regla de oro: **nunca dos reyes
> a la vez**. Sáb/dom libres en todas las fases (el descanso consolida — no es negociable).
>
> **Actualizado a v5.15 (22-sep-2026) · CORRIMIENTO RÍGIDO.** Ni el lun 21 ni el mar 22 de septiembre se estudiaron → **D1 de la Fase 1 = mié
> 23-sep-2026** (regla del sistema: cada día sin estudiar = +1 hábil; es el **decimocuarto corrimiento**,
> 31-ago→23-sep, 17 días hábiles perdidos). 🆕 **Regla nueva de Joseph: el corrimiento es RÍGIDO** — se desplaza el plan ENTERO (contenido
> **y** los 12 hitos) en bloque, **no se toca ningún tema** y, donde un plan tenía un final clavado, **se AMPLÍAN días** en vez de perder
> sesiones. Sigue vigente su instrucción literal: **ni un tema ni un subtema se deja atrás — no se fusiona ni se recorta nada**.
> **⚠ CONSECUENCIA: el Step 1 termina el VIE 5-FEB-2027 (D95 = D-1 DENTRO del plan: sesión mínima AM + ritual de test-day) → examen target
> LUN 8-FEB-2027** (`DAILY_META.examenTarget = 2027-02-08`, `descansoD1 = 2027-02-05`); el jue 4-feb (D94) es la última sesión de banco y el sáb 6 / dom 7-feb
> quedan libres entre el D95 y el examen (solo Anki vencido). Joseph debe **agendar/reprogramar el Prometric al 8-feb y confirmar que su eligibility
> period lo cubre** (si no: extenderlo, o decidir recortar temario — decisión suya, `DATA/PENDIENTES_JOSEPH.md`). Las **franjas y las
> metas NO se movieron**; 🆕 **los 12 hitos NBME/UWSA/Free 120 ya no están anclados por fecha**: corren con el plan y **conservan su D#**
> (así ningún NBME pierde días de contenido por delante), de modo que **dejan de caer en viernes** — 9 pasan a martes, NBME 32 a miércoles y
> NBME 33 a viernes. El **NBME 31 sigue cayendo el día siguiente al cierre de contenido** (D82 mar 19-ene tras el D81 lun 18-ene: herencia de
> la v5.14). **Desde aquí cada día no estudiado mueve el examen un día hábil más (o exige recortar).** Detalle de la Fase 1 abajo, leído de los `.ts` con node el 22-sep (no estimado).
> *(Histórico v5.14, 19-sep: D1 lun 21-sep, D95 mié 3-feb = D-1 dentro del plan, D94 mar 2-feb última sesión de banco, examen jue 4-feb, hitos aún anclados por fecha. v5.13, 16-sep: D1 jue 17-sep, D95 lun 1-feb = D-1 dentro del plan, D94 vie 29-ene última sesión de banco, examen mar 2-feb. v5.12, 15-sep: D1 mié 16-sep, D95 vie 29-ene = última sesión llenando la ventana, examen lun 1-feb, sáb 30/dom 31 descanso fuera del plan. v5.11, 14-sep: D1 mar 15-sep, D95 jue 28-ene = D-1 dentro del plan, examen vie 29-ene = último día de la ventana. v5.10, 12-sep: D1 lun 14-sep, D95 mié 27-ene con el jue 28 de descanso fuera del plan.)*

## Las fases

| Fase | Ventana | REY (bloque principal) | Mantenimiento | Hito de salida |
|---|---|---|---|---|
| **1 · STEP 1** | **D1 mié 23-sep-2026** → 8-feb-2027 (serie del Calendar desde 31-ago) | 🇺🇸 Step 1 (6h15/día: Anki AM 05:00 + mañana completa + eval 18:00) · **95 días D1-D95 · mié 23-sep-2026 → vie 5-feb-2027** (Fase A contenido D1-D81 23-sep→lun 18-ene · B banco D82-D86 mar 19→lun 25-ene · C sprint D87-D95 mar 26-ene→vie 5-feb; el **D1 ES el UWSA1** —movido del lun 21-sep, baseline en el primer día como prescribe Palmerton— y el contenido arranca el jue 24-sep; D94 jue 4-feb = última sesión de banco, D95 vie 5-feb = D-1 dentro del plan, sáb 6 y dom 7-feb libres antes del examen) | ENCAPS 1h (92 días → **mar 2-feb**, ampliado) · MIR 1h (78 días → mié 13-ene) · Derma↔Research 45' · LIVIANO 45' (90 días → vie 29-ene) · IA 45' | **STEP 1 PASS** (**examen target LUN 8-FEB-2027**, fuera de la ventana 25-29 ene — Prometric y eligibility a confirmar por Joseph; gate: **GO/NO-GO mar 19-ene-2027 = NBME 31 (D82)**, 2 NBME ≥68% + UWSA2 mar 12-ene (D77)) |
| **2 · ENCAPS** | feb → fin-mar-2027 | 🇵🇪 ENCAPS intensivo (hereda la mañana; pre-test = examen 2026-II reservado para el primer día de la intensiva; el mantenimiento ENCAPS ahora llega al **mar 2-feb** y el Step 1 acaba el vie 5-feb, con examen el lun 8-feb → propuesta v5.15: arrancar la intensiva el **vie 5-feb** o el **lun 8-feb**, decisión de Joseph) | MIR mantenimiento 57 días (**jue 14-ene → vie 2-abr-2027**, fin ampliado; modo reducido hasta el D95 vie 5-feb; el lun 8-feb = examen Step 1 → decisión) · Derma↔Research (Derma ciclo 1 hasta d73 jue 15-abr-2027; ciclo 2 D74 lun 19-abr → 8-jul) · academias CURVA+DENSA arrancan | **ENCAPS ≥17/20** (fines de marzo, percentil 1%) |
| **3 · MIR** | abr-2027 → ene-2030 (~2 años de prep + SERUMS) | 🇪🇸 MIR sube a principal progresivamente (CTO/AMIR/ProMIR, vueltas completas) | Step 2 CK secundario creciente (bancos ya inventariados) · research pipeline a régimen | **MIR ene-2030 · Top 50** → Dermatología (Clínic) |
| **4 · Residencia + Step 2 CK** | 2030 → 2033 | Residencia derma + 🇺🇸 Step 2 CK (el score SÍ cuenta: mediana IMG match derma ≈ 253) | Publicaciones en serie (la residencia da casos) · estética desde derma quirúrgica | Step 2 CK 250+ · CV de fellowship |
| **5 · MAYO CLINIC** | 2033-2034 | Aplicación fellowship dermatología estética (ERAS/ECFMG completo) | — | **Mayo Clinic ~2034** |

## Research — el hilo que cruza todas las fases (¿alcanza el 45' interdiario? SÍ, así:)

El slot Research (13:30-14:15, interdiario con Derma) + el pipeline agéntico (research_runner /
discovery / Edge Functions) hacen el trabajo pesado; el humano decide y redacta. Calendario de
publicación (de `DATA/RESEARCH/RUTA_PUBLICACION_2027.md`, revistas y APCs verificados):

| Cuándo | Entregable | Nota |
|---|---|---|
| **lun 26-oct-2026** (C-6, v5.15) | **Carta al editor #1** (respuesta a paper de derma estética) | Esfuerzo mínimo, rompe el hielo, cita real. ⚠ cae 11 días después del deadline interno ≤15-oct (`RUTA_PUBLICACION_2027.md` §9.1): SUBMIT fuera del átomo o diana con ventana más larga |
| **mar 1-dic-2026** (T-8, v5.15) | **Tesis L0 → research letter** a JAAD International | Añadido en v3; el deadline externo era feb-2027 |
| **lun 1-feb-2027** (CR-9) | **Case report #1** → Dermatology Online Journal (MEDLINE, APC ≤$300) | Redacción CARE; el pipeline arma referencias. Paquete congelado en dic-2026 (CR-8). v5.15: cae en el **D91 del Step 1 (lun 1-feb; lejos ya del examen del lun 8-feb)** — SUBMIT en el átomo (≤30 min) = decisión de Joseph |
| **mié 3-mar-2027** (R10, v5.15) | **Protocolo SR-1 en PROSPERO** (línea L4: complicaciones vasculares de fillers — ya viva en la app) | El registro es gratis y sella prioridad |
| **mar 13-jul-2027** (R43, v5.15) | **SR-1 sometida** (Rayyan screening + RoB2 + GRADE con el pipeline) | Primera publicación "de peso" |
| 2027-2029 | +1 case report/año + 1 SR/año + cartas oportunistas | Ritmo sostenible con 45' interdiario |
| **Meta pre-aplicación (2033)** | **8-12 ítems totales**, ≥2 SR, ≥1 primer autor/año | Dato NRMP: IMGs no-match en derma tenían mediana 12 pubs SIN scores — el volumen solo NO basta: **los Steps van primero** (por eso Research no roba horas a Fase 1) |
| ⚠ Cureus | máximo 1-2 ítems en todo el CV | Deslistada de Web of Science (oct-2025) |

## LIVIANO y las academias — suficiencia

- **LIVIANO 45'/día** cubre el currículo académico completo (90 días, **mié 23-sep-2026 → vie 29-ene-2027**; v5.15: el caso integral 16/16 sigue en el **D87**, ANTES del capstone (D89) y de la trimestral II (D90); drills D37/D58/D75/D88, trimestral I D46, Acceso Perú D39 + D41-D44:
  fisiología → GLP-1 → acceso Perú → nutrición → ejercicio → fármacos/bariátrica → conducta → síntesis).
  En enero Joseph explica obesidad al
  nivel de un obesity-medicine fellow — suficiente para ser EL referente del programa. La
  ejecución comercial va aparte (Pulso hub, no roba esta franja).
- **CURVA y DENSA**: febrero 2027 (Fase 2), con currículo tipo LIVIANO_ACADEMIA. NÍTIDA = Derma.
- **IA (vibecoding 45' + misión 30' + PC finde)**: cada proyecto semanal automatiza un pedazo del
  sistema → devuelve MÁS horas de las que consume. Es el único slot cuya rentabilidad es compuesta.
  v5.15: **vibecoding START mié 23-sep-2026 · S1-S12 hasta el 15-dic-2026** (semanas de calendario; S6 26-30 oct = semana deload pero el flag `deload` está en S7 2-6 nov — A DECIDIR) **+ taper hasta el vie 5-feb-2027** (95 días = D# del Step 1) · **SYNAPSE 132 días
  mié 23-sep-2026 → lun 1-feb-2027** (19 semanas; adelantar la última A-unit sigue A DECIDIR) · **AURUM 130 días mié 23-sep-2026 → vie 26-mar-2027** (26 semanas).

## Reglas de transición entre fases

1. La reestructuración de cada fase se hace la SEMANA PREVIA (la de Fase 2 → última semana de
   primera semana de febrero, alrededor del examen del lun 8-feb): el rey saliente libera la mañana, el entrante la hereda; Calendar + app +
   Supabase + memoria se actualizan en bloque (como se hizo el 27-ago).
2. Un examen NO se rinde sin su gate: Step 1 (NBMEs), ENCAPS (sims de viernes ≥18/25 en feb-mar),
   MIR (netas de simulacros al nivel Top 50 antes de inscribir).
3. Cada fase cierra con post-mortem de datos (como el ANALISIS_EXAMEN_2026-2_REAL) → el modelo
   de pronóstico del siguiente examen SIEMPRE se re-entrena con el examen recién rendido.

## Fase 1 en fechas v5.15 (leídas de los `.ts` con node el 22-sep-2026)

| Plan | D1 | Dfin | Nº días | Fichero |
|---|---|---|---|---|
| 🇺🇸 USMLE Step 1 | mié 23-sep-2026 (UWSA1) | vie 5-feb-2027 (D95 = D-1 dentro del plan; D94 jue 4-feb = última sesión de banco; finde 6-7 feb libre; examen lun 8-feb) | 95 | `src/lib/usmleStep1Daily.ts` |
| 🇵🇪 ENCAPS mantenimiento | mié 23-sep-2026 | **mar 2-feb-2027** (fin AMPLIADO, antes vie 29-ene) | **92** | `src/lib/encapsPlan.ts` + Supabase (régimen `MANTENIMIENTO_2027-1 v6.13`, backup `study_schedule_bk_0922`) |
| 🇪🇸 MIR 1ª vuelta | mié 23-sep-2026 | mié 13-ene-2027 | 78 | `src/lib/mirDailyPlan.ts` |
| 🇪🇸 MIR mantenimiento | jue 14-ene-2027 | **vie 2-abr-2027** (fin AMPLIADO, antes mié 31-mar) | **57** | `src/lib/mirMantenimiento.ts` (modo reducido hasta el D95 vie 5-feb; el lun 8-feb = examen Step 1 → decisión) |
| 🔬 Research ciclo 1 | jue 24-sep-2026 | vie 19-feb-2027 | 42 | `src/lib/researchDailyPlan.ts` (**+2 hábiles**; CR-9 lun 1-feb = D91 del Step 1) |
| 🔬 Research ciclo 2 | mar 23-feb-2027 | 26-ago-2027 | 67 | `src/lib/researchDailyPlan2027.ts` (**+2 hábiles**) |
| 🩺 Derma élite | mié 23-sep-2026 | jue 15-abr-2027 | 73 | `src/lib/dermaDailyPlan.ts` (**+2 hábiles**; taper d44-d49 lun 25-ene → lun 8-feb: **d48 jue 4-feb = D94** y **d49 lun 8-feb = día del examen** (sesión opcional → decisión); d50 mié 10-feb; ciclo 2 D74 lun 19-abr → 8-jul en `dermaCiclo2.ts`) |
| ⚖️ LIVIANO Academia | mié 23-sep-2026 | vie 29-ene-2027 | 90 | `src/lib/livianoStudyPlan.ts` (caso 16 = D87, ANTES del capstone D89 y de la trimestral II D90) |
| 💼 Business formato L | mié 23-sep-2026 | jue 21-ene-2027 | **121** | `src/lib/businessStudyPlan.ts` |
| 💰 AURUM | mié 23-sep-2026 | vie 26-mar-2027 | 130 | `src/lib/aurumDailyPlan.ts` (26 semanas) |
| 🧠 SYNAPSE | mié 23-sep-2026 | lun 1-feb-2027 | **132** | `src/lib/synapseDailyPlan.ts` (19 semanas) |
| 🛠 Vibecoding 04:15 | mié 23-sep-2026 | vie 5-feb-2027 (S1-S12 hasta el 15-dic-2026) | 95 | `src/lib/vibecodingPlan.ts` |

*(🆕 En la v5.15 **nadie pierde sesiones**: **Derma abre el mié 23-sep** (d1) y **Research el jue 24-sep** (d1), y los dos planes con final clavado se AMPLÍAN en vez de recortarse — **ENCAPS sigue en 92 días pero llega al mar 2-feb** (antes vie 29-ene) y **MIR mantenimiento sigue en 57 pero llega al vie 2-abr** (antes mié 31-mar). Business sigue en 121 filas (84 de trabajo) y LIVIANO en 90. El temario no pierde nada en ninguno.)*

🆕 **En la v5.15 los 12 hitos de la Fase 1 cambiaron de fecha y NINGUNO cambió de D#** (corrimiento rígido: corren con el plan, así que
conservan íntegros sus días de contenido por delante): **UWSA1 mié 23-sep (D1)** · NBME 25 mar 6-oct (D10) ·
NBME 26 mar 27-oct (D25) · NBME 27 mar 17-nov (D40) · NBME 28 mar 8-dic (D55) · NBME 29 mar 22-dic (D65) · NBME 30 mar 5-ene (D72) ·
UWSA2 mar 12-ene (D77, dentro de la Fase A; el cierre de contenido es D81 lun 18-ene) · **NBME 31 mar 19-ene (D82) = GO/NO-GO, el día siguiente al cierre de contenido** · NBME 32 mié 20-ene (D83) · NBME 33 vie 22-ene (D85) ·
Free 120 mar 26-ene (D87) · **D94 jue 4-feb (D-2, última sesión de banco)** repaso FA 6-10 + Anki maduro + 20Q flagged · **D95 vie 5-feb (D-1, DENTRO del plan)** sesión mínima AM + rapid review + logística Prometric · sáb 6 y dom 7-feb libres (solo Anki vencido) ·
**examen LUN 8-FEB-2027 (target v5.15; fuera de la ventana 25-29 ene → agendar/reprogramar Prometric + confirmar eligibility period)**. ⚠ **Ya ninguno cae en viernes**: nueve caen en martes; UWSA1 (mié 23-sep) y NBME 32 (mié 20-ene) en miércoles y NBME 33 (vie 22-ene) es el único viernes. Viernes de nivel 4 desde S11: **D53 vie 4-dic y D63 vie 18-dic**; viernes de nivel 3: **D8 2-oct · D13 9-oct · D28 30-oct · D33 6-nov · D48 27-nov**. Mínimos on-track: NBME 25 ≥51 · 26 ≥54 · 27 ≥57 ·
28 ≥61 · 29 ≥63 · 30 ≥65 · 31/32/33 ≥68 · Free 120 ≥70 (`src/lib/usmleScores.ts` → `HITOS_ONTRACK`).
