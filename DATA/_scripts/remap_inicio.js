/**
 * remap_inicio.js — corre las fechas de arranque de los planes NO-ENCAPS a una fecha dada.
 *
 * v5.10b (13-sep-2026, integración segunda capa): Research ya NO se re-fecha con slots() — el bloque 4 delega en
 * gen_research_plan.js (conoce la pausa 4→29-ene, RESEARCH_HITOS, DAILY_META.finNucleo/pausa, los chips con fecha y
 * el ciclo 2) y comprueba los invariantes antes y después (42 átomos · d41 ≥ 2027-02-01 · hitos ciclo 1 ⊂ DIAS) +
 * gen_research_calendar.js --check (overlays 🔬). Derma pasa a 73 slots (70 + 3 segundas pasadas parciales del taper
 * Step 1 d44-d49) y el bloque 5b regenera el ciclo 2 (gen_derma_ciclo2.js). USMLE avisa si el plan termina después de
 * DAILY_META.examenTarget; MIR avisa si D78 pisa el arranque del mantenimiento (mirMantenimiento.ts).
 *
 * Sustituye a la familia one-shot remap_inicio_<dia>.js (15-jun … 2-jul), que era copy-paste
 * byte-idéntico salvo la fecha incrustada ~7 veces. Ahora la fecha es UN solo parámetro.
 *
 *   Uso:  node DATA/_scripts/remap_inicio.js 2026-07-02
 *         node DATA/_scripts/remap_inicio.js            (usa START por defecto abajo)
 *
 * Qué hace: solo corre fechas (domingos LIBRES, parámetros intactos). Regex AÑO-AGNÓSTICO
 * (20\d\d-\d\d-\d\d) porque Derma son 70 slots ≈ 6.5 meses → cruza a 2027.
 * ENCAPS va aparte (Supabase: gen_encaps_mantenimiento_2027.js <fecha> → execute_sql, backup fechado automático).
 * SYNAPSE (hasta ene-2027) / VIBECODING (95 días = D# del Step 1) / AURUM van aparte (sus propios generadores, misma fecha).
 * USMLE: este script SOLO re-fecha; la fuente de verdad (hitos anclados por fecha, niveles, taper) es DATA/_scripts/usmle/gen_usmle_v5.js.
 */
const fs = require('fs'); const path = require('path');

const START = process.argv[2] || '2026-07-02';           // ← única fuente de la fecha de arranque
if (!/^20\d\d-\d\d-\d\d$/.test(START)) throw new Error('START inválido (YYYY-MM-DD): ' + START);

const ROOT = path.join(__dirname, '..', '..');
const WD = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const iso=d=>d.toISOString().slice(0,10); const fromISO=s=>new Date(s+'T12:00:00Z');
const addDays=(s,n)=>{const d=fromISO(s);d.setUTCDate(d.getUTCDate()+n);return iso(d);};
const wdOf=s=>WD[fromISO(s).getUTCDay()]; const isSun=s=>fromISO(s).getUTCDay()===0;
const isWeekend=s=>{const w=fromISO(s).getUTCDay();return w===0||w===6;};
// v5 (27-ago-2026): SÁBADOS Y DOMINGOS LIBRES en todos los planes + feriados fijos.
const SKIP_FIJOS=new Set(['2026-12-25','2026-12-31','2027-01-01']);
function calNoSun(start,n){const o=[];let c=start;while(o.length<n){if(!isSun(c))o.push(c);c=addDays(c,1);}return o;} // legado (pre-v5)
function calNoWeekend(start,n){const o=[];let c=start;while(o.length<n){if(!isWeekend(c)&&!SKIP_FIJOS.has(c))o.push(c);c=addDays(c,1);}return o;}
function tipoDia(s){const d=fromISO(s),dow=d.getUTCDay();if(dow===0||dow===6)return'descanso';let cnt=0,cur=fromISO('2026-06-10');while(cur<d){const wd=cur.getUTCDay();if(wd!==0&&wd!==6)cnt++;cur.setUTCDate(cur.getUTCDate()+1);}return cnt%2===0?'research':'derma';}
function slots(t,start,n){const o=[];let c=start;while(o.length<n){if(tipoDia(c)===t&&!SKIP_FIJOS.has(c))o.push(c);c=addDays(c,1);}return o;} // v5.4: los interdiarios también saltan SKIP_FIJOS
function replaceFechas(file,marker,nd){const p=path.join(ROOT,file);let s=fs.readFileSync(p,'utf8');const i=s.indexOf(marker);if(i<0)throw new Error(file+': '+marker);const j=s.indexOf('];',i);let k=0;const seg=s.slice(i,j).replace(/(fecha:\s*["'])(20\d\d-\d\d-\d\d)(["'])/g,(_,a,_o,c)=>{if(k>=nd.length)throw new Error(file+': sobran');return a+nd[k++]+c;});if(k!==nd.length)throw new Error(file+`: esperaba ${nd.length} reemplazó ${k}`);fs.writeFileSync(p,s.slice(0,i)+seg+s.slice(j),'utf8');}
function countFechas(file,marker){const s=fs.readFileSync(path.join(ROOT,file),'utf8');const i=s.indexOf(marker);const j=s.indexOf('];',i);return[...s.slice(i,j).matchAll(/fecha:\s*["'](20\d\d-\d\d-\d\d)["']/g)].map(m=>m[1]);}
/** Actualiza inicio/fin (regex) dentro del bloque META que sigue al marcador. Año-agnóstico (Derma cruza a 2027). */
function setMeta(file,metaMarker,inicio,fin){const p=path.join(ROOT,file);let s=fs.readFileSync(p,'utf8');const i=s.indexOf(metaMarker);if(i<0)throw new Error(file+': meta '+metaMarker);const end=s.indexOf('};',i);let reg=s.slice(i,end);reg=reg.replace(/inicio:\s*'20\d\d-\d\d-\d\d'/, `inicio: '${inicio}'`);if(fin)reg=reg.replace(/fin:\s*'20\d\d-\d\d-\d\d'/, `fin: '${fin}'`);s=s.slice(0,i)+reg+s.slice(end);fs.writeFileSync(p,s,'utf8');}

// 1) USMLE daily (95 · v5.12) — ⚠ los 12 hitos están anclados POR FECHA en gen_usmle_v5.js (SIMS), no por D#;
//    si remapeas a otro START, los hitos caen en otro día de la semana (aceptado: corrimiento determinista).
{const f='src/lib/usmleStep1Daily.ts';const n=countFechas(f,'export const DIAS').length;if(n!==95)throw new Error('USMLE!=95 (v5.12) — tiene '+n+'; si cambió el nº de días, regenera con DATA/_scripts/usmle/gen_usmle_v5.js (cadena: gen_usmle_v5 → assemble_usmle_ts → update_diainicio → remap_obsidian_usmle) y ajusta este guard');const nd=calNoWeekend(START,95);replaceFechas(f,'export const DIAS',nd);setMeta(f,'export const DAILY_META',START,nd[94]);console.log('USMLE ✓ '+nd[0]+'→'+nd[94]+' (95 d · v5.12; ⚠ este paso SOLO re-fecha: para que los hitos sigan en su fecha hay que regenerar con gen_usmle_v5.js — desde la v5.8 NO se recorta contenido: el desfase se absorbe alargando el final del plan; v5.10-v5.12: el UWSA1 se mueve con cada corrimiento para seguir siendo el D1 — v5.12: mié 16-sep; el D95 = vie 29-ene llena la ventana 25-29 ene → examen target lun 1-feb; cada día más sin estudiar mueve el examen un hábil)');
 // v5.10b: DAILY_META.examenTarget / descansoD1 NO los toca setMeta (solo inicio/fin). Si D95 alcanza el D-1 o el examen, hay decisión de Joseph (ventana 25-29 ene).
 const meta=fs.readFileSync(path.join(ROOT,f),'utf8');const tgt=(meta.match(/examenTarget:\s*'(20\d\d-\d\d-\d\d)'/)||[])[1];const dm1=(meta.match(/descansoD1:\s*'(20\d\d-\d\d-\d\d)'/)||[])[1];
 if(tgt&&dm1&&nd[94]>=dm1)console.warn('⚠ USMLE: D95 ('+nd[94]+') alcanza el D-1 ('+dm1+') / target '+tgt+' → decisión de Joseph: mover examenTarget/descansoD1 en DAILY_META (gen_usmle_v5.js) o recortar — el remap NO lo hace');}
// 2) MIR (78)
{const f='src/lib/mirDailyPlan.ts';if(countFechas(f,'export const MIR_DIAS').length!==78)throw new Error('MIR!=78');const nd=calNoWeekend(START,78);replaceFechas(f,'export const MIR_DIAS',nd);setMeta(f,'export const MIR_DAILY_META',START,nd[77]);console.log('MIR ✓ '+nd[0]+'→'+nd[77]);
 // v5.10b: el mantenimiento (mirMantenimiento.ts, generado) arranca el día hábil siguiente a D78; si D78 lo pisa, regenerar con otra fecha de inicio.
 try{const mm=fs.readFileSync(path.join(ROOT,'src/lib/mirMantenimiento.ts'),'utf8');const ini=(mm.match(/gen_mir_mantenimiento\.js (20\d\d-\d\d-\d\d) (20\d\d-\d\d-\d\d)/)||[])[1];
  if(ini&&nd[77]>=ini)console.warn('⚠ MIR: D78 ('+nd[77]+') pisa el mantenimiento (inicio '+ini+') → node DATA/_scripts/gen_mir_mantenimiento.js <primer hábil > D78> 2027-03-31');}catch{}}
// 3) USMLE plan UNIDADES (5)
{const f='src/lib/usmleStep1Plan.ts';if(countFechas(f,'export const UNIDADES').length!==5)throw new Error('UNID!=5');replaceFechas(f,'export const UNIDADES',calNoWeekend(START,5));setMeta(f,'export const PLAN_META',START,null);console.log('USMLE UNIDADES ✓');}
// 4) Research (42) — v5.10b: el re-fechado lo hace gen_research_plan.js (conoce la pausa 4→29-ene, RESEARCH_HITOS, DAILY_META.finNucleo/pausa,
//    los chips con fecha —chipsDyn— y el ciclo 2 researchDailyPlan2027.ts; slots() NO sabe de la pausa). remap solo comprueba el invariante antes y después.
{const f='src/lib/researchDailyPlan.ts';if(countFechas(f,'export const DIAS').length!==42)throw new Error('RES!=42');
 require('child_process').execSync('node '+JSON.stringify(path.join(__dirname,'gen_research_plan.js'))+' '+START,{stdio:'inherit'});
 const nd=countFechas(f,'export const DIAS');if(nd.length!==42)throw new Error('RES!=42 tras gen_research_plan');
 if(nd[40]<'2027-02-01')throw new Error('Research: d41 ('+nd[40]+') debe caer tras la pausa del Step 1 (>= 2027-02-01)');
 const src=fs.readFileSync(path.join(ROOT,f),'utf8');const hitos=[...src.matchAll(/'([\w-]+)': \{ code: '[^']+', fecha: '(20\d\d-\d\d-\d\d)', ciclo: 1, d: (\d+) \}/g)];
 if(!hitos.length)throw new Error('Research: RESEARCH_HITOS ciclo 1 no encontrado (¿cambió el formato del generador?)');
 for(const [,k,fecha,d] of hitos){if(nd[Number(d)-1]!==fecha)throw new Error('RESEARCH_HITOS['+k+'] ('+fecha+') no coincide con DIAS d'+d+' ('+nd[Number(d)-1]+')');}
 console.log('Research ✓ (gen_research_plan.js) '+nd[0]+'→'+nd[41]+' · hitos ciclo 1 coherentes: '+hitos.length);
 try{require('child_process').execSync('node '+JSON.stringify(path.join(__dirname,'gen_research_calendar.js'))+' --check',{stdio:'inherit'});}
 catch{console.warn('⚠ overlays 🔬 RESEARCH desfasados → node DATA/_scripts/gen_research_calendar.js y update_event (o delete+create) de los `recrear` con su payload, luego --set hito=eventId');}}
// 5) Derma (73 · v3 taper 12-sep: 70 + 3 segundas pasadas parciales) — slots derma (alterna con Research, ancla 10-jun → 25-jun = derma)
{const f='src/lib/dermaDailyPlan.ts';if(countFechas(f,'DERMA_DIAS: DiaDerma[] = [').length!==73)throw new Error('DERMA!=73 (v3 taper)');const nd=slots('derma',START,73);replaceFechas(f,'DERMA_DIAS: DiaDerma[] = [',nd);setMeta(f,'export const DERMA_DAILY_META',nd[0],nd[72]);console.log('Derma ✓ '+nd[0]+'→'+nd[72]+' (73 d · v3 taper: las fechas del taper Step 1 quedan fijas por d44-d49; si el START cambia, revisar que sigan cayendo entre el NBME 31 y el examen) · después: node DATA/_scripts/gen_derma_ciclo2.js');
 // v5.10b: el taper es POSICIONAL (d44-d49) pero DERMA_DAILY_META.taperStep1.desde/hasta son fechas fijas (NBME 31 → examen): avisar si ya no coinciden.
 try{const dm=fs.readFileSync(path.join(ROOT,f),'utf8');const tp=dm.match(/taperStep1:\s*\{[^}]*desde:\s*'(20\d\d-\d\d-\d\d)',\s*hasta:\s*'(20\d\d-\d\d-\d\d)'/);
  if(tp&&(nd[43]<tp[1]||nd[48]>tp[2]))console.warn('⚠ Derma: d44-d49 ('+nd[43]+'→'+nd[48]+') ya no caen en la ventana del taper Step 1 ('+tp[1]+' → '+tp[2]+') → repetir el swap (dermaVentanaTaper) o parametrizar el taper por fecha');}catch{}}
// 5b) Derma CICLO 2 (d74-d103, src/lib/dermaCiclo2.ts) — GENERADO: arranca en el primer día-Derma tras DERMA_DAILY_META.fin y verifica 0 solapes con Research (ambos ciclos)
try{require('child_process').execSync('node '+JSON.stringify(path.join(__dirname,'gen_derma_ciclo2.js')),{stdio:'inherit'});}
catch{console.warn('⚠ gen_derma_ciclo2.js falló (paridad/feriados/solape con Research): dermaCiclo2.ts puede estar DESFASADO → revisar y correr a mano node DATA/_scripts/gen_derma_ciclo2.js');}
// 6) Business — v5.10b (13-sep): delega en gen_business_plan.py <START> (fuente única DATA/BUSINESS/plan_pulso_v3_L.json; sáb/dom Y feriados fijos como DESCANSO
//    → 84 trabajo + 37 descansos = 121 con START=2026-09-14 (v5.11: START=2026-09-15 · v5.12: START=2026-09-16); antes el remap reconstruía SIN SKIP_FIJOS y dejaba 116 filas ≠ generador). Fallback JS alineado si no hay python.
{const f='src/lib/businessStudyPlan.ts';const p=path.join(ROOT,f);let viaPy=false;
 for(const py of ['python','py -3','python3']){try{require('child_process').execSync(py+' '+JSON.stringify(path.join(__dirname,'gen_business_plan.py'))+' '+START,{stdio:'inherit'});viaPy=true;break;}catch{}}
 if(!viaPy){console.warn('⚠ Business: python no disponible → reconstrucción JS alineada con gen_business_plan.py (feriados SKIP_FIJOS como DESCANSO, modo:"DESCANSO")');
  let s=fs.readFileSync(p,'utf8');const marker='export const BIZ_DIAS: DiaBiz[] = [';const i=s.indexOf(marker);const bs=i+marker.length;const j=s.indexOf('];',bs);const parts=s.slice(bs,j).split('},{').map((pp,idx,arr)=>{let e=pp;if(idx>0)e='{'+e;if(idx<arr.length-1)e=e+'}';return e.trim();});const work=parts.filter(e=>!/materia:"DESCANSO"/.test(e));if(work.length!==84)throw new Error('BIZ work='+work.length);
  const out=[];let cur=START,wi=0,d=1;while(wi<work.length){if(isWeekend(cur))out.push(`{d:${d},fecha:"${cur}",wd:"${wdOf(cur)}",materia:"DESCANSO",lectura:"DÍA LIBRE TOTAL (fin de semana). Sin actividad — descanso real; el sueño/descanso consolida lo estudiado (Walker). Las notas se re-leen el lunes en 10 min.",accion:"",min:0,libroN:null,yt:null,modo:"DESCANSO"}`);else if(SKIP_FIJOS.has(cur))out.push(`{d:${d},fecha:"${cur}",wd:"${wdOf(cur)}",materia:"DESCANSO",lectura:"FERIADO (${cur}): día libre. Sin lectura ni output.",accion:"",min:0,libroN:null,yt:null,modo:"DESCANSO"}`);else out.push(work[wi++].replace(/^\{d:\d+,fecha:"[^"]*",wd:"[^"]*",/,`{d:${d},fecha:"${cur}",wd:"${wdOf(cur)}",`));d++;cur=addDays(cur,1);}
  const total=out.length,fin=out[out.length-1].match(/fecha:"([^"]*)"/)[1];s=s.slice(0,bs)+out.join(',')+s.slice(j);const bizMetaRe=/inicio: '20\d\d-\d\d-\d\d', fin: '[^']*', totalDias: \d+, \/\/[^\n]*/;if(!bizMetaRe.test(s))throw new Error('Business: no encontré la línea META (inicio/fin/totalDias // …)');s=s.replace(bizMetaRe,`inicio: '${START}', fin: '${fin}', totalDias: ${total}, // generado START=${START} · SÁB y DOM LIBRES + feriados fijos fuera · 84 trabajo + ${total-84} descansos`);fs.writeFileSync(p,s,'utf8');}
 const s2=fs.readFileSync(p,'utf8');const m=s2.match(/inicio: '(20\d\d-\d\d-\d\d)', fin: '(20\d\d-\d\d-\d\d)', totalDias: (\d+)/);if(!m||m[1]!==START)throw new Error('Business: META no re-fechada a '+START);const nWork=(s2.match(/materia:"(?!DESCANSO")/g)||[]).length;if(nWork!==84)throw new Error('Business work='+nWork);
 console.log('Business ✓ '+m[1]+'→'+m[2]+' total='+m[3]+' (84 trabajo · '+(viaPy?'gen_business_plan.py':'fallback JS')+')');}

// 7) LIVIANO Academia (90) — fecha + wd por fila (L-V, feriados fuera)
{const f='src/lib/livianoStudyPlan.ts';const p=path.join(ROOT,f);let s=fs.readFileSync(p,'utf8');const marker='LIV_DIAS: DiaLiviano[] = [';const i=s.indexOf(marker);if(i<0)throw new Error('LIVIANO: marker');const j=s.indexOf('];',i);const nd=calNoWeekend(START,90);let k=0;const seg=s.slice(i,j).replace(/("?)fecha\1:\s*"20\d\d-\d\d-\d\d",\s*("?)wd\2:\s*"[^"]*"/g,(_m,q1,q2)=>{if(k>=nd.length)throw new Error('LIVIANO: sobran');const fch=nd[k++];return `${q1}fecha${q1}:"${fch}",${q2}wd${q2}:"${wdOf(fch)}"`;});if(k!==nd.length)throw new Error(`LIVIANO: esperaba ${nd.length} reemplazó ${k}`);s=s.slice(0,i)+seg+s.slice(j);s=s.replace(/inicio: '20\d\d-\d\d-\d\d', fin: '20\d\d-\d\d-\d\d', totalDias: 90/,`inicio: '${nd[0]}', fin: '${nd[89]}', totalDias: 90`);fs.writeFileSync(p,s,'utf8');console.log('LIVIANO ✓ '+nd[0]+'→'+nd[89]);}

// 7b) LIVIANO — invariante "caso clínico en VIERNES" (el remap fila a fila la rompe si START no es lunes)
require('child_process').execSync('node '+JSON.stringify(path.join(__dirname,'liviano_reslot_viernes.js')),{stdio:'inherit'});

console.log('\nOK — remap START='+START+' (USMLE · MIR · UNIDADES · Research vía gen_research_plan.js · Derma 73 + ciclo 2 · Business · LIVIANO + reslot). Aparte, con la MISMA fecha y en este orden: gen_vibecoding_plan.js <fecha> ANTES que gen_synapse_plan.js <fecha> (hasta ene-2027) · gen_aurum_plan.js <fecha> · STUDY_HUB/_scrape/gen_mir_daily.js <fecha> --check (+ gen_mir_mantenimiento.js si D78 pisa el 5-ene) · gen_encaps_mantenimiento_2027.js <fecha> → execute_sql (backup fechado, DELETE solo MANTENIMIENTO) · USMLE con gen_usmle_v5.js (hitos por fecha, sin recortar) · overlays 🔬 RESEARCH si --check avisó (gen_research_calendar.js) · docs + D# de los overlays del Calendar. El pool MIR (gen_mir_pool.js --emit) NO depende de fechas.');
