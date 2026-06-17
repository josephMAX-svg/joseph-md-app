# Calidad Research — síntesis (17-jun-2026)

El estado del arte de la investigacion clinica/biomedica de elite tiene un nucleo gratuito muy maduro a 2025-2026 que cubre todo el ciclo de research, y casi todo lo TOP es en ingles (gap de idioma, no bloqueante para tu perfil USMLE/MIR bilingue). Se organiza en 6 capas:

1) METODOLOGIA Y DISENO. Tres autoridades mundiales gratis: Frank Harrell (hbiostat.org/BBR, actualizado mayo 2026; metodos modernos: no-parametricos, bayesianos, NO categorizar variables continuas, NO abusar de p-values), Hernan & Robins ("Causal Inference: What If", actualizado 21-nov-2025, con codigo R/Python/Stata) para inferencia causal, y EQUATOR Network como base definitiva de guias de reporte (CONSORT 2025, STROBE, PRISMA, SPIRIT). El metodo de FRONTERA 2024-2025 es Target Trial Emulation (TTE) para causalidad con datos observacionales, ya con guia de reporte propia (TARGET Statement 2025, JAMA).

2) BIOESTADISTICA CON CODIGO. Ecosistema bookdown/Quarto gratis y vigente: "R for Data Science 2e" (base tidyverse), "The Epidemiologist R Handbook" (lo mas aplicable a datos de salud), gtsummary (estandar para Table 1 publication-ready), ISLP (statistical learning en Python). Para intuicion: StatQuest y Biostatsquid (video). Andrew Heiss para inferencia causal aplicada con R (DAGs, diff-in-diff, RDD, IV).

3) REVISIONES SISTEMATICAS / META-ANALISIS. Cochrane Handbook v6.5 (ago 2024, acceso abierto), PRISMA 2020 + E&E, PROSPERO (preregistro obligatorio), herramientas de sesgo (RoB 2, ROBINS-I v2, AMSTAR-2, GRADE), Rayyan (cribado IA gratis) y metafor (meta-analisis en R, estandar de oro libre).

4) ESCRITURA Y PUBLICACION. Stanford "Writing in the Sciences" (Sainani, auditable gratis, el #1 mundial), Academic Phrasebank (Manchester, plantillas de frases por seccion), "Ten Simple Rules for Structuring Papers" (lectura corta de altisimo ROI), AuthorAID (mentoria 1-a-1 para LatAm).

5) HERRAMIENTAS MODERNAS / IA. OpenAlex (catalogo abierto, 250M+ obras, CC0), PubMed E-utilities, Semantic Scholar, Zotero (gestor de referencias ganador gratis), ResearchRabbit (mapas de citas), Elicit/Consensus (asistentes IA con free tier). GAP CRITICO: los LLM fabrican ~36% de citas y los sistemas RAG aun 3-13% de URLs falsas; ninguna cita generada por IA entra al plan sin verificacion manual de DOI/PMID en la fuente primaria.

6) CIENCIA ABIERTA (capa mas olvidada en planes tipicos). OSF (preregistro + reproducibilidad), Zenodo (DOIs para datos/codigo desde el dia 1), ORCID, control de versiones Git/GitHub.

PARA SYNAPSE (objetivo: programador/AI engineer nivel TOP): el solapamiento es alto y estrategico. Harrell (R/Quarto reproducible), ISLP (statistical/machine learning en Python), Andrew Heiss (causal inference con codigo), Scientific Python Lectures y los pipelines reproducibles (Git, renv/targets, Zenodo) son exactamente el puente entre Research y AI engineering: dominar statistical learning + inferencia causal + flujo reproducible es lo que separa a un AI engineer de elite de uno que solo llama APIs.

GAPS PRINCIPALES a cerrar en el plan: (a) practica guiada con datasets clinicos reales (MIMIC, NHANES); (b) power analysis / tamano muestral (G*Power, pwr); (c) bioestadistica bayesiana (Statistical Rethinking de McElreath); (d) preregistro y estrategia de busqueda reproducible (queries booleanas + MeSH guardadas); (e) verificacion obligatoria de citas IA; (f) recursos de elite en espanol (escasos).

## Referentes top
- Frank E. Harrell Jr. (Vanderbilt)
- Miguel Hernan & James Robins (Harvard)
- Kristin Sainani (Stanford)
- EQUATOR Network (Oxford)
- Cochrane (Higgins, Thomas et al.)
- Josh Starmer (StatQuest)
- Andrew Heiss (Georgia State)
- Hadley Wickham (Posit)

## Recursos top (verificados)
- **Causal Inference: What If — Hernan & Robins** — Miguel A. Hernan & James M. Robins (Harvard T.H. Chan) (avanzado, verificado)
  - https://miguelhernan.org/whatifbook
  - EL libro de inferencia causal, gratis en PDF, actualizado 21-nov-2025. Codigo en R/Python/Stata/SAS/Julia + datos. DAGs, IPW, g-formula, variables instrumentales y target trial emulation (frontera observacional 2024-2025). Doblemente estrategico: metodologia de elite Y puente directo a AI engineering para Synapse.
- **Biostatistics for Biomedical Research (BBR) + hbiostat.org — Frank Harrell** — Frank E. Harrell Jr. (Vanderbilt) (intermedio-avanzado, verificado)
  - https://hbiostat.org/bbr/
  - Libro gratis (GPL-3.0) del referente #1 mundial, actualizado MAYO 2026 con seccion nueva de errores de diseno y planes bayesianos. El portal aloja tambien R Workflow (flujo reproducible con R/Quarto) y plantillas de scripts. Base metodologica y de reproducibilidad nivel elite.
- **EQUATOR Network — Reporting guidelines (CONSORT 2025, STROBE, PRISMA, SPIRIT)** — EQUATOR Network (UK EQUATOR Centre, Oxford) (todos los niveles, verificado)
  - https://www.equator-network.org/reporting-guidelines/
  - Base definitiva y gratuita de >250 guias de reporte por tipo de estudio, con checklists. Las revistas top (NEJM, Lancet, JAMA, BMJ) las EXIGEN. CONSORT 2025 vigente. Regla de oro: elegir la guia segun el tipo de estudio ANTES de escribir.
- **Cochrane Handbook for Systematic Reviews v6.5 (acceso abierto)** — Cochrane (Higgins, Thomas et al.) (avanzado, verificado)
  - https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current
  - La biblia metodologica de las revisiones sistematicas. v6.5 (ago 2024) con capitulos nuevos sobre network meta-analysis, sintesis narrativa, equidad y automatizacion. Acceso abierto online confirmado.
- **PRISMA 2020 — statement + explanation & elaboration** — PRISMA Group / EQUATOR Network (intermedio, verificado)
  - https://www.prisma-statement.org/
  - Estandar de facto exigido por casi todas las revistas para reportar revisiones sistematicas y meta-analisis. Checklist de 27 items + diagramas de flujo descargables gratis. El E&E (PMC8005925) explica cada item con ejemplos reales.
- **The Epidemiologist R Handbook** — Applied Epi (ONG) (intermedio, verificado)
  - https://www.epirhandbook.com/en/
  - El recurso practico mas usado (+3M usos, CC BY-NC-SA) para datos de salud en R: gestion de datos, supervivencia, brotes, reportes. Directamente aplicable a investigacion clinica y a montar un pipeline reproducible.
- **gtsummary — tablas publication-ready para revistas medicas** — Daniel D. Sjoberg et al. (intermedio, verificado)
  - https://www.danieldsjoberg.com/gtsummary/
  - Estandar para Table 1 y tablas de regresion listas para publicar en revistas clinicas. Documentacion/vignettes gratis, integracion ARD 2025. Imprescindible para que tus papers se vean nivel revista de alto impacto.
- **An Introduction to Statistical Learning with Python (ISLP)** — James, Witten, Hastie, Tibshirani, Taylor (intermedio-avanzado, verificado)
  - https://www.statlearning.com/
  - PDF gratis (ediciones R y Python). Statistical/machine learning: regresion, clasificacion, validacion, arboles, SVM. Edicion Python con paquete ISLP. Referencia clave compartida entre Research y Synapse (AI engineer): base de ML estadistico riguroso.
- **Program Evaluation & Causal Inference con R — Andrew Heiss** — Andrew Heiss (intermedio-avanzado, verificado)
  - https://evalsp25.classes.andrewheiss.com/
  - Curso de posgrado completo y gratis (Georgia State): DAGs, diff-in-diff, RDD, variables instrumentales, todo con R. Une diseno de estudios, inferencia causal y codigo: el puente perfecto Research <-> AI engineering para Synapse.
- **Writing in the Sciences (Stanford) — Kristin Sainani** — Dra. Kristin Sainani — Stanford University (principiante-intermedio, verificado)
  - https://www.coursera.org/learn/sciwrite
  - El curso de escritura cientifica mas reconocido del mundo, auditable GRATIS. Cubre todo el ciclo: principios de escritura clara, estructura del manuscrito, metodos/resultados, peer review, etica y como evitar revistas depredadoras. 4.9/5 con ~10.000 resenas. Punto de partida #1 para publicar.
- **Academic Phrasebank (University of Manchester)** — University of Manchester (todos los niveles, verificado)
  - https://www.phrasebank.manchester.ac.uk/
  - Cientos de plantillas de frases academicas organizadas por seccion del paper (intro, metodos, resultados, discusion, conclusiones). Gratis online + PDF. Indispensable para escribir en ingles a nivel publicacion siendo no-nativo.
- **Ten Simple Rules for Structuring Papers (Mensh & Kording)** — Brett Mensh & Konrad Kording — PLOS Computational Biology (intermedio, verificado)
  - https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005619
  - El mejor articulo CORTO (~30 min) sobre como estructurar un paper para que editores y reviewers entiendan tu contribucion. Open access, altisimo retorno. Lectura obligatoria antes de tu primer manuscrito serio. Parte de la coleccion 'Ten Simple Rules' de PLOS.
- **NIH IPPCR — Introduction to the Principles and Practice of Clinical Research** — NIH OCRECO (principiante-intermedio, verificado)
  - https://ocreco.od.nih.gov/courses/ippcr.html
  - Estandar de oro gratuito del NIH (registro 2025-2026 abierto). Lectures grabadas + foro. Curriculo completo de investigacion clinica: diseno de estudios, medicion y estadistica, etica/regulatorio, protocolos y comunicacion de resultados.
- **Zotero — gestor de referencias gratis y open-source** — Corporation for Digital Scholarship (principiante, verificado)
  - https://www.zotero.org/
  - Mejor opcion gratis: referencias ilimitadas, 7.000+ estilos, integracion Word/LibreOffice/Google Docs, captura web de un clic, conecta con ResearchRabbit y OSF. Pilar del stack moderno frente a Mendeley en declive.
- **OpenAlex — catalogo abierto de literatura cientifica + API** — OurResearch / OpenAlex (intermedio, verificado)
  - https://openalex.org
  - Reemplazo abierto de Microsoft Academic/Scopus: ~250M obras, CC0, base del Leiden Ranking 2025. API programable (ideal para Synapse: pipelines de literatura). Verificar pricing/API key gratis en developers.openalex.org antes de automatizar.
- **Rayyan — cribado colaborativo de revisiones sistematicas con IA** — Rayyan Systems / QCRI (intermedio, estable)
  - https://www.rayyan.ai/
  - Mejor opcion gratuita para cribar titulos/resumenes en equipo: deduplicacion, predicciones de relevancia con IA, cribado ciego entre revisores, diagrama PRISMA. Cubre el gap de cribar a mano en Excel. Nota: algunas funciones IA son de pago, el cribado core sigue gratis.
- **metafor — paquete de R para meta-analisis** — Wolfgang Viechtbauer (avanzado, verificado)
  - https://www.metafor-project.org/
  - Estandar de oro libre para meta-analisis reproducible: efectos fijos/aleatorios/mixtos, meta-regresion, forest/funnel/Baujat plots. 2.1M+ descargas. Para no-programadores: JASP o jamovi (modulo MAJOR) lo usan por detras.
- **OSF (Open Science Framework) — ciclo completo de research** — Center for Open Science (intermedio, verificado)
  - https://www.cos.io/products/osf
  - Gratis. Preregistro de hipotesis/protocolo (evita HARKing/p-hacking), gestion de datos, colaboracion, DOIs y conexion a GitHub/Zotero/ORCID. Cubre el gap de preregistro y reproducibilidad que casi ningun plan incluye.
- **StatQuest with Josh Starmer (YouTube)** — Josh Starmer (principiante-intermedio, verificado)
  - https://www.youtube.com/c/joshstarmer
  - El mejor canal gratuito para intuicion visual de estadistica y machine learning (p-valores, regresion, PCA, redes neuronales). Ideal para entender el 'por que' antes de codificar. Doble uso Research + Synapse (AI engineer).
- **riskofbias.info — RoB 2, ROBINS-I v2 + AMSTAR-2 / GRADE** — Cochrane Bias Methods Group (avanzado, verificado)
  - https://www.riskofbias.info/
  - Hub oficial de las herramientas de referencia para riesgo de sesgo: RoB 2 (ensayos, plantilla Excel) y ROBINS-I v2 (no aleatorizados, actualizado 2025 con algoritmos de juicio). Combinar con AMSTAR-2 (amstar.ca, calidad de RS) y GRADEpro (certeza de la evidencia).

## Acciones
- [ ] FUNDAMENTO (semanas 1-4): empezar 'Writing in the Sciences' de Stanford (audit gratis) en paralelo con 'R for Data Science 2e' + The Epidemiologist R Handbook. Meta: poder leer/escribir un paper y manipular datos de salud en R. Anclar al bloque diario de Research del Calendar.
- [ ] METODOLOGIA DE ELITE (semanas 5-10): trabajar BBR de Harrell + 'Causal Inference: What If' (Hernan/Robins) con su codigo. Esto es lo que eleva el plan a TOP: metodos modernos, inferencia causal y Target Trial Emulation. Reforzar intuicion con StatQuest cuando un concepto cueste.
- [ ] GUIAS DE REPORTE COMO CHECKLIST VIVO: descargar de EQUATOR la guia que aplique a cada estudio (CONSORT 2025 ensayos, STROBE observacionales, PRISMA revisiones) y aplicarla DESDE el diseno, no al final. Tener gtsummary configurado para generar la Table 1 publication-ready.
- [ ] MONTAR EL STACK MODERNO YA: instalar Zotero (gestor), conectar OSF + ORCID, crear repo Git/GitHub para manuscrito y codigo de analisis. Definir flujo reproducible con R/Quarto (R Workflow de Harrell) o Python. Esto cierra la capa de ciencia abierta que casi todos olvidan.
- [ ] PROTOCOLO ANTI-ALUCINACION DE CITAS (regla fija del plan): toda cita generada por Elicit/Consensus/SciSpace/cualquier LLM se verifica manualmente por DOI/PMID en la fuente primaria (PubMed/OpenAlex) antes de entrar al plan. Los LLM fabrican ~36% de citas; RAG aun 3-13%.
- [ ] PREREGISTRO + BUSQUEDA REPRODUCIBLE: antes de recoger datos, registrar hipotesis y protocolo en OSF Registrations (PROSPERO si es revision sistematica). Guardar siempre las queries booleanas + terminos MeSH + fecha, no solo los resultados, para poder re-correr y auditar.
- [ ] PIPELINE DE REVISION SISTEMATICA: registrar en PROSPERO, cribar en Rayyan (no en Excel), evaluar sesgo con RoB 2 / ROBINS-I v2 / AMSTAR-2, certeza con GRADE, meta-analisis con metafor (o JASP/jamovi sin codigo). Curso introductorio: Johns Hopkins en Coursera (audit gratis).
- [ ] PUENTE RESEARCH -> SYNAPSE (AI engineer TOP): tratar ISLP (statistical learning en Python), el curso de Andrew Heiss (causal inference con codigo) y los pipelines reproducibles como temas COMPARTIDOS entre ambas secciones. Dominar statistical learning + inferencia causal + flujo reproducible/Git es lo que separa a un AI engineer de elite del que solo llama APIs.
- [ ] PUBLICACION: tener a mano Academic Phrasebank (Manchester) al escribir y leer 'Ten Simple Rules for Structuring Papers' antes del primer manuscrito. Considerar mentoria 1-a-1 gratuita de AuthorAID (disenada para LatAm) para revision de tu primer paper.
- [ ] CERRAR GAPS PENDIENTES en futuras tandas: (a) datasets clinicos abiertos para practica guiada (MIMIC, NHANES); (b) power analysis / tamano muestral (G*Power, paquetes pwr/WebPower); (c) bioestadistica bayesiana (Statistical Rethinking de McElreath, lecturas en YouTube gratis); (d) buscar el unico equivalente de elite en espanol que falta (statsthinking21 tiene version ES como base general).
