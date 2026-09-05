#!/usr/bin/env node
/**
 * gen_research_plan.js — FUENTE ÚNICA del plan día-a-día de Research (v5.6 · 3 pistas alineadas con
 * DATA/RESEARCH/RUTA_PUBLICACION_2027.md). GENERA (no editar los .ts/.md a mano):
 *
 *   src/lib/researchDailyPlan.ts       ciclo 1 · 42 átomos · 40 en sep→dic 2026 (carta · tesis · case report · mentores · cimientos SR-1)
 *                                      + 2 justo tras la pausa (CR-9 SUBMIT case report · X-8 re-arranque) → total FIJO = 42
 *   src/lib/researchDailyPlan2027.ts   ciclo 2 · SR-1 PROSPERO→submit + campaña + CR #2 + bibliométrico · feb→ago 2027
 *   src/lib/obsidianResearchMap.ts     mapa átomo/entregable → carpeta del vault (antes lo escribía build_vault_research.js)
 *   DATA/RESEARCH/daily-plan.md        documentación (misma data)
 *
 * Uso (pipeline de corrimiento, como gen_synapse_plan.js / gen_aurum_plan.js):
 *   node DATA/_scripts/gen_research_plan.js                    # ciclo 1 desde 2026-09-08 + ciclo 2 desde 2027-02-01
 *   node DATA/_scripts/gen_research_plan.js 2026-09-07         # D1 global: toma el primer día-Research >= fecha
 *   node DATA/_scripts/gen_research_plan.js --ciclo 2 2027-02-01   # solo ciclo 2 desde esa fecha (ciclo 1 intacto)
 *   node DATA/_scripts/gen_research_plan.js --ciclo 1 2026-09-10   # solo ciclo 1
 *
 * Calendario: días-Research = paridad de días hábiles desde el ancla 2026-06-10 (researchData.ts#diaEstudioTipo,
 * misma función que remap_inicio.js) · L-V · salta 25-dic/31-dic/1-ene · PAUSA 4→29-ene-2027 (0 átomos · Step 1).
 * Si el D1 se corre y el ciclo 1 no cabe antes de la pausa, se recortan átomos `recortable` (los de prep de SR-1
 * que ya reaparecen en el ciclo 2) y se avisa por consola.
 *
 * Formato de fila: `{ d, fecha: 'YYYY-MM-DD', ciclo, fase, pista, code, prioridad, objetivo, entregable, artefacto,
 * tool, recs: [...], chips?: [...], apex }` — remap_inicio.js re-fecha `fecha:` por regex dentro de `export const DIAS`
 * remap_inicio.js (bloque 4) exige EXACTAMENTE 42 `fecha:` en DIAS → el ciclo 1 se mantiene en 42 átomos para que el
 * pipeline no aborte (los bloques Derma/Business/LIVIANO van después). Pero remap NO conoce la pausa de enero, así que
 * tras `remap_inicio.js <fecha>` hay que ejecutar `node DATA/_scripts/gen_research_plan.js <fecha>` (este script
 * sobreescribe el .ts con las fechas correctas). Lo ideal: que remap llame a este script (fichero fuera de este lote).
 * Regla anti-alucinación: toda URL nueva de REC fue verificada el 05-sep-2026 (WebFetch) o ya existía en el repo;
 * lo no verificable va marcado "A VERIFICAR".
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const argv = process.argv.slice(2);
const cicloArgIdx = argv.indexOf('--ciclo');
const SOLO_CICLO = cicloArgIdx >= 0 ? Number(argv[cicloArgIdx + 1]) : 0; // 0 = ambos
const fechas = argv.filter((a) => /^20\d\d-\d\d-\d\d$/.test(a));
if (SOLO_CICLO && ![1, 2].includes(SOLO_CICLO)) throw new Error('--ciclo debe ser 1 o 2');
const START1 = SOLO_CICLO === 2 ? '2026-09-08' : (fechas[0] || '2026-09-08');
const START2 = SOLO_CICLO === 2 ? (fechas[0] || '2027-02-01') : (fechas[1] || '2027-02-01');
const HOY = new Date().toISOString().slice(0, 10);

// ─── Calendario (idéntico a remap_inicio.js, UTC) ───
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const iso = (d) => d.toISOString().slice(0, 10);
const fromISO = (s) => new Date(s + 'T12:00:00Z');
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const wdOf = (s) => WD[fromISO(s).getUTCDay()];
const SKIP_FIJOS = new Set(['2026-12-25', '2026-12-31', '2027-01-01']);
const PAUSA = { desde: '2027-01-04', hasta: '2027-01-29' }; // Step 1 · 0 átomos
const enPausa = (s) => s >= PAUSA.desde && s <= PAUSA.hasta;
function tipoDia(s) {
  const d = fromISO(s), dow = d.getUTCDay();
  if (dow === 0 || dow === 6) return 'descanso';
  let cnt = 0; const cur = fromISO('2026-06-10');
  while (cur < d) { const wd = cur.getUTCDay(); if (wd !== 0 && wd !== 6) cnt++; cur.setUTCDate(cur.getUTCDate() + 1); }
  return cnt % 2 === 0 ? 'research' : 'derma';
}
/** n días-Research desde start (inclusive), saltando feriados fijos y la pausa. */
function slots(start, n) {
  const o = []; let c = start;
  while (o.length < n) { if (tipoDia(c) === 'research' && !SKIP_FIJOS.has(c) && !enPausa(c)) o.push(c); c = addDays(c, 1); }
  return o;
}
const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";

// ─── Verificación cruzada con Derma (chip "requiere Derma d19-20 (oclusión vascular)") ───
const CHIP_DERMA = 'requiere Derma d19-20 (oclusión vascular)';
(function verificarDerma() {
  try {
    const t = fs.readFileSync(path.join(ROOT, 'src/lib/dermaDailyPlan.ts'), 'utf8');
    const hits = [...t.matchAll(/\{\s*d:\s*(\d+),\s*fecha:\s*'([^']+)'[^\n]*?sub:\s*'([^']*)'/g)]
      .filter((m) => /oclusi[oó]n vascular/i.test(m[3])).map((m) => `d${m[1]} (${m[2]})`);
    if (!hits.length) console.warn('⚠ dermaDailyPlan.ts: ningún átomo menciona "oclusión vascular" — el chip Derma d19-20 queda sin respaldo');
    else if (!hits.some((h) => /^d(19|20) /.test(h))) console.warn(`⚠ dermaDailyPlan.ts: oclusión vascular está en ${hits.join(', ')} — el chip dice d19-20 (pendiente del swap propuesto en gaps_derma)`);
    else console.log('Derma ✓ oclusión vascular en ' + hits.join(', '));
  } catch (e) { console.warn('⚠ no pude leer dermaDailyPlan.ts: ' + e.message); }
})();

// ─── Recursos NUEVOS (todos verificados 05-sep-2026 o ya presentes en el repo) ───
const REC_EXTRA = {
  ORCID:   { label: 'ORCID · iD de autor (registro gratis)', url: 'https://orcid.org/', verif: 'repo (RESEARCH_RECURSOS_TOP)' },
  SCHOLAR: { label: 'Google Scholar · crear perfil público', url: 'https://scholar.google.com/intl/en/scholar/citations.html', verif: 'WebFetch 05-sep' },
  CTI:     { label: 'CTI Vitae · CONCYTEC (CV + RENACYT)', url: 'https://ctivitae.concytec.gob.pe/', verif: 'WebFetch 05-sep (carga CONCYTEC)' },
  NCBIACC: { label: 'Cuenta NCBI (login · API key E-utilities)', url: 'https://account.ncbi.nlm.nih.gov/', verif: 'WebFetch 05-sep' },
  RISING:  { label: 'Rising Scholars (ex-AuthorAID, INASP) · mentoría gratuita', url: 'https://risingscholars.net/', verif: 'WebFetch 05-sep (authoraid.info → 301)' },
  CARE:    { label: 'CARE checklist · 13 ítems (case reports)', url: 'https://www.care-statement.org/checklist', verif: 'WebFetch 05-sep' },
  STROBE:  { label: 'STROBE checklists (transversal · 22 ítems)', url: 'https://www.strobe-statement.org/checklists/', verif: 'WebFetch 05-sep' },
  JAADINT: { label: 'JAAD International (OA · Grupo B 50%)', url: 'https://www.jaadinternational.org/', verif: 'repo (researchData.ts)' },
  JAADCR:  { label: 'JAAD Case Reports · ficha DOAJ (APC US$850)', url: 'https://doaj.org/toc/2352-5126', verif: 'repo (RUTA §3)' },
  DOJ:     { label: 'Dermatology Online Journal · ficha DOAJ (≤US$300, MEDLINE)', url: 'https://doaj.org/toc/1087-2108', verif: 'repo (RUTA §3) · portal eScholarship A VERIFICAR' },
  IJD:     { label: 'International Journal of Dermatology · en PubMed (políticas: 403 → confirmar por correo)', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%22Int+J+Dermatol%22%5BJournal%5D', verif: 'patrón PubMed [Journal]' },
  ACTAS:   { label: 'Actas Dermo-Sifiliográficas · en PubMed (Diamond OA $0)', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%22Actas+Dermosifiliogr%22%5BJournal%5D', verif: 'patrón PubMed [Journal]' },
  ANAIS:   { label: 'Anais Brasileiros de Dermatologia · en PubMed (Diamond OA $0)', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%22An+Bras+Dermatol%22%5BJournal%5D', verif: 'patrón PubMed [Journal]' },
  EM:      { label: 'Editorial Manager (Aries) · cuenta por revista', url: 'https://www.ariessys.com/', verif: 'WebFetch 05-sep (editorialmanager.com → 302)' },
  NRMP:    { label: 'NRMP · Residency Data Reports (base pública)', url: 'https://www.nrmp.org/match-data-analytics/residency-data-reports/', verif: 'repo (RUTA fuentes)' },
};

// ─── Fases y pistas ───
const FASES = {
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
const PISTAS = {
  R:  { label: 'SR-1 · método', color: '#6BB8B0', entregableId: 'SR-1' },
  M:  { label: 'Mentores', color: '#C8A96A', entregableId: null },
  C:  { label: 'Carta al editor', color: '#4F7DD6', entregableId: 'carta-1' },
  T:  { label: 'Tesis L0', color: '#C56A5A', entregableId: 'tesis-L0' },
  CR: { label: 'Case report', color: '#9A7BC8', entregableId: 'case-report-1' },
  K:  { label: 'Campaña', color: '#B8934E', entregableId: null },
  B:  { label: 'Bibliométrico', color: '#7C83D6', entregableId: null },
  X:  { label: 'Transversal', color: '#7C8496', entregableId: null },
};

// ─── Átomos · CICLO 1 (sep→dic 2026) ───
// a(code, fase, pista, prio, objetivo, entregable, artefacto, tool, recs, extra{chips, apex, hito, recortable})
const a = (code, fase, pista, prio, obj, ent, art, tool, recs, x = {}) => ({ code, fase, pista, prio, obj, ent, art, tool, recs, ...x });
const CD = { chips: [CHIP_DERMA] };
const C1 = [
  a('R0', 'R0', 'R', 'CRITICA', 'Infra académica: abrir las 10 cuentas que exige el circuito editorial (checklist marcable en Desk → Infra académica)',
    '10/10 cuentas: ORCID · Google Scholar · CTI Vitae/RENACYT · Editorial Manager · ScholarOne · eScholarship/DOJ · PROSPERO · Rayyan · Zotero · OpenAlex + NCBI keys',
    'Checklist "Infra académica" (app · clave research-infra) + IDs (ORCID iD, CTI Vitae) guardados en DATA/RESEARCH/MENTORES.md §Identificadores',
    'ORCID · CTI Vitae · Rayyan', ['ORCID', 'SCHOLAR', 'CTI', 'NCBIACC', 'OPENALEX', 'PROS', 'RAY', 'ZOT'], { apex: { id: 'infra', t: 'Infra académica 10/10' } }),
  a('R1', 'R0', 'R', 'CRITICA', 'PICO: formular 3 preguntas (terapia / diagnóstico / pronóstico) y leer 1 abstract del nicho con el método Greenhalgh',
    '3 PICO escritos + 1 abstract (fillers · fototipos IV-VI) clasificado por diseño de estudio',
    'Nota 01_PICO.md (3 PICO + plantilla Greenhalgh) en el vault → SR-1/_hoja_de_ruta',
    '—', ['CIL1', 'GREEN']),
  a('M1', 'M', 'M', 'CRITICA', 'Dr. Ciro Rodríguez (Hospital Regional Daniel Alcides Carrión, Huancayo): propuesta CONCRETA de 3 coautorías — tesis→research letter (él senior), carta al editor (coautor) y case report de SU consulta (él senior author)',
    'Mensaje o reunión con las 3 coautorías propuestas + respuesta registrada (sí / no / cuándo)',
    'DATA/RESEARCH/MENTORES.md: fila Dr. Ciro (qué pido · fecha · estado · siguiente paso)',
    'WhatsApp / presencial', ['ICMJE', 'CREDIT'], { apex: { id: 'mentor-ciro', t: 'Senior author local confirmado' }, hito: 'mentor' }),
  a('C-1', 'C', 'C', 'CRITICA', 'Discovery de 5 artículos 2026 (últimos 30-60 días) en JAAD / JAAD Intl / IJD / JCD / Dermatol Surg sobre derma estética · fototipos IV-VI · complicaciones de fillers, con la ventana de letters y los límites de cada journal',
    'Tabla de 5 candidatos: journal · fecha de publicación · ventana de correspondencia (URL de Author Guidelines) · límite palabras/refs · coste · ángulo de la carta (dato peruano/latino que el paper no considera)',
    'DATA/RESEARCH/CARTA_1/candidatos.md (tabla de 5) + correo a IJD Editorial Office pidiendo su política de correspondencia (pendiente desde 27-ago)',
    'research-discovery · PubMed', ['PM', 'OPENALEX', 'JAADINT', 'IJD'], { chips: ['ventana de letters típica 4-12 semanas · A VERIFICAR por journal (JAAD/IJD dieron 403 el 05-sep)'] }),
  a('M2', 'M', 'M', 'ALTA', 'Rising Scholars (ex-AuthorAID, INASP): solicitar mentor 1-a-1 gratuito para la revisión en inglés del primer manuscrito — tarda semanas, pedirlo YA',
    'Perfil creado + solicitud de mentor enviada (área: dermatología / escritura científica)',
    'MENTORES.md: fila Rising Scholars (fecha de solicitud · estado)',
    'risingscholars.net', ['RISING', 'SCIWRITE', 'PHRASE']),
  a('C-2', 'C', 'C', 'CRITICA', 'Elegir 1 artículo diana con FECHA LÍMITE de submit calculada (ventana del journal) + leer 5 letters modelo del mismo journal (cita → aporte u objeción con 1 dato verificable → implicación)',
    'Artículo diana fijado + deadline en la Mesa editorial + esqueleto de la carta (3 párrafos) calcado de los 5 modelos',
    'CARTA_1/diana.md (DOI del artículo, deadline, límites, esqueleto) + Mesa editorial: carta-1 → borrador',
    'PubMed · Mesa editorial', ['PM', 'PHRASE', 'ICMJE'], { apex: { id: 'carta-diana', t: 'Artículo diana + deadline' }, hito: 'carta-diana' }),
  a('M3', 'M', 'M', 'ALTA', 'Email a Prof. Andrew Finlay (Cardiff, creador CADI/DLQI): 6 líneas — permiso / versión española del CADI + ofrecer los datos de la tesis (n=316, rs=0.637) como validación peruana; desbloquea L6',
    'Email enviado (6 líneas, asunto claro, 1 pregunta concreta) + copia archivada',
    'MENTORES.md: fila Finlay (fecha · estado) + copia del email en §Plantillas',
    'Email institucional', ['PHRASE', 'ICMJE']),
  a('R2', 'R0', 'R', 'ALTA', 'Diseños de estudio y niveles de evidencia + regla EQUATOR: elegir la guía de reporte ANTES de escribir (carta = sin guía · tesis = STROBE transversal · case report = CARE · SR = PRISMA 2020)',
    'Mapa de 1 página: diseño → nivel → sesgos típicos → guía de reporte que exige el journal',
    'Nota 02_disenos_guias.md en el vault + checklists STROBE y CARE descargadas a DATA/RESEARCH/',
    '—', ['EQ', 'STROBE', 'CARE', 'STAT']),
  a('R6', 'R1', 'R', 'CRITICA', 'Fijar el PICO de SR-1 (complicaciones vasculares de fillers + tiempo-a-hialuronidasa) + 1 desenlace primario, validado contra la ficha L4 · PICO v1 PROVISIONAL: se revalida en R6b (ciclo 2) cuando Derma d19-20 haya cubierto el mecanismo de la oclusión',
    'PICO de SR-1 escrito (P/I/C/O + desenlace primario único) y contrastado con L4 §2',
    'lines/L4-complicaciones.md §2 actualizado + nota 01_protocolo_PICO en el vault',
    '—', ['DELO', 'CIL1', 'COCHB'], { ...CD, apex: { id: 'pico-sr1', t: 'PICO de SR-1' } }),
  a('C-3', 'C', 'C', 'ALTA', 'Borrador de la carta: 400-600 palabras, ≤5 referencias, 3 párrafos (qué dice el artículo → qué falta u objeción con 1 dato verificable de Perú/LATAM/fototipos IV-VI → implicación clínica); frases del Academic Phrasebank',
    'Borrador v1 completo (400-600 palabras) con marcadores [CIT:id] en lugar de referencias escritas',
    'CARTA_1/borrador_v1.md',
    'Obsidian · Phrasebank', ['PHRASE', 'SCIWRITE'], { apex: { id: 'carta-v1', t: 'Borrador de la carta' } }),
  a('C-4', 'C', 'C', 'CRITICA', 'Citas verificadas: cada [CIT:id] resuelto a DOI/PMID real con citation_verifier.py (Crossref/PubMed + CSL-JSON → Vancouver); cero referencias de memoria',
    '≤5 referencias con status verified + lista Vancouver generada; ninguna needs_review / rejected',
    'CARTA_1/refs_verified.json (salida de citation_verifier.py) + borrador v2 con [n]',
    'python DATA/RESEARCH/agentic/citation_verifier.py', ['CROSSREF', 'PM']),
  a('C-5', 'C', 'C', 'MEDIA', 'Formateo al journal del artículo diana (Author Guidelines: título, autores + ORCID, conflictos, límite exacto) + cover letter de 5 líneas + cuenta activa en el portal del journal (Editorial Manager / ScholarOne)',
    'Manuscrito formateado (.docx) + cover letter + cuenta del portal activa',
    'CARTA_1/carta_final.docx + cover_letter.md',
    'Editorial Manager / ScholarOne', ['EM', 'ICMJE', 'COPE']),
  a('C-6', 'C', 'C', 'CRITICA', 'SUBMIT carta al editor #1 (antes del deadline calculado en C-2) + registrar la fecha de envío y el nº de manuscrito en la Mesa editorial',
    'Carta ENVIADA ✅ · estado carta-1 → enviado',
    'Mesa editorial: carta-1 = enviado (fecha) + MENTORES.md actualizado si hay coautor',
    'Editorial Manager / ScholarOne', ['ICMJE'], { apex: { id: 'carta-submit', t: 'Carta #1 enviada' }, hito: 'carta-1' }),
  a('T-1', 'T', 'T', 'CRITICA', 'Ética de la tesis (adolescentes, colegio): verificar y ARCHIVAR nº y fecha de aprobación del CEI (UNCP u hospital) + asentimiento / consentimiento parental; si no hubo CEI formal → consultar con el asesor la vía (aprobación retrospectiva o expedita, o journal que acepte declaración)',
    'Documento de ética localizado (o decisión escrita de la vía alternativa) + párrafo de ética/consentimiento listo para Methods',
    'DATA/RESEARCH/TESIS_L0/etica.md (nº CEI, fecha, consentimientos, párrafo para Methods)',
    'Archivo de la tesis · asesor', ['ICMJE', 'COPE'], { chips: ['sin nº de CEI muchos journals (JAAD Intl, IJD) rechazan de entrada'], hito: 'tesis-etica' }),
  a('T-2', 'T', 'T', 'ALTA', 'STROBE (transversal, 22 ítems) sobre la tesis: marcar qué ítem ya está, qué falta y qué se recorta para el formato research letter',
    'Checklist STROBE rellenada (22 ítems con página / estado) — base del Methods',
    'TESIS_L0/STROBE_checklist.md',
    'STROBE', ['STROBE', 'EQ']),
  a('R7', 'R1', 'R', 'ALTA', 'Criterios de elegibilidad de SR-1 (inclusión / exclusión, diseños admitidos, idiomas, años) en tabla PICOS',
    'Tabla PICOS de SR-1 congelable para el protocolo',
    'lines/L4-complicaciones.md §3 actualizado + nota 01_protocolo_PICO',
    '—', ['COCHB', 'PRISMA']),
  a('T-3', 'T', 'T', 'ALTA', 'Research letter (600-1000 palabras): Introduction (gap: QoL en acné adolescente andino, CADI en LMIC) + Methods (transversal, n=316, IGA como gold standard del Dr. Ciro, CADI, rs de Spearman, κ)',
    'Intro + Methods redactados (≤400 palabras) con [CIT:id]',
    'TESIS_L0/research_letter_v1.md (Intro + Methods)',
    'Obsidian · Phrasebank', ['PHRASE', 'STROBE', 'SCIWRITE']),
  a('T-4', 'T', 'T', 'ALTA', 'Results: 1 tabla (características + IGA×CADI) y 1 figura (correlación rs=0.637 o distribución por severidad) con gtsummary / R base; prevalencia 39.8 %, κ=0.81',
    'Tabla 1 + Figura 1 (300 dpi) + párrafo de Results',
    'TESIS_L0/tabla1.docx + figura1.tiff + research_letter_v1.md (Results)',
    'R · gtsummary', ['GTS', 'BBR'], { apex: { id: 'tesis-results', t: 'Tabla 1 + Figura 1 de la tesis' } }),
  a('CR-1', 'CR', 'CR', 'CRITICA', 'CASE REPORT #1 — decidir la FUENTE del caso antes del 31-oct: (a) Dr. Ciro: 1-2 casos de su consulta (ideal complicación de inyectable = L4, o caso raro con buenas fotos) con él como senior author; (b) plan B: dermatólogo de la Sociedad Peruana de Dermatología',
    'Tabla de casos candidatos (diagnóstico · por qué es publicable · fotos disponibles · senior author · estado) + 1 caso ELEGIDO',
    'DATA/RESEARCH/CASE_REPORT_1/caso_candidatos.md + Mesa editorial: senior author del case report',
    'Dr. Ciro · SPD', ['CARE', 'DOJ', 'JAADCR'], { chips: ['sin caso antes del 31-oct el entregable de feb-2027 no ocurre'], apex: { id: 'cr-caso', t: 'Caso + senior author' }, hito: 'cr-caso' }),
  a('T-5', 'T', 'T', 'ALTA', 'Discussion (≤250 palabras: hallazgo, comparación con la literatura CADI, limitaciones, implicación) + decidir la CASCADA y el coste: JAAD International (OA, 50 % Grupo B) → IJD → Actas Dermo-Sifiliográficas ($0) → Anais Brasileiros ($0)',
    'Discussion redactada + cascada con APC verificado en la web de cada journal (con fecha) o "A VERIFICAR"',
    'TESIS_L0/research_letter_v1.md (completo) + TESIS_L0/cascada_journals.md',
    'Obsidian', ['JAADINT', 'IJD', 'ACTAS', 'ANAIS', 'PHRASE']),
  a('CR-2', 'CR', 'CR', 'CRITICA', 'Consentimiento de PUBLICACIÓN (distinto del asistencial): plantilla bilingüe ES/EN según lo que exigen DOJ y CARE, con fotos y datos clínicos; firmado por el paciente (o tutor)',
    'Consentimiento firmado y escaneado (sin él no hay case report)',
    'CASE_REPORT_1/consentimiento_publicacion_ES_EN.md (plantilla) + consentimiento_firmado.pdf (fuera del repo)',
    'Plantilla + consulta', ['CARE', 'COPE', 'ICMJE']),
  a('T-6', 'T', 'T', 'ALTA', 'Revisión del research letter por el Dr. Ciro (coautor / senior): comentarios incorporados + criterios ICMJE de autoría + roles CRediT + conflictos + ORCID de ambos',
    'v2 revisada por el senior author + página de autoría (ICMJE / CRediT / conflictos)',
    'TESIS_L0/research_letter_v2.md + autoria.md',
    'Dr. Ciro', ['ICMJE', 'CREDIT', 'COPE']),
  a('CR-3', 'CR', 'CR', 'ALTA', 'Fotos clínicas estandarizadas: fondo neutro, misma distancia e iluminación, sin datos identificables (recortar u ocultar ojos y tatuajes), pre/post si hay; nombrar por fecha; protocolo escrito',
    'Set de fotos (≥2, 300 dpi, anonimizadas) + protocolo fotográfico',
    'CASE_REPORT_1/protocolo_fotos.md + carpeta fotos/ (fuera del repo)',
    'Cámara / móvil · editor de imagen', ['CARE', 'DOJ']),
  a('T-7', 'T', 'T', 'CRITICA', 'Formateo a JAAD International (Author Guidelines · Editorial Manager): research letter 600-1000 palabras, 1 tabla, 1 figura, ≤10 refs verificadas con citation_verifier.py, declaración de ética (T-1), cover letter',
    'Manuscrito formateado + refs verified + cover letter + declaración de ética',
    'TESIS_L0/research_letter_final.docx + refs_verified.json + cover_letter.md',
    'citation_verifier.py · Editorial Manager', ['JAADINT', 'CROSSREF', 'EM']),
  a('CR-4', 'CR', 'CR', 'ALTA', 'CARE (13 ítems): rellenar la checklist + tabla TIMELINE del paciente + párrafo de perspectiva del paciente + declaración de consentimiento',
    'CARE checklist 13/13 con página + timeline en tabla',
    'CASE_REPORT_1/CARE_checklist_13.md + timeline.md',
    'CARE', ['CARE', 'EQ'], { apex: { id: 'care', t: 'CARE 13/13' } }),
  a('T-8', 'T', 'T', 'CRITICA', 'SUBMIT research letter de la tesis a JAAD International (o al siguiente de la cascada si el primero no aplica) + registrar en la Mesa editorial y en CTI Vitae',
    'Tesis ENVIADA ✅ (nº de manuscrito) · estado tesis-L0 → enviado',
    'Mesa editorial: tesis-L0 = enviado (fecha) + CTI Vitae actualizado',
    'Editorial Manager', ['JAADINT', 'ICMJE'], { apex: { id: 'tesis-submit', t: 'Tesis enviada' }, hito: 'tesis-L0' }),
  a('CR-5', 'CR', 'CR', 'ALTA', 'Borrador del case report (límite de palabras de DOJ: A VERIFICAR en sus guías): presentación → hallazgos → diagnóstico → tratamiento → evolución → discusión con 3-5 refs [CIT:id] + "por qué este caso enseña algo"',
    'Borrador v1 completo siguiendo el orden CARE',
    'CASE_REPORT_1/borrador_v1.md',
    'Obsidian · Phrasebank', ['CARE', 'PHRASE', 'DOJ']),
  a('X-1', 'X', 'R', 'ALTA', 'SR-1 · EQUIPO DE REVISIÓN: nombrar al revisor humano #2 ANTES de PROSPERO (opciones: Dr. Ciro · egresado UNCP con interés en investigación · colaborador IMG de la campaña); ofrecer coautoría por 2º cribado + extracción; cuenta Rayyan (gratis ≤3 revisiones)',
    'Revisor #2 propuesto (nombre, afiliación, ORCID, conflicto) + invitación enviada',
    'lines/L4-complicaciones.md §9 "Equipo de revisión" rellenado + MENTORES.md',
    'Rayyan', ['RAY', 'PROS', 'COCHB'], { chips: ['PRISMA 2020 ítem 8 y Cochrane exigen ≥2 revisores independientes; 2 pases de la misma persona NO son cribado dual'], hito: 'revisor2' }),
  a('CR-6', 'CR', 'CR', 'ALTA', 'Revisión del case report por el senior author (mentor local) + mentor de Rising Scholars (inglés): incorporar cambios y verificar cada afirmación clínica contra fuente primaria',
    'v2 con comentarios del senior + inglés revisado · estado case-report-1 → revision-mentor',
    'CASE_REPORT_1/borrador_v2.md',
    'Senior author · Rising Scholars', ['RISING', 'CARE']),
  a('X-2', 'X', 'C', 'MEDIA', 'Post-submit de la carta: plantilla de rebuttal punto por punto (comentario → respuesta → cambio exacto) + actualizar el estado real (en-revisión / decisión) en la Mesa editorial; si llegó decisión, responder en ≤7 días',
    'Plantilla de rebuttal lista + estado real de carta-1',
    'CARTA_1/rebuttal_plantilla.md + Mesa editorial',
    'Mesa editorial', ['REBUTTAL', 'SCIWRITE']),
  a('CR-7', 'CR', 'CR', 'ALTA', 'Formateo a Dermatology Online Journal (eScholarship): guías de autor (A VERIFICAR: límite de palabras / fotos / coste ≤US$300), refs verificadas con citation_verifier.py, figuras con leyenda, consentimiento adjunto',
    'Manuscrito formateado + refs verified + figuras + consentimiento + cover letter',
    'CASE_REPORT_1/case_report_final.docx + refs_verified.json + cover_letter.md',
    'citation_verifier.py · eScholarship', ['DOJ', 'CROSSREF', 'CARE']),
  a('CR-8', 'CR', 'CR', 'CRITICA', 'Paquete de envío CONGELADO (manuscrito + fotos + consentimiento + CARE + cover) — el SUBMIT se ejecuta el 1-feb-2027 (ciclo 2 · CR-9), después del Step 1',
    'Paquete completo y revisado; nada pendiente para febrero · estado → revision-mentor',
    'CASE_REPORT_1/_PAQUETE_ENVIO/ (todo lo que se sube) + Mesa editorial: fecha objetivo 1-feb',
    '—', ['CARE', 'DOJ'], { apex: { id: 'cr-paquete', t: 'Case report listo para enviar' }, hito: 'cr-paquete' }),
  a('R3', 'R0', 'R', 'ALTA', 'Ver una SR de punta a punta (8 fases) + des-riesgar el meta-análisis: instalar R + metafor y reproducir 1 forest plot del libro "Doing Meta-Analysis in R" (para que R29-R33 del ciclo 2 no sean la primera vez)',
    'Esquema de las 8 fases con su herramienta + script R que reproduce un forest plot de ejemplo',
    'Vault SR-1/_hoja_de_ruta (8 fases) + 05_manuscrito/ejemplo_metafor.R',
    'R · metafor', ['STEPSR', 'DMAR', 'METAFOR'], { apex: { id: 'sr-map', t: '8 fases + metafor instalado' }, recortable: true }),
  a('R8', 'R1', 'R', 'ALTA', 'Protocolo PRISMA-P de SR-1: borrador de secciones (pregunta, elegibilidad, fuentes, estrategia, selección con 2 revisores, extracción doble, sesgo, síntesis) — se congela en el ciclo 2',
    'Borrador de protocolo (secciones PRISMA-P) con huecos marcados [PROTOCOL GAP]',
    'Vault SR-1/01_protocolo_PICO/protocolo_PRISMA-P_v0.md',
    '—', ['PRISMA', 'COCHB'], { recortable: true }),
  a('R9', 'R1', 'R', 'ALTA', '¿Existe ya una SR publicada o registrada del mismo PICO? Búsqueda en PROSPERO + PubMed ("systematic review" filler vascular occlusion hyaluronidase) → decisión seguir / afinar el ángulo (tiempo-a-tratamiento + LATAM)',
    'Lista de SR y registros vecinos + decisión escrita (seguir / afinar) en L4 §6',
    'lines/L4-complicaciones.md §6 actualizado',
    'PROSPERO · PubMed', ['PROS', 'PM', 'AMSTAR'], { recortable: true }),
  a('X-3', 'X', 'R', 'MEDIA', 'Corpus SR-1 YA descubierto: inventariar los 200 registros de research_papers (pending_human desde 11-jun-2026; 151 OA sin PDF resuelto) — contar, exportar CSV (título, autores, año, DOI, abstract) y NO re-correr discovery hasta tener la query PRISMA-S final (ciclo 2 · R12)',
    'CSV del corpus + nota de estado (n, OA, duplicados por DOI)',
    'Vault SR-1/02_busqueda/corpus_2026-06_inventario.csv + nota',
    'Supabase (consola) · Sheets', ['RAY', 'UNPAY'], { recortable: true }),
  a('X-4', 'X', 'B', 'MEDIA', 'Congresos con abstract alcanzable (AAD · CILAD · RADLA): verificar en la web oficial la fecha límite de abstracts 2027 y el formato; elegir 1 al que llegue la tesis o la SR-1 preliminar',
    '1 congreso elegido con deadline VERIFICADO (URL + fecha) o marcado "A VERIFICAR"',
    'DATA/RESEARCH/MENTORES.md §Congresos con la fecha verificada',
    'Web oficial de cada congreso', ['SCIWRITE', 'PHRASE'], { recortable: true }),
  a('X-5', 'X', 'K', 'MEDIA', 'Campaña de cold emails (feb-mar 2027): lista de 20-30 autores de papers recientes del corpus SR-1 y de L5 (fototipos IV-VI) con el trabajo concreto que ofrezco a cada uno (cribado PRISMA, extracción, draft) — nunca "quiero experiencia"',
    'Lista de 20-30 nombres (paper · email institucional · oferta concreta) + plantilla de email de 8 líneas',
    'MENTORES.md §Campaña feb-2027 (tabla) + plantilla',
    'Corpus SR-1 · OpenAlex (autores)', ['OPENALEX', 'PHRASE', 'ICMJE'], { recortable: true }),
  a('X-6', 'X', 'X', 'ALTA', 'Retro del ciclo 1 + Mesa editorial: estado REAL de carta-1 / tesis-L0 / case-report-1 (enviado · en-revisión · decisión), MENTORES.md al día, presupuesto 2026-27 (carta $0 · tesis $0-APC · case report ≤$300 · SR-1 $0)',
    'Mesa editorial con los 3 estados reales + presupuesto escrito + 3 lecciones del ciclo',
    'Mesa editorial (app) + RUTA_PUBLICACION_2027.md §3 presupuesto',
    'Mesa editorial', ['COPE', 'ICMJE'], { recortable: true }),
  a('X-7', 'X', 'X', 'CRITICA', 'CIERRE ANTES DE LA PAUSA (4→29-ene = 0 átomos · Step 1): nada que venza en enero — rebuttals respondidos o programados, PROSPERO aún NO registrado, revisor #2 confirmado, paquete del case report congelado; el ciclo 2 arranca el 1-feb con el SUBMIT del case report',
    'Checklist de pausa 100 % + primer átomo del ciclo 2 leído',
    'Mesa editorial: cada entregable con estado y próxima fecha · Vault Dashboard_Research',
    'Mesa editorial', ['ICMJE'], { apex: { id: 'cierre-c1', t: 'Ciclo 1 cerrado · pausa Step 1' } }),
];

// ─── Átomos · CICLO 2 (feb→ago 2027) · SR-1 completa con revisor humano #2 ───
const DUAL = 'por DOS revisores humanos independientes en ciego (Joseph + revisor #2); ningún LLM cuenta como revisor';
// Cola del ciclo 1 (d41-d42): los 2 primeros días-Research TRAS la pausa. Fijan el total en 42 (lo que remap_inicio.js exige).
const TAIL1 = [
  a('CR-9', 'CR', 'CR', 'CRITICA', 'SUBMIT case report #1 a Dermatology Online Journal (paquete congelado en CR-8) + registrar el nº de manuscrito — primer día-Research tras el Step 1',
    'Case report ENVIADO ✅ · estado case-report-1 → enviado', 'Mesa editorial: case-report-1 = enviado (fecha)', 'eScholarship', ['DOJ', 'CARE'],
    { apex: { id: 'cr-submit', t: 'Case report #1 enviado' }, hito: 'case-report-1' }),
  a('X-8', 'X', 'X', 'ALTA', 'Re-arranque post-Step 1: repasar las 8 fases de una SR + estado de carta / tesis / case report en la Mesa editorial (decisiones recibidas, rebuttals pendientes) + revisar que las 10 cuentas de la infra siguen activas',
    'Mesa editorial al día + lista de pendientes editoriales', 'Mesa editorial + Dashboard_Research', 'Mesa editorial', ['STEPSR', 'REBUTTAL']),
];
const C2 = [
  a('R6b', 'R1', 'R', 'CRITICA', 'PICO de SR-1 REVALIDADO tras Derma d19-20 (oclusión vascular / HDPH): ajustar desenlaces (recuperación cutánea o visual, tiempo-a-hialuronidasa, dosis) y criterios PICOS v2',
    'PICO + PICOS v2 congelables', 'L4 §2-3 v2 + vault 01_protocolo_PICO', '—', ['DELO', 'COCHB'], CD),
  a('R8b', 'R1', 'R', 'CRITICA', 'Protocolo PRISMA-P COMPLETO (17 ítems): rellenar los [PROTOCOL GAP] del v0; selección con 2 revisores independientes, extracción doble, ROBINS-I / JBI, síntesis (proporciones o narrativa)',
    'Protocolo v1 completo', 'vault 01_protocolo_PICO/protocolo_PRISMA-P_v1.md', '—', ['PRISMA', 'COCHB', 'TOP']),
  a('X-9', 'R2', 'R', 'CRITICA', 'EQUIPO DE REVISIÓN confirmado para PROSPERO: revisor #2 con cuenta Rayyan, ORCID de todos, afiliaciones, roles (garante, contacto, cribadores, extractores, estadístico), conflictos de interés, fechas previstas',
    'L4 §9 completo — se copia tal cual a PROSPERO', 'lines/L4-complicaciones.md §9 + MENTORES.md', 'Rayyan · ORCID', ['PROS', 'RAY', 'ORCID', 'CREDIT'], { hito: 'equipo' }),
  a('R9b', 'R1', 'R', 'ALTA', 'Duplicidad final: re-buscar en PROSPERO + PubMed registros y SR nuevos desde dic-2026; confirmar el ángulo diferencial (tiempo-a-tratamiento + LATAM)',
    'Decisión final escrita en L4 §6', 'lines/L4-complicaciones.md §6', 'PROSPERO · PubMed', ['PROS', 'PM']),
  a('R10', 'R2', 'R', 'CRITICA', 'PROSPERO: rellenar el formulario completo (campos obligatorios, equipo de revisión de L4 §9, fechas previstas, conflictos, fuentes) y ENVIAR',
    'Registro PROSPERO de SR-1 ENVIADO · estado PROSPERO-SR1 → enviado', 'PDF del registro + Mesa editorial', 'PROSPERO', ['PROS'],
    { apex: { id: 'prospero', t: 'SR-1 registrada (CRD)' }, hito: 'PROSPERO-SR1' }),
  a('K1', 'K', 'K', 'ALTA', 'Campaña de cold emails 1/2: enviar 10 correos hiperpersonalizados de la lista de diciembre (oferta concreta: cribado PRISMA / extracción / draft) + registrar en MENTORES.md',
    '10 emails enviados + tabla de seguimiento', 'MENTORES.md §Campaña', 'Email', ['PHRASE', 'ICMJE']),
  a('R11', 'R2', 'R', 'MEDIA', 'Plan B si PROSPERO no encaja (scoping → OSF Registries) + esperar el CRD; protocolo congelado (v1 con fecha) en OSF',
    'CRD recibido o registro OSF; protocolo congelado', 'OSF + vault 01_protocolo_PICO', 'OSF', ['PROS', 'OSF', 'TOP']),
  a('K2', 'K', 'K', 'MEDIA', 'Campaña de cold emails 2/2: 10-20 correos restantes + seguimiento a los sin respuesta (1 recordatorio a los 10 días) + DIGA (comité IMG) y Skin of Color Society',
    'Campaña completa (20-30) + respuestas registradas + ≥1 colaborador para SR-1', 'MENTORES.md §Campaña', 'Email', ['PHRASE']),
  a('R12', 'R3', 'R', 'CRITICA', 'Estrategia maestra: OpenAlex (troncal, booleana) + MeSH en MEDLINE/PubMed (líneas numeradas) — la query PRISMA-S final',
    'Query OpenAlex + sintaxis PubMed numerada', 'vault 02_busqueda/query_v1.md', 'OpenAlex · PubMed', ['OPENALEX', 'NLM1', 'PM'], { apex: { id: 'mesh', t: 'Query OpenAlex + MeSH' } }),
  a('R13', 'R3', 'R', 'ALTA', 'Trasladar la query a Europe PMC + CENTRAL + Semantic Scholar (5 fuentes)',
    'Sintaxis + nº de resultados por fuente', 'vault 02_busqueda/fuentes.md', 'Europe PMC · S2', ['EPMC', 'CENT', 'SEMSCH']),
  a('R14', 'R3', 'R', 'ALTA', 'LILACS/BVS (DeCS · ventaja LATAM) + ClinicalTrials.gov + ICTRP',
    'Búsquedas anotadas con nº de resultados', 'vault 02_busqueda/fuentes.md', 'LILACS · CT.gov', ['LILACS', 'CT', 'ICTRP']),
  a('R15', 'R3', 'R', 'ALTA', 'PRISMA-S (16 ítems): documentar cada componente (fecha, base, interfaz, sintaxis, límites, nº)',
    'Tabla PRISMA-S de SR-1', 'vault 02_busqueda/PRISMA-S.md', '—', ['PRISMAS']),
  a('R16', 'R3', 'R', 'ALTA', 'Corpus: re-correr discovery con la query final + unir con los 200 registros de jun-2026 + dedup por DOI + resolver texto completo en lote (Unpaywall) + exportar CSV/RIS para Rayyan',
    'Biblioteca dedup (n registros) + PDFs OA + CSV/RIS', 'vault 02_busqueda/corpus_final.csv', 'research-discovery · Unpaywall', ['UNPAY', 'OPENALEX', 'RAY']),
  a('R17', 'R4', 'R', 'CRITICA', 'Rayyan: crear la SR-1, subir el corpus, INVITAR al revisor #2 (cuenta creada en X-9), etiquetas de exclusión y modo CIEGO activado',
    'Proyecto Rayyan con 2 revisores en ciego', 'Rayyan (SR-1) + vault 03_screening/_README', 'Rayyan', ['RAY', 'RAYHC', 'RAYYT'], { apex: { id: 'rayyan', t: 'Cribado dual en Rayyan' } }),
  a('R18 (1/3)', 'R4', 'R', 'CRITICA', `Cribado título/abstract (nivel 1) ${DUAL} — primer tercio`, 'Primer tercio cribado por ambos revisores', 'Rayyan: decisiones de ambos', 'Rayyan', ['RAY', 'COCHB']),
  a('R18 (2/3)', 'R4', 'R', 'CRITICA', `Cribado título/abstract (nivel 1) ${DUAL} — segundo tercio`, 'Dos tercios cribados por ambos', 'Rayyan: decisiones de ambos', 'Rayyan', ['RAY', 'COCHB']),
  a('R18 (3/3)', 'R4', 'R', 'CRITICA', `Cribado título/abstract (nivel 1) ${DUAL} — cierre`, 'Nivel 1 completo por ambos; conflictos marcados', 'Rayyan: decisiones de ambos + lista de conflictos', 'Rayyan', ['RAY', 'COCHB']),
  a('R20', 'R4', 'R', 'ALTA', 'κ de Cohen del nivel 1 con las decisiones de los 2 humanos (Python/R) + reunión de resolución de conflictos (regla escrita: consenso o 3er revisor)',
    'κ + IC95 % reportado + conflictos resueltos', 'vault 03_screening/kappa_n1.md', 'Python/R', ['STEPSR', 'COCHB'], { chips: ['κ con un solo humano no tiene sentido: exige 2 revisores'] }),
  a('R19 (1/2)', 'R4', 'R', 'ALTA', `Texto completo (nivel 2) ${DUAL} con razones de exclusión estandarizadas — primera mitad`, 'Mitad de los textos completos revisada por ambos', 'Rayyan + vault 03_screening/excluidos.md', 'Rayyan', ['RAY']),
  a('R19 (2/2)', 'R4', 'R', 'ALTA', `Texto completo (nivel 2) ${DUAL} — segunda mitad`, 'Nivel 2 completo; excluidos con motivo', 'Rayyan + vault 03_screening/excluidos.md', 'Rayyan', ['RAY']),
  a('R21', 'R4', 'R', 'ALTA', 'κ del nivel 2 + diagrama de flujo PRISMA 2020 con números reales (identificados, cribados, excluidos por motivo, incluidos)',
    'κ nivel 2 + PRISMA flow', 'vault 03_screening/PRISMA_flow.png', 'eshackathon Shiny', ['PRISMAF', 'STEPSR'], { apex: { id: 'prisma-flow', t: 'Diagrama PRISMA 2020' } }),
  a('R22', 'R5', 'R', 'ALTA', 'Formulario de extracción piloteado (diseño, n, producto, zona, tiempo-a-hialuronidasa, dosis, desenlace, secuelas, dominios de sesgo) — mecanismo de la oclusión aprendido en Derma',
    'Plantilla de extracción v1', 'vault 04_extraccion/formulario_v1.xlsx', 'Sheets', ['COCHB', 'DELO'], CD),
  a('R23', 'R5', 'R', 'ALTA', 'Piloto de extracción en 2-3 estudios por AMBOS revisores + ajustar el formulario (v2)',
    'Formulario v2 + 3 filas piloto ×2', 'vault 04_extraccion/formulario_v2.xlsx', 'Sheets', ['COCHB']),
  a('R24 (1/3)', 'R5', 'R', 'ALTA', 'Extracción DOBLE independiente (Joseph + revisor #2); Elicit solo como asistencia para localizar datos, nunca como segundo extractor — primer tercio',
    'Primer tercio extraído ×2', 'vault 04_extraccion/extraccion_A.xlsx + extraccion_B.xlsx', 'Sheets · Elicit', ['COCHB', 'ELI']),
  a('R24 (2/3)', 'R5', 'R', 'ALTA', 'Extracción DOBLE independiente — segundo tercio', 'Dos tercios extraídos ×2', 'vault 04_extraccion/extraccion_A.xlsx + extraccion_B.xlsx', 'Sheets · Elicit', ['COCHB', 'ELI']),
  a('R24 (3/3)', 'R5', 'R', 'ALTA', 'Extracción DOBLE independiente — cierre + reconciliación de discrepancias registrada',
    'Extracción completa + discrepancias reconciliadas y registradas', 'vault 04_extraccion/discrepancias.md', 'Sheets', ['COCHB'], { chips: ['la reconciliación se reporta en Methods (PRISMA 2020 ítem 9)'] }),
  a('R25', 'R5', 'R', 'MEDIA', 'Cerrar la tabla de características de estudios (1 fila por estudio)',
    'Tabla completa lista para Results', 'vault 04_extraccion/tabla_caracteristicas.xlsx', '—', ['COCHB'], { apex: { id: 'extraction', t: 'Tabla de extracción cerrada' } }),
  a('R26 (1/2)', 'R6', 'R', 'ALTA', 'Riesgo de sesgo por ambos revisores: ROBINS-I (no-aleatorizados) / JBI-Murad para series y reportes de caso — primera mitad',
    'Mitad evaluada ×2', 'vault 04_extraccion/RoB.xlsx', 'riskofbias.info', ['ROBINS', 'ROB2']),
  a('R26 (2/2)', 'R6', 'R', 'ALTA', 'Riesgo de sesgo — segunda mitad + consenso', 'RoB completo ×2 + consenso', 'vault 04_extraccion/RoB.xlsx', 'riskofbias.info', ['ROBINS', 'ROB2'], { apex: { id: 'rob', t: 'Riesgo de sesgo evaluado' } }),
  a('R27', 'R6', 'R', 'ALTA', 'GRADE (5 dominios) + Summary of Findings por desenlace', 'SoF table de SR-1', 'GRADEpro + vault 04_extraccion/SoF.md', 'GRADEpro', ['GRADE']),
  a('R28', 'R6', 'R', 'MEDIA', 'AMSTAR-2 sobre 2-3 SR vecinas para posicionar la nuestra en la Discussion', 'Nota AMSTAR-2', 'vault 05_manuscrito/AMSTAR2_vecinas.md', '—', ['AMSTAR']),
  a('R29 (1/2)', 'R7', 'R', 'ALTA', 'R + metafor: cargar la tabla de extracción real y preparar el dataset (1 fila por estudio y desenlace)',
    'Script que lee la tabla', 'vault 05_manuscrito/ma_01_setup.R', 'R', ['DMAR', 'METAFOR']),
  a('R29 (2/2)', 'R7', 'R', 'ALTA', 'Calcular 1 tamaño de efecto sobre datos reales (proporción de recuperación / tiempo-a-tratamiento)',
    '1 effect size reproducido', 'vault 05_manuscrito/ma_01_setup.R', 'R', ['DMAR', 'METAFOR'], { apex: { id: 'r-setup', t: 'metafor sobre datos reales' } }),
  a('R30 (1/2)', 'R7', 'R', 'ALTA', 'Tamaño de efecto correcto (proporciones transformadas / medias de tiempo) + modelo de efectos aleatorios vs fijo (justificar por escrito)',
    'Elección justificada', 'vault 05_manuscrito/ma_02_pooled.R', 'R', ['DMAR', 'COCHYT']),
  a('R30 (2/2)', 'R7', 'R', 'ALTA', 'Pooled estimate con IC95 %', 'Pooled estimate + IC95 %', 'vault 05_manuscrito/ma_02_pooled.R', 'R', ['DMAR']),
  a('R31 (1/2)', 'R7', 'R', 'ALTA', 'Forest plot v1 + heterogeneidad (I², τ², intervalo de predicción)', 'Forest plot v1 + I²/τ²', 'vault 05_manuscrito/fig_forest.tiff', 'R', ['DMAR', 'METAFOR']),
  a('R31 (2/2)', 'R7', 'R', 'ALTA', 'Forest plot final TIFF 300 dpi + párrafo de heterogeneidad', 'Forest TIFF 300 dpi + I²/τ² reportados', 'vault 05_manuscrito/fig_forest.tiff', 'R', ['DMAR', 'METAFOR'], { apex: { id: 'forest', t: 'Forest plot + heterogeneidad' } }),
  a('R32', 'R7', 'R', 'MEDIA', 'Sesgo de publicación: funnel plot + test de Egger (si ≥10 estudios; si no, declararlo)', 'Funnel + Egger o justificación', 'vault 05_manuscrito/fig_funnel.tiff', 'R', ['DMAR']),
  a('R33 (1/2)', 'R7', 'R', 'MEDIA', 'Subgrupos definidos a priori en el protocolo: tiempo-a-hialuronidasa (<24 h vs ≥24 h), zona (nasal / glabelar / labial), producto, formación del inyector, LATAM vs resto',
    'Subgrupos calculados', 'vault 05_manuscrito/ma_03_subgrupos.R', 'R', ['DMAR'], CD),
  a('R33 (2/2)', 'R7', 'R', 'MEDIA', 'Análisis de sensibilidad + tabla de subgrupos', 'Sensibilidad + tabla de subgrupos', 'vault 05_manuscrito/ma_03_subgrupos.R', 'R', ['DMAR'], CD),
  a('B1', 'B', 'B', 'MEDIA', 'Abstract (≈250 palabras) para el congreso elegido en X-4 (CILAD / RADLA / AAD) con los resultados preliminares de SR-1 o la tesis — respetar su deadline verificado',
    'Abstract enviado o programado', 'vault 05_manuscrito/abstract_congreso.md + Mesa editorial', 'Web del congreso', ['PHRASE', 'SCIWRITE']),
  a('R34', 'R8', 'R', 'ALTA', 'Methods con PRISMA 2020 (registro, elegibilidad, fuentes, búsqueda, selección con 2 revisores, extracción doble, sesgo, síntesis) — MethodsAgent + CP-1/CP-2',
    'Methods redactado y revisado', 'vault 05_manuscrito/methods.md', 'Sistema agéntico', ['PRISMA', 'PRISMAC'], { apex: { id: 'methods', t: 'Methods (PRISMA 2020)' } }),
  a('R35', 'R8', 'R', 'ALTA', 'Results: flujo PRISMA + tabla de características + forest + SoF; cada número trazable a la tabla de extracción (ResultsAgent + CP-2)',
    'Results + tablas y figuras', 'vault 05_manuscrito/results.md', 'Sistema agéntico', ['PRISMAC', 'GRADE']),
  a('R36', 'R8', 'R', 'ALTA', 'Introduction (gap + objetivo) con [CIT:id] desde el corpus (IntroAgent) + micro-drill Phrasebank',
    'Intro redactada', 'vault 05_manuscrito/intro.md', 'Sistema agéntico', ['PHRASE', 'EQ']),
  a('R37', 'R8', 'R', 'ALTA', 'Discussion: hallazgo principal, comparación con SR vecinas (AMSTAR-2), certeza GRADE, limitaciones explícitas (sesgo de publicación, series de casos), implicación LATAM / PERÚ-SAFE',
    'Discussion redactada', 'vault 05_manuscrito/discussion.md', 'Sistema agéntico', ['PHRASE', 'PRISMAC']),
  a('R38', 'R8', 'R', 'ALTA', 'Checklist PRISMA 2020 de 27 ítems + supplements (PRISMA-S, SoF, CRD, formulario de extracción, código R)',
    'Checklist 27/27 + supplements', 'vault 05_manuscrito/PRISMA_checklist.md + supplements/', '—', ['PRISMAC', 'TURING']),
  a('R39', 'R8', 'R', 'MEDIA', 'Journal target + coste: Dermatologic Surgery / JAAD (suscripción $0) / JCD (OA 50 % Grupo B) / Anais-Actas (Diamond $0); verificar APC en la web y Research4Life',
    'Journal decidido + plan de coste', 'Mesa editorial: cascada SR-1 + coste', '—', ['EQ', 'JAADINT', 'ANAIS']),
  a('CR2-1', 'CR', 'CR', 'ALTA', 'Case report #2: identificar caso + senior author (misma tabla de candidatos; priorizar complicación estética = L4) — reservar JAAD Case Reports solo si es el MEJOR caso',
    'Caso #2 elegido + senior author', 'DATA/RESEARCH/CASE_REPORT_2/caso_candidatos.md', 'Senior author', ['CARE', 'JAADCR']),
  a('R40', 'R8', 'R', 'MEDIA', 'Cover letter + formateo al journal (Editorial Manager / ScholarOne) + página de autoría (ICMJE / CRediT / ORCID / conflictos de TODOS los autores)',
    'Manuscrito formateado + cover + autoría', 'vault 05_manuscrito/SR-1_formateado.docx + cover_letter.md', 'Editorial Manager', ['EM', 'ICMJE', 'CREDIT']),
  a('R41', 'R8', 'R', 'CRITICA', 'CHECKPOINT HUMANO (CP-3/CP-4): citation_verifier.py sobre TODAS las refs (Crossref/PMID + CSL-JSON), paráfrasis, cadena estadística; el revisor #2 firma la lectura completa',
    '.docx aprobado por Joseph y por el revisor #2; 0 [NO VERIFICABLE]', 'vault 05_manuscrito/refs_verified.json + SR-1_revision_v1.docx', 'citation_verifier.py', ['CROSSREF', 'PRISMAC'], { apex: { id: 'hitl', t: 'Checkpoint humano CP-4' } }),
  a('R42', 'R8', 'R', 'ALTA', 'Gate de integridad final: ICMJE 4 criterios por autor, roles CRediT, COPE (sin salami, sin doble envío), preprint sí/no, datos y código depositados (OSF / Zenodo)',
    'Gate ICMJE / COPE / CRediT superado + DOI de datos', 'vault 05_manuscrito/integridad.md + OSF', 'OSF', ['ICMJE', 'COPE', 'CREDIT', 'FAIR']),
  a('R43', 'R8', 'R', 'CRITICA', 'SUBMIT SR-1 ✅ + registrar en la Mesa editorial y CTI Vitae + actualizar el estado en PROSPERO',
    'SR-1 ENVIADA · estado SR-1 → enviado', 'Mesa editorial + PROSPERO actualizado', 'Editorial Manager', ['PROS', 'ICMJE'], { apex: { id: 'submit', t: 'SR-1 enviada' }, hito: 'SR-1' }),
  a('X-10', 'X', 'X', 'MEDIA', 'Re-verificar el Grupo Research4Life de Perú (clasificación Banco Mundial · 1-jul) + presupuesto actualizado con los APC reales de los 4 entregables',
    'Presupuesto research 2026-27 actualizado con fechas de verificación', 'RUTA_PUBLICACION_2027.md §3 presupuesto', 'Web Research4Life', ['JAADINT']),
  a('B2', 'B', 'B', 'MEDIA', 'Estudio bibliométrico / base pública (sin IRB): fijar pregunta + fuente (NRMP Charting Outcomes, Texas STAR, GBD, Google Trends) alineada con derma IMG / fototipos',
    'Pregunta + fuente + variables', 'DATA/RESEARCH/BIBLIOMETRICO_1/protocolo.md', '—', ['NRMP', 'BBR']),
  a('CR2-2', 'CR', 'CR', 'ALTA', 'Case report #2: consentimiento de publicación firmado + fotos estandarizadas (plantillas del case report #1)',
    'Consentimiento + fotos', 'CASE_REPORT_2/', 'Plantillas CR-1', ['CARE']),
  a('B3', 'B', 'B', 'MEDIA', 'Bibliométrico: extraer los datos + Table 1 con gtsummary + data dictionary y README (FAIR)',
    'Dataset limpio + Table 1 + README', 'BIBLIOMETRICO_1/data/ + tabla1.docx', 'R · gtsummary', ['GTS', 'FAIR', 'TURING']),
  a('CR2-3', 'CR', 'CR', 'ALTA', 'Case report #2: CARE 13 ítems + borrador v1', 'CARE 13/13 + borrador', 'CASE_REPORT_2/borrador_v1.md', 'CARE', ['CARE', 'PHRASE']),
  a('B4', 'B', 'B', 'MEDIA', 'Bibliométrico: figuras + borrador (≤1500 palabras) con [CIT:id]', 'Borrador v1 + 2 figuras', 'BIBLIOMETRICO_1/borrador_v1.md', 'R', ['PHRASE', 'SCIWRITE']),
  a('CR2-4', 'CR', 'CR', 'CRITICA', 'Case report #2: revisión del senior author + formateo (DOJ, o JAAD Case Reports si es el mejor caso) + citas verificadas + SUBMIT',
    'Case report #2 ENVIADO', 'Mesa editorial (nuevo ítem case-report-2)', 'citation_verifier.py', ['DOJ', 'JAADCR', 'CROSSREF']),
  a('X-11', 'X', 'X', 'MEDIA', 'Post-submit SR-1: plantilla de rebuttal preparada + hacer 1 peer review (curso Sainani) para entender al revisor',
    'Rebuttal plantilla + 1 review practicada', 'vault 05_manuscrito/rebuttal_plantilla.md', '—', ['REBUTTAL', 'SCIWRITE']),
  a('B5', 'B', 'B', 'MEDIA', 'Bibliométrico: citas verificadas + formateo + SUBMIT (journal por decidir; Cureus solo táctico, máximo 1-2 ítems del CV)',
    'Bibliométrico ENVIADO', 'Mesa editorial (nuevo ítem bibliometrico-1)', 'citation_verifier.py', ['CROSSREF', 'DOJ']),
  a('R44', 'R1', 'R', 'ALTA', 'SR-2 (Línea 5 · RF/CO₂ en fototipos IV-VI): PICO + duplicidad (el MA 2026 de Argobi en JCD acota el gap al subgrupo IV-VI) → abrir el ciclo 3',
    'PICO de SR-2 + decisión', 'lines/L5-energia-fototipos.md §2 + vault SR-2/_hoja_de_ruta', 'PROSPERO · PubMed', ['PROS', 'PM']),
  a('R45', 'R1', 'R', 'ALTA', 'SR-2: protocolo PRISMA-P + equipo de revisión (revisor #2 desde el inicio, coautores de la campaña)',
    'Protocolo SR-2 + equipo', 'lines/L5-energia-fototipos.md §Equipo de revisión', '—', ['PRISMA', 'COCHB']),
  a('R46', 'R2', 'R', 'ALTA', 'SR-2: registro PROSPERO ENVIADO', 'PROSPERO SR-2 enviado', 'Mesa editorial (nuevo ítem PROSPERO-SR2)', 'PROSPERO', ['PROS'], { apex: { id: 'prospero-sr2', t: 'SR-2 registrada' } }),
  a('X-12', 'X', 'X', 'ALTA', 'BALANCE 12 meses (RUTA §6): publicaciones enviadas / aceptadas, abstracts, mentores (Ciro · Rising Scholars · Finlay · campaña), decisión informada sobre research fellowship presencial 2028',
    'Balance escrito + decisión fellowship 2028 (sí / no / cuándo)', 'RUTA_PUBLICACION_2027.md §Balance + Mesa editorial', 'Mesa editorial', ['ICMJE'], { apex: { id: 'balance', t: 'Balance ago-2027' } }),
  a('X-13', 'X', 'X', 'BAJA', 'COLCHÓN 1: cerrar cualquier átomo a medias (rebuttals, revisiones mayores, case report #2)', 'Sin pendientes abiertos', 'Mesa editorial', '—', ['REBUTTAL']),
  a('X-14', 'X', 'X', 'BAJA', 'COLCHÓN 2: retro del método — qué automatizar para SR-2 en el sistema agéntico + arranque del plan del ciclo 3', 'Lista de mejoras + ciclo 3 esbozado', 'Vault Dashboard_Research', 'Obsidian', ['TURING']),
];

// ─── Bloque estático 1: leyenda REC (entradas históricas del plan; las nuevas van en REC_EXTRA) ───
const STATIC_REC = `/** Leyenda de recursos verificados (mismas URLs que DATA/RESEARCH/daily-plan.md §6; verificadas jun-jul 2026 · las nuevas, 05-sep-2026). */
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
  FAIR:   { label: 'FAIR data principles (GO FAIR)', url: 'https://www.go-fair.org/fair-principles/' },`;
// ─── Bloque estático 2: FRANJAS + MAESTRÍA TRANSVERSAL + TOP 2026 (contenido aditivo, no depende de las fechas) ───
const STATIC_REST = `/** Franjas del bloque Research (45 min). Mezcla eval anclada + deep work productivo. */
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
];`;

const REC_KEYS = new Set([...STATIC_REC.matchAll(/^\s{2}([A-Z0-9]+):\s*\{/gm)].map((m) => m[1]).concat(Object.keys(REC_EXTRA)));
for (const [k, r] of Object.entries(REC_EXTRA)) if (STATIC_REC.includes(`\n  ${k}:`)) throw new Error('REC duplicado: ' + k);

// ─── Fechado ───
const ULTIMO_ANTES_PAUSA = addDays(PAUSA.desde, -1);
const TOTAL_C1 = 42; // invariante que remap_inicio.js comprueba (RES!=42) — NO cambiar sin tocar remap
/** Ciclo 1: el núcleo (C1) ocupa los días-Research entre START1 y la pausa; lo que no cabe (átomos `recortable`,
 *  de prep de SR-1) se desplaza a después de la pausa, detrás de la cola TAIL1 (submit case report + re-arranque). */
function fecharCiclo1(start) {
  const core = C1.slice(); const spill = [];
  let nBefore = 0; for (let c = start; c <= ULTIMO_ANTES_PAUSA; c = addDays(c, 1)) if (tipoDia(c) === 'research' && !SKIP_FIJOS.has(c)) nBefore++;
  while (core.length > nBefore) {
    const i = core.map((x, j) => (x.recortable ? j : -1)).filter((j) => j >= 0).pop();
    if (i == null || i < 0) throw new Error(`ciclo 1: ${core.length} átomos no caben en ${nBefore} días-Research antes de la pausa y no quedan átomos recortables`);
    console.warn(`⚠ ciclo 1: ${core[i].code} no cabe antes de la pausa → pasa a después del ${PAUSA.hasta}`);
    spill.unshift(core.splice(i, 1)[0]);
  }
  const fechasCore = slots(start, core.length);
  const tail = [...TAIL1, ...spill];
  const tailStart = [addDays(fechasCore[fechasCore.length - 1], 1), addDays(PAUSA.hasta, 1)].sort().pop();
  const fechasTail = slots(tailStart, tail.length);
  const lista = [...core, ...tail]; const fechas = [...fechasCore, ...fechasTail];
  if (lista.length !== TOTAL_C1) throw new Error(`ciclo 1 debe tener ${TOTAL_C1} átomos (tiene ${lista.length})`);
  return lista.map((x, i) => ({ ...x, d: i + 1, fecha: fechas[i], ciclo: 1 }));
}
function fecharCiclo2(start, dOffset, minStart) {
  const s = [start, minStart].sort().pop(); // nunca antes del día siguiente al fin del ciclo 1
  const fechas = slots(s, C2.length);
  return C2.map((x, i) => ({ ...x, d: dOffset + i + 1, fecha: fechas[i], ciclo: 2 }));
}
const D1 = fecharCiclo1(START1);
const D2 = fecharCiclo2(START2, D1.length, addDays(D1[D1.length - 1].fecha, 1));
const TODOS = [...D1, ...D2];

// ─── Validaciones ───
for (const x of TODOS) {
  if (!FASES[x.fase]) throw new Error('fase desconocida ' + x.fase + ' en ' + x.code);
  if (!PISTAS[x.pista]) throw new Error('pista desconocida ' + x.pista + ' en ' + x.code);
  if (!['CRITICA', 'ALTA', 'MEDIA', 'BAJA'].includes(x.prio)) throw new Error('prioridad ' + x.prio + ' en ' + x.code);
  if (!x.recs.length) throw new Error('sin recs: ' + x.code);
  for (const r of x.recs) if (!REC_KEYS.has(r)) throw new Error(`rec ${r} no existe en REC (${x.code})`);
  const dow = fromISO(x.fecha).getUTCDay();
  if (dow === 0 || dow === 6) throw new Error('fin de semana: ' + x.fecha);
  if (SKIP_FIJOS.has(x.fecha) || enPausa(x.fecha)) throw new Error('feriado/pausa: ' + x.fecha);
  if (tipoDia(x.fecha) !== 'research') throw new Error('no es día-Research: ' + x.fecha);
}
if (new Set(TODOS.map((x) => x.d)).size !== TODOS.length) throw new Error('d duplicado');
const HITOS = {};
for (const x of TODOS) if (x.hito) { if (HITOS[x.hito]) throw new Error('hito duplicado ' + x.hito); HITOS[x.hito] = { code: x.code, fecha: x.fecha, ciclo: x.ciclo, d: x.d }; }
for (const h of ['carta-1', 'tesis-L0', 'case-report-1', 'PROSPERO-SR1', 'SR-1']) if (!HITOS[h]) throw new Error('falta hito ' + h);

// ─── Emisión .ts ───
const fila = (x) => {
  const chips = x.chips && x.chips.length ? `, chips: [${x.chips.map(q).join(', ')}]` : '';
  const apex = x.apex ? `{ id: ${q(x.apex.id)}, t: ${q(x.apex.t)} }` : 'null';
  return `  { d: ${x.d}, fecha: ${q(x.fecha)}, ciclo: ${x.ciclo}, fase: ${q(x.fase)}, pista: ${q(x.pista)}, code: ${q(x.code)}, prioridad: ${q(x.prio)}, objetivo: ${q(x.obj)}, entregable: ${q(x.ent)}, artefacto: ${q(x.art)}, tool: ${q(x.tool)}, recs: [${x.recs.map(q).join(', ')}]${chips}, apex: ${apex} },`;
};
const bloque = (dias) => {
  const out = []; let fase = null;
  for (const x of dias) { if (x.fase !== fase) { fase = x.fase; out.push(`  // ${fase} · ${FASES[fase].nombre}`); } out.push(fila(x)); }
  return out.join('\n');
};
const recExtraTs = Object.entries(REC_EXTRA).map(([k, r]) => `  ${(k + ':').padEnd(8)}{ label: ${q(r.label)}, url: ${q(r.url)} },`).join('\n');
const fasesTs = Object.entries(FASES).map(([k, f]) => `  ${(k + ':').padEnd(4)}{ nombre: ${q(f.nombre)}, color: ${q(f.color)}, pilar: ${q(f.pilar)} },`).join('\n');
const pistasTs = Object.entries(PISTAS).map(([k, p]) => `  ${(k + ':').padEnd(4)}{ label: ${q(p.label)}, color: ${q(p.color)}, entregableId: ${p.entregableId ? q(p.entregableId) : 'null'} },`).join('\n');
const hitosTs = Object.entries(HITOS).map(([k, h]) => `  ${q(k)}: { code: ${q(h.code)}, fecha: ${q(h.fecha)}, ciclo: ${h.ciclo}, d: ${h.d} },`).join('\n');
const genLine = `GENERADO por DATA/_scripts/gen_research_plan.js (${HOY}) — NO editar a mano: \`node DATA/_scripts/gen_research_plan.js [YYYY-MM-DD]\``;

const TS1 = `/**
 * researchDailyPlan.ts — Plan DÍA A DÍA de Research · CICLO 1 (v5.6 · 3 pistas alineadas con RUTA_PUBLICACION_2027).
 * ${genLine}
 *
 * ${D1.length} átomos · D1 = ${wdOf(D1[0].fecha)} ${D1[0].fecha} → D${D1.length} = ${wdOf(D1[D1.length - 1].fecha)} ${D1[D1.length - 1].fecha} · 1 átomo por DÍA-RESEARCH
 * (interdiario con Derma: researchData.ts → diaEstudioTipo · sáb+dom libres · salta 25-dic/31-dic/1-ene ·
 * PAUSA ${PAUSA.desde} → ${PAUSA.hasta} = 0 átomos, Step 1). d1-d${D1.length - TAIL1.length} caben antes de la pausa (último: ${D1[D1.length - TAIL1.length - 1].fecha});
 * d${D1.length - TAIL1.length + 1}-d${D1.length} son los 2 primeros días-Research tras la pausa (SUBMIT del case report + re-arranque) — el total 42 es
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
  inicio: ${q(D1[0].fecha)}, fin: ${q(D1[D1.length - 1].fecha)}, totalDias: ${D1.length}, // ciclo 1 · D1=${wdOf(D1[0].fecha)} ${D1[0].fecha} · alterna con Derma · sáb+dom libres · salta 25-dic/31-dic/1-ene · d41-d42 tras la pausa
  ciclo: 1 as const,
  finNucleo: ${q(D1[D1.length - TAIL1.length - 1].fecha)}, // último átomo antes de la pausa de enero
  pausa: ${q(`${PAUSA.desde} → ${PAUSA.hasta} · 0 átomos (Step 1)`)},
  bloque: '13:30–14:15 (boards · alterna con Derma) · 1 átomo-research por día-Research',
  artefacto: 'Carta al editor #1 (oct) · tesis L0 como research letter (nov) · case report #1 listo (dic, submit 1-feb) · SR-1 con PICO, criterios y revisor #2 nombrados',
};

${STATIC_REC}
${recExtraTs}
};

${STATIC_REST}

export type FaseId = ${Object.keys(FASES).map(q).join(' | ')};
export type PistaId = ${Object.keys(PISTAS).map(q).join(' | ')};
// Colores en JOYA APAGADA (tokens · quiet-luxury): teal #6BB8B0 · sapphire #4F7DD6 · brass #B8934E · coral #C56A5A · amatista #9A7BC8 · oro #C8A96A.
export const FASE_INFO: Record<FaseId, { nombre: string; color: string; pilar: string }> = {
${fasesTs}
};
/** Pista = entregable al que empuja el átomo (C/T/CR → Mesa editorial · R → SR-1 · M/K red · B bibliométrico · X transversal). */
export const PISTA_INFO: Record<PistaId, { label: string; color: string; entregableId: string | null }> = {
${pistasTs}
};

export interface DiaResearch {
  d: number; fecha: string; ciclo: 1 | 2; fase: FaseId; pista: PistaId; code: string; prioridad: Prioridad;
  objetivo: string; entregable: string; artefacto: string; tool: string; recs: string[];
  chips?: string[];
  apex?: { id: string; t: string } | null;
}

export const DIAS: DiaResearch[] = [
${bloque(D1)}
];

/** Hitos editoriales (fecha objetivo de cada entregable = fecha del átomo que lo cierra; ambos ciclos). */
export const RESEARCH_HITOS: Record<string, { code: string; fecha: string; ciclo: number; d: number }> = {
${hitosTs}
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
`;

const TS2 = `/**
 * researchDailyPlan2027.ts — Plan DÍA A DÍA de Research · CICLO 2 (SR-1 completa: PROSPERO → SUBMIT, con revisor humano #2).
 * ${genLine} (\`--ciclo 2 YYYY-MM-DD\` para re-fechar solo este ciclo)
 *
 * ${D2.length} átomos · d${D2[0].d}-d${D2[D2.length - 1].d} (numeración continúa la del ciclo 1 → una sola clave de progreso 'research') ·
 * D1 = ${wdOf(D2[0].fecha)} ${D2[0].fecha} → fin ${wdOf(D2[D2.length - 1].fecha)} ${D2[D2.length - 1].fecha} · interdiario con Derma · sáb+dom libres.
 * Arranca tras el Step 1 (RUTA §6: M6-7 protocolo + PROSPERO · M8-10 ejecutar SR · M11-12 someter + balance).
 * R18 (cribado), R20 (κ) y R24 (extracción) EXIGEN revisor humano #2 con cuenta Rayyan y κ real; el equipo de
 * revisión (L4 §9) se copia a PROSPERO en R10. (CR-9 = submit del case report #1 y X-8 son d41-d42 del CICLO 1, los dos
 * primeros días-Research tras la pausa.) Incluye campaña K1-K2, case report #2,
 * bibliométrico B1-B5 y apertura de SR-2 (L5). Fuente única: DATA/_scripts/gen_research_plan.js.
 */
import type { DiaResearch } from './researchDailyPlan';

export const DAILY_META_2027 = {
  inicio: ${q(D2[0].fecha)}, fin: ${q(D2[D2.length - 1].fecha)}, totalDias: ${D2.length}, // ciclo 2 · D1=${wdOf(D2[0].fecha)} ${D2[0].fecha} · alterna con Derma · sáb+dom libres
  ciclo: 2 as const,
  dOffset: ${D1.length},
  bloque: '13:30–14:15 (boards · alterna con Derma) · 1 átomo-research por día-Research',
  artefacto: 'SR-1 · Complicaciones vasculares de fillers + tiempo-a-tratamiento (Línea 4 · Mayo 38/40) registrada en PROSPERO y ENVIADA · case report #1 y #2 enviados · bibliométrico · SR-2 abierta',
};

export const DIAS_2027: DiaResearch[] = [
${bloque(D2)}
];
`;

// ─── Mapa Obsidian (átomo/entregable → carpeta del vault) ───
const RES = '04_INVESTIGACIÓN DERMATOLÓGICA';
const RESEARCH_OBS_LINE = { 0: `${RES}/01_LINEAS/00_Acne_and_Calidad_de_Vida/_concepto_madre`, 1: `${RES}/01_LINEAS/01_Topografia_and_Vascularizacion_facial/_concepto_madre`, 2: `${RES}/01_LINEAS/02_Analisis_facial_and_Envejecimiento/_concepto_madre`, 3: `${RES}/01_LINEAS/03_Inyectables_and_Reologia/_concepto_madre`, 4: `${RES}/01_LINEAS/04_Complicaciones_and_Seguridad/_concepto_madre`, 5: `${RES}/01_LINEAS/05_Energia/_concepto_madre`, 6: `${RES}/01_LINEAS/06_Acne_and_QoL/_concepto_madre`, 7: `${RES}/01_LINEAS/07_Toxina_botulinica/_concepto_madre`, 8: `${RES}/01_LINEAS/08_Teledermatologia_and_IA/_concepto_madre` };
const SR1 = `${RES}/02_SR_EN_CURSO/SR-1_complicaciones`, SR2 = `${RES}/02_SR_EN_CURSO/SR-2_fototipos`, ENT = `${RES}/03_ENTREGABLES`;
const RESEARCH_OBS_SR = { 'SR-1': `${SR1}/_hoja_de_ruta`, 'SR-2': `${SR2}/_hoja_de_ruta` };
const RESEARCH_OBS_SR_FOLDER = { 'SR-1': SR1, 'SR-2': SR2 };
const RESEARCH_OBS_ENTREGABLE = { 'tesis-L0': `${ENT}/TESIS_L0/_README`, 'carta-1': `${ENT}/CARTA_1/_README`, 'case-report-1': `${ENT}/CASE_REPORT_1/_README`, 'case-report-2': `${ENT}/CASE_REPORT_2/_README`, 'PROSPERO-SR1': `${SR1}/01_protocolo_PICO/_README`, 'SR-1': `${SR1}/_hoja_de_ruta`, 'mentores': `${ENT}/MENTORES/_README`, 'bibliometrico-1': `${ENT}/BIBLIOMETRICO_1/_README` };
function obsDe(x) {
  if (x.pista === 'C') return RESEARCH_OBS_ENTREGABLE['carta-1'];
  if (x.pista === 'T') return RESEARCH_OBS_ENTREGABLE['tesis-L0'];
  if (x.pista === 'CR') return /^CR2/.test(x.code) ? RESEARCH_OBS_ENTREGABLE['case-report-2'] : RESEARCH_OBS_ENTREGABLE['case-report-1'];
  if (x.pista === 'M' || x.pista === 'K') return RESEARCH_OBS_ENTREGABLE.mentores;
  if (x.pista === 'B') return RESEARCH_OBS_ENTREGABLE['bibliometrico-1'];
  if (/^R4[456]$/.test(x.code)) return RESEARCH_OBS_SR['SR-2'];
  const f = x.fase;
  if (f === 'R1' || f === 'R2') return `${SR1}/01_protocolo_PICO/_README`;
  if (f === 'R3') return `${SR1}/02_busqueda/_README`;
  if (f === 'R4') return `${SR1}/03_screening/_README`;
  if (f === 'R5' || f === 'R6') return `${SR1}/04_extraccion/_README`;
  if (f === 'R7' || f === 'R8') return `${SR1}/05_manuscrito/_README`;
  if (x.pista === 'R') return `${SR1}/_hoja_de_ruta`;
  return `${RES}/00_DASHBOARD_RESEARCH/Dashboard_Research`;
}
const RESEARCH_OBS_DAY = {}; for (const x of TODOS) RESEARCH_OBS_DAY[x.d] = obsDe(x);
const MAP_TS = `/**
 * obsidianResearchMap.ts — ${genLine}
 * (antes lo escribía build_vault_research.js; desde el 05-sep-2026 el mapa de átomos sale del generador del plan).
 * Deep-links obsidian:// hacia la rama "${RES}" del vault "Vault_Medicina MIR_Joseph". Reutiliza obsUrl() de obsidianMap.ts.
 * SOLO es un mapa: las carpetas 03_ENTREGABLES/* del vault se crean al abrir la nota desde Obsidian (no se crean notas aquí).
 *
 *  · líneas L0–L8 → nota _concepto_madre de la línea (01_LINEAS)
 *  · SR-1/SR-2    → _hoja_de_ruta de la revisión sistemática (02_SR_EN_CURSO)
 *  · entregables  → 03_ENTREGABLES/{TESIS_L0, CARTA_1, CASE_REPORT_1, CASE_REPORT_2, MENTORES, BIBLIOMETRICO_1}
 *  · átomos ${TODOS[0].d}-${TODOS[TODOS.length - 1].d} → carpeta del entregable (C/T/CR/M/K/B) o fase de SR-1 (R) · ciclo 1 y 2
 */
import { obsUrl } from './obsidianMap';

/** Línea (id 0–8) → ruta de la nota _concepto_madre */
export const RESEARCH_OBS_LINE: Record<number, string> = ${JSON.stringify(RESEARCH_OBS_LINE)};
export const researchObsUrlLine = (lineId: number): string | null => {
  const p = RESEARCH_OBS_LINE[lineId]; return p ? obsUrl(p) : null;
};

/** SR tag ('SR-1'…) → hoja de ruta · y carpeta raíz de la SR */
export const RESEARCH_OBS_SR: Record<string, string> = ${JSON.stringify(RESEARCH_OBS_SR)};
export const RESEARCH_OBS_SR_FOLDER: Record<string, string> = ${JSON.stringify(RESEARCH_OBS_SR_FOLDER)};
export const researchObsUrlSR = (srTag: string): string | null => {
  const p = RESEARCH_OBS_SR[srTag]; return p ? obsUrl(p) : null;
};

/** Entregable de la Mesa editorial (researchData.ts → RESEARCH_ENTREGABLES.id) → carpeta propia en el vault */
export const RESEARCH_OBS_ENTREGABLE: Record<string, string> = ${JSON.stringify(RESEARCH_OBS_ENTREGABLE)};
export const researchObsUrlEntregable = (id: string): string | null => {
  const p = RESEARCH_OBS_ENTREGABLE[id]; return p ? obsUrl(p) : null;
};

/** Átomo del plan día-a-día (d, ciclos 1 y 2) → carpeta de su entregable o fase de SR-1 */
export const RESEARCH_OBS_DAY: Record<number, string> = ${JSON.stringify(RESEARCH_OBS_DAY)};
export const researchObsUrlDay = (d: number): string | null => {
  const p = RESEARCH_OBS_DAY[d]; return p ? obsUrl(p) : null;
};

/** Dashboard de la rama de investigación */
export const OBS_RESEARCH_DASHBOARD_URL = obsUrl('${RES}/00_DASHBOARD_RESEARCH/Dashboard_Research');
`;

// ─── daily-plan.md ───
const mdEsc = (s) => String(s).replace(/\|/g, '\\|');
const recLabel = (k) => { const m = STATIC_REC.match(new RegExp(`^\\s{2}${k}:\\s*\\{ label: '([^']*)', url: '([^']*)'`, 'm')); if (m) return { label: m[1], url: m[2], verif: 'repo (verificada jun-jul 2026)' }; return REC_EXTRA[k]; };
/** Una sola tabla por ciclo en orden cronológico (las pistas se INTERCALAN: C/T/CR/M/R en el mismo mes), con la fase como columna. */
function tablaMd(dias) {
  const out = ['', '| d | code | fecha | fase | pista | prio | objetivo | entregable | artefacto | rec | tool |', '|---|---|---|---|---|---|---|---|---|---|---|'];
  for (const x of dias) {
    const chips = x.chips && x.chips.length ? ` ⚑ _${x.chips.map(mdEsc).join(' · ')}_` : '';
    const hito = x.hito ? ` **[hito ${x.hito}]**` : '';
    out.push(`| ${x.d} | ${x.code} | ${wdOf(x.fecha)} ${x.fecha} | ${x.fase} · ${FASES[x.fase].nombre} | ${x.pista} | ${x.prio} | ${mdEsc(x.obj)}${chips}${hito} | ${mdEsc(x.ent)} | \`${mdEsc(x.art)}\` | ${x.recs.map((r) => '`' + r + '`').join(', ')} | ${mdEsc(x.tool)} |`);
  }
  return out.join('\n');
}
const porMes = (dias) => { const m = {}; for (const x of dias) { const k = x.fecha.slice(0, 7); m[k] = (m[k] || 0) + 1; } return Object.entries(m).map(([k, n]) => `${k}: ${n}`).join(' · '); };
const MD = `# Plan DÍA-A-DÍA de Research — 3 pistas alineadas con la RUTA de publicación 2027

> **${genLine}.** Fuente de verdad = los \`.ts\` que emite el mismo script
> (\`src/lib/researchDailyPlan.ts\` ciclo 1 · \`src/lib/researchDailyPlan2027.ts\` ciclo 2 · \`src/lib/obsidianResearchMap.ts\`).
> Este doc es la MISMA data en tablas. Se re-fecha con el pipeline de corrimiento (\`gen_research_plan.js <fecha>\`).

> **Qué cambió el 05-sep-2026 (Palmerton v3 · vacíos de Research).** El plan anterior (42 átomos, 100 % SR-1 con PROSPERO el
> 2-oct y SUBMIT el 29-dic) contradecía [\`RUTA_PUBLICACION_2027.md\`](RUTA_PUBLICACION_2027.md) (carta oct-nov · case report
> feb-mar · PROSPERO mar-abr · SR sometida jul-sep) y no contenía ni un átomo de los dos primeros entregables ni de la tesis.
> Ahora: **ciclo 1 (sep-2026 → los 2 primeros días-Research de feb-2027; 42 átomos)** = infra académica + cimientos + mentores +
> carta al editor + tesis L0 (research letter) + case report #1 (paquete listo en dic; SUBMIT = d41, primer día tras la pausa) +
> preparación de SR-1 con **revisor humano #2** nombrado antes de PROSPERO;
> **ciclo 2 (feb→ago 2027)** = SR-1 completa (PROSPERO → submit) con cribado y extracción DUALES, campaña de colaboradores,
> case report #2, bibliométrico y apertura de SR-2. **Enero 2027 = 0 átomos (Step 1).**

---

## 1. Ritmo e integración con el Calendar (no se toca)

- **Interdiario con Derma:** \`researchData.ts → diaEstudioTipo\` (paridad de días hábiles desde el ancla mié 10-jun-2026;
  par → Research, impar → Derma). Sáb y dom libres. Salta 25-dic / 31-dic / 1-ene. **Pausa ${PAUSA.desde} → ${PAUSA.hasta} (0 átomos).**
- **Bloque del Calendar:** 13:30–14:15 (45 min). En un día-Research se ejecuta **1 átomo**. No se crea ni edita ningún evento.
- **Ciclo 1:** ${D1.length} átomos · ${wdOf(D1[0].fecha)} ${D1[0].fecha} → ${wdOf(D1[D1.length - 1].fecha)} ${D1[D1.length - 1].fecha} (${porMes(D1)}).
- **Ciclo 2:** ${D2.length} átomos · d${D2[0].d}-d${D2[D2.length - 1].d} · ${wdOf(D2[0].fecha)} ${D2[0].fecha} → ${wdOf(D2[D2.length - 1].fecha)} ${D2[D2.length - 1].fecha} (${porMes(D2)}).
- **Corrimiento:** cada día sin estudiar = +1. \`node DATA/_scripts/gen_research_plan.js <D1>\` re-fecha el ciclo 1 (toma el
  primer día-Research ≥ D1; los átomos que ya no caben antes de la pausa —\`recortable\`, prep de SR-1— pasan a después
  del ${PAUSA.hasta}, detrás de CR-9/X-8) y el ciclo 2 arranca el día-Research siguiente; \`--ciclo 2 <fecha>\` re-fecha
  solo el ciclo 2. **El ciclo 1 tiene SIEMPRE 42 átomos** (invariante de \`remap_inicio.js\` bloque 4). Como remap no conoce
  la pausa de enero, el orden del pipeline es: \`remap_inicio.js <D1>\` → \`gen_research_plan.js <D1>\` (este script
  sobreescribe las fechas de Research con las correctas). Pendiente (fichero fuera de este lote): que remap llame a este script.

## 2. El bloque HOY de un día-Research (franjas · \`FRANJAS\` del .ts)

| Franja | Fase | Tipo |
|---|---|---|
| 13:30–13:35 | Eval anclada del átomo PREVIO: 2 preguntas de auto-test del método + ¿avanzó el entregable? | \`eval\` |
| 13:35–13:40 | Pre-test / free-recall 60 s del objetivo de HOY | \`pretest\` |
| 13:40–14:05 | DEEP WORK (25 min): recurso real del átomo MIENTRAS ejecutas el ARTEFACTO | \`work\` |
| 14:05–14:10 | Free recall a papel + log (gap método / razonamiento / herramienta) | \`recall\` |
| 14:10–14:15 | ≤3 APEX-método (Palmerton) + guardar el artefacto (PROSPERO / Rayyan / .docx / Mesa editorial) | \`apex\` |

## 3. Pistas y entregables (Mesa editorial · \`researchData.ts → RESEARCH_ENTREGABLES\`)

| Pista | Entregable | Átomos | Hito (fecha del átomo que lo cierra) |
|---|---|---|---|
| **R0 / R** | Infra académica (10 cuentas) + cimientos + SR-1 (PICO · criterios · revisor #2 · protocolo v0) | R0-R3, R6-R9, X-1, X-3 | revisor #2: ${HITOS.revisor2.code} ${HITOS.revisor2.fecha} |
| **M** | Mentores: Dr. Ciro (3 coautorías) · Rising Scholars (ex-AuthorAID) · Prof. Finlay (CADI) | M1-M3 | ${HITOS.mentor.code} ${HITOS.mentor.fecha} |
| **C** | Carta al editor #1 (400-600 palabras, artículo 2026 dentro de ventana) | C-1 → C-6 (+ X-2 post-submit) | SUBMIT ${HITOS['carta-1'].code} ${HITOS['carta-1'].fecha} |
| **T** | Tesis L0 (IGA×CADI, n=316) → research letter 600-1000 palabras · JAAD Intl → IJD → Actas → Anais | T-1 → T-8 | SUBMIT ${HITOS['tesis-L0'].code} ${HITOS['tesis-L0'].fecha} |
| **CR** | Case report #1 (CARE 13 ítems) → Dermatology Online Journal | CR-1 → CR-8 (paquete) · CR-9 submit | SUBMIT ${HITOS['case-report-1'].code} ${HITOS['case-report-1'].fecha} |
| **R2** | Registro PROSPERO de SR-1 (con equipo de revisión de L4 §9) | X-9, R10-R11 | ${HITOS['PROSPERO-SR1'].code} ${HITOS['PROSPERO-SR1'].fecha} |
| **R3-R8** | SR-1 sometida (cribado y extracción duales, κ real, MA en R, PRISMA 27) | R12 → R43 | SUBMIT ${HITOS['SR-1'].code} ${HITOS['SR-1'].fecha} |
| K · B · CR2 | Campaña 20-30 cold emails · bibliométrico · case report #2 · SR-2 abierta | K1-K2 · B1-B5 · CR2-1..4 · R44-R46 | balance ${TODOS.find((x) => x.code === 'X-12').fecha} |

**Chips de dependencia:** \`${CHIP_DERMA}\` en R6, R6b, R22 y R33 (el mecanismo de la oclusión y el protocolo de
hialuronidasa se aprenden en el plan Derma antes de fijar desenlaces, extraer y hacer subgrupos).

## 4. Ciclo 1 — sep-2026 → feb-2027 (${D1.length} átomos: ${D1.length - TAIL1.length} antes de la pausa + ${TAIL1.length} justo después)

> \`code\` · \`fecha\` (día-Research real) · \`prio\` (vueltas: CRÍTICA 6 · ALTA 5 · MEDIA 4 · BAJA 3) · \`pista\` · **objetivo** ·
> **entregable** · \`artefacto\` (fichero / nota / estado que queda) · \`rec\` (clave → §6) · \`tool\`.
${tablaMd(D1)}

## 5. Ciclo 2 — feb→ago 2027 (${D2.length} átomos · SR-1 con revisor humano #2)

> R18 / R20 / R24 reescritos: cribado y extracción por **dos revisores humanos independientes** (κ real); un LLM (Ollama /
> Elicit) solo pre-ordena o asiste, nunca cuenta como revisor. El **equipo de revisión** (L4 §9) se copia a PROSPERO en R10.
${tablaMd(D2)}

## 6. Leyenda de recursos (clave → recurso · URL · verificación)

| clave | recurso | URL | verificación |
|---|---|---|---|
${[...REC_KEYS].map((k) => { const r = recLabel(k); return r ? `| \`${k}\` | ${mdEsc(r.label)} | ${r.url} | ${r.verif} |` : ''; }).filter(Boolean).join('\n')}

## 7. Notas de verificación (05-sep-2026)

- **Verificado por WebFetch:** CARE checklist (13 ítems), STROBE checklists, Google Scholar (perfil), CTI Vitae (carga CONCYTEC),
  cuenta NCBI, Rising Scholars (= AuthorAID rebautizado; authoraid.info → 301), Editorial Manager (→ ariessys.com), PROSPERO (carga).
- **403 al verificar (no se citan cifras):** Author Guidelines de JAAD, JAAD International, IJD y ScholarOne. Ventana de letters,
  límites de palabras/refs y APC de JAAD Intl quedan **A VERIFICAR** en su átomo (C-1, T-5, C-5). Portal eScholarship de DOJ: A VERIFICAR.
- **Datos del repo:** tesis L0 (rs=0.637, κ=0.81, prevalencia 39,8 %, defendida 20-abr-2026), Dr. Ciro Rodríguez (HRDAC Huancayo),
  corpus SR-1 = 200 registros pending_human desde 11-jun-2026 (151 OA sin PDF), APC JAAD CR US$850 / DOJ ≤US$300 (RUTA §3).
- **Pendientes de Joseph (no derivables del repo):** nº de CEI y consentimiento parental de la tesis (T-1) · aceptación del
  Dr. Ciro como senior author (M1) · política de correspondencia de IJD (correo) · revisor #2 de SR-1 (X-1 / L4 §9).
- **No se modificó el Google Calendar.**
`;

// ─── Escritura ───
const w = (rel, s) => { fs.writeFileSync(path.join(ROOT, rel), s, 'utf8'); console.log('✓ ' + rel); };
if (SOLO_CICLO !== 2) w('src/lib/researchDailyPlan.ts', TS1);
if (SOLO_CICLO !== 1) w('src/lib/researchDailyPlan2027.ts', TS2);
w('src/lib/obsidianResearchMap.ts', MAP_TS);
w('DATA/RESEARCH/daily-plan.md', MD);
console.log(`\nOK — ciclo 1: ${D1.length} átomos ${D1[0].fecha}→${D1[D1.length - 1].fecha} · ciclo 2: ${D2.length} átomos ${D2[0].fecha}→${D2[D2.length - 1].fecha} · hitos: ${Object.entries(HITOS).map(([k, h]) => k + '=' + h.fecha).join(' · ')}`);
