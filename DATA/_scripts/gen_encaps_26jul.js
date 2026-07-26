// gen_encaps_26jul.js — RECONSTRUCCIÓN FINAL D1 = DOM 26-jul-2026 → EXAMEN dom 9-ago.
//
// Diferencia clave con los reshifts anteriores: los DOMINGOS ya no se saltan. Joseph liberó
// 18:00-22:00 (vuelve del negocio ~16-17h) = 4 h reales. Por eso:
//   · d1 = DOM 26-jul (4 h noche) lleva el tema MÁS LIVIANO del plan (I-5+I-6, 3 vueltas/55 min):
//     ningún crítico se arriesga a una franja corta y con fatiga.
//   · d8 = DOM 2-ago (4 h noche) = REPASO dirigido de los 2 gaps reales: ÁREA V/Gestión (22 % del
//     examen, 0 mapas conceptuales en QX — pero Theomed acaba de publicar REPASOS de Gestión
//     sesiones 22/07 y 24/07) + III-9 (mayor miss histórico del backtest).
// Los 7 CRÍTICOS (I-3·V-2·II-1·II-3·III-5·II-8·II-11) reciben día COMPLETO entre semana.
// Orden con los swaps de spacing ya incorporados: II-1 y II-8 adelantados (no al final).
//
// Lee el estado VIVO (que ya trae las correcciones de la auditoría: prioridad CRÍTICA en los 7,
// secundarios normalizados, videos de la cola maps-only) y sólo re-mapea día/fecha + re-distribuye
// los 6 temas fusionados. NO restaura del backup canónico (eso revertiría los fixes).
//   node DATA/_scripts/gen_encaps_26jul.js   → emite _encaps_26jul.sql
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs'); const path = require('path');
const URL = 'https://qacynpqdrorpuegsmtcy.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhY3lucHFkcm9ycHVlZ3NtdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODI3ODIsImV4cCI6MjA4OTk1ODc4Mn0.bQk5OCtaSuKqr31Gve1lZ2XBUQ46IvR50yVBeqDSsZE';
const q = s => String(s == null ? '' : s).replace(/'/g, "''");
const J = o => JSON.stringify(o == null ? null : o).replace(/'/g, "''");

// día → [fecha, weekday, código primario]   (null = fila especial que se construye aparte)
const PLAN = [
  [1,  '2026-07-26', 'Domingo',   'I-5+I-6'],  // 4 h noche · el tema más liviano
  [2,  '2026-07-27', 'Lunes',     'I-3'],      // CRÍTICO #1 · día completo
  [3,  '2026-07-28', 'Martes',    'V-2'],      // CRÍTICO
  [4,  '2026-07-29', 'Miércoles', 'II-1'],     // CRÍTICO · área REY · 13 mapas
  [5,  '2026-07-30', 'Jueves',    'II-3'],     // CRÍTICO
  [6,  '2026-07-31', 'Viernes',   'III-5'],    // CRÍTICO
  [7,  '2026-08-01', 'Sábado',    'II-8'],     // CRÍTICO
  [8,  '2026-08-02', 'Domingo',   null],       // 4 h noche · ÁREA V + III-9
  [9,  '2026-08-03', 'Lunes',     'II-11'],    // CRÍTICO
  [10, '2026-08-04', 'Martes',    'I-1'],
  [11, '2026-08-05', 'Miércoles', 'V-3'],
  [12, '2026-08-06', 'Jueves',    'I-4'],      // 🏁 LÍMITE DE CONTENIDO
];
// Los 6 temas que no alcanzan día propio, distribuidos UNO por día en los últimos días-tema,
// del menos al más rentable (el último día recibe el menos rentable).
const FUSION = [
  { dia: 12, cods: ['III-8'] }, { dia: 11, cods: ['III-2'] }, { dia: 10, cods: ['I-2'] },
  { dia: 9,  cods: ['IV-1+IV-2'] }, { dia: 7, cods: ['V-1'] }, { dia: 6, cods: ['III-9'] },
];

(async () => {
  const sb = createClient(URL, KEY);
  const { data, error } = await sb.from('study_schedule').select('*').eq('examen', 'ENCAPS');
  if (error) { console.error(error); process.exit(1); }
  const byCode = {}; for (const r of data) if (r.codigo) byCode[r.codigo] = r;
  // todos los secundarios que existen hoy, indexados por código (para no perder ninguno)
  const secByCode = {};
  for (const r of data) for (const s of (r.temas_secundarios || [])) secByCode[s.codigo] = s;

  const L = ['-- ENCAPS D1 = DOM 26-jul-2026 · contenido cierra 6-ago · 7-ago mock1 · 8-ago medio día · 9-ago EXAMEN',
    '-- Domingos 26-jul y 2-ago = 18:00-22:00 (4h). Los 7 críticos con día COMPLETO entre semana.',
    'BEGIN;', 'DROP TABLE IF EXISTS study_schedule_bk_0726;',
    "CREATE TABLE study_schedule_bk_0726 AS SELECT * FROM study_schedule WHERE examen='ENCAPS';"];

  // 1) re-mapear los días de contenido (mantiene todo el payload vivo del tema)
  for (const [dia, fecha, wd, cod] of PLAN) {
    if (!cod) continue;
    const r = byCode[cod];
    if (!r) throw new Error('falta código en el estado vivo: ' + cod);
    L.push(`UPDATE study_schedule SET dia=${dia + 100}, fecha='${fecha}', weekday='${wd}', ` +
      `temas_secundarios='[]'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND codigo='${q(cod)}' AND tipo='deep_prime';`);
  }
  // 2) el domingo 2-ago (d8): repaso de los 2 gaps. Reutiliza la fila de repaso que ya existe.
  L.push(`UPDATE study_schedule SET dia=108, fecha='2026-08-02', weekday='Domingo', tipo='repaso', codigo='V-2', prioridad='ALTA', ` +
    `subtema='${q('🌙 DOMINGO NOCHE 18:00-22:00 (4h · post-jornada) · LOS 2 GAPS REALES: (1) ÁREA V / GESTIÓN = 22% del examen y CERO mapas conceptuales en QX → banqueo dirigido V-2 PEI/POI/FODA + V-1 + V-3 + V-7+V-10 + V-MED, apoyado en los REPASOS DE GESTIÓN que Theomed acaba de publicar (sesiones 22/07 y 24/07); (2) III-9 derechos del paciente / HC / SUSALUD = el mayor miss histórico del backtest. Corte 22:00 → 7h de sueño intactas')}', ` +
    `extra='${J({ actividad: 'Domingo noche · ÁREA V (22%, sin mapas) + rescate III-9', accion: 'Banqueo dirigido de Gestión (repasos Theomed 22/07 y 24/07) + repaso de III-9; sin contenido nuevo pesado', vueltas: 0, minObjetivo: 240, tierCobertura: 'GAP-AREA-V + RESCATE-III-9', weekday: 'DOM', corte: '22:00 · sueño 7h intacto' })}'::jsonb, ` +
    `temas_secundarios='[]'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND tipo='repaso' AND fecha='2026-08-02';`);
  // 3) tail
  L.push(`UPDATE study_schedule SET dia=113, fecha='2026-08-07', weekday='Viernes', updated_at=now() WHERE examen='ENCAPS' AND fecha='2026-08-07';`);
  L.push(`UPDATE study_schedule SET dia=114, fecha='2026-08-08', weekday='Sábado', updated_at=now() WHERE examen='ENCAPS' AND fecha='2026-08-08';`);
  L.push(`UPDATE study_schedule SET dia=115, fecha='2026-08-09', weekday='Domingo', updated_at=now() WHERE examen='ENCAPS' AND tipo='examen';`);
  // 4) borrar lo que quede fuera (la fila de repaso del 26-jul que ya no se usa, si sobra)
  L.push("DELETE FROM study_schedule WHERE examen='ENCAPS' AND dia < 100;");
  L.push("UPDATE study_schedule SET dia = dia - 100 WHERE examen='ENCAPS' AND dia >= 100;");
  // 5) re-inyectar los 6 fusionados CON sus sub-temas (nada se pierde)
  const usados = new Set(PLAN.map(p => p[3]).filter(Boolean));
  for (const { dia, cods } of FUSION) {
    const arr = [];
    for (const c of cods) {
      const src = byCode[c] || {};
      arr.push({ codigo: c, subtema: (src.subtema || secByCode[c]?.subtema || '') + ' · fusionado (ventana corta)',
        prioridad: c === 'III-9' || c === 'V-1' || c === 'III-8' ? 'ALTA' : (c === 'IV-1+IV-2' ? 'BAJA' : 'MEDIA') });
      usados.add(c);
    }
    L.push(`UPDATE study_schedule SET temas_secundarios = COALESCE(temas_secundarios,'[]'::jsonb) || '${J(arr)}'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND dia=${dia};`);
  }
  // 6) los sub-temas restantes (los que colgaban de los fusionados) se reparten en los días de contenido
  const resto = Object.values(secByCode).filter(s => !usados.has(s.codigo));
  resto.forEach((s, i) => {
    const dia = PLAN.filter(p => p[3])[i % PLAN.filter(p => p[3]).length][0];
    L.push(`UPDATE study_schedule SET temas_secundarios = COALESCE(temas_secundarios,'[]'::jsonb) || '${J([s])}'::jsonb, updated_at=now() WHERE examen='ENCAPS' AND dia=${dia};`);
  });
  // 7) borrar filas huérfanas de deep_prime que no entraron al plan (los fusionados ya viven como secundario)
  L.push(`DELETE FROM study_schedule WHERE examen='ENCAPS' AND tipo='deep_prime' AND codigo NOT IN (${PLAN.filter(p => p[3]).map(p => `'${q(p[3])}'`).join(',')});`);
  L.push('COMMIT;');
  fs.writeFileSync(path.join(__dirname, '_encaps_26jul.sql'), L.join('\n'), 'utf8');
  console.log(`OK · ${PLAN.length} días de plan (11 temas con día propio + 1 domingo de repaso) + tail 3 = 15 días`);
  console.log(`   fusionados: ${FUSION.flatMap(f => f.cods).join(', ')} · sub-temas re-repartidos: ${resto.length}`);
})();
