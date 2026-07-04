// gen_encaps_videos_remap.js — REPARA la asignación de videos QX por día.
// Bug: cada código primario tenía TODO el capítulo QX de su área volcado (12+ videos, URLs
// genéricas, duplicados/fantasmas). Fix: reconstruye day.videos desde los 165 videos QX REALES
// (_qx_videoclases_live.json, URLs reales /videoclases/{capId}/{videoId}) usando el mapeo
// video→código del agente (matching médico), dedup por URL, y arma cada día = sus código(s).
// Emite SQL (UPDATE study_schedule.videos por día). node DATA/_scripts/gen_encaps_videos_remap.js
const fs = require('fs'); const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const URL = 'https://qacynpqdrorpuegsmtcy.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhY3lucHFkcm9ycHVlZ3NtdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODI3ODIsImV4cCI6MjA4OTk1ODc4Mn0.bQk5OCtaSuKqr31Gve1lZ2XBUQ46IvR50yVBeqDSsZE';
const SB = 'C:/Users/JOSEPH~1/AppData/Local/Temp/claude/D--joseph-md-app/2b1d4275-ceb5-4f8d-9ab0-d4dbbd76c52a';

(async () => {
  const vids = JSON.parse(fs.readFileSync(SB + '/scratchpad/qx_videos_165.json', 'utf8'));
  const out = JSON.parse(fs.readFileSync(SB + '/tasks/wu38gbri1.output', 'utf8'));
  const mapa = (out.result && out.result.mapa) || out.mapa;
  if (!Array.isArray(mapa)) throw new Error('mapa no encontrado');
  const byI = {}; for (const m of mapa) byI[m.i] = m;

  // code -> [videos reales], dedup por URL, excluye dup=true
  const codeVideos = {};
  const seenUrl = new Set();
  for (const v of vids) {
    const m = byI[v.i]; if (!m) continue;
    if (m.dup) continue;                       // near-duplicate marcado por el agente
    if (!v.url || seenUrl.has(v.url)) continue; // dedup global por URL real
    seenUrl.add(v.url);
    (codeVideos[m.code] = codeVideos[m.code] || []).push({
      titulo: v.sub, url: v.url, code: m.code, slides: null, dur: null,
    });
  }

  // Lee los días deep_prime (código primario + temas_secundarios) para armar day.videos
  const sb = createClient(URL, KEY);
  const { data, error } = await sb.from('study_schedule')
    .select('dia,codigo,temas_secundarios').eq('examen', 'ENCAPS').eq('tipo', 'deep_prime').order('dia');
  if (error) throw error;

  const APPLY = process.argv.includes('--apply');
  let totalAsignados = 0; const resumen = []; const writes = [];
  for (const row of data) {
    const codes = [row.codigo, ...((row.temas_secundarios || []).map(s => s.codigo))].filter(Boolean);
    const seen = new Set(); const vlist = [];
    for (const c of codes) for (const vv of (codeVideos[c] || [])) {
      if (seen.has(vv.url)) continue; seen.add(vv.url); vlist.push(vv);
    }
    totalAsignados += vlist.length;
    resumen.push(`${row.codigo}(+${codes.length - 1}sec)=${vlist.length}`);
    writes.push({ dia: row.dia, videos: vlist });
  }
  if (APPLY) {
    for (const w of writes) {
      const { error: e } = await sb.from('study_schedule')
        .update({ videos: w.videos, updated_at: new Date().toISOString() })
        .eq('examen', 'ENCAPS').eq('dia', w.dia);
      if (e) throw new Error(`dia ${w.dia}: ${e.message}`);
    }
    console.log('✔ APLICADO a Supabase vía anon UPDATE:', writes.length, 'días');
  } else {
    fs.writeFileSync(path.join(__dirname, '_encaps_videos_remap.json'), JSON.stringify(writes), 'utf8');
    console.log('(dry-run · usa --apply para escribir)');
  }

  // Reporte
  const codesUsados = Object.keys(codeVideos).sort();
  const sinVideos = data.filter(r => {
    const codes = [r.codigo, ...((r.temas_secundarios || []).map(s => s.codigo))].filter(Boolean);
    return !codes.some(c => (codeVideos[c] || []).length);
  }).map(r => r.codigo);
  console.log('videos reales dedup:', seenUrl.size, '/ 165 (excluidos dup + urls repetidas)');
  console.log('códigos con video:', codesUsados.length, '·', codesUsados.map(c => `${c}:${codeVideos[c].length}`).join(' '));
  console.log('total video-asignaciones en días:', totalAsignados);
  console.log('días SIN ningún video:', sinVideos.length ? sinVideos.join(', ') : 'ninguno');
  console.log('resumen por día:', resumen.join(' · '));
})();
