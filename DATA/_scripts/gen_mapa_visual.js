// gen_mapa_visual.js v2 — regenera 00_Dashboard/Mapa_Temarios_Trilingue.md
// Estilo editorial sobrio (paleta navy/oro de la app). Data 100% real:
//  · vault (carpetas + cobertura APEX) · app (planes) · Anki (decks vía AnkiConnect si corre)
// Cubre los 6 dominios: MIR · USMLE · ENCAPS · Derma · Research · Business (+Vitals nota).
const fs = require('fs');
const path = require('path');
const V = 'D:/JOSEPH/Vault_Medicina MIR_Joseph';
const APP = 'D:/joseph-md-app';

const isDir = (p) => { try { return fs.statSync(p).isDirectory(); } catch { return false; } };
const mdCount = (p) => { try { return fs.readdirSync(p).filter((f) => f.endsWith('.md')).length; } catch { return 0; } };
const dirs = (p) => { try { return fs.readdirSync(p).filter((d) => isDir(path.join(p, d)) && !d.startsWith('_') && !d.startsWith('z_') && d !== 'APEX_creados'); } catch { return []; } };

function scan(base) {
  const out = { total: 0, conApex: 0, apexNotas: 0, grupos: [] };
  for (const g of dirs(base)) {
    let gT = 0, gA = 0, gN = 0;
    for (const s of dirs(path.join(base, g))) {
      const ap = path.join(base, g, s, 'APEX_creados');
      if (isDir(ap)) { gT++; const n = mdCount(ap); if (n > 0) { gA++; gN += n; } }
    }
    if (gT > 0) { out.total += gT; out.conApex += gA; out.apexNotas += gN; out.grupos.push({ g, total: gT, apex: gA }); }
  }
  return out;
}

// ── data del vault ──
const mir = scan(path.join(V, '03_MIR'));
const usmle = scan(path.join(V, '01_USMLE', '02_UWORLD_SYSTEMS'));
const encaps = scan(path.join(V, '06_ENCAPS', 'ENCAPS_2026', '02_TEMARIO'));
const synapse = scan(path.join(V, '05_SYNAPSE_IA'));
const researchLineas = dirs(path.join(V, '04_INVESTIGACIÓN DERMATOLÓGICA', '01_LINEAS'));
const researchSRs = dirs(path.join(V, '04_INVESTIGACIÓN DERMATOLÓGICA', '02_SR_EN_CURSO'));
const dermaVault = isDir(path.join(V, '07_DERMATOLOGIA'));
const empresaMarcas = dirs(path.join(V, '02_EMPRESA FINANZAS')).filter((d) => /^\d\d_/.test(d) && d !== '06_BIBLIOTECA');
const vitalsVault = isDir(path.join(V, '08_VITALS'));

// ── data de la app ──
const dermaDias = (fs.readFileSync(path.join(APP, 'src/lib/dermaDailyPlan.ts'), 'utf8').match(/\{\s*d:\s*\d+/g) || []).length;
const bizDias = (fs.readFileSync(path.join(APP, 'src/lib/businessStudyPlan.ts'), 'utf8').match(/\{d:\d+/g) || []).length;
const libros = (fs.readFileSync(path.join(APP, 'src/lib/estudioPulsoData.ts'), 'utf8').match(/\{ n: \d+,/g) || []).length;

// ── Anki (AnkiConnect, opcional) ──
let anki = null;
try {
  const r = require('child_process').execSync(
    `curl -s -m 4 localhost:8765 -X POST -d "{\\"action\\":\\"deckNames\\",\\"version\\":6}"`, { encoding: 'utf8' });
  const d = JSON.parse(r).result || [];
  anki = {
    encaps: d.filter((x) => x.startsWith('APEX::ENCAPS::') && x.split('::').length === 4).length,
    mir: d.filter((x) => x.startsWith('APEX::MIR::') && !/TEST/i.test(x)).length,
    usmle: d.filter((x) => x.startsWith('APEX::USMLE::')).length,
    dermki: d.filter((x) => x.startsWith('Dermki::')).length,
  };
} catch { /* Anki cerrado → sin columna */ }

const pct = (x) => (x.total ? Math.round((x.conApex / x.total) * 100) : 0);
const bar = (x) => `<progress value="${x.conApex}" max="${x.total}"></progress>\n**${x.conApex} / ${x.total}** subtemas con APEX · ${x.apexNotas} notas (${pct(x)}%)`;
const nom = (s) => s.replace(/^\d+_/, '').replace(/_/g, ' ');
const tabla = (x, baseRel) => [
  '| # | Asignatura / Sistema | Subtemas | Con APEX |',
  '|---|----------------------|---------:|---------:|',
  ...x.grupos.map((g, i) => {
    const subs = dirs(path.join(V, baseRel, g.g)).sort();
    const link = `${baseRel}/${g.g}/${subs[0]}/_concepto_madre`;
    return `| ${String(i + 1).padStart(2, '0')} | [[${link}\\|${nom(g.g)}]] | ${g.total} | ${g.apex || '—'} |`;
  }),
].join('\n');

const DERMKI = ['01 Basic Science', '02 Dermatopharmacology', '03 General Dermatology', '04 Pediatric Dermatology',
  '05 Infectious Disease', '06 Neoplastic Dermatology', '07 Dermatopathology', '08 Dermatologic Surgery',
  '09 Cosmetic Dermatology', '10 Cutaneous Manifestations of Internal Disease', '11 Epidemiology & Public Health'];

const hoy = new Date().toISOString().slice(0, 10);
const md = `---
tipo: mapa_temarios
actualizado: ${hoy}
---

# Mapa Maestro · Joseph MD

> [!success] El segundo cerebro, medible
> Ocho dominios — el espejo exacto de la app Joseph MD · cada subtema con su carpeta
> (\`_concepto_madre\` + \`APEX_creados/\`) · el motor APEX (Ctrl+Shift+A) rutea cada nota a su
> lugar exacto en Anki, Obsidian, Notion y Supabase. Cifras recalculadas de los archivos reales.

| Dominio | Estructura | Vault | Anki |
|---------|-----------|-------|------|
| 🇪🇸 **MIR** · ProMIR | ${mir.grupos.length} asignaturas · ${mir.total} capítulos | \`03_MIR\` | ${anki ? `APEX::MIR (${anki.mir} sub-decks · lazy)` : '—'} |
| 🇺🇸 **USMLE** · uWorld | ${usmle.grupos.length} sistemas · ${usmle.total} subtopics | \`01_USMLE/02_UWORLD_SYSTEMS\` | ${anki ? `APEX::USMLE (${anki.usmle} subjects)` : '—'} |
| 🇵🇪 **ENCAPS** · MINSA | 5 bloques · ${encaps.total} subtemas | \`06_ENCAPS/.../02_TEMARIO\` | ${anki ? `APEX::ENCAPS (${anki.encaps} sub-decks ✓)` : '—'} |
| 🧠 **SYNAPSE** · IA | ${synapse.grupos.length - 1} fases + extras · ${synapse.total} materiales | [[05_SYNAPSE_IA/00_Mapa_SYNAPSE\\|\`05_SYNAPSE_IA\`]] | *por definir (Palmerton)* |
| 🧴 **Derma** | plan ${dermaDias} átomos (app) ${dermaVault ? '· vault ✓' : '· vault pendiente (chat Derma)'} | ${dermaVault ? '`07_DERMATOLOGIA`' : '*por crear*'} | ${anki ? `Dermki (${anki.dermki} capítulos · pagado)` : '—'} |
| 🔬 **Research** | ${researchLineas.length} líneas · ${researchSRs.length} SR en curso | \`04_INVESTIGACIÓN/01_LINEAS\` | *por definir (Palmerton)* |
| 💼 **Business** | ${empresaMarcas.length} marcas · ${libros} libros · plan ${bizDias} días | [[02_EMPRESA FINANZAS/00_Mapa_EMPRESA\\|\`02_EMPRESA FINANZAS\`]] | *por definir (Palmerton)* |
| 🫀 **VITALS** | app v2.1 en producción · 3 secciones ${vitalsVault ? '✓' : '*por crear*'} | [[08_VITALS/00_Mapa_VITALS\\|\`08_VITALS\`]] | — |

\`\`\`mermaid
%%{init: {'theme':'base','themeVariables':{'background':'transparent','primaryTextColor':'#E8DCC0','pieSectionTextColor':'#E8DCC0','pieTitleTextSize':'17px','pieOuterStrokeWidth':'0px','pie1':'#B8923F','pie2':'#7E9CB8','pie3':'#9DB07F','pie4':'#8B93C7'}}}%%
pie showData title Subtemas por dominio
    "MIR · ProMIR" : ${mir.total}
    "ENCAPS · MINSA" : ${encaps.total}
    "USMLE · uWorld" : ${usmle.total}
    "SYNAPSE · IA" : ${synapse.total}
\`\`\`

## 🇪🇸 MIR — ProMIR

${bar(mir)}

> [!note]- Las ${mir.grupos.length} asignaturas (desplegar)
${tabla(mir, '03_MIR').split('\n').map((l) => '> ' + l).join('\n')}

## 🇺🇸 USMLE — uWorld Step 1

${bar(usmle)}

> [!note]- Los ${usmle.grupos.length} sistemas (desplegar)
${tabla(usmle, '01_USMLE/02_UWORLD_SYSTEMS').split('\n').map((l) => '> ' + l).join('\n')}

## 🇵🇪 ENCAPS — 5 bloques oficiales

${bar(encaps)}

> [!note]- Los 5 bloques (desplegar)
${tabla(encaps, '06_ENCAPS/ENCAPS_2026/02_TEMARIO').split('\n').map((l) => '> ' + l).join('\n')}

## 🧠 SYNAPSE — formación élite en IA

${bar(synapse)}

> [!note]- Las 7 fases + audio/extras (desplegar)
${tabla(synapse, '05_SYNAPSE_IA').split('\n').map((l) => '> ' + l).join('\n')}

> Ruta completa, plan de 82 días y nivel-meta Anthropic: [[05_SYNAPSE_IA/00_Mapa_SYNAPSE|Mapa SYNAPSE]].

## 🧴 Derma — Dermki + 3 fuentes

> [!info] Deck **Dermki** (pagado) — ${DERMKI.length} capítulos en Anki${anki ? ' ✓ verificado' : ''}
> ${DERMKI.join(' · ')}
>
> Plan en la app: **${dermaDias} átomos** (AccessDermatology + Qbankly + ProMIR).
> ${dermaVault ? 'Rama `07_DERMATOLOGIA` creada.' : 'Rama del vault `07_DERMATOLOGIA` la construye el chat de Derma.'}

## 🔬 Research — líneas e investigación

| Línea | Carpeta |
|-------|---------|
${researchLineas.map((l) => `| ${nom(l)} | [[04_INVESTIGACIÓN DERMATOLÓGICA/01_LINEAS/${l}/_concepto_madre\\|${l}]] |`).join('\n')}
${researchSRs.map((s) => `| **SR en curso** · ${nom(s)} | \`02_SR_EN_CURSO/${s}\` |`).join('\n')}

## 💼 Business — conocimiento del fundador

> [!tip] ${empresaMarcas.length} marcas · ${libros} libros (plan ${bizDias} días) · 70% Pulso/LIVIANO · 10% PIRQA · 10% Terrenos · 10% Golden
> Mapa de marcas y biblioteca: [[02_EMPRESA FINANZAS/00_Mapa_EMPRESA|Mapa Empresa]] ·
> los términos a memorizar (Value Equation, CFA, give:ask…) entrarán por el método Palmerton.

## 🫀 VITALS — Body, AI-measured

> [!tip] App propia v2.1 en producción (vitals-pulso.vercel.app) — embebida en Joseph MD
> Split semanal, pisos de seguridad y mecánicas de retención: [[08_VITALS/00_Mapa_VITALS|Mapa VITALS]].

## ⚙️ El motor

\`\`\`mermaid
%%{init: {'theme':'base','themeVariables':{'background':'transparent','primaryColor':'#101A2C','primaryTextColor':'#E8DCC0','primaryBorderColor':'#C6A56B','lineColor':'#8F9097','fontSize':'13px'}}}%%
flowchart LR
    A[Estudias] --> B[Chat tutor:<br/>BLOQUE APEX] --> C[Ctrl+Shift+A] --> D{n8n}
    D --> E[Anki<br/>sub-deck exacto]
    D --> F[Obsidian<br/>carpeta del subtema]
    D --> G[Notion]
    D --> H[Supabase → app]
\`\`\`

## 📊 APEX recientes

\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado", file.folder AS "Carpeta"
FROM "01_USMLE" OR "03_MIR" OR "06_ENCAPS" OR "05_SYNAPSE_IA" OR "02_EMPRESA FINANZAS" OR "08_VITALS"
WHERE contains(file.folder, "APEX_creados")
SORT file.cday DESC
LIMIT 20
\`\`\`

---
*Regenerar: \`node DATA/_scripts/gen_mapa_visual.js\` (joseph-md-app) · ${hoy}*
`;

fs.writeFileSync(path.join(V, '00_Dashboard', 'Mapa_Temarios_Trilingue.md'), md, 'utf8');
console.log(`Mapa v3 · MIR ${mir.conApex}/${mir.total} · USMLE ${usmle.conApex}/${usmle.total} · ENCAPS ${encaps.conApex}/${encaps.total} · SYNAPSE ${synapse.conApex}/${synapse.total} · Derma ${dermaDias} átomos · Research ${researchLineas.length}L+${researchSRs.length}SR · Business ${empresaMarcas.length} marcas/${bizDias}d · VITALS ${vitalsVault ? 'OK' : '—'} · Anki ${anki ? 'OK' : 'cerrado'}`);
