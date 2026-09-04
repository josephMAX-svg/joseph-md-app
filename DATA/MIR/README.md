# DATA · MIR — España

Toda la data REAL del plan MIR. Fuente canónica (código): `src/lib/*.ts`. Plataforma:
**ProMIR** (`promir.medicapanamericana.com`) — SPA por WebSocket; deep-link `/capitulo/<id>`.
Abre bien en Chrome (no necesita Edge). Cruzado con **rabi_94** (Google Drive, 1ª vuelta).

## 1. Plan día-a-día (78 días = 76 temas + 2 colchón · D1 lun 7-sep-2026 → D78 mié 23-dic-2026)
> Re-fechado a D1=7-sep-2026 (v5.6); L-V, sáb+dom libres, sin skips (termina antes del 25-dic). Fuente de verdad = el `.ts`.

Fuente: [`src/lib/mirDailyPlan.ts`](../../src/lib/mirDailyPlan.ts) · 1 tema atómico/día · 1ª vuelta.
Bloque Calendar **15:15–16:15**: Evaluación Anclada D-1 (15:15–15:30) + Deep Work Mini
(15:30–16:15). Orden de ataque = alto rendimiento clínico + rabi_94.

| # | Asignatura | Días | Temas | Rentabilidad | Peso top tema |
|---|------------|------|-------|--------------|----------------|
| 1 | Cardiología | D1–D8 | 8 | 🟠 Muy alta | Cardiología básica 19.13% |
| 2 | Gastroenterología | D9–D16 | 8 | 🟠 Alta (oculta) | clúster 22.13% |
| 3 | Nefrología | D17–D22 | 6 | 🟢 Media | Fisiología renal 22.15% |
| 4 | Endocrinología y Nutrición | D23–D29 | 7 | 🟡 Alta | Diabetes 21.35% |
| 5 | Neumología | D30–D35 | 6 | 🟢 Media | EPOC 13.62% |
| 6 | Enfermedades Infecciosas | D36–D43 | 8 | 🟡 Alta | Sepsis/ITRS 12.56% |
| 7 | Neurología | D44–D50 | 7 | 🟡 Alta | Neurocirugía 19.43% |
| 8 | Reumatología | D51–D56 | 6 | 🟡 Alta | Vasculitis 17.35% |
| 9 | Hematología | D57–D61 | 5 | 🟢 Media | Anemias hemolíticas 11.47% |
| 10 | Ginecología y Obstetricia | D62–D67 | 6 | 🟡 Alta | HUF 8.73% |
| 11 | Pediatría | D68–D72 | 5 | 🔴 Máxima | Dig./Resp./Inf. 20.63% |
| 12 | Psiquiatría | D73–D76 | 4 | 🟠 Alta (oculta) | Neuróticos/ánimo/psicóticos 29.95% |

> Cada día trae: `tema`, `capId` (deep-link ProMIR), `peso` (Peso MIR % real del intro),
> `rent` (color de rentabilidad del chart), `vuelta`, `resumenVid` (duración videoclase resumen).

## 2. Temario + detalle (30 asignaturas reales)
- [`src/lib/mirTemarioData.ts`](../../src/lib/mirTemarioData.ts) — 30 asignaturas, todos los capítulos con `capId` + deep-link, rentabilidad (chart "Distribución MIR"). Raw `STUDY_HUB/_scrape/promir_full_temario.json`.
- [`src/lib/mirDetalleData.ts`](../../src/lib/mirDetalleData.ts) — por asignatura: Peso MIR % por tema, páginas, horas, Enfoque, subtemas top, vídeos. Raw `_scrape/mir_detalle_clean.json` + `intros/NN_*.json`.
- [`src/lib/mirPrioridades1V.ts`](../../src/lib/mirPrioridades1V.ts) — núcleo 1ª vuelta rabi_94 (CTO×AMIR×MirAsturias).
- [`src/lib/mirDriveResources.ts`](../../src/lib/mirDriveResources.ts) — resúmenes Drive (Mirnion `.note`, MIR 2022 PDF).
- Verificados con vídeos+duraciones: `mirCardiologiaData.ts`, `mirDigestivoData.ts`.

## 3. Protocolo diario (Google Calendar — verificado, NO modificar)
**15:15–15:30 Evaluación Anclada D-1** (4Q ProMIR/AMIR + Anki SRS + log) · **15:30–16:15
Deep Work Mini** (pre-test 3Q AMIR Test → lectura activa Compendio AMIR/ProMIR → free
recall → ≤4 APEX formato ENCAPS). Meta: Top 50 MIR 2030.

## 4. Ficheros canónicos
- `src/lib/mirDailyPlan.ts` — plan 78 días (76 temas + 2 colchón; MIR_DIAS, MIR_FRANJAS, helpers).
- `src/lib/mirTemarioData.ts` / `mirDetalleData.ts` / `mirPrioridades1V.ts` / `mirDriveResources.ts`.
- UI: `src/components/study/MirHub.tsx` + `MirTodayPlan.tsx` (HOY/Horario/7d/Temario, Peso MIR %, progreso real) + `MirTemarioExplorer.tsx`.
- Raw: `STUDY_HUB/_scrape/promir_full_temario.json`, `mir_detalle_clean.json`, `intros/`.
- Pendiente: duraciones por capítulo del resto de asignaturas (solo Cardio/Digestivo verificadas).
