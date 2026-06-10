/**
 * researchProgram.ts — Líneas de investigación (L0–L8) + Sistema Agéntico.
 * Data destilada de MD_MAESTRO_BIOCLINIC_RESEARCH.md (§5, §7) y DATA/RESEARCH/agentic-system.md
 * + lines/. Alimenta ResearchLinesExplorer y ResearchAgenticSystem.
 * Regla: cada link abre un SITIO REAL verificado (PubMed seed, journal, papers ancla, docs).
 */

export type Cluster = 'estetica' | 'acne_qol' | 'energia' | 'ia';
export const CLUSTER_COLOR: Record<Cluster, string> = {
  estetica: '#0FD4A0', acne_qol: '#F56342', energia: '#F5A623', ia: '#8B5CF6',
};
export const CLUSTER_LABEL: Record<Cluster, string> = {
  estetica: 'Estética estructural', acne_qol: 'Acné & QoL', energia: 'Energía/fototipos', ia: 'IA en derma',
};

export interface LineaResearch {
  id: number; code: string; nombre: string; cluster: Cluster; mayoScore: number;
  estado: 'completada' | 'activa' | 'pre-protocolo' | 'backlog';
  gap: string; srDerivable: string; srTag: string | null;
  journals: string[]; colaboradores: string[]; cuelloBotella: string;
  pubmedUrl: string;            // seed de búsqueda real
  fichaUrl?: string;            // ficha en el repo (DATA/RESEARCH/lines)
}

const pm = (q: string) => 'https://pubmed.ncbi.nlm.nih.gov/?term=' + encodeURIComponent(q);

export const RESEARCH_LINES: LineaResearch[] = [
  { id: 0, code: 'L0', nombre: 'Acné & Calidad de Vida (tesis · fundación)', cluster: 'acne_qol', mayoScore: 0, estado: 'completada',
    gap: 'Tesis defendida (20-abr-2026): IGA × CADI en adolescentes, Huancayo. rs=0.637, κ=0.81, prevalencia 39.8%.',
    srDerivable: 'Instrumentos de QoL en acné (CADI/DLQI) en LMIC — alimenta L6.', srTag: 'SR-4',
    journals: ['JAAD International'], colaboradores: ['Dr. Ciro Rodríguez'], cuelloBotella: 'En pipeline de titulación; publicar en JAAD International (waiver LMIC).',
    pubmedUrl: pm('acne quality of life CADI DLQI adolescents') },
  { id: 1, code: 'L1', nombre: 'Topografía & Vascularización facial', cluster: 'estetica', mayoScore: 33, estado: 'pre-protocolo',
    gap: 'Anatomía vascular facial casi 100% en caucásicos; CERO estudios indexados de arteria facial en peruanos.',
    srDerivable: 'Variabilidad de la arteria facial y zonas de peligro para fillers — SR.', srTag: 'SR-3',
    journals: ['Dermatologic Surgery', 'PRS'], colaboradores: ['Sebastian Cotofana (vínculo Mayo)', 'Konstantin Frank'], cuelloBotella: 'Protocolo publication-ready aún no escrito (ética + ecógrafo).',
    pubmedUrl: pm('facial artery anatomy danger zones filler injection') },
  { id: 2, code: 'L2', nombre: 'Análisis facial & Envejecimiento', cluster: 'estetica', mayoScore: 33, estado: 'pre-protocolo',
    gap: 'Marco de envejecimiento facial construido en caucásicos; mestizos peruanos ausentes; MD Codes no validados en latinos.',
    srDerivable: 'Patrones de envejecimiento facial en poblaciones no caucásicas — SR.', srTag: 'SR-5',
    journals: ['Journal of Cosmetic Dermatology', 'JAAD International'], colaboradores: ['Mauricio de Maio', 'André Braz', 'Rod Rohrich'], cuelloBotella: 'Institución de ética no definida; protocolo fotográfico no fijado.',
    pubmedUrl: pm('facial aging fat compartments non-caucasian skin of color') },
  { id: 3, code: 'L3', nombre: 'Inyectables & Reología (G-Prime)', cluster: 'estetica', mayoScore: 34, estado: 'pre-protocolo',
    gap: '¿Producto correcto en el plano correcto para latinos, o protocolos europeos a ciegas? HA alta vs baja G-Prime sin datos latinos.',
    srDerivable: 'Reología de fillers (G-Prime) y outcomes por zona — meta-análisis.', srTag: 'SR-6',
    journals: ['Journal of Cosmetic Dermatology', 'Aesthetic Surgery Journal'], colaboradores: ['de Maio', 'Braz'], cuelloBotella: 'Ausencia de datos de enrolamiento (requiere flujo clínico — sinergia Bioclinic).',
    pubmedUrl: pm('hyaluronic acid filler rheology G-prime malar augmentation') },
  { id: 4, code: 'L4', nombre: 'Complicaciones & Seguridad · PERÚ-SAFE', cluster: 'estetica', mayoScore: 38, estado: 'activa',
    gap: 'Sin registro de complicaciones por inyectables en Perú/LATAM; tiempo-a-tratamiento en oclusión vascular nunca documentado regionalmente.',
    srDerivable: 'Complicaciones vasculares de fillers + tiempo-a-tratamiento con hialuronidasa — SR (± meta-análisis).', srTag: 'SR-1',
    journals: ['JAAD', 'Dermatologic Surgery', 'BJD'], colaboradores: ['DeLorenzi (lit. ancla)', 'red PERÚ-SAFE'], cuelloBotella: 'La Fase 2 (survey) arranca sin datos clínicos primarios — accionable inmediato.',
    pubmedUrl: pm('dermal filler vascular occlusion hyaluronidase management'), fichaUrl: 'https://pubmed.ncbi.nlm.nih.gov/24692598/' },
  { id: 5, code: 'L5', nombre: 'Energía (RF/CO₂) en fototipos IV–VI', cluster: 'energia', mayoScore: 30, estado: 'backlog',
    gap: 'RF/CO₂ fraccional poco estudiados en piel de color; alta heterogeneidad y miedo a PIH. Gap real = subgrupo IV–VI.',
    srDerivable: 'RF fraccional/CO₂ en Fitzpatrick IV–VI: eficacia y seguridad, subgrupo por fototipo — SR+MA.', srTag: 'SR-2',
    journals: ['Journal of Cosmetic Dermatology', 'Lasers Surg Med'], colaboradores: ['—'], cuelloBotella: 'Acceso a dispositivos; pero la SR no requiere datos primarios.',
    pubmedUrl: pm('fractional radiofrequency microneedling CO2 skin of color Fitzpatrick IV-VI') },
  { id: 6, code: 'L6', nombre: 'Acné & QoL (programa nacional)', cluster: 'acne_qol', mayoScore: 35, estado: 'pre-protocolo',
    gap: 'Validación CADI español peruano (Cronbach α, ICC); contacto con Finlay (creador CADI) no iniciado — bloquea la línea.',
    srDerivable: 'SR de instrumentos QoL en acné LMIC (deriva de L0).', srTag: 'SR-4',
    journals: ['J Dermatological Treatment', 'JEADV', 'BJD'], colaboradores: ['Prof. Andrew Finlay (Cardiff)', 'Alexa Kimball', 'Jerry Tan'], cuelloBotella: 'Email a Finlay no enviado — desbloquea acceso casi directo a Tier 1.',
    pubmedUrl: pm('CADI acne disability index validation') },
  { id: 7, code: 'L7', nombre: 'Toxina botulínica', cluster: 'estetica', mayoScore: 34, estado: 'backlog',
    gap: 'Masetero (bruxismo/contorno) y frontalis ecoguiados; hiperhidrosis + QoL con ángulo latino.',
    srDerivable: 'BTX en masetero: dosis, técnica ecoguiada y outcomes — meta-análisis.', srTag: 'SR-7',
    journals: ['Dermatologic Surgery', 'JAAD'], colaboradores: ['Doris Hexsel', 'Ki-Young Park', 'Cotofana'], cuelloBotella: 'Requiere casuística clínica.',
    pubmedUrl: pm('botulinum toxin masseter ultrasound guided dose') },
  { id: 8, code: 'L8', nombre: 'Teledermatología & IA', cluster: 'ia', mayoScore: 30, estado: 'backlog',
    gap: 'Dataset PERU-SKIN + CNN para clasificación de lesiones; sesgo de los modelos en piel de color.',
    srDerivable: 'Deep learning para clasificación de acné/lesiones en piel de color — SR.', srTag: 'SR-8',
    journals: ['JAAD', 'JID'], colaboradores: ['Roxana Daneshjou (Stanford)', 'Veronica Rotemberg (MSK)'], cuelloBotella: 'Aprobación ética para colección estandarizada de imágenes.',
    pubmedUrl: pm('deep learning dermatology skin of color classification bias') },
];

// ─────────────────────────────────────────────────────────────────────────
// SISTEMA AGÉNTICO (orchestrator-worker + HITL). El corazón.
// ─────────────────────────────────────────────────────────────────────────

export interface AgentRole {
  id: string; nombre: string; capa: string; model: string; icon: string; color: string;
  rol: string;            // qué hace (1 línea)
  prompt: string;         // resumen del prompt base (inglés, del agentic-system.md)
}

export const AGENT_ROLES: AgentRole[] = [
  { id: 'lead', nombre: 'Orquestador (Lead)', capa: 'Capa 1', model: 'Claude Opus', icon: '🧭', color: '#0FD4A0',
    rol: 'Planifica el outline PRISMA, delega por sección, ensambla, gatea QA. NUNCA escribe prosa.',
    prompt: 'You are the LEAD ORCHESTRATOR for a systematic review. You do NOT write prose. Inputs = registered protocol (PROSPERO) + PRISMA 2020 checklist + extraction table (only sources of truth). Produce a section outline; spawn ONE subagent per section with ONLY its retrieved chunks; require every claim to carry [CIT:id] (no reference strings); after all return, STOP and route to CitationAgent; surface checkpoints CP-1..CP-4 and wait for human approval.' },
  { id: 'intro', nombre: 'IntroAgent', capa: 'Capa 2', model: 'Claude Sonnet', icon: '📝', color: '#2E7CF6',
    rol: 'Redacta la Introduction (gap + objetivo) solo desde los chunks provistos.',
    prompt: 'Write ONLY the Introduction. Use ONLY the source chunks provided. Every factual/numeric statement ends with [CIT:<source_id>]. NEVER write a reference string, author, journal, year or DOI. If a claim is unsupported, drop it or mark [UNSUPPORTED]. Output prose + the list of source_ids used.' },
  { id: 'methods', nombre: 'MethodsAgent', capa: 'Capa 2', model: 'Claude Sonnet', icon: '⚗️', color: '#2E7CF6',
    rol: 'Redacta Methods conforme a PRISMA 2020, espejo exacto del protocolo.',
    prompt: 'Write the METHODS section conforming to PRISMA 2020. Sources = registered protocol + PRISMA 2020 checklist ONLY. Cover eligibility, sources & dates, search strategy, selection, data items, risk-of-bias, synthesis. Mirror the protocol exactly; if it is silent on a required PRISMA item, write [PROTOCOL GAP: <item>] — do not invent a method.' },
  { id: 'results', nombre: 'ResultsAgent', capa: 'Capa 2', model: 'Claude Sonnet', icon: '📊', color: '#2E7CF6',
    rol: 'Redacta Results + tabla de características, cada número trazable a la tabla de extracción.',
    prompt: 'Write the RESULTS section. SOURCE OF TRUTH = the structured extraction table + PRISMA flow counts. Report selection numbers exactly; every number traces to a cell tagged [CIT:<study_id>:<field>]. Do not interpret (that is Discussion). Missing cell → "not reported", never impute. Output prose + a draft characteristics-of-studies table.' },
  { id: 'discuss', nombre: 'DiscussAgent', capa: 'Capa 2', model: 'Claude Sonnet', icon: '💬', color: '#2E7CF6',
    rol: 'Redacta Discussion con límites y certeza explícitos.',
    prompt: 'Write the DISCUSSION. Use ONLY the provided chunks. Every factual/numeric statement ends with [CIT:<source_id>]. Explicitly state limitations and where the evidence is uncertain. No reference strings or DOIs — citation formatting happens later.' },
  { id: 'citation', nombre: 'CitationAgent / QA', capa: 'Capa 3', model: 'Claude', icon: '🛡️', color: '#F56342',
    rol: 'Núcleo anti-alucinación: verifica DOI/PMID, solape de chunk, paráfrasis (Turnitin). Gate duro CP-3.',
    prompt: 'You run AFTER all drafts. For EACH [CIT:<source_id>]: (1) confirm the claim overlaps the retrieved chunk, else [NO VERIFICABLE]; (2) resolve metadata + DOI and verify against Crossref REST API; cross-check PMID via PubMed E-utilities; (3) fuzzy-match title ≥0.85 (articles)/≥0.75 (books); (4) NEVER fabricate a DOI/author/year. Also flag near-literal paraphrase (Turnitin-safe) and rewrite. Output a numbered reference list of ONLY verified entries + a coverage report. HARD GATE: assembly cannot proceed while any [NO VERIFICABLE]/[UNSUPPORTED] remains.' },
  { id: 'assembler', nombre: 'AssemblerAgent', capa: 'Capa 3', model: 'python-docx', icon: '📄', color: '#A78BFA',
    rol: 'Ensambla el .docx final (estilos, tablas, refs numeradas). Respeta la lección TOC de Word.',
    prompt: 'Assemble the verified manuscript into .docx (python-docx ≥1.2.0). PRECONDITION: human cleared CP-3 (zero unresolved [NO VERIFICABLE]). Replace each [CIT:id] with its numbered citation [n]; build Title/headings, characteristics table via add_table(), numbered References. Anchor inserts AFTER the outermost Word TOC field. Output revision_v{n}.docx.' },
];

export interface AgentLayer { capa: string; titulo: string; desc: string; color: string; icon: string }
export const AGENT_LAYERS: AgentLayer[] = [
  { capa: 'Capa 0', titulo: 'Descubrimiento 24/7', icon: '🛰️', color: '#8F9097',
    desc: 'n8n (cron) → OpenAlex + PubMed E-utils + Europe PMC + LILACS → dedup → Phi-4 local (screening barato) → Supabase → Telegram (¿paper relevante? sí/no). Feeder, NO screening oficial.' },
  { capa: 'Capa 1', titulo: 'Orquestador (Lead · Opus)', icon: '🧭', color: '#0FD4A0',
    desc: 'Recibe "avanza Línea X, output SR". Plan → descompone en tareas → delega → integra → gatea QA. Memoria del plan en Supabase (evita context rot).' },
  { capa: 'Capa 2', titulo: 'Subagentes (Workers · Sonnet, contexto aislado)', icon: '🧩', color: '#2E7CF6',
    desc: 'Intro · Methods(PRISMA) · Results(forest) · Discussion. No se comunican entre sí; cada uno recibe solo sus chunks y devuelve prosa con marcadores [CIT:id].' },
  { capa: 'Capa 3', titulo: 'QA de citas + Ensamblado', icon: '🛡️', color: '#F56342',
    desc: 'CitationAgent verifica DOI/PMID (Crossref/PubMed) + solape + paráfrasis (Turnitin); AssemblerAgent monta el .docx. Modelo-por-tarea (lección otto-SR).' },
  { capa: 'Capa 4', titulo: 'Checkpoint humano (HITL)', icon: '🧑‍⚕️', color: '#F5A623',
    desc: 'Joseph abre el Word, verifica citas reales, paráfrasis y cadena estadística, y aprueba/corrige. Nada avanza sin su aprobación.' },
];

export interface Checkpoint { id: string; despues: string; verifica: string }
export const HITL_CHECKPOINTS: Checkpoint[] = [
  { id: 'CP-1', despues: 'Outline del orquestador', verifica: 'Estructura PRISMA, preguntas, criterios de inclusión' },
  { id: 'CP-2', despues: 'Borradores de sección', verifica: 'Exactitud factual, tono, que cada claim tenga [CIT:id]' },
  { id: 'CP-3', despues: 'Salida del CitationAgent', verifica: 'Resolver [NO VERIFICABLE]; cero citas fabricadas (gate duro)' },
  { id: 'CP-4', despues: '.docx ensamblado', verifica: 'Formato, tablas, lista de referencias, numeración (R39 del plan)' },
];

export const AGENTIC_RESOURCES = [
  { label: 'Anthropic · Building a multi-agent research system', url: 'https://www.anthropic.com/engineering/multi-agent-research-system' },
  { label: 'otto-SR · automatización de SR con LLMs (medRxiv)', url: 'https://www.medrxiv.org/content/10.1101/2025.06.13.25329541v1' },
  { label: 'Crossref REST API (verificar DOI)', url: 'https://www.crossref.org/documentation/retrieve-metadata/rest-api/' },
  { label: 'PubMed E-utilities (verificar PMID)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK25501/' },
  { label: 'python-docx (ensamblado .docx)', url: 'https://pypi.org/project/python-docx/' },
  { label: 'LangGraph (HITL: interrupt + checkpointer)', url: 'https://pypi.org/project/langgraph/' },
];

export const AGENTIC_META = {
  tesis: 'El LLM NUNCA genera referencias de memoria: cita solo desde un corpus recuperado y la verificación de citas es un paso separado al final. Patrón orchestrator-worker (~90% mejor que un agente único en amplitud; cuesta ~15× tokens → reservar para el documento final).',
  cuandoEntra: 'El sistema NO inicia la SR: arranca en R34–R40 (redacción → ensamblado → checkpoint), cuando el humano ya tiene corpus + tabla de extracción. R39 = checkpoint humano obligatorio.',
};
