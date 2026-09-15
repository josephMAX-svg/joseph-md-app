# DATA · USMLE Step 1 — Doc maestro v5.12 (reestructuración 27-ago · corrimiento 15-sep-2026 · niveles Palmerton)

**Step 1 es el bloque PRINCIPAL** (heredó las franjas ENCAPS de la mañana): 6h15/día L-V.
**D1 = MIÉ 16-sep-2026 → D95 = VIE 29-ene-2027 (95 días; del 31-ago al 15-sep no se estudió: 12 hábiles perdidos) ·
EXAMEN: el plan ocupa YA toda la ventana 25-29 ene (D95 = vie 29 = última sesión, D-3) → target LUN 1-FEB-2027,
FUERA de la ventana; sáb 30 (D-2) y dom 31-ene (D-1) = descanso fuera del plan.**
Sábados y domingos LIBRES. Skip extra: 25-dic, 31-dic, 1-ene.
Fuente de verdad (código): [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) **v5.12**
(`DAILY_META.totalDias = 95`, `inicio = '2026-09-16'`, `fin = '2027-01-29'`, `examenVentana = '2027-01-25 → 2027-01-29
(superada en v5.12: D95 = vie 29-ene)'`, `examenTarget = '2027-02-01'`, `descansoD1 = '2027-01-31'`).

> **Corrimiento v5.11 → v5.12 (15-sep-2026).** El martes 15 de septiembre tampoco se estudió, así que D1 pasó
> de mar 15-sep a **mié 16-sep** (regla del sistema: cada día sin estudiar = +1 día hábil). Es el
> **undécimo corrimiento** desde el 31-ago (31-ago→15-sep sin estudiar = 12 días hábiles perdidos).
> **REGLA PERMANENTE DE JOSEPH (vigente desde la v5.8): no se fusiona ni se recorta NADA.**
> Ni un tema ni un subtema queda atrás: el temario sale 1:1 y el desfase se absorbe **alargando el
> final del plan**, nunca comprimiendo días. D95 pasa de jue 28-ene a **vie 29-ene-2027** (del 16-sep
> al 29-ene caben exactamente 95 días hábiles). Las metas, las franjas horarias y el temario
> no cambian; **11 de los 12 hitos NBME/UWSA quedan en sus fechas originales** — solo cambia su D#.
>
> **El UWSA1 vuelve a cambiar de fecha** (mar 15-sep, ya pasada sin estudiar → **mié 16-sep, sigue siendo
> el D1**: baseline el primer día, como prescribe Palmerton). El primer día de CONTENIDO (Fundamentos,
> Pathoma 1-2) es el **jue 17-sep = D2**; Cardio arranca el mié 23-sep (D6).
>
> 🔴 **Lo nuevo de esta versión: el plan llena TODA la ventana de examen y el examen SALE de ella.** Con D95 =
> vie 29-ene (último día de la ventana 25-29 ene), ya no cabe ningún día de examen dentro de la ventana:
> **target LUN 1-FEB-2027** (primer hábil tras el D95). El **sáb 30 (D-2) y el dom 31-ene (D-1) quedan FUERA del plan
> como descanso pre-examen** (solo Anki vencido + ritual de test-day el domingo; `USMLE_TAPER.dMenos1`); el D94 (jue 28)
> es el **D-4** y el D95 (vie 29) la **última sesión (D-3)**, ambos taper de 20Q flagged + Anki maduro. **Joseph debe
> agendar/reprogramar el Prometric para el lun 1-feb y confirmar que su eligibility period cubre esa fecha** (si no:
> extenderlo). La alternativa es **recortar temario** para volver a la ventana — decisión suya, registrada en
> [`PALMERTON_DIVERGENCIAS_PLAN.md`](PALMERTON_DIVERGENCIAS_PLAN.md) §E-5 (sustituye a la decisión del 14-sep sobre el D-1).
> ⚠ **Desde hoy, cada día no estudiado mueve el examen un día hábil más (o exige recortar temario).**
>
> Prueba dura del "nada se perdió": el multiconjunto de `(system, sub)` del nuevo `DIAS` es
> **idéntico** al de la v5.11 (0 filas perdidas y 0 filas nuevas en las 95; el remapeo D#(v5.11) →
> D#(v5.12) es biyectivo 95/95: 74 días conservan su D# y 21 cambian de número — los que rodean a
> cada hito) y el total de **5560Q objetivo no se movió**.

Plataforma de práctica: **Qbankly** (`qbankly.app`) — **abre SOLO en Microsoft Edge**
(Chrome con CDP la bloquea). Los links de la app ofrecen botón ◆ Edge + Chrome.

## 1. Fases

| Fase | Días | Fechas | Qué se hace | Niveles UWorld (Palmerton) |
|------|------|--------|-------------|----------------------------|
| **A · Contenido por sistemas** | D1-D81 | mié 16-sep → lun 11-ene | UWSA1 baseline (D1) + 1ª pasada completa del temario desde D2 + 30-40Q uWorld/día por nivel (= 1ª vuelta del banco entero) + 8 simulacros de hito (7 NBME/UWSA1 + **UWSA2 D80, que ahora cae DENTRO de la Fase A**) · cierre de Bioquímica = D81 lun 11-ene | **1 → 3** (+ dosis diaria de 4 en la eval 18:00) · **viernes de nivel 4 desde S11** (D53, 27-nov y D63, 11-dic: mixto de sistemas dominados) |
| **B · Banco intensivo** | D82-D85 | mar 12-ene → vie 15-ene | random timed 2×40Q + sistema débil (D82-D84) · NBME 31 (D85, 15-ene, **GO/NO-GO**) la cierra | **4 → 5** |
| **C · Sprint final** | D86-D95 | lun 18-ene → vie 29-ene | NBME 32 · banco alojado en el sprint (D87 random timed + Mehlman · D89 y D91 incorrects 2ª pasada · D92 AMBOSS 200 mitad 1 · D93 mitad 2) · NBME 33 · Free 120 · **taper explícito (D94 D-4 y D95 D-3 = 20Q flagged + Anki maduro, cero contenido nuevo)** → sáb 30 / dom 31 descanso fuera del plan → **lun 1-feb examen** (§3b) | **5** + NBME |

Días por fase (`faseDe` en el TS): **A = 81 · B = 4 · C = 10** (total 95). El corte A/B subió de D80 a
**D81** porque el contenido volvió a ganar un día por la cola: el **UWSA2 (vie 8-ene) es ahora D80 y queda dentro
de la Fase A**, el segundo día doble de Bioquímica cierra la fase como D81 (lun 11-ene) y la Fase B se reduce a los
3 días de banco D82-D84 + el NBME 31 (D85). El corte B/C bajó de D87 a **D86** (NBME 32 abre la Fase C).

## 2. Sistema → días → fechas (generado desde `DIAS` de `usmleStep1Daily.ts` v5.12)

| Sistema | Días | Fechas | Tier | Nº días |
|---------|------|--------|------|---------|
| Assessment | D1 · D13 · D28 · D43 · D58 · D68 · D75 · D80 · D85 | mié 16-sep → vie 15-ene | CORE | 9 |
| Fundamentos | D2-D3 | jue 17-sep → vie 18-sep | CORE | 2 |
| Immunology | D4-D5 | lun 21-sep → mar 22-sep | CORE | 2 |
| Cardiovascular | D6-D12 · D14-D16 | mié 23-sep → mié 7-oct | CORE | 10 |
| Respiratory | D17-D22 | jue 8-oct → jue 15-oct | CORE | 6 |
| Renal | D23-D27 · D29 | vie 16-oct → lun 26-oct | CORE | 6 |
| Gastrointestinal | D30-D36 | mar 27-oct → mié 4-nov | CORE | 7 |
| Endocrine | D37-D41 | jue 5-nov → mié 11-nov | CORE | 5 |
| Nervous System | D42 · D44-D50 | jue 12-nov → mar 24-nov | CORE | 8 |
| Hematology & Oncology | D51-D56 | mié 25-nov → mié 2-dic | HIGH | 6 |
| Microbiology / ID | D57 · D59-D64 | jue 3-dic → lun 14-dic | HIGH | 7 |
| Reproductive | D65-D67 · D69-D70 | mar 15-dic → mar 22-dic | HIGH | 5 |
| Musculoskeletal / Rheum | D71-D73 | mié 23-dic → lun 28-dic | HIGH | 3 |
| Psychiatry & Behavioral | D74 · D76-D78 | mar 29-dic → mié 6-ene | HIGH | 4 |
| Biochemistry | D79 · D81 | jue 7-ene → lun 11-ene | MED | 2 |
| Banco intensivo | D82-D84 · D87 · D89 · D91-D93 | mar 12-ene → mié 27-ene | CORE | 8 |
| Sprint final | D86 · D88 · D90 · D94-D95 | lun 18-ene → vie 29-ene | CORE | 5 |

> **El D1 (mié 16-sep) es Assessment, no contenido**: el UWSA1 se movió a ese día (su fecha anterior,
> mar 15-sep, ya pasó) y el baseline ocupa el primer día del plan (exactamente lo que prescribe
> Palmerton); **Fundamentos empieza el jue 17-sep = D2**.
> Los demás huecos dentro de un sistema (D13, D28, D43, D58, D68, D75, D80, D85) son los otros
> **días de Assessment** (hitos, §3). Reparto respecto de la v5.11: el NBME 25 (D13) sigue **partiendo
> Cardio** (ahora SCA en D14, IC + shock en D15 y valvulopatías en D16 quedan detrás); el NBME 26 (D28) **ahora
> parte Renal** (AKI/ERC/litiasis en D29 detrás) y deja GI (D30-D36) íntegro detrás; el NBME 27 (D43) parte Neuro
> (D42 · D44-D50: solo neuroanatomía delante); el NBME 28 (D58) parte Micro (D57 · D59-D64); el NBME 29 (D68)
> **parte Repro** (mama/próstata D69 e ITS/anticoncepción D70 detrás) y deja MSK (D71-D73) íntegro detrás; el
> NBME 30 (D75) **parte Psiquiatría** (solo ánimo/psicóticos D74 delante; ansiedad D76, psicofármacos D77 y Biostats
> D78 detrás); y **el UWSA2 (D80, vie 8-ene) parte los dos días dobles de Bioquímica** (D79 jue 7-ene · D81 lun
> 11-ene = cierre de Fase A). En Fase C, D86/D88/D90 son NBME 32/33 y Free 120 con `system = 'Sprint final'`, y
> **D87 (mar 19-ene), D89 (jue 21-ene), D91 (lun 25-ene), D92 (mar 26-ene) y D93 (mié 27-ene) siguen siendo
> `system = 'Banco intensivo'`** (random timed + Mehlman · incorrects 2ª pasada · AMBOSS 200 mitades 1 y 2)
> alojados dentro del sprint. Cada día trae: `sub`, `bbCh`/`bbVid` (Boards & Beyond), `uw` (subtema uWorld),
> `mat`/`matType` (material primario), `palm` (vídeo Palmerton al abrir sistema), `nivelUW` (1-5) y `qDia` (§4b).

### Qué se movió y qué NO en el corrimiento v5.12

**Nada se fusionó ni se recortó.** El desfase de 1 día hábil se pagó **por la cola del plan**, no
comprimiendo contenido — y esta vez la cola ya no cabía en la ventana de examen:

| | v5.11 (D1 = mar 15-sep) | v5.12 (D1 = mié 16-sep) |
|---|---|---|
| Días del plan | 95 | **95** (mismo temario, 1:1) |
| Primer día | mar 15-sep-2026 = UWSA1; contenido en D2, mié 16-sep | **mié 16-sep-2026 = UWSA1** (movido otra vez: su fecha ya había pasado); contenido en D2, **jue 17-sep** |
| Último día | jue 28-ene-2027 = D95 = D-1 (dentro del plan) | **vie 29-ene-2027 = D95 = última sesión (D-3)** — último día de la ventana 25-29 ene |
| Target de examen | vie 29-ene (dentro de la ventana; descanso absorbido) | **LUN 1-FEB-2027, FUERA de la ventana**; sáb 30 = D-2 y dom 31 = D-1 de descanso fuera del plan (`examenTarget` / `descansoD1`) |
| Días de contenido | cada uno en su fecha | **+1 día hábil cada uno** |
| 12 hitos NBME/UWSA | 11 fechas iguales + UWSA1 → 15-sep | **11 fechas iguales + UWSA1 → 16-sep**; cambia el D# de todos menos UWSA1 (−1) |
| Días dobles de Biochem | D79 y D80 (6 y 7-ene), delante del UWSA2 (D81) | **D79 (jue 7-ene) y D81 (lun 11-ene)**: el UWSA2 (D80, vie 8-ene) los parte y cae dentro de la Fase A |
| Cardio vs NBME 25 | partido: D6-D13 antes · D15-D16 después | **partido**: D6-D12 antes · **D14-D16** (SCA · IC · valvulopatías) después |
| Renal vs NBME 26 | íntegro antes (D23-D28) | **partido**: D23-D27 antes · **D29** (AKI/ERC/litiasis/poliquistosis) después |
| GI vs NBME 26 | íntegro después (D30-D36) | **íntegro después** (D30-D36) |
| Corte de fases | A D1-80 · B D81-86 · C D87-95 | **A D1-81 · B D82-85 · C D86-95** |
| Viernes de nivel 3 | 5 (D9 Cardio · D19 Resp · D34 GI · D39 Endo · D49 Neuro) | **3** (D8 Cardio · D33 GI · D48 Neuro) — Resp y Endo pierden el suyo (su viernes es el 2.º día del sistema) |
| Viernes de nivel 4 | 2 (D54 Heme/Onc · D64 Micro/ID) | **2** (D53 Heme/Onc coagulación · D63 Micro/ID virus RNA/VIH) |
| Q objetivo totales | 5560 | **5560** (idéntico: la prueba aritmética de que no se recortó nada) |

Los 12 hitos siguen **anclados por fecha** en el mapa `SIMS` del generador (el UWSA1 se re-ancló al
nuevo D1 porque su fecha ya había pasado), y los días no-hito se consumen desde el array `POST_A` en
los huecos libres; por eso el contenido se desliza alrededor de los simulacros sin que ninguno de los
11 restantes se mueva de su fecha. La clasificación de `nivelUW`/`qDia` depende del **origen de la
fila** (`bbCh` = `Banco` / `Sprint`), no de umbrales de fecha, así que la regla queda idéntica aunque
el contenido se derrame hasta el 11-ene.

## 3. Hitos NBME/UWSA (12) — 11 fechas intactas · UWSA1 movido al mié 16-sep

| # | Hito | Día | Fecha | Q | Rol |
|---|------|-----|-------|---|-----|
| 1 | **UWSA1** | **D1** | **mié 16-sep-2026** | 160Q | **Baseline en el PRIMER día del plan** (esperar bajo, no asustarse). Movido desde el mar 15-sep (fecha ya pasada): sigue al D1 en cada corrimiento |
| 2 | **NBME 25** | D13 | vie 2-oct-2026 | 200Q | 1ª calibración real · parte el bloque Cardio (D14 SCA, D15 IC y D16 valvulopatías quedan detrás) |
| 3 | **NBME 26** | D28 | vie 23-oct-2026 | 200Q | Tendencia · parte Renal (D29 AKI/ERC detrás); GI (D30-D36) va íntegro detrás |
| 4 | **NBME 27** | D43 | vie 13-nov-2026 | 200Q | Tendencia · parte Neuro (D42 · D44-D50) |
| 5 | **NBME 28** | D58 | vie 4-dic-2026 | 200Q | Tendencia · parte Micro (D57 · D59-D64) |
| 6 | **NBME 29** | D68 | vie 18-dic-2026 | 200Q | Parte Repro (D69 mama/próstata y D70 ITS/anticoncepción detrás); MSK (D71-D73) va íntegro detrás |
| 7 | **NBME 30** | D75 | mié 30-dic-2026 | 200Q | Cierre de contenido de 2026 (jue 31-dic y vie 1-ene son skip → cae en miércoles); parte Psiquiatría (D76-D78 detrás); Biostats (D78) y los 2 días dobles de Biochem (D79 · D81) quedan ya en 2027 |
| 8 | **UWSA2** | D80 | vie 8-ene-2027 | 160Q | Predictor de resistencia (la fecha la deciden los NBME) · **cae DENTRO de la Fase A** (parte Bioquímica: D79 delante, D81 detrás) |
| 9 | **NBME 31** | D85 | vie 15-ene-2027 | 200Q | **GO/NO-GO** · cierra la Fase B |
| 10 | **NBME 32** | D86 | lun 18-ene-2027 | 200Q | Sprint final (abre la Fase C) |
| 11 | **NBME 33** | D88 | mié 20-ene-2027 | 200Q | Sprint final |
| 12 | **FREE 120 oficial** | D90 | vie 22-ene-2027 | 120Q | Sprint final · idealmente en el Prometric real · D-10 del examen (lun 1-feb) |

Los 12 hitos suman **2240Q** de simulacro. Caen en **viernes** 8 de ellos; las excepciones son el
UWSA1 (mié 16-sep, D1), el NBME 30 (mié 30-dic, porque jue 31-dic y vie 1-ene son skip) y NBME 32/33
(lun 18-ene y mié 20-ene, ya en el sprint final). **Once de estas 12 fechas no cambiaron con la
v5.12**: solo bajó su D# en 1. El **UWSA1** volvió a re-anclarse al nuevo D1 (mar 15-sep → mié 16-sep):
un hito cuya fecha ya pasó se mueve al nuevo D1; los que aún no llegaron, no.

**Criterio GO (Step 1 es pass/fail): 2 NBME consecutivos ≥68% + UWSA2 "low risk" → confirmar
fecha.** (Palmerton: ≥65% ≈ 95% de probabilidad de aprobar; ≥70% ≈ 99% — el 68% doble queda en
el rango; mínimos on-track por hito en
[`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) Parte V.) Si NO se cumple: correr el
examen dentro del mismo eligibility period (feb-mar 2027) sin drama — un fail queda PARA
SIEMPRE en el transcript ECFMG (~1/3 de PDs nunca consideran un aplicante con fail en Step 1).
Detalle de gates y logística ECFMG/Prometric: [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md).

> ⚠ **Consecuencia del undécimo corrimiento sobre la semana del examen.** Con D95 = **vie 29-ene**, el
> plan ocupa el último día de la ventana 25-29 ene: **ya no hay ningún día de examen dentro de la ventana**.
> El target pasa al **LUN 1-FEB-2027** (`DAILY_META.examenTarget = '2027-02-01'`); el sáb 30 (D-2) y el dom 31-ene
> (D-1, `descansoD1 = '2027-01-31'`) quedan fuera del plan como descanso; D94 (jue 28) = D-4 y D95 (vie 29) = D-3 =
> última sesión (§3b; `USMLE_TAPER.d94/.d95/.dMenos1/.examen` en el TS). **Prometric: agendar/reprogramar para el
> lun 1-feb y confirmar que el eligibility period cubre esa fecha (si no, extenderlo)**; la única otra opción es
> **recortar temario** — decisión de Joseph. **Y desde aquí cada día perdido mueve el examen un día hábil más.**

## 3b. Semana de examen: taper D94-D95 · finde de descanso fuera del plan · test day lun 1-feb · protocolo de burnout (REGLA)

*(12-sep-2026, tarde — divergencias Palmerton #22 y #29 implementadas sin tocar horario, temario ni fechas; remapeadas el
15-sep a la v5.12. Fuente de cada paso: [`PALMERTON_METODO_COMPLETO.md`](PALMERTON_METODO_COMPLETO.md) §8.3-§8.4 y §9.12; código:
`USMLE_TAPER` y `DAILY_META.examenTarget / descansoD1` en `usmleStep1Daily.ts`, `BURNOUT_PROTOCOLO` + `gateHito` en `usmleScores.ts`.)*

| Día | Fecha | Qué se hace | Q | Franjas |
|-----|-------|-------------|---|---------|
| desde **D85** (NBME 31) | vie 15-ene | **Cese de lo nuevo**: cero preguntas nuevas y cero tarjetas nuevas (Palmerton: 1-2 semanas antes); solo incorrects/flagged + AMBOSS 200 como repaso de conceptos ya vistos; no repetir NBME ya hechos | — | sin cambio |
| **D94 · D-4** | jue 28-ene | Solo Anki **maduro** + 20Q flagged/incorrects ya vistos (sin bloque timed, sin AMBOSS) · repaso First Aid de esquemas (sistemas 6-10) · dormir ≥7 h ya desde hoy | **20** | 05:00 · 07:15 · 11:00 |
| **D95 · D-3 (última sesión del plan)** | **vie 29-ene** | **Sesión LIGERA**: Anki maduro + 20Q flagged con los mejores esquemas e imágenes · rapid review FA · cero preguntas nuevas, cero tarjetas nuevas, ningún bloque timed · **tarde: permiso impreso + digital, 2 ID con el nombre EXACTO del permiso, bolsas Ziploc numeradas (Break #1-#4), ruta al Prometric** | **20** | 05:00 · 07:15 · 11:00 (ligero) |
| **sáb 30 · D-2** | sáb 30-ene | **FUERA del plan**: sin banco; solo Anki vencido | — | — |
| **dom 31 · D-1** | **dom 31-ene** | **FUERA del plan** (`USMLE_TAPER.dMenos1`): solo Anki vencido (idealmente ya adelantado), cero tarjetas nuevas · PROHIBIDO bloques, temas densos y abrir First Aid "para ver cuánto sé" · nada de estudio después de las 17:00 (journaling, ejercicio suave, visualización, cena con proteína) · empacar permiso + 2 ID + snacks Ziploc · somnífero **nunca por primera vez** esta noche · dormir ≥7-8 h, alarma y ruta comprobadas | — | — |
| **EXAMEN** | **lun 1-feb** | Desayuno proteína + grasa, sin carbohidratos simples; el café de siempre · tutorial: comprobar auriculares y terminar (+15 min de descanso = 60) · bloques **1-2 seguidos → 10 min · 3-4 → 10 min · 5 → almuerzo 20-30 min · 6 → 10 min · 7** · entre bloques las 40Q dejan de existir; nunca revisar ni abrir FA en el casillero · nunca salir a mitad de bloque · post-test: premiarse | 280 | — |

El **D95 en Cola de hoy** muestra el D-1 y el test day (bloques `USMLE_TAPER.d95` / `.dMenos1` / `.examen`); Readiness los
repite en la tarjeta **Taper y semana de examen**. Los D94/D95 llevan chip **TAPER** y su nota de franja en
`DIAS[].franjaNota` (el `sub` no cambia: regla de no recortar contenido). **v5.12**: el D-1 que en la v5.11 era el propio D95
(jue 28) vuelve a quedar **fuera del plan**, pero en **domingo** y **fuera de la ventana original** — el corrimiento empujó el
examen al lun 1-feb; volver a la ventana exige recortar temario.

**Protocolo de burnout — REGLA (§E-7, ya no propuesta).** Si **2 hitos consecutivos con mínimo** (UWSA1/UWSA2 no
cuentan: no tienen mínimo) quedan **bajo su mínimo on-track** **y** hay síntomas (releer el mismo párrafo sin
comprender, irritabilidad extrema, indiferencia por el examen, descansos de 5 min que se vuelven de 1 h) →
**3-5 días con SOLO Anki AM (30-45 min de tarjetas viejas) + sueño**: frenar QBank, parar toda adquisición (vídeos,
temas, tarjetas nuevas), descanso activo (correr, journaling, meditación, cenas). **Cada día parado = +1 día hábil
en el plan** (`remap_inicio.js`): no se recorta ni se fusiona temario — y en v5.12 eso ya implica **mover el examen un
hábil más allá del lun 1-feb** (o recortar). Se reanuda **por el gate del 80%**, no por la fecha; si el siguiente hito vuelve
a quedar bajo mínimo → plan B de fecha (feb-mar 2027, mismo eligibility period). En la app: `usmleScores.gateHito(scores)`
devuelve `'ALERTA BURNOUT'` y `UsmleHub` pinta el banner con los 7 pasos en todas las pestañas (y la tarjeta **Gate de
hitos** en Readiness); 📏 Medición lo repite el día del segundo hito.

## 4. Franjas horarias (Google Calendar v5.2 · L-V · 6h15/día · `FRANJAS` en el TS)

**Las HORAS no cambiaron con el corrimiento v5.12** (ni con ninguno de los anteriores).

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

Matemática de horas v5.12: 95 días × 6h15 ≈ **594h** (bloque de mañana 5h30 ≈ 523h +
eval de 18:00 ≈ 71h). **No bajó respecto de la v5.11**: como esta vez tampoco se recortó contenido sino
que se alargó el plan, los 95 días siguen siendo 95 (D94-D95 son de sesión ligera por diseño del taper, no
por recorte). La referencia IMG-base-cero es 600-1.000h: el plan queda algo por debajo del punto medio —
proteger las franjas es lo que sostiene enero. Lo que sí se consumió es **la ventana de examen entera**:
D95 cae el **vie 29-ene** (último día de la ventana) y el examen pasa al **lun 1-feb**.

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
| **3** | Sistema completo · timed | Bloques de 10-20Q de TODO el sistema · timed (sin la "ventaja injusta" de saber el subtema) | Palmerton 40-50Q/día → plan: 40Q (10 pre-test + 20Q sistema + 10 tutor) | 80% en 20Q timed consecutivas del sistema | VIERNES sin NBME/UWSA a las 11:00 **hasta S10** (D8 Cardio · D33 GI · D48 Neuro; los viernes D18 Resp, D23 Renal y D38 Endo caen en 1.º-2.º día de sistema y quedan en nivel 1): 20Q del sistema en curso, o del anterior si el sistema lleva <3 días · desde S11 el viernes pasa a nivel 4 | A |
| **4** | Sistemas mixtos · timed | Bloques de 20-30Q mezclando ≥3 sistemas dominados + el nuevo (saltar entre especialidades bajo presión) | Palmerton 50-70Q/día → plan: viernes N4 = 40Q (10 pre-test + 30Q mixtos timed) · Fase B: 2×40Q (80Q) | 80% en bloques mixtos de 20Q timed de ≥3 sistemas | 18:00 EVAL (10Q mixta timed) toda la Fase A como dosis diaria · **VIERNES sin hito desde S11 (D53, vie 27-nov: ≥8 sistemas cerrados · D63, vie 11-dic) = 20-30Q mixtos timed a las 11:00 en vez de sistema único** (flag `VIERNES_N4_DESDE_SEMANA = 11`, texto en `DIAS[].franjaNota`) · **Fase B D82 · D83 · D84 + D87** (random timed 2×40Q + sistema débil; D87 es banco alojado en el sprint) | A (dosis diaria + viernes desde S11) → B |
| **5** | Mixto completo 40Q · timed | Bloques de 40Q random · timed 60 min (90 s/Q) = simulación exacta del examen | Palmerton 80-100Q/día (máx. 2 bloques de 40) · hitos: UWSA 160Q · NBME 200Q · Free 120 | 80% sostenido (90% para 260+) · pase seguro = NBME ≥65% (≈95%) / ≥70% (≈99%) | 05:00 STRESS SET 10Q/12min (Fases B-C) · **UWSA2 (D80, dentro de la Fase A) + NBME 31 (D85)** y **D89 · D91 · D92 · D93** (incorrects 2ª pasada + AMBOSS 200 mitades 1-2, alojados en el sprint) · Fase C (NBME 32/33 + Free 120 + taper D94-D95) · hitos de viernes = formato nivel 5 como MEDICIÓN, no como progresión | B → C (+ todos los hitos) |

**Regla determinista del generador** (no toca fechas, sistemas, hitos ni el total de 95 días):
- Fase A: posición del día dentro de su sistema (sin contar Assessment) → **1º-2º día = nivel 1** (30Q = 10 pre-test + 20 consolidación en bloques 5Q tutor) · **viernes sin hito y ≥3º día = nivel 3 hasta S10** (40Q = 10 + 20 sistema completo timed + 10 tutor) · **viernes sin hito y ≥3º día desde S11 = nivel 4** (40Q = 10 pre-test + 20-30Q timed mixtos de sistemas dominados + 10 tutor; flag `VIERNES_N4_DESDE_SEMANA = 11` en `gen_usmle_v5.js`, 12-sep tarde) · **resto = nivel 2** (40Q = 10 + 30 en bloques 5Q timed).
- Hitos (🎯): formato **nivel 5 como MEDICIÓN** (UWSA 160Q · NBME 200Q · Free 120 = 120Q), no como progresión.
- Fase A cierra con **D80 = UWSA2** (nivel 5, vie 8-ene) y **D81 = Bioquímica día doble 2** (nivel 1, lun 11-ene).
- Fase B (D82-D85): **D82, D83 y D84 nivel 4** (2×40Q mixtos timed = 80Q) · **D85 = NBME 31** (nivel 5, cierra la fase).
- Fase C (D86-D95): **nivel 5** salvo **D87 (mar 19-ene, nivel 4: random timed 2×40Q + Mehlman HY del sistema débil #2)**; **D89 (jue 21-ene), D91 (lun 25-ene), D92 (mar 26-ene) y D93 (mié 27-ene)** siguen siendo días de banco (incorrects 2ª pasada · AMBOSS 200 mitades 1 y 2, 80Q cada uno) y los días sin simulacro son **taper** (`TAPER_ACTIVO`): solo flagged/incorrects ya vistos + Anki maduro, cero preguntas y cero tarjetas nuevas (**D94 = 20Q · D95 = 20Q**; ver §3b).
- La eval de las 18:00 (10Q mixta timed) es la **dosis diaria de nivel 4** durante toda la Fase A; los stress sets 10Q/12min (nivel 5) solo en Fases B-C a las 05:00 (desde D82, mar 12-ene).
- Los cuatro días con `franjaNota` (D53 y D63 viernes N4 · D94 · D95 taper) llevan el texto de la franja 11:00 en el propio `DIAS[]`; **el `sub` de esos días no cambia** (multiconjunto de contenido idéntico a la v5.11, verificado con `node` contra `git show HEAD~1`).

### Distribución real recontada desde `DIAS` (v5.12 · 95 días)

| Fase | Días | Niveles | Q objetivo (`qDia`) |
|------|------|---------|------------------------|
| **A** · D1-D81 | 81 | N1×28 · N2×40 · N3×3 · N4×2 · N5×8 | 4160 |
| **B** · D82-D85 | 4 | N4×3 · N5×1 | 440 |
| **C** · D86-D95 | 10 | N4×1 · N5×9 | 960 |
| **Total** | **95** | **N1×28 · N2×40 · N3×3 · N4×6 · N5×18** | **5560** |

> Respecto de la v5.11 cambian **12 días de nivel** (5 pares en los que el viernes se desplaza un
> subtema: D8↔D9 Cardio · D33↔D34 GI · D48↔D49 Neuro · D53↔D54 Heme/Onc · D63↔D64 Micro/ID, más
> D19 Resp y D39 Endo que bajan de N3 a N2): al correr todo +1 día hábil, el viernes de
> cada sistema cae sobre el subtema anterior. **Resp y Endo pierden su viernes de nivel 3** (su viernes es ahora el
> 2.º día del sistema) y Renal sigue sin tenerlo. Totales: N3×5 → **N3×3**, N2×38 → **N2×40**, N4×6 sin cambio
> (2 viernes + D82-D84 + D87). El total sigue en **5560Q** — el multiconjunto (sistema, subtema) es idéntico.

Desglose del total: **3320Q de trabajo diario** (83 días de plan) + **2240Q de simulacros**
(12 hitos = 9×200Q NBME + 2×160Q UWSA + 1×120Q Free 120).

**Viernes** (18 en el plan; 8 son hitos — el UWSA1 cae en miércoles — y el vie 29-ene es el D95 de taper). Los 9 viernes de Fase A sin hito:
D3 (18-sep) Fundamentos **N1** · D8 (25-sep) Cardio **N3** · D18 (9-oct) Resp **N1** · D23 (16-oct) Renal **N1** · D33 (30-oct) GI **N3** · D38 (6-nov) Endo **N1** · D48 (20-nov) Neuro **N3** · **D53 (27-nov) Heme/Onc N4** (primer viernes desde S11: 20-30Q mixtos de Fundamentos, Immuno, Cardio, Resp, Renal, GI, Endo y Neuro) · **D63 (11-dic) Micro/ID N4** (S13: mixto de los 9 sistemas cerrados).
Los que quedan en **N1** (D3, D18, D23, D38) lo hacen porque su sistema lleva <3 días: ese día el bloque de
sistema completo timed se hace del sistema **anterior**. Los viernes 25-dic y 1-ene son skip y el viernes
de Repro es el NBME 29, así que **desde S11 hay dos viernes sin hito hasta el fin de la Fase A**: el flag afecta
a D53 y D63 (regla, no lista).

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

Divergencias técnica Palmerton ↔ plan v5.12 (resueltas y pendientes de decisión):
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
| [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) | **v5.12 = FUENTE DE VERDAD**: DIAS (95, con `nivelUW`/`qDia`/`franjaNota`), FRANJAS (6, con nivel/gate), DAILY_META (+`metodo`, `examenVentana` superada, `examenTarget = '2027-02-01'`, `descansoD1 = '2027-01-31'`, `viernesN4DesdeSemana`), USMLE_NIVELES, USMLE_GATE, **USMLE_TAPER** (D94 D-4 · D95 D-3 última sesión · D-1 dom 31-ene fuera del plan · examen lun 1-feb · burnout), helpers (`faseDe` 81/85, `nivelInfo`, `esHito`, `hitosDelPlan`, `semanaDe`, `esViernesNivel4`, `esDiaTaper`, `esDiaDermaStep1`). Generado por `gen_usmle_v5.js` → `assemble_usmle_ts.js` (`DATA/_scripts/usmle/`; flags `VIERNES_N4_DESDE_SEMANA`, `TAPER_ACTIVO`) |
| [`src/lib/ankiLinks.ts`](../../src/lib/ankiLinks.ts) | Decks Anki por examen + **`sysTag(system)` = tag compartido `sys::<sistema>`** (USMLE ↔ MIR ↔ Derma, 12-sep) · `MIR_DECK` con Epidemiología / Bioética / Dermatología (A VERIFICAR con AnkiConnect) · `DERMA_STEP1_TAG/QUERY` + `dermaAnkiTags` añade `step1 sys::Dermatology` |
| [`src/lib/mirUsmleBridge.ts`](../../src/lib/mirUsmleBridge.ts) | Puente de solo lectura MIR ↔ Step 1: `usmleMirParalelo(fecha)` (chip HOY) · en `UsmleTodayPlan` el repaso anclado 07:15 añade "MIR precedió esta semana: <asignatura>" (semana anterior + homólogo MIR del sistema de hoy) |
| [`src/lib/usmleStep1Plan.ts`](../../src/lib/usmleStep1Plan.ts) | Plan macro (SISTEMAS con `diaInicio` alineado a DIAS, PLAN_META; `inicio = '2026-09-16'`) |
| [`src/lib/usmlePalmertonData.ts`](../../src/lib/usmlePalmertonData.ts) | Vídeos Palmerton (serie High Yield, IDs + duraciones reales) |
| [`src/lib/usmleQbanklyData.ts`](../../src/lib/usmleQbanklyData.ts) | Árbol Qbankly + deep-links (`library?e=<epub>&doc=<docId>`) |
| [`src/lib/usmleData.ts`](../../src/lib/usmleData.ts) | KPIs, sistemas, disciplinas, ROI, recursos, reglas del Qbank (5 niveles) |
| [`src/lib/usmleScores.ts`](../../src/lib/usmleScores.ts) | **Medición diaria** (localStorage `jmd-usmle-scores` + Supabase `usmle_daily_scores`): gate 80%, media 7d, mínimos on-track por hito, export JSON · **`gateHito` / `alertaBurnout` + `BURNOUT_PROTOCOLO`** (REGLA §E-7: 2 hitos consecutivos bajo mínimo → 'ALERTA BURNOUT') |
| [`src/lib/obsidianMap.ts`](../../src/lib/obsidianMap.ts) | `USMLE_OBS_DAY`: D# → nota madre uWorld en el vault |
| UI | `src/components/study/UsmleHub.tsx` (barra: media 7d + Δ hito; **banner ALERTA BURNOUT**; Readiness: niveles + serie de hitos + **Gate de hitos** + **Taper y semana de examen**) + `UsmleTodayPlan.tsx` (chip nivel · chip MIR en paralelo · chips **Viernes N4 / TAPER / cuenta doble Derma** · nota de franja 11:00 · D-1 y test day en D95 · bloque "cuenta doble" el D73 · "MIR precedió esta semana" en el repaso anclado · 📏 Medición) + `ReadinessBar.tsx` · Home: `TodayMission.tsx` |

## 8. Docs de esta carpeta

- [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) — **v3 catálogo completo**:
  por materia + 5 niveles UWorld + Anki fino + test-taking/test-day + planificación NBME (D# y fechas v5.12).
- [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md) — semana a semana S1-S20 (v5.12) + día a día D1-D95 + reglas de reprogramación + gates ECFMG (agendar el lun 1-feb y confirmar el eligibility period).
- [`RECURSOS_META_2026.md`](RECURSOS_META_2026.md) — rol de cada recurso, fase, horas, qué NO usar.
- [`PALMERTON_DIVERGENCIAS_PLAN.md`](PALMERTON_DIVERGENCIAS_PLAN.md) — **técnica Palmerton → qué hace el plan v5.12 →
  divergencia → resolución aplicada / propuesta para decisión de Joseph** (incluye la decisión del 15-sep: el examen sale de la
  ventana → lun 1-feb, con la alternativa de recortar temario; sustituye a la del 14-sep sobre el D-1 absorbido).
  **§E con estado al 15-sep**: implementadas #2 viernes de nivel 4 (D53 · D63), #5 taper + D-1 fuera del plan y #7 burnout (REGLA);
  siguen siendo DECISIÓN de Joseph #1 (20Q permanente), #3 (GO sin UWSA2), #4 (Free 120 en Prometric + maratón), #6 (eval a las
  12:00), #8 (arranque a 20Q si el UWSA1 <40%) y la de #5 (rendir el lun 1-feb vs recortar temario).
- [`PALMERTON_METODO_COMPLETO.md`](PALMERTON_METODO_COMPLETO.md) — el método de la A a la Z; §12 = mapeo al plan v5.12 (D# y fechas).
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
> pre-examen se absorbe dentro del plan: D95 = D-1) → **v5.12** 15-sep (**D1 = mié 16-sep → D95 = vie 29-ene,
> 95 días**: el 15-sep tampoco se estudió; el UWSA1 se mueve al mié 16-sep, **el plan llena toda la ventana 25-29 ene
> y el examen sale de ella: target lun 1-feb-2027**, con el finde 30-31 ene de descanso fuera del plan).
> **Punto de inflexión en la v5.8, confirmado en v5.9 → v5.12**: de la v5.3 a la v5.7 el desfase
> se pagaba **comprimiendo contenido** (97 → 95 días con fusiones); desde la v5.8 rige la regla de
> Joseph — **no se fusiona ni se recorta nada** y el desfase se paga **alargando el plan por la cola**.
> El examen ya **no** está en la ventana 25-29 ene (target lun 1-feb): **cada día perdido desde hoy mueve el examen un
> día hábil más, o exige recortar temario** — decisión de Joseph en el momento en que ocurra.
