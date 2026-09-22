# 📅 SEGMENTOS DEL CALENDAR — RÉGIMEN v5.15 (corrimiento RÍGIDO aplicado el 22-sep-2026)
> **📌 Nota v5.15 (mar 22-sep-2026).** Este documento **ya refleja el corrimiento a D1 = miércoles 23-sep-2026** (tampoco se estudiaron el lunes 21 ni el martes 22 de septiembre; es el **14.º corrimiento** desde el 31-ago: **17 días hábiles perdidos**, 31-ago → 22-sep). **REGLA NUEVA de este corrimiento: es RÍGIDO** — solo corren los días, ningún tema se toca ni se recorta, donde había un fin clavado se **amplían días**, y **los 12 hitos NBME/UWSA corren con el plan conservando su D# exacto** (hasta v5.14 estaban anclados por fecha y cada corrimiento les comía días de contenido por delante). El nombre del fichero conserva `V5_6` **solo por los enlaces existentes**: lo citan como autoridad varias descripciones de series del Calendar y otros docs del repo, y renombrarlo los rompería. El contenido es v5.15 en sus secciones vivas (§0, §0.1, §5, §5.1, §17); §6 conserva los textos literales que el agente Calendar escribió en v5.14 y §7-§16 son registros históricos con sus cifras de entonces. ⚠ **La aplicación en el Calendar vivo (mover los 12 overlays USMLE + el del examen + los 2 de taper, re-fechar los 12 🔬 y re-etiquetar las series) es trabajo del agente Calendar de v5.15: ver §17.**
> ⚠ **La regla permanente de Joseph: NO se fusiona ni se recorta contenido — ni un tema ni un subtema se deja atrás.** El desfase se absorbe **alargando el final del plan**, nunca comprimiendo días. **CONSECUENCIA de v5.15: D90 = vie 29-ene-2027 · D91 = lun 1-feb · D92 = mar 2-feb · D93 = mié 3-feb · D94 = jue 4-feb = ÚLTIMA SESIÓN DE BANCO (D-2) · D95 = vie 5-feb-2027 = D-1 DENTRO del plan (sesión mínima AM ≤2 h + ritual de test-day) · sáb 6 y dom 7-feb LIBRES (solo Anki vencido) → EXAMEN TARGET LUN 8-FEB-2027** (`DAILY_META.examenTarget = '2027-02-08'`, `descansoD1 = '2027-02-05'`, leídos con `node`/`grep` el 22-sep). **Joseph debe agendar/reprogramar el Prometric y confirmar que su eligibility period cubre el 8-feb** (si no: extenderlo, o decidir recortar temario — decisión suya, registrada en `DATA/PENDIENTES_JOSEPH.md`). **Desde aquí cada día no estudiado mueve el examen un día hábil más (o exige recortar).** Los 2 "días dobles" de Bioquímica se conservan tal cual: **D80 vie 15-ene y D81 lun 18-ene = cierre de la Fase A**; el NBME 31 (**mar 19-ene = D82**) cae **el día siguiente al cierre de contenido**, sin banco de consolidación delante (decisión de Joseph: aceptarlo o mover el GO/NO-GO al NBME 32).
> ⚡ **En v5.15 se mueven LOS DOCE hitos, no solo el UWSA1.** Al dejar de estar anclados por fecha, los 12 overlays USMLE corren con el plan y conservan su D#: el UWSA1 pasa del lun 21 al **mié 23-sep 09:00-13:00** (evento suelto `o1gla7846uae4tgngvc4q45osg`, sigue siendo el D1) y los otros once se corren **+2 días hábiles**, con lo que **dejan de caer en viernes: nueve de los doce pasan a martes** (tabla completa en §5 y §17). **El overlay del EXAMEN `oinh139dsnbuma9r3kfu56dhkc` pasa del jue 4-feb al lun 8-feb-2027 07:00-16:00**; los overlays de taper 🏁 D94 `neboplchsaua4snj39nrl480nc` y 🛌 D95 `n90bdqhohadu1eqbctv148dn28` pasan al **jue 4-feb** y al **vie 5-feb**. El contenido (Fundamentos · Pathoma 1-2) arranca el **jue 24-sep = D2**. ⚠ Todos estos `update_event` los ejecuta el agente Calendar de v5.15 (§17): este documento fija el objetivo, no certifica el estado del Calendar en vivo.
> Fuente: Google Calendar `josephsototocas@gmail.com` · zona `America/Lima` · estructura L-V/sáb/dom extraída el 05-sep (166 eventos), reverificada en vivo el 08-sep, reescrita el 09-sep (28 descripciones), el 10-sep (24), el 12-sep (28 + UWSA1 movido), el 14-sep (40), el 15-sep (35 + 1 `create_event`), el 16-sep (47 + 2 movidos) y el 19-sep (v5.14: 13 overlays USMLE + 2 overlays nuevos D94/D95 + 12 🔬 + 38 series + 6 series de extensión + 1 serie nueva). **Pasada v5.15 (22-sep): esta actualización es DOCUMENTAL — no se hizo `list_events`, `get_event` ni `update_event` sobre el Calendar vivo.** Lo que hay que aplicar allí está listado en §17; las fechas y D# de este documento salen de los `.ts` regenerados (`node`) y del SQL sembrado el 22-sep, no del Calendar.
> **Autoridad de CUÁNDO y CÓMO** se ejecuta cada segmento (L-V + sábado/domingo). El **QUÉ** (tema/misión del día) lo mandan la app YoCPMD y sus planes: `src/lib/usmleStep1Daily.ts` (**95 días**, D1 = 2026-09-23 → D95 = 2027-02-05; examen target 2027-02-08), Supabase `study_schedule` (ENCAPS **92 días**, `encapsPlan.ts`), `mirDailyPlan.ts` + `mirMantenimiento.ts`, `researchDailyPlan.ts`/`researchDailyPlan2027.ts`/`dermaDailyPlan.ts`/`dermaCiclo2.ts`, `aurumDailyPlan.ts`, `livianoStudyPlan.ts`, `synapseDailyPlan.ts`, `vibecodingPlan.ts`. Los overlays 🔬 RESEARCH los gobierna `DATA/_scripts/gen_research_calendar.js` (estado en `DATA/RESEARCH/_calendar_overlays.json`, `actualizado: 2026-09-22`, los 12 con `accionPendiente: recrear`).
> Sustituye a [`CALENDAR_SEGMENTOS_LUNES_VIERNES.md`](./CALENDAR_SEGMENTOS_LUNES_VIERNES.md) (24-jul, loop ENCAPS — HISTÓRICO). Doc maestro del régimen: `DATA/REESTRUCTURACION_31AGO_2026.md`.

## 0 · Reglas del régimen v5.15 (las que el Calendar materializa)
| Regla | Valor |
|---|---|
| **D1** | **miércoles 23-sep-2026** (31-ago→22-sep no estudiados = **17 hábiles perdidos, 14 corrimientos acumulados**. v5.14 tenía D1 = lun 21-sep: ni el 21 ni el 22 de septiembre se estudiaron y el plan corrió +2 días hábiles, **sin recortar nada**) |
| **D1 = hito** | El D1 **es el UWSA1** (baseline, 09:00-13:00), **movido del lun 21 al mié 23-sep**. El contenido arranca el **jue 24-sep = D2** (Pathoma 1-2). ⚡ **Cambio de doctrina en v5.15: los otros 11 hitos YA NO están anclados por fecha** — corren con el plan, conservan su D# exacto y por eso ninguno pierde días de contenido por delante (§5, §17) |
| **Fases USMLE** | **A · contenido D1-D81** (23-sep→**lun 18-ene**; el cierre de Bioquímica = D81) · **B · D82-D86** (mar 19-ene→lun 25-ene, **5 días**: NBME 31 (D82 mar 19) · NBME 32 (D83 mié 20) · random timed (D84 jue 21) · NBME 33 (D85 vie 22) · random timed (D86 lun 25)) · **C · sprint D87-D95** (mar 26-ene→**vie 5-feb**). **El UWSA2 (mar 12-ene = D77) cae DENTRO de la Fase A**; los 2 días dobles de Bioquímica son **D80 vie 15-ene y D81 lun 18-ene** |
| Días de plan | L-V; feriados fuera del plan: 25-dic, 31-dic, 1-ene. **Verificado con `node` el 22-sep: 95 entradas de `DIAS`, D1 = 2026-09-23 (mié) → D95 = 2027-02-05 (vie), D# 1-95 consecutivos, 0 sáb/dom/feriados.** **S1 = 23-25 sep (3 días, mié-vie)** · S14 = 21-24 dic (4) · S15 = 28-30 dic (3) · S19 = 25-29 ene (5) · **S20 = 1-5 feb (5 días: D91-D95)** = **20 semanas** |
| **Bloque principal** | **USMLE Step 1** — 6h15/día: 05:00 Anki AM · 07:15 repaso anclado · 08:15 pre-test 10Q · 09:00 deep prime · 11:00 30Q · 18:00 eval |
| Examen Step 1 | **TARGET LUN 8-FEB-2027 (v5.15) — muy fuera de la ventana original 25-29 ene, que el plan rebasa (D94 = jue 4-feb última sesión de banco · D95 = vie 5-feb = D-1 dentro del plan)** · sáb 6 y dom 7-feb libres (solo Anki vencido) entre el D95 y el examen · overlay 🎯 `oinh139dsnbuma9r3kfu56dhkc` **debe moverse al lun 8-feb 07:00-16:00** (FREE, no es la cita real) · **GO/NO-GO mar 19-ene** (NBME 31 = **D82**, el día siguiente al cierre de contenido): 2 NBME consecutivos ≥68 % + UWSA2 low-risk |
| Secundarios (v5.15, leídos de los `.ts` con `node` el 22-sep) | MIR 15:15-16:15 (**78 días**, mié 23-sep → **mié 13-ene-2027** = 76 temas + D77 mini-MIR + D78 corrección; luego mantenimiento **57 días jue 14-ene→vie 2-abr-2027** — el fin se **amplió** del 31-mar al 2-abr en vez de perder slots; 12 slots Tier C, el 1.º el jue 14-ene; **modo reducido hasta el lun 8-feb**, 18 días reducidos; **el lun 8-feb (examen) es el D18 del mantenimiento → decisión de Joseph: reducirlo/vaciarlo** · `MIR_MANT_META`: inicio 2027-01-14, fin 2027-04-02, 57 días) · ENCAPS 16:15-17:15 (mantenimiento **92 días**, mié 23-sep → **mar 2-feb-2027** = 75 de banqueo + 17 mini-sims de viernes, la primera el vie 25-sep = día 3; **pre-test de arranque 40Q ciego: mié 23-sep parte 1 + jue 24-sep parte 2**; Supabase `study_schedule`, régimen `MANTENIMIENTO_2027-1 v6.13`, backup `study_schedule_bk_0922`; **0 sesiones perdidas** en este corrimiento; examen fin-mar 2027, meta ≥17/20; **⚠ la fase intensiva arranca DESPUÉS del examen Step 1 → propuesta mar 9-feb (día 97) o lun 15-feb (día 101), `gen_encaps_intensivo_2027.js`, decisión de Joseph**; ⚠ reponer stock de bancos = contenido, no estructura) · LIVIANO 17:15-18:00 (**90 días**, mié 23-sep → **vie 29-ene-2027**; casos en viernes 16/16: caso 1 vie 2-oct (d8) … caso 16 **vie 29-ene (d90)**; capstone d88 mié 27-ene y revisión trimestral II d89 jue 28-ene → **⚠ el caso 16 queda DESPUÉS del capstone, al revés que en v5.14: A VERIFICAR con Joseph**; revisión trimestral I d45 mar 24-nov) · Research↔Derma 13:30-14:15 (alternos: **Research ciclo 1 = 42 átomos jue 24-sep → vie 19-feb-2027** (CR-9 SUBMIT = d35 **lun 1-feb** = D91 del Step 1, ya no es víspera de nada) **+ ciclo 2 = 67 átomos mar 23-feb → jue 26-ago-2027** · **Derma 73 sesiones mié 23-sep → jue 15-abr-2027** (d42 mar 19-ene = NBME 31, sesión normal · d43 jue 21-ene = Mohs, sesión normal · taper d44-d49 **lun 25-ene → lun 8-feb; d49 lun 8-feb = DÍA DEL EXAMEN (sesión opcional)**; d48 jue 4-feb = D94; swap d43↔taper = decisión de Joseph; d50 mié 10-feb; ciclo 2 d74-d103 lun 19-abr → jue 8-jul-2027)) · AURUM 14:15-15:15 (**130 días**, mié 23-sep → **vie 26-mar-2027**; pitches v1 D15 mar 13-oct · v2 D35 mar 10-nov · v3 D55 mar 8-dic · v4 D75 vie 8-ene · **v5 D95 vie 5-feb = D-1 del Step 1** (decisión de Joseph) · v6 D115 vie 5-mar · v7 D130 vie 26-mar) · SYNAPSE 12:30 (30') (**132 días · 19 semanas**, mié 23-sep → **lun 1-feb-2027**; del mar 2 al vie 5-feb (D92-D95) sin SYNAPSE) + vibecoding 04:15 (**60 días de proyectos** en bloques de 5 hábiles, mié 23-sep → **mar 15-dic-2026**, 12 proyectos, **S1-S12 ya NO coinciden con las semanas de calendario** (S1 = mié 23 → mar 29-sep, SHIP sáb 3-oct; los 12 SHIP caen los sábados 3-oct … 19-dic); **taper S13-S20 mié 16-dic → vie 5-feb**, 95 días = mismo D# que el Step 1) · Business **121** filas (mié 23-sep → jue 21-ene-2027; sin serie propia en el Calendar) |
| Fin de semana | **SÁBADO Y DOMINGO LIBRES de banco de preguntas**. ⚡ **v5.15: los hitos ya NO van en viernes** (corren con el plan: nueve de los doce caen en martes), así que la regla del fin de semana es la única invariante de la semana. No es "libre" literal: despertar 04:00 (EKER), caminata, **📋 REVISIÓN SEMANAL sáb 07:15-07:35 (`21fbiohc1i47r4lqmaa3eb76l4`; default sábado — sáb/dom es decisión de Joseph)**, SYNAPSE PC 15:00-17:00 ambos días, video empresa sáb 17:00, Anki sáb 19:00 / dom 17:00, baile. **Excepción v5.15: sáb 6 y dom 7-feb-2027 = libres entre el D95 (vie 5-feb) y el examen (lun 8-feb)** |
| Corrimiento | cada día hábil sin estudiar = +1: `node DATA/_scripts/remap_inicio.js <fecha>` + `gen_encaps_mantenimiento_2027.js` + `gen_synapse_plan.js` + `gen_aurum_plan.js` + regenerar USMLE. ⚡ **Desde v5.15 los overlays de hito USMLE SÍ se mueven**: corren con el plan igual que el contenido y conservan su D#, así que en cada corrimiento hay que hacer `update_event` de `start`/`end` **y** de la `description` de los 12 (antes solo cambiaba el D#). El 13.º overlay (el del EXAMEN) y los 2 de taper (🏁 D94 · 🛌 D95) también se mueven. Ver §5 y §17 |
| Sueño | 21:00 → 04:00 (7h) todos los días. Ley cero de `RUTINA_EXTREMA_MILITARIZADA.md` |
| **Cafeína / siesta (12-sep)** | **Cafeína ≤ 11:00 — máximo 2 tomas: 05:00 (Anki AM) y 07:00 (desayuno); después agua o descafeinado** (vida media ~5-6 h: un café de mediodía sigue activo a las 21:00 y recorta el sueño profundo). Escrito en DESAYUNO `7agi60f2bp8qnh6cnqvfo22giv` y DEEP PRIME `cb2uh20jnvu7pgfev4183pgctc`. **Siesta OPCIONAL 13:15-13:30, ≤ 20' con alarma** = válvula ÁMBAR de `DATA/PROTOCOLO_MODO_MINIMO.md` §2 en el hueco que ya existía (descripción de LECTURA DE LIBRO `7jmf8p1l5b5q6jbtmj9uualiq8`; no se creó ningún evento). La carrera 06:00 al aire libre = señal de luz matinal (no pasar a indoor) |
| **Burnout §6 (12-sep)** | Las 5 señales de `DOCTRINA_SPRINT_FINAL_EVIDENCIA.md` §6 son disparadores ÁMBAR (1-4) / ROJO conductual (5: saltarse el gym) del protocolo de modo mínimo; viven como 5 casillas en la nota del día del vault (`01_USMLE/05_DIARY`, cierre 18:25-18:45) y se confirman en voz alta en 🚗 VIAJE VUELTA `3l59kpei7sg0l6kq51343or383` |
| Comida/hidratación (05-sep) | desayuno ≥30 g proteína + 500 ml · 500 ml + snack al abrir deep prime 09:00 y MIR 15:15 · almuerzo = comida principal (VITALS dimensiona) · **cena ligera 5' en el cambio ENCAPS→LIVIANO 17:15** · post-GYM/BAILE solo agua/electrolitos (nada pesado <2h antes de las 21:00). Pisos VITALS: proteína 1,6 g/kg · agua 3.000 ml · sueño 7h (`VITALS/web/src/lib/engine/domain.ts`) |

### 0.1 · Semana real de arranque v5.15 — mié 23 → vie 25 sep 2026 (S1 corta, 3 días)
La semana de arranque vuelve a ser **corta (3 días hábiles, mié-vie)** y el miércoles **es el UWSA1**. La estructura de los **13 bloques de estudio** del régimen L-V no cambió (última verificación en vivo con `list_events`: 15-sep sobre el mié 16; **A VERIFICAR (22-sep)**: recuento sobre el mié 23 — en esta pasada documental no se hizo `list_events`). Lo que hay que mover en el Calendar (UWSA1 → mié 23-sep, los otros 11 overlays +2 hábiles, el overlay del examen → lun 8-feb, los 2 de taper → jue 4 y vie 5-feb, los 12 🔬 re-fechados, las series re-etiquetadas y las extensiones D91-D95 re-fechadas) está en **§17**.

| Día | D# USMLE | Bloques de estudio (13/13 series) | Hito |
|---|---|---|---|
| ~~Lun 21 · Mar 22-sep~~ | — | **NO estudiados** — origen del corrimiento a v5.15 (el UWSA1 que estaba en el lun 21 se mueve al mié 23). Los 13 bloques siguen apareciendo en el Calendar (son series) pero el plan no cuenta esos días | — |
| **Mié 23-sep** | **D1** — Assessment · nivelUW 5 · 160Q · **el D1 es el UWSA1** · Derma **d1** en la franja 13:30 (lesiones elementales) · ENCAPS **pre-test de arranque parte 1** a las 16:15 · MIR D1 (Estudios experimentales: ensayo clínico) · AURUM D1 · LIVIANO D1 · vibecoding S1 d1 · SYNAPSE d1 · Business D1 | los 13 bloques — **el overlay 🎯 UWSA1 09:00-13:00 pisa deep prime, 30Q, almuerzo y SYNAPSE** (ver §5) | 🎯 **UWSA1 BASELINE** |
| Jue 24-sep | **D2** — Fundamentos · Pathoma 1-2 (lesión/muerte celular + inflamación) · nivelUW 1 · 30Q · Research **D1** en la franja 13:30 (infra académica) · ENCAPS **pre-test de arranque parte 2** · MIR D2 (clasificación de estudios) | los 13 bloques, sin overlay | — |
| Vie 25-sep | **D3** — Fundamentos · Pathoma 3 (neoplasia) + setup Anki FSRS · nivelUW 1 · Derma **d2** · ENCAPS **1.ª mini-sim 25Q** (= día 3 del mantenimiento) · MIR D3 (pruebas diagnósticas) · GYM 19:00 + BAILE 20:00 | los 13 bloques | — |
| Sáb 26-sep | — | libre de banco · **📋 REVISIÓN SEMANAL 07:15-07:35 (primera de la serie)** · 15:00-17:00 SYNAPSE PC — **todavía NO hay SHIP**: con D1 en miércoles el bloque S1 de vibecoding va del mié 23 al mar 29-sep y su **SHIP es el sáb 3-oct** | 📋 S1 |
| Dom 27-sep | — | libre de banco · SYNAPSE repaso + PC · Anki 17:00 · baile | — |
| Lun 28-sep | **D4** — Immunology · inmunidad innata/adaptativa + MHC + linfocitos T/B · Research **D2** (PICO) · MIR D4 (bioética) | los 13 bloques | — |
| Mar 29-sep | **D5** — Immunology (hipersensibilidades I-IV + autoinmunidad + inmunodeficiencias) · nivelUW 1 · Derma **d3** · MIR D5 (Cardiología básica) · vibecoding **último día de S1** (SHIP sáb 3-oct) | los 13 bloques | — |
| Mié 30-sep | **D6** — Cardiovascular (anatomía + fisiología cardíaca) · Research **D3** = hito **M1** (Dr. Ciro) → overlay 🔬 13:30-14:15 (§5.1) | los 13 bloques + overlay Research | 🔬 M1 |

⚠ **El D1 del plan es un hito y eso es lo correcto**: Palmerton pide la línea base *antes* de tocar contenido. Pathoma 1-2, que en v5.14 era el D2 del mar 22-sep, pasa a ser el **D2 del jue 24-sep**; **nada se perdió** — todo el temario se desplazó dos días hábiles y el plan se alargó por la cola, **ocupando el jue 4-feb (que era el target de examen de v5.14) como D94 y el vie 5-feb como D95 = D-1 dentro del plan, dejando libre el finde 6-7 feb y empujando el examen al lun 8-feb-2027**.

## 1 · LUNES-VIERNES — tabla maestra (estructura verificada en vivo el 15-sep sobre el mié 16-sep: 29 eventos, 13 bloques de estudio + overlay UWSA1; el mar 15 = 29 eventos sin overlay)
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
| 13:15-13:30 | *(hueco sin evento propio: **siesta OPCIONAL ≤ 20' = válvula ÁMBAR** del PROTOCOLO_MODO_MINIMO, anotada en la descripción de LECTURA DE LIBRO desde el 12-sep; en VERDE sigue siendo hueco)* | — | — | — |
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
| 07:15-07:35 | 📋 REVISIÓN SEMANAL (**nueva 19-sep**, `WEEKLY;UNTIL=20270207T045959Z;BYDAY=SA`, S1 = sáb 26-sep → S20 = sáb 6-feb; 10 métricas → `DATA/USMLE/REVISIONES/S<NN>_<sábado>.md`; default sábado, sáb/dom = decisión de Joseph; medida con `get_event` el 19-sep) | `21fbiohc1i47r4lqmaa3eb76l4` | — |
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
⚡ **CAMBIO DE DOCTRINA EN v5.15: LAS 12 FECHAS SE MUEVEN.** Hasta v5.14 los hitos estaban **anclados por fecha** y cada corrimiento les comía días de contenido por delante (solo cambiaba su D#). Desde el 22-sep **corren con el plan y conservan su D# exacto**, así que ningún NBME pierde preparación. **Efecto colateral: dejan de caer en viernes — nueve de los doce pasan a martes.** Las 12 fechas de abajo son las que el agente Calendar debe aplicar con `update_event` (`startTime`/`endTime` + `description`, `timeZone: America/Lima`); los ids no cambian. **Estado: PENDIENTE — esta pasada es documental** (§17).

| # | Fecha **v5.15** | Hora | Título literal | ID | **D# (idéntico a v5.14)** | Fecha en v5.14 | Mínimo on-track (texto del overlay) |
|---|---|---|---|---|---|---|---|
| 1 | **23-sep-2026 (mié)** ⚡ movido desde el lun 21-sep | 09:00-13:00 | 🎯 UWSA1 — BASELINE Step 1 (160Q · 4 bloques) | `o1gla7846uae4tgngvc4q45osg` | **D1** | lun 21-sep | línea base — **el DÍA 1 del plan** (Palmerton: baseline en el primer día) |
| 2 | **06-oct-2026 (mar)** ⚡ | 07:15-11:00 | 🎯 NBME 25 (200Q) + revisión | `4hjv5lkvluj06ahc2qndtsi6as` | **D10** | vie 2-oct | ≥51 % |
| 3 | **27-oct-2026 (mar)** ⚡ | 07:15-11:00 | 🎯 NBME 26 (200Q) + revisión | `lr7ktrbiffj4hrlke7lh7cv6h4` | **D25** | vie 23-oct | ≥54 % |
| 4 | **17-nov-2026 (mar)** ⚡ | 07:15-11:00 | 🎯 NBME 27 (200Q) + revisión | `sm4baa2v453ifaub325h9v08mg` | **D40** | vie 13-nov | ≥57 % (gate 1 ECFMG pide ≥55 %) |
| 5 | **08-dic-2026 (mar)** ⚡ | 07:15-11:00 | 🎯 NBME 28 (200Q) + revisión | `ecu784689p8osrhqabuct8d5jg` | **D55** | vie 4-dic | ≥61 % |
| 6 | **22-dic-2026 (mar)** ⚡ | 07:15-11:00 | 🎯 NBME 29 (200Q) + revisión | `ae93qv0nqqs36h439hid1jcq8o` | **D65** | vie 18-dic | ≥63 % · mié 23-dic = D66 · jue 24-dic = D67 (25-dic feriado) · lun 28-dic = D68 · mar 29 = D69 · mié 30-dic = D70 (31-dic y 1-ene feriados) |
| 7 | **05-ene-2027 (mar)** ⚡ | 07:15-11:00 | 🎯 NBME 30 — CIERRE FASE A (200Q) + plan Fase B | `mael3p9uhp036jbep45ql6v9oc` | **D72** | mié 30-dic | ≥65 % · último NBME de la Fase A (el título se conserva; la Fase A sigue hasta el **D81 lun 18-ene**) |
| 8 | **12-ene-2027 (mar)** ⚡ | 09:00-13:00 | 🎯 UWSA2 — predictor gold-standard (160Q) | `2u7viv0elr6aedo0m9undfa5kg` | **D77** | vie 8-ene | low-risk · **cae DENTRO de la Fase A**; la Fase B arranca el **mar 19-ene** (D82-D86, 5 días) |
| 9 | **19-ene-2027 (mar)** ⚡ | 07:15-11:00 | 🎯 NBME 31 (200Q) — GO/NO-GO fecha de examen | `l771lvcfv0jcebt61do6svia18` | **D82** | vie 15-ene | **GO = 2 NBME ≥68 % + UWSA2 low-risk** · abre la Fase B **el día siguiente al cierre de contenido (D81 lun 18-ene), sin banco de consolidación delante** (decisión de Joseph: aceptar o mover el GO/NO-GO al NBME 32) · GO → confirmar Prometric **lun 8-feb** |
| 10 | **20-ene-2027 (mié)** ⚡ | 07:15-11:00 | 🎯 NBME 32 (200Q) + repaso FA 1-5 | `h65e772pqsa4hgc5b6bh9n8h50` | **D83** | lun 18-ene | ≥68 % · Fase B; mañana D84 (jue 21-ene) = random timed 2×40Q + sistema débil #1 |
| 11 | **22-ene-2027 (vie)** ⚡ | 07:15-11:00 | 🎯 NBME 33 (200Q) + repaso FA 11-14 | `la5rsbuiqj1o35lb5adf93abuo` | **D85** | mié 20-ene | ≥68 % · Fase B; D86 (lun 25-ene) random timed + sistema débil #1 · D88-D89 random timed + sistema débil #2 · D90-D91 incorrects 2.ª pasada + sistema débil #3 · D92-D93 AMBOSS 200 mitades 1-2 |
| 12 | **26-ene-2027 (mar)** ⚡ | 07:15-11:00 | 🎯 FREE 120 oficial + logística del examen | `lh9jfjsmoif74ci6jcn8f1mq30` | **D87** | vie 22-ene | ≥70 % (heurística comunitaria) · último ensayo · **abre la Fase C** · **no es el último día del plan** (D94 = jue 4-feb última sesión de banco · D95 = vie 5-feb = D-1) |
| 13 | **08-feb-2027 (lun)** ⚡ movido desde el jue 4-feb | 07:00-16:00 | 🎯 USMLE STEP 1 · EXAMEN (target v5.15 — agendar en Prometric) | `oinh139dsnbuma9r3kfu56dhkc` | **—** (día del examen; fuera del plan) | jue 4-feb | overlay FREE, color 6, **no es la cita real de Prometric**: recuerda agendar/reprogramar y confirmar el eligibility period |
| 14 | **04-feb-2027 (jue)** ⚡ movido desde el mar 2-feb | 07:15-12:00 | 🏁 STEP 1 · D94 · última sesión de banco (D-2) | `neboplchsaua4snj39nrl480nc` | **D94** | mar 2-feb | `USMLE_TAPER.d94`: solo Anki MADURO + 20Q flagged/incorrects · repaso FA esquemas sistemas 6-10 · dormir ≥7 h · FREE, color 6 |
| 15 | **05-feb-2027 (vie)** ⚡ movido desde el mié 3-feb | 05:00-12:00 | 🛌 STEP 1 · D95 · D-1 · sesión mínima AM + ritual de test-day | `n90bdqhohadu1eqbctv148dn28` | **D95** | mié 3-feb | `USMLE_TAPER.d95` / `dMenos1`: sesión mínima ≤2 h (Anki maduro/vencido + 20Q flagged + rapid review FA) · tarde: permiso impreso + digital, 2 ID exactas, Ziploc Break #1-#4, ruta al Prometric · nada después de las 17:00 · FREE, color 6. ⚠ Con el examen el lunes, el ritual de test-day queda a **2 días** del examen: el sáb 6 y el dom 7-feb son de descanso (decisión de Joseph si quiere repetir parte del ritual el dom 7) |

⚠ Los mínimos on-track de la última columna son los de `HITOS_ONTRACK` en `src/lib/usmleScores.ts` (leídos con `node` el 12-sep, no estimados; no cambian con el corrimiento). Fuente: `DATA/USMLE/PALMERTON_POR_MATERIA.md` · Parte V-A.
⚠ **Los hitos ya NO caen en viernes.** Nueve de los doce pasan a **martes** (D10 · D25 · D40 · D55 · D65 · D72 · D77 · D82 · D87), dos a **miércoles** (D1 y D83) y solo uno queda en **viernes** (D85). El título y la hora se mantienen; **el D# es el que manda** para leer el contenido del día en la app. La vieja regla "los simulacros van en viernes para no tocar el fin de semana" queda sustituida por "los simulacros van donde los pone el D#": el fin de semana sigue libre igual.
⚠ **El plan no termina con el Free 120.** El **último día de banco es el jue 4-feb-2027 = D94 = D-2** (repaso FA sistemas 6-10 + Anki marathon + incorrects; Palmerton §8.3: cesa todo lo nuevo — `USMLE_TAPER.d94`), con overlay 🏁 (#14). **Sáb 6 y dom 7-feb quedan libres** (solo Anki vencido) entre el D95 (vie 5-feb) y el examen (lun 8-feb).
⚠ Tras el 22-dic (D65) el feriado vie 25-dic queda fuera del plan, y tras el mié 30-dic (D70) también el jue 31-dic y el vie 1-ene: **el siguiente día hábil es el lun 4-ene = D71**; **mar 5-ene = D72 = NBME 30 (cierre de la Fase A)**; **mar 12-ene = D77 = UWSA2 (dentro de la Fase A)**; **vie 15-ene = D80 y lun 18-ene = D81** = los 2 días dobles de Bioquímica.

**Colisiones de un día de hito (aceptadas, no se mueven franjas):**
- UWSA (09:00-13:00 + ~30' de descansos reales → ~13:30): pisa deep prime 09:00, 30Q 11:00, ALMUERZO 12:00 y SYNAPSE 12:30 → el almuerzo se come dentro del sim (Ziploc BREAK 2), SYNAPSE pasa a la tarde, la revisión completa va en las franjas USMLE de la tarde + 18:00. **Aplica ya el mié 23-sep (D1).**
- NBME (07:15-11:00 orientativo; 4 bloques × 50Q, el reloj lo pone la interfaz NBME): pisa repaso 07:15, pre-test 08:15, deep prime 09:00 y (si se alarga) 30Q 11:00 → almuerzo 12:00 normal; si el sim pasa de las 12:00, almuerzo dentro del sim entre B3 y B4. **Nuevo en v5.15:** al caer casi todos en **martes**, la colisión se repite en día de GYM/MIR normal, no en el viernes de cierre semanal — el cierre semanal del viernes deja de competir con un NBME.
- **D91-D95 (lun 1 → vie 5-feb-2027)**: las 7 series L-V originales terminan con `UNTIL=20270130` y las **6 series de EXTENSIÓN v5.14** cubrían solo hasta el mié 3-feb → **en v5.15 hay que extenderlas dos días hábiles más (hasta el vie 5-feb)**; **ENCAPS sí llega hasta el mar 2-feb** (el mantenimiento se amplió), así que su serie necesita 2 días extra respecto al `UNTIL` del 29-ene. Detalle y `UNTIL` propuestos en §17.
- **EXAMEN lun 8-feb-2027 (07:00-16:00 + viaje)**: las extensiones USMLE deben terminar el vie 5-feb → **cero franjas USMLE el día del examen**; **sí siguen apareciendo las series secundarias** (todas sin UNTIL: vibecoding 04:15 (S20 termina el vie 5-feb), SYNAPSE 12:30 (el plan acaba el lun 1-feb), Research↔Derma 13:30 (**Derma d49 = sesión opcional**), AURUM 14:15, MIR 15:15/15:30 (**D18 del mantenimiento, modo reducido**), LIVIANO 17:15 (el plan acabó el 29-ene), GYM 19:00) → **decisión de Joseph: vaciarlas o dejarlas**.
- El resto del día (Research/Derma, AURUM, MIR, ENCAPS, LIVIANO, GYM/BAILE) **no cambia** en los días de NBME/UWSA.

### 5.1 · OVERLAYS DE HITO 🔬 RESEARCH (color 6 naranja · `transparency: transparent` · 13:30-14:15 · eventos únicos, no series)
Existen desde el 13-sep (gap 7 de Palmerton v3b, `RUTA_PUBLICACION_2027.md` §9): un overlay FREE por cada uno de los 12 hitos de `RESEARCH_HITOS` (`researchDailyPlan.ts` + `researchDailyPlan2027.ts`), sobre la franja Research↔Derma. **A diferencia de los USMLE, estos SÍ cambian de fecha en cada corrimiento** (son átomos del plan interdiario: cada corrimiento de 1 hábil del D1 los corre **2 días hábiles**). El generador `DATA/_scripts/gen_research_calendar.js` lee los `.ts`, calcula el payload (fecha/título/descripción + hash) y lo compara con `DATA/RESEARCH/_calendar_overlays.json`; tras cada corrimiento da N `recrear`, se hace `update_event` de cada id con `startTime`/`endTime`/`summary`/`description`/`colorId 6`/`AVAILABILITY_FREE` del payload (sin borrar ni crear: son eventos sueltos), se registra cada id con `--set hito=eventId` y **`--check` debe terminar con 0**.
> **v5.15 (22-sep): los 12 overlays 🔬 vuelven a correr +2 hábiles.** El D1 de Research pasó del mar 22 al **jue 24-sep** y cada hito se movió 2 días hábiles (M1 lun 28 → **mié 30-sep**, …, R43 mar 13 → **jue 15-jul-2027**). El plan ya está regenerado y `gen_research_calendar.js` dejó los 12 con `accionPendiente: "recrear"` en `DATA/RESEARCH/_calendar_overlays.json` (`actualizado: 2026-09-22`). **PENDIENTE:** `update_event` de cada id (fecha/título/descripción; ids intactos) + `--set` ×12 + `--check` = 0 — lo hace el agente Calendar de v5.15 (§17).

| # | Hito | Código · d | Fecha **v5.15** (22-sep) | Fecha v5.14 (19-sep) | ID | Título literal |
|---|---|---|---|---|---|---|
| 1 | mentor | M1 · d3 c1 | **mié 30-sep-2026** | lun 28-sep | `shkul14j3o1bs1a5044u8ge1kk` | 🔬 RESEARCH · M1 Senior author local (Dr. Ciro) confirmado |
| 2 | carta-diana | C-2 · d6 c1 | **jue 8-oct-2026** | mar 6-oct | `iduh7fhst9uhl0t54hhk535ff4` | 🔬 RESEARCH · C-2 Artículo DIANA + deadline de la carta #1 |
| 3 | tesis-etica | T-1 · d7 c1 | **lun 12-oct-2026** | jue 8-oct | `95aglmlk9qi32m4bv6v28rv5b0` | 🔬 RESEARCH · T-1 Ética/CEI de la tesis L0 archivada |
| 4 | carta-1 | C-6 · d13 c1 | **mié 28-oct-2026** | lun 26-oct | `k2oov1tk0jalt5f45ekemej4k0` | 🔬 RESEARCH · C-6 SUBMIT carta al editor #1 |
| 5 | cr-caso | CR-1 · d15 c1 | **mar 3-nov-2026** | vie 30-oct | `36tp7b995jnoi844d5uvgm58t0` | 🔬 RESEARCH · CR-1 Caso + senior author del case report #1 |
| 6 | tesis-L0 | T-8 · d26 c1 | **jue 3-dic-2026** | mar 1-dic | `ahl0tbimefcq8u7ps2qasjb708` | 🔬 RESEARCH · T-8 SUBMIT research letter tesis L0 |
| 7 | revisor2 | X-1 · d28 c1 | **mié 9-dic-2026** | lun 7-dic | `9hhe6q10da1ltbpk23h171gf9c` | 🔬 RESEARCH · X-1 Revisor humano #2 de SR-1 nombrado |
| 8 | cr-paquete | CR-8 · d32 c1 | **lun 21-dic-2026** | jue 17-dic | `f2mn20ok30kl5k2t1s6tci7n7c` | 🔬 RESEARCH · CR-8 Paquete del case report #1 CONGELADO |
| 9 | case-report-1 | CR-9 · d35 c1 | **lun 1-feb-2027** (misma fecha; ahora d35 y = **D91** del Step 1, aún más lejos de la víspera) | lun 1-feb (d36 = D93) | `t136recadd6vnv0iebrmmqiv48` | 🔬 RESEARCH · CR-9 SUBMIT case report #1 |
| 10 | equipo | X-9 · d45 c2 | **lun 1-mar-2027** | jue 25-feb | `nibrfidt3qhct59qhtrvqpqqi0` | 🔬 RESEARCH · X-9 Equipo de revisión SR-1 confirmado |
| 11 | PROSPERO-SR1 | R10 · d47 c2 | **vie 5-mar-2027** | mié 3-mar | `2k9idr3f3th6hj1e4r8ugj4iqk` | 🔬 RESEARCH · R10 REGISTRO PROSPERO de SR-1 |
| 12 | SR-1 | R43 · d94 c2 | **jue 15-jul-2027** | mar 13-jul | `94mmg6li8egq2kh9401nti1pkg` | 🔬 RESEARCH · R43 SUBMIT SR-1 (Dermatologic Surgery) |

⚠ **Textos fijos a revisar en v5.15** (`gen_research_calendar.js`): el `DEADLINE` de X-9 decía "antes del registro R10 (jue 25-feb-2027)" y el de CR-8 "pausa Step 1 (Fases B-C, 8→29-ene)" — con v5.15 la pausa del Step 1 va del **mar 19-ene al vie 5-feb** y R10 cae el **vie 5-mar-2027**. **A VERIFICAR (22-sep)** si el generador ya los reescribió; el overlay M1 leído el 22-sep ya cita "antes de T-1 (lun 12-oct-2026)", que sí es la fecha v5.15.
✅ **RESUELTO (14-sep, tarde)** — los dos textos fijos de `DEADLINE` en `gen_research_calendar.js` se corrigieron (X-9: "antes del registro R10 (jue 25-feb-2027)"; CR-8: "pausa Step 1 (Fases B-C, 8→29-ene)"), se regeneró el plan (2 `recrear`), se hizo `update_event` de X-9 `nibrfidt3qhct59qhtrvqpqqi0` y CR-8 `f2mn20ok30kl5k2t1s6tci7n7c` (solo description), `--set` de ambos y `--check` = 0 (12 hitos · 0 con acción pendiente). Texto original de la observación: dos textos fijos del generador (`DEADLINE` en `gen_research_calendar.js`, fuera del alcance de esta pasada) quedaron desfasados frente a las fechas nuevas: el overlay X-9 dice "antes del registro R10 (**23-feb-2027**)" (R10 es ahora el jue **25-feb**) y CR-8 dice "pausa Step 1 (**4→29-ene**)" (la pausa Research va del mié 30-dic al vie 29-ene). Son las cadenas literales del script; corregirlas exige tocar `DATA/_scripts/` y regenerar (hash nuevo → 2 `recrear`). El cronograma del `d` en el título ("d45 del ciclo 2") es el que imprime el script (numeración continua), no se alteró.
⚠ Regla de mantenimiento: **tras cada corrimiento** → `node DATA/_scripts/gen_research_plan.js <D1>` (lo hace el orquestador) → `node DATA/_scripts/gen_research_calendar.js` → `update_event` de cada `recrear` → `--set` → `--check` = 0. Los ids no cambian mientras se use `update_event`; solo cambiarían con `delete_event` + `create_event`.

## 6 · Descripciones de los bloques — estado **v5.14** (reescritas por el agente Calendar el **19-sep-2026**; NO re-leídas ni reescritas en la pasada documental del 22-sep)
> ⚠ **Esta sección es el registro LITERAL de lo que el Calendar dice hoy, que sigue siendo texto de v5.14.** Todas las cifras que aparecen abajo ("D1 = lun 21-sep-2026", "95 días … hasta el mié 3-feb", "examen jue 4-feb", "mantenimiento hasta el vie 29-ene", "SYNAPSE 131 días", mapas de alternancia Research↔Derma, SHIP de vibecoding) **son de v5.14 y hay que reescribirlas a v5.15**: la lista de lo que debe cambiar está en **§17**. No se han editado aquí para no afirmar como leído algo que nadie ha leído en el Calendar vivo.
Lo que sigue es un **resumen fiel de 1-2 líneas por serie**. El 19-sep se reescribió la `description` de **38 series** (handoff §2.1: las 23 de §15.2 + las 9 series de GYM/BAILE que arrastraban "Régimen v5.6", con 3 ids nuevos + SYNAPSE sáb/dom reescritas sin `<br>` + las 4 USMLE que nunca se habían tocado (07:15, 08:15, 11:00, 18:00); 8 de ellas llevan además el texto alineado a las FRANJAS: 07:15 (5Q timed), 09:00 (regla del frente), 11:00 (EO + shopping list), 18:00 (10Q 90 s rule-in → juez → flag), SYNAPSE 12:30, Research↔Derma, MIR 15:15 (texto MIR_FRANJAS) y MIR 15:30). En todas las series se tocó **solo `description`**: RRULE, `start`/`end`, `summary` y `colorId` intactos. **Además se CREARON 6 series de EXTENSIÓN v5.14 (D93-D95) y la 📋 REVISIÓN SEMANAL** (§16.2). **Ninguna serie se borró ni se recreó y no se usó `recurrenceData` en UPDATE.**
**Estado:** 🟢 = releída en vivo el 19-sep en esta pasada (`get_event`) · 🔵 = reescrita el 19-sep por el agente Calendar según el handoff §2.1 (no releída aquí; **A VERIFICAR (19-sep)** el texto literal) · ⚪ = sin cambio conocido.
**⏸ SIN CAMBIO:** ninguna de las 13 series de estudio queda sin etiqueta v5.14 según el handoff; el pre-test 08:15 `3tbecd5n03ut6lno3hjvc1sr7k` se infiere reescrito porque su extensión `mlqvrm4m8bn38qfl37qddjgk5g` (creada el 19-sep) ya lleva "Régimen v5.14 (D1 = lun 21-sep-2026)" — **A VERIFICAR (19-sep)** con `get_event`.

### 6.1 · Bloques de estudio (L-V)

| Hora · Serie | ID | Resumen fiel del texto v5.14 (19-sep) | Estado |
|---|---|---|---|
| 04:15-05:00 · 🧠 IA VIBECODING | `udr09j9ng983o0d4nipkfe4494` | Curso de IA en modo BUILDER, no programar desde cero: 1 proyecto real terminado por semana al servicio de sus sistemas; ciclo diario 5' objetivo → 35' construir con Claude Code → 5' journal (D:/synapse-journal); freno 04:55; orden S1-S12 por riesgo para el Step 1. **Cierre v5.14 (19-sep):** 12 proyectos · 60 días L-V en bloques de 5 hábiles · **lun 21-sep → vie 11-dic-2026** · 1er SHIP sáb 26-sep · último SHIP sáb 12-dic (los 12 sábados) · S6 lun 26 → vie 30-oct = semana post-NBME 26 (flag `deload` en S7 → decisión de Joseph) · taper S13-S20 lun 14-dic-2026 → mié 3-feb-2027 en bloques SECUENCIALES (S13 14-18 dic · S14 21-28 dic · S15 29-dic→5-ene · S16 6-8 ene (3) · S17 11-15 ene · S18 18-22 ene · S19 25-29 ene · S20 1-3 feb (3)); ni un proyecto ni un paso se fusionó ni se recortó; 95 días = mismo D# que el Step 1; D94 mar 2-feb última sesión de banco · D95 mié 3-feb = D-1 · EXAMEN jue 4-feb-2027 (`VIBE_PROYECTOS` S1 ini 2026-09-21 fin 2026-09-25 ship 2026-09-26 y `VIBE_TAPER` leídos con `node` el 19-sep). | 🔵 |
| 05:00-05:45 · ANKI AM | `i8afj7uppkb3ntj8h9890dhecc` | Anki de madrugada (Palmerton, mente fresca) — Fase A: 45' FSRS deck USMLE; Fases B-C (vie 15-ene → mié 3-feb): 05:00-05:12 🔥 Stress Set 10Q + 05:12-05:45 Anki. **Cifra v5.14:** "régimen v5.14: 95 días desde **lun 21-sep** hasta **mié 3-feb-2027** ≈ 594h; D92 vie 29-ene · sáb 30 y dom 31 libres (solo Anki vencido) · D93 lun 1-feb · D94 = mar 2-feb última sesión de banco (solo Anki maduro + 20Q flagged) · D95 = mié 3-feb = D-1 dentro del plan (sesión mínima AM ≤2 h) · EXAMEN jue 4-feb-2027 (target v5.14)" + **"⚠ Esta serie termina el vie 29-ene (UNTIL); la EXTENSIÓN v5.14 para D93-D95 (lun 1 → mié 3-feb) es una serie aparte creada el 19-sep"** (texto leído en la extensión `gfapfa25hm5d9s65n7oiu0jsms`, que lo replica). FSRS retención 0.90, máx 50 nuevas/día, solo Good/Again. | 🔵 (extensión 🟢) ✅ UNTIL cubierto |
| 07:15-08:15 · Repaso multi-temporal | `54lchqggik96dmljmmg3l88s54` | 07:15-07:50 Anki FSRS (tarjetas de MECANISMO) · 07:50-08:05 repaso anclado del tema de AYER (free recall 90 s + 2Q uWorld, <60 % → re-encolar) · 08:05-08:15 barrido D-3/D-7 en Obsidian; **desde el 19-sep alineada a FRANJAS: 5Q timed** (el título sigue diciendo "2Q" → decisión de Joseph). Extensión v5.14 `vi7lrsm2blitpqistrt87i3sqk` (lun-mié 1-3 feb) releída: conserva el texto base. | 🔵 (extensión 🟢) ✅ UNTIL cubierto |
| 08:15-09:00 · Pre-test ciego | `3tbecd5n03ut6lno3hjvc1sr7k` | 10Q uWorld ciegas en modo tutor del subtema del día, sin haber estudiado + free recall 90 s en papel + anotar los huecos como objetivo del deep prime. **Texto v5.14 (leído en la extensión `mlqvrm4m8bn38qfl37qddjgk5g`):** "Régimen v5.14 (D1 = lun 21-sep-2026): el D1 es el UWSA1 (baseline, sin pre-test) y el contenido arranca el mar 22-sep (D2); Fase A contenido hasta el jue 14-ene (D81) · desde el NBME 31 (vie 15-ene, D82) cero preguntas nuevas: este bloque pasa a incorrects/flagged" + aviso UNTIL. La extensión es un evento suelto solo el lun 1-feb (D93): el D94 y el D95 no llevan pre-test. | 🔵 A VERIFICAR (19-sep) (extensión 🟢) ✅ UNTIL cubierto |
| 09:00-11:00 · DEEP PRIME | `cb2uh20jnvu7pgfev4183pgctc` | Bloque sagrado de 2h: vídeo 09:00-10:00 (B&B/Pathoma/Sketchy a 1.5x) · First Aid active reading 10:00-10:45 · ≤10 tarjetas de mecanismo + APEX 10:45-11:00; jerarquía de material; "💧 AL ABRIR" con 500 ml + snack y micro-pausa 10:00-10:05; ☕ última cafeína ≤ 11:00; los viernes de hito este bloque es el UWSA/NBME; **desde el 19-sep alineada a FRANJAS: regla del frente**. **Cierre v5.14 (leído en la extensión `39dm9gk3a58u3iqu9lk28noum0`):** "Régimen v5.14 · D1 = lun 21-sep-2026 · Step 1 = 95 días → D95 = mié 3-feb-2027 · EXAMEN jue 4-feb-2027 (target v5.14: agendar/reprogramar Prometric y confirmar eligibility period). En estos 3 días el bloque NO es contenido nuevo (Fase C): D93 banco/AMBOSS 200 mitad 2 · D94 20Q flagged + Anki maduro + esquemas FA · D95 sesión mínima ≤2 h (ver overlays 🏁 D94 y 🛌 D95)". | 🔵 (extensión 🟢) ✅ UNTIL cubierto |
| 11:00-12:00 · 30Q consolidación | `2eqmmrnh00jr44plevurgcu2as` | uWorld modo tutor SOLO de temas ya vistos; leer la explicación de correctas e incorrectas, clasificar cada fallo (conocimiento / lectura / razonamiento) y convertirlo en tarjeta de mecanismo; ritmo ~40Q/día → banco completo (3659Q) en la Fase A; **desde el 19-sep alineada a FRANJAS: EO + shopping list** (el título sigue diciendo "tutor" → decisión de Joseph). Extensión v5.14 `u6alh9h3o43l2fu98gmvkvtk90` (lun-mié 1-3 feb) releída. | 🔵 (extensión 🟢) ✅ UNTIL cubierto |
| 12:30-13:00 · SYNAPSE misión | `j99thg3eaqesosmvppj4rfgvh4` | Misión del día en la app (A · 15' lección + B · 10' audio + C · 5' lectura móvil; marcar ✓); alineada a FRANJAS el 19-sep. **Cierre v5.14:** **131 días · 19 semanas completas · lun 21-sep-2026 → vie 29-ene-2027**; 110 A-units intactas; del lun 1 al mié 3-feb (D93-D95) y el finde 30-31 (libre): sin SYNAPSE; EXAMEN Step 1 jue 4-feb-2027 (`synapseDailyPlan.ts` leído con node: 131 fechas 2026-09-21 → 2027-01-29). | 🔵 |
| 13:30-14:15 · RESEARCH ↔ DERMA | `3ofg2ljv8kl3p1adm2e5d5nih3` | **Mapa de arranque v5.14** (el ancla de la alternancia sigue siendo el mié 10-jun-2026 y NO se mueve): **lun 21 DERMA (d1) · mar 22 RESEARCH (D1) · mié 23 DERMA (d2) · jue 24 RESEARCH (D2) · vie 25 DERMA (d3) · lun 28 RESEARCH (D3 · hito M1) · mar 29 DERMA (d4)**…, contrastado 1:1 con `researchDailyPlan.ts` (D1 22-sep · D2 24-sep · D3 28-sep) y `dermaDailyPlan.ts` (d1 21-sep · d2 23-sep · d3 25-sep · d4 29-sep) leídos con `node` el 19-sep. Planes vigentes: **Research ciclo 1 = 42 átomos mar 22-sep-2026 → mié 17-feb-2027** (pausa Step 1 4→29-ene; D36 lun 1-feb = CR-9 = D93, ya no víspera; D37 mié 3-feb = D95) + ciclo 2 = 67 átomos vie 19-feb → mar 24-ago-2027 · **Derma 73 sesiones lun 21-sep-2026 → mar 13-abr-2027** (d42 vie 15-ene NBME 31 · d43 mar 19-ene Mohs · taper d44-d49 jue 21-ene → jue 4-feb; **d49 jue 4-feb = día del examen, sesión opcional**; d48 mar 2-feb = D94; d50 lun 8-feb; ciclo 2 d74-d103 jue 15-abr → mar 6-jul). Ambos saltan 25-dic, 31-dic y 1-ene; ni un átomo ni una sesión se fusionó o se recortó. Los 12 hitos Research llevan overlay 🔬 (§5.1, re-fechados en v5.14). EXAMEN Step 1 JUE 4-FEB-2027. | 🔵 |
| 14:15-15:15 · AURUM | `at1nak8f24nbnj1mh2jcd4aggg` | Closer de ventas: 26 semanas · 130 lecciones · 7 fases; solo referentes reales con track record verificable y 11 libros ancla; cada día 1 vídeo + drill de pitch sobre leads reales (ALLPA / Qori Golden); la lectura va en los huecos de viaje. **Cierre v5.14:** D1 = **lun 21-sep-2026 → D130 = mié 24-mar-2027** + pitches v1 D15 vie 9-oct · v2 D35 vie 6-nov · v3 D55 vie 4-dic · v4 D75 mié 6-ene · **v5 D95 mié 3-feb (= D-1 del Step 1, víspera del examen del jue 4-feb-2027; decisión de Joseph)** · v6 D115 · v7 D130 mié 24-mar (`AURUM_PLAN_META` inicio 2026-09-21 fin 2027-03-24 + `AURUM_PITCH_DIAS` leídos con node). | 🔵 |
| 15:15-15:30 · MIR eval anclada | `2ldp6obaapnvo76li28uprrddg` | Eval anclada del tema D-1 en modo examen + 5' Anki deck MIR + 3' mini-corrección tipificando el error; **desde el 19-sep con el texto MIR_FRANJAS** (el título sigue diciendo "4Q" → decisión de Joseph). **Etiqueta v5.14:** MIR = 78 días (**lun 21-sep-2026 → lun 11-ene-2027**: 76 temas + D77 vie 8-ene mini-MIR 40Q + D78 lun 11-ene corrección); del mar 12-ene al mié 31-mar-2027 banqueo de mantenimiento (**57 días = 46 lun-jue + 11 viernes, cierre fijo clavado al ENCAPS**; 12 slots Tier C desde el jue 14-ene; **modo reducido hasta el mié 3-feb = D95 = D-1**; `MIR_MANT_META`: inicio 2027-01-12, fin 2027-03-31, 57 días, 17 reducidos — leído con node); ⚠ el jue 4-feb (examen) es el D18 del mantenimiento = sesión normal (Gastro + Onco) → decisión de Joseph. | 🔵 |
| 15:30-16:15 · MIR deep work mini | `00k364heibh1n6f9hfspcv9dpi` | 1 subtema atómico/día en 4 sub-fases: pre-test + generation 5' · lectura activa + elaboración 25' · free recall libro cerrado 5' · ≤4 APEX 10'; identity stacking y métricas en Obsidian 06_MIR/Subtemas; alineada a FRANJAS el 19-sep (el título sigue diciendo "Free Recall" → decisión de Joseph). **FUNDAMENTO v5.14:** "78 días × 1 subtema/día × ≤4 cards ≈ 310 cards MIR sólidas al **lun 11-ene-2027**; del mar 12-ene al mié 31-mar-2027 mantenimiento (57 días = 46 lun-jue + 11 viernes; modo reducido hasta el mié 3-feb = D95 = D-1; EXAMEN Step 1 JUE 4-FEB-2027, target v5.14)" + etiqueta **v5.14 (D1 = lun 21-sep-2026)**. | 🔵 |
| 16:15-17:15 · ENCAPS mantenimiento | `papebi46etlo8glgfs5akd5mig` | 16:15-16:30 eval anclada 5Q del tema de ayer · 16:30-17:15 banco 20-25Q por rotación semanal ponderada (II 30 % · I 27 % · V 21 % · III 13 % · IV 9 %) · viernes mini-simulacro 25Q a 72 s/Q · 8 críticos v3 · registrar CADA fallo en TRACKING_ERRORES; conserva el "🥤 CIERRE 17:10-17:15" de cena ligera. **Cierre v5.14 (handoff §4):** **92 días** lun 21-sep-2026 → vie 29-ene-2027 (Supabase `study_schedule`, backup **`study_schedule_bk_0919`**; 75 días de banqueo + 17 mini-sims de viernes por calendario, la primera el vie 25-sep = D5), "el corrimiento se comió otros 2 días de mantenimiento porque el cierre del 29-ene es fijo: **94 → 92**", **PRE-TEST DE ARRANQUE 40Q ciego: lun 21-sep parte 1 + mar 22-sep parte 2**, "⚠ la fase intensiva feb-mar 2027 arranca tras el examen del jue 4-feb → propuesta vie 5-feb o lun 8-feb (`gen_encaps_intensivo_2027.js`; decisión de Joseph)", reponer stock (V-2 179 · I-3 165 · III-5 90 antes del jue 22-oct). **La serie NO se extiende: su `UNTIL=20270130` coincide con el fin del mantenimiento** (lun 1 → mié 3-feb sin ENCAPS; la intensiva necesitará serie nueva). Cifras de Supabase tomadas del handoff (**A VERIFICAR (19-sep)** en vivo: este agente no toca Supabase). | 🔵 ✅ UNTIL coherente |
| 17:15-18:00 · LIVIANO | `8epae6hlfmrc9j0h2kib7iuc84` | 17:15-17:40 módulo del día (fisiología del peso · GLP-1/tirzepatida · nutrición · ejercicio · conducta · farmacología/bariátrica) · 17:40-18:00 aplicación explicándolo como a un paciente real; fuentes ProMIR + AMBOSS + guías AACE/OMA; conserva "🥤 ARRANQUE 17:15". **Cierre v5.14:** 90 días L-V **lun 21-sep-2026 → mié 27-ene-2027** (`livianoStudyPlan.ts` con node: 90 entradas, D5 vie 25-sep = caso 1/16 … caso 16 D87 vie 22-ene **antes** del capstone D89 mar 26-ene — la inversión de v5.13 desaparece; drills D37/D58/D75/D88; revisión trimestral I D46 · II D90 mié 27-ene; Acceso Perú D39 + D41-D44; salta 25-dic, 31-dic y 1-ene). | 🔵 |
| 18:00-18:45 · Eval diaria USMLE | `utk2laeob9u0847bbe9rm491v4` | 18:00-18:25 bloque timed de 15Q uWorld mixtas de temas vistos (72 s/Q, sin pausa, en inglés) · 18:25-18:45 corrección + log de errores + STRESS strategy de Palmerton; termómetro diario en la app; anchoring pre-sueño; **desde el 19-sep alineada a FRANJAS: 10Q 90 s rule-in → juez → flag**. Extensión v5.14 `r850pocdgcm8pi6a42cvv37v1k` (solo lun 1 y mar 2-feb: el D-1 no lleva nada después de las 17:00) releída. | 🔵 (extensión 🟢) ✅ UNTIL cubierto |

✅ **UNTIL (resuelto el 19-sep para las 6 USMLE)** = la RRULE de las 7 series L-V originales termina el **vie 29-ene-2027** (`UNTIL=20270130T045959Z`) y NO se tocó (el MCP tiene `recurrenceData` roto para UPDATE). En vez de recrearlas, el agente Calendar **creó 6 series de EXTENSIÓN v5.14 para D93-D95 (lun 1 → mié 3-feb-2027)** con la misma hora, título y color y una descripción que abre con "EXTENSIÓN v5.14 (D93-D95…)" — ids, RRULE y horas **medidos con `get_event` en esta pasada** (§16.2): ANKI AM `gfapfa25hm5d9s65n7oiu0jsms` · repaso `vi7lrsm2blitpqistrt87i3sqk` · DEEP PRIME `39dm9gk3a58u3iqu9lk28noum0` · 30Q `u6alh9h3o43l2fu98gmvkvtk90` (las 4: `RRULE:FREQ=WEEKLY;UNTIL=20270204T045959Z;BYDAY=MO,TU,WE`) · eval 18:00 `r850pocdgcm8pi6a42cvv37v1k` (`UNTIL=20270203T045959Z;BYDAY=MO,TU`) · pre-test `mlqvrm4m8bn38qfl37qddjgk5g` (evento suelto lun 1-feb 08:15-09:00, sin recurrencia). **ENCAPS 16:15 no se extiende** (el mantenimiento termina el 29-ene por diseño). ⚠ En el próximo corrimiento estas 6 extensiones y los 2 overlays de taper también hay que moverlos (+1 hábil) o recrearlos.

### 6.2 · Comida, entrenamiento y fin de semana

| Bloque · Serie | ID | Resumen del texto v5.14 (reescrito el 19-sep por el agente Calendar; 🔵 = no releído en esta pasada) | Estado |
|---|---|---|---|
| 07:00-07:15 · DESAYUNO L-V | `7agi60f2bp8qnh6cnqvfo22giv` | ≥30 g de proteína + 500 ml de agua + carbohidrato COMPLEJO (nada de azúcar simple ni jugo envasado); 15' de combustible, sin banco de preguntas en la mesa; VITALS quick-log de sueño y primera agua; 1.ª de las 4 tomas de proteína (07:00 · 12:00 · 15:15 · 17:15) y lista de ventanas de hidratación del día. **Etiqueta actualizada el 19-sep → "Régimen v5.14 (D1 = lun 21-sep-2026)"** (regla de cafeína intacta). | 🔵 |
| 06:45-07:15 · DESAYUNO sáb/dom | `2u9je70pif58hgf2f8t3vgu8b8` | Misma regla sin prisa (aquí no hay bloque a las 07:15 → se puede comer sentado 30'); VITALS es donde más se pierde el registro el fin de semana; el Anki de sáb 19:00 / dom 17:00 lo dimensionan las tarjetas **due**, no el reloj (cero backlog el lunes, regla del 100 % de Palmerton). **Etiqueta actualizada el 19-sep a v5.13**. | 🔵 |
| 12:00-12:30 · ALUMUERZO | `43dq3oib16esjcqj1dcd8osot2` | Comida principal dimensionada por VITALS (proteína + verduras + carbohidrato complejo), 500 ml de agua, pausa difusa sin pantalla del Step 1, sin azúcar simple para evitar el bajón de 13:30-15:00; en los UWSA (09:00-13:00) se come DENTRO del sim como Break 2 y en los NBME (07:15-11:00) queda igual a las 12:00; ahora dice "(v5.14: el UWSA1 cae en LUNES 21-sep = D1, misma regla)". **Etiqueta actualizada el 19-sep a v5.13**. | 🔵 |
| BAILE mié 19:00-20:30 · sáb 20:00-20:30 · dom 18:00-19:30 | `0tod56pc6pgecm5lf7g4e3ji9v` · `3jkfb6097rtc1jbec19eg3sd57` · `7j6pucil43vuca70p082g5ub3d` | Hidratación durante (300-500 ml); **post-entreno SOLO agua o electrolitos (500-750 ml)**, nada sólido pesado a <2h de las 21:00 (Walker: la digestión activa fragmenta el sueño profundo); la cena ligera va antes (17:15 L-V · ~19:30 sáb tras el Anki · ~17:00 dom); si hay hambre real al llegar, máximo 1 yogur o queso fresco; 0 luz azul tras 20:30 y cama 21:00. **Etiqueta actualizada el 19-sep a v5.13 en las tres**. | 🔵 |
| Sáb 15:00-17:00 · SYNAPSE PC | `hv2lk04orquvivthtkfhilb1ps` | **Reescrita el 19-sep (v5.14) sin `<br>` escapados y sin el texto de junio**: sábado 15:00-17:00 = SHIP del proyecto de vibecoding de la semana (1.er SHIP sáb 26-sep; los 12 sábados hasta el 12-dic), coherente con las 04:15 y 12:30 (handoff §2.1; **A VERIFICAR (19-sep)** el texto literal). Cierra el 🟡 2 / 🟡 3 de §15.3. | 🔵 |
| Dom 15:00-17:00 · SYNAPSE repaso + PC | `s7r8tiu66286t156l0odpv5nvo` | **Reescrita el 19-sep (v5.14) sin `<br>` y sin "la serie arranca el 28-jun"**: domingo = Feynman + 20′ revisión + terminar el bloque PC (la 📋 REVISIÓN SEMANAL está en sábado por defecto; si Joseph la prefiere en domingo, mover la serie `21fbiohc1i47r4lqmaa3eb76l4`) (handoff §2.1; **A VERIFICAR (19-sep)** el texto literal). | 🔵 |

⚠ Las 7 rutinas de **§6.3** (EKER, CORRER, CALISTENIA, LECTURA DE LIBRO, VIAJE VUELTA, ANKI sáb y ANKI dom) se **re-etiquetaron a 'Régimen v5.14 (D1 = lun 21-sep-2026)' el 19-sep** (agente Calendar; en el 16-sep se habían releído en vivo) (solo la última línea de la description; RRULE/horas/títulos intactos; verificado con la respuesta de update_event). **Única excepción de texto en EKER `22bh9m5jhc7ro6aj3m4ffjad7g`:** la frase 6 "IDENTIDAD DE EXAMEN (vigente hasta el lun 1-feb-2027…)" se cambió el 16-sep a "vigente hasta el mar 2-feb-2027" y el 19-sep a "**vigente hasta el jue 4-feb-2027, día del examen Step 1 (target v5.14)**" porque esa fecha ES el examen y dejarla en una fecha anterior sería un dato falso; las 5 frases de negocio siguen intactas. DESAYUNO y DEEP PRIME llevan además la regla de la cafeína. ⚪ **No releídas el 16-sep** (última captura 05-sep/08-sep, sin cambios conocidos; ninguna cita la versión del régimen salvo GYM/BAILE): **PREPARAR PARA CORRER / DUCHA / ALISTARSE / VIAJE / DORMIR** — sin descripción o sin versión · **las 9 series de GYM y BAILE que no son BAILE mié/sáb/dom** — descripción común post-entreno del 05-sep (ver §2) que **desde el 19-sep lleva "Régimen v5.14 (D1 = lun 21-sep-2026)"** en las 9 (3 con id nuevo: GYM jue `4qvs34d84u82psvknpqhv3jc7a` · BAILE jue `3m8m4resu8akph4a7qfuf3h1qn` · BAILE PRÁCTICA dom `13m3tcqjjc34rt6iqfblla18q1`; ver §2 y §16.2 — cierra el 🟡 4 de §15.3) · **SYNAPSE PC sáb/dom** — ver tabla.

### 6.3 · Descripciones escritas el 12-sep-2026 (tarde) — puntos ciegos 7 (burnout), 8 (circadiano), 10 (finde), 11 (VITALS) de `gaps_v3b_synapse.json`
Solo `description` (sin `recurrenceData`, sin borrar ni crear series). Cada una se leyó con `get_event` antes y se verificó después: recurrencia y horas intactas; `updated` = 2026-09-13T01:35-01:36Z (UTC).

| Bloque | ID serie | Qué dice ahora | Antes |
|---|---|---|---|
| 🚗 VIAJE VUELTA 20:30 (L-V) | `3l59kpei7sg0l6kq51343or383` | Las 3 preguntas de siempre + **"¿Alguna de las 5 señales hoy?"** con las 5 de DOCTRINA §6 numeradas, regla ≥1 → mañana ÁMBAR / la 5 → ROJO conductual, y que las casillas viven en la nota del día del vault (cierre 18:25-18:45). Sigue "sin pantallas, no Anki esta noche". Etiqueta v5.10 | 3 preguntas, sin señales |
| DESAYUNO 07:00 (L-V) | `7agi60f2bp8qnh6cnqvfo22giv` | + bloque **☕ CAFEÍNA ≤ 11:00 — máx 2 tomas (05:00 y 07:00 = la última); después agua/descafeinado** (vida media ~5-6 h, Walker). Resto idéntico (proteína, agua, VITALS, ventanas) | sin regla de cafeína (solo "250 ml agua + café") |
| DEEP PRIME 09:00 (L-V) | `cb2uh20jnvu7pgfev4183pgctc` | + línea **☕ Última cafeína del día ≤ 11:00: la 2.ª toma fue en el desayuno; en este bloque solo agua** (insertada antes de la etiqueta "Régimen v5.10 · D1 = lun 14-sep-2026"; todo lo demás intacto, incluido el bloque 💧 y las fases/hitos v5.10) | sin regla de cafeína |
| LECTURA DE LIBRO 13:00 (L-V) | `7jmf8p1l5b5q6jbtmj9uualiq8` | **Primera descripción**: 13:00-13:15 lectura (Biblioteca del Fundador) + **13:15-13:30 SIESTA OPCIONAL ≤ 20'** = válvula ÁMBAR (solo ÁMBAR / < 6 h / señal §6 anoche; alarma a los 20'; sin café; no sustituye las 7 h; 13:30 Research/Derma igual) | sin descripción |
| ANKI sáb 19:00 | `6ta0e3c019dep76spdgumfm0pl` | **Primera descripción**: deck APEX::USMLE (FSRS 0.90) · **dura lo que marquen las due, ≈20 s/tarjeta** (60→20' · 90→30' · 150→50' · 240→80'), el hueco de 30' no es el límite · **regla del 100 %** (cero backlog el lunes, nunca capar) · minFinde de `anki_telemetria.js` · > 90' = alarma G → cero nuevas · solo repasos (las ≤10 nuevas/día se crean L-V) | sin descripción (la regla vivía solo en el DESAYUNO sáb/dom) |
| ANKI dom 17:00 | `619c1672eej1qgmvddbfkb5fu9` | ídem sábado + "15' es el hueco, no el límite: cuando el mazo pase de ~1.500 tarjetas (nov) se alarga ese día, nunca se salta" | sin descripción |
| DECLARACIONES EKER 04:00 (diaria) | `22bh9m5jhc7ro6aj3m4ffjad7g` | Las 5 frases **intactas** + **6. IDENTIDAD DE EXAMEN** (escrita el 12-sep como "vigente hasta el vie 29-ene-2027"; desde el 19-sep dice "hasta el jue 4-feb-2027, día del examen (target v5.14)"): *"Soy un médico USMLE-ready: cada pregunta ciega es un dato, no un juicio."* + cita de Eker + etiqueta v5.10 | 5 frases 100 % negocio |
| CORRER 06:00 (diaria; sáb/dom caminata) | `5mrm4ru08go9k70408jm8vcjku` | **Primera descripción**: L-V correr 30' / sáb-dom caminata 30' en ayunas · luz de la mañana = señal circadiana (no indoor) · **📲 AL VOLVER (06:45): registrar en VITALS (correr/caminata, 30 min) — 20 s** + por qué (VITALS no modela el cardio AM; tarea D) · ÁMBAR caminar 20' / ROJO dormir · saltarlo "para estudiar" = descompensación (§6) | sin descripción |
| CALISTENIA 06:30 (L-V) | `2lpvftrc3fp64e0om6qg0mcs34` | **Primera descripción**: 15' cuerpo completo · **📲 registrar en VITALS junto con la carrera (una entrada "cardio" 45') — 20 s** · ducha 06:45 → desayuno · ÁMBAR opcional / ROJO no | sin descripción |

No se tocó: SYNAPSE PC sáb/dom (`hv2lk04orquvivthtkfhilb1ps` / `s7r8tiu66286t156l0odpv5nvo`), 🧠 IA 04:15 y misión 12:30 (fuera del alcance de esta pasada; siguen en §11.2 🟡 2). Tampoco se creó el evento de la revisión semanal del sábado 07:15 (decisión de Joseph).

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

### 11.2 · Pendiente REAL al 12-sep-2026 — **SUPERSEDIDO por §13.3** (histórico)
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
- ~~**EKER 04:00** `22bh9m5jhc7ro6aj3m4ffjad7g`: las 5 frases son identidad de negocio; durante las semanas del Step 1 falta una frase de identidad de examen.~~ **RESUELTO 12-sep (tarde)**: frase 6 "IDENTIDAD DE EXAMEN" añadida, las 5 originales intactas (§6.3). Si Joseph prefiere otra redacción, se cambia solo esa línea.
- **Martes**: ALISTARSE 18:30-18:45 (`21lbj9le99k8s9giclm3fauafs`) + VIAJE 18:45-19:00 (`3umsaskrlt1vi5ud3oubmcp504`) le quitan 15' a la Eval USMLE de las 18:00.
- ~~**Hueco 13:15-13:30** sin asignar (el NAP de julio ya no existe en el Calendar).~~ **RESUELTO 12-sep (tarde)** sin crear evento: siesta OPCIONAL ≤ 20' como válvula ÁMBAR, anotada en LECTURA DE LIBRO `7jmf8p1l5b5q6jbtmj9uualiq8` y en PROTOCOLO_MODO_MINIMO §2 (§6.3). En VERDE sigue siendo hueco.

#### ⚪ 6 · Dato de los planes, no del Calendar (para el agente MIR)
`mirDailyPlan.ts` termina el **lun 4-ene-2027 (D78 = corrección)** y `mirMantenimiento.ts` arranca **también el lun 4-ene-2027 (D1, modo reducido)**: solapan 1 día en la franja 15:15-16:15. La serie MIR del Calendar no cambia (es diaria L-V); es el plan el que debe decidir cuál de los dos manda ese lunes. **A VERIFICAR (12-sep).**

## 12 · Registro de cambios en el Calendar (12-sep-2026, tarde · puntos ciegos v3b: burnout, circadiano, finde, VITALS)
Nueve `description` reescritas (detalle y texto en **§6.3**): VIAJE VUELTA `3l59kpei7sg0l6kq51343or383` · DESAYUNO `7agi60f2bp8qnh6cnqvfo22giv` · DEEP PRIME `cb2uh20jnvu7pgfev4183pgctc` · LECTURA DE LIBRO `7jmf8p1l5b5q6jbtmj9uualiq8` · ANKI sáb `6ta0e3c019dep76spdgumfm0pl` · ANKI dom `619c1672eej1qgmvddbfkb5fu9` · EKER `22bh9m5jhc7ro6aj3m4ffjad7g` · CORRER `5mrm4ru08go9k70408jm8vcjku` · CALISTENIA `2lpvftrc3fp64e0om6qg0mcs34`. **Cero eventos creados o borrados, cero cambios de recurrencia u hora.** Verificado con `get_event` antes y después (recurrencias `WEEKLY;BYDAY=…` / `DAILY` / `UNTIL=20270130T045959Z` del DEEP PRIME intactas).
Reglas nuevas que el Calendar materializa desde hoy: **cafeína ≤ 11:00 (2 tomas)** · **siesta opcional ≤ 20' 13:15-13:30 (válvula ÁMBAR)** · **5 señales de burnout §6 en el VIAJE VUELTA** · **Anki de finde = due × 20 s en el propio evento** · **frase de identidad de examen en EKER** · **VITALS al volver de correr/calistenia (20 s)**. Documentos hermanos actualizados el mismo día: `DATA/PROTOCOLO_MODO_MINIMO.md`, `DATA/ENCAPS/RUTINA_EXTREMA_MILITARIZADA.md` (LEY CERO), `DATA/ENCAPS/DOCTRINA_SPRINT_FINAL_EVIDENCIA.md` §6, `DATA/REVISION_SEMANAL.md`, `DATA/SYNC_ANKI_OBSIDIAN_APP.md` (diario USMLE), `DATA/VITALS/LIVIANO_VITALS_BRIDGE.md` (tarea D), vault `01_USMLE/_template_day_usmle.md` + `00_DASHBOARD_USMLE`.
Pendiente que sigue abierto (sin cambios): §11.2 🔴 1 (UNTIL de 7 series), 🟡 2 (SYNAPSE finde con texto de junio), 🟡 3 (`<br>`), 🟡 4 (9 series GYM/BAILE con etiqueta v5.6), ⚪ 5 ALUMUERZO y martes 18:30, ⚪ 6 MIR 4-ene. **Estado vigente del pendiente: §14.3 (15-sep, v5.12).**

---

## 13 · Registro de cambios en el Calendar (14-sep-2026 · corrimiento v5.11)
Corrimiento D1 lun 14-sep → **mar 15-sep** (el lun 14 tampoco se estudió; **10.º corrimiento** desde el 31-ago). **El UWSA1 volvió a cambiar de fecha** (evento suelto `o1gla7846uae4tgngvc4q45osg`): pasó del lun 14-sep 09:00-13:00 al **mar 15-sep 09:00-13:00** (`America/Lima`) y sigue siendo el D1. Los otros 11 overlays USMLE conservan su fecha; cambió su D# (todos −1) y, en ocho de ellos, el texto estructural que dependía de fechas (NBME 29, NBME 30, UWSA2, NBME 31, NBME 32, NBME 33, Free 120 y la línea final "jue 28 descanso" → "jue 28 = D95 = D-1 dentro del plan (sesión mínima AM + ritual)" en los 12). **Novedad de esta pasada: los 12 overlays 🔬 RESEARCH se re-fecharon** (2 días hábiles cada uno; CR-9 solo texto) con `gen_research_calendar.js` (§5.1). En las series solo cambió la **etiqueta de régimen** y las **cifras de cada plan** leídas con `node` de los `.ts` (`usmleStep1Daily`, `vibecodingPlan`, `synapseDailyPlan`, `researchDailyPlan`/`2027`, `dermaDailyPlan`, `aurumDailyPlan`, `mirDailyPlan`, `mirMantenimiento`, `livianoStudyPlan`, `businessStudyPlan`); las cifras de ENCAPS (Supabase) vienen del orquestador.

Método: `get_event` para leer la descripción viva → sustitución del D# y de "D1 = lun 14-sep / v5.10" por "**D1 = mar 15-sep, v5.11, 95 días**", de "jue 28 descanso" por "**jue 28 = D95 = D-1 dentro del plan (sesión mínima AM + ritual)**" ("target vie 29-ene" se mantiene) → `update_event` **solo con el campo `description`** (en el UWSA1, además `startTime`/`endTime`/`timeZone`; en los 12 Research `startTime`/`endTime`/`summary`/`description`/`colorId`/`availability`) → verificación campo a campo sobre la respuesta del `update_event` (devuelve el recurso completo: `start`, `end`, `summary`, `recurrence`, `colorId`, `transparency`, `updated`). **No se tocó ninguna otra hora, ningún título de serie, RRULE, `colorId` ni `transparency`**, no se usó `recurrenceData` (roto para UPDATE) y **no se borró ni recreó ningún evento**. Total: **40 eventos** (12 overlays USMLE + 12 overlays Research + 16 series). Verificación estructural adicional con `list_events` (14-sep → 15-sep): **mar 15-sep = 29 eventos** (13 bloques de estudio + UWSA1 suelto + rutina/comida/GYM+BAILE; el martes ALISTARSE/VIAJE son 18:30/18:45) y **lun 14-sep = 28 eventos, todos series, sin overlay**.

### 13.0 · Los 12 overlays de hito USMLE

| # | Hito · fecha | ID | D# | Otros cambios de texto |
|---|---|---|---|---|
| 1 | UWSA1 **lun 14-sep → mar 15-sep** ⚡ | `o1gla7846uae4tgngvc4q45osg` | D1 → **D1** (sin cambio) | **`start`/`end` movidos** a 2026-09-15 09:00-13:00 `America/Lima` (título, `colorId` 6, `transparency` intactos; `updated` 2026-09-14T18:12:59Z). Primera frase reescrita: "régimen v5.11 (D1 = mar 15-sep, 95 días → D95 = jue 28-ene-2027). **D1 del plan v5.11 (mar 15-sep = baseline el primer día; movido del lun 14)**", "el ÚNICO hito que cambia de fecha en cada corrimiento (vie 11 → lun 14)", el contenido arranca el **mié 16-sep = D2**, "⚠ ya no queda margen: el próximo corrimiento obliga a decidir entre recortar temario o rendir fuera de la ventana (Prometric: reprogramar)"; última línea: "target vie 29-ene, jue 28 = D95 = D-1 dentro del plan (sesión mínima AM + ritual)" |
| 2 | NBME 25 02-oct | `4hjv5lkvluj06ahc2qndtsi6as` | D15 → **D14** | última línea con "target vie 29-ene, jue 28 = D95 = D-1 dentro del plan" (antes no citaba el target) |
| 3 | NBME 26 23-oct | `lr7ktrbiffj4hrlke7lh7cv6h4` | D30 → **D29** | ídem |
| 4 | NBME 27 13-nov | `sm4baa2v453ifaub325h9v08mg` | D45 → **D44** | ídem |
| 5 | NBME 28 04-dic | `ecu784689p8osrhqabuct8d5jg` | D60 → **D59** | ídem |
| 6 | NBME 29 18-dic | `ae93qv0nqqs36h439hid1jcq8o` | D70 → **D69** | "Semana siguiente: **lun 21-dic = D70 cierra Reproductive** (ITS + anticoncepción + amenorreas + SOP); **mar 22 → jue 24-dic = D71-D73**: Musculoskeletal/Rheum íntegro DESPUÉS de este NBME — el corrimiento sigue sin partir el sistema" |
| 7 | NBME 30 30-dic | `mael3p9uhp036jbep45ql6v9oc` | D77 → **D76** | Fase B recalculada (**8-ene→15-ene = D81-D86, 6 días**) y la línea de feriados reescrita: lun 4-ene = **D77** (psicofármacos) · mar 5-ene = **D78** (bioestadística + epidemiología + ética, AMBOSS HY 155Q) · mié 6-ene = **D79** (1.º día doble de bioquímica) · jue 7-ene = **D80** cierra la Fase A (2.º día doble) · Fase B arranca **vie 8-ene = D81 (UWSA2)** y dura 6 días hasta el NBME 31 (**D86**) |
| 8 | UWSA2 08-ene | `2u7viv0elr6aedo0m9undfa5kg` | D82 → **D81** | "arranca la Fase B (D81-D86, 6 días)"; el GO/NO-GO del 15-ene se cita como **NBME 31, D86** |
| 9 | NBME 31 15-ene | `l771lvcfv0jcebt61do6svia18` | D87 → **D86** | "cierra la Fase B (6 días: vie 8-ene = D81 UWSA2 → hoy)"; "CONFIRMAR fecha semana 25-29 ene (**target vie 29-ene; jue 28 = D95 = D-1 dentro del plan (sesión mínima AM + ritual)**)" |
| 10 | NBME 32 18-ene | `h65e772pqsa4hgc5b6bh9n8h50` | D88 → **D87** | "Mañana mar 19-ene (**D88**) es día de banco dentro del sprint: uWorld incorrects 2.ª pasada + sistema débil #3" |
| 11 | NBME 33 20-ene | `la5rsbuiqj1o35lb5adf93abuo` | D90 → **D89** | "Mañana jue 21-ene (**D90**) es día de banco dentro del sprint: uWorld incorrects 2.ª pasada + sistema débil #3; el lun 25 (**D92**) y el mar 26-ene (**D93**) van con uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitades 1 y 2)" (antes decía que el jue 21 era AMBOSS mitad 1: en v5.11 `DIAS[90]` = incorrects 2.ª pasada) |
| 12 | Free 120 22-ene | `lh9jfjsmoif74ci6jcn8f1mq30` | D92 → **D91** | el último día del plan pasa a **jue 28-ene = D95 = D-1, dentro del plan**; "EXAMEN: semana 25-29 ene (**target vie 29-ene**; jue 28 = D95 = D-1 dentro del plan (sesión mínima AM + ritual))"; semana final reescrita: lun 25 = **D92** (incorrects + AMBOSS mitad 1) · mar 26 = **D93** (último día de banco: incorrects + AMBOSS mitad 2) · mié 27 = **D94 = D-2** (repaso FA 6-10 + Anki marathon; taper) · **jue 28 = D95 = D-1 DENTRO del plan** (rapid review FA en sesión mínima AM ≤2 h; tarde ritual de test-day; nada después de las 17:00, cama 21:00) · vie 29 = EXAMEN; "El día de descanso que en la v5.10 quedaba fuera del plan se absorbió con el corrimiento del 15-sep: ya no queda margen" |

Los D# se leyeron con `node` del array `DIAS` de `src/lib/usmleStep1Daily.ts` (95 entradas, D1 = 2026-09-15 → D95 = 2027-01-28, 0 sáb/dom/feriados, D# consecutivos). Los mínimos on-track del texto (≥51/54/57/61/63/65/68 %) no cambiaron.

### 13.1 · Los 12 overlays 🔬 RESEARCH (`gen_research_calendar.js`)
`node DATA/_scripts/gen_research_calendar.js` → 12 `recrear` (11 "creado para <fecha v5.10>" + CR-9 "cambió el texto del átomo") → `update_event` de cada id con el payload íntegro (fecha nueva 13:30-14:15 `America/Lima`, `summary`, `description`, `colorId` 6, `AVAILABILITY_FREE`) → `--set mentor=… carta-diana=… tesis-etica=… carta-1=… cr-caso=… tesis-L0=… revisor2=… cr-paquete=… case-report-1=… equipo=… PROSPERO-SR1=… SR-1=…` → **`--check` = exit 0 (12 hitos · 0 con acción pendiente)**. `DATA/RESEARCH/_calendar_overlays.json` actualizado por el script (fechaCreada + hash nuevos, `registrado: 2026-09-14`). Tabla de fechas viejas/nuevas e ids en **§5.1**. Ningún evento Research se borró ni se creó (los ids del 13-sep se conservan).

### 13.2 · Las 16 series tocadas

| Serie | ID | RRULE (verificada intacta) | Texto viejo → nuevo |
|---|---|---|---|
| IA vibecoding 04:15 | `udr09j9ng983o0d4nipkfe4494` | `WEEKLY;BYDAY=MO-FR` | v5.10 / 60 días lun 14-sep → vie 4-dic / 1.er SHIP 19-sep / último 5-dic / taper lun 7-dic → mié 27-ene → **v5.11 / 60 días L-V en bloques de 5 hábiles mar 15-sep → lun 7-dic-2026 / 1.er SHIP sáb 26-sep / último SHIP sáb 12-dic / S7 deload mar 27-oct → lun 2-nov / taper S13-S20 mar 8-dic → jue 28-ene-2027 en bloques SECUENCIALES de `pasos.length` hábiles (S13 8-14 dic … S20 26-28 ene) / "ni un proyecto ni un paso se fusionó ni se recortó" / 95 días = mismo D# que el Step 1**; "(v5.10-b, 12-sep)" → "(orden v5.10-b del 12-sep, vigente en v5.11)" |
| ANKI AM 05:00 | `i8afj7uppkb3ntj8h9890dhecc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | "95 días desde lun 14-sep hasta mié 27-ene ≈ 594h" → **"régimen v5.11: 95 días desde mar 15-sep hasta jue 28-ene-2027 ≈ 594h; D95 jue 28-ene = D-1 dentro del plan: solo Anki maduro + 20Q flagged ≤2 h por la mañana"**; `&#10;` → saltos de línea reales |
| DEEP PRIME 09:00 | `cb2uh20jnvu7pgfev4183pgctc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | D95 mié 27-ene / A D1-D80 · B D81-D87 · C D88-D95 / NBME 31 = D87 / jue 28 descanso → **D95 jue 28-ene / A D1-D80 · B D81-D86 · C D87-D95 / NBME 31 = D86 / jue 28 = D95 = D-1 dentro del plan (sesión mínima AM + ritual) / "el D1 (mar 15-sep) es el UWSA1 … único hito que cambia de fecha en cada corrimiento (vie 11 → lun 14 → mar 15-sep)" / contenido arranca mié 16-sep (D2) / "⚠ ya no queda margen…" / "su contenido ya es v5.11"** |
| SYNAPSE 12:30 | `j99thg3eaqesosmvppj4rfgvh4` | `WEEKLY;BYDAY=MO-FR` | 131 días lun 14-sep → vie 22-ene / F2 sem 13-19 → **131 días · 19 semanas · mar 15-sep → sáb 23-ene-2027 (sem 1 corta; última A-unit en el sábado previo a la semana del examen; 110 A-units intactas) / F2 sem 13-19 (lun 7-dic → sáb 23-ene)** |
| Research↔Derma 13:30 | `3ofg2ljv8kl3p1adm2e5d5nih3` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | mapa lun 14 RESEARCH (D1) · mar 15 DERMA (d1) · mié 16 RESEARCH (D2) … → **mar 15 DERMA (d1) · mié 16 RESEARCH (D1) · jue 17 DERMA (d2) · vie 18 RESEARCH (D2) · lun 21 DERMA (d3) · mar 22 RESEARCH (D3 · hito M1) · mié 23 DERMA (d4) · jue 24 RESEARCH (D4)**; Research 42 átomos lun 14-sep → mar 9-feb (D38 29-dic / D39 1-feb) → **ciclo 1 = 42 átomos mié 16-sep → jue 11-feb-2027 (corrió 2 hábiles; D37 mar 29-dic → pausa → D38 lun 1-feb = CR-9) + ciclo 2 = 67 átomos lun 15-feb → mié 18-ago-2027**; Derma 70 sesiones → mar 30-mar → **73 sesiones mar 15-sep → mié 7-abr-2027 SIN cambio (taper d44-d49; ciclo 2 d74-d103 vie 9-abr → mié 30-jun)**; + "los 12 hitos Research llevan overlay naranja 🔬 (13:30-14:15, FREE)" |
| AURUM 14:15 | `at1nak8f24nbnj1mh2jcd4aggg` | `WEEKLY;BYDAY=MO-FR` | D1 lun 14-sep → D130 mié 17-mar → **D1 mar 15-sep → D130 jue 18-mar-2027 + pitches v1 D15 lun 5-oct · v2 D35 lun 2-nov · v3 D55 lun 30-nov · v4 D75 mar 29-dic · v5 D95 jue 28-ene · v6 D115 jue 25-feb · v7 D130 jue 18-mar** |
| MIR eval 15:15 | `2ldp6obaapnvo76li28uprrddg` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | 78 días (lun 14-sep → lun 4-ene) / mantenimiento 63 días 4-ene→31-mar / reducido hasta el 27-ene / jue 28 descanso → **78 días (mar 15-sep → mar 5-ene-2027: 76 temas + D77 lun 4-ene mini-MIR 40Q + D78 mar 5-ene corrección) / mantenimiento 61 días mié 6-ene → mié 31-mar-2027 (cierre fijo clavado al ENCAPS: −1 slot lun-jue por corrimiento, cuotas re-balanceadas por peso; Tier C express los jueves) / modo reducido hasta el jue 28-ene / jue 28 = D95 = D-1 dentro del plan** |
| MIR deep work 15:30 | `00k364heibh1n6f9hfspcv9dpi` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | "≈310 cards al lun 4-ene-2027 … (63 días, modo reducido hasta el 27-ene)" → **"≈310 cards al mar 5-ene-2027 (76 temas + D77 lun 4-ene mini-MIR + D78 mar 5-ene corrección); del mié 6-ene al mié 31-mar-2027 … (61 días, cierre fijo clavado al ENCAPS; modo reducido hasta el jue 28-ene)"** + etiqueta v5.11 |
| ENCAPS 16:15 | `papebi46etlo8glgfs5akd5mig` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | 97 días lun 14-sep / 79 banqueo + 18 mini-sims / backup `bk_0912` / "98 → 97" / intensiva = día 98 → **96 días mar 15-sep → vie 29-ene-2027 (78 de banqueo + 18 mini-sims de viernes, la primera el vie 18-sep) / backup `study_schedule_bk_0914` (bk_0912/0910/0909/0908 intactos) / "97 → 96 (la sesión que cae es la del lun 14-sep, II-3 esquema, que ahora es el D1 del mar 15)" / PRE-TEST DE ARRANQUE 40Q: mar 15-sep parte 1 (II-3 · I-3 · V-2 · III-5) + mié 16-sep parte 2 (II-5 · I-4 · IV-1+IV-2 · II-4), ficheros `BANCO_PROPIO/pretest_arranque_2026-09-15/16.html` / intensiva lun 1-feb = día 97 / "su contenido ya es v5.11"**; `&#10;` → saltos de línea reales |
| LIVIANO 17:15 | `8epae6hlfmrc9j0h2kib7iuc84` | `WEEKLY;BYDAY=MO-FR` | 90 días lun 14-sep → mié 20-ene → **90 días mar 15-sep → jue 21-ene-2027; drills D37 mié 4-nov · D58 jue 3-dic · D76 mié 30-dic · D88 mar 19-ene; revisión trimestral I D46 mar 17-nov · II D90 jue 21-ene; caso integral 16/16 D86 vie 15-ene; capstone D89 mié 20-ene** (16 casos y 18 pre-tests sin cambio) |
| DESAYUNO L-V 07:00 · DESAYUNO sáb/dom 06:45 · ALUMUERZO 12:00 | `7agi60f2bp8qnh6cnqvfo22giv` · `2u9je70pif58hgf2f8t3vgu8b8` · `43dq3oib16esjcqj1dcd8osot2` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` · `WEEKLY;WKST=SU;BYDAY=SA,SU` · `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | solo la etiqueta: **"Régimen v5.11 (D1 = mar 15-sep-2026)"**; en ALUMUERZO además "(v5.11: el UWSA1 cae en MARTES 15-sep = D1, misma regla)" en la línea de viernes de hito |
| BAILE mié · sáb · dom | `0tod56pc6pgecm5lf7g4e3ji9v` · `3jkfb6097rtc1jbec19eg3sd57` · `7j6pucil43vuca70p082g5ub3d` | `WEEKLY;BYDAY=WE` · `BYDAY=SA` · `BYDAY=SU` | solo la etiqueta: **"Régimen v5.11 (D1 = mar 15-sep-2026)"** |

*(la fila de DESAYUNO/ALMUERZO agrupa 3 eventos y la de BAILE otros 3: 6 series de rutina + 10 de estudio/secundarias = 16 series tocadas)*

**⏸ Leídas y NO tocadas (4):** **repaso 07:15** `54lchqggik96dmljmmg3l88s54` · **pre-test 08:15** `3tbecd5n03ut6lno3hjvc1sr7k` · **30Q 11:00** `2eqmmrnh00jr44plevurgcu2as` · **eval 18:00** `utk2laeob9u0847bbe9rm491v4`. Ninguna cita la versión del régimen, D1 ni el nº de días → no había nada que corregir (mismo criterio que el 08/09/10/12-sep).

**Balance del día 14-sep-2026: 39 descripciones reescritas + 1 evento movido de fecha (el UWSA1) + 12 eventos Research re-fechados (dentro de esas 39).** Cero eventos creados, borrados o recreados; cero cambios de título de serie, color, `transparency` o recurrencia; horas cambiadas solo en el UWSA1 (lun 14 → mar 15, 09:00-13:00 en ambos casos) y en los 12 overlays Research (+2 hábiles, 13:30-14:15 en todos).

### 13.3 · Pendiente REAL al 14-sep-2026 — **SUPERSEDIDO por §14.3** (histórico)
**Ya están al día en v5.11**: los 12 overlays USMLE (UWSA1 ya en el mar 15) · los 12 overlays Research (`--check` = 0) · vibecoding 04:15 · ANKI AM 05:00 · DEEP PRIME 09:00 · SYNAPSE 12:30 · Research↔Derma 13:30 · AURUM 14:15 · MIR 15:15 y 15:30 · ENCAPS 16:15 · LIVIANO 17:15 · DESAYUNO L-V · DESAYUNO sáb/dom · ALUMUERZO · BAILE mié/sáb/dom.

#### 🔴 1 · RRULE con `UNTIL=20270130T045959Z` (= vie 29-ene-2027 23:59:59 Lima) — **7 series L-V** · AVISO VIGENTE
**SIGUE VIGENTE Y SIN RESOLVER** (reconfirmado el 14-sep en la respuesta de cada `update_event`: ANKI AM, repaso 07:15, pre-test 08:15, DEEP PRIME, 30Q, ENCAPS y eval 18:00 conservan `RRULE:FREQ=WEEKLY;UNTIL=20270130T045959Z;BYDAY=MO,TU,WE,TH,FR`; ninguna de las 40 escrituras de hoy tocó la recurrencia).

| Serie | ID | Qué pasa después del vie 29-ene-2027 |
|---|---|---|
| **ENCAPS 16:15** | `papebi46etlo8glgfs5akd5mig` | 🔴 **BLOQUEANTE.** El mantenimiento v5.11 termina exactamente el vie 29-ene (día 96) y la **fase intensiva ENCAPS arranca el lun 1-feb-2027** (ahora **día 97**, porque el mantenimiento bajó de 97 a 96 días); la serie **ya no genera eventos** desde ese lunes → hay que **extender la recurrencia ANTES del 1-feb-2027** |
| ANKI AM 05:00 | `i8afj7uppkb3ntj8h9890dhecc` | franja vacía desde el lun 1-feb |
| Repaso 07:15 | `54lchqggik96dmljmmg3l88s54` | franja vacía desde el lun 1-feb |
| Pre-test 08:15 | `3tbecd5n03ut6lno3hjvc1sr7k` | franja vacía desde el lun 1-feb |
| DEEP PRIME 09:00 | `cb2uh20jnvu7pgfev4183pgctc` | franja vacía desde el lun 1-feb |
| 30Q 11:00 | `2eqmmrnh00jr44plevurgcu2as` | franja vacía desde el lun 1-feb |
| Eval USMLE 18:00 | `utk2laeob9u0847bbe9rm491v4` | franja vacía desde el lun 1-feb |

Las **6 series USMLE** siguen expirando de forma **coherente** con el plan v5.11 (**D95 = jue 28-ene-2027**, examen target **vie 29-ene** = el mismo día del `UNTIL`): ahí no hay error, hay que **decidir qué ocupa esas 6 franjas** cuando ENCAPS vuelva a bloque principal en feb-mar 2027. **La única que sí es un fallo funcional es ENCAPS 16:15.** ⚠ **Con v5.11 el D95 ya toca el borde: si un futuro corrimiento empujara el plan más allá del jue 28-ene, el D95 caería sobre el examen o fuera de la ventana** (decisión de Joseph: recortar temario o reprogramar en Prometric) **y las 6 series USMLE también quedarían cortas** → revisar el `UNTIL` en cada corrimiento.

⚠ **Cómo hacerlo:** extender un `UNTIL` implica tocar la recurrencia, y el MCP de Google Calendar tiene `recurrenceData` **roto para UPDATE** → hacerlo desde la UI de Google Calendar, o **`delete_event` de la serie + `create_event`** (en CREATE sí funciona), **guardando antes la `description` completa** (la de v5.11, §13.2 / texto vivo) para no perderla. **Fecha límite: antes del lun 1-feb-2027.**

#### 🟡 2 · SYNAPSE de fin de semana con texto de junio (sin cambios desde el 09-sep)
`hv2lk04orquvivthtkfhilb1ps` (sáb 15:00-17:00) y `s7r8tiu66286t156l0odpv5nvo` (dom 15:00-17:00) siguen con la descripción del 10-jun (CS50P, synapse-journal, "la serie arranca el 28-jun"). **Contradicen** el texto vivo de las 04:15 y de las 12:30 (sáb 15:00-17:00 = SHIP del proyecto de vibecoding; el 1.er SHIP es ahora el sáb 26-sep, no el 19). → reescribir solo `description`. No entraban en el alcance del 14-sep.

#### 🟡 3 · `<br>` escapados como texto
`&lt;br&gt;` sigue visible en SYNAPSE 12:30 (`j99thg3eaqesosmvppj4rfgvh4`), SYNAPSE PC sábado y SYNAPSE domingo. Se conserva tal cual a propósito. Limpieza cosmética, sin urgencia. (Los `&#10;` de ANKI AM y ENCAPS sí se reescribieron hoy como saltos de línea reales al reemplazar la descripción completa.)

#### 🟡 4 · 9 series de GYM/BAILE con etiqueta "Régimen v5.6" (detectado el 12-sep)
Sin cambios: solo se actualizan las 3 series BAILE mié/sáb/dom; las **otras 9 series de GYM y BAILE del §2** conservan la descripción común del 05-sep con "Régimen v5.6". Es solo la etiqueta → reescribir solo `description` con "Régimen v5.11 (D1 = mar 15-sep-2026)". **A VERIFICAR (14-sep)** (no releídas hoy).

#### 🟡 5 · Textos fijos de `gen_research_calendar.js` desfasados (detectado el 14-sep)
✅ RESUELTO (14-sep, tarde): `DEADLINE['equipo']` dice "antes del registro R10 (23-feb-2027)" (R10 es ahora el jue 25-feb) y `DEADLINE['cr-paquete']` "pausa Step 1 (4→29-ene)". Viven en `DATA/_scripts/` (fuera del alcance de esta pasada) y se propagan a los overlays X-9 y CR-8. Corregir el script → regenerar → 2 `recrear` → `update_event` → `--set` → `--check`.

#### ⚪ 6 · Decisiones de Joseph, no bugs (no se tocan sin su OK)
- Título **"ALUMUERZO"** (typo) — `43dq3oib16esjcqj1dcd8osot2`.
- **Martes**: ALISTARSE 18:30-18:45 (`21lbj9le99k8s9giclm3fauafs`) + VIAJE 18:45-19:00 (`3umsaskrlt1vi5ud3oubmcp504`) le quitan 15' a la Eval USMLE de las 18:00 — **y el D1 (UWSA1) cae en martes**: la revisión del sim en la franja 18:00 se corta a las 18:30 ese día.
- **Derma d49 = vie 29-ene-2027 = día del examen** (`dermaDailyPlan.ts`): el taper d44-d49 llega hasta el mismo viernes del Step 1. Dato del plan, no del Calendar (la serie Research↔Derma es L-V). **A VERIFICAR (14-sep)** con el agente Derma.

#### ⚪ 7 · Dato de los planes, no del Calendar
- `synapseDailyPlan.ts`: ✅ RESUELTO (14-sep, tarde): la cabecera y la A-unit d131 se regeneraron desde `gen_synapse_plan.js` (FIN_PLAN = sáb 23-ene-2027); ya no citan el vie 22-ene.
- ~~MIR 4-ene solapado~~ **RESUELTO en v5.11**: `mirDailyPlan.ts` termina el mar 5-ene (D78) y `mirMantenimiento.ts` arranca el mié 6-ene → ya no solapan.

---

## 14 · Registro de cambios en el Calendar (15-sep-2026 · corrimiento v5.12)
Corrimiento D1 mar 15-sep → **mié 16-sep** (el mar 15 tampoco se estudió; **11.º corrimiento** desde el 31-ago, **12 hábiles perdidos**). **El UWSA1 volvió a cambiar de fecha** (evento suelto `o1gla7846uae4tgngvc4q45osg`): pasó del mar 15-sep 09:00-13:00 al **mié 16-sep 09:00-13:00** (`America/Lima`) y sigue siendo el D1. Los otros 11 overlays USMLE conservan su fecha; cambió su D# (todos −1) y, en siete de ellos, el texto estructural que dependía de fechas (NBME 29, NBME 30, UWSA2, NBME 31, NBME 32, NBME 33, Free 120) y en los 12 la línea final "target vie 29-ene, jue 28 = D95 = D-1 dentro del plan" → "**D95 = vie 29-ene última sesión · sáb 30 y dom 31 descanso fuera del plan · EXAMEN lun 1-feb-2027 (target v5.12, fuera de la ventana: agendar/reprogramar Prometric)**". **Novedad de esta pasada: overlay NUEVO del EXAMEN** (`create_event`, §14.1). **Los 12 overlays 🔬 RESEARCH no cambian** (el 16-sep ya era el D1 de Research). En las series cambió la **etiqueta de régimen** y las **cifras de cada plan** leídas con `node` de los `.ts` el 15-sep (`usmleStep1Daily`, `vibecodingPlan`, `synapseDailyPlan`, `researchDailyPlan`/`2027`, `dermaDailyPlan`/`dermaCiclo2`, `aurumDailyPlan`, `mirDailyPlan`, `mirMantenimiento`, `livianoStudyPlan`); las cifras de ENCAPS (Supabase) vienen del orquestador.

Método: `get_event` para leer la descripción viva → sustitución del D# y de "D1 = mar 15-sep / v5.11" por "**D1 = mié 16-sep, v5.12, 95 días**" y de la línea del cierre por la de v5.12 → `update_event` **solo con el campo `description`** (en el UWSA1, además `startTime`/`endTime`/`timeZone`) → verificación campo a campo sobre la respuesta del `update_event` (devuelve el recurso completo: `start`, `end`, `summary`, `recurrence`, `colorId`, `transparency`, `updated`); en el UWSA1 además `get_event` posterior. **No se tocó ninguna otra hora, ningún título de serie, RRULE, `colorId` ni `transparency`**, no se usó `recurrenceData` (roto para UPDATE) y **no se borró ni recreó ningún evento**. Total: **36 eventos** (12 overlays USMLE + 1 overlay nuevo + 23 series). Verificación estructural adicional con `list_events`: **mié 16-sep = 29 eventos** (13 bloques de estudio + UWSA1 suelto + rutina/comida/BAILE) · **mar 15-sep = 29 eventos, todos series, sin overlay** · **vie 29-ene-2027 = 28 eventos** (las 7 series `UNTIL` presentes, último día) · **sáb 30-ene = 12 · dom 31-ene = 13** (rutina de finde) · **lun 1-feb-2027 = 23 eventos** (overlay EXAMEN + overlay 🔬 CR-9 + series secundarias; ninguna de las 7 series USMLE/ENCAPS) · **mar 2-feb = 21 eventos** (sin ENCAPS: la serie expiró).

### 14.0 · Los 12 overlays de hito USMLE

| # | Hito · fecha | ID | D# | Otros cambios de texto |
|---|---|---|---|---|
| 1 | UWSA1 **mar 15-sep → mié 16-sep** ⚡ | `o1gla7846uae4tgngvc4q45osg` | D1 → **D1** (sin cambio) | **`start`/`end` movidos** a 2026-09-16 09:00-13:00 `America/Lima` (título, `colorId` 6, `transparency` intactos; `updated` 2026-09-15T16:09:16Z; `get_event` de verificación OK). Primera frase reescrita: "régimen v5.12 (D1 = mié 16-sep, 95 días → D95 = vie 29-ene-2027). **D1 del plan v5.12 (mié 16-sep = baseline el primer día; movido del mar 15)**", "vie 11 → lun 14 → mar 15-sep", el contenido arranca el **jue 17-sep = D2**, "⚠ CONSECUENCIA v5.12: el plan de 95 días llena TODA la ventana de examen (D95 = vie 29-ene = última sesión) → el examen SALE de la ventana 25-29 ene: TARGET LUN 1-FEB-2027 (agendar/reprogramar Prometric y confirmar eligibility period; si no: extenderlo o recortar temario — decisión de Joseph). Sáb 30 = D-2 y dom 31-ene = D-1 fuera del plan. Desde aquí cada día no estudiado mueve el examen un hábil más"; última línea v5.12 |
| 2 | NBME 25 02-oct | `4hjv5lkvluj06ahc2qndtsi6as` | D14 → **D13** | última línea v5.12 |
| 3 | NBME 26 23-oct | `lr7ktrbiffj4hrlke7lh7cv6h4` | D29 → **D28** | ídem |
| 4 | NBME 27 13-nov | `sm4baa2v453ifaub325h9v08mg` | D44 → **D43** | ídem |
| 5 | NBME 28 04-dic | `ecu784689p8osrhqabuct8d5jg` | D59 → **D58** | ídem |
| 6 | NBME 29 18-dic | `ae93qv0nqqs36h439hid1jcq8o` | D69 → **D68** | "Semana siguiente: **lun 21-dic = D69** (mama + aparato masculino + próstata) y **mar 22-dic = D70 cierra Reproductive** (ITS + anticoncepción + amenorreas + SOP); **mié 23 → lun 28-dic = D71-D73** (el vie 25-dic es libre): Musculoskeletal/Rheum íntegro DESPUÉS de este NBME" |
| 7 | NBME 30 30-dic | `mael3p9uhp036jbep45ql6v9oc` | D76 → **D75** | Primera frase: "Último NBME de la Fase A (D75…; en v5.12 la Fase A se alarga hasta el lun 11-ene = D81, así que tras este NBME quedan 5 días de contenido + el UWSA2)"; Fase B = **mar 12-ene → vie 15-ene = D82-D85, 4 días**; línea de feriados reescrita: lun 4-ene = **D76** (ansiedad + personalidad + infancia + sustancias) · mar 5-ene = **D77** (psicofármacos) · mié 6-ene = **D78** (biostats) · jue 7-ene = **D79** (bioquímica 1) · vie 8-ene = **D80 = UWSA2, DENTRO de la Fase A** · lun 11-ene = **D81** cierra la Fase A (bioquímica 2) · Fase B arranca mar 12-ene (D82), 4 días hasta el NBME 31 (**D85**). El título "CIERRE FASE A" no se tocó (regla: títulos intactos) |
| 8 | UWSA2 08-ene | `2u7viv0elr6aedo0m9undfa5kg` | D81 → **D80** | "cae DENTRO de la Fase A: el lun 11-ene (D81) cierra Bioquímica y la Fase B arranca el mar 12-ene (D82-D85, 4 días, hasta el NBME 31 del vie 15-ene = D85)"; el GO/NO-GO se cita como **NBME 31, D85** |
| 9 | NBME 31 15-ene | `l771lvcfv0jcebt61do6svia18` | D86 → **D85** | "cierra la Fase B (4 días: mar 12-ene = D82 → hoy; el UWSA2 del vie 8-ene = D80 cayó dentro de la Fase A)"; "CONFIRMAR la fecha de examen (D95 = vie 29-ene última sesión · sáb 30 y dom 31 descanso fuera del plan · EXAMEN lun 1-feb-2027…)"; "GO → confirmar en Prometric (lun 1-feb)"; "confirmar que el eligibility period lo cubre" |
| 10 | NBME 32 18-ene | `h65e772pqsa4hgc5b6bh9n8h50` | D87 → **D86** | "Mañana mar 19-ene (**D87**) es día de banco dentro del sprint: random timed 2×40Q + revisión + sistema débil #2 (Mehlman HY del sistema)" (en v5.12 `DIAS[86]` = random timed, no incorrects) |
| 11 | NBME 33 20-ene | `la5rsbuiqj1o35lb5adf93abuo` | D89 → **D88** | "Mañana jue 21-ene (**D89**): uWorld incorrects 2.ª pasada + sistema débil #3; el lun 25-ene (**D91**) repite incorrects 2.ª pasada + sistema débil #3; el mar 26 (**D92**) y el mié 27-ene (**D93**) van con uWorld incorrects + AMBOSS 200 Concepts Step 1 (mitades 1 y 2)" |
| 12 | Free 120 22-ene | `lh9jfjsmoif74ci6jcn8f1mq30` | D91 → **D90** | "el último día del plan es el vie 29-ene = D95 = última sesión, D-3"; EXAMEN v5.12 en la primera línea; "como si fuera el lunes 1-feb"; checklist logístico + "cita de Prometric confirmada para el lun 1-feb (o la fecha reprogramada) y eligibility period que la cubre"; semana final reescrita: lun 25 = **D91** (incorrects 2.ª pasada + sistema débil #3) · mar 26 = **D92** (incorrects + AMBOSS mitad 1) · mié 27 = **D93** (último día de banco: incorrects + AMBOSS mitad 2) · jue 28 = **D94 = D-4** (repaso FA 6-10 + Anki marathon; taper) · **vie 29 = D95 = D-3 = ÚLTIMA SESIÓN** (rapid review FA, sesión ligera; tarde: permiso, 2 ID, Ziploc Break #1-#4, ruta) · sáb 30 = D-2 y dom 31 = D-1 FUERA del plan (solo Anki vencido, nada después de las 17:00 del domingo) · lun 1-feb = EXAMEN; "Con el corrimiento del 16-sep el plan llenó toda la ventana 25-29 ene: el examen sale de ella y cada día más sin estudiar lo mueve un hábil" |

Los D# se leyeron con `node` del array `DIAS` de `src/lib/usmleStep1Daily.ts` (95 entradas, D1 = 2026-09-16 → D95 = 2027-01-29, 0 sáb/dom/feriados, D# consecutivos). Los mínimos on-track del texto (≥51/54/57/61/63/65/68 %) no cambiaron.

### 14.1 · Overlay NUEVO del EXAMEN (`create_event`, 15-sep-2026)
| Campo | Valor |
|---|---|
| **ID** | **`oinh139dsnbuma9r3kfu56dhkc`** (guardado aquí; `created`/`updated` 2026-09-15T16:13:18Z) |
| Fecha · hora | **lun 1-feb-2027 · 07:00-16:00** `America/Lima` |
| Título literal | 🎯 USMLE STEP 1 · EXAMEN (target v5.12 — agendar en Prometric) |
| `colorId` · `transparency` | 6 (naranja) · `transparent` (AVAILABILITY_FREE: no bloquea; **no es la cita real** — la cita la crea Prometric) |
| Recurrencia | ninguna (evento suelto) |
| Descripción (resumen fiel) | target v5.12 tras 12 hábiles perdidos (31-ago → 15-sep); el plan de 95 días llena toda la ventana 25-29 ene → primer hábil después del D95; ⚠ Joseph: agendar/reprogramar Prometric y confirmar que el eligibility period cubre el 1-feb (si no: extenderlo o recortar temario — decisión suya, en `DATA/PENDIENTES_JOSEPH.md`); regla de no fusionar/recortar; "cada día más sin estudiar mueve esta fecha un hábil". **Los 3 días previos**: vie 29-ene = D95 = D-3 última sesión (ligera + tarde de logística) · sáb 30 = D-2 fuera del plan (solo Anki vencido) · dom 31 = D-1 fuera del plan (`USMLE_TAPER.dMenos1`: solo Anki vencido; prohibido banco/temas densos/First Aid; nada después de las 17:00; ritual: permiso impreso + digital, 2 ID con el nombre EXACTO, Ziploc Break #1-#4 proteína > carbohidratos, somnífero nunca por primera vez, alarma doble + ruta, cama temprano). **Protocolo de test-day de Palmerton §8.4** (`PALMERTON_METODO_COMPLETO.md`): desayuno proteína/grasa sin carbohidratos simples, café de siempre; llegar 30' antes; tutorial → +15' de descanso (60 en vez de 45); bloques 1-2 → 10' · 3-4 → 10' · 5 → almuerzo 20-30' · 6 → 10' · 7 → fin; NUNCA revisar entre bloques ni abrir First Aid; nunca salir a mitad de bloque; sit-in breaks; stress strategy y protocolo de pánico; post-test premio + registrar en la app. **Contexto**: GO/NO-GO vie 15-ene (NBME 31 = D85); NO-GO → mover 2-4 semanas; coincide con CR-9 SUBMIT (mover al mar 2-feb es decisión de Joseph) y con el arranque teórico de la fase intensiva ENCAPS (propuesta mar 2-feb). Etiqueta "Régimen v5.12 (D1 = mié 16-sep-2026)" |
| Mantenimiento | En cada corrimiento futuro este overlay **se mueve +1 hábil** (`update_event` con `startTime`/`endTime`) o Joseph decide recortar temario; cuando exista la cita real de Prometric, anotar aquí su fecha/hora y dejar este overlay como recordatorio o borrarlo (decisión de Joseph) |

### 14.2 · Las 23 series tocadas (solo `description`)

| Serie | ID | RRULE (verificada intacta) | Texto viejo → nuevo |
|---|---|---|---|
| IA vibecoding 04:15 | `udr09j9ng983o0d4nipkfe4494` | `WEEKLY;BYDAY=MO-FR` | v5.11 / mar 15-sep → lun 7-dic / S7 mar 27-oct → lun 2-nov / taper mar 8-dic → jue 28-ene (S13 8-14 dic … S20 26-28 ene) → **v5.12 / mié 16-sep → mar 8-dic-2026 / 12 SHIP sábados listados (26-sep … 12-dic) / S7 deload mié 28-oct → mar 3-nov / taper S13-S20 mié 9-dic → vie 29-ene-2027 (S13 9-15 dic · S14 16-22 dic · S15 23-29 dic (4) · S16 30-dic→5-ene (3) · S17 6-12 ene · S18 13-19 ene · S19 20-26 ene · S20 27-29 ene (3)) / "S20 = última semana del plan, solo journal" / D95 = vie 29-ene última sesión · sáb 30 y dom 31 descanso · EXAMEN lun 1-feb-2027**; "(vigente en v5.11)" → "(vigente en v5.12)" |
| ANKI AM 05:00 | `i8afj7uppkb3ntj8h9890dhecc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | "régimen v5.11: 95 días desde mar 15-sep hasta jue 28-ene-2027 ≈ 594h; D95 jue 28-ene = D-1 dentro del plan…" → **"régimen v5.12: 95 días desde mié 16-sep hasta vie 29-ene-2027 ≈ 594h; D95 = vie 29-ene última sesión (solo Anki maduro + 20Q flagged, sesión ligera) · sáb 30 y dom 31 descanso fuera del plan (solo Anki vencido) · EXAMEN lun 1-feb-2027 (target v5.12, fuera de la ventana: agendar/reprogramar Prometric)"** |
| DEEP PRIME 09:00 | `cb2uh20jnvu7pgfev4183pgctc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | v5.11 / D95 jue 28-ene / A D1-D80 · B D81-D86 · C D87-D95 / "vie 11 → lun 14 → mar 15-sep" / contenido mié 16-sep (D2) / "jue 28-ene = D95 = D-1 dentro del plan" / examen 25-29 ene target vie 29 / NBME 31 = D86 → **v5.12 / D95 vie 29-ene / A D1-D81 (16-sep → lun 11-ene; UWSA2 D80 dentro de la Fase A) · B D82-D85 (12→15-ene) · C D86-D95 (18→29-ene) / "vie 11 → lun 14 → mar 15 → mié 16-sep" / contenido jue 17-sep (D2) / "⚠ CONSECUENCIA v5.12: el plan llena TODA la ventana 25-29 ene → D95 = vie 29-ene última sesión · sáb 30 y dom 31 descanso fuera del plan · EXAMEN lun 1-feb-2027 (agendar/reprogramar Prometric y confirmar eligibility period). Desde aquí cada día no estudiado mueve el examen un hábil más (o exige recortar temario: decisión de Joseph)" / NBME 31 = D85 / "su contenido ya es v5.12"** |
| SYNAPSE 12:30 | `j99thg3eaqesosmvppj4rfgvh4` | `WEEKLY;BYDAY=MO-FR` | 131 días · mar 15-sep → sáb 23-ene / F2 → sáb 23-ene / "Semana del examen (25-29 ene): sin SYNAPSE" → **132 días · 19 semanas · mié 16-sep → lun 25-ene-2027 (sem 1 corta de 5 días; sem 19 hasta el lun 25-ene; última A-unit el lunes de la última semana del plan, 4 días antes del D95; 110 A-units intactas) / F2 sem 13-19 (lun 7-dic → lun 25-ene) / "Del mar 26 al vie 29-ene (D92-D95) y el finde 30-31 (descanso pre-examen): sin SYNAPSE. EXAMEN Step 1 lun 1-feb-2027"** |
| Research↔Derma 13:30 | `3ofg2ljv8kl3p1adm2e5d5nih3` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | mapa mar 15 DERMA (d1) · mié 16 RESEARCH (D1) · jue 17 DERMA (d2) … → **mié 16 RESEARCH (D1) · jue 17 DERMA (d1) · vie 18 RESEARCH (D2) · lun 21 DERMA (d2) · mar 22 RESEARCH (D3 · M1) · mié 23 DERMA (d3) · jue 24 RESEARCH (D4) · vie 25 DERMA (d4)**; Research ciclo 1 **SIN cambio** (+ "D38 lun 1-feb = CR-9 ⚠ coincide con el día del examen; moverlo al mar 2-feb es decisión de Joseph"); Derma 73 sesiones mar 15-sep → mié 7-abr / taper d44-d49 "entre el NBME 31 y el examen" / ciclo 2 vie 9-abr → mié 30-jun → **73 sesiones jue 17-sep → vie 9-abr-2027 (corrió 2 hábiles; taper d44-d49 mar 19-ene → mar 2-feb; vie 15-ene = d43 sesión normal; ciclo 2 d74-d103 mar 13-abr → vie 2-jul-2027)**; "EXAMEN Step 1: lun 1-feb-2027" |
| AURUM 14:15 | `at1nak8f24nbnj1mh2jcd4aggg` | `WEEKLY;BYDAY=MO-FR` | D1 mar 15-sep → D130 jue 18-mar; pitches lun 5-oct … jue 18-mar → **D1 mié 16-sep → D130 vie 19-mar-2027; pitches v1 D15 mar 6-oct · v2 D35 mar 3-nov · v3 D55 mar 1-dic · v4 D75 mié 30-dic · v5 D95 vie 29-ene · v6 D115 vie 26-feb · v7 D130 vie 19-mar** |
| MIR eval 15:15 | `2ldp6obaapnvo76li28uprrddg` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | 78 días mar 15-sep → mar 5-ene (D77 lun 4 · D78 mar 5) / mantenimiento 61 días mié 6-ene → 31-mar / reducido hasta jue 28-ene / examen 25-29 ene target vie 29 → **78 días mié 16-sep → mié 6-ene-2027 (D77 mar 5-ene mini-MIR · D78 mié 6-ene corrección) / mantenimiento 60 días jue 7-ene → mié 31-mar-2027 (48 lun-jue + 12 viernes) / modo reducido hasta el vie 29-ene / D95 = vie 29-ene última sesión · sáb 30 y dom 31 descanso · EXAMEN lun 1-feb-2027 / "su contenido ya es v5.12"** |
| MIR deep work 15:30 | `00k364heibh1n6f9hfspcv9dpi` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | "≈310 cards al mar 5-ene-2027 … (61 días…; modo reducido hasta el jue 28-ene)" + v5.11 → **"≈310 cards al mié 6-ene-2027 (76 temas + D77 mar 5-ene mini-MIR + D78 mié 6-ene corrección); del jue 7-ene al mié 31-mar-2027 … (60 días = 48 lun-jue + 12 viernes; modo reducido hasta el vie 29-ene = D95 última sesión del Step 1; EXAMEN Step 1 lun 1-feb-2027)"** + etiqueta v5.12 |
| ENCAPS 16:15 | `papebi46etlo8glgfs5akd5mig` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | 96 días mar 15-sep / 78 banqueo + 18 mini-sims / backup `bk_0914` / "97 → 96 (lun 14-sep)" / pre-test mar 15 + mié 16 (`…09-15/16.html`) / "intensiva NO se mueve: lun 1-feb, día 97" → **95 días mié 16-sep → vie 29-ene-2027 / 77 banqueo + 18 mini-sims (1.ª vie 18-sep) / backup `study_schedule_bk_0915` (bk_0914/0912/0910/0909/0908 intactos) / "96 → 95 (la sesión que cae es la del mar 15-sep)" / pre-test mié 16-sep parte 1 + jue 17-sep parte 2 (`pretest_arranque_2026-09-16/17.html`) / "⚠ la fase intensiva arrancaría en el día 96 = lun 1-feb-2027 = DÍA DEL EXAMEN → propuesta mar 2-feb (`gen_encaps_intensivo_2027.js 2027-02-02`; decisión de Joseph)" / "su contenido ya es v5.12"** |
| LIVIANO 17:15 | `8epae6hlfmrc9j0h2kib7iuc84` | `WEEKLY;BYDAY=MO-FR` | 90 días mar 15-sep → jue 21-ene; drills D37/D58/D76/D88; trimestral D46/D90; caso integral D86 vie 15-ene; capstone D89 → **90 días mié 16-sep → vie 22-ene-2027; drills D36 mié 4-nov · D57 jue 3-dic · D75 mié 30-dic · D87 mar 19-ene; trimestral I D45 mar 17-nov · II D89 jue 21-ene; capstone D88 mié 20-ene; ⚠ caso integral 16/16 = D90 vie 22-ene DESPUÉS del capstone (inversión de 2 días porque los 16 casos van en viernes; decisión de Joseph)** |
| DESAYUNO L-V 07:00 · DESAYUNO sáb/dom 06:45 · ALUMUERZO 12:00 | `7agi60f2bp8qnh6cnqvfo22giv` · `2u9je70pif58hgf2f8t3vgu8b8` · `43dq3oib16esjcqj1dcd8osot2` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` · `WEEKLY;WKST=SU;BYDAY=SA,SU` · `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | solo la etiqueta: **"Régimen v5.12 (D1 = mié 16-sep-2026)"**; en ALUMUERZO además "(v5.12: el UWSA1 cae en MIÉRCOLES 16-sep = D1, misma regla)" |
| BAILE mié · sáb · dom | `0tod56pc6pgecm5lf7g4e3ji9v` · `3jkfb6097rtc1jbec19eg3sd57` · `7j6pucil43vuca70p082g5ub3d` | `WEEKLY;BYDAY=WE` · `BYDAY=SA` · `BYDAY=SU` | solo la etiqueta: **"Régimen v5.12 (D1 = mié 16-sep-2026)"** |
| EKER 04:00 (diaria) | `22bh9m5jhc7ro6aj3m4ffjad7g` | `DAILY` | etiqueta v5.12 **+ frase 6 "vigente hasta el vie 29-ene-2027" → "vigente hasta el lun 1-feb-2027, día del examen Step 1 (target v5.12)"** (única desviación del "solo etiqueta": la fecha era la del examen y habría quedado falsa) |
| CORRER 06:00 (diaria) · CALISTENIA 06:30 · LECTURA DE LIBRO 13:00 · VIAJE VUELTA 20:30 · ANKI sáb 19:00 · ANKI dom 17:00 | `5mrm4ru08go9k70408jm8vcjku` · `2lpvftrc3fp64e0om6qg0mcs34` · `7jmf8p1l5b5q6jbtmj9uualiq8` · `3l59kpei7sg0l6kq51343or383` · `6ta0e3c019dep76spdgumfm0pl` · `619c1672eej1qgmvddbfkb5fu9` | `WEEKLY;WKST=SU;BYDAY=MO-SU` · `WEEKLY;BYDAY=FR,MO,TH,TU,WE` · `WEEKLY;WKST=SU;BYDAY=WE,TU,TH,FR,MO` · ídem · `WEEKLY;BYDAY=SA` · `WEEKLY;BYDAY=SU` | solo la etiqueta: **"Régimen v5.12 (D1 = mié 16-sep-2026)"** |

*(10 de estudio/secundarias + 6 de comida/baile + 7 rutinas = 23 series tocadas)*

**⏸ Leídas y NO tocadas (4):** **repaso 07:15** `54lchqggik96dmljmmg3l88s54` · **pre-test 08:15** `3tbecd5n03ut6lno3hjvc1sr7k` · **30Q 11:00** `2eqmmrnh00jr44plevurgcu2as` · **eval 18:00** `utk2laeob9u0847bbe9rm491v4`. Ninguna cita la versión del régimen, D1, el nº de días ni las fechas 15-sep/23-ene/28-ene → no había nada que corregir (mismo criterio que el 08→14-sep).

**Balance del día 15-sep-2026: 35 descripciones reescritas (12 overlays USMLE + 23 series) + 1 evento movido de fecha (el UWSA1, dentro de esas 35) + 1 evento CREADO (overlay EXAMEN lun 1-feb-2027).** Cero eventos borrados o recreados; cero cambios de título de serie, color, `transparency` o recurrencia; horas cambiadas solo en el UWSA1 (mar 15 → mié 16, 09:00-13:00 en ambos casos). Los 12 overlays 🔬 RESEARCH no se tocaron.

### 14.3 · Pendiente REAL al 15-sep-2026 — **SUPERSEDIDO por §15.3** (histórico)
**Ya están al día en v5.12**: los 12 overlays USMLE (UWSA1 ya en el mié 16) · el overlay del EXAMEN (nuevo) · los 12 overlays Research (sin cambio; `--check` = 0 según el orquestador) · vibecoding 04:15 · ANKI AM 05:00 · DEEP PRIME 09:00 · SYNAPSE 12:30 · Research↔Derma 13:30 · AURUM 14:15 · MIR 15:15 y 15:30 · ENCAPS 16:15 · LIVIANO 17:15 · DESAYUNO L-V · DESAYUNO sáb/dom · ALUMUERZO · BAILE mié/sáb/dom · EKER · CORRER · CALISTENIA · LECTURA DE LIBRO · VIAJE VUELTA · ANKI sáb/dom.

#### 🔴 0 · DECISIONES DE JOSEPH que abre este corrimiento (nuevas el 15-sep)
1. **Prometric**: agendar/reprogramar el Step 1 para el **lun 1-feb-2027** y **confirmar que el eligibility period cubre esa fecha** (si no: extenderlo o recortar temario). Hasta que exista la cita real, el overlay `oinh139dsnbuma9r3kfu56dhkc` es solo un recordatorio FREE. **Cada día más sin estudiar mueve el examen un hábil** (o exige recortar).
2. **CR-9 SUBMIT (Research) cae el mismo lun 1-feb** (`t136recadd6vnv0iebrmmqiv48`): dejarlo o mover el átomo al mar 2-feb (regenerar el plan Research + `gen_research_calendar.js`).
3. **Fase intensiva ENCAPS**: el día 96 sería el lun 1-feb = examen → propuesta **mar 2-feb** (`gen_encaps_intensivo_2027.js 2027-02-02`).
4. **Series secundarias el día del examen** (lun 1-feb): vibecoding, SYNAPSE, Research↔Derma, AURUM, MIR ×2, LIVIANO, GYM+BAILE siguen apareciendo (verificado con `list_events`, 23 eventos). Dejarlas (el overlay ya avisa) o vaciar ese lunes a mano.
5. **LIVIANO**: caso integral 16/16 = D90 vie 22-ene cae DESPUÉS del capstone D88 (inversión de 2 días). Aceptar o mover el capstone.
6. **Derma**: el vie 15-ene (NBME 31) es d43 = sesión NORMAL (Mohs) y el taper es d44-d49 (mar 19-ene → mar 2-feb, posicional). Alternativa: swap d43↔taper.

#### 🔴 1 · RRULE con `UNTIL=20270130T045959Z` (= vie 29-ene-2027 23:59:59 Lima) — **7 series L-V** · AVISO VIGENTE, AHORA CON EL EXAMEN EL LUN 1-FEB
**SIGUE VIGENTE Y SIN RESOLVER** (reconfirmado el 15-sep en la respuesta de cada `update_event` y con `list_events`: las 7 series aparecen el vie 29-ene y ya no el lun 1-feb ni el mar 2-feb).

| Serie | ID | Qué pasa después del vie 29-ene-2027 (v5.12) |
|---|---|---|
| **ENCAPS 16:15** | `papebi46etlo8glgfs5akd5mig` | 🔴 **BLOQUEANTE.** El mantenimiento v5.12 termina exactamente el vie 29-ene (día 95). La **fase intensiva ENCAPS arrancaría el lun 1-feb-2027 = día del examen** → propuesta **mar 2-feb**; la serie **ya no genera eventos** desde el lun 1-feb → hay que **extender/recrear la recurrencia ANTES del mar 2-feb-2027** (y, si Joseph acepta la propuesta, dejar el lun 1-feb sin ENCAPS: coincide con el `UNTIL` actual) |
| ANKI AM 05:00 | `i8afj7uppkb3ntj8h9890dhecc` | franja vacía desde el lun 1-feb — **coherente**: el lun 1-feb es el examen (solo Anki vencido el dom 31, ya cubierto por ANKI dom) |
| Repaso 07:15 | `54lchqggik96dmljmmg3l88s54` | franja vacía desde el lun 1-feb — coherente (examen) |
| Pre-test 08:15 | `3tbecd5n03ut6lno3hjvc1sr7k` | franja vacía desde el lun 1-feb — coherente |
| DEEP PRIME 09:00 | `cb2uh20jnvu7pgfev4183pgctc` | franja vacía desde el lun 1-feb — coherente |
| 30Q 11:00 | `2eqmmrnh00jr44plevurgcu2as` | franja vacía desde el lun 1-feb — coherente |
| Eval USMLE 18:00 | `utk2laeob9u0847bbe9rm491v4` | franja vacía desde el lun 1-feb — coherente |

**Lectura v5.12 del `UNTIL`:** las **6 series USMLE** expiran el vie 29-ene = **D95 = última sesión**, así que por primera vez el `UNTIL` coincide **exactamente** con el fin del plan y **el lun 1-feb (examen) queda limpio de bloques USMLE sin tocar nada** — la semana del 1-feb necesita las series USMLE **apagadas el lunes** (ya lo están) y **ENCAPS intensiva desde el martes** (NO lo está: la serie ENCAPS también expira el 29-ene). Queda por decidir qué ocupa las 6 franjas USMLE del mar 2-feb en adelante cuando ENCAPS vuelva a bloque principal (feb-mar 2027). **⚠ Si un futuro corrimiento empuja el D95 más allá del vie 29-ene, las 7 series quedarían cortas para el propio plan USMLE** (D95 caería en un día sin bloques) → revisar el `UNTIL` en cada corrimiento, además de mover el overlay del examen.

⚠ **Cómo hacerlo:** extender un `UNTIL` implica tocar la recurrencia, y el MCP de Google Calendar tiene `recurrenceData` **roto para UPDATE** → hacerlo desde la UI de Google Calendar, o **`delete_event` de la serie + `create_event`** (en CREATE sí funciona), **guardando antes la `description` completa** (la de v5.12, §14.2 / texto vivo) para no perderla. **Fecha límite: antes del mar 2-feb-2027** (ENCAPS).

#### 🟡 2 · SYNAPSE de fin de semana con texto de junio (sin cambios desde el 09-sep)
`hv2lk04orquvivthtkfhilb1ps` (sáb 15:00-17:00) y `s7r8tiu66286t156l0odpv5nvo` (dom 15:00-17:00) siguen con la descripción del 10-jun (CS50P, synapse-journal, "la serie arranca el 28-jun"). **Contradicen** el texto vivo de las 04:15 y de las 12:30 (sáb 15:00-17:00 = SHIP del proyecto de vibecoding; el 1.er SHIP sigue siendo el sáb 26-sep). → reescribir solo `description`. No entraban en el alcance del 15-sep. **Además, el sáb 30 y el dom 31-ene-2027 (descanso pre-examen) estas dos series siguen apareciendo** (verificado con `list_events`): decisión de Joseph si ese finde se vacía.

#### 🟡 3 · `<br>` escapados como texto
`&lt;br&gt;` sigue visible en SYNAPSE PC sábado y SYNAPSE domingo (en SYNAPSE 12:30 el texto vivo ya usa saltos de línea reales desde el 14-sep). Limpieza cosmética, sin urgencia.

#### 🟡 4 · 9 series de GYM/BAILE con etiqueta "Régimen v5.6" (detectado el 12-sep)
Sin cambios: solo se actualizan las 3 series BAILE mié/sáb/dom; las **otras 9 series de GYM y BAILE del §2** conservan la descripción común del 05-sep con "Régimen v5.6". Es solo la etiqueta → reescribir solo `description` con "Régimen v5.12 (D1 = mié 16-sep-2026)". **A VERIFICAR (15-sep)** (no releídas hoy; `list_events` del 29-ene/1-feb/2-feb muestra GYM vie `7sf8i7pe62pugfk4t6tcnbb9i4`, BAILE vie `5pd4jhmvl31hvbuh40vphpoc4q`, GYM lun `6740kavnfkdcvj5k149ouliauu`, BAILE lun `64lue1en3hk0cf8itml2rtlqi4`, BAILE mar `09me7atu516gb0k6u0rbfcj8q1`, GYM mar `0dpes0ekv96a453e89m5osg06t` activas).

#### 🟡 5 · Textos fijos de `gen_research_calendar.js`
✅ RESUELTO el 14-sep (tarde). Sin novedad en v5.12 (los overlays Research no cambiaron).

#### ⚪ 6 · Decisiones de Joseph, no bugs (no se tocan sin su OK)
- Título **"ALUMUERZO"** (typo) — `43dq3oib16esjcqj1dcd8osot2`.
- **Martes**: ALISTARSE 18:30-18:45 (`21lbj9le99k8s9giclm3fauafs`) + VIAJE 18:45-19:00 (`3umsaskrlt1vi5ud3oubmcp504`) le quitan 15' a la Eval USMLE de las 18:00. **En v5.12 el D1 (UWSA1) cae en miércoles**, así que la revisión del UWSA1 en la franja 18:00 ya no se corta (el miércoles ALISTARSE es 18:45).
- **Derma d43-d49 y taper**, **LIVIANO D88/D90**, **CR-9**, **ENCAPS intensiva**, **series secundarias el 1-feb**: ver 🔴 0.

#### ⚪ 7 · Dato de los planes, no del Calendar
- `synapseDailyPlan.ts`: cabecera ya en v5.12 (132 días · 2026-09-16 → 2027-01-25); sin pendiente.
- MIR: `mirDailyPlan.ts` termina el mié 6-ene (D78) y `mirMantenimiento.ts` arranca el jue 7-ene → no solapan (verificado con node el 15-sep).
- USMLE: `DAILY_META.examenTarget = '2027-02-01'`, `descansoD1 = '2027-01-31'`, `USMLE_TAPER.d94/d95/dMenos1/examen` ya en v5.12 (leídos el 15-sep).


## 15 · Registro de cambios en el Calendar (16-sep-2026 · corrimiento v5.13)
Corrimiento D1 mié 16-sep → **jue 17-sep** (el mié 16 tampoco se estudió; **12.º corrimiento** desde el 31-ago, **13 hábiles perdidos**). **El UWSA1 volvió a cambiar de fecha** (evento suelto `o1gla7846uae4tgngvc4q45osg`): pasó del mié 16-sep 09:00-13:00 al **jue 17-sep 09:00-13:00** (`America/Lima`) y sigue siendo el D1. **El overlay del EXAMEN `oinh139dsnbuma9r3kfu56dhkc` se movió del lun 1-feb al mar 2-feb-2027 07:00-16:00** (regla de §14.1: +1 hábil por corrimiento). Los otros 11 overlays USMLE conservan su fecha; cambió su D# (todos −1) y el texto estructural que dependía de fechas, y en los 12 la línea final ahora dice "D94 vie 29-ene última sesión de banco · sáb 30 y dom 31 libres · D95 lun 1-feb = D-1 dentro del plan · EXAMEN mar 2-feb-2027 (target v5.13)". **Los 12 overlays 🔬 RESEARCH corrieron +2 hábiles** (el jue 17-sep es día Derma → D1 Research = vie 18-sep) vía `gen_research_calendar.js`.

La sesión se hizo en **dos tramos** el mismo 16-sep: el primero (cortado por límite de contexto) movió el UWSA1, reescribió los 11 overlays USMLE, movió el overlay del examen, re-fechó y registró los 12 🔬 y reescribió 4 series (IA vibecoding, ANKI AM, DEEP PRIME, SYNAPSE); el segundo (este registro) reescribió las **19 series restantes**, releyó con `get_event` las 4 series del primer tramo + UWSA1 + overlay del examen, corrió `gen_research_calendar.js --check` (= 0) y actualizó este documento.

Método: `get_event` para leer la descripción viva → sustitución de "D1 = mié 16-sep / v5.12 / 95-96 días / mié 6-ene / vie 19-mar / vie 22-ene / lun 25-ene / lun 1-feb EXAMEN" por las cifras v5.13 leídas con `node` de los `.ts` (`usmleStep1Daily.ts`, `mirDailyPlan.ts`, `mirMantenimiento.ts`, `researchDailyPlan.ts`, `researchDailyPlan2027.ts`, `dermaDailyPlan.ts`, `dermaCiclo2.ts`, `aurumDailyPlan.ts`, `livianoStudyPlan.ts`, `synapseDailyPlan.ts`, `businessStudyPlan.ts`, `vibecodingPlan.ts`) → `update_event` **solo con el campo `description`** (+ `notificationLevel: NONE`) → verificación campo a campo sobre la respuesta del `update_event` (devuelve el recurso completo: `start`, `end`, `summary`, `recurrence`, `colorId`, `updated`). **No se tocó ninguna hora de serie, ningún título, RRULE, `colorId`; no se usó `recurrenceData`; no se borró ni se recreó ninguna serie.** Las cifras de Supabase (ENCAPS 94 días · 76 + 18 · bk_0916) vienen del orquestador (este agente no toca Supabase).

### 15.0 · Los 12 overlays de hito USMLE + el overlay del EXAMEN (hechos en el primer tramo; D# reconfirmados hoy con `node`)

| # | Hito · fecha | ID | D# | Cambios |
|---|---|---|---|---|
| 1 | UWSA1 **mié 16-sep → jue 17-sep** ⚡ | `o1gla7846uae4tgngvc4q45osg` | D1 → **D1** (sin cambio) | **`start`/`end` movidos** a 2026-09-17 09:00-13:00 `America/Lima` (`get_event` de verificación en el 2.º tramo: `start` `2026-09-17T09:00:00-05:00` · `end` `2026-09-17T13:00:00-05:00` · `transparent` · color 6 · sin recurrencia · `updated` 2026-09-16T17:18:57Z). Texto: "régimen v5.13 (D1 = jue 17-sep, 95 días → D94 = vie 29-ene última sesión de banco · D95 = lun 1-feb = D-1 dentro del plan)", "movido del mié 16", "vie 11 → lun 14 → mar 15 → mié 16-sep, fechas ya pasadas sin estudiar (31-ago → 16-sep: 13 hábiles perdidos)", el contenido arranca el **vie 18-sep = D2**, "⚠ CONSECUENCIA v5.13 … EXAMEN mar 2-feb-2027 (target v5.13: agendar/reprogramar Prometric y confirmar que el eligibility period cubre el 2-feb)" |
| 2 | NBME 25 02-oct | `4hjv5lkvluj06ahc2qndtsi6as` | D13 → **D12** | última línea v5.13 (no releído en el 2.º tramo) |
| 3 | NBME 26 23-oct | `lr7ktrbiffj4hrlke7lh7cv6h4` | D28 → **D27** | ídem |
| 4 | NBME 27 13-nov | `sm4baa2v453ifaub325h9v08mg` | D43 → **D42** | ídem |
| 5 | NBME 28 04-dic | `ecu784689p8osrhqabuct8d5jg` | D58 → **D57** | ídem |
| 6 | NBME 29 18-dic | `ae93qv0nqqs36h439hid1jcq8o` | D68 → **D67** | semana siguiente: lun 21-dic = D68 (gineco-onco) · mar 22-dic = D69 (mama/masculino) · mié 23-dic = D70 cierra Reproductive · MSK D71-D73 (jue 24 → mar 29-dic, 25-dic libre) |
| 7 | NBME 30 30-dic | `mael3p9uhp036jbep45ql6v9oc` | D75 → **D74** | Fase A hasta el mar 12-ene = D81; Fase B = **mié 13-ene → vie 15-ene = D82-D84, 3 días**; lun 4-ene = D75 · mar 5 = D76 · mié 6 = D77 · jue 7 = D78 · vie 8 = D79 UWSA2 · lun 11 = D80 · mar 12 = D81 cierre |
| 8 | UWSA2 08-ene | `2u7viv0elr6aedo0m9undfa5kg` | D80 → **D79** | "cae DENTRO de la Fase A: el mar 12-ene (D81) cierra Bioquímica y la Fase B arranca el mié 13-ene (D82-D84, 3 días, hasta el NBME 31 del vie 15-ene = D84)" |
| 9 | NBME 31 15-ene | `l771lvcfv0jcebt61do6svia18` | D85 → **D84** | GO/NO-GO; "confirmar en Prometric (mar 2-feb)"; D94 vie 29-ene última sesión de banco · D95 lun 1-feb = D-1 |
| 10 | NBME 32 18-ene | `h65e772pqsa4hgc5b6bh9n8h50` | D86 → **D85** | "mañana mar 19-ene (**D86**) = random timed 2×40Q + sistema débil #2" |
| 11 | NBME 33 20-ene | `la5rsbuiqj1o35lb5adf93abuo` | D88 → **D87** | jue 21-ene = **D88** random timed + sistema débil #2 · lun 25 = **D90** y mar 26 = **D91** incorrects 2.ª pasada + sistema débil #3 · mié 27 = **D92** y jue 28 = **D93** AMBOSS 200 mitades 1-2 |
| 12 | Free 120 22-ene | `lh9jfjsmoif74ci6jcn8f1mq30` | D90 → **D89** | "no es el último día del plan": vie 29-ene = D94 última sesión de banco · lun 1-feb = D95 = D-1; cita de Prometric para el mar 2-feb |
| 13 | EXAMEN **lun 1-feb → mar 2-feb-2027** ⚡ | `oinh139dsnbuma9r3kfu56dhkc` | — | **`start`/`end` movidos** a 2027-02-02 07:00-16:00 `America/Lima`; título → "🎯 USMLE STEP 1 · EXAMEN (target v5.13 — agendar en Prometric)"; `get_event` en el 2.º tramo: `start` `2027-02-02T07:00:00-05:00` · `end` `2027-02-02T16:00:00-05:00` · `transparent` · color 6 · `updated` 2026-09-16T17:23:18Z. Texto: target v5.13 tras 13 hábiles perdidos; D94/sáb-dom libres/D95 = D-1 dentro del plan; Prometric + eligibility period; los 3 días previos; protocolo de test-day; contexto (CR-9 y pitch v5 AURUM en el D95; ENCAPS intensiva propuesta mié 3-feb; Derma d49 = día del examen, opcional) |

Los D# se leyeron con `node` del array `DIAS` de `src/lib/usmleStep1Daily.ts` (95 entradas, D1 = 2026-09-17 → D95 = 2027-02-01, 0 sáb/dom/feriados, D# consecutivos). `DAILY_META.examenTarget = '2027-02-02'`, `descansoD1 = '2027-02-01'`, `USMLE_TAPER.d94` (vie 29-ene, D-2 última sesión de banco) y `d95` (lun 1-feb, D-1 dentro del plan) leídos con grep. Los mínimos on-track del texto (≥51/54/57/61/63/65/68 %) no cambiaron.

### 15.1 · Los 12 overlays 🔬 RESEARCH (`gen_research_calendar.js`) — +2 hábiles
Hechos en el primer tramo (12 `recrear` → `update_event` con fecha/título/descripción del payload → `--set`). **Reconfirmado en este tramo:** `node DATA/_scripts/gen_research_calendar.js --check` → "Hitos Research en el plan: 12 · overlays con id: 12 · a crear: 0 · a recrear: 0", exit 0; `DATA/RESEARCH/_calendar_overlays.json` con `actualizado: 2026-09-16` y `registrado: 2026-09-16` en los 12. Fechas nuevas (tabla completa en §5.1): M1 jue 24-sep · C-2 vie 2-oct · T-1 mar 6-oct · C-6 jue 22-oct · CR-1 mié 28-oct · T-8 vie 27-nov · X-1 jue 3-dic · CR-8 mar 15-dic · **CR-9 lun 1-feb (misma fecha, ahora d37 = D95 = D-1 del Step 1)** · X-9 mar 23-feb · R10 lun 1-mar · R43 vie 9-jul-2027. Los ids no cambiaron.

### 15.2 · Las 23 series tocadas (solo `description`)

| Serie | ID | RRULE (verificada intacta) | Texto viejo → nuevo |
|---|---|---|---|
| IA vibecoding 04:15 (1.er tramo; releída hoy) | `udr09j9ng983o0d4nipkfe4494` | `WEEKLY;BYDAY=MO-FR` | v5.12 / mié 16-sep → mar 8-dic / S7 mié 28-oct → mar 3-nov / taper mié 9-dic → vie 29-ene → **v5.13 / jue 17-sep → mié 9-dic-2026 / 12 SHIP sábados (26-sep … 12-dic, sin cambio) / S7 deload jue 29-oct → mié 4-nov / taper S13-S20 jue 10-dic → lun 1-feb-2027 (S13 10-16 dic · S14 17-23 dic · S15 24-30 dic (4) · S16 4-6 ene (3) · S17 7-13 ene · S18 14-20 ene · S19 21-27 ene · S20 28-ene→1-feb (3)) / "S20 = cierre del plan: journal jue 28, vie 29 y lun 1-feb" / D94 vie 29-ene · D95 lun 1-feb = D-1 · EXAMEN mar 2-feb-2027** |
| ANKI AM 05:00 (1.er tramo; releída hoy) | `i8afj7uppkb3ntj8h9890dhecc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | "95 días desde mié 16-sep hasta vie 29-ene-2027 … EXAMEN lun 1-feb" → **"95 días desde jue 17-sep hasta lun 1-feb-2027 ≈ 594h; D94 = vie 29-ene última sesión de banco · sáb 30 y dom 31 libres · D95 = lun 1-feb = D-1 dentro del plan (sesión mínima AM ≤2 h) · EXAMEN mar 2-feb-2027 (target v5.13)" + "⚠ Esta serie termina el sáb 30-ene (UNTIL): extender antes del 1-feb para cubrir el D95"** |
| DEEP PRIME 09:00 (1.er tramo; releída hoy) | `cb2uh20jnvu7pgfev4183pgctc` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | v5.12 / D95 vie 29-ene / A D1-D81 (→ lun 11-ene) · B D82-D85 · C D86-D95 / "mar 15 → mié 16-sep" / contenido jue 17 (D2) / NBME 31 = D85 → **v5.13 / D95 lun 1-feb / A D1-D81 (17-sep → mar 12-ene; UWSA2 D79 dentro de la Fase A) · B D82-D84 (13→15-ene) · C D85-D95 (18-ene→1-feb) / "vie 11 → lun 14 → mar 15 → mié 16 → jue 17-sep" / contenido vie 18-sep (D2) / NBME 31 = D84 / EXAMEN mar 2-feb-2027 / aviso UNTIL / "su contenido ya es v5.13"** |
| SYNAPSE 12:30 (1.er tramo; releída hoy) | `j99thg3eaqesosmvppj4rfgvh4` | `WEEKLY;BYDAY=MO-FR` | 132 días · mié 16-sep → lun 25-ene / sem 1 = 16-20 sep (5) / F2 → lun 25-ene / "del mar 26 al vie 29-ene sin SYNAPSE; EXAMEN lun 1-feb" → **132 días · 19 semanas · jue 17-sep → mar 26-ene-2027 (sem 1 = 17-20 sep, 4 días; sem 19 hasta el mar 26-ene; última A-unit el martes de la penúltima semana del plan Step 1 = D91; 110 A-units intactas) / F2 sem 13-19 (lun 7-dic → mar 26-ene) / "del mié 27-ene al lun 1-feb (D92-D95) y el finde 30-31: sin SYNAPSE; EXAMEN mar 2-feb-2027"** |
| Research↔Derma 13:30 | `3ofg2ljv8kl3p1adm2e5d5nih3` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | mapa mié 16 RESEARCH (D1) · jue 17 DERMA (d1) · vie 18 RESEARCH (D2) · … · mar 22 RESEARCH (D3 · M1) → **jue 17 DERMA (d1) · vie 18 RESEARCH (D1) · lun 21 DERMA (d2) · mar 22 RESEARCH (D2) · mié 23 DERMA (d3) · jue 24 RESEARCH (D3 · M1) · vie 25 DERMA (d4) · lun 28 RESEARCH (D4)**; Research ciclo 1 "mié 16-sep → jue 11-feb SIN cambio; D38 lun 1-feb = CR-9 = día del examen; ciclo 2 lun 15-feb → mié 18-ago" → **"vie 18-sep → lun 15-feb-2027 (+2 hábiles); D36 mar 29-dic → pausa 4→29-ene → D37 lun 1-feb = CR-9 = D95 = D-1, víspera del examen; mover al mié 3-feb es decisión de Joseph; ciclo 2 = 67 átomos mié 17-feb → vie 20-ago-2027"**; Derma "corrió 2 hábiles" → **"SIN cambio en v5.13 (el 17-sep ya era su d1); d49 mar 2-feb = DÍA DEL EXAMEN (sesión opcional); d48 vie 29-ene = D94"**; "overlays 🔬 sin cambios en v5.12" → **"re-fechados en v5.13"**; "EXAMEN lun 1-feb" → **"EXAMEN MAR 2-FEB-2027 (D95 = lun 1-feb = D-1 dentro del plan)"** |
| AURUM 14:15 | `at1nak8f24nbnj1mh2jcd4aggg` | `WEEKLY;BYDAY=MO-FR` | D1 mié 16-sep → D130 vie 19-mar; pitches mar 6-oct · mar 3-nov · mar 1-dic · mié 30-dic · vie 29-ene · vie 26-feb · vie 19-mar → **D1 jue 17-sep → D130 lun 22-mar-2027; pitches v1 D15 mié 7-oct · v2 D35 mié 4-nov · v3 D55 mié 2-dic · v4 D75 lun 4-ene · v5 D95 lun 1-feb (= D-1 del Step 1, víspera del examen del mar 2-feb-2027) · v6 D115 lun 1-mar · v7 D130 lun 22-mar** |
| MIR eval 15:15 | `2ldp6obaapnvo76li28uprrddg` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | 78 días mié 16-sep → mié 6-ene (D77 mar 5 · D78 mié 6) / mantenimiento 60 días jue 7-ene → 31-mar (48 lun-jue + 12 viernes) / reducido hasta el vie 29-ene / D95 vie 29-ene · EXAMEN lun 1-feb → **78 días jue 17-sep → jue 7-ene-2027 (D77 mié 6-ene mini-MIR · D78 jue 7-ene corrección) / mantenimiento 59 días vie 8-ene → mié 31-mar-2027 (47 lun-jue + 12 viernes; al arrancar en viernes la semana 1 del catálogo se mapea a la primera semana con slots lun-jue = semanas reales 2-13) / modo reducido hasta el lun 1-feb = D95 = D-1 / D94 = vie 29-ene última sesión de banco · sáb 30 y dom 31 libres · D95 = lun 1-feb = D-1 dentro del plan · EXAMEN MAR 2-FEB-2027 (agendar/reprogramar Prometric y confirmar el eligibility period) / "su contenido ya es v5.13"** |
| MIR deep work 15:30 | `00k364heibh1n6f9hfspcv9dpi` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | "≈310 cards al mié 6-ene-2027 … (60 días = 48 lun-jue + 12 viernes; modo reducido hasta el vie 29-ene = D95; EXAMEN lun 1-feb)" + v5.12 → **"≈310 cards al jue 7-ene-2027 (76 temas + D77 mié 6-ene mini-MIR + D78 jue 7-ene corrección); del vie 8-ene al mié 31-mar-2027 … (59 días = 47 lun-jue + 12 viernes; modo reducido hasta el lun 1-feb = D95 = D-1 del Step 1 dentro del plan; EXAMEN Step 1 MAR 2-FEB-2027, target v5.13)"** + etiqueta v5.13 |
| ENCAPS 16:15 | `papebi46etlo8glgfs5akd5mig` | `WEEKLY;UNTIL=20270130;BYDAY=MO-FR` | 95 días mié 16-sep / 77 banqueo + 18 mini-sims / backup `bk_0915` / "96 → 95 (mar 15-sep)" / pre-test mié 16 + jue 17 (`…09-16/17.html`) / "intensiva día 96 = lun 1-feb = DÍA DEL EXAMEN → propuesta mar 2-feb (`2027-02-02`)" → **94 días jue 17-sep → vie 29-ene-2027 / 76 banqueo + 18 mini-sims (1.ª vie 18-sep = D2) / backup `study_schedule_bk_0916` (bk_0915/0914/0912/0910/0909/0908 intactos) / "95 → 94 (la sesión que cae es la del mié 16-sep)" / pre-test jue 17-sep parte 1 + lun 21-sep parte 2 (el vie 18 = D2 es mini-sim) (`pretest_arranque_2026-09-17.html` y `…-21.html`) / "⚠ la eval del jue 24-sep salió con 0Q (pool III-5 agotado por banco_23 + pre-test) → pendiente de reponer stock" / "intensiva arrancaría en el día 95 = lun 1-feb = D95 = D-1 del Step 1 (el MAR 2-FEB-2027 es el EXAMEN) → propuesta mié 3-feb (`gen_encaps_intensivo_2027.js 2027-02-03`)" / "su contenido ya es v5.13"** |
| LIVIANO 17:15 | `8epae6hlfmrc9j0h2kib7iuc84` | `WEEKLY;BYDAY=MO-FR` | 90 días mié 16-sep → vie 22-ene; drills D36 mié 4-nov · D57 jue 3-dic · D75 mié 30-dic · D87 mar 19-ene; trimestral I D45 mar 17-nov · II D89 jue 21-ene; capstone D88 mié 20-ene; caso integral D90 vie 22-ene (inversión de 2 días) → **90 días jue 17-sep → lun 25-ene-2027; drills D36 jue 5-nov · D58 lun 7-dic · D75 lun 4-ene · D87 mié 20-ene; trimestral I D45 mié 18-nov · II D90 lun 25-ene; capstone D88 jue 21-ene; caso integral 16/16 = D89 vie 22-ene, un día DESPUÉS del capstone y antes de la revisión II (inversión de 1 día; decisión de Joseph)** |
| DESAYUNO L-V 07:00 · DESAYUNO sáb/dom 06:45 · ALUMUERZO 12:00 | `7agi60f2bp8qnh6cnqvfo22giv` · `2u9je70pif58hgf2f8t3vgu8b8` · `43dq3oib16esjcqj1dcd8osot2` | `WEEKLY;BYDAY=FR,MO,TH,TU,WE` · `WEEKLY;WKST=SU;BYDAY=SA,SU` · `WEEKLY;BYDAY=FR,MO,TH,TU,WE` | solo la etiqueta: **"Régimen v5.13 (D1 = jue 17-sep-2026)"**; en ALUMUERZO además "(v5.13: el UWSA1 cae en JUEVES 17-sep = D1, misma regla)" |
| BAILE mié · sáb · dom | `0tod56pc6pgecm5lf7g4e3ji9v` · `3jkfb6097rtc1jbec19eg3sd57` · `7j6pucil43vuca70p082g5ub3d` | `WEEKLY;BYDAY=WE` · `BYDAY=SA` · `BYDAY=SU` | solo la etiqueta: **"Régimen v5.13 (D1 = jue 17-sep-2026)"** |
| EKER 04:00 (diaria) | `22bh9m5jhc7ro6aj3m4ffjad7g` | `DAILY` | etiqueta v5.13 **+ frase 6 "vigente hasta el lun 1-feb-2027, día del examen Step 1 (target v5.12)" → "vigente hasta el mar 2-feb-2027, día del examen Step 1 (target v5.13)"** (única desviación del "solo etiqueta": la fecha era la del examen y habría quedado falsa) |
| CORRER 06:00 (diaria) · CALISTENIA 06:30 · LECTURA DE LIBRO 13:00 · VIAJE VUELTA 20:30 · ANKI sáb 19:00 · ANKI dom 17:00 | `5mrm4ru08go9k70408jm8vcjku` · `2lpvftrc3fp64e0om6qg0mcs34` · `7jmf8p1l5b5q6jbtmj9uualiq8` · `3l59kpei7sg0l6kq51343or383` · `6ta0e3c019dep76spdgumfm0pl` · `619c1672eej1qgmvddbfkb5fu9` | `WEEKLY;WKST=SU;BYDAY=MO-SU` · `WEEKLY;BYDAY=FR,MO,TH,TU,WE` · `WEEKLY;WKST=SU;BYDAY=WE,TU,TH,FR,MO` · ídem · `WEEKLY;BYDAY=SA` · `WEEKLY;BYDAY=SU` | solo la etiqueta: **"Régimen v5.13 (D1 = jue 17-sep-2026)"** |

*(10 de estudio/secundarias + 6 de comida/baile + 7 rutinas = 23 series tocadas; 4 en el 1.er tramo + 19 en el 2.º)*

**⏸ No releídas ni tocadas hoy (4):** **repaso 07:15** `54lchqggik96dmljmmg3l88s54` · **pre-test 08:15** `3tbecd5n03ut6lno3hjvc1sr7k` · **30Q 11:00** `2eqmmrnh00jr44plevurgcu2as` · **eval 18:00** `utk2laeob9u0847bbe9rm491v4`. El 15-sep se confirmó que ninguna cita la versión del régimen, D1, el nº de días ni fechas del cierre → nada que corregir (mismo criterio que el 08→15-sep).

**Balance del día 16-sep-2026: 47 descripciones reescritas (12 overlays USMLE + el overlay del examen + 12 overlays 🔬 + 23 series, sumando los dos tramos) + 2 eventos movidos de fecha (el UWSA1 y el overlay del examen, dentro de esas 47).** Cero eventos borrados, creados o recreados; cero cambios de título de serie, color, `transparency` o recurrencia; horas cambiadas solo en el UWSA1 (mié 16 → jue 17, 09:00-13:00), en el overlay del examen (lun 1-feb → mar 2-feb, 07:00-16:00) y en los 12 🔬 (fecha; misma franja 13:30-14:15).

### 15.3 · Pendiente REAL al 16-sep-2026 — **SUPERSEDIDO por §16.3** (histórico)
**Ya están al día en v5.13**: los 12 overlays USMLE (UWSA1 ya en el jue 17) · el overlay del EXAMEN (mar 2-feb) · los 12 overlays 🔬 Research (+2 hábiles; `--check` = 0 medido hoy) · vibecoding 04:15 · ANKI AM 05:00 · DEEP PRIME 09:00 · SYNAPSE 12:30 · Research↔Derma 13:30 · AURUM 14:15 · MIR 15:15 y 15:30 · ENCAPS 16:15 · LIVIANO 17:15 · DESAYUNO L-V · DESAYUNO sáb/dom · ALUMUERZO · BAILE mié/sáb/dom · EKER · CORRER · CALISTENIA · LECTURA DE LIBRO · VIAJE VUELTA · ANKI sáb/dom.

#### 🔴 0 · DECISIONES DE JOSEPH que abre este corrimiento (estado 16-sep)
1. **Prometric**: agendar/reprogramar el Step 1 para el **mar 2-feb-2027** y **confirmar que el eligibility period cubre esa fecha** (si no: extenderlo o recortar temario). Hasta que exista la cita real, el overlay `oinh139dsnbuma9r3kfu56dhkc` es solo un recordatorio FREE. **Cada día más sin estudiar mueve el examen un hábil** (o exige recortar).
2. **CR-9 SUBMIT (Research) cae el lun 1-feb = D95 = D-1, víspera del examen** (`t136recadd6vnv0iebrmmqiv48`): dejarlo o mover el átomo al mié 3-feb (regenerar el plan Research + `gen_research_calendar.js`).
3. **Fase intensiva ENCAPS**: el día 95 sería el lun 1-feb = D-1 del Step 1 y el mar 2-feb es el examen → propuesta **mié 3-feb** (`gen_encaps_intensivo_2027.js 2027-02-03`).
4. **Series secundarias el día del examen** (mar 2-feb): SYNAPSE, Research↔Derma (Derma d49 opcional), AURUM, MIR ×2, LIVIANO, GYM/BAILE del martes siguen apareciendo (no tienen UNTIL). **A VERIFICAR (16-sep)** con `list_events` del mar 2-feb (no se hizo hoy). Dejarlas (el overlay ya avisa) o vaciar ese martes a mano. **El lun 1-feb = D95** conserva todas las series secundarias (sin UNTIL) — con plan ese día: vibecoding S20 (journal), Research CR-9 SUBMIT, AURUM pitch v5, MIR mantenimiento reducido; sin plan pero con serie: SYNAPSE (terminó el 26-ene) y LIVIANO (terminó el 25-ene) — y **le faltan las 6 USMLE** (ver 🔴 1).
5. **LIVIANO**: caso integral 16/16 = D89 vie 22-ene cae DESPUÉS del capstone D88 jue 21-ene (inversión de 1 día). Aceptar o mover el capstone.
6. **Derma**: el vie 15-ene (NBME 31) es d43 = sesión NORMAL (Mohs), el taper es d44-d49 (mar 19-ene → mar 2-feb, posicional) y **d49 = mar 2-feb = día del examen (sesión opcional)**. Alternativa: swap d43↔taper.
7. **ENCAPS eval del jue 24-sep con 0Q** (pool III-5 agotado por banco_23 + pre-test): reponer stock antes del 24-sep (dato del orquestador; no es del Calendar).

#### 🔴 1 · RRULE con `UNTIL=20270130T045959Z` (= vie 29-ene-2027 23:59:59 Lima) — **7 series L-V** · AVISO VIGENTE, AHORA INCOHERENTE PARA LAS 6 USMLE
**SIGUE VIGENTE Y SIN RESOLVER** (reconfirmado el 16-sep en la respuesta de los `update_event` de ANKI AM, DEEP PRIME y ENCAPS; repaso/pre-test/30Q/eval no se releyeron hoy, el 15-sep conservaban el mismo `UNTIL`).

| Serie | ID | Qué pasa después del vie 29-ene-2027 (v5.13) |
|---|---|---|
| **ENCAPS 16:15** | `papebi46etlo8glgfs5akd5mig` | 🔴 **BLOQUEANTE.** El mantenimiento v5.13 termina exactamente el vie 29-ene (día 94). La **fase intensiva ENCAPS arrancaría el lun 1-feb-2027 = D95 = D-1 del Step 1** (y el mar 2-feb es el examen) → propuesta **mié 3-feb**; la serie **ya no genera eventos** desde el lun 1-feb → hay que **extender/recrear la recurrencia ANTES del mié 3-feb-2027** (si Joseph acepta la propuesta, dejar lun 1 y mar 2-feb sin ENCAPS: coincide con el `UNTIL` actual + 1 día) |
| ANKI AM 05:00 | `i8afj7uppkb3ntj8h9890dhecc` | 🔴 franja vacía el **lun 1-feb = D95 = D-1 DENTRO del plan** (sesión mínima AM: Anki maduro/vencido + 20Q flagged) → **extender antes del 1-feb** (el texto vivo ya lo avisa). Vacía el mar 2-feb = examen: coherente |
| Repaso 07:15 | `54lchqggik96dmljmmg3l88s54` | 🟡 franja vacía el lun 1-feb (D95); el D-1 es sesión mínima solo AM ≤2 h → extender o dejar vacía (decisión de Joseph); vacía el mar 2-feb: coherente |
| Pre-test 08:15 | `3tbecd5n03ut6lno3hjvc1sr7k` | 🟡 ídem (el D-1 no lleva pre-test de tema nuevo: cero preguntas nuevas) |
| DEEP PRIME 09:00 | `cb2uh20jnvu7pgfev4183pgctc` | 🟡 franja vacía el lun 1-feb (D95); el D-1 no lleva deep prime de contenido (rapid review FA + laboratorio de dudas, ≤2 h en total) → extender o dejar vacía; el texto vivo ya avisa "extender antes del 1-feb para cubrir el D95" |
| 30Q 11:00 | `2eqmmrnh00jr44plevurgcu2as` | 🟡 ídem (el D-1 lleva 20Q flagged, no bloque nuevo) |
| Eval USMLE 18:00 | `utk2laeob9u0847bbe9rm491v4` | 🟡 franja vacía el lun 1-feb: **coherente con el D-1** (nada de estudio después de las 17:00) |

**Lectura v5.13 del `UNTIL`:** por primera vez desde v5.10 el `UNTIL` **ya no coincide con el fin del plan**: las 6 series USMLE expiran el vie 29-ene = **D94** y el **lun 1-feb = D95 = D-1 queda dentro del plan sin ninguna franja USMLE**. Como el D-1 es una sesión mínima solo por la mañana (≤2 h: Anki + 20Q flagged + rapid review), lo imprescindible es **ANKI AM 05:00** (y, si Joseph quiere la franja visible, DEEP PRIME 09:00 como "rapid review + laboratorio de dudas"); repaso/pre-test/30Q/eval pueden quedar vacías ese lunes. El **mar 2-feb (examen) queda limpio de bloques USMLE/ENCAPS sin tocar nada**. Sigue pendiente decidir qué ocupa las 6 franjas USMLE del mié 3-feb en adelante cuando ENCAPS vuelva a bloque principal (feb-mar 2027). **⚠ Si un futuro corrimiento mueve el D95 más allá del lun 1-feb, cada día extra del plan quedará también sin series USMLE.**

⚠ **Cómo hacerlo:** extender un `UNTIL` implica tocar la recurrencia, y el MCP de Google Calendar tiene `recurrenceData` **roto para UPDATE** → hacerlo desde la UI de Google Calendar, o **`delete_event` de la serie + `create_event`** (en CREATE sí funciona), **guardando antes la `description` completa** (la de v5.13, §15.2 / texto vivo) para no perderla. **Fechas límite: antes del lun 1-feb-2027** (ANKI AM y, opcionalmente, las otras 5 USMLE) **y antes del mié 3-feb-2027** (ENCAPS).

#### 🟡 2 · SYNAPSE de fin de semana con texto de junio (sin cambios desde el 09-sep)
`hv2lk04orquvivthtkfhilb1ps` (sáb 15:00-17:00) y `s7r8tiu66286t156l0odpv5nvo` (dom 15:00-17:00) siguen con la descripción del 10-jun (CS50P, synapse-journal, "la serie arranca el 28-jun"). **Contradicen** el texto vivo de las 04:15 y de las 12:30 (sáb 15:00-17:00 = SHIP del proyecto de vibecoding; el 1.er SHIP sigue siendo el sáb 26-sep). → reescribir solo `description`. No entraban en el alcance del 16-sep. **Además, el sáb 30 y el dom 31-ene-2027 (libres entre el D94 y el D95) estas dos series siguen apareciendo** (verificado el 15-sep con `list_events`): decisión de Joseph si ese finde se vacía.

#### 🟡 3 · `<br>` escapados como texto
`&lt;br&gt;` sigue visible en SYNAPSE PC sábado y SYNAPSE domingo. Limpieza cosmética, sin urgencia.

#### 🟡 4 · 9 series de GYM/BAILE con etiqueta "Régimen v5.6" (detectado el 12-sep)
Sin cambios: solo se actualizan las 3 series BAILE mié/sáb/dom; las **otras 9 series de GYM y BAILE del §2** conservan la descripción común del 05-sep con "Régimen v5.6". Es solo la etiqueta → reescribir solo `description` con "Régimen v5.13 (D1 = jue 17-sep-2026)". **A VERIFICAR (16-sep)** (no releídas; ids conocidos del 15-sep: GYM vie `7sf8i7pe62pugfk4t6tcnbb9i4`, BAILE vie `5pd4jhmvl31hvbuh40vphpoc4q`, GYM lun `6740kavnfkdcvj5k149ouliauu`, BAILE lun `64lue1en3hk0cf8itml2rtlqi4`, BAILE mar `09me7atu516gb0k6u0rbfcj8q1`, GYM mar `0dpes0ekv96a453e89m5osg06t`; ver §14.3 histórico).

#### 🟡 5 · Textos fijos de `gen_research_calendar.js`
✅ RESUELTO el 14-sep (tarde) y **RE-RESUELTO el 16-sep (v5.13, orquestador)**: los dos textos fijos `DEADLINE` de `gen_research_calendar.js` volvían a estar desfasados (X-9 "R10 (jue 25-feb-2027)" → **lun 1-mar-2027**; CR-8 "pausa Step 1 (Fases B-C, 8→29-ene)" → **pausa Research 4→29-ene; Fases B-C 13-ene→1-feb**). Corregido el script → 2 `recrear` → `update_event` (solo description) de CR-8 `f2mn20ok30kl5k2t1s6tci7n7c` (updated 18:49:58Z) y X-9 `nibrfidt3qhct59qhtrvqpqqi0` (18:50:06Z) → `--set` de ambos → `--check` = 0 (12 hitos · 0 con acción pendiente).

#### ⚪ 6 · Decisiones de Joseph, no bugs (no se tocan sin su OK)
- Título **"ALUMUERZO"** (typo) — `43dq3oib16esjcqj1dcd8osot2`.
- **Martes**: ALISTARSE 18:30-18:45 (`21lbj9le99k8s9giclm3fauafs`) + VIAJE 18:45-19:00 (`3umsaskrlt1vi5ud3oubmcp504`) le quitan 15' a la Eval USMLE de las 18:00. **En v5.13 el D1 (UWSA1) cae en jueves**, así que la revisión del UWSA1 en la franja 18:00 no se corta (el jueves ALISTARSE es 18:45 — A VERIFICAR (16-sep) con `list_events` del jue 17).
- **Derma d43-d49 y taper**, **LIVIANO D88/D89**, **CR-9**, **ENCAPS intensiva**, **series secundarias el 1-feb y el 2-feb**: ver 🔴 0.

#### ⚪ 7 · Dato de los planes, no del Calendar
- `synapseDailyPlan.ts`: 132 fechas · 2026-09-17 → 2027-01-26 (node); sin pendiente.
- MIR: `mirDailyPlan.ts` termina el jue 7-ene (D78) y `mirMantenimiento.ts` arranca el vie 8-ene (59 días · 47 banco + 12 viernes · 17 reducidos hasta el 2027-02-01; último día 2027-03-31) → no solapan (verificado con node el 16-sep).
- USMLE: `DAILY_META.examenTarget = '2027-02-02'`, `descansoD1 = '2027-02-01'`, `USMLE_TAPER.d94/d95/dMenos1/examen` ya en v5.13 (leídos el 16-sep).
- Research: `researchDailyPlan.ts` 42 átomos D1 = 2026-09-18 → D42 = 2027-02-15, pausa 2027-01-04 → 2027-01-29, CR-9 = d37 = 2027-02-01; ciclo 2 `researchDailyPlan2027.ts` 67 átomos 2027-02-17 → 2027-08-20 (node).
- Derma: `dermaDailyPlan.ts` d1 2026-09-17 · d43 2027-01-15 · d44 2027-01-19 · d48 2027-01-29 · d49 2027-02-02 · d50 2027-02-04 · d73 2027-04-09; `dermaCiclo2.ts` d74 2027-04-13 → d103 2027-07-02 (grep).
- Business: `businessStudyPlan.ts` 121 fechas 2026-09-17 → 2027-01-15 (node).

## 16 · Registro de cambios en el Calendar (19-sep-2026 · corrimiento v5.14)
Corrimiento D1 jue 17-sep → **lun 21-sep** (ni el jue 17 ni el vie 18 se estudiaron; **13.º corrimiento** desde el 31-ago, **15 hábiles perdidos**). **El UWSA1 volvió a cambiar de fecha** (evento suelto `o1gla7846uae4tgngvc4q45osg`): pasó del jue 17-sep 09:00-13:00 al **lun 21-sep 09:00-13:00** (`America/Lima`) y sigue siendo el D1. **El overlay del EXAMEN `oinh139dsnbuma9r3kfu56dhkc` se movió del mar 2-feb al jue 4-feb-2027 07:00-16:00** (regla de §14.1: +1 hábil por cada día perdido; aquí +2). Los otros 11 overlays USMLE conservan su fecha; cambió su D# (todos −2). **Novedades estructurales de v5.14:** 2 overlays de taper (🏁 D94 · 🛌 D95), 6 series de EXTENSIÓN para D93-D95 (resuelven el 🔴 1 de §15.3 sin tocar las RRULE originales) y la serie 📋 REVISIÓN SEMANAL.

Los cambios en vivo los hizo el **agente Calendar del workflow v5.14 el 19-sep** (handoff `DATA/_HANDOFF_v5_14_PENDIENTE.md` §2.1). Esta sección los **registra**; en esta pasada documental se releyeron con `get_event` **9 eventos** (los 2 overlays nuevos, las 6 extensiones y la revisión semanal): todo lo marcado "medido" abajo sale de esas lecturas; el resto viene del handoff. Los D# y fechas de los planes se leyeron con `node` de los `.ts` (`usmleStep1Daily.ts` — `DIAS` 95 entradas, `DAILY_META.examenTarget = '2027-02-04'`, `descansoD1 = '2027-02-03'`, `USMLE_TAPER.d94.fecha = '2027-02-02'` —, `mirDailyPlan.ts`, `mirMantenimiento.ts`, `researchDailyPlan.ts`, `researchDailyPlan2027.ts`, `dermaDailyPlan.ts`, `dermaCiclo2.ts`, `aurumDailyPlan.ts`, `livianoStudyPlan.ts`, `synapseDailyPlan.ts`, `businessStudyPlan.ts`, `vibecodingPlan.ts`).

### 16.0 · Los 12 overlays de hito USMLE + el overlay del EXAMEN + los 2 overlays NUEVOS de taper

| # | Hito · fecha | ID | D# v5.13 → v5.14 | Cambios |
|---|---|---|---|---|
| 1 | UWSA1 **jue 17-sep → lun 21-sep** ⚡ | `o1gla7846uae4tgngvc4q45osg` | D1 → **D1** (sin cambio) | **`start`/`end` movidos** a 2026-09-21 09:00-13:00 `America/Lima` (`start` medido por el agente Calendar: `2026-09-21T09:00:00-05:00`, handoff §2.1) + `description` v5.14 |
| 2 | NBME 25 02-oct | `4hjv5lkvluj06ahc2qndtsi6as` | D12 → **D10** | solo `description` (D# v5.14) |
| 3 | NBME 26 23-oct | `lr7ktrbiffj4hrlke7lh7cv6h4` | D27 → **D25** | ídem |
| 4 | NBME 27 13-nov | `sm4baa2v453ifaub325h9v08mg` | D42 → **D40** | ídem |
| 5 | NBME 28 04-dic | `ecu784689p8osrhqabuct8d5jg` | D57 → **D55** | ídem |
| 6 | NBME 29 18-dic | `ae93qv0nqqs36h439hid1jcq8o` | D67 → **D65** | ídem; semana siguiente: D66-D70 Reproductive (lun 21 → lun 28-dic, 25-dic libre) · D71 mar 29-dic MSK artritis |
| 7 | NBME 30 30-dic | `mael3p9uhp036jbep45ql6v9oc` | D74 → **D72** | ídem; Fase A hasta el jue 14-ene = D81; Fase B = **vie 15-ene → jue 21-ene = D82-D86, 5 días**; lun 4-ene = D73 · mar 5 = D74 · mié 6 = D75 · jue 7 = D76 · vie 8 = D77 UWSA2 · lun 11 = D78 · mar 12 = D79 · mié 13 = D80 · jue 14 = D81 cierre |
| 8 | UWSA2 08-ene | `2u7viv0elr6aedo0m9undfa5kg` | D79 → **D77** | ídem; "cae DENTRO de la Fase A" |
| 9 | NBME 31 15-ene | `l771lvcfv0jcebt61do6svia18` | D84 → **D82** | ídem; GO/NO-GO **el día siguiente al cierre de contenido**; "confirmar en Prometric (jue 4-feb)" |
| 10 | NBME 32 18-ene | `h65e772pqsa4hgc5b6bh9n8h50` | D85 → **D83** | ídem |
| 11 | NBME 33 20-ene | `la5rsbuiqj1o35lb5adf93abuo` | D87 → **D85** | ídem |
| 12 | Free 120 22-ene | `lh9jfjsmoif74ci6jcn8f1mq30` | D89 → **D87** | ídem; "no es el último día del plan": mar 2-feb = D94 última sesión de banco · mié 3-feb = D95 = D-1 |
| 13 | EXAMEN **mar 2-feb → jue 4-feb-2027** ⚡ | `oinh139dsnbuma9r3kfu56dhkc` | — | **`start`/`end` movidos** a 2027-02-04 07:00-16:00 `America/Lima`; título → "🎯 USMLE STEP 1 · EXAMEN (target v5.14 — agendar en Prometric)" (handoff §2.1; no releído aquí) |
| 14 | 🆕 **D94 mar 2-feb-2027** | `neboplchsaua4snj39nrl480nc` | — → **D94** | **`create_event`** (medido: `summary` "🏁 STEP 1 · D94 · última sesión de banco (D-2)" · `start` `2027-02-02T07:15:00-05:00` · `end` 12:00 · `AVAILABILITY_FREE`/`transparent` · color 6 · sin recurrencia · `created` 2026-09-19T18:42:24Z). Texto = `USMLE_TAPER.d94` + contexto D93/D95/examen + "las series USMLE L-V de estos días son la EXTENSIÓN v5.14" |
| 15 | 🆕 **D95 mié 3-feb-2027** | `n90bdqhohadu1eqbctv148dn28` | — → **D95** | **`create_event`** (medido: `summary` "🛌 STEP 1 · D95 · D-1 · sesión mínima AM + ritual de test-day" · `start` `2027-02-03T05:00:00-05:00` · `end` 12:00 · FREE · color 6 · sin recurrencia · `created` 18:42:33Z). Texto = `USMLE_TAPER.d95` + ritual D-1 (`dMenos1`) + "mañana jue 4-feb = EXAMEN … las series de la EXTENSIÓN NO se hacen ese día" |

### 16.1 · Los 12 overlays 🔬 RESEARCH (`gen_research_calendar.js`) — +2 hábiles
Hechos por el agente Calendar (12 `recrear` → `update_event` con fecha/título/descripción del payload → `--set` ×12). **Reconfirmado en esta pasada:** `node DATA/_scripts/gen_research_calendar.js --check` → "Hitos Research en el plan: 12 · overlays con id: 12 · a crear: 0 · a recrear (fecha/título/descripción cambió): 0"; `DATA/RESEARCH/_calendar_overlays.json` con `actualizado: 2026-09-19` y `registrado: 2026-09-19` en los 12; los textos fijos `DEADLINE` del generador ya son v5.14 (X-9 → "R10 (mié 3-mar-2027)"; CR-8 → "CR-9 (lun 1-feb-2027 = D93 del Step 1, primer día-Research tras la pausa) … pausa Research 4→29-ene"). Fechas v5.14 (tabla completa en §5.1): M1 lun 28-sep · C-2 mar 6-oct · T-1 jue 8-oct · C-6 lun 26-oct · CR-1 vie 30-oct · T-8 mar 1-dic · X-1 lun 7-dic · CR-8 jue 17-dic · **CR-9 lun 1-feb (misma fecha; ahora d36 = D93, ya no víspera)** · X-9 jue 25-feb · R10 mié 3-mar · R43 mar 13-jul-2027. Ids intactos (solo `update_event`).

### 16.2 · Las 38 series tocadas (solo `description`) + 6 series de EXTENSIÓN + 1 serie nueva (`create_event`)

**A · 38 series con descripción v5.14** (handoff §2.1; RRULE intactas; no releídas en esta pasada salvo donde se indica):

| Grupo | Series · IDs | Texto v5.14 |
|---|---|---|
| USMLE (6) | ANKI AM `i8afj7uppkb3ntj8h9890dhecc` · repaso 07:15 `54lchqggik96dmljmmg3l88s54` · pre-test 08:15 `3tbecd5n03ut6lno3hjvc1sr7k` (**A VERIFICAR (19-sep)**: inferida por su extensión) · DEEP PRIME `cb2uh20jnvu7pgfev4183pgctc` · 30Q `2eqmmrnh00jr44plevurgcu2as` · eval `utk2laeob9u0847bbe9rm491v4` | etiqueta "Régimen v5.14 (D1 = lun 21-sep-2026)" · 95 días → D95 mié 3-feb · EXAMEN jue 4-feb · fases A D1-81 / B D82-86 / C D87-95 · aviso "⚠ Esta serie termina el vie 29-ene (UNTIL); la EXTENSIÓN v5.14 para D93-D95 es una serie aparte creada el 19-sep" · **4 alineadas a FRANJAS**: 07:15 = 5Q timed · 09:00 = regla del frente · 11:00 = EO + shopping list · 18:00 = 10Q 90 s rule-in → juez → flag |
| Secundarias (8) | vibecoding 04:15 `udr09j9ng983o0d4nipkfe4494` · SYNAPSE 12:30 `j99thg3eaqesosmvppj4rfgvh4` · Research↔Derma `3ofg2ljv8kl3p1adm2e5d5nih3` · AURUM `at1nak8f24nbnj1mh2jcd4aggg` · MIR 15:15 `2ldp6obaapnvo76li28uprrddg` · MIR 15:30 `00k364heibh1n6f9hfspcv9dpi` · ENCAPS `papebi46etlo8glgfs5akd5mig` · LIVIANO `8epae6hlfmrc9j0h2kib7iuc84` | cifras v5.14 de cada plan (§6.1); SYNAPSE 12:30, Research↔Derma, MIR 15:15 (texto MIR_FRANJAS) y MIR 15:30 además alineadas a FRANJAS |
| Comida/rutina (10) | DESAYUNO L-V `7agi60f2bp8qnh6cnqvfo22giv` · DESAYUNO sáb/dom `2u9je70pif58hgf2f8t3vgu8b8` · ALUMUERZO `43dq3oib16esjcqj1dcd8osot2` · EKER `22bh9m5jhc7ro6aj3m4ffjad7g` · CORRER `5mrm4ru08go9k70408jm8vcjku` · CALISTENIA `2lpvftrc3fp64e0om6qg0mcs34` · LECTURA DE LIBRO `7jmf8p1l5b5q6jbtmj9uualiq8` · VIAJE VUELTA `3l59kpei7sg0l6kq51343or383` · ANKI sáb `6ta0e3c019dep76spdgumfm0pl` · ANKI dom `619c1672eej1qgmvddbfkb5fu9` | solo la etiqueta "Régimen v5.14 (D1 = lun 21-sep-2026)" (EKER: "vigente hasta el jue 4-feb-2027, día del examen"); ALUMUERZO: "el UWSA1 cae en LUNES 21-sep = D1" |
| BAILE mié/sáb/dom (3) | `0tod56pc6pgecm5lf7g4e3ji9v` · `3jkfb6097rtc1jbec19eg3sd57` · `7j6pucil43vuca70p082g5ub3d` | solo la etiqueta v5.14 |
| GYM/BAILE restantes (9) — **resuelve el 🟡 4 de §15.3** | GYM lun `6740kavnfkdcvj5k149ouliauu` · BAILE lun `64lue1en3hk0cf8itml2rtlqi4` · BAILE mar `09me7atu516gb0k6u0rbfcj8q1` · GYM mar `0dpes0ekv96a453e89m5osg06t` · **GYM jue `4qvs34d84u82psvknpqhv3jc7a` (id nuevo)** · **BAILE jue `3m8m4resu8akph4a7qfuf3h1qn` (id nuevo)** · GYM vie `7sf8i7pe62pugfk4t6tcnbb9i4` · BAILE vie `5pd4jhmvl31hvbuh40vphpoc4q` · **BAILE PRÁCTICA dom `13m3tcqjjc34rt6iqfblla18q1` (id nuevo)** | "Régimen v5.6" → "Régimen v5.14 (D1 = lun 21-sep-2026)"; los 3 ids nuevos sustituyen a los del 15-sep en §2 (ya actualizados allí) |
| SYNAPSE finde (2) — **resuelve el 🟡 2 y el 🟡 3 de §15.3** | SYNAPSE PC sáb `hv2lk04orquvivthtkfhilb1ps` · SYNAPSE dom `s7r8tiu66286t156l0odpv5nvo` | reescritas sin `<br>` escapados y sin el texto de junio: sáb 15:00-17:00 = SHIP del proyecto de vibecoding (1.er SHIP sáb 26-sep); dom = Feynman + 20′ revisión |

*(6 + 8 + 10 + 3 + 9 + 2 = 38 series, cifra del handoff §2.1)*

**B · 6 series de EXTENSIÓN v5.14 (D93-D95) — `create_event`, mismo título/hora/color que la original, descripción "EXTENSIÓN v5.14 (D93-D95: lun 1 → mié 3-feb-2027) · lun 1-feb D93 = banco (AMBOSS 200 mitad 2) · mar 2-feb D94 = última sesión de banco · mié 3-feb D95 = D-1: solo la mañana ≤2 h · jue 4-feb = EXAMEN (este bloque NO se hace)" + el texto base de la serie.** Todas **medidas con `get_event` en esta pasada** (ids ↔ franjas corregidos respecto al handoff §2.1, que tenía rotados los de ANKI AM / repaso / pre-test):

| Franja | ID extensión | `summary` medido | RRULE / fecha medida | `created` |
|---|---|---|---|---|
| ANKI AM 05:00-05:45 | `gfapfa25hm5d9s65n7oiu0jsms` | 🇺🇸 USMLE — ANKI AM (madrugada fresca · FSRS) + Stress Set en Fases B-C | `RRULE:FREQ=WEEKLY;UNTIL=20270204T045959Z;BYDAY=MO,TU,WE` (lun 1 · mar 2 · mié 3-feb) · color 2 | 2026-09-19T18:44:17Z |
| Repaso 07:15-08:15 | `vi7lrsm2blitpqistrt87i3sqk` | 🇺🇸 USMLE — Repaso Espaciado Multi-Temporal (Anki FSRS D-1/D-3/D-7 + 2Q tema de ayer) | ídem MO,TU,WE UNTIL 20270204 · color 11 | 18:44:24Z |
| Pre-test 08:15-09:00 | `mlqvrm4m8bn38qfl37qddjgk5g` | 🇺🇸 USMLE — PRE-TEST tema del día (10Q uWorld ciegas + Free Recall) | **evento suelto** `2027-02-01T08:15:00-05:00` → 09:00 (sin recurrencia: "solo el lun 1-feb (D93): el D94 y el D95 no llevan pre-test de tema nuevo") | 18:44:32Z |
| 30Q 11:00-12:00 | `u6alh9h3o43l2fu98gmvkvtk90` | 🇺🇸 USMLE — 30 Preguntas Consolidación (uWorld tutor · temas vistos + APEX) | ídem MO,TU,WE UNTIL 20270204 · color 5 | 18:44:38Z |
| Eval 18:00-18:45 | `r850pocdgcm8pi6a42cvv37v1k` | 🇺🇸 USMLE — Evaluación Diaria Acumulativa (Modo Examen timed + Corrección) | `RRULE:FREQ=WEEKLY;UNTIL=20270203T045959Z;BYDAY=MO,TU` (solo lun 1 y mar 2-feb: "el D-1 no lleva nada después de las 17:00") · color 11 | 18:44:45Z |
| DEEP PRIME 09:00-11:00 | `39dm9gk3a58u3iqu9lk28noum0` | 🇺🇸 USMLE — NÚCLEO DEEP PRIME (B&B/Pathoma/Sketchy + First Aid + tarjetas de mecanismo) | ídem MO,TU,WE UNTIL 20270204 · color 2 · texto: "en estos 3 días el bloque NO es contenido nuevo (Fase C): D93 banco/AMBOSS 200 mitad 2 · D94 20Q flagged + Anki maduro + esquemas FA · D95 sesión mínima ≤2 h (ver overlays 🏁 D94 y 🛌 D95)" | 18:45:25Z |

**ENCAPS 16:15 `papebi46etlo8glgfs5akd5mig` NO se extiende**: su `UNTIL=20270130` coincide con el fin del mantenimiento v5.14 (92 días, lun 21-sep → vie 29-ene); la fase intensiva necesitará una serie nueva cuando Joseph fije su arranque (vie 5-feb o lun 8-feb).

**C · 📋 REVISIÓN SEMANAL — `create_event` (medida):** `21fbiohc1i47r4lqmaa3eb76l4` · `summary` "📋 REVISIÓN SEMANAL" · sáb 07:15-07:35 `America/Lima` desde el **sáb 26-sep-2026** · `RRULE:FREQ=WEEKLY;UNTIL=20270207T045959Z;BYDAY=SA` (S1 = sáb 26-sep (semana 21-25 sep) … S20 = sáb 6-feb) · `created` 2026-09-19T18:44:51Z · texto: "node DATA/_scripts/gen_revision_semanal.js → DATA/USMLE/REVISIONES/S<NN>_<sábado>.md · 10 métricas · revisar DATA/REVISION_SEMANAL.md + DATA/PENDIENTES_JOSEPH.md (tachar lo cerrado) · v5.14. Default documentado en REVISION_SEMANAL.md = SÁBADO; si Joseph prefiere el domingo (el SYNAPSE dom ya dice 'Feynman + 20′ revisión'), mover esta serie". Añadida a la tabla del §3.

**Balance del 19-sep-2026 (agente Calendar + esta pasada documental): 2 eventos movidos de fecha (UWSA1 y overlay del examen) · 11 overlays USMLE + 12 overlays 🔬 + 38 series reescritos (solo `description`, salvo los 🔬: fecha/título/descripción) · 9 eventos CREADOS (2 overlays de taper + 6 extensiones + 1 revisión semanal) · cero borrados · cero cambios de RRULE en series existentes · cero `recurrenceData` en UPDATE.** Recuento por día (lun 21-sep, 1-4 feb-2027) **A VERIFICAR (19-sep)** con `list_events`.

### 16.3 · Pendiente REAL (estado al 19-sep-2026, noche)
**Ya están al día en v5.14**: los 12 overlays USMLE (UWSA1 en el lun 21) · el overlay del EXAMEN (jue 4-feb) · los 2 overlays de taper D94/D95 · los 12 overlays 🔬 Research (`--check` = 0 medido) · las 38 series de §16.2-A · las 6 extensiones D93-D95 · la 📋 REVISIÓN SEMANAL · los textos fijos de `gen_research_calendar.js`.

#### ⚠ LO QUE YA NO ESTÁ PENDIENTE (cierra los puntos de §15.3)
- **🔴 1 (RRULE `UNTIL=20270130`) — RESUELTO para las 6 USMLE** con las series de EXTENSIÓN D93-D95 (§16.2-B, medidas): ANKI AM, repaso, DEEP PRIME y 30Q lun-mié 1-3 feb; eval solo lun-mar; pre-test suelto lun 1-feb. Las 7 RRULE originales quedan intactas (no se usó `recurrenceData`, no se borró nada). **ENCAPS 16:15 sigue terminando el vie 29-ene POR DISEÑO** (el mantenimiento v5.14 termina ese día): no es un pendiente; la intensiva necesitará serie nueva cuando Joseph decida su arranque.
- **🟡 2 y 🟡 3 (SYNAPSE finde con texto de junio y `<br>` escapados) — RESUELTOS** (reescritas el 19-sep sin `<br>`; handoff §2.1; **A VERIFICAR (19-sep)** el texto literal con `get_event`).
- **🟡 4 (9 GYM/BAILE con "Régimen v5.6") — RESUELTO** (las 9 con etiqueta v5.14, 3 con id nuevo; §2 ya lista los ids nuevos).
- **🟡 5 (textos fijos del generador Research) — RESUELTO** (ya v5.14 en `gen_research_calendar.js`; `--check` = 0).
- **CR-9 en la víspera del examen — RESUELTO por el propio corrimiento**: CR-9 = lun 1-feb = D93 (banco), no D-1.
- **LIVIANO caso 16 después del capstone — RESUELTO por el corrimiento**: caso 16 D87 vie 22-ene ANTES del capstone D89 mar 26-ene.

#### 🔴 0 · DECISIONES DE JOSEPH (handoff §5; ningún agente las toma)
1. **Prometric**: agendar/reprogramar el Step 1 para el **jue 4-feb-2027** y **confirmar que el eligibility period cubre esa fecha** (si no: extenderlo o recortar temario). Hasta que exista la cita real, el overlay `oinh139dsnbuma9r3kfu56dhkc` es solo un recordatorio FREE. **Cada día más sin estudiar mueve el examen un hábil** (o exige recortar) y obliga a mover también los 2 overlays de taper y las 6 extensiones.
2. **NBME 31 (D82 vie 15-ene) el día siguiente al cierre de contenido (D81 jue 14-ene), sin banco de consolidación delante**: aceptarlo o mover el GO/NO-GO al NBME 32 (D83 lun 18-ene). Propuesta por defecto: aceptar (el hito está anclado por fecha y la Fase B ya incluye D84/D86 de banco).
3. **Fase intensiva ENCAPS**: arranque **vie 5-feb o lun 8-feb** (`gen_encaps_intensivo_2027.js <fecha>`) + serie nueva 16:15 (la actual termina el 29-ene). Propuesta por defecto: lun 8-feb (finde de descanso post-examen).
4. **MIR el jue 4-feb (examen)**: es el D18 del mantenimiento = sesión NORMAL (Gastro + Onco) → reducirlo o vaciarlo. Propuesta por defecto: vaciarlo (el modo reducido termina el 3-feb).
5. **AURUM pitch v5 = D95 mié 3-feb = D-1**: dejarlo (14:15, antes de las 17:00) o moverlo al lun 8-feb. Propuesta por defecto: dejarlo.
6. **Derma d49 = jue 4-feb = día del examen (sesión opcional)**; d43 mar 19-ene = Mohs (sesión normal) con taper d44-d49 posicional → swap d43↔taper opcional. Propuesta por defecto: sin swap, d49 se salta.
7. **Vibecoding**: S6 (lun 26 → vie 30-oct) es la semana post-NBME 26 (D25 vie 23-oct) pero el flag `deload` sigue en S7 → mover el flag a S6 o dejarlo. Propuesta por defecto: mover a S6.
8. **📋 REVISIÓN SEMANAL sábado (creada) vs domingo**: si domingo, mover la serie `21fbiohc1i47r4lqmaa3eb76l4` (el SYNAPSE dom ya dice "Feynman + 20′ revisión").
9. **Series secundarias el jue 4-feb (examen) y GYM/BAILE de la víspera (mié 3-feb, BAILE 19:00-20:30)**: dejarlas (el overlay ya avisa) o vaciar a mano. **A VERIFICAR (19-sep)** con `list_events` del 3 y 4-feb.
10. **4 títulos de series desalineados con la descripción nueva** (no bugs): repaso 07:15 dice "2Q" (texto: 5Q timed) · 30Q 11:00 dice "tutor" (texto: EO + shopping list) · MIR 15:15 dice "4Q" (texto MIR_FRANJAS) · MIR 15:30 dice "Free Recall". Renombrar = `update_event` solo `summary` (las 4 extensiones/originales); decisión de Joseph.
11. **"ALUMUERZO"** (typo) `43dq3oib16esjcqj1dcd8osot2` y **ALISTARSE martes 18:30** (`21lbj9le99k8s9giclm3fauafs` + VIAJE `3umsaskrlt1vi5ud3oubmcp504` recortan 15' a la eval de las 18:00 los martes) — sin cambios desde §9.
12. **Reponer stock de bancos ENCAPS** (V-2 179 · I-3 165 · III-5 90 antes del jue 22-oct …) = CONTENIDO, no estructura (dato del orquestador; no es del Calendar).

#### ⚪ Dato de los planes, no del Calendar (leído con `node` el 19-sep)
- USMLE: `DIAS` 95 · 2026-09-21 → 2027-02-03 · hitos D1/D10/D25/D40/D55/D65/D72/D77/D82/D83/D85/D87 · `faseDe`: A 1-81 · B 82-86 · C 87-95 · viernes N3 D15/D20/D35/D45/D50 · N4 D60 · `examenTarget` 2027-02-04 · `descansoD1` 2027-02-03.
- MIR: `MIR_DIAS` 78 · 2026-09-21 → 2027-01-11; `mirMantenimiento.ts` 57 días 2027-01-12 → 2027-03-31 (17 reducidos hasta 2027-02-03; 11 viernes; 1.er Tier C 2027-01-14; 2027-02-04 = d18 modo normal) → no solapan.
- Research: 42 átomos 2026-09-22 → 2027-02-17 (D36 = 2027-02-01 = CR-9; D37 = 2027-02-03); ciclo 2: 67 átomos 2027-02-19 → 2027-08-24; `RESEARCH_HITOS` = fechas de §5.1.
- Derma: `DERMA_DIAS` 73 · d1 2026-09-21 · d42 2027-01-15 · d43 2027-01-19 · d44 2027-01-21 · d48 2027-02-02 · d49 2027-02-04 · d50 2027-02-08 · d73 2027-04-13; ciclo 2 d74 2027-04-15 → d103 2027-07-06.
- SYNAPSE 131 fechas 2026-09-21 → 2027-01-29 · AURUM 130 (2026-09-21 → 2027-03-24; pitches D15 2026-10-09 · D35 2026-11-06 · D55 2026-12-04 · D75 2027-01-06 · D95 2027-02-03) · LIVIANO 90 (2026-09-21 → 2027-01-27; D5 = caso 1/16) · vibecoding S1 2026-09-21 → 2026-09-25 (ship 2026-09-26), S12 fin 2026-12-11, taper S13-S20 2026-12-14 → 2027-02-03 · Business 121 (2026-09-21 → 2027-01-19).
- ENCAPS (Supabase): 92 días, `bk_0919` — cifras del handoff §4, **A VERIFICAR (19-sep)** en vivo.

---

## 17 · Registro de cambios en el Calendar (22-sep-2026 · corrimiento v5.15 · **RÍGIDO**)
> **Estado: APLICADO en el Calendar vivo el mar 22-sep-2026 por la sesión principal** (medido con `get_event`; §17.6 tiene el registro de lo aplicado y las diferencias respecto a lo que planteaba §17.3). Las tablas de §17.1-§17.3 se conservan porque documentan el plan de cambio con los ids exactos; **lo que quedó pendiente está marcado en §17.6**.
> **Origen:** ni el **lun 21** ni el **mar 22-sep-2026** se estudiaron → **14.º corrimiento** desde el 31-ago (**17 días hábiles perdidos**, 31-ago → 22-sep). **D1 = mié 23-sep-2026 · D95 = vie 5-feb-2027 · EXAMEN TARGET lun 8-feb-2027.**

### 17.0 · La regla nueva: **CORRIMIENTO RÍGIDO**
1. **Solo corren los días.** Ningún tema, subtema ni sesión se toca, se fusiona o se recorta. Verificado: el multiset de temas del Step 1 contra v5.14 da **dif 0** (95 días, 5 560Q).
2. **Donde había un fin clavado, se amplían días.** El ENCAPS de mantenimiento ya no pierde su último slot: conserva sus **92 sesiones** (0 perdidas) y su cierre pasa del vie 29-ene al **mar 2-feb-2027**. Lo mismo el mantenimiento MIR (fin 31-mar → **vie 2-abr-2027**).
3. **Los 12 hitos NBME/UWSA ya NO están anclados por fecha.** Corren con el plan y **conservan su D# exacto**, así que ningún NBME pierde días de contenido por delante (hasta v5.14 cada corrimiento se los comía: el NBME 31 llegó a tener 2 días menos de Fase A).
4. **Efecto colateral aceptado: los hitos dejan de caer en viernes.** Nueve de los doce pasan a **martes**. El fin de semana sigue libre igual; lo que cambia es que el cierre semanal del viernes ya no compite con un simulacro.
5. Lo que NO cambia: sáb y dom libres · franjas horarias · 6h15/día de Step 1 · ENCAPS 16:15-17:15 L-V · SYNAPSE 04:15-05:45 · la regla "cada día perdido = +1 hábil en todo (o recortar, y eso lo decide Joseph)".

### 17.1 · Los 12 overlays de hito USMLE + el del EXAMEN + los 2 de taper — **TODOS se mueven**
`update_event` con `startTime`/`endTime` nuevos (`timeZone: America/Lima`) **y** `description` reescrita (el D# no cambia, la fecha sí). Los ids se conservan.

| # | Hito | **D#** | Fecha v5.14 | **Fecha v5.15** | Día | ID |
|---|---|---|---|---|---|---|
| 1 | UWSA1 — baseline (09:00-13:00) | **D1** | lun 21-sep-2026 | **23-sep-2026** | mié | `o1gla7846uae4tgngvc4q45osg` |
| 2 | NBME 25 | **D10** | vie 2-oct-2026 | **6-oct-2026** | **mar** | `4hjv5lkvluj06ahc2qndtsi6as` |
| 3 | NBME 26 | **D25** | vie 23-oct-2026 | **27-oct-2026** | **mar** | `lr7ktrbiffj4hrlke7lh7cv6h4` |
| 4 | NBME 27 | **D40** | vie 13-nov-2026 | **17-nov-2026** | **mar** | `sm4baa2v453ifaub325h9v08mg` |
| 5 | NBME 28 | **D55** | vie 4-dic-2026 | **8-dic-2026** | **mar** | `ecu784689p8osrhqabuct8d5jg` |
| 6 | NBME 29 | **D65** | vie 18-dic-2026 | **22-dic-2026** | **mar** | `ae93qv0nqqs36h439hid1jcq8o` |
| 7 | NBME 30 — cierre Fase A | **D72** | mié 30-dic-2026 | **5-ene-2027** | **mar** | `mael3p9uhp036jbep45ql6v9oc` |
| 8 | UWSA2 — predictor (09:00-13:00) | **D77** | vie 8-ene-2027 | **12-ene-2027** | **mar** | `2u7viv0elr6aedo0m9undfa5kg` |
| 9 | **NBME 31 — GO/NO-GO** | **D82** | vie 15-ene-2027 | **19-ene-2027** | **mar** | `l771lvcfv0jcebt61do6svia18` |
| 10 | NBME 32 | **D83** | lun 18-ene-2027 | **20-ene-2027** | mié | `h65e772pqsa4hgc5b6bh9n8h50` |
| 11 | NBME 33 | **D85** | mié 20-ene-2027 | **22-ene-2027** | vie | `la5rsbuiqj1o35lb5adf93abuo` |
| 12 | FREE 120 oficial | **D87** | vie 22-ene-2027 | **26-ene-2027** | **mar** | `lh9jfjsmoif74ci6jcn8f1mq30` |
| 13 | 🎯 EXAMEN Step 1 (07:00-16:00) | — | jue 4-feb-2027 | **lun 8-feb-2027** | lun | `oinh139dsnbuma9r3kfu56dhkc` |
| 14 | 🏁 D94 · última sesión de banco (07:15-12:00) | **D94** | mar 2-feb-2027 | **jue 4-feb-2027** | jue | `neboplchsaua4snj39nrl480nc` |
| 15 | 🛌 D95 · D-1 · sesión mínima + ritual (05:00-12:00) | **D95** | mié 3-feb-2027 | **vie 5-feb-2027** | vie | `n90bdqhohadu1eqbctv148dn28` |

⚠ **AVISO IMPORTANTE — los hitos ya NO caen en viernes.** Hasta v5.14 la doctrina era "los simulacros van en viernes para no tocar el fin de semana" y las fechas estaban clavadas. En v5.15 los hitos **corren con el plan** para conservar su D#, y el resultado es que **9 de los 12 pasan a martes** (NBME 25, 26, 27, 28, 29, 30, UWSA2, NBME 31 y FREE 120), el UWSA1 y el NBME 32 caen en miércoles y solo el NBME 33 queda en viernes. **Sáb y dom siguen libres**; lo que hay que re-leer es cualquier texto (descripciones de series, docs, memoria) que diga "los hitos van en viernes".
⚠ **GO/NO-GO: mar 19-ene-2027** (antes vie 15-ene). Sigue siendo el día siguiente al cierre de contenido (D81 lun 18-ene), sin banco de consolidación delante — decisión de Joseph pendiente: aceptarlo o mover el GO/NO-GO al NBME 32 (D83 mié 20-ene).

### 17.2 · Los 12 overlays 🔬 RESEARCH — **+2 hábiles**
El D1 de Research pasa del mar 22 al **jue 24-sep-2026**; cada hito corre 2 días hábiles. `DATA/RESEARCH/_calendar_overlays.json` ya está regenerado (`actualizado: 2026-09-22`) con los **12 en `accionPendiente: "recrear"`**. Fechas y ids en **§5.1**. Secuencia pendiente: `node DATA/_scripts/gen_research_calendar.js` → `update_event` de cada `recrear` → `--set hito=eventId` ×12 → `--check` = 0.

### 17.3 · Series: lo que hay que re-fechar y re-etiquetar
**A · Las 6 series de EXTENSIÓN v5.14 (creadas el 19-sep para D93-D95 = lun 1 → mié 3-feb).** Sus fechas **no cambian**: lun 1 / mar 2 / mié 3-feb siguen siendo días de plan, solo que ahora son **D91-D93** en vez de D93-D95. Lo que sí cambia es qué son: los tres son **banco intensivo de la Fase C** (uWorld incorrects + AMBOSS 200), no días de taper.
**Decisión aplicada el 22-sep (difiere de lo que planteaba la tabla de abajo, que proponía llevarlas a `MO,TU,WE,TH,FR`):** los bloques completos se quedan en **lun-mié** y el **jue 4-feb (D94)** y el **vie 5-feb (D95)** quedan cubiertos **solo por sus overlays de taper** (🏁 D94 07:15-12:00 y 🛌 D95 05:00-12:00). Motivo: el D94 es "solo Anki maduro + 20Q flagged" y el D95 es "≤2 h, solo por la mañana" — poner encima las 6 franjas de 6h15 contradiría el taper y es lo que en v5.14 había que desmentir con texto dentro de la descripción. Con esta decisión el Calendar dice lo mismo que el plan, sin notas al pie.
El MCP tiene `recurrenceData` **roto para UPDATE** → cuando hace falta cambiar una RRULE: `delete_event` + `create_event`, nunca `update_event`.

| Serie de extensión | ID | RRULE v5.14 | **Objetivo v5.15** |
|---|---|---|---|
| ANKI AM 05:00-05:45 | `gfapfa25hm5d9s65n7oiu0jsms` | `UNTIL=20270204;BYDAY=MO,TU,WE` | lun 1 → **vie 5-feb** (`BYDAY=MO,TU,WE,TH,FR`, `UNTIL=20270206T045959Z`) |
| Repaso 07:15-08:15 | `vi7lrsm2blitpqistrt87i3sqk` | ídem | ídem |
| DEEP PRIME 09:00-11:00 | `39dm9gk3a58u3iqu9lk28noum0` | ídem | ídem — texto: en D91-D95 el bloque **no es contenido nuevo** (Fase C) |
| 30Q 11:00-12:00 | `u6alh9h3o43l2fu98gmvkvtk90` | ídem | ídem |
| Eval 18:00-18:45 | `r850pocdgcm8pi6a42cvv37v1k` | `UNTIL=20270203;BYDAY=MO,TU` | lun 1 → **jue 4-feb** (`BYDAY=MO,TU,WE,TH`): el **D-1 (vie 5-feb) no lleva nada después de las 17:00** |
| Pre-test 08:15-09:00 (suelto) | `mlqvrm4m8bn38qfl37qddjgk5g` | evento suelto el lun 1-feb | ⚠ **A DECIDIR:** en v5.15 el lun 1-feb es el **D91** (uWorld incorrects), no un día de tema nuevo → ninguno de los D91-D95 lleva pre-test de tema nuevo. Propuesta: **borrarlo** o dejarlo vacío (decisión de Joseph) |

**B · ENCAPS 16:15 `papebi46etlo8glgfs5akd5mig` — HECHO.** Su `UNTIL=20270130` coincidía con el fin del mantenimiento v5.14 (vie 29-ene). En v5.15 el mantenimiento llega al **mar 2-feb-2027** (92 días, 0 perdidas) → se creó la **serie de extensión `ro0bir8dgsb6dm8k7tqol35g20`** (lun 1 + mar 2-feb, `BYDAY=MO,TU`, `UNTIL=20270203T045959Z`, colorId 1) y la serie principal quedó con su descripción v5.15. La fase intensiva seguirá necesitando su propia serie cuando Joseph fije su arranque (**mar 9-feb** o **mié 10-feb**).

**C · 📋 REVISIÓN SEMANAL `21fbiohc1i47r4lqmaa3eb76l4`** (sáb 07:15-07:35, `UNTIL=20270207T045959Z`): la RRULE **sigue sirviendo** (cubre hasta el sáb 6-feb, que es el sábado entre el D95 y el examen). Solo hay que reescribir el texto: la numeración de semanas cambia (S1 = sáb 26-sep cubre ahora la semana **23-25 sep**, de 3 días) y el último sábado útil es el **6-feb**, ya en el finde previo al examen.

**D · Las 38 series de estudio y rutina: reescribir la `description`.** Todas llevan todavía la etiqueta **"Régimen v5.14 (D1 = lun 21-sep-2026)"** y cifras de v5.14 (§6). Lo que hay que cambiar, como mínimo:

| Serie | Texto v5.14 que queda obsoleto | **Cifra v5.15** |
|---|---|---|
| Etiqueta de versión (las 38) | "Régimen v5.14 (D1 = lun 21-sep-2026)" | **"Régimen v5.15 (D1 = mié 23-sep-2026)"** |
| ANKI AM `i8afj7uppkb3ntj8h9890dhecc` | "95 días desde lun 21-sep hasta mié 3-feb"; "Fases B-C (vie 15-ene → mié 3-feb)" | 95 días **mié 23-sep → vie 5-feb**; Fases B-C **mar 19-ene → vie 5-feb** |
| SYNAPSE misión `j99thg3eaqesosmvppj4rfgvh4` | "131 días · 19 semanas · lun 21-sep → vie 29-ene" | **132 días · 19 semanas · mié 23-sep → lun 1-feb-2027** |
| RESEARCH ↔ DERMA `3ofg2ljv8kl3p1adm2e5d5nih3` | mapa "lun 21 DERMA (d1) · mar 22 RESEARCH (D1) · mié 23 DERMA (d2)…" | **mié 23 DERMA (d1) · jue 24 RESEARCH (D1) · vie 25 DERMA (d2) · lun 28 RESEARCH (D2) · mar 29 DERMA (d3) · mié 30 RESEARCH (D3 = hito M1)** (el ancla de la alternancia sigue siendo el mié 10-jun-2026 y NO se mueve) |
| MIR eval/deep `2ldp6obaapnvo76li28uprrddg` · `00k364heibh1n6f9hfspcv9dpi` | "78 días lun 21-sep → lun 11-ene"; mantenimiento "12-ene → 31-mar" | **78 días mié 23-sep → mié 13-ene-2027**; mantenimiento **jue 14-ene → vie 2-abr-2027** (57 días) |
| ENCAPS `papebi46etlo8glgfs5akd5mig` | "92 días lun 21-sep → vie 29-ene" | **92 días mié 23-sep → mar 2-feb-2027**, backup `study_schedule_bk_0922`, régimen `MANTENIMIENTO_2027-1 v6.13` |
| LIVIANO `8epae6hlfmrc9j0h2kib7iuc84` | "90 días lun 21-sep → mié 27-ene" | **90 días mié 23-sep → vie 29-ene-2027** (caso 1 vie 2-oct … caso 16 vie 29-ene) |
| AURUM `at1nak8f24nbnj1mh2jcd4aggg` | "130 días lun 21-sep → mié 24-mar" | **130 días mié 23-sep → vie 26-mar-2027** |
| 🧠 IA VIBECODING `udr09j9ng983o0d4nipkfe4494` | "1 proyecto por semana de calendario; SHIP los sábados 26-sep…" | **S1-S12 ya no coinciden con las semanas de calendario** (S1 = mié 23 → mar 29-sep); **SHIP sáb 3-oct · 10-oct · 17-oct · 24-oct · 31-oct · 7-nov · 14-nov · 21-nov · 28-nov · 5-dic · 12-dic · 19-dic**; taper S13-S20 mié 16-dic → **vie 5-feb** |
| Sáb SYNAPSE PC `hv2lk04orquvivthtkfhilb1ps` | "1.er SHIP sáb 26-sep; los 12 sábados hasta el 12-dic" | **1.er SHIP sáb 3-oct; los 12 sábados hasta el 19-dic** |
| DECLARACIONES EKER `22bh9m5jhc7ro6aj3m4ffjad7g` | "vigente hasta el jue 4-feb-2027, día del examen (target v5.14)" | **"hasta el lun 8-feb-2027, día del examen (target v5.15)"** |
| Las 7 rutinas de §6.3 | "Régimen v5.14 (D1 = lun 21-sep-2026)" (última línea) | etiqueta v5.15 |

### 17.4 · Lo que ya está hecho fuera del Calendar (22-sep)
- **Planes `.ts` regenerados** (leídos con `node` en esta pasada): USMLE 95 días `2026-09-23 → 2027-02-05`, `examenTarget 2027-02-08`, `descansoD1 2027-02-05` · MIR 78 días `2026-09-23 → 2027-01-13` + mantenimiento 57 días `2027-01-14 → 2027-04-02` (18 reducidos hasta el 2027-02-08) · Research c1 42 átomos `2026-09-24 → 2027-02-19` + c2 67 `2027-02-23 → 2027-08-26` · Derma 73 sesiones `2026-09-23 → 2027-04-15` (taper d44-d49 lun 25-ene → lun 8-feb; d49 = día del examen, sesión opcional; d50 mié 10-feb) · SYNAPSE 132 días `2026-09-23 → 2027-02-01` · vibecoding 95 días (60 de proyectos) `2026-09-23 → 2026-12-15`, taper hasta `2027-02-05` · LIVIANO 90 días `2026-09-23 → 2027-01-29` · AURUM 130 días `2026-09-23 → 2027-03-26` · Business 121 días `2026-09-23 → 2027-01-21`.
- **Supabase ENCAPS re-sembrado**: 92 días `2026-09-23 → 2027-02-02`, backup `study_schedule_bk_0922`, régimen `MANTENIMIENTO_2027-1 v6.13`, 75 `banqueo1h` + 17 `mini_sim`, demanda 1 786Q (idéntica a v5.14: **0 sesiones perdidas**). Los 17 viernes de mini-sim **no se movieron**.
- **Pre-test de arranque ENCAPS regenerado**: `pretest_arranque_2026-09-23` (parte 1: II-3 · V-2 · III-5 · I-3) + `pretest_arranque_2026-09-24` (parte 2: II-4 · IV-1+IV-2 · I-4 · II-5), 40 ids únicos, **39 reales + 1 nuevo**, 0 ítems del 2026-II.
- **Documentación re-fechada** (22-sep): este fichero (§0, §0.1, §5, §5.1, §17) · `PROTOCOLO_HORA_MANTENIMIENTO.md` (v3.11) · `FASE_INTENSIVA_2027-I.md` · `PRETEST_2026-II.md` · `SENALES_2027-I.md` · `RUTINA_EXTREMA_MILITARIZADA.md` · `DOCTRINA_SPRINT_FINAL_EVIDENCIA.md` · `BANCO_PROPIO/README.md` · `CALENDAR_SEGMENTOS_LUNES_VIERNES.md` · `AUDITORIA_AGENTE_ESTUDIO_2026-07-02.md`.

### 17.5 · Decisiones abiertas de Joseph (v5.15)
1. **Prometric**: agendar/reprogramar al **lun 8-feb-2027** y confirmar que el eligibility period lo cubre (si no: extenderlo o recortar temario). `DATA/PENDIENTES_JOSEPH.md`.
2. **GO/NO-GO el mar 19-ene** sin banco de consolidación delante: aceptarlo o moverlo al NBME 32 (mié 20-ene).
3. **D1 de la fase intensiva ENCAPS**: **mar 9-feb** (primer hábil tras el examen, día 97) o **lun 15-feb** (día 101). El pre-test 2026-II se rinde el primer viernes de la intensiva (**vie 12-feb** o **vie 19-feb**) y se genera el jue 4-feb.
4. **Día del examen (lun 8-feb)**: qué hacer con las series secundarias que siguen apareciendo (MIR D18 del mantenimiento, Derma d49 opcional, AURUM, vibecoding S20, GYM) — vaciarlas o dejarlas.
5. ~~**Pre-test suelto del 08:15** en la cola del plan: borrarlo o vaciarlo.~~ **RESUELTO el 22-sep**: se convirtió en serie `BYDAY=MO,TU,WE` (D91-D93), que son días de banco con preguntas — ver §17.6.
6. **LIVIANO**: el caso 16 queda ahora **después** del capstone (caso 16 d90 vie 29-ene · capstone d88 mié 27-ene · revisión trimestral II d89 jue 28-ene), al revés que el diseño de v5.14 — decidir si se re-ordena.
7. **Las 5 instancias ENCAPS perdidas en corrimientos anteriores** (II-8, V-7+V-10, IV-6+IV-7, II-11, III-8): recuperarlas o no en la fase intensiva.

### 17.6 · Lo que SE APLICÓ en el Calendar vivo el mar 22-sep-2026 (medido con `get_event`)

**Hecho (ids intactos salvo donde se indica):**
1. **Los 15 overlays de §17.1** movidos a su fecha v5.15 con `update_event`: los 12 hitos 🎯, el 🎯 EXAMEN (→ **lun 8-feb 07:00-16:00**, título "target v5.15"), 🏁 **D94 → jue 4-feb** (título ya sin "D-2") y 🛌 **D95 → vie 5-feb** (título "último día del plan · sesión mínima AM").
   Descripciones reescritas a v5.15: UWSA1, EXAMEN, D94 y D95 — **las 11 descripciones restantes de hito siguen con el texto v5.14** (fechas del cierre y etiqueta de versión): pendiente menor, la fecha y la hora del evento sí son correctas.
2. **Los 12 overlays 🔬 RESEARCH** re-fechados con `update_event` desde los payloads de `gen_research_calendar.js --print`, registrados con `--set` y verificados: **`--check` = 0** (12 hitos · a crear 0 · a recrear 0). Ningún id cambió.
3. **Series de extensión USMLE:** ANKI AM, repaso 07:15, DEEP PRIME y 30Q conservan `BYDAY=MO,TU,WE` (lun 1 → mié 3-feb = D91-D93) con la descripción reescrita a v5.15. La **eval 18:00** y el **pre-test 08:15** se **recrearon** (`delete_event` + `create_event`, porque `recurrenceData` no se puede actualizar) para incluir el miércoles:
   · eval 18:00 → **`g1trfe00fdcjdduosov00ro7ho`** (`BYDAY=MO,TU,WE`, `UNTIL=20270204T045959Z`) — el id viejo `r850pocdgcm8pi6a42cvv37v1k` está borrado.
   · pre-test 08:15 → **`9vc2n1dinopa7a8se8507s3pts`** (era un evento suelto del lun 1-feb; ahora serie `BYDAY=MO,TU,WE`) — el id viejo `mlqvrm4m8bn38qfl37qddjgk5g` está borrado. Esto **resuelve la decisión 5 de §17.5**: el pre-test no se borra, cubre los tres días de banco D91-D93.
4. **ENCAPS:** serie de extensión nueva **`ro0bir8dgsb6dm8k7tqol35g20`** (lun 1 + mar 2-feb) y descripción de la serie principal a v5.15.
5. **Rutinas con etiqueta de versión ya corregidas:** DECLARACIONES EKER `22bh9m5jhc7ro6aj3m4ffjad7g` (incluida la frase 6, vigente hasta el **lun 8-feb**), CORRER `5mrm4ru08go9k70408jm8vcjku`, CALISTENIA `2lpvftrc3fp64e0om6qg0mcs34`, DESAYUNO `7agi60f2bp8qnh6cnqvfo22giv`.
6. **📋 REVISIÓN SEMANAL — RECREADA el 22-sep**: id nuevo **`0r2rmn0f4vea40dls47lg60t44`** (el viejo `21fbiohc1i47r4lqmaa3eb76l4` está borrado). La RRULE se amplió de `UNTIL=20270207` a **`UNTIL=20270214T045959Z`** para que exista **S21 = sáb 13-feb = POST-MORTEM del examen** (el Step 1 es el lun 8-feb; con el UNTIL viejo la última revisión caía el sáb 6-feb, antes del examen). Texto reescrito: S1 = sáb 26-sep cubre una semana CORTA de 3 días (mié 23 → vie 25-sep) · S20 = sáb 6-feb · S21 = post-mortem.

**Pendiente en el Calendar (no bloquea el arranque del mié 23-sep):**
- Las **11 descripciones de hito** que siguen con texto v5.14 (fechas del cierre del plan y etiqueta de versión dentro del bloque "Lo que se ensaya para el día real").
- Las **~34 descripciones de serie restantes** de la tabla §17.3-D (SYNAPSE, RESEARCH↔DERMA, MIR 15:15/15:30, LIVIANO, AURUM, VIBECODING, sáb PC, ANKI AM principal, las 7 rutinas de §6.3): siguen con "Régimen v5.14 (D1 = lun 21-sep-2026)" y con cifras v5.14.


