# PENDIENTES DE JOSEPH · régimen v5.16

**Generado:** 08-sep-2026 · **re-fechado a v5.10 el 12-sep** · **consolidado tras la SEGUNDA CAPA el dom 13-sep-2026** · **re-fechado a v5.11 el lun 14-sep** · **re-fechado a v5.12 el mar 15-sep** · **re-fechado a v5.13 el mié 16-sep** · **re-fechado a v5.14 el sáb 19-sep** · **re-fechado a v5.15 el mar 22-sep** · **re-fechado a v5.16 el sáb 26-sep** · **D1 = LUNES 28-SEP-2026 · EXAMEN STEP 1 TARGET JUE 11-FEB-2027**

> ⚠ **El régimen vigente es v5.16 desde el 28-sep-2026.** Es el **decimoquinto corrimiento** (el mié 23, el jue 24 y el vie 25-sep
> tampoco se estudiaron: **20 hábiles perdidos** desde el 31-ago). Instrucción literal de Joseph en este: *«TODO A PARTIR DEL LUNES 28»* y
> *«todo inicia el 28, corre los días que tengas que correr al final ya sea MIR, USMLE o ENCAPS y el resto también; lo que haga falta,
> apertura días si falta más simulacros»*. Es el **2.º corrimiento RÍGIDO** (misma regla que v5.15):
> 1. **Ni un tema ni un subtema se toca** — no se fusiona ni se recorta nada. Verificado con el multiset (system|sub) del plan
>    Step 1 contra v5.15: **dif 0** (95 días, 5560Q, 73/73 filas de contenido, 0 fines de semana).
> 2. **Los 12 hitos NBME/UWSA no están clavados por fecha**: corren con el plan y conservan su **D# exacto**
>    (D1 · 10 · 25 · 40 · 55 · 65 · 72 · 77 · 82 · 83 · 85 · 87), así **ningún NBME pierde días de preparación por delante**.
>    Efecto visible en v5.16: con el D1 en lunes **8 de los 12 hitos vuelven a caer en viernes**.
> 3. **Donde un plan tenía el final clavado, se AMPLÍAN días** en vez de perder sesiones: ENCAPS 92 días hasta el **vie 5-feb**
>    (v5.15: mar 2-feb) y MIR mantenimiento 57 días hasta el **mié 7-abr** (v5.15: vie 2-abr).
>
> **CONSECUENCIA: el plan Step 1 de 95 días termina el MIÉ 10-FEB-2027 (D95 = último día del plan y D-1 REAL: sesión mínima AM + ritual de test-day,
> `USMLE_TAPER.d95`/`dMenos1`) → examen target JUE 11-FEB-2027**, al día siguiente (`DAILY_META.examenTarget = 2027-02-11`, `descansoD1 = 2027-02-10`); el
> **mar 9-feb (D94)** es la última sesión de banco y **ya NO hay fin de semana libre entre el D95 y el examen** (el sáb 6 y el dom 7-feb quedan dentro del
> plan, entre D92 y D93). **Tienes que agendar/reprogramar el Prometric al jue 11-feb y confirmar que tu eligibility period lo cubre** (si no: extenderlo,
> o decidir recortar temario — ver ⚪ fila 0 y 🔴). Franjas y metas **no se movieron**.
> **Los 12 hitos v5.16:** UWSA1 **lun 28-sep (D1, 09:00-13:00)** · NBME 25 **vie 9-oct** · 26 **vie 30-oct** · 27 **vie 20-nov** ·
> 28 **vie 11-dic** · 29 **lun 28-dic** (por el feriado del 25) · 30 **vie 8-ene** · UWSA2 **vie 15-ene** · NBME 31 GO/NO-GO **vie 22-ene** · 32 **lun 25-ene** ·
> 33 **mié 27-ene** · Free 120 **vie 29-ene**. Primer día de CONTENIDO = **mar 29-sep (D2)**; Cardio arranca el **lun 5-oct (D6)**.
> El contenido cierra el **jue 21-ene (D81, Bioquímica)** y el NBME 31 GO/NO-GO se rinde el día siguiente (vie 22-ene = D82) sin días de
> banco de consolidación delante; los 2 random timed 2×40Q de la Fase B siguen en D84 (mar 26-ene) y D86 (jue 28-ene) — ver ⚪ fila 0-bis.
> **⚠ Desde aquí cada día no estudiado mueve el examen un día hábil más (o exige recortar).**
> **Regla al leer este doc: el D# es lo estable; la FECHA es lo que se mueve** — con el corrimiento rígido los D# no cambian,
> así que verifica la fecha contra el `.ts` del plan antes de actuar. Todas las fechas de abajo fueron releídas de los `.ts` / SQL el 26-sep-2026 (v5.16).
> *(v5.15, 22-sep: D1 mié 23-sep · D94 jue 4-feb · D95 vie 5-feb = D-1 dentro del plan · finde 6-7 libre · examen lun 8-feb · 9 hitos en martes. v5.13, 16-sep: D1 jue 17-sep · D94 vie 29-ene = última sesión de banco · D95 lun 1-feb = D-1 · examen mar 2-feb · contenido desde el vie 18 · Cardio jue 24-sep. v5.12, 15-sep: D1 mié 16-sep · D95 vie 29-ene · examen lun 1-feb. v5.11, 14-sep: D1 mar 15-sep · D95 jue 28-ene = D-1 · examen vie 29-ene. v5.10, 12-13 sep: D1 lun 14-sep · D95 mié 27-ene.)*

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

**Estado del árbol el sáb 26-sep (v5.16):** el 2.º corrimiento RÍGIDO a D1 = lun 28-sep está aplicado en el working tree — planes `.ts` regenerados
(USMLE 95 d lun 28-sep → mié 10-feb, MIR 78 d → lun 18-ene + mantenimiento 57 d mar 19-ene → mié 7-abr, Research c1 → mar 23-feb, Derma → mié 21-abr,
LIVIANO → mié 3-feb, Business → mar 26-ene, AURUM → mié 31-mar, SYNAPSE → vie 5-feb, vibecoding → mié 10-feb), generadores re-fechados,
**Supabase ENCAPS resembrado y verificado** (92 filas lun 28-sep → vie 5-feb, 75 + 17, backup `study_schedule_bk_0926`, régimen `v6.14`),
bancos ENCAPS regenerados (pre-test de arranque **lun 28 + mar 29-sep**, semana 1, mini-sims realineadas 25-sep/2-oct/9-oct → 2/9/16-oct, inventario) y
**Calendar** con los 15 overlays re-fechados (ids conservados), 6 series de extensión NUEVAS D88-D93, extensión ENCAPS nueva y REVISIÓN SEMANAL nueva.
Esta pasada (docs núcleo: REESTRUCTURACION §19, este fichero, CALENDAR_SEGMENTOS §18, REVISION_SEMANAL, ROADMAP) es documental. El commit de cierre y el deploy son tuyos.

**Estado del árbol el mar 22-sep (v5.15):** el corrimiento RÍGIDO a D1 = mié 23-sep está aplicado en el working tree — planes `.ts` regenerados
(USMLE 95 d, MIR 78 d + mantenimiento 57 d, Research, Derma, LIVIANO, Business, AURUM, SYNAPSE, vibecoding), generadores re-fechados,
**Supabase ENCAPS resembrado** (92 filas mié 23-sep → mar 2-feb, backup `study_schedule_bk_0922`, `study_metrics.extra` a v6.13),
bancos ENCAPS regenerados (pre-test de arranque **mié 23 + jue 24-sep**, semana 1, inventario, perfil) y **Calendar** con los 12 hitos
re-fechados por primera vez + examen/D94/D95 + extensiones. `npx tsc --noEmit` = 0 errores. El commit de cierre y el deploy son tuyos.

**Estado del árbol el sáb 19-sep (v5.14):** el corrimiento a D1 = lun 21-sep está en el commit wip `76f17a2` (planes `.ts`, generadores,
Supabase ENCAPS 92 d con backup `study_schedule_bk_0919`, bancos y textos de la app); los docs de esta pasada (este fichero, ENCAPS,
Research, Derma, Business, SYNAPSE, roadmap) van en el working tree, igual que **la pasada de integradores del 19-sep (noche)**: `src/**` (pool MIR → UI, hallazgos del crítico USMLE, ENCAPS `regimenDe()` + rama INTENSIVO, score LIVIANO, Derma v3, KPI 1.ª review), `DATA/_scripts` (`--pull`, fallback de la eval, revisión semanal) y `DATA/SISTEMATIZACION_2026-09-19.md` (tsc = 0 según los 4 integradores). El commit de cierre y el deploy siguen siendo tuyos.

**DEPLOY v5.16: pendiente (se rellena al cerrar).**

---

## 🔴 ANTES DEL D1 (hoy sáb 26-sep / lun 28-sep temprano)

Sin esto el plan arranca ciego, con el contenido equivocado o con la app vieja en producción el primer día.

- [ ] **🔴 AGENDAR EL STEP 1 EN PROMETRIC PARA EL JUE 11-FEB-2027 (o reprogramar la cita si ya existía en la ventana 25-29 ene o en cualquiera de las fechas target anteriores: lun 1-feb, mar 2-feb, jue 4-feb, lun 8-feb) y CONFIRMAR QUE EL ELIGIBILITY PERIOD CUBRE EL 11-FEB.** El plan v5.16 termina el mié 10-feb (D95 = último día del plan y D-1 REAL); el mar 9-feb (D94) es la última sesión de banco y **no hay fin de semana libre antes del examen**. Si el eligibility period no llega al 11-feb: pedir la extensión a ECFMG (con costo) o decidir recortar temario (⚪ fila 0). Anotar aquí la fecha/hora confirmada y el centro. **Bloqueante: sin cita no hay examen.** *(USMLE — Prometric/ECFMG)*
- [ ] **Deploy a Vercel de la v5.16 — PENDIENTE (se rellena al cerrar)**: commit de cierre + push → verificar por contenido del bundle `USMLE Step 1 v5.16`, `inicio:'2026-09-28'`, `examenTarget:'2027-02-11'`, `descansoD1:'2027-02-10'`, `ENCAPS:'2026-09-28'` y **0 ocurrencias de `2026-09-23`**. **Lun 28-sep 09:00 al abrir la web**: EEUU debe mostrar Día 1/95 = UWSA1 lun 28-09, Readiness examen 2027-02-11 y ENCAPS D1/92 (origen `study_metrics`); el Home debe pasar de «FASE 6 · transición» a «FASE 7 · STEP 1 PRINCIPAL». *(sistema)*
- [x] **Deploy a Vercel de la v5.15 — VERIFICADO el mar 22-sep (tarde)** *(superado por v5.16: ver el ítem anterior)*: commits `5193b5b` (corrimiento) + `ecd1f24` (últimas cadenas visibles) → push → bundle `index-a2484a35…` (6.588.313 bytes) servido en https://joseph-md-app.vercel.app con `USMLE Step 1 v5.15`, `inicio:'2026-09-23'` ×8, `examenTarget:'2027-02-08'`, `descansoD1:'2027-02-05'` y los marcadores de la sistematización de v5.14 intactos (`dress_rehearsal` ×2, `poolConFallback` ×3). **0 ocurrencias de `2026-09-21`** y una sola de «v5.14», que es una referencia histórica deliberada. Comprobado por contenido del bundle, no por hash.
      *(v5.15, superado:)* **Mié 23-sep 09:00 al abrir la web**: EEUU debía mostrar Día 1/95 = UWSA1 mié 23-09, Readiness examen 2027-02-08 y ENCAPS D1/92 (origen `study_metrics`); el Home debía pasar de «FASE 6 · transición» a «FASE 7 · STEP 1 PRINCIPAL». *(sistema)*
- [x] ~~COMMIT del WIP + decisión `.gitignore`~~ **HECHO 13-sep (commit de cierre de la segunda capa).** Decisión tomada:
      los **PDF y TXT de los cuadernillos** (leyenda "prohibida la reproducción") quedan **fuera del remoto**
      (`.gitignore`; siguen en tu disco en `DATA/MIR/pool/raw/`). Los **JSON parseados y clasificados SÍ se versionan** y
      `src/lib/mirPreguntasOficiales.ts` **se queda en la app** (opción a): es uso privado de estudio, el bundle de Vercel
      no está indexado ni enlazado públicamente, y sin él el quiz MIR pierde la anti-repetición. Si prefieres la opción (c)
      —carga privada— pídelo y se hace en una pasada. *(sistema)*
- [x] **Deploy a Vercel de la v5.13 — VERIFICADO el mié 16-sep (tarde)**: commit de cierre `248aa1e` (sobre el wip `df206d0`) → push → bundle `index-bce1213b…` servido en https://joseph-md-app.vercel.app con `USMLE Step 1 v5.13`, `inicio:'2026-09-17'`, `examenTarget:'2027-02-02'` y `ENCAPS:94` (comprobado por contenido del bundle, no por hash). *(Superado por v5.14: ver el ítem siguiente.)*
- [x] **Deploy a Vercel de la v5.14 — VERIFICADO el dom 20-sep (madrugada)**: commit de cierre `9de02c7` (sobre `76f17a2` → `82540a8` → `98cc71e`) → push → bundle `index-be138f52…` servido en https://joseph-md-app.vercel.app con `USMLE Step 1 v5.14`, `inicio:'2026-09-21'`, `examenTarget:'2027-02-04'`, `ENCAPS:92` **y los marcadores exclusivos de la sistematización** (`dress_rehearsal` ×6 = rama INTENSIVO, `poolConFallback` ×3 = MIR pool→UI, `regimenDe` = ENCAPS dinámico, `APEX::USMLE::Pharmacology`, Derma d49 "jue 4-feb"). Comprobado por contenido del bundle, no por hash. **Lun 21-sep 09:00 abre la web**: EEUU debe mostrar Día 1/95 = UWSA1 lun 21-09, Readiness examen 2027-02-04, ENCAPS D1/92 (origen study_metrics), y el instrumento PROGRESO en '☁ ok'. *(sistema)*
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
      importar. *(Derma — antes de la sesión d1 = **mar 29-sep** (v5.16: el lun 28-sep, D1 del régimen, es día Research; Derma abre el mar 29 = d1)*
- [ ] **Importar el deck de cifras ENCAPS** — Anki → Importar
      `DATA/ENCAPS/TRACKING_ERRORES/ANKI_COLA/ENCAPS_Cifras_2027-I.csv` (separador `;` · HTML · deck en columna 3 →
      `ENCAPS::Cifras` · tags en columna 3), FSRS, 20 nuevas/día. Se repasa **dentro del bloque Anki de las 05:00, ≤5
      min**, desde el día 1. *(ENCAPS)*
- [ ] **Protocolo test-day para el UWSA1 (LUN 28-SEP 09:00-13:00)** — 3 bolsas Ziploc BREAK 1/2/3 (huevo duro,
      pavo/pollo, queso, nueces, granos de café con chocolate; **sin galletas ni jugos**); quick-log de sueño y agua en
      VITALS ese día (07:00 y al cerrar el sim); y **escribir en papel el plan B "worst-case" antes del primer bloque**
      (Palmerton §7.6: qué haces si el bloque 1 sale a 40 %; drill "Oh F#@& to OK" 10-15 s; AVP en los descansos). La
      app todavía no tiene dónde guardarlo (hallazgo #26). *(USMLE/rutina)*
      > Contexto v5.16: **los 12 hitos corren con el plan** (no hay hitos clavados por fecha), así que el UWSA1 sigue siendo el D1 pero no es el único que se mueve
      > (vie 11 → lun 14 → mar 15 → mié 16 → jue 17 → lun 21 → mié 23 → **lun 28-sep**): se rinde el **lun 28-sep = D1**, SIN un solo
      > día de contenido encima. Es la línea base pura que prescribe Palmerton: no lo leas como un mal resultado.
- [ ] **Confirmar el re-orden Research v5.10b (mismo orden; v5.16 corre +3 hábiles más — releído del `.ts` el 26-sep)**: el ciclo 1 arranca el **lun 28-sep** (R0, = D1 del régimen); M1 (Dr. Ciro) **vie 2-oct (d3)** ·
      C-2 **lun 12-oct (d6)** · T-1 (ética/CEI) **mié 14-oct (d7)** · M3 (Finlay) **vie 16-oct (d8)** · R9 (¿ya existe la SR?) **mar
      20-oct (d9)** antes de C-6 (**vie 30-oct, d13**) y R6 (**mar 3-nov, d14**) · CR-1 **jue 5-nov (d15)** y CR-2 **lun 9-nov (d16)** · T-2 (STROBE)
      **mar 17-nov (d19)** · R7 **lun 23-nov (d21)** · R3 **mar 29-dic (d33)** · R2 **lun 4-ene (d34)** · X-7 **mié 6-ene (d35, cierre antes de la PAUSA 7-ene → 3-feb)** · CR-9 (SUBMIT case report #1) **vie 5-feb (d36)**. Si no lo aceptas, es 1 línea en `gen_research_plan.js` + regenerar + `gen_research_calendar.js --check`.
      *(Research)*
- [ ] **⚪ v5.16 · DOS FECHAS LÍMITE EXTERNAS de Research siguen REBASADAS por el corrimiento** (lo detectó el re-fechado de overlays del 22-sep y v5.16 lo agrava 3 hábiles más; es consecuencia de los días no estudiados, no un fallo del pipeline):
      **T-1** cae el **mié 14-oct** pero su texto dice *"solicitud CEI expedita ≤ 30-sep"*, y **C-6** cae el **vie 30-oct** pero su texto dice *"FECHA LÍMITE EXTERNA ≤ 15-oct-2026"* (ventana de letters del journal diana).
      Decide: (a) adelantar esas dos tareas fuera del slot de Research (son gestiones cortas, no estudio), (b) aceptar la fecha nueva y reescribir el límite en el generador, o (c) cambiar de artículo diana en C-2.
      Lo que elijas se aplica en `gen_research_plan.js` + `gen_research_calendar.js`. *(Research — decisión tuya)*
- [ ] **Re-scan LOGUEADO de QX y Theomed** + decisión escrita de matrícula: ¿sigue vivo el acceso 2026-II? ¿publicaron
      Investigación y Gestión? ¿abrió el ciclo 2027-I? **4 de los 7 simulacros de viernes de la fase intensiva dependen
      de ese acceso**. *(ENCAPS)*
- [ ] **Retomar el quick-log de VITALS a las 07:00** (20 s: horas de sueño + agua) y, desde el lun 28-sep, **registrar
      correr/caminata al volver (06:45, 20 s)** como pide la descripción nueva de CORRER/CALISTENIA (VITALS no modela el
      cardio AM hasta la Tarea D). Sin dato, la métrica 8 de la revisión semanal y el disparador ÁMBAR "sueño <6 h" no
      existen. *(VITALS/sistema)*
- [ ] **Auditar F0 de SYNAPSE contigo en 5'** (día 1): marcar ✓ las A-units ya cursadas jun-ago (Academy *AI Fluency ·
      Claude 101 · Code 101 · Platform 101*, Karpathy, 3B1B) en la pestaña ⚡ run; la primera sin ✓ es la lección real de
      mañana. *(SYNAPSE)*

---

## 🟠 ESTA SEMANA (28-sep → 2-oct · semana COMPLETA: el D1 cae en lunes)

### Lun 28-sep (D1) — rituales que estrenan instrumento

- [ ] **04:55** — `node D:/joseph-md-app/DATA/_scripts/journal_hoy.js --abrir` (el enlace 📓 journal de la app abre
      `vscode://file/…`; en el móvil no abre). Regla nueva: **04:55 commit-or-stash obligatorio**, el Anki AM 05:00 no se
      retrasa. *(SYNAPSE)*
- [ ] **16:15** — resolver `BANCO_PROPIO/pretest_arranque_2026-09-28.html` (parte 1: 20Q = 5Q × II-3 · V-2 · III-5 · I-3 — regenerado el 26-sep)
      y el **mar 29-sep (D2)** la parte 2 (`…_2026-09-29.html`: II-4 · IV-1+IV-2 · I-4 · II-5). En cada uno «Generar JSON» →
      guardar → `node DATA/_scripts/gen_encaps_minisim.js --registrar <export.json> --append` (**no** la línea de 1
      renglón: dejaría la ronda como MIX sin línea base por crítico). Los `banco_2026-09-28` (II-3 esquema/intervalos) y `banco_2026-09-29` (I-3 tipos de vigilancia) existen pero están marcados
      `_meta.sustituido_por` (el pre-test ocupa su contenido; el horario no cambia); las salidas de las fechas 23 y 24-sep ya no existen. **Semana 1 regenerada el 26-sep:**
      `eval_2026-09-28` (D1: 5Q de fallos previos, críticos primero — no hay día anterior) y `eval_2026-09-29` (5Q del código de ayer, II-3); D3 mié 30-sep = V-2 planeamiento · D4 jue 1-oct = III-5 pertinencia/barreras;
      el **vie 2-oct = primera mini-sim del ciclo** (`sim_n` 5, día 5; cola larga II-2 + I-10) y al cerrar la semana hay que pre-generar la del 9-oct (`--semana 2026-10-05`). Los ficheros `minisim_2026-09-25/10-02/10-09` se realinearon a `10-02/10-09/10-16` (ítems intactos).
      ⚠ **El pool III-5 queda a 0 disponibles tras el pre-test + `banco_2026-10-01` (jue 1-oct)** y el de V-2 a **1/41**: reponer `set_III-5_2.json` antes del **jue 29-oct** (siguiente III-5, medicina tradicional/complementaria) y `set_V-2_2.json` antes de su siguiente instancia (ver `_inventario_banco_por_codigo.json`, regenerado el 26-sep). *(ENCAPS)*
- [ ] **17:10** — **primer cierre real desde la app** (HOY → final de la cola → CIERRE DE SESIÓN → Guardar) y comprobar
      que aparece en «17/20» (% ciego semanal + tabla por código) y en Supabase:
      `SELECT fecha, especialidad, porcentaje, fuente, errores_por_tipo FROM study_progress WHERE fuente='app:cierre'`.
      Si el estado dice '⟳ local', pulsar «Sincronizar pendientes» (la ronda queda en `jmd-encaps-cierres`). Desde ese día
      la rutina es diaria; el registro se lleva con «⎘ línea --cerrar» → `node DATA/_scripts/gen_encaps_semana.js --cerrar "…"`
      (o «⎘ JSON ronda» → `gen_encaps_minisim.js --registrar <ronda.json> --append`). *(ENCAPS)*
- [ ] **18:25** — crear la **primera nota del diario USMLE** `01_USMLE/05_DIARY/2026-09-28.md` en el vault (Insertar
      plantilla → `_template_day_usmle`, 60 s) y **activar el plugin Dataview** (instalado en `.obsidian-desktop/plugins`,
      pero `community-plugins.json = []` — A VERIFICAR (12-sep)) para que el Dashboard_USMLE y el bloque APEX rendericen.
      *(USMLE/sistema)*

### Resto de la semana

- [ ] **Mié 30-sep (D3, "setup Anki FSRS"; v5.16) — completar la configuración Palmerton §4.2 que la app aún no lista**
      (hallazgo #15): *Maximum reviews/day* **9999** (el default 100 oculta vencidas) · *reviews first, new second* ·
      **rollover 4 h** (despiertas a las 04:00; con rollover 9 h las tarjetas "de hoy" no estarían listas a las 05:00) ·
      sync al abrir y al cerrar · note type *Basic (optional reversed)* sin reversar todo · ≤3 mazos · **Browse → Set Due
      Date 0** para revisar hoy las tarjetas creadas a las 10:45. Anotar en SYNC_ANKI. *(USMLE)*
- [ ] **Tag compartido `sys::<sistema>` a mano** en cada tarjeta mientras el motor APEX no lo ponga (USMLE:
      `sysTag(DIAS[].system)` · MIR: `sysTag(usmleSystem)` · Derma step1: `step1 sys::Dermatology`). Anotar en SYNC_ANKI la
      fecha de la primera verificación con `findCards 'tag:sys::*'`. *(USMLE/MIR/Derma — rutina)*
- [ ] **P0 de seguridad · `datos_tesis` (55 filas de MENORES, RLS OFF, anon key en repo con remoto).** Ejecutar UNA opción
      **antes del T-8 (lun 7-dic)** y anotarla en `etica.md` fila 8 — o ya en D1-D2 en vez de esperar al proyecto S6 del
      vibecoding (lun 2 → vie 6-nov, v5.16): **A (recomendada)** `ALTER TABLE public.datos_tesis ENABLE ROW LEVEL SECURITY;` (sin policies:
      anon deja de leer; service_role sigue) · **B** `DROP TABLE public.datos_tesis;` (irreversible; la maestra sigue en
      `D:\motor_apex` y el CSV de-id cubre el depósito) · **C** RLS + policy "Allow all" (**no protege**).
      ⚠ **Antes:** `D:\motor_apex\bot_tesis.py` inserta vía `supabase_client.py` con `SUPABASE_KEY` de `D:\motor_apex\.env` —
      si es la anon, la opción A rompe el bot (necesita service_role). Comprobar qué key es. El resto de tablas con RLS OFF
      (~43 backups `study_schedule_bk_*`) va en ⚪. *(sistema)*
- [ ] **Anki telemetría con Anki abierto** — `node DATA/_scripts/anki_telemetria.js` una vez con sesión de AnkiWeb para
      validar el `sync` y el KPI `primeraReview`; el proyecto **S2 (lun 5 → vie 9-oct, v5.16)** crea la tarea programada
      `schtasks /create /tn "JMD Anki telemetria" /tr "node D:\joseph-md-app\DATA\_scripts\anki_telemetria.js" /sc daily /st 21:05`
      (o hook `SessionEnd`). *(SYNAPSE)*
- [ ] **Remoto privado del journal (una vez):** `git -C D:/synapse-journal add -A && git -C D:/synapse-journal commit -m "journal 2026-W38: scaffold"`
      → `gh repo create synapse-journal --private --source=D:/synapse-journal --remote=origin --push`. El repo local ya
      está inicializado (sin commit). *(SYNAPSE)*
- [ ] **Vie 2-oct · M1 (Research d3; v5.16 — esta misma semana) — WhatsApp + reunión con el Dr. Ciro**: 3 coautorías, vía CEI de la tesis, versión
      del CADI usada, su ORCID; es también el arranque del case report (**regla escrita en MENTORES fila 6: si el jue
      22-oct (d10, ~3 semanas desde M1) no ha dado caso → mensaje único de `caso_candidatos.md` §2 al colega SPD**). *(Esta semana Research tiene 3 átomos: R0 lun 28-sep (abrir las 10 cuentas) · R1 mié 30-sep (PICO) · M1 vie 2-oct.)* Los documentos de ética se reúnen
      desde este día (chip en M1). *(Research)*
- [ ] **Vie 2-oct · primera mini-sim del ciclo (ENCAPS · día 5 en v5.16, `sim_n` 5 en el SQL)** — cargar la nota /25 **UNA sola vez** (cierre tipo `mini_sim` en el formulario
      → espejo automático en `study_sim_scores`, o en ▲ SIM; si cargas ambas con valores distintos gana la última).
      Las dos partes del pre-test (lun 28 + mar 29) ya estarán hechas: los 8 críticos tienen línea base antes de la primera mini-sim.
      A las **17:00**: `node DATA/_scripts/gen_encaps_semana.js --sql` → primer override (semana del 5-oct) → `node DATA/_scripts/gen_encaps_mantenimiento_2027.js 2026-09-28 --override DATA/ENCAPS/TRACKING_ERRORES/SEMANAS/override_2026-10-05.json --bk study_schedule_bk_1002`
      → revisar SQL (DELETE solo MANTENIMIENTO) → `execute_sql` → pegar la
      verificación que imprime (**75 banqueo1h + 17 mini_sim** = 92 filas, v5.16). *(ENCAPS)*
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
      - **AURUM** (`expo start` → AurumHub): «✎ registrar semana» abre el editor y el semáforo cambia; en **D15 (vie 16-oct, v5.16)**
        aparece la rúbrica y el score se guarda en `jmd-aurum-rubrica`; en **D40 (vie 20-nov)** la tarjeta VARIANTE LIVIANO.
- [x] ~~**Calendar — una sesión de 20' con el MCP GCal (hallazgos #1-#4 del crítico + gap MIR 8)**~~ **RESUELTO el 19-sep, RE-FECHADO a v5.15 el 22-sep y a v5.16 el 26-sep**: overlays 🏁 D94
      `neboplchsaua4snj39nrl480nc` ahora **mar 9-feb** y 🛌 D95 `n90bdqhohadu1eqbctv148dn28` ahora **mié 10-feb** (= víspera real); overlay del examen `oinh139dsnbuma9r3kfu56dhkc` → **jue 11-feb**;
      **los 12 overlays 🎯 de hito corrieron +3 hábiles con ids conservados** (8 vuelven a viernes); las 6 series de EXTENSIÓN USMLE se **RECREARON** para D88-D93 (lun 1 → lun 8-feb, `BYDAY=MO,TU,WE,TH,FR`, `UNTIL=20270209T045959Z`; ids nuevos, los de v5.15 borrados),
      la **EXTENSIÓN ENCAPS** es nueva (lun 1 → vie 5-feb, `0bv3ef0do92mt84pa8es8cbgho`) y la 📋 REVISIÓN SEMANAL también (`th5utf73brht5g0lkt87hd4940`, sáb 3-oct → sáb 20-feb). ✅ Los 12 🔬 Research: `_calendar_overlays.json` regenerado el 26-sep (12 `recrear`) → `update_event` ×12 (ids intactos) + `--set` ×12 + `--check` = 0 **VERIFICADO el 26-sep (tarde)**.
      **Solo quedan tus decisiones** (⚪ Calendar · 6 decisiones + los 4 títulos): GYM/BAILE de la víspera (mié 10-feb), ALUMUERZO, ALISTARSE martes, series secundarias el jue 11-feb. Detalle e ids en `CALENDAR_SEGMENTOS_V5_6.md` §18. *(lo pedido, histórico:)* *(sistema)*
      1. *(histórico v5.14, ya resuelto y re-fechado a v5.15)* **Mar 2-feb (D94 = última sesión de banco, v5.14), MIÉ 3-FEB (D95 = D-1 dentro del plan) y JUE 4-FEB (examen) sin overlay y con TODO activo** (el sáb 30 / dom 31-ene, libres, quedan entre D92 y D93): las 6 series USMLE (RRULE UNTIL 20270130 — ya NO cubre ni D93-D95 ni el examen: hay que extenderlas a `20270204` o crear los overlays del lunes al jueves aparte)
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
      > sáb/dom, 🧠 IA 04:15, misión 12:30 y PC sáb/dom **ya están en v5.10** (12-13 sep, verificadas con `get_event`); las horas no cambiaron en v5.11, v5.12, v5.13 ni v5.14; el 16-sep se re-fecharon los overlays de hito a v5.13 y el 19-sep a v5.14; el 22-sep a v5.15 (por primera vez cambiaron TODOS); **el 26-sep se re-fecharon a v5.16 los 12 hitos (+3 hábiles, ids conservados), el examen (→ jue 11-feb 07:00-16:00), D94/D95 (mar 9 / mié 10-feb) y se RECREARON las 6 extensiones D88-D93, la extensión ENCAPS y la REVISIÓN SEMANAL**; detalle en `DATA/ENCAPS/CALENDAR_SEGMENTOS_V5_6.md` §18.
- [x] ~~**Crear el evento recurrente `📋 REVISIÓN SEMANAL`**~~ **RECREADO el 26-sep (v5.16): `th5utf73brht5g0lkt87hd4940`** (sáb 07:15-07:35, `WEEKLY;UNTIL=20270221T045959Z;BYDAY=SA`, **S1 = sáb 3-oct** (cubre lun 28-sep → vie 2-oct) → **S20 = sáb 13-feb** (D93-D95 + examen jue 11-feb) → **S21 = sáb 20-feb = post-mortem**); los ids anteriores `0r2rmn0f4vea40dls47lg60t44` (22-sep, v5.15) y `21fbiohc1i47r4lqmaa3eb76l4` (19-sep, v5.14) están borrados. *(pedido original: sáb 07:15-07:35, con el default documentado en `REVISION_SEMANAL.md`)*
      **y decidir sáb o dom como día oficial** (sigue siendo tu decisión): la descripción nueva del domingo SYNAPSE dice «Feynman + 20' revisión
      semanal» y `REVISION_SEMANAL.md` fija el sábado 07:15 (ya dice «si la hiciste el sábado, solo Feynman»). Descripción
      sugerida: `node DATA/_scripts/gen_revision_semanal.js → DATA/USMLE/REVISIONES/S<NN>.md · 10 métricas`. *(sistema)*
- [ ] **Antes de la revisión S1 (sáb 3-oct)**: tocar el instrumento SEMANA del cockpit (web) → pegar el portapapeles en
      `DATA/USMLE/REVISIONES/_localstorage_export.json`. Sin ese export las métricas 5/6/7/9 salen "sin dato"; las 1 y 2
      se rellenan a mano hasta el proyecto S3. **Sábados PC:** correr `node DATA/_scripts/verify_vibecoding.js <n>` ANTES
      de marcar el proyecto y pegar el one-liner `localStorage.setItem('jmd-vibe-ship', …)` en la consola (hasta que S3/S4
      lo automaticen). *(sistema/SYNAPSE)*
- [ ] **EKER — revisar la frase 6** añadida el 12-sep («Soy un médico USMLE-ready: cada pregunta ciega es un dato, no un
      juicio.», vigente hasta el **jue 11-feb**, día del examen) y cambiarla si quieres otra; las 5 originales están intactas. *(rutina)*
- [ ] **Redeploy de n8n `APEX-MOTOR-FLOW-V2`** (:5678 sigue con el código del 07-may): con n8n arriba, exportar backup del
      workflow → `python D:\agente_estudio\scripts\_ARCHIVO_DESARROLLO\update_n8n_workflow_v2_3.py` → enviar **1 APEX
      `::OBSIDIAN` multilínea de prueba** con Ctrl+Shift+A y comprobar que la nota llega íntegra a `01_USMLE\…\APEX_creados\`
      y la card a Anki. Candidato al proyecto S4 del vibecoding (catálogo re-secuenciado). *(sistema/SYNAPSE)*
- [ ] **Alinear `D:\agente_estudio\config\fases.json` a v5.16 — `FASE_7.inicio` → `2026-09-28`** (1 línea; fuera del repo, lo haces tú). *(histórico:)* ~~**Alinear `D:\agente_estudio\config\fases.json`**~~ **HECHO 19-sep (integrador LIVIANO/SYNAPSE/Derma): FASE_4 `is_current_phase = false`, FASE_7 `true` e `inicio = 2026-09-21`; copia previa en el scratchpad (`fases.json.bak_0919`); queda opcional el `git init` local.** ⚠ v5.15 pedía `2026-09-23`; v5.16 pide **`2026-09-28`**. *(texto original:)* sigue con `FASE_4_ENCAPS_DOMINANTE.is_current_phase = true` y
      `FASE_7.inicio = 2026-10-01`. Poner `false` en FASE_4 (o `true` en FASE_7) y `FASE_7.inicio = 2026-09-21` (D1 del régimen v5.14). Verificar
      antes que `orquestador.py` lee ese campo. Opcional (S1): `git init` LOCAL en `D:\agente_estudio` (sin remoto,
      `.gitignore` para `.env`/`__pycache__`); mientras, los commits [S1]/[S6] van a joseph-md-app. *(sistema)*
- [ ] **Reponer stock del banco ENCAPS** (inventario regenerado el **26-sep, v5.16**, con la semana 1, el pre-test de arranque y los 3 primeros mini-sims realineados; demanda 1 786Q en 92 días; pool 250 disponibles de 434).
      **Cifras reales del inventario del 26-sep** (`disponibles_no_usados` / total del pool · déficit vs demanda):
      **III-5 0/29 (déficit 90Q) — a CERO tras el pre-test + el banco del jue 1-oct; siguiente III-5 = jue 29-oct (medicina tradicional/complementaria)** · **V-2 1/41 (179)** · **I-3 15/33 (165)** · II-1 11/12 (79) · **II-4 14/27 (76)** · **I-4 14/28 (76)** · **II-3 15/28 (75)** · **IV-1+IV-2 18/28 (72)** · **II-5 19/27 (71)** · II-11 5/6 (67) · IV-6+IV-7 6/7 (66) · III-8 8/11 (64) · II-8 11/12 (61) · V-MED 22/23 (50).
      **Lo más urgente por STOCK ABSOLUTO (no por déficit):** II-12 **1Q** · II-EMG **2Q** · II-2 **2Q** · II-10 **2Q** · III-9 **2Q** — varios son cola larga y la receta del viernes pide 4-5Q de cada uno, así que el primer mini-sim que los toque ya se queda corto.
      Por códigos críticos, el orden de reposición es **`set_III-5_2.json` (antes del jue 29-oct)** → `set_V-2_2.json` → `set_I-3_2.json` → `set_II-3_2.json` / `set_II-4_2.json` → `set_I-4_2.json`; después IV-1+IV-2 · IV-6+IV-7 · III-8 · V-MED.
      Fuente viva: `DATA/ENCAPS/BANCO_PROPIO/_inventario_banco_por_codigo.json`. Gate §3-bis (clave oficial o compendio/norma con número y año). *(ENCAPS)*
- [ ] **Conseguir `CLAVE DE RESPUESTA 2026-1.pdf`** (Tío López / QX): los 100 ítems del 2026-1 siguen sin clave. *(ENCAPS)*
- [ ] **Importar `DATA/BUSINESS/ANKI_COLA/LIVIANO_mecanismo.csv`** en Anki (tabulador, deck en columna 3, etiquetas en
      columna 4, FSRS) — **antes del vie 2-oct (D5, caso 1)**, tope **lun 19-oct (D16**, el día de las 10 tarjetas de MECANISMO del
      módulo). Fechas leídas de `livianoStudyPlan.ts` el 26-sep (v5.16). *(LIVIANO)*
- [ ] **Rutina de export de los registros que viven solo en un navegador** *(Derma/MIR)*:
      - Derma, cada viernes: botón de export del cierre (o en Debilidades) → `DATA/DERMATOLOGIA/TRACKING/_registro_derma.json` → `rondas[]`.
      - MIR, cada semana: HOY → «⤓ Exportar log JSON» → `DATA/MIR/mir_eval_log_export.json` →
        `node DATA/_scripts/gen_delta_espana.js --write` (completar las filas del delta volcadas y subir las estables a la
        tabla de su asignatura) y volcar también en `_registro_resoluciones.json` con `plan:'MIR'`. El espejo Supabase
        `mir_eval_log` reduce el riesgo, no lo elimina.
- [x] **(HECHO 19-sep en la sesión principal, v5.14: MEMORY.md línea 1, usmle-step1-v5.md, encaps-mantenimiento-2027-1.md y el handoff; re-verificado tras la sistematización) Actualizar la memoria `usmle-step1-v5.md`, `encaps-mantenimiento-2027-1.md`, el handoff y MEMORY.md al estado v5.14** (D1 lun 21-sep · D94 mar 2-feb = última sesión de banco · D95 mié 3-feb = D-1 dentro del plan · examen target jue 4-feb · sáb 30/dom 31-ene libres entre D92 y D93 · MIR 78 d → lun 11-ene, mantenimiento 57 d desde el mar 12-ene · ENCAPS 92 d → vie 29-ene · SYNAPSE vie 29-ene · Research +2 (mar 22-sep → mié 17-feb, CR-9 lun 1-feb = D93) · Derma +1 slot 21-sep → mar 13-abr, taper 21-ene → 4-feb con d49 = día del examen): el orden
      real es el de `REESTRUCTURACION` §13.3 — `remap_inicio.js <fecha>` (ya incluye Research vía `gen_research_plan.js`,
      Derma 73 + ciclo 2, Business vía `gen_business_plan.py`, LIVIANO) → `gen_vibecoding_plan.js` **antes que**
      `gen_synapse_plan.js` → `gen_aurum_plan.js` → `gen_mir_daily.js --check` (+ `gen_mir_mantenimiento.js` si D78 pisa el
      inicio del mantenimiento; v5.14: D78 lun 11-ene → mantenimiento desde el mar 12-ene) → `gen_encaps_mantenimiento_2027.js` → `execute_sql` → USMLE con `gen_usmle_v5.js` → tsc/expo → docs + overlays.
      ⚠ No volver a ejecutar `build_vault_research.js` (sobreescribiría `obsidianResearchMap.ts`); ⚠ los `gen_readme.js` /
      `gen_calendario.js` del scratchpad no conocen `franjaNota`/`USMLE_TAPER`/viernes N4: no re-ejecutarlos. *(sistema)*
- [ ] **Los D# de LIVIANO vuelven a moverse en v5.16 (los 16 casos siguen en viernes y, con el D1 en lunes, el 1.º vuelve al vie 2-oct = D5: el generador coloca los casos cada 5 días desde el d5)**:
      casos **D5 · D10 · D15 · D20 · D25 · D30 · D35 · D40 · D45 · D50 · D55 · D60 · D72 · D77 · D82 · D87** (vie 2-oct … vie 29-ene) ·
      drills de cifras ancla **D37 (mar 17-nov) / D58 (mié 16-dic) / D75 (mié 13-ene) / D88 (lun 1-feb, repaso integral I)** · Síntesis M2 **D38 (mié 18-nov)** ·
      Acceso Perú **D39 (jue 19-nov) + D41-D44 (lun 23 → jue 26-nov)** · trimestral I **D46 (lun 30-nov)** y II **D90 (mié 3-feb)** · capstone **D89 (mar 2-feb)** ·
      **✅ caso 16 integral D87 (vie 29-ene) = ANTES del capstone** — la inversión de v5.15 desaparece sola (⚪ fila D RESUELTA).
      Código del repo alineado (`livianoScore.ts` cabecera «D37 · D58 · D75 · D88, v5.16» verificada el 26-sep); **A VERIFICAR (26-sep)** LIVIANO_ACADEMIA, LIVIANO_PROTOCOLO_CLINICO_v1, `empresaData.ts`, `LivianoTodayPlan.tsx` y el overlay del Calendar (fuera de esta pasada documental); queda además cualquier nota EXTERNA tuya (Notability/Obsidian) que cite los D# de v5.15 (D8 · D13 … D90). **Con el corrimiento rígido el D# es lo estable; lo que se mueve es la fecha.** *(LIVIANO)*

---

## 🟡 ESTE MES (sep-oct)

### Research — envíos y gestiones (nadie más puede hacerlas)

Fechas releídas de `researchDailyPlan.ts` el 26-sep. v5.16: el ciclo 1 sigue teniendo **los mismos 42 átomos** (multiset de códigos = **dif 0**: no se perdió ni se fusionó nada) y corre +3 hábiles: arranca el **lun 28-sep (R0 = D1 del régimen)** y termina el **mar 23-feb-2027**; la **PAUSA por el Step 1 va ahora del jue 7-ene al mié 3-feb** (`pausa: '2027-01-07 → 2027-02-03'`), y con ella **el *spill* de v5.15 desaparece**: R3 vuelve a caber ANTES de la pausa (d33 mar 29-dic), R2 es d34 (lun 4-ene) y X-7 (cierre antes de la pausa) es d35 (mié 6-ene). Tras la pausa quedan **7 átomos**: **CR-9 d36 vie 5-feb (= D92 del Step 1, 4 hábiles antes del examen)** · X-8 d37 mar 9-feb (= D94; su texto dice «re-arranque post-Step 1» aunque el examen es el jue 11-feb) · **R8 d38 jue 11-feb = DÍA DEL EXAMEN** (protocolo PRISMA-P, átomo recortable) · X-3 lun 15 · X-4 mié 17 · X-5 vie 19 · X-6 mar 23-feb. ⚠ **Decisión tuya (⚪ K):** saltar R8 ese día o moverlo al lun 15-feb (1 línea en `gen_research_plan.js` + regenerar + `gen_research_calendar.js --check`); el plan corre hoy con R8 el jue 11-feb. *(v5.15: ciclo jue 24-sep → vie 19-feb, pausa 4→29-ene, R3 desplazado tras la pausa a d37 vie 5-feb, CR-9 d35 lun 1-feb = D91.)*

- [ ] **M2 · jue 8-oct (d5)** — registrarse en `https://risingscholars.net/accounts/register/` y publicar la solicitud de
      mentor (3 piezas: carta, tesis, case report; 3-4 h). **Regla escrita en MENTORES fila 2: si a las 4 semanas de M2 no hay
      mentor asignado → contratar editor profesional (US$200-400, RUTA §3.1)** (la fecha exacta la lleva el chip del átomo — ✅ verificado el 26-sep (tarde): el chip del átomo dice jue 5-nov y CR-2 lun 9-nov; en v5.15 decía mar 3-nov) que cubra las 3 piezas. Confirmar ambas reglas.
- [ ] **C-2 · lun 12-oct (d6) — elegir el artículo diana** en `CARTA_1/candidatos.md` §1 y **leer ESE DÍA con tu Chrome**
      las guías de autores (las automáticas devolvieron 403/402): **JAAD International Research Letter**
      (`jaadinternational.org/content/authorinfo` o ScienceDirect 26663287) e **IJD Correspondence** (Wiley 13654632) →
      copiar los límites reales (palabras, refs, figuras/tablas, abstract) con fecha en `TESIS_L0/research_letter_outline.md`
      §1 filas 1-2 (a más tardar en T-7, mar 1-dic). Actas y Anais ya están leídos en vivo (12-sep). Recomendación #4
      (JAAD `10.1016/j.jaad.2026.08.115`) si admiten "unpublished data"; si no, #1 (JCD `10.1111/jocd.71104`).
      > ⚠ **C-6 = SUBMIT de la carta el vie 30-oct (d13)**, contra un deadline interno del ≤15-oct: **15 días TARDE en v5.16** →
      > cerrar el paquete y hacer el SUBMIT el jue 15-oct fuera del átomo (C-5 formateo cae el mié 28-oct: habría que adelantarlo) o elegir en C-2 una fila
      > con ventana más larga (§9.1 de `RUTA_PUBLICACION_2027.md`). Sigue siendo decisión tuya — es la misma que el 🔴 de las dos fechas límite externas rebasadas.
- [ ] **T-1 · mié 14-oct (d7) — ética de la tesis** (el interno ≤ 30-sep queda 14 días atrás: si importa, presentar la solicitud el vie 2-oct, que es día de M1): localizar el **nº y fecha del CEI** (`etica.md` 1.1) **o presentar
      ese mismo día** la solicitud de revisión expedita/retrospectiva en la FMH-UNCP u hospital (protocolo + modelos de
      consentimiento/asentimiento + oficio de la I.E. + resumen). **Gate 1 escrito en T-7/T-8: sin nº o constancia de
      exención, el envío T-8 (lun 7-dic) pasa a feb-2027.** Además: localizar los **PDF del modelo de consentimiento
      parental y del asentimiento** (los números ya constan: 1.256 matriculadas → 291 excluidas → 100 ausentes → 865
      evaluadas → 785 completas → 316 IGA≥1; falta el modelo y si el asentimiento fue escrito u oral).
- [ ] **M3 · vie 16-oct (d8)** — email a **Finlay**; antes verificar en la página del CADI de Cardiff el procedimiento de
      licencia (`technologytransfer@cardiff.ac.uk` según fragmento de búsqueda; la página no respondió) y su dirección.
- [ ] **R9 · mar 20-oct (d9)** — rellenar las columnas AMSTAR-2 y "hueco que deja" de las 5 SR/MA de `lines/L4-complicaciones.md`
      §6.1 (PMID 41249530 · 37178872 · 39214904 · 36574028 · 40406769, verificados) y marcar UNA salida (a/b/c) en §6.3 con
      fecha; **sin eso R6 (mar 3-nov, d14) no fija el PICO**.
- [ ] **Jue 22-oct (d10)** — disparador del plan B del case report: si el Dr. Ciro no dio caso (~3 semanas desde M1, vie 2-oct), enviar el mensaje único de
      `caso_candidatos.md` §2 al colega SPD (el chip del átomo lleva la fecha exacta — verificado el 26-sep tras el corrimiento: jue 5-nov). **CR-1 (caso + consentimiento de publicación + senior author) = jue 5-nov (d15)**
      y **CR-2 = lun 9-nov (d16)**: en v5.16 **los DOS siguen cayendo DESPUÉS del 31-oct** (en v5.14 CR-1 era aún el vie 30-oct, el último hábil antes del límite). El chip lo dice literal —
      «sin caso antes del 31-oct el entregable de feb-2027 no ocurre»—, así que el caso y el consentimiento firmado hay que cerrarlos FUERA del átomo, antes del sáb 31-oct.
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
- [ ] **T-7 · mar 1-dic (d24)** — antes de depositar el CSV de-identificado en OSF/Zenodo, revisar
      `DATA/RESEARCH/TESIS_L0/_deid/datos_tesis_acne_deid.csv` (865 filas, gitignored): que no quede ninguna columna
      cuasi-identificadora y el k-anonimato mínimo (combinaciones edad×grado con n=1 → agrupar edad en tramos); el DOI del
      depósito va en la frase de *data availability* de `DATOS_README.md` §6.

### USMLE — reservas y verificaciones externas

- [ ] **Free 120 en el Prometric de Lima (vie 29-ene-2027, D87)** — Palmerton §8.2: práctica en el mismo centro, 1-2
      semanas antes, registro con hasta 7 días de espera; costo **$155 internacional según el cuaderno (A VERIFICAR)**. Al
      agendar el examen para el jue 11-feb (🔴; el Free 120 sigue 13 días antes) verificar en `usmle.org` / `prometric.com` si Lima ofrece la práctica presencial y
      reservarla; si no existe, dejarlo escrito en README §3 para no volver a abrirlo. Hoy el overlay del Free 120 (D87 en v5.16) lo hace "en la
      interfaz oficial NBME" (en casa). Ligado a la decisión ⚪ #4 (maratón).
- [ ] **MyNBME · qué formas se COMPRAN y cuáles se hacen en Qbankly** (hallazgo #24, alto: afecta a 3 hitos y al GO/NO-GO):
      `DIAS.mat` dice `NBME 25 (Qbankly)` … `NBME 33 (Qbankly)` → % bruto sin curva oficial, sin reporte por sistema y sin
      garantía de vigencia; `HITOS_ONTRACK` compara ese % con umbrales pensados para el % *equated*. Confirmar en MyNBME
      qué formas CBSSA están activas en ene-2027 (el cuaderno describe 25-30; el plan asigna hasta la 33) y comprar como
      mínimo **31/32/33 + Free 120 oficial**; anotar "Qbankly = % bruto (sin curva)" donde toque.
- [ ] **A VERIFICAR del cierre pre-examen**: repasos Anki 200-300/día en las últimas 2 semanas (cifra del studio guide, no
      de transcripción) — sirve para dimensionar D94/D95 (mar 9-feb = última sesión de banco y mié 10-feb = D-1 REAL dentro del plan, `USMLE_TAPER`); en v5.16 **no hay fin de semana libre**: el examen es el jue 11-feb, al día siguiente del D95 (el sáb 6 / dom 7-feb caen entre D92 y D93, solo Anki vencido).

### Derma — la sesión logueada que desbloquea tres cosas a la vez

- [ ] **Una sola sesión de ~20 min con tu Chrome adjunto a AccessDerma** (método en
      `DATA/DERMATOLOGIA/_scrape/README_TOC_PENDIENTE.md`) *(alto impacto)*:
      1. Extraer los **TOC con `sectionid`** de Fitzpatrick 9e (2570), Barnhill 4e (2802), Weinberg 5e (1913), Guidebook
         (2960) y dermatoscopia (2804, 2929) → hoy **20 átomos enlazan a la portada del libro** (sectionid verificado en 50/70).
      2. Leer el listado de `cases.aspx?groupid=1546` (título + área de los 200 casos) para **confirmar o corregir
         `dermaCasoArea()`** — el etiquetado Med 1-110 · Path 111-140 · Peds 141-170 · Surg 171-200 es una **suposición**:
         si el orden real no es por área, el mapa de fallos por módulo CORE del ledger, del Hub y de la pestaña Cerebro es ruido.
      3. Guardar los `sectionid` por pregunta del 2929 para que la "imagen dermatoscópica ciega" apunte a la pregunta N.
- [ ] **Anclaje First Aid en d12 (jue 29-oct, SJS/TEN/DRESS) y d24 (mié 2-dic, melanoma) — fechas v5.16 de `dermaDailyPlan.ts` (d1 = mar 29-sep)**: la sección/página no consta
      en el repo → abrir el ejemplar y sustituir 'A VERIFICAR (12-sep)' en `anclajeStep1` (`dermaDailyPlan.ts`); hasta
      entonces el chip «cuenta doble Step 1» de HOY muestra ese texto tal cual.
- [ ] **Verificar DeLorenzi 2017** (ASJ, PMID 28333326; acceso OUP/UF) — UI de hialuronidasa por "área" (~450 y ~900 UI
      del SPEC §2.4) y criterio de parada de los pulsos. Hasta entonces el drill y la ficha X-19 los muestran como A
      VERIFICAR: **no fijar esas cifras en Anki**. Deadline: drill de oclusión **d19 = mié 18-nov** (v5.16).
- [ ] **NotebookLM «DERMA · Élite Engine»**: las 7 fuentes fallidas «Checking your browser - reCAPTCHA» SIGUEN en el
      cuaderno el 13-sep (86 = 79 útiles + 7). Borrarlas a mano en la UI (el agente no borra datos); sus equivalentes PubMed
      ya están cargados. No cargar PMC ni NCBI Bookshelf.
- [x] ~~**Asignar el deck `APEX::LIVIANO`** en `src/lib/ankiLinks.ts` y la entrada "Academia → Logística F5" en `EmpresaHub.tsx`~~ **RESUELTO 19-sep**
      (`ankiLinks.ts:116` `LIVIANO_ANKI_DECKS` = 8 sub-decks `APEX::LIVIANO::<modulo>` re-exportados de `livianoCasos.ts`; botón «Academia → Logística F5» en
      `LivianoTodayPlan.tsx:375` vía `EmpresaHub.tsx:57`). ⚠ **A VERIFICAR (19-sep) / tuyo:** los 8 sub-decks NO existen aún en Anki (se crean al importar el CSV, 🟠 D16). *(LIVIANO)*
- [x] ~~**Crear la carpeta `DATA/BUSINESS/_kpi/`**~~ **CREADA el 19-sep** (`DATA/BUSINESS/_kpi/README.md`: destino del botón «Exportar JSON» del Cockpit F1, nombre `liviano_kpi_<AAAA>-W<SS>.json`, forma del JSON). **Sigue tuyo:** guardar ahí el JSON cada viernes. *(LIVIANO)*

### LIVIANO · Acceso Perú — las verificaciones DIGEMID

*Átomos D37-D44 (**17 → 26-nov**, fechas releídas de `livianoStudyPlan.ts` el 26-sep, v5.16: D37 mar 17-nov = drill de cifras, D38 mié 18-nov = síntesis M2/protocolo y el módulo ACCESO PERÚ ocupa D39 (jue 19-nov) + D41-D44 (lun 23 → jue 26-nov); caso 7 el vie 13-nov = D35, caso 8 el vie 20-nov = D40 y caso 9 el vie 27-nov = D45). Cierran los 2 pendientes ROJOS desde junio ("Legalidad DIGEMID"
y "Cotización Sterilelabs") y de ellos depende el COGS y el value stack. Regla anti-alucinación: si un dato no aparece, se
escribe `SIN REGISTRO HALLADO (fecha)`.*

- [ ] **D38 · mié 18-nov — Rellenar `LIVIANO_PROTOCOLO_CLINICO_v1.md` §2**: criterio numérico de elegibilidad (Obesity
      Algorithm 2026), panel de labs basales y cadencia, esquema de dosis/intervalos/lavado **solo desde la ficha técnica
      del producto registrado**, definición operativa de "falla a farmacoterapia".
- [ ] **D39 · jue 19-nov — Registro sanitario DIGEMID**: portal público (URL sin verificar), captura fechada de semaglutida
      SC/oral y tirzepatida → columna `registro` de `LIVIANO_ACCESO_PERU` (`empresaData.ts`).
- [ ] **D41 · lun 23-nov — Condición de venta por molécula** → columna `condicion` + flujo receta → farmacia → paciente.
- [ ] **D42 · mar 24-nov — 2 cotizaciones escritas y fechadas** (cadena + independiente) → `precioFarmacia`; recalcular
      el "medicamento 3 m = S/ 3,600" del value stack.
- [ ] **D43 · mié 25-nov — Dictamen de legalidad del magistral** (QF + abogado de salud: **nombres a definir**) +
      cotización Sterilelabs con certificado de análisis por lote → `costoLiviano`, KPI COGS, estado "VERIFICADO".
- [ ] **D44 · jue 26-nov — Tiempo fuera de refrigeración** por producto (ficha técnica) → guion de cadena de frío (v5.16: el caso 8 «post-infarto que solo quiere verse mejor» cae el vie 20-nov, D40, y el caso 9 «lo consigo más barato en una web» el vie 27-nov, D45).

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
      (1) `node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-15 <fecha>` (o `2027-02-12 <fecha>`; v5.16: el default del script es **D1 = 2027-02-15** con `--base 2026-09-28`, offset 92; el mantenimiento llega ampliado hasta el **vie 5-feb = día 92**, el mié 10-feb (día 95) es el **D95 = último día del plan Step 1** y el jue 11-feb (día 96) es el **examen** → propuesta D1 de la intensiva = **vie 12-feb (día 97, el día siguiente al examen, con el pre-test del 2026-II como primera sesión — `gen_encaps_minisim.js --pretest`, default `2027-02-12`) o lun 15-feb (día 98)**; ver ⚪ A; pasar `--base` solo si el D1 del mantenimiento vuelve a moverse) →
      revisar → `execute_sql` + actualizar `study_metrics.exam_date` y `dias_a_examen` (quedó en 205 sin recalcular) +
      Calendar a mano; **NO aplicar el SQL antes**; (2) escribir la fecha en **`DERMA_TAPER_ENCAPS_FECHA`**
      (`src/lib/dermaDailyPlan.ts`, YYYY-MM-DD) para que las sesiones Derma a ±3 hábiles pasen a taper 'encaps' (v5.16, `dermaDailyPlan.ts` d1 = mar 29-sep: si cae
      en la semana del 22-26 mar, los candidatos son d62-d64 (lun 22 rellenos III · mié 24 rellenos IV · vie 26-mar peelings I); en la del 29-mar → 2-abr, d65-d66 (mar 30-mar peelings II · jue 1-abr láser I); d67 lun 5-abr = láser II · d68 mié 7-abr = láser III · d69 vie 9-abr = láser IV · d70 mar 13-abr = microneedling); hasta entonces la pestaña
      Cerebro muestra «hoy null · A VERIFICAR (13-sep)». *(ENCAPS/Derma)*
- [ ] **🎯 DISPARADOR · Resultado del UWSA1 (lun 28-sep).** Si sale **<40 %** → bajar **D2-D10 a 20 Q/día** (protocolo
      Jay; `qDia` en `gen_usmle_v5.js` + regenerar). Lectura por tramos (Palmerton §9.3, +5 %/mes hasta el 22-ene):
      **<40 %** → protocolo Jay · **40-48 %** → llega justo a 65-68 % · **≥48 %** → on-track. La app hoy dice "baseline:
      cualquier valor sirve" y no muestra los tramos (hallazgo #12): **el baseline del 28-sep, no el GO/NO-GO del 22-ene,
      es el verdadero Goldilocks check**. *(USMLE — decisión ⚪ #8)*
- [ ] **Protocolo de burnout (REGLA ya en la app y en README §3b):** la señal numérica (2 hitos consecutivos bajo su
      mínimo on-track → `gateHito` 'ALERTA BURNOUT' + banner) la da la app; **los síntomas los decides tú** (releer sin
      comprender, irritabilidad, indiferencia, descansos que se alargan). Si se activa: 3-5 días solo Anki AM y correr el
      plan con `remap_inicio.js` (cada día parado = +1 hábil; no se recorta temario). *(USMLE)*
- [x] ~~**Antes del 1-feb-2027 · extender las series del Calendar con `UNTIL=20270130`**~~ **RESUELTO el 19-sep con 6 SERIES DE EXTENSIÓN D93-D95** (`create_event`, no `delete`: ANKI AM 05:00 `gfapfa25hm5d9s65n7oiu0jsms` · repaso 07:15 `vi7lrsm2blitpqistrt87i3sqk` · pre-test 08:15 `mlqvrm4m8bn38qfl37qddjgk5g` solo lun 1-feb · DEEP PRIME `39dm9gk3a58u3iqu9lk28noum0` · 30Q `u6alh9h3o43l2fu98gmvkvtk90` · eval 18:00 `r850pocdgcm8pi6a42cvv37v1k` MO,TU); las 9 GYM/BAILE ya llevan etiqueta v5.14 (3 ids nuevos); **ENCAPS 16:15 `papebi46etlo8glgfs5akd5mig` NO se extiende a propósito** (termina el 29-ene; la intensiva lleva serie propia cuando decidas su arranque, ⚪ A). **⚠ v5.16 (26-sep):** las 6 series de extensión USMLE se **RECREARON** para **D88-D93 = lun 1 → lun 8-feb** (`BYDAY=MO,TU,WE,TH,FR`, `UNTIL=20270209T045959Z`; ids nuevos: ANKI AM `3er7vtmrdn3j5ks6r0960s7t10` · repaso `pi1ohr2pp1lb6lse9kj4s0h8s4` · pre-test `a1rdhou6q4ceij26cmkcla3drc` · DEEP PRIME `la2i0lglujcfjavq7ekmi4ks5g` · 30Q `4cip5bq1h7pj4ncbv7hj32nlqs` · eval `gg60as9hffms4cccddjr3fg1t0`; los 7 ids de v5.15 ya no existen), la **EXTENSIÓN ENCAPS** es nueva (lun 1 → vie 5-feb, `0bv3ef0do92mt84pa8es8cbgho`, `UNTIL=20270206T045959Z`) y el **D94 (mar 9-feb)**, el **D95 (mié 10-feb)** y el **examen (jue 11-feb)** van por overlay — detalle en `CALENDAR_SEGMENTOS_V5_6.md` §18. *(v5.15, 22-sep: extensión ENCAPS lun 1 + mar 2-feb; extensiones USMLE en D91-D93.)* *(histórico:)* ⚠ v5.14: el D93 es el lun 1-feb, el D95 el mié 3-feb y el examen el jue 4-feb, así que el `UNTIL` ya no cubre ni D93-D95, ni el examen, ni la intensiva: extender a `20270204` (o más) — son **7 series**, no 2
      (`CALENDAR_SEGMENTOS` §11.2); la **única bloqueante es `16:15 ENCAPS` (`papebi46etlo8glgfs5akd5mig`)** si ENCAPS
      vuelve a bloque principal en feb-mar; `09:00 DEEP PRIME` (`cb2uh20jnvu7pgfev4183pgctc`) también cubre el examen y corta
      el 30-ene. ⚠ `recurrenceData` del MCP está roto para UPDATE → delete(serie) + create. Aprovechar para re-etiquetar las
      **9 series de GYM/BAILE que siguen diciendo "Régimen v5.6"**. *(sistema)*
- [x] ~~**Antes de sembrar la fase intensiva (feb-2027) · la app necesita**~~ **RESUELTO 19-sep en `src/lib/encapsPlan.ts`** (`useEncapsPlan` → `regimenDe()`: el total crece solo con `max(dia)` de `study_schedule`; rama `modo='INTENSIVO'` en `itemsForDay` con `extra.loop` / sims /100 / `repaso` / `drill_cifras`; `simDays` con `pretest` / `sim100` / `dress_rehearsal`; `EncapsPlanView.tsx` pinta los sims /100 y prellena el cierre; probado en seco con 25 filas del generador, nada sembrado — `SISTEMATIZACION_2026-09-19.md` §3). **Sigue tuyo:** las FRANJAS de la intensiva (17:15 choca con LIVIANO; ⚪ «Nuevo 19-sep») y, al sembrar, re-sembrar `study_metrics.extra.horarios` (orquestador). *(histórico:)* `STUDY_TOTAL_DAYS` dinámico (hoy 102 fijo), rama
      `modo='INTENSIVO'` en `itemsForDay` (renderizar `extra.loop` / `sim` / `repaso` / `drill_cifras`) y `simDays` con los
      tipos `pretest` / `sim100` / `dress_rehearsal`. ⚠ El segmento **17:15** del loop heredado **choca con LIVIANO** → fijar
      las franjas en la reestructuración de febrero **antes** de sembrar. *(ENCAPS — asignar a un agente)*
- [ ] **Al usar `--sim100 2025-2 / 2025-1A / 2024-2A` en la intensiva**: **122 ítems** de esos exámenes ya viven en los
      sets del banco del día. Rendirlos **antes** de consumir esos sets, o aceptar el solape. *(ENCAPS)*
- [ ] **Antes del d19 (mié 18-nov) · importar `DATA/DERMATOLOGIA/ANKI_COLA/PLANTILLA_SESION.txt`** en Anki (notetype Basic);
      a partir de ahí copiar la plantilla por sesión (`SESION_dNN_<fecha>.txt`). *(Derma)*
- [ ] **Antes del d45 (mar 2-feb-2027) · decidir y comprar el dermatoscopio de bolsillo** (DermLite o Heine; modelo y
      precio A VERIFICAR en sus webs oficiales) para la fase práctica 2027. *(Derma)*
- [ ] **Vie 12-feb-2027 (= DÍA SIGUIENTE al examen Step 1 en v5.16) · sesión Derma OPCIONAL (d49, segunda pasada parcial III)**: decidir si la
      haces o la saltas (o el swap d43↔taper de ⚪ C); no se pierde contenido en ningún caso. El mié 10-feb (D95 del Step 1, D-1 real) es d48 (parcial II, 1 caso + FSRS); el jue 11-feb (examen) no es día Derma (es Research: R8, d38 → ⚪ K). *(Derma)*
- [ ] **Desde el mar 16-feb-2027 (d50, v5.16) · confirmar en la app que 3 casos/sesión caben en los 45′** con los 10Q como
      variable de ajuste; si no, la alternativa documentada es 2 casos + alargar el ciclo 2 (d74-d103, vie 23-abr → mié 14-jul; sin
      fusionar nada). *(Derma)*
- [ ] **Cotejar las cifras "A VERIFICAR" de las 35 fichas del cerebro clínico** contra el capítulo de AccessDerma citado en
      cada una antes de recitarlas como definitivas: dosis de apraclonidina, % de TCA, mm de microneedling, λ por tinta,
      márgenes de Mohs y de melanoma. *(Derma)*
- [ ] **Vie 5-feb-2027 (última A-unit SYNAPSE, d131 · v5.16) · página oficial de la certificación CCA-F**: no aparece enlazada en
      academy.claude.com ni en anthropic.skilljar.com (12-sep) → localizarla, anotar formato/precio/fecha y decidir la fecha
      post-Step 1 (feb-2027). *(SYNAPSE)*
- [ ] **Post-D89 (mar 2-feb-2027, capstone; v5.16) · revisión por par del protocolo LIVIANO** por un médico con experiencia en
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

### USMLE · decisión del corrimiento v5.12 (15-sep), re-fechada en v5.13, v5.14, v5.15 y **v5.16 (26-sep)** — el examen sigue fuera de la ventana

| # | Decisión | Hoy corre así |
|---|---|---|
| 0 | **El plan de 95 días desborda la ventana 25-29 ene: D95 = mié 10-feb-2027 = último día del plan y D-1 REAL → target JUE 11-FEB-2027.** Con D1 en lunes el D94 (mar 9-feb) es la última sesión de banco, el D95 (mié 10-feb) es una sesión mínima por la mañana + el ritual de test-day por la tarde, y **el examen es al día siguiente: por primera vez no hay fin de semana libre entre el D95 y el examen** (el sáb 6 / dom 7-feb caen dentro del plan, entre D92 y D93 — Palmerton: D-1 sin banco se cumple con el D95). Opciones: **(a)** aceptar el jue 11-feb: agendar/reprogramar en Prometric y **confirmar que el eligibility period cubre el 11-feb** (si no, pedir extensión a ECFMG, con costo) — es lo que hace el plan (`DAILY_META.examenTarget = 2027-02-11`, `descansoD1 = 2027-02-10`); **(b)** rendir dentro de la ventana (≤ vie 29-ene) recortando el sprint final — va contra tu regla de no recortar; **(c)** estudiar sábados para recuperar días y volver a la ventana (también contra el régimen L-V). **Cada día más sin estudiar mueve el examen otro hábil (vie 12-feb, lun 15-feb…) y arrastra la intensiva ENCAPS, el pitch AURUM v5 y el taper Derma.** *(v5.15: examen lun 8-feb con finde 6-7 libre; v5.14: jue 4-feb.)* | (a) · examen jue 11-feb · D94 mar 9-feb (última sesión de banco) · D95 mié 10-feb (último día del plan = víspera) · sin finde libre (`USMLE_TAPER.d94` / `d95` / `dMenos1` / `examen`) |
| 0-bis | **v5.14 lo abrió y v5.15/v5.16 lo mantienen: el contenido cierra el jue 21-ene (D81, Bioquímica día doble) y el NBME 31 GO/NO-GO se rinde AL DÍA SIGUIENTE (vie 22-ene, D82) sin ningún día de banco de consolidación entre medias** (los 2 random timed 2×40Q de la Fase B van en D84 mar 26-ene y D86 jue 28-ene, DESPUÉS del NBME 31; la Fase B es D82-D86 con los 3 NBME dentro: 32 lun 25-ene, 33 mié 27-ene). **Lo que SÍ se mantiene desde v5.15:** como los hitos no están clavados por fecha, el NBME 31 (y todos los demás) conservan su D#, así que **no se comen días de preparación en cada corrimiento**. Opciones: **(a)** aceptar — el NBME 31 mide el estado real al cierre de contenido y la regla del GO exige «2 NBME ≥68 %», así que el 32 y el 33 confirman o revierten; **(b)** trasladar la decisión formal GO/NO-GO al NBME 32 (lun 25-ene, D83) — tampoco gana días de banco; **(c)** cualquier día perdido desde hoy lo agrava (mueve el examen, no el hueco). | (a) · GO/NO-GO en el NBME 31 (`usmleStep1Daily.ts` D82, `HITOS_ONTRACK`) |

### Consecuencias del corrimiento v5.16 en los frentes secundarios (26-sep) — decisiones nuevas y resueltas

| # | Decisión | Hoy corre así |
|---|---|---|
| A | **ENCAPS · el mantenimiento se AMPLIÓ hasta el vie 5-feb (día 92) en vez de perder 3 sesiones** (v5.15: mar 2-feb); los días 93-96 de la cuenta (lun 8 → jue 11-feb) son el cierre del Step 1 + el examen y quedan sin fila. **Propuesta: arrancar la intensiva el vie 12-feb (día 97, el día siguiente al examen, con el pre-test del examen 2026-II como primera sesión — `gen_encaps_minisim.js --pretest`, default `2027-02-12`) o el lun 15-feb (día 98, default del script)** (`node DATA/_scripts/gen_encaps_intensivo_2027.js 2027-02-12 <fecha-examen>` o `… 2027-02-15 …`). El ensayo en seco del 19-sep mostró que arrancar en lunes da semana 1 completa (señales + calentamiento + pre-test del viernes); arrancar el viernes 12 adelanta el pre-test un fin de semana. | SQL de la intensiva NO aplicado; default documentado en `FASE_INTENSIVA_2027-I.md`; nada que ejecutar hasta la convocatoria SERUMS |
| B | ~~Research · CR-9 (SUBMIT del case report #1) cae en la víspera del examen~~ **SIGUE RESUELTA en v5.16:** CR-9 es el **vie 5-feb** (`RESEARCH_HITOS`, d36 = **D92** del Step 1): 4 hábiles antes del examen. **RESUELTA en v5.16 (orden):** con la pausa en **jue 7-ene → mié 3-feb** vuelve a caber R3 antes de la pausa (d33 mar 29-dic): el *spill* de v5.15 desapareció sin tocar `PAUSA`. **NUEVO v5.16 (día del examen): R8 (d38, protocolo PRISMA-P) cae el jue 11-feb = DÍA DEL EXAMEN** → fila K. **Sigue (menor):** X-8, «re-arranque post-Step 1», cae el mar 9-feb (d37 = D94), antes del examen — texto a corregir en `gen_research_plan.js`. **Sigue (externo):** T-1 (mié 14-oct) dice «CEI expedita ≤ 30-sep» y C-6 (vie 30-oct) dice «ventana del journal ≤ 15-oct» (ver el 🔴 de arriba). ⚠ Los 12 overlays 🔬: `_calendar_overlays.json` regenerado el 26-sep con 12 `recrear` — **A VERIFICAR** el `update_event` + `--set` + `--check` = 0. | CR-9 vie 5-feb · R8 jue 11-feb (hasta que decidas K) |
| C | **Derma · el lun 25-ene (NBME 32) es d42 y el mié 27-ene (NBME 33) es d43 = Mohs, sesión NORMAL de 2 casos; el vie 22-ene (NBME 31, GO/NO-GO) es día Research; el vie 12-feb (DÍA SIGUIENTE al examen) es d49 = última sesión del taper (opcional)** (el taper es posicional d44-d49 y con d1 = mar 29-sep va del **vie 29-ene** (Free 120) al **vie 12-feb**; d48 = mié 10-feb = D95 = D-1 real; el ciclo retoma carga completa el mar 16-feb = d50). Alternativa: swap d43↔taper (Mohs al vie 12-feb —tras el examen— y el mié 27-ene en modo taper de 1 caso + FSRS). | d43 normal · taper 29-ene → 12-feb (`DERMA_DAILY_META.taperStep1`) · d49 opcional |
| D | ~~**⚠ LIVIANO · la inversión VUELVE en v5.15: el caso integral 16/16 cae DESPUÉS del capstone.**~~ **RESUELTA SOLA en v5.16 (26-sep):** con D1 en lunes el generador coloca los 16 casos cada 5 días desde el **d5 (vie 2-oct)** y el cierre vuelve al orden de v5.14: **D87 vie 29-ene caso integral 16/16** · **D88 lun 1-feb** repaso integral I · **D89 mar 2-feb capstone** · **D90 mié 3-feb** revisión trimestral II. No hay nada que decidir ni que intercambiar. *(v5.15: caso 16 D90 vie 29-ene tras el capstone D88 mié 27-ene.)* | `livianoStudyPlan.ts` (caso 16 = D87 vie 29-ene, capstone = D89 mar 2-feb) — sin decisión pendiente |
| E | **SYNAPSE · la última A-unit cae el vie 5-feb (`FIN_PLAN = 2027-02-05`, 131 días), D92 del Step 1** — ver la fila SYNAPSE de abajo (mantener o adelantar). ⚠ El texto de esa A-unit sigue diciendo «lun 1-feb en v5.15» (`synapseDailyPlan.ts`): cadena desfasada. | vie 5-feb |
| F | **AURUM · el PITCH v5 (d95) cae el mié 10-feb = D95 = último día del plan Step 1 = VÍSPERA REAL del examen** (en v5.16 ya no hay finde libre en medio): decide si lo grabas ese día (la tarde del D95 es logística de test-day, nada después de las 17:00) o lo adelantas al mar 9-feb (D94). **NUEVO v5.16: el D96 de AURUM cae el jue 11-feb = día del examen** → fila L. | v5 mié 10-feb · D96 jue 11-feb |
| G | **MIR · el mantenimiento (mar 19-ene → mié 7-abr) va en modo REDUCIDO (10Q) hasta el jue 11-feb INCLUSIVE (día del examen, D18 del mantenimiento: 10Q Gastroenterología + Oncología Médica, que además es slot Tier C de la semana 4) y pasa a modo normal el vie 12-feb (D19: viernes 30Q Cardiología)** (`modoReducidoHasta = '2027-02-11'`, 18 días). Decide si el jueves del examen lo dejas reducido (como está) o vacío. | reducido hasta el 11-feb · normal desde el 12-feb |
| I | **MIR · el handoff "entrada a la fase principal" sigue al mantenimiento: cierre mié 7-abr-2027** (v5.15: vie 2-abr; v5.14: mié 31-mar — se amplía para no perder sesiones), así que el 5, 6 y 7 de abril quedan dentro del banqueo con el umbral de banqueo (consolidada 70 % / anclas 55 %). Aplicado por coherencia con la regla del corrimiento: **handoff → mié 7-abr-2027** y la fase principal arranca el **jue 8-abr** (`mirData.ts` `MIR_HITOS.handoff` = `2027-04-07` · `mirEvalLog.ts` `MIR_CIERRE_UMBRAL_FASES` hasta `2027-04-07`; retención FSRS 0,85 → 0,90 desde el 8-abr). Si prefieres una fecha fija por una razón externa (convocatoria, viaje), son 2 líneas. | handoff mié 7-abr · umbral de banqueo hasta el 7-abr inclusive |
| H | **Vibecoding · el flag `deload` sigue desalineado: las semanas post-NBME son S6 (lun 2 → vie 6-nov, tras el NBME 26 del vie 30-oct) y S12 (lun 14 → vie 18-dic, tras el NBME 28 del vie 11-dic), pero el flag lo lleva S7 (lun 9 → vie 13-nov, motor de preguntas ENCAPS)**. Con D1 en lunes los bloques de 5 hábiles **vuelven a coincidir con las semanas de calendario** (SHIP sáb 3-oct … 19-dic). Opciones: swap S6↔S7 en `DATA/SYNAPSE/vibecoding_proyectos.json` o mover el flag a S6 (`gen_vibecoding_plan.js` + `gen_synapse_plan.js`). ⚠ Además `VIBE_TAPER[].nombre/semanaStep1` en `vibecodingPlan.ts` conservan textos de v5.15 (NBME 29 mar 22-dic, UWSA2 mar 12-ene, «lun 8-feb EXAMEN»…) aunque sus fechas ya son v5.16: corregir el JSON fuente al regenerar. | flag en S7 (catálogo, `vibecodingPlan.ts`) · `PROTOCOLO_MODO_MINIMO.md` §4 |
| J | **🔴 Prometric (v5.16)**: agendar/reprogramar el Step 1 al **jue 11-feb-2027** y confirmar que el eligibility period lo cubre (si no: extensión ECFMG con costo, o recortar temario = derogar la regla). Es el mismo 🔴 de arriba; se repite aquí porque cada corrimiento lo mueve. | sin cita confirmada |
| K | **Research · R8 (d38, protocolo PRISMA-P, átomo recortable) cae el jue 11-feb = DÍA DEL EXAMEN Step 1** (X-8, d37, cae el mar 9-feb = D94). Opciones: **(a)** saltarlo (es recortable: no vence nada) · **(b)** moverlo al lun 15-feb (1 línea en `gen_research_plan.js` + regenerar + `gen_research_calendar.js --check`) · **(c)** hacerlo al volver del Prometric (no recomendado). | (a)/(b) a decidir; hoy el plan lo deja el jue 11-feb |
| L | **AURUM · D96 (lección de la F5) cae el jue 11-feb = día del examen**: lección opcional ese día o recuperarla el vie 12-feb; el pitch v5 (D95) es el mié 10-feb (fila F). | opcional / recuperar vie 12-feb |
| M | **ENCAPS · stock del banco (inventario 26-sep, 250 disponibles de 434):** reponer **`set_III-5_2.json`** — III-5 quedó a **0 disponibles** tras el pre-test + el banco del jue 1-oct y la siguiente instancia es el **jue 29-oct (medicina tradicional/complementaria)** — y cubrir los déficits **V-2 179 (1/41 disponibles) · III-5 90 · IV-1+IV-2 72 · IV-6+IV-7 66 · III-8 64 · V-MED 50** (además I-3 165 · II-1 79 · II-4 76 · I-4 76 · II-3 75 · II-5 71 · II-11 67 · II-8 61). Gate §3-bis (clave oficial o compendio/norma con número y año). | sin reposición; ver 🟠 «Reponer stock» |
| N | **Fuera del repo · `D:\agente_estudio\config\fases.json` → `FASE_7.inicio = 2026-09-28`** (v5.15 pedía 2026-09-23; sigue sin aplicar). 1 línea; lo haces tú. | `inicio = 2026-09-21` (o 2026-09-23 si ya lo cambiaste) |

### USMLE · divergencias Palmerton §E que siguen abiertas (las #2, #5 y #7 ya están implementadas)

| # | Decisión | Hoy corre así |
|---|---|---|
| 1 | **Consolidación 11:00 a 20Q permanentes** si en S2-S3 la revisión metodológica no cabe en 60 min (Palmerton §3.4: 10Q + revisión = 60 min). Decidir tras S1-S2 | 30Q (10 pre-test + 20 consolidación) en nivel 1; 40Q desde nivel 2 |
| 3 | **Reformular el GO/NO-GO para que el UWSA2 sea solo informativo** (el UWSA sobreestima; la fecha la decide el NBME). `HITOS_ONTRACK` ya lo trata como 'low risk · solo resistencia'; falta la frase del GO | "2 NBME ≥68 % + UWSA2 low risk" |
| 4 | **Free 120 en Prometric Lima + maratón de resistencia** (Palmerton §8.1 #4: un simulacro más largo que el examen). Única ventana sin tocar franjas: un día de hito de la Fase B — **D85, mié 27-ene** (v5.16; NBME 33 + 3 bloques de *flagged* ≈ 5 h) o **D82, vie 22-ene** (NBME 31) — cediendo Research/Derma/AURUM ese día; `POR_MATERIA` §E dice "un viernes" (en v5.16 el NBME 31 y el Free 120 sí caen en viernes, pero los hitos no están anclados a ese día) → corregirlo al decidir | Solo el Free 120 en D87 (vie 29-ene), en casa |
| 6 | **Mover la eval timed 18:00-18:45 a 12:00-12:45** ("estudiar cansado = 2-4× más lento"; solaparía SYNAPSE 12:30) | 18:00-18:45 |
| 8 | **Si el UWSA1 (lun 28-sep) sale <40 % → D2-D10 a 20Q/día** (tipo Jay). Se decide ese mismo lunes con el % real | Sin regla activa |
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
      colchón consumido desde el 31-ago son **20 días hábiles** (v5.16: 31-ago → 25-sep, ninguno estudiado) — el examen ya salió de la ventana. *(USMLE)*
- [ ] **🔴 EL COLCHÓN SE ROMPIÓ (v5.12, 15-sep; v5.13 y v5.14 lo empeoraron un hábil cada una, v5.15 dos de golpe y v5.16 tres): el examen ya está FUERA de la ventana 25-29 ene (target jue 11-feb) y no hay ningún día de reserva.** Un día más sin
      estudiar mueve el examen al vie 12-feb (y así sucesivamente: cada corrimiento = reprogramar Prometric otra vez, si el eligibility period lo permite) o obliga a
      (a) **recortar temario** (rompe la regla) o (b) **estudiar un sábado** para absorber el día. Decidir la regla ANTES de que ocurra; y desde ya: **agendar
      Prometric para el jue 11-feb + confirmar eligibility** (🔴). *(USMLE — bloqueante)*
- [x] ~~**Decisión (v5.11): el D95 = jue 28-ene ya no es descanso puro sino sesión mínima (D-1 dentro del plan).**~~ **SUPERSEDIDA por v5.12 (15-sep) y REPUESTA por v5.13 (16-sep):** con D1 en jueves el D95 vuelve a ser el D-1 DENTRO del plan (lun 1-feb: sesión mínima AM ≤2 h + ritual de test-day, `USMLE_TAPER.d95`/`dMenos1`), el D94 (vie 29-ene) es la última sesión de banco (`USMLE_TAPER.d94`) y el sáb 30 / dom 31 quedan libres (solo Anki vencido). **v5.14 (19-sep) conserva la estructura con D1 en lunes: D94 mar 2-feb = última sesión de banco, D95 mié 3-feb = D-1 dentro del plan, finde 30-31 ene libre entre D92 y D93.** **v5.15 (22-sep), con D1 en miércoles: D94 jue 4-feb = última sesión de banco, D95 vie 5-feb = D-1 dentro del plan, y el finde libre pasa a ser el sáb 6 / dom 7-feb, ya pegado al examen — el D-1 real de calendario es el domingo 7.** **v5.16 (26-sep), con D1 en lunes: D94 mar 9-feb = última sesión de banco, D95 mié 10-feb = D-1 REAL (víspera), examen jue 11-feb — por primera vez sin fin de semana libre en medio; el sáb 6 / dom 7-feb quedan entre D92 y D93.** Lo que hay que confirmar ahora es la fila 0 (examen jue 11-feb). *(USMLE)*
- [ ] **SYNAPSE · la última A-unit (d131, cierre F2 + CCA-F) cae el VIERNES 5-feb-2027** (v5.16: con D1 en lunes las 19 semanas del motor **vuelven a coincidir con las de calendario** y el plan cierra el vie 5-feb = **D92** del Step 1, último día de la penúltima semana de banco; v5.15: lun 1-feb (d132); v5.14: vie 29-ene; v5.13: mar 26-ene; v5.12: lun 25-ene; v5.11: sáb 23-ene; v5.10: vie 22-ene). Decidir si se mantiene (15' un viernes de sprint) o se adelanta (regenerar con `gen_synapse_plan.js` cambiando el cierre). ⚠ El texto de esa A-unit sigue diciendo «CIERRE F2 (último día del motor, lun 1-feb en v5.15)» aunque la fecha ya es v5.16: cadena desfasada en `synapseDailyPlan.ts`, corregir al regenerar. *(SYNAPSE)*
- [ ] **Puente MIR ↔ Step 1** — Cardiología MIR (D5, **vie 2-oct**) precede a Cardiovascular Step 1 (D6, **lun 5-oct**)
      por 1 hábil; Psiquiatría MIR arranca el **mar 12-ene** (D74) y *Psychiatry & Behavioral* el **mié 13-ene** (D75) — 1 hábil de ventaja (v5.16). Los otros 9 bloques
      quedan entre +7 y +12 días. **Recomendación escrita: NO re-permutar el MIR.** El chip «MIR precedió esta semana» del
      repaso 07:15 ya está en la app. *(USMLE/MIR)*
- [ ] **Materias sin columna vertebral en el corpus Palmerton — decidir la fuente sustituta** *(USMLE)*:
      - **13 días completos**: Micro/ID (D58-D64, **mié 16-dic → jue 24-dic**, justo tras el NBME 28 del vie 11-dic; el vie 18-dic = D60 es el único viernes de nivel 4), MSK/Reuma+Derma (D71, D73-D74:
        **jue 7, lun 11 y mar 12-ene**; el dermato Step 1 va en D74 mar 12-ene; el NBME 30 del vie 8-ene es D72) y Psiquiatría (D75, D76 y D78: **mié 13, jue 14 y lun 18-ene**; el UWSA2 del vie 15-ene es D77) — D# v5.16. Propuesta: **subir el peso del pre-test 10Q de las
        08:15 como FUENTE** y de la *shopping list*; no buscar "el vídeo de Palmerton".
      - **Cardio D8 (mié 7-oct, curvas PV/Wiggers/Starling — nivel 2) y D16 (lun 19-oct, valvulopatías y soplos — cae DESPUÉS del
        NBME 25 del vie 9-oct y del viernes nivel 3 de Cardio, D15 vie 16-oct)**: PV loops, Frank-Starling con retorno venoso, Laplace, maniobras de soplos, S2 y Jones
        **CONFIRMADOS AUSENTES**. ¿Costanzo, B&B o First Aid? Decidir **antes de esa mañana**.
      - **Bioestadística (D79, mar 19-ene-2027)**: el corpus cubre la mitad conceptual pero **no la de cálculo** → repartir
        vídeo+AMBOSS / paquete de stats de UWorld.

### Nuevo 19-sep — lo que los integradores dejaron para ti (default vigente entre paréntesis; detalle en `DATA/SISTEMATIZACION_2026-09-19.md`)

- [ ] **MIR · jueves Tier C REDUCIDOS (v5.16, releído de `mirMantenimiento.ts` el 26-sep: d3 jue 21-ene Traumatología · d8 jue 28-ene Traumatología · d13 jue 4-feb Radiología-Urgencias · d18 jue 11-feb Oncología Médica = DÍA DEL EXAMEN, 10Q — el mantenimiento arranca el mar 19-ene, así que el primer Tier C es su d3 y son 4 en modo reducido)**: las 10Q del día son todas Tier C, sin formulario de la
      asignatura foco (**default**), o 10Q foco + 10Q Tier C (20Q, rompe el «reducido»). *(MIR)*
- [ ] **MIR · pre-test 5Q se lleva las preguntas más recientes del capítulo y el quiz sigue con las siguientes**: en los capítulos con ≤5 usables (D22, D57,
      D60, D66, D4, D33, D48, D52, D53, D55, D58, D62…) el quiz queda 100 % ProMIR. **Default = pre-test primero** (`POOL_USO.md` §2); alternativa: reservar las
      oficiales para el quiz comentado y hacer el pre-test en ProMIR. *(MIR)*
- [ ] **MIR · mini-MIR D77 (vie 15-ene-2027)**: semilla = `dia.fecha` (si el día se corre otra vez la mezcla cambia). **Default = por fecha**; alternativa semilla fija «D77». *(MIR)*
- [ ] **MIR · cuaderno de imágenes fuera del repo** (`node DATA/_scripts/gen_mir_pool.js --descargar --con-imagenes`; leyenda «prohibida la reproducción»): la vista
      marca «🖼 imagen n (cuaderno)» y enlaza el PDF oficial. **Default = no descargar.** *(MIR)*
- [ ] **ENCAPS · FRANJAS de la fase intensiva (feb-mar 2027)**: `extra.loop` hereda las horas del loop USMLE v5.6 (05:00 Anki · 07:15 repaso · 08:15 pre-test ·
      09:00 deep prime · 11:00 30Q · 12:00 cierre · 17:15 anclaje · 18:00 eval) y el 17:15 choca con LIVIANO/Research. **Default = mantener el esqueleto y fijar
      las horas en la reestructuración de febrero** (la app ya muestra «A CONFIRMAR»). *(ENCAPS)*
- [ ] **ENCAPS · umbral del simulacro /100 de la intensiva**: runner 85 % (`ENCAPS_CIEGO_META_PCT`) con alerta <70 %; el pre-test 2026-II usa ≥70 (su fila).
      **Default = 85/70**; si prefieres otro, `ENCAPS_SIM100_META` en `encapsPlan.ts`. *(ENCAPS)*
- [ ] **ENCAPS · fecha real del examen 2027-I (convocatoria SERUMS)** antes de sembrar la intensiva (⛔ el SQL no se aplica hasta entonces) — ya en 🟡; se repite aquí
      porque el arranque (vie 12-feb vs **lun 15-feb**, ⚪ A) depende de ella. *(ENCAPS)*
- [ ] **LIVIANO · los 8 sub-decks `APEX::LIVIANO::*` no existen en Anki** (Anki cerrado el 19-sep): se crean al importar `LIVIANO_mecanismo.csv` (🟠, D16 lun 19-oct) o antes
      a mano. **Default = al importar el CSV.** *(LIVIANO)*
- [ ] **Calendar · series secundarias el jue 11-feb (examen: Research R8, AURUM D96, MIR D18 reducido, vibecoding S20, GYM 19:00) y GYM/BAILE de la víspera (mié 10-feb = D95 = D-1 real, BAILE 19:00-20:30)**: dejarlas (el overlay ya avisa; **default**) o
      vaciarlas a mano. **VERIFICADO el 26-sep (tarde) con `list_events` del jue 11-feb**: aparecen VIBECODING 04:15 (S20 cerró el mié 10), SYNAPSE 12:30 (el motor cerró el vie 5-feb), RESEARCH↔DERMA 13:30 (= R8, decisión K), AURUM 14:15 (= D96, decisión L), MIR 15:15 + 15:30 (día 18 reducido), LIVIANO 17:15 (el plan cerró el mié 3-feb) y GYM/BAILE del jueves; NO aparecen bloques USMLE (extensión hasta el lun 8-feb; D94/D95 solo overlays) ni ENCAPS (cerró el vie 5-feb). Qué vaciar sigue siendo tu decisión. *(sistema)*

### Resto de secciones

- [x] ~~**ENCAPS · convergencia registro ↔ Supabase**~~ **RESUELTA el 19-sep: `node DATA/_scripts/gen_encaps_semana.js --pull [--dry]` existe** (lee `study_progress` fuente `app:cierre`, reconstruye rondas v3 sin duplicar, `_meta.ultimo_pull`; el botón «⎘ línea --cerrar» sigue como respaldo). Flujo: viernes ANTES del cierre semanal `--pull` → `--semana`. *(histórico:)* hoy cada cierre de la app se lleva al registro a mano («⎘ línea
      --cerrar»). El `--pull` propuesto (leer `study_progress` fuente `app:cierre` y reconstruir rondas v3 en
      `_registro_resoluciones.json`) **no existe**: ¿se pide al dueño de `gen_encaps_semana.js` (próxima pasada) o se
      mantiene el botón? `errores_por_tipo` ya trae la ronda v3 completa, es trivial.
- [x] ~~**ENCAPS · el pre-test de arranque volvió a 39/40 reales en v5.12**~~ **RESUELTO en v5.13 (16-sep) y re-verificado en v5.14 (19-sep):** regenerado como `pretest_arranque_2026-09-21.json` (parte 1, lun 21) y `…_2026-09-22.json` (parte 2, mar 22), `_meta.conteos` da **20/20 reales con clave oficial en cada parte, 0 nuevos** (40/40). **v5.15 (22-sep): el pre-test se volvió a regenerar como `…_2026-09-23` (19/20 reales, 1 nuevo en II-3) + `…_2026-09-24` (20/20 reales). v5.16 (26-sep): regenerado otra vez como `…_2026-09-28` (II-3 · V-2 · III-5 · I-3) + `…_2026-09-29` (II-4 · IV-1+IV-2 · I-4 · II-5); las salidas del 23 y del 24-sep ya no existen** — ver 🟠 Lun 28-sep. Nada que decidir. *(ENCAPS)*
- [ ] **ENCAPS · ¿se aplica el override semanal** que propone `gen_encaps_semana.js`? No es automático: revisar el SQL y
      ejecutarlo por `execute_sql`. En las semanas con 4 slots CRÍTICA un tema caliente **solo desplaza a un crítico ya
      dominado** (≥85 %, n≥5); I-3/V-2 intocables; máx. 2 sustituciones. *(decisión semanal, viernes 17:00)*
- [ ] **MIR · el acumulado <50 % pone el tema en 'caliente' pero NO cuenta como evento de fallo** (solo quiz <60 % y slot de
      ancla ✗ suman para el "ajuste obligatorio al 2.º fallo"). Si prefieres que sí cuente, son 2 líneas en `mirTemaEstado`.
- [ ] **MIR · modo "reducido" de enero** — leído de `mirMantenimiento.ts` el 26-sep (v5.16): mantenimiento **57 días, mar 19-ene →
      mié 7-abr-2027** (arranca el mar 19 para no pisar el D78 del lun 18-ene; el fin ya NO está clavado al ENCAPS: se AMPLIÓ otra vez, así que no se pierde ningún slot), `modoReducidoHasta = 2027-02-11` (**18 días** reducidos = solo Anki + 10Q mixtas, hasta el jue 11-feb = día del examen inclusive; 12 jueves con
      Tier C express en las semanas 1-12, el primero jue 21-ene = d3, Traumatología). Si prefieres el bloque completo también en enero, hay que regenerar con esa constante cambiada
      (`gen_mir_mantenimiento.js`). ⚠ El **jue 11-feb (examen Step 1)** es el D18 y el ÚLTIMO día en modo reducido (10Q mixtas Gastroenterología + Oncología Médica; además es el slot Tier C de la semana 4):
      decidir si ese día va reducido o vacío (⚪ G). El primer día en modo normal es el **vie 12-feb (D19: viernes 30Q Cardiología)**. *(MIR)*
- [ ] **Supabase · qué se hace con los backups viejos** — `study_schedule_bk_0906b` sigue existiendo y en total hay **~43
      tablas `study_schedule_bk_*`** con RLS OFF expuestas a la anon key. ¿Se conservan, se borran o se protegen? *(sistema)*
- [ ] **CURVA · decidir el eje de la línea.** `empresaData.ts` dice "Estética & figura / estética corporal médica";
      `estudioPulsoData`, `brandContentPlan` y `CURVA_ACADEMIA.md` la tratan como **hormonal**. **Si Curva es estética
      corporal hay que rehacer el esqueleto.** *(Business — bloqueante para febrero)*
- [ ] **VITALS · 3 decisiones del puente con la Academia**: (a) día del check-in semanal de EA GLP-1 (fijo vs día de
      inyección); (b) base de cálculo de la proteína en `bajo_glp1` (peso actual / ajustado / objetivo; piso **1,2 vs 1,6
      g/kg**); (c) si la foto mensual se guarda en la app. *(VITALS/LIVIANO)*
- [ ] **Research · ¿nov-2026 o feb-2027 para el SUBMIT de la tesis L0?** `RUTA_PUBLICACION_2027.md` §3.1 dice "envío
      feb-2027"; el plan fija **T-8 = lun 7-dic-2026** (v5.16, d26) con el gate CEI + inglés (si falla, cascada a feb-2027 automática).
      Decidir cuál prevalece; si es feb-2027, es 1 línea en el script + regenerar. *(Research)*
- [ ] **AURUM · política de semanas** (leído de `aurumDailyPlan.ts` el 26-sep, v5.16: D1 lun 28-sep → D130 mié 31-mar-2027): las 16
      variantes LIVIANO caen en VIERNES del d40 al d60 (20-nov → 18-dic), el d65 en LUNES 28-dic (deriva por el 25-dic), el d70 en MIÉRCOLES 6-ene (deriva por el 31-dic/1-ene) y en MIÉRCOLES desde el d75 (13-ene … d115 10-mar) — 11 fuera de viernes; PITCH 1-3 en viernes (d15 16-oct · d35 13-nov · d55 11-dic = día del NBME 28),
      PITCH 4-7 en miércoles (d75 13-ene · d95 10-feb · d115 10-mar · d130 31-mar). Se respeta "1 de cada 5 drills". Si quieres viernes
      estrictos, cambiar la política en `gen_aurum_plan.js` (saltar feriados sin desplazar la semana). ⚠ El PITCH v5 (d95) **vuelve a ser la víspera del examen**: cae el **mié 10-feb = D95 = D-1 real del Step 1** (v5.15: vie 5-feb con finde libre; v5.14: mié 3-feb; v5.13: lun 1-feb; v5.12: vie 29-ene). Decidir si lo grabas ese miércoles (antes de las 17:00) o lo adelantas al mar 9-feb — ⚪ F; y el **D96 cae el jue 11-feb = examen** — ⚪ L. *(AURUM)*
- [ ] **Business · los 2 últimos OUTPUT** caen lun 25-ene (S16, cierre, D120) y mar 26-ene-2027 (extra, retro
      del formato L; D121 = último día) porque las lecturas se agotan antes (v5.16, releído el 26-sep: el OUTPUT S14 cae el vie 15-ene = D110, el OUTPUT S15 sí cae en viernes, 22-ene = D117, tras los colchones META lun 18 → jue 21-ene (D113-D116); 121 filas = 84 trabajo + 37 descansos). Si quieres S16 en viernes, añadir
      lecturas META en `plan_pulso_v3_L.json` (el plan lo regenera `gen_business_plan.py`, ya integrado en el remap). *(Business)*
- [ ] **LIVIANO · posición de los drills de cifras** (v5.16, releído de `livianoStudyPlan.ts` el 26-sep: **D37 mar 17-nov · D58 mié 16-dic · D75 mié 13-ene · D88 lun 1-feb** = repaso integral I); el
      análisis pedía D38/D58/D75 y en v5.16 coinciden D58 y D75 (la Síntesis M2 es D38, mié 18-nov). Si prefieres esos D# exactos, mover
      `drill: true` en `liviano_curriculum.json` y regenerar. ✅ La cabecera de `src/lib/livianoScore.ts` ya documenta «D37 · D58 · D75 · D88, v5.16» (verificado el 26-sep). *(LIVIANO — menor)*
- [ ] **Calendar · 6 decisiones personales** (no se cambian horas sin tu OK) *(sistema)*: (a) reponer o no el NAP
      13:15-13:30 (hoy la LECTURA 13:00 ya define una **siesta OPCIONAL ≤20' solo en ÁMBAR**); (b) typo "ALUMUERZO"
      (`summary`); (c) ~~`<br>` escapados en SYNAPSE 12:30 y PC sáb/dom~~ las series SYNAPSE sáb/dom se reescribieron el 19-sep sin `<br>` (12:30 con descripción v5.14; texto literal **A VERIFICAR (19-sep)** con `get_event`); (d) la frase de identidad
      de examen ya está en EKER (frase 6) → ¿basta?; (e) **martes**: ALISTARSE 18:30 recorta 15′ a la Eval 18:00-18:45 →
      ¿cerrar la eval a las 18:30 o mover ALISTARSE?; (f) GYM/BAILE del mar 9-feb (D94) y del mié 10-feb (D95 = D-1 real, víspera del examen del jue 11-feb: BAILE 19:00-20:30 esa noche va contra "nada después de las 17:00, cama 21:00") (ver 🟠 Calendar 1).
- [ ] **Renombrar `DATA/ENCAPS/CALENDAR_SEGMENTOS_V5_6.md` → `_V5_16.md`?** El contenido va por v5.10-v5.16 (12-26 sep), el nombre
      no. Si se renombra, actualizar **en el mismo movimiento** las 8 descripciones del Calendar que lo citan por ruta,
      `CALENDAR_SEGMENTOS_LUNES_VIERNES.md` y la memoria. *(sistema)*
- [x] ~~**Corregir en §0 la frase "los hitos van en viernes"**~~ **RESUELTO el 26-sep (v5.16)**: §0 de `CALENDAR_SEGMENTOS_V5_6.md` dice ahora que los 12 hitos **no están anclados a ningún día de la semana** — corren con el plan conservando su D#; con el D1 en lunes 8 de los 12 vuelven a caer en viernes (NBME 31 **vie 22-ene** · NBME 32 **lun 25-ene** · NBME 33 **mié 27-ene** · Free 120 **vie 29-ene** · UWSA1 = D1, **lun 28-sep**). *(USMLE/sistema)*

---

## Segunda capa — lo que SIGUE ABIERTO de los 65 puntos ciegos (13-sep)

Estado completo gap a gap en `DATA/USMLE/_palmerton_v3_extractos/SEGUNDA_CAPA_ESTADO.md`; **la pasada de integradores del 19-sep está cerrada en
`DATA/SISTEMATIZACION_2026-09-19.md`** (qué se hizo con `fichero:línea`, qué quedó parcial y por qué, qué exige tu decisión). Aquí solo lo abierto, en dos
listas: lo que exige tu decisión o tu sesión (arriba ya está repartido por bloque) y lo que es **cableado de una próxima
pasada de agentes** (no exige decisión; lo dejaron descrito los propios agentes porque el fichero no estaba en su lista).

**Para la próxima pasada de agentes (integrador), sin decisión de Joseph** — **CERRADO el sáb 19-sep-2026** (4 integradores en paralelo; detalle con
`fichero:línea`, lo parcial y su porqué en `DATA/SISTEMATIZACION_2026-09-19.md`; ningún ítem se inventó como cerrado: cada uno se confirmó con `grep`/`git diff`):
- [x] ~~**MIR pool → UI**~~ **RESUELTO 19-sep** (`src/components/study/MirPoolEval.tsx` NUEVO + `MirTodayPlan.tsx` HoyView/MantenimientoView + `DermaTodayPlan.tsx`;
  `qIds` en pre-test 5Q · anclada · cierre 10Q · quiz · mini-MIR 40Q; 2.º `EvalForm` Tier C los jueves + chip `mirMantProximoTierC`; `preguntaPorId` en
  `MirPreguntaVista`; espejo `mir_eval_log.q_ids` verificado en Supabase). → SISTEMATIZACION §1. **4 decisiones nuevas tuyas** (jueves Tier C reducidos ·
  pre-test primero · semilla mini-MIR · cuaderno de imágenes) en ⚪ «Nuevo 19-sep».
- [x] ~~**`DATA/MIR/README.md`** §1 tabla de pesos + aviso ≈80 %~~ **RESUELTO 19-sep** (docs-resto: tabla de las 16 asignaturas fuera del plan y aviso
  «cobertura medida ≈80 %» en la fila D78; §6 quedó en v5.14: 57 días mar 12-ene → mié 31-mar). ⚠ **v5.16: ese §6 y el §6.1 de `CALENDAR_SEGMENTOS_V5_6` siguen desfasados — el mantenimiento es ahora mar 19-ene → mié 7-abr** (v5.15: jue 14-ene → vie 2-abr).
- [x] ~~**Bloque Derma 13:30 ↔ pool MIR**~~ **RESUELTO 19-sep** (`DermaTodayPlan.tsx` › `DermaMirPool`: `poolConFallback(cap.capId, 5, 10, usadas)` +
  `MirPoolEvalCompacta` kind `derma10Q`; sin pool → cae a `DermaMir10Q`). Limpieza opcional (`DermaMir10Q` con prop `qIds`) = orquestador, SISTEMATIZACION §6.
- [x] ~~**`gen_encaps_semana.js --pull`**~~ **RESUELTO 19-sep** (`--pull [--dry] [--desde] [--hasta]`: lee `study_progress` fuente `app:cierre`, reconstruye rondas
  v3, dedup fecha+codigo+tipoRonda, `_meta.ultimo_pull`; probado real y con mock). Flujo: viernes ANTES del cierre semanal `--pull` → `--semana`. **Parcial:** los
  docs ENCAPS (`PROTOCOLO_HORA_MANTENIMIENTO`, `FASE_INTENSIVA_2027-I`) aún no lo describen → orquestador (SISTEMATIZACION §3/§6).
- [x] ~~**Bloque MIR en `gen_revision_semanal.js` y `vibecodingPlan.ts`** (gap MIR 7) + diffs de `vibecoding`~~ **RESUELTO 19-sep salvo una línea**:
  métrica 5 = `jmd-mir-eval-log` ∪ `mir_eval_log` (temas calientes, mantenimiento `mirMantenimiento.ts`); métrica 7 lee `_vibecoding_ship.json`; métrica 3
  `primeraReview`/`primeraReviewEstado` + alarma ≥2 días; `homeBriefing.ts` `STEP1_SEMANAS` ya v5.16 (= 20 semanas, S1 = 28-sep → 2-oct, S20 = 8-12 feb con el examen dentro; `DELOAD_SEMANAS` lunes 2-nov y 14-dic); `CockpitStatusBar` colorea ANKI con `primeraReviewDe`.
  **Parcial:** `gen_revision_semanal.js:450` dice hoy «fuera del rango S1-S12 (23-sep → 15-dic, v5.15)» → en v5.16 debe decir **28-sep → 18-dic** (orquestador, SISTEMATIZACION §6; verificado el 26-sep que sigue en v5.15).
- [x] ~~**`RUTA_PUBLICACION_2027.md` §9** solo lectura~~ **RESUELTO 19-sep** (aviso «SECCIÓN DE SOLO LECTURA … se regenera desde `research_entregables` con `mesaMarkdown()`»).
- [x] ~~**`PROTOCOLO_MODO_MINIMO.md` §4 fila S7**~~ **RESUELTO 14-sep, re-fechado a v5.14 el 19-sep y a v5.15 el 22-sep; en v5.16 (26-sep)** con D1 en lunes los bloques de 5 hábiles vuelven a coincidir con las semanas de calendario, y el deload post-NBME 26 (vie 30-oct) es la semana **S6 (lun 2
  → vie 6-nov)**; el flag `deload` sigue en S7 (lun 9 → vie 13-nov) → decisión ⚪ H (swap S6↔S7 o mover el flag; default vigente: flag en S7). **A VERIFICAR (26-sep)** que `PROTOCOLO_MODO_MINIMO.md` §4 ya cita las fechas v5.16 (fuera de esta pasada documental).
- [x] ~~**Derma keyed por `d` viejo**~~ **RESUELTO 19-sep** (`dermaCerebro.ts` re-anclado a v3 con `dV21` histórico, 35/35 fichas comprobadas con node; `DERMA_DRILL_DIAS`
  eliminado → `DERMA_DRILL_DIAS_V3` derivado de `drillHDPH`; `dermaLedger.ts:225` comentario v3; `obsidianDermaMap.ts` + `build_vault_derma.js` marcados ⚠ HISTÓRICO:
  el vault d44-d70 NO se regenera, `dermaObsUrlDay(dV3)` traduce con el mapa inverso).
- [x] ~~**`CALENDAR_SEGMENTOS_V5_6.md` §6.2/§11.2/§6.1**~~ **RESUELTO 19-sep** (calendar-doc: §6.1 con Derma 73 → 13-abr y MIR 57 → 31-mar; §16 nuevo con los ids
  de la pasada v5.14). **v5.15 (22-sep): Derma 73 → jue 15-abr y MIR 57 → vie 2-abr, pasada de Calendar en §17. v5.16 (26-sep): Derma 73 → mié 21-abr y MIR 57 → mié 7-abr, pasada de Calendar en §18 (§6/§6.1 siguen con los textos literales de v5.14 a propósito)**; el renombrado a `_V5_16.md` sigue siendo tu decisión, ⚪ Resto.
- [x] ~~**Hallazgos del crítico que son código, no decisión**~~ **RESUELTO 19-sep en la app (10 hechos + 9 hechos con resto fuera de ella)** — estado ítem a ítem
  (`→ ESTADO 19-sep:`) en `SEGUNDA_CAPA_ESTADO.md` §3 y resumen en SISTEMATIZACION §2. Hechos: #12 · #26 · #6 · #13 · #27 · #10 · #18 · #19 (3/4) · §12.6-10 ·
  residuos v5.14. Con resto fuera de la app (orquestador, SISTEMATIZACION §6): #11/#27 DDL `usmle_daily_scores.extra JSONB` · #15 `anki_telemetria.js` · #8/#11/#28/#30/#16/#21
  bloques en `REVISION_SEMANAL.md` + README §4b · #14 `UsmleTodayPlan.tsx:264` sin `dia.matType` (el deck `APEX::USMLE::Pharmacology` ya existe en `ankiLinks.ts`) ·
  #5/#17 Calendar (ya hecho por calendar-B). Ninguna decisión nueva.

**Vacíos de la 2.ª capa que siguen sin agente y son tuyos o de un agente futuro:**
- [x] ~~**LIVIANO no mide retención**~~ **RESUELTO 19-sep en la app** (`src/lib/livianoScore.ts` NUEVO: pre-tests 5Q · drills — su cabecera dice D37/D58/D75/D88 y en v5.16 vuelven a ser exactamente esos (verificado el 26-sep; en v5.15 eran D36/D57/D74/D87) — · rúbrica 0-2×4 de los 16 casos,
  localStorage `jmd-liviano-score` + espejo `study_progress` fuente `app:liviano`; deck `APEX::LIVIANO::<modulo>` en `ankiLinks.ts:116`; SISTEMATIZACION §4). **Queda tuyo:**
  importar el CSV (🟠 D16 lun 19-oct) — los 8 sub-decks se crean al importarlo. *(histórico del gap:)* existen los 18 pre-tests de lunes y los 4 drills en
  `livianoStudyPlan.ts`, pero **no hay deck en `ankiLinks.ts` ni score persistido** (`liviano_score`: 0 menciones) → el ✓
  sigue binario. Importar el CSV (🟠) + asignar el deck (🟡) + un agente para el score.
- **Evaluación clínica del paciente con obesidad** (`gaps_v3b_business` #3): `liviano_curriculum.json` tiene 17 menciones
  (anamnesis, comorbilidades, obesogénicos…) dentro de casos, pero **A VERIFICAR (13-sep)** que exista un bloque de días
  dedicado (anamnesis/antropometría/labs basales, SAOS/MASLD/SOP, causas secundarias, embarazo/anticoncepción con GLP-1,
  TCA). Si no, es contenido nuevo para febrero (no se recorta nada del plan vigente). **Sigue A VERIFICAR (19-sep): ningún integrador lo comprobó.**
- **KPIs del Cockpit LIVIANO** (`gaps_v3b_business` #9, parcial): el botón "Exportar JSON" existe; el tracker
  `Metricas_v2` y la hoja `Outputs` del Excel no están en la app (**A VERIFICAR (19-sep)**, sigue abierto); ~~falta la carpeta `_kpi/`~~ **carpeta creada el 19-sep**
  (`DATA/BUSINESS/_kpi/README.md`: nombre `liviano_kpi_<AAAA>-W<SS>.json`, forma del JSON; guardar el export semanal ahí sigue siendo tuyo).
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
  `SEMANAS/overrides_acumulado.json`. **No re-ejecutar** `_encaps_mantenimiento_2027.sql` (bk_0926 existe: es correcto que aborte; bk_0922/0919/0916/… siguen intactos).
- **Pool MIR**: la clasificación se corrige en `_clasificacion_llm/AAAA.json` y se regenera; **nunca se edita
  `mirPreguntasOficiales.ts` ni el raw a mano**. Anti-repetición por `qIds` en `mir_eval_log` (`POOL_USO.md`).
- **NotebookLM es motor de verificación, no fuente**: toda dosis o cifra que devuelva queda "A VERIFICAR" hasta cotejarla
  contra la primaria. Ya se detectaron **4 errores suyos** en el corpus Palmerton y **1 probable fichero inventado**
  (`sistema-respiratorio-yousmle.md`).
- **Taper Derma es POSICIONAL (d44-d49; v5.16: vie 29-ene → vie 12-feb, con d48 mié 10-feb = D95 = D-1 real y d49 vie 12-feb = día SIGUIENTE al examen)**: si un futuro corrimiento mueve el D1, comprobar con
  `dermaVentanaTaper('2027-02-11')` qué d caen en la ventana y repetir el swap si cambian (el remap avisa).
- **Generadores idempotentes**: `remap_inicio.js 2026-09-14` ×2 + los 9 generadores → `git diff` vacío (comprobado el
  13-sep con v5.10; en v5.11 el orquestador corrió `2026-09-15`, en v5.12 `2026-09-16`, en v5.13 `2026-09-17`, en v5.14 `2026-09-21`, en v5.15 `2026-09-23` y en v5.16 `2026-09-28` — idempotencia VERIFICADA el 26-sep por el agente de scripts: segunda pasada de gen_research_plan/gen_vibecoding/gen_synapse/gen_mir_mantenimiento/gen_aurum con diff de fechas = 0). Si un `git diff` aparece tras correrlos, algo cambió de verdad: no lo pises.
- ~~**Cabeceras de comentario desfasadas en `src/lib`**~~ **RESUELTO en v5.13 y re-verificado en v5.14 (19-sep), v5.15 (22-sep) y v5.16 (26-sep, grep):** `mirDailyPlan.ts` línea 3 ya dice "v5.16 · … D1 = lun 2026-09-28 → D78 lun 2027-01-18", `livianoScore.ts` dice "D37 · D58 · D75 · D88, v5.16" y `dermaDailyPlan.ts` ya cita el taper `2027-01-29 → 2027-02-12` con d49 = día siguiente al examen. ⚠ **Siguen con cadenas de v5.15 aunque sus fechas ya son v5.16:** `vibecodingPlan.ts` (`VIBE_TAPER[].nombre/semanaStep1`: «NBME 29 mar 22-dic», «UWSA2 mar 12-ene», «lun 8-feb EXAMEN»…; vienen de `DATA/SYNAPSE/vibecoding_proyectos.json`, cuyo texto `deload` cita aún «lun 26 → vie 30-oct» y «lun 7 → vie 11-dic», de v5.14) y `synapseDailyPlan.ts` («CIERRE F2 … lun 1-feb en v5.15»). *(sistema)*
