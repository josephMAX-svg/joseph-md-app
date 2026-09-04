# DATA · USMLE Step 1 — Doc maestro v5.6 (reestructuración 27-ago · corrimiento 4-sep-2026)

**Step 1 es el bloque PRINCIPAL** (heredó las franjas ENCAPS de la mañana): 6h15/día L-V.
**D1 = LUN 7-sep-2026 → D97 = VIE 22-ene-2027 (97 días; 31-ago, 1-sep, 2-sep, 3-sep y 4-sep no se
estudiaron) · EXAMEN: semana 25-29 ene 2027 (target MIÉ 27-ene).**
Sábados y domingos LIBRES. Skip extra: 25-dic, 31-dic, 1-ene.
Fuente de verdad (código): [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) **v5.6**
(`DAILY_META.totalDias = 97`, `inicio = 2026-09-07`, `fin = 2027-01-22`).

Plataforma de práctica: **Qbankly** (`qbankly.app`) — **abre SOLO en Microsoft Edge**
(Chrome con CDP la bloquea). Los links de la app ofrecen botón ◆ Edge + Chrome.

## 1. Fases

| Fase | Días | Fechas | Qué se hace |
|------|------|--------|-------------|
| **A · Contenido por sistemas** | D1-D82 | lun 7-sep → mié 30-dic | 1ª pasada completa del temario + ~40Q uWorld/día (= 1ª vuelta del banco entero) + 7 simulacros de hito |
| **B · Banco intensivo** | D83-D92 | lun 4-ene → vie 15-ene | Random timed + incorrects + AMBOSS 200 Concepts · UWSA2 (8-ene) · NBME 31 (15-ene, **GO/NO-GO**) |
| **C · Sprint final** | D93-D97 | lun 18-ene → vie 22-ene | NBME 32 · NBME 33 · Free 120 · taper |

## 2. Sistema → días → fechas (según `usmleStep1Daily.ts` v5.6, generado desde `DIAS`)

| Sistema | Días | Fechas | Tier | Nº días |
|---------|------|--------|------|---------|
| Fundamentos (Pathoma 1-2 + setup Anki FSRS) | D1-D2 | 7-sep → 8-sep | CORE | 2 |
| Immunology | D3-D4 | 9-sep → 10-sep | CORE | 2 |
| Cardiovascular | D6-D15 | 14-sep → 25-sep | CORE | 10 |
| Respiratory | D16-D19 · D21-D22 | 28-sep → 6-oct | CORE | 6 |
| Renal | D23-D28 | 7-oct → 14-oct | CORE | 6 |
| Gastrointestinal | D29-D34 · D36 | 15-oct → 26-oct | CORE | 7 |
| Endocrine | D37-D41 | 27-oct → 2-nov | CORE | 5 |
| Nervous System | D42-D49 | 3-nov → 12-nov | CORE | 8 |
| Hematology & Oncology | D51-D56 | 16-nov → 23-nov | HIGH | 6 |
| Microbiology / ID | D57-D63 | 24-nov → 2-dic | HIGH | 7 |
| Reproductive | D64 · D66-D69 | 3-dic → 10-dic | HIGH | 5 |
| Musculoskeletal / Rheum | D70-D72 | 11-dic → 15-dic | HIGH | 3 |
| Psychiatry & Behavioral | D73-D74 · D76 | 16-dic → 21-dic | HIGH | 3 |
| Biostats/Epi + ética (AMBOSS HY 155Q; `system` = Psychiatry & Behavioral) | D77 | 22-dic | HIGH | 1 |
| Biochemistry | D78-D80 | 23-dic → 28-dic | MED | 3 |
| Pharmacology general (PK/PD + toxicología) | D81 | 29-dic | HIGH | 1 |
| Assessment (9 hitos, ver §3) | D5 · D20 · D35 · D50 · D65 · D75 · D82 · D87 · D92 | 11-sep → 15-ene | CORE | 9 |
| Banco intensivo (Fase B) | D83-D86 · D88-D91 | 4-ene → 14-ene | CORE | 8 |
| Sprint final (Fase C) | D93-D97 | 18-ene → 22-ene | CORE | 5 |

> Los huecos dentro de un sistema (D5, D20, D35, D50, D65, D75, D82, D87, D92) son los **días de
> Assessment** (hitos, abajo); en Fase C, D93/D95/D97 son NBME 32/33 y Free 120 con
> `system = 'Sprint final'`.
> Cada día trae: `sub`, `bbCh`/`bbVid` (Boards & Beyond), `uw` (subtema uWorld), `mat`/`matType`
> (material primario) y `palm` (vídeo Palmerton al abrir sistema).

## 3. Hitos NBME/UWSA (los viernes NO se mueven)

| # | Hito | Día | Fecha | Rol |
|---|------|-----|-------|-----|
| 1 | **UWSA1** | D5 | vie 11-sep | Baseline (esperar bajo, no asustarse) |
| 2 | **NBME 25** | D20 | vie 2-oct | 1ª calibración real |
| 3 | **NBME 26** | D35 | vie 23-oct | Tendencia |
| 4 | **NBME 27** | D50 | vie 13-nov | Tendencia |
| 5 | **NBME 28** | D65 | vie 4-dic | Tendencia |
| 6 | **NBME 29** | D75 | vie 18-dic | Cierre de contenido |
| 7 | **NBME 30** | D82 | **mié 30-dic** | Cierre Fase A (jue 31-dic y vie 1-ene son skip) |
| 8 | **UWSA2** | D87 | vie 8-ene | Predictor fuerte |
| 9 | **NBME 31** | D92 | vie 15-ene | **GO/NO-GO** |
| 10 | NBME 32 · NBME 33 · **Free 120** | D93 · D95 · D97 | lun 18 · mié 20 · vie 22-ene | Sprint final |

**Criterio GO (Step 1 es pass/fail): 2 NBME consecutivos ≥68% + UWSA2 "low risk" → confirmar
fecha.** (Palmerton: ≥65% ≈ 95% de probabilidad de aprobar; ≥70% ≈ 99% — el 68% doble queda en
el rango; mínimos on-track por hito en
[`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) Parte V.) Si NO se cumple: correr el
examen dentro del mismo eligibility period (feb-mar 2027) sin drama — un fail queda PARA
SIEMPRE en el transcript ECFMG (~1/3 de PDs nunca consideran un aplicante con fail en Step 1).
Detalle de gates y logística ECFMG/Prometric: [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md).

## 4. Franjas horarias (Google Calendar v5.2 · L-V · 6h15/día · `FRANJAS` en el TS)

| Hora | Segmento |
|------|----------|
| 05:00–05:45 | **ANKI AM** (madrugada fresca · pasada principal FSRS) · Fases B-C: + STRESS SET 10Q/12min |
| 07:15–08:15 | **Repaso anclado** multi-temporal D-1/D-3/D-7 + free recall (Anki restante del día) |
| 08:15–09:00 | **PRE-TEST**: 10Q uWorld ciegas del tema NUEVO (tutor) + free recall 90s |
| 09:00–11:00 | **DEEP PRIME**: vídeo B&B/Pathoma/Sketchy + First Aid active reading + tarjetas Anki de MECANISMO (≤10) |
| 11:00–12:00 | **30Q uWorld CONSOLIDACIÓN** (temas vistos · tutor) + log de errores (gap: conocimiento/lectura/razonamiento) |
| 18:00–18:45 | **EVALUACIÓN ACUMULATIVA** modo examen (timed, mixta) + corrección + APEX |

Resto del día (sin tocar): IA vibecoding 04:15-05:00 · RESEARCH↔DERMA alterna 13:30-14:15 ·
AURUM 14:15-15:15 · MIR 15:15-16:15 · **ENCAPS 16:15-17:15 (1h/día de banqueo puro hasta fines
de enero; feb-mar 2027 vuelve a principal — examen fines de marzo 2027)** · **LIVIANO Academia
17:15-18:00**.

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
| [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) | **v5.6 = FUENTE DE VERDAD**: DIAS (97), FRANJAS (6), DAILY_META, helpers |
| [`src/lib/usmleStep1Plan.ts`](../../src/lib/usmleStep1Plan.ts) | Plan macro (SISTEMAS con `diaInicio` alineado a DIAS, PLAN_META) |
| [`src/lib/usmlePalmertonData.ts`](../../src/lib/usmlePalmertonData.ts) | Vídeos Palmerton (serie High Yield, IDs + duraciones reales) |
| [`src/lib/usmleQbanklyData.ts`](../../src/lib/usmleQbanklyData.ts) | Árbol Qbankly + deep-links (`library?e=<epub>&doc=<docId>`) |
| [`src/lib/usmleData.ts`](../../src/lib/usmleData.ts) | KPIs, sistemas, disciplinas, ROI, recursos |
| [`src/lib/obsidianMap.ts`](../../src/lib/obsidianMap.ts) | `USMLE_OBS_DAY`: D# → nota madre uWorld en el vault (claves 3-81) |
| UI | `src/components/study/UsmleHub.tsx` + `UsmleTodayPlan.tsx` · Home: `TodayMission.tsx` |

## 8. Docs de esta carpeta

- [`PALMERTON_POR_MATERIA.md`](PALMERTON_POR_MATERIA.md) — **v2 catálogo completo (31-ago)**:
  por materia + 5 niveles UWorld + Anki fino + test-taking/test-day + planificación NBME.
- [`CALENDARIO_5_MESES.md`](CALENDARIO_5_MESES.md) — semana a semana S1-S20 + día a día D1-D97 + reglas de reprogramación + gates ECFMG.
- [`RECURSOS_META_2026.md`](RECURSOS_META_2026.md) — rol de cada recurso, fase, horas, qué NO usar.
- Cuaderno NotebookLM **"STEP 1 · Palmerton Engine"** — **~140 fuentes** (catálogo completo del
  canal, ampliado 31-ago-2026):
  [notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86](https://notebooklm.google.com/notebook/6b39b85e-1450-49aa-a5ca-c31f9d659f86)

> Histórico: el plan de 70 días (D1=10-jun-2026, bloque 16:15-17:15) quedó **SUPERSEDIDO** por
> la v5 el 27-ago-2026; la v5 (D1=31-ago, 102 días) pasó a **v5.3** el 31-ago (D1=mar 1-sep,
> 101 días, franja 04:15 partida → ANKI AM 05:00), a **v5.4** el 2-sep (D1=jue 3-sep, 99 días:
> ni 1-sep ni 2-sep se estudiaron; corrimiento determinista +1 por día perdido, hitos de viernes
> fijos), a **v5.5** el 3-sep (D1=vie 4-sep, 98 días: 3-sep tampoco se estudió y 1 día de
> contenido USMLE se fusionó en el re-fecheo — mismo pipeline, hitos de viernes intactos) y a
> **v5.6** el 4-sep (D1=lun 7-sep, 97 días: 4-sep tampoco se estudió — mismo pipeline, hitos de
> viernes intactos). El examen ya no es feb-2028: es **ene-2027**.
