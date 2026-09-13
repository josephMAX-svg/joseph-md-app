# 🗺️ ROADMAP MAESTRO 2026 → 2034 — la ruta completa a Mayo Clinic

> Definido con Joseph el 27-ago-2026. Cada fase tiene UN examen/entregable "rey" que se lleva el
> bloque principal del día; todo lo demás orbita en mantenimiento. Regla de oro: **nunca dos reyes
> a la vez**. Sáb/dom libres en todas las fases (el descanso consolida — no es negociable).
>
> **Actualizado a v5.10 (12-sep-2026).** El 11 de septiembre tampoco se estudió → **D1 de la Fase 1 = lun
> 14-sep-2026** (regla del sistema: cada día sin estudiar = +1 hábil; es el **noveno corrimiento**,
> 31-ago→14-sep, 10 días hábiles perdidos). Instrucción literal de Joseph, reconfirmada en este corrimiento: **ni un tema ni un subtema
> se deja atrás — no se fusiona ni se recorta nada**; el desfase se absorbe alargando el final de cada plan
> (el Step 1 llega a D95 = **mié 27-ene-2027**, que era el target de examen: **el target pasa al vie 29-ene-2027**,
> último día de la ventana 25-29 ene; el jue 28 queda como descanso pre-examen). Las **franjas y las metas NO se
> movieron**; de los 12 hitos NBME/UWSA/Free 120 solo cambió de fecha el **UWSA1** (anclado al vie 11-sep, ya pasado
> → lun 14-sep = D1), los otros 11 conservan su fecha y cambian de D#. **El siguiente corrimiento ya no cabe** sin
> recortar contenido o salir de la ventana. Detalle de la Fase 1 abajo, leído de los `.ts` con node el 12-sep (no estimado).

## Las fases

| Fase | Ventana | REY (bloque principal) | Mantenimiento | Hito de salida |
|---|---|---|---|---|
| **1 · STEP 1** | **D1 lun 14-sep-2026** → fin-ene-2027 (serie del Calendar desde 31-ago) | 🇺🇸 Step 1 (6h15/día: Anki AM 05:00 + mañana completa + eval 18:00) · **95 días D1-D95 · 14-sep-2026 → mié 27-ene-2027** (Fase A contenido D1-D80 14-sep→6-ene · B banco D81-D87 7→15-ene · C sprint D88-D95 18→27-ene; el **D1 ES el UWSA1** —movido del vie 11-sep, baseline en el primer día como prescribe Palmerton— y el contenido arranca el mar 15-sep) | ENCAPS 1h (97 días → 29-ene) · MIR 1h (78 días → 4-ene) · Derma↔Research 45' · LIVIANO 45' (90 días → 20-ene) · IA 45' | **STEP 1 PASS** (ventana 25-29 ene, **target vie 29-ene**; gate: **GO/NO-GO vie 15-ene-2027 = NBME 31**, 2 NBME ≥68% + UWSA2 8-ene) |
| **2 · ENCAPS** | feb → fin-mar-2027 | 🇵🇪 ENCAPS intensivo (hereda la mañana; pre-test = examen 2026-II reservado; arranca en el día 98 de la cuenta de la app) | MIR mantenimiento 63 días (4-ene → 31-mar-2027, fechas sin cambios; modo reducido hasta el 27-ene) · Derma↔Research (Derma hasta d70 mar 30-mar-2027) · academias CURVA+DENSA arrancan | **ENCAPS ≥17/20** (fines de marzo, percentil 1%) |
| **3 · MIR** | abr-2027 → ene-2030 (~2 años de prep + SERUMS) | 🇪🇸 MIR sube a principal progresivamente (CTO/AMIR/ProMIR, vueltas completas) | Step 2 CK secundario creciente (bancos ya inventariados) · research pipeline a régimen | **MIR ene-2030 · Top 50** → Dermatología (Clínic) |
| **4 · Residencia + Step 2 CK** | 2030 → 2033 | Residencia derma + 🇺🇸 Step 2 CK (el score SÍ cuenta: mediana IMG match derma ≈ 253) | Publicaciones en serie (la residencia da casos) · estética desde derma quirúrgica | Step 2 CK 250+ · CV de fellowship |
| **5 · MAYO CLINIC** | 2033-2034 | Aplicación fellowship dermatología estética (ERAS/ECFMG completo) | — | **Mayo Clinic ~2034** |

## Research — el hilo que cruza todas las fases (¿alcanza el 45' interdiario? SÍ, así:)

El slot Research (13:30-14:15, interdiario con Derma) + el pipeline agéntico (research_runner /
discovery / Edge Functions) hacen el trabajo pesado; el humano decide y redacta. Calendario de
publicación (de `DATA/RESEARCH/RUTA_PUBLICACION_2027.md`, revistas y APCs verificados):

| Cuándo | Entregable | Nota |
|---|---|---|
| **vie 16-oct-2026** (C-6) | **Carta al editor #1** (respuesta a paper de derma estética) | Esfuerzo mínimo, rompe el hielo, cita real. ⚠ cae 1 día después del deadline interno ≤15-oct (`RUTA_PUBLICACION_2027.md` §9.1) |
| **lun 23-nov-2026** (T-8) | **Tesis L0 → research letter** a JAAD International | Añadido en v3; el deadline externo era feb-2027 |
| **lun 1-feb-2027** (CR-9) | **Case report #1** → Dermatology Online Journal (MEDLINE, APC ≤$300) | Redacción CARE; el pipeline arma referencias. Paquete congelado el 9-dic-2026 |
| **mar 23-feb-2027** (R10) | **Protocolo SR-1 en PROSPERO** (línea L4: complicaciones vasculares de fillers — ya viva en la app) | El registro es gratis y sella prioridad |
| **lun 5-jul-2027** (R43) | **SR-1 sometida** (Rayyan screening + RoB2 + GRADE con el pipeline) | Primera publicación "de peso" |
| 2027-2029 | +1 case report/año + 1 SR/año + cartas oportunistas | Ritmo sostenible con 45' interdiario |
| **Meta pre-aplicación (2033)** | **8-12 ítems totales**, ≥2 SR, ≥1 primer autor/año | Dato NRMP: IMGs no-match en derma tenían mediana 12 pubs SIN scores — el volumen solo NO basta: **los Steps van primero** (por eso Research no roba horas a Fase 1) |
| ⚠ Cureus | máximo 1-2 ítems en todo el CV | Deslistada de Web of Science (oct-2025) |

## LIVIANO y las academias — suficiencia

- **LIVIANO 45'/día** cubre el currículo académico completo (90 días, **14-sep-2026 → mié 20-ene-2027**:
  fisiología → GLP-1 → acceso Perú → nutrición → ejercicio → fármacos/bariátrica → conducta → síntesis).
  En enero Joseph explica obesidad al
  nivel de un obesity-medicine fellow — suficiente para ser EL referente del programa. La
  ejecución comercial va aparte (Pulso hub, no roba esta franja).
- **CURVA y DENSA**: febrero 2027 (Fase 2), con currículo tipo LIVIANO_ACADEMIA. NÍTIDA = Derma.
- **IA (vibecoding 45' + misión 30' + PC finde)**: cada proyecto semanal automatiza un pedazo del
  sistema → devuelve MÁS horas de las que consume. Es el único slot cuya rentabilidad es compuesta.
  v5.10: **vibecoding 60 días 14-sep → vie 4-dic-2026** (12 SHIP en sábados 19-sep → 5-dic, sin mover) · **SYNAPSE 81 días
  14-sep → jue 3-dic-2026** · **AURUM 130 días 14-sep-2026 → mié 17-mar-2027**.

## Reglas de transición entre fases

1. La reestructuración de cada fase se hace la SEMANA PREVIA (la de Fase 2 → última semana de
   enero, post-examen): el rey saliente libera la mañana, el entrante la hereda; Calendar + app +
   Supabase + memoria se actualizan en bloque (como se hizo el 27-ago).
2. Un examen NO se rinde sin su gate: Step 1 (NBMEs), ENCAPS (sims de viernes ≥18/25 en feb-mar),
   MIR (netas de simulacros al nivel Top 50 antes de inscribir).
3. Cada fase cierra con post-mortem de datos (como el ANALISIS_EXAMEN_2026-2_REAL) → el modelo
   de pronóstico del siguiente examen SIEMPRE se re-entrena con el examen recién rendido.

## Fase 1 en fechas v5.10 (leídas de los `.ts` con node el 12-sep-2026)

| Plan | D1 | Dfin | Nº días | Fichero |
|---|---|---|---|---|
| 🇺🇸 USMLE Step 1 | lun 14-sep-2026 | mié 27-ene-2027 | 95 | `src/lib/usmleStep1Daily.ts` |
| 🇵🇪 ENCAPS mantenimiento | lun 14-sep-2026 | vie 29-ene-2027 | **97** | `src/lib/encapsPlan.ts` + Supabase (backup `study_schedule_bk_0912`) |
| 🇪🇸 MIR 1ª vuelta | lun 14-sep-2026 | lun 4-ene-2027 | 78 | `src/lib/mirDailyPlan.ts` |
| 🇪🇸 MIR mantenimiento | lun 4-ene-2027 | mié 31-mar-2027 | 63 | `src/lib/mirMantenimiento.ts` (fechas sin cambios; reducido 18 días hasta el 27-ene) |
| 🔬 Research ciclo 1 | lun 14-sep-2026 | mar 9-feb-2027 | 42 | `src/lib/researchDailyPlan.ts` (**sin cambios**) |
| 🔬 Research ciclo 2 | jue 11-feb-2027 | lun 16-ago-2027 | 67 | `src/lib/researchDailyPlan2027.ts` (**sin cambios**) |
| 🩺 Derma élite | mar 15-sep-2026 | mar 30-mar-2027 | 70 | `src/lib/dermaDailyPlan.ts` (+2 días de calendario) |
| ⚖️ LIVIANO Academia | lun 14-sep-2026 | mié 20-ene-2027 | 90 | `src/lib/livianoStudyPlan.ts` |
| 💼 Business formato L | lun 14-sep-2026 | mar 12-ene-2027 | **121** | `src/lib/businessStudyPlan.ts` |
| 💰 AURUM | lun 14-sep-2026 | mié 17-mar-2027 | 130 | `src/lib/aurumDailyPlan.ts` |
| 🧠 SYNAPSE | lun 14-sep-2026 | jue 3-dic-2026 | **81** | `src/lib/synapseDailyPlan.ts` |
| 🛠 Vibecoding 04:15 | lun 14-sep-2026 | vie 4-dic-2026 | 60 | `src/lib/vibecodingPlan.ts` |

*(Se invierte otra vez la paridad del interdiario: **Research NO se mueve** —ya arrancaba el lun 14-sep desde
v5.9— y **Derma corre +2 días de calendario** (d1 = mar 15-sep), porque la alternancia anclada al mié 10-jun hace
del lun 14-sep un día Research. Cambian de número de días ENCAPS (98 → 97: su cierre está clavado el 29-ene y se
cae solo el mini-sim del vie 11-sep, ya pasado), Business (123 → 121: dos filas de fin de semana menos en la cola,
84 de trabajo intactas) y SYNAPSE (82 → 81: los 12 "R" de v5.9 incluían el sáb 12-sep sin SHIP; ahora son 11 sábados
PC = 11 SHIP, 19-sep…28-nov). El temario no pierde nada en ninguno.)*

**De los 12 hitos de la Fase 1 solo el UWSA1 cambió de fecha** (estaba anclado al vie 11-sep, ya pasado → **lun 14-sep = D1**);
los otros 11 conservan su fecha y solo cambian de D# (todos −1): **UWSA1 14-sep (D1)** · NBME 25 2-oct (D15) ·
NBME 26 23-oct (D30) · NBME 27 13-nov (D45) · NBME 28 4-dic (D60) · NBME 29 18-dic (D70) · NBME 30 30-dic (D77) ·
UWSA2 8-ene (D82) · **NBME 31 15-ene (D87) = GO/NO-GO** · NBME 32 18-ene (D88) · NBME 33 20-ene (D90) ·
Free 120 22-ene (D92) · D94 mar 26-ene repaso FA 6-10 · D95 mié 27-ene rapid review · jue 28-ene descanso ·
**examen vie 29-ene-2027 (target; ventana 25-29 ene sin cambio)**. Ocho caen en viernes; UWSA1 (lun 14-sep),
NBME 30 (mié 30-dic), NBME 32 (lun 18-ene) y NBME 33 (mié 20-ene) no. Mínimos on-track: NBME 25 ≥51 · 26 ≥54 · 27 ≥57 ·
28 ≥61 · 29 ≥63 · 30 ≥65 · 31/32/33 ≥68 · Free 120 ≥70 (`src/lib/usmleScores.ts` → `HITOS_ONTRACK`).
