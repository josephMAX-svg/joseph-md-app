// Genera el SQL del refactor MULTI-TEMA (front-load ≤20 días, Pareto):
//  - Días 6-20: temas_secundarios = temas adicionales (subtema/prioridad leídos de su fila origen).
//  - Días >=21 (deep_prime): se convierten en días de REPASO (sin tema nuevo).
// Mantiene intactos los temas PRINCIPALES de los días 1-20 (ya front-loaded por rentabilidad).
// node DATA/_scripts/gen_encaps_multitema_24jun.sql.js > DATA/_scripts/_encaps_multitema_24jun.sql
const SEC = {
  6:  ['II-6'], 7: ['II-9'], 8: ['II-7'], 9: ['II-5'], 11: ['II-10'], 12: ['II-4'],
  13: ['III-1'], 14: ['III-4+III-7'], 15: ['I-11+I-12', 'V-6'],
  17: ['III-6+III-10', 'I-7'], 18: ['II-2', 'I-10', 'III-3'],
  19: ['V-7+V-10', 'IV-4', 'IV-3+IV-5'],
  20: ['II-12', 'IV-6+IV-7', 'I-8', 'I-9', 'II-13'],
};
const arr = (xs) => 'ARRAY[' + xs.map(c => `'${c}'`).join(',') + ']';
let sql = 'BEGIN;\n';
sql += 'DROP TABLE IF EXISTS study_schedule_multitema_backup_24jun;\n';
sql += "CREATE TABLE study_schedule_multitema_backup_24jun AS SELECT * FROM study_schedule WHERE examen='ENCAPS';\n\n";
sql += '-- 1) temas_secundarios en días 6-20 (subtema/prioridad leídos de la fila origen, ANTES de nulificar)\n';
for (const dia of Object.keys(SEC).map(Number).sort((a, b) => a - b)) {
  sql += `UPDATE study_schedule t SET temas_secundarios = (\n` +
         `  SELECT jsonb_agg(jsonb_build_object('codigo',s.codigo,'subtema',s.subtema,'prioridad',s.prioridad) ORDER BY s.dia)\n` +
         `  FROM study_schedule s WHERE s.examen='ENCAPS' AND s.codigo = ANY(${arr(SEC[dia])})), updated_at=now()\n` +
         `WHERE t.examen='ENCAPS' AND t.dia=${dia};\n`;
}
sql += '\n-- 2) días >=21 (deep_prime) → REPASO (sin tema nuevo): todo el temario ya se vio en días 1-20\n';
sql += `UPDATE study_schedule SET tipo='repaso', codigo=NULL,\n` +
       `  subtema='Repaso espaciado + banco de preguntas + mapas conceptuales', prioridad=NULL, nts=NULL,\n` +
       `  videos='[]'::jsonb, theomed='[]'::jsonb, material_comp='[]'::jsonb, n_videos=0, video_min=0, updated_at=now()\n` +
       `WHERE examen='ENCAPS' AND tipo='deep_prime' AND dia>=21;\n`;
sql += '\nCOMMIT;\n';
process.stdout.write(sql);
