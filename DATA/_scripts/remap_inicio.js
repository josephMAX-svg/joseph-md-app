/**
 * remap_inicio.js — corre las fechas de arranque de los 5 planes NO-ENCAPS a una fecha dada.
 *
 * Sustituye a la familia one-shot remap_inicio_<dia>.js (15-jun … 2-jul), que era copy-paste
 * byte-idéntico salvo la fecha incrustada ~7 veces. Ahora la fecha es UN solo parámetro.
 *
 *   Uso:  node DATA/_scripts/remap_inicio.js 2026-07-02
 *         node DATA/_scripts/remap_inicio.js            (usa START por defecto abajo)
 *
 * Qué hace: solo corre fechas (domingos LIBRES, parámetros intactos). Regex AÑO-AGNÓSTICO
 * (20\d\d-\d\d-\d\d) porque Derma son 70 slots ≈ 6.5 meses → cruza a 2027.
 * ENCAPS va aparte (Supabase, tope 20-ago, ver gen_encaps_reshift_2jul_exam20.js).
 * Synapse/AURUM van aparte (se regeneran con sus propios generadores).
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

// 1) USMLE daily (99 · v5.4) — ⚠ los simulacros de hito están anclados a VIERNES con D1=3-sep;
//    si remapeas a otro START, los hitos caen en otro día de la semana (aceptado: corrimiento determinista).
{const f='src/lib/usmleStep1Daily.ts';if(countFechas(f,'export const DIAS').length!==99)throw new Error('USMLE!=99');const nd=calNoWeekend(START,99);replaceFechas(f,'export const DIAS',nd);setMeta(f,'export const DAILY_META',START,nd[98]);console.log('USMLE ✓ '+nd[0]+'→'+nd[98]);}
// 2) MIR (78)
{const f='src/lib/mirDailyPlan.ts';if(countFechas(f,'export const MIR_DIAS').length!==78)throw new Error('MIR!=78');const nd=calNoWeekend(START,78);replaceFechas(f,'export const MIR_DIAS',nd);setMeta(f,'export const MIR_DAILY_META',START,nd[77]);console.log('MIR ✓ '+nd[0]+'→'+nd[77]);}
// 3) USMLE plan UNIDADES (5)
{const f='src/lib/usmleStep1Plan.ts';if(countFechas(f,'export const UNIDADES').length!==5)throw new Error('UNID!=5');replaceFechas(f,'export const UNIDADES',calNoWeekend(START,5));setMeta(f,'export const PLAN_META',START,null);console.log('USMLE UNIDADES ✓');}
// 4) Research (42) — slots research (alterna con Derma, ancla 10-jun → 24-jun = research)
{const f='src/lib/researchDailyPlan.ts';if(countFechas(f,'export const DIAS').length!==42)throw new Error('RES!=42');const nd=slots('research',START,42);replaceFechas(f,'export const DIAS',nd);setMeta(f,'export const DAILY_META',nd[0],nd[41]);console.log('Research ✓ '+nd[0]+'→'+nd[41]);}
// 5) Derma (70) — slots derma (alterna con Research, ancla 10-jun → 25-jun = derma)
{const f='src/lib/dermaDailyPlan.ts';if(countFechas(f,'DERMA_DIAS: DiaDerma[] = [').length!==70)throw new Error('DERMA!=70');const nd=slots('derma',START,70);replaceFechas(f,'DERMA_DIAS: DiaDerma[] = [',nd);setMeta(f,'export const DERMA_DAILY_META',nd[0],nd[69]);console.log('Derma ✓ '+nd[0]+'→'+nd[69]);}
// 6) Business — reconstruido desde START (inserta DESCANSO en sáb y dom; NO aplica SKIP_FIJOS: 84 trabajo + 34 finde = 118)
{const f='src/lib/businessStudyPlan.ts';const p=path.join(ROOT,f);let s=fs.readFileSync(p,'utf8');const marker='export const BIZ_DIAS: DiaBiz[] = [';const i=s.indexOf(marker);const bs=i+marker.length;const j=s.indexOf('];',bs);const parts=s.slice(bs,j).split('},{').map((pp,idx,arr)=>{let e=pp;if(idx>0)e='{'+e;if(idx<arr.length-1)e=e+'}';return e.trim();});const work=parts.filter(e=>!/materia:"DESCANSO"/.test(e));if(work.length!==84)throw new Error('BIZ work='+work.length);const out=[];let cur=START,wi=0,d=1;while(wi<work.length){if(isWeekend(cur))out.push(`{d:${d},fecha:"${cur}",wd:"${wdOf(cur)}",materia:"DESCANSO",lectura:"DÍA LIBRE TOTAL (fin de semana). Sin actividad — descanso real; el sueño/descanso consolida lo estudiado (Walker). Las notas se re-leen el lunes en 10 min.",accion:"",min:0,libroN:null,yt:null}`);else out.push(work[wi++].replace(/^\{d:\d+,fecha:"[^"]*",wd:"[^"]*",/,`{d:${d},fecha:"${cur}",wd:"${wdOf(cur)}",`));d++;cur=addDays(cur,1);}const total=out.length,fin=out[out.length-1].match(/fecha:"([^"]*)"/)[1];s=s.slice(0,bs)+out.join(',')+s.slice(j);const bizMetaRe=/inicio: '20\d\d-\d\d-\d\d', fin: '[^']*', totalDias: \d+, \/\/[^\n]*/;if(!bizMetaRe.test(s))throw new Error('Business: no encontré la línea META (inicio/fin/totalDias // …)');s=s.replace(bizMetaRe,`inicio: '${START}', fin: '${fin}', totalDias: ${total}, // reconstruido START=${START} · SÁB y DOM LIBRES · 84 trabajo + ${total-84} descansos de finde`);fs.writeFileSync(p,s,'utf8');console.log('Business ✓ '+START+'→'+fin+' total='+total);}

// 7) LIVIANO Academia (90) — fecha + wd por fila (L-V, feriados fuera)
{const f='src/lib/livianoStudyPlan.ts';const p=path.join(ROOT,f);let s=fs.readFileSync(p,'utf8');const marker='LIV_DIAS: DiaLiviano[] = [';const i=s.indexOf(marker);if(i<0)throw new Error('LIVIANO: marker');const j=s.indexOf('];',i);const nd=calNoWeekend(START,90);let k=0;const seg=s.slice(i,j).replace(/("?)fecha\1:\s*"20\d\d-\d\d-\d\d",\s*("?)wd\2:\s*"[^"]*"/g,(_m,q1,q2)=>{if(k>=nd.length)throw new Error('LIVIANO: sobran');const fch=nd[k++];return `${q1}fecha${q1}:"${fch}",${q2}wd${q2}:"${wdOf(fch)}"`;});if(k!==nd.length)throw new Error(`LIVIANO: esperaba ${nd.length} reemplazó ${k}`);s=s.slice(0,i)+seg+s.slice(j);s=s.replace(/inicio: '20\d\d-\d\d-\d\d', fin: '20\d\d-\d\d-\d\d', totalDias: 90/,`inicio: '${nd[0]}', fin: '${nd[89]}', totalDias: 90`);fs.writeFileSync(p,s,'utf8');console.log('LIVIANO ✓ '+nd[0]+'→'+nd[89]);}

// 7b) LIVIANO — invariante "caso clínico en VIERNES" (el remap fila a fila la rompe si START no es lunes)
require('child_process').execSync('node '+JSON.stringify(path.join(__dirname,'liviano_reslot_viernes.js')),{stdio:'inherit'});

console.log('\nOK — remap START='+START+' (6 planes + reslot LIVIANO). Aparte: ENCAPS (gen_encaps_mantenimiento_2027.js <fecha> → execute_sql), SYNAPSE (gen_synapse_plan.js <fecha>), AURUM (gen_aurum_plan.js <fecha>).');
