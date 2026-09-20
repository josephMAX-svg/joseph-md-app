# 🗺️ ROADMAP MAESTRO 2026 → 2034 — la ruta completa a Mayo Clinic

> Definido con Joseph el 27-ago-2026. Cada fase tiene UN examen/entregable "rey" que se lleva el
> bloque principal del día; todo lo demás orbita en mantenimiento. Regla de oro: **nunca dos reyes
> a la vez**. Sáb/dom libres en todas las fases (el descanso consolida — no es negociable).
>
> **Actualizado a v5.14 (19-sep-2026).** Ni el jue 17 ni el vie 18 de septiembre se estudiaron → **D1 de la Fase 1 = lun
> 21-sep-2026** (regla del sistema: cada día sin estudiar = +1 hábil; es el **decimotercer corrimiento**,
> 31-ago→21-sep, 15 días hábiles perdidos). Instrucción literal de Joseph, reconfirmada en este corrimiento: **ni un tema ni un subtema
> se deja atrás — no se fusiona ni se recorta nada**; el desfase se absorbe alargando el final de cada plan.
> **⚠ CONSECUENCIA: el Step 1 termina el MIÉ 3-FEB-2027 (D95 = D-1 DENTRO del plan: sesión mínima AM + ritual de test-day) → examen target
> JUE 4-FEB-2027** (`DAILY_META.examenTarget = 2027-02-04`, `descansoD1 = 2027-02-03`); el mar 2-feb (D94) es la última sesión de banco y el sáb 30 / dom 31-ene
> quedan libres entre D92 y D93 (solo Anki vencido). Joseph debe **agendar/reprogramar el Prometric al 4-feb y confirmar que su eligibility
> period lo cubre** (si no: extenderlo, o decidir recortar temario — decisión suya, `DATA/PENDIENTES_JOSEPH.md`). Las **franjas y las
> metas NO se movieron**; de los 12 hitos NBME/UWSA/Free 120 solo cambió de fecha el **UWSA1** (el único que cambia en cada corrimiento para
> seguir siendo el D1: vie 11 → lun 14 → mar 15 → mié 16 → jue 17 → **lun 21-sep**), los otros 11 conservan su fecha y bajan 2 su D# (D1 en lunes: el
> **NBME 31 vuelve a caer el día siguiente al cierre de contenido**, D82 vie 15-ene tras el D81 jue 14-ene). **Desde aquí cada día no
> estudiado mueve el examen un día hábil más (o exige recortar).** Detalle de la Fase 1 abajo, leído de los `.ts` con node el 19-sep (no estimado).
> *(Histórico v5.13, 16-sep: D1 jue 17-sep, D95 lun 1-feb = D-1 dentro del plan, D94 vie 29-ene última sesión de banco, examen mar 2-feb. v5.12, 15-sep: D1 mié 16-sep, D95 vie 29-ene = última sesión llenando la ventana, examen lun 1-feb, sáb 30/dom 31 descanso fuera del plan. v5.11, 14-sep: D1 mar 15-sep, D95 jue 28-ene = D-1 dentro del plan, examen vie 29-ene = último día de la ventana. v5.10, 12-sep: D1 lun 14-sep, D95 mié 27-ene con el jue 28 de descanso fuera del plan.)*

## Las fases

| Fase | Ventana | REY (bloque principal) | Mantenimiento | Hito de salida |
|---|---|---|---|---|
| **1 · STEP 1** | **D1 lun 21-sep-2026** → 4-feb-2027 (serie del Calendar desde 31-ago) | 🇺🇸 Step 1 (6h15/día: Anki AM 05:00 + mañana completa + eval 18:00) · **95 días D1-D95 · lun 21-sep-2026 → mié 3-feb-2027** (Fase A contenido D1-D81 21-sep→jue 14-ene · B banco D82-D86 vie 15→jue 21-ene · C sprint D87-D95 vie 22-ene→mié 3-feb; el **D1 ES el UWSA1** —movido del jue 17-sep, baseline en el primer día como prescribe Palmerton— y el contenido arranca el mar 22-sep; D94 mar 2-feb = última sesión de banco, sáb 30 y dom 31-ene libres entre D92 y D93, D95 mié 3-feb = D-1 dentro del plan) | ENCAPS 1h (92 días → 29-ene) · MIR 1h (78 días → lun 11-ene) · Derma↔Research 45' · LIVIANO 45' (90 días → mié 27-ene) · IA 45' | **STEP 1 PASS** (**examen target JUE 4-FEB-2027**, fuera de la ventana 25-29 ene — Prometric y eligibility a confirmar por Joseph; gate: **GO/NO-GO vie 15-ene-2027 = NBME 31 (D82)**, 2 NBME ≥68% + UWSA2 vie 8-ene (D77)) |
| **2 · ENCAPS** | feb → fin-mar-2027 | 🇵🇪 ENCAPS intensivo (hereda la mañana; pre-test = examen 2026-II reservado para el primer día de la intensiva; el día 95 de la cuenta de la app = mié 3-feb = D-1 del Step 1 y el día 96 = jue 4-feb = examen → propuesta v5.14: arrancar el vie 5-feb en el día 97 o el lun 8-feb en el 98, decisión de Joseph) | MIR mantenimiento 57 días (mar 12-ene → mié 31-mar-2027; modo reducido 17 días hasta el mié 3-feb; jue 4-feb = D18 primer día normal = día del examen → decisión) · Derma↔Research (Derma ciclo 1 hasta d73 mar 13-abr-2027; ciclo 2 d74-d103 jue 15-abr → mar 6-jul) · academias CURVA+DENSA arrancan | **ENCAPS ≥17/20** (fines de marzo, percentil 1%) |
| **3 · MIR** | abr-2027 → ene-2030 (~2 años de prep + SERUMS) | 🇪🇸 MIR sube a principal progresivamente (CTO/AMIR/ProMIR, vueltas completas) | Step 2 CK secundario creciente (bancos ya inventariados) · research pipeline a régimen | **MIR ene-2030 · Top 50** → Dermatología (Clínic) |
| **4 · Residencia + Step 2 CK** | 2030 → 2033 | Residencia derma + 🇺🇸 Step 2 CK (el score SÍ cuenta: mediana IMG match derma ≈ 253) | Publicaciones en serie (la residencia da casos) · estética desde derma quirúrgica | Step 2 CK 250+ · CV de fellowship |
| **5 · MAYO CLINIC** | 2033-2034 | Aplicación fellowship dermatología estética (ERAS/ECFMG completo) | — | **Mayo Clinic ~2034** |

## Research — el hilo que cruza todas las fases (¿alcanza el 45' interdiario? SÍ, así:)

El slot Research (13:30-14:15, interdiario con Derma) + el pipeline agéntico (research_runner /
discovery / Edge Functions) hacen el trabajo pesado; el humano decide y redacta. Calendario de
publicación (de `DATA/RESEARCH/RUTA_PUBLICACION_2027.md`, revistas y APCs verificados):

| Cuándo | Entregable | Nota |
|---|---|---|
| **lun 26-oct-2026** (C-6, v5.14) | **Carta al editor #1** (respuesta a paper de derma estética) | Esfuerzo mínimo, rompe el hielo, cita real. ⚠ cae 11 días después del deadline interno ≤15-oct (`RUTA_PUBLICACION_2027.md` §9.1): SUBMIT fuera del átomo o diana con ventana más larga |
| **mar 1-dic-2026** (T-8, v5.14) | **Tesis L0 → research letter** a JAAD International | Añadido en v3; el deadline externo era feb-2027 |
| **lun 1-feb-2027** (CR-9) | **Case report #1** → Dermatology Online Journal (MEDLINE, APC ≤$300) | Redacción CARE; el pipeline arma referencias. Paquete congelado el jue 17-dic-2026 (CR-8). v5.14: cae en el **D93 del Step 1 (lun 1-feb, primer día del cierre D93-D95; ya NO es la víspera del examen, jue 4-feb)** — SUBMIT en el átomo (≤30 min) o el vie 5-feb = decisión de Joseph |
| **mié 3-mar-2027** (R10, v5.14) | **Protocolo SR-1 en PROSPERO** (línea L4: complicaciones vasculares de fillers — ya viva en la app) | El registro es gratis y sella prioridad |
| **mar 13-jul-2027** (R43, v5.14) | **SR-1 sometida** (Rayyan screening + RoB2 + GRADE con el pipeline) | Primera publicación "de peso" |
| 2027-2029 | +1 case report/año + 1 SR/año + cartas oportunistas | Ritmo sostenible con 45' interdiario |
| **Meta pre-aplicación (2033)** | **8-12 ítems totales**, ≥2 SR, ≥1 primer autor/año | Dato NRMP: IMGs no-match en derma tenían mediana 12 pubs SIN scores — el volumen solo NO basta: **los Steps van primero** (por eso Research no roba horas a Fase 1) |
| ⚠ Cureus | máximo 1-2 ítems en todo el CV | Deslistada de Web of Science (oct-2025) |

## LIVIANO y las academias — suficiencia

- **LIVIANO 45'/día** cubre el currículo académico completo (90 días, **lun 21-sep-2026 → mié 27-ene-2027**; v5.14: los 16 casos siguen en los mismos viernes desde v5.11 (caso 1 vie 25-sep = D5) y el caso integral 16/16 vuelve a caer el vie 22-ene (D87), ANTES del capstone del mar 26-ene (D89) y de la trimestral II del mié 27-ene (D90); drills D37/D58/D75/D88, trimestral I D46, Acceso Perú D39 + D41-D44:
  fisiología → GLP-1 → acceso Perú → nutrición → ejercicio → fármacos/bariátrica → conducta → síntesis).
  En enero Joseph explica obesidad al
  nivel de un obesity-medicine fellow — suficiente para ser EL referente del programa. La
  ejecución comercial va aparte (Pulso hub, no roba esta franja).
- **CURVA y DENSA**: febrero 2027 (Fase 2), con currículo tipo LIVIANO_ACADEMIA. NÍTIDA = Derma.
- **IA (vibecoding 45' + misión 30' + PC finde)**: cada proyecto semanal automatiza un pedazo del
  sistema → devuelve MÁS horas de las que consume. Es el único slot cuya rentabilidad es compuesta.
  v5.14: **vibecoding S1-S12 = 60 días lun 21-sep → vie 11-dic-2026 = 12 semanas de calendario** (12 SHIP en sábados 26-sep → 12-dic; S6 26-30 oct = semana deload post-NBME 26 pero el flag `deload` está en S7 2-6 nov — A DECIDIR) + taper S13-S20 (lun 14-dic → mié 3-feb, 95 días = D# del Step 1) · **SYNAPSE 131 días
  lun 21-sep-2026 → vie 29-ene-2027** (110 A-units; la última cae el vie 29-ene = D92, cierre de la última semana completa de banco del plan Step 1 — adelantarla al vie 22-ene sigue A DECIDIR) · **AURUM 130 días lun 21-sep-2026 → mié 24-mar-2027** (pitch v5 el mié 3-feb = D95 = D-1 del Step 1 — A DECIDIR).

## Reglas de transición entre fases

1. La reestructuración de cada fase se hace la SEMANA PREVIA (la de Fase 2 → última semana de
   enero / primera de febrero, alrededor del examen del jue 4-feb): el rey saliente libera la mañana, el entrante la hereda; Calendar + app +
   Supabase + memoria se actualizan en bloque (como se hizo el 27-ago).
2. Un examen NO se rinde sin su gate: Step 1 (NBMEs), ENCAPS (sims de viernes ≥18/25 en feb-mar),
   MIR (netas de simulacros al nivel Top 50 antes de inscribir).
3. Cada fase cierra con post-mortem de datos (como el ANALISIS_EXAMEN_2026-2_REAL) → el modelo
   de pronóstico del siguiente examen SIEMPRE se re-entrena con el examen recién rendido.

## Fase 1 en fechas v5.14 (leídas de los `.ts` con node el 19-sep-2026)

| Plan | D1 | Dfin | Nº días | Fichero |
|---|---|---|---|---|
| 🇺🇸 USMLE Step 1 | lun 21-sep-2026 (UWSA1) | mié 3-feb-2027 (D95 = D-1 dentro del plan; D94 mar 2-feb = última sesión de banco; examen jue 4-feb) | 95 | `src/lib/usmleStep1Daily.ts` |
| 🇵🇪 ENCAPS mantenimiento | lun 21-sep-2026 | vie 29-ene-2027 | **92** (75 banqueo1h + 17 mini-sim) | `src/lib/encapsPlan.ts` + Supabase (backup `study_schedule_bk_0919`) |
| 🇪🇸 MIR 1ª vuelta | lun 21-sep-2026 | lun 11-ene-2027 | 78 | `src/lib/mirDailyPlan.ts` (D5 Cardiología vie 25-sep precede a Cardio Step 1 D6 lun 28-sep; D77 vie 8-ene mini-MIR · D78 lun 11-ene corrección) |
| 🇪🇸 MIR mantenimiento | mar 12-ene-2027 | mié 31-mar-2027 | **57** | `src/lib/mirMantenimiento.ts` (fin clavado al ENCAPS; 46 lun-jue + 11 viernes; reducido 17 días hasta el mié 3-feb, jue 4-feb = D18 primer día normal = examen → decisión; 12 Tier C: 11 jueves desde el jue 14-ene + el mié 31-mar, semanas 1-12) |
| 🔬 Research ciclo 1 | mar 22-sep-2026 | mié 17-feb-2027 | 42 | `src/lib/researchDailyPlan.ts` (**+2 hábiles = +1 slot**; pausa 4→29-ene; CR-9 lun 1-feb = D93 del Step 1, ya no víspera) |
| 🔬 Research ciclo 2 | vie 19-feb-2027 | mar 24-ago-2027 | 67 | `src/lib/researchDailyPlan2027.ts` (**+2 hábiles = +1 slot**) |
| 🩺 Derma élite | lun 21-sep-2026 | mar 13-abr-2027 | 73 | `src/lib/dermaDailyPlan.ts` (**+2 hábiles**; d42 vie 15-ene · d43 mar 19-ene Mohs · taper d44-d49 jue 21-ene → jue 4-feb, d49 = día del examen → swap d43↔taper opcional (decisión); d50 lun 8-feb; ciclo 2 d74-d103 jue 15-abr → mar 6-jul en `dermaCiclo2.ts`) |
| ⚖️ LIVIANO Academia | lun 21-sep-2026 | mié 27-ene-2027 | 90 | `src/lib/livianoStudyPlan.ts` (16 casos en los mismos viernes; caso 16 D87 vie 22-ene ANTES del capstone D89 mar 26-ene y de la trimestral II D90 mié 27-ene) |
| 💼 Business formato L | lun 21-sep-2026 | mar 19-ene-2027 | **121** | `src/lib/businessStudyPlan.ts` |
| 💰 AURUM | lun 21-sep-2026 | mié 24-mar-2027 | 130 | `src/lib/aurumDailyPlan.ts` (pitch v5 D95 mié 3-feb = D-1 → decisión) |
| 🧠 SYNAPSE | lun 21-sep-2026 | vie 29-ene-2027 | **131** | `src/lib/synapseDailyPlan.ts` (110 A-units: F0 48 · F1 24 · F2 38; última A-unit vie 29-ene = D92) |
| 🛠 Vibecoding 04:15 | lun 21-sep-2026 | mié 3-feb-2027 (S1-S12 hasta el vie 11-dic) | 95 (60 + 35 taper) | `src/lib/vibecodingPlan.ts` |

*(Con D1 en lunes la paridad del interdiario vuelve a la de v5.10-v5.12: **Derma abre el lunes 21-sep** (d1) y **Research corre +2 días
hábiles** (d1 mar 22-sep), porque la alternancia anclada al mié 10-jun hace del lun 21-sep un día Derma. Cambian de número
de días ENCAPS (94 → 92: su cierre está clavado el 29-ene; la rotación lun-jue pierde dos slots más) y MIR mantenimiento (59 → 57: su fin está clavado el 31-mar y arranca el mar 12-ene para no pisar el D78 lun 11-ene); SYNAPSE vuelve a 131 (19 semanas completas lun-dom, la última de 5 días). Business sigue en 121 filas (84 de trabajo) y LIVIANO en 90 (sus 16 casos no se mueven). El temario no pierde nada en ninguno.)*

**De los 12 hitos de la Fase 1 solo el UWSA1 cambió de fecha** (es el único que sigue al D1: jue 17 → **lun 21-sep = D1**);
los otros 11 conservan su fecha y solo cambian de D# (todos −2): **UWSA1 21-sep (D1)** · NBME 25 2-oct (D10) ·
NBME 26 23-oct (D25) · NBME 27 13-nov (D40) · NBME 28 4-dic (D55) · NBME 29 18-dic (D65) · NBME 30 30-dic (D72) ·
UWSA2 8-ene (D77, dentro de la Fase A; el cierre de contenido es D81 jue 14-ene) · **NBME 31 15-ene (D82) = GO/NO-GO, el día siguiente al cierre de contenido** · NBME 32 18-ene (D83) · NBME 33 20-ene (D85) ·
Free 120 22-ene (D87) · sáb 30 y dom 31-ene libres entre D92 y D93 (solo Anki vencido) · **D94 mar 2-feb (D-2, última sesión de banco)** repaso FA 6-10 + Anki maduro + 20Q flagged · **D95 mié 3-feb (D-1, DENTRO del plan)** sesión mínima AM + rapid review + logística Prometric ·
**examen JUE 4-FEB-2027 (target v5.14; fuera de la ventana 25-29 ene → agendar/reprogramar Prometric + confirmar eligibility period)**. Ocho caen en viernes; UWSA1 (lun 21-sep),
NBME 30 (mié 30-dic), NBME 32 (lun 18-ene) y NBME 33 (mié 20-ene) no. Viernes de nivel 4 desde S11: solo D60 vie 11-dic; viernes de nivel 3: D15 9-oct · D20 16-oct · D35 6-nov · D45 20-nov · D50 27-nov. Mínimos on-track: NBME 25 ≥51 · 26 ≥54 · 27 ≥57 ·
28 ≥61 · 29 ≥63 · 30 ≥65 · 31/32/33 ≥68 · Free 120 ≥70 (`src/lib/usmleScores.ts` → `HITOS_ONTRACK`).
