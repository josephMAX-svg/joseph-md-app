# ENCAPS · Rentabilidad + Pronóstico 2026-II (data-driven) — índice para futuros chats

> Construido el 24-jun-2026 con los **exámenes oficiales REALES** + backtest walk-forward + ciencia del aprendizaje (workflow de 13 agentes). Para que cualquier chat futuro en esta carpeta sepa dónde está la data, cómo se distribuye la rentabilidad, y pueda **crear exámenes/preguntas top** sin re-investigar.

## Dónde está la data
- **Exámenes oficiales (PDF):** `D:\agente_estudio\ENCAPS\ENCAPS\EXAMENES\` → 2024-2A/B, 2025-1A/B, 2025-2, 2026-1 (+ claves de respuesta).
- **Texto extraído (legible):** `DATA/ENCAPS/exams_txt/*.txt` (pdftotext; ~100 preguntas c/u con caso clínico + 4 opciones).
- **Pronóstico + plan completo:** `DATA/ENCAPS/_pronostico_2026_2.json` (backtest, forecast por área/tema, plan de vueltas, recomendaciones de ciencia del aprendizaje).
- **Plan Maestro v7 (metodología previa):** `DATA/ENCAPS/exams_txt/Plan_Maestro_v7_DIA1.txt` + `Plan_ENCAPS_18-24mayo_v7_SEM1.txt`.
- **Calendario/hoja de ruta Theomed:** `DATA/ENCAPS/thv/` + `D:\agente_estudio\ENCAPS\ENCAPS\FORMAS DE ESTUDIO\ULTIMO CALENDARIO\`.

## Pronóstico 2026-2 por ÁREA (backtest, MAE validación ~4.5pp)
| Área | % estimado 2026-2 | Tendencia |
|---|---|---|
| I — Salud Pública | **29%** | al alza (I-3 vigilancia explotó 2.8→6.5→9→14%) |
| II — Cuidado Integral | **28%** | volátil al alza |
| V — Gestión | **21%** | estable-alto |
| III — Ética/Intercultural | **16%** | al alza |
| IV — Investigación | **6%** | en caída (16%→3-6% piso) → BAJA |

**CI+SP real = ~57%** (51-63% en los 4 exámenes), NO 70%. El 70% del video Theomed estaba inflado.

## Prioridades (vueltas) data-driven — aplicadas en Supabase study_schedule
- **CRÍTICA (6 vueltas):** I-3 (Vigilancia/brotes #1), V-2 (PEI/POI #2), I-5+I-6 (Bioestadística #3), II-3 (Vacunación #4).
- **ALTA (5):** III-5, I-4, V-3, II-11, I-1, II-1, II-8, V-1, III-9, IV-1+IV-2.
- **MEDIA (4):** I-2, III-2, III-8, II-6, II-9, II-7, II-5, II-10, II-4, III-1, III-4+III-7, I-11+I-12, V-6.
- **BAJA (3):** III-6+III-10, I-7, II-2, I-10, III-3, V-7+V-10, IV-4, IV-3+IV-5, II-12, IV-6+IV-7, I-8, I-9, II-13.
- Orden de estudio (front-load): los temas se reordenaron por ranking de rentabilidad → los 4 CRÍTICA en días 1-5, ALTA 6-15, MEDIA 17-29, BAJA 30-48. Backups: study_schedule_backup_24jun, _prio_backup_24jun, _reorder_backup_24jun.

## Backtest walk-forward (metodología validada)
2024-2 → predijo 2025-1 (MAE 3.2pp) → +2025-1 predijo 2025-2 (5.6pp) → +2025-2 predijo 2026-1 (4.1pp) → TODO + aprendizajes → **pronóstico 2026-2**. Aprendizajes: IV no se sostiene (no promediar alto); I-3 tendencia alcista fuerte; los picos por-tema (II-3, V-3) emergen sin aviso → cifras por-tema son **bandas ±2-4pp**, no puntos.

## Para CREAR exámenes/preguntas (futuro)
Generar preguntas tipo SERUMS (caso clínico + 4 opciones) **ponderadas por el % de rentabilidad de arriba**: ~29% Salud Pública (sobre todo I-3 vigilancia, I-5/I-6 bioest), ~28% Cuidado Integral (II-3 vacunas, II-11 ITS, II-1 materna, II-8 crónicas), ~21% Gestión (V-2 PEI/POI, V-1, V-3), ~16% Ética/Intercultural, ~6% Investigación (solo IV-1 diseños). Fuente de contenido: fichas MINSA QX (105), Theomed, compendios DR LOPEZ, Drive. Hallazgo: existe un clúster real **Gestión de medicamentos (SISMED/PNUME/DIGEMID/cadena de frío) ~6-12%** sin código propio — considerar crearlo.

## Plan de vueltas (3 fases · ciencia del aprendizaje)
- **Fase 1 (24-jun→12-jul):** 1ª vuelta de TODO, front-load I/II/V; cada tema cierra con banco (retrieval).
- **Fase 2 (13-jul→5-ago):** retrieval + interleaving, 65-70% a I/II/V, sábados=simulacros con revisión brutal.
- **Fase 3 (6-19 ago):** simulacros tamaño-examen + compresión + estrategia. Cero material nuevo. Sueño la víspera.
- Motor: `intervalosComprimidos()` en encapsPlan.ts comprime los repasos para que TODAS las vueltas caigan antes del 20-ago.
