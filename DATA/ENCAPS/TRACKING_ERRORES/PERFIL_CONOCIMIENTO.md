# 👤 PERFIL DE CONOCIMIENTO — Joseph (ENCAPS 2027-I) · GENERADO 2026-09-12

> **GENERADO por `DATA/_scripts/gen_encaps_semana.js --perfil` desde `_registro_resoluciones.json` (resumen_por_subtema + rondas). NO editar a mano:** se reescribe tras cada `--cerrar`, cada cierre semanal y cada `--perfil`. Base de datos SOBRE JOSEPH (separada de la doctrina de métodos: `../CONOCIMIENTO/METODO_PALMERTON_Y_MEMORIA.md`). Métrica que manda: **% CIEGO REAL = correctas SEGURAS / total** (dudosas y adivinadas NO cuentan). Metas: ≥85 % (≈17/20) · crucero ≥75 % · mini-sim ≥18/25.

## Estado global
- Rondas ENCAPS registradas: **2** (warmup_20q 1 · warmup_d1 1) · última: 2026-07-28.
- Preguntas resueltas: **40** · seguras 16 · **% ciego global 40 %**.
- Códigos con medición ciega: **1** de 16 del ciclo + 17 de cola larga · críticos v3 medidos: 1/8 · con n ≥ 5 (cuentan para el override): 1.
- Regla del override semanal (gen_encaps_semana.js): un código solo entra en «calientes» con **n ≥ 5**. El **pre-test de arranque** (mar 15 y mié 16-sep-2026, 5Q × 8 críticos, ítems reales 2024-2A→2025-2) es la línea base ciega por crítico: el **primer override calculado con n ≥ 5 en los 8 críticos es el de la semana del 21-sep-2026** (cierre semanal del vie 18-sep).

## Mapa de dominio por código (resumen_por_subtema)
| Código | Rol v3 | Rondas | Q | Seguras | Dudosas | Fallos | % ciego | Estado | k / t / p | Última | Nota |
|---|---|---|---|---|---|---|---|---|---|---|---|
| I-3 | CRÍTICO ★ | 2 | 40 | 16 | 4 | 20 | **40 %** | 🔴 CRITICO-debil | 10 / 10 / 0 | 2026-07-28 | 4 aciertos con confianza baja = 3 posibles suerte; patron CCSN (inversiones activa/pasiva, letalidad/mortalidad, EESS/DIRESA, VPP/oportunidad) |

k / t / p = fallos knowledge / transfer / proceso. Estado: 🟢 DOMINADO ≥85 · 🟡 crucero ≥75 · 🔴 débil (CRITICO-debil si es crítico v3).

## Línea base ciega por crítico (pre-test de arranque, ronda `pretest`)
- Pendiente: resolver `BANCO_PROPIO/pretest_arranque_2026-09-15.html` (mar 15-sep = D1, parte 1: II-3 · I-3 · V-2 · III-5) y `pretest_arranque_2026-09-16.html` (mié 16-sep = D2, parte 2: II-5 · I-4 · IV-1+IV-2 · II-4), exportar el JSON y apendar con `node DATA/_scripts/gen_encaps_minisim.js --registrar <export.json> --append`. Esta tabla se llena sola.

## Mapa por sub-ángulo (solo rondas guardadas ítem a ítem: RONDAS/ y exports del runner)
| Código | Sub-ángulo | Q | ok | seguras | % ciego | Errores | Última |
|---|---|---|---|---|---|---|---|
| I-3 | concepto_vigilancia | 1 | 1 | 0 | 🔴 0 % | — | 2026-07-02 |
| I-3 | tipo_pasiva | 1 | 0 | 0 | 🔴 0 % | CCSN 1 | 2026-07-02 |
| I-3 | tipo_activa | 1 | 0 | 0 | 🔴 0 % | CCSN 1 | 2026-07-02 |
| I-3 | tipo_centinela | 1 | 0 | 0 | 🔴 0 % | CCSN 1 | 2026-07-02 |
| I-3 | tipo_comunitaria | 1 | 1 | 0 | 🔴 0 % | — | 2026-07-02 |
| I-3 | definicion_caso | 1 | 0 | 0 | 🔴 0 % | CONCEPTO 1 | 2026-07-02 |
| I-3 | probable_confirmado | 1 | 1 | 0 | 🔴 0 % | — | 2026-07-02 |
| I-3 | notif_individual | 1 | 0 | 0 | 🔴 0 % | CCSN 1 | 2026-07-02 |
| I-3 | unidad_notificante | 1 | 0 | 0 | 🔴 0 % | CRONOLOGIA 1 | 2026-07-02 |
| I-3 | notif_negativa | 1 | 0 | 0 | 🔴 0 % | CONCEPTO 1 | 2026-07-02 |
| I-3 | notif_inmediata_24h | 1 | 1 | 0 | 🔴 0 % | — | 2026-07-02 |
| I-3 | muerte_materna | 1 | 0 | 0 | 🔴 0 % | CONCEPTO 1 | 2026-07-02 |
| I-3 | endemia | 1 | 0 | 0 | 🔴 0 % | CCSN 1 | 2026-07-02 |
| I-3 | brote | 1 | 0 | 0 | 🔴 0 % | CCSN 1 | 2026-07-02 |
| I-3 | investigacion_brote | 1 | 0 | 0 | 🔴 0 % | CRONOLOGIA 1 | 2026-07-02 |
| I-3 | canal_endemico | 1 | 0 | 0 | 🔴 0 % | CONCEPTO 1 | 2026-07-02 |
| I-3 | tasa_ataque | 1 | 0 | 0 | 🔴 0 % | CONCEPTO 1 | 2026-07-02 |
| I-3 | letalidad | 1 | 0 | 0 | 🔴 0 % | CONCEPTO 1 | 2026-07-02 |
| I-3 | corredor_sala_situacional | 1 | 0 | 0 | 🔴 0 % | CONCEPTO 1 | 2026-07-02 |
| I-3 | atributos_vpp | 1 | 0 | 0 | 🔴 0 % | CCSN 1 | 2026-07-02 |
| I-3 | Cadena epidemiológica | 1 | 0 | 0 | 🔴 0 % | CCSN 1 | 2026-07-28 |
| I-3 | Escala epidemiológica | 2 | 1 | 1 | 🔴 50 % | CONCEPTO 1 | 2026-07-28 |
| I-3 | Tipo de vigilancia | 5 | 3 | 3 | 🔴 60 % | CCSN 2 | 2026-07-28 |
| I-3 | Indicadores | 3 | 3 | 3 | 🟢 100 % | — | 2026-07-28 |
| I-3 | Definición de caso | 3 | 3 | 3 | 🟢 100 % | — | 2026-07-28 |
| I-3 | Notificación | 2 | 2 | 2 | 🟢 100 % | — | 2026-07-28 |
| I-3 | Indicadores (R0) | 1 | 1 | 1 | 🟢 100 % | — | 2026-07-28 |
| I-3 | Notificación: modalidad | 1 | 1 | 1 | 🟢 100 % | — | 2026-07-28 |
| I-3 | Estructura RENACE | 1 | 1 | 1 | 🟢 100 % | — | 2026-07-28 |
| I-3 | Proceso de vigilancia | 1 | 1 | 1 | 🟢 100 % | — | 2026-07-28 |

## Patrón de error dominante (todas las rondas ENCAPS)
- **CCSN (transfer) = 10/20 fallos** · distribución: CCSN 10 · CONCEPTO 8 · CRONOLOGIA 2.
- knowledge 10 · transfer 10 · proceso 0. Cura por tipo (README_SISTEMA_TRACKING.md): CONCEPTO/CCSN → nota Obsidian + tabla comparativa · OLVIDO/CRONOLOGIA → tarjeta Anki (ANKI_COLA/ENCAPS_Cifras_2027-I.csv) esa misma tarde · proceso → regla de examen, sin tarjeta.

## Registro por ronda
| Fecha | Tipo | Código | Tema | n | seg | dud | % ciego | nota |
|---|---|---|---|---|---|---|---|---|
| 2026-07-02 | warmup_20q | I-3 | D1_warmup20 | 20 | 0 | 4 | 0 % |  |
| 2026-07-28 | warmup_d1 | I-3 | I-3_SET2_2026-07-28 | 20 | 16 | 0 | 80 % |  |

## Histórico (jul-2026, antes del régimen de mantenimiento)
- 02-jul-2026 · I-3 pre-test ciego set A: **4/20 (20 %)**, por debajo del azar → modelos invertidos (activa↔pasiva, letalidad↔mortalidad, EESS/DIRESA, VPP/oportunidad); patrón CCSN 7/16. 28-jul-2026 · I-3 SET2: 16/20 bruto. Ambas rondas están en `rondas[]` (esquema v1/v2, normalizadas por el script) y en `RONDAS/`.
- Desde el 14-sep-2026 el estado por código vive en `resumen_por_subtema` (este fichero) y la serie semanal en `SEMANAS/`.
