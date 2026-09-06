# 🔥 FASE INTENSIVA ENCAPS 2027-I — diseño completo (feb → D-1 del examen)

> **Qué es:** las 5-8 semanas en que ENCAPS vuelve a **bloque principal** (el USMLE Step 1 se rinde el 25-29 ene 2027). Empieza el **lunes 1-feb-2027 (D1)** y termina el **D-1** del examen SERUMS 2027-I. Continúa la cuenta de días de la app: mantenimiento = días 1-102 (7-sep-2026 → 29-ene-2027, `modo='MANTENIMIENTO'`), intensiva = **día 103 en adelante**, `modo='INTENSIVO'`.
> **Meta:** ≥17/20 (≥85 % ciego) el día del examen; la fase arranca desde el ~70 % ciego que deja el mantenimiento (`PROTOCOLO_HORA_MANTENIMIENTO.md`).
> **Fuente única de pesos/críticos:** `PRONOSTICO_WALKFORWARD_2027-1_v3.md` (vector II 30 · I 27 · V 21 · III 13 · IV 9; 8 críticos I-3 · V-2 · II-3 · III-5 · I-4 · II-5 · II-4 · IV-1+IV-2; rebotes II-1 · II-11 · II-8; formato 45-70 % viñeta).
> **Generador:** `DATA/_scripts/gen_encaps_intensivo_2027.js` → `DATA/_scripts/_encaps_intensivo_2027.sql` (**emitido, NO aplicado**: se aplica el día que la convocatoria confirme la fecha, §5).
> **Estado 05-sep-2026:** diseño cerrado; la fecha del examen es ASUMIDA (§6); la app aún no tiene rama `INTENSIVO` (§7).

---

## 0) ⚠️ ALERTA DE FECHA — Semana Santa 2027 y la convocatoria SERUMS 2027-I

Calendario **verificado** (algoritmo de Meeus, `gen_encaps_intensivo_2027.js`): **Jueves Santo = jue 25-mar-2027 · Viernes Santo = vie 26-mar-2027 · Domingo de Pascua = dom 28-mar-2027**. Ambos jueves y viernes son feriados nacionales en el Perú (el régimen v5.6 no siembra sesiones en feriados). *(La nota previa del workflow que situaba Semana Santa 2027 el 1-2 de abril era incorrecta: esas fechas corresponden a jueves/viernes comunes; la Semana Santa 2026 fue el 2-3 de abril.)*

Las dos fechas "asumidas" que hoy circulan en el sistema son **imposibles**:

| Dónde | Fecha asumida | Problema |
|---|---|---|
| `study_metrics.exam_date` (Supabase) | dom **28-mar-2027** | Domingo de Pascua |
| `gen_encaps_intensivo_2027.js` (default `EXAMEN`) | vie **26-mar-2027** | Viernes Santo (y no es domingo; los ENCAPS se rinden en domingo: 2026-II fue dom 9-ago-2026) |

**Escenarios plausibles** (domingos, "fines de marzo" según la serie histórica; la fecha real la fija ÚNICAMENTE la convocatoria SERUMS 2027-I → `SENALES_2027-I.md`, canal 1):

| Escenario | Examen (dom) | Días hábiles D1→D-1 | Semanas | Viernes | Simulacros 100Q tras el pre-test | D-2 dress rehearsal | D-1 medio día | Comando |
|---|---|---|---|---|---|---|---|---|
| **CORTO** (planificar con este hasta la convocatoria) | 14-mar-2027 | 30 (días 103-132) | 6 | 6 | 4 | jue 11-mar | vie 12-mar | `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-01 2027-03-14` |
| MEDIO | 21-mar-2027 | 35 (103-137) | 7 | 7 | 5 | jue 18-mar | vie 19-mar | `... 2027-02-01 2027-03-21` |
| (asumido hoy, imposible) | 26/28-mar-2027 | 38 (103-140; salta jue 25-mar) | 7.6 | 7 | 6 | mar 23-mar | mié 24-mar | default del script |
| LARGO | 11-abr-2027 (o 4-abr) | 48 (103-150; salta 25/26-mar) | 10 | 9 | 7 | jue 8-abr | vie 9-abr | `... 2027-02-01 2027-04-11` |

Regla de decisión (gaps_v3b_encaps.json, vacío 4): **hasta la convocatoria se planifica con el escenario CORTO** — si el examen resulta más tarde, sobran semanas para rebotes/watch-list; si se planificara con el largo y cayera el 14-mar, el barrido de críticos quedaría a medias. **Qué se hace si el examen se mueve** (§5): regenerar el SQL con la fecha real (1 comando), aplicar por MCP, actualizar `study_metrics.exam_date`/`dias_a_examen` y `STUDY_TOTAL_DAYS` en la app, y ajustar a mano el Google Calendar (este doc y los scripts **no** tocan franjas ni Calendar). Si la fecha cae después de Semana Santa, el jueves y viernes santos quedan sin sesión sembrada (feriados): decidir ese día si se usan como repaso libre.

---

## 1) Esqueleto de semanas (tal como lo siembra el script)

Numeración: semana 1 = 1-5 feb. Lun-jue = **loop diario** (§2). Viernes = **simulacro completo 100Q / 72 s/Q** (§3-§4).

| Semana | Lun | Mar-Jue | Vie |
|---|---|---|---|
| **1** (1-5 feb) | `senales`: RE-SCAN de señales — QX Tendencias 2027-I, boletín DGE/sala situacional, RM/NTS MINSA publicadas desde sep-2026, convocatoria SERUMS → actualizar `SENALES_2027-I.md` y los pesos del v3 (y el condicional de IV) | `loop` de **calentamiento** sin material nuevo: I-3 (mar) · V-2 (mié) · II-3 (jue) | **PRE-TEST 2026-II** (vie 5-feb): examen real 2026-II, 100Q/72 s, clave oficial 100/100, corrección por código vs vector v3, umbral ≥70 (`PRETEST_2026-II.md`; runner `gen_encaps_minisim.js --pretest`, generar el jue 4-feb) |
| **2-5** (8 feb → 5 mar) | **BARRIDO de los 8 críticos**: 16 slots lun-jue = 2 pasadas por código, cada pasada en un sub-eje distinto (`SUB_EJES` de `_encaps_ciclo_v3.js`). Orden default por rentabilidad v3: I-3 · V-2 · IV-1+IV-2 · I-4 · II-3 · III-5 · II-5 · II-4 · (2.ª pasada igual). Con `--pretest <json>` el orden y el nº de slots por código se **recalculan por índice de brecha** (n × (1 − % ciego)): todo crítico ≥1 slot (salvo 100 % seguro → 0), máx 3 por código, los slots libres van a los códigos con más brecha (críticos o no). Cada loop incluye **drill de cifras 10 min** (`CIFRAS_CRITICAS_2027-I.md`) dentro del deep prime. | | SIM 100Q #1-#4 (§4) |
| **6-7** (8 mar →) | **REBOTES** anti-persistentes (lección L4): II-1 · II-11 · II-8, un día cada uno, con 5-6Q del código de cola larga de turno como secundario | **WATCH-LIST** de cola larga: 3 códigos por día (principal 1 + 2 secundarios de 8-10Q) rotando los 17 códigos de `COLA_LARGA`; repaso multi-temporal de TODO `_registro_resoluciones.json` en el segmento 07:15 | SIM 100Q #5-#7 (§4) |
| **cola** | Últimos 2 slots lun-jue antes de D-2 = `repaso_final` (sin material nuevo: errores del registro + cifras + mapas en blanco de los 8 críticos) | **D-2 = `dress_rehearsal`**: simulacro 100Q/72 s a la hora del examen, con ropa, comida y traslado simulados; corrección por código | **D-1 = `medio_dia`**: 30 min de cifras + hoja de errores del dress rehearsal; cero preguntas nuevas; dormir 7 h (doctrina del sprint 2026-II) |

Cómo se reparte según el escenario (lo que realmente sale del script, verificado 05-sep):

| Escenario | Calentamiento | Barrido | Rebotes + watch-list | Repaso final | Lectura |
|---|---|---|---|---|---|
| CORTO 14-mar | 3 | 16 | **1** (solo II-1) | 2 | los rebotes/watch-list casi desaparecen → el `--pretest` debe liberar slots del barrido (críticos con 100 % seguro → 0 slots) y el 2.º pase de los mejores críticos cede a II-11/II-8 |
| MEDIO 21-mar | 3 | 16 | 5 (3 rebotes + 2 watch-list) | 2 | plan tal cual el v3 §6 |
| asumido 26/28-mar | 3 | 16 | 8 (3 + 5) | 2 | — |
| LARGO 11-abr | 3 | 16 | 18 (3 + 15) | 2 | sobran días: convertir 4-6 de watch-list en 3.ª pasada de los 4 críticos peores del pre-test |

Regla fija: **ningún crítico baja de 1 slot** y los códigos con 100 % seguro en el pre-test solo reciben repaso multi-temporal D-7/D-14 (`PRETEST_2026-II.md` §4).

## 2) Loop diario lun-jue (8 segmentos, `extra.loop` de cada fila) — ⚠ horas heredadas del loop USMLE v5.6, **a confirmar en la reestructuración de febrero**

| Hora (heredada) | Segmento | Contenido | Instrumento |
|---|---|---|---|
| 05:00 | Anki | deck **ENCAPS::Cifras** (≤5 min) + tarjetas de mecanismo del registro | `TRACKING_ERRORES/ANKI_COLA/ENCAPS_Cifras_2027-I.csv` |
| 07:15 | Repaso multi-temporal | D-1 / D-3 / D-7: preguntas de los códigos de esos días (`extra.repaso` trae los códigos) | runner `--eval`/sets del banco propio |
| 08:15 | **PRE-TEST 10Q ciegas** del crítico del día | sin clave hasta responder; mide el % ciego de entrada | `gen_encaps_minisim.js --banco` (10 primeras) |
| 09:00 | **DEEP PRIME** del crítico del día (sub-eje) + **drill de cifras 10 min** | comprensión > memorización (Palmerton): mapa en blanco, por qué de cada cifra | `CIFRAS_CRITICAS_2027-I.md` + fichas OBSIDIAN |
| 11:00 | **CONSOLIDACIÓN 30Q** | 60 % del día · 40 % previos · ≥40 % recall directo | banco propio (`--banco`, `--sim100 propio`) |
| 12:00 | Cierre | 1 línea en `_registro_resoluciones.json` (`gen_encaps_semana.js --cerrar`); cada fallo OLVIDO → tarjeta esa misma tarde | README_SISTEMA_TRACKING |
| 17:15 | Anclaje vespertino | mapa en blanco del tema + Anki | — |
| 18:00 | **EVALUACIÓN MODO EXAMEN 20Q · 72 s/Q** | solución al final; 5Q ancladas = **3 cifras + 2 viñetas** | runner (solución al final) |

Notas: (a) el segmento 17:15 coincide hoy con LIVIANO en el calendario vigente: **este doc no mueve franjas**; la reestructuración de febrero fija las horas ANTES de sembrar. (b) La métrica que manda sigue siendo el **% CIEGO REAL** (correctas seguras / total); la meta de crucero en la intensiva es ≥80 % en el pre-test de 10Q antes de pasar al siguiente sub-eje (gate 80 % en 10Q, doctrina UWorld/Palmerton de 5 niveles).

## 3) Viernes = simulacro completo 100Q / 72 s/Q (120 min) + corrección por código

- Modo examen estricto (sin pausa, sin material, confianza 1-3 por ítem); corrección **por código v3 y por formato** (viñeta / viñeta+cifra / directa / cifra); umbral del runner **85 %**, alerta **< 70 %**.
- Registro: ronda `tipoRonda: simulacro` en `_registro_resoluciones.json` (export del runner → `gen_encaps_minisim.js --registrar <json> --append`) y nota en ▲ SIM (`study_sim_scores`, `sim_n` = día) cuando la app tenga la rama `INTENSIVO` (§7).
- Tutoría del lunes siguiente: fallos CCSN → ficha del par confundido; OLVIDO/cifra → tarjeta; ≥2 fallos en un código → ese código entra al barrido de la semana.

## 4) Inventario REAL de simulacros completos disponibles (solo lo que existe en `src/lib/encapsResumenes.ts`, `encapsFuentes.ts`, `encapsPracticaExtra.ts` y `BANCO_PROPIO`)

| # | Simulacro | Fuente (existente) | Clave | Estado / uso |
|---|---|---|---|---|
| 0 | **PRE-TEST 2026-II** (vie 5-feb) | `_examen_2026-2_items.json` · runner `gen_encaps_minisim.js --pretest` | oficial 100/100 | LISTA NEGRA hasta ese día; único uso = pre-test |
| 1 | Examen real **2025-II** (100Q) | `BANCO_PROPIO/_examenes_reales_2024-2A_2026-1.json` · `--sim100 2025-2` (códigos v3 por ítem desde `_etiquetas_examenes_reales_v3.json`) | **oficial** (resaltados del PDF) | listo; ⚠ 36 de sus ítems ya están en los sets del banco del día (`set_*_1.json`): rendirlo ANTES de que esos sets se consuman o aceptar solapamiento parcial |
| 2 | Examen real **2025-I forma A** (= forma B barajada) | ídem · `--sim100 2025-1A` | oficial | listo (mismo aviso de solapamiento) |
| 3 | Examen real **2024-II forma A** (= B) | ídem · `--sim100 2024-2A` | oficial | listo (mismo aviso) |
| — | Examen real 2026-I | `exams_txt/2026-1.txt` (100 ítems SIN clave en disco) | ✗ | NO sirve como simulacro hasta conseguir `CLAVE DE RESPUESTA 2026-1.pdf` (pendiente_usuario) |
| 4 | Theomed curso 37 "SIMULACROS MEDICINA": Examen 2025-II (quiz 7940), Examen TIPO A/B (7934/7935) y TIPO A(2)/B(2) (7937/7938), Simulacros 15/05 · 29-MAY · 12-JUN (20244 · 4242 · 4442) = 8 quizzes listados en `encapsFuentes.ts` (`ENCAPS_THEOMED_SIMULACROS`; el scan del 19-jul contó 11) | campus.academiatheomed.com, curso 37 | plataforma | **A VERIFICAR (05-sep)**: acceso vigente en 2027 y si el ciclo 2027-I los renueva |
| 5 | QX "Simulacros Virtuales" (3 reales, semanal al scan 20-jul) y "Evaluación Virtual Avanzada" (12) | `encapsResumenes.ts` `ENCAPS_BANCOS` (`/evaluaciones/tipo/…`) | plataforma | **A VERIFICAR (05-sep)**: acceso QX 2027-I |
| 6 | Simulacros Drive DR LOPEZ y Villamedic (carpetas "📝 Simulacros") | `encapsPracticaExtra.ts` `ENCAPS_DRIVE_SIMULACROS` · `encapsFuentes.ts` (Villamedic) | PDF con clave según material | material 2026; útil como sim en papel si no hay acceso a plataformas |
| 7 | **Propio #1 / #2**: `--sim100 propio <fecha>` (100Q = vector v3 ×4 desde `BANCO_PROPIO`, sin repetir ítems ya usados) | `gen_encaps_minisim.js` | verificada por ítem | requiere ≥100 ítems NO consumidos con mezcla II 30/I 27/V 21/III 13/IV 9: en febrero exige **sets nuevos** (el inventario ya marca déficit, `BANCO_PROPIO/_inventario_banco_por_codigo.json`); desde el 8-feb el 2026-II se libera como cantera de espejos |

Lista sembrada por default en el script (`SIMS`, en este orden de viernes): 2025-II → 2025-I A → 2024-II A → QX/Theomed (si hay acceso; si no, Theomed quiz 7940) → propio #1 → Theomed TIPO A/B o QX 2027-I (si hay acceso; si no, propio #2) → propio #2. Se puede sustituir con `--sims ruta.json` (`[{label, fuente, clave}]`).

## 5) Cómo se siembra (NO aplicar ahora)

1. **Disparador:** la convocatoria SERUMS 2027-I confirma la fecha (canal 1 de `SENALES_2027-I.md`). Hasta entonces el SQL en disco es un ensayo (fecha asumida 26-mar, imposible).
2. **Generar:** `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-01 <fecha-examen> [--pretest DATA/ENCAPS/TRACKING_ERRORES/RONDAS/PRETEST_2026-II.json] [--sims ruta.json] [--bk study_schedule_bk_intensivo_<AAAAMMDD>]` → escribe `DATA/_scripts/_encaps_intensivo_2027.sql` (backup `--bk` → `DELETE ... WHERE examen='ENCAPS' AND modo='INTENSIVO'` → `INSERT` de N filas `dia 103…`). El script avisa si la fecha cae en Semana Santa (⛔) o no es domingo (⚠), no siembra fines de semana ni feriados y continúa la numeración desde el día 102.
3. **Revisar** el SQL (tipos por día: `senales · loop · pretest · sim100 · repaso_final · dress_rehearsal · medio_dia`; nº de viernes; barrido de 16 slots).
4. **Aplicar** por MCP `execute_sql` (proyecto `qacynpqdrorpuegsmtcy`) el día de la confirmación; verificar con `select modo, tipo, count(*) from study_schedule where examen='ENCAPS' group by 1,2`.
5. Con el pre-test rendido (5-feb): re-generar con `--pretest` y volver a aplicar (solo se reescriben las filas `INTENSIVO`; el mantenimiento 1-102 queda intacto). **Regla:** nunca correr `gen_encaps_mantenimiento_2027.js` después de sembrar la intensiva sin el filtro de modo (gaps_v3b vacío 7).
6. Ensayo recomendado en enero (sin aplicar): `--bk study_schedule_bk_intensivo_test` para no descubrir errores el 1-feb.

## 6) Gates y lectura de resultados

| Momento | Métrica | Umbral | Si no se cumple |
|---|---|---|---|
| Vie 5-feb PRE-TEST 2026-II | % bruto / % ciego | ≥70 / ≥55 (arranque previsto) | <60 bruto: alarma → semanas 2-5 = 2 slots por crítico por brecha, semana 6 = 3.ª pasada de los 4 peores (`PRETEST_2026-II.md` §4) |
| Cada loop 08:15 | pre-test 10Q del sub-eje | ≥80 % (gate de nivel) | repetir el sub-eje al día siguiente en el segmento 07:15 (no avanza) |
| Cada loop 18:00 | eval 20Q modo examen | ≥75 % ciego (crucero) | ≥2 fallos en las 5 ancladas → código caliente para la semana |
| Viernes SIM 100Q | % bruto / % ciego | ≥85 / ≥75 hacia el D-2 | <70: re-ordenar la semana siguiente por brecha (mismo algoritmo del `--pretest`) |
| D-2 dress rehearsal | % ciego | ≥80 | D-1 solo cifras + hoja de errores; no se cambia nada más |

## 7) Lo que falta fuera de este doc (pendiente, otros ficheros)

- **App** (`src/lib/encapsPlan.ts`, `EncapsPlanView.tsx`, `EncapsCockpit.tsx`): `STUDY_TOTAL_DAYS` dinámico (máx(dia) leído de `study_schedule`) o constante 102+N al aplicar; rama `modo==='INTENSIVO'` en `itemsForDay` que pinte `extra.loop` (8 ítems chequeables con hora), `extra.sim`, `extra.repaso` (D-1/D-3/D-7) y `extra.drill_cifras`; `simDays` con tipos `pretest`/`sim100`/`dress_rehearsal` (`sim_n` = día) para guardar la nota en `study_sim_scores` contra la meta 85.
- **Supabase:** `study_metrics.exam_date` (hoy 28-mar = Pascua) y `dias_a_examen` estático → calcularlo desde `exam_date`.
- **Calendar:** overlays de viernes-simulacro y las horas del loop → reestructuración de febrero.
- **Stock de preguntas:** el barrido consume ~30-40Q/día de críticos; el inventario (`_inventario_banco_por_codigo.json`) muestra que los sets de hoy cubren el arranque, no la intensiva → pre-generar sets `set_<codigo>_2/3` en enero y usar el 2026-II como cantera desde el 8-feb.
