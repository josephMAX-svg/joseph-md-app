# CALENDARIO 5 MESES — USMLE Step 1 v5.17 (S1 semana del 28-sep-2026 → S21 semana del 15-feb-2027 · examen MAR 16-FEB-2027)

Plan semana a semana derivado de [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) **v5.17**
(fuente de verdad: **D1 = JUE 1-OCT-2026 → D95 = LUN 15-FEB-2027, 95 días**; del 31-ago al 30-sep
no se estudió: 23 hábiles perdidos) + evidencia del agente macro:calendario-5-meses (USMLE Bulletin 2026-27, NBME,
ECFMG, Yousmle, Shemmassian). L-V únicamente; **sáb y dom LIBRES**; **skip 25-dic, 31-dic, 1-ene**.
Fases: **A contenido D1-D81 · B banco D82-D86 · C sprint D87-D95** (`faseDe`).
**Examen: el plan rebasa la ventana 25-29 ene 2027 (D94 = vie 12-feb = D-2, última sesión de banco; D95 = lun 15-feb = ÚLTIMO
DÍA del plan y D-1 REAL) → target MAR 16-FEB-2027, FUERA de la ventana y al día siguiente del D95**; en la v5.17 el sáb 13 y el
dom 14-feb quedan libres ENTRE el D94 y el D95 (solo Anki vencido), pero entre el D95 y el examen no hay finde: el D-1 (lun
15-feb) es sesión mínima por la mañana + ritual de test-day.

> **v5.16 → v5.17 (30-sep-2026) · CORRIMIENTO RÍGIDO (3.º)**: tampoco se estudiaron el lun 28, el mar 29 ni el mié 30 de
> septiembre → D1 corrió de lun 28-sep a **jue 1-oct** (+3 días hábiles; decimosexto corrimiento desde el 31-ago:
> 31-ago→30-sep = 23 hábiles perdidos). **Misma regla de Joseph que en la v5.15 y la v5.16** («todo inicia desde mañana, todo
> lo que estaba solo corre los días […] la fecha de término alarga los días que no se realizó, solo corre los días en todos
> los aspectos»): **el corrimiento es RÍGIDO** — se desplaza el plan ENTERO (contenido **y** los 12 hitos) en bloque, **no se
> toca ningún tema** y, donde un plan tenía un final clavado, **se AMPLÍAN días** en vez de perder sesiones. Sigue vigente la
> regla permanente: **no se fusiona ni se recorta NADA**; el temario sale 1:1 y el desfase se absorbe **alargando el final del
> plan** (D95 pasa de mié 10-feb a **lun 15-feb-2027**). Contenido verificado: el multiset de temas vs la v5.16 da **dif 0**
> (95 días, 5560Q).
>
> 🆕 **Los hitos siguen sin estar anclados por fecha** (regla de la v5.15): **corren con el plan y conservan su D# exacto**,
> así que ningún NBME pierde preparación. ⚠ Efecto colateral: con el D1 en **jueves**, **8 de los 12 hitos caen en
> miércoles** (NBME 25 14-oct, 26 4-nov, 27 25-nov, 28 16-dic, 30 13-ene, UWSA2 20-ene, NBME 31 27-ene y Free 120 3-feb); el
> UWSA1 (D1) y el NBME 32 (28-ene) caen en jueves, y el NBME 29 (lun 4-ene, por los saltos del 25-dic, 31-dic y 1-ene) y el
> NBME 33 (lun 1-feb) en lunes. **Ningún hito cae en viernes**: los viernes sin hito de Fase A pasan a ser **15** — **6 N3 +
> 4 N4 + 5 N1** (en la v5.16 eran 8: 5 N3 + 1 N4 + 2 N1).
>
> **El UWSA1 sigue moviéndose con el D1** (vie 11 → lun 14 → mar 15 → mié 16 → jue 17 → lun 21 → mié 23 → lun 28-sep →
> **jue 1-oct = D1**: baseline el primer día, como prescribe Palmerton). El **primer día de CONTENIDO es el vie 2-oct = D2**
> (Fundamentos, Pathoma 1-2); Cardio arranca el jue 8-oct (D6). Las semanas se cuentan **de lunes a viernes de calendario**:
> **S1 = lun 28-sep → vie 2-oct, con solo 2 días de plan (D1 jue 1 · D2 vie 2-oct)**, S2 = 5-9 oct (D3-D7) … S20 = 8-12 feb
> (D90-D94) · **S21 = 15-19 feb (D95 lun 15-feb + examen mar 16-feb)** → `STEP1_SEMANAS = 21` (`homeBriefing.ts`). Los 2 días
> dobles de Bioquímica vienen de la v5.7, conservan todos sus temas y quedan **juntos después del UWSA2** (D77 mié 20-ene =
> UWSA2 dentro de la Fase A · D78-D79 Psiquiatría/Biostats · D80 lun 25-ene · D81 mar 26-ene = cierre de Fase A); **no se
> creó ningún día doble nuevo**.
>
> 🔴 **Herencia de la v5.14 que el corrimiento rígido conserva tal cual**: el NBME 31 GO/NO-GO (D82, **mié 27-ene**) cae el
> día siguiente al cierre de contenido (D81, mar 26-ene), sin días de banco de consolidación delante. Los 2 random timed
> que lo precedían siguen en **D84 (vie 29-ene) y D86 (mar 2-feb)**, intercalados con NBME 32 (D83, jue 28-ene) y NBME 33
> (D85, lun 1-feb): la **Fase B es D82-D86 (mié 27-ene → mar 2-feb)** y la **Fase C arranca con el Free 120 (D87, mié 3-feb)**.
> **S18 = 25-29 ene (D80-D84)**, **S19 = 1-5 feb (D85-D89)**, **S20 = 8-12 feb (D90-D93 banco · D94 taper D-2)** y
> **S21 = 15-19 feb (D95 taper D-1 + examen)**.
>
> 🔴 **Target de examen MAR 16-FEB-2027 (fuera de la ventana 25-29 ene, al día siguiente del D95)**:
> `DAILY_META.examenTarget = '2027-02-16'`, `descansoD1 = '2027-02-15'`, `examenVentana` marcada como superada. D94 (vie
> 12-feb) = **D-2, última sesión de banco** (`USMLE_TAPER.d94`: 20Q flagged + Anki maduro, nada nuevo); **sáb 13 y dom 14-feb
> LIBRES** (solo Anki vencido, dormir); **D95 (lun 15-feb) = ÚLTIMO DÍA DEL PLAN y D-1 REAL** (`USMLE_TAPER.d95`/`.dMenos1`:
> sesión mínima ≤2 h por la mañana + ritual de test-day; nada después de las 17:00). ⚠ **A diferencia de la v5.16, SÍ hay un
> finde libre entre el D94 y el D95; entre el D95 y el examen, no.** **Joseph debe agendar/reprogramar el Prometric para el
> mar 16-feb y confirmar que su eligibility period cubre esa fecha** (si no: extenderlo); la alternativa es **recortar
> temario** para volver atrás (decisión suya, §E-5 de DIVERGENCIAS). ⚠ **Desde hoy, cada día no estudiado mueve el examen un
> día hábil más (o exige recortar temario).**
>
> *(Histórico v5.16, 26-sep: D1 = lun 28-sep → D95 = mié 10-feb, examen jue 11-feb sin finde entre el taper y el examen; 8
> hitos en viernes; N3 = D15, D20, D35, D45, D50 y N4 = D60; S1-S20 de calendario, sin S21.)*

| Sem | Lunes | Contenido (L-V) | Hito |
|-----|-------|-----------------|------|
| S1 | 28-sep | **Fundamentos** D2 (vie) | **UWSA1** (D1, jue 1-oct) |
| S2 | 5-oct | **Fundamentos** D3 (lun) · **Immunology** D4-D5 (mar-mié) · **Cardiovascular** D6-D7 (jue-vie) | — |
| S3 | 12-oct | **Cardiovascular** D8-D9 (lun-mar) · D11-D12 (jue-vie) | **NBME 25** (D10, mié 14-oct) |
| S4 | 19-oct | **Cardiovascular** D13-D16 (lun-jue) · **Respiratory** D17 (vie) | — |
| S5 | 26-oct | **Respiratory** D18-D22 (lun-vie) | — |
| S6 | 2-nov | **Renal** D23-D24 (lun-mar) · D26-D27 (jue-vie) | **NBME 26** (D25, mié 4-nov) |
| S7 | 9-nov | **Renal** D28-D29 (lun-mar) · **Gastrointestinal** D30-D32 (mié-vie) | — |
| S8 | 16-nov | **Gastrointestinal** D33-D36 (lun-jue) · **Endocrine** D37 (vie) | — |
| S9 | 23-nov | **Endocrine** D38-D39 (lun-mar) · D41-D42 (jue-vie) | **NBME 27** (D40, mié 25-nov) |
| S10 | 30-nov | **Nervous System** D43-D47 (lun-vie) | — |
| S11 | 7-dic | **Nervous System** D48-D50 (lun-mié) · **Hematology & Oncology** D51-D52 (jue-vie) | — |
| S12 | 14-dic | **Hematology & Oncology** D53-D54 (lun-mar) · D56-D57 (jue-vie) | **NBME 28** (D55, mié 16-dic) |
| S13 | 21-dic | **Microbiology / ID** D58-D61 (lun-jue) | — |
| S14 | 28-dic | **Microbiology / ID** D62-D64 (lun-mié) | — |
| S15 | 4-ene | **Reproductive** D66-D69 (mar-vie) | **NBME 29** (D65, lun 4-ene) |
| S16 | 11-ene | **Reproductive** D70 (lun) · **Musculoskeletal / Rheum** D71 (mar) · D73-D74 (jue-vie) | **NBME 30** (D72, mié 13-ene) |
| S17 | 18-ene | **Psychiatry & Behavioral** D75-D76 (lun-mar) · D78-D79 (jue-vie) | **UWSA2** (D77, mié 20-ene) |
| S18 | 25-ene | **Biochemistry** D80-D81 (lun-mar) · **Banco intensivo** D84 (vie) | **NBME 31** (D82, mié 27-ene) · **NBME 32** (D83, jue 28-ene) |
| S19 | 1-feb | **Banco intensivo** D86 (mar) · D88-D89 (jue-vie) | **NBME 33** (D85, lun 1-feb) · **FREE 120 oficial** (D87, mié 3-feb) |
| S20 | 8-feb | **Banco intensivo** D90-D93 (lun-jue) · **Sprint final** D94 (vie) | — |
| S21 | 15-feb | **Sprint final** D95 (lun) | **EXAMEN** (mar 16-feb-2027, target v5.17) |

Fines de semana: **todos los sábados y domingos del plan están libres** (régimen 31-ago:
sostenibilidad > volumen). Únicos días hábiles saltados: **vie 25-dic-2026 (S13), jue 31-dic-2026
y vie 1-ene-2027 (S14)** — por eso S13 tiene 4 días y S14 solo 3. **S1 tiene 2 días** (D1 jue 1-oct = UWSA1 · D2 vie
2-oct = primer día de contenido: con el D1 en jueves la S1 de calendario queda corta), **S19 tiene 5 días** (D85 lun 1-feb …
D89 vie 5-feb), **S20 tiene 5 días** (D90 lun 8-feb … D94 vie 12-feb) y **S21 tiene 1 día de plan** (D95 lun 15-feb) más el
examen el mar 16-feb. Semana de examen: jue 11-feb = D93 (AMBOSS mitad 2) · **vie 12-feb = D94 (D-2, última sesión de banco)**
· **sáb 13 y dom 14-feb LIBRES** (solo Anki vencido) · **lun 15-feb = D95 = D-1 REAL (sesión mínima + ritual)** · **mar
16-feb examen (target)** — en la v5.17 el finde libre cae entre el D94 y el D95; entre el D95 y el examen no hay finde.

Desde Fase B (S18, mié 27-ene, D82 = NBME 31): al ANKI AM de las 05:00 se le suma el **STRESS SET diario 10Q/12min**
(Palmerton: últimas 2-3 semanas, ≥60% de contenido cubierto — entrena el primer instinto). El UWSA2 (mié 20-ene, D77)
cae todavía en la Fase A.

## Hitos en su semana (v5.17: los 12 corren CON el plan · D# intacto · fechas +3 hábiles)

| # | Hito | Sem | Día | Fecha | Q |
|---|------|-----|-----|-------|---|
| 1 | **UWSA1** | S1 | **D1** | jue 1-oct-2026 | 160 |
| 2 | **NBME 25** | S3 | D10 | mié 14-oct-2026 | 200 |
| 3 | **NBME 26** | S6 | D25 | mié 4-nov-2026 | 200 |
| 4 | **NBME 27** | S9 | D40 | mié 25-nov-2026 | 200 |
| 5 | **NBME 28** | S12 | D55 | mié 16-dic-2026 | 200 |
| 6 | **NBME 29** | S15 | D65 | lun 4-ene-2027 | 200 |
| 7 | **NBME 30** | S16 | D72 | mié 13-ene-2027 | 200 |
| 8 | **UWSA2** | S17 | D77 | mié 20-ene-2027 | 160 |
| 9 | **NBME 31** | S18 | D82 | mié 27-ene-2027 | 200 |
| 10 | **NBME 32** | S18 | D83 | jue 28-ene-2027 | 200 |
| 11 | **NBME 33** | S19 | D85 | lun 1-feb-2027 | 200 |
| 12 | **FREE 120 oficial** | S19 | D87 | mié 3-feb-2027 | 120 |

Los 12 hitos suman **2240Q** de simulacro. Con el D1 en jueves (v5.17) **8 de los 12 caen en miércoles**
(NBME 25, 26, 27, 28 y 30, UWSA2, NBME 31 y Free 120); 2 caen en jueves (**UWSA1**, D1: baseline el primer día del plan;
NBME 32, jue 28-ene) y 2 en lunes (NBME 29, lun 4-ene, por los saltos del 25-dic, 31-dic y 1-ene; NBME 33, lun 1-feb);
**ninguno cae en viernes**. El **NBME 29 (D65, lun 4-ene)** es ahora el primer hito de 2027 (Micro, D58-D64, cierra el
contenido de 2026 el mié 30-dic). El Free 120 (mié 3-feb) queda a **D-13 del examen** (mar 16-feb) y abre la Fase C.
**El NBME 31 (mié 27-ene, D82) sigue siendo el día siguiente al cierre de contenido (D81, mar 26-ene)**: no hay banco de
consolidación delante del GO/NO-GO (herencia de la v5.14 que el corrimiento rígido conserva, porque los hitos mantienen su D#).
Semanas deload (lunes): **9-nov** (tras el NBME 26 del mié 4-nov) y **21-dic** (tras el NBME 28 del mié 16-dic).

## 5 niveles UWorld por fase (Palmerton v3)

Cada día de `DIAS` lleva `nivelUW` (1-5) y `qDia` (Q uWorld objetivo). Regla madre: **no se sube de nivel sin ≥80% en 10Q
consecutivas del nivel actual (≤24-48 h)**; si <80% se repite el subtema (bloques de 5Q) y se audita el método. Las HORAS del
bloque no cambian; cambia el FORMATO de la consolidación de las 11:00 según el nivel del día.

| Nivel | Nombre | Formato | Q/día | Umbral para SUBIR | Dónde vive en el día | Fase |
|-------|--------|---------|-------|-------------------|----------------------|------|
| **1** | Subtema · tutor sin tiempo | Bloques de 5Q de UN solo subtema · modo tutor · sin reloj (aprender a leer: CCSN + SAQ + cover-the-options) | Palmerton 20-30Q/día → plan: 30Q (10 pre-test + 20 consolidación) | 80% en 10Q consecutivas del subtema, ≤24-48 h tras estudiarlo | 08:15 PRE-TEST del tema nuevo (siempre) · 11:00 los 2 primeros días de cada sistema | A |
| **2** | Subtema · timed | Bloques de 5Q del subtema · cronometrado (90 s/Q · tope 2 min: adivinar, marcar, avanzar) | Volumen creciente → plan: 40Q (10 + 30) | 80% en ≥3 subtemas distintos, ≥1 validado en <48 h | 11:00 CONSOLIDACIÓN desde el 3er día de cada sistema (subtemas ya validados) · 07:15: 5Q timed del subtema de AYER (1ª mitad del gate de 10Q) | A |
| **3** | Sistema completo · timed | Bloques de 10-20Q de TODO el sistema · timed (sin la "ventaja injusta" de saber el subtema) | Palmerton 40-50Q/día → plan: 40Q (10 pre-test + 20Q sistema + 10 tutor) | 80% en 20Q timed consecutivas del sistema | VIERNES sin NBME/UWSA a las 11:00 **hasta S10** (v5.17: D12 Cardio · D22 Resp · D27 Renal · D32 GI · D42 Endo · D47 Neuro; los viernes D2 Fundamentos, D7 Cardio, D17 Resp, D37 Endo y D52 Heme/Onc caen en 1.º-2.º día de sistema y quedan en nivel 1): 20Q del sistema en curso, o del anterior si el sistema lleva <3 días · desde S11 el viernes pasa a nivel 4 | A |
| **4** | Sistemas mixtos · timed | Bloques de 20-30Q mezclando ≥3 sistemas dominados + el nuevo (saltar entre especialidades bajo presión) | Palmerton 50-70Q/día → plan: viernes N4 = 40Q (10 pre-test + 30Q mixtos timed) · Fase B: 2×40Q (80Q) | 80% en bloques mixtos de 20Q timed de ≥3 sistemas | 18:00 EVAL (10Q mixta timed) toda la Fase A como dosis diaria · **VIERNES sin hito desde S11 = 20-30Q mixtos timed a las 11:00 en vez de sistema único: en v5.17 son CUATRO (D57 vie 18-dic Heme/Onc S12 · D69 vie 8-ene Repro S15 · D74 vie 15-ene MSK S16 · D79 vie 22-ene Psiquiatría/Biostats S17): con el D1 en jueves ningún hito cae en viernes; el viernes de S11 (D52) es el 2.º día de Heme/Onc (N1) y las semanas del 25-dic y del 1-ene no tienen viernes hábil** (flag `VIERNES_N4_DESDE_SEMANA = 11`, texto en `DIAS[].franjaNota`) · **Fase B D84 · D86 + Fase C D88 · D89** (random timed 2×40Q + sistema débil) | A (dosis diaria + viernes desde S11) → B-C |
| **5** | Mixto completo 40Q · timed | Bloques de 40Q random · timed 60 min (90 s/Q) = simulación exacta del examen | Palmerton 80-100Q/día (máx. 2 bloques de 40) · hitos: UWSA 160Q · NBME 200Q · Free 120 | 80% sostenido (90% para 260+) · pase seguro = NBME ≥65% (≈95%) / ≥70% (≈99%) | 05:00 STRESS SET 10Q/12min (Fases B-C) · **UWSA2 (D77, dentro de la Fase A) + NBME 31 (D82, abre la Fase B) + NBME 32/33 (D83, D85)** y **D90 · D91 · D92 · D93** (incorrects 2ª pasada + AMBOSS 200 mitades 1-2, alojados en el sprint) · Fase C (Free 120 D87 + taper D94-D95) · todos los hitos = formato nivel 5 como MEDICIÓN, no como progresión | B → C (+ todos los hitos) |

**Regla determinista del generador** (no toca sistemas, hitos ni el total de 95 días; en la v5.17 las fechas corren en bloque, +3 hábiles):
- Fase A: posición del día dentro de su sistema (sin contar Assessment) → **1º-2º día = nivel 1** (30Q = 10 pre-test + 20 consolidación en bloques 5Q tutor) · **viernes sin hito y ≥3º día = nivel 3 hasta S10** (40Q = 10 + 20 sistema completo timed + 10 tutor) · **viernes sin hito y ≥3º día desde S11 = nivel 4** (40Q = 10 pre-test + 20-30Q timed mixtos de sistemas dominados + 10 tutor; flag `VIERNES_N4_DESDE_SEMANA = 11`) · **resto = nivel 2** (40Q = 10 + 30 en bloques 5Q timed).
- Hitos (🎯): formato **nivel 5 como MEDICIÓN** (UWSA 160Q · NBME 200Q · Free 120 = 120Q), no como progresión.
- Fase A cierra con **D77 = UWSA2** (nivel 5, mié 20-ene), **D78 = Psicofármacos** (nivel 2, jue 21-ene), **D79 = Biostats** (nivel 4: viernes N4 de S17, vie 22-ene), **D80 = Bioquímica día doble 1** (nivel 1, lun 25-ene) y **D81 = Bioquímica día doble 2** (nivel 1, mar 26-ene).
- Fase B (D82-D86): **D82 = NBME 31** (nivel 5 como medición, mié 27-ene, abre la fase el día siguiente al cierre de contenido) · **D83 = NBME 32** (jue 28-ene) y **D85 = NBME 33** (lun 1-feb) (nivel 5) · **D84 (vie 29-ene) y D86 (mar 2-feb) nivel 4** (2×40Q mixtos timed = 80Q, sistema débil #1).
- Fase C (D87-D95): **nivel 5** salvo **D88 (jue 4-feb) y D89 (vie 5-feb), nivel 4** (random timed + sistema débil #2 / Mehlman); **D90 (lun 8-feb), D91 (mar 9-feb), D92 (mié 10-feb) y D93 (jue 11-feb) siguen siendo días de banco** (incorrects 2ª pasada · AMBOSS 200 mitad 1 · mitad 2, 80Q cada uno) y los días sin simulacro son **taper** (`TAPER_ACTIVO`, 12-sep tarde): solo flagged/incorrects ya vistos + Anki maduro, cero preguntas y cero tarjetas nuevas (**D94 vie 12-feb = 20Q · D95 lun 15-feb = 20Q**).
- **La clasificación no depende de umbrales de FECHA** sino del **origen de la fila** (`bbCh` = `Banco` / `Sprint`): así la regla queda idéntica aunque el contenido se derrame hasta el 26-ene.
- La eval de las 18:00 (10Q mixta timed) es la **dosis diaria de nivel 4** durante toda la Fase A; los stress sets 10Q/12min (nivel 5) solo en Fases B-C a las 05:00.

### Distribución real recontada desde `DIAS` (v5.17 · 95 días)

| Fase | Días | Niveles | Q objetivo (`qDia`) |
|------|------|---------|------------------------|
| **A** · D1-D81 | 81 | N1×28 · N2×35 · N3×6 · N4×4 · N5×8 | 4160 |
| **B** · D82-D86 | 5 | N4×2 · N5×3 | 760 |
| **C** · D87-D95 | 9 | N4×2 · N5×7 | 640 |
| **Total** | **95** | **N1×28 · N2×35 · N3×6 · N4×8 · N5×18** | **5560** |

Desglose: **3320Q de trabajo diario** (83 días) + **2240Q de simulacros**
(9×200Q NBME + 2×160Q UWSA + 1×120Q Free 120). El total **5560Q es idéntico al de la v5.14, la v5.15 y la v5.16**: el corrimiento
rígido no toca volumen ni contenido (el multiconjunto sistema/subtema es el mismo, verificado con `node` por `(system, sub)`: 95/95
biyectivo, dif 0).
Viernes de Fase A sin hito (**15**, siete más que en la v5.16 porque con el D1 en jueves ningún hito cae en viernes): D2 (2-oct)
Fundamentos **N1** · D7 (9-oct) Cardiovascular **N1** · **D12 (16-oct) Cardiovascular N3** · D17 (23-oct) Respiratory **N1** ·
**D22 (30-oct) Respiratory N3** · **D27 (6-nov) Renal N3** · **D32 (13-nov) Gastrointestinal N3** · D37 (20-nov) Endocrine **N1** ·
**D42 (27-nov) Endocrine N3** · **D47 (4-dic) Nervous System N3** · D52 (11-dic) Hematology & Oncology **N1** · **D57 (18-dic)
Hematology & Oncology N4** (S12) · **D69 (8-ene) Reproductive N4** (S15) · **D74 (15-ene) Musculoskeletal / Rheum N4** (S16) ·
**D79 (22-ene) Psychiatry & Behavioral N4** (S17).
Los que quedan en **N1** lo hacen porque su sistema lleva <3 días: ese viernes el bloque
de sistema completo timed se hace del sistema **anterior**. Cambio de niveles de la v5.16 → v5.17: al
correr todo +3 días hábiles el viernes de cada sistema vuelve a caer en otro subtema, y como **los hitos dejan los viernes**
(pasan a miércoles) aparecen seis viernes de nivel 3 (D12, D22, D27, D32, D42, D47) y cuatro de nivel 4 (D57, D69, D74, D79; el
viernes de S11 es el D52, 2.º día de Heme/Onc → N1, y S13-S14 no tienen viernes hábil). Totales: **N2×39 → N2×35**, **N3×5 → N3×6**,
**N4×5 → N4×8**, N1×28 y N5×18 sin cambio. De los **18 viernes** del plan **ninguno es hito**: 15 son de Fase A (arriba), D84
(vie 29-ene) es banco de Fase B, D89 (vie 5-feb) banco alojado en el sprint y D94 (vie 12-feb) el taper D-2.

### Nivel por día y semana (generado desde `DIAS`)

| Sem | Lunes | Niveles L-V (🎯 = hito) | Q objetivo/día |
|-----|-------|--------------------------|----------------|
| S1 | 28-sep | jue N5🎯 · vie N1 | 160/30 |
| S2 | 5-oct | lun N1 · mar N1 · mié N1 · jue N1 · vie N1 | 30/30/30/30/30 |
| S3 | 12-oct | lun N2 · mar N2 · mié N5🎯 · jue N2 · vie N3 | 40/40/200/40/40 |
| S4 | 19-oct | lun N2 · mar N2 · mié N2 · jue N2 · vie N1 | 40/40/40/40/30 |
| S5 | 26-oct | lun N1 · mar N2 · mié N2 · jue N2 · vie N3 | 30/40/40/40/40 |
| S6 | 2-nov | lun N1 · mar N1 · mié N5🎯 · jue N2 · vie N3 | 30/30/200/40/40 |
| S7 | 9-nov | lun N2 · mar N2 · mié N1 · jue N1 · vie N3 | 40/40/30/30/40 |
| S8 | 16-nov | lun N2 · mar N2 · mié N2 · jue N2 · vie N1 | 40/40/40/40/30 |
| S9 | 23-nov | lun N1 · mar N2 · mié N5🎯 · jue N2 · vie N3 | 30/40/200/40/40 |
| S10 | 30-nov | lun N1 · mar N1 · mié N2 · jue N2 · vie N3 | 30/30/40/40/40 |
| S11 | 7-dic | lun N2 · mar N2 · mié N2 · jue N1 · vie N1 | 40/40/40/30/30 |
| S12 | 14-dic | lun N2 · mar N2 · mié N5🎯 · jue N2 · vie **N4** (viernes N4: mixto de sistemas dominados) | 40/40/200/40/40 |
| S13 | 21-dic | lun N1 · mar N1 · mié N2 · jue N2 | 30/30/40/40 |
| S14 | 28-dic | lun N2 · mar N2 · mié N2 | 40/40/40 |
| S15 | 4-ene | lun N5🎯 · mar N1 · mié N1 · jue N2 · vie **N4** (viernes N4: mixto de sistemas dominados) | 200/30/30/40/40 |
| S16 | 11-ene | lun N2 · mar N1 · mié N5🎯 · jue N1 · vie **N4** (viernes N4: mixto de sistemas dominados) | 40/30/200/30/40 |
| S17 | 18-ene | lun N1 · mar N1 · mié N5🎯 · jue N2 · vie **N4** (viernes N4: mixto de sistemas dominados) | 30/30/160/40/40 |
| S18 | 25-ene | lun N1 · mar N1 · mié N5🎯 · jue N5🎯 · vie N4 | 30/30/200/200/80 |
| S19 | 1-feb | lun N5🎯 · mar N4 · mié N5🎯 · jue N4 · vie N4 | 200/80/120/80/80 |
| S20 | 8-feb | lun N5 · mar N5 · mié N5 · jue N5 · vie N5 (taper **D-2, última sesión de banco**) | 80/80/80/80/20 |
| S21 | 15-feb | lun N5 (taper **D-1 real**: sesión mínima AM + ritual) → **mar 16-feb EXAMEN** | 20 |

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
| D1 | jue 1-oct | Assessment | 🎯 UWSA1 — BASELINE (160Q, 09:00-13:00) + revisión completa por la tarde | N5 (hito) | 160 |
| D2 | vie 2-oct | Fundamentos | Pathoma 1-2: lesión celular + muerte celular + inflamación | N1 | 30 |
| D3 | lun 5-oct | Fundamentos | Pathoma 3: neoplasia (principios + carcinogénesis) · setup Anki FSRS | N1 | 30 |
| D4 | mar 6-oct | Immunology | Inmunidad innata/adaptativa + MHC + linfocitos T/B | N1 | 30 |
| D5 | mié 7-oct | Immunology | Hipersensibilidades I-IV + autoinmunidad + inmunodeficiencias | N1 | 30 |
| D6 | jue 8-oct | Cardiovascular | Anatomía + fisiología cardíaca (GC, presiones, ciclos) | N1 | 30 |
| D7 | vie 9-oct | Cardiovascular | Hemodinámica + regulación de PA + HTA | N1 | 30 |
| D8 | lun 12-oct | Cardiovascular | Curvas: PV loops, Wiggers, Starling | N2 | 40 |
| D9 | mar 13-oct | Cardiovascular | Electrofisiología: potenciales + ECG + bloqueos | N2 | 40 |
| D10 | mié 14-oct | Assessment | 🎯 NBME 25 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D11 | jue 15-oct | Cardiovascular | Taquiarritmias clínicas (FA, TSV, WPW, TV) | N2 | 40 |
| D12 | vie 16-oct | Cardiovascular | Antiarrítmicos + fármacos autonómicos CV | N3 | 40 |
| D13 | lun 19-oct | Cardiovascular | Aterosclerosis + isquemia + angina | N2 | 40 |
| D14 | mar 20-oct | Cardiovascular | SCA: STEMI/NSTEMI/inestable + manejo + complicaciones IAM | N2 | 40 |
| D15 | mié 21-oct | Cardiovascular | Insuficiencia cardíaca + shock + fármacos IC | N2 | 40 |
| D16 | jue 22-oct | Cardiovascular | Valvulopatías + soplos + endocarditis · miocardiopatías + pericardio + congénitas | N2 | 40 |
| D17 | vie 23-oct | Respiratory | Fisiología pulmonar: volúmenes + compliance + hemoglobina | N1 | 30 |
| D18 | lun 26-oct | Respiratory | V/Q + gradiente A-a + hipoxemia/hipoxia | N1 | 30 |
| D19 | mar 27-oct | Respiratory | Obstructivas: asma + EPOC + PFTs + broncodilatadores | N2 | 40 |
| D20 | mié 28-oct | Respiratory | Restrictivas + intersticiales + ocupacionales | N2 | 40 |
| D21 | jue 29-oct | Respiratory | Neumonía + TBC + absceso | N2 | 40 |
| D22 | vie 30-oct | Respiratory | TEP/TVP + HTP + ARDS + cáncer de pulmón | N3 | 40 |
| D23 | lun 2-nov | Renal | Nefrona + filtración + clearance + FG | N1 | 30 |
| D24 | mar 3-nov | Renal | Transporte tubular + diuréticos (sitio de acción) | N1 | 30 |
| D25 | mié 4-nov | Assessment | 🎯 NBME 26 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D26 | jue 5-nov | Renal | Electrolitos completos: Na/agua + SIADH/DI + K + Ca + P | N2 | 40 |
| D27 | vie 6-nov | Renal | Ácido-base paso a paso + compensaciones + GAP | N3 | 40 |
| D28 | lun 9-nov | Renal | Glomerulares: nefrítico vs nefrótico (patrones) | N2 | 40 |
| D29 | mar 10-nov | Renal | AKI (pre/intra/post) + ERC + litiasis + poliquistosis | N2 | 40 |
| D30 | mié 11-nov | Gastrointestinal | Fisiología GI: secreciones + hormonas + motilidad | N1 | 30 |
| D31 | jue 12-nov | Gastrointestinal | Esófago + estómago: ERGE, acalasia, úlcera, H. pylori, Ca | N1 | 30 |
| D32 | vie 13-nov | Gastrointestinal | Intestino delgado: malabsorción + celiaquía + EII | N3 | 40 |
| D33 | lun 16-nov | Gastrointestinal | Colon: pólipos + CCR (vías) + diverticular + isquemia | N2 | 40 |
| D34 | mar 17-nov | Gastrointestinal | Hígado I: LFTs + bilirrubina/ictericias + hepatitis | N2 | 40 |
| D35 | mié 18-nov | Gastrointestinal | Hígado II: cirrosis + complicaciones + HCC + hereditarias | N2 | 40 |
| D36 | jue 19-nov | Gastrointestinal | Biliar + páncreas: litiasis, colecistitis, pancreatitis, Ca | N2 | 40 |
| D37 | vie 20-nov | Endocrine | Ejes hipotálamo-hipófisis + feedback (1º vs 2º vs 3º) | N1 | 30 |
| D38 | lun 23-nov | Endocrine | Tiroides: síntesis + hiper/hipo + tiroiditis + Ca | N1 | 30 |
| D39 | mar 24-nov | Endocrine | Suprarrenal: Cushing / Addison / CAH / feocromocitoma | N2 | 40 |
| D40 | mié 25-nov | Assessment | 🎯 NBME 27 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D41 | jue 26-nov | Endocrine | DM 1 y 2: fisiopatología + DKA/HHS + tratamiento (insulinas, ADO, GLP-1/SGLT2) | N2 | 40 |
| D42 | vie 27-nov | Endocrine | Calcio/PTH + MEN + patología hipofisaria | N3 | 40 |
| D43 | lun 30-nov | Nervous System | Neuroanatomía localizadora + vías ascendentes/descendentes | N1 | 30 |
| D44 | mar 1-dic | Nervous System | Médula espinal: síndromes + Brown-Séquard | N1 | 30 |
| D45 | mié 2-dic | Nervous System | Tronco + pares craneales + reflejos | N2 | 40 |
| D46 | jue 3-dic | Nervous System | SNA + fármacos autonómicos (completo) | N2 | 40 |
| D47 | vie 4-dic | Nervous System | Ictus: territorios + isquémico/hemorrágico + HSA | N3 | 40 |
| D48 | lun 7-dic | Nervous System | Convulsiones + antiepilépticos | N2 | 40 |
| D49 | mar 8-dic | Nervous System | Demencias + Parkinson + trastornos del movimiento | N2 | 40 |
| D50 | mié 9-dic | Nervous System | EM/desmielinizantes + meningitis + NMJ + tumores SNC | N2 | 40 |
| D51 | jue 10-dic | Hematology & Oncology | Anemias microcíticas: Fe + talasemias + frotis | N1 | 30 |
| D52 | vie 11-dic | Hematology & Oncology | Macro/normocíticas + hemólisis + drepanocitosis | N1 | 30 |
| D53 | lun 14-dic | Hematology & Oncology | Coagulación: cascada + PT/PTT + hemofilias + vWD | N2 | 40 |
| D54 | mar 15-dic | Hematology & Oncology | Plaquetas (PTI/PTT/SUH) + hipercoagulabilidad + CID | N2 | 40 |
| D55 | mié 16-dic | Assessment | 🎯 NBME 28 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D56 | jue 17-dic | Hematology & Oncology | Leucemias agudas y crónicas + mielodisplasia | N2 | 40 |
| D57 | vie 18-dic | Hematology & Oncology | Linfomas + mieloma + transfusión + fármacos onco — **viernes N4 (S12)**: 20-30Q timed mixtos de sistemas dominados + 10Q tutor | N4 | 40 |
| D58 | lun 21-dic | Microbiology / ID | Bacteriología general + genética bacteriana + Gram+ cocos | N1 | 30 |
| D59 | mar 22-dic | Microbiology / ID | Gram+ bacilos + anaerobios + Gram− cocos | N1 | 30 |
| D60 | mié 23-dic | Microbiology / ID | Gram− bacilos (entéricos + respiratorios) + zoonosis | N2 | 40 |
| D61 | jue 24-dic | Microbiology / ID | Micobacterias + espiroquetas + atípicas (Chlamydia/Mycoplasma) | N2 | 40 |
| D62 | lun 28-dic | Microbiology / ID | Virus DNA + herpes + hepatitis virales | N2 | 40 |
| D63 | mar 29-dic | Microbiology / ID | Virus RNA + VIH + arbovirus | N2 | 40 |
| D64 | mié 30-dic | Microbiology / ID | Hongos + parásitos + antimicrobianos (ATB/antifúngicos/antivirales) | N2 | 40 |
| D65 | lun 4-ene | Assessment | 🎯 NBME 29 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D66 | mar 5-ene | Reproductive | Embriología general + ciclo menstrual + hormonas repro | N1 | 30 |
| D67 | mié 6-ene | Reproductive | Embarazo: fisiología + preeclampsia + TORCH | N1 | 30 |
| D68 | jue 7-ene | Reproductive | Gineco-oncología: cérvix + endometrio + ovario | N2 | 40 |
| D69 | vie 8-ene | Reproductive | Mama + aparato masculino + próstata — **viernes N4 (S15)**: 20-30Q timed mixtos de sistemas dominados + 10Q tutor | N4 | 40 |
| D70 | lun 11-ene | Reproductive | ITS + anticoncepción + amenorreas + SOP | N2 | 40 |
| D71 | mar 12-ene | Musculoskeletal / Rheum | Artritis: AR/OA/gota/espondiloartropatías + autoanticuerpos | N1 | 30 |
| D72 | mié 13-ene | Assessment | 🎯 NBME 30 — cierre Fase A (07:15-11:00) + plan Fase B según gaps | N5 (hito) | 200 |
| D73 | jue 14-ene | Musculoskeletal / Rheum | LES + conectivopatías + vasculitis | N1 | 30 |
| D74 | vie 15-ene | Musculoskeletal / Rheum | Hueso (osteoporosis/Paget/tumores) + anatomía MSK high-yield (plexos, nervios) + dermato Step 1 — **viernes N4 (S16)**: 20-30Q timed mixtos de sistemas dominados + 10Q tutor | N4 | 40 |
| D75 | lun 18-ene | Psychiatry & Behavioral | Trastornos del ánimo + psicóticos + DSM esquema | N1 | 30 |
| D76 | mar 19-ene | Psychiatry & Behavioral | Ansiedad + personalidad + infancia (TDAH/autismo) + sustancias/toxidromes | N1 | 30 |
| D77 | mié 20-ene | Assessment | 🎯 UWSA2 — el predictor gold-standard (09:00-13:00) + revisión | N5 (hito) | 160 |
| D78 | jue 21-ene | Psychiatry & Behavioral | Psicofármacos: AD + antipsicóticos + litio + ansiolíticos | N2 | 40 |
| D79 | vie 22-ene | Psychiatry & Behavioral | Bioestadística + epidemiología + ética/comunicación (AMBOSS HY 155Q) — **viernes N4 (S17)**: 20-30Q timed mixtos de sistemas dominados + 10Q tutor | N4 | 40 |
| D80 | lun 25-ene | Biochemistry | Bioquímica HY (día doble): metabolismo glucólisis/TCA/CTE + glucógeno + lípidos · aminoácidos + ciclo de urea + errores innatos + vitaminas (SOLO high-yield: Palmerton = rutas completas son poco ROI) | N1 | 30 |
| D81 | mar 26-ene | Biochemistry | Cierre Fase A (día doble): biología molecular + genética (herencias, trinucleótidos) · farmacología general transversal PK/PD + toxicología + antídotos — **cierre de contenido**; el NBME 31 (D82) cae al día siguiente, sin banco de consolidación delante | N1 | 30 |
| D82 | mié 27-ene | Assessment | 🎯 NBME 31 (07:15-11:00) + decisión GO/NO-GO de fecha de examen | N5 (hito) | 200 |
| D83 | jue 28-ene | Sprint final | 🎯 NBME 32 (07:15-11:00) + revisión + repaso FA sistemas 1-5 | N5 (hito) | 200 |
| D84 | vie 29-ene | Banco intensivo | Random timed 2×40Q + revisión profunda + sistema débil #1 (según NBMEs) | N4 | 80 |
| D85 | lun 1-feb | Sprint final | 🎯 NBME 33 (07:15-11:00) + revisión + repaso FA sistemas 11-14 | N5 (hito) | 200 |
| D86 | mar 2-feb | Banco intensivo | Random timed 2×40Q + revisión + sistema débil #1 (First Aid + Anki) | N4 | 80 |
| D87 | mié 3-feb | Sprint final | 🎯 FREE 120 oficial (07:15-11:00) + logística del examen + cierre | N5 (hito) | 120 |
| D88 | jue 4-feb | Banco intensivo | Random timed 2×40Q + revisión + sistema débil #2 | N4 | 80 |
| D89 | vie 5-feb | Banco intensivo | Random timed 2×40Q + revisión + sistema débil #2 (Mehlman HY del sistema) | N4 | 80 |
| D90 | lun 8-feb | Banco intensivo | uWorld incorrects (2ª pasada) + sistema débil #3 | N5 | 80 |
| D91 | mar 9-feb | Banco intensivo | uWorld incorrects (2ª pasada) + sistema débil #3 | N5 | 80 |
| D92 | mié 10-feb | Banco intensivo | uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 1) | N5 | 80 |
| D93 | jue 11-feb | Banco intensivo | uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 2) | N5 | 80 |
| D94 | vie 12-feb | Sprint final | Repaso First Aid rápido sistemas 6-10 + Anki marathon + incorrects — **TAPER D-2 · ÚLTIMA SESIÓN DE BANCO**: solo Anki maduro + 20Q flagged ya vistos, nada nuevo · sáb 13 y dom 14-feb libres (solo Anki vencido) | N5 | 20 |
| D95 | lun 15-feb | Sprint final | Repaso rapid review First Aid (páginas finales) + Anki + laboratorio de dudas — **TAPER D-1 REAL · último día del plan**: sesión mínima solo por la mañana (≤2 h: Anki maduro/vencido + 20Q flagged con esquemas); tarde: permiso + 2 ID + bolsas Ziploc + ruta → **mar 16-feb examen** (al día siguiente) | N5 | 20 |
| — | **mar 16-feb** | **EXAMEN (target v5.17)** | Step 1 · 7 bloques × 40Q · plan de descansos de Alec (`USMLE_TAPER.examen`) · fuera de la ventana 25-29 ene (agendar/reprogramar Prometric; confirmar eligibility period) | — | 280 |

## Reglas de reprogramación

1. **Si se cae un día de contenido, TODO corre +1 día hábil** (mismo corrimiento determinista
   que ENCAPS: cada día sin estudiar = +1; así nació la v5.17: ni el 28, ni el 29 ni el 30-sep se estudiaron y D1
   pasó de lun 28-sep a jue 1-oct). El orden de subtemas nunca se altera.
2. 🆕 **REGLA (v5.15, 22-sep; aplicada por segunda vez en la v5.16, 26-sep, y por tercera en la v5.17, 30-sep): el corrimiento es RÍGIDO y los hitos corren CON el plan.**
   Hasta la v5.14 el principio era "los hitos NO se mueven": el simulacro era cita fija de calendario y
   solo cambiaba su D#. El efecto acumulado fue que **cada corrimiento le robaba días de contenido a cada
   NBME** (el NBME 25 bajó de D18 a D10 y el NBME 31 acabó pegado al cierre de temario). Desde la v5.15 se
   desplaza el plan ENTERO en bloque: **cada hito conserva su D# exacto y por tanto sus días de preparación
   por delante**, y cambia su fecha. Consecuencia visible: el día de la semana de cada hito depende del día en que caiga
   el D1 — en la v5.15 (D1 en miércoles) 9 pasaron a martes; en la v5.16 (D1 en lunes) 8 de los 12 volvieron a caer en
   viernes; en la v5.17 (D1 en jueves) **8 de los 12 caen en miércoles** (UWSA1 y NBME 32 en jueves; NBME 29 y NBME 33 en
   lunes; ninguno en viernes). El **UWSA1 sigue siendo el D1** (vie 11-sep → lun 14 → mar 15 → mié 16 → jue 17 → lun 21 → mié 23
   → lun 28-sep → **jue 1-oct**). **Herencia que NO se deshace**: el NBME 31 (D82) sigue siendo el día siguiente al cierre de
   contenido (D81), sin los 2 días de random timed delante (ahora D84 y D86).
3. **REGLA PERMANENTE (instrucción de Joseph, vigente desde la v5.8): NO se fusiona ni se recorta
   contenido.** Ni un tema ni un subtema queda atrás. El desfase se paga **alargando el plan por la
   cola** (D95 pasó de vie 22-ene → lun 25-ene → mar 26-ene → mié 27-ene → jue 28-ene → vie 29-ene → lun 1-feb → mié 3-feb →
   vie 5-feb → mié 10-feb → **lun 15-feb**), no comprimiendo el cierre de Fase A. La compresión de la v5.7 (4 días de cierre
   fusionados en 2 días dobles) **queda como está** — no se deshace, pero tampoco se repite. **Corolario v5.15 (vigente en
   v5.17)**: donde un plan tenía un final clavado (ENCAPS, MIR mantenimiento), se **AMPLÍAN días** en vez de perder sesiones.
4. El colchón real del plan: la holgura de Fase B y la semana de examen con ventana de 5 días
   (25-29 ene). **Ese colchón se agotó del todo en la v5.11, se rebasó en la v5.12, en la v5.13 el plan ya terminaba en febrero y en
   la v5.14 el NBME 31 quedó pegado al contenido**: en la v5.17 D94 cae el **vie 12-feb** y D95 el **lun 15-feb** (D-1 real), así que
   **el examen sigue fuera de la ventana: target mar 16-feb-2027, al día siguiente del D95** (Prometric: agendar/reprogramar;
   confirmar que el eligibility period cubre el 16-feb o extenderlo; plan B feb-mar, mismo eligibility period — ver gates). La
   única otra opción es **recortar temario (derogar la regla 3)** — decisión de Joseph. A partir de aquí **cada día extra de
   atraso mueve el examen un día hábil más (o exige recortar)**. **Con la v5.17 ya se consumieron 23 días hábiles de colchón
   desde el 31-ago.**
5. Sábados y domingos NO se estudia (régimen 31-ago; sostenibilidad > volumen). En la v5.17 el **sáb 13 y el dom 14-feb caen
   entre el D94 (vie 12-feb, última sesión de banco) y el D95 (lun 15-feb, D-1 real)** y son libres (solo Anki vencido, dormir);
   ⚠ **entre el D95 y el examen (mar 16-feb) no hay finde**: el ritual de test-day se hace la tarde del propio D95.
6. **REGLA de burnout (12-sep, tarde; divergencia Palmerton #29 → §E-7).** Si **2 hitos consecutivos con
   mínimo** quedan **bajo su mínimo on-track** (UWSA1/UWSA2 no cuentan) **y** hay síntomas (releer sin
   comprender, irritabilidad, indiferencia, descansos de 5 min que se vuelven de 1 h) → **3-5 días con SOLO
   Anki AM (30-45 min de tarjetas viejas) + sueño**; frenar QBank y toda adquisición. **Cada día parado = +1
   día hábil (regla 1)**: no se recorta ni se fusiona temario (regla 3) — en v5.17 eso implica mover el examen más allá del
   mar 16-feb, con los hitos corriendo detrás (regla 2). Se reanuda **por el gate del 80%**, no por la fecha; si el siguiente hito vuelve a quedar bajo mínimo →
   plan B de fecha (feb-mar, mismo eligibility period). En la app: `usmleScores.gateHito` → `'ALERTA BURNOUT'` + banner en `UsmleHub`.

## Semana de examen: taper D94 · finde libre · D95 = D-1 real · test day mar 16-feb (Palmerton §8.3-§8.4)

*(Implementado el 12-sep por la tarde — divergencia #22 / §E-5; remapeado el 22-sep a la v5.15, el 26-sep a la v5.16 y el 30-sep a la v5.17. Código: `USMLE_TAPER`,
`DAILY_META.examenTarget = '2027-02-16'`, `DAILY_META.descansoD1 = '2027-02-15'` en `usmleStep1Daily.ts`; los D94/D95 llevan
`franjaNota` y chip TAPER en Cola de hoy; D95 = D-1 muestra el ritual y el test day; Readiness → tarjeta "Taper y semana de examen".)*

| Día | Fecha | Protocolo | Q |
|-----|-------|-----------|---|
| desde D82 (NBME 31) | mié 27-ene | **Cese de lo nuevo**: cero preguntas nuevas, cero tarjetas nuevas; solo incorrects/flagged + AMBOSS 200 como repaso de lo ya visto; no repetir NBME ya hechos | — |
| **D92 · D93** | **mié 10 / jue 11-feb** | Últimos días de banco alojados en el sprint: uWorld incorrects + AMBOSS 200 Concepts (mitades 1 y 2) | 80 + 80 |
| **D94 · D-2 (última sesión de banco)** | **vie 12-feb** | Solo Anki **maduro** + 20Q flagged/incorrects ya vistos (sin bloque timed, sin AMBOSS) · repaso First Aid de esquemas (sistemas 6-10) · dormir ≥7 h ya desde hoy | 20 |
| **sáb 13 · dom 14** | sáb 13 / dom 14-feb | **Finde LIBRE entre el D94 y el D95** (`USMLE_TAPER.d94`): sin banco, solo Anki vencido, dormir. 🆕 En la v5.17 sí hay finde en el taper (en la v5.16 no lo había) | — |
| **D95 · D-1 REAL (último día del plan)** | **lun 15-feb** | **Sesión MÍNIMA solo por la mañana (≤2 h)** (`USMLE_TAPER.d95`/`.dMenos1`): Anki maduro/vencido + 20Q flagged con los mejores esquemas e imágenes · rapid review FA · cero preguntas nuevas, cero tarjetas nuevas, ningún bloque timed · PROHIBIDO temas densos y abrir First Aid "para ver cuánto sé" · **tarde: permiso impreso + digital, 2 ID con el nombre EXACTO, bolsas Ziploc numeradas, ruta al Prometric** · nada después de las 17:00 (journaling, ejercicio suave, visualización, cena con proteína) · somnífero nunca por primera vez · dormir ≥7-8 h | 20 |
| **EXAMEN** | **mar 16-feb** | Desayuno proteína + grasa (sin carbohidratos simples), el café de siempre · tutorial: auriculares y terminar (+15 min de descanso) · bloques 1-2 → 10 min · 3-4 → 10 min · 5 → almuerzo 20-30 min · 6 → 10 min · 7 · entre bloques las 40Q dejan de existir (nunca revisar ni abrir FA en el casillero) · nunca salir a mitad de bloque · post-test: premiarse | 280 |

Las franjas del Calendar no cambian en D94 (05:00 Anki · 07:15 · 11:00 siguen en pie); cambia el **volumen** (20Q) y el
**contenido** (nada nuevo). El sáb 13 y el dom 14-feb (entre D94 y D95) son libres; el D-1 (D95, lun 15-feb) es un día del plan
con sesión mínima solo por la mañana, y el examen es al día siguiente (mar 16-feb): entre el D95 y el examen no hay finde.
✅ **Google Calendar (RE-FECHADO el 30-sep a la v5.17)**: las 6 series USMLE L-V principales siguen terminando el vie 29-ene
(UNTIL 20270130), que en la v5.17 es el **D84**, y las 6 series de EXTENSIÓN v5.17 (RECREADAS el 30-sep con delete+create; las de
la v5.16 `3er7vtmr…`/`pi1ohr2p…`/`a1rdhou6…`/`la2i0lgl…`/`4cip5bq1…`/`gg60as9h…` y la de ENCAPS `0bv3ef0d…` ya no existen) cubren
**D85-D93 = lun 1 → jue 11-feb** (RRULE FREQ=WEEKLY;UNTIL=20270212T045959Z;BYDAY=MO,TU,WE,TH,FR): ANKI AM 05:00
`n3k670e5bpgoh3s7cgslnupsis` · repaso 07:15 `pokf56lrcatqebo166kcfopdds` · pre-test 08:15 `i2c8njgrppkn3hjjq1pgrefst0` · DEEP
PRIME `1klod6lr1kcfccd7vmica7oboc` · 30Q `7ejpqdtl5rq4esmii3n0usatuc` · eval 18:00 `mlosps42anhc6p4mropner1oqo`. El D94 (vie
12-feb 07:15-12:00, `neboplchsaua4snj39nrl480nc`), el D95 (lun 15-feb 05:00-12:00, `n90bdqhohadu1eqbctv148dn28`) y el EXAMEN (mar
16-feb 07:00-16:00, `oinh139dsnbuma9r3kfu56dhkc`) llevan sus propios overlays, re-fechados con los ids conservados; los 12 hitos
también (ids en la tabla canónica v5.17). ENCAPS 16:15 se amplió otra vez (fin **mié 10-feb**, antes vie 5-feb; extensión lun 1
→ mié 10-feb, UNTIL 20270211T045959Z, `upqrbgai3hot54s5bvqp5c4l64`) y la REVISIÓN SEMANAL (`th5utf73brht5g0lkt87hd4940`, sáb
07:15 desde el sáb 3-oct = S1 hasta el sáb 20-feb = S21 cierre D95 + post-mortem) solo cambió de descripción (UNTIL sin cambio).
Lo que sigue A VERIFICAR (12-sep): repasos 200-300/día en el cierre (cifra del studio guide) y
el costo del Free 120 en el Prometric de Lima ($155 internacional según el cuaderno). **Decisión pendiente de Joseph (30-sep)**:
rendir el **mar 16-feb** (agendar/reprogramar Prometric + confirmar eligibility period) o **recortar temario** para volver atrás.

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
- Free 120 actual la última semana con ≥70% (heurística comunitaria) — en v5.17 es **D87
  (mié 3-feb-2027; desde la v5.15 corre con el plan en vez de quedar clavado por fecha; D-13 del examen; abre la Fase C)**, idealmente rendido en el MISMO Prometric del
  examen (Palmerton: *familiarity breeds calm*).

**Logística ECFMG/Prometric** (empezar en AGOSTO, no después):
- Abrir cuenta ECFMG + verificación de credenciales con la universidad peruana YA (tarda semanas).
- El eligibility period (~3 meses) se elige al aplicar; hay UNA extensión contigua pagada.
  **Aplicar recién cuando la data NBME lo respalde** (gate de fines de noviembre), eligiendo
  período ene-mar 2027 → si hay que correr a feb-mar, es el MISMO período, sin costo.
  🔴 **v5.17: confirmar que el eligibility period elegido CUBRE el mar 16-feb-2027** (el target ya no está en enero); si el
  período aplicado terminara antes, usar la extensión contigua o elegir feb-abr al aplicar.
- Prometric se agenda máximo 6 meses antes; reprogramar dentro de los 45 días previos cuesta fee.
  **Agendar el MAR 16-FEB-2027** (target v5.17), no el vie 12-feb (que ahora es el D94, última sesión de banco) ni el lun 15-feb (D95 = D-1).
  Si ya estaba agendado el 29-ene, el 2-feb, el 4-feb, el 8-feb o el 11-feb, **reprogramar** (con fee si se hace dentro de los 45 días previos → hacerlo YA, en
  septiembre-octubre). Cada corrimiento adicional obliga a reprogramar otro día hábil más (o a recortar temario).
- Gate 1 (~30-nov, tras NBME 27 D40 mié 25-nov y antes de NBME 28 D55 mié 16-dic): tendencia positiva y ≥55% → aplicar
  eligibility period (que cubra el 16-feb) y agendar Prometric Lima para el mar 16-feb.
- Gate 2 (**lun 4-ene-2027, NBME 29 = D65**): <60% EPC → mover target a feb-mar dentro del mismo período.
- GO/NO-GO final: **NBME 31 (D82, mié 27-ene-2027, el día siguiente al cierre de contenido)** + **UWSA2 (D77, mié 20-ene-2027)** según el criterio vigente.

**Matemática de horas**: v5.17 = 95 días × 6h15 ≈ **594h** (bloque de mañana 5h30 ≈ 523h +
eval de 18:00 ≈ 71h). **Igual que en v5.7 → v5.16**: como esta vez tampoco se recortó contenido sino
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
