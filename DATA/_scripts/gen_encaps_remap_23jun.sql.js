// gen_encaps_remap_23jun.sql.js — ENCAPS (20-22 jun no se estudió → arranca 23-jun, martes).
// EXAMEN FIJO 20-ago. 23-jun→20-ago = 51 días hábiles (2 menos que 20-jun) → para conservar
// los 45 temas + 35 simulacros + examen, se añade una 4ª fusión afín: IV-3+IV-5
// (Tamizaje ➕ Pruebas diagnósticas — mismo núcleo: sensibilidad/especificidad/VPP/VPN, screening).
// → 41 días-tema. día1 = mar 23-jun (1er tema; ya NO hay simulacro diagnóstico de sábado-día1).
// Fusiones idempotentes (las 3 previas son no-op; sólo IV-3+IV-5 es nueva). Merges preservan
// subtema+videos+theomed+material_comp+nts (no se pierde material).
const fs=require('fs'); const path=require('path');
const WD=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const fromISO=s=>new Date(s+'T12:00:00Z'); const iso=d=>d.toISOString().slice(0,10);
const addDays=(s,n)=>{const d=fromISO(s);d.setUTCDate(d.getUTCDate()+n);return iso(d);};
const dow=s=>fromISO(s).getUTCDay(); const wd=s=>WD[dow(s)]; const q=s=>"'"+String(s).replace(/'/g,"''")+"'";

// 45 temas → 41 entradas: III-4+III-7, IV-6+IV-7, V-7+V-10 (previas) y AHORA IV-3+IV-5 (nueva).
const topics=['II-3','II-1','II-2','I-4','II-4','II-6','V-1','II-11','I-1','I-2','I-3','II-5','II-7','II-8','II-9','II-10','III-1','III-3','III-9','V-2','V-6','IV-1','I-5+I-6','I-7','I-8','I-9','I-11+I-12','II-12','II-13','III-2','III-5','III-6+III-10','III-8','IV-2','IV-3+IV-5','IV-4','IV-6+IV-7','V-3','V-7+V-10','I-10','III-4+III-7'];
const sims=[];
// FUENTES REALES VERIFICADAS (Chrome DevTools: QxMedic 184 videoclases + Theomed). Sin filler.
for(let i=1;i<=9;i++)sims.push(`QX · Simulacro Virtual N°${String(i).padStart(2,'0')}`);          // 9 simulacros completos QX
['2025-I','2025-II','2026-I'].forEach(y=>sims.push(`QX · ENCAPS oficial ${y} (banco real)`));      // 3 exámenes oficiales reales
['15-may','29-may','12-jun','26-jun','10-jul','24-jul','07-ago','21-ago'].forEach(d=>sims.push(`Theomed · Simulacro ${d}`)); // 8 simulacros Theomed
['Salud Pública','Investigación','Ética e Interculturalidad','Gestión de Servicios','Cuidado Integral','Salud Pública II','Investigación II','Gestión II','Cuidado Integral II'].forEach(a=>sims.push(`QX · EVA ${a}`)); // 9 EVAs QX
['Salud Pública (5 ses.)','Ética (4)','Cuidado Integral (9)','Investigación (4)','Gestión (5)','mixto integral'].forEach(a=>sims.push(`QX · Banqueo ENCAPS ${a}`)); // 6 bloques banqueo QX
if(topics.length!==41||sims.length!==35)throw new Error('counts '+topics.length+'/'+sims.length);

const START='2026-06-23', EXAM='2026-08-20';
const DIAS_EXAMEN=new Set(['2026-08-19']);
const satCounts=[3,3,3,3,3,3,4,4]; // 8 sábados = 26
const dxCounts=[9];                // 1 día-examen = 9  → total 35

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
if(ti!==41)throw new Error('temas='+ti);
if(si!==35)throw new Error('sims='+si);

const L=['-- ENCAPS 23-jun (examen FIJO 20-ago) · backup study_schedule_backup_23jun','BEGIN;'];
// 1) Fusiones afines (idempotentes). Las 3 previas son no-op (sus fuentes ya no existen). IV-3+IV-5 NUEVA.
L.push("UPDATE study_schedule t SET codigo='III-4+III-7', subtema = COALESCE(t.subtema,'') || ' ➕ ' || COALESCE(s.subtema,''), videos = COALESCE(t.videos,'[]'::jsonb) || COALESCE(s.videos,'[]'::jsonb), updated_at=now() FROM (SELECT subtema, videos FROM study_schedule WHERE examen='ENCAPS' AND codigo='III-7') s WHERE t.examen='ENCAPS' AND t.codigo='III-4';");
L.push("DELETE FROM study_schedule WHERE examen='ENCAPS' AND codigo='III-7';");
L.push("UPDATE study_schedule t SET codigo='IV-6+IV-7', subtema = COALESCE(t.subtema,'') || ' ➕ ' || COALESCE(s.subtema,''), videos = COALESCE(t.videos,'[]'::jsonb) || COALESCE(s.videos,'[]'::jsonb), updated_at=now() FROM (SELECT subtema, videos FROM study_schedule WHERE examen='ENCAPS' AND codigo='IV-7') s WHERE t.examen='ENCAPS' AND t.codigo='IV-6';");
L.push("DELETE FROM study_schedule WHERE examen='ENCAPS' AND codigo='IV-7';");
L.push("UPDATE study_schedule t SET codigo='V-7+V-10', subtema = COALESCE(t.subtema,'') || ' ➕ ' || COALESCE(s.subtema,''), videos = COALESCE(t.videos,'[]'::jsonb) || COALESCE(s.videos,'[]'::jsonb), updated_at=now() FROM (SELECT subtema, videos FROM study_schedule WHERE examen='ENCAPS' AND codigo='V-10') s WHERE t.examen='ENCAPS' AND t.codigo='V-7';");
L.push("DELETE FROM study_schedule WHERE examen='ENCAPS' AND codigo='V-10';");
// 1b) NUEVA fusión IV-3+IV-5 (preserva videos+theomed+material_comp+nts)
L.push("UPDATE study_schedule t SET codigo='IV-3+IV-5', subtema = COALESCE(t.subtema,'') || ' ➕ ' || COALESCE(s.subtema,''), videos = COALESCE(t.videos,'[]'::jsonb) || COALESCE(s.videos,'[]'::jsonb), theomed = COALESCE(t.theomed,'[]'::jsonb) || COALESCE(s.theomed,'[]'::jsonb), material_comp = COALESCE(t.material_comp,'[]'::jsonb) || COALESCE(s.material_comp,'[]'::jsonb), nts = NULLIF(TRIM(BOTH ' +' FROM COALESCE(t.nts,'') || ' + ' || COALESCE(s.nts,'')),''), updated_at=now() FROM (SELECT subtema, videos, theomed, material_comp, nts FROM study_schedule WHERE examen='ENCAPS' AND codigo='IV-5') s WHERE t.examen='ENCAPS' AND t.codigo='IV-3';");
L.push("DELETE FROM study_schedule WHERE examen='ENCAPS' AND codigo='IV-5';");
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
fs.writeFileSync(path.join(__dirname,'_encaps_remap_23jun.sql'),L.join('\n'),'utf8');
const tr=rows.filter(x=>x.role==='topic');
console.log(`OK total=${dia} temas=${ti}(${tr[0].fecha}…${tr[tr.length-1].fecha}) sims=${si} examen=${ex.fecha}(${ex.wd}) dia1=${rows[0].fecha}(${rows[0].role} ${rows[0].codigo||''})`);
console.log('D1=23-jun · TOTAL encapsPlan.ts =', dia);
