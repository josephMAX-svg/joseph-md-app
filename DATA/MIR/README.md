# DATA · MIR — España (régimen v6.03 · 20-oct-2026 · ⏸ v6.02c · 18-oct-2026 · ⏸ v6.02 · 17-oct-2026 · ⏸ v6.01 · 10-oct-2026 · ⏸ v6.00 · 6-oct-2026)

Toda la data REAL del plan MIR. Fuente canónica (código): `src/lib/*.ts`. Plataforma:
**ProMIR** (`promir.medicapanamericana.com`) — SPA por WebSocket; deep-link `/capitulo/<id>`.
Abre bien en Chrome (no necesita Edge). Cruzado con **rabi_94** (Google Drive, 1ª vuelta).
Método de referencia: **Palmerton** (comprensión > memorización · preguntas ciegas primero ·
Anki de mecanismo FSRS · medir por % ciego). Meta: Top 50 MIR 2030.

> ## ✅ v6.03 VIGENTE (mar 20-oct-2026 · D1 = MIÉ 21-OCT-2026) — corrimiento +2 hábiles + guía MEDIDA de los 76 días-tema
> Joseph (20-oct): «lun 19 y mar 20 sin estudio → todo arranca el mié 21; simplemente corre, no modifiques ni comprimas temas ni exámenes, alarga las
> fechas límite». Mismos 78 días y 189 sesiones de banqueo; nada se recorta (los bloques v6.02c y v6.02 de abajo quedan como historial).
>
> | Bloque | **v6.03** | ⏸ v6.02 / v6.02c |
> |---|---|---|
> | Diario (1.ª vuelta, 78) | **mié 21-oct-2026 → mié 10-feb-2027** (D77 mini-MIR **mar 9-feb** + D78 corrección **mié 10-feb**) · 15:15-16:15 | lun 19-oct → lun 8-feb (D77 vie 5-feb) |
> | Mantenimiento (57) | **jue 11-feb → jue 6-may-2027** (47 lun-jue + 10 viernes; mismas cuotas y secuencia; sus 4 últimas filas, lun 3 → jue 6-may, ya en el SERUMS) · Tier C (12, mismo orden): jue 11-feb · 18-feb · 25-feb · 4-mar · 18-mar · mié 24-mar · jue 1-abr · 8-abr · 15-abr · 22-abr · 29-abr · 6-may | mar 9-feb → mar 4-may |
> | Extensión hasta el tope | **121** (80 lun-jue · 21 viernes · 20 sábados) **vie 7-may → vie 24-sep-2027** (tope FIJO: día de plan anterior al ritual del Step 1) · Tier C ext 20 | 123 · mié 5-may → vie 24-sep |
> | Repuestas tras el examen Step 1 (F5) | **11** (9 banco · 2 viernes · Tier C Oftalmología · Retina v3 jue 30-sep + Genética v3 jue 7-oct) **mar 28-sep → mar 12-oct-2027**, campo `repuesta:'v6.03'` (mismo mecanismo v6.02c, recalculado con un PISO por asignatura = máx(cuotas v6.00, cuotas publicadas v6.02): Medicina Legal conserva su slot extra) | 9 · mar 28-sep → vie 8-oct (`'v6.02c'`) |
> | `MIR_MANT_DIAS` / `MIR_MANT_META` | **189** filas · 4.990 Q · `MIR_MANT_TIER_C` 34 (= v6.00) · `mant` 2027-02-11 → 2027-05-06 · `ext` 2027-05-07 → 2027-10-12 (`tope` 2027-09-24 = 121 + `repuestas` 11) · **handoff mar 12-oct-2027** | 189 · handoff vie 8-oct |
>
> Generado por `STUDY_HUB/_scrape/gen_mir_daily.js 2026-10-21` + `gen_mir_mantenimiento.js 2027-02-11 2027-05-06` (defaults nuevos, bitácora v6.03).
> Sin cambio: umbral de cierre 70/55 → 75/60 en la fase principal, FSRS 0,85 → 0,90, franjas por turno en F4, protegidos/SKIP.
>
> **Guía MEDIDA D1-D76** (antes solo D1-D10): la medición ProMIR cubre los 76 capítulos del plan (10 el 18-oct + 66 el 20-oct, mismo `analiza_cap.js`,
> solo lectura; el texto del recuadro «Orientación MIR» se retiró de los JSON al versionarlos: repo público). `guia_lectura/gen_guia_lectura.js` (bitácora
> v6.03) → [`guia_lectura_semana1-2.json`](guia_lectura_semana1-2.json) (nombre histórico; 76 días + Derma d1-d5) → `gen_mir_guia.js` → `src/lib/mirGuiaDatos.ts`
> (`MIR_GUIA_MEDIDA` D1-D76 + `MIR_CAP_MEDIDO` para la corrección Whole-Page del banqueo). Mismo método que v6.02c (180 palabras/min · tablas 90 · figura 0,5′ ·
> peso por preguntas citadas ≥2020 ×3 · 2015-19 ×2 · <2015 ×1 · Σ pasos = 60′) con 5 reglas nuevas para capítulos pequeños: pool de los 76 capítulos
> reservado antes de repartir · cierre = pool sin usar + citadas del bloque si no llega a 10 · quiz ≥8 cediendo hasta 4 citadas a las anclas · quiz corto →
> repaso de capítulos ya leídos · lectura con ≥3′ libres → secciones de contexto sin citas. Las anclas de capítulos con muy pocas citadas (17 slots) dicen
> «repite la que FALLASTE ese día». D77/D78 (mini-MIR y corrección) no leen capítulo: guía propia en `src/lib/mirGuia.ts`.
>
> | Día | Capítulo | Texto medido | Citas MIR | Lectura 15′ (secciones) | Para la 2.ª vuelta | Preguntas |
> |---|---|---|---|---|---|---|
> | D1 mié 21-oct | Epidemiología · Estudios experimentales: Ensayo clínico | 7411 + 343 tabla · ≈49,5′ | 97 | 2 · 3.2 · 3.4 · 4 · 6.1 · 6.2 · 8.4 (14,5′) | ≈36′ | pre 5 pool · quiz 10 |
> | D2 jue 22-oct | Epidemiología · Clasificación de los estudios de investigación (Tipos de estudios epidemiológicos) | 2039 + 0 tabla · ≈14,5′ | 63 | 1.1 · 1.2 · 1.3 · 2.1 · 2.2 · 2.3 · 2.4 (13,5′) | ≈2′ | pre 5 pool · quiz 10 |
> | D3 vie 23-oct | Epidemiología · Evaluación de pruebas diagnósticas | 4904 + 94 tabla · ≈32′ | 44 | 3.2 · 3.3 (14′) | ≈19′ | pre 3 pool · quiz 10 |
> | D4 lun 26-oct | Medicina Legal y Bioética · Principios de bioética y relación médico-paciente | 2793 + 0 tabla · ≈16′ | 22 | 1 · 2 · 3 · 4 · 6 · 7 (14′) | ≈3′ | pre 2 pool · quiz 10 · cierre Epidemiología |
> | D5 mar 27-oct | Cardiología · Cardiología básica | 14.944 + 138 tabla · ≈96,5′ | 68 | 2.3 · 3.3 (15′) | ≈82,5′ | pre 4 pool · quiz 10 · cierre Medicina Legal y Bioética |
> | D6 mié 28-oct | Cardiología · Trastornos del ritmo | 13.201 + 248 tabla · ≈103′ | 45 | 3.2 (parcial) (15′) | ≈89′ | pre 5 pool · quiz 10 |
> | D7 jue 29-oct | Cardiología · Cardiopatía isquémica | 9721 + 312 tabla · ≈69′ | 49 | 3.6 (parcial) (15′) | ≈55′ | pre 5 pool · quiz 10 |
> | D8 vie 30-oct | Cardiología · Insuficiencia cardíaca | 21.920 + 1778 tabla · ≈164,5′ | 83 | 6.2 (parcial) (15′) | ≈150,5′ | pre 5 pool · quiz 10 |
> | D9 lun 2-nov | Cardiología · Valvulopatías | 8425 + 300 tabla · ≈61′ | 39 | 2.5 · 5.4 · 6.1 · 8 (15′) | ≈47′ | pre 5 pool · quiz 10 |
> | D10 mar 3-nov | Cardiología · Riesgo cardiovascular. Prevención de las ECVA a través del control de los FRCV | 10.829 + 419 tabla · ≈75,5′ | 44 | 4.1 · 6.4 (14′) | ≈62,5′ | pre 5 pool · quiz 10 |
> | D11 mié 4-nov | Cardiología · Enfermedades del miocardio | 4306 + 133 tabla · ≈34′ | 27 | 3.3 · 3.5 · 5.3 · 5.4 · 7.2 (14,5′) | ≈20,5′ | pre 5 pool · quiz 10 |
> | D12 jue 5-nov | Neumología · Fisiología y fisiopatología del aparato respiratorio | 4483 + 71 tabla · ≈28,5′ | 35 | 2 · 3 (14,5′) | ≈15′ | pre 5 pool · quiz 10 · cierre Cardiología |
> | D13 vie 6-nov | Neumología · Cáncer de pulmón | 4966 + 346 tabla · ≈38,5′ | 45 | 2.4 · 2.7 (14,5′) | ≈25′ | pre 3 pool · quiz 10 |
> | D14 lun 9-nov | Neumología · Enfermedades de la pleura, mediastino y diafragma | 4609 + 46 tabla · ≈32,5′ | 43 | 1.1 (parcial) (15′) | ≈18,5′ | pre 5 pool · quiz 10 |
> | D15 mar 10-nov | Neumología · EPOC | 4960 + 470 tabla · ≈41,5′ | 45 | 7 · 8 (parcial) · 8.9 (15′) | ≈27,5′ | pre 5 pool · quiz 10 |
> | D16 mié 11-nov | Neumología · Enfermedades intersticiales | 4126 + 502 tabla · ≈33,5′ | 41 | 2 · 7 (14,5′) | ≈20′ | pre 5 pool · quiz 10 |
> | D17 jue 12-nov | Nefrología · Fisiología renal: función renal, alteraciones hidroelectrolíticas y equilibrio ácido-base | 13.599 + 598 tabla · ≈93′ | 40 | 1.2 · 3.1 (14,5′) | ≈79,5′ | pre 5 pool · quiz 10 · cierre Neumología |
> | D18 vie 13-nov | Nefrología · Fracaso renal agudo | 3404 + 956 tabla · ≈34′ | 14 | 4 (parcial) · 4.2 · 7.2 (15′) | ≈20′ | pre 3 pool · quiz 8 |
> | D19 lun 16-nov | Nefrología · Glomerulonefritis primarias | 6022 + 1251 tabla · ≈54′ | 22 | 1 (ctx) · 2 (ctx) · 4 · 7 (14′) | ≈41′ | pre 4 pool · quiz 10 |
> | D20 mar 17-nov | Nefrología · Riñón y enfermedades sistémicas | 5177 + 979 tabla · ≈47,5′ | 23 | 1.1 (parcial) · 1.2 · 2 (15′) | ≈33,5′ | pre 3 pool · quiz 10 |
> | D21 mié 18-nov | Nefrología · Insuficiencia renal crónica | 3517 + 364 tabla · ≈27′ | 18 | 2 · 3 · 5.2 (15′) | ≈13′ | pre 5 pool · quiz 10 |
> | D22 jue 19-nov | Nefrología · Síndromes clínicos en nefrología | 2900 + 417 tabla · ≈24′ | 7 | 1 (ctx) · 1.1 (ctx) · 1.2 (ctx) · 1.3 (ctx) · 1.4 (ctx) · 1.5 (ctx) · 2.3 · 3.2 · 3.3 (14,5′) | ≈10,5′ | pre 1 pool · quiz 8 (7 repaso) |
> | D23 vie 20-nov | Gastroenterología · Enfermedades del hígado | 23.946 + 2513 tabla · ≈215,5′ | 123 | 10.2 (parcial) (15′) | ≈201,5′ | pre 5 pool · quiz 10 · cierre Nefrología (1 citadas) |
> | D24 lun 23-nov | Gastroenterología · Enfermedades del colon | 10.966 + 1130 tabla · ≈90′ | 98 | 3.3 · 4.3 (15′) | ≈76′ | pre 5 pool · quiz 10 |
> | D25 mar 24-nov | Gastroenterología · Enfermedades del intestino delgado | 10.044 + 1426 tabla · ≈97,5′ | 80 | 2.1 (parcial) (15′) | ≈83,5′ | pre 4 pool · quiz 10 |
> | D26 mié 25-nov | Gastroenterología · Enfermedades del estómago | 6847 + 931 tabla · ≈62′ | 59 | 4.1 · 5.4 · 5.6 · 6.3 · 7.1 (14,5′) | ≈48,5′ | pre 4 pool · quiz 10 |
> | D27 jue 26-nov | Gastroenterología · Miscelánea de temas quirúrgicos | 4370 + 125 tabla · ≈34,5′ | 53 | 2.1 · 3 (15′) | ≈20,5′ | pre 5 pool · quiz 10 |
> | D28 vie 27-nov | Gastroenterología · Enfermedades del páncreas | 6255 + 1369 tabla · ≈81,5′ | 56 | 2.1 · 2.3 · 3.1 (15′) | ≈67,5′ | pre 5 pool · quiz 10 |
> | D29 lun 30-nov | Gastroenterología · Enfermedades del esófago | 5831 + 484 tabla · ≈68,5′ | 41 | 3.1 (parcial) (15′) | ≈54,5′ | pre 5 pool · quiz 10 |
> | D30 mar 1-dic | Gastroenterología · Enfermedades de la vía biliar | 4246 + 385 tabla · ≈48′ | 28 | 4.3 (parcial) · 4.4 (15′) | ≈34′ | pre 5 pool · quiz 10 |
> | D31 mié 2-dic | Endocrinología y Nutrición · Diabetes mellitus | 7427 + 1504 tabla · ≈84,5′ | 68 | 1 · 3 · 7.2 (15′) | ≈70,5′ | pre 5 pool · quiz 10 · cierre Gastroenterología (10 citadas) |
> | D32 jue 3-dic | Endocrinología y Nutrición · Glándula tiroides | 8018 + 988 tabla · ≈67,5′ | 41 | 5.4 (parcial) · 6.1 · 8.2 (15′) | ≈53,5′ | pre 5 pool · quiz 10 |
> | D33 vie 4-dic | Endocrinología y Nutrición · Hipotálamo e hipófisis | 6557 + 574 tabla · ≈50,5′ | 30 | 2.1 · 3.1 · 3.2 · 7.3 · 7.4 · 7.5 · 10.3 · 10.4 · 11.1 · 11.3 (15′) | ≈36,5′ | pre 2 pool · quiz 10 |
> | D34 lun 7-dic | Endocrinología y Nutrición · Glándulas suprarrenales | 5981 + 619 tabla · ≈54,5′ | 38 | 2.3 · 3.1 · 3.2 · 6.3 · 8 (15′) | ≈40,5′ | pre 4 pool · quiz 10 |
> | D35 mar 8-dic | Endocrinología y Nutrición · Nutrición y obesidad | 3007 + 276 tabla · ≈22′ | 16 | 2 · 2.3 · 3.1 · 3.2 · 3.3 · 4.3 · 4.4 (14,5′) | ≈8,5′ | pre 5 pool · quiz 10 |
> | D36 mié 9-dic | Endocrinología y Nutrición · Alteraciones del metabolismo lipídico | 2695 + 827 tabla · ≈27′ | 20 | 1.1 · 2.1 · 2.2 · 3 · 4.3 (14,5′) | ≈13,5′ | pre 5 pool · quiz 10 |
> | D37 jue 10-dic | Neurología · Semiología | 4704 + 840 tabla · ≈60,5′ | 36 | 2.2 · 7 · 10.3 (14,5′) | ≈47′ | pre 5 pool · quiz 10 · cierre Endocrinología y Nutrición (2 citadas) |
> | D38 vie 11-dic | Neurología · Neurocirugía | 5535 + 743 tabla · ≈56,5′ | 52 | 1.3 · 2.4 (parcial) (15′) | ≈42,5′ | pre 5 pool · quiz 10 |
> | D39 lun 14-dic | Neurología · Enfermedades cerebrovasculares | 3829 + 198 tabla · ≈37,5′ | 34 | 3.2 · 3.4 · 4.1 · 5.4 (15′) | ≈23,5′ | pre 5 pool · quiz 10 |
> | D40 mar 15-dic | Neurología · Trastornos del movimiento | 3201 + 39 tabla · ≈22′ | 29 | 2.1 · 2.2 · 3.4 · 3.5 (14,5′) | ≈8,5′ | pre 5 pool · quiz 10 |
> | D41 mié 16-dic | Neurología · Epilepsia | 2870 + 356 tabla · ≈23,5′ | 27 | 2.1 · 2.2 · 2.4 · 4.1 · 5.2 · 6 (15′) | ≈9,5′ | pre 5 pool · quiz 10 |
> | D42 jue 17-dic | Neurología · Demencias | 2329 + 113 tabla · ≈14,5′ | 26 | 1 · 2 · 3 · 3.1 · 3.2 · 3.3 · 3.4 · 5.1 · 5.2 · 6 · 7 · 8 · 9 · 10 (14′) | ≈1,5′ | pre 4 pool · quiz 10 |
> | D43 vie 18-dic | Neurología · Cefaleas | 2272 + 148 tabla · ≈17′ | 17 | 1 · 2 (ctx) · 2.1 · 2.3 · 3 (ctx) · 3.1 · 3.2 (13′) | ≈5′ | pre 5 pool · quiz 9 |
> | D44 lun 21-dic | Hematología · Alteraciones de la coagulación sanguínea | 7724 + 1778 tabla · ≈72,5′ | 48 | 2.1 (parcial) (15′) | ≈58,5′ | pre 5 pool · quiz 10 · cierre Neurología |
> | D45 mar 22-dic | Hematología · Linfomas | 4414 + 942 tabla · ≈36,5′ | 30 | 1.2 · 1.4 · 2.1 · 2.4 · 2.5 · 2.6 (13,5′) | ≈24′ | pre 4 pool · quiz 10 |
> | D46 mié 23-dic | Hematología · Anemias hemolíticas | 4086 + 426 tabla · ≈28,5′ | 17 | 2.3 · 3.1 (13,5′) | ≈16′ | pre 3 pool · quiz 8 |
> | D47 jue 24-dic | Hematología · Anemias carenciales | 3383 + 115 tabla · ≈22,5′ | 12 | 1.1 · 1.4 · 2.1 (15′) | ≈8,5′ | pre 5 pool · quiz 8 (1 repaso) |
> | D48 lun 28-dic | Hematología · Neoplasias mieloproliferativas crónicas | 3770 + 996 tabla · ≈34,5′ | 19 | 1 · 2.1 · 2.2 · 2.4 · 2.5 · 3.2 · 3.3 · 5 · 5.2 (14′) | ≈21,5′ | pre 2 pool · quiz 8 |
> | D49 mar 29-dic | Enfermedades Infecciosas · Infecciones tropicales | 10.665 + 634 tabla · ≈93′ | 45 | 2.1 (parcial) · 2.4 · 2.5 (15′) | ≈79′ | pre 5 pool · quiz 10 · cierre Hematología (6 citadas) |
> | D50 mié 30-dic | Enfermedades Infecciosas · Infección por el virus de la inmunodeficiencia humana (VIH) | 7071 + 1514 tabla · ≈86′ | 44 | 7.4 (parcial) (15′) | ≈72′ | pre 5 pool · quiz 10 |
> | D51 lun 4-ene | Enfermedades Infecciosas · Tuberculosis | 12.951 + 1542 tabla · ≈98′ | 33 | 2 · 7 · 7.1 · 7.4 (parcial) (15′) | ≈84′ | pre 3 pool · quiz 10 |
> | D52 mar 5-ene | Enfermedades Infecciosas · Infecciones del tracto respiratorio inferior. Neumonía aguda | 9217 + 1077 tabla · ≈67,5′ | 34 | 2.1 (parcial) · 7.2 (15′) | ≈53,5′ | pre 2 pool · quiz 10 |
> | D53 mié 6-ene | Enfermedades Infecciosas · Antibacterianos | 5892 + 1283 tabla · ≈53,5′ | 23 | 1 · 2 · 4.5 · 6.3 (14,5′) | ≈40′ | pre 2 pool · quiz 8 |
> | D54 jue 7-ene | Enfermedades Infecciosas · Infecciones del sistema nervioso central. Meningitis | 6823 + 1267 tabla · ≈55′ | 30 | 1 · 2.3 · 6.1 · 7 · 9.2 (15′) | ≈41′ | pre 3 pool · quiz 10 |
> | D55 vie 8-ene | Enfermedades Infecciosas · Infecciones por hongos. Antifúngicos | 3708 + 449 tabla · ≈30′ | 16 | 2.1 · 2.2 · 2.4 (14,5′) | ≈16,5′ | pre 2 pool · quiz 8 |
> | D56 lun 11-ene | Enfermedades Infecciosas · Sepsis. Infecciones nosocomiales | 6216 + 528 tabla · ≈44,5′ | 16 | 1.1 · 1.6 (14,5′) | ≈31′ | pre 5 pool · quiz 8 |
> | D57 mar 12-ene | Ginecología y Obstetricia · Patología maligna de la mama. Cáncer de mama | 7274 + 1367 tabla · ≈59,5′ | 66 | 7 · 8.1 (parcial) · 8.4 (15′) | ≈45,5′ | pre 1 pool · quiz 10 · cierre Enfermedades Infecciosas |
> | D58 mié 13-ene | Ginecología y Obstetricia · Hemorragia en la gestación | 6395 + 696 tabla · ≈56′ | 28 | 1.2 · 1.3 (parcial) (15′) | ≈42′ | pre 2 pool · quiz 10 |
> | D59 jue 14-ene | Ginecología y Obstetricia · Complicaciones maternas de la gestación | 10.473 + 694 tabla · ≈73,5′ | 19 | 1.2 · 2.7 (parcial) (15′) | ≈59,5′ | pre 5 pool · quiz 10 |
> | D60 vie 15-ene | Ginecología y Obstetricia · Infecciones y embarazo | 9342 + 327 tabla · ≈61,5′ | 12 | 3 · 4 · 9 · 19.2 (15′) | ≈47,5′ | pre 1 pool · quiz 8 (2 repaso) |
> | D61 lun 18-ene | Ginecología y Obstetricia · Control de la gestación | 3917 + 377 tabla · ≈35′ | 11 | 1.1 (13,5′) | ≈22,5′ | pre 5 pool · quiz 8 (2 repaso) |
> | D62 mar 19-ene | Ginecología y Obstetricia · Masas anexiales. Patología maligna del ovario | 5153 + 574 tabla · ≈39,5′ | 14 | 2.1 · 5 (parcial) · 6 (15′) | ≈25,5′ | pre 2 pool · quiz 8 |
> | D63 mié 20-ene | Reumatología · Vasculitis | 4331 + 252 tabla · ≈38′ | 42 | 2.1 (parcial) · 3.1 (15′) | ≈24′ | pre 5 pool · quiz 10 · cierre Ginecología y Obstetricia |
> | D64 jue 21-ene | Reumatología · Espondiloartropatías | 3065 + 269 tabla · ≈28′ | 29 | 2.3 · 2.5 · 5 (15′) | ≈14′ | pre 5 pool · quiz 10 |
> | D65 vie 22-ene | Reumatología · Otras conectivopatías | 3486 + 239 tabla · ≈28′ | 30 | 1.1 (parcial) (15′) | ≈14′ | pre 5 pool · quiz 10 |
> | D66 lun 25-ene | Reumatología · Artritis reumatoide | 2837 + 287 tabla · ≈34′ | 25 | 2.2 · 3.1 · 3.2 · 4.1 · 4.2 · 6 · 6.3 (14,5′) | ≈20,5′ | pre 1 pool · quiz 10 |
> | D67 mar 26-ene | Reumatología · Artropatias inducidas por cristales | 2250 + 199 tabla · ≈26′ | 19 | 1.1 · 1.2 (ctx) · 1.3 · 1.4 · 2.2 · 2.3 (14,5′) | ≈12,5′ | pre 3 pool · quiz 10 |
> | D68 mié 27-ene | Reumatología · Lupus eritematoso sistémico. Síndrome antifosfolípido | 3543 + 581 tabla · ≈29′ | 20 | 1.3 · 1.7 · 2.2 · 2.3 (15′) | ≈15′ | pre 3 pool · quiz 10 |
> | D69 jue 28-ene | Pediatría · Patología aparato digestivo | 10.093 + 667 tabla · ≈72′ | 45 | 1.4 (parcial) · 3.4 (15′) | ≈58′ | pre 5 pool · quiz 10 · cierre Reumatología (2 citadas) |
> | D70 vie 29-ene | Pediatría · Neonatología | 18.244 + 906 tabla · ≈129,5′ | 32 | 1.2 · 2 · 5.2 (15′) | ≈115,5′ | pre 5 pool · quiz 10 |
> | D71 lun 1-feb | Pediatría · Desarrollo y nutrición | 6775 + 533 tabla · ≈54′ | 27 | 2.2 · 2.3 · 2.5 · 3 (12,5′) | ≈42,5′ | pre 3 pool · quiz 10 |
> | D72 mar 2-feb | Pediatría · Patología infecciosa | 5635 + 449 tabla · ≈47′ | 21 | 1.3 · 1.8 · 1.9 · 2 (14′) | ≈34′ | pre 5 pool · quiz 10 |
> | D73 mié 3-feb | Pediatría · Vacunación infantil | 4201 + 128 tabla · ≈25′ | 36 | 2 · 5 · 5.1 (15′) | ≈11′ | pre 3 pool · quiz 10 |
> | D74 jue 4-feb | Psiquiatría · Trastornos del estado de ánimo | 8437 + 438 tabla · ≈55′ | 53 | 5.3 · 7.2 (14,5′) | ≈41,5′ | pre 5 pool · quiz 10 · cierre Pediatría (3 citadas) |
> | D75 vie 5-feb | Psiquiatría · Actualización de los trastornos neuróticos | 8245 + 421 tabla · ≈54′ | 36 | 1.1 · 2.1 (parcial) (15′) | ≈40′ | pre 4 pool · quiz 10 |
> | D76 lun 8-feb | Psiquiatría · Trastornos psicóticos | 4390 + 241 tabla · ≈31,5′ | 27 | 2 · 2.1 · 2.2 · 2.5 · 2.7 · 3.1 · 4.2 · 5.1 (14,5′) | ≈18′ | pre 5 pool · quiz 10 |
>
> ## ✅ v6.02c (dom 18-oct-2026) — se REPONE lo recortado de la extensión + guía de lectura D1-D10 (⏸ historial: fechas y filas al día en el bloque v6.03 de arriba)
> Joseph (18-oct): «si faltan temas o se recortó algo, alárgalo» y «QUÉ leer, CUÁNTO leer, CÓMO leer — no puede estar al azar».
>
> **1 · Reposición (decisión (i) de `PENDIENTES_JOSEPH.md`, bloque v6.02 → RESUELTA).** Los corrimientos v6.01/v6.02 comprimieron la extensión
> (131 → 128 → 123 filas: −6 banco, −2 viernes y 2 Tier C de la vuelta 3, «Genética · Enfermedades genéticas v3» y «Oftalmología · Retina v3»).
> `gen_mir_mantenimiento.js` (bitácora v6.02c) las re-fecha DESPUÉS de los protegidos del examen Step 1 (25-27-sep), en F5, cada sesión en un
> día de su tipo y el Tier C en el último lun-jue de la semana: **+9 filas d181-d189, mar 28-sep → vie 8-oct-2027** —
> mar 28 Cardiología · mié 29 Gastroenterología · **jue 30-sep Neurología + Tier C Oftalmología · Retina v3** · vie 1-oct viernes (peor del log) ·
> lun 4 Enf. Infecciosas · mar 5 Endocrinología · mié 6 Neumología · **jue 7-oct Reumatología + Tier C Genética · Enfermedades genéticas v3** ·
> vie 8-oct viernes; sáb 2-oct sin fila (no se perdió ningún sábado). Las 180 filas existentes son **byte-idénticas**; `MIR_MANT_DIAS` 180 → **189**
> (v6.00 = 188: el +1 es el slot extra que el redondeo de v6.02 dio a Medicina Legal, que se conserva), `MIR_MANT_TIER_C` 32 → **34** (= v6.00),
> 4.755 → **4.990 Q** (v6.00 = 4.965), todas las asignaturas con ≥ los slots lun-jue de v6.00. Filas repuestas: `fase:'extension'` + `repuesta:'v6.02c'`;
> `MIR_MANT_META.ext` = 132 (`tope` vie 24-sep = 123 + `repuestas` 9). **Handoff → vie 8-oct-2027** (última sesión del banqueo; `MIR_HITOS` lo
> deriva de `MIR_MANT_META.fin`). Sin cambio: umbral de cierre 70/55 hasta el vie 24-sep → 75/60 después (`mirEvalLog`), FSRS 0,85 → 0,90.
> `--sin-reposicion` reproduce la salida v6.02 (180 filas).
>
> **2 · Guía de lectura D1-D10 (lun 19 → vie 30-oct) + Derma d1-d3** → [`guia_lectura_semana1-2.json`](guia_lectura_semana1-2.json), generada por
> [`guia_lectura/gen_guia_lectura.js`](guia_lectura/gen_guia_lectura.js) (`--check`) desde la medición real de ProMIR del 18-oct
> (`guia_lectura/medicion_promir_2026-10-18/<capId>.json`, `analiza_cap.js`, solo lectura). Cada día = un bloque 15:15–16:15 en formato GuiaBloque
> (pasos de 60′ con qué/cómo/enlace + recursos + «hecho» + plan B) y la lista de preguntas de cada paso (pre-test, quiz, evals de los días
> siguientes, cierres) sin repetir ninguna. Método: palabras deduplicadas (ProMIR repite el párrafo que cruza de columna), **180 palabras/min**
> (tablas 90, figura 0,5′), peso de cada sección = sus preguntas MIR citadas en el propio capítulo (≥2020 ×3 · 2015-19 ×2 · <2015 ×1),
> lectura dirigida 15′ = Orientación MIR 1′ + secciones por peso (la de más peso, PARCIAL si no cabe); lo demás → 2.ª vuelta (oct-2027).
> El pool de la app (MIR 2022-2026) da 2-12Q por capítulo: 5 al pre-test (si hay menos, se completa con citadas ≥2015) y el resto abre el quiz; lo demás sale de las preguntas MIR **citadas en el capítulo**
> (chips «MIR AAAA-AAAA, Pnnn» → `/pregunta/MIR/AAAA-nnn`; equivalencia pool `2024-050` = ProMIR `2023-050`, verificada).
>
> | Día | Capítulo | Texto medido | Citas MIR | Lectura 15′ (secciones) | Para la 2.ª vuelta | Pool app · quiz |
> |---|---|---|---|---|---|---|
> | D1 lun 19-oct | Epidemiología · Estudios experimentales: Ensayo clínico | 7411 + 343 tabla · ≈49,5′ | 97 | 2 · 3.2 · 3.4 · 4 · 6.1 · 6.2 · 8.4 (14,5′) | ≈36′ | 5Q · quiz 10 citadas |
> | D2 mar 20-oct | Epidemiología · Clasificación de los estudios de investigación | 2039 + 0 tabla · ≈14,5′ | 63 | 1.1 · 1.2 · 1.3 · 2.1 · 2.2 · 2.3 · 2.4 (13,5′) | ≈2′ | 5Q · quiz 10 citadas |
> | D3 mié 21-oct | Epidemiología · Evaluación de pruebas diagnósticas | 4904 + 94 tabla · ≈32′ | 44 | 3.2 · 3.3 (14′) | ≈19′ | 3Q · quiz 10 citadas |
> | D4 jue 22-oct | Medicina Legal y Bioética · Principios de bioética y relación médico-paciente | 2793 + 0 tabla · ≈16′ | 22 | 1 · 2 · 3 · 4 · 6 · 7 (14′) | ≈3′ | 2Q · quiz 10 citadas |
> | D5 vie 23-oct | Cardiología · Cardiología básica | 14.944 + 138 tabla · ≈96,5′ | 68 | 2.3 · 3.3 (15′) | ≈82,5′ | 4Q · quiz 10 citadas |
> | D6 lun 26-oct | Cardiología · Trastornos del ritmo | 13.201 + 248 tabla · ≈103′ | 45 | 3.2 (parcial) (15′) | ≈89′ | 12Q · quiz 7 pool + 3 citadas |
> | D7 mar 27-oct | Cardiología · Cardiopatía isquémica | 9721 + 312 tabla · ≈69′ | 49 | 3.6 (parcial) (15′) | ≈55′ | 6Q · quiz 1 pool + 9 citadas |
> | D8 mié 28-oct | Cardiología · Insuficiencia cardíaca | 21.920 + 1778 tabla · ≈164,5′ | 83 | 6.2 (parcial) (15′) | ≈150,5′ | 9Q · quiz 4 pool + 6 citadas |
> | D9 jue 29-oct | Cardiología · Valvulopatías | 8425 + 300 tabla · ≈61′ | 39 | 2.5 · 5.4 · 6.1 · 8 (15′) | ≈47′ | 10Q · quiz 5 pool + 5 citadas |
> | D10 vie 30-oct | Cardiología · Riesgo cardiovascular. Prevención de las ECVA a través del control de los FRCV | 10.829 + 419 tabla · ≈75,5′ | 44 | 4.1 · 6.4 (14′) | ≈62,5′ | 5Q · quiz 10 citadas |
>
> Derma (bloque 13:30): d3 vie 23-oct, slot 13:52–14:03 = TEST ProMIR cap. 1 → **8Q** (11′ a 77 s/Q) de las **11** citadas en el capítulo (el pool
> de la app tiene 0 de ese capítulo); plan B de la lectura 14:03–14:13 mientras AccessDermatology dé 403: d1 cap. 1 §2.1-2.2 (8,5′) · d2 §2.3 (6′) ·
> d3 §1.1-1.3 + §3 (7,5′). No verificado: duración del audio «escuchar todo el tema» y nº de preguntas de «Entrenar» por capítulo (no se abrió el
> creador de tests).

> ## ⏸ v6.02 (historial; sáb 17-oct-2026 · D1 = LUN 19-OCT-2026) — corrige las fechas de los bloques v6.01 y v6.00; DJ-4 (1 h/día siempre) sin cambio
> Del lun 12 al vie 16-oct no se estudió → todo corre +5 hábiles con el D1; el tope de la extensión (vie 24-sep, día de plan anterior al ritual del Step 1)
> es FIJO.
>
> | Bloque | **v6.02** | ⏸ v6.01 |
> |---|---|---|
> | Diario (1.ª vuelta, 78) | **lun 19-oct-2026 → lun 8-feb-2027** (D77 mini-MIR **vie 5-feb** + D78 corrección **lun 8-feb**) · 15:15-16:15 | lun 12-oct → lun 1-feb (D77 vie 29-ene) |
> | Mantenimiento (57) | **mar 9-feb → mar 4-may-2027** (47 lun-jue + 10 viernes; mismas cuotas; sus 2 últimas filas, lun 3 y mar 4-may, ya caen en el SERUMS: `MirTodayPlan` resuelve la franja por fecha) · Tier C (12, mismo orden): jue 11-feb · 18-feb · 25-feb · 4-mar · 18-mar · mié 24-mar · jue 1-abr · 8-abr · 15-abr · 22-abr · 29-abr · **mar 4-may** (Planificación) | mar 2-feb → mar 27-abr (Tier C desde jue 4-feb) |
> | Extensión | **123** (82 lun-jue · 21 viernes · 20 sábados) **mié 5-may → vie 24-sep-2027** · Tier C ext **20** (vueltas 12 · 8: la 3.ª termina el jue 23-sep con Urología y deja fuera además **«Oftalmología · Retina v3»** → decisión (i) de `DATA/PENDIENTES_JOSEPH.md`, bloque v6.02 → **RESUELTA v6.02c: repuestas tras el Step 1, ver arriba**) | 128 (86 · 22 · 20) mié 28-abr → vie 24-sep · Tier C ext 21 (sin Genética v3) |
> | `MIR_MANT_DIAS` / `MIR_MANT_META` | **180** filas (`d` 1-57 mantenimiento · 58-180 extensión); `mant` 2027-02-09 → 2027-05-04 · `ext` 2027-05-05 → 2027-09-24 · `MIR_MANT_TIER_C` 32 | 185 · Tier C 33 |
>
> Handoff (vie 24-sep → fase principal oct-2027), umbral de cierre 70/55 → 75/60 desde oct-2027, FSRS 0,85 → 0,90, franjas por turno en F4, protegidos/SKIP:
> **sin cambio**. Generado por `gen_mir_daily.js 2026-10-19` + `gen_mir_mantenimiento.js 2027-02-09 2027-05-04` (defaults nuevos).

> ## ⏸ v6.01 (sáb 10-oct-2026 · D1 = LUN 12-OCT-2026) — corregía las fechas del bloque v6.00 · **historial: lo corrige el bloque v6.02 de arriba**
> El 7, 8 y 9-oct no se estudiaron → todo corre +3 hábiles con el D1; el tope de la extensión (vie 24-sep, día de plan anterior al ritual del Step 1) es FIJO.
>
> | Bloque | **v6.01** | ⏸ v6.00 |
> |---|---|---|
> | Diario (1.ª vuelta, 78) | **lun 12-oct-2026 → lun 1-feb-2027** (D77 mini-MIR **vie 29-ene** + D78 corrección **lun 1-feb**) · 15:15-16:15 | mié 7-oct → mié 27-ene (D77 mar 26-ene) |
> | Mantenimiento (57) | **mar 2-feb → mar 27-abr-2027** (47 lun-jue + 10 viernes; mismas cuotas) · Tier C (12, mismo orden): jue 4-feb · 11-feb · 18-feb · 25-feb · 4-mar · 18-mar · mié 24-mar · jue 1-abr · 8-abr · 15-abr · 22-abr · **mar 27-abr** (Planificación) | jue 28-ene → jue 22-abr (Tier C desde jue 28-ene) |
> | Extensión | **128** (86 lun-jue · 22 viernes · 20 sábados, el primero sáb 8-may) **mié 28-abr → vie 24-sep-2027** · Tier C ext **21** (se cae el último: Genética, vuelta 3 → decisión (a) de `DATA/PENDIENTES_JOSEPH.md`, recomendación: aceptar) | 131 (88 · 23 · 20) vie 23-abr → vie 24-sep · Tier C ext 22 |
> | `MIR_MANT_DIAS` / `MIR_MANT_META` | **185** filas (`d` 1-57 mantenimiento · 58-185 extensión); `mant` 2027-02-02 → 2027-04-27 · `ext` 2027-04-28 → 2027-09-24 | 188 |
>
> Handoff (vie 24-sep → fase principal oct-2027), umbral de cierre 70/55 → 75/60 desde oct-2027, FSRS 0,85 → 0,90, franjas por turno en F4, protegidos/SKIP:
> **sin cambio**. Generado por `gen_mir_daily.js 2026-10-12` + `gen_mir_mantenimiento.js 2027-02-02 2027-04-27` (defaults nuevos).

> ## ⏸ v6.00 (REESTRUCTURACIÓN ANUAL, decidida el mar 6-oct-2026 · arrancaba el mié 7-oct-2026) — vigente salvo las fechas y cifras que corrigen los bloques v6.02 y v6.01 de arriba
> **DJ-4 (decisión de Joseph): MIR mantiene su horario — 1 h/día en TODAS las fases**; el resto de secundarios baja como mucho a 30'. Fuente única de fechas:
> `DATA/_scripts/_fechas_v6.json`; plan generado: `src/lib/mirMantenimiento.ts` (por `gen_mir_mantenimiento.js` v6, que lee `skip`, `protegidos` y `serums.inicio`).
>
> | Bloque | Fechas | Días | Franja | Contenido |
> |---|---|---|---|---|
> | Diario (1.ª vuelta) | mié 7-oct-2026 → mié 27-ene-2027 *(⏸ v6.00 · ⏸ v6.01: lun 12-oct → lun 1-feb · **v6.02:** lun 19-oct → lun 8-feb)* | **78** (intacto: 76 temas + D77 mini-MIR mar 26-ene + D78 corrección mié 27-ene) | 15:15-16:15 | sin cambio (`mirDailyPlan.ts`) |
> | Mantenimiento | jue 28-ene → **jue 22-abr-2027** *(⏸ v6.00 · ⏸ v6.01: mar 2-feb → mar 27-abr · **v6.02:** mar 9-feb → mar 4-may)* | **57** (47 lun-jue + 10 viernes) | 15:15-16:15 | banqueo por peso + viernes = 30Q de la asignatura peor del log + 12 Tier C |
> | **Extensión (nueva)** | **vie 23-abr → vie 24-sep-2027** (último día con estudio antes del Step 1) | **131** *(⏸ v6.00 · ⏸ v6.01: mié 28-abr → vie 24-sep · 128 · **v6.02:** mié 5-may → vie 24-sep · 123)* (88 lun-jue · 23 viernes · **20 sábados**, el primero sáb 8-may) | F3 15:15-16:15 · F4 por turno: **M 16:00-17:00 · T 10:35-11:35 · L 15:15-16:15 · día de hito 04:05-05:05 · guardia: 1 h en tiempo muerto** | igual que el mantenimiento + **sábado = 30Q mixtas de las 14 asignaturas (mini-simulacro, 77 s/Q) + corrección**; Tier C express repitiendo el ciclo de las 12 con preguntas no usadas |
> | Fase principal | desde oct-2027 (tras el Step 1 del lun 27-sep) | — | — | `MIR_MANT_META.handoff` (vie 24-sep → fase principal) |
>
> - `MIR_MANT_DIAS` = **188** filas *(⏸ v6.00 · ⏸ v6.01: 185 · **v6.02:** 180)* (`d` 1-57 `fase:'mantenimiento'` · 58-188 `fase:'extension'`); `MIR_MANT_META.totalDias = 188` (lo usa la navegación de
>   `MirTodayPlan`). Adelanto (examen 31-ago): extensión 107 filas → vie 27-ago · plan B (25-oct): 155 → vie 22-oct.
> - **Modo REDUCIDO ELIMINADO** (`REDUCIDO_HASTA = null`): su motivo era el sprint del Step 1 de febrero, que ya no existe; las 17 filas 28-ene → 19-feb pasan
>   de 10Q a 25Q/30Q (más contenido, nada se quita). Reversible con una constante si Joseph prefiere aliviar la F2 (decisión abierta).
> - **Tier C del mantenimiento (12):** jue 28-ene Traumatología *(⏸ v6.00 · ⏸ v6.01: jue 4-feb … mar 27-abr; + 21 en la extensión · **v6.02:** lista v6.02 en el bloque de arriba: jue 11-feb … mar 4-may; + 20 en la extensión)* · jue 4-feb Traumatología · jue 11-feb Radiología-Urgencias · jue 18-feb Oncología Médica · jue
>   25-feb Geriatría · jue 4-mar ORL · jue 18-mar Cuidados Paliativos · **mié 24-mar** Urología · jue 1-abr Oftalmología · jue 8-abr Genética · jue 15-abr
>   Inmunología · jue 22-abr Planificación y Gestión Sanitaria (+ 22 en la extensión).
> - **Días sin fila MIR:** SKIP 25-dic · 31-dic · 1-ene · 25-mar · 26-mar y protegidos v6 **vie 12-mar** (D-1 hábil del ENCAPS; decisión abierta: si Joseph
>   quiere su hora MIR esa tarde, se quita del set y se regenera, +1 fila) · sáb 13 · dom 14 · lun 15-mar · sáb 25 · dom 26 · lun 27-sep. Los protegidos v5.20
>   (22-feb, 9-mar, 10-mar) vuelven a ser días de plan. Sábados solo desde el inicio del SERUMS (~lun 3-may [S]).
> - Retención FSRS `APEX::MIR` **0,85 hasta el Step 1**; 0,90 al empezar la fase principal (oct-2027). En el SERUMS la franja la da la plantilla del turno
>   (`mirFranjaPorTurno`); lo que no se termine en una guardia se suma al día de plan siguiente (nunca se pierde).
> - ⏸ Los bloques «v5.20 (6-oct-2026, VIGENTE …)» y anteriores de abajo, §3 (franja única 15:15), **§4.2 (handoff 22-abr, umbral 70/55 → 75/60 desde el
>   23-abr)**, **§5 (FSRS 0,85 → 0,90 desde el 23-abr, handoff 22-abr)** y §6 (58 días, reducido, handoff 22-abr) quedan **SUPERSEDIDOS** donde contradigan
>   este bloque (v6.00: handoff **vie 24-sep-2027**, ≥ 60 · umbral de cierre **70/55 hasta el vie 24-sep-2027 y 75/60 desde oct-2027** · FSRS **0,85 hasta el
>   Step 1 → 0,90 desde oct-2027**); se conservan como historial.

> v3 "cero puntos ciegos" (5-sep-2026): selección por Peso MIR + núcleo rabi_94, Epi/Bioética
> en D1-D4, bloques alineados al Step 1, eval multi-temporal, registro de mediciones, test de
> cierre, mini-MIR D77, modo banqueo ene-mar 2027. El Calendar (15:15-16:15 L-V) NO cambia.
>
> ⏸ *(SUPERSEDIDO por v6.00 en el mantenimiento; el plan diario de 78 días sigue igual)* **v5.20 (6-oct-2026, VIGENTE · corrimiento DEFINITIVO): D1 = MIÉ 7-OCT-2026.** El mar 6-oct tampoco se estudió → +1 día hábil
> sobre v5.19. Es el **decimonoveno corrimiento** (31-ago → 7-oct; 27 días hábiles perdidos) y Joseph lo fijó como el definitivo (6-oct). Sigue la **regla RÍGIDA** (solo corren los
> días: ni un tema ni un subtema se toca, los hitos NBME/UWSA corren con el plan **conservando su D#** — con D1 en miércoles caen casi todos
> en MARTES — y donde había un fin clavado se **AMPLÍAN días** en vez de perder sesiones; **no se fusiona ni se recorta nada** y no se borra ninguna evaluación).
> El plan sigue teniendo **78 días** (76 temas + D77 mini-MIR + D78 corrección) y las franjas, metas y contenidos son idénticos: solo se re-fechó.
> Con los saltos del 25-dic, 31-dic y 1-ene, el último tema (D76, Psicóticos) queda el **lun 25-ene-2027**, D77 (mini-MIR) pasa al
> **mar 26-ene-2027** (= día del UWSA2, D77 del Step 1) y D78 (corrección) al **mié 27-ene-2027**.
> Con D1 en miércoles, **D5 Cardiología (mar 13-oct) precede a Cardiovascular Step 1 (D6 mié 14-oct) por 1 día hábil = +1 día natural**.
> **Novedad v5.20 — DÍAS PROTEGIDOS sin sesión MIR:** lun 22-feb (examen Step 1) · mar 9-mar (D-1 ENCAPS) · mié 10-mar (examen ENCAPS/SERUMS 2027-I, FIJADO por Joseph).
> El mantenimiento se regeneró para no solapar: arranca el **jue 28-ene-2027** y termina el **jue 22-abr-2027 (58 días)** con los MISMOS **46 slots lun-jue** + **12 viernes** (se AMPLÍA porque arranca en jueves y los 3 días protegidos caen en lun-jue; 0 sesiones perdidas; cuotas por peso idénticas a v5.16-v5.19). Los 12 slots Tier C (mismas asignaturas y capítulos) caen en el **último slot lun-jue de cada semana del `.ts`**: los **12 en JUEVES** (jue 28-ene → **jue 22-abr = D58, último día del plan**); como el generador abre semana con cada lunes del plan y el lun 22-feb está protegido, 15-19 feb y 23-26 feb forman una sola "semana 4" → **el jue 18-feb ya no es Tier C** (10Q mixtas Gine + Pediatría) y **Oncología Médica pasa al jue 25-feb (D20, modo normal)**. Su modo reducido cubre **jue 28-ene → vie 19-feb** (17 días; `REDUCIDO_HASTA = '2027-02-19'` = D95 del Step 1); el **lun 22-feb (examen) NO lleva sesión MIR** y el modo normal arranca el **mar 23-feb (D18)**, día 1 de la intensiva ENCAPS. ✅ Resuelto frente a v5.19: ningún Tier C ni sesión MIR cae en la víspera hábil ni en el día del examen. ⚠ **Consecuencia v5.20 en el Step 1:** el plan de 95 días termina el **vie 19-feb-2027 (D95 = último día del plan / D-1 hábil; D94 jue 18-feb = última sesión de banco)**, el sáb 20 y el dom 21-feb quedan libres (dom 21 = D-1 real, sin estudio) y el examen pasa al **LUN 22-FEB-2027** (Joseph debe agendar/reprogramar Prometric y confirmar el eligibility period — `DATA/PENDIENTES_JOSEPH.md`). ✅ `MIR_HITOS.handoff`, `MIR_CIERRE_UMBRAL_FASES`, la retención FSRS y `MIR_MANT_META.handoff` llevan el **22-abr-2027** (último día del mantenimiento; fase principal desde el **vie 23-abr-2027**). Fechas leídas de los dos `.ts` con node el 6-oct, no estimadas.
>
> **v5.19 (5-oct-2026, SUPERSEDIDO por v5.20): D1 = MAR 6-OCT-2026.** El lun 5-oct tampoco se estudió → +1 día hábil
> sobre v5.18. Es el **decimoctavo corrimiento** (31-ago → 6-oct; 26 días hábiles perdidos). Sigue la **regla RÍGIDA** (solo corren los
> días: ni un tema ni un subtema se toca, los hitos NBME/UWSA corren con el plan **conservando su D#** — con D1 en martes caen casi todos
> en LUNES — y donde había un fin clavado se **AMPLÍAN días** en vez de perder sesiones; **no se fusiona ni se recorta nada** y no se borra ninguna evaluación).
> El plan sigue teniendo **78 días** (76 temas + D77 mini-MIR + D78 corrección) y las franjas, metas y contenidos son idénticos: solo se re-fechó.
> Con los saltos del 25-dic, 31-dic y 1-ene, el último tema (D76, Psicóticos) queda el **vie 22-ene-2027**, D77 (mini-MIR) pasa al
> **lun 25-ene-2027** (= día del UWSA2, D77 del Step 1) y D78 (corrección) al **mar 26-ene-2027**.
> Con D1 en martes, **D5 Cardiología (lun 12-oct) precede a Cardiovascular Step 1 (D6 mar 13-oct) por 1 día hábil = +1 día natural**.
> El mantenimiento se regeneró para no solapar: arranca el **mié 27-ene-2027** y termina el **jue 15-abr-2027 (57 días)** con los MISMOS **46 slots lun-jue** + **11 viernes** (0 sesiones perdidas; cuotas por peso idénticas a v5.16-v5.18). Los 12 slots Tier C (mismas asignaturas y capítulos) caen en el **último slot lun-jue de cada semana real**: los **12 en JUEVES** (jue 28-ene → **jue 15-abr = D57, último día del plan**). Su modo reducido cubre hasta el **vie 19-feb** inclusive (= día del examen Step 1; `modoReducidoHasta = '2027-02-19'`, 18 días). ⚠ **Consecuencia v5.19 en el Step 1:** el plan de 95 días termina el **jue 18-feb-2027 (D95 = D-1 real, sesión mínima AM)** y el examen pasa al **VIE 19-FEB-2027** (el mié 17-feb = D94 es la última sesión de banco; sin finde entre D94 y D95; Joseph debe agendar/reprogramar Prometric y confirmar el eligibility period — decisión suya en `DATA/PENDIENTES_JOSEPH.md`). El **jue 18-feb (D17 del mantenimiento = D95 = VÍSPERA del examen) es jueves Tier C (Oncología Médica)** en modo reducido y el vie 19-feb (examen) es el **D18, último día reducido** (viernes: 10Q de la asignatura peor del log, fallback Cardiología): decisión de Joseph si esos días deben ir vacíos. ✅ `MIR_HITOS.handoff`, `MIR_CIERRE_UMBRAL_FASES`, la retención FSRS y `MIR_MANT_META.handoff` llevan el **15-abr-2027** (último día del mantenimiento; fase principal desde el vie 16-abr-2027). Fechas leídas de los dos `.ts` con node el 5-oct, no estimadas.
>
> **v5.18 (3-oct-2026): D1 = LUN 5-OCT-2026.** Ni el jue 1 ni el vie 2 de octubre se estudiaron → +2 días hábiles
> sobre v5.17. Es el **decimoséptimo corrimiento** (31-ago → 5-oct; 25 días hábiles perdidos). Sigue la **regla RÍGIDA** (solo corren los
> días: ni un tema ni un subtema se toca, los hitos NBME/UWSA corren con el plan **conservando su D#** — con D1 en lunes vuelven a caer casi todos
> en VIERNES — y donde había un fin clavado se **AMPLÍAN días** en vez de perder sesiones; **no se fusiona ni se recorta nada**).
> El plan sigue teniendo **78 días** (76 temas + D77 mini-MIR + D78 corrección) y las franjas, metas y contenidos son idénticos: solo se re-fechó.
> Con los saltos del 25-dic, 31-dic y 1-ene, el último tema (D76, Psicóticos) queda el **jue 21-ene-2027**, D77 (mini-MIR) pasa al
> **vie 22-ene-2027** (= día del UWSA2, D77 del Step 1) y D78 (corrección) al **lun 25-ene-2027**.
> Con D1 en lunes, **D5 Cardiología (vie 9-oct) precede a Cardiovascular Step 1 (D6 lun 12-oct) por 1 día hábil = +3 días naturales**.
> El mantenimiento se regeneró para no solapar: arranca el **mar 26-ene-2027** y termina el **mié 14-abr-2027 (57 días)**: con el arranque de nuevo en martes (como en v5.16) 57 días bastan para conservar los **46 slots lun-jue** (+ **11 viernes**; 0 sesiones perdidas; cuotas por peso idénticas a v5.16/v5.17 — el viernes extra de repaso que v5.17 sumaba por arrancar en viernes ya no hace falta). Los 12 slots Tier C (mismas asignaturas y capítulos) caen en el **último slot lun-jue de cada semana real**: 11 en JUEVES (jue 28-ene → jue 8-abr) y el 12.º el **MIÉ 14-abr (D57, último día del plan; su semana solo tiene lun-mié)**. Su modo reducido cubre hasta el **jue 18-feb** inclusive (= día del examen Step 1; `modoReducidoHasta = '2027-02-18'`, 18 días). ⚠ **Consecuencia v5.18 en el Step 1:** el plan de 95 días termina el **mié 17-feb-2027 (D95 = D-1 real, sesión mínima AM)** y el examen pasa al **JUE 18-FEB-2027** (el mar 16-feb = D94 es la última sesión de banco; ya NO hay finde entre D94 y D95; Joseph debe agendar/reprogramar Prometric y confirmar el eligibility period — decisión suya en `DATA/PENDIENTES_JOSEPH.md`). El jue 18-feb (examen) es el D18 del mantenimiento, el **último día en modo reducido** y además **jueves Tier C (Oncología Médica)**, como en v5.16: decisión de Joseph si ese día debe ir vacío. ✅ `MIR_HITOS.handoff`, `MIR_CIERRE_UMBRAL_FASES`, la retención FSRS y `MIR_MANT_META.handoff` llevan el **14-abr-2027** (último día del mantenimiento; fase principal desde el jue 15-abr-2027). Fechas leídas de los dos `.ts` con node el 3-oct, no estimadas.
>
> **v5.17 (30-sep-2026): D1 = JUE 1-OCT-2026.** Ni el lun 28, ni el mar 29 ni el mié 30 de septiembre se estudiaron → +3 días hábiles
> sobre v5.16. Es el **decimosexto corrimiento** (31-ago → 1-oct; 23 días hábiles perdidos). Sigue la **regla RÍGIDA** (solo corren los
> días: ni un tema ni un subtema se toca, los hitos NBME/UWSA corren con el plan **conservando su D#** — con D1 en jueves caen casi todos
> en MIÉRCOLES — y donde había un fin clavado se **AMPLÍAN días** en vez de perder sesiones; **no se fusiona ni se recorta nada**).
> El plan sigue teniendo **78 días** (76 temas + D77 mini-MIR + D78 corrección) y las franjas, metas y contenidos son idénticos: solo se re-fechó.
> Con los saltos del 25-dic, 31-dic y 1-ene, el último tema (D76, Psicóticos) queda el **mar 19-ene-2027**, D77 (mini-MIR) pasa al
> **mié 20-ene-2027** (= día del UWSA2, D77 del Step 1) y D78 (corrección) al **jue 21-ene-2027**.
> Con D1 en jueves, **D5 Cardiología (mié 7-oct) precede a Cardiovascular Step 1 (D6 jue 8-oct) por 1 día hábil = +1 día natural**.
> El mantenimiento se regeneró para no solapar: arranca el **vie 22-ene-2027** y, por la regla rígida, **se AMPLÍA el fin del mié 7-abr al mar 13-abr-2027 (58 días)**: con +3 hábiles exactos (57 días, fin lun 12-abr) el arranque en viernes dejaba 45 slots lun-jue y se perdía uno de Neurología, así que el generador suma un 4.º hábil y conserva los **46 slots lun-jue** (+ **12 viernes**; 0 sesiones perdidas; cuotas por peso idénticas a v5.16). Los 12 slots Tier C (mismas asignaturas y capítulos) caen en el **último slot lun-jue de cada semana real con lun-jue** (la semana 1 es solo el vie 22-ene): 11 en JUEVES (jue 28-ene → jue 8-abr) y el 12.º el **MAR 13-abr (D58, último día del plan; su semana solo tiene lun-mar)**. Su modo reducido cubre hasta el **mar 16-feb** inclusive (= día del examen Step 1; `modoReducidoHasta = '2027-02-16'`, 18 días). ⚠ **Consecuencia v5.17 en el Step 1:** el plan de 95 días termina el **lun 15-feb-2027 (D95 = D-1 real, sesión mínima AM)** y el examen pasa al **MAR 16-FEB-2027** (el vie 12-feb = D94 es la última sesión de banco; el sáb 13 y el dom 14-feb vuelven a quedar libres entre D94 y D95; Joseph debe agendar/reprogramar Prometric y confirmar el eligibility period — decisión suya en `DATA/PENDIENTES_JOSEPH.md`). El mar 16-feb (examen) es el D18 del mantenimiento y el **último día en modo reducido** (10Q mixtas Cardiología + Ginecología; ya NO es día Tier C): decisión de Joseph si ese día debe ir vacío. Oncología Médica, el Tier C que en v5.16 caía el día del examen, pasa al **jue 18-feb (D20)**, ya en modo normal. ✅ `MIR_HITOS.handoff`, `MIR_CIERRE_UMBRAL_FASES`, la retención FSRS y `MIR_MANT_META.handoff` llevan el **13-abr-2027** (último día del mantenimiento; fase principal desde el mié 14-abr-2027). Fechas leídas de los dos `.ts` con node el 30-sep, no estimadas.
>
> **v5.16 (26-sep-2026): D1 = LUN 28-SEP-2026.** Ni el mié 23, ni el jue 24 ni el vie 25 de septiembre se estudiaron → +3 días hábiles
> sobre v5.15. Es el **decimoquinto corrimiento** (31-ago → 28-sep; 20 días hábiles perdidos). Sigue la **regla RÍGIDA** de v5.15
> (solo corren los días: ni un tema ni un subtema se toca, los hitos NBME/UWSA corren con el plan **conservando su D#** — con D1 en
> lunes vuelven a caer en VIERNES — y donde había un fin clavado se **AMPLÍAN días** en vez de perder sesiones; **no se fusiona ni se recorta nada**).
> El plan sigue teniendo **78 días** (76 temas + D77 mini-MIR + D78 corrección) y las franjas, metas y contenidos son idénticos: solo se re-fechó.
> Como el 25-dic, el 31-dic y el 1-ene no son días hábiles del plan, la cola salta a enero: el último tema (D76, Psicóticos) queda el
> **jue 14-ene-2027**, D77 (mini-MIR) pasa al **vie 15-ene-2027** (= día del UWSA2, D77 del Step 1) y D78 (corrección) al **lun 18-ene-2027**.
> Con D1 en lunes, **D5 Cardiología (vie 2-oct) precede a Cardiovascular Step 1 (D6 lun 5-oct) por 1 día hábil = +3 días naturales**.
> El mantenimiento se regeneró para no solapar: arranca el **mar 19-ene-2027** y, por la regla rígida, **se AMPLÍA el fin del vie 2-abr al mié 7-abr-2027**: conserva sus **57 días** enteros (0 sesiones perdidas); el reparto interno vuelve a **46 lun-jue + 11 viernes** y las cuotas por peso recuperan Neurología 5 (v5.15: 45 + 12, Neuro 4). Los 12 slots Tier C caen en el **último slot lun-jue de cada semana real**: 11 en JUEVES (jue 21-ene → jue 1-abr) y el 12.º el **MIÉ 7-abr (D57, último día del plan, semana 12 incompleta)**. Su modo reducido cubre hasta el **jue 11-feb** inclusive (= día del examen Step 1; `modoReducidoHasta = '2027-02-11'`, 18 días). ⚠ **Consecuencia v5.16 en el Step 1:** el plan de 95 días termina el **mié 10-feb-2027 (D95 = D-1 real, sesión mínima AM)** y el examen pasa al **JUE 11-FEB-2027** (el mar 9-feb = D94 es la última sesión de banco; ya NO hay fin de semana libre entre D95 y el examen; Joseph debe agendar/reprogramar Prometric y confirmar el eligibility period — decisión suya en `DATA/PENDIENTES_JOSEPH.md`). El jue 11-feb (examen) es el D18 del mantenimiento, el **último día en modo reducido** y además **jueves Tier C (Oncología Médica)**: decisión de Joseph si ese día debe ir vacío. ✅ En v5.16 `MIR_HITOS.handoff`, `MIR_CIERRE_UMBRAL_FASES`, la retención FSRS y `MIR_MANT_META.handoff` ya llevan el **7-abr-2027** (último día del mantenimiento; fase principal desde el jue 8-abr): la decisión abierta de v5.15 (handoff 31-mar vs fin del mantenimiento) queda resuelta en código. Fechas leídas de los dos `.ts` con node el 26-sep, no estimadas.
> *(Histórico v5.15, 22-sep: D1 mié 23-sep · D76 lun 11-ene · D77 mar 12-ene · D78 mié 13-ene · mantenimiento 57 días jue 14-ene → vie 2-abr (45 lun-jue + 12 vie, Tier C todos en jueves), reducido hasta el lun 8-feb, examen lun 8-feb = D18, handoff aún 31-mar en código. v5.14, 19-sep: D1 lun 21-sep · D76 jue 7-ene · D77 vie 8-ene · D78 lun 11-ene · mantenimiento 57 días mar 12-ene → mié 31-mar (46 lun-jue + 11 vie), reducido hasta el mié 3-feb, examen jue 4-feb = D18. v5.13, 16-sep: D1 jue 17-sep · D76 mar 5-ene · D77 mié 6-ene · D78 jue 7-ene · mantenimiento 59 días vie 8-ene → 31-mar (47 lun-jue + 12 vie, Tier C en las semanas reales 2-13), reducido hasta el lun 1-feb, examen mar 2-feb = D18. v5.12, 15-sep: D1 mié 16-sep · D77 mar 5-ene · D78 mié 6-ene · mantenimiento 60 días 7-ene → 31-mar, reducido hasta el 29-ene. v5.11, 14-sep: D1 mar 15-sep · D77 lun 4-ene · D78 mar 5-ene · mantenimiento 61 días 6-ene → 31-mar, reducido hasta el 28-ene. v5.10, 12-sep: D1 lun 14-sep · D77 mié 30-dic · D78 lun 4-ene · mantenimiento 62 días 5-ene → 31-mar.)*
>
> **v3b (12-sep-2026, segunda capa de vacíos · `gaps_v3b_mir.json` puntos 1, 5, 6, 7, 10, 11):** gate Palmerton
> como selección de anclas (§3-§4), métricas calibradas a Top 50 (§4), táctica −1/3 medida + cronómetro (§4),
> delta-España como base de conocimiento (§4 · `DELTA_ESPANA.md`), espejo Supabase del log (§4) y regla
> "APEX directamente en Anki hasta verificar n8n" (§5). Fechas, franjas, metas y temario: sin cambios (verificado:
> las 78 fechas y los 76 capIds del `.ts` regenerado son idénticos a HEAD).

## 1. Plan día-a-día (78 días = 76 temas + D77 mini-MIR + D78 corrección · D1 mié 7-oct-2026 → D78 mié 27-ene-2027 · v5.20 — ⏸ v6.01: lun 12-oct → lun 1-feb · **v6.02: lun 19-oct → lun 8-feb**)
Fuente de verdad: [`src/lib/mirDailyPlan.ts`](../../src/lib/mirDailyPlan.ts) (bloque GENERADO por
[`STUDY_HUB/_scrape/gen_mir_daily.js`](../../STUDY_HUB/_scrape/gen_mir_daily.js) `[YYYY-MM-DD]`).
L-V, sáb+dom libres, skips = 25-dic, 31-dic y 1-ene (no son días hábiles del plan), hasta el mié 27-ene-2027 (D76 último tema lun 25-ene · D77 mini-MIR mar 26-ene · D78 corrección mié 27-ene; v5.19: vie 22 · lun 25 · mar 26-ene). 1 tema atómico/día, 1ª vuelta.

**Regla de selección (v3):** por asignatura, top-N capítulos por `pesoPct` de `mirDetalleData`
(N = días del bloque) + los capítulos **núcleo rabi_94** (`mirPrioridades1V`) forzados: un núcleo
que no entra por peso sustituye al de menor peso no-núcleo del top-N si su peso ≥ (ese − 0,5).
Match título ProMIR ↔ nombre MIR_DETALLE **exacto normalizado** (NFD sin tildes) + fallback manual
explícito (17 títulos truncados/paréntesis). Dentro del bloque, los capítulos "cimiento"
(fisiología/semiología/básica) abren y el resto va por peso desc. Asserts en el generador:
cobertura por bloque ≥ 90 % del óptimo top-N · todo `peso` a ±0,05 de MIR_DETALLE (nunca null en
temas) · capIds reales de `mirTemarioData` · fechas L-V · D1-D4 = Epi×3 + Bioética×1 · (v3b) los capIds
de `DELTA_CAPIDS` existen y sus filas llevan `delta:true`.

**Orden de bloques = cada asignatura PRECEDE ~1 semana a su sistema Step 1** (clínica en español
como prime → mecanismo en inglés 7 días después = re-exposición espaciada del mismo sistema).

> ✅ **Nota v6.02 (leído con node de `MIR_DIAS` de `mirDailyPlan.ts` y de `DIAS` / `DIAS_T2` de `usmleStep1Daily.ts` v6.02, 17-oct):** el prime MIR → Step 1
> sigue valiendo **solo para los sistemas de F1 (lun 19-oct → mié 30-dic-2026)**: Cardio, Neumo, Nefro, Gastro, Endo y Neuro conservan su homólogo y su D#; el
> lag (inicio MIR → inicio Step 1) queda en **Cardio +3 d** (MIR vie 23-oct → Step 1 lun 26-oct; 1 hábil) · **Neumo +7** (mar 3-nov → mar 10-nov) · **Nefro
> +8** (mar 10-nov → mié 18-nov) · **Gastro +9** (mié 18-nov → vie 27-nov) · **Endo +8** (lun 30-nov → mar 8-dic) · **Neuro +8** (mar 8-dic → mié 16-dic) ·
> **Hemato +12** (jue 17-dic → mar 29-dic), pero en F1 solo queda la 1.ª fila de Heme/Onco (D51); las otras 5 (v5.20 D52-D54, D56, D57) son ahora **T3-T7, jue
> 18 → mié 24-mar-2027** (regla de hitos anclados). Epidemiología (MIR D1-D3 lun 19 → mié 21-oct) y Bioética (D4 jue 22-oct) caen sobre la fila de
> **bioestadística + epidemiología + ética (ex-D79) = tramo 2 T8 lun 29-mar-2027**. Infecto (MIR jue 24-dic → jue 7-ene), Gine (vie 8 → vie 15-ene), Reuma (lun
> 18 → lun 25-ene) y Psiq (mar 2 → jue 4-feb) **no tienen su sistema Step 1 detrás en F1**: quedan en el **tramo 2 (F3)** — **Micro T9-T15 mar 30-mar → mié
> 7-abr** · **Repro T16-T20 jue 8 → mié 14-abr** · **MSK T21-T23 jue 15 → lun 19-abr** · **Psiq T24-T26 mar 20 → jue 22-abr (+ T8)** · **Bioq T27-T28 vie 23 →
> lun 26-abr** —, ~3 meses después del bloque MIR: repaso a largo plazo, no prime a 7 días. La columna «Homólogo Step 1 / Lag» de la tabla de abajo es v5.20:
> en las filas 3-9 vale el **D#** (las fechas son las de esta nota; Hemato, solo D51 en F1); filas 1-2 → T8 lun 29-mar; filas 10-12 y 14 → tramo 2 (fechas de
> esta nota).
>
> ⏸ **Nota v6.01 (historial; la corrige la nota v6.02 de arriba)** (leído con node de `MIR_DIAS` de `mirDailyPlan.ts` y de `DIAS` / `DIAS_T2` de `usmleStep1Daily.ts` v6.01, 10-oct): el prime MIR → Step 1
> sigue valiendo **solo para los sistemas de F1 (D1-D57, lun 12-oct → mié 30-dic-2026)**: Cardio, Neumo, Nefro, Gastro, Endo, Neuro y Hemato conservan su
> homólogo y su D#; sus fechas Step 1 se mueven a las de v6.01 y el lag (inicio MIR → inicio Step 1) queda en **Cardio +3 d** (MIR vie 16-oct → Step 1 lun
> 19-oct; 1 hábil) · **Neumo +7** (mar 27-oct → mar 3-nov) · **Nefro +8** (mar 3-nov → mié 11-nov) · **Gastro +9** (mié 11-nov → vie 20-nov) · **Endo +8**
> (lun 23-nov → mar 1-dic) · **Neuro +8** (mar 1-dic → mié 9-dic) · **Hemato +11** (jue 10-dic → lun 21-dic). Epidemiología (MIR D1-D3 lun 12 → mié 14-oct) y
> Bioética (D4 jue 15-oct) caen sobre la fila de **bioestadística + epidemiología + ética (ex-D79) = tramo 2 T3 jue 18-mar-2027**. Infecto (MIR jue 17 → mar
> 29-dic), Gine (mié 30-dic → vie 8-ene), Reuma (lun 11 → lun 18-ene) y Psiq (mar 26 → jue 28-ene) **no tienen su sistema Step 1 detrás en F1**: quedan en el
> **tramo 2 (F3)** — **Micro T4-T10 vie 19-mar → mié 31-mar** (25-26-mar SKIP) · **Repro T11-T15 jue 1 → mié 7-abr** · **MSK T16-T18 jue 8 → lun 12-abr** ·
> **Psiq T19-T21 mar 13 → jue 15-abr (+ T3)** · **Bioq T22-T23 vie 16 → lun 19-abr** —, ~3 meses después del bloque MIR: repaso a largo plazo, no prime a 7 días.
> La columna «Homólogo Step 1 / Lag» de la tabla de abajo es v5.20: en las filas 3-9 vale el **D#** (las fechas son las de v6.01 de esta nota); filas 1-2 →
> T3 jue 18-mar; filas 10-12 y 14 → tramo 2 (fechas de esta nota).
>
> ⏸ **Nota v6.00 (leído de `DIAS` / `DIAS_T2` de `usmleStep1Daily.ts` con node el 6-oct; SUPERSEDIDA por las notas v6.02 y v6.01 de arriba):** el prime MIR → Step 1 **solo vale para los sistemas de F1
> (D1-D57, mié 7-oct → jue 24-dic)**: Cardio, Neumo, Nefro, Gastro, Endo, Neuro y Hemato conservan su homólogo y su lag; Epidemiología y Bioética caen
> ahora sobre el **D58 lun 28-dic** (bioestadística + epidemiología + ética, ex-D79). **Infecto, Gine, Reuma y Psiq NO tienen su sistema Step 1 detrás en
> F1**: Micro / ID, Reproductive, Musculoskeletal / Rheum, Psychiatry y Biochemistry quedan en el **tramo 2 (F3)** — Micro jue 18 → mar 30-mar-2027 · Repro
> mié 31-mar → mar 6-abr · MSK mié 7 → vie 9-abr · Psiq lun 12 → mié 14-abr · Bioq jue 15 → vie 16-abr —, 3-4 meses después del bloque MIR (dic-ene): ahí ya
> no es «prime + re-exposición a 7 días» sino repaso a largo plazo. La columna «Homólogo Step 1 / Lag» de la tabla es v5.20: sigue valiendo en las filas 3-9 (D# y fechas de F1 intactos *(⏸ v6.00 · v6.01 · v6.02: el D# sí, las fechas no)*) y queda SUPERSEDIDA en las filas 1-2 (Epi/Bioética → D58 lun 28-dic) y 10-14 (Infecto, Gine, Reuma, Psiq → tramo 2).
Homólogo Step 1 = rangos reales de `usmleStep1Daily.ts` **v5.20** (95 días, D1 = mié 7-oct-2026 → D95 = vie 19-feb-2027; examen lun 22-feb),
leídos del array `DIAS` — no estimados.

| # | Asignatura | Días MIR | Fechas | Capítulos (orden del bloque) | Cobertura peso | Homólogo Step 1 | Lag |
|---|------------|----------|--------|------------------------------|----------------|-----------------|-----|
| 1 | Epidemiología (Tier S) | D1–D3 | 7-oct→9-oct | Ensayo clínico 32,2 · Clasificación de estudios 24,3 · Pruebas diagnósticas 13,5 | 70,1 / 70,1 | Biostats/Epi (D79, jue 28-ene) | — |
| 2 | Medicina Legal y Bioética (Tier S) | D4 | 12-oct | Principios de bioética y relación médico-paciente 39,8 🇪🇸 | 39,8 / 39,8 | Ethics/Behavioral (D79, jue 28-ene) | — |
| 3 | Cardiología | D5–D11 | 13-oct→21-oct | Cardiología básica · Ritmo · Isquémica · IC · Valvulopatías★ · Riesgo CV 🇪🇸 · Miocardio | 71,8 / 71,8 | Cardiovascular D6–D16 (14-oct→28-oct; D10 = NBME 25, mar 20-oct) | ⚠ +1 d |
| 4 | Neumología | D12–D16 | 22-oct→28-oct | Fisiología★ · Cáncer de pulmón★ · Pleura/mediastino · EPOC★ · Intersticiales | 61,2 / 61,2 | Respiratory D17–D22 (29-oct→5-nov) | +7 d |
| 5 | Nefrología | D17–D22 | 29-oct→5-nov | Fisiología renal★ · FRA · GN primarias · Riñón y sistémicas · IRC · Síndromes clínicos | 80,5 / 80,5 | Renal D23–D29 (6-nov→16-nov; D25 = NBME 26, mar 10-nov) | +8 d |
| 6 | Gastroenterología | D23–D30 | 6-nov→17-nov | Hígado · Colon 🇪🇸 · Intestino delgado · Estómago★ · Misc. quirúrgica · Páncreas · Esófago★ · Vía biliar | 100 / 100 | Gastrointestinal D30–D36 (17→25-nov) | +11 d |
| 7 | Endocrinología y Nutrición | D31–D36 | 18-nov→25-nov | DM★ · Tiroides★ · Hipófisis · Suprarrenales · Nutrición/obesidad · Lípidos | 78,0 / 78,0 | Endocrine D37–D42 (26-nov→3-dic; D40 = NBME 27, mar 1-dic) | +8 d |
| 8 | Neurología | D37–D43 | 26-nov→4-dic | Semiología · Neurocirugía · ECV★ · Movimiento · Epilepsia · Demencias · Cefaleas | 76,6 / 76,6 | Nervous System D43–D50 (4→15-dic) | +8 d |
| 9 | Hematología | D44–D48 | 7-dic→11-dic | Coagulación 21,5 · Linfomas · Hemolíticas · Carenciales · NMP | 65,0 / 65,0 | Hematology & Oncology D51–D57 (16→24-dic; D55 = NBME 28, mar 22-dic) | +9 d |
| 10 | Enfermedades Infecciosas | D49–D56 | 14-dic→23-dic | Tropicales 12,6 · VIH 🇪🇸 · TBC 🇪🇸 · ITRI/neumonía · SNC · Antibacterianos★ 🇪🇸 · Hongos · Sepsis | 62,9 / 62,9 | Microbiology / ID D58–D64 (28-dic→7-ene; el NBME 29 es el D65, vie 8-ene, justo después) | +14 d |
| 11 | Ginecología y Obstetricia | D57–D62 | 24-dic→5-ene | Ca mama★ 15,7 🇪🇸 · Hemorragia gestación · Complicaciones maternas · Infecciones y embarazo 🇪🇸 · Control gestación 🇪🇸 · Masas anexiales/Ca ovario★ | 46,7 / 46,7 | Reproductive D66–D70 (11-ene→15-ene) | +18 d |
| 12 | Reumatología | D63–D68 | 6-ene→13-ene | Vasculitis★ · Espondiloartropatías · Otras conectivopatías · AR · Cristales★ · LES★ | 65,1 / 65,5 | Musculoskeletal / Rheum D71–D74 (18→21-ene; D72 = NBME 30, mar 19-ene; D74 = dermato Step 1, jue 21-ene) | +12 d |
| 13 | Pediatría | D69–D73 | 14-ene→20-ene | Digestivo · Neonatología 🇪🇸 · Desarrollo/nutrición · Infecciosa · Vacunación 🇪🇸 | 78,1 / 78,1 | — (sin homólogo) | — |
| 14 | Psiquiatría | D74–D76 | 21-ene→25-ene | Ánimo★ · Neuróticos★ · Psicóticos | 61,5 / 61,5 | Psychiatry & Behavioral D75–D79 (22→28-ene; D77 = UWSA2, mar 26-ene) | +1 d |
| — | Repaso integral | D77 | 26-ene-2027 | **mini-MIR 40Q mixto cronometrado (51 min · 77 s/Q · en blanco permitido) · mínimo on-track ≥ 50 % neto** (mismo día que el UWSA2 del Step 1, D77) | — | — | — |
| — | Repaso integral | D78 | 27-ene-2027 | **corrección Whole-Page + Shopping List + tabla de neto por asignatura = baseline abr-2027** (⚠ **cobertura medida ≈80 %** del peso ProMIR: solo las 14 asignaturas del plan, `MIR_MANT_PESOS` suma 80,7 %; las 16 restantes entran por Tier C en el mantenimiento + Derma 13:30 — tabla al final de §1) | — | — | — |

🇪🇸 = día con **delta-España previsible** (`delta:true`, 11 días; base de conocimiento en `DELTA_ESPANA.md`, §4).

> **Nota v5.20 — Cardiología sigue en +1 (prime el mar 13-oct, mecanismo el mié 14-oct) y Psiquiatría en +1; Hemato baja a +9; Reuma sube a +12, Infecto a +14 y Gine a +18.** MIR mantiene 78
> días y Step 1 mantiene 95: en v5.20 **no se fusionó ni se recortó nada** (corrimiento RÍGIDO DEFINITIVO), el día perdido (mar 6-oct) se absorbió
> alargando el Step 1 hasta el vie 19-feb-2027 (D95 = último día del plan → examen target lun 22-feb-2027). `Lag` = días naturales entre el inicio del bloque MIR
> y el inicio de su sistema Step 1 (cálculo sobre las fechas reales de los dos `.ts` el 6-oct, no estimado).
> - **Cardiología (⚠ +1 d):** MIR arranca el mar 13-oct (D5) y Cardiovascular el mié 14-oct (D6), el día hábil siguiente (el UWSA1 ocupa el
>   D1 mié 7-oct, Fundamentos el D2-D3 jue 8/vie 9-oct e Inmuno el D4-D5 lun 12/mar 13-oct). Sigue siendo, con Psiquiatría, la correspondencia más débil del plan.
> - **Psiquiatría (+1 d):** MIR arranca el jue 21-ene (D74) y *Psychiatry & Behavioral* el vie 22-ene (D75), el día siguiente.
> - Los otros 9 bloques quedan entre **+7 y +18 días** (Neumo +7 · Nefro, Endo y Neuro +8 · Hemato +9 · Gastro +11 · Reuma +12 · Infecto +14 · Gine +18):
>   Gastro +11 porque GI abre el mar 17-nov; Reuma +12 porque MSK/Rheum abre el lun 18-ene; Infecto +14 porque Micro/ID abre el lun 28-dic, tras Navidad; Gine +18 porque Reproductive no arranca hasta el lun 11-ene,
>   tras el corte de fin de año y el NBME 29 del vie 8-ene. No se re-permuta el MIR para arreglar Cardiología: hacerlo movería 11 bloques y
>   el objetivo primario hasta el 22-feb es el Step 1, no el MIR.
>
> *Nota v5.19 (histórica, 5-oct) — Cardiología vuelve a +1 (prime el lun 12-oct, mecanismo el mar 13-oct); Psiquiatría sigue en +1; Gastro sube a +11.* MIR mantiene 78
> días y Step 1 mantiene 95: en v5.19 **no se fusionó ni se recortó nada** (corrimiento RÍGIDO), el día perdido (lun 5-oct) se absorbió
> alargando el Step 1 hasta el jue 18-feb-2027 (D95 = D-1 real → examen target vie 19-feb-2027). `Lag` = días naturales entre el inicio del bloque MIR
> y el inicio de su sistema Step 1 (cálculo sobre las fechas reales de los dos `.ts` el 5-oct, no estimado).
> - **Cardiología (⚠ +1 d):** MIR arranca el lun 12-oct (D5) y Cardiovascular el mar 13-oct (D6), el día hábil siguiente (el UWSA1 ocupa el
>   D1 mar 6-oct, Fundamentos el D2-D3 mié 7/jue 8-oct e Inmuno el D4-D5 vie 9/lun 12-oct). El prime en español precede al mecanismo en
>   inglés por 1 día hábil = 1 día natural (como en v5.9, v5.11-v5.13, v5.15 y v5.17; en v5.10, v5.14, v5.16 y v5.18 era +3): sigue siendo, con Psiquiatría, la correspondencia más débil del plan.
> - **Psiquiatría (+1 d):** MIR arranca el mié 20-ene (D74) y *Psychiatry & Behavioral* el jue 21-ene (D75), el día siguiente (como en v5.15, v5.16 y v5.18; en v5.17 +3 cruzando el fin de semana).
> - Los otros 9 bloques quedan entre **+7 y +16 días** (Neumo +7 · Nefro, Endo y Neuro +8 · Reuma +10 · Gastro y Hemato +11 · Infecto +13 · Gine +16),
>   es decir dentro o por encima del objetivo de ~1 semana (Gastro sube a +11 porque GI abre el lun 16-nov, cruzando el fin de semana; Gine queda en +16 porque Reproductive no arranca hasta el vie 8-ene, tras el corte de fin de año y el NBME 29 del jue 7-ene). No se re-permuta el MIR para arreglar Cardiología: hacerlo movería 11 bloques y
>   el objetivo primario hasta el 19-feb es el Step 1, no el MIR.
>
> *Nota v5.18 (histórica, 3-oct) — Cardiología vuelve a +3 (el prime y el mecanismo cruzan el fin de semana); Psiquiatría baja a +1.* MIR mantiene 78
> días y Step 1 mantiene 95: en v5.18 **no se fusionó ni se recortó nada** (corrimiento RÍGIDO), los dos días perdidos se absorbieron
> alargando el Step 1 hasta el mié 17-feb-2027 (D95 = D-1 real → examen target jue 18-feb-2027). `Lag` = días naturales entre el inicio del bloque MIR
> y el inicio de su sistema Step 1 (cálculo sobre las fechas reales de los dos `.ts` el 3-oct, no estimado).
> - **Cardiología (⚠ +3 d):** MIR arranca el vie 9-oct (D5) y Cardiovascular el lun 12-oct (D6), el día hábil siguiente cruzando el fin de semana (el UWSA1 ocupa el
>   D1 lun 5-oct y el contenido del Step 1 empieza el mar 6-oct). El prime en español precede al mecanismo en
>   inglés por 1 día hábil = 3 días naturales (como en v5.10, v5.14 y v5.16; en v5.9, v5.11-v5.13, v5.15 y v5.17 era +1): sigue siendo, con Psiquiatría, la correspondencia más débil del plan.
> - **Psiquiatría (+1 d):** MIR arranca el mar 19-ene (D74) y *Psychiatry & Behavioral* el mié 20-ene (D75), el día siguiente
>   (como en v5.15 y v5.16; en v5.17 +3 cruzando el fin de semana; en v5.13 eran +5 con el 31-dic y el 1-ene en medio, y en v5.6-v5.12 ambos arrancaban el mismo día: solapamiento total).
> - Los otros 9 bloques quedan entre **+7 y +16 días** (Neumo +7 · Nefro, Endo y Neuro +8 · Gastro +9 · Reuma +10 · Hemato +11 · Infecto +13 · Gine +16),
>   es decir dentro o por encima del objetivo
>   de ~1 semana (Gine queda en +16 porque Reproductive no arranca hasta el jue 7-ene, tras el corte de fin de año y el NBME 29 del mié 6-ene; Reuma baja a +10 porque MSK/Rheum abre el jue 14-ene). No se re-permuta el MIR para arreglar Cardiología: hacerlo movería 11 bloques y
>   el objetivo primario hasta el 18-feb es el Step 1, no el MIR.
> *(v5.17, 30-sep: Cardio +1 · Neumo +7 · Endo +8 · Gastro y Hemato +9 · Nefro y Neuro +10 · Infecto +13 · Reuma +14 · Gine +18 · Psiq +3.)*
> *(v5.16, 26-sep: Cardio +3 · Neumo +7 · Nefro, Endo y Neuro +8 · Gastro +9 · Hemato +11 · Infecto +13 · Gine +14 · Reuma +15 · Psiq +1.)*
> *(v5.15, 22-sep: Cardio +1 · Neumo +7 · Nefro, Endo y Neuro +8 · Hemato +9 · Gastro e Infecto +11 · Gine +13 · Reuma +17 · Psiq +1.)*

★ = núcleo rabi_94. Total: **957,4 puntos-peso** de 957,8 óptimos (plan previo: 744,2 · +28,6 %).
Núcleos que NO entran (peso demasiado bajo; el generador lo avisa): Intro endocrino 1,9 · Bacterias
generalidades 3,2 · Ca endometrio 4,1 · Ca cérvix 2,5 · Ca vulva 0,6 · Reuma "Introducción" 6,1.
En Reuma el núcleo LES (8,41) sustituye a Enf. metabólica ósea (8,77) → 99,5 % del óptimo.

Cada fila `DiaMIR`: `d, fecha, asignatura, num, rent, tema, capId (deep-link ProMIR), peso (Peso MIR
% real), vuelta, resumenVid, usmleSystem, sub ('epi'|'bio'|null), delta? (true solo en los 11 días 🇪🇸)`.
**`resumenVid` es la duración del vídeo RESUMEN DE LA ASIGNATURA completa (Cardio 2:27 h, Gastro 3:21 h…), no del
capítulo: no se ve entero en el bloque.** `MIR_COBERTURA` guarda cobertura/óptimo por bloque.

### Las 16 asignaturas FUERA del plan de 78 días (peso ProMIR, texto real de `mirDetalleData.pesoGlobal`)
Las 14 asignaturas del plan suman **80,7 %** del peso ProMIR (`MIR_MANT_PESOS`, v5.20 = v5.19 = v5.18 = v5.17 = v5.16) — es la **cobertura medida** del mini-MIR D77 y de la tabla baseline de D78. Las otras 16 entran por los 12 slots **Tier C express** del mantenimiento (§6) + el bloque Derma de las 13:30; con ellas el examen medido sube a ~95 % (`MIR_MANT_META.tierC.cobertura`, **A VERIFICAR (19-sep)**: los porcentajes de abajo vienen de textos de distinta base y no suman exactamente el 19,3 % restante).

| # | Asignatura | Peso ProMIR (texto real) | Cómo entra |
|---|---|---|---|
| 29 | Traumatología | ~4-5 % (casi 10 Q/año; top 15) | Tier C jue 28-ene (MI; = D79 del Step 1) + jue 4-feb (MS; = D84) — v5.20; v5.19: D80 · D85 = NBME 33 |
| 27 | Radiología-Urgencias | ~4-5 % (auxiliar; Síndromes torácicos 0,69 % + Politraumatizado 0,61 %…) | Tier C jue 11-feb (= D89 del Step 1; v5.19: D90) |
| 22 | Oncología Médica | ~4 % (al alza; ~7 Q/año últimos 3 años) | Tier C **jue 25-feb** (D20 del mantenimiento, modo normal, dentro de la intensiva ENCAPS; v5.20 — ya NO cae en la víspera ni en el día del examen Step 1; v5.19: jue 18-feb = D95 = víspera, modo reducido; v5.18: día del examen) |
| 5 | Dermatología | media (5-8 Q por convocatoria) | bloque Derma 13:30 (`APEX::DERMA tag:step1` → filtered deck `sys::Dermatology` en abril) |
| 13 | Geriatría | media (4-8 Q/año últimas 5 convocatorias) | Tier C jue 4-mar (v5.19: jue 25-feb) |
| 23 | ORL | ~2,76 % (hasta ~4 % recientes; 3-5 Q) | Tier C jue 11-mar (día siguiente al examen ENCAPS; v5.19: jue 4-mar) |
| 30 | Urología | 2,2 % histórico | Tier C jue 25-mar (v5.19: jue 18-mar) |
| 21 | Oftalmología | 1-2 % (~3 Q) | Tier C jue 1-abr (v5.19: jue 25-mar) |
| 9 | Estadística | ~1,5 % histórico, 0 Q en los últimos 5 años | slot "Estadística/Gestión" del Tier C jue 22-abr (junto a Gestión; v5.19: 15-abr) |
| 12 | Genética | ~1,1 % (~2-3 Q/año) | Tier C jue 8-abr (v5.19: jue 1-abr) |
| 25 | Planificación y Gestión Sanitaria | ~1 % (2-3 Q/examen) | Tier C jue 22-abr (D58 = último día del plan; v5.19: jue 15-abr) |
| 2 | Anestesiología y Reanimación | pequeña (~2 Q/examen, al alza) | sin slot — fase principal abr-2027 |
| 16 | Inmunología | ~0,95 % (~40 Q en 10 años) | Tier C jue 15-abr (v5.19: jue 8-abr) |
| 10 | Farmacología | ~0,6-0,8 % (1-2 Q/año) | sin slot (transversal: se mide dentro de cada asignatura) |
| 4 | Cuidados Paliativos | mínima (~1 Q/año) | Tier C jue 18-mar (v5.19: jue 11-mar) |
| 1 | Alergología | ~0,36 % (muy pocas Q/año) | sin slot — fase principal abr-2027 |


### Tabla de cobertura antes → después (puntos de Peso MIR cubiertos por asignatura)
| Asignatura | Antes (días · cobertura / óptimo) | Después (días · cobertura / óptimo) | Cambio |
|------------|-----------------------------------|-------------------------------------|--------|
| Epidemiología | 0 d · 0 | 3 d · 70,1 / 70,1 | **nuevo** (Tier S "empieza aquí" que faltaba) |
| Medicina Legal y Bioética | 0 d · 0 | 1 d · 39,8 / 39,8 | **nuevo** |
| Cardiología | 8 d · 73,8 / 77,0 | 7 d · 71,8 / 71,8 | −1 día (Síncope 2,6 e HTA 4,5 fuera), óptimo |
| Gastroenterología | 8 d · 100 / 100 | 8 d · 100 / 100 | = (pesos corregidos: antes 22,13 en 7 de 8) |
| Nefrología | 6 d · 80,5 / 80,5 | 6 d · 80,5 / 80,5 | = |
| Endocrinología | 7 d · 79,9 / 85,2 | 6 d · 78,0 / 78,0 | −1 día (Intro 1,9 fuera), óptimo |
| Neumología | 6 d · 43,9 / 69,6 | 5 d · 61,2 / 61,2 | +17,3 con 1 día menos (entran Ca pulmón, Pleura, Intersticiales) |
| Infecciosas | 8 d · 48,4 / 62,9 | 8 d · 62,9 / 62,9 | +14,5 (Tropicales 12,6 + VIH 10,8 + Hongos) |
| Neurología | 7 d · 76,1 / 76,6 | 7 d · 76,6 / 76,6 | +0,5 (Cefaleas por EM) |
| Reumatología | 6 d · 61,0 / 65,5 | 6 d · 65,1 / 65,5 | +4,1 (Otras conectivopatías; Cristales peso null → 8,41) |
| Hematología | 5 d · 26,2 / 65,0 | 5 d · 65,0 / 65,0 | **+38,8** (Coagulación 21,5 + Linfomas 13,1 + NMP 9,1) |
| Ginecología y Obstetricia | 6 d · 15,2 / 46,7 | 6 d · 46,7 / 46,7 | **+31,4** (Ca mama 15,7 + Hemorragia + Complicaciones + …) |
| Pediatría | 5 d · 76,8 / 78,1 | 5 d · 78,1 / 78,1 | +1,3 (Vacunación por Respiratorio) |
| Psiquiatría | 4 d · 62,4 / 72,1 | 3 d · 61,5 / 61,5 | −1 día (Intro 0,9 fuera), óptimo |
| **Total** | **76 d · 744,2 / 879,2** | **76 d · 957,4 / 957,8** | **+213 pts · pesos erróneos 20 → 0** |

## 2. Temario + detalle (30 asignaturas reales)
- [`src/lib/mirTemarioData.ts`](../../src/lib/mirTemarioData.ts) — 30 asignaturas, capítulos con `capId` + deep-link, rentabilidad (chart "Distribución MIR"). Raw `STUDY_HUB/_scrape/promir_full_temario.json`.
- [`src/lib/mirDetalleData.ts`](../../src/lib/mirDetalleData.ts) — por asignatura: Peso MIR % por tema, páginas, horas, Enfoque, subtemas top, vídeos. Raw `_scrape/mir_detalle_clean.json` + `intros/NN_*.json`.
- [`src/lib/mirPrioridades1V.ts`](../../src/lib/mirPrioridades1V.ts) — núcleo 1ª vuelta rabi_94 (CTO×AMIR×MirAsturias).
- [`src/lib/mirDriveResources.ts`](../../src/lib/mirDriveResources.ts) — resúmenes Drive (Mirnion `.note`, MIR 2022 PDF).
- Verificados con vídeos+duraciones: `mirCardiologiaData.ts`, `mirDigestivoData.ts`.
- Dato corregido en `mirData.ts` (Tier S): **Epidemiología ~10 Q/año (~5 % del MIR; 3 capítulos = 70 %) · Estadística inferencial 0 Q en 5 años (ProMIR) · Bioética ~1,2 % (Principios = 40 % del bloque)**. La nota antigua "Estadística 6-10 Q" era falsa.

## 3. Bloque diario 15:15–16:15 (Google Calendar — verificado, NO modificar; solo se rebalancea el interior) — v6.00: vale para F1-F3; en el SERUMS (F4) la franja va por turno (M 16:00 · T 10:35 · L 15:15 · hito 04:05 · guardia en tiempo muerto)
`MIR_FRANJAS` en `mirDailyPlan.ts`. Tiempo real por pregunta MIR = **77 s** (210Q / 270 min), no 90-100 s.
> **v6.03b (20-oct-2026) · método RaviMedTest dentro de esta hora:** Anki de dos mazos (APEX::MIR primero, mazo de Ravi «1ºVUELTA 2MIR21»
> suspendido y reactivado por asignatura, aleatorio) · APEX solo de fallos y nivel 3-4/5 · repaso relacional ANTES (día de inicio de
> asignatura, 15:30–15:33) y AL TERMINAR (último día, 16:12–16:15), minutos tomados del APEX · técnica de simulacro en D77 y corrección
> de Ravi en D78 y en el banqueo. Detalle, fuentes y calendario: [`METODO_RAVIMEDTEST.md`](METODO_RAVIMEDTEST.md).
**17-19 Q/día** (antes 7) con −40 % de lectura. Fuente de preguntas = **test del capítulo ProMIR**
(verificado, logueado) o cuadernillos oficiales (examenesmir.com). "AMIR Test" no está verificado → no se prescribe.

| Hora | Fase |
|------|------|
| 15:15–15:22 | **EVAL ANCLADA 4Q multi-temporal** = 2Q tema D-1 (fijo) + **2 slots dinámicos de 1Q** que priorizan temas **● caliente** del gate (§4); sin temas calientes = D-3 y D-7 (77 s/Q, en blanco permitido). Cronómetro en la app (⏱ 4Q/10Q/25Q/40Q, aviso a 100 s por pregunta). |
| 15:22–15:27 | Anki APEX::MIR (FSRS · Good/Again · retention 0,85) |
| 15:27–15:30 | Log de la eval en la app (aciertos/4 · slot ✓/✗ con el D# real de cada slot · brecha knowledge/transfer/proceso · 🇪🇸 delta · táctica −1/3 opcional · slot ✗ → tema caliente mañana · fallo D-7 → **cola D+14**) |
| 15:30–15:38 | PRE-TEST 5Q ciegas del capítulo nuevo → marca los gaps · **se registra** (kind `pretest`, 10 s: no cuenta para readiness, sí para validar el tema) |
| 15:38–15:53 | LECTURA DIRIGIDA solo a los gaps (Whole Page Rule sobre el capítulo ProMIR; vídeo solo si el clip ≤12 min está verificado). En los 11 días 🇪🇸: leer antes la fila de `DELTA_ESPANA.md` |
| 15:53–16:05 | 8-10Q comentadas del capítulo · Rule-In → Rule-Out · cover-the-options · **se registra** (kind `quiz`, 20 s): **<60 % = tema caliente → ocupa un slot de mañana**; al 2º fallo del tema el formulario exige el `ajuste` |
| 16:05–16:15 | ≤4 APEX desde el Shopping List (plantilla APEX-MIR, §5) — **creados DIRECTAMENTE en Anki** (§5, regla v3b) |

- **1er día de cada bloque:** 15:15–15:30 = **TEST DE CIERRE** 10Q reales de la asignatura recién
  cerrada (13 min · 77 s/Q · en blanco permitido) → neto = A − F/3 · umbral **por fase** (`mirCierreUmbral`): **v6.00: hasta el vie 24-sep-2027 70/55; desde oct-2027 75/60** · ⏸ v5.20: hasta el
  22-abr-2027 (último día del mantenimiento) **≥70 % consolidada · 55-69 % intermedia · <55 % anclas D-7**; desde el vie 23-abr-2027 **75 / 60** (v5.20; v5.19: 15-abr → vie 16-abr). El **agregado de la
  asignatura** (cierre + ancladas + quiz, **n ≥ 20 Q**, `mirAgregadoAsignatura`) manda sobre el cierre de 10Q (±10 pp por pregunta)
  para decidir la rotación D-7 (`mirAsignaturasEnAnclasD7`).
- **Sáb y dom libres:** no existe "repaso finde". Lo que falla en el slot D-7 va a la **cola D+14** (`mirColaD14`, usa el D# real del slot).
- Helpers: `mirAnclas(d)` (fijas, fallback) · `mirEvalLog.mirAnclasDinamicas(d)` → `{slots, anclasD, calientes}` · `mirSesionDe(fecha)` → plan | mantenimiento · `mirBloques()` · `mirMinutos(nQ)`.
- Puente Step 1: [`src/lib/mirUsmleBridge.ts`](../../src/lib/mirUsmleBridge.ts) → `mirUsmleBridge(fecha)`
  = "Step 1 esta semana: Cardiovascular D6-D10" + homólogo completo; `usmleMirParalelo(fecha)` para la UI USMLE
  ("MIR en paralelo: Cardiología (D5-D11)"). Solo lectura de `usmleStep1Daily.DIAS`.
- **Modo mínimo (día roto):** Anki a cero + 4Q anclada registradas (15 min). El gate sigue funcionando porque la ancla alimenta el estado del tema.

## 4. Medición (Palmerton: "medir por % ciego") — [`src/lib/mirEvalLog.ts`](../../src/lib/mirEvalLog.ts)
Registro **append-only** en localStorage `jmd-mir-eval-log` **+ espejo Supabase `mir_eval_log`** (`src/lib/mirEvalSync.ts`):
`{fecha, d, tema, asignatura, num, capId?, aciertos, total, blancos, tiempoSeg, tipoError:'knowledge'|'transfer'|'proceso', ccsn?, delta_es, kind, anclas?, anclasD?, qIds?, ajuste?, blancosAcertables?, fallosEntreDos?, cambiadas?, cambiadasAFallo?, nota?}`.
- `kind`: `anclada` (4Q) · `pretest` (5Q, diagnóstico: no cuenta para readiness, sí para el gate) · **`quiz` (8-10Q comentadas, v3b)** · `cierre` (10Q) · `miniMIR` (40Q, D77) · `mantenimiento` (25/30/10Q) · `derma10Q` (10Q ProMIR-Derma desde el bloque Derma).
- Taxonomía unificada Palmerton (knowledge / transfer / proceso) + subtipo CCSN heredado de ENCAPS +
  **`delta_es`** = fallo por contestar con el manejo Perú/USA (terminología, guías españolas, calendario vacunal, legislación).

### 4.1 Gate Palmerton por tema = selección de anclas (gap 1)
Con 1 h/día el gate no puede parar el calendario ("don't move on" es imposible sin días nuevos), así que decide **qué pregunta
ocupa cada ancla** (`mirTemaEstado`, `mirEstadosTemas`, `mirAnclasDinamicas`, `MIR_GATE`):
- **Acumulado del tema** = pre-test 5Q + quiz 8-10Q + slots de ancla del tema (un slot ✗ cuenta 0/nQ, conservador).
- **✓ validado**: acumulado ≥ 80 % con ≥ 5 Q medidas y sin fallo pendiente.
- **● caliente**: quiz < 60 %, acumulado < 50 % (≥ 5 Q) o cualquier slot de ancla ✗ → el tema ocupa uno de los **2 slots
  dinámicos** del día siguiente (prioridad: calientes del bloque actual → calientes previos → cola D+14 vencida → D-3/D-7 fijos)
  hasta **2 aciertos de ancla consecutivos**.
- **○ pendiente**: medido, 50-79 %, sin fallo pendiente.
- **`ajuste` obligatorio al 2º fallo** del tema (`mirTemasQueExigenAjuste`): `recursos` / `comprension` / `aplicacion` / `retencion`
  = los 4 ajustes de Palmerton (`MIR_AJUSTES` con la corrección de raíz de cada uno). El formulario no guarda sin él. Alimenta la
  revisión semanal (SYNAPSE: `gen_revision_semanal.js`, bloque MIR **pendiente** de leer la tabla `mir_eval_log`).
- El Temario muestra ✓ / ● / ○ por tema y el agregado por asignatura; HOY muestra el estado del tema del día y los slots con su motivo.
- Verificado con test sintético (12-sep): quiz 50 % → caliente → ocupa el slot 2 del día siguiente → tras ancla ✗ (2º fallo) exige
  ajuste → tras 2 anclas ✓ seguidas sale de caliente; la cola D+14 apunta al D# real del slot.

### 4.2 Métricas calibradas a Top 50 (gap 5) — `mirData.ts`
- **`MIR_HITOS`** (mínimo on-track por hito, % neto ciego): mini-MIR D77 (mar 26-ene-2027 en v5.20; v5.19: lun 25-ene; `mirData.ts` la lee de `mirDiaN(77)`, así que sigue al plan en cada corrimiento) **≥ 50** · handoff **vie 24-sep-2027 (v6.00: último día de la extensión, día de plan anterior al ritual del Step 1) ≥ 60** (⏸ v5.20: 22-abr-2027 = último día del mantenimiento; v5.19: 15-abr; v5.18: 14-abr) ·
  fin 1ª vuelta completa dic-2027 **≥ 68** · simulacros 2028 **≥ 75** · simulacros 2029 **≥ 82** (banda Top 50) · examen MIR 2030 ≥ 82
  (fecha exacta de la convocatoria **A VERIFICAR (12-sep)**; cota 31-ene-2030). `mirDistanciaOnTrack(fecha)` = readiness derivado
  (mini-MIR > media de cierres > ancladas) − mínimo del próximo hito; MirHub lo muestra en la barra como `Δ MINI-MIR +X` (como el USMLE)
  y la pestaña Simulacros lista la trayectoria con el próximo hito resaltado.
- **`MIR_CIERRE_UMBRAL_FASES`**: **v6.00: 70/55 hasta el vie 24-sep-2027 → 75/60 desde oct-2027** (fase principal, tras el Step 1) · ⏸ (70/55 hasta el 22-abr-2027 → 75/60 desde el vie 23-abr-2027: v5.20; v5.19: 15-abr → vie 16-abr; v5.18: 14-abr → jue 15-abr) (`mirCierreUmbral(fecha)`, `mirEstadoCierre(pct, fecha)`).
- **Bandas de `MIR_SIMULACROS`** en netas/200: **≥150 (75 %) = banda Top 50 · ≥138 = Derma 2025 (última plaza 137,8) · ≥120 = solo
  zona plaza (~puesto 1.500)**.
- **Fuente de las netas** (`MIR_HITOS_FUENTE`): MIR 2026 nº1 = 188 netas/200 · MIR 2025 Derma última plaza 137,8 (puesto 233) ·
  top-1000 ≈ 126,7 · >3.000 ≈ 110 → Top 50 ≈ 150-165 netas (75-82 %) según el año. Verificado en web el 6-sep-2026 por el análisis
  v3b (`DATA/USMLE/_palmerton_v3_extractos/gaps_v3b_mir.json`); las **tablas oficiales netas–nº de orden 2025/2026 quedan A VERIFICAR
  (12-sep)**. **Regla de recalibración anual**: tras cada MIR rendido (o simulacro oficial 200Q), recalcular la banda Top 50 con la
  tabla real del año y ajustar `MIR_HITOS[].min` (ROADMAP regla 3).
- `MIR_CALENDARIO` describe ya las fases reales (1ª vuelta sep-dic · banqueo ene-mar · principal abr-2027→ · vueltas+sims 2028-29 · competición ene-2030).

### 4.3 Táctica −1/3 medida (gap 6)
- Campos opcionales al corregir (plegable "táctica −1/3", 10 s): **`blancosAcertables`** (blancos que habrían sido aciertos),
  **`fallosEntreDos`** (fallos con 2 opciones vivas), **`cambiadas` / `cambiadasAFallo`**.
- `mirStatsPorAsignatura().tactica`: **EV de responder tus blancos** = acertables·1 − (blancos − acertables)/3 y **consejo por
  asignatura** (`mirTacticaConsejo`): "arriesga más" (EV > +0,5) · "tu política de blanco es correcta" (EV < −0,3) · "fallos entre dos →
  Rule-Out con cover-the-options" (≥ 50 % de los fallos) · "no cambies respuestas salvo error objetivo de lectura" (> 50 % de los cambios a
  fallo). Se muestra en MirHub → Táctica.
- **Cronómetro `TimerQ`** en HOY (4Q · 10Q · 25Q · 40Q a 77 s/Q, cuenta atrás del bloque + reloj por pregunta con aviso a **100 s**
  = regla de los 2 min de Palmerton adaptada al MIR, sin librerías). Reutilizable en USMLE con `segPorQ=90`.
- `MIR_TACTICA` incorpora las reglas de Palmerton: adivina-marca-avanza a ~100 s y **0 cambios de respuesta por duda**.

### 4.4 Delta-España (gap 10) — [`DELTA_ESPANA.md`](DELTA_ESPANA.md)
- Base de conocimiento **pre-sembrada por asignatura (14 + Derma + transversal)** con formato ítem · manejo Perú/USA · manejo España ·
  **fuente oficial española** · capId. 17 textos consolidados del BOE + Ministerio/GeSIDA/SEGO/SEC/SEPAR verificados con WebFetch el
  12-sep; lo no verificable (AEP, PAPPS/semFYC, Orden SSI/445/2015, GesEPOC/GEMA, PEAHC, consenso *H. pylori*…) va **A VERIFICAR (12-sep)**.
- **11 días con delta previsible** (`DELTA_CAPIDS` en `gen_mir_daily.js` → `delta:true`): D4 Bioética · D10 Riesgo CV · D24 Colon ·
  D50 VIH · D51 TBC · D53 Antibacterianos · D57 Ca mama · D60 Infecciones y embarazo · D61 Control gestación · D70 Neonatología ·
  D73 Vacunación. Chip **🇪🇸 delta previsible** en HOY/7 días/Temario + aviso de leer la fila antes del pre-test. D49 Tropicales NO se marca
  (ahí Perú es ventaja, no delta).
- **`DATA/_scripts/gen_delta_espana.js [export.json] [--write]`**: vuelca las entradas `delta_es:true` del export JSON del log (botón ⤓ de
  HOY → `DATA/MIR/mir_eval_log_export.json`) como filas "por completar" entre los marcadores `DELTA_LOG` del `.md` (idempotente por id) y
  avisa de **delta repetido** por capId. Objetivo: 0 fallos delta repetidos en el mantenimiento (la tabla baseline de D78 cuenta `deltaEs`).

### 4.5 Espejo Supabase del log (gap 7)
- Tabla **`mir_eval_log`** (DDL canónico en [`DATA/_scripts/_migrations/mir_eval_log.sql`](../_scripts/_migrations/mir_eval_log.sql),
  aplicada el 12-sep con `apply_migration`; RLS ON + policy "Allow all" idéntica a `study_sim_scores`; columnas = registro + `q_ids jsonb`
  + `ajuste` + campos tácticos + `anclas_d jsonb`). El integrador la concatena en `supabase-schema.sql`.
- [`src/lib/mirEvalSync.ts`](../../src/lib/mirEvalSync.ts): `mirEvalSyncPush` (UPSERT por id, fallback silencioso) · `mirEvalSyncPull`.
  `mirEvalLogAppend` sube cada entrada en segundo plano; `mirEvalLogPull()` (al montar `MirTodayPlan`) fusiona por id en **ambos
  sentidos** (trae las remotas que faltan, sube las locales que faltan). Chip "espejo Supabase ✓ N filas" junto al botón de export.
- **Criterio de aceptación:** registrar en el móvil y verlo en la web + fila en Supabase (**A VERIFICAR (12-sep)** en vivo por Joseph con dos
  dispositivos; el código está y la tabla existe).
- Pendiente (otro agente / SYNAPSE S3): bloque MIR en `gen_revision_semanal.js` leyendo `mir_eval_log` (neto semanal por asignatura, temas
  calientes, % delta_es, cola D+14 vencida, APEX creadas vs cuota 20/semana).
- `mirNeto` (A − F/3) · `mirStatsPorAsignatura` · `mirPeorAsignatura` (alimenta los viernes del mantenimiento) ·
  `mirAgregadoAsignatura` · `mirAsignaturasEnAnclasD7` · `mirColaD14` · `mirUsadasIds` (anti-repetición con `mirPreguntasOficiales.preguntasSinUsar`) ·
  `mirEvalLogExportJSON` / `mirEvalLogImportJSON` (merge por id).
- **MIR_READINESS ya no es un 5 hardcodeado:** `mirReadiness()` (mirData.ts) = mini-MIR > media de cierres > ancladas > 0.
- D77 = mini-MIR 40Q (solo plantilla + neto) · D78 = corrección Whole-Page + `mirBaselineTabla()` (neto por asignatura = baseline honesto abr-2027).

## 5. Anki · preset FSRS `APEX::MIR` y plantilla APEX-MIR
- **v6.03b:** segundo mazo = el de Ravi («1ºVUELTA 2MIR21», preset RAVI-1V: FSRS 0,85, ≤3 nuevas/día en 1.ª vuelta · ≤10 en el banqueo),
  importado TODO SUSPENDIDO y reactivado por asignatura el día que empieza; orden aleatorio en los dos; el personal (APEX::MIR) primero.
  [`METODO_RAVIMEDTEST.md`](METODO_RAVIMEDTEST.md) §4.
- **Regla v3b (gap 11): los APEX MIR se crean DIRECTAMENTE en Anki escritorio** (Palmerton "as you learn": la tarjeta es la nota,
  sin intermediarios) **hasta que el redeploy de n8n esté verificado con un test multilínea real** (AUDITORIA §8: P0-2/P0-3 corregidos en
  disco SIN redesplegar → las tarjetas podrían llegar truncadas o no llegar). La cola de HOY, el bloque APEX y el mantenimiento lo repiten.
  La nota madre Obsidian sigue siendo el sitio de la lectura / Shopping List, no el canal de las tarjetas.
- Deck raíz `APEX::MIR::<asignatura>` (`ankiLinks.mirAnkiDeck`; se crean lazy, hoy solo existe `cardiologia`).
- **Preset FSRS "APEX::MIR"** (separado del USMLE): desired retention **0,85 hasta el Step 1 → 0,90 desde oct-2027** (v6.00, al entrar en la fase principal) · ⏸ (0,85 hasta el 22-abr-2027 → 0,90 desde el vie 23-abr-2027, al
  entrar en la fase principal; v5.20; v5.19: 15-abr → vie 16-abr; v5.18: 14-abr → jue 15-abr) · solo Good/Again · nuevas ≤4/día · límite de repasos sin capar (la franja de
  5 min soporta ~40-60 reviews; si el deck marca >60 vencidas dos días seguidos → bajar nuevas a 2 esa semana).
  Configurarlo es manual en Anki escritorio (A VERIFICAR 05-sep: no hay acceso AnkiConnect desde la app).
- **Test de humo semanal** (revisión SYNAPSE): `findNotes "deck:APEX::MIR* added:7"` por AnkiConnect local (o conteo manual) vs cuota
  20/semana; `deck:APEX::MIR* is:due` < 60 dos días seguidos → bajar nuevas a 2. Hoy sin dato: **pendiente** hasta verificar el preset.
- **Plantilla APEX-MIR** (campos obligatorios): `SAQ conceptual` · `Por qué (mecanismo fisiopatológico)` ·
  `🇪🇸 delta vs Perú/USA` (obligatoria si `delta_es`; si no aplica: "= igual"; si el día es 🇪🇸, con la **fuente oficial española** de
  `DELTA_ESPANA.md`) · `Tag sistema USMLE` (doble tag `APEX::MIR::<asig>` + `<usmleSystem>` del día) · `Pregunta oficial origen`
  (año-nº cuando exista el pool; la UI lo rellena con los `qIds` del quiz).
- **Cuota 1 de cada 4 APEX = tarjeta drill con imagen real** del capítulo ProMIR (ECG, Rx, analítica, derma):
  formato "Cardio — ECG: ¿qué muestra y qué haces?". El MIR trae ~25 preguntas con imagen.
- **Handoff vie 24-sep-2027** (v6.00: último día de la extensión; ⏸ v5.20: 22-abr-2027, último día del mantenimiento; v5.19: 15-abr; v5.18: 14-abr): export de stats FSRS del deck (retención real, intervalos medios) como criterio de entrada a la fase principal.

## 6. Mantenimiento ene-abr 2027 (banqueo puro) — [`src/lib/mirMantenimiento.ts`](../../src/lib/mirMantenimiento.ts)
> **⏸ v6.00:** mantenimiento **57 días jue 28-ene → jue 22-abr-2027** (47 lun-jue + 10 viernes, sin modo reducido) + **extensión 131 días vie 23-abr → vie 24-sep-2027** *(⏸ v6.00 · ⏸ v6.01: mar 2-feb → mar 27-abr + extensión 128 mié 28-abr → vie 24-sep = 185 · **v6.02:** mar 9-feb → mar 4-may + extensión 123 mié 5-may → vie 24-sep = 180)* (con 20 sábados en el SERUMS) = 188 filas; handoff vie 24-sep → fase principal oct-2027; Tier C y franjas por turno en el bloque v6.00 del principio. Lo de abajo (58 días, reducido 28-ene → 19-feb, días protegidos 22-feb / 9-mar / 10-mar, handoff jue 22-abr) es **v5.20, SUPERSEDIDO**.

Generado por [`DATA/_scripts/gen_mir_mantenimiento.js`](../../DATA/_scripts/gen_mir_mantenimiento.js) `[inicio] [fin]`
(default v5.20: **jue 28-ene → jue 22-abr-2027; 58 días L-V** = 46 slots lun-jue + 12 viernes, salta sáb/dom y los DÍAS PROTEGIDOS lun 22-feb / mar 9-mar / mié 10-mar (`PROTEGIDOS` en el generador); el inicio sigue al D78 de la 1ª vuelta para no solapar: v5.19 27-ene/57 días, v5.18 26-ene/57 días, v5.17 22-ene/58 días, v5.16 19-ene/57, v5.15 14-ene/57, v5.14 12-ene/57, v5.13 8-ene/59, v5.12 7-ene/60, v5.11 6-ene/61, v5.10 5-ene/62, v5.9 4-ene/63; el Tier C ocupa el último slot lun-jue de cada semana del `.ts` con lun-jue — semanas 1-12; la semana 1 = jue 28 → vie 29-ene; el generador abre semana con cada lunes del plan, así que con el lun 22-feb protegido 15-19 y 23-26 feb son una sola semana 4 — → en v5.20 los 12 caen en JUEVES, del jue 28-ene al jue 22-abr = D58, último día del plan). Sin contenido nuevo. **v5.20 (corrimiento RÍGIDO DEFINITIVO): inicio jue 28-ene (sigue al D78 mié 27-ene) y fin jue 22-abr → 58 días con los MISMOS 46 lun-jue + 12 vie, 0 sesiones perdidas y cuotas por peso idénticas.** ✅ `MIR_HITOS.handoff`, `MIR_CIERRE_UMBRAL_FASES`, la retención FSRS (0,85 → 0,90) y `MIR_MANT_META.handoff` ya llevan el **22-abr-2027** en el código: el handoff coincide con el último día del mantenimiento y la fase principal arranca el **vie 23-abr-2027**. *(v5.19: inicio mié 27-ene (D78 mar 26-ene) y fin jue 15-abr → 57 días = 46 lun-jue + 11 vie; Tier C en 12 jueves (28-ene → 15-abr); handoff 15-abr y fase principal desde el vie 16-abr. v5.18: inicio mar 26-ene (D78 lun 25-ene) y fin mié 14-abr → 57 días = 46 lun-jue + 11 vie; Tier C en 11 jueves + el mié 14-abr (su semana solo tenía lun-mié); handoff 14-abr y fase principal desde el jue 15-abr. v5.17: el fin se amplió del mié 7-abr al mar 13-abr — 58 días = 46 lun-jue + 12 vie, arranque en viernes —, handoff 13-abr y fase principal desde el mié 14-abr. v5.16: el fin se amplió del vie 2-abr al mié 7-abr — 57 días = 46 lun-jue + 11 vie, Neurología 5 recuperada —, handoff 7-abr y fase principal desde el jue 8-abr; la decisión de Joseph del 22-sep (handoff 31-mar vs fin del mantenimiento) quedó resuelta en v5.16.)*
- **normal:** 15:15–15:30 Anki APEX::MIR · 15:30–16:02 25Q reales MIR (15Q asignatura foco + 10Q interleaving · 77 s/Q = 32 min) · 16:02–16:15 corrección (13 min).
- **viernes:** 15:15–15:25 Anki · 15:25–16:04 **30Q de la asignatura PEOR del log** (`mirMantFoco(dia, mirPeorAsignatura())`; fallback = mayor peso de la semana) · corrección + neto semanal.
- **modo reducido jue 28-ene → vie 19-feb** (Fase B/C Step 1, flag `modo:'reducido'`, **17 días** — cubre hasta el **D95 del Step 1 (vie 19-feb, último día del plan)**, inclusive; `REDUCIDO_HASTA = '2027-02-19'` en el generador, v5.20): 15:15–15:35 Anki · 15:35–15:48 10Q · 15:48–15:55 log · resto al Step 1. El **jue 18-feb (D16 = D94, última sesión de banco del Step 1) lleva 10Q mixtas Ginecología y Obstetricia + Pediatría** (ya NO es jueves Tier C) y el **vie 19-feb (D17 = D95) es el último día reducido** (viernes reducido: Anki + 10Q de la asignatura peor del log, fallback Hematología). El **lun 22-feb (examen Step 1) es DÍA PROTEGIDO: sin sesión MIR**. El primer día en modo normal es el **mar 23-feb (D18, banco: 15Q Cardiología + 10Q interleaving Ginecología y Obstetricia)**, día 1 de la intensiva ENCAPS; el mar 9-mar y el mié 10-mar (D-1 y examen ENCAPS) tampoco llevan sesión MIR. *(v5.19: reducido 27-ene → 19-feb (18 días), D17 jue 18-feb = D95 = víspera y jueves Tier C Oncología Médica, D18 vie 19-feb = día del examen (viernes reducido), primer normal lun 22-feb. v5.18: reducido 26-ene → 18-feb, D18 = jue 18-feb = día del examen y jueves Tier C Oncología Médica, D17 mié 17-feb (D-1) con 10Q mixtas Cardio + Gine, primer normal vie 19-feb. v5.17: reducido 22-ene → 16-feb, D18 = mar 16-feb = día del examen con 10Q mixtas Cardiología + Gine (no Tier C), primer normal mié 17-feb. v5.16: reducido 19-ene → 11-feb, D18 = jue 11-feb = día del examen y jueves Tier C Oncología Médica, primer normal vie 12-feb. v5.15: reducido 14-ene → 8-feb, D18 = lun 8-feb con 10Q mixtas Cardio + Gine, primer normal mar 9-feb.)*
- **Tier C express (12 slots = último slot lun-jue de cada una de las 12 semanas del `.ts` con lun-jue: los 12 en JUEVES en v5.20)** — leído de `MIR_MANT_DIAS` con node el 6-oct (semana 1 = jue 28 → vie 29-ene; con el lun 22-feb protegido, 15-19 y 23-26 feb son la semana 4 → la semana del 15-feb no lleva Tier C): Trauma MI (jue 28-ene, D1 = D79 del Step 1) · Trauma MS (jue 4-feb, D6 = D84) · Radiología-Urgencias (jue 11-feb, D11 = D89 del Step 1) · Oncología Médica (**jue 25-feb**, D20, modo normal — ya NO cae en la víspera ni en el día del examen Step 1) · Geriatría (jue 4-mar, D25) · ORL (jue 11-mar, D28, día siguiente al examen ENCAPS) · Cuidados Paliativos (jue 18-mar, D33) · Urología (jue 25-mar, D38) · Oftalmología (jue 1-abr, D43) · Genética (jue 8-abr, D48) · Inmunología (jue 15-abr, D53) · Planificación y Gestión Sanitaria (**jue 22-abr**, D58 = último día del plan). En modo reducido sus 10Q sustituyen a las 10Q mixtas; se registran con la asignatura Tier C. Los 3 primeros (D1 · D6 · D11) caen en días reducidos: esos jueves son **solo Tier C** (10Q, sin formulario foco). *(v5.19: 12 jueves jue 28-ene D2 → jue 15-abr D57; 4 reducidos, D2 · D7 · D12 · D17, y Oncología Médica el jue 18-feb = D95 = víspera. v5.18: 11 jueves jue 28-ene D3 → jue 8-abr D53 + el mié 14-abr D57; 4 reducidos, D3 · D8 · D13 · D18, y Oncología Médica el jue 18-feb = día del examen. v5.17: 11 jueves jue 28-ene D5 → jue 8-abr D55 + el mar 13-abr D58; 3 reducidos, D5 · D10 · D15, y Oncología Médica el jue 18-feb = D20 ya en modo normal. v5.16: 11 jueves jue 21-ene D3 → jue 1-abr D53 + el mié 7-abr D57; 4 reducidos, D3 · D8 · D13 · D18, y Oncología Médica el jue 11-feb = día del examen. v5.15: todos en jueves, D1 · D6 · D11 · D16 reducidos, 12.º = jue 1-abr D56.)*
- Rotación lun-jue **ponderada por Peso MIR global** (texto real del intro ProMIR, `mirDetalleData.pesoGlobal`;
  cuotas exactas por resto mayor + smooth weighted round-robin) — v5.20 (= v5.19 = v5.18 = v5.17 = v5.16), contado de `MIR_MANT_PESOS.slots` y de los 46 días lun-jue del `.ts` con node el 6-oct: Cardio 5 · Gastro 5 · Neuro 5 · Infecto 4 ·
  Endo 4 · Neumo 3 · Reuma 3 · Epi 3 · Nefro 3 · Hemato 3 · Psiq 3 · Pedia 2 · Gine 2 · Bioética 1 (= **46 slots**; v5.16 también 46, v5.15 tenía 45 con Neuro 4, v5.14 46 con Neuro 5, v5.13 47 con Infecto 5, v5.12 48 con Neumo 4, v5.11 49 con Reuma 4, v5.10 50 con Cardio 6, v5.9 51 con Cardio 6 y Gastro 6).
- `MirTodayPlan` hace fallback automático a este plan cuando no hay `DiaMIR` (pestaña "Banqueo"); el formulario del mantenimiento
  también lleva el cronómetro y los campos tácticos.
- **Handoff jue 22-abr-2027** (fecha de `MIR_HITOS` y de `MIR_MANT_META.handoff`, = último día del mantenimiento; v5.20; v5.19: jue 15-abr; v5.18: mié 14-abr)**:** export JSON del log + tabla de neto por asignatura (mínimo on-track ≥ 60 %) + stats FSRS del deck → entrada de la fase principal (abr-2027), con umbrales 75/60.

## 7. Ficheros canónicos y pipeline
- `src/lib/mirDailyPlan.ts` — plan 78 días (MIR_DIAS con `delta?`, MIR_FRANJAS, MIR_COBERTURA, helpers). GENERADO entre marcadores.
- `src/lib/mirMantenimiento.ts` — **v6.02c: 189 filas** (180 de v6.02 byte-idénticas + 9 repuestas mar 28-sep → vie 8-oct-2027, campo `repuesta`) · **v6.00: 188 filas** (mantenimiento 57 jue 28-ene → jue 22-abr + extensión 131 vie 23-abr → vie 24-sep-2027; *(⏸ v6.00 · ⏸ v6.01: 185: 57 mar 2-feb → mar 27-abr + 128 mié 28-abr → vie 24-sep · **v6.02:** 180: 57 mar 9-feb → mar 4-may + 123 mié 5-may → vie 24-sep)* GENERADO por `gen_mir_mantenimiento.js` v6) · ⏸ 58 días ene-abr 2027, jue 28-ene → jue 22-abr (GENERADO, v5.20; v5.19: 57 días mié 27-ene → jue 15-abr). `src/lib/mirEvalLog.ts` — registro/neto/gate/anclas dinámicas/táctica/readiness.
- `DATA/MIR/guia_lectura_semana1-2.json` — guía QUÉ/CUÁNTO/CÓMO leer D1-D10 + Derma d1-d3 (v6.02c), GENERADA por `DATA/MIR/guia_lectura/gen_guia_lectura.js` desde `guia_lectura/medicion_promir_2026-10-18/` (re-medir con `guia_lectura/analiza_cap.js` en DevTools, capítulo a capítulo, para ampliar a D11+).
- `src/lib/mirEvalSync.ts` — espejo Supabase (`mir_eval_log`). `DATA/_scripts/_migrations/mir_eval_log.sql` — DDL canónico.
- `src/lib/mirData.ts` — MIR_HITOS / on-track / bandas / táctica / fases. `src/lib/mirUsmleBridge.ts` — puente Step 1 (lectura).
- `src/lib/mirPreguntasOficiales.ts` — pool oficial (lo rellena el pipeline de `DATA/MIR/pool/`; la UI consume `preguntasSinUsar` + `qIds`).
- `src/lib/mirTemarioData.ts` / `mirDetalleData.ts` / `mirPrioridades1V.ts` / `mirDriveResources.ts`.
- `DATA/MIR/DELTA_ESPANA.md` + `DATA/_scripts/gen_delta_espana.js` — base delta-España y volcado del log.
- UI: `src/components/study/MirHub.tsx` (readiness derivado + Δ on-track + trayectoria Top 50 + consejo táctico) + `MirTodayPlan.tsx`
  (HOY/Horario/7d/Temario + anclas dinámicas + formularios anclada/pretest/quiz/cierre/miniMIR/mantenimiento + cronómetro + banqueo) + `MirTemarioExplorer.tsx`.
- Raw: `STUDY_HUB/_scrape/promir_full_temario.json`, `mir_detalle_clean.json`, `intros/`.
- **Corrimiento** (cada día sin estudiar = +1 hábil): `node DATA/_scripts/remap_inicio.js <fecha>` re-fecha MIR_DIAS por regex
  (formato `fecha:"YYYY-MM-DD"` conservado; 78 filas; el sufijo `,delta:true` no lo afecta) — o regenerar con
  `node STUDY_HUB/_scrape/gen_mir_daily.js <fecha>` (misma salida + verificación). Desde v5.15 (corrimiento RÍGIDO) el mantenimiento **ya no tiene el FIN clavado**: no pierde sesiones (57 días en v5.15-v5.16 y v5.18-v5.19; 58 en v5.17, para conservar los 46 slots lun-jue de v5.16 arrancando en viernes, y en v5.20, arrancando en jueves y con 3 días protegidos en lun-jue), su INICIO sigue al D78 de la 1ª vuelta (v5.20: `INICIO = '2027-01-28'`; v5.19: `2027-01-27`; v5.18: `2027-01-26`; v5.17: `2027-01-22`; v5.16: `2027-01-19`), el FIN se amplía (v5.20: `2027-04-22`; v5.19: `2027-04-15`; v5.18: `2027-04-14`; v5.17: `2027-04-13`; v5.16: `2027-04-07`) y su
  `REDUCIDO_HASTA` sigue al último día del Step 1 (v5.20 → `2027-02-19` = D95; el examen del lun 22-feb es día protegido y el generador lo salta junto al 9 y 10-mar en `PROTEGIDOS`; v5.19 → `2027-02-19` = día del examen; v5.18: `2027-02-18`; v5.17: `2027-02-16`; v5.16: `2027-02-11`); se regenera con `node DATA/_scripts/gen_mir_mantenimiento.js` después de cada corrimiento que mueva el D78 al mantenimiento.
- `node STUDY_HUB/_scrape/gen_mir_daily.js --check` = test: falla (exit 1) si algún `peso` difiere >0,05 de MIR_DETALLE,
  si un capId no existe, si D1-D4 no son Epi+Bioética, si alguna fecha cae en finde o si un capId de `DELTA_CAPIDS` no lleva `delta:true`.

## 8. Pendientes (fuera del alcance de la app)
- Pool de preguntas oficiales por capítulo (`mirPreguntasOficiales.ts`): en curso por el pipeline `DATA/MIR/pool/` (examenesmir.com 2022-2026 + clasificación). Sin él, pre-test/eval/cierre usan el test del capítulo ProMIR; la UI ya consume `preguntasSinUsar` y guarda `qIds`.
- Acceso AMIR: no verificado → todo el loop se apoya en ProMIR + cuadernillos oficiales.
- Preset FSRS APEX::MIR (retention 0,85) y plantilla APEX-MIR: configurar en Anki escritorio; verificar el redeploy de n8n (hasta entonces, APEX directos en Anki).
- Verificar en vivo el espejo Supabase con dos dispositivos (móvil → web) y el bloque MIR de `gen_revision_semanal.js`.
- Completar las filas **A VERIFICAR** de `DELTA_ESPANA.md` con sesión de navegador (AEP, PAPPS, EDO, GesEPOC/GEMA, PEAHC, consenso *H. pylori*, tablas netas–nº de orden).
- Obsidian: `obsidianMap.ts` mapea MIR por `capId` (no por día) → el nuevo orden no requiere regenerarlo.
