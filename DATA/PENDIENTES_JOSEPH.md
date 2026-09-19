# PENDIENTES DE JOSEPH · régimen v5.14

**Generado:** 08-sep-2026 · **re-fechado a v5.10 el 12-sep** · **consolidado tras la SEGUNDA CAPA el dom 13-sep-2026** · **re-fechado a v5.11 el lun 14-sep** · **re-fechado a v5.12 el mar 15-sep** · **re-fechado a v5.13 el mié 16-sep** · **re-fechado a v5.14 el sáb 19-sep** · **D1 = LUNES 21-SEP-2026 · EXAMEN STEP 1 TARGET JUE 4-FEB-2027**

> ⚠ **El régimen vigente es v5.14 desde el 21-sep-2026.** Es el **decimotercer corrimiento** del ciclo 31-ago→21-sep (15 días
> hábiles perdidos: ni el jue 17 ni el vie 18-sep se estudiaron). Instrucción literal de Joseph, reconfirmada en cada corrimiento: **ni un tema ni un subtema se deja
> atrás — no se fusiona ni se recorta nada**; el desfase se absorbe alargando el final de cada plan. **CONSECUENCIA: el plan Step 1 de 95 días
> termina el MIÉ 3-FEB-2027 (D95 = D-1 DENTRO del plan: sesión mínima AM + ritual de test-day, `USMLE_TAPER.d95`/`dMenos1`) → examen target JUE 4-FEB-2027**
> (`DAILY_META.examenTarget`); el mar 2-feb (D94) es la última sesión de banco y el sáb 30 / dom 31-ene quedan libres (solo Anki vencido) entre el D92 (vie 29-ene) y el D93 (lun 1-feb).
> **Tienes que agendar/reprogramar el Prometric al jue 4-feb y confirmar que tu eligibility period lo cubre** (si no: extenderlo,
> o decidir recortar temario — ver ⚪ fila 0 y 🔴). Franjas y metas **no se movieron**; de los 12 hitos solo el UWSA1 cambió de fecha
> (→ **lun 21-sep = D1, 09:00-13:00**, baseline puro como prescribe Palmerton). Primer día de CONTENIDO = **mar 22-sep (D2)**; Cardio
> arranca el lun 28-sep (D6). **Consecuencia nueva de v5.14: el contenido cierra el jue 14-ene (D81, Bioquímica) y el NBME 31 GO/NO-GO se rinde el día
> siguiente (vie 15-ene = D82) sin días de banco de consolidación delante; los 2 random timed 2×40Q de la Fase B pasan a D84 (mar 19) y D86 (jue 21-ene) — ver ⚪ fila 0-bis.**
> **⚠ Desde aquí cada día no estudiado mueve el examen un día hábil más (o exige recortar).**
> **Regla al leer este doc: la FECHA es lo estable; el D# puede haber cambiado** — verifícalo contra el `.ts` del plan
> antes de actuar. Todas las fechas de abajo fueron releídas de los `.ts` con node el 19-sep-2026 (v5.14).
> *(v5.13, 16-sep: D1 jue 17-sep · D94 vie 29-ene = última sesión de banco · D95 lun 1-feb = D-1 · examen mar 2-feb · contenido desde el vie 18 · Cardio jue 24-sep. v5.12, 15-sep: D1 mié 16-sep · D95 vie 29-ene · examen lun 1-feb. v5.11, 14-sep: D1 mar 15-sep · D95 jue 28-ene = D-1 · examen vie 29-ene. v5.10, 12-13 sep: D1 lun 14-sep · D95 mié 27-ene.)*

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

**Estado del árbol el sáb 19-sep (v5.14):** el corrimiento a D1 = lun 21-sep está en el commit wip `76f17a2` (planes `.ts`, generadores,
Supabase ENCAPS 92 d con backup `study_schedule_bk_0919`, bancos y textos de la app); los docs de esta pasada (este fichero, ENCAPS,
Research, Derma, Business, SYNAPSE, roadmap) van en el working tree. El commit de cierre y el deploy siguen siendo tuyos.

---

## 🔴 ANTES DEL D1 (hoy sáb 19-sep / lun 21-sep temprano)

Sin esto el plan arranca ciego, con el contenido equivocado o con la app vieja en producción el primer día.

- [ ] **🔴 AGENDAR EL STEP 1 EN PROMETRIC PARA EL JUE 4-FEB-2027 (o reprogramar la cita si ya existía en la ventana 25-29 ene, el lun 1-feb o el mar 2-feb) y CONFIRMAR QUE EL ELIGIBILITY PERIOD CUBRE EL 4-FEB.** El plan v5.14 termina el mié 3-feb (D95 = D-1 dentro del plan); el mar 2-feb (D94) es la última sesión de banco y el sáb 30 / dom 31-ene son libres (entre D92 y D93): no hay ningún día de la ventana original libre. Si el eligibility period no llega al 4-feb: pedir la extensión a ECFMG (con costo) o decidir recortar temario (⚪ fila 0). Anotar aquí la fecha/hora confirmada y el centro. **Bloqueante: sin cita no hay examen.** *(USMLE — Prometric/ECFMG)*
- [x] ~~COMMIT del WIP + decisión `.gitignore`~~ **HECHO 13-sep (commit de cierre de la segunda capa).** Decisión tomada:
      los **PDF y TXT de los cuadernillos** (leyenda "prohibida la reproducción") quedan **fuera del remoto**
      (`.gitignore`; siguen en tu disco en `DATA/MIR/pool/raw/`). Los **JSON parseados y clasificados SÍ se versionan** y
      `src/lib/mirPreguntasOficiales.ts` **se queda en la app** (opción a): es uso privado de estudio, el bundle de Vercel
      no está indexado ni enlazado públicamente, y sin él el quiz MIR pierde la anti-repetición. Si prefieres la opción (c)
      —carga privada— pídelo y se hace en una pasada. *(sistema)*
- [x] **Deploy a Vercel de la v5.13 — VERIFICADO el mié 16-sep (tarde)**: commit de cierre `248aa1e` (sobre el wip `df206d0`) → push → bundle `index-bce1213b…` servido en https://joseph-md-app.vercel.app con `USMLE Step 1 v5.13`, `inicio:'2026-09-17'`, `examenTarget:'2027-02-02'` y `ENCAPS:94` (comprobado por contenido del bundle, no por hash). *(Superado por v5.14: ver el ítem siguiente.)*
- [ ] **Deploy a Vercel de la v5.14 — PENDIENTE (sáb 19-sep)**: el wip `76f17a2` ya lleva los planes, la siembra ENCAPS (92 d, `bk_0919`), los bancos y los textos; falta tu commit de cierre → push → comprobar que el bundle servido en https://joseph-md-app.vercel.app dice `USMLE Step 1 v5.14`, `inicio:'2026-09-21'`, `examenTarget:'2027-02-04'` y `ENCAPS:92` (por contenido del bundle, no por hash). **Antes del lun 21-sep 09:00 abre la web y comprueba** que el EEUU muestra Día 1/95 = UWSA1 lun 21-09 y que el Readiness dice examen 2027-02-04. Antes del lun 21-sep 16:15 abre la web y comprueba** que están vivos el D1: formulario **CIERRE DE
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
      importar. *(Derma — antes de la sesión d1 = **lun 21-sep** (v5.14: Derma corre +1 slot; el lun 21-sep es su d1 y coincide con el D1 del régimen; el mar 22-sep es día Research)*
- [ ] **Importar el deck de cifras ENCAPS** — Anki → Importar
      `DATA/ENCAPS/TRACKING_ERRORES/ANKI_COLA/ENCAPS_Cifras_2027-I.csv` (separador `;` · HTML · deck en columna 3 →
      `ENCAPS::Cifras` · tags en columna 3), FSRS, 20 nuevas/día. Se repasa **dentro del bloque Anki de las 05:00, ≤5
      min**, desde el día 1. *(ENCAPS)*
- [ ] **Protocolo test-day para el UWSA1 (LUN 21-SEP 09:00-13:00)** — 3 bolsas Ziploc BREAK 1/2/3 (huevo duro,
      pavo/pollo, queso, nueces, granos de café con chocolate; **sin galletas ni jugos**); quick-log de sueño y agua en
      VITALS ese día (07:00 y al cerrar el sim); y **escribir en papel el plan B "worst-case" antes del primer bloque**
      (Palmerton §7.6: qué haces si el bloque 1 sale a 40 %; drill "Oh F#@& to OK" 10-15 s; AVP en los descansos). La
      app todavía no tiene dónde guardarlo (hallazgo #26). *(USMLE/rutina)*
      > Contexto v5.14: el UWSA1 es el **único hito que cambió de fecha** (vie 11 → lun 14 → mar 15 → mié 16 → jue 17 → lun 21-sep, siempre el D1): se rinde el **lun 21-sep = D1**, SIN un solo
      > día de contenido encima. Es la línea base pura que prescribe Palmerton: no lo leas como un mal resultado.
- [ ] **Confirmar el re-orden Research v5.10b (mismo orden; v5.14 corre +2 hábiles más — releído del `.ts` el 19-sep)**: el ciclo 1 arranca el **mar 22-sep** (R0); T-1 (ética/CEI) **jue 8-oct
      (d7)** con la solicitud expedita presentada ese día (8 días después del interno ≤ 30-sep) · M3 (Finlay) **lun 12-oct (d8)** · R9 (¿ya existe la SR?) **mié
      14-oct (d9)** antes de R6 (**mié 28-oct, d14**) · CR-1 **vie 30-oct (d15)** y CR-2 **mar 3-nov (d16)** · T-2 (STROBE)
      mié 11-nov · R7 mar 17-nov · R2 mié 23-dic. Si no lo aceptas, es 1 línea en `gen_research_plan.js` + regenerar + `gen_research_calendar.js --check`.
      *(Research)*
- [ ] **Re-scan LOGUEADO de QX y Theomed** + decisión escrita de matrícula: ¿sigue vivo el acceso 2026-II? ¿publicaron
      Investigación y Gestión? ¿abrió el ciclo 2027-I? **4 de los 7 simulacros de viernes de la fase intensiva dependen
      de ese acceso**. *(ENCAPS)*
- [ ] **Retomar el quick-log de VITALS a las 07:00** (20 s: horas de sueño + agua) y, desde el lun 21-sep, **registrar
      correr/caminata al volver (06:45, 20 s)** como pide la descripción nueva de CORRER/CALISTENIA (VITALS no modela el
      cardio AM hasta la Tarea D). Sin dato, la métrica 8 de la revisión semanal y el disparador ÁMBAR "sueño <6 h" no
      existen. *(VITALS/sistema)*
- [ ] **Auditar F0 de SYNAPSE contigo en 5'** (día 1): marcar ✓ las A-units ya cursadas jun-ago (Academy *AI Fluency ·
      Claude 101 · Code 101 · Platform 101*, Karpathy, 3B1B) en la pestaña ⚡ run; la primera sin ✓ es la lección real de
      mañana. *(SYNAPSE)*

---

## 🟠 ESTA SEMANA (21-25 sep)

### Lun 21-sep (D1) — rituales que estrenan instrumento

- [ ] **04:55** — `node D:/joseph-md-app/DATA/_scripts/journal_hoy.js --abrir` (el enlace 📓 journal de la app abre
      `vscode://file/…`; en el móvil no abre). Regla nueva: **04:55 commit-or-stash obligatorio**, el Anki AM 05:00 no se
      retrasa. *(SYNAPSE)*
- [ ] **16:15** — resolver `BANCO_PROPIO/pretest_arranque_2026-09-21.html` (parte 1: 20Q = 5Q × II-3 · I-3 · V-2 · III-5; **20/20 reales con clave oficial**, 0 nuevos — regenerado el 19-sep)
      y el **mar 22-sep (D2)** la parte 2 (`…_2026-09-22.html`: II-5 · I-4 · IV-1+IV-2 · II-4, 20/20 reales). En cada uno «Generar JSON» →
      guardar → `node DATA/_scripts/gen_encaps_minisim.js --registrar <export.json> --append` (**no** la línea de 1
      renglón: dejaría la ronda como MIX sin línea base por crítico). No hay `banco_2026-09-21` ni `banco_2026-09-22` (sustituidos por el pre-test);
      `banco_2026-09-17.*`, `eval_2026-09-17.*`, `pretest_arranque_2026-09-17.*`, `minisim_2026-09-18.*` y las salidas v5.13 del 22-24 ya no existen. **Semana 1 regenerada el 19-sep:**
      `eval_2026-09-22` / `_23` / `_24` (5Q cada una) + `banco_2026-09-23` (D3 · V-2 · planeamiento) + `banco_2026-09-24` (D4 · III-5 · pertinencia_barreras, 15/25 reales);
      el vie 25-sep = primera mini-sim del ciclo (`sim_n` 5, D5) y al cerrar la semana hay que pre-generar la del 28-sep (`--semana 2026-09-28`; abre con II-5 · nts_adolescente (lun 28) e I-4 · dengue (mar 29)).
      ⚠ **El pool III-5 queda a 0 tras `banco_2026-09-24`**: reponer `set_III-5_2.json` ANTES del jue 22-oct (siguiente III-5, medicina tradicional). *(ENCAPS)*
- [ ] **17:10** — **primer cierre real desde la app** (HOY → final de la cola → CIERRE DE SESIÓN → Guardar) y comprobar
      que aparece en «17/20» (% ciego semanal + tabla por código) y en Supabase:
      `SELECT fecha, especialidad, porcentaje, fuente, errores_por_tipo FROM study_progress WHERE fuente='app:cierre'`.
      Si el estado dice '⟳ local', pulsar «Sincronizar pendientes» (la ronda queda en `jmd-encaps-cierres`). Desde ese día
      la rutina es diaria; el registro se lleva con «⎘ línea --cerrar» → `node DATA/_scripts/gen_encaps_semana.js --cerrar "…"`
      (o «⎘ JSON ronda» → `gen_encaps_minisim.js --registrar <ronda.json> --append`). *(ENCAPS)*
- [ ] **18:25** — crear la **primera nota del diario USMLE** `01_USMLE/05_DIARY/2026-09-21.md` en el vault (Insertar
      plantilla → `_template_day_usmle`, 60 s) y **activar el plugin Dataview** (instalado en `.obsidian-desktop/plugins`,
      pero `community-plugins.json = []` — A VERIFICAR (12-sep)) para que el Dashboard_USMLE y el bloque APEX rendericen.
      *(USMLE/sistema)*

### Resto de la semana

- [ ] **Mié 23-sep (D3, "setup Anki FSRS"; v5.14) — completar la configuración Palmerton §4.2 que la app aún no lista**
      (hallazgo #15): *Maximum reviews/day* **9999** (el default 100 oculta vencidas) · *reviews first, new second* ·
      **rollover 4 h** (despiertas a las 04:00; con rollover 9 h las tarjetas "de hoy" no estarían listas a las 05:00) ·
      sync al abrir y al cerrar · note type *Basic (optional reversed)* sin reversar todo · ≤3 mazos · **Browse → Set Due
      Date 0** para revisar hoy las tarjetas creadas a las 10:45. Anotar en SYNC_ANKI. *(USMLE)*
- [ ] **Tag compartido `sys::<sistema>` a mano** en cada tarjeta mientras el motor APEX no lo ponga (USMLE:
      `sysTag(DIAS[].system)` · MIR: `sysTag(usmleSystem)` · Derma step1: `step1 sys::Dermatology`). Anotar en SYNC_ANKI la
      fecha de la primera verificación con `findCards 'tag:sys::*'`. *(USMLE/MIR/Derma — rutina)*
- [ ] **P0 de seguridad · `datos_tesis` (55 filas de MENORES, RLS OFF, anon key en repo con remoto).** Ejecutar UNA opción
      **antes del T-8 (mar 1-dic)** y anotarla en `etica.md` fila 8 — o ya en D1-D2 en vez de esperar al proyecto S6 del
      vibecoding (lun 26 → vie 30-oct, v5.14): **A (recomendada)** `ALTER TABLE public.datos_tesis ENABLE ROW LEVEL SECURITY;` (sin policies:
      anon deja de leer; service_role sigue) · **B** `DROP TABLE public.datos_tesis;` (irreversible; la maestra sigue en
      `D:\motor_apex` y el CSV de-id cubre el depósito) · **C** RLS + policy "Allow all" (**no protege**).
      ⚠ **Antes:** `D:\motor_apex\bot_tesis.py` inserta vía `supabase_client.py` con `SUPABASE_KEY` de `D:\motor_apex\.env` —
      si es la anon, la opción A rompe el bot (necesita service_role). Comprobar qué key es. El resto de tablas con RLS OFF
      (~43 backups `study_schedule_bk_*`) va en ⚪. *(sistema)*
- [ ] **Anki telemetría con Anki abierto** — `node DATA/_scripts/anki_telemetria.js` una vez con sesión de AnkiWeb para
      validar el `sync` y el KPI `primeraReview`; el proyecto **S2 (lun 28-sep → vie 2-oct, v5.14)** crea la tarea programada
      `schtasks /create /tn "JMD Anki telemetria" /tr "node D:\joseph-md-app\DATA\_scripts\anki_telemetria.js" /sc daily /st 21:05`
      (o hook `SessionEnd`). *(SYNAPSE)*
- [ ] **Remoto privado del journal (una vez):** `git -C D:/synapse-journal add -A && git -C D:/synapse-journal commit -m "journal 2026-W38: scaffold"`
      → `gh repo create synapse-journal --private --source=D:/synapse-journal --remote=origin --push`. El repo local ya
      está inicializado (sin commit). *(SYNAPSE)*
- [ ] **Lun 28-sep · M1 (Research d3; v5.14 — semana siguiente) — WhatsApp + reunión con el Dr. Ciro**: 3 coautorías, vía CEI de la tesis, versión
      del CADI usada, su ORCID; es también el arranque del case report (**regla escrita en MENTORES fila 6: si el mar
      20-oct (d11, ~3 semanas desde M1) no ha dado caso → mensaje único de `caso_candidatos.md` §2 al colega SPD**). *(Esta semana los átomos Research son R0, mar 22-sep: abrir las 10 cuentas, y R1, jue 24-sep: PICO.)* Los documentos de ética se reúnen
      desde este día (chip en M1). *(Research)*
- [ ] **Vie 25-sep · primera mini-sim del ciclo (ENCAPS · D5 en v5.14, `sim_n` 5 en el SQL; en v5.13 la primera caía el vie 18-sep = D2)** — cargar la nota /25 **UNA sola vez** (cierre tipo `mini_sim` en el formulario
      → espejo automático en `study_sim_scores`, o en ▲ SIM; si cargas ambas con valores distintos gana la última).
      Las dos partes del pre-test (lun 21 + mar 22) ya estarán hechas: los 8 críticos tienen línea base antes de la primera mini-sim.
      A las **17:00**: `node DATA/_scripts/gen_encaps_semana.js --sql` → primer override (semana del 28-sep) → `node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-09-21 --override DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/override_2026-09-28.json`
      → revisar SQL (backup `study_schedule_bk_20260925`, DELETE solo MANTENIMIENTO) → `execute_sql` → pegar la
      verificación que imprime (**75 banqueo1h + 17 mini_sim** = 92 filas, v5.14). *(ENCAPS)*
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
      - **AURUM** (`expo start` → AurumHub): «✎ registrar semana» abre el editor y el semáforo cambia; en **D15 (vie 9-oct, v5.14)**
        aparece la rúbrica y el score se guarda en `jmd-aurum-rubrica`; en **D40 (vie 13-nov)** la tarjeta VARIANTE LIVIANO.
- [ ] **Calendar — una sesión de 20' con el MCP GCal (hallazgos #1-#4 del crítico + gap MIR 8; nadie los tocó):** *(sistema)*
      1. **Mar 2-feb (D94 = última sesión de banco, v5.14), MIÉ 3-FEB (D95 = D-1 dentro del plan) y JUE 4-FEB (examen) sin overlay y con TODO activo** (el sáb 30 / dom 31-ene, libres, quedan entre D92 y D93): las 6 series USMLE (RRULE UNTIL 20270130 — ya NO cubre ni D93-D95 ni el examen: hay que extenderlas a `20270204` o crear los overlays del lunes al jueves aparte)
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
      > sáb/dom, 🧠 IA 04:15, misión 12:30 y PC sáb/dom **ya están en v5.10** (12-13 sep, verificadas con `get_event`); las horas no cambiaron en v5.11, v5.12, v5.13 ni v5.14; el 16-sep se re-fecharon los overlays de hito a v5.13 (verificado con `get_event`) y **hoy sáb 19-sep otro agente los re-fecha a v5.14** (UWSA1 → lun 21-sep 09:00, D# v5.14 en los otros 11, overlay del examen → jue 4-feb 07:00-16:00, los 12 🔬 Research recreados con `gen_research_calendar.js`, series con descripción v5.14) — **A VERIFICAR (19-sep)** con `get_event` cuando termine; detalle en `DATA/ENCAPS/CALENDAR_SEGMENTOS_V5_6.md` §15.
- [ ] **Crear el evento recurrente `📋 REVISIÓN SEMANAL`** sáb 07:15-07:35 desde el **sáb 26-sep** (S1 = 21-25 sep; con D1 en lunes las 20 semanas del plan coinciden con las de calendario: S20 = 1-5 feb) — **lo crea hoy sáb 19-sep otro agente con ese default documentado en `REVISION_SEMANAL.md`**
      **y decidir sáb o dom como día oficial** (sigue siendo tu decisión): la descripción nueva del domingo SYNAPSE dice «Feynman + 20' revisión
      semanal» y `REVISION_SEMANAL.md` fija el sábado 07:15 (ya dice «si la hiciste el sábado, solo Feynman»). Descripción
      sugerida: `node DATA/_scripts/gen_revision_semanal.js → DATA/USMLE/REVISIONES/S<NN>.md · 10 métricas`. *(sistema)*
- [ ] **Antes de la revisión S1 (sáb 26-sep)**: tocar el instrumento SEMANA del cockpit (web) → pegar el portapapeles en
      `DATA/USMLE/REVISIONES/_localstorage_export.json`. Sin ese export las métricas 5/6/7/9 salen "sin dato"; las 1 y 2
      se rellenan a mano hasta el proyecto S3. **Sábados PC:** correr `node DATA/_scripts/verify_vibecoding.js <n>` ANTES
      de marcar el proyecto y pegar el one-liner `localStorage.setItem('jmd-vibe-ship', …)` en la consola (hasta que S3/S4
      lo automaticen). *(sistema/SYNAPSE)*
- [ ] **EKER — revisar la frase 6** añadida el 12-sep («Soy un médico USMLE-ready: cada pregunta ciega es un dato, no un
      juicio.», vigente hasta el 3-feb) y cambiarla si quieres otra; las 5 originales están intactas. *(rutina)*
- [ ] **Redeploy de n8n `APEX-MOTOR-FLOW-V2`** (:5678 sigue con el código del 07-may): con n8n arriba, exportar backup del
      workflow → `python D:\agente_estudio\scripts\_ARCHIVO_DESARROLLO\update_n8n_workflow_v2_3.py` → enviar **1 APEX
      `::OBSIDIAN` multilínea de prueba** con Ctrl+Shift+A y comprobar que la nota llega íntegra a `01_USMLE\…\APEX_creados\`
      y la card a Anki. Candidato al proyecto S4 del vibecoding (catálogo re-secuenciado). *(sistema/SYNAPSE)*
- [ ] **Alinear `D:\agente_estudio\config\fases.json`** — sigue con `FASE_4_ENCAPS_DOMINANTE.is_current_phase = true` y
      `FASE_7.inicio = 2026-10-01`. Poner `false` en FASE_4 (o `true` en FASE_7) y `FASE_7.inicio = 2026-09-21` (D1 del régimen v5.14). Verificar
      antes que `orquestador.py` lee ese campo. Opcional (S1): `git init` LOCAL en `D:\agente_estudio` (sin remoto,
      `.gitignore` para `.env`/`__pycache__`); mientras, los commits [S1]/[S6] van a joseph-md-app. *(sistema)*
- [ ] **Reponer stock del banco ENCAPS** (inventario regenerado el 19-sep, v5.14, con la semana 1, el pre-test y los 3 primeros mini-sims pre-generados: 434 → **254 ítems disponibles**; demanda 1 786Q
      en 92 días): **`set_III-5_2.json` antes del jue 22-oct** (III-5 está a **0** tras `banco_2026-09-24` + el pre-test; la siguiente sesión III-5 es el jue 22-oct, medicina tradicional) · `set_I-3_2.json` **antes del mar 6-oct** (quedan 15; I-3 vuelve con notificacion, una sesión pide 16-20Q) · `set_V-2_2.json` **antes del mié 7-oct**
      (queda **1**; el banco del mié 23-sep ya está armado y V-2 vuelve con clima_calidad) · `set_II-3_2.json` **antes del lun 19-oct** (15 disponibles; novedades_gestante) · `set_II-5_2.json` **antes del lun 26-oct** (20 disponibles hoy, pero el lun 28-sep consume 16-20; mci_curso_vida) · cola larga II-2 (2Q, la receta pide 4-5), II-6 (0), II-EMG (2Q). Déficit real (19-sep):
      **V-2 179Q · I-3 165Q · III-5 90Q · II-1 79Q · II-3 75Q · II-4 75Q · I-4 74Q · IV-1+IV-2 72Q · II-5 70Q · II-11 67Q · IV-6+IV-7 66Q · III-8 64Q**. Gate §3-bis (clave oficial o compendio/norma con número y
      año). *(ENCAPS)*
- [ ] **Conseguir `CLAVE DE RESPUESTA 2026-1.pdf`** (Tío López / QX): los 100 ítems del 2026-1 siguen sin clave. *(ENCAPS)*
- [ ] **Importar `DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv`** en Anki (tabulador, deck en columna 3, etiquetas en
      columna 4, FSRS) — **antes del vie 25-sep (D5, caso 1; v5.14: con D1 en lunes ya no se salta ningún viernes)**, tope **lun 12-oct (D16**, el día de las 10 tarjetas de MECANISMO del
      módulo). Fechas leídas de `livianoStudyPlan.ts` el 19-sep (v5.14). *(LIVIANO)*
- [ ] **Rutina de export de los registros que viven solo en un navegador** *(Derma/MIR)*:
      - Derma, cada viernes: botón de export del cierre (o en Debilidades) → `DATA/DERMATOLOGIA/TRACKING/_registro_derma.json` → `rondas[]`.
      - MIR, cada semana: HOY → «⤓ Exportar log JSON» → `DATA/MIR/mir_eval_log_export.json` →
        `node DATA/_scripts/gen_delta_espana.js --write` (completar las filas del delta volcadas y subir las estables a la
        tabla de su asignatura) y volcar también en `_registro_resoluciones.json` con `plan:'MIR'`. El espejo Supabase
        `mir_eval_log` reduce el riesgo, no lo elimina.
- [ ] **(hecho el 16-sep para v5.13; v5.14 PENDIENTE de Claude en la sesión principal — los agentes no tocan la memoria) Actualizar la memoria `usmle-step1-v5.md`, `encaps-mantenimiento-2027-1.md`, el handoff y MEMORY.md al estado v5.14** (D1 lun 21-sep · D94 mar 2-feb = última sesión de banco · D95 mié 3-feb = D-1 dentro del plan · examen target jue 4-feb · sáb 30/dom 31-ene libres entre D92 y D93 · MIR 78 d → lun 11-ene, mantenimiento 57 d desde el mar 12-ene · ENCAPS 92 d → vie 29-ene · SYNAPSE vie 29-ene · Research +2 (mar 22-sep → mié 17-feb, CR-9 lun 1-feb = D93) · Derma +1 slot 21-sep → mar 13-abr, taper 21-ene → 4-feb con d49 = día del examen): el orden
      real es el de `REESTRUCTURACION` §13.3 — `remap_inicio.js <fecha>` (ya incluye Research vía `gen_research_plan.js`,
      Derma 73 + ciclo 2, Business vía `gen_business_plan.py`, LIVIANO) → `gen_vibecoding_plan.js` **antes que**
      `gen_synapse_plan.js` → `gen_aurum_plan.js` → `gen_mir_daily.js --check` (+ `gen_mir_mantenimiento.js` si D78 pisa el
      inicio del mantenimiento; v5.14: D78 lun 11-ene → mantenimiento desde el mar 12-ene) → `gen_encaps_mantenimiento_2027.js` → `execute_sql` → USMLE con `gen_usmle_v5.js` → tsc/expo → docs + overlays.
      ⚠ No volver a ejecutar `build_vault_research.js` (sobreescribiría `obsidianResearchMap.ts`); ⚠ los `gen_readme.js` /
      `gen_calendario.js` del scratchpad no conocen `franjaNota`/`USMLE_TAPER`/viernes N4: no re-ejecutarlos. *(sistema)*
- [ ] **Los D# de LIVIANO volvieron a cambiar en v5.14 y esta vez también las fechas de drills/síntesis (los 16 casos siguen en viernes, ahora desde el vie 25-sep = D5: con D1 en lunes el plan tiene exactamente 16 viernes y ya no se salta ninguno)**:
      drills **D37 (mar 10-nov) / D58 (mié 9-dic) / D75 (mié 6-ene) / D88 (lun 25-ene, repaso integral)** · trimestral I **D46 (lun 23-nov)**
      y II D90 (**mié 27-ene**) · capstone D89 (**mar 26-ene**) · caso 16 integral **D87 (vie 22-ene, ANTES del capstone — la inversión de v5.13 desaparece)** · Síntesis M5 D86 (jue 21-ene) · Síntesis M2 D38 (mié 11-nov); pre-tests de lunes 18.
      Actualizar cualquier doc o nota externa que cite los viejos. **La fecha es lo estable.** *(LIVIANO)*

---

## 🟡 ESTE MES (sep-oct)

### Research — envíos y gestiones (nadie más puede hacerlas)

Fechas releídas de `researchDailyPlan.ts` el 19-sep (v5.14: Research corre +2 hábiles más; mismo orden y mismos d#). El ciclo 1 arranca el mar 22-sep y termina el mié 17-feb-2027; pausa
4-ene → 29-ene por el Step 1 (último átomo antes de la pausa: X-7 mar 29-dic). ✅ v5.14: **CR-9 (SUBMIT del case report, lun 1-feb = d36) ya NO es la víspera del examen: es el D93 del Step 1 (primer día-Research tras la pausa)**; el mié 3-feb (D-1) es X-8 (re-arranque post-Step 1, d37) — ver ⚪ B (resuelta).

- [ ] **M2 · vie 2-oct (d5)** — registrarse en `https://risingscholars.net/accounts/register/` y publicar la solicitud de
      mentor (3 piezas: carta, tesis, case report; 3-4 h). **Regla escrita en MENTORES fila 2: si el lun 26-oct no hay
      mentor asignado → contratar editor profesional (US$200-400, RUTA §3.1)** que cubra las 3 piezas. Confirmar ambas reglas.
- [ ] **C-2 · mar 6-oct (d6) — elegir el artículo diana** en `CARTA_1/candidatos.md` §1 y **leer ESE DÍA con tu Chrome**
      las guías de autores (las automáticas devolvieron 403/402): **JAAD International Research Letter**
      (`jaadinternational.org/content/authorinfo` o ScienceDirect 26663287) e **IJD Correspondence** (Wiley 13654632) →
      copiar los límites reales (palabras, refs, figuras/tablas, abstract) con fecha en `TESIS_L0/research_letter_outline.md`
      §1 filas 1-2 (a más tardar en T-7, mié 25-nov). Actas y Anais ya están leídos en vivo (12-sep). Recomendación #4
      (JAAD `10.1016/j.jaad.2026.08.115`) si admiten "unpublished data"; si no, #1 (JCD `10.1111/jocd.71104`).
      > ⚠ **C-6 = SUBMIT de la carta el lun 26-oct (d13)**, contra un deadline interno del ≤15-oct: **11 días TARDE en v5.14** →
      > cerrar el paquete y hacer el SUBMIT el jue 15-oct fuera del átomo (C-5 formateo cae el jue 22-oct: habría que adelantarlo) o elegir en C-2 una fila
      > con ventana más larga (§9.1 de `RUTA_PUBLICACION_2027.md`). Sigue siendo decisión tuya.
- [ ] **T-1 · jue 8-oct (d7) — ética de la tesis** (el interno ≤ 30-sep queda 8 días atrás: si importa, presentar la solicitud el mié 30-sep, día de C-1): localizar el **nº y fecha del CEI** (`etica.md` 1.1) **o presentar
      ese mismo día** la solicitud de revisión expedita/retrospectiva en la FMH-UNCP u hospital (protocolo + modelos de
      consentimiento/asentimiento + oficio de la I.E. + resumen). **Gate 1 escrito en T-7/T-8: sin nº o constancia de
      exención, el envío T-8 (mar 1-dic) pasa a feb-2027.** Además: localizar los **PDF del modelo de consentimiento
      parental y del asentimiento** (los números ya constan: 1.256 matriculadas → 291 excluidas → 100 ausentes → 865
      evaluadas → 785 completas → 316 IGA≥1; falta el modelo y si el asentimiento fue escrito u oral).
- [ ] **M3 · lun 12-oct (d8)** — email a **Finlay**; antes verificar en la página del CADI de Cardiff el procedimiento de
      licencia (`technologytransfer@cardiff.ac.uk` según fragmento de búsqueda; la página no respondió) y su dirección.
- [ ] **R9 · mié 14-oct (d9)** — rellenar las columnas AMSTAR-2 y "hueco que deja" de las 5 SR/MA de `lines/L4-complicaciones.md`
      §6.1 (PMID 41249530 · 37178872 · 39214904 · 36574028 · 40406769, verificados) y marcar UNA salida (a/b/c) en §6.3 con
      fecha; **sin eso R6 (mié 28-oct) no fija el PICO**.
- [ ] **Mar 20-oct (d11)** — disparador del plan B del case report: si el Dr. Ciro no dio caso (~3 semanas desde M1, lun 28-sep), enviar el mensaje único de
      `caso_candidatos.md` §2 al colega SPD. **CR-1 (caso + consentimiento de publicación + senior author) = vie 30-oct (d15)**,
      el último hábil ANTES del 31-oct (margen 1 día), y **CR-2 = mar 3-nov (d16), ya DESPUÉS del 31-oct** (v5.14: la holgura se agotó; CR-1 debe dejar el consentimiento firmado ese mismo viernes).
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
- [ ] **T-7 · mié 25-nov (d24)** — antes de depositar el CSV de-identificado en OSF/Zenodo, revisar
      `DATA/RESEARCH/TESIS_L0/_deid/datos_tesis_acne_deid.csv` (865 filas, gitignored): que no quede ninguna columna
      cuasi-identificadora y el k-anonimato mínimo (combinaciones edad×grado con n=1 → agrupar edad en tramos); el DOI del
      depósito va en la frase de *data availability* de `DATOS_README.md` §6.

### USMLE — reservas y verificaciones externas

- [ ] **Free 120 en el Prometric de Lima (vie 22-ene-2027, D87)** — Palmerton §8.2: práctica en el mismo centro, 1-2
      semanas antes, registro con hasta 7 días de espera; costo **$155 internacional según el cuaderno (A VERIFICAR)**. Al
      agendar el examen para el jue 4-feb (🔴; el Free 120 sigue 13 días antes) verificar en `usmle.org` / `prometric.com` si Lima ofrece la práctica presencial y
      reservarla; si no existe, dejarlo escrito en README §3 para no volver a abrirlo. Hoy el overlay del Free 120 (D87 en v5.14) lo hace "en la
      interfaz oficial NBME" (en casa). Ligado a la decisión ⚪ #4 (maratón).
- [ ] **MyNBME · qué formas se COMPRAN y cuáles se hacen en Qbankly** (hallazgo #24, alto: afecta a 3 hitos y al GO/NO-GO):
      `DIAS.mat` dice `NBME 25 (Qbankly)` … `NBME 33 (Qbankly)` → % bruto sin curva oficial, sin reporte por sistema y sin
      garantía de vigencia; `HITOS_ONTRACK` compara ese % con umbrales pensados para el % *equated*. Confirmar en MyNBME
      qué formas CBSSA están activas en ene-2027 (el cuaderno describe 25-30; el plan asigna hasta la 33) y comprar como
      mínimo **31/32/33 + Free 120 oficial**; anotar "Qbankly = % bruto (sin curva)" donde toque.
- [ ] **A VERIFICAR del cierre pre-examen**: repasos Anki 200-300/día en las últimas 2 semanas (cifra del studio guide, no
      de transcripción) — sirve para dimensionar D94/D95 (mar 2-feb = D-2, última sesión de banco, y mié 3-feb = D-1 dentro del plan, `USMLE_TAPER`) y el fin de semana libre (sáb 30 / dom 31-ene, entre D92 y D93: solo Anki vencido).

### Derma — la sesión logueada que desbloquea tres cosas a la vez

- [ ] **Una sola sesión de ~20 min con tu Chrome adjunto a AccessDerma** (método en
      `DATA/DERMATOLOGIA/_scrape/README_TOC_PENDIENTE.md`) *(alto impacto)*:
      1. Extraer los **TOC con `sectionid`** de Fitzpatrick 9e (2570), Barnhill 4e (2802), Weinberg 5e (1913), Guidebook
         (2960) y dermatoscopia (2804, 2929) → hoy **20 átomos enlazan a la portada del libro** (sectionid verificado en 50/70).
      2. Leer el listado de `cases.aspx?groupid=1546` (título + área de los 200 casos) para **confirmar o corregir
         `dermaCasoArea()`** — el etiquetado Med 1-110 · Path 111-140 · Peds 141-170 · Surg 171-200 es una **suposición**:
         si el orden real no es por área, el mapa de fallos por módulo CORE del ledger, del Hub y de la pestaña Cerebro es ruido.
      3. Guardar los `sectionid` por pregunta del 2929 para que la "imagen dermatoscópica ciega" apunte a la pregunta N.
- [ ] **Anclaje First Aid en d12 (mié 21-oct, SJS/TEN/DRESS) y d24 (mar 24-nov, melanoma) — fechas v5.14 de `dermaDailyPlan.ts` (Derma corre +1 slot: d1 lun 21-sep)**: la sección/página no consta
      en el repo → abrir el ejemplar y sustituir 'A VERIFICAR (12-sep)' en `anclajeStep1` (`dermaDailyPlan.ts`); hasta
      entonces el chip «cuenta doble Step 1» de HOY muestra ese texto tal cual.
- [ ] **Verificar DeLorenzi 2017** (ASJ, PMID 28333326; acceso OUP/UF) — UI de hialuronidasa por "área" (~450 y ~900 UI
      del SPEC §2.4) y criterio de parada de los pulsos. Hasta entonces el drill y la ficha X-19 los muestran como A
      VERIFICAR: **no fijar esas cifras en Anki**. Deadline: drill de oclusión **d19 = mar 10-nov** (v5.14).
- [ ] **NotebookLM «DERMA · Élite Engine»**: las 7 fuentes fallidas «Checking your browser - reCAPTCHA» SIGUEN en el
      cuaderno el 13-sep (86 = 79 útiles + 7). Borrarlas a mano en la UI (el agente no borra datos); sus equivalentes PubMed
      ya están cargados. No cargar PMC ni NCBI Bookshelf.
- [ ] **Asignar el deck `APEX::LIVIANO`** en `src/lib/ankiLinks.ts` (grep el 13-sep: 0 menciones) y, si lo quieres, la
      entrada "Academia → Logística F5" en `EmpresaHub.tsx`. *(LIVIANO — asignar a un agente)*
- [ ] **Crear la carpeta `DATA/BUSINESS/_kpi/`** (no existe) y guardar ahí el JSON del botón "Exportar JSON" del Cockpit F1. *(LIVIANO)*

### LIVIANO · Acceso Perú — las verificaciones DIGEMID

*Átomos D38-D44 (**11 → 19-nov**, fechas releídas el 19-sep, v5.14: D38 mié 11-nov = síntesis M2/protocolo, D39 jue 12-nov, D41-D44 lun 16 → jue 19-nov; caso 8 el vie 13-nov = D40 y caso 9 el vie 20-nov = D45). Cierran los 2 pendientes ROJOS desde junio ("Legalidad DIGEMID"
y "Cotización Sterilelabs") y de ellos depende el COGS y el value stack. Regla anti-alucinación: si un dato no aparece, se
escribe `SIN REGISTRO HALLADO (fecha)`.*

- [ ] **D38 · mié 11-nov — Rellenar `LIVIANO_PROTOCOLO_CLINICO_v1.md` §2**: criterio numérico de elegibilidad (Obesity
      Algorithm 2026), panel de labs basales y cadencia, esquema de dosis/intervalos/lavado **solo desde la ficha técnica
      del producto registrado**, definición operativa de "falla a farmacoterapia".
- [ ] **D39 · jue 12-nov — Registro sanitario DIGEMID**: portal público (URL sin verificar), captura fechada de semaglutida
      SC/oral y tirzepatida → columna `registro` de `LIVIANO_ACCESO_PERU` (`empresaData.ts`).
- [ ] **D41 · lun 16-nov — Condición de venta por molécula** → columna `condicion` + flujo receta → farmacia → paciente.
- [ ] **D42 · mar 17-nov — 2 cotizaciones escritas y fechadas** (cadena + independiente) → `precioFarmacia`; recalcular
      el "medicamento 3 m = S/ 3,600" del value stack.
- [ ] **D43 · mié 18-nov — Dictamen de legalidad del magistral** (QF + abogado de salud: **nombres a definir**) +
      cotización Sterilelabs con certificado de análisis por lote → `costoLiviano`, KPI COGS, estado "VERIFICADO".
- [ ] **D44 · jue 19-nov — Tiempo fuera de refrigeración** por producto (ficha técnica) → guion de cadena de frío (v5.14: el vie 13-nov, D40, es el caso 8 y el caso 9 «lo consigo más barato en una web» sigue el vie 20-nov, D45).

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
      (1) `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-05 <fecha>` (o `2027-02-08 <fecha>`; v5.14: el default es `--base 2026-09-21`, offset 92; el día 93 = **lun 1-feb = D93 del Step 1**, el mié 3-feb (día 95) = **D-1** y el jue 4-feb (día 96) = **examen** → propuesta D1 de la intensiva = **vie 5-feb (= día del pre-test 2026-II, día 97) o lun 8-feb (día 98)**; ver ⚪ A; pasar `--base` solo si el D1 del mantenimiento vuelve a moverse) →
      revisar → `execute_sql` + actualizar `study_metrics.exam_date` y `dias_a_examen` (quedó en 205 sin recalcular) +
      Calendar a mano; **NO aplicar el SQL antes**; (2) escribir la fecha en **`DERMA_TAPER_ENCAPS_FECHA`**
      (`src/lib/dermaDailyPlan.ts`, YYYY-MM-DD) para que las sesiones Derma a ±3 hábiles pasen a taper 'encaps' (v5.14: si cae
      en la semana del 22-26 mar, los candidatos son d65-d67: peelings II, láser I-II; en la del 29-mar → 2-abr, d68-d69: láser III-IV; d70 lun 5-abr = microneedling); hasta entonces la pestaña
      Cerebro muestra «hoy null · A VERIFICAR (13-sep)». *(ENCAPS/Derma)*
- [ ] **🎯 DISPARADOR · Resultado del UWSA1 (lun 21-sep).** Si sale **<40 %** → bajar **D2-D10 a 20 Q/día** (protocolo
      Jay; `qDia` en `gen_usmle_v5.js` + regenerar). Lectura por tramos (Palmerton §9.3, +5 %/mes hasta el 15-ene):
      **<40 %** → protocolo Jay · **40-48 %** → llega justo a 65-68 % · **≥48 %** → on-track. La app hoy dice "baseline:
      cualquier valor sirve" y no muestra los tramos (hallazgo #12): **el baseline del 21-sep, no el GO/NO-GO del 15-ene,
      es el verdadero Goldilocks check**. *(USMLE — decisión ⚪ #8)*
- [ ] **Protocolo de burnout (REGLA ya en la app y en README §3b):** la señal numérica (2 hitos consecutivos bajo su
      mínimo on-track → `gateHito` 'ALERTA BURNOUT' + banner) la da la app; **los síntomas los decides tú** (releer sin
      comprender, irritabilidad, indiferencia, descansos que se alargan). Si se activa: 3-5 días solo Anki AM y correr el
      plan con `remap_inicio.js` (cada día parado = +1 hábil; no se recorta temario). *(USMLE)*
- [ ] **Antes del 1-feb-2027 · extender las series del Calendar con `UNTIL=20270130`** — ⚠ v5.14: el D93 es el lun 1-feb, el D95 el mié 3-feb y el examen el jue 4-feb, así que el `UNTIL` ya no cubre ni D93-D95, ni el examen, ni la intensiva: extender a `20270204` (o más) — son **7 series**, no 2
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
- [ ] **Antes del d19 (mar 10-nov) · importar `DATA/DERMATOLOGIA/ANKI_COLA/PLANTILLA_SESION.txt`** en Anki (notetype Basic);
      a partir de ahí copiar la plantilla por sesión (`SESION_dNN_<fecha>.txt`). *(Derma)*
- [ ] **Antes del d45 (lun 25-ene-2027) · decidir y comprar el dermatoscopio de bolsillo** (DermLite o Heine; modelo y
      precio A VERIFICAR en sus webs oficiales) para la fase práctica 2027. *(Derma)*
- [ ] **Jue 4-feb-2027 (= DÍA DEL EXAMEN Step 1 en v5.14) · sesión Derma OPCIONAL (d49, segunda pasada parcial III)**: decidir si la
      haces al volver del Prometric o la saltas (o el swap d43↔taper de ⚪ C); no se pierde contenido en ningún caso. El mar 2-feb (D94 del Step 1, última sesión de banco) es d48 (parcial II, 1 caso + FSRS); el mié 3-feb (D-1) no es día Derma (es Research: X-8). *(Derma)*
- [ ] **Desde el lun 8-feb-2027 (d50, v5.14) · confirmar en la app que 3 casos/sesión caben en los 45′** con los 10Q como
      variable de ajuste; si no, la alternativa documentada es 2 casos + alargar el ciclo 2 (d74-d103, jue 15-abr → mar 6-jul; sin
      fusionar nada). *(Derma)*
- [ ] **Cotejar las cifras "A VERIFICAR" de las 35 fichas del cerebro clínico** contra el capítulo de AccessDerma citado en
      cada una antes de recitarlas como definitivas: dosis de apraclonidina, % de TCA, mm de microneedling, λ por tinta,
      márgenes de Mohs y de melanoma. *(Derma)*
- [ ] **Vie 29-ene-2027 (última A-unit SYNAPSE, d131 · v5.14) · página oficial de la certificación CCA-F**: no aparece enlazada en
      academy.claude.com ni en anthropic.skilljar.com (12-sep) → localizarla, anotar formato/precio/fecha y decidir la fecha
      post-Step 1 (feb-2027). *(SYNAPSE)*
- [ ] **Post-D89 (mar 26-ene-2027, capstone; v5.14) · revisión por par del protocolo LIVIANO** por un médico con experiencia en
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
- [ ] **Feb-2027 · pool MIR se agota**: 57 días × 25-30Q ≈ 1.400 > 1.025 usables → hacia mediados de febrero Cardio/Gastro
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

### USMLE · decisión del corrimiento v5.12 (15-sep), re-fechada en v5.13 (16-sep) y v5.14 (19-sep) — el examen sigue fuera de la ventana

| # | Decisión | Hoy corre así |
|---|---|---|
| 0 | **El plan de 95 días desborda la ventana 25-29 ene: D95 = mié 3-feb-2027 = D-1 DENTRO del plan → target JUE 4-FEB-2027.** Con D1 en lunes el D94 (mar 2-feb) es la última sesión de banco, el sáb 30 y el dom 31-ene quedan libres entre D92 y D93 (solo Anki vencido) y el mié 3-feb es una sesión mínima por la mañana + ritual de test-day (Palmerton: D-1 sin banco). Opciones: **(a)** aceptar el jue 4-feb: agendar/reprogramar en Prometric y **confirmar que el eligibility period cubre el 4-feb** (si no, pedir extensión a ECFMG, con costo) — es lo que hace el plan (`DAILY_META.examenTarget = 2027-02-04`, `descansoD1 = 2027-02-03`); **(b)** rendir dentro de la ventana (≤ vie 29-ene) recortando el sprint final (D93-D95 o los días de banco del sprint) — va contra tu regla de no recortar; **(c)** estudiar sábados para recuperar días y volver a la ventana (también contra el régimen L-V). **Cada día más sin estudiar mueve el examen otro hábil (vie 5-feb, lun 8-feb…) y arrastra la intensiva ENCAPS, el pitch AURUM v5 y el taper Derma.** | (a) · examen jue 4-feb · D94 mar 2-feb = D-2 (última sesión de banco) · D95 mié 3-feb = D-1 dentro del plan (`USMLE_TAPER.d94` / `d95` / `dMenos1` / `examen`) |
| 0-bis | **NUEVO v5.14: el contenido cierra el jue 14-ene (D81, Bioquímica día doble) y el NBME 31 GO/NO-GO se rinde AL DÍA SIGUIENTE (vie 15-ene, D82) sin ningún día de banco de consolidación entre medias** (en v5.13 había uno; los 2 random timed 2×40Q de la Fase B pasan a D84 mar 19 y D86 jue 21-ene, DESPUÉS del NBME 31, y la Fase B queda D82-D86 con los 3 NBME dentro: 32 lun 18, 33 mié 20). Opciones: **(a)** aceptar — el NBME 31 mide el estado real al cierre de contenido y la regla del GO ya exige «2 NBME ≥68 %», así que el 32 (lun 18) y el 33 (mié 20) confirman o revierten; **(b)** trasladar la decisión formal GO/NO-GO al NBME 32 (lun 18-ene, D83) — tampoco gana días de banco (D83 es el hábil siguiente) pero deja el 31 como medición; **(c)** cualquier día perdido desde hoy lo agrava (mueve el examen, no el hueco). | (a) · GO/NO-GO en el NBME 31 (`usmleStep1Daily.ts` D82, `HITOS_ONTRACK`) |

### Consecuencias del corrimiento v5.14 en los frentes secundarios (19-sep) — decisiones nuevas y resueltas

| # | Decisión | Hoy corre así |
|---|---|---|
| A | **ENCAPS · la fase intensiva arrancaría en el día 93 de la cuenta de la app = lun 1-feb = D93 del Step 1 (última semana de banco), el mié 3-feb (día 95) es el D-1 y el jue 4-feb (día 96) el examen** (`FASE_INTENSIVA_2027-I.md`). Propuesta: **arrancarla el vie 5-feb (= día del pre-test 2026-II, día 97) o el lun 8-feb (día 98)** (`node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-05 <fecha-examen>` o `… 2027-02-08 …`; los días 93-96 quedan sin fila). **A VERIFICAR (19-sep):** qué hace el script con el slot `senales` del lunes cuando el D1 cae en viernes (semana 1 = solo el 5-feb; con el lun 8-feb la semana 1 es completa). | SQL de la intensiva NO aplicado (ensayo del 8-sep en disco, base vieja); default documentado en `FASE_INTENSIVA_2027-I.md` = vie 5-feb; nada que ejecutar hasta la convocatoria SERUMS |
| B | ~~Research · CR-9 (SUBMIT del case report #1) cae el lun 1-feb = D95 = D-1 del Step 1~~ **RESUELTA por v5.14 (19-sep):** CR-9 sigue el lun 1-feb (`RESEARCH_HITOS`, d36), que ahora es el **D93** del Step 1 (primer día-Research tras la pausa 4→29-ene): ya no es la víspera del examen. Resto menor: **X-8 (re-arranque post-Step 1, d37) cae el mié 3-feb = D-1** → hacerlo dentro de las ≤2 h de la mañana o saltarlo (no es un submit). | CR-9 lun 1-feb; overlay 🔬 re-fechado hoy por otro agente (A VERIFICAR 19-sep con `get_event`) |
| C | **Derma · el vie 15-ene (NBME 31, GO/NO-GO) es d42 (colgajos e injertos, sesión normal) y el mar 19-ene es d43 = Mohs, sesión NORMAL de 2 casos; el jue 4-feb (DÍA DEL EXAMEN) es d49 = última sesión del taper (opcional)** (el taper es posicional d44-d49 y con d1 = lun 21-sep va del jue 21-ene —día tras el NBME 33— al jue 4-feb). Alternativa: swap d43↔taper (Mohs al jue 4-feb —tras el examen— y el mar 19-ene en modo taper de 1 caso + FSRS). | d43 normal · taper 21-ene → 4-feb (`DERMA_DAILY_META.taperStep1`) · d49 opcional |
| D | ~~LIVIANO · el caso integral 16/16 cae DESPUÉS del capstone~~ **RESUELTA por v5.14 (19-sep):** con D1 en lunes el plan tiene exactamente 16 viernes (caso 1 = vie 25-sep, D5) y el generador ya no salta ninguno: caso 16 integral = **D87 vie 22-ene**, capstone = **D89 mar 26-ene**, trimestral II = D90 mié 27-ene. Nada que decidir. | `livianoStudyPlan.ts` |
| E | **SYNAPSE · la última A-unit cae el vie 29-ene (d131), D92 del Step 1 (viernes de la última semana de banco)** — ver la fila SYNAPSE de abajo (mantener o adelantar). | vie 29-ene |
| F | **AURUM · el PITCH v5 (d95) cae el mié 3-feb = D95 = D-1 del Step 1 (víspera del examen)** — ver la fila AURUM de abajo. | mié 3-feb |
| G | **MIR · el mié 3-feb (D-1) es D17 del mantenimiento en modo reducido (10Q) y el jue 4-feb (EXAMEN) es D18, primer día en modo normal (25Q: 15Q Gastro + 10Q Tier C express)** — ver la fila MIR de abajo (reducido o vacío ese día). | reducido el 3-feb · normal el 4-feb |
| H | **Vibecoding · S6 (26-30 oct) es la semana deload post-NBME 26 (vie 23-oct), pero el flag `deload` lo lleva S7 (2-6 nov, motor de preguntas ENCAPS)**: con D1 en lunes los 12 bloques del catálogo coinciden con las semanas de calendario (S1 = 21-25 sep … S12 = 7-11 dic, deload post-NBME 28) y la deriva de 3 días de v5.13 desapareció, así que el desfase pasa a ser una semana entera. Opciones: swap S6↔S7 en `DATA/SYNAPSE/vibecoding_proyectos.json` (RLS `datos_tesis` pasaría a la semana del 2-nov) o mover el flag a S6 (`gen_vibecoding_plan.js` + `gen_synapse_plan.js`). | flag en S7 (catálogo, `vibecodingPlan.ts`) · `PROTOCOLO_MODO_MINIMO.md` §4 |

### USMLE · divergencias Palmerton §E que siguen abiertas (las #2, #5 y #7 ya están implementadas)

| # | Decisión | Hoy corre así |
|---|---|---|
| 1 | **Consolidación 11:00 a 20Q permanentes** si en S2-S3 la revisión metodológica no cabe en 60 min (Palmerton §3.4: 10Q + revisión = 60 min). Decidir tras S1-S2 | 30Q (10 pre-test + 20 consolidación) en nivel 1; 40Q desde nivel 2 |
| 3 | **Reformular el GO/NO-GO para que el UWSA2 sea solo informativo** (el UWSA sobreestima; la fecha la decide el NBME). `HITOS_ONTRACK` ya lo trata como 'low risk · solo resistencia'; falta la frase del GO | "2 NBME ≥68 % + UWSA2 low risk" |
| 4 | **Free 120 en Prometric Lima + maratón de resistencia** (Palmerton §8.1 #4: un simulacro más largo que el examen). Única ventana sin tocar franjas: **D85, mié 20-ene** (v5.14; NBME 33 + 3 bloques de *flagged* ≈ 5 h) cediendo Research/Derma/AURUM ese día; `POR_MATERIA` §E dice "un viernes" (todos son hitos) → corregirlo al decidir | Solo el Free 120 en D87 (vie 22-ene), en casa |
| 6 | **Mover la eval timed 18:00-18:45 a 12:00-12:45** ("estudiar cansado = 2-4× más lento"; solaparía SYNAPSE 12:30) | 18:00-18:45 |
| 8 | **Si el UWSA1 (lun 21-sep) sale <40 % → D2-D10 a 20Q/día** (tipo Jay). Se decide ese mismo lunes con el % real | Sin regla activa |
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
      colchón consumido desde el 31-ago son **15 días hábiles** (v5.14) — el examen ya salió de la ventana. *(USMLE)*
- [ ] **🔴 EL COLCHÓN SE ROMPIÓ (v5.12, 15-sep; v5.13 y v5.14 lo empeoran un hábil cada una): el examen ya está FUERA de la ventana 25-29 ene (target jue 4-feb) y no hay ningún día de reserva.** Un día más sin
      estudiar mueve el examen al vie 5-feb (y así sucesivamente: cada corrimiento = reprogramar Prometric otra vez, si el eligibility period lo permite) o obliga a
      (a) **recortar temario** (rompe la regla) o (b) **estudiar un sábado** para absorber el día. Decidir la regla ANTES de que ocurra; y desde ya: **agendar
      Prometric para el jue 4-feb + confirmar eligibility** (🔴). *(USMLE — bloqueante)*
- [x] ~~**Decisión (v5.11): el D95 = jue 28-ene ya no es descanso puro sino sesión mínima (D-1 dentro del plan).**~~ **SUPERSEDIDA por v5.12 (15-sep) y REPUESTA por v5.13 (16-sep):** con D1 en jueves el D95 vuelve a ser el D-1 DENTRO del plan (lun 1-feb: sesión mínima AM ≤2 h + ritual de test-day, `USMLE_TAPER.d95`/`dMenos1`), el D94 (vie 29-ene) es la última sesión de banco (`USMLE_TAPER.d94`) y el sáb 30 / dom 31 quedan libres (solo Anki vencido). **v5.14 (19-sep) conserva la estructura con D1 en lunes: D94 mar 2-feb = última sesión de banco, D95 mié 3-feb = D-1 dentro del plan, finde 30-31 ene libre entre D92 y D93.** Lo que hay que confirmar ahora es la fila 0 (examen jue 4-feb). *(USMLE)*
- [ ] **SYNAPSE · la última A-unit (d131, cierre F2 + CCA-F) cae el VIERNES 29-ene-2027** (v5.14: con D1 en lunes las 19 semanas del motor coinciden con las de calendario y la última termina en viernes = D92 del Step 1, viernes de la última semana de banco; v5.13: mar 26-ene; v5.12: lun 25-ene; v5.11: sáb 23-ene; v5.10: vie 22-ene). Decidir si se mantiene (15' un viernes de sprint, el día de AMBOSS 200 mitad 1) o se adelanta (regenerar con `gen_synapse_plan.js` cambiando el cierre). El texto de esa A-unit ya dice «CIERRE F2 (último día del motor, vie 29-ene en v5.14)». *(SYNAPSE)*
- [ ] **Puente MIR ↔ Step 1** — Cardiología MIR (D5, **vie 25-sep**) precede a Cardiovascular Step 1 (D6, **lun 28-sep**)
      por 1 hábil; Psiquiatría MIR arranca el **mar 5-ene** (D74) y *Psychiatry & Behavioral* el **mié 6-ene** (D75) — 1 hábil de ventaja (v5.14). Los otros 9 bloques
      quedan entre +7 y +12 días. **Recomendación escrita: NO re-permutar el MIR.** El chip «MIR precedió esta semana» del
      repaso 07:15 ya está en la app. *(USMLE/MIR)*
- [ ] **Materias sin columna vertebral en el corpus Palmerton — decidir la fuente sustituta** *(USMLE)*:
      - **13 días completos**: Micro/ID (D58-D64, **mié 9 → jue 17-dic**, justo tras el NBME 28 del vie 4-dic; el vie 11-dic = D60 es el único viernes de nivel 4), MSK/Reuma+Derma (D71, D73-D74:
        **mar 29-dic, lun 4 y mar 5-ene**; el dermato Step 1 va en D74 mar 5-ene; el NBME 30 del mié 30-dic es D72) y Psiquiatría (D75, D76 y D78: **mié 6, jue 7 y lun 11-ene**; el UWSA2 del vie 8-ene es D77) — D# v5.14. Propuesta: **subir el peso del pre-test 10Q de las
        08:15 como FUENTE** y de la *shopping list*; no buscar "el vídeo de Palmerton".
      - **Cardio D8 (mié 30-sep, curvas PV/Wiggers/Starling) y D16 (lun 12-oct, valvulopatías y soplos — cae DESPUÉS del
        NBME 25 del vie 2-oct y del viernes nivel 3 de Cardio, D15 vie 9-oct)**: PV loops, Frank-Starling con retorno venoso, Laplace, maniobras de soplos, S2 y Jones
        **CONFIRMADOS AUSENTES**. ¿Costanzo, B&B o First Aid? Decidir **antes de esa mañana**.
      - **Bioestadística (D79, mar 12-ene-2027)**: el corpus cubre la mitad conceptual pero **no la de cálculo** → repartir
        vídeo+AMBOSS / paquete de stats de UWorld.

### Resto de secciones

- [ ] **ENCAPS · convergencia registro ↔ Supabase**: hoy cada cierre de la app se lleva al registro a mano («⎘ línea
      --cerrar»). El `--pull` propuesto (leer `study_progress` fuente `app:cierre` y reconstruir rondas v3 en
      `_registro_resoluciones.json`) **no existe**: ¿se pide al dueño de `gen_encaps_semana.js` (próxima pasada) o se
      mantiene el botón? `errores_por_tipo` ya trae la ronda v3 completa, es trivial.
- [x] ~~**ENCAPS · el pre-test de arranque volvió a 39/40 reales en v5.12**~~ **RESUELTO en v5.13 (16-sep) y re-verificado en v5.14 (19-sep):** regenerado como `pretest_arranque_2026-09-21.json` (parte 1, lun 21) y `…_2026-09-22.json` (parte 2, mar 22), `_meta.conteos` da **20/20 reales con clave oficial en cada parte, 0 nuevos** (40/40). Nada que decidir. *(ENCAPS)*
- [ ] **ENCAPS · ¿se aplica el override semanal** que propone `gen_encaps_semana.js`? No es automático: revisar el SQL y
      ejecutarlo por `execute_sql`. En las semanas con 4 slots CRÍTICA un tema caliente **solo desplaza a un crítico ya
      dominado** (≥85 %, n≥5); I-3/V-2 intocables; máx. 2 sustituciones. *(decisión semanal, viernes 17:00)*
- [ ] **MIR · el acumulado <50 % pone el tema en 'caliente' pero NO cuenta como evento de fallo** (solo quiz <60 % y slot de
      ancla ✗ suman para el "ajuste obligatorio al 2.º fallo"). Si prefieres que sí cuente, son 2 líneas en `mirTemaEstado`.
- [ ] **MIR · modo "reducido" de enero** — leído de `mirMantenimiento.ts` el 19-sep (v5.14): mantenimiento **57 días, mar 12-ene →
      mié 31-mar-2027** (arranca el mar 12 para no pisar el D78 del lun 11-ene; el fin está clavado al ENCAPS y pierde otros dos slots lun-jue: **46 slots lun-jue + 11 viernes**), `modoReducidoHasta = 2027-02-03` (**17 días** reducidos = solo Anki + 10Q mixtas, hasta el mié 3-feb = D-1 inclusive; 12 jueves con
      Tier C express en las semanas 1-12, el primero jue 14-ene = D3, Traumatología · miembro inferior). Si prefieres el bloque completo también en enero, hay que regenerar con esa constante cambiada
      (`gen_mir_mantenimiento.js`). ⚠ El **jue 4-feb (examen Step 1)** es el D18 y el primer día en modo normal (25Q: 15Q Gastroenterología + 10Q Tier C express):
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
      feb-2027"; el plan fija **T-8 = mar 1-dic-2026** (v5.14) con el gate CEI + inglés (si falla, cascada a feb-2027 automática).
      Decidir cuál prevalece; si es feb-2027, es 1 línea en el script + regenerar. *(Research)*
- [ ] **AURUM · política de semanas** (leído de `aurumDailyPlan.ts` el 19-sep, v5.14: D1 lun 21-sep → D130 mié 24-mar-2027): las 16
      variantes LIVIANO caen en VIERNES del d40 al d65 (13-nov → 18-dic), el d70 en LUNES 28-dic (deriva por el 25-dic) y en MIÉRCOLES desde el d75 (6-ene … d115 3-mar) — 10 fuera de viernes; PITCH 1-3 en viernes (d15 9-oct · d35 6-nov · d55 4-dic = día del NBME 28),
      PITCH 4-7 en miércoles (d75 6-ene · d95 3-feb · d115 3-mar · d130 24-mar). Se respeta "1 de cada 5 drills". Si quieres viernes
      estrictos, cambiar la política en `gen_aurum_plan.js` (saltar feriados sin desplazar la semana). ⚠ El PITCH v5 (d95) cae el **mié 3-feb = D95 = D-1 del Step 1, la víspera del examen** (v5.13: lun 1-feb; v5.12: vie 29-ene): decidir si se adelanta (mar 2-feb o vie 29-ene) o se graba después del examen (vie 5-feb). *(AURUM)*
- [ ] **Business · los 2 últimos OUTPUT** caen lun 18-ene (S16, cierre, D120) y mar 19-ene-2027 (extra, retro
      del formato L; D121 = último día) porque las lecturas se agotan antes (v5.14: el OUTPUT S15 sí cae en viernes, 15-ene = D117, tras 3 colchones META lun 12 → jue 14-ene; 121 filas = 84 trabajo + 37 descansos). Si quieres S16 en viernes, añadir
      lecturas META en `plan_pulso_v3_L.json` (el plan lo regenera `gen_business_plan.py`, ya integrado en el remap). *(Business)*
- [ ] **LIVIANO · posición de los drills de cifras** (v5.14: D37 mar 10-nov · D58 mié 9-dic · D75 mié 6-ene · D88 lun 25-ene); el
      análisis pedía D38/D58/D75 (D58 y D75 coinciden; D38 es la Síntesis M2, mié 11-nov). Si prefieres D38 exacto, mover
      `drill: true` en `liviano_curriculum.json` y regenerar. *(LIVIANO — menor)*
- [ ] **Calendar · 6 decisiones personales** (no se cambian horas sin tu OK) *(sistema)*: (a) reponer o no el NAP
      13:15-13:30 (hoy la LECTURA 13:00 ya define una **siesta OPCIONAL ≤20' solo en ÁMBAR**); (b) typo "ALUMUERZO"
      (`summary`); (c) `<br>` escapados en SYNAPSE 12:30 y PC sáb/dom (se conservaron a propósito); (d) la frase de identidad
      de examen ya está en EKER (frase 6) → ¿basta?; (e) **martes**: ALISTARSE 18:30 recorta 15′ a la Eval 18:00-18:45 →
      ¿cerrar la eval a las 18:30 o mover ALISTARSE?; (f) GYM/BAILE del mar 2-feb (D94) y del mié 3-feb (D-1) previos al examen del jue 4-feb, y del finde libre 30-31 ene (ver 🟠 Calendar 1).
- [ ] **Renombrar `DATA/ENCAPS/CALENDAR_SEGMENTOS_V5_6.md` → `_V5_14.md`?** El contenido va por v5.10-v5.14 (12-19 sep), el nombre
      no. Si se renombra, actualizar **en el mismo movimiento** las 8 descripciones del Calendar que lo citan por ruta,
      `CALENDAR_SEGMENTOS_LUNES_VIERNES.md` y la memoria. *(sistema)*
- [ ] **Confirmar que es intencional**: NBME 32 (**lun 18-ene**), NBME 33 (**mié 20-ene**) y Free 120 (**vie 22-ene**) no
      caen todos en viernes, pese a que §0 del doc dice "los hitos van en viernes" (la v5.6 tenía las mismas fechas); el
      UWSA1 en lunes (21-sep, = D1) es deliberado. *(USMLE/sistema)*

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
  tabla baseline de D78 · ~~§6 dice "63 días, default 4-ene"~~ **RESUELTO 14-sep, re-fechado 16-sep**: §6 ya dice 59 días desde el vie 8-ene (17 reducidos, 12 Tier C en jueves), como el `.ts` v5.13
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
  proyecto deload es S7 = motor de preguntas ENCAPS", y en v5.11 corría mar 27-oct → lun 2-nov; en v5.12 mié 28-oct → mar 3-nov; en v5.13 corre **jue 29-oct → mié 4-nov** (tres días por detrás de la semana deload 26-30 oct, como en el catálogo y en `vibecodingPlan.ts`; la fila re-fechada el 16-sep).
- **Derma keyed por `d` viejo**: `dermaCerebro.ts` sigue keyed por `d` de la v2.1 en 22 fichas (la UI lo resuelve con
  `dermaDNuevo` + sentinela `G-44-cicatrizacion` d=50; si se re-ancla a la v3 la UI cae sola a búsqueda exacta); su
  `DERMA_DRILL_DIAS = [19,20,46,70]` ya no lo usa nadie (se usa `dia.drillHDPH`); `dermaLedger.ts` línea 225 conserva el
  comentario "2ª pasada FSRS (d69)"; `obsidianDermaMap.ts` + `build_vault_derma.js` (carpetas d44-d70 viejas del vault:
  renombrar o dejar como histórico).
- **`CALENDAR_SEGMENTOS_V5_6.md` §6.2/§11.2** aún listan PC sáb/dom, 🧠 IA 04:15 y misión 12:30 como "sin tocar" — los 4
  los actualizó `vibecoding` el 13-sep (solo `description`); y §6.1 sigue diciendo "Derma 70 sesiones → mar 30-mar" y
  "mantenimiento MIR 63 días / 18 reducidos" cuando los `.ts` dicen **Derma 73 → vie 9-abr (+ ciclo 2 d74-d103 13-abr → 2-jul)** y **MIR
  59 / 17 (vie 8-ene → mié 31-mar, v5.13)** (releído con node el 16-sep).
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
  `SEMANAS/overrides_acumulado.json`. **No re-ejecutar** `_encaps_mantenimiento_2027.sql` (bk_0919 existe: es correcto que aborte; bk_0916/0915/… siguen intactos).
- **Pool MIR**: la clasificación se corrige en `_clasificacion_llm/AAAA.json` y se regenera; **nunca se edita
  `mirPreguntasOficiales.ts` ni el raw a mano**. Anti-repetición por `qIds` en `mir_eval_log` (`POOL_USO.md`).
- **NotebookLM es motor de verificación, no fuente**: toda dosis o cifra que devuelva queda "A VERIFICAR" hasta cotejarla
  contra la primaria. Ya se detectaron **4 errores suyos** en el corpus Palmerton y **1 probable fichero inventado**
  (`sistema-respiratorio-yousmle.md`).
- **Taper Derma es POSICIONAL (d44-d49; v5.14: jue 21-ene → jue 4-feb, d49 = día del examen)**: si un futuro corrimiento mueve el D1, comprobar con
  `dermaVentanaTaper('2027-02-04')` qué d caen en la ventana y repetir el swap si cambian (el remap avisa).
- **Generadores idempotentes**: `remap_inicio.js 2026-09-14` ×2 + los 9 generadores → `git diff` vacío (comprobado el
  13-sep con v5.10; en v5.11 el orquestador corrió `2026-09-15`, en v5.12 `2026-09-16`, en v5.13 `2026-09-17` y en v5.14 `2026-09-21` — **A VERIFICAR (19-sep)** la idempotencia con una segunda pasada). Si un `git diff` aparece tras correrlos, algo cambió de verdad: no lo pises.
- ~~**Cabeceras de comentario desfasadas en `src/lib`**~~ **RESUELTO en v5.13 y re-verificado en v5.14 (19-sep, grep):** `mirDailyPlan.ts` línea 3 ya dice "v5.14 · D1 = lun 2026-09-21 → D78 lun 2027-01-11" y la nota Derma d48 dice "mar 2-feb = D94, última sesión de banco del Step 1; mié 3-feb = D95 = D-1" (taper: "examen jue 4-feb"). *(sistema)*
