# DERMATOLOGÍA · Temario consolidado (3 fuentes, data REAL)

> Extraído el **10-jun-2026** de las sesiones logueadas del usuario. Raw JSON en
> [`_scrape/`](./_scrape/). Nada inventado; lo no confirmado está `[pendiente]`.
> Plan día-a-día: [`daily-plan.md`](./daily-plan.md) · Código: `src/lib/dermaDailyPlan.ts`.

---

## 1. AccessDermatologyDxRx (`dermatology.mhmedical.com`) — material primario

Sesión UF Remote Access (Smathers). Extraído vía Chrome DevTools (CDP funciona aquí;
el 403 es solo para fetch externo). Raw: [`_scrape/accessderma_estructura.json`](./_scrape/accessderma_estructura.json).

### Review Questions (5 bancos · **1.301 preguntas reales**)
| Banco | Preguntas | URL |
|---|---|---|
| Barnhill's Dermatopathology Challenge | **403** | `/qa.aspx?resourceid=2865` |
| Specialty Board Review Pictorial 4e | **381** | `/qa.aspx?resourceid=3626` |
| Specialty Board Review Pictorial 3e | **363** | `/qa.aspx?resourceid=2948` |
| CORE Exam Question Bank | **104** | `/qa.aspx?resourceid=3479` |
| Question of the Week (archivo) | **50** | `/qa.aspx?resourceid=3562` |

### Cases
- **Dermatology Cases for Board Review** (`groupid=1546`) — **200 casos visuales** (Michelle Min)
  para CORE/BASIC/APPLIED: **Medical 110 · Dermpath 30 · Pediatric 30 · Surgical 30**
  (espeja el 55/15/15/15 del APPLIED).
- **Differential Diagnosis Challenge** (`groupid=1616`) — **100 sets** de pares de imágenes similares.
- **LANGE Clinical Dermatology Cases** (`gboscontainerid=258`) — casos-incógnita con 48 preguntas.

### Videos (`/multimedia.aspx`) — contados en vivo
| Categoría | n | Nota |
|---|---|---|
| Suturing Techniques (Kantor) | **91** | la joya quirúrgica |
| Animations | 21 | incl. piel de color (PIH, queloides, pseudofoliculitis) |
| Clinical Dermatology Videos | 13 | KOH, Tzanck, biopsias, escisión |
| Vein Treatment | 13 | escleroterapia, flebectomía |
| Clinical Dermatology Lectures | 11 | L01–L11 (curso completo en PPT-vídeo) |
| Pediatric Dermatology | 9 | crio, láser, infiltración |
| Fitzpatrick's Dermatology (libro) | 7 | |
| Essentials of Skin of Color | 5 | CCCA, tracción, vitiligo |
| General Dermatology | 4 | acné, DA, psoriasis, CBC/CEC |
| Biopsies | 2 | punch, shave |
| Dermatologic Surgery / 3D Modules | `[pendiente]` | no cargaron por click programático |

### Books (36 títulos de derma con `bookid` real) — núcleo del plan
`/book.aspx?bookid=<id>`: Fitzpatrick Dermatology 9e (**2570**) · Fitzpatrick Color Atlas 9e
(**3309**) · Fitzpatrick Therapeutics (**3332**) · Barnhill's Dermatopathology 4e (**2802**) +
Challenge (**2983**) · Pictorial Review 4e (**3622**) · Taylor & Kelly Skin of Color 3e (**3609**) ·
Weinberg's Pediatric 5e (**1913**) · Dermoscopy Criteria Review (**2804**) · Dermoscopy
Self-Assessment 2e (**2929**) · Kantor Suturing 2e (**3138**) · Dermatologic Surgery (**2811**) ·
Facial Flap Surgery (**2829**) · Margin Control/Mohs (**3319**) · Skin Cancer (**3257**) ·
Baumann's Cosmetic 3e (**3200**) · Lasers & Related Technologies (**2818**) · Guidebook to
Dermatologic Diagnosis (**2960**) · LANGE Clinical Dermatology 2e (**3171**) … (lista completa en raw).

### Fitzpatrick Color Atlas 9e — TOC completo con `sectionid` (deep-link por sección)
`/content.aspx?bookid=3309&sectionid=<sid>` — **35 secciones + 3 apéndices** extraídos
(S1 Glándulas… S12 Melanoma… S25 Bacterianas… S31 Pelo… Apéndice B Dermoscopy).
Lista completa en el raw JSON. Este TOC es el **esqueleto de lectura del plan diario**.

---

## 2. ProMIR — Dermatología (asignatura 5 de 30) — ancla España / 2º pase ES

Ya estaba en `src/lib/mirTemarioData.ts` (capIds) y `mirDetalleData.ts` (intro completo).
Nuevo scrape de los 11 capítulos: [`_scrape/promir_derma_capitulos.json`](./_scrape/promir_derma_capitulos.json).

- **Peso global:** media (5–8 preguntas/convocatoria) · **18h 35min** estimadas · "arma de doble filo".
- **Profesor:** Dr. Luis Alfonso Pérez González.
- **Vídeos reales:** presentación **4:28** · videoclase resumen **3:18:11** (cap 0) ·
  Masterclass melanoma **1:39:10** (cap 4) · Dermatosis paraneoplásicas **16:46** (cap 3) ·
  Videoclase Dermatoscopia **18:36** (cap 10) · clips procedimiento 0:12/0:17 (caps 4/5).
- **Peso MIR % por tema (histórico):** Oncología cutánea **23,39** · Infecciosas **17,29** ·
  Sistémicas **15,25** · Conceptos generales **12,88** · Eritematodescamativas/Eccemas **8,81** ·
  Toxicodermias **8,14** · Ampollosas **6,10** · Glandular/folículos/urticaria **4,75** ·
  Genodermatosis **3,39** · Dermatoscopia 0.
- **Top subtemas:** Melanoma 10,85 · Infecciones víricas 10,17 · Tratamientos dermatológicos 7,46 ·
  Lesiones elementales 6,78 · Porfirias 6,10 · Infecciones fúngicas 5,42.
- **Capítulos** (`/capitulo/<capId>`): 0 Intro `62836950c0f8415ab9efb5c7` · 1 Conceptos generales
  `570779c8f4d68bf008dbc646` (25 fig/4 tab) · 2 Infecciosas `570779c8f4d68bf008dbc6a2` (25/3) ·
  3 Sistémicas `570779c9f4d68bf008dbc71f` (16/4 + vídeo) · 4 Oncología `570779c9f4d68bf008dbc77b`
  (30/12 + Masterclass) · 5 Eritematodescamativas `570779c8f4d68bf008dbc5fc` (9/6) · 6 Ampollosas
  `570779c8f4d68bf008dbc648` (12/2) · 7 Glandular/urticaria `570779c8f4d68bf008dbc6a4` (8/1) ·
  8 Toxicodermias `570779c9f4d68bf008dbc721` (10/4) · 9 Genodermatosis `570779c9f4d68bf008dbc77d`
  (1/7) · 10 Dermatoscopia `64465ebc321262437c8d0c8f` (6/0 + vídeo 18:36).

---

## 3. Qbankly (`qbankly.app`) — capa de práctica (⚠ SOLO Edge → botón ◆ Edge)

Reutilizado de la extracción API real del 10-jun (`src/lib/usmleQbanklyData.ts` +
`STUDY_HUB/_scrape/qbankly_libs_full.json`). Derma extraída a
[`_scrape/qbankly_derm_library.json`](./_scrape/qbankly_derm_library.json).

- **uWorld Medical Library → subject "Dermatology": 43 temas** con deep-link real
  `https://qbankly.app/library?e=1&doc=<70–112>`: Acne vulgaris (70), Actinic keratosis (71),
  Alopecia (72), Atopic dermatitis (74), Bullous pemphigoid/pemphigus (76), Cellulitis (78),
  Dermatophyte (82), DRESS (85), Melanoma (97), NMSC CEC/CBC (99), Psoriasis (101),
  SJS/TEN (111), Scabies (106), Tinea versicolor (112)… (43 en total, lista en raw).
- **uWorld Step 1 QBank — Dermatología: 78 preguntas** en 3 subtemas: Inflammatory
  dermatoses and bullous diseases (28) · Skin tumors and tumor-like lesions (32) ·
  Skin and soft tissue infections (18). + Allergy: Angioedema/urticaria (e=1 doc 2),
  Hypersensitivity (doc 9), DRESS (doc 8).
- **USMLERx:** Dermatology 53 Q · **PassMedicine:** "MSK & skin" 386 Q (mezcladas, 171 temas lib).
- **B&B Step 1:** capítulo Dermatology = **0 vídeos** (verificado; no existe contenido).
- `[pendiente]` Derma de los bancos **Step 2 CK** y flashcards por deck (el usuario cerró el
  gate de selección de navegador Edge; re-extraer cuando lo autorice).

---

## 4. Cruce de bloques (plan) ↔ fuentes

| Bloque del plan | AccessDerma (lectura) | Qbankly ◆ Edge (práctica) | ProMIR (2º pase ES) |
|---|---|---|---|
| A Fundamentos | Fitz 9e 2570 + Guidebook 2960 | /qbanks | cap 1 |
| B Genodermatosis/Peds | Color Atlas S4/S6/S16 + Weinberg 1913 | docs 84-105 | cap 9 |
| C Infecciosas | Color Atlas S25–S30 | docs 78-112 | cap 2 |
| D Neoplasias + dermatoscopia | Color Atlas S9/S11/S12 + Dermoscopy 2804/2929 | docs 97/99/71 | cap 4 + cap 10 🎬 |
| E Dermatopatología | Barnhill 2802 + Challenge 403Q | — | cap 1 §3 |
| F Cirugía | Kantor 3138 + 91 vídeos + 2811/2829/3319 | — | — |
| G Farmacología | Fitz Therapeutics 3332 | — | cap 1 §4 |
| H Medical amplio | Color Atlas S1–S35 + Taylor&Kelly 3609 | docs 70-111 | caps 3/5/6/7/8 🎬 |
| X Estética (SPEC) | Baumann 3200 + Lasers 2818 + 2811 | — | — (referentes externos) |
