// gen_encaps_cola_live.js — Reconstruye study_schedule.videos (COLA QX) desde el INVENTARIO VIVO
// scrapeado de QX Medic el 06-jul-2026 (123 videos reales: 93 vigentes + 30 huérfanos recuperados,
// clasificados a su código por workflow con verificación adversarial). Reemplaza el mapeo viejo (165)
// que tenía 22 videoIds stale + 30 huérfanos sin asignar. URLs canónicas (capId estable por curso).
//
// Fuente: scratchpad/qx_live_by_code.json  ({ code: [{titulo,url,vid}] }, 123 videos, 0 dup por url)
// Salida: study_schedule.videos por día = unión(primario + secundarios) de qx_live_by_code, tag code.
// Uso: node DATA/_scripts/gen_encaps_cola_live.js [--apply] [--maps-only]
//   --maps-only: la COLA diaria = SOLO mapas conceptuales (Joseph 18-jul: método banqueo + mapas; los
//   videos generales largos salen del plan diario y quedan de referencia en la CoberturaCard, que usa
//   el catálogo completo vía encapsCobertura). Los códigos sin mapa quedan sin video en la cola (su
//   material = banco de preguntas + resúmenes + fichas).
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const URL = 'https://qacynpqdrorpuegsmtcy.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhY3lucHFkcm9ycHVlZ3NtdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODI3ODIsImV4cCI6MjA4OTk1ODc4Mn0.bQk5OCtaSuKqr31Gve1lZ2XBUQ46IvR50yVBeqDSsZE';
const SB = process.env.SB || 'C:/Users/JOSEPH~1/AppData/Local/Temp/claude/D--joseph-md-app/2b1d4275-ceb5-4f8d-9ab0-d4dbbd76c52a';

const byCode = JSON.parse(fs.readFileSync(SB + '/scratchpad/qx_live_by_code.json', 'utf8'));

(async () => {
  const sb = createClient(URL, KEY);
  const { data, error } = await sb.from('study_schedule')
    .select('dia,codigo,temas_secundarios').eq('examen', 'ENCAPS').eq('tipo', 'deep_prime').order('dia');
  if (error) throw error;
  const apply = process.argv.includes('--apply');
  const mapsOnly = process.argv.includes('--maps-only');
  const esMapa = t => /mapa concep/i.test(t || '');
  let total = 0; const resumen = [];
  for (const r of data) {
    const codes = [r.codigo, ...((r.temas_secundarios || []).map(s => s.codigo))].filter(Boolean);
    const seen = new Set(); const vlist = [];
    for (const c of codes) for (const v of (byCode[c] || [])) {
      if (!v.url || seen.has(v.url)) continue;
      if (mapsOnly && !esMapa(v.titulo)) continue;   // método banqueo: solo mapas conceptuales en la cola
      seen.add(v.url);
      vlist.push({ titulo: v.titulo, url: v.url, code: c, slides: null, dur: null });
    }
    total += vlist.length; resumen.push(`${r.codigo}=${vlist.length}`);
    if (apply) {
      const { error: e } = await sb.from('study_schedule')
        .update({ videos: vlist, updated_at: new Date().toISOString() })
        .eq('examen', 'ENCAPS').eq('dia', r.dia);
      if (e) throw new Error(`dia ${r.dia}: ${e.message}`);
    }
  }
  console.log(apply ? '✔ APLICADO' : '(dry-run · --apply para escribir)', '·', data.length, 'días ·', total, 'video-asignaciones');
  console.log('por día:', resumen.join(' · '));
})();
