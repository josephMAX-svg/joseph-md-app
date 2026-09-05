# DENSA ACADEMIA — esqueleto curricular (salud capilar médica: alopecia androgenética · efluvio telógeno · minoxidil oral · PRP)

> **Estado: ESQUELETO sin días (5-sep-2026).** Arranca en **febrero-2027** (Fase 2 del roadmap, post-Step 1).
> En la última semana de enero se convierte en `DATA/BUSINESS/densa_curriculum.json` y se genera el plan de
> 90 días con `node DATA/_scripts/gen_liviano_plan.js <fecha>` (mismo motor que LIVIANO Academia: 25' estudio
> + 20' aplicación, casos en viernes, rúbrica de 4 ítems, drills ciegos, tarjetas de mecanismo).
> Regla anti-alucinación: toda cifra marcada **A VERIFICAR** se lee en la fuente primaria antes de entrar a un
> caso, a una tarjeta o a contenido. DENSA es cross-sell de LIVIANO ("Bono DENSA (capilar) S/ 150" en
> `LIVIANO_OFERTA`) y hermana de NÍTIDA (fusionada con Derma): el bloque Derma (13:30-14:15 alterno) ya cubre
> tricología dermatológica; DENSA es la **línea de servicio**, no un segundo curso de dermatología.

---

## Objetivo de la línea

Que el médico DENSA pueda **(1)** distinguir en consulta alopecia androgenética (AGA/FPHL), efluvio telógeno y
las alopecias que hay que **derivar** (cicatriciales, areata extensa, lesiones de cuero cabelludo), **(2)**
prescribir y monitorizar los tratamientos con evidencia (minoxidil tópico y oral a dosis baja, finasterida/
dutasterida, antiandrógenos en mujer, PRP como complemento) con consentimiento informado y sin promesas, y
**(3)** explicarle al paciente qué esperar en 6-12 meses con fotos estandarizadas, no con "antes/después" de
marketing (CMP Art. 75).

**KPI de aprendizaje (Palmerton)**: ≥ 80 % en drills ciegos + rúbrica de caso ≥ 6/8 en los últimos 4 viernes.
**KPI de negocio**: conversión consulta→programa y retención a 6 meses (el tratamiento capilar es crónico: si se
suspende, se pierde lo ganado en 3-4 meses según AAD).

---

## Los 6 módulos

| # | Módulo | Núcleo | Aplicación (20') |
|---|--------|--------|------------------|
| 1 | **Ciclo del pelo y fisiopatología de la AGA/FPHL** | anágeno-catágeno-telógeno, miniaturización folicular, DHT y 5α-reductasa, patrón Hamilton-Norwood / Ludwig-Sinclair, tricoscopia básica | metáfora del paciente + tarjeta de mecanismo |
| 2 | **Efluvio telógeno y diagnóstico diferencial** | gatillo ~3 meses antes (1-6), causas (posparto, fiebre, dieta hipocalórica/baja en proteína — **conexión LIVIANO/GLP-1**, fármacos, hipotiroidismo, ferropenia), pull test, ferritina/TSH, curso autolimitado | caso: paciente LIVIANO con caída a los 3 meses de bajar peso |
| 3 | **Minoxidil tópico y oral a dosis baja** | tópico 2 %/5 % (6-12 meses, shedding inicial, evitar en embarazo); **oral off-label**: dosis, hipertricosis 15 %, efectos sistémicos ~1-2 %, contraindicaciones, seguimiento de PA/FC | caso: mujer que no tolera el tópico |
| 4 | **Antiandrógenos: finasterida, dutasterida, espironolactona** | indicación por sexo, dosis (**A VERIFICAR** por guía), efectos sexuales y su comunicación honesta, teratogenicidad, no en mujer en edad fértil sin anticoncepción | caso: varón 28 a con miedo a los efectos sexuales |
| 5 | **PRP, láser de baja potencia, trasplante: evidencia y lugar** | PRP: sube densidad (meta-análisis 2024: +27,55 pelos/cm²) pero evidencia de baja calidad, alta heterogeneidad y sesgo de publicación → complemento, no base; láser "promisorio" (AAD); trasplante = derivación | caso: paciente que pide "solo PRP" |
| 6 | **Derivación, límites, fotos estandarizadas y ética** | cicatriciales, areata extensa, lesiones sospechosas, niños → dermatología; protocolo de fotos (misma luz/ángulo/peinado) como métrica; consentimiento de off-label; publicidad sin testimonios | caso integral + guion de consulta |

---

## 3 esqueletos curriculares candidatos (fuentes verificadas 5-sep-2026)

### A · Guía europea S3 de alopecia androgenética (EDF)
- **Kanti V, Messenger A, Dobos G, et al. Evidence-based (S3) guideline for the treatment of androgenetic
  alopecia in women and in men – short version.** *J Eur Acad Dermatol Venereol* 2018;32(1):11-22, DOI
  10.1111/jdv.14624 — existencia y cita verificadas por búsqueda (Wiley y PubMed devolvieron 403/cookie-wall al
  fetch automático; **leer el PDF en enero**): https://onlinelibrary.wiley.com/doi/10.1111/jdv.14624
- Complemento en español (encontrado por búsqueda, **A VERIFICAR** contenido): *Recommendations on the Clinical
  Management of Androgenetic Alopecia: A Consensus Statement From the Spanish Hair Disorders Group (AEDV)*,
  Actas Dermo-Sifiliográficas 2024: https://www.sciencedirect.com/science/article/pii/S0001731024000887
- Uso: columna vertebral de los módulos 1, 3, 4 (fuerza de recomendación por fármaco y sexo — **A VERIFICAR** al
  leer la guía; no se afirman aquí las concentraciones ni dosis recomendadas).

### B · AAD (American Academy of Dermatology) — páginas clínicas para paciente y médico
- **AAD — "Thinning hair and hair loss: Could it be female pattern hair loss?"** (leído 5-sep):
  https://www.aad.org/public/diseases/hair-loss/types/female-pattern — minoxidil 2 %/5 % como opción más
  recomendada, resultados en 6-12 meses, shedding transitorio inicial, **evitar en embarazo**; espironolactona,
  finasterida, dutasterida y flutamida **off-label** (6-12 meses para evaluar; teratógenos); PRP y láser de baja
  potencia "promisorios pero requieren uso continuo"; células madre = experimental; trasplante en candidatas;
  **el beneficio cesa al suspender (reversión en 3-4 meses)**.
- Página masculina de la AAD: el fetch automático devolvió 404 → **A VERIFICAR** la URL vigente en aad.org.
- Uso: lenguaje de paciente, expectativas y cautelas; base de las metáforas y del consentimiento.

### C · Minoxidil oral a dosis baja + efluvio telógeno + PRP (evidencia reciente, acceso abierto)
- **Vañó-Galván S, Pirmez R, Hermosa-Gelbard A, et al. Safety of low-dose oral minoxidil for hair loss: a
  multicenter study of 1404 patients.** *J Am Acad Dermatol* 2021;84(6):1644-1651 (cita y cifras verificadas por
  búsqueda; PubMed con cookie-wall): 943 mujeres / 461 varones, edad media 43; **hipertricosis 15,1 %** (retiro
  0,5 %); mareo 1,7 %, retención de líquidos 1,3 %, taquicardia 0,9 %, cefalea 0,4 %, edema periorbitario 0,3 %,
  insomnio 0,2 %; discontinuación por efectos sistémicos 1,2 %. https://pubmed.ncbi.nlm.nih.gov/33639244/
- **Gupta AK et al. Low-Dose Oral Minoxidil for Alopecia: A Comprehensive Review.** *Skin Appendage Disord*
  2023 (leído 5-sep): https://pmc.ncbi.nlm.nih.gov/articles/PMC10806356/ — varones AGA 1-5 mg/día (inicio
  1-2 mg), mujeres FPHL 0,5-1 mg/día (estudios 0,25-1,25), máximo 5 mg; hipertricosis dosis-dependiente (28,9 %
  a 0,25-0,75 mg → 86,8 % a 2,5-5 mg), síntomas cardiovasculares 4 % → 34,2 %; contraindicaciones: arritmias,
  enfermedad renal, feocromocitoma, embarazo (cat. C), lactancia; cautela con PA baja o antihipertensivos;
  **sin aprobación FDA para alopecia (off-label)**.
- **Hughes EC, Syed HA, Saleh D. Telogen Effluvium.** StatPearls, actualizado 1-may-2024 (leído 5-sep):
  https://www.ncbi.nlm.nih.gov/books/NBK430848/ — gatillo ~3 meses antes (1-6), causas (posparto, fiebre,
  dieta hipocalórica/baja en proteína, β-bloqueantes, retinoides, anticoagulantes, hipotiroidismo, ferropenia),
  pull test positivo en fase aguda, ferritina/saturación, TSH, biopsia si duda (25-50 % de folículos en telógeno);
  autolimitado, recuperación en meses a 1 año; tratar la causa + reaseguro; minoxidil tópico/oral opcional.
- **Kieling L et al. Is autologous platelet-rich plasma capable of increasing hair density in patients with
  androgenic alopecia? A systematic review and meta-analysis of randomized clinical trials.** *An Bras Dermatol*
  2024 (leído 5-sep): https://pmc.ncbi.nlm.nih.gov/articles/PMC11551241/ — 14 ECA (13 en meta-análisis), 431
  participantes; **+27,55 pelos/cm² (IC 95 % 14,04-41,06)** vs placebo; **I² = 95,99 %** y sesgo de publicación
  evidente; conclusión: eficaz para densidad pero **evidencia de baja calidad**. Complemento (por búsqueda):
  Zhang X et al., *J Cutan Med Surg* 2023, 9 ECA/238 pacientes, densidad ↑ a 3 y 6 meses vs placebo, sin efectos
  adversos graves: https://pubmed.ncbi.nlm.nih.gov/37533146/

---

## Cifras ancla (para drills ciegos)

| Cifra | Valor | Fuente | Estado |
|-------|-------|--------|--------|
| Latencia del efluvio telógeno | ~3 meses (1-6) tras el gatillo | StatPearls 2024 | leído |
| Biopsia diagnóstica de ET | 25-50 % de folículos en telógeno | StatPearls 2024 | leído |
| Tiempo para evaluar minoxidil tópico | 6-12 meses | AAD | leído |
| Reversión al suspender | 3-4 meses | AAD | leído |
| Hipertricosis con minoxidil oral (serie 1404) | 15,1 % (retiro 0,5 %) | Vañó-Galván 2021 | verificado por búsqueda |
| Efectos sistémicos que llevan a suspender | 1,2 % | Vañó-Galván 2021 | verificado por búsqueda |
| Dosis LDOM varón / mujer | 1-5 mg/día · 0,5-1 mg/día (máx 5) | Gupta 2023 | leído |
| PRP: ganancia de densidad | +27,55 pelos/cm² (I² 96 %) | Kieling 2024 | leído |
| Finasterida 1 mg: eficacia y efectos sexuales (%) | **A VERIFICAR** | S3 EDF 2018 | pendiente |
| Dutasterida vs finasterida (recuento de pelos) | **A VERIFICAR** | S3 EDF 2018 | pendiente |
| Ferritina objetivo en caída capilar | **A VERIFICAR** (umbral discutido) | revisión | pendiente |
| Registro DIGEMID y precio en Perú: minoxidil oral, finasterida, dutasterida | **A VERIFICAR** (misma regla que LIVIANO_ACCESO_PERU) | DIGEMID | pendiente |

---

## Límites de competencia y derivación (gatillos escritos)

- **Deriva a dermatología**: alopecia cicatricial (placas lisas sin ostium, liquen planopilar, foliculitis
  decalvante), alopecia areata extensa/universal, lesiones o tumores de cuero cabelludo, alopecia en niños,
  caída con signos sistémicos (lupus, sífilis — **A VERIFICAR** cribado), falta de respuesta a 12 meses bien hechos.
- **Deriva a endocrinología/ginecología**: hiperandrogenismo clínico (hirsutismo, acné severo, irregularidad
  menstrual → SOP), hipotiroidismo no controlado.
- **Deriva a cirugía capilar**: candidato a trasplante (zona donante suficiente, expectativa realista) — DENSA
  prepara y acompaña, no opera.
- **No se hace en DENSA**: "tratamientos capilares" sin diagnóstico, PRP como monoterapia vendida por paquete,
  antiandrógenos en mujer fértil sin anticoncepción, antes/después en publicidad (CMP Art. 75), promesas de
  recuperación (CMP Art. 73), fórmulas magistrales sin registro.
- **Regla LIVIANO→DENSA**: la caída capilar a los 2-4 meses de una pérdida de peso rápida (GLP-1, dieta
  hipocalórica) suele ser **efluvio telógeno**: revisar proteína (1,2-1,6 g/kg del estándar LIVIANO), ferritina y
  TSH antes de "tratar el pelo".

## Metáforas de paciente (a ensayar en los 20')

- **El campo y la estación** (ciclo del pelo): "cada pelo tiene su temporada; el efluvio es cuando muchos entran en
  otoño a la vez tras un susto del cuerpo (fiebre, dieta, parto); vuelven en primavera, 3-6 meses después".
- **La planta miniaturizada** (AGA): "la hormona no arranca el pelo, lo encoge poco a poco; el tratamiento no
  'siembra' pelo nuevo, frena el encogimiento y engorda lo que hay".
- **El riego que no se puede cerrar** (crónico): "minoxidil es riego, no semilla: si cierras la llave, en 3-4 meses
  el jardín vuelve a como estaba".
- **La foto, no el espejo**: "el espejo miente cada día; la foto con la misma luz cada 3 meses no".
- **PRP es abono, no terreno**: "ayuda a la densidad en varios estudios, pero la evidencia es de baja calidad y
  no reemplaza al tratamiento de base".

## Ruta de credencial (a verificar en enero)

- Cursos de tricología: **ISHRS** (International Society of Hair Restoration Surgery) — programas para médicos no
  cirujanos (**A VERIFICAR**); **Ibero-Latin American College of Dermatology (CILAD)** cursos de tricología
  (**A VERIFICAR**); diplomados de tricología en universidades peruanas/latinoamericanas (**A VERIFICAR**).
- Interno: DENSA se apoya en la línea Derma del sistema (NotebookLM "DERMA · Élite Engine") para la parte
  dermatológica; el médico DENSA no reemplaza al dermatólogo.

## Enlace con el resto del sistema

- LIVIANO_OFERTA: "Bono DENSA (capilar) S/ 150" (cross-sell) — el bono se define cuando exista el protocolo v0.
- Plan Business v3 L: no hay filas capilares (correcto: es Fase 2); el OUTPUT S13 (tabla libro vs evidencia) sirve
  de plantilla para los módulos 3-5.
- AURUM: reutilizar la variante LIVIANO (venta ética, cierre = compromiso medible con fotos y fecha, no cifra).
- Derma (13:30-14:15 alterno): compartir tarjetas de mecanismo de tricología; no duplicar.
