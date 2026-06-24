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

## Plan de vueltas (3 fases · ciencia del aprendizaje) — REFACTOR MULTI-TEMA 24-jun
- **Fase 1 COBERTURA (24-jun→16-jul, ≤20 días háb.):** 1ª vuelta de TODO el temario front-loaded por rentabilidad. Días 1-5 = CRÍTICA solo (deep-work puro: I-3, V-2, I-5+I-6, II-3). Días 6-20 = principal + temas_secundarios (varios temas/día, Pareto: BAJA agrupados hasta 6/día). TODO el temario visto al día 20.
- **Fase 2 VUELTAS+PREGUNTAS (17-jul→5-ago):** tipo='repaso' — cero temario nuevo; solo repaso espaciado + banco de preguntas + mapas conceptuales + interleaving, sábados=simulacros con revisión brutal. Empalma con la 2ª fase de QX/Theomed (mapas, arranca 1-jul).
- **Fase 3 RECTA FINAL (6-19 ago):** SOLO simulacros tamaño-examen + preguntas + estrategia. Cero material nuevo. Sueño la víspera.
- Implementación app/Supabase: columna `temas_secundarios` (jsonb) en study_schedule; días ≥21 deep_prime → tipo='repaso'. Motor encapsPlan.ts (focusDayByCode/repasosDeHoy/itemsForDay) procesa principal+secundarios; `encapsVideosPorTema.ts` (videos QX por código). Commit 7c151da. SQL: gen_encaps_multitema_24jun.sql.js. Backup study_schedule_multitema_backup_24jun.
- Motor: `intervalosComprimidos()` comprime los repasos para que TODAS las vueltas caigan antes del 20-ago.
- **Words élite (ACTUAL/):** Plan_RENTABILIDAD (pilar+tema), Plan_MAESTRO (3 fases, día-a-día), Plan_Semanal — gen_words_encaps_v10.py. Antiguos en `FORMAS DE ESTUDIO/_OBSOLETOS/`.
