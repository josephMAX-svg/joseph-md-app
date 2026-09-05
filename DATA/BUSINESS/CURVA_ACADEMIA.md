# CURVA ACADEMIA — esqueleto curricular (terapia hormonal de la menopausia · hipogonadismo masculino)

> **Estado: ESQUELETO sin días (5-sep-2026).** Arranca en **febrero-2027** (Fase 2 del roadmap, post-Step 1).
> En la última semana de enero se convierte en `DATA/BUSINESS/curva_curriculum.json` y se genera el plan de
> 90 días con `node DATA/_scripts/gen_liviano_plan.js <fecha>` (mismo motor que LIVIANO Academia: 25' estudio
> + 20' aplicación, casos en viernes, rúbrica de 4 ítems, drills ciegos, tarjetas de mecanismo).
> Regla anti-alucinación: toda cifra marcada **A VERIFICAR** se lee en la fuente primaria antes de entrar a un
> caso, a una tarjeta o a contenido. Nada de esto es contenido publicable todavía.

**Nota de catálogo (decisión de Joseph pendiente)**: en `empresaData.ts` la línea Curva figura como "Estética &
figura · estética corporal médica" (progreso 4 %), mientras que en `estudioPulsoData.ts` los libros marca Curva son
hormonales (Curva Hombre = testosterona). Este esqueleto sigue la instrucción del análisis Palmerton v3 (línea
**hormonal**: menopausia + hipogonadismo). Si Curva es estética corporal, el esqueleto cambia de eje.

---

## Objetivo de la línea

Que el médico LIVIANO/CURVA pueda **(1)** diagnosticar y acompañar la transición menopáusica y el hipogonadismo
masculino con los posicionamientos de las sociedades (no con libros de divulgación), **(2)** indicar, dosificar y
monitorizar terapia hormonal dentro de sus límites de competencia y derivar lo que no le corresponde, y **(3)**
explicárselo al paciente sin promesas (CMP Art. 73: nada de "rejuvenece", "quema grasa", "cura la libido").

**KPI de aprendizaje (Palmerton)**: ≥ 80 % en drills ciegos de cifras ancla + rúbrica de caso ≥ 6/8 en los últimos
4 viernes. **KPI de negocio**: el mismo motor que LIVIANO (conversión consulta→programa), sin anunciar precios
(CMP Art. 76).

---

## Los 6 módulos

| # | Módulo | Núcleo | Aplicación (20') |
|---|--------|--------|------------------|
| 1 | **Fisiología de la transición menopáusica y del eje HPG masculino** | STRAW+10, síntomas vasomotores, SGM, hueso; eje hipotálamo-hipófisis-testículo, hipogonadismo primario vs secundario, hipogonadismo funcional de la obesidad (conexión LIVIANO) | metáfora de paciente + tarjeta de mecanismo |
| 2 | **Terapia hormonal de la menopausia (THM): indicaciones, ventana, vías** | Menopause Society 2022: síntomas vasomotores, SGM y prevención de pérdida ósea en candidatas; "< 60 años o < 10 años desde la menopausia"; transdérmica vs oral (TEV/ictus); progestágeno si hay útero; sin límite arbitrario de duración | caso: ¿es candidata? ¿qué vía? |
| 3 | **Riesgos, contraindicaciones y monitorización de la THM** | cáncer de mama, TEV, ictus, EC según edad/tiempo; contraindicaciones absolutas; seguimiento; estrógeno vaginal local para SGM | caso: mujer con contraindicación → alternativa no hormonal (A VERIFICAR: fezolinetant/ISRS según guías) |
| 4 | **Hipogonadismo masculino: diagnóstico** | Endocrine Society 2018 + AUA 2018/2024 + EAU 2026: síntomas + testosterona total baja en **dos** mañanas en ayunas; umbral AUA 300 ng/dL; testosterona libre si SHBG alterada; causas reversibles (obesidad, apnea, fármacos, opioides) | caso: obeso con T baja → primero LIVIANO |
| 5 | **Testosterona: tratamiento, contraindicaciones, monitorización** | contraindicaciones (cáncer de próstata/mama, PSA elevado, hematocrito alto, apnea grave no tratada, IC descompensada, IAM/ictus < 6 meses, deseo de fertilidad); Hb/Hto y PSA antes y durante; no prescribir si busca embarazo | caso: varón 35 a que quiere hijos |
| 6 | **Testosterona en mujeres · límites · derivación · ética** | consenso global 2019: única indicación con evidencia = HSDD posmenopáusico, dosis fisiológica, no pellets/compuestos; qué deriva a ginecología/endocrinología/urología; publicidad y "antienvejecimiento" | caso integral + guion de consulta con la pareja |

---

## 3 esqueletos curriculares candidatos (fuentes verificadas 5-sep-2026)

### A · Menopausia — Menopause Society (antes NAMS)
- **The 2022 hormone therapy position statement of The North American Menopause Society**, *Menopause* 2022;
  URL del texto completo verificada por búsqueda: https://journals.lww.com/menopausejournal/fulltext/2022/07000/the_2022_hormone_therapy_position_statement_of_the.4.aspx ·
  PDF en menopause.org (descargado 5-sep; el extracto automático no pudo confirmar si el PDF servido es la
  versión 2022 o 2017 → **A VERIFICAR abriendo el PDF**): https://menopause.org/wp-content/uploads/professional/nams-2022-hormone-therapy-position-statement.pdf
- Posiciones leídas: THM = tratamiento más eficaz de los síntomas vasomotores; indicada además para SGM y
  prevención de pérdida ósea en candidatas; **beneficio > riesgo en mujeres < 60 años o < 10 años desde el inicio de
  la menopausia** sin contraindicaciones; balance menos favorable si se inicia > 10 años o > 60 años (EC, ictus,
  TEV, demencia); vía transdérmica con mejor perfil TEV/ictus que la oral; **no hay límite arbitrario de duración**
  (decisión compartida según síntomas y riesgos).
- Complementos a verificar en enero: NICE NG23 (2024 update; el sitio devolvió 403 al fetch automático) ·
  posicionamiento de la sociedad latinoamericana/peruana de climaterio (**A VERIFICAR** si existe uno vigente) ·
  fezolinetant como alternativa no hormonal (**A VERIFICAR** disponibilidad/registro en Perú).

### B · Hipogonadismo masculino — Endocrine Society + AUA + EAU
- **Bhasin S et al. Testosterone Therapy in Men With Hypogonadism: An Endocrine Society Clinical Practice
  Guideline.** *J Clin Endocrinol Metab* 2018;103(5):1715-1744 (leído 5-sep):
  https://academic.oup.com/jcem/article/103/5/1715/4939465 — diagnóstico solo con síntomas/signos **y** testosterona
  total inequívoca y consistentemente baja (mañana, ayunas, repetida); T libre si SHBG alterada; no tratar con
  cáncer de próstata metastásico o de mama, nódulo prostático palpable, PSA > 4 ng/mL (> 3 en alto riesgo),
  hematocrito elevado, apnea grave no tratada, STUI graves, IC no controlada, IAM/ictus < 6 meses, trombofilia,
  deseo de fertilidad próxima; monitorizar síntomas, T, hematocrito y riesgo prostático en el primer año.
- **AUA — Evaluation and Management of Testosterone Deficiency** (2018, validez confirmada 2024; leído 5-sep):
  https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline — corte razonable
  **< 300 ng/dL**; **dos** mediciones matutinas en días distintos; diagnóstico clínico = laboratorio + síntomas/signos;
  Hb/Hto antes de tratar (policitemia); PSA en > 40 años antes de iniciar; no prescribir a quien intenta concebir.
- **EAU Guidelines on Sexual and Reproductive Health** (edición 2026, actualización limitada de 2025; leído 5-sep):
  https://uroweb.org/guidelines/sexual-and-reproductive-health — sección 3 hipogonadismo masculino; medir T total
  entre 07:00-10:00 en ayunas (recomendación fuerte); no usar testosterona para infertilidad ni en quien quiere ser
  padre (fuerte).

### C · Testosterona en mujeres y ética de la "medicina hormonal"
- **Davis SR et al. Global Consensus Position Statement on the Use of Testosterone Therapy for Women.** *J Clin
  Endocrinol Metab* 2019;104(10):4660-4666 (leído 5-sep): https://pmc.ncbi.nlm.nih.gov/articles/PMC6821450/ —
  única indicación con evidencia = **HSDD en posmenopáusicas** tras evaluación biopsicosocial; formulaciones que
  aproximen concentraciones fisiológicas premenopáusicas; controles a 3-6 semanas y cada 6 meses; datos
  insuficientes para cognición, ánimo, hueso o prevención; **no** pellets, inyectables ni magistrales; seguridad
  no estudiada > 24 meses.
- Este esqueleto es el **contrapeso** de los libros del plan Business en modo CRITICA (Gottfried, *The Hormone
  Cure*; Bluming, *Estrogen Matters*; Attia, *Outlive* cap. hormonal): lo que afirma el libro vs lo que sostiene la
  sociedad → tabla de 3 columnas (OUTPUT S15 del plan Business ya la pide).

---

## Cifras ancla (para drills ciegos)

| Cifra | Valor | Fuente | Estado |
|-------|-------|--------|--------|
| Ventana favorable THM | < 60 años o < 10 años desde la menopausia | Menopause Society 2022 | leído (resumen) |
| Umbral T total (AUA) | < 300 ng/dL, dos mañanas | AUA 2018/2024 | leído |
| PSA que contraindica (Endocrine Society) | > 4 ng/mL (> 3 en alto riesgo) | Endocrine Society 2018 | leído |
| IAM/ictus reciente | < 6 meses → no iniciar | Endocrine Society 2018 | leído |
| Hora de extracción de T | 07:00-10:00, ayunas | EAU 2026 | leído |
| Control tras iniciar T en mujer | 3-6 semanas, luego cada 6 meses | Consenso global 2019 | leído |
| Riesgo absoluto de cáncer de mama con estrógeno+progestágeno (WHI) | **A VERIFICAR** (casos/10.000 mujeres-año) | WHI / Menopause Society | pendiente |
| Riesgo TEV oral vs transdérmica (RR) | **A VERIFICAR** | Menopause Society / NICE | pendiente |
| Prevalencia de hipogonadismo en obesidad (IMC ≥ 30) | **A VERIFICAR** | EAU / revisión | pendiente |
| Hematocrito que obliga a parar/ajustar T | **A VERIFICAR** (umbral exacto por guía) | Endocrine Society / AUA | pendiente |

---

## Límites de competencia y derivación (gatillos escritos)

- **Deriva a ginecología/mastología**: sangrado posmenopáusico, antecedente personal de cáncer de mama o
  hormonodependiente, THM > 10 años del inicio o > 60 años que insiste en iniciar, sospecha de neoplasia.
- **Deriva a endocrinología**: hipogonadismo secundario con prolactina alta o sospecha de masa hipofisaria, T muy
  baja en joven (**A VERIFICAR** umbral), fertilidad deseada (gonadotropinas/clomifeno = fuera del programa).
- **Deriva a urología**: PSA elevado o nódulo prostático, STUI graves, hematocrito alto persistente con T.
- **No se hace en CURVA**: pellets, "optimización hormonal" en eugonadales, testosterona a mujeres sin HSDD,
  hormonas "bioidénticas" magistrales sin registro, promesas de composición corporal.
- **Regla LIVIANO→CURVA**: en el varón con obesidad y T baja, **primero** tratar la obesidad (LIVIANO) y la apnea;
  la testosterona no es la primera línea del hipogonadismo funcional.

## Metáforas de paciente (a ensayar en los 20')

- **Termostato que cambia de fábrica** (menopausia): "el sensor de temperatura del cerebro se recalibra cuando
  cae el estrógeno; la THM le devuelve la señal que perdió, no te 'rejuvenece'".
- **Ventana de oportunidad** (< 60 / < 10 años): "hay un momento en que el tren pasa por tu estación; si subes
  tarde, el viaje es otro y hay que decidirlo con más cuidado".
- **La testosterona es el resultado, no la causa** (hipogonadismo funcional): "cuando el cuerpo carga grasa y no
  duerme, apaga la fábrica; muchas veces se enciende sola al bajar de peso y tratar la apnea".
- **Dos análisis, dos mañanas**: "una foto borrosa no se diagnostica; se repite en ayunas y de mañana".
- **Prescribir es un contrato de seguimiento**: "empezar testosterona significa análisis de sangre y próstata cada
  cierto tiempo; si no vas a los controles, no la empezamos".

## Ruta de credencial (a verificar en enero)

- **Menopause Society Certified Practitioner (MSCP)** — examen de competencia de la Menopause Society (**A VERIFICAR**
  requisitos para médicos fuera de EE. UU. y costo).
- **ISSM / EAU** — cursos de andrología y salud sexual masculina (**A VERIFICAR** oferta 2027).
- Local: diplomados de climaterio/endocrinología ginecológica de universidades peruanas (**A VERIFICAR**).
- Posicionamiento: CURVA como línea "por guías, no por moda" — la credencial se comunica como formación, nunca
  como garantía de resultado (CMP Art. 73).

## Enlace con el resto del sistema

- Plan Business v3 L: HORMONAL en modo CRITICA (3 filas) + OUTPUT S15 ("10 preguntas abiertas para CURVA_ACADEMIA").
- AURUM: la variante LIVIANO de los drills (venta ética de un programa médico) se reutiliza tal cual para CURVA.
- VITALS: si CURVA incorpora composición corporal/fuerza, usar el puente `DATA/VITALS/LIVIANO_VITALS_BRIDGE.md`.
