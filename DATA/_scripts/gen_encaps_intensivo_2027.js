/**
 * gen_encaps_intensivo_2027.js — FASE INTENSIVA ENCAPS 2027-I (F2: lun 4-ene → D-1 del examen) → SQL para Supabase (study_schedule).
 *
 * v6.00 (6-oct-2026, V6_ESPEC §C2-§C3 + Anexo B): REESTRUCTURACIÓN ANUAL. La intensiva ya no espera al Step 1 (que se pausa del 31-dic
 *   al lunes libre post-ENCAPS): arranca el LUN 4-ENE-2027 (dia 61, la numeración L-V sigue sin huecos desde el D1 del mantenimiento
 *   2026-10-07 saltando SKIP_V6) y llega al D-1 hábil del examen ENCAPS = DOM 14-MAR-2027 PROVISIONAL (50 hábiles, dia 61-110).
 *   Fechas: _fechas_v6.json vía gen_fechas_v6.js (nunca constantes locales). Esqueleto (escenario base, Anexo B):
 *   · S1 (lun 4 → vie 8-ene): lun `senales` (re-scan + convocatoria) · mar/mié/jue `loop` calentamiento I-3 / V-2 / II-3 ·
 *     vie 8-ene `pretest` = PRE-TEST 2026-II 100Q (clave oficial) — default alineado con gen_encaps_minisim.js --pretest.
 *   · NÚCLEO S2-S9 (lun 11-ene → vie 5-mar = encaps.nucleo_hasta): 32 slots `loop` de barrido lun-jue (--slots-barrido) con el reparto
 *     I-3 7 · V-2 5 · IV-1+IV-2 4 · I-4 4 · II-3 4 · III-5 3 · II-4 3 · II-5 2 en el ORDEN BASE r2 (S3/S5/S6/S7 permutados: ningún día
 *     repite el código del carril B) · último hábil de cada semana = `sim100` (8): #1 2025-II oficial · #4 2024-II oficial ·
 *     #7 2025-I oficial (ancla tardía) · #2/#3/#5/#6/#8 Theomed / QX 2027-I / propios (acceso A VERIFICAR) · 2026-I reservado al dress.
 *   · MÓDULOS DE EXTENSIÓN (solo si el examen es posterior al 14-mar), semana a semana entre el núcleo y la cola: lun + mar pasada
 *     profunda #1/#2 · mié rebote cola larga (II-1 / II-11 / II-8 rotando) · jue lista de vigilancia · el ÚLTIMO hábil de la semana es
 *     SIEMPRE el `sim100` (regla del módulo parcial: Semana Santa 25-26-mar → SIM el mié 24-mar).
 *   · COLA ANCLADA = los 5 hábiles antes del examen: D-5 `loop` pasada profunda (extra.cola='profunda') · D-4/D-3 `repaso_final` ·
 *     D-2 `dress_rehearsal` 11:00-13:00 · D-1 `medio_dia` (día protegido con fila legítima, V3).
 *   · LOOP v6 (extra.loop, horas DEFINITIVAS F2; extra.nota_horas): 05:00 Anki cifras 15' · 07:15 repaso D-1/D-7/D-21 60' · 08:15
 *     PRE-TEST 10Q 45' · 09:00 DEEP PRIME 120' · 11:00 CONSOLIDACIÓN 30Q + cierre 60' · 12:00 registro 15' · 18:00 EVAL 20Q (10 + 10) 45'.
 *     El 16:15 CARRIL B NO va en extra.loop (lo añaden itemsForDay/HorarioView si existe extra.carril_b); sin «anclaje 17:15».
 *   · CARRIL B (16:15, --carril-b, OBLIGATORIO en TODAS las ejecuciones; default DATA/ENCAPS/_carril_b_v520_61-92.json): cada fila
 *     MANTENIMIENTO 61-92 de v5.20 se EMBEBE en la fila INTENSIVO de su misma fecha (= mismo dia; PK (examen, dia)):
 *     26 lun-jue → extra.carril_b = { origen:'mantenimiento_v5.20', dia_mant, fecha, tipo:'banqueo1h', codigo, subtema, prioridad, nts,
 *     temas_secundarios, extra } (copia literal) · 6 viernes → extra.minisim_absorbido = { dia_mant, subtema, extra } (receta guardada,
 *     el SIM 100Q la absorbe) · lun-jue desde el día siguiente a la última fila 61-92 hasta el D-3 de la cola → extra.carril_b =
 *     { tipo:'reposicion', regla } · sin carril B: viernes/SIM, D-2 y D-1.
 *   · SIN extra.dias_a_examen (era estático; la app lo calcula con diasAExamenDe(exam_date)). extra.sim.hora = '07:15' salvo #7, #8 y
 *     el dress = '11:00'. extra.repaso = { 'D-1', 'D-7', 'D-21' }.
 *   · SQL: DELETE SOLO modo='INTENSIVO' (con --desde: AND fecha >= <desde>) + INSERT; NO borra el MANTENIMIENTO (las filas 61-92 de v5.20
 *     las borra el orquestador en la siembra, Lote 4) · el UPDATE de study_metrics.extra (§C3) va dentro de la transacción, o en
 *     <out>.metrics.sql con --sin-tx. --bk ABORTA si la tabla de backup ya existe (antes: DROP TABLE IF EXISTS).
 *
 * Uso:
 *   node DATA/_scripts/gen_encaps_intensivo_2027.js [D1=2027-01-04] [EXAMEN=_fechas_v6.encaps.examen (2027-03-14)]
 *        [--base 2026-10-19 (= f1.inicio, ya por defecto; v6.01: 2026-10-12 · v6.00: 2026-10-07)] [--carril-b DATA/ENCAPS/_carril_b_v520_61-92.json] [--desde AAAA-MM-DD] [--sin-tx] [--out ruta.sql]
 *        [--nucleo-hasta 2027-03-05] [--slots-barrido 32] [--reparto json|ruta] [--orden-base json|ruta] [--pretest export.json]
 *        [--sims ruta.json] [--bk study_schedule_bk_v602_int_AAAAMMDD] [--bk-base study_schedule_bk_v602_20261017]
 *        [--pendientes-f1 DATA/ENCAPS/_pendientes_f1.json | --sin-pendientes-f1]   (v6.02; v6.01: bk _v601_int_ / _v601_20261010 · v6.00: _v600_int_ / _v600_20261006)
 *   · Siembra v6.01 (10-oct): … 2027-01-04 2027-03-14 --carril-b DATA/ENCAPS/_carril_b_v520_61-92.json --sin-tx   (sin --base: default = f1.inicio
 *     = 2026-10-12; pasar otra --base exige --out) · v6.00: Siembra v6 (Lote 4): … 2027-01-04 2027-03-14 --base 2026-10-07 --carril-b … --sin-tx
 *   · Tras el PRE-TEST (vie 8-ene): --pretest <export.json> --desde 2027-01-11 (re-ordena los 32 slots por ÍNDICE DE BRECHA conservando
 *     32 slots, cada crítico ≥ 1 y la restricción «código del slot ≠ código del carril B de ese día»).
 *   · Tras la convocatoria: editar _fechas_v6.json (encaps.examen) y regenerar con --desde <primer hábil > nucleo_hasta> (módulos + cola).
 *   · Un escenario distinto del de _fechas_v6.json (D1 / EXAMEN / --base por argv) exige --out (prueba en seco: nunca pisa el SQL versionado).
 *   · --reparto {"I-3":7,…} (suma = slots) re-ordena por intercalado + restricción · --orden-base {"<lunes>":[c1,c2,c3,c4],…} sustituye la
 *     tabla S2-S9 (aborta si choca con el carril B) · --sims [{label, fuente, clave?, hora?}] sustituye la lista de SIM del núcleo.
 *
 * v6.01 (10-oct-2026, corrimiento RÍGIDO «todo empieza el lunes 12»: no se estudió mié 7, jue 8 ni vie 9-oct): D1 del mantenimiento
 *   = LUN 12-OCT-2026 (--base = _fechas_v6.json f1.inicio, ya por defecto) → la F1 son 57 hábiles (dia 1-57) y la intensiva se RENUMERA
 *   dia 58-107 con las MISMAS FECHAS (lun 4-ene → vie 12-mar), porque la app calcula el dia como índice de hábiles desde el d1
 *   (encapsPlan.ts diaActual). Nada más cambia: S1 / núcleo / 8 SIM 100Q / pre-test vie 8-ene / cola, y el CARRIL B sigue con las filas
 *   61-92 de v5.20 en su MISMA FECHA (extra.carril_b.dia_mant = etiqueta de ORIGEN, se queda 61-92). Cambios de código:
 *   · la guarda «dia del carril B = dia de la intensiva» pasa a «desfase constante = Σ hábiles perdidos de _fechas_v6.json corrimientos»
 *     (v6.01: 61 − 58 = 3) y la fila del carril B se sigue casando POR FECHA.
 *   · PENDIENTES F1 (--pendientes-f1, default DATA/ENCAPS/_pendientes_f1.json si existe; --sin-pendientes-f1 lo ignora): las filas que el
 *     corrimiento dejó fuera de la F1 van EXPLÍCITAS a los primeros días de REPOSICIÓN del carril B, en este orden: primero las banqueo1h por
 *     dia_mant (v6.01: fila mant. 59 II-8 paquetes_tamizaje #3 → mié 17-feb = dia 90 · fila mant. 60 II-3 cadena_frio #4 → jue 18-feb =
 *     dia 91) y después los mini-sims (v6.01: el 11.º mini-sim de v6.00, fila mant. 53, vie 18-dic, cola larga II-6 + II-10 → primer día de
 *     reposición libre = LUN 22-FEB-2027 = dia 93; el vie 19-feb es SIM 100Q). NADA se descarta ni se absorbe (regla de Joseph, 10-oct):
 *     aborta si _pendientes_f1.json trae `minisims_absorbidos`. extra.carril_b = { tipo:'reposicion', regla, pendiente_f1: <la fila del JSON,
 *     IDÉNTICA: origen, corrimiento, dia_mant, fecha_original, tipo ('banqueo1h' | 'mini_sim'), codigo, subtema, prioridad, temas_secundarios,
 *     extra, destino, reposicion> }; el mini-sim lleva su receta íntegra en extra (25Q · 72 s/Q · II 8 · I 7 · V 5 · III 3 · IV 2 · cola larga
 *     II-6 + II-10). Al colocarlas, este generador ESCRIBE en _pendientes_f1.json `destino` («REPUESTO dia N …») y `reposicion` {dia, fecha,
 *     carril} (solo en la siembra versionada: no con --out ni --no-persistir), así el JSON y la copia embebida son idénticos. La app
 *     (encapsPlan.ts carrilBDe) pinta la banqueo1h como un banqueo del carril B y el mini_sim como el MINI-SIMULACRO 25Q de las 16:15 con su
 *     corrección (rama mini_sim de itemsMantenimiento). Aborta si no caben.
 *   · Regla de la reposición genérica (desambiguada tras la renumeración): «1) filas del carril B dia 58-89 (dia_mant 61-92) sin ✓ en
 *     D{dia}:b_*, en orden; 2) si no hay: lista de vigilancia = temasCalientes() del día» — el rango se DERIVA de las filas con
 *     extra.carril_b.tipo 'banqueo1h' (antes: «instancias de 61-92 no hechas (study_checks sin ✓)», ambiguo con dia 58-107).
 *   · study_metrics.extra: d1 2026-10-12 · dias_ciclo 57 · regimen «MANTENIMIENTO_2027-1 v6.20 (57 d) + INTENSIVA v6.01 …» · intensiva.dias
 *     '58-107' · backup study_schedule_bk_v601_20261010 (--bk-base) · bloque `corrimiento` (de _fechas_v6.json + pendientes F1 con su
 *     reposición) · intensiva.carril_b.pendientes_f1 · intensiva.backup = --bk (study_schedule_bk_v601_int_<fecha>): con --sin-tx este
 *     generador NO crea esa tabla; la crea el orquestador en la transacción de siembra (como en v6.00).
 *   Siembra v6.01: node DATA/_scripts/gen_encaps_intensivo_2027.js --sin-tx (todo por defecto) → el orquestador lo combina con la F1.
 *
 * v6.02 (17-oct-2026, corrimiento RÍGIDO «todo corre a partir del 19»: no se estudió lun 12 → vie 16-oct): D1 del mantenimiento = LUN 19-OCT-2026
 *   (--base = f1.inicio por defecto) → F1 = 52 hábiles (dia 1-52) y la intensiva se RENUMERA dia 53-102 con las MISMAS FECHAS (lun 4-ene → vie
 *   12-mar). Sin cambios de lógica: S1 / núcleo / 8 SIM 100Q / pre-test vie 8-ene / cola; CARRIL B = filas 61-92 de v5.20 en su misma fecha con
 *   desfase constante Σ perdidos = 3 + 5 = 8 (dia_mant 61 = dia 53); 6 minisim_absorbido (receta guardada). PENDIENTES F1 = los 3 de v6.01
 *   (se conservan) + los 5 de v6.02 (4 banqueo1h + 1 mini-sim) = 8 (6 banqueo1h + 2 mini-sims), TODOS EXPLÍCITOS en los primeros días de reposición del carril B (lun-jue;
 *   viernes = SIM 100Q), en orden corrimiento → banqueo1h → mini-sim → dia_mant: mié 17-feb dia 85 II-8 #3 · jue 18-feb dia 86 II-3 #4 · lun
 *   22-feb dia 88 MINI-SIM 25Q II-6 + II-10 (v6.01, mismas fechas que en v6.01) · mar 23-feb dia 89 III-8 · mié 24-feb dia 90 II-11 · jue 25-feb
 *   dia 91 IV-6 · lun 1-mar dia 93 V-7 · mar 2-mar dia 94 MINI-SIM 25Q I-10 + V-6 (v6.02). Regla genérica derivada: «filas del carril B dia
 *   53-84 (dia_mant 61-92) sin ✓». study_metrics.extra: d1 2026-10-19 · dias_ciclo 52 · regimen «MANTENIMIENTO_2027-1 v6.21 (52 d) + INTENSIVA
 *   v6.02 …» · intensiva.dias '53-102' · examen_target «PROVISIONAL v6.00-v6.02» · backup study_schedule_bk_v602_20261017 · intensiva.backup =
 *   study_schedule_bk_v602_int_<fecha> (--bk por defecto con la versión del último corrimiento; lo crea el orquestador en la transacción).
 *   Siembra v6.02: node DATA/_scripts/gen_encaps_intensivo_2027.js --sin-tx (todo por defecto) → el orquestador lo combina con la F1.
 *   · v6.02 (17-oct): el UPDATE de study_metrics reescribe también 3 textos de horarios que la app pinta desde el lun 19-oct (EncapsPlanView
 *     HorarioView) y seguían con fechas de v6.00. Los reescribe POR RUTA (jsonb_set de pasos[0].d; el resto de cada objeto no se toca):
 *     weekday[0] 16:15 EVAL ANCLADA (D1 mié 7-oct · eval_2026-10-07 · jue 8 · lun 12-oct), weekday[1] 16:30 BANCO DEL DÍA («Mié 7 y jue 8-oct:
 *     PRE-TEST DE ARRANQUE …») y weekend[1] 16:45 corrección («gen_encaps_mantenimiento_2027.js 2026-10-07 --override …»). Los DERIVA de las
 *     filas F1 de _encaps_mantenimiento_2027.sql (D1 = f1.inicio · D2 = eval del código de la fila dia 1 · D3 = eval del código de la fila
 *     dia 2 · primer viernes = mini-sim) y del comando que imprime gen_encaps_semana.js («… <D1> --hasta <f1.fin> --override …»). El texto
 *     fijo va literal (HORARIO_*). Una guarda DO aborta la transacción si el texto vivo no es esa plantilla (md5 del prefijo/sufijo +
 *     hora/título). Avisa si faltan los ficheros BANCO_PROPIO eval_<D1|D2|D3> / pretest_arranque_<D1|D2> o si su código no cuadra con la
 *     fila. Las filas no cambian: solo cambia <out>.metrics.sql.
 *
 * v6.03 (20-oct-2026, corrimiento RÍGIDO de Joseph «todo comienza mañana miércoles 21, corre dos días»: no se estudió lun 19 ni mar 20-oct; la
 *   capa de alias v6.02d queda inerte): D1 del mantenimiento = MIÉ 21-OCT-2026 (--base = f1.inicio por defecto) → F1 = 50 hábiles (dia 1-50) y
 *   la intensiva se RENUMERA dia 51-100 con las MISMAS FECHAS (lun 4-ene → vie 12-mar; pre-test 2026-II vie 8-ene = dia 55). Sin cambios de
 *   lógica. CARRIL B: desfase Σ perdidos = 3 + 5 + 2 = 10 (dia_mant 61 = dia 51). PENDIENTES F1 = 8 de v6.01/v6.02 (CONSERVAN sus fechas de
 *   reposición; solo cambia su dia) + 2 de v6.03 (fila mant. 51 I-3 brote_bloqueo #6 y 52 V-2 residuos_bioseguridad #6 de la F1 v6.02) = 10,
 *   explícitos en los primeros días de reposición: … · lun 1-mar V-7 · mar 2-mar MINI-SIM I-10 + V-6 · MIÉ 3-MAR I-3 #6 · JUE 4-MAR V-2 #6
 *   (v6.03; el vie 5-mar es SIM 100Q #8; reposición hasta el D-3 mié 10-mar). Regla genérica «filas del carril B dia 51-82 (dia_mant 61-92) sin
 *   ✓». study_metrics.extra: d1 2026-10-21 · dias_ciclo 50 · regimen «MANTENIMIENTO_2027-1 v6.22 (50 d) + INTENSIVA v6.03 …» · intensiva.dias
 *   '51-100' · examen_target «PROVISIONAL v6.00-v6.03» · backup study_schedule_bk_v603_20261020 (--bk-base por defecto) · intensiva.backup =
 *   study_schedule_bk_v603_int_<fecha>. Horarios por ruta: D1 mié 21 (eval_2026-10-21 + parte 1) · D2 jue 22 (eval del código de la fila dia 1
 *   + parte 2) · D3 = vie 23-oct = mini-sim (rama r3.tipo === 'mini_sim' de horarioTextos: sin eval ese día).
 *   Siembra v6.03: node DATA/_scripts/gen_encaps_intensivo_2027.js --sin-tx (todo por defecto) → el orquestador lo combina con la F1.
 *
 * v6.05 (24-oct-2026, orden de Joseph «todo inicia el lunes 26; corre lo que falta, alarga plazos, no quites temas»: la semana del 19 no se
 *   estudió —ni el D1 del mié 21 ni su alias del jue 22 (la corrida por alias v6.04a queda sin efecto)—): D1 del mantenimiento = LUN 26-OCT-2026
 *   (--base = f1.inicio por defecto) → F1 = 47 hábiles (dia 1-47) y la intensiva se RENUMERA dia 48-97 con las MISMAS FECHAS (lun 4-ene → vie
 *   12-mar; pre-test 2026-II vie 8-ene = dia 52). Sin cambios de lógica. CARRIL B: desfase Σ perdidos = 3 + 5 + 2 + 3 = 13 (dia_mant 61 = dia 48).
 *   PENDIENTES F1 = 10 de v6.01-v6.03 (CONSERVAN sus fechas de reposición; solo cambia su dia: 80, 81, 83 mini-sim, 84, 85, 86, 88, 89 mini-sim,
 *   90, 91) + 3 de v6.05 (fila mant. 49 II-4 plan_multisectorial #3 · 50 II-1 prenatal_emergencias #3 · mini-sim de la fila mant. 43 —el
 *   CHECKPOINT de la F1 v6.03, cola larga I-1 + II-2, sin ese rótulo—) = 13 = TODOS los días de reposición lun-jue del carril B (mié 17-feb →
 *   mié 10-mar, el D-3): LUN 8-MAR dia 93 II-4 #3 · MAR 9-MAR dia 94 II-1 #3 · MIÉ 10-MAR dia 95 MINI-SIM 25Q I-1 + II-2. Caben exactos: la
 *   reposición genérica («filas del carril B dia 48-79 (dia_mant 61-92) sin ✓») ya no tiene día libre propio — un pendiente sin ✓ solo se
 *   recupera en la reposición de la tarde de un día con pendiente hecho o, si no, en la cola. study_metrics.extra: d1 2026-10-26 · dias_ciclo 47 ·
 *   regimen «MANTENIMIENTO_2027-1 v6.23 (47 d) + INTENSIVA v6.05 …» · intensiva.dias '48-97' · examen_target «PROVISIONAL v6.00-v6.05» ·
 *   backup study_schedule_bk_v605_20261024 (--bk-base por defecto) · intensiva.backup = study_schedule_bk_v605_int_<fecha>. Horarios por ruta:
 *   D1 lun 26 (eval_2026-10-26 + parte 1) · D2 mar 27 (eval del código de la fila dia 1 + parte 2) · D3 mié 28 = eval del código de la fila
 *   dia 2 · vie 30-oct (D5) = primer mini-sim.
 *   Siembra v6.05: node DATA/_scripts/gen_encaps_intensivo_2027.js --sin-tx (todo por defecto) → se combina con la F1 en una transacción.
 *
 * Histórico (antes de v6.00):
 * v5.20 (6-oct-2026, DEFINITIVA): Joseph FIJA el examen ENCAPS 2027-I = MIÉ 10-MAR-2027 y la intensiva arranca el día siguiente al examen
 *   Step 1 (lun 22-feb) → D1 = mar 23-feb · 11 hábiles (días 97-107): mar 23 señales · mié 24 / jue 25 calentamiento · vie 26 PRE-TEST 2026-II ·
 *   lun 1 → jue 4-mar barrido (4 slots) · vie 5-mar SIM 100Q #1 · lun 8-mar D-2 dress rehearsal · mar 9-mar D-1 medio día (sembrado el 6-oct,
 *   backup study_schedule_bk_intensivo_1006; v6.00 lo sustituye: sus 11 filas quedan en study_schedule_bk_v600_int_<fecha> y su contenido
 *   re-fechado en la nueva intensiva, §C3). v5.19: examen Step 1 vie 19-feb, arranque lun 22-feb · v5.18: examen jue 18-feb, arranque
 *   vie 19-feb o lun 22-feb; v5.17: examen mar 16-feb, arranque mié 17-feb o lun 22-feb. Hasta v5.19 el examen era ASUMIDO (26/28-mar =
 *   Viernes Santo / Pascua) y el SQL no se aplicaba hasta la convocatoria.
 * v5.14 (19-sep): la app renderiza modo='INTENSIVO' (encapsPlan.ts: regimenDe() · itemsForDay · simDays con pretest/sim100/dress_rehearsal).
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const ciclo = require('./_encaps_ciclo_v3');
const { CRITICOS_V3, REBOTE_V3, COLA_LARGA, SUB_EJES, WD } = ciclo;
const V6 = require('./gen_fechas_v6');
const F6 = V6.cargarFechasV6(); // v6.00: fuente única de fechas (aborta si un valor guardado ≠ derivado)

// ── argumentos (v6.00: las fechas posicionales son las que NO son valor de una opción; antes «--desde 2027-03-08» sin posicionales
//    se habría leído como D1) ──
const argv = process.argv.slice(2);
const OPCIONES_CON_VALOR = new Set(['--base', '--bk', '--bk-base', '--pretest', '--sims', '--out', '--desde', '--nucleo-hasta', '--slots-barrido',
  '--reparto', '--carril-b', '--orden-base', '--pendientes-f1']); // v6.01: + --pendientes-f1
const ISO_RE = /^20\d\d-\d\d-\d\d$/;
const fechasArg = argv.filter((a, i) => ISO_RE.test(a) && !OPCIONES_CON_VALOR.has(argv[i - 1]));
const opt = (k, def) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] ? argv[i + 1] : def; };
const has = (k) => argv.includes(k);
const hoyLima = () => new Date(Date.now() - 5 * 3600 * 1000).toISOString().slice(0, 10);
const D1 = fechasArg[0] || F6.encaps.intensiva_desde;            // v6.00: lun 4-ene-2027 (dia 61)
const EXAMEN = fechasArg[1] || F6.encaps.examen;                  // v6.00: dom 14-mar-2027 PROVISIONAL (se fija con la convocatoria)
const BASE = opt('--base', F6.f1.inicio);                          // v6.02: D1 del mantenimiento = lun 19-oct-2026 (numeración `dia`) · v6.01: lun 12-oct · v6.00: mié 7-oct
const NUCLEO_HASTA = opt('--nucleo-hasta', F6.encaps.nucleo_hasta); // v6.00: vie 5-mar-2027 (fin del núcleo S2-S9)
const SLOTS = Number(opt('--slots-barrido', '32'));                // v6.00: sustituye al .slice(0, 16) fijo
// v6.02: versión del régimen = la del último corrimiento de _fechas_v6.json (v6.00 sin corrimientos) → nombre del backup de la intensiva
const VTAG = ((F6.corrimientos || []).at(-1) || {}).version || F6.version || 'v6.00';
const BK = opt('--bk', `study_schedule_bk_${VTAG.replace('.', '')}_int_${hoyLima().replace(/-/g, '')}`); // v6.02: study_schedule_bk_v602_int_<fecha> (v6.01: _v601_int_ · v6.00: _v600_int_)
const BK_BASE = opt('--bk-base', 'study_schedule_bk_v605_20261024'); // backup completo previo (study_metrics.extra.backup) · v6.05 (v6.03: study_schedule_bk_v603_20261020 · v6.02: study_schedule_bk_v602_20261017 · v6.01: study_schedule_bk_v601_20261010 · v6.00: study_schedule_bk_v600_20261006)
// v6.01: pendientes F1 (instancias banqueo1h que el corrimiento dejó fuera de la F1) → primeros días de reposición del carril B
const PENDIENTES_F1_DEF = path.join(ROOT, 'DATA', 'ENCAPS', '_pendientes_f1.json');
const PENDIENTES_F1 = has('--sin-pendientes-f1') ? null : (opt('--pendientes-f1', null) ? path.resolve(opt('--pendientes-f1')) : (fs.existsSync(PENDIENTES_F1_DEF) ? PENDIENTES_F1_DEF : null));
const CORRIMIENTOS = F6.corrimientos || [];
const PERDIDOS = CORRIMIENTOS.reduce((n, c) => n + (c.perdidos || []).length, 0); // v6.01: 3 (mié 7, jue 8, vie 9-oct) · v6.02: 3 + 5 (lun 12 → vie 16-oct) = 8 · v6.03: 8 + 2 (lun 19, mar 20-oct) = 10 · v6.05: 10 + 3 (mié 21, jue 22, vie 23-oct) = 13
const PRETEST = opt('--pretest', null);
const SIMS_ARG = opt('--sims', null);
const REPARTO_ARG = opt('--reparto', null);
const ORDEN_ARG = opt('--orden-base', null);
const CARRIL_B = path.resolve(ROOT, opt('--carril-b', path.join('DATA', 'ENCAPS', '_carril_b_v520_61-92.json')));
const DESDE = opt('--desde', null);
const SIN_TX = has('--sin-tx');
const OUT_ARG = opt('--out', null);
const OUT = OUT_ARG ? path.resolve(OUT_ARG) : path.join(__dirname, '_encaps_intensivo_2027.sql');
const OUT_METRICS = OUT.replace(/\.sql$/i, '') + '.metrics.sql';
for (const [k, v] of [['D1', D1], ['EXAMEN', EXAMEN], ['--base', BASE], ['--nucleo-hasta', NUCLEO_HASTA]]) if (!ISO_RE.test(v)) throw new Error(`${k} inválido: ${v}`);
if (DESDE && !ISO_RE.test(DESDE)) throw new Error('--desde inválido: ' + DESDE);
if (!/^[a-z_][a-z0-9_]*$/.test(BK) || !/^[a-z_][a-z0-9_]*$/.test(BK_BASE)) throw new Error('--bk / --bk-base inválido');
if (!Number.isInteger(SLOTS) || SLOTS < 1) throw new Error('--slots-barrido inválido: ' + SLOTS);
if (D1 >= EXAMEN) throw new Error(`D1 (${D1}) debe ser anterior al examen (${EXAMEN})`);
if (PRETEST && ORDEN_ARG) throw new Error('--pretest y --orden-base son excluyentes (el pre-test re-calcula el orden)');
// v6.00: un escenario que no es el de _fechas_v6.json solo se genera EN SECO (--out): nunca pisa el SQL versionado.
const ESCENARIO_JSON = D1 === F6.encaps.intensiva_desde && EXAMEN === F6.encaps.examen && BASE === F6.f1.inicio && NUCLEO_HASTA === F6.encaps.nucleo_hasta;
if (!ESCENARIO_JSON && !OUT_ARG) throw new Error(`escenario ≠ _fechas_v6.json (D1 ${D1} · EXAMEN ${EXAMEN} · base ${BASE} · núcleo ${NUCLEO_HASTA}): pásale --out <ruta> (prueba en seco) o edita _fechas_v6.json`);

// ── calendario: L-V sin SKIP_V6 (+ Jueves/Viernes Santo del año del examen) ──
function pascua(y) { // Meeus/Jones/Butcher
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25),
    g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4,
    l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), mo = Math.floor((h + l - 7 * m + 114) / 31),
    da = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(y, mo - 1, da));
}
const iso = (d) => d.toISOString().slice(0, 10);
const fromISO = (s) => new Date(s + 'T12:00:00Z');
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const dowDe = (s) => fromISO(s).getUTCDay();
const lunesDe = (s) => addDays(s, dowDe(s) === 0 ? -6 : 1 - dowDe(s));
const SKIP_INT = new Set(F6.skip); // v6.00: SKIP_V6 (25-dic, 31-dic, 1-ene, Jueves y Viernes Santo 2027)
{ const p = pascua(fromISO(EXAMEN).getUTCFullYear()); SKIP_INT.add(addDays(iso(p), -3)); SKIP_INT.add(addDays(iso(p), -2)); }
const habiles = (desde, hasta) => V6.habLV(desde, hasta, SKIP_INT).map((fecha) => ({ fecha, dow: dowDe(fecha) }));
const fCorta = (s) => `${['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'][dowDe(s)]} ${+s.slice(8)}-${['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][+s.slice(5, 7) - 1]}`;
const fDia = (s) => fCorta(s).split(' ')[1]; // «4-ene»

const plan = habiles(D1, addDays(EXAMEN, -1));
if (plan.length < 10) throw new Error('la intensiva necesita ≥ 10 hábiles entre D1 y D-1 (S1 + cola)');
const N = plan.length;
const offset = habiles(BASE, addDays(D1, -1)).length; // días L-V ya numerados por el mantenimiento (v6.02: 52 = D1-D52 de F1 · v6.01: 57 · v6.00: 60 = D1-D60)
if (ESCENARIO_JSON && offset !== F6.f1.dias) throw new Error(`offset ${offset} ≠ f1.dias ${F6.f1.dias}: la intensiva debe empezar en el dia ${F6.f1.dias + 1}`);
if (plan[N - 1].fecha !== V6.ultimoHabilAntes(EXAMEN, SKIP_INT)) throw new Error('el último hábil del plan no es el D-1 hábil del examen');
{
  const pas = iso(pascua(fromISO(EXAMEN).getUTCFullYear())), dowEx = dowDe(EXAMEN);
  if (SKIP_INT.has(EXAMEN) || EXAMEN === pas) throw new Error(`EXAMEN ${EXAMEN} cae en Semana Santa (Jue ${addDays(pas, -3)} · Vie ${addDays(pas, -2)} · Pascua ${pas}): fecha imposible`);
  if (dowEx !== 0) console.warn(`⚠ EXAMEN ${EXAMEN} no es domingo (${WD[dowEx]}): los 6/6 ENCAPS previos fueron en domingo → la cola (dress jue · medio día vie) se ancla igual a los 5 hábiles previos`);
  if (!F6.encaps.escenarios.includes(EXAMEN)) console.warn(`⚠ EXAMEN ${EXAMEN} no está entre los escenarios de §A5 (${F6.encaps.escenarios.join(', ')})`);
}

// ── labels desde encapsCobertura.ts (NO se inventan) ──
const cobSrc = fs.readFileSync(path.join(ROOT, 'src/lib/encapsCobertura.ts'), 'utf8');
function temaInfo(code) {
  let i = cobSrc.indexOf(`"${code}": {`);
  if (i < 0) i = cobSrc.indexOf(`"${code}+`);
  if (i < 0) { const m = cobSrc.match(new RegExp(`"[IV]+-\\d+\\+${code.replace(/[-+]/g, '\\$&')}": \\{`)); if (m) i = m.index; }
  if (i < 0) return { label: code, tier: 'MEDIA', found: false };
  const seg = cobSrc.slice(i, i + 4000);
  const tier = (seg.match(/"tier":\s*"([^"]+)"/) || [])[1] || 'MEDIA';
  const tem = (seg.match(/"temario":\s*\[\s*"([^"]+)"/) || [])[1] || code;
  let label = tem.split('(')[0].trim();
  if (label.length > 70) label = label.slice(0, 67) + '…';
  return { label, tier: tier.replace('Í', 'I'), found: true };
}
// código v3 (p.ej. 'IV-1+IV-2') → código de siembra (columna codigo) + paraguas
const SIEMBRA = { 'IV-1+IV-2': ['IV-1', ['IV-2']], 'IV-6+IV-7': ['IV-6', ['IV-7']], 'V-MED': ['V-7', ['V-10']], 'V-7+V-10': ['V-7', ['V-10']],
  'I-5+I-6': ['I-5', ['I-6']], 'I-11+I-12': ['I-11', ['I-12']], 'III-1/III-2': ['III-1', ['III-2']], 'V-RRHH': ['V-3', null] };
const siembraDe = (c) => SIEMBRA[c] || [c, null];
const normV3 = (c) => (c === 'IV' || c === 'IV-1+2' ? 'IV-1+IV-2' : c === 'IV-6+7' ? 'IV-6+IV-7' : c);
// ¿el slot (código v3) choca con el código del carril B de ese día? (mismo código de siembra o su paraguas: IV ↔ IV-1/IV-2, V-MED ↔ V-7…)
const choca = (cv3, cb) => { if (!cv3 || !cb) return false; const [cs, par] = siembraDe(normV3(cv3)); return cs === cb || (par || []).includes(cb); };

// ── LOOP v6 (horas definitivas F2; el 16:15 CARRIL B NO va aquí: lo añade la app si existe extra.carril_b) ──
const LOOP = [
  { h: '05:00', seg: 'Anki ENCAPS::Cifras', min: 15 },
  { h: '07:15', seg: 'Repaso espaciado D-1 / D-7 / D-21 (preguntas de los códigos de esos días)', min: 60 },
  { h: '08:15', seg: 'PRE-TEST 10Q CIEGAS del sub-eje del día (sin clave hasta responder)', min: 45 },
  { h: '09:00', seg: 'DEEP PRIME del sub-eje: norma/NTS + cifras', min: 120 },
  { h: '11:00', seg: 'CONSOLIDACIÓN 30Q (60 % hoy · 40 % previos, ≥40 % recall directo) + cierre', min: 60 },
  { h: '12:00', seg: 'Registro (cierre): _registro_resoluciones.json + fallos OLVIDO → tarjeta esa tarde', min: 15 },
  { h: '18:00', seg: 'EVALUACIÓN MODO EXAMEN 20Q · 72 s/Q = 10 del sub-eje del día + 10 de sub-ejes de hace 7-21 días · solución al final', min: 45 },
];
const NOTA_HORAS = 'v6.00: horas definitivas F2';
const NOTA_PROFUNDA = 'pasada profunda solo para sub-ejes < 70 % en su D+21';

// ── simulacros 100Q del núcleo (v6.00: orden §C3 · #1 2025-II · #4 2024-II · #7 2025-I ancla tardía · 2026-I reservado al dress) ──
let SIMS = [
  { label: 'SIM 100Q · examen real 2025-II (clave oficial extraída de los resaltados, BANCO_PROPIO/_examenes_reales_2024-2A_2026-1.json)', fuente: 'exams_txt/2025-2.txt · runner gen_encaps_minisim.js --sim100 2025-2', clave: 'oficial' },
  { label: 'SIM 100Q · Theomed curso 37 "Examen TIPO A/B" o QX Simulacro Virtual 2027-I (A VERIFICAR acceso); si no, propio', fuente: 'Theomed quiz 7934/7935 · QX Simulacros Virtuales · fallback gen_encaps_minisim.js --sim100 propio', clave: 'plataforma' },
  { label: 'SIM 100Q · propio #1 (vector v3, 50/50 viñeta-directa, espejos 2026-II ya liberado + BANCO_PROPIO)', fuente: 'gen_encaps_minisim.js --sim100 propio', clave: 'verificada por ítem' },
  { label: 'SIM 100Q · examen real 2024-II (forma A; clave oficial)', fuente: 'exams_txt/2024-2A.txt · runner --sim100 2024-2A', clave: 'oficial' },
  { label: 'SIM 100Q · QX Simulacro Virtual 2027-I o Theomed (A VERIFICAR acceso); si no, propio', fuente: 'QX Simulacros Virtuales · Theomed curso 37 · fallback gen_encaps_minisim.js --sim100 propio', clave: 'plataforma' },
  { label: 'SIM 100Q · propio #2 (mix vector v3 + rebotes + señales DGE/RM del verano)', fuente: 'gen_encaps_minisim.js --sim100 propio', clave: 'verificada por ítem' },
  { label: 'SIM 100Q · examen real 2025-I (forma A; clave oficial) · ANCLA TARDÍA', fuente: 'exams_txt/2025-1A.txt · runner --sim100 2025-1A', clave: 'oficial' },
  { label: 'SIM 100Q · propio #3 (mix vector v3 + rebotes + cola larga + señales)', fuente: 'gen_encaps_minisim.js --sim100 propio', clave: 'verificada por ítem' },
];
if (SIMS_ARG) SIMS = JSON.parse(fs.readFileSync(path.resolve(SIMS_ARG), 'utf8'));
const horaSim = (n, s) => (s && s.hora) || (n === 7 || n === 8 ? '11:00' : '07:15'); // §C3: 07:15 salvo #7, #8 (y el dress) = 11:00

// ── carril B: export de las filas MANTENIMIENTO 61-92 de v5.20 (OBLIGATORIO) ──
if (!fs.existsSync(CARRIL_B)) throw new Error(`--carril-b: no existe ${CARRIL_B} (es obligatorio en TODAS las ejecuciones: sin él el carril B desaparecería)`);
const cbJson = JSON.parse(fs.readFileSync(CARRIL_B, 'utf8'));
const cbFilas = Array.isArray(cbJson) ? cbJson : cbJson.filas;
if (!Array.isArray(cbFilas) || !cbFilas.length) throw new Error('--carril-b: sin filas');
const cbPorFecha = {};
for (const r of cbFilas) {
  if (r.examen !== 'ENCAPS' || r.modo !== 'MANTENIMIENTO' || !ISO_RE.test(r.fecha)) throw new Error(`--carril-b: fila inválida dia ${r.dia}`);
  if (cbPorFecha[r.fecha]) throw new Error(`--carril-b: fecha repetida ${r.fecha}`);
  cbPorFecha[r.fecha] = r;
}
const cbUltima = cbFilas.map((r) => r.fecha).sort().at(-1);
let cbCodigoDe = (fecha) => { const r = cbPorFecha[fecha]; return r && r.tipo === 'banqueo1h' ? r.codigo : null; }; // v6.01: let (se amplía con los pendientes F1)
// v6.01: desfase entre la etiqueta de origen (dia_mant 61-92 de v5.20) y el dia de la intensiva = Σ hábiles perdidos por corrimientos
// (v6.00: 0 → dia_mant = dia · v6.01: 3 → dia_mant 61 = dia 58 · v6.02: 8 → dia_mant 61 = dia 53). La fila se casa por FECHA; el desfase solo se comprueba.
const DESFASE_CB = ESCENARIO_JSON ? PERDIDOS : null;

// ── v6.01: pendientes F1 (_pendientes_f1.json, lo escribe gen_encaps_mantenimiento_2027.js --pendientes-de) ──
// filas tipo 'banqueo1h' (instancia del ciclo) o 'mini_sim' (mini-sim 25Q con su receta en extra). NADA se descarta: ningún «absorbido».
let pendF1 = [], pendF1Meta = [], pendF1Doc = null;
if (PENDIENTES_F1) {
  pendF1Doc = JSON.parse(fs.readFileSync(PENDIENTES_F1, 'utf8'));
  pendF1 = (pendF1Doc.filas || []).slice();
  pendF1Meta = (pendF1Doc._meta && pendF1Doc._meta.corrimientos) || [];
  if ((pendF1Doc.minisims_absorbidos || []).length) throw new Error(`--pendientes-f1: ${pendF1Doc.minisims_absorbidos.length} mini-sim(s) en minisims_absorbidos: PROHIBIDO descartar (regla de Joseph, 10-oct) → regenera _pendientes_f1.json con gen_encaps_mantenimiento_2027.js --pendientes-de (el mini-sim va a filas con tipo 'mini_sim')`);
  for (const r of pendF1) {
    if (r.tipo === 'banqueo1h') { if (!r.codigo || !r.extra || r.extra.instancia == null) throw new Error(`--pendientes-f1: fila banqueo1h inválida (dia_mant ${r.dia_mant})`); }
    else if (r.tipo === 'mini_sim') { const e = r.extra || {}; if (r.codigo || e.tipo !== 'mini_sim' || !e.receta || !e.seg_por_q || !Array.isArray(e.cola_larga) || !e.cola_larga.length) throw new Error(`--pendientes-f1: mini-sim sin su receta íntegra (dia_mant ${r.dia_mant}: extra.receta / seg_por_q / cola_larga)`); }
    else throw new Error(`--pendientes-f1: tipo desconocido ${r.tipo} (dia_mant ${r.dia_mant})`);
  }
  // orden: por corrimiento; dentro, primero las banqueo1h y después los mini-sims (un mini-sim no desplaza a las instancias ya colocadas);
  // y por el dia de origen (lo más temprano se repone primero)
  const rangoTipo = (t) => (t === 'banqueo1h' ? 0 : 1);
  pendF1.sort((a, b) => String(a.corrimiento).localeCompare(String(b.corrimiento)) || rangoTipo(a.tipo) - rangoTipo(b.tipo) || a.dia_mant - b.dia_mant);
}
const pendF1Cola = pendF1.slice(); // se consumen en los primeros días de reposición

// ── estructura por fecha: S1 · núcleo · módulos · cola ──
const COLA = plan.slice(-5).map((p) => p.fecha);                         // D-5 … D-1
if (COLA[0] <= NUCLEO_HASTA) throw new Error(`la cola (${COLA[0]} → ${COLA[4]}) se solapa con el núcleo (→ ${NUCLEO_HASTA}): examen demasiado temprano para el esqueleto v6`);
const LUNES_D1 = lunesDe(D1);
const semana = (fecha) => Math.floor((fromISO(fecha) - fromISO(LUNES_D1)) / (7 * 864e5)); // 0 = S1
const S1 = plan.filter((p) => semana(p.fecha) === 0).map((p) => p.fecha);
const PRETEST_FECHA = S1.find((s) => dowDe(s) === 5) || S1.at(-1);           // vie de S1 (si no es hábil, último hábil de S1)
if (ESCENARIO_JSON && PRETEST_FECHA !== F6.encaps.pretest) throw new Error(`pre-test ${PRETEST_FECHA} ≠ encaps.pretest ${F6.encaps.pretest}`);
const NUCLEO = plan.filter((p) => semana(p.fecha) >= 1 && p.fecha <= NUCLEO_HASTA).map((p) => p.fecha);
const ultimoHabilSemana = (s, dentro) => dentro.filter((x) => lunesDe(x) === lunesDe(s)).at(-1);
const SIM_NUCLEO = NUCLEO.filter((s) => s === ultimoHabilSemana(s, NUCLEO));   // §C3: último hábil de cada semana (= viernes)
const SLOTS_BARRIDO = NUCLEO.filter((s) => !SIM_NUCLEO.includes(s));
if (SLOTS_BARRIDO.length !== SLOTS) throw new Error(`el núcleo (${NUCLEO[0]} → ${NUCLEO_HASTA}) tiene ${SLOTS_BARRIDO.length} slots lun-jue de barrido y se pidieron ${SLOTS} (--slots-barrido)`);
const MODULOS = plan.filter((p) => p.fecha > NUCLEO_HASTA && !COLA.includes(p.fecha)).map((p) => p.fecha);
const MOD_ROLES = ['profunda1', 'profunda2', 'rebote', 'vigilancia'];       // orden de llenado del módulo (parcial: el último hábil = sim100)
const semanasModulo = [...new Set(MODULOS.map(lunesDe))];
// v6.01: días de REPOSICIÓN del carril B (misma regla que el bucle de siembra: lun-jue tras la última fila 61-92 hasta el D-3, sin SIM /
// pre-test / dress / medio día) → los primeros reciben los PENDIENTES F1, en orden. Se calcula ANTES del orden del barrido para que la
// restricción «código del slot ≠ código del carril B» también vea el código del pendiente.
const esSimFecha = (f) => SIM_NUCLEO.includes(f) || (MODULOS.includes(f) && f === ultimoHabilSemana(f, MODULOS));
const REPO_FECHAS = plan.filter((p) => p.fecha > cbUltima && p.fecha <= COLA[2] && p.dow >= 1 && p.dow <= 4 && !cbPorFecha[p.fecha]
  && !esSimFecha(p.fecha) && p.fecha !== PRETEST_FECHA && !COLA.slice(3).includes(p.fecha)).map((p) => p.fecha);
if (pendF1Cola.length > REPO_FECHAS.length) throw new Error(`--pendientes-f1: ${pendF1Cola.length} pendientes F1 y solo ${REPO_FECHAS.length} días de reposición en el carril B`);
const PEND_POR_FECHA = Object.fromEntries(pendF1Cola.map((p, k) => [REPO_FECHAS[k], p]));
{ const cbCod0 = cbCodigoDe; cbCodigoDe = (fecha) => cbCod0(fecha) || (PEND_POR_FECHA[fecha] ? PEND_POR_FECHA[fecha].codigo : null); }
const diaDeFecha = (fecha) => { const k = plan.findIndex((p) => p.fecha === fecha); return k < 0 ? null : offset + 1 + k; };
// v6.01: la fila del JSON queda marcada con dónde se repuso (destino + reposicion) y se embebe IDÉNTICA en extra.carril_b.pendiente_f1
// v6.02: + la F1 de origen (con 2 corrimientos, «fila mant. N» sola es ambigua: la 59 es de la F1 v6.00 y la 54 de la F1 v6.01)
const origenPend = (p) => String(p.origen || '').replace('mantenimiento_', 'F1 ');
const descPend = (p) => (p.tipo === 'mini_sim'
  ? `mini-sim 25Q (fila mant. ${p.dia_mant} de la ${origenPend(p)}, ${p.fecha_original}, cola larga ${(p.extra.cola_larga || []).join(' + ')})`
  : `${p.codigo} ${p.extra.sub_eje || ''} #${p.extra.instancia} (fila mant. ${p.dia_mant} de la ${origenPend(p)}, ${p.fecha_original})`.replace(/\s+#/, ' #'));
for (const [fecha, p] of Object.entries(PEND_POR_FECHA)) {
  const d = diaDeFecha(fecha);
  p.destino = `REPUESTO dia ${d} (${fCorta(fecha)}-${fecha.slice(0, 4)}) · carril B 16:15 de la intensiva (extra.carril_b.pendiente_f1)${p.tipo === 'mini_sim' ? ' · mini-simulacro 25Q cronometrado (72 s/Q) + corrección, receta íntegra en extra' : ''}`;
  p.reposicion = { dia: d, fecha, carril: 'B 16:15' };
}
// v6.01: regla de la reposición genérica, sin ambigüedad tras la renumeración (dia de la intensiva + dia_mant de origen), DERIVADA de
// las filas del carril B banqueo1h (antes: «instancias de 61-92 no hechas (study_checks sin ✓)», ambiguo con dia 58-107)
const cbBanqueoDias = cbFilas.filter((r) => r.tipo === 'banqueo1h').map((r) => ({ dia: diaDeFecha(r.fecha), mant: r.dia })).filter((x) => x.dia != null);
const REGLA_REPO = cbBanqueoDias.length
  ? `1) filas del carril B dia ${Math.min(...cbBanqueoDias.map((x) => x.dia))}-${Math.max(...cbBanqueoDias.map((x) => x.dia))} (dia_mant ${Math.min(...cbBanqueoDias.map((x) => x.mant))}-${Math.max(...cbBanqueoDias.map((x) => x.mant))}, extra.carril_b.tipo 'banqueo1h') sin ✓ en D{dia}:b_*, en orden; 2) si no hay: lista de vigilancia = temasCalientes() del día`
  : '1) filas del carril B (extra.carril_b.tipo \'banqueo1h\') sin ✓ en D{dia}:b_*, en orden; 2) si no hay: lista de vigilancia = temasCalientes() del día';

// ── reparto y orden del barrido (núcleo) ──
const REPARTO_DEF = { 'I-3': 7, 'V-2': 5, 'IV-1+IV-2': 4, 'I-4': 4, 'II-3': 4, 'III-5': 3, 'II-4': 3, 'II-5': 2 };
// orden base r2 (Anexo B): S3, S5, S6 y S7 permutados dentro de su semana → 0 días con el mismo código en la mañana y en el carril B
const ORDEN_BASE_R2 = {
  '2027-01-11': ['I-3', 'V-2', 'II-3', 'I-4'], '2027-01-18': ['IV', 'I-3', 'III-5', 'II-4'], '2027-01-25': ['I-3', 'V-2', 'II-5', 'I-4'],
  '2027-02-01': ['II-3', 'I-3', 'V-2', 'IV'], '2027-02-08': ['I-3', 'III-5', 'I-4', 'II-4'], '2027-02-15': ['II-3', 'I-3', 'V-2', 'IV'],
  '2027-02-22': ['I-3', 'III-5', 'II-4', 'II-5'], '2027-03-01': ['V-2', 'IV', 'II-3', 'I-4'],
};
const leerJSONArg = (a) => JSON.parse(a.trim().startsWith('{') || a.trim().startsWith('[') ? a : fs.readFileSync(path.resolve(a), 'utf8'));
const multiset = (arr) => arr.reduce((o, c) => ((o[c] = (o[c] || 0) + 1), o), {});
const mismoMultiset = (a, b) => { const ka = Object.keys(a).filter((k) => a[k]), kb = Object.keys(b).filter((k) => b[k]); return ka.length === kb.length && ka.every((k) => a[k] === b[k]); };
// intercala pasadas (todos los códigos una vez, luego la 2.ª…) y asigna cada slot al primer código de la cola que NO choque con el carril B
function ordenarConRestriccion(ordenCodigos, porCodigo) {
  const cola = []; const rest = { ...porCodigo }; let alguno = true;
  while (alguno) { alguno = false; for (const c of ordenCodigos) if (rest[c] > 0) { cola.push(c); rest[c]--; alguno = true; } }
  if (cola.length !== SLOTS) throw new Error(`reparto con ${cola.length} slots ≠ ${SLOTS}`);
  return SLOTS_BARRIDO.map((fecha) => {
    const j = cola.findIndex((c) => !choca(c, cbCodigoDe(fecha)));
    if (j < 0) throw new Error(`sin código posible para el slot ${fecha} sin chocar con el carril B (${cbCodigoDe(fecha)})`);
    return cola.splice(j, 1)[0];
  });
}
let ordenSlots, notaBrecha;
if (ORDEN_ARG) {
  const ob = leerJSONArg(ORDEN_ARG);
  ordenSlots = SLOTS_BARRIDO.map((fecha) => { const sem = ob[lunesDe(fecha)]; const c = sem && sem[dowDe(fecha) - 1]; if (!c) throw new Error(`--orden-base: falta el código del slot ${fecha}`); return normV3(c); });
  notaBrecha = 'orden explícito (--orden-base)';
} else if (PRETEST) {
  const pj = JSON.parse(fs.readFileSync(path.resolve(PRETEST), 'utf8'));
  const acc = {};
  for (const p of pj.preguntas || []) { const c = normV3(p.codigo); acc[c] = acc[c] || { n: 0, seguras: 0 }; acc[c].n++; if (p.ok && Number(p.confianza) === 3) acc[c].seguras++; }
  const brecha = Object.entries(acc).map(([c, v]) => ({ c, n: v.n, brecha: v.n * (1 - v.seguras / v.n), pct: v.seguras / v.n })).sort((a, b) => b.brecha - a.brecha);
  // v6.00: SLOTS slots (32): cada crítico ≥ 1 SIEMPRE (§C3); el resto por brecha (críticos y no críticos), tope 3 por cada 16 slots
  const porCodigo = {}; let libres = SLOTS; const tope = Math.ceil((3 * SLOTS) / 16);
  for (const c of CRITICOS_V3) { porCodigo[c] = 1; libres--; }
  for (const b of brecha) { while (libres > 0 && b.brecha > 0 && (porCodigo[b.c] || 0) < tope) { porCodigo[b.c] = (porCodigo[b.c] || 0) + 1; libres--; if (b.brecha < 1.5) break; } if (libres <= 0) break; }
  const orden = Object.keys(porCodigo).sort((a, b) => ((brecha.find((x) => x.c === b) || {}).brecha || 0) - ((brecha.find((x) => x.c === a) || {}).brecha || 0));
  for (let k = 0; libres > 0; k++) { porCodigo[orden[k % orden.length]]++; libres--; } // sobrantes: por orden de brecha
  ordenSlots = ordenarConRestriccion(orden, porCodigo);
  notaBrecha = `re-ordenado por índice de brecha del PRETEST_2026-II (${pj.puntaje || '?'}): ` + brecha.slice(0, 8).map((b) => `${b.c} ${b.brecha.toFixed(1)}`).join(' · ');
} else if (REPARTO_ARG) {
  const rp = leerJSONArg(REPARTO_ARG); const porCodigo = {};
  for (const [c, n] of Object.entries(rp)) porCodigo[normV3(c)] = Number(n);
  ordenSlots = ordenarConRestriccion(Object.keys(porCodigo), porCodigo);
  notaBrecha = 'reparto explícito (--reparto) intercalado por pasadas';
} else {
  ordenSlots = SLOTS_BARRIDO.map((fecha) => { const sem = ORDEN_BASE_R2[lunesDe(fecha)]; const c = sem && sem[dowDe(fecha) - 1]; if (!c) throw new Error(`orden base r2 sin el slot ${fecha} (cambió el núcleo: usa --reparto u --orden-base)`); return normV3(c); });
  if (!mismoMultiset(multiset(ordenSlots), REPARTO_DEF)) throw new Error('el orden base r2 no reproduce el reparto por defecto');
  notaBrecha = 'orden base r2 (reparto por defecto I-3 7 · V-2 5 · IV 4 · I-4 4 · II-3 4 · III-5 3 · II-4 3 · II-5 2; sin pre-test aún)';
}
const choques = SLOTS_BARRIDO.filter((fecha, k) => choca(ordenSlots[k], cbCodigoDe(fecha)));
if (choques.length) throw new Error(`orden del barrido: ${choques.length} día(s) con el mismo código en la mañana y en el carril B: ${choques.join(', ')}`);

// ── siembra ──
const esc = (s) => String(s).replace(/'/g, "''");
const J = (o) => `'${esc(JSON.stringify(o))}'::jsonb`;
const filas = [];
const subCount = {};
const historial = []; // {i, codigo} → repaso D-1 / D-7 / D-21
const repasoDe = (i) => {
  const out = {};
  for (const [k, back] of [['D-1', 1], ['D-7', 7], ['D-21', 21]]) { const h = historial.filter((x) => x.i <= i - back); if (h.length) out[k] = h[h.length - 1].codigo; }
  return out;
};
let simIdx = 0, colaIdx = 0, calIdx = 0;
const calent = ['I-3', 'V-2', 'II-3'];
const watchList = () => { const cl = [0, 1, 2].map((k) => COLA_LARGA[(colaIdx + k) % COLA_LARGA.length]); colaIdx += 3; return cl; };
const simExtra = (s, n) => ({ n: 100, seg_por_q: 72, ...s, hora: horaSim(n, s), num: n, correccion: 'por código v3 + formato (viñeta/cifra) · registro en _registro_resoluciones.json' });
plan.forEach(({ fecha, dow }, i) => {
  const dia = offset + i + 1;
  let tipo, codigo = null, subtema, prio = 'CRITICA', secs = null;
  const extra = { fase: 'INTENSIVA', semana: semana(fecha) + 1 }; // v6.00: sin dias_a_examen (la app lo calcula con exam_date)
  const kCola = COLA.indexOf(fecha);
  if (kCola === 4) {
    tipo = 'medio_dia'; subtema = 'D-1 · MEDIO DÍA: 30 min de cifras + hoja de errores del dress rehearsal · sin material nuevo · dormir 7 h';
    extra.regla = 'doctrina del sprint 2026-II: D-1 medio día, cero preguntas nuevas';
  } else if (kCola === 3) {
    tipo = 'dress_rehearsal'; subtema = 'D-2 · DRESS REHEARSAL 11:00-13:00: simulacro 100Q / 72 s/Q a la hora del examen, ropa, comida y traslado simulados · corrección por código';
    extra.sim = { n: 100, seg_por_q: 72, hora: '11:00', clave: 'consenso QX + Theomed + norma (si no, verificada por ítem)',
      fuente: '2026-I real (QX BanqueApp / Theomed) SOLO si hay clave por consenso QX+Theomed+norma; si no, gen_encaps_minisim.js --sim100 propio (mix vector v3, 50/50, rebotes + señales)' };
  } else if (kCola === 1 || kCola === 2) {
    tipo = 'repaso_final'; prio = 'ALTA';
    subtema = 'REPASO FINAL · sin material nuevo: errores del registro + cifras + mapas en blanco de los 8 críticos';
    extra.cola = 'repaso_final'; extra.repaso = repasoDe(i);
  } else if (kCola === 0) {
    tipo = 'loop';
    subtema = 'COLA · PASADA PROFUNDA del sub-eje peor (según los SIM 100Q y el registro) · sin material nuevo fuera del sub-eje';
    extra.cola = 'profunda'; extra.loop = LOOP; extra.nota_horas = NOTA_HORAS; extra.repaso = repasoDe(i); extra.regla = NOTA_PROFUNDA;
  } else if (fecha === PRETEST_FECHA) {
    tipo = 'pretest'; subtema = 'PRE-TEST 2026-II · 100Q / 72 s/Q · examen real 2026-II (clave oficial 100/100) · corrección por código vs vector v3 · umbral ≥70';
    extra.sim = { n: 100, seg_por_q: 72, hora: '07:15', fuente: '_examen_2026-2_items.json · runner gen_encaps_minisim.js --pretest', doc: 'PRETEST_2026-II.md', registro: 'ronda PRETEST_2026-II' };
  } else if (S1.includes(fecha)) {
    if (fecha === S1[0]) {
      tipo = 'senales'; subtema = 'RE-SCAN DE SEÑALES: QX Tendencias 2027-I · boletín DGE/sala situacional · RM/NTS MINSA publicadas desde sep-2026 · convocatoria SERUMS 2027-I → actualizar SENALES_2027-I.md y pesos del v3';
      extra.doc = 'SENALES_2027-I.md'; prio = 'ALTA';
    } else {
      tipo = 'loop'; codigo = calent[calIdx % calent.length]; calIdx++;
      subtema = `CALENTAMIENTO (sin material nuevo) · ${temaInfo(codigo).label}`;
      extra.loop = LOOP; extra.nota_horas = NOTA_HORAS; extra.repaso = repasoDe(i); historial.push({ i, codigo });
    }
  } else if (SIM_NUCLEO.includes(fecha) || (MODULOS.includes(fecha) && fecha === ultimoHabilSemana(fecha, MODULOS))) {
    tipo = 'sim100'; simIdx++;
    const enModulo = MODULOS.includes(fecha);
    const s = (!enModulo && SIMS[simIdx - 1]) || { label: `SIM 100Q · módulo de extensión · propio #${simIdx - 5} (gen_encaps_minisim.js --sim100 propio)`, fuente: 'BANCO_PROPIO · gen_encaps_minisim.js --sim100 propio', clave: 'verificada por ítem' };
    subtema = `SIMULACRO ${simIdx} · ${s.label}`;
    extra.sim = simExtra(s, simIdx);
    if (enModulo) { extra.modulo = { semana: semanasModulo.indexOf(lunesDe(fecha)) + 1, rol: 'sim100' }; if (dow !== 5) extra.sim.nota = `en ${WD[dow]} por día sin sesión (regla del módulo parcial)`; }
  } else if (SLOTS_BARRIDO.includes(fecha)) {
    tipo = 'loop';
    const cv3 = ordenSlots[SLOTS_BARRIDO.indexOf(fecha)];
    const [cs, paraguas] = siembraDe(cv3); codigo = cs;
    const n = (subCount[cs] = (subCount[cs] || 0) + 1);
    const se = SUB_EJES[cs]; let eje = null;
    if (se) eje = se.ejes[(n - 1) % se.ejes.length];
    subtema = `BARRIDO CRÍTICO ${cv3} · pasada ${Math.ceil(n / (se ? Math.min(se.ejes.length, 2) : 1)) > 1 ? 2 : 1}${eje ? ' · ' + eje.label : ' · ' + temaInfo(cs).label}`;
    if (subtema.length > 240) subtema = subtema.slice(0, 237) + '…';
    secs = [];
    for (const p of paraguas || []) secs.push({ codigo: p, subtema: temaInfo(p).label, prioridad: 'CRITICA', rol: 'paraguas' });
    extra.loop = LOOP; extra.nota_horas = NOTA_HORAS; extra.critico_v3 = cv3; extra.instancia = n; extra.sub_eje = eje ? eje.key : null;
    extra.drill_cifras = 'CIFRAS_CRITICAS_2027-I.md · 10 min dentro del deep prime'; extra.repaso = repasoDe(i); extra.brecha = notaBrecha;
    historial.push({ i, codigo: cv3 });
  } else if (MODULOS.includes(fecha)) {
    const m = semanasModulo.indexOf(lunesDe(fecha));
    const k = MODULOS.filter((x) => lunesDe(x) === lunesDe(fecha) && x < fecha).length;
    const rol = MOD_ROLES[Math.min(k, 3)];
    tipo = 'loop'; extra.loop = LOOP; extra.nota_horas = NOTA_HORAS; extra.repaso = repasoDe(i); extra.modulo = { semana: m + 1, rol };
    if (rol === 'profunda1' || rol === 'profunda2') {
      subtema = `MÓDULO DE EXTENSIÓN · PASADA PROFUNDA #${rol === 'profunda1' ? 1 : 2} del sub-eje peor (según los SIM 100Q y el registro)`;
      extra.regla = NOTA_PROFUNDA;
    } else if (rol === 'rebote') {
      codigo = REBOTE_V3[m % REBOTE_V3.length]; prio = 'ALTA';
      const se = SUB_EJES[codigo]; const eje = se ? se.ejes[0] : null;
      subtema = `MÓDULO · REBOTE ${codigo} (cola larga, anti-persistente, lección L4) · ${eje ? eje.label : temaInfo(codigo).label}`;
      const cl = COLA_LARGA[colaIdx % COLA_LARGA.length]; colaIdx++;
      secs = [{ codigo: siembraDe(cl.codigo)[0], subtema: cl.label, prioridad: 'MEDIA', rol: 'cola_larga', q: '5-6' }];
      extra.secundario = cl.codigo; historial.push({ i, codigo });
    } else {
      const cl = watchList();
      codigo = siembraDe(cl[0].codigo)[0]; prio = 'MEDIA';
      subtema = `MÓDULO · LISTA DE VIGILANCIA (cola larga) · ${cl[0].codigo}: ${cl[0].label}`;
      if (subtema.length > 240) subtema = subtema.slice(0, 237) + '…';
      secs = cl.slice(1).map((c) => ({ codigo: siembraDe(c.codigo)[0], subtema: c.label, prioridad: 'MEDIA', rol: 'cola_larga', q: '8-10' }));
      extra.cola_larga = cl.map((c) => c.codigo); historial.push({ i, codigo });
    }
    extra.repaso_registro = 'repaso multi-temporal de TODO _registro_resoluciones.json (fallos CCSN/CONCEPTO/OLVIDO) en el segmento 07:15';
  } else {
    throw new Error(`fecha sin rol en el esqueleto: ${fecha}`);
  }
  // ── carril B (16:15): fila MANTENIMIENTO v5.20 de la misma fecha · mini-sim absorbido · reposición ──
  const cb = cbPorFecha[fecha];
  if (cb) {
    // v6.00: exigía cb.dia === dia · v6.01: desfase constante = Σ hábiles perdidos (dia_mant es la etiqueta de origen 61-92)
    if (DESFASE_CB != null && cb.dia - dia !== DESFASE_CB) throw new Error(`carril B: la fila mant. ${cb.dia} (${fecha}) cae en el dia ${dia} de la intensiva: desfase ${cb.dia - dia} ≠ ${DESFASE_CB} (Σ hábiles perdidos en _fechas_v6.json corrimientos)`);
    if (cb.tipo === 'banqueo1h') {
      if (['sim100', 'pretest', 'dress_rehearsal', 'medio_dia'].includes(tipo)) throw new Error(`carril B banqueo1h en un día ${tipo} (${fecha})`);
      extra.carril_b = { origen: 'mantenimiento_v5.20', dia_mant: cb.dia, fecha: cb.fecha, tipo: 'banqueo1h', codigo: cb.codigo, subtema: cb.subtema,
        prioridad: cb.prioridad, nts: cb.nts ?? null, temas_secundarios: cb.temas_secundarios, extra: cb.extra };
    } else if (cb.tipo === 'mini_sim') {
      if (!['sim100', 'pretest'].includes(tipo)) throw new Error(`mini-sim absorbido en un día ${tipo} (${fecha}): debe ser el SIM 100Q del viernes`);
      extra.minisim_absorbido = { dia_mant: cb.dia, subtema: cb.subtema, extra: cb.extra };
    } else throw new Error(`carril B: tipo desconocido ${cb.tipo} (${fecha})`);
  } else if (fecha > cbUltima && fecha <= COLA[2] && dow >= 1 && dow <= 4 && !['sim100', 'pretest', 'dress_rehearsal', 'medio_dia'].includes(tipo)) {
    extra.carril_b = { tipo: 'reposicion', regla: REGLA_REPO };
    // v6.01: los PENDIENTES F1 (filas que el corrimiento dejó fuera de la F1: banqueo1h y mini-sims) van EXPLÍCITOS en los primeros días de
    // reposición; la copia embebida es la fila del JSON tal cual (con destino / reposicion), sin claves añadidas
    if (PEND_POR_FECHA[fecha]) {
      const p = PEND_POR_FECHA[fecha];
      extra.carril_b.pendiente_f1 = JSON.parse(JSON.stringify(p));
      const deF1 = `fila mant. ${p.dia_mant} de la F1 ${String(p.origen || '').replace('mantenimiento_', '')} (${p.fecha_original}) que no cupo en la F1 tras el corrimiento`;
      extra.carril_b.regla = p.tipo === 'mini_sim'
        ? `PENDIENTE F1 (${p.corrimiento}) · MINI-SIMULACRO: ${deF1} → se hace HOY a las 16:15 como mini-simulacro 25Q mixto cronometrado (${p.extra.seg_por_q} s/Q, receta íntegra en pendiente_f1.extra, cola larga ${(p.extra.cola_larga || []).join(' + ')}) + corrección y cierre tipo mini_sim; después, la regla general: ${REGLA_REPO}`
        : `PENDIENTE F1 (${p.corrimiento}): ${deF1} → se hace HOY a las 16:15; después, la regla general: ${REGLA_REPO}`;
    }
  }
  filas.push({ dia, fecha, dow, tipo, codigo, subtema, prio, secs, extra });
});

// ── verificación (aborta si algo no cuadra; no escribe nada) ──
const fallos = [];
const ok = (cond, msg) => { if (!cond) fallos.push(msg); };
ok(filas.every((r) => r.dow >= 1 && r.dow <= 5), 'hay filas en fin de semana');
ok(filas.every((r) => !SKIP_INT.has(r.fecha)), 'hay filas en SKIP');
ok(filas.every((r, k) => r.dia === offset + 1 + k), '`dia` no es contiguo');
ok(JSON.stringify(filas.slice(-5).map((r) => r.tipo)) === JSON.stringify(['loop', 'repaso_final', 'repaso_final', 'dress_rehearsal', 'medio_dia']), 'la cola no es loop · repaso_final ×2 · dress · medio_dia');
ok(filas.slice(-5).map((r) => r.fecha).join() === COLA.join(), 'la cola no son los 5 últimos hábiles');
ok(filas.filter((r) => r.extra.critico_v3).length === SLOTS, `slots de barrido ≠ ${SLOTS}`);
ok(filas.every((r) => !('dias_a_examen' in r.extra)), 'quedó extra.dias_a_examen');
const nCbB = filas.filter((r) => r.extra.carril_b && r.extra.carril_b.tipo === 'banqueo1h').length;
const nCbM = filas.filter((r) => r.extra.minisim_absorbido).length;
const nRepo = filas.filter((r) => r.extra.carril_b && r.extra.carril_b.tipo === 'reposicion').length;
ok(nCbB === cbFilas.filter((r) => r.tipo === 'banqueo1h').length, `carril B banqueo1h ${nCbB} ≠ JSON`);
ok(nCbM === cbFilas.filter((r) => r.tipo === 'mini_sim').length, `mini-sims absorbidos ${nCbM} ≠ JSON`);
ok(cbFilas.every((r) => filas.some((x) => x.fecha === r.fecha)), 'hay filas del carril B fuera de la intensiva');
ok(filas.every((r) => r.tipo !== 'sim100' || !r.extra.carril_b), 'carril B en un día de SIM');
for (const lun of semanasModulo) { const sem = MODULOS.filter((x) => lunesDe(x) === lun); const r = filas.find((x) => x.fecha === sem.at(-1)); ok(r && r.tipo === 'sim100', `módulo ${lun}: el último hábil no es el sim100`); }
ok(filas.filter((r) => r.tipo === 'pretest').length === 1 && filas.find((r) => r.tipo === 'pretest').fecha === PRETEST_FECHA, 'pre-test');
const cbCodigoFila = (r) => (r.extra.carril_b ? r.extra.carril_b.codigo || (r.extra.carril_b.pendiente_f1 || {}).codigo || null : null); // v6.01: + pendiente F1
const choquesFinal = filas.filter((r) => r.extra.critico_v3 && r.extra.carril_b && choca(r.extra.critico_v3, cbCodigoFila(r))).map((r) => r.fecha);
ok(!choquesFinal.length, `choques barrido = carril B: ${choquesFinal.join(', ')}`);
// v6.01: cada pendiente F1 está en un día de reposición, en orden, una sola vez
const nPendF1 = filas.filter((r) => r.extra.carril_b && r.extra.carril_b.pendiente_f1).length;
ok(nPendF1 === pendF1.length, `pendientes F1 sembrados ${nPendF1} ≠ ${pendF1.length} del JSON`);
ok(filas.filter((r) => r.extra.carril_b && r.extra.carril_b.pendiente_f1).every((r, k) => r.fecha === REPO_FECHAS[k] && r.extra.carril_b.tipo === 'reposicion'), 'pendientes F1 fuera de los primeros días de reposición');
// v6.01: copia embebida = fila del JSON (idéntica, incl. destino/reposicion) · el mini-sim pendiente cae en lun-jue sin SIM y conserva su receta
ok(filas.filter((r) => r.extra.carril_b && r.extra.carril_b.pendiente_f1).every((r) => { const p = PEND_POR_FECHA[r.fecha]; return p && JSON.stringify(r.extra.carril_b.pendiente_f1) === JSON.stringify(p) && p.reposicion.dia === r.dia && p.reposicion.fecha === r.fecha; }), 'pendiente_f1 embebido ≠ fila de _pendientes_f1.json');
ok(filas.filter((r) => r.extra.carril_b && r.extra.carril_b.pendiente_f1 && r.extra.carril_b.pendiente_f1.tipo === 'mini_sim').every((r) => r.dow >= 1 && r.dow <= 4 && !['sim100', 'pretest', 'dress_rehearsal', 'medio_dia'].includes(r.tipo) && r.extra.carril_b.pendiente_f1.extra.seg_por_q === 72), 'mini-sim pendiente F1 en un día de SIM / viernes o sin su receta');
ok(pendF1.filter((p) => p.tipo === 'banqueo1h').every((p, k, a) => k === 0 || p.reposicion.fecha > a[k - 1].reposicion.fecha) && pendF1.filter((p) => p.tipo === 'mini_sim').every((s) => pendF1.filter((p) => p.tipo === 'banqueo1h' && p.corrimiento === s.corrimiento).every((p) => p.reposicion.fecha < s.reposicion.fecha)), 'orden de reposición: banqueo1h (por dia_mant) y después mini-sims');
if (ESCENARIO_JSON) ok(filas[0].dia === F6.f1.dias + 1, `la intensiva empieza en el dia ${filas[0].dia} y debe ser f1.dias + 1 = ${F6.f1.dias + 1}`);
if (fallos.length) { console.error('⛔ verificación:\n  · ' + fallos.join('\n  · ')); process.exit(1); }

// ── SQL ──
const emitidas = DESDE ? filas.filter((r) => r.fecha >= DESDE) : filas;
if (!emitidas.length) throw new Error(`--desde ${DESDE}: no queda ninguna fila (la intensiva termina el ${plan[N - 1].fecha})`);
if (DESDE && !filas.some((r) => r.fecha === DESDE)) console.warn(`⚠ --desde ${DESDE} no es un día de la intensiva: se emiten las filas desde ${emitidas[0].fecha}`);
const values = emitidas.map((r) => `('ENCAPS',${r.dia},'${r.fecha}','${WD[r.dow]}','${r.tipo}',${r.codigo ? `'${r.codigo}'` : 'NULL'},'${esc(r.subtema)}','${r.prio}','INTENSIVO','[]'::jsonb,'[]'::jsonb,'[]'::jsonb,${r.secs ? J(r.secs) : 'NULL'},${J(r.extra)})`);
const delFiltro = `examen = 'ENCAPS' AND modo = 'INTENSIVO'${DESDE ? ` AND fecha >= '${DESDE}'` : ''}`;
const nSimNucleo = filas.filter((r) => r.tipo === 'sim100' && !r.extra.modulo).length;
const repoFechas = filas.filter((r) => r.extra.carril_b && r.extra.carril_b.tipo === 'reposicion').map((r) => r.fecha);
const tope = V6.convocatoriaTopeDe(EXAMEN);
const provisional = ESCENARIO_JSON ? !!F6.encaps.provisional : true;
// v6.02: la etiqueta PROVISIONAL lleva el rango de versiones que la sostienen (v6.00 → v6.02: «PROVISIONAL v6.00-v6.02»; v6.01 decía «v6.00»)
const VRANGO = VTAG === 'v6.00' ? 'v6.00' : `v6.00-${VTAG}`;
const examenTarget = EXAMEN === '2027-03-14' && provisional
  ? `2027-03-14 (dom · PROVISIONAL ${VRANGO}: «más o menos el 14»; 6/6 ENCAPS previos en domingo; se fija con la convocatoria; regla convocatoria = examen − 25 d → sin convocatoria al mié 17-feb se descarta el 14-mar y se pasa al escenario siguiente)`
  : provisional
    ? `${EXAMEN} (${fCorta(EXAMEN).split(' ')[0]} · PROVISIONAL ${VRANGO}: escenario de §A5; se fija con la convocatoria; regla convocatoria = examen − 25 d → sin convocatoria al ${fCorta(tope)} se descarta el ${fDia(EXAMEN)} y se pasa al escenario siguiente)`
    : `${EXAMEN} (${fCorta(EXAMEN).split(' ')[0]} · CONFIRMADO por la convocatoria SERUMS 2027-I · v6.00)`;
const nucleoDesde = NUCLEO[0], trasNucleo = plan.find((p) => p.fecha > NUCLEO_HASTA).fecha;
// v6.01: versión del régimen = la del último corrimiento de _fechas_v6.json (v6.00 sin corrimientos); el MANTENIMIENTO sube un número por régimen
const VERSION_V6 = VTAG; // v6.02: = VTAG (definido arriba para el nombre del backup)
const MANT_V = CORRIMIENTOS.length ? `v6.${19 + CORRIMIENTOS.length}` : 'v6.19'; // v6.00: v6.19 · v6.01: v6.20 · v6.02: v6.21 · v6.03: v6.22 · v6.05: v6.23 (la v6.04 no fue corrimiento)
const ultCorr = CORRIMIENTOS.at(-1) || null;
const metricsExtra = {
  d1: BASE, dias_ciclo: offset,
  regimen: `MANTENIMIENTO_2027-1 ${MANT_V} (${offset} d) + INTENSIVA ${VERSION_V6} (núcleo ${fDia(D1)} → ${fDia(NUCLEO_HASTA)} + cola anclada)`,
  exam_date: EXAMEN, examen_target: examenTarget, backup: BK_BASE,
  // v6.01: la nota estática de días al examen decía «2027-03-10 (v5.20)»: la app y el daemon ya lo calculan con exam_date
  dias_a_examen_nota: `vivo: la app (diasAExamenDe) y el daemon calculan exam_date − hoy (Lima); study_metrics.dias_a_examen es solo el fallback estático. ${VERSION_V6} (${hoyLima()}): exam_date = ${EXAMEN}${provisional ? ' PROVISIONAL' : ''}.`,
  ...(ultCorr ? { corrimiento: {
    version: ultCorr.version, fecha: ultCorr.fecha, d1_previo: ultCorr.d1_previo, d1: ultCorr.d1, perdidos: ultCorr.perdidos, regla_fechas_v6: ultCorr.regla,
    regla_encaps: `F1 ENCAPS rígida por slots (dia 1-${offset}); ${pendF1.length} pendiente(s) F1 que no caben (${pendF1.filter((p) => p.tipo === 'banqueo1h').length} banqueo1h + ${pendF1.filter((p) => p.tipo === 'mini_sim').length} mini-sim${[...new Set(pendF1.map((p) => p.corrimiento))].length > 1 ? `; por corrimiento: ${[...new Set(pendF1.map((p) => p.corrimiento))].map((c) => `${c} ${pendF1.filter((p) => p.corrimiento === c).length}`).join(' + ')}` : ''}) → reposición EXPLÍCITA en el carril B 16:15; nada se descarta ni se absorbe (0 mini-sims F1 absorbidos); intensiva renumerada con las mismas fechas`,
    f1: `dia 1-${offset} (${BASE} → ${F6.f1.fin}); la F1 no se alarga`, intensiva_renumerada: `dia ${offset + 1}-${offset + N} (mismas fechas ${plan[0].fecha} → ${plan[N - 1].fecha})`,
    carril_b_dia_mant: 'etiqueta de ORIGEN 61-92 (v5.20), sin cambio', historial: CORRIMIENTOS.map((c) => `${c.version} ${c.fecha}: D1 ${c.d1_previo} → ${c.d1}`),
    pendientes_f1: pendF1.map((p) => ({ corrimiento: p.corrimiento, tipo: p.tipo, dia_mant: p.dia_mant, fecha_original: p.fecha_original, codigo: p.codigo || null, // v6.02: + corrimiento (dia_mant es de la F1 de origen)
      ...(p.tipo === 'mini_sim' ? { cola_larga: p.extra.cola_larga, n: 25, seg_por_q: p.extra.seg_por_q } : { sub_eje: p.extra.sub_eje || null, instancia: p.extra.instancia }),
      reposicion: p.reposicion ? p.reposicion.fecha : null, dia: p.reposicion ? p.reposicion.dia : null })),
    regla_reposicion: REGLA_REPO,
    fuente_pendientes: PENDIENTES_F1 ? path.relative(ROOT, PENDIENTES_F1).replace(/\\/g, '/') : null,
  } } : {}),
  intensiva: {
    desde: plan[0].fecha, hasta: plan[N - 1].fecha, dias: `${offset + 1}-${offset + N}`, pretest: PRETEST_FECHA,
    nucleo: { desde: nucleoDesde, hasta: NUCLEO_HASTA, slots_barrido: SLOTS, sims: nSimNucleo },
    cola: { desde: COLA[0], hasta: COLA[4], regla: 'D-5…D-1 anclada al examen' },
    modulos: Math.round((MODULOS.length / 5) * 10) / 10, modulos_dias: MODULOS.length,
    carril_b: { desde: cbFilas.map((r) => r.fecha).sort()[0], hasta: cbUltima, filas_mant: `${Math.min(...cbFilas.map((r) => r.dia))}-${Math.max(...cbFilas.map((r) => r.dia))}`, campo: 'extra.carril_b',
      reposicion: repoFechas.length ? `${repoFechas[0]} → ${repoFechas.at(-1)}` : null,
      pendientes_f1: pendF1.length ? Object.entries(PEND_POR_FECHA).map(([f, p]) => `${f} (dia ${p.reposicion.dia}): ${descPend(p)}`) : [] },
    backup: BK,
    regenerar: `tras el PRE-TEST (${fCorta(PRETEST_FECHA)}): gen_encaps_intensivo_2027.js --pretest <export.json> --desde ${nucleoDesde}; tras la convocatoria: con la fecha real --desde ${trasNucleo} (filas > ${NUCLEO_HASTA}); --carril-b siempre`,
  },
};
// v6.01: horarios._nota (texto de la hora 16:15 del mantenimiento) se reescribe con las fechas vigentes (decía «v5.20 … D1 = mié 7-oct …»)
const f1Hab = habiles(BASE, F6.f1.fin), f1Vie = f1Hab.filter((p) => p.dow === 5).map((p) => p.fecha), f1LJ = f1Hab.filter((p) => p.dow !== 5).map((p) => p.fecha);
const notaHorarios = `${VERSION_V6} (${hoyLima()}; D1 = ${fCorta(BASE)}; F1 = ${offset} días hasta el ${fCorta(F6.f1.fin)}; pre-test de arranque ${fCorta(f1LJ[0])} + ${fCorta(f1LJ[1])} = D1 + D2; mini-sims todos los viernes ${fDia(f1Vie[0])} … ${fDia(f1Vie.at(-1))} (el último = CHECKPOINT DEL AÑO); INTENSIVA ${fCorta(plan[0].fecha)} → ${fCorta(plan[N - 1].fecha)} = dia ${offset + 1}-${offset + N} con CARRIL B 16:15 (filas 61-92 de v5.20 + reposición${pendF1.length ? ` con ${pendF1.length} pendiente(s) F1: ${Object.entries(PEND_POR_FECHA).map(([f, p]) => `${fCorta(f)} ${p.tipo === 'mini_sim' ? 'mini-sim 25Q' : p.codigo}`).join(', ')}` : ''}); examen ENCAPS ${fCorta(EXAMEN)}${provisional ? ' PROVISIONAL' : ''}): 1h/día 16:15-17:15 L-V según DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md · weekday = lun-jue · weekend = plantilla del VIERNES mini-sim (la app la usa solo si today.simulacro está seteado) · sáb/dom libres · el horario deep-prime anterior quedó en horarios_legacy_deep_prime · regla REAL de la eval anclada (gen_encaps_semana.js): fallos ≥2 → código CALIENTE para el override del viernes (semana siguiente); NO desplaza al tema del día siguiente · semana 1 (${fCorta(f1LJ[0])} y ${fCorta(f1LJ[1])}): PRE-TEST DE ARRANQUE 40Q (5Q × 8 críticos, ítems reales 2024-2A→2025-2) sustituye el CONTENIDO del banco del día, no el horario`;
// v6.02 (17-oct): 3 pasos de horarios que la app pinta (EncapsPlanView HorarioView) seguían con fechas de v6.00. Se reescriben POR RUTA
// (jsonb_set de pasos[0].d; hora, título, fuente y apex del objeto no se tocan) y se DERIVAN de las filas F1 vigentes (_encaps_mantenimiento_2027.sql):
//   · weekday[0] 16:15 EVAL ANCLADA: D1 = f1.inicio lleva eval_<D1> (5Q de fallos previos) antes de la parte 1 del pre-test · D2 = eval del
//     código de AYER (fila dia 1) antes de la parte 2 · D3 = eval del código de la fila dia 2 · primer viernes = mini-sim
//     (v6.00 decía mié 7 / jue 8 / lun 12-oct · eval_2026-10-07)
//   · weekday[1] 16:30 BANCO DEL DÍA: «<D1> y <D2>: PRE-TEST DE ARRANQUE 20Q + 20Q …» (v6.00: «Mié 7 y jue 8-oct»)
//   · weekend[1] 16:45 corrección del viernes: el comando que imprime gen_encaps_semana.js en «Cómo aplicar»:
//     gen_encaps_mantenimiento_2027.js <D1> --hasta <f1.fin> --override DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/override_<lunes>.json
//     (v6.00: «… 2026-10-07 --override SEMANAS/override_<lunes>.json», sin --hasta)
// El resto de cada texto va LITERAL en HORARIO_* (copiado del texto vivo el 17-oct). Una guarda DO va antes del UPDATE y ABORTA la transacción si
// el texto vivo ya no tiene ese texto fijo (md5 del prefijo y del sufijo) o si el objeto de la ruta no es el de esa hora y título. Así nunca se pisa
// un texto que el generador no conoce. Es idempotente: tras aplicarlo, el texto fijo sigue igual y la guarda vuelve a pasar.
const HORARIO_EVAL_FIJO = '5Q del código de AYER, de memoria, sin material: 3 cifras + 2 viñetas, solución al final. Lunes = 5Q rehechas con OTRO enfoque de los fallos del mini-sim del viernes; martes = código del lunes; miércoles = código del martes; jueves = código del miércoles (el viernes no lleva eval: el mini-sim ocupa las 16:15). Si fallas ≥2 → el código queda CALIENTE para el override del viernes (gen_encaps_semana.js: máx. 2 sustituciones/semana, I-3 y V-2 intocables, un crítico solo se cede si ya está ≥85 % con n ≥ 5). NO desplaza al tema del día siguiente.';
const HORARIO_BANCO_FIJO = '16-20Q del código ceñidas al sub-eje del día (◈ Sub-eje de hoy) + 4-5Q del secundario de cola larga, pregunta-por-pregunta con corrección inmediata (método Palmerton) y confianza 1-3 por ítem. Nivel ≥ examen real, distractor = concepto vecino. Orden de fuentes: BANCO_PROPIO (runner) → postests Theomed → banco QX (por área) → sets nuevos (motor 4 factores).';
const HORARIO_CIERRE_VIE_PRE = 'Corrección 1×1 por código → nota /25 en ▲ SIM (study_sim_scores, sim_n = día) + cierre con tipoRonda=mini_sim y nota=NN (umbral ≥18/25 hacia diciembre; <15/25 dos viernes seguidos → override obligatorio). Luego node DATA/_scripts/gen_encaps_semana.js --sql: % ciego semanal, temas calientes (n ≥ 5 por código) y override de la semana siguiente, que se ACUMULA en SEMANAS/overrides_acumulado.json → ';
const HORARIO_CIERRE_VIE_POST = ' → execute_sql (backup study_schedule_bk_<YYYYMMDD>, DELETE solo modo=MANTENIMIENTO).';
const SQL_MANT_F1 = path.join(__dirname, '_encaps_mantenimiento_2027.sql');
const filasF1 = (fs.existsSync(SQL_MANT_F1) ? fs.readFileSync(SQL_MANT_F1, 'utf8').split('\n') : [])
  .map((l) => l.match(/^\('ENCAPS',(\d+),'(20\d\d-\d\d-\d\d)','[^']+','([^']+)',(NULL|'[^']*'),/)).filter(Boolean)
  .map((m) => ({ dia: +m[1], fecha: m[2], tipo: m[3], codigo: m[4] === 'NULL' ? null : m[4].slice(1, -1) }));
const horarioTextos = (() => {
  const f1Dia = (n) => filasF1.find((r) => r.dia === n) || null;
  const r1 = f1Dia(1), r2 = f1Dia(2), r3 = f1Dia(3), vie1 = filasF1.filter((r) => r.tipo === 'mini_sim').sort((a, b) => a.dia - b.dia)[0] || null;
  const errs = [];
  if (f1LJ[0] !== BASE) errs.push(`el D1 ${BASE} no es lun-jue`);
  if (!r1 || r1.fecha !== BASE || r1.tipo !== 'banqueo1h' || !r1.codigo) errs.push(`fila dia 1 ≠ banqueo1h del D1 ${BASE} (${r1 ? `${r1.fecha} ${r1.tipo}` : 'no existe'})`);
  if (!r2 || r2.fecha !== f1LJ[1] || r2.tipo !== 'banqueo1h' || !r2.codigo) errs.push(`fila dia 2 ≠ banqueo1h del ${f1LJ[1]} (parte 2 del pre-test)`);
  if (!r3) errs.push('sin fila dia 3');
  if (!vie1 || vie1.fecha !== f1Vie[0]) errs.push(`el primer mini-sim no es el primer viernes de la F1 (${f1Vie[0]})`);
  if (errs.length) {
    const msg = `horarios weekday/weekend: no se derivan de ${path.basename(SQL_MANT_F1)}: ${errs.join(' · ')}`;
    if (ESCENARIO_JSON) throw new Error(`${msg} → regenera antes la F1 con gen_encaps_mantenimiento_2027.js`);
    console.warn(`⚠ ${msg} (prueba en seco: el UPDATE no reescribe esos 3 textos)`);
    return null;
  }
  const sinMes = (s) => fCorta(s).replace(/-[a-z]+$/, ''); // «mar 20»
  const par = r1.fecha.slice(0, 7) === r2.fecha.slice(0, 7) ? `${sinMes(r1.fecha)} y ${fCorta(r2.fecha)}` : `${fCorta(r1.fecha)} y ${fCorta(r2.fecha)}`;
  const tramoD3 = r3.tipo === 'mini_sim'
    ? `el ${fCorta(r3.fecha)} (D${r3.dia}) es mini-sim.`
    : `el ${fCorta(r3.fecha)} (D${r3.dia}) la eval es la de ${r2.codigo} (código del ${sinMes(r2.fecha)}); el ${fCorta(vie1.fecha)} (D${vie1.dia}) es mini-sim.`;
  const cmdViernes = `node DATA/_scripts/gen_encaps_mantenimiento_2027.js ${BASE} --hasta ${F6.f1.fin} --override DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/override_<lunes>.json`;
  return { r1, r2, r3, vie1, cmdViernes, rutas: [
    { ruta: ['weekday', 0], hora: '16:15-16:30', titulo: 'EVAL ANCLADA', ini: `${HORARIO_EVAL_FIJO} `, fin: '',
      d: `${HORARIO_EVAL_FIJO} D1 (${fCorta(r1.fecha)}, sin sesión anterior en el SQL): SÍ lleva eval — eval_${r1.fecha} = 5Q de fallos previos del registro (críticos primero) antes de la parte 1 del pre-test; el ${fCorta(r2.fecha)} (D2) la eval es la del código de AYER (${r1.codigo}), antes de la parte 2; ${tramoD3}` },
    { ruta: ['weekday', 1], hora: '16:30-17:10', titulo: 'BANCO DEL DÍA', ini: `${HORARIO_BANCO_FIJO} `, fin: '',
      d: `${HORARIO_BANCO_FIJO} ${par.charAt(0).toUpperCase()}${par.slice(1)}: PRE-TEST DE ARRANQUE 20Q + 20Q (pretest_arranque_<fecha>.html, modo examen 72 s/Q, solución al final) en vez del banco del día.` },
    { ruta: ['weekend', 1], hora: '16:45-17:15', titulo: 'Corrección', ini: HORARIO_CIERRE_VIE_PRE, fin: HORARIO_CIERRE_VIE_POST,
      d: `${HORARIO_CIERRE_VIE_PRE}${cmdViernes}${HORARIO_CIERRE_VIE_POST}` },
  ] };
})();
// runner: los ficheros que citan esos textos existen y su código cuadra con la fila (solo avisa: el texto sale de las filas, no de los ficheros)
const avisosHorario = [];
if (horarioTextos) {
  const { r1, r2, r3 } = horarioTextos;
  const BP = path.join(ROOT, 'DATA', 'ENCAPS', 'BANCO_PROPIO');
  const leerBP = (b) => { try { return JSON.parse(fs.readFileSync(path.join(BP, `${b}.json`), 'utf8')); } catch (e) { return null; } };
  const sust = (j) => (j._meta && j._meta.sustituye) || {};
  const esperados = [
    [`eval_${r1.fecha}`, (j) => j.codigo === 'MIX' && ((j._meta && j._meta.sesion_anterior) || {}).tipo === 'inicio_regimen', 'MIX · fallos previos (sin sesión anterior)'],
    [`eval_${r2.fecha}`, (j) => j.codigo === r1.codigo, `código de la fila dia 1 = ${r1.codigo}`],
    ...(r3.tipo === 'mini_sim' ? [] : [[`eval_${r3.fecha}`, (j) => j.codigo === r2.codigo, `código de la fila dia 2 = ${r2.codigo}`]]),
    [`pretest_arranque_${r1.fecha}`, (j) => sust(j).dia === 1 && sust(j).codigo === r1.codigo, `parte 1 · sustituye la fila dia 1 (${r1.codigo})`],
    [`pretest_arranque_${r2.fecha}`, (j) => sust(j).dia === 2 && sust(j).codigo === r2.codigo, `parte 2 · sustituye la fila dia 2 (${r2.codigo})`],
  ];
  for (const [b, cuadra, txt] of esperados) {
    const j = leerBP(b);
    if (!j || !fs.existsSync(path.join(BP, `${b}.html`))) avisosHorario.push(`falta BANCO_PROPIO/${b}.json o .html`);
    else if (!cuadra(j)) avisosHorario.push(`BANCO_PROPIO/${b}.json no cuadra: se esperaba ${txt} y trae ${j.codigo}`);
  }
  // el comando del viernes es el de gen_encaps_semana.js («Cómo aplicar»): si esa plantilla cambia, cambia aquí también
  const semSrc = fs.readFileSync(path.join(__dirname, 'gen_encaps_semana.js'), 'utf8');
  if (!semSrc.includes('node DATA/_scripts/gen_encaps_mantenimiento_2027.js ${D1} --hasta ${F1_FIN} --override DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/override_${lunesSig}.json')) avisosHorario.push('gen_encaps_semana.js ya no imprime «gen_encaps_mantenimiento_2027.js ${D1} --hasta ${F1_FIN} --override DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/override_<lunes>.json»: revisa cmdViernes');
  for (const a of avisosHorario) console.warn('⚠ horarios:', a);
}
const md5Hex = (s) => require('crypto').createHash('md5').update(s, 'utf8').digest('hex');
const nChars = (s) => [...s].length; // left()/right() de Postgres cuentan caracteres
const guardaHorarios = horarioTextos
  ? `DO $$ DECLARE h jsonb; BEGIN SELECT extra->'horarios' INTO h FROM study_metrics WHERE examen = 'ENCAPS';${horarioTextos.rutas.map((x) => {
    const o = `{${x.ruta.join(',')}`, p = `${o},pasos,0,d}`;
    const conds = [`h#>>'${o},hora}' = '${x.hora}'`, `h#>>'${o},titulo}' LIKE '${esc(x.titulo)}%'`, `md5(left(h#>>'${p}', ${nChars(x.ini)})) = '${md5Hex(x.ini)}'`,
      ...(x.fin ? [`md5(right(h#>>'${p}', ${nChars(x.fin)})) = '${md5Hex(x.fin)}'`] : [])];
    return ` IF NOT COALESCE(${conds.join(' AND ')}, false) THEN RAISE EXCEPTION 'horarios.${x.ruta.join('[')}] (${x.hora}): hora, título o texto fijo de pasos[0].d distintos de la plantilla de gen_encaps_intensivo_2027.js (HORARIO_*): no se pisa; revisa la plantilla'; END IF;`;
  }).join('')} END $$;`
  : null;
let extraExpr = `jsonb_set(COALESCE(extra, '{}'::jsonb) || ${J(metricsExtra)}, '{horarios}', COALESCE(extra->'horarios', '{}'::jsonb) || ${J({ intensiva: LOOP, _nota: notaHorarios })}, true)`;
if (horarioTextos) for (const x of horarioTextos.rutas) extraExpr = `jsonb_set(${extraExpr}, '{horarios,${x.ruta.join(',')},pasos,0,d}', ${J(x.d)}, false)`;
const sqlMetrics = `${guardaHorarios ? `${guardaHorarios}\n` : ''}UPDATE study_metrics SET extra = ${extraExpr} WHERE examen = 'ENCAPS';`;
const cabecera = `-- ENCAPS FASE INTENSIVA 2027-I · ${VERSION_V6} · generado por gen_encaps_intensivo_2027.js (${hoyLima()})
-- ${filas.length} días L-V · ${plan[0].fecha} → ${plan[N - 1].fecha} · dia ${offset + 1}-${offset + N} (continúa la cuenta del mantenimiento desde ${BASE})${DESDE ? ` · --desde ${DESDE}: se emiten ${emitidas.length} filas (dia ${emitidas[0].dia}-${emitidas.at(-1).dia})` : ''}${ultCorr ? `
-- ${ultCorr.version}: corrimiento D1 ${ultCorr.d1_previo} → ${ultCorr.d1} (Σ perdidos ${PERDIDOS}) → intensiva renumerada, MISMAS fechas; carril B dia_mant 61-92 = etiqueta de origen (desfase ${DESFASE_CB})` : ''}${pendF1.length ? `
-- pendientes F1 (${path.relative(ROOT, PENDIENTES_F1).replace(/\\/g, '/')}): ${Object.entries(PEND_POR_FECHA).map(([f, p]) => `${f} (dia ${p.reposicion.dia}) ← ${descPend(p)}`).join(' · ')} · 0 mini-sims absorbidos (nada se descarta)` : ''}
-- EXAMEN ${EXAMEN} (${WD[dowDe(EXAMEN)]}${provisional ? ' · PROVISIONAL' : ''}) · núcleo ${nucleoDesde} → ${NUCLEO_HASTA} (${SLOTS} slots + ${nSimNucleo} SIM) · módulos ${MODULOS.length} d · cola ${COLA[0]} → ${COLA[4]} · SKIP dentro: ${[...SKIP_INT].filter((f) => f >= D1 && f <= plan[N - 1].fecha).join(', ') || 'ninguno'}
-- barrido: ${notaBrecha}
-- carril B (16:15) = ${path.relative(ROOT, CARRIL_B).replace(/\\/g, '/')}: ${nCbB} banqueo1h + ${nCbM} mini-sims absorbidos + ${nRepo} reposición · 0 choques de código con el barrido
-- Borra SOLO modo='INTENSIVO'${DESDE ? ` con fecha >= ${DESDE}` : ''}; NO toca el MANTENIMIENTO (las filas MANTENIMIENTO 61-92 de v5.20 las borra el orquestador antes, Lote 4).`;
const sql = SIN_TX
  ? `${cabecera}
-- --sin-tx: sin BEGIN/COMMIT ni backup (los pone el bloque del Lote 4) · el UPDATE de study_metrics.extra va en ${path.basename(OUT_METRICS)}
DELETE FROM study_schedule WHERE ${delFiltro};
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, codigo, subtema, prioridad, modo, videos, theomed, material_comp, temas_secundarios, extra) VALUES
${values.join(',\n')};
`
  : `${cabecera}
BEGIN;
DO $$ BEGIN IF to_regclass('public.${BK}') IS NOT NULL THEN RAISE EXCEPTION 'el backup ${BK} YA EXISTE: no se pisa (pásale --bk ${BK}b)'; END IF; END $$;
CREATE TABLE ${BK} AS SELECT * FROM study_schedule WHERE examen = 'ENCAPS';
DO $$ BEGIN IF EXISTS (SELECT 1 FROM study_schedule WHERE examen = 'ENCAPS' AND modo <> 'INTENSIVO' AND dia BETWEEN ${emitidas[0].dia} AND ${emitidas.at(-1).dia}) THEN RAISE EXCEPTION 'hay filas no INTENSIVO en dia ${emitidas[0].dia}-${emitidas.at(-1).dia} (MANTENIMIENTO 61-92 de v5.20): bórralas antes (Lote 4)'; END IF; END $$;
DELETE FROM study_schedule WHERE ${delFiltro};
INSERT INTO study_schedule (examen, dia, fecha, weekday, tipo, codigo, subtema, prioridad, modo, videos, theomed, material_comp, temas_secundarios, extra) VALUES
${values.join(',\n')};
${sqlMetrics}
COMMIT;
`;
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, sql, 'utf8');
if (SIN_TX) fs.writeFileSync(OUT_METRICS, `-- study_metrics.extra (ENCAPS) · ${VERSION_V6} · gen_encaps_intensivo_2027.js (${hoyLima()}) · examen ${EXAMEN} · va DESPUÉS del INSERT de ${path.basename(OUT)} (Lote 4, misma transacción)\n-- intensiva.backup = ${BK}: con --sin-tx este SQL NO crea esa tabla; la CREA el orquestador en la transacción de siembra (CREATE TABLE ${BK} AS SELECT * FROM study_schedule WHERE examen = 'ENCAPS', antes del DELETE), como en v6.00\n${horarioTextos ? `-- v6.02: + horarios ${horarioTextos.rutas.map((x) => `${x.ruta[0]}[${x.ruta[1]}]`).join(' · ')} pasos[0].d reescritos por ruta desde las filas F1 (D1 ${horarioTextos.r1.fecha} · D2 ${horarioTextos.r2.fecha} · D3 ${horarioTextos.r3.fecha} · 1.er mini-sim ${horarioTextos.vie1.fecha}); la guarda DO de antes del UPDATE aborta si el texto fijo vivo no es la plantilla HORARIO_*\n` : ''}${sqlMetrics}\n`, 'utf8');
// v6.01: _pendientes_f1.json registra dónde quedó repuesta cada fila (destino + reposicion), idéntico a la copia embebida en el SQL.
// Solo en la siembra versionada (escenario de _fechas_v6.json, sin --out): una prueba en seco no reescribe el JSON.
if (pendF1Doc && ESCENARIO_JSON && !OUT_ARG && !has('--no-persistir')) {
  const antes = fs.readFileSync(PENDIENTES_F1, 'utf8');
  const despues = JSON.stringify(pendF1Doc, null, 1) + '\n';
  if (antes !== despues) { fs.writeFileSync(PENDIENTES_F1, despues, 'utf8'); console.log('pendientes F1 (destino / reposicion) →', path.relative(ROOT, PENDIENTES_F1).replace(/\\/g, '/')); }
}

// ── informe ──
const tipos = {};
for (const r of filas) tipos[r.tipo] = (tipos[r.tipo] || 0) + 1;
console.log('OK →', OUT, SIN_TX ? `(+ ${OUT_METRICS})` : '', '·', emitidas.length, 'filas emitidas ·', plan[0].fecha, '→', plan[N - 1].fecha, '· dia', offset + 1, '-', offset + N, '· examen', EXAMEN);
console.log('tipos:', JSON.stringify(tipos), '· sim100 núcleo', nSimNucleo, '· sim100 módulo', filas.filter((r) => r.tipo === 'sim100' && r.extra.modulo).length, '· módulos', MODULOS.length, 'd');
console.log('carril B: banqueo1h', nCbB, '· mini-sim absorbido', nCbM, '· reposición', nRepo, repoFechas.length ? `(${repoFechas[0]} → ${repoFechas.at(-1)})` : '', '· choques', choquesFinal.length, '· pendientes F1', nPendF1, nPendF1 ? `(${Object.keys(PEND_POR_FECHA).join(', ')})` : '');
console.log('barrido (' + SLOTS + ' slots):', ordenSlots.map((c) => (c === 'IV-1+IV-2' ? 'IV' : c)).join(' · '));
console.log('SIM:', filas.filter((r) => r.tipo === 'sim100').map((r) => `${r.fecha} #${r.extra.sim.num} ${r.extra.sim.hora}`).join(' · '));
console.log('cola:', filas.slice(-5).map((r) => `${r.fecha} ${r.tipo}`).join(' · '));
if (horarioTextos) console.log('horarios (pasos[0].d por ruta):', horarioTextos.rutas.map((x) => `${x.ruta[0]}[${x.ruta[1]}] ${x.hora}`).join(' · '), `· D1 ${horarioTextos.r1.fecha} (${horarioTextos.r1.codigo}) · D2 ${horarioTextos.r2.fecha} (${horarioTextos.r2.codigo}) · D3 ${horarioTextos.r3.fecha} · 1.er mini-sim ${horarioTextos.vie1.fecha} · runner ${avisosHorario.length ? `${avisosHorario.length} aviso(s)` : 'OK'}`); // v6.02
