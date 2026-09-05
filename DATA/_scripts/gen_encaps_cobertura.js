// gen_encaps_cobertura.js — desde el barrido de cobertura (cobertura_final.json) emite:
//  1) src/lib/encapsCobertura.ts   (code → {tier, vueltas, min, qxN, theomedN, extenso, gaps, guidance, temario, rebote?})
//  2) DATA/ENCAPS/MAPA_COBERTURA_2026-2.md   (doc maestro humano) — SOLO en modo completo (con cobertura_final.json)
//  3) --apply → actualiza study_schedule.extra (vueltas + minObjetivo) por código en Supabase (anon UPDATE).
// node DATA/_scripts/gen_encaps_cobertura.js [--apply]
//
// MODO RE-TIER (05-sep-2026): el barrido original (cobertura_final.json, scratchpad de julio) ya no existe en
// disco → si falta, el script parte del encapsCobertura.ts VIGENTE como base, aplica el RETIER v3 y añade los
// códigos nuevos (II-EMG, I-OCC). Así la regeneración es reproducible sin el scratchpad de julio.
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const TS_OUT = path.join(ROOT, 'src', 'lib', 'encapsCobertura.ts');
const SB = 'C:/Users/JOSEPH~1/AppData/Local/Temp/claude/D--joseph-md-app/2b1d4275-ceb5-4f8d-9ab0-d4dbbd76c52a/scratchpad/cobertura_final.json';
const FULL = fs.existsSync(SB);
const rows = FULL ? JSON.parse(fs.readFileSync(SB, 'utf8')) : [];
const VIDS = FULL ? JSON.parse(fs.readFileSync(SB.replace('cobertura_final.json', 'qx_videos_165.json'), 'utf8')) : [];
// INVENTARIO VIVO QX (re-scrape 06-jul: 123 videos reales por código, URLs canónicas). Fuente autoritativa
// de videosExtra + qxN (reemplaza el matching por título contra los 165, que tenía 22 stale + 30 huérfanos).
let LIVE = {};
try { LIVE = JSON.parse(fs.readFileSync(SB.replace('cobertura_final.json', 'qx_live_by_code.json'), 'utf8')); } catch {}

// ── RE-TIER v3 (PRONOSTICO_WALKFORWARD_2027-1_v3 §3): 8 críticos + 3 ALTA con flag de rebote ──
// Supersede al RETIER de julio (v2): II-8 baja a ALTA-rebote; I-4/II-5/II-4/IV-1+IV-2 suben a CRÍTICA.
const RETIER = {
  // 8 críticos v3 (dominar al 100% antes que nada)
  'I-3':       { tier: 'CRÍTICA', vueltas: 6, min: 120, freqV3: '#1 v3 · 11% (banda 9-14) · rey estable 11-15 en 4 folds' },
  'V-2':       { tier: 'CRÍTICA', vueltas: 6, min: 120, freqV3: '#2 v3 · 10% (8-14) · volátil alto; 3 sub-ejes: planeamiento ~5 · clima+calidad ~4 (en alza dura) · residuos ~2' },
  'II-3':      { tier: 'CRÍTICA', vueltas: 6, min: 90,  freqV3: '#5 v3 · 5% (3-7) · 3 folds seguidos ≥5; novedades VRS/Tdap gestante, ESAVI + kit' },
  'III-5':     { tier: 'CRÍTICA', vueltas: 6, min: 90,  freqV3: '#6 v3 · 5% (4-6) · 0 pp de error en el último fold' },
  'I-4':       { tier: 'CRÍTICA', vueltas: 6, min: 90,  freqV3: '#4 v3 · 5% (3-8) · alza 3→6 (dengue 8Q + sarampión 5Q en 2026-II)' },
  'II-5':      { tier: 'CRÍTICA', vueltas: 6, min: 90,  freqV3: '#7 v3 · 4% (2-6) · emergente fuerte 0→5 (NTS adolescente + MCI)' },
  'II-4':      { tier: 'CRÍTICA', vueltas: 6, min: 90,  freqV3: '#8 v3 · 4% (2-5) · estable-alza 3→4, cifras de suplementación preguntables' },
  'IV-1+IV-2': { tier: 'CRÍTICA', vueltas: 6, min: 90,  freqV3: '#3 v3 · 5% (2-8) · rebotó a 7 en 2026-II; crítico CONDICIONAL al comité (si vuelve viñeta plena → ALTA)' },
  // ALTA con flag de rebote (anti-persistentes: no enterrarlos, lección V-2)
  'II-1':      { tier: 'ALTA', vueltas: 5, min: 60, rebote: true, freqV3: '#14 v3 · 2% (1-5) · ↩ rebote probable (5-6 histórico → 1 en 2026-II)' },
  'II-11':     { tier: 'ALTA', vueltas: 5, min: 60, rebote: true, freqV3: '#13 v3 · 2% (1-5) · ↩ rebote probable (aplastada en 2026-II)' },
  'II-8':      { tier: 'ALTA', vueltas: 5, min: 60, rebote: true, freqV3: '#15 v3 · 2% (1-4) · ↩ rebote posible' },
  // se mantienen de julio
  'I-11+I-12': { tier: 'MEDIA', vueltas: 4, min: 90 },
};
// ── CÓDIGOS NUEVOS (emergentes 2026-II, §4 del v3) — tier MEDIA, temario mínimo. ──
// Lo no comprobable contra el texto de la norma va marcado "A VERIFICAR (05-sep)".
const NUEVOS = {
  'II-EMG': {
    area: 'II', tier: 'MEDIA', vueltas: 4, min: 45,
    freq: 'Emergente 2026-II (2Q) · 1.5% (0-3) en el v3 §3 fila 21. Las normas publicadas 0-6 meses antes del examen entran directo (RM jul-2026 → cayó en ago-2026).',
    guidance: 'Sin video QX propio. Estudiar desde la ficha QX "Atención médica en situaciones de emergencia, urgencia y referencia" + texto de la RM de prioridades de atención (jul-2026, nº de RM A VERIFICAR 05-sep). Enfoque: definiciones textuales de cada prioridad + tiempo máximo de espera + ejemplo clínico de triaje.',
    gaps: [
      'Texto íntegro de la RM jul-2026 de prioridades de atención en emergencia (nº de RM y tabla oficial de tiempos — A VERIFICAR 05-sep contra El Peruano)',
      'Ejemplos clínicos por prioridad de triaje según la norma (A VERIFICAR)',
    ],
    temario: [
      'Prioridades de atención en emergencia (RM jul-2026): P-I atención inmediata · P-II ≤10 min · P-III ≤30 min (A VERIFICAR 05-sep el detalle de P-IV y los tiempos exactos en el texto de la RM)',
      'Triaje: clasificación y ejemplos por prioridad (A VERIFICAR)',
      'Emergencia vs urgencia: definiciones y flujo de referencia/contrarreferencia',
    ],
    fichaTitulo: 'Atención médica en situaciones de emergencia, urgencia y referencia',
  },
  'I-OCC': {
    area: 'I', tier: 'MEDIA', vueltas: 4, min: 45,
    freq: 'Emergente 2026-II (2Q) · 1.5% (0-3) en el v3 §3 fila 22. Salud ocupacional: riesgo profesional y factores de riesgo (el psicosocial fue el preguntado).',
    guidance: 'Sin video QX propio. Estudiar desde la ficha QX "Salud ocupacional" (Salud comunitaria) + compendio López SP. Enfoque: definición de riesgo profesional ligado al vínculo laboral y la clasificación de factores de riesgo (físico / químico / biológico / ergonómico / psicosocial) con un ejemplo de cada uno.',
    gaps: [
      'Base legal (Ley de Seguridad y Salud en el Trabajo y su reglamento; protocolos de exámenes médico-ocupacionales) — números de norma A VERIFICAR 05-sep antes de banquear cifras/plazos',
      'Accidente de trabajo vs enfermedad profesional: definiciones textuales (A VERIFICAR)',
    ],
    temario: [
      'Riesgo profesional: definición y su vínculo con la relación laboral',
      'Factores de riesgo ocupacional: físico · químico · biológico · ergonómico · psicosocial (ejemplos)',
      'Accidente de trabajo vs enfermedad profesional (A VERIFICAR definiciones normativas)',
      'Vigilancia de la salud de los trabajadores y exámenes médico-ocupacionales (A VERIFICAR norma vigente)',
    ],
    fichaTitulo: 'Salud ocupacional salud comunitaria',
  },
};
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
// Ficha QX MINSA por título exacto (leída de src/lib/encapsFuentes.ts, verificado 05-sep) → link real, no inventado.
function fichaQX(titulo) {
  try {
    const src = fs.readFileSync(path.join(ROOT, 'src', 'lib', 'encapsFuentes.ts'), 'utf8');
    const re = new RegExp(`"titulo":\\s*"${titulo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",\\s*"url":\\s*"([^"]+)"`);
    const m = src.match(re);
    return m ? { label: `Ficha QX MINSA: ${titulo}`, url: m[1] } : null;
  } catch { return null; }
}

// 1) lib TS — base: barrido completo (rows) o el TS vigente (modo re-tier)
let map = {};
if (FULL) {
  for (const r of rows) {
    const area = (r.codigo.match(/^[IVX]+/) || [''])[0];
    const live = LIVE[r.codigo] || [];       // videos QX vivos de ESTE código (re-scrape 06-jul)
    map[r.codigo] = {
      tier: r.rentabilidadTier, vueltas: r.recommendedVueltas, min: r.recommendedMinutes,
      qxN: live.length || r.qxVideos || 0, theomedN: r.theomedVideos, extenso: !!r.extenso,
      freq: r.examFreqNote || '', guidance: r.videosGuidance || '',
      gaps: r.gaps || [], temario: r.compendioSubtemas || [],
      compendioUrl: AREA_COMP[area] || '',
      theomedBookUrl: THEOMED_MANUALES,
      theomedUrl: AREA_THEOMED[area] || '',
      videoFallback: AREA_VIDEO_FALLBACK[area] || { label: '', url: '' }, // video dedicado Drive si no hay QX
      videosExtra: live.map(v => ({ titulo: v.titulo, url: v.url })), // SOLO inventario vivo (0 URLs stale; códigos sin QX → [] y usan videoFallback/Theomed)
      gapSources: gapSourcesFor(r.gaps),
      // Cotejo de libros: quién cubre + qué trae solo uno + qué no trae ninguno
      bookCoverage: { lopez: (COTEJO.codes[r.codigo] || {}).lopezCubre || '?', theomed: (COTEJO.codes[r.codigo] || {}).theomedCubre || '?', theomedManual: (COTEJO.codes[r.codigo] || {}).theomedManual || '' },
      soloTheomed: (COTEJO.codes[r.codigo] || {}).soloTheomed || [],
      soloLopez: (COTEJO.codes[r.codigo] || {}).soloLopez || [],
      gapAmbos: (COTEJO.codes[r.codigo] || {}).gapAmbos || [],
      driveVideos: (COTEJO.areas[area] || []).map(v => ({ label: `${v.academia} · ${(v.label || '').slice(0, 26)}`, url: v.url })).filter(v => v.url),
    };
  }
} else {
  // modo re-tier: parsear el objeto JSON del TS vigente (es JSON puro tras el "= ").
  const cur = fs.readFileSync(TS_OUT, 'utf8');
  const i = cur.indexOf('ENCAPS_COBERTURA: Record<string, CoberturaTema> = ');
  if (i < 0) throw new Error('encapsCobertura.ts: no encontré ENCAPS_COBERTURA');
  const j0 = cur.indexOf('{', i), j1 = cur.lastIndexOf('};');
  map = JSON.parse(cur.slice(j0, j1 + 1));
  console.log('modo RE-TIER (sin cobertura_final.json): base =', Object.keys(map).length, 'temas del TS vigente');
}
// RETIER v3 (sobre cualquiera de las dos bases)
for (const [code, rt] of Object.entries(RETIER)) {
  if (!map[code]) { console.warn('RETIER: código no encontrado', code); continue; }
  map[code].tier = rt.tier; map[code].vueltas = rt.vueltas; map[code].min = rt.min;
  if (rt.rebote) map[code].rebote = true; else delete map[code].rebote;
  if (rt.freqV3) map[code].freqV3 = rt.freqV3;
}
// CÓDIGOS NUEVOS
for (const [code, n] of Object.entries(NUEVOS)) {
  const ficha = fichaQX(n.fichaTitulo);
  map[code] = {
    tier: n.tier, vueltas: n.vueltas, min: n.min,
    qxN: 0, theomedN: 0, extenso: false,
    freq: n.freq, guidance: n.guidance, gaps: n.gaps, temario: n.temario,
    compendioUrl: AREA_COMP[n.area] || '', theomedBookUrl: THEOMED_MANUALES, theomedUrl: AREA_THEOMED[n.area] || '',
    videoFallback: AREA_VIDEO_FALLBACK[n.area] || { label: '', url: '' },
    videosExtra: [], gapSources: ficha ? [ficha] : [],
    bookCoverage: { lopez: '?', theomed: '?', theomedManual: '' },
    soloTheomed: [], soloLopez: [], gapAmbos: [], driveVideos: [],
    nuevoV3: true,
  };
}
// orden estable: críticos v3 primero, luego el resto en su orden original
const header = `// AUTO-GENERADO por DATA/_scripts/gen_encaps_cobertura.js — NO editar a mano.\n` +
  `// Mapa de cobertura por tema (barrido compendio DR LOPEZ × Tendencias/forecast × QX/Theomed, 03-jul) + RE-TIER v3 (05-sep-2026):\n` +
  `// 8 críticos v3 (I-3 V-2 II-3 III-5 I-4 II-5 II-4 IV-1+IV-2) · ALTA con flag rebote (II-1 II-11 II-8) · nuevos II-EMG / I-OCC (MEDIA).\n` +
  `// tier=rentabilidad · vueltas=repeticiones espaciadas · min=minutos núcleo/día · qxN/theomedN=nº videos a mirar\n` +
  `// extenso=merece bloque largo · guidance=cuántos/cuáles videos · gaps=sub-temas a leer en compendio/Drive · temario=índice compendio.\n` +
  `// rebote=ALTA anti-persistente (no enterrar) · freqV3=lectura del pronóstico v3 · nuevoV3=código creado en el re-tier v3.\n`;
const body = `export interface FuenteLink { label: string; url: string }\n` +
  `export interface VideoExtra { titulo: string; url: string }\n` +
  `export interface CoberturaTema {\n` +
  `  tier: 'CRÍTICA' | 'ALTA' | 'MEDIA' | 'BAJA'; vueltas: number; min: number;\n` +
  `  qxN: number; theomedN: number; extenso: boolean; freq: string; guidance: string;\n` +
  `  gaps: string[]; temario: string[];\n` +
  `  compendioUrl: string; theomedBookUrl: string; theomedUrl: string; videoFallback: FuenteLink; videosExtra: VideoExtra[]; gapSources: FuenteLink[];\n` +
  `  bookCoverage: { lopez: string; theomed: string; theomedManual: string };\n` +
  `  soloTheomed: string[]; soloLopez: string[]; gapAmbos: string[]; driveVideos: FuenteLink[];\n` +
  `  rebote?: boolean; freqV3?: string; nuevoV3?: boolean;\n}\n` +
  `export const ENCAPS_COBERTURA: Record<string, CoberturaTema> = ${JSON.stringify(map, null, 1)};\n` +
  `// Tickers derivados del re-tier v3 (misma fuente que ENCAPS_COBERTURA; el HUD usa encapsRentabilidad.ts).\n` +
  `export const ENCAPS_CRITICOS_V3: string[] = ${JSON.stringify(Object.keys(map).filter(k => map[k].tier === 'CRÍTICA'))};\n` +
  `export const ENCAPS_REBOTE_V3: string[] = ${JSON.stringify(Object.keys(map).filter(k => map[k].rebote))};\n`;
fs.writeFileSync(TS_OUT, header + body, 'utf8');

// 2) doc maestro — solo en modo completo (necesita las filas del barrido)
if (FULL) {
  const tierRank = { 'CRÍTICA': 0, 'ALTA': 1, 'MEDIA': 2, 'BAJA': 3 };
  const sorted = [...rows].sort((a, b) => (tierRank[map[a.codigo].tier] - tierRank[map[b.codigo].tier]) || (b.recommendedMinutes - a.recommendedMinutes));
  let md = `# 🗺️ Mapa de Cobertura ENCAPS 2026-II (barrido por compendio · 03-jul)\n\n`;
  md += `Fuente autoritativa = **compendios DR LOPEZ + manuales THEOMED** (temario completo) cotejado con **Tendencias QX /400** + **forecast walk-forward v2** + videos **QX (165)** y **Theomed/Drive (por área)**. Objetivo: 0 temas al descubierto; vueltas/tiempo ∝ rentabilidad. Examen 20-ago FIJO.\n\n`;
  if (COTEJO.overall && COTEJO.overall.combinedPct) {
    md += `## 📊 Cobertura de los libros base (vs exámenes + forecast)\n- **DR LOPEZ solo: ${COTEJO.overall.lopezPct}%** · **THEOMED solo: ${COTEJO.overall.theomedPct}%** · **combinados: ${COTEJO.overall.combinedPct}%**.\n- ${COTEJO.overall.note}\n\n`;
  }
  md += `## Tabla maestra (ordenada por prioridad)\n\n| Código | Tema | Tier | Vueltas | Min/día | QX | Theomed | Extenso | Gaps |\n|---|---|---|---|---|---|---|---|---|\n`;
  for (const r of sorted) {
    md += `| **${r.codigo}** | ${r.subtema.slice(0, 34)} | ${map[r.codigo].tier} | ${map[r.codigo].vueltas} | ${map[r.codigo].min} | ${r.qxVideos} | ${r.theomedVideos} | ${r.extenso ? '✔' : '·'} | ${(r.gaps || []).length} |\n`;
  }
  md += `\n## Detalle por tema (qué mirar + qué leer)\n`;
  for (const r of sorted) {
    md += `\n### ${r.codigo} · ${r.subtema} — **${map[r.codigo].tier}** (${map[r.codigo].vueltas} vueltas · ${map[r.codigo].min} min)\n`;
    md += `- **Frecuencia/rentabilidad:** ${r.examFreqNote || '—'}\n`;
    md += `- **Videos a mirar:** ${r.videosGuidance || '—'}\n`;
    const cc = (COTEJO.codes && COTEJO.codes[r.codigo]) || {};
    const dv = (COTEJO.areas && COTEJO.areas[(r.codigo.match(/^[IVX]+/) || [''])[0]]) || [];
    md += `- **📕 DÓNDE LEER — López:** ${map[r.codigo].compendioUrl}  ·  cobertura ${cc.lopezCubre || '?'}\n`;
    md += `- **📗 DÓNDE LEER — Theomed:** ${cc.theomedManual || '(manual del área)'}  ·  cobertura ${cc.theomedCubre || '?'}  ·  ${THEOMED_MANUALES}\n`;
    md += `- **🎬 DÓNDE VER VIDEOS (orden QX→Theomed→Drive):** QX(${map[r.codigo].videosExtra.length}) · Theomed área ${map[r.codigo].theomedUrl} · ${dv.map(v => `${v.academia} ${v.url}`).join(' · ')}\n`;
    if ((cc.soloTheomed || []).length) md += `- **➕ Solo Theomed:** ${cc.soloTheomed.join(' · ')}\n`;
    if ((cc.soloLopez || []).length) md += `- **➕ Solo López:** ${cc.soloLopez.join(' · ')}\n`;
    if ((cc.gapAmbos || []).length) md += `- **⛔ Ningún libro (→normativa/video):** ${cc.gapAmbos.join(' · ')}\n`;
    if ((r.gaps || []).length) md += `- **⚠ Gaps (leer fuera de QX):** ${r.gaps.join(' · ')}\n`;
    if ((map[r.codigo].gapSources || []).length) md += `- **📖 Fuentes normativa:** ${map[r.codigo].gapSources.map(s => `${s.label} ${s.url}`).join(' · ')}\n`;
    md += `- **📚 Temario López (${(r.compendioSubtemas || []).length}):** ${(r.compendioSubtemas || []).join(' · ')}\n`;
  }
  fs.writeFileSync(path.join(ROOT, 'DATA', 'ENCAPS', 'MAPA_COBERTURA_2026-2.md'), md, 'utf8');
}

console.log('OK · src/lib/encapsCobertura.ts (' + Object.keys(map).length + ' temas)' + (FULL ? ' · DATA/ENCAPS/MAPA_COBERTURA_2026-2.md' : ' · (MAPA_COBERTURA no regenerado: modo re-tier)'));
const crit = Object.keys(map).filter(k => map[k].tier === 'CRÍTICA');
const reb = Object.keys(map).filter(k => map[k].rebote);
const gapsTot = Object.values(map).reduce((n, m) => n + (m.gaps || []).length, 0);
console.log('CRÍTICOS v3:', crit.join(', '), '| ALTA-rebote:', reb.join(', '), '| nuevos:', Object.keys(NUEVOS).join(', '), '| gaps totales:', gapsTot);

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
