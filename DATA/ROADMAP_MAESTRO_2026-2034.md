# 🗺️ ROADMAP MAESTRO 2026 → 2034 — la ruta completa a Mayo Clinic

> Definido con Joseph el 27-ago-2026. Cada fase tiene UN examen/entregable "rey" que se lleva el
> bloque principal del día; todo lo demás orbita en mantenimiento. Regla de oro: **nunca dos reyes
> a la vez**. Sáb/dom libres en todas las fases (el descanso consolida — no es negociable).
>
> **Actualizado a v5.11 (14-sep-2026).** El lun 14 de septiembre tampoco se estudió → **D1 de la Fase 1 = mar
> 15-sep-2026** (regla del sistema: cada día sin estudiar = +1 hábil; es el **décimo corrimiento**,
> 31-ago→15-sep, 11 días hábiles perdidos). Instrucción literal de Joseph, reconfirmada en este corrimiento: **ni un tema ni un subtema
> se deja atrás — no se fusiona ni se recorta nada**; el desfase se absorbe alargando el final de cada plan
> (el Step 1 llega a D95 = **jue 28-ene-2027 = D-1**, el día de descanso pre-examen que en v5.10 quedaba fuera del plan y que este
> corrimiento **absorbió**: D95 = sesión mínima AM + ritual de test-day; el target de examen sigue siendo el **vie 29-ene-2027**,
> último día de la ventana 25-29 ene). Las **franjas y las metas NO se movieron**; de los 12 hitos NBME/UWSA/Free 120 solo cambió de
> fecha el **UWSA1** (el único que cambia en cada corrimiento para seguir siendo el D1: vie 11 → lun 14 → **mar 15-sep**), los otros 11
> conservan su fecha y bajan 1 su D#. **⚠ YA NO QUEDA NINGÚN MARGEN: el próximo corrimiento obliga a decidir entre recortar temario
> o rendir fuera de la ventana (Prometric: reprogramar).** Detalle de la Fase 1 abajo, leído de los `.ts` con node el 14-sep (no estimado).
> *(Histórico v5.10, 12-sep: D1 lun 14-sep, D95 mié 27-ene con el jue 28 de descanso fuera del plan.)*

## Las fases

| Fase | Ventana | REY (bloque principal) | Mantenimiento | Hito de salida |
|---|---|---|---|---|
| **1 · STEP 1** | **D1 mar 15-sep-2026** → fin-ene-2027 (serie del Calendar desde 31-ago) | 🇺🇸 Step 1 (6h15/día: Anki AM 05:00 + mañana completa + eval 18:00) · **95 días D1-D95 · 15-sep-2026 → jue 28-ene-2027** (Fase A contenido D1-D80 15-sep→7-ene · B banco D81-D86 8→15-ene · C sprint D87-D95 18→28-ene; el **D1 ES el UWSA1** —movido del lun 14-sep, baseline en el primer día como prescribe Palmerton— y el contenido arranca el mié 16-sep; D95 jue 28-ene = D-1 dentro del plan) | ENCAPS 1h (96 días → 29-ene) · MIR 1h (78 días → 5-ene) · Derma↔Research 45' · LIVIANO 45' (90 días → 21-ene) · IA 45' | **STEP 1 PASS** (ventana 25-29 ene, **target vie 29-ene**; gate: **GO/NO-GO vie 15-ene-2027 = NBME 31**, 2 NBME ≥68% + UWSA2 8-ene) |
| **2 · ENCAPS** | feb → fin-mar-2027 | 🇵🇪 ENCAPS intensivo (hereda la mañana; pre-test = examen 2026-II reservado; arranca en el día 97 de la cuenta de la app) | MIR mantenimiento 61 días (mié 6-ene → mié 31-mar-2027; modo reducido hasta el jue 28-ene) · Derma↔Research (Derma ciclo 1 hasta d73 mié 7-abr-2027; ciclo 2 d74-d103 hasta el 30-jun) · academias CURVA+DENSA arrancan | **ENCAPS ≥17/20** (fines de marzo, percentil 1%) |
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
| **lun 1-feb-2027** (CR-9) | **Case report #1** → Dermatology Online Journal (MEDLINE, APC ≤$300) | Redacción CARE; el pipeline arma referencias. Paquete congelado el vie 11-dic-2026 |
| **jue 25-feb-2027** (R10) | **Protocolo SR-1 en PROSPERO** (línea L4: complicaciones vasculares de fillers — ya viva en la app) | El registro es gratis y sella prioridad |
| **mié 7-jul-2027** (R43) | **SR-1 sometida** (Rayyan screening + RoB2 + GRADE con el pipeline) | Primera publicación "de peso" |
| 2027-2029 | +1 case report/año + 1 SR/año + cartas oportunistas | Ritmo sostenible con 45' interdiario |
| **Meta pre-aplicación (2033)** | **8-12 ítems totales**, ≥2 SR, ≥1 primer autor/año | Dato NRMP: IMGs no-match en derma tenían mediana 12 pubs SIN scores — el volumen solo NO basta: **los Steps van primero** (por eso Research no roba horas a Fase 1) |
| ⚠ Cureus | máximo 1-2 ítems en todo el CV | Deslistada de Web of Science (oct-2025) |

## LIVIANO y las academias — suficiencia

- **LIVIANO 45'/día** cubre el currículo académico completo (90 días, **mar 15-sep-2026 → jue 21-ene-2027**:
  fisiología → GLP-1 → acceso Perú → nutrición → ejercicio → fármacos/bariátrica → conducta → síntesis).
  En enero Joseph explica obesidad al
  nivel de un obesity-medicine fellow — suficiente para ser EL referente del programa. La
  ejecución comercial va aparte (Pulso hub, no roba esta franja).
- **CURVA y DENSA**: febrero 2027 (Fase 2), con currículo tipo LIVIANO_ACADEMIA. NÍTIDA = Derma.
- **IA (vibecoding 45' + misión 30' + PC finde)**: cada proyecto semanal automatiza un pedazo del
  sistema → devuelve MÁS horas de las que consume. Es el único slot cuya rentabilidad es compuesta.
  v5.11: **vibecoding S1-S12 = 60 días mar 15-sep → lun 7-dic-2026** (12 SHIP en sábados 26-sep → 12-dic) + taper S13-S20 (8-dic → 28-ene, 95 días = D# del Step 1) · **SYNAPSE 131 días
  mar 15-sep-2026 → sáb 23-ene-2027** (110 A-units; la última cae en sábado — A DECIDIR) · **AURUM 130 días mar 15-sep-2026 → jue 18-mar-2027**.

## Reglas de transición entre fases

1. La reestructuración de cada fase se hace la SEMANA PREVIA (la de Fase 2 → última semana de
   enero, post-examen): el rey saliente libera la mañana, el entrante la hereda; Calendar + app +
   Supabase + memoria se actualizan en bloque (como se hizo el 27-ago).
2. Un examen NO se rinde sin su gate: Step 1 (NBMEs), ENCAPS (sims de viernes ≥18/25 en feb-mar),
   MIR (netas de simulacros al nivel Top 50 antes de inscribir).
3. Cada fase cierra con post-mortem de datos (como el ANALISIS_EXAMEN_2026-2_REAL) → el modelo
   de pronóstico del siguiente examen SIEMPRE se re-entrena con el examen recién rendido.

## Fase 1 en fechas v5.11 (leídas de los `.ts` con node el 14-sep-2026)

| Plan | D1 | Dfin | Nº días | Fichero |
|---|---|---|---|---|
| 🇺🇸 USMLE Step 1 | mar 15-sep-2026 (UWSA1) | jue 28-ene-2027 (D-1) | 95 | `src/lib/usmleStep1Daily.ts` |
| 🇵🇪 ENCAPS mantenimiento | mar 15-sep-2026 | vie 29-ene-2027 | **96** (78 banqueo1h + 18 mini-sim) | `src/lib/encapsPlan.ts` + Supabase (backup `study_schedule_bk_0914`) |
| 🇪🇸 MIR 1ª vuelta | mar 15-sep-2026 | mar 5-ene-2027 | 78 | `src/lib/mirDailyPlan.ts` |
| 🇪🇸 MIR mantenimiento | mié 6-ene-2027 | mié 31-mar-2027 | **61** | `src/lib/mirMantenimiento.ts` (fin clavado al ENCAPS; reducido 17 días hasta el jue 28-ene; 12 Tier C en jueves) |
| 🔬 Research ciclo 1 | mié 16-sep-2026 | jue 11-feb-2027 | 42 | `src/lib/researchDailyPlan.ts` (**+2 días de calendario**) |
| 🔬 Research ciclo 2 | lun 15-feb-2027 | mié 18-ago-2027 | 67 | `src/lib/researchDailyPlan2027.ts` (**+2 días de calendario**) |
| 🩺 Derma élite | mar 15-sep-2026 | mié 7-abr-2027 | 73 | `src/lib/dermaDailyPlan.ts` (**sin cambios**; ciclo 2 d74-d103 vie 9-abr → mié 30-jun en `dermaCiclo2.ts`) |
| ⚖️ LIVIANO Academia | mar 15-sep-2026 | jue 21-ene-2027 | 90 | `src/lib/livianoStudyPlan.ts` |
| 💼 Business formato L | mar 15-sep-2026 | mié 13-ene-2027 | **121** | `src/lib/businessStudyPlan.ts` |
| 💰 AURUM | mar 15-sep-2026 | jue 18-mar-2027 | 130 | `src/lib/aurumDailyPlan.ts` |
| 🧠 SYNAPSE | mar 15-sep-2026 | sáb 23-ene-2027 | **131** | `src/lib/synapseDailyPlan.ts` (110 A-units) |
| 🛠 Vibecoding 04:15 | mar 15-sep-2026 | jue 28-ene-2027 (S1-S12 hasta el lun 7-dic) | 95 (60 + 35 taper) | `src/lib/vibecodingPlan.ts` |

*(Se invierte otra vez la paridad del interdiario: **Derma NO se mueve** —el mar 15-sep ya era su d1— y **Research corre +2 días de
calendario** (ciclo 1 desde el mié 16-sep), porque la alternancia anclada al mié 10-jun hace del mar 15-sep un día Derma. Cambian de número
de días ENCAPS (97 → 96: su cierre está clavado el 29-ene; la rotación lun-jue corre un hábil entera y pierde su último slot, la 5.ª sesión de
V-7+V-10) y MIR mantenimiento (62 → 61: su fin está clavado el 31-mar y arranca el mié 6-ene para no pisar el D78). Business sigue en 121 filas
(84 de trabajo) y SYNAPSE en 131 días (110 A-units). El temario no pierde nada en ninguno.)*

**De los 12 hitos de la Fase 1 solo el UWSA1 cambió de fecha** (es el único que sigue al D1: lun 14 → **mar 15-sep = D1**);
los otros 11 conservan su fecha y solo cambian de D# (todos −1): **UWSA1 15-sep (D1)** · NBME 25 2-oct (D14) ·
NBME 26 23-oct (D29) · NBME 27 13-nov (D44) · NBME 28 4-dic (D59) · NBME 29 18-dic (D69) · NBME 30 30-dic (D76) ·
UWSA2 8-ene (D81) · **NBME 31 15-ene (D86) = GO/NO-GO** · NBME 32 18-ene (D87) · NBME 33 20-ene (D89) ·
Free 120 22-ene (D91) · D94 mié 27-ene (D-2) repaso FA 6-10 + Anki maduro · **D95 jue 28-ene (D-1, dentro del plan)** sesión mínima AM + logística ·
**examen vie 29-ene-2027 (target; ventana 25-29 ene sin cambio)**. Ocho caen en viernes; UWSA1 (mar 15-sep),
NBME 30 (mié 30-dic), NBME 32 (lun 18-ene) y NBME 33 (mié 20-ene) no. Viernes de nivel 4 desde S11: D54 vie 27-nov y D64 vie 11-dic. Mínimos on-track: NBME 25 ≥51 · 26 ≥54 · 27 ≥57 ·
28 ≥61 · 29 ≥63 · 30 ≥65 · 31/32/33 ≥68 · Free 120 ≥70 (`src/lib/usmleScores.ts` → `HITOS_ONTRACK`).
