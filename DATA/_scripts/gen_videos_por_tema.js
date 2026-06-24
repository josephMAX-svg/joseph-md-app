// Genera src/lib/encapsVideosPorTema.ts (codigo -> videos QX) desde Supabase study_schedule.
// Permite renderizar varios temas/día (refactor multi-tema). node DATA/_scripts/gen_videos_por_tema.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const URL = 'https://qacynpqdrorpuegsmtcy.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhY3lucHFkcm9ycHVlZ3NtdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODI3ODIsImV4cCI6MjA4OTk1ODc4Mn0.bQk5OCtaSuKqr31Gve1lZ2XBUQ46IvR50yVBeqDSsZE';

(async () => {
  const sb = createClient(URL, KEY);
  const { data, error } = await sb.from('study_schedule').select('codigo,videos')
    .eq('examen', 'ENCAPS').eq('tipo', 'deep_prime').order('codigo');
  if (error) { console.error(error); process.exit(1); }
  const map = {};
  for (const row of data) {
    if (!row.codigo || !Array.isArray(row.videos)) continue;
    const vids = row.videos
      .filter(v => v && v.titulo)
      .map(v => ({ titulo: v.titulo, url: v.url || null, code: v.code || row.codigo,
                   slides: v.slides || null, dur: v.duracion_min ?? v.dur ?? null }));
    if (vids.length) map[row.codigo] = vids;
  }
  const total = Object.values(map).reduce((n, a) => n + a.length, 0);
  const header = `// AUTO-GENERADO por DATA/_scripts/gen_videos_por_tema.js — NO editar a mano.\n` +
    `// Videos QX por código de tema (para renderizar varios temas/día · refactor multi-tema).\n` +
    `// ${Object.keys(map).length} temas · ${total} videos.\n`;
  const body = `export interface VideoPorTema { titulo: string; url: string | null; code: string; slides: string | null; dur: number | null }\n` +
    `export const ENCAPS_VIDEOS_POR_TEMA: Record<string, VideoPorTema[]> = ${JSON.stringify(map, null, 1)};\n`;
  const out = path.join(__dirname, '..', '..', 'src', 'lib', 'encapsVideosPorTema.ts');
  fs.writeFileSync(out, header + body);
  console.log('OK', out, '·', Object.keys(map).length, 'temas ·', total, 'videos');
})();
