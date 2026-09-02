/**
 * liviano_reslot_viernes.js — garantiza la invariante del plan LIVIANO Academia:
 * las filas "VIERNES CASO" caen en VIERNES reales. Reordena LIV_DIAS conservando el orden
 * relativo del contenido y de los casos; renumera d y recalcula wd. Las FECHAS no cambian
 * (ya vienen re-fechadas L-V por remap_inicio.js). Si hay más viernes que casos, se saltan
 * los primeros viernes (semana parcial de arranque) para que los casos cierren semanas completas.
 *
 *   node DATA/_scripts/liviano_reslot_viernes.js
 */
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', '..', 'src', 'lib', 'livianoStudyPlan.ts');
const WD = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const dow = (iso) => new Date(iso + 'T12:00:00Z').getUTCDay();

let s = fs.readFileSync(P, 'utf8');
const marker = 'LIV_DIAS: DiaLiviano[] = ';
const i = s.indexOf(marker);
if (i < 0) throw new Error('marker LIV_DIAS no encontrado');
const start = i + marker.length;
const end = s.indexOf('];', start) + 1;
const rows = JSON.parse(s.slice(start, end));

const fechas = rows.map((r) => r.fecha); // orden cronológico, ya L-V
const isCase = (r) => /^VIERNES CASO/i.test(r.tema || '') || /^VIERNES CASO/i.test(r.estudio || '');
const casos = rows.filter(isCase);
const contenido = rows.filter((r) => !isCase(r));
const viernes = fechas.filter((f) => dow(f) === 5);
const skipFirst = Math.max(0, viernes.length - casos.length);
const viernesConCaso = new Set(viernes.slice(skipFirst));
if (viernesConCaso.size !== casos.length) throw new Error(`casos ${casos.length} vs viernes disponibles ${viernesConCaso.size}`);

let ci = 0, ki = 0;
const out = fechas.map((fecha, idx) => {
  const src = viernesConCaso.has(fecha) ? casos[ki++] : contenido[ci++];
  if (!src) throw new Error('sin fila para ' + fecha);
  return { ...src, d: idx + 1, fecha, wd: WD[dow(fecha)] };
});
if (ci !== contenido.length || ki !== casos.length) throw new Error(`sobran filas: contenido ${contenido.length - ci}, casos ${casos.length - ki}`);

const bad = out.filter((r) => isCase(r) && r.wd !== 'Vie').length;
s = s.slice(0, start) + JSON.stringify(out) + s.slice(end);
fs.writeFileSync(P, s, 'utf8');
console.log(`LIVIANO reslot ✓ ${out.length} filas · casos en viernes: ${casos.length - bad}/${casos.length} · viernes sin caso: ${skipFirst} (${viernes.slice(0, skipFirst).join(', ') || '—'})`);
