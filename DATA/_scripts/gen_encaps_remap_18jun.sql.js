// gen_encaps_remap_18jun.sql.js — ENCAPS (17-jun tampoco se estudió → arranca 18-jun).
// EXAMEN FIJO 20-ago. 18-jun→20-ago = 55 días hábiles (1 menos que 17-jun) → para conservar
// los 45 temas + 35 simulacros + examen, se FUSIONAN 2 temas afines del bloque III (III-4+III-7)
// en un día combinado (mismo patrón que I-5+I-6, I-11+I-12, III-6+III-10). 44 días-tema.
// Preserva contenido (videos/nts/material): UPDATE por codigo, solo dia/fecha. Merge III-7→III-4 al inicio.
const fs=require('fs'); const path=require('path');
const WD=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const fromISO=s=>new Date(s+'T12:00:00Z'); const iso=d=>d.toISOString().slice(0,10);
const addDays=(s,n)=>{const d=fromISO(s);d.setUTCDate(d.getUTCDate()+n);return iso(d);};
const dow=s=>fromISO(s).getUTCDay(); const wd=s=>WD[dow(s)]; const q=s=>"'"+String(s).replace(/'/g,"''")+"'";

// 45 temas → 44 entradas: III-4 y III-7 fusionados (último bloque de estudio, ambos bloque III)
const topics=['II-3','II-1','II-2','I-4','II-4','II-6','V-1','II-11','I-1','I-2','I-3','II-5','II-7','II-8','II-9','II-10','III-1','III-3','III-9','V-2','V-6','IV-1','I-5+I-6','I-7','I-8','I-9','I-11+I-12','II-12','II-13','III-2','III-5','III-6+III-10','III-8','IV-2','IV-3','IV-4','IV-5','IV-6','IV-7','V-3','V-7','V-10','I-10','III-4+III-7'];
const sims=[];
for(let i=1;i<=9;i++)sims.push(`QX Simulacro Virtual N°${String(i).padStart(2,'0')}`);
['2025-I','2025-II','2026-I'].forEach(y=>sims.push(`ENCAPS oficial ${y} · banco QX`));
['15-may','29-may','12-jun','26-jun','10-jul','24-jul','07-ago','21-ago'].forEach(d=>sims.push(`Theomed Simulacro ${d}`));
['A-1','B-1','A-2','B-2'].forEach(t=>sims.push(`Theomed EXAMEN TIPO ${t}`));
['2023-I','2023-II','2024-I','2024-II'].forEach(y=>sims.push(`ENCAPS oficial ${y} · autogestión`));
for(let i=1;i<=7;i++)sims.push(`Simulacro propio / banco extra #${i}`);
if(topics.length!==44||sims.length!==35)throw new Error('counts '+topics.length+'/'+sims.length);

const START='2026-06-18', EXAM='2026-08-20';
const DIAS_EXAMEN=new Set(['2026-08-19']);
const satCounts=[2,3,3,3,3,3,3,3,3]; // 9 sábados = 26
const dxCounts=[9];                  // 1 día-examen = 9  → total 35

const rows=[]; let cur=START,dia=0,ti=0,si=0,satI=0,dxI=0;
while(cur<=EXAM){
  if(dow(cur)===0){cur=addDays(cur,1);continue;}
  dia++;
  if(cur===EXAM){rows.push({dia,fecha:cur,wd:wd(cur),role:'examen'});}
  else if(DIAS_EXAMEN.has(cur)){const n=dxCounts[dxI++];rows.push({dia,fecha:cur,wd:wd(cur),role:'dx',sims:sims.slice(si,si+n)});si+=n;}
  else if(dow(cur)===6){const n=satCounts[satI++]??2;rows.push({dia,fecha:cur,wd:wd(cur),role:'sat',sims:sims.slice(si,si+n)});si+=n;}
  else {rows.push({dia,fecha:cur,wd:wd(cur),role:'topic',codigo:topics[ti++]});}
  cur=addDays(cur,1);
}
if(ti!==44)throw new Error('temas='+ti);
if(si!==35)throw new Error('sims='+si);

const L=['-- ENCAPS 18-jun (examen FIJO 20-ago) · backup study_schedule_backup_v4_20260613','BEGIN;'];
// 1) Fusionar III-7 dentro de III-4 (día combinado, conserva subtema + videos de ambos)
L.push("UPDATE study_schedule t SET codigo='III-4+III-7', subtema = COALESCE(t.subtema,'') || ' ➕ ' || COALESCE(s.subtema,''), videos = COALESCE(t.videos,'[]'::jsonb) || COALESCE(s.videos,'[]'::jsonb), updated_at=now() FROM (SELECT subtema, videos FROM study_schedule WHERE examen='ENCAPS' AND codigo='III-7') s WHERE t.examen='ENCAPS' AND t.codigo='III-4';");
L.push("DELETE FROM study_schedule WHERE examen='ENCAPS' AND codigo='III-7';");
// 2) offset para renumerar sin colisión de PK (examen,dia)
L.push("UPDATE study_schedule SET dia = dia + 1000 WHERE examen='ENCAPS';");
for(const r of rows.filter(x=>x.role==='topic'))
  L.push(`UPDATE study_schedule SET dia=${r.dia}, fecha=${q(r.fecha)}, weekday=${q(r.wd)}, tipo='deep_prime', updated_at=now() WHERE examen='ENCAPS' AND codigo=${q(r.codigo)};`);
L.push("DELETE FROM study_schedule WHERE examen='ENCAPS' AND dia >= 1000;");
const cols='(examen, dia, fecha, weekday, tipo, subtema, prioridad, simulacro, extra, updated_at)';
for(const r of rows.filter(x=>x.role==='sat'||x.role==='dx')){
  const rango=`${sims.indexOf(r.sims[0])+1}-${sims.indexOf(r.sims[r.sims.length-1])+1}`;
  const label=r.role==='dx'?'DÍA-EXAMEN (exam-only · recta final)':'Sábado de exámenes';
  const sub=`${label} · Simulacros ${rango} (${r.sims.length}): ${r.sims.join(' · ')}`;
  const extra=JSON.stringify({examDay:r.role==='dx',sims:r.sims.map(fu=>({n:sims.indexOf(fu)+1,label:`Simulacro #${sims.indexOf(fu)+1}`,fuente:fu,duracion:'~2h 50min · 100Q'}))});
  const prim=JSON.stringify({clave:r.sims[0],label:`Simulacros ${rango} (${r.sims.length})`,duracion:'2h 50min'});
  L.push(`INSERT INTO study_schedule ${cols} VALUES ('ENCAPS', ${r.dia}, ${q(r.fecha)}, ${q(r.wd)}, 'simulacro', ${q(sub)}, NULL, ${q(prim)}::jsonb, ${q(extra)}::jsonb, now());`);
}
const ex=rows.find(x=>x.role==='examen');
L.push(`INSERT INTO study_schedule ${cols} VALUES ('ENCAPS', ${ex.dia}, ${q(ex.fecha)}, ${q(ex.wd)}, 'examen', 'EXAMEN ENCAPS 2026-II · día tope del plan (20-ago)', NULL, NULL, NULL, now());`);
L.push('COMMIT;');
fs.writeFileSync(path.join(__dirname,'_encaps_remap_18jun.sql'),L.join('\n'),'utf8');
const tr=rows.filter(x=>x.role==='topic');
console.log(`OK total=${dia} temas=${ti}(${tr[0].fecha}…${tr[tr.length-1].fecha}) sims=${si} examen=${ex.fecha}(${ex.wd}) diaExamen=${[...DIAS_EXAMEN]}`);
console.log('D1=18-jun · TOTAL encapsPlan.ts =', dia);
