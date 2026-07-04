// gen_encaps_cola_alinear.js — ALINEA la COLA QX (study_schedule.videos) con la COBERTURA:
// cada día = el SET CURADO de videos que el compendio del tema realmente pide (videosExtra de
// encapsCobertura), no solo los 1-2 estrictamente mapeados. Ej. I-3 pasa de 2 → 7 videos (vigilancia +
// endemias/brotes + conceptos epi + causalidad + mediciones + ASIS + historia natural = el bloque epi
// completo que el compendio mete en I-3). Fallback a los videos estrictos si un código no tiene curado.
// Dedup por URL. node DATA/_scripts/gen_encaps_cola_alinear.js [--apply]
const fs = require('fs'); const { createClient } = require('@supabase/supabase-js');
const URL = 'https://qacynpqdrorpuegsmtcy.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhY3lucHFkcm9ycHVlZ3NtdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODI3ODIsImV4cCI6MjA4OTk1ODc4Mn0.bQk5OCtaSuKqr31Gve1lZ2XBUQ46IvR50yVBeqDSsZE';
const SB = 'C:/Users/JOSEPH~1/AppData/Local/Temp/claude/D--joseph-md-app/2b1d4275-ceb5-4f8d-9ab0-d4dbbd76c52a';

// videosExtra por código (set curado por la cobertura)
const covSrc = fs.readFileSync('src/lib/encapsCobertura.ts', 'utf8');
const cob = JSON.parse(covSrc.match(/ENCAPS_COBERTURA[^=]*=\s*(\{[\s\S]*\});/)[1]);
// videos estrictos (165 reales + mapeo) como fallback
const vids = JSON.parse(fs.readFileSync(SB + '/scratchpad/qx_videos_165.json', 'utf8'));
const outMap = JSON.parse(fs.readFileSync(SB + '/tasks/wu38gbri1.output', 'utf8'));
const mapa = (outMap.result && outMap.result.mapa) || outMap.mapa; const byI = {}; for (const m of mapa) byI[m.i] = m;
const codeStrict = {}; const seenU = new Set();
for (const v of vids) { const m = byI[v.i]; if (!m || m.dup || !v.url || seenU.has(v.url)) continue; seenU.add(v.url); (codeStrict[m.code] = codeStrict[m.code] || []).push({ titulo: v.sub, url: v.url }); }
const dedup = (arr) => { const s = new Set(); const o = []; for (const v of arr) { if (!v.url || s.has(v.url)) continue; s.add(v.url); o.push({ titulo: v.titulo, url: v.url }); } return o; };
const videosFor = (code, isPrimary) => {
  const ex = (cob[code] && cob[code].videosExtra) || []; const st = codeStrict[code] || [];
  // PRIMARIO del día = unión curado ∪ estricto (no pierde NINGÚN video del tema principal).
  if (isPrimary) return dedup([...ex, ...st]);
  // SECUNDARIO = curado (lo que el compendio pide); si vacío, estrictos capados a 4 (no re-inflar).
  return ex.length ? dedup(ex) : dedup(st).slice(0, 4);
};

(async () => {
  const sb = createClient(URL, KEY);
  const { data, error } = await sb.from('study_schedule').select('dia,codigo,temas_secundarios').eq('examen', 'ENCAPS').eq('tipo', 'deep_prime').order('dia');
  if (error) throw error;
  const apply = process.argv.includes('--apply');
  let total = 0; const resumen = [];
  for (const r of data) {
    const codes = [r.codigo, ...((r.temas_secundarios || []).map(s => s.codigo))].filter(Boolean);
    const seen = new Set(); const vlist = [];
    codes.forEach((c, idx) => { for (const vv of videosFor(c, idx === 0)) { if (seen.has(vv.url)) continue; seen.add(vv.url); vlist.push({ titulo: vv.titulo, url: vv.url, code: c, slides: null, dur: null }); } });
    total += vlist.length; resumen.push(`${r.codigo}=${vlist.length}`);
    if (apply) {
      const { error: e } = await sb.from('study_schedule').update({ videos: vlist, updated_at: new Date().toISOString() }).eq('examen', 'ENCAPS').eq('dia', r.dia);
      if (e) throw new Error(`dia ${r.dia}: ${e.message}`);
    }
  }
  console.log(apply ? '✔ APLICADO' : '(dry-run · --apply para escribir)', '·', data.length, 'días ·', total, 'video-asignaciones');
  console.log('por día:', resumen.join(' · '));
})();
