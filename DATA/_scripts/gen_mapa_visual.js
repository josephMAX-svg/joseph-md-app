// gen_mapa_visual.js — regenera 00_Dashboard/Mapa_Temarios_Trilingue.md con GRÁFICOS:
// pie Mermaid (subtemas por examen), flowchart del motor APEX, barras <progress> con
// la cobertura REAL de APEX (subtemas con ≥1 nota en APEX_creados / total) y los links.
// Idempotente: sobreescribe SOLO el Mapa (archivo generado nuestro).
const fs = require('fs');
const path = require('path');
const V = 'D:/JOSEPH/Vault_Medicina MIR_Joseph';

const isDir = (p) => { try { return fs.statSync(p).isDirectory(); } catch { return false; } };
const mdCount = (p) => { try { return fs.readdirSync(p).filter((f) => f.endsWith('.md')).length; } catch { return 0; } };

/** recorre un árbol examen: subcarpetas con APEX_creados → {total, conApex, porGrupo} */
function scan(base, groupLevel) {
  const out = { total: 0, conApex: 0, grupos: [] };
  if (!isDir(base)) return out;
  for (const g of fs.readdirSync(base)) {
    const gp = path.join(base, g);
    if (!isDir(gp) || g === 'APEX_creados' || g.startsWith('_') || g.startsWith('z_')) continue;
    let gTotal = 0, gApex = 0;
    for (const s of fs.readdirSync(gp)) {
      const sp = path.join(gp, s);
      if (!isDir(sp) || s === 'APEX_creados') continue;
      const ap = path.join(sp, 'APEX_creados');
      if (isDir(ap)) { gTotal++; if (mdCount(ap) > 0) gApex++; }
    }
    if (gTotal > 0) { out.total += gTotal; out.conApex += gApex; out.grupos.push({ g, total: gTotal, apex: gApex }); }
  }
  return out;
}

const mir = scan(path.join(V, '03_MIR'));
const usmle = scan(path.join(V, '01_USMLE', '02_UWORLD_SYSTEMS'));
const encaps = scan(path.join(V, '06_ENCAPS', 'ENCAPS_2026', '02_TEMARIO'));

const pct = (x) => x.total ? Math.round((x.conApex / x.total) * 100) : 0;
const bar = (x) => `<progress value="${x.conApex}" max="${x.total}"></progress> **${x.conApex}/${x.total}** subtemas con APEX (${pct(x)}%)`;
const lista = (x, baseRel, icon) => x.grupos.map((g) => {
  const subs = fs.readdirSync(path.join(V, baseRel, g.g)).filter((s) => isDir(path.join(V, baseRel, g.g, s)) && s !== 'APEX_creados');
  const first = subs.sort()[0];
  const nombre = g.g.replace(/^\d+_/, '').replace(/_/g, ' ');
  const madre = `${baseRel}/${g.g}/${first}/_concepto_madre`;
  return `> ${icon} [[${madre}|${nombre}]] · ${g.total} subtemas${g.apex ? ` · **${g.apex} con APEX**` : ''}`;
}).join('\n');

const md = `---
tipo: mapa_temarios
actualizado: ${new Date().toISOString().slice(0, 10)}
cssclasses: jmd-mapa
---

# 🗺️ Mapa de Temarios Trilingüe

> [!success] Los 3 grandes sistemas, navegables y medibles
> Cada subtema tiene su carpeta con \`_concepto_madre.md\` + \`APEX_creados/\`.
> El motor APEX (Ctrl+Shift+A) sabe exactamente dónde cae cada nota — y este mapa
> muestra la **cobertura real** (subtemas que ya tienen ≥1 APEX).

\`\`\`mermaid
pie showData title Subtemas por examen
    "MIR · ProMIR" : ${mir.total}
    "USMLE · uWorld" : ${usmle.total}
    "ENCAPS · MINSA" : ${encaps.total}
\`\`\`

## 🇪🇸 MIR — ProMIR (${mir.grupos.length} asignaturas)

${bar(mir)}

> [!note]- Asignaturas (toca para desplegar)
${lista(mir, '03_MIR', '🫀')}

## 🇺🇸 USMLE — uWorld Step 1 (${usmle.grupos.length} sistemas)

${bar(usmle)}

> [!tip]- Sistemas (toca para desplegar)
${lista(usmle, '01_USMLE/02_UWORLD_SYSTEMS', '🧬')}

## 🇵🇪 ENCAPS — 5 bloques oficiales

${bar(encaps)}

> [!info]- Bloques (toca para desplegar)
${lista(encaps, '06_ENCAPS/ENCAPS_2026/02_TEMARIO', '🏥')}

## ⚙️ Cómo fluye un APEX (motor)

\`\`\`mermaid
flowchart LR
    A[📚 Estudias el tema] --> B[💬 Chat tutor genera<br/>BLOQUE APEX]
    B --> C[✂️ Copias + Ctrl+Shift+A]
    C --> D{n8n parser}
    D --> E[🗂️ Anki<br/>sub-deck exacto]
    D --> F[💎 Obsidian<br/>carpeta del subtema]
    D --> G[📝 Notion]
    D --> H[🗄️ Supabase<br/>→ app Joseph MD]
    style A fill:#1a2436,stroke:#D9BE8A,color:#E8D5A8
    style D fill:#2A2517,stroke:#D9BE8A,color:#E8D5A8
    style F fill:#1f2a1f,stroke:#9DB07F,color:#E8D5A8
\`\`\`

## 📊 APEX recientes (todo el vault)

\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado", file.folder AS "Carpeta"
FROM "01_USMLE" OR "03_MIR" OR "06_ENCAPS"
WHERE contains(file.folder, "APEX_creados")
SORT file.cday DESC
LIMIT 25
\`\`\`

---
*Regenerar este mapa: \`node DATA/_scripts/gen_mapa_visual.js\` (joseph-md-app). Las barras se recalculan con los APEX reales del vault.*
`;

fs.writeFileSync(path.join(V, '00_Dashboard', 'Mapa_Temarios_Trilingue.md'), md, 'utf8');
console.log(`Mapa regenerado · MIR ${mir.conApex}/${mir.total} · USMLE ${usmle.conApex}/${usmle.total} · ENCAPS ${encaps.conApex}/${encaps.total}`);
