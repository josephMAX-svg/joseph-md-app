/**
 * researchDailyPlan.ts — Plan DÍA A DÍA de Research · CICLO 1 (v5.6 · 3 pistas alineadas con RUTA_PUBLICACION_2027).
 * GENERADO por DATA/_scripts/gen_research_plan.js (2026-09-05) — NO editar a mano: `node DATA/_scripts/gen_research_plan.js [YYYY-MM-DD]`
 *
 * 42 átomos · D1 = Mar 2026-09-08 → D42 = Mié 2027-02-03 · 1 átomo por DÍA-RESEARCH
 * (interdiario con Derma: researchData.ts → diaEstudioTipo · sáb+dom libres · salta 25-dic/31-dic/1-ene ·
 * PAUSA 2027-01-04 → 2027-01-29 = 0 átomos, Step 1). d1-d40 caben antes de la pausa (último: 2026-12-29);
 * d41-d42 son los 2 primeros días-Research tras la pausa (SUBMIT del case report + re-arranque) — el total 42 es
 * el invariante que remap_inicio.js comprueba. El bloque del Calendar 13:30–14:15 NO se toca.
 *
 * Pistas del ciclo 1: R0 infra + cimientos (PICO · diseños · PICO de SR-1) · M1-M3 mentores (Ciro · Rising Scholars ·
 * Finlay) · C carta al editor (6 átomos, sep-oct) · T tesis L0 → research letter (8 átomos, oct-nov) · CR case report #1
 * (8 átomos oct-dic + CR-9 submit tras la pausa) · X cierre y prep de SR-1. El ciclo 2 (SR-1 PROSPERO→submit) vive en
 * researchDailyPlan2027.ts. Fuente única y doc: DATA/_scripts/gen_research_plan.js · DATA/RESEARCH/daily-plan.md.
 * Cada átomo deja un ARTEFACTO concreto (columna artefacto) y avanza un entregable de la Mesa editorial (researchData.ts).
 */
import { Prioridad } from './researchData';

export const DAILY_META = {
  inicio: '2026-09-08', fin: '2027-02-03', totalDias: 42, // ciclo 1 · D1=Mar 2026-09-08 · alterna con Derma · sáb+dom libres · salta 25-dic/31-dic/1-ene · d41-d42 tras la pausa
  ciclo: 1 as const,
  finNucleo: '2026-12-29', // último átomo antes de la pausa de enero
  pausa: '2027-01-04 → 2027-01-29 · 0 átomos (Step 1)',
  bloque: '13:30–14:15 (boards · alterna con Derma) · 1 átomo-research por día-Research',
  artefacto: 'Carta al editor #1 (oct) · tesis L0 como research letter (nov) · case report #1 listo (dic, submit 1-feb) · SR-1 con PICO, criterios y revisor #2 nombrados',
};

/** Leyenda de recursos verificados (mismas URLs que DATA/RESEARCH/daily-plan.md §6; verificadas jun-jul 2026 · las nuevas, 05-sep-2026). */
export const REC: Record<string, { label: string; url: string }> = {
  PM:     { label: 'PubMed (búsqueda + alertas)', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
  NLM1:   { label: 'NLM · PubMed in EBP (curso)', url: 'https://www.nlm.nih.gov/oet/ed/pubmed/pubmed_in_ebp/index.html' },
  NLM2:   { label: 'NLM · PubMed Online Training', url: 'https://learn.nlm.nih.gov/documentation/training-packets/T0042010P/' },
  ZOT:    { label: 'Zotero (gestor de citas)', url: 'https://www.zotero.org/' },
  GREEN:  { label: 'How to Read a Paper — Greenhalgh (BMJ)', url: 'https://www.bmj.com/about-bmj/resources-readers/publications/how-read-paper' },
  STAT:   { label: 'StatQuest (bioestadística)', url: 'https://www.youtube.com/@statquest' },
  ZED:    { label: 'zedstatistics', url: 'https://www.youtube.com/@zedstatistics' },
  STEPSR: { label: 'Step-by-step SR+MA (Ahn & Kang 2019)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6670166/' },
  CIL1:   { label: 'Cochrane Interactive · Módulo 1 (gratis)', url: 'https://www.cochrane.org/learn/courses-and-resources/interactive-learning/module-1-introduction-conducting-systematic-reviews' },
  COCHB:  { label: 'Cochrane Handbook v6.5', url: 'https://training.cochrane.org/handbook' },
  COCHYT: { label: 'Cochrane Training (YouTube)', url: 'https://www.youtube.com/channel/UCoWzvKR8RPHG07PPeqBiibA' },
  PRISMA: { label: 'PRISMA statement', url: 'https://www.prisma-statement.org/' },
  PRISMAS:{ label: 'PRISMA-S (búsqueda, 16 ítems)', url: 'https://www.prisma-statement.org/prisma-search' },
  PRISMAF:{ label: 'PRISMA 2020 flow (plantilla + Shiny)', url: 'https://www.prisma-statement.org/prisma-2020-flow-diagram' },
  PRISMAC:{ label: 'PRISMA 2020 checklist 27 ítems (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8008539/' },
  PROS:   { label: 'PROSPERO (registro, gratis)', url: 'https://www.crd.york.ac.uk/PROSPERO/help/register' },
  OSF:    { label: 'OSF Registries (scoping)', url: 'https://osf.io/registries' },
  EPMC:   { label: 'Europe PMC (Embase parcial)', url: 'https://europepmc.org/' },
  CENT:   { label: 'Cochrane CENTRAL', url: 'https://www.cochranelibrary.com/central' },
  LILACS: { label: 'LILACS / BVS (LATAM)', url: 'https://lilacs.bvsalud.org/' },
  CT:     { label: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/' },
  ICTRP:  { label: 'WHO ICTRP', url: 'https://www.who.int/clinical-trials-registry-platform' },
  RAY:    { label: 'Rayyan (cribado, free ≤3)', url: 'https://www.rayyan.com/' },
  RAYHC:  { label: 'Rayyan · crear una SR (guía)', url: 'https://help.rayyan.ai/hc/en-us/articles/22088155760017-How-to-Create-a-Systematic-Review-in-Rayyan' },
  RAYYT:  { label: 'Rayyan · canal oficial (hands-on)', url: 'https://www.youtube.com/@Rayyanapp' },
  ELI:    { label: 'Elicit (extracción asistida)', url: 'https://elicit.com/' },
  ROB2:   { label: 'RoB 2 (sesgo en ECA)', url: 'https://www.riskofbias.info/welcome/rob-2-0-tool' },
  ROBINS: { label: 'ROBINS-I (no-aleatorizados)', url: 'https://www.riskofbias.info/welcome/home' },
  GRADE:  { label: 'GRADEpro (certeza)', url: 'https://www.gradepro.org/' },
  AMSTAR: { label: 'AMSTAR-2 (apreciar SR)', url: 'https://amstar.ca/' },
  DMAR:   { label: 'Doing Meta-Analysis in R (libro gratis)', url: 'https://bookdown.org/MathiasHarrer/Doing_Meta_Analysis_in_R/' },
  METAFOR:{ label: 'metafor package (R)', url: 'https://www.metafor-project.org/' },
  EQ:     { label: 'EQUATOR Network', url: 'https://www.equator-network.org/' },
  DELO:   { label: 'DeLorenzi 2014 · paper ancla SR-1 (PMID 24692598)', url: 'https://pubmed.ncbi.nlm.nih.gov/24692598/' },
  OPENALEX:{ label: 'OpenAlex · API troncal (key gratis, 13-feb-2026)', url: 'https://developers.openalex.org/api-reference/authentication' },
  SEMSCH: { label: 'Semantic Scholar · Academic Graph API', url: 'https://api.semanticscholar.org/api-docs/graph' },
  UNPAY:  { label: 'Unpaywall · texto completo OA legal por DOI', url: 'https://unpaywall.org/products/api' },
  CROSSREF:{ label: 'Crossref · verificar DOI + CSL-JSON de citas', url: 'https://www.crossref.org/documentation/retrieve-metadata/content-negotiation/' },
  // ── Aditivos (materiales de élite) — competencias transversales verificadas jul-2026 ──
  TOP:    { label: 'TOP Guidelines · ciencia abierta (Center for Open Science)', url: 'https://www.cos.io/initiatives/top-guidelines' },
  BBR:    { label: 'Harrell · Biostatistics for Biomedical Research (BBR)', url: 'https://hbiostat.org/bbr/' },
  GTS:    { label: 'gtsummary · Table 1 + tablas de regresión publication-ready', url: 'https://www.danieldsjoberg.com/gtsummary/' },
  EPIRSURV:{ label: 'Epidemiologist R Handbook · análisis de supervivencia', url: 'https://www.epirhandbook.com/en/new_pages/survival_analysis.html' },
  ICMJE:  { label: 'ICMJE · Recommendations (autoría + conducta)', url: 'https://www.icmje.org/recommendations/' },
  COPE:   { label: 'COPE · guías de integridad de publicación', url: 'https://publicationethics.org/guidance/Guidelines' },
  CREDIT: { label: 'CRediT · taxonomía de contribución (NISO)', url: 'https://credit.niso.org/' },
  SCIWRITE:{ label: 'Writing in the Sciences · peer review & rebuttal (Sainani)', url: 'https://www.coursera.org/learn/sciwrite' },
  REBUTTAL:{ label: 'PLOS · How to write a persuasive rebuttal', url: 'https://plos.org/resource/how-to-write-a-persuasive-response-to-reviewers/' },
  PHRASE: { label: 'Academic Phrasebank (Manchester) · frases por sección', url: 'https://www.phrasebank.manchester.ac.uk/' },
  TURING: { label: 'The Turing Way · investigación reproducible', url: 'https://the-turing-way.netlify.app/' },
  FAIR:   { label: 'FAIR data principles (GO FAIR)', url: 'https://www.go-fair.org/fair-principles/' },
  ORCID:  { label: 'ORCID · iD de autor (registro gratis)', url: 'https://orcid.org/' },
  SCHOLAR:{ label: 'Google Scholar · crear perfil público', url: 'https://scholar.google.com/intl/en/scholar/citations.html' },
  CTI:    { label: 'CTI Vitae · CONCYTEC (CV + RENACYT)', url: 'https://ctivitae.concytec.gob.pe/' },
  NCBIACC:{ label: 'Cuenta NCBI (login · API key E-utilities)', url: 'https://account.ncbi.nlm.nih.gov/' },
  RISING: { label: 'Rising Scholars (ex-AuthorAID, INASP) · mentoría gratuita', url: 'https://risingscholars.net/' },
  CARE:   { label: 'CARE checklist · 13 ítems (case reports)', url: 'https://www.care-statement.org/checklist' },
  STROBE: { label: 'STROBE checklists (transversal · 22 ítems)', url: 'https://www.strobe-statement.org/checklists/' },
  JAADINT:{ label: 'JAAD International (OA · Grupo B 50%)', url: 'https://www.jaadinternational.org/' },
  JAADCR: { label: 'JAAD Case Reports · ficha DOAJ (APC US$850)', url: 'https://doaj.org/toc/2352-5126' },
  DOJ:    { label: 'Dermatology Online Journal · ficha DOAJ (≤US$300, MEDLINE)', url: 'https://doaj.org/toc/1087-2108' },
  IJD:    { label: 'International Journal of Dermatology · en PubMed (políticas: 403 → confirmar por correo)', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%22Int+J+Dermatol%22%5BJournal%5D' },
  ACTAS:  { label: 'Actas Dermo-Sifiliográficas · en PubMed (Diamond OA $0)', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%22Actas+Dermosifiliogr%22%5BJournal%5D' },
  ANAIS:  { label: 'Anais Brasileiros de Dermatologia · en PubMed (Diamond OA $0)', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%22An+Bras+Dermatol%22%5BJournal%5D' },
  EM:     { label: 'Editorial Manager (Aries) · cuenta por revista', url: 'https://www.ariessys.com/' },
  NRMP:   { label: 'NRMP · Residency Data Reports (base pública)', url: 'https://www.nrmp.org/match-data-analytics/residency-data-reports/' },
};

/** Franjas del bloque Research (45 min). Mezcla eval anclada + deep work productivo. */
export const FRANJAS = [
  { hora: '13:30–13:35', fase: 'Eval anclada del átomo PREVIO: 2Q de auto-test del método + ¿avanzó el entregable de ayer?', tipo: 'eval' },
  { hora: '13:35–13:40', fase: 'Pre-test / free-recall 60s del objetivo de HOY (¿qué sé ya de este paso?)', tipo: 'pretest' },
  { hora: '13:40–14:05', fase: 'DEEP WORK (25 min): recurso real del átomo MIENTRAS produces el ARTEFACTO del entregable (carta · tesis · case report · SR-1)', tipo: 'work' },
  { hora: '14:05–14:10', fase: 'Free recall a papel + log (gap método / razonamiento / herramienta)', tipo: 'recall' },
  { hora: '14:10–14:15', fase: 'Crear ≤3 APEX-método (Palmerton) + guardar el artefacto (Mesa editorial / PROSPERO / Rayyan / .docx)', tipo: 'apex' },
];

/**
 * ★ MAESTRÍA TRANSVERSAL (aditivo) — módulos de competencia que atraviesan TODAS las fases del plan,
 * no un día concreto. Cierran los gaps del brief (integridad/ética, regresión clínica aplicada,
 * ciencia abierta, peer review post-submit, redacción no-nativo, gestión de datos reproducible).
 * Se renderiza en ResearchHub → Panel. NO altera el calendario ni los átomos de DIAS: es contenido.
 */
export interface MaestriaModulo {
  id: string; titulo: string; anclaFase: string; porQue: string;
  drill: string; recs: string[];
}
export const RESEARCH_MAESTRIA: MaestriaModulo[] = [
  { id: 'openscience', titulo: 'Ciencia abierta & reproducibilidad', anclaFase: 'transversal · refuerza R1–R2',
    porQue: 'Pre-registro (PROSPERO/OSF), registered reports y TOP guidelines cierran HARKing/p-hacking. Es competencia esperada en journals top y ya tienes OSF en el loop.',
    drill: 'Antes de tocar datos: congela hipótesis + análisis en OSF; marca qué es confirmatorio vs exploratorio.',
    recs: ['TOP', 'OSF', 'TURING'] },
  { id: 'regresion', titulo: 'Regresión clínica aplicada (logística · Cox · Table 1)', anclaFase: 'transversal · habilita original-research (base pública)',
    porQue: 'Convierte la estadística de "solo meta-análisis" en capacidad de original-research con base pública (NHANES/SEER · el target de mayor ROI). gtsummary da tablas listas para revista.',
    drill: 'Con un dataset público: 1 modelo logístico + 1 Cox; reporta con gtsummary::tbl_regression (OR/HR + IC95%).',
    recs: ['BBR', 'GTS', 'EPIRSURV'] },
  { id: 'integridad', titulo: 'Integridad de publicación · gate ICMJE/COPE/CRediT', anclaFase: 'gate previo a cada SUBMIT (C-6 · T-8 · CR-9 · R43)',
    porQue: 'Evita problemas de autoría/ética y profesionaliza el envío. Alto valor, bajo coste: checklist ICMJE de autoría + COPE + roles CRediT antes de mandar.',
    drill: 'Checklist ICMJE de 4 criterios de autoría para cada autor + asignar roles CRediT + declarar conflictos.',
    recs: ['ICMJE', 'COPE', 'CREDIT'] },
  { id: 'postsubmit', titulo: 'Post-submit · responder a revisores (rebuttal) + hacer peer review', anclaFase: 'después de cada submit (X-2 · X-11)',
    porQue: 'Cada pista termina en un SUBMIT, pero el 80% del trabajo de publicar es la revisión. Aprender a escribir un rebuttal punto-por-punto y a revisar cierra el ciclo.',
    drill: 'Plantilla de rebuttal: cita cada comentario → respuesta → cambio exacto (línea/tabla) en tono cortés.',
    recs: ['SCIWRITE', 'REBUTTAL'] },
  { id: 'phrasebank', titulo: 'Redacción a nivel publicación (no-nativo) · micro-drill R8', anclaFase: 'micro-drill en cada átomo de redacción (C-3 · T-3 · CR-5 · R34-R37)',
    porQue: 'Palanca directa de calidad de escritura para no-nativo. Academic Phrasebank ancla frases idiomáticas por sección; convierte la fase de manuscrito en práctica diaria.',
    drill: '2 frases del Phrasebank por sección que redactes hoy (Introducing · Reporting results · Discussing limitations).',
    recs: ['PHRASE', 'SCIWRITE'] },
  { id: 'datos', titulo: 'Gestión de datos reproducible (data dictionary · README · versionado)', anclaFase: 'transversal · track de base pública',
    porQue: 'Habilita el original-research de mayor ROI con el estándar reproducible (FAIR) que exigen revistas serias: diccionario de datos, README del dataset y versionado.',
    drill: 'Crea data dictionary (variable · tipo · unidad · rango) + README FAIR + versiona el script de limpieza.',
    recs: ['TURING', 'FAIR'] },
];

/**
 * ★ TOP 2026 (verificado) — recursos de ÉLITE GRATIS por capa del ciclo de research.
 * Investigación de calidad 2026 (DATA/CALIDAD/Research.md). Aditivo: complementa REC y
 * RESEARCH_MODULOS sin reestructurar el plan día-a-día. Se renderiza en ResearchHub → Panel.
 */
export interface RecursoTopResearch {
  label: string; url: string; autor: string; tipo: string; nivel: string;
  confianza: 'verificado' | 'estable'; porQue: string;
}
export const RESEARCH_RECURSOS_TOP: { capa: string; items: RecursoTopResearch[] }[] = [
  { capa: 'Metodología & inferencia causal', items: [
    { label: 'Causal Inference: What If — Hernán & Robins', url: 'https://miguelhernan.org/whatifbook', autor: 'Miguel A. Hernán & James M. Robins (Harvard)', tipo: 'libro + código (R/Python/Stata)', nivel: 'avanzado', confianza: 'verificado', porQue: 'EL libro de inferencia causal, gratis en PDF (act. 21-nov-2025). DAGs, IPW, g-formula, IV y Target Trial Emulation (frontera observacional). Doble valor: método élite + puente a AI engineering (Synapse).' },
    { label: 'Biostatistics for Biomedical Research (BBR) — Frank Harrell', url: 'https://hbiostat.org/bbr/', autor: 'Frank E. Harrell Jr. (Vanderbilt)', tipo: 'libro/portal online', nivel: 'intermedio-avanzado', confianza: 'verificado', porQue: 'Libro gratis del referente #1 mundial (act. mayo 2026): métodos modernos (no categorizar continuas, no abusar de p-values) + R Workflow reproducible con Quarto.' },
  ] },
  { capa: 'Guías de reporte (exigidas por revistas top)', items: [
    { label: 'EQUATOR Network — CONSORT 2025, STROBE, PRISMA, SPIRIT', url: 'https://www.equator-network.org/reporting-guidelines/', autor: 'UK EQUATOR Centre (Oxford)', tipo: 'biblioteca de checklists', nivel: 'todos', confianza: 'verificado', porQue: '>250 guías por tipo de estudio que NEJM/Lancet/JAMA/BMJ exigen. Regla de oro: elegir la guía ANTES de escribir.' },
    { label: 'PRISMA 2020 — statement + E&E', url: 'https://www.prisma-statement.org/', autor: 'PRISMA Group / EQUATOR', tipo: 'guía de reporte', nivel: 'intermedio', confianza: 'verificado', porQue: 'Estándar de facto para SR/meta-análisis: checklist 27 ítems + diagramas de flujo. El E&E explica cada ítem con ejemplos.' },
    { label: 'Cochrane Handbook v6.5 (acceso abierto)', url: 'https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current', autor: 'Cochrane (Higgins, Thomas et al.)', tipo: 'guía metodológica', nivel: 'avanzado', confianza: 'verificado', porQue: 'La biblia metodológica de las revisiones sistemáticas (v6.5, ago 2024: network MA, síntesis narrativa, equidad, automatización).' },
  ] },
  { capa: 'Bioestadística con código (puente → Synapse)', items: [
    { label: 'The Epidemiologist R Handbook', url: 'https://www.epirhandbook.com/en/', autor: 'Applied Epi (ONG)', tipo: 'manual online', nivel: 'intermedio', confianza: 'verificado', porQue: 'El recurso práctico más usado (+3M usos) para datos de salud en R: gestión de datos, supervivencia, brotes, reportes reproducibles.' },
    { label: 'An Introduction to Statistical Learning (ISLP, Python)', url: 'https://www.statlearning.com/', autor: 'James, Witten, Hastie, Tibshirani, Taylor', tipo: 'libro PDF gratis + labs', nivel: 'intermedio-avanzado', confianza: 'verificado', porQue: 'Statistical/machine learning con rigor. Edición Python (paquete ISLP). Referencia clave COMPARTIDA Research↔Synapse.' },
    { label: 'Program Evaluation & Causal Inference con R — Andrew Heiss', url: 'https://evalsp25.classes.andrewheiss.com/', autor: 'Andrew Heiss (Georgia State)', tipo: 'curso (web+vídeos+labs)', nivel: 'intermedio-avanzado', confianza: 'verificado', porQue: 'Posgrado gratis: DAGs, diff-in-diff, RDD, IV — todo con R. El puente perfecto diseño↔causalidad↔código.' },
    { label: 'gtsummary — tablas publication-ready', url: 'https://www.danieldsjoberg.com/gtsummary/', autor: 'Daniel D. Sjoberg et al.', tipo: 'paquete R + docs', nivel: 'intermedio', confianza: 'verificado', porQue: 'Estándar para Table 1 y tablas de regresión listas para revistas clínicas de alto impacto.' },
  ] },
  { capa: 'Escritura & publicación', items: [
    { label: 'Writing in the Sciences (Stanford) — Kristin Sainani', url: 'https://www.coursera.org/learn/sciwrite', autor: 'Dra. Kristin Sainani · Stanford', tipo: 'curso (audit gratis)', nivel: 'principiante-intermedio', confianza: 'verificado', porQue: 'El curso de escritura científica #1 del mundo (4.9/5, ~10k reseñas): todo el ciclo del manuscrito + peer review + ética. Punto de partida para publicar.' },
    { label: 'Academic Phrasebank (Manchester)', url: 'https://www.phrasebank.manchester.ac.uk/', autor: 'University of Manchester', tipo: 'herramienta de referencia', nivel: 'todos', confianza: 'verificado', porQue: 'Cientos de plantillas de frases por sección del paper. Indispensable para escribir en inglés a nivel publicación siendo no-nativo.' },
    { label: 'Ten Simple Rules for Structuring Papers', url: 'https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005619', autor: 'Brett Mensh & Konrad Kording · PLOS', tipo: 'artículo (open access)', nivel: 'intermedio', confianza: 'verificado', porQue: 'El mejor artículo corto (~30 min) sobre cómo estructurar un paper. Lectura obligatoria antes del primer manuscrito serio.' },
  ] },
  { capa: 'Evaluación de sesgo & meta-análisis', items: [
    { label: 'riskofbias.info — RoB 2 + ROBINS-I v2', url: 'https://www.riskofbias.info/', autor: 'Cochrane Bias Methods Group', tipo: 'herramientas de sesgo', nivel: 'avanzado', confianza: 'verificado', porQue: 'Hub oficial: RoB 2 (ECA) y ROBINS-I v2 (no aleatorizados, act. 2025). Combinar con AMSTAR-2 y GRADEpro.' },
    { label: 'metafor — meta-análisis en R', url: 'https://www.metafor-project.org/', autor: 'Wolfgang Viechtbauer', tipo: 'paquete R (open source)', nivel: 'avanzado', confianza: 'verificado', porQue: 'Estándar de oro libre para meta-análisis reproducible (efectos fijos/aleatorios/mixtos, forest/funnel/Baujat). 2.1M+ descargas.' },
  ] },
  { capa: 'Ciencia abierta (stack moderno)', items: [
    { label: 'Zotero — gestor de referencias', url: 'https://www.zotero.org/', autor: 'Corporation for Digital Scholarship', tipo: 'gestor de referencias', nivel: 'principiante', confianza: 'verificado', porQue: 'Mejor opción gratis: ilimitado, 7.000+ estilos, integración Word/Docs, conecta con ResearchRabbit y OSF.' },
    { label: 'OSF (Open Science Framework)', url: 'https://www.cos.io/products/osf', autor: 'Center for Open Science', tipo: 'plataforma de ciencia abierta', nivel: 'intermedio', confianza: 'verificado', porQue: 'Preregistro (evita HARKing/p-hacking), gestión de datos, DOIs y conexión a GitHub/Zotero/ORCID. Cierra el gap de reproducibilidad.' },
    { label: 'ORCID — identidad de autor persistente', url: 'https://orcid.org/', autor: 'ORCID, Inc.', tipo: 'identificador de investigador', nivel: 'principiante', confianza: 'verificado', porQue: 'iD único que vincula tu producción científica; lo exigen cada vez más revistas y financiadores. Pilar del stack moderno.' },
  ] },
];

export type FaseId = 'R0' | 'R1' | 'R2' | 'R3' | 'R4' | 'R5' | 'R6' | 'R7' | 'R8' | 'M' | 'C' | 'T' | 'CR' | 'K' | 'B' | 'X';
export type PistaId = 'R' | 'M' | 'C' | 'T' | 'CR' | 'K' | 'B' | 'X';
// Colores en JOYA APAGADA (tokens · quiet-luxury): teal #6BB8B0 · sapphire #4F7DD6 · brass #B8934E · coral #C56A5A · amatista #9A7BC8 · oro #C8A96A.
export const FASE_INFO: Record<FaseId, { nombre: string; color: string; pilar: string }> = {
  R0: { nombre: 'Cimientos & infra', color: '#6BB8B0', pilar: 'base' },
  R1: { nombre: 'Pregunta & protocolo', color: '#6BB8B0', pilar: 'Reporte' },
  R2: { nombre: 'Registro PROSPERO', color: '#4F7DD6', pilar: 'Registro' },
  R3: { nombre: 'Búsqueda N bases', color: '#4F7DD6', pilar: 'Reporte' },
  R4: { nombre: 'Screening dual', color: '#B8934E', pilar: 'Conducción' },
  R5: { nombre: 'Extracción doble', color: '#B8934E', pilar: 'Conducción' },
  R6: { nombre: 'Sesgo & GRADE', color: '#C56A5A', pilar: 'Evaluación' },
  R7: { nombre: 'Meta-análisis en R', color: '#9A7BC8', pilar: 'Conducción' },
  R8: { nombre: 'Manuscrito & envío', color: '#C56A5A', pilar: 'Reporte' },
  M:  { nombre: 'Mentores & red', color: '#C8A96A', pilar: 'Red' },
  C:  { nombre: 'Carta al editor', color: '#4F7DD6', pilar: 'Entregable' },
  T:  { nombre: 'Tesis · research letter', color: '#C56A5A', pilar: 'Entregable' },
  CR: { nombre: 'Case report (CARE)', color: '#9A7BC8', pilar: 'Entregable' },
  K:  { nombre: 'Campaña de colaboradores', color: '#B8934E', pilar: 'Red' },
  B:  { nombre: 'Bibliométrico & abstracts', color: '#7C83D6', pilar: 'Entregable' },
  X:  { nombre: 'Transversal · cierre', color: '#7C8496', pilar: 'base' },
};
/** Pista = entregable al que empuja el átomo (C/T/CR → Mesa editorial · R → SR-1 · M/K red · B bibliométrico · X transversal). */
export const PISTA_INFO: Record<PistaId, { label: string; color: string; entregableId: string | null }> = {
  R:  { label: 'SR-1 · método', color: '#6BB8B0', entregableId: 'SR-1' },
  M:  { label: 'Mentores', color: '#C8A96A', entregableId: null },
  C:  { label: 'Carta al editor', color: '#4F7DD6', entregableId: 'carta-1' },
  T:  { label: 'Tesis L0', color: '#C56A5A', entregableId: 'tesis-L0' },
  CR: { label: 'Case report', color: '#9A7BC8', entregableId: 'case-report-1' },
  K:  { label: 'Campaña', color: '#B8934E', entregableId: null },
  B:  { label: 'Bibliométrico', color: '#7C83D6', entregableId: null },
  X:  { label: 'Transversal', color: '#7C8496', entregableId: null },
};

export interface DiaResearch {
  d: number; fecha: string; ciclo: 1 | 2; fase: FaseId; pista: PistaId; code: string; prioridad: Prioridad;
  objetivo: string; entregable: string; artefacto: string; tool: string; recs: string[];
  chips?: string[];
  apex?: { id: string; t: string } | null;
}

export const DIAS: DiaResearch[] = [
  // R0 · Cimientos & infra
  { d: 1, fecha: '2026-09-08', ciclo: 1, fase: 'R0', pista: 'R', code: 'R0', prioridad: 'CRITICA', objetivo: 'Infra académica: abrir las 10 cuentas que exige el circuito editorial (checklist marcable en Desk → Infra académica)', entregable: '10/10 cuentas: ORCID · Google Scholar · CTI Vitae/RENACYT · Editorial Manager · ScholarOne · eScholarship/DOJ · PROSPERO · Rayyan · Zotero · OpenAlex + NCBI keys', artefacto: 'Checklist "Infra académica" (app · clave research-infra) + IDs (ORCID iD, CTI Vitae) guardados en DATA/RESEARCH/MENTORES.md §Identificadores', tool: 'ORCID · CTI Vitae · Rayyan', recs: ['ORCID', 'SCHOLAR', 'CTI', 'NCBIACC', 'OPENALEX', 'PROS', 'RAY', 'ZOT'], apex: { id: 'infra', t: 'Infra académica 10/10' } },
  { d: 2, fecha: '2026-09-10', ciclo: 1, fase: 'R0', pista: 'R', code: 'R1', prioridad: 'CRITICA', objetivo: 'PICO: formular 3 preguntas (terapia / diagnóstico / pronóstico) y leer 1 abstract del nicho con el método Greenhalgh', entregable: '3 PICO escritos + 1 abstract (fillers · fototipos IV-VI) clasificado por diseño de estudio', artefacto: 'Nota 01_PICO.md (3 PICO + plantilla Greenhalgh) en el vault → SR-1/_hoja_de_ruta', tool: '—', recs: ['CIL1', 'GREEN'], apex: null },
  // M · Mentores & red
  { d: 3, fecha: '2026-09-14', ciclo: 1, fase: 'M', pista: 'M', code: 'M1', prioridad: 'CRITICA', objetivo: 'Dr. Ciro Rodríguez (Hospital Regional Daniel Alcides Carrión, Huancayo): propuesta CONCRETA de 3 coautorías — tesis→research letter (él senior), carta al editor (coautor) y case report de SU consulta (él senior author)', entregable: 'Mensaje o reunión con las 3 coautorías propuestas + respuesta registrada (sí / no / cuándo)', artefacto: 'DATA/RESEARCH/MENTORES.md: fila Dr. Ciro (qué pido · fecha · estado · siguiente paso)', tool: 'WhatsApp / presencial', recs: ['ICMJE', 'CREDIT'], apex: { id: 'mentor-ciro', t: 'Senior author local confirmado' } },
  // C · Carta al editor
  { d: 4, fecha: '2026-09-16', ciclo: 1, fase: 'C', pista: 'C', code: 'C-1', prioridad: 'CRITICA', objetivo: 'Discovery de 5 artículos 2026 (últimos 30-60 días) en JAAD / JAAD Intl / IJD / JCD / Dermatol Surg sobre derma estética · fototipos IV-VI · complicaciones de fillers, con la ventana de letters y los límites de cada journal', entregable: 'Tabla de 5 candidatos: journal · fecha de publicación · ventana de correspondencia (URL de Author Guidelines) · límite palabras/refs · coste · ángulo de la carta (dato peruano/latino que el paper no considera)', artefacto: 'DATA/RESEARCH/CARTA_1/candidatos.md (tabla de 5) + correo a IJD Editorial Office pidiendo su política de correspondencia (pendiente desde 27-ago)', tool: 'research-discovery · PubMed', recs: ['PM', 'OPENALEX', 'JAADINT', 'IJD'], chips: ['ventana de letters típica 4-12 semanas · A VERIFICAR por journal (JAAD/IJD dieron 403 el 05-sep)'], apex: null },
  // M · Mentores & red
  { d: 5, fecha: '2026-09-18', ciclo: 1, fase: 'M', pista: 'M', code: 'M2', prioridad: 'ALTA', objetivo: 'Rising Scholars (ex-AuthorAID, INASP): solicitar mentor 1-a-1 gratuito para la revisión en inglés del primer manuscrito — tarda semanas, pedirlo YA', entregable: 'Perfil creado + solicitud de mentor enviada (área: dermatología / escritura científica)', artefacto: 'MENTORES.md: fila Rising Scholars (fecha de solicitud · estado)', tool: 'risingscholars.net', recs: ['RISING', 'SCIWRITE', 'PHRASE'], apex: null },
  // C · Carta al editor
  { d: 6, fecha: '2026-09-22', ciclo: 1, fase: 'C', pista: 'C', code: 'C-2', prioridad: 'CRITICA', objetivo: 'Elegir 1 artículo diana con FECHA LÍMITE de submit calculada (ventana del journal) + leer 5 letters modelo del mismo journal (cita → aporte u objeción con 1 dato verificable → implicación)', entregable: 'Artículo diana fijado + deadline en la Mesa editorial + esqueleto de la carta (3 párrafos) calcado de los 5 modelos', artefacto: 'CARTA_1/diana.md (DOI del artículo, deadline, límites, esqueleto) + Mesa editorial: carta-1 → borrador', tool: 'PubMed · Mesa editorial', recs: ['PM', 'PHRASE', 'ICMJE'], apex: { id: 'carta-diana', t: 'Artículo diana + deadline' } },
  // M · Mentores & red
  { d: 7, fecha: '2026-09-24', ciclo: 1, fase: 'M', pista: 'M', code: 'M3', prioridad: 'ALTA', objetivo: 'Email a Prof. Andrew Finlay (Cardiff, creador CADI/DLQI): 6 líneas — permiso / versión española del CADI + ofrecer los datos de la tesis (n=316, rs=0.637) como validación peruana; desbloquea L6', entregable: 'Email enviado (6 líneas, asunto claro, 1 pregunta concreta) + copia archivada', artefacto: 'MENTORES.md: fila Finlay (fecha · estado) + copia del email en §Plantillas', tool: 'Email institucional', recs: ['PHRASE', 'ICMJE'], apex: null },
  // R0 · Cimientos & infra
  { d: 8, fecha: '2026-09-28', ciclo: 1, fase: 'R0', pista: 'R', code: 'R2', prioridad: 'ALTA', objetivo: 'Diseños de estudio y niveles de evidencia + regla EQUATOR: elegir la guía de reporte ANTES de escribir (carta = sin guía · tesis = STROBE transversal · case report = CARE · SR = PRISMA 2020)', entregable: 'Mapa de 1 página: diseño → nivel → sesgos típicos → guía de reporte que exige el journal', artefacto: 'Nota 02_disenos_guias.md en el vault + checklists STROBE y CARE descargadas a DATA/RESEARCH/', tool: '—', recs: ['EQ', 'STROBE', 'CARE', 'STAT'], apex: null },
  // R1 · Pregunta & protocolo
  { d: 9, fecha: '2026-09-30', ciclo: 1, fase: 'R1', pista: 'R', code: 'R6', prioridad: 'CRITICA', objetivo: 'Fijar el PICO de SR-1 (complicaciones vasculares de fillers + tiempo-a-hialuronidasa) + 1 desenlace primario, validado contra la ficha L4 · PICO v1 PROVISIONAL: se revalida en R6b (ciclo 2) cuando Derma d19-20 haya cubierto el mecanismo de la oclusión', entregable: 'PICO de SR-1 escrito (P/I/C/O + desenlace primario único) y contrastado con L4 §2', artefacto: 'lines/L4-complicaciones.md §2 actualizado + nota 01_protocolo_PICO en el vault', tool: '—', recs: ['DELO', 'CIL1', 'COCHB'], chips: ['requiere Derma d19-20 (oclusión vascular)'], apex: { id: 'pico-sr1', t: 'PICO de SR-1' } },
  // C · Carta al editor
  { d: 10, fecha: '2026-10-02', ciclo: 1, fase: 'C', pista: 'C', code: 'C-3', prioridad: 'ALTA', objetivo: 'Borrador de la carta: 400-600 palabras, ≤5 referencias, 3 párrafos (qué dice el artículo → qué falta u objeción con 1 dato verificable de Perú/LATAM/fototipos IV-VI → implicación clínica); frases del Academic Phrasebank', entregable: 'Borrador v1 completo (400-600 palabras) con marcadores [CIT:id] en lugar de referencias escritas', artefacto: 'CARTA_1/borrador_v1.md', tool: 'Obsidian · Phrasebank', recs: ['PHRASE', 'SCIWRITE'], apex: { id: 'carta-v1', t: 'Borrador de la carta' } },
  { d: 11, fecha: '2026-10-06', ciclo: 1, fase: 'C', pista: 'C', code: 'C-4', prioridad: 'CRITICA', objetivo: 'Citas verificadas: cada [CIT:id] resuelto a DOI/PMID real con citation_verifier.py (Crossref/PubMed + CSL-JSON → Vancouver); cero referencias de memoria', entregable: '≤5 referencias con status verified + lista Vancouver generada; ninguna needs_review / rejected', artefacto: 'CARTA_1/refs_verified.json (salida de citation_verifier.py) + borrador v2 con [n]', tool: 'python DATA/RESEARCH/agentic/citation_verifier.py', recs: ['CROSSREF', 'PM'], apex: null },
  { d: 12, fecha: '2026-10-08', ciclo: 1, fase: 'C', pista: 'C', code: 'C-5', prioridad: 'MEDIA', objetivo: 'Formateo al journal del artículo diana (Author Guidelines: título, autores + ORCID, conflictos, límite exacto) + cover letter de 5 líneas + cuenta activa en el portal del journal (Editorial Manager / ScholarOne)', entregable: 'Manuscrito formateado (.docx) + cover letter + cuenta del portal activa', artefacto: 'CARTA_1/carta_final.docx + cover_letter.md', tool: 'Editorial Manager / ScholarOne', recs: ['EM', 'ICMJE', 'COPE'], apex: null },
  { d: 13, fecha: '2026-10-12', ciclo: 1, fase: 'C', pista: 'C', code: 'C-6', prioridad: 'CRITICA', objetivo: 'SUBMIT carta al editor #1 (antes del deadline calculado en C-2) + registrar la fecha de envío y el nº de manuscrito en la Mesa editorial', entregable: 'Carta ENVIADA ✅ · estado carta-1 → enviado', artefacto: 'Mesa editorial: carta-1 = enviado (fecha) + MENTORES.md actualizado si hay coautor', tool: 'Editorial Manager / ScholarOne', recs: ['ICMJE'], apex: { id: 'carta-submit', t: 'Carta #1 enviada' } },
  // T · Tesis · research letter
  { d: 14, fecha: '2026-10-14', ciclo: 1, fase: 'T', pista: 'T', code: 'T-1', prioridad: 'CRITICA', objetivo: 'Ética de la tesis (adolescentes, colegio): verificar y ARCHIVAR nº y fecha de aprobación del CEI (UNCP u hospital) + asentimiento / consentimiento parental; si no hubo CEI formal → consultar con el asesor la vía (aprobación retrospectiva o expedita, o journal que acepte declaración)', entregable: 'Documento de ética localizado (o decisión escrita de la vía alternativa) + párrafo de ética/consentimiento listo para Methods', artefacto: 'DATA/RESEARCH/TESIS_L0/etica.md (nº CEI, fecha, consentimientos, párrafo para Methods)', tool: 'Archivo de la tesis · asesor', recs: ['ICMJE', 'COPE'], chips: ['sin nº de CEI muchos journals (JAAD Intl, IJD) rechazan de entrada'], apex: null },
  { d: 15, fecha: '2026-10-16', ciclo: 1, fase: 'T', pista: 'T', code: 'T-2', prioridad: 'ALTA', objetivo: 'STROBE (transversal, 22 ítems) sobre la tesis: marcar qué ítem ya está, qué falta y qué se recorta para el formato research letter', entregable: 'Checklist STROBE rellenada (22 ítems con página / estado) — base del Methods', artefacto: 'TESIS_L0/STROBE_checklist.md', tool: 'STROBE', recs: ['STROBE', 'EQ'], apex: null },
  // R1 · Pregunta & protocolo
  { d: 16, fecha: '2026-10-20', ciclo: 1, fase: 'R1', pista: 'R', code: 'R7', prioridad: 'ALTA', objetivo: 'Criterios de elegibilidad de SR-1 (inclusión / exclusión, diseños admitidos, idiomas, años) en tabla PICOS', entregable: 'Tabla PICOS de SR-1 congelable para el protocolo', artefacto: 'lines/L4-complicaciones.md §3 actualizado + nota 01_protocolo_PICO', tool: '—', recs: ['COCHB', 'PRISMA'], apex: null },
  // T · Tesis · research letter
  { d: 17, fecha: '2026-10-22', ciclo: 1, fase: 'T', pista: 'T', code: 'T-3', prioridad: 'ALTA', objetivo: 'Research letter (600-1000 palabras): Introduction (gap: QoL en acné adolescente andino, CADI en LMIC) + Methods (transversal, n=316, IGA como gold standard del Dr. Ciro, CADI, rs de Spearman, κ)', entregable: 'Intro + Methods redactados (≤400 palabras) con [CIT:id]', artefacto: 'TESIS_L0/research_letter_v1.md (Intro + Methods)', tool: 'Obsidian · Phrasebank', recs: ['PHRASE', 'STROBE', 'SCIWRITE'], apex: null },
  { d: 18, fecha: '2026-10-26', ciclo: 1, fase: 'T', pista: 'T', code: 'T-4', prioridad: 'ALTA', objetivo: 'Results: 1 tabla (características + IGA×CADI) y 1 figura (correlación rs=0.637 o distribución por severidad) con gtsummary / R base; prevalencia 39.8 %, κ=0.81', entregable: 'Tabla 1 + Figura 1 (300 dpi) + párrafo de Results', artefacto: 'TESIS_L0/tabla1.docx + figura1.tiff + research_letter_v1.md (Results)', tool: 'R · gtsummary', recs: ['GTS', 'BBR'], apex: { id: 'tesis-results', t: 'Tabla 1 + Figura 1 de la tesis' } },
  // CR · Case report (CARE)
  { d: 19, fecha: '2026-10-28', ciclo: 1, fase: 'CR', pista: 'CR', code: 'CR-1', prioridad: 'CRITICA', objetivo: 'CASE REPORT #1 — decidir la FUENTE del caso antes del 31-oct: (a) Dr. Ciro: 1-2 casos de su consulta (ideal complicación de inyectable = L4, o caso raro con buenas fotos) con él como senior author; (b) plan B: dermatólogo de la Sociedad Peruana de Dermatología', entregable: 'Tabla de casos candidatos (diagnóstico · por qué es publicable · fotos disponibles · senior author · estado) + 1 caso ELEGIDO', artefacto: 'DATA/RESEARCH/CASE_REPORT_1/caso_candidatos.md + Mesa editorial: senior author del case report', tool: 'Dr. Ciro · SPD', recs: ['CARE', 'DOJ', 'JAADCR'], chips: ['sin caso antes del 31-oct el entregable de feb-2027 no ocurre'], apex: { id: 'cr-caso', t: 'Caso + senior author' } },
  // T · Tesis · research letter
  { d: 20, fecha: '2026-10-30', ciclo: 1, fase: 'T', pista: 'T', code: 'T-5', prioridad: 'ALTA', objetivo: 'Discussion (≤250 palabras: hallazgo, comparación con la literatura CADI, limitaciones, implicación) + decidir la CASCADA y el coste: JAAD International (OA, 50 % Grupo B) → IJD → Actas Dermo-Sifiliográficas ($0) → Anais Brasileiros ($0)', entregable: 'Discussion redactada + cascada con APC verificado en la web de cada journal (con fecha) o "A VERIFICAR"', artefacto: 'TESIS_L0/research_letter_v1.md (completo) + TESIS_L0/cascada_journals.md', tool: 'Obsidian', recs: ['JAADINT', 'IJD', 'ACTAS', 'ANAIS', 'PHRASE'], apex: null },
  // CR · Case report (CARE)
  { d: 21, fecha: '2026-11-03', ciclo: 1, fase: 'CR', pista: 'CR', code: 'CR-2', prioridad: 'CRITICA', objetivo: 'Consentimiento de PUBLICACIÓN (distinto del asistencial): plantilla bilingüe ES/EN según lo que exigen DOJ y CARE, con fotos y datos clínicos; firmado por el paciente (o tutor)', entregable: 'Consentimiento firmado y escaneado (sin él no hay case report)', artefacto: 'CASE_REPORT_1/consentimiento_publicacion_ES_EN.md (plantilla) + consentimiento_firmado.pdf (fuera del repo)', tool: 'Plantilla + consulta', recs: ['CARE', 'COPE', 'ICMJE'], apex: null },
  // T · Tesis · research letter
  { d: 22, fecha: '2026-11-05', ciclo: 1, fase: 'T', pista: 'T', code: 'T-6', prioridad: 'ALTA', objetivo: 'Revisión del research letter por el Dr. Ciro (coautor / senior): comentarios incorporados + criterios ICMJE de autoría + roles CRediT + conflictos + ORCID de ambos', entregable: 'v2 revisada por el senior author + página de autoría (ICMJE / CRediT / conflictos)', artefacto: 'TESIS_L0/research_letter_v2.md + autoria.md', tool: 'Dr. Ciro', recs: ['ICMJE', 'CREDIT', 'COPE'], apex: null },
  // CR · Case report (CARE)
  { d: 23, fecha: '2026-11-09', ciclo: 1, fase: 'CR', pista: 'CR', code: 'CR-3', prioridad: 'ALTA', objetivo: 'Fotos clínicas estandarizadas: fondo neutro, misma distancia e iluminación, sin datos identificables (recortar u ocultar ojos y tatuajes), pre/post si hay; nombrar por fecha; protocolo escrito', entregable: 'Set de fotos (≥2, 300 dpi, anonimizadas) + protocolo fotográfico', artefacto: 'CASE_REPORT_1/protocolo_fotos.md + carpeta fotos/ (fuera del repo)', tool: 'Cámara / móvil · editor de imagen', recs: ['CARE', 'DOJ'], apex: null },
  // T · Tesis · research letter
  { d: 24, fecha: '2026-11-11', ciclo: 1, fase: 'T', pista: 'T', code: 'T-7', prioridad: 'CRITICA', objetivo: 'Formateo a JAAD International (Author Guidelines · Editorial Manager): research letter 600-1000 palabras, 1 tabla, 1 figura, ≤10 refs verificadas con citation_verifier.py, declaración de ética (T-1), cover letter', entregable: 'Manuscrito formateado + refs verified + cover letter + declaración de ética', artefacto: 'TESIS_L0/research_letter_final.docx + refs_verified.json + cover_letter.md', tool: 'citation_verifier.py · Editorial Manager', recs: ['JAADINT', 'CROSSREF', 'EM'], apex: null },
  // CR · Case report (CARE)
  { d: 25, fecha: '2026-11-13', ciclo: 1, fase: 'CR', pista: 'CR', code: 'CR-4', prioridad: 'ALTA', objetivo: 'CARE (13 ítems): rellenar la checklist + tabla TIMELINE del paciente + párrafo de perspectiva del paciente + declaración de consentimiento', entregable: 'CARE checklist 13/13 con página + timeline en tabla', artefacto: 'CASE_REPORT_1/CARE_checklist_13.md + timeline.md', tool: 'CARE', recs: ['CARE', 'EQ'], apex: { id: 'care', t: 'CARE 13/13' } },
  // T · Tesis · research letter
  { d: 26, fecha: '2026-11-17', ciclo: 1, fase: 'T', pista: 'T', code: 'T-8', prioridad: 'CRITICA', objetivo: 'SUBMIT research letter de la tesis a JAAD International (o al siguiente de la cascada si el primero no aplica) + registrar en la Mesa editorial y en CTI Vitae', entregable: 'Tesis ENVIADA ✅ (nº de manuscrito) · estado tesis-L0 → enviado', artefacto: 'Mesa editorial: tesis-L0 = enviado (fecha) + CTI Vitae actualizado', tool: 'Editorial Manager', recs: ['JAADINT', 'ICMJE'], apex: { id: 'tesis-submit', t: 'Tesis enviada' } },
  // CR · Case report (CARE)
  { d: 27, fecha: '2026-11-19', ciclo: 1, fase: 'CR', pista: 'CR', code: 'CR-5', prioridad: 'ALTA', objetivo: 'Borrador del case report (límite de palabras de DOJ: A VERIFICAR en sus guías): presentación → hallazgos → diagnóstico → tratamiento → evolución → discusión con 3-5 refs [CIT:id] + "por qué este caso enseña algo"', entregable: 'Borrador v1 completo siguiendo el orden CARE', artefacto: 'CASE_REPORT_1/borrador_v1.md', tool: 'Obsidian · Phrasebank', recs: ['CARE', 'PHRASE', 'DOJ'], apex: null },
  // X · Transversal · cierre
  { d: 28, fecha: '2026-11-23', ciclo: 1, fase: 'X', pista: 'R', code: 'X-1', prioridad: 'ALTA', objetivo: 'SR-1 · EQUIPO DE REVISIÓN: nombrar al revisor humano #2 ANTES de PROSPERO (opciones: Dr. Ciro · egresado UNCP con interés en investigación · colaborador IMG de la campaña); ofrecer coautoría por 2º cribado + extracción; cuenta Rayyan (gratis ≤3 revisiones)', entregable: 'Revisor #2 propuesto (nombre, afiliación, ORCID, conflicto) + invitación enviada', artefacto: 'lines/L4-complicaciones.md §9 "Equipo de revisión" rellenado + MENTORES.md', tool: 'Rayyan', recs: ['RAY', 'PROS', 'COCHB'], chips: ['PRISMA 2020 ítem 8 y Cochrane exigen ≥2 revisores independientes; 2 pases de la misma persona NO son cribado dual'], apex: null },
  // CR · Case report (CARE)
  { d: 29, fecha: '2026-11-25', ciclo: 1, fase: 'CR', pista: 'CR', code: 'CR-6', prioridad: 'ALTA', objetivo: 'Revisión del case report por el senior author (mentor local) + mentor de Rising Scholars (inglés): incorporar cambios y verificar cada afirmación clínica contra fuente primaria', entregable: 'v2 con comentarios del senior + inglés revisado · estado case-report-1 → revision-mentor', artefacto: 'CASE_REPORT_1/borrador_v2.md', tool: 'Senior author · Rising Scholars', recs: ['RISING', 'CARE'], apex: null },
  // X · Transversal · cierre
  { d: 30, fecha: '2026-11-27', ciclo: 1, fase: 'X', pista: 'C', code: 'X-2', prioridad: 'MEDIA', objetivo: 'Post-submit de la carta: plantilla de rebuttal punto por punto (comentario → respuesta → cambio exacto) + actualizar el estado real (en-revisión / decisión) en la Mesa editorial; si llegó decisión, responder en ≤7 días', entregable: 'Plantilla de rebuttal lista + estado real de carta-1', artefacto: 'CARTA_1/rebuttal_plantilla.md + Mesa editorial', tool: 'Mesa editorial', recs: ['REBUTTAL', 'SCIWRITE'], apex: null },
  // CR · Case report (CARE)
  { d: 31, fecha: '2026-12-01', ciclo: 1, fase: 'CR', pista: 'CR', code: 'CR-7', prioridad: 'ALTA', objetivo: 'Formateo a Dermatology Online Journal (eScholarship): guías de autor (A VERIFICAR: límite de palabras / fotos / coste ≤US$300), refs verificadas con citation_verifier.py, figuras con leyenda, consentimiento adjunto', entregable: 'Manuscrito formateado + refs verified + figuras + consentimiento + cover letter', artefacto: 'CASE_REPORT_1/case_report_final.docx + refs_verified.json + cover_letter.md', tool: 'citation_verifier.py · eScholarship', recs: ['DOJ', 'CROSSREF', 'CARE'], apex: null },
  { d: 32, fecha: '2026-12-03', ciclo: 1, fase: 'CR', pista: 'CR', code: 'CR-8', prioridad: 'CRITICA', objetivo: 'Paquete de envío CONGELADO (manuscrito + fotos + consentimiento + CARE + cover) — el SUBMIT se ejecuta el 1-feb-2027 (ciclo 2 · CR-9), después del Step 1', entregable: 'Paquete completo y revisado; nada pendiente para febrero · estado → revision-mentor', artefacto: 'CASE_REPORT_1/_PAQUETE_ENVIO/ (todo lo que se sube) + Mesa editorial: fecha objetivo 1-feb', tool: '—', recs: ['CARE', 'DOJ'], apex: { id: 'cr-paquete', t: 'Case report listo para enviar' } },
  // R0 · Cimientos & infra
  { d: 33, fecha: '2026-12-07', ciclo: 1, fase: 'R0', pista: 'R', code: 'R3', prioridad: 'ALTA', objetivo: 'Ver una SR de punta a punta (8 fases) + des-riesgar el meta-análisis: instalar R + metafor y reproducir 1 forest plot del libro "Doing Meta-Analysis in R" (para que R29-R33 del ciclo 2 no sean la primera vez)', entregable: 'Esquema de las 8 fases con su herramienta + script R que reproduce un forest plot de ejemplo', artefacto: 'Vault SR-1/_hoja_de_ruta (8 fases) + 05_manuscrito/ejemplo_metafor.R', tool: 'R · metafor', recs: ['STEPSR', 'DMAR', 'METAFOR'], apex: { id: 'sr-map', t: '8 fases + metafor instalado' } },
  // R1 · Pregunta & protocolo
  { d: 34, fecha: '2026-12-09', ciclo: 1, fase: 'R1', pista: 'R', code: 'R8', prioridad: 'ALTA', objetivo: 'Protocolo PRISMA-P de SR-1: borrador de secciones (pregunta, elegibilidad, fuentes, estrategia, selección con 2 revisores, extracción doble, sesgo, síntesis) — se congela en el ciclo 2', entregable: 'Borrador de protocolo (secciones PRISMA-P) con huecos marcados [PROTOCOL GAP]', artefacto: 'Vault SR-1/01_protocolo_PICO/protocolo_PRISMA-P_v0.md', tool: '—', recs: ['PRISMA', 'COCHB'], apex: null },
  { d: 35, fecha: '2026-12-11', ciclo: 1, fase: 'R1', pista: 'R', code: 'R9', prioridad: 'ALTA', objetivo: '¿Existe ya una SR publicada o registrada del mismo PICO? Búsqueda en PROSPERO + PubMed ("systematic review" filler vascular occlusion hyaluronidase) → decisión seguir / afinar el ángulo (tiempo-a-tratamiento + LATAM)', entregable: 'Lista de SR y registros vecinos + decisión escrita (seguir / afinar) en L4 §6', artefacto: 'lines/L4-complicaciones.md §6 actualizado', tool: 'PROSPERO · PubMed', recs: ['PROS', 'PM', 'AMSTAR'], apex: null },
  // X · Transversal · cierre
  { d: 36, fecha: '2026-12-15', ciclo: 1, fase: 'X', pista: 'R', code: 'X-3', prioridad: 'MEDIA', objetivo: 'Corpus SR-1 YA descubierto: inventariar los 200 registros de research_papers (pending_human desde 11-jun-2026; 151 OA sin PDF resuelto) — contar, exportar CSV (título, autores, año, DOI, abstract) y NO re-correr discovery hasta tener la query PRISMA-S final (ciclo 2 · R12)', entregable: 'CSV del corpus + nota de estado (n, OA, duplicados por DOI)', artefacto: 'Vault SR-1/02_busqueda/corpus_2026-06_inventario.csv + nota', tool: 'Supabase (consola) · Sheets', recs: ['RAY', 'UNPAY'], apex: null },
  { d: 37, fecha: '2026-12-17', ciclo: 1, fase: 'X', pista: 'B', code: 'X-4', prioridad: 'MEDIA', objetivo: 'Congresos con abstract alcanzable (AAD · CILAD · RADLA): verificar en la web oficial la fecha límite de abstracts 2027 y el formato; elegir 1 al que llegue la tesis o la SR-1 preliminar', entregable: '1 congreso elegido con deadline VERIFICADO (URL + fecha) o marcado "A VERIFICAR"', artefacto: 'DATA/RESEARCH/MENTORES.md §Congresos con la fecha verificada', tool: 'Web oficial de cada congreso', recs: ['SCIWRITE', 'PHRASE'], apex: null },
  { d: 38, fecha: '2026-12-21', ciclo: 1, fase: 'X', pista: 'K', code: 'X-5', prioridad: 'MEDIA', objetivo: 'Campaña de cold emails (feb-mar 2027): lista de 20-30 autores de papers recientes del corpus SR-1 y de L5 (fototipos IV-VI) con el trabajo concreto que ofrezco a cada uno (cribado PRISMA, extracción, draft) — nunca "quiero experiencia"', entregable: 'Lista de 20-30 nombres (paper · email institucional · oferta concreta) + plantilla de email de 8 líneas', artefacto: 'MENTORES.md §Campaña feb-2027 (tabla) + plantilla', tool: 'Corpus SR-1 · OpenAlex (autores)', recs: ['OPENALEX', 'PHRASE', 'ICMJE'], apex: null },
  { d: 39, fecha: '2026-12-23', ciclo: 1, fase: 'X', pista: 'X', code: 'X-6', prioridad: 'ALTA', objetivo: 'Retro del ciclo 1 + Mesa editorial: estado REAL de carta-1 / tesis-L0 / case-report-1 (enviado · en-revisión · decisión), MENTORES.md al día, presupuesto 2026-27 (carta $0 · tesis $0-APC · case report ≤$300 · SR-1 $0)', entregable: 'Mesa editorial con los 3 estados reales + presupuesto escrito + 3 lecciones del ciclo', artefacto: 'Mesa editorial (app) + RUTA_PUBLICACION_2027.md §3 presupuesto', tool: 'Mesa editorial', recs: ['COPE', 'ICMJE'], apex: null },
  { d: 40, fecha: '2026-12-29', ciclo: 1, fase: 'X', pista: 'X', code: 'X-7', prioridad: 'CRITICA', objetivo: 'CIERRE ANTES DE LA PAUSA (4→29-ene = 0 átomos · Step 1): nada que venza en enero — rebuttals respondidos o programados, PROSPERO aún NO registrado, revisor #2 confirmado, paquete del case report congelado; el ciclo 2 arranca el 1-feb con el SUBMIT del case report', entregable: 'Checklist de pausa 100 % + primer átomo del ciclo 2 leído', artefacto: 'Mesa editorial: cada entregable con estado y próxima fecha · Vault Dashboard_Research', tool: 'Mesa editorial', recs: ['ICMJE'], apex: { id: 'cierre-c1', t: 'Ciclo 1 cerrado · pausa Step 1' } },
  // CR · Case report (CARE)
  { d: 41, fecha: '2027-02-01', ciclo: 1, fase: 'CR', pista: 'CR', code: 'CR-9', prioridad: 'CRITICA', objetivo: 'SUBMIT case report #1 a Dermatology Online Journal (paquete congelado en CR-8) + registrar el nº de manuscrito — primer día-Research tras el Step 1', entregable: 'Case report ENVIADO ✅ · estado case-report-1 → enviado', artefacto: 'Mesa editorial: case-report-1 = enviado (fecha)', tool: 'eScholarship', recs: ['DOJ', 'CARE'], apex: { id: 'cr-submit', t: 'Case report #1 enviado' } },
  // X · Transversal · cierre
  { d: 42, fecha: '2027-02-03', ciclo: 1, fase: 'X', pista: 'X', code: 'X-8', prioridad: 'ALTA', objetivo: 'Re-arranque post-Step 1: repasar las 8 fases de una SR + estado de carta / tesis / case report en la Mesa editorial (decisiones recibidas, rebuttals pendientes) + revisar que las 10 cuentas de la infra siguen activas', entregable: 'Mesa editorial al día + lista de pendientes editoriales', artefacto: 'Mesa editorial + Dashboard_Research', tool: 'Mesa editorial', recs: ['STEPSR', 'REBUTTAL'], apex: null },
];

/** Hitos editoriales (fecha objetivo de cada entregable = fecha del átomo que lo cierra; ambos ciclos). */
export const RESEARCH_HITOS: Record<string, { code: string; fecha: string; ciclo: number; d: number }> = {
  'mentor': { code: 'M1', fecha: '2026-09-14', ciclo: 1, d: 3 },
  'carta-diana': { code: 'C-2', fecha: '2026-09-22', ciclo: 1, d: 6 },
  'carta-1': { code: 'C-6', fecha: '2026-10-12', ciclo: 1, d: 13 },
  'tesis-etica': { code: 'T-1', fecha: '2026-10-14', ciclo: 1, d: 14 },
  'cr-caso': { code: 'CR-1', fecha: '2026-10-28', ciclo: 1, d: 19 },
  'tesis-L0': { code: 'T-8', fecha: '2026-11-17', ciclo: 1, d: 26 },
  'revisor2': { code: 'X-1', fecha: '2026-11-23', ciclo: 1, d: 28 },
  'cr-paquete': { code: 'CR-8', fecha: '2026-12-03', ciclo: 1, d: 32 },
  'case-report-1': { code: 'CR-9', fecha: '2027-02-01', ciclo: 1, d: 41 },
  'equipo': { code: 'X-9', fecha: '2027-02-11', ciclo: 2, d: 45 },
  'PROSPERO-SR1': { code: 'R10', fecha: '2027-02-17', ciclo: 2, d: 47 },
  'SR-1': { code: 'R43', fecha: '2027-06-29', ciclo: 2, d: 94 },
};

export function diaDe(fechaISO: string): DiaResearch | undefined { return DIAS.find((x) => x.fecha === fechaISO); }
export function diaPrevio(d: DiaResearch, lista: DiaResearch[] = DIAS): DiaResearch | undefined { return lista.find((x) => x.d === d.d - 1); }
export function ventana7d(fromD: number, lista: DiaResearch[] = DIAS): DiaResearch[] { return lista.filter((x) => x.d >= fromD && x.d < fromD + 7); }
/** Átomo activo para una fecha: el de hoy si es día-research, si no el próximo (>=), si no el último. */
export function proximoD(fechaISO: string, lista: DiaResearch[] = DIAS): number {
  const exact = lista.find((x) => x.fecha === fechaISO);
  if (exact) return exact.d;
  const next = lista.find((x) => x.fecha > fechaISO);
  if (next) return next.d;
  if (lista.length && fechaISO < lista[0].fecha) return lista[0].d;
  return lista[lista.length - 1].d;
}
