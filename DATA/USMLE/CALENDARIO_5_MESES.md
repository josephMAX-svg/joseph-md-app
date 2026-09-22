# CALENDARIO 5 MESES — USMLE Step 1 v5.15 (S1 semana del 21-sep-2026 → S20 semana del 1-feb-2027 · examen LUN 8-FEB-2027)

Plan semana a semana derivado de [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) **v5.15**
(fuente de verdad: **D1 = MIÉ 23-SEP-2026 → D95 = VIE 5-FEB-2027, 95 días**; del 31-ago al 22-sep
no se estudió: 17 hábiles perdidos) + evidencia del agente macro:calendario-5-meses (USMLE Bulletin 2026-27, NBME,
ECFMG, Yousmle, Shemmassian). L-V únicamente; **sáb y dom LIBRES**; **skip 25-dic, 31-dic, 1-ene**.
Fases: **A contenido D1-D81 · B banco D82-D86 · C sprint D87-D95** (`faseDe`).
**Examen: el plan rebasa la ventana 25-29 ene 2027 (D94 = jue 4-feb = D-2, última sesión de banco; D95 = vie 5-feb = D-1
DENTRO del plan) → target LUN 8-FEB-2027, FUERA de la ventana**; sáb 6 y dom 7-feb = libres (solo Anki vencido) entre el
D95 y el examen; el D-1 (vie 5-feb) es sesión mínima por la mañana + ritual de test-day.

> **v5.14 → v5.15 (22-sep-2026) · CORRIMIENTO RÍGIDO**: ni el lunes 21 ni el martes 22 de septiembre se estudiaron → D1
> corrió de lun 21-sep a **mié 23-sep** (+2 días hábiles; decimocuarto corrimiento desde el 31-ago). **Regla NUEVA de
> Joseph: el corrimiento es RÍGIDO** — se desplaza el plan ENTERO (contenido **y** los 12 hitos) en bloque, **no se toca
> ningún tema** y, donde un plan tenía un final clavado, **se AMPLÍAN días** en vez de perder sesiones. Sigue vigente la
> regla permanente: **no se fusiona ni se recorta NADA**; el temario sale 1:1 y el desfase se absorbe **alargando el final
> del plan** (D95 pasa de mié 3-feb a **vie 5-feb-2027**). Contenido verificado: el multiset de temas vs la v5.14 da
> **dif 0** (95 días, 5560Q).
>
> 🆕 **Los hitos ya NO están anclados por fecha.** Hasta la v5.14, los 11 NBME/UWSA conservaban su fecha y solo cambiaba
> su D#, de modo que **cada corrimiento les robaba días de contenido por delante** (así el NBME 31 acabó pegado al cierre
> de temario). Desde la v5.15 **corren con el plan y conservan su D# exacto**: ningún NBME vuelve a perder preparación.
> ⚠ Efecto colateral: **los hitos dejan de caer en viernes** — NBME 25, 26, 27, 28, 29, 30, UWSA2, NBME 31 y el Free 120
> pasan a **martes**; el NBME 32 a miércoles y el NBME 33 a viernes. A cambio, los viernes quedan libres para bloques de
> nivel 3/4 (**5 viernes N3 + 2 viernes N4**, uno más que en la v5.14).
>
> **El UWSA1 sigue moviéndose con el D1** (vie 11 → lun 14 → mar 15 → mié 16 → jue 17 → lun 21-sep → **mié 23-sep = D1**:
> baseline el primer día, como prescribe Palmerton). El **primer día de CONTENIDO es el jue 24-sep = D2**. Con el D1 en
> miércoles, **S1 = 23-25 sep (3 días)** y de S2 en adelante las semanas del plan (`semanaDe`) vuelven a ser semanas de
> calendario completas … **S20 = 1-5 feb** (20 semanas; sigue sin haber S21). Los 2 días dobles de Bioquímica vienen de la
> v5.7, conservan todos sus temas y quedan **juntos después del UWSA2** (D77 mar 12-ene = UWSA2 dentro de la Fase A ·
> D78-D79 Psiquiatría/Biostats · D80 vie 15-ene · D81 lun 18-ene = cierre de Fase A); **no se creó ningún día doble nuevo**.
>
> 🔴 **Herencia de la v5.14 que el corrimiento rígido conserva tal cual**: el NBME 31 GO/NO-GO (D82, **mar 19-ene**) cae el
> día siguiente al cierre de contenido (D81, lun 18-ene), sin días de banco de consolidación delante. Los 2 random timed
> que lo precedían siguen en **D84 (jue 21-ene) y D86 (lun 25-ene)**, intercalados con NBME 32 (D83, mié 20) y NBME 33
> (D85, vie 22): la **Fase B es D82-D86** y la **Fase C arranca con el Free 120 (D87, mar 26-ene)**. **S19 = 25-29 ene
> (D86-D90)** y **S20 = 1-5 feb (D91-D93 banco · D94 taper D-2 · D95 taper D-1)**.
>
> 🔴 **Target de examen LUN 8-FEB-2027 (fuera de la ventana 25-29 ene)**: `DAILY_META.examenTarget = '2027-02-08'`,
> `descansoD1 = '2027-02-05'`, `examenVentana` marcada como superada. D94 (jue 4-feb) = **D-2, última sesión de banco**
> (`USMLE_TAPER.d94`: 20Q flagged + Anki maduro, nada nuevo); **D95 (vie 5-feb) = D-1 DENTRO del plan** (`USMLE_TAPER.d95`/`.dMenos1`:
> sesión mínima ≤2 h por la mañana + ritual de test-day; nada después de las 17:00); **sáb 6 y dom 7-feb libres** (solo Anki
> vencido, y repetir el ritual el domingo por la tarde) entre el D95 y el examen. **Joseph debe agendar/reprogramar el
> Prometric para el lun 8-feb y confirmar que su eligibility period cubre esa fecha** (si no: extenderlo); la alternativa es
> **recortar temario** para volver atrás (decisión suya, §E-5 de DIVERGENCIAS). ⚠ **Desde hoy, cada día no estudiado mueve
> el examen un día hábil más (o exige recortar temario).**

| Sem | Lunes | Contenido (L-V) | Hito |
|-----|-------|-----------------|------|
| S1 | 21-sep | **Fundamentos** D2 · D3 (jue-vie) | **UWSA1** (D1, mié 23-sep) |
| S2 | 28-sep | **Immunology** D4 · D5 (lun-mar) · **Cardiovascular** D6-D8 (mié-vie) | — |
| S3 | 5-oct | **Cardiovascular** D9 (lun) · D11-D13 (mié-vie) | **NBME 25** (D10, mar 6-oct) |
| S4 | 12-oct | **Cardiovascular** D14-D16 (lun-mié) · **Respiratory** D17 · D18 (jue-vie) | — |
| S5 | 19-oct | **Respiratory** D19-D22 (lun-jue) · **Renal** D23 (vie) | — |
| S6 | 26-oct | **Renal** D24 (lun) · D26-D28 (mié-vie) | **NBME 26** (D25, mar 27-oct) |
| S7 | 2-nov | **Renal** D29 (lun) · **Gastrointestinal** D30-D33 (mar-vie) | — |
| S8 | 9-nov | **Gastrointestinal** D34-D36 (lun-mié) · **Endocrine** D37 · D38 (jue-vie) | — |
| S9 | 16-nov | **Endocrine** D39 (lun) · D41 · D42 (mié-jue) · **Nervous System** D43 (vie) | **NBME 27** (D40, mar 17-nov) |
| S10 | 23-nov | **Nervous System** D44-D48 (lun-vie) | — |
| S11 | 30-nov | **Nervous System** D49 · D50 (lun-mar) · **Hematology & Oncology** D51-D53 (mié-vie) | — |
| S12 | 7-dic | **Hematology & Oncology** D54 (lun) · D56 · D57 (mié-jue) · **Microbiology / ID** D58 (vie) | **NBME 28** (D55, mar 8-dic) |
| S13 | 14-dic | **Microbiology / ID** D59-D63 (lun-vie) | — |
| S14 | 21-dic | **Microbiology / ID** D64 (lun) · **Reproductive** D66 · D67 (mié-jue) | **NBME 29** (D65, mar 22-dic) |
| S15 | 28-dic | **Reproductive** D68-D70 (lun-mié) | — |
| S16 | 4-ene | **Musculoskeletal / Rheum** D71 (lun) · D73 · D74 (mié-jue) · **Psychiatry & Behavioral** D75 (vie) | **NBME 30** (D72, mar 5-ene) |
| S17 | 11-ene | **Psychiatry & Behavioral** D76 (lun) · D78 · D79 (mié-jue) · **Biochemistry** D80 (vie) | **UWSA2** (D77, mar 12-ene) |
| S18 | 18-ene | **Biochemistry** D81 (lun, cierre de contenido) · **Banco intensivo** D84 (jue) | **NBME 31** (D82, mar 19-ene) · **NBME 32** (D83, mié 20-ene) · **NBME 33** (D85, vie 22-ene) |
| S19 | 25-ene | **Banco intensivo** D86 (lun) · D88-D90 (mié-vie) | **FREE 120 oficial** (D87, mar 26-ene) |
| S20 | 1-feb | **Banco intensivo** D91-D93 (lun-mié) · **Sprint final** D94 · D95 (jue-vie) = **TAPER** (D94 jue 4-feb = D-2, última sesión de banco · D95 vie 5-feb = D-1 DENTRO del plan: sesión mínima AM + ritual) → **sáb 6 / dom 7-feb libres → LUN 8-FEB EXAMEN (target)** | — |

Fines de semana: **todos los sábados y domingos del plan están libres** (régimen 31-ago:
sostenibilidad > volumen). Únicos días hábiles saltados: **vie 25-dic-2026 (S14), jue 31-dic-2026
y vie 1-ene-2027 (S15)** — por eso S14 tiene 4 días y S15 solo 3. **S1 tiene 3 días** (D1 mié 23-sep = UWSA1 ·
D2-D3 contenido; el corrimiento rígido dejó el arranque a mitad de semana), **S19 tiene 5 días** (D86 lun 25-ene …
D90 vie 29-ene) y **S20 tiene 5 días** (D91 lun 1-feb … D95 vie 5-feb). Semana de examen: lun 1-feb = D91 y mar 2-feb =
D92 (incorrects + AMBOSS mitad 1) · mié 3-feb = D93 (AMBOSS mitad 2) · **jue 4-feb = D94 (D-2, última sesión de banco)** ·
**vie 5-feb = D95 = D-1 (sesión mínima + ritual)** · **sáb 6 y dom 7-feb libres** · **lun 8-feb examen (target)**.

Desde Fase B (S18, mar 19-ene, D82 = NBME 31): al ANKI AM de las 05:00 se le suma el **STRESS SET diario 10Q/12min**
(Palmerton: últimas 2-3 semanas, ≥60% de contenido cubierto — entrena el primer instinto). El UWSA2 (mar 12-ene, D77)
cae todavía en la Fase A.

## Hitos en su semana (v5.15: los 12 corren CON el plan · D# intacto · fechas nuevas)

| # | Hito | Sem | Día | Fecha | Q |
|---|------|-----|-----|-------|---|
| 1 | **UWSA1** | S1 | **D1** | mié 23-sep-2026 | 160 |
| 2 | **NBME 25** | S3 | D10 | mar 6-oct-2026 | 200 |
| 3 | **NBME 26** | S6 | D25 | mar 27-oct-2026 | 200 |
| 4 | **NBME 27** | S9 | D40 | mar 17-nov-2026 | 200 |
| 5 | **NBME 28** | S12 | D55 | mar 8-dic-2026 | 200 |
| 6 | **NBME 29** | S14 | D65 | mar 22-dic-2026 | 200 |
| 7 | **NBME 30** | S16 | D72 | mar 5-ene-2027 | 200 |
| 8 | **UWSA2** | S17 | D77 | mar 12-ene-2027 | 160 |
| 9 | **NBME 31** | S18 | D82 | mar 19-ene-2027 | 200 |
| 10 | **NBME 32** | S18 | D83 | mié 20-ene-2027 | 200 |
| 11 | **NBME 33** | S18 | D85 | vie 22-ene-2027 | 200 |
| 12 | **FREE 120 oficial** | S19 | D87 | mar 26-ene-2027 | 120 |

Los 12 hitos suman **2240Q** de simulacro. Con el corrimiento rígido **ya no caen en viernes**: 9 en **martes**
(NBME 25-30, UWSA2, NBME 31 y Free 120), 2 en miércoles (**UWSA1**, D1: baseline el primer día del plan; y NBME 32) y
1 en viernes (NBME 33, D85). El **NBME 30 (D72, mar 5-ene)** ya no depende de los skips de fin de año: corre con el plan
como los demás. El Free 120 (mar 26-ene) queda a **D-13 del examen** (lun 8-feb) y abre la Fase C. **El NBME 31
(mar 19-ene, D82) sigue siendo el día siguiente al cierre de contenido (D81, lun 18-ene)**: no hay banco de consolidación
delante del GO/NO-GO (herencia de la v5.14 que el corrimiento rígido conserva, porque los hitos mantienen su D#).

## 5 niveles UWorld por fase (Palmerton v3)

Cada día de `DIAS` lleva `nivelUW` (1-5) y `qDia` (Q uWorld objetivo). Regla madre: **no se sube de nivel sin ≥80% en 10Q
consecutivas del nivel actual (≤24-48 h)**; si <80% se repite el subtema (bloques de 5Q) y se audita el método. Las HORAS del
bloque no cambian; cambia el FORMATO de la consolidación de las 11:00 según el nivel del día.

| Nivel | Nombre | Formato | Q/día | Umbral para SUBIR | Dónde vive en el día | Fase |
|-------|--------|---------|-------|-------------------|----------------------|------|
| **1** | Subtema · tutor sin tiempo | Bloques de 5Q de UN solo subtema · modo tutor · sin reloj (aprender a leer: CCSN + SAQ + cover-the-options) | Palmerton 20-30Q/día → plan: 30Q (10 pre-test + 20 consolidación) | 80% en 10Q consecutivas del subtema, ≤24-48 h tras estudiarlo | 08:15 PRE-TEST del tema nuevo (siempre) · 11:00 los 2 primeros días de cada sistema | A |
| **2** | Subtema · timed | Bloques de 5Q del subtema · cronometrado (90 s/Q · tope 2 min: adivinar, marcar, avanzar) | Volumen creciente → plan: 40Q (10 + 30) | 80% en ≥3 subtemas distintos, ≥1 validado en <48 h | 11:00 CONSOLIDACIÓN desde el 3er día de cada sistema (subtemas ya validados) · 07:15: 5Q timed del subtema de AYER (1ª mitad del gate de 10Q) | A |
| **3** | Sistema completo · timed | Bloques de 10-20Q de TODO el sistema · timed (sin la "ventaja injusta" de saber el subtema) | Palmerton 40-50Q/día → plan: 40Q (10 pre-test + 20Q sistema + 10 tutor) | 80% en 20Q timed consecutivas del sistema | VIERNES sin NBME/UWSA a las 11:00 **hasta S10** (D8 y D13 Cardio · D28 Renal · D33 GI · D48 Neuro; los viernes D3 Fundamentos, D18 Resp, D23 Renal, D38 Endo y D43 Neuro caen en 1.º-2.º día de sistema y quedan en nivel 1): 20Q del sistema en curso, o del anterior si el sistema lleva <3 días · desde S11 el viernes pasa a nivel 4 | A |
| **4** | Sistemas mixtos · timed | Bloques de 20-30Q mezclando ≥3 sistemas dominados + el nuevo (saltar entre especialidades bajo presión) | Palmerton 50-70Q/día → plan: viernes N4 = 40Q (10 pre-test + 30Q mixtos timed) · Fase B: 2×40Q (80Q) | 80% en bloques mixtos de 20Q timed de ≥3 sistemas | 18:00 EVAL (10Q mixta timed) toda la Fase A como dosis diaria · **VIERNES sin hito desde S11 = 20-30Q mixtos timed a las 11:00 en vez de sistema único: ahora son DOS (D53, vie 4-dic, S11, Heme/Onc · D63, vie 18-dic, S13, Micro), porque con los hitos fuera de los viernes ninguno se los come** (flag `VIERNES_N4_DESDE_SEMANA = 11`, texto en `DIAS[].franjaNota`) · **Fase B D84 · D86 + Fase C D88 · D89** (random timed 2×40Q + sistema débil) | A (dosis diaria + viernes desde S11) → B-C |
| **5** | Mixto completo 40Q · timed | Bloques de 40Q random · timed 60 min (90 s/Q) = simulación exacta del examen | Palmerton 80-100Q/día (máx. 2 bloques de 40) · hitos: UWSA 160Q · NBME 200Q · Free 120 | 80% sostenido (90% para 260+) · pase seguro = NBME ≥65% (≈95%) / ≥70% (≈99%) | 05:00 STRESS SET 10Q/12min (Fases B-C) · **UWSA2 (D77, dentro de la Fase A) + NBME 31 (D82, abre la Fase B) + NBME 32/33 (D83, D85)** y **D90 · D91 · D92 · D93** (incorrects 2ª pasada + AMBOSS 200 mitades 1-2, alojados en el sprint) · Fase C (Free 120 D87 + taper D94-D95) · todos los hitos = formato nivel 5 como MEDICIÓN, no como progresión | B → C (+ todos los hitos) |

**Regla determinista del generador** (no toca sistemas, hitos ni el total de 95 días; en la v5.15 las fechas corren en bloque):
- Fase A: posición del día dentro de su sistema (sin contar Assessment) → **1º-2º día = nivel 1** (30Q = 10 pre-test + 20 consolidación en bloques 5Q tutor) · **viernes sin hito y ≥3º día = nivel 3 hasta S10** (40Q = 10 + 20 sistema completo timed + 10 tutor) · **viernes sin hito y ≥3º día desde S11 = nivel 4** (40Q = 10 pre-test + 20-30Q timed mixtos de sistemas dominados + 10 tutor; flag `VIERNES_N4_DESDE_SEMANA = 11`) · **resto = nivel 2** (40Q = 10 + 30 en bloques 5Q timed).
- Hitos (🎯): formato **nivel 5 como MEDICIÓN** (UWSA 160Q · NBME 200Q · Free 120 = 120Q), no como progresión.
- Fase A cierra con **D77 = UWSA2** (nivel 5, mar 12-ene), **D78-D79 = Psicofármacos / Biostats** (nivel 2), **D80 = Bioquímica día doble 1** (nivel 1, vie 15-ene) y **D81 = Bioquímica día doble 2** (nivel 1, lun 18-ene).
- Fase B (D82-D86): **D82 = NBME 31** (nivel 5 como medición, abre la fase el día siguiente al cierre de contenido) · **D83 = NBME 32** y **D85 = NBME 33** (nivel 5) · **D84 y D86 nivel 4** (2×40Q mixtos timed = 80Q, sistema débil #1).
- Fase C (D87-D95): **nivel 5** salvo **D88 (mié 27-ene) y D89 (jue 28-ene), nivel 4** (random timed + sistema débil #2 / Mehlman); **D90 (vie 29-ene), D91 (lun 1-feb), D92 (mar 2-feb) y D93 (mié 3-feb) siguen siendo días de banco** (incorrects 2ª pasada · AMBOSS 200 mitad 1 · mitad 2, 80Q cada uno) y los días sin simulacro son **taper** (`TAPER_ACTIVO`, 12-sep tarde): solo flagged/incorrects ya vistos + Anki maduro, cero preguntas y cero tarjetas nuevas (**D94 = 20Q · D95 = 20Q**).
- **La clasificación no depende de umbrales de FECHA** sino del **origen de la fila** (`bbCh` = `Banco` / `Sprint`): así la regla queda idéntica aunque el contenido se derrame hasta el 18-ene.
- La eval de las 18:00 (10Q mixta timed) es la **dosis diaria de nivel 4** durante toda la Fase A; los stress sets 10Q/12min (nivel 5) solo en Fases B-C a las 05:00.

### Distribución real recontada desde `DIAS` (v5.15 · 95 días)

| Fase | Días | Niveles | Q objetivo (`qDia`) |
|------|------|---------|------------------------|
| **A** · D1-D81 | 81 | N1×28 · N2×38 · N3×5 · N4×2 · N5×8 | 4160 |
| **B** · D82-D86 | 5 | N4×2 · N5×3 | 760 |
| **C** · D87-D95 | 9 | N4×2 · N5×7 | 640 |
| **Total** | **95** | **N1×28 · N2×38 · N3×5 · N4×6 · N5×18** | **5560** |

Desglose: **3320Q de trabajo diario** (83 días) + **2240Q de simulacros**
(9×200Q NBME + 2×160Q UWSA + 1×120Q Free 120). El total **5560Q es idéntico al de la v5.14**: el corrimiento rígido
no toca volumen ni contenido (el multiconjunto sistema/subtema es el mismo, verificado con `node` por `(system, sub)`: 95/95 biyectivo, dif 0).
Viernes de Fase A sin hito (**15**, cinco más que en la v5.14 porque los hitos dejaron los viernes): D3 (25-sep) Fundamentos **N1** · D8 (2-oct) Cardiovascular **N3** · D13 (9-oct) Cardiovascular **N3** · D18 (16-oct) Respiratory **N1** · D23 (23-oct) Renal **N1** · D28 (30-oct) Renal **N3** · D33 (6-nov) Gastrointestinal **N3** · D38 (13-nov) Endocrine **N1** · D43 (20-nov) Nervous System **N1** · D48 (27-nov) Nervous System **N3** · D53 (4-dic) Hematology & Oncology **N4** · D58 (11-dic) Microbiology / ID **N1** · D63 (18-dic) Microbiology / ID **N4** · D75 (8-ene) Psychiatry & Behavioral **N1** · D80 (15-ene) Biochemistry **N1**.
Los que quedan en **N1** lo hacen porque su sistema lleva <3 días: ese viernes el bloque
de sistema completo timed se hace del sistema **anterior**. Cambio de niveles de la v5.14 → v5.15: al
correr todo +2 días hábiles el viernes de cada sistema vuelve a caer en otro subtema, y como **los hitos ya no ocupan
viernes** aparece un segundo viernes de nivel 4 (D53 Heme, S11, además de D63 Micro, S13). Totales: **N2×39 → N2×38**,
**N4×5 → N4×6**, N3×5 y N1×28 sin cambio. De los **18 viernes** del plan solo **uno es hito** (NBME 33, D85 vie 22-ene);
los otros dos fuera de Fase A son el D90 (vie 29-ene, banco) y el D95 (vie 5-feb, taper D-1).

### Nivel por día y semana (generado desde `DIAS`)

| Sem | Lunes | Niveles L-V (🎯 = hito) | Q objetivo/día |
|-----|-------|--------------------------|----------------|
| S1 | 21-sep | mié N5🎯 · jue N1 · vie N1 | 160/30/30 |
| S2 | 28-sep | lun N1 · mar N1 · mié N1 · jue N1 · vie N3 | 30/30/30/30/40 |
| S3 | 5-oct | lun N2 · mar N5🎯 · mié N2 · jue N2 · vie N3 | 40/200/40/40/40 |
| S4 | 12-oct | lun N2 · mar N2 · mié N2 · jue N1 · vie N1 | 40/40/40/30/30 |
| S5 | 19-oct | lun N2 · mar N2 · mié N2 · jue N2 · vie N1 | 40/40/40/40/30 |
| S6 | 26-oct | lun N1 · mar N5🎯 · mié N2 · jue N2 · vie N3 | 30/200/40/40/40 |
| S7 | 2-nov | lun N2 · mar N1 · mié N1 · jue N2 · vie N3 | 40/30/30/40/40 |
| S8 | 9-nov | lun N2 · mar N2 · mié N2 · jue N1 · vie N1 | 40/40/40/30/30 |
| S9 | 16-nov | lun N2 · mar N5🎯 · mié N2 · jue N2 · vie N1 | 40/200/40/40/30 |
| S10 | 23-nov | lun N1 · mar N2 · mié N2 · jue N2 · vie N3 | 30/40/40/40/40 |
| S11 | 30-nov | lun N2 · mar N2 · mié N1 · jue N1 · **vie N4** (viernes N4: mixto de sistemas dominados) | 40/40/30/30/40 |
| S12 | 7-dic | lun N2 · mar N5🎯 · mié N2 · jue N2 · vie N1 | 40/200/40/40/30 |
| S13 | 14-dic | lun N1 · mar N2 · mié N2 · jue N2 · **vie N4** (viernes N4: mixto de sistemas dominados) | 30/40/40/40/40 |
| S14 | 21-dic | lun N2 · mar N5🎯 · mié N1 · jue N1 | 40/200/30/30 |
| S15 | 28-dic | lun N2 · mar N2 · mié N2 | 40/40/40 |
| S16 | 4-ene | lun N1 · mar N5🎯 · mié N1 · jue N2 · vie N1 | 30/200/30/40/30 |
| S17 | 11-ene | lun N1 · mar N5🎯 · mié N2 · jue N2 · vie N1 | 30/160/40/40/30 |
| S18 | 18-ene | lun N1 · mar N5🎯 · mié N5🎯 · jue N4 · vie N5🎯 | 30/200/200/80/200 |
| S19 | 25-ene | lun N4 · mar N5🎯 · mié N4 · jue N4 · vie N5 | 80/120/80/80/80 |
| S20 | 1-feb | lun N5 · mar N5 · mié N5 · jue N5 (taper **D-2, última sesión de banco**) · vie N5 (taper **D-1 dentro del plan**: sesión mínima AM + ritual) → sáb 6 / dom 7-feb libres → **lun 8-feb EXAMEN** | 80/80/80/20/20 |

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
| D1 | mié 23-sep | Assessment | 🎯 UWSA1 — BASELINE (160Q, 09:00-13:00) + revisión completa por la tarde | N5 (hito) | 160 |
| D2 | jue 24-sep | Fundamentos | Pathoma 1-2: lesión celular + muerte celular + inflamación | N1 | 30 |
| D3 | vie 25-sep | Fundamentos | Pathoma 3: neoplasia (principios + carcinogénesis) · setup Anki FSRS | N1 | 30 |
| D4 | lun 28-sep | Immunology | Inmunidad innata/adaptativa + MHC + linfocitos T/B | N1 | 30 |
| D5 | mar 29-sep | Immunology | Hipersensibilidades I-IV + autoinmunidad + inmunodeficiencias | N1 | 30 |
| D6 | mié 30-sep | Cardiovascular | Anatomía + fisiología cardíaca (GC, presiones, ciclos) | N1 | 30 |
| D7 | jue 1-oct | Cardiovascular | Hemodinámica + regulación de PA + HTA | N1 | 30 |
| D8 | vie 2-oct | Cardiovascular | Curvas: PV loops, Wiggers, Starling | N3 | 40 |
| D9 | lun 5-oct | Cardiovascular | Electrofisiología: potenciales + ECG + bloqueos | N2 | 40 |
| D10 | mar 6-oct | Assessment | 🎯 NBME 25 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D11 | mié 7-oct | Cardiovascular | Taquiarritmias clínicas (FA, TSV, WPW, TV) | N2 | 40 |
| D12 | jue 8-oct | Cardiovascular | Antiarrítmicos + fármacos autonómicos CV | N2 | 40 |
| D13 | vie 9-oct | Cardiovascular | Aterosclerosis + isquemia + angina | N3 | 40 |
| D14 | lun 12-oct | Cardiovascular | SCA: STEMI/NSTEMI/inestable + manejo + complicaciones IAM | N2 | 40 |
| D15 | mar 13-oct | Cardiovascular | Insuficiencia cardíaca + shock + fármacos IC | N2 | 40 |
| D16 | mié 14-oct | Cardiovascular | Valvulopatías + soplos + endocarditis · miocardiopatías + pericardio + congénitas | N2 | 40 |
| D17 | jue 15-oct | Respiratory | Fisiología pulmonar: volúmenes + compliance + hemoglobina | N1 | 30 |
| D18 | vie 16-oct | Respiratory | V/Q + gradiente A-a + hipoxemia/hipoxia | N1 | 30 |
| D19 | lun 19-oct | Respiratory | Obstructivas: asma + EPOC + PFTs + broncodilatadores | N2 | 40 |
| D20 | mar 20-oct | Respiratory | Restrictivas + intersticiales + ocupacionales | N2 | 40 |
| D21 | mié 21-oct | Respiratory | Neumonía + TBC + absceso | N2 | 40 |
| D22 | jue 22-oct | Respiratory | TEP/TVP + HTP + ARDS + cáncer de pulmón | N2 | 40 |
| D23 | vie 23-oct | Renal | Nefrona + filtración + clearance + FG | N1 | 30 |
| D24 | lun 26-oct | Renal | Transporte tubular + diuréticos (sitio de acción) | N1 | 30 |
| D25 | mar 27-oct | Assessment | 🎯 NBME 26 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D26 | mié 28-oct | Renal | Electrolitos completos: Na/agua + SIADH/DI + K + Ca + P | N2 | 40 |
| D27 | jue 29-oct | Renal | Ácido-base paso a paso + compensaciones + GAP | N2 | 40 |
| D28 | vie 30-oct | Renal | Glomerulares: nefrítico vs nefrótico (patrones) | N3 | 40 |
| D29 | lun 2-nov | Renal | AKI (pre/intra/post) + ERC + litiasis + poliquistosis | N2 | 40 |
| D30 | mar 3-nov | Gastrointestinal | Fisiología GI: secreciones + hormonas + motilidad | N1 | 30 |
| D31 | mié 4-nov | Gastrointestinal | Esófago + estómago: ERGE, acalasia, úlcera, H. pylori, Ca | N1 | 30 |
| D32 | jue 5-nov | Gastrointestinal | Intestino delgado: malabsorción + celiaquía + EII | N2 | 40 |
| D33 | vie 6-nov | Gastrointestinal | Colon: pólipos + CCR (vías) + diverticular + isquemia | N3 | 40 |
| D34 | lun 9-nov | Gastrointestinal | Hígado I: LFTs + bilirrubina/ictericias + hepatitis | N2 | 40 |
| D35 | mar 10-nov | Gastrointestinal | Hígado II: cirrosis + complicaciones + HCC + hereditarias | N2 | 40 |
| D36 | mié 11-nov | Gastrointestinal | Biliar + páncreas: litiasis, colecistitis, pancreatitis, Ca | N2 | 40 |
| D37 | jue 12-nov | Endocrine | Ejes hipotálamo-hipófisis + feedback (1º vs 2º vs 3º) | N1 | 30 |
| D38 | vie 13-nov | Endocrine | Tiroides: síntesis + hiper/hipo + tiroiditis + Ca | N1 | 30 |
| D39 | lun 16-nov | Endocrine | Suprarrenal: Cushing / Addison / CAH / feocromocitoma | N2 | 40 |
| D40 | mar 17-nov | Assessment | 🎯 NBME 27 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D41 | mié 18-nov | Endocrine | DM 1 y 2: fisiopatología + DKA/HHS + tratamiento (insulinas, ADO, GLP-1/SGLT2) | N2 | 40 |
| D42 | jue 19-nov | Endocrine | Calcio/PTH + MEN + patología hipofisaria | N2 | 40 |
| D43 | vie 20-nov | Nervous System | Neuroanatomía localizadora + vías ascendentes/descendentes | N1 | 30 |
| D44 | lun 23-nov | Nervous System | Médula espinal: síndromes + Brown-Séquard | N1 | 30 |
| D45 | mar 24-nov | Nervous System | Tronco + pares craneales + reflejos | N2 | 40 |
| D46 | mié 25-nov | Nervous System | SNA + fármacos autonómicos (completo) | N2 | 40 |
| D47 | jue 26-nov | Nervous System | Ictus: territorios + isquémico/hemorrágico + HSA | N2 | 40 |
| D48 | vie 27-nov | Nervous System | Convulsiones + antiepilépticos | N3 | 40 |
| D49 | lun 30-nov | Nervous System | Demencias + Parkinson + trastornos del movimiento | N2 | 40 |
| D50 | mar 1-dic | Nervous System | EM/desmielinizantes + meningitis + NMJ + tumores SNC | N2 | 40 |
| D51 | mié 2-dic | Hematology & Oncology | Anemias microcíticas: Fe + talasemias + frotis | N1 | 30 |
| D52 | jue 3-dic | Hematology & Oncology | Macro/normocíticas + hemólisis + drepanocitosis | N1 | 30 |
| D53 | vie 4-dic | Hematology & Oncology | Coagulación: cascada + PT/PTT + hemofilias + vWD | N4 | 40 |
| D54 | lun 7-dic | Hematology & Oncology | Plaquetas (PTI/PTT/SUH) + hipercoagulabilidad + CID | N2 | 40 |
| D55 | mar 8-dic | Assessment | 🎯 NBME 28 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D56 | mié 9-dic | Hematology & Oncology | Leucemias agudas y crónicas + mielodisplasia | N2 | 40 |
| D57 | jue 10-dic | Hematology & Oncology | Linfomas + mieloma + transfusión + fármacos onco | N2 | 40 |
| D58 | vie 11-dic | Microbiology / ID | Bacteriología general + genética bacteriana + Gram+ cocos | N1 | 30 |
| D59 | lun 14-dic | Microbiology / ID | Gram+ bacilos + anaerobios + Gram− cocos | N1 | 30 |
| D60 | mar 15-dic | Microbiology / ID | Gram− bacilos (entéricos + respiratorios) + zoonosis | N2 | 40 |
| D61 | mié 16-dic | Microbiology / ID | Micobacterias + espiroquetas + atípicas (Chlamydia/Mycoplasma) | N2 | 40 |
| D62 | jue 17-dic | Microbiology / ID | Virus DNA + herpes + hepatitis virales | N2 | 40 |
| D63 | vie 18-dic | Microbiology / ID | Virus RNA + VIH + arbovirus | N4 | 40 |
| D64 | lun 21-dic | Microbiology / ID | Hongos + parásitos + antimicrobianos (ATB/antifúngicos/antivirales) | N2 | 40 |
| D65 | mar 22-dic | Assessment | 🎯 NBME 29 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D66 | mié 23-dic | Reproductive | Embriología general + ciclo menstrual + hormonas repro | N1 | 30 |
| D67 | jue 24-dic | Reproductive | Embarazo: fisiología + preeclampsia + TORCH | N1 | 30 |
| D68 | lun 28-dic | Reproductive | Gineco-oncología: cérvix + endometrio + ovario | N2 | 40 |
| D69 | mar 29-dic | Reproductive | Mama + aparato masculino + próstata | N2 | 40 |
| D70 | mié 30-dic | Reproductive | ITS + anticoncepción + amenorreas + SOP | N2 | 40 |
| D71 | lun 4-ene | Musculoskeletal / Rheum | Artritis: AR/OA/gota/espondiloartropatías + autoanticuerpos | N1 | 30 |
| D72 | mar 5-ene | Assessment | 🎯 NBME 30 — cierre Fase A (07:15-11:00) + plan Fase B según gaps | N5 (hito) | 200 |
| D73 | mié 6-ene | Musculoskeletal / Rheum | LES + conectivopatías + vasculitis | N1 | 30 |
| D74 | jue 7-ene | Musculoskeletal / Rheum | Hueso (osteoporosis/Paget/tumores) + anatomía MSK high-yield (plexos, nervios) + dermato Step 1 | N2 | 40 |
| D75 | vie 8-ene | Psychiatry & Behavioral | Trastornos del ánimo + psicóticos + DSM esquema | N1 | 30 |
| D76 | lun 11-ene | Psychiatry & Behavioral | Ansiedad + personalidad + infancia (TDAH/autismo) + sustancias/toxidromes | N1 | 30 |
| D77 | mar 12-ene | Assessment | 🎯 UWSA2 — el predictor gold-standard (09:00-13:00) + revisión | N5 (hito) | 160 |
| D78 | mié 13-ene | Psychiatry & Behavioral | Psicofármacos: AD + antipsicóticos + litio + ansiolíticos | N2 | 40 |
| D79 | jue 14-ene | Psychiatry & Behavioral | Bioestadística + epidemiología + ética/comunicación (AMBOSS HY 155Q) | N2 | 40 |
| D80 | vie 15-ene | Biochemistry | Bioquímica HY (día doble): metabolismo glucólisis/TCA/CTE + glucógeno + lípidos · aminoácidos + ciclo de urea + errores innatos + vitaminas (SOLO high-yield: Palmerton = rutas completas son poco ROI) | N1 | 30 |
| D81 | lun 18-ene | Biochemistry | Cierre Fase A (día doble): biología molecular + genética (herencias, trinucleótidos) · farmacología general transversal PK/PD + toxicología + antídotos — **cierre de contenido**; el NBME 31 (D82) cae al día siguiente, sin banco de consolidación delante | N1 | 30 |
| D82 | mar 19-ene | Assessment | 🎯 NBME 31 (07:15-11:00) + decisión GO/NO-GO de fecha de examen | N5 (hito) | 200 |
| D83 | mié 20-ene | Sprint final | 🎯 NBME 32 (07:15-11:00) + revisión + repaso FA sistemas 1-5 | N5 (hito) | 200 |
| D84 | jue 21-ene | Banco intensivo | Random timed 2×40Q + revisión profunda + sistema débil #1 (según NBMEs) | N4 | 80 |
| D85 | vie 22-ene | Sprint final | 🎯 NBME 33 (07:15-11:00) + revisión + repaso FA sistemas 11-14 | N5 (hito) | 200 |
| D86 | lun 25-ene | Banco intensivo | Random timed 2×40Q + revisión + sistema débil #1 (First Aid + Anki) | N4 | 80 |
| D87 | mar 26-ene | Sprint final | 🎯 FREE 120 oficial (07:15-11:00) + logística del examen + cierre | N5 (hito) | 120 |
| D88 | mié 27-ene | Banco intensivo | Random timed 2×40Q + revisión + sistema débil #2 | N4 | 80 |
| D89 | jue 28-ene | Banco intensivo | Random timed 2×40Q + revisión + sistema débil #2 (Mehlman HY del sistema) | N4 | 80 |
| D90 | vie 29-ene | Banco intensivo | uWorld incorrects (2ª pasada) + sistema débil #3 | N5 | 80 |
| D91 | lun 1-feb | Banco intensivo | uWorld incorrects (2ª pasada) + sistema débil #3 | N5 | 80 |
| D92 | mar 2-feb | Banco intensivo | uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 1) | N5 | 80 |
| D93 | mié 3-feb | Banco intensivo | uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 2) | N5 | 80 |
| D94 | jue 4-feb | Sprint final | Repaso First Aid rápido sistemas 6-10 + Anki marathon + incorrects — **TAPER D-2 · ÚLTIMA SESIÓN DE BANCO**: solo Anki maduro + 20Q flagged ya vistos, nada nuevo | N5 | 20 |
| D95 | vie 5-feb | Sprint final | Repaso rapid review First Aid (páginas finales) + Anki + laboratorio de dudas — **TAPER D-1 · DENTRO del plan**: sesión mínima solo por la mañana (≤2 h: Anki maduro/vencido + 20Q flagged con esquemas); tarde: permiso + 2 ID + bolsas Ziploc + ruta → **sáb 6 y dom 7-feb libres** (solo Anki vencido) | N5 | 20 |
| — | **lun 8-feb** | **EXAMEN (target v5.15)** | Step 1 · 7 bloques × 40Q · plan de descansos de Alec (`USMLE_TAPER.examen`) · fuera de la ventana 25-29 ene (agendar/reprogramar Prometric; confirmar eligibility period) | — | 280 |

## Reglas de reprogramación

1. **Si se cae un día de contenido, TODO corre +1 día hábil** (mismo corrimiento determinista
   que ENCAPS: cada día sin estudiar = +1; así nació la v5.15: ni el 21 ni el 22-sep se estudiaron y D1
   pasó a mié 23-sep). El orden de subtemas nunca se altera.
2. 🆕 **REGLA NUEVA (v5.15, 22-sep): el corrimiento es RÍGIDO y los hitos corren CON el plan.**
   Hasta la v5.14 el principio era "los hitos NO se mueven": el simulacro era cita fija de calendario y
   solo cambiaba su D#. El efecto acumulado fue que **cada corrimiento le robaba días de contenido a cada
   NBME** (el NBME 25 bajó de D18 a D10 y el NBME 31 acabó pegado al cierre de temario). Desde la v5.15 se
   desplaza el plan ENTERO en bloque: **cada hito conserva su D# exacto y por tanto sus días de preparación
   por delante**, y cambia su fecha. Consecuencia visible: **los hitos dejan de caer en viernes** (9 pasan a
   martes, NBME 32 a miércoles, NBME 33 a viernes). El **UWSA1 sigue siendo el D1** (vie 11-sep → lun 14 →
   mar 15 → mié 16 → jue 17 → lun 21 → **mié 23-sep**). **Herencia que NO se deshace**: el NBME 31 (D82) sigue
   siendo el día siguiente al cierre de contenido (D81), sin los 2 días de random timed delante (ahora D84 y D86).
3. **REGLA PERMANENTE (instrucción de Joseph, vigente desde la v5.8): NO se fusiona ni se recorta
   contenido.** Ni un tema ni un subtema queda atrás. El desfase se paga **alargando el plan por la
   cola** (D95 pasó de vie 22-ene → lun 25-ene → mar 26-ene → mié 27-ene → jue 28-ene → vie 29-ene → lun 1-feb → mié 3-feb → **vie 5-feb**), no
   comprimiendo el cierre de Fase A. La compresión de la v5.7 (4 días de cierre fusionados en 2 días dobles) **queda
   como está** — no se deshace, pero tampoco se repite. **Corolario v5.15**: donde un plan tenía un final clavado
   (ENCAPS, MIR mantenimiento), se **AMPLÍAN días** en vez de perder sesiones.
4. El colchón real del plan: la holgura de Fase B y la semana de examen con ventana de 5 días
   (25-29 ene). **Ese colchón se agotó del todo en la v5.11, se rebasó en la v5.12, en la v5.13 el plan ya terminaba en febrero y en
   la v5.14 el NBME 31 quedó pegado al contenido**: D94 cae el **jue 4-feb** y D95 el **vie 5-feb** (D-1 dentro del plan), así que
   **el examen sigue fuera de la ventana: target lun 8-feb-2027** (Prometric: agendar/reprogramar; confirmar que el eligibility
   period cubre el 8-feb o extenderlo; plan B feb-mar, mismo eligibility period — ver gates). La única otra opción es **recortar
   temario (derogar la regla 3)** — decisión de Joseph. A partir de aquí **cada día extra de atraso mueve el examen un día hábil
   más (o exige recortar)**. **Con la v5.15 ya se consumieron 17 días hábiles de colchón desde el 31-ago.**
5. Sábados y domingos NO se estudia (régimen 31-ago; sostenibilidad > volumen). El **sáb 6 y el dom 7-feb** quedan entre el D95
   (D-1, sesión mínima + ritual) y el examen del lun 8-feb: solo Anki vencido, y repetir el ritual de test-day el domingo por la tarde.
6. **REGLA de burnout (12-sep, tarde; divergencia Palmerton #29 → §E-7).** Si **2 hitos consecutivos con
   mínimo** quedan **bajo su mínimo on-track** (UWSA1/UWSA2 no cuentan) **y** hay síntomas (releer sin
   comprender, irritabilidad, indiferencia, descansos de 5 min que se vuelven de 1 h) → **3-5 días con SOLO
   Anki AM (30-45 min de tarjetas viejas) + sueño**; frenar QBank y toda adquisición. **Cada día parado = +1
   día hábil (regla 1)**: no se recorta ni se fusiona temario (regla 3) — en v5.15 eso implica mover el examen más allá del
   lun 8-feb, con los hitos corriendo detrás (regla 2). Se reanuda **por el gate del 80%**, no por la fecha; si el siguiente hito vuelve a quedar bajo mínimo →
   plan B de fecha (feb-mar, mismo eligibility period). En la app: `usmleScores.gateHito` → `'ALERTA BURNOUT'` + banner en `UsmleHub`.

## Semana de examen: taper D94 · D95 = D-1 dentro del plan · test day lun 8-feb (Palmerton §8.3-§8.4)

*(Implementado el 12-sep por la tarde — divergencia #22 / §E-5; remapeado el 22-sep a la v5.15. Código: `USMLE_TAPER`,
`DAILY_META.examenTarget = '2027-02-08'`, `DAILY_META.descansoD1 = '2027-02-05'` en `usmleStep1Daily.ts`; los D94/D95 llevan
`franjaNota` y chip TAPER en Cola de hoy; D95 = D-1 muestra el ritual y el test day; Readiness → tarjeta "Taper y semana de examen".)*

| Día | Fecha | Protocolo | Q |
|-----|-------|-----------|---|
| desde D82 (NBME 31) | mar 19-ene | **Cese de lo nuevo**: cero preguntas nuevas, cero tarjetas nuevas; solo incorrects/flagged + AMBOSS 200 como repaso de lo ya visto; no repetir NBME ya hechos | — |
| **D92 · D93** | **mar 2 / mié 3-feb** | Últimos días de banco alojados en el sprint: uWorld incorrects + AMBOSS 200 Concepts (mitades 1 y 2) | 80 + 80 |
| **D94 · D-2 (última sesión de banco)** | **jue 4-feb** | Solo Anki **maduro** + 20Q flagged/incorrects ya vistos (sin bloque timed, sin AMBOSS) · repaso First Aid de esquemas (sistemas 6-10) · dormir ≥7 h ya desde hoy | 20 |
| **D95 · D-1 (dentro del plan)** | **vie 5-feb** | **Sesión MÍNIMA solo por la mañana (≤2 h)** (`USMLE_TAPER.d95`/`.dMenos1`): Anki maduro/vencido + 20Q flagged con los mejores esquemas e imágenes · rapid review FA · cero preguntas nuevas, cero tarjetas nuevas, ningún bloque timed · PROHIBIDO temas densos y abrir First Aid "para ver cuánto sé" · **tarde: permiso impreso + digital, 2 ID con el nombre EXACTO, bolsas Ziploc numeradas, ruta al Prometric** · nada después de las 17:00 (journaling, ejercicio suave, visualización, cena con proteína) · somnífero nunca por primera vez · dormir ≥7-8 h | 20 |
| **sáb 6 · dom 7** | sáb 6 / dom 7-feb | **Libres** (entre el D95 y el examen): sin banco; solo Anki vencido · repetir el ritual del D-1 el domingo por la tarde (empaque, ruta, dormir ≥7-8 h) | — |
| **EXAMEN** | **lun 8-feb** | Desayuno proteína + grasa (sin carbohidratos simples), el café de siempre · tutorial: auriculares y terminar (+15 min de descanso) · bloques 1-2 → 10 min · 3-4 → 10 min · 5 → almuerzo 20-30 min · 6 → 10 min · 7 · entre bloques las 40Q dejan de existir (nunca revisar ni abrir FA en el casillero) · nunca salir a mitad de bloque · post-test: premiarse | 280 |

Las franjas del Calendar no cambian en D94 (05:00 Anki · 07:15 · 11:00 siguen en pie); cambia el **volumen** (20Q) y el
**contenido** (nada nuevo). El D-1 (D95, vie 5-feb) es un día del plan con sesión mínima solo por la mañana, y el finde
6-7 feb queda libre por delante del examen.
⚠ **Google Calendar (A VERIFICAR tras la v5.15)**: las 6 series USMLE L-V y las 6 series de extensión creadas el 19-sep
(ANKI AM 05:00 `gfapfa25hm5d9s65n7oiu0jsms` · repaso 07:15 `vi7lrsm2blitpqistrt87i3sqk` · pre-test 08:15
`mlqvrm4m8bn38qfl37qddjgk5g` · DEEP PRIME `39dm9gk3a58u3iqu9lk28noum0` · 30Q `u6alh9h3o43l2fu98gmvkvtk90` · eval 18:00
`r850pocdgcm8pi6a42cvv37v1k`) se dimensionaron para la v5.14 (cola hasta el mié 3-feb); con el corrimiento rígido el plan
llega al **vie 5-feb** y el examen al **lun 8-feb**, así que **las series, los overlays del D94/D95 (`neboplchsaua4snj39nrl480nc`,
`n90bdqhohadu1eqbctv148dn28`) y el overlay del examen deben re-extenderse/moverse** — los IDs quedan aquí como referencia de
la v5.14. ENCAPS 16:15 sí se amplió en la v5.15 (fin **mar 2-feb**, ya no vie 29-ene: se amplían días, no se pierden sesiones).
Lo que sigue A VERIFICAR (12-sep): repasos 200-300/día en el cierre (cifra del studio guide) y
el costo del Free 120 en el Prometric de Lima ($155 internacional según el cuaderno). **Decisión pendiente de Joseph (22-sep)**:
rendir el **lun 8-feb** (agendar/reprogramar Prometric + confirmar eligibility period) o **recortar temario** para volver atrás.

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
- Free 120 actual la última semana con ≥70% (heurística comunitaria) — en v5.15 es **D87
  (mar 26-ene-2027; por primera vez cambia de fecha, porque con el corrimiento rígido corre con el plan en vez de quedar
  clavado al vie 22-ene; D-13 del examen; abre la Fase C)**, idealmente rendido en el MISMO Prometric del
  examen (Palmerton: *familiarity breeds calm*).

**Logística ECFMG/Prometric** (empezar en AGOSTO, no después):
- Abrir cuenta ECFMG + verificación de credenciales con la universidad peruana YA (tarda semanas).
- El eligibility period (~3 meses) se elige al aplicar; hay UNA extensión contigua pagada.
  **Aplicar recién cuando la data NBME lo respalde** (gate de fines de noviembre), eligiendo
  período ene-mar 2027 → si hay que correr a feb-mar, es el MISMO período, sin costo.
  🔴 **v5.15: confirmar que el eligibility period elegido CUBRE el lun 8-feb-2027** (el target ya no está en enero); si el
  período aplicado terminara antes, usar la extensión contigua o elegir feb-abr al aplicar.
- Prometric se agenda máximo 6 meses antes; reprogramar dentro de los 45 días previos cuesta fee.
  **Agendar el LUN 8-FEB-2027** (target v5.15), no el jue 4-feb (que ahora es el D94, última sesión de banco) ni el vie 5-feb (D95 = D-1).
  Si ya estaba agendado el 29-ene, el 2-feb o el 4-feb, **reprogramar** (con fee si se hace dentro de los 45 días previos → hacerlo YA, en
  septiembre-octubre). Cada corrimiento adicional obliga a reprogramar otro día hábil más (o a recortar temario).
- Gate 1 (~30-nov, tras NBME 27 D40 y antes de NBME 28 D55): tendencia positiva y ≥55% → aplicar
  eligibility period (que cubra el 8-feb) y agendar Prometric Lima para el lun 8-feb.
- Gate 2 (**mar 22-dic, NBME 29 = D65**): <60% EPC → mover target a feb-mar dentro del mismo período.
- GO/NO-GO final: **NBME 31 (D82, mar 19-ene-2027, el día siguiente al cierre de contenido)** + **UWSA2 (D77, mar 12-ene-2027)** según el criterio vigente.

**Matemática de horas**: v5.15 = 95 días × 6h15 ≈ **594h** (bloque de mañana 5h30 ≈ 523h +
eval de 18:00 ≈ 71h). **Igual que en v5.7 → v5.14**: como esta vez tampoco se recortó contenido sino
que se alargó el plan, los 95 días siguen siendo 95 (D94-D95 son de sesión ligera/mínima por diseño del taper). La referencia
IMG-base-cero es 600-1.000h; el plan queda algo por debajo del punto medio — proteger las franjas es lo que mantiene viable febrero¹.

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
