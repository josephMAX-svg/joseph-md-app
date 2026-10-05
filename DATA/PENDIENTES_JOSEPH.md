# PENDIENTES DE JOSEPH · régimen v5.19

**Generado:** 08-sep-2026 · **re-fechado a v5.10 el 12-sep** · **consolidado tras la SEGUNDA CAPA el dom 13-sep-2026** · **re-fechado a v5.11 el lun 14-sep** · **re-fechado a v5.12 el mar 15-sep** · **re-fechado a v5.13 el mié 16-sep** · **re-fechado a v5.14 el sáb 19-sep** · **re-fechado a v5.15 el mar 22-sep** · **re-fechado a v5.16 el sáb 26-sep** · **re-fechado a v5.17 el mié 30-sep** · **re-fechado a v5.18 el sáb 3-oct** · **re-fechado a v5.19 el lun 5-oct** · **D1 = MARTES 6-OCT-2026 · EXAMEN STEP 1 TARGET VIE 19-FEB-2027** (v5.18: D1 lun 5-oct · examen jue 18-feb)

> ⚠ **El régimen vigente es v5.19 desde el mar 6-oct-2026.** Es el **decimoctavo corrimiento** (el lun 5-oct
> tampoco se estudió: **26 hábiles perdidos** desde el 31-ago; v5.18 contaba 25 hasta el vie 2-oct). Instrucción literal de Joseph en este (lun 5-oct):
> *«Todo inicia a partir del 6 … solo corre las fechas y alarga un día más la fecha de término … no elimines exámenes, evaluaciones que ya habías programado»*. Es el **5.º corrimiento RÍGIDO** (misma regla que v5.15-v5.18):
> 1. **Ni un tema ni un subtema se toca** — no se fusiona ni se recorta nada (multiset de temas del plan Step 1 contra v5.18: **dif 0**, mismo orden).
> 2. **Los 12 hitos NBME/UWSA no están clavados por fecha**: corren con el plan y conservan su **D# exacto**
>    (D1 · 10 · 25 · 40 · 55 · 65 · 72 · 77 · 82 · 83 · 85 · 87), así **ningún NBME pierde días de preparación por delante**.
>    Efecto visible en v5.19: con el D1 en MARTES **8 de los 12 hitos caen en lunes** (NBME 25 · 26 · 27 · 28 · 30 · UWSA2 · NBME 31 · Free 120),
>    el UWSA1 (D1) y el NBME 32 en martes, y el NBME 29 y el NBME 33 en jueves. *(v5.18: 8 en viernes.)*
> 3. **Donde un plan tenía el final clavado, se AMPLÍAN días** en vez de perder sesiones: ENCAPS 92 días hasta el **lun 15-feb**
>    (v5.18: vie 12-feb) y MIR mantenimiento **57 días, mié 27-ene → jue 15-abr** (v5.18: mar 26-ene → mié 14-abr; se conservan los 46 slots lun-jue).
> 4. **Ninguna evaluación ni examen ya generado se borra: se RE-FECHA** (bancos ENCAPS de la semana 1 con los ítems intactos; la eval de V-2 pasa al lun 12-oct).
>
> **CONSECUENCIA: el plan Step 1 de 95 días termina el JUE 18-FEB-2027 (D95 = último día del plan y D-1 REAL: sesión mínima AM ≤2 h + ritual de test-day,
> `USMLE_TAPER.d95`/`dMenos1`) → examen target VIE 19-FEB-2027**, al día siguiente (`DAILY_META.examenTarget = 2027-02-19`, `descansoD1 = 2027-02-18`); el
> **mié 17-feb (D94)** es la última sesión de banco y, como en v5.18 y v5.16, **NO hay fin de semana libre entre D94 y D95**: el finde
> sáb 13 / dom 14-feb queda entre el D91 (vie 12-feb) y el D92 (lun 15-feb). **Tienes que agendar/reprogramar el Prometric al vie 19-feb y confirmar que tu eligibility period lo cubre** (si no: extenderlo,
> o decidir recortar temario — ver ⚪ fila 0 y 🔴). Franjas y metas **no se movieron**. El Step 1 sigue en **20 semanas** (`STEP1_SEMANAS = 20`: la S1 = lun 5 → vie 9-oct
> tiene 4 sesiones (D1-D4 = mar 6 → vie 9; el lun 5-oct sin sesión); la S20 = 15-19 feb lleva D92-D95 y el examen).
> **Los 12 hitos v5.19:** UWSA1 **mar 6-oct (D1, 09:00-13:00)** · NBME 25 **lun 19-oct** · 26 **lun 9-nov** · 27 **lun 30-nov** ·
> 28 **lun 21-dic** · 29 **jue 7-ene** (por los feriados 25-dic / 31-dic / 1-ene) · 30 **lun 18-ene** · UWSA2 **lun 25-ene** (09:00-13:00) · NBME 31 GO/NO-GO **lun 1-feb** · 32 **mar 2-feb** ·
> 33 **jue 4-feb** · Free 120 **lun 8-feb**. Primer día de CONTENIDO = **mié 7-oct (D2)**; Cardio arranca el **mar 13-oct (D6)**. Semanas deload: **lun 16-nov** (tras el NBME 26) y **lun 28-dic** (tras el NBME 28) — v5.18: 9-nov y 21-dic.
> El contenido cierra el **vie 29-ene (D81, Bioquímica)** y el NBME 31 GO/NO-GO se rinde el primer hábil siguiente (lun 1-feb = D82, con el finde 30-31 ene en medio) sin días de
> banco de consolidación delante; los 2 random timed 2×40Q de la Fase B siguen en D84 (mié 3-feb) y D86 (vie 5-feb) — ver ⚪ fila 0-bis.
> **⚠ Desde aquí cada día no estudiado mueve el examen un día hábil más (o exige recortar).**
> **Regla al leer este doc: el D# es lo estable; la FECHA es lo que se mueve** — con el corrimiento rígido los D# no cambian,
> así que verifica la fecha contra el `.ts` del plan antes de actuar. Las fechas de los bloques vigentes de abajo fueron releídas de los `.ts` / SQL el lun 5-oct-2026 (v5.19); los bloques fechados (estado del árbol, hallazgos de v5.16-v5.18, deploys) conservan su fecha original.
> *(v5.18, 3-oct: D1 lun 5-oct · D94 mar 16-feb · D95 mié 17-feb = D-1 real · sin finde libre entre D94 y D95 · examen jue 18-feb · 8 hitos en viernes · 20 semanas (S1 completa) · 25 hábiles perdidos.)*
> *(v5.17, 30-sep: D1 jue 1-oct · D94 vie 12-feb · finde 13-14 feb libre entre D94 y D95 · D95 lun 15-feb = D-1 real · examen mar 16-feb · 8 hitos en miércoles · 21 semanas · 23 hábiles perdidos.)*
> *(v5.16, 26-sep: D1 lun 28-sep · D94 mar 9-feb · D95 mié 10-feb = D-1 real · sin finde libre entre D95 y el examen · examen jue 11-feb · 8 hitos en viernes · 20 hábiles perdidos. v5.15, 22-sep: D1 mié 23-sep · D94 jue 4-feb · D95 vie 5-feb = D-1 dentro del plan · finde 6-7 libre · examen lun 8-feb · 9 hitos en martes. v5.13, 16-sep: D1 jue 17-sep · D94 vie 29-ene = última sesión de banco · D95 lun 1-feb = D-1 · examen mar 2-feb · contenido desde el vie 18 · Cardio jue 24-sep. v5.12, 15-sep: D1 mié 16-sep · D95 vie 29-ene · examen lun 1-feb. v5.11, 14-sep: D1 mar 15-sep · D95 jue 28-ene = D-1 · examen vie 29-ene. v5.10, 12-13 sep: D1 lun 14-sep · D95 mié 27-ene.)*

Este documento consolida **todo lo que sigue abierto y solo tú puedes cerrar**: decisiones, verificaciones que exigen
sesión logueada (QX, Theomed, AccessDerma, ProMIR, MyNBME, DIGEMID, portal FSE, Anki abierto) y acciones fuera del repo
(Anki, Calendar, n8n, Supabase secrets, compras, envíos). **Lo ya resuelto NO está aquí**: vive en
`DATA/USMLE/_palmerton_v3_extractos/SEGUNDA_CAPA_ESTADO.md` (los 65 puntos ciegos de la 2.ª capa, gap a gap, con el
fichero donde vive cada cosa) y en `DATA/REESTRUCTURACION_31AGO_2026.md` §13 (integración v5.10b).

**Regla de mantenimiento:** se revisa en la **revisión semanal del sábado (07:15-07:35)**, junto a
`DATA/REVISION_SEMANAL.md`. Lo que se cierre se tacha; lo que aparezca nuevo se añade en su bloque.

**Fuentes:** los 13 informes de la segunda capa (12-13 sep) + `gaps_v3b_*.json` + el crítico de completitud del método
Palmerton (31 hallazgos, lista priorizada en `SEGUNDA_CAPA_ESTADO.md` §3) + los informes previos (V57 > CIERRE > FASEC).
Cuando dos agentes se contradicen manda el más reciente.

**Estado del árbol el 13-sep (importa para el bloque 🔴):** el WIP de `mir-pool-clasificar` + `derma-ui` + integración
está en el working tree **sin commit** (19 ficheros modificados + 8 nuevos en `DATA/MIR/pool/`). `npx tsc --noEmit -p .`
= 0 errores · `npx expo export --platform web` = 0 (13-sep). Los agentes tienen prohibido `git commit/push`: el commit y
el deploy son tuyos.

**Estado del árbol el lun 5-oct (v5.19):** el 5.º corrimiento RÍGIDO a D1 = mar 6-oct está aplicado en el working tree — planes `.ts` regenerados
(USMLE 95 d mar 6-oct → jue 18-feb, MIR 78 d → mar 26-ene + mantenimiento 57 d mié 27-ene → jue 15-abr, **Research SIN CAMBIOS** (c1 mar 6-oct → lun 1-mar, PAUSA vie 15-ene → mié 10-feb: el lun 5-oct perdido era día-Derma por paridad), Derma mié 7-oct → jue 29-abr,
LIVIANO → jue 11-feb, Business → mié 3-feb, AURUM → jue 8-abr, SYNAPSE → sáb 13-feb, vibecoding → jue 18-feb), generadores re-fechados,
**Supabase ENCAPS resembrado y verificado** (92 filas mar 6-oct → lun 15-feb, 75 + 17 con las mini-sims en los MISMOS viernes, backup `study_schedule_bk_1005`, régimen `v6.17`, hash de filas = local `f14f94ed…`;
`study_metrics.extra` actualizado: d1 `2026-10-06`), **bancos ENCAPS de la semana 1 RE-FECHADOS — no regenerados ni borrados** (ítems intactos, nota en `_meta.realineado`): pre-test de arranque **mar 6 + mié 7-oct**, `eval_2026-10-06` = D1, evals del 7/8-oct, banco V-2 **jue 8-oct**, banco III-5 **lun 12-oct** + `eval_2026-10-12` (la de V-2), mini-sims `minisim_2026-10-09/16/23` sin cambio, inventario del 5-oct; y **Calendar** con los 15 eventos puntuales re-fechados (12 hitos + examen + D94 + D95, ids conservados), las 6 extensiones USMLE D82-D93 y la extensión ENCAPS RECREADAS con ids nuevos,
la REVISIÓN SEMANAL con descripción v5.19 (mismo id y fechas) y los 12 overlays 🔬 Research sin cambio (`--check` = 0). Las descripciones de las 38 series principales + rutinas pasaron a v5.19 en la pasada del orquestador (víspera = **JUEVES 18-feb**: aviso de D-1 en GYM 19:00 y BAILE 19:30 del jueves, quitado del BAILE del miércoles) — ✅ **verificado el 5-oct con `get_event`** sobre 9 de las 38 (ANKI AM, ENCAPS, RESEARCH↔DERMA, LIVIANO, EKER, GYM jue, BAILE jue, BAILE mié, GYM vie: texto v5.19, `updated` 2026-10-05 17:31-17:45 UTC; `CALENDAR_SEGMENTOS_V5_6.md` §21.4). Esta pasada (textos vigentes) es documental; commit, push y deploy: los cierra el orquestador.

**Estado del árbol el sáb 3-oct (v5.18):** el 4.º corrimiento RÍGIDO a D1 = lun 5-oct está aplicado en el working tree — planes `.ts` regenerados
(USMLE 95 d lun 5-oct → mié 17-feb, MIR 78 d → lun 25-ene + mantenimiento 57 d mar 26-ene → mié 14-abr, Research c1 mar 6-oct → lun 1-mar (PAUSA vie 15-ene → mié 10-feb), Derma lun 5-oct → mar 27-abr,
LIVIANO → mié 10-feb, Business → mar 2-feb, AURUM → mié 7-abr, SYNAPSE → vie 12-feb, vibecoding → mié 17-feb), generadores re-fechados,
**Supabase ENCAPS resembrado y verificado** (92 filas lun 5-oct → vie 12-feb, 75 + 17, backup `study_schedule_bk_1003`, régimen `v6.16`, hash `8d704a84e672c16036f376e55b1ffb69` = local;
`study_metrics.extra` actualizado: d1 `2026-10-05`), bancos ENCAPS regenerados (pre-test de arranque **lun 5 + mar 6-oct**, `eval_2026-10-05` = D1, bancos del 7/8-oct, mini-sims `minisim_2026-10-09/16/23` realineadas —
las del 2-oct se borraron—, inventario del 3-oct) y **Calendar** con los 15 eventos puntuales re-fechados (12 hitos + examen + D94 + D95, ids conservados), las 6 extensiones USMLE D83-D93 y la extensión ENCAPS RECREADAS,
la REVISIÓN SEMANAL RECREADA (arranca el sáb 10-oct, id nuevo) y los 12 overlays 🔬 Research re-fechados (`_calendar_overlays.json` 12/12 con la fecha v5.18, 0 acciones pendientes, 3-oct).
Las descripciones de las 16 series principales + 22 rutinas de apoyo (38 series) están en **v5.18** (get_event → update_event solo description, notificationLevel NONE, horario/recurrencia intactos; aviso de D-1 en el BAILE del miércoles 17-feb, quitado de lunes/martes) y un verificador releyó 6 al azar con `get_event` (3-oct). Esta pasada (textos vigentes) es documental; commit, push y deploy: los cierra el orquestador (línea DEPLOY v5.18).

**Estado del árbol el mié 30-sep (v5.17):** el 3.er corrimiento RÍGIDO a D1 = jue 1-oct está aplicado en el working tree — planes `.ts` regenerados
(USMLE 95 d jue 1-oct → lun 15-feb, MIR 78 d → jue 21-ene + mantenimiento 58 d vie 22-ene → mar 13-abr, Research c1 vie 2-oct → jue 25-feb, Derma jue 1-oct → vie 23-abr,
LIVIANO → lun 8-feb, Business → vie 29-ene, AURUM → lun 5-abr, SYNAPSE → mar 9-feb, vibecoding → lun 15-feb), generadores re-fechados,
**Supabase ENCAPS resembrado y verificado** (92 filas jue 1-oct → mié 10-feb, 75 + 17, backup `study_schedule_bk_0930`, régimen `v6.15`; `study_metrics.extra`
restaurado: d1 `2026-10-01`, dias_ciclo 92 — **antes hubo que limpiar lo que la tarea programada `ENCAPS_v9_daily_0400` pisó el 27-sep, ver el primer ítem de 🔴**),
bancos ENCAPS regenerados (pre-test de arranque **jue 1-oct + lun 5-oct**, `eval_2026-10-01` = D1, bancos del 6/7/8-oct, mini-sims `minisim_2026-10-02/09/16` conservadas, inventario del 30-sep) y
**Calendar** con los 15 eventos puntuales re-fechados (12 hitos + examen + D94 + D95, ids conservados), las 6 extensiones USMLE D85-D93 y la extensión ENCAPS RECREADAS,
la REVISIÓN SEMANAL con descripción nueva (mismo id), los 12 overlays 🔬 Research re-fechados (`gen_research_calendar.js --check` = 0 pendientes, 30-sep) y las
**38 series/rutinas recurrentes** (16 series principales + 22 rutinas de apoyo) con descripción v5.17 verificada con `get_event` (la víspera real = lun 15-feb vive ahora en GYM 19:00 y BAILE 19:30 del LUNES; el BAILE del miércoles ya no es víspera). Commit, push y deploy: ver la línea de deploy abajo.

**Estado del árbol el sáb 26-sep (v5.16):** el 2.º corrimiento RÍGIDO a D1 = lun 28-sep está aplicado en el working tree — planes `.ts` regenerados
(USMLE 95 d lun 28-sep → mié 10-feb, MIR 78 d → lun 18-ene + mantenimiento 57 d mar 19-ene → mié 7-abr, Research c1 → mar 23-feb, Derma → mié 21-abr,
LIVIANO → mié 3-feb, Business → mar 26-ene, AURUM → mié 31-mar, SYNAPSE → vie 5-feb, vibecoding → mié 10-feb), generadores re-fechados,
**Supabase ENCAPS resembrado y verificado** (92 filas lun 28-sep → vie 5-feb, 75 + 17, backup `study_schedule_bk_0926`, régimen `v6.14`),
bancos ENCAPS regenerados (pre-test de arranque **lun 28 + mar 29-sep**, semana 1, mini-sims realineadas 25-sep/2-oct/9-oct → 2/9/16-oct, inventario) y
**Calendar** con los 15 overlays re-fechados (ids conservados), 6 series de extensión NUEVAS D88-D93, extensión ENCAPS nueva y REVISIÓN SEMANAL nueva.
Esta pasada (docs núcleo: REESTRUCTURACION §19, este fichero, CALENDAR_SEGMENTOS §18, REVISION_SEMANAL, ROADMAP) es documental. El commit de cierre y el deploy son tuyos.

**Estado del árbol el mar 22-sep (v5.15):** el corrimiento RÍGIDO a D1 = mié 23-sep está aplicado en el working tree — planes `.ts` regenerados
(USMLE 95 d, MIR 78 d + mantenimiento 57 d, Research, Derma, LIVIANO, Business, AURUM, SYNAPSE, vibecoding), generadores re-fechados,
**Supabase ENCAPS resembrado** (92 filas mié 23-sep → mar 2-feb, backup `study_schedule_bk_0922`, `study_metrics.extra` a v6.13),
bancos ENCAPS regenerados (pre-test de arranque **mié 23 + jue 24-sep**, semana 1, inventario, perfil) y **Calendar** con los 12 hitos
re-fechados por primera vez + examen/D94/D95 + extensiones. `npx tsc --noEmit` = 0 errores. El commit de cierre y el deploy son tuyos.

**Estado del árbol el sáb 19-sep (v5.14):** el corrimiento a D1 = lun 21-sep está en el commit wip `76f17a2` (planes `.ts`, generadores,
Supabase ENCAPS 92 d con backup `study_schedule_bk_0919`, bancos y textos de la app); los docs de esta pasada (este fichero, ENCAPS,
Research, Derma, Business, SYNAPSE, roadmap) van en el working tree, igual que **la pasada de integradores del 19-sep (noche)**: `src/**` (pool MIR → UI, hallazgos del crítico USMLE, ENCAPS `regimenDe()` + rama INTENSIVO, score LIVIANO, Derma v3, KPI 1.ª review), `DATA/_scripts` (`--pull`, fallback de la eval, revisión semanal) y `DATA/SISTEMATIZACION_2026-09-19.md` (tsc = 0 según los 4 integradores). El commit de cierre y el deploy siguen siendo tuyos.

- **Hallazgos del corrimiento v5.19 (lun 5-oct) que piden decisión o solo aviso** (todos releídos de los `.ts` regenerados y del SQL):
  - ⚪ **Conflictos en la víspera / día del examen** (filas ⚪ abajo): **Research X-3** cae el **vie 19-feb = DÍA DEL EXAMEN** y **R8** el **mié 17-feb = D94** (última sesión de banco; ya no en la víspera) (⚪ K) · **AURUM pitch v5** cae el **jue 18-feb = D95 = VÍSPERA** y el **AURUM D96** el **vie 19-feb = examen** (⚪ F/L) · **MIR Tier C express de Oncología Médica** cae el **jue 18-feb = víspera** (modo reducido, que ahora llega hasta el **vie 19-feb inclusive**; ⚪ G/O) · **Derma d48** cae el **jue 18-feb = víspera** (opcional, corta, antes de las 17:00) y el **d49 pasa al lun 22-feb** (ya NO cae el día del examen; ⚪ C) · **vibecoding S20** (journal 5') llega hasta el **jue 18-feb = víspera**. SYNAPSE (→ sáb 13-feb), ENCAPS (→ lun 15-feb), LIVIANO (→ jue 11-feb) y Business (→ mié 3-feb) no chocan con el examen.
  - ⚪ **O (re-fechada en v5.19) · MIR**: el **vie 19-feb (examen)** es el d18 del mantenimiento y el **último día en modo REDUCIDO** (viernes: 10Q de la asignatura peor del log); la **víspera (jue 18-feb = D95)** es el d17, reducido **+ Tier C express de Oncología Médica** (Cardiología + Oncología, `mirMantenimiento.ts`); el mié 17-feb (D94) es d16 (GyO + Pediatría). El primer día normal es el **lun 22-feb** (d19). Los 12 Tier C caen ahora TODOS en jueves (el 12.º, Planificación y Gestión Sanitaria, el **jue 15-abr** = último día). Dejar reducido + Tier C la víspera, vaciarla o mover el Tier C: tu decisión (⚪ G).
  - ✅ **D SIGUE RESUELTA · LIVIANO**: caso integral 16 = **D86 vie 5-feb**, ANTES del capstone (**D89 mié 10-feb**) — ver ⚪ D.
  - ✅ **A RESUELTA · ENCAPS intensiva**: los dos defaults quedan **ALINEADOS** — `gen_encaps_intensivo_2027.js` D1 = `2027-02-22` (lun 22-feb, día 97, primer hábil tras el examen) y `gen_encaps_minisim.js --pretest` = `2027-02-26` (vie 26-feb = pre-test del examen 2026-II); ya no hay alternativa del vie 19-feb (es el día del examen) — ver ⚪ A.
  - ✅ **H RESUELTA · Vibecoding**: con el D1 en martes los bloques van mar → lun y el flag `deload` de **S7** (`motor-preguntas-encaps`, mar 17 → lun 23-nov) ≈ la semana deload del Step 1 (**lun 16 → vie 20-nov**): ya no está desalineado — ver ⚪ H.
  - ⚪ **NUEVO · USMLE · viernes de nivel 4 = solo D54 vie 18-dic** (Heme/Onc; v5.18: 0). Conteo v5.19: N1 28 · N2 37 · **N3 7** (D9 · D14 · D19 · D29 · D34 · D39 · D49) · **N4 5** (D54 + D84 · D86 · D88 · D89) · N5 18 · Q total 5 560 (= v5.18) — ver ⚪ fila Q.
  - ℹ **ENCAPS · bancos de la semana 1 RE-FECHADOS, no se borró ninguna evaluación** (pedido literal de Joseph): `pretest_arranque_2026-10-06` (parte 1: II-3 · I-3 · V-2 · III-5) + `…_2026-10-07` (parte 2: II-5 · I-4 · IV-1+IV-2 · II-4) · `eval_2026-10-06` (D1: 5Q de fallos previos) · `eval_2026-10-07` (ayer II-3) · `eval_2026-10-08` (ayer I-3) · `banco_2026-10-08` = V-2 planeamiento (jue 8) · vie 9-oct = 1.ª mini-sim (`sim_n` 4, día 4) · `banco_2026-10-12` = III-5 pertinencia/barreras (lun 12, día 5) + **`eval_2026-10-12` = la eval de V-2** (el V-2 es el jue 8 y el vie 9 es mini-sim, sin eval). Las salidas con fecha v5.18 (`pretest_arranque_2026-10-05`, `eval_2026-10-05`, `banco_2026-10-07`) ya no existen porque se re-fecharon. El II-5 NTS adolescente pasa al **mar 13-oct** (día 6, semana 2, aún sin generar).
  - ⚪ **M · ENCAPS stock** (inventario 5-oct, 249 disponibles de 434): **III-5 0 disponibles** tras el banco del **lun 12-oct** y **V-2 1/41** tras el del **jue 8-oct** → reponer `set_V-2_2.json` antes del **jue 22-oct** y `set_III-5_2.json` antes del **lun 9-nov** — ver 🟠 «Reponer stock».
  - ℹ Research ↔ Derma: el lun 5-oct perdido era **día-Derma** por paridad, así que **Research NO se mueve** (R0 mar 6-oct … X-6 lun 1-mar, PAUSA vie 15-ene → mié 10-feb; solo cambia su relación con el Step 1: CR-9 = D90, X-8 = D92, R8 = D94, X-3 = examen) y **Derma corre +2 hábiles** (d1 = **mié 7-oct**).
  - ℹ LIVIANO: 90 filas mar 6-oct → jue 11-feb; casos en viernes **D4 · D9 · D14 · D19 · D24 · D29 · D34 · D39 · D44 · D49 · D54 · D66 · D71 · D76 · D81 · D86** (vie 9-oct … vie 5-feb); `LIVIANO_mecanismo.csv` = **D16 mar 27-oct**; Acceso Perú **D40-D43 (lun 30-nov → jue 3-dic) + D45 (lun 7-dic)**.
  - ℹ MIR: Cardiología MIR (D5 **lun 12-oct**) precede a Cardio Step 1 (D6 mar 13-oct); el mini-MIR 40Q (D77) cae el **lun 25-ene = día del UWSA2** (09:00-13:00) y el D78 (corrección) el mar 26-ene.
  - ℹ Business: OUTPUT S14 vie 22-ene (D109) · S15 vie 29-ene (D116) · **S16 mar 2-feb (D120)** · extra **mié 3-feb (D121 = último día)**.
  - ℹ SYNAPSE: **131 días mar 6-oct → sáb 13-feb** (`FIN_PLAN = 2027-02-13`, +1 día); 110 A-units intactas; regla nueva: con START en martes la pieza del LUNES que se caería (No Priors y la última pasada de Pro Git) va al último sábado del plan (sáb 13-feb); el cierre F2 + CCA-F (d131) es el **sáb 13-feb**.
  - ℹ Vibecoding: S1 mar 6 → lun 12-oct … S11 mar 15 → lun 21-dic · S12 mar 22 → mar 29-dic (vie 25 festivo); SHIP sábados **17-oct … 26-dic** y S12 el **sáb 2-ene**; taper S13 mié 30-dic → S20 mar 16 → jue 18-feb. Los criterios de S4/S5 apuntan a `S05_2026-11-07.md` y `S06_2026-11-14.md` (v5.18: S04/S05).
- **Hallazgos del corrimiento v5.18 (sáb 3-oct) que piden decisión o solo aviso** (todos releídos de los `.ts` regenerados):
  - ⚪ **Conflictos en el D-1 / día del examen** (las 5 filas de ⚪ abajo): **Research R8** cae el **mié 17-feb = D95 = D-1 REAL** y el vie 19-feb ya lo ocupa X-3 (⚪ K) · **AURUM pitch v5** cae el **mié 17-feb = D-1** y el **AURUM D96** el **jue 18-feb = examen** (⚪ F/L) · **Derma d49** cae el **jue 18-feb = examen** (opcional, lo esperado es saltarla; ⚪ C) · **MIR mantenimiento** en modo reducido incluye el **jue 18-feb** y ese día cae además la **Tier C express de Oncología Médica** (⚪ G/O) · **vibecoding S20** (journal 5') llega hasta el **mié 17-feb = D-1**. SYNAPSE (→ vie 12-feb), ENCAPS (→ vie 12-feb), LIVIANO (→ mié 10-feb) y Business (→ mar 2-feb) no chocan con el examen.
  - ⚪ **O (re-fechada en v5.18) · MIR jue 18-feb-2027 (día del examen)** = d18 del mantenimiento y **último día en modo REDUCIDO** (10Q mixtas Gastroenterología + **Tier C express Oncología Médica**, `mirMantenimiento.ts`) — vuelve a coincidir con el Tier C, como en v5.16. La víspera (mié 17-feb = D95) es d17, también reducido (Cardiología + Ginecología y Obstetricia); el primer día normal es el vie 19-feb (d19). El 12.º Tier C (Planificación y Gestión Sanitaria) cae el **mié 14-abr** (último día). Dejar reducido + Tier C, vaciar el jueves o mover el Tier C al vie 19-feb: tu decisión (⚪ G).
  - ✅ **D RESUELTA otra vez · LIVIANO**: con el D1 de nuevo en lunes el caso integral 16 (**D87 vie 5-feb**) vuelve a ir ANTES del capstone (**D89 mar 9-feb**), como en v5.16 — ver ⚪ D.
  - ⚪ **NUEVO · USMLE · viernes de nivel 4 = 0 en v5.18** (v5.17 tenía 4: D57 · D69 · D74 · D79; v5.16, 1: D60): `gen_usmle_v5.js` asigna el nivel por día de semana y, con el D1 en lunes, todos los viernes de S11+ son hito, festivo, día 2 de sistema o Fase B. La dosis N4 queda en la **eval 18:00** diaria y en la Fase B/C (D84 · D86 · D88 · D89) — ver ⚪ fila Q (¿reubicar el N4 a otro día?).
  - ⚪ **H · Vibecoding**: con el D1 en lunes los bloques vuelven a ser lun → vie y la semana deload del Step 1 (**lun 9 → vie 13-nov**) es **EXACTAMENTE S6** (`rls-datos-tesis`), pero el flag `deload` sigue en **S7** (lun 16 → vie 20-nov) — ver ⚪ H.
  - ⚪ **A · ENCAPS intensiva**: propuesta **vie 19-feb** (día siguiente al examen) o **lun 22-feb**; hay que alinear el default de `gen_encaps_intensivo_2027.js` (D1 = `2027-02-22`) con el de `gen_encaps_minisim.js --pretest` (`2027-02-19`) cuando decidas — ver ⚪ A.
  - ⚪ **M · ENCAPS stock** (inventario 3-oct, 249 disponibles de 434): **III-5 0 disponibles** tras el banco del jue 8-oct y **V-2 1/41** tras el del mié 7-oct → reponer `set_V-2_2.json` antes del **mié 21-oct** y `set_III-5_2.json` antes del **jue 5-nov** — ver 🟠 «Reponer stock».
  - ℹ Research ↔ Derma: +2 hábiles **conservan la paridad de v5.17** → el **lun 5-oct es Derma (d1)** y el **mar 6-oct Research (R0)**. Research c1 termina el lun 1-mar (PAUSA vie 15-ene → mié 10-feb; CR-9 jue 11-feb = D91).
  - ℹ ENCAPS: las dos partes del pre-test de arranque (**lun 5 + mar 6-oct**) van ANTES de la primera mini-sim (**vie 9-oct**, día 5): el aviso de v5.17 (parte 2 después de la mini-sim) queda resuelto. El banco II-5 NTS adolescente pasa al **lun 12-oct** (semana 2).
  - ℹ Derma ciclo 2 (`dermaCiclo2.ts`, d74 jue 29-abr → d103 mar 20-jul): las lecturas G+ se **re-emparejan con otras sesiones de casos de su misma semana** (los 36 casos y las 9 lecturas G+ siguen intactos; solo cambia con qué sesión va cada lectura).
  - ℹ LIVIANO: el día de importar `LIVIANO_mecanismo.csv` (10 tarjetas de MECANISMO) es el **D16 lun 26-oct** según `livianoStudyPlan.ts`; los casos vuelven a D5 · D10 … D87 (vie 9-oct … vie 5-feb).
  - ℹ MIR: el mini-MIR 40Q (D77) cae el **vie 22-ene = día del UWSA2** (09:00-13:00), como en v5.16/v5.17 (MIR y Step 1 comparten el D1). Cardiología MIR (D5 vie 9-oct) precede a Cardio Step 1 (D6 lun 12-oct).
  - ℹ Business: OUTPUT S14 vie 22-ene (D110) · S15 vie 29-ene (D117) · **S16 lun 1-feb (D120)** · extra **mar 2-feb (D121 = último día)**.
  - ℹ SYNAPSE: con el D1 en lunes las series B/C por día de semana arrancan completas (OFF_WD = 0); regla nueva: si el jueves de la semana es festivo (31-dic) el capítulo de *Automate the Boring Stuff* de ese jueves pasa al **sábado** (cap. 12 → sáb 2-ene), así los caps 0-18 siguen dentro del plan. Última A-unit **vie 12-feb (d131 = D92)**.
  - ℹ Vibecoding: S1 lun 5 → vie 9-oct … S11 lun 14 → vie 18-dic · S12 lun 21 → lun 28-dic (vie 25 festivo); SHIP sábados 10-oct … 19-dic y S12 el **sáb 2-ene**; taper S13-S20 mar 29-dic → mié 17-feb. Los criterios de S4/S5 apuntan ahora a `S04_2026-10-31.md` y `S05_2026-11-07.md` (v5.17: S05/S06).
- **Hallazgos del corrimiento v5.17 (30-sep) que piden decisión o solo aviso:**
  - ✅ **Tarea programada de Windows `ENCAPS_v9_daily_0400`** (plan v9 viejo, fuera del repo): pisó ENCAPS en Supabase el 27-sep; **desactivada el 30-sep con tu permiso** (⚪ P resuelta).
  - ⚪ **O (re-fechada en v5.17) · MIR mar 16-feb-2027 (día del examen)** = d18 del mantenimiento y **último día en modo REDUCIDO** (10Q mixtas Cardiología + Ginecología y Obstetricia, `mirMantenimiento.ts`). En v5.17 **ya no es slot Tier C**: el examen cae en martes y los Tier C van en jueves (el de Oncología Médica, que en v5.16 coincidía con el examen, es ahora el jue 18-feb = d20, ya en modo normal); la víspera (lun 15-feb = D95) es d17, también reducido (Ginecología + Pediatría). El 12.º Tier C (Planificación y Gestión Sanitaria) cae el **mar 13-abr** (último día). Dejar reducido o vaciar el mar 16-feb (y/o el lun 15-feb): tu decisión (⚪ G).
  - ⚪ **D (REABIERTA) · LIVIANO**: con el D1 en jueves el caso integral 16 (**D89 vie 5-feb**) vuelve a caer DESPUÉS del capstone (**D88 jue 4-feb**), como en v5.15 — ver ⚪ D.
  - ℹ Research ↔ Derma: +3 hábiles **invierten la paridad** de la franja 13:30 → el **jue 1-oct es Derma (d1)** y el **vie 2-oct Research (R0)**. Research c1 termina el jue 25-feb (PAUSA mié 13-ene → lun 8-feb; empieza el 13 y no el 12-ene para conservar el orden).
  - ℹ ENCAPS: la parte 2 del pre-test de arranque (**lun 5-oct**) queda DESPUÉS de la primera mini-sim (**vie 2-oct**, D2): II-5 · I-4 · IV-1+IV-2 · II-4 llegan a esa mini-sim sin línea base.
  - ℹ LIVIANO: el día de importar `LIVIANO_mecanismo.csv` (10 tarjetas de MECANISMO del módulo) es el **D15 mié 21-oct** según `livianoStudyPlan.ts` (el D16 jue 22-oct es «Repaso del eje completo»).
  - ℹ MIR: el mini-MIR 40Q (D77) cae el **mié 20-ene = día del UWSA2** (09:00-13:00) — como en v5.16 (ambos vie 15-ene), porque MIR y Step 1 comparten el D1.
  - ℹ Business: el OUTPUT S16 (cierre) pasa al **jue 28-ene** (D120) y el OUTPUT extra al **vie 29-ene** (D121 = último día); el S15 sigue en viernes (22-ene, D114).
  - ℹ SYNAPSE: con el START en jueves las series B/C por día de semana ya no se saltan la 1.ª pieza (Pro Git lun · Dwarkesh mar · PyTut mié corren una semana; el cap. 1 de Lex #452 va al sáb 3-oct).
  - ℹ Vibecoding: bloques de 5 hábiles **jue → mié** (S1 jue 1 → mié 7-oct … S12 jue 17 → mié 23-dic), SHIP sábados 10-oct … 26-dic; los criterios de S4/S5 apuntan ahora a `S05_2026-10-31.md` y `S06_2026-11-07.md` (el nº de semana de las revisiones no cambia).
- **Hallazgos de la pasada documental v5.16 (26-sep, tarde) que piden decisión o solo aviso:**
  - ⚪ **O · MIR jue 11-feb-2027 (día del examen)** *(v5.16 — re-fechada en v5.17: ver el bloque de arriba)* = día 18 del mantenimiento en modo REDUCIDO **y además Tier C express de Oncología Médica (urgencias oncológicas)** según `mirMantenimiento.ts`; el 12.º Tier C (Planificación y Gestión) cae el **mié 7-abr** (último día, la semana 12 solo tiene lun-mié) → dejar reducido + Tier C, vaciar el día o mover el Tier C al vie 12-feb: tu decisión.
  - ℹ Vibecoding: S15 (jue 7 → mar 12-ene) y S16 (mié 13 → vie 15-ene) comparten el sábado de PC del 16-ene (regla «sábado siguiente al último día»); el flag `deload` sigue en S7 (⚪ H).
  - ℹ Business OUTPUT de viernes corren +1 semana respecto a v5.15 (S1 = vie 2-oct … S15 = vie 22-ene, D117; S16 lun 25-ene; extra mar 26-ene).
  - ℹ `RUTA_PUBLICACION_2027.md` §9 (Mesa editorial) se regenera desde Supabase `research_entregables` (`mesaMarkdown()`): las notas en cursiva se reescribieron a mano a v5.16; si las filas de Supabase conservan texto v5.15, la próxima regeneración las pisa → actualizar las filas cuando toques la Mesa (no se tocó Supabase en esta pasada).
  - ℹ Calendar verificado en vivo el 26-sep (tarde): lun 28-sep = 30 eventos (13 bloques + UWSA1 + rutinas); las 22 rutinas de apoyo que aún decían v5.15 se re-etiquetaron (víspera → serie del MIÉ 10-feb; jueves = día del examen). **v5.17 (30-sep):** las 22 rutinas + 16 series principales re-etiquetadas otra vez (víspera → series GYM/BAILE del LUNES 15-feb; martes 16-feb = examen).
**DEPLOY v5.19 — VERIFICADO el lun 5-oct:** commit `fe7e796` (corrimiento completo: planes, generadores, src, ENCAPS, bancos re-fechados, docs; 136 ficheros) → push → Vercel sirvió el bundle `index-1c261656…` (6.595.310 bytes) con `USMLE Step 1 v5.19` ×1, `inicio:'2026-10-06'` ×8, `examenTarget:'2027-02-19'` ×1, **0** × `USMLE Step 1 v5.18` y **0** × `inicio:'2026-10-05'`. tsc = 0 errores · `npx expo export --platform web` OK. Calendar v5.19 completo (15 hitos re-fechados, 7 extensiones recreadas, revisión semanal y 38 series con descripción v5.19, overlays Research `--check` = 0).
**DEPLOY v5.18 — VERIFICADO el sáb 3-oct:** commit `d16ab68` (corrimiento completo: planes, generadores, src, ENCAPS, bancos, docs; 145 ficheros) → push → Vercel sirvió el bundle `index-66173f8d…` (6.591.197 bytes) con `USMLE Step 1 v5.18` ×1, `inicio:'2026-10-05'` ×8, `examenTarget:'2027-02-18'` ×1, **0** × `USMLE Step 1 v5.17` y **0** × `inicio:'2026-10-01'`. tsc = 0 errores · `npx expo export --platform web` OK. Calendar v5.18 completo (15 hitos re-fechados, 7 extensiones + revisión semanal recreadas, 38 series con descripción v5.18, 12 overlays Research con `--check` = 0).
**DEPLOY v5.17 — VERIFICADO el mié 30-sep:** commit `0cb98ea` (corrimiento completo: planes, generadores, src, ENCAPS, bancos, docs; 146 ficheros) → push → Vercel sirvió el bundle `index-037c257d…` (6.593.385 bytes) con `USMLE Step 1 v5.17` ×1, `inicio:'2026-10-01'` ×8, `examenTarget:'2027-02-16'` ×1, **0** × `USMLE Step 1 v5.16` y **0** × `2026-09-23`. tsc = 0 errores · `npx expo export --platform web` OK · la app local renderiza Home con «Step 1 · v5.17 desde 2026-10-01» y 0 errores de consola.

**DEPLOY v5.16 — VERIFICADO el sáb 26-sep (tarde):** commit `1d981bf` (corrimiento completo: planes, generadores, src, ENCAPS, bancos, docs) → push → Vercel sirvió el bundle `index-a20a61e2…` (6.587.559 bytes) con `USMLE Step 1 v5.16` ×1, `inicio:'2026-09-28'` ×8, `examenTarget:'2027-02-11'` ×1 y **0** ocurrencias de `2026-09-23` (el bundle anterior `index-a2484a35…` de v5.15 tenía 36). tsc = 0 errores · `npx expo export --platform web` OK.

---

## 🔴 ANTES DEL D1 (hoy lun 5-oct / mar 6-oct temprano · v5.19; v5.18: sáb 3-oct / lun 5-oct)

Sin esto el plan arranca ciego, con el contenido equivocado o con la app vieja en producción el primer día.

- [x] **✅ RESUELTO el mié 30-sep: tarea `ENCAPS_v9_daily_0400` DESACTIVADA con tu permiso** (`schtasks /change /tn "ENCAPS_v9_daily_0400" /disable` → Estado: Deshabilitado, próxima ejecución N/A; se reactiva con `/enable` si algún día la necesitas). ~~**⚠ 🔴 TAREA PROGRAMADA DE WINDOWS `ENCAPS_v9_daily_0400` — PISA ENCAPS EN SUPABASE A LAS 04:00.**~~ `D:/agente_estudio/ENCAPS/scripts/run_daily.bat` →
      `daily_update.py` → `encaps_supabase_sync.py` (**plan v9 viejo**) hace *upsert* en `study_schedule` (`on_conflict examen,dia`) y en `study_metrics`:
      **el 27-sep pisó ENCAPS dia 1-71 y el `extra`; el 30-sep se limpió y se resembró v5.17** (92 filas jue 1-oct → mié 10-feb, backup `study_schedule_bk_0930`,
      `extra` restaurado). Mientras siga activa puede repetirlo cualquier madrugada. **Decisión tuya (fuera del repo, lo haces tú):** (a) desactivarla —
      `schtasks /change /tn "ENCAPS_v9_daily_0400" /disable` — o (b) quitar la llamada `run_parent("encaps_supabase_sync.py")` de `daily_update.py`. *(ENCAPS/sistema — ⚪ P)*
- [ ] **🔴 AGENDAR EL STEP 1 EN PROMETRIC PARA EL VIE 19-FEB-2027 (o reprogramar la cita si ya existía en la ventana 25-29 ene o en cualquiera de las fechas target anteriores: lun 1-feb, mar 2-feb, jue 4-feb, lun 8-feb, jue 11-feb, mar 16-feb, jue 18-feb) y CONFIRMAR QUE EL ELIGIBILITY PERIOD CUBRE EL 19-FEB.** El plan v5.19 termina el jue 18-feb (D95 = último día del plan y D-1 REAL); el mié 17-feb (D94) es la última sesión de banco y **no hay fin de semana entre D94 y D95** (el sáb 13 / dom 14-feb quedan entre D91 y D92: solo Anki vencido). Si el eligibility period no llega al 19-feb: pedir la extensión a ECFMG (con costo) o decidir recortar temario (⚪ fila 0). Anotar aquí la fecha/hora confirmada y el centro. **Bloqueante: sin cita no hay examen.** *(v5.18 pedía el jue 18-feb; v5.17 el mar 16-feb.)* *(USMLE — Prometric/ECFMG)*
- [x] **Deploy a Vercel de la v5.16 — PENDIENTE (se rellena al cerrar)**: commit de cierre + push → verificar por contenido del bundle `USMLE Step 1 v5.16`, `inicio:'2026-09-28'`, `examenTarget:'2027-02-11'`, `descansoD1:'2027-02-10'`, `ENCAPS:'2026-09-28'` y **0 ocurrencias de `2026-09-23`**. **Lun 28-sep 09:00 al abrir la web**: EEUU debe mostrar Día 1/95 = UWSA1 lun 28-09, Readiness examen 2027-02-11 y ENCAPS D1/92 (origen `study_metrics`); el Home debe pasar de «FASE 6 · transición» a «FASE 7 · STEP 1 PRINCIPAL». *(sistema)* → **HECHO el 26-sep (tarde): commit `1d981bf`, bundle `index-a20a61e2…` verificado por contenido (ver línea DEPLOY v5.16 arriba).**
- [x] **Deploy a Vercel de la v5.15 — VERIFICADO el mar 22-sep (tarde)** *(superado por v5.16: ver el ítem anterior)*: commits `5193b5b` (corrimiento) + `ecd1f24` (últimas cadenas visibles) → push → bundle `index-a2484a35…` (6.588.313 bytes) servido en https://joseph-md-app.vercel.app con `USMLE Step 1 v5.15`, `inicio:'2026-09-23'` ×8, `examenTarget:'2027-02-08'`, `descansoD1:'2027-02-05'` y los marcadores de la sistematización de v5.14 intactos (`dress_rehearsal` ×2, `poolConFallback` ×3). **0 ocurrencias de `2026-09-21`** y una sola de «v5.14», que es una referencia histórica deliberada. Comprobado por contenido del bundle, no por hash.
      *(v5.15, superado:)* **Mié 23-sep 09:00 al abrir la web**: EEUU debía mostrar Día 1/95 = UWSA1 mié 23-09, Readiness examen 2027-02-08 y ENCAPS D1/92 (origen `study_metrics`); el Home debía pasar de «FASE 6 · transición» a «FASE 7 · STEP 1 PRINCIPAL». *(sistema)*
- [x] ~~COMMIT del WIP + decisión `.gitignore`~~ **HECHO 13-sep (commit de cierre de la segunda capa).** Decisión tomada:
      los **PDF y TXT de los cuadernillos** (leyenda "prohibida la reproducción") quedan **fuera del remoto**
      (`.gitignore`; siguen en tu disco en `DATA/MIR/pool/raw/`). Los **JSON parseados y clasificados SÍ se versionan** y
      `src/lib/mirPreguntasOficiales.ts` **se queda en la app** (opción a): es uso privado de estudio, el bundle de Vercel
      no está indexado ni enlazado públicamente, y sin él el quiz MIR pierde la anti-repetición. Si prefieres la opción (c)
      —carga privada— pídelo y se hace en una pasada. *(sistema)*
- [x] **Deploy a Vercel de la v5.13 — VERIFICADO el mié 16-sep (tarde)**: commit de cierre `248aa1e` (sobre el wip `df206d0`) → push → bundle `index-bce1213b…` servido en https://joseph-md-app.vercel.app con `USMLE Step 1 v5.13`, `inicio:'2026-09-17'`, `examenTarget:'2027-02-02'` y `ENCAPS:94` (comprobado por contenido del bundle, no por hash). *(Superado por v5.14: ver el ítem siguiente.)*
- [x] **Deploy a Vercel de la v5.14 — VERIFICADO el dom 20-sep (madrugada)**: commit de cierre `9de02c7` (sobre `76f17a2` → `82540a8` → `98cc71e`) → push → bundle `index-be138f52…` servido en https://joseph-md-app.vercel.app con `USMLE Step 1 v5.14`, `inicio:'2026-09-21'`, `examenTarget:'2027-02-04'`, `ENCAPS:92` **y los marcadores exclusivos de la sistematización** (`dress_rehearsal` ×6 = rama INTENSIVO, `poolConFallback` ×3 = MIR pool→UI, `regimenDe` = ENCAPS dinámico, `APEX::USMLE::Pharmacology`, Derma d49 "jue 4-feb"). Comprobado por contenido del bundle, no por hash. **Lun 21-sep 09:00 abre la web**: EEUU debe mostrar Día 1/95 = UWSA1 lun 21-09, Readiness examen 2027-02-04, ENCAPS D1/92 (origen study_metrics), y el instrumento PROGRESO en '☁ ok'. *(sistema)*
- [x] ~~Copiar los generadores USMLE del scratchpad~~ **HECHO 13-sep**: viven en `DATA/_scripts/usmle/` (gen_usmle_v5 → assemble_usmle_ts → update_diainicio → remap_obsidian_usmle; cadena verificada idempotente desde la ruta nueva) y `remap_inicio.js` ya apunta ahí. *(USMLE/sistema)*
- [ ] **Anki abierto: verificar FSRS y el preset de `APEX::USMLE`** — FSRS activado, *desired retention* **0,90**,
      **10 nuevas/día**. Luego `node DATA/_scripts/anki_telemetria.js` (v2: con `sync` previo si hay login AnkiWeb, si no
      `--no-sync`) y contrastar due/backlog/revisadas con las Stats de Anki (±5 %); pegar el one-liner en la consola de la
      app y comprobar el instrumento ANKI del cockpit y el KPI **"1.ª review del día"** (freno 04:55). Anotar la fecha en
      `DATA/SYNC_ANKI_OBSIDIAN_APP.md` §"Verificación D1-D2". *(SYNAPSE/USMLE)*
- [ ] **Crear el preset FSRS `APEX::MIR`** — retention **0,85** hasta el jue 15-abr-2027 (→ 0,90 desde el vie 16-abr, fase principal; v5.19 · v5.18: 14-abr → 15-abr),
      Good/Again, **nuevas ≤4/día**; la plantilla **APEX-MIR** con los 5 campos (SAQ · por qué · 🇪🇸 delta vs Perú/USA ·
      tag sistema USMLE · **Pregunta oficial de origen**, que la app rellena desde el pool); y **comprobar los nombres
      de los sub-decks** con `curl -s -X POST localhost:8765 -d '{"action":"deckNames","version":6}'`: deben coincidir con
      `APEX::MIR::epidemiologia / ::bioetica / ::dermatologia` (slugs del vault `03_MIR`); si el vault usa otro slug,
      corregir `MIR_DECK` en `src/lib/ankiLinks.ts` (nunca crear variantes en Anki). **Hasta que el redeploy de n8n pase un
      test multilínea real, los APEX MIR se crean directamente en Anki escritorio** (regla ya escrita en la app y README §5).
      *(MIR)*
- [ ] **Crear los 10 sub-decks `APEX::DERMA::A…X`** en Anki escritorio (o `createDeck` por AnkiConnect) y verificar con
      `deckNames` — AnkiConnect no respondió el 05-sep. Sin ellos el TSV de la cola crea decks con nombre suelto al
      importar. *(Derma — antes de la sesión d1 = **mié 7-oct** (v5.19: el lun 5-oct perdido era día-Derma por paridad, así que Derma corre +2 hábiles y Research NO se mueve: R0 sigue el mar 6-oct. v5.18: d1 lun 5-oct · v5.17: d1 jue 1-oct)*
- [ ] **Importar el deck de cifras ENCAPS** — Anki → Importar
      `DATA/ENCAPS/TRACKING_ERRORES/ANKI_COLA/ENCAPS_Cifras_2027-I.csv` (separador `;` · HTML · deck en columna 3 →
      `ENCAPS::Cifras` · tags en columna 3), FSRS, 20 nuevas/día. Se repasa **dentro del bloque Anki de las 05:00, ≤5
      min**, desde el día 1. *(ENCAPS)*
- [ ] **Protocolo test-day para el UWSA1 (MAR 6-OCT 09:00-13:00; v5.18: lun 5-oct)** — 3 bolsas Ziploc BREAK 1/2/3 (huevo duro,
      pavo/pollo, queso, nueces, granos de café con chocolate; **sin galletas ni jugos**); quick-log de sueño y agua en
      VITALS ese día (07:00 y al cerrar el sim); y **escribir en papel el plan B "worst-case" antes del primer bloque**
      (Palmerton §7.6: qué haces si el bloque 1 sale a 40 %; drill "Oh F#@& to OK" 10-15 s; AVP en los descansos). La
      app todavía no tiene dónde guardarlo (hallazgo #26). *(USMLE/rutina)*
      > Contexto v5.19: **los 12 hitos corren con el plan** (no hay hitos clavados por fecha), así que el UWSA1 sigue siendo el D1 pero no es el único que se mueve
      > (vie 11 → lun 14 → mar 15 → mié 16 → jue 17 → lun 21 → mié 23 → lun 28-sep → jue 1-oct → lun 5-oct → **mar 6-oct**): se rinde el **mar 6-oct = D1**, SIN un solo
      > día de contenido encima. Es la línea base pura que prescribe Palmerton: no lo leas como un mal resultado.
- [ ] **Confirmar el re-orden Research v5.10b (mismo orden; v5.19 NO mueve Research — el lun 5-oct perdido era día-Derma por paridad — releído del `.ts` el 5-oct)**: el ciclo 1 arranca el **mar 6-oct** (R0 = D1 del régimen; Derma abre el mié 7-oct); M1 (Dr. Ciro) **lun 12-oct (d3)** ·
      C-2 **mar 20-oct (d6)** · T-1 (ética/CEI) **jue 22-oct (d7)** · M3 (Finlay) **lun 26-oct (d8)** · R9 (¿ya existe la SR?) **mié
      28-oct (d9)** antes de C-6 (**lun 9-nov, d13**) y R6 (**mié 11-nov, d14**) · CR-1 **vie 13-nov (d15)** y CR-2 **mar 17-nov (d16)** · T-2 (STROBE)
      **mié 25-nov (d19)** · R7 **mar 1-dic (d21)** · R3 **vie 8-ene (d33)** · R2 **mar 12-ene (d34)** · X-7 **jue 14-ene (d35, cierre antes de la PAUSA vie 15-ene → mié 10-feb)** · CR-9 (SUBMIT case report #1) **jue 11-feb (d36 = D90 del Step 1)**. Si no lo aceptas, es 1 línea en `gen_research_plan.js` + regenerar + `gen_research_calendar.js --check`.
      *(v5.18: mismas fechas, CR-9 = D91. v5.17: R0 vie 2-oct · M1 jue 8-oct · pausa 13-ene → 8-feb · CR-9 mar 9-feb.)* *(Research)*
- [ ] **⚪ v5.19 · DOS FECHAS LÍMITE EXTERNAS de Research siguen REBASADAS por el corrimiento** (lo detectó el re-fechado de overlays del 22-sep; v5.16, v5.17 y v5.18 lo agravaron 3, 3 y 2 hábiles; **v5.19 no las mueve** porque Research no corrió; es consecuencia de los días no estudiados, no un fallo del pipeline):
      **T-1** cae el **jue 22-oct** (22 días después del límite) pero el texto de su overlay dice *"solicitud CEI expedita ≤ 30-sep"*, y **C-6** cae el **lun 9-nov** (25 días tarde) pero su texto dice *"FECHA LÍMITE EXTERNA ≤ 15-oct-2026"* (ventana de letters del journal diana). *(v5.17: T-1 mar 20-oct · C-6 jue 5-nov.)*
      Decide: (a) adelantar esas dos tareas fuera del slot de Research (son gestiones cortas, no estudio), (b) aceptar la fecha nueva y reescribir el límite en el generador, o (c) cambiar de artículo diana en C-2.
      Lo que elijas se aplica en `gen_research_plan.js` + `gen_research_calendar.js`. *(Research — decisión tuya)*
- [ ] **Re-scan LOGUEADO de QX y Theomed** + decisión escrita de matrícula: ¿sigue vivo el acceso 2026-II? ¿publicaron
      Investigación y Gestión? ¿abrió el ciclo 2027-I? **4 de los 7 simulacros de viernes de la fase intensiva dependen
      de ese acceso**. *(ENCAPS)*
- [ ] **Retomar el quick-log de VITALS a las 07:00** (20 s: horas de sueño + agua) y, desde el mar 6-oct (v5.19; v5.18: lun 5-oct), **registrar
      correr/caminata al volver (06:45, 20 s)** como pide la descripción nueva de CORRER/CALISTENIA (VITALS no modela el
      cardio AM hasta la Tarea D). Sin dato, la métrica 8 de la revisión semanal y el disparador ÁMBAR "sueño <6 h" no
      existen. *(VITALS/sistema)*
- [ ] **Auditar F0 de SYNAPSE contigo en 5'** (día 1): marcar ✓ las A-units ya cursadas jun-ago (Academy *AI Fluency ·
      Claude 101 · Code 101 · Platform 101*, Karpathy, 3B1B) en la pestaña ⚡ run; la primera sin ✓ es la lección real de
      mañana. *(SYNAPSE)*

---

## 🟠 ESTA SEMANA Y LA SIGUIENTE (mar 6-oct → vie 16-oct · v5.19: la semana 1 tiene 4 sesiones, mar 6 → vie 9-oct, porque el D1 cae en martes; v5.18: semana 1 completa lun 5 → vie 9)

### Mar 6-oct (D1) — rituales que estrenan instrumento

- [ ] **04:55** — `node D:/joseph-md-app/DATA/_scripts/journal_hoy.js --abrir` (el enlace 📓 journal de la app abre
      `vscode://file/…`; en el móvil no abre). Regla nueva: **04:55 commit-or-stash obligatorio**, el Anki AM 05:00 no se
      retrasa. *(SYNAPSE)*
- [ ] **16:15** — resolver `BANCO_PROPIO/pretest_arranque_2026-10-06.html` (parte 1: 20Q = 5Q × II-3 · I-3 · V-2 · III-5 — sustituye al banco del día 1)
      y el **mié 7-oct (D2)** la parte 2 (`…_2026-10-07.html`: II-5 · I-4 · IV-1+IV-2 · II-4, sustituye al banco del día 2) — 40/40 ítems reales con clave oficial; **en v5.19 las dos partes siguen yendo ANTES de la primera mini-sim (vie 9-oct)**. En cada uno «Generar JSON» →
      guardar → `node DATA/_scripts/gen_encaps_minisim.js --registrar <export.json> --append` (**no** la línea de 1
      renglón: dejaría la ronda como MIX sin línea base por crítico). **Semana 1 RE-FECHADA el lun 5-oct, no regenerada: no se borró ninguna evaluación** (ítems intactos, nota en `_meta.realineado` de cada fichero; las salidas con fecha v5.18 `pretest_arranque_2026-10-05`, `eval_2026-10-05` y `banco_2026-10-07` ya no existen porque pasaron a las fechas nuevas):
      `eval_2026-10-06` (D1 del régimen: 5Q de fallos previos, críticos primero — no hay día anterior) · `eval_2026-10-07` (ayer II-3) · `eval_2026-10-08` (ayer I-3) · banco **jue 8-oct = V-2 planeamiento** ·
      el **vie 9-oct = primera mini-sim del ciclo** (`sim_n` 4, día 4; `minisim_2026-10-09/16/23` sin cambio) · banco **lun 12-oct = III-5 pertinencia/barreras** (día 5) + **`eval_2026-10-12` = la eval de V-2** (el V-2 es el jue 8 y el vie 9 es mini-sim, sin eval; regla de lunes: si ya registraste los fallos del mini-sim, rehaz esos primero); el **II-5 NTS adolescente pasa al mar 13-oct** (día 6).
      Al cerrar la semana hay que pre-generar los bancos que faltan de la semana 2 (**mar 13 → jue 15-oct**; el del lun 12 ya existe): por día con `--banco <fecha>` + `--eval <fecha>` — ⚠ `--semana 2026-10-12` regenera lun-jue y **pisaría el banco re-fechado del lun 12** (✅ verificado leyendo `modoSemana` de `gen_encaps_minisim.js` el 5-oct: reescribe los `banco_` lun-jue —incluido `banco_2026-10-12`— y las `eval_` mar-jue; la `eval_2026-10-12` del lunes no la toca).
      ⚠ **El pool III-5 queda a 0 disponibles tras el banco del lun 12-oct** y el de V-2 a **1/41** tras el del jue 8-oct: reponer `set_V-2_2.json` antes del **jue 22-oct** (siguiente V-2, clima organizacional) y `set_III-5_2.json` antes del **lun 9-nov** (siguiente III-5, medicina tradicional/complementaria); II-5 tiene **20/27** (su siguiente instancia tras el mar 13-oct es el **mar 10-nov**, Modelo de Cuidado Integral por curso de vida) — ver `_inventario_banco_por_codigo.json`, regenerado el 5-oct. *(v5.18, 3-oct: pre-test lun 5 + mar 6-oct; bancos V-2 mié 7 / III-5 jue 8-oct; II-5 lun 12-oct. v5.17, 30-sep: pre-test jue 1 + lun 5-oct.)* *(ENCAPS)*
- [ ] **17:10** — **primer cierre real desde la app** (HOY → final de la cola → CIERRE DE SESIÓN → Guardar) y comprobar
      que aparece en «17/20» (% ciego semanal + tabla por código) y en Supabase:
      `SELECT fecha, especialidad, porcentaje, fuente, errores_por_tipo FROM study_progress WHERE fuente='app:cierre'`.
      Si el estado dice '⟳ local', pulsar «Sincronizar pendientes» (la ronda queda en `jmd-encaps-cierres`). Desde ese día
      la rutina es diaria; el registro se lleva con «⎘ línea --cerrar» → `node DATA/_scripts/gen_encaps_semana.js --cerrar "…"`
      (o «⎘ JSON ronda» → `gen_encaps_minisim.js --registrar <ronda.json> --append`). *(ENCAPS)*
- [ ] **18:25** — crear la **primera nota del diario USMLE** `01_USMLE/05_DIARY/2026-10-06.md` en el vault (Insertar
      plantilla → `_template_day_usmle`, 60 s) y **activar el plugin Dataview** (instalado en `.obsidian-desktop/plugins`,
      pero `community-plugins.json = []` — A VERIFICAR (12-sep)) para que el Dashboard_USMLE y el bloque APEX rendericen.
      *(USMLE/sistema)*

### Resto de la semana y la siguiente

- [ ] **Jue 8-oct (D3, "setup Anki FSRS"; v5.19 · v5.18: mié 7-oct) — completar la configuración Palmerton §4.2 que la app aún no lista**
      (hallazgo #15): *Maximum reviews/day* **9999** (el default 100 oculta vencidas) · *reviews first, new second* ·
      **rollover 4 h** (despiertas a las 04:00; con rollover 9 h las tarjetas "de hoy" no estarían listas a las 05:00) ·
      sync al abrir y al cerrar · note type *Basic (optional reversed)* sin reversar todo · ≤3 mazos · **Browse → Set Due
      Date 0** para revisar hoy las tarjetas creadas a las 10:45. Anotar en SYNC_ANKI. *(USMLE)*
- [ ] **Tag compartido `sys::<sistema>` a mano** en cada tarjeta mientras el motor APEX no lo ponga (USMLE:
      `sysTag(DIAS[].system)` · MIR: `sysTag(usmleSystem)` · Derma step1: `step1 sys::Dermatology`). Anotar en SYNC_ANKI la
      fecha de la primera verificación con `findCards 'tag:sys::*'`. *(USMLE/MIR/Derma — rutina)*
- [ ] **P0 de seguridad · `datos_tesis` (55 filas de MENORES, RLS OFF, anon key en repo con remoto).** Ejecutar UNA opción
      **antes del T-8 (mar 15-dic, v5.19 = v5.18)** y anotarla en `etica.md` fila 8 — o ya en D1-D2 en vez de esperar al proyecto S6 del
      vibecoding (mar 10 → lun 16-nov, v5.19; v5.18: lun 9 → vie 13-nov): **A (recomendada)** `ALTER TABLE public.datos_tesis ENABLE ROW LEVEL SECURITY;` (sin policies:
      anon deja de leer; service_role sigue) · **B** `DROP TABLE public.datos_tesis;` (irreversible; la maestra sigue en
      `D:\motor_apex` y el CSV de-id cubre el depósito) · **C** RLS + policy "Allow all" (**no protege**).
      ⚠ **Antes:** `D:\motor_apex\bot_tesis.py` inserta vía `supabase_client.py` con `SUPABASE_KEY` de `D:\motor_apex\.env` —
      si es la anon, la opción A rompe el bot (necesita service_role). Comprobar qué key es. El resto de tablas con RLS OFF
      (~43 backups `study_schedule_bk_*`) va en ⚪. *(sistema)*
- [ ] **Anki telemetría con Anki abierto** — `node DATA/_scripts/anki_telemetria.js` una vez con sesión de AnkiWeb para
      validar el `sync` y el KPI `primeraReview`; el proyecto **S2 (mar 13 → lun 19-oct, v5.19; v5.18: lun 12 → vie 16-oct)** crea la tarea programada
      `schtasks /create /tn "JMD Anki telemetria" /tr "node D:\joseph-md-app\DATA\_scripts\anki_telemetria.js" /sc daily /st 21:05`
      (o hook `SessionEnd`). *(SYNAPSE)*
- [ ] **Remoto privado del journal (una vez):** `git -C D:/synapse-journal add -A && git -C D:/synapse-journal commit -m "journal 2026-W38: scaffold"`
      → `gh repo create synapse-journal --private --source=D:/synapse-journal --remote=origin --push`. El repo local ya
      está inicializado (sin commit). *(SYNAPSE)*
- [ ] **Lun 12-oct · M1 (Research d3; v5.19 = v5.18 — la semana que viene) — WhatsApp + reunión con el Dr. Ciro**: 3 coautorías, vía CEI de la tesis, versión
      del CADI usada, su ORCID; es también el arranque del case report (**regla escrita en MENTORES fila 6: si el vie
      30-oct (d10, ~3 semanas desde M1 — fecha del chip del átomo, sin cambio en v5.19) no ha dado caso → mensaje único de `caso_candidatos.md` §2 al colega SPD**). *(Esta semana Research tiene 2 átomos: R0 mar 6-oct (abrir las 10 cuentas) y R1 jue 8-oct (PICO); la siguiente, M1 lun 12-oct · C-1 mié 14-oct · M2 vie 16-oct.)* Los documentos de ética se reúnen
      desde este día (chip en M1). *(Research)*
- [ ] **Vie 9-oct · primera mini-sim del ciclo (ENCAPS · día 4 en v5.19, `sim_n` 4 en el SQL; v5.18: día 5)** — cargar la nota /25 **UNA sola vez** (cierre tipo `mini_sim` en el formulario
      → espejo automático en `study_sim_scores`, o en ▲ SIM; si cargas ambas con valores distintos gana la última).
      ✅ En v5.19 las dos partes del pre-test (mar 6 + mié 7-oct) van ANTES de esta mini-sim: todos los críticos llegan con línea base.
      A las **17:00**: `node DATA/_scripts/gen_encaps_semana.js --sql` → primer override (semana del 12-oct) → `node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-10-06 --override DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/override_2026-10-12.json --bk study_schedule_bk_1009`
      → revisar SQL (DELETE solo MANTENIMIENTO) → `execute_sql` → pegar la
      verificación que imprime (**75 banqueo1h + 17 mini_sim** = 92 filas, mar 6-oct → lun 15-feb, v5.19; v5.18: lun 5-oct → vie 12-feb). *(ENCAPS)*
- [ ] **Verificación EN VIVO en tu Chrome real** (el MCP chrome-devtools no conectó el 13-sep; nadie lo probó en
      producción): *(todas)*
      - **USMLE**: Estudio → USMLE → Cola de hoy → guardar una medición → aparece **MEDIA 7D** en la ReadinessBar y la fila
        en Supabase `usmle_daily_scores`; el banner de burnout no aparece sin 2 hitos bajo mínimo.
      - **Derma → «Cerebro»**: abrir el Hub, plegar/desplegar un bloque del SPEC A-G, abrir una ficha y tocar un hito →
        salta a HOY; el chip «hoy null · A VERIFICAR (13-sep)» del taper ENCAPS es normal hasta fijar la fecha del examen.
        Lámina de HOY con los chips de caso, «retoma en Q#» en el ColaItem, cierre con botones de registro y cola Anki.
      - **MIR**: registrar una eval **en el móvil** y comprobar que aparece en la web y como fila en `mir_eval_log`
        (Table editor); el chip junto a «⤓ Exportar log JSON» debe decir «espejo Supabase ✓ N filas».
        **A VERIFICAR (13-sep):** que `mir_eval_log` guarda `qIds` y que `mirEvalLogPull()` los trae (si no, la
        anti-repetición del pool solo vale por dispositivo).
      - **AURUM** (`expo start` → AurumHub): «✎ registrar semana» abre el editor y el semáforo cambia; en **D15 (lun 26-oct, v5.19; v5.18: vie 23-oct)**
        aparece la rúbrica y el score se guarda en `jmd-aurum-rubrica`; en **D40 (lun 30-nov)** la tarjeta VARIANTE LIVIANO.
- [x] ~~**Calendar — una sesión de 20' con el MCP GCal (hallazgos #1-#4 del crítico + gap MIR 8)**~~ **RESUELTO el 19-sep, RE-FECHADO a v5.15 el 22-sep, a v5.16 el 26-sep, a v5.17 el 30-sep, a v5.18 el sáb 3-oct y a v5.19 el lun 5-oct**: overlays 🏁 D94
      `neboplchsaua4snj39nrl480nc` ahora **mié 17-feb** (07:15-12:00) y 🛌 D95 `n90bdqhohadu1eqbctv148dn28` ahora **jue 18-feb** (05:00-12:00, = víspera real, sin finde en medio); overlay del examen `oinh139dsnbuma9r3kfu56dhkc` → **vie 19-feb** (07:00-16:00);
      **los 12 overlays 🎯 de hito corrieron +1 hábil con ids conservados** (8 caen en lunes: UWSA1 `o1gla7846uae4tgngvc4q45osg` mar 6-oct (09:00-13:00) · NBME 25 `4hjv5lkvluj06ahc2qndtsi6as` lun 19-oct · 26 `lr7ktrbiffj4hrlke7lh7cv6h4` lun 9-nov · 27 `sm4baa2v453ifaub325h9v08mg` lun 30-nov · 28 `ecu784689p8osrhqabuct8d5jg` lun 21-dic · 29 `ae93qv0nqqs36h439hid1jcq8o` jue 7-ene · 30 `mael3p9uhp036jbep45ql6v9oc` lun 18-ene · UWSA2 `2u7viv0elr6aedo0m9undfa5kg` lun 25-ene (09:00-13:00) · 31 `l771lvcfv0jcebt61do6svia18` lun 1-feb · 32 `h65e772pqsa4hgc5b6bh9n8h50` mar 2-feb · 33 `la5rsbuiqj1o35lb5adf93abuo` jue 4-feb · Free 120 `lh9jfjsmoif74ci6jcn8f1mq30` lun 8-feb);
      las series principales L-V terminan el vie 29-ene (UNTIL 20270130) = **D81** en v5.19, así que las 6 series de EXTENSIÓN USMLE se **RECREARON** para **D82-D93 = lun 1 → mar 16-feb** (`BYDAY=MO,TU,WE,TH,FR`, `UNTIL=20270217T045959Z`; ids nuevos: ANKI AM `45cmcfrfhegctp7qpnk2tqf5i8` · repaso 07:15 `f413f0clg153volao0fcrqfurk` · pre-test 08:15 `tsmqfh3a2nuls2893gs6s3r19s` · DEEP PRIME `knmf0o14vrecule8q6tda9q5po` · 30Q `s4t9ct7tpf9i3t9aijgi9oa4bc` · eval 18:00 `64lck9n9sim8vmfqdvg2qopi68`; las 7 de v5.18 ya no existen),
      la **EXTENSIÓN ENCAPS** también es nueva (días 82-92 = lun 1 → lun 15-feb, `UNTIL=20270216T045959Z`, `m00blqfao14jd48v5ffbopm8p8`; con la mini-sim #17 del vie 12-feb) y la 📋 REVISIÓN SEMANAL **conserva id y fechas** (`6iog066kra2e07ue1d0f2osuvs`, sáb 10-oct → sáb 20-feb, 07:15-07:35, `UNTIL=20270221T045959Z`) con descripción v5.19. ✅ Los 12 🔬 Research: sin cambio en v5.19 (Research no corrió; `gen_research_calendar.js --check` = 0).
      *(v5.18, texto literal del 3-oct — estos ids de extensión ya NO existen:)* overlays 🏁 D94 `neboplchsaua4snj39nrl480nc` **mar 16-feb** y 🛌 D95 `n90bdqhohadu1eqbctv148dn28` **mié 17-feb**; overlay del examen `oinh139dsnbuma9r3kfu56dhkc` → **jue 18-feb**;
      **los 12 overlays 🎯 de hito corrieron +2 hábiles con ids conservados** (8 vuelven a caer en viernes: UWSA1 `o1gla7846uae4tgngvc4q45osg` lun 5-oct (09:00-13:00) · NBME 25 `4hjv5lkvluj06ahc2qndtsi6as` vie 16-oct · 26 `lr7ktrbiffj4hrlke7lh7cv6h4` vie 6-nov · 27 `sm4baa2v453ifaub325h9v08mg` vie 27-nov · 28 `ecu784689p8osrhqabuct8d5jg` vie 18-dic · 29 `ae93qv0nqqs36h439hid1jcq8o` mié 6-ene · 30 `mael3p9uhp036jbep45ql6v9oc` vie 15-ene · UWSA2 `2u7viv0elr6aedo0m9undfa5kg` vie 22-ene (09:00-13:00) · 31 `l771lvcfv0jcebt61do6svia18` vie 29-ene · 32 `h65e772pqsa4hgc5b6bh9n8h50` lun 1-feb · 33 `la5rsbuiqj1o35lb5adf93abuo` mié 3-feb · Free 120 `lh9jfjsmoif74ci6jcn8f1mq30` vie 5-feb);
      las series principales L-V terminan el vie 29-ene (UNTIL 20270130) = **D82** en v5.18, así que las 6 series de EXTENSIÓN USMLE se **RECREARON** para **D83-D93 = lun 1 → lun 15-feb** (`BYDAY=MO,TU,WE,TH,FR`, `UNTIL=20270216T045959Z`; ids nuevos: ANKI AM `6sqksi5auf48mauu93s1h4jf0s` · repaso 07:15 `rkpd36d161c801t6lmn3r8ombc` · pre-test 08:15 `6r5qcog93916ufedogf7hp0n9g` · DEEP PRIME `jjado5lllcq88sil0rm7p4p0ig` · 30Q `ovdllf7ovj1utng7il4393pg88` · eval 18:00 `bc1o0n145acsl60cdl5ae2m4po`; las 7 de v5.17 ya no existen),
      la **EXTENSIÓN ENCAPS** también es nueva (lun 1 → vie 12-feb, `UNTIL=20270213T045959Z`, `jg71n1dc2vnbrsktef9ms1rn6g`; días 83-92 con la mini-sim #17 del vie 12-feb) y la 📋 REVISIÓN SEMANAL se **RECREÓ** (`6iog066kra2e07ue1d0f2osuvs`, sáb 10-oct → sáb 20-feb, 07:15-07:35, `UNTIL=20270221T045959Z`; la v5.17 `th5utf73brht5g0lkt87hd4940` ya no existe). ✅ Los 12 🔬 Research: `_calendar_overlays.json` re-registrado el 3-oct (12/12 con la fecha v5.18, ids intactos, 0 acciones pendientes).
      *(v5.17, 30-sep: D94 vie 12-feb · D95 lun 15-feb · examen mar 16-feb · 8 hitos en miércoles · extensiones D85-D93 lun 1 → jue 11-feb `n3k670e5…`/`pokf56lr…`/`i2c8njgr…`/`1klod6lr…`/`7ejpqdtl…`/`mlosps42…` · extensión ENCAPS `upqrbgai…` lun 1 → mié 10-feb · revisión semanal `th5utf73…` sáb 3-oct → sáb 20-feb.)*
      *(v5.16, 26-sep: D94 mar 9-feb · D95 mié 10-feb · examen jue 11-feb · extensiones D88-D93 lun 1 → lun 8-feb · extensión ENCAPS `0bv3ef0do92mt84pa8es8cbgho` lun 1 → vie 5-feb.)*
      **Solo quedan tus decisiones** (⚪ Calendar · 6 decisiones + los 4 títulos): GYM/BAILE de la víspera (en v5.19 la víspera es un **JUEVES**, jue 18-feb: GYM 19:00 `4qvs34d84u82psvknpqhv3jc7a` y BAILE 19:30 `3m8m4resu8akph4a7qfuf3h1qn`, que llevan el aviso de D-1; el BAILE del miércoles `0tod56pc6pgecm5lf7g4e3ji9v` ya no es víspera), ALUMUERZO, ALISTARSE martes (en v5.19 el examen cae en viernes; v5.18: jueves), series secundarias el jue 18-feb (víspera) y el vie 19-feb (examen). Detalle e ids en `CALENDAR_SEGMENTOS_V5_6.md` (§21 = registro v5.19, escrito el 5-oct; §20 = v5.18, 3-oct; §19 = v5.17; §18 = v5.16). *(lo pedido, histórico:)* *(sistema)*
      1. *(histórico v5.14, ya resuelto y re-fechado a v5.15)* **Mar 2-feb (D94 = última sesión de banco, v5.14), MIÉ 3-FEB (D95 = D-1 dentro del plan) y JUE 4-FEB (examen) sin overlay y con TODO activo** (el sáb 30 / dom 31-ene, libres, quedan entre D92 y D93): las 6 series USMLE (RRULE UNTIL 20270130 — ya NO cubre ni D93-D95 ni el examen: hay que extenderlas a `20270204` o crear los overlays del lunes al jueves aparte)
         + MIR 15:15/15:30 + ENCAPS 16:15 + LIVIANO + GYM 19:00 y BAILE 19:30-20:30 la víspera. Crear 3 overlays
         FREE/transparent — mar 2-feb «🏁 D94 · última sesión de banco · D-2» (description = `USMLE_TAPER.d94`: solo Anki maduro + 20Q flagged/incorrects + repaso FA sistemas 6-10), mié 3-feb «🛌 D95 · D-1 · sesión mínima AM + ritual de test-day» (description = `USMLE_TAPER.d95`/`dMenos1`: ≤2 h por la mañana, Anki maduro + 20Q flagged + rapid review FA; tarde = permiso impreso + digital, 2 ID con el nombre exacto, Ziploc numeradas, ruta al Prometric; nada después de las 17:00, cama 21:00; **decidir GYM/BAILE del mar 2 y del mié 3-feb**) y jue 4-feb «🎯 USMLE STEP 1 · Prometric»
         (description = §8.4 bloque a bloque + «no Anki al volver») — y añadir en las 6 series la línea «mar 2-feb: sesión ligera; mié 3-feb: solo la mañana; jue 4-feb: este bloque NO se hace». Recomendación Palmerton: ejercicio ligero sí, GYM+BAILE hasta 20:30 la víspera no. *(v5.13 pedía vie 29 D94 + lun 1-feb D-1 + mar 2-feb examen; v5.12, vie 29 D95 + dom 31 D-1 + lun 1-feb examen.)*
      2. **Series con texto del 27-ago que contradice FRANJAS v5.12** — `update_event` SOLO `description` (nunca
         `recurrenceData`): **07:15** `54lchqggik96dmljmmg3l88s54` («2Q uWorld» → 5Q timed del subtema de ayer = 1.ª
         mitad del gate 80 %) · **11:00** `2eqmmrnh00jr44plevurgcu2as` («explicación completa de correctas E incorrectas»
         → Educational Objective + shopping list + tiempos §3.4: incorrecta 10-15', correcta segura 30-60 s, correcta por
         suerte = incorrecta) · **18:00** `utk2laeob9u0847bbe9rm491v4` («15Q · 72 s/Q · STRESS strategy entre 2» → 10Q ·
         90 s/Q · tope 2 min · rule-in → juez → flag; el *stress set* es otra técnica). La misma frase «stress strategy en
         las dudas entre 2» está en los overlays UWSA1 / NBME 25 / NBME 31 / Free 120 → «rule-in → juez → 2 min → flag».
      3. **MIR 15:15** `2ldp6obaapnvo76li28uprrddg` sigue diciendo «4Q ProMIR/AMIR del tema D-1 · 4/4 avanzar · 3/4 zona
         gris» mientras la app pide pre-test 5Q + quiz 8-10Q con gate por tema (≥80 %). Reescribir la description con el
         texto de `MIR_FRANJAS`.
      4. **Series 09:00 y 11:00**: añadir «el FRENTE de cada tarjeta lo redactas tú (sujeto-primero, sin pistas, sin
         cloze); APEX/Claude solo reverso o compare&contrast» (Palmerton §4.12, hallazgo #17).
      > Las descripciones de ANKI AM 05:00, DESAYUNO, DEEP PRIME, LECTURA, VIAJE VUELTA, EKER, CORRER, CALISTENIA, ANKI
      > sáb/dom, 🧠 IA 04:15, misión 12:30 y PC sáb/dom **ya están en v5.10** (12-13 sep, verificadas con `get_event`); las horas no cambiaron en v5.11, v5.12, v5.13 ni v5.14; el 16-sep se re-fecharon los overlays de hito a v5.13 y el 19-sep a v5.14; el 22-sep a v5.15 (por primera vez cambiaron TODOS); el 26-sep se re-fecharon a v5.16 los 12 hitos (+3 hábiles, ids conservados), el examen (→ jue 11-feb 07:00-16:00), D94/D95 (mar 9 / mié 10-feb) y se RECREARON las 6 extensiones D88-D93, la extensión ENCAPS y la REVISIÓN SEMANAL (detalle en `DATA/ENCAPS/CALENDAR_SEGMENTOS_V5_6.md` §18); **el 30-sep se re-fecharon a v5.17 los 12 hitos (+3 hábiles, ids conservados), el examen (→ mar 16-feb 07:00-16:00), D94/D95 (vie 12 / lun 15-feb) y se RECREARON las 6 extensiones D85-D93 y la extensión ENCAPS; la REVISIÓN SEMANAL solo cambió de descripción**; **el sáb 3-oct se re-fecharon a v5.18 los 12 hitos (+2 hábiles, ids conservados; vuelven casi todos a viernes), el examen (→ jue 18-feb 07:00-16:00), D94/D95 (mar 16 / mié 17-feb) y se RECREARON las 6 extensiones D83-D93, la extensión ENCAPS y la REVISIÓN SEMANAL**; **el lun 5-oct se re-fecharon a v5.19 los 12 hitos (+1 hábil, ids conservados; caen casi todos en lunes), el examen (→ vie 19-feb 07:00-16:00), D94/D95 (mié 17 / jue 18-feb) y se RECREARON las 6 extensiones D82-D93 y la extensión ENCAPS (la REVISIÓN SEMANAL conserva id y fechas)**.
- [x] ~~**Crear el evento recurrente `📋 REVISIÓN SEMANAL`**~~ **RECREADO otra vez el sáb 3-oct (v5.18): `6iog066kra2e07ue1d0f2osuvs`** (sáb 07:15-07:35, `WEEKLY;UNTIL=20270221T045959Z;BYDAY=SA`, `TOTAL_SEM = 20`); **en v5.19 (lun 5-oct) conserva id y fechas y solo cambió la descripción**: **S1 = sáb 10-oct** (cubre lun 5 → vie 9-oct, D1-D4 = mar 6 → vie 9; el lun 5-oct sin sesión) … **S19 = sáb 13-feb** (D87-D91) → **S20 = sáb 20-feb = cierre D92-D95 + POST-MORTEM** del examen del vie 19-feb *(v5.18: S1 completa D1-D5 · S19 = D88-D92 · S20 = D93-D95 + post-mortem del jue 18-feb)*; el id v5.17 `th5utf73brht5g0lkt87hd4940` (26-sep, arrancaba el sáb 3-oct) ya no existe *(v5.17: 21 semanas, S1 = sáb 3-oct corta, S20 = sáb 13-feb D90-D94, S21 = sáb 20-feb D95 + post-mortem del mar 16-feb)*; los ids anteriores `0r2rmn0f4vea40dls47lg60t44` (22-sep, v5.15) y `21fbiohc1i47r4lqmaa3eb76l4` (19-sep, v5.14) están borrados. *(pedido original: sáb 07:15-07:35, con el default documentado en `REVISION_SEMANAL.md`)*
      **y decidir sáb o dom como día oficial** (sigue siendo tu decisión): la descripción nueva del domingo SYNAPSE dice «Feynman + 20' revisión
      semanal» y `REVISION_SEMANAL.md` fija el sábado 07:15 (ya dice «si la hiciste el sábado, solo Feynman»). Descripción
      sugerida: `node DATA/_scripts/gen_revision_semanal.js → DATA/USMLE/REVISIONES/S<NN>.md · 10 métricas`. *(sistema)*
- [ ] **Antes de la revisión S1 (sáb 10-oct, v5.19 = v5.18; v5.17: sáb 3-oct)**: tocar el instrumento SEMANA del cockpit (web) → pegar el portapapeles en
      `DATA/USMLE/REVISIONES/_localstorage_export.json`. Sin ese export las métricas 5/6/7/9 salen "sin dato"; las 1 y 2
      se rellenan a mano hasta el proyecto S3. **Sábados PC:** correr `node DATA/_scripts/verify_vibecoding.js <n>` ANTES
      de marcar el proyecto y pegar el one-liner `localStorage.setItem('jmd-vibe-ship', …)` en la consola (hasta que S3/S4
      lo automaticen). *(sistema/SYNAPSE)*
- [ ] **EKER — revisar la frase 6** añadida el 12-sep («Soy un médico USMLE-ready: cada pregunta ciega es un dato, no un
      juicio.», vigente hasta el día del examen: **vie 19-feb** en v5.19; v5.18: jue 18-feb) y cambiarla si quieres otra; las 5 originales están intactas. *(rutina)*
- [ ] **Redeploy de n8n `APEX-MOTOR-FLOW-V2`** (:5678 sigue con el código del 07-may): con n8n arriba, exportar backup del
      workflow → `python D:\agente_estudio\scripts\_ARCHIVO_DESARROLLO\update_n8n_workflow_v2_3.py` → enviar **1 APEX
      `::OBSIDIAN` multilínea de prueba** con Ctrl+Shift+A y comprobar que la nota llega íntegra a `01_USMLE\…\APEX_creados\`
      y la card a Anki. Candidato al proyecto S4 del vibecoding (catálogo re-secuenciado). *(sistema/SYNAPSE)*
- [ ] **Alinear `D:\agente_estudio\config\fases.json` a v5.19 — `FASE_7.inicio` → `2026-10-06`** (1 línea; fuera del repo, lo haces tú; v5.18 pedía `2026-10-05`, v5.17 `2026-10-01` y v5.16 `2026-09-28`). Mismo árbol que la tarea programada `ENCAPS_v9_daily_0400` del 🔴 (`D:\agente_estudio\ENCAPS\scripts\`). *(histórico:)* ~~**Alinear `D:\agente_estudio\config\fases.json`**~~ **HECHO 19-sep (integrador LIVIANO/SYNAPSE/Derma): FASE_4 `is_current_phase = false`, FASE_7 `true` e `inicio = 2026-09-21`; copia previa en el scratchpad (`fases.json.bak_0919`); queda opcional el `git init` local.** ⚠ v5.15 pedía `2026-09-23`; v5.16, `2026-09-28`; v5.17, `2026-10-01`; v5.18, `2026-10-05`; v5.19 pide **`2026-10-06`**. *(texto original:)* sigue con `FASE_4_ENCAPS_DOMINANTE.is_current_phase = true` y
      `FASE_7.inicio = 2026-10-01`. Poner `false` en FASE_4 (o `true` en FASE_7) y `FASE_7.inicio = 2026-09-21` (D1 del régimen v5.14). Verificar
      antes que `orquestador.py` lee ese campo. Opcional (S1): `git init` LOCAL en `D:\agente_estudio` (sin remoto,
      `.gitignore` para `.env`/`__pycache__`); mientras, los commits [S1]/[S6] van a joseph-md-app. *(sistema)*
- [ ] **Reponer stock del banco ENCAPS** (inventario regenerado el **lun 5-oct, v5.19**, con el pre-test de arranque 6-oct + 7-oct, los bancos re-fechados del jue 8 y lun 12-oct y los 3 primeros mini-sims 9/16/23-oct; demanda 1 786Q en 92 días; pool **249 disponibles de 434**).
      **Cifras reales del inventario del 5-oct** (`disponibles_no_usados` / total del pool · déficit vs demanda):
      **III-5 0/29 (déficit 90Q) — a CERO tras el banco del lun 12-oct; siguiente III-5 = lun 9-nov (medicina tradicional/complementaria)** · **V-2 1/41 (179) — tras el banco del jue 8-oct; siguiente V-2 = jue 22-oct (clima organizacional)** · **I-3 10/33 (170)** · **II-5 20/27 (70) — su banco NTS adolescente cae el mar 13-oct (semana 2, aún sin generar); siguiente II-5 = mar 10-nov (Modelo de Cuidado Integral por curso de vida)** · II-1 11/12 (79) · **II-3 15/28 (75)** · **II-4 15/27 (75)** · **I-4 16/28 (74)** · **IV-1+IV-2 18/28 (72)** · II-11 5/6 (67) · IV-6+IV-7 6/7 (66) · III-8 8/11 (64) · II-8 11/12 (61) · V-MED 22/23 (50).
      **Lo más urgente por STOCK ABSOLUTO (no por déficit):** II-6 **0Q** · II-12 **1Q** · II-EMG **2Q** · II-2 **2Q** · II-10 **2Q** · III-9 **2Q** — varios son cola larga y la receta del viernes pide 4-5Q de cada uno, así que el primer mini-sim que los toque ya se queda corto.
      Por códigos críticos, el orden de reposición es **`set_V-2_2.json` (antes del jue 22-oct)** → **`set_III-5_2.json` (antes del lun 9-nov)** → `set_I-3_2.json` → `set_II-5_2.json` (antes del mar 10-nov si el banco del 13-oct lo deja corto) → `set_II-4_2.json` / `set_I-4_2.json` → `set_II-3_2.json`; después IV-1+IV-2 · IV-6+IV-7 · III-8 · V-MED. *(v5.18, 3-oct: mismas cifras 249/434; III-5 a 0 tras el banco del jue 8-oct, V-2 1/41 tras el del mié 7-oct; siguientes V-2 mié 21-oct · III-5 jue 5-nov · II-5 lun 9-nov. v5.17, 30-sep: 232/434. v5.16, 26-sep: 250/434.)*
      Fuente viva: `DATA/ENCAPS/BANCO_PROPIO/_inventario_banco_por_codigo.json`. Gate §3-bis (clave oficial o compendio/norma con número y año). *(ENCAPS)*
- [ ] **Conseguir `CLAVE DE RESPUESTA 2026-1.pdf`** (Tío López / QX): los 100 ítems del 2026-1 siguen sin clave. *(ENCAPS)*
- [ ] **Importar `DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv`** en Anki (tabulador, deck en columna 3, etiquetas en
      columna 4, FSRS) — **antes del vie 9-oct (D4, caso 1)**, tope **mar 27-oct (D16**, el día de las 10 tarjetas de MECANISMO del
      módulo: «Palmerton: 10 tarjetas Anki de MECANISMO del módulo (deck APEX::LIVIANO::fisiologia)»). Fechas leídas de `livianoStudyPlan.ts` el 5-oct (v5.19; en v5.18 ese día era el D16 lun 26-oct y en v5.17 el D15 mié 21-oct). *(LIVIANO)*
- [ ] **Rutina de export de los registros que viven solo en un navegador** *(Derma/MIR)*:
      - Derma, cada viernes: botón de export del cierre (o en Debilidades) → `DATA/DERMATOLOGIA/TRACKING/_registro_derma.json` → `rondas[]`.
      - MIR, cada semana: HOY → «⤓ Exportar log JSON» → `DATA/MIR/mir_eval_log_export.json` →
        `node DATA/_scripts/gen_delta_espana.js --write` (completar las filas del delta volcadas y subir las estables a la
        tabla de su asignatura) y volcar también en `_registro_resoluciones.json` con `plan:'MIR'`. El espejo Supabase
        `mir_eval_log` reduce el riesgo, no lo elimina.
- [x] **(HECHO 19-sep en la sesión principal, v5.14: MEMORY.md línea 1, usmle-step1-v5.md, encaps-mantenimiento-2027-1.md y el handoff; re-verificado tras la sistematización) Actualizar la memoria `usmle-step1-v5.md`, `encaps-mantenimiento-2027-1.md`, el handoff y MEMORY.md al estado v5.14** (D1 lun 21-sep · D94 mar 2-feb = última sesión de banco · D95 mié 3-feb = D-1 dentro del plan · examen target jue 4-feb · sáb 30/dom 31-ene libres entre D92 y D93 · MIR 78 d → lun 11-ene, mantenimiento 57 d desde el mar 12-ene · ENCAPS 92 d → vie 29-ene · SYNAPSE vie 29-ene · Research +2 (mar 22-sep → mié 17-feb, CR-9 lun 1-feb = D93) · Derma +1 slot 21-sep → mar 13-abr, taper 21-ene → 4-feb con d49 = día del examen): el orden
      real es el de `REESTRUCTURACION` §13.3 — `remap_inicio.js <fecha>` (ya incluye Research vía `gen_research_plan.js`,
      Derma 73 + ciclo 2, Business vía `gen_business_plan.py`, LIVIANO) → `gen_vibecoding_plan.js` **antes que**
      `gen_synapse_plan.js` → `gen_aurum_plan.js` → `gen_mir_daily.js --check` (+ `gen_mir_mantenimiento.js` si D78 pisa el
      inicio del mantenimiento; v5.14: D78 lun 11-ene → mantenimiento desde el mar 12-ene) → `gen_encaps_mantenimiento_2027.js` → `execute_sql` → USMLE con `gen_usmle_v5.js` → tsc/expo → docs + overlays.
      ⚠ No volver a ejecutar `build_vault_research.js` (sobreescribiría `obsidianResearchMap.ts`); ⚠ los `gen_readme.js` /
      `gen_calendario.js` del scratchpad no conocen `franjaNota`/`USMLE_TAPER`/viernes N4: no re-ejecutarlos. *(sistema)*
- [ ] **Los D# de LIVIANO vuelven a moverse en v5.19 (los 16 casos siguen en viernes; con el D1 en martes el vie 9-oct = D4 tiene el caso 1)**:
      casos **D4 · D9 · D14 · D19 · D24 · D29 · D34 · D39 · D44 · D49 · D54 · D66 · D71 · D76 · D81 · D86** (vie 9-oct … vie 5-feb) ·
      drills de cifras ancla **D37 (mié 25-nov) / D58 (jue 24-dic) / D75 (jue 21-ene) / D88 (mar 9-feb, repaso integral I)** · Síntesis M1 **D20 (lun 2-nov)** · Síntesis M2 **D38 (jue 26-nov)** ·
      Acceso Perú **D40-D43 (lun 30-nov → jue 3-dic) + D45 (lun 7-dic)** (el vie 4-dic = D44 es el caso 9) · trimestral I **D46 (mar 8-dic)** y II + cierre **D90 (jue 11-feb)** · capstone **D89 (mié 10-feb)** ·
      **✅ caso 16 integral D86 (vie 5-feb) = ANTES del capstone** (⚪ fila D sigue RESUELTA). *(v5.18: casos D5 … D87 vie 9-oct → vie 5-feb, capstone D89 mar 9-feb, Acceso Perú D39 + D41-D44. v5.17: casos D7 … D89, capstone D88 jue 4-feb, caso 16 DESPUÉS del capstone.)*
      Código del repo alineado en v5.19 (`livianoScore.ts` cabecera «D37 · D58 · D75 · D88, v5.19 = v5.18» y `empresaData.ts` acceso [40, 41, 42, 43, 45] · revisiones D46 mar 8-dic / D90 jue 11-feb · capstone D89 mié 10-feb verificados el 5-oct); ✅ **re-verificados más tarde el 5-oct:** `LIVIANO_ACADEMIA.md` y `LIVIANO_PROTOCOLO_CLINICO_v1.md` ya citan v5.19 (en la primera relectura aún no), `LivianoTodayPlan.tsx` (cabecera «D37 · D58 · D75 · D88, v5.19 = v5.18») y la descripción de la serie LIVIANO del Calendar (`8epae6hlfmrc9j0h2kib7iuc84`, `get_event`: 90 días mar 6-oct → jue 11-feb, casos D4 … D86, capstone D89 mié 10-feb); queda además cualquier nota EXTERNA tuya (Notability/Obsidian) que cite los D# de v5.18 (D5 · D10 … D87). **Con el corrimiento rígido el D# es lo estable; lo que se mueve es la fecha** (salvo en LIVIANO, donde los casos se anclan al viernes y el D# del contenido se reacomoda). *(LIVIANO)*

---

## 🟡 ESTE MES (oct-nov)

### Research — envíos y gestiones (nadie más puede hacerlas)

Fechas releídas de `researchDailyPlan.ts` el lun 5-oct. **v5.19: Research NO se mueve** (el lun 5-oct perdido era día-Derma por paridad; Research ya arrancaba el mar 6-oct): el ciclo 1 sigue teniendo **los mismos 42 átomos en las mismas fechas que v5.18** — arranca el **mar 6-oct (R0 = D1 del régimen; Derma abre el mié 7-oct)** y termina el **lun 1-mar-2027**; la **PAUSA por el Step 1 va del vie 15-ene al mié 10-feb** (`pausa: '2027-01-15 → 2027-02-10'`): R3 cabe ANTES de la pausa (d33 vie 8-ene), R2 es d34 (mar 12-ene) y X-7 (cierre antes de la pausa) es d35 (jue 14-ene). Tras la pausa quedan **7 átomos**, y lo que cambia es su relación con el Step 1: **CR-9 d36 jue 11-feb (= D90, 5 hábiles antes del examen)** · X-8 d37 lun 15-feb (= D92; su texto ya dice «… el examen Step 1 es el vie 19-feb») · **R8 d38 mié 17-feb = D94 = última sesión de banco** (protocolo PRISMA-P, átomo recortable) · **X-3 d39 vie 19-feb = DÍA DEL EXAMEN ⚠** · X-4 mar 23 · X-5 jue 25-feb · X-6 lun 1-mar. ⚠ **Decisión tuya (⚪ K):** X-3 cae el día del examen (y R8 en la última sesión de banco) — moverlo exige correr la cola del ciclo 1 un slot (X-3…X-6 y el arranque del ciclo 2, mié 3-mar) o posponerlo/recortarlo; el plan corre hoy con R8 el mié 17-feb y X-3 el vie 19-feb. *(v5.18: mismas fechas; CR-9 = D91, X-8 = D93, R8 = D95 = D-1 real, X-3 = el día siguiente al examen.)* *(v5.17: ciclo vie 2-oct → jue 25-feb, pausa 13-ene → 8-feb, CR-9 d36 mar 9-feb = D91, R8 d38 lun 15-feb = D-1.)* *(v5.16: ciclo lun 28-sep → mar 23-feb, pausa 7-ene → 3-feb, CR-9 d36 vie 5-feb = D92, R8 d38 jue 11-feb = día del examen. v5.15: ciclo jue 24-sep → vie 19-feb, pausa 4→29-ene, R3 desplazado tras la pausa a d37 vie 5-feb, CR-9 d35 lun 1-feb = D91.)*

- [ ] **M2 · vie 16-oct (d5; v5.19 = v5.18)** — registrarse en `https://risingscholars.net/accounts/register/` y publicar la solicitud de
      mentor (3 piezas: carta, tesis, case report; 3-4 h). **Regla escrita en MENTORES fila 2: si a las 4 semanas de M2 no hay
      mentor asignado → contratar editor profesional (US$200-400, RUTA §3.1)** (la fecha exacta la lleva el chip del átomo — ✅ releído el 3-oct: el chip dice vie 13-nov-2026 (4 semanas), el mismo día que CR-1; en v5.17 decía mié 11-nov y en v5.16 jue 5-nov) que cubra las 3 piezas. Confirmar ambas reglas.
- [ ] **C-2 · mar 20-oct (d6; v5.19 = v5.18) — elegir el artículo diana** en `CARTA_1/candidatos.md` §1 y **leer ESE DÍA con tu Chrome**
      las guías de autores (las automáticas devolvieron 403/402): **JAAD International Research Letter**
      (`jaadinternational.org/content/authorinfo` o ScienceDirect 26663287) e **IJD Correspondence** (Wiley 13654632) →
      copiar los límites reales (palabras, refs, figuras/tablas, abstract) con fecha en `TESIS_L0/research_letter_outline.md`
      §1 filas 1-2 (a más tardar en T-7, mié 9-dic). Actas y Anais ya están leídos en vivo (12-sep). Recomendación #4
      (JAAD `10.1016/j.jaad.2026.08.115`) si admiten "unpublished data"; si no, #1 (JCD `10.1111/jocd.71104`).
      > ⚠ **C-6 = SUBMIT de la carta el lun 9-nov (d13)**, contra un deadline interno del ≤15-oct: **25 días TARDE (v5.19 = v5.18; v5.17: 21; v5.16: 15)** →
      > cerrar el paquete y hacer el SUBMIT el jue 15-oct fuera del átomo (C-5 formateo cae el jue 5-nov: habría que adelantarlo) o elegir en C-2 una fila
      > con ventana más larga (§9.1 de `RUTA_PUBLICACION_2027.md`). Sigue siendo decisión tuya — es la misma que el 🔴 de las dos fechas límite externas rebasadas.
- [ ] **T-1 · jue 22-oct (d7; v5.19 = v5.18) — ética de la tesis** (el interno ≤ 30-sep queda 22 días atrás: si importa, presentar la solicitud fuera del átomo cuanto antes — el mar 6-oct es R0 y el lun 12-oct M1): localizar el **nº y fecha del CEI** (`etica.md` 1.1) **o presentar
      ese mismo día** la solicitud de revisión expedita/retrospectiva en la FMH-UNCP u hospital (protocolo + modelos de
      consentimiento/asentimiento + oficio de la I.E. + resumen). **Gate 1 escrito en T-7/T-8: sin nº o constancia de
      exención, el envío T-8 (mar 15-dic, v5.19 = v5.18) pasa a feb-2027.** Además: localizar los **PDF del modelo de consentimiento
      parental y del asentimiento** (los números ya constan: 1.256 matriculadas → 291 excluidas → 100 ausentes → 865
      evaluadas → 785 completas → 316 IGA≥1; falta el modelo y si el asentimiento fue escrito u oral).
- [ ] **M3 · lun 26-oct (d8; v5.19 = v5.18)** — email a **Finlay**; antes verificar en la página del CADI de Cardiff el procedimiento de
      licencia (`technologytransfer@cardiff.ac.uk` según fragmento de búsqueda; la página no respondió) y su dirección.
- [ ] **R9 · mié 28-oct (d9; v5.19 = v5.18)** — rellenar las columnas AMSTAR-2 y "hueco que deja" de las 5 SR/MA de `lines/L4-complicaciones.md`
      §6.1 (PMID 41249530 · 37178872 · 39214904 · 36574028 · 40406769, verificados) y marcar UNA salida (a/b/c) en §6.3 con
      fecha; **sin eso R6 (mié 11-nov, d14) no fija el PICO**.
- [ ] **Vie 30-oct (d10; v5.19 = v5.18)** — disparador del plan B del case report: si el Dr. Ciro no dio caso (~3 semanas desde M1, lun 12-oct), enviar el mensaje único de
      `caso_candidatos.md` §2 al colega SPD (el chip del átomo lleva la fecha exacta — releído el 3-oct: «vie 30-oct-2026 (3 semanas desde M1)»). **CR-1 (caso + consentimiento de publicación + senior author) = vie 13-nov (d15)**
      y **CR-2 = mar 17-nov (d16)**: en v5.19 (= v5.18) **los DOS siguen cayendo DESPUÉS del 31-oct** (en v5.14 CR-1 era aún el vie 30-oct, el último hábil antes del límite). El chip lo dice literal —
      «sin caso antes del 31-oct el entregable de feb-2027 no ocurre»—, así que el caso y el consentimiento firmado hay que cerrarlos FUERA del átomo, antes del sáb 31-oct.
- [ ] **Enviar el correo a la Editorial Office de IJD** (`CARTA_1/candidatos.md` §4) pidiendo la política de correspondencia
      — falta la dirección: tomarla de la página de la revista en Wiley ("Contact"). Pendiente desde el 27-ago.
- [ ] **Crear ORCID y el resto de identificadores académicos** (`MD_MAESTRO` §10) — Editorial Manager lo exige al autor de
      correspondencia.
- [ ] **Cerrar el presupuesto de publicación** (RUTA §3.1): (a) importe exacto de JAAD Intl / JAAD CR en el Excel oficial
      de Elsevier (`legacyfileshare.elsevier.com/els_com_pricing/article-publishing-charge.xlsx`); (b) grupo **GPOA de
      Perú** (45 % vs 65 %); (c) ¿JAAD International cobra APC a las *Notes & Comments*? **Actas ya verificado: Diamond $0
      (AEDV).**
- [ ] **Verificar las URLs/portales "A VERIFICAR"**: ScholarOne de IJD (`mc.manuscriptcentral.com` → 403), portal de envío
      de *Dermatology Online Journal* en eScholarship, URL exacta de Editorial Manager de JAAD International.
- [ ] **Tres cifras de la tesis que NO se escriben en el manuscrito hasta resolverlas** (A VERIFICAR 12-sep): (1) el
      **denominador de la prevalencia 39,8 %** (316/785 = 40,3 %; 316/865 = 36,5 %; ninguno da 39,8) y los cortes de
      Clasif. CADI Leve/Moderado/Severo en la hoja ESTADÍSTICA APA; (2) el **desglose de los 100 ausentes** (justificadas
      40 · injustificadas ¿60?; celda truncada en FLUJO PARTICIPANTES); (3) **qué script de `D:\motor_apex`**
      (`01_pipeline_tesis_acne.py` / `correccion_estadistica.py` / `_calcular_kappa.py`) produce exactamente rs=0,637 ·
      IC95 % [0,563-0,699] · κw=0,8125, para citarlo como *analysis code*.
- [ ] **Motor de descubrimiento v3**: Supabase → Project Settings → Edge Functions → Secrets: cargar `OPENALEX_KEY`
      (gratis: openalex.org/settings/api) y `NCBI_KEY`; después `supabase functions deploy research-discovery` (o
      `deploy_edge_function` del MCP) y anotar versión+fecha en `supabase/functions/README.md`. Hasta entonces el botón ▶
      sigue en la v2. Opcional: `pip install -r DATA\RESEARCH\agentic\requirements.txt` (openpyxl para T-4, rapidfuzz).
- [ ] **T-7 · mié 9-dic (d24; v5.19 = v5.18)** — antes de depositar el CSV de-identificado en OSF/Zenodo, revisar
      `DATA/RESEARCH/TESIS_L0/_deid/datos_tesis_acne_deid.csv` (865 filas, gitignored): que no quede ninguna columna
      cuasi-identificadora y el k-anonimato mínimo (combinaciones edad×grado con n=1 → agrupar edad en tramos); el DOI del
      depósito va en la frase de *data availability* de `DATOS_README.md` §6.

### USMLE — reservas y verificaciones externas

- [ ] **Free 120 en el Prometric de Lima (lun 8-feb-2027, D87; v5.19 · v5.18: vie 5-feb)** — Palmerton §8.2: práctica en el mismo centro, 1-2
      semanas antes, registro con hasta 7 días de espera; costo **$155 internacional según el cuaderno (A VERIFICAR)**. Al
      agendar el examen para el vie 19-feb (🔴; el Free 120 queda 11 días antes) verificar en `usmle.org` / `prometric.com` si Lima ofrece la práctica presencial y
      reservarla; si no existe, dejarlo escrito en README §3 para no volver a abrirlo. Hoy el overlay del Free 120 (D87 = lun 8-feb en v5.19) lo hace "en la
      interfaz oficial NBME" (en casa). Ligado a la decisión ⚪ #4 (maratón).
- [ ] **MyNBME · qué formas se COMPRAN y cuáles se hacen en Qbankly** (hallazgo #24, alto: afecta a 3 hitos y al GO/NO-GO):
      `DIAS.mat` dice `NBME 25 (Qbankly)` … `NBME 33 (Qbankly)` → % bruto sin curva oficial, sin reporte por sistema y sin
      garantía de vigencia; `HITOS_ONTRACK` compara ese % con umbrales pensados para el % *equated*. Confirmar en MyNBME
      qué formas CBSSA están activas en ene-2027 (el cuaderno describe 25-30; el plan asigna hasta la 33) y comprar como
      mínimo **31/32/33 + Free 120 oficial**; anotar "Qbankly = % bruto (sin curva)" donde toque.
- [ ] **A VERIFICAR del cierre pre-examen**: repasos Anki 200-300/día en las últimas 2 semanas (cifra del studio guide, no
      de transcripción) — sirve para dimensionar D94/D95 (mié 17-feb = última sesión de banco y jue 18-feb = D-1 REAL dentro del plan, `USMLE_TAPER`); en v5.19, como en v5.18 y v5.16, **no hay fin de semana entre D94 y D95** (el finde 13-14 feb queda entre D91 y D92) y el examen es el vie 19-feb, al día siguiente del D95. *(v5.18: D94 mar 16 · D95 mié 17 · examen jue 18-feb, sin finde libre. v5.17: D94 vie 12 · finde 13-14 libre · D95 lun 15 · examen mar 16-feb.)*

### Derma — la sesión logueada que desbloquea tres cosas a la vez

- [ ] **Una sola sesión de ~20 min con tu Chrome adjunto a AccessDerma** (método en
      `DATA/DERMATOLOGIA/_scrape/README_TOC_PENDIENTE.md`) *(alto impacto)*:
      1. Extraer los **TOC con `sectionid`** de Fitzpatrick 9e (2570), Barnhill 4e (2802), Weinberg 5e (1913), Guidebook
         (2960) y dermatoscopia (2804, 2929) → hoy **20 átomos enlazan a la portada del libro** (sectionid verificado en 50/70).
      2. Leer el listado de `cases.aspx?groupid=1546` (título + área de los 200 casos) para **confirmar o corregir
         `dermaCasoArea()`** — el etiquetado Med 1-110 · Path 111-140 · Peds 141-170 · Surg 171-200 es una **suposición**:
         si el orden real no es por área, el mapa de fallos por módulo CORE del ledger, del Hub y de la pestaña Cerebro es ruido.
      3. Guardar los `sectionid` por pregunta del 2929 para que la "imagen dermatoscópica ciega" apunte a la pregunta N.
- [ ] **Anclaje First Aid en d12 (vie 6-nov, SJS/TEN/DRESS) y d24 (jue 10-dic, melanoma) — fechas v5.19 de `dermaDailyPlan.ts` (d1 = mié 7-oct; v5.18: mié 4-nov / mar 8-dic)**: la sección/página no consta
      en el repo → abrir el ejemplar y sustituir 'A VERIFICAR (12-sep)' en `anclajeStep1` (`dermaDailyPlan.ts`); hasta
      entonces el chip «cuenta doble Step 1» de HOY muestra ese texto tal cual.
- [ ] **Verificar DeLorenzi 2017** (ASJ, PMID 28333326; acceso OUP/UF) — UI de hialuronidasa por "área" (~450 y ~900 UI
      del SPEC §2.4) y criterio de parada de los pulsos. Hasta entonces el drill y la ficha X-19 los muestran como A
      VERIFICAR: **no fijar esas cifras en Anki**. Deadline: drill de oclusión **d19 = jue 26-nov** (v5.19; v5.18: mar 24-nov).
- [ ] **NotebookLM «DERMA · Élite Engine»**: las 7 fuentes fallidas «Checking your browser - reCAPTCHA» SIGUEN en el
      cuaderno el 13-sep (86 = 79 útiles + 7). Borrarlas a mano en la UI (el agente no borra datos); sus equivalentes PubMed
      ya están cargados. No cargar PMC ni NCBI Bookshelf.
- [x] ~~**Asignar el deck `APEX::LIVIANO`** en `src/lib/ankiLinks.ts` y la entrada "Academia → Logística F5" en `EmpresaHub.tsx`~~ **RESUELTO 19-sep**
      (`ankiLinks.ts:116` `LIVIANO_ANKI_DECKS` = 8 sub-decks `APEX::LIVIANO::<modulo>` re-exportados de `livianoCasos.ts`; botón «Academia → Logística F5» en
      `LivianoTodayPlan.tsx:375` vía `EmpresaHub.tsx:57`). ⚠ **A VERIFICAR (19-sep) / tuyo:** los 8 sub-decks NO existen aún en Anki (se crean al importar el CSV, 🟠 D16 mar 27-oct en v5.19). *(LIVIANO)*
- [x] ~~**Crear la carpeta `DATA/BUSINESS/_kpi/`**~~ **CREADA el 19-sep** (`DATA/BUSINESS/_kpi/README.md`: destino del botón «Exportar JSON» del Cockpit F1, nombre `liviano_kpi_<AAAA>-W<SS>.json`, forma del JSON). **Sigue tuyo:** guardar ahí el JSON cada viernes. *(LIVIANO)*

### LIVIANO · Acceso Perú — las verificaciones DIGEMID

*Átomos D37-D45 (**25-nov → 7-dic**, fechas releídas de `livianoStudyPlan.ts` el 5-oct, v5.19: D37 mié 25-nov = drill de cifras, D38 jue 26-nov = síntesis M2/protocolo y el módulo ACCESO PERÚ ocupa D40-D43 (lun 30-nov → jue 3-dic) + D45 (lun 7-dic); caso 7 el vie 20-nov = D34, caso 8 el vie 27-nov = D39 y caso 9 el vie 4-dic = D44. v5.18: D37-D44, 24-nov → 3-dic, con D39 + D41-D44). Cierran los 2 pendientes ROJOS desde junio ("Legalidad DIGEMID"
y "Cotización Sterilelabs") y de ellos depende el COGS y el value stack. Regla anti-alucinación: si un dato no aparece, se
escribe `SIN REGISTRO HALLADO (fecha)`.*

- [ ] **D38 · jue 26-nov — Rellenar `LIVIANO_PROTOCOLO_CLINICO_v1.md` §2**: criterio numérico de elegibilidad (Obesity
      Algorithm 2026), panel de labs basales y cadencia, esquema de dosis/intervalos/lavado **solo desde la ficha técnica
      del producto registrado**, definición operativa de "falla a farmacoterapia".
- [ ] **D40 · lun 30-nov — Registro sanitario DIGEMID**: portal público (URL sin verificar), captura fechada de semaglutida
      SC/oral y tirzepatida → columna `registro` de `LIVIANO_ACCESO_PERU` (`empresaData.ts`).
- [ ] **D41 · mar 1-dic — Condición de venta por molécula** → columna `condicion` + flujo receta → farmacia → paciente.
- [ ] **D42 · mié 2-dic — 2 cotizaciones escritas y fechadas** (cadena + independiente) → `precioFarmacia`; recalcular
      el "medicamento 3 m = S/ 3,600" del value stack.
- [ ] **D43 · jue 3-dic — Dictamen de legalidad del magistral** (QF + abogado de salud: **nombres a definir**) +
      cotización Sterilelabs con certificado de análisis por lote → `costoLiviano`, KPI COGS, estado "VERIFICADO".
- [ ] **D45 · lun 7-dic — Tiempo fuera de refrigeración** por producto (ficha técnica) → guion de cadena de frío (v5.19: el caso 9 «lo consigo más barato en una web» cae el vie 4-dic, D44, entre el D43 y el D45, y el caso 8 el vie 27-nov, D39, justo antes del módulo; v5.18: D39 jue 26-nov + D41-D44 lun 30-nov → jue 3-dic, con el caso 8 en D40).

### ENCAPS — vigilancia normativa y rutina quincenal

- [ ] **Crear la rutina quincenal de señales ANTES del mar 6-oct (D1 v5.19; v5.18: lun 5-oct)** — pegar en Claude Code el bloque de
      `DATA/ENCAPS/SENALES_2027-I.md` §2-bis opción A (scheduled-tasks: taskId `encaps-senales-quincenal`, cron
      `0 7 1,15 * *`, prompt autocontenido de §2-ter) y confirmar `nextRunAt = jue 15-oct-2026 07:00` (creada ahora, la del 1-oct ya no corre; v5.17 esperaba jue 1-oct 07:00). A VERIFICAR si `/loop`
      acepta `14d` antes de usar la opción B; la C (`/schedule`) exige rutinas en la nube. Es lo que vigila la convocatoria
      SERUMS 2027-I (fija la fecha del examen y la duración de la intensiva; ver 🔵). *(ENCAPS)*
- [ ] **Verificar contra fuente primaria (El Peruano / gob.pe) las 9 señales "A VERIFICAR" del log**: nº de la **RM de
      jul-2026** sobre prioridades de atención en emergencia y qué dice de **P-IV** (+ tabla P-I inmediato / P-II ≤10′ /
      P-III ≤30′) · **NTS vigente del esquema de vacunación** (196-2022 + modificatoria hexavalente vs "238-2025" de
      Theomed) y de **CRED** (238-2025) · **NTS 229-2025** persona adulta (RM 310-2025) · **Dir. Adm. 384-MINSA/DGIESP-2025**
      (RM 726-2025) · **NTS 233-2025** malaria · nº de la **NTS de anemia 2024**. Hasta entonces `encapsCobertura.ts` lleva
      "A VERIFICAR" en II-EMG y **no se banquean cifras de esas normas**.
- [ ] **I-OCC · base legal vigente** (Ley de SST y reglamento; protocolo de exámenes médico-ocupacionales) y definiciones
      normativas de accidente de trabajo vs enfermedad profesional antes de generar preguntas con cifras o plazos.

### MIR

- [ ] **Clave de la pregunta 208 del MIR 2025** (reserva; IAMSEST multivaso no revascularizable → antiagregación): la hoja
      del Ministerio vía API da **2** (AAS + clopidogrel 1 año) y Redacción Médica/iSanidad, citando la resolución
      definitiva, dicen **3** (AAS + ticagrelor). Abrir el portal FSE (Exámenes anteriores → Hoja de respuestas, Medicina,
      2024, versión 0) o la resolución en BOE. El pool **no la sirve por defecto** (`MirPoolOpts.incluirDudosas`); si se
      confirma 3, fijarla en `CONTRASTES_PRENSA` de `gen_mir_pool.js` y regenerar (`--parse → --clasificar → --emit`),
      nunca editar el raw ni el `.ts` a mano.
- [ ] **Segunda fase del pool con sesión ProMIR** (cuando quieras afinar): las **36 preguntas de confianza baja** y las
      **21 sin capítulo** (filtro en `DATA/MIR/pool/README.md` § Pendientes) se cruzan con "preguntas MIR de este
      capítulo" de ProMIR; se corrige la etiqueta en `_clasificacion_llm/AAAA.json` y se regenera — **nunca el `.ts`**.
      Opcional: imágenes en local (124 preguntas con imagen; cuota "1 de cada 4 APEX con imagen") con
      `node DATA/_scripts/gen_mir_pool.js --descargar --con-imagenes` (15-25 MB/año; 2024 vía espejo de `_fuentes.json`).
      A VERIFICAR: las fechas de examen por convocatoria en `_fuentes.json` vienen de la API de examenesmir.com, no del BOE.
- [ ] **`DELTA_ESPANA.md` — completar con navegador las filas 'A VERIFICAR (12-sep)'** que WebFetch no abrió (403/404):
      calendario AEP 2026 (vacunasaep.org), PAPPS/semFYC, Orden SSI/445/2015 (lista EDO), LEC art. 763, Ley 39/2006,
      GesEPOC/GEMA, PEAHC hepatitis C, consenso español H. pylori, cribados por CCAA (mama 45-74, colon), año de la última
      actualización del calendario común CISNS.
- [ ] **Tablas oficiales netas–nº de orden MIR 2025/2026** (Ministerio / listados de adjudicación) para confirmar la banda
      **Top 50 = 150-165 netas** de `MIR_HITOS`, y la **fecha exacta del MIR 2030** (hoy cota 31-ene-2030).
- [ ] **Confirmar si hay acceso a AMIR** (AMIR Test / simulacros). Hoy "A VERIFICAR" en `mirData.ts` y no se prescribe.

---

## 🔵 CUANDO TOQUE (con fecha o disparador)

- [ ] **🎯 DISPARADOR · Convocatoria SERUMS 2027-I → fecha real del examen ENCAPS.** Las dos fechas asumidas son
      **imposibles**: `study_metrics.extra.exam_date = dom 28-mar-2027` es **Domingo de Pascua** y el default viejo del
      script era el 26-mar = **Viernes Santo**. Los docs planifican con el **escenario CORTO (dom 14-mar-2027)**; candidatos
      reales 14-mar, 21-mar u 11-abr → intensiva de 5, 6 u 8 semanas. **El día que se confirme**:
      (1) `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-22 <fecha>` (v5.19: el default del script es **D1 = 2027-02-22** con `--base 2026-10-06`; el mantenimiento llega ampliado hasta el **lun 15-feb = día 92**, los días 93-96 (mar 16, mié 17, jue 18 y vie 19-feb) son el cierre del Step 1 — el jue 18-feb es el **D95 = último día del plan Step 1** y el vie 19-feb el **examen** → D1 de la intensiva = **lun 22-feb (día 97, primer hábil tras el examen; default del script)** y el pre-test del examen 2026-II = primer viernes = **vie 26-feb** (default de `gen_encaps_minisim.js --pretest` = `2027-02-26`): ✅ **los dos defaults quedan ALINEADOS** (⚪ A); pasar `--base` solo si el D1 del mantenimiento vuelve a moverse. *v5.18: mantenimiento hasta el vie 12-feb (día 92), propuesta vie 19-feb (día 97) o lun 22-feb (día 98), defaults sin alinear (2027-02-22 / 2027-02-19). v5.17: mantenimiento hasta el mié 10-feb, propuesta mié 17-feb o lun 22-feb.*) →
      revisar → `execute_sql` + actualizar `study_metrics.exam_date` y `dias_a_examen` (quedó en 205 sin recalcular) +
      Calendar a mano; **NO aplicar el SQL antes**; (2) escribir la fecha en **`DERMA_TAPER_ENCAPS_FECHA`**
      (`src/lib/dermaDailyPlan.ts`, YYYY-MM-DD) para que las sesiones Derma a ±3 hábiles pasen a taper 'encaps' (v5.19, `dermaDailyPlan.ts` d1 = mié 7-oct: si cae
      en la semana del 22-26 mar, los candidatos son d59-d61 (lun 22 toxina IV · mié 24 rellenos I · vie 26-mar rellenos II); en la del 29-mar → 2-abr, d62-d63 (mar 30-mar rellenos III · jue 1-abr rellenos IV); d64 lun 5-abr = peelings I · d65 mié 7-abr = peelings II · d66 vie 9-abr = láser I · d67 mar 13-abr = láser II · d68 jue 15-abr = láser III · d69 lun 19-abr = láser IV · d70 mié 21-abr = microneedling; v5.18: d60-d64 en esas dos semanas); hasta entonces la pestaña
      Cerebro muestra «hoy null · A VERIFICAR (13-sep)». *(ENCAPS/Derma)*
- [ ] **🎯 DISPARADOR · Resultado del UWSA1 (mar 6-oct, v5.19; v5.18: lun 5-oct).** Si sale **<40 %** → bajar **D2-D10 a 20 Q/día** (protocolo
      Jay; `qDia` en `gen_usmle_v5.js` + regenerar). Lectura por tramos (Palmerton §9.3, +5 %/mes hasta el 1-feb):
      **<40 %** → protocolo Jay · **40-48 %** → llega justo a 65-68 % · **≥48 %** → on-track. La app hoy dice "baseline:
      cualquier valor sirve" y no muestra los tramos (hallazgo #12): **el baseline del 6-oct, no el GO/NO-GO del lun 1-feb,
      es el verdadero Goldilocks check**. *(USMLE — decisión ⚪ #8)*
- [ ] **Protocolo de burnout (REGLA ya en la app y en README §3b):** la señal numérica (2 hitos consecutivos bajo su
      mínimo on-track → `gateHito` 'ALERTA BURNOUT' + banner) la da la app; **los síntomas los decides tú** (releer sin
      comprender, irritabilidad, indiferencia, descansos que se alargan). Si se activa: 3-5 días solo Anki AM y correr el
      plan con `remap_inicio.js` (cada día parado = +1 hábil; no se recorta temario). *(USMLE)*
- [x] ~~**Antes del 1-feb-2027 · extender las series del Calendar con `UNTIL=20270130`**~~ **RESUELTO el 19-sep con 6 SERIES DE EXTENSIÓN D93-D95** (`create_event`, no `delete`: ANKI AM 05:00 `gfapfa25hm5d9s65n7oiu0jsms` · repaso 07:15 `vi7lrsm2blitpqistrt87i3sqk` · pre-test 08:15 `mlqvrm4m8bn38qfl37qddjgk5g` solo lun 1-feb · DEEP PRIME `39dm9gk3a58u3iqu9lk28noum0` · 30Q `u6alh9h3o43l2fu98gmvkvtk90` · eval 18:00 `r850pocdgcm8pi6a42cvv37v1k` MO,TU); las 9 GYM/BAILE ya llevan etiqueta v5.14 (3 ids nuevos); **ENCAPS 16:15 `papebi46etlo8glgfs5akd5mig` NO se extiende a propósito** (termina el 29-ene; la intensiva lleva serie propia cuando decidas su arranque, ⚪ A). **⚠ v5.19 (lun 5-oct, VIGENTE):** las series principales L-V terminan el vie 29-ene = **D81**, así que las 6 series de extensión USMLE se **RECREARON** otra vez, ahora para **D82-D93 = lun 1 → mar 16-feb** (`BYDAY=MO,TU,WE,TH,FR`, `UNTIL=20270217T045959Z`; ids nuevos: ANKI AM `45cmcfrfhegctp7qpnk2tqf5i8` · repaso `f413f0clg153volao0fcrqfurk` · pre-test `tsmqfh3a2nuls2893gs6s3r19s` · DEEP PRIME `knmf0o14vrecule8q6tda9q5po` · 30Q `s4t9ct7tpf9i3t9aijgi9oa4bc` · eval `64lck9n9sim8vmfqdvg2qopi68`; los de v5.18 ya no existen), la **EXTENSIÓN ENCAPS** es nueva (días 82-92 = lun 1 → lun 15-feb, `m00blqfao14jd48v5ffbopm8p8`, `UNTIL=20270216T045959Z`) y el **D94 (mié 17-feb)**, el **D95 (jue 18-feb)** y el **examen (vie 19-feb)** van por overlay. *(histórico:)* **⚠ v5.18 (sáb 3-oct):** las series principales L-V terminan el vie 29-ene = **D82**, así que las 6 series de extensión USMLE se **RECREARON** otra vez, ahora para **D83-D93 = lun 1 → lun 15-feb** (`BYDAY=MO,TU,WE,TH,FR`, `UNTIL=20270216T045959Z`; ids nuevos: ANKI AM `6sqksi5auf48mauu93s1h4jf0s` · repaso `rkpd36d161c801t6lmn3r8ombc` · pre-test `6r5qcog93916ufedogf7hp0n9g` · DEEP PRIME `jjado5lllcq88sil0rm7p4p0ig` · 30Q `ovdllf7ovj1utng7il4393pg88` · eval `bc1o0n145acsl60cdl5ae2m4po`; los de v5.17 ya no existen), la **EXTENSIÓN ENCAPS** es nueva (lun 1 → vie 12-feb, `jg71n1dc2vnbrsktef9ms1rn6g`, `UNTIL=20270213T045959Z`) y el **D94 (mar 16-feb)**, el **D95 (mié 17-feb)** y el **examen (jue 18-feb)** van por overlay. *(histórico:)* **⚠ v5.17 (30-sep):** las 6 series de extensión USMLE se **RECREARON** otra vez, ahora para **D85-D93 = lun 1 → jue 11-feb** (`BYDAY=MO,TU,WE,TH,FR`, `UNTIL=20270212T045959Z`; ids nuevos: ANKI AM `n3k670e5bpgoh3s7cgslnupsis` · repaso `pokf56lrcatqebo166kcfopdds` · pre-test `i2c8njgrppkn3hjjq1pgrefst0` · DEEP PRIME `1klod6lr1kcfccd7vmica7oboc` · 30Q `7ejpqdtl5rq4esmii3n0usatuc` · eval `mlosps42anhc6p4mropner1oqo`; los de v5.16 ya no existen), la **EXTENSIÓN ENCAPS** es nueva (lun 1 → mié 10-feb, `upqrbgai3hot54s5bvqp5c4l64`, `UNTIL=20270211T045959Z`) y el **D94 (vie 12-feb)**, el **D95 (lun 15-feb)** y el **examen (mar 16-feb)** van por overlay. *(histórico:)* **⚠ v5.16 (26-sep):** las 6 series de extensión USMLE se **RECREARON** para **D88-D93 = lun 1 → lun 8-feb** (`BYDAY=MO,TU,WE,TH,FR`, `UNTIL=20270209T045959Z`; ids nuevos: ANKI AM `3er7vtmrdn3j5ks6r0960s7t10` · repaso `pi1ohr2pp1lb6lse9kj4s0h8s4` · pre-test `a1rdhou6q4ceij26cmkcla3drc` · DEEP PRIME `la2i0lglujcfjavq7ekmi4ks5g` · 30Q `4cip5bq1h7pj4ncbv7hj32nlqs` · eval `gg60as9hffms4cccddjr3fg1t0`; los 7 ids de v5.15 ya no existen), la **EXTENSIÓN ENCAPS** es nueva (lun 1 → vie 5-feb, `0bv3ef0do92mt84pa8es8cbgho`, `UNTIL=20270206T045959Z`) y el **D94 (mar 9-feb)**, el **D95 (mié 10-feb)** y el **examen (jue 11-feb)** van por overlay — detalle en `CALENDAR_SEGMENTOS_V5_6.md` §18. *(v5.15, 22-sep: extensión ENCAPS lun 1 + mar 2-feb; extensiones USMLE en D91-D93.)* *(histórico:)* ⚠ v5.14: el D93 es el lun 1-feb, el D95 el mié 3-feb y el examen el jue 4-feb, así que el `UNTIL` ya no cubre ni D93-D95, ni el examen, ni la intensiva: extender a `20270204` (o más) — son **7 series**, no 2
      (`CALENDAR_SEGMENTOS` §11.2); la **única bloqueante es `16:15 ENCAPS` (`papebi46etlo8glgfs5akd5mig`)** si ENCAPS
      vuelve a bloque principal en feb-mar; `09:00 DEEP PRIME` (`cb2uh20jnvu7pgfev4183pgctc`) también cubre el examen y corta
      el 30-ene. ⚠ `recurrenceData` del MCP está roto para UPDATE → delete(serie) + create. Aprovechar para re-etiquetar las
      **9 series de GYM/BAILE que siguen diciendo "Régimen v5.6"**. *(sistema)*
- [x] ~~**Antes de sembrar la fase intensiva (feb-2027) · la app necesita**~~ **RESUELTO 19-sep en `src/lib/encapsPlan.ts`** (`useEncapsPlan` → `regimenDe()`: el total crece solo con `max(dia)` de `study_schedule`; rama `modo='INTENSIVO'` en `itemsForDay` con `extra.loop` / sims /100 / `repaso` / `drill_cifras`; `simDays` con `pretest` / `sim100` / `dress_rehearsal`; `EncapsPlanView.tsx` pinta los sims /100 y prellena el cierre; probado en seco con 25 filas del generador, nada sembrado — `SISTEMATIZACION_2026-09-19.md` §3). **Sigue tuyo:** las FRANJAS de la intensiva (17:15 choca con LIVIANO; ⚪ «Nuevo 19-sep») y, al sembrar, re-sembrar `study_metrics.extra.horarios` (orquestador). *(histórico:)* `STUDY_TOTAL_DAYS` dinámico (hoy 102 fijo), rama
      `modo='INTENSIVO'` en `itemsForDay` (renderizar `extra.loop` / `sim` / `repaso` / `drill_cifras`) y `simDays` con los
      tipos `pretest` / `sim100` / `dress_rehearsal`. ⚠ El segmento **17:15** del loop heredado **choca con LIVIANO** → fijar
      las franjas en la reestructuración de febrero **antes** de sembrar. *(ENCAPS — asignar a un agente)*
- [ ] **Al usar `--sim100 2025-2 / 2025-1A / 2024-2A` en la intensiva**: **122 ítems** de esos exámenes ya viven en los
      sets del banco del día. Rendirlos **antes** de consumir esos sets, o aceptar el solape. *(ENCAPS)*
- [ ] **Antes del d19 (jue 26-nov, v5.19; v5.18: mar 24-nov) · importar `DATA/DERMATOLOGIA/ANKI_COLA/PLANTILLA_SESION.txt`** en Anki (notetype Basic);
      a partir de ahí copiar la plantilla por sesión (`SESION_dNN_<fecha>.txt`). *(Derma)*
- [ ] **Antes del d45 (mié 10-feb-2027, v5.19; v5.18: lun 8-feb) · decidir y comprar el dermatoscopio de bolsillo** (DermLite o Heine; modelo y
      precio A VERIFICAR en sus webs oficiales) para la fase práctica 2027. *(Derma)*
- [ ] **Jue 18-feb-2027 (= D95 = VÍSPERA del examen Step 1 en v5.19) · sesión Derma OPCIONAL (d48, segunda pasada parcial II)**: corta y antes de las 17:00, o
      saltarla (⚪ C); no se pierde contenido en ningún caso. El mar 16-feb (D93) es d47 (parcial I, 1 caso + FSRS); el mié 17-feb (D94, última sesión de banco) no es día Derma (es Research: R8, d38 → ⚪ K) y el vie 19-feb (examen) tampoco (es Research: X-3 → ⚪ K); **el d49 (parcial III) pasa al lun 22-feb**, primera sesión tras el examen. *(v5.18: d49 jue 18-feb = día del examen y d48 mar 16-feb = D94; v5.17: d49 mar 16-feb = día del examen; v5.16: d49 vie 12-feb = día siguiente al examen.)* *(Derma)*
- [ ] **Desde el mié 24-feb-2027 (d50, v5.19; v5.18: lun 22-feb) · confirmar en la app que 3 casos/sesión caben en los 45′** con los 10Q como
      variable de ajuste; si no, la alternativa documentada es 2 casos + alargar el ciclo 2 (d74-d103, lun 3-may → jue 22-jul en v5.19; v5.18: jue 29-abr → mar 20-jul; sin
      fusionar nada). En v5.19 las 9 lecturas G+ del ciclo 2 se vuelven a re-emparejar con otras sesiones de casos de su misma semana (36 casos y 9 G+ intactos). *(Derma)*
- [ ] **Cotejar las cifras "A VERIFICAR" de las 35 fichas del cerebro clínico** contra el capítulo de AccessDerma citado en
      cada una antes de recitarlas como definitivas: dosis de apraclonidina, % de TCA, mm de microneedling, λ por tinta,
      márgenes de Mohs y de melanoma. *(Derma)*
- [ ] **Sáb 13-feb-2027 (última A-unit SYNAPSE = cierre F2, d131 · v5.19; v5.18: vie 12-feb, d131) · página oficial de la certificación CCA-F**: no aparece enlazada en
      academy.claude.com ni en anthropic.skilljar.com (12-sep) → localizarla, anotar formato/precio/fecha y decidir la fecha
      post-Step 1 (feb-2027). *(SYNAPSE)*
- [ ] **Post-D89 (mié 10-feb-2027, capstone; v5.19 · v5.18: mar 9-feb) · revisión por par del protocolo LIVIANO** por un médico con experiencia en
      obesidad, **antes de usarlo con pacientes reales**. *(LIVIANO)*
- [ ] **Antes de febrero (arranque de CURVA) · cerrar las fuentes**: confirmar que `nams-2022-hormone-therapy-position-statement.pdf`
      es la versión 2022; leer **NICE NG23** (403); rellenar las 4 cifras "A VERIFICAR" (cáncer de mama E+P por 10.000
      mujeres-año, TEV oral vs transdérmica, prevalencia de hipogonadismo en obesidad, umbral de hematocrito). *(Business/CURVA)*
- [ ] **Antes de febrero (arranque de DENSA) · cerrar las fuentes**: guía S3 EDF 2018 (DOI `10.1111/jdv.14624`) y consenso
      AEDV 2024; cifras "A VERIFICAR" (finasterida/dutasterida, ferritina objetivo, **registro DIGEMID y precios de
      minoxidil oral / finasterida / dutasterida en Perú**); la URL masculina de la AAD devolvió 404. *(Business/DENSA)*
- [ ] **VITALS · las 3 tareas del puente con la Academia + la Tarea D** (código en producción, requieren un chat propio de
      VITALS): `SPLIT_GLP1` para paciente, check-in semanal de EA GLP-1 con migración `0002`, composición corporal en el
      reporte de lunes, y **Tarea D (cardio AM)** = `LIVIANO_VITALS_BRIDGE.md` §2: decidir el MET/coste de referencia de la
      carrera de 30' (Ainsworth — A VERIFICAR) y el nº de migración libre (`0003_actividad_am.sql` — A VERIFICAR) antes de
      tocar `plan.ts`/`domain.ts`/`index.ts`. *(VITALS — ver ⚪)*
- [ ] **Mar → may 2027 · SR-1: dónde caen las ≈40-70 h por revisor** de cribado/extracción (R17-R26 declaran 62 h en el
      campo `horas`; el bloque 13:30 no las contiene): fijarlo en la agenda post-Step 1 (feb). *(Research)*
- [ ] **Feb-2027 · pool MIR se agota**: 57 días (v5.19 = v5.18; v5.17: 58) × 25-30Q ≈ 1.450 > 1.025 usables → hacia mediados de febrero Cardio/Gastro
      se quedan sin preguntas sin usar. Plan: fallback ProMIR + alta del **MIR 2027** tras su plantilla definitiva (≈
      feb-2027; pasos en `DATA/MIR/pool/README.md`). *(MIR)*
- [ ] **Feb-mar 2027 · DIGA (`derminterest.org`)** no respondió a la verificación automática: comprobar a mano las páginas
      de mentoría y del comité IMG cuando toque. *(Research)*
- [ ] **Cerrar las marcas "A VERIFICAR" de los extractos Palmerton** (opcional, mejora la atribución) *(USMLE)*:
      - **32 marcas de planificación/mindset**: 1 consulta a NotebookLM restringida por `source_ids` a los 4 vídeos de
        eficiencia ("Too Busy", "Busy Dentist", "Every Hour", "Feels Like Cheating") y otra a "Stuck Below 220" + "How to
        Stop Med School Procrastination", **pidiendo citas**.
      - **Consultas estancadas** (`answer` vacío 3 veces, `conversation_id 6ca8c62f`): Melody fails #1-#5, protocolo literal
        de "How to Study So Fast…", ejemplos de "How to Make Hard USMLE Questions Easy".
      - **Menor**: confirmar si "Fixing USMLE Test-Day Mistakes: The STRESS Strategy" desglosa STRESS como acrónimo.
      - **12 puntos de `PALMERTON_POR_MATERIA`**: gradiente A-a · apnea del sueño · surfactante/SDR neonatal (**apunta a un
        fichero que NO está en el inventario de 295 fuentes: probable confabulación — no citarlo como Palmerton**) ·
        haptoglobina/hemoglobinuria · ADAMTS13 · sideroblástica y B6 · A1c 6,5 % ("615" en la transcripción) · viñeta de
        CAD · bloque OB-GYN · DSM-5 TAG · hiperamonemia MCAD, escorbuto, isoniazida-B6. **B1, niacina y B6-isoniazida
        están DECLARADAS AUSENTES.**
      - **Cifras sin cita** (heurística, no doctrina): Free 120 65 %→95 % / 70 %→99 %, "30-50 % más *unforced errors* en los
        bloques 1-2", llegada 30-45 min antes (el overlay Free 120 dice "30'"), 200-300 repasos/día en el cierre, *warm-up*
        de 5-10 preguntas, cifras EMDR, atribución del ejemplo TEP→eco, desenlaces Shelby/Chris.
      - **`usmleData.ts`**: `USMLE_META.thesis` "Path + Physio = 75-95 %" y `USMLE_DISCIPLINES` (Path 45-55 %, Physio 30-40 %)
        no proceden de Palmerton (§3.9: Path 23 %, Pharm 15 %, Pathophys 13 %) → cotejar contra el USMLE Content Outline.
- [ ] **Descargar en crudo 4 fuentes del cuaderno no explotadas** si quieres blindar valvulopatías, shock, endocarditis,
      miocardiopatías o micro incidental: *High Yield Surgery Review*, *High Yield Family Medicine Review Part 2*, *The ONLY
      Video You Need to Pass Step 1 in 2026*, *Anki Was Hurting This Med Student's Score*. *(USMLE)*

---

## ⚪ DECISIONES QUE ESPERAN TU RESPUESTA

Ningún agente podía tomarlas. El plan corre hoy con la opción por defecto que se indica.

### USMLE · decisión del corrimiento v5.12 (15-sep), re-fechada en v5.13, v5.14, v5.15, v5.16, v5.17, v5.18 y **v5.19 (lun 5-oct)** — el examen sigue fuera de la ventana

| # | Decisión | Hoy corre así |
|---|---|---|
| 0 | **El plan de 95 días desborda la ventana 25-29 ene: D95 = jue 18-feb-2027 = último día del plan y D-1 REAL → target VIE 19-FEB-2027.** Con D1 en martes el D94 (mié 17-feb) es la última sesión de banco, el D95 (jue 18-feb) es una sesión mínima por la mañana + el ritual de test-day por la tarde, **sin fin de semana en medio** (el sáb 13 / dom 14-feb quedan entre D91 y D92, solo Anki vencido), y **el examen es al día siguiente** (Palmerton: D-1 sin banco se cumple con el D95). Opciones: **(a)** aceptar el vie 19-feb: agendar/reprogramar en Prometric y **confirmar que el eligibility period cubre el 19-feb** (si no, pedir extensión a ECFMG, con costo) — es lo que hace el plan (`DAILY_META.examenTarget = 2027-02-19`, `descansoD1 = 2027-02-18`); **(b)** rendir dentro de la ventana (≤ vie 29-ene) recortando el sprint final — va contra tu regla de no recortar; **(c)** estudiar sábados para recuperar días y volver a la ventana (también contra el régimen L-V). **Cada día más sin estudiar mueve el examen otro hábil (lun 22-feb, mar 23-feb…) y arrastra la intensiva ENCAPS, el pitch AURUM v5 y el taper Derma.** *(v5.18: examen jue 18-feb sin finde libre entre D94 y D95; v5.17: mar 16-feb con finde 13-14 libre entre D94 y D95; v5.16: jue 11-feb sin finde libre; v5.15: lun 8-feb con finde 6-7 libre; v5.14: jue 4-feb.)* | (a) · examen vie 19-feb · D94 mié 17-feb (última sesión de banco) · D95 jue 18-feb (último día del plan = víspera) · sin finde en medio (`USMLE_TAPER.d94` / `d95` / `dMenos1` / `examen`) |
| 0-bis | **v5.14 lo abrió y v5.15-v5.19 lo mantienen: el contenido cierra el vie 29-ene (D81, Bioquímica día doble) y el NBME 31 GO/NO-GO se rinde el primer hábil siguiente (lun 1-feb, D82; en v5.19 el finde 30-31 ene queda en medio) sin ningún día de banco de consolidación entre medias** (los 2 random timed 2×40Q de la Fase B van en D84 mié 3-feb y D86 vie 5-feb, DESPUÉS del NBME 31; la Fase B es D82-D86 con los 3 NBME dentro: 32 mar 2-feb, 33 jue 4-feb). **Lo que SÍ se mantiene desde v5.15:** como los hitos no están clavados por fecha, el NBME 31 (y todos los demás) conservan su D#, así que **no se comen días de preparación en cada corrimiento**. Opciones: **(a)** aceptar — el NBME 31 mide el estado real al cierre de contenido y la regla del GO exige «2 NBME ≥68 %», así que el 32 y el 33 confirman o revierten; **(b)** trasladar la decisión formal GO/NO-GO al NBME 32 (mar 2-feb, D83) — tampoco gana días de banco; **(c)** cualquier día perdido desde hoy lo agrava (mueve el examen, no el hueco). *(v5.18: cierre jue 28-ene · NBME 31 vie 29-ene; v5.17: cierre mar 26-ene · NBME 31 mié 27-ene.)* | (a) · GO/NO-GO en el NBME 31 lun 1-feb (`usmleStep1Daily.ts` D82, `HITOS_ONTRACK`) |

### Consecuencias del corrimiento v5.19 en los frentes secundarios (lun 5-oct; tabla re-fechada desde la de v5.18 del 3-oct) — decisiones nuevas, reabiertas y resueltas

| # | Decisión | Hoy corre así |
|---|---|---|
| A | ✅ **ENCAPS · ALINEADA en v5.19.** El mantenimiento se AMPLIÓ hasta el **lun 15-feb (día 92)** en vez de perder 1 sesión (v5.18: vie 12-feb; v5.17: mié 10-feb; v5.16: vie 5-feb); los días 93-96 de la cuenta (mar 16, mié 17, jue 18 y vie 19-feb) son el cierre del Step 1 + el examen y quedan sin fila. **Con el examen el vie 19-feb ya no hay alternativa de viernes: la intensiva arranca el lun 22-feb (día 97, primer hábil tras el examen; default de `gen_encaps_intensivo_2027.js`) y el pre-test del examen 2026-II es su primer viernes, el vie 26-feb (default de `gen_encaps_minisim.js --pretest` = `2027-02-26`): los dos defaults quedan ALINEADOS.** Arrancar en lunes da semana 1 completa (señales + calentamiento + pre-test del viernes), como mostró el ensayo en seco del 19-sep. Solo queda tu decisión si prefieres otra fecha (p. ej. un descanso tras el examen) cuando salga la convocatoria SERUMS. *(v5.18: vie 19-feb o lun 22-feb con defaults sin alinear (2027-02-22 / 2027-02-19); v5.17: mié 17-feb o lun 22-feb; v5.16: vie 12-feb o lun 15-feb.)* | SQL de la intensiva NO aplicado; defaults alineados (lun 22-feb / pre-test vie 26-feb); nada que ejecutar hasta la convocatoria SERUMS |
| B | ~~Research · CR-9 (SUBMIT del case report #1) cae en la víspera del examen~~ **SIGUE RESUELTA en v5.19:** CR-9 es el **jue 11-feb** (`RESEARCH_HITOS`, d36 = **D90** del Step 1): 5 hábiles antes del examen. **Orden (sin cambio en v5.19, Research no corrió):** la PAUSA va del **vie 15-ene al mié 10-feb** (R3 d33 vie 8-ene, R2 d34 mar 12-ene y X-7 d35 jue 14-ene caben antes). **R8 (d38, protocolo PRISMA-P) cae el mié 17-feb = D94 = última sesión de banco** y **X-3 (d39) el vie 19-feb = DÍA DEL EXAMEN** → fila K (v5.18: R8 = D95 = D-1 real y X-3 al día siguiente del examen; v5.17: R8 lun 15-feb = D-1; v5.16: jue 11-feb = día del examen). ✅ **X-8** (d37 = D92, lun 15-feb): su texto ya dice «… el examen Step 1 es el vie 19-feb» (releído el 5-oct). **Sigue (externo):** T-1 (jue 22-oct) dice «CEI expedita ≤ 30-sep» y C-6 (lun 9-nov) dice «ventana del journal ≤ 15-oct» (ver el 🔴 de arriba). ✅ Los 12 overlays 🔬: sin cambio en v5.19 (`gen_research_calendar.js --check` = 0). | CR-9 jue 11-feb · R8 mié 17-feb · X-3 vie 19-feb (hasta que decidas K) |
| C | **Derma · el lun 1-feb (NBME 31, GO/NO-GO) no es día Derma (es día-Research, en pausa); el mar 2-feb (NBME 32) es d42 = colgajos e injertos, sesión NORMAL de 2 casos; el jue 4-feb (NBME 33) es d43 = Mohs (normal); el jue 18-feb (D95 = VÍSPERA) es d48 = segunda pasada parcial II (opcional, corta, antes de las 17:00) y el d49 pasa al lun 22-feb** (el taper es posicional d44-d49 y con d1 = mié 7-oct va del **lun 8-feb** (d44, D87 = día del Free 120, sesión por la tarde) al **lun 22-feb** (`taperStep1` 2027-02-08 → 2027-02-22): d45 mié 10-feb (D89) · d46 vie 12-feb (D91) · d47 mar 16-feb (D93) · d48 jue 18-feb (D95) · **d49 lun 22-feb = primera sesión tras el examen** (el vie 19-feb, examen, es día-Research); el ciclo retoma carga completa el mié 24-feb = d50). Alternativas: saltar el d48 de la víspera (no se pierde contenido) o pasar el d42 del NBME 32 a modo taper de 1 caso + FSRS y recuperar colgajos tras el examen. *(v5.18: d42 vie 29-ene (NBME 31), taper 4-feb → 18-feb, d49 = día del examen jue 18-feb; v5.17: d42 mié 27-ene, taper 2-feb → 16-feb, d49 = día del examen mar 16-feb; v5.16: d42/d43 en los NBME 32/33, taper 29-ene → 12-feb.)* | d42 normal · taper 8-feb → 22-feb (`DERMA_DAILY_META.taperStep1`) · d48 jue 18-feb opcional · d49 lun 22-feb |
| D | ✅ **LIVIANO · SIGUE RESUELTA en v5.19 (lun 5-oct): el caso integral 16/16 va ANTES del capstone.** Con el D1 en martes los 16 casos siguen en viernes (D4 · D9 … D86) y el cierre queda: **D86 vie 5-feb caso integral 16/16** · D87 lun 8-feb síntesis módulo 5 · **D88 mar 9-feb** repaso integral I (drill ciego) · **D89 mié 10-feb capstone** (ensamblaje de `LIVIANO_PROTOCOLO_CLINICO_v1`) · **D90 jue 11-feb** revisión trimestral II + cierre — lo que falte en el caso integral se añade en el capstone. Nada que decidir salvo que prefieras el orden inverso (intercambiar capstone ↔ caso 16 en `DATA/BUSINESS/liviano_curriculum.json` y regenerar con `gen_liviano_plan.js 2026-10-06`; el caso 16 dejaría de caer en viernes). *(v5.18, RESUELTA el 3-oct: D87 vie 5-feb caso 16 · D88 lun 8 · D89 mar 9-feb capstone · D90 mié 10-feb cierre. v5.17, REABIERTA el 30-sep: D88 jue 4-feb capstone · D89 vie 5-feb caso 16. v5.15: caso 16 D90 vie 29-ene tras el capstone D88 mié 27-ene.)* | `livianoStudyPlan.ts`: caso 16 D86 vie 5-feb → capstone D89 mié 10-feb (resuelta) |
| E | **SYNAPSE · la última A-unit (cierre F2 + CCA-F, d131) cae el sáb 13-feb (`FIN_PLAN = 2027-02-13`, 131 días de calendario desde el mar 6-oct; +1 día)**, entre el D91 (vie 12) y el D92 (lun 15) del Step 1 — ver la fila SYNAPSE de abajo (mantener o adelantar). ✅ El texto de esa A-unit ya dice «sáb 13-feb en v5.19 · v5.18: vie 12-feb». *(v5.18: vie 12-feb, d131 = D92; v5.17: mar 9-feb, d132; v5.16: vie 5-feb, d131.)* | sáb 13-feb |
| F | **AURUM · el PITCH v5 (d95) cae el jue 18-feb = D95 = último día del plan Step 1 = VÍSPERA REAL del examen** (sin finde de por medio): decide si lo grabas ese día (la tarde del D95 es logística de test-day, nada después de las 17:00) o lo adelantas (p. ej. al vie 12-feb, D91, antes del finde 13-14 feb). **El D96 de AURUM cae el vie 19-feb = día del examen** → fila L. *(v5.18: v5 mié 17-feb · D96 jue 18-feb; v5.17: v5 lun 15-feb · D96 mar 16-feb; v5.16: v5 mié 10-feb · D96 jue 11-feb.)* | v5 jue 18-feb · D96 vie 19-feb |
| G | **MIR · el mantenimiento (mié 27-ene → jue 15-abr, 57 días) va en modo REDUCIDO (10Q) hasta el vie 19-feb INCLUSIVE (día del examen, d18 del mantenimiento: viernes reducido, 10Q de la asignatura peor del log) y pasa a modo normal el lun 22-feb (d19: 25Q Gastroenterología + interleaving)** (`modoReducidoHasta = '2027-02-19'`, 18 días). **La víspera (jue 18-feb = D95) es d17: reducido + Tier C express de Oncología Médica** (Cardiología + Oncología); el mié 17-feb (D94) es d16 (GyO + Pediatría). Decide si la víspera la dejas reducida + Tier C (como está), vacía, o mueves el Tier C de Oncología (p. ej. al lun 22-feb), y si el viernes del examen va reducido o vacío. *(v5.18: reducido hasta el jue 18-feb = día del examen, con el Tier C de Oncología ese mismo día; v5.17: reducido hasta el mar 16-feb, sin Tier C ese día; v5.16: reducido hasta el jue 11-feb, Tier C de Oncología el día del examen.)* | reducido hasta el vie 19-feb (Tier C Oncología la víspera, jue 18-feb) · normal desde el lun 22-feb |
| I | **MIR · el handoff "entrada a la fase principal" sigue al mantenimiento: cierre jue 15-abr-2027** (v5.18: mié 14-abr; v5.17: mar 13-abr; v5.16: mié 7-abr; v5.15: vie 2-abr; v5.14: mié 31-mar — se amplía para no perder sesiones), así que los días hasta el 15-abr quedan dentro del banqueo con el umbral de banqueo (consolidada 70 % / anclas 55 %). Aplicado por coherencia con la regla del corrimiento: **handoff → jue 15-abr-2027** y la fase principal arranca el **vie 16-abr** (`mirData.ts` `MIR_HITOS.handoff` = `2027-04-15` · `mirEvalLog.ts` `MIR_CIERRE_UMBRAL_FASES` hasta `2027-04-15`, verificados el 5-oct; retención FSRS 0,85 → 0,90 desde el 16-abr). Si prefieres una fecha fija por una razón externa (convocatoria, viaje), son 2 líneas. | handoff jue 15-abr · umbral de banqueo hasta el 15-abr inclusive |
| H | ✅ **Vibecoding · RESUELTA en v5.19 sin tocar el catálogo.** Con el D1 en martes los bloques de 5 hábiles van **mar → lun** (S1 mar 6 → lun 12-oct … S11 mar 15 → lun 21-dic; S12 mar 22 → mar 29-dic por el feriado del 25-dic; SHIP sábados 17-oct … 26-dic y el de S12 el sáb 2-ene), así que la semana deload post-NBME 26 (**lun 16 → vie 20-nov**, tras el NBME 26 del lun 9-nov) queda cubierta 4/5 por **S7** (`motor-preguntas-encaps`, mar 17 → lun 23-nov), que es justo el proyecto que lleva el flag (el lun 16-nov es el último día de S6); la post-NBME 28 (**lun 28 → mié 30-dic**, tras el NBME 28 del lun 21-dic; jue 31 y vie 1 feriados) cae en los dos últimos días de S12 (capstone, proyecto normal) y en el arranque del taper S13 (mié 30-dic). Nada que decidir. ✅ `VIBE_TAPER[]` y el texto `deload` de `vibecoding_proyectos.json` ya citan v5.19 (5-oct). *(v5.18: bloques lun → vie, deload 9-13 nov = S6 exacta sin flag, flag en S7; v5.17: bloques jue → mié, deload repartida entre S6 y S7; v5.16: deload = S6 exacta.)* | flag en S7 (catálogo, `vibecodingPlan.ts`) ≈ deload lun 16-nov ✅ · `PROTOCOLO_MODO_MINIMO.md` §4 |
| J | **🔴 Prometric (v5.19)**: agendar/reprogramar el Step 1 al **vie 19-feb-2027** y confirmar que el eligibility period lo cubre (si no: extensión ECFMG con costo, o recortar temario = derogar la regla). Es el mismo 🔴 de arriba; se repite aquí porque cada corrimiento lo mueve (v5.18: jue 18-feb; v5.17: mar 16-feb; v5.16: jue 11-feb). | sin cita confirmada |
| K | **Research · X-3 (d39, inventario del corpus SR-1) cae el vie 19-feb = DÍA DEL EXAMEN** y **R8 (d38, protocolo PRISMA-P, átomo recortable) el mié 17-feb = D94 = última sesión de banco** (X-8, d37, cae el lun 15-feb = D92; CR-9, d36, el jue 11-feb = D90). Opciones: **(a)** no hacer nada el día del examen: X-3 se recupera tras el examen y R8 se hace corto la tarde del D94 o se recorta (no vence nada) · **(b)** correr la cola del ciclo 1 un slot desde X-3 (X-3…X-6 y el arranque del ciclo 2, mié 3-mar) — `gen_research_plan.js` + regenerar + `gen_research_calendar.js --check` · **(c)** hacer X-3 el día del examen (no recomendado). *(v5.18: R8 mié 17-feb = D-1 real y X-3 vie 19-feb al día siguiente del examen; v5.17: R8 lun 15-feb = D-1; v5.16: R8 jue 11-feb = día del examen.)* | (a)/(b) a decidir; hoy el plan deja R8 el mié 17-feb y X-3 el vie 19-feb |
| L | **AURUM · D96 (1.ª lección de la F6, «Por qué el Challenger gana») cae el vie 19-feb = día del examen**: lección opcional ese día o recuperarla el lun 22-feb; el pitch v5 (D95) es el jue 18-feb (fila F). *(v5.18: D96 jue 18-feb; v5.17: D96 mar 16-feb; v5.16: D96 jue 11-feb.)* | opcional / recuperar lun 22-feb |
| M | **ENCAPS · stock del banco (inventario 5-oct, 249 disponibles de 434):** reponer **`set_V-2_2.json`** y **`set_III-5_2.json`** — **III-5 queda a 0 disponibles** tras el banco del lun 12-oct (pertinencia/barreras) y **V-2 a 1/41** tras el del jue 8-oct (planeamiento); las siguientes instancias son el **jue 22-oct (V-2, clima organizacional)** y el **lun 9-nov (III-5, medicina tradicional/complementaria)**; II-5 tiene 20/27 (banco NTS adolescente el mar 13-oct; siguiente II-5 mar 10-nov) — y cubrir los déficits **V-2 179 · I-3 170 · III-5 90 · IV-1+IV-2 72 · II-5 70 · IV-6+IV-7 66 · III-8 64 · V-MED 50** (además II-1 79 · II-3 75 · II-4 75 · I-4 74 · II-11 67 · II-8 61). Gate §3-bis (clave oficial o compendio/norma con número y año). *(v5.18, 3-oct: mismas cifras; III-5 a 0 tras el jue 8-oct, V-2 1/41 tras el mié 7-oct. v5.17, 30-sep: 232/434.)* | sin reposición; ver 🟠 «Reponer stock» |
| N | **Fuera del repo · `D:\agente_estudio\config\fases.json` → `FASE_7.inicio = 2026-10-06`** (v5.15 pedía 2026-09-23, v5.16 2026-09-28, v5.17 2026-10-01 y v5.18 2026-10-05; sigue sin aplicar). 1 línea; lo haces tú. | `inicio = 2026-09-21` (o la fecha de un corrimiento anterior si ya lo cambiaste) |
| P | ✅ **RESUELTA 30-sep (desactivada con tu permiso)** · **NUEVO v5.17 · ENCAPS · tarea programada de Windows `ENCAPS_v9_daily_0400`** (`run_daily.bat` → `daily_update.py` → `encaps_supabase_sync.py`, plan v9 viejo): hace *upsert* en `study_schedule` (`on_conflict examen,dia`) y en `study_metrics`; el 27-sep pisó ENCAPS dia 1-71 y el `extra`, y el 30-sep se limpió y resembró v5.17. Opciones: **(a)** desactivarla (`schtasks /change /tn "ENCAPS_v9_daily_0400" /disable`) · **(b)** quitar `run_parent("encaps_supabase_sync.py")` de `daily_update.py`. Fuera del repo: lo haces tú (ver el primer ítem de 🔴). | desactivada desde el 30-sep (`schtasks … /disable`); no reactivar *(antes: activa, podía pisar ENCAPS cualquier madrugada a las 04:00)* |
| Q | **v5.19 · USMLE · viernes de nivel 4 en la Fase A = 1: solo el D54 vie 18-dic (Heme/Onc, plaquetas + CID)** (v5.18: 0). `gen_usmle_v5.js` asigna `nivelUW` por DÍA DE SEMANA (viernes sin hito = N3 hasta S10 / N4 desde S11, `viernesN4DesdeSemana = 11`; bloques de 7 días desde el D1, ahora mar → lun) y, con el D1 en martes, de los viernes de S11+ solo el 18-dic queda libre: el resto son festivos (25-dic, 1-ene) o primer/segundo día de sistema, que van en N1 (D66 vie 8-ene Repro · D71 vie 15-ene MSK · D76 vie 22-ene Psiquiatría · D81 vie 29-ene Bioquímica); en la Fase B/C, D86 vie 5-feb = N4 y D91 vie 12-feb = N5. Conteo v5.19: N1 28 · N2 37 · **N3 7** (D9 vie 16-oct · D14 vie 23-oct · D19 vie 30-oct · D29 vie 13-nov · D34 vie 20-nov · D39 vie 27-nov · D49 vie 11-dic) · **N4 5** (D54 + D84 · D86 · D88 · D89) · N5 18 · Q total 5 560 (= v5.18); temas por D# intactos. La dosis N4 diaria sigue en la **eval 18:00** (mixto de sistemas dominados). Opciones: **(a)** aceptarlo (el N4 de la Fase A vive en la eval diaria + el D54) · **(b)** reubicar el N4 de la Fase A a otro día de la semana desde S11 (p. ej. el último día de cada sistema) — 1 regla en `gen_usmle_v5.js` + regenerar (no toca temas). *(v5.18: 0 viernes N4 (N2 40 · N3 5 · N4 4); v5.17: 4 (D57 · D69 · D74 · D79); v5.16: 1 (D60).)* | (a) · 1 viernes N4 en Fase A (D54 vie 18-dic); N4 en la eval 18:00 + D84/D86/D88/D89 — decisión tuya |

### USMLE · divergencias Palmerton §E que siguen abiertas (las #2, #5 y #7 ya están implementadas)

| # | Decisión | Hoy corre así |
|---|---|---|
| 1 | **Consolidación 11:00 a 20Q permanentes** si en S2-S3 la revisión metodológica no cabe en 60 min (Palmerton §3.4: 10Q + revisión = 60 min). Decidir tras S1-S2 | 30Q (10 pre-test + 20 consolidación) en nivel 1; 40Q desde nivel 2 |
| 3 | **Reformular el GO/NO-GO para que el UWSA2 sea solo informativo** (el UWSA sobreestima; la fecha la decide el NBME). `HITOS_ONTRACK` ya lo trata como 'low risk · solo resistencia'; falta la frase del GO | "2 NBME ≥68 % + UWSA2 low risk" |
| 4 | **Free 120 en Prometric Lima + maratón de resistencia** (Palmerton §8.1 #4: un simulacro más largo que el examen). Única ventana sin tocar franjas: un día de hito de la Fase B — **D85, jue 4-feb** (v5.19; NBME 33 + 3 bloques de *flagged* ≈ 5 h) o **D82, lun 1-feb** (NBME 31) — cediendo Research/Derma/AURUM ese día; `POR_MATERIA` §E dice "un viernes" (en v5.19 ningún hito de la Fase B cae en viernes: NBME 31 lun 1-feb · 32 mar 2-feb · 33 jue 4-feb · Free 120 lun 8-feb; los hitos no están anclados a un día de la semana — en v5.18 el NBME 31 y el Free 120 caían en viernes) → corregirlo al decidir | Solo el Free 120 en D87 (lun 8-feb), en casa |
| 6 | **Mover la eval timed 18:00-18:45 a 12:00-12:45** ("estudiar cansado = 2-4× más lento"; solaparía SYNAPSE 12:30) | 18:00-18:45 |
| 8 | **Si el UWSA1 (mar 6-oct, v5.19) sale <40 % → D2-D10 a 20Q/día** (tipo Jay). Se decide ese mismo martes con el % real (v5.19; v5.18: lunes) | Sin regla activa |
| 9 | Preguntas **experimentales / de mecanismo** sin bloque específico → propuesta: integrarlas en el **Day-After** de cada NBME (hallazgo #5: `DAY_AFTER` en la app + "leer el reporte por sistema") | Sin asignar |

### USMLE · decisiones nuevas del crítico (detalle y propuesta técnica en `SEGUNDA_CAPA_ESTADO.md` §3)

- [ ] **Gate fallido sin mecánica (#7)**: `USMLE_GATE.siFalla` dice "NO avanzar de tema" pero `nivelUW/qDia` del día siguiente
      son fijos por calendario; FRANJAS absorbe UN fallo. Propuesta coherente con "no fusionar": **2.º fallo consecutivo del
      mismo subtema → mañana es DÍA DE REPETICIÓN (misma fila de DIAS) y el plan corre +1 hábil con `remap_inicio.js`** +
      campo `bloques5Q` con alarma si ≥5 (Palmerton §11.5). ¿Se acepta?
- [ ] **El acrónimo "CCSN" tiene dos sentidos (#9)**: Palmerton/FRANJAS/`TIPO_ERROR_INFO` = Contexto·Cronología·Severidad·
      Ruido; `DATA/ENCAPS/TRACKING_ERRORES` = "Confusión entre Conceptos Similares". ¿Renombrar el subtipo de TRACKING a
      `SIMILARES` o documentar la doble acepción?
- [ ] **NBME 32/33 <68 % tras un GO ya dado (#20)**: código y METODO dicen "confirma el GO" (Palmerton §8.1/§9.1: el real
      rara vez se aleja 5-10 puntos de los DOS últimos NBME); `POR_MATERIA` Parte V-A dice "medición, no gate". ¿Un 32/33
      bajo mínimo revierte la fecha? (la tabla de POR_MATERIA se corrige al decidir).
- [ ] **Régimen · ¿se acepta seguir con 5 días L-V o se recupera algo?** El plan bajó de ~606 h (97 d) a ~594 h (95 d) y el
      colchón consumido desde el 31-ago son **26 días hábiles** (v5.19: 31-ago → lun 5-oct, ninguno estudiado; v5.18 contaba 25, v5.17 23, v5.16 20) — el examen ya salió de la ventana. *(USMLE)*
- [ ] **🔴 EL COLCHÓN SE ROMPIÓ (v5.12, 15-sep; v5.13 y v5.14 lo empeoraron un hábil cada una, v5.15 dos de golpe, v5.16 tres, v5.17 otros tres, v5.18 dos más y v5.19 uno más): el examen ya está FUERA de la ventana 25-29 ene (target vie 19-feb) y no hay ningún día de reserva.** Un día más sin
      estudiar mueve el examen al lun 22-feb (y así sucesivamente: cada corrimiento = reprogramar Prometric otra vez, si el eligibility period lo permite) o obliga a
      (a) **recortar temario** (rompe la regla) o (b) **estudiar un sábado** para absorber el día. Decidir la regla ANTES de que ocurra; y desde ya: **agendar
      Prometric para el vie 19-feb + confirmar eligibility** (🔴). *(v5.18: target jue 18-feb; v5.17: mar 16-feb.)* *(USMLE — bloqueante)*
- [x] ~~**Decisión (v5.11): el D95 = jue 28-ene ya no es descanso puro sino sesión mínima (D-1 dentro del plan).**~~ **SUPERSEDIDA por v5.12 (15-sep) y REPUESTA por v5.13 (16-sep):** con D1 en jueves el D95 vuelve a ser el D-1 DENTRO del plan (lun 1-feb: sesión mínima AM ≤2 h + ritual de test-day, `USMLE_TAPER.d95`/`dMenos1`), el D94 (vie 29-ene) es la última sesión de banco (`USMLE_TAPER.d94`) y el sáb 30 / dom 31 quedan libres (solo Anki vencido). **v5.14 (19-sep) conserva la estructura con D1 en lunes: D94 mar 2-feb = última sesión de banco, D95 mié 3-feb = D-1 dentro del plan, finde 30-31 ene libre entre D92 y D93.** **v5.15 (22-sep), con D1 en miércoles: D94 jue 4-feb = última sesión de banco, D95 vie 5-feb = D-1 dentro del plan, y el finde libre pasa a ser el sáb 6 / dom 7-feb, ya pegado al examen — el D-1 real de calendario es el domingo 7.** **v5.16 (26-sep), con D1 en lunes: D94 mar 9-feb = última sesión de banco, D95 mié 10-feb = D-1 REAL (víspera), examen jue 11-feb — por primera vez sin fin de semana libre en medio; el sáb 6 / dom 7-feb quedan entre D92 y D93.** **v5.17 (30-sep), con D1 en jueves: D94 vie 12-feb = última sesión de banco, sáb 13 / dom 14-feb libres, D95 lun 15-feb = D-1 REAL (víspera), examen mar 16-feb — vuelve a haber un finde entre D94 y D95.** **v5.18 (3-oct), con D1 en lunes: D94 mar 16-feb = última sesión de banco, D95 mié 17-feb = D-1 REAL (víspera), examen jue 18-feb — como en v5.16, sin finde entre D94 y D95; el sáb 13 / dom 14-feb quedan entre D92 y D93.** **v5.19 (5-oct), con D1 en martes: D94 mié 17-feb = última sesión de banco, D95 jue 18-feb = D-1 REAL (víspera), examen vie 19-feb — sin finde entre D94 y D95; el sáb 13 / dom 14-feb quedan entre D91 y D92.** Lo que hay que confirmar ahora es la fila 0 (examen vie 19-feb). *(USMLE)*
- [ ] **SYNAPSE · la última A-unit (d131, cierre F2 + CCA-F) cae el SÁBADO 13-feb-2027** (v5.19: el motor tiene 131 días de calendario, mar 6-oct → sáb 13-feb (`FIN_PLAN = 2027-02-13`, +1 día), y cierra entre el **D91** (vie 12) y el **D92** (lun 15) del Step 1, dos días después del SUBMIT CR-9 de Research (jue 11-feb); v5.18: vie 12-feb (d131, D92); v5.17: mar 9-feb (d132, D91); v5.16: vie 5-feb (d131); v5.15: lun 1-feb (d132); v5.14: vie 29-ene; v5.13: mar 26-ene; v5.12: lun 25-ene; v5.11: sáb 23-ene; v5.10: vie 22-ene). Decidir si se mantiene (15' un sábado de sprint) o se adelanta (regenerar con `gen_synapse_plan.js` cambiando el cierre). ✅ El texto de esa A-unit ya dice «CIERRE F2 (último día del motor, sáb 13-feb en v5.19 · v5.18: vie 12-feb)» (regenerado el 5-oct). *(SYNAPSE)*
- [ ] **Puente MIR ↔ Step 1** — Cardiología MIR (D5, **lun 12-oct**) precede a Cardiovascular Step 1 (D6, **mar 13-oct**)
      por 1 hábil; Psiquiatría MIR arranca el **mié 20-ene** (D74) y *Psychiatry & Behavioral* el **jue 21-ene** (D75) — 1 hábil de ventaja (v5.19; v5.18: vie 9 / lun 12-oct y mar 19 / mié 20-ene). Los otros 9 bloques
      quedan entre +7 y +12 días. **Recomendación escrita: NO re-permutar el MIR.** El chip «MIR precedió esta semana» del
      repaso 07:15 ya está en la app. *(USMLE/MIR)*
- [ ] **Materias sin columna vertebral en el corpus Palmerton — decidir la fuente sustituta** *(USMLE)*:
      - **13 días completos**: Micro/ID (D58-D64, **jue 24-dic → mié 6-ene**, tras el NBME 28 del lun 21-dic; el vie 25-dic, el jue 31-dic y el vie 1-ene son feriados, así que el bloque no tiene viernes), MSK/Reuma+Derma (D71, D73-D74:
        **vie 15, mar 19 y mié 20-ene**; el dermato Step 1 va en D74 mié 20-ene; el NBME 30 del lun 18-ene es D72) y Psiquiatría (D75, D76 y D78: **jue 21, vie 22 y mar 26-ene**; el UWSA2 del lun 25-ene es D77) — D# v5.19 (v5.18: Micro mié 23-dic → mar 5-ene, MSK 14/18/19-ene, Psiquiatría 20/21/25-ene). Propuesta: **subir el peso del pre-test 10Q de las
        08:15 como FUENTE** y de la *shopping list*; no buscar "el vídeo de Palmerton".
      - **Cardio D8 (jue 15-oct, curvas PV/Wiggers/Starling — nivel 2) y D16 (mar 27-oct, valvulopatías y soplos — cae DESPUÉS del
        NBME 25 del lun 19-oct y del viernes nivel 3 de Cardio, D14 vie 23-oct)**: PV loops, Frank-Starling con retorno venoso, Laplace, maniobras de soplos, S2 y Jones
        **CONFIRMADOS AUSENTES**. ¿Costanzo, B&B o First Aid? Decidir **antes de esa mañana**.
      - **Bioestadística (D79, mié 27-ene-2027; v5.18: mar 26-ene)**: el corpus cubre la mitad conceptual pero **no la de cálculo** → repartir
        vídeo+AMBOSS / paquete de stats de UWorld.

### Nuevo 19-sep — lo que los integradores dejaron para ti (default vigente entre paréntesis; detalle en `DATA/SISTEMATIZACION_2026-09-19.md`)

- [ ] **MIR · jueves Tier C REDUCIDOS (v5.19, releído de `mirMantenimiento.ts` el 5-oct: d2 jue 28-ene Traumatología · d7 jue 4-feb Traumatología · d12 jue 11-feb Radiología-Urgencias · **d17 jue 18-feb Oncología Médica = VÍSPERA del examen (D95)**, 10Q — el mantenimiento arranca el mié 27-ene, así que su semana 1 va de mié a vie, el primer Tier C es el d2 y son **4** en modo reducido; v5.18: d3/d8/d13/d18, con Oncología el día del examen)**: las 10Q del día son todas Tier C, sin formulario de la
      asignatura foco (**default**), o 10Q foco + 10Q Tier C (20Q, rompe el «reducido»). *(MIR)*
- [ ] **MIR · pre-test 5Q se lleva las preguntas más recientes del capítulo y el quiz sigue con las siguientes**: en los capítulos con ≤5 usables (D22, D57,
      D60, D66, D4, D33, D48, D52, D53, D55, D58, D62…) el quiz queda 100 % ProMIR. **Default = pre-test primero** (`POOL_USO.md` §2); alternativa: reservar las
      oficiales para el quiz comentado y hacer el pre-test en ProMIR. *(MIR)*
- [ ] **MIR · mini-MIR D77 (lun 25-ene-2027, v5.19 — mismo día que el UWSA2 09:00-13:00; v5.18: vie 22-ene)**: semilla = `dia.fecha` (si el día se corre otra vez la mezcla cambia). **Default = por fecha**; alternativa semilla fija «D77». *(MIR)*
- [ ] **MIR · cuaderno de imágenes fuera del repo** (`node DATA/_scripts/gen_mir_pool.js --descargar --con-imagenes`; leyenda «prohibida la reproducción»): la vista
      marca «🖼 imagen n (cuaderno)» y enlaza el PDF oficial. **Default = no descargar.** *(MIR)*
- [ ] **ENCAPS · FRANJAS de la fase intensiva (feb-mar 2027)**: `extra.loop` hereda las horas del loop USMLE v5.6 (05:00 Anki · 07:15 repaso · 08:15 pre-test ·
      09:00 deep prime · 11:00 30Q · 12:00 cierre · 17:15 anclaje · 18:00 eval) y el 17:15 choca con LIVIANO/Research. **Default = mantener el esqueleto y fijar
      las horas en la reestructuración de febrero** (la app ya muestra «A CONFIRMAR»). *(ENCAPS)*
- [ ] **ENCAPS · umbral del simulacro /100 de la intensiva**: runner 85 % (`ENCAPS_CIEGO_META_PCT`) con alerta <70 %; el pre-test 2026-II usa ≥70 (su fila).
      **Default = 85/70**; si prefieres otro, `ENCAPS_SIM100_META` en `encapsPlan.ts`. *(ENCAPS)*
- [ ] **ENCAPS · fecha real del examen 2027-I (convocatoria SERUMS)** antes de sembrar la intensiva (⛔ el SQL no se aplica hasta entonces) — ya en 🟡; se repite aquí
      porque el arranque (**lun 22-feb**, con el pre-test el vie 26-feb: defaults ya alineados, ⚪ A) depende de ella. *(ENCAPS)*
- [ ] **LIVIANO · los 8 sub-decks `APEX::LIVIANO::*` no existen en Anki** (Anki cerrado el 19-sep): se crean al importar `LIVIANO_mecanismo.csv` (🟠, D16 mar 27-oct en v5.19) o antes
      a mano. **Default = al importar el CSV.** *(LIVIANO)*
- [ ] **Calendar · series secundarias el vie 19-feb (examen, v5.19: RESEARCH↔DERMA 13:30 = Research X-3, AURUM 14:15 = D96, MIR 15:15/15:30 = d18 viernes reducido) y en la víspera (jue 18-feb = D95 = D-1 real: RESEARCH↔DERMA 13:30 = Derma d48 opcional · AURUM 14:15 = pitch v5 · MIR d17 reducido + Tier C Oncología · vibecoding S20 journal 5') + GYM/BAILE de la víspera (en v5.19 la víspera es JUEVES: GYM 19:00 `4qvs34d84u82psvknpqhv3jc7a` y BAILE 19:30 `3m8m4resu8akph4a7qfuf3h1qn`, con el aviso de D-1; el BAILE del miércoles `0tod56pc6pgecm5lf7g4e3ji9v` ya no es víspera)**: dejarlas (el overlay ya avisa; **default**) o
      vaciarlas a mano. **v5.19, por los UNTIL (sin re-verificar con `list_events` en esta pasada, A VERIFICAR 5-oct):** el jue 18 y el vie 19-feb siguen activas las series 04:15 VIBECODING · 12:30 SYNAPSE · 13:30 RESEARCH↔DERMA · 14:15 AURUM · 15:15 + 15:30 MIR · 17:15 LIVIANO (no tienen UNTIL), aunque SYNAPSE cierra el sáb 13-feb, ENCAPS el lun 15-feb y LIVIANO el jue 11-feb en sus planes; las series USMLE L-V ya no (la extensión termina el mar 16-feb = D93) y solo quedan los overlays D94 (mié 17), D95 (jue 18) y EXAMEN (vie 19). *(v5.18, histórico:)* examen jue 18-feb (Derma d49, AURUM D96, MIR d18 + Tier C Oncología) y víspera mié 17-feb (R8, pitch v5, MIR d17, BAILE del miércoles `0tod…`); extensión USMLE hasta el lun 15-feb. *(v5.17, histórico:)* **Verificado con `list_events` (30-sep):** el lun 15 y el mar 16-feb siguen activas en el Calendar las series 04:15 VIBECODING · 12:30 SYNAPSE · 13:30 RESEARCH↔DERMA · 14:15 AURUM · 15:15 + 15:30 MIR · 17:15 LIVIANO (no tienen UNTIL), aunque ENCAPS cerró el mié 10-feb, SYNAPSE el mar 9-feb y LIVIANO el lun 8-feb en sus planes; las series USMLE L-V ya no (terminan el jue 11-feb) y solo quedan los overlays D95 y EXAMEN. *(v5.16, histórico:)* series secundarias el jue 11-feb (examen: Research R8, AURUM D96, MIR D18 reducido, vibecoding S20, GYM 19:00) y GYM/BAILE de la víspera (mié 10-feb, BAILE 19:00-20:30). **VERIFICADO el 26-sep (tarde) con `list_events` del jue 11-feb**: aparecen VIBECODING 04:15 (S20 cerró el mié 10), SYNAPSE 12:30 (el motor cerró el vie 5-feb), RESEARCH↔DERMA 13:30 (= R8, decisión K), AURUM 14:15 (= D96, decisión L), MIR 15:15 + 15:30 (día 18 reducido), LIVIANO 17:15 (el plan cerró el mié 3-feb) y GYM/BAILE del jueves; NO aparecen bloques USMLE (extensión hasta el lun 8-feb; D94/D95 solo overlays) ni ENCAPS (cerró el vie 5-feb). En v5.17 la extensión USMLE llega al jue 11-feb (D93) y la ENCAPS al mié 10-feb. Qué vaciar sigue siendo tu decisión. *(sistema)*

### Resto de secciones

- [x] ~~**ENCAPS · convergencia registro ↔ Supabase**~~ **RESUELTA el 19-sep: `node DATA/_scripts/gen_encaps_semana.js --pull [--dry]` existe** (lee `study_progress` fuente `app:cierre`, reconstruye rondas v3 sin duplicar, `_meta.ultimo_pull`; el botón «⎘ línea --cerrar» sigue como respaldo). Flujo: viernes ANTES del cierre semanal `--pull` → `--semana`. *(histórico:)* hoy cada cierre de la app se lleva al registro a mano («⎘ línea
      --cerrar»). El `--pull` propuesto (leer `study_progress` fuente `app:cierre` y reconstruir rondas v3 en
      `_registro_resoluciones.json`) **no existe**: ¿se pide al dueño de `gen_encaps_semana.js` (próxima pasada) o se
      mantiene el botón? `errores_por_tipo` ya trae la ronda v3 completa, es trivial.
- [x] ~~**ENCAPS · el pre-test de arranque volvió a 39/40 reales en v5.12**~~ **RESUELTO en v5.13 (16-sep) y re-verificado en v5.14 (19-sep):** regenerado como `pretest_arranque_2026-09-21.json` (parte 1, lun 21) y `…_2026-09-22.json` (parte 2, mar 22), `_meta.conteos` da **20/20 reales con clave oficial en cada parte, 0 nuevos** (40/40). **v5.15 (22-sep): el pre-test se volvió a regenerar como `…_2026-09-23` (19/20 reales, 1 nuevo en II-3) + `…_2026-09-24` (20/20 reales). v5.16 (26-sep): regenerado otra vez como `…_2026-09-28` (II-3 · V-2 · III-5 · I-3) + `…_2026-09-29` (II-4 · IV-1+IV-2 · I-4 · II-5); las salidas del 23 y del 24-sep ya no existen. v5.17 (30-sep): regenerado como `…_2026-10-01` (parte 1: II-3 · V-2 · III-5 · I-3) + `…_2026-10-05` (parte 2: II-5 · I-4 · IV-1+IV-2 · II-4), 40/40 reales con clave oficial; las salidas del 28 y del 29-sep ya no existen. v5.18 (3-oct): regenerado como `…_2026-10-05` (parte 1: II-3 · V-2 · III-5 · I-3) + `…_2026-10-06` (parte 2: II-5 · I-4 · IV-1+IV-2 · II-4), 40/40 reales con clave oficial; la salida del 1-oct ya no existe y la del 5-oct pasa a ser la parte 1. v5.19 (5-oct): RE-FECHADO, no regenerado (ítems intactos, `_meta.realineado`): parte 1 → `…_2026-10-06` (mar 6), parte 2 → `…_2026-10-07` (mié 7); la salida del 5-oct ya no existe** — ver 🟠 Mar 6-oct. Nada que decidir. *(ENCAPS)*
- [ ] **ENCAPS · ¿se aplica el override semanal** que propone `gen_encaps_semana.js`? No es automático: revisar el SQL y
      ejecutarlo por `execute_sql`. En las semanas con 4 slots CRÍTICA un tema caliente **solo desplaza a un crítico ya
      dominado** (≥85 %, n≥5); I-3/V-2 intocables; máx. 2 sustituciones. *(decisión semanal, viernes 17:00)*
- [ ] **MIR · el acumulado <50 % pone el tema en 'caliente' pero NO cuenta como evento de fallo** (solo quiz <60 % y slot de
      ancla ✗ suman para el "ajuste obligatorio al 2.º fallo"). Si prefieres que sí cuente, son 2 líneas en `mirTemaEstado`.
- [ ] **MIR · modo "reducido" de enero** — leído de `mirMantenimiento.ts` el 5-oct (v5.19): mantenimiento **57 días, mié 27-ene →
      jue 15-abr-2027** (arranca el mié 27 para no pisar el D78 del mar 26-ene; el fin NO está clavado al ENCAPS: se AMPLÍA para conservar los 46 slots lun-jue, así que no se pierde ningún slot; 11 viernes), `modoReducidoHasta = 2027-02-19` (**18 días** reducidos = solo Anki + 10Q mixtas, hasta el vie 19-feb = día del examen inclusive; 12 slots
      Tier C express, **los 12 en jueves** — el primero jue 28-ene = d2, Traumatología; el último jue 15-abr = d57, Planificación y Gestión Sanitaria, último día). Si prefieres el bloque completo también en enero, hay que regenerar con esa constante cambiada
      (`gen_mir_mantenimiento.js`). ⚠ La **víspera (jue 18-feb = D95)** es el d17, reducido + **Tier C express de Oncología Médica** (Cardiología + Oncología), y el **vie 19-feb (examen Step 1)** es el d18 = ÚLTIMO día en modo reducido (viernes: 10Q de la asignatura peor del log):
      decidir si esos dos días van reducidos, vacíos o con el Tier C movido (⚪ G). El primer día en modo normal es el **lun 22-feb (d19: 25Q Gastroenterología + interleaving)**. *(v5.18: 57 días mar 26-ene → mié 14-abr, reducido hasta el jue 18-feb = examen, con el Tier C de Oncología ese día. v5.17: 58 días vie 22-ene → mar 13-abr, reducido hasta el mar 16-feb.)* *(MIR)*
- [ ] **Supabase · qué se hace con los backups viejos** — `study_schedule_bk_0906b` sigue existiendo y en total hay **~43
      tablas `study_schedule_bk_*`** con RLS OFF expuestas a la anon key. ¿Se conservan, se borran o se protegen? *(sistema)*
- [ ] **CURVA · decidir el eje de la línea.** `empresaData.ts` dice "Estética & figura / estética corporal médica";
      `estudioPulsoData`, `brandContentPlan` y `CURVA_ACADEMIA.md` la tratan como **hormonal**. **Si Curva es estética
      corporal hay que rehacer el esqueleto.** *(Business — bloqueante para febrero)*
- [ ] **VITALS · 3 decisiones del puente con la Academia**: (a) día del check-in semanal de EA GLP-1 (fijo vs día de
      inyección); (b) base de cálculo de la proteína en `bajo_glp1` (peso actual / ajustado / objetivo; piso **1,2 vs 1,6
      g/kg**); (c) si la foto mensual se guarda en la app. *(VITALS/LIVIANO)*
- [ ] **Research · ¿nov-2026 o feb-2027 para el SUBMIT de la tesis L0?** `RUTA_PUBLICACION_2027.md` §3.1 dice "envío
      feb-2027"; el plan fija **T-8 = mar 15-dic-2026** (v5.19 = v5.18, d26; v5.17: vie 11-dic) con el gate CEI + inglés (si falla, cascada a feb-2027 automática).
      Decidir cuál prevalece; si es feb-2027, es 1 línea en el script + regenerar. *(Research)*
- [ ] **AURUM · política de semanas** (leído de `aurumDailyPlan.ts` el 5-oct, v5.19: D1 mar 6-oct → D130 jue 8-abr-2027): las 16
      variantes LIVIANO caen en LUNES del d40 al d55 (30-nov → 21-dic), en MARTES el d60 (29-dic, deriva por los feriados 25-dic / 31-dic / 1-ene) y en JUEVES desde el d65 (7-ene … d115 18-mar); PITCH 1-3 en lunes (d15 26-oct · d35 23-nov · d55 21-dic = día del NBME 28),
      PITCH 4-7 en jueves (d75 21-ene · d95 18-feb · d115 18-mar · d130 8-abr). Se respeta "1 de cada 5 drills". Si quieres viernes
      estrictos, cambiar la política en `gen_aurum_plan.js` (saltar feriados sin desplazar la semana). ⚠ El PITCH v5 (d95) **sigue siendo la víspera del examen**: cae el **jue 18-feb = D95 = D-1 real del Step 1**, sin finde de por medio (v5.18: mié 17-feb; v5.17: lun 15-feb tras el finde libre; v5.16: mié 10-feb; v5.15: vie 5-feb con finde libre; v5.14: mié 3-feb; v5.13: lun 1-feb; v5.12: vie 29-ene). Decidir si lo grabas ese jueves (antes de las 17:00) o lo adelantas — ⚪ F; y el **D96 cae el vie 19-feb = examen** — ⚪ L. *(v5.18: variantes en viernes d40-d55, lunes d60, miércoles desde d65; PITCH 1-3 viernes, 4-7 miércoles. v5.17: variantes en miércoles d40-d60 y lunes desde d65.)* *(AURUM)*
- [ ] **Business · los 2 últimos OUTPUT** caen mar 2-feb (S16, cierre, D120) y mié 3-feb-2027 (extra, retro
      del formato L; D121 = último día) porque las lecturas se agotan antes (v5.19, releído el 5-oct: el OUTPUT S14 cae el vie 22-ene = D109 y el OUTPUT S15 sí cae en viernes, 29-ene = D116, tras los colchones META lun 25 → jue 28-ene (D112-D115); el lun 1-feb (D119) es otro colchón META; 121 filas = 84 trabajo + 37 descansos; v5.18: S16 lun 1-feb y extra mar 2-feb; v5.17: S16 jue 28-ene y extra vie 29-ene). Si quieres S16 en viernes, añadir
      lecturas META en `plan_pulso_v3_L.json` (el plan lo regenera `gen_business_plan.py`, ya integrado en el remap). *(Business)*
- [ ] **LIVIANO · posición de los drills de cifras** (v5.19, releído de `livianoStudyPlan.ts` el 5-oct: **D37 mié 25-nov · D58 jue 24-dic · D75 jue 21-ene · D88 mar 9-feb** = repaso integral I); el
      análisis pedía D38/D58/D75 y en v5.19 coinciden D58 y D75 (la Síntesis M2 es D38, jue 26-nov). Si prefieres esos D# exactos, mover
      `drill: true` en `liviano_curriculum.json` y regenerar. ✅ La cabecera de `src/lib/livianoScore.ts` ya documenta «D37 · D58 · D75 · D88, v5.19 = v5.18» (verificado el 5-oct). *(v5.18: mismos D#, mar 24-nov · mié 23-dic · mié 20-ene · lun 8-feb; v5.17: D36 · D58 · D75 · D87.)* *(LIVIANO — menor)*
- [ ] **Calendar · 6 decisiones personales** (no se cambian horas sin tu OK) *(sistema)*: (a) reponer o no el NAP
      13:15-13:30 (hoy la LECTURA 13:00 ya define una **siesta OPCIONAL ≤20' solo en ÁMBAR**); (b) typo "ALUMUERZO"
      (`summary`); (c) ~~`<br>` escapados en SYNAPSE 12:30 y PC sáb/dom~~ las series SYNAPSE sáb/dom se reescribieron el 19-sep sin `<br>` (12:30 con descripción v5.14; texto literal **A VERIFICAR (19-sep)** con `get_event`); (d) la frase de identidad
      de examen ya está en EKER (frase 6) → ¿basta?; (e) **martes**: ALISTARSE 18:30 recorta 15′ a la Eval 18:00-18:45 →
      ¿cerrar la eval a las 18:30 o mover ALISTARSE? (en v5.19 el examen cae en viernes; v5.18: jueves); (f) GYM/BAILE del mié 17-feb (D94) y del jue 18-feb (D95 = D-1 real, víspera del examen del vie 19-feb: el GYM 19:00 `4qvs34d84u82psvknpqhv3jc7a` y el BAILE 19:30 `3m8m4resu8akph4a7qfuf3h1qn` del jueves —o cualquier GYM/BAILE nocturno esa noche— van contra "nada después de las 17:00, cama 21:00") (ver 🟠 Calendar 1). *(v5.18: mar 16 / mié 17-feb, víspera del jue 18-feb, BAILE del miércoles `0tod56pc6pgecm5lf7g4e3ji9v`; v5.17: vie 12 / lun 15-feb, víspera del mar 16-feb.)*
- [ ] **Renombrar `DATA/ENCAPS/CALENDAR_SEGMENTOS_V5_6.md` → `_V5_19.md` (o a un nombre sin versión)?** El contenido va por v5.10-v5.16 (12-26 sep, §18 = v5.16) más el registro de la pasada v5.17 del 30-sep (§19), el de la v5.18 del 3-oct (§20) y el de la v5.19 del 5-oct (§21), el nombre
      no. Si se renombra, actualizar **en el mismo movimiento** las 8 descripciones del Calendar que lo citan por ruta,
      `CALENDAR_SEGMENTOS_LUNES_VIERNES.md` y la memoria. *(sistema)*
- [x] ~~**Corregir en §0 la frase "los hitos van en viernes"**~~ **RESUELTO el 26-sep (v5.16)**: §0 de `CALENDAR_SEGMENTOS_V5_6.md` dice ahora que los 12 hitos **no están anclados a ningún día de la semana** — corren con el plan conservando su D#; con el D1 en lunes 8 de los 12 vuelven a caer en viernes (NBME 31 **vie 22-ene** · NBME 32 **lun 25-ene** · NBME 33 **mié 27-ene** · Free 120 **vie 29-ene** · UWSA1 = D1, **lun 28-sep**). **v5.17 (30-sep):** con el D1 en jueves 8 de los 12 caen en **miércoles** (NBME 31 mié 27-ene · 32 jue 28-ene · 33 lun 1-feb · Free 120 mié 3-feb · UWSA1 = D1, jue 1-oct) — §0 de CALENDAR_SEGMENTOS ya cita los ejemplos v5.17 (verificado el 30-sep). **v5.18 (3-oct):** con el D1 de nuevo en lunes 8 de los 12 vuelven a caer en **viernes** (NBME 31 vie 29-ene · 32 lun 1-feb · 33 mié 3-feb · Free 120 vie 5-feb · UWSA1 = D1, lun 5-oct) — §0 de CALENDAR_SEGMENTOS ya cita v5.18 (releído el 3-oct: «con el D1 otra vez en lunes vuelven a caer casi todos en viernes (8 de 12)», fila de Fases con NBME 31 vie 29-ene · 32 lun 1-feb · 33 mié 3-feb y Fase C desde el vie 5-feb). **v5.19 (5-oct):** con el D1 en martes 8 de los 12 caen en **lunes** (NBME 31 lun 1-feb · 32 mar 2-feb · 33 jue 4-feb · Free 120 lun 8-feb · UWSA1 = D1, mar 6-oct) — ✅ §0 de CALENDAR_SEGMENTOS ya cita v5.19 (releído el 5-oct: «con el D1 en martes caen casi todos en **lunes** (8 de 12)», fila de Fases con NBME 31 lun 1-feb · 32 mar 2-feb · 33 jue 4-feb y Fase C desde el lun 8-feb). *(USMLE/sistema)*

---

## Segunda capa — lo que SIGUE ABIERTO de los 65 puntos ciegos (13-sep)

Estado completo gap a gap en `DATA/USMLE/_palmerton_v3_extractos/SEGUNDA_CAPA_ESTADO.md`; **la pasada de integradores del 19-sep está cerrada en
`DATA/SISTEMATIZACION_2026-09-19.md`** (qué se hizo con `fichero:línea`, qué quedó parcial y por qué, qué exige tu decisión). Aquí solo lo abierto, en dos
listas: lo que exige tu decisión o tu sesión (arriba ya está repartido por bloque) y lo que es **cableado de una próxima
pasada de agentes** (no exige decisión; lo dejaron descrito los propios agentes porque el fichero no estaba en su lista).

**Para la próxima pasada de agentes (integrador), sin decisión de Joseph** — **CERRADO el sáb 19-sep-2026** (4 integradores en paralelo; detalle con
`fichero:línea`, lo parcial y su porqué en `DATA/SISTEMATIZACION_2026-09-19.md`; ningún ítem se inventó como cerrado: cada uno se confirmó con `grep`/`git diff`):
- [x] ~~**MIR pool → UI**~~ **RESUELTO 19-sep** (`src/components/study/MirPoolEval.tsx` NUEVO + `MirTodayPlan.tsx` HoyView/MantenimientoView + `DermaTodayPlan.tsx`;
  `qIds` en pre-test 5Q · anclada · cierre 10Q · quiz · mini-MIR 40Q; 2.º `EvalForm` Tier C los jueves + chip `mirMantProximoTierC`; `preguntaPorId` en
  `MirPreguntaVista`; espejo `mir_eval_log.q_ids` verificado en Supabase). → SISTEMATIZACION §1. **4 decisiones nuevas tuyas** (jueves Tier C reducidos ·
  pre-test primero · semilla mini-MIR · cuaderno de imágenes) en ⚪ «Nuevo 19-sep».
- [x] ~~**`DATA/MIR/README.md`** §1 tabla de pesos + aviso ≈80 %~~ **RESUELTO 19-sep** (docs-resto: tabla de las 16 asignaturas fuera del plan y aviso
  «cobertura medida ≈80 %» en la fila D78; §6 quedó en v5.14: 57 días mar 12-ene → mié 31-mar). ✅ **v5.18 (releído el 3-oct): `DATA/MIR/README.md` §6 ya dice 57 días, mar 26-ene → mié 14-abr** (reducido hasta el jue 18-feb, handoff 14-abr); ✅ **v5.19 (re-verificado el 5-oct): §6 ya dice 57 días, mié 27-ene → jue 15-abr** (reducido hasta el vie 19-feb, handoff jue 15-abr); el §6.1 de `CALENDAR_SEGMENTOS_V5_6` sigue siendo a propósito el registro LITERAL de v5.14 (las cifras vigentes de las series están en su §21.4; v5.18: §20.4) (v5.17: 58 días vie 22-ene → mar 13-abr; v5.16: mar 19-ene → mié 7-abr; v5.15: jue 14-ene → vie 2-abr).
- [x] ~~**Bloque Derma 13:30 ↔ pool MIR**~~ **RESUELTO 19-sep** (`DermaTodayPlan.tsx` › `DermaMirPool`: `poolConFallback(cap.capId, 5, 10, usadas)` +
  `MirPoolEvalCompacta` kind `derma10Q`; sin pool → cae a `DermaMir10Q`). Limpieza opcional (`DermaMir10Q` con prop `qIds`) = orquestador, SISTEMATIZACION §6.
- [x] ~~**`gen_encaps_semana.js --pull`**~~ **RESUELTO 19-sep** (`--pull [--dry] [--desde] [--hasta]`: lee `study_progress` fuente `app:cierre`, reconstruye rondas
  v3, dedup fecha+codigo+tipoRonda, `_meta.ultimo_pull`; probado real y con mock). Flujo: viernes ANTES del cierre semanal `--pull` → `--semana`. **Parcial:** los
  docs ENCAPS (`PROTOCOLO_HORA_MANTENIMIENTO`, `FASE_INTENSIVA_2027-I`) aún no lo describen → orquestador (SISTEMATIZACION §3/§6).
- [x] ~~**Bloque MIR en `gen_revision_semanal.js` y `vibecodingPlan.ts`** (gap MIR 7) + diffs de `vibecoding`~~ **RESUELTO 19-sep salvo una línea**:
  métrica 5 = `jmd-mir-eval-log` ∪ `mir_eval_log` (temas calientes, mantenimiento `mirMantenimiento.ts`); métrica 7 lee `_vibecoding_ship.json`; métrica 3
  `primeraReview`/`primeraReviewEstado` + alarma ≥2 días; `homeBriefing.ts` `STEP1_SEMANAS` ya v5.19 (= **20** semanas, S1 = lun 5 → vie 9-oct con sesiones mar 6 → vie 9 (D1-D4), S19 = 8-12 feb (D87-D91), S20 = 15-19 feb con D92-D95 y el examen; `DELOAD_SEMANAS` lunes 16-nov y 28-dic — verificado el 5-oct; v5.18: S1 completa, S19 = D88-D92, deload 9-nov / 21-dic); `CockpitStatusBar` colorea ANKI con `primeraReviewDe`.
  ✅ `gen_revision_semanal.js:453` dice ya «fuera del rango S1-S12 (6-oct → 29-dic, v5.19)» y `TOTAL_SEM = 20` (verificado el 5-oct; en v5.18 decía «5-oct → 28-dic»).
- [x] ~~**`RUTA_PUBLICACION_2027.md` §9** solo lectura~~ **RESUELTO 19-sep** (aviso «SECCIÓN DE SOLO LECTURA … se regenera desde `research_entregables` con `mesaMarkdown()`»).
- [x] ~~**`PROTOCOLO_MODO_MINIMO.md` §4 fila S7**~~ **RESUELTO 14-sep, re-fechado a v5.14 el 19-sep y a v5.15 el 22-sep; en v5.16 (26-sep)** con D1 en lunes los bloques de 5 hábiles vuelven a coincidir con las semanas de calendario, y el deload post-NBME 26 (vie 30-oct) es la semana **S6 (lun 2
  → vie 6-nov)**; el flag `deload` sigue en S7 (lun 9 → vie 13-nov) → decisión ⚪ H (swap S6↔S7 o mover el flag; default vigente: flag en S7). **v5.17 (30-sep):** con D1 en jueves los bloques van jue → mié y la deload post-NBME 26 (mié 4-nov) = **lun 9 → vie 13-nov** queda repartida entre S6 (jue 5 → mié 11-nov) y S7 (jue 12 → mié 18-nov); el flag sigue en S7. ✅ `DATA/PROTOCOLO_MODO_MINIMO.md` re-fechado a v5.17 el 30-sep (deload S7 lun 9 → vie 13-nov tras el NBME 26 del mié 4-nov). **v5.18 (3-oct):** con D1 en lunes los bloques vuelven a ser lun → vie y la deload post-NBME 26 (vie 6-nov) = **lun 9 → vie 13-nov** coincide EXACTAMENTE con **S6** (`rls-datos-tesis`); el flag sigue en S7 (lun 16 → vie 20-nov). ✅ `DATA/PROTOCOLO_MODO_MINIMO.md` re-fechado a v5.18 el 3-oct. **v5.19 (5-oct):** con D1 en martes los bloques van mar → lun y la deload post-NBME 26 (lun 9-nov) = **lun 16 → vie 20-nov** queda cubierta 4/5 por el **S7** (mar 17 → lun 23-nov), que lleva el flag: ⚪ H resuelta. ✅ `DATA/PROTOCOLO_MODO_MINIMO.md` re-fechado a v5.19 el 5-oct (deload S7 lun 16 → vie 20-nov y S13 lun 28 → mié 30-dic).
- [x] ~~**Derma keyed por `d` viejo**~~ **RESUELTO 19-sep** (`dermaCerebro.ts` re-anclado a v3 con `dV21` histórico, 35/35 fichas comprobadas con node; `DERMA_DRILL_DIAS`
  eliminado → `DERMA_DRILL_DIAS_V3` derivado de `drillHDPH`; `dermaLedger.ts:225` comentario v3; `obsidianDermaMap.ts` + `build_vault_derma.js` marcados ⚠ HISTÓRICO:
  el vault d44-d70 NO se regenera, `dermaObsUrlDay(dV3)` traduce con el mapa inverso).
- [x] ~~**`CALENDAR_SEGMENTOS_V5_6.md` §6.2/§11.2/§6.1**~~ **RESUELTO 19-sep** (calendar-doc: §6.1 con Derma 73 → 13-abr y MIR 57 → 31-mar; §16 nuevo con los ids
  de la pasada v5.14). **v5.15 (22-sep): Derma 73 → jue 15-abr y MIR 57 → vie 2-abr, pasada de Calendar en §17. v5.16 (26-sep): Derma 73 → mié 21-abr y MIR 57 → mié 7-abr, pasada de Calendar en §18 (§6/§6.1 siguen con los textos literales de v5.14 a propósito). v5.17 (30-sep): Derma 73 → vie 23-abr y MIR 58 → mar 13-abr (registro de Calendar v5.17 en §19, 30-sep). v5.18 (3-oct): Derma 73 → mar 27-abr y MIR 57 → mié 14-abr (registro de Calendar v5.18 en §20, 3-oct). v5.19 (5-oct): Derma 73 → jue 29-abr y MIR 57 → jue 15-abr (registro de Calendar v5.19 en §21, 5-oct)**; el renombrado sigue siendo tu decisión, ⚪ Resto.
- [x] ~~**Hallazgos del crítico que son código, no decisión**~~ **RESUELTO 19-sep en la app (10 hechos + 9 hechos con resto fuera de ella)** — estado ítem a ítem
  (`→ ESTADO 19-sep:`) en `SEGUNDA_CAPA_ESTADO.md` §3 y resumen en SISTEMATIZACION §2. Hechos: #12 · #26 · #6 · #13 · #27 · #10 · #18 · #19 (3/4) · §12.6-10 ·
  residuos v5.14. Con resto fuera de la app (orquestador, SISTEMATIZACION §6): #11/#27 DDL `usmle_daily_scores.extra JSONB` · #15 `anki_telemetria.js` · #8/#11/#28/#30/#16/#21
  bloques en `REVISION_SEMANAL.md` + README §4b · #14 `UsmleTodayPlan.tsx:264` sin `dia.matType` (el deck `APEX::USMLE::Pharmacology` ya existe en `ankiLinks.ts`) ·
  #5/#17 Calendar (ya hecho por calendar-B). Ninguna decisión nueva.

**Vacíos de la 2.ª capa que siguen sin agente y son tuyos o de un agente futuro:**
- [x] ~~**LIVIANO no mide retención**~~ **RESUELTO 19-sep en la app** (`src/lib/livianoScore.ts` NUEVO: pre-tests 5Q · drills — su cabecera dice D37/D58/D75/D88 en v5.19 = v5.18 (verificado el 5-oct; en v5.17 eran D36/D58/D75/D87, en v5.16 D37/D58/D75/D88 y en v5.15 D36/D57/D74/D87) — · rúbrica 0-2×4 de los 16 casos,
  localStorage `jmd-liviano-score` + espejo `study_progress` fuente `app:liviano`; deck `APEX::LIVIANO::<modulo>` en `ankiLinks.ts:116`; SISTEMATIZACION §4). **Queda tuyo:**
  importar el CSV (🟠 D16 mar 27-oct en v5.19) — los 8 sub-decks se crean al importarlo. *(histórico del gap:)* existen los 18 pre-tests de lunes y los 4 drills en
  `livianoStudyPlan.ts`, pero **no hay deck en `ankiLinks.ts` ni score persistido** (`liviano_score`: 0 menciones) → el ✓
  sigue binario. Importar el CSV (🟠) + asignar el deck (🟡) + un agente para el score.
- **Evaluación clínica del paciente con obesidad** (`gaps_v3b_business` #3): `liviano_curriculum.json` tiene 17 menciones
  (anamnesis, comorbilidades, obesogénicos…) dentro de casos, pero **A VERIFICAR (13-sep)** que exista un bloque de días
  dedicado (anamnesis/antropometría/labs basales, SAOS/MASLD/SOP, causas secundarias, embarazo/anticoncepción con GLP-1,
  TCA). Si no, es contenido nuevo para febrero (no se recorta nada del plan vigente). **Sigue A VERIFICAR (19-sep): ningún integrador lo comprobó.**
- **KPIs del Cockpit LIVIANO** (`gaps_v3b_business` #9, parcial): el botón "Exportar JSON" existe; el tracker
  `Metricas_v2` y la hoja `Outputs` del Excel no están en la app (**A VERIFICAR (19-sep)**, sigue abierto); ~~falta la carpeta `_kpi/`~~ **carpeta creada el 19-sep**
  (`DATA/BUSINESS/_kpi/README.md`: nombre `liviano_kpi_<AAAA>-W<SS>.json`, forma del JSON; guardar el export semanal ahí sigue siendo tuyo).
- **Sesión AccessDerma** (`gaps_v3b_derma` #4) — 🟡 Derma.
- **Código de VITALS** (`gaps_v3b_synapse` #11 y `gaps_v3b_business` #10) — 🔵 VITALS.

---

### Notas y reglas operativas que conviene no perder

- **Freno 04:55 (regla nueva, Palmerton #1):** a las 04:55 commit-or-stash obligatorio; el Anki AM 05:00 no se retrasa.
  El KPI "hora de la 1.ª review" lo mide `anki_telemetria.js` v2 y la tarjeta 04:15 de TodayMission tiene cuenta atrás.
- **Cafeína ≤11:00** (2 tomas: 05:00 y 07:00), siesta **opcional ≤20' 13:15-13:30 solo en ÁMBAR**; las cifras NASA/Rosekind
  quedaron A VERIFICAR en RUTINA_EXTREMA (la regla no depende de ellas).
- **Las 5 señales de burnout (DOCTRINA §6)** se contestan en el cierre 18:25 (casillas de la nota del día) y en el 🚗 VIAJE
  VUELTA: ≥1 → mañana ÁMBAR; saltarse el gym → ROJO conductual.
- **Anki de sáb/dom**: la duración = **"due × 20 s"** (60→20' · 90→30' · 150→50'); >90' = alarma G → cero nuevas. Si un fin
  de semana necesita >60′, amplía el evento a mano ese día.
- **APEX MIR directamente en Anki** hasta que el redeploy de n8n pase un test multilínea real (si llegan truncadas pierdes
  76 días de tarjetas sin señal).
- **Formato de los chats tutores (APEX)**: una línea de continuación de un campo **no debe empezar con MAYÚSCULAS seguidas
  de `:`** (p. ej. `NTS:`) — el parser la toma como label nuevo. Escribe `Nts:` / `Diferencial:`.
- **AURUM ↔ LIVIANO**: el bloque `liviano.paciente` del currículo depende de los **casos 15 y 16** de
  `DATA/BUSINESS/liviano_curriculum.json`. Si cambian, re-sincronizar y regenerar con `gen_aurum_plan.js`.
- **Siembra ENCAPS segura**: el backup se llama `study_schedule_bk_<YYYYMMDD>` y el SQL **aborta si ya existe** (mismo día →
  `--bk study_schedule_bk_<YYYYMMDD>b`); `DELETE` filtrado por `modo='MANTENIMIENTO'`; el generador lee siempre
  `SEMANAS/overrides_acumulado.json`. **No re-ejecutar** `_encaps_mantenimiento_2027.sql` (v5.19: bk_1005 existe: es correcto que aborte; bk_1003/0930/0926/0922/0919/… no los toca este SQL).
- **Pool MIR**: la clasificación se corrige en `_clasificacion_llm/AAAA.json` y se regenera; **nunca se edita
  `mirPreguntasOficiales.ts` ni el raw a mano**. Anti-repetición por `qIds` en `mir_eval_log` (`POOL_USO.md`).
- **NotebookLM es motor de verificación, no fuente**: toda dosis o cifra que devuelva queda "A VERIFICAR" hasta cotejarla
  contra la primaria. Ya se detectaron **4 errores suyos** en el corpus Palmerton y **1 probable fichero inventado**
  (`sistema-respiratorio-yousmle.md`).
- **Taper Derma es POSICIONAL (d44-d49; v5.19: lun 8-feb → lun 22-feb, con d48 jue 18-feb = D95 = VÍSPERA (opcional) y d49 lun 22-feb = primera sesión tras el examen; v5.18: jue 4-feb → jue 18-feb, con d49 = día del examen; v5.17: mar 2-feb → mar 16-feb)**: si un futuro corrimiento mueve el D1, comprobar con
  `dermaVentanaTaper('2027-02-19')` qué d caen en la ventana y repetir el swap si cambian (el remap avisa).
- **Generadores idempotentes**: `remap_inicio.js 2026-09-14` ×2 + los 9 generadores → `git diff` vacío (comprobado el
  13-sep con v5.10; en v5.11 el orquestador corrió `2026-09-15`, en v5.12 `2026-09-16`, en v5.13 `2026-09-17`, en v5.14 `2026-09-21`, en v5.15 `2026-09-23`, en v5.16 `2026-09-28` — idempotencia VERIFICADA el 26-sep por el agente de scripts: segunda pasada de gen_research_plan/gen_vibecoding/gen_synapse/gen_mir_mantenimiento/gen_aurum con diff de fechas = 0 —, en v5.17 `2026-10-01`, en v5.18 `2026-10-05` y en v5.19 `2026-10-06`). Si un `git diff` aparece tras correrlos, algo cambió de verdad: no lo pises.
- **Cabeceras de comentario en `src/lib` — estado v5.19 (lectura del lun 5-oct):** ✅ `usmleStep1Daily.ts` `DAILY_META` = 2026-10-06 → 2027-02-18, `examenTarget 2027-02-19`, `descansoD1 2027-02-18`; ✅ `livianoScore.ts` «D37 · D58 · D75 · D88, v5.19 = v5.18»; ✅ `dermaDailyPlan.ts` re-fechado v5.19 (d1 mié 7-oct → d73 jue 29-abr, `taperStep1` 2027-02-08 → 2027-02-22); ✅ `vibecodingPlan.ts` (2026-10-06 → 2026-12-29 + taper 2026-12-30 → 2027-02-18); ✅ `synapseDailyPlan.ts` «CIERRE F2 … sáb 13-feb en v5.19»; ✅ `mirDailyPlan.ts` «v5.19 · D1 = mar 2026-10-06 → D78 mar 2027-01-26 … mantenimiento … mié 27-ene»; ✅ `mirData.ts`/`mirEvalLog.ts` handoff 2027-04-15. *(v5.18, lectura del sáb 3-oct:)* ✅ `livianoScore.ts` dice «D37 · D58 · D75 · D88, v5.18»; ✅ `dermaDailyPlan.ts` cita el taper v5.18 `jue 4-feb → jue 18-feb` con d49 = día del examen (opcional); ✅ `vibecodingPlan.ts` (`VIBE_TAPER[].nombre/semanaStep1`, S20 = lun 15 → mié 17-feb, jue 18-feb EXAMEN) y el texto `deload` de `DATA/SYNAPSE/vibecoding_proyectos.json` ya citan fechas v5.18; ✅ `synapseDailyPlan.ts` dice «CIERRE F2 … vie 12-feb en v5.18»; ✅ la cabecera de `mirDailyPlan.ts` dice «v5.18 · D1 = lun 2026-10-05 → D78 lun 2027-01-25 … mantenimiento … mar 26-ene»; ✅ `usmleStep1Daily.ts` `DAILY_META` = 2026-10-05 → 2027-02-17, `examenTarget 2027-02-18`. *(v5.17, grep del 30-sep: las mismas cabeceras citaban v5.17.)* *(Historia: RESUELTO en v5.13 y re-verificado en v5.14 (19-sep), v5.15 (22-sep) y v5.16 (26-sep, grep); en v5.16 quedaban con cadenas de v5.15 `vibecodingPlan.ts` y `synapseDailyPlan.ts`.)* *(sistema)*
