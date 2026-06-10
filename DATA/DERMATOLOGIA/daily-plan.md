# DERMA · Plan tema-átomo/día (68 átomos · interdiario con Research)

> **Motor:** el mismo de USMLE/MIR (`UsmleTodayPlan`/`MirTodayPlan`): sub-pestañas
> HOY/Horario/7d/Temario, navegación Día X/68, progreso REAL marcable (empieza 0%,
> `studyProgress.ts` clave `derma`). Código: **`src/lib/dermaDailyPlan.ts`** (links reales).
>
> **Ritmo INTERDIARIO (no tocar el Calendar):** la franja *boards* **13:30–14:15** alterna
> Research↔Derma por día hábil — lógica YA implementada en `researchData.ts#diaEstudioTipo`
> (días hábiles desde mié 10-jun-2026 = D0 Research; par→Research, **impar→Derma**; findes
> descanso). ⇒ **Derma D1 = jue 11-jun-2026**, D68 = mié 16-dic-2026 (~2–3 átomos/semana).
>
> **Regla de oro:** todo link/duración/conteo es REAL (ver [`temario.md`](./temario.md)).
> Qbankly SIEMPRE con botón **◆ Edge** (`microsoft-edge:<url>`).

## La sesión de 45 min (espejo del protocolo USMLE, adaptado)

| Franja | Fase |
|---|---|
| 13:30–13:35 | **Eval anclada** del átomo PREVIO: 2Q Qbankly ◆Edge (o 2 casos Access) + log de error (gap básico/razonamiento/vocabulario). Umbral: 2/2→nuevo · 1/2→repaso finde · 0/2→repetir |
| 13:35–13:40 | **Pre-test**: 3Q del átomo nuevo (Qbankly tutor ◆Edge / Q-bank Access) + free recall 60s |
| 13:40–14:00 | **Lectura activa** (jerarquía): Color Atlas 9e sección del día → si dermpath: Barnhill's · peds: Weinberg's · piel de color: Taylor & Kelly · qx: Kantor+vídeos · estética: referente del día |
| 14:00–14:05 | **2º pase ES**: ProMIR capítulo equivalente (Enfoque + figuras) |
| 14:05–14:10 | **Free recall** + los 7 pasos del Cerebro Clínico (§3 SPEC) en voz alta |
| 14:10–14:15 | **≤3 APEX** (formato Palmerton) + marcar progreso real en la app |

**Vueltas (SRS, igual que ENCAPS/Research):** CRÍTICA [1,3,7,28,63] · ALTA [1,7,28,63] ·
MEDIA [3,28,63] · BAJA [7,63] — ya definidas en `researchData.ts` (se importan).

## Los 66 átomos (cola ordenada)

Leyenda fuentes: **CA**=Color Atlas 9e `content.aspx?bookid=3309&sectionid=…` ·
**QB**=Qbankly `library?e=1&doc=N` ◆Edge · **PM**=ProMIR `/capitulo/<id>` ·
otros libros Access por `bookid`. 🔴=crítico/no-errar.

### BLOQUE A — Fundamentos / lenguaje (D1–D7 · 11-jun→29-jun) 🔴
| D | Átomo | Material real |
|---|---|---|
| 1 | Lesiones elementales 1ª/2ª + descripción semiológica (el alfabeto) 🔴 | Guidebook Dx `2960` · PM cap1 §2 (top subtema 6,78%) · QB /qbanks |
| 2 | Estructura de la piel: epidermis, queratinocitos, barrera | Fitzpatrick 9e `2570` · PM cap1 §1.1 |
| 3 | BMZ + dermis + anejos + unión dermo-epidérmica (ancla bullosas) 🔴 | Fitz `2570` · PM cap1 |
| 4 | Melanocito, pigmentación, fototipos + piel de color | Taylor&Kelly 3e `3609` + vídeos Skin of Color `#1661` · PM cap1 |
| 5 | Inmunología cutánea: Th1/Th2/Th17, hipersensibilidades | Fitz `2570` · QB doc9 Hypersensitivity |
| 6 | Genética básica: queratinas, colágenos, mosaicismo | Fitz `2570` · PM cap9 §1 |
| 7 | Terapéutica básica: vehículos, corticoides por potencia, FTU | Fitz Therapeutics `3332` · PM cap1 §4 (7,46%) |

### BLOQUE B — Genodermatosis / Pediátrica (D8–D12 · 1-jul→13-jul) · 15% APPLIED
| 8 | Ictiosis y cornificación (+Darier/Hailey-Hailey) | CA S4 `275941889` · PM cap9 §2 |
| 9 | Epidermólisis bullosas | CA S6 `275942016` · PM cap9 §2.4 |
| 10 | Facomatosis: NF1, esclerosis tuberosa, Sturge-Weber, VHL 🔴 | CA S16 `275943937` · PM cap9 §4-5 |
| 11 | Genodermatosis con riesgo tumoral (Gorlin, XP) + Marfan/PXE/Ehlers | CA S16 · PM cap9 §3 |
| 12 | Dermatosis neonatales + exantemas pediátricos | Weinberg's `1913` + vídeos peds `#1581` · QB doc86/89/104 · PM cap2 §1.6 · 30 casos Peds `1546` |

### BLOQUE C — Infecciosas (D13–D18 · 15-jul→29-jul) 🔴 (PM 17,29%)
| 13 | Bacterianas: impétigo, celulitis/erisipela, SSSS, TSS 🔴 | CA S25 `275944706` · QB doc78+92+109 · PM cap2 §5 |
| 14 | Micobacterias: TB cutánea, lepra | CA S25 · PM cap2 §5.7 |
| 15 | Sífilis + ITS cutáneas | CA S30 `275946713` · PM cap2 |
| 16 | Virales: HSV/VZV, VPH, molusco, exantemas 🔴 (PM 10,17%) | CA S27 `275945801` · QB doc81+79+98 · PM cap2 §1 |
| 17 | Micosis superficiales y profundas + KOH (PM 5,42%) | CA S26 `275945320` · QB doc82+112 · vídeo KOH `#46399` · PM cap2 §2 |
| 18 | Parasitosis: escabiosis, leishmaniasis (Perú 🔴), pediculosis | CA S28 `275946425` · QB doc106+95+80 · PM cap2 §7-8 |

### BLOQUE D — Neoplasias + dermatoscopia (D19–D25 · 31-jul→18-ago) 🔴 (PM 23,39% #1)
| 19 | Tumores benignos + nevus melanocíticos | CA S9 `275942363` · QB doc108 · PM cap4 §1 |
| 20 | Queratosis actínica + campo de cancerización | CA S11 `275942807` · QB doc71 · PM cap4 §3 |
| 21 | CBC + CEC 🔴 | CA S11 · QB doc99 · PM cap4 §4 |
| 22 | Melanoma: ABCDE, Breslow, TNM, manejo 🔴🔴 (PM 10,85% top) | CA S12 `275942978` · QB doc97 · PM cap4 §5 + 🎬 Masterclass 1:39:10 |
| 23 | Dermatoscopia I: lesiones melanocíticas 🔴 | Dermoscopy Criteria `2804` + CA Apéndice B `275944419` · PM cap10 + 🎬 18:36 |
| 24 | Dermatoscopia II: no-melanocíticas + chaos&clues | Dermoscopy Self-Assessment `2929` · PM cap10 |
| 25 | Linfomas cutáneos (MF/Sézary), Merkel, Kaposi, DFSP | CA S21 `275944447` · QB doc94 · PM cap4 §6-8 |

### BLOQUE E — Dermatopatología (D26–D29 · 20-ago→28-ago) · 15% APPLIED
| 26 | Cómo leer biopsia + patrones inflamatorios | Barnhill's 4e `2802` · Challenge `qa 2865` (403Q) · PM cap1 §3 |
| 27 | Ampollosas en biopsia: IF directa/indirecta | Barnhill `2802` + qa2865 · PM cap6 §2 |
| 28 | Tumores en histología (correlación bloque D) | Barnhill `2802` + 30 casos Dermpath `1546` |
| 29 | Depósitos, infiltrados, paniculitis + drill Challenge | qa2865 (quiz 20Q) |

### BLOQUE F — Cirugía dermatológica (D30–D34 · 1-sep→11-sep) · 15% APPLIED
| 30 | Anatomía qx facial: zonas de peligro, RSTL, unidades 🔴 | Derm Surgery `2811·245216992` Cap1 Surgical Anatomy & Cosmetic Subunits |
| 31 | Biopsias punch/shave/excisional + anestesia local 🔴 | vídeos Biopsies `#1417` + Clinical Videos `#46399` · `2811` |
| 32 | Suturas: instrumental, nudos, técnicas (Kantor) | Kantor `3138` + **91 vídeos** `#1420` |
| 33 | Colgajos e injertos | Facial Flap Surgery `2829` + 30 casos Surgical `1546` |
| 34 | Mohs + márgenes + complicaciones qx | Margin Control `3319` · Skin Cancer `3257` |

### BLOQUE G — Farmacología (D35–D39 · 15-sep→25-sep)
| 35 | Corticoides tópicos/sistémicos | Therapeutics `3332` · PM cap1 §4 |
| 36 | Retinoides + isotretinoína (teratogenia 🔴) | `3332` · PM cap7 §1 |
| 37 | Inmunosupresores clásicos (MTX, ciclosporina, AZA) | `3332` |
| 38 | Biológicos: anti-TNF, IL-17/23, dupilumab, JAK | `3332` · PM cap5 §5.5 |
| 39 | Antifúngicos + antivirales sistémicos | `3332` · PM cap2 |

### BLOQUE H — Medical amplio (D40–D51 · 29-sep→29-oct) · 55% APPLIED 🔴
| 40 | Acné + rosácea + hidradenitis (Global Alliance + tesis CADI/IGA) 🔴 | CA S1 `275941112` · QB doc70+103+91 · PM cap7 §1-2 · JAAD 2018 consenso |
| 41 | Eccemas: atópica, contacto, seborreica 🔴 | CA S2 `275941291` · QB doc74 · PM cap5 §4-6 |
| 42 | Psoriasis + papuloescamosas (liquen, pitiriasis) 🔴 | CA S3 `275941727` · QB doc101+100 · PM cap5 §1-3 |
| 43 | Ampollosas autoinmunes: pénfigo/penfigoide/DH 🔴 | CA S6 · QB doc76 · PM cap6 |
| 44 | Urticaria/angioedema + prurito sine materia | CA S35 `275947685` · QB doc2 · PM cap7 §4 |
| 45 | Conectivopatías: LES, dermatomiositis, morfea | CA S14 `275943310` · PM cap3 §1+5.2 |
| 46 | Vasculitis, paniculitis, neutrofílicas (Sweet, PG) | CA S7 `275942174` · QB doc88+102 · PM cap3 §2 |
| 47 | Farmacodermias graves: SJS/TEN, DRESS, AGEP 🔴🔴 | CA S23 `275944593` + S8 `275942269` · QB doc111+85+87 · PM cap8 |
| 48 | Piel y enfermedad sistémica: porfirias (PM 6,1%), paraneoplásicas, endocrino | CA S15 `275943857` + S19 `275944194` · PM cap3 + 🎬 16:46 |
| 49 | Fotodermatosis + fotoprotección | CA S10 `275942604` · PM cap8 §5 |
| 50 | Pigmentación (vitíligo/melasma/PIH) + piel de color (queloides, CCCA) | CA S13 `275943230` · Taylor&Kelly `3609` · PM cap7 §3 |
| 51 | Pelo y uñas: alopecias, tricoscopia, melanoniquia vs melanoma 🔴 | CA S31 `275947046` + S32 `275947291` · Hair&Nail `3364` · QB doc72 |

### CIERRE board (D52 · 2-nov)
| 52 | High-Yield Buzz Words + simulacro mixto | Pictorial 4e `qa 3626` (381Q) + QOTW `qa 3562` + DD Challenge `1616` |

### BLOQUE X — Estética estructural (D53–D68 · 4-nov→16-dic) — capa del SPEC sobre la base
> Deep-links capítulo-nivel de los TOCs reales (`_scrape/accessderma_estetica_tocs.json`,
> 16 libros / **740 capítulos** con `sectionid`).

| 53 | Anatomía facial 3D: 5 capas, SMAS, espacios 🔴 (Cotofana) | Baumann `3200·266614877` Cap7 Facial Anatomy & Aging · cotofanaanatomy.com |
| 54 | Compartimentos grasos + ligamentos + reabsorción ósea (Cotofana) | Baumann `3200·266614442` Cap3 Fat & Subcutaneous · PRS 2017 upper face |
| 55 | Arterias peligrosas + zonas seguras: nariz/glabela/temple 🔴🔴 (Cotofana) | paper PAN 2022 + JDD 2019 safe zones |
| 56 | Análisis facial: tercios, MD ASA, 8 atributos (de Maio) | paper MD ASA `10.1111/jocd.14216` |
| 57 | Envejecimiento estructural: hueso→grasa→ligamento→piel (de Maio) | MD Codes paper PMC8012343 · Baumann Cap7 |
| 58 | Reología HA: G', cohesividad + bioestimuladores | Soft Tissue Augmentation 5e · Cosmeceuticals `2812·244978644` Cap26 Hyaluronic Acid |
| 59 | MD Codes I: fundación (Ck, T, Tt) (de Maio) | PMC8012343 + mdcodes.com |
| 60 | MD Codes II + myomodulation (de Maio) | paper 2018 + Procedural Derm `2819·242377676` Cap37 Fillers |
| 61 | Toxina I: mecanismo, unidades, tercio superior (Carruthers) | Baumann `3200·266616475` Cap23 Botulinum Toxins · Botulinum Toxin 5e |
| 62 | Toxina II: tercio inferior, Nefertiti, masetero, hiperhidrosis (Carruthers) | Derm Surgery `2811·245227386` Cap57 Neuromodulators · Botulinum Toxin 5e |
| 63 | Oclusión vascular + HDPH 🔴🔴 (DeLorenzi) — recitar protocolo | ASJ 2017 `10.1093/asj/sjw251` + Parts I/II |
| 64 | Ceguera por relleno: prevención + manejo inmediato 🔴🔴 (Goodman 2020) | ASJ 2020 PMC7427155 |
| 65 | Fototermólisis selectiva: cromóforo→λ→pulso (Anderson) | Lasers `2818·240357100` Cap1 Fundamentals · Science 1983 |
| 66 | Fraccional/RF/HIFU + seguridad en fototipos altos (Manstein/Anderson) | Derm Surgery `2811·245228834` Cap71 Laser/Light en piel de color · LSM 2004 |
| 67 | Peelings químicos: superficial/medio/profundo por fototipo (Baumann) | Baumann `3200·266616672` Cap24 Chemical Peels · Primary Care `2953·248412820` Cap26 |
| 68 | Microneedling + PRP + cosmecéuticos/skincare con evidencia (Baumann) | Baumann `3200·266617053` Cap27 Microneedling & PRP · Cosmeceuticals `2812` (83 caps) |

## Notas
- **Dependencias del SPEC respetadas:** alfabeto (A) → 80/20 (C/H) → no-errar (D melanoma,
  H47 SJS/TEN, X55/63/64 vascular) → estética sobre base anatómica (X53-55 antes de X59-64).
- Cada átomo debe llenar los **7 pasos del Cerebro Clínico** + `patient_script` (SPEC §3-4)
  durante el free recall; el átomo no pasa el mastery gate sin recitarlos.
- ✅ Resueltos (10-jun): Qbankly Step 2 CK + flashcards (`_scrape/qbankly_derm_step2.json`);
  vídeos Access completos (`_scrape/accessderma_videos_full.json` — "Dermatologic Surgery"
  es una categoría VACÍA y "3D Modules" del menú = Animations).
- `[pendiente]`: duraciones individuales de los 91 vídeos de Kantor (solo n y títulos verificados).
