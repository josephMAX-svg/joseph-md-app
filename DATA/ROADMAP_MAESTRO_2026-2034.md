# 🗺️ ROADMAP MAESTRO 2026 → 2034 — la ruta completa a Mayo Clinic

> Definido con Joseph el 27-ago-2026. Cada fase tiene UN examen/entregable "rey" que se lleva el
> bloque principal del día; todo lo demás orbita en mantenimiento. Regla de oro: **nunca dos reyes
> a la vez**. Sáb/dom libres en todas las fases (el descanso consolida — no es negociable).
>
> **Actualizado a v5.12 (15-sep-2026).** El mar 15 de septiembre tampoco se estudió → **D1 de la Fase 1 = mié
> 16-sep-2026** (regla del sistema: cada día sin estudiar = +1 hábil; es el **undécimo corrimiento**,
> 31-ago→16-sep, 12 días hábiles perdidos). Instrucción literal de Joseph, reconfirmada en este corrimiento: **ni un tema ni un subtema
> se deja atrás — no se fusiona ni se recorta nada**; el desfase se absorbe alargando el final de cada plan.
> **⚠ CONSECUENCIA NUEVA: el Step 1 llega a D95 = vie 29-ene-2027 (última sesión) y ocupa TODA la ventana 25-29 ene → el examen SALE
> de la ventana: target LUN 1-FEB-2027** (`DAILY_META.examenTarget`); sáb 30 (D-2) y dom 31-ene (D-1) quedan fuera del plan como descanso
> pre-examen (solo Anki vencido + ritual de test-day el domingo). Joseph debe **agendar/reprogramar el Prometric y confirmar que su eligibility
> period cubre el 1-feb** (si no: extenderlo, o decidir recortar temario — decisión suya, `DATA/PENDIENTES_JOSEPH.md`). Las **franjas y las
> metas NO se movieron**; de los 12 hitos NBME/UWSA/Free 120 solo cambió de fecha el **UWSA1** (el único que cambia en cada corrimiento para
> seguir siendo el D1: vie 11 → lun 14 → mar 15 → **mié 16-sep**), los otros 11 conservan su fecha y bajan 1 su D#. **Desde aquí cada día no
> estudiado mueve el examen un día hábil más (o exige recortar).** Detalle de la Fase 1 abajo, leído de los `.ts` con node el 15-sep (no estimado).
> *(Histórico v5.11, 14-sep: D1 mar 15-sep, D95 jue 28-ene = D-1 dentro del plan, examen vie 29-ene = último día de la ventana. v5.10, 12-sep: D1 lun 14-sep, D95 mié 27-ene con el jue 28 de descanso fuera del plan.)*

## Las fases

| Fase | Ventana | REY (bloque principal) | Mantenimiento | Hito de salida |
|---|---|---|---|---|
| **1 · STEP 1** | **D1 mié 16-sep-2026** → 1-feb-2027 (serie del Calendar desde 31-ago) | 🇺🇸 Step 1 (6h15/día: Anki AM 05:00 + mañana completa + eval 18:00) · **95 días D1-D95 · 16-sep-2026 → vie 29-ene-2027** (Fase A contenido D1-D81 16-sep→lun 11-ene · B banco D82-D85 12→15-ene · C sprint D86-D95 18→29-ene; el **D1 ES el UWSA1** —movido del mar 15-sep, baseline en el primer día como prescribe Palmerton— y el contenido arranca el jue 17-sep; D95 vie 29-ene = última sesión, sáb 30 y dom 31 descanso fuera del plan) | ENCAPS 1h (95 días → 29-ene) · MIR 1h (78 días → 6-ene) · Derma↔Research 45' · LIVIANO 45' (90 días → 22-ene) · IA 45' | **STEP 1 PASS** (**examen target LUN 1-FEB-2027**, fuera de la ventana 25-29 ene — Prometric y eligibility a confirmar por Joseph; gate: **GO/NO-GO vie 15-ene-2027 = NBME 31**, 2 NBME ≥68% + UWSA2 8-ene) |
| **2 · ENCAPS** | feb → fin-mar-2027 | 🇵🇪 ENCAPS intensivo (hereda la mañana; pre-test = examen 2026-II reservado el vie 5-feb; el día 96 de la cuenta de la app = lun 1-feb = examen Step 1 → propuesta: arrancar el mar 2-feb en el día 97, decisión de Joseph) | MIR mantenimiento 60 días (jue 7-ene → mié 31-mar-2027; modo reducido hasta el vie 29-ene) · Derma↔Research (Derma ciclo 1 hasta d73 vie 9-abr-2027; ciclo 2 d74-d103 mar 13-abr → vie 2-jul) · academias CURVA+DENSA arrancan | **ENCAPS ≥17/20** (fines de marzo, percentil 1%) |
| **3 · MIR** | abr-2027 → ene-2030 (~2 años de prep + SERUMS) | 🇪🇸 MIR sube a principal progresivamente (CTO/AMIR/ProMIR, vueltas completas) | Step 2 CK secundario creciente (bancos ya inventariados) · research pipeline a régimen | **MIR ene-2030 · Top 50** → Dermatología (Clínic) |
| **4 · Residencia + Step 2 CK** | 2030 → 2033 | Residencia derma + 🇺🇸 Step 2 CK (el score SÍ cuenta: mediana IMG match derma ≈ 253) | Publicaciones en serie (la residencia da casos) · estética desde derma quirúrgica | Step 2 CK 250+ · CV de fellowship |
| **5 · MAYO CLINIC** | 2033-2034 | Aplicación fellowship dermatología estética (ERAS/ECFMG completo) | — | **Mayo Clinic ~2034** |

## Research — el hilo que cruza todas las fases (¿alcanza el 45' interdiario? SÍ, así:)

El slot Research (13:30-14:15, interdiario con Derma) + el pipeline agéntico (research_runner /
discovery / Edge Functions) hacen el trabajo pesado; el humano decide y redacta. Calendario de
publicación (de `DATA/RESEARCH/RUTA_PUBLICACION_2027.md`, revistas y APCs verificados):

| Cuándo | Entregable | Nota |
|---|---|---|
| **mar 20-oct-2026** (C-6) | **Carta al editor #1** (respuesta a paper de derma estética) | Esfuerzo mínimo, rompe el hielo, cita real. ⚠ cae 5 días después del deadline interno ≤15-oct (`RUTA_PUBLICACION_2027.md` §9.1): SUBMIT fuera del átomo o diana con ventana más larga |
| **mié 25-nov-2026** (T-8) | **Tesis L0 → research letter** a JAAD International | Añadido en v3; el deadline externo era feb-2027 |
| **lun 1-feb-2027** (CR-9) | **Case report #1** → Dermatology Online Journal (MEDLINE, APC ≤$300) | Redacción CARE; el pipeline arma referencias. Paquete congelado el vie 11-dic-2026. ⚠ v5.12: es el **día del examen Step 1** — el átomo no se mueve solo; SUBMIT el mar 2-feb o por la tarde del 1-feb = decisión de Joseph |
| **jue 25-feb-2027** (R10) | **Protocolo SR-1 en PROSPERO** (línea L4: complicaciones vasculares de fillers — ya viva en la app) | El registro es gratis y sella prioridad |
| **mié 7-jul-2027** (R43) | **SR-1 sometida** (Rayyan screening + RoB2 + GRADE con el pipeline) | Primera publicación "de peso" |
| 2027-2029 | +1 case report/año + 1 SR/año + cartas oportunistas | Ritmo sostenible con 45' interdiario |
| **Meta pre-aplicación (2033)** | **8-12 ítems totales**, ≥2 SR, ≥1 primer autor/año | Dato NRMP: IMGs no-match en derma tenían mediana 12 pubs SIN scores — el volumen solo NO basta: **los Steps van primero** (por eso Research no roba horas a Fase 1) |
| ⚠ Cureus | máximo 1-2 ítems en todo el CV | Deslistada de Web of Science (oct-2025) |

## LIVIANO y las academias — suficiencia

- **LIVIANO 45'/día** cubre el currículo académico completo (90 días, **mié 16-sep-2026 → vie 22-ene-2027**; ⚠ v5.12: los 16 casos de viernes corren una semana y el caso integral 16/16 cae el vie 22-ene, DESPUÉS del capstone del mié 20-ene:
  fisiología → GLP-1 → acceso Perú → nutrición → ejercicio → fármacos/bariátrica → conducta → síntesis).
  En enero Joseph explica obesidad al
  nivel de un obesity-medicine fellow — suficiente para ser EL referente del programa. La
  ejecución comercial va aparte (Pulso hub, no roba esta franja).
- **CURVA y DENSA**: febrero 2027 (Fase 2), con currículo tipo LIVIANO_ACADEMIA. NÍTIDA = Derma.
- **IA (vibecoding 45' + misión 30' + PC finde)**: cada proyecto semanal automatiza un pedazo del
  sistema → devuelve MÁS horas de las que consume. Es el único slot cuya rentabilidad es compuesta.
  v5.12: **vibecoding S1-S12 = 60 días mié 16-sep → mar 8-dic-2026** (12 SHIP en sábados 26-sep → 12-dic) + taper S13-S20 (9-dic → 29-ene, 95 días = D# del Step 1) · **SYNAPSE 132 días
  mié 16-sep-2026 → lun 25-ene-2027** (110 A-units; la última cae el lunes de la última semana del plan Step 1 — A DECIDIR) · **AURUM 130 días mié 16-sep-2026 → vie 19-mar-2027**.

## Reglas de transición entre fases

1. La reestructuración de cada fase se hace la SEMANA PREVIA (la de Fase 2 → última semana de
   enero, post-examen): el rey saliente libera la mañana, el entrante la hereda; Calendar + app +
   Supabase + memoria se actualizan en bloque (como se hizo el 27-ago).
2. Un examen NO se rinde sin su gate: Step 1 (NBMEs), ENCAPS (sims de viernes ≥18/25 en feb-mar),
   MIR (netas de simulacros al nivel Top 50 antes de inscribir).
3. Cada fase cierra con post-mortem de datos (como el ANALISIS_EXAMEN_2026-2_REAL) → el modelo
   de pronóstico del siguiente examen SIEMPRE se re-entrena con el examen recién rendido.

## Fase 1 en fechas v5.12 (leídas de los `.ts` con node el 15-sep-2026)

| Plan | D1 | Dfin | Nº días | Fichero |
|---|---|---|---|---|
| 🇺🇸 USMLE Step 1 | mié 16-sep-2026 (UWSA1) | vie 29-ene-2027 (última sesión; examen lun 1-feb) | 95 | `src/lib/usmleStep1Daily.ts` |
| 🇵🇪 ENCAPS mantenimiento | mié 16-sep-2026 | vie 29-ene-2027 | **95** (77 banqueo1h + 18 mini-sim) | `src/lib/encapsPlan.ts` + Supabase (backup `study_schedule_bk_0915`) |
| 🇪🇸 MIR 1ª vuelta | mié 16-sep-2026 | mié 6-ene-2027 | 78 | `src/lib/mirDailyPlan.ts` |
| 🇪🇸 MIR mantenimiento | jue 7-ene-2027 | mié 31-mar-2027 | **60** | `src/lib/mirMantenimiento.ts` (fin clavado al ENCAPS; reducido 17 días hasta el vie 29-ene; 12 Tier C en jueves) |
| 🔬 Research ciclo 1 | mié 16-sep-2026 | jue 11-feb-2027 | 42 | `src/lib/researchDailyPlan.ts` (**sin cambios**) |
| 🔬 Research ciclo 2 | lun 15-feb-2027 | mié 18-ago-2027 | 67 | `src/lib/researchDailyPlan2027.ts` (**sin cambios**) |
| 🩺 Derma élite | jue 17-sep-2026 | vie 9-abr-2027 | 73 | `src/lib/dermaDailyPlan.ts` (**+2 días de calendario**; taper d44-d49 mar 19-ene → mar 2-feb; ciclo 2 d74-d103 mar 13-abr → vie 2-jul en `dermaCiclo2.ts`) |
| ⚖️ LIVIANO Academia | mié 16-sep-2026 | vie 22-ene-2027 | 90 | `src/lib/livianoStudyPlan.ts` (16 casos +1 semana; caso 16 D90 tras el capstone D88) |
| 💼 Business formato L | mié 16-sep-2026 | jue 14-ene-2027 | **121** | `src/lib/businessStudyPlan.ts` |
| 💰 AURUM | mié 16-sep-2026 | vie 19-mar-2027 | 130 | `src/lib/aurumDailyPlan.ts` |
| 🧠 SYNAPSE | mié 16-sep-2026 | lun 25-ene-2027 | **132** | `src/lib/synapseDailyPlan.ts` (110 A-units) |
| 🛠 Vibecoding 04:15 | mié 16-sep-2026 | vie 29-ene-2027 (S1-S12 hasta el mar 8-dic) | 95 (60 + 35 taper) | `src/lib/vibecodingPlan.ts` |

*(Se invierte otra vez la paridad del interdiario: **Research NO se mueve** —el mié 16-sep ya era su d1— y **Derma corre +2 días de
calendario** (d1 jue 17-sep), porque la alternancia anclada al mié 10-jun hace del mié 16-sep un día Research. Cambian de número
de días ENCAPS (96 → 95: su cierre está clavado el 29-ene; la rotación lun-jue corre un hábil entera y pierde su último slot, la 5.ª sesión de
IV-6+IV-7), MIR mantenimiento (61 → 60: su fin está clavado el 31-mar y arranca el jue 7-ene para no pisar el D78) y SYNAPSE (131 → 132: la semana 19
gana el lun 25-ene). Business sigue en 121 filas (84 de trabajo) y LIVIANO en 90 (pero sus 16 casos corren una semana). El temario no pierde nada en ninguno.)*

**De los 12 hitos de la Fase 1 solo el UWSA1 cambió de fecha** (es el único que sigue al D1: mar 15 → **mié 16-sep = D1**);
los otros 11 conservan su fecha y solo cambian de D# (todos −1): **UWSA1 16-sep (D1)** · NBME 25 2-oct (D13) ·
NBME 26 23-oct (D28) · NBME 27 13-nov (D43) · NBME 28 4-dic (D58) · NBME 29 18-dic (D68) · NBME 30 30-dic (D75) ·
UWSA2 8-ene (D80, dentro de la Fase A; el cierre de Bioquímica es D81 lun 11-ene) · **NBME 31 15-ene (D85) = GO/NO-GO** · NBME 32 18-ene (D86) · NBME 33 20-ene (D88) ·
Free 120 22-ene (D90) · D94 jue 28-ene (D-4) repaso FA 6-10 + Anki maduro · **D95 vie 29-ene (D-3, última sesión del plan)** rapid review + logística Prometric ·
sáb 30 (D-2) y dom 31-ene (D-1) descanso fuera del plan · **examen LUN 1-FEB-2027 (target v5.12; fuera de la ventana 25-29 ene → agendar/reprogramar Prometric + confirmar eligibility period)**. Ocho caen en viernes; UWSA1 (mié 16-sep),
NBME 30 (mié 30-dic), NBME 32 (lun 18-ene) y NBME 33 (mié 20-ene) no. Viernes de nivel 4 desde S11: D53 vie 27-nov y D63 vie 11-dic. Mínimos on-track: NBME 25 ≥51 · 26 ≥54 · 27 ≥57 ·
28 ≥61 · 29 ≥63 · 30 ≥65 · 31/32/33 ≥68 · Free 120 ≥70 (`src/lib/usmleScores.ts` → `HITOS_ONTRACK`).
