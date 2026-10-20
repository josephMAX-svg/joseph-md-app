/**
 * ensure_vault_entregables.js — crea en el vault las notas `_README` de 03_ENTREGABLES que enlaza la app (◆ Obsidian de los átomos de
 * Research: TESIS_L0 · CARTA_1 · CASE_REPORT_1 · CASE_REPORT_2 · MENTORES · BIBLIOMETRICO_1) y que no existían (check_obsidian_links.js:
 * 6 ROTOS el 20-oct-2026; el primer átomo que los abre es M1, mié 28-oct).
 *   node DATA/_scripts/ensure_vault_entregables.js          (dry-run: solo informa)
 *   node DATA/_scripts/ensure_vault_entregables.js --write  (crea las que falten)
 * Reglas (las de build_vault_research.js): idempotente · NUNCA sobreescribe ni borra · datos REALES de src/lib (RESEARCH_OBS_ENTREGABLE +
 * RESEARCH_OBS_DAY de obsidianResearchMap.ts, átomos de researchDailyPlan.ts / researchDailyPlan2027.ts). No toca obsidianResearchMap.ts
 * (lo genera gen_research_plan.js) — por eso es un script aparte y no un --write de build_vault_research.js, que reescribiría el mapa.
 * El contenido es un índice: qué entregable es, qué átomos del plan aterrizan aquí (código · fecha · objetivo) y dónde vive el material en el
 * repo. Nada personal en este script (el vault es local).
 * v6.03 (20-oct-2026, verificación de contenido y enlaces): nuevo.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { cargarModuloTS } = require('./usmle/cargar_ts');

const VAULT = 'D:/JOSEPH/Vault_Medicina MIR_Joseph';
const WRITE = process.argv.includes('--write');
const GH = 'https://github.com/josephMAX-svg/joseph-md-app/blob/master/';
const cache = new Map();
const MAP = cargarModuloTS(path.join('src', 'lib', 'obsidianResearchMap.ts'), cache);
const R1 = cargarModuloTS(path.join('src', 'lib', 'researchDailyPlan.ts'), cache);
const R2 = cargarModuloTS(path.join('src', 'lib', 'researchDailyPlan2027.ts'), cache);
const TODOS = [...R1.DIAS, ...R2.DIAS_2027];

/** Material del repo por entregable (carpetas/ficheros que existen en DATA/RESEARCH). */
const REPO = {
  TESIS_L0: ['DATA/RESEARCH/TESIS_L0/'], CARTA_1: ['DATA/RESEARCH/CARTA_1/candidatos.md'], CASE_REPORT_1: ['DATA/RESEARCH/CASE_REPORT_1/'],
  CASE_REPORT_2: [], MENTORES: ['DATA/RESEARCH/MENTORES.md'], BIBLIOMETRICO_1: [],
};
const TITULO = {
  TESIS_L0: 'Tesis → research letter (L0)', CARTA_1: 'Carta al editor #1', CASE_REPORT_1: 'Case report #1', CASE_REPORT_2: 'Case report #2',
  MENTORES: 'Mentores y red (cold emails, coautorías)', BIBLIOMETRICO_1: 'Bibliométrico #1',
};

let creadas = 0, existian = 0;
for (const [clave, rel] of Object.entries(MAP.RESEARCH_OBS_ENTREGABLE)) {
  if (!/\/03_ENTREGABLES\/[^/]+\/_README$/.test(rel)) continue;
  const carpeta = rel.split('/')[2];
  const abs = path.join(VAULT, rel + '.md');
  if (fs.existsSync(abs)) { existian++; continue; }
  const atomos = TODOS.filter((x) => MAP.RESEARCH_OBS_DAY[x.d] === rel).sort((a, b) => a.fecha.localeCompare(b.fecha));
  const repo = (REPO[carpeta] || []).filter((p) => fs.existsSync(path.join(__dirname, '..', '..', p.replace(/\/$/, ''))));
  const md = [
    '---', 'tipo: entregable_research', `entregable: ${clave}`, 'estado: en curso', '---', '',
    `# ${TITULO[carpeta] || carpeta}`, '',
    `> Nota índice del entregable (la abre el botón ◆ Obsidian de sus átomos en Joseph MD). Debajo, tus borradores, decisiones y enlaces.`, '',
    '## Átomos del plan que aterrizan aquí', '',
    ...(atomos.length ? atomos.map((x) => `- [ ] **${x.code}** · ${x.fecha} — ${x.objetivo.replace(/\s+/g, ' ').slice(0, 160)}`) : ['- (ninguno en el plan vigente)']), '',
    '## Material en el repo', '',
    ...(repo.length ? repo.map((p) => `- ${GH}${p}`) : ['- (todavía sin carpeta en DATA/RESEARCH)']), '',
    '## Notas', '', '',
  ].join('\n');
  console.log(`${WRITE ? '✓ creo' : '· crearía'} ${rel}.md (${atomos.length} átomos)`);
  if (WRITE) { fs.mkdirSync(path.dirname(abs), { recursive: true }); fs.writeFileSync(abs, md, 'utf8'); }
  creadas++;
}
console.log(`${WRITE ? 'ESCRITO' : 'DRY-RUN'} · nuevas: ${creadas} · ya existían (intactas): ${existian}`);
