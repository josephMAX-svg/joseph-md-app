# 🇵🇪 PROTOCOLO DE LA HORA ENCAPS — MANTENIMIENTO 2027-I (16:15–17:15 L-V · D1 lun 7-sep-2026 → vie 29-ene-2027 · 102 días)

> La hora tiene UNA sola misión: llegar a febrero con base sólida para que la fase intensiva
> (feb–mar 2027, ENCAPS vuelve a bloque principal) arranque desde **~70 % ciego** y no desde cero.
> Meta final: **≥17/20 en ENCAPS 2027-I (fines de marzo 2027; fecha real = convocatoria SERUMS 2027-I, A VERIFICAR) · percentil 1 % (~2.000 plazas)**.
> La cola vive en la app (Estudio → Perú → Supabase `study_schedule` examen `ENCAPS`, modo `MANTENIMIENTO`,
> 102 días · backup `study_schedule_bk_0906b`). Siembra: `DATA/_scripts/gen_encaps_mantenimiento_2027.js`
> (configuración compartida en `_encaps_ciclo_v3.js`). Versión **v3.1 (05-sep-2026)**: sub-ejes por sesión,
> secundario de cola larga, receta fija del mini-sim, cierre de 1 línea y **lista negra del 2026-II**.

Fuente única de pesos y críticos: `PRONOSTICO_WALKFORWARD_2027-1_v3.md` — vector **II 30 · I 27 · V 21 · III 13 · IV 9**
(bandas 27-34 / 24-29 / 18-25 / 11-15 / 5-14; IV es bimodal por comité: **nunca más a piso**) ·
**8 críticos**: I-3 · V-2 · II-3 · III-5 · I-4 · II-5 · II-4 · IV-1+IV-2 (~49 % del examen) ·
**ALTA con flag de rebote**: II-1 · II-11 · II-8 · formato esperado **45-70 % viñeta** → doble modo (viñeta + recall de cifras).

---

## 1) Estructura del día (lun–jue) — tal como la muestra la app en «Hoy»

| Franja | Qué | Regla |
|---|---|---|
| 16:15–16:30 | **EVAL ANCLADA** — 5Q del tema de AYER, de memoria, sin material (**3 cifras + 2 viñetas**) | Si fallas ≥2 → el tema vuelve "caliente" y entra al override de la semana siguiente |
| 16:30–17:02 | **BANCO DEL DÍA** — 16-20Q CIEGAS del código de la rotación, **ceñidas al SUB-EJE de la sesión** (columna `subtema` / `extra.sub_eje`) | Pregunta-por-pregunta con corrección inmediata (Palmerton). ~50 % viñeta / 50 % recall directo de cifras. Nivel ≥ examen real, distractor = concepto vecino |
| 17:02–17:10 | **SECUNDARIO de cola larga** — 4-5Q ciegas del código que marca `temas_secundarios` (`extra.secundario`) | Cubre los ≈30 pp del vector que la rotación principal no toca (17 códigos, §3) |
| 17:10–17:15 | **CIERRE DE 1 LÍNEA** (§5) + ≤3 APEX de errores de conocimiento | Solo fallos knowledge/transfer generan tarjeta/nota; los de proceso generan regla de examen |

Total del banco: 20-25Q (16-20 principal + 4-5 secundario). La franja 16:15–17:15 no cambia.

## 2) VIERNES = 🔥 mini-simulacro 25Q · 72 s/Q — receta FIJA (en `extra` de cada viernes)

| Parámetro | Valor | Nota |
|---|---|---|
| Preguntas | **25** mixtas · **II 8 · I 7 · V 5 · III 3 · IV 2** | proporcional al vector v3 |
| Reloj | **72 s/Q → 30 min** (16:15–16:45), sin pausa | modo examen estricto |
| Formato | **50 % viñeta / 50 % recall directo** | entrena los dos modos del 2026-II |
| Críticos | **≥10Q** de los 8 críticos v3 | |
| Fallos previos | **≥5Q** rehechas con OTRO enfoque desde `_registro_resoluciones.json` | D+3 / D+7 del registro |
| Cola larga | **5-6Q** repartidas entre los **2 códigos** que marca el viernes (`extra.cola_larga`) | 19 viernes → cada uno de los 17 códigos cae ~2× |
| Corrección | 16:45–17:15: corrección por código + nota /25 en **▲ SIM** (se guarda en `study_sim_scores`, `sim_n` = día) + cierre de 1 línea con `tipoRonda=mini_sim` y `nota=NN` | el Cockpit («Camino a 17/20») grafica la serie contra la línea 18/25 |
| Umbral | **≥18/25 hacia diciembre** | línea oro del gráfico |
| Alerta | **<15/25 dos viernes seguidos** → la semana siguiente se re-pondera (override, §5) | línea coral |

Los 25Q se pre-generan (no en vivo a las 16:15) desde `BANCO_PROPIO/` + moldes de exámenes 2024-2A→2026-1 (§4). Viernes sin mini-sim: 25-dic y 1-ene (feriados); esas semanas cierran con el jueves.

## 3) Rotación de 4 semanas (lun–jue) + sub-ejes + secundarios

### 3.1 Ciclo base (se repite ~5.2 veces = 83 slots lun-jue; el contador NO se reinicia en feriados)

| | Lun | Mar | Mié | Jue |
|---|---|---|---|---|
| **Sem A** | II-3 Inmunizaciones | **I-3 Vigilancia** | **V-2 Gestión/planeamiento** | III-5 Interculturalidad |
| **Sem B** | II-5 APS/adolescente (MCI) | I-4 Transmisibles/brotes | IV-1+IV-2 Investigación | II-4 Anemia/CRED |
| **Sem C** | II-1 Gestante ↩ | **I-3** (2ª del ciclo) | **V-2** (2ª del ciclo) | III-8 Ética función pública |
| **Sem D** | II-11 ITS/VIH ↩ | IV-6+IV-7 Publicación/estadística | V-7+V-10 (V-MED) | II-8 ENT/diabetes ↩ |

I-3 y V-2 caen **2× por ciclo** (11 sesiones cada uno); II-3 6; el resto 5. ↩ = ALTA con flag de rebote. IV tiene 2 slots fijos por ciclo (lección 2026-II: 4→12).

### 3.2 Sub-eje por sesión (rotación circular por INSTANCIA del código; la app lo muestra como «◈ Sub-eje de hoy n/total»)

| Código | Sub-ejes en orden (la sesión k del código toma el sub-eje ((k−1) mod total)+1) | Reparto en los 102 días |
|---|---|---|
| **V-2** (11) | 1 planeamiento (PEI/POI/FODA, objetivos estratégicos, CEPLAN) · 2 clima organizacional (SERVIR, dimensiones, 3 fases) + gestión de la calidad · 3 residuos sólidos/bioseguridad (colores de bolsa, punzocortantes 3/4, etapas) | **4 planeamiento · 4 clima+calidad · 3 residuos** (= reparto 2026-II: 5/4/2) |
| **I-3** (11) | 1 tipos de vigilancia + definiciones de caso · 2 notificación inmediata/semanal, ficha, flujo RENACE (Dir. 341-2023) · 3 historia natural · 4 causalidad (necesaria/suficiente, Hill, RR/OR/RA) · 5 sala situacional/ASIS · 6 brote: pasos, tasa de ataque, curva, canal endémico, bloqueo vacunal · 7 TLP y mediciones (razón/proporción/tasa, incidencia/prevalencia, letalidad) · 8 desastres (EDAN, vigilancia post-desastre) | los 8 del núcleo v3 + vuelven 1-3 |
| **IV-1+IV-2** (5) | 1 método científico (definiciones textuales) · 2 tipos de estudio · 3 muestreo probabilístico vs no probabilístico + tamaño muestral · 4 instrumentos, validez y confiabilidad | 2·1·1·1 |
| **II-3** (6) | 1 esquema + intervalos mínimos · 2 novedades gestante (VRS 32-36 sem, Tdap, influenza) + incorporaciones PNI · 3 ESAVI + kit (epinefrina 0.01 mg/kg IM) · 4 cadena de frío (2-8 °C, ruptura) | 2·2·1·1 |
| I-4 (5) | dengue completo (escenarios I/II/III, índice aédico, control, necropsia 24 h) · rabia (exposición, profilaxis) · precauciones/EPP por patógeno · malaria y zoonosis | 2·1·1·1 |
| II-5 (5) | NTS adolescente (riesgo, factores protectores, consejería, IE→EESS) · MCI por curso de vida (objetivo, indicadores, paquetes) | 3·2 |
| II-4 (5) | suplementación con CIFRAS (MEF 60 mg + 400 µg 2×/sem × 3 m, escolar 60 mg diario × 3 m, lactante) · anemia dx/tto (Hb, altitud) · plan multisectorial + consejería OMS + CRED | 2·2·1 |
| III-5 (5) | pertinencia y barreras culturales · medicina tradicional + pertenencia étnica · inclusión social/migrantes | 2·2·1 |
| II-1 ↩ (5) | prenatal + emergencias obstétricas (claves) · parto/puerperio/lactancia | 3·2 |
| II-11 ↩ (5) | PrEP, prueba dual, PTMI · sífilis gestacional (PGB 2.4 M UI) + sindrómico | 3·2 |
| II-8 ↩ (5) | paquetes ENT + tamizaje (HEARTS) · metas HTA/DM (HbA1c, 150 min/sem) | 3·2 |
| III-8 (5) | Ley 27815 deberes vs prohibiciones vs principios · historia clínica (archivo activo 5 años, acceso, custodia) | 3·2 |
| IV-6+IV-7 (5) | IMRyD · ética de publicación · estadística descriptiva (moda/mediana/media, dispersión) | 2·2·1 |
| V-7+V-10 (5) | farmacovigilancia + URM · esenciales/PNUME, SISMED, stock · contrataciones (área usuaria) + DIGEMID | 2·2·1 |

### 3.3 Secundario de cola larga (17 códigos ≈ 30-35 pp del vector v3, fuera de la rotación principal)

Rotan en este orden, un código por sesión lun-jue (`temas_secundarios[rol=cola_larga]`, 4-5Q) y de 2 en 2 los viernes (5-6Q del mini-sim):

`II-2` AIEPI/IRA + inmunoprevenibles clínicos → `I-10` APS atributos → `V-6` telesalud (Ley 30421) → `II-6` TB (caso, licencia) → `II-10` cáncer (mama, alarma infantil) → `I-5+I-6` determinantes/demografía/bioestadística mínima → `II-EMG` prioridades de emergencia (RM jul-2026: P-I inmediato · P-II ≤10' · P-III ≤30'; nº de RM y P-IV **A VERIFICAR**) → `I-OCC` salud ocupacional (riesgo profesional; factores físico/químico/biológico/ergonómico/psicosocial; base legal **A VERIFICAR**) → `III-3` consentimiento: retiro voluntario / rechazo en emergencia → `I-11+I-12` plan local + intersectorialidad → `V-1` categorías/RRHH/UPSS → `V-3` RIS 4 dimensiones + RRHH → `III-1` (+III-2) ética SP + deontología CMP → `III-9` Ley 29414 por categorías → `II-9` salud mental comunitaria → `II-7` VACAM → `I-1` (+I-2) promoción/entornos + FESP.

En 102 días cada código cae **6-8 veces** entre lun-jue (83 slots) y viernes (38 slots). II-EMG e I-OCC existen en `encapsCobertura.ts` desde el re-tier v3 (tier MEDIA, temario mínimo con marcas "A VERIFICAR").

### 3.4 Calendario sembrado (semana · Lun-Jue = código · sub-eje (+secundario) · Vie = mini-sim nº y sus 2 códigos de cola larga)

| Sem | Lun | Mar | Mié | Jue | Vie (mini-sim · cola larga) |
|---|---|---|---|---|---|
| 1 (07-sep) | II-3 · esquema_intervalos (+II-2) | I-3 · tipos_vigilancia (+I-10) | V-2 · planeamiento (+V-6) | III-5 · pertinencia_barreras (+II-6) | SIM #5 · II-2 + I-10 |
| 2 (14-sep) | II-5 · nts_adolescente (+II-10) | I-4 · dengue (+I-5+I-6) | IV-1 · metodo_cientifico (+II-EMG) | II-4 · suplementacion_cifras (+I-OCC) | SIM #10 · V-6 + II-6 |
| 3 (21-sep) | II-1 · prenatal_emergencias (+III-3) | I-3 · notificacion (+I-11+I-12) | V-2 · clima_calidad (+V-1) | III-8 · ley_27815 (+V-3) | SIM #15 · II-10 + I-5+I-6 |
| 4 (28-sep) | II-11 · prep_dual_ptmi (+III-1) | IV-6 · imryd (+III-9) | V-7 · farmacovigilancia_urm (+II-9) | II-8 · paquetes_tamizaje (+II-7) | SIM #20 · II-EMG + I-OCC |
| 5 (05-oct) | II-3 · novedades_gestante (+I-1) | I-3 · historia_natural (+II-2) | V-2 · residuos_bioseguridad (+I-10) | III-5 · medicina_tradicional (+V-6) | SIM #25 · III-3 + I-11+I-12 |
| 6 (12-oct) | II-5 · mci_curso_vida (+II-6) | I-4 · rabia (+II-10) | IV-1 · tipos_estudio (+I-5+I-6) | II-4 · anemia_dx_tto (+II-EMG) | SIM #30 · V-1 + V-3 |
| 7 (19-oct) | II-1 · parto_lactancia (+I-OCC) | I-3 · causalidad_hill (+III-3) | V-2 · planeamiento (+I-11+I-12) | III-8 · historia_clinica (+V-1) | SIM #35 · III-1 + III-9 |
| 8 (26-oct) | II-11 · sifilis_sindromico (+V-3) | IV-6 · etica_publicacion (+III-1) | V-7 · esenciales_sismed (+III-9) | II-8 · metas_hta_dm (+II-9) | SIM #40 · II-9 + II-7 |
| 9 (02-nov) | II-3 · esavi_kit (+II-7) | I-3 · sala_situacional_asis (+I-1) | V-2 · clima_calidad (+II-2) | III-5 · inclusion_migrantes (+I-10) | SIM #45 · I-1 + II-2 |
| 10 (09-nov) | II-5 · nts_adolescente (+V-6) | I-4 · epp_precauciones (+II-6) | IV-1 · muestreo (+II-10) | II-4 · plan_multisectorial (+I-5+I-6) | SIM #50 · I-10 + V-6 |
| 11 (16-nov) | II-1 · prenatal_emergencias (+II-EMG) | I-3 · brote_bloqueo (+I-OCC) | V-2 · residuos_bioseguridad (+III-3) | III-8 · ley_27815 (+I-11+I-12) | SIM #55 · II-6 + II-10 |
| 12 (23-nov) | II-11 · prep_dual_ptmi (+V-1) | IV-6 · estadistica_descriptiva (+V-3) | V-7 · contrataciones_digemid (+III-1) | II-8 · paquetes_tamizaje (+III-9) | SIM #60 · I-5+I-6 + II-EMG |
| 13 (30-nov) | II-3 · cadena_frio (+II-9) | I-3 · tlp (+II-7) | V-2 · planeamiento (+I-1) | III-5 · pertinencia_barreras (+II-2) | SIM #65 · I-OCC + III-3 |
| 14 (07-dic) | II-5 · mci_curso_vida (+I-10) | I-4 · malaria_zoonosis (+V-6) | IV-1 · instrumentos (+II-6) | II-4 · suplementacion_cifras (+II-10) | SIM #70 · I-11+I-12 + V-1 |
| 15 (14-dic) | II-1 · parto_lactancia (+I-5+I-6) | I-3 · desastres (+II-EMG) | V-2 · clima_calidad (+I-OCC) | III-8 · historia_clinica (+III-3) | SIM #75 · V-3 + III-1 |
| 16 (21-dic) | II-11 · sifilis_sindromico (+I-11+I-12) | IV-6 · imryd (+V-1) | V-7 · farmacovigilancia_urm (+V-3) | II-8 · metas_hta_dm (+III-1) | — (25-dic feriado) |
| 17 (28-dic) | II-3 · esquema_intervalos (+III-9) | I-3 · tipos_vigilancia (+II-9) | V-2 · residuos_bioseguridad (+II-7) | — (31-dic) | — (1-ene) |
| 18 (04-ene) | III-5 · medicina_tradicional (+I-1) | II-5 · nts_adolescente (+II-2) | I-4 · dengue (+I-10) | IV-1 · metodo_cientifico (+V-6) | SIM #87 · III-9 + II-9 |
| 19 (11-ene) | II-4 · anemia_dx_tto (+II-6) | II-1 · prenatal_emergencias (+II-10) | I-3 · notificacion (+I-5+I-6) | V-2 · planeamiento (+II-EMG) | SIM #92 · II-7 + I-1 |
| 20 (18-ene) | III-8 · ley_27815 (+I-OCC) | II-11 · prep_dual_ptmi (+III-3) | IV-6 · etica_publicacion (+I-11+I-12) | V-7 · esenciales_sismed (+V-1) | SIM #97 · II-2 + I-10 |
| 21 (25-ene) | II-8 · paquetes_tamizaje (+V-3) | II-3 · novedades_gestante (+III-1) | I-3 · historia_natural (+III-9) | V-2 · clima_calidad (+II-9) | SIM #102 · V-6 + II-6 |

Esta tabla es la siembra base del 05-sep; un **override semanal** (§5) sustituye solo la semana indicada (máx. 2 slots) y queda anotado en `extra.override`. Cada día sin estudiar = +1 hábil: `node DATA/_scripts/gen_encaps_mantenimiento_2027.js <nuevo D1>` → `execute_sql` (la tabla se desplaza entera; los sub-ejes y secundarios siguen su contador).

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
  node DATA/_scripts/gen_encaps_semana.js --cerrar "ENCAPS|banco_dia|2026-09-07|II-3|n=22|seg=15|dud=3|CONCEPTO:1,OLVIDO:2,CCSN:1|t=68|sub=esquema_intervalos" --sql
  node DATA/_scripts/gen_encaps_semana.js --cerrar "ENCAPS|mini_sim|2026-09-11|MIX|n=25|seg=16|dud=3|CONCEPTO:2,OLVIDO:2,CCSN:1,TIEMPO:1|t=70|nota=19" --sql
  ```
  `seg` = seguras · `dud` = dudosas/adivinadas (NO cuentan) · subtipos: knowledge CONCEPTO/OLVIDO/CRONOLOGIA · transfer CCSN/CONTEXTO · proceso CAMBIO/TIEMPO/LECTURA. `--sql` emite el INSERT en `study_progress` (aplicar por MCP `execute_sql`, proyecto `qacynpqdrorpuegsmtcy`): de ahí sale el **% ciego semanal** que pinta el Cockpit.
- **Cierre semanal (viernes, 2 min)**: `node DATA/_scripts/gen_encaps_semana.js [--semana <lunes>] --sql` → `TRACKING_ERRORES/SEMANAS/semana_<lunes>.md` (% ciego por área vs vector v3, tabla por código, mini-sims, temas calientes) + `override_<lunes siguiente>.json`. Si hay calientes: `node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-09-07 --override <ese json>` → revisar SQL → `execute_sql`. Reglas: máx. 2 sustituciones/semana · **I-3 y V-2 nunca se ceden** · un crítico solo se cede si ya está ≥85 % con n ≥ 5 · los secundarios de cola larga con fallos pasan primero.
- Umbrales: **≥85 %** ciego = meta (≈17/20) · **≥75 %** crucero en bancos del día · mini-sim **≥18/25** hacia diciembre · alerta **<15/25 dos viernes seguidos** → override obligatorio.
- Los fallos vuelven **con OTRO enfoque** en D+1 (eval anclada), D+3, D+7 y en los ≥5Q de "fallos previos" del mini-sim. Cada fallo OLVIDO (cifra/plazo) → tarjeta Anki esa misma tarde; CONCEPTO/CCSN → nota Obsidian (porqué).
- **Checkpoint de fin de enero** (v3 §6 regla 3): sale de la serie semanal (`SEMANAS/`), no se reconstruye a mano; redistribuye la mezcla de la fase intensiva hacia las áreas con brecha.

## 6) Qué NO se hace en esta hora

Videos largos · leer compendios enteros · mapas nuevos · normas completas · tocar el 2026-II. Solo PREGUNTAS + corrección
+ registro. El material de referencia (mapas QX, compendio, NTS, fichas MINSA) está linkeado en la tarjeta de
cobertura de la app SOLO para resolver dudas puntuales post-corrección.
