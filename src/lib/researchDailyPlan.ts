/**
 * researchDailyPlan.ts — Plan DÍA A DÍA de Research (revisiones sistemáticas).
 * Mismo motor que usmleStep1Daily.ts pero para el programa de SR hacia Mayo/Bioclinic.
 * 40 átomos + 2 colchón (vie 12-jun-2026 → 2026-10-06), 1 átomo por DÍA-RESEARCH.
 * Ritmo INTERDIARIO con Derma (ver researchData.ts → diaEstudioTipo): un día hábil sí,
 * uno no. El bloque del Calendar 13:30–14:15 alterna Research↔Derma — NO se toca el Calendar.
 *
 * Fuente única: DATA/RESEARCH/daily-plan.md (este fichero es su versión drop-in para la app).
 * A diferencia del USMLE (aprender contenido), Research = aprender el método EJECUTANDO una SR
 * real (SR-1, Línea 4: complicaciones vasculares de fillers). Cada átomo deja un ARTEFACTO.
 */
import { Prioridad } from './researchData';

export const DAILY_META = {
  inicio: '2026-06-26', fin: '2026-10-20', totalDias: 42, // D1=Lun 2026-06-22 (1er slot-research ≥19-jun; 19-jun=Derma, finde libre) · alterna con Derma · +2 colchón
  bloque: '13:30–14:15 (boards · alterna con Derma) · 1 átomo-research por día-Research',
  artefacto: 'SR-1 · Complicaciones vasculares de fillers + tiempo-a-tratamiento (Línea 4 · Mayo 38/40)',
};

/** Franjas del bloque Research (45 min). Mezcla eval anclada + deep work productivo. */
export const FRANJAS = [
  { hora: '13:30–13:35', fase: 'Eval anclada del átomo PREVIO: 2Q de auto-test del método + ¿avanzó el entregable de ayer?', tipo: 'eval' },
  { hora: '13:35–13:40', fase: 'Pre-test / free-recall 60s del objetivo de HOY (¿qué sé ya de este paso?)', tipo: 'pretest' },
  { hora: '13:40–14:05', fase: 'DEEP WORK (25min): ver el recurso real del átomo MIENTRAS ejecutas el entregable sobre la SR viva', tipo: 'work' },
  { hora: '14:05–14:10', fase: 'Free recall a papel + log (gap método / razonamiento / herramienta)', tipo: 'recall' },
  { hora: '14:10–14:15', fase: 'Crear ≤3 APEX-método (Palmerton) + guardar el artefacto (PROSPERO/Rayyan/Zotero/.docx)', tipo: 'apex' },
];

/** Leyenda de recursos verificados (mismas URLs que DATA/RESEARCH/daily-plan.md §7). */
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
};

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

export type FaseId = 'R0' | 'R1' | 'R2' | 'R3' | 'R4' | 'R5' | 'R6' | 'R7' | 'R8';
export const FASE_INFO: Record<FaseId, { nombre: string; color: string; pilar: string }> = {
  R0: { nombre: 'Cimientos & método', color: '#0FD4A0', pilar: 'base' },
  R1: { nombre: 'Pregunta & protocolo', color: '#0FD4A0', pilar: 'Reporte' },
  R2: { nombre: 'Registro PROSPERO', color: '#2E7CF6', pilar: 'Registro' },
  R3: { nombre: 'Búsqueda N bases', color: '#2E7CF6', pilar: 'Reporte' },
  R4: { nombre: 'Screening', color: '#F5A623', pilar: 'Conducción' },
  R5: { nombre: 'Extracción', color: '#F5A623', pilar: 'Conducción' },
  R6: { nombre: 'Sesgo & GRADE', color: '#F56342', pilar: 'Evaluación' },
  R7: { nombre: 'Meta-análisis en R', color: '#A78BFA', pilar: 'Conducción' },
  R8: { nombre: 'Manuscrito & envío', color: '#F56342', pilar: 'Reporte' },
};

export interface DiaResearch {
  d: number; fecha: string; fase: FaseId; code: string; prioridad: Prioridad;
  objetivo: string; entregable: string; tool: string; recs: string[];
  apex?: { id: string; t: string } | null;
}

export const DIAS: DiaResearch[] = [
  // R0 · Cimientos & método
  { d: 1,  fecha: '2026-06-26', fase: 'R0', code: 'R1',  prioridad: 'CRITICA', objetivo: 'Montar la infra: cuenta NCBI + key OpenAlex (gratis) + alerta PubMed; citas por IA (no Zotero)', entregable: 'Cuenta NCBI + API key OpenAlex + 1 alerta + 3 case reports modelo', tool: 'OpenAlex · PubMed', recs: ['OPENALEX', 'PM'], apex: { id: 'infra', t: 'Infra del motor lista (key OpenAlex)' } },
  { d: 2,  fecha: '2026-06-30', fase: 'R0', code: 'R2',  prioridad: 'CRITICA', objetivo: 'Formular preguntas en PICO y distinguir tipos (terapia/dx/pronóstico)', entregable: '3 PICO escritos (1 será el de SR-1)', tool: '—', recs: ['CIL1', 'GREEN'], apex: null },
  { d: 3,  fecha: '2026-07-02', fase: 'R0', code: 'R3',  prioridad: 'CRITICA', objetivo: 'Diseños de estudio y niveles de evidencia (case report vs original)', entregable: 'Mapa 1-página: diseño → nivel → sesgos típicos', tool: '—', recs: ['STEPSR', 'STAT', 'ZED'], apex: null },
  { d: 4,  fecha: '2026-07-06', fase: 'R0', code: 'R4',  prioridad: 'ALTA',    objetivo: 'Cómo leer un paper críticamente (método Greenhalgh)', entregable: '1 abstract del nicho leído con plantilla PICO + tipo de estudio', tool: '—', recs: ['GREEN'], apex: null },
  { d: 5,  fecha: '2026-07-08', fase: 'R0', code: 'R5',  prioridad: 'CRITICA', objetivo: 'Ver una SR de punta a punta (visión global antes de ejecutar)', entregable: 'Esquema de las 8 fases con la herramienta de cada una', tool: '—', recs: ['STEPSR', 'CIL1'], apex: { id: 'sr-map', t: 'Las 8 fases de una SR' } },
  // R1 · Pregunta & protocolo
  { d: 6,  fecha: '2026-07-10', fase: 'R1', code: 'R6',  prioridad: 'CRITICA', objetivo: 'Fijar el PICO de SR-1 (complicaciones vasculares de fillers) + 1 outcome primario', entregable: 'PICO de SR-1 escrito y validado contra la ficha L4', tool: '—', recs: ['DELO', 'CIL1'], apex: { id: 'pico-sr1', t: 'PICO de SR-1' } },
  { d: 7,  fecha: '2026-07-14', fase: 'R1', code: 'R7',  prioridad: 'CRITICA', objetivo: 'Criterios de elegibilidad (inclusión/exclusión) y diseños admitidos', entregable: 'Tabla de criterios PICOS de SR-1', tool: '—', recs: ['COCHB'], apex: null },
  { d: 8,  fecha: '2026-07-16', fase: 'R1', code: 'R8',  prioridad: 'ALTA',    objetivo: 'Protocolo PRISMA-P (estructura, qué congela)', entregable: 'Borrador de protocolo SR-1 (secciones PRISMA-P)', tool: '—', recs: ['PRISMA', 'COCHB'], apex: null },
  { d: 9,  fecha: '2026-07-20', fase: 'R1', code: 'R9',  prioridad: 'ALTA',    objetivo: '¿Hay SR ya publicada/registrada del mismo PICO?', entregable: 'Búsqueda en PROSPERO + PubMed → decisión seguir/afinar', tool: 'PROSPERO', recs: ['PROS', 'PM'], apex: null },
  // R2 · Registro PROSPERO
  { d: 10, fecha: '2026-07-22', fase: 'R2', code: 'R10', prioridad: 'CRITICA', objetivo: 'Rellenar el formulario PROSPERO (campos obligatorios)', entregable: 'Registro PROSPERO de SR-1 ENVIADO', tool: 'PROSPERO', recs: ['PROS'], apex: { id: 'prospero', t: 'SR-1 registrada (CRD)' } },
  { d: 11, fecha: '2026-07-24', fase: 'R2', code: 'R11', prioridad: 'MEDIA',   objetivo: 'Plan B si no encaja (scoping → OSF) + esperar CRD', entregable: 'CRD recibido o registro en OSF; protocolo congelado', tool: 'OSF', recs: ['PROS', 'OSF'], apex: null },
  // R3 · Búsqueda N bases
  { d: 12, fecha: '2026-07-28', fase: 'R3', code: 'R12', prioridad: 'CRITICA', objetivo: 'Estrategia maestra: OpenAlex (troncal, booleana) + MeSH en MEDLINE/PubMed', entregable: 'Query booleana de SR-1 en OpenAlex + sintaxis PubMed (líneas numeradas)', tool: 'OpenAlex · PubMed', recs: ['OPENALEX', 'NLM1', 'PM'], apex: { id: 'mesh', t: 'Query OpenAlex + MeSH' } },
  { d: 13, fecha: '2026-07-30', fase: 'R3', code: 'R13', prioridad: 'ALTA',    objetivo: 'Trasladar a Europe PMC + CENTRAL + Semantic Scholar (5 fuentes)', entregable: 'Sintaxis + nº de resultados por fuente', tool: 'Europe PMC · S2', recs: ['EPMC', 'CENT', 'SEMSCH'], apex: null },
  { d: 14, fecha: '2026-08-03', fase: 'R3', code: 'R14', prioridad: 'ALTA',    objetivo: 'LILACS/BVS (ventaja LATAM) + registros de ensayos', entregable: 'Búsqueda LILACS + ClinicalTrials.gov + ICTRP anotada', tool: 'LILACS · CT.gov', recs: ['LILACS', 'CT', 'ICTRP'], apex: null },
  { d: 15, fecha: '2026-08-05', fase: 'R3', code: 'R15', prioridad: 'ALTA',    objetivo: 'PRISMA-S (16 ítems): documentar cada componente', entregable: 'Tabla PRISMA-S de SR-1 (fecha, base, interfaz, sintaxis, nº)', tool: '—', recs: ['PRISMAS'], apex: null },
  { d: 16, fecha: '2026-08-07', fase: 'R3', code: 'R16', prioridad: 'MEDIA',   objetivo: 'Texto completo (cascada Unpaywall→…) + dedup por DOI → cribado', entregable: 'PDFs OA resueltos + biblioteca dedup lista para Rayyan', tool: 'Unpaywall · Rayyan', recs: ['UNPAY', 'RAY'], apex: null },
  // R4 · Screening
  { d: 17, fecha: '2026-08-11', fase: 'R4', code: 'R17', prioridad: 'CRITICA', objetivo: 'Montar Rayyan y subir el corpus; etiquetas y ciego', entregable: 'Proyecto Rayyan de SR-1 con todos los registros', tool: 'Rayyan', recs: ['RAY', 'RAYHC', 'RAYYT'], apex: { id: 'rayyan', t: 'Cribado en Rayyan' } },
  { d: 18, fecha: '2026-08-13', fase: 'R4', code: 'R18', prioridad: 'CRITICA', objetivo: 'Cribado título/abstract (nivel 1), 2 revisores o 2 pases', entregable: 'Nivel 1 completado; conflictos marcados', tool: 'Rayyan', recs: ['RAY'], apex: null },
  { d: 19, fecha: '2026-08-17', fase: 'R4', code: 'R19', prioridad: 'ALTA',    objetivo: 'Texto completo (nivel 2) con razones de exclusión', entregable: 'Excluidos con motivo (alimenta el flujo PRISMA)', tool: 'Rayyan', recs: ['RAY'], apex: null },
  { d: 20, fecha: '2026-08-19', fase: 'R4', code: 'R20', prioridad: 'ALTA',    objetivo: 'Kappa interobservador (acuerdo de inclusión) en Python/R', entregable: 'κ calculado + IC; conflictos a checkpoint humano', tool: 'Python/R', recs: ['STEPSR'], apex: null },
  { d: 21, fecha: '2026-08-21', fase: 'R4', code: 'R21', prioridad: 'ALTA',    objetivo: 'Diagrama de flujo PRISMA 2020 (4 fases, vías separadas)', entregable: 'PRISMA flow de SR-1 con números reales', tool: 'eshackathon Shiny', recs: ['PRISMAF'], apex: { id: 'prisma-flow', t: 'Diagrama PRISMA 2020' } },
  // R5 · Extracción
  { d: 22, fecha: '2026-08-25', fase: 'R5', code: 'R22', prioridad: 'ALTA',    objetivo: 'Formulario de extracción piloteado (qué variables)', entregable: 'Plantilla de extracción de SR-1 (diseño, n, outcomes, sesgo)', tool: 'Sheets', recs: ['COCHB'], apex: null },
  { d: 23, fecha: '2026-08-27', fase: 'R5', code: 'R23', prioridad: 'ALTA',    objetivo: 'Piloto de extracción en 2-3 estudios + ajustar formulario', entregable: 'Formulario v2 + 3 filas piloto', tool: '—', recs: ['COCHB'], apex: null },
  { d: 24, fecha: '2026-08-31', fase: 'R5', code: 'R24', prioridad: 'MEDIA',   objetivo: 'Extracción asistida (Elicit) como segundo par de ojos', entregable: 'Filas extraídas de los incluidos (doble chequeo)', tool: 'Elicit', recs: ['ELI'], apex: null },
  { d: 25, fecha: '2026-09-02', fase: 'R5', code: 'R25', prioridad: 'MEDIA',   objetivo: 'Cerrar la tabla de características de estudios', entregable: 'Tabla completa de SR-1 (lista para Results)', tool: '—', recs: ['COCHB'], apex: { id: 'extraction', t: 'Tabla de extracción cerrada' } },
  // R6 · Sesgo & GRADE
  { d: 26, fecha: '2026-09-04', fase: 'R6', code: 'R26', prioridad: 'ALTA',    objetivo: 'Riesgo de sesgo: RoB 2 (ECA) / ROBINS-I (no-aleatorizados)', entregable: 'Evaluación RoB por estudio incluido', tool: 'riskofbias.info', recs: ['ROB2', 'ROBINS'], apex: { id: 'rob', t: 'Riesgo de sesgo evaluado' } },
  { d: 27, fecha: '2026-09-08', fase: 'R6', code: 'R27', prioridad: 'ALTA',    objetivo: 'GRADE (4 niveles, 5 dominios) + Summary of Findings', entregable: 'SoF table de SR-1 por desenlace', tool: 'GRADEpro', recs: ['GRADE'], apex: null },
  { d: 28, fecha: '2026-09-10', fase: 'R6', code: 'R28', prioridad: 'MEDIA',   objetivo: 'AMSTAR-2 para apreciar SR vecinas y posicionar la nuestra', entregable: 'Nota AMSTAR-2 sobre 2-3 SR previas del tema', tool: '—', recs: ['AMSTAR'], apex: null },
  // R7 · Meta-análisis en R
  { d: 29, fecha: '2026-09-14', fase: 'R7', code: 'R29', prioridad: 'ALTA',    objetivo: 'Montar R + metafor/meta y cargar los datos extraídos', entregable: 'Script R que lee la tabla y calcula 1 effect size', tool: 'R', recs: ['DMAR', 'METAFOR'], apex: { id: 'r-setup', t: 'metafor cargado' } },
  { d: 30, fecha: '2026-09-16', fase: 'R7', code: 'R30', prioridad: 'ALTA',    objetivo: 'Tamaño de efecto correcto + modelo fijo vs aleatorio', entregable: 'Pooled estimate con IC95%', tool: 'R', recs: ['DMAR'], apex: null },
  { d: 31, fecha: '2026-09-18', fase: 'R7', code: 'R31', prioridad: 'ALTA',    objetivo: 'Forest plot + heterogeneidad (I², τ²)', entregable: 'Forest plot TIFF 300 dpi + I²/τ² reportados', tool: 'R', recs: ['DMAR', 'METAFOR', 'COCHYT'], apex: { id: 'forest', t: 'Forest plot + heterogeneidad' } },
  { d: 32, fecha: '2026-09-22', fase: 'R7', code: 'R32', prioridad: 'MEDIA',   objetivo: 'Sesgo de publicación: funnel plot + test de Egger', entregable: 'Funnel + Egger de SR-1', tool: 'R', recs: ['DMAR'], apex: null },
  { d: 33, fecha: '2026-09-24', fase: 'R7', code: 'R33', prioridad: 'MEDIA',   objetivo: 'Subgrupos/sensibilidad (tiempo-a-hialuronidasa, zona, training)', entregable: 'Análisis de subgrupos + sensibilidad', tool: 'R', recs: ['DMAR'], apex: null },
  // R8 · Manuscrito & envío
  { d: 34, fecha: '2026-09-28', fase: 'R8', code: 'R34', prioridad: 'ALTA',    objetivo: 'Methods + Results con PRISMA 2020 (registro, búsqueda, flujo, síntesis)', entregable: 'Methods+Results de SR-1 redactados', tool: 'Sistema agéntico', recs: ['PRISMA', 'PRISMAC'], apex: { id: 'methods-results', t: 'Methods+Results escritos' } },
  { d: 35, fecha: '2026-09-30', fase: 'R8', code: 'R35', prioridad: 'ALTA',    objetivo: 'Introduction (gap + objetivo) y Discussion (límites + certeza)', entregable: 'Intro+Discussion de SR-1 redactados', tool: 'Sistema agéntico', recs: ['EQ', 'PRISMAC'], apex: null },
  { d: 36, fecha: '2026-10-02', fase: 'R8', code: 'R36', prioridad: 'ALTA',    objetivo: 'Checklist PRISMA 2020 de 27 ítems + supplementary', entregable: 'Checklist 27 ítems marcada + supplements (PRISMA-S, SoF, CRD)', tool: '—', recs: ['PRISMAC'], apex: null },
  { d: 37, fecha: '2026-10-06', fase: 'R8', code: 'R37', prioridad: 'MEDIA',   objetivo: 'Elegir journal + APC (Diamond OA vs 50% LMIC, Research4Life)', entregable: 'Journal target decidido + plan de coste', tool: '—', recs: ['EQ'], apex: null },
  { d: 38, fecha: '2026-10-08', fase: 'R8', code: 'R38', prioridad: 'MEDIA',   objetivo: 'Cover letter + formateo al journal (Editorial Manager/ScholarOne)', entregable: 'Cover letter + manuscrito formateado', tool: '—', recs: ['EQ'], apex: null },
  { d: 39, fecha: '2026-10-12', fase: 'R8', code: 'R39', prioridad: 'CRITICA', objetivo: 'CHECKPOINT HUMANO (HITL): verificar citas reales por IA (Crossref/PMID + CSL-JSON), paráfrasis, cadena estadística', entregable: 'Word .docx revisado y aprobado por Joseph', tool: 'Crossref · PubMed', recs: ['CROSSREF', 'PRISMAC'], apex: { id: 'hitl', t: 'Checkpoint humano CP-4' } },
  { d: 40, fecha: '2026-10-14', fase: 'R8', code: 'R40', prioridad: 'CRITICA', objetivo: 'SUBMIT SR-1 + abrir SR-2 (Línea 5, fototipos IV–VI): registrar nuevo PICO', entregable: 'SR-1 enviada ✅ + PICO de SR-2 borrador', tool: 'Editorial Manager', recs: ['PROS'], apex: { id: 'submit', t: 'SR-1 enviada · SR-2 abierta' } },

  { d: 41, fecha: '2026-10-16', fase: 'R8', code: 'RC1', prioridad: 'BAJA', objetivo: 'COLCHÓN 1 · Cerrar flecos: terminar cualquier átomo a medias + re-correr el checklist PRISMA de SR-1', entregable: 'SR-1 sin pendientes abiertos', tool: 'Rayyan · Zotero', recs: ['PM'], apex: null },
  { d: 42, fecha: '2026-10-20', fase: 'R8', code: 'RC2', prioridad: 'BAJA', objetivo: 'COLCHÓN 2 · Retro del método: qué automatizar para SR-2 (notas para el sistema agéntico)', entregable: 'Lista de mejoras + arranque de plan SR-2', tool: 'Obsidian', recs: ['PM'], apex: null },];

export function diaDe(fechaISO: string): DiaResearch | undefined { return DIAS.find((x) => x.fecha === fechaISO); }
export function diaPrevio(d: DiaResearch): DiaResearch | undefined { return DIAS.find((x) => x.d === d.d - 1); }
export function ventana7d(fromD: number): DiaResearch[] { return DIAS.filter((x) => x.d >= fromD && x.d < fromD + 7); }
/** Átomo activo para una fecha: el de hoy si es día-research, si no el próximo (>=), si no el último. */
export function proximoD(fechaISO: string): number {
  const exact = DIAS.find((x) => x.fecha === fechaISO);
  if (exact) return exact.d;
  const next = DIAS.find((x) => x.fecha > fechaISO);
  if (next) return next.d;
  if (DIAS.length && fechaISO < DIAS[0].fecha) return DIAS[0].d;
  return DIAS[DIAS.length - 1].d;
}
