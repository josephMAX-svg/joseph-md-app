/**
 * build_vault_derma.js — construye/verifica la RAMA DERMATOLOGÍA del vault Obsidian
 * "Vault_Medicina MIR_Joseph" bajo 10_DERMATOLOGIA\ y emite src/lib/obsidianDermaMap.ts.
 * Copia el patrón de build_vault_trilingue.js / build_vault_research.js.
 *
 * ¿Por qué 10_ y no 07_? El PROMPT_OBSIDIAN_DERMA original pedía 07_DERMATOLOGIA, pero
 * 07_VENTAS_AURUM ya ocupa ese número en el vault real → rama nueva 10_DERMATOLOGIA.
 *
 * Estructura creada (NO toca nada existente):
 *   10_DERMATOLOGIA/
 *     00_DASHBOARD_DERMA/Dashboard_Derma.md
 *     NN_<K>_<bloque>/_indice.md                              ← bloques A-H, X, Z del PLAN ÉLITE v2
 *     NN_<K>_<bloque>/dNN_<subtema>/{APEX_creados, _concepto_madre.md}   ← 70 átomos (dermaDailyPlan.ts)
 *     90_DICTADOS_MORFOLOGIA/_plantilla_dictado.md            ← paso ① del caso ciego (8 ejes)
 *
 * Cada _concepto_madre lleva los 7 PASOS del Cerebro Clínico (DERMA_MASTER_SPEC §3) como
 * secciones, el dictado morfológico del caso (paso ①), CCSN, guion de paciente (Nítida en
 * bloque B + d68) y el dataview de APEX_creados. Bloques E (dermpath) y G (cirugía) llevan
 * `fuente_primaria` (Barnhill's / Kantor) como pedía el prompt.
 *
 * Reglas (idénticas al trilingüe): idempotente · NUNCA borra ni sobreescribe · dry-run por
 * defecto · datos REALES de src/lib/dermaDailyPlan.ts (compilado con el TypeScript del
 * propio repo, no se re-tipea nada a mano).
 *
 * Uso:  node build_vault_derma.js                 (dry-run: solo reporta)
 *       node build_vault_derma.js --write         (crea carpetas/notas + emite el .ts)
 *       node build_vault_derma.js --write --patch-mapa   (además AÑADE la sección 🧴 al
 *                                                 00_Dashboard/Mapa_Temarios_Trilingue.md — opt-in,
 *                                                 porque modifica un fichero existente del vault)
 *       --hoy=YYYY-MM-DD  fecha_creacion del frontmatter (default: hoy)
 *       --rewrite=19,20   re-escribe esas notas madre SOLO si siguen `estado: vacio` (swaps de contenido
 *                         del plan: p. ej. d19/d20 ↔ d57/d58 del 05-sep-2026). Las notas trabajadas nunca se tocan.
 *       --huerfanas       lista carpetas de átomo con slug antiguo (fuera del mapa) tras un swap; no borra nada.
 *       --rewrite-dashboard  regenera 00_DASHBOARD_DERMA/Dashboard_Derma.md (es 100 % generado: listas + dataviews).
 */
const fs = require('fs');
const path = require('path');

const VAULT = 'D:/JOSEPH/Vault_Medicina MIR_Joseph';
const APP = 'D:/joseph-md-app';
const WRITE = process.argv.includes('--write');
const PATCH_MAPA = process.argv.includes('--patch-mapa');
const HOY = (process.argv.find((a) => a.startsWith('--hoy=')) || '').slice(6) || new Date().toISOString().slice(0, 10);
const RAMA = '10_DERMATOLOGIA';

const log = (...a) => console.log(...a);
const acc = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const slugLower = (s, max = 44) => acc(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, max).replace(/_+$/, '');
const slugTitle = (s, max = 40) => acc(s).replace(/&/g, 'and').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, max).replace(/_+$/, '');
const yml = (s) => '"' + String(s ?? '').replace(/"/g, "'") + '"';

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

/* ════════════ 1 · Leer datos REALES: dermaDailyPlan.ts compilado con el TS del repo ════════════ */
// El array DERMA_DIAS usa helpers del propio fichero (ca(), book(), B.A, rPIC…): en vez de
// re-implementarlos, se transpila el módulo a CommonJS y se evalúa con un stub de './researchData'.
function loadDermaPlan() {
  const ts = require(path.join(APP, 'node_modules/typescript'));
  const file = path.join(APP, 'src/lib/dermaDailyPlan.ts');
  const src = fs.readFileSync(file, 'utf8');
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const mod = { exports: {} };
  const req = (name) => {
    if (name === './researchData') return { diaEstudioTipo: () => null, VUELTAS: {}, INTERVALOS: {} };
    return require(name);
  };
  new Function('require', 'module', 'exports', js)(req, mod, mod.exports);
  return mod.exports;
}
const PLAN = loadDermaPlan();
const DIAS = PLAN.DERMA_DIAS;
const META = PLAN.DERMA_DAILY_META;
if (!Array.isArray(DIAS) || DIAS.length !== META.totalDias) stats.problems.push(`DERMA_DIAS=${DIAS && DIAS.length} ≠ totalDias=${META.totalDias}`);
log(`dermaDailyPlan.ts: ${DIAS.length} átomos · D1=${DIAS[0].fecha} · D${DIAS.length}=${DIAS[DIAS.length - 1].fecha}`);

/* ════════════ 2 · Bloques A-H, X, Z (orden del plan) ════════════ */
const BLOQUES = [
  { k: 'A', n: 1, nombre: 'Fundamentos / morfología' },
  { k: 'B', n: 2, nombre: 'Dermatosis inflamatorias' },
  { k: 'C', n: 3, nombre: 'Infecciosas' },
  { k: 'D', n: 4, nombre: 'Tumores benignos / malignos + dermatoscopia' },
  { k: 'E', n: 5, nombre: 'Dermatopatología básica', fuentePrimaria: "Barnhill's Dermatopathology 4e (AccessDerma bookid 2802)" },
  { k: 'F', n: 6, nombre: 'Pediátrica' },
  { k: 'G', n: 7, nombre: 'Quirúrgica / anatomía facial', fuentePrimaria: 'Kantor · Atlas of Suturing Techniques 2e (bookid 3138) + Dermatologic Surgery (bookid 2811)' },
  { k: 'H', n: 8, nombre: 'Checkpoint CORE' },
  { k: 'X', n: 9, nombre: 'Estética (toxina → fillers/oclusión → peelings → láser → cosmecéutica)' },
  { k: 'Z', n: 10, nombre: 'Cierre / repaso' },
];
const blkFolder = {}; // k -> 'NN_K_slug'
for (const b of BLOQUES) blkFolder[b.k] = `${String(b.n).padStart(2, '0')}_${b.k}_${slugTitle(b.nombre.split(/ \(| \+ /)[0])}`;
for (const d of DIAS) if (!blkFolder[d.bKey]) stats.problems.push(`d${d.d}: bKey desconocido ${d.bKey}`);

// Átomos que alimentan NÍTIDA (Pulso · derma médica por suscripción): campo `nitida` del átomo (plan v2.1)
// o, si el plan aún no lo trae, módulo B + d68 cosmecéutica.
const NITIDA_D = new Set(DIAS.filter((x) => x.nitida || x.bKey === 'B' || x.d === 68).map((x) => x.d));
// Átomos puente con Research: campo `puenteResearch` del átomo (v2.1: SR-1 = L4 oclusión vascular, SR-2 = L5
// fototipos IV-VI). Fallback estático del plan v2 si ningún átomo lo trae. Tras el swap de contenido
// d19/d20 ↔ d57/d58 (seguridad de fillers antes de la extracción R22-R25) el set se calcula, no se fija.
const HAS_PUENTE = DIAS.some((x) => x.puenteResearch);
const SR1_D = new Set(HAS_PUENTE ? DIAS.filter((x) => x.puenteResearch && x.puenteResearch.sr === 'SR-1').map((x) => x.d) : [5, 47, 48, 54, 55, 56, 57, 58]);
const SR2_D = new Set(HAS_PUENTE ? DIAS.filter((x) => x.puenteResearch && x.puenteResearch.sr === 'SR-2').map((x) => x.d) : []);
// --rewrite=19,20,57,58 → re-escribe SOLO esas notas madre y SOLO si siguen `estado: vacio` (plantilla intacta):
// sirve para los swaps de contenido del plan sin tocar jamás una nota ya trabajada.
const REWRITE = new Set(((process.argv.find((a) => a.startsWith('--rewrite=')) || '').slice(10)).split(',').filter(Boolean).map(Number));
function rewriteIfVacia(p, content) {
  if (!fs.existsSync(p)) return false;
  const cur = fs.readFileSync(p, 'utf8');
  if (!/^estado: vacio$/m.test(cur)) { stats.problems.push(`${p}: NO re-escrita (estado ≠ vacio)`); return false; }
  if (WRITE) fs.writeFileSync(p, content, 'utf8');
  stats.patched++; return true;
}
const RES = '04_INVESTIGACIÓN DERMATOLÓGICA';
const SR1_HOJA = `${RES}/02_SR_EN_CURSO/SR-1_complicaciones/_hoja_de_ruta`;

/* ════════════ 3 · Nota madre por átomo (7 pasos del Cerebro Clínico) ════════════ */
function link(m) { return m ? `[${m.t.replace(/\]/g, ')')}](${m.url})` : null; }
function conceptoMadre(d, b, folderRel) {
  const links = [
    d.access ? `🩻 Caso ciego: ${link(d.access)}` : null,
    d.qbankly ? `🅠 Review: ${link(d.qbankly)}` : null,
    d.extra ? `📖 Lectura 10′: ${link(d.extra)}` : null,
    d.atlasUrl ? `🖼️ [Atlas](${d.atlasUrl})` : null,
    d.dermatoscopiaUrl ? `🔬 [Dermatoscopia](${d.dermatoscopiaUrl})` : null,
    d.histoUrl ? `🧫 [Histología](${d.histoUrl})` : null,
  ].filter(Boolean);
  const ddx = (d.ddx || []).map((x) => `- [ ] ${x}`).join('\n');
  const nitida = NITIDA_D.has(d.d);
  const sr1 = SR1_D.has(d.d);
  const sr2 = SR2_D.has(d.d);
  return `---
tipo: concepto_madre
examen: DERMA
bloque: ${d.bKey}
bloque_legible: ${yml(b.nombre)}
atomo: ${d.d}
fecha_plan: ${d.fecha}
tier: ${d.tier}
subtema: ${yml(d.sub)}
referente: ${yml(d.referente || '')}
morfologia: ${yml(d.morfologia || '')}
sitio: ${yml(d.sitio || '')}
fototipo: ${yml(d.fototipo || '')}
caso_url: ${yml(d.access && d.access.url)}
review_url: ${yml(d.qbankly && d.qbankly.url)}
lectura_url: ${yml(d.extra && d.extra.url)}
atlas_url: ${yml(d.atlasUrl || '')}
dermatoscopia_url: ${yml(d.dermatoscopiaUrl || '')}
histo_url: ${yml(d.histoUrl || '')}${b.fuentePrimaria ? `\nfuente_primaria: ${yml(b.fuentePrimaria)}` : ''}
nitida: ${nitida}
puente_sr1: ${sr1}
puente_sr2: ${sr2}
puente_nota: ${yml(d.puenteResearch ? `${d.puenteResearch.sr} (${d.puenteResearch.linea}) · ${d.puenteResearch.nota}` : '')}
modulo_core_fallos: []
fecha_creacion: ${HOY}
estado: vacio
---

# 🧴 d${String(d.d).padStart(2, '0')} · ${d.sub}

> [!info] Nota madre del átomo — **DERMA · ${b.k} ${b.nombre}** · ${d.tier}${d.referente ? ` · referente **${d.referente}**` : ''} · sesión ${d.fecha}
> Las tarjetas de MECANISMO y los APEX del Tutor caen en \`APEX_creados/\`. 🏠 [[Dashboard_Derma]] · 📚 [[${folderRel.split('/').slice(0, 2).join('/')}/_indice|Índice ${b.k}]]${sr1 ? ` · 🔬 alimenta [[${SR1_HOJA}|SR-1 complicaciones]]` : ''}${sr2 ? ' · 🔬 alimenta SR-2 (L5 · fototipos IV-VI)' : ''}
${links.map((l) => `> ${l}`).join('\n')}

## 📷 Paso ① · Dictado morfológico del caso (ANTES de diagnosticar)

| Eje | Descripción dictada | ✔ tras leer la discusión |
|---|---|---|
| Lesión primaria | | |
| Lesión secundaria | | |
| Color | | |
| Forma / borde | | |
| Superficie / palpación | | |
| Configuración | | |
| Distribución | | |
| Tamaño / número | | |

**Puntaje 0-8:** \`\` · Fallo etiquetado (med/ped/surg/path): \`\` · tipo (CCSN·CONCEPTO·MORFOLOGIA·DDX): \`\`

## 🎯 Paso ② · Diferencial de 3 (ciego)
${ddx || '- [ ] \n- [ ] \n- [ ] '}

## 🧠 Cerebro Clínico — 7 pasos (SPEC §3 · mastery gate §6.3: recitarlos sin mirar)

### 1 · Causa
*(pendiente — qué proceso real produce lo que veo)*

### 2 · Mecanismo (cascada)
*(pendiente — la cadena tejido/fisiología: es la tarjeta Anki de MECANISMO)*

### 3 · Capa / anatomía
*(pendiente — en qué plano vivo, qué hay debajo, qué no puedo tocar)*

### 4 · Decisión (árbol)
*(pendiente — opciones, primera línea, criterios, secuenciación · toda dosis/parámetro con fuente o \`verify\`)*

### 5 · Lo que NO puedo errar
*(pendiente — la catástrofe específica de este tema + su rescate, precableado)*

### 6 · Comunicación (guion de paciente)
*(pendiente — qué digo, qué dibujo, qué expectativa fijo)*${nitida ? `
> [!tip] NÍTIDA · consulta tipo de este diagnóstico → \`DATA/DERMATOLOGIA/NITIDA_PROTOCOLOS.md\` (foto estandarizada · rutina ≤3 pasos · revisión 6-8 sem · IGA)` : ''}

### 7 · Hábito / seguimiento
*(pendiente — qué cambia en casa, adherencia, cuándo reviso, cómo mido)*

## ⚠️ CCSN — Confusiones frecuentes

*(pendiente)*

## 🗂️ APEX y tarjetas de mecanismo de este átomo

\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado", fuente, modo
FROM "${folderRel}/APEX_creados"
SORT file.cday DESC
\`\`\`
`;
}

/* ════════════ 4 · Índice por bloque ════════════ */
function indiceBloque(b, atoms) {
  const rows = atoms.map((d) => `> - [[${d.rel}|d${String(d.d).padStart(2, '0')} · ${d.sub.split(/[:(—]/)[0].trim()}]] · ${d.fecha} · ${d.tier}${d.referente ? ` · ${d.referente}` : ''}`).join('\n');
  return `---
tipo: indice_bloque
examen: DERMA
bloque: ${b.k}
bloque_legible: ${yml(b.nombre)}
atomos: ${atoms.length}${b.fuentePrimaria ? `\nfuente_primaria: ${yml(b.fuentePrimaria)}` : ''}
fecha_creacion: ${HOY}
---

# 🧴 ${b.k} · ${b.nombre} — Índice

> [!tip] ${atoms.length} átomos del PLAN ÉLITE v2 (franja 13:30-14:15, interdiaria con Research). 🏠 [[Dashboard_Derma]]
${rows}

## 📊 Estado de las notas madre del bloque
\`\`\`dataview
TABLE WITHOUT ID file.link AS "Átomo", fecha_plan AS "Sesión", tier AS "Tier", estado AS "Estado", modulo_core_fallos AS "Fallos CORE"
FROM "${RAMA}/${blkFolder[b.k]}"
WHERE tipo = "concepto_madre"
SORT atomo ASC
\`\`\`
`;
}

/* ════════════ 5 · Construir la rama ════════════ */
ensureDir(path.join(VAULT, RAMA));
const DERMA_OBS_DAY = {};   // d -> ruta nota (sin .md)
const DERMA_OBS_BLOCK = {}; // k -> ruta _indice (sin .md)
const porBloque = {};
for (const b of BLOQUES) {
  const bAbs = path.join(VAULT, RAMA, blkFolder[b.k]);
  ensureDir(bAbs);
  const atoms = DIAS.filter((d) => d.bKey === b.k);
  porBloque[b.k] = [];
  for (const d of atoms) {
    const sub = `d${String(d.d).padStart(2, '0')}_${slugLower(d.sub)}`;
    const subAbs = path.join(bAbs, sub);
    ensureDir(subAbs);
    ensureDir(path.join(subAbs, 'APEX_creados'));
    const folderRel = `${RAMA}/${blkFolder[b.k]}/${sub}`;
    const madre = conceptoMadre(d, b, folderRel);
    if (REWRITE.has(d.d)) rewriteIfVacia(path.join(subAbs, '_concepto_madre.md'), madre);
    ensureFile(path.join(subAbs, '_concepto_madre.md'), madre);
    const rel = `${folderRel}/_concepto_madre`;
    DERMA_OBS_DAY[d.d] = rel;
    porBloque[b.k].push({ ...d, rel });
  }
  ensureFile(path.join(bAbs, '_indice.md'), indiceBloque(b, porBloque[b.k]));
  DERMA_OBS_BLOCK[b.k] = `${RAMA}/${blkFolder[b.k]}/_indice`;
}
log(`Bloques: ${BLOQUES.length} · átomos mapeados: ${Object.keys(DERMA_OBS_DAY).length}/${DIAS.length}`);

/* ════════════ 6 · 90_DICTADOS_MORFOLOGIA (paso ① fuera del átomo, para casos extra) ════════════ */
ensureDir(path.join(VAULT, RAMA, '90_DICTADOS_MORFOLOGIA'));
ensureFile(path.join(VAULT, RAMA, '90_DICTADOS_MORFOLOGIA', '_plantilla_dictado.md'), `---
tipo: plantilla
examen: DERMA
fecha_creacion: ${HOY}
---

# 📷 Plantilla · Dictado morfológico (paso ① del caso ciego)

> [!abstract] Método Palmerton aplicado al caso visual: describir en terminología estándar ANTES de diagnosticar.
> Vocabulario: [DermNet · Terminology in dermatology](https://dermnetnz.org/topics/terminology) · Guidebook to Dermatologic Diagnosis (AccessDerma bookid 2960).
> Copia esta nota como \`AAAA-MM-DD_caso-<id>.md\` en esta carpeta (o pega la tabla en la nota madre del átomo del día).

| Eje | Descripción dictada | ✔ tras leer la discusión |
|---|---|---|
| Lesión primaria (mácula · pápula · placa · nódulo · vesícula · ampolla · pústula · habón · tumor) | | |
| Lesión secundaria (escama · costra · erosión · úlcera · fisura · atrofia · liquenificación · cicatriz) | | |
| Color (eritema · violáceo · marrón · gris/azul · blanco · amarillo · en fototipos IV-VI) | | |
| Forma / borde (redonda · oval · anular · policíclica · bien/mal definido) | | |
| Superficie / palpación (lisa · verrugosa · umbilicada · infiltrada · blanda) | | |
| Configuración (agrupada · herpetiforme · lineal/Blaschko · serpiginosa · zosteriforme) | | |
| Distribución (localizada · simétrica · fotoexpuesta · flexural · extensora · acral · dermatómica) | | |
| Tamaño / número (mm-cm · única · múltiple · confluente) | | |

**Puntaje 0-8:** \`\` · **Gate módulo A:** 10 dictados ≥6/8 antes de pasar a B · Fallo etiquetado (med/ped/surg/path): \`\`
`);

/* ════════════ 7 · 00_DASHBOARD_DERMA ════════════ */
ensureDir(path.join(VAULT, RAMA, '00_DASHBOARD_DERMA'));
const blockRows = BLOQUES.map((b) => `> - [[${DERMA_OBS_BLOCK[b.k]}|${b.k} · ${b.nombre}]] · ${porBloque[b.k].length} átomos`).join('\n');
const DASH_PATH = path.join(VAULT, RAMA, '00_DASHBOARD_DERMA', 'Dashboard_Derma.md');
const DASH_MD = `---
tipo: dashboard
examen: DERMA
fecha_creacion: ${HOY}
plan_inicio: ${META.inicio}
plan_fin: ${META.fin}
atomos: ${DIAS.length}
---

# 🧴 Dashboard · Dermatología (PLAN ÉLITE v2 → dermatología estética)

> [!abstract] ${DIAS.length} átomos · ${META.inicio} → ${META.fin} · franja ${META.bloque}
> Ciclo de 45′: 1-2 casos CIEGOS (Board Review 200) + ~10Q review + 10′ lectura. Método Palmerton en 4 pasos
> (① morfología → ② ddx de 3 → ③ viñeta → ④ discusión → tarjetas de MECANISMO + oclusión). Fuente: \`src/lib/dermaDailyPlan.ts\`.
> Cuaderno NotebookLM "DERMA · Élite Engine" (ver \`DATA/DERMATOLOGIA/recursos.md\`) · Norte: \`DATA/DERMATOLOGIA/RUTA_FELLOWSHIP_ESTETICO.md\`.

> [!tip]- 📚 Bloques (A-H · X estética · Z cierre)
${blockRows}

## 📷 Paso ①
> - [[${RAMA}/90_DICTADOS_MORFOLOGIA/_plantilla_dictado|Plantilla de dictado morfológico (8 ejes)]]

## 🔬 Puente con Research (SR-1 · L4 complicaciones vasculares de fillers)
> - [[${SR1_HOJA}|SR-1 · hoja de ruta]] ← átomos ${[...SR1_D].sort((a, b) => a - b).map((x) => `d${x}`).join(' · ')}${SR2_D.size ? `
> - SR-2 (L5 · fototipos IV-VI) ← átomos ${[...SR2_D].sort((a, b) => a - b).map((x) => `d${x}`).join(' · ')}` : ''}

## 📊 APEX recientes (rama derma)
\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado", file.folder AS "Carpeta"
FROM "${RAMA}"
WHERE contains(file.folder, "APEX_creados")
SORT file.cday DESC
LIMIT 25
\`\`\`

## ✅ Mastery gate (notas madre con estado ≠ vacio)
\`\`\`dataview
TABLE WITHOUT ID file.link AS "Átomo", bloque AS "Bloque", fecha_plan AS "Sesión", estado AS "Estado", modulo_core_fallos AS "Fallos CORE"
FROM "${RAMA}"
WHERE tipo = "concepto_madre" AND estado != "vacio"
SORT fecha_plan ASC
\`\`\`
`;
if (process.argv.includes('--rewrite-dashboard') && fs.existsSync(DASH_PATH)) { if (WRITE) fs.writeFileSync(DASH_PATH, DASH_MD, 'utf8'); stats.patched++; }
ensureFile(DASH_PATH, DASH_MD);
log(`00_DASHBOARD_DERMA: Dashboard_Derma.md${process.argv.includes('--rewrite-dashboard') ? ' (re-escrito: es 100 % generado)' : ''}`);

/* ════════════ 8 · (opt-in) sección 🧴 en Mapa_Temarios_Trilingue.md ════════════ */
const mapaPath = path.join(VAULT, '00_Dashboard', 'Mapa_Temarios_Trilingue.md');
const DERMA_SECTION = `

## 🧴 DERMATOLOGÍA — PLAN ÉLITE v2 (${DIAS.length} átomos · bloques A-H, X, Z)
> [!info] Rama \`${RAMA}\` · caso ciego + Cerebro Clínico de 7 pasos. Dashboard: [[${RAMA}/00_DASHBOARD_DERMA/Dashboard_Derma|🧴 Dashboard Derma]]
${BLOQUES.map((b) => `- [[${DERMA_OBS_BLOCK[b.k]}|${b.k} · ${b.nombre}]] · ${porBloque[b.k].length} átomos`).join('\n')}
`;
if (PATCH_MAPA) {
  if (fs.existsSync(mapaPath)) {
    const cur = fs.readFileSync(mapaPath, 'utf8');
    if (cur.includes('🧴 DERMATOLOGÍA — PLAN ÉLITE')) { stats.skipped++; log('Mapa_Temarios_Trilingue: sección DERMA ya presente (intacto)'); }
    else { if (WRITE) fs.appendFileSync(mapaPath, DERMA_SECTION, 'utf8'); stats.patched++; log(`Mapa_Temarios_Trilingue: sección DERMA ${WRITE ? 'añadida' : '(dry-run, se añadiría)'}`); }
  } else stats.problems.push('Mapa_Temarios_Trilingue.md no existe');
} else log('Mapa_Temarios_Trilingue: NO tocado (usa --patch-mapa para añadir la sección 🧴)');

/* ════════════ 9 · Emitir src/lib/obsidianDermaMap.ts ════════════ */
const out = `/**
 * obsidianDermaMap.ts — GENERADO por DATA/_scripts/build_vault_derma.js (${HOY}).
 * Deep-links obsidian:// hacia la rama "${RAMA}" del vault "Vault_Medicina MIR_Joseph".
 * NO editar a mano: regenerar con el script. Reutiliza obsUrl() de obsidianMap.ts.
 *
 *  · átomos 1-${DIAS.length} (dermaDailyPlan.ts) → nota _concepto_madre del átomo (7 pasos del Cerebro Clínico)
 *  · bloques A-H, X, Z            → _indice del bloque
 *  · dashboard                    → 00_DASHBOARD_DERMA/Dashboard_Derma
 */
import { obsUrl } from './obsidianMap';
import type { DermaBloqueKey } from './dermaDailyPlan';

/** Átomo del plan (d 1-${DIAS.length}) → ruta de la nota madre (sin .md) */
export const DERMA_OBS_DAY: Record<number, string> = ${JSON.stringify(DERMA_OBS_DAY)};
export const dermaObsUrlDay = (d: number): string | null => {
  const p = DERMA_OBS_DAY[d]; return p ? obsUrl(p) : null;
};

/** Bloque (A…Z) → ruta del índice del bloque (sin .md) */
export const DERMA_OBS_BLOCK: Record<DermaBloqueKey, string> = ${JSON.stringify(DERMA_OBS_BLOCK)};
export const dermaObsUrlBlock = (bKey: DermaBloqueKey): string | null => {
  const p = DERMA_OBS_BLOCK[bKey]; return p ? obsUrl(p) : null;
};

/** Plantilla del dictado morfológico (paso ① del caso ciego) */
export const OBS_DERMA_DICTADO_URL = obsUrl('${RAMA}/90_DICTADOS_MORFOLOGIA/_plantilla_dictado');

/** Dashboard de la rama de dermatología */
export const OBS_DERMA_DASHBOARD_URL = obsUrl('${RAMA}/00_DASHBOARD_DERMA/Dashboard_Derma');
`;
const mapPath = path.join(APP, 'src/lib/obsidianDermaMap.ts');
if (WRITE) fs.writeFileSync(mapPath, out, 'utf8');
log(`\nobsidianDermaMap.ts ${WRITE ? 'escrito' : '(dry-run)'} · días=${Object.keys(DERMA_OBS_DAY).length} · bloques=${Object.keys(DERMA_OBS_BLOCK).length}`);
if (process.argv.includes('--huerfanas')) {
  const enMapa = new Set(Object.values(DERMA_OBS_DAY).map((p) => p.replace(/\/_concepto_madre$/, '')));
  const huerfanas = [];
  for (const b of BLOQUES) {
    const bAbs = path.join(VAULT, RAMA, blkFolder[b.k]);
    if (!fs.existsSync(bAbs)) continue;
    for (const f of fs.readdirSync(bAbs)) {
      if (!/^d\d\d_/.test(f) || !fs.statSync(path.join(bAbs, f)).isDirectory()) continue;
      const rel = `${RAMA}/${blkFolder[b.k]}/${f}`;
      if (!enMapa.has(rel)) huerfanas.push(rel);
    }
  }
  log(`
Carpetas huérfanas (slug antiguo, fuera del mapa): ${huerfanas.length}`);
  huerfanas.forEach((h) => log('  - ' + h + '  (mover a mano sus notas trabajadas; el builder no borra)'));
}

log(`\n${WRITE ? 'ESCRITO' : 'DRY-RUN'} · dirs nuevos: ${stats.dirs} · files nuevos: ${stats.files} · ya existían (intactos): ${stats.skipped} · parches: ${stats.patched}`);
if (stats.problems.length) { log('\n⚠ PROBLEMAS:'); stats.problems.forEach((p) => log('  - ' + p)); }
