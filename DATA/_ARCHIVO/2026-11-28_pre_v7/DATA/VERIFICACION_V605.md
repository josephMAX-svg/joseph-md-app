# Verificación v6.05 · TODO INICIA EL LUN 26-OCT-2026 (dom 25-oct-2026)

Ámbito: comprobar que lo publicado en la v6.05 (commits `90807a3`, `2b86639`, `4119591`; deploy de Vercel; Supabase; daemon ENCAPS; Calendar) hace lo que
ordenó Joseph el sáb 24-oct: *«Todo inicia el lunes 26. Puedes correr los horarios, alargar los plazos. Pero no quites temas, solamente corre lo que está
faltando.»* Régimen verificado: v6.05 (D1 = lun 26-oct-2026; F1 de 47; examen Step 1 lun 25-oct-2027). Todo en **solo lectura**: node sobre los `.ts` de
`src/lib` (transpilados en memoria con el TypeScript del repo, el mismo método que `DATA/_scripts/usmle/cargar_ts.js`), el SQL versionado, las referencias
`ref_v6/`, `git archive regimen-v6.04` como base de comparación, `SELECT` sobre Supabase, `GET` sobre el deploy. No se escribió nada en Supabase, Calendar,
Vercel ni en el código. Cifras y fechas con su día de la semana, recalculadas el dom 25-oct; el detalle del régimen está en `DATA/REESTRUCTURACION_31AGO_2026.md`
§29 y en `DATA/_v600/V6_ESPEC.md` (ADDENDUM v6.05).

## 1. Fechas y régimen

| Qué | Resultado | Evidencia |
|---|---|---|
| Fuente única de fechas | ✅ `_fechas_v6.json` **v6.05** = derivado | `node DATA/_scripts/gen_fechas_v6.js --check --calculo` → exit 0: «guardado = derivado» (reinicio mar 16-mar · GO/NO-GO lun 6-sep · ritual sáb 23-oct · viaje dom 24-oct · inducción → dom 16-may · convocatoria tope mié 17-feb · 7 protegidos) · `fechasV6.ts` = `gen_fechas_v6.js`: **0 diferencias** (2026-09-01 → 2028-01-31 · 8 ENCAPS × 2 SERUMS × 3 exámenes) · fases: F1 lun 26-oct → mié 30-dic (47) · F2 lun 4-ene → dom 14-mar (50) · F3 mar 16-mar → vie 30-abr (32) · F4 lun 3-may → sáb 23-oct (150) · F5 desde mar 26-oct · `STEP1_SEMANAS` 42 (F1 10) |
| `corrida_s1` | ✅ solo `sin_sesion` 19 → 25-oct, `alias` y `reparto` vacíos | `plantillaDelDia`: 19, 23, 24 y 25-oct = 0 bloques (día corrido) · lun 26-oct = 11 bloques · `estadoUSMLE` 19-25-oct = D1~ (sin «HOY» antes del D1) |
| DJ-1 (regla de cálculo de V6_ESPEC §B4.4) | ⚠ aviso | cálculo = DJ-1 (25-oct) con piso al D-1 **14-mar +164 h · 21-mar +137 · 4-abr +93 · 11-abr +65** · **18-abr: piso +38 h, déficit 2 u → ninguna ≤ 25-oct** · 25-abr: piso +10 h, déficit 7 u → «AVISAR A JOSEPH» (decisión (e) de `DATA/PENDIENTES_JOSEPH.md` v6.05); el script sale con 0 porque la DJ-1 del JSON manda |
| Colchón de horas al D-1 · GO/NO-GO por horas | ✅ sin cambio | `DATA/_v600/espec/b_horas.js`: 14-mar → 25-oct PISO +164 · M +216 · MIX +320 · T +425 · `b_gate.js`: GO/NO-GO lun 6-sep, umbral ≥ 294 h, checkpoints 31-may ≥ 62 · 30-jun ≥ 134 · 31-jul ≥ 211 (cuentan desde el reinicio: no dependen de la F1) |

## 2. Conservación de contenido por plan («no quites temas») — v6.04 (`git archive regimen-v6.04 src/lib`) frente a HEAD

| Plan | v6.04 | v6.05 | Resultado |
|---|---|---|---|
| USMLE · unidades de temario v5.20 (F1 + contenido del tramo 2, una por unidad) | 78 | 78 | ✅ multiset de D# idéntico; las 11 de F1 que no caben están en T3-T13 con su `dOrig` · `verificar_v6.js` V1: «claves con diferencia 0 · temario F1 47 (D1-D46 + D55) · dOrig únicos 48/48 · sub sin texto v5.20 0» |
| USMLE · hitos | 5 F1 + 8 tramo 2 | 5 F1 + 8 tramo 2 | ✅ `hitosDelPlan()` = D1 D10 D25 D40 **D47** T2 T51 T82 T129 T135 T142 T159 T169; los 8 de 2027 en la misma fecha |
| ENCAPS · F1 + pendientes F1 | 50 + 10 = 60 | 47 + 13 = 60 | ✅ multiset (código · sub_eje · instancia; mini-sim por cola larga) idéntico: 49 `banqueo1h` + 11 `mini_sim` = la F1 v6.00 entera; los 3 nuevos pendientes (II-4 #3, II-1 #3, mini-sim I-1 + II-2) son copia literal de las filas mant. 49, 50 y 43 de la v6.03 (`DATA/ENCAPS/_pendientes_f1.json`) |
| ENCAPS · carril B (`banqueo1h` v5.20, `dia_mant` 61-92) | 26 | 26 | ✅ idénticos (código · `dia_mant`) |
| ENCAPS · intensiva | 50 filas | 50 filas | ✅ idénticas en fecha · tipo · código · subtema (solo cambia la numeración `dia` 51-100 → 48-97) |
| MIR · diario | 78 | 78 | ✅ mismos capítulos (asignatura · capId · tema) |
| MIR · banqueo | 203 | 203 | ✅ por tipo 144 lun-jue · 35 viernes · 24 sábados (=) · Tier C 36 (multiset =) · 5.370 Q (=) · foco por asignatura de las 144 filas lun-jue (=); cambian solo la asignatura de interleaving (`asignatura2`) y la de reserva de los viernes («peor del log»), que dependen de la posición semanal · 4 sesiones caen tras el examen (`repuesta: 'v6.05'`) |
| Research | 42 + 67 = 109 | 42 + 67 = 109 | ✅ mismos códigos de átomo |
| Derma | 73 + 30 = 103 | 73 + 30 = 103 | ✅ mismas sesiones |
| AURUM · LIVIANO · Business | 130 · 90 · 121 | 130 · 90 · 121 | ✅ idénticos (bloques / tema / materia) |
| Vibecoding | 95 | 95 | ✅ mismo proyecto · tipo · paso `k` en las 95 filas (cambian los textos con fechas) |
| SYNAPSE | 132 días | 131 días | ✅ mismas **110** lecciones A/B/C y **19** PC; el plan cuenta días naturales y arranca en lunes → 1 bloque «R» menos (el «Domingo libre · taper S19», sin contenido) · el «AVANCE S1» del sáb 24-oct ya no existe (S1 entra entera lun 26 → vie 30, SHIP sáb 31-oct) y aparece un «AVANCE S9» (sáb 26-dic) |

## 3. USMLE (`node DATA/_scripts/usmle/verificar_v6.js`: **43 líneas ✓, 0 ✗**, exit 0 · 6,8 s)

- El `.ts` contiene exactamente la salida de `gen_usmle_v5.js` · **V2** `DIAS_T2` = `ref_v6/gen_tramo2_ref.js` y = `ref_v6/tramo2_14mar_25oct_v605.json` (182 filas, 0
  diferencias) · **V2+** port = referencia en 21 escenarios con `--f1-filas 47` y compatibilidad v6.00 (58), v6.01 (57), v6.02 (52), v6.03 (50) y v6.04 (50, examen
  25-oct) byte a byte · **V2b** uWorld FRESCO 1.520 + 1.830 = **3.350** ≤ 3.659 (margen 309; 0 filas de reactivación/colchón/reentrada con uWorld fresco).
- **V3** 229 fechas = `esDiaPlan(iso,'usmle')`, 0 en SKIP/protegidos/domingo, sábados 25 (todos ≥ 3-may), ritual = única fila en protegido.
- **F1:** `origenF1` = `colocarF1(47)` · D47 ← v5.20 D55 · los 5 hitos en F1 (UWSA1 D1 lun 26-oct · NBME 25 D10 vie 6-nov · 26 D25 vie 27-nov · 27 D40 vie
  18-dic · 28 D47 mié 30-dic) · gates D18 mié 18-nov · D38 mié 16-dic · desplazadas D47 → T3 jue 18-mar … D79 → T13 lun 5-abr con «era v5.20 D#» · `nivelUW` /
  `qDia` ≠ v5.20 por el día de la semana en 7 filas (D8 D13 D15 D20 D28 D33 D35).
- **API:** `diaPrevio(T1)` = D46 · `ventana7d(45)` = 45, 46, 47, 101, 102, 103, 104 · «Día 1/47» · «T158/182» · `estadoUSMLE` 31-dic → 15-mar PAUSA, desde el dom 24-oct
  FIN · `USMLE_TAPER` D94 T180 jue 21-oct · D95 T181 vie 22-oct · ritual T182 · `esViernesNivel4` = T12 vie 2-abr y T17 vie 9-abr · 14 `diaInicio` válidos.
- **Inducción del SERUMS** (control nuevo): 12 filas lun 3 → sáb 15-may = 15,75 h, cada fila partida = 1,3125 h; contenido en 4 = 2 de deep prime + 2 de
  consolidación · 41 unidades partidas.
- **Guía:** la cola de vídeo del cierre de F1 se ve entera en fechas del tramo 2 (04-07 ANS → T4 vie 19-mar / T5 lun 22-mar; Palmerton Neuro Part 2 →
  T5 / T6 mar 23-mar) y la cola al cierre de la guía está vacía · las 11 desplazadas tienen guía en su T (7 franjas, Σ pasos = franja) · **82 fechas** (17 del
  tramo 2) · `obsidianMap` 74 claves (bioestadística = T13 d 113).
- **Textos:** 0 restos de la F1 v6.03/v6.04 (D1 mié 21-oct, jue 22 = UWSA1, D1-D50, «Día n/50», NBME 28 = D50, NBME en martes, gates vie 13-nov / vie 11-dic,
  colchón «48 filas ≈ 126 h», T3-T10, «/43») fuera de bitácora en los ficheros USMLE de `src/lib`.
- Extra (node): tramo 2 por tipo = contenido 34 · refuerzo 8 · reactivación 34 · **colchón 42 (110,25 h; 21 sábados; bloque T90-T114 jue 8-jul → jue 5-ago)** ·
  uw_random 14 · incorrectas 18 · consolidación 10 · taper 5 · day_after 7 · hitos 8 · reentrada 1 · ritual 1; horas-plan 566,625 h (= v6.04) · F1 N1 16 · N2 23 ·
  N3 3 · N5 5 (2.480 Q) · `ref_v6/v1_check.js` exit 0.

## 4. Simulación de la app y generadores

| Qué | Resultado | Evidencia |
|---|---|---|
| Simulación día a día del Home (réplica de `TodayMission.contenidoBloquePlan` sobre `plantillaDelDia`; en F4 con turnos M · T · T 12:00 · T 14:00 · L · G) | ✅ 0 errores reales | **1.248 días × variantes, 19-oct-2026 → 31-oct-2027**: 0 bloques de plan sin contenido · 0 guías fuera de su bloque · 0 guías solapadas · 4 solapes clasificados: **1 por diseño** (lun 26-oct: el bloque principal 07:15-12:00 contiene el SYNAPSE 07:25-07:55 del día del UWSA1; manda la guía) y **3 fuera de ámbito** (vie 8-oct-2027, ensayo de 7 bloques 07:00-16:30 con un turno T marcado: lo parte el motor de hitos, decisión (C) de la v6.04). El script sale con 1 solo por esa clasificación |
| Días clave | ✅ | lun 26-oct: 04:15 vibecoding · 05:00 Anki · 07:15 bloque principal (UWSA1 08:50-13:00) · 07:25 SYNAPSE · 13:00 Business · 13:30 R↔D · 14:15 AURUM · 15:15 MIR · 16:15 ENCAPS · 17:15 LIVIANO · 18:00 eval · vie 6-nov (NBME 25): sin Business, SYNAPSE 13:00 · vie 26-feb (SIM 100Q 11:00): SYNAPSE 13:00 · F4 ago-oct: R↔D «ciclo cerrado, mantenimiento» con contenido definido |
| Revisión semanal | ✅ | `semanaStep1`: lun 26-oct = S1/42 (UWSA1) · sáb 5-dic S6 deload · sáb 2-ene S10 deload · sáb 20-mar S11/42 (NBME 29) · sáb 23-oct S42/42 · lun 25-oct = semana «examen» · `revisionFicheroDe`: `S01_2026-10-31.md` · `S02_2026-11-07.md` · `S10_2027-01-02.md` · `S21_2027-03-20.md` · `S52_2027-10-23.md` |
| `check_rutina_guia.js` | ✅ 0 errores | Σ pasos = franja en todos los bloques; cobertura de los 7 planes (vibecoding 95 · SYNAPSE 92 · Business 97 · AURUM 130 · LIVIANO 90 · revisión 27 · SHIP + SYNAPSE sáb 18 · Feynman dom 12; 17-oct-2026 → 4-may-2027); mismo aviso del vie 8-oct-2027 |
| Generadores `--check` | ✅ todos al día | `gen_usmle_guia` (82 fechas · 372 bloques) · `gen_encaps_guia` (47 sesiones · 7 con runner) · `gen_derma_guia` (412 bloques) · `gen_mir_guia` (890 bloques; D1-D76 medidos lun 26-oct → jue 11-feb) · `gen_research_calendar` (12/12 «nada») · `sync_encaps_bp_web` (11 runners = origen) |
| Tipos | ✅ | `npx tsc --noEmit` exit 0 |

## 5. Supabase (proyecto `joseph-medicina`, solo `SELECT`, dom 25-oct)

| Qué | Resultado |
|---|---|
| Filas ENCAPS | ✅ **97** (`dia` 1-97): 47 MANTENIMIENTO (lun 26-oct → mié 30-dic; 39 `banqueo1h` + 8 `mini_sim`) + 50 INTENSIVO (lun 4-ene → vie 12-mar) |
| Huellas | ✅ **v2 `40f0428f975e5193448091e4f112c7e9`** · **fila completa `b33c98d771f07533803543157d1725c8`** = las del SQL versionado (`_encaps_mantenimiento_2027.sql` + `_encaps_intensivo_2027.sql`, recalculadas en node con la misma fórmula) |
| `study_metrics.extra` | ✅ `d1` 2026-10-26 · `dias_ciclo` 47 · `intensiva.dias` 48-97 · `corrimiento.version` v6.05 · `pendientes_f1` 13 · `exam_date` 2027-03-14 · régimen «MANTENIMIENTO_2027-1 v6.23 (47 d) + INTENSIVA v6.05 (núcleo 4-ene → 5-mar + cola anclada)» |
| Backups | ✅ `study_schedule_bk_v605_20261024` (100 filas ENCAPS, huella de fila completa `53f686a3…` = estado v6.03/v6.04) · `study_schedule_bk_v605_int_20261024` (100) · `study_metrics_bk_v605_20261024` (`d1` 2026-10-21); los 3 con RLS (y `study_schedule` / `study_metrics` también) |
| Otros | `study_sim_scores` ENCAPS = 0 filas (aún no hay mini-sims registrados) · ⚠ **63 de las 116 tablas de `public` sin RLS** (entre ellas `datos_tesis`, `kappa_piloto`, `chat_logs`, `agent_skills` y 59 backups antiguos) → decisión (k) |

## 6. Deploy (Vercel, `https://joseph-md-app.vercel.app`)

- ✅ Bundle servido `index-13939fe1a07170396f9d9afa0ff5fd8f.js`: `f1:{inicio:"2026-10-26",fin:"2026-12-30",dias:47}`, `version:"v6.05"` en 6 módulos, examen
  2027-10-25, y el arreglo del briefing de `2b86639` («ENCAPS · intensiva (ver plan)» / mini-sim / pre-test por día).
- ✅ Runners ENCAPS: los 11 de la v6.05 responden con su título (`pretest_arranque_2026-10-26` parte 1 · `-10-27` parte 2 · `eval_2026-10-26` fallos previos ·
  `-10-27` II-3 · `-10-28` I-3 · `-10-29` V-2 · `banco_2026-10-28` V-2 · `-10-29` III-5 · `minisim_2026-10-30` · `-11-06` · `-11-13`); los de la v6.03
  (`pretest_arranque_2026-10-21`, `minisim_2026-10-23`) ya no existen (la URL cae en la SPA).
- Nota: el `dist/` local (`index-8182ebdb…`, 21-oct) está desfasado; no se usa (está en `.gitignore` y Vercel construye solo).

## 7. Calendar (`DATA/_v600/cal/CAL_V6.md` §18; en esta pasada no se volvió a leer Google Calendar)

- §18.0: 13 `delete_event` del reparto v6.04a · 5 series recreadas con id nuevo (vibecoding `llhrjvjqmmv06ft0vt94qdn3rk`, SYNAPSE `tfihh2hsim6mll6h5nsjur1ti8`,
  LIVIANO `u7dljk7hf8r81nmofgojhtdilc`, BUSINESS `5gbioj75d3bsgoio1fatrji0ns`, AURUM 30′ `r0n85cd06arqkikrbfra4luonc`) · UWSA1 → lun 26-oct 08:50-13:00.
- §18.1 (C1): 81 `update_event`; verificación con `list_events` 26-oct → 1-nov: **166 comprobaciones, 0 FAIL**; reparados en la misma ronda los títulos de la eval
  18:00 del 19-21 oct que había pisado la propagación del master.
- §18.2 (C2): 42 operaciones; `ver.js` **0 fallos** en 26-oct → 1-nov, vie 6 / sáb 7-nov y mié 30-dic; cruce app ↔ Calendar (`plantillaDelDia` + `bizFranjaDe` +
  `guiaRevisionDe`) **51 OK**; `gen_research_calendar.js --check` exit 0 (vuelto a correr el 25-oct: 12/12 «nada»).

## 8. Daemon ENCAPS (Telegram, fuera del repo)

✅ `D:\agente_estudio\scripts\encaps_telegram_daemon.py` con la bitácora v6.05 (match exacto por fecha, sin `CORRIDA_S1_ENCAPS`; reenvío sin Markdown si
Telegram rechaza el texto; tope de reintentos por día, una fila de `agent_reports` por día) · sintaxis Python OK · copias `.bak_v605_20261024` y
`.bak_v605b_20261024` · proceso activo desde el sáb 24-oct 19:54 (arrancado después del último parche, 19:53).

## 9. Hallazgos corregidos

En la verificación adversarial de la publicación (dentro de `90807a3`) y en `2b86639`:
1. **Inducción del SERUMS:** refuerzo / uw_random / incorrectas / consolidación partidos declaraban 2,625 h en la inducción (26,25 h en las 2 semanas «al 50 %») →
   **1,3125 h** por parte (15,75 h); contenido en 4 partes con deep prime en 1-2 y consolidación en 3-4; uw_random / incorrectas 1×20Q por parte; horas-plan del
   borrador 577 → 567 h; mismo cambio en la referencia; control nuevo en `verificar_v6.js`.
2. SYNAPSE a las 13:00 también en los SIM 100Q de las 11:00 (vie 26-feb, vie 5-mar).
3. AURUM de F4 (D129-D130) en tiempo muerto de la posta.
4. R↔D después de los hitos largos; R↔D de F4 con el ciclo cerrado = mantenimiento con contenido definido (antes, vacío).
5. F5 sin bloque MIR vacío (desde el sáb 30-oct-2027, solo con sesión).
6. Comodines y PC de sábado; avisos ENCAPS solo en días de plan.
7. Briefing «TODAY AT A GLANCE»: mostraba el texto fijo «ENCAPS · tema del cronograma» también en los días sin sesión → sesión ENCAPS real del día o `null`.

En esta pasada de documentación: `DATA/_v600/V6_ESPEC.md`, `DATA/REESTRUCTURACION_31AGO_2026.md`, `DATA/PENDIENTES_JOSEPH.md`, `DATA/USMLE/README.md` y
`DATA/MIR/README.md` ya no presentan como vigente ninguna versión anterior a la v6.05 (la v6.04b del examen se cita como «sigue»).

## 10. Hallazgos abiertos

- **P1 · Decisiones de Joseph (a)-(k)** → `DATA/PENDIENTES_JOSEPH.md`, bloque v6.05 (AURUM PITCH v7 y D48-D50, M3/CADI, carril B sin holgura + stock ENCAPS, DJ-1
  con ENCAPS 18-abr, M1 del vie 30-oct, 4 repuestas MIR, mapeos USMLE nuevos, R↔D ago-oct 2027, C47/C48 a 30Q, credenciales del repo).
- **P2 · Seguridad (urgente, (k)):** `.claude/settings.local.json` está versionado en un repo público (4 commits) con 2 JWT (1 anon key de `joseph-medicina`, 1 sin
  claim de rol) y 63 tablas de `public` sin RLS.
- **P3 · Stock ENCAPS:** sin la tanda 0 antes del vie 30-oct, II-10 rompe el lun 2-nov, II-EMG el mié 4-nov e I-OCC / II-4 el jue 5-nov; sin reponer, ningún
  mini-sim desde el vie 20-nov llega a 25Q (`DATA/ENCAPS/RUNBOOK_SEMANA2_2026-10-26.md` §4).
- **P4 · Calendar (baja prioridad, `CAL_V6.md` §18):** títulos «⏭ SIN SESIÓN (v6.05 …)» de días pasados (19-23 oct) en varias series · el cierre Business 15′
  de los sábados normales nunca tuvo evento · el mini-sim de reposición del mié 10-mar va en la instancia de la serie (sin overlay propio) · excepciones de 2027
  de las series F2 cuyo master cambió no auditadas.
- **P5 · Ensayo de 7 bloques con turno T** (vie 8-oct-2027): la simulación lo marca; lo resuelve la regla de partirlo (decisión (C) de la v6.04).
- **P6 · Texto de la orden en datos:** la `regla` v6.05 de `_fechas_v6.json` (y de `study_metrics.extra.corrimiento`) cita «no quites temas **especiales**»; la
  orden literal de Joseph (CAL_V6 §18, mensaje del commit) es «no quites temas». Cosmético; se corrige en la próxima regeneración.
- **P7 · Comentario desfasado:** la cabecera de `DATA/_scripts/gen_research_calendar.js` (bloque v6.05) decía en `HEAD` «R9 pasa tras la pausa»; el plan
  desplaza **M3** (mié 17-feb) y R9 se queda el vie 13-nov. Solo comentario; ya corregido en el árbol de trabajo del 25-oct (pendiente de commit).
- **P8 · Backup del SQL suelto:** `_encaps_mantenimiento_2027.sql` crea `study_schedule_bk_v605_mant_20261024` si se ejecuta solo; la siembra real (una
  transacción) usó `study_schedule_bk_v605_20261024`, y la tabla `_mant` no existe en vivo. No regenerar desde el SQL suelto sin cambiar `--bk`.
- **P9 · Docs fuera de este ámbito sin marca v6.05** en el árbol de trabajo del dom 25-oct (siguen diciendo v6.04, v6.02 o v6.00 «VIGENTE», o no citan la
  v6.05): `DATA/ROADMAP_MAESTRO_2026-2034.md` · `DATA/ENCAPS/AUDITORIA_AGENTE_ESTUDIO_2026-07-02.md` · `DATA/ENCAPS/PRETEST_2026-II.md` ·
  `DATA/ENCAPS/SENALES_2027-I.md` · `DATA/USMLE/CALENDARIO_5_MESES.md` · `DATA/_v600/README.md` · `DATA/RESEARCH/README.md` · `DATA/PROTOCOLO_MODO_MINIMO.md`
  (`DATA/ENCAPS/CALENDAR_SEGMENTOS_V5_6.md`, `FASE_INTENSIVA_2027-I.md`, `RUTINA_EXTREMA_MILITARIZADA.md` y `PROTOCOLO_HORA_MANTENIMIENTO.md` se estaban
  actualizando en paralelo, sin commit).
- **P10 · Sin cambio desde v6.03:** `MINIMOS` de la revisión semanal sin alinear con V6_ESPEC (v6.03 (14)); NBME 28 sin Day-After (v6.03 (7)); el % del NBME 28 en
  Neuro y Heme/Onco no es comparable con planes anteriores (Neuro 4 de 8, Heme 0 de 6 al 30-dic).
