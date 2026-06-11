/**
 * check_obsidian_links.js — verifica que TODOS los links ◆ Obsidian de la app
 * apunten a notas REALES del vault (filesystem). Cubre: obsidianMap.ts (MIR/USMLE/
 * ENCAPS, 412 paths), obsidianResearchMap.ts, obsidianVaultMap.ts (SYNAPSE 82 +
 * Empresa + VITALS) y la resolución difusa de los bloques A del plan SYNAPSE.
 * Uso: node DATA/_scripts/check_obsidian_links.js
 */
const fs = require('fs');
const path = require('path');
const V = 'D:/JOSEPH/Vault_Medicina MIR_Joseph';
const APP = path.join(__dirname, '..', '..');

let total = 0, rotos = [];
function checkFile(lib) {
  const s = fs.readFileSync(path.join(APP, 'src/lib', lib), 'utf8');
  const paths = [...new Set([...s.matchAll(/['"]((?:0|9)\d_[^'"\n]{5,})['"]/g)].map((m) => m[1]))];
  let ok = 0;
  for (const p of paths) {
    total++;
    const md = path.join(V, p + '.md');
    const dir = path.join(V, p);
    if (fs.existsSync(md) || fs.existsSync(dir)) ok++;
    else rotos.push(`${lib}: ${p}`);
  }
  console.log(`${lib}: ${ok}/${paths.length} paths OK`);
}
['obsidianMap.ts', 'obsidianResearchMap.ts', 'obsidianVaultMap.ts'].forEach(checkFile);

// resolución difusa: cada bloque A/B/C del plan SYNAPSE debe encontrar su nota
const vm = fs.readFileSync(path.join(APP, 'src/lib/obsidianVaultMap.ts'), 'utf8');
const MAT = {};
for (const m of vm.matchAll(/^  ("(?:[^"\\]|\\.)*"): ("05_SYNAPSE_IA[^"]+"),$/gm)) MAT[JSON.parse(m[1])] = JSON.parse(m[2]);
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
const IDX = Object.entries(MAT).map(([n, p]) => [norm(n), p]);
// ⚠️ mantener en sync con el ALIAS del generador (build_vault_jmd_sync.js)
const ALIAS = [
  [/^cs50p/i, 'CS50P: Introduction to Programming with Python'],
  [/^pro git/i, 'Pro Git (2ª ed.)'],
  [/the batch/i, 'The Batch (newsletter semanal)'],
  [/^simon willison$/i, 'Serie "Prompt injection" (2022-2025)'],
  [/intro to llms/i, '[1hr Talk] Intro to Large Language Models'],
  [/deep dive/i, 'Deep Dive into LLMs like ChatGPT'],
  [/many-?shot/i, 'Many-shot jailbreaking (research)'],
  [/constitutional classifiers/i, 'Constitutional Classifiers (research)'],
  [/responsible scaling|\basl\b/i, 'Responsible Scaling Policy (ASL levels)'],
  [/lethal trifecta/i, 'The lethal trifecta for AI agents'],
  [/canal anthropic/i, 'Canal oficial de Anthropic (YouTube)'],
  [/python tutorial/i, 'The Python Tutorial (docs oficiales)'],
  [/automate the boring/i, 'Automate the Boring Stuff with Python (3ª ed.)'],
];
function fuzzy(q0) {
  const q = norm(q0);
  if (!q) return null;
  const hit = IDX.find(([n]) => n === q) || IDX.find(([n]) => n.startsWith(q) || q.startsWith(n));
  if (hit) return hit[1];
  const qt = new Set(q.split(' ').filter((t) => t.length > 3));
  if (!qt.size) return null;
  let best = null;
  for (const [n, p] of IDX) {
    const inter = n.split(' ').filter((t) => qt.has(t)).length;
    const score = inter / Math.max(qt.size, 1);
    if (score >= 0.6 && (!best || score > best[0])) best = [score, p];
  }
  return best ? best[1] : null;
}
function synObsPath(material, leccion = '') {
  if (MAT[material]) return MAT[material];
  const ctx = material + ' ' + leccion;
  for (const [re, nombre] of ALIAS) if (re.test(ctx) && MAT[nombre]) return MAT[nombre];
  return fuzzy(material) || (leccion ? fuzzy(leccion) : null);
}
const plan = fs.readFileSync(path.join(APP, 'src/lib/synapseDailyPlan.ts'), 'utf8');
const pares = [...plan.matchAll(/material:"((?:[^"\\]|\\.)*)",leccion:"((?:[^"\\]|\\.)*)"/g)]
  .map((m) => [m[1].replace(/\\"/g, '"'), m[2].replace(/\\"/g, '"')]);
const vistos = new Map();
for (const [mat, lec] of pares) if (!vistos.has(mat)) vistos.set(mat, synObsPath(mat, lec));
const res = [...vistos.values()].filter(Boolean).length;
const sinNota = [...vistos.entries()].filter(([, v]) => !v).map(([k]) => k);
console.log(`SYNAPSE plan: ${res}/${vistos.size} materiales únicos resuelven a una nota del vault`);
if (sinNota.length) console.log('  sin nota (esperado SOLO genéricos: comodín/repaso/setup/proyecto/cierre):\n  - ' + sinNota.join('\n  - '));

console.log(rotos.length ? `\n❌ ROTOS (${rotos.length}):\n` + rotos.join('\n') : `\n✅ ${total} paths de la app verificados contra el vault — 0 rotos.`);
process.exit(rotos.length ? 1 : 0);
