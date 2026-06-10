/**
 * build_vault_trilingue.js — construye/verifica la estructura de subtemas del vault
 * Obsidian "Vault_Medicina MIR_Joseph" para los 3 exámenes y emite src/lib/obsidianMap.ts.
 *
 *  · MIR    → 03_MIR/NN_Especialidad/NN_subtema/{APEX_creados, _concepto_madre.md}
 *             (las 30 asignaturas REALES de ProMIR; respeta las 5 carpetas existentes)
 *  · USMLE  → 01_USMLE/02_UWORLD_SYSTEMS/NN_System/NN_subtopic/{APEX_creados, _concepto_madre.md}
 *             (sistemas→subtopics REALES del qbank uWorld Step 1 de Qbankly)
 *  · ENCAPS → SOLO VERIFICA contra encapsBlocks.ts (no toca lo correcto; crea lo que falte)
 *
 * Reglas: idempotente · NUNCA borra ni sobreescribe archivos existentes · todo dato
 * viene de los ficheros reales de src/lib (no se inventa nada).
 *
 * Uso:  node build_vault_trilingue.js        (dry-run: solo reporta)
 *       node build_vault_trilingue.js --write
 */
const fs = require('fs');
const path = require('path');

const VAULT = 'D:/JOSEPH/Vault_Medicina MIR_Joseph';
const APP = 'D:/joseph-md-app';
const WRITE = process.argv.includes('--write');
const HOY = '2026-06-10';

const log = (...a) => console.log(...a);
const acc = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const slugLower = (s, max = 52) => acc(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, max).replace(/_+$/, '');
const slugTitle = (s, max = 52) => acc(s).replace(/&/g, 'and').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, max).replace(/_+$/, '');

// extrae un array literal `NAME ... = [ ... ];` de un .ts y lo evalúa
function extractArray(file, marker) {
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
  return eval(t.slice(start, end + 1)); // literales propios del repo (sin código externo)
}

const stats = { dirs: 0, files: 0, skipped: 0, problems: [] };
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

/* ════════════════ 1 · MIR — 30 asignaturas ProMIR ════════════════ */
const MIR_TEMARIO = extractArray(path.join(APP, 'src/lib/mirTemarioData.ts'), 'MIR_TEMARIO');
log(`MIR_TEMARIO: ${MIR_TEMARIO.length} asignaturas`);

// carpetas existentes (no renombrar jamás) + orden del plan diario + resto por num
const EXISTING = { 3: '01_Cardiologia', 19: '02_Neumologia', 11: '03_Digestivo', 18: '04_Nefrologia', 20: '05_Neurologia' };
const PLAN_NEW = [6, 7, 28, 15, 14, 24, 26]; // Endo, Inf, Reuma, Hemato, Gineco, Pedia, Psiq
const espFolder = {};
let next = 6;
for (const num of PLAN_NEW) { const a = MIR_TEMARIO.find(x => x.num === num); espFolder[num] = `${String(next).padStart(2, '0')}_${slugTitle(a.name)}`; next++; }
for (const a of [...MIR_TEMARIO].sort((x, y) => x.num - y.num)) {
  if (EXISTING[a.num]) { espFolder[a.num] = EXISTING[a.num]; continue; }
  if (espFolder[a.num]) continue;
  espFolder[a.num] = `${String(next).padStart(2, '0')}_${slugTitle(a.name)}`; next++;
}

function mirConceptoMadre(a, ch, espDir, subFolder, legacyNote) {
  const espSlug = slugLower(a.name);
  const url = `https://promir.medicapanamericana.com/capitulo/${ch.capId}`;
  const folderRel = `03_MIR/${espDir}/${subFolder}`;
  return `---
tipo: concepto_madre
examen: MIR
especialidad: ${espSlug}
especialidad_legible: ${espDir}
subtema: ${subFolder}
capitulo_promir: ${ch.n}
capId: ${ch.capId}
promir_url: ${url}
fecha_creacion: ${HOY}
estado: vacio
---

# 🇪🇸 ${ch.n}. ${ch.titulo}

> [!info] Nota madre del subtema — **MIR · ${a.name}**
> Los APEX expandidos del Tutor caen en \`APEX_creados/\`.
> 📖 [Abrir capítulo en ProMIR](${url})${legacyNote ? ` · 📝 [[${legacyNote}]]` : ''} · 🏠 [[Dashboard_MIR]]

## 🎯 Resumen

*(pendiente — se llena al estudiar el tema)*

## 🔑 Conceptos clave

*(pendiente)*

## ⚠️ CCSN — Confusiones frecuentes

*(pendiente)*

## 🗂️ APEX relacionados

\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado", fuente, modo
FROM "${folderRel}/APEX_creados"
SORT file.cday DESC
\`\`\`
`;
}

const MIR_OBS = {}; // capId -> ruta nota (sin .md)
let mirNew = 0;
for (const a of MIR_TEMARIO) {
  const espDir = espFolder[a.num];
  const espAbs = path.join(VAULT, '03_MIR', espDir);
  ensureDir(espAbs);
  ensureDir(path.join(espAbs, 'APEX_creados'));
  // notas legado existentes "Esp — NN_*.md" para enlazarlas
  const legacy = {};
  if (fs.existsSync(espAbs)) for (const f of fs.readdirSync(espAbs)) {
    const m = f.match(/^(.+) — (\d{2})_.+\.md$/);
    if (m) legacy[parseInt(m[2], 10)] = f.replace(/\.md$/, '');
  }
  for (const ch of a.chapters) {
    const subFolder = `${String(ch.n).padStart(2, '0')}_${slugLower(ch.titulo)}`;
    const subAbs = path.join(espAbs, subFolder);
    const isNew = ensureDir(subAbs);
    ensureDir(path.join(subAbs, 'APEX_creados'));
    ensureFile(path.join(subAbs, '_concepto_madre.md'), mirConceptoMadre(a, ch, espDir, subFolder, legacy[ch.n]));
    if (isNew) mirNew++;
    MIR_OBS[ch.capId] = `03_MIR/${espDir}/${subFolder}/_concepto_madre`;
  }
}
log(`MIR: ${Object.keys(MIR_OBS).length} subtemas mapeados · ${mirNew} carpetas nuevas`);

/* ════════════════ 2 · USMLE — sistemas uWorld (Qbankly) ════════════════ */
const QB_BANKS = extractArray(path.join(APP, 'src/lib/usmleQbanklyData.ts'), 'QB_BANKS');
const uworld = QB_BANKS.find(b => /uWorld/i.test(b.name));
const systems = []; const subsBySys = {};
for (const [label, q] of uworld.subtopics) {
  const m = label.match(/^(.+?) \((.+)\)$/);
  if (!m) { stats.problems.push('subtopic sin patrón: ' + label); continue; }
  const sys = m[1].trim(), sub = m[2].trim();
  if (!subsBySys[sys]) { subsBySys[sys] = []; systems.push(sys); }
  subsBySys[sys].push({ sub, q });
}
log(`USMLE uWorld: ${systems.length} sistemas · ${uworld.subtopics.length} subtopics`);

const USMLE_BASE = '01_USMLE/02_UWORLD_SYSTEMS';
ensureDir(path.join(VAULT, USMLE_BASE));
const usmleSysFolder = {}; const USMLE_SUB_PATH = {}; // 'sys|sub' normalizado -> ruta
const normTxt = (s) => acc(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();

function usmleConceptoMadre(sys, sub, q, folderRel) {
  return `---
tipo: concepto_madre
examen: USMLE
system: ${sys}
subtopic: ${sub}
uworld_q: ${q}
fecha_creacion: ${HOY}
estado: vacio
---

# 🇺🇸 ${sys} — ${sub}

> [!info] Mother note — **USMLE Step 1 · uWorld system tree**
> APEX cards land in \`APEX_creados/\`. **${q} uWorld questions** in this subtopic.
> 🅠 [Open Qbankly QBanks](https://qbankly.app/qbanks) *(use Edge)* · 🏠 [[Dashboard_USMLE]]

## 🎯 Summary

*(pending — fill while studying)*

## 🗣 Vocabulary (English glossary)

*(pending — new medical terms land here)*

## ⚠️ CCSN — Commonly confused with

*(pending)*

## 🗂️ Related APEX

\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Created", fuente, modo
FROM "${folderRel}/APEX_creados"
SORT file.cday DESC
\`\`\`
`;
}

systems.forEach((sys, i) => {
  const sysDir = `${String(i + 1).padStart(2, '0')}_${slugTitle(sys)}`;
  usmleSysFolder[sys] = `${USMLE_BASE}/${sysDir}`;
  const sysAbs = path.join(VAULT, USMLE_BASE, sysDir);
  ensureDir(sysAbs);
  const subs = subsBySys[sys];
  const indice = `---
tipo: indice_sistema
examen: USMLE
system: ${sys}
subtopics: ${subs.length}
uworld_q_total: ${subs.reduce((s, x) => s + x.q, 0)}
---

# 🇺🇸 ${sys} — Index

> [!tip] ${subs.length} uWorld subtopics · ${subs.reduce((s, x) => s + x.q, 0)} questions
${subs.map((x, j) => `> ${j + 1}. [[${USMLE_BASE}/${sysDir}/${String(j + 1).padStart(2, '0')}_${slugLower(x.sub)}/_concepto_madre|${x.sub}]] · ${x.q}Q`).join('\n')}
`;
  ensureFile(path.join(sysAbs, '_indice.md'), indice);
  subs.forEach((x, j) => {
    const subDir = `${String(j + 1).padStart(2, '0')}_${slugLower(x.sub)}`;
    const subAbs = path.join(sysAbs, subDir);
    ensureDir(subAbs);
    ensureDir(path.join(subAbs, 'APEX_creados'));
    const folderRel = `${USMLE_BASE}/${sysDir}/${subDir}`;
    ensureFile(path.join(subAbs, '_concepto_madre.md'), usmleConceptoMadre(sys, x.sub, x.q, folderRel));
    USMLE_SUB_PATH[normTxt(sys) + '|' + normTxt(x.sub)] = `${folderRel}/_concepto_madre`;
  });
});

/* ──── mapear los 70 días del plan a su nota ──── */
const DIAS = extractArray(path.join(APP, 'src/lib/usmleStep1Daily.ts'), 'DIAS');
const ALIAS = {
  'Cardiovascular': ['Cardiovascular'],
  'Respiratory': ['Pulmonary & Critical Care'],
  'Renal': ['Renal & Electrolytes'],
  'Gastrointestinal': ['Gastrointestinal'],
  'Endocrine': ['Endocrine'],
  'Nervous System': ['Nervous System'],
  'Hematology & Oncology': ['Hematology & Oncology'],
  'Reproductive': ['Endocrine', 'Female Reproductive & Breast', 'Male Reproductive', 'Pregnancy & Childbirth'],
  'Musculoskeletal / Rheum': ['Rheumatology/Orthopedics'],
  'Psychiatry & Behavioral': ['Psychiatric/Substance Use'],
  'Immunology': ['Allergy & Immunology'],
  'Microbiology / ID': ['Infectious Diseases'],
  'Biochemistry': ['Biochemistry'],
};
const STOP = new Set(['and', 'of', 'the', 'a', 'y', 'de']);
const toks = (s) => new Set(normTxt(s).split(' ').filter(w => w && !STOP.has(w)));
const USMLE_OBS_DAY = {};
for (const d of DIAS) {
  const cands = (ALIAS[d.system] || [d.system]).filter(s => systems.some(x => normTxt(x) === normTxt(s)));
  const uwT = toks(d.uw);
  let best = null, bestScore = 0;
  for (const c of cands) {
    const sysReal = systems.find(x => normTxt(x) === normTxt(c));
    const sysT = toks(sysReal);
    for (const x of subsBySys[sysReal]) {
      const subT = toks(x.sub);
      const inter = [...subT].filter(w => uwT.has(w)).length;
      const uni = new Set([...subT, ...uwT]).size;
      const sysBonus = [...sysT].some(w => uwT.has(w)) ? 0.5 : 0;
      const score = (uni ? inter / uni : 0) + sysBonus;
      if (score > bestScore) { bestScore = score; best = USMLE_SUB_PATH[normTxt(sysReal) + '|' + normTxt(x.sub)]; }
    }
  }
  let found = bestScore >= 0.34 ? best : null;
  if (!found && cands.length) {
    const sys = systems.find(x => normTxt(x) === normTxt(cands[0]));
    found = `${usmleSysFolder[sys]}/_indice`;
    stats.problems.push(`D${d.d} sin subtopic exacto (${d.system} → ${d.uw}) → índice ${cands[0]}`);
  }
  if (!found) stats.problems.push(`D${d.d} SIN MATCH: ${d.system} / ${d.uw}`);
  else USMLE_OBS_DAY[d.d] = found;
}
log(`USMLE plan: ${Object.keys(USMLE_OBS_DAY).length}/70 días mapeados`);

/* ════════════════ 3 · ENCAPS — verificación ════════════════ */
const encT = fs.readFileSync(path.join(APP, 'src/lib/encapsBlocks.ts'), 'utf8');
const ENC_CARPETA = { salud_publica: '01_Salud_Publica', cuidado_integral: '02_Cuidado_Integral', etica_interculturalidad: '03_Etica_Interculturalidad', investigacion: '04_Investigacion', gestion_salud: '05_Gestion_Salud' };
const ENC_BASE = '06_ENCAPS/ENCAPS_2026/02_TEMARIO';
const encReport = [];
for (const [blockId, carpeta] of Object.entries(ENC_CARPETA)) {
  // subtemas declarados en la app para este bloque
  const bi = encT.indexOf(`id: '${blockId}',`);
  const nx = encT.indexOf("\n    id: '", bi + 10);
  const slice = encT.slice(bi, nx > 0 ? nx : undefined);
  const ids = [...slice.matchAll(/'(\d{2}_[a-z0-9_]+)'/g)].map(m => m[1]);
  const dirAbs = path.join(VAULT, ENC_BASE, carpeta);
  const inVault = fs.existsSync(dirAbs) ? fs.readdirSync(dirAbs).filter(f => /^\d{2}_/.test(f) && fs.statSync(path.join(dirAbs, f)).isDirectory()) : [];
  const missing = ids.filter(x => !inVault.includes(x));
  const extra = inVault.filter(x => !ids.includes(x));
  // sanidad interna: cada subtema con APEX_creados + _concepto_madre
  let incomplete = 0;
  for (const sf of inVault) {
    const p = path.join(dirAbs, sf);
    if (!fs.existsSync(path.join(p, 'APEX_creados'))) { ensureDir(path.join(p, 'APEX_creados')); incomplete++; }
    if (!fs.existsSync(path.join(p, '_concepto_madre.md'))) incomplete++;
  }
  // crear los que falten (según la app)
  for (const sf of missing) {
    const p = path.join(dirAbs, sf);
    ensureDir(p); ensureDir(path.join(p, 'APEX_creados'));
    const titulo = sf.replace(/^\d{2}_/, '').replace(/_/g, ' ');
    ensureFile(path.join(p, '_concepto_madre.md'), `---
tipo: concepto_madre
bloque: ${blockId}
bloque_legible: ${carpeta}
subtema: ${sf}
fecha_creacion: ${HOY}
estado: vacio
---

# ${sf.slice(0, 2)}. ${titulo.charAt(0).toUpperCase() + titulo.slice(1)}

> [!info] Nota base del subtema — **ENCAPS · ${carpeta.replace(/^\d+_/, '').replace(/_/g, ' ')}**
> Los APEX expandidos del Tutor caen en \`APEX_creados/\`.

## 🎯 Resumen

*(pendiente)*

## 🔑 Conceptos clave

*(pendiente)*

## 🗂️ APEX relacionados

\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado", fuente, modo
FROM "${ENC_BASE}/${carpeta}/${sf}/APEX_creados"
SORT file.cday DESC
\`\`\`
`);
  }
  encReport.push({ blockId, app: ids.length, vault: inVault.length, missing, extra, incomplete });
}
log('\nENCAPS verificación:');
for (const r of encReport) log(`  ${r.blockId}: app=${r.app} vault=${r.vault} · faltaban=${r.missing.length}${r.missing.length ? ' → ' + r.missing.join(', ') : ''} · extra=${r.extra.length}${r.extra.length ? ' → ' + r.extra.join(', ') : ''} · reparados=${r.incomplete}`);

/* ════════════════ 4 · Mapa maestro bonito (00_Dashboard) ════════════════ */
const mapaNote = `---
tipo: mapa_temarios
fecha_creacion: ${HOY}
---

# 🗺️ Mapa de Temarios Trilingüe

> [!success] Los 3 grandes sistemas, navegables. Cada subtema tiene su carpeta con
> \`_concepto_madre.md\` + \`APEX_creados/\` — el motor APEX sabe exactamente dónde cae cada nota.

## 🇪🇸 MIR — ProMIR (30 asignaturas · ${Object.keys(MIR_OBS).length} capítulos)
${MIR_TEMARIO.map(a => `- [[03_MIR/${espFolder[a.num]}/${String(a.chapters[0].n).padStart(2, '0')}_${slugLower(a.chapters[0].titulo)}/_concepto_madre|${espFolder[a.num].replace(/^\d+_/, '').replace(/_/g, ' ')}]] · ${a.chapters.length} caps`).join('\n')}

## 🇺🇸 USMLE — uWorld Step 1 (${systems.length} sistemas · ${uworld.subtopics.length} subtopics)
${systems.map(s => `- [[${usmleSysFolder[s]}/_indice|${s}]] · ${subsBySys[s].length} subtopics`).join('\n')}

## 🇵🇪 ENCAPS — 5 bloques oficiales (94 subtemas)
${Object.entries(ENC_CARPETA).map(([id, c]) => `- **${c.replace(/^\d+_/, '').replace(/_/g, ' ')}** → \`${ENC_BASE}/${c}/\``).join('\n')}

## 📊 APEX recientes (todo el vault)
\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado", file.folder AS "Carpeta"
FROM "01_USMLE" OR "03_MIR" OR "06_ENCAPS"
WHERE contains(file.folder, "APEX_creados")
SORT file.cday DESC
LIMIT 25
\`\`\`
`;
ensureFile(path.join(VAULT, '00_Dashboard', 'Mapa_Temarios_Trilingue.md'), mapaNote);

/* ════════════════ 5 · Emitir src/lib/obsidianMap.ts ════════════════ */
const ENC_OBS = {};
for (const [blockId, carpeta] of Object.entries(ENC_CARPETA)) ENC_OBS[blockId] = `${ENC_BASE}/${carpeta}`;
const sysIdx = {}; for (const s of systems) sysIdx[normTxt(s)] = `${usmleSysFolder[s]}/_indice`;

const out = `/**
 * obsidianMap.ts — GENERADO por STUDY_HUB/_scrape/build_vault_trilingue.js (${HOY}).
 * Deep-links obsidian:// hacia el vault real "Vault_Medicina MIR_Joseph"
 * (D:\\JOSEPH\\Vault_Medicina MIR_Joseph). NO editar a mano: regenerar con el script.
 *
 *  · MIR:    capId ProMIR → nota _concepto_madre del capítulo (${Object.keys(MIR_OBS).length} caps, 30 asignaturas)
 *  · USMLE:  día del plan (1-70) → nota del subtopic uWorld (árbol 02_UWORLD_SYSTEMS)
 *  · ENCAPS: bloque/subtema → nota del subtema (estructura v2.4 PLUS ya existente)
 */
export const OBS_VAULT = 'Vault_Medicina MIR_Joseph';
export const obsUrl = (file: string) =>
  'obsidian://open?vault=' + encodeURIComponent(OBS_VAULT) + '&file=' + encodeURIComponent(file);

/** MIR — capId ProMIR → ruta de la nota madre (sin .md) */
export const MIR_OBS_CAP: Record<string, string> = ${JSON.stringify(MIR_OBS)};
export const mirObsUrl = (capId: string): string | null => {
  const p = MIR_OBS_CAP[capId]; return p ? obsUrl(p) : null;
};

/** USMLE — día del plan Step 1 → ruta de la nota del subtopic uWorld */
export const USMLE_OBS_DAY: Record<number, string> = ${JSON.stringify(USMLE_OBS_DAY)};
export const usmleObsUrl = (d: number): string | null => {
  const p = USMLE_OBS_DAY[d]; return p ? obsUrl(p) : null;
};

/** ENCAPS — bloque → carpeta del temario; subtema id = nombre de carpeta */
export const ENCAPS_OBS_BLOCK: Record<string, string> = ${JSON.stringify(ENC_OBS)};
export const encapsObsUrl = (blockId: string, subtemaId?: string): string | null => {
  const base = ENCAPS_OBS_BLOCK[blockId]; if (!base) return null;
  return obsUrl(subtemaId ? base + '/' + subtemaId + '/_concepto_madre' : base);
};

/** Mapa maestro del vault */
export const OBS_MAPA_URL = obsUrl('00_Dashboard/Mapa_Temarios_Trilingue');
`;
const mapPath = path.join(APP, 'src/lib/obsidianMap.ts');
if (WRITE) fs.writeFileSync(mapPath, out, 'utf8');
log(`\nobsidianMap.ts ${WRITE ? 'escrito' : '(dry-run)'} · MIR=${Object.keys(MIR_OBS).length} caps · USMLE=${Object.keys(USMLE_OBS_DAY).length} días · ENCAPS=5 bloques`);

log(`\n${WRITE ? 'ESCRITO' : 'DRY-RUN'} · dirs nuevos: ${stats.dirs} · files nuevos: ${stats.files} · ya existían (intactos): ${stats.skipped}`);
if (stats.problems.length) { log('\n⚠ PROBLEMAS:'); stats.problems.forEach(p => log('  - ' + p)); }
