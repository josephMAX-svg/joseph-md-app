# 🗄️ ARCHIVO — pronósticos ENCAPS 2026-II SUPERADOS (no usar)

> Archivados el 01-jul-2026. Son **generaciones previas del pronóstico** que quedaron obsoletas.
> **NO leer estos para generar preguntas ni para estudiar.** La fuente única de verdad vigente está en la carpeta padre:
> `../PRONOSTICO_WALKFORWARD_2026-2_v2.md` (pronóstico) + `../INDICE_FUENTE_UNICA_2026-2.md` (índice maestro).

## Por qué se archivó cada uno

| Archivo | Generación | Por qué quedó obsoleto |
|---|---|---|
| `_pronostico_2026_2.json` | 1ª (24-jun) | Backtest y forecast más viejo: **I 29 · II 28 · V 21 · III 16 · IV 6**. Ponía a I (Salud Pública) como área rey y a I-5+I-6 (bioestadística) como CRÍTICA. Ambas cosas son falsas hoy. |
| `README_RENTABILIDAD_2026-2.md` | 1ª (24-jun) | "Índice maestro" que propagaba ese forecast viejo (I rey, I-5+I-6 crítico, CI+SP ~57%). Reemplazado por `../INDICE_FUENTE_UNICA_2026-2.md`. |
| `PRONOSTICO_WALKFORWARD_FABLE5.md` | 2ª (01-jul, intermedia) | Corrigió a II-rey (II 31), pero sobreponderó V (26) y su lista de críticos aún incluía V-MED y omitía II-8/II-11. El propio walk-forward v2 dice "**Supersede a este**". |
| `_pronostico_2026_2_FABLE5.json` | 2ª (01-jul) | Data de clasificación pregunta-por-pregunta que respalda al FABLE5.md. **Validada y actualizada** por la reclasificación fresca de los 6 exámenes (01-jul, 2 corridas de workflow). Se conserva aquí solo como referencia granular; los conteos vigentes están en la v2 y el índice. |

## Qué cambió (viejo → vigente)

- **Áreas:** I 29·II 28·V 21·III 16·IV 6  →  **II 33·I 27·V 23·III 13·IV 4** (II es el REY, no I; IV colapsó).
- **Críticos:** I-3·V-2·**I-5+I-6**·II-3  →  **I-3·V-2·II-3·II-1·II-11·III-5** (I-5+I-6 degradados: I-6 bioestadística casi extinta bajo formato viñeta; I-5 solo media).
- **Formato:** el examen viró a **viñeta clínica ~90%** (serie 42→54→83→94%). Practicar con casos, no teoría suelta.
- **Fechas:** D1 = jue 02-jul · 43 días · examen FIJO jue 20-ago.

Ver el detalle en `../INDICE_FUENTE_UNICA_2026-2.md`.
