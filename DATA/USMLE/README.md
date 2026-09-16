# DATA · USMLE Step 1 — Doc maestro v5.13 (reestructuración 27-ago · corrimiento 16-sep-2026 · niveles Palmerton)

**Step 1 es el bloque PRINCIPAL** (heredó las franjas ENCAPS de la mañana): 6h15/día L-V.
**D1 = JUE 17-sep-2026 → D95 = LUN 1-feb-2027 (95 días; del 31-ago al 16-sep no se estudió: 13 hábiles perdidos) ·
EXAMEN: D95 = lun 1-feb = D-1 DENTRO del plan (sesión mínima AM + ritual de test-day) → target MAR 2-FEB-2027;
D94 = vie 29-ene = última sesión de banco (D-2); sáb 30 y dom 31-ene libres (solo Anki vencido).**
Sábados y domingos LIBRES. Skip extra: 25-dic, 31-dic, 1-ene.
Fuente de verdad (código): [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) **v5.13**
(`DAILY_META.totalDias = 95`, `inicio = '2026-09-17'`, `fin = '2027-02-01'`, `examenVentana = '2027-01-25 → 2027-01-29
(superada desde v5.12; v5.13: D95 = lun 1-feb)'`, `examenTarget = '2027-02-02'`, `descansoD1 = '2027-02-01'`).

> **Corrimiento v5.12 → v5.13 (16-sep-2026).** El miércoles 16 de septiembre tampoco se estudió, así que D1 pasó
> de mié 16-sep a **jue 17-sep** (regla del sistema: cada día sin estudiar = +1 día hábil). Es el
> **duodécimo corrimiento** desde el 31-ago (31-ago→16-sep sin estudiar = 13 días hábiles perdidos).
> **REGLA PERMANENTE DE JOSEPH (vigente desde la v5.8): no se fusiona ni se recorta NADA.**
> Ni un tema ni un subtema queda atrás: el temario sale 1:1 y el desfase se absorbe **alargando el
> final del plan**, nunca comprimiendo días. D95 pasa de vie 29-ene a **lun 1-feb-2027** (del 17-sep
> al 1-feb caben exactamente 95 días hábiles). Las metas, las franjas horarias y el temario
> no cambian; **11 de los 12 hitos NBME/UWSA quedan en sus fechas originales** — solo cambia su D#.
>
> **El UWSA1 vuelve a cambiar de fecha** (mié 16-sep, ya pasada sin estudiar → **jue 17-sep, sigue siendo
> el D1**: baseline el primer día, como prescribe Palmerton). El primer día de CONTENIDO (Fundamentos,
> Pathoma 1-2) es el **vie 18-sep = D2**; Cardio arranca el jue 24-sep (D6).
>
> 🔴 **Lo nuevo de esta versión: el D-1 vuelve a quedar DENTRO del plan y el examen se mueve al MAR 2-FEB-2027.** En la
> v5.12 el plan terminaba el vie 29-ene (última sesión) y el examen era el lun 1-feb con el finde 30-31 de descanso. Ahora
> el lun 1-feb es el **D95 = D-1 dentro del plan** (sesión mínima solo por la mañana: Anki maduro/vencido + 20Q flagged con
> los mejores esquemas, ≤2 h; tarde de ritual de test-day: permiso + 2 ID + Ziploc + ruta al Prometric; nada después de las
> 17:00 — `USMLE_TAPER.d95` = `USMLE_TAPER.dMenos1`), el **D94 (vie 29-ene) es la última sesión de banco (D-2)** y el **sáb 30
> y dom 31-ene quedan libres** entre ambos (solo Anki vencido). **Target de examen: MAR 2-FEB-2027**, primer hábil tras el D95
> (`DAILY_META.examenTarget = '2027-02-02'`, `USMLE_TAPER.examen`). **Joseph debe agendar/reprogramar el Prometric para el
> mar 2-feb y confirmar que su eligibility period cubre esa fecha** (si no: extenderlo). La alternativa es **recortar
> temario** para volver a la ventana — decisión suya, registrada en [`PALMERTON_DIVERGENCIAS_PLAN.md`](PALMERTON_DIVERGENCIAS_PLAN.md)
> §E-5 (sustituye a la decisión del 15-sep: rendir el lun 1-feb).
> ⚠ **Desde hoy, cada día no estudiado mueve el examen un día hábil más (o exige recortar temario).**
>
> Prueba dura del "nada se perdió": el multiconjunto de `(system, sub)` del nuevo `DIAS` es
> **idéntico** al de la v5.12 (0 filas perdidas y 0 filas nuevas en las 95; el remapeo D#(v5.12) →
> D#(v5.13) es biyectivo 95/95: 74 días conservan su D# y 21 cambian de número — los que rodean a
> cada hito) y el total de **5560Q objetivo no se movió**.

Plataforma de práctica: **Qbankly** (`qbankly.app`) — **abre SOLO en Microsoft Edge**
(Chrome con CDP la bloquea). Los links de la app ofrecen botón ◆ Edge + Chrome.

## 1. Fases

| Fase | Días | Fechas | Qué se hace | Niveles UWorld (Palmerton) |
|------|------|--------|-------------|----------------------------|
| **A · Contenido por sistemas** | D1-D81 | jue 17-sep → mar 12-ene | UWSA1 baseline (D1) + 1ª pasada completa del temario desde D2 + 30-40Q uWorld/día por nivel (= 1ª vuelta del banco entero) + 8 simulacros de hito (7 NBME/UWSA1 + **UWSA2 D79, que cae DENTRO de la Fase A**) · cierre de Bioquímica = D81 mar 12-ene | **1 → 3** (+ dosis diaria de 4 en la eval 18:00) · **viernes de nivel 4 desde S11** (solo D62, 11-dic: mixto de sistemas dominados; el vie 27-nov, D52, es 2.º día de Heme → nivel 1) |
| **B · Banco intensivo** | D82-D84 | mié 13-ene → vie 15-ene | random timed 2×40Q + sistema débil #1 (D82-D83) · NBME 31 (D84, 15-ene, **GO/NO-GO**) la cierra | **4 → 5** |
| **C · Sprint final** | D85-D95 | lun 18-ene → lun 1-feb | NBME 32 · banco alojado en el sprint (D86 y D88 random timed + sistema débil #2/Mehlman · D90 y D91 incorrects 2ª pasada · D92 AMBOSS 200 mitad 1 · D93 mitad 2) · NBME 33 · Free 120 · **taper explícito (D94 vie 29-ene = D-2, última sesión de banco, 20Q flagged + Anki maduro) → sáb 30 / dom 31 libres → D95 lun 1-feb = D-1 dentro del plan (sesión mínima + ritual)** → **mar 2-feb examen** (§3b) | **5** + NBME |

Días por fase (`faseDe` en el TS): **A = 81 · B = 3 · C = 11** (total 95). El corte A/B sigue en
**D81** (el **UWSA2 (vie 8-ene) es D79 y queda dentro de la Fase A**; los dos días dobles de Bioquímica, D80 lun 11-ene y
D81 mar 12-ene, cierran la fase íntegros y seguidos detrás del UWSA2). La Fase B se reduce a **2 días de banco (D82-D83) + el
NBME 31 (D84)**: el tercer día de random timed (sistema débil #2) pasa al sprint como **D86 (mar 19-ene)**. El corte B/C queda
en **D85** (NBME 32, lun 18-ene, abre la Fase C, que ahora tiene 11 días porque el D-1 volvió a entrar en el plan).

## 2. Sistema → días → fechas (generado desde `DIAS` de `usmleStep1Daily.ts` v5.13)

| Sistema | Días | Fechas | Tier | Nº días |
|---------|------|--------|------|---------|
| Assessment | D1 · D12 · D27 · D42 · D57 · D67 · D74 · D79 · D84 | jue 17-sep → vie 15-ene | CORE | 9 |
| Fundamentos | D2-D3 | vie 18-sep → lun 21-sep | CORE | 2 |
| Immunology | D4-D5 | mar 22-sep → mié 23-sep | CORE | 2 |
| Cardiovascular | D6-D11 · D13-D16 | jue 24-sep → jue 8-oct | CORE | 10 |
| Respiratory | D17-D22 | vie 9-oct → vie 16-oct | CORE | 6 |
| Renal | D23-D26 · D28-D29 | lun 19-oct → mar 27-oct | CORE | 6 |
| Gastrointestinal | D30-D36 | mié 28-oct → jue 5-nov | CORE | 7 |
| Endocrine | D37-D41 | vie 6-nov → jue 12-nov | CORE | 5 |
| Nervous System | D43-D50 | lun 16-nov → mié 25-nov | CORE | 8 |
| Hematology & Oncology | D51-D56 | jue 26-nov → jue 3-dic | HIGH | 6 |
| Microbiology / ID | D58-D64 | lun 7-dic → mar 15-dic | HIGH | 7 |
| Reproductive | D65-D66 · D68-D70 | mié 16-dic → mié 23-dic | HIGH | 5 |
| Musculoskeletal / Rheum | D71-D73 | jue 24-dic → mar 29-dic | HIGH | 3 |
| Psychiatry & Behavioral | D75-D78 | lun 4-ene → jue 7-ene | HIGH | 4 |
| Biochemistry | D80-D81 | lun 11-ene → mar 12-ene | MED | 2 |
| Banco intensivo | D82-D83 · D86 · D88 · D90-D93 | mié 13-ene → jue 28-ene | CORE | 8 |
| Sprint final | D85 · D87 · D89 · D94-D95 | lun 18-ene → lun 1-feb | CORE | 5 |

> **El D1 (jue 17-sep) es Assessment, no contenido**: el UWSA1 se movió a ese día (su fecha anterior,
> mié 16-sep, ya pasó) y el baseline ocupa el primer día del plan (exactamente lo que prescribe
> Palmerton); **Fundamentos empieza el vie 18-sep = D2**.
> Los demás huecos dentro de un sistema (D12, D27, D42, D57, D67, D74, D79, D84) son los otros
> **días de Assessment** (hitos, §3). Reparto respecto de la v5.12: el NBME 25 (D12) sigue **partiendo
> Cardio** (ahora aterosclerosis en D13, SCA en D14, IC + shock en D15 y valvulopatías en D16 quedan detrás); el NBME 26 (D27)
> sigue **partiendo Renal** (glomerulares D28 y AKI/ERC/litiasis D29 detrás) y deja GI (D30-D36) íntegro detrás; el NBME 27
> (D42) ya **no parte Neuro** (D43-D50 íntegro detrás; Endo D37-D41 íntegro delante); el NBME 28 (D57) ya **no parte Micro**
> (D58-D64 íntegro detrás; Heme D51-D56 íntegro delante); el NBME 29 (D67) **parte Repro** (D65-D66 delante; gineco-oncología
> D68, mama/próstata D69 e ITS/anticoncepción D70 detrás) y deja MSK (D71-D73) íntegro delante del NBME 30 (D74); Psiquiatría
> (D75-D78) va **íntegra** detrás del NBME 30 y delante del UWSA2 (D79); y **los dos días dobles de Bioquímica (D80 lun 11-ene ·
> D81 mar 12-ene) van íntegros detrás del UWSA2** y cierran la Fase A. En Fase C, D85/D87/D89 son NBME 32/33 y Free 120 con
> `system = 'Sprint final'`, y **D86 (mar 19-ene), D88 (jue 21-ene), D90 (lun 25-ene), D91 (mar 26-ene), D92 (mié 27-ene) y D93
> (jue 28-ene) siguen siendo `system = 'Banco intensivo'`** (random timed + sistema débil #2 / Mehlman · incorrects 2ª pasada ·
> AMBOSS 200 mitades 1 y 2) alojados dentro del sprint. Cada día trae: `sub`, `bbCh`/`bbVid` (Boards & Beyond), `uw` (subtema
> uWorld), `mat`/`matType` (material primario), `palm` (vídeo Palmerton al abrir sistema), `nivelUW` (1-5) y `qDia` (§4b).

### Qué se movió y qué NO en el corrimiento v5.13

**Nada se fusionó ni se recortó.** El desfase de 1 día hábil se pagó **por la cola del plan**, no
comprimiendo contenido — y esta vez el D-1 volvió a entrar en el plan y el examen corrió un hábil más:

| | v5.12 (D1 = mié 16-sep) | v5.13 (D1 = jue 17-sep) |
|---|---|---|
| Días del plan | 95 | **95** (mismo temario, 1:1) |
| Primer día | mié 16-sep-2026 = UWSA1; contenido en D2, jue 17-sep | **jue 17-sep-2026 = UWSA1** (movido otra vez: su fecha ya había pasado); contenido en D2, **vie 18-sep** |
| Último día | vie 29-ene-2027 = D95 = última sesión (D-3) | **lun 1-feb-2027 = D95 = D-1 DENTRO del plan** (sesión mínima AM + ritual); D94 vie 29-ene = última sesión de banco (D-2) |
| Target de examen | LUN 1-FEB-2027 (fuera de la ventana); sáb 30 = D-2 y dom 31 = D-1 de descanso fuera del plan | **MAR 2-FEB-2027**; sáb 30 y dom 31-ene libres entre D94 y D95 (`examenTarget` / `descansoD1 = '2027-02-01'`) |
| Días de contenido | cada uno en su fecha | **+1 día hábil cada uno** |
| 12 hitos NBME/UWSA | 11 fechas iguales + UWSA1 → 16-sep | **11 fechas iguales + UWSA1 → 17-sep**; cambia el D# de todos menos UWSA1 (−1) |
| Días dobles de Biochem | D79 (jue 7-ene) y D81 (lun 11-ene), partidos por el UWSA2 (D80) | **D80 (lun 11-ene) y D81 (mar 12-ene), íntegros y seguidos detrás del UWSA2 (D79, vie 8-ene)** |
| Cardio vs NBME 25 | partido: D6-D12 antes · D14-D16 después | **partido**: D6-D11 antes · **D13-D16** (aterosclerosis · SCA · IC · valvulopatías) después |
| Renal vs NBME 26 | partido: D23-D27 antes · D29 después | **partido**: D23-D26 antes · **D28-D29** (glomerulares · AKI/ERC/litiasis) después |
| Neuro vs NBME 27 | partido: D42 antes · D44-D50 después | **íntegro después** (D43-D50) |
| Micro vs NBME 28 | partido: D57 antes · D59-D64 después | **íntegro después** (D58-D64) |
| Psiquiatría vs NBME 30 | partido: D74 antes · D76-D78 después | **íntegro después** (D75-D78) |
| Corte de fases | A D1-81 · B D82-85 · C D86-95 | **A D1-81 · B D82-84 · C D85-95** |
| Viernes de nivel 3 | 3 (D8 Cardio · D33 GI · D48 Neuro) | **3** (D22 Resp · D32 GI · D47 Neuro) — Cardio pierde el suyo (su viernes D7 es el 2.º día del sistema), Resp lo recupera |
| Viernes de nivel 4 | 2 (D53 Heme/Onc · D63 Micro/ID) | **1** (D62 Micro/ID virus DNA/herpes/hepatitis) — Heme/Onc pierde el suyo (su viernes D52 es el 2.º día del sistema) |
| Q objetivo totales | 5560 | **5560** (idéntico: la prueba aritmética de que no se recortó nada) |

Los 12 hitos siguen **anclados por fecha** en el mapa `SIMS` del generador (el UWSA1 se re-ancló al
nuevo D1 porque su fecha ya había pasado), y los días no-hito se consumen desde el array `POST_A` en
los huecos libres; por eso el contenido se desliza alrededor de los simulacros sin que ninguno de los
11 restantes se mueva de su fecha. La clasificación de `nivelUW`/`qDia` depende del **origen de la
fila** (`bbCh` = `Banco` / `Sprint`), no de umbrales de fecha, así que la regla queda idéntica aunque
el contenido se derrame hasta el 12-ene.

## 3. Hitos NBME/UWSA (12) — 11 fechas intactas · UWSA1 movido al jue 17-sep

| # | Hito | Día | Fecha | Q | Rol |
|---|------|-----|-------|---|-----|
| 1 | **UWSA1** | **D1** | **jue 17-sep-2026** | 160Q | **Baseline en el PRIMER día del plan** (esperar bajo, no asustarse). Movido desde el mié 16-sep (fecha ya pasada): sigue al D1 en cada corrimiento |
| 2 | **NBME 25** | D12 | vie 2-oct-2026 | 200Q | 1ª calibración real · parte el bloque Cardio (D13 aterosclerosis, D14 SCA, D15 IC y D16 valvulopatías quedan detrás) |
| 3 | **NBME 26** | D27 | vie 23-oct-2026 | 200Q | Tendencia · parte Renal (D28 glomerulares y D29 AKI/ERC detrás); GI (D30-D36) va íntegro detrás |
| 4 | **NBME 27** | D42 | vie 13-nov-2026 | 200Q | Tendencia · Endo (D37-D41) íntegro delante, Neuro (D43-D50) íntegro detrás |
| 5 | **NBME 28** | D57 | vie 4-dic-2026 | 200Q | Tendencia · Heme/Onc (D51-D56) íntegro delante, Micro (D58-D64) íntegro detrás |
| 6 | **NBME 29** | D67 | vie 18-dic-2026 | 200Q | Parte Repro (D65-D66 delante; D68 gineco-oncología, D69 mama/próstata y D70 ITS/anticoncepción detrás) |
| 7 | **NBME 30** | D74 | mié 30-dic-2026 | 200Q | Cierre de contenido de 2026 (jue 31-dic y vie 1-ene son skip → cae en miércoles); MSK (D71-D73) íntegro delante; Psiquiatría (D75-D78), Biostats (D78) y los 2 días dobles de Biochem (D80-D81) quedan ya en 2027 |
| 8 | **UWSA2** | D79 | vie 8-ene-2027 | 160Q | Predictor de resistencia (la fecha la deciden los NBME) · **cae DENTRO de la Fase A** (Psiquiatría/Biostats delante; los 2 días dobles de Bioquímica D80-D81 detrás, íntegros) |
| 9 | **NBME 31** | D84 | vie 15-ene-2027 | 200Q | **GO/NO-GO** · cierra la Fase B |
| 10 | **NBME 32** | D85 | lun 18-ene-2027 | 200Q | Sprint final (abre la Fase C) |
| 11 | **NBME 33** | D87 | mié 20-ene-2027 | 200Q | Sprint final |
| 12 | **FREE 120 oficial** | D89 | vie 22-ene-2027 | 120Q | Sprint final · idealmente en el Prometric real · D-11 del examen (mar 2-feb) |

Los 12 hitos suman **2240Q** de simulacro. Caen en **viernes** 8 de ellos; las excepciones son el
UWSA1 (jue 17-sep, D1), el NBME 30 (mié 30-dic, porque jue 31-dic y vie 1-ene son skip) y NBME 32/33
(lun 18-ene y mié 20-ene, ya en el sprint final). **Once de estas 12 fechas no cambiaron con la
v5.13**: solo bajó su D# en 1. El **UWSA1** volvió a re-anclarse al nuevo D1 (mié 16-sep → jue 17-sep):
un hito cuya fecha ya pasó se mueve al nuevo D1; los que aún no llegaron, no.

**Criterio GO (Step 1 es pass/fail): 2 NBME consecutivos ≥68% + UWSA2 "low risk" → confirmar
fecha.** (Palmerton: ≥65% ≈ 95% de probabilidad de aprobar; ≥70% ≈ 99% — el 68% doble queda en
el rango; mínimos on-track por hito en
[`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) Parte V.) Si NO se cumple: correr el
examen dentro del mismo eligibility period (feb-mar 2027) sin drama — un fail queda PARA
SIEMPRE en el transcript ECFMG (~1/3 de PDs nunca consideran un aplicante con fail en Step 1).
Detalle de gates y logística ECFMG/Prometric: [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md).

> ⚠ **Consecuencia del duodécimo corrimiento sobre la semana del examen.** Con D95 = **lun 1-feb**, el
> D-1 vuelve a estar **dentro del plan** (como en la v5.11, pero ya fuera de la ventana 25-29 ene): el target pasa al
> **MAR 2-FEB-2027** (`DAILY_META.examenTarget = '2027-02-02'`); el D94 (vie 29-ene) es la **última sesión de banco (D-2)**, el
> sáb 30 y el dom 31-ene quedan **libres** (solo Anki vencido) y el D95 (lun 1-feb, `descansoD1 = '2027-02-01'`) es la **sesión
> mínima del D-1** (§3b; `USMLE_TAPER.d94/.d95/.dMenos1/.examen` en el TS). **Prometric: agendar/reprogramar para el mar 2-feb
> y confirmar que el eligibility period cubre esa fecha (si no, extenderlo)**; la única otra opción es **recortar temario** —
> decisión de Joseph. **Y desde aquí cada día perdido mueve el examen un día hábil más.**

## 3b. Semana de examen: taper D94 · finde libre · D95 = D-1 dentro del plan · test day mar 2-feb · protocolo de burnout (REGLA)

*(12-sep-2026, tarde — divergencias Palmerton #22 y #29 implementadas sin tocar horario, temario ni fechas; remapeadas el
16-sep a la v5.13. Fuente de cada paso: [`PALMERTON_METODO_COMPLETO.md`](PALMERTON_METODO_COMPLETO.md) §8.3-§8.4 y §9.12; código:
`USMLE_TAPER` y `DAILY_META.examenTarget / descansoD1` en `usmleStep1Daily.ts`, `BURNOUT_PROTOCOLO` + `gateHito` en `usmleScores.ts`.)*

| Día | Fecha | Qué se hace | Q | Franjas |
|-----|-------|-------------|---|---------|
| desde **D84** (NBME 31) | vie 15-ene | **Cese de lo nuevo**: cero preguntas nuevas y cero tarjetas nuevas (Palmerton: 1-2 semanas antes); solo incorrects/flagged + AMBOSS 200 como repaso de conceptos ya vistos; no repetir NBME ya hechos | — | sin cambio |
| **D94 · D-2 (última sesión de banco)** | **vie 29-ene** | Solo Anki **maduro** + 20Q flagged/incorrects ya vistos (sin bloque timed, sin AMBOSS) · repaso First Aid de esquemas (sistemas 6-10) · dormir ≥7 h ya desde hoy · sáb 30 y dom 31 libres (solo Anki vencido) | **20** | 05:00 · 07:15 · 11:00 |
| **sáb 30 · dom 31** | sáb 30 · dom 31-ene | **Libres** (régimen): sin banco; solo Anki vencido | — | — |
| **D95 · D-1 (DENTRO del plan)** | **lun 1-feb** | **Sesión MÍNIMA solo por la mañana (≤2 h)**: Anki maduro/vencido + 20Q flagged con los mejores esquemas e imágenes · rapid review FA · cero preguntas nuevas, cero tarjetas nuevas, ningún bloque timed, no abrir First Aid "para ver cuánto sé" · **tarde: permiso impreso + digital, 2 ID con el nombre EXACTO del permiso, bolsas Ziploc numeradas (Break #1-#4), ruta al Prometric** · nada de estudio después de las 17:00 (journaling, ejercicio suave, visualización, cena con proteína) · somnífero **nunca por primera vez** esta noche · dormir ≥7-8 h, alarma y ruta comprobadas (`USMLE_TAPER.d95` = `.dMenos1`) | **20** | 05:00 · 07:15 (mínimo) |
| **EXAMEN** | **mar 2-feb** | Desayuno proteína + grasa, sin carbohidratos simples; el café de siempre · tutorial: comprobar auriculares y terminar (+15 min de descanso = 60) · bloques **1-2 seguidos → 10 min · 3-4 → 10 min · 5 → almuerzo 20-30 min · 6 → 10 min · 7** · entre bloques las 40Q dejan de existir; nunca revisar ni abrir FA en el casillero · nunca salir a mitad de bloque · post-test: premiarse | 280 | — |

El **D95 en Cola de hoy** muestra el D-1 y el test day (bloques `USMLE_TAPER.d95` / `.dMenos1` / `.examen`); Readiness los
repite en la tarjeta **Taper y semana de examen**. Los D94/D95 llevan chip **TAPER** y su nota de franja en
`DIAS[].franjaNota` (el `sub` no cambia: regla de no recortar contenido). **v5.13**: el D-1 que en la v5.12 era el dom 31-ene
(fuera del plan) vuelve a ser **el propio D95**, en lunes y **fuera de la ventana original** — el corrimiento empujó el
examen al mar 2-feb; volver a la ventana exige recortar temario.

**Protocolo de burnout — REGLA (§E-7, ya no propuesta).** Si **2 hitos consecutivos con mínimo** (UWSA1/UWSA2 no
cuentan: no tienen mínimo) quedan **bajo su mínimo on-track** **y** hay síntomas (releer el mismo párrafo sin
comprender, irritabilidad extrema, indiferencia por el examen, descansos de 5 min que se vuelven de 1 h) →
**3-5 días con SOLO Anki AM (30-45 min de tarjetas viejas) + sueño**: frenar QBank, parar toda adquisición (vídeos,
temas, tarjetas nuevas), descanso activo (correr, journaling, meditación, cenas). **Cada día parado = +1 día hábil
en el plan** (`remap_inicio.js`): no se recorta ni se fusiona temario — y en v5.13 eso ya implica **mover el examen un
hábil más allá del mar 2-feb** (o recortar). Se reanuda **por el gate del 80%**, no por la fecha; si el siguiente hito vuelve
a quedar bajo mínimo → plan B de fecha (feb-mar 2027, mismo eligibility period). En la app: `usmleScores.gateHito(scores)`
devuelve `'ALERTA BURNOUT'` y `UsmleHub` pinta el banner con los 7 pasos en todas las pestañas (y la tarjeta **Gate de
hitos** en Readiness); 📏 Medición lo repite el día del segundo hito.

## 4. Franjas horarias (Google Calendar v5.2 · L-V · 6h15/día · `FRANJAS` en el TS)

**Las HORAS no cambiaron con el corrimiento v5.13** (ni con ninguno de los anteriores).

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
vie 29-ene; feb-mar 2027 vuelve a principal — examen fines de marzo 2027)** · **LIVIANO Academia
17:15-18:00**. Las HORAS no cambian con los niveles: cambia el formato del bloque de las 11:00.

Matemática de horas v5.13: 95 días × 6h15 ≈ **594h** (bloque de mañana 5h30 ≈ 523h +
eval de 18:00 ≈ 71h). **No bajó respecto de la v5.12**: como esta vez tampoco se recortó contenido sino
que se alargó el plan, los 95 días siguen siendo 95 (D94-D95 son de sesión ligera/mínima por diseño del taper, no
por recorte). La referencia IMG-base-cero es 600-1.000h: el plan queda algo por debajo del punto medio —
proteger las franjas es lo que sostiene enero. Lo que se consumió esta vez es **el finde de descanso de la v5.12**: el
D-1 vuelve a ser un día de plan (lun 1-feb, sesión mínima) y el examen pasa al **mar 2-feb**.

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
| **3** | Sistema completo · timed | Bloques de 10-20Q de TODO el sistema · timed (sin la "ventaja injusta" de saber el subtema) | Palmerton 40-50Q/día → plan: 40Q (10 pre-test + 20Q sistema + 10 tutor) | 80% en 20Q timed consecutivas del sistema | VIERNES sin NBME/UWSA a las 11:00 **hasta S10** (D22 Resp · D32 GI · D47 Neuro; los viernes D7 Cardio, D17 Resp y D37 Endo caen en 1.º-2.º día de sistema y quedan en nivel 1): 20Q del sistema en curso, o del anterior si el sistema lleva <3 días · desde S11 el viernes pasa a nivel 4 | A |
| **4** | Sistemas mixtos · timed | Bloques de 20-30Q mezclando ≥3 sistemas dominados + el nuevo (saltar entre especialidades bajo presión) | Palmerton 50-70Q/día → plan: viernes N4 = 40Q (10 pre-test + 30Q mixtos timed) · Fase B: 2×40Q (80Q) | 80% en bloques mixtos de 20Q timed de ≥3 sistemas | 18:00 EVAL (10Q mixta timed) toda la Fase A como dosis diaria · **VIERNES sin hito desde S11 (solo D62, vie 11-dic: 9 sistemas cerrados; el D52, vie 27-nov, es 2.º día de Heme → nivel 1) = 20-30Q mixtos timed a las 11:00 en vez de sistema único** (flag `VIERNES_N4_DESDE_SEMANA = 11`, texto en `DIAS[].franjaNota`) · **Fase B D82 · D83 + D86 y D88** (random timed 2×40Q + sistema débil; D86 y D88 son banco alojado en el sprint) | A (dosis diaria + viernes desde S11) → B |
| **5** | Mixto completo 40Q · timed | Bloques de 40Q random · timed 60 min (90 s/Q) = simulación exacta del examen | Palmerton 80-100Q/día (máx. 2 bloques de 40) · hitos: UWSA 160Q · NBME 200Q · Free 120 | 80% sostenido (90% para 260+) · pase seguro = NBME ≥65% (≈95%) / ≥70% (≈99%) | 05:00 STRESS SET 10Q/12min (Fases B-C) · **UWSA2 (D79, dentro de la Fase A) + NBME 31 (D84)** y **D90 · D91 · D92 · D93** (incorrects 2ª pasada + AMBOSS 200 mitades 1-2, alojados en el sprint) · Fase C (NBME 32/33 + Free 120 + taper D94-D95) · hitos de viernes = formato nivel 5 como MEDICIÓN, no como progresión | B → C (+ todos los hitos) |

**Regla determinista del generador** (no toca fechas, sistemas, hitos ni el total de 95 días):
- Fase A: posición del día dentro de su sistema (sin contar Assessment) → **1º-2º día = nivel 1** (30Q = 10 pre-test + 20 consolidación en bloques 5Q tutor) · **viernes sin hito y ≥3º día = nivel 3 hasta S10** (40Q = 10 + 20 sistema completo timed + 10 tutor) · **viernes sin hito y ≥3º día desde S11 = nivel 4** (40Q = 10 pre-test + 20-30Q timed mixtos de sistemas dominados + 10 tutor; flag `VIERNES_N4_DESDE_SEMANA = 11` en `gen_usmle_v5.js`, 12-sep tarde) · **resto = nivel 2** (40Q = 10 + 30 en bloques 5Q timed).
- Hitos (🎯): formato **nivel 5 como MEDICIÓN** (UWSA 160Q · NBME 200Q · Free 120 = 120Q), no como progresión.
- Fase A cierra con **D79 = UWSA2** (nivel 5, vie 8-ene) y los dos días dobles de Bioquímica **D80 (lun 11-ene) y D81 (mar 12-ene)** (nivel 1).
- Fase B (D82-D84): **D82 y D83 nivel 4** (2×40Q mixtos timed = 80Q) · **D84 = NBME 31** (nivel 5, cierra la fase).
- Fase C (D85-D95): **nivel 5** salvo **D86 (mar 19-ene) y D88 (jue 21-ene), nivel 4** (random timed 2×40Q + sistema débil #2 / Mehlman HY del sistema); **D90 (lun 25-ene), D91 (mar 26-ene), D92 (mié 27-ene) y D93 (jue 28-ene)** siguen siendo días de banco (incorrects 2ª pasada · AMBOSS 200 mitades 1 y 2, 80Q cada uno) y los días sin simulacro son **taper** (`TAPER_ACTIVO`): solo flagged/incorrects ya vistos + Anki maduro, cero preguntas y cero tarjetas nuevas (**D94 = 20Q · D95 = 20Q**; ver §3b).
- La eval de las 18:00 (10Q mixta timed) es la **dosis diaria de nivel 4** durante toda la Fase A; los stress sets 10Q/12min (nivel 5) solo en Fases B-C a las 05:00 (desde D82, mié 13-ene).
- Los tres días con `franjaNota` (D62 viernes N4 · D94 · D95 taper) llevan el texto de la franja 11:00 en el propio `DIAS[]`; **el `sub` de esos días no cambia** (multiconjunto de contenido idéntico a la v5.12, verificado con `node` contra `git show HEAD~1`).

### Distribución real recontada desde `DIAS` (v5.13 · 95 días)

| Fase | Días | Niveles | Q objetivo (`qDia`) |
|------|------|---------|------------------------|
| **A** · D1-D81 | 81 | N1×28 · N2×41 · N3×3 · N4×1 · N5×8 | 4160 |
| **B** · D82-D84 | 3 | N4×2 · N5×1 | 360 |
| **C** · D85-D95 | 11 | N4×2 · N5×9 | 1040 |
| **Total** | **95** | **N1×28 · N2×41 · N3×3 · N4×5 · N5×18** | **5560** |

> Respecto de la v5.12 cambian **9 días de nivel** (por contenido): al correr todo +1 día hábil, el viernes de
> cada sistema cae sobre el subtema siguiente. **Cardio pierde su viernes de nivel 3** (curvas PV D8 → N2; su viernes D7 es
> el 2.º día del sistema) y **Resp lo recupera** (D22 TEP/TVP/HTP/ARDS/cáncer de pulmón → N3); GI pasa de colon (D33) a
> intestino delgado (D32) y Neuro de convulsiones (D48) a ictus (D47); **Heme/Onc pierde su viernes de nivel 4** (coagulación
> D53 → N2; su viernes D52 es el 2.º día del sistema) y el de Micro/ID pasa de virus RNA (D63) a virus DNA/herpes/hepatitis
> (D62). Totales: N3×3 sin cambio, N4×6 → **N4×5** (1 viernes + D82-D83 + D86 y D88), N2×40 → **N2×41**. El total sigue en
> **5560Q** — el multiconjunto (sistema, subtema) es idéntico.

Desglose del total: **3320Q de trabajo diario** (83 días de plan) + **2240Q de simulacros**
(12 hitos = 9×200Q NBME + 2×160Q UWSA + 1×120Q Free 120).

**Viernes** (18 en el plan; 8 son hitos — el UWSA1 cae en jueves — y el vie 29-ene es el D94 de taper). Los 9 viernes de Fase A sin hito:
D2 (18-sep) Fundamentos **N1** · D7 (25-sep) Cardio **N1** · D17 (9-oct) Resp **N1** · **D22 (16-oct) Resp N3** · **D32 (30-oct) GI N3** · D37 (6-nov) Endo **N1** · **D47 (20-nov) Neuro N3** · D52 (27-nov) Heme/Onc **N1** · **D62 (11-dic) Micro/ID N4** (S13: mixto de los 9 sistemas cerrados: Fundamentos, Immuno, Cardio, Resp, Renal, GI, Endo, Neuro y Heme/Onc).
Los que quedan en **N1** (D2, D7, D17, D37, D52) lo hacen porque su sistema lleva <3 días: ese día el bloque de
sistema completo timed se hace del sistema **anterior**. Los viernes 25-dic y 1-ene son skip y el viernes
de Repro es el NBME 29, así que **desde S11 hay un solo viernes sin hito de nivel ≥3 hasta el fin de la Fase A**: el flag
afecta a D62 (regla, no lista).

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

Divergencias técnica Palmerton ↔ plan v5.13 (resueltas y pendientes de decisión):
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
| [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) | **v5.13 = FUENTE DE VERDAD**: DIAS (95, con `nivelUW`/`qDia`/`franjaNota`), FRANJAS (6, con nivel/gate), DAILY_META (+`metodo`, `examenVentana` superada, `examenTarget = '2027-02-02'`, `descansoD1 = '2027-02-01'`, `viernesN4DesdeSemana`), USMLE_NIVELES, USMLE_GATE, **USMLE_TAPER** (D94 D-2 última sesión de banco · D95 D-1 dentro del plan · examen mar 2-feb · burnout), helpers (`faseDe` 81/84, `nivelInfo`, `esHito`, `hitosDelPlan`, `semanaDe`, `esViernesNivel4`, `esDiaTaper`, `esDiaDermaStep1`). Generado por `gen_usmle_v5.js` → `assemble_usmle_ts.js` (`DATA/_scripts/usmle/`; flags `VIERNES_N4_DESDE_SEMANA`, `TAPER_ACTIVO`) |
| [`src/lib/ankiLinks.ts`](../../src/lib/ankiLinks.ts) | Decks Anki por examen + **`sysTag(system)` = tag compartido `sys::<sistema>`** (USMLE ↔ MIR ↔ Derma, 12-sep) · `MIR_DECK` con Epidemiología / Bioética / Dermatología (A VERIFICAR con AnkiConnect) · `DERMA_STEP1_TAG/QUERY` + `dermaAnkiTags` añade `step1 sys::Dermatology` |
| [`src/lib/mirUsmleBridge.ts`](../../src/lib/mirUsmleBridge.ts) | Puente de solo lectura MIR ↔ Step 1: `usmleMirParalelo(fecha)` (chip HOY) · en `UsmleTodayPlan` el repaso anclado 07:15 añade "MIR precedió esta semana: <asignatura>" (semana anterior + homólogo MIR del sistema de hoy) |
| [`src/lib/usmleStep1Plan.ts`](../../src/lib/usmleStep1Plan.ts) | Plan macro (SISTEMAS con `diaInicio` alineado a DIAS, PLAN_META; `inicio = '2026-09-17'`) |
| [`src/lib/usmlePalmertonData.ts`](../../src/lib/usmlePalmertonData.ts) | Vídeos Palmerton (serie High Yield, IDs + duraciones reales) |
| [`src/lib/usmleQbanklyData.ts`](../../src/lib/usmleQbanklyData.ts) | Árbol Qbankly + deep-links (`library?e=<epub>&doc=<docId>`) |
| [`src/lib/usmleData.ts`](../../src/lib/usmleData.ts) | KPIs, sistemas, disciplinas, ROI, recursos, reglas del Qbank (5 niveles) |
| [`src/lib/usmleScores.ts`](../../src/lib/usmleScores.ts) | **Medición diaria** (localStorage `jmd-usmle-scores` + Supabase `usmle_daily_scores`): gate 80%, media 7d, mínimos on-track por hito, export JSON · **`gateHito` / `alertaBurnout` + `BURNOUT_PROTOCOLO`** (REGLA §E-7: 2 hitos consecutivos bajo mínimo → 'ALERTA BURNOUT') |
| [`src/lib/obsidianMap.ts`](../../src/lib/obsidianMap.ts) | `USMLE_OBS_DAY`: D# → nota madre uWorld en el vault |
| UI | `src/components/study/UsmleHub.tsx` (barra: media 7d + Δ hito; **banner ALERTA BURNOUT**; Readiness: niveles + serie de hitos + **Gate de hitos** + **Taper y semana de examen**) + `UsmleTodayPlan.tsx` (chip nivel · chip MIR en paralelo · chips **Viernes N4 / TAPER / cuenta doble Derma** · nota de franja 11:00 · D-1 y test day en D95 · bloque "cuenta doble" el D73 · "MIR precedió esta semana" en el repaso anclado · 📏 Medición) + `ReadinessBar.tsx` · Home: `TodayMission.tsx` |

## 8. Docs de esta carpeta

- [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) — **v3 catálogo completo**:
  por materia + 5 niveles UWorld + Anki fino + test-taking/test-day + planificación NBME (D# y fechas v5.13).
- [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md) — semana a semana S1-S21 (v5.13) + día a día D1-D95 + reglas de reprogramación + gates ECFMG (agendar el mar 2-feb y confirmar el eligibility period).
- [`RECURSOS_META_2026.md`](RECURSOS_META_2026.md) — rol de cada recurso, fase, horas, qué NO usar.
- [`PALMERTON_DIVERGENCIAS_PLAN.md`](PALMERTON_DIVERGENCIAS_PLAN.md) — **técnica Palmerton → qué hace el plan v5.13 →
  divergencia → resolución aplicada / propuesta para decisión de Joseph** (incluye la decisión del 16-sep: D95 = D-1 dentro del
  plan → examen mar 2-feb, con la alternativa de recortar temario; sustituye a la del 15-sep sobre el lun 1-feb).
  **§E con estado al 16-sep**: implementadas #2 viernes de nivel 4 (solo D62), #5 taper + D-1 dentro del plan y #7 burnout (REGLA);
  siguen siendo DECISIÓN de Joseph #1 (20Q permanente), #3 (GO sin UWSA2), #4 (Free 120 en Prometric + maratón), #6 (eval a las
  12:00), #8 (arranque a 20Q si el UWSA1 <40%) y la de #5 (rendir el mar 2-feb vs recortar temario).
- [`PALMERTON_METODO_COMPLETO.md`](PALMERTON_METODO_COMPLETO.md) — el método de la A a la Z; §12 = mapeo al plan v5.13 (D# y fechas).
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
> lun 1-feb-2027, con el finde 30-31 ene de descanso fuera del plan) → **v5.13** 16-sep (**D1 = jue 17-sep → D95 = lun
> 1-feb, 95 días**: el 16-sep tampoco se estudió; el UWSA1 se mueve al jue 17-sep, **el D-1 vuelve a entrar en el plan (D95 =
> lun 1-feb, sesión mínima) y el examen pasa al mar 2-feb-2027**; sáb 30 y dom 31-ene libres).
> **Punto de inflexión en la v5.8, confirmado en v5.9 → v5.13**: de la v5.3 a la v5.7 el desfase
> se pagaba **comprimiendo contenido** (97 → 95 días con fusiones); desde la v5.8 rige la regla de
> Joseph — **no se fusiona ni se recorta nada** y el desfase se paga **alargando el plan por la cola**.
> El examen ya **no** está en la ventana 25-29 ene (target mar 2-feb): **cada día perdido desde hoy mueve el examen un
> día hábil más, o exige recortar temario** — decisión de Joseph en el momento en que ocurra.
