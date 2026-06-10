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
