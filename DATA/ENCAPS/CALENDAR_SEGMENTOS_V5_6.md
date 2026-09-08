# 📅 SEGMENTOS DEL CALENDAR — RÉGIMEN v5.7 (corrimiento verificado en vivo 08-sep-2026)
> **📌 Nota v5.7 (08-sep-2026).** Este documento **ya refleja el corrimiento a D1 = miércoles 9-sep-2026** (el 7 y el 8 de septiembre no se estudiaron). El nombre del fichero conserva `V5_6` **solo por los enlaces existentes**: lo citan como autoridad varias descripciones de series del Calendar y otros docs del repo, y renombrarlo los rompería. El contenido es v5.7 en todas sus secciones; toda referencia a "v5.6" fuera de las citas literales/históricas está superada. Última pasada sobre el Calendar en vivo: **08-sep-2026, 28 descripciones reescritas** (§7 y §8).
> Fuente: Google Calendar `josephsototocas@gmail.com` · zona `America/Lima` · estructura L-V/sáb/dom extraída el 05-sep (166 eventos) y **reverificada en vivo el 08-sep sobre la semana real mié 9 → dom 13 sep 2026** (`list_events` día a día + `get_event` de los 12 overlays de hito).
> **Autoridad de CUÁNDO y CÓMO** se ejecuta cada segmento (L-V + sábado/domingo). El **QUÉ** (tema/misión del día) lo mandan la app YoCPMD y sus planes: `src/lib/usmleStep1Daily.ts` (**95 días**, D1 = 2026-09-09 → D95 = 2027-01-22), Supabase `study_schedule` (ENCAPS **100 días**, `encapsPlan.ts`), `mirDailyPlan.ts`, `researchDailyPlan.ts`/`dermaDailyPlan.ts`, `aurumDailyPlan.ts`, `livianoStudyPlan.ts`, `synapseDailyPlan.ts`.
> Sustituye a [`CALENDAR_SEGMENTOS_LUNES_VIERNES.md`](./CALENDAR_SEGMENTOS_LUNES_VIERNES.md) (24-jul, loop ENCAPS — HISTÓRICO). Doc maestro del régimen: `DATA/REESTRUCTURACION_31AGO_2026.md`.

## 0 · Reglas del régimen v5.7 (las que el Calendar materializa)
| Regla | Valor |
|---|---|
| **D1** | **miércoles 9-sep-2026** (31-ago→8-sep no estudiados; **7 corrimientos acumulados**. v5.6 tenía D1 = lun 7-sep: el 7 y el 8 de septiembre no se estudiaron y el plan corrió +2 días hábiles) |
| **Fases USMLE** | **A · contenido D1-D80** (9-sep→30-dic) · **B · banco D81-D90** (4-ene→15-ene) · **C · sprint D91-D95** (18-ene→22-ene). El corrimiento fusionó en 2 los 4 días de cierre de Fase A (bioquímica HY + genética/farmacología general): **ningún tema se perdió** |
| Días de plan | L-V; feriados fuera del plan: 25-dic, 31-dic, 1-ene |
| **Bloque principal** | **USMLE Step 1** — 6h15/día: 05:00 Anki AM · 07:15 repaso anclado · 08:15 pre-test 10Q · 09:00 deep prime · 11:00 30Q · 18:00 eval |
| Examen Step 1 | semana **25-29 ene 2027** (target mié 27) · **GO/NO-GO vie 15-ene** (NBME 31): 2 NBME consecutivos ≥68 % + UWSA2 low-risk |
| Secundarios | MIR 15:15-16:15 · ENCAPS 16:15-17:15 (mantenimiento 1h; examen fin-mar 2027, meta ≥17/20; feb-mar vuelve a principal) · LIVIANO 17:15-18:00 · Research↔Derma 13:30-14:15 (alternos) · AURUM 14:15-15:15 · SYNAPSE 12:30 (30') + vibecoding 04:15 |
| Fin de semana | **SÁBADO Y DOMINGO LIBRES de banco de preguntas** (los hitos van en viernes). No es "libre" literal: despertar 04:00 (EKER), caminata, SYNAPSE PC 15:00-17:00 ambos días, video empresa sáb 17:00, Anki sáb 19:00 / dom 17:00, baile |
| Corrimiento | cada día hábil sin estudiar = +1: `node DATA/_scripts/remap_inicio.js <fecha>` + `gen_encaps_mantenimiento_2027.js` + `gen_synapse_plan.js` + `gen_aurum_plan.js` + regenerar USMLE. **Los overlays de hito NO se mueven** (fechas fijas en viernes) — pero **su D# sí cambia** y hay que reescribir la `description` de los 12 (ver §5 y §7) |
| Sueño | 21:00 → 04:00 (7h) todos los días. Ley cero de `RUTINA_EXTREMA_MILITARIZADA.md` |
| Comida/hidratación (05-sep) | desayuno ≥30 g proteína + 500 ml · 500 ml + snack al abrir deep prime 09:00 y MIR 15:15 · almuerzo = comida principal (VITALS dimensiona) · **cena ligera 5' en el cambio ENCAPS→LIVIANO 17:15** · post-GYM/BAILE solo agua/electrolitos (nada pesado <2h antes de las 21:00). Pisos VITALS: proteína 1,6 g/kg · agua 3.000 ml · sueño 7h (`VITALS/web/src/lib/engine/domain.ts`) |

### 0.1 · Semana real de arranque v5.7 — mié 9 → dom 13 sep 2026 (verificado en vivo 08-sep)
La semana de arranque es **corta: 3 días hábiles** (mié-jue-vie). Comprobado con `list_events` día a día que **los 11 bloques de estudio del régimen siguen en su sitio los tres días** (04:15 IA · 05:00 Anki AM · el tramo USMLE 07:15-12:00 · 12:30 SYNAPSE · 13:30 Research↔Derma · 14:15 AURUM · 15:15 MIR · 16:15 ENCAPS · 17:15 LIVIANO · 18:00 eval; en el Calendar son **13 series**, porque el tramo USMLE de la mañana son 4 series (07:15/08:15/09:00/11:00) y MIR son 2 (15:15/15:30)) y que **sáb 12 y dom 13 no tienen banco de preguntas**. No se creó ni borró ningún evento.

| Día | D# USMLE | Bloques de estudio verificados (13/13 series) | Hito |
|---|---|---|---|
| **Mié 9-sep** | **D1** — Fundamentos · Pathoma 1-2 (lesión/muerte celular + inflamación) · nivelUW 1 · 30Q | 04:15 IA vibecoding · 05:00 Anki AM · 07:15 repaso · 08:15 pre-test · 09:00 deep prime · 11:00 30Q · 12:30 SYNAPSE · 13:30 Research↔Derma · 14:15 AURUM · 15:15+15:30 MIR · 16:15 ENCAPS · 17:15 LIVIANO · 18:00 eval | — |
| **Jue 10-sep** | **D2** — Fundamentos · Pathoma 3 (neoplasia) + setup Anki FSRS · nivelUW 1 · 30Q | idénticos (mismas series L-V) | — |
| **Vie 11-sep** | **D3** — Assessment · nivelUW 5 · 160Q | idénticos + **overlay 🎯 UWSA1 09:00-13:00** (pisa deep prime, 30Q, almuerzo y SYNAPSE — ver §5) | 🎯 **UWSA1 BASELINE** |
| Sáb 12-sep | — | **libre de banco**: rutina 04:00-07:15 · 15:00-17:00 SYNAPSE PC · 17:00-19:00 video empresa · 19:00 Anki · 20:00 baile | — |
| Dom 13-sep | — | **libre de banco**: rutina 04:00-07:15 · 15:00-17:00 SYNAPSE repaso+PC · 17:00 Anki · 17:15/18:00 baile | — |

⚠ **Miércoles**: el entrenamiento es BAILE largo 19:00-20:30 (sin gym) — el 9-sep arranca así. **Viernes 11**: GYM 19:00-20:00 + BAILE 20:00-20:30, con el UWSA1 ya cerrado por la tarde.

## 1 · LUNES-VIERNES — tabla maestra
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

## 5 · OVERLAYS DE HITO USMLE (viernes · color 6 naranja · `transparency: transparent` · eventos únicos, no series)
**Las FECHAS no se movieron con el corrimiento v5.7 — los D# sí.** Cada D# de la tabla se leyó con `node` del array `DIAS` de `src/lib/usmleStep1Daily.ts` (95 entradas, D1 = 2026-09-09), no se estimó. El **08-sep-2026 se reescribió el campo `description` de los 12 overlays** para sustituir el D# viejo y la referencia "D1 = lun 7-sep" por "**D1 = mié 9-sep, v5.7, 95 días**"; **el protocolo de test-day de Palmerton se conservó íntegro** (§F de `DATA/USMLE/PALMERTON_POR_MATERIA.md`): Ziploc BREAK 1/2/3 preparadas la noche anterior (proteína magra + grasas, **sin carbohidratos simples**), cronograma de descansos (sit-in 1-2' / activo 10' / almuerzo dentro del sim), sin cambiar respuestas por ruido, SYNAPSE de ese día a la tarde, registro de agua/sueño en VITALS como ensayo, y el mapa del día real de 7 bloques. Horas, títulos, `colorId`, `transparency` y la ausencia de recurrencia quedaron intactos (verificado con `get_event` en los 12).

| # | Fecha (vie) | Hora | Título literal | ID | **D# v5.7** | D# v5.6 (histórico) | Mínimo on-track (texto del overlay) |
|---|---|---|---|---|---|---|---|
| 1 | 11-sep-2026 | 09:00-13:00 | 🎯 UWSA1 — BASELINE Step 1 (160Q · 4 bloques) | `o1gla7846uae4tgngvc4q45osg` | **D3** | D5 | línea base |
| 2 | 02-oct-2026 | 07:15-11:00 | 🎯 NBME 25 (200Q) + revisión | `4hjv5lkvluj06ahc2qndtsi6as` | **D18** | D20 | ≥51 % |
| 3 | 23-oct-2026 | 07:15-11:00 | 🎯 NBME 26 (200Q) + revisión | `lr7ktrbiffj4hrlke7lh7cv6h4` | **D33** | D35 | ≥55 % |
| 4 | 13-nov-2026 | 07:15-11:00 | 🎯 NBME 27 (200Q) + revisión | `sm4baa2v453ifaub325h9v08mg` | **D48** | D50 | ≥58 % |
| 5 | 04-dic-2026 | 07:15-11:00 | 🎯 NBME 28 (200Q) + revisión | `ecu784689p8osrhqabuct8d5jg` | **D63** | D65 | ≥61 % |
| 6 | 18-dic-2026 | 07:15-11:00 | 🎯 NBME 29 (200Q) + revisión | `ae93qv0nqqs36h439hid1jcq8o` | **D73** | D75 | ≥63 % |
| 7 | 30-dic-2026 (mié) | 07:15-11:00 | 🎯 NBME 30 — CIERRE FASE A (200Q) + plan Fase B | `mael3p9uhp036jbep45ql6v9oc` | **D80** | D82 | ≥65 % · cierra Fase A |
| 8 | 08-ene-2027 | 09:00-13:00 | 🎯 UWSA2 — predictor gold-standard (160Q) | `2u7viv0elr6aedo0m9undfa5kg` | **D85** | D87 | low-risk |
| 9 | 15-ene-2027 | 07:15-11:00 | 🎯 NBME 31 (200Q) — GO/NO-GO fecha de examen | `l771lvcfv0jcebt61do6svia18` | **D90** | D92 | **GO = 2 NBME ≥68 % + UWSA2 low-risk** · cierra Fase B |
| 10 | 18-ene-2027 (lun) | 07:15-11:00 | 🎯 NBME 32 (200Q) + repaso FA 1-5 | `h65e772pqsa4hgc5b6bh9n8h50` | **D91** | D93 | sprint (Fase C) |
| 11 | 20-ene-2027 (mié) | 07:15-11:00 | 🎯 NBME 33 (200Q) + repaso FA 11-14 | `la5rsbuiqj1o35lb5adf93abuo` | **D93** | D95 | sprint (Fase C) |
| 12 | 22-ene-2027 | 07:15-11:00 | 🎯 FREE 120 oficial + logística del examen | `lh9jfjsmoif74ci6jcn8f1mq30` | **D95** | D97 | **último día del plan** |

⚠ Los overlays 10-12 caen lun/mié/vie de la última semana (no todos en viernes): el título y la hora se mantienen; el D# es el que manda para leer el contenido del día en la app.
⚠ Tras el 30-dic (D80) los feriados jue 31-dic y vie 1-ene quedan fuera del plan: **el siguiente día hábil es el lun 4-ene = D81** (arranque de la Fase B). Esta línea ya está corregida dentro de la descripción del overlay NBME 30.

**Colisiones de un día de hito (aceptadas, no se mueven franjas):**
- UWSA (09:00-13:00 + ~30' de descansos reales → ~13:30): pisa deep prime 09:00, 30Q 11:00, ALMUERZO 12:00 y SYNAPSE 12:30 → el almuerzo se come dentro del sim (Ziploc BREAK 2), SYNAPSE pasa a la tarde, la revisión completa va en las franjas USMLE de la tarde + 18:00.
- NBME (07:15-11:00 orientativo; 4 bloques × 50Q, el reloj lo pone la interfaz NBME): pisa repaso 07:15, pre-test 08:15, deep prime 09:00 y (si se alarga) 30Q 11:00 → almuerzo 12:00 normal; si el sim pasa de las 12:00, almuerzo dentro del sim entre B3 y B4.
- El resto del día (Research/Derma, AURUM, MIR, ENCAPS, LIVIANO, GYM/BAILE) **no cambia**.

## 6 · Descripciones de los bloques — releídas en vivo con `get_event` el **08-sep-2026**
Este bloque ya **no** transcribe el texto del 05-sep: aquellas transcripciones quedaron obsoletas cuando el 08-sep se reescribió la `description` de **16 series** (10 de estudio + 6 de rutina/comida/baile). Lo que sigue es un **resumen fiel de 1-2 líneas por serie** sobre el texto **vivo** leído hoy con `get_event`. En todas ellas se tocó **solo `description`**: RRULE, `start`/`end`, `summary` y `colorId` verificados intactos.

**Estado:** 🟢 = releída en vivo el 08-sep · ⚪ = no releída hoy (última captura 05-sep, sin cambios conocidos).

### 6.1 · Bloques de estudio (L-V)

| Hora · Serie | ID | Resumen fiel del texto VIVO (08-sep) | Estado |
|---|---|---|---|
| 04:15-05:00 · 🧠 IA VIBECODING | `udr09j9ng983o0d4nipkfe4494` | Curso de IA en modo BUILDER, no programar desde cero: 1 proyecto real terminado por semana al servicio de sus sistemas; ciclo diario 5' objetivo → 35' construir con Claude Code → 5' commit + nota (repo synapse-journal). **Cierre v5.7 añadido hoy:** "12 proyectos · 60 días L-V · mié 9-sep → mar 1-dic-2026 · 1er SHIP sáb 19-sep (S1 = fix del parser APEX)", plan en `src/lib/vibecodingPlan.ts`; sáb 15:00-17:00 = SHIP, dom = Feynman del proyecto (10', opcional). | 🟢 |
| 05:00-05:45 · ANKI AM | `i8afj7uppkb3ntj8h9890dhecc` | Anki de madrugada (Palmerton, mente fresca) — Fase A: 45' FSRS deck USMLE; Fases B-C: 05:00-05:12 🔥 Stress Set 10Q + 05:12-05:45 Anki. **Cifra ya corregida hoy:** "régimen v5.7: 95 días desde mié 9-sep ≈ 594h" (antes decía 97 días / 606h). FSRS retención 0.90, máx 50 nuevas/día, solo Good/Again. | 🟢 ⚠ UNTIL |
| 07:15-08:15 · Repaso multi-temporal | `54lchqggik96dmljmmg3l88s54` | 07:15-07:50 Anki FSRS (tarjetas de MECANISMO) · 07:50-08:05 repaso anclado del tema de AYER (free recall 90 s + 2Q uWorld, <60 % → re-encolar) · 08:05-08:15 barrido D-3/D-7 en Obsidian. Links a la app y a `DATA/USMLE/README.md` + `PALMERTON_POR_MATERIA.md`. **No cita versión ni D1 → no había nada que corregir** (última edición 27-ago). | 🟢 ⚠ UNTIL |
| 08:15-09:00 · Pre-test ciego | `3tbecd5n03ut6lno3hjvc1sr7k` | 10Q uWorld ciegas en modo tutor del subtema del día, sin haber estudiado + free recall 90 s en papel + anotar los huecos como objetivo del deep prime. Sin referencia de versión (última edición 27-ago). | 🟢 ⚠ UNTIL |
| 09:00-11:00 · DEEP PRIME | `cb2uh20jnvu7pgfev4183pgctc` | Bloque sagrado de 2h: vídeo 09:00-10:00 (B&B/Pathoma/Sketchy a 1.5x) · First Aid active reading 10:00-10:45 · ≤10 tarjetas de mecanismo + APEX 10:45-11:00; jerarquía de material; "💧 AL ABRIR" con 500 ml + snack y micro-pausa 10:00-10:05; los viernes de hito este bloque es el UWSA/NBME. **Cierre v5.7 añadido hoy:** 95 días, D95 = vie 22-ene-2027, fases A D1-D80 / B D81-D90 / C D91-D95, examen 25-29 ene, GO/NO-GO vie 15-ene (NBME 31 = D90). | 🟢 ⚠ UNTIL |
| 11:00-12:00 · 30Q consolidación | `2eqmmrnh00jr44plevurgcu2as` | uWorld modo tutor SOLO de temas ya vistos; leer la explicación de correctas e incorrectas, clasificar cada fallo (conocimiento / lectura / razonamiento) y convertirlo en tarjeta de mecanismo; ritmo ~40Q/día → banco completo (3659Q) en la Fase A. Sin referencia de versión. | 🟢 ⚠ UNTIL |
| 12:30-13:00 · SYNAPSE misión | `j99thg3eaqesosmvppj4rfgvh4` | Misión del día en la app (A · 15' lección + B · 10' audio + C · 5' lectura móvil; marcar ✓). **Cierre v5.7 añadido hoy:** "81 días · mié 9-sep → sáb 28-nov-2026" (`src/lib/synapseDailyPlan.ts`), sáb 15:00-17:00 PC = SHIP del proyecto del vibecoding de las 04:15, dom = Feynman opcional. Los `<br>` siguen escapados como texto. | 🟢 |
| 13:30-14:15 · RESEARCH ↔ DERMA | `3ofg2ljv8kl3p1adm2e5d5nih3` | **Reescrita hoy por completo**: desapareció el mapa de fechas de junio. Ahora lleva el mapa de arranque v5.7 (mié 9 DERMA · jue 10 RESEARCH · vie 11 DERMA · lun 14 RESEARCH · mar 15 DERMA · mié 16 RESEARCH · jue 17 DERMA · vie 18 RESEARCH…) y los planes vigentes: **Research 42 átomos** jue 10-sep-2026 → vie 5-feb-2027 (pausa 4-ene → 29-ene por el Step 1) y **Derma 70 sesiones** mié 9-sep-2026 → mié 24-mar-2027; ambos saltan 25-dic, 31-dic y 1-ene. 45' · 1 entregable atómico/día · APEX + Obsidian. | 🟢 |
| 14:15-15:15 · AURUM | `at1nak8f24nbnj1mh2jcd4aggg` | Closer de ventas: 26 semanas · 130 lecciones · 7 fases; solo referentes reales con track record verificable (Hormozi, Cardone, Voss, Cialdini, Rackham, Girard, Tracy, Blount, Ross, Hopkins, Bettger + Josué Peña solo gratis) y 11 libros ancla; cada día 1 vídeo + drill de pitch sobre leads reales (ALLPA / Qori Golden); la lectura va en los huecos de viaje. **Cierre v5.7 añadido hoy:** D1 = mié 9-sep-2026 → D130 = vie 12-mar-2027 (`src/lib/aurumDailyPlan.ts`). | 🟢 |
| 15:15-15:30 · MIR eval anclada | `2ldp6obaapnvo76li28uprrddg` | 4Q ProMIR/AMIR del tema D-1 en modo examen (~90-100 s/Q, sin compendio) + 5' Anki deck MIR + 3' mini-corrección tipificando el error (conceptual / terminológico / aplicación); umbrales 4/4 avanzar · 3/4 zona gris · <3/4 repetir mañana; conserva "💧 AL ABRIR" y la justificación científica (Karpicke, Cepeda, Newport, Croskerry). **Etiqueta ya en v5.7:** MIR = 78 días (mié 9-sep → lun 28-dic-2026); del 4-ene al 31-mar-2027 sigue en banqueo de mantenimiento. | 🟢 |
| 15:30-16:15 · MIR deep work mini | `00k364heibh1n6f9hfspcv9dpi` | 1 subtema atómico/día en 4 sub-fases: pre-test + generation 5' · lectura activa + elaboración 25' · free recall libro cerrado 5' · ≤4 APEX 10' (formato completo FRENTE/REVERSO/CCSN/FISIOPATOLOGIA/RELACIONES, ≥1 comparativa MIR vs ENCAPS); identity stacking y métricas en Obsidian 06_MIR/Subtemas. **FUNDAMENTO recalculado hoy:** "78 días × 1 subtema/día × ≤4 cards ≈ 310 cards MIR sólidas al lun 28-dic-2026 (76 temas + D77 mini-MIR + D78 corrección)" — ya no cita los "95 días" del plan de mayo. | 🟢 |
| 16:15-17:15 · ENCAPS mantenimiento | `papebi46etlo8glgfs5akd5mig` | 16:15-16:30 eval anclada 5Q del tema de ayer · 16:30-17:15 banco 20-25Q por rotación semanal ponderada (II 30 % · I 27 % · V 21 % · III 13 % · IV 9 %) · viernes mini-simulacro 25Q a 72 s/Q · 8 críticos v3 · registrar CADA fallo en TRACKING_ERRORES; conserva el "🥤 CIERRE 17:10-17:15" de cena ligera. **Cierre v5.7 añadido hoy:** 100 días mié 9-sep-2026 → vie 29-ene-2027 (Supabase `study_schedule`, backup `study_schedule_bk_0908`, 19 mini-sims de viernes) y **la fase intensiva NO se mueve: sigue arrancando el lun 1-feb-2027, ahora como día 101**. | 🟢 🔴 UNTIL |
| 17:15-18:00 · LIVIANO | `8epae6hlfmrc9j0h2kib7iuc84` | 17:15-17:40 módulo del día (fisiología del peso · GLP-1/tirzepatida · nutrición · ejercicio · conducta · farmacología/bariátrica) · 17:40-18:00 aplicación explicándolo como a un paciente real; fuentes ProMIR + AMBOSS + guías AACE/OMA; conserva "🥤 ARRANQUE 17:15" y la coherencia LIVIANO (última comida sólida ≥3h antes de dormir). **Cierre v5.7 añadido hoy:** 90 días L-V mié 9-sep-2026 → vie 15-ene-2027 (`src/lib/livianoStudyPlan.ts`; 16 casos en viernes · 18 pre-tests de lunes · 4 drills de cifras ancla; salta 25-dic, 31-dic y 1-ene). | 🟢 |
| 18:00-18:45 · Eval diaria USMLE | `utk2laeob9u0847bbe9rm491v4` | 18:00-18:25 bloque timed de 15Q uWorld mixtas de temas vistos (72 s/Q, sin pausa, en inglés) · 18:25-18:45 corrección + log de errores + STRESS strategy de Palmerton para los dudados entre 2; termómetro diario registrado en la app; anchoring pre-sueño. Sin referencia de versión. | 🟢 ⚠ UNTIL |

⚠ **UNTIL** = la RRULE de esa serie termina el **vie 29-ene-2027** (`UNTIL=20270130T045959Z`). Son **7 series**, no 3. Detalle y plan de acción en §8.2.

### 6.2 · Comida, entrenamiento y fin de semana

| Bloque · Serie | ID | Resumen fiel del texto VIVO (08-sep) | Estado |
|---|---|---|---|
| 07:00-07:15 · DESAYUNO L-V | `7agi60f2bp8qnh6cnqvfo22giv` | ≥30 g de proteína + 500 ml de agua + carbohidrato COMPLEJO (nada de azúcar simple ni jugo envasado); 15' de combustible, sin banco de preguntas en la mesa; VITALS quick-log de sueño y primera agua; 1.ª de las 4 tomas de proteína (07:00 · 12:00 · 15:15 · 17:15) y lista de ventanas de hidratación del día. **Etiqueta actualizada hoy → "Régimen v5.7 (D1 = mié 9-sep-2026)"**. | 🟢 |
| 06:45-07:15 · DESAYUNO sáb/dom | `2u9je70pif58hgf2f8t3vgu8b8` | Misma regla sin prisa (aquí no hay bloque a las 07:15 → se puede comer sentado 30'); VITALS es donde más se pierde el registro el fin de semana; el Anki de sáb 19:00 / dom 17:00 lo dimensionan las tarjetas **due**, no el reloj (cero backlog el lunes, regla del 100 % de Palmerton). **Etiqueta actualizada hoy a v5.7**. | 🟢 |
| 12:00-12:30 · ALUMUERZO | `43dq3oib16esjcqj1dcd8osot2` | Comida principal dimensionada por VITALS (proteína + verduras + carbohidrato complejo), 500 ml de agua, pausa difusa sin pantalla del Step 1, sin azúcar simple para evitar el bajón de 13:30-15:00; en los UWSA (09:00-13:00) se come DENTRO del sim como Break 2 y en los NBME (07:15-11:00) queda igual a las 12:00. **Etiqueta actualizada hoy a v5.7**. | 🟢 |
| BAILE mié 19:00-20:30 · sáb 20:00-20:30 · dom 18:00-19:30 | `0tod56pc6pgecm5lf7g4e3ji9v` · `3jkfb6097rtc1jbec19eg3sd57` · `7j6pucil43vuca70p082g5ub3d` | Hidratación durante (300-500 ml); **post-entreno SOLO agua o electrolitos (500-750 ml)**, nada sólido pesado a <2h de las 21:00 (Walker: la digestión activa fragmenta el sueño profundo); la cena ligera va antes (17:15 L-V · ~19:30 sáb tras el Anki · ~17:00 dom); si hay hambre real al llegar, máximo 1 yogur o queso fresco; 0 luz azul tras 20:30 y cama 21:00. **Etiqueta actualizada hoy a v5.7 en las tres**. | 🟢 |
| Sáb 15:00-17:00 · SYNAPSE PC | `hv2lk04orquvivthtkfhilb1ps` | **Sin tocar desde el 10-jun**: "setup, notebooks, repo público synapse-journal, Problem Sets de CS50P + ponerte al día con la semana". **Contradice** el texto vivo de las 04:15 y 12:30, que ya definen el sábado como SHIP del proyecto de vibecoding → pendiente (§8.2). | 🟢 |
| Dom 15:00-17:00 · SYNAPSE repaso + PC | `s7r8tiu66286t156l0odpv5nvo` | **Sin tocar desde el 10-jun**: repaso semanal Feynman + terminar el bloque PC, y aún explica que "la serie arranca el 28-jun" porque los domingos 14 y 21-jun quedaban libres (histórico obsoleto). El texto vivo de las 04:15/12:30 ya dice que el domingo es Feynman de 10' opcional → pendiente (§8.2). | 🟢 |

⚪ **No releídas el 08-sep** (última captura 05-sep, sin cambios conocidos; ninguna cita la versión del régimen): **EKER 04:00** `22bh9m5jhc7ro6aj3m4ffjad7g` — 5 frases en voz alta (identidad · acción · ofensiva · sistema · cierre de creencia) + la cita de Eker sobre ver y cambiar · **PREPARAR PARA CORRER / CORRER (sáb-dom caminata) / CALISTENIA** — sin descripción · **DUCHA 06:45** — champú y sérum mié/vie/dom, lunes por la mañana; antes del gym o baile solo agua y polvo · **LECTURA DE LIBRO 13:00** — sin descripción (Biblioteca del Fundador en la app) · **ALISTARSE / VIAJE 18:45-19:15** — sin descripción (martes 18:30/18:45, ver §1) · **las 5 series de GYM y las 4 restantes de BAILE** — descripción común post-entreno del 05-sep (ver §2) · **VIAJE VUELTA 20:30** — evaluación del día en movimiento, sin pantallas, no Anki esa noche · **DORMIR 21:00** — 7h exactas, Walker + Stickgold, 0 luz azul tras 20:30, 18-20 °C, sin teléfono en la habitación.

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

### 8.2 · Pendiente REAL (estado al 08-sep-2026)
**Ya NO están pendientes** (se actualizaron hoy, contra lo que decía la versión anterior de esta sección): ANKI AM 05:00 · DEEP PRIME 09:00 · vibecoding 04:15 · SYNAPSE 12:30 · Research↔Derma 13:30 · AURUM 14:15 · MIR 15:15 y 15:30 · ENCAPS 16:15 · LIVIANO 17:15 · DESAYUNO L-V · DESAYUNO sáb/dom · ALUMUERZO · BAILE mié/sáb/dom. Todas llevan ya la etiqueta v5.7 y las cifras del corrimiento.

#### 🔴 1 · RRULE con `UNTIL=20270130T045959Z` (= vie 29-ene-2027 23:59:59 Lima) — **7 series L-V**, no 3
Leído hoy con `get_event` en cada una:

| Serie | ID | Qué pasa después del vie 29-ene-2027 |
|---|---|---|
| **ENCAPS 16:15** | `papebi46etlo8glgfs5akd5mig` | 🔴 **BLOQUEANTE.** La **fase intensiva ENCAPS arranca el lun 1-feb-2027** (día 101, con Semana Santa verificada) y la serie **ya no genera eventos** → hay que **extender la recurrencia ANTES de esa fecha** |
| ANKI AM 05:00 | `i8afj7uppkb3ntj8h9890dhecc` | franja vacía desde el lun 1-feb |
| Repaso 07:15 | `54lchqggik96dmljmmg3l88s54` | franja vacía desde el lun 1-feb |
| Pre-test 08:15 | `3tbecd5n03ut6lno3hjvc1sr7k` | franja vacía desde el lun 1-feb |
| DEEP PRIME 09:00 | `cb2uh20jnvu7pgfev4183pgctc` | franja vacía desde el lun 1-feb |
| 30Q 11:00 | `2eqmmrnh00jr44plevurgcu2as` | franja vacía desde el lun 1-feb |
| Eval USMLE 18:00 | `utk2laeob9u0847bbe9rm491v4` | franja vacía desde el lun 1-feb |

Las **6 series USMLE** expiran de forma **coherente** con el plan (D95 = vie 22-ene-2027) y con la semana de examen (25-29 ene): ahí no hay error, hay que **decidir qué ocupa esas 6 franjas** cuando ENCAPS vuelva a bloque principal en feb-mar 2027. **La única que sí es un fallo funcional es ENCAPS 16:15.**

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
