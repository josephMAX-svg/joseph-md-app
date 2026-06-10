/**
 * gen_synapse_md.js — genera DATA/SYNAPSE/materiales-verificados.md desde
 * DATA/SYNAPSE/_raw_findings.json (output del workflow de investigación, 10-jun-2026).
 * Uso: node DATA/_scripts/gen_synapse_md.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'SYNAPSE');
const raw = JSON.parse(fs.readFileSync(path.join(root, '_raw_findings.json'), 'utf8'));
const r = raw.result;

const TITULOS = {
  anthropic: '🏛 La Escuela de Anthropic (Academy, GitHub, Agent SDK, Fellows)',
  fundamentos: '🧠 Fundamentos (Karpathy, 3Blue1Brown, CS50, MIT, fast.ai, Stanford)',
  'python-data': '🐍 Python & Data Science (creadores de las herramientas)',
  'agentes-llm': '🤖 Agentes, LLMs y workflows (el corazón)',
  ciberseguridad: '🛡 Ciberseguridad (web clásica → seguridad de IA)',
  'audio-podcasts': '🎧 Audio/vídeo para espacios muertos (podcasts y canales)',
};

let md = `# SYNAPSE — materiales verificados (fuente maestra)

> Generado desde \`_raw_findings.json\` (workflow de 13 agentes, 10-jun-2026: 6 frentes de
> investigación + verificación adversarial de CADA URL con WebFetch/oEmbed + crítico de
> completitud). **Cero URLs inventadas.** La selección curada que muestra la app vive en
> \`src/lib/synapseData.ts\`. Regenerar este MD: \`node DATA/_scripts/gen_synapse_md.js\`.

`;

let total = 0;
for (const f of r.frentes) {
  md += `\n## ${TITULOS[f.frente] || f.frente}\n\n`;
  md += `| Material | Referente (credencial) | Tipo | Gratis | Nivel | Huecos 10-15' | Por qué |\n`;
  md += `|---|---|---|---|---|---|---|\n`;
  for (const m of f.materiales) {
    total++;
    const esc = (s) => String(s || '').replace(/\|/g, '·').replace(/\n/g, ' ');
    md += `| [${esc(m.nombre)}](${m.url}) | ${esc(m.referente)} — ${esc(m.credencial)} | ${esc(m.tipo)} | ${esc(m.gratis)} | ${esc(m.nivel)} | ${esc(m.formato_espacios_muertos || '—')} | ${esc(m.por_que)} |\n`;
  }
  if (f.notas) md += `\n**Notas del frente:** ${f.notas.replace(/\n+/g, ' ')}\n`;
}

md += `\n## 🔧 Huecos detectados por el crítico de completitud (los 8 añadidos)\n\n`;
md += `| Tema faltante | Material añadido | Referente | Gratis | Por qué importa |\n|---|---|---|---|---|\n`;
for (const h of r.huecos || []) {
  const esc = (s) => String(s || '').replace(/\|/g, '·').replace(/\n/g, ' ');
  md += `| ${esc(h.tema_faltante)} | [${esc(h.material_sugerido).slice(0, 90)}](${h.url}) | ${esc(h.referente)} | ${esc(h.gratis)} | ${esc(h.por_que_importa)} |\n`;
  total++;
}

md += `\n## ⚖️ Veredicto del auditor\n\n> ${(r.veredicto || '').replace(/\n+/g, ' ')}\n`;
md += `\n---\n**Total: ${total} materiales con URL verificada.**\n`;

fs.writeFileSync(path.join(root, 'materiales-verificados.md'), md, 'utf8');
console.log(`OK → DATA/SYNAPSE/materiales-verificados.md (${total} materiales)`);
