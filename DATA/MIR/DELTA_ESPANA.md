# DELTA-ESPAÑA · qué cambia en España respecto a Perú/USA (base de conocimiento del MIR)

> **Por qué existe (Palmerton v3b, gap 10, 12-sep-2026).** El "delta-España" es el modo de fallo más probable de un
> médico formado en Perú que rinde el MIR: contestar con el manejo MINSA / USA a una pregunta española
> (legislación, guías de sociedad, calendario vacunal, cribados, terminología, nombres comerciales). Hasta hoy solo
> existía como flag booleano `delta_es` en el log (`src/lib/mirEvalLog.ts`). Este fichero es la **lista previa**:
> qué cambia, por asignatura, con fuente oficial española verificable — y se alimenta con cada fallo `delta_es`
> del log (sección final, volcada por `DATA/_scripts/gen_delta_espana.js`). Objetivo medible: **0 fallos delta
> repetidos** en el mantenimiento ene-mar 2027 (la tabla baseline de D78 cuenta `deltaEs` por asignatura).

**Formato de cada fila:** ítem · manejo Perú/USA · manejo España · fuente oficial española · capId (deep-link
ProMIR `https://promir.medicapanamericana.com/capitulo/<capId>`; `—` = capítulo fuera del plan de 78 días).

**Regla anti-alucinación:** solo se cita como "fuente oficial" lo verificado con `WebFetch` el 12-sep-2026 (texto
consolidado del BOE o página institucional viva); lo demás lleva **A VERIFICAR (12-sep)** y no se usa en un APEX
hasta comprobarlo. La app marca con el chip 🇪🇸 *delta previsible* los 11 días del plan cuyo `capId` está en
`DELTA_CAPIDS` (`STUDY_HUB/_scrape/gen_mir_daily.js` → `delta:true` en `mirDailyPlan.ts`).

## Fuentes oficiales verificadas el 12-sep-2026 (texto consolidado, BOE / Ministerio)
| Norma / fuente | URL verificada | Uso en el MIR |
|---|---|---|
| Ley 41/2002, básica reguladora de la autonomía del paciente y de derechos y obligaciones en materia de información y documentación clínica | https://www.boe.es/buscar/act.php?id=BOE-A-2002-22188 | consentimiento informado, menor maduro (16 años), instrucciones previas, historia clínica (conservación ≥5 años) |
| Ley Orgánica 3/2021, de regulación de la eutanasia | https://www.boe.es/buscar/act.php?id=BOE-A-2021-4628 | prestación de ayuda para morir: requisitos, dos solicitudes, médico responsable/consultor, Comisión de Garantía y Evaluación |
| Ley Orgánica 2/2010, de salud sexual y reproductiva y de la interrupción voluntaria del embarazo (modif. LO 1/2023) | https://www.boe.es/buscar/act.php?id=BOE-A-2010-3514 | IVE a petición hasta 14 semanas; hasta 22 por causas médicas; comité clínico |
| Ley 30/1979, sobre extracción y trasplante de órganos | https://www.boe.es/buscar/act.php?id=BOE-A-1979-26445 | consentimiento presunto del donante cadáver, gratuidad, anonimato |
| Real Decreto 1723/2012, obtención y utilización clínica de órganos humanos | https://www.boe.es/buscar/act.php?id=BOE-A-2012-15715 | diagnóstico de muerte (encefálica / circulatoria), ONT, coordinación |
| Ley 8/2021, reforma de la legislación civil y procesal para el apoyo a las personas con discapacidad | https://www.boe.es/buscar/act.php?id=BOE-A-2021-9233 | fin de la incapacitación/tutela de adultos → medidas de apoyo (curatela) |
| Real Decreto 124/2007, Registro nacional de instrucciones previas | https://www.boe.es/buscar/act.php?id=BOE-A-2007-3160 | voluntades anticipadas: registro estatal |
| Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales | https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673 | datos de salud (categoría especial), acceso a la HC |
| Ley 14/1986, General de Sanidad | https://www.boe.es/buscar/act.php?id=BOE-A-1986-10499 | estructura del SNS, derechos de los usuarios |
| Ley 16/2003, de cohesión y calidad del SNS | https://www.boe.es/buscar/act.php?id=BOE-A-2003-10715 | cartera de servicios, CISNS |
| Real Decreto 1030/2006, cartera de servicios comunes del SNS | https://www.boe.es/buscar/act.php?id=BOE-A-2006-16212 | cribados poblacionales (mama, colon, cérvix), cribado neonatal |
| Orden SCB/480/2019 (modifica anexos I, III y VI del RD 1030/2006) | https://www.boe.es/buscar/act.php?id=BOE-A-2019-6277 | cribado de cáncer de cérvix (VPH), audífonos hasta 26 años, reconstrucción mamaria |
| Ley 33/2011, General de Salud Pública | https://www.boe.es/buscar/act.php?id=BOE-A-2011-15623 | vigilancia, cribados poblacionales, vacunación |
| Real Decreto 2210/1995, Red Nacional de Vigilancia Epidemiológica | https://www.boe.es/buscar/act.php?id=BOE-A-1996-1502 | enfermedades de declaración obligatoria (EDO) |
| Ley 14/2007, de Investigación biomédica | https://www.boe.es/buscar/act.php?id=BOE-A-2007-12945 | investigación con muestras/datos, biobancos, CEI |
| Real Decreto 1090/2015, ensayos clínicos con medicamentos, CEIm y REEC | https://www.boe.es/buscar/act.php?id=BOE-A-2015-14082 | ensayo clínico (Epi D1): CEIm, Registro Español de Estudios Clínicos |
| Ley 14/2006, sobre técnicas de reproducción humana asistida | https://www.boe.es/buscar/act.php?id=BOE-A-2006-9292 | donación anónima, límites, diagnóstico preimplantacional |
| Real Decreto 1088/2005, hemodonación y centros/servicios de transfusión | https://www.boe.es/buscar/act.php?id=BOE-A-2005-15514 | donación voluntaria, altruista y no remunerada; requisitos del donante |
| Ministerio de Sanidad · Vacunas y Programa de Vacunación (calendario común a lo largo de toda la vida, calendarios de riesgo, acelerado) | https://www.sanidad.gob.es/areas/promocionPrevencion/vacunaciones/home.htm | Pediatría D73 · calendario CISNS vigente (**el año concreto de la última actualización: A VERIFICAR (12-sep)** al abrir la página) |
| GeSIDA (Grupo de Estudio del SIDA · SEIMC) · documento de consenso de TAR en adultos (actualizado enero 2025) | https://gesida-seimc.org/ | Infecciosas D50 |
| SEGO · Sociedad Española de Ginecología y Obstetricia (protocolos / guías de asistencia práctica, Biblioteca Virtual) | https://sego.es/ | Gine D57-D62 |
| SEC · Sociedad Española de Cardiología (difunde las guías ESC en español) | https://secardiologia.es/ | Cardio D5-D11 |
| SEPAR · Sociedad Española de Neumología y Cirugía Torácica (normativas SEPAR) | https://www.separ.es/ | Neumo D12-D16 · TBC D51 · NAC D52 |

**No verificables el 12-sep (bloqueo 403 / 404 desde WebFetch) → A VERIFICAR con sesión de navegador:** calendario
AEP (`vacunasaep.org`), semFYC/PAPPS (`semfyc.es`, `papps.es`), AEP (`aeped.es`), Orden SSI/445/2015 (lista de EDO), Ley
39/2006 (dependencia), Plan Nacional frente a la Resistencia a los Antibióticos (PRAN, AEMPS), Guía de práctica clínica
de atención en el embarazo y puerperio (SNS), Estrategia en Cáncer del SNS (cribados), Plan para la prevención y control
de la tuberculosis en España, IV/V Conferencia Española de Consenso sobre *H. pylori*, GesEPOC y GEMA (SEPAR/SEAIC).

---

## 1. Epidemiología (num 8 · D1-D3) — delta bajo (método universal), delta regulatorio en ensayos
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| Autorización y ética de un ensayo clínico con medicamentos | USA: FDA (IND) + IRB · Perú: INS/OGITT (A VERIFICAR (12-sep)) | AEMPS + un único **CEIm** (Comité de Ética de la Investigación con medicamentos) + inscripción en el **REEC**; marco del Reglamento (UE) 536/2014 | RD 1090/2015 (verificado) | 570779c9f4d68bf008dbc7b1 |
| Investigación con muestras biológicas / biobancos | IRB, HIPAA | Ley 14/2007: consentimiento específico, biobancos autorizados, CEI | Ley 14/2007 (verificado) | 570779c9f4d68bf008dbc80d |
| Cribado poblacional: quién decide qué se criba | USPSTF (grados A-D) · Perú: NTS MINSA | Cartera común del SNS (RD 1030/2006) + Estrategias del SNS + PAPPS (semFYC) como recomendación de AP; el MIR pregunta criterios de Wilson-Jungner y los programas poblacionales (mama, colon, cérvix) | RD 1030/2006 (verificado) · PAPPS **A VERIFICAR (12-sep)** | 570779c9f4d68bf008dbc80f |
| Vigilancia: enfermedades de declaración obligatoria | CDC NNDSS · Perú: CDC-MINSA / NOTI | Red Nacional de Vigilancia Epidemiológica (RENAVE); lista EDO estatal | RD 2210/1995 (verificado) · Orden SSI/445/2015 **A VERIFICAR (12-sep)** | — |

## 2. Medicina Legal y Bioética (num 17 · D4) — **delta previsible (chip 🇪🇸)**
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| Consentimiento informado: forma | Perú: Ley 26842 / Ley 29414 y reglamento — escrito para procedimientos invasivos (**A VERIFICAR (12-sep)**) · USA: varía por estado | Regla general **verbal**; **por escrito** en intervención quirúrgica, procedimientos diagnósticos y terapéuticos invasores y procedimientos de riesgo notorio (art. 8.2); excepciones (art. 9): riesgo para la salud pública, urgencia vital sin posibilidad de consentimiento | Ley 41/2002 (verificado) | 64a3be863f62ec1dbb3e665b |
| Mayoría de edad sanitaria / menor maduro | USA: 18 años salvo excepciones estatales · Perú: 18 (A VERIFICAR (12-sep)) | **16 años** (o emancipado) decide por sí mismo; entre 12 y 16 se escucha su opinión; en actuaciones de **grave riesgo** para la vida/salud del menor de 16-17 consienten los representantes legales oída la opinión del menor (art. 9.4, redacción Ley 26/2015) | Ley 41/2002 art. 9 (verificado) | 64a3be863f62ec1dbb3e665b |
| Instrucciones previas (voluntades anticipadas) | USA: advance directives / POLST · Perú: sin registro equivalente (A VERIFICAR (12-sep)) | Documento de **instrucciones previas** (art. 11): mayor de edad, capaz y libre; registro autonómico + **Registro nacional** | Ley 41/2002 art. 11 + RD 124/2007 (verificados) | 64a3be863f62ec1dbb3e665b |
| Historia clínica: conservación y acceso | USA: HIPAA (acceso del paciente; conservación según estado) | Conservación **mínimo 5 años** desde el alta de cada proceso (art. 17); acceso del paciente con límites (anotaciones subjetivas, datos de terceros, art. 18) | Ley 41/2002 art. 17-18 (verificado) · LO 3/2018 (verificado) | 64a3be863f62ec1dbb3e665b |
| Eutanasia / suicidio asistido | Perú: no regulado por ley (caso individual Ana Estrada, sentencia 2021 — A VERIFICAR (12-sep)) · USA: suicidio médicamente asistido solo en algunos estados; eutanasia no | **Prestación de ayuda para morir legal** (LO 3/2021): enfermedad grave e incurable o padecimiento grave, crónico e imposibilitante; **dos solicitudes** por escrito separadas ≥15 días; médico responsable + médico consultor + **Comisión de Garantía y Evaluación**; objeción de conciencia individual registrada; modalidades: administración por profesional o autoadministración | LO 3/2021 (verificado) | 64a3be863f62ec1dbb3e665b |
| Interrupción voluntaria del embarazo | Perú: solo aborto terapéutico (Código Penal art. 119, hasta 22 sem — A VERIFICAR (12-sep)) · USA: por estado tras *Dobbs* (2022) | **A petición hasta la semana 14**; hasta la **22** por grave riesgo para la vida/salud de la gestante o graves anomalías fetales; sin límite si anomalías incompatibles con la vida o enfermedad extremadamente grave e incurable (comité clínico); LO 1/2023 suprime el periodo de reflexión de 3 días y el permiso paterno a los 16-17 años | LO 2/2010 consolidada con LO 1/2023 (verificado) | 64a3be863f62ec1dbb3e665b |
| Donación de órganos de cadáver | Perú: consentimiento **expreso** (DNI "donante"; Ley 28189 — A VERIFICAR (12-sep)) · USA: opt-in (registros estatales) | **Consentimiento presunto**: toda persona fallecida es donante si no consta oposición expresa; comprobación con la familia; gratuidad y anonimato; diagnóstico de muerte encefálica o por criterios circulatorios (donación en asistolia); ONT | Ley 30/1979 + RD 1723/2012 (verificados) | 64a3be863f62ec1dbb3e665b |
| Capacidad jurídica / "incapacitación" | Perú: Decreto Legislativo 1384 (2018) también eliminó la interdicción por discapacidad (A VERIFICAR (12-sep)) · USA: guardianship | Ley 8/2021: desaparecen la incapacitación judicial y la tutela de adultos; **medidas de apoyo** (curatela, guarda de hecho, defensor judicial); no se habla de "incapacitado" | Ley 8/2021 (verificado) | 64a3be863f62ec1dbb3e665b |
| Internamiento psiquiátrico involuntario | Perú: Ley 30947 (salud mental) — A VERIFICAR (12-sep) · USA: *civil commitment* por estado | Autorización **judicial** (art. 763 LEC): previa, o ratificación en **24 h** si es urgente, con informe médico; revisión periódica | Ley 1/2000 de Enjuiciamiento Civil art. 763 — **A VERIFICAR (12-sep)** (no comprobado hoy en BOE) | — (Psiquiatría D74-D76) |
| Secreto profesional y deber de declarar | HIPAA / *duty to warn* | Secreto (Código Penal art. 199, Ley 41/2002); excepciones: EDO, lesiones con parte judicial, imperativo legal | Ley 41/2002 (verificado) · Código Penal **A VERIFICAR (12-sep)** | 64a3be863f62ec1dbb3e665b |

## 3. Cardiología (num 3 · D5-D11) — delta de GUÍAS (ESC/SEC frente a ACC/AHA), chip 🇪🇸 en D10
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| Estimación del riesgo cardiovascular | ASCVD *pooled cohort equations* (ACC/AHA), umbral 7,5 % a 10 años · Perú: guías MINSA basadas en tablas OMS (A VERIFICAR (12-sep)) | **SCORE2 / SCORE2-OP** (ESC 2021, tablas para país de bajo riesgo): riesgo de eventos CV fatales y no fatales a 10 años; la SEC adopta las guías ESC | SEC (verificado; guías ESC 2021 de prevención **A VERIFICAR (12-sep)** la versión vigente) | 570779c8f4d68bf008dbc658 |
| Definición y umbral de HTA | ACC/AHA 2017: HTA ≥130/80 (estadio 1) | ESC/ESH: **HTA ≥140/90 mmHg** en consulta; objetivo general <130/80 si se tolera (ESC 2024 añade "PA elevada" 120-139/70-89 — **A VERIFICAR (12-sep)**) | SEC/SEH-LELHA · guías ESC (**A VERIFICAR (12-sep)** edición) | 570779c8f4d68bf008dbc658 |
| Objetivos de LDL | AHA/ACC 2018: intensidad de estatina + % de reducción | ESC/EAS 2019: objetivos absolutos por riesgo (**muy alto riesgo LDL <55 mg/dL** y ≥50 % de reducción; alto <70) | SEC (verificado) · ESC/EAS 2019 **A VERIFICAR (12-sep)** | 570779c8f4d68bf008dbc658 |
| Anticoagulación oral clásica | Warfarina (USA/Perú) | **Acenocumarol (Sintrom®)** es el AVK de uso corriente; los AVK se controlan por INR igual; ACOD igual que ESC | nombre comercial de uso corriente en viñetas — sin fuente normativa | 570779c9f4d68bf008dbc78d |
| Antiagregación: presentación | AAS 81 mg | **AAS 100 mg** (Adiro®) | uso corriente — sin fuente normativa | 570779c9f4d68bf008dbc731 |
| Unidades | mg/dL | mg/dL (igual; **no** mmol/L, a diferencia del Reino Unido) | — | — |

## 4. Neumología (num 19 · D12-D16) — delta de guías nacionales (GesEPOC/GEMA) y organización
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| EPOC: clasificación y tratamiento | GOLD (grupos A/B/E) | El MIR usa **GOLD** y cita **GesEPOC** (guía española: fenotipos no agudizador / agudizador eosinofílico / no eosinofílico; niveles de riesgo) — **A VERIFICAR (12-sep)** la edición vigente de GesEPOC | SEPAR (verificado) | 570779c9f4d68bf008dbc883 |
| Asma | GINA | GINA + **GEMA** (Guía Española para el Manejo del Asma) — escalones equivalentes; **A VERIFICAR (12-sep)** edición | SEPAR/SEAIC — **A VERIFICAR (12-sep)** | — |
| Neumonía adquirida en la comunidad: empírica | IDSA/ATS 2019 · Perú: guía MINSA | Normativa SEPAR de NAC: escalas CURB-65 / PSI iguales; empírica según gravedad; **la resistencia neumocócica a macrólidos en España es alta** → en el MIR la monoterapia con macrólido no es primera opción (**A VERIFICAR (12-sep)** cifras y normativa vigente) | SEPAR (verificado) · normativa NAC **A VERIFICAR (12-sep)** | 570779c8f4d68bf008dbc6e8 |
| Cáncer de pulmón: cribado con TC de baja dosis | USPSTF: 50-80 años, ≥20 paquetes-año, fumador o exfumador <15 años | **No hay cribado poblacional en la cartera común** (programas piloto — CASSANDRA — **A VERIFICAR (12-sep)**) | RD 1030/2006 (verificado: no lo incluye) | 570779c9f4d68bf008dbc861 |
| Oxigenoterapia domiciliaria: prescripción | Medicare criteria | Cartera común de prestaciones (terapias respiratorias domiciliarias) · criterios PaO2 ≤55 (o 56-59 con cor pulmonale/poliglobulia) iguales | RD 1030/2006 anexo VI (verificado) | 570779c9f4d68bf008dbc883 |

## 5. Nefrología (num 18 · D17-D22) — delta terminológico
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| Nomenclatura | "Injuria/lesión renal aguda" (AKI) · "enfermedad renal crónica" | **Fracaso renal agudo (FRA)** / "insuficiencia renal aguda"; **enfermedad renal crónica (ERC)** con estadios KDIGO (G1-G5, A1-A3) iguales | terminología ProMIR (capítulo) | 570779c8f4d68bf008dbc6b0 |
| Fórmula de FG | CKD-EPI 2021 sin variable racial (USA) | **CKD-EPI** (SEN recomienda; si 2009 o 2021 — **A VERIFICAR (12-sep)**) · MDRD en preguntas antiguas | SEN — **A VERIFICAR (12-sep)** | 570779c9f4d68bf008dbc72d |
| Trasplante renal: fuente de órganos | Perú: donante vivo predominante · USA: listas UNOS | España lidera la donación de cadáver (consentimiento presunto, donación en asistolia) → el MIR asume acceso a trasplante cadáver | Ley 30/1979 + RD 1723/2012 (verificados) | 570779c9f4d68bf008dbc72d |

## 6. Gastroenterología (num 11 · D23-D30) — delta de cribado y de consenso *H. pylori*, chip 🇪🇸 en D24
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| Cribado de cáncer colorrectal | USA: colonoscopia cada 10 años (o SOH anual) desde los 45 · Perú: sin programa poblacional | **Programa poblacional con SOH inmunoquímica bienal 50-69 años**; colonoscopia solo si SOH positiva; en cartera común (actualización 2014 del RD 1030/2006 — **A VERIFICAR (12-sep)** la orden) | RD 1030/2006 (verificado) | 570779c8f4d68bf008dbc64c |
| Erradicación de *H. pylori*: primera línea | USA (ACG): cuádruple con bismuto o triple según resistencias · Perú: triple 14 días (A VERIFICAR (12-sep)) | Consenso español (IV/V Conferencia de Consenso): **cuádruple con bismuto 14 días** (o cuádruple concomitante) por alta resistencia a claritromicina; **no** triple clásica — **A VERIFICAR (12-sep)** edición vigente | Conferencia Española de Consenso — **A VERIFICAR (12-sep)** | 570779c8f4d68bf008dbc64a |
| Hepatitis C: estrategia | USA: cribado universal 18-79 (USPSTF) | **Plan Estratégico para el abordaje de la hepatitis C en el SNS (PEAHC)**: AAD para todos los diagnosticados; cribado por factores de riesgo/edad según CCAA — **A VERIFICAR (12-sep)** | Ministerio de Sanidad — **A VERIFICAR (12-sep)** | 570779c9f4d68bf008dbc723 |
| Trasplante hepático | UNOS/MELD | ONT/MELD (igual); lista única estatal | Ley 30/1979 (verificado) | 570779c9f4d68bf008dbc723 |

## 7. Endocrinología y Nutrición (num 6 · D31-D36) — delta bajo
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| Diabetes: guías | ADA | El MIR sigue **ADA** (objetivos HbA1c, escalones) con matices de la SED/redGDPS; unidades mg/dL iguales | SED — **A VERIFICAR (12-sep)** | 570779c9f4d68bf008dbc737 |
| Cribado de DM gestacional | USA: 1 o 2 pasos (Carpenter-Coustan / IADPSG) · Perú: NTS MINSA | **Dos pasos**: O'Sullivan (50 g) en el 2º trimestre (o 1º si riesgo) → SOG 100 g 3 h (criterios NDDG) — **A VERIFICAR (12-sep)** vigencia GEDE/SEGO | GEDE/SEGO — **A VERIFICAR (12-sep)** | 570779c8f4d68bf008dbc6c6 |
| Financiación de fármacos (aGLP-1, iSGLT2): "visado" | no aplica | Muchos fármacos requieren **visado de inspección** → en viñetas de AP puede condicionar la elección (**A VERIFICAR (12-sep)** cuáles) | AEMPS/Ministerio — **A VERIFICAR (12-sep)** | 570779c9f4d68bf008dbc737 |

## 8. Neurología (num 20 · D37-D43) — delta organizativo
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| Ictus agudo: organización | *stroke centers* (USA) | **Código Ictus** autonómico: activación prehospitalaria, unidad de ictus, trombólisis ≤4,5 h y trombectomía ≤6 h (hasta 24 h seleccionados) iguales a las guías internacionales | Estrategia en Ictus del SNS — **A VERIFICAR (12-sep)** | 570779c9f4d68bf008dbc8a9 |
| Demencia: recursos sociales | Medicaid/long-term care | **Ley de Dependencia** (Ley 39/2006): grados I-III, prestaciones — **A VERIFICAR (12-sep)** (no comprobada hoy en BOE) | Ley 39/2006 — **A VERIFICAR (12-sep)** | 570779c9f4d68bf008dbc897 |
| Epilepsia y conducción | por estado | Reglamento General de Conductores: periodo libre de crisis exigido (**A VERIFICAR (12-sep)** el plazo vigente, RD 818/2009) | DGT — **A VERIFICAR (12-sep)** | 570779c9f4d68bf008dbc7dd |

## 9. Hematología (num 15 · D44-D48) — delta de nombres comerciales y hemodonación
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| Anticoagulante oral clásico | Warfarina | **Acenocumarol (Sintrom®)**; INR igual; antídoto vitamina K / CCP igual | uso corriente | 57ed1550e68c512d007426d1 |
| Donación de sangre | Perú: PRONAHEBAS, donación de reposición frecuente (A VERIFICAR (12-sep)) · USA: FDA | **Voluntaria, altruista y no remunerada**; requisitos del donante (edad, peso, intervalo) y pruebas obligatorias en el RD | RD 1088/2005 (verificado) | 570779c9f4d68bf008dbc7b3 |
| Hemoterapia: consentimiento | — | Consentimiento informado para transfusión (por escrito: procedimiento de riesgo notorio) | Ley 41/2002 (verificado) | 570779c9f4d68bf008dbc7b3 |

## 10. Enfermedades Infecciosas (num 7 · D49-D56) — chip 🇪🇸 en D50, D51 y D53
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| Infecciones tropicales (D49) | **Ventaja Perú, no delta**: malaria, dengue, leishmaniasis, Chagas son endémicas/conocidas | En España son importadas → el MIR pregunta enfoque del **viajero/inmigrante** y **declaración obligatoria** (RENAVE); Chagas: cribado de gestantes de zonas endémicas en varias CCAA (**A VERIFICAR (12-sep)**) | RD 2210/1995 (verificado) | 570779c8f4d68bf008dbc6ec |
| VIH: tratamiento y PrEP | DHHS · Perú: NTS MINSA (TAR universal) | **Documento de consenso GeSIDA** (TAR en todos, pautas preferentes basadas en INSTI; actualización enero 2025); **PrEP financiada por el SNS** desde 2019 (**A VERIFICAR (12-sep)** requisitos) | GeSIDA (verificado) | 570779c9f4d68bf008dbc7c1 |
| Tuberculosis: contexto y programa | Perú: alta incidencia, MDR/XDR, NTS MINSA (DOTS, esquemas sensibles/MDR) | **Baja incidencia**: 2HRZE/4HR igual; foco del MIR en **estudio de contactos, infección tuberculosa latente (IGRA/PT) y quimioprofilaxis**; Plan para la prevención y control de la TBC en España (CISNS 2019 — **A VERIFICAR (12-sep)**) | SEPAR (verificado) · Plan **A VERIFICAR (12-sep)** | 570779c9f4d68bf008dbc765 |
| Antibacterianos: resistencias y empírica | IDSA · Perú: alta resistencia a fluoroquinolonas/BLEE comunitaria | Perfil español: **neumococo resistente a macrólidos**, *E. coli* BLEE en aumento, SARM hospitalario; programas **PROA** y **PRAN** (AEMPS) — **A VERIFICAR (12-sep)** cifras vigentes; nombres comerciales (Augmentine® = amoxicilina-clavulánico) | SEIMC/AEMPS — **A VERIFICAR (12-sep)** | 570779c8f4d68bf008dbc6e6 |
| Meningitis: profilaxis y vacunas | ACIP | Quimioprofilaxis de contactos igual (rifampicina/ciprofloxacino/ceftriaxona); vacunas MenACWY/MenB del calendario común (ver Pediatría) | Ministerio · calendario (verificado) | 570779c9f4d68bf008dbc81b |
| Sepsis / infección nosocomial: vigilancia | NHSN (CDC) | Programas **ENVIN-HELICS** (UCI) y **EPINE** (prevalencia) — **A VERIFICAR (12-sep)** | SEMICYUC/SEMPSPH — **A VERIFICAR (12-sep)** | 570779c9f4d68bf008dbc763 |

## 11. Ginecología y Obstetricia (num 14 · D57-D62) — chip 🇪🇸 en D57, D60 y D61
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| Cribado de cáncer de mama | USPSTF 2024: bienal desde los 40 · Perú: mamografía desde 40-50 según NTS (A VERIFICAR (12-sep)) | **Programa poblacional: mamografía bienal 50-69 años** (cartera común); algunas CCAA amplían 45-74 (**A VERIFICAR (12-sep)**) | RD 1030/2006 (verificado) | 570779c9f4d68bf008dbc73f |
| Cribado de cáncer de cérvix | USA: citología 21-29 / co-test o VPH 30-65 · Perú: IVAA/VPH según NTS | Cartera común (Orden SCB/480/2019): **25-34 años citología cada 3 años; 35-65 años prueba de VPH cada 5 años** (**A VERIFICAR (12-sep)** el detalle de edades en el anexo) | Orden SCB/480/2019 (verificado) | — |
| Infecciones y embarazo: cribados | ACOG · Perú: NTS 105-MINSA (A VERIFICAR (12-sep)) | Protocolos **SEGO**: serologías 1º trimestre (VIH, VHB, sífilis, rubéola), **EGB cultivo recto-vaginal 35-37 sem**, toxoplasma según protocolo (**A VERIFICAR (12-sep)**: SEGO no recomienda cribado universal de toxoplasma en todas las versiones), Chagas en gestantes de zona endémica según CCAA | SEGO (verificado) | 570779c9f4d68bf008dbc745 |
| Control de la gestación: visitas y ecografías | ACOG (≈12-14 visitas) · Perú: ≥6 APN (NTS MINSA) | GPC del SNS de atención en el embarazo y puerperio (2014 — **A VERIFICAR (12-sep)**): 3 ecografías (12, 20, 34-36 sem), cribado combinado del 1º trimestre, O'Sullivan 24-28 sem, EGB 35-37; permiso de maternidad 16 semanas | Ministerio / SEGO — **A VERIFICAR (12-sep)** | 570779c8f4d68bf008dbc6c6 |
| IVE | ver Bioética | LO 2/2010: 14 semanas a petición / 22 causas médicas | LO 2/2010 (verificado) | 570779c8f4d68bf008dbc66a |
| Reproducción asistida | USA: donación no anónima en muchos centros · Perú: sin ley específica (A VERIFICAR (12-sep)) | Ley 14/2006: **donación anónima**, límite de descendientes por donante, DGP regulado, receptora ≥18 años sin límite legal de edad | Ley 14/2006 (verificado) | — |
| Ca de ovario: cribado | no recomendado (USPSTF D) | igual: **no cribado poblacional**; consejo genético BRCA en cartera (**A VERIFICAR (12-sep)**) | RD 1030/2006 (verificado) | 570779c9f4d68bf008dbc741 |

## 12. Reumatología (num 28 · D63-D68) — sin delta previsible
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| Guías | ACR/EULAR | El MIR usa **EULAR/ACR** (criterios de clasificación iguales); la SER publica guías (GUIPCAR) — **A VERIFICAR (12-sep)** | SER — **A VERIFICAR (12-sep)** | 570779c9f4d68bf008dbc7e3 |
| Biológicos: acceso | seguro privado / formularios | Prescripción hospitalaria (uso hospitalario) — no cambia la indicación en la viñeta | — | — |

## 13. Pediatría (num 24 · D69-D73) — **delta previsible máximo (chip 🇪🇸 en D70 y D73)**
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| Calendario vacunal: esquema base | Perú (MINSA): **BCG y VHB al nacer**, pentavalente 2-4-6 m, rotavirus, neumococo 2-4-12, SPR 12 m, varicela 12 m, VPH niñas/niños, sin MenB sistemática (A VERIFICAR (12-sep)) · USA (ACIP): hexavalente-like 2-4-6 m, VHB al nacer | **Calendario común CISNS**: **NO BCG sistemática**; hexavalente **2-4-11 meses (pauta 2+1)**; VHB en la hexavalente (+ dosis al nacer solo si madre AgHBs+); neumococo conjugada 2-4-11; **MenB 2-4-12 m**; MenC/MenACWY 4 m, 12 m y **12 años (MenACWY)**; triple vírica 12 m y 3-4 años; varicela 15 m y 3-4 años; **VPH 12 años ambos sexos**; gripe 6-59 meses; rotavirus y nirsevimab (VRS) incorporados en 2023-2025 — **A VERIFICAR (12-sep) cada dosis y el año de la última actualización en la página del Ministerio antes de usarlo en un APEX** | Ministerio de Sanidad · Vacunas y Programa de Vacunación (verificado; año del calendario A VERIFICAR) · calendario AEP (**A VERIFICAR (12-sep)**, 403) | 570779c9f4d68bf008dbc817 |
| Cribado neonatal (prueba del talón) | Perú: tamizaje neonatal (TSH, 17-OHP, PKU…) según NTS (A VERIFICAR (12-sep)) · USA: RUSP ≥35 enfermedades | **Cartera común**: hipotiroidismo congénito, fenilcetonuria, fibrosis quística, MCADD, LCHADD, acidemia glutárica I, anemia falciforme (+ ampliaciones 2022-2024: biotinidasa, MSUD, homocistinuria… **A VERIFICAR (12-sep)** la lista vigente); cribado auditivo universal | RD 1030/2006 (verificado) · Orden SCB/480/2019 (verificado) | 570779c9f4d68bf008dbc815 |
| Recién nacido: profilaxis | igual (vitamina K IM, profilaxis ocular) | igual; VHB al nacer solo en hijo de madre AgHBs+ (Ig + vacuna) | calendario CISNS (verificado) | 570779c9f4d68bf008dbc815 |
| Lactancia y alimentación complementaria | AAP | AEP: lactancia exclusiva 6 meses, complementaria desde los 6; cereales con gluten entre 4-12 meses (**A VERIFICAR (12-sep)**) | AEP — **A VERIFICAR (12-sep)** (403) | 570779c9f4d68bf008dbc84f |
| Fármacos pediátricos de uso corriente | acetaminophen / ibuprofen genéricos | **Apiretal®** (paracetamol), **Dalsy®** (ibuprofeno) aparecen en viñetas | uso corriente | 570779c9f4d68bf008dbc7b9 |

## 14. Psiquiatría (num 26 · D74-D76) — delta legal/terminológico
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| Internamiento involuntario | Perú: Ley 30947 · USA: por estado | Art. 763 LEC: autorización judicial previa o ratificación en 24 h si urgente — **A VERIFICAR (12-sep)** | Ley 1/2000 (LEC) — **A VERIFICAR (12-sep)** | 570779c9f4d68bf008dbc777 |
| Clasificación | DSM-5-TR | El MIR usa **DSM-5** y **CIE-10/CIE-11** indistintamente; "trastornos neuróticos" es nomenclatura CIE | ProMIR (capítulo) | 570779c9f4d68bf008dbc865 |
| Suicidio: prevención | — | Código 024 (línea de atención a la conducta suicida, 2022) — **A VERIFICAR (12-sep)** | Ministerio — **A VERIFICAR (12-sep)** | 570779c9f4d68bf008dbc889 |

## 15. Dermatología (num 5 · franja 13:30, 10Q MIR-Derma) — delta bajo
| Ítem | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|
| Melanoma: cribado | USPSTF I · Perú: campañas | Sin cribado poblacional; campañas AEDV (Euromelanoma) — **A VERIFICAR (12-sep)** | AEDV — **A VERIFICAR (12-sep)** | — |
| Fotografía clínica y consentimiento | HIPAA | Ley 41/2002 + LO 3/2018 (imagen = dato de salud) | Ley 41/2002 · LO 3/2018 (verificados) | — |
| Lepra / leishmaniasis | Perú: endémicas (ventaja) | Leishmaniasis cutánea autóctona (mediterránea, *L. infantum*); lepra importada → EDO | RD 2210/1995 (verificado) | — |
| Terminología | "eczema", "acné" iguales | "eccema", "psoriasis", "dermatitis atópica" iguales; nombres comerciales de biológicos iguales | — | — |

## 16. Transversal · unidades y nombres comerciales (viñetas MIR)
| Ítem | Perú/USA | España | Nota |
|---|---|---|---|
| Unidades | mg/dL, g/dL, °C | **iguales** (mg/dL, g/dL, °C) — no confundir con mmol/L del Reino Unido | — |
| Metamizol | USA: no comercializado · Perú: uso corriente | **Nolotil®**: uso muy corriente (viñetas de dolor/fiebre); riesgo de agranulocitosis | uso corriente |
| Amoxicilina-clavulánico | Augmentin | **Augmentine®** | uso corriente |
| Metilprednisolona / metoclopramida | Solu-Medrol / Reglan | **Urbason®** / **Primperan®** | uso corriente |
| Paracetamol / ibuprofeno pediátricos | genéricos | **Apiretal®** / **Dalsy®** | uso corriente |
| AAS antiagregante | 81 mg | **Adiro® 100 mg** | uso corriente |
| Acenocumarol | warfarina | **Sintrom®** | uso corriente |
| "Atención Primaria" | *primary care* / MINSA nivel I | **Médico de familia (MFyC)**, centro de salud, derivación a especializada; el MIR pregunta "actitud más adecuada" desde AP | organización SNS (Ley 14/1986, verificada) |

---

## Volcado del log (entradas `delta_es:true`) — filas por completar
Generado por `node DATA/_scripts/gen_delta_espana.js [export.json] --write` a partir del botón **⤓ Exportar log JSON** de HOY
(por defecto lee `DATA/MIR/mir_eval_log_export.json`). Cada fila lleva el id de la entrada (idempotente: no se duplica).
Completa las columnas "manejo España" y "fuente" y, si el ítem es estable, súbelo a la tabla de su asignatura.
**Un mismo capId con ≥2 entradas delta = delta repetido → APEX obligatorio con fuente verificada (objetivo: 0 en el mantenimiento).**

<!-- DELTA_LOG:INICIO -->
| Fecha · D · kind | Asignatura → tema | Ítem (completar) | Manejo Perú/USA | Manejo España | Fuente oficial española | capId |
|---|---|---|---|---|---|---|
<!-- DELTA_LOG:FIN -->
