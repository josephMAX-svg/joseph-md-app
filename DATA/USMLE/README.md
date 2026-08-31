# DATA · USMLE Step 1 — Doc maestro v5.3 (reestructuración 27-ago · ajuste 31-ago-2026)

**Step 1 es el bloque PRINCIPAL** (heredó las franjas ENCAPS de la mañana): 6h15/día L-V.
**D1 = MAR 1-sep-2026 → D101 = VIE 22-ene-2027 (101 días; el lun 31-ago no se estudió) ·
EXAMEN: semana 25-29 ene 2027 (target MIÉ 27-ene).**
Sábados y domingos LIBRES. Skip extra: 25-dic, 31-dic, 1-ene.
Fuente de verdad (código): [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) **v5.3**.

Plataforma de práctica: **Qbankly** (`qbankly.app`) — **abre SOLO en Microsoft Edge**
(Chrome con CDP la bloquea). Los links de la app ofrecen botón ◆ Edge + Chrome.

## 1. Fases

| Fase | Días | Fechas | Qué se hace |
|------|------|--------|-------------|
| **A · Contenido por sistemas** | D1-D86 | 1-sep → 30-dic | 1ª pasada completa del temario + ~40Q uWorld/día (= 1ª vuelta del banco entero) + 7 simulacros de hito |
| **B · Banco intensivo** | D87-D96 | 4-ene → 15-ene | Random timed + incorrects + AMBOSS 200 Concepts · UWSA2 (8-ene) · NBME 31 (15-ene, **GO/NO-GO**) |
| **C · Sprint final** | D97-D101 | 18-ene → 22-ene | NBME 32 · NBME 33 · Free 120 · taper |

## 2. Sistema → días → fechas (Fase A, según `usmleStep1Daily.ts` v5.3)

| Sistema | Días | Fechas | Tier |
|---------|------|--------|------|
| Fundamentos (Pathoma 1-3 + setup) | D1-D2 | 1-sep → 2-sep | CORE |
| Immunology | D3-D4 | 3-sep → 4-sep | CORE |
| Cardiovascular | D5-D8 · D10-D15 | 7-sep → 21-sep | CORE |
| Respiratory | D16-D21 | 22-sep → 29-sep | CORE |
| Renal | D22-D23 · D25-D28 | 30-sep → 8-oct | CORE |
| Gastrointestinal | D29-D35 | 9-oct → 19-oct | CORE |
| Endocrine | D36-D38 · D40-D42 | 20-oct → 28-oct | CORE |
| Nervous System | D43-D50 | 29-oct → 9-nov | CORE |
| Hematology & Oncology | D51-D53 · D55-D57 | 10-nov → 18-nov | HIGH |
| Microbiology / ID | D58-D64 | 19-nov → 27-nov | HIGH |
| Reproductive | D65-D68 · D70 | 30-nov → 7-dic | HIGH |
| Musculoskeletal / Rheum | D71-D74 | 8-dic → 11-dic | HIGH |
| Psychiatry & Behavioral | D75-D78 | 14-dic → 17-dic | HIGH |
| Biostats/Epi + ética (AMBOSS HY 155Q) | D80 | 21-dic | HIGH |
| Biochemistry | D81-D83 | 22-dic → 24-dic | MED |
| Pharmacology general | D84 | 28-dic | HIGH |
| Repaso integral (cierre Fase A) | D85 | 29-dic | — |

> Los huecos (D9, D24, D39, D54, D69, D79, D86, D91, D96) son los **días de Assessment**
> (hitos, abajo); en Fase C, D97/D99/D101 son NBME 32/33 y Free 120.
> Cada día trae: `sub`, `bbCh`/`bbVid` (Boards & Beyond), `uw` (subtema uWorld), `mat`/`matType`
> (material primario) y `palm` (vídeo Palmerton al abrir sistema).

## 3. Hitos NBME/UWSA (los viernes NO se mueven)

| # | Hito | Día | Fecha | Rol |
|---|------|-----|-------|-----|
| 1 | **UWSA1** | D9 | vie 11-sep | Baseline (esperar bajo, no asustarse) |
| 2 | **NBME 25** | D24 | vie 2-oct | 1ª calibración real |
| 3 | **NBME 26** | D39 | vie 23-oct | Tendencia |
| 4 | **NBME 27** | D54 | vie 13-nov | Tendencia |
| 5 | **NBME 28** | D69 | vie 4-dic | Tendencia |
| 6 | **NBME 29** | D79 | vie 18-dic | Cierre de contenido |
| 7 | **NBME 30** | D86 | **mié 30-dic** | Cierre Fase A |
| 8 | **UWSA2** | D91 | vie 8-ene | Predictor fuerte |
| 9 | **NBME 31** | D96 | vie 15-ene | **GO/NO-GO** |
| 10 | NBME 32 · NBME 33 · **Free 120** | D97 · D99 · D101 | 18 · 20 · 22-ene | Sprint final |

**Criterio GO (Step 1 es pass/fail): 2 NBME consecutivos ≥68% + UWSA2 "low risk" → confirmar
fecha.** (Palmerton: ≥65% ≈ 95% de probabilidad de aprobar; ≥70% ≈ 99% — el 68% doble queda en
el rango; mínimos on-track por hito en
[`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) Parte V.) Si NO se cumple: correr el
examen dentro del mismo eligibility period (feb-mar 2027) sin drama — un fail queda PARA
SIEMPRE en el transcript ECFMG (~1/3 de PDs nunca consideran un aplicante con fail en Step 1).
Detalle de gates y logística ECFMG/Prometric: [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md).

## 4. Franjas horarias (Google Calendar v5.2 · L-V · 6h15/día)

| Hora | Segmento |
|------|----------|
| 05:00–05:45 | **ANKI AM** (madrugada fresca · pasada principal FSRS) · Fases B-C: + STRESS SET 10Q/12min |
| 07:15–08:15 | **Repaso anclado** multi-temporal D-1/D-3/D-7 + free recall (Anki restante del día) |
| 08:15–09:00 | **PRE-TEST**: 10Q uWorld ciegas del tema NUEVO (tutor) + free recall 90s |
| 09:00–11:00 | **DEEP PRIME**: vídeo B&B/Pathoma/Sketchy + First Aid active reading + tarjetas Anki de MECANISMO (≤10) |
| 11:00–12:00 | **30Q uWorld CONSOLIDACIÓN** (temas vistos · tutor) + log de errores (gap: conocimiento/lectura/razonamiento) |
| 18:00–18:45 | **EVALUACIÓN ACUMULATIVA** modo examen (timed, mixta) + corrección + APEX |

Resto del día (sin tocar): RESEARCH↔DERMA alterna 13:30-14:15 · AURUM 14:15-15:15 ·
MIR 15:15-16:15 · **ENCAPS 16:15-17:15 (1h/día de banqueo puro hasta fines de enero; feb-mar
2027 vuelve a principal — examen fines de marzo 2027)** · **LIVIANO Academia 17:15-18:00**.

## 5. Jerarquía de material por `matType`

| matType | Material primario |
|---------|-------------------|
| path | **Pathoma** (Sattar) + First Aid |
| micro / pharm | **Sketchy** + First Aid |
| physio / biochem / anat | **AMBOSS library + B&B** + First Aid |
| behav / biostats | **First Aid** (+ UWorld Biostats Review) |

Método Palmerton transversal: comprensión fisiológica > memorización · tarjetas Anki de
MECANISMO (FSRS, retención 0.9, solo Good/Again) · pre-test ciego → active reading → free
recall → preguntas → log de errores (knowledge/transfer/proceso).
Guía por materia + método completo: [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md)
**v2 — catálogo completo**. Rol de cada recurso: [`RECURSOS_META_2026.md`](RECURSOS_META_2026.md).

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
| [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) | **v5.3 = FUENTE DE VERDAD**: DIAS (101), FRANJAS (6), DAILY_META, helpers |
| [`src/lib/usmleStep1Plan.ts`](../../src/lib/usmleStep1Plan.ts) | Plan macro (fases, hitos) |
| [`src/lib/usmlePalmertonData.ts`](../../src/lib/usmlePalmertonData.ts) | Vídeos Palmerton (serie High Yield, IDs + duraciones reales) |
| [`src/lib/usmleQbanklyData.ts`](../../src/lib/usmleQbanklyData.ts) | Árbol Qbankly + deep-links (`library?e=<epub>&doc=<docId>`) |
| [`src/lib/usmleData.ts`](../../src/lib/usmleData.ts) | KPIs, sistemas, disciplinas, ROI, recursos |
| UI | `src/components/study/UsmleHub.tsx` + `UsmleTodayPlan.tsx` |

## 8. Docs de esta carpeta

- [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) — **v2 catálogo completo (31-ago)**:
  por materia + 5 niveles UWorld + Anki fino + test-taking/test-day + planificación NBME.
- [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md) — semana a semana S1-S21 + reglas de reprogramación + gates ECFMG.
- [`RECURSOS_META_2026.md`](RECURSOS_META_2026.md) — rol de cada recurso, fase, horas, qué NO usar.
- Cuaderno NotebookLM **"STEP 1 · Palmerton Engine"** — **~140 fuentes** (catálogo completo del
  canal, ampliado 31-ago-2026):
  [notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86](https://notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86)

> Histórico: el plan de 70 días (D1=10-jun-2026, bloque 16:15-17:15) quedó **SUPERSEDIDO** por
> la v5 el 27-ago-2026; la v5 (D1=31-ago, 102 días) pasó a **v5.3** el 31-ago (D1=mar 1-sep,
> 101 días, franja 04:15 partida → ANKI AM 05:00). El examen ya no es feb-2028: es **ene-2027**.
