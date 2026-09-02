// gen_encaps_remap_15jun.sql.js — genera el SQL para reconstruir el cronograma ENCAPS
// (Supabase study_schedule) según el pedido de Joseph (13-jun-2026):
//   · D1 = lun 15-jun-2026
//   · TODOS los domingos LIBRES (no son días de plan)
//   · EXÁMENES sólo los sábados (2-3 por sábado) — se consolidan los 15 simulacros que
//     antes caían en sáb+dom; ningún examen se pierde
//   · 45 temas (deep_prime) en L-V, en el MISMO orden y con su MISMO contenido
//     (videos/theomed/material intactos: se actualiza sólo dia/fecha/weekday)
//   · el motor de vueltas (6/5/4/3 por prioridad) se recalcula solo desde el día-foco
//   · examen al final dentro de la ventana 15-20 ago + buffer SERUMS hasta 20-ago (techo)
// Salida: DATA/_scripts/_encaps_remap_15jun.sql  (se aplica vía Supabase execute_sql).
const fs = require('fs');
const path = require('path');
const WD = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const fromISO = (s) => new Date(s + 'T12:00:00Z');
const iso = (d) => d.toISOString().slice(0, 10);
const addDays = (s, n) => { const d = fromISO(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const dow = (s) => fromISO(s).getUTCDay();
const wd = (s) => WD[dow(s)];
const q = (s) => "'" + String(s).replace(/'/g, "''") + "'";

// 45 temas en el orden actual del plan v9: [diaViejo, codigo]. El diaViejo es la CLAVE
// para preservar el contenido (se actualiza esa fila, no se recrea).
const topics = [
  [1, 'II-3'], [2, 'II-1'], [3, 'II-2'], [4, 'I-4'], [5, 'II-4'], [6, 'II-6'], [7, 'V-1'], [8, 'II-11'], [9, 'I-1'], [10, 'I-2'],
  [11, 'I-3'], [12, 'II-5'], [13, 'II-7'], [14, 'II-8'], [15, 'II-9'], [17, 'II-10'], [18, 'III-1'], [19, 'III-3'], [20, 'III-9'], [21, 'V-2'],
  [24, 'V-6'], [25, 'IV-1'], [26, 'I-5+I-6'], [27, 'I-7'], [28, 'I-8'], [31, 'I-9'], [32, 'I-11+I-12'], [33, 'II-12'], [34, 'II-13'], [35, 'III-2'],
  [38, 'III-5'], [39, 'III-6+III-10'], [40, 'III-8'], [41, 'IV-2'], [42, 'IV-3'], [45, 'IV-4'], [46, 'IV-5'], [47, 'IV-6'], [48, 'IV-7'], [49, 'V-3'],
  [52, 'V-7'], [53, 'V-10'], [54, 'I-10'], [55, 'III-4'], [56, 'III-7'],
];

// 9 sábados de simulacros (todos los exámenes preservados; los que antes caían en domingo
// se mueven al sábado → 2 por sábado en el grueso). clave = banco/clave oficial.
const sims = [
  { sub: 'SIM #1 · Línea base diagnóstica', clave: 'CLAVE 2024-2A', n: '#1' },
  { sub: 'SIM #2 · Línea base', clave: 'CLAVE 2025-1B', n: '#2' },
  { sub: 'SIM #3 + SIM #4', clave: 'CLAVE 2025-2A + CLAVE 2024-1A', n: '#3+#4' },
  { sub: 'SIM #5 + SIM #6', clave: 'Banco mixto INFORSALUD + Bogotá-MINSA', n: '#5+#6' },
  { sub: 'SIM #7 + SIM #8', clave: 'Banco mixto USP/UNMSM + CLAVE 2025-2C', n: '#7+#8' },
  { sub: 'SIM #9 + SIM #10', clave: 'CLAVE 2026-1 mock oficial', n: '#9+#10' },
  { sub: 'SIM #11 + SIM #12 · Repaso BRUTAL bloques I+II', clave: 'Repaso I+II · 50Q dirigidas', n: '#11+#12' },
  { sub: 'SIM #13 + SIM #14 · Repaso BRUTAL III+IV+V + APEX cards rojas', clave: 'Repaso V + 30 cards rojas', n: '#13+#14' },
  { sub: 'SIM #15 MEGA-FINAL + tabla 50 conceptos (capacidad ×4: nuevos QX según liberación)', clave: 'SIM #15 MEGA-FINAL premium 100Q', n: '#15' },
];

const START = '2026-06-15';
const topicUpd = [];
const simRows = [];
let cur = START, dia = 0, ti = 0, si = 0;
// Fase 1: caminar el calendario; L-V → tema · sábado → simulacro · domingo → SKIP (sin fila)
while (ti < topics.length || si < sims.length) {
  const day = dow(cur);
  if (day === 0) { cur = addDays(cur, 1); continue; } // domingo libre: no es día de plan
  if (day === 6 && si < sims.length) { dia++; simRows.push({ dia, fecha: cur, wd: wd(cur), ...sims[si] }); si++; }
  else if (day !== 6 && ti < topics.length) { dia++; topicUpd.push({ oldDia: topics[ti][0], newDia: dia, fecha: cur, wd: wd(cur), codigo: topics[ti][1] }); ti++; }
  else if (day === 6) { /* sábado extra sin simulacro: no debería ocurrir (9 sims = 9 sáb) */ }
  else { break; } // L-V con temas agotados → a fase examen
  cur = addDays(cur, 1);
}
// Fase 2: examen el siguiente día no-domingo (lunes 17-ago)
while (dow(cur) === 0) cur = addDays(cur, 1);
dia++; const examDia = dia, examFecha = cur, examWd = wd(cur);
cur = addDays(cur, 1);
// Fase 3: buffer/transición SERUMS hasta el techo 20-ago (sin domingos)
const TECHO = '2026-08-20';
const buffers = [];
while (cur <= TECHO) {
  if (dow(cur) !== 0) { dia++; buffers.push({ dia, fecha: cur, wd: wd(cur) }); }
  cur = addDays(cur, 1);
}
const TOTAL = dia;

// ─── Emitir SQL ───
const L = [];
L.push('-- Reconstrucción ENCAPS 15-jun (backup: study_schedule_backup_v4_20260613)');
L.push('BEGIN;');
// 1) offset para liberar el espacio de PK (examen,dia)
L.push("UPDATE study_schedule SET dia = dia + 1000 WHERE examen='ENCAPS';");
// 2) temas: actualizar SÓLO dia/fecha/weekday/tipo (contenido intacto), keyed por diaViejo
for (const t of topicUpd) {
  L.push(`UPDATE study_schedule SET dia=${t.newDia}, fecha=${q(t.fecha)}, weekday=${q(t.wd)}, tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND dia=${t.oldDia + 1000}; -- ${t.codigo}`);
}
// 3) borrar lo que sobra (viejos simulacros/buffer/examen, aún con dia>=1000)
L.push("DELETE FROM study_schedule WHERE examen='ENCAPS' AND dia >= 1000;");
// 4) insertar simulacros (sábados), examen y buffers
const insCols = '(examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, updated_at)';
for (const s of simRows) {
  const simJson = JSON.stringify({ clave: s.clave, label: s.sub, duracion: '2h 50min', sims: s.n });
  L.push(`INSERT INTO study_schedule ${insCols} VALUES ('ENCAPS', ${s.dia}, ${q(s.fecha)}, ${q(s.wd)}, 'simulacro', ${q(s.sub)}, NULL, ${q(simJson)}::jsonb, now());`);
}
L.push(`INSERT INTO study_schedule ${insCols} VALUES ('ENCAPS', ${examDia}, ${q(examFecha)}, ${q(examWd)}, 'examen', 'EXAMEN ENCAPS 2026-II', NULL, NULL, now());`);
for (let i = 0; i < buffers.length; i++) {
  const b = buffers[i];
  const tipo = i === buffers.length - 1 ? 'cierre' : 'buffer';
  const sub = i === buffers.length - 1 ? 'Cierre del plan · inicio transición SERUMS + Pulso' : 'Buffer post-examen · transición SERUMS + Pulso';
  L.push(`INSERT INTO study_schedule ${insCols} VALUES ('ENCAPS', ${b.dia}, ${q(b.fecha)}, ${q(b.wd)}, '${tipo}', ${q(sub)}, NULL, NULL, now());`);
}
L.push('COMMIT;');
// verificación
L.push("-- verificación:");
L.push("-- SELECT count(*) total, count(*) FILTER (WHERE tipo='deep_prime') temas, count(*) FILTER (WHERE tipo='simulacro') sims, min(fecha), max(fecha), count(*) FILTER (WHERE extract(dow from fecha)=0) domingos FROM study_schedule WHERE examen='ENCAPS';");

const out = L.join('\n');
fs.writeFileSync(path.join(__dirname, '_encaps_remap_15jun.sql'), out, 'utf8');
console.log(`OK · temas=${topicUpd.length} sims=${simRows.length} examen=d${examDia}(${examFecha}) buffers=${buffers.length} TOTAL=${TOTAL}`);
console.log(`primer tema: d1=${topicUpd[0].fecha} · último tema: d${topicUpd[topicUpd.length - 1].newDia}=${topicUpd[topicUpd.length - 1].fecha}`);
console.log(`sims sábados: ${simRows.map((s) => s.fecha).join(', ')}`);
console.log(`examen: ${examFecha} · fin plan: ${buffers.length ? buffers[buffers.length - 1].fecha : examFecha}`);
console.log(`SKIP_DATES (domingos) para encapsPlan.ts:`);
// listar domingos en el rango [15-jun, fin]
const sundays = [];
let c2 = START; const end = buffers.length ? buffers[buffers.length - 1].fecha : examFecha;
while (c2 <= end) { if (dow(c2) === 0) sundays.push(c2); c2 = addDays(c2, 1); }
console.log('  ' + JSON.stringify(sundays));
