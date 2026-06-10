# DATA · USMLE (Step 1) — EEUU

Toda la data REAL del plan USMLE Step 1. Fuente canónica (código): `src/lib/*.ts`.
Plataforma de práctica: **Qbankly** (`qbankly.app`) — **abre SOLO en Microsoft Edge**
(Chrome con CDP la bloquea). Los links de la app ofrecen botón **◆ Edge** + Chrome.

## 1. Plan día-a-día (70 días · 10-jun-2026 → 18-ago-2026)
Fuente: [`src/lib/usmleStep1Daily.ts`](../../src/lib/usmleStep1Daily.ts) · 1 subtema atómico/día.
Bloque Calendar **16:15–17:15**: Anchored Eval del tema previo (16:15–16:30) + Mini Deep
Work English (16:30–17:15). Jerarquía de material: Path→Pathoma · Micro/Pharm→Sketchy ·
Physio/Biochem/Anat→AMBOSS · Behav/Biostats→First Aid · +B&B vídeo.

| # | Sistema | Días | Nº subtemas | Tier |
|---|---------|------|-------------|------|
| 1 | Cardiovascular | D1–D13 | 13 | CORE |
| 2 | Respiratory | D14–D19 | 6 | CORE |
| 3 | Renal | D20–D25 | 6 | CORE |
| 4 | Gastrointestinal | D26–D32 | 7 | CORE |
| 5 | Endocrine | D33–D38 | 6 | CORE |
| 6 | Nervous System | D39–D46 | 8 | CORE |
| 7 | Hematology & Oncology | D47–D51 | 5 | HIGH |
| 8 | Reproductive | D52–D55 | 4 | HIGH |
| 9 | Musculoskeletal / Rheum | D56–D58 | 3 | HIGH |
| 10 | Psychiatry & Behavioral | D59–D61 | 3 | HIGH |
| 11 | Immunology | D62–D63 | 2 | HIGH |
| 12 | Microbiology / ID | D64–D67 | 4 | HIGH |
| 13 | Biochemistry | D68–D70 | 3 | MED |

> Cada día trae: `sub` (subtema), `bbCh`/`bbVid` (Boards & Beyond), `uw` (subtema uWorld),
> `mat`/`matType` (material primario), `palm` (vídeo Palmerton al iniciar sistema).

## 2. Qbankly — árbol real (API interna `/api/v2/...`)
Fuente: [`src/lib/usmleQbanklyData.ts`](../../src/lib/usmleQbanklyData.ts) · raw en `STUDY_HUB/_scrape/qbankly_*.json`.
- **Librerías (lectura):** uWorld (epubId 1, 19 subjects / 824 temas) · Amboss (2, 8/268) · PassMedicine (3, 11/1436). Deep-link `library?e=<epub>&doc=<docId>`.
- **QBanks Step 1 (preguntas):** uWorld **3659** (169 subtemas) · Amboss **2745** · Mehlman **7278** · PassMedicine **3846** · USMLERx **2150**. (`s`=subjects, `y`=subtemas, `r`=matriz.)
- **Vídeos:** Boards & Beyond Step 1 (**473 vid / 141 h**, 22 caps) · B&B Step 2 (198/59 h) · Sketchy (875 vid, sin duración en API).
- Endpoints: `/library/epubs`, `/library/toc/root?epubId=N` + `/toc/{nodeId}?epubId=N`, `/qbanks?mode=categories|list`, `/videos/toc/root` + `/toc/{id}?type=course|chapter`. **OJO rate-limit 429.**

## 3. Palmerton (High Yield por sistema)
Fuente: [`src/lib/usmlePalmertonData.ts`](../../src/lib/usmlePalmertonData.ts) · raw `STUDY_HUB/_scrape/palmerton_videos.json`.
Serie "High Yield [System]" de **Alec Palmerton, MD** (Yousmle, canal `@alec.palmerton_md`):
26 vídeos con IDs + duración reales (Cardio 112+84 min, GI 164+111, Renal 95+109, Endo 125,
Neuro 74+99, Heme 39:30, Immuno 41:26, Pharma 70+70, Biochem 103, +IM/Surgery/Peds/OBGYN/FM).

## 4. Protocolo diario (Google Calendar — verificado, NO modificar)
**16:15–16:30 Anchored Eval** (2Q uWorld tema previo + Anki SRS + log de errores) ·
**16:30–17:15 Mini Deep Work English** (pre-test 3Q → active reading con jerarquía de
material → free recall en inglés → ≤3 APEX formato Palmerton). Examen Step 1 → feb-2028.

## 5. Ficheros canónicos
- `src/lib/usmleStep1Daily.ts` — plan 70 días (DIAS, FRANJAS, helpers).
- `src/lib/usmleQbanklyData.ts` — árbol Qbankly + deep-links.
- `src/lib/usmlePalmertonData.ts` — vídeos Palmerton.
- `src/lib/usmleData.ts` — KPIs, sistemas, disciplinas, ROI, recursos.
- UI: `src/components/study/UsmleHub.tsx` + `UsmleTodayPlan.tsx` (HOY/Horario/7d/Temario, progreso real).
- Raw: `STUDY_HUB/_scrape/qbankly_*.json`, `palmerton_videos.json`.
