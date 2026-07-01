/**
 * researchData.ts — Sección Research (camino a Mayo Clinic).
 * Data destilada del dossier STUDY_HUB/01_RESEARCH_MAYO_path.md + 06b pipeline.
 * Estructura estilo ENCAPS: prioridad → vueltas (repetición espaciada) → deadline → links.
 * Alternancia Research↔Derma — ANCLA de paridad: 2026-06-10 (no mover: define qué día
 * hábil es Research [par] y cuál Derma [impar]). El estudio REAL arranca el 11-jun-2026:
 * Derma D1 = jue 11-jun, Research D1 = vie 12-jun (el 10-jun no se estudió).
 */

export type Prioridad = 'CRITICA' | 'ALTA' | 'MEDIA' | 'BAJA';

export const VUELTAS: Record<Prioridad, number> = { CRITICA: 6, ALTA: 5, MEDIA: 4, BAJA: 3 };
export const INTERVALOS: Record<Prioridad, number[]> = {
  CRITICA: [1, 3, 7, 28, 63],
  ALTA: [1, 7, 28, 63],
  MEDIA: [3, 28, 63],
  BAJA: [7, 63],
};
// Joya apagada (quiet-luxury) — antes #F56342/#F5A623/#2E7CF6/#8F9097 saturados.
export const PRIORIDAD_COLOR: Record<Prioridad, string> = {
  CRITICA: '#C56A5A', ALTA: '#B8934E', MEDIA: '#4F7DD6', BAJA: '#7C8496',
};

// ── Alternancia Research ↔ Derma (ancla de paridad: mié 10-jun-2026) ──
// Cuenta días hábiles (L–V) desde el 10-jun: par → research, impar → derma.
// El 10-jun no se estudió (solo fija la paridad): Derma=11-jun, Research=12-jun.
export function diaEstudioTipo(date: Date): 'research' | 'derma' | 'descanso' {
  const dow = date.getDay(); // 0 dom .. 6 sáb
  if (dow === 0 || dow === 6) return 'descanso';
  const start = new Date(2026, 5, 10); // 10 jun 2026 (mes 0-index)
  start.setHours(0, 0, 0, 0);
  const d = new Date(date); d.setHours(0, 0, 0, 0);
  if (d < start) return 'research'; // antes de arrancar, default research
  // contar días hábiles entre start y d (inclusive de start, exclusive de d)
  let count = 0;
  const cur = new Date(start);
  while (cur < d) {
    const wd = cur.getDay();
    if (wd !== 0 && wd !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count % 2 === 0 ? 'research' : 'derma';
}

export const RESEARCH_META = {
  titulo: 'Research',
  subtitulo: 'De cero a publicado — el camino a Mayo Clinic',
  accent: '#6BB8B0', // teal apagado (Colors.teal · quiet-luxury) — antes #0FD4A0 neón
  tesis: 'La aguja la mueven las publicaciones indexadas reales (no el "27.7" de marketing). Meta para competir: ~3 PIPs; nivel Mayo-stretch: 8–15, con 2+ de original research first-author.',
  cuelloBotella: 'El cuello de botella NO es escribir — es conseguir un dermatólogo-mentor con quien co-publicar y acceso a casos. Tarea #1: asegurar mentor desde la semana 1.',
};

// Mega-stat + anillos del cockpit
export const RESEARCH_KPIS = {
  pipsActuales: 0,
  pipsParaCompetir: 3,
  pipsMayo: 10,
  primerSubmissionMes: 3,
  readiness: 6, // % madurez del perfil research
};

// Targets de publicación (mix realista)
export const RESEARCH_TARGETS = [
  { tipo: 'Image / Clinical Picture', objetivo: '4–8', peso: 'Bajo · PubMed-indexed', dificultad: 'Muy fácil', prioridad: 'ALTA' as Prioridad },
  { tipo: 'Letter to the Editor', objetivo: '2–4', peso: 'Bajo · rápido', dificultad: 'Muy fácil', prioridad: 'MEDIA' as Prioridad },
  { tipo: 'Case report (CARE)', objetivo: '4–8', peso: 'Medio · rompe el 0', dificultad: 'Fácil', prioridad: 'ALTA' as Prioridad },
  { tipo: 'Narrative review', objetivo: '2–4', peso: 'Medio-alto · cita-magnet', dificultad: 'Media', prioridad: 'MEDIA' as Prioridad },
  { tipo: 'Original research (DB pública)', objetivo: '3–6', peso: 'ALTO · mueve la aguja', dificultad: 'Media-alta', prioridad: 'CRITICA' as Prioridad },
  { tipo: 'First-author original', objetivo: '≥ 2', peso: 'EL MÁS ALTO', dificultad: 'Alta', prioridad: 'CRITICA' as Prioridad },
];

// Ruta por fases (MIR → Mayo)
export const RESEARCH_FASES = [
  { fase: 'A · Ahora', titulo: 'Construir el motor', estado: 'activa',
    desc: 'Pre-residencia. Romper el 0: mentor + pipeline + nicho. Meta 2–4 PIPs antes de residencia.',
    entregable: '1 case report + 2 images/letters + 1 retrospectivo iniciado.' },
  { fase: 'B · Residencia', titulo: 'Compounding clínico', estado: 'futura',
    desc: 'MIR (España) o ENCAPS (Perú). Acceso a pacientes → escalar de 3 a 10+ PIPs. Empezar USMLE.',
    entregable: 'Series de casos + original research clínico + LORs fuertes.' },
  { fase: 'C · Puente EE.UU.', titulo: 'USMLE + ECFMG + fellowship', estado: 'futura',
    desc: 'Step 1 + Step 2 CK + ECFMG + ERAS/NRMP. Research fellowship dedicado 1–2 años (la palanca que vuelve competitivo a un IMG).',
    entregable: '3 LORs (1 de dermatólogo obligatoria) + US-pubs + 1 año intern prelim.' },
  { fase: 'D · Mayo', titulo: 'Research & Innovation Track', estado: 'meta',
    desc: 'Mayo tiene track de research explícito. Entrar es el objetivo; dentro, el compounding sigue a fellowship (Mohs/onco-derm).',
    entregable: 'Residencia/academia en dermatología Mayo.' },
];

export interface ModuloResearch {
  n: number; nombre: string; prioridad: Prioridad; deadline: string; nota: string;
  links: { label: string; url: string }[];
}

export const RESEARCH_MODULOS: ModuloResearch[] = [
  { n: 1, nombre: 'Búsqueda multi-fuente (OpenAlex troncal + 5 fuentes)', prioridad: 'CRITICA', deadline: 'fin S2', nota: 'No solo PubMed. OpenAlex (key gratis, 13-feb-2026) + PubMed + Europe PMC + LILACS + Semantic Scholar ≈97% sensibilidad. MeSH/booleanos + citation-chasing.',
    links: [
      { label: 'OpenAlex · API auth + pricing', url: 'https://developers.openalex.org/api-reference/authentication' },
      { label: 'NLM · PubMed in EBP (MeSH/booleanos)', url: 'https://www.nlm.nih.gov/oet/ed/pubmed/pubmed_in_ebp/index.html' },
      { label: 'Europe PMC · REST', url: 'https://europepmc.org/RestfulWebService' },
    ] },
  { n: 2, nombre: 'Cómo leer un paper (PICO)', prioridad: 'ALTA', deadline: 'fin S3', nota: '1 abstract/día con PICO + "¿qué tipo de estudio es?".',
    links: [
      { label: 'How to Read a Paper — Greenhalgh (BMJ)', url: 'https://www.bmj.com/about-bmj/resources-readers/publications/how-read-paper' },
    ] },
  { n: 3, nombre: 'Diseño de estudios', prioridad: 'CRITICA', deadline: 'fin S5', nota: 'Lo que separa case report de original research. Cohorte, caso-control, sesgos, niveles de evidencia.',
    links: [
      { label: 'Fundamentals of Biostatistics (YouTube ~13h)', url: 'https://www.youtube.com/playlist?list=PLIdSaYrU7oyXPZmw0m0_wjKSInF5XlMSq' },
      { label: 'Biostatistics Full Course (Quinnipiac ~6.5h)', url: 'https://www.youtube.com/watch?v=1Q6_LRZwZrc' },
    ] },
  { n: 4, nombre: 'Escritura IMRaD + CARE', prioridad: 'ALTA', deadline: 'fin S6', nota: 'Tu motor de producción. 13 ítems CARE para case reports.',
    links: [
      { label: 'CARE Statement (case reports)', url: 'https://www.care-statement.org/' },
      { label: 'EQUATOR Network (todos los guidelines)', url: 'https://www.equator-network.org/' },
    ] },
  { n: 5, nombre: 'Estadística básica', prioridad: 'MEDIA', deadline: 'fin S8', nota: 'Solo: p-value, IC95%, OR/RR, chi², t-test, regresión logística básica.',
    links: [
      { label: 'StatQuest (Josh Starmer)', url: 'https://www.youtube.com/@statquest' },
      { label: 'zedstatistics', url: 'https://www.youtube.com/@zedstatistics' },
    ] },
  { n: 6, nombre: 'Bases de datos públicas (original sin pacientes)', prioridad: 'ALTA', deadline: 'fin S10', nota: 'Aquí generas el paper de mayor ROI sin IRB pesado.',
    links: [
      { label: 'JAAD · Free OA data sources for derma', url: 'https://pubmed.ncbi.nlm.nih.gov/33818976/' },
      { label: 'NHANES (CDC)', url: 'https://www.cdc.gov/nchs/nhanes/' },
      { label: 'SEER (cáncer/melanoma)', url: 'https://seer.cancer.gov/' },
    ] },
  { n: 7, nombre: 'Citas verificadas por IA (no Zotero manual)', prioridad: 'MEDIA', deadline: 'al escribir', nota: 'La IA propone; solo persiste lo que resuelve a un DOI/PMID real. Crossref + PubMed + CSL-JSON; formateo con citation.js/anystyle. Gate anti-alucinación.',
    links: [
      { label: 'Crossref · content negotiation (CSL-JSON)', url: 'https://www.crossref.org/documentation/retrieve-metadata/content-negotiation/' },
      { label: 'citation.js (formateo Vancouver/CSL)', url: 'https://citation.js.org/' },
    ] },
];

// Journals para la PRIMERA publicación (los más fáciles desde 0)
export const RESEARCH_JOURNALS = [
  { nombre: 'Cureus', tier: 'B · primer paper', nota: 'El más beginner-friendly: 51% aceptación, ~33 días, ~31% gratis', url: 'https://www.cureus.com/' },
  { nombre: 'JAAD Case Reports', tier: 'B · primer paper', nota: 'Marca JAAD, dermato puro, PubMed-indexed (APC ~$850)', url: 'https://www.sciencedirect.com/journal/jaad-case-reports' },
  { nombre: 'BMJ Case Reports', tier: 'B · primer paper', nota: 'El outlet de case reports más conocido; MEDLINE', url: 'https://casereports.bmj.com/' },
  { nombre: 'Clin Exp Dermatol (letters)', tier: 'B · primer paper', nota: 'Letters & clinical images cortos, sin fee universal', url: 'https://academic.oup.com/ced' },
  { nombre: 'JAAD Intl / Dermatologic Surgery', tier: 'A · alcanzable 2–4 años', nota: 'Original research maduro con mentor', url: 'https://www.jaadinternational.org/' },
  { nombre: 'JAMA Dermatology', tier: 'S · élite', nota: 'Con original research maduro vía mentor', url: 'https://jamanetwork.com/journals/jamadermatology' },
];

// Pipeline agéntico de producción de papers (8 agentes + gates humanos)
export const RESEARCH_PIPELINE = [
  { id: 'A1', nombre: 'Discovery 5 fuentes', desc: 'OpenAlex troncal + PubMed + Europe PMC + LILACS + Semantic Scholar → corpus dedup (≈97%)', tool: 'OpenAlex (key) + 4' },
  { id: 'A2', nombre: 'Texto completo + Screen', desc: 'Cascada Unpaywall→… + pre-screening Ollama local ($0)', tool: 'Unpaywall / Ollama' },
  { id: 'A3', nombre: 'Background', desc: 'Marco teórico desde la evidencia extraída', tool: 'Zotero' },
  { id: 'A4', nombre: 'Introduction', desc: 'Gap + objetivo + hipótesis', tool: '—' },
  { id: 'A5', nombre: 'Methods', desc: 'CARE / STROBE / PRISMA-ScR según tipo', tool: 'EQUATOR' },
  { id: 'A6', nombre: 'Results & Figures', desc: 'Tablas y figuras desde los datos', tool: 'R / Jamovi' },
  { id: 'A7', nombre: 'Writing & Style', desc: 'Redacción IMRaD + estilo del journal', tool: '—' },
  { id: 'A8', nombre: 'Submission', desc: 'Formateo al journal target + checklist', tool: 'Editorial Manager' },
];
export const PIPELINE_NOTA = 'Regla dura: solo OA legal (PMC, Unpaywall, Europe PMC, DOAJ, preprints). CyberLeninka = legal (CC-BY); Sci-Hub = sombra/ilegal en muchas jurisdicciones — no se usa. 5 gates humanos (~10-15 min) entre fases; el humano revisa, no escribe desde cero.';

// Micro-horario sugerido (1h/día, días Research)
export const RESEARCH_HORARIO = [
  { dia: 'Lun', foco: 'Literature search práctico (papers de tu nicho)' },
  { dia: 'Mar', foco: 'Diseño de estudios / bioestadística (video + nota)' },
  { dia: 'Mié', foco: 'Lectura crítica (1 paper completo, método PICO)' },
  { dia: 'Jue', foco: 'Escritura (avanzar draft del case report / images)' },
  { dia: 'Vie', foco: 'Repaso de vueltas vencidas + planificar semana' },
];

// Timeline 0 → primer paper
export const RESEARCH_TIMELINE = [
  { sem: 'S1–S2', foco: 'Infra: NCBI/PubMed, Scholar alert, Zotero, leer 3 case reports modelo', out: 'Sistema listo' },
  { sem: 'S3–S4', foco: 'Conseguir mentor + elegir nicho dermato', out: 'Mentor sí/no' },
  { sem: 'S5–S6', foco: 'Formato CARE + IMRaD. Identificar 1 caso publicable', out: 'Caso elegido' },
  { sem: 'S7–S10', foco: 'Escribir draft + consentimiento + revisión literatura', out: 'Draft 1' },
  { sem: 'S11–S12', foco: 'Iterar con mentor + formatear al journal', out: 'Manuscrito final' },
  { sem: 'S13', foco: 'SUBMIT primer paper', out: '✅ Submitted (~mes 3)' },
];

export const RESEARCH_ADVERTENCIAS = [
  'El cuello de botella es el mentor y el acceso a casos, no escribir. Consigue un dermatólogo-autor desde la semana 1.',
  'El research fellowship en EE.UU. es, en la práctica, casi obligatorio para que un IMG llegue a Mayo. Presupuéstalo.',
  'Dermatología es la especialidad menos accesible para IMGs (<3% de residentes). Objetivo-estiramiento honesto, no garantía.',
  'Cutoffs MIR exactos y cupos no-UE: variables — verifícalos cada convocatoria en fuentes oficiales.',
  'Cuidado con journals predatorios: quédate en PubMed/MEDLINE-indexed (Cureus, BMJ CR, JAAD CR, CED sí lo están).',
];
