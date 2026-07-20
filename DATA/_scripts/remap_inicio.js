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
function calNoSun(start,n){const o=[];let c=start;while(o.length<n){if(!isSun(c))o.push(c);c=addDays(c,1);}return o;}
function tipoDia(s){const d=fromISO(s),dow=d.getUTCDay();if(dow===0||dow===6)return'descanso';let cnt=0,cur=fromISO('2026-06-10');while(cur<d){const wd=cur.getUTCDay();if(wd!==0&&wd!==6)cnt++;cur.setUTCDate(cur.getUTCDate()+1);}return cnt%2===0?'research':'derma';}
function slots(t,start,n){const o=[];let c=start;while(o.length<n){if(tipoDia(c)===t)o.push(c);c=addDays(c,1);}return o;}
function replaceFechas(file,marker,nd){const p=path.join(ROOT,file);let s=fs.readFileSync(p,'utf8');const i=s.indexOf(marker);if(i<0)throw new Error(file+': '+marker);const j=s.indexOf('];',i);let k=0;const seg=s.slice(i,j).replace(/(fecha:\s*["'])(20\d\d-\d\d-\d\d)(["'])/g,(_,a,_o,c)=>{if(k>=nd.length)throw new Error(file+': sobran');return a+nd[k++]+c;});if(k!==nd.length)throw new Error(file+`: esperaba ${nd.length} reemplazó ${k}`);fs.writeFileSync(p,s.slice(0,i)+seg+s.slice(j),'utf8');}
function countFechas(file,marker){const s=fs.readFileSync(path.join(ROOT,file),'utf8');const i=s.indexOf(marker);const j=s.indexOf('];',i);return[...s.slice(i,j).matchAll(/fecha:\s*["'](20\d\d-\d\d-\d\d)["']/g)].map(m=>m[1]);}
/** Actualiza inicio/fin (regex) dentro del bloque META que sigue al marcador. Año-agnóstico (Derma cruza a 2027). */
function setMeta(file,metaMarker,inicio,fin){const p=path.join(ROOT,file);let s=fs.readFileSync(p,'utf8');const i=s.indexOf(metaMarker);if(i<0)throw new Error(file+': meta '+metaMarker);const end=s.indexOf('};',i);let reg=s.slice(i,end);reg=reg.replace(/inicio:\s*'20\d\d-\d\d-\d\d'/, `inicio: '${inicio}'`);if(fin)reg=reg.replace(/fin:\s*'20\d\d-\d\d-\d\d'/, `fin: '${fin}'`);s=s.slice(0,i)+reg+s.slice(end);fs.writeFileSync(p,s,'utf8');}

// 1) USMLE daily (72)
{const f='src/lib/usmleStep1Daily.ts';if(countFechas(f,'export const DIAS').length!==72)throw new Error('USMLE!=72');const nd=calNoSun(START,72);replaceFechas(f,'export const DIAS',nd);setMeta(f,'export const DAILY_META',START,nd[71]);console.log('USMLE ✓ '+nd[0]+'→'+nd[71]);}
// 2) MIR (78)
{const f='src/lib/mirDailyPlan.ts';if(countFechas(f,'export const MIR_DIAS').length!==78)throw new Error('MIR!=78');const nd=calNoSun(START,78);replaceFechas(f,'export const MIR_DIAS',nd);setMeta(f,'export const MIR_DAILY_META',START,nd[77]);console.log('MIR ✓ '+nd[0]+'→'+nd[77]);}
// 3) USMLE plan UNIDADES (5)
{const f='src/lib/usmleStep1Plan.ts';if(countFechas(f,'export const UNIDADES').length!==5)throw new Error('UNID!=5');replaceFechas(f,'export const UNIDADES',calNoSun(START,5));setMeta(f,'export const PLAN_META',START,null);console.log('USMLE UNIDADES ✓');}
// 4) Research (42) — slots research (alterna con Derma, ancla 10-jun → 24-jun = research)
{const f='src/lib/researchDailyPlan.ts';if(countFechas(f,'export const DIAS').length!==42)throw new Error('RES!=42');const nd=slots('research',START,42);replaceFechas(f,'export const DIAS',nd);setMeta(f,'export const DAILY_META',nd[0],nd[41]);console.log('Research ✓ '+nd[0]+'→'+nd[41]);}
// 5) Derma (70) — slots derma (alterna con Research, ancla 10-jun → 25-jun = derma)
{const f='src/lib/dermaDailyPlan.ts';if(countFechas(f,'DERMA_DIAS: DiaDerma[] = [').length!==70)throw new Error('DERMA!=70');const nd=slots('derma',START,70);replaceFechas(f,'DERMA_DIAS: DiaDerma[] = [',nd);setMeta(f,'export const DERMA_DAILY_META',nd[0],nd[69]);console.log('Derma ✓ '+nd[0]+'→'+nd[69]);}
// 6) Business — reconstruido desde START (inserta descansos dominicales)
{const f='src/lib/businessStudyPlan.ts';const p=path.join(ROOT,f);let s=fs.readFileSync(p,'utf8');const marker='export const BIZ_DIAS: DiaBiz[] = [';const i=s.indexOf(marker);const bs=i+marker.length;const j=s.indexOf('];',bs);const parts=s.slice(bs,j).split('},{').map((pp,idx,arr)=>{let e=pp;if(idx>0)e='{'+e;if(idx<arr.length-1)e=e+'}';return e.trim();});const work=parts.filter(e=>!/materia:"DESCANSO"/.test(e));if(work.length!==84)throw new Error('BIZ work='+work.length);const out=[];let cur=START,wi=0,d=1;while(wi<work.length){if(isSun(cur))out.push(`{d:${d},fecha:"${cur}",wd:"Dom",materia:"DESCANSO",lectura:"DÍA LIBRE TOTAL (domingo). Sin actividad — descanso real; el sueño/descanso consolida lo estudiado (Walker). Las notas se re-leen el lunes en 10 min.",accion:"",min:0,libroN:null,yt:null}`);else out.push(work[wi++].replace(/^\{d:\d+,fecha:"[^"]*",wd:"[^"]*",/,`{d:${d},fecha:"${cur}",wd:"${wdOf(cur)}",`));d++;cur=addDays(cur,1);}const total=out.length,fin=out[out.length-1].match(/fecha:"([^"]*)"/)[1];s=s.slice(0,bs)+out.join(',')+s.slice(j);const bizMetaRe=/inicio: '20\d\d-\d\d-\d\d', fin: '[^']*', totalDias: \d+, \/\/[^\n]*/;if(!bizMetaRe.test(s))throw new Error('Business: no encontré la línea META (inicio/fin/totalDias // …)');s=s.replace(bizMetaRe,`inicio: '${START}', fin: '${fin}', totalDias: ${total}, // reconstruido START=${START} · TODOS los domingos LIBRES · 84 trabajo + descansos dominicales`);fs.writeFileSync(p,s,'utf8');console.log('Business ✓ '+START+'→'+fin+' total='+total);}

console.log('\nOK — remap START='+START+' (5 planes). ENCAPS, Synapse y AURUM aparte.');
