# DATA · USMLE Step 1 — Doc maestro v5.9 (reestructuración 27-ago · corrimiento 10-sep-2026 · niveles Palmerton)

**Step 1 es el bloque PRINCIPAL** (heredó las franjas ENCAPS de la mañana): 6h15/día L-V.
**D1 = VIE 11-sep-2026 → D95 = MAR 26-ene-2027 (95 días; del 31-ago al 10-sep no se estudió) ·
EXAMEN: semana 25-29 ene 2027 (target MIÉ 27-ene).**
Sábados y domingos LIBRES. Skip extra: 25-dic, 31-dic, 1-ene.
Fuente de verdad (código): [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) **v5.9**
(`DAILY_META.totalDias = 95`, `inicio = '2026-09-11'`, `fin = '2027-01-26'`).

> **Corrimiento v5.8 → v5.9 (10-sep-2026).** El 10 de septiembre tampoco se estudió, así que D1 pasó
> de jue 10-sep a **vie 11-sep** (regla del sistema: cada día sin estudiar = +1 día hábil). Es el
> **octavo corrimiento** desde el 31-ago.
> **REGLA PERMANENTE DE JOSEPH (vigente desde la v5.8): no se fusiona ni se recorta NADA.**
> Ni un tema ni un subtema queda atrás: el temario sale 1:1 y el desfase se absorbe **alargando el
> final del plan**, nunca comprimiendo días. D95 pasa de lun 25-ene a **mar 26-ene-2027** (del 11-sep
> al 25-ene solo caben 94 días hábiles). Las metas, las franjas horarias, la ventana de examen y los
> **12 hitos NBME/UWSA quedan en sus fechas originales** — solo cambia su D#.
>
> **Lo nuevo y esperado de esta versión: el D1 ES el UWSA1.** El vie 11-sep era la fecha anclada del
> UWSA1; al arrancar el plan ese mismo día, el baseline pasa a ocupar el **D1** — que es justo lo que
> prescribe Palmerton (medir antes de estudiar nada) — y el **primer día de CONTENIDO (Fundamentos)
> se desplaza al lun 14-sep = D2**. No es un error del corrimiento: es la consecuencia correcta de
> mantener los hitos anclados por fecha.
>
> Prueba dura del "nada se perdió": el multiconjunto de `(system, tier, sub, bbCh, bbVid, uw, mat,
> matType, palm)` del nuevo `DIAS` es **idéntico** al de la v5.8 (0 filas perdidas y 0 filas nuevas
> en las 95), y el total de **5580Q objetivo no se movió**.

Plataforma de práctica: **Qbankly** (`qbankly.app`) — **abre SOLO en Microsoft Edge**
(Chrome con CDP la bloquea). Los links de la app ofrecen botón ◆ Edge + Chrome.

## 1. Fases

| Fase | Días | Fechas | Qué se hace | Niveles UWorld (Palmerton) |
|------|------|--------|-------------|----------------------------|
| **A · Contenido por sistemas** | D1-D80 | vie 11-sep → mar 5-ene | UWSA1 baseline (D1) + 1ª pasada completa del temario desde D2 + 30-40Q uWorld/día por nivel (= 1ª vuelta del banco entero) + 7 simulacros de hito | **1 → 3** (+ dosis diaria de 4 en la eval 18:00) |
| **B · Banco intensivo** | D81-D88 | mié 6-ene → vie 15-ene | Random timed + incorrects · UWSA2 (8-ene) · NBME 31 (15-ene, **GO/NO-GO**) | **4 → 5** |
| **C · Sprint final** | D89-D95 | lun 18-ene → mar 26-ene | NBME 32 · AMBOSS 200 mitades 1 y 2 (D90 y D92, banco alojado en la semana del sprint) · NBME 33 · Free 120 · taper (solo flagged, sin preguntas nuevas) | **5** + NBME |

Días por fase (`faseDe` en el TS): **A = 80 · B = 8 · C = 7** (total 95). El corte A/B se mantiene en
D80; el B/C bajó de D90 a **D89** porque el contenido volvió a ganar un día por la cola.

## 2. Sistema → días → fechas (generado desde `DIAS` de `usmleStep1Daily.ts` v5.9)

| Sistema | Días | Fechas | Tier | Nº días |
|---------|------|--------|------|---------|
| Fundamentos (Pathoma 1-3: lesión celular, inflamación, neoplasia + setup Anki FSRS) | D2 · D3 | lun 14-sep · mar 15-sep | CORE | 2 |
| Immunology | D4 · D5 | 16-sep → 17-sep | CORE | 2 |
| Cardiovascular | D6-D15 | 18-sep → 1-oct | CORE | 10 |
| Respiratory | D17-D22 | 5-oct → 12-oct | CORE | 6 |
| Renal | D23-D28 | 13-oct → 20-oct | CORE | 6 |
| Gastrointestinal | D29 · D30 · D32-D36 | 21-oct → 30-oct | CORE | 7 |
| Endocrine | D37-D41 | 2-nov → 6-nov | CORE | 5 |
| Nervous System | D42-D45 · D47-D50 | 9-nov → 19-nov | CORE | 8 |
| Hematology & Oncology | D51-D56 | 20-nov → 27-nov | HIGH | 6 |
| Microbiology / ID | D57-D60 · D62-D64 | 30-nov → 9-dic | HIGH | 7 |
| Reproductive | D65-D69 | 10-dic → 16-dic | HIGH | 5 |
| Musculoskeletal / Rheum | D70 · D72 · D73 | 17-dic → 22-dic | HIGH | 3 |
| Psychiatry & Behavioral (incluye D77 = bioestadística + epidemiología + ética, `bbCh` = Biostats/Epi) | D74-D77 | 23-dic → 29-dic | HIGH | 4 |
| Biochemistry (D79 bioquímica HY · D80 biología molecular/genética + **farmacología general PK/PD + toxicología**) | D79 · D80 | 4-ene · 5-ene | MED | 2 |
| Assessment (9 días de hito; los otros 3 hitos viven en Sprint final — §3) | D1 · D16 · D31 · D46 · D61 · D71 · D78 · D83 · D88 | 11-sep → 15-ene | CORE | 9 |
| Banco intensivo (Fases B y C) | D81 · D82 · D84-D87 · D90 · D92 | 6-ene → 21-ene | CORE | 8 |
| Sprint final (Fase C) | D89 · D91 · D93-D95 | 18-ene → 26-ene | CORE | 5 |

> **El D1 (vie 11-sep) es Assessment, no contenido**: el UWSA1 estaba anclado a esa fecha y el plan
> arranca ese mismo día, así que el baseline ocupa el primer día (exactamente lo que prescribe
> Palmerton) y **Fundamentos empieza el lun 14-sep = D2**.
> Los demás huecos dentro de un sistema (D16, D31, D46, D61, D71, D78, D83, D88) son los otros
> **días de Assessment** (hitos, §3). En Fase C, D89/D91/D93 son NBME 32/33 y Free 120 con
> `system = 'Sprint final'`, y **D90 (mar 19-ene) y D92 (jue 21-ene) siguen siendo
> `system = 'Banco intensivo'`** (AMBOSS 200 mitades 1 y 2) alojados dentro de la semana del sprint.
> Cada día trae: `sub`, `bbCh`/`bbVid` (Boards & Beyond), `uw` (subtema uWorld), `mat`/`matType`
> (material primario), `palm` (vídeo Palmerton al abrir sistema), `nivelUW` (1-5) y `qDia` (§4b).

### Qué se movió y qué NO en el corrimiento v5.9

**Nada se fusionó ni se recortó.** El desfase de 1 día hábil se pagó **por la cola del plan**, no
comprimiendo contenido:

| | v5.8 (D1 = jue 10-sep) | v5.9 (D1 = vie 11-sep) |
|---|---|---|
| Días del plan | 95 | **95** (mismo temario, 1:1) |
| Primer día | jue 10-sep-2026 (Fundamentos) | **vie 11-sep-2026 = UWSA1**; el contenido arranca en D2, lun 14-sep |
| Último día | lun 25-ene-2027 | **mar 26-ene-2027** (víspera del target de examen) |
| Días de contenido | cada uno en su fecha | **+1 día hábil cada uno** |
| 12 hitos NBME/UWSA | 11-sep … 22-ene | **mismas 12 fechas**, solo cambia el D# |
| Días dobles de Biochem | D78 y D80 (heredados de la v5.7) | **D79 y D80** — los mismos temas, ahora consecutivos (el NBME 30 pasa a D78, delante de los dos) |
| Corte de fases | A D1-80 · B D81-89 · C D90-95 | A D1-80 · **B D81-88** · **C D89-95** |
| Viernes de nivel 3 | 4 (D12 Cardio · D22 Resp · D27 Renal · D67 Repro) | **6** (D11 Cardio · D21 Resp · D26 Renal · **D36 GI** · **D41 Endo** · **D56 Heme/Onc**) |
| Q objetivo totales | 5580 | **5580** (idéntico: la prueba aritmética de que no se recortó nada) |

Los 12 hitos siguen **anclados por fecha** en el mapa `SIMS` del generador, y los días no-hito se
consumen desde el array `POST_A` en los huecos libres; por eso el contenido se desliza alrededor de
los simulacros sin que ninguno se mueva de su viernes. La clasificación de `nivelUW`/`qDia` depende
del **origen de la fila** (`bbCh` = `Banco` / `Sprint`), no de umbrales de fecha, así que la regla
queda idéntica aunque el contenido se derrame hasta el 5-ene.

## 3. Hitos NBME/UWSA (12) — las fechas NO se mueven

| # | Hito | Día | Fecha | Q | Rol |
|---|------|-----|-------|---|-----|
| 1 | **UWSA1** | **D1** | vie 11-sep-2026 | 160Q | **Baseline en el PRIMER día del plan** (esperar bajo, no asustarse) |
| 2 | **NBME 25** | D16 | vie 2-oct-2026 | 200Q | 1ª calibración real |
| 3 | **NBME 26** | D31 | vie 23-oct-2026 | 200Q | Tendencia |
| 4 | **NBME 27** | D46 | vie 13-nov-2026 | 200Q | Tendencia |
| 5 | **NBME 28** | D61 | vie 4-dic-2026 | 200Q | Tendencia |
| 6 | **NBME 29** | D71 | vie 18-dic-2026 | 200Q | Parte el bloque MSK (en v5.7 lo cerraba) |
| 7 | **NBME 30** | D78 | mié 30-dic-2026 | 200Q | Cierre de contenido de 2026 (jue 31-dic y vie 1-ene son skip → cae en miércoles); los 2 días dobles de Biochem (D79 · D80) quedan ya en 2027, detrás del hito |
| 8 | **UWSA2** | D83 | vie 8-ene-2027 | 160Q | Predictor de resistencia (la fecha la deciden los NBME) |
| 9 | **NBME 31** | D88 | vie 15-ene-2027 | 200Q | **GO/NO-GO** |
| 10 | **NBME 32** | D89 | lun 18-ene-2027 | 200Q | Sprint final |
| 11 | **NBME 33** | D91 | mié 20-ene-2027 | 200Q | Sprint final |
| 12 | **FREE 120 oficial** | D93 | vie 22-ene-2027 | 120Q | Sprint final · idealmente en el Prometric real |

Los 12 hitos suman **2240Q** de simulacro. Todos caen en **viernes** salvo NBME 30
(mié 30-dic, porque jue 31-dic y vie 1-ene son skip) y NBME 32/33 (lun 18-ene y mié 20-ene, ya en
el sprint final). **Ninguna de estas 12 fechas cambió con la v5.9**: solo bajó su D# en 1 (los 7 de
2026 y el UWSA2/NBME 31) o en 1 (NBME 32/33 y Free 120). El caso llamativo es el **UWSA1, que pasó
de D2 a D1**: al arrancar el plan el mismo 11-sep, el baseline se convirtió en el primer día.

**Criterio GO (Step 1 es pass/fail): 2 NBME consecutivos ≥68% + UWSA2 "low risk" → confirmar
fecha.** (Palmerton: ≥65% ≈ 95% de probabilidad de aprobar; ≥70% ≈ 99% — el 68% doble queda en
el rango; mínimos on-track por hito en
[`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) Parte V.) Si NO se cumple: correr el
examen dentro del mismo eligibility period (feb-mar 2027) sin drama — un fail queda PARA
SIEMPRE en el transcript ECFMG (~1/3 de PDs nunca consideran un aplicante con fail en Step 1).
Detalle de gates y logística ECFMG/Prometric: [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md).

> ⚠ **Consecuencia del octavo corrimiento sobre el día del examen.** Con D95 = **mar 26-ene**, el
> plan termina la **víspera del target (mié 27-ene)**: ya no queda ningún día de descanso entre el
> último día de estudio y el examen. Si Joseph mantiene el mié 27, el protocolo D-1 hay que meterlo
> dentro de D95; con el examen el **jue 28** o el **vie 29** (misma ventana 25-29) recupera 1 o 2
> días de taper. **Decisión de Joseph** (ver `PALMERTON_DIVERGENCIAS_PLAN.md` §E-5).

## 4. Franjas horarias (Google Calendar v5.2 · L-V · 6h15/día · `FRANJAS` en el TS)

**Las HORAS no cambiaron con el corrimiento v5.9** (ni con ninguno de los anteriores).

| Hora | Segmento | Nivel UW | Gate |
|------|----------|----------|------|
| 05:00–05:45 | ANKI AM (madrugada fresca · pasada principal FSRS · Good ≈90% / Again solo olvido real · ≤50 nuevas/día) · Fases B-C: + STRESS SET 10Q/12min (primer instinto, sin cambiar respuestas) | B-C: 5 | — |
| 07:15–08:15 | Repaso anclado multi-temporal D-1/D-3/D-7 + free recall (Anki restante) · VALIDACIÓN 24-48 h: 5Q timed del subtema de AYER (1ª mitad del gate de 10Q) | 2 | subtema de ayer ≥80% en las 10Q (5 aquí + 5 en la consolidación) → validado · <80% → 5Q más del subtema antes de pasar a otro |
| 08:15–09:00 | PRE-TEST: 10Q uWorld ciegas del tema NUEVO (tutor · SIN tiempo) + free recall 90s = UWorld primero para DIAGNOSTICAR, First Aid después para tratar | 1 | sin gate: es diagnóstico (40-60% es normal) · cada duda, incluso en aciertos, va a la shopping list |
| 09:00–11:00 | DEEP PRIME: vídeo B&B/Pathoma/Sketchy + First Aid active reading (Whole Page Rule: la página completa, no el dato fallado) + tarjetas Anki de MECANISMO (≤10, patogenia→presentación, en voz alta antes de escribir) | — | — |
| 11:00–12:00 | CONSOLIDACIÓN por nivel del día (`DIAS[].nivelUW`): nivel 1 = 20Q en bloques 5Q tutor del subtema (días 1-2 del sistema) · nivel 2 = 30Q en bloques 5Q timed de subtemas validados (incluye 5Q del subtema de ayer = 2ª mitad del gate) · nivel 3 (viernes sin hito) = 20Q sistema completo timed + 10Q tutor · revisión = Educational Objective + shopping list + log de errores (knowledge / transfer / proceso) | 1→3 (nivelUW del día) | ≥80% → mañana sube de nivel · <80% → repetir 5Q del subtema fallado, NO avanzar (registrar en 📏 Medición) |
| 18:00–18:45 | EVALUACIÓN ACUMULATIVA modo examen: 10Q mixta timed (90 s/Q · tope 2 min · cover-the-options · juez, no abogado) + corrección + APEX · Fase A = dosis diaria de nivel 4 · día de hito: registrar aquí el % del NBME/UWSA/Free 120 | 4 (Fase A) · 5 (B-C) | ≥80% sostenido = listo para mezclar sistemas · hitos: comparar con el mínimo on-track del viernes (`usmleScores.HITOS_ONTRACK`) |

Resto del día (sin tocar): IA vibecoding 04:15-05:00 · RESEARCH↔DERMA alterna 13:30-14:15 ·
AURUM 14:15-15:15 · MIR 15:15-16:15 · **ENCAPS 16:15-17:15 (1h/día de banqueo puro hasta fines
de enero; feb-mar 2027 vuelve a principal — examen fines de marzo 2027)** · **LIVIANO Academia
17:15-18:00**. Las HORAS no cambian con los niveles: cambia el formato del bloque de las 11:00.

Matemática de horas v5.9: 95 días × 6h15 ≈ **594h** (bloque de mañana 5h30 ≈ 523h +
eval de 18:00 ≈ 71h). **No bajó respecto de la v5.8**: como esta vez tampoco se recortó contenido sino
que se alargó el plan, los 95 días siguen siendo 95. La referencia IMG-base-cero es 600-1.000h: el
plan queda algo por debajo del punto medio — proteger las franjas es lo que sostiene enero. Lo que sí
se consumió es **colchón de calendario**: D95 ya cae el **mar 26-ene**, segundo día de la ventana de
examen y víspera del target.

## 4b. 5 niveles UWorld por fase (Palmerton v3)

*(Fuente: "UWorld Complete Guide: The Five Levels of Mastery to 260+" + "How to Guarantee a Step 1 Pass" · extractos en
`_palmerton_v3_extractos/`)*. Regla madre (`DAILY_META.metodo` / `USMLE_GATE`): **no se sube de nivel sin ≥80% en 10Q
consecutivas del nivel actual, validadas ≤24-48 h después de estudiar el subtema**. Si <80%: no avanzar de tema; repetir
bloques de 5Q del subtema fallado y auditar recursos → comprensión → aplicación → memoria. Cada día de `DIAS` lleva
`nivelUW` (1-5) y `qDia` (Q objetivo); la tabla vive en `USMLE_NIVELES` (`usmleStep1Daily.ts`).

| Nivel | Nombre | Formato | Q/día | Umbral para SUBIR | Dónde vive en el día | Fase |
|-------|--------|---------|-------|-------------------|----------------------|------|
| **1** | Subtema · tutor sin tiempo | Bloques de 5Q de UN solo subtema · modo tutor · sin reloj (aprender a leer: CCSN + SAQ + cover-the-options) | Palmerton 20-30Q/día → plan: 30Q (10 pre-test + 20 consolidación) | 80% en 10Q consecutivas del subtema, ≤24-48 h tras estudiarlo | 08:15 PRE-TEST del tema nuevo (siempre) · 11:00 los 2 primeros días de cada sistema | A |
| **2** | Subtema · timed | Bloques de 5Q del subtema · cronometrado (90 s/Q · tope 2 min: adivinar, marcar, avanzar) | Volumen creciente → plan: 40Q (10 + 30) | 80% en ≥3 subtemas distintos, ≥1 validado en <48 h | 11:00 CONSOLIDACIÓN desde el 3er día de cada sistema (subtemas ya validados) · 07:15: 5Q timed del subtema de AYER (1ª mitad del gate de 10Q) | A |
| **3** | Sistema completo · timed | Bloques de 10-20Q de TODO el sistema · timed (sin la "ventaja injusta" de saber el subtema) | Palmerton 40-50Q/día → plan: 40Q (10 pre-test + 20Q sistema + 10 tutor) | 80% en 20Q timed consecutivas del sistema | VIERNES sin NBME/UWSA a las 11:00 (20Q del sistema en curso, o del anterior si el sistema lleva <3 días) | A |
| **4** | Sistemas mixtos · timed | Bloques de 20-30Q mezclando ≥3 sistemas dominados + el nuevo (saltar entre especialidades bajo presión) | Palmerton 50-70Q/día → plan Fase B: 2×40Q (80Q) | 80% en bloques mixtos de 20Q timed de ≥3 sistemas | 18:00 EVAL (10Q mixta timed) toda la Fase A como dosis diaria · **Fase B D81 · D82 · D84 · D85** (random timed 2×40Q + sistema débil) | A (dosis diaria) → B |
| **5** | Mixto completo 40Q · timed | Bloques de 40Q random · timed 60 min (90 s/Q) = simulación exacta del examen | Palmerton 80-100Q/día (máx. 2 bloques de 40) · hitos: UWSA 160Q · NBME 200Q · Free 120 | 80% sostenido (90% para 260+) · pase seguro = NBME ≥65% (≈95%) / ≥70% (≈99%) | 05:00 STRESS SET 10Q/12min (Fases B-C) · **Fase B D86 · D87 + NBME 31 (D88)** y **D90 · D92** (incorrects + AMBOSS 200 mitades 1-2) · Fase C (NBME 32/33 + Free 120 + taper D94-D95) · hitos de viernes = formato nivel 5 como MEDICIÓN, no como progresión | B → C (+ todos los hitos) |

**Regla determinista del generador** (no toca fechas, sistemas, hitos ni el total de 95 días):
- Fase A: posición del día dentro de su sistema (sin contar Assessment) → **1º-2º día = nivel 1** (30Q = 10 pre-test + 20 consolidación en bloques 5Q tutor) · **viernes sin hito y ≥3º día = nivel 3** (40Q = 10 + 20 sistema completo timed + 10 tutor) · **resto = nivel 2** (40Q = 10 + 30 en bloques 5Q timed).
- Hitos (🎯): formato **nivel 5 como MEDICIÓN** (UWSA 160Q · NBME 200Q · Free 120 = 120Q), no como progresión.
- Fase B (D81-D88): **D81, D82, D84 y D85 nivel 4** (2×40Q mixtos timed = 80Q) · **D86 y D87 nivel 5** (incorrects, 80Q) · **D83 = UWSA2** y **D88 = NBME 31**.
- Fase C (D89-D95): **nivel 5**; **D90 (mar 19-ene) y D92 (jue 21-ene)** siguen siendo días de banco (AMBOSS 200 mitades 1 y 2, 80Q cada uno) y los días sin simulacro son solo flagged/incorrects, sin preguntas nuevas (**D94 = 40Q · D95 = 20Q**).
- La eval de las 18:00 (10Q mixta timed) es la **dosis diaria de nivel 4** durante toda la Fase A; los stress sets 10Q/12min (nivel 5) solo en Fases B-C a las 05:00.

### Distribución real recontada desde `DIAS` (v5.9 · 95 días)

| Fase | Días | Niveles | Q objetivo (`qDia`) |
|------|------|---------|------------------------|
| **A** · D1-D80 | 80 | N1×28 · N2×39 · N3×6 · N5×7 | 4000 |
| **B** · D81-D88 | 8 | N4×4 · N5×4 | 840 |
| **C** · D89-D95 | 7 | N5×7 | 740 |
| **Total** | **95** | **N1×28 · N2×39 · N3×6 · N4×4 · N5×18** | **5580** |

> Respecto de la v5.8 cambian **10 días de nivel** (5 pares N2↔N3): al correr todo +1 día hábil, el
> viernes de cada sistema cae sobre otro subtema. **GI, Endo y Heme/Onc estrenan su viernes de nivel 3
> y Repro lo pierde** (N3 pasa de 4 a **6**; N2 de 41 a **39**). **El total de 5580Q no se movió** — es
> la prueba aritmética de que no se recortó contenido.

Desglose del total: **3340Q de trabajo diario** (83 días de plan) + **2240Q de simulacros**
(12 hitos = 9×200Q NBME + 2×160Q UWSA + 1×120Q Free 120).

**Viernes** (18 en el plan; 9 son hitos). Los 9 viernes de Fase A sin hito:
D6 (18-sep) Cardio **N1** · D11 (25-sep) Cardio **N3** · D21 (9-oct) Resp **N3** · D26 (16-oct) Renal **N3** · D36 (30-oct) GI **N3** · D41 (6-nov) Endo **N3** · D51 (20-nov) Heme/Onc **N1** · D56 (27-nov) Heme/Onc **N3** · D66 (11-dic) Repro **N1**.
Los que quedan en **N1** (D6, D51, D66) lo hacen porque su sistema lleva <3 días: ese día el bloque de
sistema completo timed se hace del sistema **anterior**.

### Medición (Palmerton: "se mide por % ciego, no por horas")

Código: [`src/lib/usmleScores.ts`](../../src/lib/usmleScores.ts) → localStorage `jmd-usmle-scores` (try/catch) + espejo Supabase **`usmle_daily_scores`** (upsert por `fecha`, fallback silencioso; migración `usmle_daily_scores_palmerton_v3`, mismo patrón RLS/policy "Allow all" que `study_sim_scores`; DDL al final de [`supabase-schema.sql`](../../src/lib/supabase-schema.sql)). UI: tarjeta **📏 Medición del día** en Cola de hoy (`UsmleTodayPlan.tsx`), stats **MEDIA 7D** y **Δ hito** en la barra (`ReadinessBar.tsx`, solo con datos) y tabla de niveles + serie de hitos en la pestaña Readiness (`UsmleHub.tsx`).

| Campo | Qué se anota | Fase A | Fases B-C | Día de hito |
|-------|--------------|--------|-----------|-------------|
| `pretest10` | aciertos /10 | pre-test ciego 08:15 | stress set 05:00 | — |
| `consol30pct` | % del bloque | consolidación 11:00 | bloques timed del día | bloque extra (opcional) |
| `evalPct` | % timed | eval 18:00 (10Q mixta) | eval 18:00 | **% del NBME/UWSA/Free 120** |
| `tipoError` | error dominante | knowledge · transfer · proceso | ídem | ídem |
| `nivelUW` / `notas` | nivel del día (automático) + shopping list | | | |

- **Gate del día** (✓ SUBIR / ✗ REPETIR): `consol30pct ≥ 80` en Fase A (bloques timed en B-C). En día de hito: % ≥ mínimo on-track.
- **Media móvil 7 días**: ventana calendario [hoy-6, hoy] (≈5 días hábiles) de la eval timed (proxy diario del % ciego).
- **Distancia al mínimo on-track del próximo hito**: media 7d (o último hito registrado) − mínimo de la tabla de [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) Parte V-A (UWSA1 baseline · NBME 25 ≥51 · 26 ≥54 · 27 ≥57 · 28 ≥61 · 29 ≥63 · 30 ≥65 · UWSA2 low risk · 31 ≥68 GO; 32/33 se leen contra el mismo 68 y Free 120 contra ≥70 = heurística comunitaria, no cifra Palmerton).
- **Readiness** de la barra: se ancla al último hito registrado. **Export JSON** desde la tarjeta (portapapeles en web / Share en móvil).
- Regla de lectura: el % de UWorld es **gate de proceso**, no predicción — solo los NBME predicen (≥65% ≈ 95% de pase, ≥70% ≈ 99%).

Divergencias técnica Palmerton ↔ plan v5.9 (resueltas y pendientes de decisión):
[`PALMERTON_DIVERGENCIAS_PLAN.md`](PALMERTON_DIVERGENCIAS_PLAN.md).

## 5. Jerarquía de material por `matType`

| matType | Material primario | Días del plan |
|---------|-------------------|---------------|
| path | **Pathoma** (Sattar) + First Aid | 23 |
| micro / pharm | **Sketchy** + First Aid | 8 + 5 |
| physio / biochem / anat | **AMBOSS library + B&B** + First Aid | 15 + 2 + 3 |
| behav | **First Aid** (+ UWorld Biostats Review) | 3 |
| clin / repro | AMBOSS + First Aid (casos clínicos, simulacros, banco, sprint) | 35 + 1 |

Método Palmerton transversal: comprensión fisiológica > memorización · tarjetas Anki de
MECANISMO (FSRS, retención 0.9, solo Good/Again) · pre-test ciego → active reading → free
recall → preguntas → log de errores (knowledge/transfer/proceso).
Guía por materia + método completo: [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md)
**v2 — catálogo completo**. Rol de cada recurso: [`RECURSOS_META_2026.md`](RECURSOS_META_2026.md).

## 6. Inventario Qbankly (REAL, verificado)

- **QBanks Step 1**: uWorld Step 1 2026 **3.659Q** (motor del plan) · AMBOSS **2.745Q** + plan
  81 bloques + **200 Concepts** + HY Biostats 155Q · Mehlman **7.278Q** · PassMedicine **3.846Q** ·
  USMLERx **2.150Q**.
- **Simulacros**: NBME formas **21-33** (~200Q c/u) · **UWSA 1/2/3** · Free 120.
- **Vídeos**: B&B Step 1 (22 secciones) + Sketchy (14 secciones) = **1.797 vídeos**.
- **Flashcards**: 2.180.
- **Biblioteca** (lectura): uWorld / AMBOSS / PassMedicine.
- AMBOSS además con **suscripción propia** (library + add-on Anki).
- Árbol y deep-links: [`src/lib/usmleQbanklyData.ts`](../../src/lib/usmleQbanklyData.ts) · raw en `STUDY_HUB/_scrape/qbankly_*.json`.

> El plan pide **5580Q** en total (3340 de banco diario + 2240 de simulacros) contra las 3.659Q de
> uWorld: el excedente lo cubren la revisión de incorrects, AMBOSS 200 Concepts y los NBME/UWSA,
> que no consumen banco uWorld.

## 7. Ficheros canónicos (código)

| Fichero | Rol |
|---------|-----|
| [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) | **v5.9 = FUENTE DE VERDAD**: DIAS (95, con `nivelUW`/`qDia`), FRANJAS (6, con nivel/gate), DAILY_META (+`metodo`), USMLE_NIVELES, USMLE_GATE, helpers (`faseDe`, `nivelInfo`, `esHito`, `hitosDelPlan`) |
| [`src/lib/usmleStep1Plan.ts`](../../src/lib/usmleStep1Plan.ts) | Plan macro (SISTEMAS con `diaInicio` alineado a DIAS, PLAN_META) |
| [`src/lib/usmlePalmertonData.ts`](../../src/lib/usmlePalmertonData.ts) | Vídeos Palmerton (serie High Yield, IDs + duraciones reales) |
| [`src/lib/usmleQbanklyData.ts`](../../src/lib/usmleQbanklyData.ts) | Árbol Qbankly + deep-links (`library?e=<epub>&doc=<docId>`) |
| [`src/lib/usmleData.ts`](../../src/lib/usmleData.ts) | KPIs, sistemas, disciplinas, ROI, recursos, reglas del Qbank (5 niveles) |
| [`src/lib/usmleScores.ts`](../../src/lib/usmleScores.ts) | **Medición diaria** (localStorage `jmd-usmle-scores` + Supabase `usmle_daily_scores`): gate 80%, media 7d, mínimos on-track por hito, export JSON |
| [`src/lib/obsidianMap.ts`](../../src/lib/obsidianMap.ts) | `USMLE_OBS_DAY`: D# → nota madre uWorld en el vault |
| UI | `src/components/study/UsmleHub.tsx` (barra: media 7d + Δ hito; Readiness: niveles + serie de hitos) + `UsmleTodayPlan.tsx` (chip nivel · chip MIR en paralelo · 📏 Medición) + `ReadinessBar.tsx` · Home: `TodayMission.tsx` |

## 8. Docs de esta carpeta

- [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) — **v2 catálogo completo**:
  por materia + 5 niveles UWorld + Anki fino + test-taking/test-day + planificación NBME.
- [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md) — semana a semana S1-S21 (v5.9) + día a día D1-D95 + reglas de reprogramación + gates ECFMG.
- [`RECURSOS_META_2026.md`](RECURSOS_META_2026.md) — rol de cada recurso, fase, horas, qué NO usar.
- [`PALMERTON_DIVERGENCIAS_PLAN.md`](PALMERTON_DIVERGENCIAS_PLAN.md) — **técnica Palmerton → qué hace el plan v5.9 →
  divergencia → resolución aplicada / propuesta para decisión de Joseph**.
- `_palmerton_v3_extractos/` — extractos crudos v3 del cuaderno (uworld-preguntas, metodo-global, planificacion-nbme-img…).
- Cuaderno NotebookLM **"STEP 1 · Palmerton Engine"** — **~140 fuentes**:
  [notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86](https://notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86)

> **Histórico del corrimiento** (regla: cada día sin estudiar = +1 día hábil; hitos fijos): plan de
> 70 días (D1 = 10-jun-2026) → **SUPERSEDIDO** por la v5 el 27-ago (D1 = 31-ago, 102 días) → **v5.3**
> 31-ago (D1 = mar 1-sep, 101 días) → **v5.4** 2-sep (D1 = jue 3-sep, 99 días) → **v5.5** 3-sep
> (D1 = vie 4-sep, 98 días) → **v5.6** 4-sep (D1 = lun 7-sep, 97 días) → **v5.7** 8-sep
> (D1 = mié 9-sep, 95 días: cierre de Fase A fusionado de 4 días en 2) → **v5.8** 9-sep
> (D1 = jue 10-sep → D95 = lun 25-ene, 95 días) → **v5.9** 10-sep
> (**D1 = vie 11-sep → D95 = mar 26-ene, 95 días**: el 10-sep tampoco se estudió; **el D1 pasa a ser
> el UWSA1** y el contenido arranca el lun 14-sep).
> **Punto de inflexión en la v5.8, confirmado en la v5.9**: de la v5.3 a la v5.7 el desfase se pagaba
> **comprimiendo contenido** (97 → 95 días con fusiones); desde la v5.8 rige la regla de Joseph —
> **no se fusiona ni se recorta nada** y el desfase se paga **alargando el plan por la cola**. El
> examen sigue siendo **ene-2027** (ventana 25-29, target mié 27), pero el colchón previo ya es cero:
> D95 cae el mar 26-ene.
