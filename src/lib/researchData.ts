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
  cuelloBotella: 'El cuello de botella NO es escribir — es el senior author y el acceso a casos. Desde el 05-sep tiene FECHA: M1 (Dr. Ciro · propuesta de 3 coautorías) · M2 (Rising Scholars · mentor de inglés) · M3 (Prof. Finlay · CADI) en septiembre, y cada entregable de la Mesa editorial lleva su senior author y su cascada de revistas.',
};

// ─────────────────────────────────────────────────────────────────────────
// MESA EDITORIAL — los 5 entregables reales de la RUTA 2027 (DATA/RESEARCH/RUTA_PUBLICACION_2027.md).
// Sustituye a RESEARCH_TIMELINE (S1–S13 "submit mes 3") y RESEARCH_HORARIO (Lun–Vie): el calendario
// editorial es UNO (el plan día-a-día que genera DATA/_scripts/gen_research_plan.js) y aquí vive el
// ESTADO de cada entregable. La fecha EXACTA de cada hito la da researchDailyPlan.ts → RESEARCH_HITOS
// (se re-fecha con el pipeline de corrimiento); `fechaObjetivo` es el MES de la RUTA.
// ─────────────────────────────────────────────────────────────────────────
export type EstadoEntregable = 'idea' | 'borrador' | 'revision-mentor' | 'enviado' | 'en-revision' | 'revision-mayor' | 'aceptado' | 'publicado';
export const ESTADOS_ENTREGABLE: EstadoEntregable[] = ['idea', 'borrador', 'revision-mentor', 'enviado', 'en-revision', 'revision-mayor', 'aceptado', 'publicado'];
export const PASOS_ENTREGABLE = 7; // idea=0 … publicado=7
// Joya apagada (tokens): muted · sapphire · amatista · brass · coral · jade · oro.
export const ESTADO_ENTREGABLE_INFO: Record<EstadoEntregable, { lbl: string; color: string; paso: number }> = {
  idea:              { lbl: 'idea',            color: '#7C8496', paso: 0 },
  borrador:          { lbl: 'borrador',        color: '#4F7DD6', paso: 1 },
  'revision-mentor': { lbl: 'revisión mentor', color: '#9A7BC8', paso: 2 },
  enviado:           { lbl: 'enviado',         color: '#B8934E', paso: 3 },
  'en-revision':     { lbl: 'en revisión',     color: '#B8934E', paso: 4 },
  'revision-mayor':  { lbl: 'revisión mayor',  color: '#C56A5A', paso: 5 },
  aceptado:          { lbl: 'aceptado',        color: '#5FA88C', paso: 6 },
  publicado:         { lbl: 'publicado',       color: '#C8A96A', paso: 7 },
};
export const ENVIADO_O_MAS: ReadonlySet<EstadoEntregable> = new Set<EstadoEntregable>(['enviado', 'en-revision', 'revision-mayor', 'aceptado', 'publicado']);

export type PistaEntregable = 'C' | 'T' | 'CR' | 'R';
export interface Entregable {
  id: string;                 // = clave en researchDailyPlan.ts → RESEARCH_HITOS y en obsidianResearchMap → RESEARCH_OBS_ENTREGABLE
  n: number;                  // orden en la mesa (0 = tesis)
  titulo: string;
  tipo: string;
  pista: PistaEntregable;     // pista del plan día-a-día que lo empuja (C carta · T tesis · CR case report · R SR-1)
  guia: string;               // guía de reporte que exige el journal
  journalCascade: string[];   // en orden; una a la vez, nunca envío simultáneo
  seniorAuthor: string;
  fechaObjetivo: string;      // MES de la RUTA (YYYY-MM); la fecha exacta = RESEARCH_HITOS[id].fecha
  fechaEnvio: string | null;  // se rellena al marcar "enviado" (persistido en localStorage)
  estado: EstadoEntregable;   // estado por defecto; el real se persiste (loadEntregables)
  coste: string;
  doi: string | null;
  atomos: string;             // átomos del plan que lo construyen
  esPIP: boolean;             // cuenta como publicación indexada (PROSPERO no)
  nota: string;
}
export const RESEARCH_ENTREGABLES: Entregable[] = [
  { id: 'tesis-L0', n: 0, titulo: 'Tesis L0 · IGA × CADI (n=316) como research letter', tipo: 'Research letter · 600-1.000 palabras · 1 tabla · 1 figura', pista: 'T', guia: 'STROBE (transversal, 22 ítems)',
    journalCascade: ['JAAD International', 'International Journal of Dermatology', 'Actas Dermo-Sifiliográficas', 'Anais Brasileiros de Dermatologia'],
    seniorAuthor: 'Dr. Ciro Rodríguez (HRDCQ Daniel Alcides Carrión, Huancayo) · A CONFIRMAR en M1', fechaObjetivo: '2026-11', fechaEnvio: null, estado: 'idea',
    coste: 'JAAD Intl US$2.575 de lista (DOAJ 1-sep-2026 · RUTA §3.1) → ≈ US$1.288 con Grupo B 50 % (GPOA A VERIFICAR) · IJD vía suscripción $0 · Anais $0 (SBD paga) · Actas: discrepancia $0 vs US$1.870 A VERIFICAR', doi: null, atomos: 'T-1 → T-8 (oct-nov 2026)', esPIP: true,
    nota: 'Entregable #0: el único dataset original propio (rs=0,637 · κ=0,81 · prevalencia 39,8 %; defendida 20-abr-2026). Bloqueo real: nº y fecha del CEI + consentimiento parental (T-1 · DATA/RESEARCH/TESIS_L0/etica.md).' },
  { id: 'carta-1', n: 1, titulo: 'Carta al editor #1 (artículo diana 2026)', tipo: 'Letter / Correspondence · 400-600 palabras · ≤5 refs', pista: 'C', guia: 'Sin guía EQUATOR; ventana y límites del journal diana (C-1/C-2)',
    journalCascade: ['Journal del artículo diana (JAAD · JAAD Intl · IJD · JCD · Dermatol Surg — se elige en C-2)'],
    seniorAuthor: 'Joseph (autor único) · Dr. Ciro coautor si aporta el dato clínico', fechaObjetivo: '2026-10', fechaEnvio: null, estado: 'idea',
    coste: '$0 (correspondencia vía suscripción)', doi: null, atomos: 'C-1 → C-6 (sep-oct 2026) · X-2 post-submit', esPIP: true,
    nota: 'Modo de fallo más probable: descubrir en octubre que la ventana de letters (típ. 4-12 semanas tras publicación) cerró → C-1 lista 5 candidatos con su ventana y C-2 fija la fecha límite.' },
  { id: 'case-report-1', n: 2, titulo: 'Case report #1 (CARE)', tipo: 'Case report · CARE 13 ítems · fotos estandarizadas · consentimiento de publicación', pista: 'CR', guia: 'CARE (13 ítems + timeline + perspectiva del paciente)',
    journalCascade: ['Dermatology Online Journal (eScholarship)', 'JAAD Case Reports (solo si es el MEJOR caso)', 'Case Reports in Dermatology (Karger)'],
    seniorAuthor: 'Fuente A: Dr. Ciro (caso de su consulta) · plan B: dermatólogo/a SPD — se decide en CR-1 (antes del 31-oct)', fechaObjetivo: '2027-02', fechaEnvio: null, estado: 'idea',
    coste: 'DOJ US$300 (DOAJ 1-sep-2026 · RUTA §3.1; sin waiver) · JAAD CR US$850 → ≈ $425 con Grupo B (solo para el MEJOR caso)', doi: null, atomos: 'CR-1 → CR-8 (oct-dic 2026, paquete congelado) · CR-9 SUBMIT (1er día-Research tras el Step 1)', esPIP: true,
    nota: 'Hoy NO hay caso (DATA/RESEARCH/CASE_REPORT_1/caso_candidatos.md). Sin caso + consentimiento + senior author antes del 31-oct, el entregable de feb-2027 no ocurre.' },
  { id: 'PROSPERO-SR1', n: 3, titulo: 'Registro PROSPERO de SR-1', tipo: 'Registro de protocolo (PRISMA-P) con equipo de revisión', pista: 'R', guia: 'PRISMA-P (17 ítems) · L4 §9 Equipo de revisión',
    journalCascade: ['PROSPERO (CRD York)', 'OSF Registries (plan B si no encaja)'],
    seniorAuthor: 'Garante: Joseph · revisor #2 nombrado en X-1 y confirmado en X-9 (sin revisor #2 no hay registro)', fechaObjetivo: '2027-02', fechaEnvio: null, estado: 'idea',
    coste: '$0', doi: null, atomos: 'X-1 (nov 2026) · R6b · R8b · X-9 · R10 · R11 (feb-mar 2027)', esPIP: false,
    nota: 'PRISMA 2020 ítem 8 y Cochrane exigen ≥2 revisores independientes: dos pases de la misma persona no son cribado dual y un LLM no cuenta como revisor.' },
  { id: 'SR-1', n: 4, titulo: 'SR-1 · Complicaciones vasculares de fillers + tiempo-a-hialuronidasa (L4)', tipo: 'Revisión sistemática ± meta-análisis de proporciones', pista: 'R', guia: 'PRISMA 2020 (27 ítems) + PRISMA-S + GRADE + AMSTAR-2',
    journalCascade: ['Dermatologic Surgery', 'JAAD (vía suscripción $0)', 'Journal of Cosmetic Dermatology (OA · Grupo B 50 %)', 'Anais Brasileiros / Actas (Diamond $0)'],
    seniorAuthor: 'Joseph primer autor · revisor #2 coautor · senior author a definir (Dr. Ciro o colaborador de la campaña K1-K2)', fechaObjetivo: '2027-07', fechaEnvio: null, estado: 'idea',
    coste: '$0 vía suscripción o Diamond; JCD 50 % A VERIFICAR en R39', doi: null, atomos: 'R12 → R43 (ciclo 2 · mar-jul 2027)', esPIP: true,
    nota: 'Corpus ya descubierto: 200 registros pending_human desde 11-jun-2026 (151 OA sin PDF) → X-3 lo inventaría y R16 lo une a la búsqueda PRISMA-S final.' },
];

/** Persistencia del estado real de la mesa (localStorage web · no-op seguro sin storage). */
export interface EntregableRegistro { estado: EstadoEntregable; fechaEnvio?: string | null; ref?: string | null; actualizado?: string }
export type EntregablesRegistro = Record<string, EntregableRegistro>;
const ENTREGABLES_KEY = 'jmd-research-entregables';
export function loadEntregables(): EntregablesRegistro {
  try {
    const ls = (globalThis as any).localStorage;
    if (ls) { const raw = ls.getItem(ENTREGABLES_KEY); if (raw) { const p = JSON.parse(raw); if (p && typeof p === 'object') return p as EntregablesRegistro; } }
  } catch { /* sin storage: arranca vacío */ }
  return {};
}
export function saveEntregables(r: EntregablesRegistro): void {
  try { const ls = (globalThis as any).localStorage; if (ls) ls.setItem(ENTREGABLES_KEY, JSON.stringify(r)); } catch { /* ignore */ }
}
export function estadoDe(e: Entregable, reg: EntregablesRegistro): EstadoEntregable {
  const s = reg[e.id]?.estado;
  return s && ESTADOS_ENTREGABLE.includes(s) ? s : e.estado;
}

/** Infra académica: las 10 cuentas que exige el circuito editorial (átomo R0 · checklist persistida con PlanKey 'research-infra'). */
export interface InfraItem { n: number; id: string; nombre: string; para: string; url: string | null; nota: string }
export const INFRA_ACADEMICA: InfraItem[] = [
  { n: 1, id: 'orcid', nombre: 'ORCID iD', para: 'Identidad de autor; Editorial Manager exige el del autor de correspondencia y PROSPERO el de todo el equipo', url: 'https://orcid.org/', nota: 'Guardar el iD en DATA/RESEARCH/MENTORES.md §Identificadores' },
  { n: 2, id: 'scholar', nombre: 'Google Scholar (perfil público)', para: 'Citas y h-index visibles para mentores y programas', url: 'https://scholar.google.com/intl/en/scholar/citations.html', nota: 'Añadir la tesis cuando esté en el repositorio UNCP' },
  { n: 3, id: 'cti', nombre: 'CTI Vitae / RENACYT (CONCYTEC)', para: 'La tesis publicada solo suma para RENACYT si está registrada', url: 'https://ctivitae.concytec.gob.pe/', nota: 'Registrar cada envío/aceptación (T-8, R43)' },
  { n: 4, id: 'em', nombre: 'Editorial Manager (Elsevier · JAAD / JAAD Intl / JAAD CR)', para: 'Portal de envío de la tesis (JAAD Intl) y de la carta si el diana es JAAD', url: 'https://www.editorialmanager.com/', nota: 'La cuenta es por revista (editorialmanager.com/<revista>) · URL exacta de JAAD Intl A VERIFICAR (05-sep)' },
  { n: 5, id: 's1', nombre: 'ScholarOne (Wiley · IJD / JCD / BJD)', para: 'Portal de envío de IJD (plan B de la tesis; candidato de carta)', url: null, nota: 'mc.manuscriptcentral.com devolvió 403 el 05-sep → A VERIFICAR la URL del portal en las Author Guidelines de IJD' },
  { n: 6, id: 'doj', nombre: 'eScholarship · Dermatology Online Journal', para: 'Envío del case report #1 (CR-9)', url: 'https://doaj.org/toc/1087-2108', nota: 'Ficha DOAJ verificada; portal de envío en eScholarship A VERIFICAR (05-sep)' },
  { n: 7, id: 'prospero', nombre: 'PROSPERO (CRD York)', para: 'Registro del protocolo de SR-1 (R10)', url: 'https://www.crd.york.ac.uk/PROSPERO/help/register', nota: 'Cuenta con ORCID; el equipo de revisión sale de lines/L4-complicaciones.md §9' },
  { n: 8, id: 'rayyan', nombre: 'Rayyan', para: 'Cribado dual en ciego de SR-1 (R17-R19) · gratis ≤3 revisiones', url: 'https://www.rayyan.com/', nota: 'El revisor #2 también necesita cuenta' },
  { n: 9, id: 'zotero', nombre: 'Zotero', para: 'Biblioteca de PDFs por entregable; respaldo del pipeline de citas (citation_verifier.py manda)', url: 'https://www.zotero.org/', nota: 'Conector del navegador + una carpeta por entregable' },
  { n: 10, id: 'keys', nombre: 'OpenAlex API key + NCBI API key', para: 'Motor research-discovery (OpenAlex troncal) y E-utilities a 10 req/s', url: 'https://developers.openalex.org/api-reference/authentication', nota: 'NCBI: https://account.ncbi.nlm.nih.gov/ → Settings → API Key Management' },
];

/** KPIs del cockpit DERIVADOS de la mesa (no constantes). */
export interface ResearchKpis { pipsActuales: number; pipsParaCompetir: number; pipsMayo: number; enviados: number; primerSubmissionMes: number; readiness: number }
const RUTA_MES_1 = '2026-09'; // sep-2026 = mes 1 de la RUTA
function mesesDesde(ym: string, base = RUTA_MES_1): number {
  const [y, m] = ym.slice(0, 7).split('-').map(Number); const [by, bm] = base.split('-').map(Number);
  if (!y || !m || !by || !bm) return 0;
  return (y - by) * 12 + (m - bm) + 1;
}
export function calcResearchKpis(reg: EntregablesRegistro, infraHechos = 0): ResearchKpis {
  const est = RESEARCH_ENTREGABLES.map((e) => ({ e, s: estadoDe(e, reg), r: reg[e.id] }));
  const pipsActuales = est.filter((x) => x.e.esPIP && (x.s === 'aceptado' || x.s === 'publicado')).length;
  const enviados = est.filter((x) => ENVIADO_O_MAS.has(x.s)).length;
  const fechas = est.filter((x) => x.e.esPIP).map((x) => (ENVIADO_O_MAS.has(x.s) && x.r?.fechaEnvio) ? x.r.fechaEnvio : x.e.fechaObjetivo).sort();
  const primerSubmissionMes = fechas.length ? mesesDesde(fechas[0]) : 0;
  const avance = est.reduce((a, x) => a + ESTADO_ENTREGABLE_INFO[x.s].paso / PASOS_ENTREGABLE, 0) / (est.length || 1);
  const infra = Math.max(0, Math.min(INFRA_ACADEMICA.length, infraHechos)) / INFRA_ACADEMICA.length;
  const readiness = Math.round(100 * (0.3 * infra + 0.7 * avance));
  return { pipsActuales, pipsParaCompetir: 3, pipsMayo: 10, enviados, primerSubmissionMes, readiness };
}
/** Valores por defecto (mesa sin estado persistido · infra 0/10). En la app se recalculan con calcResearchKpis. */
export const RESEARCH_KPIS: ResearchKpis = calcResearchKpis({}, 0);

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
    entregable: 'Mesa editorial: carta al editor (oct-26) · tesis como research letter (nov-26) · case report #1 (feb-27) · SR-1 registrada (feb-27) y enviada (jul-27).' },
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

// (05-sep-2026) RESEARCH_HORARIO (Lun–Vie) y RESEARCH_TIMELINE (S1–S13) ELIMINADOS: eran la 3ª línea temporal
// contradictoria. El calendario editorial es el plan día-a-día (researchDailyPlan.ts / researchDailyPlan2027.ts)
// y el estado vive en RESEARCH_ENTREGABLES (arriba). El bloque real es 13:30–14:15 interdiario (FRANJAS del plan).

export const RESEARCH_ADVERTENCIAS = [
  'El cuello de botella es el mentor y el acceso a casos, no escribir. Consigue un dermatólogo-autor desde la semana 1.',
  'El research fellowship en EE.UU. es, en la práctica, casi obligatorio para que un IMG llegue a Mayo. Presupuéstalo.',
  'Dermatología es la especialidad menos accesible para IMGs (<3% de residentes). Objetivo-estiramiento honesto, no garantía.',
  'Cutoffs MIR exactos y cupos no-UE: variables — verifícalos cada convocatoria en fuentes oficiales.',
  'Cuidado con journals predatorios: quédate en PubMed/MEDLINE-indexed (Cureus, BMJ CR, JAAD CR, CED sí lo están).',
];
