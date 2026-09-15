# PENDIENTES DE JOSEPH · régimen v5.12

**Generado:** 08-sep-2026 · **re-fechado a v5.10 el 12-sep** · **consolidado tras la SEGUNDA CAPA el dom 13-sep-2026** · **re-fechado a v5.11 el lun 14-sep** · **re-fechado a v5.12 el mar 15-sep** · **D1 = MIÉRCOLES 16-SEP-2026 · EXAMEN STEP 1 TARGET LUN 1-FEB-2027**

> ⚠ **El régimen vigente es v5.12 desde el 16-sep-2026.** Es el **undécimo corrimiento** del ciclo 31-ago→16-sep (12 días
> hábiles perdidos: el mar 15-sep tampoco se estudió). Instrucción literal de Joseph, reconfirmada en cada corrimiento: **ni un tema ni un subtema se deja
> atrás — no se fusiona ni se recorta nada**; el desfase se absorbe alargando el final de cada plan. **CONSECUENCIA NUEVA: el plan Step 1 de 95 días
> ocupa ahora TODA la ventana de examen (D95 = vie 29-ene-2027 = última sesión) → el examen SALE de la ventana 25-29 ene: target LUN 1-FEB-2027**
> (`DAILY_META.examenTarget`); sáb 30 (D-2) y dom 31-ene (D-1) quedan FUERA del plan como descanso pre-examen (solo Anki vencido + ritual de test-day el
> domingo, `USMLE_TAPER.dMenos1`). **Tienes que agendar/reprogramar el Prometric y confirmar que tu eligibility period cubre el 1-feb** (si no: extenderlo,
> o decidir recortar temario — ver ⚪ fila 0 y 🔴). Franjas y metas **no se movieron**; de los 12 hitos solo el UWSA1 cambió de fecha
> (→ **mié 16-sep = D1, 09:00-13:00**, baseline puro como prescribe Palmerton). Primer día de CONTENIDO = **jue 17-sep (D2)**; Cardio
> arranca el mié 23-sep (D6). **⚠ Desde aquí cada día no estudiado mueve el examen un día hábil más (o exige recortar).**
> **Regla al leer este doc: la FECHA es lo estable; el D# puede haber cambiado** — verifícalo contra el `.ts` del plan
> antes de actuar. Todas las fechas de abajo fueron releídas de los `.ts` con node el 15-sep-2026 (v5.12).
> *(v5.11, 14-sep: D1 mar 15-sep · D95 jue 28-ene = D-1 dentro del plan · examen vie 29-ene = último día de la ventana · contenido desde el mié 16 · Cardio mar 22-sep. v5.10, 12-13 sep: D1 lun 14-sep · D95 mié 27-ene con el jue 28 de descanso fuera del plan.)*

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

---

## 🔴 ANTES DEL D1 (hoy mar 15-sep / mié 16-sep temprano)

Sin esto el plan arranca ciego, con el contenido equivocado o con la app vieja en producción el primer día.

- [ ] **🔴 AGENDAR EL STEP 1 EN PROMETRIC PARA EL LUN 1-FEB-2027 (o reprogramar la cita si ya existía en la ventana 25-29 ene) y CONFIRMAR QUE EL ELIGIBILITY PERIOD CUBRE EL 1-FEB.** El plan v5.12 termina el vie 29-ene (D95) y el sáb 30 / dom 31 son descanso: no hay ningún día de la ventana original libre. Si el eligibility period no llega al 1-feb: pedir la extensión a ECFMG (con costo) o decidir recortar temario (⚪ fila 0). Anotar aquí la fecha/hora confirmada y el centro. **Bloqueante: sin cita no hay examen.** *(USMLE — Prometric/ECFMG)*
- [x] ~~COMMIT del WIP + decisión `.gitignore`~~ **HECHO 13-sep (commit de cierre de la segunda capa).** Decisión tomada:
      los **PDF y TXT de los cuadernillos** (leyenda "prohibida la reproducción") quedan **fuera del remoto**
      (`.gitignore`; siguen en tu disco en `DATA/MIR/pool/raw/`). Los **JSON parseados y clasificados SÍ se versionan** y
      `src/lib/mirPreguntasOficiales.ts` **se queda en la app** (opción a): es uso privado de estudio, el bundle de Vercel
      no está indexado ni enlazado públicamente, y sin él el quiz MIR pierde la anti-repetición. Si prefieres la opción (c)
      —carga privada— pídelo y se hace en una pasada. *(sistema)*
- [ ] **Deploy a Vercel — el del lun 14-sep (commits 8114d65 + 714167e; bundle `index-749f0cfe…` con D1 2026-09-15, D95 2027-01-28, ENCAPS 96, MIR mant. 6-ene, SYNAPSE 23-ene) es v5.11: el bundle v5.12 (D1 2026-09-16, D95 2027-01-29, ENCAPS 95, MIR mant. 7-ene, SYNAPSE 25-ene, examen 1-feb) queda pendiente de commit + push tuyo (los agentes no hacen commit; el WIP v5.12 está en 69d003e + lo de hoy) — A VERIFICAR (15-sep). Antes del mié 16-sep 16:15 abre la web y comprueba** para que estén vivos el D1: formulario **CIERRE DE
      SESIÓN** de ENCAPS (16:15), instrumento **PROGRESO** con `plan_checks` ('☁ ok'), quiz MIR con pool oficial, pestaña
      **Cerebro** de Derma, taper/burnout USMLE, freno 04:55 en TodayMission. Comprobar en la web: el instrumento PROGRESO
      pasa de '☁ —' a '☁ ok' (sube los ✓ existentes; migración única) y en Supabase
      `select plan_key, count(*) from plan_checks group by 1`. Si el navegador bloquea `navigator.clipboard`, el import
      se hace pegando el JSON en el campo del panel; el botón ⎘ de ENCAPS exige HTTPS o localhost (si no, «ver texto»).
      *(sistema)*
- [x] ~~Copiar los generadores USMLE del scratchpad~~ **HECHO 13-sep**: viven en `DATA/_scripts/usmle/` (gen_usmle_v5 → assemble_usmle_ts → update_diainicio → remap_obsidian_usmle; cadena verificada idempotente desde la ruta nueva) y `remap_inicio.js` ya apunta ahí. *(USMLE/sistema)*
- [ ] **Anki abierto: verificar FSRS y el preset de `APEX::USMLE`** — FSRS activado, *desired retention* **0,90**,
      **10 nuevas/día**. Luego `node DATA/_scripts/anki_telemetria.js` (v2: con `sync` previo si hay login AnkiWeb, si no
      `--no-sync`) y contrastar due/backlog/revisadas con las Stats de Anki (±5 %); pegar el one-liner en la consola de la
      app y comprobar el instrumento ANKI del cockpit y el KPI **"1.ª review del día"** (freno 04:55). Anotar la fecha en
      `DATA/SYNC_ANKI_OBSIDIAN_APP.md` §"Verificación D1-D2". *(SYNAPSE/USMLE)*
- [ ] **Crear el preset FSRS `APEX::MIR`** — retention **0,85** hasta el 31-mar-2027 (→ 0,90 en fase principal),
      Good/Again, **nuevas ≤4/día**; la plantilla **APEX-MIR** con los 5 campos (SAQ · por qué · 🇪🇸 delta vs Perú/USA ·
      tag sistema USMLE · **Pregunta oficial de origen**, que la app rellena desde el pool); y **comprobar los nombres
      de los sub-decks** con `curl -s -X POST localhost:8765 -d '{"action":"deckNames","version":6}'`: deben coincidir con
      `APEX::MIR::epidemiologia / ::bioetica / ::dermatologia` (slugs del vault `03_MIR`); si el vault usa otro slug,
      corregir `MIR_DECK` en `src/lib/ankiLinks.ts` (nunca crear variantes en Anki). **Hasta que el redeploy de n8n pase un
      test multilínea real, los APEX MIR se crean directamente en Anki escritorio** (regla ya escrita en la app y README §5).
      *(MIR)*
- [ ] **Crear los 10 sub-decks `APEX::DERMA::A…X`** en Anki escritorio (o `createDeck` por AnkiConnect) y verificar con
      `deckNames` — AnkiConnect no respondió el 05-sep. Sin ellos el TSV de la cola crea decks con nombre suelto al
      importar. *(Derma — antes de la sesión d1 = **jue 17-sep** (v5.12: Derma corre +1 slot; el mié 16-sep, D1 del régimen, es día Research)*
- [ ] **Importar el deck de cifras ENCAPS** — Anki → Importar
      `DATA/ENCAPS/TRACKING_ERRORES/ANKI_COLA/ENCAPS_Cifras_2027-I.csv` (separador `;` · HTML · deck en columna 3 →
      `ENCAPS::Cifras` · tags en columna 3), FSRS, 20 nuevas/día. Se repasa **dentro del bloque Anki de las 05:00, ≤5
      min**, desde el día 1. *(ENCAPS)*
- [ ] **Protocolo test-day para el UWSA1 (MIÉ 16-SEP 09:00-13:00)** — 3 bolsas Ziploc BREAK 1/2/3 (huevo duro,
      pavo/pollo, queso, nueces, granos de café con chocolate; **sin galletas ni jugos**); quick-log de sueño y agua en
      VITALS ese día (07:00 y al cerrar el sim); y **escribir en papel el plan B "worst-case" antes del primer bloque**
      (Palmerton §7.6: qué haces si el bloque 1 sale a 40 %; drill "Oh F#@& to OK" 10-15 s; AVP en los descansos). La
      app todavía no tiene dónde guardarlo (hallazgo #26). *(USMLE/rutina)*
      > Contexto v5.12: el UWSA1 es el **único hito que cambió de fecha** (vie 11 → lun 14 → mar 15 → mié 16-sep, siempre el D1): se rinde el **mié 16-sep = D1**, SIN un solo
      > día de contenido encima. Es la línea base pura que prescribe Palmerton: no lo leas como un mal resultado.
- [ ] **Confirmar el re-orden Research v5.10b (mismo orden, re-fechado +2 hábiles en v5.11; SIN cambio en v5.12 — releído del `.ts` el 15-sep)**: el ciclo 1 arranca el **mié 16-sep** (R0); T-1 (ética/CEI) **vie 2-oct
      (d7)** con la solicitud expedita presentada ese día (2 días después del interno ≤ 30-sep) · M3 (Finlay) **mar 6-oct (d8)** · R9 (¿ya existe la SR?) **jue
      8-oct (d9)** antes de R6 (**jue 22-oct, d14**) · CR-1 **lun 26-oct (d15)** y CR-2 **mié 28-oct (d16)** · T-2 (STROBE)
      jue 5-nov · R7 mié 11-nov · R2 lun 21-dic. Si no lo aceptas, es 1 línea en `gen_research_plan.js` + regenerar + `gen_research_calendar.js --check`.
      *(Research)*
- [ ] **Re-scan LOGUEADO de QX y Theomed** + decisión escrita de matrícula: ¿sigue vivo el acceso 2026-II? ¿publicaron
      Investigación y Gestión? ¿abrió el ciclo 2027-I? **4 de los 7 simulacros de viernes de la fase intensiva dependen
      de ese acceso**. *(ENCAPS)*
- [ ] **Retomar el quick-log de VITALS a las 07:00** (20 s: horas de sueño + agua) y, desde el mié 16-sep, **registrar
      correr/caminata al volver (06:45, 20 s)** como pide la descripción nueva de CORRER/CALISTENIA (VITALS no modela el
      cardio AM hasta la Tarea D). Sin dato, la métrica 8 de la revisión semanal y el disparador ÁMBAR "sueño <6 h" no
      existen. *(VITALS/sistema)*
- [ ] **Auditar F0 de SYNAPSE contigo en 5'** (día 1): marcar ✓ las A-units ya cursadas jun-ago (Academy *AI Fluency ·
      Claude 101 · Code 101 · Platform 101*, Karpathy, 3B1B) en la pestaña ⚡ run; la primera sin ✓ es la lección real de
      mañana. *(SYNAPSE)*

---

## 🟠 ESTA SEMANA (16-18 sep)

### Mié 16-sep (D1) — rituales que estrenan instrumento

- [ ] **04:55** — `node D:/joseph-md-app/DATA/_scripts/journal_hoy.js --abrir` (el enlace 📓 journal de la app abre
      `vscode://file/…`; en el móvil no abre). Regla nueva: **04:55 commit-or-stash obligatorio**, el Anki AM 05:00 no se
      retrasa. *(SYNAPSE)*
- [ ] **16:15** — `eval_2026-09-16.html` (modo D1: 5Q de fallos previos del registro, hoy I-3) y **16:30** — resolver `BANCO_PROPIO/pretest_arranque_2026-09-16.html` (parte 1: 20Q = 5Q × II-3 · I-3 · V-2 · III-5; **39/40 reales + 1 nuevo** desde la regeneración del 15-sep: `N-II3-020` cadena_frio, porque II-3 solo tenía 4 reales libres)
      y el **jue 17-sep** la parte 2 (`…_2026-09-17.html`: II-5 · I-4 · IV-1+IV-2 · II-4, 20/20 reales). En cada uno «Generar JSON» →
      guardar → `node DATA/_scripts/gen_encaps_minisim.js --registrar <export.json> --append` (**no** la línea de 1
      renglón: dejaría la ronda como MIX sin línea base por crítico). No abrir `banco_2026-09-16.html` ni `…-17.html`
      (sustituidos, avisan en rojo); `banco_2026-09-15.*`, `eval_2026-09-15.*` y `pretest_arranque_2026-09-15.*` ya no existen. El vie 18-sep = mini-sim #3 (D3) y al cerrar la semana hay que pre-generar la del 21-sep (`--semana 2026-09-21`; abre con V-2 · planeamiento, sin banco pre-generado). *(ENCAPS)*
- [ ] **17:10** — **primer cierre real desde la app** (HOY → final de la cola → CIERRE DE SESIÓN → Guardar) y comprobar
      que aparece en «17/20» (% ciego semanal + tabla por código) y en Supabase:
      `SELECT fecha, especialidad, porcentaje, fuente, errores_por_tipo FROM study_progress WHERE fuente='app:cierre'`.
      Si el estado dice '⟳ local', pulsar «Sincronizar pendientes» (la ronda queda en `jmd-encaps-cierres`). Desde ese día
      la rutina es diaria; el registro se lleva con «⎘ línea --cerrar» → `node DATA/_scripts/gen_encaps_semana.js --cerrar "…"`
      (o «⎘ JSON ronda» → `gen_encaps_minisim.js --registrar <ronda.json> --append`). *(ENCAPS)*
- [ ] **18:25** — crear la **primera nota del diario USMLE** `01_USMLE/05_DIARY/2026-09-16.md` en el vault (Insertar
      plantilla → `_template_day_usmle`, 60 s) y **activar el plugin Dataview** (instalado en `.obsidian-desktop/plugins`,
      pero `community-plugins.json = []` — A VERIFICAR (12-sep)) para que el Dashboard_USMLE y el bloque APEX rendericen.
      *(USMLE/sistema)*

### Resto de la semana

- [ ] **Vie 18-sep (D3, "setup Anki FSRS") — completar la configuración Palmerton §4.2 que la app aún no lista**
      (hallazgo #15): *Maximum reviews/day* **9999** (el default 100 oculta vencidas) · *reviews first, new second* ·
      **rollover 4 h** (despiertas a las 04:00; con rollover 9 h las tarjetas "de hoy" no estarían listas a las 05:00) ·
      sync al abrir y al cerrar · note type *Basic (optional reversed)* sin reversar todo · ≤3 mazos · **Browse → Set Due
      Date 0** para revisar hoy las tarjetas creadas a las 10:45. Anotar en SYNC_ANKI. *(USMLE)*
- [ ] **Tag compartido `sys::<sistema>` a mano** en cada tarjeta mientras el motor APEX no lo ponga (USMLE:
      `sysTag(DIAS[].system)` · MIR: `sysTag(usmleSystem)` · Derma step1: `step1 sys::Dermatology`). Anotar en SYNC_ANKI la
      fecha de la primera verificación con `findCards 'tag:sys::*'`. *(USMLE/MIR/Derma — rutina)*
- [ ] **P0 de seguridad · `datos_tesis` (55 filas de MENORES, RLS OFF, anon key en repo con remoto).** Ejecutar UNA opción
      **antes del T-8 (mié 25-nov)** y anotarla en `etica.md` fila 8 — o ya en D1-D2 en vez de esperar al proyecto S6 del
      vibecoding (mié 21 → mar 27-oct, v5.12): **A (recomendada)** `ALTER TABLE public.datos_tesis ENABLE ROW LEVEL SECURITY;` (sin policies:
      anon deja de leer; service_role sigue) · **B** `DROP TABLE public.datos_tesis;` (irreversible; la maestra sigue en
      `D:\motor_apex` y el CSV de-id cubre el depósito) · **C** RLS + policy "Allow all" (**no protege**).
      ⚠ **Antes:** `D:\motor_apex\bot_tesis.py` inserta vía `supabase_client.py` con `SUPABASE_KEY` de `D:\motor_apex\.env` —
      si es la anon, la opción A rompe el bot (necesita service_role). Comprobar qué key es. El resto de tablas con RLS OFF
      (~43 backups `study_schedule_bk_*`) va en ⚪. *(sistema)*
- [ ] **Anki telemetría con Anki abierto** — `node DATA/_scripts/anki_telemetria.js` una vez con sesión de AnkiWeb para
      validar el `sync` y el KPI `primeraReview`; el proyecto **S2 (mar 22 → lun 28-sep)** crea la tarea programada
      `schtasks /create /tn "JMD Anki telemetria" /tr "node D:\joseph-md-app\DATA\_scripts\anki_telemetria.js" /sc daily /st 21:05`
      (o hook `SessionEnd`). *(SYNAPSE)*
- [ ] **Remoto privado del journal (una vez):** `git -C D:/synapse-journal add -A && git -C D:/synapse-journal commit -m "journal 2026-W38: scaffold"`
      → `gh repo create synapse-journal --private --source=D:/synapse-journal --remote=origin --push`. El repo local ya
      está inicializado (sin commit). *(SYNAPSE)*
- [ ] **Mar 22-sep · M1 (Research d3) — WhatsApp + reunión con el Dr. Ciro**: 3 coautorías, vía CEI de la tesis, versión
      del CADI usada, su ORCID; es también el arranque del case report (**regla escrita en MENTORES fila 6: si el lun
      12-oct (d10, 3 semanas desde M1) no ha dado caso → mensaje único de `caso_candidatos.md` §2 al colega SPD**). *(Esta semana el único átomo Research es R0, mié 16-sep: abrir las 10 cuentas.)* Los documentos de ética se reúnen
      desde este día (chip en M1). *(Research)*
- [ ] **Vie 18-sep · mini-sim #3 (ENCAPS · D3 en v5.12; era el #4 en v5.11 y el #5 en v5.10)** — cargar la nota /25 **UNA sola vez** (cierre tipo `mini_sim` en el formulario
      → espejo automático en `study_sim_scores` sim_n=3, o en ▲ SIM; si cargas ambas con valores distintos gana la última).
      A las **17:00**: `node DATA/_scripts/gen_encaps_semana.js --sql` → primer override (semana del 21-sep, ya con n≥5 en
      los 8 críticos gracias al pre-test) → `node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-09-16 --override DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/override_2026-09-21.json`
      → revisar SQL (backup `study_schedule_bk_20260918`, DELETE solo MANTENIMIENTO) → `execute_sql` → pegar la
      verificación que imprime (**77 banqueo1h + 18 mini_sim** = 95 filas, v5.12). *(ENCAPS)*
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
      - **AURUM** (`expo start` → AurumHub): «✎ registrar semana» abre el editor y el semáforo cambia; en **D15 (mar 6-oct)**
        aparece la rúbrica y el score se guarda en `jmd-aurum-rubrica`; en **D40 (mar 10-nov)** la tarjeta VARIANTE LIVIANO (v5.12).
- [ ] **Calendar — una sesión de 20' con el MCP GCal (hallazgos #1-#4 del crítico + gap MIR 8; nadie los tocó):** *(sistema)*
      1. **Vie 29-ene (D95 = última sesión, v5.12), sáb 30 / dom 31-ene (descanso fuera del plan) y LUN 1-FEB (examen) sin overlay y con TODO activo**: las 6 series USMLE (RRULE UNTIL 20270130 — ya NO cubre el examen: hay que extenderlas o crear el overlay del lunes aparte)
         + MIR 15:15/15:30 + ENCAPS 16:15 + LIVIANO + GYM 19:00 y BAILE 19:30-20:30 la víspera. Crear 3 overlays
         FREE/transparent — vie 29 «🏁 D95 · última sesión · taper D-3» (description = `USMLE_TAPER.d95`: Anki maduro + 20Q flagged + rapid review FA; tarde = permiso impreso + digital, 2 ID con el nombre exacto, Ziploc numeradas, ruta al Prometric), dom 31 «🛌 D-1 · descanso · ritual de test-day» (description = `USMLE_TAPER.dMenos1`: solo Anki vencido, nada después de las 17:00, cama 21:00; **decidir GYM/BAILE del viernes 29 y del fin de semana**) y lun 1-feb «🎯 USMLE STEP 1 · Prometric»
         (description = §8.4 bloque a bloque + «no Anki al volver») — y añadir en las 6 series la línea «vie 29-ene: sesión ligera; lun 1-feb: este bloque NO se hace». Recomendación Palmerton: ejercicio ligero sí, GYM+BAILE hasta 20:30 la víspera no. *(v5.11 pedía 2 overlays: jue 28 D-1 y vie 29 examen.)*
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
      > sáb/dom, 🧠 IA 04:15, misión 12:30 y PC sáb/dom **ya están en v5.10** (12-13 sep, verificadas con `get_event`); las horas no cambiaron en v5.11 ni en v5.12 — solo los overlays de hito (D# −1, UWSA1 mié 16-sep) y el cierre 29-ene → 1-feb: **A VERIFICAR (15-sep)** que el orquestador los haya re-fechado (si no, `gen_calendar_overlays` / migrador S9).
- [ ] **Crear el evento recurrente `📋 REVISIÓN SEMANAL`** sáb 07:15-07:35 desde el **sáb 19-sep** (S1 = semana corta 15-18 sep)
      **y decidir sáb o dom como día oficial**: la descripción nueva del domingo SYNAPSE dice «Feynman + 20' revisión
      semanal» y `REVISION_SEMANAL.md` fija el sábado 07:15 (ya dice «si la hiciste el sábado, solo Feynman»). Descripción
      sugerida: `node DATA/_scripts/gen_revision_semanal.js → DATA/USMLE/REVISIONES/S<NN>.md · 10 métricas`. *(sistema)*
- [ ] **Antes de la revisión S1 (sáb 19-sep)**: tocar el instrumento SEMANA del cockpit (web) → pegar el portapapeles en
      `DATA/USMLE/REVISIONES/_localstorage_export.json`. Sin ese export las métricas 5/6/7/9 salen "sin dato"; las 1 y 2
      se rellenan a mano hasta el proyecto S3. **Sábados PC:** correr `node DATA/_scripts/verify_vibecoding.js <n>` ANTES
      de marcar el proyecto y pegar el one-liner `localStorage.setItem('jmd-vibe-ship', …)` en la consola (hasta que S3/S4
      lo automaticen). *(sistema/SYNAPSE)*
- [ ] **EKER — revisar la frase 6** añadida el 12-sep («Soy un médico USMLE-ready: cada pregunta ciega es un dato, no un
      juicio.», vigente hasta el 1-feb) y cambiarla si quieres otra; las 5 originales están intactas. *(rutina)*
- [ ] **Redeploy de n8n `APEX-MOTOR-FLOW-V2`** (:5678 sigue con el código del 07-may): con n8n arriba, exportar backup del
      workflow → `python D:\agente_estudio\scripts\_ARCHIVO_DESARROLLO\update_n8n_workflow_v2_3.py` → enviar **1 APEX
      `::OBSIDIAN` multilínea de prueba** con Ctrl+Shift+A y comprobar que la nota llega íntegra a `01_USMLE\…\APEX_creados\`
      y la card a Anki. Candidato al proyecto S4 del vibecoding (catálogo re-secuenciado). *(sistema/SYNAPSE)*
- [ ] **Alinear `D:\agente_estudio\config\fases.json`** — sigue con `FASE_4_ENCAPS_DOMINANTE.is_current_phase = true` y
      `FASE_7.inicio = 2026-10-01`. Poner `false` en FASE_4 (o `true` en FASE_7) y `FASE_7.inicio = 2026-09-16` (D1 del régimen v5.12). Verificar
      antes que `orquestador.py` lee ese campo. Opcional (S1): `git init` LOCAL en `D:\agente_estudio` (sin remoto,
      `.gitignore` para `.env`/`__pycache__`); mientras, los commits [S1]/[S6] van a joseph-md-app. *(sistema)*
- [ ] **Reponer stock del banco ENCAPS** (inventario 15-sep post-pre-test v5.12: 434 → **309 ítems disponibles**; demanda 1 836Q
      en 95 días): `set_I-3_2.json` **antes del jue 1-oct** (quedan 15; I-3 vuelve con notificacion, una sesión pide 16-20Q) · `set_V-2_2.json` **antes del lun 5-oct**
      (quedan 26; el lun 21-sep planeamiento gasta ~20 y V-2 vuelve con clima_calidad) · `set_II-3_2.json` **antes del mié 14-oct** (15 disponibles; novedades_gestante) · `set_III-5_2.json`
      **antes del mar 20-oct** (20 disponibles cubren el mar 22-sep) · cola larga II-2 (2Q, la receta pide 4-5) y II-EMG (2Q). Déficit real:
      **I-3 165Q · V-2 154Q · II-11 85Q · III-8 82Q · II-1 79Q · IV-6+IV-7 66Q**. Gate §3-bis (clave oficial o compendio/norma con número y
      año). *(ENCAPS)*
- [ ] **Conseguir `CLAVE DE RESPUESTA 2026-1.pdf`** (Tío López / QX): los 100 ítems del 2026-1 siguen sin clave. *(ENCAPS)*
- [ ] **Importar `DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv`** en Anki (tabulador, deck en columna 3, etiquetas en
      columna 4, FSRS) — **antes del vie 25-sep (D8, caso 1; v5.12: el vie 18-sep queda sin caso)**, tope **mar 6-oct (D15**, el día de las 10 tarjetas del
      módulo). Fechas leídas de `livianoStudyPlan.ts` el 15-sep (v5.12). *(LIVIANO)*
- [ ] **Rutina de export de los registros que viven solo en un navegador** *(Derma/MIR)*:
      - Derma, cada viernes: botón de export del cierre (o en Debilidades) → `DATA/DERMATOLOGIA/TRACKING/_registro_derma.json` → `rondas[]`.
      - MIR, cada semana: HOY → «⤓ Exportar log JSON» → `DATA/MIR/mir_eval_log_export.json` →
        `node DATA/_scripts/gen_delta_espana.js --write` (completar las filas del delta volcadas y subir las estables a la
        tabla de su asignatura) y volcar también en `_registro_resoluciones.json` con `plan:'MIR'`. El espejo Supabase
        `mir_eval_log` reduce el riesgo, no lo elimina.
- [ ] **(hecho 14-sep para v5.11; v5.12 PENDIENTE de Claude en la sesión principal — los agentes no tocan la memoria) Actualizar la memoria `usmle-step1-v5.md`, `encaps-mantenimiento-2027-1.md`, el handoff y MEMORY.md al estado v5.12** (D1 mié 16-sep · D95 vie 29-ene = última sesión · examen target lun 1-feb fuera de la ventana · sáb 30/dom 31 descanso · MIR mant. 60 d 7-ene · ENCAPS 95 d · SYNAPSE lun 25-ene · Derma 17-sep → 9-abr, taper 19-ene → 2-feb): el orden
      real es el de `REESTRUCTURACION` §13.3 — `remap_inicio.js <fecha>` (ya incluye Research vía `gen_research_plan.js`,
      Derma 73 + ciclo 2, Business vía `gen_business_plan.py`, LIVIANO) → `gen_vibecoding_plan.js` **antes que**
      `gen_synapse_plan.js` → `gen_aurum_plan.js` → `gen_mir_daily.js --check` (+ `gen_mir_mantenimiento.js` si D78 pisa el
      inicio del mantenimiento; v5.12: D78 mié 6-ene → mantenimiento desde el jue 7-ene) → `gen_encaps_mantenimiento_2027.js` → `execute_sql` → USMLE con `gen_usmle_v5.js` → tsc/expo → docs + overlays.
      ⚠ No volver a ejecutar `build_vault_research.js` (sobreescribiría `obsidianResearchMap.ts`); ⚠ los `gen_readme.js` /
      `gen_calendario.js` del scratchpad no conocen `franjaNota`/`USMLE_TAPER`/viernes N4: no re-ejecutarlos. *(sistema)*
- [ ] **Los D# de LIVIANO volvieron a cambiar en v5.12 — y esta vez TAMBIÉN las fechas de los 16 casos** (el plan tiene 17 viernes y el generador salta el primero: el vie 18-sep queda sin caso y cada caso corre una semana; caso 1 = **D8 vie 25-sep**):
      drills **D36 (mié 4-nov) / D57 (jue 3-dic) / D75 (mié 30-dic) / D87 (mar 19-ene)** · trimestral I **D45 (mar 17-nov)**
      y II D89 (**jue 21-ene**) · capstone D88 (**mié 20-ene**) · caso 16 integral **D90 (vie 22-ene, DESPUÉS del capstone — ver ⚪)** · Síntesis M5 vuelve a ir ANTES del caso (D86 lun 18-ene); pre-tests de lunes 18.
      Actualizar cualquier doc o nota externa que cite los viejos. **La fecha es lo estable.** *(LIVIANO)*

---

## 🟡 ESTE MES (sep-oct)

### Research — envíos y gestiones (nadie más puede hacerlas)

Fechas leídas de `researchDailyPlan.ts` el 14-sep y re-verificadas el 15-sep (v5.12: Research NO cambia). El ciclo 1 arranca el mié 16-sep y termina el jue 11-feb-2027; pausa
30-dic → 29-ene por el Step 1. ⚠ v5.12: **CR-9 (SUBMIT del case report, lun 1-feb) coincide con el día del examen Step 1** — ver ⚪.

- [ ] **M2 · lun 28-sep (d5)** — registrarse en `https://risingscholars.net/accounts/register/` y publicar la solicitud de
      mentor (3 piezas: carta, tesis, case report; 3-4 h). **Regla escrita en MENTORES fila 2: si el lun 26-oct no hay
      mentor asignado → contratar editor profesional (US$200-400, RUTA §3.1)** que cubra las 3 piezas. Confirmar ambas reglas.
- [ ] **C-2 · mié 30-sep (d6) — elegir el artículo diana** en `CARTA_1/candidatos.md` §1 y **leer ESE DÍA con tu Chrome**
      las guías de autores (las automáticas devolvieron 403/402): **JAAD International Research Letter**
      (`jaadinternational.org/content/authorinfo` o ScienceDirect 26663287) e **IJD Correspondence** (Wiley 13654632) →
      copiar los límites reales (palabras, refs, figuras/tablas, abstract) con fecha en `TESIS_L0/research_letter_outline.md`
      §1 filas 1-2 (a más tardar en T-7, jue 19-nov). Actas y Anais ya están leídos en vivo (12-sep). Recomendación #4
      (JAAD `10.1016/j.jaad.2026.08.115`) si admiten "unpublished data"; si no, #1 (JCD `10.1111/jocd.71104`).
      > ⚠ **C-6 = SUBMIT de la carta el mar 20-oct (d13)**, contra un deadline interno del ≤15-oct: **5 días TARDE en v5.11** →
      > cerrar el paquete y hacer el SUBMIT el jue 15-oct fuera del átomo (C-5 formateo cae el vie 16-oct: habría que adelantarlo) o elegir en C-2 una fila
      > con ventana más larga (§9.1 de `RUTA_PUBLICACION_2027.md`). Sigue siendo decisión tuya.
- [ ] **T-1 · vie 2-oct (d7) — ética de la tesis** (el interno ≤ 30-sep queda 2 días atrás: si importa, presentar la solicitud el mié 30-sep, día de C-2): localizar el **nº y fecha del CEI** (`etica.md` 1.1) **o presentar
      ese mismo día** la solicitud de revisión expedita/retrospectiva en la FMH-UNCP u hospital (protocolo + modelos de
      consentimiento/asentimiento + oficio de la I.E. + resumen). **Gate 1 escrito en T-7/T-8: sin nº o constancia de
      exención, el envío T-8 (mié 25-nov) pasa a feb-2027.** Además: localizar los **PDF del modelo de consentimiento
      parental y del asentimiento** (los números ya constan: 1.256 matriculadas → 291 excluidas → 100 ausentes → 865
      evaluadas → 785 completas → 316 IGA≥1; falta el modelo y si el asentimiento fue escrito u oral).
- [ ] **M3 · mar 6-oct (d8)** — email a **Finlay**; antes verificar en la página del CADI de Cardiff el procedimiento de
      licencia (`technologytransfer@cardiff.ac.uk` según fragmento de búsqueda; la página no respondió) y su dirección.
- [ ] **R9 · jue 8-oct (d9)** — rellenar las columnas AMSTAR-2 y "hueco que deja" de las 5 SR/MA de `lines/L4-complicaciones.md`
      §6.1 (PMID 41249530 · 37178872 · 39214904 · 36574028 · 40406769, verificados) y marcar UNA salida (a/b/c) en §6.3 con
      fecha; **sin eso R6 (jue 22-oct) no fija el PICO**.
- [ ] **Lun 12-oct (d10)** — disparador del plan B del case report: si el Dr. Ciro no dio caso (3 semanas desde M1), enviar el mensaje único de
      `caso_candidatos.md` §2 al colega SPD. **CR-1 (caso + consentimiento de publicación + senior author) = lun 26-oct (d15)**
      y **CR-2 = mié 28-oct (d16)**, ambos todavía ANTES del 31-oct (margen 5 y 3 días).
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
- [ ] **T-7 · jue 19-nov (d24)** — antes de depositar el CSV de-identificado en OSF/Zenodo, revisar
      `DATA/RESEARCH/TESIS_L0/_deid/datos_tesis_acne_deid.csv` (865 filas, gitignored): que no quede ninguna columna
      cuasi-identificadora y el k-anonimato mínimo (combinaciones edad×grado con n=1 → agrupar edad en tramos); el DOI del
      depósito va en la frase de *data availability* de `DATOS_README.md` §6.

### USMLE — reservas y verificaciones externas

- [ ] **Free 120 en el Prometric de Lima (vie 22-ene-2027, D90)** — Palmerton §8.2: práctica en el mismo centro, 1-2
      semanas antes, registro con hasta 7 días de espera; costo **$155 internacional según el cuaderno (A VERIFICAR)**. Al
      agendar el examen para el lun 1-feb (🔴; el Free 120 sigue 10 días antes) verificar en `usmle.org` / `prometric.com` si Lima ofrece la práctica presencial y
      reservarla; si no existe, dejarlo escrito en README §3 para no volver a abrirlo. Hoy el overlay del Free 120 (D90 en v5.12) lo hace "en la
      interfaz oficial NBME" (en casa). Ligado a la decisión ⚪ #4 (maratón).
- [ ] **MyNBME · qué formas se COMPRAN y cuáles se hacen en Qbankly** (hallazgo #24, alto: afecta a 3 hitos y al GO/NO-GO):
      `DIAS.mat` dice `NBME 25 (Qbankly)` … `NBME 33 (Qbankly)` → % bruto sin curva oficial, sin reporte por sistema y sin
      garantía de vigencia; `HITOS_ONTRACK` compara ese % con umbrales pensados para el % *equated*. Confirmar en MyNBME
      qué formas CBSSA están activas en ene-2027 (el cuaderno describe 25-30; el plan asigna hasta la 33) y comprar como
      mínimo **31/32/33 + Free 120 oficial**; anotar "Qbankly = % bruto (sin curva)" donde toque.
- [ ] **A VERIFICAR del cierre pre-examen**: repasos Anki 200-300/día en las últimas 2 semanas (cifra del studio guide, no
      de transcripción) — sirve para dimensionar D94/D95 (jue 28 y vie 29-ene: D-4 y D-3, `USMLE_TAPER`) y el fin de semana de descanso (sáb 30 / dom 31: solo Anki vencido).

### Derma — la sesión logueada que desbloquea tres cosas a la vez

- [ ] **Una sola sesión de ~20 min con tu Chrome adjunto a AccessDerma** (método en
      `DATA/DERMATOLOGIA/_scrape/README_TOC_PENDIENTE.md`) *(alto impacto)*:
      1. Extraer los **TOC con `sectionid`** de Fitzpatrick 9e (2570), Barnhill 4e (2802), Weinberg 5e (1913), Guidebook
         (2960) y dermatoscopia (2804, 2929) → hoy **20 átomos enlazan a la portada del libro** (sectionid verificado en 50/70).
      2. Leer el listado de `cases.aspx?groupid=1546` (título + área de los 200 casos) para **confirmar o corregir
         `dermaCasoArea()`** — el etiquetado Med 1-110 · Path 111-140 · Peds 141-170 · Surg 171-200 es una **suposición**:
         si el orden real no es por área, el mapa de fallos por módulo CORE del ledger, del Hub y de la pestaña Cerebro es ruido.
      3. Guardar los `sectionid` por pregunta del 2929 para que la "imagen dermatoscópica ciega" apunte a la pregunta N.
- [ ] **Anclaje First Aid en d12 (lun 19-oct, SJS/TEN/DRESS) y d24 (vie 20-nov, melanoma) — fechas v5.12 de `dermaDailyPlan.ts`**: la sección/página no consta
      en el repo → abrir el ejemplar y sustituir 'A VERIFICAR (12-sep)' en `anclajeStep1` (`dermaDailyPlan.ts`); hasta
      entonces el chip «cuenta doble Step 1» de HOY muestra ese texto tal cual.
- [ ] **Verificar DeLorenzi 2017** (ASJ, PMID 28333326; acceso OUP/UF) — UI de hialuronidasa por "área" (~450 y ~900 UI
      del SPEC §2.4) y criterio de parada de los pulsos. Hasta entonces el drill y la ficha X-19 los muestran como A
      VERIFICAR: **no fijar esas cifras en Anki**. Deadline: drill de oclusión **d19 = vie 6-nov** (v5.12).
- [ ] **NotebookLM «DERMA · Élite Engine»**: las 7 fuentes fallidas «Checking your browser - reCAPTCHA» SIGUEN en el
      cuaderno el 13-sep (86 = 79 útiles + 7). Borrarlas a mano en la UI (el agente no borra datos); sus equivalentes PubMed
      ya están cargados. No cargar PMC ni NCBI Bookshelf.
- [ ] **Asignar el deck `APEX::LIVIANO`** en `src/lib/ankiLinks.ts` (grep el 13-sep: 0 menciones) y, si lo quieres, la
      entrada "Academia → Logística F5" en `EmpresaHub.tsx`. *(LIVIANO — asignar a un agente)*
- [ ] **Crear la carpeta `DATA/BUSINESS/_kpi/`** (no existe) y guardar ahí el JSON del botón "Exportar JSON" del Cockpit F1. *(LIVIANO)*

### LIVIANO · Acceso Perú — las verificaciones DIGEMID

*Átomos D37 y D39-D44 (**5 → 16-nov**, fechas releídas el 15-sep, v5.12; caso 9 el vie 20-nov, D48). Cierran los 2 pendientes ROJOS desde junio ("Legalidad DIGEMID"
y "Cotización Sterilelabs") y de ellos depende el COGS y el value stack. Regla anti-alucinación: si un dato no aparece, se
escribe `SIN REGISTRO HALLADO (fecha)`.*

- [ ] **D37 · jue 5-nov — Rellenar `LIVIANO_PROTOCOLO_CLINICO_v1.md` §2**: criterio numérico de elegibilidad (Obesity
      Algorithm 2026), panel de labs basales y cadencia, esquema de dosis/intervalos/lavado **solo desde la ficha técnica
      del producto registrado**, definición operativa de "falla a farmacoterapia".
- [ ] **D39 · lun 9-nov — Registro sanitario DIGEMID**: portal público (URL sin verificar), captura fechada de semaglutida
      SC/oral y tirzepatida → columna `registro` de `LIVIANO_ACCESO_PERU` (`empresaData.ts`).
- [ ] **D40 · mar 10-nov — Condición de venta por molécula** → columna `condicion` + flujo receta → farmacia → paciente.
- [ ] **D41 · mié 11-nov — 2 cotizaciones escritas y fechadas** (cadena + independiente) → `precioFarmacia`; recalcular
      el "medicamento 3 m = S/ 3,600" del value stack.
- [ ] **D42 · jue 12-nov — Dictamen de legalidad del magistral** (QF + abogado de salud: **nombres a definir**) +
      cotización Sterilelabs con certificado de análisis por lote → `costoLiviano`, KPI COGS, estado "VERIFICADO".
- [ ] **D44 · lun 16-nov — Tiempo fuera de refrigeración** por producto (ficha técnica) → guion de cadena de frío (v5.12: el vie 13-nov, D43, es el caso 8 y el caso 9 «lo consigo más barato en una web» pasa al vie 20-nov, D48).

### ENCAPS — vigilancia normativa y rutina quincenal

- [ ] **Crear la rutina quincenal de señales ANTES del jue 1-oct** — pegar en Claude Code el bloque de
      `DATA/ENCAPS/SENALES_2027-I.md` §2-bis opción A (scheduled-tasks: taskId `encaps-senales-quincenal`, cron
      `0 7 1,15 * *`, prompt autocontenido de §2-ter) y confirmar `nextRunAt = jue 1-oct-2026 07:00`. A VERIFICAR si `/loop`
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
      (1) `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-02 <fecha>` (v5.12: el default ya es `--base 2026-09-16`; con D1 = 1-feb la intensiva continuaría en el día 96 = **el día del examen Step 1** → propuesta D1 = mar 2-feb, día 97; ver ⚪; pasar `--base` solo si el D1 del mantenimiento vuelve a moverse) →
      revisar → `execute_sql` + actualizar `study_metrics.exam_date` y `dias_a_examen` (quedó en 205 sin recalcular) +
      Calendar a mano; **NO aplicar el SQL antes**; (2) escribir la fecha en **`DERMA_TAPER_ENCAPS_FECHA`**
      (`src/lib/dermaDailyPlan.ts`, YYYY-MM-DD) para que las sesiones Derma a ±3 hábiles pasen a taper 'encaps' (si cae
      en la semana del 22-26 mar, los candidatos son d67-d70: láser II-IV y microneedling); hasta entonces la pestaña
      Cerebro muestra «hoy null · A VERIFICAR (13-sep)». *(ENCAPS/Derma)*
- [ ] **🎯 DISPARADOR · Resultado del UWSA1 (mié 16-sep).** Si sale **<40 %** → bajar **D2-D10 a 20 Q/día** (protocolo
      Jay; `qDia` en `gen_usmle_v5.js` + regenerar). Lectura por tramos (Palmerton §9.3, +5 %/mes hasta el 15-ene):
      **<40 %** → protocolo Jay · **40-48 %** → llega justo a 65-68 % · **≥48 %** → on-track. La app hoy dice "baseline:
      cualquier valor sirve" y no muestra los tramos (hallazgo #12): **el baseline del 16-sep, no el GO/NO-GO del 15-ene,
      es el verdadero Goldilocks check**. *(USMLE — decisión ⚪ #8)*
- [ ] **Protocolo de burnout (REGLA ya en la app y en README §3b):** la señal numérica (2 hitos consecutivos bajo su
      mínimo on-track → `gateHito` 'ALERTA BURNOUT' + banner) la da la app; **los síntomas los decides tú** (releer sin
      comprender, irritabilidad, indiferencia, descansos que se alargan). Si se activa: 3-5 días solo Anki AM y correr el
      plan con `remap_inicio.js` (cada día parado = +1 hábil; no se recorta temario). *(USMLE)*
- [ ] **Antes del 1-feb-2027 · extender las series del Calendar con `UNTIL=20270130`** — ⚠ v5.12: el examen es el lun 1-feb, así que el `UNTIL` ya no cubre ni el examen ni la intensiva: extender a `20270201` (o más) — son **7 series**, no 2
      (`CALENDAR_SEGMENTOS` §11.2); la **única bloqueante es `16:15 ENCAPS` (`papebi46etlo8glgfs5akd5mig`)** si ENCAPS
      vuelve a bloque principal en feb-mar; `09:00 DEEP PRIME` (`cb2uh20jnvu7pgfev4183pgctc`) también cubre el examen y corta
      el 30-ene. ⚠ `recurrenceData` del MCP está roto para UPDATE → delete(serie) + create. Aprovechar para re-etiquetar las
      **9 series de GYM/BAILE que siguen diciendo "Régimen v5.6"**. *(sistema)*
- [ ] **Antes de sembrar la fase intensiva (feb-2027) · la app necesita**: `STUDY_TOTAL_DAYS` dinámico (hoy 102 fijo), rama
      `modo='INTENSIVO'` en `itemsForDay` (renderizar `extra.loop` / `sim` / `repaso` / `drill_cifras`) y `simDays` con los
      tipos `pretest` / `sim100` / `dress_rehearsal`. ⚠ El segmento **17:15** del loop heredado **choca con LIVIANO** → fijar
      las franjas en la reestructuración de febrero **antes** de sembrar. *(ENCAPS — asignar a un agente)*
- [ ] **Al usar `--sim100 2025-2 / 2025-1A / 2024-2A` en la intensiva**: **122 ítems** de esos exámenes ya viven en los
      sets del banco del día. Rendirlos **antes** de consumir esos sets, o aceptar el solape. *(ENCAPS)*
- [ ] **Antes del d19 (mié 4-nov) · importar `DATA/DERMATOLOGIA/ANKI_COLA/PLANTILLA_SESION.txt`** en Anki (notetype Basic);
      a partir de ahí copiar la plantilla por sesión (`SESION_dNN_<fecha>.txt`). *(Derma)*
- [ ] **Antes del d45 (mar 19-ene-2027) · decidir y comprar el dermatoscopio de bolsillo** (DermLite o Heine; modelo y
      precio A VERIFICAR en sus webs oficiales) para la fase práctica 2027. *(Derma)*
- [ ] **Mar 2-feb-2027 (día siguiente al examen Step 1) · sesión Derma OPCIONAL (d49, segunda pasada parcial III; v5.12)**: decidir si la
      haces o la saltas; no se pierde contenido en ningún caso. El vie 29-ene (D95 del Step 1) es d48 (parcial II, 1 caso + FSRS). *(Derma)*
- [ ] **Desde el jue 4-feb-2027 (d50, v5.12) · confirmar en la app que 3 casos/sesión caben en los 45′** con los 10Q como
      variable de ajuste; si no, la alternativa documentada es 2 casos + alargar el ciclo 2 (d74-d103, 13-abr → 2-jul; sin
      fusionar nada). *(Derma)*
- [ ] **Cotejar las cifras "A VERIFICAR" de las 35 fichas del cerebro clínico** contra el capítulo de AccessDerma citado en
      cada una antes de recitarlas como definitivas: dosis de apraclonidina, % de TCA, mm de microneedling, λ por tinta,
      márgenes de Mohs y de melanoma. *(Derma)*
- [ ] **Lun 25-ene-2027 (última A-unit SYNAPSE, d132 · v5.12) · página oficial de la certificación CCA-F**: no aparece enlazada en
      academy.claude.com ni en anthropic.skilljar.com (12-sep) → localizarla, anotar formato/precio/fecha y decidir la fecha
      post-Step 1 (feb-2027). *(SYNAPSE)*
- [ ] **Post-D88 (mié 20-ene-2027, capstone; v5.12) · revisión por par del protocolo LIVIANO** por un médico con experiencia en
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
- [ ] **Feb-2027 · pool MIR se agota**: 61 días × 25-30Q ≈ 1.500 > 1.025 usables → hacia mediados de febrero Cardio/Gastro
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

### USMLE · decisión NUEVA del corrimiento v5.12 (15-sep) — el examen sale de la ventana

| # | Decisión | Hoy corre así |
|---|---|---|
| 0 | **El plan de 95 días llena la ventana 25-29 ene (D95 = vie 29-ene) y el examen ya no cabe en ella: target LUN 1-FEB-2027.** Con D1 en miércoles el D95 es el último día de la ventana; el sáb 30 y el dom 31 quedan fuera del plan como descanso pre-examen (Palmerton: D-1 sin banco, solo Anki vencido + ritual). Opciones: **(a)** aceptar el lun 1-feb: agendar/reprogramar en Prometric y **confirmar que el eligibility period cubre el 1-feb** (si no, pedir extensión a ECFMG, con costo) — es lo que hace el plan (`DAILY_META.examenTarget = 2027-02-01`); **(b)** rendir el vie 29-ene dentro de la ventana recortando el sprint final (D94-D95 o los días de banco del sprint) — va contra tu regla de no recortar; **(c)** estudiar sábados para recuperar días y volver a la ventana (también contra el régimen L-V). **Cada día más sin estudiar mueve el examen otro hábil (mar 2-feb, mié 3-feb…) y arrastra la intensiva ENCAPS, CR-9 y el taper Derma.** | (a) · examen lun 1-feb · sáb 30 = D-2 y dom 31 = D-1 fuera del plan (`USMLE_TAPER.d95` / `dMenos1` / `examen`) |

### Consecuencias del corrimiento v5.12 en los frentes secundarios (15-sep) — decisiones nuevas

| # | Decisión | Hoy corre así |
|---|---|---|
| A | **ENCAPS · la fase intensiva arrancaría el lun 1-feb = día del examen Step 1** (día 96 de la cuenta de la app; `FASE_INTENSIVA_2027-I.md`). Propuesta: **arrancarla el mar 2-feb** (`node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-02 <fecha-examen>` → continúa en el día 97; el día 96 queda sin fila). **A VERIFICAR (15-sep):** qué hace el script con el slot `senales` del lunes cuando el D1 cae en martes (semana 1 = 2-5 feb; el pre-test 2026-II sigue el vie 5-feb). | SQL de la intensiva NO aplicado (ensayo del 8-sep en disco, base vieja); nada que ejecutar hasta la convocatoria SERUMS |
| B | **Research · CR-9 (SUBMIT del case report #1 a DOJ) cae el lun 1-feb = día del examen.** El generador ancla CR-9 a la pausa 4→29-ene, no al examen: no se mueve solo. Opciones: (1) mover el átomo al mar 2-feb (`gen_research_plan.js` + `gen_research_calendar.js --check`, corre el ciclo 2 un slot), (2) submitear la tarde del 1-feb tras el examen (paquete congelado desde CR-8, vie 11-dic: 20-30 min), (3) dejarlo y no hacer research ese día. | CR-9 lun 1-feb (`RESEARCH_HITOS`); overlay 🔬 del Calendar sin cambio |
| C | **Derma · el vie 15-ene (NBME 31, GO/NO-GO) es d43 = Mohs, sesión NORMAL de 2 casos** (el taper es posicional d44-d49 y con d1 = jue 17-sep corre al mar 19-ene → mar 2-feb). Alternativa: swap d43↔taper (Mohs al mar 2-feb y el 15-ene en modo taper de 1 caso + FSRS). | d43 normal · taper 19-ene → 2-feb (`DERMA_DAILY_META.taperStep1`) |
| D | **LIVIANO · el caso integral 16/16 (D90, vie 22-ene) cae DESPUÉS del capstone (D88, mié 20-ene) y de la trimestral II (D89, jue 21-ene)**: inversión de 2 días porque los 16 casos van en viernes y el plan ganó un 17.º viernes (el generador salta el primero: vie 18-sep sin caso, cada caso corre una semana). Opciones: aceptar (el caso funciona como examen final del protocolo ya ensamblado) o intercambiar a mano capstone/trimestral ↔ caso (o cambiar la regla del generador para saltar el ÚLTIMO viernes). | Inversión aceptada por defecto (`livianoStudyPlan.ts`) |
| E | **SYNAPSE · la última A-unit cae el lun 25-ene (d132), D91 del Step 1** — ver la fila SYNAPSE de abajo (mantener o adelantar al vie 22). | lun 25-ene |
| F | **AURUM · el PITCH v5 (d95) cae el vie 29-ene = última sesión del Step 1** — ver la fila AURUM de abajo. | vie 29-ene |
| G | **MIR · el lun 1-feb (examen) es D18 del mantenimiento en modo normal** — ver la fila MIR de abajo (reducido o vacío ese día). | normal |

### USMLE · divergencias Palmerton §E que siguen abiertas (las #2, #5 y #7 ya están implementadas)

| # | Decisión | Hoy corre así |
|---|---|---|
| 1 | **Consolidación 11:00 a 20Q permanentes** si en S2-S3 la revisión metodológica no cabe en 60 min (Palmerton §3.4: 10Q + revisión = 60 min). Decidir tras S1-S2 | 30Q (10 pre-test + 20 consolidación) en nivel 1; 40Q desde nivel 2 |
| 3 | **Reformular el GO/NO-GO para que el UWSA2 sea solo informativo** (el UWSA sobreestima; la fecha la decide el NBME). `HITOS_ONTRACK` ya lo trata como 'low risk · solo resistencia'; falta la frase del GO | "2 NBME ≥68 % + UWSA2 low risk" |
| 4 | **Free 120 en Prometric Lima + maratón de resistencia** (Palmerton §8.1 #4: un simulacro más largo que el examen). Única ventana sin tocar franjas: **D88, mié 20-ene** (NBME 33 + 3 bloques de *flagged* ≈ 5 h) cediendo Research/Derma/AURUM ese día; `POR_MATERIA` §E dice "un viernes" (todos son hitos) → corregirlo al decidir | Solo el Free 120 en D90 (vie 22-ene), en casa |
| 6 | **Mover la eval timed 18:00-18:45 a 12:00-12:45** ("estudiar cansado = 2-4× más lento"; solaparía SYNAPSE 12:30) | 18:00-18:45 |
| 8 | **Si el UWSA1 (mié 16-sep) sale <40 % → D2-D10 a 20Q/día** (tipo Jay). Se decide el martes con el % real | Sin regla activa |
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
      colchón consumido desde el 31-ago son **12 días hábiles** (v5.12) — el examen ya salió de la ventana. *(USMLE)*
- [ ] **🔴 EL COLCHÓN SE ROMPIÓ (v5.12, 15-sep): el examen ya está FUERA de la ventana 25-29 ene (target lun 1-feb) y no hay ningún día de reserva.** Un día más sin
      estudiar mueve el examen al mar 2-feb (y así sucesivamente: cada corrimiento = reprogramar Prometric otra vez, si el eligibility period lo permite) o obliga a
      (a) **recortar temario** (rompe la regla) o (b) **estudiar un sábado** para absorber el día. Decidir la regla ANTES de que ocurra; y desde ya: **agendar
      Prometric para el lun 1-feb + confirmar eligibility** (🔴). *(USMLE — bloqueante)*
- [x] ~~**Decisión (v5.11): el D95 = jue 28-ene ya no es descanso puro sino sesión mínima (D-1 dentro del plan).**~~ **SUPERSEDIDA por v5.12 (15-sep):** el D-1 vuelve a quedar FUERA del plan (dom 31-ene, descanso: solo Anki vencido + ritual `USMLE_TAPER.dMenos1`; el sáb 30 = D-2 también sin banco) y el D95 (vie 29-ene) es una sesión ligera de taper (Anki maduro + 20Q flagged + rapid review + logística). Lo que hay que confirmar ahora es la fila 0 (examen lun 1-feb). *(USMLE)*
- [ ] **SYNAPSE · la última A-unit (d132, cierre F2 + CCA-F) cae el LUNES 25-ene-2027** (v5.12: con D1 en miércoles la semana 19 termina el lunes = D91 del Step 1, primera sesión de la última semana del plan; v5.11: sáb 23-ene; v5.10: vie 22-ene). Decidir si se mantiene (15' un lunes de sprint) o se adelanta al vie 22-ene (regenerar con `gen_synapse_plan.js` cambiando el cierre). El texto de esa A-unit ya dice «CIERRE F2 (lun 25-ene en v5.12)». *(SYNAPSE)*
- [ ] **Puente MIR ↔ Step 1** — Cardiología MIR (D5, **mar 22-sep**) precede a Cardiovascular Step 1 (D6, **mié 23-sep**)
      por 1 día; Psiquiatría arranca **el mismo día** (**mar 29-dic**) que *Psychiatry & Behavioral* (v5.12). Los otros 9 bloques
      quedan entre +7 y +12 días. **Recomendación escrita: NO re-permutar el MIR.** El chip «MIR precedió esta semana» del
      repaso 07:15 ya está en la app. *(USMLE/MIR)*
- [ ] **Materias sin columna vertebral en el corpus Palmerton — decidir la fuente sustituta** *(USMLE)*:
      - **13 días completos**: Micro/ID (D57-D64, **3→14-dic**, con el NBME 28 en medio), MSK/Reuma+Derma (D71-D73,
        **23→28-dic**) y Psiquiatría (D74, D76 y D77: **29-dic, 4 y 5-ene**; el NBME 30 del mié 30-dic es D75) — D# v5.12. Propuesta: **subir el peso del pre-test 10Q de las
        08:15 como FUENTE** y de la *shopping list*; no buscar "el vídeo de Palmerton".
      - **Cardio D8 (vie 25-sep, curvas PV/Wiggers/Starling — viernes de nivel 3) y D16 (mié 7-oct, valvulopatías y soplos — cae DESPUÉS del
        NBME 25 del vie 2-oct)**: PV loops, Frank-Starling con retorno venoso, Laplace, maniobras de soplos, S2 y Jones
        **CONFIRMADOS AUSENTES**. ¿Costanzo, B&B o First Aid? Decidir **antes de esa mañana**.
      - **Bioestadística (D78, mié 6-ene-2027)**: el corpus cubre la mitad conceptual pero **no la de cálculo** → repartir
        vídeo+AMBOSS / paquete de stats de UWorld.

### Resto de secciones

- [ ] **ENCAPS · convergencia registro ↔ Supabase**: hoy cada cierre de la app se lleva al registro a mano («⎘ línea
      --cerrar»). El `--pull` propuesto (leer `study_progress` fuente `app:cierre` y reconstruir rondas v3 en
      `_registro_resoluciones.json`) **no existe**: ¿se pide al dueño de `gen_encaps_semana.js` (próxima pasada) o se
      mantiene el botón? `errores_por_tipo` ya trae la ronda v3 completa, es trivial.
- [ ] **ENCAPS · el pre-test de arranque volvió a 39/40 reales en v5.12** (v5.11 lo tenía en 40/40): al regenerarlo el 15-sep, II-3 solo tenía 4 reales libres (los del banco sustituido del D1) y el 5.º es `N-II3-020` (cadena_frio, nuevo con clave de compendio). `_meta.conteos` de `pretest_arranque_2026-09-16/17.json`: 2024-2A 16 · 2025-1A 10 · 2025-2 13 · nuevo 1. ¿Se acepta 1 nuevo o se libera un real de II-3 sustituyéndolo en `eval_2026-09-17`/`minisim_2026-09-18` (regenerar esas salidas)? *(ENCAPS — menor)*
- [ ] **ENCAPS · ¿se aplica el override semanal** que propone `gen_encaps_semana.js`? No es automático: revisar el SQL y
      ejecutarlo por `execute_sql`. En las semanas con 4 slots CRÍTICA un tema caliente **solo desplaza a un crítico ya
      dominado** (≥85 %, n≥5); I-3/V-2 intocables; máx. 2 sustituciones. *(decisión semanal, viernes 17:00)*
- [ ] **MIR · el acumulado <50 % pone el tema en 'caliente' pero NO cuenta como evento de fallo** (solo quiz <60 % y slot de
      ancla ✗ suman para el "ajuste obligatorio al 2.º fallo"). Si prefieres que sí cuente, son 2 líneas en `mirTemaEstado`.
- [ ] **MIR · modo "reducido" de enero** — leído de `mirMantenimiento.ts` el 15-sep (v5.12): mantenimiento **60 días, jue 7-ene →
      mié 31-mar-2027** (arranca el jue 7 para no pisar el D78 del mié 6-ene; el fin está clavado al ENCAPS y pierde otro slot lun-jue: 48 slots, Reuma baja de 4 a 3), `modoReducidoHasta = 2027-01-29` (**17 días** reducidos = solo Anki + 10Q mixtas; 12 jueves con
      Tier C express, el primero jue 7-ene Trauma MI). Si prefieres el bloque completo también en enero, hay que regenerar con esa constante cambiada
      (`gen_mir_mantenimiento.js`). ⚠ El **lun 1-feb (examen Step 1)** queda en modo normal (D18: 25Q Cardio + interleaving):
      decidir si ese día va reducido o vacío. *(MIR)*
- [ ] **Supabase · qué se hace con los backups viejos** — `study_schedule_bk_0906b` sigue existiendo y en total hay **~43
      tablas `study_schedule_bk_*`** con RLS OFF expuestas a la anon key. ¿Se conservan, se borran o se protegen? *(sistema)*
- [ ] **CURVA · decidir el eje de la línea.** `empresaData.ts` dice "Estética & figura / estética corporal médica";
      `estudioPulsoData`, `brandContentPlan` y `CURVA_ACADEMIA.md` la tratan como **hormonal**. **Si Curva es estética
      corporal hay que rehacer el esqueleto.** *(Business — bloqueante para febrero)*
- [ ] **VITALS · 3 decisiones del puente con la Academia**: (a) día del check-in semanal de EA GLP-1 (fijo vs día de
      inyección); (b) base de cálculo de la proteína en `bajo_glp1` (peso actual / ajustado / objetivo; piso **1,2 vs 1,6
      g/kg**); (c) si la foto mensual se guarda en la app. *(VITALS/LIVIANO)*
- [ ] **Research · ¿nov-2026 o feb-2027 para el SUBMIT de la tesis L0?** `RUTA_PUBLICACION_2027.md` §3.1 dice "envío
      feb-2027"; el plan fija **T-8 = mié 25-nov-2026** (v5.11 = v5.12) con el gate CEI + inglés (si falla, cascada a feb-2027 automática).
      Decidir cuál prevalece; si es feb-2027, es 1 línea en el script + regenerar. *(Research)*
- [ ] **AURUM · política de semanas** (leído de `aurumDailyPlan.ts` el 15-sep, v5.12: D1 mié 16-sep → D130 vie 19-mar-2027): las 16
      variantes LIVIANO caen ahora en MARTES hasta el d70 (10-nov → 22-dic), luego d75 en MIÉRCOLES (30-dic) y las 8 restantes en VIERNES
      (d80 8-ene … d115 26-feb); PITCH 1-3 en martes (d15 6-oct · d35 3-nov · d55 1-dic), PITCH 4 miércoles (d75 30-dic),
      PITCH 5-7 viernes (d95 29-ene · d115 26-feb · d130 19-mar). Se respeta "1 de cada 5 drills". Si quieres viernes
      estrictos, cambiar la política en `gen_aurum_plan.js` (saltar feriados sin desplazar la semana). ⚠ El PITCH v5 (d95) cae el **vie 29-ene = D95, última sesión del Step 1** (v5.11: jue 28 = D-1): decidir si se adelanta o se graba después del examen (lun 1-feb). *(AURUM)*
- [ ] **Business · los 3 últimos OUTPUT** caen vie 8-ene (S15, D115), mié 13-ene (S16, cierre, D120) y jue 14-ene-2027 (extra, retro
      del formato L; D121 = último día) porque las lecturas se agotan antes (v5.12). Si quieres S16 y el extra en viernes, añadir
      lecturas META en `plan_pulso_v3_L.json` (el plan lo regenera `gen_business_plan.py`, ya integrado en el remap). *(Business)*
- [ ] **LIVIANO · posición de los drills de cifras** (v5.12: D36 mié 4-nov · D57 jue 3-dic · D75 mié 30-dic · D87 mar 19-ene — mismas fechas que v5.11, D# −1); el
      análisis pedía D38/D58/D75 (en v5.12 D37 es la Síntesis M2 y D74 "cuándo derivar"). Si prefieres D38 exacto, mover
      `drill: true` en `liviano_curriculum.json` y regenerar. *(LIVIANO — menor)*
- [ ] **Calendar · 6 decisiones personales** (no se cambian horas sin tu OK) *(sistema)*: (a) reponer o no el NAP
      13:15-13:30 (hoy la LECTURA 13:00 ya define una **siesta OPCIONAL ≤20' solo en ÁMBAR**); (b) typo "ALUMUERZO"
      (`summary`); (c) `<br>` escapados en SYNAPSE 12:30 y PC sáb/dom (se conservaron a propósito); (d) la frase de identidad
      de examen ya está en EKER (frase 6) → ¿basta?; (e) **martes**: ALISTARSE 18:30 recorta 15′ a la Eval 18:00-18:45 →
      ¿cerrar la eval a las 18:30 o mover ALISTARSE?; (f) GYM/BAILE del vie 29-ene y del fin de semana 30-31 previo al examen del lun 1-feb (ver 🟠 Calendar 1).
- [ ] **Renombrar `DATA/ENCAPS/CALENDAR_SEGMENTOS_V5_6.md` → `_V5_12.md`?** El contenido va por v5.10-v5.12 (12-15 sep), el nombre
      no. Si se renombra, actualizar **en el mismo movimiento** las 8 descripciones del Calendar que lo citan por ruta,
      `CALENDAR_SEGMENTOS_LUNES_VIERNES.md` y la memoria. *(sistema)*
- [ ] **Confirmar que es intencional**: NBME 32 (**lun 18-ene**), NBME 33 (**mié 20-ene**) y Free 120 (**vie 22-ene**) no
      caen todos en viernes, pese a que §0 del doc dice "los hitos van en viernes" (la v5.6 tenía las mismas fechas); el
      UWSA1 en miércoles (16-sep, = D1) es deliberado. *(USMLE/sistema)*

---

## Segunda capa — lo que SIGUE ABIERTO de los 65 puntos ciegos (13-sep)

Estado completo gap a gap en `DATA/USMLE/_palmerton_v3_extractos/SEGUNDA_CAPA_ESTADO.md`. Aquí solo lo abierto, en dos
listas: lo que exige tu decisión o tu sesión (arriba ya está repartido por bloque) y lo que es **cableado de una próxima
pasada de agentes** (no exige decisión; lo dejaron descrito los propios agentes porque el fichero no estaba en su lista).

**Para la próxima pasada de agentes (integrador), sin decisión de Joseph:**
- **MIR pool → UI** (`MirTodayPlan.tsx`, `POOL_USO.md` §2 y §5): pasar `qIds` del pool a pre-test 5Q, anclada 4Q, cierre
  10Q y mini-MIR 40Q (hoy solo el quiz 8-10Q pide ids → las preguntas del pre-test pueden repetirse en el quiz del mismo
  capítulo); **2.º `EvalForm` en `MantenimientoView` los jueves** con `dia.tierC` (asignatura = `tierC.asignatura`, capId
  = `tierC.capId`, kind 'mantenimiento') + chip `mirMantProximoTierC`; vista de pregunta con `preguntaPorId(id)`.
- **`DATA/MIR/README.md`**: §1 tabla de pesos de las 16 asignaturas fuera del plan · aviso "cobertura medida ≈80 %" en la
  tabla baseline de D78 · ~~§6 dice "63 días, default 4-ene"~~ **RESUELTO 14-sep, re-fechado 15-sep**: §6 ya dice 60 días desde el jue 7-ene (17 reducidos, 12 Tier C), como el `.ts` v5.12
  (`CALENDAR_SEGMENTOS_V5_6` §6.1 sigue desfasado: no estaba en la lista de este corrimiento).
- **Bloque Derma 13:30 ↔ pool MIR** (gap MIR 3, parte UI): `dermaDailyPlan.ts` ya rota los capítulos ProMIR de Derma
  (`PROMIR_DERMA_ROTACION`, 24 slots) y el pool sirve Dermatología (`POOL_USO.md` §4), pero `DermaTodayPlan.tsx` no importa
  `mirPreguntasOficiales` (grep 13-sep) → los 10Q MIR de 1 de cada 3 sesiones siguen sin ids del pool ni anti-repetición.
- **`gen_encaps_semana.js --pull`** (ver decisión ⚪ ENCAPS).
- **Bloque MIR en `gen_revision_semanal.js` y `vibecodingPlan.ts`** (gap MIR 7) + diffs propuestos por `vibecoding`:
  métrica 7 leer `_vibecoding_ship.json` (verify) y el texto "fuera del rango S1-S12 (7-sep → 27-nov)" desfasado; métrica 3
  añadir `primeraReview`/`primeraReviewEstado` con alarma ≥2 días; `homeBriefing.ts` comentario `STEP1_SEMANAS` (S19 =
  18-22 ene, S20 = 25-29 ene); `CockpitStatusBar` colorear ANKI con `primeraReviewEstado` (paso 4 de S2).
- **`RUTA_PUBLICACION_2027.md` §9** → marcar "solo lectura, se regenera desde `research_entregables`" (helper
  `mesaMarkdown()` en `researchEntregablesSync.ts`).
- ~~**`PROTOCOLO_MODO_MINIMO.md` §4 fila S7** sigue diciendo "A VERIFICAR: el S8 corre 2-6 nov"~~ **RESUELTO 14-sep**: la fila dice "RESUELTO v5.10b: el
  proyecto deload es S7 = motor de preguntas ENCAPS", y en v5.11 corría mar 27-oct → lun 2-nov; en v5.12 corre **mié 28-oct → mar 3-nov** (dos días por detrás de la semana deload 26-30 oct, como en el catálogo y en `vibecodingPlan.ts`; la fila ya está re-fechada el 15-sep).
- **Derma keyed por `d` viejo**: `dermaCerebro.ts` sigue keyed por `d` de la v2.1 en 22 fichas (la UI lo resuelve con
  `dermaDNuevo` + sentinela `G-44-cicatrizacion` d=50; si se re-ancla a la v3 la UI cae sola a búsqueda exacta); su
  `DERMA_DRILL_DIAS = [19,20,46,70]` ya no lo usa nadie (se usa `dia.drillHDPH`); `dermaLedger.ts` línea 225 conserva el
  comentario "2ª pasada FSRS (d69)"; `obsidianDermaMap.ts` + `build_vault_derma.js` (carpetas d44-d70 viejas del vault:
  renombrar o dejar como histórico).
- **`CALENDAR_SEGMENTOS_V5_6.md` §6.2/§11.2** aún listan PC sáb/dom, 🧠 IA 04:15 y misión 12:30 como "sin tocar" — los 4
  los actualizó `vibecoding` el 13-sep (solo `description`); y §6.1 sigue diciendo "Derma 70 sesiones → mar 30-mar" y
  "mantenimiento MIR 63 días / 18 reducidos" cuando los `.ts` dicen **Derma 73 → vie 9-abr (+ ciclo 2 d74-d103 13-abr → 2-jul)** y **MIR
  60 / 17 (jue 7-ene → mié 31-mar, v5.12)** (releído con node el 15-sep).
- **Hallazgos del crítico que son código, no decisión** (P1 de `SEGUNDA_CAPA_ESTADO.md` §3): bug `diaPrevio` en día
  post-hito (#6) · `DAY_AFTER` + lectura por sistema (#5) · gate N3/N2 mal medido (#13) · regla del tercio (#8) · respuestas
  cambiadas/relecturas (#11) · NBME por bloque/sistema (#27) · shopping list arrastrada al 07:15 siguiente (#28) ·
  temporizador 2:00/12:00 (#10) · mazo Pharm aparte en `ankiLinks` (#14) · fixes de tarjeta en `TIPO_ERROR_INFO` (#18) ·
  `ANKI_CONFIG_PALMERTON` + telemetría `rev.perDay`/rollover (#15) · backlog §4.10 en README/FRANJAS (#16) · regla del
  frente (#17) · `PISO_AMBAR` 65/60 vs gate 80 (#21) · `usmleData.ts` (`FIRST_AID_INDEX.role` "annotate", `USMLE_RAMP`
  legacy, nota biochem) (#19) · checklist §11.5 pre-marcado (#30) · kit anti-pánico `PROTOCOLO_BLOQUE` + campo
  `jmd-usmle-worstcase` (#26) · lectura del UWSA1 por tramos en `HITOS_ONTRACK` (#12) · toggle binario del día parcial en
  `UsmleTodayPlan` (§12.6-10).

**Vacíos de la 2.ª capa que siguen sin agente y son tuyos o de un agente futuro:**
- **LIVIANO no mide retención** (`gaps_v3b_business` #1, parcial): existen los 18 pre-tests de lunes y los 4 drills en
  `livianoStudyPlan.ts`, pero **no hay deck en `ankiLinks.ts` ni score persistido** (`liviano_score`: 0 menciones) → el ✓
  sigue binario. Importar el CSV (🟠) + asignar el deck (🟡) + un agente para el score.
- **Evaluación clínica del paciente con obesidad** (`gaps_v3b_business` #3): `liviano_curriculum.json` tiene 17 menciones
  (anamnesis, comorbilidades, obesogénicos…) dentro de casos, pero **A VERIFICAR (13-sep)** que exista un bloque de días
  dedicado (anamnesis/antropometría/labs basales, SAOS/MASLD/SOP, causas secundarias, embarazo/anticoncepción con GLP-1,
  TCA). Si no, es contenido nuevo para febrero (no se recorta nada del plan vigente).
- **KPIs del Cockpit LIVIANO** (`gaps_v3b_business` #9, parcial): el botón "Exportar JSON" existe; el tracker
  `Metricas_v2` y la hoja `Outputs` del Excel no están en la app (A VERIFICAR) y falta la carpeta `_kpi/`.
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
  `SEMANAS/overrides_acumulado.json`. **No re-ejecutar** `_encaps_mantenimiento_2027.sql` (bk_0915 existe: es correcto que aborte).
- **Pool MIR**: la clasificación se corrige en `_clasificacion_llm/AAAA.json` y se regenera; **nunca se edita
  `mirPreguntasOficiales.ts` ni el raw a mano**. Anti-repetición por `qIds` en `mir_eval_log` (`POOL_USO.md`).
- **NotebookLM es motor de verificación, no fuente**: toda dosis o cifra que devuelva queda "A VERIFICAR" hasta cotejarla
  contra la primaria. Ya se detectaron **4 errores suyos** en el corpus Palmerton y **1 probable fichero inventado**
  (`sistema-respiratorio-yousmle.md`).
- **Taper Derma es POSICIONAL (d44-d49, 15→29-ene)**: si un futuro corrimiento mueve el D1, comprobar con
  `dermaVentanaTaper('2027-01-29')` qué d caen en la ventana y repetir el swap si cambian (el remap avisa).
- **Generadores idempotentes**: `remap_inicio.js 2026-09-14` ×2 + los 9 generadores → `git diff` vacío (comprobado el
  13-sep con v5.10; en v5.11 el orquestador corrió `2026-09-15` — **A VERIFICAR (14-sep)** la idempotencia con una segunda pasada). Si un `git diff` aparece tras correrlos, algo cambió de verdad: no lo pises.
- **Cabeceras de comentario desfasadas en `src/lib`** (no tocadas por los agentes de docs, fuera de su lista): `mirDailyPlan.ts` línea 3 aún dice "v5.10 · D1 = lun 2026-09-14 → D78 lun 2027-01-04" (los datos sí son v5.11: 15-sep → 5-ene) y la nota Derma d48 del `.ts` sigue diciendo "Víspera del descanso pre-examen (D95 de Step 1, mié 27-ene)" cuando el D95 es ahora el jue 28. Solo comentarios; corregir en la próxima pasada de código. *(sistema)*
