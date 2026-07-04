// gen_encaps_cobertura.js — desde el barrido de cobertura (cobertura_final.json) emite:
//  1) src/lib/encapsCobertura.ts   (code → {tier, vueltas, min, qxN, theomedN, extenso, gaps, guidance, temario})
//  2) DATA/ENCAPS/MAPA_COBERTURA_2026-2.md   (doc maestro humano)
//  3) --apply → actualiza study_schedule.extra (vueltas + minObjetivo) por código en Supabase (anon UPDATE).
// node DATA/_scripts/gen_encaps_cobertura.js [--apply]
const fs = require('fs'); const path = require('path');
const SB = 'C:/Users/JOSEPH~1/AppData/Local/Temp/claude/D--joseph-md-app/2b1d4275-ceb5-4f8d-9ab0-d4dbbd76c52a/scratchpad/cobertura_final.json';
const rows = JSON.parse(fs.readFileSync(SB, 'utf8'));
const VIDS = JSON.parse(fs.readFileSync(SB.replace('cobertura_final.json', 'qx_videos_165.json'), 'utf8'));
// Cotejo de libros (López vs Theomed) + inventario de videos Drive por área (workflow wgt0efphj).
let COTEJO = { overall: {}, codes: {}, areas: {} };
try { COTEJO = JSON.parse(fs.readFileSync(SB.replace('cobertura_final.json', 'cotejo_libros_drive.json'), 'utf8')); } catch {}
const THEOMED_MANUALES = 'https://drive.google.com/drive/folders/1R_G1Ee4kBqSPr5vlv2mZ3Iqy1EqQL1Sn'; // Manuales Theomed por área

// Normalizador para matchear títulos de la guía contra los 165 videos reales.
const norm = s => (s || '').toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const VIDX = VIDS.map(v => ({ titulo: v.sub, url: v.url, n: norm(v.sub) })).filter(v => v.url);

// videosExtra: los videos QX que la guía menciona por título → {titulo,url} clicable (dedup por url).
function resolveVideos(guidance) {
  const g = norm(guidance); const out = []; const seen = new Set();
  for (const v of VIDX) {
    if (v.n.length < 10) continue;
    if (g.includes(v.n) && !seen.has(v.url)) { seen.add(v.url); out.push({ titulo: v.titulo, url: v.url }); }
  }
  return out;
}

// Compendio DR LOPEZ por área (PDF directo SP/CI/Ética; carpeta para Inv/Gestión).
const AREA_COMP = {
  I: 'https://drive.google.com/file/d/1iq_BDzPe3idrZeGL0Q3eR7IB9mKyDftT/view',
  II: 'https://drive.google.com/file/d/1RWSnHTSilcCPKr6W9k0Gv6HYo5efkrBl/view',
  III: 'https://drive.google.com/file/d/1DCrhYE_DwZ25RoDSIhcxTq52cDRG1qSN/view',
  IV: 'https://drive.google.com/drive/folders/13fYG58fySgFIC1HKBVUCNw61ipa6C69V',
  V: 'https://drive.google.com/drive/folders/13fYG58fySgFIC1HKBVUCNw61ipa6C69V',
};
// Sección Theomed del área (curso 73) — para "mira N videos Theomed" clicable.
const AREA_THEOMED = {
  I: 'https://campus.academiatheomed.com/course/view.php?id=73&section=2',
  II: 'https://campus.academiatheomed.com/course/view.php?id=73&section=3',
  III: 'https://campus.academiatheomed.com/course/view.php?id=73&section=4',
  IV: 'https://campus.academiatheomed.com/course/view.php?id=73&section=5',
  V: 'https://campus.academiatheomed.com/course/view.php?id=73&section=6',
};
// VIDEO DEDICADO de respaldo en Drive por área (para temas SIN video QX → López/GALENO Videoclases).
const AREA_VIDEO_FALLBACK = {
  I: { label: 'Videoclases DR LOPEZ · SP', url: 'https://drive.google.com/drive/folders/1tlyniouI5o_SOpw-LBa2IGfWgG5zpfF0' },
  II: { label: 'Videoclases DR LOPEZ · CI', url: 'https://drive.google.com/drive/folders/1-UH5Vo9lBT-R41VVjaHsnIA2zNvGWXoE' },
  III: { label: 'Videoclases DR LOPEZ · Ética', url: 'https://drive.google.com/drive/folders/1srnoHI0LavKzi1Vzy8c9Mt5f5WLRqsWu' },
  IV: { label: 'Videoclases GALENO', url: 'https://drive.google.com/drive/folders/1RCpVqy_1yF0OBU-OUegTOzHjaZS6FAX8' },
  V: { label: 'Videoclases GALENO · Gestión', url: 'https://drive.google.com/drive/folders/1R1cuKS2PV8yCeicl2VXj8NBIhWtNUP9w' },
};
// Fuentes externas para tapar gaps (Drive), atadas por palabra clave del gap.
const SRC = {
  mopece: { label: 'OPS MOPECE 5 · brotes', url: 'https://drive.google.com/file/d/1i-4ETiOgjjtsPxee1aDqx9oVnm0UALtR/view' },
  enam: { label: 'QX ENAM · Epi resumen', url: 'https://drive.google.com/file/d/14dSCm-Ftxf9ys7_O6IwRzqOFb1n2O8Nu/view' },
  renace: { label: 'Normativas DR LOPEZ (RENACE 341-2023)', url: 'https://drive.google.com/drive/folders/1YdyhemfujHYIROcBcr9G9avUYulqfpko' },
};
function gapSourcesFor(gaps) {
  const g = (gaps || []).join(' ').toLowerCase(); const s = [];
  if (/mopece|tasa de ataque|curva epid|brote|investigaci[oó]n de/.test(g)) s.push(SRC.mopece);
  if (/canal end[eé]mic|curva epid|enam|caso [ií]ndice|primario/.test(g)) s.push(SRC.enam);
  if (/renace|directiva|notificaci|341|evisap/.test(g)) s.push(SRC.renace);
  return s;
}

// 1) lib TS
const map = {};
for (const r of rows) {
  const area = (r.codigo.match(/^[IVX]+/) || [''])[0];
  map[r.codigo] = {
    tier: r.rentabilidadTier, vueltas: r.recommendedVueltas, min: r.recommendedMinutes,
    qxN: r.qxVideos, theomedN: r.theomedVideos, extenso: !!r.extenso,
    freq: r.examFreqNote || '', guidance: r.videosGuidance || '',
    gaps: r.gaps || [], temario: r.compendioSubtemas || [],
    compendioUrl: AREA_COMP[area] || '',
    theomedBookUrl: THEOMED_MANUALES,
    theomedUrl: AREA_THEOMED[area] || '',
    videoFallback: AREA_VIDEO_FALLBACK[area] || { label: '', url: '' }, // video dedicado Drive si no hay QX
    videosExtra: resolveVideos(r.videosGuidance || ''),
    gapSources: gapSourcesFor(r.gaps),
    // Cotejo de libros: quién cubre + qué trae solo uno + qué no trae ninguno
    bookCoverage: { lopez: (COTEJO.codes[r.codigo] || {}).lopezCubre || '?', theomed: (COTEJO.codes[r.codigo] || {}).theomedCubre || '?', theomedManual: (COTEJO.codes[r.codigo] || {}).theomedManual || '' },
    soloTheomed: (COTEJO.codes[r.codigo] || {}).soloTheomed || [],
    soloLopez: (COTEJO.codes[r.codigo] || {}).soloLopez || [],
    gapAmbos: (COTEJO.codes[r.codigo] || {}).gapAmbos || [],
    driveVideos: (COTEJO.areas[area] || []).map(v => ({ label: `${v.academia} · ${(v.label || '').slice(0, 26)}`, url: v.url })).filter(v => v.url),
  };
}
const header = `// AUTO-GENERADO por DATA/_scripts/gen_encaps_cobertura.js — NO editar a mano.\n` +
  `// Mapa de cobertura por tema (barrido compendio DR LOPEZ × Tendencias/forecast × QX/Theomed, 03-jul).\n` +
  `// tier=rentabilidad · vueltas=repeticiones espaciadas · min=minutos núcleo/día · qxN/theomedN=nº videos a mirar\n` +
  `// extenso=merece bloque largo · guidance=cuántos/cuáles videos · gaps=sub-temas a leer en compendio/Drive · temario=índice compendio.\n`;
const body = `export interface FuenteLink { label: string; url: string }\n` +
  `export interface VideoExtra { titulo: string; url: string }\n` +
  `export interface CoberturaTema {\n` +
  `  tier: 'CRÍTICA' | 'ALTA' | 'MEDIA' | 'BAJA'; vueltas: number; min: number;\n` +
  `  qxN: number; theomedN: number; extenso: boolean; freq: string; guidance: string;\n` +
  `  gaps: string[]; temario: string[];\n` +
  `  compendioUrl: string; theomedBookUrl: string; theomedUrl: string; videoFallback: FuenteLink; videosExtra: VideoExtra[]; gapSources: FuenteLink[];\n` +
  `  bookCoverage: { lopez: string; theomed: string; theomedManual: string };\n` +
  `  soloTheomed: string[]; soloLopez: string[]; gapAmbos: string[]; driveVideos: FuenteLink[];\n}\n` +
  `export const ENCAPS_COBERTURA: Record<string, CoberturaTema> = ${JSON.stringify(map, null, 1)};\n`;
fs.writeFileSync(path.join(__dirname, '..', '..', 'src', 'lib', 'encapsCobertura.ts'), header + body, 'utf8');

// 2) doc maestro
const tierRank = { 'CRÍTICA': 0, 'ALTA': 1, 'MEDIA': 2, 'BAJA': 3 };
const sorted = [...rows].sort((a, b) => (tierRank[a.rentabilidadTier] - tierRank[b.rentabilidadTier]) || (b.recommendedMinutes - a.recommendedMinutes));
let md = `# 🗺️ Mapa de Cobertura ENCAPS 2026-II (barrido por compendio · 03-jul)\n\n`;
md += `Fuente autoritativa = **compendios DR LOPEZ + manuales THEOMED** (temario completo) cotejado con **Tendencias QX /400** + **forecast walk-forward v2** + videos **QX (165)** y **Theomed/Drive (por área)**. Objetivo: 0 temas al descubierto; vueltas/tiempo ∝ rentabilidad. Examen 20-ago FIJO.\n\n`;
if (COTEJO.overall && COTEJO.overall.combinedPct) {
  md += `## 📊 Cobertura de los libros base (vs exámenes + forecast)\n- **DR LOPEZ solo: ${COTEJO.overall.lopezPct}%** · **THEOMED solo: ${COTEJO.overall.theomedPct}%** · **combinados: ${COTEJO.overall.combinedPct}%**.\n- ${COTEJO.overall.note}\n\n`;
}
md += `## Tabla maestra (ordenada por prioridad)\n\n| Código | Tema | Tier | Vueltas | Min/día | QX | Theomed | Extenso | Gaps |\n|---|---|---|---|---|---|---|---|---|\n`;
for (const r of sorted) {
  md += `| **${r.codigo}** | ${r.subtema.slice(0, 34)} | ${r.rentabilidadTier} | ${r.recommendedVueltas} | ${r.recommendedMinutes} | ${r.qxVideos} | ${r.theomedVideos} | ${r.extenso ? '✔' : '·'} | ${(r.gaps || []).length} |\n`;
}
md += `\n## Detalle por tema (qué mirar + qué leer)\n`;
for (const r of sorted) {
  md += `\n### ${r.codigo} · ${r.subtema} — **${r.rentabilidadTier}** (${r.recommendedVueltas} vueltas · ${r.recommendedMinutes} min)\n`;
  md += `- **Frecuencia/rentabilidad:** ${r.examFreqNote || '—'}\n`;
  md += `- **Videos a mirar:** ${r.videosGuidance || '—'}\n`;
  if ((r.gaps || []).length) md += `- **⚠ Gaps (leer fuera de QX):** ${r.gaps.join(' · ')}\n`;
  md += `- **Temario del compendio (${(r.compendioSubtemas || []).length}):** ${(r.compendioSubtemas || []).join(' · ')}\n`;
}
fs.writeFileSync(path.join(__dirname, '..', '..', 'DATA', 'ENCAPS', 'MAPA_COBERTURA_2026-2.md'), md, 'utf8');

console.log('OK · src/lib/encapsCobertura.ts (' + Object.keys(map).length + ' temas) · DATA/ENCAPS/MAPA_COBERTURA_2026-2.md');
const crit = rows.filter(r => r.rentabilidadTier === 'CRÍTICA').map(r => r.codigo);
const gapsTot = rows.reduce((n, r) => n + (r.gaps || []).length, 0);
console.log('CRÍTICOS:', crit.join(', '), '| gaps totales:', gapsTot);

// 3) --apply → Supabase extra.vueltas + extra.minObjetivo por código
if (process.argv.includes('--apply')) {
  const { createClient } = require('@supabase/supabase-js');
  const sb = createClient('https://qacynpqdrorpuegsmtcy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhY3lucHFkcm9ycHVlZ3NtdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODI3ODIsImV4cCI6MjA4OTk1ODc4Mn0.bQk5OCtaSuKqr31Gve1lZ2XBUQ46IvR50yVBeqDSsZE');
  (async () => {
    const { data } = await sb.from('study_schedule').select('dia,codigo,extra').eq('examen', 'ENCAPS').eq('tipo', 'deep_prime');
    let n = 0;
    for (const row of data) {
      const cov = map[row.codigo]; if (!cov) continue;
      const extra = { ...(row.extra || {}), vueltas: cov.vueltas, minObjetivo: cov.min, tierCobertura: cov.tier };
      const { error } = await sb.from('study_schedule').update({ extra, updated_at: new Date().toISOString() }).eq('examen', 'ENCAPS').eq('dia', row.dia);
      if (error) throw new Error(`dia ${row.dia}: ${error.message}`);
      n++;
    }
    console.log('✔ Supabase: vueltas+minObjetivo aplicados a', n, 'días');
  })();
}
