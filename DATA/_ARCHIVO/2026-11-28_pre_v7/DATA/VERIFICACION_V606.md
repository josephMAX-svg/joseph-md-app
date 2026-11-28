# Verificación v6.06 · TODO COMIENZA EL LUN 2-NOV-2026 (sáb 31-oct-2026)

Ámbito: comprobar que lo publicado en la v6.06 (commits `2e3a35d`, `c94fde6`, `d5f74d5`; deploy de Vercel; Supabase; daemon ENCAPS; Calendar) hace lo que
ordenó Joseph el sáb 31-oct: *«Reestructura todo a partir del 2 de noviembre … corre nada más, corre también las fechas límite, corre con una semana nada más:
lo que era la semana anterior, esta semana; no hay necesidad de reestructurar; para no perder materias, tan solamente corre. Todo comienza el 2 de
noviembre.»* Régimen verificado: v6.06 (D1 = lun 2-nov-2026; F1 de 42; examen Step 1 lun 25-oct-2027; ENCAPS dom 14-mar-2027). Todo en **solo lectura**: node
sobre los `.ts` de `src/lib` (transpilados en memoria con el TypeScript del repo, el mismo método que `DATA/_scripts/usmle/cargar_ts.js`), el SQL versionado,
las referencias `ref_v6/`, `git archive regimen-v6.05 src/lib` como base de comparación, `SELECT` sobre Supabase, `GET` sobre el deploy y una lectura
(`list_events`) del Calendar. No se escribió nada en Supabase, Calendar, Vercel ni en el código. Cifras y fechas con su día de la semana, recalculadas el sáb
31-oct; el detalle del régimen está en `DATA/REESTRUCTURACION_31AGO_2026.md` §30 y en `DATA/_v600/V6_ESPEC.md` (ADDENDUM v6.06).

## 1. Fechas y régimen

| Qué | Resultado | Evidencia |
|---|---|---|
| Fuente única de fechas | ✅ `_fechas_v6.json` **v6.06** = derivado | `node DATA/_scripts/gen_fechas_v6.js --check --calculo` → exit 0: «guardado = derivado» (reinicio mar 16-mar · GO/NO-GO lun 6-sep · ritual sáb 23-oct · viaje dom 24-oct · inducción → dom 16-may · convocatoria tope mié 17-feb · 7 protegidos) · `fechasV6.ts` = `gen_fechas_v6.js`: **0 diferencias** (2026-09-01 → 2028-01-31 · 8 ENCAPS × 2 SERUMS × 3 exámenes) · fases: F1 lun 2-nov → mié 30-dic (42) · F2 lun 4-ene → dom 14-mar (50) · F3 mar 16-mar → vie 30-abr (32) · F4 lun 3-may → sáb 23-oct (150) · F5 desde mar 26-oct · `STEP1_SEMANAS` 41 (F1 9) · `corrimientos[4]` v6.06 con `perdidos` lun 26 → vie 30-oct |
| `corrida_s1` | ✅ solo `sin_sesion` lun 19-oct → dom 1-nov; `alias` y `reparto` vacíos | `estadoUSMLE` 26-oct, 30-oct y 1-nov = D1~ (sin «HOY» antes del D1) · lun 2-nov = D1 exacto · `gen_revision_semanal.js --dry-run` del sáb 31-oct: «sin revisión semanal — semana corrida v6.06 … la 1.ª revisión con plan es `S01_2026-11-07.md`» |
| DJ-1 (regla de cálculo de V6_ESPEC §B4.4) | ⚠ aviso | cálculo = DJ-1 (25-oct) con piso al D-1 **14-mar +164 h · 21-mar +137 · 4-abr +93** (déficit 0) · **11-abr: piso +65 h, déficit 2 u → ninguna ≤ 25-oct** · 18-abr: +38 h, déficit 7 u · 25-abr: +10 h, déficit 12 u → «AVISAR A JOSEPH» (decisión (c) de `DATA/PENDIENTES_JOSEPH.md` v6.06); el script sale con 0 porque la DJ-1 del JSON manda |
| Colchón de horas al D-1 · GO/NO-GO por horas | ✅ sin cambio | `DATA/_v600/espec/b_horas.js`: 14-mar → 25-oct PISO +164 h (21-mar +137 · 4-abr +93 · 11-abr +65); cuentan desde el reinicio, no dependen de la F1 |

## 2. Conservación de contenido por plan («para no perder materias, tan solamente corre») — v6.05 (`git archive regimen-v6.05 src/lib`) frente a HEAD

| Plan | v6.05 | v6.06 | Resultado |
|---|---|---|---|
| USMLE · unidades de temario v5.20 (F1 + contenido del tramo 2; una por unidad, por `system` + `sub` v5.20) | 73 | 73 | ✅ multiset idéntico; las 16 de F1 que no caben están en T3-T18 con su `dOrig` · `verificar_v6.js` V1: «claves con diferencia 0 · temario F1 42 (D1-D41 + D55) · desplazadas D42-D54, D56, D57, D79 · dOrig únicos 53/53 · sub sin texto v5.20 0» |
| USMLE · hitos | 5 F1 + 8 tramo 2 | 5 F1 + 8 tramo 2 | ✅ `hitosDelPlan()` = D1 D10 D25 **D35** **D42** T2 T51 T82 T129 T135 T142 T159 T169; los 8 de 2027 en la misma fecha; fechas de las 182 filas T, taper, ritual, day_after y reentrada idénticas |
| USMLE · tramo 2 por tipo | contenido 34 · refuerzo 8 · colchón 42 | contenido 48 · refuerzo 4 · colchón 32 | ✅ esperado: +5 unidades de contenido (14 filas) y refuerzo en ½ en vez de ¼ (−4) → −10 de colchón; reactivación 34 · uw_random 14 · incorrectas 18 · consolidación 10 · taper 5 · day_after 7 · hitos 8 · reentrada 1 · ritual 1 (=) · horas-plan 566,625 h (=) · colchón 110,25 → 84 h |
| ENCAPS · F1 + pendientes F1 | 47 + 13 = 60 | 42 + 13 + **5 (carril SÁBADO)** = 60 | ✅ multiset (código · sub_eje · instancia; mini-sim por cola larga) idéntico: 49 `banqueo1h` + 11 `mini_sim` = la F1 v6.00 entera; la única diferencia es la etiqueta «· CHECKPOINT DEL AÑO», que pasa del mini-sim II-9 + II-7 (v6.05, ahora sáb 6-feb) al III-1 + III-9 (v6.06, vie 18-dic) |
| ENCAPS · carril B (`banqueo1h` v5.20, `dia_mant` 61-92) | 26 | 26 | ✅ idénticos (código · `dia_mant`) |
| ENCAPS · intensiva | 50 filas | 50 filas | ✅ idénticas en fecha · tipo · código · subtema (solo cambia la numeración `dia` 48-97 → 43-92) |
| MIR · diario | 78 | 78 | ✅ mismos capítulos (asignatura · capId · tema) |
| MIR · banqueo | 203 | 203 | ✅ por tipo (=) · foco por asignatura de las 144 filas lun-jue (=) · Tier C 36 (multiset =) · 5.370 Q (=); cambian solo las asignaturas de los viernes y sábados («peor del log» / interleaving), que dependen de la posición semanal · 9 sesiones caen tras el examen (`repuesta: 'v6.06'`, d195-d203) |
| Research | 42 + 67 = 109 | 42 + 67 = 109 | ✅ mismos códigos de átomo |
| Derma | 73 + 30 = 103 | 73 + 30 = 103 | ✅ ciclo 1 idéntico (bloque · bKey · tier · casos) · los 200 casos de las 103 sesiones, idénticos (multiset; 36 en el ciclo 2) · en el ciclo 2 la etiqueta de sesión depende del día de la semana (G+k enriquecimiento cae en lunes): «casos restantes» 7 → 6 y «segunda pasada FSRS» 11 → 12, sin caso perdido |
| AURUM · LIVIANO · Business | 130 · 90 · 121 | 130 · 90 · 121 | ✅ idénticos (título / tema / materia) |
| Vibecoding | 95 | 95 | ✅ mismo proyecto · tipo · paso `k` en las 95 filas |
| SYNAPSE | 131 días | 135 días | ✅ mismas **273** lecciones con material propio y **19** PC (110 A · 110 B · 110 C por etiqueta, =); los 57 bloques de relleno genérico (B «comodín de audio / siguiente vídeo», C «siguiente artículo») rotan por posición; +4 bloques «R» = los protegidos del ENCAPS vie 12 → lun 15-mar, que no son días de plan |

## 3. USMLE (`node DATA/_scripts/usmle/verificar_v6.js`: **47 líneas ✓, 0 ✗**, exit 0)

- El `.ts` contiene exactamente la salida de `gen_usmle_v5.js` · **V2** `DIAS_T2` = `ref_v6/gen_tramo2_ref.js` y = `ref_v6/tramo2_14mar_25oct_v606.json` (182 filas, 0
  diferencias) · **V2+** port = referencia en 21 escenarios con `--f1-filas 42` y compatibilidad v6.00 (58), v6.01 (57), v6.02 (52), v6.03 (50), v6.04 (50, examen
  25-oct) y v6.05 (47) byte a byte · **V2b** uWorld FRESCO 1.340 + 1.960 = **3.300** ≤ 3.659 (margen 359; 0 filas de reactivación/colchón/reentrada con uWorld fresco).
- **V3** 224 fechas = `esDiaPlan(iso,'usmle')`, 0 en SKIP/protegidos/domingo/sábado pre-SERUMS, sábados 25 (todos ≥ 3-may), ritual = única fila en protegido.
- **F1:** `origenF1` = `colocarF1(42)` (D35 ← v5.20 D40 · D36-D40 ← v5.20 D35-D39 · D42 ← v5.20 D55) · D1-D42 = contenido v5.20 de su origen · los 5 hitos en F1 (UWSA1
  D1 lun 2-nov · NBME 25 D10 vie 13-nov · 26 D25 vie 4-dic · 27 D35 vie 18-dic · 28 D42 mié 30-dic) · gates D18 mié 25-nov · D38 mié 23-dic · desplazadas D42 → T3
  jue 18-mar … D79 → T18 lun 12-abr con «era v5.20 D#» · `nivelUW` / `qDia` ≠ v5.20 por el día de la semana en 6 filas (D8 D13 D15 D20 D28 D33).
- **Control nuevo «Day-After completo»:** ningún Day-After de hito (4 filas) pisa el hito siguiente; adelantos por semanas de plan (5 filas), los mínimos · NBME 27
  v5.20 D40: slot 40 (lun 28-dic) → D35 vie 18-dic · Day-After D36-D39 (lun 21 → jue 24-dic) antes del D42.
- **Control nuevo «16:15 REENTRADA»:** la 16:15 no rota a un sistema aún no estudiado · 30 filas F3 · 7 sistemas de F1 (Cardiovascular, Respiratory, Renal,
  Gastrointestinal, Endocrine, Fundamentos, Immunology) · Nervous System: última fila T11 → entra T15 mié 7-abr · Hematology & Oncology: última fila T17 → entra T24
  mar 20-abr · T1 = 7 sistemas.
- **API:** `diaPrevio(T1)` = D41 (salta el NBME 28) · `ventana7d(40)` = 40, 41, 42, 101, 102, 103, 104 · «Día 1/42» · «T158/182» · `estadoUSMLE` 31-dic → 15-mar
  PAUSA, desde el dom 24-oct FIN · `USMLE_TAPER` D94 T180 jue 21-oct · D95 T181 vie 22-oct · ritual T182 · `esViernesNivel4` = T17 vie 9-abr y T22 vie 16-abr · 14
  `diaInicio` válidos (Nervous 104 · Heme 112 · Psych 118 · Micro 119 · Repro 126 · MSK 131 · Bioq/Pharm 147).
- **Inducción del SERUMS:** 12 filas lun 3 → sáb 15-may = 15,75 h, cada fila partida = 1,3125 h; contenido en 4 = 2 de pre-test + deep prime + 2 de consolidación ·
  46 unidades partidas.
- **Guía:** la cola de vídeo del cierre de F1 se ve entera en fechas del tramo 2 (B&B Adrenals 06 CAH y Pancreas 06 → T4 vie 19-mar 07:15; Palmerton «High Yield
  Endocrinology» → T4 07:15 + 09:00 + T5 lun 22-mar 07:15) y la cola al cierre de la guía está vacía · las 16 desplazadas tienen guía en su T (7 franjas, Σ pasos =
  franja) · **80 fechas** (22 del tramo 2: T2-T18 + cola T19-T23) · `obsidianMap` 83 claves (bioestadística = T18 d 118).
- **Textos:** 0 restos de la F1 v6.05 (D1 lun 26-oct, D1-D47, «Día n/47», NBME 28 = D47, NBME 25 vie 6-nov / 26 vie 27-nov, NBME 27 = D40, gates mié 18-nov /
  mié 16-dic, colchón «42 filas ≈ 110 h», T3-T13, «S n/42») fuera de bitácora en los ficheros USMLE de `src/lib`; el aviso del borrador (restos en `homeBriefing.ts`
  y `CockpitStatusBar.tsx`) ya no sale.
- Extra (node): tramo 2 por tipo = contenido 48 (36 unidades; el contenido v5.20 termina en T53 mié 26-may) · refuerzo 4 · reactivación 34 (T59 mié 2-jun → T101
  mié 21-jul) · **colchón 32 (84 h; 21 sábados; bloque T102-T114 jue 22-jul → jue 5-ago)** · uw_random 14 · incorrectas 18 · consolidación 10 · taper 5 · day_after
  7 · hitos 8 · reentrada 1 · ritual 1; horas-plan 566,625 h (= v6.05) · F1 N1 14 · N2 21 · N3 2 · N5 5 (2.300 Q) · `ref_v6/v1_check.js` exit 0 (53/53 `dOrig`).

## 4. Simulación de la app y generadores

| Qué | Resultado | Evidencia |
|---|---|---|
| Simulación día a día del Home (réplica de `TodayMission.contenidoBloquePlan` sobre `plantillaDelDia`; en F4 con turnos M · T · T 12:00 · T 14:00 · L · G) | ✅ 0 errores reales | **1.255 días × variantes, lun 19-oct-2026 → dom 7-nov-2027** (hasta la última repuesta MIR): 0 bloques de plan sin contenido · 0 guías fuera de su bloque · 0 guías solapadas · 4 solapes clasificados: **1 por diseño** (lun 2-nov: el bloque principal 07:15-12:00 contiene el SYNAPSE 07:25-07:55 del día del UWSA1; manda la guía) y **3 fuera de ámbito** (vie 8-oct-2027, ensayo de 7 bloques 07:00-16:30 con un turno T marcado: lo parte el motor de hitos, decisión (C) de la v6.04). El script sale con 1 solo por esa clasificación |
| Carril SÁBADO en la app | ✅ | `plantillaDelDia` de los sáb 9, 16, 23, 30-ene y 6-feb (plantilla F2-sáb) trae el bloque «09:30–10:30 ENCAPS · CARRIL SÁBADO · REPOSICIÓN F1 (III-5 · II-5 · I-4 · IV-1 · mini-sim 25Q)» con su guía (`guiaEncapsSabadoDe`, 09:30–10:30); sáb 13-feb sin bloque ni guía · `encapsPlan`: `STUDY_D1` 2026-11-02 · `STUDY_TOTAL_DAYS` 42 · `CARRIL_B_REPOSICION_LABEL` «dia 43-74» · sesión ENCAPS del lun 2-nov = dia 1, pre-test, II-3, con su runner |
| Días clave | ✅ | lun 2-nov: SYNAPSE **07:25–07:55** con aviso «Hoy UWSA1 (08:50-13:00)» · vie 6-nov: SYNAPSE 12:30, Business 13:00-13:25 · vie 13-nov / 4-dic / 18-dic / mié 30-dic (NBME): SYNAPSE 13:00–13:30; Business del viernes = null → sáb 14-nov 07:45-08:25 (OUTPUT entero); mié 30-dic 12:30-12:55 · vie 26-feb y vie 5-mar (SIM 100Q 11:00) y jue 11-mar (DRESS): SYNAPSE 13:00 · sáb 27-feb: Business 09:15-09:55 · SHIP S1 sáb 7-nov · SHIP S6 (RLS) sáb 12-dic |
| Revisión semanal | ✅ | `gen_revision_semanal.js <fecha> --dry-run`: sáb 7-nov S1/41 (UWSA1) · 14-nov S2/41 (NBME 25) · 28-nov S4/41 · 5-dic S5/41 (NBME 26) · **12-dic S6/41 DELOAD** · 19-dic S7/41 (NBME 27) · **2-ene S9/41 DELOAD (NBME 28)** · 9-ene / 30-ene / 13-mar «PAUSA · ENCAPS» · **20-mar S10/41** (NBME 29) · **23-oct S41/41** · 30-oct «examen» |
| `check_rutina_guia.js` | ✅ 0 errores | Σ pasos = franja en todos los bloques; cobertura de los 7 planes (vibecoding 95 · SYNAPSE 92 · Business 96 · AURUM 130 · LIVIANO 90 · revisión 27 · SHIP + SYNAPSE sáb 18 · Feynman dom 12; 17-oct-2026 → 11-may-2027); mismo aviso del vie 8-oct-2027 |
| Generadores `--check` | ✅ todos al día | `gen_usmle_guia` (80 fechas · 375 bloques) · `gen_encaps_guia` (42 sesiones · 7 con runner · carril SÁBADO 5 guías) · `gen_derma_guia` (412 bloques) · `gen_mir_guia` (890 bloques; D1-D76 medidos lun 2-nov → jue 18-feb) · `gen_research_calendar` (12/12 «nada») · `sync_encaps_bp_web` (11 runners = origen) |
| Tipos | ✅ | `npx tsc --noEmit` exit 0 |

## 5. Supabase (proyecto `joseph-medicina`, solo `SELECT`, sáb 31-oct)

| Qué | Resultado |
|---|---|
| Filas ENCAPS | ✅ **92** (`dia` 1-92, 2026-11-02 → 2027-03-12): 42 MANTENIMIENTO (35 `banqueo1h` + 7 `mini_sim`) + 50 INTENSIVO · 5 filas con `extra.carril_sabado` (los viernes host) |
| Huellas | ✅ **v2 `826383f65e0e5f127056529140e643f6`** · **fila completa `1b953f1f50bbe36e37a014a368665285`** = las del SQL versionado (`_encaps_mantenimiento_2027.sql` + `_encaps_intensivo_2027.sql`, recalculadas en node con la misma fórmula) |
| `study_metrics.extra` | ✅ `d1` 2026-11-02 · `dias_ciclo` 42 · `intensiva.dias` 43-92 · `corrimiento.version` v6.06 · `pendientes_f1` 18 (13 lun-jue + 5 del sábado) · `exam_date` 2027-03-14 · régimen «MANTENIMIENTO_2027-1 v6.24 (42 d) + INTENSIVA v6.06 (núcleo 4-ene → 5-mar + cola anclada)» |
| Backups | ✅ `study_schedule_bk_v606_20261031` (97 filas ENCAPS, huella de fila completa `b33c98d7…` = estado v6.05) · `study_schedule_bk_v606_int_20261031` (97) · `study_metrics_bk_v606_20261031` (`d1` 2026-10-26); los 3 con RLS |
| Otros | `study_sim_scores` ENCAPS = 0 filas (aún no hay mini-sims registrados) · ⚠ **63 de las 119 tablas de `public` sin RLS** (entre ellas `datos_tesis`, `kappa_piloto`, `chat_logs`, `agent_skills` y backups antiguos) → decisión (j) |

## 6. Deploy (Vercel, `https://joseph-md-app.vercel.app`)

- ✅ Bundle servido el sáb 31-oct 16:12 UTC: `_expo/static/js/web/index-28a24fb73a37c564b42539daf608e21f.js` (el orquestador había verificado `index-ee90272c…` tras
  `c94fde6`; el de ahora es un build posterior a esa comprobación): `f1:{inicio:"2026-11-02",fin:"2026-12-30",dias:42}`, `version:"v6.06"` en 6 módulos, examen
  2027-10-25, el carril SÁBADO y el arreglo de `c94fde6` (la franja `08:50-13:00` del aviso del UWSA1).
- ✅ Runners ENCAPS: los 11 de la v6.06 responden con su título (`pretest_arranque_2026-11-02` parte 1 · `-11-03` parte 2 · `eval_2026-11-02` fallos previos … `-11-05`
  V-2 · `banco_2026-11-04` V-2 · `-11-05` III-5 · `minisim_2026-11-06` · `-11-13` · `-11-20`); los de la v6.05 (`pretest_arranque_2026-10-26`, `minisim_2026-10-30`)
  ya no existen (la URL cae en la SPA).

## 7. Calendar (`DATA/_v600/cal/CAL_V6.md` §19 + una lectura `list_events`)

- §19.0 (orquestador): 10 cambios (REVISIÓN / PC del sáb 31 y PC / ANKI del dom 1-nov «⏭ SIN SESIÓN» · víspera suave · UWSA1 `o1gla7846uae4tgngvc4q45osg` → lun 2-nov
  08:50-13:00 · SYNAPSE 07:25 y ALMUERZO 13:00 el lun 2).
- §19.1 (C1): **87 escrituras** (82 `update_event` + 5 `create_event` del CARRIL SÁBADO); verificación con `list_events`: **81 comprobaciones OK** en 31-oct → 8-nov y
  **541 OK** en 9-nov → 31-dic, **0 FAIL**; F2 y hitos de 2027 comprobados con la respuesta de cada escritura.
- §19.2 (C2): 58 operaciones (6 `create_event` + 6 `delete_event` + 46 `update_event`): **6 series recreadas con id nuevo** (vibecoding `b2qgtck9gai5cilr8qvbkd51t8`,
  SYNAPSE `n8641e63c3msrkbaq3mqdtbmj0`, LIVIANO `bajf6riq56ns5u57b5lqqtb268`, BUSINESS `0h8emvdchmvh4sfddqqed3th8s`, PC sábado `nsdnhm11ceicjmqvqc3qenin00`, PC domingo
  `fvbccognpru6jh6u4g8qhnud7g`) · 12 overlays 🔬; `ver.js` **0 fallos** en 31-oct → 8-nov, 13/14-nov, 30-dic y 26/27-feb; `gen_research_calendar.js --check` exit 0
  (vuelto a correr el sáb 31-oct: 12/12 «nada»).
- Lectura propia (sáb 31-oct, `list_events` lun 2-nov 08:00-13:30, texto «UWSA1»): el evento `o1gla7846uae4tgngvc4q45osg` «🎯 UWSA1 — BASELINE Step 1 (160Q · 4 bloques)
  · v6.06» está el **lun 2-nov 08:50-13:00** con la descripción v6.06 (preparación 07:15-08:50, SYNAPSE 07:25-07:55, Day-After lun 2 → jue 5-nov, pre-test ENCAPS 1/2 a
  las 16:15); las series USMLE de 07:15 y 08:15 de ese día llevan «· v6.06» y el régimen v6.06 en la descripción.

## 8. Daemon ENCAPS (Telegram, fuera del repo)

✅ `D:\agente_estudio\scripts\encaps_telegram_daemon.py` con la bitácora v6.06 + fix (match por fecha sin cambio; reporte del CARRIL SÁBADO buscando la fila con
`extra->carril_sabado->>fecha` = hoy; «_» escapado en el filtro PostgREST y en el Markdown; el viernes host ya no cuenta las claves `s_*`) · sintaxis Python OK
(`py_compile`) · copias `.bak_v606_20261031` y `.bak_v606b_20261031` · proceso activo desde el sáb 31-oct 09:59:32 (arrancado después del último parche, 09:58).

## 9. Hallazgos corregidos

En la verificación de la publicación (dentro de `2e3a35d`) y en `c94fde6`:
1. **16:15 REENTRADA de F3:** la rotación fija de los 9 sistemas habría pedido 20Q timed de Nervous System (T8) y de Hematology & Oncology (T9) antes de estudiarlos
   (la F1 v6.06 tiene 7 sistemas) → rotación real con entrada de cada desplazado tras su última fila T (Neuro T15, Heme T24); `--rotacion-9` para las referencias
   v6.03-v6.05; control nuevo en `verificar_v6.js`.
2. **Hitos de F1:** con la regla v6.02 sola, el Day-After del NBME 27 (slot 40) pisaba el NBME 28 → regla «Day-After completo» (`slotsHitosF1`), con control propio.
3. Restos de textos de la F1 v6.05 en `homeBriefing.ts` y `CockpitStatusBar.tsx` (aviso de `verificar_v6.js` en el borrador): corregidos.
4. Research: el ciclo 1 ya no cabía con el nivel 1 de la regla → nivel 2 (cola de una cadena de envío sin plazo externo) y marcadores `{{F:code}}` / `{{D:code}}`
   resueltos tras el fechado (los textos con fecha dejan de pudrirse en cada corrimiento).
5. `cargar_ts.js` con `stubs` (para cargar en node módulos de la app que importan react / supabase en el control del carril SÁBADO).
6. Totales del viernes host sin las tareas del sábado (`encapsPlan.itemsDelTotal`) y daemon con el Markdown escapado en el reporte del sábado.
7. **`c94fde6`:** el aviso AURUM del día del UWSA1 usaba el «09:00-13:00» heredado del `sub` v5.20 → hora de la guía (08:50-13:00).

En esta pasada de documentación: `DATA/_v600/V6_ESPEC.md`, `DATA/REESTRUCTURACION_31AGO_2026.md`, `DATA/PENDIENTES_JOSEPH.md`, `DATA/USMLE/README.md`,
`DATA/MIR/README.md` y `DATA/REVISION_SEMANAL.md` ya no presentan como vigente ninguna versión anterior a la v6.06 (la v6.04b del examen se cita como «sigue»).
En `DATA/REVISION_SEMANAL.md` se precisó la nota de la S13 (sáb 30-ene = 1.ª semana del taper del vibecoding, S13 jue 28-ene → mié 3-feb).

## 10. Hallazgos abiertos

- **P1 · Decisiones de Joseph (a)-(j)** → `DATA/PENDIENTES_JOSEPH.md`, bloque v6.06 (carril SÁBADO ENCAPS, NBME 27 del vie 18-dic, colchón 32 + DJ-1 desde el 11-abr,
  AURUM en el SERUMS / D43-D47 / PITCH v2, SYNAPSE y vibecoding en F3, 9 repuestas MIR + (F), Research M1 vencido + nivel 2, stock ENCAPS, recortes heredados de las
  reglas de fase, seguridad del repo).
- **P2 · Seguridad (urgente, (j)):** `.claude/settings.local.json` sigue versionado en un repo público (4 commits) con 2 JWT distintos (1 anon key de `joseph-medicina`,
  1 sin claim de rol) y 63 tablas de `public` sin RLS.
- **P3 · Stock ENCAPS:** sin la tanda 0 antes del vie 6-nov, II-10 rompe el lun 9-nov, II-EMG el mié 11 e I-OCC el jue 12-nov; sin reponer, ningún mini-sim desde el
  vie 27-nov llega a 25Q y el del 27-nov no se arma (`DATA/ENCAPS/RUNBOOK_SEMANA2_2026-10-26.md` §4).
- **P4 · Calendar (baja prioridad, `CAL_V6.md` §19):** títulos «⏭ SIN SESIÓN (v6.06 …)» de los días pasados 26-30 oct sin poner en ≈ 85 instancias (series USMLE y las
  de C2) · salto de línea inicial en la descripción de `d8252hjo5ra2qlqb9bccd6vkjo` · el cierre Business 15′ de los sábados normales nunca tuvo evento · el título del
  EXAMEN Step 1 (`oinh139dsnbuma9r3kfu56dhkc`) sigue «· v6.04» · la descripción del UWSA1 remite a la app para la fecha del NBME 27 y los gates · excepciones
  anteriores al 19-oct de las series cuyo master cambió, sin auditar · si la intensiva se regenera (`--pretest` / `--desde`), comprobar que los códigos de los 5
  eventos del carril SÁBADO no cambian (`encapsGuia.sabadoEncapsCuadra`).
- **P5 · Ensayo de 7 bloques con turno T** (vie 8-oct-2027): la simulación lo sigue marcando; lo resuelve la regla de partirlo (decisión (C) de la v6.04).
- **P6 · Feriado no listado:** el lun 1-nov-2027 (Todos los Santos) no está en `skip` de `_fechas_v6.json` (la lista termina en oct-2027) y cae la repuesta MIR d199 →
  decisión (f).
- **P7 · Texto de la orden en datos (heredado de v6.05 P6):** la `regla` de la entrada v6.05 de `corrimientos` sigue citando «no quites temas **especiales**»
  (historial; la entrada v6.06 cita bien la orden). Cosmético.
- **P8 · Backup del SQL suelto:** `_encaps_mantenimiento_2027.sql` crea `study_schedule_bk_v606_mant_20261031` si se ejecuta solo; la siembra real (una transacción) usó
  `study_schedule_bk_v606_20261031`. No regenerar desde el SQL suelto sin cambiar `--bk`.
- **P9 · Docs fuera de este ámbito:** al cerrar esta pasada había ediciones en paralelo, sin commit, en `DATA/ENCAPS/` (`CALENDAR_SEGMENTOS_V5_6.md`,
  `FASE_INTENSIVA_2027-I.md`, `PROTOCOLO_HORA_MANTENIMIENTO.md`, `RUTINA_EXTREMA_MILITARIZADA.md`, `BANCO_PROPIO/README.md`) y retoques en `DATA/DERMATOLOGIA/`,
  `DATA/RESEARCH/`, `DATA/SYNAPSE/` y `DATA/BUSINESS/`; en `HEAD`, `FASE_INTENSIVA_2027-I.md`, `PROTOCOLO_HORA_MANTENIMIENTO.md` y `RUTINA_EXTREMA_MILITARIZADA.md` aún
  marcan la v6.05 como vigente y `CALENDAR_SEGMENTOS_V5_6.md` no cita la v6.06, hasta que se publiquen esas ediciones. No se revisaron aquí.
- **P10 · Sin cambio desde v6.03/v6.05:** `MINIMOS` de la revisión semanal sin alinear con V6_ESPEC (v6.03 (14)); NBME 28 sin Day-After (v6.03 (7)); el % del NBME 28 en
  Neuro, Heme/Onco y Endocrino no es comparable con planes anteriores (0 de 8, 0 de 6 y 4 de 5 al 30-dic); mapeos de recursos de las desplazadas con aviso en T3, T4,
  T6, T9, T11, T13-T18 (v6.05 (h)).
