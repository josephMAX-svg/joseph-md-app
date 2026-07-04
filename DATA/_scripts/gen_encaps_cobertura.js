// gen_encaps_cobertura.js — desde el barrido de cobertura (cobertura_final.json) emite:
//  1) src/lib/encapsCobertura.ts   (code → {tier, vueltas, min, qxN, theomedN, extenso, gaps, guidance, temario})
//  2) DATA/ENCAPS/MAPA_COBERTURA_2026-2.md   (doc maestro humano)
//  3) --apply → actualiza study_schedule.extra (vueltas + minObjetivo) por código en Supabase (anon UPDATE).
// node DATA/_scripts/gen_encaps_cobertura.js [--apply]
const fs = require('fs'); const path = require('path');
const SB = 'C:/Users/JOSEPH~1/AppData/Local/Temp/claude/D--joseph-md-app/2b1d4275-ceb5-4f8d-9ab0-d4dbbd76c52a/scratchpad/cobertura_final.json';
const rows = JSON.parse(fs.readFileSync(SB, 'utf8'));

// 1) lib TS
const map = {};
for (const r of rows) {
  map[r.codigo] = {
    tier: r.rentabilidadTier, vueltas: r.recommendedVueltas, min: r.recommendedMinutes,
    qxN: r.qxVideos, theomedN: r.theomedVideos, extenso: !!r.extenso,
    freq: r.examFreqNote || '', guidance: r.videosGuidance || '',
    gaps: r.gaps || [], temario: r.compendioSubtemas || [],
  };
}
const header = `// AUTO-GENERADO por DATA/_scripts/gen_encaps_cobertura.js — NO editar a mano.\n` +
  `// Mapa de cobertura por tema (barrido compendio DR LOPEZ × Tendencias/forecast × QX/Theomed, 03-jul).\n` +
  `// tier=rentabilidad · vueltas=repeticiones espaciadas · min=minutos núcleo/día · qxN/theomedN=nº videos a mirar\n` +
  `// extenso=merece bloque largo · guidance=cuántos/cuáles videos · gaps=sub-temas a leer en compendio/Drive · temario=índice compendio.\n`;
const body = `export interface CoberturaTema {\n` +
  `  tier: 'CRÍTICA' | 'ALTA' | 'MEDIA' | 'BAJA'; vueltas: number; min: number;\n` +
  `  qxN: number; theomedN: number; extenso: boolean; freq: string; guidance: string;\n` +
  `  gaps: string[]; temario: string[];\n}\n` +
  `export const ENCAPS_COBERTURA: Record<string, CoberturaTema> = ${JSON.stringify(map, null, 1)};\n`;
fs.writeFileSync(path.join(__dirname, '..', '..', 'src', 'lib', 'encapsCobertura.ts'), header + body, 'utf8');

// 2) doc maestro
const tierRank = { 'CRÍTICA': 0, 'ALTA': 1, 'MEDIA': 2, 'BAJA': 3 };
const sorted = [...rows].sort((a, b) => (tierRank[a.rentabilidadTier] - tierRank[b.rentabilidadTier]) || (b.recommendedMinutes - a.recommendedMinutes));
let md = `# 🗺️ Mapa de Cobertura ENCAPS 2026-II (barrido por compendio · 03-jul)\n\n`;
md += `Fuente autoritativa = **compendios DR LOPEZ** (temario completo) cotejado con **Tendencias QX /400** + **forecast walk-forward v2** + videos **QX (165)** y **Theomed (por área)**. Objetivo: 0 temas al descubierto; vueltas/tiempo ∝ rentabilidad. Examen 20-ago FIJO.\n\n`;
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
