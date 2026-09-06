# 📡 SEÑALES 2027-I — vigía de convocatoria, normas y coyuntura (log fechado + rutina quincenal)

> **Por qué existe:** el backtest del 2026-II probó que el comité escribe alrededor de lo RECIENTE: normas publicadas 0-6 meses antes entran directo (RM de jul-2026 sobre prioridades de emergencia cayó en ago-2026: lección **L6**), la coyuntura epidemiológica genera clusters (dengue 8Q + sarampión 5Q en 2026-II: lección **L3**) y las novedades del esquema de vacunación (VRS gestante) se preguntan al año siguiente (`ANALISIS_EXAMEN_2026-2_REAL.md` §3, `PRONOSTICO_WALKFORWARD_2027-1_v3.md` §4-5). Además, **toda la fase intensiva depende de la fecha real del examen**, que solo la fija la convocatoria SERUMS 2027-I (`FASE_INTENSIVA_2027-I.md` §0).
> **Regla:** nada entra al banco por "me suena": cada señal se anota aquí con fecha y fuente, y solo se convierte en preguntas/tarjetas cuando está verificada (gate §3-bis del `PROTOCOLO_GENERACION_PREGUNTAS.md`). Lo no verificable queda marcado **A VERIFICAR (dd-mmm)**.
> **Sin tareas programadas creadas** (05-sep-2026): la rutina de §2 se ejecuta a mano o con una tarea quincenal que Joseph decide crear (pendiente).

---

## 1) Los 5 canales (qué se mira, qué se busca, a qué código v3 alimenta)

| # | Canal | Dónde (dominios oficiales; rutas exactas A VERIFICAR) | Qué se busca | Alimenta |
|---|---|---|---|---|
| 1 | **Convocatoria y cronograma SERUMS 2027-I** | gob.pe/minsa (DIGEP-SERUMS: convocatoria, bases, cronograma de inscripción, fecha del ENCAPS) | **fecha y hora del examen**, sede, requisitos, nº de plazas, estructura del examen si cambia (100Q, 5 áreas) | dispara la siembra de la intensiva (`gen_encaps_intensivo_2027.js 2027-02-01 <fecha>`), `study_metrics.exam_date`, escenario CORTO/MEDIO/LARGO |
| 2 | **Normas MINSA en El Peruano** | elperuano.pe (Normas Legales, sección Salud) y gob.pe/minsa (normas) | RM / NTS / Directivas nuevas o modificatorias: esquema de vacunación, anemia, adolescente/MCI, dengue, emergencias/triaje, telesalud, residuos, interculturalidad, HC/derechos | el código v3 de cada norma; **L6**: lo publicado sep-2026 → mar-2027 entra al barrido de febrero con prioridad |
| 3 | **DGE: sala situacional + boletín epidemiológico semanal** | dge.gob.pe | brotes/alertas vigentes: dengue (escenarios, regiones), sarampión, tosferina, oropouche, leptospirosis, rabia, fiebre amarilla; alertas epidemiológicas | I-3 (vigilancia/brote/bloqueo), I-4 (transmisibles), II-2/II-3 (inmunoprevenibles); **L3**: lo que esté en sala situacional dic-2026 → mar-2027 es material predictivo |
| 4 | **ESAVI / PNI (inmunizaciones)** | gob.pe/minsa (DGIESP-Inmunizaciones), DGE (ESAVI) | incorporaciones al esquema (VRS gestante ya cayó; vigilar hexavalente, VPH dosis única, nuevas campañas), cambios de intervalos, kit/ESAVI | II-3 (esquema + novedades gestante + ESAVI + cadena de frío) → filas nuevas en `CIFRAS_CRITICAS_2027-I.md` |
| 5 | **QX Tendencias + simulacros de academias** (solo en enero) | qxmedic-aulavirtual.com `/metodo-qx/tendencias` (`_qx_tendencias.json` es del 01-jul-2026) · Theomed curso 37 | cambio de estilo del comité (viñeta vs recall), temas "en alza", nuevos simulacros 2027-I | pesos del v3 (condicional de IV, formato 45-70 % viñeta), lista de simulacros de viernes (`FASE_INTENSIVA_2027-I.md` §4) |

## 2) Rutina quincenal (desde el **jue 1-oct-2026**, 30 min, fuera de la hora ENCAPS)

Fechas: 1-oct · 15-oct · 29-oct · 12-nov · 26-nov · 10-dic · 24-dic · 7-ene · 21-ene · **lun 1-feb** (re-scan completo, fila `senales` de la semana 1 de la intensiva) · y semanal en feb-mar.

1. Canales 1-4 (canal 5 solo desde enero). Para cada uno: ¿hay algo nuevo desde la última fecha del log? Si no, se anota "sin novedad" (también es dato).
2. Cada novedad → **una fila en el log de §4** con fecha, canal, señal (título + número/año de la norma o fecha del boletín), código v3, impacto (ALTO = entra al examen casi seguro / MEDIO / BAJO) y estado (VERIFICADA / A VERIFICAR).
3. **Regla de conversión** (solo señales VERIFICADAS):
   - **Ficha de 1 página** en `TRACKING_ERRORES/OBSIDIAN_COLA/senal_<fecha>_<codigo>.md` (qué cambia, cifras/plazos textuales, cómo la preguntaría el comité).
   - **3-5 preguntas** en `BANCO_PROPIO/set_senales_<fecha>.json` (esquema de `banco_items_v1.json`, `verificado_contra` = la norma con número y año, `reservado_para` = el viernes siguiente) → el mini-sim de ese viernes las toma primero (`gen_encaps_minisim.js <viernes>`); en la intensiva van al simulacro 100Q propio.
   - **Tarjetas** de cifras/plazos/definiciones en `ANKI_COLA/ENCAPS_Cifras_2027-I.csv` (mismo formato: `Frente;Reverso;Tags` con `cod::<código> fuente::senal-<fecha>`) → reimportar al deck `ENCAPS::Cifras` (`CIFRAS_CRITICAS_2027-I.md` §4).
4. Si la señal es la **fecha del examen** (canal 1): ese mismo día se ejecuta `FASE_INTENSIVA_2027-I.md` §5 (generar SQL con la fecha real → revisar → `execute_sql`), se actualiza `study_metrics.exam_date` y se ajusta el Calendar (a mano).
5. Cierre: actualizar la línea "Última revisión" de §3.

## 3) Estado

- **Última revisión:** 05-sep-2026 (arranque del log; ninguna búsqueda en vivo hecha en esta sesión: las filas de §4 salen de los materiales ya extraídos y quedan **A VERIFICAR** contra la fuente primaria).
- **Convocatoria SERUMS 2027-I:** NO publicada al 05-sep-2026 (A VERIFICAR el 1-oct). Fecha del examen: desconocida; escenario de trabajo = CORTO (dom 14-mar-2027).
- **Tarea programada quincenal:** no creada (decisión de Joseph: scheduled-tasks MCP o `/loop`).

## 4) Log fechado (append-only; nuevas filas ARRIBA)

| Fecha | Canal | Señal (fuente) | Código v3 | Impacto | Acción (ficha / Q / cifras) | Estado |
|---|---|---|---|---|---|---|
| 05-sep-2026 | 1 | Convocatoria SERUMS 2027-I: sin publicar. Fechas asumidas en el sistema (26-mar y 28-mar-2027) caen en Semana Santa 2027 (Jue 25 · Vie 26 · Pascua 28-mar, verificado) → imposibles; se trabaja con escenario CORTO 14-mar (`FASE_INTENSIVA_2027-I.md` §0) | — | ALTO | ninguna hasta la convocatoria | A VERIFICAR (1-oct) |
| 05-sep-2026 | 2 | RM de julio 2026 sobre **prioridades de atención en emergencia** (P-I inmediato · P-II ≤10' · P-III ≤30'), citada en `ANALISIS_EXAMEN_2026-2_REAL.md` (cayó en el 2026-II a 1 mes de publicada); nº de RM y P-IV sin confirmar | II-EMG | ALTO (rebote probable) | cifras ya en el CSV (fuente 2026-II); ficha + 3Q cuando se confirme el nº de RM | A VERIFICAR (nº RM) |
| 05-sep-2026 | 4 | **VRS en gestante 32-36 sem** y **Tdap en gestante** como novedades del esquema (2025-26); ya preguntadas en 2026-II | II-3 | MEDIO (ya cayó; vigilar la siguiente incorporación) | cifras en el CSV; set_II-3_1 cubre Tdap 20-36 sem (compendio López 2026-I) | VERIFICADA en compendio; NTS vigente A VERIFICAR |
| 05-sep-2026 | 4 | Manual Theomed CI 2026: el esquema nacional = NTS N° 196-MINSA/DGIESP-2022 **y modificatoria que incorpora la vacuna HEXAVALENTE (DPT-HvB-Hib-IPV) como vacuna N° 19**; la sección 4 del mismo manual cita "NTS N° 238-MINSA/2025" para el esquema (contradicción interna: el TheoResumen MCI asigna la NTS 238-2025 a CRED) | II-3 / II-2 | MEDIO | pregunta de esquema solo con el nº de norma confirmado | A VERIFICAR (nº NTS vigente del esquema y de CRED) |
| 05-sep-2026 | 2 | TheoResumen MCI: **NTS N° 229-MINSA/DGIESP-2025 (persona adulta, RM 310-2025)** y **NTS N° 238-MINSA/DGIESP-2025 (CRED 0-11 años, publicada mar-2026)**; el propio resumen dice "información de búsqueda web, verificar con texto completo" | II-5 / II-2 / II-8 | ALTO si se confirman (normas de 2025-26 = L6) | ficha + 3-5Q tras leer el texto oficial | A VERIFICAR (El Peruano) |
| 05-sep-2026 | 2 | Manual Theomed Bloque III: **Directiva Administrativa N° 384-MINSA/DGIESP-2025 (RM N° 726-2025/MINSA)** amplía la adecuación con pertinencia cultural al 2.º nivel (hospitales); la del 1.er nivel sigue siendo la Dir. 261-MINSA/2019/DGIESP (RM 228-2019) | III-5 | MEDIO | set_III-5_1 ya pregunta la Dir. 261; añadir 1-2Q de la 384 al confirmarla | A VERIFICAR |
| 05-sep-2026 | 3 | **Brote regional de sarampión 2026** (el enunciado de la Q5 del 2026-II cita ~22 mil casos) y **dengue** (8Q en 2026-II): seguir boletín DGE dic-2026 → mar-2027 | I-3 / I-4 / II-2 | ALTO | bloqueo vacunal 25 manzanas, vigilancia activa, vitamina A: cifras ya en el CSV; ficha de sala situacional en enero | A VERIFICAR (boletín semanal) |
| 05-sep-2026 | 3 | Theomed "Compendio de definiciones de caso": **NTS N° 233-2025 de malaria** cambia "caso probable" por "caso sospechoso" (clínica + nexo) — fichas de vigilancia posiblemente no actualizadas | I-4 / I-3 | MEDIO | 1-2Q de definición de caso de malaria con la NTS a la vista | A VERIFICAR (texto de la NTS 233) |
| 05-sep-2026 | 5 | `_qx_tendencias.json` es del 01-jul-2026 (previo al 2026-II): re-scan en enero, no antes | — | — | — | pendiente (ene-2027) |

## 5) Qué NO es señal

- Materiales de academias sin número/año de norma ("dicen que ahora…"), posts en redes, resúmenes de terceros sin fuente. Se anotan como "rumor" solo si dos canales lo repiten, y nunca generan preguntas hasta verificarse.
- El 2026-II en sí: no es señal, es el pre-test (LISTA NEGRA hasta el 5-feb-2027).
