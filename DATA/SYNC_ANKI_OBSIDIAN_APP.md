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

### Verificación D1-D2 (lun 7 / mar 8-sep-2026 · setup FSRS) — A VERIFICAR (7-sep)
1. Anki → Preferencias → Repaso → **FSRS activado** (colección completa).
2. Preset del deck `APEX::USMLE` (y sub-decks): **desired retention 0.90** · **nuevas/día = 10** · sin límite artificial
   de repasos/día (dejar 9999) · "Optimize" de parámetros FSRS solo cuando haya ≥ 1.000 revisiones (mediados de oct).
3. Correr `node DATA/_scripts/anki_telemetria.js`: la sección `config` debe mostrar `nuevasPorDia 10` y
   `desiredRetention 0.9`; si la versión de AnkiConnect no expone *desiredRetention*, comprobarlo en la UI y anotarlo aquí.
4. Contrastar `due/backlog/revisadasHoy` con la pantalla Stats de Anki (±5 %). Anotar la fecha de verificación en esta línea.
5. Pegar el one-liner en la consola de la app y comprobar el instrumento ANKI del cockpit.
