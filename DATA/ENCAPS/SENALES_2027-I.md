# 📡 SEÑALES 2027-I — vigía de convocatoria, normas y coyuntura (log fechado + rutina quincenal)

> ## ✅ v6.00 VIGENTE (6-oct-2026) — manda sobre las menciones al «mié 10-mar» de abajo
> - **Examen ENCAPS/SERUMS 2027-I = dom 14-mar-2027 PROVISIONAL** (DJ-5: Joseph dijo «**más o menos el 14**» de marzo; **6/6 ENCAPS previos fueron en domingo**).
>   Supabase: `study_metrics.extra.exam_date = '2027-03-14'`; fuente única `DATA/_scripts/_fechas_v6.json → encaps.examen` (provisional: true). Sustituye al
>   mié 10-mar «fijado» de v5.20 (SUPERSEDIDO).
> - **Regla de la convocatoria = examen − 25 días** (`encaps.convocatoria_tope`): si al **mié 17-feb-2027** no hay convocatoria publicada, el 14-mar queda
>   descartado y se pasa al **dom 21-mar** (tope mié 24-feb); después 4-abr (tope mié 10-mar), 11-abr (mié 17-mar), 18-abr (mié 24-mar), 25-abr (mié 31-mar).
> - **La intensiva ya no espera al Step 1:** sembrada **lun 4-ene → vie 12-mar-2027** (`dia` 61-110); el **re-scan completo de señales es el lun 4-ene** (fila
>   `senales`, dia 61) y el **PRE-TEST 2026-II el vie 8-ene** (dia 65): desde ese día el 2026-II deja la LISTA NEGRA.
> - **Si la convocatoria publica otra fecha:** se cambia `encaps.examen` en `_fechas_v6.json` y se regenera **una sola vez**: ENCAPS filas ≥ lun 8-mar
>   (`gen_encaps_intensivo_2027.js --desde 2027-03-08 --carril-b …`: módulos de extensión + cola D-5…D-1) → protegidos → MIR/Research/Derma/AURUM → tramo 2
>   del Step 1 (nuevo reinicio; fecha a reservar del Step 1 según la tabla DJ-1) → Calendar. Las filas ≤ vie 5-mar no se tocan
>   (`DATA/REESTRUCTURACION_31AGO_2026.md` §24.5, `FASE_INTENSIVA_2027-I.md` bloque v6.00).

> **Por qué existe:** el backtest del 2026-II probó que el comité escribe alrededor de lo RECIENTE: normas publicadas 0-6 meses antes entran directo (RM de jul-2026 sobre prioridades de emergencia cayó en ago-2026: lección **L6**), la coyuntura epidemiológica genera clusters (dengue 8Q + sarampión 5Q en 2026-II: lección **L3**) y las novedades del esquema de vacunación (VRS gestante) se preguntan al año siguiente (`ANALISIS_EXAMEN_2026-2_REAL.md` §3, `PRONOSTICO_WALKFORWARD_2027-1_v3.md` §4-5). Además, **toda la fase intensiva depende de la fecha real del examen**: v5.20 (6-oct-2026) — Joseph la **FIJÓ en el mié 10-mar-2027** y la intensiva ya está sembrada (mar 23-feb → mar 9-mar, `FASE_INTENSIVA_2027-I.md`, bloque v5.20); la convocatoria SERUMS 2027-I sigue siendo la fuente oficial: debe **confirmar día, hora y sede** (los ENCAPS fueron siempre en domingo y el 10-mar es miércoles) o, si publica otra fecha, obliga a regenerar. *(Hasta v5.19 la fecha solo la fijaba la convocatoria, `FASE_INTENSIVA_2027-I.md` §0.)*
> **Regla:** nada entra al banco por "me suena": cada señal se anota aquí con fecha y fuente, y solo se convierte en preguntas/tarjetas cuando está verificada (gate §3-bis del `PROTOCOLO_GENERACION_PREGUNTAS.md`). Lo no verificable queda marcado **A VERIFICAR (dd-mmm)**.
> **Sin tareas programadas creadas** (05-sep-2026; reconfirmado 12-sep-2026: ningún agente la crea por Joseph). La rutina de §2 se ejecuta a mano o con la tarea quincenal que **Joseph crea con el comando exacto de §2-bis** (una sola vez).

---

## 1) Los 5 canales (qué se mira, qué se busca, a qué código v3 alimenta)

| # | Canal | Dónde (dominios oficiales; rutas exactas A VERIFICAR) | Qué se busca | Alimenta |
|---|---|---|---|---|
| 1 | **Convocatoria y cronograma SERUMS 2027-I** | gob.pe/minsa (DIGEP-SERUMS: convocatoria, bases, cronograma de inscripción, fecha del ENCAPS) | **v6.00: fecha real del examen frente a la PROVISIONAL dom 14-mar-2027 (regla: convocatoria ≥ 25 días antes; tope mié 17-feb) + inicio del SERUMS, adjudicación e inducción (días protegidos del plan)** · ⏸ *v5.20 (SUPERSEDIDO):* **v5.20: confirmar la fecha FIJADA (mié 10-mar-2027) — día de la semana, hora y sede** —, requisitos, nº de plazas, estructura del examen si cambia (100Q, 5 áreas) | v5.20: la intensiva YA está sembrada con el 10-mar; si la convocatoria publica OTRA fecha → regenerar `gen_encaps_intensivo_2027.js 2027-02-23 <fecha real> --bk <nuevo>` → `execute_sql` → `study_metrics.extra.exam_date` → Calendar (`FASE_INTENSIVA_2027-I.md` §5); si la confirma, solo anotar hora/sede · *v5.19: disparaba la siembra (`2027-02-22 <fecha>`) · v5.18: `2027-02-19` o `2027-02-22`; en el diseño original `2027-02-01`* |
| 2 | **Normas MINSA en El Peruano** | elperuano.pe (Normas Legales, sección Salud) y gob.pe/minsa (normas) | RM / NTS / Directivas nuevas o modificatorias: esquema de vacunación, anemia, adolescente/MCI, dengue, emergencias/triaje, telesalud, residuos, interculturalidad, HC/derechos | el código v3 de cada norma; **L6**: lo publicado sep-2026 → mar-2027 entra al barrido de febrero con prioridad |
| 3 | **DGE: sala situacional + boletín epidemiológico semanal** | dge.gob.pe | brotes/alertas vigentes: dengue (escenarios, regiones), sarampión, tosferina, oropouche, leptospirosis, rabia, fiebre amarilla; alertas epidemiológicas | I-3 (vigilancia/brote/bloqueo), I-4 (transmisibles), II-2/II-3 (inmunoprevenibles); **L3**: lo que esté en sala situacional dic-2026 → mar-2027 es material predictivo |
| 4 | **ESAVI / PNI (inmunizaciones)** | gob.pe/minsa (DGIESP-Inmunizaciones), DGE (ESAVI) | incorporaciones al esquema (VRS gestante ya cayó; vigilar hexavalente, VPH dosis única, nuevas campañas), cambios de intervalos, kit/ESAVI | II-3 (esquema + novedades gestante + ESAVI + cadena de frío) → filas nuevas en `CIFRAS_CRITICAS_2027-I.md` |
| 5 | **QX Tendencias + simulacros de academias** (solo en enero) | qxmedic-aulavirtual.com `/metodo-qx/tendencias` (`_qx_tendencias.json` es del 01-jul-2026) · Theomed curso 37 | cambio de estilo del comité (viñeta vs recall), temas "en alza", nuevos simulacros 2027-I | pesos del v3 (condicional de IV, formato 45-70 % viñeta), lista de simulacros de viernes (`FASE_INTENSIVA_2027-I.md` §4) |

## 2) Rutina quincenal (desde el **jue 1-oct-2026**, 30 min, fuera de la hora ENCAPS)

Fechas: 1-oct · 15-oct · 29-oct · 12-nov · 26-nov · 10-dic · 24-dic · 7-ene · 21-ene · **re-scan completo en la semana 1 de la intensiva** (fila `senales` — ✅ **v6.00: lun 4-ene-2027 = dia 61**, primer día de la intensiva; y vigilancia de la convocatoria con tope mié 17-feb · ⏸ v5.20, SUPERSEDIDO: (6-oct): con el corrimiento RÍGIDO el lun 1-feb ya no sirve (es el D81 del Step 1, cierre de contenido, día doble); el mar 2-feb es el D82 (NBME 31 GO/NO-GO), el vie 12-feb el D90, el sáb 13 y el dom 14-feb un finde libre, el lun 15-feb el D91, el mar 16-feb el D92, el mié 17-feb el D93, el jue 18-feb el D94 (última sesión de banco), el vie 19-feb el D95 (último día del plan), sáb 20 / dom 21 libres (dom 21 = D-1 real) y el **lun 22-feb el examen Step 1**. La fase intensiva ENCAPS arranca DESPUÉS de ese examen → el re-scan es el **mar 23-feb-2027** = D1 de la intensiva (día 97, fila `senales` YA SEMBRADA, día ligero tras el examen; pre-test 2026-II el vie 26-feb, examen ENCAPS mié 10-mar, `FASE_INTENSIVA_2027-I.md` bloque v5.20); *v5.19: lun 22-feb, con el examen Step 1 el vie 19-feb · v5.18: lun 22-feb también, con el D1 de la intensiva vie 19-feb o lun 22-feb · v5.17: mié 17-feb o lun 22-feb · v5.16: vie 12-feb o lun 15-feb · v5.15: mar 9-feb*) · y semanal en feb-mar.

1. Canales 1-4 (canal 5 solo desde enero). Para cada uno: ¿hay algo nuevo desde la última fecha del log? Si no, se anota "sin novedad" (también es dato).
2. Cada novedad → **una fila en el log de §4** con fecha, canal, señal (título + número/año de la norma o fecha del boletín), código v3, impacto (ALTO = entra al examen casi seguro / MEDIO / BAJO) y estado (VERIFICADA / A VERIFICAR).
3. **Regla de conversión** (solo señales VERIFICADAS):
   - **Ficha de 1 página** en `TRACKING_ERRORES/OBSIDIAN_COLA/senal_<fecha>_<codigo>.md` (qué cambia, cifras/plazos textuales, cómo la preguntaría el comité).
   - **3-5 preguntas** en `BANCO_PROPIO/set_senales_<fecha>.json` (esquema de `banco_items_v1.json`, `verificado_contra` = la norma con número y año, `reservado_para` = el viernes siguiente) → el mini-sim de ese viernes las toma primero (`gen_encaps_minisim.js <viernes>`); en la intensiva van al simulacro 100Q propio.
   - **Tarjetas** de cifras/plazos/definiciones en `ANKI_COLA/ENCAPS_Cifras_2027-I.csv` (mismo formato: `Frente;Reverso;Tags` con `cod::<código> fuente::senal-<fecha>`) → reimportar al deck `ENCAPS::Cifras` (`CIFRAS_CRITICAS_2027-I.md` §4).
4. Si la señal es la **fecha del examen** (canal 1): **v6.00 — compararla con la PROVISIONAL (dom 14-mar-2027)**; si coincide, anotar hora/sede; si difiere, `_fechas_v6.json → encaps.examen` y la regeneración única del bloque v6.00 de arriba (y el disparador de la regla de 25 días si al mié 17-feb no hay convocatoria). ⏸ *v5.20 (SUPERSEDIDO):* compararla con la FIJADA (**mié 10-mar-2027**, ya sembrada). Si **coincide**, anotar día/hora/sede y listo. Si **difiere**, ese mismo día se ejecuta `FASE_INTENSIVA_2027-I.md` §5 (regenerar el SQL con la fecha real y un `--bk` nuevo → revisar → `execute_sql`), se actualiza `study_metrics.extra.exam_date` y se ajusta el Calendar a mano (examen `8juk0mvl66tutdkbcei7umrs68`, D-1 `tl0irrsb4av0vd8d1ar8vmbuoo`, dress rehearsal `ip4lhi4lhigad4l1titbd36jnk`, banner `4mfnu95lrhr3dmu87einr3jm5k` y series). *(Hasta v5.19: la fecha publicada disparaba la primera siembra.)*
5. Cierre: actualizar la línea "Última revisión" de §3.

## 2-bis) Cómo crear la rutina quincenal (la crea JOSEPH, una sola vez; al 12-sep-2026 no existe)

Regla: ningún agente la crea por él (decisión de Joseph). Elegir UNA opción y pegar el comando tal cual en una sesión de Claude Code abierta en `D:\joseph-md-app`.

**Opción A — MCP `scheduled-tasks` (recomendada: local, sin sesión abierta; corre mientras la app Claude Code está abierta y, si estaba cerrada a la hora, corre al abrirla).** Pegar en el chat:

```
Crea una tarea programada con el MCP scheduled-tasks (create_scheduled_task) con EXACTAMENTE estos campos y sin cambiar el prompt:
- taskId: encaps-senales-quincenal
- title: 📡 ENCAPS · vigía quincenal de señales 2027-I
- description: Cada 1 y 15 de mes revisa convocatoria SERUMS 2027-I, normas MINSA, DGE y ESAVI/PNI y añade filas al log de DATA/ENCAPS/SENALES_2027-I.md
- cronExpression: 0 7 1,15 * *
- notifyOnCompletion: true
- prompt: el bloque íntegro de §2-ter de DATA/ENCAPS/SENALES_2027-I.md (cópialo literal)
Confírmame el taskId creado y la próxima ejecución (nextRunAt) con list_scheduled_tasks.
```

Notas: `0 7 1,15 * *` = días 1 y 15 de cada mes a las 07:00 hora local (Lima) → primera corrida **jue 15-oct-2026** si se crea antes de esa fecha (la del jue 1-oct pasó sin tarea creada; nota del 3-oct); cron no expresa "cada 14 días", así que esta cadencia sustituye a la lista de fechas de §2 (desfase ≤3 días: 1-oct · 15-oct · 1-nov · 15-nov · 1-dic · 15-dic · 1-ene · 15-ene · 1-feb). La hora es indiferente (Joseph lee el delta cuando abre la app); si prefiere otra, cambiar solo el `7`. Para verla/borrarla: `list_scheduled_tasks` / `delete_scheduled_task encaps-senales-quincenal`.

**Opción B — `/loop` (solo mientras esa sesión de Claude Code siga abierta; si se cierra, muere; sirve para probar la rutina hoy, no para 5 meses).** Pegar:

```
/loop 14d Ejecuta la rutina quincenal del vigía ENCAPS: sigue al pie de la letra el bloque §2-ter de D:\joseph-md-app\DATA\ENCAPS\SENALES_2027-I.md
```

**A VERIFICAR (12-sep):** que `/loop` acepte intervalos en días (`14d`); si solo acepta minutos/horas, usar `336h`. Para una única ejecución de prueba sin esperar: pegar el bloque §2-ter directamente en el chat.

**Opción C — `/schedule` (rutina en la nube, cron):** misma `cronExpression` y mismo prompt de §2-ter; **A VERIFICAR (12-sep)** que la cuenta tenga rutinas en la nube habilitadas y que el agente en la nube pueda leer/escribir `DATA/ENCAPS/SENALES_2027-I.md` (necesita el repo GitHub y permiso de escritura; si no, la opción A).

## 2-ter) Prompt de la tarea (autocontenido: cada corrida arranca sin memoria de esta conversación)

```
Eres el vigía quincenal ENCAPS 2027-I de Joseph. Repositorio: D:\joseph-md-app. Hoy revisas señales para el examen ENCAPS/SERUMS 2027-I (Perú).
1) Lee DATA/ENCAPS/SENALES_2027-I.md completo (§1 canales, §2 rutina, §3 estado con la "Última revisión", §4 log, §5 qué NO es señal) y DATA/ENCAPS/PROTOCOLO_HORA_MANTENIMIENTO.md §4 (LISTA NEGRA: el examen 2026-II no se usa para nada hasta el PRE-TEST del vie 8-ene-2027 (dia 65 de la intensiva)).
2) Revisa con WebSearch/WebFetch, SOLO en dominios oficiales, qué hay nuevo desde la fecha de "Última revisión":
   canal 1 convocatoria y cronograma SERUMS 2027-I (gob.pe/minsa, DIGEP-SERUMS: fecha del examen ENCAPS, bases, inscripción, plazas);
   canal 2 normas MINSA (elperuano.pe Normas Legales/Salud y gob.pe/minsa/normas: RM, NTS, Directivas nuevas o modificatorias);
   canal 3 DGE (dge.gob.pe: sala situacional, boletín epidemiológico semanal, alertas: dengue, sarampión, tosferina, oropouche, leptospirosis, rabia, fiebre amarilla);
   canal 4 ESAVI/PNI (gob.pe/minsa DGIESP-Inmunizaciones, DGE ESAVI: incorporaciones al esquema, cambios de intervalos, campañas);
   canal 5 (SOLO si la fecha de hoy es de enero de 2027 en adelante) QX Tendencias y simulacros de academias.
3) Por cada novedad añade UNA fila ARRIBA de la tabla de §4 con el formato exacto de la tabla: fecha de hoy · canal · señal (título + número/año de la norma o fecha del boletín + URL) · código v3 (I-3, I-4, II-3, II-EMG, etc., según §1) · impacto ALTO/MEDIO/BAJO · acción propuesta (ficha / Q / cifras) · estado "A VERIFICAR (dd-mmm)" salvo que hayas leído la fuente primaria completa (entonces "VERIFICADA"). Si un canal no tiene novedad, añade una sola fila "canal N: sin novedad" con la fecha de hoy.
4) No generes preguntas, fichas ni tarjetas (eso lo hace Joseph con Claude en sesión, gate §3-bis del PROTOCOLO_GENERACION_PREGUNTAS.md). No inventes números de norma, fechas ni cifras: lo que no puedas leer en la fuente queda "A VERIFICAR".
5) Si la señal es la FECHA DEL EXAMEN 2027-I (canal 1): márcala ALTO y compárala con la fecha PROVISIONAL del plan v6.00 (domingo 14-mar-2027; DATA/_scripts/_fechas_v6.json → encaps.examen). Si coincide, escribe en la PRIMERA línea de tu resumen "FECHA DEL EXAMEN CONFIRMADA: 14-mar-2027 <hora/sede si constan>". Si difiere, escribe "FECHA DEL EXAMEN DISTINTA: <fecha publicada> (provisional: 14-mar-2027) → cambiar encaps.examen y regenerar según REESTRUCTURACION_31AGO_2026.md §24.5". Si hoy es posterior al miércoles 17-feb-2027 y no hay convocatoria, escribe "SIN CONVOCATORIA AL TOPE: el 14-mar queda descartado → escenario 21-mar". Anota también, si aparecen, las fechas de inicio del SERUMS, adjudicación e inducción.
6) Actualiza la línea "Última revisión" de §3 con la fecha de hoy y el nº de filas añadidas. No toques ningún otro fichero. No hagas git commit ni push.
7) Entrega un delta de ≤10 líneas: canal → señal → estado, y nada más.
```

## 3) Estado

- **Última revisión:** 05-sep-2026 (arranque del log; ninguna búsqueda en vivo hecha en esta sesión: las filas de §4 salen de los materiales ya extraídos y quedan **A VERIFICAR** contra la fuente primaria).
- **Fecha del examen (v6.00, 6-oct-2026):** **dom 14-mar-2027 PROVISIONAL** (DJ-5, «más o menos el 14»; 6/6 ENCAPS previos en domingo) · `study_metrics.extra.exam_date = '2027-03-14'` · intensiva sembrada lun 4-ene → vie 12-mar (dia 61-110) · tope de convocatoria **mié 17-feb-2027** (examen − 25 d). Falta: fecha oficial, hora y sede.
- ⏸ *(SUPERSEDIDO por v6.00)* **Fecha del examen (v5.20, 6-oct-2026):** FIJADA por Joseph = **mié 10-mar-2027** (`study_metrics.extra.exam_date`; intensiva sembrada mar 23-feb → mar 9-mar). **Lo que falta confirmar en la convocatoria:** día (los ENCAPS fueron siempre en domingo; el 10-mar es miércoles), hora y sede. *(Hasta v5.19: desconocida; escenario de trabajo = CORTO, dom 14-mar-2027.)*
- **Convocatoria SERUMS 2027-I:** NO publicada al 05-sep-2026; no se ha vuelto a consultar en vivo desde entonces (A VERIFICAR en la próxima revisión).
- **Tarea programada quincenal:** NO creada al 12-sep-2026 (decisión y acción de Joseph: comando exacto en §2-bis, opción A `scheduled-tasks` con `cronExpression 0 7 1,15 * *` y el prompt de §2-ter; creada ahora, primera corrida jue 15-oct-2026 — la del jue 1-oct ya pasó; 3-oct).

## 4) Log fechado (append-only; nuevas filas ARRIBA)

| Fecha | Canal | Señal (fuente) | Código v3 | Impacto | Acción (ficha / Q / cifras) | Estado |
|---|---|---|---|---|---|---|
| 06-oct-2026 (v6.00) | 1 | **Decisión de Joseph (no es publicación oficial), REESTRUCTURACIÓN v6.00:** examen ENCAPS/SERUMS 2027-I = **dom 14-mar-2027 PROVISIONAL** («más o menos el 14»; 6/6 ENCAPS previos en domingo). Intensiva sembrada lun 4-ene → vie 12-mar (dia 61-110; pre-test 2026-II vie 8-ene). Regla: convocatoria ≥ 25 días antes → sin convocatoria al **mié 17-feb** se descarta el 14-mar → 21-mar | — | ALTO | vigilar la convocatoria; con la fecha real: `_fechas_v6.json → encaps.examen` + regeneración única (`REESTRUCTURACION_31AGO_2026.md` §24.5) | DECISIÓN PROVISIONAL · convocatoria A VERIFICAR |
| 06-oct-2026 (⏸ SUPERSEDIDA por la fila v6.00) | 1 | **Decisión de Joseph (no es publicación oficial):** examen ENCAPS/SERUMS 2027-I = **mié 10-mar-2027** («el examen del serum será para la fecha del 10 de marzo … ese ya es el definitivo»). Intensiva sembrada mar 23-feb → mar 9-mar (días 97-107). ⚠ Los ENCAPS fueron siempre en domingo (2026-II: dom 9-ago-2026) | — | ALTO | confirmar día/hora/sede en la convocatoria; si publica otra fecha, regenerar (`FASE_INTENSIVA_2027-I.md` §5) | DECISIÓN · convocatoria A VERIFICAR |
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
- El 2026-II en sí: no es señal, es el pre-test (LISTA NEGRA hasta que se rinda: **v6.00: vie 8-ene-2027 = dia 65** (semana 1 de la intensiva, que arranca el lun 4-ene); ⏸ v5.20 (SUPERSEDIDO): primer viernes de la intensiva = vie 26-feb-2027 = día 100 (la intensiva arranca el mar 23-feb, tras el examen Step 1 del lun 22-feb); v5.19: mismo vie 26-feb, intensiva desde el lun 22-feb · v5.18: vie 19-feb o vie 26-feb; en el diseño original era el 5-feb).
