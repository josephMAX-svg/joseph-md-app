# DATA · USMLE Step 1 — Doc maestro v5.16 (reestructuración 27-ago · corrimientos RÍGIDOS 22-sep y 26-sep-2026 · niveles Palmerton)

**Step 1 es el bloque PRINCIPAL** (heredó las franjas ENCAPS de la mañana): 6h15/día L-V.
**D1 = LUN 28-sep-2026 → D95 = MIÉ 10-feb-2027 (95 días; del 31-ago al 25-sep no se estudió: 20 hábiles perdidos) ·
EXAMEN: D95 = mié 10-feb = ÚLTIMO DÍA DEL PLAN y D-1 REAL (sesión mínima AM + ritual de test-day) → target JUE 11-FEB-2027,
al día siguiente, SIN fin de semana en medio; D94 = mar 9-feb = última sesión de banco (D-2); el sáb 6 y el dom 7-feb son un
finde normal (libre) dentro del plan, entre el D92 (vie 5-feb) y el D93 (lun 8-feb).**
Sábados y domingos LIBRES. Skip extra: 25-dic, 31-dic, 1-ene.
Fuente de verdad (código): [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) **v5.16**
(`DAILY_META.totalDias = 95`, `inicio = '2026-09-28'`, `fin = '2027-02-10'`, `examenVentana = '2027-01-25 → 2027-01-29
(superada desde v5.12; v5.16: D95 = mié 10-feb)'`, `examenTarget = '2027-02-11'`, `descansoD1 = '2027-02-10'`).

> **Corrimiento v5.15 → v5.16 (26-sep-2026) · RÍGIDO (2.º).** Tampoco se estudiaron el mié 23, el jue 24 ni el vie 25 de
> septiembre, así que D1 pasó de mié 23-sep a **lun 28-sep** (regla del sistema: cada día sin estudiar = +1 día hábil). Es el
> **decimoquinto corrimiento** desde el 31-ago (31-ago→25-sep sin estudiar = 20 días hábiles perdidos).
> **Misma regla de Joseph que en la v5.15: el corrimiento es RÍGIDO.** Se desplaza el plan ENTERO — contenido **y** los 12
> hitos — en bloque (+3 hábiles): **no se toca ningún tema** y, donde un plan tenía un final clavado, **se AMPLÍAN días** en vez
> de perder sesiones. Sigue vigente la **REGLA PERMANENTE (v5.8): no se fusiona ni se recorta NADA**: el temario sale 1:1 y
> el desfase se absorbe **alargando el final del plan**, nunca comprimiendo días. D95 pasa de vie 5-feb a
> **mié 10-feb-2027**. Las metas, las franjas horarias y el temario no cambian.
>
> 🆕 **Los 12 hitos NBME/UWSA conservan su D# exacto y corren con el plan (+3 hábiles)** — regla estrenada en la v5.15 y que
> aquí se aplica por segunda vez: ningún NBME pierde días de contenido por delante. ⚠ Efecto colateral (inverso al de la
> v5.15): con el D1 en **lunes**, **8 de los 12 hitos vuelven a caer en viernes** (NBME 25, 26, 27, 28 y 30, UWSA2, NBME 31 y
> Free 120); NBME 29 cae en lunes (28-dic, por el salto del 25-dic), NBME 32 en lunes (25-ene) y NBME 33 en miércoles
> (27-ene). Los viernes de nivel 3/4 se reparten de nuevo (5 viernes N3 + **1** N4, §4b).
>
> **El UWSA1 vuelve a cambiar de fecha** (mié 23-sep, ya pasada sin estudiar → **lun 28-sep, sigue siendo
> el D1**: baseline el primer día, como prescribe Palmerton). El primer día de CONTENIDO (Fundamentos,
> Pathoma 1-2) es el **mar 29-sep = D2**; Cardio arranca el lun 5-oct (D6). Con el D1 en lunes, **las 20 semanas del plan
> (`semanaDe`) vuelven a coincidir con las de calendario**: S1 = lun 28-sep → vie 2-oct (D1-D5) … S19 = 1-5 feb
> (D88-D92) · **S20 = 8-10 feb (D93-D95, 3 días) + examen jue 11-feb**.
>
> 🔴 **Herencia de la v5.14 que el corrimiento rígido conserva tal cual: el contenido cierra el jue 21-ene (D81) y el
> NBME 31 GO/NO-GO cae AL DÍA SIGUIENTE (vie 22-ene = D82), sin días de banco de consolidación delante.** Los dos random
> timed siguen detrás de él en **D84 (mar 26-ene) y D86 (jue 28-ene)**, intercalados con NBME 32 (D83, lun 25-ene) y
> NBME 33 (D85, mié 27-ene): la **Fase B** es **D82-D86 = NBME 31 → NBME 32 → banco → NBME 33 → banco** y la **Fase C**
> arranca con el **Free 120 (D87, vie 29-ene)**.
> El examen se mueve al **JUE 11-FEB-2027**: el **D95 = mié 10-feb es el ÚLTIMO DÍA DEL PLAN y el D-1 REAL** (sesión mínima
> solo por la mañana: Anki maduro/vencido + 20Q flagged con los mejores esquemas, ≤2 h; tarde de ritual de test-day: permiso
> + 2 ID + Ziploc + ruta al Prometric; nada después de las 17:00 — `USMLE_TAPER.d95` = `USMLE_TAPER.dMenos1`), el **D94
> (mar 9-feb) es la última sesión de banco (D-2)** y **el examen es al día siguiente del D95: en la v5.16 NO hay fin de
> semana libre entre el taper y el examen** (el sáb 6 y el dom 7-feb son un finde normal del plan, entre D92 vie 5-feb y
> D93 lun 8-feb).
> **Target de examen: JUE 11-FEB-2027** (`DAILY_META.examenTarget = '2027-02-11'`,
> `USMLE_TAPER.examen`). **Joseph debe agendar/reprogramar el Prometric para el jue 11-feb y confirmar que su eligibility
> period cubre esa fecha** (si no: extenderlo). La alternativa es **recortar temario** para volver atrás — decisión suya,
> registrada en [`PALMERTON_DIVERGENCIAS_PLAN.md`](PALMERTON_DIVERGENCIAS_PLAN.md) §E-5 (sustituye a la decisión del 22-sep:
> rendir el lun 8-feb).
> ⚠ **Desde hoy, cada día no estudiado mueve el examen un día hábil más (o exige recortar temario).**
>
> Prueba dura del "nada se perdió": el multiconjunto de `(system, sub)` del nuevo `DIAS` es
> **idéntico** al de la v5.15 (0 filas perdidas y 0 filas nuevas en las 95) y, al ser un corrimiento rígido, el remapeo
> D#(v5.15) → D#(v5.16) es la **identidad**: los 95 días conservan su D# y solo cambia su fecha (+3 hábiles). El total de
> **5560Q objetivo no se movió**.

Plataforma de práctica: **Qbankly** (`qbankly.app`) — **abre SOLO en Microsoft Edge**
(Chrome con CDP la bloquea). Los links de la app ofrecen botón ◆ Edge + Chrome.


## 1. Fases

| Fase | Días | Fechas | Qué se hace | Niveles UWorld (Palmerton) |
|------|------|--------|-------------|----------------------------|
| **A · Contenido por sistemas** | D1-D81 | lun 28-sep → jue 21-ene | UWSA1 baseline (D1) + 1ª pasada completa del temario desde D2 + 30-40Q uWorld/día por nivel (= 1ª vuelta del banco entero) + 8 simulacros de hito (7 NBME/UWSA1 + **UWSA2 D77, que cae DENTRO de la Fase A**) · cierre de Bioquímica = D81 jue 21-ene | **1 → 3** (+ dosis diaria de 4 en la eval 18:00) · **viernes de nivel 4 desde S11** (en v5.16 UNO: D60 vie 18-dic Micro/ID, S12 — con el D1 en lunes los hitos vuelven a caer en viernes y las semanas del 25-dic y del 1-ene no tienen viernes hábil) |
| **B · Banco intensivo** | D82-D86 | vie 22-ene → jue 28-ene | **NBME 31 (D82, vie 22-ene, GO/NO-GO) la ABRE, el día siguiente al cierre de contenido** · NBME 32 (D83, lun 25-ene) · random timed 2×40Q + sistema débil #1 (D84 mar 26-ene) · NBME 33 (D85, mié 27-ene) · random timed 2×40Q + sistema débil #1 (D86 jue 28-ene) | **4 → 5** |
| **C · Sprint final** | D87-D95 | vie 29-ene → mié 10-feb | Free 120 (D87) · banco alojado en el sprint (D88 y D89 random timed + sistema débil #2/Mehlman · D90 y D91 incorrects 2ª pasada · D92 AMBOSS 200 mitad 1 · D93 mitad 2) · **taper explícito (D94 mar 9-feb = D-2, última sesión de banco, 20Q flagged + Anki maduro) → D95 mié 10-feb = ÚLTIMO DÍA y D-1 REAL (sesión mínima + ritual)** → **jue 11-feb examen, al día siguiente** (§3b) | **5** + NBME |

Días por fase (`faseDe` en el TS): **A = 81 · B = 5 · C = 9** (total 95). El corte A/B sigue en
**D81** (el **UWSA2 (vie 15-ene) es D77 y queda dentro de la Fase A**; los dos días dobles de Bioquímica, D80 mié 20-ene y
D81 jue 21-ene, cierran la fase íntegros y seguidos detrás del UWSA2). **Herencia de la v5.14 que el corrimiento rígido
conserva: el NBME 31 (D82, vie 22-ene) cae el día siguiente al cierre de contenido, sin días de banco de consolidación
delante** — la Fase B es **D82-D86 (5 días: 3 NBME + 2 random timed)** y el corte B/C queda en **D87** (Free 120, vie 29-ene,
abre la Fase C, de 9 días).

> 🆕 **Los cortes de fase no se recalculan en cada corrimiento**: como los hitos conservan su D#, la estructura D1-81 /
> D82-86 / D87-95 es exactamente la misma que en la v5.14 y la v5.15 y solo se desplazan las fechas.

## 2. Sistema → días → fechas (generado desde `DIAS` de `usmleStep1Daily.ts` v5.16)

| Sistema | Días | Fechas | Tier | Nº días |
|---------|------|--------|------|---------|
| Assessment | D1 · D10 · D25 · D40 · D55 · D65 · D72 · D77 · D82 | lun 28-sep → vie 22-ene | CORE | 9 |
| Fundamentos | D2-D3 | mar 29-sep → mié 30-sep | CORE | 2 |
| Immunology | D4-D5 | jue 1-oct → vie 2-oct | CORE | 2 |
| Cardiovascular | D6-D9 · D11-D16 | lun 5-oct → lun 19-oct | CORE | 10 |
| Respiratory | D17-D22 | mar 20-oct → mar 27-oct | CORE | 6 |
| Renal | D23-D24 · D26-D29 | mié 28-oct → jue 5-nov | CORE | 6 |
| Gastrointestinal | D30-D36 | vie 6-nov → lun 16-nov | CORE | 7 |
| Endocrine | D37-D39 · D41-D42 | mar 17-nov → mar 24-nov | CORE | 5 |
| Nervous System | D43-D50 | mié 25-nov → vie 4-dic | CORE | 8 |
| Hematology & Oncology | D51-D54 · D56-D57 | lun 7-dic → mar 15-dic | HIGH | 6 |
| Microbiology / ID | D58-D64 | mié 16-dic → jue 24-dic | HIGH | 7 |
| Reproductive | D66-D70 | mar 29-dic → mié 6-ene | HIGH | 5 |
| Musculoskeletal / Rheum | D71 · D73-D74 | jue 7-ene → mar 12-ene | HIGH | 3 |
| Psychiatry & Behavioral | D75-D76 · D78-D79 | mié 13-ene → mar 19-ene | HIGH | 4 |
| Biochemistry | D80-D81 | mié 20-ene → jue 21-ene | MED | 2 |
| Sprint final | D83 · D85 · D87 · D94-D95 | lun 25-ene → mié 10-feb | CORE | 5 |
| Banco intensivo | D84 · D86 · D88-D93 | mar 26-ene → lun 8-feb | CORE | 8 |

> **El D1 (lun 28-sep) es Assessment, no contenido**: el UWSA1 se movió a ese día (su fecha anterior,
> mié 23-sep, ya pasó) y el baseline ocupa el primer día del plan (exactamente lo que prescribe
> Palmerton); **Fundamentos empieza el mar 29-sep = D2**.
> Los demás huecos dentro de un sistema (D10, D25, D40, D55, D65, D72, D77, D82) son los otros
> **días de Assessment** (hitos, §3). Reparto (idéntico al de la v5.14 y la v5.15, porque el corrimiento rígido no cambia ningún D#): el NBME 25 (D10) sigue **partiendo
> Cardio** (D6-D9 delante: anatomía/fisiología, hemodinámica, curvas PV/Wiggers D8 y electrofisiología D9; **D11-D16** detrás:
> taquiarritmias, antiarrítmicos, aterosclerosis D13, SCA D14, IC + shock D15 y valvulopatías D16 lun 19-oct); el NBME 26 (D25)
> sigue **partiendo Renal** (nefrona D23 y transporte tubular D24 delante; electrolitos D26, ácido-base D27, glomerulares D28 y
> AKI/ERC/litiasis D29 detrás) y deja GI (D30-D36) íntegro detrás; el NBME 27 (D40) ahora **parte Endo** (ejes, tiroides y
> suprarrenal D37-D39 delante; DM D41 y calcio/PTH/MEN D42 detrás) y deja Neuro (D43-D50) íntegro detrás; el NBME 28 (D55)
> ahora **parte Heme/Onc** (anemias, hemólisis y plaquetas D51-D54 delante; leucemias D56 y linfomas/mieloma D57 detrás) y deja
> Micro (D58-D64) íntegro detrás; el NBME 29 (D65) ya **no parte Repro** (Micro íntegro delante; Repro D66-D70 íntegro detrás);
> el NBME 30 (D72) **parte MSK** (artritis D71 delante; LES/vasculitis D73 y hueso/anatomía D74 detrás, ya en 2027); el UWSA2
> (D77) **parte Psiquiatría** (ánimo/psicóticos D75 y ansiedad/personalidad D76 delante; psicofármacos D78 y bioestadística D79
> detrás); y **los dos días dobles de Bioquímica (D80 mié 20-ene · D81 jue 21-ene) van íntegros detrás del UWSA2** y cierran
> la Fase A. En Fase B, D82/D83/D85 son NBME 31/32/33 (`system = 'Assessment'` / `'Sprint final'`) y **D84 (mar 26-ene) y D86
> (jue 28-ene) son `system = 'Banco intensivo'`** (random timed 2×40Q + sistema débil #1); en Fase C, D87 es el Free 120 y **D88
> (lun 1-feb), D89 (mar 2-feb), D90 (mié 3-feb), D91 (jue 4-feb), D92 (vie 5-feb) y D93 (lun 8-feb) siguen siendo `system
> = 'Banco intensivo'`** (random timed + sistema débil #2 / Mehlman · incorrects 2ª pasada · AMBOSS 200 mitades 1 y 2)
> alojados dentro del sprint. Cada día trae: `sub`, `bbCh`/`bbVid` (Boards & Beyond), `uw` (subtema uWorld), `mat`/`matType`
> (material primario), `palm` (vídeo Palmerton al abrir sistema), `nivelUW` (1-5) y `qDia` (§4b).

### Qué se movió y qué NO en el corrimiento v5.16 (RÍGIDO)

**Nada se fusionó ni se recortó, y tampoco se tocó el reparto contenido↔hitos.** El desfase de 3 días hábiles se
pagó **por la cola del plan**: el plan entero (contenido + hitos) se desplazó en bloque y el examen corrió tres hábiles más.

| | v5.15 (D1 = mié 23-sep) | v5.16 (D1 = lun 28-sep) |
|---|---|---|
| Días del plan | 95 | **95** (mismo temario, 1:1) |
| Primer día | mié 23-sep-2026 = UWSA1; contenido en D2, jue 24-sep | **lun 28-sep-2026 = UWSA1** (movido otra vez: su fecha ya había pasado); contenido en D2, **mar 29-sep** |
| Último día | vie 5-feb-2027 = D95 = D-1 dentro del plan; D94 jue 4-feb última sesión de banco | **mié 10-feb-2027 = D95 = ÚLTIMO DÍA del plan y D-1 REAL** (sesión mínima AM + ritual); D94 mar 9-feb = última sesión de banco (D-2) |
| Target de examen | LUN 8-FEB-2027; sáb 6 y dom 7-feb libres entre el D95 y el examen | **JUE 11-FEB-2027, al día siguiente del D95**; **sin fin de semana entre el taper y el examen** (`examenTarget = '2027-02-11'` / `descansoD1 = '2027-02-10'`) |
| Semanas del plan | S1 = 23-25 sep (3 días) … S20 = 1-5 feb | **S1 = 28-sep → 2-oct (5 días, D1-D5)** … S19 = 1-5 feb (D88-D92) · **S20 = 8-10 feb (3 días, D93-D95) + examen jue 11-feb** |
| Días de contenido | cada uno en su fecha | **+3 días hábiles cada uno** |
| 12 hitos NBME/UWSA | los 12 corren con el plan: D# intacto, fecha +2 hábiles | **igual: D# INTACTO, fecha +3 hábiles** |
| Preparación por delante de cada NBME | congelada desde la v5.15 | **sigue congelada**: ningún NBME pierde días de contenido |
| Día de la semana de los hitos | 9 en martes · 2 en miércoles (UWSA1, NBME 32) · 1 en viernes (NBME 33) | **8 en viernes** (NBME 25-28, NBME 30, UWSA2, NBME 31, Free 120) · 3 en lunes (UWSA1, NBME 29, NBME 32) · 1 en miércoles (NBME 33) |
| Cierre de contenido vs NBME 31 | Biochem D80-D81 (vie 15 · lun 18-ene) → NBME 31 D82 mar 19-ene AL DÍA SIGUIENTE | **igual, corrido**: Biochem D80-D81 (mié 20 · jue 21-ene) → NBME 31 D82 **vie 22-ene**, al día siguiente y sin banco delante |
| Cortes de fase | A D1-81 · B D82-86 · C D87-95 | **idénticos** (los D# no se mueven) |
| Reparto Cardio/Renal/Endo/Heme/MSK/Psiquiatría vs hitos | partidos tal cual | **sin cambio alguno** (misma partición, otras fechas) |
| Viernes de nivel 3 | 5 (D8 y D13 Cardio · D28 Renal · D33 GI · D48 Neuro) | **5** (D15 Cardio · D20 Resp · D35 GI · D45 y D50 Neuro) |
| Viernes de nivel 4 | 2 (D53 Heme/Onc, S11 · D63 Micro/ID, S13) | **1** (D60 Micro/ID, S12) — los hitos vuelven a ocupar viernes y las semanas del 25-dic y del 1-ene no tienen viernes hábil |
| Viernes N1 (1.º-2.º día de sistema) | 8 (D3, D18, D23, D38, D43, D58, D75, D80) | **2** (D5 Inmuno · D30 GI) |
| Q objetivo totales | 5560 | **5560** (idéntico: la prueba aritmética de que no se recortó nada) |

Desde la v5.15 los 12 hitos **ya no están anclados por fecha** en el mapa `SIMS` del generador: se anclan a su **D#** y
corren con el plan, de modo que cada NBME conserva íntegros los días de contenido que lo preceden. Los días no-hito
se siguen consumiendo desde el array `POST_A` en los huecos libres. La clasificación de `nivelUW`/`qDia` depende del
**origen de la fila** (`bbCh` = `Banco` / `Sprint`), no de umbrales de fecha, así que la regla queda idéntica aunque
el contenido se derrame hasta el 21-ene.

## 3. Hitos NBME/UWSA (12) — v5.16: los 12 corren CON el plan · D# intacto · fechas +3 hábiles

| # | Hito | Día | Fecha | Q | Rol |
|---|------|-----|-------|---|-----|
| 1 | **UWSA1** | **D1** | **lun 28-sep-2026** | 160Q | **Baseline en el PRIMER día del plan** (esperar bajo, no asustarse). Movido desde el mié 23-sep (fecha ya pasada): sigue al D1 en cada corrimiento |
| 2 | **NBME 25** | D10 | vie 9-oct-2026 | 200Q | 1ª calibración real · parte el bloque Cardio (D11 taquiarritmias, D12 antiarrítmicos, D13 aterosclerosis, D14 SCA, D15 IC y D16 valvulopatías quedan detrás) |
| 3 | **NBME 26** | D25 | vie 30-oct-2026 | 200Q | Tendencia · parte Renal (D26 electrolitos, D27 ácido-base, D28 glomerulares y D29 AKI/ERC detrás); GI (D30-D36) va íntegro detrás |
| 4 | **NBME 27** | D40 | vie 20-nov-2026 | 200Q | Tendencia · parte Endo (D37-D39 delante; D41 DM y D42 calcio/PTH/MEN detrás); Neuro (D43-D50) íntegro detrás |
| 5 | **NBME 28** | D55 | vie 11-dic-2026 | 200Q | Tendencia · parte Heme/Onc (D51-D54 delante; D56 leucemias y D57 linfomas/mieloma detrás); Micro (D58-D64) íntegro detrás |
| 6 | **NBME 29** | D65 | lun 28-dic-2026 | 200Q | Micro (D58-D64) íntegro delante; Repro (D66-D70) íntegro detrás |
| 7 | **NBME 30** | D72 | vie 8-ene-2027 | 200Q | Primer hito de 2027 (con el corrimiento rígido ya no depende de los skips de fin de año); parte MSK (D71 artritis, jue 7-ene, delante; D73 LES/vasculitis y D74 hueso/anatomía detrás); Repro (D66-D70) cierra 2026 y Psiquiatría (D75-D76 · D78-D79), Biostats (D79) y los 2 días dobles de Biochem (D80-D81) van detrás |
| 8 | **UWSA2** | D77 | vie 15-ene-2027 | 160Q | Predictor de resistencia (la fecha la deciden los NBME) · **cae DENTRO de la Fase A** (parte Psiquiatría: D75-D76 delante, psicofármacos D78 y Biostats D79 detrás; los 2 días dobles de Bioquímica D80-D81 cierran la fase) |
| 9 | **NBME 31** | D82 | vie 22-ene-2027 | 200Q | **GO/NO-GO** · **abre la Fase B el día siguiente al cierre de contenido (D81 jue 21-ene): sin banco de consolidación delante** (herencia de la v5.14 que el corrimiento rígido conserva) |
| 10 | **NBME 32** | D83 | lun 25-ene-2027 | 200Q | Fase B (random timed D84 detrás) |
| 11 | **NBME 33** | D85 | mié 27-ene-2027 | 200Q | Fase B (random timed D86 detrás; cierra la fase) |
| 12 | **FREE 120 oficial** | D87 | vie 29-ene-2027 | 120Q | Abre la Fase C · idealmente en el Prometric real · D-13 del examen (jue 11-feb) |

Los 12 hitos suman **2240Q** de simulacro. Con el D1 en lunes (v5.16) **8 de los 12 vuelven a caer en viernes**
(NBME 25, 26, 27, 28 y 30, UWSA2, NBME 31 y Free 120); 3 caen en lunes (UWSA1 = D1; NBME 29, lun 28-dic, por el salto del
25-dic; NBME 32, lun 25-ene) y 1 en miércoles (NBME 33, D85 mié 27-ene).
**Las 12 fechas cambiaron con la v5.16 (+3 hábiles) y los 12 D# quedaron intactos** (misma regla que en la v5.15: es
exactamente lo contrario de lo que pasaba hasta la v5.14, fecha fija y D# a la baja). El **UWSA1** sigue re-anclado al D1
(lun 21-sep → mié 23-sep → lun 28-sep).

**Criterio GO (Step 1 es pass/fail): 2 NBME consecutivos ≥68% + UWSA2 "low risk" → confirmar
fecha.** (Palmerton: ≥65% ≈ 95% de probabilidad de aprobar; ≥70% ≈ 99% — el 68% doble queda en
el rango; mínimos on-track por hito en
[`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) Parte V.) Si NO se cumple: correr el
examen dentro del mismo eligibility period (feb-mar 2027) sin drama — un fail queda PARA
SIEMPRE en el transcript ECFMG (~1/3 de PDs nunca consideran un aplicante con fail en Step 1).
Detalle de gates y logística ECFMG/Prometric: [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md).

> ⚠ **Consecuencia del decimoquinto corrimiento sobre la semana del examen.** Con D95 = **mié 10-feb**, el
> D-1 sigue **dentro del plan** (fuera de la ventana 25-29 ene desde la v5.12) y **el examen es al día siguiente**: el target
> pasa al **JUE 11-FEB-2027** (`DAILY_META.examenTarget = '2027-02-11'`); el D94 (mar 9-feb) es la **última sesión de banco
> (D-2)** y el D95 (mié 10-feb, `descansoD1 = '2027-02-10'`) es la **sesión mínima del D-1 REAL** (§3b;
> `USMLE_TAPER.d94/.d95/.dMenos1/.examen` en el TS). **En la v5.16 no hay fin de semana libre entre el D95 y el examen**
> (el sáb 6 y el dom 7-feb son un finde normal del plan, entre D92 y D93). **Prometric: agendar/reprogramar para el jue 11-feb y confirmar que el eligibility period cubre esa fecha (si no,
> extenderlo)**; la única otra opción es **recortar temario** — decisión de Joseph. **Y desde aquí cada día perdido mueve el
> examen un día hábil más.**
> Segunda consecuencia (heredada, no nueva): **el NBME 31 GO/NO-GO (D82, vie 22-ene) cae el día siguiente al cierre de
> contenido (D81, jue 21-ene)**, con los 2 días de random timed detrás de él (D84 y D86).

## 3b. Semana de examen: taper D94 · D95 = D-1 real · test day jue 11-feb · protocolo de burnout (REGLA)

*(12-sep-2026, tarde — divergencias Palmerton #22 y #29 implementadas sin tocar horario, temario ni fechas; remapeadas el
26-sep a la v5.16. Fuente de cada paso: [`PALMERTON_METODO_COMPLETO.md`](PALMERTON_METODO_COMPLETO.md) §8.3-§8.4 y §9.12; código:
`USMLE_TAPER` y `DAILY_META.examenTarget / descansoD1` en `usmleStep1Daily.ts`, `BURNOUT_PROTOCOLO` + `gateHito` en `usmleScores.ts`.)*

| Día | Fecha | Qué se hace | Q | Franjas |
|-----|-------|-------------|---|---------|
| desde **D82** (NBME 31) | vie 22-ene | **Cese de lo nuevo**: cero preguntas nuevas y cero tarjetas nuevas (Palmerton: 1-2 semanas antes); solo incorrects/flagged + AMBOSS 200 como repaso de conceptos ya vistos; no repetir NBME ya hechos | — | sin cambio |
| **sáb 6 · dom 7** | sáb 6 · dom 7-feb | Finde normal del plan (entre D92 vie 5-feb y D93 lun 8-feb): sin banco; solo Anki vencido. ⚠ En v5.16 **no** es el finde previo al examen: el D-1 real es el D95 (mié 10-feb) | — | — |
| **D94 · D-2 (última sesión de banco)** | **mar 9-feb** | Solo Anki **maduro** + 20Q flagged/incorrects ya vistos (sin bloque timed, sin AMBOSS) · repaso First Aid de esquemas (sistemas 6-10) · dormir ≥7 h ya desde hoy | **20** | 05:00 · 07:15 · 11:00 |
| **D95 · D-1 REAL (último día del plan)** | **mié 10-feb** | **Sesión MÍNIMA solo por la mañana (≤2 h)**: Anki maduro/vencido + 20Q flagged con los mejores esquemas e imágenes · rapid review FA · cero preguntas nuevas, cero tarjetas nuevas, ningún bloque timed, no abrir First Aid "para ver cuánto sé" · **tarde: permiso impreso + digital, 2 ID con el nombre EXACTO del permiso, bolsas Ziploc numeradas (Break #1-#4), ruta al Prometric** · nada de estudio después de las 17:00 (journaling, ejercicio suave, visualización, cena con proteína) · somnífero **nunca por primera vez** esta noche · dormir ≥7-8 h, alarma y ruta comprobadas (`USMLE_TAPER.d95` = `.dMenos1`) | **20** | 05:00 · 07:15 (mínimo) |
| **EXAMEN** | **jue 11-feb** | Desayuno proteína + grasa, sin carbohidratos simples; el café de siempre · tutorial: comprobar auriculares y terminar (+15 min de descanso = 60) · bloques **1-2 seguidos → 10 min · 3-4 → 10 min · 5 → almuerzo 20-30 min · 6 → 10 min · 7** · entre bloques las 40Q dejan de existir; nunca revisar ni abrir FA en el casillero · nunca salir a mitad de bloque · post-test: premiarse | 280 | — |

El **D95 en Cola de hoy** muestra el D-1 y el test day (bloques `USMLE_TAPER.d95` / `.dMenos1` / `.examen`); Readiness los
repite en la tarjeta **Taper y semana de examen**. Los D94/D95 llevan chip **TAPER** y su nota de franja en
`DIAS[].franjaNota` (el `sub` no cambia: regla de no recortar contenido). **v5.16**: el taper es **mar 9 + mié 10-feb**, seguidos,
y el examen es el **jue 11-feb**, al día siguiente del D95 — en la v5.16 **no hay finde libre entre el taper y el examen** (el
sáb 6 y el dom 7-feb caen entre D92 y D93); volver a la ventana 25-29 ene exige recortar temario.

**Protocolo de burnout — REGLA (§E-7, ya no propuesta).** Si **2 hitos consecutivos con mínimo** (UWSA1/UWSA2 no
cuentan: no tienen mínimo) quedan **bajo su mínimo on-track** **y** hay síntomas (releer el mismo párrafo sin
comprender, irritabilidad extrema, indiferencia por el examen, descansos de 5 min que se vuelven de 1 h) →
**3-5 días con SOLO Anki AM (30-45 min de tarjetas viejas) + sueño**: frenar QBank, parar toda adquisición (vídeos,
temas, tarjetas nuevas), descanso activo (correr, journaling, meditación, cenas). **Cada día parado = +1 día hábil
en el plan** (`remap_inicio.js`): no se recorta ni se fusiona temario — y en v5.16 eso ya implica **mover el examen un
hábil más allá del jue 11-feb** (o recortar). Se reanuda **por el gate del 80%**, no por la fecha; si el siguiente hito vuelve
a quedar bajo mínimo → plan B de fecha (feb-mar 2027, mismo eligibility period). En la app: `usmleScores.gateHito(scores)`
devuelve `'ALERTA BURNOUT'` y `UsmleHub` pinta el banner con los 7 pasos en todas las pestañas (y la tarjeta **Gate de
hitos** en Readiness); 📏 Medición lo repite el día del segundo hito.

## 4. Franjas horarias (Google Calendar v5.2 · L-V · 6h15/día · `FRANJAS` en el TS)

**Las HORAS no cambiaron con el corrimiento v5.16** (ni con ninguno de los anteriores).

| Hora | Segmento | Nivel UW | Gate |
|------|----------|----------|------|
| 05:00–05:45 | ANKI AM (madrugada fresca · pasada principal FSRS · Good ≈90% / Again solo olvido real · ≤50 nuevas/día) · Fases B-C: + STRESS SET 10Q/12min (primer instinto, sin cambiar respuestas) | B-C: 5 | — |
| 07:15–08:15 | Repaso anclado multi-temporal D-1/D-3/D-7 + free recall (Anki restante) · VALIDACIÓN 24-48 h: 5Q timed del subtema de AYER (1ª mitad del gate de 10Q) | 2 | subtema de ayer ≥80% en las 10Q (5 aquí + 5 en la consolidación) → validado · <80% → 5Q más del subtema antes de pasar a otro |
| 08:15–09:00 | PRE-TEST: 10Q uWorld ciegas del tema NUEVO (tutor · SIN tiempo) + free recall 90s = UWorld primero para DIAGNOSTICAR, First Aid después para tratar | 1 | sin gate: es diagnóstico (40-60% es normal) · cada duda, incluso en aciertos, va a la shopping list |
| 09:00–11:00 | DEEP PRIME: vídeo B&B/Pathoma/Sketchy + First Aid active reading (Whole Page Rule: la página completa, no el dato fallado) + tarjetas Anki de MECANISMO (≤10, patogenia→presentación, en voz alta antes de escribir) | — | — |
| 11:00–12:00 | CONSOLIDACIÓN por nivel del día (`DIAS[].nivelUW`): nivel 1 = 20Q en bloques 5Q tutor del subtema (días 1-2 del sistema) · nivel 2 = 30Q en bloques 5Q timed de subtemas validados (incluye 5Q del subtema de ayer = 2ª mitad del gate) · nivel 3 (viernes sin hito hasta S10) = 20Q sistema completo timed + 10Q tutor · nivel 4 (viernes sin hito desde S11) = 20-30Q timed mixtos de sistemas dominados + 10Q tutor · taper D94-D95 = 20Q flagged, nada nuevo · revisión = Educational Objective + shopping list + log de errores (knowledge / transfer / proceso) | 1→4 (nivelUW del día) | ≥80% → mañana sube de nivel · <80% → repetir 5Q del subtema fallado, NO avanzar (registrar en 📏 Medición) |
| 18:00–18:45 | EVALUACIÓN ACUMULATIVA modo examen: 10Q mixta timed (90 s/Q · tope 2 min · cover-the-options · juez, no abogado) + corrección + APEX · Fase A = dosis diaria de nivel 4 · día de hito: registrar aquí el % del NBME/UWSA/Free 120 | 4 (Fase A) · 5 (B-C) | ≥80% sostenido = listo para mezclar sistemas · hitos: comparar con el mínimo on-track del viernes (`usmleScores.HITOS_ONTRACK`) |


Resto del día (sin tocar): IA vibecoding 04:15-05:00 · RESEARCH↔DERMA alterna 13:30-14:15 ·
AURUM 14:15-15:15 · MIR 15:15-16:15 · **ENCAPS 16:15-17:15 (1h/día de banqueo puro hasta el
vie 5-feb — en v5.16 se AMPLIÓ el fin otra vez (v5.14 vie 29-ene → v5.15 mar 2-feb → v5.16 vie 5-feb): se amplían días, no se pierden sesiones; feb-mar 2027 vuelve a
principal — examen fines de marzo 2027)** · **LIVIANO Academia
17:15-18:00**. Las HORAS no cambian con los niveles: cambia el formato del bloque de las 11:00.

Matemática de horas v5.16: 95 días × 6h15 ≈ **594h** (bloque de mañana 5h30 ≈ 523h +
eval de 18:00 ≈ 71h). **No bajó respecto de la v5.15**: como esta vez tampoco se recortó contenido sino
que se alargó el plan, los 95 días siguen siendo 95 (D94-D95 son de sesión ligera/mínima por diseño del taper, no
por recorte). La referencia IMG-base-cero es 600-1.000h: el plan queda algo por debajo del punto medio —
proteger las franjas es lo que sostiene febrero. Esta vez **no se consumió nada del plan**: el corrimiento rígido solo
desplazó las fechas y el examen pasa al **jue 11-feb**.

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
| **3** | Sistema completo · timed | Bloques de 10-20Q de TODO el sistema · timed (sin la "ventaja injusta" de saber el subtema) | Palmerton 40-50Q/día → plan: 40Q (10 pre-test + 20Q sistema + 10 tutor) | 80% en 20Q timed consecutivas del sistema | VIERNES sin NBME/UWSA a las 11:00 **hasta S10** (D15 Cardio · D20 Resp · D35 GI · D45 y D50 Neuro; los viernes D5 Inmuno y D30 GI caen en 1.º-2.º día de sistema y quedan en nivel 1): 20Q del sistema en curso, o del anterior si el sistema lleva <3 días · desde S11 el viernes pasa a nivel 4 | A |
| **4** | Sistemas mixtos · timed | Bloques de 20-30Q mezclando ≥3 sistemas dominados + el nuevo (saltar entre especialidades bajo presión) | Palmerton 50-70Q/día → plan: viernes N4 = 40Q (10 pre-test + 30Q mixtos timed) · Fase B: 2×40Q (80Q) | 80% en bloques mixtos de 20Q timed de ≥3 sistemas | 18:00 EVAL (10Q mixta timed) toda la Fase A como dosis diaria · **VIERNES sin hito desde S11 = 20-30Q mixtos timed a las 11:00 en vez de sistema único: en v5.16 es UNO (D60, vie 18-dic, S12, Micro/ID): con el D1 en lunes los hitos vuelven a caer en viernes y las semanas del 25-dic y del 1-ene no tienen viernes hábil** (flag `VIERNES_N4_DESDE_SEMANA = 11`, texto en `DIAS[].franjaNota`) · **Fase B D84 · D86 + Fase C D88 y D89** (random timed 2×40Q + sistema débil; D88 y D89 son banco alojado en el sprint) | A (dosis diaria + viernes desde S11) → B |
| **5** | Mixto completo 40Q · timed | Bloques de 40Q random · timed 60 min (90 s/Q) = simulación exacta del examen | Palmerton 80-100Q/día (máx. 2 bloques de 40) · hitos: UWSA 160Q · NBME 200Q · Free 120 | 80% sostenido (90% para 260+) · pase seguro = NBME ≥65% (≈95%) / ≥70% (≈99%) | 05:00 STRESS SET 10Q/12min (Fases B-C) · **UWSA2 (D77, dentro de la Fase A) + NBME 31 (D82, abre la Fase B) + NBME 32/33 (D83, D85)** y **D90 · D91 · D92 · D93** (incorrects 2ª pasada + AMBOSS 200 mitades 1-2, alojados en el sprint) · Fase C (Free 120 D87 + taper D94-D95) · todos los hitos = formato nivel 5 como MEDICIÓN, no como progresión | B → C (+ todos los hitos) |

**Regla determinista del generador** (no toca fechas, sistemas, hitos ni el total de 95 días):
- Fase A: posición del día dentro de su sistema (sin contar Assessment) → **1º-2º día = nivel 1** (30Q = 10 pre-test + 20 consolidación en bloques 5Q tutor) · **viernes sin hito y ≥3º día = nivel 3 hasta S10** (40Q = 10 + 20 sistema completo timed + 10 tutor) · **viernes sin hito y ≥3º día desde S11 = nivel 4** (40Q = 10 pre-test + 20-30Q timed mixtos de sistemas dominados + 10 tutor; flag `VIERNES_N4_DESDE_SEMANA = 11` en `gen_usmle_v5.js`, 12-sep tarde) · **resto = nivel 2** (40Q = 10 + 30 en bloques 5Q timed).
- Hitos (🎯): formato **nivel 5 como MEDICIÓN** (UWSA 160Q · NBME 200Q · Free 120 = 120Q), no como progresión.
- Fase A cierra con **D77 = UWSA2** (nivel 5, vie 15-ene), los dos últimos días de Psiquiatría **D78-D79** (nivel 2) y los dos días dobles de Bioquímica **D80 (mié 20-ene) y D81 (jue 21-ene)** (nivel 1).
- Fase B (D82-D86): **D82 = NBME 31** (nivel 5, la abre el día siguiente al cierre de contenido) · **D83 = NBME 32** y **D85 = NBME 33** (nivel 5) · **D84 y D86 nivel 4** (2×40Q mixtos timed = 80Q, sistema débil #1).
- Fase C (D87-D95): **nivel 5** salvo **D88 (lun 1-feb) y D89 (mar 2-feb), nivel 4** (random timed 2×40Q + sistema débil #2 / Mehlman HY del sistema); **D90 (mié 3-feb), D91 (jue 4-feb), D92 (vie 5-feb) y D93 (lun 8-feb)** siguen siendo días de banco (incorrects 2ª pasada · AMBOSS 200 mitades 1 y 2, 80Q cada uno) y los días sin simulacro son **taper** (`TAPER_ACTIVO`): solo flagged/incorrects ya vistos + Anki maduro, cero preguntas y cero tarjetas nuevas (**D94 = 20Q · D95 = 20Q**; ver §3b).
- La eval de las 18:00 (10Q mixta timed) es la **dosis diaria de nivel 4** durante toda la Fase A; los stress sets 10Q/12min (nivel 5) solo en Fases B-C a las 05:00 (desde D82, vie 22-ene).
- Los tres días con `franjaNota` (D60 viernes N4 · D94 · D95 taper) llevan el texto de la franja 11:00 en el propio `DIAS[]`; **el `sub` de esos días no cambia** (multiconjunto de contenido idéntico a la v5.15, verificado con `node` por `(system, sub)`: dif 0).

### Distribución real recontada desde `DIAS` (v5.16 · 95 días)

| Fase | Días | Niveles | Q objetivo (`qDia`) |
|------|------|---------|------------------------|
| **A** · D1-D81 | 81 | N1×28 · N2×39 · N3×5 · N4×1 · N5×8 | 4160 |
| **B** · D82-D86 | 5 | N4×2 · N5×3 | 760 |
| **C** · D87-D95 | 9 | N4×2 · N5×7 | 640 |
| **Total** | **95** | **N1×28 · N2×39 · N3×5 · N4×5 · N5×18** | **5560** |

> Respecto de la v5.15 cambian los **viernes** (el contenido no): al correr todo +3 días hábiles el viernes de cada sistema
> cae en otro subtema y, sobre todo, **los hitos vuelven a ocupar viernes** (el D1 cae en lunes), así que el segundo viernes
> de nivel 4 desaparece y las semanas del 25-dic y del 1-ene se quedan sin viernes hábil. Los N3 pasan a ser D15 (Cardio),
> D20 (Resp), D35 (GI) y D45 y D50 (Neuro); el único N4 de Fase A es **D60 (Micro/ID, S12)**. Totales: N3×5 sin cambio,
> **N4×6 → N4×5** (1 viernes + D84/D86 en Fase B + D88/D89 en Fase C), **N2×38 → N2×39**, N1×28 sin cambio. El total sigue
> en **5560Q** — el multiconjunto (sistema, subtema) es idéntico (dif 0).

Desglose del total: **3320Q de trabajo diario** (83 días de plan) + **2240Q de simulacros**
(12 hitos = 9×200Q NBME + 2×160Q UWSA + 1×120Q Free 120).

**Viernes** (17 en el plan; **8 son hito** — NBME 25 D10 · 26 D25 · 27 D40 · 28 D55 · 30 D72 · UWSA2 D77 · NBME 31 D82 ·
Free 120 D87 — y el único fuera de Fase A sin hito es el D92, vie 5-feb, banco). Los **8 viernes de Fase A sin hito**:
D5 (2-oct) Inmuno **N1** · **D15 (16-oct) Cardio N3** · **D20 (23-oct) Resp N3** · D30 (6-nov) GI **N1** · **D35 (13-nov) GI N3** ·
**D45 (27-nov) Neuro N3** · **D50 (4-dic) Neuro N3** · **D60 (18-dic) Micro/ID N4** (S12).
Los que quedan en **N1** lo hacen porque su sistema lleva <3 días: ese día el bloque de
sistema completo timed se hace del sistema **anterior**. Los viernes 25-dic y 1-ene son skip; **desde S11 el viernes sin hito es
de nivel 4** — en v5.16 solo queda uno (D60), porque S11 tiene el NBME 28 en viernes y S13-S14 no tienen viernes hábil: el flag es regla, no lista.

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

Divergencias técnica Palmerton ↔ plan v5.16 (resueltas y pendientes de decisión):
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
**v3 — catálogo completo**. Rol de cada recurso: [`RECURSOS_META_2026.md`](RECURSOS_META_2026.md).

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

> El plan pide **5560Q** en total (3320 de banco diario + 2240 de simulacros) contra las 3.659Q de
> uWorld: el excedente lo cubren la revisión de incorrects, AMBOSS 200 Concepts y los NBME/UWSA,
> que no consumen banco uWorld.

## 7. Ficheros canónicos (código)

| Fichero | Rol |
|---------|-----|
| [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) | **v5.16 = FUENTE DE VERDAD**: DIAS (95, con `nivelUW`/`qDia`/`franjaNota`), FRANJAS (6, con nivel/gate), DAILY_META (+`metodo`, `examenVentana` superada, `examenTarget = '2027-02-11'`, `descansoD1 = '2027-02-10'`, `viernesN4DesdeSemana`), USMLE_NIVELES, USMLE_GATE, **USMLE_TAPER** (D94 mar 9-feb D-2 última sesión de banco · D95 mié 10-feb D-1 real · examen jue 11-feb · burnout), helpers (`faseDe` 81/86, `nivelInfo`, `esHito`, `hitosDelPlan`, `semanaDe`, `esViernesNivel4`, `esDiaTaper`, `esDiaDermaStep1`). Generado por `gen_usmle_v5.js` → `assemble_usmle_ts.js` (`DATA/_scripts/usmle/`; flags `VIERNES_N4_DESDE_SEMANA`, `TAPER_ACTIVO`) |
| [`src/lib/ankiLinks.ts`](../../src/lib/ankiLinks.ts) | Decks Anki por examen + **`sysTag(system)` = tag compartido `sys::<sistema>`** (USMLE ↔ MIR ↔ Derma, 12-sep) · `MIR_DECK` con Epidemiología / Bioética / Dermatología (A VERIFICAR con AnkiConnect) · `DERMA_STEP1_TAG/QUERY` + `dermaAnkiTags` añade `step1 sys::Dermatology` |
| [`src/lib/mirUsmleBridge.ts`](../../src/lib/mirUsmleBridge.ts) | Puente de solo lectura MIR ↔ Step 1: `usmleMirParalelo(fecha)` (chip HOY) · en `UsmleTodayPlan` el repaso anclado 07:15 añade "MIR precedió esta semana: <asignatura>" (semana anterior + homólogo MIR del sistema de hoy) |
| [`src/lib/usmleStep1Plan.ts`](../../src/lib/usmleStep1Plan.ts) | Plan macro (SISTEMAS con `diaInicio` alineado a DIAS, PLAN_META; `inicio = '2026-09-28'`) |
| [`src/lib/usmlePalmertonData.ts`](../../src/lib/usmlePalmertonData.ts) | Vídeos Palmerton (serie High Yield, IDs + duraciones reales) |
| [`src/lib/usmleQbanklyData.ts`](../../src/lib/usmleQbanklyData.ts) | Árbol Qbankly + deep-links (`library?e=<epub>&doc=<docId>`) |
| [`src/lib/usmleData.ts`](../../src/lib/usmleData.ts) | KPIs, sistemas, disciplinas, ROI, recursos, reglas del Qbank (5 niveles) |
| [`src/lib/usmleScores.ts`](../../src/lib/usmleScores.ts) | **Medición diaria** (localStorage `jmd-usmle-scores` + Supabase `usmle_daily_scores`): gate 80%, media 7d, mínimos on-track por hito, export JSON · **`gateHito` / `alertaBurnout` + `BURNOUT_PROTOCOLO`** (REGLA §E-7: 2 hitos consecutivos bajo mínimo → 'ALERTA BURNOUT') |
| [`src/lib/obsidianMap.ts`](../../src/lib/obsidianMap.ts) | `USMLE_OBS_DAY`: D# → nota madre uWorld en el vault |
| UI | `src/components/study/UsmleHub.tsx` (barra: media 7d + Δ hito; **banner ALERTA BURNOUT**; Readiness: niveles + serie de hitos + **Gate de hitos** + **Taper y semana de examen**) + `UsmleTodayPlan.tsx` (chip nivel · chip MIR en paralelo · chips **Viernes N4 / TAPER / cuenta doble Derma** · nota de franja 11:00 · D-1 y test day en D95 · bloque "cuenta doble" el D73 · "MIR precedió esta semana" en el repaso anclado · 📏 Medición) + `ReadinessBar.tsx` · Home: `TodayMission.tsx` |


## 8. Docs de esta carpeta

- [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) — **v3 catálogo completo**:
  por materia + 5 niveles UWorld + Anki fino + test-taking/test-day + planificación NBME (D# y fechas v5.16).
- [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md) — semana a semana S1-S20 (v5.16) + día a día D1-D95 + reglas de reprogramación + gates ECFMG (agendar el jue 11-feb y confirmar el eligibility period).
- [`RECURSOS_META_2026.md`](RECURSOS_META_2026.md) — rol de cada recurso, fase, horas, qué NO usar.
- [`PALMERTON_DIVERGENCIAS_PLAN.md`](PALMERTON_DIVERGENCIAS_PLAN.md) — **técnica Palmerton → qué hace el plan v5.16 →
  divergencia → resolución aplicada / propuesta para decisión de Joseph** (incluye la decisión del 26-sep: D95 = D-1 real →
  examen jue 11-feb, con la alternativa de recortar temario; sustituye a la del 22-sep sobre el lun 8-feb; y la regla
  del corrimiento RÍGIDO: los hitos corren con el plan y conservan su D#).
  **§E con estado al 26-sep**: implementadas #2 viernes de nivel 4 (ahora solo D60), #5 taper + D-1 real y #7 burnout (REGLA);
  siguen siendo DECISIÓN de Joseph #1 (20Q permanente), #3 (GO sin UWSA2), #4 (Free 120 en Prometric + maratón), #6 (eval a las
  12:00), #8 (arranque a 20Q si el UWSA1 <40%) y la de #5 (rendir el jue 11-feb vs recortar temario).
- [`PALMERTON_METODO_COMPLETO.md`](PALMERTON_METODO_COMPLETO.md) — el método de la A a la Z; §12 = mapeo al plan v5.16 (D# y fechas).
- [`PALMERTON_INDICE_FUENTES.md`](PALMERTON_INDICE_FUENTES.md) — índice de fuentes del cuaderno (lo mantiene otro flujo; no cita D#).
- `_palmerton_v3_extractos/` — extractos crudos v3 del cuaderno (uworld-preguntas, metodo-global, planificacion-nbme-img…).
- Cuaderno NotebookLM **"STEP 1 · Palmerton Engine"** — **~140 fuentes**:
  [notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86](https://notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86)

> **Histórico del corrimiento** (regla: cada día sin estudiar = +1 día hábil; hitos fijos): plan de
> 70 días (D1 = 10-jun-2026) → **SUPERSEDIDO** por la v5 el 27-ago (D1 = 31-ago, 102 días) → **v5.3**
> 31-ago (D1 = mar 1-sep, 101 días) → **v5.4** 2-sep (D1 = jue 3-sep, 99 días) → **v5.5** 3-sep
> (D1 = vie 4-sep, 98 días) → **v5.6** 4-sep (D1 = lun 7-sep, 97 días) → **v5.7** 8-sep
> (D1 = mié 9-sep, 95 días: cierre de Fase A fusionado de 4 días en 2) → **v5.8** 9-sep
> (D1 = jue 10-sep → D95 = lun 25-ene, 95 días) → **v5.9** 10-sep (D1 = vie 11-sep → D95 = mar 26-ene,
> 95 días: el D1 pasa a ser el UWSA1) → **v5.10** 12-sep (D1 = lun 14-sep → D95 = mié 27-ene, 95
> días: el UWSA1 se mueve al lun 14-sep y el target de examen pasa al vie 29-ene) → **v5.11** 14-sep
> (D1 = mar 15-sep → D95 = jue 28-ene, 95 días: el UWSA1 se mueve al mar 15-sep y el día de descanso
> pre-examen se absorbe dentro del plan: D95 = D-1) → **v5.12** 15-sep (D1 = mié 16-sep → D95 = vie 29-ene,
> 95 días: el UWSA1 se mueve al mié 16-sep, el plan llena toda la ventana 25-29 ene y el examen sale de ella: target
> lun 1-feb-2027, con el finde 30-31 ene de descanso fuera del plan) → **v5.13** 16-sep (D1 = jue 17-sep → D95 = lun
> 1-feb, 95 días: el UWSA1 se mueve al jue 17-sep, el D-1 vuelve a entrar en el plan (D95 = lun 1-feb, sesión mínima) y el
> examen pasa al mar 2-feb-2027; sáb 30 y dom 31-ene libres) → **v5.14** 19-sep (**D1 = lun 21-sep → D95 = mié 3-feb, 95
> días**: ni el jue 17 ni el vie 18-sep se estudiaron; el UWSA1 se mueve al lun 21-sep, **el contenido cierra el jue 14-ene y el
> NBME 31 cae al día siguiente sin banco delante; D95 = mié 3-feb = D-1 dentro del plan y el examen pasa al jue 4-feb-2027**;
> las semanas del plan coinciden por fin con las de calendario) → **v5.15** 22-sep (**D1 = mié 23-sep → D95 = vie 5-feb, 95
> días**: ni el lun 21 ni el mar 22-sep se estudiaron; **primer corrimiento RÍGIDO — el plan entero, hitos incluidos, se
> desplaza en bloque y cada NBME conserva su D# y sus días de contenido por delante; los hitos dejan de caer en viernes**;
> D95 = vie 5-feb = D-1 dentro del plan, el finde 6-7 feb queda libre y el examen pasa al lun 8-feb-2027) → **v5.16** 26-sep
> (**D1 = lun 28-sep → D95 = mié 10-feb, 95 días**: ni el mié 23, ni el jue 24 ni el vie 25-sep se estudiaron; **segundo
> corrimiento RÍGIDO (+3 hábiles), los 12 hitos con su D#**; con el D1 en lunes 8 de los 12 hitos vuelven a caer en viernes;
> **D95 = mié 10-feb = último día del plan y D-1 REAL, sin finde libre antes del examen, que pasa al jue 11-feb-2027**;
> las semanas del plan vuelven a coincidir con las de calendario).
> **Punto de inflexión en la v5.8, confirmado en v5.9 → v5.16**: de la v5.3 a la v5.7 el desfase
> se pagaba **comprimiendo contenido** (97 → 95 días con fusiones); desde la v5.8 rige la regla de
> Joseph — **no se fusiona ni se recorta nada** y el desfase se paga **alargando el plan por la cola**.
> **Segundo punto de inflexión en la v5.15**: hasta la v5.14 los hitos estaban anclados por fecha y cada corrimiento les
> robaba preparación; desde la v5.15 el corrimiento es **rígido** (corren con el plan, conservan su D#) y, donde un plan
> tenía un fin clavado, **se amplían días** en vez de perder sesiones (la v5.16 aplica la misma regla por segunda vez).
> El examen ya **no** está en la ventana 25-29 ene (target jue 11-feb): **cada día perdido desde hoy mueve el examen un
> día hábil más, o exige recortar temario** — decisión de Joseph en el momento en que ocurra.
