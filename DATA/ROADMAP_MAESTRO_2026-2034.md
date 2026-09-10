# 🗺️ ROADMAP MAESTRO 2026 → 2034 — la ruta completa a Mayo Clinic

> Definido con Joseph el 27-ago-2026. Cada fase tiene UN examen/entregable "rey" que se lleva el
> bloque principal del día; todo lo demás orbita en mantenimiento. Regla de oro: **nunca dos reyes
> a la vez**. Sáb/dom libres en todas las fases (el descanso consolida — no es negociable).
>
> **Actualizado a v5.9 (10-sep-2026).** El 10 de septiembre tampoco se estudió → **D1 de la Fase 1 = vie
> 11-sep-2026** (regla del sistema: cada día sin estudiar = +1 hábil; es el **octavo corrimiento**,
> 31-ago→11-sep). Instrucción literal de Joseph, reconfirmada en este corrimiento: **ni un tema ni un subtema
> se deja atrás — no se fusiona ni se recorta nada**; el desfase se absorbe alargando el final de cada plan
> (el Step 1 llega a D95 = mar 26-ene-2027). Las **fechas de examen, los 12 hitos NBME/UWSA/Free 120, las
> franjas y las metas NO se movieron**; lo que se movió es el contenido diario y, en casi todos los planes, el
> número de día de cada hito. Detalle de la Fase 1 abajo, leído de los `.ts` con node el 10-sep (no estimado).

## Las fases

| Fase | Ventana | REY (bloque principal) | Mantenimiento | Hito de salida |
|---|---|---|---|---|
| **1 · STEP 1** | **D1 vie 11-sep-2026** → fin-ene-2027 (serie del Calendar desde 31-ago) | 🇺🇸 Step 1 (6h15/día: Anki AM 05:00 + mañana completa + eval 18:00) · **95 días D1-D95 · 11-sep-2026 → mar 26-ene-2027** (Fase A contenido D1-D80 11-sep→5-ene · B banco D81-D88 6→15-ene · C sprint D89-D95 18→26-ene; el **D1 ES el UWSA1**, baseline en el primer día como prescribe Palmerton, y el contenido arranca el lun 14-sep) | ENCAPS 1h (98 días → 29-ene) · MIR 1h (78 días → 30-dic) · Derma↔Research 45' · LIVIANO 45' (90 días → 19-ene) · IA 45' | **STEP 1 PASS** (semana 25-29 ene, gate: **GO/NO-GO vie 15-ene-2027 = NBME 31**, 2 NBME ≥68% + UWSA2 8-ene) |
| **2 · ENCAPS** | feb → fin-mar-2027 | 🇵🇪 ENCAPS intensivo (hereda la mañana; pre-test = examen 2026-II reservado; arranca en el día 99 de la cuenta de la app) | MIR mantenimiento 63 días (4-ene → 31-mar-2027, sin cambios) · Derma↔Research (Derma hasta d70 vie 26-mar-2027) · academias CURVA+DENSA arrancan | **ENCAPS ≥17/20** (fines de marzo, percentil 1%) |
| **3 · MIR** | abr-2027 → ene-2030 (~2 años de prep + SERUMS) | 🇪🇸 MIR sube a principal progresivamente (CTO/AMIR/ProMIR, vueltas completas) | Step 2 CK secundario creciente (bancos ya inventariados) · research pipeline a régimen | **MIR ene-2030 · Top 50** → Dermatología (Clínic) |
| **4 · Residencia + Step 2 CK** | 2030 → 2033 | Residencia derma + 🇺🇸 Step 2 CK (el score SÍ cuenta: mediana IMG match derma ≈ 253) | Publicaciones en serie (la residencia da casos) · estética desde derma quirúrgica | Step 2 CK 250+ · CV de fellowship |
| **5 · MAYO CLINIC** | 2033-2034 | Aplicación fellowship dermatología estética (ERAS/ECFMG completo) | — | **Mayo Clinic ~2034** |

## Research — el hilo que cruza todas las fases (¿alcanza el 45' interdiario? SÍ, así:)

El slot Research (13:30-14:15, interdiario con Derma) + el pipeline agéntico (research_runner /
discovery / Edge Functions) hacen el trabajo pesado; el humano decide y redacta. Calendario de
publicación (de `DATA/RESEARCH/RUTA_PUBLICACION_2027.md`, revistas y APCs verificados):

| Cuándo | Entregable | Nota |
|---|---|---|
| **mié 14-oct-2026** (C-6) | **Carta al editor #1** (respuesta a paper de derma estética) | Esfuerzo mínimo, rompe el hielo, cita real |
| **jue 19-nov-2026** (T-8) | **Tesis L0 → research letter** a JAAD International | Añadido en v3; el deadline externo era feb-2027 |
| **lun 1-feb-2027** (CR-9) | **Case report #1** → Dermatology Online Journal (MEDLINE, APC ≤$300) | Redacción CARE; el pipeline arma referencias. Paquete congelado el 7-dic-2026 |
| **vie 19-feb-2027** (R10) | **Protocolo SR-1 en PROSPERO** (línea L4: complicaciones vasculares de fillers — ya viva en la app) | El registro es gratis y sella prioridad |
| **jue 1-jul-2027** (R43) | **SR-1 sometida** (Rayyan screening + RoB2 + GRADE con el pipeline) | Primera publicación "de peso" |
| 2027-2029 | +1 case report/año + 1 SR/año + cartas oportunistas | Ritmo sostenible con 45' interdiario |
| **Meta pre-aplicación (2033)** | **8-12 ítems totales**, ≥2 SR, ≥1 primer autor/año | Dato NRMP: IMGs no-match en derma tenían mediana 12 pubs SIN scores — el volumen solo NO basta: **los Steps van primero** (por eso Research no roba horas a Fase 1) |
| ⚠ Cureus | máximo 1-2 ítems en todo el CV | Deslistada de Web of Science (oct-2025) |

## LIVIANO y las academias — suficiencia

- **LIVIANO 45'/día** cubre el currículo académico completo (90 días, **11-sep-2026 → mar 19-ene-2027**:
  fisiología → GLP-1 → acceso Perú → nutrición → ejercicio → fármacos/bariátrica → conducta → síntesis).
  En enero Joseph explica obesidad al
  nivel de un obesity-medicine fellow — suficiente para ser EL referente del programa. La
  ejecución comercial va aparte (Pulso hub, no roba esta franja).
- **CURVA y DENSA**: febrero 2027 (Fase 2), con currículo tipo LIVIANO_ACADEMIA. NÍTIDA = Derma.
- **IA (vibecoding 45' + misión 30' + PC finde)**: cada proyecto semanal automatiza un pedazo del
  sistema → devuelve MÁS horas de las que consume. Es el único slot cuya rentabilidad es compuesta.
  v5.9: **vibecoding 60 días 11-sep → jue 3-dic-2026** (12 SHIP en sábados 19-sep → 5-dic, sin mover) · **SYNAPSE 82 días
  11-sep → mar 1-dic-2026** · **AURUM 130 días 11-sep-2026 → mar 16-mar-2027**.

## Reglas de transición entre fases

1. La reestructuración de cada fase se hace la SEMANA PREVIA (la de Fase 2 → última semana de
   enero, post-examen): el rey saliente libera la mañana, el entrante la hereda; Calendar + app +
   Supabase + memoria se actualizan en bloque (como se hizo el 27-ago).
2. Un examen NO se rinde sin su gate: Step 1 (NBMEs), ENCAPS (sims de viernes ≥18/25 en feb-mar),
   MIR (netas de simulacros al nivel Top 50 antes de inscribir).
3. Cada fase cierra con post-mortem de datos (como el ANALISIS_EXAMEN_2026-2_REAL) → el modelo
   de pronóstico del siguiente examen SIEMPRE se re-entrena con el examen recién rendido.

## Fase 1 en fechas v5.9 (leídas de los `.ts` con node el 10-sep-2026)

| Plan | D1 | Dfin | Nº días | Fichero |
|---|---|---|---|---|
| 🇺🇸 USMLE Step 1 | vie 11-sep-2026 | mar 26-ene-2027 | 95 | `src/lib/usmleStep1Daily.ts` |
| 🇵🇪 ENCAPS mantenimiento | vie 11-sep-2026 | vie 29-ene-2027 | **98** | `src/lib/encapsPlan.ts` + Supabase |
| 🇪🇸 MIR 1ª vuelta | vie 11-sep-2026 | mié 30-dic-2026 | 78 | `src/lib/mirDailyPlan.ts` |
| 🇪🇸 MIR mantenimiento | lun 4-ene-2027 | mié 31-mar-2027 | 63 | `src/lib/mirMantenimiento.ts` (sin cambios) |
| 🔬 Research ciclo 1 | lun 14-sep-2026 | mar 9-feb-2027 | 42 | `src/lib/researchDailyPlan.ts` |
| 🔬 Research ciclo 2 | jue 11-feb-2027 | lun 16-ago-2027 | 67 | `src/lib/researchDailyPlan2027.ts` |
| 🩺 Derma élite | vie 11-sep-2026 | vie 26-mar-2027 | 70 | `src/lib/dermaDailyPlan.ts` (**sin cambios**) |
| ⚖️ LIVIANO Academia | vie 11-sep-2026 | mar 19-ene-2027 | 90 | `src/lib/livianoStudyPlan.ts` |
| 💼 Business formato L | vie 11-sep-2026 | lun 11-ene-2027 | **123** | `src/lib/businessStudyPlan.ts` |
| 💰 AURUM | vie 11-sep-2026 | mar 16-mar-2027 | 130 | `src/lib/aurumDailyPlan.ts` |
| 🧠 SYNAPSE | vie 11-sep-2026 | mar 1-dic-2026 | 82 | `src/lib/synapseDailyPlan.ts` |
| 🛠 Vibecoding 04:15 | vie 11-sep-2026 | jue 3-dic-2026 | 60 | `src/lib/vibecodingPlan.ts` |

*(Se invierte lo de v5.8: **Derma es ahora el único plan cuyas fechas NO cambiaron** —el nuevo D1 del régimen,
vie 11-sep, ya era su d1— y **Research sí se movió +2 días hábiles**, de jue 10-sep a lun 14-sep, porque la
paridad del interdiario vuelve a poner a Derma en el D1 del régimen. Los dos únicos planes que cambian de
número de días son ENCAPS (99 → 98: su cierre está clavado el 29-ene) y Business (121 → 123: gana dos filas
de fin de semana en la cola). El temario no pierde nada en ninguno de los dos.)*

**Los 12 hitos de la Fase 1 NO se movieron de fecha** (solo cambia su D#, todos −1): **UWSA1 11-sep (D1, que
ahora ES el D1 del régimen)** · NBME 25 2-oct (D16) · NBME 26 23-oct (D31) · NBME 27 13-nov (D46) ·
NBME 28 4-dic (D61) · NBME 29 18-dic (D71) · NBME 30 30-dic (D78) · UWSA2 8-ene (D83) ·
**NBME 31 15-ene (D88) = GO/NO-GO** · NBME 32 18-ene (D89) · NBME 33 20-ene (D91) · Free 120 22-ene (D93) ·
**examen semana 25-29 ene-2027 (target mié 27)**. Nueve caen en viernes; NBME 30 (mié 30-dic),
NBME 32 (lun 18-ene) y NBME 33 (mié 20-ene) no. Mínimos on-track: NBME 25 ≥51 · 26 ≥54 · 27 ≥57 ·
28 ≥61 · 29 ≥63 · 30 ≥65 · 31/32/33 ≥68 · Free 120 ≥70 (`src/lib/usmleScores.ts` → `HITOS_ONTRACK`).
