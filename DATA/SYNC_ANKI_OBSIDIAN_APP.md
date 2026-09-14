# Sincronización Anki ↔ Obsidian ↔ App — verificación (10-jun-2026)

> Verificado EN VIVO vía AnkiConnect (localhost:8765, Anki abierto) contra el vault
> `D:\JOSEPH\Vault_Medicina MIR_Joseph` y la data de la app. **Regla de oro: la
> nomenclatura de Anki es la canónica (subtema_mapping.json) — NO crear variantes.**

## Resultado por examen

| Examen | Anki (real) | Vault | App | Estado |
|--------|-------------|-------|-----|--------|
| **ENCAPS** | `APEX::ENCAPS::<bloque>::<NN_subtema>` — 94 sub-decks (+5 bloques) | 94 carpetas | encapsBlocks.ts 94 | ✅ **94/94 nombre por nombre EXACTO** |
| **MIR** | `APEX::MIR::<apex_lowercase>` — solo `cardiologia` creado | 30 asignaturas / 336 caps | mirDailyPlan 12 asig. | ✅ por diseño: creación **lazy** (el motor crea el sub-deck al primer APEX de la asignatura) |
| **USMLE** | `APEX::USMLE::<Tag_PascalCase>` — 8 creados: Biostatistics, Cardiology, Gastroenterology, Immunology, Microbiology, Pathology, Pharmacology, Pulmonology | 19 sistemas / 63 subtopics | usmleStep1Daily 70 días | ✅ los 8 ∈ los 44 tags canónicos; lazy para el resto |
| **Derma** | **`Dermki`** (deck pagado): 00_Instructions, 01_Basic_Science, 02_Dermatopharmacology, 03_General_Dermatology, 04_Pediatric_Dermatology, 05_Infectious_Disease, 06_Neoplastic_Dermatology, 07_Dermatopathology, 08_Dermatologic_Surgery, 09_Cosmetic_Dermatology, 10_Cutaneous_Manifestations_of_Internal_Disease_and_Metastases, 11_Epidemiology,Statistics,Study_Design,and_Public_Health_Principles, AAD_Basic_Curriculum | rama `07_DERMATOLOGIA` PENDIENTE (chat Derma) | dermaDailyPlan 68 átomos | 🟡 Anki listo (pagado); falta rama vault |
| **Research** | sin decks aún | `04_INVESTIGACIÓN/01_LINEAS` (9 líneas) + 2 SR ✓ | researchDailyPlan ✓ | 🟡 decks Palmerton por definir cuando haya términos |
| **Business** | sin decks aún | `02_EMPRESA FINANZAS` (estructura previa) | businessStudyPlan 96 días | 🟡 ídem |

## Hallazgos (sin duplicados, sin variantes)
- ✅ Cero duplicados y cero variantes de nombre entre los 3 sistemas.
- ⚠️ **Artefactos de test del motor** (reportados, NO eliminados — decisión del usuario):
  decks `APEX::MIR::cardiologia::99_TEST_v2_3_setup` y `APEX::ENCAPS::salud_publica::99_test_v2_3_setup`
  (la versión vault de estos tests ya está archivada en `z_ARCHIVO_MOTOR_APEX/`).
- Decks legacy útiles que conviven: `ENCAPS by Jaflo 2026` (B1-B5), `MEDICINA::*` (MIR antiguo),
  `1º-4º VUELTA`, `AnKing Step Deck`, `4000 Essential English Words`.

## Cómo enlaza la app (src/lib/ankiLinks.ts)
- USMLE: sistema del día → tag canónico (`Cardiovascular→Cardiology`, `Respiratory→Pulmonology`,
  `Hematology & Oncology→Hematology_Oncology`…). MIR: asignatura → apex_lowercase
  (**OJO: `Gastroenterología→digestivo`**, el tag clínico histórico). ENCAPS: bloque+subtema
  exactos. Derma: `Dermki`. El botón abre AnkiWeb; el nombre del deck se muestra como texto.
- Los matchers de título ENCAPS viven en `src/lib/obsidianEncaps.ts` (encapsMatch).

## Para futuros chats
- NO renombrar ni crear decks fuera de la convención. Anki debe estar abierto para AnkiConnect.
- Si el motor empieza a rutear MIR/USMLE a nivel subtema (carpetas ya pre-creadas en el vault),
  los sub-decks correspondientes se crean en ese momento — mantener slugs idénticos a las carpetas.

---

## Telemetría Anki (v5.7 · 5-sep-2026) — due · backlog · retención · regla del finde

> Vacío detectado (Palmerton v3): nada leía AnkiConnect aunque está disponible; la alarma G "capar u omitir
> revisiones vencidas → avalancha" no tenía detector; el Anki de sáb (19:00, 30') y dom (17:00, 15') se
> dimensionaba a reloj. Con ≤10 nuevas/día + tarjetas de gaps, para noviembre las due diarias rondarán
> 150-250: 15' el domingo garantiza backlog el lunes y rompe la "regla del 100 %" (revisar a diario, cero backlog).

### Script: `node DATA/_scripts/anki_telemetria.js`
- Requisitos: Anki abierto + add-on AnkiConnect (2055492159) en `localhost:8765`. Sin dependencias. Node ≥ 18.
- Mide sobre `deck:APEX::USMLE*` (cambiable con `--query`): total · maduras (ivl ≥ 21) · nuevas disponibles ·
  suspendidas · **due hoy** · **backlog** (`is:due prop:due<0`, vencidas de días anteriores) · revisadas hoy
  (deck y colección) · % Again de hoy · **retención 30 d** = 1 − Again/revisiones tipo *review*
  (`getReviewsOfCards`; si la versión no lo soporta, aproximación card-level `rated:30` vs `rated:30:1`) ·
  config del deck (`getDeckConfig`: nuevas/día y *desired retention* si la versión lo expone).
- Escribe (append idempotente por fecha) `DATA/USMLE/_anki_telemetria.json` e imprime el one-liner
  `localStorage.setItem('jmd-anki-telemetria', …)` para el KPI del Home.
- **Tolerante a Anki cerrado**: imprime "Anki cerrado" y sale 0 sin escribir (`--registrar-cerrado` deja constancia).
- **KPI en la app**: `CockpitStatusBar` → instrumento **ANKI** = `due N · back N · retención %` leído de
  `localStorage 'jmd-anki-telemetria'` (en web intenta además `/anki_telemetria.json` si se sirve). Si backlog > 100
  o retención < 85 % el instrumento pasa a coral **"ANKI · ⚠ avalancha"** (alarma G).
- **Revisión semanal** (`gen_revision_semanal.js`, métrica 3): media de due, último backlog, retención y `minFinde`.
- Automatizar (decisión de Joseph; NO se ha creado): tarea programada de Windows a las 21:05 con Anki abierto, p. ej.
  `schtasks /create /tn "JMD Anki telemetria" /tr "node D:\joseph-md-app\DATA\_scripts\anki_telemetria.js" /sc daily /st 21:05`,
  o un hook `SessionEnd` de Claude Code. Es el proyecto **S2 del vibecoding** (14-18 sep).

### Regla operativa: **Anki de sáb/dom = due × 20 s** (dato, no reloj)
- Los eventos del Calendar (sáb 19:00 · dom 17:00) son el *hueco*; su **duración la fija el número** que imprime el
  script (`minFinde`) el viernes por la noche o en la revisión del sábado 07:15.
- Ejemplos: 60 due → 20' · 90 → 30' · 150 → 50' · 240 → 80'. Si `minFinde` > 90', el problema no es el finde:
  es el backlog entre semana → alarma G → **cero nuevas hasta backlog < 20**, nunca capar revisiones.
- La regla de 20 s/tarjeta es la media Palmerton para tarjetas de MECANISMO ya maduras; ajustar con `--seg` cuando
  la telemetría muestre el tiempo real (Anki Stats → "Review time"). **No tocar el Calendar** por esto: solo se
  alarga/acorta la sesión dentro del hueco (si un finde necesita > 60', avisar en la revisión semanal).

---

## Diario USMLE en Obsidian (v5.10 · 12-sep-2026) — la nota del día en 60 s

> Vacío 6 de gaps_v3b_synapse.json: `01_USMLE/_template_day_usmle.md` seguía en `PHASE_4_ENCAPS_DOMINANT` con un bloque
> "16:30-17:15 USMLE low intensity", usaba sintaxis Templater (`<%* %>`) **que el vault no tiene instalado** (plugins reales
> en `.obsidian-desktop`: calendar · dataview · tasks · quickadd; `community-plugins.json` = `[]`), y `05_DIARY` tenía 0 notas.
> Era el ÚNICO sitio con la taxonomía Palmerton por pregunta (T1/T2/T3) y no había "Accountability Mirror" nocturno ni input
> humano para la revisión semanal.

### Qué hay ahora (vault `D:\JOSEPH\Vault_Medicina MIR_Joseph`)
- **`01_USMLE/_template_day_usmle.md`** — plantilla **plana** (core *Templates*, carpeta `09_PLANTILLAS` configurada; `{{date:YYYY-MM-DD}}`),
  sin Templater. Frontmatter YAML plano que Obsidian muestra como propiedades (booleanos = casillas):
  `date · day_of_week · exam · type: study_day · regimen: v5.11 · d_num · tema` · bloques `b0500_anki · b0715_repaso · b0815_pretest ·
  b0900_deep_prime · b1100_consolidacion · b1800_eval` · `pretest10 · q30_pct · eval_pct · error_dominante` (taxonomía v3:
  CONCEPTO/OLVIDO/CRONOLOGIA/CCSN/CONTEXTO/CAMBIO/TIEMPO/LECTURA) · `sueno_h` · `modo` (VERDE/ÁMBAR/ROJO) · **5 casillas
  `burnout_ciego_cae · burnout_releer · burnout_sueno · burnout_cinismo · burnout_gym`** (DOCTRINA §6) · `evite_hoy` (espejo Goggins).
  Cuerpo: tabla de bloques, números del día, **tabla T1/T2/T3 conservada** (con equivalencia a los tipos antiguos Context/Chronology/
  CCSN/Concept/Forgotten/Terminology), checklist de burnout, espejo, dataview de APEX del día, mañana. Referencia cruzada:
  `09_PLANTILLAS/Plantilla_Revision_Errores.md` para la revisión larga de un error.
- **`01_USMLE/05_DIARY/<YYYY-MM-DD>.md`** — una nota por día L-V. **Se crea en el cierre 18:25-18:45** (tras corregir la eval de las
  18:00, franja que el evento ya reservaba a "log de errores") y **se completa en 60 s** desde el panel de propiedades. La tabla de
  preguntas solo si hubo fallos que valgan una tarjeta.
- **`01_USMLE/00_DASHBOARD_USMLE/Dashboard_USMLE.md`** — nueva sección "📆 Semana del Step 1": dataview de los últimos 7 días
  (D#, tema, pre/10, 30Q %, eval %, error, sueño, modo, nº de señales §6, evité), dataviewjs con medias de la semana en curso y
  on-track (pre-test ≥ 5 · 30Q ≥ 65 · eval ≥ 60 · sueño ≥ 7 h · ≤ 1 ÁMBAR · 0 señales) y lista de señales de burnout de 14 días.
  Requiere el plugin **Dataview activado** (está instalado; A VERIFICAR (12-sep) que esté habilitado en `community-plugins.json`).
- **`DATA/_scripts/gen_revision_semanal.js`** parsea el frontmatter de `05_DIARY` (`--vault <ruta>` o env `JMD_VAULT`; default
  el vault de arriba): fallback de la métrica 1 (si no hay `jmd-usmle-scores`), de la 8 (sueño, si VITALS no responde), de la 9
  (modo) y alarma **BURNOUT** en la 10. Probado el 12-sep con 2 notas de prueba (`5,5` → 5.5 h; `ÁMBAR` → AMBAR; casillas true/false).

### Receta diaria (18:25, 60 s)
1. `Ctrl+N` en `01_USMLE/05_DIARY` → nombre `YYYY-MM-DD` → *Insertar plantilla* → `_template_day_usmle`.
2. Propiedades: marcar los bloques hechos · `pretest10` / `q30_pct` / `eval_pct` · `error_dominante` · `sueno_h` de anoche · `modo`.
3. Las 5 casillas `burnout_*` sin maquillaje (≥ 1 → mañana ÁMBAR; `burnout_gym` → ROJO conductual). `evite_hoy` en una línea.
4. Cerrar. En el 🚗 VIAJE VUELTA 20:30 se repiten en voz alta las 5 señales (descripción del evento). El sábado 07:15 el script las cuenta.

### Lo que NO cambia
- No se borró ninguna nota del vault (05_DIARY estaba vacío; la plantilla vieja se reemplazó, no se archivó: su contenido útil —
  tabla T1/T2/T3 y tipos de error — está dentro de la nueva).
- El motor APEX (`#apex-import`, dataview de tarjetas) sigue igual; la nota del día solo lo enlaza.
- La app no lee el vault (regla: la app solo lee/escribe Supabase); el puente es el script de la revisión semanal.

---

### Verificación D2-D3 (mié 16 / jue 17-sep-2026 · primeros días de contenido, setup FSRS en D3; el D1 mar 15-sep es el UWSA1 · v5.11) — A VERIFICAR (16-sep)
1. Anki → Preferencias → Repaso → **FSRS activado** (colección completa).
2. Preset del deck `APEX::USMLE` (y sub-decks): **desired retention 0.90** · **nuevas/día = 10** · sin límite artificial
   de repasos/día (dejar 9999) · "Optimize" de parámetros FSRS solo cuando haya ≥ 1.000 revisiones (mediados de oct).
3. Correr `node DATA/_scripts/anki_telemetria.js`: la sección `config` debe mostrar `nuevasPorDia 10` y
   `desiredRetention 0.9`; si la versión de AnkiConnect no expone *desiredRetention*, comprobarlo en la UI y anotarlo aquí.
4. Contrastar `due/backlog/revisadasHoy` con la pantalla Stats de Anki (±5 %). Anotar la fecha de verificación en esta línea.
5. Pegar el one-liner en la consola de la app y comprobar el instrumento ANKI del cockpit.

---

## Puente MIR ↔ USMLE ↔ Derma en Anki (12-sep-2026) — tag compartido `sys::<sistema>` · tag `step1` · handoff 31-mar-2027

> Vacío cerrado (gaps v3b mir #9 y derma #6): las tarjetas de mecanismo del USMLE y las de clínica del MIR no
> compartían ninguna etiqueta, así que en abr-2027 (fase principal MIR) no había forma de filtrar "todo lo de
> Cardiovascular" sin resetear ni reorganizar mazos. Palmerton (Med School Anki FAQ · "I Haven't Had to Re-Learn
> Anything"): **nunca resetear el mazo, etiquetar por sistema orgánico, suspender quirúrgicamente lo que no aplique.**
> Código: `src/lib/ankiLinks.ts` → `sysTag(system)`, `sysFilteredQuery(system)`, `SYS_TAGS`, `DERMA_STEP1_TAG/QUERY`.

### Convención (no crea decks nuevos; solo TAGS)
| Origen | Deck (igual que antes) | Tag compartido (NUEVO) | De dónde sale el sistema |
|--------|------------------------|------------------------|--------------------------|
| USMLE (motor APEX, tarjetas de mecanismo) | `APEX::USMLE::<Tag_PascalCase>` | `sys::<UsmleSystem>` | `DIAS[].system` de `usmleStep1Daily.ts` (`sysTag(dia.system)`) |
| MIR (APEX-MIR) | `APEX::MIR::<apex_lowercase>` | `sys::<UsmleSystem>` | `MIR_DIAS[].usmleSystem` de `mirDailyPlan.ts` (`sysTag(dia.usmleSystem)`; `—` → `sys::General`) |
| Derma (Palmerton-Mecanismo) | `APEX::DERMA::<bloque>` | `step1 sys::Dermatology` **solo** si el átomo lleva `step1: true` (`dermaAnkiTags`) | `DiaDerma.step1` / `DERMA_STEP1_DIAS` (d7 · d8 · d10 · d12 · d14 · d16 · d23 · d24) |

Slugs (Anki separa tags por espacio → sin espacios ni símbolos): `sys::Cardiovascular` · `sys::Respiratory` ·
`sys::Renal` · `sys::Gastrointestinal` · `sys::Endocrine` · `sys::Nervous_System` · `sys::Hematology_Oncology` ·
`sys::Microbiology_ID` · `sys::Reproductive` · `sys::Musculoskeletal_Rheum` · `sys::Psychiatry_Behavioral` ·
`sys::Biochemistry` · `sys::Immunology` · `sys::Fundamentos` · `sys::Biostats_Epi` · `sys::Ethics_Behavioral` ·
`sys::Dermatology`. Lo devuelve `SYS_TAGS` (para el checklist de arranque).

### `MIR_DECK` ampliado — ⚠ A VERIFICAR (12-sep)
`Epidemiología → APEX::MIR::epidemiologia` · `Medicina Legal y Bioética → APEX::MIR::bioetica` ·
`Dermatología → APEX::MIR::dermatologia`. Anki estaba **cerrado** al escribirlo (localhost:8765 sin respuesta): comprobar
con AnkiConnect `deckNames` que, cuando el motor cree esos sub-decks (creación lazy al primer APEX), el slug coincide con la
carpeta del vault `03_MIR` correspondiente; si el vault usa otro slug, corregir `MIR_DECK`, **no** crear variantes en Anki.

### Receta del handoff (31-mar-2027 · fin del mantenimiento Step 1 → MIR principal en abril)
1. **No resetear nada.** El mazo `APEX::USMLE` sigue vivo con FSRS; solo cambia lo que se REVISA.
2. **Filtered deck por sistema = MIR + USMLE**: Herramientas → Crear mazo filtrado → búsqueda
   `tag:sys::Cardiovascular (deck:APEX::USMLE OR deck:APEX::MIR)` (= `sysFilteredQuery('Cardiovascular')`) · orden "vencidas
   primero" · **reprogramar según las respuestas** activado (no rompe el historial FSRS). Un filtered deck por sistema de
   la semana MIR; se vacía al cerrar la semana (las tarjetas vuelven a su mazo con su intervalo intacto).
3. **Suspender quirúrgicamente, no borrar**: al abrir la fase MIR, suspender (`Ctrl+J`) `tag:sys::Biochemistry` y las
   tarjetas `deck:APEX::USMLE tag:sys::Fundamentos` que sean rutas metabólicas puras (bajo ROI MIR); nunca suspender
   por deck entero. Antes de un Step 2 CK futuro se des-suspenden con la misma búsqueda.
4. **Derma cuenta doble**: `deck:APEX::DERMA tag:step1` es el repaso anclado del D73 (jue 24-dic, "dermato Step 1") y en
   abril entra al filtered deck de `sys::Dermatology` junto con `APEX::MIR::dermatologia`.
5. **Verificación** (AnkiConnect, Anki abierto): `findCards` con `tag:sys::*` debe devolver >0 en `APEX::USMLE` desde S1 y
   en `APEX::MIR` desde la primera semana con APEX; anotar aquí la fecha de la primera verificación. Mientras el motor
   APEX no ponga el tag automáticamente, se añade a mano en el editor (campo Tags) — es un tag, no un deck.
