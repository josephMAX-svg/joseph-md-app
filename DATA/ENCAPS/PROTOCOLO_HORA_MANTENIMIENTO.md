# 🇵🇪 PROTOCOLO DE LA HORA ENCAPS — MANTENIMIENTO 2027-I (16:15–17:15 L-V · D1 jue 17-sep-2026 → vie 29-ene-2027 · 94 días)

> La hora tiene UNA sola misión: llegar a febrero con base sólida para que la fase intensiva
> (feb–mar 2027, ENCAPS vuelve a bloque principal) arranque desde **~70 % ciego** y no desde cero.
> Meta final: **≥17/20 en ENCAPS 2027-I (fines de marzo 2027; fecha real = convocatoria SERUMS 2027-I, A VERIFICAR) · percentil 1 % (~2.000 plazas)**.
> La cola vive en la app (Estudio → Perú → Supabase `study_schedule` examen `ENCAPS`, modo `MANTENIMIENTO`,
> 94 días · backup `study_schedule_bk_0916`; los `bk_0915` (v5.12), `bk_0914` (v5.11), `bk_0912` (v5.10), `bk_0910` (v5.9), `bk_0909` (v5.8) y `bk_0908` (v5.7) siguen intactos). Siembra: `DATA/_scripts/gen_encaps_mantenimiento_2027.js`
> (configuración compartida en `_encaps_ciclo_v3.js`). Versión **v3.9 (16-sep-2026, régimen v5.13)**: re-fechado a **D1 = jue 17-sep-2026** (el mié 16-sep tampoco se estudió; duodécimo corrimiento 31-ago→17-sep; el ciclo pasa de 95 a **94 días**: 76 `banqueo1h` + 18 `mini_sim`); el pre-test de arranque (§1-bis) pasa a **jue 17 + lun 21-sep** (el vie 18 = D2 es mini-sim, así que la parte 2 salta al siguiente banqueo1h); la rotación lun-jue corre un hábil entera (el D1 sigue siendo II-3 · esquema_intervalos, ahora en jueves). ⚠ Consecuencia del corrimiento en el Step 1: su D95 es el **lun 1-feb = D-1 dentro del plan** y el **examen Step 1 target pasa al mar 2-feb-2027** (fuera de la ventana 25-29 ene); el día 95 de la cuenta ENCAPS (en que arrancaría la fase intensiva) es ese lun 1-feb y el día 96 es el examen → propuesta: arrancar la intensiva el **mié 3-feb** (`FASE_INTENSIVA_2027-I.md`; decisión de Joseph). Mantiene de v3.8 (15-sep, v5.12), v3.7 (14-sep, v5.11) y de **v3.6 (12-sep-2026, régimen v5.10)**: (a) §1 alineado con la regla REAL de la eval anclada (fallos ≥2 → código CALIENTE para el override del viernes; nada se desplaza esa semana; lunes = fallos del mini-sim) y con el JSON `horarios` de `study_metrics.extra` (`_migrations/study_metrics_horarios.sql`, aplicado el 12-sep); (b) §1-bis **pre-test de arranque** (40Q = 40 reales, línea base ciega por crítico; en v3.6 caía lun 14 + mar 15, en v3.7 mar 15 + mié 16, en v3.8 mié 16 + jue 17, ahora jue 17 + lun 21); (c) §5 siembra segura (`DELETE … AND modo='MANTENIMIENTO'`, backup fechado que aborta si existe, `SEMANAS/overrides_acumulado.json`, `PERFIL_CONOCIMIENTO.md` generado). Mantiene de v3.5: **18 mini-sims de viernes** (desde v5.10; el primero sigue siendo el vie 18-sep) · metas, franjas y fecha de examen intactas. El fin del ciclo NO se mueve (29-ene-2027): el mantenimiento es banqueo puro y se acorta por delante, no por detrás — no hay temario que "dejar atrás". Mantiene de v3.1-v3.4: sub-ejes por sesión,
> secundario de cola larga, receta fija del mini-sim, cierre de 1 línea y **lista negra del 2026-II**.
>
> **Efecto exacto del corrimiento a v5.13** (contado fila a fila sobre el SQL sembrado el 16-sep con `node`, no estimado): mismo patrón que en v5.11 y v5.12. Los **18 mini_sim conservan su viernes Y su cola larga** (18-sep = II-2 + I-10 … 29-ene = II-2 + I-10; solo baja 1 su `dia`: el vie 18-sep pasa de `dia` 3 a **2**, el último de `dia` 95 a **94**). Las **76 sesiones lun-jue conservan código, sub-eje y secundario en el mismo ORDEN, pero corren un día hábil entero** (el D1 = II-3 · esquema_intervalos pasa del mié 16 al jue 17-sep; I-3 · tipos_vigilancia del jue 17 al **lun 21-sep**; V-2 · planeamiento del lun 21 al mar 22; III-5 · pertinencia_barreras del mar 22 al mié 23, y así hasta el final). Al tener un slot lun-jue menos (77 → 76) **se cae el último de la rotación: la 5.ª sesión de II-11 (prep_dual_ptmi, que en v5.12 era el jue 28-ene)**; el jue 28-ene es ahora III-8 · ley_27815 (+I-OCC) y **II-11 queda con 4 sesiones (`extra.de = 4`), igual que IV-6+IV-7 (perdida en v5.12), V-7+V-10 (v5.11) y II-8 (v5.9)**. El secundario de cola larga viaja con su sesión, así que III-3 pierde una aparición (7 → 6). La sesión que desaparece del calendario es la del mié 16-sep.
>
> *(Histórico v5.12, 15-sep: D1 mié 16-sep · 95 días = 77 + 18 · se cayó la 5.ª de IV-6+IV-7 · I-11+I-12 7 → 6. v5.11, 14-sep: D1 mar 15-sep · 96 días = 78 + 18 · se cayó la 5.ª de V-7+V-10 · V-1 7 → 6.)*

Fuente única de pesos y críticos: `PRONOSTICO_WALKFORWARD_2027-1_v3.md` — vector **II 30 · I 27 · V 21 · III 13 · IV 9**
(bandas 27-34 / 24-29 / 18-25 / 11-15 / 5-14; IV es bimodal por comité: **nunca más a piso**) ·
**8 críticos**: I-3 · V-2 · II-3 · III-5 · I-4 · II-5 · II-4 · IV-1+IV-2 (~49 % del examen) ·
**ALTA con flag de rebote**: II-1 · II-11 · II-8 · formato esperado **45-70 % viñeta** → doble modo (viñeta + recall de cifras).

---

## 1) Estructura del día (lun–jue) — tal como la muestra la app en «Hoy»

| Franja | Qué | Regla |
|---|---|---|
| 16:15–16:30 | **EVAL ANCLADA** — 5Q del código de AYER, de memoria, sin material (**3 cifras + 2 viñetas**, solución al final; runner `BANCO_PROPIO/eval_<fecha>.html`) | **Regla real** (la que implementa `gen_encaps_semana.js`): **lunes** = 5Q rehechas con OTRO enfoque de los **fallos del mini-sim del viernes** (son los "≥5Q fallos previos" del registro) · **martes** = código del lunes · **miércoles** = código del martes · **jueves** = código del miércoles · **viernes** no lleva eval (el mini-sim ocupa las 16:15) · **D1** (jue 17-sep, sin sesión anterior en el SQL) = 5Q de fallos previos del registro, críticos primero (`eval_2026-09-17`, modo "D1 del régimen"). Si fallas **≥2** → el código queda **CALIENTE** para el **override del viernes** (semana siguiente; máx. 2 sustituciones, I-3/V-2 intocables, un crítico solo se cede si ya está ≥85 % con n ≥ 5). **No desplaza** al tema del día siguiente: la rotación de la semana en curso no se toca |
| 16:30–17:02 | **BANCO DEL DÍA** — 16-20Q CIEGAS del código de la rotación, **ceñidas al SUB-EJE de la sesión** (columna `subtema` / `extra.sub_eje`) | Pregunta-por-pregunta con corrección inmediata (Palmerton). ~50 % viñeta / 50 % recall directo de cifras. Nivel ≥ examen real, distractor = concepto vecino |
| 17:02–17:10 | **SECUNDARIO de cola larga** — 4-5Q ciegas del código que marca `temas_secundarios` (`extra.secundario`) | Cubre los ≈30 pp del vector que la rotación principal no toca (17 códigos, §3) |
| 17:10–17:15 | **CIERRE DE 1 LÍNEA** (§5) + ≤3 APEX de errores de conocimiento | Solo fallos knowledge/transfer generan tarjeta/nota; los de proceso generan regla de examen |

Total del banco: 20-25Q (16-20 principal + 4-5 secundario). La franja 16:15–17:15 no cambia.

### 1-bis) Semana 1 = PRE-TEST DE ARRANQUE (jue 17 y lun 21-sep-2026): línea base ciega por crítico

| Día | 16:15 | 16:30–17:10 | 17:10 |
|---|---|---|---|
| **Jue 17 (D1)** | eval de fallos previos (`eval_2026-09-17.html`, modo D1: 5Q del registro, críticos primero) | **`BANCO_PROPIO/pretest_arranque_2026-09-17.html` — parte 1: 20Q = 5Q × II-3 · I-3 · V-2 · III-5**, modo examen (72 s/Q = 24 min, sin material, solución al final), confianza 1-3 obligatoria | export JSON → `node DATA/_scripts/gen_encaps_minisim.js --registrar <export.json> --append` |
| **Vie 18 (D2)** | — (el mini-sim ocupa las 16:15) | mini-sim #2 (`minisim_2026-09-18`, II-2 + I-10, sin cambio de fecha ni de cola larga; solo 4 de los 8 críticos tienen línea base) | cierre semanal + pre-generar la semana del 21-sep (`--semana 2026-09-21`; abre el lun 21 con I-3 · tipos_vigilancia (+I-10), cuyo contenido es la parte 2 del pre-test, y sigue el mar 22 con V-2 · planeamiento (+V-6), cuyo banco aún no está pre-generado) |
| **Lun 21 (D3)** | eval anclada (`eval_2026-09-21.html`: fallos del mini-sim #2 + pre-test parte 1) | **`pretest_arranque_2026-09-21.html` — parte 2: 20Q = 5Q × II-5 · I-4 · IV-1+IV-2 · II-4** (salta el viernes porque es mini-sim) | ídem |

- Qué es: **40Q ciegas = 5Q × 8 críticos v3**, tomadas de los **ítems reales con clave oficial 2024-2A · 2025-1A · 2025-2** — en v5.13 vuelven a ser **40/40 reales, 0 nuevos** (`_meta.conteos` de `pretest_arranque_2026-09-17.json` y `…_2026-09-21.json`: 20 reales con clave oficial cada parte; en v5.12 eran 39 + 1 nuevo, en v5.11 40/40). **Nunca el 2026-II** (lista negra intacta). Generado el 16-sep con `node DATA/_scripts/gen_encaps_minisim.js --pretest-arranque` (detalle de la selección en `_meta.seleccion` y `_meta.conteos` de cada JSON).
- **Sustituye el CONTENIDO, no el horario**: `banco_2026-09-17` (D1 · II-3 · esquema_intervalos, 22Q) queda marcado `_meta.sustituido_por` (su HTML muestra el aviso y no arranca); sus ítems no se resuelven y vuelven al pool; `banco_2026-09-16.*` ya no existe. El lun 21 (D3 · I-3 · tipos_vigilancia) no tiene banco pre-generado: su contenido es la parte 2. Las filas de `study_schedule` no cambian (la app sigue mostrando II-3 e I-3 con su sub-eje: el pre-test cubre esos códigos ese mismo día).
- Para qué: **`resumen_por_subtema` nace con n = 5 en los 8 críticos**, pero con el pre-test partido por el viernes el primer cierre semanal (vie 18-sep) solo tiene línea base en 4 críticos (II-3 · I-3 · V-2 · III-5); el **override de la semana del 28-sep es el primero con línea base real en los 8** (el de la semana del 21-sep se calcula con la parte 1). La ronda entra como tipo `pretest` con `preguntas[]` y `gen_encaps_semana.js` la reparte por código (por eso `--append`, no la línea de 1 renglón).
- Umbral orientativo del pre-test: **≥70 % ciego** en un crítico = ya en crucero; **<40 %** = ese código pide set nuevo esa misma semana (`set_<codigo>_2.json`). Los fallos del pre-test alimentan la eval del lunes 21 (fallos del mini-sim + pre-test parte 1) y los ≥5Q de fallos previos de los mini-sims siguientes. ⚠ **Stock:** `eval_2026-09-24.html` se generó con **0Q** porque el pool de III-5 quedó agotado por `banco_2026-09-23` + el pre-test → reponer `set_III-5_2.json` ANTES del jue 24-sep y regenerar esa eval.

## 2) VIERNES = 🔥 mini-simulacro 25Q · 72 s/Q — receta FIJA (en `extra` de cada viernes)

| Parámetro | Valor | Nota |
|---|---|---|
| Preguntas | **25** mixtas · **II 8 · I 7 · V 5 · III 3 · IV 2** | proporcional al vector v3 |
| Reloj | **72 s/Q → 30 min** (16:15–16:45), sin pausa | modo examen estricto |
| Formato | **50 % viñeta / 50 % recall directo** | entrena los dos modos del 2026-II |
| Críticos | **≥10Q** de los 8 críticos v3 | |
| Fallos previos | **≥5Q** rehechas con OTRO enfoque desde `_registro_resoluciones.json` | D+3 / D+7 del registro |
| Cola larga | **5-6Q** repartidas entre los **2 códigos** que marca el viernes (`extra.cola_larga`) | 18 viernes (36 slots) → II-2 e I-10 caen 3×, los otros 15 códigos 2× (contado sobre el SQL v5.13; las parejas de viernes son las mismas de v5.10, v5.11 y v5.12) |
| Corrección | 16:45–17:15: corrección por código + nota /25 en **▲ SIM** (se guarda en `study_sim_scores`, `sim_n` = día) + cierre de 1 línea con `tipoRonda=mini_sim` y `nota=NN` | el Cockpit («Camino a 17/20») grafica la serie contra la línea 18/25 |
| Umbral | **≥18/25 hacia diciembre** | línea oro del gráfico |
| Alerta | **<15/25 dos viernes seguidos** → la semana siguiente se re-pondera (override, §5) | línea coral |

Los 25Q se pre-generan (no en vivo a las 16:15) desde `BANCO_PROPIO/` + moldes de exámenes 2024-2A→2026-1 (§4). Viernes sin mini-sim: 25-dic y 1-ene (feriados); esas semanas cierran con el jueves.

## 3) Rotación de 4 semanas (lun–jue) + sub-ejes + secundarios

### 3.1 Ciclo base (se repite **5 veces = 77 slots lun-jue**; el contador NO se reinicia en feriados)

| | Lun | Mar | Mié | Jue |
|---|---|---|---|---|
| **Sem A** | II-3 Inmunizaciones | **I-3 Vigilancia** | **V-2 Gestión/planeamiento** | III-5 Interculturalidad |
| **Sem B** | II-5 APS/adolescente (MCI) | I-4 Transmisibles/brotes | IV-1+IV-2 Investigación | II-4 Anemia/CRED |
| **Sem C** | II-1 Gestante ↩ | **I-3** (2ª del ciclo) | **V-2** (2ª del ciclo) | III-8 Ética función pública |
| **Sem D** | II-11 ITS/VIH ↩ | IV-6+IV-7 Publicación/estadística | V-7+V-10 (V-MED) | II-8 ENT/diabetes ↩ |

I-3 y V-2 caen **2× por ciclo** (10 sesiones cada uno); el resto **5 cada uno**, salvo **II-8, V-7+V-10, IV-6+IV-7 y II-11 con 4** (`extra.de = 4`): con 76 slots el 5.º ciclo se queda a cuatro slots del final, y los que se caen son los cuatro de la Sem D — el II-11 (perdido en v5.13), el IV-6+IV-7 (v5.12), el V-7 (v5.11) y el II-8 (v5.9); el último slot lun-jue (jue 28-ene) es III-8 · ley_27815. Contado sobre `_encaps_mantenimiento_2027.sql`, no estimado. ↩ = ALTA con flag de rebote. IV tiene 2 slots fijos por ciclo (lección 2026-II: 4→12).

### 3.2 Sub-eje por sesión (rotación circular por INSTANCIA del código; la app lo muestra como «◈ Sub-eje de hoy n/total»)

| Código | Sub-ejes en orden (la sesión k del código toma el sub-eje ((k−1) mod total)+1) | Reparto REAL en los 94 días (contado del SQL v5.13; idéntico al de v5.12 salvo II-11) |
|---|---|---|
| **V-2** (10) | 1 planeamiento (PEI/POI/FODA, objetivos estratégicos, CEPLAN) · 2 clima organizacional (SERVIR, dimensiones, 3 fases) + gestión de la calidad · 3 residuos sólidos/bioseguridad (colores de bolsa, punzocortantes 3/4, etapas) | **4 planeamiento · 3 clima+calidad · 3 residuos** (= reparto 2026-II: 5/4/2) |
| **I-3** (10) | 1 tipos de vigilancia + definiciones de caso · 2 notificación inmediata/semanal, ficha, flujo RENACE (Dir. 341-2023) · 3 historia natural · 4 causalidad (necesaria/suficiente, Hill, RR/OR/RA) · 5 sala situacional/ASIS · 6 brote: pasos, tasa de ataque, curva, canal endémico, bloqueo vacunal · 7 TLP y mediciones (razón/proporción/tasa, incidencia/prevalencia, letalidad) · 8 desastres (EDAN, vigilancia post-desastre) | los 8 del núcleo v3 + vuelven 1-2 (tipos_vigilancia ×2 · notificación ×2) |
| **IV-1+IV-2** (5) | 1 método científico (definiciones textuales) · 2 tipos de estudio · 3 muestreo probabilístico vs no probabilístico + tamaño muestral · 4 instrumentos, validez y confiabilidad | 2·1·1·1 |
| **II-3** (5) | 1 esquema + intervalos mínimos · 2 novedades gestante (VRS 32-36 sem, Tdap, influenza) + incorporaciones PNI · 3 ESAVI + kit (epinefrina 0.01 mg/kg IM) · 4 cadena de frío (2-8 °C, ruptura) | 2·1·1·1 |
| I-4 (5) | dengue completo (escenarios I/II/III, índice aédico, control, necropsia 24 h) · rabia (exposición, profilaxis) · precauciones/EPP por patógeno · malaria y zoonosis | 2·1·1·1 |
| II-5 (5) | NTS adolescente (riesgo, factores protectores, consejería, IE→EESS) · MCI por curso de vida (objetivo, indicadores, paquetes) | 3·2 |
| II-4 (5) | suplementación con CIFRAS (MEF 60 mg + 400 µg 2×/sem × 3 m, escolar 60 mg diario × 3 m, lactante) · anemia dx/tto (Hb, altitud) · plan multisectorial + consejería OMS + CRED | 2·2·1 |
| III-5 (5) | pertinencia y barreras culturales · medicina tradicional + pertenencia étnica · inclusión social/migrantes | 2·2·1 |
| II-1 ↩ (5) | prenatal + emergencias obstétricas (claves) · parto/puerperio/lactancia | 3·2 |
| **II-11 ↩ (4)** | PrEP, prueba dual, PTMI · sífilis gestacional (PGB 2.4 M UI) + sindrómico | **2·2** — bajó de 5 a 4 en v5.13 (se cayó la 3.ª sesión de prep_dual_ptmi, que en v5.12 era el jue 28-ene) |
| **II-8 ↩ (4)** | paquetes ENT + tamizaje (HEARTS) · metas HTA/DM (HbA1c, 150 min/sem) | **2·2** — bajó de 5 a 4 en v5.9 |
| III-8 (5) | Ley 27815 deberes vs prohibiciones vs principios · historia clínica (archivo activo 5 años, acceso, custodia) | 3·2 |
| **IV-6+IV-7 (4)** | IMRyD · ética de publicación · estadística descriptiva (moda/mediana/media, dispersión) | **2·1·1** — bajó de 5 a 4 en v5.12 (se cayó la 2.ª sesión de etica_publicacion, que era el jue 28-ene) |
| **V-7+V-10 (4)** | farmacovigilancia + URM · esenciales/PNUME, SISMED, stock · contrataciones (área usuaria) + DIGEMID | **2·1·1** — bajó de 5 a 4 en v5.11 (se cayó la 2.ª sesión de esenciales_sismed, que entonces era el jue 28-ene) |

### 3.3 Secundario de cola larga (17 códigos ≈ 30-35 pp del vector v3, fuera de la rotación principal)

Rotan en este orden, un código por sesión lun-jue (`temas_secundarios[rol=cola_larga]`, 4-5Q) y de 2 en 2 los viernes (5-6Q del mini-sim):

`II-2` AIEPI/IRA + inmunoprevenibles clínicos → `I-10` APS atributos → `V-6` telesalud (Ley 30421) → `II-6` TB (caso, licencia) → `II-10` cáncer (mama, alarma infantil) → `I-5+I-6` determinantes/demografía/bioestadística mínima → `II-EMG` prioridades de emergencia (RM jul-2026: P-I inmediato · P-II ≤10' · P-III ≤30'; nº de RM y P-IV **A VERIFICAR**) → `I-OCC` salud ocupacional (riesgo profesional; factores físico/químico/biológico/ergonómico/psicosocial; base legal **A VERIFICAR**) → `III-3` consentimiento: retiro voluntario / rechazo en emergencia → `I-11+I-12` plan local + intersectorialidad → `V-1` categorías/RRHH/UPSS → `V-3` RIS 4 dimensiones + RRHH → `III-1` (+III-2) ética SP + deontología CMP → `III-9` Ley 29414 por categorías → `II-9` salud mental comunitaria → `II-7` VACAM → `I-1` (+I-2) promoción/entornos + FESP.

En 94 días cada código cae **6-8 veces** entre lun-jue (76 slots) y viernes (36 slots), contado del SQL v5.13: II-2 · I-10 caen 8× · V-6 · II-6 · II-10 · I-5+I-6 · II-EMG · I-OCC caen 7× · III-3 · I-11+I-12 · V-1 · V-3 · III-1 · III-9 · II-9 · II-7 · I-1 caen 6× (III-3 pierde una aparición respecto a v5.12: era el secundario de la sesión II-11 del jue 28-ene que se cayó; I-11+I-12 la había perdido en v5.12 y V-1 en v5.11). II-EMG e I-OCC existen en `encapsCobertura.ts` desde el re-tier v3 (tier MEDIA, temario mínimo con marcas "A VERIFICAR").

### 3.4 Calendario sembrado (semana · Lun-Jue = código · sub-eje (+secundario) · Vie = mini-sim nº y sus 2 códigos de cola larga)

| Sem | Lun | Mar | Mié | Jue | Vie (mini-sim · cola larga) |
|---|---|---|---|---|---|
| 1 (14-sep) | — (lun 14-sep sin sesión) | — (mar 15-sep sin sesión) | — (mié 16-sep sin sesión: el D1 es el jueves) | **D1** · II-3 · esquema_intervalos (+II-2) → **contenido = PRE-TEST parte 1** (§1-bis) | SIM #2 · II-2 + I-10 |
| 2 (21-sep) | I-3 · tipos_vigilancia (+I-10) → **contenido = PRE-TEST parte 2** (§1-bis) | V-2 · planeamiento (+V-6) | III-5 · pertinencia_barreras (+II-6) | II-5 · nts_adolescente (+II-10) | SIM #7 · V-6 + II-6 |
| 3 (28-sep) | I-4 · dengue (+I-5+I-6) | IV-1 · metodo_cientifico (+II-EMG) | II-4 · suplementacion_cifras (+I-OCC) | II-1 · prenatal_emergencias (+III-3) | SIM #12 · II-10 + I-5+I-6 |
| 4 (05-oct) | I-3 · notificacion (+I-11+I-12) | V-2 · clima_calidad (+V-1) | III-8 · ley_27815 (+V-3) | II-11 · prep_dual_ptmi (+III-1) | SIM #17 · II-EMG + I-OCC |
| 5 (12-oct) | IV-6 · imryd (+III-9) | V-7 · farmacovigilancia_urm (+II-9) | II-8 · paquetes_tamizaje (+II-7) | II-3 · novedades_gestante (+I-1) | SIM #22 · III-3 + I-11+I-12 |
| 6 (19-oct) | I-3 · historia_natural (+II-2) | V-2 · residuos_bioseguridad (+I-10) | III-5 · medicina_tradicional (+V-6) | II-5 · mci_curso_vida (+II-6) | SIM #27 · V-1 + V-3 |
| 7 (26-oct) | I-4 · rabia (+II-10) | IV-1 · tipos_estudio (+I-5+I-6) | II-4 · anemia_dx_tto (+II-EMG) | II-1 · parto_lactancia (+I-OCC) | SIM #32 · III-1 + III-9 |
| 8 (02-nov) | I-3 · causalidad_hill (+III-3) | V-2 · planeamiento (+I-11+I-12) | III-8 · historia_clinica (+V-1) | II-11 · sifilis_sindromico (+V-3) | SIM #37 · II-9 + II-7 |
| 9 (09-nov) | IV-6 · etica_publicacion (+III-1) | V-7 · esenciales_sismed (+III-9) | II-8 · metas_hta_dm (+II-9) | II-3 · esavi_kit (+II-7) | SIM #42 · I-1 + II-2 |
| 10 (16-nov) | I-3 · sala_situacional_asis (+I-1) | V-2 · clima_calidad (+II-2) | III-5 · inclusion_migrantes (+I-10) | II-5 · nts_adolescente (+V-6) | SIM #47 · I-10 + V-6 |
| 11 (23-nov) | I-4 · epp_precauciones (+II-6) | IV-1 · muestreo (+II-10) | II-4 · plan_multisectorial (+I-5+I-6) | II-1 · prenatal_emergencias (+II-EMG) | SIM #52 · II-6 + II-10 |
| 12 (30-nov) | I-3 · brote_bloqueo (+I-OCC) | V-2 · residuos_bioseguridad (+III-3) | III-8 · ley_27815 (+I-11+I-12) | II-11 · prep_dual_ptmi (+V-1) | SIM #57 · I-5+I-6 + II-EMG |
| 13 (07-dic) | IV-6 · estadistica_descriptiva (+V-3) | V-7 · contrataciones_digemid (+III-1) | II-8 · paquetes_tamizaje (+III-9) | II-3 · cadena_frio (+II-9) | SIM #62 · I-OCC + III-3 |
| 14 (14-dic) | I-3 · tlp (+II-7) | V-2 · planeamiento (+I-1) | III-5 · pertinencia_barreras (+II-2) | II-5 · mci_curso_vida (+I-10) | SIM #67 · I-11+I-12 + V-1 |
| 15 (21-dic) | I-4 · malaria_zoonosis (+V-6) | IV-1 · instrumentos (+II-6) | II-4 · suplementacion_cifras (+II-10) | II-1 · parto_lactancia (+I-5+I-6) | — (25-dic feriado) |
| 16 (28-dic) | I-3 · desastres (+II-EMG) | V-2 · clima_calidad (+I-OCC) | III-8 · historia_clinica (+III-3) | — (31-dic) | — (1-ene) |
| 17 (04-ene) | II-11 · sifilis_sindromico (+I-11+I-12) | IV-6 · imryd (+V-1) | V-7 · farmacovigilancia_urm (+V-3) | II-8 · metas_hta_dm (+III-1) | SIM #79 · V-3 + III-1 |
| 18 (11-ene) | II-3 · esquema_intervalos (+III-9) | I-3 · tipos_vigilancia (+II-9) | V-2 · residuos_bioseguridad (+II-7) | III-5 · medicina_tradicional (+I-1) | SIM #84 · III-9 + II-9 |
| 19 (18-ene) | II-5 · nts_adolescente (+II-2) | I-4 · dengue (+I-10) | IV-1 · metodo_cientifico (+V-6) | II-4 · anemia_dx_tto (+II-6) | SIM #89 · II-7 + I-1 |
| 20 (25-ene) | II-1 · prenatal_emergencias (+II-10) | I-3 · notificacion (+I-5+I-6) | V-2 · planeamiento (+II-EMG) | III-8 · ley_27815 (+I-OCC) | **D94** · SIM #94 · II-2 + I-10 |

⚠ **Lo que cambió respecto a v5.12:** el mié 16-sep deja de tener sesión y el D1 pasa al jue 17-sep. Los **18 mini-sims conservan su viernes y su pareja de cola larga** (solo baja 1 su D#: #3 → #2 … #95 → #94). Las **76 sesiones lun-jue conservan código, sub-eje y secundario en el mismo orden pero corren un hábil**: la Sem A del ciclo 1 queda partida (jue 17 + lun 21 · mar 22 · mié 23), y en adelante cada semana de calendario abre con el jueves de la semana anterior de v5.12 (p. ej. la semana 18 abre ahora con II-3 · esquema_intervalos, no con I-3). El slot que se pierde es el 77.º (II-11 · prep_dual_ptmi del jue 28-ene): el plan sigue cerrando el vie 29-ene con el mini-sim #94 (II-2 + I-10). *(v5.12 había perdido el 78.º: IV-6 · etica_publicacion; v5.11 el 79.º: V-7 · esenciales_sismed.)*

Esta tabla se ha releído del SQL sembrado el 16-sep (`DATA/_scripts/_encaps_mantenimiento_2027.sql`, D1 = jue 17-sep-2026, régimen v5.13, 94 filas = 76 `banqueo1h` + 18 `mini_sim`) parseando fila a fila con `node` — no es una estimación. Un **override semanal** (§5) sustituye solo la semana indicada (máx. 2 slots) y queda anotado en `extra.override`. Cada día sin estudiar = +1 hábil: `node DATA/_scripts/gen_encaps_mantenimiento_2027.js <nuevo D1>` → revisar el SQL → `execute_sql` (la tabla se desplaza entera por delante; los sub-ejes y secundarios siguen su contador y el 29-ene no se mueve). **Siembra segura desde el 12-sep:** el backup se llama `study_schedule_bk_<YYYYMMDD>` por defecto y el SQL **aborta si ya existe** (mismo día → `--bk study_schedule_bk_<YYYYMMDD>b`); el `DELETE` va filtrado por `modo = 'MANTENIMIENTO'` (las filas INTENSIVO de febrero no se tocan); el generador **lee siempre `TRACKING_ERRORES/SEMANAS/overrides_acumulado.json`** (todas las semanas ya re-ponderadas) y el `--override` de la semana nueva se AÑADE encima, nunca sustituye a las anteriores; al final imprime la verificación (`select modo, tipo, count(*) …` → 76 banqueo1h + 18 mini_sim) para pegarla tras `execute_sql`.

## 4) De dónde salen las preguntas (en orden) — y qué está PROHIBIDO

1. **`DATA/ENCAPS/BANCO_PROPIO/`** — depósito único de sets pre-generados por código con gate de clave oficial (campos enunciado/opciones/clave/fuente/verificado_contra/formato). Hoy contiene `_examenes_reales_2024-2A_2026-1.json` (los 6 exámenes reales como moldes); los sets por código deficitario (V-2 por sub-eje, IV-1/2, IV-6/7, II-5, I-4, II-4) se van sumando ahí y alimentan también los mini-sims.
2. **Moldes/viñetas espejo SOLO de los exámenes 2024-2A · 2024-2B · 2025-1A · 2025-1B · 2025-2 · 2026-1** (`exams_txt/`, claves = resaltados de los PDF `TIO LOPEZ/CLAVE DE RESPUESTA *.pdf`).
3. **Postests Theomed** del área (links directos en la cola de la app) y **banco QX** por tema (los "18 sets / 2.052Q" del horario son QX por ÁREA, no banco propio: hay que ceñirse mentalmente al código y sub-eje del día).
4. **Sets nuevos generados por Claude** bajo el MOTOR DE PREGUNTAS (4 factores) + `PROTOCOLO_GENERACION_PREGUNTAS.md`: cada clave/NTS verificada contra fuente real. `GUIA_POR_TEMA*.md` tiene claves INVENTADAS — NO usar como fuente de claves.

> ### ⛔ LISTA NEGRA: el examen 2026-II (09-ago-2026, 100Q + clave oficial)
> Queda **RESERVADO ÍNTEGRAMENTE como pre-test diagnóstico** del arranque de la fase intensiva (viernes 5-feb-2027, `PRETEST_2026-II.md`).
> Hasta ese día **no se usa para nada**: ni como viñeta espejo, ni como molde, ni como "pregunta parecida", ni como fuente de cifras para el banco del día, la eval anclada o el mini-sim.
> Ficheros afectados: `_examen_2026-2_clasificado.json`, `_examen_2026-2_items.json`, `exams_txt/2026-2.txt`. Solo se leen para el pronóstico (ya hecho) y para el cierre de febrero.
> (Corrige la versión anterior de este protocolo, que lo declaraba reservado y a la vez "cantera de viñetas espejo": esa contradicción contaminaba el pre-test.)

## 5) Tutoría, medición y cierre — la métrica que manda es el **% CIEGO REAL = correctas SEGURAS / total**

- **Cierre de sesión (1 línea, obligatorio, 17:10)** — se apenda a `TRACKING_ERRORES/_registro_resoluciones.json` (esquema v3 multi-examen, `README_SISTEMA_TRACKING.md`):
  ```
  EXAMEN|tipoRonda|fecha|codigo|n=NN|seg=NN|dud=NN|SUBTIPO:k,SUBTIPO:k,…|t=SS[|sub=clave_sub_eje][|nota=NN]
  node DATA/_scripts/gen_encaps_semana.js --cerrar "ENCAPS|banco_dia|2026-09-17|II-3|n=22|seg=15|dud=3|CONCEPTO:1,OLVIDO:2,CCSN:1|t=68|sub=esquema_intervalos" --sql
  node DATA/_scripts/gen_encaps_semana.js --cerrar "ENCAPS|mini_sim|2026-09-18|MIX|n=25|seg=16|dud=3|CONCEPTO:2,OLVIDO:2,CCSN:1,TIEMPO:1|t=70|nota=19" --sql
  ```
  `seg` = seguras · `dud` = dudosas/adivinadas (NO cuentan) · subtipos: knowledge CONCEPTO/OLVIDO/CRONOLOGIA · transfer CCSN/CONTEXTO · proceso CAMBIO/TIEMPO/LECTURA. `--sql` emite el INSERT en `study_progress` (aplicar por MCP `execute_sql`, proyecto `qacynpqdrorpuegsmtcy`): de ahí sale el **% ciego semanal** que pinta el Cockpit.
- **Cierre semanal (viernes, 2 min)**: `node DATA/_scripts/gen_encaps_semana.js [--semana <lunes>] --sql` → `TRACKING_ERRORES/SEMANAS/semana_<lunes>.md` (% ciego por área vs vector v3, tabla por código, mini-sims, temas calientes con **n ≥ 5 por código**) + `override_<lunes siguiente>.json` + merge en **`SEMANAS/overrides_acumulado.json`** + `PERFIL_CONOCIMIENTO.md` regenerado. Si hay calientes: `node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-09-16 --override <ese json>` (lee el acumulado y AÑADE esa semana) → revisar SQL (backup `study_schedule_bk_<YYYYMMDD>`, `DELETE … AND modo='MANTENIMIENTO'`) → `execute_sql` → pegar la verificación que imprime el script. Reglas: máx. 2 sustituciones/semana · **I-3 y V-2 nunca se ceden** · un crítico solo se cede si ya está ≥85 % con n ≥ 5 · los secundarios de cola larga con fallos pasan primero · **nunca regenerar el mantenimiento sin el acumulado** (devolvería las semanas pasadas a la rotación base). Las rondas mixtas (pre-test de arranque, mini-sim, simulacro) con `preguntas[]` se reparten por el código de cada ítem: el **primer override con n ≥ 5 en los 8 críticos es el de la semana del 21-sep** (línea base del pre-test de arranque, §1-bis).
- **Perfil (no se edita a mano)**: `PERFIL_CONOCIMIENTO.md` lo genera `node DATA/_scripts/gen_encaps_semana.js --perfil` desde `resumen_por_subtema` + rondas (cabecera GENERADO + fecha); también se regenera solo tras cada `--cerrar` y cada cierre semanal.
- Umbrales: **≥85 %** ciego = meta (≈17/20) · **≥75 %** crucero en bancos del día · mini-sim **≥18/25** hacia diciembre · alerta **<15/25 dos viernes seguidos** → override obligatorio.
- Los fallos vuelven **con OTRO enfoque** en D+1 (eval anclada), D+3, D+7 y en los ≥5Q de "fallos previos" del mini-sim. Cada fallo OLVIDO (cifra/plazo) → tarjeta Anki esa misma tarde; CONCEPTO/CCSN → nota Obsidian (porqué).
- **Checkpoint de fin de enero** (v3 §6 regla 3): sale de la serie semanal (`SEMANAS/`), no se reconstruye a mano; redistribuye la mezcla de la fase intensiva hacia las áreas con brecha.

## 6) Qué NO se hace en esta hora

Videos largos · leer compendios enteros · mapas nuevos · normas completas · tocar el 2026-II. Solo PREGUNTAS + corrección
+ registro. El material de referencia (mapas QX, compendio, NTS, fichas MINSA) está linkeado en la tarjeta de
cobertura de la app SOLO para resolver dudas puntuales post-corrección.
