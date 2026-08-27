# DATA · USMLE Step 1 — Doc maestro v5 (reestructuración 27-ago-2026)

**Step 1 es AHORA el bloque PRINCIPAL** (heredó las franjas ENCAPS de la mañana): 5h30/día L-V.
**D1 = LUN 31-ago-2026 → D102 = VIE 22-ene-2027 · EXAMEN: semana 25-29 ene 2027 (target MIÉ 27-ene).**
Sábados y domingos LIBRES. Skip extra: 25-dic, 31-dic, 1-ene.
Fuente de verdad (código): [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) **v5**.

Plataforma de práctica: **Qbankly** (`qbankly.app`) — **abre SOLO en Microsoft Edge**
(Chrome con CDP la bloquea). Los links de la app ofrecen botón ◆ Edge + Chrome.

## 1. Fases

| Fase | Días | Fechas | Qué se hace |
|------|------|--------|-------------|
| **A · Contenido por sistemas** | D1-D87 | 31-ago → 30-dic | 1ª pasada completa del temario + ~40Q uWorld/día (= 1ª vuelta del banco entero) + 7 simulacros de hito |
| **B · Banco intensivo** | D88-D97 | 4-ene → 15-ene | Random timed + incorrects + AMBOSS 200 Concepts · UWSA2 (8-ene) · NBME 31 (15-ene, **GO/NO-GO**) |
| **C · Sprint final** | D98-D102 | 18-ene → 22-ene | NBME 32 · NBME 33 · Free 120 · taper |

## 2. Sistema → días → fechas (Fase A, según `usmleStep1Daily.ts` v5)

| Sistema | Días | Fechas | Tier |
|---------|------|--------|------|
| Fundamentos (Pathoma 1-3 + setup) | D1-D2 | 31-ago → 1-sep | CORE |
| Immunology | D3-D4 | 2-sep → 3-sep | CORE |
| Cardiovascular | D5-D9 · D11-D15 | 4-sep → 18-sep | CORE |
| Respiratory | D16-D21 | 21-sep → 28-sep | CORE |
| Renal | D22-D24 · D26-D28 | 29-sep → 7-oct | CORE |
| Gastrointestinal | D29-D35 | 8-oct → 16-oct | CORE |
| Endocrine | D36-D39 · D41-D42 | 19-oct → 27-oct | CORE |
| Nervous System | D43-D50 | 28-oct → 6-nov | CORE |
| Hematology & Oncology | D51-D54 · D56-D57 | 9-nov → 17-nov | HIGH |
| Microbiology / ID | D58-D64 | 18-nov → 26-nov | HIGH |
| Reproductive | D65-D69 | 27-nov → 3-dic | HIGH |
| Musculoskeletal / Rheum | D71-D74 | 7-dic → 10-dic | HIGH |
| Psychiatry & Behavioral + Biostats | D75-D79 | 11-dic → 17-dic | HIGH |
| Biochemistry | D81-D84 | 21-dic → 24-dic | MED |
| Pharmacology general | D85 | 28-dic | MED |
| Repaso integral | D86 | 29-dic | — |

> Los huecos (D10, D25, D40, D55, D70, D80, D87…) son los **días de Assessment** (hitos, abajo).
> Cada día trae: `sub`, `bbCh`/`bbVid` (Boards & Beyond), `uw` (subtema uWorld), `mat`/`matType`
> (material primario) y `palm` (vídeo Palmerton al abrir sistema).

## 3. Hitos NBME/UWSA (los viernes NO se mueven)

| # | Hito | Fecha | Rol |
|---|------|-------|-----|
| 1 | **UWSA1** | vie 11-sep | Baseline (esperar bajo, no asustarse) |
| 2 | **NBME 25** | vie 2-oct | 1ª calibración real |
| 3 | **NBME 26** | vie 23-oct | Tendencia |
| 4 | **NBME 27** | vie 13-nov | Tendencia |
| 5 | **NBME 28** | vie 4-dic | Tendencia |
| 6 | **NBME 29** | vie 18-dic | Cierre de contenido |
| 7 | **NBME 30** | **mié 30-dic** | Cierre Fase A |
| 8 | **UWSA2** | vie 8-ene | Predictor fuerte |
| 9 | **NBME 31** | vie 15-ene | **GO/NO-GO** |
| 10 | NBME 32 · NBME 33 · **Free 120** | semana 18-22 ene | Sprint final |

**Criterio GO (Step 1 es pass/fail): 2 NBME consecutivos ≥68% + UWSA2 "low risk" → confirmar
fecha.** Si NO se cumple: correr el examen dentro del mismo eligibility period (feb-mar 2027)
sin drama — un fail queda PARA SIEMPRE en el transcript ECFMG (~1/3 de PDs nunca consideran un
aplicante con fail en Step 1). Detalle de gates y logística ECFMG/Prometric:
[`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md).

## 4. Franjas horarias (Google Calendar v5 · L-V · 5h30/día)

| Hora | Segmento |
|------|----------|
| 07:15–08:15 | **Anki FSRS** + repaso multi-temporal D-1/D-3/D-7 (deck USMLE, en inglés) |
| 08:15–09:00 | **PRE-TEST**: 10Q uWorld ciegas del tema NUEVO (tutor) + free recall 90s |
| 09:00–11:00 | **DEEP PRIME**: vídeo B&B/Pathoma/Sketchy + First Aid active reading + tarjetas Anki de MECANISMO (≤10) |
| 11:00–12:00 | **30Q uWorld CONSOLIDACIÓN** (temas vistos · tutor) + log de errores (gap: conocimiento/lectura/razonamiento) |
| 18:00–18:45 | **EVALUACIÓN ACUMULATIVA** modo examen (timed, mixta) + corrección + APEX |

Resto del día (sin tocar): RESEARCH↔DERMA alterna 13:30-14:15 · AURUM 14:15-15:15 ·
MIR 15:15-16:15 · **ENCAPS 16:15-17:15 (1h/día de banqueo puro hasta fines de enero; feb-mar
2027 vuelve a principal — examen fines de marzo 2027)** · **LIVIANO Academia NUEVO 17:15-18:00**.

## 5. Jerarquía de material por `matType`

| matType | Material primario |
|---------|-------------------|
| path | **Pathoma** (Sattar) + First Aid |
| micro / pharm | **Sketchy** + First Aid |
| physio / biochem / anat | **AMBOSS library + B&B** + First Aid |
| behav / biostats | **First Aid** (+ UWorld Biostats Review) |

Método Palmerton transversal: comprensión fisiológica > memorización · tarjetas Anki de
MECANISMO (FSRS) · pre-test ciego → active reading → free recall → preguntas → log de errores.
Guía por materia: [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md). Rol de cada recurso:
[`RECURSOS_META_2026.md`](RECURSOS_META_2026.md).

## 6. Inventario Qbankly (REAL, verificado)

- **QBanks Step 1**: uWorld Step 1 2026 **3.659Q** (motor del plan) · AMBOSS **2.745Q** + plan
  81 bloques + **200 Concepts** + HY Biostats 155Q · Mehlman **7.278Q** · PassMedicine **3.846Q** ·
  USMLERx **2.150Q**.
- **Simulacros**: NBME formas **21-33** (~200Q c/u) · **UWSA 1/2/3** · Free 120.
- **Vídeos**: B&B Step 1 (22 secciones) + Sketchy (14 secciones) = **1.797 vídeos**.
- **Flashcards**: 2.180.
- **Biblioteca** (lectura): uWorld / AMBOSS / PassMedicine.
- AMBOSS además con **suscripción propia** (library + add-on Anki).
- Árbol y deep-links: [`src/lib/usmleQbanklyData.ts`](../../src/lib/usmleQbanklyData.ts) · raw en `STUDY_HUB/_scrape/qbankly_*.json`.

## 7. Ficheros canónicos (código)

| Fichero | Rol |
|---------|-----|
| [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) | **v5 = FUENTE DE VERDAD**: DIAS (102), FRANJAS, DAILY_META, helpers |
| [`src/lib/usmleStep1Plan.ts`](../../src/lib/usmleStep1Plan.ts) | Plan macro (fases, hitos) |
| [`src/lib/usmlePalmertonData.ts`](../../src/lib/usmlePalmertonData.ts) | Vídeos Palmerton (serie High Yield, IDs + duraciones reales) |
| [`src/lib/usmleQbanklyData.ts`](../../src/lib/usmleQbanklyData.ts) | Árbol Qbankly + deep-links (`library?e=<epub>&doc=<docId>`) |
| [`src/lib/usmleData.ts`](../../src/lib/usmleData.ts) | KPIs, sistemas, disciplinas, ROI, recursos |
| UI | `src/components/study/UsmleHub.tsx` + `UsmleTodayPlan.tsx` |

## 8. Docs de esta carpeta

- [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) — guía por materia (workflow 19 agentes, 27-ago).
- [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md) — semana a semana S1-S21 + reglas de reprogramación + gates ECFMG.
- [`RECURSOS_META_2026.md`](RECURSOS_META_2026.md) — rol de cada recurso, fase, horas, qué NO usar.
- Cuaderno NotebookLM **"STEP 1 · Palmerton Engine"** — 25 vídeos del canal (metodología).

> Histórico: el plan de 70 días (D1=10-jun-2026, bloque 16:15-17:15) quedó **SUPERSEDIDO** por
> esta v5 el 27-ago-2026. El examen ya no es feb-2028: es **ene-2027**.
