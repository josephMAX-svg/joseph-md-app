/**
 * build_vault_research.js — construye/verifica la RAMA de INVESTIGACIÓN del vault Obsidian
 * "Vault_Medicina MIR_Joseph" bajo 04_INVESTIGACIÓN DERMATOLÓGICA\ y emite
 * src/lib/obsidianResearchMap.ts. Copia el patrón de build_vault_trilingue.js.
 *
 * Estructura creada (NO toca lo existente, p.ej. "Tesis - Índice.md"):
 *   04_INVESTIGACIÓN DERMATOLÓGICA/
 *     00_DASHBOARD_RESEARCH/Dashboard_Research.md
 *     01_LINEAS/NN_<linea>/{APEX_creados, _concepto_madre.md}      ← L0–L8 (researchProgram.ts)
 *     02_SR_EN_CURSO/SR-1_complicaciones | SR-2_fototipos/
 *        {01_protocolo_PICO,02_busqueda,03_screening,04_extraccion,05_manuscrito}
 *        + _hoja_de_ruta.md (checklist PRISMA/PROSPERO con - [ ])           ← DATA/RESEARCH/lines/
 *     03_PLAYBOOK/{_playbook_SR.md, recursos_referentes.md}        ← resume systematic-reviews.md
 *
 * Reglas (idénticas al trilingüe): idempotente · NUNCA borra ni sobreescribe · dry-run por
 * defecto · datos REALES de src/lib + MD maestro (no se inventa nada).
 *
 * Uso:  node build_vault_research.js          (dry-run: solo reporta)
 *       node build_vault_research.js --write
 */
const fs = require('fs');
const path = require('path');

const VAULT = 'D:/JOSEPH/Vault_Medicina MIR_Joseph';
const APP = 'D:/joseph-md-app';
const WRITE = process.argv.includes('--write');
const HOY = '2026-06-10';
const RES = '04_INVESTIGACIÓN DERMATOLÓGICA'; // rama existente — la usamos, no creamos otra raíz

const log = (...a) => console.log(...a);
const acc = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const slugTitle = (s, max = 48) => acc(s).replace(/&/g, 'and').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, max).replace(/_+$/, '');

const stats = { dirs: 0, files: 0, skipped: 0, patched: 0, problems: [] };
function ensureDir(p) {
  if (fs.existsSync(p)) { stats.skipped++; return false; }
  if (WRITE) fs.mkdirSync(p, { recursive: true });
  stats.dirs++; return true;
}
function ensureFile(p, content) {
  if (fs.existsSync(p)) { stats.skipped++; return false; }
  if (WRITE) fs.writeFileSync(p, content, 'utf8');
  stats.files++; return true;
}

// extrae `NAME ... = [ ... ];` de un .ts y lo evalúa. `scope` inyecta símbolos (p.ej. pm()).
function extractArray(file, marker, scope = {}) {
  const t = fs.readFileSync(file, 'utf8');
  const i = t.indexOf(marker);
  if (i < 0) throw new Error(marker + ' not found in ' + file);
  const eq = t.indexOf('= [', i);
  const start = eq >= 0 ? eq + 2 : t.indexOf('[', i);
  let depth = 0, end = -1;
  for (let j = start; j < t.length; j++) {
    if (t[j] === '[') depth++;
    else if (t[j] === ']') { depth--; if (depth === 0) { end = j; break; } }
  }
  const pm = scope.pm; // disponible para el eval (literales con pm('...'))
  return eval(t.slice(start, end + 1));
}

/* ════════════ 1 · Leer datos REALES (researchProgram.ts + researchDailyPlan.ts) ════════════ */
const pm = (q) => 'https://pubmed.ncbi.nlm.nih.gov/?term=' + encodeURIComponent(q);
const LINES = extractArray(path.join(APP, 'src/lib/researchProgram.ts'), 'RESEARCH_LINES', { pm });
const DIAS = extractArray(path.join(APP, 'src/lib/researchDailyPlan.ts'), 'DIAS');
log(`RESEARCH_LINES: ${LINES.length} líneas · DIAS: ${DIAS.length} átomos`);

const FASE_NOMBRE = {
  R0: 'Cimientos & método', R1: 'Pregunta & protocolo', R2: 'Registro PROSPERO', R3: 'Búsqueda N bases',
  R4: 'Screening', R5: 'Extracción', R6: 'Sesgo & GRADE', R7: 'Meta-análisis en R', R8: 'Manuscrito & envío',
};

// nombre corto de carpeta: parte antes de " (", " · ", " — "
function shortName(nombre) { return slugTitle(nombre.split(/ \(| · | — /)[0]); }

// Detalle PICO + ancla por SR (faithful a DATA/RESEARCH/lines/ — no inventado)
const SR_DETAIL = {
  'SR-1': {
    folder: 'SR-1_complicaciones',
    titulo: 'Complicaciones vasculares de fillers + tiempo-a-tratamiento',
    pico: {
      P: 'pacientes con rellenos faciales que desarrollan complicación vascular (oclusión arterial, necrosis cutánea, compromiso visual)',
      I: 'manejo de la complicación, en particular hialuronidasa (dosis, vía, timing)',
      C: 'distintos tiempos-a-tratamiento / protocolos / sin hialuronidasa',
      O: 'PRIMARIO: resolución/recuperación del evento vascular. Secundarios: tiempo-a-tratamiento, dosis, zona, secuelas',
    },
    anclas: ['DeLorenzi C. 2014. *Aesthet Surg J* 34(4):584–600. PMID 24692598 · DOI 10.1177/1090820X14525035'],
    previas: 'Revisiones narrativas de complicaciones de HA; diferenciador = foco cuantitativo en tiempo-a-hialuronidasa + ángulo LATAM.',
  },
  'SR-2': {
    folder: 'SR-2_fototipos',
    titulo: 'RF fraccional / CO₂ en fototipos IV–VI: eficacia y seguridad',
    pico: {
      P: 'pacientes Fitzpatrick IV–VI tratados por cicatriz de acné / rejuvenecimiento / laxitud',
      I: 'RF microneedling fraccional y/o CO₂ fraccional',
      C: 'otro dispositivo de energía, sham, o entre fototipos',
      O: 'PRIMARIO: mejoría clínica del desenlace. Secundario: PIH y AE estratificados por fototipo IV/V/VI',
    },
    anclas: ['Argobi et al. 2026 (MA previo FCL vs MNRF, predominante I–III). *J Cosmet Dermatol* DOI 10.1111/jocd.70765 → gap real = subgrupo IV–VI'],
    previas: 'Existe MA 2026 de FCL-vs-MNRF en cicatrices de acné, pero cohortes predominantemente Fitzpatrick I–III → hueco = skin of color IV–VI.',
  },
};

const RESEARCH_OBS_LINE = {};   // id -> _concepto_madre (sin .md)
const RESEARCH_OBS_SR = {};     // 'SR-1' -> _hoja_de_ruta (sin .md)
const RESEARCH_OBS_SR_FOLDER = {}; // 'SR-1' -> carpeta raíz de la SR
const RESEARCH_OBS_DAY = {};    // d (1-40) -> carpeta/nota del SR para esa fase
const lineFolderById = {};      // id -> 'NN_<slug>'

/* ════════════ 2 · 01_LINEAS — una carpeta por línea (L0–L8) ════════════ */
ensureDir(path.join(VAULT, RES));
ensureDir(path.join(VAULT, RES, '01_LINEAS'));

function conceptoMadreLinea(l, folderRel) {
  const ancla = l.fichaUrl ? ` · 📄 [Paper ancla](${l.fichaUrl})` : '';
  return `---
tipo: concepto_madre
seccion: research
linea: ${l.code}
linea_nombre: "${l.nombre.replace(/"/g, "'")}"
cluster: ${l.cluster}
mayo_score: ${l.mayoScore}
estado: ${l.estado}
sr_tag: ${l.srTag || ''}
revistas_objetivo: [${l.journals.join(', ')}]
fecha_creacion: ${HOY}
---

# 🔬 ${l.code} · ${l.nombre}

> [!info] Línea de investigación — **Mayo score ${l.mayoScore}/40 · estado: ${l.estado}**
> Los APEX y notas de esta línea caen en \`APEX_creados/\`. 🏠 [[Dashboard_Research]]

> [!abstract] Gap · SR derivable · colaboradores
> **Gap:** ${l.gap}
> **SR derivable${l.srTag ? ` (${l.srTag})` : ''}:** ${l.srDerivable}
> **Revistas objetivo:** ${l.journals.join(' · ')}
> **Colaboradores:** ${l.colaboradores.join(' · ')}
> **⛔ Cuello de botella:** ${l.cuelloBotella}
> 🔎 [Semilla de búsqueda en PubMed](${l.pubmedUrl})${ancla}

## 🎯 Resumen

*(pendiente — se llena al avanzar la línea)*

## 🗂️ APEX de esta línea

\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado", fuente, modo
FROM "${folderRel}/APEX_creados"
SORT file.cday DESC
\`\`\`
`;
}

for (const l of [...LINES].sort((a, b) => a.id - b.id)) {
  const folder = `${String(l.id).padStart(2, '0')}_${shortName(l.nombre)}`;
  lineFolderById[l.id] = folder;
  const abs = path.join(VAULT, RES, '01_LINEAS', folder);
  ensureDir(abs);
  ensureDir(path.join(abs, 'APEX_creados'));
  const folderRel = `${RES}/01_LINEAS/${folder}`;
  ensureFile(path.join(abs, '_concepto_madre.md'), conceptoMadreLinea(l, folderRel));
  RESEARCH_OBS_LINE[l.id] = `${folderRel}/_concepto_madre`;
}
log(`01_LINEAS: ${Object.keys(RESEARCH_OBS_LINE).length} líneas mapeadas`);

/* ════════════ 3 · 02_SR_EN_CURSO — SR-1 y SR-2 con pipeline ════════════ */
const PIPE = ['01_protocolo_PICO', '02_busqueda', '03_screening', '04_extraccion', '05_manuscrito'];
ensureDir(path.join(VAULT, RES, '02_SR_EN_CURSO'));

function hojaDeRuta(srTag, l, det) {
  const srFolderRel = `${RES}/02_SR_EN_CURSO/${det.folder}`;
  const lineaRel = `${RES}/01_LINEAS/${lineFolderById[l.id]}/_concepto_madre`;
  return `---
tipo: hoja_de_ruta_sr
seccion: research
sr: ${srTag}
linea: ${l.code}
estado: ${srTag === 'SR-1' ? 'activa' : 'siguiente'}
prospero_crd: ""
revistas_objetivo: [${l.journals.join(', ')}]
fecha_creacion: ${HOY}
---

# 🧭 ${srTag} · ${det.titulo}

> [!info] Revisión sistemática viva — Línea [[${lineaRel}|${l.code}]] · Mayo ${l.mayoScore}/40
> Pipeline: [[${srFolderRel}/01_protocolo_PICO|01]] → [[${srFolderRel}/02_busqueda|02]] → [[${srFolderRel}/03_screening|03]] → [[${srFolderRel}/04_extraccion|04]] → [[${srFolderRel}/05_manuscrito|05]].
> El sistema agéntico redacta los pasos R34–R40 y deja la nota-resumen del \`.docx\` en \`05_manuscrito/\`. 🏠 [[Dashboard_Research]]

## PICO
- **P (población):** ${det.pico.P}
- **I (intervención):** ${det.pico.I}
- **C (comparador):** ${det.pico.C}
- **O (outcome):** ${det.pico.O}

## ✅ Checklist PRISMA / PROSPERO (4 pilares: Reporte · Registro · Conducción · Evaluación)

### 0 · Protocolo (R0–R1)
- [ ] PICO fijado con 1 desenlace primario
- [ ] Criterios de elegibilidad (inclusión/exclusión + diseños)
- [ ] Protocolo PRISMA-P escrito
### 1 · Registro (R2)
- [ ] PROSPERO registrado (CRD: ____) **antes** de cerrar la extracción
- [ ] Protocolo congelado
### 2 · Búsqueda (R3)
- [ ] Estrategia MeSH + booleanos en MEDLINE/PubMed
- [ ] Embase (Europe PMC) + CENTRAL + LILACS/BVS + registros de ensayos
- [ ] PRISMA-S documentado (fecha, base, sintaxis, nº)
- [ ] Exportado y deduplicado
### 3 · Screening (R4)
- [ ] Rayyan montado con el corpus
- [ ] Cribado T/A (2 revisores) → texto completo con razones
- [ ] Kappa interobservador + IC
- [ ] Diagrama de flujo PRISMA 2020
### 4 · Extracción (R5)
- [ ] Formulario piloteado + doble extracción
- [ ] Tabla de características de estudios cerrada
### 5 · Sesgo & certeza (R6)
- [ ] Riesgo de sesgo (RoB 2 / ROBINS-I)
- [ ] GRADE + Summary of Findings
### 6 · Meta-análisis (R7, si procede)
- [ ] Effect size + modelo fijo/aleatorio (metafor)
- [ ] Forest plot + heterogeneidad (I², τ²)
- [ ] Funnel + Egger + subgrupos/sensibilidad
### 7 · Manuscrito (R8)
- [ ] Methods + Results (PRISMA 2020)
- [ ] Introduction + Discussion (límites + certeza)
- [ ] Checklist PRISMA 2020 de 27 ítems + supplementary
- [ ] Journal target + plan APC (Diamond OA / 50% LMIC)
- [ ] Cover letter + formateo
### 8 · HITL & envío
- [ ] **Checkpoint humano (CP-4):** verificar citas reales (DOI/PMID), paráfrasis, cadena estadística sobre el \`.docx\`
- [ ] SUBMIT

## 📄 Papers ancla / previas
${det.anclas.map((a) => `- ${a}`).join('\n')}

> [!note] Previas / diferenciación
> ${det.previas}

## 🗂️ APEX de esta SR
\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado", fuente
FROM "${srFolderRel}"
WHERE contains(file.folder, "APEX_creados")
SORT file.cday DESC
\`\`\`
`;
}

function pipeReadme(srTag, det, sub) {
  const nombre = { '01_protocolo_PICO': 'Protocolo & PICO', '02_busqueda': 'Búsqueda en N bases', '03_screening': 'Screening (cribado)', '04_extraccion': 'Extracción + sesgo/GRADE', '05_manuscrito': 'Manuscrito (.docx del sistema agéntico)' }[sub];
  return `---
tipo: fase_sr
sr: ${srTag}
fase: ${sub}
fecha_creacion: ${HOY}
---

# ${sub} · ${nombre}

> [!info] Fase del pipeline de **${srTag} — ${det.titulo}**
> Volver a la hoja de ruta: [[_hoja_de_ruta|🧭 Hoja de ruta ${srTag}]] · 🏠 [[Dashboard_Research]]
${sub === '05_manuscrito' ? '> Aquí el **AssemblerAgent** deja la nota-resumen del `.docx` generado (ver `DATA/RESEARCH/agentic-system.md`).' : ''}

*(artefactos de esta fase: aquí caen las notas y borradores)*
`;
}

for (const [srTag, det] of Object.entries(SR_DETAIL)) {
  const l = LINES.find((x) => x.srTag === srTag);
  if (!l) { stats.problems.push(`Sin línea para ${srTag}`); continue; }
  const srAbs = path.join(VAULT, RES, '02_SR_EN_CURSO', det.folder);
  ensureDir(srAbs);
  ensureFile(path.join(srAbs, '_hoja_de_ruta.md'), hojaDeRuta(srTag, l, det));
  for (const sub of PIPE) {
    const subAbs = path.join(srAbs, sub);
    ensureDir(subAbs);
    ensureDir(path.join(subAbs, 'APEX_creados'));
    ensureFile(path.join(subAbs, '_README.md'), pipeReadme(srTag, det, sub));
  }
  const srRel = `${RES}/02_SR_EN_CURSO/${det.folder}`;
  RESEARCH_OBS_SR[srTag] = `${srRel}/_hoja_de_ruta`;
  RESEARCH_OBS_SR_FOLDER[srTag] = srRel;
}
log(`02_SR_EN_CURSO: ${Object.keys(RESEARCH_OBS_SR).length} SR con pipeline`);

/* ──── mapear los 40 átomos del plan → carpeta/fase de SR-1 (artefacto vivo) ──── */
const PHASE_SUB = { R0: '_hoja_de_ruta', R1: '01_protocolo_PICO', R2: '01_protocolo_PICO', R3: '02_busqueda', R4: '03_screening', R5: '04_extraccion', R6: '04_extraccion', R7: '05_manuscrito', R8: '05_manuscrito' };
const SR1_REL = RESEARCH_OBS_SR_FOLDER['SR-1'];
for (const d of DIAS) {
  const sub = PHASE_SUB[d.fase];
  if (!sub) { stats.problems.push(`Átomo D${d.d} sin fase mapeada (${d.fase})`); continue; }
  // R0 → nota hoja de ruta; resto → README de la carpeta de fase (nota navegable dentro de la carpeta)
  RESEARCH_OBS_DAY[d.d] = sub === '_hoja_de_ruta' ? `${SR1_REL}/_hoja_de_ruta` : `${SR1_REL}/${sub}/_README`;
}
log(`Plan: ${Object.keys(RESEARCH_OBS_DAY).length}/${DIAS.length} átomos mapeados a SR-1`);

/* ════════════ 4 · 03_PLAYBOOK ════════════ */
ensureDir(path.join(VAULT, RES, '03_PLAYBOOK'));
ensureFile(path.join(VAULT, RES, '03_PLAYBOOK', '_playbook_SR.md'), `---
tipo: playbook
seccion: research
fecha_creacion: ${HOY}
---

# 📐 Playbook de Revisión Sistemática (2026)

> [!success] Resumen navegable de \`DATA/RESEARCH/systematic-reviews.md\` (fuente completa).
> 4 pilares: **Reporte** (PRISMA 2020) · **Registro** (PROSPERO) · **Conducción** (Cochrane v6.5) · **Evaluación** (GRADE + RoB 2 / ROBINS-I / AMSTAR-2). 🏠 [[Dashboard_Research]]

## Las 8 fases (cada una bloquea la siguiente)
1. **Pregunta PICO + protocolo** (PRISMA-P) → congela el método antes de buscar.
2. **Registro PROSPERO** (gratis) antes de cerrar la extracción · scoping → OSF.
3. **Búsqueda ≥5 bases** (MEDLINE, Embase, CENTRAL, LILACS, registros) + PRISMA-S.
4. **Screening 2 revisores** (Rayyan/ASReview) → Kappa.
5. **Extracción** piloteada + doble (Elicit como 2º par de ojos).
6. **Sesgo + GRADE** (RoB 2 / ROBINS-I; AMSTAR-2 para apreciar SR vecinas).
7. **Meta-análisis** (R + metafor): effect size, forest, I²/τ², funnel/Egger, subgrupos.
8. **Reporte PRISMA 2020** (checklist 27 ítems + diagrama de flujo de 4 fases).

## Herramientas gratis
Rayyan · ASReview · Elicit · GRADEpro · metafor (R) · "Doing Meta-Analysis in R" (libro) · Zotero.

> [!tip] El plan día-a-día (40 átomos) ejecuta este playbook sobre SR-1: ver
> \`DATA/RESEARCH/daily-plan.md\` y la app (Research → Hoy).
`);
ensureFile(path.join(VAULT, RES, '03_PLAYBOOK', 'recursos_referentes.md'), `---
tipo: recursos
seccion: research
fecha_creacion: ${HOY}
---

# 🎬 Recursos de referentes (verificados)

> [!info] URLs reales corroboradas (jun-2026). Fuente: \`DATA/RESEARCH/systematic-reviews.md\`.

- **Cochrane Interactive Learning · Módulo 1** (gratis) — método paso a paso.
- **Cochrane Training (YouTube)** — RevMan + metodología.
- **Rayyan** (canal oficial + Help Center) — cribado hands-on.
- **"Doing Meta-Analysis in R"** (Harrer, Cuijpers et al.) — libro online gratis (metafor).
- **PRISMA 2020** (checklist 27 ítems PMC + flow Shiny) · **PROSPERO** (registro).
- **Ahn & Kang 2019** — *A step-by-step guide for conducting a SR and meta-analysis* (PMC6670166).

🏠 [[Dashboard_Research]]
`);
log('03_PLAYBOOK: 2 notas');

/* ════════════ 5 · 00_DASHBOARD_RESEARCH ════════════ */
ensureDir(path.join(VAULT, RES, '00_DASHBOARD_RESEARCH'));
const lineRows = [...LINES].sort((a, b) => a.id - b.id).map((l) =>
  `> - [[${RES}/01_LINEAS/${lineFolderById[l.id]}/_concepto_madre|${l.code} · ${l.nombre.split(/ \(| · /)[0]}]] — Mayo ${l.mayoScore}/40 · ${l.estado}${l.srTag ? ` · ${l.srTag}` : ''}`).join('\n');
ensureFile(path.join(VAULT, RES, '00_DASHBOARD_RESEARCH', 'Dashboard_Research.md'), `---
tipo: dashboard
seccion: research
fecha_creacion: ${HOY}
---

# 🔬 Dashboard · Investigación Dermatológica

> [!abstract] Programa PERU-ACNE → Mayo Clinic / Bioclinic
> Motor de **revisiones sistemáticas** ($0, sin comité de ética). Meta: ~3 PIPs para competir ·
> 8–15 nivel Mayo. La SR es el output más eficiente para un IMG. Plan día-a-día en la app
> (Research → Hoy) y en \`DATA/RESEARCH/daily-plan.md\`.

> [!tip]- 📚 Líneas de investigación (L0–L8)
${lineRows}

## 🧭 Revisiones sistemáticas en curso
> [!example] Pipeline vivo
> - [[${RES}/02_SR_EN_CURSO/SR-1_complicaciones/_hoja_de_ruta|🧭 SR-1 · Complicaciones vasculares de fillers]] *(activa · L4 · Mayo 38/40)*
> - [[${RES}/02_SR_EN_CURSO/SR-2_fototipos/_hoja_de_ruta|🧭 SR-2 · RF/CO₂ en fototipos IV–VI]] *(siguiente · L5)*

## 📐 Playbook
> - [[${RES}/03_PLAYBOOK/_playbook_SR|Playbook de Revisión Sistemática]]
> - [[${RES}/03_PLAYBOOK/recursos_referentes|Recursos de referentes (verificados)]]

## 📊 APEX recientes (rama investigación)
\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado", file.folder AS "Carpeta"
FROM "${RES}"
WHERE contains(file.folder, "APEX_creados")
SORT file.cday DESC
LIMIT 25
\`\`\`

## ✅ Hojas de ruta (estado de las SR)
\`\`\`dataview
TABLE WITHOUT ID file.link AS "SR", sr AS "Tag", linea AS "Línea", estado AS "Estado"
FROM "${RES}/02_SR_EN_CURSO"
WHERE tipo = "hoja_de_ruta_sr"
\`\`\`
`);
log('00_DASHBOARD_RESEARCH: Dashboard_Research.md');

/* ════════════ 6 · Añadir sección 🔬 RESEARCH al Mapa_Temarios_Trilingue (idempotente) ════════════ */
const mapaPath = path.join(VAULT, '00_Dashboard', 'Mapa_Temarios_Trilingue.md');
const RESEARCH_SECTION = `

## 🔬 RESEARCH — Investigación dermatológica (L0–L8 · revisiones sistemáticas)
> [!info] Rama \`${RES}\` · motor de SR hacia Mayo/Bioclinic. Dashboard: [[${RES}/00_DASHBOARD_RESEARCH/Dashboard_Research|🔬 Dashboard Research]]
${[...LINES].sort((a, b) => a.id - b.id).map((l) => `- [[${RES}/01_LINEAS/${lineFolderById[l.id]}/_concepto_madre|${l.code} · ${l.nombre.split(/ \(| · /)[0]}]] · Mayo ${l.mayoScore}/40${l.srTag ? ` · ${l.srTag}` : ''}`).join('\n')}
- **SR en curso:** [[${RES}/02_SR_EN_CURSO/SR-1_complicaciones/_hoja_de_ruta|SR-1 complicaciones]] · [[${RES}/02_SR_EN_CURSO/SR-2_fototipos/_hoja_de_ruta|SR-2 fototipos]]
`;
if (fs.existsSync(mapaPath)) {
  const cur = fs.readFileSync(mapaPath, 'utf8');
  if (cur.includes('🔬 RESEARCH — Investigación')) { stats.skipped++; log('Mapa_Temarios_Trilingue: sección RESEARCH ya presente (intacto)'); }
  else { if (WRITE) fs.appendFileSync(mapaPath, RESEARCH_SECTION, 'utf8'); stats.patched++; log(`Mapa_Temarios_Trilingue: sección RESEARCH ${WRITE ? 'añadida' : '(dry-run, se añadiría)'}`); }
} else {
  stats.problems.push('Mapa_Temarios_Trilingue.md no existe (¿ejecutaste build_vault_trilingue primero?)');
}

/* ════════════ 7 · Emitir src/lib/obsidianResearchMap.ts ════════════ */
const out = `/**
 * obsidianResearchMap.ts — GENERADO por DATA/_scripts/build_vault_research.js (${HOY}).
 * Deep-links obsidian:// hacia la rama "${RES}" del vault "Vault_Medicina MIR_Joseph".
 * NO editar a mano: regenerar con el script. Reutiliza obsUrl() de obsidianMap.ts.
 *
 *  · líneas L0–L8 → nota _concepto_madre de la línea (01_LINEAS)
 *  · SR-1/SR-2    → _hoja_de_ruta de la revisión sistemática (02_SR_EN_CURSO)
 *  · átomos 1-40  → carpeta/fase de SR-1 (artefacto vivo del plan día-a-día)
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

/** Átomo del plan día-a-día (1–40) → carpeta/fase de su SR (SR-1) */
export const RESEARCH_OBS_DAY: Record<number, string> = ${JSON.stringify(RESEARCH_OBS_DAY)};
export const researchObsUrlDay = (d: number): string | null => {
  const p = RESEARCH_OBS_DAY[d]; return p ? obsUrl(p) : null;
};

/** Dashboard de la rama de investigación */
export const OBS_RESEARCH_DASHBOARD_URL = obsUrl('${RES}/00_DASHBOARD_RESEARCH/Dashboard_Research');
`;
const mapPath = path.join(APP, 'src/lib/obsidianResearchMap.ts');
if (WRITE) fs.writeFileSync(mapPath, out, 'utf8');
log(`\nobsidianResearchMap.ts ${WRITE ? 'escrito' : '(dry-run)'} · líneas=${Object.keys(RESEARCH_OBS_LINE).length} · SR=${Object.keys(RESEARCH_OBS_SR).length} · días=${Object.keys(RESEARCH_OBS_DAY).length}`);

log(`\n${WRITE ? 'ESCRITO' : 'DRY-RUN'} · dirs nuevos: ${stats.dirs} · files nuevos: ${stats.files} · ya existían (intactos): ${stats.skipped} · parches: ${stats.patched}`);
if (stats.problems.length) { log('\n⚠ PROBLEMAS:'); stats.problems.forEach((p) => log('  - ' + p)); }
