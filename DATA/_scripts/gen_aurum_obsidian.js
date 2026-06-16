// gen_aurum_obsidian.js — crea la estructura Obsidian de AURUM en el vault real.
// Replica el patrón SYNAPSE (carpeta por fase + nota por lección + APEX_creados/).
// Vault: D:\JOSEPH\Vault_Medicina MIR_Joseph\07_VENTAS_AURUM
// Cada nota coincide EXACTAMENTE con el link aurumObsUrl (mismo saneo de nombre).
// Ejecutar:  node DATA/_scripts/gen_aurum_obsidian.js   (escribe fuera del proyecto)
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const CUR = JSON.parse(fs.readFileSync(path.join(ROOT, 'DATA/AURUM/curricula/_curriculum_v2.json'), 'utf8'));
const VAULT = 'D:/JOSEPH/Vault_Medicina MIR_Joseph/07_VENTAS_AURUM';

// mismo saneo que aurumObsUrl (Windows: \ / : * ? " < > |)
const san = (s) => String(s).replace(/[\\/:*?"<>|]/g, '-').trim();
const faseTitulo = (n) => { const f = (CUR.fases || []).find((x) => x.n === n); return f ? f.titulo : 'Fase ' + n; };
const faseObj = (n) => (CUR.fases || []).find((x) => x.n === n) || {};

let nNotas = 0, nFolders = 0;
const mk = (p) => { if (!fs.existsSync(p)) { fs.mkdirSync(p, { recursive: true }); nFolders++; } };
mk(VAULT);

// ── 00_Mapa_AURUM.md (dashboard de la sección) ──
const fasesLista = (CUR.fases || []).map((f) =>
  `### F${f.n} · ${f.titulo}\n- **Semanas:** ${f.semanas}\n- **Objetivo:** ${f.objetivo || ''}\n- **Entregable:** ${f.entregable || ''}`).join('\n\n');
// biblioteca v2 = recursos_gratis del roster (KEEP/FOUNDATION) + descubrimientos + libros
const rosterCount = (CUR.roster || []).reduce((a, r) => a + (r.recursos_gratis ? r.recursos_gratis.length : 0), 0);
const descCount = ((CUR.descubrimientos && CUR.descubrimientos.hallazgos) || []).reduce((a, h) => a + (h.recursos_gratis ? h.recursos_gratis.length : 0), 0);
const librosCount = (CUR.libros && CUR.libros.libros) ? CUR.libros.libros.length : 0;
const biblioCount = rosterCount + descCount + librosCount;
fs.writeFileSync(path.join(VAULT, '00_Mapa_AURUM.md'),
`---
tipo: mapa_seccion
seccion: AURUM
fases: 7
semanas: 26
dias: 130
inicio: 2026-06-17
fin: 2026-12-15
ventana: "14:15-15:15"
---

# 🪙 AURUM — Mapa de la sección

> [!info] El arte de convertir conversaciones en oro · closer de ventas de élite
> Programa de **6 meses · 26 semanas · 130 misiones (L-V)**. Núcleo de **30-60 min en 14:15-15:15** (ver + practicar) + lectura/audiolibro en tus huecos de viaje. Material 100% GRATIS de referentes con track record REAL: Hormozi, Cardone, Chris Voss, Cialdini, Neil Rackham (SPIN), Joe Girard, Brian Tracy, Jeb Blount, Aaron Ross + Josué Peña (solo su contenido gratis).
> 🏠 [[00_Dashboard/Home|Home]] · 📅 App: Business → Pulso → AURUM → ⚡ Hoy · 🗓️ Calendar: bloque PULSO 14:15-15:15 L-V

## 🧭 Las 7 fases

${fasesLista}

## 📚 Biblioteca
${biblioCount} recursos gratuitos verificados/estables (ver pestaña Biblioteca en la app).

## 🗂️ APEX de toda la sección
\`\`\`dataview
TABLE WITHOUT ID file.link AS "Nota", fase AS "Fase", semana AS "Sem", estado AS "Estado"
FROM "07_VENTAS_AURUM"
WHERE seccion = "AURUM" AND tipo = "leccion_aurum"
SORT fase ASC, semana ASC
\`\`\`
`, 'utf8');

// ── Notas por fase / semana / día ──
for (const det of (CUR.detalles || [])) {
  const fn = det.fase;
  const folder = path.join(VAULT, 'Fase' + fn);
  mk(folder);
  mk(path.join(folder, 'APEX_creados'));
  const fo = faseObj(fn);
  // índice de fase
  fs.writeFileSync(path.join(folder, `00_Fase${fn}.md`),
`---
tipo: indice_fase
seccion: AURUM
fase: F${fn}
---

# 🪙 AURUM · F${fn} — ${faseTitulo(fn)}

> [!info] ${fo.semanas ? 'Semanas ' + fo.semanas : ''}
> **Objetivo:** ${fo.objetivo || ''}
> **Entregable:** ${fo.entregable || ''}
> 🗺️ [[07_VENTAS_AURUM/00_Mapa_AURUM|Mapa AURUM]]

## Lecciones de la fase
\`\`\`dataview
TABLE WITHOUT ID file.link AS "Lección", semana AS "Sem", referente AS "Referente", estado AS "Estado"
FROM "07_VENTAS_AURUM/Fase${fn}"
WHERE tipo = "leccion_aurum"
SORT semana ASC, file.name ASC
\`\`\`
`, 'utf8');

  for (const sem of (det.semanas || [])) {
    for (const dia of (sem.dias || [])) {
      const raw = String(dia.obsidian_nota || `VENTAS/Fase${fn}/S${String(sem.sem).padStart(2, '0')} - ${dia.titulo}`);
      const parts = raw.replace(/^VENTAS\//, '').split('/');
      const fname = san(parts[parts.length - 1]) + '.md';
      const V = dia.ver || {};                 // bloque A — vídeo a ver (núcleo)
      const P = dia.practica || {};            // bloque PRAC — drill del día (núcleo)
      const L = dia.lectura || {};             // bloque L — libro/audiolibro (huecos de viaje)
      const ref = V.canal || L.fuente || '';
      const lecturaIcon = L.tipo === 'audiolibro' ? '🎧' : '📖';
      const body =
`---
tipo: leccion_aurum
seccion: AURUM
fase: F${fn}
semana: ${sem.sem}
referente: "${String(ref).replace(/"/g, "'")}"
url: ${V.url || ''}
min_core: ${dia.min_core || ''}
ventana: "14:15-15:15"
estado: pendiente
---

# 🪙 ${dia.titulo || ''}

> [!info] AURUM · F${fn} ${faseTitulo(fn)} — Semana ${sem.sem}
> Tema de la semana: *${sem.tema || ''}*
> ⏱️ Núcleo ${dia.min_core || '30-60'} min en **14:15-15:15** (ver + practicar) · lectura en tus huecos de viaje
> 🗺️ [[07_VENTAS_AURUM/00_Mapa_AURUM|Mapa AURUM]] · 📂 [[07_VENTAS_AURUM/Fase${fn}/00_Fase${fn}|Fase ${fn}]] · 🏠 [[00_Dashboard/Home|Home]]

## 🎬 A · Ver${V.min ? ` (${V.min}′)` : ''} — núcleo
${V.titulo ? `**${V.canal || ''}** — ${V.titulo}` : '*(sin vídeo asignado)*'}
${V.url ? `🔗 ${V.url}` : ''}

## 🎯 PRAC · Drill del día${P.min ? ` (${P.min}′)` : ''} — núcleo (la caja negra del closer)
${P.texto || ''}

## ${lecturaIcon} L · ${L.tipo || 'lectura'}${L.min ? ` (${L.min}′)` : ''} — en tus huecos (viaje / lectura)
${L.titulo ? `**${L.fuente || ''}** — ${L.titulo}` : '*(sin lectura asignada)*'}
${L.url ? `🔗 ${L.url}` : ''}

## 📝 Lo aprendido / scripts
*(pendiente — se llena al ejecutar el drill)*

## 🗂️ APEX relacionados
\`\`\`dataview
TABLE WITHOUT ID file.link AS "APEX", file.cday AS "Creado"
FROM "07_VENTAS_AURUM/Fase${fn}/APEX_creados"
SORT file.cday DESC
\`\`\`
`;
      fs.writeFileSync(path.join(folder, fname), body, 'utf8');
      nNotas++;
    }
  }
}

console.log('OK — Obsidian AURUM generado en', VAULT);
console.log('  carpetas creadas:', nFolders, '· notas de lección:', nNotas, '+ 00_Mapa + 7 índices de fase');
