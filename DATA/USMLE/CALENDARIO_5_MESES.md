# CALENDARIO 5 MESES — USMLE Step 1 v5.14 (S1 semana del 21-sep-2026 → S20 semana del 1-feb-2027 · examen JUE 4-FEB-2027)

Plan semana a semana derivado de [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) **v5.14**
(fuente de verdad: **D1 = LUN 21-SEP-2026 → D95 = MIÉ 3-FEB-2027, 95 días**; del 31-ago al 18-sep
no se estudió: 15 hábiles perdidos) + evidencia del agente macro:calendario-5-meses (USMLE Bulletin 2026-27, NBME,
ECFMG, Yousmle, Shemmassian). L-V únicamente; **sáb y dom LIBRES**; **skip 25-dic, 31-dic, 1-ene**.
Fases: **A contenido D1-D81 · B banco D82-D86 · C sprint D87-D95** (`faseDe`).
**Examen: el plan rebasa la ventana 25-29 ene 2027 (D94 = mar 2-feb = D-2, última sesión de banco; D95 = mié 3-feb = D-1
DENTRO del plan) → target JUE 4-FEB-2027, FUERA de la ventana**; sáb 30 y dom 31-ene = libres (solo Anki vencido) entre D92 y
D93; el D-1 (mié 3-feb) es sesión mínima por la mañana + ritual de test-day.

> **v5.13 → v5.14 (19-sep-2026)**: ni el jueves 17 ni el viernes 18 de septiembre se estudiaron → D1 corrió de jue 17-sep a
> **lun 21-sep** (+2 días hábiles; decimotercer corrimiento desde el 31-ago). **Regla permanente de Joseph: no se
> fusiona ni se recorta NADA** — el temario sale 1:1 y el desfase se absorbe **alargando el final del
> plan** (D95 pasa de lun 1-feb a **mié 3-feb-2027**: del 21-sep al 3-feb caben exactamente 95 días
> hábiles). 11 de los 12 hitos NBME/UWSA **mantienen su fecha exacta** y solo cambia su D# (todos −2).
>
> **El UWSA1 vuelve a moverse con el D1** (jue 17-sep, fecha ya pasada → **lun 21-sep = D1**: baseline el
> primer día, como prescribe Palmerton). El **primer día de CONTENIDO es el mar 22-sep = D2**. Con el D1 en lunes,
> **las semanas del plan (`semanaDe`) coinciden por fin con las de calendario: S1 = 21-25 sep (5 días completos) … S20 = 1-5 feb**
> (20 semanas; ya no hay S21). Los 2 días dobles de Bioquímica vienen de la v5.7, conservan todos sus temas y quedan
> **juntos después del UWSA2** (D77 vie 8-ene = UWSA2 dentro de la Fase A · D78-D79 Psiquiatría/Biostats · D80 mié 13-ene · D81 jue
> 14-ene = cierre de Fase A); **no se creó ningún día doble nuevo**.
>
> 🔴 **Consecuencia nueva: el NBME 31 GO/NO-GO (D82, vie 15-ene) cae el día siguiente al cierre de contenido (D81, jue 14-ene),
> sin días de banco de consolidación delante.** Los 2 random timed que lo precedían pasan a **D84 (mar 19-ene) y D86 (jue 21-ene)**,
> intercalados con NBME 32 (D83, lun 18) y NBME 33 (D85, mié 20): la **Fase B es D82-D86** y la **Fase C arranca con el Free 120
> (D87, vie 22-ene)**. **S19 = 25-29 ene (D88-D92, banco)** y **S20 = 1-3 feb (D93 AMBOSS mitad 2 · D94 taper D-2 · D95 taper D-1)**.
>
> 🔴 **Target de examen JUE 4-FEB-2027 (fuera de la ventana 25-29 ene)**: `DAILY_META.examenTarget = '2027-02-04'`,
> `descansoD1 = '2027-02-03'`, `examenVentana` marcada como superada. D94 (mar 2-feb) = **D-2, última sesión de banco**
> (`USMLE_TAPER.d94`: 20Q flagged + Anki maduro, nada nuevo); **D95 (mié 3-feb) = D-1 DENTRO del plan** (`USMLE_TAPER.d95`/`.dMenos1`:
> sesión mínima ≤2 h por la mañana + ritual de test-day; nada después de las 17:00); **sáb 30 y dom 31-ene libres** (solo Anki
> vencido) entre D92 y D93. **Joseph debe agendar/reprogramar el Prometric para el jue 4-feb y confirmar que su eligibility period
> cubre esa fecha** (si no: extenderlo); la alternativa es **recortar temario** para volver atrás (decisión suya, §E-5 de
> DIVERGENCIAS). ⚠ **Desde hoy, cada día no estudiado mueve el examen un día hábil más (o exige recortar temario).**

| Sem | Lunes | Contenido (L-V) | Hito |
|-----|-------|-----------------|------|
| S1 | 21-sep | **Fundamentos** D2 · D3 (mar-mié) · **Immunology** D4 · D5 (jue-vie) | **UWSA1** (D1, lun 21-sep) |
| S2 | 28-sep | **Cardiovascular** D6-D9 (lun-jue) | **NBME 25** (D10, vie 2-oct) |
| S3 | 5-oct | **Cardiovascular** D11-D15 (lun-vie) | — |
| S4 | 12-oct | **Cardiovascular** D16 (lun) · **Respiratory** D17-D20 (mar-vie) | — |
| S5 | 19-oct | **Respiratory** D21 · D22 (lun-mar) · **Renal** D23 · D24 (mié-jue) | **NBME 26** (D25, vie 23-oct) |
| S6 | 26-oct | **Renal** D26-D29 (lun-jue) · **Gastrointestinal** D30 (vie) | — |
| S7 | 2-nov | **Gastrointestinal** D31-D35 (lun-vie) | — |
| S8 | 9-nov | **Gastrointestinal** D36 (lun) · **Endocrine** D37-D39 (mar-jue) | **NBME 27** (D40, vie 13-nov) |
| S9 | 16-nov | **Endocrine** D41 · D42 (lun-mar) · **Nervous System** D43-D45 (mié-vie) | — |
| S10 | 23-nov | **Nervous System** D46-D50 (lun-vie) | — |
| S11 | 30-nov | **Hematology & Oncology** D51-D54 (lun-jue) | **NBME 28** (D55, vie 4-dic) |
| S12 | 7-dic | **Hematology & Oncology** D56 · D57 (lun-mar) · **Microbiology / ID** D58-D60 (mié-vie) | — |
| S13 | 14-dic | **Microbiology / ID** D61-D64 (lun-jue) | **NBME 29** (D65, vie 18-dic) |
| S14 | 21-dic | **Reproductive** D66-D69 (lun-jue) | — |
| S15 | 28-dic | **Reproductive** D70 (lun) · **Musculoskeletal / Rheum** D71 (mar) | **NBME 30** (D72, mié 30-dic) |
| S16 | 4-ene | **Musculoskeletal / Rheum** D73 · D74 (lun-mar) · **Psychiatry & Behavioral** D75 · D76 (mié-jue) | **UWSA2** (D77, vie 8-ene) |
| S17 | 11-ene | **Psychiatry & Behavioral** D78 · D79 (lun-mar) · **Biochemistry** D80 · D81 (mié-jue) | **NBME 31** (D82, vie 15-ene) |
| S18 | 18-ene | **Banco intensivo** D84 · D86 (mar-jue) | **NBME 32** (D83, lun 18-ene) · **NBME 33** (D85, mié 20-ene) · **FREE 120 oficial** (D87, vie 22-ene) |
| S19 | 25-ene | **Banco intensivo** D88-D92 (lun-vie) → **sáb 30 / dom 31-ene libres** (solo Anki vencido) | — |
| S20 | 1-feb | **Banco intensivo** D93 (lun) · **Sprint final** D94 · D95 (mar-mié) = **TAPER** (D94 mar 2-feb = D-2, última sesión de banco · D95 mié 3-feb = D-1 DENTRO del plan: sesión mínima AM + ritual) → **JUE 4-FEB EXAMEN (target)** | — |

Fines de semana: **todos los sábados y domingos del plan están libres** (régimen 31-ago:
sostenibilidad > volumen). Únicos días hábiles saltados: **vie 25-dic-2026 (S14), jue 31-dic-2026
y vie 1-ene-2027 (S15)** — por eso S14 tiene 4 días y S15 solo 3, y por eso el NBME 30 cae en
**miércoles** 30-dic en vez de viernes. **S1 tiene 5 días completos** (D1 lun 21-sep = UWSA1 · D2-D5 contenido), **S19 tiene
5 días** (D88 lun 25-ene … D92 vie 29-ene, banco) y **S20 tiene 3 días** (D93 lun 1-feb · D94 mar 2-feb · D95 mié 3-feb). Semana de
examen: lun 1-feb = D93 (AMBOSS mitad 2, tras el finde libre) · **mar 2-feb = D94 (D-2, última sesión de banco)** · **mié 3-feb =
D95 = D-1 (sesión mínima + ritual)** · **jue 4-feb examen (target)**.

Desde Fase B (S17, vie 15-ene, D82 = NBME 31): al ANKI AM de las 05:00 se le suma el **STRESS SET diario 10Q/12min**
(Palmerton: últimas 2-3 semanas, ≥60% de contenido cubierto — entrena el primer instinto). El UWSA2 (vie 8-ene, D77)
cae todavía en la Fase A.

## Hitos en su semana (11 fechas intactas · UWSA1 movido al lun 21-sep · D# nuevos)

| # | Hito | Sem | Día | Fecha | Q |
|---|------|-----|-----|-------|---|
| 1 | **UWSA1** | S1 | **D1** | lun 21-sep-2026 | 160 |
| 2 | **NBME 25** | S2 | D10 | vie 2-oct-2026 | 200 |
| 3 | **NBME 26** | S5 | D25 | vie 23-oct-2026 | 200 |
| 4 | **NBME 27** | S8 | D40 | vie 13-nov-2026 | 200 |
| 5 | **NBME 28** | S11 | D55 | vie 4-dic-2026 | 200 |
| 6 | **NBME 29** | S13 | D65 | vie 18-dic-2026 | 200 |
| 7 | **NBME 30** | S15 | D72 | mié 30-dic-2026 | 200 |
| 8 | **UWSA2** | S16 | D77 | vie 8-ene-2027 | 160 |
| 9 | **NBME 31** | S17 | D82 | vie 15-ene-2027 | 200 |
| 10 | **NBME 32** | S18 | D83 | lun 18-ene-2027 | 200 |
| 11 | **NBME 33** | S18 | D85 | mié 20-ene-2027 | 200 |
| 12 | **FREE 120 oficial** | S18 | D87 | vie 22-ene-2027 | 120 |

Los 12 hitos suman **2240Q** de simulacro. Caen en **viernes** 8 de ellos; las excepciones son el
**UWSA1 (lun 21-sep, D1: baseline el primer día del plan)**, el NBME 30 (mié 30-dic, porque jue 31-dic y
vie 1-ene son skip) y NBME 32/33 (lun 18-ene y mié 20-ene, ya en la Fase B). El Free 120 (vie 22-ene) queda a
**D-13 del examen** (jue 4-feb) y abre la Fase C. **El NBME 31 (vie 15-ene, D82) es el día siguiente al cierre de contenido (D81,
jue 14-ene)**: no hay banco de consolidación delante del GO/NO-GO (consecuencia del corrimiento v5.14).

## 5 niveles UWorld por fase (Palmerton v3)

Cada día de `DIAS` lleva `nivelUW` (1-5) y `qDia` (Q uWorld objetivo). Regla madre: **no se sube de nivel sin ≥80% en 10Q
consecutivas del nivel actual (≤24-48 h)**; si <80% se repite el subtema (bloques de 5Q) y se audita el método. Las HORAS del
bloque no cambian; cambia el FORMATO de la consolidación de las 11:00 según el nivel del día.

| Nivel | Nombre | Formato | Q/día | Umbral para SUBIR | Dónde vive en el día | Fase |
|-------|--------|---------|-------|-------------------|----------------------|------|
| **1** | Subtema · tutor sin tiempo | Bloques de 5Q de UN solo subtema · modo tutor · sin reloj (aprender a leer: CCSN + SAQ + cover-the-options) | Palmerton 20-30Q/día → plan: 30Q (10 pre-test + 20 consolidación) | 80% en 10Q consecutivas del subtema, ≤24-48 h tras estudiarlo | 08:15 PRE-TEST del tema nuevo (siempre) · 11:00 los 2 primeros días de cada sistema | A |
| **2** | Subtema · timed | Bloques de 5Q del subtema · cronometrado (90 s/Q · tope 2 min: adivinar, marcar, avanzar) | Volumen creciente → plan: 40Q (10 + 30) | 80% en ≥3 subtemas distintos, ≥1 validado en <48 h | 11:00 CONSOLIDACIÓN desde el 3er día de cada sistema (subtemas ya validados) · 07:15: 5Q timed del subtema de AYER (1ª mitad del gate de 10Q) | A |
| **3** | Sistema completo · timed | Bloques de 10-20Q de TODO el sistema · timed (sin la "ventaja injusta" de saber el subtema) | Palmerton 40-50Q/día → plan: 40Q (10 pre-test + 20Q sistema + 10 tutor) | 80% en 20Q timed consecutivas del sistema | VIERNES sin NBME/UWSA a las 11:00 **hasta S10** (D15 Cardio · D20 Resp · D35 GI · D45 y D50 Neuro; los viernes D5 Immuno y D30 GI caen en 1.º-2.º día de sistema y quedan en nivel 1): 20Q del sistema en curso, o del anterior si el sistema lleva <3 días · desde S11 el viernes pasa a nivel 4 | A |
| **4** | Sistemas mixtos · timed | Bloques de 20-30Q mezclando ≥3 sistemas dominados + el nuevo (saltar entre especialidades bajo presión) | Palmerton 50-70Q/día → plan: viernes N4 = 40Q (10 pre-test + 30Q mixtos timed) · Fase B: 2×40Q (80Q) | 80% en bloques mixtos de 20Q timed de ≥3 sistemas | 18:00 EVAL (10Q mixta timed) toda la Fase A como dosis diaria · **VIERNES sin hito desde S11 (solo D60, vie 11-dic, S12: 9 sistemas cerrados; los viernes de S11 y S13 son NBME 28 y 29) = 20-30Q mixtos timed a las 11:00 en vez de sistema único** (flag `VIERNES_N4_DESDE_SEMANA = 11`, texto en `DIAS[].franjaNota`) · **Fase B D84 · D86 + Fase C D88 · D89** (random timed 2×40Q + sistema débil) | A (dosis diaria + viernes desde S11) → B-C |
| **5** | Mixto completo 40Q · timed | Bloques de 40Q random · timed 60 min (90 s/Q) = simulación exacta del examen | Palmerton 80-100Q/día (máx. 2 bloques de 40) · hitos: UWSA 160Q · NBME 200Q · Free 120 | 80% sostenido (90% para 260+) · pase seguro = NBME ≥65% (≈95%) / ≥70% (≈99%) | 05:00 STRESS SET 10Q/12min (Fases B-C) · **UWSA2 (D77, dentro de la Fase A) + NBME 31 (D82, abre la Fase B) + NBME 32/33 (D83, D85)** y **D90 · D91 · D92 · D93** (incorrects 2ª pasada + AMBOSS 200 mitades 1-2, alojados en el sprint) · Fase C (Free 120 D87 + taper D94-D95) · hitos de viernes = formato nivel 5 como MEDICIÓN, no como progresión | B → C (+ todos los hitos) |

**Regla determinista del generador** (no toca fechas, sistemas, hitos ni el total de 95 días):
- Fase A: posición del día dentro de su sistema (sin contar Assessment) → **1º-2º día = nivel 1** (30Q = 10 pre-test + 20 consolidación en bloques 5Q tutor) · **viernes sin hito y ≥3º día = nivel 3 hasta S10** (40Q = 10 + 20 sistema completo timed + 10 tutor) · **viernes sin hito y ≥3º día desde S11 = nivel 4** (40Q = 10 pre-test + 20-30Q timed mixtos de sistemas dominados + 10 tutor; flag `VIERNES_N4_DESDE_SEMANA = 11`) · **resto = nivel 2** (40Q = 10 + 30 en bloques 5Q timed).
- Hitos (🎯): formato **nivel 5 como MEDICIÓN** (UWSA 160Q · NBME 200Q · Free 120 = 120Q), no como progresión.
- Fase A cierra con **D77 = UWSA2** (nivel 5, vie 8-ene), **D78-D79 = Psicofármacos / Biostats** (nivel 2), **D80 = Bioquímica día doble 1** (nivel 1, mié 13-ene) y **D81 = Bioquímica día doble 2** (nivel 1, jue 14-ene).
- Fase B (D82-D86): **D82 = NBME 31** (nivel 5 como medición, abre la fase el día siguiente al cierre de contenido) · **D83 = NBME 32** y **D85 = NBME 33** (nivel 5) · **D84 y D86 nivel 4** (2×40Q mixtos timed = 80Q, sistema débil #1).
- Fase C (D87-D95): **nivel 5** salvo **D88 (lun 25-ene) y D89 (mar 26-ene), nivel 4** (random timed + sistema débil #2 / Mehlman); **D90 (mié 27-ene), D91 (jue 28-ene), D92 (vie 29-ene) y D93 (lun 1-feb) siguen siendo días de banco** (incorrects 2ª pasada · AMBOSS 200 mitad 1 · mitad 2, 80Q cada uno) y los días sin simulacro son **taper** (`TAPER_ACTIVO`, 12-sep tarde): solo flagged/incorrects ya vistos + Anki maduro, cero preguntas y cero tarjetas nuevas (**D94 = 20Q · D95 = 20Q**).
- **La clasificación no depende de umbrales de FECHA** sino del **origen de la fila** (`bbCh` = `Banco` / `Sprint`): así la regla queda idéntica aunque el contenido se derrame hasta el 14-ene.
- La eval de las 18:00 (10Q mixta timed) es la **dosis diaria de nivel 4** durante toda la Fase A; los stress sets 10Q/12min (nivel 5) solo en Fases B-C a las 05:00.

### Distribución real recontada desde `DIAS` (v5.14 · 95 días)

| Fase | Días | Niveles | Q objetivo (`qDia`) |
|------|------|---------|------------------------|
| **A** · D1-D81 | 81 | N1×28 · N2×39 · N3×5 · N4×1 · N5×8 | 4160 |
| **B** · D82-D86 | 5 | N4×2 · N5×3 | 760 |
| **C** · D87-D95 | 9 | N4×2 · N5×7 | 640 |
| **Total** | **95** | **N1×28 · N2×39 · N3×5 · N4×5 · N5×18** | **5560** |

Desglose: **3320Q de trabajo diario** (83 días) + **2240Q de simulacros**
(9×200Q NBME + 2×160Q UWSA + 1×120Q Free 120). El total **5560Q es idéntico al de la v5.13**: el corrimiento
no toca volumen ni contenido (el multiconjunto sistema/subtema es el mismo, verificado con `node` por `(system, sub)`: 95/95 biyectivo).
Viernes de Fase A sin hito (8): D5 (25-sep) Immunology **N1** · D15 (9-oct) Cardiovascular **N3** · D20 (16-oct) Respiratory **N3** · D30 (30-oct) Gastrointestinal **N1** · D35 (6-nov) Gastrointestinal **N3** · D45 (20-nov) Nervous System **N3** · D50 (27-nov) Nervous System **N3** · D60 (11-dic) Microbiology / ID **N4** (único viernes N4: S12, mixto de los 9 sistemas cerrados).
Los que quedan en **N1** (D5 Immuno, D30 GI) lo hacen porque su sistema lleva <3 días: ese viernes el bloque
de sistema completo timed se hace del sistema **anterior**. Cambio de niveles de la v5.13 → v5.14: al
correr todo +2 días hábiles, el viernes de cada sistema cae dos subtemas más allá — **Cardio recupera su viernes de nivel 3**
(D15 IC + shock) y **Neuro gana dos** (D45 tronco/pares craneales · D50 EM/meningitis/NMJ); Resp pasa de TEP/HTP (D22) a
restrictivas/intersticiales (D20) y GI de intestino delgado (D32) a hígado II (D35); el único viernes N4 pasa de virus DNA (D62) a
Gram− bacilos + zoonosis (D60, S12). Totales: N3×3 → **N3×5**, N2×41 → **N2×39**, N4×5 sin cambio. El UWSA1, ahora en lunes,
sigue sin ocupar un viernes (17 viernes en el plan, 8 son hitos y el vie 29-ene es el D92 de banco, AMBOSS mitad 1).

### Nivel por día y semana (generado desde `DIAS`)

| Sem | Lunes | Niveles L-V (🎯 = hito) | Q objetivo/día |
|-----|-------|--------------------------|----------------|
| S1 | 21-sep | lun N5🎯 · mar N1 · mié N1 · jue N1 · vie N1 | 160/30/30/30/30 |
| S2 | 28-sep | lun N1 · mar N1 · mié N2 · jue N2 · vie N5🎯 | 30/30/40/40/200 |
| S3 | 5-oct | lun N2 · mar N2 · mié N2 · jue N2 · vie N3 | 40/40/40/40/40 |
| S4 | 12-oct | lun N2 · mar N1 · mié N1 · jue N2 · vie N3 | 40/30/30/40/40 |
| S5 | 19-oct | lun N2 · mar N2 · mié N1 · jue N1 · vie N5🎯 | 40/40/30/30/200 |
| S6 | 26-oct | lun N2 · mar N2 · mié N2 · jue N2 · vie N1 | 40/40/40/40/30 |
| S7 | 2-nov | lun N1 · mar N2 · mié N2 · jue N2 · vie N3 | 30/40/40/40/40 |
| S8 | 9-nov | lun N2 · mar N1 · mié N1 · jue N2 · vie N5🎯 | 40/30/30/40/200 |
| S9 | 16-nov | lun N2 · mar N2 · mié N1 · jue N1 · vie N3 | 40/40/30/30/40 |
| S10 | 23-nov | lun N2 · mar N2 · mié N2 · jue N2 · vie N3 | 40/40/40/40/40 |
| S11 | 30-nov | lun N1 · mar N1 · mié N2 · jue N2 · vie N5🎯 | 30/30/40/40/200 |
| S12 | 7-dic | lun N2 · mar N2 · mié N1 · jue N1 · **vie N4** (viernes N4: mixto de sistemas dominados) | 40/40/30/30/40 |
| S13 | 14-dic | lun N2 · mar N2 · mié N2 · jue N2 · vie N5🎯 | 40/40/40/40/200 |
| S14 | 21-dic | lun N1 · mar N1 · mié N2 · jue N2 | 30/30/40/40 |
| S15 | 28-dic | lun N2 · mar N1 · mié N5🎯 | 40/30/200 |
| S16 | 4-ene | lun N1 · mar N2 · mié N1 · jue N1 · vie N5🎯 | 30/40/30/30/160 |
| S17 | 11-ene | lun N2 · mar N2 · mié N1 · jue N1 · vie N5🎯 | 40/40/30/30/200 |
| S18 | 18-ene | lun N5🎯 · mar N4 · mié N5🎯 · jue N4 · vie N5🎯 | 200/80/200/80/120 |
| S19 | 25-ene | lun N4 · mar N4 · mié N5 · jue N5 · vie N5 → sáb/dom libres | 80/80/80/80/80 |
| S20 | 1-feb | lun N5 · mar N5 (taper **D-2, última sesión de banco**) · mié N5 (taper **D-1 dentro del plan**: sesión mínima AM + ritual) → **jue 4-feb EXAMEN** | 80/20/20 |

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

## Día a día (D1-D95, generado desde `DIAS`)

| D | Fecha | Sistema | Subtema | Nivel UW | Q |
|---|-------|---------|---------|----------|---|
| D1 | lun 21-sep | Assessment | 🎯 UWSA1 — BASELINE (160Q, 09:00-13:00) + revisión completa por la tarde | N5 (hito) | 160 |
| D2 | mar 22-sep | Fundamentos | Pathoma 1-2: lesión celular + muerte celular + inflamación | N1 | 30 |
| D3 | mié 23-sep | Fundamentos | Pathoma 3: neoplasia (principios + carcinogénesis) · setup Anki FSRS | N1 | 30 |
| D4 | jue 24-sep | Immunology | Inmunidad innata/adaptativa + MHC + linfocitos T/B | N1 | 30 |
| D5 | vie 25-sep | Immunology | Hipersensibilidades I-IV + autoinmunidad + inmunodeficiencias | N1 | 30 |
| D6 | lun 28-sep | Cardiovascular | Anatomía + fisiología cardíaca (GC, presiones, ciclos) | N1 | 30 |
| D7 | mar 29-sep | Cardiovascular | Hemodinámica + regulación de PA + HTA | N1 | 30 |
| D8 | mié 30-sep | Cardiovascular | Curvas: PV loops, Wiggers, Starling | N2 | 40 |
| D9 | jue 1-oct | Cardiovascular | Electrofisiología: potenciales + ECG + bloqueos | N2 | 40 |
| D10 | vie 2-oct | Assessment | 🎯 NBME 25 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D11 | lun 5-oct | Cardiovascular | Taquiarritmias clínicas (FA, TSV, WPW, TV) | N2 | 40 |
| D12 | mar 6-oct | Cardiovascular | Antiarrítmicos + fármacos autonómicos CV | N2 | 40 |
| D13 | mié 7-oct | Cardiovascular | Aterosclerosis + isquemia + angina | N2 | 40 |
| D14 | jue 8-oct | Cardiovascular | SCA: STEMI/NSTEMI/inestable + manejo + complicaciones IAM | N2 | 40 |
| D15 | vie 9-oct | Cardiovascular | Insuficiencia cardíaca + shock + fármacos IC | N3 | 40 |
| D16 | lun 12-oct | Cardiovascular | Valvulopatías + soplos + endocarditis · miocardiopatías + pericardio + congénitas | N2 | 40 |
| D17 | mar 13-oct | Respiratory | Fisiología pulmonar: volúmenes + compliance + hemoglobina | N1 | 30 |
| D18 | mié 14-oct | Respiratory | V/Q + gradiente A-a + hipoxemia/hipoxia | N1 | 30 |
| D19 | jue 15-oct | Respiratory | Obstructivas: asma + EPOC + PFTs + broncodilatadores | N2 | 40 |
| D20 | vie 16-oct | Respiratory | Restrictivas + intersticiales + ocupacionales | N3 | 40 |
| D21 | lun 19-oct | Respiratory | Neumonía + TBC + absceso | N2 | 40 |
| D22 | mar 20-oct | Respiratory | TEP/TVP + HTP + ARDS + cáncer de pulmón | N2 | 40 |
| D23 | mié 21-oct | Renal | Nefrona + filtración + clearance + FG | N1 | 30 |
| D24 | jue 22-oct | Renal | Transporte tubular + diuréticos (sitio de acción) | N1 | 30 |
| D25 | vie 23-oct | Assessment | 🎯 NBME 26 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D26 | lun 26-oct | Renal | Electrolitos completos: Na/agua + SIADH/DI + K + Ca + P | N2 | 40 |
| D27 | mar 27-oct | Renal | Ácido-base paso a paso + compensaciones + GAP | N2 | 40 |
| D28 | mié 28-oct | Renal | Glomerulares: nefrítico vs nefrótico (patrones) | N2 | 40 |
| D29 | jue 29-oct | Renal | AKI (pre/intra/post) + ERC + litiasis + poliquistosis | N2 | 40 |
| D30 | vie 30-oct | Gastrointestinal | Fisiología GI: secreciones + hormonas + motilidad | N1 | 30 |
| D31 | lun 2-nov | Gastrointestinal | Esófago + estómago: ERGE, acalasia, úlcera, H. pylori, Ca | N1 | 30 |
| D32 | mar 3-nov | Gastrointestinal | Intestino delgado: malabsorción + celiaquía + EII | N2 | 40 |
| D33 | mié 4-nov | Gastrointestinal | Colon: pólipos + CCR (vías) + diverticular + isquemia | N2 | 40 |
| D34 | jue 5-nov | Gastrointestinal | Hígado I: LFTs + bilirrubina/ictericias + hepatitis | N2 | 40 |
| D35 | vie 6-nov | Gastrointestinal | Hígado II: cirrosis + complicaciones + HCC + hereditarias | N3 | 40 |
| D36 | lun 9-nov | Gastrointestinal | Biliar + páncreas: litiasis, colecistitis, pancreatitis, Ca | N2 | 40 |
| D37 | mar 10-nov | Endocrine | Ejes hipotálamo-hipófisis + feedback (1º vs 2º vs 3º) | N1 | 30 |
| D38 | mié 11-nov | Endocrine | Tiroides: síntesis + hiper/hipo + tiroiditis + Ca | N1 | 30 |
| D39 | jue 12-nov | Endocrine | Suprarrenal: Cushing / Addison / CAH / feocromocitoma | N2 | 40 |
| D40 | vie 13-nov | Assessment | 🎯 NBME 27 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D41 | lun 16-nov | Endocrine | DM 1 y 2: fisiopatología + DKA/HHS + tratamiento (insulinas, ADO, GLP-1/SGLT2) | N2 | 40 |
| D42 | mar 17-nov | Endocrine | Calcio/PTH + MEN + patología hipofisaria | N2 | 40 |
| D43 | mié 18-nov | Nervous System | Neuroanatomía localizadora + vías ascendentes/descendentes | N1 | 30 |
| D44 | jue 19-nov | Nervous System | Médula espinal: síndromes + Brown-Séquard | N1 | 30 |
| D45 | vie 20-nov | Nervous System | Tronco + pares craneales + reflejos | N3 | 40 |
| D46 | lun 23-nov | Nervous System | SNA + fármacos autonómicos (completo) | N2 | 40 |
| D47 | mar 24-nov | Nervous System | Ictus: territorios + isquémico/hemorrágico + HSA | N2 | 40 |
| D48 | mié 25-nov | Nervous System | Convulsiones + antiepilépticos | N2 | 40 |
| D49 | jue 26-nov | Nervous System | Demencias + Parkinson + trastornos del movimiento | N2 | 40 |
| D50 | vie 27-nov | Nervous System | EM/desmielinizantes + meningitis + NMJ + tumores SNC | N3 | 40 |
| D51 | lun 30-nov | Hematology & Oncology | Anemias microcíticas: Fe + talasemias + frotis | N1 | 30 |
| D52 | mar 1-dic | Hematology & Oncology | Macro/normocíticas + hemólisis + drepanocitosis | N1 | 30 |
| D53 | mié 2-dic | Hematology & Oncology | Coagulación: cascada + PT/PTT + hemofilias + vWD | N2 | 40 |
| D54 | jue 3-dic | Hematology & Oncology | Plaquetas (PTI/PTT/SUH) + hipercoagulabilidad + CID | N2 | 40 |
| D55 | vie 4-dic | Assessment | 🎯 NBME 28 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D56 | lun 7-dic | Hematology & Oncology | Leucemias agudas y crónicas + mielodisplasia | N2 | 40 |
| D57 | mar 8-dic | Hematology & Oncology | Linfomas + mieloma + transfusión + fármacos onco | N2 | 40 |
| D58 | mié 9-dic | Microbiology / ID | Bacteriología general + genética bacteriana + Gram+ cocos | N1 | 30 |
| D59 | jue 10-dic | Microbiology / ID | Gram+ bacilos + anaerobios + Gram− cocos | N1 | 30 |
| D60 | vie 11-dic | Microbiology / ID | Gram− bacilos (entéricos + respiratorios) + zoonosis — **viernes de NIVEL 4** (S12, único del plan): 11:00 = 20-30Q timed mixtos de los sistemas dominados + 10Q tutor del subtema | N4 | 40 |
| D61 | lun 14-dic | Microbiology / ID | Micobacterias + espiroquetas + atípicas (Chlamydia/Mycoplasma) | N2 | 40 |
| D62 | mar 15-dic | Microbiology / ID | Virus DNA + herpes + hepatitis virales | N2 | 40 |
| D63 | mié 16-dic | Microbiology / ID | Virus RNA + VIH + arbovirus | N2 | 40 |
| D64 | jue 17-dic | Microbiology / ID | Hongos + parásitos + antimicrobianos (ATB/antifúngicos/antivirales) | N2 | 40 |
| D65 | vie 18-dic | Assessment | 🎯 NBME 29 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D66 | lun 21-dic | Reproductive | Embriología general + ciclo menstrual + hormonas repro | N1 | 30 |
| D67 | mar 22-dic | Reproductive | Embarazo: fisiología + preeclampsia + TORCH | N1 | 30 |
| D68 | mié 23-dic | Reproductive | Gineco-oncología: cérvix + endometrio + ovario | N2 | 40 |
| D69 | jue 24-dic | Reproductive | Mama + aparato masculino + próstata | N2 | 40 |
| D70 | lun 28-dic | Reproductive | ITS + anticoncepción + amenorreas + SOP | N2 | 40 |
| D71 | mar 29-dic | Musculoskeletal / Rheum | Artritis: AR/OA/gota/espondiloartropatías + autoanticuerpos | N1 | 30 |
| D72 | mié 30-dic | Assessment | 🎯 NBME 30 — cierre Fase A (07:15-11:00) + plan Fase B según gaps | N5 (hito) | 200 |
| D73 | lun 4-ene | Musculoskeletal / Rheum | LES + conectivopatías + vasculitis | N1 | 30 |
| D74 | mar 5-ene | Musculoskeletal / Rheum | Hueso (osteoporosis/Paget/tumores) + anatomía MSK high-yield (plexos, nervios) + dermato Step 1 — **cuenta doble Derma ↔ Step 1**: pre-test 08:15 y repaso 07:15 = `deck:APEX::DERMA tag:step1` + fallos del ledger derma (8 átomos d7·d8·d10·d12·d14·d16·d23·d24) | N2 | 40 |
| D75 | mié 6-ene | Psychiatry & Behavioral | Trastornos del ánimo + psicóticos + DSM esquema | N1 | 30 |
| D76 | jue 7-ene | Psychiatry & Behavioral | Ansiedad + personalidad + infancia (TDAH/autismo) + sustancias/toxidromes | N1 | 30 |
| D77 | vie 8-ene | Assessment | 🎯 UWSA2 — el predictor gold-standard (09:00-13:00) + revisión | N5 (hito) | 160 |
| D78 | lun 11-ene | Psychiatry & Behavioral | Psicofármacos: AD + antipsicóticos + litio + ansiolíticos | N2 | 40 |
| D79 | mar 12-ene | Psychiatry & Behavioral | Bioestadística + epidemiología + ética/comunicación (AMBOSS HY 155Q) | N2 | 40 |
| D80 | mié 13-ene | Biochemistry | Bioquímica HY (día doble): metabolismo glucólisis/TCA/CTE + glucógeno + lípidos · aminoácidos + ciclo de urea + errores innatos + vitaminas (SOLO high-yield: Palmerton = rutas completas son poco ROI) | N1 | 30 |
| D81 | jue 14-ene | Biochemistry | Cierre Fase A (día doble): biología molecular + genética (herencias, trinucleótidos) · farmacología general transversal PK/PD + toxicología + antídotos — **cierre de contenido**; el NBME 31 (D82) cae al día siguiente, sin banco de consolidación delante | N1 | 30 |
| D82 | vie 15-ene | Assessment | 🎯 NBME 31 (07:15-11:00) + decisión GO/NO-GO de fecha de examen | N5 (hito) | 200 |
| D83 | lun 18-ene | Sprint final | 🎯 NBME 32 (07:15-11:00) + revisión + repaso FA sistemas 1-5 | N5 (hito) | 200 |
| D84 | mar 19-ene | Banco intensivo | Random timed 2×40Q + revisión profunda + sistema débil #1 (según NBMEs) | N4 | 80 |
| D85 | mié 20-ene | Sprint final | 🎯 NBME 33 (07:15-11:00) + revisión + repaso FA sistemas 11-14 | N5 (hito) | 200 |
| D86 | jue 21-ene | Banco intensivo | Random timed 2×40Q + revisión + sistema débil #1 (First Aid + Anki) | N4 | 80 |
| D87 | vie 22-ene | Sprint final | 🎯 FREE 120 oficial (07:15-11:00) + logística del examen + cierre | N5 (hito) | 120 |
| D88 | lun 25-ene | Banco intensivo | Random timed 2×40Q + revisión + sistema débil #2 | N4 | 80 |
| D89 | mar 26-ene | Banco intensivo | Random timed 2×40Q + revisión + sistema débil #2 (Mehlman HY del sistema) | N4 | 80 |
| D90 | mié 27-ene | Banco intensivo | uWorld incorrects (2ª pasada) + sistema débil #3 | N5 | 80 |
| D91 | jue 28-ene | Banco intensivo | uWorld incorrects (2ª pasada) + sistema débil #3 | N5 | 80 |
| D92 | vie 29-ene | Banco intensivo | uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 1) → **sáb 30 y dom 31-ene libres** (solo Anki vencido) | N5 | 80 |
| D93 | lun 1-feb | Banco intensivo | uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 2) | N5 | 80 |
| D94 | mar 2-feb | Sprint final | Repaso First Aid rápido sistemas 6-10 + Anki marathon + incorrects — **TAPER D-2 · ÚLTIMA SESIÓN DE BANCO**: solo Anki maduro + 20Q flagged ya vistos, nada nuevo | N5 | 20 |
| D95 | mié 3-feb | Sprint final | Repaso rapid review First Aid (páginas finales) + Anki + laboratorio de dudas — **TAPER D-1 · DENTRO del plan**: sesión mínima solo por la mañana (≤2 h: Anki maduro/vencido + 20Q flagged con esquemas); tarde: permiso + 2 ID + bolsas Ziploc + ruta; nada después de las 17:00 | N5 | 20 |
| — | **jue 4-feb** | **EXAMEN (target v5.14)** | Step 1 · 7 bloques × 40Q · plan de descansos de Alec (`USMLE_TAPER.examen`) · fuera de la ventana 25-29 ene (agendar/reprogramar Prometric; confirmar eligibility period) | — | 280 |

## Reglas de reprogramación

1. **Si se cae un día de contenido, TODO corre +1 día hábil** (mismo corrimiento determinista
   que ENCAPS: cada día sin estudiar = +1; así nació la v5.14: ni el 17 ni el 18-sep se estudiaron y D1
   pasó a lun 21-sep). El orden de subtemas nunca se altera.
2. **Los hitos NO se mueven.** Un simulacro es cita fija: si el contenido se atrasó, el
   simulacro se rinde igual y el contenido sigue corriendo por detrás. El simulacro mide el
   estado real, no el estado ideal. (11 de los 12 hitos conservan su fecha desde la v5.6; lo único que
   cambia es su D#: NBME 25 de D18 → D17 → D16 → D15 → D14 → D13 → D12 → **D10**, Free 120 de D95 → D94 → D93 → D92 → D91 → D90 → D89 → **D87**,
   pero 2-oct y 22-ene son las mismas fechas de siempre.) **Consecuencia v5.14**: el NBME 31 (vie 15-ene) quedó pegado al
   cierre de contenido (D81 jue 14-ene → D82), sin los 2 días de random timed delante (ahora D84 y D86).
   **Excepción única: el UWSA1** sigue al D1 — un hito cuya fecha ya pasó se mueve al nuevo D1 (vie 11-sep →
   lun 14-sep → mar 15-sep → mié 16-sep → jue 17-sep → **lun 21-sep**); los que aún no llegaron, no.
3. **REGLA PERMANENTE (instrucción de Joseph, vigente desde la v5.8): NO se fusiona ni se recorta
   contenido.** Ni un tema ni un subtema queda atrás. El desfase se paga **alargando el plan por la
   cola** (D95 pasó de vie 22-ene → lun 25-ene → mar 26-ene → mié 27-ene → jue 28-ene → vie 29-ene → lun 1-feb → **mié 3-feb**), no
   comprimiendo el cierre de Fase A. La compresión de la v5.7 (4 días de cierre fusionados en 2 días dobles) **queda
   como está** — no se deshace, pero tampoco se repite.
4. El colchón real del plan: la holgura de Fase B y la semana de examen con ventana de 5 días
   (25-29 ene). **Ese colchón se agotó del todo en la v5.11, se rebasó en la v5.12, en la v5.13 el plan ya terminaba en febrero y en
   la v5.14 el NBME 31 quedó pegado al contenido**: D94 cae el **mar 2-feb** y D95 el **mié 3-feb** (D-1 dentro del plan), así que
   **el examen sigue fuera de la ventana: target jue 4-feb-2027** (Prometric: agendar/reprogramar; confirmar que el eligibility
   period cubre el 4-feb o extenderlo; plan B feb-mar, mismo eligibility period — ver gates). La única otra opción es **recortar
   temario (derogar la regla 3)** — decisión de Joseph. A partir de aquí **cada día extra de atraso mueve el examen un día hábil
   más (o exige recortar)**. **Con la v5.14 ya se consumieron 15 días hábiles de colchón desde el 31-ago.**
5. Sábados y domingos NO se estudia (régimen 31-ago; sostenibilidad > volumen). El sáb 30 y el dom 31-ene quedan entre D92
   (AMBOSS mitad 1) y D93 (AMBOSS mitad 2): solo Anki vencido.
6. **REGLA de burnout (12-sep, tarde; divergencia Palmerton #29 → §E-7).** Si **2 hitos consecutivos con
   mínimo** quedan **bajo su mínimo on-track** (UWSA1/UWSA2 no cuentan) **y** hay síntomas (releer sin
   comprender, irritabilidad, indiferencia, descansos de 5 min que se vuelven de 1 h) → **3-5 días con SOLO
   Anki AM (30-45 min de tarjetas viejas) + sueño**; frenar QBank y toda adquisición. **Cada día parado = +1
   día hábil (regla 1)**: no se recorta ni se fusiona temario (regla 3) — en v5.14 eso implica mover el examen más allá del
   jue 4-feb. Se reanuda **por el gate del 80%**, no por la fecha; si el siguiente hito vuelve a quedar bajo mínimo →
   plan B de fecha (feb-mar, mismo eligibility period). En la app: `usmleScores.gateHito` → `'ALERTA BURNOUT'` + banner en `UsmleHub`.

## Semana de examen: taper D94 · D95 = D-1 dentro del plan · test day jue 4-feb (Palmerton §8.3-§8.4)

*(Implementado el 12-sep por la tarde — divergencia #22 / §E-5; remapeado el 19-sep a la v5.14. Código: `USMLE_TAPER`,
`DAILY_META.examenTarget = '2027-02-04'`, `DAILY_META.descansoD1 = '2027-02-03'` en `usmleStep1Daily.ts`; los D94/D95 llevan
`franjaNota` y chip TAPER en Cola de hoy; D95 = D-1 muestra el ritual y el test day; Readiness → tarjeta "Taper y semana de examen".)*

| Día | Fecha | Protocolo | Q |
|-----|-------|-----------|---|
| desde D82 (NBME 31) | vie 15-ene | **Cese de lo nuevo**: cero preguntas nuevas, cero tarjetas nuevas; solo incorrects/flagged + AMBOSS 200 como repaso de lo ya visto; no repetir NBME ya hechos | — |
| **sáb 30 · dom 31** | sáb 30 / dom 31-ene | **Libres** (entre D92 y D93): sin banco; solo Anki vencido | — |
| **D93** | **lun 1-feb** | Último día de banco alojado en el sprint: uWorld incorrects + AMBOSS 200 Concepts (mitad 2) | 80 |
| **D94 · D-2 (última sesión de banco)** | **mar 2-feb** | Solo Anki **maduro** + 20Q flagged/incorrects ya vistos (sin bloque timed, sin AMBOSS) · repaso First Aid de esquemas (sistemas 6-10) · dormir ≥7 h ya desde hoy | 20 |
| **D95 · D-1 (dentro del plan)** | **mié 3-feb** | **Sesión MÍNIMA solo por la mañana (≤2 h)** (`USMLE_TAPER.d95`/`.dMenos1`): Anki maduro/vencido + 20Q flagged con los mejores esquemas e imágenes · rapid review FA · cero preguntas nuevas, cero tarjetas nuevas, ningún bloque timed · PROHIBIDO temas densos y abrir First Aid "para ver cuánto sé" · **tarde: permiso impreso + digital, 2 ID con el nombre EXACTO, bolsas Ziploc numeradas, ruta al Prometric** · nada después de las 17:00 (journaling, ejercicio suave, visualización, cena con proteína) · somnífero nunca por primera vez · dormir ≥7-8 h | 20 |
| **EXAMEN** | **jue 4-feb** | Desayuno proteína + grasa (sin carbohidratos simples), el café de siempre · tutorial: auriculares y terminar (+15 min de descanso) · bloques 1-2 → 10 min · 3-4 → 10 min · 5 → almuerzo 20-30 min · 6 → 10 min · 7 · entre bloques las 40Q dejan de existir (nunca revisar ni abrir FA en el casillero) · nunca salir a mitad de bloque · post-test: premiarse | 280 |

Las franjas del Calendar no cambian en D94 (05:00 Anki · 07:15 · 11:00 siguen en pie); cambia el **volumen** (20Q) y el
**contenido** (nada nuevo). El D-1 (D95, mié 3-feb) es un día del plan con sesión mínima solo por la mañana
— RESUELTO (19-sep, noche): las 6 series USMLE L-V originales terminan con `UNTIL=20270130`, pero D93-D95 (lun 1 → mié 3-feb) ya están
cubiertos por 6 SERIES DE EXTENSIÓN creadas el 19-sep (ANKI AM 05:00 `gfapfa25hm5d9s65n7oiu0jsms` · repaso 07:15 `vi7lrsm2blitpqistrt87i3sqk` · pre-test 08:15 `mlqvrm4m8bn38qfl37qddjgk5g` (evento suelto, solo lun 1-feb) · DEEP PRIME `39dm9gk3a58u3iqu9lk28noum0` · 30Q `u6alh9h3o43l2fu98gmvkvtk90` · eval 18:00 `r850pocdgcm8pi6a42cvv37v1k` (MO,TU)); el overlay del examen está en el jue 4-feb 07:00-16:00 y hay overlays propios del D94 `neboplchsaua4snj39nrl480nc` (mar 2-feb) y del D95 = D-1 `n90bdqhohadu1eqbctv148dn28` (mié 3-feb). ENCAPS 16:15 no se extiende (termina el vie 29-ene por diseño). Lo que sigue A VERIFICAR (12-sep): repasos 200-300/día en el cierre (cifra del studio guide) y
el costo del Free 120 en el Prometric de Lima ($155 internacional según el cuaderno). **Decisión pendiente de Joseph (19-sep)**:
rendir el **jue 4-feb** (agendar/reprogramar Prometric + confirmar eligibility period) o **recortar temario** para volver atrás.

## Gates y logística (evidencia macro:calendario-5-meses)

**Estado 2026 del examen** (USMLE Bulletin 2026-27): pass/fail; aprobar exige ~60% de aciertos;
máximo 4 intentos por Step (máx 3 en 12 meses); **un fail queda PARA SIEMPRE en el transcript
ECFMG** — ~1/3 de program directors nunca consideran un aplicante con fail en Step 1. La meta
del IMG es aprobar A LA PRIMERA con margen; la nota que sí puntúa para el Match es **Step 2 CK**
(78-97% de PDs le dan más peso; correlación Step1→CK ≈ 0,75; Palmerton: solapamiento de
material 80-90% — Step 1 es "la gramática de la medicina clínica"). Step 1 = fundación de CK.

**Readiness (criterios convergentes)**:
- Diseño v5.x (decidido): **2 NBME consecutivos ≥68% + UWSA2 "low risk"** → GO.
- Palmerton (catálogo completo): NUNCA sentarse con NBME <65% (65% ≈ 95% de prob. de aprobar;
  70% ≈ 99%); progreso realista ≈ **+5% de NBME por mes** de estudio eficiente; el score real
  rara vez se desvía 5-10 puntos de los últimos dos NBMEs. Mínimos on-track por hito:
  [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) Parte V.
- Shemmassian: ≥65% EPC en dos NBMEs consecutivos antes de agendar; >68% en la última semana; qbank sostenido >60%.
- Free 120 actual la última semana con ≥70% (heurística comunitaria) — en v5.14 es **D87
  (vie 22-ene-2027, misma fecha que en v5.7 → v5.13; D-13 del examen; abre la Fase C)**, idealmente rendido en el MISMO Prometric del
  examen (Palmerton: *familiarity breeds calm*).

**Logística ECFMG/Prometric** (empezar en AGOSTO, no después):
- Abrir cuenta ECFMG + verificación de credenciales con la universidad peruana YA (tarda semanas).
- El eligibility period (~3 meses) se elige al aplicar; hay UNA extensión contigua pagada.
  **Aplicar recién cuando la data NBME lo respalde** (gate de fines de noviembre), eligiendo
  período ene-mar 2027 → si hay que correr a feb-mar, es el MISMO período, sin costo.
  🔴 **v5.14: confirmar que el eligibility period elegido CUBRE el jue 4-feb-2027** (el target ya no está en enero); si el
  período aplicado terminara antes, usar la extensión contigua o elegir feb-abr al aplicar.
- Prometric se agenda máximo 6 meses antes; reprogramar dentro de los 45 días previos cuesta fee.
  **Agendar el JUE 4-FEB-2027** (target v5.14), no el mar 2-feb (que ahora es el D94, última sesión de banco) ni el mié 3-feb (D95 = D-1).
  Si ya estaba agendado el 29-ene, el 1-feb o el 2-feb, **reprogramar** (con fee si se hace dentro de los 45 días previos → hacerlo YA, en
  septiembre-octubre). Cada corrimiento adicional obliga a reprogramar otro día hábil más (o a recortar temario).
- Gate 1 (~30-nov, tras NBME 27 D40 y antes de NBME 28 D55): tendencia positiva y ≥55% → aplicar
  eligibility period (que cubra el 4-feb) y agendar Prometric Lima para el jue 4-feb.
- Gate 2 (**vie 18-dic, NBME 29 = D65**): <60% EPC → mover target a feb-mar dentro del mismo período.
- GO/NO-GO final: **NBME 31 (D82, vie 15-ene-2027, el día siguiente al cierre de contenido)** + **UWSA2 (D77, vie 8-ene-2027)** según el criterio vigente.

**Matemática de horas**: v5.14 = 95 días × 6h15 ≈ **594h** (bloque de mañana 5h30 ≈ 523h +
eval de 18:00 ≈ 71h). **Igual que en v5.7 → v5.13**: como esta vez tampoco se recortó contenido sino
que se alargó el plan, los 95 días siguen siendo 95 (D94-D95 son de sesión ligera/mínima por diseño del taper). La referencia
IMG-base-cero es 600-1.000h; el plan queda algo por debajo del punto medio — proteger las franjas es lo que mantiene viable enero¹.

**Errores típicos de IMG que este calendario existe para evitar**: sentarse sin ≥65-68% en dos
NBMEs · posponer sin gates objetivos (o al revés: "solo necesito pasar" y recortar esquinas) ·
acumular recursos fuera del stack cerrado · primera pasada pasiva sin preguntas · memorizar
sin mecanismo · deuda de Anki por mazos gigantes · simulacros en condiciones de confort (el
IMG que pasó sus NBMEs en casa y falló en Prometric) · sacrificar sueño (señal de timeline
corto) · tramitar ECFMG tarde · olvidar que la meta estratégica real es Step 2 CK.

**Fuentes**:
[USMLE Bulletin — Scoring](https://www.usmle.org/bulletin-information/scoring-and-score-reporting) ·
[USMLE Bulletin — Eligibility](https://www.usmle.org/bulletin-information/eligibility) ·
[USMLE Bulletin — Applying & Scheduling](https://www.usmle.org/bulletin-information/applying-scheduling) ·
[NBME CBSSA](https://www.nbme.org/examinees/self-assessments/comprehensive-basic-science-self-assessment) ·
[ECFMG Certification](https://www.ecfmg.org/certification/) ·
[Yousmle — Study Schedule](https://www.yousmle.com/step-1-study-schedule/) ·
[Yousmle — Reportes pass/fail NBME](https://www.yousmle.com/how-to-read-the-new-pass-fail-step-1-and-nbme-self-assessment-performance-reports/) ·
[Yousmle — Ready or Delay](https://www.yousmle.com/ready-delay-usmle/) ·
[Yousmle — Timeline Too Short](https://www.yousmle.com/usmle-timeline-too-short/) ·
[Yousmle — UWorld Q/día](https://www.yousmle.com/how-many-uworld-questions-in-a-day/) ·
[Yousmle — Pass/fail para IMGs](https://www.yousmle.com/step-1-pass-fail-imgs/) ·
[Yousmle — Free NBME cadencia](https://www.yousmle.com/free-nbme-self-assessments/) ·
[Yousmle — Pass/fail study plan (CK 0,75)](https://www.yousmle.com/step-1-pass-fail-study-plan/) ·
[Shemmassian — Step 1 Study Schedule](https://www.shemmassianconsulting.com/blog/usmle-step-1-study-schedule) ·
Cuaderno NotebookLM "STEP 1 · Palmerton Engine" (~140 fuentes):
[notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86](https://notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86)

---

### Nota de divergencia

¹ El agente macro:calendario-5-meses asumió el diseño ANTERIOR (3-3,25h/día ≈ 355h) y por eso
recomendó: primer NBME "real" recién tras 6-8 semanas, cadencia de 5 CBSSA, y gates más
conservadores. El diseño v5.x decidido (6h15/día, bloque principal) permite UWSA1 en S1 como
baseline y 7 hitos en Fase A. Se respeta el diseño; del agente se conservan: los gates
ECFMG/eligibility, el criterio de readiness convergente, y la regla de oro "nunca sentarse sin
la data". Su advertencia sigue viva: si las franjas de la mañana se erosionan y el plan cae a
~3h/día efectivas, volver a su esquema (menos hitos, fecha feb-mar).
