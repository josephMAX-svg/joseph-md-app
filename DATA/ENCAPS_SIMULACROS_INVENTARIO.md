# ENCAPS — Inventario REAL de exámenes/simulacros (verificado 13-jun-2026)

> Scrapeado por Chrome DevTools en las sesiones reales del dueño (QxMedic + Theomed).
> NO inventado. Sirve para no re-scrapear y para dimensionar la capacidad de simulacros
> del plan ENCAPS. Las plataformas siguen publicando (~cada 15 días, intervalos más
> cortos al final), así que estos números son **piso**; se sobreestima para tener margen.

## QxMedic — Innova Qx · SERUMS 2026-II (qxmedic-aulavirtual.com)
Fuente: API `/mis-clases/calendario/programacion` (rango mayo–dic) + sección Evaluaciones.

- **Simulacros Virtuales completos: 9** — N°01 (14-jun) → N°09 (23-ago), semanales los
  domingos 10:00 (N°08 y N°09 a las 14:00). **El último es 23-ago.**
- **ENCAPS oficiales anteriores (banco), ya cargados: 3** — 2025-I, 2025-II, 2026-I
  (se sueltan 21-26 ago). Irán subiendo más años.
- **Banqueo ENCAPS por área (~27 sesiones)**: Salud Pública 1-5 · Ética 1-4 · Cuidado
  Integral 1-9 · Investigación 1-4 · Gestión 1-5 + Banco Anexo (5 áreas) + Error/Flashcard.
- **EVA (Evaluación Virtual Avanzada) por área**: Salud Pública (60Q), Investigación (80Q),
  Ética (30Q), Gestión (30Q), Cuidado Integral (100Q) — publicada SESIÓN 1; vendrán 2, 3…
- Evaluación Diagnóstica (1, 100Q, 26-may).

## Theomed — Academia Theomed · curso "SIMULACROS MEDICINA" (campus.academiatheomed.com, course id 37)
- **Simulacros fechados: 3 hoy** (15-may, 29-may, 12-jun) → cadencia **biweekly** ⇒
  proyectados ~26-jun, 10-jul, 24-jul, 07-ago, 21-ago = **~8 al total**.
- **EXAMEN TIPO A + TIPO B (2 pares = 4)**.
- **EXAMEN 2025-II** (ENCAPS oficial anterior).
- Curso regular GP1 (id 73): áreas + "ACTIVIDADES FINALES 2026-II" (EVAs, no simulacros nuevos).

## Sobreestimado usado en el plan (capacidad ≈ 35)
| Pool | n |
|------|---|
| QX Simulacros Virtuales (N°01-09 + buffer) | 9-10 |
| QX ENCAPS oficiales (2025-I/II, 2026-I) | 3 |
| Theomed simulacros fechados (proyección biweekly) | 8 |
| Theomed EXAMEN TIPO A/B | 4 |
| ENCAPS oficiales históricos (2023-I/II, 2024-I/II · autogestión) | 4 |
| Propios / otros bancos (buffer) | 7 |
| **TOTAL planificado** | **≈ 35** |

## Cómo está montado en el plan (Supabase study_schedule, v6 · 13-jun)
- Tope **20-ago** (decisión del dueño). **EXAMEN ENCAPS 2026-II = jue 20-ago** (d58).
- **35 slots de simulacro** chequeables (extra.sims[]) en **12 días-examen**:
  9 sábados (20-jun→15-ago, 2-3 c/u) + días-examen exam-only **17/18/19-ago** (3-4 c/u).
- Cada slot tiene `fuente` (pool sugerido); el dueño corre el examen real disponible en
  cada fecha (lo publicado por QX/Theomed) y autogenera/usa oficiales antiguos para el resto.
- Render: `encapsPlan.ts itemsForDay` lee `extra.sims[]` → cada simulacro es un ✓ propio.
- ⚠ Si el examen oficial MINSA resulta ser después del 20-ago (las plataformas sueltan
  material hasta el 23-26 ago), se puede extender (1 comando; backup `study_schedule_backup_v4_20260613`).
