/**
 * build_vault_jmd_sync.js — Sincroniza el vault de Obsidian con la app Joseph MD (10-jun-2026).
 * Idempotente · NUNCA borra (mueve a 99_INBOX) · NUNCA pisa notas con contenido (solo crea lo que falta).
 *
 * Hace:
 *  1. Renombra `05_IA MEDICINA` → `05_SYNAPSE_IA` (conserva las 2 notas legado).
 *  2. Construye la rama SYNAPSE: 7 fases (temas grandes, MISMOS nombres que la app) →
 *     subtemas = materiales (carpeta NN_slug/_concepto_madre.md + APEX_creados/), con el
 *     TEMARIO REAL (lecciones verificadas) desde DATA/SYNAPSE/curricula/_extracted.json,
 *     + 90_AUDIO_Y_EXTRAS (biblioteca no cubierta por fases) + 00_Mapa_SYNAPSE.md.
 *  3. 02_EMPRESA FINANZAS: 00_Mapa_EMPRESA.md + 5 marcas (Pulso/LIVIANO/PIRQA/Terrenos/Golden)
 *     + 06_BIBLIOTECA con los 28 libros reales (estudioPulsoData.ts).
 *  4. Crea 08_VITALS (Mapa + Entrenamiento/Nutrición/Retención).
 *  5. Mueve las notas sueltas de la raíz del vault a 99_INBOX (no se borra nada).
 * Uso: node DATA/_scripts/build_vault_jmd_sync.js [--dry]
 */
const fs = require('fs');
const path = require('path');
const V = 'D:/JOSEPH/Vault_Medicina MIR_Joseph';
const APP = path.join(__dirname, '..', '..');
const DRY = process.argv.includes('--dry');
const HOY = '2026-06-10';

let creados = 0, saltados = 0, movidos = 0;
const mk = (p) => { if (!fs.existsSync(p)) { if (!DRY) fs.mkdirSync(p, { recursive: true }); creados++; } };
const write = (p, s, overwrite = false) => {
  if (fs.existsSync(p) && !overwrite) { saltados++; return; }
  if (!DRY) fs.writeFileSync(p, s, 'utf8');
  creados++;
};
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-zA-Z0-9 ]+/g, ' ').trim().replace(/\s+/g, '_').slice(0, 48);

// ── data de la app: synapseData.ts (eval del objeto M + fases) ──
const sd = fs.readFileSync(path.join(APP, 'src/lib/synapseData.ts'), 'utf8');
const evalBlock = (src, start, endMark) => {
  const i = src.indexOf(start);
  const j = src.indexOf(endMark, i);
  return src.slice(i + start.length, j);
};
const M = eval('({' + evalBlock(sd, 'const M = {', '} satisfies') + '})');
const fasesSrc = evalBlock(sd, 'export const SYNAPSE_FASES: SynapseFase[] = [', '];\n');
const FASES = eval('(function(M){ return [' + fasesSrc.replace(/M\./g, 'M.') + ']; })')(M);
const META = { tesis: (sd.match(/tesis: '([^']+)'/) || [])[1] || '' };

// curricula reales (lecciones verificadas) — match por URL base
const CUR = JSON.parse(fs.readFileSync(path.join(APP, 'DATA/SYNAPSE/curricula/_extracted.json'), 'utf8'));
const curByUrl = {};
for (const c of CUR) if (c.accesible) curByUrl[(c.url || '').replace(/\/$/, '')] = c;
const curriculaDe = (url) => curByUrl[(url || '').split('?')[0].replace(/\/$/, '')];

// ── 1) rename 05_IA MEDICINA → 05_SYNAPSE_IA ──
const OLD05 = path.join(V, '05_IA MEDICINA');
const SYN = path.join(V, '05_SYNAPSE_IA');
if (fs.existsSync(OLD05) && !fs.existsSync(SYN)) {
  if (!DRY) fs.renameSync(OLD05, SYN);
  console.log('renombrado: 05_IA MEDICINA → 05_SYNAPSE_IA (notas legado conservadas)');
} else mk(SYN);

// ── 2) rama SYNAPSE ──
const lecTable = (cur) => {
  if (!cur || !cur.lecciones || !cur.lecciones.length) return '*(temario en el material — sigue el orden del curso)*';
  const rows = cur.lecciones.map((l) => `| ${l.n} | ${l.modulo ? l.modulo + ' · ' : ''}${l.titulo} | ${l.url ? `[abrir](${l.url})` : l.dur ? `\`${l.dur}\`` : '—'} |`);
  return ['| # | Lección (REAL, verificada) | Link |', '|---|----------------------------|------|', ...rows].join('\n');
};
const matNote = (fase, m, nn) => `---
tipo: concepto_madre
examen: SYNAPSE
fase: ${fase.fase}
subtema: ${nn}_${slug(m.nombre)}
referente: "${m.referente}"
url: ${m.url}
gratis: "${m.gratis}"
nivel: ${m.nivel}
fecha_creacion: ${HOY}
estado: vacio
---

# 🧠 ${m.nombre}

> [!info] Nota madre del subtema — **SYNAPSE · ${fase.fase} ${fase.titulo}**
> **${m.referente}** — ${m.credencial}.
> Los APEX expandidos del Tutor caen en \`APEX_creados/\`.
> 🔗 [Abrir material](${m.url}) · 🗺️ [[05_SYNAPSE_IA/00_Mapa_SYNAPSE|Mapa SYNAPSE]] · 🏠 [[00_Dashboard/Home|Home]]

> [!tip] Por qué está en la ruta
> ${m.porQue}.${m.duracion ? ` *(${m.duracion} · ${m.gratis})*` : ''}

## 📚 Temario

${lecTable(curriculaDe(m.url))}

## 🎯 Resumen

*(pendiente — se llena al estudiar)*

## 🔑 Conceptos clave

*(pendiente)*

## ⚠️ CCSN — Confusiones frecuentes

*(pendiente)*

## 🗂️ APEX relacionados

\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado"
FROM "${'05_SYNAPSE_IA'}"
WHERE contains(file.folder, "${nn}_${slug(m.nombre)}/APEX_creados")
SORT file.cday DESC
\`\`\`
`;

const faseNote = (f, dir) => `---
tipo: fase_synapse
fase: ${f.fase}
titulo: "${f.titulo}"
duracion: "${f.duracion}"
estado_app: ${f.estado}
fecha_creacion: ${HOY}
---

# ${f.fase} · ${f.titulo}

> [!abstract] ${f.duracion} — ${f.estado === 'activa' ? '**EMPIEZA AQUÍ**' : f.estado === 'meta' ? '**LA META**' : 'pendiente'}
> ${f.desc}
>
> **Entregable de fase:** ${f.entregable}

| # | Material (subtema) | Referente | Nivel | Gratis |
|---|--------------------|-----------|-------|--------|
${f.materiales.map((m, i) => `| ${String(i + 1).padStart(2, '0')} | [[05_SYNAPSE_IA/${dir}/${String(i + 1).padStart(2, '0')}_${slug(m.nombre)}/_concepto_madre\\|${m.nombre.replace(/\|/g, '·')}]] | ${m.referente} | ${m.nivel} | ${m.gratis} |`).join('\n')}
`;

const faseDirs = [];
const OBS = { fases: {}, materiales: {}, empresa: {}, vitals: {} }; // → src/lib/obsidianVaultMap.ts
FASES.forEach((f) => {
  const dir = `${f.fase}_${slug(f.titulo)}`;
  faseDirs.push({ f, dir });
  OBS.fases[f.fase] = `05_SYNAPSE_IA/${dir}/_fase`;
  const base = path.join(SYN, dir);
  mk(base);
  write(path.join(base, '_fase.md'), faseNote(f, dir));
  f.materiales.forEach((m, i) => {
    const nn = String(i + 1).padStart(2, '0');
    OBS.materiales[m.nombre] = `05_SYNAPSE_IA/${dir}/${nn}_${slug(m.nombre)}/_concepto_madre`;
    const md = path.join(base, `${nn}_${slug(m.nombre)}`);
    mk(md);
    mk(path.join(md, 'APEX_creados'));
    write(path.join(md, '_concepto_madre.md'), matNote(f, m, nn));
  });
});

// 90_AUDIO_Y_EXTRAS: materiales de la biblioteca que no están en ninguna fase
const enFases = new Set(FASES.flatMap((f) => f.materiales.map((m) => m.url + '|' + m.nombre)));
const extras = Object.values(M).filter((m) => !enFases.has(m.url + '|' + m.nombre));
const EXTRA_DIR = path.join(SYN, '90_AUDIO_Y_EXTRAS');
mk(EXTRA_DIR);
const fakeFase = { fase: '90', titulo: 'Audio y extras (espacios muertos)' };
extras.forEach((m, i) => {
  const nn = String(i + 1).padStart(2, '0');
  OBS.materiales[m.nombre] = `05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/${nn}_${slug(m.nombre)}/_concepto_madre`;
  const md = path.join(EXTRA_DIR, `${nn}_${slug(m.nombre)}`);
  mk(md);
  mk(path.join(md, 'APEX_creados'));
  write(path.join(md, '_concepto_madre.md'), matNote(fakeFase, m, nn));
});

// Mapa SYNAPSE (generado: SIEMPRE se regenera)
const planSrc = fs.readFileSync(path.join(APP, 'src/lib/synapseDailyPlan.ts'), 'utf8');
const planMeta = planSrc.match(/inicio: '([\d-]+)', fin: '([\d-]+)', totalDias: (\d+)/);
const mapaSyn = `---
tipo: mapa_synapse
actualizado: ${HOY}
---

# 🧠 SYNAPSE · Mind, AI-engineered

> [!success] Médico → especialista en IA nivel Anthropic
> ${META.tesis}
>
> **Plan día-a-día en la app:** ${planMeta[3]} días (${planMeta[1]} → ${planMeta[2]}) · 30 min/día en
> espacios muertos · dom 14/21-jun LIBRES · pestaña **⚡ Hoy** en Joseph MD → SYNAPSE.

\`\`\`mermaid
%%{init: {'theme':'base','themeVariables':{'background':'transparent','primaryColor':'#101A2C','primaryTextColor':'#E8DCC0','primaryBorderColor':'#818CF8','lineColor':'#8F9097','fontSize':'13px'}}}%%
flowchart LR
    F0[F0 Escuela de<br/>Anthropic] --> F1[F1 Python<br/>terminal·Git] --> F2[F2 Datos<br/>pandas·SQL·prob] --> F3[F3 Deep<br/>Learning]
    F3 --> F4[F4 AGENTES y<br/>WORKFLOWS] --> F5[F5 Ciber-<br/>seguridad] --> F6[F6 Fellows<br/>Program 🏁]
\`\`\`

| Fase | Tema grande | Duración | Subtemas | Entregable |
|------|-------------|----------|---------:|------------|
${faseDirs.map(({ f, dir }) => `| **${f.fase}** | [[05_SYNAPSE_IA/${dir}/_fase\\|${f.titulo}]] | ${f.duracion} | ${f.materiales.length} | ${f.entregable.replace(/\|/g, '·')} |`).join('\n')}
| 90 | [[05_SYNAPSE_IA/90_AUDIO_Y_EXTRAS/01_${slug(extras[0].nombre)}/_concepto_madre\\|Audio y extras]] | siempre | ${extras.length} | huecos de 10-15 min |

> [!note] El nivel meta (verificado en vacantes reales de Anthropic, jun-2026)
> Python sólido = único requisito universal · evals en casi todos los puestos · el Fellows
> NO pide PhD ni papers — pide ejecución (stipend $3,850/sem + ~$15k/mes cómputo).
> Cada fase termina en un **proyecto público en GitHub**: eso consigue la entrevista.

## 📊 APEX recientes (IA)

\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado", file.folder AS "Carpeta"
FROM "05_SYNAPSE_IA"
WHERE contains(file.folder, "APEX_creados")
SORT file.cday DESC
LIMIT 15
\`\`\`

---
*Generado desde la app (synapseData.ts + curricula verificados) · regenerar: \`node DATA/_scripts/build_vault_jmd_sync.js\` · ${HOY}*
`;
write(path.join(SYN, '00_Mapa_SYNAPSE.md'), mapaSyn, true);

// ── 3) EMPRESA ──
const EMP = path.join(V, '02_EMPRESA FINANZAS');
const epd = fs.readFileSync(path.join(APP, 'src/lib/estudioPulsoData.ts'), 'utf8');
const LIBROS = [...epd.matchAll(/\{ n: (\d+), categoria: '([^']+)', marca: '([^']+)', libro: '([^']+)', autor: '([^']+)', prioridad: (\d+), horas: (\d+)/g)]
  .map((m) => ({ n: +m[1], cat: m[2], marca: m[3], libro: m[4], autor: m[5], prio: +m[6], horas: +m[7] }));
const bizMeta = fs.readFileSync(path.join(APP, 'src/lib/businessStudyPlan.ts'), 'utf8').match(/inicio: '([\d-]+)', fin: '([\d-]+)', totalDias: (\d+)/);

const MARCAS = [
  ['01_PULSO', 'Pulso Salud', 'La empresa madre: medicina funcional/longevidad en Huancayo. 70% del tiempo de contenido (junto a LIVIANO).'],
  ['02_LIVIANO', 'LIVIANO', 'Pérdida de peso médica (GLP-1 + protocolo). Primera marca en despegue — LTV S/ 18,700+.'],
  ['03_PIRQA', 'PIRQA', 'Lanzamientos: sábado 12:00 lanzamiento → domingo venta. 10% del tiempo.'],
  ['04_TERRENOS', 'Terrenos', '13 propiedades · web + Marketplace ya publicados (nombre/link pendientes de Joseph). 10%.'],
  ['05_GOLDEN', 'Golden Retriever', 'Camada ~2 meses · página por crear. 10%.'],
];
mk(EMP);
MARCAS.forEach(([d, nombre, desc]) => {
  const base = path.join(EMP, d);
  mk(base); mk(path.join(base, 'APEX_creados'));
  write(path.join(base, '_concepto_madre.md'), `---
tipo: concepto_madre
examen: BUSINESS
subtema: ${d}
fecha_creacion: ${HOY}
estado: vacio
---

# 💼 ${nombre}

> [!info] Nota madre de la marca — **Business · Grupo Pulso**
> ${desc}
> Los APEX (términos Hormozi/operativos) caen en \`APEX_creados/\`.
> 🗺️ [[02_EMPRESA FINANZAS/00_Mapa_EMPRESA|Mapa Empresa]] · 🏠 [[00_Dashboard/Home|Home]]

## 🎯 Resumen operativo

*(pendiente)*

## 🔑 Conceptos clave (Hormozi aplicado)

*(pendiente)*

## 🗂️ APEX relacionados

\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado"
FROM "02_EMPRESA FINANZAS/${d}/APEX_creados"
SORT file.cday DESC
\`\`\`
`);
});
const porCat = {};
LIBROS.forEach((l) => { (porCat[l.cat] = porCat[l.cat] || []).push(l); });
write(path.join(EMP, '06_BIBLIOTECA', '_indice_biblioteca.md'), (() => {
  mk(path.join(EMP, '06_BIBLIOTECA'));
  return `---
tipo: biblioteca_business
libros: ${LIBROS.length}
fecha_creacion: ${HOY}
---

# 📚 Biblioteca del fundador — ${LIBROS.length} libros

> [!tip] Plan "Estudio Pulso": **${bizMeta[3]} días** (${bizMeta[1]} → ${bizMeta[2]}) · 2h/día ·
> prioridad 1 = leer completo, 2 = skim dirigido. El % leído vive en la app (Home → Biblioteca).

${Object.entries(porCat).map(([cat, ls]) => `## ${cat}

| # | Libro | Autor | Marca | Prio | Horas |
|---|-------|-------|-------|------|------:|
${ls.map((l) => `| ${l.n} | ${l.libro} | ${l.autor} | ${l.marca} | P${l.prio} | ${l.horas}h |`).join('\n')}`).join('\n\n')}
`;
})(), true);
write(path.join(EMP, '00_Mapa_EMPRESA.md'), `---
tipo: mapa_empresa
actualizado: ${HOY}
---

# 💼 Empresa · Grupo Pulso

> [!success] El conocimiento del fundador, medible
> 5 marcas · Estudio Pulso **${bizMeta[3]} días** (${bizMeta[1]} → ${bizMeta[2]}, dom 14/21-jun libres) ·
> ${LIBROS.length} libros · reparto de contenido **70% Pulso/LIVIANO · 10% PIRQA · 10% Terrenos · 10% Golden**.

| Marca | Carpeta | Rol |
|-------|---------|-----|
${MARCAS.map(([d, n, desc]) => `| **${n}** | [[02_EMPRESA FINANZAS/${d}/_concepto_madre\\|${d}]] | ${desc.split('.')[0]} |`).join('\n')}
| 📚 Biblioteca | [[02_EMPRESA FINANZAS/06_BIBLIOTECA/_indice_biblioteca\\|${LIBROS.length} libros]] | la materia prima del estudio |

## 📊 APEX recientes (Business)

\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado", file.folder AS "Carpeta"
FROM "02_EMPRESA FINANZAS"
WHERE contains(file.folder, "APEX_creados")
SORT file.cday DESC
LIMIT 10
\`\`\`
`, true);

// ── 4) 08_VITALS ──
const VIT = path.join(V, '08_VITALS');
const vitSecs = [
  ['01_ENTRENAMIENTO', '🏋️ Entrenamiento — split semanal', `Split real del motor (SPLIT_JOSEPH):
>
> | Día | Sesión | Min |
> |-----|--------|----:|
> | Lun | Torso empuje | 30' |
> | Mar | Pierna posterior | 60' |
> | Mié | Baile (FitDance, playlist continua) | 45' |
> | Jue | Torso jalón | 30' |
> | Vie | Pierna anterior | 60' |
>
> Videos: EXPRESS por defecto (RP/Squat University/Nippard 0:10-2:55) + "A fondo" (Andrés Vázquez).`],
  ['02_NUTRICION', '🥗 Nutrición — pisos de seguridad', `Pisos INTOCABLES del motor: kcal mínima · proteína ≥1.6 g/kg · pérdida ≤1%/semana —
> cualquier violación escala a médico. ~500 alimentos peruanos en Supabase (mv_foods).`],
  ['03_RETENCION', '📈 Retención — mecánicas Hormozi v2.1', `Plan del día a cero clics · score diario que expira · banner PR multi-categoría ·
> racha semanal + freeze · reporte de lunes · coach adherence-neutral (nunca regaña).
> Denominador primero: bajar time-delay y effort.`],
];
mk(VIT);
vitSecs.forEach(([d, titulo, body]) => {
  const base = path.join(VIT, d);
  mk(base); mk(path.join(base, 'APEX_creados'));
  write(path.join(base, '_concepto_madre.md'), `---
tipo: concepto_madre
examen: VITALS
subtema: ${d}
fecha_creacion: ${HOY}
estado: vacio
---

# ${titulo}

> [!info] Nota madre — **VITALS · Body, AI-measured**
> ${body}
> 🗺️ [[08_VITALS/00_Mapa_VITALS|Mapa VITALS]] · 🏠 [[00_Dashboard/Home|Home]]

## 🎯 Notas

*(pendiente)*

## 🗂️ APEX relacionados

\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado"
FROM "08_VITALS/${d}/APEX_creados"
SORT file.cday DESC
\`\`\`
`);
});
write(path.join(VIT, '00_Mapa_VITALS.md'), `---
tipo: mapa_vitals
actualizado: ${HOY}
---

# 🫀 VITALS · Body, AI-measured

> [!success] La app de ejercicio y nutrición de la casa Pulso
> **v2.1 en producción:** https://vitals-pulso.vercel.app (embebida en Joseph MD → VITALS).
> Motor serverless (Next.js + Supabase + Gemini) · plan semanal recurrente L-V · 49 videos
> verificados por oEmbed · retención Hormozi · código en \`D:\\joseph-md-app\\VITALS\\\`
> (original del CRM intacto).

| Sección | Carpeta |
|---------|---------|
| 🏋️ Entrenamiento (split + videos) | [[08_VITALS/01_ENTRENAMIENTO/_concepto_madre\\|01_ENTRENAMIENTO]] |
| 🥗 Nutrición (pisos de seguridad) | [[08_VITALS/02_NUTRICION/_concepto_madre\\|02_NUTRICION]] |
| 📈 Retención (mecánicas v2.1) | [[08_VITALS/03_RETENCION/_concepto_madre\\|03_RETENCION]] |

> [!warning] Reglas duras
> Los pisos del motor no se relajan (kcal/proteína/≤1%/sem → escala a médico).
> Videos: nunca cobrar por contenido embebido, no gatear, no cachear (ToS YouTube).
`, true);

// ── 5) notas sueltas de la raíz → 99_INBOX ──
const INBOX = path.join(V, '99_INBOX');
mk(INBOX);
for (const f of fs.readdirSync(V)) {
  const p = path.join(V, f);
  if (fs.statSync(p).isFile() && f.endsWith('.md')) {
    const dest = path.join(INBOX, f);
    if (!fs.existsSync(dest)) { if (!DRY) fs.renameSync(p, dest); movidos++; console.log('movido a 99_INBOX: ' + f); }
  }
}

// ── 6) emitir src/lib/obsidianVaultMap.ts (la app enlaza CADA tema a su nota exacta) ──
MARCAS.forEach(([d]) => { OBS.empresa[d.replace(/^\d+_/, '').toLowerCase()] = `02_EMPRESA FINANZAS/${d}/_concepto_madre`; });
OBS.empresa.biblioteca = '02_EMPRESA FINANZAS/06_BIBLIOTECA/_indice_biblioteca';
OBS.empresa.mapa = '02_EMPRESA FINANZAS/00_Mapa_EMPRESA';
vitSecs.forEach(([d]) => { OBS.vitals[d.replace(/^\d+_/, '').toLowerCase()] = `08_VITALS/${d}/_concepto_madre`; });
OBS.vitals.mapa = '08_VITALS/00_Mapa_VITALS';
const rec = (o) => '{\n' + Object.entries(o).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join('\n') + '\n}';
const mapTs = `/**
 * obsidianVaultMap.ts — GENERADO por DATA/_scripts/build_vault_jmd_sync.js (${HOY}).
 * Mapa app → nota EXACTA del vault para SYNAPSE (82 materiales), Empresa (5 marcas +
 * biblioteca) y VITALS (3 secciones). NO editar a mano — regenerar con el script
 * (los paths salen del MISMO código que crea las carpetas: cero drift).
 */
import { obsUrl } from './obsidianMap';

export const OBS_SYNAPSE_MAPA = '05_SYNAPSE_IA/00_Mapa_SYNAPSE';
export const OBS_SYNAPSE_FASES: Record<string, string> = ${rec(OBS.fases)};
export const OBS_SYNAPSE_MATERIALES: Record<string, string> = ${rec(OBS.materiales)};
export const OBS_EMPRESA: Record<string, string> = ${rec(OBS.empresa)};
export const OBS_VITALS: Record<string, string> = ${rec(OBS.vitals)};

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
  .replace(/[^a-z0-9 ]+/g, ' ').replace(/\\s+/g, ' ').trim();
const NORM_INDEX: [string, string][] = Object.entries(OBS_SYNAPSE_MATERIALES).map(([n, p]) => [norm(n), p]);

// Alias: variantes de nombre que usa el plan día-a-día → nombre canónico del material.
const ALIAS: [RegExp, string][] = [
  [/^cs50p/i, 'CS50P: Introduction to Programming with Python'],
  [/^pro git/i, 'Pro Git (2ª ed.)'],
  [/the batch/i, 'The Batch (newsletter semanal)'],
  [/^simon willison$/i, 'Serie "Prompt injection" (2022-2025)'],
  [/intro to llms/i, '[1hr Talk] Intro to Large Language Models'],
  [/deep dive/i, 'Deep Dive into LLMs like ChatGPT'],
  [/many-?shot/i, 'Many-shot jailbreaking (research)'],
  [/constitutional classifiers/i, 'Constitutional Classifiers (research)'],
  [/responsible scaling|\\basl\\b/i, 'Responsible Scaling Policy (ASL levels)'],
  [/lethal trifecta/i, 'The lethal trifecta for AI agents'],
  [/canal anthropic/i, 'Canal oficial de Anthropic (YouTube)'],
  [/python tutorial/i, 'The Python Tutorial (docs oficiales)'],
  [/automate the boring/i, 'Automate the Boring Stuff with Python (3ª ed.)'],
];

function fuzzy(q0: string): string | null {
  const q = norm(q0);
  if (!q) return null;
  const hit = NORM_INDEX.find(([n]) => n === q) || NORM_INDEX.find(([n]) => n.startsWith(q) || q.startsWith(n));
  if (hit) return hit[1];
  const qt = new Set(q.split(' ').filter((t) => t.length > 3));
  if (!qt.size) return null;
  let best: [number, string] | null = null;
  for (const [n, p] of NORM_INDEX) {
    const inter = n.split(' ').filter((t) => qt.has(t)).length;
    const score = inter / Math.max(qt.size, 1);
    if (score >= 0.6 && (!best || score > best[0])) best = [score, p];
  }
  return best ? best[1] : null;
}

/** Nota del material SYNAPSE: exacto → alias (material+lección) → difuso (material, luego lección). */
export function synObsPath(material: string, leccion = ''): string | null {
  if (OBS_SYNAPSE_MATERIALES[material]) return OBS_SYNAPSE_MATERIALES[material];
  const ctx = material + ' ' + leccion;
  for (const [re, nombre] of ALIAS) {
    if (re.test(ctx) && OBS_SYNAPSE_MATERIALES[nombre]) return OBS_SYNAPSE_MATERIALES[nombre];
  }
  return fuzzy(material) || (leccion ? fuzzy(leccion) : null);
}
export const synObsUrl = (material: string, leccion = ''): string | null => {
  const p = synObsPath(material, leccion);
  return p ? obsUrl(p) : null;
};
`;
fs.writeFileSync(path.join(APP, 'src/lib/obsidianVaultMap.ts'), mapTs, 'utf8');
console.log(`obsidianVaultMap.ts → ${Object.keys(OBS.materiales).length} materiales · ${Object.keys(OBS.fases).length} fases · empresa ${Object.keys(OBS.empresa).length} · vitals ${Object.keys(OBS.vitals).length}`);

console.log(`${DRY ? '[DRY] ' : ''}OK · creados/actualizados: ${creados} · ya existían (intactos): ${saltados} · movidos a INBOX: ${movidos}`);
console.log(`SYNAPSE: ${FASES.length} fases + ${FASES.reduce((n, f) => n + f.materiales.length, 0)} subtemas en fases + ${extras.length} extras`);
