# CALENDARIO 5 MESES — USMLE Step 1 v5.19 (S1 semana del 5-oct-2026 → S20 semana del 15-feb-2027 · examen VIE 19-FEB-2027)

Plan semana a semana derivado de [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) **v5.19**
(fuente de verdad: **D1 = MAR 6-OCT-2026 → D95 = JUE 18-FEB-2027, 95 días**; del 31-ago al 5-oct
no se estudió: 26 hábiles perdidos) + evidencia del agente macro:calendario-5-meses (USMLE Bulletin 2026-27, NBME,
ECFMG, Yousmle, Shemmassian). L-V únicamente; **sáb y dom LIBRES**; **skip 25-dic, 31-dic, 1-ene**.
Fases: **A contenido D1-D81 · B banco D82-D86 · C sprint D87-D95** (`faseDe`).
**Examen: el plan rebasa la ventana 25-29 ene 2027 (D94 = mié 17-feb = D-2, última sesión de banco; D95 = jue 18-feb = ÚLTIMO
DÍA del plan y D-1 REAL) → target VIE 19-FEB-2027, FUERA de la ventana y al día siguiente del D95**; en la v5.19, como en la
v5.18, NO hay fin de semana entre el taper y el examen (el sáb 13 y el dom 14-feb son un finde normal del plan, entre el D91
vie 12-feb y el D92 lun 15-feb); el D-1 (jue 18-feb) es sesión mínima por la mañana + ritual de test-day.
*(v5.18: D1 lun 5-oct → D95 mié 17-feb, examen jue 18-feb.)*

> **v5.18 → v5.19 (5-oct-2026) · CORRIMIENTO RÍGIDO (5.º)**: tampoco se estudió el lun 5 de octubre → D1 corrió de lun
> 5-oct a **mar 6-oct** (+1 día hábil; decimoctavo corrimiento desde el 31-ago: 31-ago→5-oct = 26 hábiles perdidos).
> **Misma regla de Joseph que en la v5.15-v5.18**, con una cláusula explícita nueva («Todo inicia a partir del 6 … corre nomás
> las fechas … y alarga un día más la fecha de término. No elimines exámenes, evaluaciones que ya habías programado»): **el
> corrimiento es RÍGIDO** — se desplaza el plan ENTERO (contenido **y** los 12 hitos) en bloque, **no se toca ningún tema**,
> donde un plan tenía un final clavado **se AMPLÍAN días** en vez de perder sesiones y **ninguna evaluación ya programada se
> borra: se RE-FECHA**. Sigue vigente la regla permanente: **no se fusiona ni se recorta NADA**; el temario sale 1:1 y el
> desfase se absorbe **alargando el final del plan** (D95 pasa de mié 17-feb a **jue 18-feb-2027**). Contenido verificado: el
> multiset de temas vs la v5.18 da **dif 0** (95 días, mismo orden, 5560Q).
>
> 🆕 **Los hitos siguen sin estar anclados por fecha** (regla de la v5.15): **corren con el plan y conservan su D# exacto**,
> así que ningún NBME pierde preparación. Con el D1 en **martes**, **8 de los 12 hitos caen en LUNES** (NBME 25 19-oct, 26
> 9-nov, 27 30-nov, 28 21-dic, 30 18-ene, UWSA2 25-ene, NBME 31 1-feb y Free 120 8-feb); el UWSA1 (D1, 6-oct) y el NBME 32
> (2-feb) caen en martes, y el NBME 29 (jue 7-ene, por los saltos del 25-dic, 31-dic y 1-ene) y el NBME 33 (4-feb) en jueves.
> **Ningún viernes es hito**: los 15 viernes hábiles de la Fase A quedan en **7 N3 + 7 N1 + 1 N4** (v5.18: 8 viernes de Fase A
> sin hito = 5 N3 + 3 N1 + 0 N4, más 6 con hito).
>
> **El UWSA1 sigue moviéndose con el D1** (vie 11 → lun 14 → mar 15 → mié 16 → jue 17 → lun 21 → mié 23 → lun 28-sep →
> jue 1-oct → lun 5-oct → **mar 6-oct = D1**: baseline el primer día, como prescribe Palmerton). El **primer día de CONTENIDO
> es el mié 7-oct = D2** (Fundamentos, Pathoma 1-2); Inmuno va el vie 9 y el lun 12-oct (D4-D5) y Cardio arranca el mar
> 13-oct (D6). Las semanas de esta tabla (y las de Home y la revisión semanal) son **semanas L-V de calendario**: **S1 = lun 5
> → vie 9-oct (4 días de plan: mar 6 → vie 9, D1-D4)** … S19 = 8-12 feb (D87-D91) · **S20 = 15-19 feb (D92-D95, 4 días) +
> examen vie 19-feb** → `STEP1_SEMANAS = 20` (`homeBriefing.ts`; sin cambio). (`semanaDe` del TS y el flag de viernes N4
> cuentan bloques de 7 días desde el D1, mar → lun.) Los 2 días dobles de Bioquímica vienen de la v5.7, conservan todos sus
> temas y quedan **juntos después del UWSA2** (D77 lun 25-ene = UWSA2 dentro de la Fase A · D78-D79 Psiquiatría/Biostats ·
> D80 jue 28-ene · D81 vie 29-ene = cierre de Fase A); **no se creó ningún día doble nuevo**.
>
> 🔴 **Herencia de la v5.14 que el corrimiento rígido conserva tal cual**: el NBME 31 GO/NO-GO (D82, **lun 1-feb**) cae el
> primer hábil tras el cierre de contenido (D81, vie 29-ene), con el finde 30-31 ene en medio y sin días de banco de
> consolidación delante. Los 2 random timed que lo precedían siguen en **D84 (mié 3-feb) y D86 (vie 5-feb)**, intercalados
> con NBME 32 (D83, mar 2-feb) y NBME 33 (D85, jue 4-feb): la **Fase B es D82-D86 (lun 1 → vie 5-feb, una semana L-V
> completa)** y la **Fase C arranca con el Free 120 (D87, lun 8-feb)**. **S17 = 25-29 ene (D77-D81: UWSA2 + Psiquiatría +
> Bioquímica)**, **S18 = 1-5 feb (D82-D86 = Fase B)**, **S19 = 8-12 feb (D87 Free 120 + D88-D91 banco)** y **S20 = 15-18 feb
> (D92-D93 banco · D94 taper D-2 · D95 taper D-1) + examen vie 19-feb**.
>
> 🔴 **Target de examen VIE 19-FEB-2027 (fuera de la ventana 25-29 ene, al día siguiente del D95)**:
> `DAILY_META.examenTarget = '2027-02-19'`, `descansoD1 = '2027-02-18'`, `examenVentana` marcada como superada. D94 (mié
> 17-feb) = **D-2, última sesión de banco** (`USMLE_TAPER.d94`: 20Q flagged + Anki maduro, nada nuevo); **D95 (jue 18-feb) =
> ÚLTIMO DÍA DEL PLAN y D-1 REAL** (`USMLE_TAPER.d95`/`.dMenos1`: sesión mínima ≤2 h por la mañana + ritual de test-day;
> nada después de las 17:00). ⚠ **Como en la v5.18 (y a diferencia de la v5.17), NO hay fin de semana libre dentro del
> taper**: D94, D95 y el examen son tres días seguidos (mié-jue-vie); el sáb 13 y el dom 14-feb caen antes, entre D91 y D92.
> **Joseph debe agendar/reprogramar el Prometric para el vie 19-feb y confirmar que su eligibility period cubre esa fecha**
> (si no: extenderlo); la alternativa es **recortar temario** para volver atrás (decisión suya, §E-5 de DIVERGENCIAS).
> ⚠ **Desde hoy, cada día no estudiado mueve el examen un día hábil más (o exige recortar temario).**
> ⚠ **Conflictos v5.19 (decisiones de Joseph)**: la víspera (jue 18-feb = D95) coincide con el pitch v5 de AURUM, el Tier C de
> MIR (Oncología, modo reducido) y el átomo d48 de Derma (opcional, corto, antes de las 17:00); el día del examen (vie 19-feb)
> coincide con el hito X-3 de Research y el D96 de AURUM (`DATA/REESTRUCTURACION_31AGO_2026.md` §22.6).
>
> *(Histórico v5.18, 3-oct: D1 = lun 5-oct → D95 = mié 17-feb, examen jue 18-feb sin finde en medio; 8 hitos en viernes; N3 =
> D15, D20, D35, D45, D50 y ningún N4; S1 = 5-9 oct con 5 días … S20 = 15-19 feb. · v5.17, 30-sep: D1 = jue 1-oct → D95 = lun
> 15-feb, examen mar 16-feb con el finde 13-14 feb entre D94 y D95; 8 hitos en miércoles; N3 = D12, D22, D27, D32, D42, D47 y
> N4 = D57, D69, D74, D79; S1 = 28-sep → 2-oct … S21 = 15-19 feb.)*

| Sem | Lunes | Contenido (L-V) | Hito |
|-----|-------|-----------------|------|
| S1 | 5-oct | **Fundamentos** D2-D3 (mié-jue) · **Immunology** D4 (vie) | **UWSA1** (D1, mar 6-oct) · el lun 5-oct queda fuera del plan |
| S2 | 12-oct | **Immunology** D5 (lun) · **Cardiovascular** D6-D9 (mar-vie) | — |
| S3 | 19-oct | **Cardiovascular** D11-D14 (mar-vie) | **NBME 25** (D10, lun 19-oct) |
| S4 | 26-oct | **Cardiovascular** D15-D16 (lun-mar) · **Respiratory** D17-D19 (mié-vie) | — |
| S5 | 2-nov | **Respiratory** D20-D22 (lun-mié) · **Renal** D23-D24 (jue-vie) | — |
| S6 | 9-nov | **Renal** D26-D29 (mar-vie) | **NBME 26** (D25, lun 9-nov) |
| S7 | 16-nov | **Gastrointestinal** D30-D34 (lun-vie) | — (semana deload) |
| S8 | 23-nov | **Gastrointestinal** D35-D36 (lun-mar) · **Endocrine** D37-D39 (mié-vie) | — |
| S9 | 30-nov | **Endocrine** D41-D42 (mar-mié) · **Nervous System** D43-D44 (jue-vie) | **NBME 27** (D40, lun 30-nov) |
| S10 | 7-dic | **Nervous System** D45-D49 (lun-vie) | — |
| S11 | 14-dic | **Nervous System** D50 (lun) · **Hematology & Oncology** D51-D54 (mar-vie) | — |
| S12 | 21-dic | **Hematology & Oncology** D56-D57 (mar-mié) · **Microbiology / ID** D58 (jue) | **NBME 28** (D55, lun 21-dic) |
| S13 | 28-dic | **Microbiology / ID** D59-D61 (lun-mié) | — (semana deload) |
| S14 | 4-ene | **Microbiology / ID** D62-D64 (lun-mié) · **Reproductive** D66 (vie) | **NBME 29** (D65, jue 7-ene) |
| S15 | 11-ene | **Reproductive** D67-D70 (lun-jue) · **Musculoskeletal / Rheum** D71 (vie) | — |
| S16 | 18-ene | **Musculoskeletal / Rheum** D73-D74 (mar-mié) · **Psychiatry & Behavioral** D75-D76 (jue-vie) | **NBME 30** (D72, lun 18-ene) |
| S17 | 25-ene | **Psychiatry & Behavioral** D78-D79 (mar-mié) · **Biochemistry** D80-D81 (jue-vie) | **UWSA2** (D77, lun 25-ene) |
| S18 | 1-feb | **Banco intensivo** D84 (mié) · D86 (vie) | **NBME 31** (D82, lun 1-feb, GO/NO-GO) · **NBME 32** (D83, mar 2-feb) · **NBME 33** (D85, jue 4-feb) |
| S19 | 8-feb | **Banco intensivo** D88-D91 (mar-vie) | **FREE 120 oficial** (D87, lun 8-feb) |
| S20 | 15-feb | **Banco intensivo** D92-D93 (lun-mar) · **Sprint final** D94-D95 (mié-jue) | **EXAMEN** (vie 19-feb-2027, target v5.19) |

Fines de semana: **todos los sábados y domingos del plan están libres** (régimen 31-ago:
sostenibilidad > volumen). Únicos días hábiles saltados: **vie 25-dic-2026 (S12), jue 31-dic-2026
y vie 1-ene-2027 (S13)** — por eso S12 tiene 4 días y S13 solo 3. **S1 tiene 4 días** (D1 mar 6-oct = UWSA1 · D2-D4
contenido; el lun 5-oct queda fuera del plan), **S18 tiene 5 días** (D82 lun 1-feb = NBME 31 … D86 vie 5-feb), **S19 tiene 5
días** (D87 lun 8-feb = Free 120 … D91 vie 12-feb) y **S20 tiene 4 días** (D92 lun 15-feb · D93 mar 16-feb · D94 mié 17-feb ·
D95 jue 18-feb) más el examen el vie 19-feb. Semana de examen: lun 15-feb = D92 (AMBOSS mitad 1) · mar 16-feb = D93 (AMBOSS
mitad 2) · **mié 17-feb = D94 (D-2, última sesión de banco)** · **jue 18-feb = D95 = D-1 REAL (sesión mínima + ritual)** ·
**vie 19-feb examen (target)**; el sáb 13 y el dom 14-feb caen ANTES (entre D91 vie 12-feb y D92) y son un finde normal del
plan — en la v5.19, como en la v5.18, no hay finde libre entre el taper y el examen (en la v5.17 sí lo había, entre D94 y D95).

Desde Fase B (S18, lun 1-feb, D82 = NBME 31): al ANKI AM de las 05:00 se le suma el **STRESS SET diario 10Q/12min**
(Palmerton: últimas 2-3 semanas, ≥60% de contenido cubierto — entrena el primer instinto). El UWSA2 (lun 25-ene, D77)
cae todavía en la Fase A.

## Hitos en su semana (v5.19: los 12 corren CON el plan · D# intacto · fechas +1 hábil)

| # | Hito | Sem | Día | Fecha | Q |
|---|------|-----|-----|-------|---|
| 1 | **UWSA1** | S1 | **D1** | mar 6-oct-2026 | 160 |
| 2 | **NBME 25** | S3 | D10 | lun 19-oct-2026 | 200 |
| 3 | **NBME 26** | S6 | D25 | lun 9-nov-2026 | 200 |
| 4 | **NBME 27** | S9 | D40 | lun 30-nov-2026 | 200 |
| 5 | **NBME 28** | S12 | D55 | lun 21-dic-2026 | 200 |
| 6 | **NBME 29** | S14 | D65 | jue 7-ene-2027 | 200 |
| 7 | **NBME 30** | S16 | D72 | lun 18-ene-2027 | 200 |
| 8 | **UWSA2** | S17 | D77 | lun 25-ene-2027 | 160 |
| 9 | **NBME 31** | S18 | D82 | lun 1-feb-2027 | 200 |
| 10 | **NBME 32** | S18 | D83 | mar 2-feb-2027 | 200 |
| 11 | **NBME 33** | S18 | D85 | jue 4-feb-2027 | 200 |
| 12 | **FREE 120 oficial** | S19 | D87 | lun 8-feb-2027 | 120 |

Los 12 hitos suman **2240Q** de simulacro. Con el D1 en martes (v5.19) **8 de los 12 caen en lunes**
(NBME 25, 26, 27, 28 y 30, UWSA2, NBME 31 y Free 120); 2 caen en martes (**UWSA1**, D1: baseline el primer día del plan;
NBME 32, mar 2-feb) y 2 en jueves (NBME 29, jue 7-ene, por los saltos del 25-dic, 31-dic y 1-ene; NBME 33, jue 4-feb);
**ninguno en viernes** (v5.18: 8 en viernes).
El **NBME 29 (D65, jue 7-ene)** es el primer hito de 2027: Micro (D58-D64) queda partido por el fin de año (jue 24-dic → mié
6-ene) y cierra la víspera del NBME. El Free 120 (lun 8-feb) queda a **D-11 del examen** (vie 19-feb) y abre la Fase C.
**El NBME 31 (lun 1-feb, D82) sigue siendo el primer hábil tras el cierre de contenido (D81, vie 29-ene)**, con el finde 30-31
ene en medio: no hay banco de consolidación delante del GO/NO-GO (herencia de la v5.14 que el corrimiento rígido conserva,
porque los hitos mantienen su D#).
Semanas deload (lunes): **16-nov** (S7, tras el NBME 26 del lun 9-nov) y **28-dic** (S13, tras el NBME 28 del lun 21-dic) —
v5.18: 9-nov y 21-dic.

## 5 niveles UWorld por fase (Palmerton v3)

Cada día de `DIAS` lleva `nivelUW` (1-5) y `qDia` (Q uWorld objetivo). Regla madre: **no se sube de nivel sin ≥80% en 10Q
consecutivas del nivel actual (≤24-48 h)**; si <80% se repite el subtema (bloques de 5Q) y se audita el método. Las HORAS del
bloque no cambian; cambia el FORMATO de la consolidación de las 11:00 según el nivel del día.

| Nivel | Nombre | Formato | Q/día | Umbral para SUBIR | Dónde vive en el día | Fase |
|-------|--------|---------|-------|-------------------|----------------------|------|
| **1** | Subtema · tutor sin tiempo | Bloques de 5Q de UN solo subtema · modo tutor · sin reloj (aprender a leer: CCSN + SAQ + cover-the-options) | Palmerton 20-30Q/día → plan: 30Q (10 pre-test + 20 consolidación) | 80% en 10Q consecutivas del subtema, ≤24-48 h tras estudiarlo | 08:15 PRE-TEST del tema nuevo (siempre) · 11:00 los 2 primeros días de cada sistema | A |
| **2** | Subtema · timed | Bloques de 5Q del subtema · cronometrado (90 s/Q · tope 2 min: adivinar, marcar, avanzar) | Volumen creciente → plan: 40Q (10 + 30) | 80% en ≥3 subtemas distintos, ≥1 validado en <48 h | 11:00 CONSOLIDACIÓN desde el 3er día de cada sistema (subtemas ya validados) · 07:15: 5Q timed del subtema de AYER (1ª mitad del gate de 10Q) | A |
| **3** | Sistema completo · timed | Bloques de 10-20Q de TODO el sistema · timed (sin la "ventaja injusta" de saber el subtema) | Palmerton 40-50Q/día → plan: 40Q (10 pre-test + 20Q sistema + 10 tutor) | 80% en 20Q timed consecutivas del sistema | VIERNES sin NBME/UWSA a las 11:00 **hasta S10** (v5.19: D9 vie 16-oct y D14 vie 23-oct Cardio · D19 vie 30-oct Resp · D29 vie 13-nov Renal · D34 vie 20-nov GI · D39 vie 27-nov Endo · D49 vie 11-dic Neuro; los viernes D4 Inmuno, D24 Renal y D44 Neuro caen en 1.º-2.º día de sistema y quedan en nivel 1 · v5.18: D15/D20/D35/D45/D50): 20Q del sistema en curso, o del anterior si el sistema lleva <3 días · desde S11 el viernes pasa a nivel 4 | A |
| **4** | Sistemas mixtos · timed | Bloques de 20-30Q mezclando ≥3 sistemas dominados + el nuevo (saltar entre especialidades bajo presión) | Palmerton 50-70Q/día → plan: viernes N4 = 40Q (10 pre-test + 30Q mixtos timed) · Fase B: 2×40Q (80Q) | 80% en bloques mixtos de 20Q timed de ≥3 sistemas | 18:00 EVAL (10Q mixta timed) toda la Fase A como dosis diaria · **VIERNES sin hito desde S11 = 20-30Q mixtos timed a las 11:00 en vez de sistema único: en v5.19 hay UNO, el D54 vie 18-dic (Heme/Onc, S11; texto en `DIAS[].franjaNota`)** (vie 25-dic y vie 1-ene festivos · S14 vie 8-ene = D66, 1.er día de Repro → N1 · S15 vie 15-ene = D71, 1.er día de MSK → N1 · S16 vie 22-ene = D76, 2.º día de Psiquiatría → N1 · S17 vie 29-ene = D81, 2.º día doble de Bioquímica → N1; v5.18: ninguno · v5.17: 4, D57/D69/D74/D79) — el flag `VIERNES_N4_DESDE_SEMANA = 11` sigue como regla, no como lista (cuenta bloques de 7 días desde el D1, mar → lun: S11 = mar 15 → lun 21-dic) · **Fase B D84 · D86 + Fase C D88 · D89** (random timed 2×40Q + sistema débil) | A (dosis diaria + viernes desde S11) → B-C |
| **5** | Mixto completo 40Q · timed | Bloques de 40Q random · timed 60 min (90 s/Q) = simulación exacta del examen | Palmerton 80-100Q/día (máx. 2 bloques de 40) · hitos: UWSA 160Q · NBME 200Q · Free 120 | 80% sostenido (90% para 260+) · pase seguro = NBME ≥65% (≈95%) / ≥70% (≈99%) | 05:00 STRESS SET 10Q/12min (Fases B-C) · **UWSA2 (D77, dentro de la Fase A) + NBME 31 (D82, abre la Fase B) + NBME 32/33 (D83, D85)** y **D90 · D91 · D92 · D93** (incorrects 2ª pasada + AMBOSS 200 mitades 1-2, alojados en el sprint) · Fase C (Free 120 D87 + taper D94-D95) · todos los hitos = formato nivel 5 como MEDICIÓN, no como progresión | B → C (+ todos los hitos) |

**Regla determinista del generador** (no toca sistemas, hitos ni el total de 95 días; en la v5.19 las fechas corren en bloque, +1 hábil):
- Fase A: posición del día dentro de su sistema (sin contar Assessment) → **1º-2º día = nivel 1** (30Q = 10 pre-test + 20 consolidación en bloques 5Q tutor) · **viernes sin hito y ≥3º día = nivel 3 hasta S10** (40Q = 10 + 20 sistema completo timed + 10 tutor) · **viernes sin hito y ≥3º día desde S11 = nivel 4** (40Q = 10 pre-test + 20-30Q timed mixtos de sistemas dominados + 10 tutor; flag `VIERNES_N4_DESDE_SEMANA = 11`) · **resto = nivel 2** (40Q = 10 + 30 en bloques 5Q timed).
- Hitos (🎯): formato **nivel 5 como MEDICIÓN** (UWSA 160Q · NBME 200Q · Free 120 = 120Q), no como progresión.
- Fase A cierra con **D77 = UWSA2** (nivel 5, lun 25-ene), **D78 = Psicofármacos** (nivel 2, mar 26-ene), **D79 = Biostats** (nivel 2, mié 27-ene), **D80 = Bioquímica día doble 1** (nivel 1, jue 28-ene) y **D81 = Bioquímica día doble 2** (nivel 1, vie 29-ene: es viernes, pero 2.º día del sistema).
- Fase B (D82-D86): **D82 = NBME 31** (nivel 5 como medición, lun 1-feb, abre la fase el primer hábil tras el cierre de contenido) · **D83 = NBME 32** (mar 2-feb) y **D85 = NBME 33** (jue 4-feb) (nivel 5) · **D84 (mié 3-feb) y D86 (vie 5-feb) nivel 4** (2×40Q mixtos timed = 80Q, sistema débil #1).
- Fase C (D87-D95): **nivel 5** salvo **D88 (mar 9-feb) y D89 (mié 10-feb), nivel 4** (random timed + sistema débil #2 / Mehlman); **D90 (jue 11-feb), D91 (vie 12-feb), D92 (lun 15-feb) y D93 (mar 16-feb) siguen siendo días de banco** (incorrects 2ª pasada · AMBOSS 200 mitad 1 · mitad 2, 80Q cada uno) y los días sin simulacro son **taper** (`TAPER_ACTIVO`, 12-sep tarde): solo flagged/incorrects ya vistos + Anki maduro, cero preguntas y cero tarjetas nuevas (**D94 mié 17-feb = 20Q · D95 jue 18-feb = 20Q**).
- **La clasificación no depende de umbrales de FECHA** sino del **origen de la fila** (`bbCh` = `Banco` / `Sprint`): así la regla queda idéntica aunque el contenido se derrame hasta el 29-ene.
- La eval de las 18:00 (10Q mixta timed) es la **dosis diaria de nivel 4** durante toda la Fase A; los stress sets 10Q/12min (nivel 5) solo en Fases B-C a las 05:00.

### Distribución real recontada desde `DIAS` (v5.19 · 95 días)

| Fase | Días | Niveles | Q objetivo (`qDia`) |
|------|------|---------|------------------------|
| **A** · D1-D81 | 81 | N1×28 · N2×37 · N3×7 · N4×1 · N5×8 | 4160 |
| **B** · D82-D86 | 5 | N4×2 · N5×3 | 760 |
| **C** · D87-D95 | 9 | N4×2 · N5×7 | 640 |
| **Total** | **95** | **N1×28 · N2×37 · N3×7 · N4×5 · N5×18** | **5560** |

Desglose: **3320Q de trabajo diario** (83 días) + **2240Q de simulacros**
(9×200Q NBME + 2×160Q UWSA + 1×120Q Free 120). El total **5560Q es idéntico al de la v5.14 → v5.18**: el corrimiento
rígido no toca volumen ni contenido (el multiconjunto sistema/subtema es el mismo, verificado por `(system, sub)`: 95/95
biyectivo, dif 0).
Viernes de Fase A (**15, ninguno con hito**, siete más sin hito que en la v5.18 porque con el D1 en martes los hitos de Fase A
caen en lunes o jueves): D4 (9-oct) Immunology **N1** · **D9 (16-oct) Cardiovascular N3** · **D14 (23-oct) Cardiovascular
N3** · **D19 (30-oct) Respiratory N3** · D24 (6-nov) Renal **N1** · **D29 (13-nov) Renal N3** · **D34 (20-nov)
Gastrointestinal N3** · **D39 (27-nov) Endocrine N3** · D44 (4-dic) Nervous System **N1** · **D49 (11-dic) Nervous System
N3** · **D54 (18-dic) Hematology & Oncology N4** · D66 (8-ene) Reproductive **N1** · D71 (15-ene) Musculoskeletal / Rheum
**N1** · D76 (22-ene) Psychiatry & Behavioral **N1** · D81 (29-ene) Biochemistry **N1** (cierre de contenido).
Los que quedan en **N1** lo hacen porque su sistema lleva <3 días: ese viernes el bloque
de sistema completo timed se hace del sistema **anterior**. Cambio de niveles de la v5.18 → v5.19: al
correr todo +1 día hábil (D1 de lunes a martes) **los hitos salen de los viernes**, así que quedan siete viernes de nivel 3
(D9, D14, D19, D29, D34, D39, D49) y **un viernes de nivel 4, el D54** (vie 18-dic, S11, 4.º día de Heme/Onc; lleva su texto
en `franjaNota`); los de S14-S17 (D66, D71, D76, D81) abren sistema o son su 2.º día y quedan en N1, y el 25-dic y el 1-ene
son festivos. Cambian de nivel 13 días, todos con `qDia` 40 (D15 · D20 · D35 · D45 · D50: N3 → N2 · D9 · D14 · D19 · D29 ·
D34 · D39 · D49: N2 → N3 · D54: N2 → N4). Totales: **N2×40 → N2×37**, **N3×5 → N3×7**, **N4×4 → N4×5** (D54 de Fase A +
D84/D86 de Fase B + D88/D89 de Fase C), N1×28 y N5×18 sin cambio. De los **17 viernes** del plan **ninguno es hito**: 15 son
de Fase A (arriba), 1 (D86, vie 5-feb) es random timed N4 de Fase B y 1 (D91, vie 12-feb) es banco N5 alojado en el sprint
(incorrects 2ª pasada + sistema débil #3).

### Nivel por día y semana (generado desde `DIAS`)

| Sem | Lunes | Niveles L-V (🎯 = hito) | Q objetivo/día |
|-----|-------|--------------------------|----------------|
| S1 | 5-oct | mar N5🎯 · mié N1 · jue N1 · vie N1 | 160/30/30/30 |
| S2 | 12-oct | lun N1 · mar N1 · mié N1 · jue N2 · vie N3 | 30/30/30/40/40 |
| S3 | 19-oct | lun N5🎯 · mar N2 · mié N2 · jue N2 · vie N3 | 200/40/40/40/40 |
| S4 | 26-oct | lun N2 · mar N2 · mié N1 · jue N1 · vie N3 | 40/40/30/30/40 |
| S5 | 2-nov | lun N2 · mar N2 · mié N2 · jue N1 · vie N1 | 40/40/40/30/30 |
| S6 | 9-nov | lun N5🎯 · mar N2 · mié N2 · jue N2 · vie N3 | 200/40/40/40/40 |
| S7 | 16-nov | lun N1 · mar N1 · mié N2 · jue N2 · vie N3 | 30/30/40/40/40 |
| S8 | 23-nov | lun N2 · mar N2 · mié N1 · jue N1 · vie N3 | 40/40/30/30/40 |
| S9 | 30-nov | lun N5🎯 · mar N2 · mié N2 · jue N1 · vie N1 | 200/40/40/30/30 |
| S10 | 7-dic | lun N2 · mar N2 · mié N2 · jue N2 · vie N3 | 40/40/40/40/40 |
| S11 | 14-dic | lun N2 · mar N1 · mié N1 · jue N2 · vie N4 (D54 · viernes N4) | 40/30/30/40/40 |
| S12 | 21-dic | lun N5🎯 · mar N2 · mié N2 · jue N1 | 200/40/40/30 |
| S13 | 28-dic | lun N1 · mar N2 · mié N2 | 30/40/40 |
| S14 | 4-ene | lun N2 · mar N2 · mié N2 · jue N5🎯 · vie N1 | 40/40/40/200/30 |
| S15 | 11-ene | lun N1 · mar N2 · mié N2 · jue N2 · vie N1 | 30/40/40/40/30 |
| S16 | 18-ene | lun N5🎯 · mar N1 · mié N2 · jue N1 · vie N1 | 200/30/40/30/30 |
| S17 | 25-ene | lun N5🎯 · mar N2 · mié N2 · jue N1 · vie N1 | 160/40/40/30/30 |
| S18 | 1-feb | lun N5🎯 · mar N5🎯 · mié N4 · jue N5🎯 · vie N4 | 200/200/80/200/80 |
| S19 | 8-feb | lun N5🎯 · mar N4 · mié N4 · jue N5 · vie N5 | 120/80/80/80/80 |
| S20 | 15-feb | lun N5 · mar N5 · mié N5 (taper **D-2, última sesión de banco**) · jue N5 (taper **D-1 real**: sesión mínima AM + ritual) → **vie 19-feb EXAMEN** | 80/80/20/20 |

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
| D1 | mar 6-oct | Assessment | 🎯 UWSA1 — BASELINE (160Q, 09:00-13:00) + revisión completa por la tarde | N5 (hito) | 160 |
| D2 | mié 7-oct | Fundamentos | Pathoma 1-2: lesión celular + muerte celular + inflamación | N1 | 30 |
| D3 | jue 8-oct | Fundamentos | Pathoma 3: neoplasia (principios + carcinogénesis) · setup Anki FSRS | N1 | 30 |
| D4 | vie 9-oct | Immunology | Inmunidad innata/adaptativa + MHC + linfocitos T/B | N1 | 30 |
| D5 | lun 12-oct | Immunology | Hipersensibilidades I-IV + autoinmunidad + inmunodeficiencias | N1 | 30 |
| D6 | mar 13-oct | Cardiovascular | Anatomía + fisiología cardíaca (GC, presiones, ciclos) | N1 | 30 |
| D7 | mié 14-oct | Cardiovascular | Hemodinámica + regulación de PA + HTA | N1 | 30 |
| D8 | jue 15-oct | Cardiovascular | Curvas: PV loops, Wiggers, Starling | N2 | 40 |
| D9 | vie 16-oct | Cardiovascular | Electrofisiología: potenciales + ECG + bloqueos | N3 | 40 |
| D10 | lun 19-oct | Assessment | 🎯 NBME 25 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D11 | mar 20-oct | Cardiovascular | Taquiarritmias clínicas (FA, TSV, WPW, TV) | N2 | 40 |
| D12 | mié 21-oct | Cardiovascular | Antiarrítmicos + fármacos autonómicos CV | N2 | 40 |
| D13 | jue 22-oct | Cardiovascular | Aterosclerosis + isquemia + angina | N2 | 40 |
| D14 | vie 23-oct | Cardiovascular | SCA: STEMI/NSTEMI/inestable + manejo + complicaciones IAM | N3 | 40 |
| D15 | lun 26-oct | Cardiovascular | Insuficiencia cardíaca + shock + fármacos IC | N2 | 40 |
| D16 | mar 27-oct | Cardiovascular | Valvulopatías + soplos + endocarditis · miocardiopatías + pericardio + congénitas | N2 | 40 |
| D17 | mié 28-oct | Respiratory | Fisiología pulmonar: volúmenes + compliance + hemoglobina | N1 | 30 |
| D18 | jue 29-oct | Respiratory | V/Q + gradiente A-a + hipoxemia/hipoxia | N1 | 30 |
| D19 | vie 30-oct | Respiratory | Obstructivas: asma + EPOC + PFTs + broncodilatadores | N3 | 40 |
| D20 | lun 2-nov | Respiratory | Restrictivas + intersticiales + ocupacionales | N2 | 40 |
| D21 | mar 3-nov | Respiratory | Neumonía + TBC + absceso | N2 | 40 |
| D22 | mié 4-nov | Respiratory | TEP/TVP + HTP + ARDS + cáncer de pulmón | N2 | 40 |
| D23 | jue 5-nov | Renal | Nefrona + filtración + clearance + FG | N1 | 30 |
| D24 | vie 6-nov | Renal | Transporte tubular + diuréticos (sitio de acción) | N1 | 30 |
| D25 | lun 9-nov | Assessment | 🎯 NBME 26 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D26 | mar 10-nov | Renal | Electrolitos completos: Na/agua + SIADH/DI + K + Ca + P | N2 | 40 |
| D27 | mié 11-nov | Renal | Ácido-base paso a paso + compensaciones + GAP | N2 | 40 |
| D28 | jue 12-nov | Renal | Glomerulares: nefrítico vs nefrótico (patrones) | N2 | 40 |
| D29 | vie 13-nov | Renal | AKI (pre/intra/post) + ERC + litiasis + poliquistosis | N3 | 40 |
| D30 | lun 16-nov | Gastrointestinal | Fisiología GI: secreciones + hormonas + motilidad | N1 | 30 |
| D31 | mar 17-nov | Gastrointestinal | Esófago + estómago: ERGE, acalasia, úlcera, H. pylori, Ca | N1 | 30 |
| D32 | mié 18-nov | Gastrointestinal | Intestino delgado: malabsorción + celiaquía + EII | N2 | 40 |
| D33 | jue 19-nov | Gastrointestinal | Colon: pólipos + CCR (vías) + diverticular + isquemia | N2 | 40 |
| D34 | vie 20-nov | Gastrointestinal | Hígado I: LFTs + bilirrubina/ictericias + hepatitis | N3 | 40 |
| D35 | lun 23-nov | Gastrointestinal | Hígado II: cirrosis + complicaciones + HCC + hereditarias | N2 | 40 |
| D36 | mar 24-nov | Gastrointestinal | Biliar + páncreas: litiasis, colecistitis, pancreatitis, Ca | N2 | 40 |
| D37 | mié 25-nov | Endocrine | Ejes hipotálamo-hipófisis + feedback (1º vs 2º vs 3º) | N1 | 30 |
| D38 | jue 26-nov | Endocrine | Tiroides: síntesis + hiper/hipo + tiroiditis + Ca | N1 | 30 |
| D39 | vie 27-nov | Endocrine | Suprarrenal: Cushing / Addison / CAH / feocromocitoma | N3 | 40 |
| D40 | lun 30-nov | Assessment | 🎯 NBME 27 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D41 | mar 1-dic | Endocrine | DM 1 y 2: fisiopatología + DKA/HHS + tratamiento (insulinas, ADO, GLP-1/SGLT2) | N2 | 40 |
| D42 | mié 2-dic | Endocrine | Calcio/PTH + MEN + patología hipofisaria | N2 | 40 |
| D43 | jue 3-dic | Nervous System | Neuroanatomía localizadora + vías ascendentes/descendentes | N1 | 30 |
| D44 | vie 4-dic | Nervous System | Médula espinal: síndromes + Brown-Séquard | N1 | 30 |
| D45 | lun 7-dic | Nervous System | Tronco + pares craneales + reflejos | N2 | 40 |
| D46 | mar 8-dic | Nervous System | SNA + fármacos autonómicos (completo) | N2 | 40 |
| D47 | mié 9-dic | Nervous System | Ictus: territorios + isquémico/hemorrágico + HSA | N2 | 40 |
| D48 | jue 10-dic | Nervous System | Convulsiones + antiepilépticos | N2 | 40 |
| D49 | vie 11-dic | Nervous System | Demencias + Parkinson + trastornos del movimiento | N3 | 40 |
| D50 | lun 14-dic | Nervous System | EM/desmielinizantes + meningitis + NMJ + tumores SNC | N2 | 40 |
| D51 | mar 15-dic | Hematology & Oncology | Anemias microcíticas: Fe + talasemias + frotis | N1 | 30 |
| D52 | mié 16-dic | Hematology & Oncology | Macro/normocíticas + hemólisis + drepanocitosis | N1 | 30 |
| D53 | jue 17-dic | Hematology & Oncology | Coagulación: cascada + PT/PTT + hemofilias + vWD | N2 | 40 |
| D54 | vie 18-dic | Hematology & Oncology | Plaquetas (PTI/PTT/SUH) + hipercoagulabilidad + CID — **viernes N4 (S11)**: 20-30Q timed mixtos de sistemas dominados + 10Q tutor | N4 | 40 |
| D55 | lun 21-dic | Assessment | 🎯 NBME 28 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D56 | mar 22-dic | Hematology & Oncology | Leucemias agudas y crónicas + mielodisplasia | N2 | 40 |
| D57 | mié 23-dic | Hematology & Oncology | Linfomas + mieloma + transfusión + fármacos onco | N2 | 40 |
| D58 | jue 24-dic | Microbiology / ID | Bacteriología general + genética bacteriana + Gram+ cocos | N1 | 30 |
| D59 | lun 28-dic | Microbiology / ID | Gram+ bacilos + anaerobios + Gram− cocos | N1 | 30 |
| D60 | mar 29-dic | Microbiology / ID | Gram− bacilos (entéricos + respiratorios) + zoonosis | N2 | 40 |
| D61 | mié 30-dic | Microbiology / ID | Micobacterias + espiroquetas + atípicas (Chlamydia/Mycoplasma) | N2 | 40 |
| D62 | lun 4-ene | Microbiology / ID | Virus DNA + herpes + hepatitis virales | N2 | 40 |
| D63 | mar 5-ene | Microbiology / ID | Virus RNA + VIH + arbovirus | N2 | 40 |
| D64 | mié 6-ene | Microbiology / ID | Hongos + parásitos + antimicrobianos (ATB/antifúngicos/antivirales) | N2 | 40 |
| D65 | jue 7-ene | Assessment | 🎯 NBME 29 (07:15-11:00) + revisión de errores + Anki de gaps | N5 (hito) | 200 |
| D66 | vie 8-ene | Reproductive | Embriología general + ciclo menstrual + hormonas repro | N1 | 30 |
| D67 | lun 11-ene | Reproductive | Embarazo: fisiología + preeclampsia + TORCH | N1 | 30 |
| D68 | mar 12-ene | Reproductive | Gineco-oncología: cérvix + endometrio + ovario | N2 | 40 |
| D69 | mié 13-ene | Reproductive | Mama + aparato masculino + próstata | N2 | 40 |
| D70 | jue 14-ene | Reproductive | ITS + anticoncepción + amenorreas + SOP | N2 | 40 |
| D71 | vie 15-ene | Musculoskeletal / Rheum | Artritis: AR/OA/gota/espondiloartropatías + autoanticuerpos | N1 | 30 |
| D72 | lun 18-ene | Assessment | 🎯 NBME 30 — cierre Fase A (07:15-11:00) + plan Fase B según gaps | N5 (hito) | 200 |
| D73 | mar 19-ene | Musculoskeletal / Rheum | LES + conectivopatías + vasculitis | N1 | 30 |
| D74 | mié 20-ene | Musculoskeletal / Rheum | Hueso (osteoporosis/Paget/tumores) + anatomía MSK high-yield (plexos, nervios) + dermato Step 1 | N2 | 40 |
| D75 | jue 21-ene | Psychiatry & Behavioral | Trastornos del ánimo + psicóticos + DSM esquema | N1 | 30 |
| D76 | vie 22-ene | Psychiatry & Behavioral | Ansiedad + personalidad + infancia (TDAH/autismo) + sustancias/toxidromes | N1 | 30 |
| D77 | lun 25-ene | Assessment | 🎯 UWSA2 — el predictor gold-standard (09:00-13:00) + revisión | N5 (hito) | 160 |
| D78 | mar 26-ene | Psychiatry & Behavioral | Psicofármacos: AD + antipsicóticos + litio + ansiolíticos | N2 | 40 |
| D79 | mié 27-ene | Psychiatry & Behavioral | Bioestadística + epidemiología + ética/comunicación (AMBOSS HY 155Q) | N2 | 40 |
| D80 | jue 28-ene | Biochemistry | Bioquímica HY (día doble): metabolismo glucólisis/TCA/CTE + glucógeno + lípidos · aminoácidos + ciclo de urea + errores innatos + vitaminas (SOLO high-yield: Palmerton = rutas completas son poco ROI) | N1 | 30 |
| D81 | vie 29-ene | Biochemistry | Cierre Fase A (día doble): biología molecular + genética (herencias, trinucleótidos) · farmacología general transversal PK/PD + toxicología + antídotos — **cierre de contenido**; el NBME 31 (D82) cae el primer hábil siguiente (lun 1-feb, con el finde 30-31 ene en medio), sin banco de consolidación delante | N1 | 30 |
| D82 | lun 1-feb | Assessment | 🎯 NBME 31 (07:15-11:00) + decisión GO/NO-GO de fecha de examen | N5 (hito) | 200 |
| D83 | mar 2-feb | Sprint final | 🎯 NBME 32 (07:15-11:00) + revisión + repaso FA sistemas 1-5 | N5 (hito) | 200 |
| D84 | mié 3-feb | Banco intensivo | Random timed 2×40Q + revisión profunda + sistema débil #1 (según NBMEs) | N4 | 80 |
| D85 | jue 4-feb | Sprint final | 🎯 NBME 33 (07:15-11:00) + revisión + repaso FA sistemas 11-14 | N5 (hito) | 200 |
| D86 | vie 5-feb | Banco intensivo | Random timed 2×40Q + revisión + sistema débil #1 (First Aid + Anki) | N4 | 80 |
| D87 | lun 8-feb | Sprint final | 🎯 FREE 120 oficial (07:15-11:00) + logística del examen + cierre | N5 (hito) | 120 |
| D88 | mar 9-feb | Banco intensivo | Random timed 2×40Q + revisión + sistema débil #2 | N4 | 80 |
| D89 | mié 10-feb | Banco intensivo | Random timed 2×40Q + revisión + sistema débil #2 (Mehlman HY del sistema) | N4 | 80 |
| D90 | jue 11-feb | Banco intensivo | uWorld incorrects (2ª pasada) + sistema débil #3 | N5 | 80 |
| D91 | vie 12-feb | Banco intensivo | uWorld incorrects (2ª pasada) + sistema débil #3 | N5 | 80 |
| D92 | lun 15-feb | Banco intensivo | uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 1) | N5 | 80 |
| D93 | mar 16-feb | Banco intensivo | uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 2) | N5 | 80 |
| D94 | mié 17-feb | Sprint final | Repaso First Aid rápido sistemas 6-10 + Anki marathon + incorrects — **TAPER D-2 · ÚLTIMA SESIÓN DE BANCO**: solo Anki maduro + 20Q flagged ya vistos, nada nuevo · mañana jue 18-feb = D-1 (sin finde en medio) | N5 | 20 |
| D95 | jue 18-feb | Sprint final | Repaso rapid review First Aid (páginas finales) + Anki + laboratorio de dudas — **TAPER D-1 REAL · último día del plan**: sesión mínima solo por la mañana (≤2 h: Anki maduro/vencido + 20Q flagged con esquemas); tarde: permiso + 2 ID + bolsas Ziploc + ruta → **vie 19-feb examen** (al día siguiente) | N5 | 20 |
| — | **vie 19-feb** | **EXAMEN (target v5.19)** | Step 1 · 7 bloques × 40Q · plan de descansos de Alec (`USMLE_TAPER.examen`) · fuera de la ventana 25-29 ene (agendar/reprogramar Prometric; confirmar eligibility period) | — | 280 |

## Reglas de reprogramación

1. **Si se cae un día de contenido, TODO corre +1 día hábil** (mismo corrimiento determinista
   que ENCAPS: cada día sin estudiar = +1; así nació la v5.19: el lun 5-oct no se estudió y D1
   pasó de lun 5-oct a mar 6-oct; antes, la v5.18: jue 1 y vie 2-oct → de jue 1-oct a lun 5-oct). El orden de subtemas nunca se altera.
2. 🆕 **REGLA (v5.15, 22-sep; aplicada por segunda vez en la v5.16, 26-sep, por tercera en la v5.17, 30-sep, por cuarta en la v5.18, 3-oct, y por quinta en la v5.19, 5-oct, con la cláusula explícita de no borrar evaluaciones ya programadas: se re-fechan): el corrimiento es RÍGIDO y los hitos corren CON el plan.**
   Hasta la v5.14 el principio era "los hitos NO se mueven": el simulacro era cita fija de calendario y
   solo cambiaba su D#. El efecto acumulado fue que **cada corrimiento le robaba días de contenido a cada
   NBME** (el NBME 25 bajó de D18 a D10 y el NBME 31 acabó pegado al cierre de temario). Desde la v5.15 se
   desplaza el plan ENTERO en bloque: **cada hito conserva su D# exacto y por tanto sus días de preparación
   por delante**, y cambia su fecha. Consecuencia visible: el día de la semana de cada hito depende del día en que caiga
   el D1 — en la v5.15 (D1 en miércoles) 9 pasaron a martes; en la v5.16 (D1 en lunes) 8 de los 12 volvieron a caer en
   viernes; en la v5.17 (D1 en jueves) 8 de los 12 cayeron en miércoles y ninguno en viernes; en la v5.18 (D1 de nuevo en
   lunes) 8 de los 12 volvieron a caer en viernes; en la v5.19 (D1 en martes) **8 de los 12 caen en lunes** (UWSA1 y NBME 32
   en martes; NBME 29 y NBME 33 en jueves; ninguno en viernes). El **UWSA1 sigue siendo el D1** (vie 11-sep → lun 14 → mar 15
   → mié 16 → jue 17 → lun 21 → mié 23 → lun 28-sep → jue 1-oct → lun 5-oct → **mar 6-oct**). **Herencia que NO se
   deshace**: el NBME 31 (D82) sigue siendo el primer hábil tras el cierre de contenido (D81; en la v5.19, con el finde
   30-31 ene en medio), sin los 2 días de random timed delante (ahora D84 y D86).
3. **REGLA PERMANENTE (instrucción de Joseph, vigente desde la v5.8): NO se fusiona ni se recorta
   contenido.** Ni un tema ni un subtema queda atrás. El desfase se paga **alargando el plan por la
   cola** (D95 pasó de vie 22-ene → lun 25-ene → mar 26-ene → mié 27-ene → jue 28-ene → vie 29-ene → lun 1-feb → mié 3-feb →
   vie 5-feb → mié 10-feb → lun 15-feb → mié 17-feb → **jue 18-feb**), no comprimiendo el cierre de Fase A. La compresión de la v5.7 (4 días de cierre
   fusionados en 2 días dobles) **queda como está** — no se deshace, pero tampoco se repite. **Corolario v5.15 (vigente en
   v5.19)**: donde un plan tenía un final clavado (ENCAPS, MIR mantenimiento), se **AMPLÍAN días** en vez de perder sesiones.
4. El colchón real del plan: la holgura de Fase B y la semana de examen con ventana de 5 días
   (25-29 ene). **Ese colchón se agotó del todo en la v5.11, se rebasó en la v5.12, en la v5.13 el plan ya terminaba en febrero y en
   la v5.14 el NBME 31 quedó pegado al contenido**: en la v5.19 D94 cae el **mié 17-feb** y D95 el **jue 18-feb** (D-1 real), así que
   **el examen sigue fuera de la ventana: target vie 19-feb-2027, al día siguiente del D95** (v5.18: jue 18-feb; Prometric:
   agendar/reprogramar; confirmar que el eligibility period cubre el 19-feb o extenderlo; plan B feb-mar, mismo eligibility period — ver gates). La
   única otra opción es **recortar temario (derogar la regla 3)** — decisión de Joseph. A partir de aquí **cada día extra de
   atraso mueve el examen un día hábil más (o exige recortar)**. **Con la v5.19 ya se consumieron 26 días hábiles de colchón
   desde el 31-ago** (v5.18: 25).
5. Sábados y domingos NO se estudia (régimen 31-ago; sostenibilidad > volumen). En la v5.19 el **sáb 13 y el dom 14-feb caen
   entre el D91 (vie 12-feb) y el D92 (lun 15-feb)** y son un finde normal del plan (libres); ⚠ **el D94 (mié 17-feb, última
   sesión de banco), el D95 (jue 18-feb, D-1 real) y el examen (vie 19-feb) son tres días seguidos, sin finde en medio**: el
   ritual de test-day se hace la tarde del propio D95 (como en la v5.18; en la v5.17 el finde 13-14 feb caía entre el D94 y el D95).
6. **REGLA de burnout (12-sep, tarde; divergencia Palmerton #29 → §E-7).** Si **2 hitos consecutivos con
   mínimo** quedan **bajo su mínimo on-track** (UWSA1/UWSA2 no cuentan) **y** hay síntomas (releer sin
   comprender, irritabilidad, indiferencia, descansos de 5 min que se vuelven de 1 h) → **3-5 días con SOLO
   Anki AM (30-45 min de tarjetas viejas) + sueño**; frenar QBank y toda adquisición. **Cada día parado = +1
   día hábil (regla 1)**: no se recorta ni se fusiona temario (regla 3) — en v5.19 eso implica mover el examen más allá del
   vie 19-feb, con los hitos corriendo detrás (regla 2). Se reanuda **por el gate del 80%**, no por la fecha; si el siguiente hito vuelve a quedar bajo mínimo →
   plan B de fecha (feb-mar, mismo eligibility period). En la app: `usmleScores.gateHito` → `'ALERTA BURNOUT'` + banner en `UsmleHub`.

## Semana de examen: taper D94 · D95 = D-1 real · test day vie 19-feb, sin finde en medio (Palmerton §8.3-§8.4)

*(Implementado el 12-sep por la tarde — divergencia #22 / §E-5; remapeado el 22-sep a la v5.15, el 26-sep a la v5.16, el 30-sep a la v5.17, el 3-oct a la v5.18 y el 5-oct a la v5.19. Código: `USMLE_TAPER`,
`DAILY_META.examenTarget = '2027-02-19'`, `DAILY_META.descansoD1 = '2027-02-18'` en `usmleStep1Daily.ts`; los D94/D95 llevan
`franjaNota` y chip TAPER en Cola de hoy; D95 = D-1 muestra el ritual y el test day; Readiness → tarjeta "Taper y semana de examen".)*

| Día | Fecha | Protocolo | Q |
|-----|-------|-----------|---|
| desde D82 (NBME 31) | lun 1-feb | **Cese de lo nuevo**: cero preguntas nuevas, cero tarjetas nuevas; solo incorrects/flagged + AMBOSS 200 como repaso de lo ya visto; no repetir NBME ya hechos | — |
| **D92 · D93** | **lun 15 / mar 16-feb** | Últimos días de banco alojados en el sprint: uWorld incorrects + AMBOSS 200 Concepts (mitades 1 y 2); el sáb 13 y el dom 14-feb, justo antes (entre D91 vie 12-feb y D92), son un finde normal del plan (libres) | 80 + 80 |
| **D94 · D-2 (última sesión de banco)** | **mié 17-feb** | Solo Anki **maduro** + 20Q flagged/incorrects ya vistos (sin bloque timed, sin AMBOSS) · repaso First Aid de esquemas (sistemas 6-10) · dormir ≥7 h ya desde hoy · mañana = D-1, sin finde en medio (`USMLE_TAPER.d94`) | 20 |
| **D95 · D-1 REAL (último día del plan)** | **jue 18-feb** | **Sesión MÍNIMA solo por la mañana (≤2 h)** (`USMLE_TAPER.d95`/`.dMenos1`): Anki maduro/vencido + 20Q flagged con los mejores esquemas e imágenes · rapid review FA · cero preguntas nuevas, cero tarjetas nuevas, ningún bloque timed · PROHIBIDO temas densos y abrir First Aid "para ver cuánto sé" · **tarde: permiso impreso + digital, 2 ID con el nombre EXACTO, bolsas Ziploc numeradas, ruta al Prometric** · nada después de las 17:00 (journaling, ejercicio suave, visualización, cena con proteína) · somnífero nunca por primera vez · dormir ≥7-8 h | 20 |
| **EXAMEN** | **vie 19-feb** | Desayuno proteína + grasa (sin carbohidratos simples), el café de siempre · tutorial: auriculares y terminar (+15 min de descanso) · bloques 1-2 → 10 min · 3-4 → 10 min · 5 → almuerzo 20-30 min · 6 → 10 min · 7 · entre bloques las 40Q dejan de existir (nunca revisar ni abrir FA en el casillero) · nunca salir a mitad de bloque · post-test: premiarse | 280 |

Las franjas del Calendar no cambian en D94 (05:00 Anki · 07:15 · 11:00 siguen en pie); cambia el **volumen** (20Q) y el
**contenido** (nada nuevo). El D94 (mié 17-feb), el D95 (jue 18-feb, D-1 real: sesión mínima solo por la mañana) y el examen
(vie 19-feb) son tres días seguidos: en la v5.19, como en la v5.18, no hay finde entre el taper y el examen (el sáb 13 y el
dom 14-feb caen antes, entre el D91 y el D92; en la v5.17 caían entre el D94 y el D95).
✅ **Google Calendar (RE-FECHADO el 5-oct a la v5.19)**: las 6 series USMLE L-V principales siguen terminando el vie 29-ene
(UNTIL 20270130), que en la v5.19 es el **D81** (cierre de contenido), y las 6 series de EXTENSIÓN v5.19 (RECREADAS el 5-oct;
las de la v5.18 `6sqksi5a…`/`rkpd36d1…`/`6r5qcog9…`/`jjado5ll…`/`ovdllf7o…`/`bc1o0n14…` y la de ENCAPS `jg71n1dc…` ya no
existen) cubren **D82-D93 = lun 1 → mar 16-feb** (RRULE FREQ=WEEKLY;UNTIL=20270217T045959Z;BYDAY=MO,TU,WE,TH,FR): ANKI AM
05:00 `45cmcfrfhegctp7qpnk2tqf5i8` · repaso 07:15 `f413f0clg153volao0fcrqfurk` · pre-test 08:15 `tsmqfh3a2nuls2893gs6s3r19s` ·
DEEP PRIME `knmf0o14vrecule8q6tda9q5po` · 30Q `s4t9ct7tpf9i3t9aijgi9oa4bc` · eval 18:00 `64lck9n9sim8vmfqdvg2qopi68`. El D94
(mié 17-feb 07:15-12:00, `neboplchsaua4snj39nrl480nc`), el D95 (jue 18-feb 05:00-12:00, `n90bdqhohadu1eqbctv148dn28`) y el
EXAMEN (vie 19-feb 07:00-16:00, `oinh139dsnbuma9r3kfu56dhkc`) llevan sus propios overlays, re-fechados con los ids conservados;
los 12 hitos también (ids en `DATA/REESTRUCTURACION_31AGO_2026.md` §22.5). ENCAPS 16:15 se amplió otra vez (fin **lun
15-feb**, antes vie 12-feb; extensión días 82-92 = lun 1 → lun 15-feb, UNTIL 20270216T045959Z, `m00blqfao14jd48v5ffbopm8p8`)
y la REVISIÓN SEMANAL (`6iog066kra2e07ue1d0f2osuvs`, sáb 07:15-07:35 desde el sáb 10-oct = S1 hasta el sáb 20-feb = S20 cierre
D92-D95 + post-mortem del examen del vie 19-feb, UNTIL 20270221T045959Z) conserva sus fechas: solo cambió su descripción a
v5.19. La víspera del examen es ahora el **jueves 18-feb**: las rutinas de jueves noche (GYM 19:00, BAILE 19:30) llevan el
aviso de D-1.
Lo que sigue A VERIFICAR (12-sep): repasos 200-300/día en el cierre (cifra del studio guide) y
el costo del Free 120 en el Prometric de Lima ($155 internacional según el cuaderno). **Decisión pendiente de Joseph (5-oct)**:
rendir el **vie 19-feb** (agendar/reprogramar Prometric + confirmar eligibility period) o **recortar temario** para volver atrás.

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
- Free 120 actual la última semana con ≥70% (heurística comunitaria) — en v5.19 es **D87
  (lun 8-feb-2027; desde la v5.15 corre con el plan en vez de quedar clavado por fecha; D-11 del examen; abre la Fase C)**, idealmente rendido en el MISMO Prometric del
  examen (Palmerton: *familiarity breeds calm*).

**Logística ECFMG/Prometric** (empezar en AGOSTO, no después):
- Abrir cuenta ECFMG + verificación de credenciales con la universidad peruana YA (tarda semanas).
- El eligibility period (~3 meses) se elige al aplicar; hay UNA extensión contigua pagada.
  **Aplicar recién cuando la data NBME lo respalde** (gate de fines de noviembre), eligiendo
  período ene-mar 2027 → si hay que correr a feb-mar, es el MISMO período, sin costo.
  🔴 **v5.19: confirmar que el eligibility period elegido CUBRE el vie 19-feb-2027** (el target ya no está en enero); si el
  período aplicado terminara antes, usar la extensión contigua o elegir feb-abr al aplicar.
- Prometric se agenda máximo 6 meses antes; reprogramar dentro de los 45 días previos cuesta fee.
  **Agendar el VIE 19-FEB-2027** (target v5.19; v5.18: jue 18-feb), no el mié 17-feb (que ahora es el D94, última sesión de banco) ni el jue 18-feb (D95 = D-1).
  Si ya estaba agendado el 29-ene, el 2-feb, el 4-feb, el 8-feb, el 11-feb, el 16-feb o el 18-feb, **reprogramar** (con fee si se hace dentro de los 45 días previos → hacerlo YA, en
  octubre). Cada corrimiento adicional obliga a reprogramar otro día hábil más (o a recortar temario).
- Gate 1 (~30-nov, con el NBME 27 D40 del lun 30-nov y antes del NBME 28 D55 lun 21-dic): tendencia positiva y ≥55% → aplicar
  eligibility period (que cubra el 19-feb) y agendar Prometric Lima para el vie 19-feb.
- Gate 2 (**jue 7-ene-2027, NBME 29 = D65**): <60% EPC → mover target a feb-mar dentro del mismo período.
- GO/NO-GO final: **NBME 31 (D82, lun 1-feb-2027, el primer hábil tras el cierre de contenido del vie 29-ene)** + **UWSA2 (D77, lun 25-ene-2027)** según el criterio vigente.

**Matemática de horas**: v5.19 = 95 días × 6h15 ≈ **594h** (bloque de mañana 5h30 ≈ 523h +
eval de 18:00 ≈ 71h). **Igual que en v5.7 → v5.18**: como esta vez tampoco se recortó contenido sino
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
