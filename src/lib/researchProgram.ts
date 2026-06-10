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
  { capa: 'Capa 0', titulo: 'Motor de descubrimiento 24/7 (5 fuentes · OpenAlex troncal)', icon: '🛰️', color: '#8F9097',
    desc: 'n8n + Google Calendar → motor Python async sobre 5 fuentes (OpenAlex⭐ + PubMed + Europe PMC + LILACS + Semantic Scholar ≈97%) → dedup por DOI → pre-screening local Ollama (phi4-mini, $0) → Supabase + Realtime → Telegram [Aprobar]/[Descartar]. OpenAlex exige API key (13-feb-2026). Feeder, NO screening oficial.' },
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
  { label: 'OpenAlex · API auth + pricing (key oblig. 13-feb-2026)', url: 'https://developers.openalex.org/api-reference/authentication' },
  { label: 'OpenAlex · validación 98% para SR (Stansfield 2025)', url: 'https://onlinelibrary.wiley.com/doi/10.1002/cesm.70038' },
  { label: 'Unpaywall · API (texto completo OA legal)', url: 'https://unpaywall.org/products/api' },
  { label: 'Semantic Scholar · Academic Graph API', url: 'https://api.semanticscholar.org/api-docs/graph' },
  { label: 'Europe PMC · REST Web Service', url: 'https://europepmc.org/RestfulWebService' },
  { label: 'Crossref · content negotiation (CSL-JSON de citas)', url: 'https://www.crossref.org/documentation/retrieve-metadata/content-negotiation/' },
  { label: 'PubMed E-utilities (verificar PMID)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK25501/' },
  { label: 'Anthropic · Building a multi-agent research system', url: 'https://www.anthropic.com/engineering/multi-agent-research-system' },
  { label: 'otto-SR · automatización de SR con LLMs (medRxiv)', url: 'https://www.medrxiv.org/content/10.1101/2025.06.13.25329541v1' },
  { label: 'python-docx (ensamblado .docx)', url: 'https://pypi.org/project/python-docx/' },
];

export const AGENTIC_META = {
  tesis: 'El LLM NUNCA genera referencias de memoria: cita solo desde un corpus recuperado y la verificación de citas es un paso separado al final. Patrón orchestrator-worker (~90% mejor que un agente único en amplitud; cuesta ~15× tokens → reservar para el documento final).',
  cuandoEntra: 'El sistema NO inicia la SR: arranca en R34–R40 (redacción → ensamblado → checkpoint), cuando el humano ya tiene corpus + tabla de extracción. R39 = checkpoint humano obligatorio.',
  premisa: 'Una SR rigurosa exige cubrir ~30 años con sensibilidad ≥90–97% — inmanejable a mano en 1 h/día. El motor lo hace en automático antes del bloque de research; el humano solo valida.',
};

// ── Motor de descubrimiento: 5 fuentes (OpenAlex troncal) — verificado jun-2026 ──
export interface DiscoverySource {
  nombre: string; cobertura: string; auth: string; rol: string; troncal?: boolean; url: string;
}
export const DISCOVERY_SOURCES: DiscoverySource[] = [
  { nombre: 'OpenAlex', cobertura: '250M+ (CC0)', auth: 'API key gratis OBLIGATORIA (13-feb-2026) · freemium ~$1/día', rol: 'Troncal — máxima cobertura abierta + citation-chasing. 98% validado para SR (Stansfield 2025).', troncal: true, url: 'https://developers.openalex.org/api-reference/authentication' },
  { nombre: 'PubMed / MEDLINE', cobertura: '37M biomédicos', auth: 'E-utilities · sin key 3/s, con key 10/s', rol: 'Gold standard biomédico (MeSH).', url: 'https://www.ncbi.nlm.nih.gov/books/NBK25501/' },
  { nombre: 'Europe PMC', cobertura: '46M+ · 880k+ preprints', auth: 'sin key · cursorMark', rol: 'Cobertura europea + preprints + texto completo OA. (No indexa Embase.)', url: 'https://europepmc.org/RestfulWebService' },
  { nombre: 'LILACS / BVS', cobertura: '~700 revistas · ~2.8M docs', auth: 'iAHx RSS/XML · DeCS · api.bvsalud.org (token)', rol: 'Ventaja diferencial peruana/LATAM (ES/PT).', url: 'https://lilacs.bvsalud.org/en/' },
  { nombre: 'Semantic Scholar', cobertura: '214M+ papers', auth: 'key gratis (x-api-key) · 1 req/s', rol: 'Complemento semántico + externalIds (dedup DOI) + TLDR.', url: 'https://api.semanticscholar.org/api-docs/graph' },
];

// ── Cascada de acceso a texto completo (legal primero) ──
export const FULLTEXT_CASCADE: { n: number; fuente: string; nota: string }[] = [
  { n: 1, fuente: 'Unpaywall', nota: 'api.unpaywall.org/v2/{DOI}?email= · de OurResearch · gratis · 100k/día · best_oa_location.url_for_pdf' },
  { n: 2, fuente: 'Europe PMC / PMC OA', nota: 'fullTextXML + fullTextUrlList (resultType=core)' },
  { n: 3, fuente: 'Preprints', nota: 'bioRxiv / medRxiv / arXiv por DOI/ID' },
  { n: 4, fuente: 'ALICIA-CONCYTEC', nota: 'repositorio peruano vía OAI-PMH (Dublin Core) → handle → PDF' },
  { n: 5, fuente: 'Solicitud al autor', nota: 'email automático "request reprint" — último recurso' },
];

// ── Pipeline de citas por IA (reemplaza Zotero) ──
export const CITATION_PIPELINE: { paso: string; detalle: string }[] = [
  { paso: '1 · LLM emite JSON', detalle: 'Referencias como objetos {title,authors,year,doi?,pmid?} + marcadores [CIT:id]. Nunca prosa ni bibliografía a mano.' },
  { paso: '2 · Verificar', detalle: 'Crossref api.crossref.org/works/{DOI} (mailto) y/o PubMed esummary JSON. (Crossref cambió límites 1-dic-2025: público 5/s, polite 10/s.)' },
  { paso: '3 · Match fuzzy', detalle: 'rapidfuzz título ≥0.90 acepta · 0.80–0.90 a revisión humana · <0.80 rechaza · + año ±1 + 1er autor.' },
  { paso: '4 · CSL-JSON canónico', detalle: 'Descartar metadatos del LLM; bajar CSL-JSON real por content negotiation en doi.org; formatear Vancouver con citation.js/anystyle.' },
  { paso: '5 · Gate', detalle: 'Solo persiste lo que resuelve a un DOI/PMID real; lo demás → needs_review / rejected (auditoría). Cero alucinación.' },
];

// ── Consola de agentes: qué agente redacta qué sección, por línea (Manual §8.5/§14) ──
export type EstadoAgente = 'idle' | 'queued' | 'working' | 'done' | 'needs_human' | 'blocked';
export const ESTADO_AGENTE: Record<EstadoAgente, { lbl: string; color: string; icon: string }> = {
  idle:        { lbl: 'inactivo',          color: '#8F9097', icon: '○' },
  queued:      { lbl: 'en cola',           color: '#2E7CF6', icon: '◔' },
  working:     { lbl: 'redactando…',       color: '#F5A623', icon: '◍' },
  done:        { lbl: 'listo',             color: '#0FD4A0', icon: '●' },
  needs_human: { lbl: 'requiere tu visto', color: '#F56342', icon: '◆' },
  blocked:     { lbl: 'bloqueado',         color: '#F56342', icon: '⨯' },
};
// Qué sección redacta cada agente (orden del manuscrito)
export const AGENTE_SECCION: { agentId: string; seccion: string; icon: string; color: string }[] = [
  { agentId: 'lead',      seccion: 'Dirige la línea / SR',        icon: '🧭', color: '#0FD4A0' },
  { agentId: 'intro',     seccion: 'Introducción',                icon: '📝', color: '#2E7CF6' },
  { agentId: 'methods',   seccion: 'Métodos (PRISMA 2020)',       icon: '⚗️', color: '#2E7CF6' },
  { agentId: 'results',   seccion: 'Resultados (forest plot)',    icon: '📊', color: '#2E7CF6' },
  { agentId: 'discuss',   seccion: 'Discusión + antecedentes',    icon: '💬', color: '#2E7CF6' },
  { agentId: 'citation',  seccion: 'Referencias (Crossref/CSL)',  icon: '🛡️', color: '#F56342' },
  { agentId: 'assembler', seccion: 'Ensamblado .docx',            icon: '📄', color: '#A78BFA' },
];
/**
 * Snapshot ILUSTRATIVO del reparto por sección según el estado de la línea. Al desplegar el
 * motor (ver DATA/RESEARCH/agentic/DEPLOY.md) esto se reemplaza por `research_agent_tasks` (Supabase Realtime).
 */
export function consolaSnapshot(estado: LineaResearch['estado']): Record<string, EstadoAgente> {
  if (estado === 'activa') // SR-1 en redacción (R34–R39)
    return { lead: 'working', intro: 'done', methods: 'working', results: 'queued', discuss: 'idle', citation: 'queued', assembler: 'idle' };
  if (estado === 'completada')
    return { lead: 'done', intro: 'done', methods: 'done', results: 'done', discuss: 'done', citation: 'done', assembler: 'done' };
  if (estado === 'pre-protocolo')
    return { lead: 'queued', intro: 'idle', methods: 'idle', results: 'idle', discuss: 'idle', citation: 'idle', assembler: 'idle' };
  return { lead: 'idle', intro: 'idle', methods: 'idle', results: 'idle', discuss: 'idle', citation: 'idle', assembler: 'idle' }; // backlog
}
/** Estándar editorial objetivo de la línea (la 1ª revista + el método). */
export function journalStd(l: LineaResearch): string {
  return `${l.journals[0] || 'JEADV'} · PRISMA 2020 + GRADE + Vancouver/CSL`;
}

// ── Panel de control (lo que hace la app — Manual §14) ──
export const CONTROL_PANEL: { icon: string; titulo: string; desc: string }[] = [
  { icon: '📊', titulo: 'Dashboard por línea', desc: 'Estado de cada SR (discovery/screening/extracción/redacción/envío) · nº papers encontrados/cribados/incluidos · próximo checkpoint.' },
  { icon: '✅', titulo: 'Cola de screening', desc: 'Papers pre-cribados por la IA local esperando validación · un clic incluir/excluir/dudoso · Kappa en vivo.' },
  { icon: '📄', titulo: 'Gestor de PDFs', desc: 'Estado de acceso a texto completo (encontrado/pendiente/manual) · visor con chat IA.' },
  { icon: '📝', titulo: 'Editor de manuscrito', desc: 'Secciones de los subagentes · estado QA (PRISMA/GRADE/citas verificadas) · exportar .docx.' },
  { icon: '🛰️', titulo: 'Monitor de pipeline', desc: 'Workflows n8n · logs del motor · sincronización con Google Calendar (cuándo es research).' },
  { icon: '💬', titulo: 'Integración Telegram', desc: 'Notificaciones de checkpoints · aprobaciones con botones desde el móvil.' },
];
