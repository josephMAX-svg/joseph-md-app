# 🎴 ANKI_COLA · Derma (PLAN ÉLITE v2.1 · 5-sep-2026)

Cola de tarjetas del método Palmerton para el bloque Derma (13:30-14:15, interdiario). Un solo
sistema FSRS con Step 1: las tarjetas Derma se distinguen por **deck + tag**, no por otro perfil.

## Estructura en Anki (nombres exactos — `src/lib/ankiLinks.ts`)
| Qué | Nombre | Estado |
|---|---|---|
| Raíz | `APEX::DERMA` | A VERIFICAR (05-sep): crear en Anki escritorio antes del d1 (7-sep) |
| Sub-decks (10) | `APEX::DERMA::A` … `::B ::C ::D ::E ::F ::G ::H ::Z ::X` | A VERIFICAR (05-sep): crear los 10 (o `createDeck` vía AnkiConnect) |
| Nota de mecanismo | `Palmerton-Mecanismo` — se importa como **Basic** (Front/Back) | el reverso lleva 3 líneas: `POR QUÉ · CCSN · FUENTE` |
| Oclusión de imagen | notetype nativo **Image Occlusion** (Anki ≥ 23.10) | se crea desde *Añadir → Image Occlusion*, NO por TSV |
| Dermki (pagado) | `Dermki` → capítulo del tema (pista por bloque `dermkiPista(bKey)`) | nombres de sub-deck A VERIFICAR con AnkiConnect `deckNames` |

## Flujo por sesión (paso ④ del caso ciego, 13:36-13:52)
1. Tras leer la discusión del caso: **1-2 tarjetas de MECANISMO** ("¿por qué esta enfermedad produce
   este hallazgo?") — nunca un dato suelto. Frente = pregunta de mecanismo; reverso = `POR QUÉ: … · CCSN: … · FUENTE: …`.
2. **1 oclusión de imagen** por caso: captura PERSONAL de la lámina de AccessDerma → *Añadir → Image
   Occlusion* → deck del bloque → ocultar SOLO el rasgo discriminador (borde perlado, collarete,
   umbilicación…), no el diagnóstico escrito. La imagen vive únicamente en tu colección de Anki
   (uso privado): **no se re-hostea en la app, ni en Drive compartido, ni en el vault** (DermNet es CC BY-NC-ND).
3. Tags: `derma::<bloque> dNN mecanismo|oclusion caso-<id> core-<Med|Path|Peds|Surg>` (helper `dermaAnkiTags`).
4. Guardar la sesión como `SESION_dNN_<fecha>.txt` copiando `PLANTILLA_SESION.txt` (misma cabecera) o
   generándolo desde la app (`dermaAnkiTsv(tarjetas)`), y **Archivo → Importar** en Anki escritorio
   (separador tab, HTML off, deck en columna 3, tags en columna 4).

## PLANTILLA_SESION.txt
- Es importable tal cual: cabecera `#separator/#html/#deck column/#tags column/#columns` + 4 tarjetas
  REALES de d19-d20 (oclusión vascular/HDPH y ceguera) verificadas contra DeLorenzi 2017 (abstract,
  PMID 28333326) y Goodman 2020 (PMC7427155) el 05-sep-2026. Sirven de modelo del formato Palmerton.
- Para una sesión nueva: copiar el fichero, borrar las filas de ejemplo (ya importadas el d19/d20) y
  añadir 1 fila por tarjeta. Sin líneas de comentario dentro de los datos (solo la cabecera `#`).
- Las cifras clínicas (UI de hialuronidasa por área, intervalos exactos) NO se escriben en una tarjeta
  hasta verificarlas en la fuente primaria (regla SPEC §8 `verify`): el ledger y `dermaCerebro.ts`
  las llevan como "A VERIFICAR".

## Relación con el ledger
`src/lib/dermaLedger.ts` (localStorage `jmd-derma-casos` / `jmd-derma-fallos`) registra acierto/fallo,
módulo CORE y tipo de error por caso; los fallos son la lista de la **2ª pasada FSRS (d69)** y el
`exportLedgerJSON()` del d70 vuelca a `DATA/DERMATOLOGIA/TRACKING/_registro_derma.json`.
