# 📅 SEGMENTOS DEL CALENDAR — RÉGIMEN v5.6 (extraído en vivo 05-sep-2026)
> Fuente: Google Calendar `josephsototocas@gmail.com` · zona `America/Lima` · semana **lun 7 → dom 13 sep 2026** (166 eventos, `list_events`) + `get_event` de los 12 overlays de hito.
> **Autoridad de CUÁNDO y CÓMO** se ejecuta cada segmento (L-V + sábado/domingo). El **QUÉ** (tema/misión del día) lo mandan la app YoCPMD y sus planes: `src/lib/usmleStep1Daily.ts` (97 días), Supabase `study_schedule` (ENCAPS 102 días), `mirDailyPlan.ts`, `researchDailyPlan.ts`/`dermaDailyPlan.ts`, `aurumDailyPlan.ts`, `livianoStudyPlan.ts`, `synapseDailyPlan.ts`.
> Sustituye a [`CALENDAR_SEGMENTOS_LUNES_VIERNES.md`](./CALENDAR_SEGMENTOS_LUNES_VIERNES.md) (24-jul, loop ENCAPS — HISTÓRICO). Doc maestro del régimen: `DATA/REESTRUCTURACION_31AGO_2026.md`.

## 0 · Reglas del régimen v5.6 (las que el Calendar materializa)
| Regla | Valor |
|---|---|
| **D1** | **lunes 7-sep-2026** (31-ago→4-sep no estudiados; 5 corrimientos acumulados) |
| Días de plan | L-V; feriados fuera del plan: 25-dic, 31-dic, 1-ene |
| **Bloque principal** | **USMLE Step 1** — 6h15/día: 05:00 Anki AM · 07:15 repaso anclado · 08:15 pre-test 10Q · 09:00 deep prime · 11:00 30Q · 18:00 eval |
| Examen Step 1 | semana **25-29 ene 2027** (target mié 27) · **GO/NO-GO vie 15-ene** (NBME 31): 2 NBME consecutivos ≥68 % + UWSA2 low-risk |
| Secundarios | MIR 15:15-16:15 · ENCAPS 16:15-17:15 (mantenimiento 1h; examen fin-mar 2027, meta ≥17/20; feb-mar vuelve a principal) · LIVIANO 17:15-18:00 · Research↔Derma 13:30-14:15 (alternos) · AURUM 14:15-15:15 · SYNAPSE 12:30 (30') + vibecoding 04:15 |
| Fin de semana | **SÁBADO Y DOMINGO LIBRES de banco de preguntas** (los hitos van en viernes). No es "libre" literal: despertar 04:00 (EKER), caminata, SYNAPSE PC 15:00-17:00 ambos días, video empresa sáb 17:00, Anki sáb 19:00 / dom 17:00, baile |
| Corrimiento | cada día hábil sin estudiar = +1: `node DATA/_scripts/remap_inicio.js <fecha>` + `gen_encaps_mantenimiento_2027.js` + `gen_synapse_plan.js` + `gen_aurum_plan.js` + regenerar USMLE. **Los overlays de hito NO se mueven** (fechas fijas en viernes) |
| Sueño | 21:00 → 04:00 (7h) todos los días. Ley cero de `RUTINA_EXTREMA_MILITARIZADA.md` |
| Comida/hidratación (05-sep) | desayuno ≥30 g proteína + 500 ml · 500 ml + snack al abrir deep prime 09:00 y MIR 15:15 · almuerzo = comida principal (VITALS dimensiona) · **cena ligera 5' en el cambio ENCAPS→LIVIANO 17:15** · post-GYM/BAILE solo agua/electrolitos (nada pesado <2h antes de las 21:00). Pisos VITALS: proteína 1,6 g/kg · agua 3.000 ml · sueño 7h (`VITALS/web/src/lib/engine/domain.ts`) |

## 1 · LUNES-VIERNES — tabla maestra
Series recurrentes (`recurringEventId`). Color = `colorId` de Google. "desc" = longitud de la descripción en el Calendar (0 = sin descripción).

| Hora | Bloque (título literal) | ID serie | RRULE | Color |
|---|---|---|---|---|
| 21:00-04:00 | 😴 DORMIR (7h exactas → 04:00) | `blkgb23e0es0phm2qee6cgqpp0` | diaria | 9 |
| 04:00-04:15 | DECLARACIONES EKER - REPROGRAMA TU BLUEPRINT | `22bh9m5jhc7ro6aj3m4ffjad7g` | diaria (7 días) | — |
| 04:15-05:00 | 🧠 IA — VIBECODING con Claude Code (construir, no programar desde cero) | `udr09j9ng983o0d4nipkfe4494` | L-V | 9 |
| 05:00-05:45 | 🇺🇸 USMLE — ANKI AM (madrugada fresca · FSRS) + Stress Set en Fases B-C | `i8afj7uppkb3ntj8h9890dhecc` | L-V | 2 |
| 05:45-06:00 | PREPARAR PARA CORRER | `40odesk58rnd2qhorsj15ule11` | diaria | — |
| 06:00-06:30 | CORRER- SABADO Y DOMINGO SOLO CAMINATA | `5mrm4ru08go9k70408jm8vcjku` | diaria | — |
| 06:30-06:45 | CALISTEMIA | `2lpvftrc3fp64e0om6qg0mcs34` | L-V | — |
| 06:45-07:00 | DUCHA | `mm2h37rbq89mbg917b8b983aa2` | L-V | — |
| 07:00-07:15 | DESAYUNO | `7agi60f2bp8qnh6cnqvfo22giv` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | — |
| 07:15-08:15 | 🇺🇸 USMLE — Repaso Espaciado Multi-Temporal (Anki FSRS D-1/D-3/D-7 + 2Q tema de ayer) | `54lchqggik96dmljmmg3l88s54` | L-V | 11 |
| 08:15-09:00 | 🇺🇸 USMLE — PRE-TEST tema del día (10Q uWorld ciegas + Free Recall) | `3tbecd5n03ut6lno3hjvc1sr7k` | L-V | — |
| 09:00-11:00 | 🇺🇸 USMLE — NÚCLEO DEEP PRIME (B&B/Pathoma/Sketchy + First Aid + tarjetas de mecanismo) | `cb2uh20jnvu7pgfev4183pgctc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | 2 |
| 11:00-12:00 | 🇺🇸 USMLE — 30 Preguntas Consolidación (uWorld tutor · temas vistos + APEX) | `2eqmmrnh00jr44plevurgcu2as` | L-V | 5 |
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
| 18:00-18:45 | 🇺🇸 USMLE — Evaluación Diaria Acumulativa (Modo Examen timed + Corrección) | `utk2laeob9u0847bbe9rm491v4` | L-V | 11 |
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
D# verificado contra L-V con feriados 25-dic/31-dic/1-ene (D1 = 7-sep). Todos los overlays conservan su texto v5.6 original y desde el 05-sep llevan **anexado el protocolo de test-day de Palmerton** (§F de `DATA/USMLE/PALMERTON_POR_MATERIA.md`): Ziploc BREAK 1/2/3 preparadas la noche anterior (proteína magra + grasas, **sin carbohidratos simples**), cronograma de descansos (sit-in 1-2' / activo 10' / almuerzo dentro del sim), sin cambiar respuestas por ruido, SYNAPSE de ese día a la tarde, registro de agua/sueño en VITALS como ensayo, y el mapa del día real de 7 bloques.

| # | Fecha (vie) | Hora | Título literal | ID | D# | Mínimo on-track (texto del overlay) |
|---|---|---|---|---|---|---|
| 1 | 11-sep-2026 | 09:00-13:00 | 🎯 UWSA1 — BASELINE Step 1 (160Q · 4 bloques) | `o1gla7846uae4tgngvc4q45osg` | D5 | línea base |
| 2 | 02-oct-2026 | 07:15-11:00 | 🎯 NBME 25 (200Q) + revisión | `4hjv5lkvluj06ahc2qndtsi6as` | D20 | ≥51 % |
| 3 | 23-oct-2026 | 07:15-11:00 | 🎯 NBME 26 (200Q) + revisión | `lr7ktrbiffj4hrlke7lh7cv6h4` | D35 | ≥55 % |
| 4 | 13-nov-2026 | 07:15-11:00 | 🎯 NBME 27 (200Q) + revisión | `sm4baa2v453ifaub325h9v08mg` | D50 | ≥58 % |
| 5 | 04-dic-2026 | 07:15-11:00 | 🎯 NBME 28 (200Q) + revisión | `ecu784689p8osrhqabuct8d5jg` | D65 | ≥61 % |
| 6 | 18-dic-2026 | 07:15-11:00 | 🎯 NBME 29 (200Q) + revisión | `ae93qv0nqqs36h439hid1jcq8o` | D75 | ≥63 % |
| 7 | 30-dic-2026 (mié) | 07:15-11:00 | 🎯 NBME 30 — CIERRE FASE A (200Q) + plan Fase B | `mael3p9uhp036jbep45ql6v9oc` | D82 | ≥65 % |
| 8 | 08-ene-2027 | 09:00-13:00 | 🎯 UWSA2 — predictor gold-standard (160Q) | `2u7viv0elr6aedo0m9undfa5kg` | D87 | low-risk |
| 9 | 15-ene-2027 | 07:15-11:00 | 🎯 NBME 31 (200Q) — GO/NO-GO fecha de examen | `l771lvcfv0jcebt61do6svia18` | D92 | **GO = 2 NBME ≥68 % + UWSA2 low-risk** |
| 10 | 18-ene-2027 (lun) | 07:15-11:00 | 🎯 NBME 32 (200Q) + repaso FA 1-5 | `h65e772pqsa4hgc5b6bh9n8h50` | D93 | sprint |
| 11 | 20-ene-2027 (mié) | 07:15-11:00 | 🎯 NBME 33 (200Q) + repaso FA 11-14 | `la5rsbuiqj1o35lb5adf93abuo` | D95 | sprint |
| 12 | 22-ene-2027 | 07:15-11:00 | 🎯 FREE 120 oficial + logística del examen | `lh9jfjsmoif74ci6jcn8f1mq30` | D97 | último día del plan |

**Colisiones de un día de hito (aceptadas, no se mueven franjas):**
- UWSA (09:00-13:00 + ~30' de descansos reales → ~13:30): pisa deep prime 09:00, 30Q 11:00, ALMUERZO 12:00 y SYNAPSE 12:30 → el almuerzo se come dentro del sim (Ziploc BREAK 2), SYNAPSE pasa a la tarde, la revisión completa va en las franjas USMLE de la tarde + 18:00.
- NBME (07:15-11:00 orientativo; 4 bloques × 50Q, el reloj lo pone la interfaz NBME): pisa repaso 07:15, pre-test 08:15, deep prime 09:00 y (si se alarga) 30Q 11:00 → almuerzo 12:00 normal; si el sim pasa de las 12:00, almuerzo dentro del sim entre B3 y B4.
- El resto del día (Research/Derma, AURUM, MIR, ENCAPS, LIVIANO, GYM/BAILE) **no cambia**.

## 6 · Descripciones literales de los bloques L-V (estado 05-sep-2026)
Texto tal como está en el Calendar tras la actualización del 05-sep (solo se tocó el campo `description`; nunca horas, títulos ni recurrencias). Los bloques marcados **[05-sep]** recibieron el protocolo de comida/hidratación.

### 04:00-04:15 · DECLARACIONES EKER - REPROGRAMA TU BLUEPRINT
Di estas frases EN VOZ ALTA antes de arrancar el dia:

1. IDENTIDAD — 'Soy un constructor de sistemas que genera riqueza. No necesito fracasar - necesito datos.'
2. ACCION — 'Cada vez que lanzo, mido y ajusto, me acerco mas rapido al exito que cualquier fracaso me ensenaria.'
3. OFENSIVA — 'Juego para ganar, no para no perder. Mi primer paciente llega porque construyo, no porque espero.'
4. SISTEMA — 'Mi exito no depende de sufrir primero. Depende de ejecutar mejor y mas rapido que ayer.'
5. CIERRE DE CREENCIA — 'El fracaso es informacion cara. Yo obtengo la misma informacion lanzando rapido y midiendo gratis.'

Eker: No puedes cambiar lo que no ves. Una vez que lo ves, no puedes dejarlo sin cambiar.
*(Observación: las 5 frases son identidad de negocio; durante las 20 semanas del Step 1 falta una frase de identidad de examen — decisión personal de Joseph, no se tocó.)*

### 04:15-05:00 · 🧠 IA — VIBECODING con Claude Code (construir, no programar desde cero)
🧠 CURSO DE IA reactivado en modo BUILDER — NO programación desde cero: VIBECODING con Claude Code como herramienta principal.
• Cada semana = 1 PROYECTO REAL terminado que sirva a tus sistemas: automatizaciones de YoCPMD, generadores de preguntas, bots del CRM Pulso, contenido IA para las marcas, skills/MCP/subagentes/workflows.
• Ciclo diario: 5' definir el objetivo del día → 35' construir con Claude Code → 5' commit + nota de lo aprendido (repo synapse-journal).
• Rotación semanal sugerida: S1 automatización YoCPMD · S2 pipeline de preguntas ENCAPS · S3 bot Pulso/LIVIANO · S4 contenido IA marcas — y repite subiendo nivel.
• La misión SYNAPSE de las 12:30 (30') sigue siendo la teoría estructurada; los bloques PC de sáb/dom 15:00 = terminar/pulir (SHIP).
Doc: DATA/SYNAPSE/CURSO_IA_04H_31AGO.md · plan del día: app → SYNAPSE
⚠ DORMIR 21:00→04:00 sagrado · EKER 04:00-04:15 intacto

### 05:00-05:45 · 🇺🇸 USMLE — ANKI AM (madrugada fresca · FSRS) + Stress Set en Fases B-C
🇺🇸 SESIÓN ANKI DE MADRUGADA — Palmerton: "repasa Anki a primera hora con la mente fresca y duplicas las tarjetas en menos tiempo". Este es el bloque que absorbe la carga FSRS cuando el mazo crezca (para noviembre serán 2.000+ tarjetas).
• FASE A (sep-nov): 45' Anki FSRS deck USMLE (pasada principal del día) — el bloque de 07:15 queda para el repaso anclado D-1/D-3/D-7 + free recall.
• FASES B-C (dic-ene): 05:00-05:12 🔥 STRESS SET (10Q uWorld random en 12 min — confiar en el instinto, sin rumiar) + 05:12-05:45 Anki.
Con este bloque el Step 1 pasa de 5h30 a 6h15/día (97 días desde lun 7-sep ≈ 606h totales) — colchón real para base cero.
Todo en inglés. AGAIN/GOOD honesto. Config FSRS: retención 0.90, máx 50 nuevas/día, SOLO Good/Again.
*(Nota: el plan v5.6 dice ≤10 tarjetas de mecanismo/día creadas; el "máx 50 nuevas/día" es el tope de Anki, no el objetivo de creación.)*

### 05:45-06:45 · PREPARAR PARA CORRER · CORRER (sáb/dom solo caminata) · CALISTEMIA
Sin descripción.

### 06:45-07:00 · DUCHA
MIERCOLES VIERNES Y DOMINGO SAHAMPOO Y SERUM LUNES EN LA MAÑANA
ANTES DEL GYM O BAILE SOLO BAÑO CON AGUA Y POLVO

### 07:00-07:15 · DESAYUNO **[05-sep]**
🍳 DESAYUNO — primera comida del día (llegas tras 3h de cognición + carrera/calistenia en ayunas).
• ≥30 g de PROTEÍNA (p. ej. 3 huevos + 1 yogur, o batido whey 1 scoop + leche) — no negociable
• 500 ml de AGUA (o 250 ml agua + café) — primer medio litro del día antes de sentarte a las 07:15
• Carbohidrato COMPLEJO (avena / pan integral / fruta entera). NO azúcar simple, NO jugo envasado
• 15 min: no es deep work, es combustible. Sin banco de preguntas en la mesa
📲 VITALS (20 s, quick-log): registrar SUEÑO de anoche (h reales) + esta primera AGUA.
Pisos VITALS: proteína 1,6 g/kg/día · agua 3.000 ml/día · sueño 7 h — este desayuno es la 1.ª de 4 tomas de proteína (07:00 · 12:00 · 15:15 · 17:15).
Ventanas de hidratación del día: 07:00 desayuno · 09:00 deep prime · 12:00 almuerzo · 15:15 MIR · 17:15 cena ligera · post-baile solo agua/electrolitos.
*(Sáb/dom, serie `2u9je70pif58hgf2f8t3vgu8b8`: misma regla + "aquí no hay bloque a las 07:15" + regla del Anki dimensionado por due.)*

### 07:15-08:15 · 🇺🇸 USMLE — Repaso Espaciado Multi-Temporal (Anki FSRS D-1/D-3/D-7 + 2Q tema de ayer)
🍅 REPASO MULTI-TEMPORAL USMLE — los 3 picos de la curva del olvido en una sola sesión (todo en inglés).
• 07:15-07:50 Anki deck USMLE (FSRS) — tarjetas de MECANISMO, AGAIN/GOOD honesto
• 07:50-08:05 Repaso anclado tema de AYER: free recall 90s + 2Q uWorld — <60% → re-encolar
• 08:05-08:15 Barrido D-3/D-7 (notas Obsidian del plan)
Plan del día: https://joseph-md-app.vercel.app → Study → EEUU → Cola de hoy
Doc maestro: DATA/USMLE/README.md · Método: DATA/USMLE/PALMERTON_POR_MATERIA.md

### 08:15-09:00 · 🇺🇸 USMLE — PRE-TEST tema del día (10Q uWorld ciegas + Free Recall)
🎯 PRE-TEST CIEGO (Palmerton: preguntas ANTES que contenido — fallar a propósito para mapear los huecos).
• 10Q uWorld del sistema/subtema del día en modo TUTOR, sin haber estudiado
• Free recall 90s: escribe todo lo que sabes del tema en papel
• Anota los huecos → son el objetivo del DEEP PRIME de 09:00
Qbankly → uWorld Step 1 → test personalizado del subtema del día (ver app)

### 09:00-11:00 · 🇺🇸 USMLE — NÚCLEO DEEP PRIME **[05-sep]**
🔴 BLOQUE SAGRADO — 2h DEEP WORK PRIME · MOTOR PRINCIPAL DEL STEP 1 (todo en inglés).
• 09:00-10:00 Vídeo del día: B&B (physio/anat) · Pathoma (path) · Sketchy (micro/pharm) — velocidad 1.5x, pausar y explicar en voz alta
• 10:00-10:45 First Aid ACTIVE READING del tema + resolver los huecos del pre-test
• 10:45-11:00 Crear ≤10 tarjetas Anki de MECANISMO (patogenia→presentación, formato Palmerton) + APEX
Los viernes de hito este bloque = UWSA/NBME (ver overlay 🎯 naranja).
Jerarquía de material: Path→Pathoma · Micro/Pharm→Sketchy · Physio/Biochem/Anat→AMBOSS+B&B · Behav/Biostats→First Aid
💧 AL ABRIR (09:00): 500 ml de AGUA + 1 SNACK (fruta entera / puñado de frutos secos / yogur) puestos en la mesa ANTES de darle play. No te levantas hasta las 10:00. Van 2h de cognición desde el desayuno: hidratación y glucosa estable = atención sostenida (sin azúcar simple: pico y bajón a las 10:30).
• Micro-pausa 10:00-10:05: de pie, agua, sin pantalla (modo difuso Oakley) → 10:05 First Aid.
• Teléfono en otro cuarto. 0 notificaciones. Estas son las 2h más valiosas del día.

### 11:00-12:00 · 🇺🇸 USMLE — 30 Preguntas Consolidación (uWorld tutor · temas vistos + APEX)
🎯 30 PREGUNTAS DE CONSOLIDACIÓN — uWorld modo tutor, SOLO temas ya vistos (día + acumulado).
• Pregunta-por-pregunta: leer explicación completa de correctas E incorrectas
• Log de cada fallo: ¿gap de conocimiento / lectura / razonamiento? (Palmerton: ~50% de fallos NO son de conocimiento)
• Cada error → tarjeta Anki de mecanismo (generación APEX desde gaps)
Ritmo objetivo: ~40Q/día total → banco uWorld completo (3659Q) en la Fase A

### 12:00-12:30 · ALUMUERZO **[05-sep]**
🍽 ALMUERZO — COMIDA PRINCIPAL del día. VITALS la dimensiona (kcal y gramos de proteína del día según tu objetivo; la app reparte la proteína en 4 tomas: 07:00 · 12:00 · 15:15 · 17:15).
• Plato: proteína (pollo/pescado/huevo/legumbre) + verduras + carbohidrato complejo (arroz integral, papa, quinua). Es la comida más grande del día porque la cena es ligera (17:15) y después del baile solo agua.
• 500 ml de AGUA con la comida (vas por ~1,5 L a esta hora si cumpliste 07:00 + 09:00).
• SIN banco de preguntas ni pantalla del Step 1: es la pausa difusa (Oakley) entre las 30Q de las 11:00 y SYNAPSE 12:30. Comer sentado, 20-30 min.
• Nada de azúcar simple / postre / gaseosa: evita el bajón de las 13:30-15:00.
🎯 VIERNES DE HITO: los UWSA (09:00-13:00) pisan este almuerzo → se come DENTRO del sim como 'Break 2' (bolsa Ziploc preparada la noche anterior, ver overlay naranja); la comida principal pasa a ~13:30. En los NBME (07:15-11:00) el almuerzo queda igual a las 12:00.
📲 VITALS: marcar la comida principal (quick-log).

### 12:30-13:00 · 🧠 SYNAPSE — misión del día (30')
Misión exacta del día: https://joseph-md-app.vercel.app → 🧠 SYNAPSE → pestaña ⚡ Hoy `<br>` A · 15' lección (pantalla) + B · 10' audio + C · 5' lectura móvil. `<br>` Marca ✓ al terminar — el progreso es real (empieza en 0%).
*(Así está en el Calendar: los `<br>` quedaron escapados como texto. Pendiente de limpieza cosmética, no se tocó.)*

### 13:00-13:15 · LECTURA DE LIBRO
Sin descripción (Biblioteca del Fundador: app → Home).

### 13:30-14:15 · 🔬 RESEARCH ↔ 💎 DERMA (alterna diario · ver app YoCPMD)
ALTERNANCIA DIARIA (desde mié 10 jun 2026, solo días de estudio L–V): un día RESEARCH (investigación → camino a Mayo Clinic), al día siguiente DERMA (dermatología → ser referente clínico). Alterna en cada día hábil. *(El mapa de fechas de junio que sigue en la descripción es histórico; la alternancia vigente la calcula la app desde D1 = 7-sep.)* Protocolo estructurado (por fechas, vueltas, links) en la app YoCPMD: RESEARCH vive en la sección Research · DERMA vive en la sección Derma. (45 min · 1 entregable atómico/día · APEX + Obsidian)

### 14:15-15:15 · 🪙 AURUM — Closer de ventas (30-60' · 14:15-15:15 · L-V)
🪙 AURUM — formación de closer de ventas de élite · L-V · núcleo 30-60 min dentro de 14:15-15:15 · plan de 6 meses (26 semanas · 130 lecciones · 7 fases). SOLO referentes REALES + ciencia rigurosa: Alex Hormozi, Grant Cardone, Chris Voss, Robert Cialdini, Neil Rackham (SPIN), Joe Girard, Brian Tracy, Jeb Blount, Aaron Ross, Tom Hopkins, Frank Bettger + Josué Peña (solo su contenido gratis de YouTube) · 11 libros ancla con audiolibros gratis. Cada día: VER 1 video + PRACTICAR el pitch (drill aplicado a tus leads reales ALLPA / Qori Golden). La LECTURA / audiolibro va en tus huecos de viaje, no en esta hora.
👉 Misión del día: app → Business → Pulso → AURUM → ⚡ Hoy · 🗂️ Notas: Obsidian 07_VENTAS_AURUM

### 15:15-15:30 · 🇪🇸 MIR — Evaluación Anclada D-1 (4Q + Anki SRS + Corrección) **[05-sep]**
🎯 EVALUACIÓN ANCLADA TEMA D-1 (15 min) — testing effect + retrieval anchor del tema visto AYER en MIR.
💧 AL ABRIR (15:15): 500 ml de AGUA + SNACK PROTEICO (yogur / queso fresco / puñado de frutos secos) en la mesa antes de la primera pregunta. Es la 3.ª toma de proteína y la 4.ª ventana de agua del día (07:00 · 09:00 · 12:00 · 15:15). El bajón de las 15:00 es glucosa + deshidratación, no falta de disciplina — se corrige aquí, no con café.
📋 15:15–15:22 4 PREGUNTAS ProMIR/AMIR del tema D-1 (modo examen, ~90-100 s/Q, sin compendio) · 15:22–15:27 ANKI deck "MIR" (solo programadas hoy; AGAIN/GOOD) · 15:27–15:30 MINI-CORRECCIÓN + nota Obsidian "MIR errores" (conceptual / terminológico / aplicación).
🎯 UMBRALES (4Q): 4/4 → mañana tema NUEVO · 3/4 → zona gris, repaso fin de semana · <3/4 → tema "caliente": MAÑANA se repite.
📊 Registrar en Obsidian 06_MIR/Evaluaciones: fecha · tema D-1 · aciertos/4 · tipo de error · decisión.
Meta a marzo 2028: 800-1000 cards Anki MIR sólidas. Examen MIR enero 2030 → Top 50 → Dermatología Hospital Clínic Barcelona.
Régimen v5.6 (MIR = frente secundario mientras el Step 1 es primario hasta el 27-ene-2027).

### 15:30-16:15 · 🇪🇸 MIR — Deep Work Mini (Pre-test + Lectura + Free Recall + APEX max 4)
🔬 DEEP WORK MINI MIR (45 min) — 1 SUBTEMA ATÓMICO POR DÍA (Ahrens).
🔵 15:30–15:35 PRE-TEST + GENERATION: 3 preguntas ciegas del subtema NUEVO (AMIR Test) + free recall 60 s + marcar 2-3 gaps.
🟢 15:35–16:00 LECTURA ACTIVA + ELABORACIÓN: compendio AMIR/ProMIR del subtema; 3-5 puntos clave MÁXIMO; conexiones con ENCAPS; dudas en margen (futuras CCSN); deep work sin notificaciones.
🟡 16:00–16:05 FREE RECALL LIBRO CERRADO: mapa mental + lista clave; <60 % → mañana repetir.
🔴 16:05–16:15 CREAR MÁXIMO 4 APEX MIR (Palmerton): FRENTE / REVERSO ≤2 líneas / CCSN / FISIOPATOLOGIA ≤3 líneas / RELACIONES / EXAMEN·ESPECIALIDAD·SUBTEMA. Mín 3, máx 4; ≥1 comparativa MIR vs ENCAPS; solo AGAIN/GOOD.
🎯 Identity stacking: "Soy dermatólogo del Clínic Barcelona — este es mi training."
📊 Obsidian 06_MIR/Subtemas: subtema · % free recall · # APEX · conexión MIR→ENCAPS · próximo subtema o repetir.
*(La descripción completa en el Calendar conserva la justificación científica y el "FUNDAMENTO: 95 días × 1 subtema/día × 4 cards" del plan de mayo — histórico.)*

### 16:15-17:15 · 🇵🇪 ENCAPS — 1h Banqueo Mantenimiento **[05-sep]**
🇵🇪 ENCAPS MANTENIMIENTO 2027-I (examen: fines de marzo 2027 · feb-mar vuelve a bloque principal).
• 16:15-16:30 Eval anclada: 5Q del tema de AYER (recall) + corrección
• 16:30-17:15 Banco del día: 20-25Q del tema en rotación semanal ponderada por el PRONÓSTICO v3 (II 30% · I 27% · V 21% · III 13% · IV 9%)
• VIERNES: mini-simulacro 25Q mixto cronometrado (72s/Q) + corrección
• 8 CRÍTICOS v3: I-3 · V-2 · II-3 · III-5 · I-4 · II-5 · II-4 · IV-1/2
• Registrar CADA fallo en TRACKING_ERRORES (la tutoría sale del patrón de fallos)
Docs: DATA/ENCAPS/PRONOSTICO_WALKFORWARD_2027-1_v3.md · ANALISIS_EXAMEN_2026-2_REAL.md
⚠ Meta: llegar a febrero con base sólida → nota ≥17 en ENCAPS 2027-I (percentil 1%)
🥤 CIERRE 17:10-17:15 — CENA LIGERA de 5 min en el cambio ENCAPS → LIVIANO: batido de proteína (whey + leche/agua) o fruta + puñado de frutos secos, + 300-400 ml de agua. Es la ÚLTIMA comida sólida del día (4.ª toma de proteína). Después del GYM/BAILE solo agua o electrolitos: nada pesado <2h antes de dormir a las 21:00 (Walker: la digestión activa fragmenta el sueño profundo y roba la consolidación de lo que estudiaste hoy).

### 17:15-18:00 · ⚖️ LIVIANO — Academia **[05-sep]**
⚖️ LIVIANO ACADEMIA — conocimiento académico para ser EL referente en baja de peso.
• 17:15-17:40 Estudio del módulo del día (fisiología del peso · GLP-1/tirzepatida · nutrición · ejercicio · conducta · farmacología/bariátrica)
• 17:40-18:00 APLICACIÓN: explícalo en palabras simples como si fuera un paciente real (voz alta / nota)
Currículo completo: DATA/BUSINESS/LIVIANO_ACADEMIA.md · App: Business → LIVIANO → Academia
Fuentes: ProMIR (endocrino/nutrición) + AMBOSS + guías (AACE/OMA) — doble uso MIR/USMLE
🥤 ARRANQUE 17:15: entras con la CENA LIGERA ya tomada en el cambio desde ENCAPS (17:10-17:15, 5 min: batido de proteína o fruta + frutos secos + 300-400 ml agua). No hay otra cena: tras la Eval 18:00 vienen viaje → GYM/BAILE → viaje → 21:00 dormir, y después del entreno solo agua/electrolitos. Si comes aquí sentado, que sea lo mismo (ligero, sin carbohidrato simple), no un plato.
Coherencia LIVIANO: la regla que le vas a explicar a un paciente (última comida sólida ≥3h antes de dormir, proteína repartida en 4 tomas) es la que tú cumples hoy.

### 18:00-18:45 · 🇺🇸 USMLE — Evaluación Diaria Acumulativa (Modo Examen timed + Corrección)
🔥 EVALUACIÓN DIARIA MODO EXAMEN — el sistema-trampa para detectar si lo de AYER se consolidó.
• 18:00-18:25 Bloque timed: 15Q uWorld MIXTAS de temas vistos (72s/Q, sin pausa, en inglés)
• 18:25-18:45 Corrección + log de errores + STRESS strategy (Palmerton) para los que dudaste entre 2
• Termómetro diario: % del bloque → registrar en la app (APEX)
Anchoring pre-sueño: lo último que ve el cerebro antes de GYM/BAILE/DORMIR es Step 1.

### 18:45-19:15 · ALISTARSE · VIAJE
Sin descripción (martes 18:30/18:45 — ver §1).

### 19:00-20:30 · GYM / BAILE **[05-sep]**
Ver §2 (descripción común post-entreno).

### 20:30-20:45 · 🚗 VIAJE VUELTA — Reflexión (15min)
30 min de regreso = evaluación del día en movimiento. · ¿Qué aprendí hoy? · ¿Qué falló? · ¿Qué hago distinto mañana? Sin pantallas. Solo audio (podcast) o reflexión. No Anki esta noche.

### 21:00-04:00 · 😴 DORMIR (7h exactas → 04:00)
😴 7h exactas — despertar 04:00. Walker (Why We Sleep) + Stickgold (Nature 2005): <7h sueño = pierde 30-40% consolidación memoria · REM consolida memoria procedural · NREM SWS consolida memoria declarativa. Reglas inviolables: 0 pantallas con luz azul después de 20:30 · oscuridad total, 18-20 °C · sin teléfono en la habitación · si no duermes 7h una noche, NO compensar con +1h al día siguiente.

### Sábado 15:00-17:00 · 🧠 SYNAPSE — PC sábado (2h)
Bloque de teclado SYNAPSE: setup, notebooks, repo público synapse-journal, Problem Sets de CS50P + ponerte al día con la semana. `<br>` Misión PC del sábado: https://joseph-md-app.vercel.app → 🧠 SYNAPSE → ⚡ Hoy
*(Texto de junio: CS50P/synapse-journal. Contradice el vibecoding 04:15 — vacío 2 de la sección SYNAPSE, se resuelve en `gen_synapse_plan.js`, no en el Calendar.)*

### Domingo 15:00-17:00 · 🧠 SYNAPSE — repaso + PC domingo (2h)
Repaso semanal (Feynman en voz alta) + terminar lo que quedó del bloque PC. `<br>` Serie arranca el 28-jun a propósito: los domingos 14 y 21-jun quedan LIBRES (otras actividades — pedido de Joseph, 10-jun). `<br>` https://joseph-md-app.vercel.app → 🧠 SYNAPSE → ⚡ Hoy

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
