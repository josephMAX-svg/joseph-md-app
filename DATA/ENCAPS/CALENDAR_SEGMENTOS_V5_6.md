# 📅 SEGMENTOS DEL CALENDAR — RÉGIMEN v5.10 (corrimiento aplicado en vivo 12-sep-2026)
> **📌 Nota v5.10 (sáb 12-sep-2026).** Este documento **ya refleja el corrimiento a D1 = lunes 14-sep-2026** (el viernes 11 de septiembre tampoco se estudió; es el **9.º corrimiento** desde el 31-ago). El nombre del fichero conserva `V5_6` **solo por los enlaces existentes**: lo citan como autoridad varias descripciones de series del Calendar y otros docs del repo, y renombrarlo los rompería. El contenido es v5.10 en todas sus secciones; toda referencia a "v5.6"…"v5.9" fuera de las citas literales/históricas está superada. Última pasada sobre el Calendar en vivo: **12-sep-2026, 28 descripciones reescritas + 1 evento movido de fecha (el UWSA1)** (§11).
> ⚠ **La regla permanente de Joseph: NO se fusiona ni se recorta contenido — ni un tema ni un subtema se deja atrás.** El desfase se absorbe **alargando el final del plan**, nunca comprimiendo días. En v5.10 el Step 1 termina el **mié 27-ene-2027 (D95)**, que era el target de examen → **el target pasa al vie 29-ene-2027** (último día de la ventana 25-29 ene, que NO cambia; el **jue 28-ene** queda como día de descanso pre-examen). Los 2 "días dobles" de Bioquímica que ya existían en v5.7 se conservan tal cual (no se crearon días dobles nuevos).
> ⚡ **Novedad estructural de v5.10: el UWSA1 CAMBIÓ DE FECHA.** Estaba anclado por fecha al vie 11-sep, que ya pasó sin estudiar; como el D1 debe ser la línea base (Palmerton), **el evento suelto `o1gla7846uae4tgngvc4q45osg` se movió al lun 14-sep 09:00-13:00 (misma hora, misma zona `America/Lima`) y sigue siendo el D1**. Es el **primer hito que cambia de fecha en los 9 corrimientos**; los otros 11 conservan su fecha y solo cambian de D# (todos −1). El contenido (Fundamentos · Pathoma 1-2) arranca el **mar 15-sep = D2**.
> Fuente: Google Calendar `josephsototocas@gmail.com` · zona `America/Lima` · estructura L-V/sáb/dom extraída el 05-sep (166 eventos), reverificada en vivo el 08-sep, reescrita el 09-sep (28 descripciones), el 10-sep (24) y **reescrita el 12-sep con `get_event` + `update_event` + `get_event` de verificación en los 28 eventos tocados** (12 overlays + 16 series). En 27 se cambió **solo `description`**; en el UWSA1 se cambió además `start`/`end`. Horas del resto, títulos, RRULE, `colorId` y `transparency` verificados intactos. Se verificó además con `list_events` que el **lun 14-sep** tiene los 13 bloques de estudio + el overlay UWSA1 (30 eventos ese día) y que el **vie 11-sep ya no tiene ningún overlay**.
> **Autoridad de CUÁNDO y CÓMO** se ejecuta cada segmento (L-V + sábado/domingo). El **QUÉ** (tema/misión del día) lo mandan la app YoCPMD y sus planes: `src/lib/usmleStep1Daily.ts` (**95 días**, D1 = 2026-09-14 → D95 = 2027-01-27), Supabase `study_schedule` (ENCAPS **97 días**, `encapsPlan.ts`), `mirDailyPlan.ts`, `researchDailyPlan.ts`/`dermaDailyPlan.ts`, `aurumDailyPlan.ts`, `livianoStudyPlan.ts`, `synapseDailyPlan.ts`, `vibecodingPlan.ts`.
> Sustituye a [`CALENDAR_SEGMENTOS_LUNES_VIERNES.md`](./CALENDAR_SEGMENTOS_LUNES_VIERNES.md) (24-jul, loop ENCAPS — HISTÓRICO). Doc maestro del régimen: `DATA/REESTRUCTURACION_31AGO_2026.md`.

## 0 · Reglas del régimen v5.10 (las que el Calendar materializa)
| Regla | Valor |
|---|---|
| **D1** | **lunes 14-sep-2026** (31-ago→11-sep no estudiados; **9 corrimientos acumulados**. v5.9 tenía D1 = vie 11-sep: el 11 de septiembre no se estudió y el plan corrió +1 día hábil) |
| **D1 = hito** | El D1 **es el UWSA1** (baseline, 09:00-13:00), **movido del vie 11 al lun 14-sep** — el único hito que cambia de fecha. El contenido arranca el **mar 15-sep = D2** (Pathoma 1-2). Los otros 11 hitos siguen **anclados por fecha** desde v5.8 |
| **Fases USMLE** | **A · contenido D1-D80** (14-sep→**6-ene**) · **B · banco D81-D87** (7-ene→15-ene, **7 días**) · **C · sprint D88-D95** (18-ene→**27-ene**). **No se fusionó ni se recortó ningún día de contenido**: el multiconjunto de temas es idéntico al de v5.9 y el desfase se absorbió al final (D95 = mié 27-ene). **D89 (19-ene), D91 (21-ene) y D93 (25-ene)** son días de banco alojados dentro del sprint (incorrects 2.ª pasada · AMBOSS 200 mitad 1 · mitad 2); **D94 (26-ene)** = repaso FA sistemas 6-10 (40Q flagged) · **D95 (27-ene)** = rapid review (20Q). Bioquímica (los 2 días dobles heredados de v5.7) = **D79 mar 5-ene y D80 mié 6-ene**, ambos DESPUÉS del NBME 30 (D77 mié 30-dic) y de Biostats (**D78 lun 4-ene**); MSK **D71-D73 (lun 21 → mié 23-dic)** íntegro DESPUÉS del NBME 29 (D70 vie 18-dic): el corrimiento ya no lo parte |
| Días de plan | L-V; feriados fuera del plan: 25-dic, 31-dic, 1-ene. **Verificado con `node`: 0 sábados, 0 domingos y 0 feriados en las 95 entradas de `DIAS`, D# 1-95 consecutivos.** 20 semanas: **S1 = 14-18 sep completa (5 días)** · S15 = 21-24 dic (4) · S16 = 28-30 dic (3) · **S20 = 25-27 ene (3 días)** |
| **Bloque principal** | **USMLE Step 1** — 6h15/día: 05:00 Anki AM · 07:15 repaso anclado · 08:15 pre-test 10Q · 09:00 deep prime · 11:00 30Q · 18:00 eval |
| Examen Step 1 | semana **25-29 ene 2027** (**target vie 29-ene**; jue 28 descanso pre-examen) · **GO/NO-GO vie 15-ene** (NBME 31 = **D87**): 2 NBME consecutivos ≥68 % + UWSA2 low-risk |
| Secundarios (v5.10, leídos de los `.ts`/`.sql` con `node` y de Supabase en vivo) | MIR 15:15-16:15 (**78 días**, 14-sep → **lun 4-ene-2027** = 76 temas + D77 mini-MIR + D78 corrección; luego mantenimiento **63 días 4-ene→31-mar-2027, fijo**, con **18 días en modo reducido hasta el 27-ene**) · ENCAPS 16:15-17:15 (mantenimiento **97 días**, 14-sep → vie 29-ene-2027 = **79 de banqueo + 18 mini-sims de viernes**; Supabase `study_schedule` **confirmado en vivo el 12-sep: 97 filas ENCAPS, min 2026-09-14, max 2027-01-29, 18 `mini_sim` + 79 `banqueo1h`, backup `study_schedule_bk_0912` existente y `bk_0910/0909/0908` intactos**; examen fin-mar 2027, meta ≥17/20; feb-mar vuelve a principal) · LIVIANO 17:15-18:00 (**90 días**, 14-sep → **mié 20-ene-2027**; 16 casos en viernes · **18** pre-tests de lunes · 4 drills) · Research↔Derma 13:30-14:15 (alternos: **Research 42 átomos** lun 14-sep → mar 9-feb-2027 **SIN cambio** · **Derma 70 sesiones mar 15-sep → mar 30-mar-2027**, +2 días de calendario por la paridad anclada al 10-jun: el lun 14 es día Research) · AURUM 14:15-15:15 (**130 días**, 14-sep → **mié 17-mar-2027**) · SYNAPSE 12:30 (30') (**81 días**, 14-sep → **jue 3-dic-2026**) + vibecoding 04:15 (**60 días L-V**, 14-sep → **vie 4-dic-2026**, 12 proyectos, SHIP sáb 19-sep … sáb 5-dic, iguales que en v5.9) · Business **121** (84 trabajo + 37 descanso, 14-sep → mar 12-ene-2027; sin serie propia en el Calendar) |
| Fin de semana | **SÁBADO Y DOMINGO LIBRES de banco de preguntas** (los hitos van en viernes). No es "libre" literal: despertar 04:00 (EKER), caminata, SYNAPSE PC 15:00-17:00 ambos días, video empresa sáb 17:00, Anki sáb 19:00 / dom 17:00, baile |
| Corrimiento | cada día hábil sin estudiar = +1: `node DATA/_scripts/remap_inicio.js <fecha>` + `gen_encaps_mantenimiento_2027.js` + `gen_synapse_plan.js` + `gen_aurum_plan.js` + regenerar USMLE. **Los overlays de hito NO se mueven** (fechas fijas) **salvo que su fecha ya haya pasado** — es lo que le ocurrió al UWSA1 el 12-sep — pero **su D# sí cambia** y hay que reescribir la `description` de los 12 (ver §5 y §11) |
| Sueño | 21:00 → 04:00 (7h) todos los días. Ley cero de `RUTINA_EXTREMA_MILITARIZADA.md` |
| Comida/hidratación (05-sep) | desayuno ≥30 g proteína + 500 ml · 500 ml + snack al abrir deep prime 09:00 y MIR 15:15 · almuerzo = comida principal (VITALS dimensiona) · **cena ligera 5' en el cambio ENCAPS→LIVIANO 17:15** · post-GYM/BAILE solo agua/electrolitos (nada pesado <2h antes de las 21:00). Pisos VITALS: proteína 1,6 g/kg · agua 3.000 ml · sueño 7h (`VITALS/web/src/lib/engine/domain.ts`) |

### 0.1 · Semana real de arranque v5.10 — lun 14 → vie 18 sep 2026 (S1 completa)
Por primera vez desde el 31-ago la semana de arranque es **completa (5 días hábiles)** y el lunes **es el UWSA1**. Los **13 bloques de estudio** del régimen L-V + el overlay se verificaron en vivo el **12-sep con `list_events` sobre el lun 14** (30 eventos ese día: 04:15 IA · 05:00 Anki AM · 07:15 repaso · 08:15 pre-test · 09:00 deep prime · **09:00-13:00 🎯 UWSA1 (evento suelto, color 6, `transparent`)** · 11:00 30Q · 12:30 SYNAPSE · 13:30 Research↔Derma · 14:15 AURUM · 15:15+15:30 MIR · 16:15 ENCAPS · 17:15 LIVIANO · 18:00 eval; el resto son rutina/comida/GYM+BAILE) y **sobre el vie 11**, que ya no tiene ningún overlay. **Sáb 12 y dom 13 siguen sin banco de preguntas.** Solo se movió un evento (UWSA1); no se creó ni borró ninguno.

| Día | D# USMLE | Bloques de estudio (13/13 series) | Hito |
|---|---|---|---|
| ~~Vie 11-sep~~ | — | **NO estudiado** — origen del corrimiento a v5.10 (el UWSA1 que estaba aquí se movió al lun 14) | — |
| Sáb 12-sep | — | **libre de banco**: rutina 04:00-07:15 · 15:00-17:00 SYNAPSE PC · 17:00-19:00 video empresa · 19:00 Anki · 20:00 baile | — |
| Dom 13-sep | — | **libre de banco**: rutina 04:00-07:15 · 15:00-17:00 SYNAPSE repaso+PC · 17:00 Anki · 17:15/18:00 baile | — |
| **Lun 14-sep** | **D1** — Assessment · nivelUW 5 · 160Q · **el D1 es el UWSA1** · Research **D1** en la franja 13:30 | los 13 bloques — **el overlay 🎯 UWSA1 09:00-13:00 pisa deep prime, 30Q, almuerzo y SYNAPSE** (ver §5) | 🎯 **UWSA1 BASELINE** |
| Mar 15-sep | **D2** — Fundamentos · Pathoma 1-2 (lesión/muerte celular + inflamación) · nivelUW 1 · 30Q · Derma **d1** en la franja 13:30 | los 13 bloques, sin overlay | — |
| Mié 16-sep | **D3** — Fundamentos · Pathoma 3 (neoplasia) + setup Anki FSRS · Research **D2** | los 13 bloques | — |
| Jue 17-sep | **D4** — Immunology · inmunidad innata/adaptativa + MHC + linfocitos T/B · Derma **d2** | los 13 bloques | — |
| Vie 18-sep | **D5** — Immunology (hipersensibilidad…) · Research **D3** · GYM 19:00 + BAILE 20:00 | los 13 bloques | — |
| Sáb 19-sep | — | libre de banco · **15:00-17:00 SYNAPSE PC = 1.er SHIP** (S1 = fix del parser APEX, `vibecodingPlan.ts`) | — |

⚠ **El D1 del plan es un hito y eso es lo correcto**: Palmerton pide la línea base *antes* de tocar contenido. Pathoma 1-2, que en v5.9 era el D2 del lun 14, pasa a ser el **D2 del mar 15-sep**; **nada se perdió** — todo el temario se desplazó un día hábil y el plan se alargó por la cola.

## 1 · LUNES-VIERNES — tabla maestra (estructura verificada en vivo el 12-sep sobre el lun 14-sep: 30 eventos, 13 bloques de estudio + overlay UWSA1)
Series recurrentes (`recurringEventId`). Color = `colorId` de Google. "desc" = longitud de la descripción en el Calendar (0 = sin descripción).

| Hora | Bloque (título literal) | ID serie | RRULE | Color |
|---|---|---|---|---|
| 21:00-04:00 | 😴 DORMIR (7h exactas → 04:00) | `blkgb23e0es0phm2qee6cgqpp0` | diaria | 9 |
| 04:00-04:15 | DECLARACIONES EKER - REPROGRAMA TU BLUEPRINT | `22bh9m5jhc7ro6aj3m4ffjad7g` | diaria (7 días) | — |
| 04:15-05:00 | 🧠 IA — VIBECODING con Claude Code (construir, no programar desde cero) | `udr09j9ng983o0d4nipkfe4494` | L-V | 9 |
| 05:00-05:45 | 🇺🇸 USMLE — ANKI AM (madrugada fresca · FSRS) + Stress Set en Fases B-C | `i8afj7uppkb3ntj8h9890dhecc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | 2 |
| 05:45-06:00 | PREPARAR PARA CORRER | `40odesk58rnd2qhorsj15ule11` | diaria | — |
| 06:00-06:30 | CORRER- SABADO Y DOMINGO SOLO CAMINATA | `5mrm4ru08go9k70408jm8vcjku` | diaria | — |
| 06:30-06:45 | CALISTEMIA | `2lpvftrc3fp64e0om6qg0mcs34` | L-V | — |
| 06:45-07:00 | DUCHA | `mm2h37rbq89mbg917b8b983aa2` | L-V | — |
| 07:00-07:15 | DESAYUNO | `7agi60f2bp8qnh6cnqvfo22giv` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | — |
| 07:15-08:15 | 🇺🇸 USMLE — Repaso Espaciado Multi-Temporal (Anki FSRS D-1/D-3/D-7 + 2Q tema de ayer) | `54lchqggik96dmljmmg3l88s54` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | 11 |
| 08:15-09:00 | 🇺🇸 USMLE — PRE-TEST tema del día (10Q uWorld ciegas + Free Recall) | `3tbecd5n03ut6lno3hjvc1sr7k` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | — |
| 09:00-11:00 | 🇺🇸 USMLE — NÚCLEO DEEP PRIME (B&B/Pathoma/Sketchy + First Aid + tarjetas de mecanismo) | `cb2uh20jnvu7pgfev4183pgctc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | 2 |
| 11:00-12:00 | 🇺🇸 USMLE — 30 Preguntas Consolidación (uWorld tutor · temas vistos + APEX) | `2eqmmrnh00jr44plevurgcu2as` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | 5 |
| 12:00-12:30 | ALUMUERZO *(sic, título literal)* | `43dq3oib16esjcqj1dcd8osot2` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | — |
| 12:30-13:00 | 🧠 SYNAPSE — misión del día (30') | `j99thg3eaqesosmvppj4rfgvh4` | L-V | 9 |
| 13:00-13:15 | LECTURA DE LIBRO | `7jmf8p1l5b5q6jbtmj9uualiq8` | L-V | 8 |
| 13:15-13:30 | *(hueco libre — el NAP de julio ya no existe en el Calendar)* | — | — | — |
| 13:30-14:15 | 🔬 RESEARCH ↔ 💎 DERMA (alterna diario · ver app YoCPMD) | `3ofg2ljv8kl3p1adm2e5d5nih3` | L-V | 1 |
| 14:15-15:15 | 🪙 AURUM — Closer de ventas (30-60' · 14:15-15:15 · L-V) | `at1nak8f24nbnj1mh2jcd4aggg` | L-V | 5 |
| 15:15-15:30 | 🇪🇸 MIR — Evaluación Anclada D-1 (4Q + Anki SRS + Corrección) | `2ldp6obaapnvo76li28uprrddg` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | 1 |
| 15:30-16:15 | 🇪🇸 MIR — Deep Work Mini (Pre-test + Lectura + Free Recall + APEX max 4) | `00k364heibh1n6f9hfspcv9dpi` | L-V | 1 |
| 16:15-17:15 | 🇵🇪 ENCAPS — 1h Banqueo Mantenimiento (pronóstico v3 · rotación II·I·V·III·IV) | `papebi46etlo8glgfs5akd5mig` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | 1 |
| 17:15-18:00 | ⚖️ LIVIANO — Academia (obesidad · GLP-1 · nutrición · 25' estudio + 20' aplicación) | `8epae6hlfmrc9j0h2kib7iuc84` | `WEEKLY;BYDAY=MO-FR` | 7 |
| 18:00-18:45 | 🇺🇸 USMLE — Evaluación Diaria Acumulativa (Modo Examen timed + Corrección) | `utk2laeob9u0847bbe9rm491v4` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | 11 |
| 18:45-18:55 | ALISTARSE (L, X, J, V) | `75cpr6i88044kmkhsuvupam9c8` | L/X/J/V | — |
| 18:55-19:15 | VIAJE (L, X, J, V) | `4j8repfcgl1i2p95l2i46vl7m3` | L/X/J/V | — |
| 19:00-20:30 | GYM / BAILE — **varía por día, ver §2** | (12 series) | por día | 6 / 3 |
| 20:30-20:45 | 🚗 VIAJE VUELTA — Reflexión (15min) | `3l59kpei7sg0l6kq51343or383` | L-V | — |
| 21:00 | 😴 DORMIR | `blkgb23e0es0phm2qee6cgqpp0` | diaria | 9 |

⚠ **Martes**: ALISTARSE es 18:30-18:45 (`21lbj9le99k8s9giclm3fauafs`) y VIAJE 18:45-19:00 (`3umsaskrlt1vi5ud3oubmcp504`) → la Eval USMLE 18:00-18:45 pierde 15' (corrección en el viaje, en audio, o cerrar a las 18:30).

## 2 · Entrenamiento por día (GYM 🟠 color 6 · BAILE 🟣 color 3)
| Día | 19:00 | 19:30 | 20:00 | IDs |
|---|---|---|---|---|
| Lun | GYM 19:00-19:30 | BAILE 19:30-20:30 | — | `6740kavnfkdcvj5k149ouliauu` · `64lue1en3hk0cf8itml2rtlqi4` |
| Mar | BAILE 19:00-19:30 | GYM 19:30-20:30 | — | `09me7atu516gb0k6u0rbfcj8q1` · `0dpes0ekv96a453e89m5osg06t` |
| Mié | BAILE 19:00-20:30 | | | `0tod56pc6pgecm5lf7g4e3ji9v` |
| Jue | GYM 19:00-19:30 | BAILE 19:30-20:30 | — | `4qvs34d84u82psvknpqhv3jc7a` · `3m8m4resu8akph4a7qfuf3h1qn` |
| Vie | GYM 19:00-20:00 | | BAILE 20:00-20:30 | `7sf8i7pe62pugfk4t6tcnbb9i4` · `5pd4jhmvl31hvbuh40vphpoc4q` |
| Sáb | — | — | BAILE 20:00-20:30 | `3jkfb6097rtc1jbec19eg3sd57` |
| Dom | BAILE PRACTICA 17:15-17:30 · BAILE 18:00-19:30 | | | `13m3tcqjjc34rt6iqfblla18q1` · `7j6pucil43vuca70p082g5ub3d` |

Descripción común (añadida 05-sep a las 12 series): hidratación durante; **post-entreno solo agua/electrolitos (500-750 ml)**; nada sólido pesado <2h antes de las 21:00 (Walker); la cena ligera ya fue a las 17:15 (L-V) / antes de salir (sáb ~19:30, dom ~17:00); si hay hambre real al llegar, máximo 1 yogur o queso fresco, nunca carbohidrato simple; 0 luz azul después de 20:30; cama 21:00.

## 3 · SÁBADO
| Hora | Bloque | ID serie | Color |
|---|---|---|---|
| 04:00-04:15 | DECLARACIONES EKER | `22bh9m5jhc7ro6aj3m4ffjad7g` | — |
| 05:45-06:00 | PREPARAR PARA CORRER | `40odesk58rnd2qhorsj15ule11` | — |
| 06:00-06:30 | CORRER — **sábado y domingo solo caminata** | `5mrm4ru08go9k70408jm8vcjku` | — |
| 06:30-06:45 | DUCHA (serie sáb/dom) | `5vg0pmnc0eqo6akaoquj9ti87h` | — |
| 06:45-07:15 | DESAYUNO (serie sáb/dom, `WEEKLY;WKST=SU;BYDAY=SA,SU`) | `2u9je70pif58hgf2f8t3vgu8b8` | — |
| 07:15-15:00 | *(libre — sin banco de preguntas; el Anki de la mañana NO existe en el Calendar del sábado: la única pasada es 19:00)* | — | — |
| 15:00-17:00 | 🧠 SYNAPSE — PC sábado (2h) | `hv2lk04orquvivthtkfhilb1ps` | 9 |
| 17:00-19:00 | CREACIÓN DE VIDEO YOUTUBE EMPRESA | `5tbl422agrtls8kc62skirc0pu` | 1 |
| 19:00-19:30 | ANKI | `6ta0e3c019dep76spdgumfm0pl` | 1 |
| 19:30-19:45 | ALISTARSE | `45d24jvtli7vpg81r3vc0s5hhn` | — |
| 19:45-20:00 | VIAJE | `700a9frlf2trk85mrg9epkfkh1` | — |
| 20:00-20:30 | BAILE | `3jkfb6097rtc1jbec19eg3sd57` | 3 |
| 21:00-04:00 | 😴 DORMIR | `blkgb23e0es0phm2qee6cgqpp0` | 9 |

## 4 · DOMINGO
| Hora | Bloque | ID serie | Color |
|---|---|---|---|
| 04:00-04:15 | DECLARACIONES EKER | `22bh9m5jhc7ro6aj3m4ffjad7g` | — |
| 05:45-06:00 | PREPARAR PARA CORRER | `40odesk58rnd2qhorsj15ule11` | — |
| 06:00-06:30 | CAMINATA | `5mrm4ru08go9k70408jm8vcjku` | — |
| 06:30-06:45 | DUCHA | `5vg0pmnc0eqo6akaoquj9ti87h` | — |
| 06:45-07:15 | DESAYUNO | `2u9je70pif58hgf2f8t3vgu8b8` | — |
| 07:15-15:00 | *(libre)* | — | — |
| 15:00-17:00 | 🧠 SYNAPSE — repaso + PC domingo (2h) | `s7r8tiu66286t156l0odpv5nvo` | 9 |
| 17:00-17:15 | ANKI (15') | `619c1672eej1qgmvddbfkb5fu9` | 1 |
| 17:15-17:30 | BAILE PRACTICA | `13m3tcqjjc34rt6iqfblla18q1` | 3 |
| 17:30-17:45 | ALISTARSE | `1phlnin46a8o4gj3kf04m0lafh` | — |
| 17:45-18:00 | VIAJE | `0oo57n1rrgkok1rd4shlh5sg7q` | — |
| 18:00-19:30 | BAILE | `7j6pucil43vuca70p082g5ub3d` | 3 |
| 19:30-20:00 | VIAJE(PODCAST O ANKI) | `2itel1iq2gn05it50c26difdmk` | — |
| 21:00-04:00 | 😴 DORMIR | `blkgb23e0es0phm2qee6cgqpp0` | 9 |

⚠ **Anki de fin de semana**: sáb 30' (19:00) y dom 15' (17:00). Regla operativa (descripción del DESAYUNO sáb/dom): la duración real la marcan las tarjetas **due**, no el reloj — cero backlog el lunes (regla del 100 % de Palmerton). Cuando el mazo pase de ~1.500 tarjetas (nov), 15' el domingo no alcanzan: alargar el bloque ese día, no saltarlo.

## 5 · OVERLAYS DE HITO USMLE (color 6 naranja · `transparency: transparent` · eventos únicos, no series)
**En v5.10, 11 de las 12 FECHAS no se movieron — los D# sí (todos exactamente −1). La excepción es el UWSA1: su fecha (vie 11-sep) ya había pasado sin estudiar, así que el 12-sep se movió el evento al lun 14-sep 09:00-13:00 (`update_event` con `start`/`end` nuevos y `timeZone: America/Lima`; título, `colorId` 6, `transparency` y ausencia de recurrencia verificados intactos con `get_event`) y conserva el D1.** Cada D# de la tabla se leyó con `node` del array `DIAS` de `src/lib/usmleStep1Daily.ts` (95 entradas, D1 = 2026-09-14 → D95 = 2027-01-27), no se estimó. El **12-sep-2026 se reescribió el campo `description` de los 12 overlays** para sustituir el D# viejo y la referencia "D1 = vie 11-sep / v5.9" por "**D1 = lun 14-sep, v5.10, 95 días**", y donde decía "target mié 27" ahora dice "**target vie 29-ene (jue 28 descanso)**"; **el protocolo de test-day de Palmerton se conservó íntegro** (§F de `DATA/USMLE/PALMERTON_POR_MATERIA.md`): Ziploc BREAK 1/2/3 preparadas la noche anterior (proteína magra + grasas, **sin carbohidratos simples**), cronograma de descansos (sit-in 1-2' / activo 10' / almuerzo dentro del sim), sin cambiar respuestas por ruido, SYNAPSE de ese día a la tarde, registro de agua/sueño en VITALS como ensayo, y el mapa del día real de 7 bloques. Horas (salvo el UWSA1), títulos, `colorId`, `transparency` y la ausencia de recurrencia quedaron intactos (verificado con `get_event` tras cada `update_event`).

| # | Fecha | Hora | Título literal | ID | **D# v5.10** | D# v5.9 (histórico) | Mínimo on-track (texto del overlay) |
|---|---|---|---|---|---|---|---|
| 1 | **14-sep-2026 (lun)** ⚡ movido desde el vie 11-sep | 09:00-13:00 | 🎯 UWSA1 — BASELINE Step 1 (160Q · 4 bloques) | `o1gla7846uae4tgngvc4q45osg` | **D1** | D1 (en el vie 11) | línea base — **el DÍA 1 del plan** (Palmerton: baseline en el primer día) |
| 2 | 02-oct-2026 (vie) | 07:15-11:00 | 🎯 NBME 25 (200Q) + revisión | `4hjv5lkvluj06ahc2qndtsi6as` | **D15** | D16 | ≥51 % |
| 3 | 23-oct-2026 (vie) | 07:15-11:00 | 🎯 NBME 26 (200Q) + revisión | `lr7ktrbiffj4hrlke7lh7cv6h4` | **D30** | D31 | ≥54 % |
| 4 | 13-nov-2026 (vie) | 07:15-11:00 | 🎯 NBME 27 (200Q) + revisión | `sm4baa2v453ifaub325h9v08mg` | **D45** | D46 | ≥57 % (gate 1 ECFMG pide ≥55 %) |
| 5 | 04-dic-2026 (vie) | 07:15-11:00 | 🎯 NBME 28 (200Q) + revisión | `ecu784689p8osrhqabuct8d5jg` | **D60** | D61 | ≥61 % |
| 6 | 18-dic-2026 (vie) | 07:15-11:00 | 🎯 NBME 29 (200Q) + revisión | `ae93qv0nqqs36h439hid1jcq8o` | **D70** | D71 | ≥63 % · MSK D71-D73 (21-23 dic) íntegro DESPUÉS |
| 7 | 30-dic-2026 (mié) | 07:15-11:00 | 🎯 NBME 30 — CIERRE FASE A (200Q) + plan Fase B | `mael3p9uhp036jbep45ql6v9oc` | **D77** | D78 | ≥65 % · cierra Fase A (quedan 3 días de contenido: D78 biostats · D79-D80 bioquímica) |
| 8 | 08-ene-2027 (vie) | 09:00-13:00 | 🎯 UWSA2 — predictor gold-standard (160Q) | `2u7viv0elr6aedo0m9undfa5kg` | **D82** | D83 | low-risk |
| 9 | 15-ene-2027 (vie) | 07:15-11:00 | 🎯 NBME 31 (200Q) — GO/NO-GO fecha de examen | `l771lvcfv0jcebt61do6svia18` | **D87** | D88 | **GO = 2 NBME ≥68 % + UWSA2 low-risk** · cierra Fase B (7 días) |
| 10 | 18-ene-2027 (lun) | 07:15-11:00 | 🎯 NBME 32 (200Q) + repaso FA 1-5 | `h65e772pqsa4hgc5b6bh9n8h50` | **D88** | D89 | ≥68 % · sprint (arranca la Fase C) |
| 11 | 20-ene-2027 (mié) | 07:15-11:00 | 🎯 NBME 33 (200Q) + repaso FA 11-14 | `la5rsbuiqj1o35lb5adf93abuo` | **D90** | D91 | ≥68 % · sprint (Fase C) |
| 12 | 22-ene-2027 (vie) | 07:15-11:00 | 🎯 FREE 120 oficial + logística del examen | `lh9jfjsmoif74ci6jcn8f1mq30` | **D92** | D93 | ≥70 % (heurística comunitaria) · último ensayo · **no es el último día del plan** |

⚠ Los mínimos on-track de la última columna son los de `HITOS_ONTRACK` en `src/lib/usmleScores.ts` (leídos con `node`, no estimados). Fuente: `DATA/USMLE/PALMERTON_POR_MATERIA.md` · Parte V-A.
⚠ Los overlays 10-12 caen lun/mié/vie de la última semana (no todos en viernes): el título y la hora se mantienen; el D# es el que manda para leer el contenido del día en la app.
⚠ **El plan no termina con el Free 120.** El **último día es el mié 27-ene-2027 = D95** (rapid review de First Aid + Anki + laboratorio de dudas, 20Q, versión ligera: taper), **sin overlay** porque no es un simulacro; cae dentro de la ventana de examen 25-29 ene. **Como el plan ocupa el mié 27 (antiguo target), el examen target pasa al vie 29-ene y el jue 28 queda como día de descanso pre-examen** (preparar las bolsas, cama 21:00). El **lun 25-ene = D93** es el último día de banco (uWorld incorrects + AMBOSS 200 mitad 2) y el **mar 26-ene = D94** = repaso FA sistemas 6-10 + Anki marathon + incorrects (40Q flagged). Todo esto ya está dentro de la descripción del overlay Free 120.
⚠ Tras el 30-dic (D77) los feriados jue 31-dic y vie 1-ene quedan fuera del plan: **el siguiente día hábil es el lun 4-ene = D78** (bioestadística + epidemiología + ética/comunicación, AMBOSS HY 155Q); el **mar 5-ene = D79** es el **1.º** de los 2 días dobles de Bioquímica; el **mié 6-ene = D80 cierra la Fase A** con el 2.º (biología molecular + genética + farmacología general/toxicología). La **Fase B arranca el jue 7-ene = D81** y dura **7 días** hasta el NBME 31 (vie 15-ene = D87). Esta corrección ya está dentro de la descripción del overlay NBME 30.

**Colisiones de un día de hito (aceptadas, no se mueven franjas):**
- UWSA (09:00-13:00 + ~30' de descansos reales → ~13:30): pisa deep prime 09:00, 30Q 11:00, ALMUERZO 12:00 y SYNAPSE 12:30 → el almuerzo se come dentro del sim (Ziploc BREAK 2), SYNAPSE pasa a la tarde, la revisión completa va en las franjas USMLE de la tarde + 18:00. **Aplica ya el lun 14-sep (D1).**
- NBME (07:15-11:00 orientativo; 4 bloques × 50Q, el reloj lo pone la interfaz NBME): pisa repaso 07:15, pre-test 08:15, deep prime 09:00 y (si se alarga) 30Q 11:00 → almuerzo 12:00 normal; si el sim pasa de las 12:00, almuerzo dentro del sim entre B3 y B4.
- El resto del día (Research/Derma, AURUM, MIR, ENCAPS, LIVIANO, GYM/BAILE) **no cambia**.

## 6 · Descripciones de los bloques — releídas en vivo con `get_event` el **12-sep-2026**
Lo que sigue es un **resumen fiel de 1-2 líneas por serie** sobre el texto **vivo** leído hoy con `get_event`. El 12-sep se reescribió la `description` de **16 series** (10 de estudio/secundarias + 6 de rutina/comida/baile — más los 12 overlays de hito del §5, uno de ellos además movido de fecha). En todas las series se tocó **solo `description`**: RRULE, `start`/`end`, `summary` y `colorId` verificados intactos con `get_event` tras cada `update_event`. **Ninguna serie se borró ni se recreó y no se usó `recurrenceData`.**

**Estado:** 🟢 = releída en vivo el 12-sep · ⚪ = no releída hoy (última captura 05-sep/08-sep/10-sep, sin cambios conocidos).
**⏸ SIN CAMBIO (releídas el 12-sep, no tocadas):** 4 series de estudio **siguen sin citar ni la versión del régimen ni D1 ni el nº de días**, así que no había nada que corregir y se dejaron intactas: **repaso 07:15** `54lchqggik96dmljmmg3l88s54` · **pre-test 08:15** `3tbecd5n03ut6lno3hjvc1sr7k` · **30Q 11:00** `2eqmmrnh00jr44plevurgcu2as` · **eval 18:00** `utk2laeob9u0847bbe9rm491v4`.

### 6.1 · Bloques de estudio (L-V)

| Hora · Serie | ID | Resumen fiel del texto VIVO (12-sep) | Estado |
|---|---|---|---|
| 04:15-05:00 · 🧠 IA VIBECODING | `udr09j9ng983o0d4nipkfe4494` | Curso de IA en modo BUILDER, no programar desde cero: 1 proyecto real terminado por semana al servicio de sus sistemas; ciclo diario 5' objetivo → 35' construir con Claude Code → 5' commit + nota (repo synapse-journal). **Cierre v5.10 (12-sep):** "12 proyectos · 60 días L-V · **lun 14-sep → vie 4-dic-2026** · 1er SHIP sáb 19-sep (S1 = fix del parser APEX, lun 14 → vie 18-sep) · último SHIP sáb 5-dic" (`VIBE_META` + `VIBE_PROYECTOS` + `VIBE_DIAS` leídos con node: 12 proyectos, 60 días, 0 sáb/dom/feriados); sáb 15:00-17:00 = SHIP, dom = Feynman del proyecto (10', opcional). | 🟢 |
| 05:00-05:45 · ANKI AM | `i8afj7uppkb3ntj8h9890dhecc` | Anki de madrugada (Palmerton, mente fresca) — Fase A: 45' FSRS deck USMLE; Fases B-C: 05:00-05:12 🔥 Stress Set 10Q + 05:12-05:45 Anki. **Cifra corregida el 12-sep:** "régimen v5.10: 95 días desde **lun 14-sep** hasta **mié 27-ene-2027** ≈ 594h" (95 × 6h15 = 593,75 h). Rangos de fase del texto (A sep-ene · B-C ene) siguen siendo válidos. FSRS retención 0.90, máx 50 nuevas/día, solo Good/Again. | 🟢 ⚠ UNTIL |
| 07:15-08:15 · Repaso multi-temporal | `54lchqggik96dmljmmg3l88s54` | 07:15-07:50 Anki FSRS (tarjetas de MECANISMO) · 07:50-08:05 repaso anclado del tema de AYER (free recall 90 s + 2Q uWorld, <60 % → re-encolar) · 08:05-08:15 barrido D-3/D-7 en Obsidian. Links a la app y a `DATA/USMLE/README.md` + `PALMERTON_POR_MATERIA.md`. **No cita versión ni D1 → no había nada que corregir** (última edición 27-ago; releída y confirmada el 12-sep). | 🟢 ⚠ UNTIL |
| 08:15-09:00 · Pre-test ciego | `3tbecd5n03ut6lno3hjvc1sr7k` | 10Q uWorld ciegas en modo tutor del subtema del día, sin haber estudiado + free recall 90 s en papel + anotar los huecos como objetivo del deep prime. Sin referencia de versión (última edición 27-ago). | 🟢 ⚠ UNTIL |
| 09:00-11:00 · DEEP PRIME | `cb2uh20jnvu7pgfev4183pgctc` | Bloque sagrado de 2h: vídeo 09:00-10:00 (B&B/Pathoma/Sketchy a 1.5x) · First Aid active reading 10:00-10:45 · ≤10 tarjetas de mecanismo + APEX 10:45-11:00; jerarquía de material; "💧 AL ABRIR" con 500 ml + snack y micro-pausa 10:00-10:05; los viernes de hito este bloque es el UWSA/NBME. **Cierre v5.10 (12-sep):** 95 días, **D95 = mié 27-ene-2027**, fases **A D1-D80 / B D81-D87 / C D88-D95**, "**el D1 (lun 14-sep) es el UWSA1** — baseline en el primer día, como prescribe Palmerton; es el único hito que cambió de fecha (estaba anclado al vie 11-sep, ya pasado) — y el contenido arranca el mar 15-sep (D2)", la frase "ni un tema se fusionó ni se recortó en el corrimiento", examen 25-29 ene (**target vie 29-ene; jue 28 descanso pre-examen**), GO/NO-GO vie 15-ene (**NBME 31 = D87**), "su contenido ya es v5.10". | 🟢 ⚠ UNTIL |
| 11:00-12:00 · 30Q consolidación | `2eqmmrnh00jr44plevurgcu2as` | uWorld modo tutor SOLO de temas ya vistos; leer la explicación de correctas e incorrectas, clasificar cada fallo (conocimiento / lectura / razonamiento) y convertirlo en tarjeta de mecanismo; ritmo ~40Q/día → banco completo (3659Q) en la Fase A. Sin referencia de versión. | 🟢 ⚠ UNTIL |
| 12:30-13:00 · SYNAPSE misión | `j99thg3eaqesosmvppj4rfgvh4` | Misión del día en la app (A · 15' lección + B · 10' audio + C · 5' lectura móvil; marcar ✓). **Cierre v5.10 (12-sep):** "**81 días · lun 14-sep → jue 3-dic-2026**" (`SYN_PLAN_META` de `src/lib/synapseDailyPlan.ts`, leído con node: 81 entradas en `SYN_DIAS`, que incluyen los sáb/dom de PC), sáb 15:00-17:00 PC = SHIP del proyecto del vibecoding de las 04:15, dom = Feynman opcional. Los `<br>` siguen escapados como texto (§11.2 · se conservaron a propósito). | 🟢 |
| 13:30-14:15 · RESEARCH ↔ DERMA | `3ofg2ljv8kl3p1adm2e5d5nih3` | **Mapa de arranque recalculado el 12-sep con `diaEstudioTipo()` de `researchData.ts`** (el ancla de la alternancia sigue siendo el mié 10-jun-2026 y NO se mueve): **lun 14 RESEARCH (D1) · mar 15 DERMA (d1) · mié 16 RESEARCH (D2) · jue 17 DERMA (d2) · vie 18 RESEARCH (D3) · lun 21 DERMA (d3) · mar 22 RESEARCH (D4) · mié 23 DERMA (d4)**…, contrastado 1:1 con las fechas reales de `researchDailyPlan.ts` (D1 14-sep · D2 16-sep · D3 18-sep · D4 22-sep) y `dermaDailyPlan.ts` (d1 15-sep · d2 17-sep · d3 21-sep · d4 23-sep). Planes vigentes: **Research 42 átomos** lun 14-sep-2026 → mar 9-feb-2027 **SIN cambio respecto a v5.9** (D38 = mar 29-dic-2026 y luego pausa por el Step 1 hasta el lun 1-feb = D39) y **Derma 70 sesiones mar 15-sep-2026 → mar 30-mar-2027** (sin pausa; se movió +2 días de calendario y no +1 porque el lun 14-sep es día Research); ambos saltan 25-dic, 31-dic y 1-ene. 45' · 1 entregable atómico/día · APEX + Obsidian. | 🟢 |
| 14:15-15:15 · AURUM | `at1nak8f24nbnj1mh2jcd4aggg` | Closer de ventas: 26 semanas · 130 lecciones · 7 fases; solo referentes reales con track record verificable (Hormozi, Cardone, Voss, Cialdini, Rackham, Girard, Tracy, Blount, Ross, Hopkins, Bettger + Josué Peña solo gratis) y 11 libros ancla; cada día 1 vídeo + drill de pitch sobre leads reales (ALLPA / Qori Golden); la lectura va en los huecos de viaje. **Cierre v5.10 (12-sep):** D1 = **lun 14-sep-2026 → D130 = mié 17-mar-2027** (`AURUM_PLAN_META` de `src/lib/aurumDailyPlan.ts`, leído con node; 130 entradas, 0 sáb/dom/feriados). | 🟢 |
| 15:15-15:30 · MIR eval anclada | `2ldp6obaapnvo76li28uprrddg` | 4Q ProMIR/AMIR del tema D-1 en modo examen (~90-100 s/Q, sin compendio) + 5' Anki deck MIR + 3' mini-corrección tipificando el error (conceptual / terminológico / aplicación); umbrales 4/4 avanzar · 3/4 zona gris · <3/4 repetir mañana; conserva "💧 AL ABRIR" y la justificación científica (Karpicke, Cepeda, Newport, Croskerry). **Etiqueta v5.10 (12-sep):** MIR = 78 días (**lun 14-sep-2026 → lun 4-ene-2027**: 76 temas + D77 mini-MIR + D78 corrección); del 4-ene al 31-mar-2027 sigue en banqueo de mantenimiento (**63 días, cierre fijo; modo reducido hasta el 27-ene** = último día del plan Step 1, `MIR_MANT_DIAS` de `mirMantenimiento.ts`: 18 reducidos + 45 normales); examen 25-29 ene (**target vie 29-ene; jue 28 descanso**). | 🟢 |
| 15:30-16:15 · MIR deep work mini | `00k364heibh1n6f9hfspcv9dpi` | 1 subtema atómico/día en 4 sub-fases: pre-test + generation 5' · lectura activa + elaboración 25' · free recall libro cerrado 5' · ≤4 APEX 10' (formato completo FRENTE/REVERSO/CCSN/FISIOPATOLOGIA/RELACIONES, ≥1 comparativa MIR vs ENCAPS); identity stacking y métricas en Obsidian 06_MIR/Subtemas. **FUNDAMENTO recalculado el 12-sep:** "78 días × 1 subtema/día × ≤4 cards ≈ 310 cards MIR sólidas al **lun 4-ene-2027** (76 temas + D77 mini-MIR + D78 corrección); del 4-ene al 31-mar-2027 el bloque sigue en banqueo de mantenimiento (63 días, modo reducido hasta el 27-ene)" + etiqueta **v5.10 (D1 = lun 14-sep-2026)**. | 🟢 |
| 16:15-17:15 · ENCAPS mantenimiento | `papebi46etlo8glgfs5akd5mig` | 16:15-16:30 eval anclada 5Q del tema de ayer · 16:30-17:15 banco 20-25Q por rotación semanal ponderada (II 30 % · I 27 % · V 21 % · III 13 % · IV 9 %) · viernes mini-simulacro 25Q a 72 s/Q · 8 críticos v3 · registrar CADA fallo en TRACKING_ERRORES; conserva el "🥤 CIERRE 17:10-17:15" de cena ligera. **Cierre v5.10 (12-sep):** **97 días** lun 14-sep-2026 → vie 29-ene-2027 (Supabase `study_schedule`, backup **`study_schedule_bk_0912`**, **79 días de banqueo + 18 mini-sims de viernes**; cifras contadas con node en `DATA/_scripts/_encaps_mantenimiento_2027.sql` y **confirmadas en Supabase en vivo**: 97 filas, 18 `mini_sim`, 79 `banqueo1h`, `bk_0912` existente), la nota de que **el corrimiento se comió otro día de mantenimiento** porque el cierre del 29-ene es fijo (**98 → 97; el vie 11-sep perdido era un mini-sim: 19 → 18**), la frase "ningún tema ni sub-eje se fusionó ni se recortó — cada fila solo se desplazó a la siguiente fecha del plan", y **la fase intensiva NO se mueve: sigue arrancando el lun 1-feb-2027, ahora como día 98**. | 🟢 🔴 UNTIL |
| 17:15-18:00 · LIVIANO | `8epae6hlfmrc9j0h2kib7iuc84` | 17:15-17:40 módulo del día (fisiología del peso · GLP-1/tirzepatida · nutrición · ejercicio · conducta · farmacología/bariátrica) · 17:40-18:00 aplicación explicándolo como a un paciente real; fuentes ProMIR + AMBOSS + guías AACE/OMA; conserva "🥤 ARRANQUE 17:15" y la coherencia LIVIANO (última comida sólida ≥3h antes de dormir). **Cierre v5.10 (12-sep):** 90 días L-V **lun 14-sep-2026 → mié 20-ene-2027** (`LIV_META` de `src/lib/livianoStudyPlan.ts`; contados con node: 16 `casoId` en viernes · **18** `pretest:true` de lunes · 4 `drill:true` de cifras ancla; salta 25-dic, 31-dic y 1-ene). | 🟢 |
| 18:00-18:45 · Eval diaria USMLE | `utk2laeob9u0847bbe9rm491v4` | 18:00-18:25 bloque timed de 15Q uWorld mixtas de temas vistos (72 s/Q, sin pausa, en inglés) · 18:25-18:45 corrección + log de errores + STRESS strategy de Palmerton para los dudados entre 2; termómetro diario registrado en la app; anchoring pre-sueño. Sin referencia de versión. | 🟢 ⚠ UNTIL |

⚠ **UNTIL** = la RRULE de esa serie termina el **vie 29-ene-2027** (`UNTIL=20270130T045959Z`). Son **7 series**, no 3. Detalle y plan de acción en **§11.2** (la de ENCAPS 16:15 es la única bloqueante: hay que extenderla **antes del lun 1-feb-2027**).

### 6.2 · Comida, entrenamiento y fin de semana

| Bloque · Serie | ID | Resumen fiel del texto VIVO (12-sep) | Estado |
|---|---|---|---|
| 07:00-07:15 · DESAYUNO L-V | `7agi60f2bp8qnh6cnqvfo22giv` | ≥30 g de proteína + 500 ml de agua + carbohidrato COMPLEJO (nada de azúcar simple ni jugo envasado); 15' de combustible, sin banco de preguntas en la mesa; VITALS quick-log de sueño y primera agua; 1.ª de las 4 tomas de proteína (07:00 · 12:00 · 15:15 · 17:15) y lista de ventanas de hidratación del día. **Etiqueta actualizada el 12-sep → "Régimen v5.10 (D1 = lun 14-sep-2026)"**. | 🟢 |
| 06:45-07:15 · DESAYUNO sáb/dom | `2u9je70pif58hgf2f8t3vgu8b8` | Misma regla sin prisa (aquí no hay bloque a las 07:15 → se puede comer sentado 30'); VITALS es donde más se pierde el registro el fin de semana; el Anki de sáb 19:00 / dom 17:00 lo dimensionan las tarjetas **due**, no el reloj (cero backlog el lunes, regla del 100 % de Palmerton). **Etiqueta actualizada el 12-sep a v5.10**. | 🟢 |
| 12:00-12:30 · ALUMUERZO | `43dq3oib16esjcqj1dcd8osot2` | Comida principal dimensionada por VITALS (proteína + verduras + carbohidrato complejo), 500 ml de agua, pausa difusa sin pantalla del Step 1, sin azúcar simple para evitar el bajón de 13:30-15:00; en los UWSA (09:00-13:00) se come DENTRO del sim como Break 2 y en los NBME (07:15-11:00) queda igual a las 12:00. **Etiqueta actualizada el 12-sep a v5.10**. | 🟢 |
| BAILE mié 19:00-20:30 · sáb 20:00-20:30 · dom 18:00-19:30 | `0tod56pc6pgecm5lf7g4e3ji9v` · `3jkfb6097rtc1jbec19eg3sd57` · `7j6pucil43vuca70p082g5ub3d` | Hidratación durante (300-500 ml); **post-entreno SOLO agua o electrolitos (500-750 ml)**, nada sólido pesado a <2h de las 21:00 (Walker: la digestión activa fragmenta el sueño profundo); la cena ligera va antes (17:15 L-V · ~19:30 sáb tras el Anki · ~17:00 dom); si hay hambre real al llegar, máximo 1 yogur o queso fresco; 0 luz azul tras 20:30 y cama 21:00. **Etiqueta actualizada el 12-sep a v5.10 en las tres**. | 🟢 |
| Sáb 15:00-17:00 · SYNAPSE PC | `hv2lk04orquvivthtkfhilb1ps` | **Sin tocar desde el 10-jun**: "setup, notebooks, repo público synapse-journal, Problem Sets de CS50P + ponerte al día con la semana". **Contradice** el texto vivo de las 04:15 y 12:30, que ya definen el sábado como SHIP del proyecto de vibecoding → pendiente (§11.2). | ⚪ |
| Dom 15:00-17:00 · SYNAPSE repaso + PC | `s7r8tiu66286t156l0odpv5nvo` | **Sin tocar desde el 10-jun**: repaso semanal Feynman + terminar el bloque PC, y aún explica que "la serie arranca el 28-jun" (histórico obsoleto). El texto vivo de las 04:15/12:30 ya dice que el domingo es Feynman de 10' opcional → pendiente (§11.2). | ⚪ |

⚪ **No releídas el 12-sep** (última captura 05-sep/08-sep, sin cambios conocidos; ninguna cita la versión del régimen salvo GYM/BAILE): **EKER 04:00** `22bh9m5jhc7ro6aj3m4ffjad7g` — 5 frases en voz alta (identidad · acción · ofensiva · sistema · cierre de creencia) + la cita de Eker sobre ver y cambiar · **PREPARAR PARA CORRER / CORRER (sáb-dom caminata) / CALISTENIA** — sin descripción · **DUCHA 06:45** — champú y sérum mié/vie/dom, lunes por la mañana; antes del gym o baile solo agua y polvo · **LECTURA DE LIBRO 13:00** — sin descripción (Biblioteca del Fundador en la app) · **ALISTARSE / VIAJE 18:45-19:15** — sin descripción (martes 18:30/18:45, ver §1) · **las 9 series de GYM y BAILE que no son BAILE mié/sáb/dom** — descripción común post-entreno del 05-sep (ver §2) que **sigue etiquetada "Régimen v5.6"** (visto en vivo el 12-sep en la lectura del vie 11 con `list_events`: GYM vie `7sf8i7pe62pugfk4t6tcnbb9i4` y BAILE vie `5pd4jhmvl31hvbuh40vphpoc4q`; las otras 7 A VERIFICAR (12-sep); fuera del alcance de las pasadas 08/09/10/12-sep, ver §11.2) · **VIAJE VUELTA 20:30** — evaluación del día en movimiento, sin pantallas, no Anki esa noche · **DORMIR 21:00** — 7h exactas, Walker + Stickgold, 0 luz azul tras 20:30, 18-20 °C, sin teléfono en la habitación.

## 7 · Registro de cambios en el Calendar (05-sep-2026)
Solo campo `description`; verificado con `get_event` tras cada `update_event` (RRULE, `start`/`end`, `summary`, `colorId` intactos en las 19 series y los 12 eventos únicos). No se usó `recurrenceData`, no se borró ni recreó ninguna serie.

| Evento | ID | Cambio |
|---|---|---|
| DESAYUNO L-V | `7agi60f2bp8qnh6cnqvfo22giv` | nueva descripción (≥30 g proteína + 500 ml + VITALS) |
| DESAYUNO sáb/dom | `2u9je70pif58hgf2f8t3vgu8b8` | nueva descripción (variante fin de semana + Anki por due) |
| ALUMUERZO | `43dq3oib16esjcqj1dcd8osot2` | nueva descripción (comida principal, VITALS, viernes de hito) |
| DEEP PRIME 09:00 | `cb2uh20jnvu7pgfev4183pgctc` | texto original + "💧 AL ABRIR" |
| MIR 15:15 | `2ldp6obaapnvo76li28uprrddg` | texto original + "💧 AL ABRIR" + nota régimen v5.6 |
| ENCAPS 16:15 | `papebi46etlo8glgfs5akd5mig` | texto original + "🥤 CIERRE 17:10-17:15 cena ligera" |
| LIVIANO 17:15 | `8epae6hlfmrc9j0h2kib7iuc84` | texto original + "🥤 ARRANQUE 17:15" |
| GYM ×5 · BAILE ×7 | ver §2 | nueva descripción (post-entreno solo agua/electrolitos) |
| 12 overlays de hito | ver §5 | texto original v5.6 + protocolo test-day Palmerton §F |

**No tocado (fuera de alcance o decisión de Joseph):** título "ALUMUERZO" (typo), `<br>` escapados en SYNAPSE, texto CS50P del PC sábado, mapa de junio en Research↔Derma, frases EKER, hueco 13:15-13:30, colisión ALISTARSE martes 18:30.

## 8 · Registro de cambios en el Calendar (08-sep-2026 · corrimiento v5.7)
Corrimiento D1 lun 7-sep → **mié 9-sep** (el 7 y el 8 no se estudiaron). **Las fechas de los 12 overlays de hito NO se movieron**; solo cambió su D#, y con él el texto de la `description`.

Método: `get_event` para leer la descripción viva → sustitución del D# viejo y de "D1 = lun 7-sep / plan v5.6" por "**D1 = mié 9-sep, v5.7, 95 días**" → `update_event` **solo con el campo `description`** → `get_event` de verificación. **No se usó `recurrenceData`, no se creó, borró ni recreó ningún evento, y no se tocaron horas, títulos, `colorId` ni `transparency`.** Los 12 son eventos únicos (sin `recurringEventId`), así que no había recurrencia en riesgo.

| # | Overlay | ID | D# viejo → nuevo | Otros cambios en el texto |
|---|---|---|---|---|
| 1 | UWSA1 11-sep | `o1gla7846uae4tgngvc4q45osg` | D5 → **D3** | — |
| 2 | NBME 25 02-oct | `4hjv5lkvluj06ahc2qndtsi6as` | D20 → **D18** | — |
| 3 | NBME 26 23-oct | `lr7ktrbiffj4hrlke7lh7cv6h4` | D35 → **D33** | — |
| 4 | NBME 27 13-nov | `sm4baa2v453ifaub325h9v08mg` | D50 → **D48** | — |
| 5 | NBME 28 04-dic | `ecu784689p8osrhqabuct8d5jg` | D65 → **D63** | — |
| 6 | NBME 29 18-dic | `ae93qv0nqqs36h439hid1jcq8o` | D75 → **D73** | — |
| 7 | NBME 30 30-dic | `mael3p9uhp036jbep45ql6v9oc` | D82 → **D80** | rango de la Fase B explicitado (4-ene→15-ene = **D81-D90**) y "el siguiente día de plan es el lun 4-ene" corregido de **D83 → D81** |
| 8 | UWSA2 08-ene | `2u7viv0elr6aedo0m9undfa5kg` | D87 → **D85** | el GO/NO-GO del 15-ene ahora se cita como **NBME 31, D90** |
| 9 | NBME 31 15-ene | `l771lvcfv0jcebt61do6svia18` | D92 → **D90** | — |
| 10 | NBME 32 18-ene | `h65e772pqsa4hgc5b6bh9n8h50` | D93 → **D91** | — |
| 11 | NBME 33 20-ene | `la5rsbuiqj1o35lb5adf93abuo` | D95 → **D93** | — |
| 12 | Free 120 22-ene | `lh9jfjsmoif74ci6jcn8f1mq30` | D97 → **D95** | sigue siendo "último día del plan" |

**Verificado además (sin escribir nada):** los 11 bloques de estudio L-V existen los tres días hábiles de la semana de arranque (mié 9, jue 10, vie 11 — ver §0.1) y el fin de semana sigue sin banco de preguntas.

### 8.1 · Segunda tanda del 08-sep: 6 series de rutina/comida/baile (etiqueta de versión)
Estas 6 seguían citando "Régimen v5.6" y/o "D1 = lun 7-sep-2026". Se cambió **solo el campo `description`**, sustituyendo la etiqueta por **"Régimen v5.7 (D1 = mié 9-sep-2026)"** y **conservando íntegro el resto del texto** (protocolo de comida/hidratación, VITALS, reglas post-entreno, enlaces). `get_event` de verificación tras cada `update_event`: RRULE, `start`/`end`, `summary` y `colorId` intactos en las 6. No se usó `recurrenceData`; no se creó, borró ni recreó ninguna serie.

| Serie | ID | RRULE (verificada intacta) | Texto viejo → nuevo |
|---|---|---|---|
| DESAYUNO L-V 07:00 | `7agi60f2bp8qnh6cnqvfo22giv` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | "Régimen v5.6 (D1 = lun 7-sep-2026)" → **"Régimen v5.7 (D1 = mié 9-sep-2026)"** |
| DESAYUNO sáb/dom 06:45 | `2u9je70pif58hgf2f8t3vgu8b8` | `WEEKLY;WKST=SU;BYDAY=SA,SU` | "Régimen v5.6" → **"Régimen v5.7 (D1 = mié 9-sep-2026)"** |
| ALUMUERZO 12:00 | `43dq3oib16esjcqj1dcd8osot2` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | "Régimen v5.6" → **v5.7 (D1 = mié 9-sep-2026)** |
| BAILE miércoles 19:00-20:30 | `0tod56pc6pgecm5lf7g4e3ji9v` | `WEEKLY;BYDAY=WE` | idem |
| BAILE sábado 20:00-20:30 | `3jkfb6097rtc1jbec19eg3sd57` | `WEEKLY;BYDAY=SA` | idem |
| BAILE domingo 18:00-19:30 | `7j6pucil43vuca70p082g5ub3d` | `WEEKLY;BYDAY=SU` | idem |

**Balance del día 08-sep-2026: 28 descripciones reescritas** — 12 overlays de hito (§8, tabla de arriba) + 10 series de estudio (04:15 · 05:00 · 09:00 · 12:30 · 13:30 · 14:15 · 15:15 · 15:30 · 16:15 · 17:15) + estas 6 de rutina. **Cero eventos creados, borrados o recreados; cero cambios de hora, título, color o recurrencia.**

## 9 · Registro de cambios en el Calendar (09-sep-2026 · corrimiento v5.8)
Corrimiento D1 mié 9-sep → **jue 10-sep** (el 9 no se estudió). **Las fechas de los 12 overlays de hito NO se movieron**; solo cambió su D# (todos −1) y, en tres de ellos, el texto estructural que dependía del calendario de fases.

Método: `get_event` para leer la descripción viva → sustitución del D# y de "D1 = mié 9-sep / v5.7" por "**D1 = jue 10-sep, v5.8, 95 días**" → `update_event` **solo con el campo `description`** → `get_event` de verificación. **No se usó `recurrenceData`, no se creó, borró ni recreó ningún evento, y no se tocaron horas, títulos, `colorId`, `transparency` ni RRULE.** Todas las cifras salen de leer los `.ts`/`.sql` con `node`, ninguna se estimó.

### 9.0 · Los 12 overlays de hito
| # | Overlay | ID | D# viejo → nuevo | Otros cambios en el texto |
|---|---|---|---|---|
| 1 | UWSA1 11-sep | `o1gla7846uae4tgngvc4q45osg` | D3 → **D2** | — |
| 2 | NBME 25 02-oct | `4hjv5lkvluj06ahc2qndtsi6as` | D18 → **D17** | — |
| 3 | NBME 26 23-oct | `lr7ktrbiffj4hrlke7lh7cv6h4` | D33 → **D32** | — |
| 4 | NBME 27 13-nov | `sm4baa2v453ifaub325h9v08mg` | D48 → **D47** | — |
| 5 | NBME 28 04-dic | `ecu784689p8osrhqabuct8d5jg` | D63 → **D62** | — |
| 6 | NBME 29 18-dic | `ae93qv0nqqs36h439hid1jcq8o` | D73 → **D72** | — |
| 7 | NBME 30 30-dic | `mael3p9uhp036jbep45ql6v9oc` | D80 → **D79** | Fase B recalculada (**5-ene→15-ene = D81-D89**) y la línea de feriados corregida: el siguiente día de plan es el **lun 4-ene = D80**, que **cierra la Fase A** con el 2.º día doble de Bioquímica; la Fase B arranca el **mar 5-ene = D81** |
| 8 | UWSA2 08-ene | `2u7viv0elr6aedo0m9undfa5kg` | D85 → **D84** | el GO/NO-GO del 15-ene se cita ahora como **NBME 31, D89** |
| 9 | NBME 31 15-ene | `l771lvcfv0jcebt61do6svia18` | D90 → **D89** | se explicita que **cierra la Fase B** |
| 10 | NBME 32 18-ene | `h65e772pqsa4hgc5b6bh9n8h50` | D91 → **D90** | se explicita que **arranca la Fase C** |
| 11 | NBME 33 20-ene | `la5rsbuiqj1o35lb5adf93abuo` | D93 → **D92** | — |
| 12 | Free 120 22-ene | `lh9jfjsmoif74ci6jcn8f1mq30` | D95 → **D94** | **ya no es "el último día del plan"**: se añadió que el último es el **lun 25-ene = D95** (rapid review FA + Anki + laboratorio de dudas) y se corrigió la línea de la semana previa ("sáb 23 y dom 24 descanso · lun 25 = D95 · mar 26 solo Anki AM + 10Q + preparar bolsas") |

### 9.1 · Las 16 series (etiqueta de versión y cifras de cada plan)
| Serie | ID | RRULE (verificada intacta) | Texto viejo → nuevo |
|---|---|---|---|
| IA vibecoding 04:15 | `udr09j9ng983o0d4nipkfe4494` | `WEEKLY;BYDAY=MO-FR` | v5.7 / 60 días mié 9-sep → mar 1-dic → **v5.8 / 60 días L-V jue 10-sep → mié 2-dic-2026** (1.er SHIP sáb 19-sep sin cambio) |
| ANKI AM 05:00 | `i8afj7uppkb3ntj8h9890dhecc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | "95 días desde mié 9-sep ≈ 594h" → **"95 días desde jue 10-sep ≈ 594h"** + rangos de fase corregidos (A sep-**ene**, B-C **ene**) |
| DEEP PRIME 09:00 | `cb2uh20jnvu7pgfev4183pgctc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | D95 vie 22-ene / fases A D1-D80 · B D81-D90 · C D91-D95 / NBME 31 = D90 → **D95 lun 25-ene / A D1-D80 · B D81-D89 · C D90-D95 / NBME 31 = D89**, + la frase de que nada se fusionó ni se recortó |
| SYNAPSE 12:30 | `j99thg3eaqesosmvppj4rfgvh4` | `WEEKLY;BYDAY=MO-FR` | 81 días mié 9-sep → sáb 28-nov → **82 días jue 10-sep → lun 30-nov-2026** |
| Research↔Derma 13:30 | `3ofg2ljv8kl3p1adm2e5d5nih3` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | mapa de arranque **invertido** (ahora jue 10 = RESEARCH D1 · vie 11 = DERMA d1 …), Derma 70 sesiones **11-sep → vie 26-mar-2027**, pausa de Research explicitada (**D39 = 29-dic → D40 = lun 1-feb-2027**) |
| AURUM 14:15 | `at1nak8f24nbnj1mh2jcd4aggg` | `WEEKLY;BYDAY=MO-FR` | D1 mié 9-sep → D130 vie 12-mar → **D1 jue 10-sep → D130 lun 15-mar-2027** |
| MIR eval 15:15 | `2ldp6obaapnvo76li28uprrddg` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | 78 días (mié 9-sep → lun 28-dic) → **78 días (jue 10-sep → mar 29-dic-2026)** + mantenimiento detallado (63 días, reducido hasta 25-ene) |
| MIR deep work 15:30 | `00k364heibh1n6f9hfspcv9dpi` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | "≈310 cards al lun 28-dic-2026" → **"≈310 cards al mar 29-dic-2026"** |
| ENCAPS 16:15 | `papebi46etlo8glgfs5akd5mig` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | 100 días / backup `bk_0908` / intensiva = día 101 → **99 días jue 10-sep → vie 29-ene-2027 / backup `study_schedule_bk_0909` / intensiva lun 1-feb = día 100**, + la nota de que el corrimiento se comió 1 día de mantenimiento (el cierre del 29-ene es fijo) |
| LIVIANO 17:15 | `8epae6hlfmrc9j0h2kib7iuc84` | `WEEKLY;BYDAY=MO-FR` | 90 días mié 9-sep → vie 15-ene / 18 pre-tests → **90 días jue 10-sep → lun 18-ene-2027 / 19 pre-tests** (16 casos y 4 drills sin cambio) |
| DESAYUNO L-V 07:00 | `7agi60f2bp8qnh6cnqvfo22giv` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | "Régimen v5.7 (D1 = mié 9-sep-2026)" → **"Régimen v5.8 (D1 = jue 10-sep-2026)"** |
| DESAYUNO sáb/dom 06:45 | `2u9je70pif58hgf2f8t3vgu8b8` | `WEEKLY;WKST=SU;BYDAY=SA,SU` | idem |
| ALUMUERZO 12:00 | `43dq3oib16esjcqj1dcd8osot2` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | idem |
| BAILE mié 19:00-20:30 | `0tod56pc6pgecm5lf7g4e3ji9v` | `WEEKLY;BYDAY=WE` | idem |
| BAILE sáb 20:00-20:30 · BAILE dom 18:00-19:30 | `3jkfb6097rtc1jbec19eg3sd57` · `7j6pucil43vuca70p082g5ub3d` | `WEEKLY;BYDAY=SA` · `WEEKLY;BYDAY=SU` | idem |

**⏸ Leídas y NO tocadas (4):** repaso 07:15 `54lchqggik96dmljmmg3l88s54` · pre-test 08:15 `3tbecd5n03ut6lno3hjvc1sr7k` · 30Q 11:00 `2eqmmrnh00jr44plevurgcu2as` · eval 18:00 `utk2laeob9u0847bbe9rm491v4`. Ninguna cita la versión del régimen, D1 ni el número de días → no había nada que corregir (mismo criterio que el 08-sep).

**Balance del día 09-sep-2026: 28 descripciones reescritas** — 12 overlays de hito + 16 series (la última fila de la tabla de §9.1 agrupa las dos series de BAILE de fin de semana). **Cero eventos creados, borrados o recreados; cero cambios de hora, título, color, `transparency` o recurrencia.**

### 9.2 · Pendiente REAL al 09-sep-2026 — **SUPERSEDIDO por §10.2** (histórico)
**Ya están al día en v5.8**: los 12 overlays · ANKI AM 05:00 · DEEP PRIME 09:00 · vibecoding 04:15 · SYNAPSE 12:30 · Research↔Derma 13:30 · AURUM 14:15 · MIR 15:15 y 15:30 · ENCAPS 16:15 · LIVIANO 17:15 · DESAYUNO L-V · DESAYUNO sáb/dom · ALUMUERZO · BAILE mié/sáb/dom.

#### 🔴 1 · RRULE con `UNTIL=20270130T045959Z` (= vie 29-ene-2027 23:59:59 Lima) — **7 series L-V**, no 3
**SIGUE VIGENTE Y SIN RESOLVER** (reconfirmado el 09-sep en `get_event`: ANKI AM, repaso 07:15, pre-test 08:15, DEEP PRIME, 30Q, ENCAPS y eval 18:00 conservan ese `UNTIL`). Leído con `get_event` en cada una:

| Serie | ID | Qué pasa después del vie 29-ene-2027 |
|---|---|---|
| **ENCAPS 16:15** | `papebi46etlo8glgfs5akd5mig` | 🔴 **BLOQUEANTE.** La **fase intensiva ENCAPS arranca el lun 1-feb-2027** (ahora **día 100**, con Semana Santa verificada) y la serie **ya no genera eventos** → hay que **extender la recurrencia ANTES de esa fecha** |
| ANKI AM 05:00 | `i8afj7uppkb3ntj8h9890dhecc` | franja vacía desde el lun 1-feb |
| Repaso 07:15 | `54lchqggik96dmljmmg3l88s54` | franja vacía desde el lun 1-feb |
| Pre-test 08:15 | `3tbecd5n03ut6lno3hjvc1sr7k` | franja vacía desde el lun 1-feb |
| DEEP PRIME 09:00 | `cb2uh20jnvu7pgfev4183pgctc` | franja vacía desde el lun 1-feb |
| 30Q 11:00 | `2eqmmrnh00jr44plevurgcu2as` | franja vacía desde el lun 1-feb |
| Eval USMLE 18:00 | `utk2laeob9u0847bbe9rm491v4` | franja vacía desde el lun 1-feb |

Las **6 series USMLE** siguen expirando de forma **coherente** con el plan v5.8 (**D95 = lun 25-ene-2027**, que ya cae dentro de la semana de examen 25-29 ene y por delante del `UNTIL` del 29-ene): ahí no hay error, hay que **decidir qué ocupa esas 6 franjas** cuando ENCAPS vuelva a bloque principal en feb-mar 2027. **La única que sí es un fallo funcional es ENCAPS 16:15.**

⚠ **Cómo hacerlo:** extender un `UNTIL` implica tocar la recurrencia, y el MCP de Google Calendar tiene `recurrenceData` **roto para UPDATE** → hacerlo desde la UI de Google Calendar, o `delete_event` de la serie + `create_event` (en CREATE sí funciona), **guardando antes la `description` completa** para no perderla.

#### 🟡 2 · SYNAPSE de fin de semana con texto de junio
`hv2lk04orquvivthtkfhilb1ps` (sáb 15:00-17:00) y `s7r8tiu66286t156l0odpv5nvo` (dom 15:00-17:00) siguen con la descripción del 10-jun: CS50P, synapse-journal y "la serie arranca el 28-jun / domingos 14 y 21-jun libres". **Contradicen** el texto vivo de las 04:15 y de las 12:30, que ya definen sáb 15:00-17:00 = SHIP del proyecto de vibecoding y dom = Feynman de 10' opcional. → reescribir solo `description`.

#### 🟡 3 · `<br>` escapados como texto
`&lt;br&gt;` visible en SYNAPSE 12:30 (`j99thg3eaqesosmvppj4rfgvh4`), SYNAPSE PC sábado y SYNAPSE domingo. Limpieza cosmética, sin urgencia.

#### ⚪ 4 · Decisiones de Joseph, no bugs (no se tocan sin su OK)
- Título **"ALUMUERZO"** (typo) — `43dq3oib16esjcqj1dcd8osot2`.
- **EKER 04:00** `22bh9m5jhc7ro6aj3m4ffjad7g`: las 5 frases son identidad de negocio; durante las 20 semanas del Step 1 falta una frase de identidad de examen.
- **Martes**: ALISTARSE 18:30-18:45 (`21lbj9le99k8s9giclm3fauafs`) + VIAJE 18:45-19:00 (`3umsaskrlt1vi5ud3oubmcp504`) le quitan 15' a la Eval USMLE de las 18:00.
- **Hueco 13:15-13:30** sin asignar (el NAP de julio ya no existe en el Calendar).

---

## 10 · Registro de cambios en el Calendar (10-sep-2026 · corrimiento v5.9)
Corrimiento D1 jue 10-sep → **vie 11-sep** (el 10 no se estudió; **9.º corrimiento** desde el 31-ago). **Las fechas de los 12 overlays de hito NO se movieron**; solo cambió su D# (todos −1) y, en cuatro de ellos, el texto estructural que dependía de fechas (UWSA1, NBME 30, UWSA2/NBME 31 y Free 120). En las series solo cambió la **etiqueta de régimen** y las **cifras de cada plan** leídas con `node` de los `.ts`.

Método (idéntico al del 09-sep): `get_event` para leer la descripción viva → sustitución del D# y de "D1 = jue 10-sep / v5.8" por "**D1 = vie 11-sep, v5.9, 95 días**" → `update_event` **solo con el campo `description`** → `get_event` de verificación. **No se tocó ninguna hora, título, RRULE, `colorId` ni `transparency`**, no se usó `recurrenceData` (roto para UPDATE) y **no se borró ni recreó ninguna serie**. Total: **24 eventos** (12 overlays + 12 series).

### 10.0 · Los 12 overlays de hito

| # | Hito · fecha (sin cambio) | ID | D# | Otros cambios de texto |
|---|---|---|---|---|
| 1 | UWSA1 11-sep | `o1gla7846uae4tgngvc4q45osg` | D2 → **D1** ⚡ | **Reescrita la primera frase**: se dice explícitamente que el UWSA1 **es ahora el D1 del plan** (baseline en el primer día, como prescribe Palmerton) y que el primer día de contenido pasa al **lun 14-sep = D2**. Añadido "~48 % ya es trayectoria de GO" (Parte V) |
| 2 | NBME 25 02-oct | `4hjv5lkvluj06ahc2qndtsi6as` | D17 → **D16** | — |
| 3 | NBME 26 23-oct | `lr7ktrbiffj4hrlke7lh7cv6h4` | D32 → **D31** | — |
| 4 | NBME 27 13-nov | `sm4baa2v453ifaub325h9v08mg` | D47 → **D46** | — |
| 5 | NBME 28 04-dic | `ecu784689p8osrhqabuct8d5jg` | D62 → **D61** | — |
| 6 | NBME 29 18-dic | `ae93qv0nqqs36h439hid1jcq8o` | D72 → **D71** | — |
| 7 | NBME 30 30-dic | `mael3p9uhp036jbep45ql6v9oc` | D79 → **D78** | Fase B recalculada (**6-ene→15-ene = D81-D88**) y la línea de feriados corregida: el siguiente día de plan es el **lun 4-ene = D79** (1.º de los 2 días dobles de bioquímica) y el **mar 5-ene = D80** cierra la Fase A con el 2.º; la Fase B arranca el **mié 6-ene = D81**. Añadida la nota de que los 2 días dobles vienen de v5.7 y conservan todos sus temas |
| 8 | UWSA2 08-ene | `2u7viv0elr6aedo0m9undfa5kg` | D84 → **D83** | el GO/NO-GO del 15-ene se cita ahora como **NBME 31, D88** |
| 9 | NBME 31 15-ene | `l771lvcfv0jcebt61do6svia18` | D89 → **D88** | — (sigue explicitando que cierra la Fase B) |
| 10 | NBME 32 18-ene | `h65e772pqsa4hgc5b6bh9n8h50` | D90 → **D89** | — (sigue explicitando que arranca la Fase C) |
| 11 | NBME 33 20-ene | `la5rsbuiqj1o35lb5adf93abuo` | D92 → **D91** | — |
| 12 | Free 120 22-ene | `lh9jfjsmoif74ci6jcn8f1mq30` | D94 → **D93** | el último día del plan pasa de "lun 25-ene = D95" a **"mar 26-ene = D95"**; el **lun 25-ene** queda como **D94** (repaso FA sistemas 6-10 + Anki marathon + incorrects) y el mar 26 se describe como **último día del plan Y víspera del examen** (versión ligera: taper, nada nuevo, preparar bolsas) |

### 10.1 · Las 12 series tocadas

| Serie | ID | RRULE (intacta) | Cambio de texto |
|---|---|---|---|
| IA vibecoding 04:15 | `udr09j9ng983o0d4nipkfe4494` | `WEEKLY;BYDAY=MO-FR` | v5.8 / 60 días jue 10-sep → mié 2-dic → **v5.9 / 60 días L-V vie 11-sep → jue 3-dic-2026** (1.er SHIP sáb 19-sep sin cambio) + línea de "ningún proyecto se fusionó ni se recortó" |
| ANKI AM 05:00 | `i8afj7uppkb3ntj8h9890dhecc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | "95 días desde jue 10-sep ≈ 594h" → **"95 días desde vie 11-sep hasta mar 26-ene-2027 ≈ 594h"** (95 × 6h15 = 593,75 h) |
| DEEP PRIME 09:00 | `cb2uh20jnvu7pgfev4183pgctc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | D95 lun 25-ene / fases A D1-D80 · B D81-D89 · C D90-D95 / NBME 31 = D89 → **D95 mar 26-ene / A D1-D80 · B D81-D88 · C D89-D95 / NBME 31 = D88**; añadida la frase de que **el D1 es el UWSA1** y el contenido arranca el lun 14-sep (D2); "su contenido ya es v5.9" |
| SYNAPSE 12:30 | `j99thg3eaqesosmvppj4rfgvh4` | `WEEKLY;BYDAY=MO-FR` | 82 días jue 10-sep → lun 30-nov → **82 días vie 11-sep → mar 1-dic-2026** (`SYN_PLAN_META`, leído con node) |
| Research↔Derma 13:30 | `3ofg2ljv8kl3p1adm2e5d5nih3` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | **mapa de arranque recalculado con `diaEstudioTipo()`** (el ancla de paridad sigue siendo el mié 10-jun-2026 y NO se mueve): **vie 11 DERMA (d1) · lun 14 RESEARCH (D1) · mar 15 DERMA (d2) · mié 16 RESEARCH (D2) · jue 17 DERMA (d3) · vie 18 RESEARCH (D3) · lun 21 DERMA (d4) · mar 22 RESEARCH (D4)**. Research **42 átomos lun 14-sep → mar 9-feb-2027** (D38 = mar 29-dic, pausa Step 1, D39 = lun 1-feb) · Derma **70 sesiones vie 11-sep → vie 26-mar-2027** (sin cambio) |
| AURUM 14:15 | `at1nak8f24nbnj1mh2jcd4aggg` | `WEEKLY;BYDAY=MO-FR` | D1 jue 10-sep → D130 lun 15-mar → **D1 vie 11-sep → D130 mar 16-mar-2027** |
| MIR eval 15:15 | `2ldp6obaapnvo76li28uprrddg` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | 78 días (jue 10-sep → mar 29-dic) → **78 días (vie 11-sep → mié 30-dic-2026)**; mantenimiento 63 días con **modo reducido hasta el 26-ene** (era 25-ene) |
| MIR deep work 15:30 | `00k364heibh1n6f9hfspcv9dpi` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | "≈310 cards al mar 29-dic" → **"≈310 cards al mié 30-dic-2026"** + etiqueta v5.9 |
| ENCAPS 16:15 | `papebi46etlo8glgfs5akd5mig` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | 99 días / backup `bk_0909` / intensiva = día 100 → **98 días vie 11-sep → vie 29-ene-2027 (79 de banqueo + 19 mini-sims de viernes) / backup `study_schedule_bk_0910` / intensiva = día 99**; añadido "ningún tema ni sub-eje se fusionó ni se recortó — cada fila solo se desplazó a la siguiente fecha del plan" |
| LIVIANO 17:15 | `8epae6hlfmrc9j0h2kib7iuc84` | `WEEKLY;BYDAY=MO-FR` | 90 días jue 10-sep → lun 18-ene → **90 días vie 11-sep → mar 19-ene-2027** (16 casos · 19 pre-tests · 4 drills sin cambio) |
| DESAYUNO L-V 07:00 · DESAYUNO sáb/dom 06:45 · ALUMUERZO 12:00 | `7agi60f2bp8qnh6cnqvfo22giv` · `2u9je70pif58hgf2f8t3vgu8b8` · `43dq3oib16esjcqj1dcd8osot2` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` · `WEEKLY;WKST=SU;BYDAY=SA,SU` · `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | solo la etiqueta: **"Régimen v5.9 (D1 = vie 11-sep-2026)"** |
| BAILE mié · sáb · dom | `0tod56pc6pgecm5lf7g4e3ji9v` · `3jkfb6097rtc1jbec19eg3sd57` · `7j6pucil43vuca70p082g5ub3d` | `WEEKLY;BYDAY=WE` · `BYDAY=SA` · `BYDAY=SU` | solo la etiqueta: **"Régimen v5.9 (D1 = vie 11-sep-2026)"** |

*(la fila de DESAYUNO/ALMUERZO agrupa 3 eventos y la de BAILE otros 3: 6 series de rutina + 6 de estudio/secundarias = 12 series tocadas)*

**⏸ Leídas y NO tocadas (4):** **repaso 07:15** `54lchqggik96dmljmmg3l88s54` · **pre-test 08:15** `3tbecd5n03ut6lno3hjvc1sr7k` · **30Q 11:00** `2eqmmrnh00jr44plevurgcu2as` · **eval 18:00** `utk2laeob9u0847bbe9rm491v4`. Ninguna cita la versión del régimen, D1 ni el nº de días → no había nada que corregir.

### 10.2 · Pendiente REAL al 10-sep-2026 — **SUPERSEDIDO por §11.2** (histórico)
**Ya están al día en v5.9**: los 12 overlays · vibecoding 04:15 · ANKI AM 05:00 · DEEP PRIME 09:00 · SYNAPSE 12:30 · Research↔Derma 13:30 · AURUM 14:15 · MIR 15:15 y 15:30 · ENCAPS 16:15 · LIVIANO 17:15 · DESAYUNO L-V · DESAYUNO sáb/dom · ALUMUERZO · BAILE mié/sáb/dom.

#### 🔴 1 · RRULE con `UNTIL=20270130T045959Z` (= vie 29-ene-2027 23:59:59 Lima) — **7 series L-V**
**SIGUE VIGENTE Y SIN RESOLVER** (reconfirmado el 10-sep con `get_event`: ANKI AM, repaso 07:15, pre-test 08:15, DEEP PRIME, 30Q, ENCAPS y eval 18:00 conservan ese `UNTIL`; ninguna de las 24 escrituras de hoy tocó la recurrencia).

| Serie | ID | Qué pasa después del vie 29-ene-2027 |
|---|---|---|
| **ENCAPS 16:15** | `papebi46etlo8glgfs5akd5mig` | 🔴 **BLOQUEANTE.** La **fase intensiva ENCAPS arranca el lun 1-feb-2027** (ahora **día 99**, porque el mantenimiento bajó de 99 a 98 días) y la serie **ya no genera eventos** → hay que **extender la recurrencia ANTES del 1-feb-2027** |
| ANKI AM 05:00 | `i8afj7uppkb3ntj8h9890dhecc` | franja vacía desde el lun 1-feb |
| Repaso 07:15 | `54lchqggik96dmljmmg3l88s54` | franja vacía desde el lun 1-feb |
| Pre-test 08:15 | `3tbecd5n03ut6lno3hjvc1sr7k` | franja vacía desde el lun 1-feb |
| DEEP PRIME 09:00 | `cb2uh20jnvu7pgfev4183pgctc` | franja vacía desde el lun 1-feb |
| 30Q 11:00 | `2eqmmrnh00jr44plevurgcu2as` | franja vacía desde el lun 1-feb |
| Eval USMLE 18:00 | `utk2laeob9u0847bbe9rm491v4` | franja vacía desde el lun 1-feb |

Las **6 series USMLE** siguen expirando de forma **coherente** con el plan v5.9 (**D95 = mar 26-ene-2027**, dentro de la semana de examen 25-29 ene y por delante del `UNTIL` del 29-ene): ahí no hay error, hay que **decidir qué ocupa esas 6 franjas** cuando ENCAPS vuelva a bloque principal en feb-mar 2027. **La única que sí es un fallo funcional es ENCAPS 16:15.**

⚠ **Cómo hacerlo:** extender un `UNTIL` implica tocar la recurrencia, y el MCP de Google Calendar tiene `recurrenceData` **roto para UPDATE** → hacerlo desde la UI de Google Calendar, o **`delete_event` de la serie + `create_event`** (en CREATE sí funciona), **guardando antes la `description` completa** (la de v5.9, §10.1) para no perderla. **Fecha límite: antes del lun 1-feb-2027.**

#### 🟡 2 · SYNAPSE de fin de semana con texto de junio (sin cambios desde el 09-sep)
`hv2lk04orquvivthtkfhilb1ps` (sáb 15:00-17:00) y `s7r8tiu66286t156l0odpv5nvo` (dom 15:00-17:00) siguen con la descripción del 10-jun (CS50P, synapse-journal, "la serie arranca el 28-jun"). **Contradicen** el texto vivo de las 04:15 y de las 12:30, que definen sáb 15:00-17:00 = SHIP del proyecto de vibecoding y dom = Feynman de 10' opcional. → reescribir solo `description`. **No entraban en el alcance del 10-sep** (no citan la versión del régimen).

#### 🟡 3 · `<br>` escapados como texto
`&lt;br&gt;` sigue visible en SYNAPSE 12:30 (`j99thg3eaqesosmvppj4rfgvh4`), SYNAPSE PC sábado y SYNAPSE domingo. El 10-sep se **conservó tal cual a propósito** (cambiarlo altera el render actual de esa descripción). Limpieza cosmética, sin urgencia.

#### ⚪ 4 · Decisiones de Joseph, no bugs (no se tocan sin su OK)
- Título **"ALUMUERZO"** (typo) — `43dq3oib16esjcqj1dcd8osot2`.
- **EKER 04:00** `22bh9m5jhc7ro6aj3m4ffjad7g`: las 5 frases son identidad de negocio; durante las semanas del Step 1 falta una frase de identidad de examen.
- **Martes**: ALISTARSE 18:30-18:45 (`21lbj9le99k8s9giclm3fauafs`) + VIAJE 18:45-19:00 (`3umsaskrlt1vi5ud3oubmcp504`) le quitan 15' a la Eval USMLE de las 18:00.
- **Hueco 13:15-13:30** sin asignar (el NAP de julio ya no existe en el Calendar).

---

## 11 · Registro de cambios en el Calendar (12-sep-2026 · corrimiento v5.10)
Corrimiento D1 vie 11-sep → **lun 14-sep** (el vie 11 no se estudió; **9.º corrimiento** desde el 31-ago). **Por primera vez un hito cambió de fecha: el UWSA1** (evento suelto `o1gla7846uae4tgngvc4q45osg`) pasó del vie 11-sep 09:00-13:00 al **lun 14-sep 09:00-13:00** (`America/Lima`) y sigue siendo el D1. Los otros 11 overlays conservan su fecha; cambió su D# (todos −1) y, en seis de ellos, el texto estructural que dependía de fechas (NBME 29, NBME 30, UWSA2, NBME 31, NBME 32/33 y Free 120). En las series solo cambió la **etiqueta de régimen** y las **cifras de cada plan** leídas con `node` de los `.ts`/`.sql` (y contrastadas con Supabase en vivo para ENCAPS).

Método: `get_event` para leer la descripción viva → sustitución del D# y de "D1 = vie 11-sep / v5.9" por "**D1 = lun 14-sep, v5.10, 95 días**" y de "target mié 27" por "**target vie 29-ene (jue 28 descanso)**" → `update_event` **solo con el campo `description`** (en el UWSA1, además `startTime`/`endTime`/`timeZone`) → `get_event` de verificación. **No se tocó ninguna otra hora, ningún título, RRULE, `colorId` ni `transparency`**, no se usó `recurrenceData` (roto para UPDATE) y **no se borró ni recreó ninguna serie**. Total: **28 eventos** (12 overlays + 16 series). Verificación estructural adicional con `list_events`: **lun 14-sep = 30 eventos** (13 bloques de estudio + UWSA1 + rutina/comida/GYM+BAILE) y **vie 11-sep = sin overlay**.

### 11.0 · Los 12 overlays de hito

| # | Hito · fecha | ID | D# | Otros cambios de texto |
|---|---|---|---|---|
| 1 | UWSA1 **vie 11-sep → lun 14-sep** ⚡ | `o1gla7846uae4tgngvc4q45osg` | D1 → **D1** (sin cambio) | **`start`/`end` movidos** a 2026-09-14 09:00-13:00 `America/Lima` (título, `colorId` 6, `transparency` intactos). Primera frase reescrita: "**D1 del plan v5.10 (lun 14-sep = baseline el primer día)**", el UWSA1 es el PRIMER hito que cambia de fecha en todos los corrimientos (los otros 11 solo cambian de D#), el contenido arranca el **mar 15-sep = D2**; última línea: "target vie 29-ene, jue 28 descanso" |
| 2 | NBME 25 02-oct | `4hjv5lkvluj06ahc2qndtsi6as` | D16 → **D15** | — |
| 3 | NBME 26 23-oct | `lr7ktrbiffj4hrlke7lh7cv6h4` | D31 → **D30** | — |
| 4 | NBME 27 13-nov | `sm4baa2v453ifaub325h9v08mg` | D46 → **D45** | — |
| 5 | NBME 28 04-dic | `ecu784689p8osrhqabuct8d5jg` | D61 → **D60** | — |
| 6 | NBME 29 18-dic | `ae93qv0nqqs36h439hid1jcq8o` | D71 → **D70** | añadido: "Semana siguiente (lun 21 → mié 23-dic = D71-D73): Musculoskeletal/Rheum íntegro DESPUÉS de este NBME — el corrimiento ya no parte el sistema" + target vie 29 en la última línea |
| 7 | NBME 30 30-dic | `mael3p9uhp036jbep45ql6v9oc` | D78 → **D77** | Fase B recalculada (**7-ene→15-ene = D81-D87, 7 días**) y la línea de feriados reescrita: lun 4-ene = **D78** (bioestadística + epidemiología + ética/comunicación, AMBOSS HY 155Q) · mar 5-ene = **D79** (1.º día doble de bioquímica) · mié 6-ene = **D80** cierra la Fase A (2.º día doble) · Fase B arranca **jue 7-ene = D81** y dura 7 días hasta el NBME 31 (**D87**) |
| 8 | UWSA2 08-ene | `2u7viv0elr6aedo0m9undfa5kg` | D83 → **D82** | el GO/NO-GO del 15-ene se cita como **NBME 31, D87**; target vie 29 |
| 9 | NBME 31 15-ene | `l771lvcfv0jcebt61do6svia18` | D88 → **D87** | "cierra la Fase B (7 días: jue 7-ene = D81 → hoy)"; "CONFIRMAR fecha semana 25-29 ene (**target vie 29-ene; jue 28 descanso pre-examen**)" |
| 10 | NBME 32 18-ene | `h65e772pqsa4hgc5b6bh9n8h50` | D89 → **D88** | añadido: "Mañana mar 19-ene (D89) es día de banco dentro del sprint: uWorld incorrects 2.ª pasada + sistema débil #3" |
| 11 | NBME 33 20-ene | `la5rsbuiqj1o35lb5adf93abuo` | D91 → **D90** | añadido: "Mañana jue 21-ene (D91) es día de banco dentro del sprint: uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitad 1)" |
| 12 | Free 120 22-ene | `lh9jfjsmoif74ci6jcn8f1mq30` | D93 → **D92** | el último día del plan pasa a **mié 27-ene = D95**; "EXAMEN: semana 25-29 ene (**target vie 29-ene**; el jue 28 queda como día de descanso pre-examen)"; "como si fuera el viernes 29"; semana final reescrita: lun 25 = **D93** (último día de banco: incorrects + AMBOSS 200 mitad 2) · mar 26 = **D94** (repaso FA 6-10 + Anki marathon + incorrects, 40Q flagged) · mié 27 = **D95** (rapid review FA, 20Q, taper) · jue 28 = descanso (bolsas, cama 21:00) · vie 29 = EXAMEN |

Los D# se leyeron con `node` del array `DIAS` de `src/lib/usmleStep1Daily.ts` (95 entradas, 0 sáb/dom/feriados, D# consecutivos). Los mínimos on-track del texto (≥51/54/57/61/63/65/68 %) no cambiaron.

### 11.1 · Las 16 series tocadas

| Serie | ID | RRULE (verificada intacta) | Texto viejo → nuevo |
|---|---|---|---|
| IA vibecoding 04:15 | `udr09j9ng983o0d4nipkfe4494` | `WEEKLY;BYDAY=MO-FR` | v5.9 / 60 días vie 11-sep → jue 3-dic → **v5.10 / 60 días L-V lun 14-sep → vie 4-dic-2026** (1.er SHIP sáb 19-sep sin cambio, S1 = lun 14 → vie 18-sep; **último SHIP sáb 5-dic**) |
| ANKI AM 05:00 | `i8afj7uppkb3ntj8h9890dhecc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | "95 días desde vie 11-sep hasta mar 26-ene ≈ 594h" → **"95 días desde lun 14-sep hasta mié 27-ene-2027 ≈ 594h"** |
| DEEP PRIME 09:00 | `cb2uh20jnvu7pgfev4183pgctc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | D95 mar 26-ene / A D1-D80 · B D81-D88 · C D89-D95 / NBME 31 = D88 / target mié 27 → **D95 mié 27-ene / A D1-D80 · B D81-D87 · C D88-D95 / NBME 31 = D87 / target vie 29-ene (jue 28 descanso)**; "el D1 (lun 14-sep) es el UWSA1 … único hito que cambió de fecha"; contenido arranca **mar 15-sep (D2)**; "su contenido ya es v5.10" |
| SYNAPSE 12:30 | `j99thg3eaqesosmvppj4rfgvh4` | `WEEKLY;BYDAY=MO-FR` | 82 días vie 11-sep → mar 1-dic → **81 días lun 14-sep → jue 3-dic-2026** (`SYN_PLAN_META`, leído con node) |
| Research↔Derma 13:30 | `3ofg2ljv8kl3p1adm2e5d5nih3` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | **mapa de arranque recalculado con `diaEstudioTipo()`** (ancla mié 10-jun-2026, no se mueve): **lun 14 RESEARCH (D1) · mar 15 DERMA (d1) · mié 16 RESEARCH (D2) · jue 17 DERMA (d2) · vie 18 RESEARCH (D3) · lun 21 DERMA (d3) · mar 22 RESEARCH (D4) · mié 23 DERMA (d4)**. Research **42 átomos lun 14-sep → mar 9-feb-2027 SIN cambio** (D38 = mar 29-dic, pausa Step 1, D39 = lun 1-feb) · Derma **70 sesiones mar 15-sep → mar 30-mar-2027** (+2 días de calendario, explicado en el texto) |
| AURUM 14:15 | `at1nak8f24nbnj1mh2jcd4aggg` | `WEEKLY;BYDAY=MO-FR` | D1 vie 11-sep → D130 mar 16-mar → **D1 lun 14-sep → D130 mié 17-mar-2027** |
| MIR eval 15:15 | `2ldp6obaapnvo76li28uprrddg` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | 78 días (vie 11-sep → mié 30-dic) → **78 días (lun 14-sep → lun 4-ene-2027: 76 temas + D77 mini-MIR + D78 corrección)**; mantenimiento 63 días **fijo**, modo reducido **hasta el 27-ene** (era 26-ene); target vie 29-ene (jue 28 descanso) |
| MIR deep work 15:30 | `00k364heibh1n6f9hfspcv9dpi` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | "≈310 cards al mié 30-dic" → **"≈310 cards al lun 4-ene-2027"** + etiqueta v5.10 + "(63 días, modo reducido hasta el 27-ene)" |
| ENCAPS 16:15 | `papebi46etlo8glgfs5akd5mig` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | 98 días vie 11-sep / 19 mini-sims / backup `bk_0910` / intensiva = día 99 → **97 días lun 14-sep → vie 29-ene-2027 (79 de banqueo + 18 mini-sims de viernes) / backup `study_schedule_bk_0912` / "98 → 97 (el vie 11-sep perdido era un mini-sim: 19 → 18)" / intensiva lun 1-feb = día 98** |
| LIVIANO 17:15 | `8epae6hlfmrc9j0h2kib7iuc84` | `WEEKLY;BYDAY=MO-FR` | 90 días vie 11-sep → mar 19-ene / 19 pre-tests → **90 días lun 14-sep → mié 20-ene-2027 / 18 pre-tests** (16 casos y 4 drills sin cambio) |
| DESAYUNO L-V 07:00 · DESAYUNO sáb/dom 06:45 · ALUMUERZO 12:00 | `7agi60f2bp8qnh6cnqvfo22giv` · `2u9je70pif58hgf2f8t3vgu8b8` · `43dq3oib16esjcqj1dcd8osot2` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` · `WEEKLY;WKST=SU;BYDAY=SA,SU` · `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | solo la etiqueta: **"Régimen v5.10 (D1 = lun 14-sep-2026)"** |
| BAILE mié · sáb · dom | `0tod56pc6pgecm5lf7g4e3ji9v` · `3jkfb6097rtc1jbec19eg3sd57` · `7j6pucil43vuca70p082g5ub3d` | `WEEKLY;BYDAY=WE` · `BYDAY=SA` · `BYDAY=SU` | solo la etiqueta: **"Régimen v5.10 (D1 = lun 14-sep-2026)"** |

*(la fila de DESAYUNO/ALMUERZO agrupa 3 eventos y la de BAILE otros 3: 6 series de rutina + 10 de estudio/secundarias = 16 series tocadas)*

**⏸ Leídas y NO tocadas (4):** **repaso 07:15** `54lchqggik96dmljmmg3l88s54` · **pre-test 08:15** `3tbecd5n03ut6lno3hjvc1sr7k` · **30Q 11:00** `2eqmmrnh00jr44plevurgcu2as` · **eval 18:00** `utk2laeob9u0847bbe9rm491v4`. Ninguna cita la versión del régimen, D1 ni el nº de días → no había nada que corregir (mismo criterio que el 08/09/10-sep).

**Balance del día 12-sep-2026: 28 descripciones reescritas + 1 evento movido de fecha (el UWSA1).** Cero eventos creados, borrados o recreados; cero cambios de título, color, `transparency` o recurrencia; una sola hora cambiada (la del UWSA1: del vie 11 al lun 14-sep, 09:00-13:00 en ambos casos).

### 11.2 · Pendiente REAL (estado al 12-sep-2026)
**Ya están al día en v5.10**: los 12 overlays (UWSA1 ya en el lun 14) · vibecoding 04:15 · ANKI AM 05:00 · DEEP PRIME 09:00 · SYNAPSE 12:30 · Research↔Derma 13:30 · AURUM 14:15 · MIR 15:15 y 15:30 · ENCAPS 16:15 · LIVIANO 17:15 · DESAYUNO L-V · DESAYUNO sáb/dom · ALUMUERZO · BAILE mié/sáb/dom.

#### 🔴 1 · RRULE con `UNTIL=20270130T045959Z` (= vie 29-ene-2027 23:59:59 Lima) — **7 series L-V** · AVISO VIGENTE
**SIGUE VIGENTE Y SIN RESOLVER** (reconfirmado el 12-sep con `get_event`: ANKI AM, repaso 07:15, pre-test 08:15, DEEP PRIME, 30Q, ENCAPS y eval 18:00 conservan ese `UNTIL`; ninguna de las 28 escrituras de hoy tocó la recurrencia).

| Serie | ID | Qué pasa después del vie 29-ene-2027 |
|---|---|---|
| **ENCAPS 16:15** | `papebi46etlo8glgfs5akd5mig` | 🔴 **BLOQUEANTE.** El mantenimiento v5.10 termina exactamente el vie 29-ene (día 97) y la **fase intensiva ENCAPS arranca el lun 1-feb-2027** (ahora **día 98**, porque el mantenimiento bajó de 98 a 97 días); la serie **ya no genera eventos** desde ese lunes → hay que **extender la recurrencia ANTES del 1-feb-2027** |
| ANKI AM 05:00 | `i8afj7uppkb3ntj8h9890dhecc` | franja vacía desde el lun 1-feb |
| Repaso 07:15 | `54lchqggik96dmljmmg3l88s54` | franja vacía desde el lun 1-feb |
| Pre-test 08:15 | `3tbecd5n03ut6lno3hjvc1sr7k` | franja vacía desde el lun 1-feb |
| DEEP PRIME 09:00 | `cb2uh20jnvu7pgfev4183pgctc` | franja vacía desde el lun 1-feb |
| 30Q 11:00 | `2eqmmrnh00jr44plevurgcu2as` | franja vacía desde el lun 1-feb |
| Eval USMLE 18:00 | `utk2laeob9u0847bbe9rm491v4` | franja vacía desde el lun 1-feb |

Las **6 series USMLE** siguen expirando de forma **coherente** con el plan v5.10 (**D95 = mié 27-ene-2027**, examen target **vie 29-ene** = el mismo día del `UNTIL`): ahí no hay error, hay que **decidir qué ocupa esas 6 franjas** cuando ENCAPS vuelva a bloque principal en feb-mar 2027. **La única que sí es un fallo funcional es ENCAPS 16:15.** ⚠ Si un futuro corrimiento empujara el D95 más allá del vie 29-ene, las 6 series USMLE también quedarían cortas: revisar el `UNTIL` en cada corrimiento.

⚠ **Cómo hacerlo:** extender un `UNTIL` implica tocar la recurrencia, y el MCP de Google Calendar tiene `recurrenceData` **roto para UPDATE** → hacerlo desde la UI de Google Calendar, o **`delete_event` de la serie + `create_event`** (en CREATE sí funciona), **guardando antes la `description` completa** (la de v5.10, §11.1) para no perderla. **Fecha límite: antes del lun 1-feb-2027.**

#### 🟡 2 · SYNAPSE de fin de semana con texto de junio (sin cambios desde el 09-sep)
`hv2lk04orquvivthtkfhilb1ps` (sáb 15:00-17:00) y `s7r8tiu66286t156l0odpv5nvo` (dom 15:00-17:00) siguen con la descripción del 10-jun (CS50P, synapse-journal, "la serie arranca el 28-jun"). **Contradicen** el texto vivo de las 04:15 y de las 12:30, que definen sáb 15:00-17:00 = SHIP del proyecto de vibecoding y dom = Feynman de 10' opcional. → reescribir solo `description`. **No entraban en el alcance del 12-sep** (no citan la versión del régimen).

#### 🟡 3 · `<br>` escapados como texto
`&lt;br&gt;` sigue visible en SYNAPSE 12:30 (`j99thg3eaqesosmvppj4rfgvh4`), SYNAPSE PC sábado y SYNAPSE domingo. El 12-sep se **conservó tal cual a propósito** (cambiarlo altera el render actual de esa descripción). Limpieza cosmética, sin urgencia.

#### 🟡 4 · 9 series de GYM/BAILE con etiqueta "Régimen v5.6" (detectado el 12-sep)
Desde el 08-sep solo se han venido actualizando las 3 series BAILE mié/sáb/dom; las **otras 9 series de GYM y BAILE del §2** conservan la descripción común del 05-sep con la etiqueta "Régimen v5.6 · autoridad: …". Visto en vivo el 12-sep en la lectura del vie 11 con `list_events`: **GYM vie `7sf8i7pe62pugfk4t6tcnbb9i4`** y **BAILE vie `5pd4jhmvl31hvbuh40vphpoc4q`**; las otras 7 **A VERIFICAR (12-sep)**. No estaban en la lista de series a tocar de ninguna pasada. Es solo la etiqueta (el protocolo post-entreno no cambia) → reescribir solo `description` con "Régimen v5.10 (D1 = lun 14-sep-2026)".

#### ⚪ 5 · Decisiones de Joseph, no bugs (no se tocan sin su OK)
- Título **"ALUMUERZO"** (typo) — `43dq3oib16esjcqj1dcd8osot2`.
- **EKER 04:00** `22bh9m5jhc7ro6aj3m4ffjad7g`: las 5 frases son identidad de negocio; durante las semanas del Step 1 falta una frase de identidad de examen.
- **Martes**: ALISTARSE 18:30-18:45 (`21lbj9le99k8s9giclm3fauafs`) + VIAJE 18:45-19:00 (`3umsaskrlt1vi5ud3oubmcp504`) le quitan 15' a la Eval USMLE de las 18:00.
- **Hueco 13:15-13:30** sin asignar (el NAP de julio ya no existe en el Calendar).

#### ⚪ 6 · Dato de los planes, no del Calendar (para el agente MIR)
`mirDailyPlan.ts` termina el **lun 4-ene-2027 (D78 = corrección)** y `mirMantenimiento.ts` arranca **también el lun 4-ene-2027 (D1, modo reducido)**: solapan 1 día en la franja 15:15-16:15. La serie MIR del Calendar no cambia (es diaria L-V); es el plan el que debe decidir cuál de los dos manda ese lunes. **A VERIFICAR (12-sep).**
